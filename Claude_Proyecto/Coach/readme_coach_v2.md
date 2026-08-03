# Coach_v2.html — Coach de vida de Adán

Aplicación de una sola página (HTML+CSS+JS, sin backend, sin dependencias externas de gráficas — el radar de habilidades es un `<canvas>` dibujado a mano, no Chart.js). Es el núcleo del plan de vida/negocio de Adán: diagnóstico financiero real, Plan Maestro hacia $1,000,000 líquido, rutina diaria completa, roadmap de aprendizaje, y una guía legal/fiscal tanto personal como para constituir una empresa. Único import externo: Google Fonts (Inter + Playfair Display).

Tema claro/oscuro con toggle (🌙/☀️ arriba a la derecha), persistido en `localStorage['coach-theme']`. Soporta ambos temas completos (`:root` y `:root[data-theme="dark"]`).

## Dos modos, completamente separados

Un único botón (`cambiarModo('personal'|'empresa')`) alterna entre dos `<div class="vista-panel">` independientes, cada uno con su propio `<nav>` de navegación por ancla (`#seccion`) y scroll-spy propio (`refrescarScrollSpy()`, recalculado en cada cambio de modo):

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

La portada única del modo Personal (fusiona lo que en versiones viejas eran Dashboard + Perfil por separado). Hero con KPIs reales (patrimonio líquido, deuda total, fondo de emergencia, `id="kpiDiasMeta"` = días restantes al 01 ene 2030, calculado en vivo). 3 subtabs (`showSubtab('perfil', tab, btn)`):

- **Diagnóstico & Plan** — historia real (mantenimiento industrial farmacéutico → Ford → Continental → Bosch → Stuttgart → Google/Intelliswift → ALTEN), diagnóstico financiero riguroso, fortalezas/debilidades, moat competitivo, riesgo principal, y el **Plan Maestro en 4 fases** con navegación por pasos (`#fase0`..`#fase3`, botones `.plan-step` con `id="step0"`..`id="step3"`).
- **🎯 Metas** (`#perfil-metas`, reemplazó a "Posibles Negocios" el 2026-07-30 — ver nota abajo) — checklist de metas de vida en 4 tarjetas dentro de `.perfil-grid` × 2: 🚩 Corto plazo (torneo de ajedrez, Hyrox, liquidar Banamex y cancelar la tarjeta, liquidar TC BBVA, fondo de emergencia a $10,000), 🧭 Mediano plazo (liquidar el crédito del BYD Dolphin Mini, $500,000 ahorrados, trabajar remoto, Cupra Formentor), 🏔️ Largo plazo (ser millonario con la empresa ya creada, departamento en la zona que quiera) y ✨ Extras/bucket list (pelear en Tailandia, rascacielos en Hong Kong, lanzamiento de SpaceX, retomar la Maestría en Alemania, Hyrox internacional). Cada meta con fecha/monto conocido cita el dato exacto ya existente en Diagnóstico & Plan (calendario de deuda, meta de $500,000 de la Maestría, meta de $1,000,000 del Plan Maestro) en vez de inventar uno nuevo. Checkboxes `.check-item` **sí persisten desde el 2026-08-01** en `coach_checks_v1` (ver "Persistencia de checklists" más abajo) — antes no lo hacían.
- **CV Completo** — CV imprimible; `downloadCV()` cambia `document.title`, llama a `window.print()` y restaura el título al terminar (o al evento `afterprint`).

**2026-07-30 — "Posibles Negocios" se movió a Coach Empresa** (a petición explícita de Adán): las 8 tarjetas de negocio (`id="negocio1"`..`id="negocio8"`, `.negocio-grid`) y sus 3 tarjetas de apoyo (Plantillas de mensajes, Cuánto cobrar, Seguimiento de outreach) viven ahora completas en `#posibles-negocios` dentro del modo Empresa (ver sección "Modo Empresa" abajo) — contenido byte-idéntico, solo cambió el contenedor (de `.subtab-panel` dentro de `#perfil` a `<section>` de nivel superior). El slot que dejó libre en el subtab-nav de `#perfil` ahora lo ocupa 🎯 Metas.

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

### Radar FIFA de habilidades (IIFE en el `<script>`, ~línea 3403)

