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

### `RUTINA_TASKS` — fuente única de verdad (63 tareas)

Array top-level `{id, dias:[0-6], hora:'HH:MM', cat, txt, fijo?:true}` (dias: 0=domingo…6=sábado). Se filtra y ordena por hora para obtener el horario de cualquier día (`rutinaTareasDia(dow)` / `rutinaTareasHoy()`).

**Horario real confirmado el 2026-07-29** (reemplazó una versión anterior con supuestos incorrectos de despertar a las 5:00 y trabajo 7:00–17:00): se levanta **7:00**, se baña de inmediato (~7:03), sale de casa **7:40**, maneja **~20 min** y trabaja en ALTEN **8:00–17:00**, duerme alrededor de **medianoche** (~7h de sueño). Con solo 40 min entre despertar y salir, la mañana **solo alcanza para higiene/skincare** — el ejercicio, el bloque de habilidad, la revisión de GBM y la prioridad de Fase 0 se movieron a después del trabajo, donde sí hay ~6h40m libres antes de dormir.

- **Común Lun-Vie** (`wd01`-`wd21`, `dias:[1,2,3,4,5]`): despertar 07:00 → bañarse (`wd02`, incluye lavar el cabello los días de lavado) → **skincare AM** (`wd03`) → **🍂 minoxidil AM** (`wd04`) → vestirse → salir 7:40 → traslado (~20 min) → **`wd07` = 🏢 ALTEN, jornada laboral 8:00–17:00, `fijo:true`** → traslado de vuelta (~20 min) → ejercicio del día → ducha rápida → bloque de habilidad del día → revisar GBM → prioridad de Fase 0 (90 min) → ventas (5 mensajes) → cena → lectura → journaling → **skincare PM** (`wd17`) → **🍂 minoxidil PM** (`wd18`) → plan de mañana → meditación → dormir 23:55.
- **Ejercicio y bloque de habilidad — cambian cada día, después del trabajo** (`e1`-`e5` a las 17:20, `k1`-`k5` a las 18:05, un id por día 1-5): Lun=Pesas Empuje+Marketing, Mar=Cardio+Datos/SQL, Mié=Pesas Jalón+Marketing, Jue=Cardio-HIIT+Datos, Vie=Pesas Piernas+Copy.
- **Sábado** (`sa01`-`sa15` + `sa02b`/`sa13b` minoxidil, `dias:[6]`): despertar 07:00, skincare AM + minoxidil, entreno largo, **bloque profundo de 4h** para la prioridad del Plan Maestro, almuerzo, IA aplicada, ventas, revisión semanal de finanzas, cena, skincare PM + minoxidil, dormir.
- **Domingo** (`do01`-`do12` + `do02b`/`do10b` minoxidil, `dias:[0]`): despertar 07:30, skincare AM + minoxidil, descanso activo, finanzas (revisión de presupuesto + planificar semana), **checkpoint explícito del Plan Maestro**, cena, journaling, skincare PM + minoxidil, dormir.
- **Compartida Sáb/Dom** (`fl1`, `dias:[6,0]`, 17:00): bloque largo de freelance/plantilla si hay cliente o ventas activas.

Los pasos de **🍂 minoxidil** (AM y PM, todos los días de la semana sin excepción) y el aviso de lavado de cabello dentro de `wd02` se agregaron el 2026-07-29 a pedido explícito de Adán ("el skincare y cuidado del cabello añádelo a la rutina de coach cuando me despierto y me duermo") — el tratamiento anticaída real (`CuidadoPersonal/cuidadopersonal.html` → Cabello → Guía) recomienda 2 aplicaciones diarias, por eso hay una tarea por cada momento del día, todos los días, no solo entre semana.

Tareas con `fijo:true` (solo `wd07`, el bloque de ALTEN) se muestran en la línea de tiempo y cuentan para "ahora/siguiente", pero **no llevan checkbox y no cuentan en el % de progreso**.

**Supuesto a revisar**: el traslado de la mañana (7:40→8:00, ~20 min) está confirmado por Adán; el de la tarde (`wd08`, 17:00→17:20) se **asume simétrico** (~20 min) porque no se confirmó explícitamente — ajustar si el commute real de regreso es distinto. También se asumió que no hay tiempo para desayuno formal en la ventana de 40 min de la mañana (no se agregó como tarea trackeada) — si Adán sí desayuna, hay que decidir dónde entra (¿en el camino? ¿al llegar a ALTEN?) y agregarlo.

### Diseño visual del timeline (rediseñado 2026-07-29, mismo día)

`#rutina-timeline` dejó de ser una lista plana de filas (`.timeblock-row`) y ahora es una **línea de tiempo vertical** por bloque `.rt-item` (uno por tarea del día seleccionado):

