# Coach_v2.html — Coach de vida de Adán

Aplicación de una sola página (HTML+CSS+JS, sin backend, sin dependencias externas de gráficas — el radar de habilidades es un `<canvas>` dibujado a mano, no Chart.js). Es el núcleo del plan de vida/negocio de Adán: diagnóstico financiero real, Plan Maestro hacia $1,000,000 líquido, rutina diaria completa, roadmap de aprendizaje, y una guía legal/fiscal tanto personal como para constituir una empresa. Único import externo: Google Fonts (Inter + Playfair Display).

Tema claro/oscuro con toggle (🌙/☀️ arriba a la derecha), persistido en `localStorage['coach-theme']`. Soporta ambos temas completos (`:root` y `:root[data-theme="dark"]`).

## Dos modos, completamente separados

Un único botón (`cambiarModo('personal'|'empresa')`) alterna entre dos `<div class="vista-panel">` independientes, cada uno con su propio sidebar izquierdo (`<nav class="sidebar">`, agrupado por prioridad en `.sb-group`) y su propio `<main>`, donde **solo la sección elegida se muestra** (`irASeccion(sec, tab, el)` — ver sección dedicada "Rediseño de navegación" más abajo, 2026-08-10):

- **🪙 Coach — Personal** (modo por defecto): `#perfil` · `#rutina` · `#aprendizaje` · `#perfil-rico` · `#networking` · `#marca-personal` · `#legal-personal`
- **🏢 Coach — Empresa**: `#posibles-negocios` · `#mas-ideas` · `#crear-empresa` · `#legal`

## Modelo de datos — 4 claves de `localStorage`

| Clave | Forma | Qué guarda |
|---|---|---|
| `coach-theme` | `'dark' \| 'light'` | Tema activo, se aplica como `data-theme` en `<html>` al cargar. |
| `radarp_{skillId}` | entero 0-100 (una clave por skill, 12 en total) | Overrides del radar de habilidades — si no existe, se usa el valor base hardcodeado en `SK` (ver más abajo). IDs: `ventas, copy, marketing, network, liderazgo, codigo, ia, datos, inversion, finanzas, ingles, mente`. |
| `coach_rutina_v1` | `{ completado: { 'YYYY-MM-DD': ['taskId', ...] } }` | Progreso diario de la Rutina (ver sección `#rutina` abajo). Fecha en UTC (`toISOString().slice(0,10)`), misma convención que el resto del proyecto. |
| `coach_checks_v1` | `{ [checkboxId]: true, ... }` | **Nueva el 2026-08-01.** Persistencia genérica de *todos* los demás checklists `.check-item` del archivo (Próximos 14 días, Metas, Networking, Marca Personal, Legal & Personal, Legal de empresa, Posibles Negocios, Perfil del Rico, etc.) — antes solo tachaban visualmente y se perdían al recargar. Ver "Persistencia de checklists" más abajo. Los checkboxes de `#rutina-timeline` quedan **fuera** de esta clave a propósito (siguen usando `coach_rutina_v1`, con fecha). |

## Persistencia de checklists + exportar respaldo (2026-08-01)

Auditoría de la app encontró que **~90% de los checklists del archivo eran puramente visuales** (tachaban el texto al marcar, pero se reseteaban a cero en cada recarga) — incluyendo el checklist "Próximos 14 días" (`pf1`-`pf10`), cuyo propio último ítem (`pf10`) le pide a Adán "revisar este apartado completo una vez por semana", algo que no tenía sentido si nunca recordaba qué ya estaba marcado. Solo `#rutina` (vía `coach_rutina_v1`) y el radar de habilidades (vía `radarp_*`) persistían de verdad.

**Fix genérico, al final del `<script>` principal**: todo checkbox `.check-item` que exista en el HTML al cargar la página (es decir, todos excepto los de `#rutina-timeline`, que se generan dinámicamente y ya tienen su propia persistencia con fecha) ahora se guarda/restaura automáticamente en `coach_checks_v1` (`{[id]: true}`), además de seguir tachando el texto visualmente. No hace falta tocar cada sección una por una — el mismo bucle cubre `#perfil` → 🎯 Metas, Networking, Marca Personal, Legal & Personal, Legal de empresa, Posibles Negocios y cualquier checklist nuevo que se agregue después con la misma clase `.check-item` y un `id` único, sin tener que escribir código adicional.

**Exportar respaldo** (botón `⬇️` junto al toggle de tema, `exportCoachData()`) — Coach era la única app "grande" del ecosistema sin esto (a diferencia de Finanzas/Salud/Ejercicio). Descarga un `coach_YYYY-MM-DD.json` con las 3 claves de datos reales: `coach_rutina_v1`, `coach_checks_v1` y los 12 `radarp_*` (agrupados bajo `radar`). No incluye `coach-theme` (preferencia visual, no dato de seguimiento).

## `#perfil` — Mi Perfil Real

La portada única del modo Personal (fusiona lo que en versiones viejas eran Dashboard + Perfil por separado). Hero con 4 KPIs (`.hero-kpis`) — **solo `id="kpiDiasMeta"` (días restantes al 01 ene 2030) se calcula en vivo**; los otros 3 (patrimonio líquido, deuda total, fondo de emergencia) son texto fijo a propósito desde el 2026-08-02: son el **punto de partida congelado de Fase 0** (18 jul 2026), etiquetados explícitamente como "al iniciar" — ver nota "Progreso real vs. punto de partida" más abajo para los mismos números pero en vivo. **4 subtabs** (`showSubtab('perfil', tab, btn)` — subió de 3 a 4 el 2026-08-03 con la nueva Adán Prime, ver nota abajo):

- **Diagnóstico & Plan** — historia real (mantenimiento industrial farmacéutico → Ford → Continental → Bosch → Stuttgart → Google/Intelliswift → ALTEN), diagnóstico financiero riguroso, fortalezas/debilidades, moat competitivo, riesgo principal, el **Plan Maestro en 4 fases** con navegación por pasos (`#fase0`..`#fase3`, botones `.plan-step` con `id="step0"`..`id="step3"`), y (nuevo 2026-08-02) la tarjeta **"📈 Progreso real vs. el inicio de Fase 0"**.
- **🎯 Metas** (`#perfil-metas`, reemplazó a "Posibles Negocios" el 2026-07-30 — ver nota abajo) — checklist de metas de vida en 4 tarjetas dentro de `.perfil-grid` × 2: 🚩 Corto plazo (torneo de ajedrez, Hyrox, liquidar Banamex y cancelar la tarjeta, liquidar TC BBVA, fondo de emergencia a $10,000), 🧭 Mediano plazo (liquidar el crédito del BYD Dolphin Mini, $500,000 ahorrados, trabajar remoto, Cupra Formentor), 🏔️ Largo plazo (ser millonario con la empresa ya creada, departamento en la zona que quiera) y ✨ Extras/bucket list (pelear en Tailandia, rascacielos en Hong Kong, lanzamiento de SpaceX, retomar la Maestría en Alemania, Hyrox internacional). Cada meta con fecha/monto conocido cita el dato exacto ya existente en Diagnóstico & Plan (calendario de deuda, meta de $500,000 de la Maestría, meta de $1,000,000 del Plan Maestro) en vez de inventar uno nuevo. Checkboxes `.check-item` **sí persisten desde el 2026-08-01** en `coach_checks_v1` (ver "Persistencia de checklists" más abajo) — antes no lo hacían.
- **⚡ Adán Prime** (`#perfil-dan-prime`, nuevo 2026-08-03) — ver la subsección dedicada "Adán Prime — cómo debería ser tu mejor versión" más abajo.
- **CV Completo** — CV imprimible; `downloadCV()` cambia `document.title`, llama a `window.print()` y restaura el título al terminar (o al evento `afterprint`). **Regla de impresión actualizada 2026-08-03**: la regla `@media print` que oculta los demás subtabs al imprimir el CV ahora también incluye `#perfil-dan-prime` (antes solo `#perfil-diagnostico, #perfil-metas`) — sin este ajuste, imprimir el CV habría incluido también el contenido de Adán Prime.

**2026-07-30 — "Posibles Negocios" se movió a Coach Empresa** (a petición explícita de Adán): las 8 tarjetas de negocio (`id="negocio1"`..`id="negocio8"`, `.negocio-grid`) y sus 3 tarjetas de apoyo (Plantillas de mensajes, Cuánto cobrar, Seguimiento de outreach) viven ahora completas en `#posibles-negocios` dentro del modo Empresa (ver sección "Modo Empresa" abajo) — contenido byte-idéntico, solo cambió el contenedor (de `.subtab-panel` dentro de `#perfil` a `<section>` de nivel superior). El slot que dejó libre en el subtab-nav de `#perfil` ahora lo ocupa 🎯 Metas.

### Progreso real vs. punto de partida de Fase 0 (nuevo, 2026-08-02)

Pedido explícito de Adán: *"lo de fase 0 debe registrar los números en que se inició todo... si lo cumplo antes yo te diría y cambiamos las estrategias futuras, pero necesito tener esas stats"*. Hasta ahora `Coach_v2.html` no leía ningún dato de `Finanzas.html` — todos sus números financieros eran texto fijo. Dos cambios:

1. **Los 4 KPIs de `.hero-kpis`** (arriba del todo en `#perfil`) se re-etiquetaron explícitamente como el punto de partida — "Patrimonio líquido **al iniciar**", "Deuda total **al iniciar**", "Fondo emergencia **al iniciar**" — con una nota justo encima ("📸 Punto de partida de Fase 0 — congelado al 18 jul 2026, no cambia aunque tus finanzas mejoren"). Los valores en sí **no cambiaron** (siguen siendo los mismos `-$308,830`/`$366,137`/`$0` de siempre) — es una relabeling, no una migración de datos.
2. **Tarjeta nueva "📈 Progreso real vs. el inicio de Fase 0"** (`#progresoRealGrid`, justo antes de "Trayectoria estimada de patrimonio líquido"), con `renderProgresoReal()`: lee `localStorage['finanzasmx_v2']` directamente (primera vez que este archivo toca datos de Finanzas), calcula 3 cifras en vivo con la misma fórmula que usa `Dashboard/dashboard.html` (`patrimonioNeto`/`metaDebtInfo`) — deuda cara hoy (Banamex+BBVA), deuda total hoy, patrimonio líquido hoy — y muestra el delta contra el punto de partida hardcodeado (`deudaCaraInicial=46693` = $14,349.72 + $32,343.31 al 18 jul 2026; los otros 2 puntos de partida reusan los mismos `366137`/`-308830` de `.hero-kpis`). Verde + borde verde si el delta va en la dirección correcta (deuda bajando, patrimonio subiendo), rojo si no. Si `finanzasmx_v2` no existe todavía en ese navegador, muestra un aviso en vez de romperse.

Este es el mecanismo que responde directamente al pedido de Adán: como los 3 números "al iniciar" ya no se tocan nunca, y los 3 números "hoy" se recalculan solos cada vez que abre la pestaña, puede ver en cualquier momento si va adelantado o atrasado contra el plan y decidir si ajusta la estrategia de las fases siguientes — sin tener que hacer la resta a mano ni ir a revisar `Finanzas.html` aparte.

### Adán Prime — cómo debería ser tu mejor versión (nuevo, 2026-08-03)

Pedido explícito: *"en coach crea una seccion de como seria dan prime, la mejor version de mi"*. Nuevo 4º subtab de `#perfil` (`#perfil-dan-prime`, entre 🎯 Metas y CV Completo, orden real en el HTML). Contenido **100% anclado a hechos ya existentes en el resto del archivo** — no es aspiracional genérico ("cree en ti", "sé disciplinado"), sino la proyección concreta de datos/decisiones que ya están documentados en `#perfil-diagnostico`, `#perfil-metas`, `#rutina` y `#perfil-rico`:

- **Intro** ("⚡ Adán Prime — quién eres el 01 de enero de 2030") — encuadre: es el mismo Adán, con las mismas decisiones que ya está tomando hoy, sostenidas 3.5 años.
- **`.perfil-grid` de 6 tarjetas**: 💰 Financiero (patrimonio $1,000,000 líquido vs. los -$308,830 "al iniciar" de hoy, Banamex/BBVA en $0 — mismas cifras que `.hero-kpis` y "Progreso real"), 💪 Físico (Hyrox completado e Hyrox internacional, del bucket list de 🎯 Metas), 🧠 Mentalidad (referencia directa a la propia frase de Adán ya citada en Diagnóstico sobre no querer "explotar su potencial" a medias — Adán Prime es la versión que sí lo hizo), 🚀 Negocio & Liderazgo (empresa ya creada, apoyada en su historial real de liderazgo en Bosch/Stuttgart y en la Opción 5 del negocio con su papá), 🌍 Red & Relaciones (networking real construido, no solo la meta escrita), 🎯 Experiencias (ajedrez, alemán, inglés C1, los ítems ya listados en el bucket list de largo plazo).
- **`.riesgo-box` "⚠️ Lo que Adán Prime ya no hace"** — lista honesta de los patrones que el propio Adán ya se auto-diagnosticó en Diagnóstico & Plan (p. ej. el patrón de abandono a medio camino) descritos en pasado, como algo ya superado.
- **Cierre "🪞 De aquí a ahí"** — enlaza de vuelta a la tarjeta en vivo "📈 Progreso real vs. el inicio de Fase 0" (arriba en el mismo subtab de Diagnóstico), para que Adán Prime no quede como una foto aspiracional aislada sino conectado al tracking real de avance.

No agrega ninguna clave nueva de `localStorage` — es contenido estático, igual que `#perfil-rico`/`#networking`/`#marca-personal`.

### Navegación rápida a los subtabs de `#perfil` (fix, 2026-08-03)

Adán reportó: *"en coach como que faltan subtabs arriba para que me lleven a los diferentes temas, debido a que no todos estan y me es tardado hacer scroll down"*. Diagnóstico: el `<nav>` superior ya tenía un link 1:1 por cada `<section>` de nivel superior (no faltaba ninguna sección) — el problema real era que **los 4 subtabs de `#perfil`** (Diagnóstico, Metas, Adán Prime, CV) solo eran alcanzables haciendo clic en los botones `.subtab-btn` **dentro** de `#perfil`, después de hacer scroll manual hasta ahí; no había atajo directo desde el `<nav>` de arriba.

- **`goToPerfilTab(tab)`** (nueva función, justo después de `showSubtab()`) — busca el botón real del subtab pedido (`document.querySelector('#perfil .subtab-btn[onclick*="'tab'"]')`), llama a `showSubtab('perfil', tab, btn)` para activarlo, y hace `el.scrollIntoView({behavior:'smooth', block:'start'})` sobre `#perfil`. Se armó como función nueva **a propósito, en vez de usar `<a href="#tab">` directo** — un ancla común no funciona aquí porque el panel destino empieza con `display:none` hasta que `showSubtab()` le agrega la clase `.active` (mismo tipo de bug ya visto antes con el HUD del Dashboard bloqueando clics, ver `../Dashboard/readme_dashboard.md` → "Ajustes del 2026-08-02"; un simple ancla habría hecho scroll hasta un panel invisible, sin activarlo).
- **3 nuevas píldoras en el `<nav>`** (modo Personal), insertadas entre "Mi Perfil Real" y "Rutina": `🎯 Metas`, `⚡ Adán Prime`, `📄 CV` — cada una `<a href="#perfil" onclick="goToPerfilTab('...');return false;">`. El `href="#perfil"` se deja como respaldo semántico/accesible; el salto real lo hace el `onclick` (`return false` evita el salto crudo del navegador antes de que `showSubtab()` alcance a activar el panel).

Verificado con Playwright: los 3 links activan el subtab correcto (`.subtab-panel.active` y `.subtab-btn.active` correctos para `dan-prime`/`metas`/`cv`), balance de `<section>` sin cambios (11=11 — Adán Prime es un subtab, no una sección nueva de nivel superior), balance de tags 1480=1480, `node --check` limpio, y la suite completa `test_coach_v2.js` (regresión general del archivo) sin fallos ni errores de consola.

### Plan Maestro — fechas (IIFE en el `<script>`, ~línea 3084)

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

**Fase 0 — prioridades actualizadas el 2026-08-02**: Adán pidió explícitamente quitar "régimen fiscal" de las tareas pendientes de Fase 0 ("eso ya quedó", el trámite ya está resuelto) y reemplazar "mensaje directo a 5 ex-colegas" por atención real al negocio de su papá ("ni siquiera va acorde a lo que tengo, quita eso, ponle que debo revisar fotos del negocio de mi papá y ponerle atención"). Se actualizaron los 3 lugares donde esto aparecía como tarea activa: la lista de la fase (`#fase0`, semana 1-2), el checklist "Próximos 14 días" (`pf2` régimen fiscal se eliminó del todo; `pf5` ex-colegas ahora dice "revisar las fotos y el material del negocio de tu papá"), y el párrafo de contexto al inicio de `#rutina`. El checkpoint de Fase 0 y el `.concepto-item` de "Supuestos del plan" que mencionaba régimen fiscal como bloqueador también se actualizaron a tiempo pasado (ya resuelto). Régimen fiscal **sigue documentado como contexto histórico/legal** en `#legal-personal` y en los recursos de `#aprendizaje` — solo se quitó como tarea pendiente activa.

**Las listas semana a semana de las 4 fases ahora son checklists reales (2026-08-02)**: Adán vio el detalle completo replicado en el Dashboard (ver abajo) y pidió "ponles un checklist para ver qué ya hice". Los `<ul><li>` de `#fase0`-`#fase3` se convirtieron en `.fase-checklist` (un `<div class="check-item">` por ítem, mismo patrón que "Próximos 14 días"), con ids estables `s0-1`..`s0-7` (Fase 0), `s1-1`..`s1-6` (Fase 1), `s2-1`..`s2-5` (Fase 2), `s3-1`..`s3-4` (Fase 3). No hizo falta JS nuevo en este archivo — el bucle genérico de "Persistencia de checklists" (arriba) ya cubre cualquier `.check-item input[type=checkbox]` nuevo automáticamente, así que estos quedan guardados en `coach_checks_v1` igual que el resto. **El Dashboard también escribe en estos mismos ids** (ver `Dashboard/readme_dashboard.md`) — marcar una semana desde cualquiera de los dos archivos se refleja en el otro, mismo `localStorage` compartido.

### Gráfico de Habilidades (IIFE en el `<script>`, ~línea 4131 — llamado "Radar FIFA" hasta el 2026-08-09, ver sección propia más abajo "Rediseño: ya no es radar, es barras" para el detalle completo del cambio de nombre/layout)

Array `SK` con 12 skills, cada una `{id, name, full, icon, val, w (peso), cat, desc}`. Al cargar, sobreescribe `val` con lo que haya en `localStorage['radarp_'+id]` si existe (esta clave de `localStorage` no cambió de nombre — solo el nombre visible de la sección). `calcOVR()` calcula el overall ponderado por `w`. `draw()` pinta las 12 barras **a todo el ancho** en `#skillBarsFull`, agrupadas por categoría, colapsadas por default (ícono+nombre+nivel+valor+barra) — clic en cualquiera abre un acordeón con descripción+slider+botón de roadmap, vía `toggleSkillRow(id)`. `updateSkillVal(id,val)` (expuesta en `window`) actualiza `SK`, persiste en `radarp_{id}` y actualiza solo los nodos puntuales de esa fila (no llama a `draw()`, para no interrumpir el arrastre del slider activo). `showSkillTab(id)`/`goToSkillDetail(id)` abren el detalle expandible de una skill (roadmap 0→100, contenido estático por skill) — sin cambios.

**Esta misma lista de 12 skills (valores base y pesos) está duplicada en `Dashboard/dashboard.html` (constante `SK`)** para el slide "🧠 Habilidades" — si cambian los valores base o pesos aquí, hay que replicarlos allá.

## `#rutina` — Rutina Diaria (sistema más complejo del archivo)

Reescrita por completo el 2026-07-29 para dejar de ser un checklist visual sin memoria y convertirse en un **tracker real, distinto cada día de la semana**, que cubre ejercicio, skincare, el trabajo en ALTEN, ventas/outreach, el Plan Maestro y finanzas — no solo "tiempo libre".