Array `SK` con 12 skills, cada una `{id, name, full, icon, val, w (peso), cat, desc}`. Al cargar, sobreescribe `val` con lo que haya en `localStorage['radarp_'+id]` si existe. `calcOVR()` calcula el overall ponderado por `w`. `draw()` dibuja el radar en `<canvas>` a mano (sin librería), sensible al tema claro/oscuro. `buildSliders()` genera un slider 0-100 por skill; `updateRadarSkill(id,val)` (expuesta en `window`) actualiza `SK`, persiste en `radarp_{id}` y redibuja. `showSkillTab(id)`/`goToSkillDetail(id)` abren el detalle expandible de una skill (roadmap 0→100, contenido estático por skill).

**Esta misma lista de 12 skills (valores base y pesos) está duplicada en `Dashboard/dashboard.html` (constante `SK`)** para el slide "🧠 Habilidades" — si cambian los valores base o pesos aquí, hay que replicarlos allá.

## `#rutina` — Rutina Diaria (sistema más complejo del archivo)

Reescrita por completo el 2026-07-29 para dejar de ser un checklist visual sin memoria y convertirse en un **tracker real, distinto cada día de la semana**, que cubre ejercicio, skincare, el trabajo en ALTEN, ventas/outreach, el Plan Maestro y finanzas — no solo "tiempo libre".

**2026-07-31 — tareas agrupadas con subtareas, para no verse "interminable"**: Adán pidió explícitamente juntar en una sola tarjeta las cosas que hace de corrido (skincare + minoxidil AM y PM, cena + preparar el desayuno del día siguiente), mostrado como subtareas dentro de una sola tarjeta en vez de filas sueltas — y enlazar la rutina con `CuidadoPersonal/comida.html` para saber qué comer. Ver detalle completo abajo en "Tareas agrupadas (`subtareas`)".

### `RUTINA_TASKS` — fuente única de verdad (54 tareas de nivel superior, 85 tareas reales contando subtareas)

Array top-level `{id, dias:[0-6], hora:'HH:MM', cat, txt, fijo?:true, subtareas?:[{id,txt,link?}], link?:{href,label}}` (dias: 0=domingo…6=sábado). Se filtra y ordena por hora para obtener el horario de cualquier día (`rutinaTareasDia(dow)` / `rutinaTareasHoy()`). `link` es opcional en una tarea simple o en cualquier subtarea — se renderiza como un enlace inline `→` que abre en pestaña nueva (`taskLabelHtml()`).

**Reescrito por completo el 2026-08-02** (reemplazó la versión del 2026-07-29 que asumía que salía de ALTEN directo a casa) — Adán detalló su horario real de tarde/noche: sale de ALTEN, maneja Didi un rato corto, va al gym, y por la noche retoma Didi hasta cerca de las 9pm antes de cenar. Se levanta **7:00**, se baña de inmediato (~7:03), sale de casa **7:40**, maneja **~20 min**, trabaja en ALTEN **8:00–17:00** (con su descanso para comer a la **13:00**), y duerme alrededor de **medianoche** (~7h de sueño).

