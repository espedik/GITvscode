# Coach_v2.html — Coach de vida de Adán

Aplicación de una sola página (HTML+CSS+JS, sin backend, sin dependencias externas de gráficas — el radar de habilidades es un `<canvas>` dibujado a mano, no Chart.js). Es el núcleo del plan de vida/negocio de Adán: diagnóstico financiero real, Plan Maestro hacia $1,000,000 líquido, rutina diaria completa, hábitos, roadmap de aprendizaje, y una guía legal/fiscal tanto personal como para constituir una empresa. Único import externo: Google Fonts (Inter + Playfair Display).

Tema claro/oscuro con toggle (🌙/☀️ arriba a la derecha), persistido en `localStorage['coach-theme']`. Soporta ambos temas completos (`:root` y `:root[data-theme="dark"]`).

## Dos modos, completamente separados

Un único botón (`cambiarModo('personal'|'empresa')`) alterna entre dos `<div class="vista-panel">` independientes, cada uno con su propio `<nav>` de navegación por ancla (`#seccion`) y scroll-spy propio (`refrescarScrollSpy()`, recalculado en cada cambio de modo):

- **🪙 Coach — Personal** (modo por defecto): `#perfil` · `#rutina` · `#habitos` · `#aprendizaje` · `#perfil-rico` · `#networking` · `#marca-personal` · `#legal-personal`
- **🏢 Coach — Empresa**: `#posibles-negocios` · `#mas-ideas` · `#crear-empresa` · `#legal`

## Modelo de datos — 3 claves de `localStorage`

| Clave | Forma | Qué guarda |
|---|---|---|
| `coach-theme` | `'dark' \| 'light'` | Tema activo, se aplica como `data-theme` en `<html>` al cargar. |
| `radarp_{skillId}` | entero 0-100 (una clave por skill, 12 en total) | Overrides del radar de habilidades — si no existe, se usa el valor base hardcodeado en `SK` (ver más abajo). IDs: `ventas, copy, marketing, network, liderazgo, codigo, ia, datos, inversion, finanzas, ingles, mente`. |
| `coach_rutina_v1` | `{ completado: { 'YYYY-MM-DD': ['taskId', ...] } }` | Progreso diario de la Rutina (ver sección `#rutina` abajo). Fecha en UTC (`toISOString().slice(0,10)`), misma convención que el resto del proyecto. |

## `#perfil` — Mi Perfil Real

La portada única del modo Personal (fusiona lo que en versiones viejas eran Dashboard + Perfil por separado). Hero con KPIs reales (patrimonio líquido, deuda total, fondo de emergencia, `id="kpiDiasMeta"` = días restantes al 01 ene 2030, calculado en vivo). 3 subtabs (`showSubtab('perfil', tab, btn)`):

- **Diagnóstico & Plan** — historia real (mantenimiento industrial farmacéutico → Ford → Continental → Bosch → Stuttgart → Google/Intelliswift → ALTEN), diagnóstico financiero riguroso, fortalezas/debilidades, moat competitivo, riesgo principal, y el **Plan Maestro en 4 fases** con navegación por pasos (`#fase0`..`#fase3`, botones `.plan-step` con `id="step0"`..`id="step3"`).
- **🎯 Metas** (`#perfil-metas`, reemplazó a "Posibles Negocios" el 2026-07-30 — ver nota abajo) — checklist de metas de vida en 4 tarjetas dentro de `.perfil-grid` × 2: 🚩 Corto plazo (torneo de ajedrez, Hyrox, liquidar Banamex y cancelar la tarjeta, liquidar TC BBVA, fondo de emergencia a $10,000), 🧭 Mediano plazo (liquidar el crédito del BYD Dolphin Mini, $500,000 ahorrados, trabajar remoto, Cupra Formentor), 🏔️ Largo plazo (ser millonario con la empresa ya creada, departamento en la zona que quiera) y ✨ Extras/bucket list (pelear en Tailandia, rascacielos en Hong Kong, lanzamiento de SpaceX, retomar la Maestría en Alemania, Hyrox internacional). Cada meta con fecha/monto conocido cita el dato exacto ya existente en Diagnóstico & Plan (calendario de deuda, meta de $500,000 de la Maestría, meta de $1,000,000 del Plan Maestro) en vez de inventar uno nuevo. Checkboxes `.check-item` **no persisten** — mismo patrón visual-only que `#habitos`/`#legal-personal`.
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