**2026-07-31 — tareas agrupadas con subtareas, para no verse "interminable"**: Adán pidió explícitamente juntar en una sola tarjeta las cosas que hace de corrido (skincare + minoxidil AM y PM, cena + preparar el desayuno del día siguiente), mostrado como subtareas dentro de una sola tarjeta en vez de filas sueltas — y enlazar la rutina con `CuidadoPersonal/comida.html` para saber qué comer. Ver detalle completo abajo en "Tareas agrupadas (`subtareas`)".

### `RUTINA_TASKS` — fuente única de verdad (61 tareas de nivel superior, 99 tareas reales contando subtareas)

Array top-level `{id, dias:[0-6], hora:'HH:MM', cat, txt, fijo?:true, subtareas?:[{id,txt,link?}], link?:{href,label}}` (dias: 0=domingo…6=sábado). Se filtra y ordena por hora para obtener el horario de cualquier día (`rutinaTareasDia(dow)` / `rutinaTareasHoy()`). `link` es opcional en una tarea simple o en cualquier subtarea — se renderiza como un enlace inline `→` que abre en pestaña nueva (`taskLabelHtml()`).

**Reescrito por completo el 2026-08-02** (reemplazó la versión del 2026-07-29 que asumía que salía de ALTEN directo a casa) — Adán detalló su horario real de tarde/noche: sale de ALTEN, maneja Didi un rato corto, va al gym, y por la noche retoma Didi hasta cerca de las 9pm antes de cenar. Se levanta **6:40** (corregido el 2026-08-15 — antes decía 7:00, que era en realidad la hora del baño), dedica **20 min a construir este ecosistema**, se baña ~**7:03**, sale de casa **7:40** ya manejando **Didi con direccionamiento** rumbo a ALTEN (~50 min, cambio del 2026-08-15), trabaja en ALTEN **8:30–17:00** (con su descanso para comer a la **13:00**; el horario de entrada es flexible y la hora de salida no se recorre), y se duerme entre **00:00 y 01:00** tras un segundo bloque de la aplicación a las 23:30 — **5h40–6h40 de sueño**, no las ~7h que este documento afirmaba antes.

- **Común Lun-Vie** (`dias:[1,2,3,4,5]`) — horas verificadas contra el código el 2026-08-15, este párrafo llevaba tiempo desfasado 15-30 min respecto a `RUTINA_TASKS`: despertar **06:40** → **`wd-app-am` = 💻 Construir esta aplicación, 06:43** (20 min, ver abajo) → bañarse 07:03 — `wd02lav` (Lun/Jue) agrupada con detalle real de lavado de cabello (champú/acondicionador/aceite en puntas, ver "Cuidado del cabello en la ducha" abajo) o `wd02co` (Mar/Mié/Vie) ducha normal sin lavado → **`wd0304` = 🧴 Skincare + 🍂 Minoxidil AM, 07:20** (agrupada, 4 subtareas — ver "Skincare con productos y beneficio" abajo) → suplementos AM (07:25) → vestirse (07:33) → **`wd06` = 🚗 Didi con direccionamiento camino a ALTEN, 07:40** (~50 min, era "Salir de casa — traslado ~20 min" hasta el 2026-08-15) → **`wd07` = 🏢 ALTEN, jornada laboral 8:30–17:00, `fijo:true`** → **`wd12b` = 🛒 Comprar comida, 13:00** (en el descanso de ALTEN) → **`wd08` = 🚗 Didi, 1 pasajero a Buenavista (~40 min), 17:00** → **ejercicio del día, 17:40** (agrupada, sublista detallada de ejercicios — ver abajo) → ducha rápida (18:30) → bloque de habilidad del día solo Mar/Jue/Vie (19:00) → **`wd-didi2` = 🚗 Didi, sesión **corta** de la noche hasta ~20:00, 19:20** (recortada el 2026-08-15) → **prioridad activa de Fase 0, 20:00–21:15** (1h15, era de 15 min) → **`wd14` = 🍽️ Cena + preparar la comida de mañana, 21:15** (agrupada, mismo platillo para cenar hoy y llevar mañana a ALTEN — ver nota de eficiencia abajo) → lectura (21:45) → **`wd16` = 📓 Diario del día, 22:15** (agrupada, clarificada — ver abajo) → **`wd1718` = 🧴 Skincare + 🍂 Minoxidil PM, 22:30** (agrupada, 4 subtareas) → **`wd19` = 🎯 Planear el día de mañana, 22:45** (agrupada, clarificada — ver abajo) → meditación (23:00) → suplementos PM (23:05) → tiempo libre (23:10, 20 min) → **`wd-app-pm` = 💻 Construir esta aplicación, 23:30** (hasta 00:00, a veces 01:00) → dormir `wd21` (anclada en 23:59, ver abajo por qué no es 00:00).
- **Bolsa GBM — solo lunes** (`lu-gbm`, `dias:[1]`, 09:00): "💰 Bolsa GBM: revisar portafolio + VOO + USD/MXN e invertir — solo lunes". Antes era un bloque diario a las 18:35 — Adán aclaró que solo invierte al inicio de semana, así que se quitó de los demás días entre semana.
- **Ejercicio (17:40, después de la Didi corta) y bloque de habilidad** (`e1`-`e5`, `k2`/`k4`/`k5`, un id por día 1-5): Lun=Empuje (pecho/hombro/tríceps), Mar=Cardio+core+Datos/SQL, **Mié=Natación** (45 min, alberca Francisco Márquez — reemplazó a "Jalón (espalda/bíceps)" el 2026-08-07, ver sección propia más abajo), Jue=Cardio/HIIT+Datos/SQL, Vie=Piernas/glúteo+Copy. **Lun y Mié ya no tienen bloque de habilidad** — antes ahí iba "publica 1 post de LinkedIn" (`k1`/`k3`), que se quitó por completo (ver "Marketing pospuesto" abajo).
- **Sábado** (`sa01`-`sa15` + `sa-didi1`/`sa-didi2`, `dias:[6]`): **día de ingreso desde el 2026-08-15** — despertar 07:00, skincare+minoxidil AM, desayuno, entreno largo, **`sa0506` = 🚿 Ducha + lavar cabello** (agrupada, mismo cuidado capilar que Lun/Jue más una mascarilla semanal — ver abajo), **`sa-didi1` = 🚗 Didi bloque de día 09:00–14:00**, almuerzo (14:00), revisión semanal de finanzas (14:40), tiempo libre/familia (15:30), **`sa-didi2` = 🚗 Didi bloque de tarde-noche 17:00–22:00**, cena (22:00), skincare+minoxidil PM, suplementos, meditación, dormir 23:00. **Ya no tiene** el bloque de "Ventas: 5 mensajes" (`sa09`), el bloque profundo de 4h (`sa06`) ni los 30 min de IA aplicada (`sa08`) — los 2 últimos cedieron su lugar a los turnos de Didi (ver abajo).
- **Domingo** (`do01`-`do12` + `do045`/`do-alm`/`do-didi2`, `dias:[0]`): **día de máximo ingreso desde el 2026-08-15** — despertar 07:30, skincare+minoxidil AM, desayuno, descanso activo, **`do045` = bañarte** (ducha normal, sin lavado de cabello — nueva el 2026-08-07, ver abajo), **`do05` = 🚗 Didi bloque de día 09:00–14:00**, **`do-alm` = 🍽️ Almuerzo 14:00** (nueva — el domingo no tenía comida agendada en absoluto), **`do-didi2` = 🚗 Didi tarde-noche 14:40–21:00**, cena ligera (21:00), y el cierre de semana comprimido en 40 min corridos: finanzas (21:20), checkpoint del Plan Maestro (21:35), **`do09` = 📓 Diario de cierre de semana** (21:45, agrupada), skincare+minoxidil PM (22:00), suplementos (22:15), meditación (22:30), dormir 22:45.
- **`fl1` ya no existe** (eliminado el 2026-08-15). Era "bloque largo de freelance/plantilla si ya hay cliente o ventas activas", `dias:[6,0]` a las 17:00 — perdió el sábado y luego el domingo, porque ambas franjas son ahora turnos de Didi. Era condicional y en la práctica estaba vacío. **Hay que volver a crearlo cuando se cobre el primer peso en las Opciones 1-3**, que es el momento que marca `s1-4` del Plan Maestro para mover horas de Didi al negocio.

Tareas con `fijo:true` (solo `wd07`, el bloque de ALTEN) se muestran en la línea de tiempo y cuentan para "ahora/siguiente", pero **no llevan checkbox y no cuentan en el % de progreso**.

### Cambios del 2026-08-02, uno por uno

Pedido explícito de Adán, con detalles concretos de su día real:

- **🛒 Comprar comida (13:00)** — nueva, en su descanso de ALTEN.
- **🚗 Didi a Buenavista (17:00, ~40 min) + gym a las 17:40** — "quisiera ir al gym como 5:40, debido a que 5 a 5:40 trabajaré de Didi llevando solo un pasajero a Buenavista". Reemplazó el traslado genérico de vuelta a casa.
- **Ejercicio con sublista detallada** — "debes ser muy completo, una sublista de los ejercicios que debo hacer". Cada `e1`-`e5` ahora es una tarjeta agrupada con 3-5 subtareas nombrando el ejercicio exacto y series×reps (p. ej. Lun: Press de banca 4×8, Press inclinado con mancuerna 3×10, Press militar 3×10, Elevaciones laterales 3×12, Fondos en banco 3×12) — antes era una sola línea genérica tipo "Ejercicio: Pesas — Empuje". **No se tocó `ejercicio.html`** ni su propio programa semanal (`S.rutina`/`GYM_RUTINA_DEFAULT`) — esta sublista vive solo en la rutina diaria de Coach, es un desglose del mismo bloque, no un tracker de pesas/PRs nuevo.
- **🚗 Didi de la noche (19:20, hasta ~21:00)** — "en las noches cuando termino de trabajar de Didi como 9pm". Reemplazó el bloque condicional "Didi solo si Opciones 1-2 aún no generan ingreso".
- **🍽️ Cena + preparar la comida de mañana** — "debe ser lo mismo que haré [cenar y preparar] para ahorrar tiempo": la subtarea ya no dice "cenar" y "dejar listo el desayuno" como dos acciones separadas con platillos distintos, sino cocinar **un solo platillo** que sirve para cenar hoy y llevar de comida mañana a ALTEN. (Hora movida a las 21:15 en la segunda ronda de ajustes del mismo día — ver abajo.)
- **Bolsa GBM movida a solo lunes 9am** — antes diaria a las 18:35, ahora `lu-gbm` (solo `dias:[1]`) a las 09:00, "porque solo invierto al inicio de semana".
- **Marketing/LinkedIn pospuesto** — se eliminaron `k1`/`k3` ("publica 1 post de valor en LinkedIn", Lun/Mié). Adán aclaró que eso lo hará como parte del proyecto de marketing del negocio de su papá, no como bloque genérico de su rutina personal.
- **Ventas eliminado de la rutina** (`wd12` entre semana y `sa09` sábado, "🤝 Ventas: 5 mensajes personalizados") — "quita lo de ventas, aún ni tengo nada que vender". No se tocó la skill "Ventas" del Radar FIFA (`SK`, ver abajo) — sigue existiendo como competencia a largo plazo, es un concepto distinto al outreach diario que sí se quitó.
- **🎯 Prioridad activa de Fase 0 actualizada** — el texto ya no menciona "régimen fiscal, outreach" (ambos resueltos/reemplazados, ver sección de Fase 0 más abajo), ahora dice "negocio de tu papá o plantilla GBM". (Hora movida a las 21:00 en la segunda ronda de ajustes del mismo día — ver abajo.)
- **📓 Diario del día y 🎯 Planear el día de mañana, clarificados** — Adán dijo explícitamente "lo de journaling ni siquiera lo entiendo, no sé qué se hace ahí, ni lo de plan 1 MIT". Ambos bloques pasaron de una sola línea vaga a tarjetas agrupadas con subtareas que explican paso a paso qué escribir: el diario pide 3 logros del día + 1 lección + 1 gasto evitable (igual que antes, pero ahora explícito subtarea por subtarea); planear mañana pide elegir 1 sola tarea más importante (explicando qué significa "MIT") + anotar 4 tareas más chicas en orden.

### Segunda ronda de ajustes — 2026-08-02, mismo día

Tres correcciones más, tras ver la rutina en uso:

- **🎯 Prioridad activa de Fase 0 movida de las 18:40 a las 21:00 (después de la Didi de la noche)** — "en la rutina lo de fase 0 lo hago después de manejar Didi porque si no perdería tiempo". Antes quedaba entre la ducha y el bloque de habilidad, cortando el impulso de salir a manejar; ahora es lo primero que hace al terminar Didi (21:00), antes de cenar. Esto recorrió 15 minutos toda la cadena de la noche: cena 21:00→**21:15**, lectura 21:30→**21:45**, diario 22:00→**22:15**, skincare PM 22:15→**22:30**, plan de mañana 22:30→**22:45**, meditación 22:45→**23:00**. Dormir se queda igual a las 23:55 (el colchón antes de apagar pantallas baja de ~70 a ~55 min, sigue siendo suficiente).
- **📖 Lectura con libro concreto por día, ya no genérica** — "la lectura, ni siquiera me das libros que podría leer, en Coach me ofreciste muchos". `wd15` (una sola tarea común, "30 min lectura física") se reemplazó por 5 tareas específicas por día (`l1`-`l5`, mismo patrón que `e1`-`e5`/`k2`/`k4`/`k5`), cada una con un libro ya recomendado en otra parte del archivo (no se inventó ninguno nuevo): Lun *"$100M Offers"* (Alex Hormozi, recurso de Ventas en `#aprendizaje`), Mar *"Storytelling with Data"* (Cole Nussbaumer Knaflic, recurso de Datos), Mié *"Psicología del Dinero"* (Morgan Housel, recurso de Finanzas), Jue *"The Millionaire Next Door"* (Thomas Stanley, recurso de Finanzas y de `#perfil-rico`), Vie *"Never Split the Difference"* (Chris Voss, recurso de Ventas).
- **🧘 Meditación / respiración box, explicada paso a paso** — "lo de respiración, ni siquiera sé qué es 4-4-4-4". `wd20` pasó de una sola línea ("Meditación / respiración box 4-4-4-4") a una tarjeta agrupada con 4 subtareas literales: inhala 4 segundos, sostén 4 segundos, exhala 4 segundos, sostén sin aire 4 segundos — repetir el ciclo ~10 veces en los 10 minutos. Las meditaciones de sábado (`sa14`) y domingo (`do11`), que antes solo decían "Meditación", ahora aclaran "misma respiración box 4-4-4-4 que entre semana" para no repetir las 4 subtareas completas 2 veces más.

Los tres cambios se replicaron igual en `Dashboard/dashboard.html → RUTINA_TASKS` (ver comando de verificación de "Referencias cruzadas" más abajo) — subió de 54 a 58 tareas de nivel superior (54 + 5 de lectura − 1 de `wd15` que se eliminó) y de 85 a 92 hojas reales contando subtareas.

**Lectura vuelta a genérica (2026-08-07)** — Adán aclaró que todavía no compra los 5 libros asignados arriba. `l1`-`l5` mantienen sus `id`/`dias`/`hora`/`cat`, pero el `txt` volvió a ser genérico: `'📖 Lectura (30 min)'`, sin título de libro. Replicado igual en `Dashboard/dashboard.html → RUTINA_TASKS` — verificado que ambos archivos siguen byte-idénticos con el comando de "Referencias cruzadas" más abajo. Cuando Adán compre los libros, se puede volver a poner un título concreto por día.

### Skincare — con nombre de producto y para qué ayuda (2026-08-02)

Adán pidió explícitamente no dejarlo genérico: "lo del skincare no estás siendo nada claro, debes poner los productos, el nombre y en qué me ayuda". `wd0304`/`wd1718` (AM/PM entre semana) ahora tienen 4 subtareas cada una en vez de 2:

- **AM**: limpiador suave (ej. CeraVe Espuma o Cetaphil) — quita grasa/sudor de la noche; sérum de niacinamida 10% — controla grasa y afina poros; hidratante con SPF 50 (ej. La Roche-Posay Anthelios) — hidrata y protege del sol; minoxidil 5% en cuero cabelludo seco — estimula el folículo.
- **PM**: limpiador (doble limpieza si usó protector solar) — remueve el bloqueador; tratamiento con ácido salicílico o retinol alternando noches — controla brotes y mejora textura; hidratante nocturno — repara mientras duerme; minoxidil 5% — dosis de la noche.

Sábado y domingo (`sa0203`/`sa1113`/`do0203`/`do1013`) mantienen el resumen corto ("mismos productos que entre semana") para no repetir el texto completo 4 veces más en el archivo.

**Desayuno entre semana**: sigue confirmado desde el 2026-07-31 que se prepara la noche anterior y se come ya en ALTEN, no en la ventana de 40 min de la mañana.

### Tareas agrupadas (`subtareas`) — 2026-07-31

Pedido explícito de Adán: "hay cosas que las quiero juntas... si no se verán muchas tareas interminables, ponlo como subtareas pero juntas". Una tarea de `RUTINA_TASKS` puede traer un array `subtareas:[{id, txt, link?}]` en vez de ser una hoja simple — la tarjeta de la línea de tiempo se sigue viendo como **un solo bloque** (una hora, una categoría, una duración), pero adentro lista un checkbox independiente por subtarea, cada uno con su propio `id` persistido en `completado[fecha]` igual que antes.

- **`leafItems(t)`** (nueva) — devuelve `t.subtareas` si existen, o `[{id:t.id, txt:t.txt, link:t.link}]` si la tarea es simple. Unifica el conteo: `renderRutinaLive()` calcula `contables`/`doneCount` sobre `tareasHoy.filter(!fijo).flatMap(leafItems)`, es decir **el progreso se mide por subtarea real, no por tarjeta** (una tarjeta agrupada con 1 de 2 subtareas marcadas cuenta como 50%, no como 0%).
- **`taskLabelHtml(txt, link)`** (nueva) — arma el label del checkbox, agregando `· <a href="link.href" target="_blank">link.label →</a>` cuando la tarea/subtarea trae `link`. Usado tanto en tareas simples con `link` (p.ej. `sa03`, `sa11`, `do03`, `do08`) como en cada subtarea de un grupo.
- En `renderRutinaTimeline()`, una tarjeta con `subtareas` pinta un `.rt-group-title` (el `txt` del grupo, p.ej. "🧴 Skincare + 🍂 Minoxidil — AM") seguido de un `.rt-sub-list` con un `.check-item` por subtarea. La tarjeta completa solo recibe `.rt-done` cuando **todas** sus subtareas están marcadas (`leaves.every(it=>doneHoy.includes(it.id))`).
- CSS nuevo: `.rt-group-title`, `.rt-sub-list` (borde izquierdo tenue para indicar jerarquía), `.rt-link` (color `--accent`, subrayado al hover).
- **Enlace a Comida**: los bloques de comida (cena entre semana/fin de semana, desayuno de fin de semana, preparar desayuno de mañana entre semana) enlazan a `../CuidadoPersonal/comida.html?s=desayunos` o `?s=cenas` — `comida.html` ahora soporta ese query param (`?s=`) para abrir directo esa pestaña, igual que `cuidadopersonal.html` ya soportaba `?tab=`.
- **Verificación**: los dos archivos (`Coach_v2.html` y `Dashboard/dashboard.html`) siguen debiendo ser byte-idénticos en `RUTINA_TASKS` (ver comando de verificación en `../README.md`) — la estructura con `subtareas`/`link` se replicó igual en ambos, y `Dashboard/dashboard.html` también define su propio `leafItems()` para el mismo cálculo de progreso en el slide "Mi Día".

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

## `#aprendizaje` — Aprendizaje: Ataca tus 6 debilidades

6 tarjetas de contenido estático (sin interactividad ni persistencia — los checkboxes `cu1`-`cu6` no guardan nada, decorativos): 📊 Datos/Análisis, 🤝 Ventas/Negociación, 📣 Marketing Digital, 💰 Finanzas personales, 🤖 IA aplicada a proyectos propios, **📈 Inversión en Mercados** (`cu6`, nueva el 2026-08-07). Son las mismas prioridades que alimentan el bloque de habilidad diario de `#rutina` (`k1`-`k5`). (La app separada `Aprendizaje/aprendizaje.html`, que era un tracker de libros/sesiones/skills con su propio `localStorage['aprendizaje_v1']`, se eliminó del proyecto el 2026-07-29; el Dashboard ya no tiene score de aprendizaje.)