- **Común Lun-Vie** (`dias:[1,2,3,4,5]`): despertar 07:00 → bañarse (`wd02`, incluye lavar el cabello los días de lavado) → **`wd0304` = 🧴 Skincare + 🍂 Minoxidil AM** (agrupada, 4 subtareas — ver "Skincare con productos y beneficio" abajo) → vestirse → salir 7:40 → traslado (~20 min) → **`wd07` = 🏢 ALTEN, jornada laboral 8:00–17:00, `fijo:true`** → **`wd12b` = 🛒 Comprar comida, 13:00** (en el descanso de ALTEN) → **`wd08` = 🚗 Didi, 1 pasajero a Buenavista (~40 min), 17:00** → **ejercicio del día, 17:40** (agrupada, sublista detallada de ejercicios — ver abajo) → ducha rápida (18:30) → prioridad activa de Fase 0 (18:40) → bloque de habilidad del día solo Mar/Jue/Vie (19:00) → **`wd-didi2` = 🚗 Didi, sesión de la noche hasta ~21:00, 19:20** → **`wd14` = 🍽️ Cena + preparar la comida de mañana, 21:00** (agrupada, mismo platillo para cenar hoy y llevar mañana a ALTEN — ver nota de eficiencia abajo) → lectura (21:30) → **`wd16` = 📓 Diario del día, 22:00** (agrupada, clarificada — ver abajo) → **`wd1718` = 🧴 Skincare + 🍂 Minoxidil PM, 22:15** (agrupada, 4 subtareas) → **`wd19` = 🎯 Planear el día de mañana, 22:30** (agrupada, clarificada — ver abajo) → meditación (22:45) → dormir 23:55.
- **Bolsa GBM — solo lunes** (`lu-gbm`, `dias:[1]`, 09:00): "💰 Bolsa GBM: revisar portafolio + VOO + USD/MXN e invertir — solo lunes". Antes era un bloque diario a las 18:35 — Adán aclaró que solo invierte al inicio de semana, así que se quitó de los demás días entre semana.
- **Ejercicio (17:40, después de la Didi corta) y bloque de habilidad** (`e1`-`e5`, `k2`/`k4`/`k5`, un id por día 1-5): Lun=Empuje (pecho/hombro/tríceps), Mar=Cardio+core+Datos/SQL, Mié=Jalón (espalda/bíceps), Jue=Cardio/HIIT+Datos/SQL, Vie=Piernas/glúteo+Copy. **Lun y Mié ya no tienen bloque de habilidad** — antes ahí iba "publica 1 post de LinkedIn" (`k1`/`k3`), que se quitó por completo (ver "Marketing pospuesto" abajo).
- **Sábado** (`sa01`-`sa15`, `dias:[6]`): despertar 07:00, skincare+minoxidil AM, desayuno, entreno largo, bloque profundo de 4h para la prioridad del Plan Maestro, almuerzo, IA aplicada, revisión semanal de finanzas, cena, skincare+minoxidil PM, dormir. **Ya no tiene el bloque de "Ventas: 5 mensajes"** (`sa09`, eliminado — ver abajo).
- **Domingo** (`do01`-`do12`, `dias:[0]`): despertar 07:30, skincare+minoxidil AM, desayuno, descanso activo, finanzas (revisión de presupuesto + planificar semana), checkpoint explícito del Plan Maestro, cena ligera, **`do09` = 📓 Diario de cierre de semana** (agrupada, clarificada), skincare+minoxidil PM, dormir.
- **Compartida Sáb/Dom** (`fl1`, `dias:[6,0]`, 17:00): bloque largo de freelance/plantilla si hay cliente o ventas activas.

Tareas con `fijo:true` (solo `wd07`, el bloque de ALTEN) se muestran en la línea de tiempo y cuentan para "ahora/siguiente", pero **no llevan checkbox y no cuentan en el % de progreso**.

### Cambios del 2026-08-02, uno por uno

Pedido explícito de Adán, con detalles concretos de su día real:

- **🛒 Comprar comida (13:00)** — nueva, en su descanso de ALTEN.
- **🚗 Didi a Buenavista (17:00, ~40 min) + gym a las 17:40** — "quisiera ir al gym como 5:40, debido a que 5 a 5:40 trabajaré de Didi llevando solo un pasajero a Buenavista". Reemplazó el traslado genérico de vuelta a casa.
- **Ejercicio con sublista detallada** — "debes ser muy completo, una sublista de los ejercicios que debo hacer". Cada `e1`-`e5` ahora es una tarjeta agrupada con 3-5 subtareas nombrando el ejercicio exacto y series×reps (p. ej. Lun: Press de banca 4×8, Press inclinado con mancuerna 3×10, Press militar 3×10, Elevaciones laterales 3×12, Fondos en banco 3×12) — antes era una sola línea genérica tipo "Ejercicio: Pesas — Empuje". **No se tocó `ejercicio.html`** ni su propio programa semanal (`S.rutina`/`GYM_RUTINA_DEFAULT`) — esta sublista vive solo en la rutina diaria de Coach, es un desglose del mismo bloque, no un tracker de pesas/PRs nuevo.
- **🚗 Didi de la noche (19:20, hasta ~21:00)** — "en las noches cuando termino de trabajar de Didi como 9pm". Reemplazó el bloque condicional "Didi solo si Opciones 1-2 aún no generan ingreso".
- **🍽️ Cena + preparar la comida de mañana, ahora a las 21:00** — "debe ser lo mismo que haré [cenar y preparar] para ahorrar tiempo": la subtarea ya no dice "cenar" y "dejar listo el desayuno" como dos acciones separadas con platillos distintos, sino cocinar **un solo platillo** que sirve para cenar hoy y llevar de comida mañana a ALTEN.
- **Bolsa GBM movida a solo lunes 9am** — antes diaria a las 18:35, ahora `lu-gbm` (solo `dias:[1]`) a las 09:00, "porque solo invierto al inicio de semana".
- **Marketing/LinkedIn pospuesto** — se eliminaron `k1`/`k3` ("publica 1 post de valor en LinkedIn", Lun/Mié). Adán aclaró que eso lo hará como parte del proyecto de marketing del negocio de su papá, no como bloque genérico de su rutina personal.
- **Ventas eliminado de la rutina** (`wd12` entre semana y `sa09` sábado, "🤝 Ventas: 5 mensajes personalizados") — "quita lo de ventas, aún ni tengo nada que vender". No se tocó la skill "Ventas" del Radar FIFA (`SK`, ver abajo) — sigue existiendo como competencia a largo plazo, es un concepto distinto al outreach diario que sí se quitó.
- **🎯 Prioridad activa de Fase 0 actualizada** — el texto ya no menciona "régimen fiscal, outreach" (ambos resueltos/reemplazados, ver sección de Fase 0 más abajo), ahora dice "negocio de tu papá o plantilla GBM".
- **📓 Diario del día y 🎯 Planear el día de mañana, clarificados** — Adán dijo explícitamente "lo de journaling ni siquiera lo entiendo, no sé qué se hace ahí, ni lo de plan 1 MIT". Ambos bloques pasaron de una sola línea vaga a tarjetas agrupadas con subtareas que explican paso a paso qué escribir: el diario pide 3 logros del día + 1 lección + 1 gasto evitable (igual que antes, pero ahora explícito subtarea por subtarea); planear mañana pide elegir 1 sola tarea más importante (explicando qué significa "MIT") + anotar 4 tareas más chicas en orden.

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

## `#aprendizaje` — Aprendizaje: Ataca tus 5 debilidades

5 tarjetas de contenido estático (sin interactividad ni persistencia): 📊 Datos/Análisis, 🤝 Ventas/Negociación, 📣 Marketing Digital, 💰 Finanzas personales, 🤖 IA aplicada a proyectos propios — cada una con primer paso de la semana, el hábito que lo sostiene, y una lista de recursos. Son las mismas 5 prioridades que alimentan el bloque de habilidad diario de `#rutina` (`k1`-`k5`). (La app separada `Aprendizaje/aprendizaje.html`, que era un tracker de libros/sesiones/skills con su propio `localStorage['aprendizaje_v1']`, se eliminó del proyecto el 2026-07-29; el Dashboard ya no tiene score de aprendizaje.)

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

## Modo Empresa

- **`#posibles-negocios`** (nuevo el 2026-07-30, movido desde `#perfil` en modo Personal — ver arriba) — 8 opciones de negocio rankeadas contra el perfil real de Adán, cada una con `id="negocio1"`..`id="negocio8"` dentro de `.negocio-grid` (saltables desde cualquier parte de la app con `irANegocios('negocioN')`, que ahora cambia a modo Empresa con `cambiarModo('empresa')` y hace scroll suave hasta la tarjeta — ya no activa un subtab, porque la sección es de nivel superior, siempre renderizada). Incluye además 3 tarjetas de apoyo: Plantillas de mensajes (listas para copiar), ¿Cuánto cobrar? (tarifas de referencia + checklist `pr1`-`pr4` de protección al cobrar) y Seguimiento de outreach (bitácora manual `oc1`-`oc5`/`og1`-`og3`, persistente).
- **`#mas-ideas`** (nuevo 2026-07-31) — "💼 Más Ideas de Negocio — Convencionales y No Convencionales", banco de ideas más amplio que `#posibles-negocios` (no rankeado contra el perfil de Adán, es solo para explorar). Dos grids de tarjetas `.card` simples (icono+título+descripción corta, sin el detalle de `.negocio-card`): 9 **convencionales** (renta de sillas/mesas — el ejemplo que dio Adán —, inflables, lavado de autos, limpieza, mudanzas, jardinería, food truck, renta de mobiliario de oficina, franquicia de bajo costo) y 11 **no convencionales pero 100% legales** (retail arbitrage, importación de nicho vía Alibaba, monetizar cochera como estacionamiento, Airbnb, self-storage, vending machines, compra-venta de segunda mano, junk removal, foto/dron de eventos, renta de trajes de gala, automatización/datos como servicio). Incluye un `.riesgo-box` explícito al inicio aclarando que "no convencional" significa creativo/poco obvio, **no** ilegal — a petición de Adán se pidió cubrir también "prácticas ilícitas" como categoría, lo cual se rechazó explícitamente por tratarse de contenido que facilita actividad ilegal; la sección cubre solo alternativas creativas y legales.
- **`#crear-empresa`** — guía estática completa para constituir una empresa en México (Persona Física vs. Persona Moral, SAS vs. SA de CV, rutas de constitución, costos/tiempos estimados, obligaciones recurrentes, errores comunes). Contenido de referencia, sin interactividad.
- **`#legal`** — checklist legal del negocio (persistente) + calendario fiscal del negocio + "Qué puedo deducir si tuviera empresa" (Operación, Nómina, Equipo/tecnología, Marketing, Viáticos, Financieros, Protección del negocio, Costo de ventas, Estímulos fiscales adicionales).