- **`CAT_META`** — mapa `cat → {ico, label, color}` con un ícono, etiqueta y color por categoría (💪 Salud=rojo, 🌙 Descanso=gris, 💼 Admin=azul, 📚 Aprender=verde, 🎯 Profundo=dorado/accent, ✍️ Creativo=morado, 🏢 Trabajo=teal — mismos colores que ya usaban los bordes `.bloque-*`, así que **no** hay que tocar `CAT_META` si solo cambia texto/horario, únicamente si se agrega una categoría nueva).
- **`rtDur(fromHora, toHora)`** — calcula la duración entre el inicio de una tarea y el de la siguiente (envolviendo a medianoche para la última tarea del día contra la primera), se muestra como "`Xh Ym`" en cada tarjeta.
- Cada tarjeta (`.rt-card`) tiene: un punto de color en la línea (`.rt-dot`, cuadrado y más grande para el bloque `fijo` de ALTEN — `.rt-dot-fijo`), una etiqueta de categoría con ícono (`.rt-cat-tag`), la duración hasta el siguiente bloque, y el checkbox/texto de la tarea. El bloque de ALTEN se renderiza distinto (`.rt-card.rt-fijo`, con fondo dorado suave e ícono grande 🏢), sin checkbox.
- La tarjeta de la tarea **"actual"** (calculada igual que en el widget de arriba, solo cuando se está viendo el día de hoy) recibe la clase `.rt-now` (borde dorado). Las tareas ya marcadas reciben `.rt-done` (opacidad reducida).
- **Resumen del día** (`#rutina-day-summary`, `.rt-chip` por categoría) — cuenta cuántos bloques de cada categoría tiene el día seleccionado, arriba del selector de pestañas.
- El widget "Ahora/Siguiente/Progreso" (`#rutina-live`) ahora tiene un punto de color junto al texto (coloreado según la categoría de la tarea actual/siguiente, con una animación de pulso en el de "ahora"), y el progreso muestra también el porcentaje junto al conteo `X/Y`.
- Al marcar/desmarcar un checkbox, `renderRutinaTimeline()` se vuelve a ejecutar por completo (en vez de solo tachar el texto) para que las clases `.rt-now`/`.rt-done` y el resumen del día siempre reflejen el estado real — con ~20 tareas por día el costo de re-renderizar todo es insignificante.

### Funciones

- `rutinaHoyStr()` — fecha de hoy en UTC (`toISOString().slice(0,10)`).
- `rutinaLoad()`/`rutinaSave(d)` — leer/escribir `coach_rutina_v1`.
- `rutinaTareasDia(dow)`/`rutinaTareasHoy()` — tareas de un día de la semana, ordenadas por hora.
- `renderRutinaLive()` — actualiza el widget "🟢 Ahora mismo / 🔜 Siguiente / ✅ Progreso" (ids `rutina-now-txt`, `rutina-next-txt`, `rutina-progress-txt`, `rutina-progress-pct`, `rutina-progress-bar`, y los puntos de color `rutina-now-dot`/`rutina-next-dot` vía `CAT_META`) comparando la hora real contra `rutinaTareasHoy()`. Se llama cada 30s (`setInterval`) y tras cada cambio de checkbox.
- `buildDayTabs()`/`verDia(dow)` — construyen y manejan las 7 pestañas de día (`#rutina-day-tabs`, clase `.day-tab`); `rutinaDiaSel` guarda el día actualmente visible (por defecto, hoy).
- `renderRutinaTimeline()` — pinta `#rutina-timeline` (línea de tiempo vertical, ver sección de diseño visual arriba) y `#rutina-day-summary` con las tareas del día seleccionado. **Solo si `rutinaDiaSel` es hoy** los checkboxes son interactivos y persisten; si se está viendo otro día, se muestran deshabilitados como referencia (no hay historial por fecha pasada específica, solo el día de hoy guarda).
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
- El **Dashboard** (`../Dashboard/dashboard.html`) lee `coach_rutina_v1` directamente (`D.rut`) y **duplica** `RUTINA_TASKS` (63 tareas, deben quedar byte-idénticas — verificado con `JSON.stringify` en cada cambio), las 4 fechas de `PHASES`, y el array `SK` de 12 skills. **Si editas el horario de `#rutina`, los valores base del radar, o las fechas del Plan Maestro aquí, hay que replicar el cambio en `Dashboard/dashboard.html`** — no hay sincronización automática entre archivos. Ver tabla de "Datos duplicados" en [`../README.md`](../README.md).
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `Coach_v2.html` directamente en cualquier navegador, sin instalación ni servidor. No hay exportación de datos (a diferencia de Finanzas/Salud/Ejercicio/Proyectos) — lo único persistido son el tema, los valores del radar y el progreso de la rutina diaria.