**Cada tarjeta ganó 2 párrafos nuevos el 2026-08-07** (pedido desde el Dashboard — ver `../Dashboard/readme_dashboard.md` → "Habilidades — Inversión reemplaza a IA en el top-4, contenido con diagnóstico real" para el pedido original completo: *"me estas diciendo cosas comunes, dame mas info y retroalimentacion"*): "📆 Semanas 2-4" (plan más allá de la primera semana) y "⚠️ Error común" (el error específico que suele frenar esa habilidad), insertados entre "🔁 Hábito recomendado" y el `<hr class="divider">` de recursos. Ventas/Marketing/Finanzas/IA ganaron estos 2 párrafos nuevos sin tocar su diagnóstico existente (el `<p class="fs-13 text-muted">` de arriba, que ya era específico); Inversión es tarjeta completamente nueva, con sus 4 recursos propios (The Intelligent Investor, The Little Book of Common Sense Investing, A Random Walk Down Wall Street, One Up On Wall Street — los mismos 4 libros que ya vivían en `Dashboard/dashboard.html → LISTA_COMPRAS.libros['Finanzas e Inversión']`, no inventados de cero). El párrafo intro de la sección pasó de "tus 5 prioridades reales" a "tus 6 prioridades reales", mencionando explícitamente los 2 campos nuevos.

**Por qué se agregó Inversión específicamente**: en `SK` (más abajo, "Radar FIFA de habilidades"), `inversion` vale 25/100 — más bajo que `ia` (30/100), pero nunca vivió en `APRENDIZAJE` (el objeto que alimenta tanto esta sección como el top-4 del Dashboard). Adán lo notó directo desde el Dashboard: *"inversion tiene menos que IA entonces deberias poner inversion"*. Al agregarla aquí y en `Dashboard/dashboard.html → APRENDIZAJE`, el top-4 ordenado por valor ascendente pasa de `[ventas 15, marketing 20, finanzas 20, ia 30]` a `[ventas 15, marketing 20, finanzas 20, inversion 25]` — IA sigue documentada aquí (sigue siendo una de las 6 tarjetas completas), solo dejó de aparecer en el resumen de 4 del Dashboard.

## `#perfil-rico` — Perfil del Rico (nuevo 2026-07-31)

Pedido explícito de Adán: "pon una sección del ejemplo de las finanzas de alguien rico, cómo se comporta, qué amistades tiene, cómo llegó a ser rico". **Es un compuesto explícitamente declarado como tal en el propio texto de la sección** — basado en la investigación real de Thomas Stanley & William Danko (*The Millionaire Next Door*, ya citado en los recursos de `#aprendizaje` → Finanzas) más patrones públicos bien documentados de frugalidad de inversionistas conocidos (Warren Buffett) — no una persona inventada ni un caso real específico de nadie identificable. Contenido, en tarjetas `.card`:

1. **Cómo se comporta en el día a día** — frugalidad calculada (no tacañería), rutina protegida, lectura diaria no negociable, consistencia "aburrida" sostenida.
2. **Cómo gasta y cómo invierte** — paga primero a sus inversiones, cero deuda de consumo, activos que producen vs. pasivos que aparentan (distinción de *Padre Rico, Padre Pobre*), horizonte de años no de meses.
3. **Qué amistades y red tiene** — círculo chico de alta confianza, mastermind/mentores, selectivo con su tiempo, da valor antes de pedir (cruza directo con `#networking` de abajo).
4. **Cómo llegó a ser rico** — casi nunca solo con salario (siempre negocio propio/equity/inversión sostenida), toma 7-20 años, reinvierte las primeras utilidades, un riesgo calculado específico (no genérico).
5. **`.riesgo-box` "Lo que NO hace"** — no compra estatus a crédito, no se compara en redes contra apariencia, no espera "sentirse listo" para actuar, no trata el dinero como identidad.
6. **Comparación honesta contra la situación real de Adán** — qué de este perfil ya tiene (rutina, horizonte largo, ya identificó que necesita ser dueño de algo) y qué le falta (patrón de gasto en MSI de gadgets, red de pares dueños de negocio en vez de solo colegas empleados) + recursos (suma *Padre Rico Padre Pobre* y *The Millionaire Fastlane* a los ya existentes de Finanzas).

## `#networking` — Networking (nuevo 2026-07-31)

Sección de referencia (con 4 checkboxes `nw1`-`nw4` del hábito semanal, persistentes desde el 2026-08-01 — ver "Persistencia de checklists" más abajo) pedida explícitamente por Adán: "haz una sección de networking, detallada, cómo generar conversación, cómo ganar amigos, cómo persuadir, cómo conocer gente de alto valor, qué lugares/situaciones". Tarjetas `.card`, en orden:

1. **Cómo generar conversación de la nada** — método FORD, preguntas abiertas, dar valor antes de pedir, tolerar silencios.
2. **Cómo caer bien y construir amistad real** — recordar nombre+detalle, regla de Dale Carnegie (70/30), seguimiento 1-3-7-30 (mismo patrón que el outreach de negocio), presentar gente a gente.
3. **Cómo persuadir sin ser manipulador** — los 6 principios de Cialdini (cruza con `#aprendizaje` → Ventas, que ya los tenía como recursos de lectura) aplicados a relaciones, no a cerrar tratos.
4. **El mapa: dónde conocer gente de alto valor en CDMX** (la parte más pedida) — 6 subgrupos: Educación premium (Goethe-Institut presencial aprovechando su alemán A2, EGADE/IPADE), Deporte y bienestar (pádel, ajedrez — cruza con su bucket list de `#perfil` → Metas, golf), Comunidades de negocio (GBM, Endeavor México, South Summit, CAMEXA), Voluntariado, Digital/LinkedIn estratégico, y su red ya validada (Bosch Stuttgart).
5. **Cómo dar el primer paso** — 3 plantillas de mensaje copiables (reactivar contacto, después de un evento, pedir café/llamada), mismo patrón visual que las plantillas de `#posibles-negocios`.
6. **Tu hábito semanal de networking** — 4 checkboxes de cadencia (`nw1`-`nw4`, persistentes) + recursos (Cómo Ganar Amigos e Influir sobre las Personas, Never Split the Difference, Give and Take, The Like Switch, canal Charisma on Command).

Todo el contenido está anclado a contexto real de Adán (red de Bosch/Stuttgart, meta de alemán, bucket list de ajedrez, plantilla GBM) en vez de ser genérico — mismo estándar que el resto de Coach.

## `#marca-personal` — Redes Sociales y Marca Personal (nuevo 2026-07-31)

Pedido explícito: "pon una sección de mejorar redes sociales y marca personal, dame todos los posibles escenarios y sugerencias para mejorar". Diagnóstico honesto de arranque: Marketing Digital es de las skills más bajas del radar (<a href="#perfil">20/100</a>) y hoy no hay presencia digital construida. Estructura:

1. **Por qué no es opcional** — conecta directo con las Opciones 1 (plantilla GBM), 2 (freelance) y 3 (mentoría) de `#posibles-negocios`: nadie compra/contrata a quien no puede encontrar.
2. **Todos los escenarios posibles** (el cuerpo principal, 7 plataformas evaluadas con 3 `.stat-badge` cada una — encaje con su red actual, esfuerzo de producción, y qué tan directo pega a su meta): LinkedIn (empezar aquí), YouTube (mayor techo a largo plazo), X/Twitter (comunidad de builders), Newsletter propio (el único activo que no depende de algoritmo), Podcast como invitado (audiencia prestada), GitHub/portafolio técnico (prueba de trabajo para freelance), e Instagram/TikTok (el que menos encaja, explicado por qué).
3. **Sugerencias concretas para mejorar** — 6 `.recurso-item`: pilares de contenido fijos, consistencia sobre viralidad, documentar en vez de crear de la nada, repurposing entre canales, métricas que sí importan (no vanity metrics), y una nota explícita de **cuidado con confidencialidad** (nunca compartir código/datos de Ford/ALTEN/Bosch, revisar cláusulas de exclusividad).
4. **Plan de arranque de 4 semanas** — 5 checkboxes (`mp1`-`mp5`, persistentes) con acciones concretas por semana, enlazado al bloque de Marketing ya existente en `#rutina`.

## `#legal-personal` — Legal & Personal

Checklist personal (`.check-item`, persistente desde el 2026-08-01), calendario fiscal personal, y bloques colapsables `toggleCard(id, btn)` con "Qué puedo deducir" como asalariado (Salud, Educación, Vivienda, Ahorro para el retiro, Donativos, Trámite y estrategia).

## `#habilidades-valor` — Habilidades de un Hombre de Valor (nuevo 2026-08-04)

Pedido explícito de Adán: *"agrega en sección de coach como modales y habilidades que debo tener como hacer una fogata, proceso de vino, ya sabes cosas interesantes que un hombre de valor debe saber"*. Última sección del modo Personal (después de `#legal-personal`), sin conexión con negocio/finanzas — cultura general práctica, no una skill de negocio. 8 tarjetas `.card`:

1. **🍽️ Modales y etiqueta esencial** — cubiertos de afuera hacia adentro, servilleta, apretón de manos firme, ponerse de pie al saludar, puntualidad; enlaza a [`../Vestimenta/vestimenta.html`](../Vestimenta/vestimenta.html) para qué ponerse según la ocasión.
2. **🔥 Cómo hacer una fogata correctamente** — los 3 materiales en orden (yesca/leña delgada/leña gruesa) y 3 formas de armarla (tipi, cabaña, estrella) como `.recurso-item`, más un `.riesgo-box` de seguridad (nunca dejarla sola, cómo apagarla de verdad).
3. **🍷 El proceso y la cultura del vino** — cómo se hace (fermentación, crianza en barrica vs. acero), los 3 pasos de cata (vista/nariz/boca), temperatura de servicio por tipo, cómo abrir con sacacorchos, maridaje simple.
4. **🥃 Licores y coctelería básica** — diferencia real entre whisky/tequila/mezcal (grano vs. agave, destilación), 5 cocteles clásicos (Old Fashioned, Negroni, Margarita, Whisky Sour, Mojito) como `.recurso-item`.
5. **🪢 4 nudos que de verdad sirven** — as de guía, ocho, nudo llano, ballestrinque, cada uno con cuándo usarlo.
6. **🔧 Mecánica básica de auto** — cambiar una llanta ponchada paso a paso, pasar corriente (orden correcto de cables para evitar chispas), revisar aceite, qué hacer si se sobrecalienta.
7. **🩹 Primeros auxilios que todo hombre debería saber** — Heimlich, RCP básico, cortada, quemadura, más un `.riesgo-box` de "cuándo esto no basta" (cuándo sí llamar al 911).
8. **✅ Cuáles ya dominas** — checklist de 7 ítems (`hv1`-`hv7`, persistentes en `coach_checks_v1` vía el mismo mecanismo genérico de `.check-item` — ver "Persistencia de checklists" arriba, no requirió tocar ese código) para que Adán marque qué ya sabe hacer de verdad vs. qué le falta practicar.

Link agregado al `<nav>` del modo Personal ("Habilidades de Valor", después de "Legal & Personal"). El scroll-spy genérico (`refrescarScrollSpy()`, ver "Funciones utilitarias" abajo) detectó la sección sola, sin tocar JS. Verificado con Playwright: navegación directa a `#habilidades-valor` renderiza las 8 tarjetas; marcar `hv2` persiste en `coach_checks_v1` y sobrevive un recargo real de página; cero errores de consola.

## Modo Empresa

- **`#posibles-negocios`** (nuevo el 2026-07-30, movido desde `#perfil` en modo Personal — ver arriba) — 8 opciones de negocio rankeadas contra el perfil real de Adán, cada una con `id="negocio1"`..`id="negocio8"` dentro de `.negocio-grid` (saltables desde cualquier parte de la app con `irANegocios('negocioN')`, que ahora cambia a modo Empresa con `cambiarModo('empresa')` y hace scroll suave hasta la tarjeta — ya no activa un subtab, porque la sección es de nivel superior, siempre renderizada). Incluye además 3 tarjetas de apoyo: Plantillas de mensajes (listas para copiar), ¿Cuánto cobrar? (tarifas de referencia + checklist `pr1`-`pr4` de protección al cobrar) y Seguimiento de outreach (bitácora manual `oc1`-`oc5`/`og1`-`og3`, persistente).
- **`#mas-ideas`** (nuevo 2026-07-31) — "💼 Más Ideas de Negocio — Convencionales y No Convencionales", banco de ideas más amplio que `#posibles-negocios` (no rankeado contra el perfil de Adán, es solo para explorar). Dos grids de tarjetas `.card` simples (icono+título+descripción corta, sin el detalle de `.negocio-card`): 9 **convencionales** (renta de sillas/mesas — el ejemplo que dio Adán —, inflables, lavado de autos, limpieza, mudanzas, jardinería, food truck, renta de mobiliario de oficina, franquicia de bajo costo) y 11 **no convencionales pero 100% legales** (retail arbitrage, importación de nicho vía Alibaba, monetizar cochera como estacionamiento, Airbnb, self-storage, vending machines, compra-venta de segunda mano, junk removal, foto/dron de eventos, renta de trajes de gala, automatización/datos como servicio). Incluye un `.riesgo-box` explícito al inicio aclarando que "no convencional" significa creativo/poco obvio, **no** ilegal — a petición de Adán se pidió cubrir también "prácticas ilícitas" como categoría, lo cual se rechazó explícitamente por tratarse de contenido que facilita actividad ilegal; la sección cubre solo alternativas creativas y legales.
- **`#crear-empresa`** — guía estática completa para constituir una empresa en México (Persona Física vs. Persona Moral, SAS vs. SA de CV, rutas de constitución, costos/tiempos estimados, obligaciones recurrentes, errores comunes). Contenido de referencia, sin interactividad.
- **`#legal`** — checklist legal del negocio (persistente) + calendario fiscal del negocio + "Qué puedo deducir si tuviera empresa" (Operación, Nómina, Equipo/tecnología, Marketing, Viáticos, Financieros, Protección del negocio, Costo de ventas, Estímulos fiscales adicionales).

## Funciones utilitarias / globales

`cambiarModo(modo)` — alterna modo Personal/Empresa, hace scroll a 0 y cierra el sidebar si estaba abierto en móvil. `toggleTheme()` — alterna `data-theme` y persiste en `coach-theme`. `showSubtab(section, tab, btn)` — subtabs internas de una sección (usado en `#perfil` y en `#crear-empresa`). `toggleCard(id, btn)` — colapsa/expande bloques con chevron. `irANegocios(id)` — cambia a Coach Empresa (`cambiarModo('empresa')`), activa `#posibles-negocios` vía `irASeccion()` y hace scroll suave hasta la tarjeta de negocio indicada; usada desde enlaces `.inline-link` en Diagnóstico & Plan y en 🎯 Metas (modo Personal) para saltar a `#posibles-negocios` (modo Empresa). `irASeccion(sec, tab, el)` / `toggleSidebar()` / `closeSidebar()` — navegación del sidebar, ver sección dedicada "Rediseño de navegación" más abajo (2026-08-10).

## Referencias cruzadas

- El sidebar (ambos modos) tiene un enlace **🚀 Dashboard** fijo al fondo (`.sb-dashboard`, `margin-top:auto`), que apunta a `../Dashboard/dashboard.html`.
- El **Dashboard** (`../Dashboard/dashboard.html`) lee `coach_rutina_v1` directamente (`D.rut`) y **duplica** `RUTINA_TASKS` (61 tareas de nivel superior / 100 contando subtareas, deben quedar byte-idénticas — verificado con `JSON.stringify` en cada cambio), las 4 fechas de `PHASES` junto con el desglose semana a semana de cada fase (`PHASES[].semanas`, ahora `{id,txt}` con los mismos ids `sN-M` que los `.check-item` de `#fase0`-`#fase3` aquí — el Dashboard pasó a mostrar este detalle completo, con checkbox propio, el 2026-08-02), y el array `SK` de 12 skills. **El Dashboard también escribe directamente en `coach_checks_v1`** (comparte los ids `sN-M` con este archivo — marcar una semana en cualquiera de los dos se ve en el otro). **Si editas el horario de `#rutina`, los valores base del radar, o las fechas/semanas del Plan Maestro aquí (incluidos los ids `sN-M` si agregas o quitas un ítem), hay que replicar el cambio en `Dashboard/dashboard.html`** — no hay sincronización automática entre archivos. Ver tabla de "Datos duplicados" en [`../README.md`](../README.md).
- **`#habitos` (Hábitos & Energía) se eliminó por completo el 2026-08-02** ("en coach quita lo de habitos y energia, elimina todo eso") — nav link, sección, CSS (`.habito-*`) y el listener de JS que alternaba la clase `done` en los botones del tracker (nunca persistía en `localStorage`, era decorativo). No queda ninguna referencia activa a `#habitos` en el archivo.
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `Coach_v2.html` directamente en cualquier navegador, sin instalación ni servidor. No hay exportación de datos (a diferencia de Finanzas/Salud/Ejercicio) — lo único persistido son el tema, los valores del radar y el progreso de la rutina diaria.

## Responsivo — iPad / iPhone 15 Pro (2026-08-03)

Pedido explícito: *"crea una version de todos los html, version para ipad y version para iphone 15 pro, para que todo encuadre y pueda verlo en mi celular"*. Se optó por diseño responsivo dentro del mismo archivo (no archivos separados por dispositivo) — más simple de mantener y evita triplicar la lógica JS. A diferencia de `Dashboard/dashboard.html` (carrusel de slides a pantalla completa, mucho más trabajo), este archivo ya era básicamente una página de documento normal con scroll — el `<nav>` superior ya tenía `overflow-x:auto` (se desliza horizontalmente en vez de romperse) y varios grids ya colapsaban a 1 columna a los 700-800px. El trabajo real fue cerrar los huecos que Playwright encontró, no rediseñar el layout:

- **Tarjeta FIFA del radar (`#aprendizaje`)** — `.skill-radar-grid` (`grid-template-columns:auto 1fr`) y su `.skill-radar-card` (`width:320px;position:sticky`) están pensadas para escritorio, junto a los sliders. En ≤800px no caben: nuevo `@media(max-width:800px){.skill-radar-grid{grid-template-columns:1fr!important}.skill-radar-card{width:100%!important;max-width:360px;position:static!important;margin:0 auto 20px}}` — se apila arriba de los sliders y deja de ser sticky (no tiene sentido "pegar" una tarjeta cuando ya no hay una columna angosta al lado). El `!important` es necesario porque ambas reglas base están en `style=""` inline, que le gana a cualquier regla externa sin él.
- **`.hz-grid`** (nueva clase) — 12 tarjetas de estadística (`.hz-stat`, 4 por sección de `#aprendizaje`, p. ej. "$45k · MXN/mes data engineer senior") estaban con `grid-template-columns:repeat(4,1fr)` puesto **inline** en cada una de las 12 `<div>` — un media query normal no puede sobreescribir eso. Se movió el `grid-template-columns`/`gap` a una clase `.hz-grid` (reemplazo global por Node, ya que las 12 tenían el mismo `style=""` byte-idéntico) con su propio `@media(max-width:480px){.hz-grid{grid-template-columns:repeat(2,1fr)}}`.
- **El bug real de fondo — CSS Grid no encoge sus columnas por debajo del contenido**: incluso con los grids ya colapsando a 1-2 columnas, Playwright seguía midiendo overflow horizontal en iPad (820px). Causa: los hijos directos de un grid tienen `min-width:auto` implícito, que usa el tamaño mínimo de su contenido como piso — un `.stat-badge` con etiqueta larga ("🇩🇪 Alemania — líderes de Bosch + expatriados en Stuttgart") o su propio `min-width:110px` (CSS) fuerza su columna más ancha que 1/3 o 1/4 real, y el grid entero se sale del viewport aunque cada columna sea `1fr`. Complicación extra: varios `.stat-badge` traen `style="min-width:auto"` puesto **inline por JS** (para los que tienen etiqueta larga, cancelando el `min-width:110px` de la clase) — un inline style le gana a cualquier regla externa sin `!important`, sin importar el orden. Fix, un solo bloque al final de la hoja (a propósito, para ganar por orden de aparición ante reglas de igual especificidad definidas más arriba, y con `!important` para ganarle también a los inline):
  ```css
  .grid-2 > *, .grid-3 > *, .hero-kpis > *, .hz-grid > *,
  .salud-grid > *, .vida-ideal-grid > *, .perfil-grid > *, .negocio-grid > * {
    min-width: 0 !important;
  }
  ```