## Funciones utilitarias / globales

`cambiarModo(modo)` — alterna modo Personal/Empresa, hace scroll a 0 y recalcula el scroll-spy. `toggleTheme()` — alterna `data-theme` y persiste en `coach-theme`. `showSubtab(section, tab, btn)` — subtabs internas de una sección (usado en `#perfil` y en `#crear-empresa`). `toggleCard(id, btn)` — colapsa/expande bloques con chevron. `irANegocios(id)` — cambia a Coach Empresa (`cambiarModo('empresa')`) y hace scroll suave hasta la tarjeta de negocio indicada; usada desde enlaces `.inline-link` en Diagnóstico & Plan y en 🎯 Metas (modo Personal) para saltar a `#posibles-negocios` (modo Empresa). `refrescarScrollSpy()` — recalcula qué `<section>`/`<a>` están dentro del panel de modo visible, para resaltar el link de nav activo al hacer scroll (genérico: cualquier `<section id>` nuevo dentro de un `.vista-panel` se detecta solo, no hace falta tocar esta función al agregar secciones).

## Referencias cruzadas

- La barra de navegación (ambos modos) tiene un enlace **🚀 Dashboard** al final, alineado a la derecha (`margin-left:auto`), que apunta a `../Dashboard/dashboard.html`.
- El **Dashboard** (`../Dashboard/dashboard.html`) lee `coach_rutina_v1` directamente (`D.rut`) y **duplica** `RUTINA_TASKS` (54 tareas de nivel superior / 85 contando subtareas, deben quedar byte-idénticas — verificado con `JSON.stringify` en cada cambio), las 4 fechas de `PHASES` junto con el desglose semana a semana de cada fase (`PHASES[].semanas`, ahora `{id,txt}` con los mismos ids `sN-M` que los `.check-item` de `#fase0`-`#fase3` aquí — el Dashboard pasó a mostrar este detalle completo, con checkbox propio, el 2026-08-02), y el array `SK` de 12 skills. **El Dashboard también escribe directamente en `coach_checks_v1`** (comparte los ids `sN-M` con este archivo — marcar una semana en cualquiera de los dos se ve en el otro). **Si editas el horario de `#rutina`, los valores base del radar, o las fechas/semanas del Plan Maestro aquí (incluidos los ids `sN-M` si agregas o quitas un ítem), hay que replicar el cambio en `Dashboard/dashboard.html`** — no hay sincronización automática entre archivos. Ver tabla de "Datos duplicados" en [`../README.md`](../README.md).
- **`#habitos` (Hábitos & Energía) se eliminó por completo el 2026-08-02** ("en coach quita lo de habitos y energia, elimina todo eso") — nav link, sección, CSS (`.habito-*`) y el listener de JS que alternaba la clase `done` en los botones del tracker (nunca persistía en `localStorage`, era decorativo). No queda ninguna referencia activa a `#habitos` en el archivo.
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `Coach_v2.html` directamente en cualquier navegador, sin instalación ni servidor. No hay exportación de datos (a diferencia de Finanzas/Salud/Ejercicio) — lo único persistido son el tema, los valores del radar y el progreso de la rutina diaria.