### Radar FIFA de habilidades (IIFE en el `<script>`, ~línea 3403)

Array `SK` con 12 skills, cada una `{id, name, full, icon, val, w (peso), cat, desc}`. Al cargar, sobreescribe `val` con lo que haya en `localStorage['radarp_'+id]` si existe. `calcOVR()` calcula el overall ponderado por `w`. `draw()` dibuja el radar en `<canvas>` a mano (sin librería), sensible al tema claro/oscuro. `buildSliders()` genera un slider 0-100 por skill; `updateRadarSkill(id,val)` (expuesta en `window`) actualiza `SK`, persiste en `radarp_{id}` y redibuja. `showSkillTab(id)`/`goToSkillDetail(id)` abren el detalle expandible de una skill (roadmap 0→100, contenido estático por skill).

**Esta misma lista de 12 skills (valores base y pesos) está duplicada en `Dashboard/dashboard.html` (constante `SK`)** para el slide "🧠 Habilidades" — si cambian los valores base o pesos aquí, hay que replicarlos allá.

## `#rutina` — Rutina Diaria (sistema más complejo del archivo)

Reescrita por completo el 2026-07-29 para dejar de ser un checklist visual sin memoria y convertirse en un **tracker real, distinto cada día de la semana**, que cubre ejercicio, skincare, el trabajo en ALTEN, ventas/outreach, el Plan Maestro y finanzas — no solo "tiempo libre".

**2026-07-31 — tareas agrupadas con subtareas, para no verse "interminable"**: Adán pidió explícitamente juntar en una sola tarjeta las cosas que hace de corrido (skincare + minoxidil AM y PM, cena + preparar el desayuno del día siguiente), mostrado como subtareas dentro de una sola tarjeta en vez de filas sueltas — y enlazar la rutina con `CuidadoPersonal/comida.html` para saber qué comer. Ver detalle completo abajo en "Tareas agrupadas (`subtareas`)".

### `RUTINA_TASKS` — fuente única de verdad (57 tareas de nivel superior, 70 tareas reales contando subtareas)

Array top-level `{id, dias:[0-6], hora:'HH:MM', cat, txt, fijo?:true, subtareas?:[{id,txt,link?}], link?:{href,label}}` (dias: 0=domingo…6=sábado). Se filtra y ordena por hora para obtener el horario de cualquier día (`rutinaTareasDia(dow)` / `rutinaTareasHoy()`). `link` es opcional en una tarea simple o en cualquier subtarea — se renderiza como un enlace inline `→` que abre en pestaña nueva (`taskLabelHtml()`).

**Horario real confirmado el 2026-07-29** (reemplazó una versión anterior con supuestos incorrectos de despertar a las 5:00 y trabajo 7:00–17:00): se levanta **7:00**, se baña de inmediato (~7:03), sale de casa **7:40**, maneja **~20 min** y trabaja en ALTEN **8:00–17:00**, duerme alrededor de **medianoche** (~7h de sueño). Con solo 40 min entre despertar y salir, la mañana **solo alcanza para higiene/skincare** — el ejercicio, el bloque de habilidad, la revisión de GBM y la prioridad de Fase 0 se movieron a después del trabajo, donde sí hay ~6h40m libres antes de dormir.