- **`.grid-2 > *, .grid-3 > * { min-width: 0 }`** también se agregó junto a la definición original de esas clases (línea ~243) — redundante con el bloque final de arriba, pero se deja documentado como el intento inicial que **no alcanzó por sí solo** (perdía contra `.stat-badge{min-width:110px}`, definida más abajo en el archivo con la misma especificidad) — lección para la próxima vez: un fix de `min-width:0` en un grid con contenido dinámico hay que verificarlo con Playwright, no asumir que "se ve razonable en el código".

Verificado con Playwright en `{width:820,height:1180}` (iPad) y `{width:393,height:852,isMobile:true,hasTouch:true}` (iPhone 15 Pro): las 11 secciones de ambos modos (`#perfil`, `#rutina`, `#aprendizaje`, `#perfil-rico`, `#networking`, `#marca-personal`, `#legal-personal`, `#posibles-negocios`, `#mas-ideas`, `#crear-empresa`, `#legal`), cero overflow horizontal (`scrollWidth-clientWidth`) en las 22 combinaciones sección×viewport, cero errores de consola, `node --check` limpio. No se tocó ninguna función JS, solo CSS y 12 atributos `class=` agregados a divs ya existentes.

## Cuidado del cabello en la ducha — detallado con subtareas + ducha del domingo agregada (2026-08-07)

Pedido explícito: *"todos los días me baño, solo que en esa sección de rutina pon subtask de qué es lo que tengo que hacer para cuidar mi cabello, qué productos debo tener y qué hacer"*. Antes `wd02` (Lun-Vie, 07:03) era una sola línea de texto — "Bañarte — los días de lavado (Lun/Jue/Sáb) lava también el cabello, ver Cuidado del Cabello" — sin detalle real, solo un link genérico a la sección de Cuidado del Cabello. Y revisando el horario completo, **domingo no tenía ninguna tarea de bañarse** — hueco real en `RUTINA_TASKS`, no solo de redacción.

- **`wd02` se dividió en dos tareas** según si ese día toca lavar cabello o no (Lun/Jue/Sáb siguen siendo los días de lavado, sin cambiar ese patrón):
  - **`wd02lav`** (`dias:[1,4]`, 07:03) — agrupada, `🚿 Bañarte + lavar cabello`, 3 subtareas con producto y modo de uso reales (no inventados — extraídos con `haPick()`, el mismo algoritmo de recomendación que usa `cuidadopersonal.html → #cabello`, corrido en Node contra el perfil default de ahí — `grosor:'fino', cuero:'graso', presupuesto:'medio', preocupaciones:['caida','resequedad']` — ya que el perfil real guardado por Adán solo vive en el `localStorage` de su navegador, no en el repo):
    1. Champú: *Vichy Dercos Energising Shampoo (con Aminexil)* — masaje 2-3 min en cuero cabelludo, enjuagar. Lleva el link `✂️ Ver Cuidado del Cabello` (`../CuidadoPersonal/cuidadopersonal.html?tab=cabello`).
    2. Acondicionador: *TRESemmé Keratin Smooth Conditioner* — solo medios/puntas, nunca raíz.
    3. Aceite en puntas (opcional): *Moroccanoil Treatment Light*.
  - **`wd02`** (`dias:[2,3,5]`, 07:03) — sin cambio de horario, solo texto: "Bañarte (ducha normal — hoy no toca lavar cabello, eso es Lun/Jue/Sáb)".
