# Coach_v2.html — Coach de vida de Adán

Aplicación de una sola página (HTML+CSS+JS, sin backend, sin dependencias externas de gráficas — el radar de habilidades es un `<canvas>` dibujado a mano, no Chart.js). Es el núcleo del plan de vida/negocio de Adán: diagnóstico financiero real, Plan Maestro hacia $1,000,000 líquido, rutina diaria completa, hábitos, roadmap de aprendizaje, y una guía legal/fiscal tanto personal como para constituir una empresa. Único import externo: Google Fonts (Inter + Playfair Display).

Tema claro/oscuro con toggle (🌙/☀️ arriba a la derecha), persistido en `localStorage['coach-theme']`. Soporta ambos temas completos (`:root` y `:root[data-theme="dark"]`).

## Dos modos, completamente separados

Un único botón (`cambiarModo('personal'|'empresa')`) alterna entre dos `<div class="vista-panel">` independientes, cada uno con su propio `<nav>` de navegación por ancla (`#seccion`) y scroll-spy propio (`refrescarScrollSpy()`, recalculado en cada cambio de modo):

- **🪙 Coach — Personal** (modo por defecto): `#perfil` · `#rutina` · `#habitos` · `#aprendizaje` · `#legal-personal`
- **🏢 Coach — Empresa**: `#crear-empresa` · `#legal`

## Modelo de datos — 3 claves de `localStorage`

| Clave | Forma | Qué guarda |
|---|---|---|
| `coach-theme` | `'dark' \| 'light'` | Tema activo, se aplica como `data-theme` en `<html>` al cargar. |
| `radarp_{skillId}` | entero 0-100 (una clave por skill, 12 en total) | Overrides del radar de habilidades — si no existe, se usa el valor base hardcodeado en `SK` (ver más abajo). IDs: `ventas, copy, marketing, network, liderazgo, codigo, ia, datos, inversion, finanzas, ingles, mente`. |
| `coach_rutina_v1` | `{ completado: { 'YYYY-MM-DD': ['taskId', ...] } }` | Progreso diario de la Rutina (ver sección `#rutina` abajo). Fecha en UTC (`toISOString().slice(0,10)`), misma convención que el resto del proyecto. |

## `#perfil` — Mi Perfil Real

La portada única del modo Personal (fusiona lo que en versiones viejas eran Dashboard + Perfil por separado). Hero con KPIs reales (patrimonio líquido, deuda total, fondo de emergencia, `id="kpiDiasMeta"` = días restantes al 01 ene 2030, calculado en vivo). 3 subtabs (`showSubtab('perfil', tab, btn)`):

- **Diagnóstico & Plan** — historia real (mantenimiento industrial farmacéutico → Ford → Continental → Bosch → Stuttgart → Google/Intelliswift → ALTEN), diagnóstico financiero riguroso, fortalezas/debilidades, moat competitivo, riesgo principal, y el **Plan Maestro en 4 fases** con navegación por pasos (`#fase0`..`#fase3`, botones `.plan-step` con `id="step0"`..`id="step3"`).
- **💡 Posibles Negocios** — 8 opciones rankeadas contra el perfil real, cada una con `id="negocio1"`..`id="negocio8"` (saltables desde cualquier parte de la app con `irANegocios('negocioN')`, que hace scroll suave y activa el subtab si hace falta).
- **CV Completo** — CV imprimible; `downloadCV()` cambia `document.title`, llama a `window.print()` y restaura el título al terminar (o al evento `afterprint`).

### Plan Maestro — fechas (IIFE en el `<script>`, ~línea 2984)

```js
inicio = new Date(2026, 6, 18)   // 18 jul 2026
meta   = new Date(2030, 0, 1)    // 01 ene 2030
fases = [
  { id:'fase0', ini: 2026-07-18, fin: 2026-08-30 },  // ojo: fin real en código, ver Dashboard para fin visible 2026-09-30
  { id:'fase1', ini: 2026-10-01, fin: 2027-03-31 },
  { id:'fase2', ini: 2027-04-01, fin: 2028-12-31 },
  { id:'fase3', ini: 2029-01-01, fin: 2030-01-01 },
]
```
Calcula fase activa, marca `.is-done/.is-active/.is-pending` en cada bloque de fase y en los `.plan-step`, y escribe `kpiDiasMeta`. **Estas mismas 4 fechas están duplicadas en `Dashboard/dashboard.html` (constante `PHASES`)** — si cambian aquí, hay que replicarlas allá (ver `../README.md`).

### Radar FIFA de habilidades (IIFE en el `<script>`, ~línea 3237)