- **Común Lun-Vie** (`wd01`-`wd21`, `dias:[1,2,3,4,5]`): despertar 07:00 → bañarse (`wd02`, incluye lavar el cabello los días de lavado) → **`wd0304` = 🧴 Skincare + 🍂 Minoxidil AM** (agrupada, subtareas `wd03`/`wd04`) → vestirse → salir 7:40 → traslado (~20 min) → **`wd07` = 🏢 ALTEN, jornada laboral 8:00–17:00, `fijo:true`** → traslado de vuelta (~20 min) → ejercicio del día → ducha rápida → bloque de habilidad del día → revisar GBM → prioridad de Fase 0 (90 min) → ventas (5 mensajes) → **`wd14` = 🍽️ Cena + preparar desayuno de mañana** (agrupada, subtareas `wd14a` cena / `wd14b` dejar listo el desayuno para llevar a ALTEN, cada una con `link` a `comida.html`) → lectura → journaling → **`wd1718` = 🧴 Skincare + 🍂 Minoxidil PM** (agrupada, subtareas `wd17`/`wd18`) → plan de mañana → meditación → dormir 23:55.
- **Ejercicio y bloque de habilidad — cambian cada día, después del trabajo** (`e1`-`e5` a las 17:20, `k1`-`k5` a las 18:05, un id por día 1-5): Lun=Pesas Empuje+Marketing, Mar=Cardio+Datos/SQL, Mié=Pesas Jalón+Marketing, Jue=Cardio-HIIT+Datos, Vie=Pesas Piernas+Copy.
- **Sábado** (`sa01`-`sa15`, `dias:[6]`): despertar 07:00, **`sa0203` = skincare + minoxidil AM** (agrupada), **`sa03` = 🍳 Preparar y desayunar tranquilo** (con `link` a `comida.html?s=desayunos` — aquí sí hay tiempo, se cocina y se come en el momento, sin dividir en subtareas), entreno largo, **bloque profundo de 4h** para la prioridad del Plan Maestro, almuerzo, IA aplicada, ventas, revisión semanal de finanzas, **`sa11` = 🍽️ Cena** (con `link` a cenas), **`sa1113` = skincare + minoxidil PM** (agrupada), dormir.
- **Domingo** (`do01`-`do12`, `dias:[0]`): despertar 07:30, **`do0203` = skincare + minoxidil AM** (agrupada), **`do03` = 🍳 Preparar y desayunar tranquilo** (con `link`), descanso activo, finanzas (revisión de presupuesto + planificar semana), **checkpoint explícito del Plan Maestro**, **`do08` = 🍽️ Cena ligera** (con `link`), journaling, **`do1013` = skincare + minoxidil PM** (agrupada), dormir.
- **Compartida Sáb/Dom** (`fl1`, `dias:[6,0]`, 17:00): bloque largo de freelance/plantilla si hay cliente o ventas activas.

Los pasos de **🍂 minoxidil** (AM y PM, todos los días de la semana sin excepción) y el aviso de lavado de cabello dentro de `wd02` se agregaron el 2026-07-29 a pedido explícito de Adán ("el skincare y cuidado del cabello añádelo a la rutina de coach cuando me despierto y me duermo") — el tratamiento anticaída real (`CuidadoPersonal/cuidadopersonal.html` → Cabello → Guía) recomienda 2 aplicaciones diarias, por eso hay una tarea por cada momento del día, todos los días, no solo entre semana. **El 2026-07-31 se fusionaron con su skincare correspondiente** (mismo horario AM/PM) en una sola tarjeta agrupada — ver "Tareas agrupadas" abajo.

Tareas con `fijo:true` (solo `wd07`, el bloque de ALTEN) se muestran en la línea de tiempo y cuentan para "ahora/siguiente", pero **no llevan checkbox y no cuentan en el % de progreso**.

**Desayuno entre semana — resuelto el 2026-07-31**: Adán confirmó que entre semana el desayuno **se prepara la noche anterior y se come ya en ALTEN**, no en la ventana de 40 min de la mañana (que sigue sin alcanzar para eso). Por eso la subtarea `wd14b` ("dejar listo el desayuno de mañana") vive en el bloque de la noche junto a la cena, no como tarea nueva en la mañana. El traslado de la tarde (`wd08`, 17:00→17:20) se sigue asumiendo simétrico al de la mañana (~20 min) — ajustar si el commute real de regreso es distinto.

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

## `#habitos` — Hábitos & Energía

Grid semanal (L M X J V S D) por hábito con botones `.habito-day` que solo alternan una clase CSS `done` al hacer clic (`document.querySelectorAll('.habito-day').forEach(btn=>btn.addEventListener('click',...))`). **No persiste en `localStorage`** — se resetea visualmente al recargar la página. Es contenido de referencia/UI, no un tracker real (a diferencia de `#rutina`). Incluye tarjetas estáticas "Pilares de energía" y "Distractores a eliminar".

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

Sección de referencia (sin interactividad persistente, salvo 4 checkboxes visual-only `nw1`-`nw4` del hábito semanal, mismo patrón que `#habitos`) pedida explícitamente por Adán: "haz una sección de networking, detallada, cómo generar conversación, cómo ganar amigos, cómo persuadir, cómo conocer gente de alto valor, qué lugares/situaciones". Tarjetas `.card`, en orden:

1. **Cómo generar conversación de la nada** — método FORD, preguntas abiertas, dar valor antes de pedir, tolerar silencios.
2. **Cómo caer bien y construir amistad real** — recordar nombre+detalle, regla de Dale Carnegie (70/30), seguimiento 1-3-7-30 (mismo patrón que el outreach de negocio), presentar gente a gente.
3. **Cómo persuadir sin ser manipulador** — los 6 principios de Cialdini (cruza con `#aprendizaje` → Ventas, que ya los tenía como recursos de lectura) aplicados a relaciones, no a cerrar tratos.
4. **El mapa: dónde conocer gente de alto valor en CDMX** (la parte más pedida) — 6 subgrupos: Educación premium (Goethe-Institut presencial aprovechando su alemán A2, EGADE/IPADE), Deporte y bienestar (pádel, ajedrez — cruza con su bucket list de `#perfil` → Metas, golf), Comunidades de negocio (GBM, Endeavor México, South Summit, CAMEXA), Voluntariado, Digital/LinkedIn estratégico, y su red ya validada (Bosch Stuttgart).
5. **Cómo dar el primer paso** — 3 plantillas de mensaje copiables (reactivar contacto, después de un evento, pedir café/llamada), mismo patrón visual que las plantillas de `#posibles-negocios`.
6. **Tu hábito semanal de networking** — 4 checkboxes de cadencia (`nw1`-`nw4`, no persisten) + recursos (Cómo Ganar Amigos e Influir sobre las Personas, Never Split the Difference, Give and Take, The Like Switch, canal Charisma on Command).

Todo el contenido está anclado a contexto real de Adán (red de Bosch/Stuttgart, meta de alemán, bucket list de ajedrez, plantilla GBM) en vez de ser genérico — mismo estándar que el resto de Coach.

## `#marca-personal` — Redes Sociales y Marca Personal (nuevo 2026-07-31)

Pedido explícito: "pon una sección de mejorar redes sociales y marca personal, dame todos los posibles escenarios y sugerencias para mejorar". Diagnóstico honesto de arranque: Marketing Digital es de las skills más bajas del radar (<a href="#perfil">20/100</a>) y hoy no hay presencia digital construida. Estructura:

1. **Por qué no es opcional** — conecta directo con las Opciones 1 (plantilla GBM), 2 (freelance) y 3 (mentoría) de `#posibles-negocios`: nadie compra/contrata a quien no puede encontrar.
2. **Todos los escenarios posibles** (el cuerpo principal, 7 plataformas evaluadas con 3 `.stat-badge` cada una — encaje con su red actual, esfuerzo de producción, y qué tan directo pega a su meta): LinkedIn (empezar aquí), YouTube (mayor techo a largo plazo), X/Twitter (comunidad de builders), Newsletter propio (el único activo que no depende de algoritmo), Podcast como invitado (audiencia prestada), GitHub/portafolio técnico (prueba de trabajo para freelance), e Instagram/TikTok (el que menos encaja, explicado por qué).
3. **Sugerencias concretas para mejorar** — 6 `.recurso-item`: pilares de contenido fijos, consistencia sobre viralidad, documentar en vez de crear de la nada, repurposing entre canales, métricas que sí importan (no vanity metrics), y una nota explícita de **cuidado con confidencialidad** (nunca compartir código/datos de Ford/ALTEN/Bosch, revisar cláusulas de exclusividad).
4. **Plan de arranque de 4 semanas** — 5 checkboxes visual-only (`mp1`-`mp5`, no persisten) con acciones concretas por semana, enlazado al bloque de Marketing ya existente en `#rutina`.

## `#legal-personal` — Legal & Personal

Checklist personal (`.check-item`, **no persiste** — mismo comportamiento visual-only que `#habitos`), calendario fiscal personal, y bloques colapsables `toggleCard(id, btn)` con "Qué puedo deducir" como asalariado (Salud, Educación, Vivienda, Ahorro para el retiro, Donativos, Trámite y estrategia).

## Modo Empresa