- **`sa05` (Sábado, "Ducha") se convirtió en `sa0506`** — mismas 3 subtareas de champú/acondicionador/aceite más una 4ª: mascarilla capilar (*L'Oréal Elvive Total Repair 5*, 1 vez por semana — se asignó al sábado por ser el único día de lavado con tiempo de sobra, después del entreno largo).
- **`do045` — tarea de bañarse en domingo, nueva** (`dias:[0]`, 08:35, entre `do04` ejercicio y `do05` tiempo libre) — mismo texto que `wd02` (ducha normal, domingo nunca fue día de lavado). Cierra el hueco: ahora los 7 días de la semana tienen una tarea de bañarse.
- **El `link` no se puso en la tarea padre** (`wd02lav`/`sa0506`) sino en la primera subtarea (el champú) — `#rutina` solo renderiza `t.link` cuando la tarea NO tiene `subtareas`; cuando sí las tiene, solo mira `it.link` de cada subtarea individual (`taskLabelHtml(it.txt, it.link)`, línea ~3902). Ponerlo en el padre lo habría dejado invisible en la UI sin ningún error.
- Replicado igual en `Dashboard/dashboard.html → RUTINA_TASKS` — subió de 58 a 61 tareas de nivel superior y de 92 a 100 hojas contando subtareas. Verificado que ambos archivos siguen byte-idénticos con el comando de "Referencias cruzadas" más abajo, y `node --check` limpio en los `<script>` de ambos.
- Los 4 productos concretos (Vichy Dercos, TRESemmé Keratin Smooth, L'Oréal Elvive Total Repair 5, Moroccanoil Treatment Light) son los que ya recomienda `cuidadopersonal.html → #cabello` para el perfil default — si Adán ajusta su perfil real de cabello ahí (grosor/cuero/presupuesto/preocupaciones), la recomendación en pantalla de esa app puede cambiar, pero estas 4 líneas de `RUTINA_TASKS` son texto fijo y **no se recalculan solas** — quedan como una instantánea. Si el perfil cambia de forma duradera, hay que volver a correr `haPick()` con el perfil nuevo y actualizar el texto aquí y en el Dashboard a mano.

## Se lava el cabello todos los días — Mar/Mié/Vie/Dom pasaron de "ducha sin producto" a co-wash con acondicionador (2026-08-07, mismo día)

Corrección explícita: *"yo me lavo diario, pero ponme el nombre de los productos que debo aplicarme ese día, porque sabemos que debe ser diferente y además qué hacer con ese producto"*. El cambio anterior (mismo día, sección de arriba) había asumido que solo Lun/Jue/Sáb tocaba hacer algo con el cabello y el resto de los días era "ducha normal, hoy no toca" — Adán aclaró que se lava el cabello **todos los días**, pero como el champú anticaída (`uso: "...2-3 veces por semana"` en su propia ficha de `HAIR_DB`) no debe usarse a diario, los días sin champú necesitaban su propia instrucción, no un texto vacío.

- **`wd02` (Mar/Mié/Vie) se convirtió en `wd02co`**, agrupada, `🚿 Bañarte + cabello (sin champú hoy)`, 2 subtareas: Acondicionador *TRESemmé Keratin Smooth Conditioner* (co-wash — solo medios/puntas, explica en el propio texto por qué no lleva champú ese día) + Aceite en puntas opcional (*Moroccanoil Treatment Light*, mismo producto que ya usaban Lun/Jue/Sáb).
- **`do045` (Domingo) recibió las mismas 2 subtareas** — mismo patrón, mismos productos, mismo texto explicativo.
- **Los 7 días de la semana ahora tienen un producto y una instrucción de cabello asignados** — 3 días con champú+acondicionador (Lun/Jue/Sáb, sin cambio respecto a la sección de arriba) y 4 días de co-wash con solo acondicionador (Mar/Mié/Vie/Dom). No se agregó variación entre champús (se mantuvo el mismo Vichy Dercos los 3 días de lavado) — solo se diferenció "día con champú" vs. "día sin champú", que es la variación real que importa dermatológicamente y evita inventar un protocolo de alternancia de marcas sin respaldo en `HAIR_DB`.
- Replicado igual en `Dashboard/dashboard.html → RUTINA_TASKS` — se mantuvo en 61 tareas de nivel superior (se reusaron los ids `wd02`→`wd02co` y `do045`, no se agregaron entradas nuevas) y subió de 100 a 102 hojas contando subtareas. Verificado byte-idéntico entre ambos archivos y `node -e "new Function(...)"` limpio en los `<script>` de ambos.

## Productos ya comprados — el champú de Lun/Jue/Sáb pasó de Vichy Dercos a Darrow Doctar (2026-08-07, mismo día)

Pedido explícito: *"para la caspa me compré el Darrow Doctar, igual déjalo en lista de compras y en rutina porque ese me gusta... para lo que es cada producto solo déjame esos y no me des más opciones"*. Detalle completo del catálogo (`HAIR_DB`/`SKIN_DB`) en [`../CuidadoPersonal/readme_cuidadopersonal.md`](../CuidadoPersonal/readme_cuidadopersonal.md) → "Productos ya comprados" — aquí solo el cambio en `RUTINA_TASKS`, que es la única de las 3 categorías que Adán pidió reflejar también en la rutina diaria (CeraVe y Eucerin solo se actualizaron en la lista de compras/guía de Cuidado Personal, no aquí).

- **Aclarado con Adán antes de tocar el código** (pregunta directa, no se asumió): ¿Darrow Doctar reemplaza al Vichy Dercos esos mismos días, o se alterna/usa en días distintos? Confirmó que **reemplaza** — ya no le preocupa la caída en el champú (eso lo sigue cubriendo el Minoxidil diario, sin cambios), ahora su prioridad ahí es la caspa.
- **`wd02la` (Lun/Jue, dentro de `wd02lav`) y `sa05a` (Sábado, dentro de `sa0506`)** — el texto pasó de *"Champú: Vichy Dercos Energising Shampoo (con Aminexil) — masajea el cuero cabelludo 2-3 min, deja actuar 2-3 min más, enjuaga bien"* a *"Champú: Darrow Doctar (shampoo con alcatrão/coal tar, anticaspa) — masajea el cuero cabelludo 2-3 min, deja actuar antes de enjuagar"* — mismos ids, mismo `link` a Cuidado del Cabello en la misma subtarea, solo cambió el `txt`.
- Replicado igual en `Dashboard/dashboard.html → RUTINA_TASKS` — el conteo de tareas no cambió (61 / 102), solo el texto de 2 subtareas ya existentes. Verificado byte-idéntico entre ambos archivos.

## Radar de habilidades — Datos a nivel medio, ponderación visible, link directo desde el Dashboard (2026-08-07)

Pedido desde el Dashboard, aplicado aquí porque `SK` es la fuente real (`dashboard.html` la duplica, ver nota de arriba): *"quiero modificar mi habilidad de datos, porque eso sí lo tengo mejor... ponle algo intermedio, no sé a cuánto equivale. También debo saber las ponderaciones de cada habilidad débil en el dashboard y en Coach porque no se ve, solamente se ve visualmente"*.

- **`SK.datos.val` de 15 a 55** — 55 es el piso del nivel "MEDIO" en la escala ya definida por `getLv()` (líneas ~3974-3980: 0-39 Principiante, 40-54 Básico, 55-69 Medio, 70-79 Bueno, 80-89 Avanzado, 90-100 Élite). Se actualizó también `desc` de esa skill para reflejar que ya no es una debilidad y que el número es un punto de partida ajustable, no un valor final. `SK.datos.w` (ponderación, 1.0) no cambió — Adán no pidió tocar los pesos, solo el valor.
- **Ponderación visible en cada slider** (`buildSliders()`, línea ~4089): el nombre de cada skill ahora muestra `· ponderación ×${s.w}` en `--mono`, chico, junto al nombre completo — antes el peso solo existía en el dato (`SK[].w`) y afectaba el cálculo de `calcOVR()` sin mostrarse en ningún lado.
- **`?skill=<id>` en la URL abre directo el detalle de esa habilidad**: nuevo bloque en el `DOMContentLoaded` del IIFE del radar (línea ~4161) — lee `new URLSearchParams(location.search).get('skill')` y, si es un id válido de `SK`, llama `goToSkillDetail(id)` con 200ms de margen (deja que `buildSliders()`/`draw()` terminen primero). Esto es lo que usa el nuevo link `✏️ Ajustar <Skill> en Coach →` de cada tarjeta de habilidad débil del Dashboard (`?skill=datos#aprendizaje`, por ejemplo) — antes ese link solo existía a nivel de sección (`#aprendizaje`, sin saber a cuál de las 12 skills ir).
- Replicado en `Dashboard/dashboard.html → SK` (mismo valor de `datos`) — ver detalle completo del resto de cambios de esa sesión en [`../Dashboard/readme_dashboard.md`](../Dashboard/readme_dashboard.md) → "Rediseño grande".

## Miércoles de gym pasó de "Jalón (espalda/bíceps)" a Natación (2026-08-07, mismo día)

Pedido: *"sé que cada día hago diferentes ejercicios, ponme imágenes... y además de ejercicio agrega lo de nadar, también quiero nadar"* — se le preguntó a Adán dónde encajaba nadar en su semana real de gym (domingo ya es descanso activo, Lun-Sáb tienen grupo muscular fijo) y confirmó: **reemplaza el miércoles**, no se agrega como día extra.

- **`e3` (`dias:[3]`, 17:40)** pasó de una tarea agrupada con 4 subtareas de series/reps (dominadas, remo, curl con barra, curl martillo) a una sola tarea simple: *"🏊 Ejercicio: Natación — 45 min (alberca Francisco Márquez, Doctores)"* — sin subtareas, porque nadar es una sola actividad continua, no una serie de ejercicios con series×reps como el resto de la semana.
- **Fuente real del cambio**: `CuidadoPersonal/ejercicio.html → S.rutina[3]` y `EJ_DB` (nuevo `e057` "Nadar", categoría Cardio) — ver [`../CuidadoPersonal/readme_ejercicio.md`](../CuidadoPersonal/readme_ejercicio.md) para el detalle completo. `Dashboard/dashboard.html → GYM_RUTINA_DEFAULT` y su copia de `RUTINA_TASKS` también se actualizaron — ver `readme_dashboard.md`.
- Replicado en `Dashboard/dashboard.html → RUTINA_TASKS` — bajó de 61/102 a 61/99 tareas (misma cantidad de nivel superior, 3 hojas menos por quitar las 4 subtareas viejas y dejar 1 tarea simple). Verificado byte-idéntico entre ambos archivos con el comando de "Referencias cruzadas" de arriba.

## Fix: "Meditación (10 min)" en realidad mostraba 55 min hasta la siguiente tarea (2026-08-07)

Adán reportó: *"aquí dices 10 min, pero dura 55, deben ser 10 min, Meditación — respiración box (10 min)"*. La tarea `wd20` (23:00, "🧘 Meditación — respiración box (10 min)") era seguida directo por `wd21` ("📵 Apagar pantallas. Dormir", 23:55) — un hueco de 55 minutos que contradecía la etiqueta "(10 min)" del texto, aunque ese colchón de tiempo libre antes de dormir sí era intencional (documentado en una sesión anterior).

- **Nueva tarea `wd20e`** (23:10, `cat:'descanso'`, "Tiempo libre / relajación antes de dormir") insertada entre `wd20` y `wd21` en `RUTINA_TASKS` — ahora la meditación efectivamente dura 10 minutos hasta la siguiente tarea de la línea de tiempo, y el colchón de 55 min hacia dormir (23:55) sigue existiendo, solo que ahora está nombrado y visible.
- **Replicada igual en `Dashboard/dashboard.html`** (misma copia de `RUTINA_TASKS`, ver `readme_dashboard.md`). No se tocó la hora real de dormir (23:55) ni ninguna otra tarea.
- Verificado: 62 tareas de nivel superior en ambos archivos, estructuralmente idénticas.

## Radar FIFA reemplazado por barras horizontales — mismo componente que el Dashboard (2026-08-07, mismo día)

Pedido: *"pon ese mismo grafico en coach y reemplaza el radar"* — tras reemplazar el radar del Dashboard por barras (ver `Dashboard/readme_dashboard.md` → "Radar de Habilidades reemplazado por barras horizontales"), Adán pidió el mismo cambio aquí, que es la fuente real de `SK`.

- **El `<canvas id="skillRadar">` de la tarjeta FIFA se eliminó** — reemplazado por `<div id="skillBars" class="skill-bars-list">`. La tarjeta (`.skill-radar-card`) se ensanchó de `320px` a `360px` para que las 12 filas quepan cómodas con ícono, nombre, nivel, valor y ponderación en una sola línea sin recortarse.
- **`draw()` (dentro del mismo IIFE "Radar FIFA de habilidades", ~línea 3992) ya no dibuja nada en `<canvas>`** — ahora genera el HTML de las 12 filas (`.skbar-row`, ordenadas de más débil a más fuerte con `[...SK].sort((a,b)=>a.val-b.val)`) y las inyecta en `#skillBars`. El resto de la función (actualizar `#ovrValue`/`#ovrLabel`/`#topSkill`/`#weakSkill`) no cambió — sigue siendo la misma `draw()`, solo cambió cómo pinta el gráfico en sí.
- **Nuevas clases CSS** (`.skill-bars-list`, `.skbar-row`, `.skbar-head`, `.skbar-ico`, `.skbar-name`, `.skbar-chip`, `.skbar-val`), agregadas junto al resto del CSS de la tarjeta FIFA (`@media (max-width: 800px)` de `.skill-radar-card`) — mismos nombres de clase que `Dashboard/dashboard.html` para que sea reconocible como "el mismo gráfico", pero usando las variables de tema de este archivo (`var(--border)`, `var(--text)`, `var(--muted)`, `var(--mono)`) en vez de las de Dashboard (`--ov`, `--text2`). La barra en sí reusa `.progress-bar`/`.progress-fill`, ya existentes en este archivo (usadas en "Progreso del Plan Maestro" y la rutina) — no se duplicó ese componente.
- **Sigue siendo interactivo en vivo**: mover cualquier slider (`updateRadarSkill(id,val)`) sigue llamando `draw()` al final, así que la fila y la barra de esa habilidad se actualizan al instante — antes redibujaba el radar completo, ahora regenera la lista completa de barras (12 filas, más barato que redibujar un `<canvas>` de todos modos). `redrawSkillRadar=draw` (usado por `toggleTheme()` para repintar tras cambiar de tema) sigue funcionando igual, aunque en la práctica ya no hace falta: las barras usan `var()` de CSS, que ya se adaptan solas al tema sin necesitar JS.
- **`SK`, `calcOVR()`, `getLv()` no se tocaron** — siguen siendo la fuente única de verdad que `Dashboard/dashboard.html → SK` duplica (ver nota de arriba, "Radar FIFA de habilidades").
- Verificado con Playwright en los 2 temas: 12 `.skbar-row` en el DOM, el `<canvas>` viejo ya no existe, mover el slider de Ventas de 15 a 75 actualiza la barra correspondiente de inmediato (`width:75%`), buen contraste en claro y oscuro, cero errores de consola.

## Rediseño: ya no es radar, es barras — nombre, layout a todo lo ancho y descripción solo al clic (2026-08-09)

Pedido explícito: *"en la seccion de coach en lo de radar fifa, ya no es radar ahora es grafico de barras cambiale el nombre y ademas rediseña esa seccion por que las barras deben verse completamente y no estar a un lado y cuando haga click en cada habilidad debes mostrarme la descripcion y cuanto de habilidad le puse, eso ya lo tienes, pero solo muestralo cuando haga click en la habilidad, hazlo muy bien visualmente y que todo encaje"*. Van 3 pedidos distintos en el mismo mensaje — se hicieron los 3:

1. **Renombrado** — el título pasó de "Radar de Habilidades — Estilo FIFA" a "📊 Gráfico de Habilidades — Estilo FIFA" (se conservó "Estilo FIFA" porque describe la tarjeta OVR/gamificación, no el tipo de gráfico — eso ya se había corregido de radar a barras el 2026-08-07, solo faltaba que el nombre dejara de decir "radar"). El id del contenedor pasó de `#radarFIFA` a `#skillsSection`, y se actualizaron los 2 lugares que lo mencionaban como texto/link: el checklist de Fase 0 (`s1-6`, antes enlazaba "Radar FIFA") y el párrafo de revisión trimestral (antes "🕹️ Radar FIFA"). `window.redrawSkillRadar` se renombró a `redrawSkillBars` (su único llamador, en `importCoachData()`, se actualizó junto con la función).
2. **Layout — de "360px fijo a un lado + sliders siempre abiertos al lado" a una sola lista a todo el ancho**: antes `.skill-radar-grid` era `grid-template-columns:auto 1fr` — una tarjeta FIFA de `360px` sticky (con las 12 barras MUY angostas dentro, `#skillBars`) a la izquierda, y `#skillSliders` (los 12 sliders, siempre expandidos con su descripción completa) ocupando el resto a la derecha. Layout nuevo, de arriba hacia abajo, todo a ancho completo:
   - **Fila de estadísticas** (`#skillStatsRow`, `.skill-stats-row`, `grid-template-columns:200px 1fr 1fr`) — la tarjeta OVR (número grande + nivel) y las 2 mini-tarjetas (Top habilidad / Área crítica) que antes vivían apiladas dentro de la tarjeta FIFA de 360px, ahora en una sola fila horizontal a todo lo ancho. Colapsa a 1 columna en `max-width:700px`.
   - **Franja de escala** (`.skill-scale-strip`) — los 6 niveles (Élite/Avanzado/Bueno/Medio/Básico/Principiante) que antes ocupaban su propia tarjeta vertical de 12 líneas dentro de la sidebar, ahora una sola franja horizontal compacta con `flex-wrap`.
   - **`#skillBarsFull`** — las 12 barras, agrupadas por categoría (mismas 4 categorías de siempre: Negocios/Técnico/Finanzas/Personal), cada una a todo el ancho de la tarjeta `.card.span-2` (antes limitada a los ~360px de la sidebar) — esto es lo que resuelve literalmente "las barras deben verse completamente y no estar a un lado".
   - Se eliminaron las clases viejas `.skill-radar-grid`/`.skill-radar-card`/`.skill-bars-list`/`.skbar-*` (y su media query de 800px) — reemplazadas por `.skill-stats-row`/`.skill-ovr-card`/`.skill-mini-stat`/`.skill-scale-strip`/`.skfull-*`.
3. **Descripción solo al clic** — antes `buildSliders()` generaba los 12 sliders **siempre expandidos**, con la descripción completa de cada habilidad visible todo el tiempo (mucho scroll, "las 12 con descripción de golpe"). Ahora cada fila colapsada solo muestra ícono+nombre+nivel+valor+barra (el valor numérico SÍ se queda visible siempre, igual que en el Dashboard — es lo que hace que sea un gráfico de barras legible de un vistazo); un clic en la fila (`toggleSkillRow(id)`) despliega un acordeón con la descripción + el slider para ajustar + el botón "📖 Cómo mejorar" — solo una habilidad abierta a la vez, clic de nuevo la cierra. El HTML del acordeón **no existe en el DOM cuando está cerrado** (no es un `display:none` — `skillRowHtml()` solo genera ese bloque si `openId===s.id`), así nunca queda un `<input type=range>` fantasma fuera de pantalla.

**Detalle técnico — por qué el slider no interrumpe su propio arrastre**: el patrón viejo evitaba reconstruir `#skillSliders` en cada tick del `oninput` (solo tocaba `#val_id`/`#lv_id` por id y llamaba a `draw()`, que vivía en el contenedor vecino `#skillBars`, nunca el mismo que tenía el `<input>` activo). El diseño nuevo junta todo en un solo contenedor (`#skillBarsFull`), así que reconstruirlo por completo en cada tick destruiría y recrearía el `<input>` activo, cortando el gesto de arrastre a medio camino. Por eso `updateSkillVal(id,val)` (antes `updateRadarSkill`) **no llama a `draw()`** — actualiza a mano los 3 nodos puntuales de esa fila (`#skfull-val-id`, `#skfull-chip-id`, `#skfull-fill-id`, todos con `id` estable) y la fila de estadísticas vía `updateStatsRow()` (mismo criterio: toca `#skillOvrNum`/`#skillOvrLvl`/`#skillTopVal`/`#skillWeakVal` por id, sin reconstruir HTML). `draw()` (reconstrucción completa) solo se llama al cargar la página y al abrir/cerrar un acordeón — nunca durante el arrastre.

- **`?skill=<id>` desde el Dashboard** (cada tarjeta de habilidad débil, "✏️ Ajustar X en Coach →") ahora abre **el acordeón de esa habilidad Y el roadmap completo** de una vez (antes solo abría el roadmap) — coherente con que la descripción ahora vive detrás de un clic, así el link del Dashboard no aterriza en una fila colapsada sin contexto.
- Verificado con Playwright: 12 filas colapsadas al cargar (0 acordeones abiertos), clic en una fila la expande mostrando la descripción real, mover su slider de 15→45 actualiza el valor/nivel/barra de esa fila y recalcula el OVR y "Área crítica" en la fila de estadísticas sin destruir el `<input>` (sigue en el DOM durante el arrastre), clic de nuevo la colapsa, clic en otra fila cierra la anterior (solo una abierta a la vez), `?skill=finanzas` abre esa fila + el panel de roadmap, el link del checklist apunta a `#skillsSection` con el texto nuevo, la fila de estadísticas colapsa a 1 columna en 480px, y las barras ahora miden ~944px de ancho (antes ~300px dentro de la sidebar de 360px) — cero errores de consola en las 2 páginas probadas (con y sin `?skill=`).

## Mensaje de venta real (no plantilla), tarea k5, primer paso de Ventas, suplementos AM/PM (2026-08-07)

Mismo pedido de cuatro partes documentado en [`readme_dashboard.md`](../Dashboard/readme_dashboard.md) misma fecha. Resumen de lo que le tocó específicamente a este archivo:

- **"Plantillas de mensajes — listas para copiar" (`#plantillas-mensajes`, antes sin `id`, ahora con uno para poder enlazarla desde la rutina)**: el bloque "Opción 1 — post para comunidades de GBM" tenía huecos sin llenar (`[tiempo]`, `[precio]`, `[1-2 líneas...]`) — exactamente lo que Adán rechazó hacer él mismo ("esto en rutina no lo voy hacer"). Se reemplazó por un post terminado y listo para pegar, con las funciones reales de `Finanzas.html` (confirmadas por grep de sus `<section>`: Dashboard, Transacciones, Presupuestos, Deudas, Metas de Ahorro, Plan de Inversiones/GBM, Indicadores) y el precio de lanzamiento ya definido en este mismo archivo ($99-149 MXN) fijado en $99 MXN. Se añadió también una segunda plantilla nueva, "Opción 1 — mensaje directo a un prospecto individual", para el caso de responder a alguien en privado (hueco que no existía antes: solo había plantilla de post, no de DM, para esta opción de negocio).
- **Tarea `k5` (viernes 19:00, `RUTINA_TASKS`) reescrita**: de "✍️ Copy: mejora o escribe 1 mensaje de venta / la landing de la plantilla GBM" (creación) a "📣 GBM: personaliza el post de venta ya escrito (precio/fecha) y publícalo en 1 comunidad real de inversión" (ejecución), con link a `#plantillas-mensajes`.
- **`#aprendizaje` → Ventas (cu2) → "🎯 Primer paso esta semana" corregido**: el texto anterior ("envía 1 mensaje personalizado... a un prospecto real de tu red de Ford/Continental/Bosch") presuponía que Adán ya tenía algo que ofrecer — objeción textual: *"por que me dices esto en coach y dashboard, si ni tengo nada que vender"*. Ahora aterriza en el mensaje ya escrito arriba, con link directo a `#plantillas-mensajes`.
- **Suplementos AM/PM añadidos a `RUTINA_TASKS`**: 6 tareas nuevas (entre semana/sábado/domingo × AM/PM) con `subtareas` detalladas — dosis y momento tomados literalmente del `SUPP_CATALOG` ya existente en `CuidadoPersonal/salud.html` (Vitamina D3, Multivitamínico, Omega 3, Creatina en el bloque AM; Magnesio y Proteína Whey condicional en el PM), insertadas en el horario real de cada variante de día sin chocar con ningún bloque existente (skincare, ejercicio, comida, meditación).
- **Conflicto real detectado con la tarjeta "💊 Suplementación" ya existente** (sección Rutina): decía *"Fuera de prioridad mientras el fondo de emergencia esté en $0... Cuando el fondo de emergencia llegue a $10,000, revisa un stack básico (D3, Omega-3, Magnesio) — no antes."* — directamente en contra de activar 6 tareas de suplementos hoy, con el fondo de emergencia todavía en $0 (Fase 0, meta sep 2026). Se le preguntó a Adán explícitamente cómo resolver la tensión (activar sin condición / solo el stack básico ya preaprobado / dejarlas documentadas pero condicionadas al hito de $10,000); eligió **activarlas ya, sin condición**. La tarjeta se reescribió para no contradecir la rutina: ahora describe los dos bloques ya integrados, enlaza a `#rutina` y a `../CuidadoPersonal/salud.html?tab=suplementos`, y mantiene una única salvedad práctica (comprar de uno en uno conforme se terminen, no los 6 de golpe) en vez de bloquear el hábito por completo.

## Plan Maestro reestructurado por mes — Fase 0 con desglose mensual, Fase 1-3 colapsadas (2026-08-09)

Pedido explícito: *"en coach lo de mi plan para reestructuras metas, deudas, lo de las fases, separalas por meses por que asi solo me estoy saturando y no estoy haciendo nada"*. El problema real: `#fase0` mostraba sus 7 tareas (originalmente repartidas en "Semana 1-2" hasta "Semana 6-10") todas juntas de un jalón — 10 semanas de plan visibles a la vez cuando lo único accionable de verdad es "¿qué me toca ahora?".

- **`#fase0` se reorganizó en 3 `<details class="fase-month" data-month="YYYY-MM">`** — Julio 2026, Agosto 2026, Septiembre 2026 — calculados con matemática real de fechas a partir del inicio de la fase (18 jul 2026) y las ventanas "Semana N-M" que ya tenían los 7 items originales, **no inventadas**: `s0-1`/`s0-2`/`s0-6` (semana 1-2 y "Jul 2026" explícito) → Julio; `s0-3`/`s0-4`/`s0-5` (semana 2-6) → Agosto; `s0-7` (semana 6-10, la regla de "cada peso va a...") → Septiembre, como cierre de fase. El prefijo `<strong>Semana N-M:</strong>` de cada texto se quitó (el mes ya lo dice) — mismo `id`/significado, solo reorganizado y sin ese prefijo redundante.
- **Solo el mes actual empieza abierto** (`initFaseMonths()`, IIFE al final del `<script>`, compara `data-month` contra el mes real de hoy — no hay que tocar esto a mano cada mes que pase) — Julio (pasado) y Septiembre (próximo) arrancan colapsados, un clic para revisarlos. Cada `<details>` tiene un badge (`updateFaseMonthBadges()`) con su estado ("MES ACTUAL"/"PASADO"/"PRÓXIMO") y un conteo `X/Y` en vivo que se recalcula cada vez que se marca un checkbox — **sin volver a tocar `.open`** después del primer render, para que un clic manual de Adán para abrir/cerrar un mes nunca se pelee con el código (ver comentario en el JS sobre por qué se descartó re-sincronizar `.open` en cada cambio: el evento `toggle` se dispara también al asignarlo por script, no solo por clic real, y distinguir uno de otro de forma confiable no valía la complejidad frente a simplemente fijarlo una vez).
- **Fase 1/2/3 se colapsaron enteras** (`<details class="fase-collapse">`, cerradas por default, con un resumen tipo "Ver el desglose completo (6 tareas) — arranca en octubre, todavía no es tu mes") — **a propósito no se les aplicó el mismo desglose mensual que a Fase 0**: sus items no tienen ventanas de fecha reales como "Semana N-M", son secuencias condicionadas a eventos ("con tracción sostenida", "primer peso cobrado, no antes") — convertirlas a meses fijos habría inventado precisión que no existe en el plan real. Colapsarlas enteras igual resuelve el problema de saturación (ya no compiten visualmente con el mes actual de Fase 0) sin fabricar fechas falsas.
- **Checkbox de Fase 0 en `Dashboard/dashboard.html` (`PHASES[0].semanas`) reordenado igual**, con el mismo campo `mes` nuevo (`'2026-07'`/`'2026-08'`/`'2026-09'`) y el mismo texto sin el prefijo de semana — ver [`../Dashboard/readme_dashboard.md`](../Dashboard/readme_dashboard.md) para el rediseño visual completo de ese lado (tabs de mes, banner de pendientes, mismo componente `.mes-tab` que ya usa "Importante este mes"). `s0-1`...`s0-7` siguen siendo los mismos ids en ambos archivos — el checklist compartido (`coach_checks_v1`) no se rompió, verificado marcando un checkbox en un archivo y confirmando que persiste igual tras recargar.
- Verificado con Playwright (reloj fijado a 09 ago 2026): Julio cerrado ("PASADO · 0/3"), Agosto abierto ("MES ACTUAL · 0/3") con sus 3 tareas visibles, Septiembre cerrado ("PRÓXIMO · 0/1"); Fase 1/2/3 colapsadas con su resumen correcto; marcar `s0-3` actualiza el badge de Agosto a "1/3" en vivo y persiste tras recargar la página (`coach_checks_v1`); cero errores de consola.
- Verificado con `node --check` sobre el script inline extraído, y con Playwright en los 2 temas: `k5` y las 6 tareas de suplementos visibles en la línea de tiempo del viernes con su horario correcto; `#plantillas-mensajes` contiene el post terminado y "$99 MXN"; `salud.html?tab=suplementos` (deep-link nuevo, ver [`readme_salud.md`](../CuidadoPersonal/readme_salud.md)) abre directo en la pestaña Suplementos; `RUTINA_TASKS` comparado byte a byte con `Dashboard/dashboard.html` vía JSON.stringify — 68 tareas idénticas en ambos, único diff intencional el `href` de `k5`; cero errores de consola.

## Rutina de domingo: "Tiempo libre / familia" (09:00) → "Trabajar en Didi" (2026-08-09)

Pedido de Adán en `Dashboard/dashboard.html` ("en dashboard en rutina el domingo el tiempo libre/familia pon trabajar en didi"), replicado aquí porque `RUTINA_TASKS` es una de las estructuras duplicadas entre los dos archivos (ver `Dashboard/readme_dashboard.md` → "Datos duplicados"). `do05` (`dias:[0]`, 09:00): `cat:'descanso', txt:'Tiempo libre / familia'` → `cat:'admin', txt:'🚗 Trabajar en Didi'` — mismo emoji/categoría que ya usan `wd08`/`wd-didi2` (Didi entre semana). Verificado byte-idéntico contra `Dashboard/dashboard.html` (único diff restante sigue siendo el `href` de `k5`, ya documentado).

## Opción 9 de negocio (Claude + n8n) y nueva tarjeta de Networking sobre guiar la conversación (2026-08-09)

Dos pedidos de Adán en el mismo mensaje.

**1. Coach Empresa → Posibles Negocios**: *"pon uno de crear automatizaciones con claude y n8n para empresas medianas"*.
- **Nueva `#negocio9`** en `.negocio-grid`: "Automatizaciones con Claude + n8n para empresas medianas" — mismo formato que las 8 existentes (3 `stat-badge`, Qué es / Por qué encaja / Primer paso esta semana / Riesgo principal). Se posicionó explícitamente como la misma jugada que la Opción 4 (CodeReview con IA en ALTEN) aplicada a un mercado más amplio que software embebido: n8n como motor de automatización de flujos (open source, auto-hospedado) + Claude como la capa que razona sobre los datos (clasifica correos, extrae datos de PDFs, redacta respuestas) para empresas medianas (50-500 empleados) sin equipo interno de IA.
- Se actualizó el conteo "8 opciones" → "9 opciones" en la sección `#mas-ideas` y se agregó una frase en la tarjeta de introducción de Posibles Negocios explicando de dónde sale la Opción 9.
- No es una de las 6 estructuras duplicadas con `Dashboard/dashboard.html` (las tarjetas de Posibles Negocios en sí no se replican ahí, solo referencias de texto "Opción N" dentro de `PHASES.semanas`) — no hizo falta tocar el Dashboard.

**2. Coach Personal → Networking**: *"pon una seccion de como guiar una conversacion para sacar informacion que necesitas... yo deberia guiar la conversacion para saber que hace la otra persona, que es capaz de hacer, en que me puede ayudar, debo identificar esas cosas y saber como hacerlo"*.
- **Nueva tarjeta "🧭 Guía la conversación — deja de hablar de ti, identifica qué puede aportar la otra persona"**, insertada en `#networking` justo después de "Cómo generar conversación de la nada" y antes de "Cómo caer bien" — completa el hueco entre "cómo arrancar" y "cómo simpatizar": qué hacer *durante* la conversación para dirigirla.
- Contenido: el "switch mental" (responder corto y devolver la pregunta), las 3 cosas que hay que sacar de cualquier conversación nueva (qué hace / en qué es bueno / dónde se cruza con lo que necesitas), preguntas calibradas tipo Chris Voss ("Qué"/"Cómo" en vez de "Por qué" — reutiliza el libro *Never Split the Difference* que ya vivía en los recursos de esta misma sección) y la técnica del espejo (mirroring). Cierra conectando con el hábito de seguimiento 1-3-7-30 que ya existía más abajo en la misma sección (anotar qué hace/en qué ayuda la persona justo después de la conversación, no de memoria después).
- Verificado con Playwright en oscuro: ambas piezas nuevas renderizan con el mismo estilo de tarjeta que el resto de su sección, sin errores de consola (el único "error de sintaxis" que apareció al validar fue un falso positivo de la herramienta de verificación — un comentario de texto en la línea 499 menciona literalmente la palabra `<script>` dentro de una nota en prosa, no es una etiqueta real; los 2 bloques `<script>` reales del archivo se extrajeron por línea y pasan `node --check` sin problema).

## Skincare/cabello a 1 producto por paso (2026-08-10)

Pedido de Adán en `Dashboard/dashboard.html` (*"en mi rutina de skin care diario y rutina de cabello, usa solo 1 producto"*, aclarado después: *"a veces me recomiendas 2 para la misma cosa"*), replicado aquí porque `RUTINA_TASKS` es una de las estructuras duplicadas entre los dos archivos (ver `Dashboard/readme_dashboard.md` → "Datos duplicados"). El detalle completo de qué cambió y por qué vive en `Dashboard/readme_dashboard.md` → "Rutina de skincare/cabello a 1 producto por paso + clic lleva a Mercado Libre" — aquí solo lo que le tocó a este archivo:

- `wd03a` (Limpiador AM) quedó solo con CeraVe Limpiador Espumoso — antes ofrecía "CeraVe Espuma o Cetaphil".
- `wd17b` (Tratamiento PM) quedó solo con Differin Adapaleno 0.1% Gel (retinoide) — antes alternaba "ácido salicílico o retinol, alternando noches".
- `wd03b`/`wd17a`/`wd17c` (Sérum de niacinamida, Limpiador PM, Hidratante nocturno) ganaron una marca real y única (The Ordinary Niacinamida 10% + Zinc 1%, CeraVe Limpiador Espumoso, Eucerin Hyaluron-Filler + Epigenetic Noche) — antes no tenían ninguna marca.
- `sa13`/`do10` (resúmenes de sábado/domingo) se corrigieron a "+ retinoide", ya no mencionan la alternancia con ácido salicílico que dejó de existir.
- **6 bloques ganaron un flag `producto:true`** (`wd02lav`, `wd02co`, `wd0304`, `wd1718`, `sa0506`, `do045`) — en este archivo no tiene efecto visual ni funcional (Coach no lo lee), es puro dato que viaja con `RUTINA_TASKS` para que el Dashboard sepa en qué bloques mostrar el link de compra a Mercado Libre — esa parte del pedido era exclusiva de "en dashboard en la pagina de la rutina", no se tocó nada de la UI de este archivo.
- Verificado con Node que `RUTINA_TASKS` sigue siendo idéntico entre los 2 archivos salvo el único diff preexistente de siempre (`href` de `k5`, ya documentado arriba).

## Peso agregado a los ejercicios de `e1`-`e5` (2026-08-10, mismo día)

Pedido de Adán en `Dashboard/dashboard.html` (*"en lo de rutina y el recuadro de ejercicio donde esta el peso y las repeticiones no es lo mismo, debe ser lo mismo, pero basate en los ejercicios que ya tienen peso"*), replicado aquí por la misma razón de siempre (`RUTINA_TASKS` compartido). Detalle completo en `Dashboard/readme_dashboard.md` → "Ejercicios de 'Mi Día' ganaron el mismo peso que ya tenía 'Hoy toca'". Resumen: los 12 ejercicios con carga de `e1`/`e2`/`e4`/`e5` ganaron `· Xkg / Ylb` (o `· peso corporal`) al final de su texto — mismos valores que `Dashboard/dashboard.html → EJ_LOOKUP` para los que coinciden, calibrados igual (fuerza media-baja sobre 77kg) para el único que no tiene equivalente exacto ahí (Press inclinado con mancuerna). Verificado con Node que `RUTINA_TASKS` sigue idéntico entre los 2 archivos (mismo único diff de siempre en `k5`).

## Rediseño de navegación: sidebar izquierdo por secciones/subsecciones, click-to-show (2026-08-10)

Pedido explícito: *"en coach tienes la distribucion de botones en la parte de arriba, mejor hazla del lado izquierdo, pero crea secciones, sub secciones, por que hay cosas que estan como mal acomodadas o no tienen su correcta seccion, y hay cosas que no quiero ver siempre, entonces cuando de click solo asi me muestras la pagina del contenido, mientras no, tambien ordenalas en forma de prioridad, pero quiero que la interfaz se vea ordenada y limpia"*.

Reemplaza por completo el modelo anterior: una barra `<nav>` horizontal arriba con las 8 (Personal) o 4 (Empresa) secciones apiladas una tras otra en scroll infinito — **todas visibles siempre** — y un scroll-spy que iba resaltando el link correspondiente según la posición del scroll.

- **Sidebar izquierdo** (`<nav class="sidebar">`, uno por modo — `#sidebar-personal` / `#sidebar-empresa`), sticky debajo de la barra superior, agrupado en `.sb-group` con encabezado de categoría (`.sb-group-label`), ordenado de arriba hacia abajo **por prioridad de uso real**, no por orden de creación:
  - **Personal**: grupo sin encabezado (uso diario) con Mi Perfil Real + Rutina Diaria → **Crecimiento** (Aprendizaje, Perfil del Rico) → **Relaciones & Imagen** (Networking, Marca Personal) → **Referencia** (Legal & Personal, Habilidades de Valor).
  - **Empresa**: **Explorar** (Posibles Negocios, Más Ideas de Negocio) → **Ejecutar** (Crear tu Empresa, Legal & Fiscal).
- **Subsecciones correctamente anidadas** — esto es lo que resuelve el "hay cosas que están mal acomodadas": antes 🎯 Metas / ⚡ Adán Prime / 📄 CV vivían como píldoras sueltas al mismo nivel que "Mi Perfil Real" en el `<nav>`, con un truco (`goToPerfilTab()`) para simular que eran secciones independientes cuando en realidad son subtabs de `#perfil`. Ahora son sub-links indentados debajo de "🧭 Mi Perfil Real" (`.sb-subitems`), reflejando la jerarquía real. Mismo arreglo aplicado a "Crear tu Empresa": sus 4 subtabs (Tipo de entidad, Trámites paso a paso, Costos y tiempos, Después de constituir) ahora cuelgan del header en el sidebar en vez de existir solo dentro de la página.
- **Solo la sección elegida se muestra** ("hay cosas que no quiero ver siempre"): `main > section { display:none }` / `main > section.active-section { display:block }`. Un clic en el sidebar llama a `irASeccion(sec, tab, el)`, que oculta todas las `<section>` del modo activo, muestra la elegida, activa el subtab correspondiente si aplica (reusa `showSubtab()`, sin tocarla), marca el link clicado como `.active` en el sidebar y cierra el sidebar si estaba abierto en móvil. `goToPerfilTab()` se eliminó por completo (se quedó sin llamadores — `irASeccion()` generaliza el mismo patrón a las 12 secciones de ambos modos, no solo a los 4 subtabs de `#perfil`).
- **Scroll-spy eliminado** (`refrescarScrollSpy()` y el listener de `scroll` que resaltaba el link visible por posición) — ya no aplica: con una sola sección visible a la vez no hay nada que "espiar" por scroll.
- **`irANegocios(id)`** (usada desde varios checklists del Plan Maestro para saltar a una tarjeta de "Posibles Negocios") ahora también llama a `irASeccion('posibles-negocios', null, ...)` antes del `scrollIntoView` — antes esa sección siempre estaba visible y bastaba con el scroll; ahora hay que activarla explícitamente o `scrollIntoView` no tendría efecto sobre un contenedor en `display:none`.
- **Numeración de secciones (`01`, `02`...) pasó de `counter()` de CSS a un atributo `data-num`** en cada `<h2 class="section-title">` — un `counter-increment` no corre en un elemento con `display:none`, y con solo una sección visible a la vez todas habrían mostrado siempre "01".
- **Responsive** — por debajo de 880px el sidebar se vuelve un panel off-canvas (`position:fixed`, `transform:translateX(-100%)`) que se abre con un botón ☰ nuevo en la barra superior (`toggleSidebar()`, junto a un overlay semitransparente) y se cierra tocando el overlay o eligiendo cualquier sección (`closeSidebar()`).
- Limpieza: se quitó una regla `:root[data-theme="dark"] nav {...}` que compensaba un color hardcodeado del `<nav>` horizontal viejo (no basado en variables) — ya no hace falta porque el sidebar nuevo usa `var(--surface)`/`var(--border)`, que ya resuelven bien en ambos temas por sí solos.
- **`.modo-switch`** (Personal/Empresa + tema + exportar, arriba de todo) ganó un botón ☰ a la izquierda (solo visible en móvil) y se dividió en `.modo-switch-center`/`.modo-switch-right` para acomodarlo sin desordenar los botones existentes.
- Verificado: los 2 bloques `<script>` reales del archivo pasan `new Function()` sin errores (extraídos por posición exacta después de `</style>`, para no toparse con un comentario en prosa preexistente en el CSS que menciona literalmente la palabra "script" entre ángulos), balance de `{`/`}` en el CSS 438/438, y balance exacto de apertura/cierre en todo el archivo para `<div>` (1574/1574), `<nav>` (2/2), `<main>` (2/2) y `<section>` (12/12).

## "🏆 Ya logradas" — 2 metas de mediano/largo plazo ya cumplidas (2026-08-11)

Pedido explícito: *"en la seccion de mediano a largo plazo, quiero otras metas que ya alcance, pero con el mismo estilo que las demas que ya tenemos, las metas eran correr 11k en la carrera del politecnico ipn y los corri en 1 hora y 10 min, y el otro avanzar a basico 5 en nivel aleman en cenlex santo tomas"*.

- **Tarjeta nueva `card span-2`** al final de `#perfil-metas` (después de "Largo plazo"/"Extras — bucket list", en su propio `.perfil-grid.mt-16` a todo el ancho) — mismo patrón exacto que el resto de esta pestaña: `<h4>` + subtítulo `.fs-13.text-muted` + `.check-item` por meta. Los 2 checkboxes (`mty1`, `mty2`) llevan el atributo `checked` desde el HTML (no hay ningún id nuevo que colisione, verificado con grep) — a diferencia de las demás metas de la pestaña, estas no se "destrackean": son hechos ya cumplidos, no algo en progreso, así que aparecen tachadas de entrada (la regla CSS `.check-item input:checked + label{text-decoration:line-through}` ya existente las tacha sin código nuevo) y quedan como registro histórico, no como checklist activo.
- **No se replicaron en `Dashboard/dashboard.html`** — el "Mis Metas" del Dashboard (`METAS_CORTO_MEDIANO`/`cortoMediano`/`largoExtras` dentro de `renderMetasSlide()`) es un sistema de tarjetas con foto + checklist real + barra de "ritmo vs. calendario" (`pintarEdadPace()`) pensado para metas **activas**, con progreso 0→100% — no encaja con 2 hechos que ya están 100% cumplidos y no requieren seguimiento. Si Adán pide llevarlas también al Dashboard como registro, es un cambio aparte (tarjeta de solo lectura, sin barra de progreso ni detalle).
- Verificado con Node: los 2 bloques `<script>` reales pasan `new Function()` sin errores, balance de `{`/`}` del CSS (438/438 — no se tocó ninguna regla CSS, solo HTML), y balance exacto de apertura/cierre de `<div>` (1578/1578), `<nav>` (2/2), `<main>` (2/2), `<section>` (12/12) en todo el archivo.

## Los 2 bloques semanales de SQL ya no correspondían a sus habilidades reales (2026-08-12)

Lo detectó Adán, no la revisión: *"por que me recomiendas esto, si ya actualizamos las habilidades y esa no es de las bajas 📊 Datos: 30 min de SQL (SQLZoo/Kaggle)"*. Tenía razón, y era una inconsistencia real entre 2 partes de la misma app.

**El diagnóstico**, con los valores actuales de `SK` (Coach_v2.html → Radar FIFA):

| Habilidad | Valor | Peso | Bloques semanales que tenía |
|---|---|---|---|
| Ventas | **15** | **1.5** (el más alto) | solo el post de GBM del viernes |
| Marketing | 20 | 1.2 | — |
| Finanzas | 20 | 1.1 | — |
| Inversión | 25 | 1.2 | — |
| IA | 30 | 1.2 | sábado |
| **Datos** | **55** | 1.0 | **martes + jueves** |

Datos está **7º de 12** y con el peso más bajo, y aun así se llevaba **2 de los 4 bloques de aprendizaje de la semana** (1 hora), mientras que Ventas —su valor más bajo y el de mayor peso— no tenía ninguno propio. El origen es histórico: esos bloques se escribieron cuando Datos valía menos, y **Adán mismo subió el valor a 55**; la rutina semanal nunca se actualizó. La app hasta lo dice en la ficha de Datos (*"Ya no es tu debilidad real"*) mientras seguía agendándolo 2 veces por semana — 2 partes del mismo producto contradiciéndose.

**No se cambió por decisión propia**: se le preguntó en qué quería esos 2 bloques (Ventas ×2 / Ventas+Finanzas / Ventas+Marketing / dejarlo en SQL) y eligió **Ventas + Finanzas**.

- **Martes 19:00 (`k2`)** → *"🤝 Ventas: 30 min — 1 capítulo de Influence / $100M Offers y escribe cómo lo aplicarías a GBM o CodeReview"*, con link a Coach → Aprendizaje. **Es estudio y aplicación por escrito, NO contactar prospectos** — respeta la regla ya establecida de no mandarlo a vender sin una oferta/mensaje terminado.
- **Jueves 19:00 (`k4`)** → *"💰 Finanzas: 30 min — categoriza los gastos de la semana y revisa cuánto bajó la deuda"*, con link directo a `Finanzas.html`. Es el bloque con retorno más directo: su deuda ronda los $366k contra ~$55k invertidos, así que media hora ahí se paga sola en intereses.
- Los 2 se replicaron **idénticos en `Dashboard/dashboard.html` y `Coach/Coach_v2.html`** (ambos tienen su copia de `RUTINA_TASKS`), verificado con Node comparando el `txt` carácter por carácter.
- Se actualizó también **la frase motivacional** que decía *"Saltarte la práctica de SQL hoy es…"* — habría seguido empujando una tarea que ya no existe.
- Verificado con Node: sintaxis OK en las 2 apps, CSS y `<div>` balanceados (dashboard 520/520 y 283/283, Coach 438/438 y 1578/1578); `k2`/`k4` idénticos entre apps; 0 menciones restantes de SQL como tarea semanal o en frases.

**Nota para el futuro**: `SK` (los valores del radar) y `RUTINA_TASKS` (los bloques semanales) son 2 estructuras separadas y **nada las mantiene sincronizadas**. Si Adán vuelve a mover un valor del radar, hay que revisar a mano si los bloques de aprendizaje siguen apuntando a sus habilidades más bajas — no se corrige solo.

## Fase 0 arranca el 1 de agosto, no el 18 de julio (2026-08-12)

Pedido: *"el dashboard de fase 0 y coach, que no empiece de julio, debe empezar en agosto"*. Antes de tocar nada se le preguntaron las 2 cosas que cambiaban el resultado, porque esa fecha alimenta cálculos en vivo (días transcurridos/restantes al 01 ene 2030, % del Plan Maestro, fase activa y comparativa de deuda). Eligió **1 ago 2026** y **conservar la foto financiera con su fecha real de julio**.

- **Fase 0: 18 jul – 30 sep (~10 semanas) → 1 ago – 30 sep 2026 (~9 semanas)**. Las fases 1, 2 y 3 **no se movieron** — Fase 1 sigue arrancando el 1 oct 2026, así que el cambio no arrastra nada del resto del plan.
- **3 lugares distintos definían la fecha** y los 3 se actualizaron: `PHASES[0].start` en `dashboard.html`, y en `Coach_v2.html` tanto `const inicio` (el que calcula días y % hacia 2030) como el arreglo `fases[]` que decide qué fase está EN CURSO. Si solo se cambiara uno, la app mostraría una fase activa y un porcentaje que no concuerdan entre sí.
- **El mes de julio del checklist desapareció**: sus 3 tareas (`s0-1` corregir Deudas, `s0-2` revisar el material del negocio del papá, `s0-6` pausar la Maestría) se movieron al bloque de agosto, **conservando sus ids intactos** — es lo que evita que Adán pierda lo que ya tuviera marcado, porque el checklist se guarda en localStorage por id. Agosto queda con 6 tareas y septiembre con 1. Mismo cambio replicado en las 2 apps (`PHASES[0].semanas[].mes` en el Dashboard, los grupos `data-month` en Coach).
- **Efecto secundario bueno**: el aviso de "⚠️ N pendientes de julio sin marcar" del Dashboard ya no puede dispararse, porque julio dejó de ser un mes de la fase.

### La foto financiera se queda en julio, a propósito

Los 4 números congelados (deuda total −$308,830, deuda cara $46,693 = Banamex $14,349.72 + BBVA $32,343.31) **son una medición real tomada el 18 jul 2026**, y son la base contra la que la tarjeta "📈 Progreso real" compara los datos que lee en vivo de `Finanzas.html`. Re-etiquetarlos a agosto habría sido afirmar que se midieron un día en el que no se midieron, y volver a tomarlos habría borrado como avance todo lo logrado entre julio y hoy. Se dejaron con su fecha y se **reescribió el texto** para que quede claro qué son: *"foto de tus finanzas del 18 jul 2026, la medición previa al arranque de Fase 0 (1 ago)"*. Igual se aclaró el comentario de `deudaCaraInicial` en el código.

**Lo que NO se tocó y por qué**: la fecha `18 jul 2027` de la revisión de la Maestría. No depende del arranque del plan — es el vencimiento de una pausa de 1 año exacto que Adán decidió el 18 jul 2026, con su propio "1 año | 18 jul 2026 → 18 jul 2027" en la interfaz. Moverla habría cambiado un compromiso que él ya tomó.

### De paso: falso positivo conocido en el conteo de `<details>`

Al verificar el balance de etiquetas, Coach daba 7 aperturas contra 5 cierres. **No era un error real ni lo introdujo este cambio** (en `HEAD` daba 8/6, el mismo desbalance de 2): eran 2 **comentarios** —uno de CSS y uno de JS— que citaban la etiqueta literal `<details class="fase-month" ...>` como texto. Es exactamente el mismo tropiezo ya documentado en este proyecto con `<script>` dentro de comentarios. Se reescribieron los 2 comentarios para describir el elemento en prosa ("un elemento details con clase .fase-month") en vez de citarlo con corchetes angulares, y el conteo quedó en 5/5 limpio.

- Verificado con Node: sintaxis OK en las 2 apps; CSS 532/532 y 438/438; `<div>` 281/281 y 1577/1577; `<details>` 5/5. Simulando hoy (12 ago 2026): **Fase 0 sale como activa**, con rango 1 ago → 30 sep; los meses de la fase son solo `2026-08` (6 tareas) y `2026-09` (1); los 7 ids `s0-1`…`s0-7` siguen presentes en las 2 apps; `const inicio` y `fases[0].ini` coinciden en `2026, 7, 1`.

## Plan Maestro rehecho: Banamex liquidada 5 meses antes y la cascada de deuda recorrida (2026-08-13)

Adán liquidó la TC Banamex el 13 ago 2026 pagando los $9,000 completos, no el mínimo. El Plan Maestro la daba por liquidada hasta **ene 2027** como meta de Fase 1, así que toda la cascada estaba desactualizada. Pidió explícitamente actualizarlo *"pon como check que ya pagué Banamex y la fecha"*.

### Qué cambió en Diagnóstico & Plan

**Calendario real de tu deuda** — reescrito contra los datos reales de `Finanzas.html`. Salieron el Vuelo Viva Aerobus MSI y el Mercado Libre MSI (no existen en su historial de BBVA, ver [`../Finanzas/readme_finanzas.md`](../Finanzas/readme_finanzas.md)) y entraron los 3 MSI reales (Merpago*Merca, Mercado Pago, Zap Stylo). Banamex y Ticketmaster aparecen ahora como filas ✅ en verde con la fecha. La cifra de flujo liberado se recalculó: la carga de MSI cae **$2,829 → $1,515 → $494** entre agosto y octubre, liberando **$2,335/mes**, más los **$810/mes** del mínimo de Banamex = **$3,145/mes** (antes decía $3,868, que era la suma del set viejo de MSI).

**Simulación de pago de deuda** — rehecha entera. Ya no hay dos tarjetas en cascada: BBVA es la única deuda cara. Recibe $2,310/mes en agosto, $3,624 en septiembre y $4,645 de octubre en adelante conforme caen los MSI. Proyección con interés del 10% anual incluido: **BBVA liquidada en mar 2027, deuda cara en $0 en abr 2027** — 4 meses antes que el plan viejo (ago 2027) y 3 meses antes de su fecha de revisión de la Maestría.

**Fase 0 y Fase 1** — la meta de Fase 0 pasa de "activos vendidos aplicados a Banamex" a BBVA, con la liquidación marcada en verde. La meta financiera de Fase 1 era literalmente "Banamex liquidada"; como ya se cumplió, se sustituyó por **bajar BBVA de $32,343 a menos de $15,000**, que es lo que sí queda por hacer en esa ventana. `s0-7`, `s1-1` y `pf9` (orden de a dónde va cada peso extra) apuntan ahora a BBVA.

### Checks nuevos y sembrados

Tres tareas quedaron cumplidas: `s0-1`/`pf1` (corregir el presupuesto de Deudas, que quedó en $8,200) y la liquidación en sí. Se agregó `s0-8` ("Liquidar la TC Banamex") en Fase 0 para que el hecho tenga su propia casilla con fecha, y `mtc6` ("Cancelar la tarjeta Banamex ahora que está en $0") en 🚩 Corto plazo — porque la meta original `mtc3` decía *"liquidar la deuda **y cancelar la tarjeta**"* y solo se cumplió la primera mitad; marcarla entera habría sido dar por hecho algo que no pasó.

`seedChecks20260813()` siembra `s0-1`, `s0-8`, `pf1` y `mtc3` como marcadas en `coach_checks_v1`. **No** se usó el atributo `checked` en el HTML: se re-aplicaría en cada carga y Adán no podría desmarcarlas nunca. Es el mismo patrón que `seedMetasLogradasIfNeeded()` del Dashboard — bandera propia (`coach_checks_v1_seed20260813`), corre una sola vez, y solo escribe la clave si no existía ya (`st[id] === undefined`), así que no pisa una decisión previa suya.

`renderProgresoReal()` no necesitó tocarse: lee `finanzasmx_v2` en vivo, así que la deuda cara ya refleja Banamex en $0 sola. Los 4 números congelados del 18 jul 2026 (`deudaCaraInicial = 46693`) se quedan como están — son la medición de referencia contra la que se mide justamente este avance.

Verificado con Playwright: los 4 checks aparecen marcados en una carga limpia, `mtc6` sin marcar, el calendario ya no menciona el Mercado Libre MSI, aparecen los 3 MSI nuevos, "Ene 2027" desapareció y "Mar 2027" está presente. Y la prueba que importa del patrón de siembra: **desmarcando `mtc3` a mano y recargando, sigue desmarcado** — el seed no lo vuelve a forzar.

## Segunda pasada del Plan Maestro: lo que quedó desfasado en Metas y Diagnóstico (2026-08-13)

Adán revisó la ronda anterior y detectó lo que faltaba: *"Corto, mediano y largo plazo aquí no actualizaste la deuda"*. Tenía razón — se habían actualizado los ítems del checklist (`mtc3`, `mtc4`, `mtc6`, `mtm1`) pero no los **textos introductorios** de cada tarjeta de plazo, que seguían citando el calendario viejo:

- **🚩 Corto plazo** decía "coincide casi exacto con dejar la deuda cara en $0" refiriéndose a jul 2027. Ahora dice que Banamex ya cayó y la deuda cara se proyecta a **abr 2027, 3 meses antes** de la revisión de la Maestría.
- **🧭 Mediano plazo** decía "una vez que la deuda cara esté en $0" sin fecha. Ahora cita abr 2027 y aclara que ya solo falta BBVA.

### Los 3 hallazgos del diagnóstico también estaban muertos

El **hallazgo 01** ("Tu presupuesto de deudas está subfinanciado") comparaba $13,372/mes de mínimos contra un presupuesto de $11,700 = hueco de $1,672. Los dos números cambiaron: los mínimos vigentes son **$11,028.98** y el presupuesto quedó corregido en $8,200, que cuadra exacto. En vez de borrar el hallazgo, **se reescribió mostrando que la fuga se movió**: los MSI se contabilizan en la categoría *Suscripciones*, no en *Deudas*, y ahí van $3,259/mes ($2,829 de MSI + $430 de Claude Code e iCloud) contra un presupuesto de $2,000 — **hueco real hoy: $1,259/mes**, que se cierra solo en octubre cuando los MSI bajen a $494. Un hallazgo que se vuelve falso no se tacha, se actualiza a lo que sí es verdad ahora.

El **hallazgo 02** ("El margen real de tu sueldo es mínimo") calculaba $26,000 + $13,372 = $39,372, dejando ~$1,628/mes de margen. Con los mínimos reales: $26,000 + $11,029 = **$37,029**, margen de **$3,971/mes** — más del doble. Se mantiene la conclusión de fondo (su capacidad de maniobra viene de lo extra que genere, no del sueldo) porque sigue siendo cierta, pero con el número correcto.

### Y la copia gemela en el Dashboard

`PHASES` y `META_DETALLE` de `dashboard.html` son duplicados a mano del Plan Maestro y de las metas (ver [README maestro](../README.md) → "Ramificaciones" #3), así que habían quedado desincronizados de la ronda anterior. Se replicó todo: meta y `explica` de Fase 0/1/2, `s0-1`, `s0-7`, `s1-1`, `s2-2`, el nuevo `s0-8`, los pasos de deuda dentro de `META_DETALLE` (`byd`, `cupra`, `depa`, `empresa`) y los 2 avisos de calendario de sep/oct 2026. Detalle en [`../Dashboard/readme_dashboard.md`](../Dashboard/readme_dashboard.md).

**Lección para la próxima**: al actualizar un hecho financiero en Coach no basta con los ítems de checklist — hay que barrer también los párrafos introductorios, los hallazgos del diagnóstico y las 2 estructuras duplicadas del Dashboard. Un `grep` de las cifras viejas (`13,372`, `3,868`, `Ene 2027`) sobre los dos archivos habría encontrado todo esto de una vez.

## Fase 0 reordenada por prioridad real (2026-08-13, tercera pasada)

Instrucción de Adán: *"lo de fase 0, la prioridad ahora es tener mi fondo de emergencia y después otra tarea es liquidar BBVA, deja ahí que ya liquidé Banamex, lo de revisar fotos eso déjalo pendiente, pero lo de llamada exploratoria quítalo —eso ya sé qué hacer con mi papá—, lo de la plantilla de Finanzas déjalo en una sola tarea"*.

### Nuevo orden del checklist de agosto

Las 2 prioridades financieras van **primero y numeradas**, y lo ya cumplido baja al final para no competir por su atención:

| # | id | Tarea |
|---|---|---|
| 1 | `s0-9` **(nuevo)** | **Prioridad 1** — Fondo de emergencia a $10,000 |
| 2 | `s0-10` **(nuevo)** | **Prioridad 2** — Liquidar la TC BBVA ($32,343) |
| 3 | `s0-4` | Subir activos ociosos a Marketplace — es lo que financia la Prioridad 1 |
| 4 | `s0-3` | Plantilla Finanzas.html, de principio a fin (una sola tarea) |
| 5 | `s0-2` | Revisar las fotos y el material del negocio de su papá |
| 6 | `s0-6` | Pausa de aportaciones a la Maestría |
| 7 | `s0-8` | ✅ Liquidar la TC Banamex (13 ago 2026) |
| 8 | `s0-1` | ✅ Corregir "Deudas" en Finanzas ($8,200) |

**`s0-5` eliminada** (agendar la llamada exploratoria con su papá). **`s0-3` y `s0-4` refundidas**: la plantilla era una tarea partida en dos —crear la versión limpia por un lado, publicarla por otro— y ahora es una sola de principio a fin. `s0-4` conserva su id pero se queda solo con la venta de activos, que nunca fue parte de la plantilla y además es la fuente más rápida para completar el fondo de emergencia.

**Por qué se conservan los ids en vez de renumerar todo**: `coach_checks_v1` guarda el estado por id. Renumerar habría borrado lo que Adán ya tuviera marcado. Los ids nuevos (`s0-9`, `s0-10`, `pf11`, `pf12`) son para tareas que antes no existían; el `s0-5` huérfano en localStorage es inofensivo.

También se reordenaron los "Próximos 14 días" (`pf11`/`pf12` nuevos con las 2 prioridades arriba, `pf7` de la llamada exploratoria fuera, `pf6` con la plantilla completa) y el párrafo de contexto de la sección de Negocios, que listaba "las 3 cosas que definen si esta fase se cumple" con Banamex todavía dentro.

### El conteo de acciones ahora se calcula solo

El párrafo de "Próximos 14 días" decía "Estas 9 acciones" escrito a mano. Al quitar una y agregar dos quedó en 10 y el texto se desincronizó — de hecho se escribió mal "8" en la primera versión de este cambio, y lo detectó la verificación con Playwright, no la lectura del código. Ahora hay un `<span id="pfCount">` que se llena contando los checkboxes reales del card al cargar. Un número escrito a mano sobre una lista que cambia es una promesa que se rompe sola.

Verificado con Playwright: el orden de Fase 0 es `s0-9 → s0-10 → s0-4 → s0-3 → s0-2 → s0-6 → s0-8 → s0-1 → s0-7`, la palabra "exploratoria" ya no aparece en ninguna parte del archivo renderizado, la plantilla sale como una sola tarea, el conteo declarado (10) cuadra con el real, los 4 checks sembrados siguen marcados, y marcar `s0-9` persiste tras recargar.

## El sábado se convierte en día de ingreso: dos bloques de Didi (2026-08-15)

Pedido de Adán: *"en mi dia, el sabado quiero trabajar de dia en didi y en la tarde noche tambien"*.

El sábado era el día de trabajo propio y **no tenía nada de Didi**. Meter dos turnos al volante no era añadir tareas sino elegir qué se sacrifica, así que se le presentaron 3 repartos completos del día antes de tocar el código; eligió *"Didi manda (máximo ingreso)"*.

| Antes | Después |
|---|---|
| 08:50 🎯 Bloque profundo 4h (Plan Maestro) | **09:00 🚗 Didi — bloque de día (~5h)** |
| 12:50 Almuerzo · 13:20 🤖 IA aplicada · 16:00 💰 Revisión semanal | 14:00 Almuerzo · 14:40 💰 Revisión semanal · 15:30 tiempo libre |
| 17:00 Freelance/plantilla (`fl1`, compartido con domingo) | **17:00 🚗 Didi — tarde-noche (~5h)** |
| 20:00 Cena → 21:45 Dormir | 22:00 Cena → 23:00 Dormir |

Cambios en `RUTINA_TASKS`: **+2** (`sa-didi1` 09:00, `sa-didi2` 17:00, ambas `cat:'admin'` como los demás bloques de Didi), **−2** (`sa06` bloque profundo, `sa08` IA aplicada), **`fl1` de `dias:[6,0]` a `dias:[0]`**, y 8 tareas recorridas de hora. La mañana (07:00–08:35: despertar, skincare, desayuno, suplementos, ejercicio 1h, ducha) queda intacta, y el cierre completo se conserva entero, solo desplazado 1h15 — como el despertar de las 07:00 no se movió, sigue durmiendo ~8h.

**Nota corregida el mismo día**: la primera versión decía que al quitar `sa08` IA se quedaba sin práctica semanal. Adán lo corrigió (*"en IA no practico pero ando haciendo esta aplicacion"*) — la práctica sí existía, solo que nunca había estado escrita en `RUTINA_TASKS`, así que ninguna app del ecosistema la veía. Ver la sección siguiente.

Replicado idéntico en `Dashboard/dashboard.html` (misma copia de `RUTINA_TASKS`), comparado carácter por carácter. Verificado con Node en los 2 archivos: sintaxis OK, 68 tareas, 16 en sábado en orden cronológico estricto, sin IDs duplicados ni referencias huérfanas a `sa06`/`sa08`.

## La rutina entre semana registra por fin el trabajo en esta aplicación (2026-08-15)

Al documentar el cambio del sábado se afirmó que Adán se había quedado sin práctica de IA. Su respuesta: *"en IA no practico pero ando haciendo esta aplicacion, esto le dedico 20 min cuando me despierto... me despierto entre semana 6:40... y en las noches entre semana igualmente, 11:30 empiezo a trabajar en esta aplicacion hasta las 12 o a veces 1 am"*.

Dos bloques diarios que **no existían en ninguna parte del ecosistema**, y de paso dos datos que estaban **mal**, no solo incompletos:

| Dato | Decía | Es |
|---|---|---|
| Despertar (`wd01`) | 07:00 | **06:40** — las 07:00 eran la hora del baño |
| 06:40–07:00 | *nada* | **20 min construyendo esta aplicación** |
| 23:10–23:55 | tiempo libre (45 min) | tiempo libre 20 min + **app desde las 23:30** |
| Dormir (`wd21`) | 23:55, *"~7h (medianoche a 7:00am)"* | **00:00, a veces 01:00** → **5h40–6h40** |

Nuevas: **`wd-app-am`** (06:43) y **`wd-app-pm`** (23:30), ambas `cat:'aprender'` — **son su práctica real de IA aplicada**, no lectura sobre IA. La habilidad `ia` del radar tenía práctica diaria y el sistema no la veía.

**`wd21` se ancla en 23:59, no en 00:00**, porque el timeline ordena con `hora.localeCompare()` (comparación de texto): un `'00:00'` es menor que `'06:40'` y "Dormir" se habría renderizado como la primera tarea de la mañana. No hay soporte para días que cruzan medianoche en el modelo actual — cualquier tarea futura pasada de las 00:00 tiene el mismo problema.

También se reescribió el **`context-banner` de `#rutina`** (texto visible en la app, no comentario), que afirmaba *"te levantas 7:00"* y *"Duermes alrededor de medianoche (~7h de sueño)"*, y el párrafo "Común Lun-Vie" de este mismo documento, que llevaba tiempo desfasado 15-30 min respecto al código real (decía prioridad de Fase 0 a las 18:40 cuando está a las 21:00, cena 21:00 cuando es 21:15, meditación 22:45 cuando es 23:00, etc.).

Verificado con Node en los 2 archivos: sintaxis OK, 70 tareas, sin IDs duplicados, lunes con 26 tareas en orden cronológico estricto de 06:40 a 23:59. **Pendiente**: Adán dijo "entre semana", así que sábado y domingo no se tocaron.

## El fin de semana se lleva el Didi y las noches entre semana se liberan (2026-08-15)

Tercer ajuste del mismo día: *"el domingo tambien quiero trabajar mucho mas en didi, entre semana deberia enfocarme en lo demas y dedicarme menos tiempo a trabajar en didi"*. No es recorte de ingreso, es **traslado**: las horas al volante se concentran en fin de semana y las noches L-V quedan para construir.

Dos hallazgos del propio proyecto antes de proponer nada:

- **`wd08` (17:00) no cuesta tiempo real** — el pasajero va a Buenavista, que es a donde maneja de todos modos para el gym de las 17:40. El que cuesta es `wd-didi2` (~1h40).
- **`s1-4` (Fase 1) ya decía**: *"Primer peso cobrado en Opción 1-3 → esas horas de DiDi se mueven ahí, no antes."* Estamos en Fase 0, pero mover horas al fin de semana no contradice esa regla — no deja de manejar.

### Domingo: de 8h indefinidas a 11h20

`do05` decía solo *"🚗 Trabajar en Didi"* sin hora de término, y **el domingo no tenía almuerzo agendado**: de las 09:00 a la cena de las 21:00 sin comer.

| Antes | Después |
|---|---|
| 09:00 Didi (sin término) | **09:00 Didi — bloque de día (~5h)** |
| *nada* | **14:00 🍽️ Almuerzo** (`do-alm`, nuevo) |
| 17:00 Freelance (`fl1`) | **14:40 Didi — tarde-noche (~6h20)** |
| 20:00 Finanzas · 20:30 Plan Maestro · 21:00 Cena · 21:20 Diario | 21:00 Cena · **21:20 / 21:35 / 21:45** (cierre en 40 min corridos) |
| 22:15 Dormir | 22:45 Dormir |

El cierre de semana no se elimina, se comprime — es lo que mantiene vivo el Plan Maestro.

### Entre semana: la prioridad de Fase 0 pasa de 15 min a 1h15

`wd-didi2` se recorta a ~40 min (hasta las 20:00) y esa hora se la lleva `wd11`, que pasa de **21:00–21:15 (15 min encajados antes de la cena)** a **20:00–21:15 (1h15)**. Es el bloque que Fase 0 marca como prioridad activa (negocio de su papá / plantilla GBM): **~6h15 semanales que antes no existían**.

### `fl1` eliminado del proyecto

Perdió el sábado y ahora el domingo. Era condicional (*"si ya hay cliente o ventas activas"*) y en la práctica estaba vacío. **Cuando se cobre el primer peso en las Opciones 1-3 hay que volver a crearlo** — es el momento que `s1-4` señala. Anotado en comentario en los 2 archivos.

### Reparto final

Lun–Vie ~1h20/día · Sábado ~10h · Domingo ~11h20 = **~28h semanales**, contra ~19h antes de hoy. Más ingreso total y noches libres entre semana.

Verificado con Node: sintaxis OK, **71 tareas**, sin IDs duplicados, domingo con 17 en orden cronológico estricto. `RUTINA_TASKS` idéntico entre Coach y Dashboard salvo los `href` de `k2`/`k5`, que difieren por diseño (ancla interna aquí, ruta relativa allá) — diferencia preexistente, confirmada contra `git HEAD`.

## El traslado a ALTEN deja de ser tiempo muerto (2026-08-15)

Cuarto ajuste del día: *"de lunes a viernes, tambien deberia manejar al trabajo pero en didi, hay una opcion de direccionamiento... aun que llegue 8:30 al trabajo esta bien"*.

Preguntó si debía hacerlo. Sí: es el mismo razonamiento que ya justificaba `wd08` — ese trayecto lo maneja de todos modos, el único costo nuevo son los ~20 min del desvío.

**La pregunta que sí importaba** era si la hora de salida se recorría. Si ALTEN le descontara esos 30 min, toda la tarde se movería y el bloque de Fase 0 recién ampliado bajaría de 1h15 a 45 min — 2h30 semanales perdidas por ~1h45 de Didi ganada. Confirmó que **su horario de entrada es flexible y sigue saliendo a las 17:00**, así que la tarde queda intacta.

| | Antes | Después |
|---|---|---|
| `wd06` (07:40) | "Salir de casa — traslado (~20 min)", `cat:'descanso'` | **"🚗 Didi con direccionamiento — camino a ALTEN (~50 min)"**, `cat:'admin'` |
| `wd07` | 08:00 | **08:30**, con la salida de las 17:00 explícita en el texto |

Sale a la misma hora (07:40), así que la mañana no cambia: el bloque de la aplicación de las 06:43 y la higiene quedan intactos.

**Dos de sus tres bloques diarios de Didi ya no cuestan tiempo**: `wd06` (~20 min de costo real) y `wd08` (~0, ya manejaba a Buenavista para el gym). Solo `wd-didi2` (19:20–20:00) es tiempo dedicado. El tiempo dedicado a Didi bajó y el ingreso subió — justo lo que pidió esta misma mañana.

También se reescribió el **`context-banner` de `#rutina`**, que decía *"sales 7:40, manejas hasta 8:00"* y *"retomas Didi hasta ~21:00"*, ambas ya falsas tras los cambios de hoy.

Verificado con Node: sintaxis OK, 71 tareas, sin IDs duplicados, lunes en orden estricto de 06:40 a 23:59 con ALTEN entrando 08:30 y la tarde sin moverse.

## Opción 10 de Negocios: llevar el ecosistema a Kickstarter (2026-08-15)

*"en negocios en empresa quiero ver la posibilidad de poner esta aplicacion en kick starter"*.

Nueva tarjeta `#negocio10` con el mismo formato que las 9 anteriores (qué es · por qué encaja · primer paso · riesgo). La diferencia: aquí el primer paso es **verificar 3 supuestos que pueden matar la idea** antes de invertir una hora en la campaña.

1. **¿Kickstarter admite creadores desde México?** Requisitos de país, identificación y cuenta bancaria cambian con el tiempo — se confirma en su página, no se asume.
2. **¿Es el lugar correcto para software?** Su público busca objetos, juegos y obra creativa; el software compite en desventaja porque no hay nada que enviar. Y el modelo es **todo o nada**.
3. **¿Alguien más lo quiere?** El ecosistema está hecho a su medida —su deuda, su rutina de Didi, su meta de 2030—, que es justo lo que lo hace bueno para él y difícil de vender tal cual.

**El primer paso propuesto cuesta cero y no requiere campaña**: al publicar la plantilla de Finanzas.html (Opción 1), añadir una línea pidiendo el correo de quien quiera probar la versión completa. Si junta correos, tiene validación y lista de lanzamiento; si no junta ninguno, se ahorró 3 meses.

Se documentan alternativas mejor ajustadas si la validación sale bien (venta directa tipo Gumroad, suscripción, Product Hunt), con el criterio explícito: **Kickstarter tiene sentido para financiar lo que todavía no existe**, y aquí el producto ya está de pie.

El riesgo principal enlaza con el que ya tenía la Opción 1: el ecosistema contiene su sueldo, deudas, saldos de GBM y horario completo. Cualquier versión pública nace de una copia limpia con datos de ejemplo, y eso es trabajo real, no un buscar-y-reemplazar.

## Los sidebars ya no llevan enlace al Dashboard (2026-08-18)

*"en algunos html el boton de dashboard se repite y esto no debe ser, solo debe estar el de la esquina superior derecha"*.

`<a class="sb-link sb-dashboard">🚀 Dashboard</a>` estaba al pie de **los dos** sidebars — `#sidebar-personal` y `#sidebar-empresa`, que son navegaciones completas e independientes — y repetía lo que ya hace `#btnVolverDash`, el botón fijo arriba a la derecha que llevan los 47 HTML del proyecto desde esta misma mañana.

Se fueron los dos enlaces y, con ellos, la regla `.sb-dashboard` del `<style>`: sus `margin-top:auto` y borde superior existían solo para despegar ese enlace del resto de los `.sb-link`, así que sin ellos era CSS muerto. Los sidebars conservan sus 7 y 3 enlaces de navegación reales. Detalle completo en `../Dashboard/readme_dashboard.md` → "Una sola vía de regreso".

## El enlace al Dashboard vive en el grupo de botones de la cabecera (2026-08-18)

*"hay botones dashboard que ni si quiera van acorde a la interfaz del html, osea sobre ponen a otros botones y eso esta mal, debe ser parte de la interfaz de todos"*.

El bloque flotante `#btnVolverDash` (`position:fixed`, fondo oscuro propio, z-index 9999) que se había insertado esta mañana **se encimaba sobre el botón de tema (`#theme-toggle-btn`)** y no seguía el tema de este archivo. Se retiró junto con su `<style>`: ahora el enlace es un botón redondo más de `.modo-switch-right`, con el 🚀 solo, con la clase `.theme-toggle-btn` que ya usan sus vecinos, así que hereda tema y estilos sin CSS nuevo.

Detalle completo y medición en `../Dashboard/readme_dashboard.md` → "El botón de Dashboard deja de flotar".

## Finanzas e Inversión: las habilidades una por una (2026-08-19)

*"tambien la parte de coach hazla de esta manera, por que teniamos cosas inutiles pero esto si me va servir"*.

Las tarjetas de **💰 Finanzas personales** y **📈 Inversión en Mercados** de la sección de aprendizaje tenían los mismos 4 párrafos que el Dashboard —primer paso, semanas 2-4, hábito recomendado y error común— y los pierden por la misma razón: decían cómo empezar, no qué hay que saber.

En su lugar, **7 sub-habilidades de finanzas y 9 de inversión**, numeradas, cada una con qué es, cómo desarrollarla y con qué libro. El contenido es exactamente el mismo que el del Dashboard —se generó de una sola fuente para las dos apps, así que no pueden desincronizarse como pasó con `RUTINA_TASKS`— pero pintado con las clases propias de Coach (`.subhab*`, en el mismo lenguaje visual que `.recurso-item`).

El bloque de **📚 Recursos** al final de cada tarjeta se conserva: son los 4 libros base de cada área y siguen siendo válidos como punto de entrada.

### De paso, un desbordamiento propio

Al medir el resultado en 390px aparecieron 4 elementos desbordados. Comparado contra `006fae4^` resultó que **2 de ellos los había introducido este mismo proyecto el día anterior**: al integrar el botón de Dashboard en `.modo-switch-right`, ese grupo pasó de 2 iconos a 3 y la barra dejó de caber, porque los botones de modo llevan texto largo ("🪙 Coach — Personal") y `justify-content:space-between` no deja de dónde sacar espacio.

Arreglado dejando que la barra **envuelva** en ≤700px en vez de esconder alguno de los tres botones —ninguno sobra— y con el texto más compacto en ≤420px, para que los dos botones de modo sigan compartiendo fila y la barra no se vaya a 3 filas (medido: 136px de alto en 360px antes del segundo ajuste, 91px después).

### Verificación

1400px, 820px, 390px y 360px: **7 y 9** sub-habilidades en las dos tarjetas, 0 rastros de los 4 párrafos retirados, y **0 desbordes propios** — los 2 que quedan (`.subtab-btn`) son anteriores a todos estos cambios, comprobado contra el mismo commit. Sin errores de consola.

## Las sub-habilidades se pliegan (2026-08-19)

*"no muestres todo, solo lo importante, pero hazlo en forma de boton… para que cuando haga click ya muestres toda la info"*.

Las **16** sub-habilidades de Finanzas e Inversión (7 + 9) pasan de bloque de texto abierto a **botón plegable**: se ve el número y el nombre, y el "qué es / cómo desarrollarla / con qué libro" aparece al tocarlo. La sección se lee como un índice en vez de como un muro.

Mismo cambio y mismo contenido que en el Dashboard (ver `../Dashboard/readme_dashboard.md` → "Las sub-habilidades se pliegan"), con las clases de aquí: `.subhab-h` pasa a `<button>` a todo el ancho, `.subhab-body` nace en `display:none` y `.subhab.open` lo muestra.

**Al verificarlo apareció una trampa que conviene recordar**: medir el alto del cuerpo justo después del clic daba 0 y parecía que el botón no funcionaba. No era el botón — `#aprendizaje` carga con `display:none`, como todas las secciones de este archivo salvo la activa, y dentro de un contenedor oculto cualquier `offsetHeight` es 0. Navegando primero a la sección, el cuerpo pasa de 0 a 115 px al primer clic.

## Cuatro habilidades sociales, con sus libros y con foto (2026-08-20)

*"en lo que todo hombre deberia saber, agrega hacer networkin, persuadir a las personas, como relacionarte con las personas, sacarle lo mejor a una persona, esto detallalo muy bien basate en libros de como influir en las personas, dame la informacion valiosa, no importa que sea muy largo, lo quiero bien detallado y con imagenes en hd, para que me ponga a estudiarlo"*.

La sección tenía 10 tarjetas de habilidades **físicas y de protocolo** —modales, fogata, vino, nudos, mecánica, primeros auxilios— y ni una sola de trato con personas, que es donde de verdad se decide una carrera. Ahora abre con cuatro tarjetas nuevas, **~27,000 caracteres** de contenido:

| Tarjeta | De dónde sale |
|---|---|
| 🤝 **Hacer networking de verdad** | *Never Eat Alone* (Ferrazzi) · *Give and Take* (Adam Grant) · *Superconnector* |
| 🎯 **Persuadir con ética — los 7 principios de Cialdini** | *Influence* y *Pre-Suasion* (Cialdini) · *Never Split the Difference* (Chris Voss) |
| 💬 **Cómo relacionarte con las personas** | *Cómo ganar amigos e influir sobre las personas* (Carnegie) · *Crucial Conversations* · *How to Talk to Anyone* |
| 🌱 **Sacarle lo mejor a una persona** | *Multipliers* (Wiseman) · *Radical Candor* (Kim Scott) · *Drive* (Pink) · *Los 7 hábitos* (Covey) |

**13 libros citados**, cada tarjeta cierra con los suyos y con una línea de por qué ese y no otro.

### Cómo está escrito, y por qué así

No es un resumen de contraportadas. Cada bloque lleva **el mecanismo** (por qué funciona, no solo qué hacer), **guiones textuales** listos para usar —el mensaje de seguimiento a 48 horas, las cuatro herramientas de Voss, las cuatro preguntas que abren a cualquiera— y **el error que arruina la técnica**, que suele ser lo que falta en los resúmenes.

Y todos los ejemplos están **aterrizados a lo suyo**: vender la plantilla de Finanzas en las comunidades de GBM, el negocio de su papá, las entrevistas de trabajo remoto, la CT-GenAI como señal de autoridad. La tarjeta de "sacarle lo mejor" cierra aplicándolo al negocio de su papá — llegar con preguntas en vez de con la solución hecha, porque lo que se le ocurra a él lo sostiene y lo que le impongan lo abandona.

Dos cosas que se cuidaron a propósito:

- **La ética de la persuasión no es un párrafo de relleno.** Cialdini insiste en que solo se puede señalar lo que ya es verdad, y la tarjeta lo dice con su razón práctica: los siete principios funcionan porque hay confianza, y una mentira descubierta la elimina para siempre.
- **Los matices que la versión popular se salta**: que dar sin criterio hunde carreras (Grant), que casi ningún "disminuidor" sabe que lo es (Wiseman), que la empatía ruinosa es el error de la gente buena (Scott), y que los premios empeoran el desempeño en trabajo que requiere pensar (Pink).

### Las fotos

Cabecera de 1920 px en cada tarjeta, con `aspect-ratio: 21/6` en vez de alto fijo para que no se deforme al estrecharse (16/9 en móvil), gradiente al pie y el título encima. Las 4 URLs se comprobaron cargando de verdad a 1920 px antes de escribirlas — el mismo control que se usa para las metas.

### Verificación

Escritorio, iPad y iPhone: **4 cabeceras**, las 4 imágenes cargando a **1920×1280** reales, 13 libros citados, 12 tarjetas en la sección y **0 desbordes** en los tres anchos. Sin errores de consola.

### El repaso de las tarjetas sociales (2026-08-20)

*"revisallo de nuevo tiene que quedar muuuy bien"*.

Mirarlas renderizadas una por una encontró tres cosas que leyendo el código no se veían:

**1 · Dos tarjetas eran un muro de texto.** "Sacarle lo mejor" se leía sola porque usaba bloques con etiqueta; persuasión tenía los 7 principios como 7 párrafos corridos, y Carnegie igual con las 6 formas de agradar y las 4 reglas del desacuerdo. Ahora las cuatro comparten el mismo bloque: **número en círculo, título destacado y el ejemplo propio en su propia caja** (`.hv-p`). Son **21 bloques** en total y 7 cajas de "tu caso".

**2 · Contenido duplicado.** El primer arreglo insertó los 4 pasos del networking pero dejó los párrafos 3 y 4 del formato viejo más abajo — el guion de ejemplo estaba *entre medias* y cortó mal el reemplazo. Los pasos aparecían dos veces. El guion pasó al final del bloque, etiquetado como "paso 2", que es a donde pertenece.

**3 · Un `{` sin cerrar tumbó el CSS de media página.** El intento de insertar el CSS nuevo usó como ancla `    .hv-hero {`, que aparece **dos veces** (la regla y su media query). El reemplazo dejó `.hv-hero {` seguido de la cola de un comentario, y a partir de ahí **el navegador descartó todas las reglas siguientes**: `.recurso-tipo` y `.recurso-item` dejaron de pintarse en todo el archivo — se veían como texto plano de 15 px en vez de etiquetas. Se detectó comparando el `backgroundColor` calculado (`rgba(0,0,0,0)`) contra el esperado, no a ojo.

> El script se rehízo anclando en una línea **completa y única**, y ahora **verifica que el número de llaves del `<style>` cuadre** antes de escribir. Es la comprobación que faltaba: la sintaxis JS ya se validaba, la del CSS no.

**Y dos fotos cambiadas por otras que dicen lo que la tarjeta dice**: networking tenía una sala de conferencias **vacía** y ahora tiene gente conversando; "relacionarte" tenía unas manos frente a una laptop y ahora una conversación real.

**Precisión del dato de Rosenthal**, verificado antes de dejarlo: el experimento fue en **1965** y se publicó en **1968** como *Pygmalion in the Classroom*; el test se llamaba *"Harvard Test of Inflected Acquisition"*, **no existía**, y el 20% señalado estaba elegido al azar. Ese detalle estaba resumido de más y ahora está completo.

### Verificación

Escritorio, iPad e iPhone: 4 cabeceras con las **4 imágenes a 1920×1280 reales**, 21 bloques, 13 libros, **0 duplicados**, **0 desbordes**, y una comprobación explícita de que **el CSS de la página sigue intacto** (que una etiqueta conocida conserve su fondo). Sin errores de consola.

### Una sola casa para el tema: fuera la sección Networking (2026-08-23)

*"pero eso lo quiero en habilidades que todo hombre debe tener"*.

Al revisar por qué Adán no encontraba las tarjetas nuevas apareció la causa real: **Coach ya tenía una sección `#networking`** de 19,119 caracteres, con enlace propio en el sidebar, cubriendo el mismo terreno. Lo más probable es que fuera ahí a buscarlas.

Medido bloque por bloque, **~10,500 de esos 19,119 caracteres se repetían** con las tarjetas nuevas: cómo generar conversación, guiar la conversación, cómo caer bien, cómo persuadir y los recursos. Lo que **no** se repetía eran tres bloques operativos, y esos se mudaron a la tarjeta de networking en vez de perderse:

| Bloque rescatado | Qué aporta |
|---|---|
| **El mapa: dónde conocer gente de alto valor en CDMX** (4,712 chars) | el terreno concreto — pádel, EGADE, clases presenciales de alemán |
| **Plantillas de primer paso** (1,773) | qué escribir, palabra por palabra |
| **Hábito semanal** (1,265) | cada cuánto hacerlo |

Entran bajo un epígrafe nuevo, *"Dónde practicarlo — y con qué palabras"*, que es justo lo que le faltaba al método: la tarjeta explicaba **cómo**, y ahora dice también **dónde** y **con qué palabras**. Los `<h3>` de la sección vieja bajaron a `<h5>` para encajar dentro de la tarjeta.

La sección pasa de 27,864 a **33,383 caracteres**.

### Dos enlaces que se habrían quedado rotos

Borrar una sección no es solo borrar su HTML. En el Perfil del Rico había **dos `<a href="#networking">`** incrustados en el texto que habrían llevado a ninguna parte. Ahora apuntan a `#habilidades-valor` y nombran la tarjeta.

La verificación anterior no los habría encontrado: resolvía los `data-sec` del sidebar contra el DOM, pero no los `href="#..."` del cuerpo. Ahora el script comprueba **todas las anclas internas del archivo** contra los `id` existentes — quedan **cero rotas**.

**No se tocó `#sdp-network`**, que es otra cosa pese al nombre: el panel de detalle de la habilidad "Networking" del radar de 12 habilidades, con su propio propósito.

### Verificación

Escritorio, iPad e iPhone: el sidebar ya no ofrece Networking, ningún enlace del sidebar ni del cuerpo apunta al vacío, la sección duplicada no existe, las 4 tarjetas siguen y los tres bloques rescatados están dentro. 0 desbordes, `<style>` y `<section>` cuadrados, sin errores de consola. Y Coach carga ahora en **453 ms**.

## Un solo bloque para ducha, cabello, piel y suplementos (2026-08-23)

> *"los suplementos, bañarme y ski care, deben ir en uno solo, y entonces ponle un titulo en general para esos y debe durar 40 min, esto es para todos los dias de la semana, solo acomoda bien donde deben ir, esto es para que creemos un bloque grande y no tengamos muchos pequeños, ademas cuando de click a ese bloque me debe desplegar la informacion de todo"*

**10 bloques pasaron a 4** (uno por variante de día), todos con el mismo título:
**🚿 Rutina de la mañana — ducha, cabello, piel y suplementos**, y **40 minutos exactos los siete días**.

| Día | Bloque | Hora | Pasos |
|---|---|---|---|
| Lun · Jue | `wd-am-lav` | 06:53 – 07:33 | 13 |
| Mar · Mié · Vie | `wd-am-co` | 06:53 – 07:33 | 11 |
| Sábado | `sa-am` | 08:35 – 09:15 | 11 |
| Domingo | `do-am` | 08:35 – 09:15 | 9 |

Son cuatro y no uno porque **el cabello cambia por día**: champú Pilexil los lunes y jueves, sin champú martes/miércoles/viernes y domingo, mascarilla el sábado. El título es el mismo en todos; lo que cambia son los pasos de dentro.

### De dónde salieron los 10 minutos que faltaban

Los tres bloques sumaban 30 minutos (07:03 → 07:33 entre semana). Para llegar a 40 había que sacarlos de algún sitio:

- **Entre semana**: del bloque **💻 Construir esta aplicación** de la mañana, que pasa de 20 a 10 minutos (06:43 → 06:53). Todo lo demás queda intacto: vestirte a las 07:33 y el Didi camino a ALTEN a las 07:40, así que **no se toca la hora de llegada a ALTEN**.
- **Sábado y domingo**: los suplementos iban sueltos **antes** del ejercicio (07:30 y 07:55) y ahora van con la ducha, después. El bloque va de 08:35 a 09:15 y el **Didi del fin de semana arranca 09:15** en vez de 09:00 — 15 minutos menos de turno, el único coste real del cambio.

Los textos que quedaban mintiendo se corrigieron: *"20 min antes de arrancar"* → *"10 min"*, y *"Didi — bloque de día (~09:00 a 14:00, 5h)"* → *"(~09:15 a 14:00, 4h 45m)"*.

### El progreso ya marcado no se pierde

Las subtareas se reutilizan **con sus ids intactos** (`wd02a`, `wd03a`, `wdSupAm1`…), porque `coach_rutina_v1.completado` guarda ids de subtarea, no del bloque padre. Comprobado contra el archivo anterior: **84 subtareas antes, 84 después, ninguna perdida ni inventada**, y ninguna repetida dentro de un mismo día.

### Verificación

- Los **7 días** tienen su bloque, todos duran **exactamente 40 minutos** hasta el bloque siguiente.
- **Ningún bloque suelto** de suplementos, ducha o skincare AM quedó por ahí.
- Al tocar el tramo en la cinta, el panel despliega **los pasos completos**: cabello, skincare, minoxidil y los cuatro suplementos, con sus enlaces de compra.
- `RUTINA_TASKS` quedó en **65 tareas** (antes 71) y sigue **replicado en `Coach_v2.html` y `dashboard.html`**, comprobado en los dos.
- Sin errores de consola en ninguna de las dos apps.

## Línea divisora entre los grupos de un bloque (2026-08-23)

> *"pero aqui pon una linea divisora para los 3, esto para todos los bloques"*

El bloque grande de la mañana juntaba trece pasos seguidos sin distinguir dónde acaba la ducha y dónde empiezan los suplementos. Ahora van separados:

**DUCHA Y CABELLO** ──────── · **PIEL Y MINOXIDIL** ──────── · **SUPLEMENTOS** ────────

Es un **mecanismo general**, no un apaño para este bloque: cualquier subtarea puede llevar `sec:"…"` y el render dibuja ahí la cabecera con su línea. Un bloque cuyas subtareas no traen `sec` se pinta exactamente igual que antes — comprobado: los 3 bloques con subtareas que no tienen secciones siguen sin divisiones.

Funciona en las dos apps, que pintan la rutina con código distinto: `.rt2-sec` en el Dashboard y `.rt-sec` en Coach.

### De paso, los pasos se leen

Estaban a **8.5px**, un tamaño que venía de cuando vivían dentro de las tarjetas pequeñas de la lista con scroll. Ahora que son el contenido principal del panel, están a **12px** con más interlineado.

Eso hizo crecer el panel hasta **pisar la fila de abajo**: el tope de altura lo llevaba `#diaBloque`, que desapareció al fusionar los dos paneles, y `#diaAhoraTile` nunca lo tuvo. Ahora tiene `max-height:44vh` con scroll propio.

### Verificación

- Las **3 secciones** aparecen en el bloque de la mañana, en Dashboard y en Coach.
- **Sin solapes** con la fila de abajo ni con el pie a 1500, 1366, 820 y 390px — el panel scrollea por dentro cuando hace falta.
- Los 15 tramos del día recorridos, un solo panel siempre, y sin errores de consola en ninguna de las dos apps.

## También la noche: un solo bloque (2026-08-23)

> *"al final del dia, hay bloques sueltos de skincare y suplementos, esos tambien los quiero unicos en toda la semana y con lineas divisoras, igual que el que hiciste"*

**6 bloques pasaron a 3**, con el mismo tratamiento que el de la mañana: título general, **25 minutos** los siete días y las líneas divisoras entre **PIEL Y MINOXIDIL** y **SUPLEMENTOS**.

| Día | Bloque | Hora | Pasos |
|---|---|---|---|
| Lun – Vie | `wd-pm` | 22:30 – 22:55 | 6 |
| Sábado | `sa-pm` | 22:20 – 22:45 | 4 |
| Domingo | `do-pm` | 22:05 – 22:30 | 4 |

**🌙 Rutina de la noche — piel, minoxidil y suplementos**

### Lo que hubo que mover

Casi nada, porque los huecos ya daban:

- **Entre semana**: el único cambio es *"Planear el día de mañana"*, que pasa de 22:45 a **22:55**. La meditación de las 23:00 y todo lo que viene después quedan **exactamente igual**.
- **Sábado**: nada. El bloque cabe entre la cena (22:00) y la meditación (22:45).
- **Domingo**: nada tampoco. El diario de cierre de semana simplemente se alarga de 15 a 20 minutos (21:45 → 22:05).

### Un detalle sobre el magnesio

Su paso dice *"200-400mg, **30-60 min antes de dormir**"*. Con el bloque a las 22:30 y el cierre a las 23:59, entre semana quedan **89 minutos** — antes eran 54, porque los suplementos iban sueltos a las 23:05. En fin de semana sí encaja (40 min en ambos). Si prefieres tomarlo más tarde, el paso está para leerlo, no para atarlo a esa hora.

### Verificación

- Los **7 días** con su bloque de noche, todos de **25 minutos**, con sus **2 secciones**.
- **Ningún bloque suelto** de skincare o suplementos queda en toda la semana, ni de mañana ni de noche.
- **84 subtareas antes, 84 después**: ninguna perdida ni inventada, con sus ids intactos, así que el progreso marcado se conserva.
- `RUTINA_TASKS` queda en **62 tareas** (eran 71 antes de empezar con las fusiones), replicado en Coach y Dashboard.
- Sin errores de consola en ninguna de las dos apps.