Array `SK` con 12 skills, cada una `{id, name, full, icon, val, w (peso), cat, desc}`. Al cargar, sobreescribe `val` con lo que haya en `localStorage['radarp_'+id]` si existe. `calcOVR()` calcula el overall ponderado por `w`. `draw()` dibuja el radar en `<canvas>` a mano (sin librería), sensible al tema claro/oscuro. `buildSliders()` genera un slider 0-100 por skill; `updateRadarSkill(id,val)` (expuesta en `window`) actualiza `SK`, persiste en `radarp_{id}` y redibuja. `showSkillTab(id)`/`goToSkillDetail(id)` abren el detalle expandible de una skill (roadmap 0→100, contenido estático por skill).

**Esta misma lista de 12 skills (valores base y pesos) está duplicada en `Dashboard/dashboard.html` (constante `SK`)** para el slide "🧠 Habilidades" — si cambian los valores base o pesos aquí, hay que replicarlos allá.

## `#rutina` — Rutina Diaria (sistema más complejo del archivo)

Reescrita por completo el 2026-07-29 para dejar de ser un checklist visual sin memoria y convertirse en un **tracker real, distinto cada día de la semana**, que cubre ejercicio, skincare, el trabajo en ALTEN, ventas/outreach, el Plan Maestro y finanzas — no solo "tiempo libre".

### `RUTINA_TASKS` — fuente única de verdad (58 tareas)

Array top-level `{id, dias:[0-6], hora:'HH:MM', cat, txt, fijo?:true}` (dias: 0=domingo…6=sábado). Se filtra y ordena por hora para obtener el horario de cualquier día (`rutinaTareasDia(dow)` / `rutinaTareasHoy()`).

- **Común Lun-Vie** (`wd01`-`wd20`, `dias:[1,2,3,4,5]`): despertar 05:00 → agua → ducha → **skincare AM** (`wd04`) → journaling → revisar GBM → desayuno → traslado → **`wd09` = 🏢 ALTEN, jornada laboral 7:00–17:00, `fijo:true`** → traslado de vuelta → prioridad de Fase 0 → ventas (5 mensajes) → cena → lectura → journaling → **skincare PM** (`wd17`) → plan de mañana → meditación → dormir.
- **Ejercicio y bloque de habilidad — cambian cada día** (`e1`-`e5` a las 05:10, `k1`-`k5` a las 06:13, un id por día 1-5): Lun=Pesas Empuje+Marketing, Mar=Cardio+Datos/SQL, Mié=Pesas Jalón+Marketing, Jue=Cardio-HIIT+Datos, Vie=Pesas Piernas+Copy.
- **Sábado** (`sa01`-`sa15`, `dias:[6]`): despertar 07:00, skincare AM, entreno largo, **bloque profundo de 4h** para la prioridad del Plan Maestro, almuerzo, IA aplicada, ventas, revisión semanal de finanzas, cena, skincare PM, dormir.
- **Domingo** (`do01`-`do12`, `dias:[0]`): despertar 07:30, skincare AM, descanso activo, finanzas (revisión de presupuesto + planificar semana), **checkpoint explícito del Plan Maestro**, cena, journaling, skincare PM, dormir.
- **Compartida Sáb/Dom** (`fl1`, `dias:[6,0]`, 17:00): bloque largo de freelance/plantilla si hay cliente o ventas activas.

Tareas con `fijo:true` (solo `wd09`, el bloque de ALTEN) se muestran en la línea de tiempo y cuentan para "ahora/siguiente", pero **no llevan checkbox y no cuentan en el % de progreso**.

**Supuesto a revisar**: el horario asume **15–20 min de traslado** a/desde ALTEN (bloques `wd08`/`wd10`). Si el commute real es distinto, ajustar las horas de `wd01`-`wd09` y `wd10`-`wd20` a mano.

### Funciones

- `rutinaHoyStr()` — fecha de hoy en UTC (`toISOString().slice(0,10)`).
- `rutinaLoad()`/`rutinaSave(d)` — leer/escribir `coach_rutina_v1`.
- `rutinaTareasDia(dow)`/`rutinaTareasHoy()` — tareas de un día de la semana, ordenadas por hora.
- `renderRutinaLive()` — actualiza el widget "🟢 Ahora mismo / 🔜 Siguiente / ✅ Progreso" (ids `rutina-now-txt`, `rutina-next-txt`, `rutina-progress-txt`, `rutina-progress-bar`) comparando la hora real contra `rutinaTareasHoy()`. Se llama cada 30s (`setInterval`) y tras cada cambio de checkbox.
- `buildDayTabs()`/`verDia(dow)` — construyen y manejan las 7 pestañas de día (`#rutina-day-tabs`, clase `.day-tab`); `rutinaDiaSel` guarda el día actualmente visible (por defecto, hoy).
- `renderRutinaTimeline()` — pinta `#rutina-timeline` con las tareas del día seleccionado. **Solo si `rutinaDiaSel` es hoy** los checkboxes son interactivos y persisten; si se está viendo otro día, se muestran deshabilitados como referencia (no hay historial por fecha pasada específica, solo el día de hoy guarda).
- `rutinaInit()` — se ejecuta en `DOMContentLoaded`: selecciona el día de hoy, construye tabs y timeline, y renderiza el widget vivo.
- `resetChecklist()` — borra `completado[hoyStr]` (ya no es solo visual) y vuelve a pintar si se está viendo el día de hoy.