- **`#posibles-negocios`** (nuevo el 2026-07-30, movido desde `#perfil` en modo Personal — ver arriba) — 8 opciones de negocio rankeadas contra el perfil real de Adán, cada una con `id="negocio1"`..`id="negocio8"` dentro de `.negocio-grid` (saltables desde cualquier parte de la app con `irANegocios('negocioN')`, que ahora cambia a modo Empresa con `cambiarModo('empresa')` y hace scroll suave hasta la tarjeta — ya no activa un subtab, porque la sección es de nivel superior, siempre renderizada). Incluye además 3 tarjetas de apoyo: Plantillas de mensajes (listas para copiar), ¿Cuánto cobrar? (tarifas de referencia + checklist `pr1`-`pr4` de protección al cobrar) y Seguimiento de outreach (bitácora manual `oc1`-`oc5`/`og1`-`og3`, no persiste).
- **`#mas-ideas`** (nuevo 2026-07-31) — "💼 Más Ideas de Negocio — Convencionales y No Convencionales", banco de ideas más amplio que `#posibles-negocios` (no rankeado contra el perfil de Adán, es solo para explorar). Dos grids de tarjetas `.card` simples (icono+título+descripción corta, sin el detalle de `.negocio-card`): 9 **convencionales** (renta de sillas/mesas — el ejemplo que dio Adán —, inflables, lavado de autos, limpieza, mudanzas, jardinería, food truck, renta de mobiliario de oficina, franquicia de bajo costo) y 11 **no convencionales pero 100% legales** (retail arbitrage, importación de nicho vía Alibaba, monetizar cochera como estacionamiento, Airbnb, self-storage, vending machines, compra-venta de segunda mano, junk removal, foto/dron de eventos, renta de trajes de gala, automatización/datos como servicio). Incluye un `.riesgo-box` explícito al inicio aclarando que "no convencional" significa creativo/poco obvio, **no** ilegal — a petición de Adán se pidió cubrir también "prácticas ilícitas" como categoría, lo cual se rechazó explícitamente por tratarse de contenido que facilita actividad ilegal; la sección cubre solo alternativas creativas y legales.
- **`#crear-empresa`** — guía estática completa para constituir una empresa en México (Persona Física vs. Persona Moral, SAS vs. SA de CV, rutas de constitución, costos/tiempos estimados, obligaciones recurrentes, errores comunes). Contenido de referencia, sin interactividad.
- **`#legal`** — checklist legal del negocio (**no persiste**) + calendario fiscal del negocio + "Qué puedo deducir si tuviera empresa" (Operación, Nómina, Equipo/tecnología, Marketing, Viáticos, Financieros, Protección del negocio, Costo de ventas, Estímulos fiscales adicionales).

## Funciones utilitarias / globales

`cambiarModo(modo)` — alterna modo Personal/Empresa, hace scroll a 0 y recalcula el scroll-spy. `toggleTheme()` — alterna `data-theme` y persiste en `coach-theme`. `showSubtab(section, tab, btn)` — subtabs internas de una sección (usado en `#perfil` y en `#crear-empresa`). `toggleCard(id, btn)` — colapsa/expande bloques con chevron. `irANegocios(id)` — cambia a Coach Empresa (`cambiarModo('empresa')`) y hace scroll suave hasta la tarjeta de negocio indicada; usada desde enlaces `.inline-link` en Diagnóstico & Plan y en 🎯 Metas (modo Personal) para saltar a `#posibles-negocios` (modo Empresa). `refrescarScrollSpy()` — recalcula qué `<section>`/`<a>` están dentro del panel de modo visible, para resaltar el link de nav activo al hacer scroll (genérico: cualquier `<section id>` nuevo dentro de un `.vista-panel` se detecta solo, no hace falta tocar esta función al agregar secciones).

## Referencias cruzadas

- La barra de navegación (ambos modos) tiene un enlace **🚀 Dashboard** al final, alineado a la derecha (`margin-left:auto`), que apunta a `../Dashboard/dashboard.html`.
- El **Dashboard** (`../Dashboard/dashboard.html`) lee `coach_rutina_v1` directamente (`D.rut`) y **duplica** `RUTINA_TASKS` (57 tareas de nivel superior / 70 contando subtareas, deben quedar byte-idénticas — verificado con `JSON.stringify` en cada cambio), las 4 fechas de `PHASES`, y el array `SK` de 12 skills. **Si editas el horario de `#rutina`, los valores base del radar, o las fechas del Plan Maestro aquí, hay que replicar el cambio en `Dashboard/dashboard.html`** — no hay sincronización automática entre archivos. Ver tabla de "Datos duplicados" en [`../README.md`](../README.md).
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `Coach_v2.html` directamente en cualquier navegador, sin instalación ni servidor. No hay exportación de datos (a diferencia de Finanzas/Salud/Ejercicio) — lo único persistido son el tema, los valores del radar y el progreso de la rutina diaria.