### Categorías visuales (`cat` → clase CSS)

`salud`→rojo, `descanso`→gris, `admin`→azul, `aprender`→verde, `profundo`→dorado/accent, `creativo`→morado, `trabajo`→teal (`#3ea8a8`, nueva, solo para el bloque de ALTEN).

## `#habitos` — Hábitos & Energía

Grid semanal (L M X J V S D) por hábito con botones `.habito-day` que solo alternan una clase CSS `done` al hacer clic (`document.querySelectorAll('.habito-day').forEach(btn=>btn.addEventListener('click',...))`). **No persiste en `localStorage`** — se resetea visualmente al recargar la página. Es contenido de referencia/UI, no un tracker real (a diferencia de `#rutina`). Incluye tarjetas estáticas "Pilares de energía" y "Distractores a eliminar".

## `#aprendizaje` — Aprendizaje: Ataca tus 5 debilidades

5 tarjetas de contenido estático (sin interactividad ni persistencia): 📊 Datos/Análisis, 🤝 Ventas/Negociación, 📣 Marketing Digital, 💰 Finanzas personales, 🤖 IA aplicada a proyectos propios — cada una con primer paso de la semana, el hábito que lo sostiene, y una lista de recursos. Son las mismas 5 prioridades que alimentan el bloque de habilidad diario de `#rutina` (`k1`-`k5`). (La app separada `Aprendizaje/aprendizaje.html`, que era un tracker de libros/sesiones/skills con su propio `localStorage['aprendizaje_v1']`, se eliminó del proyecto el 2026-07-29; el Dashboard ya no tiene score de aprendizaje.)

## `#legal-personal` — Legal & Personal

Checklist personal (`.check-item`, **no persiste** — mismo comportamiento visual-only que `#habitos`), calendario fiscal personal, y bloques colapsables `toggleCard(id, btn)` con "Qué puedo deducir" como asalariado (Salud, Educación, Vivienda, Ahorro para el retiro, Donativos, Trámite y estrategia).

## Modo Empresa

- **`#crear-empresa`** — guía estática completa para constituir una empresa en México (Persona Física vs. Persona Moral, SAS vs. SA de CV, rutas de constitución, costos/tiempos estimados, obligaciones recurrentes, errores comunes). Contenido de referencia, sin interactividad.
- **`#legal`** — checklist legal del negocio (**no persiste**) + calendario fiscal del negocio + "Qué puedo deducir si tuviera empresa" (Operación, Nómina, Equipo/tecnología, Marketing, Viáticos, Financieros, Protección del negocio, Costo de ventas, Estímulos fiscales adicionales).

## Funciones utilitarias / globales

`cambiarModo(modo)` — alterna modo Personal/Empresa, hace scroll a 0 y recalcula el scroll-spy. `toggleTheme()` — alterna `data-theme` y persiste en `coach-theme`. `showSubtab(section, tab, btn)` — subtabs internas de una sección (usado en `#perfil`). `toggleCard(id, btn)` — colapsa/expande bloques con chevron. `irANegocios(id)` — salta a una opción de negocio con scroll suave. `refrescarScrollSpy()` — recalcula qué `<section>`/`<a>` están dentro del panel de modo visible, para resaltar el link de nav activo al hacer scroll.

## Referencias cruzadas

- La barra de navegación (ambos modos) tiene un enlace **🚀 Dashboard** al final, alineado a la derecha (`margin-left:auto`), que apunta a `../Dashboard/dashboard.html`.
- El **Dashboard** (`../Dashboard/dashboard.html`) lee `coach_rutina_v1` directamente (`D.rut`) y **duplica** `RUTINA_TASKS` (58 tareas, deben quedar byte-idénticas — verificado con `JSON.stringify` en cada cambio), las 4 fechas de `PHASES`, y el array `SK` de 12 skills. **Si editas el horario de `#rutina`, los valores base del radar, o las fechas del Plan Maestro aquí, hay que replicar el cambio en `Dashboard/dashboard.html`** — no hay sincronización automática entre archivos. Ver tabla de "Datos duplicados" en [`../README.md`](../README.md).
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `Coach_v2.html` directamente en cualquier navegador, sin instalación ni servidor. No hay exportación de datos (a diferencia de Finanzas/Salud/Ejercicio/Proyectos) — lo único persistido son el tema, los valores del radar y el progreso de la rutina diaria.
