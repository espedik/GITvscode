# dashboard.html — Dashboard Maestro: Mi Vida

Panel central que agrega los datos de **todas las demás apps** del proyecto (Finanzas, Cuidado Personal —Skincare, Cabello, Salud, Ejercicio—) leyendo directamente las claves que cada una guarda en `localStorage`, sin necesidad de un backend. Es la "página de inicio" pensada para ver de un vistazo cómo va la vida en conjunto.

## Cómo obtiene los datos

`loadAll()` lee del `localStorage` del navegador las claves usadas por cada app individual:

| App | Clave localStorage |
|---|---|
| Finanzas | `finanzasmx_v2` |
| Cuidado de la Salud (nutrición) | `misalud_v1` |
| Skincare | `skincare_v1` |
| Cuidado del Cabello | `cabello_v1` |
| Rutina diaria (Coach → #rutina) | `coach_rutina_v1` |
| Rutina de gimnasio (Ejercicio) | `mirutina_v1` (`D.gym` — nuevo 2026-07-30, ver slide Hero) |

Nota: Skincare, Cuidado de la Salud y Ejercicio viven ahora dentro de `CuidadoPersonal/cuidadopersonal.html` (subtabs), que a su vez incrusta `salud.html` y `ejercicio.html` completos vía `<iframe>`. El Dashboard lee `mirutina_v1` desde el 2026-07-30 (`D.gym`: `sesiones`, `rutina` y `metas.frecuencia`, para el slide Hero — ver abajo) — sigue sin leer el progreso de fuerza (pesos/PRs) de esa app.

Esto significa que el dashboard **solo muestra datos reales si se abrió desde el mismo navegador** donde se usaron las otras apps (comparten el mismo origen/almacenamiento). Si se abre en un navegador limpio, todo aparecerá vacío.

## Barra superior — acceso directo a los demás proyectos (fija, no rota)

**Nuevo el 2026-07-30**, a petición explícita de Adán ("arriba pon una sección para que vaya directo a mis otros proyectos"): `.qa-bar` (`#qaBar`, `renderQuickApps()`) es una franja fija en `top:0` — **no** forma parte del carrusel de slides, está siempre visible sin importar qué slide esté activo. Se repinta en cada `showSlide(i)` y en el listener de `storage`, igual que el slide activo. `.slides` se corrió a `top:58px` para dejarle espacio. (**2026-07-30**: se quitó la píldora de Proyectos junto con toda la app — ver nota más abajo.)

**Píldoras actualizadas el 2026-07-31** (pedido explícito: "no muestres el subtab de cabello, pero sí muestra los demás que falten"): se quitó **Cabello** (Adán no la quiere aquí) y se agregaron **Comida** (`?tab=comida`) y **Dentista** (`?tab=dentista`, ver [`../CuidadoPersonal/readme_cuidadopersonal.md`](../CuidadoPersonal/readme_cuidadopersonal.md) → módulo nuevo), que antes no tenían píldora. Lista actual: Coach, Finanzas, Skincare, Salud, Ejercicio, Comida, Dentista (7, antes 6).

## Navegación (motor de slides, rotación automática cada 3 min)

**Nota (2026-08-08): esta sección describe el historial de cómo se llegó al diseño de cada slide, pero el orden/número de slides que narra abajo quedó desactualizado por 2 cambios posteriores** — la inversión Hero↔Mi Día del 2026-08-07 (Mi Día volvió a `data-i="0"`, ver comentario en el HTML) y, sobre todo, **la fusión de Mi Día + Hero en un solo slide del 2026-08-08** (ver sección "Unificación 'Mi Día' + 'Hero' en una sola pantalla" más abajo, que es la referencia vigente de la estructura actual: 7 slides, `data-i` 0-6, Hero ya no existe como slide separado). El contenido y las decisiones de diseño descritas abajo para cada pieza (tira de 7 días, paneles de gym/nutrición, etc.) siguen siendo válidos — solo los números de slide/`data-i` que se mencionan ya no aplican.

**Reducido de 8 a 6 slides el 2026-07-30** a petición de Adán ("las demás pestañas hay cosas que no me interesan") — se retiraron **Alertas**, **Hoy en números** y **Apps** (esta última se reemplazó por la barra superior fija de arriba, que cubre el mismo caso de uso — ir directo a otra app — sin ocupar un slide completo ni esperar a que rote). `getAlerts()`/`addDays()`/`renderAlertas()`/`renderHoy()`/el `renderApps()` original ya no existen en el archivo.

**Reducido de 6 a 5 slides el 2026-07-31** — Adán pidió eliminar por completo el slide "💰 Patrimonio y flujo" ("no me sirve"). Se quitó la `<section class="slide theme-fin" data-i="3">` completa, la función `renderFinanzas()`, su entrada en `RENDERS` y la clase CSS `.theme-fin`. **Los slides siguientes se renumeraron**: Skills pasó de `data-i="4"` a `data-i="3"`, Metas de `data-i="5"` a `data-i="4"` — el motor de slides exige que `data-i` sea secuencial 0..N-1 y coincida 1:1 con el orden de `RENDERS`, así que cualquier slide que se agregue o quite en el futuro debe renumerar también los que quedan después. `patrimonioNeto()`/`hasFinData()` **no se tocaron** — siguen viviendo en el archivo porque el slide "🎯 Mis Metas" (`renderMetasSlide()`) las reusa para su tile "Patrimonio hacia $1M". `RENDERS` quedó en `[renderHero,renderDia,renderCoach,renderSkills,renderMetasSlide]` (5 elementos, ya no 6).

**Hero pasó a ser el slide 0 el mismo día**, más tarde, cuando a Adán le terminó gustando el resultado tras varias iteraciones ("esa que hiciste ponla como principal") — antes era Mi Día. Se intercambiaron `data-i="0"`/`data-i="1"` entre las dos `<section>` (y su posición física en el HTML, para que el orden de lectura del archivo coincida) y el orden de `const RENDERS=[renderHero,renderDia,...]`. `showSlide(0)` en el arranque mostraba Hero primero sin ningún otro cambio de lógica — el motor de slides es genérico (indexa por `data-i`, no por nombre), así que no hubo que tocar `nextSlide()`/`prevSlide()`/`goTo()`/`buildDots()`. **(2026-08-02: la pantalla que se abre por defecto volvió a cambiar, esta vez a Mi Día — ver "Ajustes del 2026-08-02" más abajo. Hero se queda en `data-i="0"`, solo dejó de ser la que se muestra al arrancar.)**

- **🕐 Mi Día** (slide 1 — **pantalla principal desde el 2026-08-02**, ver nota "Ajustes del 2026-08-02" más abajo) — vive/actualiza cada segundo: bloque "Ahora mismo" y "Siguiente" calculados en tiempo real contra el horario de `Coach_v2.html → #rutina` (arreglo `RUTINA_TASKS`, 61 tareas de nivel superior — duplicado idéntico en ambos archivos, verificado con `JSON.stringify` en cada cambio — si se edita el horario en uno, hay que replicarlo en el otro), progreso de hoy (X/Y bloques completados, excluyendo el bloque fijo de ALTEN que no lleva checkbox) y una **línea de tiempo del día completo, con scroll automático a la tarea activa**: muestra las 54+ tareas del día de principio a fin (`renderDia()`, variable `visibles=tareasDia`, sin recortes) y, tras cada render, hace scroll directo a la tarjeta "ancla" (la que toca a la hora real del reloj, ver sección "Tercer ajuste" del 2026-08-09 más abajo — antes se recortaba a solo 3 bloques antes del ancla, lo que escondía la rutina de la mañana en cuanto se revisaba después de las ~8am). **Rediseñada el 2026-07-30** ("detalla cada actividad") con tarjetas `.rt2-card` en vez de filas planas: cada bloque muestra una píldora de categoría con ícono y color (`CAT_META`, mismo mapa de 7 categorías que `Coach_v2.html → #rutina`) y la duración hasta el siguiente bloque (`rtDur()`), más un resumen de categorías del día arriba de la línea de tiempo. Enlaza a Coach → Rutina para editar el horario. **2026-07-31 — soporta tareas agrupadas**: igual que en Coach, `leafItems(t)` cuenta el progreso por subtarea real (no por tarjeta), y una tarjeta con `t.subtareas` pinta un `.rt2-sub` de solo lectura debajo del texto principal, con ✅/▫️ por cada subtarea (sin checkbox interactivo — Dashboard solo lee `coach_rutina_v1`, no escribe en él).
- **🌟 Hero** (slide 0, primera parada del carrusel) — **"JARVIS · Tu semana completa"**. Cuarto rediseño el 2026-07-30, cada vez con más detalle real (ver historial abajo). Reloj+fecha ahora chicos y a la derecha (`clamp(20px,2.2vw,28px)`, ya no dominan la pantalla). Debajo, dos bloques (antes tres, ver "Ajustes del 2026-08-02"):
  1. **Tira de 7 días** (`#heroWeekStrip`, `.week-strip`, Domingo→Sábado vía `semanaActual()`) — una tarjeta `.ws-day` por día con: nombre corto + fecha, ícono de gym (✅ si hay sesión real ese día en `D.gym.sesiones`, 😴 si la rutina de ese día es descanso, ⏳ si es hoy/futuro y todavía no se entrena, ❌ si ya pasó y no se entrenó) + el **nombre real de la rutina** de ese día, y las calorías registradas ese día (`D.sal.alimentos` sumado por fecha). El día de hoy se resalta con borde de color.
  2. **2 paneles de detalle** (`.grid.g2`, `.tile` con clase `.hp-*`), con datos reales y específicos, no agregados abstractos:
     - **🏋️ Gym esta semana** (`#heroGymPanel`) — lista cada sesión real de la semana (fecha + nombre de la rutina que se entrenó) y, si hoy no se ha entrenado todavía, qué rutina toca. **Más alto desde el 2026-08-02** (`.hp-ex-scroll` de 180px a 320px de `max-height`) — ver nota "Ajustes del 2026-08-02" más abajo.
     - **🥗 Nutrición de hoy** (`#heroNutriPanel`) — calorías de hoy vs. meta en grande, más 3 barras de progreso (proteína/carbs/grasa). Si no hay comidas registradas hoy, muestra las metas en $0$ con una nota aclaratoria — ya no se oculta el panel entero.

  **Eliminada el 2026-08-02 la fila de estadísticas rápidas** (`#heroQuickStats`, `⚖️ Peso actual` + `💧 Agua hoy`) que existía entre la tira de 7 días y los 2 paneles — Adán pidió quitarla y usar ese espacio para agrandar el panel de ejercicio. Ver nota abajo.

  **2026-07-30, más tarde el mismo día — se eliminó la app Proyectos por completo** ("elimina la carpeta de proyectos y todas las referencias que tengan que ver con esto"): el panel "✅ Tareas pendientes" (`#heroTareasPanel`) y la estadística "⏱️ Proyectos (semana)" ya no existen — dependían de `D.pro.tareas`/`D.pro.sesiones`, que ya no se leen (`pro:` se quitó de `loadAll()`). La fila de estadísticas bajó de `.grid.g4` a `.grid.g3` y los paneles de `.grid.g3` a `.grid.g2` para no dejar huecos vacíos.

  **`GYM_RUTINA_DEFAULT` — respaldo sin depender de abrir `ejercicio.html` primero (fix 2026-07-30, mismo día)**: Adán reportó "sigo sin ver nada" después de que el fix de `save()` en `ejercicio.html` (ver `../CuidadoPersonal/readme_ejercicio.md`) no sirvió porque nunca abrió esa app en el mismo navegador/puerto de Live Server que el Dashboard — y no quiso hacerlo ("tú arréglalo"). Solución: copia liviana (solo `{nombre, tipo}` por día, **no** el detalle de ejercicios — para eso sí hace falta abrir `ejercicio.html`) del programa de 6 días de `S.rutina`, hardcodeada en `dashboard.html` junto a `semanaActual()`. `renderHero()` arma `gymRutina = (D.gym.rutina tiene contenido) ? D.gym.rutina : GYM_RUTINA_DEFAULT` — si Adán personaliza su rutina real en `ejercicio.html`, esa versión manda; si nunca la ha abierto, el Dashboard igual muestra "qué toca hoy" correctamente desde el primer momento. **Es una 5ª estructura duplicada entre Coach/ejercicio.html y Dashboard** (ver README raíz → "Ramificaciones" #3) — si se cambia el programa semanal en `ejercicio.html`, replicar `nombre`/`tipo` aquí también. Las sesiones reales (`D.gym.sesiones`) siguen sin tener respaldo — no se pueden inventar, esas sí solo existen si de verdad se entrena y se registra en `ejercicio.html`.

  **Historial de iteración (2026-07-30, 3 rondas de feedback de Adán sobre este slide en particular)**: 1) "Vida Score" compuesto (`calcScores()`/`vidaScore()`/`AREAS`/`sCol()`/`sLab()`) → "eso no me aporta nada", número abstracto y desmotivante con datos incompletos; 2) 3 tiles simples con un número cada uno (sesiones/días/% completación) → "es muy simple, debe ser algo muchísimo más detallado"; 3) **versión actual** — tira semanal + 3 paneles con contenido real (nombres de rutinas, macros reales, títulos de tareas), no solo cifras agregadas. Toda la lógica de las versiones 1 y 2 (incluida `heroGym`/`heroNutricion`/`heroTareas` y sus `-Sub`) ya no existe en el archivo.
- **🪙 Coach · Plan Maestro** (slide 2) — **rediseñado el 2026-07-30**, y **compactado de nuevo el 2026-08-02** ("todo esto ni me lo estás presentando" — Adán comparó contra el detalle real que sí existe en `Coach_v2.html → #fase0` y pidió que el Dashboard mostrara lo mismo). Estructura actual:
  - **Explicación de la fase** (`#coachFaseExplica`) — párrafo en español llano (`ph.explica`, uno por fase) explicando qué es esta fase, en qué orden van las prioridades y cuándo termina.
  - **Fecha de vencimiento movida arriba (2026-08-02)** (`#coachFaseFecha`, junto al título de la fase — "Vence 30 sep 2026 · 58 día(s) restantes") — antes vivía en una tarjeta aparte a la mitad del slide (`#coachFaseFin`/`#coachFaseDias`, ids eliminados); Adán pidió subirla para liberar espacio vertical y que cupiera el detalle semana a semana de abajo.
  - **💰 Tu ruta hacia deuda cara en $0** (`#coachDebtSteps`, `.debt-steps`, `.grid` de 3 pasos) — 🆘 Fondo de emergencia (`D.fin.emergencyFund` vs. $10,000), 💳 Banamex y 💳 BBVA TC (mismo `metaDebtInfo()` que usa el slide Mis Metas, buscando por nombre con regex). Cada paso se marca `.done` (✅, verde) o `.activo` (borde resaltado) según el estado real. **No está atado a qué "Fase" esté activa** — se muestra siempre completa. **Iconos a la mitad de tamaño y barra de progreso mucho más delgada desde el 2026-08-02** (`.ds-ico` de `26px` a `13px`, barra de `6px` a `3px` de alto) a petición explícita — cada tarjeta quedó más compacta.
  - **Avance real de la ruta** — **se fusionó dentro de la misma tarjeta de arriba el 2026-08-02** como una fila delgada al pie (`#coachRutaPct`/`#coachRutaPctBar`, promedio de los 3 pasos con $ reales) — antes era una tarjeta `.tile` aparte con su propio texto explicativo; se quitó ese texto y se combinó para ahorrar una tarjeta completa de espacio vertical.
  - **📋 Qué hacer en esta fase — semana a semana** (`#coachPriorities`) — **reemplazado por completo el 2026-08-02**: antes mostraba 3 `ph.priorities` resumidas en tarjetas numeradas; ahora muestra el `🎯 ph.meta` (la meta de la fase) seguido de **todo** el desglose real `ph.semanas` (mismo contenido que los `.check-item` de `#fase0`-`#fase3` en `Coach_v2.html`, con los enlaces `onclick="irANegocios(...)"` convertidos a texto plano ya que esa función no existe en Dashboard). El campo `priorities` se eliminó de las 4 fases de `PHASES`; `.todo-row`/`.todo-num` (CSS que solo usaba ese campo) también se eliminaron.
  - **Checklist real, no solo lista (2026-08-02, mismo día — "ponles un checklist para ver qué ya hice")**: `ph.semanas` pasó de ser un array de strings a `{id,txt}[]`, con los mismos ids `sN-M` que los checkboxes de `Coach_v2.html → #fase0`-`#fase3`. Cada ítem se renderiza con un `<input type="checkbox">` real (`.sem-check`) que lee/escribe directo en `coach_checks_v1` — **tercera escritura cruzada del Dashboard** (además de `coach_rutina_v1.completado` y, hasta que se quitó, `misalud_v1.agua`), vía la nueva función `toggleFaseCheck(id)`. Marcado tachado con CSS puro (`input:checked+label{text-decoration:line-through}`), sin necesitar re-render. Como comparte ids y clave con Coach, **marcar una semana en el Dashboard se ve también en `Coach_v2.html` y viceversa** — verificado con Playwright abriendo ambos archivos en el mismo contexto de navegador.
  - **Se eliminó el KPI "Días restantes a la meta" (antes 1,251 días a 2030)** de este slide — mezclaba el horizonte de 2030 con el contexto de una fase de ~10 semanas, lo cual Adán señaló como incoherente. Ese dato ya vive en el slide Mis Metas si hace falta.
  - **Revisado también `Coach/Coach_v2.html`** por si el mismo problema existía ahí ("si algo de lo que te dije también está mal en Coach, arréglalo") — no hacía falta: esa página ya etiqueta el % como *"% del tiempo total transcurrido"* explícitamente (línea ~3131 del IIFE "Plan Maestro"), y tiene mucho más contexto alrededor (desglose semana a semana, checkpoints por fase) que el resumen de una línea que tenía el Dashboard. No se tocó Coach_v2.html.
- **🧠 Habilidades** (slide 3 — **nota**: el slide "💰 Finanzas" que aparecía aquí en versiones viejas de este documento **ya no existe en el código**, se eliminó el 2026-07-31 junto con `renderFinanzas()`, ver más abajo; esta entrada quedó mal numerada en el `.md` viejo y se corrigió el 2026-08-01) — dos filas a pantalla completa, igual de "grande y dramático" que el resto de los slides (Hero, Coach, Finanzas): **fila 1** — radar (`.chart-wrap` normal, `clamp(240px,34vh,420px)`) + tarjeta OVR grande (`clamp(56px,7vw,96px)`) en `grid-template-columns:1fr 1fr`. **Fila 2** — título `.skill-priority-title` ("⚠️ Habilidades a mejorar…", con el link a Coach a la derecha) y debajo `#skillPriority` (`renderSkills()`) en `.grid.g4`: **`PRIORIDAD_N` (4) tarjetas grandes**, una por prioridad (de las 5 de `APRENDIZAJE` — `.slice(0,PRIORIDAD_N)` tras ordenar por `val` ascendente), cada `.tile` con `.skill-card` dentro: ícono+nombre+valor arriba, el **primer paso completo** de esta semana (`a.primer`, sin truncar) y los 2 recursos principales al pie. Siempre visibles, sin clics — este slide rota solo cada 3 min y se ve de reojo. **Iteración 2026-07-30** (4 rondas de feedback de Adán, en orden): 1) subtabs clicables → mala idea, nadie hace clic con rotación automática; 2) 5 prioridades con texto largo en columna angosta → mucho para un vistazo; 3) se compactó de más (letra 9.5px, radar `.chart-wrap-sm` de 150-220px) → quedó chico y desproporcionado en una pantalla completa; 4) **layout actual**: tarjetas grandes a pantalla completa, con el detalle completo pero bien organizado — ya no existen `.chart-wrap-sm`/`.skill-row`/`.sr-*`.
- **🎯 Mis Metas** (slide 4, **nuevo el 2026-07-30**) — `renderMetasSlide()`. Dos mitades: **progreso real** (`#metasProgreso`, 4 tiles con barra de avance) — fondo de emergencia, deuda cara (Banamex+BBVA combinadas, buscadas en `D.fin.debts` por nombre vía regex `/banamex/i`/`/bbva/i`, con fallback "Sin datos" si no existen todavía en Finanzas), fondo de la Maestría (`D.fin.goals`, busca `id==='g001'` o nombre `/maestr/i`) y patrimonio hacia $1,000,000 (reusa `patrimonioNeto()`/`hasFinData()` de la slide de Finanzas) — y **bucket list** (`#metasListas`, sin datos en vivo, mismo contenido que `Coach_v2.html → #perfil → 🎯 Metas`): corto/mediano plazo (torneo de ajedrez, Hyrox, trabajo remoto, Cupra Formentor, liquidar el BYD — este último sí con saldo en vivo si existe una deuda `type:'car'` en Finanzas) y largo plazo/extras (empresa creada, departamento, Tailandia, Hong Kong, SpaceX, Maestría, Hyrox internacional), con link de vuelta a Coach para el detalle completo.
- **🛒 Lista de Compras** (slide 5, **nuevo el 2026-08-03**) — `renderListaCompras()`. Ver la sección dedicada "Nuevo 6º slide" más abajo para el detalle completo (categorías, fuentes de datos, persistencia).

## Cálculo del "Vida Score"

`calcScores()` calcula un puntaje 0-100 por área a partir de los datos de los últimos 7 días (salud/nutrición, finanzas). Luego `vidaScore()` combina esas 2 áreas con una ponderación fija (salud 76%, finanzas 24%) para obtener el score global.

## Nota sobre los enlaces

Las píldoras de la barra superior (`renderQuickApps()`) usan **rutas relativas** apuntando a la carpeta de cada app dentro de `Claude_Proyecto`. Los enlaces a Skincare, Cuidado del Cabello, Cuidado de la Salud y Ejercicio apuntan todos a `../CuidadoPersonal/cuidadopersonal.html?tab=<skincare|cabello|salud|ejercicio>`, que abre directamente el subtab correspondiente. Si en el futuro se vuelve a mover o renombrar alguna carpeta de app, hay que actualizar también los `href` correspondientes en `renderQuickApps()` (JS) de este archivo. (`AREAS` existía en la versión anterior del Hero — se eliminó junto con el resto de esa lógica, ver más abajo.)

## Datos duplicados — sincronizar a mano

El Dashboard no puede leer el JS de `Coach_v2.html`, `ejercicio.html`, `comida.html`, `cuidadopersonal.html` ni `salud.html` (documentos HTML distintos, sin build step ni imports), así que **copia literalmente 6 estructuras de datos** dentro de su propio `<script>`. Si se edita cualquiera de estas en su archivo de origen, hay que replicar el cambio aquí también — no hay ningún mecanismo automático que los mantenga sincronizados:

| Estructura | Origen | Copia (dashboard.html) | Verificación rápida |
|---|---|---|---|
| Horario completo de la rutina (59 tareas de nivel superior, algunas con `subtareas`/`link`) | `Coach_v2.html` → `const RUTINA_TASKS` en `#rutina` | `const RUTINA_TASKS` (idéntica) + `leafItems()` propia | Ambas deben ser byte-idénticas tras `JSON.stringify` — ver comando de verificación abajo |
| Fechas de las 4 fases del Plan Maestro + su desglose semana a semana | `Coach_v2.html` → IIFE "Plan Maestro" (`const fases`) + los `<ul><li>` de cada `.fase-item` (`#fase0`-`#fase3`) | `const PHASES` — `start`/`end`/`tag`/`title`/`meta`/`semanas` deben reflejar lo mismo que Coach (`semanas` es texto plano de cada `<li>`, sin los `onclick="irANegocios(...)"` que no existen en Dashboard); solo `explica` es exclusivo de Dashboard, no existe en Coach y no hay que sincronizarlo | Mismas 4 fechas: 18 jul 2026 / 1 oct 2026 / 1 abr 2027 / 1 ene 2029 / 1 ene 2030; mismo número de `<li>` por fase que de strings en `semanas[]` |
| Radar de 12 habilidades (valores base + pesos) | `Coach_v2.html` → `const SK` (IIFE "Radar FIFA") | `const SK` | Mismos 12 `id`/`val`/`w` |
| Contenido de las 5 prioridades de aprendizaje (primer paso, hábito, recursos) | `Coach_v2.html` → `#aprendizaje` (5 `.card`, IDs `cu1`-`cu5`) | `const APRENDIZAJE` (objeto por `id` de skill: `datos`/`ventas`/`marketing`/`finanzas`/`ia`; solo Dashboard tiene además `corto`, un resumen de 1 línea que no existe en Coach) | Mismo texto de "Primer paso esta semana" y "Hábito recomendado" en ambos; recursos con el mismo `n` (nombre) por `t` (tipo) |
| Nombre + tipo del programa semanal de gym (7 días) | `ejercicio.html` → `S.rutina` (solo `nombre`/`tipo`, no el detalle de ejercicios) | `const GYM_RUTINA_DEFAULT` (solo se usa como respaldo si `D.gym.rutina` viene vacío — ver slide Hero arriba) | Mismos 7 `nombre`/`tipo` por día (1=Lun…0=Dom) |
| Catálogo de compras: ingredientes (`comida.html`) + productos de skincare/cabello (`cuidadopersonal.html`) + suplementos (`salud.html`) | `comida.html → RECETAS`, `cuidadopersonal.html → SKIN_DB`/`HAIR_DB`, `salud.html → SUPP_CATALOG` | `const LISTA_COMPRAS` (4 categorías: `comida`/`skincare`/`cabello`/`suplementos` — ver sección "Nuevo 6º slide" más abajo) | Mismo conteo de ítems por categoría (40/8/5/6 al 2026-08-03) |

Comando para verificar que `RUTINA_TASKS` sigue idéntico entre los dos archivos (ejecutar desde `Claude_Proyecto/`):
```js
node -e "
const fs=require('fs');
function ex(f){const h=fs.readFileSync(f,'utf8');const m=h.match(/const RUTINA_TASKS\s*=\s*(\[[\s\S]*?\]);/);return new Function('return '+m[1])();}
console.log(JSON.stringify(ex('Coach/Coach_v2.html'))===JSON.stringify(ex('Dashboard/dashboard.html')));
"
```

Detalle completo de cada estructura en [`../Coach/readme_coach_v2.md`](../Coach/readme_coach_v2.md).

## Pulido visual (2026-07-31)

Adán pidió mejorar la interfaz pero **conservar el concepto de "screensaver de comando"** (manchas de color difuminadas en movimiento, transiciones entre slides, texto con gradiente sutil) — a diferencia de Ejercicio/Salud/Comida/Cuidado Personal, donde sí se pidió quitar por completo ese tipo de decoración (ver [`../CuidadoPersonal/readme_ejercicio.md`](../CuidadoPersonal/readme_ejercicio.md)). Cambios, solo de ajuste fino, sin tocar el HTML ni la lógica de ningún slide:
- `--card` de `rgba(255,255,255,.045)` a `.06` y `--card-br` de `.09` a `.13` — las tarjetas se distinguen mejor del fondo animado.
- Opacidad de las manchas de fondo (`.slide::before/::after`) de `.32` a `.2` — menos ruido visual detrás del texto.
- Se eliminó la animación `.pfill::after` (un brillo en bucle infinito recorriendo cada barra de progreso) y su `@keyframes shine` — con varias barras de progreso por slide más las manchas moviéndose y el punto del `.eyebrow` pulsando, era demasiado movimiento simultáneo compitiendo por la atención.

## Modo oscuro/claro (2026-07-31)

Botón `.theme-toggle-btn` (🌙/☀️) agregado al `.hud-row` junto a los controles de reproducción de slides. Persiste en `localStorage['coach-theme']` (clave **compartida con las otras 6 apps del ecosistema**, ver `../README.md` → "Convenciones de diseño compartidas" para el detalle técnico completo del truco `--ov` y por qué Chart.js necesita `cssVar()` en vez de `var()`). Dashboard ya era oscuro por defecto, así que `:root` sigue siendo el tema oscuro y se agregó `:root[data-theme="light"]` como override — igual que Ejercicio/Salud/Comida/CuidadoPersonal, al revés que Coach/Finanzas (que ya eran claros).

- `--card`/`--card-br` dejaron de derivar de `--ov` en el override claro (necesitaban valores propios: `rgba(255,255,255,.85)` sólido en vez de `rgba(0,0,0,X)`, que se vería como una tarjeta oscura sobre fondo claro) — son la excepción a la regla general de `--ov`.
- Nuevas variables `--bar`/`--bar2` para `.qa-bar` y `.hud-row` (antes `rgba(6,6,14,.65)`/`rgba(10,10,20,.55)` hardcoded, invisibles en tema claro).
- Las manchas de fondo (`.slide::before/::after`) bajan su opacidad a `.12` en tema claro (`:root[data-theme="light"] .slide::before,::after`) — a `.2` (la del tema oscuro) se verían demasiado saturadas sobre fondo claro.
- El radar de habilidades (`chSkills`, único uso de Chart.js en este archivo) tenía sus colores hardcoded (`'#b06eff'`, `'rgba(176,110,255,.16)'`, grid `rgba(255,255,255,.08)`, labels `'#c8cadf'`) — Chart.js pinta directo a `<canvas>` y no resuelve `var()`, así que se cambiaron a `cssVar('--p')`/`cssVar('--p-l')`/etc. `toggleTheme()` vuelve a llamar `showSlide(cur)` para redibujar el slide activo (y su chart, si es el de Habilidades) con los colores correctos de inmediato. **(2026-08-07: ya no aplica — el radar y Chart.js se eliminaron por completo, ver sección "Radar de Habilidades reemplazado por barras horizontales" más abajo; las barras nuevas usan `var()` normal, sin necesitar `cssVar()`.)**
- `CAT_META` (colores por categoría de la rutina) se dejó con hex literal a propósito — sus valores se concatenan con sufijos de alpha (`${meta.c}22`, `${meta.c}55`) para armar `rgba` de 8 dígitos en los chips de categoría; convertirlos a `var(--x)` rompería esa concatenación. Quedan igual en ambos temas (colores saturados, funcionan razonablemente en los dos).

## Modo privado (2026-07-31)

Pedido explícito: "crea el modo privado, oculta mi info financiera con un botón al principio del dashboard". Botón `.priv-btn` (👁️ Ocultar finanzas / 🙈 Modo privado) como **primer elemento de `.qa-bar`**, posicionado absoluto a la izquierda (`left:16px`) dentro de la barra fija superior — literalmente lo primero que se ve. Persiste en `localStorage['dash-privado']` (clave propia, **no** compartida con el resto del ecosistema — es un ajuste solo de este archivo).

- `let privado` (booleano global) + `togglePrivado()`: guarda el estado, actualiza el texto del botón, y llama a `showSlide(cur)` para redibujar el slide activo de inmediato.
- **`money(n)` enmascara la cifra en el origen** cuando `privado` es `true` (retorna `'$••,•••'` en vez de calcular el monto real) — cubre automáticamente cualquier lugar que ya use `money()` sin tener que tocarlo uno por uno (píldora de Finanzas en `.qa-bar`, `#coachDebtSteps`, `#metasProgreso`, la línea del BYD en el bucket list).
- **Además se aplica una clase `.fin-hidden` (`filter:blur(7px)`)** a los contenedores completos de las cifras financieras — `.ds-txt`/`.pbar` de cada paso de `#coachDebtSteps`, `#coachRutaPct`/su barra, y `.big-num`/`.pbar`/`.sub` de los 4 tiles de `#metasProgreso` — para que también se difumine visualmente la barra de progreso (que por sí sola revela el % de avance hacia una cifra ya conocida, p.ej. "Meta: $10,000") y no solo el texto. Los `.lbl`/íconos de cada tile se dejan visibles a propósito (para saber *qué* es cada tarjeta, no *cuánto*).
- No se tocó nada de la app **Finanzas** (`../Finanzas/Finanzas.html`) — el modo privado es exclusivo de este dashboard ambiental, no de la app financiera completa.

## Cómo usarlo

Se abre `dashboard.html` en el mismo navegador donde ya se usaron las demás apps, para que pueda leer sus datos guardados. No tiene botón de refresco manual: escucha el evento `storage` (`window.addEventListener('storage', ...)`) y vuelve a leer `localStorage` automáticamente si otra pestaña del mismo navegador cambia algún dato. Además, cada vez que rota de slide (`showSlide(i)`) llama a `loadAll()` de nuevo.

## Funcionalidades nuevas del 2026-08-01 — menú, ajustes, acciones rápidas

Pedido explícito de Adán: *"quiero especial atención en el dashboard, debe tener muchas funcionalidades, revisa que más puedes agregar, botones, otros menús, otras cosas... revisa para que quede super completo"*. Todo lo de abajo se agregó **sin tocar el concepto de "screensaver de comando"** que Adán ya validó (ver "Pulido visual" arriba) — son capas interactivas nuevas sobre el mismo motor de slides, no un rediseño.

- **☰ Menú de navegación** (`toggleMenu()`/`renderNavMenu()`, panel flotante `#navMenuPanel`) — antes la única forma de saber qué slide era cuál eran los puntitos sin etiqueta del HUD. Ahora un botón `☰` abre un panel con las 5 pantallas por nombre + ícono + **una línea de estado en vivo** (p. ej. Mi Día muestra "3/18 hecho hoy", Coach muestra la fase activa, Habilidades el OVR) — clic para saltar directo (`goTo(i)`). Se recalcula cada vez que se abre y cada vez que cambia de slide mientras está abierto.
- **⚙️ Ajustes** (`toggleSettings()`, panel `#settingsPanel`, clave propia `localStorage['dash-settings']` — **no** compartida con el resto del ecosistema): 
  - **Velocidad de rotación** configurable (30s / 1min / 3min por defecto / 5min / desactivada) — antes estaba fija en `const AUTO_MS=180000`, ahora es `let AUTO_MS` cargado de ajustes al iniciar (`loadSettings()`) y aplicado al vuelo (`applySettingsFromUI()` → `restartTimer()`).
  - **Recordar última pantalla** (toggle) — si está activo, `showSlide(i)` guarda `lastSlide` en cada cambio y el arranque (`_settings.remember?...`) abre ahí en vez de siempre en Hero.
- **⛶ Pantalla completa** (`toggleFullscreen()`, Fullscreen API nativa) — tiene sentido dado que esto se piensa como "screensaver" para dejar en un monitor.
- **Barra de progreso hacia el siguiente slide** (`#hudProgressFill`, bajo el reloj del HUD) — una franja delgada que se llena con una transición CSS de duración `AUTO_MS` (`startProgressBar()`, reiniciada en cada `restartTimer()`), para que se vea cuánto falta para el siguiente avance automático sin tener que adivinar. Si la rotación está en "Desactivada" o pausada, no se anima.
- **? Ayuda / atajos de teclado** (`toggleHelp()`, panel `#helpPanel`) — lista los atajos existentes y los nuevos: `←`/`→` (navegar), `Espacio` (pausar/reanudar), **`M`** (abrir/cerrar menú), **`F`** (pantalla completa), **`1`-`5`** (saltar directo a esa pantalla), **`?`** (esta ayuda), **`Esc`** (cerrar cualquier panel abierto). Los 3 paneles (menú/ajustes/ayuda) también se cierran solos con clic afuera (`document.addEventListener('click', ...)`, comprueba `.closest('.float-panel, .hud-row')`).
- **Acciones rápidas que SÍ escriben datos — cambio de arquitectura importante**: hasta ahora el Dashboard **solo leía** `localStorage` de las demás apps (ver README raíz → "Ramificaciones" #1, "ningún otro archivo lee datos de otro"). Ahora tiene un punto donde también escribe, usando `rawGet(key,def)`/`rawSet(key,obj)` (leen/escriben el objeto crudo sin pasar por el merge de defaults de `tryParse`, para no pisar campos que la app dueña haya guardado):
  1. **✅ Marcar hecho / ↩️ Desmarcar** (botón bajo "🟢 Ahora mismo" en Mi Día, `quickMarkDone()`/`updateMarkDoneBtn()`) — marca (o desmarca) todas las subtareas del bloque activo en `coach_rutina_v1.completado[hoy]`, igual que hacerlo desde `Coach_v2.html → #rutina`. Solo aparece si el bloque activo no es `fijo` (el bloque de ALTEN nunca lleva botón, igual que nunca lleva checkbox en el resto del sistema). El botón vive en un `<div id="diaAhoraBtn">` aparte del texto de `#diaAhora` **a propósito** — `tickClock()` reescribe `#diaAhora` cada segundo con `textContent`, así que si el botón viviera dentro del mismo nodo se borraría solo cada segundo.
  - Se agregó un `toast()` genérico (igual patrón que Salud/Ejercicio/Comida) para confirmar visualmente cada acción rápida.
  - **(2026-08-02: se eliminó la 2ª acción rápida, 💧 +1 vaso de agua**, junto con toda la fila `#heroQuickStats` que la contenía — ver nota "Ajustes del 2026-08-02" más abajo. `misalud_v1.agua` ya no lo escribe el Dashboard, solo `salud.html`.)
  - **Esto actualiza la tabla "Registro maestro de claves `localStorage`" del README raíz** — `coach_rutina_v1` sigue teniendo 2 escritores (Dashboard y Coach); `misalud_v1` ya no la escribe el Dashboard, sus 2 escritores reales vuelven a ser `salud.html` y `comida.html` (ver `../CuidadoPersonal/readme_comida.md`).

Probado con Playwright (Chromium headless, 2026-08-01): las 5 pantallas, el menú, ajustes (persistencia en `localStorage` verificada), pantalla completa, barra de progreso (verificada por `getComputedStyle` en 2 momentos, no por el valor crudo de `style.width` — ese lee el *destino* de la transición, no el ancho renderizado), las 2 acciones rápidas (verificadas escribiendo y leyendo de vuelta el `localStorage` real) y los atajos de teclado 1-5/M/F/?/Esc. Sin errores de consola. Ambos temas (claro/oscuro) revisados visualmente.

## Ajustes del 2026-08-02 — rutina real, pantalla principal, frases y arreglos de UI

Pedido explícito de Adán sobre este archivo en la misma sesión donde reestructuró el horario en `Coach_v2.html` (ver [`../Coach/readme_coach_v2.md`](../Coach/readme_coach_v2.md) para el detalle completo del nuevo horario — aquí solo lo que cambió en `dashboard.html` específicamente):

- **Se quitaron los KPIs "⚖️ Peso actual" y "💧 Agua hoy"** (`#heroQuickStats` y todo su bloque de JS en `renderHero()`, incluido `quickAddAgua()` y la clase CSS `.qa-inline-btn` que ya no tenía otro uso) — Adán ya no los quería en el Hero.
- **El panel "🏋️ Gym esta semana" se agrandó verticalmente** con el espacio liberado: `.hp-ex-scroll` pasó de `max-height:180px` a `320px`, y el `margin-top` de la fila de paneles subió de `14px` a `16px`.
- **Base de frases motivacionales ampliada de 20 a 70** (`FRASES_MOTIVACION`, `.hero-frase`) — Adán señaló que la frase se sentía "estática" con solo 20 opciones rotando (ciclo de 20 días); ahora el ciclo es de 70 días. Sigue rotando **una por día, no por render** (`diaDelAnio()%FRASES_MOTIVACION.length`), todas atadas a hechos reales de su plan (gym, Hyrox, ajedrez, deudas, GBM, Didi, negocio de su papá, background de testing/mecatrónica) — nada genérico de calendario tipo "cree en ti".
- **La pantalla principal por defecto cambió de Hero a Mi Día** (`showSlide(_settings.remember&&_settings.lastSlide!=null?_settings.lastSlide:1)`, antes `:0`; `loadSettings()`/`saveSettings()` también actualizaron su `lastSlide` por defecto a `1`) — pedido explícito: "quiero que la pantalla principal sea la de rutina". Hero sigue siendo la primera parada del carrusel (slide 0), solo dejó de ser la que se abre al cargar. Si "Recordar última pantalla" está activo en Ajustes, esto no aplica — se respeta la última pantalla real.
- **Arreglado el botón "Ver/editar rutina completa en Coach →" de Mi Día, que no abría nada**: la causa era que `.hud` (el contenedor del reloj/controles fijo en la parte inferior) no tenía `pointer-events:none`, así que su caja completa (todo el ancho del viewport, no solo donde se ven los botones) interceptaba los clics de cualquier link que cayera detrás — el link de "rutina completa" queda cerca del fondo del slide "Mi Día" y caía justo en esa zona. Fix: `.hud{pointer-events:none}` + `.hud-row{pointer-events:auto}` (donde sí están los botones reales) — los controles del HUD siguen funcionando igual, pero ya no bloquean clics en el contenido de atrás. Verificado con Playwright (`elementFromPoint` en el centro del link, antes devolvía el `.hud`, ahora devuelve el `<a>`).
- **Arreglado el contraste de las subtareas de la rutina en modo oscuro** (Mi Día, `.rt2-sub-item` — p. ej. los pasos de Skincare o de Cena): color pasó de `var(--text3)` (`#565a72`, muy poco contraste sobre las tarjetas oscuras) a `var(--text2)` (`#9a9db3`, mismo tono que usa el resto de textos secundarios legibles del tema oscuro).
- **`RUTINA_TASKS` y `PHASES[0]` se re-sincronizaron con `Coach_v2.html`** tras el rediseño completo del horario ahí (comprar comida a la 1pm, Didi corto a Buenavista + Didi de la noche, gym con sublista detallada de ejercicios, Bolsa GBM solo lunes 9am, se quitaron Ventas y los posts de LinkedIn, Journaling/MIT explicados paso a paso, Fase 0 sin régimen fiscal/ex-colegas y con el negocio del papá de Adán). Bajó de 57 a 54 tareas de nivel superior — verificado que ambos archivos quedan **byte-idénticos** con el comando de la sección "Datos duplicados" de arriba.
- **Slide "Coach · Plan Maestro" compactado y con más contenido real** (mismo día, segunda ronda de feedback tras ver el resultado) — ver el detalle completo en la descripción del slide más arriba: iconos y barra de progreso de los 3 pasos de deuda mucho más chicos, "Avance real" fusionado en la misma tarjeta, fecha de vencimiento subida junto al título, y el espacio liberado se usó para mostrar el desglose semana a semana completo de la fase activa (`ph.semanas`), no solo un resumen de 3 líneas.

## Ajuste del horario de rutina — tercera ronda, 2026-08-02

`RUTINA_TASKS` volvió a re-sincronizarse con `Coach_v2.html` (ver el detalle completo de qué cambió y por qué en [`../Coach/readme_coach_v2.md`](../Coach/readme_coach_v2.md) → "Segunda ronda de ajustes"): la prioridad de Fase 0 se movió de las 18:40 a las 21:00 (después de la Didi de la noche, no antes — "si no perdería tiempo"), lo que recorrió 15 min toda la cadena nocturna; la lectura (`wd15`, una sola tarea genérica) se volvió 5 tareas por día (`l1`-`l5`) con un libro concreto cada una, tomados de los recursos que ya existían en `#aprendizaje`/`#perfil-rico` de Coach; y la meditación (`wd20`) ahora explica la respiración box 4-4-4-4 paso a paso en 4 subtareas en vez de solo nombrarla. Subió de 54 a 58 tareas de nivel superior (85→92 contando subtareas) — verificado que ambos archivos siguen byte-idénticos.

**Lectura vuelta a genérica (2026-08-07)** — Adán aclaró que todavía no compra los libros que se habían asignado a `l1`-`l5` ("$100M Offers", "Storytelling with Data", "Psicología del Dinero", "The Millionaire Next Door", "Never Split the Difference"), así que las 5 tareas volvieron a un texto genérico sin título: `txt:'📖 Lectura (30 min)'` en las 5, en ambos archivos (`Coach_v2.html` y `dashboard.html`). Los `id`/`dias`/`hora`/`cat` no cambiaron. Verificado con el comando de la sección "Datos duplicados" de arriba que `RUTINA_TASKS` sigue byte-idéntico entre ambos archivos.

## Los números de Finanzas se reflejan solos, pero la migración se replicó aquí también (2026-08-02)

Adán reportó que Banamex bajó a $9,000 y que vendió todas sus acciones de GBM (NVIDIA). Esa corrección vive en `Finanzas/Finanzas.html` (ver [`../Finanzas/readme_finanzas.md`](../Finanzas/readme_finanzas.md) → "Migraciones puntuales") — el Dashboard no tiene ningún dato de deuda/inversiones hardcodeado, `renderCoach()` y `renderMetasSlide()` ya leían `D.fin.debts`/`D.fin.investments` en vivo desde `finanzasmx_v2`, así que el debt-step "💳 Banamex" del slide Coach y el patrimonio de "🎯 Mis Metas" se actualizan solos en cuanto la fuente está corregida.

**El problema real**: Adán reportó "sigue sin actualizarse en Dashboard" después del fix — la migración de `Finanzas.html` solo corre dentro de su propio `init()`, así que si abre el Dashboard sin haber abierto/recargado `Finanzas.html` primero en ese navegador, la corrección nunca se dispara (mismo problema ya visto antes con `GYM_RUTINA_DEFAULT` y Adán no abriendo `ejercicio.html`). Solución: `fixBanamexIfNeeded()`, la misma migración de una sola vez (misma bandera `finanzasmx_v2_banamex9k` en `localStorage`, compartida con `Finanzas.html`) replicada aquí con `rawGet`/`rawSet` sobre `finanzasmx_v2`, llamada una vez al arrancar (antes del primer `loadAll()`). Si `finanzasmx_v2` todavía no existe en ese navegador (Adán nunca abrió Finanzas ahí), no pone la bandera — así se puede corregir después, sin importar qué app abra primero.

Verificado con Playwright: (1) Dashboard abierto de primeras sin `finanzasmx_v2` — no revienta, no pone la bandera antes de tiempo; (2) `localStorage` con el saldo viejo/drifted (simulando el reporte real de ~$17,000) y el Dashboard abierto **directo, sin pasar por Finanzas.html** — el debt-step ya muestra "$9,000 restante" solo con abrir el Dashboard.

Verificado con Playwright: slide inicial = Mi Día (índice 1), `#heroQuickStats` ya no existe, el link de rutina recibe el clic correctamente (`elementFromPoint` apunta al `<a>`), el panel de ejercicio mide ~216px de alto sin contenido de más de un día (antes 180px fijos de scroll), color de `.rt2-sub-item` en modo oscuro es `rgb(154,157,179)` (`--text2`), y cero errores de consola.

## Otro contraste en modo oscuro arreglado — la hora de Mi Día (2026-08-03)

Adán reportó: "el dashboard de rutina, no se ve bien la hora en modo oscuro" — mismo tipo de bug que `.rt2-sub-item` (ver sección de arriba), esta vez en `.rt2-time` (la hora de inicio de cada bloque, p. ej. "21:00", dentro de las tarjetas `.rt2-card` de la línea de tiempo). Tenía `color:var(--text3)` (`#565a72` en oscuro, muy poco contraste sobre `.rt2-card`); se cambió a `color:var(--text2)` (`#9a9db3`), igual que el resto de textos secundarios legibles del tema oscuro. Verificado forzando `data-theme="dark"` con Playwright: color computado de `.rt2-time` es `rgb(154,157,179)` (antes, sin forzar el tema, una primera medición había dado un resultado engañoso — ver nota de proceso; al forzar explícitamente `data-theme` y `localStorage['coach-theme']='dark'` antes de medir, el resultado quedó confirmado).

## Nuevo 6º slide "🛒 Lista de Compras" (2026-08-03)

Pedido explícito: *"en el dashboard crea una pagina para que me enlistes la lista de compras, debe ser todo lo de comida, productos de limpieza de cara, suplementos, skincares, cuidado con el cabello, debes darme toda la lista separada"*. `RENDERS` pasó de 5 a 6 elementos: `[renderHero,renderDia,renderCoach,renderSkills,renderMetasSlide,renderListaCompras]` — nueva `<section class="slide theme-lista" data-i="5">`. Como el motor de slides indexa por `data-i` secuencial 0..N-1 (ver nota en "Navegación" más arriba), este slide se agregó **al final** para no tener que renumerar ninguno de los 5 anteriores. `SLIDE_MENU_META` (menú ☰), el atajo de teclado (`/^[1-6]$/`, antes `/^[1-5]$/`) y el texto del panel de ayuda ("1-6", antes "1-5") se actualizaron junto con `N=RENDERS.length` (ya calculado dinámicamente, no hubo que tocarlo aparte).

- **`const LISTA_COMPRAS`** — objeto con 4 categorías (`comida`, `skincare`: 8 productos con alternativas de marca, `cabello`: 5 productos, `suplementos`: 6 productos). **No es contenido inventado**: se extrajo programáticamente (script de Node de un solo uso, no guardado en el repo) de las fuentes de verdad reales de cada app — `comida.html → RECETAS` (ingredientes únicos de todas las recetas), `cuidadopersonal.html → SKIN_DB`/`HAIR_DB` (productos + sus alternativas de marca ya sugeridas ahí) y `salud.html → SUPP_CATALOG`. Es un **catálogo completo por categoría**, no la selección personalizada que arman `skPick()`/`haPick()` en Cuidado Personal — decisión deliberada, Adán pidió literalmente "toda la lista".
- **`comida` agrupada por pasillo del súper (2026-08-03)** — pedido explícito: *"en el dashboard, separa la comida en subtemas de acuerdo a los pasillos del super"*. `LISTA_COMPRAS.comida` dejó de ser un array plano de 40 strings y pasó a ser un objeto `{pasillo: [items]}` con 5 pasillos: 🥬 Frutas y Verduras (18), 🥩 Carnes y Pescados (3), 🥛 Lácteos y Huevo (6), 🛒 Abarrotes y Despensa (11), 🍞 Panadería y Tortillas (2) — mismos 40 ingredientes de siempre, solo reorganizados (la clasificación es criterio propio, no viene de ninguna fuente — un ingrediente "cocido" como Arroz/Quinoa/Nopales se clasificó por dónde se compra crudo, no por su estado en la receta). Las otras 3 categorías (`skincare`/`cabello`/`suplementos`) siguen siendo arrays planos sin cambios.
- **UI de pestañas por categoría** (`#listaCatTabs`, `.lc-tab`) — un slide de altura fija sin scroll (`overflow:hidden`) no alcanza para mostrar las 4 categorías completas a la vez, así que se eligió mostrar **una categoría a la vez** con pestañas (`verListaCat(cat)`) en vez de comprimir todo. `#listaCompraBody` además lleva `max-height:70vh;overflow-y:auto` como red de seguridad extra. `renderListaCompras()` detecta con `Array.isArray(data)` si la categoría activa es una lista plana (skincare/cabello/suplementos, 1 columna, strings más largos con alternativas de marca) o un objeto agrupado (comida): en ese caso itera cada pasillo con `Object.entries()` y pinta un `<div class="lc-aisle">` con su `.lc-aisle-title` (encabezado, color `--ac1` del slide) seguido de su propio grid de 3 columnas (2 columnas debajo de 900px, red de seguridad `min-width:0` no hizo falta aquí porque los textos son cortos).
- **Checklist real** (`.lc-item`, checkbox + label tachado al marcar, mismo patrón visual que `.sem-check`/`.check-item`) — persiste en una clave nueva, **exclusiva de este dashboard**: `localStorage['dash-lista-compras']` (`{ "lc-comida-aguacate": true, ... }`), leída/escrita con `rawGet`/`rawSet` igual que `toggleFaseCheck()`. No se comparte con ninguna otra app — a diferencia de `coach_checks_v1`, no existe una lista de compras equivalente en Comida/CuidadoPersonal/Salud con la que sincronizar. **El id cambió de posicional a por contenido** (`lc-<categoría>-<slug-del-texto>`, función `lcSlug()` nueva — minúsculas, sin acentos, espacios a guiones) el 2026-08-03 al agrupar comida por pasillo: con el id viejo (`lc-comida-<índice>`), reordenar los 40 ingredientes en pasillos habría hecho que un check ya marcado "saltara" a otro ingrediente distinto tras el cambio. Con el id por contenido esto no vuelve a pasar aunque se reordene o reclasifique la lista en el futuro — el único costo es que los checks de comida ya marcados antes del 2026-08-03 se resetean una vez (aceptable: es una lista de compras, no un dato histórico que importe conservar).
- **Sincronizar a mano si cambian las fuentes**: si se agregan/quitan recetas en `comida.html`, productos en `cuidadopersonal.html`, o suplementos en `salud.html`, `LISTA_COMPRAS` de este archivo **no se actualiza solo** — es una 6ª estructura duplicada del mismo tipo que las 5 de la tabla "Datos duplicados" de arriba (ver esa sección para el patrón general).

Verificado con Playwright: las 4 categorías cambian correctamente (8/5/6/40 ítems según corresponda), comida en grid de 3 columnas cabe sin desbordar el slide, marcar/desmarcar un checkbox persiste en `dash-lista-compras` y sobrevive un recargo de página, cero errores de consola. (Un primer screenshot de la pestaña Skincare pareció mostrar un corte de texto a la izquierda — se descartó como falso positivo: `document.documentElement.scrollWidth`/`scrollLeft` no mostraban overflow real; la causa era que el `.click()` de Playwright hace auto-scroll (`scrollIntoViewIfNeeded`) justo antes de la captura. Repetir el clic vía `page.evaluate(() => el.click())` confirmó que no hay bug real, solo un artefacto del script de prueba.)

**Re-verificado tras agrupar comida por pasillo (2026-08-03)**: los 5 pasillos suman 40 ítems (18+3+6+11+2), cada uno con su propio `.lc-aisle-title` y grid de 3 columnas; un checkbox marcado con el nuevo id por contenido (`lc-comida-aguacate`) persiste en `dash-lista-compras` y sobrevive un recargo real de página (no solo un re-render); las otras 3 categorías (skincare/cabello/suplementos) se probaron intactas después del cambio; cero overflow horizontal y cero errores de consola en iPad (820×1180) e iPhone 15 Pro (393×852) — el `.slide-inner` real (sin contar las manchas decorativas `::before`/`::after`, que sí inflan la medición de `.slide.scrollHeight` pero nunca fueron contenido real) mide exactamente igual a su `clientHeight` en desktop, confirmando que las 5 secciones con encabezado siguen cabiendo sin necesitar scroll.

## Responsivo — iPad / iPhone 15 Pro (2026-08-03)

Pedido explícito: *"crea una version de todos los html, version para ipad y version para iphone 15 pro, para que todo encuadre y pueda verlo en mi celular"*. Se evaluaron dos enfoques (archivos separados por dispositivo vs. diseño responsivo en el mismo archivo) y Adán eligió el segundo — más simple de mantener y evita triplicar la lógica JS de cada app, algo que ya había causado bugs reales en este proyecto cuando solo había 2 copias de un mismo dato (ver "Datos duplicados" arriba). No se crearon archivos nuevos: `dashboard.html` sigue siendo un único archivo, con CSS que se adapta según el ancho de pantalla.

**El problema real, medido con Playwright**: el diseño de este archivo asume un monitor de escritorio sin scroll ("screensaver de comando", `.slide{overflow:hidden}`). Incluso en iPad (820×1180 CSS px) el contenido real de cada slide resultó ~270px más alto que el hueco disponible — con `overflow:hidden` ese excedente se recortaba en silencio, invisible e inalcanzable. En iPhone 15 Pro (393×852) el problema es todavía mayor.

- **`@media(max-width:1024px)`** (cubre iPad e iPhone — ambos táctiles, a diferencia del monitor de escritorio donde deslizar para ver el resto no tendría sentido): el slide activo pasa de `overflow:hidden` a `overflow-y:auto` (`.slide{align-items:flex-start}` para que el contenido no quede centrado y "recortado por arriba" al hacer scroll — un problema clásico de centrar contenido más alto que su contenedor). `.slide-inner` pasa de `height:100%` a `height:auto;min-height:100%`, con `padding-bottom` calculado dinámicamente (ver más abajo) para que el último elemento no quede permanentemente tapado por el HUD flotante inferior. El botón "👁️ Ocultar finanzas" (`.priv-btn`), que en escritorio es `position:absolute;left:16px` para quedar pegado al borde, en ≤1024px se vuelve un elemento normal del flex (`position:static;order:-1`) — con las píldoras de `.qa-bar` centradas y el ancho reducido, el absoluto se montaba encima de la primera píldora (bug real, visto en iPad).
- **`@media(max-width:480px)`** (solo iPhone): se compactan `.qa-bar` (píldoras y gaps más chicos, `.qa-stat` oculto) y `.hud-row` (`flex-wrap:wrap` — los 8 botones + los puntos de navegación no caben en una sola fila de 393px de ancho), `.week-strip` del Hero pasa de 7 a 4 columnas (se acomoda en 2 filas), y `.lc-grid` de Lista de Compras pasa a 1 columna.
- **`syncSlidesTop()`** (JS, nueva función) — como `.qa-bar` ahora puede tener distinta altura según cuántas filas de píldoras necesite (varía con el ancho de pantalla), el `top` fijo de `.slides` ya no se puede hardcodear en CSS (`top:58px` era una suposición de una sola fila). Esta función mide `qaBar.offsetHeight` real y lo aplica como `style.top` inline; se llama después de cada `renderQuickApps()` (cada cambio de slide) y en `window.addEventListener('resize', ...)`.
- **`--hud-h`** (variable CSS, calculada por la misma función a partir de `hud.offsetHeight`) — el HUD inferior también cambia de alto (una fila en escritorio/iPad, hasta dos en iPhone por el `flex-wrap`), así que el `padding-bottom` de `.slide-inner` que evita que el HUD tape el último elemento se calcula como `calc(var(--hud-h,90px) + 24px)` en vez de un número fijo adivinado.

Verificado con Playwright en `{width:820,height:1180}` (iPad) y `{width:393,height:852,isMobile:true,hasTouch:true}` (iPhone 15 Pro), los 6 slides, ambos temas: cero overflow horizontal (`scrollWidth-clientWidth`) en los 6 slides × 2 viewports; el scroll interno del slide activo efectivamente revela el contenido que antes se recortaba (confirmado moviendo `scrollTop` al máximo y verificando que el último elemento real queda visible, no solo que el contenedor "permite" scroll); el checklist anidado de Lista de Compras (`#listaCompraBody`, que ya tenía su propio `overflow-y:auto` interno desde que se creó el slide) también se verificó por separado — su último ítem (de 40 en Comida) es alcanzable haciendo scroll dentro de esa caja anidada; cero errores de consola en ninguna combinación.

## Swipe táctil para cambiar de pantalla (2026-08-03)

Pedido explícito: *"el dashboard deberia con un dedo cambiar de pagina, al deslizar de izq a derecha y viceversa, recuerda que lo usare en ipad y iphone"*. Antes solo había 3 formas de cambiar de slide: flechas del teclado (`←`/`→`), los puntos de navegación (`.dot-btn`) y las flechas del HUD (`‹`/`›`) — ninguna pensada para un dedo en pantalla táctil.

Se agregó un listener de `touchstart`/`touchend` sobre `#slides` (ambos `{passive:true}`, no bloquean el scroll nativo): mide el desplazamiento horizontal (`dx`) y vertical (`dy`) entre el inicio y el fin del toque, y solo dispara `nextSlide()`/`prevSlide()` si `|dx| > 50px` **y** `|dx| > |dy|` — es decir, el gesto tiene que ser más horizontal que vertical. Esto es a propósito para no chocar con el scroll vertical normal dentro de una pantalla en iPad/iPhone (`.slide{overflow-y:auto}` desde el ajuste responsivo de la sección de arriba) — un swipe para leer contenido hacia abajo tiene `dy` grande y `dx` chico, así que nunca dispara cambio de pantalla. Convención de dirección igual a Fotos/Instagram en iOS: deslizar el dedo de derecha a izquierda avanza (`nextSlide`), de izquierda a derecha retrocede (`prevSlide`) — mismo sentido que ya usan las flechas `‹`/`›` del HUD.

Solo reacciona a un dedo (`e.touches.length!==1` se ignora, para no interferir con el pellizco de zoom de 2 dedos). No se tocó ningún otro control existente (teclado, puntos, flechas del HUD) — el swipe es un método más, no un reemplazo.

Verificado con Playwright en `hasTouch:true` para iPad (820×1180) e iPhone 15 Pro (393×852, `isMobile:true`): swipe izquierda avanza de slide, swipe derecha retrocede, y un gesto mayormente vertical (simulando scroll de lectura) no cambia de pantalla — confirmado con captura antes/después mostrando el cambio real de contenido (de "Mi Día" a "Coach · Plan Maestro"). Cero errores de consola.

## Ajuste del horario de rutina — cuarta ronda: "trabajas hasta las 5pm" no se veía así en la línea de tiempo (2026-08-03)

Adán pidió, en ambos archivos (Coach y Dashboard): *"recuerda que acabo de trabajar 5 pm, las actividades que estan enmedio antes de terminar mi trabajo dejalas pero yo termino de trabajar 5 pm"*. `RUTINA_TASKS` ya tenía la hora de salida correcta desde la "tercera ronda" (2026-08-02, arriba): `wd07` (ALTEN, 08:00) y `wd08` (Didi, 17:00) — en teoría el dato ya decía "sales a las 5". Primer chequeo (leer el array) no encontró ningún problema, pero **renderizando de verdad la línea de tiempo con Playwright** sí apareció uno real: entre la comida (`wd12b`, 13:00) y la Didi (`wd08`, 17:00) no existía ninguna tarea — ese hueco de 4 horas se mostraba pegado por completo a "🛒 Comprar comida", como si comprar/comer tomara 4 horas seguidas, y en lunes específicamente (por la tarea `lu-gbm` de Bolsa GBM a las 09:00, intercalada entre el inicio de ALTEN y la comida) el bloque "ALTEN — jornada laboral" se veía con una duración de solo **1h**, dando la impresión visual de que el trabajo terminaba a las 9am. El dato de fondo (17:00) era correcto, pero nada en la línea de tiempo lo hacía evidente — de ahí que, desde fuera, pareciera que el cambio de "termina a las 5" nunca se había aplicado.

**Fix — mismo cambio en los dos archivos** (`Coach/Coach_v2.html` y `Dashboard/dashboard.html`, `RUTINA_TASKS`): se agregó `wd12c` (13:40, `cat:'trabajo'`, `fijo:true`, `🏢 ALTEN — de vuelta a la jornada laboral`) entre `wd12b` y `wd08`. Ahora la línea de tiempo de un día entre semana muestra explícitamente dos bloques de ALTEN — 08:00 (hasta la comida) y 13:40 (de vuelta, hasta las 17:00 en punto) — en vez de uno solo con un hueco de 4 horas sin explicar. Subió de 58 a 59 tareas de nivel superior; se actualizó el comando de verificación de la tabla de arriba y sigue devolviendo `true` (ambos archivos byte-idénticos).

Verificado con Playwright, sección Rutina de Coach: lunes ahora muestra `08:00 ALTEN (1h) → 09:00 GBM (4h) → 13:00 Comprar comida (40m) → 13:40 ALTEN de vuelta (3h 20m) → 17:00 Didi`, y martes-viernes (sin GBM) muestra `08:00 ALTEN (5h) → 13:00 Comprar comida (40m) → 13:40 ALTEN de vuelta (3h 20m) → 17:00 Didi` — el final de la jornada a las 17:00 ahora es explícito en vez de inferido. En Dashboard, el chip de resumen "🏢 Trabajo" del slide Mi Día pasó de contar 1 bloque a 2, confirmando que la tarea nueva se lee correctamente desde `resumenCats`/`CAT_META`. Cero errores de consola en ambos archivos.

## Nuevos slides 7 y 8 — "Alemán del día" y "Entrevista del día" (2026-08-04)

Pedido explícito de Adán: *"creame otra pagina en el dashboard que sea exclusivamente del idioma alemán... quiero que cada día cambies de tema diferente y me muestres información completa acerca de un tema"*, seguido en el mismo turno de *"también crea otro para el tema de entrevistas, este tiene que cambiar de tema cada día, igualmente completo y atractivo visualmente"*. `RENDERS` pasó de 6 a 8 elementos: `[renderHero,renderDia,renderCoach,renderSkills,renderMetasSlide,renderListaCompras,renderAleman,renderEntrevista]` — dos `<section>` nuevas, `data-i="6"` y `data-i="7"`, agregadas **al final** (mismo criterio que el slide de Lista de Compras: el motor de slides exige `data-i` secuencial 0..N-1, así que agregar al final evita renumerar los 6 anteriores). `SLIDE_MENU_META`, el atajo de teclado (`/^[1-8]$/`, antes `/^[1-6]$/`) y el texto de ayuda ("1-8") se actualizaron junto con `N=RENDERS.length` (dinámico, no hubo que tocarlo aparte).

Ambos slides comparten el mismo concepto — **un tema distinto cada día, elegido con el mismo patrón que `FRASES_MOTIVACION`** (`diaDelAnio()%total`, rota una vez al día, no en cada render) — pero difieren en cómo obtienen el contenido "lo más completo posible" que pidió Adán, porque las dos apps de origen están construidas de forma distinta:

### 🇩🇪 Alemán del día (slide 6, `.theme-aleman`)

`../Aleman/` ya tenía 35 lecciones completas como **archivos HTML independientes** (15 A1 + 20 A2: 12 gramática + 8 vocabulario), cada una con tablas de vocabulario, diálogos, frases comunes, ejercicios y flashcards. En vez de reescribir ese contenido dentro del Dashboard (lo que habría creado una 7ª+8ª estructura duplicada gigante, del tipo que la tabla "Datos duplicados" de arriba ya advierte que hay que sincronizar a mano), el slide:

- **`const ALEMAN_TEMAS`** — array de 35 objetos `{file,nivel,ico,de,es,tags}`, metadata ligera (título alemán, subtítulo español, nivel, 2-4 tags) copiada literalmente de `Aleman/index.html` — **no** el contenido de la lección. Es una 8ª estructura duplicada del mismo tipo que las de la tabla de arriba: si se agrega/quita/renombra un tema en `Aleman/index.html`, hay que replicar aquí el `file`/metadata (pero nunca el contenido rico, que no se duplica).
- **`alemanTemaHoy()`** = `ALEMAN_TEMAS[diaDelAnio()%35]`.
- **`renderAleman()`** pinta el encabezado (ícono+título alemán, subtítulo español, badge de nivel A1/A2 en verde/cian, tags, contador "Tema X de 35 · cambia cada día") y apunta un `<iframe id="alFrame">` a `../Aleman/<file>` — la lección **completa y real**, no un resumen, con su propio scroll interno (`.td-frame-wrap`). Compara `frame.src` antes de reasignarlo para no recargar el iframe si el tema del día no cambió (evita perder scroll/estado al navegar fuera y volver al slide en la misma sesión).
- Botón "↗ Abrir en pestaña nueva" (`target="_blank"`) como respaldo si el iframe no es suficiente.

### 💻 Entrevista del día (slide 7, `.theme-entrevista`) — histórico, ver "Entrevista del día — contenido real, nativo, sin iframe" más abajo

**Toda esta subsección describe la versión con `<iframe>` que existió del 2026-08-04 al 2026-08-07 y ya no está en el código** — se deja como registro histórico (incluye un hallazgo real, el problema de acceso cross-origin, que sigue siendo relevante para entender por qué se reemplazó). El comportamiento actual está documentado en la sección fechada 2026-08-07 más abajo.

`../Entrevistas/entrevistas.html` es distinta: una SPA de un solo archivo con **229 temas** (automotive SW, protocolos CAN/UDS, Python, Git, DevOps, ISTQB, IA, Claude Code, prep. específica de Wayve) que viven todos en un único objeto `T` (`Entrevistas/js/core.js`) y se navegan con la función `go(id)` — no hay 229 archivos separados como en Alemán, así que no aplica el mismo patrón de apuntar el `src` del iframe a un archivo distinto por tema.

- **Cero metadata duplicada aquí** — a diferencia de Alemán, el Dashboard no copia ninguna lista de los 229 temas. En vez de eso, `renderEntrevista()` deja que el `<iframe id="enFrame">` cargue `../Entrevistas/entrevistas.html` una sola vez y, en su evento `load`, lee el objeto `T` **en vivo** desde dentro del propio iframe.
- **Trampa real encontrada y corregida**: `core.js` declara `const T = {...}` a nivel superior de un `<script>` clásico. Un `const`/`let` de nivel superior vive en el *scope léxico del script*, **no** se convierte en propiedad de `window` (a diferencia de `function go(){}`, que sí cuelga de `window.go` por ser function declaration) — así que `frame.contentWindow.T` da `undefined` aunque `T` exista y el documento ya esté `readyState:'complete'`. El primer intento fallaba en silencio (el `catch` vacío ocultaba el problema: el slide se quedaba con el header en "Cargando…" y el iframe sin navegar). Fix: leer `T` con **eval indirecto sobre el propio `contentWindow`** (`win.eval('Object.keys(T)')` / `win.eval('T['+JSON.stringify(id)+']')`), que sí se resuelve en el scope global de ESE documento, no en el del Dashboard. `win.go(id)` en cambio funciona directo sin eval, porque las function declarations sí son propiedades de `window`.
- Con `T` leído, `renderEntrevista()` calcula `idx=diaDelAnio()%Object.keys(T).length`, pinta el encabezado (ícono+título, `hint` como subtítulo, `mod` en mayúsculas como badge, tags, contador "Tema X de 229 · cambia cada día") y llama `win.go(id)` para que el iframe muestre esa página exacta — la lección real completa (texto, tablas, code blocks, quizzes), con el propio sidebar de navegación de Entrevistas visible debajo por si Adán quiere explorar otro tema ese mismo día.
- El listener de `load` solo se registra una vez (`frame.dataset.loaded`); en visitas posteriores al mismo slide en la misma sesión, `renderEntrevista()` reusa el iframe ya cargado y solo vuelve a llamar `paint()` (que a su vez llama `win.go(id)`, idempotente si el tema del día no cambió) — mismo criterio de "no recargar innecesariamente" que Alemán.
- `renderNavMenu()` (el panel ☰) también intenta leer el tema del día vía el mismo truco de `eval` para mostrar su título en la línea de estado; si el iframe todavía no ha cargado la primera vez (usuario nunca visitó el slide 7 en la sesión), cae a un texto genérico "229 temas técnicos" en vez de fallar.

### Clases CSS compartidas `.td-*` ("topic of the day")

Ambos slides tienen el mismo layout (encabezado con título/subtítulo/badge/contador/botón + fila de tags + iframe grande con scroll propio), así que el CSS se escribió una sola vez con nombres neutros — `.td-top`, `.td-right`, `.td-badge`, `.td-counter`, `.td-open`, `.td-title`, `.td-sub`, `.td-tags`, `.td-tag`, `.td-frame-wrap` — y cada slide solo aporta su propio color de acento vía `.theme-aleman{--ac1:#dd0000;--ac2:#ffce00}` (rojo/dorado, bandera alemana) / `.theme-entrevista{--ac1:#4f8cff;--ac2:#22d3a8}` (azul/verde, "tech"). La única clase específica de un solo slide es `.al-level` (badge de nivel A1 verde / A2 cian, con colores fijos que no dependen del tema) — Entrevistas usa en su lugar `.td-badge` genérico, coloreado con `var(--ac1)` del propio slide, porque "módulo" (PYTHON, AUTO, WAYVE, GIT…) no tiene una escala de 2 niveles como A1/A2.

**Bug encontrado y corregido en el mismo cambio**: al escribir el CSS de Alemán no se definió `.theme-aleman{--ac1;--ac2}` (solo se agregaron las clases `.al-*`/`.td-*` que *usan* esas variables) — sin la definición, `var(--ac1)` no resuelve a nada y el botón "Abrir en pestaña nueva" y las manchas de fondo difuminadas (`.slide::before/::after`, que también leen `--ac1`/`--ac2`) se veían sin color. Detectado en el primer screenshot de verificación (botón gris plano, sin el "glow" de fondo que sí tienen los demás slides) y corregido agregando la línea junto a los demás `.theme-*` del bloque de CSS.

Verificado con Playwright (Chromium headless, servidor estático local sirviendo `Claude_Proyecto/` para que las rutas `../Aleman/` y `../Entrevistas/` del iframe resuelvan igual que con Live Server): slide 6 navega a `Aleman/a1-07-pronomen.html` con el `<h1>` real de esa lección visible dentro del iframe, badge "Nivel A1" y botón con `background-color` rojo (`rgb(221,0,0)`, confirmando el fix de `--ac1`); slide 7 navega el iframe a `page-wayve-lingo` (tema real "LINGO — El modelo AV de Wayve", día de la verificación), con badge "WAYVE", 5 tags y el sidebar completo de 229 temas visible debajo por si se quiere explorar más; ambos slides revisados en modo claro y oscuro; cero errores de consola en ninguna combinación.

## Alemán del día — contenido real, nativo, sin iframe (2026-08-07, versión definitiva)

Adán reportó, en dos mensajes seguidos: *"no quiero que me pongas el otro html como encimado, se ve muuuy mal, debes abarcar toda la página, no tomes como tal el html, toma los temas... no hagas la tarea fácil, tú tómate tu tiempo en hacer esta sección bien"* y, tras ver el primer arreglo: *"la sección de alemán no me gustó, revisa bien el proyecto Alemán, ya tienes diferentes html, por qué eso lo dividiste, entonces con esa misma información puedes jalarla para el dashboard y así ya no repliques contenido, utiliza ese y ya en el dashboard se vea muy bien, solo ve la manera de integrarlo"*. Tres intentos reales, en orden:

**Intento 1 (descartado): leer el DOM del iframe en vivo, en el navegador de Adán.** Un `<iframe>` oculto cargaba la lección y `scrapeAlemanLesson()` intentaba leer su `contentDocument` para repintar el contenido con las clases `.al-*` del Dashboard. Verificado con Playwright: **no funciona**. `frame.contentDocument` da `null` y `fetch('../Aleman/archivo.html')` falla con `TypeError: Failed to fetch` — Chrome trata cada archivo `file://` como un origen opaco distinto y bloquea el acceso entre dos documentos `file://` distintos, tanto por `contentDocument` como por `fetch()`/`XHR`, sin excepción, a menos que el Dashboard se sirva desde un servidor local (`http://`). Esto reveló que **"Entrevista del día" (slide 7) tiene el mismo problema, silenciosamente** — su `win.eval('T[...]')` depende del mismo acceso cross-frame, así que en un navegador normal probablemente nunca navega al tema exacto del día; se degrada mostrando el índice completo de Entrevistas en vez de romperse, por eso no se había notado antes.

**Intento 2 (descartado tras mostrarlo): mismo iframe, mejor integrado visualmente.** Se quitó el encabezado duplicado (Dashboard + iframe mostraban el mismo título dos veces) y se agregó un resplandor ambiental rojo/dorado alrededor del recuadro. Funcionaba y se veía mejor que el intento original, pero seguía siendo el HTML/CSS real de `Aleman/styles.css` (crema, tipografía Playfair) pegado dentro del Dashboard — a Adán no le convenció y pidió explícitamente usar la información real sin duplicarla ni mostrarla como página ajena.

**Intento 3 (aplicado): extraer el contenido real, pero *antes*, no en el navegador de Adán.** La clave fue mover el mismo scraping del intento 1 fuera del navegador del usuario: **`Aleman/_generar-datos-dashboard.js`** es un script de Node+Playwright que abre cada una de las 35 lecciones como página propia (nunca como iframe de otra — mismo origen, cero restricción) y extrae su contenido real con `page.evaluate()`. El resultado se guarda en **`Dashboard/aleman-data.js`** (`const ALEMAN_CONTENT = {...}`, ~230 KB, cargado con `<script src="aleman-data.js">` en el `<head>` de `dashboard.html` — esto sí funciona sin servidor, a diferencia de `fetch()`).

- **Qué extrae, por lección**: `hero.desc` (descripción) + `cards[]` — una por cada `.card` de `.topic-content`, con: `vocabTables` (tablas de vocabulario completas, con sus headers), `rule` (regla gramatical, HTML con `<strong>`/`<em>` preservado), `examples` (frases de ejemplo alemán/español), `tip` (consejo), `phrases` (frases por situación), `dialogs` (diálogos completos con hablante/alemán/español), `exercises` (pregunta + pista + espacio para responder), y `conjugations` (tablas de conjugación verbal — pronombre/forma/ejemplo, de los `.conj-big` de `sein`/`haben`).
- **`extra` — el resto, capturado de forma genérica**: 9 de las 15 lecciones A1 tienen widgets visuales únicos que no siguen ningún patrón compartido (números, colores, días, meses, familia, artículos, pronombres, hora) — en vez de escribir un extractor a mano para cada uno de esos ~12 diseños distintos, `extra` los captura por su texto visual real (`innerText`, que respeta saltos de línea de bloques/`<br>`, con una función de respaldo para el caso raro de 2 `<span>` inline sin separador) agrupado en "tarjetas" cuando detecta un patrón de rejilla repetida. Es contenido real, con un formato genérico (`.al-mini-grid`) en vez del diseño original exacto de cada widget — la única concesión de fidelidad visual, y la que hace viable extraer las 35 lecciones sin escribir 12+ renderizadores a mano.
- **`renderAlemanContent(data,t)`** (nueva, reemplaza por completo a la que usaba el iframe) pinta cada `card` como un `.tile.al-card`: tabla de vocabulario (`.al-vocab`), regla (`.al-rule`, monospace con acento cian), ejemplos (`.al-example`, borde dorado), tip (`.al-tip`, verde), frases por situación (`.al-phrase-grid`), diálogos (`.al-dialog-box`, hablante en cian), conjugaciones (`.al-conj`, forma verbal destacada), ejercicios (`.al-exercise`, borde naranja) y la rejilla genérica (`.al-mini-grid`) — todo con la tipografía Fraunces de los títulos y los colores de tema (`--cy`/`--text2`/`--w`/`--o`) ya usados en el resto del Dashboard, en ambos temas.
- **El encabezado del slide ya no está duplicado en ningún sentido** — título, subtítulo, badge de nivel y tags se pintan una sola vez (con el estilo nativo del Dashboard) y todo el contenido de la lección aparece debajo, en `#alContent` (scroll interno, `flex:1`, usa prácticamente toda la altura y el ancho del slide). El link "↗ Ver lección original" queda como referencia, por si Adán quiere ver las flashcards interactivas (la única pieza que no se replica — su vocabulario ya está en las tablas).
- **Regenerar los datos si cambia una lección**: `node Aleman/_generar-datos-dashboard.js` (requiere Playwright instalado; es una herramienta de desarrollo, no corre en el navegador de Adán). Vuelve a leer las 35 lecciones y sobrescribe `Dashboard/aleman-data.js` completo.
- Verificado con Playwright: las 35 lecciones se renderizan con contenido real (mínimo 1 tarjeta, cientos de caracteres de texto cada una), probado en 4 fechas distintas → 4 lecciones distintas, en modo claro y oscuro (capturas confirmando buen contraste en ambos, incluida la rejilla genérica y la tabla de conjugación), cero errores de consola.

## Entrevista del día — contenido real, nativo, sin iframe (2026-08-07)

Pedido explícito, después de ver el resultado de "Alemán del día" de la sección de arriba: *"lo mismo que hiciste en la sección de alemán visualmente y que cambia cada día, hazlo con entrevistas, que se vea muy bien"*. Mismo objetivo que el intento 3 de Alemán (contenido real, sin iframe, integrado con el estilo del Dashboard) pero con una arquitectura de origen distinta, así que la solución no fue copiar el mismo script — fue diseñar una versión más simple aprovechando cómo está construido `Entrevistas/`.

**Por qué esto también arreglaba un bug real, no solo una preferencia visual**: la sección "Alemán del día" de arriba ya había dejado anotado (ver "Intento 1 descartado") que el mecanismo viejo de Entrevista (`win.eval('T[...]')` sobre el `contentWindow` del iframe) probablemente **nunca funcionaba en un navegador normal** — Chrome bloquea el acceso entre dos documentos `file://` de distinto origen, y solo parecía funcionar en las verificaciones anteriores porque corrían contra un servidor HTTP local, no contra el archivo abierto directo como Adán lo usa. Esta reescritura elimina el iframe por completo, así que ese problema deja de existir de raíz, no solo se disimula.

### Por qué no hizo falta Playwright (a diferencia de `Aleman/_generar-datos-dashboard.js`)

Las 35 lecciones de Alemán son HTML ya **renderizado por el navegador** — hay que abrir la página y leer el DOM resultante, por eso ese script usa Playwright. El contenido de Entrevistas es distinto en su origen: `Entrevistas/js/core.js` (objeto `T`, metadata de los 229 temas) y los 19 `Entrevistas/js/data-*.js` (objetos `*_RICH`, uno por módulo) **ya son HTML escrito a mano dentro de template strings de JavaScript** — no hace falta un navegador para leerlos, basta con ejecutar esos archivos en una sandbox de Node (`vm`) y leer las variables resultantes. **`Entrevistas/_generar-datos-dashboard.js`** (nuevo, mismo nombre y mismo propósito que el de Alemán, pero sin la dependencia de Playwright) hace exactamente eso:

1. Ejecuta `core.js` + los 19 `data-*.js` en un contexto `vm` de Node (con `localStorage`/`document`/`window` mínimamente *stubbeados*, porque `core.js` los toca de pasada al declarar `T`).
2. Detecta automáticamente los nombres reales de las constantes `*_RICH` de cada archivo con una regex sobre el código fuente (`/^const\s+(\w+_RICH\w*)\s*=/gm`) — no hay una lista hardcodeada de 21 nombres que se pueda desactualizar sola si se agrega un módulo nuevo.
3. Verifica que los 229 ids de `T` tengan exactamente un `RICH[id]` correspondiente (y viceversa) — **si hay un desajuste, el script para con `process.exit(1)` en vez de generar datos incompletos en silencio**. Verificado en esta corrida: 229/229, cero huecos en ningún sentido.
4. Extrae de `Entrevistas/styles.css` (317 bloques de reglas en total) solo las que de verdad usan alguna de las clases presentes en el contenido real (154 bloques), más el único `<style>` embebido que trae el tema `wayve-algo-approach` en `data-coding.js` (104 reglas más — `bigo-*`, `err-*`, `step-*`, `script-*`, `optim-*`, `ec-*`, `pattern-*`, documentadas ya en este mismo README bajo "Trampa — grids definidos en un `<style>` embebido..." del lado de `Entrevistas/`) — así esas clases existen siempre en el Dashboard, no solo el día en que ese tema en particular sea el elegido.
5. Reescribe cada selector con el prefijo `.en-content` (`.quiz-card` → `.en-content .quiz-card`; `[data-theme="dark"] .quiz-a` → `[data-theme="dark"] .en-content .quiz-a`, respetando que el prefijo de tema vaya *antes*) para que ninguna de esas ~150 reglas choque con el resto del CSS del Dashboard.
6. Escribe **`Dashboard/entrevistas-data.js`** (`ENTREVISTA_TEMAS` — metadata plana de los 229, tomada de `T` sin reescribir nada a mano; `ENTREVISTA_CONTENT` — HTML real por id, tomado de `*_RICH` tal cual; `ENTREVISTA_CSS` — el CSS ya escopeado como string), cargado con `<script src="entrevistas-data.js">` en el `<head>` de `dashboard.html`, junto a `aleman-data.js`.

### Colores: los propios de Entrevistas, no los del Dashboard

`ENTREVISTA_CSS` empieza con dos bloques de variables (`.en-content{--accent:#2563EB;...}` para claro y `[data-theme="dark"] .en-content{--accent:#3B82F6;...}` para oscuro) copiados **literales** de `Entrevistas/styles.css → :root` / `:root[data-theme="dark"]` — a propósito, **no remapeados** a la paleta del Dashboard (`--ac1`/`--p`/`--cy`). Dos razones: (1) son colores semánticos ya afinados (verde=correcto, rojo=incorrecto, ámbar=advertencia en quizzes/comparaciones de errores/niveles de dificultad) que perderían su significado si se forzaran al morado/verde-neón del Dashboard; (2) Entrevistas usa exactamente el mismo atributo `data-theme="dark"|"light"` en la raíz del documento que el Dashboard (`toggleTheme()` en ambos archivos hace `html.setAttribute('data-theme', next)`), así que las reglas `[data-theme="dark"] .en-content{...}` responden solas al botón de tema del Dashboard sin ningún JS adicional — pura coincidencia de que ambos proyectos convergieron en la misma convención, pero muy conveniente aquí.

### `renderEntrevista()` — mismo patrón que `renderAleman()`

- `entrevistaTemaHoy()` = `ENTREVISTA_TEMAS[diaDelAnio()%229]` — mismo mecanismo de rotación diaria que `alemanTemaHoy()`/`FRASES_MOTIVACION`.
- Pinta el encabezado (ícono+título, `hint` como subtítulo, `mod` en mayúsculas como badge, tags, contador "Tema X de 229 · cambia cada día") y hace `#enContent.innerHTML = ENTREVISTA_CONTENT[t.id]` — ya no hay iframe ni `win.eval`.
- **`injectEntrevistaCss()`** inyecta `ENTREVISTA_CSS` como un único `<style id="enStyle">` en el `<head>`, la primera vez que se renderiza el slide (no en cada cambio de tema del día — el CSS es el mismo para los 229, solo cambia qué HTML se pinta adentro).
- **`toggleQuiz(el)`/`switchTab(btn,panelId,groupClass)`** — copiadas literal de `Entrevistas/js/core.js`. El HTML real de cada tema trae `onclick="toggleQuiz(this)"` / `onclick="switchTab(this,'id','grupo')"` incrustado (preguntas de quiz que se expanden, sub-pestañas dentro de un tema como "Big O visual" en `wayve-algo-approach`) — sin estas dos funciones definidas en `dashboard.html`, esos clics tirarían `ReferenceError` en consola y no harían nada.
- `renderNavMenu()` (panel ☰) se simplificó: ya no necesita el `try/eval` con fallback a texto genérico — `entrevistaTemaHoy()` siempre puede leer el tema del día directo, sin depender de que un iframe haya terminado de cargar.

### Qué se quitó

`#enFrame`/`#enFrameWrap` (el iframe y su contenedor), la clase CSS `.td-frame-wrap` (verificado que no la usaba nada más en el archivo), y toda la lógica de `win.eval`/`frame.dataset.loaded` de la `renderEntrevista()` vieja.

### Verificación

Con Playwright: **229/229 temas** generados desde `T`/`*_RICH` sin ningún hueco (el propio script aborta si detecta un desajuste, no hizo falta forzarlo — ya salió limpio a la primera); muestreo de 77 temas (1 de cada 3, cubriendo los 229) renderizados en el Dashboard sin quedar vacíos y sin overflow horizontal; interacción real probada en 3 temas representativos — `wayve-algo-approach` (8 pestañas internas, clic en la 3ª activa el panel correcto, incluida la visualización "Big O" que depende del `<style>` embebido), `istqb-examen` (21 tarjetas de quiz, clic revela la respuesta correcta con su explicación) y `py-cheatsheet` (11 tablas, sub-pestañas por tipo de dato); rotación diaria confirmada en 6 fechas distintas del año → 6 temas distintos; capturas en modo claro y oscuro con buen contraste en ambos; **cero errores de consola** en todo el recorrido.

### Segunda ronda — vidrio del Dashboard + limpieza de contenido (2026-08-07, mismo día)

Adán, tras ver la primera versión: *"se que puedes hacerlo mucho mejor, no se ve tan bien integrado, mejora la calidad y el contenido de lo de entrevistas"*. La primera versión preservaba el look propio de Entrevistas (tarjetas blancas/azul-marino planas, bordes grises sólidos) — funcionaba, pero al lado del resto del Dashboard (tarjetas de vidrio translúcido con `backdrop-filter`, sobre el fondo animado de manchas difuminadas) se sentía una app distinta pegada encima, no una pantalla más del mismo sistema.

- **`--white` y `--border` dejaron de ser colores propios de Entrevistas y pasan a valer `var(--card)`/`var(--card-br)`** (los tokens de vidrio que ya usa `.tile` en el resto del Dashboard) — una sola definición en `.en-content{}`, sin necesitar una versión aparte para modo oscuro, porque `var(--card)` ya cambia solo según el tema activo del Dashboard. El resto de las variables (verde/rojo/ámbar semánticos, texto, tags, `--wayve`) se dejaron intactas a propósito — esos sí tienen significado que no debía perderse remapeándolos a la paleta morada/cian del Dashboard.
- **`addGlassIfWhiteBg()`** (nueva, en el generador) — cualquier regla de CSS que pinte su fondo con `var(--white)` recibe automáticamente `backdrop-filter:blur(16px)`, igual que `.tile`. No hizo falta enumerar a mano los ~15 nombres de clase "tarjeta" (`info-card`, `err-card`, `plan-card`, `step-body`, `dtree`, `optim-card`, `stuck-card`, `ec-card`, `py-tool-card`, `approach-mini`...) — el criterio es automático: si pinta blanco/vidrio, se difumina.
- **Bug real encontrado probando, no solo supuesto**: aplicar `backdrop-filter` a `.quiz-card` rompía la pantalla en modo claro cuando un tema trae muchas preguntas apiladas (`istqb-examen` tiene 21) — captura de pantalla confirmó todo el texto de la pantalla (título, tags, hasta fuera de `#enContent`) con un manchado/desenfoque general, un problema real de composición de Chromium con muchos `backdrop-filter` superpuestos y cercanos entre sí, no un rumor. Fix: `NO_BLUR_REPEATING=['.quiz-card']` — las tarjetas que se repiten como filas de una lista larga se quedan con el tinte de vidrio (el color translúcido) pero **sin** blur; el blur se reserva para tarjetas grandes y en poca cantidad por pantalla, que es donde de verdad se nota el efecto sin este riesgo. Verificado de nuevo tras el fix: mismo tema, misma captura, texto nítido.
- **El `<style>` embebido de `wayve-algo-approach`** traía sus fondos de tarjeta hardcodeados como `background:#fff` literal (no `var(--white)`, a diferencia de `styles.css`) — se normalizan a `var(--white)` antes de escoparlos, para que también reciban el vidrio en vez de quedar como cajas blancas sólidas fijas en modo oscuro. El único `background:#fff` suelto en un `style=""` inline dentro del HTML de ese mismo tema se corrigió igual (`color:#fff` de texto, que sí debe quedarse blanco sólido por contraste, no se tocó — el reemplazo apunta específicamente a `background:`).
- **Contenido — se quitaron 98 placeholders vacíos de "Mis notas"**: `.notes-card` aparece 124 veces en los 229 temas, pero 98 de esas son literalmente el texto genérico *"Agrega aquí tus notas sobre X..."* — una invitación a escribir que no tiene sentido en un Dashboard de solo lectura (no hay ningún mecanismo para guardar lo que se escriba ahí). Las otras 26 SÍ traen un consejo concreto y real bajo la misma clase (ej. *"Practica los 6 pasos en voz alta con 'find_sensor_gaps'. Cronometra 20 minutos"*) — esas se conservan tal cual, es contenido real, no relleno. El filtro es por el texto exacto del placeholder (`/^Agrega aquí/i`), no por la clase, para no perder las 26 buenas.
- Verificado con Playwright: 115 temas (1 de cada 2, cubriendo los 229) sin overflow ni vacíos y sin ningún placeholder genérico restante; el tema con más tarjetas de la muestra (`wayve-algoritmos`, 48 elementos con alguna clase `*-card`) revisado por separado en ambos temas — nítido, sin el artefacto de manchado; `istqb-examen` (el caso que sí lo disparaba) confirmado limpio tras el fix; cero errores de consola.

### Tercera ronda — el contenido no era el problema, la falta de aviso de scroll sí (2026-08-07, mismo día)

Adán insistió: *"mejora mas el contenido"*. Investigado antes de cambiar nada (buscar `TODO`/`WIP`/`placeholder`/`próximamente` en los 19 `data-*.js`, revisar la distribución de longitud de los 229 temas) — **no había más contenido genérico ni roto**: los "temas cortos" (ej. `canalyzer`, 953 caracteres) están completos, solo son proporcionalmente breves para su alcance real. Se le preguntó a Adán cuál tema en concreto sentía flojo — señaló **"Data Pipeline"** (`wayve-data-pipeline`).

- **El contenido real de ese tema tiene 3 bloques completos**: "Visión general" (el diagrama de 5 pasos que sí se veía), "Paso 3 en detalle — Validation" (pseudocódigo Python real de validación de archivos MCAP) y "Runbook de offload" (7 pasos del día a día), más una nota real al final ("Este es el corazón del rol. Estudia bien el código de validación..."). **Nada de esto faltaba en la extracción** — verificado con Node: `ENTREVISTA_CONTENT['wayve-data-pipeline']` ya traía los 3 `plan-block` completos.
- **El problema real, medido con Playwright**: de los 2210px de alto que ocupa el contenido completo de ese tema, solo 670px eran visibles sin hacer scroll (1540px, ~70%, quedaban ocultos) — y `#enContent` no tenía ninguna señal de que hubiera más abajo. La primera tarjeta ("Visión general") termina con un borde redondeado limpio que se ve como el final natural del tema, no como "1 de 3" — de ahí que se percibiera como contenido corto cuando en realidad era rico y completo, solo invisible.
- **`.en-scroll-hint`** (nueva) — una píldora de vidrio ("↓ más contenido — desliza para ver todo", con una flechita que rebota) que aparece centrada al pie de `#enContent` mientras quede contenido oculto debajo del scroll, y desaparece sola al llegar al fondo. Se descartó un degradado de desvanecido (`fade-out gradient`) porque el fondo real detrás de `#enContent` son las manchas de color animadas del slide, no un color plano — un gradiente hacia un color fijo se habría visto con un corte visible en vez de fundirse; una píldora de vidrio (mismo patrón que `.mes-tab`/`.lc-tab`) se ve bien encima de cualquier fondo sin necesitar adivinar un color de destino.
- **`updateEnScrollHint()`** — mide `scrollHeight-scrollTop-clientHeight` y muestra/oculta la píldora con ese umbral (24px de margen). Se llama tras cada `renderEntrevista()` (con `requestAnimationFrame`, para medir después de que el navegador ya acomodó el HTML nuevo, no antes) y en cada evento `scroll` de `#enContent` (el listener se agrega una sola vez, con la misma bandera `enScrollListenerAttached` que usa `injectEntrevistaCss()` para `entrevistaCssInjected`). También se fuerza `scrollTop=0` en cada `renderEntrevista()` — el tema cambia todos los días, así que siempre debe arrancar arriba del todo, nunca donde quedó el scroll del tema de ayer.
- Verificado con Playwright: la píldora aparece al cargar `wayve-data-pipeline` (contenido más largo que el alto visible), desaparece al hacer scroll hasta el fondo, y no aparece en absoluto en un tema corto que ya cabe completo (`canalyzer`) — no es un elemento decorativo fijo, refleja el estado real de cada tema. Cero errores de consola.

### Regenerar los datos si cambia un tema

`node Entrevistas/_generar-datos-dashboard.js` — sin dependencias que instalar (a diferencia del de Alemán, no usa Playwright). Vuelve a leer `core.js` + los 19 `data-*.js` + `styles.css` y sobrescribe `Dashboard/entrevistas-data.js` completo. Correrlo si se agrega/edita un tema en `Entrevistas/js/core.js` o `data-*.js`, o si cambia una clase de contenido en `Entrevistas/styles.css`.

## Botón "Siguiente lección/tema →" en Alemán y Entrevista (2026-08-07, mismo día)

Pedido explícito: *"en aleman y en entrevistas haz que pueda cambiar de leccion siguiente u otro tema siguiente"*. Hasta ahora ambos slides solo mostraban el tema del día (`diaDelAnio()%N`) — para ver otro había que esperar a mañana o abrir la app completa en pestaña nueva.

- **`alemanIdx`/`entrevistaIdx`** (nuevas, `let ...=null`) — mismo patrón en los dos slides: mientras sean `null`, `alemanTemaHoy()`/`entrevistaTemaHoy()` calculan el índice del día como siempre y lo **fijan** en la variable (ya no se recalcula en cada render); en cuanto Adán hace clic en "Siguiente", `alemanSiguiente()`/`entrevistaSiguiente()` avanzan ese índice fijo en +1 (con wraparound al llegar al final: `%ALEMAN_TEMAS.length` / `%ENTREVISTA_TEMAS.length`) y vuelven a renderizar. Mismo criterio que "Recordar última pantalla" del resto del Dashboard: una vez que Adán navega a mano, no se lo pisa el valor automático del día — se queda donde lo dejó por el resto de la sesión (hasta recargar la página).
- **`.td-next`** (nueva clase CSS, compartida entre ambos slides igual que el resto de `.td-*`) — botón secundario junto a "Ver lección original"/"Abrir en pestaña nueva", mismo tamaño de píldora pero con relleno translúcido en vez del color sólido de acento (para no competir visualmente con el botón principal, que sigue siendo el CTA real hacia la app completa).
- El contador ("Tema X de 35/229 · cambia cada día") sigue funcionando igual — ahora refleja `alemanIdx+1`/`entrevistaIdx+1` en vez de recalcular la posición desde el tema del día, así que también avanza correctamente al usar "Siguiente".
- Verificado con Playwright: 3 clics seguidos en Alemán avanzan Tema 10→11→12→13 de forma consistente; en Entrevista, un clic cambia de "Data Pipeline" a "Coding Challenge — Lo que preguntarán" (Tema 220→221); cambiar de tema claro/oscuro **no** resetea la navegación manual (se confirmó que sigue mostrando el mismo tema navegado, no vuelve al del día); clics reales de mouse (no solo llamadas directas a la función) confirmados limpios, sin overflow ni artefactos visuales; cero errores de consola.

## Categoría "📚 Libros" en Lista de Compras + 3 píldoras nuevas en la barra superior (2026-08-04)

Dos pedidos explícitos en la misma sesión: *"añade en la sección de compras, los libros que me recomendaste"* y *"faltan botones en dashboard de otros htmls"*.

- **`LISTA_COMPRAS.libros`** — objeto agrupado por tema (mismo patrón que `comida` agrupada por pasillo), con **44 libros únicos** extraídos programáticamente (regex sobre `recurso-item.r-libro`, deduplicados por título) de `../Coach/Coach_v2.html → #aprendizaje` y `#perfil-rico`, donde ya vivían como recomendaciones de lectura. 9 categorías: Ventas, Copywriting, Marketing, Networking, Liderazgo, Programación, Datos, Finanzas e Inversión, Hábitos y Mentalidad. Es la **9ª estructura duplicada** del tipo ya documentado en "Datos duplicados" arriba — si Adán agrega/cambia una recomendación de libro en Coach, hay que replicarla aquí a mano. `LISTA_CAT_META.libros` (`{ico:'📚',label:'Libros'}`) se agregó junto a las otras 4 categorías; `renderListaCompras()`/`verListaCat()` no necesitaron ningún cambio de lógica — ya soportaban objetos agrupados desde que `comida` se organizó por pasillo.
- **3 píldoras nuevas en `.qa-bar`** (`renderQuickApps()`): 👔 **Vestimenta** (`?tab=vestimenta` — ya existía la app y el tab en `cuidadopersonal.html` desde el 2026-08-01/03, pero nunca se le había agregado píldora aquí), 🇩🇪 **Alemán** (`../Aleman/index.html`) y 💻 **Entrevistas** (`../Entrevistas/entrevistas.html`) — estas dos últimas apuntan al índice completo de cada app, no al slide del tema del día (que ya vive dentro del propio Dashboard). Lista actual: Coach, Finanzas, Skincare, Salud, Ejercicio, Comida, Dentista, Vestimenta, Alemán, Entrevistas (10, antes 7).

Verificado con Playwright: `.qa-name` de las 10 píldoras en el orden esperado; la pestaña "📚 Libros" del slide Lista de Compras muestra 44 ítems agrupados en 9 categorías con grid de 3 columnas, igual patrón visual que Comida; cero errores de consola.

## Tile "🔜 Siguiente" pasó de 1 tarea a una lista compacta (2026-08-07)

Pedido explícito: *"en la sección de siguiente, puedes poner ahí en pequeño para que quepan varias cosas, las task o actividades más importantes del día"* — antes `#diaSiguiente` (slide Mi Día) mostraba solo la tarea inmediatamente siguiente en texto grande (`font-size:clamp(16px,1.8vw,22px)`).

- **Nueva función `renderSiguienteList(tareasHoy, actual, now)`** — toma las tareas de hoy posteriores a `actual` (hasta 5) y arma una fila por cada una: hora + texto en una línea chica (`.ds-row`, 12px), la inmediata destacada con negritas y el contador "en Xh Xm" (`.ds-row-next`, 15px). Reemplaza el cálculo del countdown que antes vivía duplicado e inline dentro de `renderDia()` y de `tickClock()` — ahora ambos llaman a la misma función.
- **Nuevas clases CSS** `.ds-row`/`.ds-hora`/`.ds-txt`/`.ds-in`/`.ds-row-next`/`.ds-empty`, junto a las `.rt2-*` ya existentes de la timeline. El texto largo de cada tarea se trunca con `text-overflow:ellipsis` en las filas chicas (no en la destacada, que sí hace wrap) para que quepan varias sin desbordar el tile.
- **No es la lista de "más importantes"** en un sentido de prioridad explícita — `RUTINA_TASKS` no tiene un campo de importancia — sino las próximas cronológicamente, que es la interpretación práctica de "lo que sigue en el día". Si Adán quiere que se destaquen tareas específicas como más importantes (p. ej. por categoría o con una marca nueva en el dato), habría que agregar ese campo a `RUTINA_TASKS` primero.
- El widget "Ahora / Siguiente" de `Coach_v2.html → #rutina` (`#rutina-live`) es una UI aparte, con su propio HTML/JS — no forma parte de esta duplicación y no se tocó.

Sin verificar con Playwright en esta sesión (sintaxis del `<script>` validada con `node --check` equivalente); se abrió `dashboard.html` directo en el navegador para revisión visual manual.

## Cuidado del cabello en la ducha + ducha del domingo agregada (2026-08-07)

Mismo pedido y mismo cambio de datos que en `Coach_v2.html` (ver [`../Coach/readme_coach_v2.md`](../Coach/readme_coach_v2.md) → "Cuidado del cabello en la ducha…" para el detalle completo de qué productos y por qué) — se replicó aquí porque `RUTINA_TASKS` es una de las estructuras duplicadas de la tabla "Datos duplicados" de arriba:

- `wd02` (Lun-Vie, "Bañarte") se dividió en `wd02lav` (Lun/Jue, agrupada con 3 subtareas de cuidado capilar: champú, acondicionador, aceite en puntas) y `wd02` (Mar/Mié/Vie, ducha normal sin cambios de fondo).
- `sa05` (Sábado, "Ducha") pasó a `sa0506`, agrupada, con las mismas 3 subtareas más una mascarilla capilar semanal.
- **`do045` — nueva tarea de bañarse en domingo** (08:35, entre ejercicio y tiempo libre): antes el horario de domingo no tenía ninguna tarea de ducha, hueco real que salió a la luz al revisar el horario completo para este cambio.
- `RUTINA_TASKS` subió de 58 a 61 tareas de nivel superior y de 92 a 100 hojas contando subtareas — verificado byte-idéntico contra `Coach/Coach_v2.html` con el comando de la sección "Datos duplicados" de arriba.
- El Dashboard no renderiza el campo `link` de ninguna tarea en su timeline (`renderDia()` solo usa `t.txt`/`t.hora`/`t.cat`/`t.subtareas`, nunca `link`) — el `link` a "Ver Cuidado del Cabello" que sí se ve en `Coach_v2.html → #rutina` no tiene efecto visual aquí, pero se dejó en el dato para mantener la sincronización byte-idéntica exigida por el patrón de "Datos duplicados".

## Se lava el cabello todos los días — co-wash con acondicionador en los días sin champú (2026-08-07)

Corrección explícita de Adán, mismo día que el cambio de arriba: se lava el cabello **a diario**, no solo Lun/Jue/Sáb — quería el nombre del producto y qué hacer con él para cada día, no un texto vacío tipo "ducha normal". Detalle completo en [`../Coach/readme_coach_v2.md`](../Coach/readme_coach_v2.md) → "Se lava el cabello todos los días…".

- `wd02` (Mar/Mié/Vie) pasó a `wd02co`, agrupada: Acondicionador *TRESemmé Keratin Smooth Conditioner* (co-wash, sin champú) + Aceite en puntas opcional.
- `do045` (Domingo) recibió las mismas 2 subtareas.
- Los 3 días de champú (Lun/Jue/Sáb) no cambiaron — el champú anticaída sigue siendo solo esos días, porque su propia ficha de uso en `HAIR_DB` dice "2-3 veces por semana", no a diario.
- `RUTINA_TASKS` se mantuvo en 61 tareas de nivel superior y subió de 100 a 102 hojas contando subtareas — verificado byte-idéntico contra `Coach/Coach_v2.html`.

## Slide "Mis Metas" — fotos reales en Corto/mediano plazo + columna de Largo plazo más angosta (2026-08-07)

Dos pedidos explícitos en el mismo mensaje: *"para la sección corto y mediano plazo ponme el nombre de las cosas y una imagen en HD para que me motive a lograrlo"* y *"la sección de largo plazo la puedes hacer más pequeña del lado derecho, así caben las imágenes mejor"*.

- **Origen de las imágenes — decisión explícita de Adán**: se le preguntó cómo conseguir las fotos (URLs de internet vs. que él suba sus propias fotos a una carpeta local vs. ilustraciones SVG) y eligió **imágenes de internet por URL**. Esto significa que **el Dashboard ahora depende de tener internet abierto** para ver esas 5 fotos — a diferencia de todo lo demás en este archivo, que es 100% offline. Si algún día se cae el link de Unsplash o Adán prefiere fotos propias, hay que volver a esta decisión.
- **Las 5 URLs se buscaron y verificaron, no se inventaron** — se usó `WebSearch`/`WebFetch` contra colecciones reales de Unsplash (`unsplash.com/s/photos/<tema>`) para sacar URLs directas de `images.unsplash.com/photo-<id>`, y se confirmó con `curl -I` que las 5 responden `200` antes de ponerlas en el código:
  - 🏆 Torneo de ajedrez → `photo-1529699211952-734e80c4d42b`
  - 🏋️ Primer Hyrox → `photo-1739283180407-21e27d5c0735`
  - 💻 Trabajar remoto → `photo-1586227740560-8cf2732c1531`
  - 🚙 Cupra Formentor → `photo-1655288929105-a4ef9c225592`
  - 🚗 Liquidar el BYD → `photo-1694027655519-016c93b014e6`
  
  Todas con el mismo query string `?w=800&q=80&auto=format&fit=crop` (parámetros de la API de imágenes de Unsplash — recorta a 800px de ancho, calidad 80, suficiente para las tarjetas de `clamp(64px,9vh,110px)` de alto que las muestran, sin cargar el archivo original de varios MB).
- **`cortoMediano`** (array en `renderMetasSlide()`) ganó un campo `img` por ítem. Nueva función `imgListHtml()` (junto a la `listHtml()` ya existente, que se sigue usando solo para `largoExtras`) arma un `.meta-img-grid` — grid de 2 columnas, cada `.meta-img-card` con la foto como `background-image` inline, un degradado oscuro (`::after`) para que el texto blanco se lea encima, y el ícono+nombre en `.meta-img-txt` sobre la esquina inferior. El 5º ítem (impar, último) ocupa el ancho completo (`.meta-img-card:last-child:nth-child(odd){grid-column:1/-1}`) en vez de dejar un hueco vacío en el grid de 2 columnas.
- **`#metasListas` pasó de `.g2` (50/50) a la nueva clase `.g-metas`** (`grid-template-columns:1.7fr 1fr`, colapsa a `1fr` en `≤900px` igual que el resto de los grids responsivos) — la columna de Corto/mediano (con fotos) quedó más ancha, la de Largo plazo (`listHtml()`, sin cambios de contenido, sigue siendo la lista de texto con ícono) más angosta, tal como se pidió.
- **Altura de las tarjetas en `clamp(64px,9vh,110px)`, no `aspect-ratio`** — este slide es de altura fija (`.slide{overflow:hidden}`, sin scroll, ver nota de arquitectura en la sección "Pulido visual"), así que las tarjetas se dimensionan por alto de viewport en vez de por su ancho, para no arriesgarse a que 3 filas de tarjetas cuadradas empujen el contenido fuera de la pantalla en monitores angostos.
- Sin verificar con Playwright en esta sesión (sintaxis validada con el mismo chequeo de `node -e "new Function(...)"` sobre ambos `<script>`, y las 5 URLs de imagen confirmadas con `curl -I` → `200`); se abrió `dashboard.html` directo en el navegador para revisión visual manual — hay que navegar al slide 5 (🎯 Mis Metas, atajo `5` o menú ☰) para verlo, no es la pantalla principal.

**Ajuste el mismo día — el BYD real es un Dolphin Mini, e intercambio de tamaños Cupra↔BYD**: Adán aclaró *"el byd es un dolphin mini y eso ponlo de tamaño del cupra y el cupra ponlo del tamaño que esta el byd actualmente"*.
- **Foto del BYD reemplazada** — la genérica de "BYD car" (Unsplash `photo-1694027655519`, un modelo cualquiera) no correspondía al coche real de Adán. Se buscó específicamente "BYD Dolphin Mini" (mismo modelo que en Brasil/LatAm se vende como Dolphin Mini y en China como BYD Seagull) y no había fotos en Unsplash, así que se usó Wikimedia Commons (`Category:BYD_Dolphin_Mini`, licencia libre): `BYD_DOLPHIN_MINI_(BRAZIL)_BYD_SEAGULL.jpg`, servida a 960px vía la ruta de thumbnail ya resuelta por `Special:FilePath?width=800` (Wikimedia la redondeó a 960px) — verificada con `curl` que responde `200` directo, sin depender de la redirección. El texto del ítem pasó de "Liquidar el BYD" a "Liquidar el BYD Dolphin Mini" para que quede claro qué modelo es.
- **Tamaños intercambiados cambiando el orden del array, no el CSS** — el tamaño de cada tarjeta lo decide su posición en `cortoMediano` (la regla `.meta-img-card:last-child:nth-child(odd){grid-column:1/-1}` hace que solo el 5º/último ítem ocupe el ancho completo, ver sección de arriba). Antes el orden era …Cupra (4ª, tamaño normal), BYD (5ª, ancho completo); se intercambió el orden a …BYD (4ª, tamaño normal), Cupra (5ª, ancho completo) — mismo mecanismo, cero CSS nuevo.

## Lista de Compras: el nombre del producto abre Amazon (skincare/cabello/suplementos) + fotos también en Largo plazo (2026-08-07, mismo día)

Dos pedidos explícitos en un mismo mensaje.

**1) `renderListaCompras()` — el checkbox solo tacha, el texto del producto abre Amazon**: *"en la sección de compras de suplementos, skincare y cabello, solo en el checkbox dame la opción para tachar, pero cuando dé click en el producto llévame al link del producto en Amazon"*. Antes cada ítem era `<input type=checkbox> + <label for=id>` — clic en cualquiera de los dos marcaba/desmarcaba, sin ningún link.

- **`LC_AMAZON_CATS = ['skincare','cabello','suplementos']`** — solo estas 3 categorías cambiaron de comportamiento. `comida` y `libros` **no se tocaron**, siguen con el `<label>` de siempre (comida son ingredientes de súper, no tiene sentido un link de Amazon; libros no se pidió).
- **`lcRenderItems()` ahora recibe un 3er parámetro `conLinkAmazon`** — si es `true`, el texto se pinta como `<a href="https://www.amazon.com.mx/s?k=<query>" target="_blank">` en vez de `<label>`; el checkbox deja de estar vinculado a ese texto por `for=`, así que clicar el nombre ya **no** lo tacha, solo abre Amazon en pestaña nueva — exactamente la separación que pidió Adán.
- **`lcAmazonQuery(txt)` — no son links a un producto exacto, son búsquedas de Amazon**: el texto de cada ítem trae formato `"Categoría — Marca A o Marca B o Marca C"` (varias alternativas de marca, ver `LISTA_COMPRAS` arriba) o, en suplementos, solo `"Producto"` sin categoría. La función toma lo que sigue a `" — "` (si existe) y corta en la primera `" o "`, quedándose con la **primera alternativa recomendada** como término de búsqueda — no se inventó ningún ASIN/URL de producto específico (no hay forma de verificar que un link directo a un producto exacto siga existiendo o sea el correcto), así que se optó por `amazon.com.mx/s?k=<término>`, un link de búsqueda que siempre lleva a resultados relevantes reales. Documentado aquí para que quede claro que no son deep-links verificados a una página de producto puntual.
- Nuevas clases CSS `.lc-item-link`/`.lc-amz-ico` (icono `↗` chico al final del nombre) junto a las `.lc-item` ya existentes; `input:checked+a.lc-item-link` tacha el texto igual que antes con `label`.

**2) Fotos también en Largo plazo, dentro del mismo espacio ya asignado**: *"en la sección de mis metas, haz lo mismo para largo plazo, pon imágenes, pero quiero que se acomoden en ese espacio que ya está, para tener en más grande las de mediano plazo y las de largo así de tamaño, deben ser fotos en HD también"*.

- **Los 7 ítems de `largoExtras`** (Empresa creada, Depa, Pelear en Tailandia, Rascacielos en Hong Kong, Lanzamiento de SpaceX, Maestría en Alemania, Hyrox internacional) ganaron su campo `img` — mismo proceso que `cortoMediano`: búsqueda en colecciones reales de Unsplash + `curl` confirmando `200` antes de usar cada URL. Para "Maestría en Alemania" no había fotos específicas de universidades alemanas en Unsplash, así que se usó una foto genérica de graduación (toga y birrete) — queda documentado por si Adán prefiere algo más específico después. Para "Hyrox internacional" se usó una foto de Hyrox distinta a la ya usada en `cortoMediano` (`Primer Hyrox`), para no repetir la misma imagen dos veces en el mismo slide.
- **`listHtml()` se eliminó por completo** (ya no queda ninguna referencia en el archivo) — `imgListHtml()` ahora sirve a ambas columnas, con un 2º parámetro opcional `sizeCls`: `imgListHtml(cortoMediano)` (sin argumento, tarjeta grande) e `imgListHtml(largoExtras,'sm')` (tarjeta chica, sufijo `-sm` en las 3 clases CSS).
- **"Se acomoden en ese espacio que ya está" = mismo `.g-metas` (1.7fr/1fr), sin agrandar el slide** — no se tocó la proporción de columnas. Como Largo plazo tiene 7 ítems (4 filas en un grid de 2 columnas) contra los 5 de Corto/mediano (3 filas) en una columna más angosta, las tarjetas de Largo plazo necesitaban ser más chicas para caber en la misma altura de tile (el slide es de altura fija, `overflow:hidden`, sin scroll): nuevas clases `.meta-img-grid-sm`/`.meta-img-card-sm` (`height:clamp(38px,5.8vh,72px)`, la mitad aprox. de las grandes) /`.meta-img-txt-sm` (texto más chico). Esto es literalmente "más grande las de mediano, más chicas (para caber) las de largo" — mismo mecanismo de `:last-child:nth-child(odd)` para que el 7º ítem (impar) ocupe el ancho completo en vez de dejar un hueco.
- Sin verificar con Playwright en esta sesión — sintaxis validada con `node -e "new Function(...)"`, las 7 URLs de imagen y el dominio `amazon.com.mx` con `curl`, y `dashboard.html` abierto directo en el navegador para revisión visual manual.

## Fotos a pantalla completa, indicadores más chicos (2026-08-07, mismo día)

Pedido explícito: *"los indicadores de arriba de las fotos, hazlas más pequeñas y así las imágenes hazlo más grande, pero trata de abarcar toda la pantalla"*. Antes las tarjetas tenían una altura fija por `clamp()` (`64-110px` grande, `38-72px` chica) — ocupaban solo una porción del slide, con espacio libre sin usar arriba/abajo del bloque `#metasListas`.

- **`#metasListas{flex:1}`** — `.slide-inner` ya era `display:flex;flex-direction:column`; al darle `flex:1` al contenedor de las dos columnas de fotos, absorbe **todo** el alto libre que quede tras el `eyebrow`/título/`metasProgreso`, en vez de quedarse con solo el alto que pedía su contenido. `#metasListas > .tile{display:flex;flex-direction:column}` propaga lo mismo hacia adentro de cada tarjeta grande (Corto/mediano, Largo plazo), y `.meta-img-grid{flex:1}` hace lo mismo un nivel más adentro.
- **Los grids de fotos pasaron de alto fijo a `grid-template-rows:repeat(N,1fr)`** (3 filas para las 5 tarjetas de Corto/mediano, 4 filas para las 7 de Largo plazo) — ya no hay `height:clamp(...)` en `.meta-img-card`/`.meta-img-card-sm`, las tarjetas se estiran para llenar el alto que les toque según cuánto espacio haya disponible en cada pantalla. El número de filas está fijo en el CSS (3 y 4) porque coincide con el tamaño fijo de los arrays `cortoMediano` (5) y `largoExtras` (7) definidos en el código — si algún día cambia cuántos ítems tiene alguno de los dos arrays, hay que ajustar también el `repeat(N,1fr)` correspondiente a mano (mismo patrón de "sincronizar por código" que el resto del archivo).
- **Indicadores (ícono+nombre superpuesto) más chicos** — `.meta-img-txt` bajó de `clamp(12-14px)`/padding `8px 12px` a `clamp(10-12px)`/`6px 10px`; `.meta-img-txt-sm` de `clamp(10-12px)`/`5px 8px` a `clamp(8-10px)`/`4px 7px`.
- **Bug encontrado y corregido antes de dar el cambio por bueno**: la primera versión (fotos a `flex:1` sin más ajuste) hacía que el bloque de fotos llegara hasta el borde inferior real del slide, **por debajo del HUD fijo** (reloj/controles de reproducción, `position:fixed;bottom:0`) — se solapaban visualmente. Se detectó con Playwright (`getBoundingClientRect()` del HUD vs. de `#metasListas`, no alcanzaba con solo mirar `scrollHeight`, que en este layout de grid+flex anidado reportaba un valor engañoso) y con una captura de pantalla real, no solo con el código. Fix: `.theme-metas .slide-inner{padding-bottom:calc(var(--hud-h,90px) + 14px)}` — `--hud-h` es una variable CSS que `syncSlidesTop()` ya calculaba en JS con el alto real del HUD (antes solo se usaba dentro del `@media(max-width:1024px)` de la sección "Responsive"), reutilizada aquí para el layout de escritorio de este slide en particular.
- Verificado con Playwright en dos resoluciones de escritorio (1600×900 y 1366×768): `#metasListas` no se solapa con `.hud` en ninguna de las dos (`tilesBottom < hudTop`), capturas de pantalla revisadas visualmente confirmando que las 12 tarjetas (5+7) se ven completas, con buen contraste de texto sobre las fotos, sin overflow ni corte de contenido.

## Ajustes de contenido en Largo plazo — se quitó "Hyrox internacional" + 2 fotos reemplazadas (2026-08-07, mismo día)

Feedback directo tras ver las fotos grandes del cambio anterior: *"hyrox internacional no es una meta mía jaja quítala y la de Tailandia, no es una foto de box HD que me guste, busca otra mejor, al igual que la del Cupra"*.

- **"🏋️ Hyrox internacional" se eliminó de `largoExtras`** — no es una meta real de Adán (sí lo es "Primer Hyrox" en Corto/mediano, que no se tocó). `largoExtras` bajó de 7 a 6 ítems, así que **la columna de Largo plazo pasó de 4 a 3 filas** (`grid-template-rows` de `.meta-img-grid-sm` ajustado de `repeat(4,1fr)` a `repeat(3,1fr)`) — con 6 ítems pares ya no queda ninguno "impar/último" para estirar a ancho completo, las 6 tarjetas quedan del mismo tamaño en un grid 2×3 limpio.
- **Fotos elegidas viendo varios candidatos, no la primera que apareció** — a diferencia de la primera ronda (donde se tomó la 1ª URL razonable de cada búsqueda), esta vez se descargaron 5 candidatas de Muay Thai y 7 de Cupra Formentor a baja resolución y **se revisaron visualmente una por una** (herramienta de lectura de imágenes) antes de decidir, ya que el criterio ahora era explícitamente "que le guste a Adán", no solo "que exista".
  - **🥊 Pelear en Tailandia** → `photo-1575800605380-ca1d27744f2c` — patada alta en un gimnasio real de Muay Thai (piso de esterillas, saco de boxeo, ambiente auténtico), más dinámica y "de acción" que la anterior (un choque de guantes estático). Se descartaron: una foto de celebración post-pelea (no es "pelear"), una de boxeo occidental en blanco y negro (no es Muay Thai/Tailandia), y dos de clinch/nocaut en ring de estadio (buenas pero menos nítidas que la elegida).
  - **🚙 Cupra Formentor** → `photo-1655288808681-17caed2fc987` — ángulo frontal 3/4 bajo, el auto domina el encuadre con el logo Cupra bien visible, luz de otoño limpia, sin obstrucciones. Se descartaron: una toma trasera donde el auto se ve lejano y pequeño, dos tomas frente a una mansión histórica inglesa donde el edificio domina la composición más que el auto, y una con un árbol en primer plano tapando parte de la carrocería.
- Verificado de nuevo con Playwright: 6 `.meta-img-card-sm` en Largo plazo (antes 7), sin overlap con el HUD, captura de pantalla revisada visualmente.

## Productos ya comprados — 3 líneas de `LISTA_COMPRAS` reducidas a un solo producto (2026-08-07, mismo día)

Pedido explícito de Adán: CeraVe Limpiador Espumoso (verde), Darrow Doctar (anticaspa) y Eucerin Hyaluron-Filler + Epigenetic (día y noche) son productos que **ya compró y usa** — pidió dejar de mostrar alternativas de marca para esos 3, y Darrow Doctar además en la rutina diaria (Coach/Dashboard). Detalle completo de qué se cambió y por qué en [`../CuidadoPersonal/readme_cuidadopersonal.md`](../CuidadoPersonal/readme_cuidadopersonal.md) → "Productos ya comprados" y [`../Coach/readme_coach_v2.md`](../Coach/readme_coach_v2.md) → sección homónima.

- **`LISTA_COMPRAS.skincare`**: `'Limpiador — ...'` pasó a solo `'Limpiador — CeraVe Limpiador Espumoso (verde)'`; `'Hidratante AM — ...'` a solo `'Hidratante AM — Eucerin Hyaluron-Filler + Epigenetic Día SPF15'`; `'Hidratante PM — ...'` a solo `'Hidratante PM — Eucerin Hyaluron-Filler + Epigenetic Noche'`. Exfoliante, Sérum AM, Protector solar, Tratamiento PM y Mascarilla semanal **no se tocaron** — Adán no mencionó esas.
- **`LISTA_COMPRAS.cabello`**: `'Champú — ...'` (4 alternativas) pasó a solo `'Champú — Darrow Doctar (alcatrão/coal tar, anticaspa)'`.
- **`lcAmazonQuery()` (ver sección "El nombre del producto abre Amazon" arriba) sigue funcionando igual** — como las 3 líneas nuevas ya no tienen alternativas separadas por `" o "`, la función simplemente busca el texto completo después del `" — "`; verificado a mano que ninguno de los 3 nombres contiene la subcadena `" o "` con espacios alrededor, así que no se corta mal.
- `RUTINA_TASKS` también cambió (Darrow Doctar reemplaza a Vichy Dercos en Lun/Jue/Sáb) — ver detalle en `readme_coach_v2.md`, replicado byte-idéntico aquí.
- Verificado con Playwright: las pestañas Skincare y Cabello de Lista de Compras muestran las 3 líneas nuevas con su link `↗` a Amazon generando la búsqueda correcta, cero errores de consola.

## Títulos con tipografía serif elegante + orden de slides invertido + "Siguiente" se volvió "Importante este mes" (2026-08-07)

Tres pedidos en un mismo mensaje.

### 1) Tipografía de `.slide-title` — nueva fuente + fix de un bug real de emoji invisible

Pedido: *"este título 🎯 Corto, mediano y largo plazo ni se aprecia el ícono y el tipo de letra para todos los títulos del dashboard no me gusta, dame algo más elegante"*.

- **El emoji invisible era un bug de CSS, no de diseño**: `.slide-title` pinta su texto con `background:linear-gradient(...);-webkit-background-clip:text;-webkit-text-fill-color:transparent` (efecto de texto degradado). Esa propiedad se hereda a los hijos — el emoji, que no participa del degradado, se queda con `color` literalmente transparente y casi desaparece. Fix: cada emoji ahora va envuelto en `<span class="ico">`, con `.slide-title .ico{-webkit-text-fill-color:initial;color:initial}` para sacarlo del clip de texto y que se vea con sus colores nativos.
- **Nueva fuente `Fraunces`** (serif, Google Fonts, agregada al `@import` junto a Inter/Space Grotesk ya existentes) vía `--font-title`, aplicada solo a `.slide-title` (peso 600, antes Inter 900) — el resto del dashboard (`.eyebrow`, body, números) se queda en Inter/Space Grotesk a propósito: un kicker sans-serif uppercase + un headline serif es un contraste tipográfico editorial clásico, más elegante que cambiar toda la tipografía del archivo.
- Se actualizaron los 3 títulos estáticos con emoji (Habilidades 🧠, Mis Metas 🎯, Lista de Compras 🛒) para envolver el emoji en `<span class="ico">`. Los títulos generados por JS (`diaFecha`, `coachPhaseTitle`) no tenían emoji, así que no necesitaron cambio en el HTML — heredan la fuente nueva automáticamente.

### 2) Orden de slides invertido — Mi Día pasó a ser la primera parada física del carrusel

Pedido: *"lo de JARVIS semana completa lo quiero en número 2 y el número 1 de slide quiero lo de mi rutina, inviértelo, después en tercera lo de fase 0 y después lo de mis metas"*.

- **Nuevo orden (`data-i` 0→7)**: Mi Día, Hero·JARVIS, Coach·Plan Maestro (Fase 0), Mis Metas, Habilidades, Lista de Compras, Alemán, Entrevista. Antes: Hero, Mi Día, Coach, Habilidades, Mis Metas, Lista, Alemán, Entrevista — Coach/Lista/Alemán/Entrevista no se movieron (Coach ya estaba en la posición 3, y a Adán no le importó el resto); Mis Metas subió del puesto 5 al 4 y Habilidades bajó del 4 al 5 para hacerle espacio.
- **Los `<section>` se reordenaron físicamente en el HTML**, no solo el atributo `data-i` — mismo criterio que la primera vez que se hizo este tipo de cambio (ver "Hero pasó a ser el slide 0" más arriba): el orden de lectura del archivo debe coincidir con el orden real de navegación, para no confundir a quien edite el HTML después.
- **`RENDERS` y `SLIDE_MENU_META` reordenados en el mismo orden** — el motor de slides indexa por posición en estos arrays, deben coincidir 1:1 con los `data-i`.
- **El override especial para abrir en Mi Día ya no hace falta**: como Mi Día ahora ES `data-i=0`, `showSlide(...)` y los defaults de `lastSlide` en `loadSettings()`/`saveSettings()` volvieron de `1` a `0` — el comportamiento (abrir en Mi Día) es el mismo, pero ahora es el default natural del motor, no una excepción.
- **Bug real encontrado y corregido antes de dar el cambio por bueno**: `renderNavMenu()` arma la "línea de estado en vivo" de cada ítem del menú `☰` con un array `stats` **indexado por posición**, hardcodeado en el orden viejo — al mover `data-i`, `SLIDE_MENU_META` (los nombres) quedó en el orden nuevo pero `stats` (las descripciones) se quedó en el orden viejo, y el menú mostraba cada nombre con la descripción de OTRO slide (ej. "Mi Día" mostrando "Tu semana completa", que es la frase de Hero). Se encontró abriendo el menú con Playwright y leyendo el texto real renderizado, no revisando el código a simple vista. Fix: reordenar el array `stats` para que coincida semánticamente con el nuevo orden de `SLIDE_MENU_META`. Se revisó también `buildDots()` (genera los puntos del carrusel) por si tenía el mismo patrón de riesgo — no lo tiene, es genérico por índice sin nombres hardcodeados.

### 3) El tile "🔜 Siguiente" de Mi Día se convirtió en "🗓️ Importante este mes"

Pedido: *"en la sección de rutina, lo de siguiente en ese recuadro pon cosas importantes del mes, por ejemplo en agosto debería ir al dentista y agendar cita para mi papá en la embajada USA, en sep debería ir al doctor para mi gastritis... pero debe ser por mes y que aún así pueda ver los siguientes meses en sub tab"*.

- **Investigado antes de escribir nada**: Adán dijo "toda esa info que ya sabes de mis otros dashboards" — se revisó a fondo `CuidadoPersonal/cuidadopersonal.html` (módulo Dentista: sí calcula una "próxima cita" pero sin ninguna fecha real capturada, es solo el mecanismo) y se buscó "embajada"/"USA"/"papá"/"gastritis"/"doctor" en **todo** el proyecto — cero resultados relacionados. Esta información no existía en ningún archivo; es nueva, dada por primera vez en este mensaje. Se le aclaró a Adán en la respuesta de esa sesión para que sepa que debe seguir dándola él, no que el Dashboard la "descubrió sola".
- **`EVENTOS_MES`** — objeto nuevo, mismo patrón que `LISTA_COMPRAS`/`GYM_RUTINA_DEFAULT` (texto plano a mano, sin ningún cálculo ni derivación de otros módulos): claves `'YYYY-MM'`, valor `{ico,txt}[]`. Sembrado con los 2 únicos eventos reales que dio Adán: agosto (dentista + cita de su papá en la embajada de USA) y septiembre (doctor por gastritis). **No se actualiza sola** — si Adán menciona un pendiente nuevo en cualquier mes, hay que agregarlo aquí a mano.
- **`mesesVisibles(n=6)`** genera los próximos 6 meses desde hoy (no hardcodeados por nombre, calculados con `Date` para que sigan siendo correctos el año que entra), con label corto (`"Sep"`, y `"Ene '27"` cuando cruza de año).
- **`renderEventosMes()`** pinta las sub-tabs (`.mes-tab`, mismo patrón visual que `.lc-tab` de Lista de Compras pero más chico) — el mes activo resaltado, y un punto pequeño (`.mes-tab.has-items::after`) en los meses que sí tienen algo registrado, para poder ver de un vistazo cuáles vale la pena revisar sin tener que hacer clic en cada uno. `verMesEventos(key)` cambia `mesSel` (variable de módulo, no persiste en `localStorage` — se resetea al mes actual cada vez que se recarga la página) y vuelve a pintar.
- **Se eliminó `renderSiguienteList()`** (la función que mostraba las próximas tareas del día en ese mismo tile, agregada en una sesión anterior) — Adán decidió que ese espacio vale más para esto; la lista completa de tareas del día se sigue viendo más abajo en la timeline (`#diaTimeline`), así que no se perdió información, solo el atajo visual rápido. `tickClock()` ya no necesita tocar este tile cada segundo (los eventos del mes no cambian con el reloj), se quitó esa parte del intervalo. CSS muerto que dependía solo de esa función (`.ds-row-next`, `.ds-in`) se eliminó; `.ds-row`/`.ds-hora`/`.ds-txt`/`.ds-empty` se reusaron tal cual para las filas de eventos.
- Verificado con Playwright: agosto muestra los 2 pendientes reales, septiembre el suyo, un mes sin datos (octubre) muestra "Sin pendientes registrados este mes", las pestañas con punto son exactamente Ago/Sep (las únicas con datos), cero errores de consola.

## Rediseño grande — navegación, habilidades, rutina, comida, compras y semana completa (2026-08-07)

Sesión con muchos pedidos encadenados en 2 mensajes. Todo verificado con Playwright (capturas reales + checks de DOM), no solo revisando el código.

### 1) HUD dividido en 2 columnas — navegación rápida (izquierda) + controles (derecha)

Pedido: *"del lado izquierdo quiero botones que me lleven a las diferentes secciones del dashboard, para más rápido, y del lado derecho todas las opciones que tienes en el dashboard en la parte inferior"*.

- **`.hud` pasó de `flex-direction:column` (todo centrado) a `justify-content:space-between`** con 2 hijos: `#hudNav` (nuevo, izquierda) y `.hud-right` (el bloque de siempre — reloj, barra de progreso, `.hud-row` con menú/prev/dots/next/play/fullscreen/settings/help/tema — sin cambios internos, solo reubicado).
- **`buildHudNav()`/`paintHudNav()`** (junto a `buildDots()`/`paintDots()` ya existentes) — un botón-ícono `.hud-nav-btn` por pantalla, generado desde `SLIDE_MENU_META` (mismos íconos/nombres que el menú ☰, sin duplicar la lista), con salto directo (`goTo(i)`) sin abrir ningún panel. El activo se resalta igual que el dot activo (gradiente verde-púrpura).
- **Responsive**: en `≤1024px` (tablet/móvil, ver sección "Responsive" más arriba) el HUD vuelve a apilarse en columna centrada — la fila L/R de escritorio no cabría con 8+9 botones en una pantalla angosta.
- **Bug de paso encontrado y corregido**: `toggleRemember()` seguía diciendo en su toast *"Siempre vas a abrir en Hero"* — desactualizado desde que Mi Día se volvió la pantalla principal (2026-08-02). Corregido a "Mi Día".

### 2) Radar de Habilidades — link a Coach + ponderación visible + valor de Datos + OVR fuera + radar expandido

Cuatro pedidos relacionados, mismo slide.

- **Cada tarjeta de habilidad débil (`#skillPriority`) ganó un link al pie**: `✏️ Ajustar <Skill> en Coach →`, apunta a `../Coach/Coach_v2.html?skill=<id>#aprendizaje`. En `Coach_v2.html`, el `DOMContentLoaded` del IIFE del radar ahora lee `?skill=` de la URL (`new URLSearchParams(location.search)`) y llama `goToSkillDetail(id)` automáticamente (con 200ms de margen para que `buildSliders()` termine) — abre directo el panel "Cómo mejorar" de esa habilidad y hace scroll, sin que Adán tenga que buscarla entre las 12.
- **Ponderación (`w`, el peso de cada habilidad en el cálculo del OVR) ahora es visible como número**, no solo "se ve visualmente" en el tamaño del radar: nueva línea `Ponderación en el OVR: ×${s.w}` en cada tarjeta del Dashboard, y en Coach junto al nombre de cada slider (`· ponderación ×${s.w}`, en `--mono`).
- **`SK.datos.val` pasó de 15 a 55** (en `Coach_v2.html` y su copia en `dashboard.html`) — Adán: *"quiero modificar mi habilidad de datos, porque eso sí lo tengo mejor... ponle algo intermedio, no sé a cuánto equivale"*. 55 es el piso exacto del nivel "MEDIO" en la escala de `getLv()` (0-39 Principiante, 40-54 Básico, 55-69 Medio, 70-79 Bueno, 80-89 Avanzado, 90-100 Élite) — la lectura más literal de "intermedio" dentro de la escala ya definida, sin inventar una nueva convención. Efecto verificado: como ahora Datos (55) ya no es de las 4 más bajas entre las 5 de `APRENDIZAJE`, dejó de aparecer en "Habilidades a mejorar" — el sistema ya no la trata como debilidad, que es justo lo que se pidió.
- **Se quitó el tile "OVR general" por completo** (`#skillOvr`/`#skillOvrLabel`, y las 3 líneas de `renderSkills()` que lo llenaban) y **el radar (`#chSkills`) pasó de `grid 1fr 1fr` a ocupar todo el ancho** de una nueva `.tile.chart-wrap-lg` (`height:clamp(320px,54vh,560px)`). Para que el gráfico en sí no se distorsione al estirarse (un radar muy ancho y bajo se ve mal), el `<canvas>` vive dentro de un `.chart-wrap` interno con `max-width:640px;margin:0 auto` — el fondo/tarjeta sí ocupa el ancho completo de la fila, el gráfico se mantiene proporcionado y centrado dentro.

### 3) Botón Finanzas de la barra superior — ya no muestra el monto de deuda

Pedido: *"en el botón de finanzas... no me pongas lo que debo de dinero"*. La píldora mostraba `money(patrimonioNeto())` — con Adán en patrimonio neto negativo, ese número se leía como "lo que debes". Se quitó el `stat` de esa píldora (`stat:''`); las demás píldoras (Coach, Salud, etc.) no se tocaron.

### 4) Timeline de Mi Día — más alta, categorías más chicas, título vs. explicación diferenciados

- `#diaTimeline` de `max-height:40vh` a `52vh`.
- `.rt2-cat` (chip "SALUD"/"DESCANSO"/etc.) de `font-size:10px` a `7px`, padding reducido — "muchísimo más pequeño" tal cual se pidió.
- `.rt2-txt` (título del bloque) ahora **siempre** `font-weight:700` (antes solo en negritas cuando el bloque estaba activo); `.rt2-sub-item` (subtareas/explicación) pasó a **itálica**, `11.5px` — la diferencia título/explicación ahora es tipográfica y no solo de tamaño.

### 5) Hero → "🍽️ Ideas para hoy" — subtabs Desayuno/Cena, solo ingredientes

Pedido explícito (tras aclarar que "ideas para hoy" vive en el Hero, no en `comida.html`): mismo estilo de sub-pestañas que Lista de Compras, mostrando solo ingredientes, sin macros ni pasos.

- **`RECETAS_MINI` ganó el campo `ing` (array de strings "Ingrediente · cantidad") en sus 20 recetas** — copiado literal de `CuidadoPersonal/comida.html → RECETAS` (que sí tenía ingredientes; `RECETAS_MINI` antes solo traía nombre/tiempo/cal/prot). Es la **10ª estructura duplicada** del tipo ya documentado en "Datos duplicados" — si se edita una receta en `comida.html`, replicar aquí a mano.
- **Nueva función `renderHeroNutri()`** (separada de `renderHero()`, para poder re-renderizar solo este panel al cambiar de pestaña) con 2 `.mes-tab` (🌅 Desayuno / 🌙 Cena, mismo componente visual que "Importante este mes") — bajo la pestaña activa: nombre de la receta + su lista de ingredientes en filas `.ds-row`, sin calorías/proteína/tiempo. `verNutriTab(tab)` cambia `nutriTabSel` y vuelve a pintar.

### 6) Lista de Compras — cada producto abre Amazon Y Mercado Libre (2 links, no 1)

Pedido (mensaje posterior): *"cuando dé click en los links... también cuando dé click ábremelo en mercado libre, quiero ver en ambas páginas"*. Antes el nombre completo del producto era un solo `<a>` a Amazon.

- **`lcRenderItems()` ahora pinta 2 botones pequeños separados** (`.lc-shop-link`, clase `.lc-item-shop` con `flex-basis:100%` para que siempre queden en su propia línea bajo el texto): `Amazon ↗` y `Mercado Libre ↗`, cada uno con su propia URL (`lcAmazonUrl(q)` / `lcMercadoLibreUrl(q)`, mismo término de búsqueda de `lcAmazonQuery()` para ambos). El nombre del producto volvió a ser un `<label for="id">` normal (clickeable para tachar, como antes de que existiera el link de Amazon) — ya no compite con ningún link de compra.
- **Patrón de URL de Mercado Libre**: `https://listado.mercadolibre.com.mx/<query-con-guiones-en-vez-de-espacios>` (`encodeURIComponent` sobre el resultado para escapar paréntesis/comas/barras). Verificado con `curl -A "<user-agent de navegador>"` — sin ese header, Mercado Libre responde `403` a curl (protección anti-bot), pero `200` normal desde un navegador real.

### 7) Hero → tira de 7 días — fotos reales por tipo de ejercicio (ya no emoji) + miércoles pasó a Natación

Dos pedidos relacionados: *"ponme imágenes súper HD del mismo estilo para cada día... agrega lo de nadar, también quiero nadar"*. Aclarado con Adán antes de tocar la rutina real: **natación reemplaza el miércoles de "Espalda + Hombros + Cardio"** (no se agrega como día extra, no reemplaza el descanso del domingo).

- **Cambio de rutina real, en la fuente de verdad** (`CuidadoPersonal/ejercicio.html → S.rutina[3]`, antes 'Espalda + Hombros + Cardio' tipo `halar`) → `'Natación'`, tipo `cardio`, un solo "ejercicio" de 45 min (nuevo `e057` en `EJ_DB`, categoría Cardio — no existía ningún ejercicio de natación en el catálogo). Replicado en las 2 estructuras duplicadas ya documentadas: `GYM_RUTINA_DEFAULT` (Dashboard) y el bloque `e3` de `RUTINA_TASKS` (Coach + Dashboard, ya no lleva subtareas de series/reps — es una sola actividad continua). Detalle completo en `readme_ejercicio.md` y `readme_coach_v2.md`.
- **`TIPO_FOTO`** (nuevo, junto a `GYM_RUTINA_DEFAULT`) — una foto real por `tipo` (`brazos`/`piernas`/`empuje`/`cardio`/`descanso`), buscadas en Unsplash y verificadas con `curl` antes de usarlas; `cardio` reusa la misma foto de Wikimedia Commons ya usada en `ejercicio.html → Deportes → Natación` (mismo estilo/fuente, no una foto nueva sin relación). El día de descanso usa una foto de caminata ligera al aire libre, coherente con "descanso activo".
- **`.ws-gym-ico` (el emoji de tipo) se reemplazó por `.ws-gym-photo`** — `background-image` con la foto de `TIPO_FOTO[tipo]`, degradado oscuro (`::after`) para legibilidad, más un `.ws-gym-badge` chico en la esquina (el emoji de **estado** ✅/⏳/😴/🏋️ se conserva ahí, no se perdió esa información — solo el emoji de *tipo* se volvió foto).
- Verificado con Playwright: 8 botones de navegación (`hud-nav-btn`) presentes, píldora de Finanzas sin `.qa-stat`, `#skillOvr` ya no existe en el DOM, `.chart-wrap-lg` presente, capturas de las 4 pantallas revisadas visualmente (Mi Día, Hero, Habilidades, Lista de Compras), cero errores de consola en todo el recorrido.

## Propósito del proyecto — nota añadida a petición explícita (2026-08-07)

Adán pidió explícitamente que quedara documentado "en algún lugar de este proyecto": *"tú existes para hacer la mejor versión de mí, para eso es el dashboard... mi meta es ser millonario"*. Se agregó como sección nueva en [`../README.md`](../README.md) (el mapa maestro, no este archivo específico, porque aplica a todo el ecosistema, no solo al Dashboard) y se guardó como memoria persistente (`feedback_proposito_dashboard.md`) para que futuras sesiones la apliquen sin que Adán tenga que repetirla.

## HUD: de 1 franja horizontal abajo a 2 barras verticales pegadas a los bordes (2026-08-07)

Adán marcó con rectángulos rojos sobre una captura de pantalla dónde quería cada mitad del HUD del cambio anterior (mismo día): *"los botones que pusiste abajo deben ir del lado izquierdo... del lado derecho debe acomodarse verticalmente para que quede bien"* — no bastaba con dividir la franja horizontal en 2 mitades L/R (lo ya hecho), había que sacarlas de abajo y pegarlas a los bordes izquierdo/derecho como columnas.

- **`.hud-side`** (nueva clase base, reemplaza `.hud`/`.hud-row`/`.hud-nav`/`.hud-right`) — `position:fixed;top:50%;transform:translateY(-50%)`, `flex-direction:column`, con su propio fondo/blur/borde (antes ese estilo de "píldora" solo lo tenía `.hud-row`, ahora lo tienen las 2 barras completas). `.hud-side-left` (`left:16px`, contenedor de `#hudNav`) y `.hud-side-right` (`right:16px`, reloj + barra de progreso + los 9 controles, todos apilados verticalmente, ya no en fila).
- **Elementos que eran horizontales se giraron 90°**: `.dots` pasó a `flex-direction:column` y el punto activo ahora se alarga en alto (`height:22px`) en vez de a lo ancho; `.hud-progress` bajó de 180px de ancho a 44px (ya no necesita ser una barra larga, vive en una columna angosta); el reloj + "sync hace Xs" pasaron de estar en la misma línea a 2 líneas (`<br>` entre ambos).
- **`--hud-h` se eliminó por completo** (variable CSS que `syncSlidesTop()` calculaba con la altura del `.hud` horizontal viejo, usada para que el contenido no quedara tapado por abajo — `.theme-metas .slide-inner` y el `padding-bottom` del modo responsive). Ya no aplica: el HUD dejó de ocupar espacio en la parte inferior, así que no hay nada que "esquivar" ahí. El único uso que sobrevive (el `padding-bottom` del modo táctil `≤1024px`, ver abajo) pasó a un valor fijo (`170px`) en vez de depender de esa variable.
- **Responsive (`≤1024px`, iPad/iPhone)**: 2 barras verticales pegadas a los bordes no caben en una pantalla táctil angosta sin robarle ancho al contenido — en ese breakpoint `.hud-side` vuelve a bajar al centro-abajo, en fila horizontal (`flex-direction:row;flex-wrap:wrap`), una encima de la otra (`.hud-side-left` en `bottom:76px`, `.hud-side-right` en `bottom:12px`), recreando el HUD horizontal original solo para esas pantallas. `.dots`/`.dot-btn.on` también vuelven a su orientación horizontal ahí.
- Verificado con Playwright en 3 anchos: 1600px (barras verticales en los bordes, tal como se pidió), apertura del menú ☰ (sigue funcionando desde la barra derecha), y 820px/iPad (fallback horizontal abajo, apilado en 2 filas) — cero errores de consola en los 3.

## Bug real: el miércoles de gym no se actualizaba a Natación en un navegador ya usado (2026-08-07, mismo día)

Adán reportó: *"el miércoles en el dashboard no era de natación"* — el cambio de código del turno anterior (`S.rutina[3]` en `ejercicio.html`) no se reflejaba.

- **Causa raíz, confirmada simulando el escenario con Playwright** (no solo leyendo el código): `loadAll()` prioriza `D.gym.rutina` (lo que Adán ya tenga guardado en `mirutina_v1` en su navegador) sobre `GYM_RUTINA_DEFAULT` — si Adán ya había abierto `ejercicio.html` antes de este cambio, su miércoles real seguía guardado como "Espalda + Hombros + Cardio", y el código nuevo nunca se aplicaba solo (mismo problema, mismo mecanismo, que ya había pasado antes con `GYM_RUTINA_DEFAULT` y con el saldo de Banamex en Finanzas — ver "Los números de Finanzas se reflejan solos..." más arriba).
- **Bug adicional encontrado de paso**: con el dato viejo (`tipo:'halar'`) en el navegador, la foto del día caía al fallback `TIPO_FOTO.descanso` (una foto de caminata) — ni siquiera mostraba algo relacionado a espalda, mostraba descanso. Confirmado con Playwright antes de escribir el fix, comparando el `background-image` real renderizado.
- **Fix — mismo patrón que `fixBanamexIfNeeded()`**: nueva `fixMiercolesNatacionIfNeeded()`, corre una sola vez (flag `mirutina_v1_miercoles_natacion`), corrige `mirutina_v1.rutina[3]` directo con `rawGet`/`rawSet` **solo si sigue siendo exactamente el default viejo** (`nombre==='Espalda + Hombros + Cardio'`) — si Adán ya personalizó el miércoles a otra cosa, no se toca, es una decisión suya. Se llama junto a `fixBanamexIfNeeded()` al arrancar, antes de `loadAll()`.
- **La misma migración se replicó en `CuidadoPersonal/ejercicio.html`** (el dueño real de `mirutina_v1`) — necesario porque `init()` ahí hace `load()` seguido de un `save()` incondicional; sin la migración, cada vez que Adán abriera esa app se re-guardaría el miércoles viejo tal cual, perpetuando el problema aunque el Dashboard ya lo hubiera corregido. Detalle completo en `readme_ejercicio.md`.
- Verificado con Playwright simulando 2 escenarios de `localStorage` reales: (1) miércoles con el default viejo exacto → se corrige a Natación con la foto correcta; (2) miércoles ya personalizado a otra cosa ("Yoga personalizado") → se queda intacto, la migración no lo toca.

## Hero interactivo, foto de Tailandia y radar más angosto (2026-08-07, mismo día)

### 1) Clic en cualquier día de "tu semana completa" muestra sus ejercicios

Pedido: *"en el dashboard también dame la opción de dar clic a los demás días de tu semana completa y poder ver los ejercicios de los otros días"* — mismo espíritu que el cambio hecho en `ejercicio.html` el mismo día (ver `readme_ejercicio.md`), aplicado aquí al panel de gym del slide Hero.

- **`renderHeroGymPanel()`** — extraída de `renderHero()` como función propia, reusable sin tener que re-renderizar todo el slide. Antes el panel `#heroGymPanel` solo mostraba el día actual (`dowHoy`); ahora usa `heroGymDiaSel` (variable de módulo, `null` = hoy) para decidir qué día mostrar.
- **`verHeroGymDia(dow)`** (nueva, llamada desde `onclick` en cada `.ws-day` de `#heroWeekStrip`) — si se hace clic en el mismo día que ya está activo, vuelve a `null` (hoy); si no, cambia a ese día. Repinta las clases `.sel` de la tira (sin regenerar todo el HTML) y llama a `renderHeroGymPanel()`.
- El título del panel cambia según el contexto: `✅ Hoy hiciste`/`🏋️ Hoy toca` cuando `heroGymDiaSel` es hoy (o `null`), `🏋️ <Día completo>` (ej. "🏋️ Domingo") cuando es otro día — usa el nuevo array `DIAS_LARGO` (junto a `DIAS_CORTOS` ya existente).
- **`.ws-day` ganó `cursor:pointer` y una clase `.sel`** (borde verde) para el día actualmente mostrado en el panel, distinta de `.today` (borde de acento del tema, para el día real de hoy) — ambas pueden coincidir visualmente si el día activo es hoy.
- Verificado con Playwright: clic en un día que no es hoy (domingo) cambia el panel a "🏋️ DOMINGO: DESCANSO ACTIVO" con el texto correcto ("Ese día toca descanso...").

### 2) Foto de "Pelear en Tailandia" — reemplazada por una más profesional

Pedido: *"la foto de pelea en Tailandia pon otra foto de boxeo mucho más profesional"* — la anterior (patada en un gimnasio local de Muay Thai) no convenció. Se descargaron 8 candidatas nuevas y se revisaron visualmente antes de elegir (mismo proceso que las rondas anteriores de fotos) — se eligió `photo-1564097147829-44f8c74a8549`: vista de una arena de boxeo real con ring iluminado, cuerdas, y público — transmite "evento profesional" de forma inequívoca, a diferencia de las alternativas descartadas (entrenamiento con casco/headgear, blanco y negro artístico sin mostrar la pelea, gimnasio de barrio).

### 3) Radar de Habilidades — el recuadro se angostó al tamaño real del gráfico

Pedido: *"el radar está bien pero reduce el recuadro a lo ancho y además adecúalo al tamaño que tiene el radar... recorre todo lo demás para que se vea mejor"* — desde el cambio anterior (quitar el tile de OVR y expandir el radar a todo el ancho, ver sección "Radar de Habilidades" más arriba), el `.tile.chart-wrap-lg` ocupaba el 100% del ancho de la fila aunque el `<canvas>` interno estuviera limitado a 640px centrado — quedaba mucho fondo/borde de tile vacío a los lados del círculo.

- **`.chart-wrap-lg` ganó `max-width:680px;margin:0 auto`** — el tile completo (fondo, borde, sombra) ahora mide lo que necesita el radar + sus 12 etiquetas alrededor, no la fila completa del slide. El div interno `.chart-wrap` ya no necesita su propio `max-width` (lo hereda del tile ya angosto), se simplificó a `width:100%;height:100%`.
- "Recorre todo lo demás" no requirió cambios adicionales — el título "Habilidades a mejorar" y el `.grid.g4` de las 4 tarjetas de abajo ya eran independientes del ancho del tile del radar (nunca estuvieron atados a su `max-width`), así que quedaron a ancho completo automáticamente sin tocarlos.
- Verificado con Playwright: captura visual del slide completo confirma el radar centrado y proporcionado, sin franjas de fondo vacías a los lados.

Verificado con Playwright en conjunto: sintaxis limpia en `dashboard.html` y `ejercicio.html`, cero errores de consola en los 3 flujos (Mi Rutina filtrada, Hero con clic en otro día, slide de Habilidades).

## Fix: "Meditación (10 min)" en realidad mostraba 55 min hasta la siguiente tarea (2026-08-07)

Adán reportó: *"aquí dices 10 min, pero dura 55, deben ser 10 min, Meditación — respiración box (10 min)"*. La tarea `wd20` (23:00, "🧘 Meditación — respiración box (10 min)") era seguida directo por `wd21` ("📵 Apagar pantallas. Dormir", 23:55) — un hueco de 55 minutos que contradecía la etiqueta "(10 min)" del texto, aunque ese colchón de tiempo libre antes de dormir sí era intencional (documentado en una sesión anterior).

- **Nueva tarea `wd20e`** (23:10, `cat:'descanso'`, "Tiempo libre / relajación antes de dormir") insertada entre `wd20` y `wd21` en `RUTINA_TASKS` — ahora la meditación efectivamente dura 10 minutos hasta la siguiente tarea de la línea de tiempo, y el colchón de 55 min hacia dormir (23:55) sigue existiendo, solo que ahora está nombrado y visible en vez de estar "escondido" dentro del bloque de meditación.
- **Replicada igual en `Coach/Coach_v2.html`** (misma copia de `RUTINA_TASKS`, mismo patrón de sincronización manual que el resto de esta tabla — ver "Datos duplicados" arriba).
- No se tocó la hora real de dormir (23:55) ni ninguna otra tarea — es puramente una corrección de la etiqueta de duración mostrada.
- Verificado: 62 tareas de nivel superior en ambos archivos, estructuralmente idénticas (mismo script de verificación en Node usado para el resto de `RUTINA_TASKS`).

## Descripciones de ejercicio sin jerga de gym — `EJ_LOOKUP` (2026-08-07)

Adán reportó: *"ahí en dashboard de ejercicio la descripción del ejercicio ni se entiende"* — confirmó tras preguntarle que el problema era la jerga técnica ("omóplatos", "femoral", "aislamiento", "supina", "lumbar", "cadencia").

- Los 30 `cue` de `EJ_LOOKUP` (el subconjunto de ejercicios que usa el panel de gym del Hero, `renderHeroGymPanel()`) se reescribieron en español simple, mismo criterio y mismo texto que la reescritura equivalente de los 57 `cue` de `EJ_DB` en `CuidadoPersonal/ejercicio.html` (ver `readme_ejercicio.md` para el detalle completo y ejemplos de sustitución) — se mantiene la fuente única de verdad del lenguaje simplificado entre ambos archivos.
- Verificado: cero ocurrencias de "omóplat", "supina", "cadencia" en `dashboard.html`; "femoral" solo sobrevive como nombre propio de ejercicio ("Curl de Femoral Tumbado", "Piernas B — Glúteo + Femoral"), nunca dentro de una instrucción.

## `FRASES_MOTIVACION` reescritas de cero — más claras y más (2026-08-07)

Adán reportó: *"en mi semana completa, los mensajes que me dan ni siquiera me motivan, ni les entiendo a veces, revisa eso y debes darme mejores y muchos"*. Las 70 frases anteriores (una se muestra por día en el Hero, rotando por `diaDelAnio() % length`) tenían un patrón recurrente: metáforas dobles que exigían dos pasos de razonamiento ("la disciplina del gym es el mismo músculo que el negocio", "el testing en HIL/SIL te enseñó a confiar solo en lo que se probó — aplica lo mismo a tus excusas") — ingeniosas pero indirectas, justo el tipo de frase que "no se entiende" a primera lectura.

- **Las 87 frases nuevas** (antes 70) dicen la idea directamente, en una o dos oraciones simples, sin exigir decodificar una analogía — se mantiene la personalización real (Banamex/BBVA, Fase 0-3, Didi, negocio de su papá, GBM, Hyrox, ajedrez, alemán, Cupra/BYD/depa, ALTEN/Bosch/Continental) pero el mensaje se entiende en una sola lectura.
- Organizadas en 10 categorías temáticas (comentarios `//` en el array, no visibles en la app): disciplina general, gym/cuerpo, finanzas/deuda, negocio, carrera en ALTEN, aprendizaje (alemán/entrevista/lectura), papá/familia, sueño, metas específicas, cierre/visión de largo plazo — para que la rotación diaria no se sienta repetitiva ni concentrada en un solo tema.
- Verificado con Node: 87 frases, sintaxis limpia.

## "Mis Metas" — clic en cualquier meta abre su plan detallado, in-page (2026-08-07)

Pedido explícito: *"cuando dé clic a cada meta que tengo, ahí mismo en el dashboard abre como una subpágina, pero ahí mismo en dashboard, no crees otro html, y pon detalladamente cómo cumplir cada meta con pasos, info necesaria, cosas que hacer ya sabiendo todo el contexto de mi persona y pues también con una foto en hd de entrada, que se vea muy motivador"*.

- **`META_DETALLE`** (nuevo, constante a nivel de módulo, junto a `metaDebtInfo()`) — objeto con las 11 metas (5 de `cortoMediano` + 6 de `largoExtras`), cada una con `titulo`, `frase` (una línea motivadora de entrada) y `pasos` (4-6 pasos concretos). El contenido de cada plan está basado en contexto real ya existente en este mismo archivo — no se inventó nada nuevo: las Fases 0-3 del Plan Maestro (`PHASES`), el orden real de las deudas (fondo de emergencia → Banamex → BBVA → BYD → Cupra/depa), las Opciones de negocio (1-6, plantilla GBM/freelance/mentoría/CodeReview/negocio de su papá/Didi), su rutina de gym real (fuerza 2x/semana, natación miércoles, cardio sábado), su práctica diaria de alemán, y el fondo pausado de la Maestría ($53,740, retomar oct 2028).
- **Los 11 objetos de `cortoMediano`/`largoExtras` ganaron un campo `id`** (`ajedrez`, `hyrox`, `remoto`, `byd`, `cupra`, `empresa`, `depa`, `tailandia`, `hongkong`, `spacex`, `maestria`) — `imgListHtml()` ahora agrega `onclick="abrirMetaDetalle(id, img)"` a cada `.meta-img-card` (más `cursor:pointer` y un hover sutil de escala, nuevos en el CSS de `.meta-img-card`).
- **`abrirMetaDetalle(id,img)` / `cerrarMetaDetalle()`** (nuevas) — pintan el overlay `#metaDetailOverlay` (nuevo, vive a nivel de `<body>` junto a los demás paneles flotantes: menú, ajustes, ayuda) con la foto ya usada en la tarjeta (misma URL, sin duplicar ni pedir una versión nueva — a 800px de ancho ya se ve nítida en la tarjeta de detalle) como header grande, el título en la misma tipografía serif (`--font-title`, Fraunces) que el resto de los títulos del Dashboard, la frase de entrada, y los pasos numerados en tarjetas individuales. Al abrir se pausa la rotación automática de slides (`clearInterval(timer)`) para que no cambie de pantalla con el detalle abierto; al cerrar se reanuda (`restartTimer()`).
- Se cierra con el botón ✕, con clic fuera de la tarjeta (`onclick` en el overlay que compara `event.target===this`), o con **Escape** (interceptado antes que el resto de atajos de teclado, para no disparar `closeAllPanels()` en su lugar).
- Verificado con Playwright: las 11 tarjetas son clicables y las 11 tienen entrada completa en `META_DETALLE` (mínimo 3 pasos cada una); abrir/cerrar con botón X y con Escape funciona; probado en tema claro y oscuro (buen contraste en ambos — el card usa `var(--bar2)`, ya definido para los dos temas) y en viewport móvil (390×844, con scroll interno funcionando); cero errores de consola.

## "Ahora mismo" no mostraba las subtareas del bloque activo (2026-08-07)

Adán reportó: *"en dashboard en el ahora mismo ni se ven las subtask, debe mostrar todo"*. El tile "🟢 Ahora mismo" (slide Mi Día) solo pintaba `actual.hora+' — '+actual.txt` como texto plano en `#diaAhora` — si el bloque activo era una tarea agrupada (por ejemplo "🚿 Bañarte + lavar cabello", con sus 2-3 subtareas de qué producto usar y cómo), esas subtareas solo se veían más abajo, en la tarjeta correspondiente dentro de la línea de tiempo de `#diaTimeline` — fácil de no notar si esa tarjeta no era la primera visible.

- **Nuevo `<div id="diaAhoraSub">`** entre `#diaAhora` y el botón "✅ Marcar hecho" — `renderDia()` ahora también pinta ahí, con las mismas clases `.rt2-sub`/`.rt2-sub-item`/`.rt2-sub-done` que ya usaba la línea de tiempo, la lista completa de `leafItems(actual)` cuando el bloque activo tiene `subtareas`, tachando (✅) las que ya estén marcadas como hechas hoy. Queda vacío (sin espacio extra) si el bloque activo no tiene subtareas.
- No se tocó la línea de tiempo de abajo — sigue mostrando lo mismo, esto solo evita tener que bajar a buscarlo cuando ya está a la vista arriba.
- Verificado con Playwright fijando la hora del navegador a un lunes 07:05 (`page.clock.install`, bloque `wd02lav`): el tile "Ahora mismo" muestra las 3 subtareas de cuidado de cabello completas, cero errores de consola.

## Subtareas resaltadas — tarjeta propia + "producto" y "acción" en colores distintos (2026-08-07, mismo día)

Adán, tras ver el fix anterior: *"pero en todos en todos en modo oscuro o normal, debes resaltar la subtask de otro estilo, color y además los productos de otro color y la acción, esto se debe ver muy bien"*. Antes `.rt2-sub-item` era solo texto itálico gris, sin fondo ni separación — fácil de pasar por alto incluso ya visible.

- **`subtareasHtml(leaves,doneHoy)`** (nueva, junto a `leafItems()`) — función única que ahora usan tanto el tile "Ahora mismo" (`#diaAhoraSub`) como la línea de tiempo (`#diaTimeline`), para que las dos se vean idénticas y no haya que mantener el mismo HTML dos veces.
- **Cada subtarea es ahora su propia tarjetita**: fondo sutil, borde y un borde izquierdo de acento en `var(--cy)` — ya no es texto suelto flotando, se nota de un vistazo que hay una lista.
- **Producto vs. acción en colores distintos**: casi todas las subtareas de skincare/cabello/ejercicio siguen el patrón `"Producto o ítem — qué hacer con él"`. `subtareasHtml()` detecta el primer `" — "` del texto con una expresión regular y separa: la primera parte (`.rt2-sub-prod`, negritas, color `var(--cy)`) del producto/ítem, la segunda (`.rt2-sub-action`) en `var(--text2)` con la instrucción. Si el texto no trae ese patrón (p. ej. los pasos de respiración o del diario), se muestra completo en `.rt2-sub-txt` (negritas, color de texto normal) sin forzar una separación que no existe.
- **`--cy` y `--text2` ya estaban definidos para ambos temas** (`:root` y `:root[data-theme="light"]`, ver arriba de este archivo) — no hizo falta ninguna regla nueva por tema, los mismos colores ya tienen buen contraste en claro y oscuro.
- Verificado con Playwright en los dos temas (`data-theme` forzado a `'dark'` y `'light'`), leyendo el color computado real de `.rt2-sub-prod`/`.rt2-sub-action`: distintos entre sí y distintos entre temas (dark `#00e0c0`/`#9a9db3`, light `#047a6b`/`#5c5f70`), cero errores de consola.

## "Ideas para hoy" — de 1 receta fija por comida a 3 opciones que rotan cada día (2026-08-07, mismo día)

Adán reportó: *"en ideas para hoy en el segundo dashboard, solo me muestras una opción de desayuno y cena, esto debe variar cada día"*. El código ya rotaba por día (`diaDelAnio()%RECETAS_MINI.desayuno.length`, verificado con Playwright simulando 3 fechas distintas — sí cambiaba), pero en cualquier visita solo se veía **una** receta por comida, lo que se sentía fijo/pobre en variedad.

- **`pickN(arr,startIdx,n)`** (nueva) — toma una ventana de `n` elementos del arreglo empezando en `startIdx`, con wraparound (`(startIdx+i)%arr.length`). `renderHeroNutri()` ahora pide `pickN(RECETAS_MINI.desayuno, diaDelAnio(), 3)` y lo mismo para cena, en vez de un solo índice.
- La ventana de 3 se recorre 1 lugar cada día (mismo `diaDelAnio()` de siempre como punto de partida) — no son las mismas 3 fijas ni una selección aleatoria: cambia de forma predecible día a día y siempre hay al menos 1 receta nueva respecto al día anterior.
- **`.hp-meal-list`/`.hp-meal-card`** (nuevas clases CSS) — cada receta ahora es su propia tarjetita (nombre en negritas + ingredientes debajo), apiladas con scroll interno (`max-height` + `overflow-y:auto`) para no desbordar el tile si las 3 juntas no caben.
- Verificado con Playwright en 2 fechas consecutivas: 3 nombres de receta distintos cada vez, con solapamiento parcial esperado entre un día y el siguiente (la ventana se recorre 1, no se reemplaza entera); captura visual confirma las 3 tarjetas legibles con scroll.

## Recetas contraídas por default, radar reemplazado por barras y frases con tono de exigencia (2026-08-07, ronda siguiente)

Tres pedidos en un mismo mensaje, sobre partes ya tocadas hoy mismo (ver secciones anteriores).

### 1) "Ideas para hoy" — las 3 recetas se contraen, ingredientes solo al hacer clic

Pedido: *"contrae todas las recetas y cuando haga click a una ya muestrame los ingredientes"* — desde el cambio anterior (ver sección de arriba) las 3 tarjetas ya mostraban sus ingredientes completos siempre, lo que ocupaba espacio incluso para las 2 recetas que en ese momento no interesan.

- **`.hp-meal-card` ganó un header clicable (`.hp-meal-head`)** — nombre de la receta + un chevron `▾` que rota 180° cuando la tarjeta está abierta (`.hp-meal-card.open .hp-meal-chevron`). Los ingredientes (`.hp-meal-ing`) viven en `display:none` por default y solo se muestran (`display:flex`) cuando la tarjeta tiene la clase `.open`.
- **`nutriExpandido`** (nuevo `Set` a nivel de módulo, junto a `nutriTabSel`) guarda las claves `'<tab>|<nombre receta>'` actualmente abiertas — no persiste en `localStorage` a propósito, es solo estado de sesión de la pantalla (se colapsan todas de nuevo al recargar la página, igual que la pestaña Desayuno/Cena vuelve a su default). `toggleRecetaCard(key)` añade/quita del set y vuelve a pintar.
- Verificado con Playwright: las 3 tarjetas nacen contraídas (`ingredientes visibles = false` en las 3), clic en la primera muestra sus ingredientes sin afectar las otras 2, cero errores de consola.

### 2) `FRASES_MOTIVACION` — segunda reescritura del día, ahora con tono de exigencia

Pedido: *"el mensaje abajo de tu semana completa, las frases ni me gustan son muy x y deben invitarme a lograr mis metas pero con exigencia"* — la reescritura de la ronda anterior (ver sección "`FRASES_MOTIVACION` reescritas de cero" más arriba) ya había resuelto que se entendieran a la primera lectura, pero el tono seguía siendo de acompañamiento suave ("no necesitas...", "tu yo del futuro te lo agradece"); Adán pidió un tono más demandante, no solo más claro.

- **Las mismas 87 frases, mismas 10 categorías temáticas y mismos hechos reales** (Banamex/BBVA, Fase 0-3, Didi, negocio de su papá, GBM, Hyrox, ajedrez, alemán, Cupra/BYD/depa, ALTEN/Bosch/Continental) — solo cambió la redacción de cada una: ahora nombran la excusa concreta en segunda persona ("Deja de...", "No tienes excusa para...", "Exígete...") y cierran con una instrucción directa, en vez de una reflexión motivacional. Ejemplo del contraste: antes *"No necesitas sentir ganas. Solo necesitas seguir apareciendo, tengas ganas o no."* → ahora *"Las ganas no son un requisito. Preséntate igual, sientas lo que sientas."*
- No cambió el mecanismo de rotación (`diaDelAnio()%FRASES_MOTIVACION.length`, una frase por día) ni el HTML/CSS de `.hero-frase`.
- Verificado con Node (`grep -c` sobre el array): siguen siendo 87 frases, sintaxis limpia; con Playwright, `#heroFrase` renderiza una de las frases nuevas sin errores de consola.

### 3) Radar de Habilidades reemplazado por barras horizontales a todo el ancho — Chart.js eliminado del archivo

Pedido: *"en la pagina de radar de habilidades, en vez del radar mejor ponlo en barras y se muy detallado, asi abarcamos todo el ancho de la pagina y se ve mucho mejor"* — revierte la dirección de las 2 iteraciones de hoy sobre este mismo radar (expandirlo a todo el ancho, después angostarlo de vuelta a 680px, ver secciones "Radar de Habilidades" y "Hero interactivo..." más arriba): ya no se trata de ajustar el tamaño del círculo, sino de cambiar el tipo de gráfico.

- **`#chSkills` (el `<canvas>` del radar Chart.js) se eliminó del HTML**, junto con `.chart-wrap`/`.chart-wrap-lg` (CSS) y el bloque `new Chart(ctx,{type:'radar',...})` dentro de `renderSkills()` — reemplazado por un `<div id="skillBars" class="tile">` que `renderSkills()` llena con HTML/CSS puro (mismo patrón que el resto del Dashboard, sin depender de una librería de gráficos).
- **Chart.js era la única librería externa que usaba este archivo** (`<script src="cdn.jsdelivr.net/.../chart.js">`, verificado con grep antes de borrar — cero usos fuera del radar) — se quitó el `<script>` del `<head>` por completo. El Dashboard ya no depende de ningún CDN externo para renderizar.
- **`.skill-bars-grid`** — 2 columnas (6+6 filas) en escritorio para aprovechar todo el ancho de la fila tal como se pidió, 1 columna en `≤900px` (mismo breakpoint que `.g4`). Cada fila (`.skbar-row`) muestra, por habilidad: ícono + nombre, una etiqueta de nivel con color (`skLevel()`, ya existía para las tarjetas de prioridad — reusada, no duplicada), el valor numérico grande, una barra de progreso a todo el ancho de su columna (reusa `.pbar`/`.pfill`, el mismo componente visual que ya usan los pasos de deuda y Mis Metas) y una línea al pie con la ponderación en el OVR (`×${s.w}`) y el porcentaje — es el detalle completo que antes solo estaba en las 4 tarjetas de prioridad, ahora visible para las 12 habilidades a la vez.
- **Ordenadas de más débil a más fuerte** (`[...SK].sort((a,b)=>a.val-b.val)`, sin mutar el array original `SK` que usa el resto del archivo) — coherente con el subtítulo del slide ("En qué invertir tu tiempo"): lo primero que se ve es dónde más urge invertir.
- **Cabecera nueva con el OVR** (`calcOVR()`, ya existía, antes solo se usaba en el menú ☰) — "Nivel general (OVR): NN · promedio ponderado de tus 12 habilidades", visible ahora en esta pantalla y no solo en el menú de navegación.
- El eyebrow del slide pasó de "Coach · Radar de habilidades" a "Coach · Habilidades" — ya no es literalmente un radar.
- Verificado con Playwright: 12 `.skbar-row` renderizadas, anchos de barra correctos y ordenados ascendente (15%…85%), captura visual confirma que la fila ocupa todo el ancho de la pantalla (1600px) en 2 columnas legibles, cero errores de consola.

Verificado en conjunto: sintaxis de `dashboard.html` limpia (`node --check` sobre los `<script>` extraídos), las 3 pantallas revisadas con Playwright en el mismo recorrido, cero errores de consola.

### 4) Barras de Habilidades — más delgadas, mucho menos altura total

Pedido, tras ver el resultado del cambio anterior: *"lo de habilidades hazlo mas delgado todas las barras y el diseño que no abarque mucho verticalmente"*.

- **Cada fila pasó de 3 líneas a 2**: la ponderación (`×${s.w}`) se fusionó dentro de la misma línea del valor (`15/100 · ×1.5`) en vez de tener su propia fila al pie — se quitó `.skbar-foot` por completo. También se quitó el texto "`X% de 100`" que llevaba esa fila: era redundante con el valor `X/100` ya mostrado arriba, no aportaba información nueva.
- **La barra de progreso bajó de 12px a 5px de alto** (`style="height:5px;margin-top:3px"`, antes heredaba el `margin-top:9px` por defecto de `.pbar`) y el padding vertical de cada fila (`.skbar-row`) de 10px a 4px. Tipografía también reducida (nombre 13.5px→11.5px, ícono 16px→12px, chip de nivel 9px→8px) para que la fila completa sea más chica sin perder ningún dato.
- **Efecto medido con Playwright**: el tile `#skillBars` bajó de altura total (con las 12 habilidades en 6 filas × 2 columnas) a **~280px**, dejando visiblemente más aire antes de las tarjetas de "Habilidades a mejorar" de abajo — antes ocupaba prácticamente el doble.
- Verificado: 12 barras con `height:5px` computado, captura visual confirma el diseño compacto sin perder ningún dato (nombre, ícono, nivel, valor, ponderación, barra), cero errores de consola.

### 5) "Ideas para hoy" — tarjetas de receta más compactas (letra y tamaño)

Pedido: *"las comidas de desayuno y cena del dashboard hazlas mas compactas de letra y tamaño"*.

- `.hp-meal-name` de 13px a 11.5px, `.hp-meal-card` de `padding:9px 12px` a `6px 10px`, `.hp-meal-list` (el contenedor con scroll de las 3 tarjetas) de `gap:8px` y `max-height:clamp(220px,32vh,340px)` a `gap:5px` y `clamp(180px,26vh,300px)`.
- **Ingredientes con override propio, sin tocar el componente compartido**: `.ds-row`/`.ds-txt` (la fila genérica con hora+texto) se reusa también en "Importante este mes" (`#diaTimeline`) y dentro de `#coachDebtSteps` — reducir su tamaño global habría afectado esas otras 2 secciones sin que se pidiera. En vez de eso, `.hp-meal-ing .ds-row`/`.hp-meal-ing .ds-txt` (nuevas, con el selector con ámbito) bajan el texto de cada ingrediente a 10px y quitan el margen/padding extra que traía por defecto, solo dentro de las tarjetas de receta.
- Verificado con Playwright: las 3 tarjetas abiertas a la vez (screenshot), ingredientes legibles y notablemente más apretados que antes, cero errores de consola.

## Lista de Compras — "X/Y comprado" visible en cada pestaña (2026-08-07)

Adán preguntó de forma abierta *"¿qué más puedes poner en las páginas que ya están en mi dashboard, para que se vea muy bien?"* — se le ofrecieron 4 mejoras concretas ancladas a datos ya existentes (ninguna inventada) y eligió esta: un indicador de cuánto lleva comprado por categoría, visible en la pestaña misma, sin tener que abrirla para saberlo.

- **`lcItemId(cat,txt)`** (nueva) — extrae a una función propia el patrón `'lc-'+cat+'-'+lcSlug(txt)` que antes vivía inline dentro de `lcRenderItems()` usando la variable global `listaCatSel`. Necesario porque para contar el progreso de las 5 categorías a la vez (no solo la activa) hay que generar los ids con la categoría real de cada ítem, no con la que esté seleccionada en ese momento — usar `listaCatSel` para las 4 categorías no activas habría generado ids incorrectos y el conteo siempre habría dado 0.
- **`lcCatProgress(cat,checks)`** (nueva) — aplana `LISTA_COMPRAS[cat]` a una lista plana de textos (ya sea que la categoría sea un array simple como `skincare`, o un objeto agrupado por pasillo/tema como `comida`/`libros`, vía `Object.values(data).flat()`) y cuenta cuántos de esos ids existen en `checks` (`dash-lista-compras`). Devuelve `{done,total}`.
- **`renderListaCatTabs()`** — se separó de `renderListaCompras()` (que antes pintaba las pestañas inline) para poder refrescar solo la fila de pestañas sin re-pintar toda la lista de ítems. Cada botón `.lc-tab` ahora incluye `<span class="lc-tab-pct">${done}/${total}</span>`, y gana la clase `.done` (borde/texto verde, `var(--g)`) cuando una categoría está completa.
- **`toggleListaItem(id)` ahora llama a `renderListaCatTabs()` al final** — cada vez que Adán marca o desmarca un ítem, el contador de su pestaña se actualiza al instante. Se llama solo a las pestañas, no a `renderListaCompras()` completo, para no perder el scroll ni el foco dentro de la lista de ítems que sigue abierta.
- **`lcRenderItems()` ganó un parámetro `cat`** (antes usaba `listaCatSel` directo) — mismo motivo que `lcItemId`: los ids deben construirse con la categoría real que se está pintando, no con la variable global. Los 2 call-sites en `renderListaCompras()` se actualizaron para pasar `listaCatSel` explícitamente (que en ese contexto sí es la categoría correcta, porque ahí solo se pinta la categoría activa).
- Verificado con Playwright: las 5 pestañas muestran su conteo real (`0/40, 0/8, 0/5, 0/6, 0/44` al inicio), marcar 2 ítems de Skincare actualiza esa pestaña a `2/8` de inmediato sin tocar las demás, cero errores de consola.

## Habilidades — Inversión reemplaza a IA en el top-4, contenido con diagnóstico real (2026-08-07)

Pedido explícito: *"en habilidades, inversion tiene menos que IA entonces deberias poner inversion, pero esas 4 habilidades siento que eso que me dices no voy a llegar lejos me estas diciendo cosas comunes, dame mas info y retroalimentacion ademas pon texto pequeño para que quepa todo, y trata de abarcar mas pantalla en esos recuadros de info"*. Dos problemas reales, no uno:

1. **`inversion` (25/100) no vivía en `APRENDIZAJE`** — aunque sí existe en `SK` (el radar de 12 habilidades) con un valor más bajo que `ia` (30/100), `PRIORIDAD_N=4` solo puede elegir entre las skills que SÍ tienen contenido en `APRENDIZAJE` (antes: datos, ventas, marketing, finanzas, ia — 5 claves). Al no estar Inversión ahí, nunca podía aparecer en el top-4 del Dashboard sin importar cuánto bajara su valor. Se agregó `inversion` a `APRENDIZAJE` — el top-4 ordenado ascendente pasó de `[ventas 15, marketing 20, finanzas 20, ia 30]` a `[ventas 15, marketing 20, finanzas 20, inversion 25]`, sacando a IA tal como pidió Adán.
2. **El contenido de cada tarjeta era en efecto genérico** — antes solo mostraba `primer` (un paso) + 2 recursos, sin explicar *por qué* esa habilidad está baja específicamente en el caso de Adán ni qué error suele frenarla. Cada entrada de `APRENDIZAJE` ganó 2 campos nuevos (`diagnostico`, `error`) y uno que existía pero nunca se mostraba (`habito`, agregado al render) más un plan más allá de la primera semana (`semana24`) — 6 bloques de contenido por tarjeta en vez de 1. Ninguno es genérico: cada `diagnostico` está anclado a hechos reales ya documentados en el proyecto (ej. Ventas: *"vendes bien tu propio sueldo al cambiar de empresa (Ford→Continental→Bosch)... el hueco real es vender en frío a un extraño"*; Inversión: *"ya diste el primer paso real (CETES, BTC, acciones en GBM)... falta estructura, no empezar"*).
- **Layout**: `#skillPriority` pasó de `.grid.g4` (4 columnas) a `.grid.g2` (2 columnas) — tarjetas al doble de ancho para que quepan los 6 bloques de contenido nuevo. Tipografía reducida en conjunto (`.sc-name` 16px→13.5px, `.sc-diag`/`.sc-primer`/`.sc-plan`/`.sc-habito`/`.sc-error` a 10.5px, `.sc-badge` 38px→32px) — "texto pequeño para que quepa todo" + "abarcar mas pantalla" al mismo tiempo: menos columnas (más ancho) y letra más chica (más contenido por tarjeta), no una cosa a costa de la otra.
- **Replicado en `Coach/Coach_v2.html` → `#aprendizaje`** — mismo texto, mismo criterio: las tarjetas de Ventas/Marketing/Finanzas ganaron los párrafos "📆 Semanas 2-4" y "⚠️ Error común" (antes solo tenían "🎯 Primer paso" + "🔁 Hábito"), y se agregó una 6ª tarjeta completa (`cu6`, checkbox nuevo sin colisión con `cu1`-`cu5`) para Inversión, con sus propios 4 recursos (The Intelligent Investor, The Little Book of Common Sense Investing, A Random Walk Down Wall Street, One Up On Wall Street). El título de la sección pasó de "Ataca tus 5 debilidades" a "Ataca tus 6 debilidades". Ver detalle completo en `../Coach/readme_coach_v2.md`.
- Verificado con Playwright: `#skillPriority` muestra exactamente `["Ventas","Marketing","Finanzas","Inversión"]` en ese orden; captura visual confirma los 6 bloques de contenido por tarjeta, legibles, en 2 columnas a todo el ancho del slide; cero errores de consola en ambos archivos.

## Lista de Compras — Comida sincronizada con el recetario nuevo + Libros con links y orden por debilidad (2026-08-07, mismo día)

Dos pedidos más en el mismo mensaje.

### Comida — 38 ingredientes nuevos, sincronizados con `comida.html`

Adán reescribió por completo su lista de ingredientes que no le gustan (*"ni me gusta la calabaza, ejotes, hierbas de olor, brocoli, camote, espinaca zanahoria, pavo molido, leche de avena, crema de cacahuate, caldo de pollo, avena en hojuelas"*) directamente sobre `CuidadoPersonal/comida.html` — ver el detalle completo del recetario reescrito (16 de 20 recetas viejas reemplazadas, 8 nuevas, 14+14 en vez de 10+10) en [`../CuidadoPersonal/readme_comida.md`](../CuidadoPersonal/readme_comida.md). Este archivo solo replica el resultado, no decide el contenido:

- **`RECETAS_MINI`** (usada por "🍽️ Ideas para hoy" del Hero) y **`LISTA_COMPRAS.comida`** (usada por este slide) se reescribieron completas para quedar byte-idénticas al nuevo `RECETAS` de `comida.html` — verificado con Node comparando los 3 archivos: mismos 38 ingredientes únicos en los 3, mismos 28 nombres de receta en el mismo orden entre `comida.html` y `RECETAS_MINI`.
- Los 12 ingredientes que no le gustan a Adán ya no aparecen en ningún lado de la Lista de Compras; en su lugar hay 6 ingredientes que no existían antes en el catálogo del Dashboard (Champiñones, Pimiento morrón, Camarón, Filete de salmón, Filete de res magro, Jamón de pavo, Requesón, Papaya, Granola de amaranto, Fideo, Ajo — 11 en total, algunos comparten pasillo).

### Libros — links de compra + orden por debilidad real

Pedido: *"dame tambien los links de los libros en amazon y mercado libre, pero ordenalos deacuerdo a las debilidades de mis habilidades"*.

- **`LC_AMAZON_CATS` ganó `'libros'`** (antes solo `skincare`/`cabello`/`suplementos` tenían botones de compra). **`lcAmazonQuery()` ganó un parámetro `cat`** porque el formato de texto de libros ("Título — Autor") es distinto al de las otras 3 categorías ("Categoría — Producto A o Producto B"): el código viejo, aplicado sin cambios a libros, habría tomado el texto después del " — " (el **autor solo**) como término de búsqueda — malos resultados en Amazon. Para `cat==='libros'`, la función ahora concatena título+autor sin el guion largo (`"Influence Robert Cialdini"`) — la forma estándar de encontrar un libro exacto.
- **Las 9 categorías de `LISTA_COMPRAS.libros` se reordenaron** de más débil a más fuerte según el valor real de cada skill en `SK`: Ventas (15) → Marketing (20) → Finanzas e Inversión (categoría combinada, ~20-25) → Copywriting/Datos/Networking (empatadas en 55, Copy primero por mayor ponderación ×1.2) → Programación (60) → Liderazgo (80) → Hábitos y Mentalidad (85, su habilidad más fuerte de las 12 — por eso queda al final, no al principio). Antes el orden era el de captura original, sin ningún criterio.
- Verificado con Playwright: orden de categorías mostrado = `["Ventas","Marketing","Finanzas e Inversión","Copywriting","Datos","Networking","Programación","Liderazgo","Hábitos y Mentalidad"]`; el primer libro ("Influence — Robert Cialdini") genera `https://www.amazon.com.mx/s?k=Influence%20Robert%20Cialdini` y el equivalente en Mercado Libre; cero errores de consola.

## Habilidades — el contenido nuevo no cabía sin hacer scroll (2026-08-07, mismo día)

Adán, tras ver el rediseño de la sección anterior: *"en el de habilidades debo hacer scroll down para ver todo, pero de principio dejame ver todo bien al inicio"*. Medido con Playwright antes de tocar nada (no a ojo): a 1600×900 (tamaño de monitor típico), el contenido real del slide medía **974px de alto**, pero solo **751px** eran visibles sin scroll — 223px quedaban recortados en silencio por `.slide{overflow:hidden}` (el diseño de "screensaver" del Dashboard no muestra scrollbar en desktop, así que ese contenido no solo requería scroll, en la práctica era invisible). Las 6 tarjetas de contenido que se agregaron en el rediseño anterior (ver sección de arriba) eran ricas pero pesadas: 2 filas de tarjetas de ~360-371px cada una.

- **3 rondas de compactado, midiendo con Playwright después de cada una** (no de un solo intento): tile padding de las tarjetas de prioridad de `clamp(16px,2vw,26px)` a `6px 9px`; gap interno de cada tarjeta de `6px` a `2px`; `line-height` de los 5 bloques de texto (diagnóstico/primer paso/semanas 2-4/hábito/error) de `1.48` a `1.26`; tipografía reducida otro escalón (nombre 13.5px→12px, badge 32px→22px); fila de barras con padding de `4px` a `1px`.
- **Se fusionó "Ponderación en el OVR" dentro de la línea del valor** (`15/100 · ×1.5`, mismo patrón que ya usan las barras de arriba) — esa línea era información duplicada (la ponderación de estas 4 habilidades ya se ve en la sección de barras, 30-40px arriba) y quitarla ahorra una línea completa × 4 tarjetas sin perder el dato en ningún lado. `.sc-w` (la clase que la pintaba sola) se eliminó por quedar sin uso.
- **Resultado medido**: de 974px a **752px** de contenido real, contra 751px visibles — de 223px recortados a prácticamente 0 (1px, dentro del margen de error de redondeo del navegador). Verificado también que el problema NO era solo de altura: a un ancho de ventana ≤900px, `.skill-bars-grid` y `#skillPriority` bajan a 1 columna (mismo breakpoint que el resto del Dashboard) y ahí sí hace falta scroll real — eso es el modo táctil/responsivo ya probado para iPad/iPhone, deliberado, y no se tocó.
- Verificado con Playwright en modo claro y oscuro a 1600×900: título, las 12 barras y las 4 tarjetas completas (con su link "Ajustar X en Coach →" al pie) visibles a la vez, sin necesidad de scroll; cero errores de consola.

## Bandera de Alemania, tarea k5 reescrita, primer paso de Ventas corregido, suplementos AM/PM (2026-08-07)

Pedido de Adán en un solo mensaje con cuatro partes: *"Copy: mejora o escribe 1 mensaje de venta / la landing de la plantilla GBM esto en rutina no lo voy hacer"*, *"arriba en aleman, pon la bandera de alemania"*, *"por que me dices esto en coach y dashboard, si ni tengo nada que vender, esto: envía 1 mensaje personalizado a un prospecto real de tu red Ford/Continental/Bosch."*, y *"En lo de mi rutina diaria en dashboard, no estamos añadiendo los suplementos que debería tomar, hazlo detallado y debería tomarlos al inicio y fin de día, pero tú dime que tomar sin saturarme y que me sirvan"*.

- **Bandera 🇩🇪** añadida al `eyebrow` del slide "Alemán del día" (`.theme-aleman`, `data-i="6"`): `<span class="dot"></span> 🇩🇪 Alemán del día`. Verificado con Playwright en claro y oscuro — se ve junto al punto indicador, sin romper el layout del `eyebrow`.
- **Tarea `k5` (viernes 19:00) reescrita**: antes le pedía a Adán escribir él mismo el mensaje de venta ("✍️ Copy: mejora o escribe..."), algo que explícitamente rechazó como tarea recurrente. El mensaje de venta ya está escrito y terminado — ver [`readme_coach_v2.md`](../Coach/readme_coach_v2.md) misma fecha — así que `k5` ahora es una tarea de ejecución, no de creación: `'📣 GBM: personaliza el post de venta ya escrito (precio/fecha) y publícalo en 1 comunidad real de inversión'`, con link a `../Coach/Coach_v2.html#plantillas-mensajes`.
- **`APRENDIZAJE.ventas.primer` corregido**: el texto anterior mandaba a Adán a enviar un mensaje personalizado a un prospecto de su red Ford/Continental/Bosch sin tener nada armado que ofrecer — exactamente lo que objetó ("ni tengo nada que vender"). Ahora el primer paso usa el mensaje de venta ya escrito: *"Lee el cap. 1 de 'Influence' (reciprocidad) y úsalo en el mensaje de venta que ya tienes listo (Coach → Posibles Negocios → Plantillas de mensajes): personalízalo con tu precio de lanzamiento ($99 MXN) y publícalo en 1 comunidad real de GBM/inversión."*
- **Suplementos AM/PM añadidos a `RUTINA_TASKS`**: 6 tareas nuevas (`wdSupAm`/`wdSupPm` entre semana, `saSupAm`/`saSupPm` sábado, `doSupAm`/`doSupPm` domingo), cada una con `subtareas` detalladas tomadas del `SUPP_CATALOG` real de `CuidadoPersonal/salud.html` — no se inventó ningún suplemento nuevo. Bloque AM (Vitamina D3, Multivitamínico, Omega 3, Creatina) colocado justo después del skincare de la mañana; bloque PM (Magnesio, Proteína Whey condicional a la meta de proteína del día) colocado ~30-50 min antes de dormir, respetando el horario real de cada día (entre semana / sábado / domingo tienen horas de despertar, desayuno y dormir distintas). Un subtarea de cada bloque enlaza a `../CuidadoPersonal/salud.html?tab=suplementos` (ver soporte de deep-link nuevo en [`readme_salud.md`](../CuidadoPersonal/readme_salud.md)).
- **Conflicto detectado y resuelto con el usuario**: `Coach_v2.html` ya tenía una tarjeta ("💊 Suplementación") que decía que los suplementos estaban "fuera de prioridad" hasta que el fondo de emergencia llegara a $10,000 (Fase 0, sigue en $0 al 2026-08-07). Antes de dejar las 6 tareas activas se le preguntó a Adán cómo priorizar esto contra su propia regla financiera — eligió "Activas ya, sin condición". La tarjeta de Suplementación se reescribió para reflejar la decisión en vez de contradecirla (detalle en `readme_coach_v2.md`).
- Verificado con `node --check` (sintaxis del script inline) y Playwright en claro y oscuro: flag visible en el slide de Alemán, `k5` y las 6 tareas de suplementos visibles en "Mi Día"/Coach con el horario correcto, `RUTINA_TASKS` comparado con `Coach_v2.html` vía JSON.stringify — 68 tareas en cada archivo, único diff intencional es el `href` del link de `k5` (ancla local en Coach vs. ruta cruzada `../Coach/Coach_v2.html#...` en Dashboard); cero errores de consola.

## Mi Día — se quitó el resumen de categorías de arriba, hora de inicio y fin por tarea (2026-08-08)

Pedido explícito: *"quita los labels arriba, pero dejalo en cada task en rutina y ademas en la rutina, debe ser hora de inicio y hora de fin"*.

- **Se eliminó el resumen de categorías** (fila de píldoras "💪 Salud · 11", "🎯 Profundo · 1", etc. sobre la línea de tiempo de "Mi Día") — era `resumenHtml`/`resumenCats` en `renderDia()`, con su propia clase `.rt2-cat-chip` (distinta de `.rt2-cat`, la píldora de categoría **dentro** de cada tarjeta, que Adán pidió conservar). Se quitaron ambas: la función que las armaba y la regla CSS `.rt2-cat-chip`, que se quedó sin ningún otro uso en el archivo.
- **La hora de cada tarjeta pasó de "hora de inicio · duración" a "hora de inicio – hora de fin"** (`.rt2-time`, p. ej. antes "21:00 · 15m", ahora "21:00 – 21:15"). La hora de fin sigue siendo la hora de inicio del siguiente bloque visible en la línea de tiempo (no hay un campo de duración explícito por tarea) — mismo dato de siempre, solo mostrado como rango en vez de duración calculada. `rtDur()`, la función que calculaba la duración en texto ("15m"/"1h 30m"), se eliminó por quedar sin uso. La última tarjeta visible (no tiene siguiente bloque) muestra solo la hora de inicio, igual que antes cuando no había duración que calcular.
- Sin cambios en `RUTINA_TASKS` ni en ninguna otra estructura duplicada con `Coach_v2.html` — este ajuste es puramente de presentación en `renderDia()`, no toca datos.
- **Se quitó también la tarjeta "✅ Progreso de hoy"** (barra + texto "X/Y" sobre la línea de tiempo, entre "Ahora mismo"/"Importante este mes" y la propia línea de tiempo) — `#diaProgresoTxt`/`#diaProgresoBar` y el cálculo `contables`/`doneCount` en `renderDia()` se eliminaron. **El mismo dato sigue disponible en el menú ☰** (`renderNavMenu()`, línea de estado de "Mi Día" = "X/Y hecho hoy"), que calcula `contables`/`doneCount` de forma independiente y no se tocó.

## Unificación "Mi Día" + "Hero" en una sola pantalla (2026-08-08)

Pedido explícito: *"quiero unificar la pagina 1 y 2 del dashboard, haz las cosas mas pequeñas para que queden bien y analiza como se veria muy bien, quiero mantener las imagenes de los dias de la semana"*. Antes eran 2 slides que se turnaban en el carrusel (Mi Día `data-i="0"`, Hero `data-i="1"`) — ahora es **un solo slide** en `data-i="0"`, y todos los que venían después bajaron un índice (Coach `2→1`, Mis Metas `3→2`, Habilidades `4→3`, Lista de Compras `5→4`, Alemán `6→5`, Entrevista `7→6`). El carrusel pasó de 8 a 7 pantallas.

- **Nada se perdió, todo se compactó**: reloj + fecha, frase motivacional, la **tira de 7 días con fotos** (`#heroWeekStrip` — la pieza que Adán pidió conservar explícitamente, se mantuvo intacta en su lugar y función, solo con dimensiones más chicas), "🟢 Ahora mismo", "🗓️ Importante este mes", los 2 paneles de detalle ("🏋️ Hoy toca"/gimnasio y "🍽️ Ideas para hoy"/nutrición) y la línea de tiempo completa del día — los 8 bloques de contenido de las 2 pantallas viejas siguen aquí, apilados en una sola.
- **Cómo se armó el layout** (de arriba a abajo, todo dentro de `<section class="slide theme-dia" data-i="0">`): fila superior tipo Hero (`eyebrow` "Mi Día · JARVIS" a la izquierda, reloj+fecha a la derecha — se eliminó el título gigante con gradiente que antes mostraba la fecha sola, esa info se movió aquí para ahorrar el espacio vertical más caro del slide) → frase motivacional (`#heroFrase`) → tira de 7 días (`#heroWeekStrip`) → grid de 2 columnas "Ahora mismo" / "Importante este mes" → grid de 2 columnas "Hoy toca" (gym) / "Ideas para hoy" (nutrición) → línea de tiempo (`#diaTimeline`, ahora con `flex:1;min-height:0;overflow-y:auto` en vez de un `max-height:52vh` fijo, así crece exactamente hasta llenar el espacio que sobra debajo de todo lo anterior, sin importar cuánto midan las tarjetas de arriba en cada resolución) → link "Ver/editar rutina completa en Coach →".
- **"Ahora mismo" ya no repite las subtareas del bloque activo** (`#diaAhoraSub`, el `<div>` se quitó del HTML y su asignación en `renderDia()` también) — con las 2 pantallas fusionadas, la línea de tiempo de abajo queda a la vista en el mismo slide, con la tarjeta "ahora" ya resaltada (`.rt2-now`) y sus subtareas completas visibles sin buscarlas en otro lado. Antes (pedido del 2026-08-07 "en el ahora mismo ni se ven las subtask") tenía sentido duplicarlas porque vivían en slides separados que rotaban cada varios minutos; unificadas en la misma pantalla, mostrarlas dos veces solo quitaba espacio sin aportar nada nuevo — es la única pieza de contenido que se recortó por completo en vez de solo compactarse.
- **CSS de las 2 pantallas viejas, reducido para convivir en una sola** (todas las clases eran exclusivas de estos 2 slides, así que se editaron directo sin variantes/overrides): `.week-strip` gap 8→6px, `.ws-day` padding y `.ws-gym-photo` altura mínima 64→46px, tipografía de la tira un escalón más chica; `.hero-frase` padding e ícono de comillas más chicos; `.hp-title`/`.hp-empty`/`.hp-link` con menos margen y letra más chica; **`.hp-ex-scroll` (panel de gym) de `max-height:320px` a `118px`** y **`.hp-meal-list` (panel de nutrición) de `clamp(180px,26vh,300px)` a `clamp(90px,14vh,118px)`** — estos 2 paneles eran los más altos de Hero (diseñados para un slide dedicado a pantalla completa) y ahora son 2 de 6 piezas de contenido, así que solo alcanzan a mostrar 2-3 ejercicios/recetas antes de necesitar su propio scroll interno (ya lo tenían, solo se ve antes); `.rt2-card`/`.rt2-now`/`.rt2-txt`/`.rt2-time` (línea de tiempo) con padding y tipografía reducidos un escalón, mismo motivo.
- **`RENDERS` pasó de 8 a 7 funciones**: se agregó `renderDiaHero()` (llama a `renderDia()` y `renderHero()` en secuencia — ambas funciones siguen existiendo tal cual, solo pintan ids de DOM que ahora conviven en la misma `<section>`) en el lugar de las 2 entradas viejas. `SLIDE_MENU_META` bajó de 8 a 7 (se fusionaron "🕐 Mi Día" y "🌟 Hero · JARVIS" en una sola entrada "🕐 Mi Día · JARVIS"), y el array `stats` de `renderNavMenu()` se recortó igual para seguir alineado 1:1 por índice. El atajo de teclado `1-7` (antes `1-8`, `/^[1-8]$/` → `/^[1-7]$/`) y el texto del panel de ayuda se actualizaron junto con la renumeración de `data-i` de los 6 slides restantes — `N=RENDERS.length` ya se calcula solo, no hubo que tocarlo.
- **Nota menor sobre `localStorage['dash-settings'].lastSlide`**: si algún navegador ya tenía guardado un índice viejo (2-7) con "Recordar última pantalla" activo, la primera vez que abra el Dashboard tras esta actualización puede aterrizar en el slide "vecino" al que dejó (los índices se recorrieron -1 desde Coach en adelante) — se autocorrige solo en cuanto cambia de pantalla una vez (`showSlide()` vuelve a guardar el índice correcto). No se escribió ninguna migración para esto: es un caso de un solo salto, de bajísimo impacto, y el ajuste "Recordar última pantalla" no está activo por default.
- **Verificado con Playwright** (Chromium headless, archivo abierto directo por `file://`, sin servidor): captura a 1600×900 en claro y oscuro — todo el contenido cabe sin overflow horizontal ni vertical fuera de lo esperado (`slide-inner.scrollHeight === slide-inner.clientHeight`, la línea de tiempo absorbe el espacio libre y scrollea internamente para el resto del día), tira de 7 días con fotos intacta y legible; iPad (820×1180) e iPhone 15 Pro (393×852) en modo táctil — layout de una columna, línea de tiempo con scroll interno, sin overflow horizontal; recorrido de los 6 slides restantes vía `goTo(i)` confirmando que cada uno pinta el contenido correcto en su nuevo índice (Coach en 1, Mis Metas en 2, Habilidades en 3, Lista de Compras en 4, Alemán en 5, Entrevista en 6); cero errores de consola en ninguna combinación.

### Bug encontrado justo después: "Ver en Ejercicio →" no respetaba el día seleccionado (2026-08-08, mismo día)

Adán probó el panel "🏋️ Hoy toca" recién unificado y reportó: *"cuando le doy click a algún día [de la tira semanal], y se muestran los ejercicios de ese día... pero cuando doy click a ver el ejercicio, no se me muestra el del día que estoy viendo"*. El panel sí cambiaba de contenido al hacer clic en un día (`verHeroGymDia(dow)` ya actualizaba `heroGymDiaSel` y repintaba `renderHeroGymPanel()` correctamente) pero el link `href="../CuidadoPersonal/ejercicio.html"` de ese mismo panel era **fijo**, sin importar qué `dow` se estuviera mostrando — siempre mandaba a `ejercicio.html` a secas.

- **Fix de una línea en `renderHeroGymPanel()`**: el `href` pasó a `../CuidadoPersonal/ejercicio.html?dia=${dow}`, reusando la misma variable `dow` que el panel ya calculaba (el día clickeado, o "hoy" si no se ha clickeado ninguno) — no hizo falta ningún estado nuevo.
- **El lado que faltaba vivía en `ejercicio.html`**, que no tenía ningún soporte para deep-link por día — se agregó ahí (`init()` lee `?dia=N` y llama a `verSoloDia(N)`, la misma función que usa su propia tira semanal interna). Detalle completo en [`../CuidadoPersonal/readme_ejercicio.md`](../CuidadoPersonal/readme_ejercicio.md) → "Deep-link `?dia=N` desde el Dashboard".
- Verificado con Playwright: clic en "Domingo" en el Dashboard → `href` del link queda en `?dia=0` → abrir esa URL directo aterriza en "🏋️ Ejercicios del Domingo" con el botón "← Ver los 7 días" visible; cero errores de consola en ambos archivos.

## Subtareas de la rutina más chicas que la tarea principal (2026-08-08)

Pedido explícito: *"los subtask de las rutinas, debes hacerlas mas pequeñas y la tarea principal el tamaño esta bien"*. Solo se tocó `.rt2-sub`/`.rt2-sub-item`/`.rt2-sub-check` (las subtareas dentro de cada tarjeta de la línea de tiempo, `#diaTimeline`) — `.rt2-txt` (el título de la tarea principal, p. ej. "🧴 Skincare + 🍂 Minoxidil — PM") se dejó exactamente igual, como pidió Adán.

- `.rt2-sub-item` font-size 11.5px→10px, line-height 1.5→1.4, padding 7px 10px→5px 8px, border-radius 9px→7px; `.rt2-sub` (el contenedor de la lista) margin-top 7px→5px y gap 6px→4px; `.rt2-sub-check` (el ✅/▫️ de cada subtarea) 11px→9.5px. `.rt2-sub-prod`/`.rt2-sub-dash`/`.rt2-sub-action`/`.rt2-sub-txt` no tienen su propio `font-size` (heredan el de `.rt2-sub-item`), así que no hizo falta tocarlos aparte.
- **Segunda vuelta el mismo día ("hazlo mas pequeño")**: `.rt2-sub-item` bajó otro escalón, de 10px a **8.5px** (line-height 1.4→1.3, padding 5px 8px→4px 7px, border-radius 7px→6px, borde izquierdo de acento 3px→2px); `.rt2-sub` margin-top 5px→4px y gap 4px→3px; `.rt2-sub-check` 9.5px→8px. Con esta reducción ya suele caber un tercer bloque completo de la línea de tiempo antes de necesitar scroll.
- `subtareasHtml()` solo se usa dentro de la línea de tiempo de "Mi Día" (`renderDia()`) — no hay otro lugar del archivo que reutilice estas clases, así que el cambio no afecta nada más.
- Efecto secundario bienvenido: al ocupar menos alto, ahora suele caber una tarjeta completa más de la línea de tiempo antes de necesitar scroll.
- Verificado con Playwright a 1600×900: las subtareas se ven claramente más chicas que el título de su tarjeta, cero errores de consola.

## Duración total de la tarea, de vuelta en `.rt2-time` (2026-08-08, mismo día)

Pedido explícito: *"tambien agrega la duracion total de la task"*. `.rt2-time` había pasado de "hora · duración" (p. ej. "21:00 · 15m") a solo "hora de inicio – hora de fin" ("21:00 – 21:15") en un cambio anterior de la misma sesión — Adán ahora pidió sumar la duración también, no elegir entre una u otra. Formato final: **"21:00 – 21:15 · 15m"**, las 3 piezas de información juntas.

- **`rtDur(fromHora,toHora)` se recreó** (misma lógica que la versión eliminada: diferencia en minutos entre las 2 horas, formateada como `"15m"` o `"1h 30m"`) — vive junto a `rutinaTareasHoy()`, mismo lugar que antes.
- `renderDia()`: `<span class="rt2-time">` pasó de `${t.hora}${nextT?' – '+nextT.hora:''}` a `${t.hora}${nextT?' – '+nextT.hora+' · '+rtDur(t.hora,nextT.hora):''}`. La última tarjeta visible (sin `nextT`) sigue mostrando solo la hora de inicio, sin rango ni duración, igual que antes.
- Verificado con Playwright a 1600×900: las tarjetas muestran "21:00 – 21:15 · 15m" / "21:15 – 21:30 · 15m", etc.; cero errores de consola.

## Pulido visual de "Mi Día" — jerarquía real + línea de tiempo con conector (2026-08-09)

Adán, tras ver la pantalla unificada del día anterior: *"esta es la base de toda mi rutina y todo... visualmente lo puedes hacer mejor"*. Se le propuso primero la dirección (dar más peso visual a "Ahora mismo" y encoger los paneles secundarios) y confirmó que sí, pero pidiendo ir más allá de solo reordenar — pulir el look en serio. 3 cambios reales, no solo de tamaño:

- **"Ahora mismo" pasó de ser 1 de 4 tarjetas iguales a un banner a todo el ancho** (`.now-hero`, `#diaAhoraTile`) — es el único dato de la pantalla que responde a "qué hago en este momento", así que ahora tiene su propio nivel jerárquico, arriba de los demás. Ganó un **acento de color real por categoría**: borde izquierdo + resplandor (`box-shadow`) del color de `CAT_META[actual.cat]` (el mismo mapa de 7 colores que ya pinta las píldoras de la línea de tiempo — nunca un color inventado) más una píldora de categoría junto al título (`#diaAhoraCat`), calculado en `renderDia()`. Antes era una tarjeta blanca/gris genérica, indistinguible de "Importante este mes".
- **Los 3 paneles secundarios** ("Importante este mes", "Hoy toca"/gym, "Ideas para hoy"/nutrición) **bajaron un nivel y se movieron a una sola fila de 3 columnas** (`#miDiaSecundarios`, `.grid.g3` — antes eran 2 filas de 2 columnas) — quedan claramente como información de referencia, no como la acción principal. Colapsan a 1 columna en tablet/celular (`@media(max-width:1024px)`, mismo breakpoint que ya usa el resto del responsivo).
- **La línea de tiempo ganó una línea conectora real detrás de los puntos** (`#diaTimeline::before`, 1px, sutil) — el patrón visual estándar de un timeline (Google Calendar, historial de Notion) en vez de una lista plana de filas con un punto suelto cada una. Se calcula en **JavaScript, no en CSS adivinado**: `renderDia()` mide con `getBoundingClientRect()` la posición real del primer y último `.rt2-dot` tras el render (`requestAnimationFrame`) y fija 2 variables CSS (`--tl-top`/`--tl-h`) — así queda perfectamente alineada con el primer y último punto sin importar cuánto midan las tarjetas de en medio (varía con subtareas), en vez de un `top`/`bottom` fijo que se hubiera desalineado en cuanto una tarjeta creciera. Cada tarjeta (`.rt2-card`) además ganó un **borde izquierdo de color** que reutiliza el mismo `dotColor` que ya pinta su punto — nunca un color nuevo, así el borde y el punto nunca se contradicen (gris para pendientes, verde para hechas, color de categoría solo en la tarjeta activa).
- **Bug de contraste encontrado de paso y arreglado**: `.rt2-now .rt2-txt{color:#fff}` forzaba texto blanco en la tarjeta resaltada **sin importar el tema** — en modo claro eso dejaba el título casi invisible sobre el fondo del highlight. Era una regla vieja de cuando el Dashboard era oscuro-por-defecto (antes del toggle de tema del 2026-07-31) que nunca se revisó. Se quitó por completo — ahora hereda `color:var(--text)` de `.rt2-txt` como el resto de las tarjetas, correcto en los 2 temas.
- Verificado con Playwright, con el reloj del navegador fijado a una hora dentro de un bloque real (`page.clock.install`, 07:40 domingo — dentro de "Skincare + Minoxidil — AM") para poder ver el estado "ahora mismo" con datos reales en vez de vacío: banner hero con acento rosa (categoría Salud) + píldora + glow, tarjeta activa en la línea de tiempo resaltada a juego, línea conectora visible y alineada; mismo resultado en modo oscuro (contraste correcto) y en iPad (820×1180, los 3 paneles secundarios colapsan a 1 columna); cero overflow, cero errores de consola.

## Bug real: clic en un día de la tira semanal no actualizaba la rutina (2026-08-09, mismo día)

Adán probó la tira de 7 días y reportó, con razón: *"cuando doy click a algún día de la semana, no se actualiza acorde al día, la rutina, eso creo ni esta implementado"*. Tenía razón — clic en un día (`onclick="verHeroGymDia(dow)"`) solo cambiaba el panel chico "🏋️ Hoy toca" (gym); la línea de tiempo completa de abajo (`#diaTimeline`, lo que de verdad es "la rutina") se había quedado hardcodeada a `new Date().getDay()` (hoy real) sin enterarse nunca de qué día estaba seleccionado en la tira — un hueco real desde que se agregó el clic-por-día el 2026-08-07.

- **Un solo estado de "día elegido" para ambas piezas**: la variable y función se renombraron de `heroGymDiaSel`/`verHeroGymDia()` a **`diaSemanaSel`/`verDiaSemana()`** (mismo comportamiento de toggle: clic de nuevo en el mismo día vuelve a "hoy") y ahora, al hacer clic, se repintan **las 2 cosas que dependen del día**: `renderHeroGymPanel()` (como antes) y `renderDia()` (nuevo).
- **`rutinaTareasDelDia(dow)` nueva** — se separó de `rutinaTareasHoy()` (que ahora es un wrapper de una línea: `rutinaTareasDelDia(new Date().getDay())`) para poder pedir el horario de cualquier día de la semana, no solo hoy. `rutinaAhoraSiguiente()` (usada por "Ahora mismo", el botón "Marcar hecho" y el menú ☰) **no se tocó** — sigue siendo siempre sobre HOY en tiempo real a propósito: no tiene sentido un "ahora mismo" de un día distinto, y marcar una tarea como hecha siempre debe aplicar a la tarea real de hoy, nunca a un día que solo se está mirando.
- **`renderDia()` ahora distingue 2 modos para la línea de tiempo**: si no hay día elegido (o el elegido es hoy), se comporta exactamente igual que antes (ventana relativa a "ahora": 3 bloques antes + el actual + el resto, con la tarjeta activa resaltada). Si se eligió un día **distinto** a hoy, ~~muestra el día completo sin ninguna tarjeta resaltada~~ — **superado el mismo día, ver la sección siguiente**: también se recorta y resalta una tarjeta "ancla", solo que calculada distinto. El estado hecho/pendiente de cada tarea sale del registro real de esa fecha (`D.rut.completado[fecha]`, vía `semanaActual()[diaSemanaSel]`) — vacío si es un día futuro sin nada marcado todavía, sin inventar nada.
- **Encabezado nuevo `#diaTimelineTitle`** (arriba de la línea de tiempo, oculto por default) — cuando se navega un día distinto, muestra "🗓️ Rutina del [Día] · Volver a hoy →" con el link de vuelta llamando a `verDiaSemana()` otra vez (mismo toggle). El `title` del `onclick` de cada tarjeta de la tira semanal también se actualizó de "Ver ejercicios de X" a "Ver la rutina completa de X", más preciso ahora que abarca más que solo el gym.
- **Bug de animación encontrado al verificar con Playwright**: el encabezado nuevo, al pasar de `display:none` a visible, aparecía con `opacity:0` durante ~1.25s (el `delay`+duración de la animación `.reveal` que tenía asignada) — las animaciones CSS se reinician cuando un elemento vuelve de `display:none`, y esa clase estaba pensada para la entrada única del slide, no para un elemento que se muestra/oculta repetidamente por clic. Se le quitó la clase `reveal d5`; ahora aparece de inmediato.
- Verificado con Playwright (reloj fijado a 07:40 domingo): clic en "Martes" cambia el panel de gym a "🏋️ Martes: Piernas A — Cuádriceps" **y** la línea de tiempo a las 24 tareas del martes completo (empezando en "Despertar sin snooze...", el horario real de entre semana, distinto al de domingo), sin tarjeta resaltada como "ahora", con el encabezado "Rutina del Martes · Volver a hoy →" visible; clic en "Volver a hoy" regresa la línea de tiempo a la ventana en tiempo real con la tarjeta activa resaltada de nuevo. Mismo resultado en modo oscuro y en iPad (panel de gym + encabezado + línea de tiempo, los 3 coherentes con el día elegido). Cero errores de consola en ninguna combinación.

## Segundo ajuste, mismo día: anclar por hora en CUALQUIER día + volver siempre resetea a "hoy, ahora"

Adán, tras el fix de arriba: *"pero cada que le haga click a algun dia debe dirigirse a la tarea que esta activa en ese momento del dia de acuerdo a la hora y ademas igualmente si por alguna razon me muevo en otra parte de la rutina y voy a otra pagina del dashboard, y regreso a la de rutina, deberia mostrarse igualmente la tarea que esta activa en ese momento del dia"*. Dos pedidos relacionados, ambos sobre el mismo concepto: la línea de tiempo debe llevarte directo a donde "estarías ahora" sin tener que buscarlo a mano.

- **`tareaActivaEnHora(tareas, hhmm)` nueva** (separada de `rutinaAhoraSiguiente()`, que ahora es un wrapper de 2 líneas sobre esta) — calcula "qué tarea toca a esta hora" para **cualquier lista de tareas**, no solo las de hoy. Esto es lo que resuelve el primer pedido: al ver un día distinto (Martes, por ejemplo), la línea de tiempo ya no muestra el día completo desde arriba — compara la **hora real del reloj** contra el horario de Martes y ancla ahí (misma ventana de "3 antes + el ancla + el resto" que ya existía para hoy), con esa tarjeta resaltada igual que `.rt2-now` (color, punto, borde) aunque no sea literalmente "ahora mismo" de verdad. Solo el banner "🟢 Ahora mismo" (arriba) y "Marcar hecho" siguen atados al HOY real — no tendría sentido marcar como hecha una tarea de un día que solo se está mirando.
- **Scroll automático a la tarjeta ancla** (`requestAnimationFrame` en `renderDia()`, junto a la medición de la línea conectora que ya existía): tras cada render, si hay una tarjeta `.rt2-now` (real o por hora), `#diaTimeline` hace `scrollTop` directo a ella (con 12px de margen arriba) — antes, aunque la ventana de "3 antes + ancla" ya empezaba cerca, si esas 3 tarjetas previas tenían subtareas largas el ancla podía quedar debajo del borde visible sin que Adán lo notara. Esto corre en **cada** render de la pantalla, no solo al hacer clic en un día — lo que también resuelve el segundo pedido.
- **`diaSemanaSel` se resetea a `null` al salir de "Mi Día"** (`showSlide()`, `if(cur===0&&i!==0) diaSemanaSel=null`) — antes, si Adán elegía un día en la tira y luego rotaba a otra pantalla del Dashboard, la selección se quedaba pegada: al volver, seguía viendo ese día viejo en vez de "hoy, ahora". Ahora cualquier salida de la pantalla limpia la selección, así que volver siempre muestra el estado real y en vivo — exactamente lo que Adán pidió.
- Verificado con Playwright: reloj fijado a 19:15 domingo → clic en "Martes" ancla en "📊 Datos: 30 min de SQL (SQLZoo/Kaggle)" (19:00–19:20, el bloque real de esa hora en el horario de martes), con `scrollTop` movido y la tarjeta confirmada dentro del área visible sin scroll manual (`getBoundingClientRect()` comparado contra el contenedor); navegar a otra pantalla (`goTo(2)`) y volver a "Mi Día" (`goTo(0)`) confirma `diaSemanaSel===null`, el encabezado "Volver a hoy" desaparece, y el ancla vuelve a ser la tarea real de HOY a esa hora ("17:00 — Bloque largo de freelance/plantilla", el bloque real de domingo a las 19:15). Cero errores de consola.

## Tercer ajuste, mismo día: se quitó el recorte "3 bloques antes del ancla" — escondía la rutina de la mañana

Adán reportó, sobre un día entre semana: *"los días entre semana no me está poniendo mi rutina para bañarme ni los suplementos ni salud de skincare minoxidil, recuerda que al inicio de mi día necesito hacer eso"*. Causa directa del "segundo ajuste" de arriba: al anclar la línea de tiempo a la tarea que tocaría **a la hora real del reloj** (sea el día que sea), la ventana seguía recortada a "3 bloques antes del ancla + el ancla + el resto" (`visibles = tareasDia.slice(idxAnchor-3)`, heredado de antes del "segundo ajuste"). En un horario entre semana, el bloque de 🚿 Bañarte (07:03), 🧴 Skincare + Minoxidil AM (07:20) y 💊 Suplementos AM (07:25) son de los primeros del día — en cuanto se revisa la rutina después de las ~8am (el ancla ya está en ALTEN, Didi, o cualquier bloque posterior), esos 3 bloques quedan a más de 3 posiciones del ancla y desaparecen de la lista por completo, aunque no estén marcados como hechos.

- **Se quitó el recorte por completo** — `visibles` ya no es `tareasDia.slice(...)`, es `tareasDia` completo (ver `renderDia()`). El auto-scroll a la tarjeta ancla (`.rt2-now`, agregado en el "segundo ajuste" de arriba) ya se encarga de llevar la vista al bloque activo sin necesitar recortar nada — con la lista completa, además, ahora sí se puede subir con scroll a revisar la rutina de la mañana aunque ya haya pasado.
- No se tocó `idxAnchor` como concepto (sigue existiendo `tareaActivaEnHora()`/`anchorTask` para saber cuál tarjeta resaltar y a cuál hacer scroll) — solo se eliminó el `.slice()` que limitaba qué tan atrás se podía ver.
- Esto aplica tanto a "hoy" como a cualquier día elegido en la tira semanal (`diaSemanaSel`) — ambos casos comparten la misma variable `tareasDia`/`visibles` en `renderDia()`.

## Columnas de la fila secundaria — "Hoy toca" (gym) más ancho, los otros 2 más angostos (2026-08-09, mismo día)

Pedido explícito: *"el recuadro de importante de este mes hazlo mas chico de ancho y tambien la de ideas para hoy, y ese espacio ganado haz grande lo de ejercicio"*. Las 3 tarjetas de `#miDiaSecundarios` (Importante este mes / Hoy toca / Ideas para hoy) vivían en `.grid.g3`, 3 columnas iguales.

- **`#miDiaSecundarios{grid-template-columns:1fr 2fr 1fr}`** — nueva regla propia (ya no hereda las 3 columnas iguales de `.g3`), columna del medio ("Hoy toca", el panel de gym) al doble de ancho que las de los lados. Se agregó como regla normal (no inline) y **antes** en el archivo del `@media(max-width:1024px){#miDiaSecundarios{grid-template-columns:1fr}}` que ya existía (ver sección "Unificación Mi Día + Hero") — así el colapso a 1 columna en tablet/celular sigue ganando en ese breakpoint sin tocarlo. (Importante: tuvo que ser una regla de hoja de estilos, no un `style=""` inline en el HTML — un inline hubiera bloqueado esa media query, que tiene menor especificidad que un atributo `style`.)
- Sin cambios de alto (`.hp-ex-scroll`/`.hp-meal-list` siguen igual) — solo de ancho, tal como se pidió.
- Verificado con Playwright: en un día con ejercicios reales (martes, "Piernas A — Cuádriceps") el panel de gym se ve notablemente más ancho, con los 3 ejercicios y sus técnicas explicadas con más aire; "Importante este mes"/"Ideas para hoy" siguen legibles, solo más angostos (el texto de recetas más largas ahora envuelve a 2 líneas en vez de 1, sin desbordar); en iPad (820px) las 3 siguen colapsando a 1 columna a ancho completo. Cero errores de consola.

## Peso inicial estimado por ejercicio, en kg y lb, junto a las repeticiones (2026-08-09, mismo día)

Pedido explícito: *"en los ejercicios en el dashboard, cuando muestras los ejercicios debes poner el peso de cada uno mi fuerza es media baja, entonces tu ponme un peso a todos acuerdo a eso y despues yo te doy retroalimentación de cuanto aguanto, dame el peso alado del nombre del ejercicio y en kg y en lb pero alado del numero de repeticiones"*. Se aplicó al panel "🏋️ Hoy toca" (`renderHeroGymPanel()` + `EJ_LOOKUP`), que es el único lugar del Dashboard con estructura real `{series,reps}` por ejercicio — la línea de tiempo de "Mi Día" (`RUTINA_TASKS` → e1-e5) solo tiene texto plano tipo "Press de banca — 4×8" sin `id` de ejercicio, así que no se tocó (evita duplicar/desincronizar `RUTINA_TASKS` con `Coach_v2.html`, que debe seguir siendo byte-idéntico — ver tabla "Datos duplicados" más arriba).

- **`EJ_LOOKUP` ganó `pesoIni` (kg) por ejercicio** — punto de partida estimado calibrado para "fuerza media-baja" (petición explícita de Adán) sobre su **peso corporal real, 77kg** (`CuidadoPersonal/salud.html → S.perfil`), con guías generales de peso de trabajo para alguien por debajo del promedio en fuerza — nunca un 1RM real, que todavía no se conoce. `porLado:true` en los ejercicios de mancuerna (Aperturas, Curl con Mancuerna, Curl Martillo, Zancadas, Sentadilla Búlgara, Elevaciones Laterales) marca que el kg es **por mano**, no el total — evita ambigüedad. `pesoIni:'corporal'` en los de solo peso corporal (Dominadas, Fondos en Banco, Plancha, Elevación de Piernas, Rueda Abdominal) — sin número inventado. Los 3 de puro cardio (Caminata, Elíptica, Nadar) se quedaron sin `pesoIni` — no aplica.
- **`kgToLb(kg)`/`pesoLabel(info)` nuevas** — conversión simple (`kg*2.20462`, redondeado) y armado del texto (`"40kg / 88lb"`, o `"8kg / 18lb c/u"` si `porLado`, o `"peso corporal"`). `renderHeroGymPanel()` arma `sr = series×reps`, y el peso va **pegado al número de repeticiones** dentro del mismo `<span class="hp-ex-sr">`, en su propio `<span class="hp-ex-peso">` — mismo texto que el resto de `.hp-ex-sr` (gris `--text2`) pero el peso en **naranja `--o` y negritas** (pedido explícito: "pon de otro color el peso", 2026-08-09, mismo día) para que salte a la vista a media lectura sin tener que leer el bloque completo. `--o` se eligió por no estar ya en uso en este panel — el tema de "Mi Día" (`.theme-dia`) es cian/verde y `.hp-link` ya usa cian, así que el naranja no compite con nada cercano.
- **Se descartó a propósito una línea de nota aparte** ("peso estimado, ajústalo…") que se probó primero arriba de la lista — el panel ya vive apretado a 118px de scroll interno desde el 2026-08-08, y el slide "Mi Día" es de pantalla completa sin scroll de página; una línea extra fija arriesgaba el mismo tipo de overflow vertical que este archivo ha cuidado en cada iteración anterior. El criterio ("son puntos de partida, no una prescripción fija — corregirlos con retroalimentación real de cuánto aguanta") quedó documentado en el comentario del código junto a `EJ_LOOKUP`, no en la interfaz.
- **No se tocó `GYM_RUTINA_DEFAULT`** (`series`/`reps`/`descanso` por ejercicio) — el peso vive en `EJ_LOOKUP` por `id` de ejercicio, no por día, así que un mismo ejercicio (p. ej. Curl con Mancuerna) muestra el mismo peso sin importar qué día de la semana aparezca.
- **Pendiente si Adán lo pide después**: no hay todavía forma de que Adán edite `pesoIni` desde la interfaz conforme dé su retroalimentación real — hoy solo se puede ajustar editando el código. Viviría mejor como parte de `ejercicio.html` (que ya registra sesiones reales) si se vuelve un flujo frecuente.

## Panel "Hoy toca" más alto — los 5 ejercicios visibles sin scroll interno (2026-08-09, mismo día)

Pedido explícito, tras ver el peso agregado: *"el recuadro ese de ejercicio en dashboard, hazlo mas grande verticalmente para que se aprecien todos los ejercicios sin hacer scroll"*. `.hp-ex-scroll` tenía `max-height:118px` (reducido de 320px el 2026-08-08 al fusionar Mi Día con Hero) — con 5 ejercicios y su técnica explicada, el contenido real mide 191-240px según el día (medido con Playwright, `scrollHeight` real de `.hp-ex-scroll` cargando cada uno de los 7 días vía `Date` simulado), así que hasta 122px quedaban ocultos tras scroll.

- **`max-height:118px;overflow-y:auto` → `max-height:none;overflow-y:visible`** — el panel ahora crece con su contenido en vez de recortarlo. Como `#miDiaSecundarios` usa `align-items:stretch` en una fila de `grid`, las otras 2 tarjetas ("Importante este mes"/"Ideas para hoy") se estiran a la misma altura que "Hoy toca" — mismo comportamiento que ya tenían, solo que ahora la fila completa es más alta.
- **Verificado que cabe sin desbordar la pantalla, no solo "se ve bien" a ojo** — antes de aplicar el cambio se midió con Playwright el contenido real de `.hp-ex-scroll` para los 7 días de `GYM_RUTINA_DEFAULT` (peor caso: 228-240px, viernes "Piernas B" y sábado "Pecho+Cardio+Core", según el ancho de viewport) y, tras el cambio, se confirmó que `.slide-inner` (que crece con el contenido) sigue cabiendo dentro de `.slide` (que tiene `overflow:hidden`, alto fijo) en 4 resoluciones: 1920×1080, 1440×900, 1366×768 (la laptop más chica probada) y 1280×800 — en el caso más apretado (1366×768, sábado) sobra **38px** de margen arriba y abajo, nunca 0 ni negativo. Sin este chequeo, agrandar el panel a ciegas se arriesgaba a repetir justo el tipo de bug de overflow que motivó reducirlo a 118px la primera vez (fusión Mi Día + Hero, 2026-08-08).
- **`.hp-ex-scroll` conserva su nombre de clase** (histórico, ya no hace scroll de verdad) — no se renombró para no tocar más de lo necesario; su único trabajo ahora es el `margin-top:2px` que ya tenía.

## "Ideas para hoy" muestra el catálogo completo de recetas, con nombre mucho más chico (2026-08-09, mismo día)

Pedido explícito: *"en desayunos, ponme todas las recetas que tienes de desayuno y ponmelas ahi, pero haz el nombre de desayuno mucho mas pequeña para que quepan varias, igual en cena"*. Desde el 2026-08-07, el panel mostraba solo una **ventana rotativa de 3 recetas** (`pickN()`, se recorría 1 lugar cada día) sobre un catálogo real de 14 desayunos + 14 cenas (`RECETAS_MINI`) — Adán quería ver el catálogo completo, no una muestra.

- **`renderHeroNutri()` ya no usa `pickN()`** — `recetas = RECETAS_MINI.desayuno` o `.cena` completo, sin recorte ni rotación. `pickN()` se eliminó por completo (quedó sin otro uso en el archivo).
- **`.hp-meal-card .hp-meal-name` de 11px a 9px**, con el padding de cada tarjeta reducido (`5px 9px`→`3px 8px`) y el `gap` de la lista (`4px`→`3px`) — más denso para que quepan más filas visibles a la vez dentro del mismo `.hp-meal-list`, que **ya tenía scroll interno propio** desde el 2026-08-08 (`max-height:clamp(90px,14vh,118px);overflow-y:auto`) y no se tocó: a diferencia del panel de gym (ver sección de arriba), aquí Adán no pidió eliminar el scroll, solo que cupieran más de un vistazo — con 14 recetas por pestaña seguir necesitando scroll para ver todas es esperado y correcto.
- **Verificado con Playwright**: 14 tarjetas renderizadas en Desayuno y 14 en Cena, fuente computada de `.hp-meal-name` confirmada en 9px, clic en una tarjeta sigue expandiendo sus ingredientes correctamente (ya no rompió `toggleRecetaCard()`/`nutriExpandido`), y `.slide-inner` sigue con el mismo margen de 45px arriba/abajo que antes del cambio (1440×900) — el contenedor no creció, así que no había riesgo de overflow que revisar aquí.

## Recetario recortado de 14+14 a 10+8, sincronizado con comida.html (2026-08-09, mismo día)

Pedido explícito, sobre el catálogo completo que se acababa de mostrar: *"quitame el pan frances, el omellette dejalo pero otra cosa en vez de champiñones, quita lo de pan tostado, tostadas de requeson quitalas, quita hotcakes / en cena quita salmon, quita camarones, quita sopa de pollo, quita ensalada, quita pescado a la veracruzana, quita tinga de pollo"*. Ver [`../CuidadoPersonal/readme_comida.md`](../CuidadoPersonal/readme_comida.md) → "Segunda ronda de curación" para el detalle completo de qué se quitó y por qué (incluida la razón de por qué el omelette cambió a **pimiento morrón y no espinaca** — Adán no la quiere, ver comentario de comida.html del 2026-08-07). Este archivo es el que replica esa fuente real, no la fuente en sí:

- **`RECETAS_MINI`** — mismos 10 desayunos + 8 cenas que `comida.html → RECETAS`, con los mismos nombres/ingredientes (sin `pasos`/`tip`, que nunca tuvo esta copia ligera). Los 10 recortes se aplicaron uno por uno, sin renumerar ni reordenar lo que quedó.
- **`LISTA_COMPRAS.comida` también se recortó** — 8 ingredientes quedaron sin ninguna receta que los use tras los recortes (Ajo, Camarón, Filete de salmón, Requesón, Canela en polvo, Fideo, Quinoa cocida, Sal) y se quitaron de sus 5 categorías por pasillo para no dejar cosas por comprar que ya no corresponden a ninguna receta: Frutas y Verduras 14→13, Carnes y Pescados 6→4, Lácteos y Huevo 6→5, Abarrotes y Despensa 10→6 (Panadería y Tortillas sin cambio, 2). Total 38→30.
- **Verificado con Playwright en ambos archivos a la vez** (`comida.html` y `dashboard.html`): mismos 10 nombres de desayuno y 8 de cena en los dos, `LISTA_COMPRAS.comida` con conteos 13/4/5/6/2, cero errores de consola en ninguno.

## Slide "Coach · Plan Maestro" reestructurado por mes, con rediseño visual (2026-08-09)

Mismo pedido que en Coach_v2.html (ver [`../Coach/readme_coach_v2.md`](../Coach/readme_coach_v2.md) → "Plan Maestro reestructurado por mes" para el detalle completo de por qué y cómo se dividieron las semanas de Fase 0 en meses reales): *"en el dashboard son muchas tareas y no me enfoco en ninguna, ademas quiero que lo del dashboard lo hagas que se vea muy bien visualmente pero recuerda que son metas por mes"*. Antes `#coachPriorities` (`"📋 Qué hacer en esta fase — semana a semana"`) dumpeaba las 7 tareas de `ph.semanas` de la fase activa de un jalón — mismo problema que en Coach, solo que aquí ya solo mostraba UNA fase a la vez (Dashboard nunca apiló las 4 fases como sí hacía Coach), así que el arreglo fue puramente sobre "dentro de la fase activa, un mes a la vez".

- **`PHASES[0].semanas` ganó un campo `mes`** (`'2026-07'`/`'2026-08'`/`'2026-09'` por item, mismo criterio de fechas reales que Coach_v2.html) y el texto se actualizó para quedar igual al de Coach (sin el prefijo `<strong>Semana N-M:</strong>`, ya redundante con el mes). `PHASES[1-3].semanas` **no** ganaron `mes` — mismo motivo que en Coach: sus tareas son secuencias condicionadas a eventos, no fechas de calendario reales, así que forzar un mes sería inventar precisión falsa.
- **`renderCoach()` detecta si la fase activa tiene `mes` en sus items** y, si los tiene, agrupa por mes con **tabs reutilizando el componente `.mes-tab`** que ya usan "Importante este mes" (Mi Día) y las categorías de Lista de Compras — mismo lenguaje visual del resto del Dashboard, no un widget nuevo aparte. Cada tab muestra el mes + un contador `X/Y` (clase `.lc-tab-pct`, reusada tal cual de Lista de Compras) y se pone en verde (`.mes-tab.done`) cuando ese mes ya está 100% completo. El título de la tarjeta cambia dinámicamente a `"📅 Agosto 2026 — tu enfoque este mes"` (antes fijo, "Qué hacer en esta fase — semana a semana"). Si la fase activa NO tiene `mes` (Fase 1-3 cuando les toque estar activas, todavía sin desglosar), cae de vuelta al comportamiento viejo automáticamente — sin romper nada para esas fases.
- **Banner "⚠️ N pendientes de [mes] sin marcar"** (`.coach-mes-pendientes`, nuevo) — si hay tareas sin marcar en un mes YA PASADO (distinto al mes que se está viendo), aparece un aviso chico con link directo a ese mes (`verCoachMes()`). Es una pieza nueva de valor real, no solo decorativa: ayuda a detectar qué se quedó pendiente de meses anteriores sin tener que revisar las pestañas una por una. Usa `color-mix(in srgb, var(--w) X%, transparent)` para el fondo/borde ámbar — primer uso de `color-mix()` en el archivo (antes todo era `rgba()` con canales fijos); es seguro aquí porque `--w` cambia de valor entre tema claro/oscuro y `color-mix()` respeta ese valor en vivo sin necesitar 2 reglas separadas por tema.
- Verificado con Playwright (reloj fijado a 09 ago 2026, slide Coach): tab "Agosto • 0/3" activa por default con sus 3 tareas, banner "3 pendientes de Julio 2026 sin marcar"; clic en la tab "Julio" cambia el título y la lista a las 3 tareas de julio; marcar una tarea de julio y volver a agosto actualiza el banner a "2 pendientes" y el contador de la tab de Julio a "1/3" en vivo. Mismo resultado visual en modo oscuro (contraste del banner ámbar verificado) y en iPad (820×1180, todo cabe sin overflow). Cero errores de consola.

## 3 bugs reales encontrados y arreglados: contraste en oscuro, choque con el HUD lateral, tabs de mes desbordando (2026-08-09, mismo día)

Adán: *"en dashboard, las cosas se ven muy amontonadas y no entendibles y en modo oscuro algunas letras no se ven"*. En vez de adivinar, se auditó con Playwright: un script mide el contraste real (color de texto contra el fondo compuesto de verdad, con alpha-blend correcto sobre el fondo del tema — no la lectura ingenua de `rgba()` que ignora el alpha) en los 7 slides × modo oscuro, y otro mide posiciones exactas de layout a 1366×768 (resolución de laptop muy común, no la de 1600×900 con la que se venía probando toda la sesión).

- **Bug 1 — `--text3` (texto terciario) demasiado oscuro en modo oscuro**: `#565a72` (`rgb(86,90,114)`) medía 2.4-3.0:1 de contraste contra los fondos reales de tarjeta — muy por debajo del mínimo legible (~4.5:1). Afectaba texto real en casi todos los slides: descripciones bajo etiquetas (`.sub` — "🎯 Fondo de emergencia a $10,000...", "Meta: $10,000"), fechas de la tira semanal (`.ws-ddate`), estados vacíos (`.hp-empty` — "Hoy toca descanso..."), contador de tema del día (`.td-counter`). Se cambió a `#8589a8` (4.4-5.4:1 contra los mismos fondos) — sigue leyéndose más apagado que `--text2`/`--text` (jerarquía de texto intacta), ahora simplemente visible. **De paso también se corrigió `--text3` en modo claro** (`#82859a`→`#63667c`, de 3.3-3.6:1 a 4.4-5.6:1) — mismo problema, menos severo, pero la misma variable no debía quedar inconsistente entre temas.
- **Bug 2 — el contenido se metía debajo del HUD lateral derecho en anchos de laptop comunes**: `.slide{padding:5vh 6vw}` es puramente proporcional al viewport, pero las barras `.hud-side-left`/`-right` (menú/reloj+controles) tienen ancho **fijo en píxeles** (la derecha, con el reloj, mide 85px). A 1600×900 (la resolución usada toda la sesión) el 6vw sobraba de margen y nunca se notó; medido en 1366×768 (laptop típica), el contenido invadía **19px por debajo del HUD derecho** — la tira de 7 días y la línea de tiempo quedaban tapadas en su borde. Fix: `padding:5vh max(6vw,120px)` — un piso fijo que garantiza espacio libre para el HUD sin importar el ancho, y no le quita nada a pantallas grandes (ahí 6vw ya es mayor que 120px). El piso se **desactiva de vuelta a `6vw` puro dentro de `@media(max-width:1024px)`**, porque ahí el HUD ya se reposiciona abajo-centro (ver "Responsivo" más arriba) y ya no hay nada de qué protegerse — sin este reset, tablets/celulares se hubieran quedado con un padding de 120px por lado, la mitad de la pantalla desperdiciada.
- **Bug 3 — "Importante este mes" mostraba 6 pestañas de mes cuando solo 3 tienen contenido real**: en la columna angosta de la fila secundaria (1fr de 4, desde que "Hoy toca" se hizo más ancho), 6 tabs ("Ago"—"Ene '27") no cabían en una fila y envolvían a una segunda línea, lo que — por `align-items:stretch` en el grid padre — estiraba también las otras 2 tarjetas vecinas sin necesidad, empujando la línea de tiempo hacia abajo. `EVENTOS_MES` solo tiene datos reales para 3 meses (ago/sep/oct); `mesesVisibles(6)` bajó a `mesesVisibles(4)` en `renderEventosMes()` — cubre todo lo real más 1 mes de colchón, y las 4 pestañas caben cómodas en una sola fila a cualquier ancho de escritorio probado.
- Verificado con Playwright: contraste re-auditado tras el fix — 0 elementos con contraste <3.5 en los 7 slides (antes: 81/21/23/46/52/42/17 respectivamente); medición exacta de posiciones a 1366×768 confirma cero solapamiento entre el contenido y el HUD (antes 19px de invasión); captura visual en 1600×900, 1366×768 (claro y oscuro) e iPad/iPhone (820×1180, 393×852) sin regresiones — el padding en tablet/celular quedó idéntico a antes del fix. Cero errores de consola en ninguna combinación.

## Slide Coach, segunda pasada el mismo día: "se ve amontonado... no esta claro a que se refiere esa seccion"

Tras el redondeo de bugs de arriba, Adán volvió a mirar específicamente el slide "Coach · Plan Maestro" (que se acababa de reestructurar por mes) y señaló que, aunque ya no había overflow, seguía sin comunicarse bien: 2 tarjetas grandes casi idénticas (blanco/gris, mismo padding, mismo peso visual) apiladas una sobre otra, sin nada que dijera de un vistazo "esto es tu deuda" vs. "esto es tu mes" — y dentro de la segunda, una lista plana de texto corrido separado por líneas delgadas, sin aire entre tareas.

- **Cada una de las 2 tarjetas ganó su propia identidad de color** (`.coach-accent-debt`/`.coach-accent-month`, borde izquierdo de 3px) — verde (`var(--g)`, el mismo verde que ya usaba la barra "Avance real") para la tarjeta de deuda, dorado (`var(--ac1)`, el acento del tema Coach) para la tarjeta del mes. Ya no son "2 cajas blancas iguales", el ojo distingue de inmediato cuál es cuál.
- **Se quitó la línea `🎯 [meta de la fase]` que aparecía duplicada** dentro de la tarjeta del mes — decía casi textualmente lo mismo que la tarjeta de deuda de arriba ya muestra con números reales ($0/$10,000, etc.), a centímetros de distancia. Esa era la raíz real de "no está claro a qué se refiere esa sección": la misma meta contada 2 veces, en 2 formatos distintos, sin que quedara claro si eran cosas diferentes. **Ojo**: la línea solo se quitó cuando la fase tiene meses (hoy, Fase 0) — en fases sin desglosar (1-3, si algún día están activas) sigue mostrándose, porque ahí es el único lugar que da la meta numérica concreta.
- **"📋 Qué hacer..." pasó de una etiqueta chica gris (`.lbl`, 11px mayúsculas) a un encabezado real** (`.coach-month-title`, `clamp(15-19px)`, negritas, color de texto principal) — es la pieza más importante del slide (tu enfoque de este mes específico), así que ahora se ve como tal en vez de compartir el mismo peso visual que una etiqueta secundaria cualquiera.
- **Cada tarea de la checklist pasó de fila plana a su propia tarjeta** (`.sem-check`: fondo, borde, radio, padding — mismo patrón que ya usan las subtareas de "Mi Día", `.rt2-sub-item`) — con más aire entre ellas y un límite visual claro por tarea. Al marcarla, la tarjeta se tiñe de verde suave (`:has(input:checked)`) en vez de solo tachar el texto — más obvio de un vistazo qué ya se hizo.
- **Bug encontrado de paso al verificar**: `toggleFaseCheck()` guardaba el check en `coach_checks_v1` pero nunca volvía a pintar la pantalla — el contador "X/Y" de la pestaña del mes y el aviso de "N pendientes" se quedaban con el valor viejo hasta que el usuario cambiaba de pestaña a mano (lo cual sí dispara `renderCoach()`). Se agregó `renderCoach()` al final de `toggleFaseCheck()` — ahora marcar una tarea actualiza su propio contador al instante, verificado con Playwright (`0/3`→`1/3` en la pestaña activa apenas se marca, sin tener que tocar nada más).
- Verificado con Playwright en 1366×768 y 1600×900, claro y oscuro: bordes de color visibles y correctos en los 2 temas, encabezado del mes prominente, tarjetas de tareas con buen espaciado y contraste, tarjeta marcada se tiñe de verde con el checkmark visible; medido con `getBoundingClientRect()` que el último ítem real de la checklist queda dentro del límite del slide (sin recorte real — el `scrollHeight` reportaba 35px de "overflow" pero es ruido de las manchas decorativas de fondo, ya documentado, no contenido recortado). Cero errores de consola.

## Tercera vuelta, mismo día: las 3 cajas de deuda seguían sin tocarse — "no hiciste nada por corregir esta petición"

La ronda anterior le dio identidad de color a las 2 tarjetas grandes del slide, pero **nunca tocó el interior de la fila de deuda** (`#coachDebtSteps`, las 3 cajas Fondo de emergencia/Banamex/BBVA) — exactamente lo que Adán señaló: *"los bloues de enmedio de esa seccion hazlos mas pequeños y el de arriba deja como un espaciado y despues pones la info que tienes, lo mismo abajo, separa las cajas de info"*. Como el mensaje admitía más de una lectura (¿"los bloques de en medio" son las 3 cajas de deuda, o la fila del medio de todo el slide? ¿achicarlas todas por igual, o solo las 2 que no están activas?), se le preguntó con 2 mockups en ASCII antes de tocar código — confirmó: **la fila de deuda, las 3 cajas iguales pero más chicas y más separadas** (no la versión "activa grande / pendientes chicas" que también se le ofreció).

- **`.debt-step` más chico**: padding `12px 10px`→`9px 8px`, radio `14px`→`12px`, ícono/etiqueta/número un escalón de letra más chicos (`.ds-ico` 13→11px, `.ds-lbl` 12→11px, `.ds-txt` 11.5→10.5px), número de paso (`.ds-num`) `16px`→`14px`.
- **Más separación en 3 niveles**, tal como se pidió ("el de arriba deja espaciado... lo mismo abajo... separa las cajas"): el `gap` entre las 3 cajas subió de `14px` a `22px` (`.debt-steps`); se agregó `margin:14px 0` a `.debt-steps` — con el margin-collapse normal de CSS entre bloques hermanos, esto separa la fila de cajas tanto del label "💰 Tu ruta..." de arriba (antes 8px, ahora 14px) como de la fila "Avance real" de abajo (antes 10px, ahora 14px + los 9px de padding que ya tenía esa fila = 23px reales).
- Verificado con Playwright en 1366×768 y 1600×900, claro y oscuro: las 3 cajas visiblemente más chicas y separadas, con aire real arriba (antes del label) y abajo (antes de "Avance real"); comparado el resultado contra el mockup que Adán eligió. Cero errores de consola.

## Cuarta vuelta, mismo día: el espaciado real que faltaba era OTRO — entre las 2 tarjetas grandes, no dentro de la fila de deuda

Tras la ronda 3, Adán reportó: *"pero no lo estas separando, las cajas verticales se ven juntas"* — con el fix anterior (espaciado dentro de la fila de 3 cajas de deuda) ya aplicado, seguía viendo el problema, y esta vez, en vez de arriesgar una 4ª interpretación equivocada, se le pidió directamente una captura de pantalla. **La captura reveló que el espaciado que faltaba era otro por completo**: no adentro de la fila de deuda (eso ya estaba bien), sino **entre las 2 tarjetas grandes que se apilan verticalmente en la pantalla** — el párrafo de explicación de la fase y la tarjeta "💰 Tu ruta hacia deuda...", y esa misma tarjeta de deuda contra la tarjeta "📅 Agosto 2026" de abajo. Adán marcó ambos huecos con recuadros rojos directo sobre la captura — cero ambigüedad posible una vez con la imagen en mano.

- **`#coachFaseExplica`** (párrafo de explicación de la fase): `margin-bottom` `10px`→`24px`.
- **Tarjeta de deuda** (`.coach-accent-debt`): `margin-bottom` `10px`→`24px` — separa esa tarjeta de la tarjeta del mes que sigue justo debajo.
- Ambos eran simples ajustes de `margin-bottom` inline en el HTML — no hizo falta CSS nuevo, la estructura ya estaba bien, solo le faltaba aire entre bloques.
- Verificado con Playwright (1920×1000 oscuro, replicando el encuadre de la captura de Adán, y 1366×768 claro): hueco visible y claro en los 2 puntos marcados; a 1366×768 el último ítem real de la checklist sigue dentro del límite del slide (`760.8px` de `768px`, sin recorte, medido con `getBoundingClientRect()` — más ajustado que antes pero sin cortar contenido). Cero errores de consola.
- **Lección del proceso**: 2 rondas de texto (incluyendo una pregunta con mockups en ASCII) no bastaron para ubicar el problema real; una sola captura de pantalla con recuadros dibujados a mano lo resolvió al primer intento. Para pedidos de "esto se ve mal/amontonado" sin una referencia visual clara, pedir la captura de entrada es más rápido que iterar a ciegas.

## Quinta vuelta, mismo día: "espacialo mas"

Pedido corto de Adán confirmando que la dirección de la ronda 4 era la correcta, solo pidiendo más de lo mismo.

- **`#coachFaseExplica` y la tarjeta de deuda**: `margin-bottom` `24px`→`32px` cada uno (hueco real ~8px mayor por punto, con margin-collapse normal de CSS no se suman literal).
- **Compensado para no recortar contenido en laptops chicas** (1366×768, donde el margen ya venía ajustado desde la ronda 3): se achicó un poco el padding vertical de la tarjeta de deuda (`14px`→`12px`) y de la tarjeta del mes (`16px`→`13px`), el margin de `.debt-steps` (`14px 0`→`10px 0`) y el padding/margin de cada tarjeta de tarea (`.sem-check` `9px 12px`→`7px 12px`, `margin-bottom` `6px`→`5px`) — ninguno de estos achiques es perceptible a simple vista (son 1-2px por elemento), pero sumados le devuelven a la pantalla el espacio que el mayor espaciado entre tarjetas le quita.
- Verificado con Playwright: a 1366×768 el último ítem de la checklist ahora termina en `754.8px` de `768px` disponibles (mejor margen que antes de este cambio, `760.8px`) — el espaciado se ve claramente mayor sin sacrificar nada. Cero errores de consola.

## Nueva pestaña "Habilidades Base" + barra de progreso en las tarjetas con foto (2026-08-09)

Pedido explícito de Adán: *"asi como existe en dashboard la pestaña de metas, creame una para habilidades base, esta va ser diferente a mis habilidades generales, en esta nueva pestaña igualmente le pondras imagenes hd, distribucion parecida y ademas cuando des click debe mostrase info de como arender esas habilidades muy detalladamente... abajo de cada imagen debes poner una barra de progreso para ver que progreso tienes de las habilidades, al igual esto hazlo con metas"*. "Habilidades generales" es el slide ya existente "Coach · Habilidades" (`renderSkills`, barras de las 12 habilidades de carrera/negocio) — esta pestaña nueva es otra cosa: 8 habilidades de **vida**, no de carrera.

- **Slide nuevo, `data-i="3"`** (`theme-basicas`, acento coral/ámbar `#ff5470`/`#ffb100`, entre Mis Metas y Coach · Habilidades — los slides siguientes recorrieron su `data-i` uno hacia adelante: Habilidades 3→4, Lista 4→5, Alemán 5→6, Entrevista 6→7). Se actualizaron en conjunto `RENDERS`, `SLIDE_MENU_META`, el atajo de teclado (`/^[1-7]$/`→`/^[1-8]$/`) y el texto de ayuda ("1-7"→"1-8") — son 4 puntos distintos del archivo que dependen de la misma cuenta de slides, ya documentado como riesgo en secciones anteriores de este README.
- **Las 8 habilidades** (`HABILIDADES_BASE`): saber nadar, cocinar, tirar armas de fuego, pelear, decir que no, generar/administrar/hacer crecer dinero, manejar todo tipo de vehículos, y saber recuperarte (descanso físico y mental) — tal cual las dio Adán. Grid de 4×2 en escritorio (`.img-goal-grid-8`), colapsa a 2×4 en `@media(max-width:900px)`.
- **Fotos HD verificadas antes de usarlas** (misma disciplina que `TIPO_FOTO`/`META_DETALLE`): 5 de Unsplash, 3 de Wikimedia Commons (entrenamiento de pistola M17 del Ejército de EE.UU., sparring de box de la Marina de EE.UU., y la foto de nadar reutilizada tal cual de `TIPO_FOTO.cardio` para no duplicar la búsqueda). Cada URL se descargó y se revisó visualmente antes de commitear — dos intentos de "gesto de mano/decir que no" en Unsplash resultaron ser fotos sin relación (un Mustang verde, un VW Polo) pese a devolver HTTP 200, así que no basta con validar el status code, hay que ver la imagen real.
- **Detalle in-page reutiliza el overlay que ya existía para Mis Metas** (`#metaDetailOverlay`/`Hero`/`Title`/`Frase`/`Steps`) en vez de duplicar el componente — es visualmente idéntico (foto grande + frase + pasos numerados), solo cambia de dónde saca los datos: `abrirHabilidadDetalle(id,img)` lee de `HABILIDAD_DETALLE` (nuevo) en vez de `META_DETALLE`. `HABILIDAD_DETALLE` sigue el mismo criterio que `META_DETALLE`: 5 pasos concretos por habilidad, anclados al contexto real de Adán donde aplica (ej. nadar reutiliza el día de natación ya agendado en su rutina de gym, pelear conecta con la meta de bucket list "Tailandia" y el boxeo ya listado en Deportes, dinero conecta con las Fases del Plan Maestro, manejar conecta con Didi como práctica real) — nunca genérico de manual.
- **Barra de progreso debajo de cada foto — nueva pieza compartida, no solo para Habilidades Base**: como Adán pidió lo mismo para Mis Metas, la estructura de tarjeta se rediseñó una sola vez y ambos slides la reutilizan. Se renombraron las clases `.meta-img-*` (exclusivas de Mis Metas) a `.img-goal-*` (genéricas) y se envolvió cada foto en `.img-goal-cell` (columna: foto + fila de progreso). La barra (`.img-goal-pbar`) es un elemento de clic independiente de la foto — clic en la **foto** abre el detalle, clic en la **barra** fija el porcentaje en el punto exacto donde diste clic (como un seek bar, `setImgProgreso()`), snapeado a múltiplos de 5. Guardado en `localStorage`: `habilidades_base_v1` para las 8 habilidades, `metas_img_progreso_v1` para las tarjetas de Mis Metas (independiente de los 4 medidores con datos reales de Finanzas que ya tenía esa pantalla arriba — esto es progreso autoevaluado, no hay una fuente automática de "qué tan avanzado vas" en aprender a nadar o en un torneo de ajedrez).
- Verificado con Playwright en oscuro y claro, 1920×1080, 1366×768 (sin recorte, `gridBottom` 65px por encima del límite del slide) y tablet 820×1180 (colapsa correctamente a 2 columnas): las 8 fotos cargan, clic en una foto abre el overlay con sus 5 pasos, clic en una barra de progreso al 70% de su ancho la deja en exactamente `70%` con el toast de confirmación, y las tarjetas de Mis Metas (corto/mediano y largo plazo) muestran su propia barra debajo sin romper el layout existente (incluida la regla de la última tarjeta impar ocupando el ancho completo, que se conservó al pasar de `.meta-img-card:last-child` a `.img-goal-cell:last-child`). Cero errores de consola en todas las combinaciones.

## Slide "Coach · Habilidades": solo Finanzas + Inversión como prioridad, ya no Ventas + Marketing (2026-08-09)

Pedido de Adán: *"en la seccion de habilidades del dashboard, solamente muestrame inversion y finanzas, quita ventas y marketing, y reajusta la pantalla"*. Antes `#skillPriority` mostraba las 4 habilidades con el valor más bajo entre las 6 que tienen contenido en `APRENDIZAJE` (Ventas 15, Marketing 20, Finanzas 20, Inversión 25 — exactamente esas 4, por ser las más débiles). Esto coincide con una decisión que Adán ya había tomado antes (ver memoria: no perseguir prospectos de venta hasta tener una oferta/mensaje terminado) — Ventas/Marketing debían dejar de aparecer como "en qué trabajar esta semana" aunque sigan siendo, en los números, lo más débil del set.

- **`PRIORIDAD_EXCLUIDAS = ['ventas','marketing']`** (nuevo) — se excluyen del *cálculo*, no se ocultan con CSS: `renderSkills()` filtra esos ids antes de ordenar por valor ascendente. Esto es deliberado y no equivale a hardcodear `['inversion','finanzas']`: si en el futuro otra habilidad (ej. IA) baja de valor y queda por debajo de Inversión/Finanzas, el sistema la va a mostrar a ella también, dinámico como siempre — lo único permanente es que Ventas/Marketing ya no vuelven a colarse aquí, sin importar qué tan bajo baje su valor.
- **`PRIORIDAD_N` bajó de `4` a `2`** — "solamente muéstrame inversión y finanzas" es literal, no "las 4 menos 2".
- **Ventas y Marketing siguen completos en 2 lugares**: la lista de 12 barras de `#skillBars` (arriba, es el inventario completo, no una lista de prioridades) y en Coach → Aprendizaje. Solo se quitaron de "qué trabajar esta semana" en el Dashboard — no se borraron del set de habilidades ni se tocó `SK`/`calcOVR` (seguiría siendo raro que "OVR de tus 12 habilidades" bajara a 10 solo porque 2 dejaron de ser prioridad activa).
- **"Reajusta la pantalla"**: con la mitad de tarjetas (2 en vez de 4), se creció bastante todo el bloque `.skill-card` (antes achicado a propósito el 2026-08-07 para que cupieran 4: `padding` de tarjeta `6px 9px`→`12px 16px`, `gap` entre bloques de texto `2px`→`4px`, `gap` del grid `5px`→`14px`, título de la sección `11px`→`clamp(14-18px)`, nombre de la habilidad `12px`→`15px`, cuerpo de texto `9.5px`→`11.5px`, badge de ícono `22px`→`30px`) — dos intentos: el primero (fonts aún más grandes) se veía bien a 1920×1080 pero recortaba 78px de contenido a 1366×768 (medido con `getBoundingClientRect()`, `overflow-y:hidden` en `.slide`, sin scroll de rescate a ese ancho); se recortaron tamaños una vuelta más hasta quedar sin overflow (margen real de 13.6px) sin volver al tamaño original comprimido.
- Verificado con Playwright en oscuro y claro, 1920×1080 y 1366×768: las tarjetas de prioridad muestran exactamente `["Finanzas","Inversión"]`, nada más; a 1366×768 el contenido completo del slide (barras de 12 habilidades + las 2 tarjetas) cabe sin recorte. Cero errores de consola.

## Rutina de domingo: "Tiempo libre / familia" (09:00) → "Trabajar en Didi" (2026-08-09)

Pedido de Adán: *"en dashboard en rutina el domingo el tiempo libre/familia pon trabajar en didi"*. `RUTINA_TASKS` es una de las 6 estructuras duplicadas con `Coach_v2.html` (ver "Datos duplicados" arriba) — se replicó el mismo cambio en los dos archivos, no solo en el Dashboard.

- **`do05`** (`dias:[0]`, 09:00): `cat:'descanso', txt:'Tiempo libre / familia'` → `cat:'admin', txt:'🚗 Trabajar en Didi'` — mismo emoji y categoría que ya usan las entradas de Didi entre semana (`wd08`/`wd-didi2`). Se mantuvo el mismo `id` (`do05`) para no romper ningún estado guardado que dependa de ids de `RUTINA_TASKS`.
- Replicado byte-idéntico en `Coach/Coach_v2.html` (mismo `id`, misma línea dentro de su copia de `RUTINA_TASKS`).
- Verificado: comparación campo a campo entre las 68 tareas de ambos archivos — único diff restante es el ya documentado y esperado (`href` de `k5`, ancla local en Coach vs. ruta cruzada en Dashboard); `do05` idéntico en los dos. Con Playwright (reloj fijado a domingo 9 ago 2026): "🚗 Trabajar en Didi" aparece en la línea de tiempo de Mi Día en el horario correcto (08:35-09:00, entre "Bañarte + cabello" y "Bloque largo de freelance"). Cero errores de consola.

## Mis Metas + Habilidades Base: checklists reales, contenido investigado a fondo, orden Cupra↔Maestría, barra de dinero en BYD/Maestría (2026-08-09)

Reescritura grande, pedido explícito de Adán en varios párrafos: *"al hacer click en las metas no me estas poniendo checklist, con eso se van a llenar las barras de progreso"* + *"debes hacer las secciones mas extensas, recuerda que existes para que cumpla mis metas"*, con ejemplos concretos de qué faltaba (ajedrez sin torneos/ligas/costos/fechas reales; Hyrox sin explicar qué es ni cómo prepararse por estación ni fechas; Trabajar remoto sin bolsas de trabajo reales; BYD sin desglosar el plan ya existente en checklist ni una 2ª barra de cuánto llevas pagado; Cupra↔Maestría intercambiados de plazo, Maestría con 2 barras (ahorrado + checklist) y universidades/becarios reales; Empresa sin fases claras de decidir→legal→operar) y cerrando con *"quiero que ya viste que tanto quiero de info, hazlo con los demas similarmente al mismo nivel de detalle"*.

- **Investigación real antes de escribir nada** — 5 agentes en paralelo con WebSearch (Hyrox + ajedrez CDMX; bolsas de trabajo remoto; Esslingen/Berlín + Bosch/Mercedes/BMW; trámites legales SAT/persona moral en México; campamentos de Muay Thai + calendario de lanzamientos SpaceX), cada uno con instrucción explícita de reportar solo datos verificados con fuente y decir "no confirmado, verificar en X" en vez de inventar una fecha o costo — mismo principio que ya rige todo el proyecto (nunca inventar datos). Un hallazgo real del proceso: 2 URLs de Unsplash que parecían de "gesto de mano" devolvieron HTTP 200 pero eran fotos sin relación (un Mustang, un VW Polo) — confirmar que un link responde no basta, hay que revisar el contenido real antes de usarlo.
- **`pasos[]` de `META_DETALLE`/`HABILIDAD_DETALLE` dejó de ser texto de solo lectura — ahora es un checklist real.** Cada ítem es un string simple o `{txt,href,label}` cuando trae un link real de apoyo (torneos, universidades, trámites, bolsas de trabajo — todos verificados en la investigación de arriba, nunca inventados).
- **La barra de progreso de cada tarjeta ya NO se fija a mano.** Se eliminó `setImgProgreso()` (el clic tipo seek-bar de la ronda anterior) y las claves `metas_img_progreso_v1`/`habilidades_base_v1` quedaron abandonadas (sin uso, no se borran solas del navegador pero tampoco se leen más). En su lugar, `detailPct(dataDict,storeKey,id)` calcula el % en vivo como `marcados/total` de ese checklist — clic en la **foto** abre el detalle, clic en cada **checkbox** del overlay marca/desmarca y llama a `toggleMetaChecklist()`/`toggleHabilidadChecklist()`, que guarda en `metas_checklist_v1`/`habilidades_checklist_v1` (nuevas claves, propias del Dashboard) y repinta tanto el overlay (`pintarDetailOverlay()`, función compartida entre Metas y Habilidades Base) como la tarjeta de atrás — la barra sube en vivo sin cerrar el overlay.
- **BYD y Maestría ganaron una 2ª barra, de solo lectura, con dinero real de Finanzas** (`METAS_MONEYBAR`, recalculado en cada `renderMetasSlide()`): BYD muestra cuánto llevas pagado real del coche (mismo cálculo que ya usaba el tile "Deuda cara" de arriba, aplicado a la deuda `type==='car'`), Maestría muestra cuánto llevas ahorrado vs. la meta (mismo dato que el tile "Fondo Maestría"). Aparece debajo de la barra ✅ del checklist tanto en la tarjeta compacta como, con más contexto, dentro del overlay de detalle.
- **Cupra Formentor y Maestría en Alemania intercambiaron de sección** (pedido explícito: *"lo del cupra formentos inviertelo y esta sera a largo plazo, aqui a corto quisiera maestria"*) — Maestría ahora vive en "Corto & mediano plazo" (con sus 2 barras) y Cupra en "Largo plazo & bucket list" (recompensa después de liquidar el BYD). Ambos arrays (`cortoMediano`/`largoExtras`) se mantuvieron en 5/6 ítems respectivamente, así que la regla CSS de la última tarjeta impar ocupando el ancho completo (`.img-goal-cell:last-child:nth-child(odd)`) sigue aplicando igual.
- **Contenido nuevo por meta** (resumen; el detalle completo vive en `META_DETALLE` dentro de `dashboard.html`):
  - **Ajedrez**: puzzles en Lichess, 2 clubes presenciales reales (Mercenarios, Cuauhtémoc), ajedrez callejero gratis (Jardín Centenario, Alameda), calendario en MéxicoChess, FENAMAC, Copa Independencia/Revolución, Acadfac — 9 ítems.
  - **Hyrox**: qué es exactamente (8km + 8 estaciones), las 8 estaciones con peso/distancia oficial de categoría Men Open, cómo entrenar 3 de ellas específicamente, fecha real confirmada de HYROX Ciudad de México (30 oct–1 nov 2026, Centro Banamex) con link de registro oficial, sedes alternas en Norteamérica (Dallas, Chicago) — 9 ítems.
  - **Trabajar remoto**: bolsas reales (We Work Remotely, Wellfound, GetOnBoard) y un hallazgo específico — vacantes reales de ALTEN (su propia empresa) de QA/Test remoto ya publicadas en Remotive/RemoteLeaf que calzan con su perfil exacto — 9 ítems.
  - **BYD**: los 8 pasos reales del plan ya existente (fondo emergencia → Banamex → BBVA → redirigir a BYD → liquidado) convertidos en checklist, más la barra de dinero real.
  - **Maestría**: Hochschule Esslingen (M.Eng. Automotive Systems, requisitos, fechas de solicitud, link) y HTW Berlin (Future Automotive Technology), más los programas reales de Bosch (Werkstudent), Mercedes-Benz (Inspire) y BMW (Masterprogramm Fastlane) con links — 9 ítems, más la barra de dinero ahorrado.
  - **Empresa**: checklist en 3 fases explícitas (FASE 1 Decidir, FASE 2 Legal — RFC/RESICO/CFDI/SAS con links reales del SAT y gob.mx, FASE 3 Empezar desde cero) — 10 ítems.
  - **Depa, Tailandia, Hong Kong, SpaceX, Cupra**: elevados al mismo nivel (campamentos reales de Muay Thai con precios — Tiger Muay Thai, Sumalee, Santai; calendarios y puntos de observación reales de SpaceX — Next Spaceflight, Isla Blanca Park, Kennedy Space Center; miradores reales de Hong Kong — Victoria Peak, Sky100; portales reales de bienes raíces — Inmuebles24, Vivanuncios).
  - **Las 8 Habilidades Base** pasaron al mismo mecanismo de checklist, con 1-2 ítems nuevos cada una (ej. la alberca Francisco Márquez para nadar, la licencia tipo A de SEMOVI para moto, un ítem de "24 horas de margen" para decir que no).
- **CSS nuevo**: `.meta-detail-progress`/`.meta-detail-moneybar` (barras dentro del overlay), `.meta-detail-step` pasó de tarjeta de solo lectura a `<label>` con checkbox real (`:has(input:checked)` para el tinte verde y el tachado, mismo patrón que `.sem-check` de Coach), `.meta-detail-step-link` para los links de apoyo, `.img-goal-pbar-ico`/`.img-goal-pbar-row-money` para el ícono y el color cian de la 2ª barra.
- Verificado con Playwright en claro y oscuro, 1920×1080 y 1366×768: orden de tarjetas correcto (Maestría en corto, Cupra en largo); marcar 3 de 9 checkboxes de Ajedrez sube la barra de la tarjeta a 33% en vivo sin cerrar el overlay; BYD y Maestría muestran sus 2 barras (checklist + dinero, "sin datos en Finanzas" cuando no hay deuda/meta registrada, tal como se esperaba en este entorno de prueba); Empresa y Maestría muestran su checklist completo con fases/universidades/links legibles; a 1366×768 el contenido de Mis Metas cabe sin recorte (38px de margen real, incluso con las tarjetas de BYD/Maestría más altas por su 2ª barra). Cero errores de consola en ninguna combinación. `node --check` sobre los 2 bloques `<script>` del archivo: sintaxis válida.

## Overlay de detalle: más ancho y con jerarquía visual real, ya no texto plano (2026-08-09, mismo día)

Adán, tras ver el checklist recién agregado: *"quiero que cuando hagas click en cada una y se abran las tareas, esa pantalla hazla mas grande a lo ancho, ademas esa info esta bien, pero el texto visualmente se ve muy plano, cambialo para que sea muy atractivo visual en todos, devez mejorar la apariencia de todos"*. El contenido ya era bueno (recién reescrito con investigación real) — el problema era puramente de presentación: una columna angosta con cajitas grises todas idénticas, sin color ni jerarquía.

- **`.meta-detail-card` más ancho**: `width:min(760px,100%)` → `width:min(980px,96vw)` (y el hero un poco más alto, `clamp(200-320px)` → `clamp(220-340px)`, para mantener la proporción con la nueva anchura).
- **La frase motivadora pasó de una línea gris con borde delgado a una cita destacada real**: comillas grandes decorativas (`::before` con `"`, tipografía Fraunces a 52px, semitransparente), tipografía serif más grande, fondo con degradado verde sutil y borde — ahora abre cada pantalla con peso visual en vez de perderse como texto secundario.
- **Las 2 barras (checklist y dinero real) ganaron una tarjeta propia con ícono circular** (`.meta-detail-bar-ico`) en vez de ser una línea de texto suelta encima de una barra — fondo con degradado (verde para checklist, cian para dinero), mismo lenguaje visual que ya usa el resto del Dashboard para "tarjeta con acento de color".
- **Cada paso del checklist gana un acento de color a la izquierda según su tipo**, para romper la monotonía de "todas las cajitas iguales": cian si trae un link de apoyo, dorado si es un paso de tipo "FASE" (ver siguiente punto), neutro si es un paso normal — y se tiñe de verde al marcarse, sin importar su color de categoría (el estado marcado siempre gana).
- **Nuevo: detección automática del patrón "FASE N · Etiqueta — texto..."** (`parsePasoBadge()`) — antes ese prefijo vivía como texto plano al inicio de la línea (solo en 'empresa'); ahora se separa y se pinta como una píldora dorada en mayúsculas arriba del texto del paso ("FASE 1 · DECIDIR"), en vez de leerse como parte del párrafo. No requirió tocar los datos de `META_DETALLE.empresa` — el parseo es puramente de presentación sobre el mismo texto de siempre.
- **Los links de apoyo pasaron de texto azul subrayado a una píldora real** (`.meta-detail-step-link`): fondo cian translúcido, borde, radio completo — más fácil de detectar de un vistazo como "esto es clicable" que un link de texto plano perdido dentro del párrafo.
- Verificado con Playwright en claro y oscuro, escritorio ancho (1600px) y móvil angosto (420px, sin overflow horizontal): quote destacada, barras con ícono, acentos de color visibles y correctos por tipo de paso (cian en Ajedrez/Hyrox con links, dorado en las píldoras "FASE" de Empresa, verde al marcar en cualquiera), sin regresión de tamaño en pantallas chicas. **Bug encontrado y corregido de paso**: la barra de dinero de BYD/Maestría mostraba el emoji 💰 duplicado (una vez en el ícono circular nuevo, otra vez dentro del texto que ya lo traía desde la ronda anterior) — se quitó del texto, se quedó solo en el ícono. Cero errores de consola.

## Checklist con "Título: descripción" y todo más compacto — menos scroll (2026-08-09, tercera vuelta del día)

Adán, tras ver el rediseño ancho de la ronda anterior: *"pero en cada checklist ponle como algo de TITULO: descripcion, con ese formato y el titulo debe ser acorde al tema del checlist y de diferente font style y esto para todos, ademas quiero mas reducidos visuakmente los checklist por que se ven muy grandes y solo veo pocos de primera vista y no quiero hacer muchos scroll down"*. Dos pedidos en uno: (1) cada ítem del checklist necesita un título corto y temático antes de la descripción, en una tipografía distinta a la del cuerpo; (2) todo el bloque debía encogerse — se veía "muy grande" y obligaba a hacer scroll para ver más de 3-4 pasos.

- **Cambio de fondo en el modelo de datos**: cada `paso` de `META_DETALLE`/`HABILIDAD_DETALLE` dejó de admitir un string plano o `{txt,href,label}` — ahora **siempre** es un objeto `{t,d,href?,label?}` (`t`=título corto y temático, `d`=descripción). Se reescribieron a mano los ~90 pasos de las 11 metas + 8 habilidades para separar un título real de cada descripción (no un recorte automático del texto — cada título se pensó para que describiera de un vistazo el paso, tal como pidió Adán: "acorde al tema del checklist"). El prefijo "FASE N · Etiqueta — " que antes vivía como texto suelto al inicio de cada paso de 'empresa' (y se separaba con una píldora flotante en la ronda anterior) ahora es directamente el título de esos pasos (ej. `t:'Fase 2 · Da de alta tu RFC'`) — mismo dato, presentación más simple y compacta.
- **`pintarDetailOverlay()` simplificado**: ya no necesita `parsePasoBadge()` (se eliminó) para separar el prefijo "FASE" del texto — ahora solo pinta `<span class="meta-detail-step-title">${p.t}:</span> ${p.d}`. `pasoLinkHtml()` se simplificó también (`p.href` en vez de `typeof p==='object'&&p.href`, ya que todos los pasos son objetos).
- **`.meta-detail-step-title`** (nuevo): tipografía Fraunces (la misma serif de los títulos del Dashboard) en negrita, color morado (`var(--p)`) — el único uso de morado dentro del overlay, para que el título se distinga de un vistazo sin competir con el cian (links) o el dorado que ya usaba otra pieza. Al marcar el checkbox, el título se atenúa a `var(--text3)` igual que el resto del texto tachado.
- **Compactado agresivo de todo el bloque** (hero, cita, barras, pasos) para que quepan más ítems sin scroll: hero `clamp(220-340px)`→`clamp(150-230px)`, título de la meta `clamp(26-40px)`→`clamp(21-30px)`, cita `clamp(15.5-19px)`→`clamp(13-15px)` con menos padding y comillas más chicas, barras de progreso/dinero con menos padding e ícono `28px`→`20px`, gap entre pasos `11px`→`6px`, cada paso `14px 18px`→`8px 12px` de padding, checkbox `20px`→`15px`, texto del paso `14px`→`11.5px` con `line-height` más ajustado, link de apoyo más chico. Se conservó el acento de color a la izquierda por tipo de paso (cian si trae link) de la ronda anterior — solo se quitó la variante dorada "step-fase" porque esa distinción ahora la da el propio título ("Fase 2 · ...").
- Verificado con Playwright en claro y oscuro: el checklist completo de Ajedrez (9 pasos) y de Empresa (10 pasos, con badges "Fase" ahora como título) caben enteros en una ventana de 1000-1200px de alto **sin necesidad de scroll**; Maestría (9 pasos + 2 barras) también cabe completo en 1100px; marcar 2 pasos tiñe de verde, tacha el texto y atenúa el título correctamente; sin overflow horizontal en móvil (420px). Cero errores de consola.

## Título de paso a cian + lista real de estaciones con tiempos promedio en Hyrox (2026-08-09, cuarta y quinta vuelta del día)

Dos pedidos cortos seguidos. Primero: *"el morado no me gusta pon algo de cyan"* — `.meta-detail-step-title` cambió de `var(--p)` a `var(--cy)`, coherente con el resto del acento cian que ya usan los links y el borde izquierdo de esos pasos.

Segundo, sobre el paso "Las 8 estaciones" del checklist de Hyrox: *"pin en lista de los ejercicios que son y cuantas repeticiones, etc, y el promedio en que las personas acaban cada seccion"*. Investigado con WebSearch/WebFetch (no inventado): HyroxDataLab publica tiempos medianos reales por estación a partir de 395,452 resultados de HYROX (Temporadas 7-8, atletas Open y Pro individuales) — se verificó específicamente que la cifra usada (6:52 en Wall Balls) es la mediana de hombres, no la 7:28 que el sitio también reporta pero que corresponde al promedio combinado hombres+mujeres, para no mezclar categorías por error.

- **Nueva capacidad de datos: `paso.list`** — un paso ahora puede traer, además de `t`/`d`, un array `list` de líneas que se pintan como viñetas propias dentro del mismo checklist item, en vez de forzarlas en el párrafo corrido de `d`. Se usó por primera vez en `hyrox.pasos[1]` ("Las 8 estaciones"): cada línea trae ejercicio, distancia/peso oficial de Men Open y tiempo promedio real, ej. `'Wall Balls — 100 reps con 6 kg · promedio 6:52 (la más lenta de las 8)'`. El paso también gana un link a la fuente (HyroxDataLab).
- **`pintarDetailOverlay()`** ahora pinta `p.list` (si existe) como `<ul class="meta-detail-step-list">` entre la descripción y el link de apoyo — nuevo CSS compacto (`font-size:10.5px`, viñetas en cian) para no romper el objetivo de la ronda anterior de que quepan muchos pasos sin scroll.
- Verificado con Playwright en oscuro: el paso "Las 8 estaciones" ahora muestra las 8 líneas (SkiErg, Sled Push, Sled Pull, Burpee Broad Jumps, Rowing, Farmers Carry, Sandbag Lunges, Wall Balls) cada una con su distancia/peso y tiempo promedio, con el link a HyroxDataLab debajo; los 9 pasos del checklist de Hyrox siguen cabiendo casi completos en una ventana de 1200px de alto pese al paso más largo. Cero errores de consola.

## "Ahora mismo" ahora muestra inicio, fin y duración del bloque activo (2026-08-09)

Adán: *"en la primer pagina del dashboard, en ahora mismo no me muesta el inicio y fin de la actividad ni la duracion completa"*. El banner ya mostraba la hora de inicio pegada al texto (`"07:35 — Skincare..."`), pero no el fin ni cuánto dura — dato que la línea de tiempo de abajo (`.rt2-time`) sí calcula desde 2026-08-08 con `rtDur()`.

- **Nuevo `<span id="diaAhoraTime">`** en la fila `.lbl` del banner, junto al chip de categoría — muestra `"07:35–07:48 · 13m"` (inicio–fin del siguiente bloque de hoy · duración, vía `rtDur()`, la misma función que ya usa la línea de tiempo) o `"Desde las HH:MM"` si es el último bloque del día y no hay `siguiente` que dé el fin (no se inventa una hora de cierre).
- **Bug real encontrado al verificar**: existía una segunda copia de esta lógica dentro de `tickClock()` (el reloj vivo que corre cada segundo) con el formato VIEJO (`hora+' — '+txt`) — sobrescribía el texto nuevo de `renderDia()` menos de 1 segundo después de pintarlo, por eso el cambio "no se veía" en pantalla aunque el código estuviera bien. Se extrajo a una función compartida **`pintarAhora(tareasHoy,actual,siguiente)`**, usada ahora por ambos call sites — evita que las 2 copias se vuelvan a desincronizar.
- El texto grande (`.now-hero-txt`) dejó de repetir la hora de inicio (ya vive en el badge de arriba) — ahora es solo el nombre del bloque.
- Verificado con Playwright (reloj fijado a domingo 9 ago 2026, 07:40): el banner muestra "07:35–07:48 · 13m" correctamente, confirmado tanto en el pintado inicial como después de que `tickClock()` corre. Cero errores de consola.

## Barra de edad en "Mis Metas" — cronología real de qué debo lograr antes de cumplir años (2026-08-10)

Pedido explícito: *"en la seccion e corto mediano plazo en dashboard pon una barra de progreso abajo de lss estadisticas economicas, esa barra debe tener mi edad, actualmente tengo 31 y cumplo años [...], entonces pon esa barra, ademas cuando haga click en la barra abre como una sub ventana llenandola de informacion en forma de tiempo de la barra que cosas ya debo lograr"*.

- **`edadInfo()` nueva** (junto a `activePhase()`) — calcula la edad y el % del año de vida actual **en vivo**, a partir de una fecha de referencia (`NACIMIENTO={anio:1995,mes:7,dia:1}`, 1 de julio → 31 años cumplidos el 1 jul 2026 — ver nota de privacidad abajo sobre por qué el día no es el real), no de un "31" hardcodeado que se volvería falso el próximo cumpleaños. Devuelve `edad`/`edadSig`, el rango `ultimoCumple`→`siguienteCumple`, el `%` de días transcurridos de ese rango y los días que faltan. El 1 de julio de 2027 la barra sola pasa a mostrar "32 → 33" sin tocar el código.
- **`.edad-bar`** — vive dentro de la tarjeta "🚩 Corto & mediano plazo" de `#metasListas`, como primer elemento, justo debajo de `#metasProgreso` (las 4 estadísticas económicas: fondo de emergencia, deuda cara, fondo Maestría, patrimonio hacia $1M) — exactamente donde se pidió. Reusa `.lbl`/`.pbar`/`.pfill`/`.sub`, los mismos componentes de barra que ya usan esas 4 tarjetas, para que se sienta parte del mismo sistema — con fondo/borde propios en vez de anidar otro `.tile` completo dentro del `.tile` que ya envuelve la sección (se hubiera visto como una tarjeta dentro de otra tarjeta, doble blur/sombra).
- **Clic abre el mismo overlay de detalle que ya usan las metas con foto** (`#metaDetailOverlay`, `pintarDetailOverlay()`) — no se construyó un modal nuevo. La única diferencia real es el "hero": en vez de una foto de fondo (no hay una imagen real que represente "tu edad"), `abrirEdadDetalle()` le pone un degradado cian→morado. Comparte `cerrarMetaDetalle()` tal cual con el resto de los overlays.
- **El checklist del detalle (`EDAD_DETALLE`) no inventa contenido nuevo** — son las mismas 3 metas ya documentadas en `PHASES` (Fase 0/1/2 del Plan Maestro, las mismas que se ven en el slide "Coach · Plan Maestro"), filtradas a las que caen dentro de la ventana de edad actual: Fase 0 (vence 30 sep 2026), Fase 1 (vence 31 mar 2027) y Fase 2 arrancando (1 abr 2027, antes del siguiente cumpleaños). Checklist propio y separado (`edad_checklist_v1`) — marcarlo aquí no marca nada en Coach ni en el checklist semana-a-semana de Fase 0/1 que ya vive allá; son hitos de fase completa, un nivel más arriba.
- **La barra en sí no depende del checklist** — a diferencia de las tarjetas de metas con foto (donde `pct` = % de checklist marcado), el `%` de la barra de edad es puramente de calendario (días transcurridos del año de vida actual). Marcar/desmarcar un ítem del overlay no recalcula la barra de atrás — por eso `toggleEdadChecklist()` no llama a `renderMetasSlide()` (a diferencia de `toggleMetaChecklist()`, que sí repinta la tarjeta para reflejar el nuevo % en la barra ✅).
- Verificado con Playwright: la barra muestra "31 → 32 años", el % y los días restantes calculados en vivo a partir de `NACIMIENTO`. El overlay abre con el título/frase dinámicos correctos y los 3 pasos reales de `PHASES`; marcar el primer paso persiste en `edad_checklist_v1`, sube el checklist del overlay a 33% y sigue marcado al cerrar y reabrir. `.edad-bar` queda con margen libre arriba/abajo del slide en 1440×900 (mismo margen que tenía antes de agregar la barra) — no generó overflow. Cero errores de consola.

### Privacidad — la fecha de referencia NO es la fecha de nacimiento real (2026-08-10, mismo día)

Adán, justo después de ver la barra funcionando con el día real que había dado en el mensaje anterior: *"que no sea tan estpecifico, ponle 1 de julio, y borra registros exactos de mi fecha"*.

- **`NACIMIENTO.dia` pasó de 3 a 1** — el 1 de julio es una fecha de referencia redondeada a propósito, no el cumpleaños real de Adán. La edad (`31`, y el año en que la cumplió) se mantiene correcta con este ajuste de 2 días; lo único que cambia es el punto exacto del año en que la barra reinicia a 0%.
- **Se reescribió el comentario de `NACIMIENTO`/`edadInfo()`** en `dashboard.html` (y este mismo documento) para dejar explícito que la fecha es una referencia aproximada, no un dato personal exacto — este archivo no debe guardar la fecha de nacimiento real de Adán en ningún comentario, string o documentación.
- **Esta misma sección del `.md`** se reescribió para quitar las menciones al día real que se habían documentado en la ronda anterior (verificaciones de Playwright con fechas/porcentajes exactos calculados sobre esa fecha, y el `pedido explícito` citado textual) — se sustituyeron por el 1 de julio o se generalizaron, mismo criterio que el código.
- Verificado: búsqueda del día real (el que se había escrito en la ronda anterior, ya no presente en este documento) sobre `dashboard.html` y este `.md` sin resultados tras el cambio; la barra sigue mostrando "31 → 32 años" y el checklist de `PHASES` funciona igual, ya que ninguno de los 2 depende del día exacto del cumpleaños.

## Rutina de skincare/cabello a 1 producto por paso + clic lleva a Mercado Libre (2026-08-10, mismo día)

Pedido explícito: *"en mi rutina de skin care diario y rutina de cabello, usa solo 1 producto, entonces en dashboard en la pagina de la rutina, cuando haga click en los productos, llevame a mercado libre"*, aclarado después: *"cuando me refiero a un producto es que a veces me recomiendas 2 para la misma cosa"* — el problema no era la cantidad de pasos, era que un mismo paso a veces traía 2 marcas alternativas (`"CeraVe Espuma o Cetaphil"`) o 2 tratamientos alternados (`"ácido salicílico o retinol, alternando noches"`).

- **`RUTINA_TASKS` recortado a 1 producto por paso**, en `dashboard.html` **y** `Coach_v2.html` (misma fuente compartida, ver tabla "Datos duplicados"): `wd03a` (Limpiador AM) se quedó solo con CeraVe Limpiador Espumoso, `wd17b` (Tratamiento PM) se quedó solo con Differin Adapaleno 0.1% Gel (retinoide) — ya no alterna con ácido salicílico. De paso, 3 pasos que nunca habían tenido marca (`wd03b` Sérum de niacinamida, `wd17a` Limpiador PM, `wd17c` Hidratante nocturno) ganaron una marca real y única — sin marca no había nada que enlazar a Mercado Libre, y "1 producto" implica que sí exista ese producto, no un hueco genérico. Las marcas elegidas para los pasos que no la tenían (The Ordinary Niacinamida 10% + Zinc 1%, Eucerin Hyaluron-Filler + Epigenetic Noche) son las mismas que ya vivían como opción principal en `LISTA_COMPRAS.skincare` — no se inventó ningún producto nuevo, solo se promovió el primero de la lista existente al puesto único de la rutina. Los resúmenes de sábado/domingo (`sa13`/`do10`, "Skincare PM — limpiador + tratamiento (ácido salicílico/retinol) + hidratante nocturno") también se corrigieron a "+ retinoide" para no seguir mencionando la alternancia que ya no existe.
- **Verificado con Node** (mismo comando de la sección "Datos duplicados"): la única diferencia entre `RUTINA_TASKS` de los 2 archivos es una preexistente en `k5` (ruta del link, distinta a propósito porque un archivo la abre en la misma página y el otro necesita la ruta completa) — nada relacionado con este cambio quedó desincronizado.
- **Clic en el producto → Mercado Libre, solo en Dashboard** (pedido explícito: "en dashboard en la pagina de la rutina") — Coach conserva el mismo texto pero sin volverlo clicable, ese comportamiento es exclusivo de este archivo. Mecanismo:
  - **`RUTINA_TASKS` ganó un flag `producto:true`** en los 6 bloques donde TODAS las subtareas son productos reales de comprar: `wd02lav`/`wd02co` (baño+cabello entre semana), `wd0304`/`wd1718` (skincare AM/PM entre semana), `sa0506` (ducha+cabello sábado), `do045` (baño+cabello domingo). A propósito **no** se marcaron `sa0203`/`sa1113`/`do0203`/`do1013` (los resúmenes de sábado/domingo, "mismos productos que entre semana") — ahí el primer segmento del texto es un título genérico ("Skincare AM"), no una marca real, así que no hay nada útil que buscar en Mercado Libre.
  - **`productoSearchTerm(txt)` + `mercadoLibreUrl(q)` nuevas** — reciben el segmento "producto" que `subtareasHtml()` ya aislaba de por sí (todo antes del primer " — ", ver comentario histórico de esa función), le quitan la etiqueta de categoría (todo antes de los `:`) y cualquier paréntesis descriptivo suelto, y arman `https://listado.mercadolibre.com.mx/<marca-y-producto-con-guiones>`.
  - **`subtareasHtml()` ganó un 3er parámetro `esProducto`** (`t.producto`, pasado desde el único call site en `renderDia()`) — cuando es `true` y el texto trae el patrón "producto — acción", el segmento de producto se pinta como `<a target="_blank" rel="noopener">` con un 🛒 al final (en vez de un `<span>` de solo lectura); cuando es `false` o no hay patrón, se comporta exactamente igual que antes. Esto evita que pasos que también usan el patrón "Título — detalle" pero no son productos (ejercicios como "Press de banca — 4×8", el diario, planear el día) se conviertan por accidente en links de compra sin sentido.
  - **`a.rt2-sub-prod` nueva regla CSS** — mismo color/peso que la versión `<span>` ya existente, sin subrayado por default (como el resto de los links del archivo) y con subrayado al pasar el mouse.
- Verificado con Playwright (reloj fijado a lunes 07:25 y a sábado): los 11 pasos de producto de la rutina de lunes (baño+cabello Lun/Jue + skincare AM/PM) generan URLs limpias de Mercado Libre (ej. `CeraVe-Limpiador-Espumoso`, `The-Ordinary-Niacinamida-10%25-%2B-Zinc-1%25`, `Differin-Adapaleno-0.1%25-Gel`), todas con `target="_blank"`; los pasos de ejercicio del mismo día (Press de banca, Press inclinado, etc., que también matchean el patrón "texto — texto") siguen siendo `<span>` de solo lectura, no `<a>`; el bloque de ducha+cabello del sábado también genera sus 4 links correctamente. Cero errores de consola.

## Barra de edad: color cian + "Ritmo real" riguroso por meta de corto/mediano plazo (2026-08-10, mismo día)

Pedido explícito, sobre la barra de edad recién agregada: *"esta barra ponla en cyan y ademas quiero cuando de click des mas informacion y se muy riguroso de las cosas que ya debo conseguir, cuando des click pon otra barra mas o menos como linea de tiempo de las cosas que ya debo conseguir de las metas de corto y mediano, de los 31 a 32 años pon como un deadline en la barra para conseguir las cosas que quiero en corto y mediano plazo, llenalo muy completo y haz que se vea muy bien y pon info extra riguroza y frases muuuy rigurozas para que me force a hacer las cosas"*.

- **Color morado → cian** — `.edad-bar .lbl`/`.pfill` y el hero del overlay (`abrirEdadDetalle()`) pasaron de `var(--p)`/degradado cian-morado a `var(--cy)`/degradado cian sólido.
- **Nueva pieza "Ritmo real"** (`pintarEdadPace()`, `.edad-pace-*`) — el "otra barra... como línea de tiempo" que se pidió: por cada una de las 5 metas de `#metasListas` → "Corto & mediano plazo" (Ajedrez, Hyrox, Trabajar remoto, BYD, Maestría — lista mínima en `METAS_CORTO_MEDIANO`, el dato real sigue viniendo de `META_DETALLE`/`metas_checklist_v1` vía `detailPct()`, nada duplicado), una mini-barra compara **el ritmo que deberías llevar** (un marcador triangular en la posición `edadInfo().pct`, el % del año ya transcurrido — literalmente "de los 31 a 32 años... como un deadline") contra **tu avance real** (el relleno cian, % del checklist de esa meta ya marcado). Un chip de estado a la derecha traduce la diferencia a lenguaje directo: 🚨 Muy atrasado (>15pts detrás), ⚠️ Atrasado (0-15pts detrás), ✅ En ritmo, 🔥 Adelantado.
- **Frase rigurosa rotativa** (`.edad-rigor`, degradado rojo, tipografía Fraunces itálica — mismo lenguaje visual de "cita destacada" que ya usa `.meta-detail-frase` en el resto de los overlays) — 5 frases directas y con datos reales incrustados (no genéricas): calculan la meta más atrasada de las 5 y su nombre/%, citan el OVR real de "Mentalidad" (85, la habilidad más alta del Gráfico de Habilidades) para argumentar que el problema no es capacidad, cuentan los días exactos que faltan y los que ya pasaron. Rota una por día (`diaDelAnio()%5`, mismo patrón que `FRASES_MOTIVACION` del Hero) — no la misma frase cada vez que se abre.
- **`#metaDetailMoneybar` reutilizado, no un contenedor nuevo** — ese div normalmente pinta la barra de dinero real de BYD/Maestría dentro del overlay de esas 2 metas; aquí no hay dinero que mostrar, así que `pintarEdadPace()` reutiliza el mismo slot vacío para todo el bloque de "Ritmo real" + la frase rigurosa. Como `pintarDetailOverlay()` (la función compartida) siempre deja ese div en `''` si no le pasan `moneyInfo`, `pintarEdadPace()` se llama **después** de `pintarDetailOverlay()` en `abrirEdadDetalle()` y en `toggleEdadChecklist()` — si se llamara antes, o si se te olvidara en el toggle, marcar un ítem del checklist de Fase borraría todo el bloque de ritmo de la pantalla.
- Verificado con Playwright: color cian confirmado por `getComputedStyle` (no morado); las 5 filas de ritmo muestran nombre/estado/marcador/relleno reales (en un navegador limpio, sin checklist marcado, las 5 salen "⚠️ Atrasado 11pts" con el marcador en 11% — coincide con el % de año transcurrido calculado); la frase rotó correctamente según el día; marcar un checkbox del checklist de Fase (3 pasos, sin cambios de esta ronda) **no** borra el bloque de ritmo ni la frase. Cero errores de consola.

## Ejercicios de "Mi Día" (RUTINA_TASKS) ganaron el mismo peso que ya tenía "Hoy toca" (2026-08-10, mismo día)

Pedido explícito: *"tambien en lo de rutina y el recuadro de ejercicio donde esta el peso y las repeticiones no es lo mismo, debe ser lo mismo, pero basate en los ejercicios que ya tienen peso, eso en todos los dias por que es diferente"*. La línea de tiempo de "Mi Día" (bloques `e1`-`e5` de `RUTINA_TASKS`, un ejercicio por línea tipo "Press de banca — 4×8") y el panel "🏋️ Hoy toca" (`GYM_RUTINA_DEFAULT`+`EJ_LOOKUP`, ver sección "Peso inicial estimado por ejercicio" más arriba) son **2 programas de ejercicio distintos** (documentado desde el 2026-07-30 como "5ª estructura duplicada", split de push/cardio/natación/HIIT/piernas vs. split de brazos/piernas A-B) — el de "Hoy toca" ya tenía peso desde la ronda anterior, el de "Mi Día" nunca lo tuvo, así que se veían inconsistentes entre sí el mismo día.

- **Los 12 ejercicios con peso de `e1`-`e5` (`dashboard.html` y `Coach_v2.html`) ganaron `· Xkg / Ylb`** al final de su texto, sin tocar la estructura de datos (siguen siendo un string plano `"Ejercicio — series×reps"`, ahora `"Ejercicio — series×reps · peso"` — `subtareasHtml()` ya separaba en product/acción por el primer " — ", el peso solo se agregó dentro del segmento de acción, cero cambios de código necesarios para que se viera).
- **"Basate en los ejercicios que ya tienen peso"**: para los 9 ejercicios de `e1`/`e5` que tienen equivalente directo en `EJ_LOOKUP` (Press de banca, Press militar, Elevaciones laterales, Fondos en banco, Sentadilla con barra, Peso muerto rumano, Hip thrust, Elevación de pantorrilla, y Zancadas — reusando el valor de "Zancadas" para la línea combinada "Zancadas o sentadilla búlgara"), se copió el mismo `pesoIni` exacto ya establecido ahí — nunca 2 números distintos para el mismo movimiento. Los 3 que no tienen equivalente exacto (Press inclinado **con mancuerna**, que en `EJ_LOOKUP` solo existe con barra) se calibraron con el mismo criterio de fuerza media-baja sobre 77kg: 12kg/26lb c/u.
- **Ejercicios de peso corporal o cardio puro también se completaron** para que ningún ejercicio de `e1`-`e5` se quedara sin indicación: Fondos en banco, Plancha, Elevación de piernas, Plancha lateral y Battle ropes/burpees → "peso corporal"; Cardio continuo y HIIT se dejaron sin peso (no aplica, son de tiempo/ritmo, igual que Caminata/Elíptica/Nadar en `EJ_LOOKUP`).
- Verificado con Node que `RUTINA_TASKS` sigue idéntico entre los 2 archivos (mismo único diff preexistente de `k5`) y con Playwright (reloj fijado a lunes 17:45) que los 5 ejercicios del bloque de hoy muestran su peso en la línea de tiempo — "Press de banca — 4×8 · 40kg / 88lb" igual que en el panel "Hoy toca" — cero errores de consola.

## Lista de Compras → Comida: precio real del ticket de Walmart vs. estimado (2026-08-11)

Pedido explícito: Adán mandó una foto de su ticket de Walmart (10-ago-2026, 22:51h) y pidió *"saca el precio unitario y ponlo de acuerdo al producto de mi lista de supermercado y los que falten, pues investiga mas o menos cuanto cuesta pero ponlo de otro color para que sepa cuales son verdad, las compras que aparecen en dashboard"* — es decir, precio junto a cada uno de los 30 productos de `LISTA_COMPRAS.comida` (slide 🛒 Lista de Compras), distinguiendo visualmente cuáles vienen del ticket real y cuáles son estimados.

- **`LISTA_COMPRAS_PRECIOS`** (nueva constante, justo después de `LISTA_COMPRAS`) — un objeto plano `{ 'Nombre exacto del producto': {precio, real, nota?} }`. Las 30 claves son un calco exacto de los 30 textos de `LISTA_COMPRAS.comida` (verificado con Node: 0 huérfanos en ambos sentidos) — no toca `LISTA_COMPRAS` en sí a propósito, para no romper los ids de checkbox ya persistidos en `dash-lista-compras` (`lcItemId()` sigue derivando del mismo string que antes).
- **11 productos `real:true`** (del ticket, algunos ya traían descuento aplicado — se usó el precio final pagado, no el de lista): Aguacate $59/kg, Cebolla $62/kg, Jitomate $15/kg, Papaya $40/kg, Plátano $24/kg, Huevo $29 (Bachoco), Queso panela $42 (con descuento), Atún en agua $20/lata (con descuento), Jamón de pavo $57/250g, Pechuga de pollo $66/paquete, Pan integral $75/paquete grande.
- **3 de esos 11 llevan `nota`** (tooltip al pasar el mouse sobre la píldora) porque el producto del ticket no es idéntico al de la lista, solo el más parecido: "Jamón Virginia" (no dice "de pavo" en la etiqueta), "Milanesa de Pechuga" (mismo corte, ya fileteado) y "Pan Doble" Bimbo Doble Fibra (no dice "integral"). Mismo criterio de transparencia para los que **no** se marcaron reales aunque el ticket trajera algo parecido: Filete de tilapia (el ticket trae Filete de Basa, pez distinto), Leche entera (el ticket trae Lala Deslactosada) y Yogurt griego natural (el ticket trae Yoplait, no es griego) — estos 3 quedaron `real:false` con su propia nota explicando qué se compró en realidad.
- **19 productos `real:false`** — precios investigados por categoría: los de mayor certeza vienen de Profeco "Quién es Quién en los Precios" (ago-2026: aceite vegetal ~$20/L, arroz ~$28.50/kg, frijol ~$32/kg, tortilla de maíz ~$17/kg) y de resultados de Walmart México para carnes/pescado (milanesa de pechuga ~$250/kg — coincide con el precio real del ticket para ~265g, buena señal de que la calibración es razonable; filete de tilapia $115-147/kg; molida de res $122-239/kg). El resto de frutas/verduras sin dato directo se calibraron a ojo contra los 5 precios reales de fruta/verdura del mismo ticket (aguacate/cebolla/jitomate/papaya/plátano), no inventados desde cero.
- **`lcPrecioHtml(cat,txt)`** (nueva) — solo pinta algo si `cat==='comida'` y existe una entrada en `LISTA_COMPRAS_PRECIOS`; para las otras 4 categorías (skincare/cabello/suplementos/libros) devuelve `''`, cero cambio visual ahí. Se llama desde `lcRenderItems()`, entre el `<label>` y los links de tienda.
- **Píldora `.lc-price`** — verde (`.lc-price-real`, `var(--g)`) con ícono `✓` para precio real, naranja (`.lc-price-est`, `var(--o)`) con ícono `≈` para estimado; mismo lenguaje visual de badges que ya usa el resto del Dashboard (`rgba()` translúcido + borde del mismo color). `renderListaCompras()` agrega además una leyenda fija (`.lc-price-leyenda`) arriba de la lista, solo en la pestaña Comida, explicando qué significa cada color — necesaria porque el color solo no es suficiente (accesibilidad y porque "✓"/"≈" ya lo refuerzan en texto, no dependen solo del color).
- **No se duplicó en `Coach_v2.html`** — `LISTA_COMPRAS` (y por lo tanto estos precios) solo existe en este archivo; Coach no tiene su propia Lista de Compras, así que no hay nada que sincronizar del lado de Coach para este cambio.
- Verificado con Node: los 30 textos de `LISTA_COMPRAS.comida` tienen entrada en `LISTA_COMPRAS_PRECIOS` y viceversa (0 sin precio, 0 huérfanos), 11 reales / 19 estimados; balance de `{`/`}` del CSS 482/482; los 2 bloques `<script>` reales pasan `new Function()` sin errores.

## Lista de Compras: total de lo marcado + botón para vaciar el checklist (2026-08-11, mismo día)

Pedido explícito, mismo día que el precio real/estimado de arriba: *"en esa misma seccion las cosas que marque en el checklist debemos sumar la cantidad total de cuanto me costara y ademas añade un boton para borrar la seleccion de productos cuando vaya al super de nuevo"*.

- **`monto` (número en MXN)** — cada entrada de `LISTA_COMPRAS_PRECIOS` ganó este campo, distinto de `precio` (el texto que ya mostraba la píldora, casi siempre unitario o por kg — útil como referencia de mercado pero no sumable directo). `monto` es cuánto costaría una compra típica de una sola vez de ese producto: para los productos por peso con dato real del ticket, la cantidad exacta que Adán compró ese día (aguacate 0.2kg→$12, cebolla 0.375kg→$23, jitomate 0.38kg→$6, papaya 1.43kg→$57, plátano 0.895kg→$21); para el resto, una porción razonable (≈0.3-1kg fruta/verdura, 0.5kg carne/pescado, 1 paquete/lata/frasco/bolsa). Por diseño casi nunca coincide con el número que aparece en `precio` (ese es unitario, `monto` ya multiplicó por la cantidad típica) — la píldora del producto no cambió, sigue mostrando `precio`.
- **`lcTotalComida(checks)`** (nueva) — recorre los 30 productos de `LISTA_COMPRAS.comida`, suma `monto` de los que estén marcados en `checks` (mismos ids `lcItemId('comida',txt)` de siempre) y regresa `{total,n}`. Solo tiene sentido para `comida` (es la única categoría con precios) — no se llama para skincare/cabello/suplementos/libros.
- **Barra `.lc-toolbar`** (nueva, arriba de la lista) — a la izquierda el total en vivo (`#lcTotalBar`, solo visible en la pestaña Comida: "🧮 Total marcado: $XXX (N productos)", con un `title` explicando que asume cantidades típicas, no las que tú elijas ese día); a la derecha el botón **"🗑️ Vaciar marcados"**, visible en las 5 categorías.
- **`vaciarListaCat(cat)`** (nueva) — borra de `dash-lista-compras` los ids de todos los productos marcados de la categoría activa (no las 5 categorías a la vez — cada botón solo vacía su propia pestaña) y vuelve a pintar la lista. Pide `confirm()` antes de borrar (texto dinámico, "¿Vaciar los N productos marcados de 'X'? No se puede deshacer.") — es una acción destructiva sobre progreso ya marcado, sin manera de deshacerla, así que no corre en silencio; si no hay nada marcado, no hace nada (ni siquiera pregunta).
- **`toggleListaItem(id)` gana una línea más** (`actualizarLcTotal()`) tras guardar el checkbox — actualiza *solo* el texto de `#lcTotalBar` con `outerHTML` (no re-pinta toda la lista), mismo criterio que ya usaba `renderListaCatTabs()` ahí desde el 2026-08-07: si se repintara la lista completa en cada click se perdería el scroll/foco a medio marcar.
- Verificado con Node: los 30 productos de `comida` tienen `monto` numérico (0 sin dato); sumando los 30 (caso "marca todo") da $1,206 MXN, en el mismo orden de magnitud que el subtotal real del ticket de Walmart ($1,094.99 por 36 artículos) — consistente, ya que la Lista de Compras es un subconjunto curado de 30 básicos de dieta, no la compra completa de esa visita. Balance de `{`/`}` del CSS y `new Function()` sobre los 2 bloques `<script>` reales, ambos sin errores.

## Imagen de cada ejercicio al tocar su nombre en "🏋️ Hoy toca" (2026-08-11, mismo día)

Pedido explícito: *"en el dashboard, vez que me muestras los ejercicios en un pequeño recuadro, cuando toque el nombre del ejercicio, debes mostrarme la imagen que tienes en el html, de ese ejercicio, para ver como es"* — el "pequeño recuadro" es cada `.hp-ex-row` dentro del panel "🏋️ Hoy toca" (`renderHeroGymPanel()`), y "la imagen que tienes en el html" son los diagramas de Wikimedia Commons que ya existían en `CuidadoPersonal/ejercicio.html → EJ_DB` pero que `EJ_LOOKUP` (la copia ligera de este archivo, ver nota de esa constante) nunca había incluido.

- **`EJ_LOOKUP` ganó el campo `img`** en 26 de sus 31 ejercicios — mismas URLs de Wikimedia Commons que `EJ_DB`, copiadas a mano (verificado con Node: las 26 son byte-idénticas a su fuente en `ejercicio.html`, 0 mismatches). Los otros 5 (`e037` Sentadilla Búlgara, `e045` Plancha, `e051` Caminata en Cinta, `e054` Elíptica, `e057` Nadar) se quedan sin `img` porque **`EJ_DB` tampoco tiene imagen para ellos todavía** — toda la categoría Cardio de `EJ_DB` carece de `img` salvo lo que ya cubre la sección Deportes (Natación), y esos 2 de fuerza nunca tuvieron una asignada. No se inventó ninguna URL para rellenar el hueco.
- **`.hp-ex-name` ahora es clicable** (`onclick="verImagenEjercicio(ej.id)"`, `title="Ver imagen"`) — ganó subrayado punteado + color de acento al pasar el mouse (mismo lenguaje que un link, sin dejar de ser texto dentro de un `<span>`) para que se note que se puede tocar; antes era texto plano sin ninguna señal visual de interacción.
- **`verImagenEjercicio(id)`** — busca el ejercicio en `EJ_LOOKUP`, y si trae `img` pinta un `<img>`; si no, muestra un aviso ("🖼️ Todavía no tengo una imagen guardada para...") en vez de un ícono de imagen rota o fallar en silencio. `cerrarImagenEjercicio()` la cierra.
- **`#ejImgOverlay`** (nuevo, junto a `#metaDetailOverlay` en el HTML) — overlay fijo con blur de fondo, tarjeta centrada (imagen + nombre + técnica en 1 línea), mismo patrón de interacción que ya tenía el overlay de detalle de metas: clic fuera de la tarjeta cierra (`if(event.target===this)`), botón `✕`, y tecla `Escape` (agregada al listener global de teclado que ya traía el caso de `metaDetailOverlay`). CSS propio (`.ej-img-*`) mucho más simple que `.meta-detail-*` — sin hero de fondo ni checklist, solo imagen + texto.
- Verificado con Node: comparación campo por campo de `EJ_LOOKUP` contra `EJ_DB` (mismo id → mismo `img`, o ambos sin `img`) — 0 discrepancias en los 31 ejercicios; balance de `{`/`}` del CSS y `new Function()` sobre los 2 bloques `<script>` reales, ambos sin errores; balance de `<div>` en todo el archivo (281/281).

## "Ideas para hoy" — costo aproximado de cocinar cada receta, al hacer click (2026-08-11, mismo día)

Pedido explícito: *"en ideas para hoy, vez que me hiciste desayunos y cena de acuerdo a mi carrito de compras, entonces ya tienes el precio, cuando haga click en cada comida o cena, debes mostrarme cuanto me costaria cocinarme eso, de acuerdo a todos los ingredientes"*.

- **`costoAprox` (nuevo campo numérico, MXN)** — cada una de las 18 recetas de `RECETAS_MINI` (10 desayuno + 8 cena) lo ganó. A diferencia de `monto` en `LISTA_COMPRAS_PRECIOS` (costo de comprar el producto completo, para el total de la Lista de Compras — ver sección de arriba), `costoAprox` suma el costo de **cada ingrediente en la cantidad exacta que pide esa receta** ("Pan integral · 2 rebanadas", no el paquete completo).
- **Metodología** (documentada en un comentario extenso justo arriba de `RECETAS_MINI`): se derivó una tarifa por gramo/ml/pieza a partir del mismo `precio` de `LISTA_COMPRAS_PRECIOS`, con un tamaño de presentación típico supuesto para cada producto empaquetado — huevo $29/cartón de 18 → $1.6/pza, clara $45/envase 946ml → ~$1.6/pza (33ml), queso panela $42/paquete ~400g, yogurt griego $38/envase ~1kg, jamón de pavo $57/250g, pan integral $75/paquete ~24 rebanadas, tortilla $17/kg (~25g/pza), aceite de oliva $150/500ml, miel $90/frasco 500g, granola $60/bolsa 400g, frijoles negros $24/lata 560g, atún $20/lata completa (la receta ya pide "1 lata", sin conversión). Arroz blanco cocido usa el equivalente en crudo (÷3, el arroz casi triplica su peso al cocer) sobre $28/kg. "Cebolla · poca" (única cantidad no numérica del catálogo) se estimó en 30g. Fruta/verdura y carne/pescado usan directo el `precio` por kg de esa constante (÷1000 para $/g).
- **No se implementó como un parser genérico de texto libre en runtime** — los 72 renglones de ingrediente (18 recetas × ~4) tienen formato inconsistente a propósito legible para humanos (comas descriptivas: ", picado", ", sin semillas"; paréntesis: "(2-3 rebanadas)"; adjetivos: "mediana", "grandes"; y un caso sin cantidad numérica, "poca") — un parser automático sería frágil ante esos casos. En vez de eso, cada uno de los 18 totales se calculó una sola vez con un script de Node (`costo_recetas.js`, en el scratchpad de la sesión, no versionado) que sí modela cantidad × tarifa por ingrediente, y el resultado ya redondeado se guardó como número fijo — mismo patrón que ya usa el resto del archivo para datos derivados (`monto`, `pesoIni`, etc.): calculado una vez con cuidado, actualizado a mano si cambian las recetas o las tarifas.
- **UI** — `.hp-meal-costo` (línea nueva, verde, monoespaciada, "🧮 Costo aproximado: ~$XX MXN") se agrega **dentro** de `.hp-meal-ing`, el bloque que ya solo aparece al expandir la receta (`toggleRecetaCard()`) — no se ve mientras la lista está contraída, tal como se pidió ("cuando haga click"). `title` en el propio elemento aclara que es una suma por ingrediente, no el precio de comprar el producto completo.
- Rango resultante: desayunos $9-25 MXN, cenas $17-59 MXN (las de pechuga de pollo/filete de res, con 150-180g de proteína cara por porción, son las más caras — consistente con que la proteína domina el costo de cualquier plato).
- Verificado con Node: las 18 recetas tienen `costoAprox` numérico (0 sin dato); balance de `{`/`}` del CSS (499/499) y `new Function()` sobre los 2 bloques `<script>` reales, ambos sin errores; balance de `<div>` en todo el archivo (282/282).

## "Ideas para hoy" — precio junto a cada ingrediente, no solo el total (2026-08-11, mismo día)

Segundo pedido el mismo día, sobre lo de arriba: *"esta bien, pero en cada producto de la comida o receta, pon el precio"*.

- **`ing` pasó de array de strings a array de `{txt,costo}`** en las 18 recetas de `RECETAS_MINI` — `txt` es el mismo texto de siempre ("Pan integral · 2 rebanadas"), `costo` (MXN) es el precio de esa cantidad exacta, con la misma metodología de tarifa por gramo/ml/pieza documentada en el comentario extenso arriba de `RECETAS_MINI` (ahora también menciona el `costo` por ingrediente, no solo el total).
- **`costoAprox` de cada receta se recalculó como la SUMA de los `costo` ya redondeados de sus ingredientes**, no el total redondeado por separado — antes (sección de arriba) `costoAprox` venía de redondear la suma sin redondear de los ingredientes, y al desglosar por ingrediente eso generaba diferencias de ±$1 contra la suma visible de las partes en 8 de las 18 recetas (p. ej. Yogurt griego con granola: ingredientes redondeados $8+$5+$3+$10=$26, pero el `costoAprox` viejo decía $25). Se corrigieron los 8 `costoAprox` afectados para que siempre cuadren exacto con lo que el usuario ve sumado a mano — verificado con Node comparando `costoAprox` contra `ing.reduce((s,i)=>s+i.costo,0)` en las 18 recetas: 18/18 consistentes.
- **`.hp-ing-costo`** (nueva) — píldora verde monoespaciada al final de cada renglón de ingrediente dentro de `.hp-meal-ing` (`$X`), aprovechando que `.ds-row` ya es `display:flex` con `.ds-txt` en `flex:1` — cae alineada a la derecha sin tocar ese componente compartido con "Importante este mes"/pasos de deuda del Coach.
- Verificado con Node: sintaxis de los 2 bloques `<script>` reales (`new Function()`, sin errores), balance de `{`/`}` del CSS (500/500), balance de `<div>` en todo el archivo (282/282), y consistencia total↔ingredientes ya descrita arriba (18/18).

## Imagen de Hip Thrust dibujada a mano — en EJ_DB compartía imagen con Glute Bridge (2026-08-11, mismo día)

Pedido explícito: *"el ejercicio de hip trust la imagen no es igual a las demas, mejor creala tu y ponla ahi"*.

- **Causa raíz** — en `CuidadoPersonal/ejercicio.html → EJ_DB`, `e041` (Hip Thrust) y `e042` (Glute Bridge) tienen literalmente la misma URL de imagen (`Glute-bridge.png` de Wikimedia Commons). Son ejercicios distintos: Hip Thrust usa banco + barra cargada sobre la cadera, Glute Bridge es en el piso, normalmente sin peso — por eso la imagen de Hip Thrust "no era igual a las demás", mostraba el ejercicio equivocado, no solo un estilo distinto.
- **No hay herramienta de generación de imágenes disponible en esta sesión** — sin acceso a un modelo de imagen ni a internet para buscar una foto real alternativa, la solución fue dibujar un diagrama propio en SVG (banco de lado + figura de líneas en la posición alta del hip thrust — hombros en el banco, cadera elevada, rodilla doblada, pie en el piso — con un disco de barra sobre la cadera), mismo estilo minimalista de líneas negras que ya usan las otras 25 imágenes de `EJ_LOOKUP`. Sin poder previsualizar el render visualmente en esta sesión (no hay herramienta de captura de pantalla), las coordenadas se calcularon a mano sobre una cuadrícula de 300×200 en vez de "a ojo", para minimizar el riesgo de que algo quedara desproporcionado.
- **Solo `Dashboard/dashboard.html → EJ_LOOKUP.e041.img` cambió** — ahora es un `data:image/svg+xml;base64,...` inline (no depende de ningún archivo ni de internet, a diferencia del resto que sigue apuntando a Wikimedia). **`EJ_DB` de `ejercicio.html` NO se tocó** — ese archivo sigue mostrando la imagen equivocada (compartida con Glute Bridge) si Adán abre el detalle de Hip Thrust ahí; corregirlo es un cambio aparte, pendiente si lo pide.
- Verificado con Node: el `base64` decodifica exactamente al SVG fuente (`Buffer.from(b64,'base64').toString() === original`, sin diferencias), los 2 bloques `<script>` reales pasan `new Function()` sin errores, balance de `<div>` sin cambios (282/282, el `<div>` real del documento no se tocó — todo lo nuevo vive dentro del `data:` URI, que no cuenta como HTML real).

## Habilidades Base: de 8 a 15 tarjetas — se suma "Habilidades de Valor" de Coach (2026-08-11, mismo día)

Pedido explícito: *"en la seccion del dashboard Lo que todo hombre debería saber hacer añade otras cosas que no tenemos, en coach hay una seccion de habilidades de valor, añade todo eso en el dashboard, del mismo estilo en que estan ya y muy completa"*.

- **Nota sobre la entrada anterior de este mismo readme** ("Imagen de Hip Thrust..."): ahí se documentó "no hay acceso a internet" porque en ese momento no se había probado — en este cambio sí se confirmó acceso de red real (`curl` desde Bash), y se usó para verificar cada imagen nueva con HTTP 200 antes de usarla, igual que ya hacían `TIPO_FOTO`/`META_DETALLE`/las 8 fotos viejas de `HABILIDADES_BASE`.
- **7 tarjetas nuevas en `HABILIDADES_BASE`** (`modales`, `fogata`, `vino`, `coctel`, `nudos`, `mecanica`, `auxilios`) — mismo catálogo completo de `Coach/Coach_v2.html → #habilidades-valor` ("🎩 Habilidades de un Hombre de Valor"), sus 7 tarjetas (Modales y etiqueta, Fogata, Vino, Coctelería, Nudos, Mecánica de auto, Primeros auxilios). No se duplicó la 8ª pieza de esa sección de Coach (el checklist "✅ Cuáles ya dominas", `hv1`-`hv7`) porque es un resumen de esas mismas 7, no una habilidad distinta. Total: 8→15.
- **7 entradas nuevas en `HABILIDAD_DETALLE`** con el mismo formato `{titulo,frase,pasos:[{t,d}]}` que ya usaban las 8 — contenido real de Coach, condensado a pasos accionables (5-6 por habilidad), no resumido a una frase genérica. Ejemplo de fidelidad: los 4 nudos de Coach (as de guía, ocho, llano/rizo, ballestrinque) son los mismos 4 pasos aquí, con la misma explicación de cuándo usar cada uno.
- **Fotos**: Unsplash para las 5 de "estilo de vida" (modales — mesa formal servida, vino — sirviendo una copa, coctel — bartender preparando un trago, nudos — cuerda amarrada a un árbol, mecánica — hombre cambiando una llanta), Wikimedia Commons para las 2 más "documentales" (fogata — foto real de una fogata encendida, auxilios — entrenamiento de RCP con maniquí). Las 15 URLs (8 viejas + 7 nuevas) se verificaron juntas con `curl -o /dev/null -w "%{http_code}"`: 15/15 responden 200.
- **`.img-goal-grid-8` (fija a 4×2=8 celdas) ya no alcanzaba para 15** — se reemplazó por `.img-goal-grid-4col`: mismas 4 columnas, pero filas automáticas (`grid-auto-rows:minmax(150px,1fr)` en vez de `grid-template-rows:repeat(2,1fr)`) más `overflow-y:auto`, para que crezca a cualquier número de tarjetas sin aplastarlas ni recortar la última fila — mismo patrón de "scroll interno si no cabe" que ya usan `#listaCompraBody`/`.hp-meal-list` en otras secciones. Con 15 tarjetas en 4 columnas quedan 4 filas (3 completas + 1 de 3). El único sitio que usaba la clase vieja (`#habilidadesGrid`) se actualizó; no quedan referencias a `.img-goal-grid-8` en el CSS ni el HTML (verificado con grep).
- Verificado con Node: 15 ids únicos en `HABILIDADES_BASE`, sin duplicados; los 15 tienen entrada en `HABILIDAD_DETALLE` y viceversa (0 huérfanos en ambos sentidos); las 15 traen `img`; balance de `{`/`}` del CSS (500/500) y `new Function()` sobre los 2 bloques `<script>` reales, ambos sin errores; balance de `<div>` en todo el archivo (282/282).

## Móvil: barra superior colapsada, sin controles de "cambiar slide", y arranca siempre pausado (2026-08-11, mismo día)

Pedido explícito, en 3 partes (mismo mensaje): *"la version de movil se ve muy bien pero abajo estan amontonados lo que hace de cambiar de slide y lo que te lleva directo a que pagina de dashboard quieres, quiero que detectes cuando uso un celular y ocultes la de cambiar slide y acomodalo esteticamente bien"*; *"ademas en comportamiento general, siempre pausa la transicion y que no se mueva de la pagina 1, debo hacer click en la opcion de play para que se transicione automaticamente"*; *"y de primera estancia en la version movil, colapsame todos los botones y cuando haga click en esa seccion muestramelos todos, por que siento que me roban espacio"*.

- **Rotación automática arranca pausada, siempre (no solo en celular)** — `let cur=0, playing=false, timer=null;` (antes `playing=true`, arrancaba avanzando de slide solo desde el segundo 1). El glifo inicial de `#playBtn` en el HTML pasó de `⏸` a `▶` para no mentir sobre el estado real antes de que corra ningún JS. `togglePlay()` sigue siendo la única forma de arrancar la rotación — sin tocarla, ya hacía exactamente lo que se pedía una vez que `playing` arranca en `false`. No afecta el ajuste "recordar en qué slide me quedé" (`dash-settings.remember`) — sigue siendo independiente: decide EN QUÉ slide abre, esto decide si avanza solo o no.
- **"Detectar celular" se hizo con media query, no con JS** — mismo criterio que el resto del archivo (nunca hay sniffing de user-agent aquí). ≤480px ya era el breakpoint "iPhone" establecido en este archivo (ver el comentario de 2026-08-03 arriba de `@media(max-width:480px)`), así que los 2 cambios de móvil de este pedido viven ahí, sin crear un breakpoint nuevo.
- **`.hud-slidenav`** (nueva clase compartida) en `‹` (`prevSlide()`), `#dots` y `›` (`nextSlide()`) dentro de `.hud-side-right` — `display:none` solo dentro de `@media(max-width:480px)`. En celular, cambiar de slide ya se puede hacer por swipe (el listener de touch existente, ver más abajo en el JS) o tocando un ícono de `#hudNav` (salto directo a esa pantalla) — `‹`/puntos/`›` quedaban redundantes y eran justo lo que se veía "amontonado" encima del contenido en la captura que mandó Adán. `▶`/`⏸` **no** se oculta — sigue siendo el único control que arranca la rotación automática.
- **Barra superior (`#qaBar`, 10 píldoras + "Ocultar finanzas") colapsada de entrada en celular** — el HTML ahora trae `<div class="qa-bar qa-collapsed" id="qaBar">` desde el inicio. `.qa-toggle-btn` (nuevo, "🔗 Apps ▾") es el primer elemento que pinta `renderQuickApps()`: `display:none` en escritorio (la barra se ve exactamente igual que siempre ahí, cero cambio visual), `display:inline-flex` dentro de `@media(max-width:480px)`. Mientras `#qaBar` tenga `.qa-collapsed`, esa misma media query oculta `.qa-pill`/`.priv-btn` — en celular solo se ve el botón "🔗 Apps" hasta que se toca. `toggleQaBar()` quita/pone la clase en el contenedor (no en el `innerHTML` que regenera `renderQuickApps()` en cada cambio de slide, así el estado abierto/cerrado sobrevive al navegar entre pantallas) y llama a `syncSlidesTop()` — la misma función que ya recalculaba el alto reservado arriba de `.slides`, así que colapsar de verdad le devuelve ese espacio al contenido en vez de solo esconder visualmente las píldoras y dejar el hueco vacío.
- Verificado con Node: los 2 bloques `<script>` reales pasan `new Function()` sin errores, balance de `{`/`}` del CSS (506/506), balance de `<div>` en todo el archivo (282/282 — hubo un falso positivo de 283/282 a medio camino por un comentario CSS que mencionaba `<div id="qaBar">` como texto, mismo tipo de problema que ya pasó una vez con la palabra "script" en Coach — se reescribió el comentario sin el tag literal en vez de dejarlo).
- **Ajuste el mismo día, tras verlo en el celular real**: *"la barra superior debe abarcar todo el rectangulo de arriba, osea la misma altura esta bien, pero el ancho que abarque todo lo largo de arriba"* — colapsada, `.qa-toggle-btn` se veía como una píldora chica centrada con espacio vacío a los lados. `.qa-bar.qa-collapsed .qa-toggle-btn{width:100%;justify-content:center;border-radius:12px}` la estira a todo el ancho de la barra (la altura no se tocó, sigue igual) — el radio de borde bajó de la píldora completa (30px) a 12px para que no se vean "muescas" en las esquinas de un botón tan ancho.

## Mis Metas → Corto/mediano plazo: faltaban el 11K del IPN y Básico 5 de alemán (2026-08-11, mismo día)

Pedido explícito: *"en las metas a corto y mediano plazo, no pusiste mi carrera de 11k ni que estaba estudiando aleman"* — corrige una omisión de una ronda anterior el mismo día: esas 2 metas ya logradas se habían agregado a `Coach/Coach_v2.html → #perfil-metas` (tarjeta "🏆 Ya logradas") pero, a propósito, no a este archivo, con el razonamiento de que el sistema de tarjetas con foto de "Mis Metas" es para metas **activas** (checklist + barra de progreso 0→100%) y no para hechos ya cumplidos. Adán corrigió: sí las quiere también aquí.

- **`cortoMediano` subió de 5 a 7 tarjetas** — `ipn11k` ("Correr los 11K de la Carrera IPN (1:10:00)") y `aleman5` ("Básico 5 de alemán (CENLEX Santo Tomás)"), con foto real verificada (misma disciplina de siempre: `curl -o /dev/null -w "%{http_code}"` antes de usarlas, 200 en ambas) — una meta de línea de llegada para el 11K, tiles de Scrabble (aprendizaje de idioma) para el alemán.
- **No son un badge estático "100%"** — usan el mismo mecanismo de checklist real que el resto de `META_DETALLE` (un solo paso, "Meta cumplida", con la fecha/dato real), para no crear un caso especial en `detailPct()`/`pintarDetailOverlay()`/`imgListHtml()` (funciones compartidas con Habilidades Base). En vez de eso, **se siembran ya marcadas** la primera vez que se abre el Dashboard en un navegador: `seedMetasLogradasIfNeeded()` (nueva, mismo patrón que `fixBanamexIfNeeded()`/`fixMiercolesNatacionIfNeeded()` — bandera propia en localStorage, corre una sola vez, nunca vuelve a forzar el valor después) mete `{0:true}` en `metas_checklist_v1.ipn11k`/`.aleman5` si no existían aún. Si Adán decide desmarcarlas manualmente después, se quedan desmarcadas en la siguiente carga — el seed no es una regla permanente, es un valor inicial razonable.
- **`.img-goal-grid` (base, usada tal cual por `cortoMediano`) pasó de `grid-template-rows:repeat(3,1fr)` fijo a `grid-auto-rows:minmax(150px,1fr)` + `overflow-y:auto`** — con 5 tarjetas (impar) cabían exactas en 3 filas fijas (la última ocupando las 2 columnas, por `.img-goal-cell:last-child:nth-child(odd)`); con 7 (también impar) hacían falta 4 filas, y la 4ª se quedaba sin `grid-template-rows` que la cubriera — mismo problema, mismo arreglo que ya se aplicó a Habilidades Base (`.img-goal-grid-4col`) horas antes el mismo día. Verificado que esto no afecta a `largoExtras` (usa `.img-goal-grid-sm`, que redefine `grid-template-rows` por su cuenta) ni a Habilidades Base (`.img-goal-grid-4col`, ídem) — son las 3 únicas variantes que usa el archivo, confirmado con grep antes de tocar la regla base compartida.
- Verificado con Node: `ipn11k`/`aleman5` existen en `META_DETALLE` con el contenido esperado; las 2 URLs de imagen embebidas responden 200; balance de `{`/`}` del CSS (507/507) y `new Function()` sobre los 2 bloques `<script>` reales, ambos sin errores; balance de `<div>` en todo el archivo (282/282).

## Mis Metas: ícono de KPI más chico, barras más delgadas, tarjetas con foto mucho más compactas (2026-08-11, mismo día)

Pedido explícito, con captura de la fila de KPIs: *"acomoda el tamaño para que aparezcan todas y no use el scroll down, ademas esto de la imagen hazlo muchisimo mas pequeño y la lineas bar mas delgadas"*.

- **"La imagen" del emoji en los 4 KPIs (`#metasProgreso`)** — el emoji (🆘/💳/🎓/💰) vivía suelto dentro de `.lbl` y heredaba su mismo `font-size` (10-12px) que el texto en mayúsculas junto a él, pero un emoji a color se renderiza visualmente mucho más grande que texto latino al mismo tamaño nominal (típico de las fuentes de emoji de iOS/Android) — por eso se veía como una "imagen" fuera de proporción, tal cual se ve en la captura. Se envolvió en `<span class="metas-kpi-ico">`, con `font-size:12px` fijo, desacoplado del texto.
- **Barras de los 4 KPIs, mucho más delgadas** — `#metasProgreso .pbar{height:5px}` (antes 11px, la altura genérica de `.pbar` que comparten decenas de barras en todo el Dashboard — se dejó esa regla base intacta y se agregó una más específica solo para esta fila, para no adelgazar barras de otras secciones que nadie pidió tocar). De paso, `#metasProgreso .tile{padding:12px 16px}` (antes `clamp(16px,2vw,26px)` genérico de `.tile`) para ganar algo más de alto disponible para lo de abajo.
- **Tarjetas con foto de "Corto & mediano plazo"/"Largo plazo", mucho más chicas** — el mínimo de alto por fila de `.img-goal-grid` bajó de `150px` a `64px` (agregado esa misma mañana al subir `cortoMediano` de 5 a 7 tarjetas, ver sección de arriba) — con 7 tarjetas en 4 filas, 150px mínimo casi siempre disparaba el scroll interno; a 64px caben dentro del alto real disponible en la mayoría de pantallas sin necesitarlo. `gap` de 10px→6px, radio de esquina 16px→12px, texto superpuesto `clamp(10-12px)→clamp(9-11px)` con menos padding, y la barra de check debajo de cada foto (`.img-goal-pbar`) de 6px→4px — todo proporcional a que la tarjeta ahora es mucho más baja. El `overflow-y:auto` que ya traía la regla no se quitó — sigue como respaldo si en una pantalla muy angosta aun así no alcanza, en vez de aplastar las fotos hasta ilegibles.
- Verificado con Node: balance de `{`/`}` del CSS y `new Function()` sobre los 2 bloques `<script>` reales, ambos sin errores; balance de `<div>` en todo el archivo sin cambios (282/282, edición puramente de CSS + un `<span>` nuevo dentro de una plantilla ya existente).
- **Ajuste el mismo día, un pedido más**: *"tambien haz mas pequeña la barra de lo de mi edad"* — la barra de edad (🎂 XX → YY años, arriba de las 7 tarjetas de corto/mediano plazo) es el último elemento de esa tarjeta que quedaba con el tamaño original. `.edad-bar{padding:12px 16px→8px 14px;margin-bottom:14px→8px}` y su `.pbar` (genérico, igual que en los KPIs) bajó de 11px a 5px solo dentro de `.edad-bar`, sin tocar la regla base compartida con el resto del Dashboard.

## Reequilibrio: fotos de metas más grandes, a costa de números/barra de edad/título (2026-08-11, mismo día)

Pedido explícito: *"tambien los numeros de los datos que estan arriba reducelos, por que quiero que esten mas grandes las fotos de metas a mediano y corto plazo, entonces reduce de tamaño lo de mi edad y ademas reduce el titulo de esa pag del dashboard"*. Cambia el criterio de las 2 rondas anteriores del mismo día (que achicaban todo por igual para caber sin scroll) — ahora es un trade explícito: sacrificar tamaño de los elementos de texto/estadística para dejarle más alto real a las fotos, que Adán quiere ver más grandes, no más chicas.

- **Números `$` de los 4 KPIs (`#metasProgreso .big-num`)** — `font-size:clamp(20px,2.2vw,30px)` → `clamp(15px,1.6vw,20px)` (inline, en la plantilla de `renderMetasSlide()` — es el único lugar donde ese tamaño se fija, no hay una clase `.big-num` base con ese valor que tocar).
- **Barra de edad, un paso más chica todavía** (ya se había compactado en la ronda anterior) — `.edad-bar{padding:8px 14px→6px 12px;margin-bottom:8px→6px;border-radius:14px→12px}`, su `.pbar` de 5px→4px, y ahora también `.lbl`/`.sub` (genéricos, se comparten con el resto del Dashboard) se achican solo dentro de `.edad-bar` (`.lbl` a 11px fijo, `.sub` a 10px) sin tocar sus reglas base.
- **Título del slide "🎯 Corto, mediano y largo plazo" — más chico que el resto de los slides, no que todos** — `.slide-title` es una clase compartida por las 8 pantallas del carrusel (Mi Día, Coach, Metas, Habilidades, etc.); achicar esa regla base habría encogido el título de las otras 7 sin que nadie lo pidiera. En vez de eso, nueva regla `.theme-metas .slide-title{font-size:clamp(20px,2.4vw,30px);margin-bottom:clamp(10px,1.4vh,18px)}` — usa la misma clase de tema (`.theme-metas`) que ya trae el `<section>` de este slide para su color de acento, así el override queda scoped sin agregar una clase nueva al HTML. El resto de los slides conserva `clamp(28px,3.6vw,48px)` intacto.
- **`.img-goal-grid` (fotos de corto/mediano plazo) subió su mínimo de fila de 64px a 100px** — con el espacio que liberaron los 3 puntos de arriba, ya no hace falta que las fotos sean tan chicas como en la ronda anterior. El `overflow-y:auto` de respaldo (scroll interno si aun así no cupieran en una pantalla muy angosta) se queda igual.
- Verificado con Node: balance de `{`/`}` del CSS (514/514) y `new Function()` sobre los 2 bloques `<script>` reales, ambos sin errores; balance de `<div>` en todo el archivo sin cambios (282/282, cambios puramente de tamaño en CSS y un valor inline).

## Los 4 KPIs, un tercer achicón (2026-08-11, mismo día)

Pedido explícito: *"haz todavia mas pequeñas los indicadores de arriba, los 4"*.

- **`#metasProgreso.grid{gap:8px}`** (antes heredaba el `gap:clamp(12px,1.4vw,20px)` genérico de `.grid`, compartido con el resto de grids del Dashboard — ahora tiene su propio valor fijo, más chico).
- **`.tile` de estas 4 tarjetas**: padding `12px 16px` → `8px 12px`.
- **Ícono (`.metas-kpi-ico`)**: `12px` → `10px`. **Etiqueta (`.lbl`)**: heredaba `clamp(10-12px)` genérico → fijo `9px` dentro de esta fila. **`.sub`** ("Meta: $10,000" etc.): heredaba `clamp(11-13px)` genérico → fijo `9px`, margen superior `4px→2px`.
- **Número `$` (`.big-num`, inline en la plantilla)**: `clamp(15px,1.6vw,20px)` (de la ronda anterior) → `clamp(12px,1.3vw,16px)`.
- **`.pbar` de estas 4**: `5px` → `4px`, margen superior `6px→4px`.
- Todas las reglas siguen scoped a `#metasProgreso` (o inline en su plantilla) — ninguna clase base genérica (`.tile`, `.lbl`, `.sub`, `.pbar`, `.grid`) se tocó, así que el resto del Dashboard no cambia.
- Verificado con Node: balance de `{`/`}` del CSS (517/517) y `new Function()` sobre los 2 bloques `<script>` reales, ambos sin errores.

## Habilidades Base: de 15 a 18 — brújula, asado+cuchillo, reparaciones del hogar (2026-08-11, mismo día)

Adán preguntó *"lo que todo hombre deberia saber, que mas puedo añadir?"* — se le propusieron 10 candidatas nuevas (hogar/manualidades, aire libre, cuidado personal, seguridad) sin traslape con las 15 ya existentes ni con lo que ya cubre Coach (ventas/liderazgo/networking). Eligió: *"lo de aire libre todo, lo de reparaciones basicas nadamas, pero hay habilidades que pueden ir juntas, ponlas como sea acorde mejor"*.

- **De las 3 de "aire libre" propuestas, 2 se fusionaron en una sola tarjeta** — "Asar carne de verdad" y "Afilar un cuchillo correctamente" quedaron como `asado`: "Asar carne y mantener tu cuchillo afilado", con pasos de ambos temas (control del fuego/2 zonas de calor/sellar y descansar, luego ángulo de afilado/prueba de papel) — afilar bien el cuchillo es parte real de preparar la carne, no una habilidad sin relación. "Orientarte con mapa y brújula" (`brujula`) quedó aparte — no tiene traslape natural con cocina.
- **De "reparaciones", solo la propuesta original** — `reparaciones`: "Reparaciones básicas del hogar" (colgar algo en la pared, destapar un caño, cambiar foco/apagador, usar taladro, kit mínimo). La otra candidata que se había ofrecido ("coser un botón / remendar ropa") no se pidió, no se agregó.
- **`HABILIDADES_BASE` subió de 15 a 18** — `brujula` 🧭, `asado` 🥩, `reparaciones` 🔨 (el ícono de llave inglesa 🔧 ya lo usaba `mecanica`, se eligió martillo para no repetir ícono — verificado con Node: 0 íconos duplicados en las 18). 3 entradas nuevas en `HABILIDAD_DETALLE`, mismo formato `{titulo,frase,pasos}` de 5-6 pasos que el resto. Fotos reales verificadas con `curl` (200 en las 3): brújula sobre un mapa, un hombre asando al aire libre, una persona con un taladro inalámbrico — todas Unsplash.
- **`.img-goal-grid-4col` (Habilidades Base) no necesitó ningún ajuste de CSS** — ya usa `grid-auto-rows:minmax(150px,1fr)` + `overflow-y:auto` desde que se creó (mismo día, sección "de 8 a 15 tarjetas"), diseñado para crecer a cualquier número de tarjetas sin tocar la regla — 18 en 4 columnas simplemente agrega una 5ª fila.
- Verificado con Node: 18 ids únicos, sin duplicados; los 18 tienen entrada en `HABILIDAD_DETALLE` y viceversa (0 huérfanos); las 18 traen `img`; 0 íconos repetidos; las 3 URLs nuevas responden 200; balance de `{`/`}` del CSS (517/517) y `new Function()` sobre los 2 bloques `<script>` reales, ambos sin errores; balance de `<div>` en todo el archivo (282/282).

## Contenido real de progresión (no tips sueltos) + imagen dentro de cada paso — arranca con "Saber nadar" (2026-08-11, mismo día)

Pedido explícito: *"en saber nadar ni siquiera me das las cosas de como hacerlo, debes decirme eso a detalle, pero de progresion, obviamente poco a poco pero que tecnicas, que constancia y demas cosas, hazlo completo, igual si en una subtask me dices eso, estaria muy bien si puedes ilustrarlo a veces con imagenes en hd que encuentres en internet, haz que se vea muy bien y que me sirva, por que asi como esta no me sirve de nada, asi para las demas habilidades"*. Los 6 "pasos" viejos de `nadar` eran tips sueltos sin secuencia ni técnica real — esto rediseña el formato de fondo para todo `HABILIDAD_DETALLE`/`META_DETALLE` (comparten el mismo overlay) y lo aplica primero a `nadar` como plantilla.

- **`pintarDetailOverlay()` gana soporte de imagen por paso** — cada `p` de `info.pasos` ya podía traer `list` (bullets) y `href`/`label` (link); ahora también puede traer `img` (URL), renderizada como `<img class="meta-detail-step-img">` dentro del cuerpo de ese paso específico, no una sola foto genérica arriba del overlay (esa ya existía, es la del `abrirMetaDetalle()`/`abrirHabilidadDetalle()` — portada). Es opcional: los pasos existentes de Mis Metas que no traen `img` se ven exactamente igual que antes, cero regresión visual ahí.
- **`.meta-detail-step-img`** (nueva) — `width:100%;max-height:180px;object-fit:cover;border-radius:10px` — una foto real apoya el texto, no lo reemplaza ni se come media pantalla del overlay aunque la imagen fuente sea muy alta o muy panorámica.
- **`nadar` reescrito de 6 tips a 4 fases reales**, cada una con: rango de semanas + frecuencia de sesión explícita (la "constancia" pedida) en `d`, una lista de técnicas concretas en `list` (nombre del movimiento + cómo hacerlo + por qué, no solo el nombre), y 2 de las 4 fases con foto real verificada con `curl` (200 en ambas): Fase 1 (deslizamiento/streamline) — nadador en alberca; Fase 3 (brazada de crol) — foto de dominio público del Ejército de EE.UU. mostrando "respirando a un lado", exactamente la técnica que describe ese paso. Las fases: (1) comodidad en el agua y respiración, semanas 1-2; (2) patada y respiración lateral, semanas 3-4; (3) brazada de crol, semanas 5-7; (4) resistencia y continuidad, semana 8+ — subiendo de 25m a 500m poco a poco, sin saltos. Sigue usando el miércoles de natación ya agendado en la Alberca Francisco Márquez como el punto de práctica real, no un dato nuevo inventado.
- **El checklist de 4 fases (en vez de 6 tips) cambia qué significa el % de la tarjeta** — antes marcar un tip cualquiera subía el % sin relación real con avanzar de verdad; ahora cada fase marcada es un hito real de la progresión (25%, 50%, 75%, 100%), más honesto con lo que se está trackeando.
- Verificado con Node: `nadar` tiene 4 fases, 2 con `img`, las 4 con `list` de 3-4 técnicas cada una; las 2 URLs de imagen responden 200; balance de `{`/`}` del CSS (518/518) y `new Function()` sobre los 2 bloques `<script>` reales, ambos sin errores; balance de `<div>` sin cambios (282/282).

## Progresión real para las 17 habilidades restantes (2026-08-11, mismo día)

Pedido explícito, inmediatamente después de la sección anterior: *"pero no solo para esa habilidad, lo quiero para todas"* — la plantilla de `nadar` (fases + técnica + constancia explícita + imagen opcional) se replicó en las 17 habilidades restantes en una sola ronda.

- **Las 17 pasaron de listas planas de 5-6 tips sueltos a 2-4 fases cada una** (55 fases en total entre las 18) — cada fase trae: título con nombre de la fase + rango de tiempo/frecuencia de práctica cuando aplica (`t`), una frase de contexto de por qué esa fase importa (`d`), y una lista de técnicas concretas (`list`, nombre del movimiento/paso + cómo + por qué, no solo el nombre suelto). El contenido real (qué hacer) no se inventó de cero para las que ya venían de Coach (`modales`/`fogata`/`vino`/`coctel`/`nudos`/`mecanica`/`auxilios`/`brujula`/`asado`/`reparaciones`) — se reorganizó ese mismo contenido en fases con constancia explícita agregada; para las que nunca habían tenido más que tips (`cocinar`/`armas`/`pelear`/`decirno`/`dinero`/`manejar`/`recuperar`) se escribió progresión nueva desde cero, con el mismo criterio de personalizar con el contexto real de Adán donde aplica (su Registro Diario en `comida.html`, su Plan Maestro de negocio, su bucket list de Tailandia, sus viajes en Didi, su meditación 23:10 ya en rutina, etc. — mismo patrón que ya usaban las 8 habilidades originales).
- **3 imágenes técnicas nuevas, elegidas por valor real, no por completar una cuota** — no se forzó una 2ª foto en las 17 solo por paridad con `nadar`; se agregó donde una imagen aporta algo que el texto solo no puede: `cocinar` (cortes de cuchillo, foto real de alguien cortando verdura), `nudos` (diagrama de 4 pasos del as de guía — Wikimedia, "Bowline in four steps.png"), `auxilios` (diagrama de la maniobra de Heimlich — Wikimedia, dominio público). Las otras 14 se quedaron con solo su foto de portada (ya real y verificada desde que se crearon) — habilidades como "decir que no" o "generar dinero" no ganan nada con una segunda imagen genérica.
- **`mecanica` quedó en 2 fases** (no 3-4 como el resto) — sus 5 pasos originales ya cubrían justo 2 temas reales (emergencias de carretera: llanta + corriente; mantenimiento: aceite + sobrecalentamiento), forzar una 3ª fase artificial no habría agregado nada.
- **El % de progreso de las 18 tarjetas ahora mide hitos reales, no tips sueltos** — mismo cambio de fondo que ya se aplicó a `nadar`: marcar una fase completa (25-33-50% según el total de fases de esa habilidad) es un avance real de la progresión, no una casilla arbitraria.
- **Nota sobre el checklist ya marcado por Adán antes de este cambio**: como el número de "pasos" cambió (de 5-6 tips a 2-4 fases) en las 17, cualquier casilla que ya tuviera marcada en `habilidades_checklist_v1` de una sesión anterior de este mismo día queda re-indexada a un contenido distinto — riesgo cosmético mínimo (checkbox mostrando marcado algo que no es exactamente lo que marcó antes), no funcional, y solo aplica si Adán ya había interactuado con el checklist de estas 17 en las pocas horas entre que se crearon y esta reescritura — no se armó una migración para esto, no vale la pena la complejidad para una ventana de tiempo tan chica.
- Verificado con Node: 18 tarjetas, 0 sin `HABILIDAD_DETALLE`, 0 huérfanos, 55 fases en total, 0 fases sin `list`, 6 fases con `img` (2 de `nadar` + 1 cada una de `cocinar`/`fogata`/`nudos`/`auxilios` — `fogata` reutiliza su misma foto de portada como imagen de la Fase 1, no es una nueva); las 3 URLs de imagen nuevas responden 200; balance de `{`/`}` del CSS (518/518) y `new Function()` sobre los 2 bloques `<script>` reales, ambos sin errores; balance de `<div>` en todo el archivo (282/282).

## Segunda vuelta de profundidad: 5 imágenes más + técnicas adicionales en las fases más delgadas (2026-08-11, mismo día)

Pedido explícito: *"no tienen un gran nivel de detalle, debes hacer casi casi una guia bien detallada con imagenes para todos"*.

- **5 imágenes técnicas nuevas** (verificadas con `curl`, 200 en las 5), elegidas por el mismo criterio de "aporta algo que el texto solo no puede", no por rellenar una cuota en las 18: `manejar` (manos al volante, Fase 3 — manejo defensivo), `modales` (apretón de manos real, Fase 2 — al presentarte), `vino` (copa sostenida, Fase 2 — cómo catarlo), `coctel` (margarita con sal en el borde, Fase 2 — domina 2 primero), `mecanica` (persona trabajando en un motor, Fase 2 — mantenimiento). Con estas 5 más las 6 de la ronda anterior, **11 de las 55 fases ya traen foto real** — de 9 habilidades sin ninguna imagen dentro de sus pasos bajó a 8 (`armas`, `pelear`, `decirno`, `dinero`, `recuperar`, `brujula`, `asado`, `reparaciones`), todas con foto de portada real igual, solo sin una 2ª imagen dedicada a un paso — ahí una imagen adicional no aportaba algo distinto a lo que ya cuenta la portada (`armas`/`pelear`/`brujula`/`asado`/`reparaciones`) o son habilidades sin componente visual real que ilustrar (`decirno`/`dinero`/`recuperar`, son de mentalidad/hábito, no de técnica física).
- **Varias búsquedas de imagen adicionales no llegaron a usarse** porque el resultado más relevante resultó ser contenido premium de Unsplash+ (`plus.unsplash.com`, no descargable/hotlinkable gratis) — se intentaron candidatos para `pelear` (guardia de boxeo), `vino`/`modales` (primeros intentos) y `mecanica`/`reparaciones` (colgar un cuadro) antes de encontrar uno gratuito válido o decidir no forzarlo; ninguna imagen premium se usó.
- **Técnicas adicionales en las fases más delgadas** — `decirno`, `dinero`, `manejar` y `recuperar` (las 4 escritas desde cero en la ronda anterior, sin contenido previo de Coach del que partir) traían fases de 1-2 ítems donde el resto del archivo ya tenía 3-4; se agregó un ítem más de técnica real a 9 fases distintas entre esas 4 habilidades (ej. "estacionarte en batería y en paralelo sin cámara" y "maniobra de reversa con remolque" en `manejar`; "categoriza cada gasto" en `dinero`; "ritual fijo antes de dormir" en `recuperar`; "la regla del amigo" en `decirno`) — mismo criterio de "qué hacer + por qué" que ya usaba el resto, no relleno.
- **Total ahora: 149 técnicas concretas repartidas en 55 fases, 18 habilidades** (antes de esta ronda: ~130 técnicas). El resto del contenido (las 10 habilidades que ya venían con contenido real de Coach, más `nadar`/`cocinar` ya reescritas a fondo la ronda anterior) no se volvió a tocar en este paso — ya tenían 3-4 ítems por fase, el mismo nivel de densidad que se buscaba.
- Verificado con Node: 18 tarjetas, 0 sin `HABILIDAD_DETALLE`, 0 huérfanos, 55 fases, 149 ítems de técnica en total, 11 fases con `img`; las 5 URLs de imagen nuevas responden 200; balance de `{`/`}` del CSS (518/518) y `new Function()` sobre los 2 bloques `<script>` reales, ambos sin errores; balance de `<div>` en todo el archivo (282/282).

## Tercera vuelta: las 13 habilidades sin tocar en la ronda anterior también se profundizan, y las 8 sin imagen ya la tienen (2026-08-11, mismo día)

Pedido explícito: *"pero en todooos, no hiciste cambios en algunos, en algunos debes ir mas alla de lo normal, debes darme mas informacion"* — la ronda anterior solo había tocado 9 de las 18 habilidades (imágenes nuevas en 5, técnica extra en `decirno`/`dinero`/`manejar`/`recuperar`); las otras 13 (`cocinar`, `armas`, `pelear`, `modales`, `fogata`, `vino`, `coctel`, `nudos`, `mecanica`, `auxilios`, `brujula`, `asado`, `reparaciones`) se habían quedado exactamente como en la primera reescritura de fases, sin la 2ª pasada de profundidad. Después, en medio del trabajo, llegó un mensaje adicional: *"cuando termines con esto, revisa todo y ve que puedes mejorar y aplicalo, quiero que todo este super bien con buena informacion y bien visualmente y al final subas los cambios"* — ampliando el pedido a una revisión general (no solo Habilidades Base) y autorizando el push al terminar.

- **Las 13 habilidades restantes ganaron 1-2 ítems de técnica nueva por fase** (28 ítems nuevos en total) — mismo criterio del resto del archivo: técnica concreta con el "cómo" y el "por qué", no relleno genérico. Ejemplos: `cocinar` (mise en place, cómo rescatar un platillo salado o soso), `armas` (nunca mezclar alcohol con manejo de armas, postura isósceles), `pelear` (postura base a 45°, rotación de cadera y hombro como fuente real de potencia), `modales` (qué hacer si no sabes qué cubierto usar, puntualidad en videollamadas), `fogata` (elegir el sitio antes de juntar materiales, tener el balde de agua listo ANTES del primer cerillo), `vino` (varietal vs. corte, cuánto dura una botella abierta), `coctel` (por qué importa el tamaño del hielo, ajustar el Margarita a tu gusto), `nudos` (mnemotecnia del as de guía, ballestrinque a una mano), `mecanica` (guardar el manual del auto, revisar presión de llantas mensual), `auxilios` (llamar al 911 tú mismo si estás solo, método RICE para esguinces), `brujula` (declinación magnética, rodear un obstáculo contando pasos), `asado` (sacar la carne del refrigerador antes, temperaturas exactas con termómetro), `reparaciones` (buscar cables antes de perforar, destapar el sifón a mano).
- **Las 8 habilidades que no tenían ninguna imagen dentro de sus pasos ya la tienen** — se buscaron y verificaron (WebSearch + WebFetch a la página real para extraer la URL de CDN, descartando todo resultado `plus.unsplash.com` premium, luego `curl` confirmando 200) fotos nuevas para las 8 que quedaban: `brujula` (brújula sobre mapa), `asado` (carne sobre parrilla de carbón), `reparaciones` (taladro inalámbrico), `pelear` (guantes de box en gimnasio), `armas` (práctica de tiro en polígono), `decirno` (gesto de mano en alto/límite), `dinero` (calculadora y laptop, presupuesto), `recuperar` (persona durmiendo). Con esto **las 18 habilidades tienen al menos 1 foto real dentro de su progresión**, no solo la portada — 19 fases de 55 ya traen imagen (antes 11).
- **Revisión general aplicada tras el pedido de "revisa todo"**: se confirmó que `.meta-detail-card` (el overlay donde se ve todo esto) ya usa `max-height:92vh;overflow-y:auto` desde su diseño original, así que el contenido casi duplicado (183 ítems de técnica vs. 149 antes) no rompe el layout ni necesita scroll interno adicional — se ve completo con scroll natural del overlay, igual que antes. Se verificó que `HABILIDADES_BASE` y `HABILIDAD_DETALLE` siguen 1:1 (18=18, 0 huérfanos, 0 duplicados) tras todos los edits de esta ronda.
- Verificado con Node: 18 tarjetas, 55 fases (sin cambio, no se agregaron fases nuevas — solo ítems y fotos dentro de las ya existentes), 183 ítems de técnica en total (antes 149), 19 fases con `img` (antes 11), 0 habilidades sin ninguna imagen (antes 8); las 8 URLs de imagen nuevas responden 200 (verificado individualmente, no solo en bloque); balance de `{`/`}` del CSS (518/518); balance de `<div>` en todo el archivo (282/282); `new Function()` sobre los 2 bloques `<script>` reales (líneas 902-906 y 1181-4228, localizados por línea exacta para evitar el falso positivo ya conocido de comentarios con texto literal `<script src="">`), ambos sin errores.

## "Cocinar" reestructurado a fondo: de 3 fases genéricas a 5 fases con recetas reales, cortes de carne, arroz paso a paso e "hervir a punto" explicado de verdad (2026-08-11, mismo día)

Pedido explícito: *"en aprender a cocinar, ya tenemos recetas que me recomendaste, comienza con eso, con algunas faciles, medianas de dificultad y despues ponme cosas que deberia saber, como como cortar las cosas, como pedir, tipos de carne, como hacer arroz, y ya ponme un platillo dificil, tambien debo saber como es hervir a punto, pero no solo me los digas, dime como hacerlo para que aprenda desde esa pantalla, tambien varias cosas pon informacion"*. `cocinar` era la única de las 18 habilidades con contenido inventado desde cero sin anclarse a datos reales de otra app — este cambio la ancla al recetario real de `comida.html` en vez de inventar platillos nuevos.

- **Fase 1 y 2 dejaron de ser genéricas ("domina arroz, proteína a la plancha...") y ahora nombran 6 recetas reales que ya existen en `CuidadoPersonal/comida.html → RECETAS`** (mismas que Adán ya usa en su Registro Diario): fáciles (10-12 min, 1 técnica) — Tacos de huevo con jamón de pavo, Atún con arroz y ensalada de pepino, Omelette de claras con pimiento morrón; dificultad media (20-30 min, 2+ componentes a sincronizar) — Pechuga de pollo con arroz y champiñones, Filete de pescado al horno con papa y pimiento, Pechuga rellena de queso panela. Cada fase trae un enlace real (`href:'../CuidadoPersonal/comida.html'`) para ver la receta completa con ingredientes y pasos — no se duplicó esa data aquí, mismo criterio de fuente única que ya usa `RECETAS_MINI` en este archivo.
- **Fase 3 conserva la técnica base que ya existía** (cortes de cuchillo, sellar, sazonar, mise en place, rescatar un platillo, utensilios, constancia) — se sacó de ahí el "hervir a punto" para darle su propio desarrollo real en la Fase 4, en vez de dejarlo como una línea suelta de una oración.
- **Fase 4 nueva — "lo que todo cocinero debe saber, aparte de seguir una receta"**: cortes de res comunes en México y para qué sirve cada uno (bistec/bola, arrachera, aguayón, pulpa negra, costilla), cómo pedir en la carnicería (nombre del corte + gramaje + trozo o rebanadas, sin pena de pedir que te lo muestren), arroz blanco paso a paso completo (lavar hasta que salga clara, sofreír hasta perlado, proporción 2:1 de agua, tapar 15-18 min sin destapar, reposar 5 min), y "hervir a punto" explicado de verdad — no la línea genérica de antes: agua en hervor fuerte antes de meter la pasta/verdura (nunca desde tibia), sal generosa antes, probar 1-2 min antes del tiempo del paquete mordiendo un trozo, qué se siente el punto "al dente" exactamente, y por qué escurrir de inmediato importa (el calor residual sigue cociendo).
- **Fase 5 nueva — el primer platillo difícil real: chiles rellenos de queso capeados**, con los 8 pasos completos de la técnica (asar y ampollar el chile, reposar en bolsa para pelar fácil, quitar semillas sin romperlo, rellenar, enharinar, batir claras a punto de turrón e incorporar yemas con movimiento envolvente, capear y freír en aceite bien caliente, escurrir y servir de inmediato) — la primera receta de dificultad real en todo `HABILIDAD_DETALLE`, no solo una técnica suelta.
- **2 imágenes nuevas verificadas con `curl`** (200 en ambas): arroz cocido en tazón (Fase 4) y chiles rellenos ya capeados y fritos (Fase 5, Wikimedia Commons, dominio público) — la de Fase 1 (persona cortando verdura) ya existía de la ronda anterior, se conservó.
- Verificado con Node: `cocinar` pasó de 3 a 5 fases; el total del archivo subió a 57 fases, 195 ítems de técnica, 21 fases con `img`, 2 fases con `href` real (las únicas de todo `HABILIDAD_DETALLE` que enlazan a una receta completa); las 2 URLs de imagen nuevas responden 200; balance de `{`/`}` del CSS (518/518) y `<div>` (282/282); `new Function()` sobre los 2 bloques `<script>` reales, ambos sin errores.

## "Primeros auxilios" reescrito de 3 fases genéricas a 7 maniobras individuales con detalle extremo e imagen HD cada una (2026-08-12)

Pedido explícito: *"en primeros auxilios basicos cuando de click, muestrame los primeros auxilios mas importantes y en cada uno pon un nivel de detalle extremo, debo saber muy bien como actuar en cada situacion y en cada maniobra explicala y como se aplica y pon una imagen en hd"*. Las 3 fases viejas trataban RCP y Heimlich como una sola línea cada uno dentro de una fase compartida ("Las 2 emergencias que más importan") — lejos del nivel de detalle que pide alguien que de verdad quiere saber actuar, no solo reconocer el nombre de la maniobra.

- **`auxilios` pasó de 3 fases a 7, una por cada maniobra/situación real**, cada una con 5-7 pasos de técnica explicada a fondo (qué hacer, cómo exactamente, y por qué) — no listas de una línea:
  - **Fase 1, RCP**: cómo verificar que de verdad no respira (no solo "revisa"), a quién señalar para pedir ayuda y por qué señalar a alguien específico funciona mejor que gritar al aire, posición exacta de manos, profundidad/ritmo/ciclo 30:2 explicado paso a paso, qué hacer si llega un DEA, y cuándo parar.
  - **Fase 2, Heimlich**: además de la maniobra estándar de pie, ahora cubre el auto-Heimlich (si estás solo), la variante para embarazada/obesidad (compresión en el pecho, no el abdomen — dato que antes no existía en absoluto), y la técnica completa y distinta para bebés (golpes en la espalda + compresiones de 2 dedos, nunca abdominales).
  - **Fase 3, hemorragias graves (nueva)**: presión directa, por qué NO quitar la tela empapada, elevación, y torniquete como último recurso con el detalle real de dónde colocarlo, qué tan apretado y por qué anotar la hora — tema que antes no existía en la habilidad.
  - **Fase 4, quemaduras**: reescrita por grado (1°, 2°, 3°) en vez de una sola línea genérica — qué hacer y qué NO hacer en cada uno, incluyendo quemadura química con enjuague de 20 min.
  - **Fase 5, convulsiones (nueva)**: qué hacer durante (cronometrar, despejar, nunca meter nada en la boca, nunca sujetar) y qué hacer justo después (posición de recuperación, periodo postictal), y los criterios exactos de cuándo llamar al 911 — tema que antes no existía en absoluto.
  - **Fase 6, reacción alérgica severa/anafilaxia (nueva)**: señales de alarma reales más allá de las ronchas, cómo usar un EpiPen paso a paso ("azul al cielo, naranja al muslo"), por qué llamar al 911 siempre aunque mejore, y la segunda dosis si no mejora — tema que antes no existía en absoluto.
  - **Fase 7, heridas menores/desmayo/cuándo esto no basta**: conserva cortada y RICE de esguinces, suma desmayo (síncope) con la maniobra de elevar las piernas, posición de recuperación general, y una lista ampliada de criterios reales para llamar al 911.
- **6 de las 7 fases traen imagen HD verificada con `curl` (200 en las 6)** — todas de Wikimedia Commons (dominio público/CC, mismo criterio de siempre) salvo la de quemaduras (Unsplash): RCP (ilustración de la maniobra completa), Heimlich (ya existía, se conservó), torniquete (diagrama de aplicación), quemadura (mano bajo agua corriente), convulsiones (posición de recuperación, reutilizada porque es el paso final correcto tras una convulsión), y EpiPen (foto real del dispositivo). Solo la Fase 7 (heridas menores/desmayo, la de cierre) se quedó sin imagen dedicada — es la fase de "wrap-up", no una de las maniobras principales que pidió Adán ilustrar.
- **Total de la habilidad: de 3 fases/3 ítems por fase promedio a 7 fases/42 ítems de técnica en total** — cada maniobra ahora se explica completa en vez de resumida en una sola oración.
- Verificado con Node: `auxilios` con 7 fases, 42 ítems de técnica, 6 de 7 fases con `img`; el total del archivo subió a 61 fases, 229 ítems de técnica, 26 fases con `img`; las 6 URLs de imagen responden 200; balance de `{`/`}` del CSS (518/518) y `<div>` (282/282) sin cambios; `new Function()` sobre los 2 bloques `<script>` reales, ambos sin errores; `HABILIDADES_BASE`/`HABILIDAD_DETALLE` siguen 1:1 (18=18).

## "Mecánica de vehículo" con el mismo tratamiento que "Primeros auxilios": de 2 fases genéricas a 7 emergencias reales, cada una a detalle (2026-08-12)

Pedido explícito: *"haz algo similar para mecanica de vehiculo"* — mismo criterio que la reescritura de `auxilios` del turno anterior: una fase por cada emergencia/procedimiento real en vez de listas comprimidas, con la técnica completa explicada y una imagen HD verificada en cada una.

- **`mecanica` pasó de 2 fases (llanta+corriente comprimidas en una, más una de mantenimiento genérico) a 7 fases independientes**, cada una con 5-7 pasos de técnica real:
  - **Fase 1, cambiar una llanta ponchada**: ahora incluye estacionarte seguro, cuñas para que no ruede, aflojar birlos ANTES de levantar el gato (y por qué en ese orden), el punto de apoyo correcto del chasis, patrón de estrella para apretar, y la advertencia de que la refacción es temporal y hay que ir a llantera en 24-48h — antes era una sola oración con los pasos encimados.
  - **Fase 2, pasar corriente**: mismo orden de cables que ya tenía, pero ahora con el motivo detrás de cada paso (por qué esperar 2-3 min antes de intentar encender, por qué desconectar en orden inverso, por qué manejar 20-30 min después) y una señal clara de cuándo el problema es la batería y no solo un percance de una vez.
  - **Fase 3, los 4 fluidos vitales (antes solo aceite)**: suma refrigerante (tanque de expansión, no el radiador), líquido de frenos (y qué significa que baje solo sin fuga visible — balatas gastadas), y limpiaparabrisas — antes solo cubría aceite.
  - **Fase 4, sobrecalentamiento en plena marcha (nueva)**: qué hacer en el momento (calefacción al máximo, no A/C), cuánto esperar antes de abrir el cofre, por qué nunca abrir la tapa del radiador caliente, y cuándo la situación ya requiere grúa en vez de seguir manejando — tema que antes no existía como su propia fase.
  - **Fase 5, cambiar un fusible quemado (nueva)**: ubicar la caja, identificar el fusible correcto con el diagrama, cómo revisarlo a la luz, por qué el amperaje de reemplazo debe ser idéntico, y qué significa que se vuelva a quemar de inmediato — tema que antes no existía en absoluto.
  - **Fase 6, leer las luces del tablero (nueva)**: Check Engine fija vs. parpadeando, batería, temperatura, presión de aceite, TPMS, y la regla general de rojo=para ya / ámbar=revisa pronto — tema que antes no existía en absoluto.
  - **Fase 7, kit de emergencia y seguridad en carretera (nueva)**: qué traer siempre en la cajuela, cómo bajarte del lado seguro, dónde colocar los triángulos y a qué distancia, y cuándo es mejor esperar asistencia vial que resolverlo tú mismo — tema que antes no existía en absoluto.
- **6 de las 7 fases traen imagen HD verificada con `curl`** (200 en las 6, con reintentos por rate-limit transitorio de Wikimedia que se resolvió solo tras unos segundos de espera): cambio de llanta y pasar corriente (Wikimedia, fotos reales del procedimiento), varilla de aceite (Wikimedia), caja de fusibles reales (Wikimedia), tablero con luces encendido (Unsplash), y triángulo de advertencia real sobre el pavimento (Wikimedia). Solo la Fase 4 (sobrecalentamiento) se quedó sin imagen — no se encontró una foto libre de "vapor saliendo del cofre" que no fuera de un banco de pago; el texto de esa fase ya es el más detallado de las 7 para compensar.
- **Total de la habilidad: de 2 fases/7 ítems en total a 7 fases/42 ítems de técnica** — mismo nivel de profundidad que se le dio a `auxilios` en el turno anterior.
- Verificado con Node: `mecanica` con 7 fases, 42 ítems de técnica, 6 de 7 fases con `img`; el total del archivo subió a 66 fases, 264 ítems de técnica, 31 fases con `img`; las 6 URLs de imagen responden 200; balance de `{`/`}` del CSS (518/518) y `<div>` (282/282) sin cambios; `new Function()` sobre los 2 bloques `<script>` reales, ambos sin errores; `HABILIDADES_BASE`/`HABILIDAD_DETALLE` siguen 1:1 (18=18).

## Ronda grande: nudos, precios de la lista de compras, imágenes médicas, asado/reparaciones y detalle en las 18 habilidades (2026-08-12)

Un solo mensaje con 5 pedidos, textual: *"tambien en nudos, dame dferentes tipos, buscan alguna web donde expliquen nudos que si ayudan y como hacerlos paso a paso y pon las imagenes, para que quede con info completa"*, *"en la lista e compras, siento que lo de los precios esta un poco mal por que luego puedo escoger por pieza o por paquete o por peso, entonces acomodalo mejor y ademas en las otras compras, skincare, suplementos, cabello y libros, ponme a un lado el precio que cuesta de cada plataforma"*, *"ponme mejores imagenes para primeros auxilios, ni siquiera se ven bien y son genericas, esfuerzate y busca mejores, recueda que esto puede depender que salve una vida, haz lo mismo en lo de reparaciones y carne asada, ponlas con mucho detalle y revisa que las demas tambien dentan detalle, las que falten"*. (Los otros 2 pedidos del mismo mensaje —rutina de pierna/abdomen y natación— están documentados en `CuidadoPersonal/readme_ejercicio.md`, que es el archivo dueño de esa data.)

### 1. La causa real de que las imágenes "no se vean bien": `object-fit:cover` sobre diagramas

Antes de cambiar ninguna imagen se encontró el problema de fondo, que afectaba a **todas** las habilidades con diagramas, no solo primeros auxilios:

- `.meta-detail-step-img` usaba `object-fit:cover` con `max-height:180px`. En una **foto** eso está bien (recorta los bordes y se ve pareja), pero en un **diagrama técnico** recortaba justo la parte que explica el paso — y peor: un PNG/SVG de línea negra con fondo transparente sobre el tema oscuro quedaba prácticamente **invisible**. Eso es literalmente lo que Adán estaba viendo.
- **Solución**: campo opcional `imgTipo:'diagrama'` por paso. `pintarDetailOverlay()` le agrega la clase `.is-diagram`, que cambia a `object-fit:contain` (se ve el diagrama completo, sin recorte), **fondo blanco fijo** (el trazo negro contrasta en los 2 temas) y `max-height:300px`. Sin el campo, se asume foto y todo se ve exactamente como antes — cero regresión en las fotos ya existentes.
- El `max-height` general subió de 180px a 220px, porque el reclamo de "no se ven bien" también era de tamaño.
- **15 pasos marcados como diagrama**: los 8 de nudos, 6 de primeros auxilios y 1 de asado (cortes de res).

### 2. Nudos: de 3 fases genéricas a 8 nudos, cada uno paso a paso, con diagrama y enlace a la guía real

- **La web pedida es [Animated Knots by Grog](https://www.animatedknots.com/)** — el estándar real para aprender nudos, con animación paso a paso. Cada una de las 9 fases enlaza a la página exacta de ese nudo (`href`/`label`, el mismo patrón que ya usaban Ajedrez/Hyrox/Maestría en `META_DETALLE`). Los 8 enlaces se verificaron con `curl -L` (200); el del nudo tensor apunta a `midshipmans-hitch-knot` porque `taut-line-hitch-knot` da 404 en ese sitio (el Midshipman's es la versión mejorada del mismo nudo).
- **8 nudos, uno por fase, elegidos por función y no por popularidad** — el criterio fue que cada uno resuelva un problema distinto: **As de guía** (aro fijo que no se aprieta), **Ocho** (tope), **Llano/rizo** (unir 2 cuerdas del MISMO grosor), **Vuelta de escota** (unir 2 de DISTINTO grosor — el que casi nadie sabe y el que hace falta cuando el llano falla), **Ballestrinque** (amarre rápido a poste), **Dos medios cotes** (amarre firme que sí aguanta), **Nudo tensor** (se ajusta con la mano y se traba con carga), **Nudo de camionero** (polea improvisada con ventaja mecánica ~3:1, para amarrar carga al auto).
- Cada nudo trae los **pasos numerados de cómo hacerlo**, para qué sirve en la vida real, y el **error más común** de ese nudo en particular (ej.: el as de guía "bonito y simétrico" casi siempre está mal; en la vuelta de escota las 2 puntas deben quedar del mismo lado; los 2 medios cotes deben ir en la misma dirección).
- **Fase final de práctica** con método concreto: regla de las 10 repeticiones, aprender de 2 en 2 (no los 8 de golpe), prueba con los ojos cerrados, y una tabla de "qué nudo usar en cada caso" — porque saber cuál usar importa tanto como saber hacerlo.
- **8 diagramas de Wikimedia Commons**, todos verificados. Detalle técnico encontrado en el camino: Wikimedia **solo acepta anchos de thumbnail estándar** — `800px-` devuelve HTTP 400, `960px-` funciona (se confirmó consultando la propia API `imageinfo` con `iiurlwidth`, que devuelve la URL canónica). Los SVG se embeben por su render PNG (`/960px-Archivo.svg.png`), no por el `.svg` directo.

### 3. Lista de compras: precios reestructurados por forma de venta, y precio por plataforma en las otras 4 categorías

- **El problema real**: `precio` era UN solo string que mezclaba 3 formas distintas de vender (`'$59/kg'`, `'$18/pza'`, `'$20 (bolsa 400g)'`), así que no se podía comparar nada entre sí ni se veía de dónde salía el total.
- **Nueva estructura por producto** en `LISTA_COMPRAS_PRECIOS`: `tipo` (`peso`/`pieza`/`paquete` — cómo se vende), `precio` + `unidad` (el precio de referencia según ese tipo), `compra` + `monto` (la cantidad típica de una compra suya y lo que cuesta), `real` y `nota`. Los 30 productos de comida migrados, 0 con estructura incompleta (verificado con Node).
- **Se pintan 2 píldoras por producto**: el precio de referencia (verde ✓ real de su ticket / naranja ≈ estimado) y una píldora neutra nueva (`.lc-price-compra`) con `⚖️/🔢/📦 cantidad = $importe`. La segunda es deliberadamente neutra: no es un precio de mercado, es lo que esa cantidad cuesta — y es **el número que suma el total de arriba**, que antes no se veía por ningún lado.
- **Ícono por forma de venta** (`LC_TIPO_META`): ⚖️ por peso · 🔢 por pieza · 📦 por paquete — de un vistazo se sabe si puede llevar más o menos, o si viene en presentación cerrada. Varias `nota` nuevas cubren justo el caso que motivó el pedido (queso panela también se vende por peso en cremería ≈$120-140/kg; el atún sale más barato en paquete de 4-6; la pechuga viene por paquete ya pesado, ≈$249/kg).
- **Precio por plataforma en skincare/cabello/suplementos/libros** (`LISTA_COMPRAS_PRECIOS_OTROS` + `LIBRO_PRECIO_TIPICO`): 2 píldoras por producto, `≈ $X Amazon` y `≈ $Y M. Libre`. **Todos van marcados como estimado (naranja ≈) a propósito**: son precios de lista aproximados de ago-2026, no precios en vivo — esta app no consulta ninguna API y Amazon/ML cambian de precio y vendedor a diario. El nombre del producto sigue siendo el link a la búsqueda real, que es donde se ve el precio del momento, y la leyenda lo dice explícitamente.
  - Los 19 productos de skincare/cabello/suplementos llevan precio individual. Los **44 libros comparten un precio típico por formato** en vez de 44 cifras inventadas distintas: son casi todos no ficción en pasta blanda con un rango muy estrecho, y dar 44 números específicos aparentaría una precisión que no existe.
- Verificado con Node: 30/30 productos de comida con precio y estructura completa, 19/19 de las otras categorías con precio por plataforma, y los 3 valores de `tipo` presentes.

### 4. Primeros auxilios: imágenes específicas en vez de genéricas

Además del arreglo de CSS del punto 1, se cambiaron las imágenes que de verdad eran genéricas:

- **Quemaduras**: era una foto de Unsplash de una mano bajo el chorro de agua (genérica, no enseñaba nada). Ahora es un **diagrama médico de los 3 grados de quemadura** mostrando qué capa de piel afecta cada uno (Wikimedia, CC BY-SA 4.0) — que es exactamente lo que explica esa fase y lo que permite distinguir un grado de otro en el momento.
- **Anafilaxia**: era una foto del dispositivo EpiPen. Ahora es un diagrama del **sitio exacto de inyección intramuscular en el muslo** — información accionable en vez de una foto de producto.
- **Heimlich**: se cambió el JPG por el **diagrama SVG** de la maniobra (mucho más legible, y ahora con fondo blanco y sin recorte).
- **Fase 7** (heridas menores/desmayo) era la única sin imagen: ahora tiene una de posición de recuperación.
- Las de RCP, torniquete y convulsiones se conservaron pero marcadas como diagrama — el problema en esas 3 no era la imagen, era cómo se renderizaba.

### 5. Asado y reparaciones, reescritos con el mismo nivel que auxilios/mecánica

- **`asado`: de 3 fases/8 ítems a 5 fases/29 ítems.** Fase 1 prender el carbón y armar 2 zonas (cómo prenderlo sin líquido de encendedor y por qué, la prueba de la mano para medir temperatura sin termómetro, limpiar y engrasar la parrilla). Fase 2 elegir y preparar la carne, **con diagrama de cortes** (los 4 cortes mexicanos que funcionan en parrilla, grosor mínimo de 2 cm y por qué, cuándo salar — justo antes o 40 min antes, nunca en medio, y la razón). Fase 3 asar (sellar sin mover, voltear una sola vez y con pinzas, tabla de temperaturas por término, la prueba del pulgar sin termómetro, descanso obligatorio). Fase 4 **cortar** — nueva, y crítica: cortar contra la fibra es lo que separa una arrachera suave de una que parece chicle. Fase 5 afilar, ahora con la distinción que casi nadie conoce: **afilar (piedra, cada 2-3 meses) vs. asentar (chaira, cada 2-3 usos)**, que es por qué mucha gente cree que su cuchillo "no agarra filo".
- **`reparaciones`: de 3 fases/8 ítems a 5 fases/32 ítems.** Fase 1 taladro y colgar cosas (identificar el tipo de pared golpeándola, broca y modo de taladro según material, **qué taquete según pared y peso** — el plástico común no sirve en tablaroca, y es el error que hace que se caiga todo). Fase 2 eléctrico seguro (cortar corriente Y verificar con probador, tomarle foto a los cables antes de desconectar, código de color, cuándo NO hacerlo tú). Fase 3 plomería (dónde está la llave de paso, destapar en orden de menos a más agresivo, desarmar el sifón, cinta de teflón siempre en sentido de las manecillas y por qué, el WC que se queda corriendo). Fase 4 **puertas y arreglos cosméticos** — nueva (tapar un agujero, puerta que rechina o no cierra, el truco de los palillos con pegamento para un tornillo que gira en falso, cambiar silicón). Fase 5 kit mínimo con costo real y **cuándo llamar a un profesional sin discusión** (gas, eléctrico que se bota, fuga dentro de la pared).

### 6. Revisión de las 18: se ampliaron las 12 que se habían quedado atrás

Se midió con Node el detalle real de las 18 habilidades y se ordenó de menos a más — 12 estaban claramente por debajo del resto (entre 8 y 15 ítems, contra 42-51 de `auxilios`/`mecanica`). Se ampliaron todas:

- `coctel` (11→30): recetas exactas con mililitros de los 5 clásicos, agitar vs. revolver y cuándo cada uno, jarabe simple, la regla 2:1:1 para improvisar, barra mínima.
- `decirno` (9→21): la fórmula de 3 partes, decir "no" al inicio y no al final, técnica del disco rayado, el caso de la familia, la regla del "sí absoluto".
- `recuperar` (8→21): horas objetivo, cafeína y su vida media, por qué el alcohol arruina la recuperación aunque duermas, siesta de 20 min, el músculo crece descansando, señales tempranas de quemarse.
- `armas` (12→23): equipo de protección desde el primer día, agarre y dónde enfocar la vista, diagnosticar fallos por dónde caen los tiros, dry fire, limpieza, etiqueta de polígono, marco legal mexicano real.
- `dinero` (9→23): las 3 formas de generar, subir precio antes que horas, págate primero, deuda cara primero, el peligro real de los MSI, orden correcto de inversión, interés compuesto con números, comisiones, y la regla anti-fraude (CNBV).
- `manejar` (11→24): el punto de mordida del clutch, arrancar en subida, estacionarse en paralelo paso a paso, ajuste de asiento y espejos, la regla de los 3 segundos, lluvia y aquaplaning, fatiga al volante (relevante por Didi).
- `vino` (12→24): las 6 uvas que cubren casi todo, cómo leer una etiqueta, vino mexicano, la curva precio/calidad, tapa de rosca no es vino malo, sostener por el tallo, el retrogusto.
- `brujula` (8→25): las 3 partes de la brújula, los grados de memoria, método del reloj y Estrella Polar, **cómo tomar un azimut paso a paso concreto**, rumbo de regreso, contar pasadas, rumbo desviado, y el protocolo S.T.O.P. si te pierdes.
- `pelear` (12→26): que la mejor defensa es no estar ahí, cómo caminar sin cruzar los pies, dónde mirar, secuencia pie→cadera→hombro→brazo, gancho al cuerpo, cómo vendarse las manos, cómo elegir gimnasio, y el aviso sobre golpes acumulativos a la cabeza.
- `modales` (12→28): regla BMW para no equivocarse de pan/copa, posición de cubiertos como señal al mesero, cómo presentar a 2 personas, qué hacer si olvidaste un nombre, modales digitales, y saludar igual al personal de servicio.
- `fogata` (12→30): cuánto material juntar y separarlo antes de prender, la regla del grosor, prender por abajo y a favor del viento, no picarla los primeros minutos, yescas de emergencia, el método completo de apagado en orden, y nunca usar gasolina.
- `nadar` (15→40): por qué flotas y por qué la tensión te hunde, el ejercicio del "ascensor" contra el miedo, tobillos sueltos, dejar una oreja en el agua al respirar, mirar al fondo, contar brazadas como métrica de progreso, entrenar por intervalos, metas medibles concretas, y cuidado del hombro. Se enlazó explícitamente con la nueva sesión de natación de los miércoles.

### Verificación

- Node sobre `dashboard.html`: `new Function()` en los 2 bloques `<script>` reales sin errores; CSS 520/520 llaves; `<div>` 283/283; `HABILIDADES_BASE`↔`HABILIDAD_DETALLE` siguen 1:1 (18=18, 0 huérfanos).
- **Totales de Habilidades Base: 76 fases y 537 ítems de técnica** (venía de 66 fases/264 ítems en la ronda anterior), 43 imágenes, 15 diagramas, 11 enlaces externos. La habilidad más flaca ahora tiene 21 ítems (antes 8) y la más completa 51.
- **Las 43 URLs de imagen verificadas con `curl`, 43/43 en HTTP 200.** Nota operativa para futuras rondas: Wikimedia devuelve **429 (rate limit)** al verificar muchas imágenes seguidas desde la misma IP — no es que la imagen falte. Se resuelve con `User-Agent` propio y reintentos espaciados; ninguna de las 43 dio 404.
- Los 8 enlaces de Animated Knots verificados con `curl -L`, 200.

### Extra: desincronización del lunes, encontrada de paso

Al comparar con Node los 7 días de `GYM_RUTINA_DEFAULT` (dashboard.html) contra `S.rutina` (ejercicio.html) para validar la reestructura, salió un **error que ya existía desde antes y que nadie había notado**: el lunes ("Brazos A") estaba distinto en los 2 archivos — aquí empezaba con Curl con Barra y cerraba con Plancha, cuando el día real empieza con Fondos (`e005`, el compuesto pesado del día) y no lleva Plancha. Además `e005` **ni siquiera existía en `EJ_LOOKUP`**, así que de haberse usado se habría pintado sin nombre en "qué toca hoy" del Hero. Se corrigió el día y se agregó `e005` al lookup con su imagen y su `cue` copiados de `EJ_DB`. Ahora los 7 días coinciden exactamente entre los 2 archivos (verificado con Node: 0 desincronizaciones, 0 ejercicios sin entrada en `EJ_LOOKUP` ni en `EJ_DB`).

## Natación se muda al Fitsi Buenavista, y "🏋️ Hoy toca" ahora explica la sesión (2026-08-12)

Dos correcciones de Adán el mismo día: *"el miercoles voy a natacion en el fitsi de buenavista, cambia eso de la doctores"* y *"y en hoy toca natacion, no es nada explicativo"*.

### Ubicación: era un dato inventado, no uno real

La Alberca Olímpica Francisco Márquez (Doctores) venía de la sección Deportes de `ejercicio.html`, donde se había puesto como **estimación razonable** de dónde podría nadar — nunca fue un dato confirmado (así estaba advertido en este mismo README). Adán aclaró que nada en la **alberca semiolímpica de su propio gimnasio, Fitsi Buenavista**, que ya aparecía en `FITSI_INSTALACIONES` desde el 2026-08-02. Cambiado en las **4 apps que repetían el dato**:

- `CuidadoPersonal/ejercicio.html` — tarjeta de Natación en Deportes (ubicación y costo: pasó de "$20-50/visita en alberca pública" a "Incluido en tu membresía de Fitsi") y el `foco` del miércoles.
- `Dashboard/dashboard.html` — la tarea `e3` de `RUTINA_TASKS`, la habilidad `nadar` de Habilidades Base, y un comentario de `TIPO_FOTO`.
- `Coach/Coach_v2.html` — la tarea `e3` de su propia copia de `RUTINA_TASKS`.
- **No se tocó `Dashboard_prueba_iphone/dashboard.html`**: es una copia congelada (un solo commit, 0 de las funciones de las últimas semanas, no aparece en ningún README) — no es una app viva.

Es un cambio a mejor y no solo de texto: la alberca ya está pagada dentro de su membresía, es el mismo lugar al que va los otros días (cero traslado extra) y Fitsi da clases de Aquafit, que sirven justo para la fase 1 de su progresión. Todo eso quedó dicho en el `foco` del día.

### "Hoy toca" no explicaba nada — y la causa de fondo era peor que un texto faltante

Al revisar el reclamo salieron **2 problemas distintos**:

1. **La migración solo corría en `ejercicio.html`.** `fixRutina20260812IfNeeded()` se había puesto únicamente ahí, pero el Dashboard lee `mirutina_v1` de localStorage y **`D.gym.rutina` siempre gana sobre `GYM_RUTINA_DEFAULT`**. Como Adán normalmente abre el Dashboard y no `ejercicio.html`, seguía viendo el miércoles viejo — *"Natación · Nadar 1×45 min"*, una sola línea — aunque el código ya tuviera los 5 bloques nuevos. Es decir: los cambios de la rutina del turno anterior **no le habían llegado**. Se agregó el espejo exacto de esa migración en `dashboard.html` (mismo nombre de bandera `mirutina_v1_pierna_abs_natacion`, mismas condiciones por nombre exacto, corre antes de `loadAll()`), y de paso cubre también el lunes que estaba desincronizado. Ahora da igual cuál de las 2 apps abra primero.
2. **El panel nunca pintaba el `foco`.** `renderHeroGymPanel()` solo listaba nombre + series×reps + `cue` por ejercicio. Para un día de fuerza eso alcanza, pero para una sesión de aprendizaje de natación —donde lo que importa es que los bloques van EN ORDEN y que al inicio es normal no llegar al último— una lista suelta no dice nada. Ahora se pinta `rutinaDia.foco` arriba de la lista (`.hp-foco`, con barra de acento, recortado a 5 líneas y el texto completo en `title`).
   - `foco` ya existía en `S.rutina` de `ejercicio.html` pero **`GYM_RUTINA_DEFAULT` no lo tenía** (es la copia ligera). Se le agregó a los 7 días, para que el panel explique igual venga la rutina de donde venga.
   - Los `foco` de los 3 días reestructurados se **reescribieron para ser texto de usuario**: traían prosa de changelog ("Reestructurado el 2026-08-12 (pedido de Adán: ...)"), que es justo lo que no debe leerse en la UI ahora que este campo es visible en 2 apps. Esa parte histórica vive en este README, que es su lugar.
   - Los 7 `foco` quedaron **idénticos carácter por carácter entre `ejercicio.html` y `dashboard.html`**, copiados con un script desde `S.rutina` (la fuente de verdad) en vez de a mano. No es cosmético: las 2 migraciones comparten la bandera `mirutina_v1_pierna_abs_natacion` y escriben en la misma clave de localStorage, así que **la primera app que Adán abra es la que gana** — si los textos difirieran, el contenido del panel dependería de por dónde entró ese día. Verificado con Node (7/7 iguales).
- Verificado con Node en los 3 archivos tocados: `new Function()` sobre los bloques `<script>` reales sin errores; CSS y `<div>` balanceados (dashboard 521/521 y 284/284, ejercicio 156/156 y 173/173, Coach 438/438 y 1578/1578); los 7 días siguen sincronizados entre `S.rutina` y `GYM_RUTINA_DEFAULT` (nombre y lista de ejercicios); 7/7 días con `foco` en el default; 0 referencias a "Francisco Márquez" en las apps vivas.

### El viernes deja de llamarse "bajar panza"

Pedido, el mismo día: *"no pongas literal bajar panza jajaja pon algo mas estetico si alguien lo lee"*. Es un punto válido más allá del gusto — ese nombre se ve en el panel del Dashboard, en Coach y en cualquier pantalla que alguien más alcance a leer.

- **`Abdomen — bajar panza` → `Abdomen — Core + Cardio`**, consistente con el "Pecho + Cardio + Core" del sábado.
- Se suavizó el resto del lenguaje en las 3 apps, no solo el nombre del día: el banner de meta de `#s-rutina`, las tarjetas de Boxeo y Natación de Deportes, los `foco` del viernes y el sábado, y la narrativa de visualización de Coach pasaron de "bajar panza" a "definir la zona media" / "reducir grasa".
- **Las citas textuales de Adán en comentarios de código y en los READMEs se dejaron intactas** — son registro de lo que pidió, no texto de interfaz.
- **La migración se bumpeó a `_v2`** (`mirutina_v1_pierna_abs_natacion_v2`) en las 2 apps, y ahora acepta `"Abdomen — bajar panza"` como nombre-default válido además del original. Sin eso, el navegador de Adán —donde la versión anterior ya pudo haber corrido y guardado ese nombre— se habría quedado con el nombre viejo para siempre, porque la bandera vieja ya estaba puesta. Por eso ese string sigue apareciendo dentro de las 2 migraciones: es la condición que reconoce el dato viejo, no texto que se muestre.
- Verificado con Node: los 3 archivos siguen sin errores de sintaxis y balanceados; rutina y los 7 `foco` siguen idénticos entre `ejercicio.html` y `dashboard.html`; el día 5 ya se llama "Abdomen — Core + Cardio"; 0 apariciones de "bajar panza" fuera de comentarios y de la condición de migración.

## Ajustes finos de la rutina, uno por uno (2026-08-12, misma tarde)

Adán fue pidiendo cambios sueltos mientras revisaba la rutina ya cargada. Todos aplicados en `ejercicio.html` (fuente de verdad) y replicados en `GYM_RUTINA_DEFAULT` de `dashboard.html`:

| Pedido textual | Qué se hizo |
|---|---|
| *"quita esto en el dashboard: [el párrafo de foco de natación]"* | Se quitó el render de `foco` del panel "🏋️ Hoy toca" (`.hp-foco` y su CSS). Ver abajo por qué el dato SÍ se conserva. |
| *"de natacion, solo dejame 4 ejercicios"* | De 5 bloques a 4: `e060` (respiración lateral con tabla) salió y su contenido se **fusionó dentro de `e059`**, que pasó a llamarse "Patada con tabla + respirar de lado" — es donde se practica de verdad, con tabla. Tiempos redistribuidos para seguir sumando 45 min exactos (7 + 4×4 + 3×4 + 10). |
| *"quita oblicuos con cable en ejercicio del viernes"* | `e049` fuera. El `foco` decía "las 3 funciones del abdomen (… rotación con oblicuos)" — se corrigió a las 2 que quedan (aguantar sin arquearte y flexionar), en vez de dejar una promesa que los ejercicios ya no cumplen. |
| *"lo del lunes, quita el press frances, dame algo mas facil o intermedio"* | `e027` → **`e030` Patada de Tríceps**: mancuerna, aislamiento ligero, no carga el codo como el Press Francés y perdona mucho más la técnica. Era el único ejercicio de tríceps de la biblioteca que no estaba ya en otro día. Se agregó `e030` a `EJ_LOOKUP`. |
| *"quita la sentadilla bulgara del martes"* | `e037` fuera. El día quedó en 6 ejercicios y **100% en máquina o con apoyo** — ya no hay nada de equilibrio a una pierna ni barra sobre los hombros; se dijo explícitamente en el `foco`. |
| *"lo del sabado quita la rueda abdominal y ponme algo de abdomen"* | `e048` → **`e045` Plancha**. Se repite del viernes **a propósito**, y el `foco` lo justifica: el core aguanta bien 2 veces por semana, no necesita equipo y no deja adolorido para el domingo. Las otras opciones de la biblioteca eran `e049` (que él acababa de quitar del viernes) o repetir crunch/elevación de piernas. |
| *"el curl con barra esta mal la ilustracion"* | Cambiada. La anterior (`Biceps-curl-1.png`) tiene como única descripción en Commons *"an exercise of biceps"* — ni siquiera dice si es barra o mancuerna. La nueva es explícitamente **"Wide Grip Standing Biceps Curl With Barbell"**, de la misma familia visual (Everkinetic, línea negra) que el resto de la biblioteca. Verificada con `curl` (200) y confirmada leyendo su página de Commons, no solo el nombre del archivo. |

### Por qué el panel dejó de mostrar `foco` pero el dato sigue ahí

El `foco` se quitó **solo del render** del Dashboard, no de los datos. `GYM_RUTINA_DEFAULT` lo sigue cargando porque `fixRutina20260812IfNeeded()` escribe esos objetos tal cual en `mirutina_v1`, y **`ejercicio.html` sí muestra el `foco`** en el banner de su detalle, donde hay espacio. Si se omitiera en la copia del Dashboard, abrir el Dashboard antes que `ejercicio.html` **borraría ese texto de la otra app**. Por eso los 7 `foco` deben seguir idénticos carácter por carácter entre los 2 archivos (verificado con Node en cada ronda).

### La migración tuvo que subir a `_v3`

Cada tanda de estos cambios necesitó **bumpear la bandera** (`mirutina_v1_pierna_abs_natacion` → `_v2` → `_v3`) en las 2 apps: una vez que la migración corre, deja su bandera puesta y no vuelve a tocar nada, así que sin bump los cambios nuevos **nunca llegarían al navegador de Adán**. Además, cada versión tuvo que **aceptar como "todavía es el default" los nombres intermedios** que ella misma pudo haber guardado antes (`Piernas — completa`, `Abdomen — bajar panza`, `Abdomen — Core + Cardio`, `Natación — aprender a nadar`) — si solo comparara contra los nombres originales de julio, un navegador ya migrado se quedaría congelado en la versión intermedia. Se extendió también a los días 1 y 6, que antes no estaban cubiertos porque no habían cambiado.

- Verificado con Node en los 2 archivos: sintaxis OK; CSS y `<div>` balanceados (dashboard 520/520 y 283/283, ejercicio 156/156 y 173/173); los 7 días **sincronizados** entre `S.rutina` y `GYM_RUTINA_DEFAULT` (nombre + lista de ejercicios) y los 7 `foco` **idénticos**; **0 ejercicios sin entrada** en `EJ_LOOKUP` ni en `EJ_DB`; **0 de los 5 ejercicios retirados** (`e027`, `e037`, `e048`, `e049`, `e060`) siguen en la rutina — todos se quedaron en la biblioteca por si algún día los quiere de vuelta; bandera `_v3` presente en ambas apps. Las 2 URLs de imagen nuevas responden 200.

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

## Mi Día: se recupera la franja muerta de arriba y el encabezado baja de 2 filas a 1 (2026-08-12)

Pedido con captura, textual: *"necesitamos abarcar todo este espacio, entonces pon que se vea completo, ademas el reloj y lo del dia, lo puedes poner a la par de la frase del dia, esto para ahorrar espacio"*. En la captura venía marcada en rojo una banda vacía a todo lo ancho, entre la barra de apps y el título "MI DÍA · JARVIS".

**Qué era esa banda**: el `padding:5vh` superior de `.slide`, más el hecho de que `.slide-inner` centra verticalmente (`justify-content:center`). En los otros 7 slides el centrado se ve bien porque traen poco contenido, pero **Mi Día es la pantalla más cargada del Dashboard** (frase, tira de 7 días, "Ahora mismo", 3 paneles y la línea de tiempo): ahí centrar solo servía para regalar espacio arriba y abajo.

- **`.slide.theme-dia`** baja el `padding-top` de `5vh` a `1.4vh` (y el inferior a `2.2vh`), y **`.theme-dia .slide-inner`** pasa a `justify-content:flex-start`. El contenido arranca pegado a la barra de apps y `#diaTimeline` —que ya traía `flex:1;min-height:0`— se estira para ocupar lo que sobre, así que la pantalla queda llena de arriba a abajo sin estirar nada a la fuerza. **Los otros 7 slides no se tocaron**: siguen centrados, que es como se ven bien.
- **Encabezado de 2 filas a 1** (`.dia-topbar`, nueva): antes eran la fila de eyebrow + reloj/fecha y, debajo, la fila de la frase. Ahora es un solo renglón — etiqueta a la izquierda, frase al centro, reloj + fecha a la derecha. La frase es la que se estira (`flex:1` + `min-width:0`, que es lo que le permite encogerse en vez de empujar al reloj fuera de pantalla cuando el texto es largo); las otras 2 se quedan de su ancho natural con `flex-shrink:0`.
- **Reloj y fecha ahora van en línea** (`.dia-reloj`, `display:flex` con `align-items:baseline`) en vez de apilados, que es lo que permitió que la fila no creciera de alto.
- **Responsive**: abajo de 900px la fila se parte en 2 con `order` — arriba etiqueta + reloj (justo el orden viejo), abajo la frase a todo lo ancho. Sigue ahorrando espacio sin apretujar el texto en pantallas angostas.
- **`.flex-hero-top` se borró**: era la fila vieja y quedó sin un solo uso en el archivo. Se dejó un comentario en su lugar apuntando a `.dia-topbar` en vez de dejar CSS muerto.
- Los ids `diaClock`, `diaFecha` y `heroFrase` se conservaron intactos, así que `tickClock()`, `renderDia()` y el render de la frase siguen funcionando sin tocar una línea de JS.
- Verificado con Node: sintaxis OK en los 2 bloques `<script>` reales; CSS 532/532 llaves; `<div>` 281/281 y `<span>` 109/109 (bajó 2 divs a propósito: el envoltorio del reloj y su contenedor `text-align:right` se volvieron 2 `<span>`); las 4 reglas nuevas presentes; 0 usos restantes de `.flex-hero-top`.

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

## "Ideas para hoy" se estira hasta el borde de su tarjeta (2026-08-12)

Pedido con captura: *"hay veces que la lista de ejercicios es mas larga que la de comer hoy, entonces ajusta la de comer hoy para que sean como del mismo tamaño, por que hay tamaño desperdiciado ahi"*.

**La causa no era que las tarjetas midieran distinto** — las 3 de esa fila ya miden exactamente lo mismo de alto, porque `#miDiaSecundarios` usa `align-items:stretch`. El problema era interno: `.hp-meal-list` tenía un **tope fijo** de `max-height:clamp(90px,14vh,118px)` (puesto el 2026-08-08 cuando se compactó la pantalla), así que la lista de recetas se cortaba mucho antes del borde inferior de su propia tarjeta cada vez que el panel de gym era más largo. Ese hueco entre el final de la lista y el borde era el "tamaño desperdiciado".

- **Se quitó el `max-height`** y el panel pasó a ser columna flex (`#heroNutriPanel{display:flex;flex-direction:column}`) con `#heroNutriPanel .hp-meal-list{flex:1}`. Así la lista absorbe todo el alto que dejan el título y las pestañas, hasta el borde de la tarjeta, y solo hace scroll interno si aun así no caben las 14 recetas.
- **El `min-height` se conserva como PISO, no como techo** (mismo valor que tenía el tope viejo), y es lo que cubre los 2 casos que se romperían sin él:
  - si el panel de gym llega a ser **más corto** que la lista, la fila la sigue marcando este piso — o sea el alto de antes, sin regresión;
  - en **móvil** las 3 tarjetas se apilan (`#miDiaSecundarios` pasa a 1 columna) y desaparece el "alto sobrante" que absorber: con `flex:1` y `min-height:0` la lista habría colapsado casi a 0 y no se vería ninguna receta.
- **No se tocó el panel de gym** (`.hp-ex-scroll`, ya en `max-height:none`): es el que marca el alto de la fila, y era el comportamiento correcto.
- Verificado con Node: sintaxis OK en los 2 bloques `<script>` reales; CSS 534/534 llaves; `<div>` 281/281; `.hp-meal-list` ya sin `max-height` y las 2 reglas nuevas presentes.

## La Lista del Súper queda solo en el Dashboard (2026-08-12)

Salió de una auditoría del ecosistema que pidió Adán (*"rivisa las demas apps y ve que cosas faltan"*), y al confirmarse el duplicado decidió: *"solo quiero la lista de compras en mi dashboard, borra los duplicados de otros lugares"*.

**Era un duplicado real, no dos vistas del mismo dato**: esta sección guardaba en `comida_v1.comprado` y la del Dashboard en `dash-lista-compras`, y **el Dashboard nunca leyó `comida_v1`** (verificado: 0 referencias). Marcar jitomate aquí no se veía allá y viceversa — dos verdades para la misma compra. Se quedó la del Dashboard porque hace bastante más: precio por producto (verde si viene del ticket real, naranja si es estimado), forma de venta (⚖️ peso / 🔢 pieza / 📦 paquete), total de lo marcado y botón para vaciar.

Se revisó que el duplicado estuviera solo aquí: Coach y Finanzas aparecían en la búsqueda pero eran falsos positivos ("comprador", "BTC comprado").

**Qué se borró de `comida.html`** — la pieza completa, sin dejar restos:
- La `<section id="s-super">` entera y su entrada en `SECS`/`STITLE`.
- Las 4 funciones (`listaSuperUnica`, `renderSuper`, `toggleShop`, `resetShop`) y su llamada en `init()`.
- **Un botón que habría quedado roto**: "↺ Reiniciar lista del súper" seguía en la barra lateral llamando a `resetShop`, que ya no existía — al tocarlo habría lanzado un error. Era el resto más fácil de pasar por alto, porque vive fuera de la sección que se eliminó.
- Las 15 reglas CSS `.shop-*` y la mención de `.shop-grid` en la regla compartida de `min-width:0`.
- `comprado` del estado `S`.

**Qué se conservó a propósito:**
- **`CATEGORIA_ING` y `ORDEN_CAT`**, aunque ya no los use nadie en ese archivo. Son la clasificación curada de los 30 ingredientes reales del recetario, con 2 rondas de limpieza encima, y es justo lo que hay que consultar si algún día se agrega una receta y toca meter su ingrediente nuevo en la categoría correcta de `LISTA_COMPRAS.comida`. Quedó dicho en el comentario para que no se lea como código muerto.
- **Los datos ya guardados en `comida_v1.comprado`** de navegadores donde existían: no se borran, simplemente ya nadie los lee.
- **El acceso en el menú**: en vez de quitar el renglón "🛒 Lista del Súper", ahora es un enlace directo al Dashboard (con ↗). Si Adán lo busca donde siempre estuvo, lo lleva a donde ahora vive en vez de dejarlo preguntándose si se perdió.

- Verificado con Node: sintaxis OK en los 2 bloques `<script>`; CSS 138/138, `<div>` 120/120, `<section>` 5/5; `SECS`, `STITLE` y las secciones reales del HTML coinciden exacto (0 huérfanos en cualquier dirección); 0 referencias vivas a `shop-body`/`shop-pfill`/`cnt-super`/`s-super`/`S.comprado` (las 2 que quedan de `resetShop`/`renderSuper` son comentarios que documentan la eliminación); 0 enlaces internos rotos en las 10 apps; y la lista del Dashboard sigue completa y cuadrada contra las recetas (30 ingredientes, 0 de más y 0 de menos).

## "Entrevista del día" pasa a ser "🐍 Python del día", y se borra la copia iPhone (2026-08-12)

Pedido: *"borra copia iphone, en el dashboard la pagina de entrevista del dia quiero que solo me muestres la seccion de python, eso es loq ue me interesa, nadamas, no me muestres mas secciones, pero lo de python debe cambiar cada dia, ademas no se ve integrado, asi como le hiciste con lo del dashboard de aleman, lo quiero asi muy bien presentado visualmente"*.

### Qué es "la sección de Python", exactamente

No hay un módulo llamado "python". Se tomaron los que la **propia app agrupa bajo ese nombre** en su menú (los `m-label` de `entrevistas.html`): `pyfund` "Python — Fundamentos" (13), `poo` "Python — POO" (7), `testing` "Python — Testing" (20) y `pycheat` (1, el cheat sheet de métodos, que en la app no tiene módulo propio pero es del mismo tema). **41 temas** — más de un mes sin repetir.

Se verificó que `testing` sí es Python y no testing genérico antes de incluirlo: sus 20 temas son unittest, pytest, mock/patch, fixtures, parametrize, conftest, coverage, Faker y GitHub Actions + pytest. Encaja además con su trabajo real de QA.

### El filtro vive en el generador, no en el Dashboard

`MODULOS_DASHBOARD` en `Entrevistas/_generar-datos-dashboard.js`. Filtrar en origen y no al pintar tiene 2 ventajas concretas:
- **El archivo de datos bajó de 2.5 MB a 930 KB**, porque el HTML de los 188 temas descartados ya ni se copia. También se filtró la recolección de clases CSS (de 25 KB a 14 KB de reglas) y el `<style>` embebido de `wayve-algo-approach`, que venía de un módulo ya excluido y era peso muerto.
- **El Dashboard no necesitó lógica nueva**: recibe 41 temas en vez de 229 y toda la rotación diaria (`diaDelAnio() % total`), el botón "Siguiente tema" y el contador siguen funcionando sin tocarse. Para volver a incluir otro módulo se agrega su id en el generador y se corre de nuevo.
- **La app Entrevistas no se tocó**: ahí siguen los 229 temas completos. Esto solo cambia qué subconjunto viaja al Dashboard.

### Integración visual — la causa real de que "no se viera integrado"

La ronda anterior ya había remapeado `--white`/`--border` al vidrio del Dashboard, pero **el resto seguía siendo la paleta de Entrevistas** (su azul `#2563EB`, sus textos, sus fondos), así que el bloque se leía como una app ajena pegada encima. Ahora todo lo que es *color de interfaz* se toma de las variables del Dashboard, que ya cambian solas con el tema y con el slide activo: `--accent` → `var(--ac1)` (el acento del propio slide), `--text-muted` → `var(--text2)`, `--bg`/`--white` → transparente y `var(--card)`, `--border` → `var(--card-br)`, `--tag-*` → el gris translúcido de las píldoras del Dashboard.

**Lo que se dejó con color fijo, a propósito**: los colores *semánticos* (verde de "correcto", ámbar de aviso, fondo oscuro de las tablas de código). Ahí el color **es** la información — remapearlos al acento del slide se llevaría el significado. Como ya no dependen del tema, el bloque de tema oscuro se redujo a esos pocos ajustes.

**Bug encontrado y corregido en el camino**: la primera versión declaraba `--text:var(--text)` dentro de `.en-content`. Se ve razonable pero es una **autorreferencia**: el CSS la trata como ciclo, invalida la variable y el texto se queda sin color definido. La solución correcta es no declararla — las variables CSS se heredan, así que `var(--text)` dentro del bloque ya resuelve solo al valor del Dashboard.

### Presentación

- La slide se llama ahora **"🐍 Python del día"** (era "Entrevista del día").
- El badge mostraba el id crudo del módulo (`PYFUND`, `POO`). Ahora usa etiquetas legibles vía `PY_MOD_LABEL`, sin el prefijo "Python —" que la app sí usa: aquí la pantalla entera ya es de Python y repetirlo en cada badge sería ruido.
- También se corrigió un **log que mentía**: el generador reportaba "104 reglas del `<style>` embebido" aunque el filtro ya hubiera dejado ese tema fuera y el resultado real fuera 0, porque contaba sobre `RICH` en vez de sobre lo que de verdad se embebió.

### Copia iPhone borrada

`Dashboard_prueba_iphone/` (8 archivos, un solo commit, sin ninguna función de las últimas semanas). **Se avisó antes de borrar** que era el único lugar con configuración PWA — `manifest.json` + `apple-touch-icon.png` + `icon-192/512.png`, lo que permitía instalar el Dashboard en la pantalla de inicio del iPhone — y que el Dashboard real **no** la tiene. Se borró igual porque así se pidió; queda recuperable desde el historial de git si algún día se quiere montar el PWA sobre el Dashboard bueno.

- Verificado con Node: sintaxis OK en los 2 bloques `<script>` reales; CSS 534/534 llaves, `<div>` 281/281; los 41 temas tienen contenido (0 huérfanos); los 4 módulos tienen etiqueta legible (0 sin mapear); rotación diaria simulada del 12 al 16 de agosto da 5 temas distintos; 0 rastros del azul viejo `#2563EB`/`#3B82F6` y 0 autorreferencias de `--text` en el CSS generado.

## Los 41 temas de Python ahora se explican antes de entrar en jerga (2026-08-12)

Pedido, con captura de "Dataclasses": *"hay temas que ni siquiera se que son y no me das ni explicacion, arregla todo lo de python para que sea informacion valiosa y bien explicada, revisa cada uno de los temas y pon informacion que importa para saber de que se trata"*.

**El diagnóstico**: tanto el subtítulo (`hint`) como el `concept-intro` de cada tema estaban escritos **para alguien que ya sabe Python**. "Dataclasses" abría con *«@dataclass auto-genera `__init__`, `__repr__`, `__eq__`»* — si no sabes qué es un dunder ni qué es boilerplate, eso no explica nada: solo confirma que no entiendes. Y acto seguido venía una tabla de parámetros, sin haber dicho nunca qué es una dataclass ni para qué sirve.

### Qué se agregó

Un archivo nuevo, `Entrevistas/js/data-python-intro.js`, con una entrada por tema y 3 campos escritos en español llano:

- **Qué es** — sin jerga, con analogía cuando ayuda ("una clase es el molde, el objeto es lo que sale del molde"; un diccionario es "como una agenda: buscas por nombre y te da el teléfono").
- **Para qué sirve** — cuándo lo vas a escribir de verdad, con ejemplos de su terreno (recorrer resultados de prueba, parsear un log, leer un CSV).
- **Lo que importa** — lo que más se malentiende o lo que suelen preguntar en entrevista. Ej.: que 100% de cobertura **no** significa bien probado; que mockear de más hace que el test pase siempre sin comprobar nada; que `except:` a secas esconde bugs reales.

Los 41 quedaron cubiertos (el generador lo verifica y **falla ruidosamente** si alguno se queda sin explicación: imprime la lista de ids faltantes).

### Dos decisiones de diseño

**1. Archivo aparte, no editar el HTML existente.** El contenido de los temas son template strings largos dentro de `core.js` / `data-*.js`; tocarlos para insertar 41 bloques era riesgo puro de romper lo que ya funcionaba. El generador antepone el bloque al vuelo, así que reescribir una explicación es editar un objeto y volver a correr el generador. Si el archivo se borrara, el generador sigue funcionando (comprueba con `typeof`) y simplemente no antepone nada.

**2. El resumen técnico no se tira, se mueve.** El `hint` original (*"@dataclass auto-genera `__init__`…"*) sí es útil **como índice de qué cubre el tema, para quien ya lo conoce** — el problema era que estuviera de primero. Ahora:
- el **subtítulo** grande bajo el título pasa a ser la primera frase de "Qué es" (plano, sin HTML, cortado en el primer punto — se acortaron 4 explicaciones cuya primera frase salía larga para ese espacio: `poo-metodos`, `ut-estructura`, `ut-asserts`, `pt-reportes`);
- el técnico baja al final del bloque como cuarta fila, **"Resumen técnico"**.

Resultado en Dataclasses: el subtítulo ahora dice *"Un atajo para las clases que solo guardan datos y casi no tienen lógica"*, y la jerga aparece al final, cuando ya sabes de qué se está hablando.

### Presentación

`.py-intro` se estila con las variables del Dashboard (`--ac1`, `--text2`, `--ov`), no con las de Entrevistas, así que se adapta solo al tema claro/oscuro y al acento del slide — mismo criterio que la integración visual de la ronda anterior. Va con barra de acento a la izquierda para que se lea como contexto y no como una tarjeta más de contenido, etiquetas en versalitas a la izquierda y texto a la derecha; abajo de 640px las filas se apilan para no exprimir el texto en una columna de 100px.

- Verificado con Node: **41/41 temas con bloque de explicación** y con "Resumen técnico"; 0 subtítulos con HTML crudo y 0 por encima de 170 caracteres (el más largo quedó en 153); el CSS generado incluye `.py-intro`; y en `dashboard.html` la sintaxis de los 2 bloques `<script>` reales sigue OK con CSS 534/534 y `<div>` 281/281.

## El encabezado de Python y Alemán pasa de 2 columnas a 2 filas (2026-08-12)

Pedido con captura: *"los botones de la derecha me quitan mucho espacio y eso aprovechalo en el contenido, esto tambien pasa en aleman"*.

**Qué estaba pasando**: `.td-top` era `space-between` con `.td-right` apilando en vertical el badge, el contador y los 2 botones. Esa columna cobraba doble: se llevaba ~380px de **ancho** (dejando el título en una franja angosta con un hueco enorme en medio) y forzaba ~110px de **alto**, porque 4 elementos apilados marcan la altura de toda la fila aunque el título ocupe la mitad.

- **`.td-top` pasó a `flex-direction:column`** y **`.td-right` a `row`**. Ahora el encabezado son 2 renglones: arriba el título + subtítulo a **todo el ancho**, abajo una barra compacta con badge, contador y botones — 1 renglón en vez de 4.
- **`.td-right .td-counter{margin-right:auto}`** empuja los botones al extremo derecho y deja el badge y el contador a la izquierda, así la barra se reparte a lo ancho en vez de amontonarse en una esquina.
- **No hizo falta tocar el HTML de ninguna de las 2 slides**: con `.td-top` en columna, el orden que ya tenían (bloque de título primero, `.td-right` después) da exactamente la disposición deseada. Cero riesgo de romper ids o listeners.
- Se recortaron además los huecos heredados del layout viejo, que ahora eran espacio regalado: `.td-title` de 12px a 4px de margen superior, `.td-tags` de 14px a 10px, y el margen superior del contenido (`.en-content-wrap` y `.al-content`) de 16px a 10px.
- **Un solo cambio arregla las 2 pantallas** porque Alemán y Python comparten las clases `.td-*` desde que se unificaron — que era justo lo que Adán señaló al decir "esto también pasa en alemán".

En total se le devuelven al contenido del tema alrededor de 80-90px de alto y todo el ancho que antes se comía la columna derecha.

- Verificado con Node: sintaxis OK en los 2 bloques `<script>` reales; CSS 535/535 llaves; `<div>` 281/281 (sin cambios: no se tocó el HTML); las 3 reglas nuevas presentes.

## Habilidades Base: overlay más ancho e imágenes en mayor resolución (2026-08-12)

Pedido: *"las fotos de cada elemento ya cuando le das click, como que no se ven bien digo ni son hd y no se ven visualmente, puede mejorarlo y ademas esa ventana al hacer click hazla mas ancha, para todos, para que se muestre mejor"*.

**Por qué se veían mal — eran 3 causas sumadas, no solo la resolución:**

1. **Se estaban escalando hacia arriba.** Las portadas se pedían a 800px (Unsplash) o 960px (Wikimedia) pero la tarjeta ya medía 980px de ancho: el navegador las estiraba, y estirar una imagen siempre la ablanda. Al ensancharla a 1280px habría empeorado.
2. **La franja era demasiado baja** (`clamp(150px,22vh,230px)`). Con `background-size:cover`, una tira de 150px sobre una foto apaisada tira casi todo el encuadre: se veía un recorte, no la foto.
3. **El degradado la apagaba entera.** Arrancaba opaco abajo y a media altura ya iba en `.25` de negro sobre TODA la imagen, no solo detrás del título.

**Lo que se hizo:**

- **Resolución subida y verificada una por una.** Unsplash de `w=800` a `w=1600`; Wikimedia de `960px` a `1280px`. Total: **59 URLs**, de las cuales 29 quedaron en 1600px y 18 en 1280px.
- **9 imágenes se dejaron en 960px a propósito**, porque su archivo original en Commons es más chico que 1280 (`Recovery_Position` mide 512px, `Square_knot` 592px, `TruckersHitch` 837px, `FrontCrawl` 1024px…). Pedir un thumbnail mayor que el original no lo mejora: Commons devuelve error 400. Se consultó el ancho real de cada archivo por la API antes de decidir, en vez de asumir.
- **Los SVG sí se subieron aunque su tamaño nominal sea chico** (`Figure-eight_knot` dice 600px, `Dubbelehalvesteek` 590px): son vectores, se renderizan a cualquier tamaño sin perder un pixel de nitidez. Tratarlos como fotos habría dejado los diagramas de nudos innecesariamente borrosos.
- **Overlay de `min(980px,96vw)` a `min(1280px,94vw)`** — aplica también a Mis Metas, que comparte estas clases. El `96vw→94vw` deja un respiro del fondo a los lados en pantallas angostas en vez de tocar los bordes.
- **Foto de `clamp(150px,22vh,230px)` a `clamp(200px,30vh,340px)`** y **degradado reescrito** para que solo oscurezca el tercio inferior (donde va el título) y el resto de la imagen se vea limpio.
- **Ajustes al ancho nuevo**: padding interno de `18px 30px` a `20px 38px`, imágenes de paso de 220px a 300px de alto, diagramas de 300px a 400px — y en móvil se bajan a 200/260px, porque ahí el ancho no creció y el alto sí estorbaba.

**Nota operativa sobre la verificación**: al comprobar 59 imágenes seguidas, `upload.wikimedia.org` devuelve **429 (rate limit)** en varias — no es que falten. Las 50 restantes dieron 200 por `curl`, y las 9 con 429 se confirmaron existentes consultando la **API de Commons**, que no aplica ese límite. Ninguna dio 404.

- Verificado con Node: sintaxis OK en los 2 bloques `<script>` reales; CSS 537/537 llaves; `<div>` 281/281 (no se tocó el HTML); overlay en `min(1280px,94vw)` y foto en `clamp(200px,30vh,340px)`; 0 imágenes quedaron por debajo de 960px.

## La tarjeta "31 → 32 años" se reescribe: deja de medir casillas y mide realidad (2026-08-12)

Pedido, viendo la pantalla: *"esto no me aporta nada, mejorala"*. Tenía razón, y el problema era de fondo, no de redacción.

**Qué estaba mal, en concreto:**

1. **Pintaba 5 renglones idénticos.** Las 5 metas mostraban exactamente lo mismo: *"0% avanzado · ritmo esperado 12% · ⚠️ Atrasado 12pts"*. Repetir el mismo número 5 veces no informa — ocupaba media pantalla para decir una sola cosa.
2. **Medía casillas marcadas, no avance real.** `detailPct()` cuenta cuántos ítems del checklist tocó. Si nunca abre esos checklists, da 0% para siempre aunque su deuda esté bajando de verdad. **La propia frase de cierre lo admitía** (*"marcar un checklist no es lo mismo que lograrlo"*): el bloque sabía que su dato no servía y aun así regañaba con él.
3. **Ignoraba los datos duros que la app ya lee en vivo de Finanzas** — deuda cara, fondo de emergencia, fondo de Maestría. Mostrar "BYD 0%" teniendo el saldo real es sencillamente falso.
4. **Cerraba con culpa no accionable**: *"un checklist en 0% … sí es una señal real de que todavía no empezaste"*. Ninguna de las 5 frases rotativas decía qué hacer.

**Qué muestra ahora**, con 3 piezas que sí cambian y sí se pueden usar:

- **Los deadlines reales que caen dentro de esta ventana de edad**, con cuenta regresiva. Se derivan de `PHASES` (no se escriben a mano) y se filtran a los que vencen antes del próximo cumpleaños. Hoy salen 2: *Fase 0 cierra — 30 sep 2026, 49 días* (en ámbar, porque abajo de 60 días deja de ser "algún día") y *Fase 1 cierra — 31 mar 2027, 231 días*. Cada uno con su meta concreta debajo.
- **Lo que sí está medido en dinero real**, leído de Finanzas: deuda cara, fondo de emergencia y fondo de Maestría, con su cifra y su meta.
- **Una sola conclusión accionable** construida con el dato más urgente que exista: *"Lo más cercano que tienes enfrente es Fase 0 cierra, en 49 días. Antes de cumplir 32 te quedan 323 días — de esos, solo 49 para este hito."*

**Lo que no tiene dato duro ahora lo dice**, en vez de inventar un 0%: si una cifra no está registrada en Finanzas, aparece atenuada como *"Sin medir"* con la instrucción de dónde registrarla (`.sin-dato`, al 55% de opacidad, para que no se lea como si fuera un valor real).

**Limpieza que arrastró el cambio:**
- Se borraron las 9 clases CSS de la versión vieja (`.edad-pace-row/-head/-name/-status/-bar/-fill/-marker/-nums` y las 4 `.status-*`), que quedaron sin un solo uso.
- Se borró **`METAS_CORTO_MEDIANO`**, una copia de los 5 ids/íconos de `cortoMediano` que existía solo para alimentar ese bloque. Era una duplicación más que había que mantener sincronizada a mano; al quedarse sin consumidor, se elimina en vez de dejarla ahí.
- El cierre pasó de rojo con cursiva de cita a acento normal: ya no es un reclamo, es la conclusión.

- Verificado con Node: sintaxis OK en los 2 bloques `<script>` reales; CSS 538/538 llaves; `<div>` 286/286; las 14 clases que usa el bloque nuevo tienen su regla CSS (0 faltantes); 0 referencias vivas a las clases y a la constante borradas; y simulando la fecha real (12 ago 2026) los hitos y la cuenta regresiva salen correctos.

## TC Banamex liquidada — la migración de Finanzas replicada aquí otra vez (2026-08-13)

Adán liquidó la TC Banamex (saldo $0), terminó de pagar los Boletos Ticketmaster y confirmó que del Apple Watch MSI solo quedan 2 cuotas ($1,708). El cambio de fondo vive en `Finanzas/Finanzas.html` (ver [`../Finanzas/readme_finanzas.md`](../Finanzas/readme_finanzas.md) → "TC Banamex liquidada y Ticketmaster pagado").

Igual que en agosto de 2026 con los $9,000, la migración de allá **solo corre dentro del `init()` de Finanzas.html**, y Adán normalmente abre el Dashboard primero. Sin replicarla, el debt-step "💳 Banamex" del slide Coach y el patrimonio de "🎯 Mis Metas" seguirían mostrando los $9,000 que ya no debe. Se agregó `fixPagos20260813IfNeeded()`, espejo exacto de la migración de allá con `rawGet`/`rawSet` sobre `finanzasmx_v2`, llamada justo después de `fixBanamexIfNeeded()` antes del primer `loadAll()`:

- Corrige los 3 saldos (`d002` → 0 y `noInterest` 0, `d007` → 0, `d004` → 1708 con `day:18`).
- Agrega las 2 transacciones de agosto (`s064` $9,000 cat. Deudas, `s065` $1,260 cat. Entretenimiento) solo si sus `id` no existen ya — idempotente, no duplica si Finanzas ya corrió primero.
- **Bandera compartida** `finanzasmx_v2_pagos20260813`: la primera de las dos apps que arranque aplica el fix y la otra ya no lo repite.
- Si `finanzasmx_v2` no existe todavía en ese navegador, no pone la bandera — se corrige después, sin importar qué app abra primero.

Verificado con Playwright: sembrando `finanzasmx_v2` con los datos viejos (Banamex $9,000, Ticketmaster $1,260, Apple Watch $2,562) y abriendo **solo el Dashboard**, sin volver a pasar por Finanzas.html, los tres saldos quedan corregidos, las 2 transacciones se agregan sin duplicar, la deuda total baja a $349,672.85 y no hay errores de consola.

## Tercera migración espejo de Finanzas — los MSI reales de BBVA (2026-08-13)

Mismo día y mismo motivo que `fixPagos20260813IfNeeded()`, en una segunda ronda: Adán mandó su estado de cuenta de BBVA y resultó que 2 de los MSI registrados no existen (Vuelo Viva Aerobus, Mercado Libre) mientras que 3 reales no estaban (Zap Stylo, Merpago*Merca, Mercado Pago). Detalle completo en [`../Finanzas/readme_finanzas.md`](../Finanzas/readme_finanzas.md) → "Los MSI de BBVA corregidos contra el estado de cuenta real".

`fixMsiBBVA20260813IfNeeded()` (bandera `finanzasmx_v2_msibbva20260813`, llamada justo después de `fixPagos20260813IfNeeded()`):
- **Borra** `d005` y `d006` del array — no los pone en $0, porque nunca fueron deuda real y en $0 aparecerían para siempre como "liquidadas".
- Inserta `d009`/`d010`/`d011` solo si su `id` no existe ya.
- Baja el presupuesto `b005` "Deudas" de $11,700 a $8,200.

Ya van **3 migraciones espejo** en este archivo (`fixBanamexIfNeeded`, `fixPagos20260813IfNeeded`, `fixMsiBBVA20260813IfNeeded`). El patrón está estable y documentado como regla en el [README maestro](../README.md) → "Cómo mantener esto al día" #5.

Verificado con Playwright: `localStorage` sembrado con los datos viejos y abriendo **solo el Dashboard**, sin pasar por Finanzas.html — las 2 deudas fantasma desaparecen, entran las 3 reales con sus saldos ($334/$597/$717), el presupuesto queda en $8,200, la deuda total baja a $346,060.85 y una transacción capturada a mano sobrevive intacta.

## Las 2 copias gemelas resincronizadas tras el cambio de deuda (2026-08-13)

Al actualizar el Plan Maestro en Coach por la liquidación de Banamex, `PHASES` y `META_DETALLE` de este archivo —copias a mano de esas estructuras— quedaron desfasadas. Adán lo detectó viendo las metas por plazo. Se replicó todo:

- **`PHASES`**: meta y `explica` de Fase 0 (Banamex ya liquidada, el excedente va ahora a BBVA), Fase 1 (título de $3,868 → $3,145/mes; la meta "Banamex liquidada" se sustituyó por "bajar BBVA a menos de $15,000") y Fase 2. Tareas `s0-1`, `s0-7`, `s1-1`, `s2-2` reescritas, y se agregó `s0-8` ("Liquidar la TC Banamex", con fecha) para que coincida con Coach.
- **`META_DETALLE`**: los pasos de deuda dentro de las metas `byd` (Paso 2 marcado ✅ con fecha, Paso 3 con la proyección real de mar 2027), `cupra`, `depa` y `empresa`.
- **Avisos de calendario**: el de 30 sep ya no pide revisar "Banamex/BBVA en $0" sino solo el avance de BBVA; el de 1 oct dice $3,145/mes en vez de $3,868.

### Etiquetas de deuda cara ahora dinámicas

Dos lugares nombraban las tarjetas a mano: el tile "Deuda cara (Banamex+BBVA)" del slide Mis Metas y el subtítulo "restante en Banamex + BBVA" de `renderCoach()`. Con Banamex en $0 eso sugería que las dos siguen vivas. Ahora ambos arman la lista **solo con las tarjetas que tienen saldo > 0**, así que hoy muestran "Deuda cara (BBVA)" y mañana se ajustan solos sin tocar código.

El debt-step `#coachDebtSteps` no necesitó cambios: ya leía saldos en vivo y muestra "Banamex · Liquidada 🎉" con el ✅ por su cuenta.

Verificado con Playwright recorriendo los slides: el paso de Banamex sale liquidado, el tile dice "DEUDA CARA (BBVA) $32,343", y ni `3,868` ni `13,372` aparecen ya en ninguna parte del archivo renderizado.

## "Importante este mes" pasa de lista fija a agenda editable (2026-08-13)

Petición de Adán: *"pon check boxes en cada uno, además dame la habilidad de poner tareas nuevas, borrar tareas, editar, etc. para todos los meses, debo poder hacer muchas cosas aquí"*. El tile era de solo lectura: pintaba `EVENTOS_MES`, una constante en código que solo Claude podía tocar.

### El cambio de fondo: quién es la fuente de verdad

`EVENTOS_MES` deja de ser LA lista y pasa a ser solo la **semilla**. En la primera carga de cada navegador se copia a la clave nueva `dash-eventos-mes-v1` (`{ '2026-08': [{id, ico, txt, done}], … }`) y desde ahí el `localStorage` manda.

Es el punto que hace que todo lo demás funcione: **si el código siguiera mandando, borrar un pendiente no significaría nada** — reaparecería en la siguiente carga, igual que pasó con `GYM_RUTINA_DEFAULT`. La contraparte a tener presente: si más adelante se agrega un evento a `EVENTOS_MES` en el código, **no** va a aparecer solo en el navegador de Adán. Hay que decírselo para que lo capture él, o bumpear la bandera de siembra.

### Lo que se puede hacer ahora

- **Checkbox por pendiente** (`☐`/`☑`), con tachado y persistencia. La pestaña del mes muestra el número de **pendientes** (no el total) y se pinta verde cuando ya no queda ninguno, reusando `.mes-tab.done` de la Lista de Compras.
- **Agregar** con el botón `+ Nuevo` del encabezado, **editar** con ✏️ y **borrar** con 🗑️ (con `confirm` que cita el texto del pendiente).
- **Cualquier mes**, no solo los 4 fijos: flechas `‹ ›` desplazan la ventana y aparece un botón `hoy` en cuanto te alejas del mes actual.
- **Selector de ícono**: 15 emojis frecuentes de recordatorio en una tira clicable, más un input libre por si quiere otro.
- **Enter guarda, Escape cancela** — en una tarjeta de este tamaño el teclado es más rápido que apuntar al ✓.
- Pie con el conteo: *"2 pendientes · 1 hecha en Agosto 2026"*.

### Dos detalles que sí importaban

**La rotación de slides se pausa mientras escribe.** Sin esto el Dashboard le cambia de pantalla a media frase. Se para el intervalo y la barra de progreso a mano (`pausarRotacionPorEdicion()`) en vez de tocar `playing`, para no dejar el botón ▶/⏸ del HUD diciendo una cosa distinta de la que pasa; al cerrar el editor, `restartTimer()` devuelve todo al estado que ese botón ya indicaba.

**El texto se escapa.** Los pendientes ahora los escribe Adán, así que un texto con comillas o `<>` se inyectaba crudo en el `innerHTML`. Se agregó `esc()` (no existía en este archivo) y los `onclick` pasan el `id`, nunca el texto. Verificado con `Llamar a "Juan" <del taller> & pedir cotización`.

### Layout

Medido con Playwright a 1920/1440/1180px: el tile baja hasta ~227px de ancho en iPad, y ahí las pestañas más las flechas se partían en 2 líneas, estirando los paneles de Gym y Nutrición vecinos (`align-items:stretch`). Dos ajustes: la fila usa `flex-wrap:nowrap` con scroll horizontal y barra oculta —mide siempre 21px de alto sin importar el ancho—, y `MESES_VISIBLES` bajó de 4 a 3, lo cual ya no quita alcance porque las flechas llegan a cualquier mes. El botón `+ Nuevo` se movió al encabezado, donde no compite con las pestañas. La lista tiene `max-height:240px` con scroll propio por la misma razón del stretch.

Verificado con Playwright: alta, edición, borrado con confirmación, marcar/desmarcar, navegación a meses fuera de la ventana inicial, persistencia tras recargar, cancelar sin guardar, guardar vacío bloqueado con aviso, escapado de HTML, y —con el auto-play encendido— la barra se detiene al abrir el editor, el slide no cambia mientras se escribe y ambos se reanudan al cerrar. Cero errores de consola en tema claro y oscuro.

## Fase 0: espejo del reorden y un bug de dos pasos activos a la vez (2026-08-13)

`PHASES[0].semanas` se resincronizó con el reorden de Coach (ver [`../Coach/readme_coach_v2.md`](../Coach/readme_coach_v2.md) → "Fase 0 reordenada por prioridad real"): mismas 8 tareas de agosto en el mismo orden, `s0-9`/`s0-10` nuevas con las 2 prioridades, `s0-5` eliminada, `s0-3` absorbiendo la publicación de la plantilla. Meta y `explica` de la fase actualizadas al mismo texto.

### El bug que salió al hacerlo

`#coachDebtSteps` (💰 Tu ruta hacia deuda cara en $0) calculaba el paso activo encadenado al anterior: `{activo: efDone && !banaDone}` para Banamex, `{activo: banaDone && !bbvaDone}` para BBVA. Con Banamex liquidada pero el fondo de emergencia todavía en $0, esa fórmula encendía **dos pasos a la vez** — fondo de emergencia y BBVA — que es exactamente lo contrario de la prioridad que Adán acababa de pedir.

Se sustituyó por el primer paso sin terminar, uno solo:

```js
const _iActivo=steps.findIndex(s=>!s.done);
steps.forEach((s,i)=>{ s.activo=(i===_iActivo); });
```

Ahora el activo es el fondo de emergencia y, en cuanto llegue a $10,000, salta solo a BBVA. La forma encadenada asumía que los pasos se completan en orden; en cuanto uno se cumplió antes de tiempo, dejó de sostenerse.

También, la fecha de liquidación de Banamex en ese paso (`Liquidada 🎉 · 13 ago 2026`) **no está escrita a mano**: sale de la transacción real del pago (`s064`) en `finanzasmx_v2`, así que si algún día vuelve a usar y liquidar la tarjeta, el dato se mantiene solo.

Verificado con Playwright: `PHASES[0]` idéntico a Coach, sin `s0-5`, y en la ruta de deuda exactamente **1 paso activo** (antes 2) con la fecha correcta leída de la transacción.

## Libreta de logros: lo conseguido deja de depender del dato que lo produjo (2026-08-13)

Adán reportó que el paso "Banamex" de la ruta de deuda mostraba **"Sin datos en Finanzas"** en vez de "Liquidada", y explicó por qué le importa: *"debes tener los registros siempre porque si no sentiré que no logro nada"*.

### La falla de diseño detrás del síntoma

Todo el avance se derivaba **en vivo** del array `debts` de `finanzasmx_v2`. Eso significa que **el logro desaparecía junto con el dato**: si la deuda se borra (y en el bloque "✅ Liquidadas" de Finanzas ahora hay un botón 🗑️ que invita a hacerlo), se renombra, o el navegador todavía no tiene `finanzasmx_v2`, el Dashboard le decía que no había logrado nada. Para una app cuyo propósito declarado es sostener su avance, es el peor modo de fallo posible.

**`dash-logros-v1`** invierte la dependencia: cuando se **detecta** un hito cumplido se graba con su fecha, y a partir de ahí el registro manda. Nunca se sobrescribe ni se borra solo, aunque la fuente original desaparezca — misma lógica que `indicatorHistory` en Finanzas: un hecho pasado no se puede reconstruir después, así que se guarda cuando se ve.

`detectarLogros()` corre dentro de `loadAll()` y cubre: Banamex liquidada, Ticketmaster pagado, BBVA liquidada, deuda cara en $0, fondo de emergencia completo, BYD liquidado. Banamex se detecta por **3 señales independientes** (la transacción `s064`, la bandera de migración `finanzasmx_v2_pagos20260813`, o la tarjeta con saldo ≤ 0) precisamente para que ninguna sola pueda hacer desaparecer el logro.

Para el caso extremo —Dashboard abierto en un navegador donde nunca se abrió Finanzas, donde no hay ninguna señal que detectar— `seedLogros20260813IfNeeded()` siembra los 2 hitos que Adán ya confirmó, con su fecha real. Bandera de una sola vez, así que si los borra a mano no vuelven.

### Un segundo bug que salió en el camino

El matcher era `/banamex/i` sobre el nombre, sin filtrar por tipo. Eso también matchea **"Apple Watch MSI (TC Banamex)"**: al borrar la tarjeta, el paso pasaba a mostrar `$1,708 restante` —el saldo del reloj— haciéndose pasar por la deuda de la tarjeta. Reproducido con Playwright antes de arreglarlo. Ahora los 3 lugares que lo usaban (`renderCoach`, `renderMetasSlide`, la ruta de deuda) exigen `type === 'credit_card'`, como BBVA ya hacía.

### Tira "🏅 Ya conseguido — esto no se borra"

Bajo la ruta de deuda, la lista completa de logros con su fecha, ordenada cronológicamente. Sin esto los hitos solo se veían como un ✅ dentro de su paso y se perdían de vista conforme la ruta avanzaba. **No se oculta con el modo privado**: no muestra montos, solo hechos y fechas.

### Fecha local, no UTC

`registrarLogro()` usa `hoyLocal()` en vez de `toISOString().slice(0,10)`. En México (UTC-6) el ISO ya está en el día siguiente a partir de las 18:00, así que un logro conseguido por la noche quedaba fechado mañana.

### Verificación (Playwright, 5 escenarios)

| Escenario | Resultado |
|---|---|
| Normal | ✅ Liquidada 🎉 · 13 ago 2026 |
| Deuda `d002` **borrada** de Finanzas | ✅ sigue liquidada (antes: "$1,708 restante" del Apple Watch) |
| Borrada **y** sin la transacción `s064` | ✅ sigue liquidada |
| Dashboard **sin haber abierto Finanzas nunca** | ✅ sigue liquidada (antes: "Sin datos en Finanzas") |
| Fondo completo + BBVA en $0 | ✅ los 3 pasos hechos, 5 logros en la tira |

Además: borrar un logro a mano y recargar **no** lo re-siembra, y una fecha editada a mano se respeta en vez de pisarse. Cero errores de consola.

## El sábado se convierte en día de ingreso: dos bloques de Didi (2026-08-15)

Pedido de Adán: *"en mi dia, el sabado quiero trabajar de dia en didi y en la tarde noche tambien"*.

El sábado no tenía **nada** de Didi. Era el día de trabajo propio: un bloque profundo de 4h (08:50–12:50) para la prioridad del Plan Maestro, 30 min de IA aplicada, la revisión semanal a las 16:00 y el bloque de freelance de las 17:00. Meter dos turnos al volante no era añadir tareas, era **decidir qué se sacrifica** — por eso se le presentaron 3 repartos concretos del día completo antes de tocar el código, y eligió *"Didi manda (máximo ingreso)"*.

### El sábado antes y después

| Antes | Después |
|---|---|
| 07:00–08:50 despertar, skincare, desayuno, suplementos, ejercicio 1h, ducha | **sin cambios** |
| 08:50 🎯 Bloque profundo 4h (Plan Maestro) | **09:00 🚗 Didi — bloque de día (~5h)** |
| 12:50 Almuerzo | 14:00 Almuerzo |
| 13:20 🤖 IA aplicada 30 min | **eliminado** |
| 16:00 💰 Revisión semanal | 14:40 💰 Revisión semanal |
| 17:00 Freelance/plantilla (`fl1`, compartido con domingo) | **17:00 🚗 Didi — tarde-noche (~5h)** |
| 20:30 Tiempo libre / familia / lectura | 15:30 Tiempo libre / familia (entre los dos turnos) |
| 20:00 Cena → 21:45 Dormir | 22:00 Cena → 23:00 Dormir |

Resultado: **~10h al volante** repartidas en dos turnos, con la ventana de 14:00–17:00 como único hueco de trabajo propio y descanso.

### Cambios en `RUTINA_TASKS`

- **2 tareas nuevas**: `sa-didi1` (09:00) y `sa-didi2` (17:00), ambas `cat:'admin'` — la misma categoría que usan los bloques de Didi entre semana (`wd08`, `wd-didi2`) y el del domingo (`do05`).
- **2 tareas eliminadas**: `sa06` (bloque profundo 4h) y `sa08` (IA aplicada).
- **`fl1` pasa de `dias:[6,0]` a `dias:[0]`** — las 17:00 del sábado ahora son el segundo turno de Didi. El bloque de freelance sobrevive intacto en domingo.
- **8 tareas recorridas de hora**: `sa07` 12:50→14:00, `sa10` 16:00→14:40, `sa12` 20:30→15:30, `sa11` 20:00→22:00, `sa1113` 21:00→22:20, `saSupPm` 21:15→22:30, `sa14` 21:30→22:45, `sa15` 21:45→23:00.

La hora de dormir se recorre 1h15 (21:45 → 23:00), pero **el despertar de las 07:00 no se movió**, así que sigue durmiendo ~8h. El cierre completo (cena, skincare+minoxidil PM, suplementos, meditación) se conserva entero, solo desplazado — es la parte de la rutina que no se negocia.

### Replicado en las 2 copias

`RUTINA_TASKS` vive duplicado en `Dashboard/dashboard.html` y `Coach/Coach_v2.html` (ver tabla "Datos duplicados"). Los 16 bloques del sábado se compararon **carácter por carácter** entre ambos archivos tras el cambio: idénticos.

### La alarma por IA que resultó ser falsa (corregido el mismo día)

La primera versión de esta nota decía que al quitar `sa08` **IA se quedaba sin práctica en toda la semana**. Adán lo corrigió de inmediato: *"en IA no practico pero ando haciendo esta aplicacion"*. La práctica existía —y es mucho más real que 30 min de sábado leyendo sobre n8n— solo que **nunca había estado en la rutina**, así que ninguna app del ecosistema la veía. Ver la sección siguiente, donde se agrega.

La lección no es sobre IA: es que **`RUTINA_TASKS` solo conoce lo que alguien escribió en él**. Un hueco en el horario no prueba que la actividad no ocurra, prueba que no está registrada — y aquí la actividad no registrada era, literalmente, construir la aplicación que muestra el horario.

### Verificación (Node)

Sintaxis JS OK en los 2 archivos (2 bloques `<script>` cada uno, 0 errores). `RUTINA_TASKS` evaluado de verdad en ambos: 68 tareas, 16 en sábado, **en orden cronológico estricto** y sin IDs duplicados. Cero referencias huérfanas a `sa06` o `sa08` en el resto del código.

## La rutina entre semana registra por fin el trabajo en esta aplicación (2026-08-15)

Al documentar el cambio del sábado se afirmó que Adán se había quedado sin práctica de IA. Su respuesta:

> *"en IA no practico pero ando haciendo esta aplicacion, esto le dedico 20 min cuando me despierto, es decir me despierto entre semana 6:40 y continuo armando esta aplicacion, hasta 7 [am] que comienza toda mi rutina y en las noches entre semana igualmente, 11:30 empiezo a trabajar en esta aplicacion hasta las 12 o a veces 1 am"*

Dos bloques diarios, todos los días entre semana, que **no existían en ninguna parte del ecosistema**. La rutina daba por hecho que despertaba a las 07:00 y dormía ~7h; ninguna de las dos cosas era cierta desde hacía tiempo.

### Lo que estaba mal, no solo incompleto

| Dato | Decía | Es |
|---|---|---|
| Hora de despertar (`wd01`) | 07:00 | **06:40** — las 07:00 eran la hora a la que ya se estaba bañando |
| 06:40–07:00 | *nada* | **20 min construyendo esta aplicación** |
| 23:10–23:55 | "Tiempo libre / relajación antes de dormir" (45 min) | tiempo libre 20 min + **app desde las 23:30** |
| Hora de dormir (`wd21`) | 23:55, *"buscas ~7h (medianoche a 7:00am)"* | **00:00, a veces 01:00** |
| Sueño real | ~7h | **5h40–6h40** |

### Cambios en `RUTINA_TASKS`

- **`wd-app-am`** (06:43, `cat:'aprender'`) — 20 min exactos hasta el baño de las 07:03.
- **`wd-app-pm`** (23:30, `cat:'aprender'`) — hasta las 00:00, a veces la 01:00.
- **`wd01` de 07:00 a 06:40**, y `wd20e` (tiempo libre) acortado a sus 20 min reales.
- **`wd21` de 23:55 a 23:59**, con el texto reescrito para decir la hora real de dormir y el rango de sueño que implica.

Van en `cat:'aprender'` y no en `'profundo'` a propósito: **son su práctica real de IA aplicada**. No es leer sobre IA, es construir software con Claude Code todos los días — la habilidad `ia` del radar (valor 30, peso 1.2) tenía práctica diaria y el sistema no la veía.

### Por qué `wd21` se ancla en 23:59 y no en 00:00

`rutinaTareasDelDia()` ordena con `a.hora.localeCompare(b.hora)`, comparación de **texto**, no de tiempo. Un `'00:00'` es lexicográficamente menor que `'06:40'`, así que "Apagar pantallas. Dormir" se habría renderizado como **la primera tarea de la mañana**, y `siguienteTarea()` (que recorre `t.hora<=hhmm`) habría dado "ahora/siguiente" mal todo el día. `rtDur()` sí maneja el cruce de medianoche (`if(mins<=0) mins+=24*60`), pero el orden no. La hora real vive en el texto de la tarea, que es donde no rompe nada. **Cualquier tarea futura que caiga después de medianoche tiene el mismo problema** — no hay soporte para días que cruzan la medianoche en el modelo actual.

### Prosa corregida en Coach

El `context-banner` de `#rutina` en `Coach_v2.html` (texto visible, no comentario) afirmaba *"te levantas 7:00"* y *"Duermes alrededor de medianoche (~7h de sueño)"*. Reescrito con el horario real, incluidos los dos bloques de la aplicación y el rango de sueño verdadero.

### Verificación (Node)

Sintaxis OK en los 2 archivos. `RUTINA_TASKS` evaluado: **70 tareas** (68 + 2), sin IDs duplicados. El lunes renderiza 26 tareas en orden cronológico estricto de 06:40 a 23:59, y el sábado sigue en sus 16 en orden. Los bloques nuevos son idénticos entre Dashboard y Coach.

### Lo que queda pendiente de decidir

Adán dijo **"entre semana"** para los dos bloques, así que el sábado (que en el cambio anterior quedó durmiendo a las 23:00) y el domingo **no se tocaron**. Si también construye la app los fines de semana, hay que replicarlo ahí.

## El fin de semana se lleva el Didi y las noches entre semana se liberan (2026-08-15)

Tercer ajuste del mismo día, y el que cierra la reorganización: *"el domingo tambien quiero trabajar mucho mas en didi, entre semana deberia enfocarme en lo demas y dedicarme menos tiempo a trabajar en didi"*.

No es un recorte de ingreso, es un **traslado**: las horas al volante se concentran en sábado y domingo, y las noches de lunes a viernes quedan para construir. Antes de proponer nada se revisaron dos cosas del propio proyecto:

- **`wd08` (17:00, "1 pasajero a Buenavista ~40 min") no es tiempo perdido.** Su gym está en Buenavista y entra a las 17:40, así que ese trayecto lo maneja de todos modos — el pasajero es ingreso prácticamente gratis. El que sí cuesta tiempo real es `wd-didi2` (19:20–21:00, ~1h40).
- **El Plan Maestro ya tenía una regla al respecto**, en Fase 1 (`s1-4`): *"Primer peso cobrado en Opción 1-3 → esas horas de DiDi se mueven ahí (Opción 6), **no antes**."* Estamos en Fase 0 y no hay primer peso cobrado, pero lo que pidió no la contradice: no deja de manejar, mueve las horas al fin de semana.

Se le ofrecieron 3 repartos para el domingo y 3 grados de recorte entre semana. Eligió **máximo ingreso el domingo** y **el recorte suave entre semana** (conservar los dos bloques, acortando el de la noche).

### Domingo: de 8h indefinidas a 11h20 en dos turnos

`do05` decía solo *"🚗 Trabajar en Didi"*, sin hora de término — se asumía que terminaba a las 17:00 porque ahí entraba el bloque de freelance. Y **el domingo no tenía comida agendada en absoluto**: iba de las 09:00 a la cena de las 21:00 sin almuerzo.

| Antes | Después |
|---|---|
| 09:00 🚗 Didi (sin hora de término) | **09:00 🚗 Didi — bloque de día (~5h)** |
| *nada* | **14:00 🍽️ Almuerzo** (`do-alm`, nuevo) |
| 17:00 Freelance/plantilla (`fl1`) | **14:40 🚗 Didi — tarde-noche (~6h20)** |
| 20:00 Finanzas · 20:30 Plan Maestro · 21:00 Cena · 21:20 Diario | 21:00 Cena · **21:20 Finanzas · 21:35 Plan Maestro · 21:45 Diario** |
| 22:15 Dormir | 22:45 Dormir |

El cierre de semana **no se eliminó**, se comprimió a 40 min corridos después de la cena. Es lo que mantiene vivo el Plan Maestro: si desaparece, nada revisa si la fase sigue en verde.

### Entre semana: la prioridad de Fase 0 pasa de 15 min a 1h15

`wd-didi2` se recorta de ~1h40 a ~40 min (hasta las 20:00), y esa hora entera se la lleva `wd11`:

| | Antes | Después |
|---|---|---|
| `wd-didi2` | 19:20 → ~21:00 | 19:20 → **~20:00** |
| `wd11` (Prioridad Fase 0) | **21:00 → 21:15 (15 min)** | **20:00 → 21:15 (1h15)** |

Ese bloque —*"negocio de tu papá o plantilla GBM, 1 avance real"*— es lo que Fase 0 marca como prioridad activa, y tenía **quince minutos** encajados entre el fin de Didi y la cena. Ahora tiene 1h15 reales, cinco veces más, cinco días a la semana: **~6h15 semanales que antes no existían**.

### `fl1` se eliminó del proyecto

Perdió el sábado en el primer cambio del día y ahora el domingo. Era condicional (*"si ya hay cliente o ventas activas"*) y en la práctica estaba vacío — no hay cliente todavía. **Cuando se cobre el primer peso en las Opciones 1-3 hay que volver a crearlo**: es justo el momento que `s1-4` señala para mover horas de Didi al negocio. Queda anotado en un comentario del código, en los dos archivos.

### Reparto final de Didi

| Día | Bloques | Total |
|---|---|---|
| Lun–Vie | 17:00 (camino al gym) + 19:20–20:00 | ~1h20/día |
| Sábado | 09:00–14:00 + 17:00–22:00 | ~10h |
| Domingo | 09:00–14:00 + 14:40–21:00 | ~11h20 |

**~28h a la semana**, contra las ~19h de antes del día de hoy — más ingreso total, y aun así las noches entre semana quedaron libres.

### Verificación (Node)

Sintaxis OK en los 2 archivos. **71 tareas** (70 − `fl1` + `do-alm` + `do-didi2`), sin IDs duplicados. Domingo con 17 tareas en orden cronológico estricto; lunes con 26, de 06:40 a 23:59; sábado con 16. `RUTINA_TASKS` comparado tarea por tarea entre Dashboard y Coach: **idéntico salvo los `href` de `k2` y `k5`**, que deben diferir por diseño (el Dashboard apunta a `../Coach/Coach_v2.html#aprendizaje`, Coach al ancla interna `#aprendizaje`) — verificado contra `git HEAD` que esa diferencia es preexistente y correcta.

## El traslado a ALTEN deja de ser tiempo muerto (2026-08-15)

Cuarto y último ajuste del día: *"de lunes a viernes, tambien deberia manejar al trabajo pero en didi, hay una opcion de direccionamiento, entonces eso tomaria 20 min mas pero si lo hare o deberia hacerlo, aun que llegue 8:30 al trabajo esta bien"*.

Preguntó si debía hacerlo, y la respuesta es que sí: es **el mismo razonamiento que ya justificaba `wd08`**. Ese trayecto lo maneja todos los días de todas formas; el único costo nuevo son los ~20 min del desvío del pasajero. El resto del tiempo ya estaba gastado en gasolina sin producir nada.

### La pregunta que sí importaba

Llegar a las 8:30 solo es gratis si **la hora de salida no se recorre**. Si ALTEN le descontara esos 30 min, toda la tarde se movería y el bloque de Fase 0 que acababa de crecer a 1h15 bajaría a 45 min — 2h30 semanales perdidas para ganar ~1h45 de Didi. Confirmó que **su horario de entrada es flexible y sigue saliendo a las 17:00**, así que nada de la tarde se mueve.

| | Antes | Después |
|---|---|---|
| `wd06` (07:40) | "Salir de casa — traslado a ALTEN (~20 min manejando)", `cat:'descanso'` | **"🚗 Didi con direccionamiento — camino a ALTEN (~50 min)"**, `cat:'admin'` |
| `wd07` (ALTEN) | 08:00, *"jornada laboral (HIL/SIL Ford)"* | **08:30**, *"entras 08:30, sales 17:00"* |

Los ~50 min son los ~20 del trayecto normal + los ~20 del desvío + margen para que le asignen el viaje. Sale a la misma hora que antes (07:40), así que **la mañana no cambia en nada**: el bloque de la aplicación de las 06:43 y toda la rutina de higiene quedan intactos.

### Dos de sus tres bloques diarios de Didi ya no cuestan tiempo

| Bloque | Franja | Costo real de tiempo |
|---|---|---|
| `wd06` — camino a ALTEN | 07:40–08:30 | **~20 min** (el desvío) |
| `wd08` — camino al gym en Buenavista | 17:00–17:40 | **~0** (ya manejaba ahí) |
| `wd-didi2` — sesión corta de la noche | 19:20–20:00 | 40 min |

~2h10 diarias al volante entre semana, de las cuales solo ~1h es tiempo que no estaría usando en otra cosa. Es exactamente lo que pidió esta misma mañana —*"dedicarme menos tiempo a trabajar en didi"*— sin perder ingreso: el tiempo dedicado bajó, el ingreso subió.

### Prosa corregida

El `context-banner` de `#rutina` en `Coach_v2.html` decía *"sales 7:40, manejas hasta 8:00"* y *"Por la noche retomas Didi hasta ~21:00"* — las dos cosas ya eran falsas tras los cambios de hoy. Reescrito completo, incluida la nota de que 2 de los 3 bloques son trayectos que ya hacía.

### Verificación (Node)

Sintaxis OK en los 2 archivos, 71 tareas, sin IDs duplicados. Lunes con 26 tareas en orden cronológico estricto de 06:40 a 23:59, con ALTEN entrando a las 08:30 y la tarde sin moverse (gym 17:40, Fase 0 20:00). `RUTINA_TASKS` equivalente entre Dashboard y Coach salvo los `href` de `k2`/`k5`, que difieren por diseño.

## "Qué escuchar en Didi": las 28h al volante dejan de ser tiempo perdido (2026-08-15)

Cierre del día. Tras concentrar el Didi en fin de semana, Adán ató los dos cabos él solo: *"existe la manera de que cuando maneje en didi ponga podcast, audiolibros, usar youtube premium en un audicular y mientras manejo puedo escuchar infinidad de libro, entonces en esa seccion pon que hacer en didi... ademas debes darme links"*.

Es la observación más rentable de la jornada: **~28h semanales de atención disponible** que ninguna app del ecosistema estaba contando. A 6-9h por audiolibro son **3-4 libros al mes**, sin robarle un minuto a nada.

### Dónde vive

- **Franja `#didiStrip`** en el slide de Habilidades, **en la misma fila que el título** (patrón que ya usaba el slide de Lista de Compras). Una línea: *"🎧 ~28h/semana al volante"* + botón.
- **Overlay `#didiOverlay`** con todo el catálogo. Mismo lenguaje visual que `.meta-detail-overlay` (fondo con blur, card que sube, cierre por ✕/clic fuera/Escape) pero con clase propia para no acoplarse a las 2 pantallas que ya usan aquella.

El slide declara en su código que es **pasivo** —*"nada de clics, rota solo y se ve de reojo"*— y eso se respeta: la franja se lee sin tocar nada y el detalle es opt-in.

### Qué contiene (20 recursos, 40 links)

Ordenado por el valor real de `SK`, de la habilidad más débil a la menos débil — no por gusto:

| Habilidad | Valor | Qué se ofrece |
|---|---|---|
| 🤝 Ventas | 15 · ×1.5 | Cialdini, $100M Offers, Chris Voss, The Game, canal de Hormozi |
| 💰 Finanzas | 20 · ×1.1 | Ramit Sethi (libro + podcast), Morgan Housel, Millionaire Next Door |
| 📣 Marketing | 20 · ×1.2 | $100M Leads, Marketing School |
| 📈 Inversión | 25 · ×1.2 | Bogle, Malkiel, Peter Lynch, We Study Billionaires |
| 🤖 IA | 30 · ×1.2 | Lex Fridman, The AI Daily Brief, DeepLearning.AI |

Más 2 en español (Libros para Emprendedores, Cracks Podcast) y una tabla de **qué cabe en cada trayecto**, construida sobre sus bloques reales de `RUTINA_TASKS`: lo denso en el trayecto de 50 min a ALTEN y en los turnos largos de fin de semana, lo ligero en los tramos de 40 min.

**Ningún título está inventado.** Todos los libros salen de `APRENDIZAJE[].recursos`, que ya vivían en el proyecto — el trabajo fue decidir cuáles funcionan en audio, en qué orden y en qué hueco.

### Los links son búsquedas, no IDs — a propósito

`didiSpo()`/`didiYt()` generan `open.spotify.com/search/…` y `youtube.com/results?search_query=…`. Un ID de episodio escrito a mano se rompe en silencio si el catálogo cambia de región (México ≠ US) o si el show se re-sube, y el resultado sería un 404 dentro de su propia app. Una búsqueda por título+autor no caduca.

### Tres avisos que el catálogo incluye

- **Su inglés está en 80/100**: escuchar en inglés le paga doble (la habilidad + el idioma que necesita para la maestría en Alemania).
- **Con pasajero, bajar el volumen**: su calificación en Didi es parte del ingreso.
- **`The Intelligent Investor` es la excepción**: es su recurso #1 de Inversión pero está lleno de tablas y notas al pie — ese se lee, no se maneja. Es el único recurso del proyecto que el catálogo desaconseja explícitamente.

### Verificación (Playwright, 4 resoluciones)

**El slide ya venía desbordando su alto fijo antes de tocarlo** — y la primera versión de la franja, en fila propia, lo empeoraba. Se midió, se movió a la fila del título y se recortó el texto hasta que dejó de hacer wrap (el ancho útil es 1049px; título 604 + franja 483 + gap 18 = 1105 lo rompía). Resultado, comparado contra `git HEAD`:

| Resolución | Antes | Después |
|---|---|---|
| 1920×1080 | cabe +242px | **cabe +270px** |
| 1440×900 | cabe +54px | **cabe +71px** |
| 1366×768 | desborda 65px | **desborda 46px** |
| 1280×800 | desborda 60px | **desborda 44px** |

La franja quedó con **coste cero de alto** (la fila del título mide 63px con y sin ella) y de paso el slide mejoró 16-28px en las 4 resoluciones, porque el `margin-bottom:clamp(20px,3vh,40px)` del título se sustituyó por 10px en la fila contenedora.

**El desborde de 1366×768 y 1280×800 sigue vivo y es preexistente.** Corta el eyebrow arriba y los links "Ajustar … en Coach →" abajo. No se arregló aquí porque la única salida real es quitar texto de las tarjetas de `#skillPriority` (encogerlas contradice el feedback ya establecido de que *compacto = menos texto, no elementos chicos*), y eso es una decisión de producto que no se pidió. En las pantallas donde Adán trabaja normalmente cabe con holgura.

Verificado además: el overlay abre y cierra (✕, clic fuera, Escape), renderiza 5 habilidades, 5 franjas horarias, 20 recursos y 40 links —20 Spotify + 20 YouTube, los 40 con `target="_blank"` y `rel="noopener"`— y cero errores de consola.

### Ojo al futuro

`DIDI_AUDIO` referencia `SK` por id (`ventas`, `finanzas`, …) y pinta el valor en vivo, así que si Adán mueve un valor del radar el catálogo se reordena solo. Pero **el texto del campo `why` de cada habilidad está escrito a mano y menciona el número** ("20/100. Tu diagnóstico dice…"): si el valor cambia, ese texto hay que actualizarlo a mano. Mismo tipo de desincronización que ya documentada entre `SK` y `RUTINA_TASKS`.

## El slide de Habilidades deja el morado, y el catálogo se redistribuye (2026-08-15)

Dos correcciones sobre lo entregado el mismo día: *"me gusta el contenido aqui pero el color morado no me gusta y visualmente se me hace mucho"* y, sobre el catálogo, *"no le metas mas, solo que ordenadamente o como lo distribuiste no se me hace bien"*.

### El color: no era solo el tono

`theme-skills` usaba `#b06eff` + `#ff6bd6`, **los 2 tonos más saturados de las 9 pantallas**, pintando las 2 manchas de 58vmax de `.slide::before/::after` al 20% de opacidad. Encima, `#skillBars` ya trae su propia escala rojo→verde. Eran dos capas de color fuerte compitiendo por la misma pantalla, y por eso "se me hace mucho" apuntaba a la intensidad tanto como al tono.

Se renderizaron **4 variantes en su tema oscuro** (no descripciones: capturas reales del slide) y se publicaron como artifact para que comparara:

| Variante | Colores | Resultado |
|---|---|---|
| Actual | `#b06eff` + `#ff6bd6`, op .20 | el problema |
| A · Acero + teal | `#4a7fb5` + `#2a9d8f`, op .14 | recomendada; descartada por él |
| B · Grafito frío | `#3f4a6b` + `#2c6e7e`, op .16 | descartada al verla: dejaba el texto lavado |
| **C · Verde bosque** | **`#2d6a4f` + `#40916c`, op .16** | **elegida** |
| D · Mismo morado tenue | `#b06eff` + `#ff6bd6`, op .10 | descartada |

La opacidad baja a `.16` **solo en este slide** (`.theme-skills::before/::after`), sin tocar la regla global de `.slide`. El tema claro ya tenía su propio `.12` y no se toca.

### La distribución del catálogo: 3 arreglos, 0 contenido nuevo

Pidió explícitamente **no agregar nada** —se habían propuesto alemán, Copy y un orden de arranque, y los rechazó— solo reordenar. Los 20 recursos y 40 links son exactamente los mismos.

**1. Las franjas horarias estaban desbalanceadas.** Eran 5 tarjetas en `auto-fit minmax(215px,1fr)`: entraban 4 en la primera fila y **Domingo quedaba huérfano** en una segunda fila medio vacía. Ahora van en 2 grupos con encabezado —*Entre semana · tramos cortos* (3 en fila) y *Fin de semana · turnos largos* (2 en fila)—, que además agrupa por el criterio que de verdad las separa: la duración es lo que decide si cabe un podcast o un audiolibro.

**2. Las 5 habilidades eran una tira vertical.** Con 1100px de ancho de overlay, apilarlas obligaba al doble de scroll. Ahora `#didi-skills` es un grid de 2 columnas con **Ventas a ancho completo** (`grid-column:1/-1`): es 15/100 con peso ×1.5 —la prioridad absoluta— y la que más recursos trae, así que la jerarquía visual coincide con la real en vez de pelearse con ella. Las 4 restantes quedan en 2×2 respetando el orden por debilidad.

**3. Los links partían el nombre del libro.** `Spotify ↗ YouTube ↗` iba pegado al final del título, así que la vista chocaba con ellos antes de terminar de leer *"The Little Book of Common Sense Investing — John Bogle"*. Ahora hay un `.didi-item-top` en flex con los links empujados a la derecha (`margin-left:auto`): el título se lee limpio y los links quedan en una columna alineada.

Se añadió un breakpoint en 820px que devuelve todo a 1 columna.

### Verificación (Playwright, tema oscuro)

2 grupos de franjas con sus 5 tramos, habilidades en grid de `520.5px 520.5px`, Ventas confirmada a ancho completo, 20 items y 40 links intactos, cero errores de consola. El slide sigue cabiendo igual que antes del cambio de color (1920×1080 sobran 265px, 1440×900 sobran 76px; el desborde preexistente de ~43px en 1366×768 y 1280×800 no se movió, ver la sección anterior).

Un 404 que apareció en una corrida no se reprodujo en carga limpia **ni en la versión de `git HEAD`** — era de red, no del código.

## La Lista del Súper aprende a contar, y el catálogo de Didi suma Apple y español (2026-08-15)

### Lista de Compras: fuera el precio unitario, dentro el contador

Pedido: *"no me pongas el precio unitario, eso calculalo tu, mejor dame la opcion que en cosas asi como fruta, tenga la opcion de añadir el mismo producto, osea un contador y al final tu me das el precio a prox"*.

Cada renglón mostraba **2 píldoras de precio**: la de referencia (`✓ $59/kg`) y la de la compra típica (`⚖️ ≈200 g = $12`). La primera obligaba a multiplicar de cabeza en el pasillo — justo el trabajo que la app debería hacer. Y no había forma de decir "llevo 3 aguacates": el checklist era binario, así que el total mentía en cuanto compraba más de uno de algo.

| Antes | Después |
|---|---|
| `Aguacate` `✓ $59/kg` `⚖️ ≈200 g (1 pza) = $12` | `Aguacate` `✓ ⚖️ ≈200 g (1 pza)` `[− 3 +]` `$36` |

El precio unitario **no se borró del modelo**: `LISTA_COMPRAS_PRECIOS[].precio` sigue ahí, se usa para calcular y ahora vive en el `title` del renglón junto al origen del dato. Lo que desapareció es la obligación de leerlo.

**El dato persistido cambió de tipo.** `dash-lista-compras` guardaba `true` por producto; ahora guarda un **número**. `lcQty()` normaliza `true → 1`, así que las listas ya guardadas en el navegador de Adán siguen funcionando sin migración ni bandera.

**Dónde aparece el contador**: solo en `comida` con entrada en `LISTA_COMPRAS_PRECIOS` (`lcTieneQty()`) — 30 productos. En skincare/cabello/suplementos/libros no hay `monto` que multiplicar (son compras de 1 pieza cada varios meses), así que ahí el checkbox se queda igual. Eso responde al *"solo hazlo en productos que son parecidos y puedes hacerlo"*.

**Detalles de comportamiento**:
- El checkbox y el contador son la misma cosa: marcar pone 1, bajar a 0 desmarca. Por eso `lcCambiarQty()` repinta el renglón entero (`#<id>-row`) en vez de solo el número — si no, la casilla y el contador se desincronizaban.
- El `−` va `disabled` en 0, y el tope es 99.
- El subtotal del renglón se pinta en verde cuando lleva más de 1, para ver de un vistazo dónde se va el ticket.
- La barra de arriba pasó de *"Total marcado"* a **"Aproximado del ticket"**, y distingue **productos** de **piezas**: 3 aguacates y 2 papayas son *"2 productos · 5 piezas"*. Antes decía "2 productos" y sumaba $12+$29 aunque llevara cinco cosas.
- Se reescribió la leyenda, que seguía explicando la píldora de precio unitario que ya no existe.

### Didi: Apple en todos los recursos y el español pasa de 2 a 8

Pedido: *"ponme audiolibros tambien los links de apple y añademe tambien podcast o audiolibros en español"*.

**Apple son 2 destinos, no uno.** Los audiolibros viven en Apple Books y los podcasts en Apple Podcasts; mandar uno al buscador del otro da 0 resultados. Por eso `didiApple(tipo,q)` decide según el tipo del recurso — `books.apple.com/mx/search` o `podcasts.apple.com/mx/search`, ambos con dominio `/mx/`. **Se omite en los items de tipo `yt`** (Alex Hormozi, DeepLearning.AI): son canales de YouTube y no existen en ninguna de las dos tiendas, así que el link llevaría a una búsqueda vacía — peor que no ofrecerlo.

**Español: de 2 a 8 recursos**, ahora con audiolibros y no solo podcasts. Los 3 audiolibros (Psicología del Dinero, Influencia, Padre Rico Padre Pobre) son **ediciones en español de títulos que ya estaban en el catálogo en inglés**, salvo Kiyosaki: mismo contenido, sin traducir de cabeza mientras maneja. Los 5 podcasts suman Dementes, Tengo un Plan y Whitepaper a los 2 que ya había. La sección se pinta en 2 columnas (audiolibros | podcasts) reusando el `.didi-skills` que ya se había creado para las habilidades.

### Verificación (Playwright, tema oscuro)

**Lista**: 30 contadores, **cero precios unitarios visibles** (regex sobre el texto renderizado), y la aritmética comprobada de punta a punta — marcar Aguacate da `$12 (1 producto)`, subirlo a 3 da `$36 (1 producto · 3 piezas)` y el subtotal del renglón dice `$36`.

**Didi**: 26 recursos (20 + 6 nuevos), **76 links**. Apple aparece en 24 — 13 Books + 11 Podcasts — que son exactamente los 26 menos los 2 canales de YouTube. Sección en español con 8 items. Links verificados uno de cada tipo: `books.apple.com/mx/search?term=Influence Robert Cialdini` y `podcasts.apple.com/mx/search?term=The Game Alex Hormozi podcast`.

Cero errores de consola en ambas pantallas.

## La Lista del Súper se vuelve realista: ticket de hoy vs. costo al mes (2026-08-15)

*"mejora lo de compras si es necesario, lo quiero lo mas completa y realista posible"*.

La auditoría de los datos salió limpia en lo obvio —**30 productos de comida, los 30 con precio**, 11 del ticket real de Walmart y 19 investigados, sin huecos— así que el problema no era falta de datos. Era que **el total sumaba cosas que no son comparables**.

### El número que no significaba nada

Marcar toda la lista daba **$1,206**. Pero ahí convivían:

| Producto | Importe | Cuánto dura |
|---|---|---|
| Aceite de oliva 500 ml | $150 | ~8 semanas |
| Miel de abeja 500 g | $90 | ~8 semanas |
| Arroz 1 kg | $28 | ~4 semanas |
| Jitomate ≈380 g | $6 | ~1 semana |

$1,206 no era un ticket semanal, ni un gasto mensual, ni nada. Y al proyectarlo mentalmente el error se multiplica: ticket × 4 asume que compras aceite de oliva cada sábado.

### `sem`: cuánto dura cada compra

Campo nuevo en `LISTA_COMPRAS_PRECIOS` — semanas que dura esa `compra` típica con su consumo real, estimado desde el tamaño de presentación y **sus metas de `salud.html` (3115 kcal / 186 g de proteína al día**, que es mucho: por eso las carnes duran 1 semana y el aceite 8).

Con eso, la barra pasa de una cifra a dos:

- **🧮 Ticket** — lo que pagas hoy en caja.
- **📅 Al mes** — lo que cuesta sostener ese carrito, cada producto prorrateado por `4.33 / sem`.

Ejemplo real verificado: 1 aceite + 3 aguacates + 1 pechuga = **ticket $252**, pero **al mes $523**, no $1,091. El aceite aporta $81/mes de sus $150, los aguacates y la pechuga aportan su importe completo ×4.33.

### Otros dos arreglos de la misma pasada

**Subtotal por pasillo**, alineado a la derecha de cada encabezado. Recorres el súper por pasillos, así que saber que Carnes ya va en $66 sirve mientras estás parado ahí, no al llegar a la caja. Se refresca desde `actualizarLcTotal()` y no desde el render completo, porque cambiar una cantidad solo repinta su renglón (para no perder scroll ni foco) y si no el encabezado se quedaba con la cifra vieja.

**Aviso `dura ~N sem`** en los 11 productos que no se acaban en la semana. Es la mitad útil del dato: ver "dura ~8 sem" junto al aceite de $150 evita volver a meterlo al carrito cada sábado. *(La etiqueta se quitó el 2026-08-19 a petición de Adán — ver "Fuera la etiqueta" al final. El dato `sem` sigue vivo: es lo que prorratea el "Al mes".)*

La barra vacía también cambió: en vez de *"Total marcado: $0 — no has marcado nada todavía"* ahora invita (*"Marca lo que vas a llevar y aquí sale el ticket"*).

### Lo que se evaluó y se descartó

- **Cruzar con el presupuesto de Finanzas**: `Finanzas.html` tiene una sección de presupuestos, pero `budgets:[]` arranca vacío y no hay una categoría de súper definida. Cruzar contra un presupuesto inexistente habría sido inventar el número de referencia.
- **Cuánta proteína cubre el carrito**: sería el complemento natural de la meta de 186 g/día, pero las macros de `comida.html` están **por receta** (`macros:{cal,prot,carbs,gra}` en cada platillo), no por ingrediente. Calcularlo exigía inventar una tabla nutricional por producto, y además duplicaría en el Dashboard una responsabilidad que ya es de `comida.html`.

### Verificación (Playwright)

Aritmética comprobada contra el cálculo a mano: `150 + 12×3 + 66 = $252` de ticket, y `150×(4.33/8) + 36×4.33 + 66×4.33 = $523` al mes — la app da exactamente esos dos números. Subtotales por pasillo correctos (Frutas $36 · Carnes $66 · Abarrotes $150), 11 avisos de duración, cero errores de consola.

## Habilidades Base: las 18 ganan error común y criterio verificable de dominio (2026-08-15)

*"debes ser mas claro y especifico y con ejemplos en cada uno, debes ser minucioso y revisar el contenido, tiene que ser contenido valioso, por favor revisa todas las habilidades"*.

### Lo que salió al medirlas

La auditoría no encontró habilidades vacías —las 18 tenían título, frase, fases con listas e imagen— pero sí **dos huecos transversales** y una diferencia grande de profundidad entre unas y otras:

| Elemento | Antes | Ahora |
|---|---|---|
| ⚠️ Error más común | **6 de 18** | **18 de 18** (35 avisos) |
| ✅ Criterio de dominio | **2 de 18** | **18 de 18** |

Y el contraste de fondo: `nudos` tenía 9 fases con 8 imágenes y pasos literales ("Paso 1: haz un ojal…"), mientras que 11 habilidades se quedaban en 3 fases con 1 imagen. El contenido de esas 11 no era malo —tenían 21-30 items útiles— pero les faltaba lo que convierte una lista de consejos en algo entrenable.

### Los 2 arreglos, aplicados a las 18

**1. `⚠️ Error más común`** — 34 avisos nuevos, colocados en la fase donde ese error concreto descarrila el aprendizaje, no al final como apéndice. No son genéricos; cada uno es el error real de esa disciplina:

- *Nadar*: doblar la rodilla al patalear como si pedalearas — la patada sale de la cadera.
- *RCP*: comprimir suave por miedo a lastimar. Son **5-6 cm** de profundidad y las costillas pueden tronar; una costilla se arregla, un paro sin RCP no.
- *Vino*: servir el tinto "a temperatura ambiente" — esa regla es europea; en CDMX el ambiente son 22-24°C y el tinto va a 16-18°C.
- *Fogata*: apagarla con tierra. La tierra aísla y mantiene la brasa viva horas.
- *Dinero*: tratar los MSI como dinero gratis; *Decir que no*: explicar de más, porque cada razón extra es una puerta para que te negocien.

**2. `✅ Ya lo dominas cuando…`** — un paso final en cada una, con criterios **comprobables**, nunca "sentirte seguro". Es lo que faltaba para que el checklist deje de ser una lista de deseos:

- *Nadar*: 400 m continuos de crol sin parar · flotar 3 min relajado · cruzar 25 m en ≤18 brazadas.
- *Mecánica*: cambiar llanta en <20 min solo · pasar corriente en el orden correcto sin dudar.
- *Nudos*: los 8 de memoria dos días distintos · el as de guía a oscuras o con una mano.
- *Decir que no*: 3 noes en el último mes que puedas nombrar · un mes sin gastos aceptados por no incomodar.
- *Recuperar*: **hoy duerme 5h40–6h40** (dato real de su rutina) — se domina el mes que llegue a 7h sostenidas sin que se caiga otro bloque.

Los criterios están anclados a **su** contexto, no a uno genérico: la alberca de Fitsi Buenavista, estacionarse en la Cuauhtémoc, manejar de noche bajo lluvia en Circuito Interior, el 911 y la SEDENA, su bloque `wd14` de cena de las 21:15.

### Detalles que salieron de revisar el contenido

- *Auxilios* es la única de las 18 que **caduca**: se marca revalidación cada 2 años, porque los protocolos cambian y las manos se olvidan. Y es la única donde se dice tajante que leerlo no basta: curso presencial de Cruz Roja, con maniquí.
- *Reparaciones* y *Armas* incluyen ahora el **límite** como parte del dominio: saber cuándo NO hacerlo tú (gas, centro de carga) y el marco legal real (portación ≠ posesión) cuentan como dominar la habilidad, no como lo contrario.
- *Manejar* cierra remitiendo a *Mecánica básica*: las dos juntas son las que de verdad cubren manejar bien, y ahora se dicen la una a la otra.

### Cómo se aplicó, y por qué así

El bloque `HABILIDAD_DETALLE` son ~960 líneas. Editar 18 objetos a mano era la vía segura de romper algo, así que se parseó con `vm`, se inyectaron los campos y se reserializó al mismo estilo del archivo (comillas simples, `t`/`d`/`img`/`list`). Los 3 bloques de comentarios internos se reinsertaron por posición.

### Verificación (conteo real, no muestra)

Comparación tarea por tarea contra la copia previa del archivo: **18 → 18 habilidades**, ninguna perdió items (40→46, 26→32, 51→55…), **ninguna perdió imágenes** (2→2, 8→8, 7→7…), y títulos y frases idénticos. Las 18 pasan las 3 condiciones: tienen aviso de error, tienen criterio de dominio, y no perdieron contenido.

En navegador se abrieron **las 18 una por una**: las 18 abren, las 18 muestran "Ya lo dominas", las 18 muestran al menos un aviso de error (35 visibles en total), los checkboxes suben de 3-9 a 4-10 por habilidad, y cero errores de consola.

## Habilidades Base: imágenes al 50% de tamaño y todas en HD verificado (2026-08-15)

*"las imagenes no me gustan y ponlas mas pequeñas, quiero que si o si sean hd"*.

### Más pequeñas

`.meta-detail-step-img` pasa de `max-height:300px` a **150px**, y los diagramas (`.is-diagram`) de 400 a **240px** — bajan menos porque en ellos el detalle *es* el contenido: un nudo o una maniobra de RCP a 150px ya no se distingue. En móvil, 200→130px y 260→200px.

Se añadió también **`max-width`** (420px fotos, 340px diagramas). Sin eso, una foto apaisada limitada solo por alto y con `width:100%` se recortaba a una tira inservible. Verificado: la foto de Recuperar renderiza ahora a **225×150px**, cuando antes ocupaba media pantalla y empujaba la lista de la fase fuera del área visible.

### HD: lo que la URL decía vs. lo que el archivo pesaba

Son **61 imágenes** (18 de portada + 43 dentro de los detalles). Subirlas fue menos trivial de lo esperado:

- **Wikimedia responde 403 sin `User-Agent`.** La primera verificación daba "roto" en todo Wikimedia; no estaban rotas, faltaba la cabecera.
- **Wikimedia aplica rate-limit (429)** en ráfagas. Hicieron falta 3 pasadas con pausas crecientes (0.45s → 2.5s → 6s con reintentos de 25s) para no confundir "no existe" con "ahora no".
- **La resolución de la URL miente.** 7 imágenes no tenían parámetro `/NNNpx-` porque apuntaban al **archivo original** de Commons, y esos originales resultaron ser de 194 a 1038px. Solo se detectó midiendo `naturalWidth` en el navegador, no leyendo la URL.

Regla aplicada: Wikimedia `/NNNpx-` → `/1920px-`, Unsplash `w=N` → `w=2400&q=85`, y **si la versión HD no responde 200, se conserva la original** — mejor una imagen que carga a 1280px que un hueco a 1920px.

**El caso del torniquete**: `auxilios/p3` era un SVG servido como archivo original a **194px** — prácticamente un ícono en un diagrama que ilustra cómo detener una hemorragia. Al ser vectorial se pudo rasterizar vía `/thumb/…/1920px-`, así que pasó de 194 a **1920px**.

### Resultado verificado en navegador

| | Resultado |
|---|---|
| Imágenes que cargan | **61/61** ✓ |
| Portadas (18) | **todas ≥1920px reales** ✓ |
| Reparto de resolución | 30×2400px · 13×1920px · 11×1280px · 7 originales |
| Por debajo de 1280px real | **6** (ver abajo) |

Las 6 restantes son archivos originales de Commons que **no existen en mayor resolución** — Wikimedia no puede generar un thumbnail más grande que el original: `nudos/p1` (559px), `mecanica/p3` (612px), `mecanica/p5` (1024px), `auxilios/p1` (846px), `auxilios/p5` (1038px), `asado/p2` (511px). Como se muestran a 340px máximo, se ven correctas; para subirlas hay que **sustituir la imagen**, no reescalarla.

Nota: el patrón de reemplazo alcanzó también imágenes de la pantalla de Ejercicios (diagramas SVG de gimnasio). Las sube a HD igual — no rompe nada, pero no era el objetivo del pedido.

### Pendiente: el estilo

*"las imágenes no me gustan"* + la elección de **cambiar las 61** quedó sin ejecutar, a la espera de definir a qué estilo. Cambiarlas a ciegas son 61 búsquedas para acaso volver a empezar. Queda advertido en la conversación que ~26 de esas imágenes (los 8 nudos, las 7 maniobras de auxilios, los 6 pasos de mecánica) **son el contenido**, no decoración: sustituirlas por tomas más bonitas empeora la explicación.

## Kit de Higiene, tratamientos con receta y 2 pesos reales de gym (2026-08-15)

Cinco pedidos en un mensaje. Uno resultó no ser un pedido.

### "No has puesto cambiar una llanta, pasar batería" — sí estaban

`Cambiar una llanta ponchada, paso a paso completo` y `Pasar corriente (jump start), en el orden exacto` son las **Fases 1 y 2 de `mecanica`**, con el detalle completo (aflojar birlos en patrón de estrella antes de levantar el auto, el orden exacto de los 4 cables). No faltaban: están **dentro** del overlay de "Mecánica básica de auto", así que solo se ven si abres esa tarjeta. Es un problema de descubribilidad, no de contenido — queda pendiente decidir si se promueven a tarjetas propias del grid.

### Kit de Higiene — categoría nueva en la Lista de Compras

`higiene` (🧳), **34 productos en 7 bolsas**, agrupados por *bolsa* y no por tipo de producto: cuando armas la maleta importa qué meter en el neceser, no si algo es "cuidado bucal" o "corporal".

Bolsa base (4) · Cuidado bucal (5) · Afeitado y barba (5) · Cuerpo y ducha (5) · Manos, uñas y pies (4) · Botiquín mínimo (7) · "Los que ya tienes, solo cámbialos a tamaño viaje" (4).

Esa última bolsa existe para **no duplicar** lo que ya vive en Skincare y Cabello: ahí solo se recuerda pasarlos a envase de 100 ml, con la excepción del minoxidil (en su envase original — se degrada si se trasvasa). Detalles pensados para viaje real: desodorante en barra y no aerosol, la bolsa transparente de 1 L de la regla de aeropuerto, chanclas de ducha para la alberca de Fitsi.

Se añadió `higiene` a `LC_AMAZON_CATS`, así que los 34 productos traen sus 68 links de compra (Amazon + Mercado Libre) automáticamente.

### Tratamientos de cabello con receta

`HAIR_DB.tratamientoCaida` pasa de 1 a 3 opciones, y las 2 nuevas van **después** del minoxidil tópico a propósito: no son alternativas de la misma categoría, son otro escalón.

- **Minoxidil tópico + Dutasteride** (fórmula magistral). El minoxidil hace crecer; el dutasteride ataca la causa bloqueando la DHT, e inhibe los 2 tipos de 5-alfa-reductasa, no solo uno como el finasteride.
- **Minoxidil oral 2.5-5 mg**. Más fácil de sostener que aplicarse la solución 2 veces al día, y la constancia es la mitad del resultado.

**Los dos llevan la condición escrita en el propio campo `uso`, no en una nota aparte**: el dutasteride requiere prescripción en México, no está aprobado por la FDA para alopecia y altera el valor del PSA (dato que importa en una revisión de próstata); el minoxidil oral es sistémico y puede bajar la presión, causar retención de líquidos e hipertricosis, así que exige control médico de presión antes y durante. Poner la dosis sin poner la condición sería lo irresponsable.

En la Lista de Compras van marcados con 🩺 **en el propio nombre**, porque esa lista se lee en el pasillo y ahí no hay contexto: sin la marca parecerían productos de mostrador.

### 2 pesos reales de gym

`EJ_LOOKUP.pesoIni` deja de ser estimación en estos dos: **Curl con Barra 20 → 18 kg** (los 40 lb que levantó) y **Extensión en Polea 15 → 22.5 kg** (50% más de lo que el default asumía).

### Verificación

Kit: 34 productos, 7 bolsas, 68 links, 6 pestañas de categoría. Cabello: 7 productos con dutasteride y oral presentes, 2 marcados con 🩺. Gym: 18 kg (40 lb) y 22.5 kg. Sintaxis OK y divs balanceados en `dashboard.html`, `cuidadopersonal.html` y `Coach_v2.html`; cero errores de consola.

**Pendiente del pedido**: el kit se pidió "con imágenes" y por ahora lleva links de compra, no fotos — los links sí llevan a la imagen real del producto en la tienda, pero no es lo mismo.

## 2 bugs reportados: los links de compra y el overlay de Didi en celular (2026-08-15)

### `lcAmazonQuery()` generaba búsquedas basura — 21 de 55 rotas

Adán: *"esto ni me abre lo de mercado libre ni amazon: Minoxidil + Dutasteride tópico (fórmula magistral — 🩺 pide receta al dermatólogo)"*.

La función partía el texto por `' — '` **sin quitar antes los paréntesis**, así que se quedaba con lo que venía después del guion — que en ese producto vive *dentro* del paréntesis. La búsqueda que abría era literalmente **`"🩺 pide receta al dermatólogo)"`**.

Al auditar las 5 categorías con link salieron **21 queries defectuosas de 55**, y el fallo era **preexistente** — no solo de los productos nuevos:

| Fallo | Ejemplo real |
|---|---|
| Paréntesis buscado tal cual | `"Chanclas de ducha (hotel, gym, alberca de Fitsi)"` |
| `' — '` dentro del paréntesis | `"se degrada)"` · `"el aerosol da problemas en avión)"` |
| `' o '` dentro del paréntesis | `"Magnesio (glicinato"` · `"Analgésico (paracetamol"` — cortados a la mitad |

El arreglo es de orden de operaciones: **primero se quitan los paréntesis** (son aclaraciones para él, nunca parte del nombre comercial) y los emojis, y solo después se separa el prefijo de categoría y las alternativas de `' o '`.

Resultado: **0 de 99 queries defectuosas** (las 99 incluyen libros). `"Minoxidil + Dutasteride tópico"`, `"Magnesio"`, `"Darrow Doctar"`, `"Desodorante en barra"`.

### El overlay de "Qué escuchar en Didi" no se veía en celular

*"esa seccion no se ve nada bien en el celular"*. Medido en 390px y 360px, y era peor de lo que parecía: **el `@media` que escribí para móvil no estaba aplicando**, porque lo puse **antes** de las reglas base y perdía por orden de cascada. Consecuencia: en un card de 359px el grid seguía en **2 columnas de 184px**, y las 3 franjas de "entre semana" quedaban en columnas de ~100px con el texto partido en tiras de una palabra por línea.

El bloque móvil se movió al final y se amplió:

- **Overlay a pantalla completa** (`padding:0`, card al 100% sin bordes redondeados): 4vw de margen a cada lado es tirar ancho que en 390px no sobra.
- **Todo a una columna** — habilidades, franjas de 3 y de 2.
- **La ✕ ya no se encima con el título** (`padding-right:52px` en el head).
- **El tag pasa de columna a etiqueta sobre el título**: esos 64px fijos se comían un quinto del ancho y dejaban el nombre del libro en 2 letras por línea.
- **Links pegados al título** (se quita el `margin-left:auto`) y con área táctil más grande.

Verificado: **de 79-81 elementos desbordando a 0**, en 390px y en 360px, sin scroll horizontal.

## Habilidad 19: Saber meditar, y la categoría Ojos en compras (2026-08-15)

*"añade saber meditar pero explicalo muy muy detalladamente, recuerda que haz todas esas secciones para alguien que no sabe nada de nada y apenas anda aprendiendo, hazla y checa las demas"*.

### `meditar` — la más detallada de las 19

**7 fases, 49 items**, y arranca con una **Fase 0 que no se practica, se entiende**: desmontar el "dejar la mente en blanco". Sin eso, la primera sesión se siente como un fracaso y no hay segunda — es la razón número uno por la que la gente abandona en la semana 1.

La idea que estructura toda la habilidad: **la distracción no es el fallo, es el ejercicio**. Igual que en el gym el músculo no crece por sostener la pesa arriba sino por cada repetición, aquí cada vez que la mente se va y vuelve cuenta como una. "Si te distrajiste 30 veces en 5 minutos, hiciste 30 repeticiones."

Escrita asumiendo **cero conocimiento previo**: dónde sentarse (una silla normal, no en el piso con las piernas cruzadas — eso es para gente con años de práctica y a un principiante solo le duele la rodilla), qué hacer con las manos y por qué (si cuelgan, los hombros se tensan sin que lo notes), qué hacer con los ojos, y qué decirse al distraerse.

**Fase 2 explica el bloque que ya tiene en su rutina**: las 23:00 decían "🧘 Meditación — respiración box (10 min)" sin ninguna explicación. Ahora está el 4-4-4-4 paso a paso, por qué funciona (la exhalación larga activa el nervio vago, mecanismo físico y medible), y qué hacer si se marea (bajar a 3-3-3-3).

**Fase 4 existe solo para que no abandone**: qué se siente realmente en los días 1-7 (aburrido e inútil), en las semanas 2-4 (notas *cuánto* se distrae tu mente, y eso es el progreso, no un retroceso), y en el mes 2 (el primer efecto fuera de la sesión). Y lo que **no** va a pasar: no dejará de enojarse ni de estresarse.

El criterio de dominio no es sentir paz: es que **entre que alguien te hace enojar y tu respuesta exista medio segundo**. Con 28h semanales en el tráfico de CDMX y pasajeros difíciles, ese hueco es todo el punto.

Imagen verificada vía la API de Wikimedia Commons (original 5184×3456, servida a 1920px). La API exige un `User-Agent` identificable: sin él devuelve HTML en vez de JSON.

### "Checa las demás" — auditadas, y salieron limpias

Se revisaron las 18 anteriores buscando **jerga usada sin explicar cerca**: `crol`, `sellar`, `recámara`, `sparring`, `taninos`, `birlos`, `taquete`, `yesca`, `azimut`, `anafilaxia`, `chicote`… **0 términos sin explicación en contexto**. La plantilla que se estableció al reescribir `nadar` ya traía ese cuidado y se mantuvo en el resto.

### Categoría 👁️ Ojos en la Lista de Compras

12 productos en 4 grupos, espejo de `OJ_PRODUCTOS` de la pestaña nueva. Agrupados por para-qué-sirve y no por tipo de producto —igual que el Kit de Higiene—, porque en la tienda decides "necesito algo para el ojo seco", no "necesito un gel". Con sus links de Amazon y Mercado Libre, y **0 queries defectuosas** tras el arreglo de `lcAmazonQuery()`.

La Lista de Compras queda en **7 categorías**: Comida · Skincare · Cabello · Suplementos · Kit de Higiene · Ojos · Libros.

## Revisión móvil de los 48 HTML: el HUD deja de estorbar (2026-08-17)

*"revisa todos los html y quiero que la version celular funcione muy bien... eso de cambiar pagina o la barra del dashboard de las demas aplicaciones, se ve muy mal ya amontonado... que no estorbe esa barra en el modo celular"*.

### El culpable no era la barra de apps

`#qaBar` ya colapsaba correctamente a **42px** con un botón "🔗 Apps ▾" (cambio del 2026-08-11). Lo que se veía amontonado eran **los 2 paneles del HUD**: `.hud-side` es `position:fixed` con `left:16px` / `right:16px`, y la media query de ≤1024px los movía abajo-centro con `left:50%` + `translateX(-50%)` + `max-width:92vw`.

En 390px eso no cabe: dos paneles de ~195px sobre 358px disponibles **se encontraban en el centro y se encimaban entre sí**, dejando **14 botones apilados sobre el contenido**, a media pantalla. Se ve clarísimo en la captura que mandó Adán.

### Barra inferior, que es donde llega el pulgar

| | Antes | Ahora |
|---|---|---|
| Panel izquierdo (`#hudNav`, 10 iconos de pantalla) | flotando sobre el contenido | **oculto** — esa navegación ya vive en el menú ☰ y en la barra de Apps |
| Panel derecho | bloque flotante de 195px | **barra fija abajo**, 390×59px, a todo lo ancho |
| Botones visibles | 14 apilados | **5: ☰ · ‹ · › · ▶ · 🌙** |
| Tamaño táctil | 30px | **40px** |
| Puntos de pantalla | ocultos en ≤1024px | visibles, horizontales, como indicador de posición |

Se recuperó `.hud-slidenav` (los ‹ › y los puntos), que ≤1024px ocultaba: **cambiar de pantalla es justo lo que Adán reportó como incómodo**, y con la barra abajo son los dos botones que más se tocan. Reloj, progreso, fullscreen, ajustes y ayuda se ocultan en móvil — el reloj ya está en el encabezado de cada pantalla y los otros tres son de teclado.

**El bloque va al final del `<style>`, no junto a `.hud-btn`.** Escrito arriba perdía por cascada contra la media query de ≤1024px, que redefine `.hud-side` entera. Es el mismo error que ya había pasado con el overlay de Didi — dos veces la misma lección.

### El hallazgo grande: tablas que hacían zoom-out de la página entera

`Aleman/principiantes.html` reportaba **`innerWidth=516` en una pantalla de 390**. No era un desborde local: el navegador estaba **achicando toda la página** para que cupiera, dejando el texto diminuto.

La cadena, medida: `table.vocab-table` (459px) → `.card` (476) → `.content-full` (484) → `.container` (500) → `.topic-content` (516).

Arreglado en **33 archivos con `<style>` propio** + `Aleman/styles.css` (que cubre las 39 lecciones sin `<style>`): las tablas pasan a `display:block; overflow-x:auto`, así scrollean dentro de su caja y no empujan el documento. Se sumaron `pre`, `code`, `img`, `video` y `canvas` por el mismo motivo.

### `gramatica.html`: el bug clásico de CSS Grid

Seguía en `innerWidth=827` aunque su `.gram-layout` **sí** colapsaba a 1 columna en ≤900px. Causa: los items de un grid traen **`min-width:auto`** por defecto, así que `main` no podía encogerse por debajo del ancho de su contenido y empujaba el contenedor a 816px. `min-width:0` en los hijos es lo que lo destraba.

### `Entrevistas`: header de 3 filas a 2

Buscador y bloque de progreso tomaban `flex-basis:100%` cada uno, así que el header ocupaba **132px — el 15% de la pantalla**. Compartiendo fila baja a **88px**, y se hizo `sticky`.

### Verificación

**48/48 archivos sin zoom-out ni scroll horizontal en 390px** (antes 47/48, y antes de eso varios con la página achicada). Escritorio intacto: en 1920 los dos paneles siguen a los lados (x=16 y x=1818), verticales, sin errores de consola. En tablet de 820px la barra inferior ocupa el ancho completo.

## El reloj de Mi Día abre el calendario del año (2026-08-17)

*"en el dashboard en la primer pagina, cuando haga click a la hora, quiero que se muestre calendario completo de los meses y dias del año y abajo info de que tengo que hacer ese mes, de acuerdo a fase 0"*.

`.dia-reloj` deja de ser texto y pasa a ser botón (`role="button"`, `tabindex="0"`, con un 📅 discreto que lo anuncia). Abre `#calOverlay`, que reusa el patrón visual de `.didi-overlay`: fondo con blur, card que sube, cierre por ✕ / clic fuera / Escape.

### Lo que muestra

**Los 12 meses del año con sus días reales.** La semana arranca en lunes —`(primero.getDay()+6)%7`, porque `getDay()` devuelve 0 para domingo—, el día de hoy va resaltado, los fines de semana atenuados, y cada mes lleva la **etiqueta de la fase del Plan Maestro que lo cubre**, con el color de esa fase. Los meses anteriores a agosto 2026 salen sin etiqueta: el plan todavía no empezaba.

Navegación de año con ‹ ›, acotada al horizonte real del plan (`PHASES[0].start` … `PHASES[3].end`), así que no se puede navegar a años donde no hay nada que ver.

**Abajo, el detalle del mes elegido**, y nada de esto es contenido nuevo:

| Fuente | Qué aporta |
|---|---|
| `PHASES[].semanas` filtrado por `mes` | las tareas de ese mes exacto — Fase 0 las etiqueta con `mes:'2026-08'` / `'2026-09'` |
| `PHASES[].meta` y `.title` | el objetivo de la fase, para el encabezado |
| `coach_checks_v1` | cuáles ya están hechas, con barra de progreso real |
| `dash-eventos-mes-v1` | los pendientes que él mismo capturó en "Importante este mes" |

**Fases 1-3 no etiquetan sus tareas con `mes`.** En vez de dejar el panel vacío, se muestra lo que aplica a toda la fase, con su rango de fechas — es la información que sí es cierta para ese tramo. Sin ese caso, tocar octubre habría dado una pantalla en blanco.

### Verificación

Escritorio: abre con clic real en el reloj, **12 meses · 365 días · hoy marcado · 5 meses con fase en 2026** (ago-sep Fase 0, oct-dic Fase 1). Agosto sale preseleccionado por ser el mes actual, con sus 8 tareas de Fase 0 y la barra de avance. Elegir octubre cambia a Fase 1; pasar a 2027 mantiene Fase 1. Cierra con ✕, clic fuera y Escape. Cero errores de consola.

Celular (390 y 360px): overlay a pantalla completa, **2 columnas de meses**, días de 21px, **0 elementos desbordados y sin scroll horizontal**.

## Las Fases 1-3 pasan de tareas de fase a tareas por mes (2026-08-17)

*"Las Fases 1, 2 y 3 tienen tareas de fase, no de mes, esto debe estar por meses, arregla lo de coach y dashboard"*.

Solo Fase 0 etiquetaba sus tareas con `mes`. Las otras tres eran una lista suelta, así que el calendario nuevo no tenía qué mostrar mes a mes y Coach las presentaba todas juntas sin orden temporal.

### El problema de fondo: no hay una tarea por mes

**Fase 2 dura 21 meses y tiene 5 tareas. Fase 3 dura 13 y tiene 4.** Repartir una por mes habría exigido inventar 25 tareas que Adán nunca definió — relleno disfrazado de plan.

La solución distingue dos cosas que antes estaban mezcladas:

- **`mes:'AAAA-MM'`** — arranca en un mes concreto. El mes sale del propio texto cuando ya lo decía (`s1-1` empieza con *"Oct 2026:"*, `s2-4` con *"Jun 2028:"*) y del punto lógico del tramo cuando no (`s2-1`, elegir la opción, va en el primer mes de su fase; `s2-2`, *"con tracción sostenida"*, seis meses después).
- **`cont:true`** — aplica a **todo** el tramo. El foco de habilidad de la fase, el iPhone MSI que corre hasta 2028, la regla de mover las horas de Didi al cobrar el primer peso. Estas se repiten en cada mes de su fase.

| Fase | Tareas | Con mes | Continuas | Meses asignados |
|---|---|---|---|---|
| 1 · oct 2026–mar 2027 | 6 | 2 | 4 | 2026-10, 2026-11 |
| 2 · abr 2027–dic 2028 | 5 | 3 | 2 | 2027-04, 2027-10, 2028-06 |
| 3 · ene 2029–ene 2030 | 4 | 2 | 2 | 2029-01, 2029-07 |

### En el Dashboard

`renderCalendario()` ya no usa `filter(s=>!s.mes)` como caso de respaldo: ahora muestra **siempre** dos bloques — *"🎯 Qué toca este mes"* y *"🔁 Durante toda la Fase N"*. Si un mes no arranca nada nuevo lo dice explícitamente (*"Este mes no arranca nada nuevo — sostienes lo de abajo"*) en vez de quedarse callado.

Comprobado mes a mes en los 4 tramos, incluidos meses "huecos" como dic 2026, ago 2027 y nov 2029: **0 meses sin contenido**.

### En Coach

Las Fases 1-3 adoptan la misma estructura `<details class="fase-month" data-month="…">` que ya usaba Fase 0, más un bloque `data-month="cont-N"` con las continuas. El JS de badges es genérico y las tomó solas.

Lo único que hubo que tocar: `cont-N` **no es un mes**, así que comparar con la fecha de hoy le ponía "PRÓXIMO" e `initFaseMonths` lo cerraba. Ahora recibe su propio badge (**TODO EL TRAMO · n/m**) y se queda abierto — cerrar por "no ser el mes actual" algo que aplica siempre habría escondido justo lo que sí toca hoy.

Verificado: **12 bloques, 24 tareas, 0 duplicadas, 0 sueltas fuera de un mes**, badges que se actualizan al marcar, y cero errores de consola.

### Una inconsistencia que queda anotada

`s3-3` está en Fase 3 (ene 2029 en adelante) pero su texto dice *"retomarla en oct 2028"*, que cae en Fase 2. Se dejó como continua porque es una decisión informativa, no una tarea con fecha de ejecución — pero si se quiere que aparezca en octubre de 2028, hay que moverla de fase, no solo de mes.

## Reparación: el serializador de metas borraba campos en silencio (2026-08-18)

*"en hyrox, eliminaste completamente la lista de ejercicios y el tiempo promedio... al igual que en tailandia, no me pones links ni space x ya me habias puesto pagina para calendario... no estas siendo nada minucioso y eso me asusta"*.

Tenía razón. **Fue un error mío, y grave.**

### Qué pasó

El script que añadió las cotizaciones a Tailandia / Hong Kong / Hyrox reserializó `META_DETALLE` completo con este serializador:

```js
const ser = o => typeof o === 'string' ? q(o) : '{t:' + q(o.t) + (o.d ? ',d:' + q(o.d) : '') + '}';
```

**Solo contempla `t` y `d`.** Cualquier otro campo se perdió sin ruido: `list` (las 8 estaciones de Hyrox con su peso, distancia y tiempo promedio real) y los `href`/`label` de todos los links, en **7 de 13 metas**.

Lo peor no es el bug, es que **la validación no lo detectó**: comprobaba sintaxis JS y que el archivo creciera. Las dos cosas se cumplen perfectamente mientras borras contenido — el archivo crecía porque los pasos nuevos pesaban más que lo borrado.

| Meta | Campos borrados |
|---|---|
| hyrox | `list`, `href`, `label` |
| tailandia · spacex · maestria · ajedrez · remoto · empresa | `href`, `label` |

### La reparación

Se tomó `META_DETALLE` íntegro del commit `7574a97` (anterior al daño) y se fusionó con lo actual: **base = original completo**, encima solo los pasos nuevos que no existían, comparando por título. El serializador nuevo es recursivo y preserva **cualquier** campo a cualquier profundidad — el fallo no se puede repetir por omisión.

Y la validación ahora compara **meta por meta** que no falte ningún campo ni ningún paso respecto al original, antes de escribir. Si algo falta, no escribe.

Restaurado: 7 metas, la tabla de 8 estaciones de Hyrox y los 24 links.

### Lo que sí faltaba de verdad, ya añadido

Con el daño reparado quedó claro qué era pérdida y qué era hueco real:

**Hyrox** (+3 pasos): plan de **10 semanas** —el tiempo exacto que queda hasta el 30 de octubre— dividido en bloques, con el error típico señalado (entrenar carrera y fuerza por separado y llegar sin saber cómo se sienten juntas); link al **listado oficial de eventos de México**, que es lo que hay que revisar en vez de una fecha copiada aquí que puede quedar vieja; y qué tiempo apuntar en una primera (1h20–1h40 en Men Open, con la meta correcta siendo terminar sin caminar, no un número).

**Hong Kong** (+4 pasos): no tenía **ni un solo link**. Ahora lleva Sky100, el Peak Tram, la tarjeta Octopus y la guía oficial de turismo en español.

## Un botón para volver al Dashboard, igual en los 47 archivos (2026-08-18)

*"todos los html relacionados en mi aplicacion dashboard deben tener un boton arriba a la derecha para poder regresar a la pagina principal, esto debido a que no todos lo tienen o esta en diferente posicion"*.

El estado real era peor de lo que parecía: **39 lecciones de Alemán, `salud.html`, `entrevistas.html` y `vestimenta.html` no tenían ninguna vía de regreso**. Y los 5 que sí lo tenían lo llevaban metido en su propia navegación —sidebar en Coach, `nav-item` en Finanzas y comida, `tab-btn` en cuidadopersonal—, cada uno en un sitio distinto.

`#btnVolverDash` se inserta como **bloque autónomo justo después de `<body>`**, con su propio `<style>`: así funciona igual en las 39 lecciones que solo cargan `styles.css` externo. Va fijo arriba a la derecha, esquina que estaba libre en todos los archivos (lo fijo de cada app vive abajo-derecha o en un sidebar izquierdo). En ≤600px se reduce a solo el cohete, para no tapar títulos.

Verificado en los 47, en escritorio (1600px) y celular (390px): **47/47 correctos en ambos** — existe, es visible, está arriba a la derecha, apunta al dashboard, y `elementFromPoint` sobre su centro confirma que **nada lo tapa**.

## El bloque de GBM abre un panel de "qué invertir hoy" (2026-08-18)

*"esto de Bolsa GBM solamente dura 20 min, es compra rapida... hay alguna forma de que cuando haga click en esa actividad, solamente los lunes me muestre una pantalla con info completa tomando datos reales y en tiempo real de que puedo invertir"*.

El bloque decía *"revisar portafolio + VOO + USD/MXN e invertir"*, que sonaba a sesión de análisis. Ahora dice **"Bolsa GBM (20 min): compra rápida — revisa qué toca hoy y ejecuta"**, y la tarjeta es clickeable: abre `#gbmOverlay`. Solo aparece los lunes porque `lu-gbm` es `dias:[1]`.

### Qué es tiempo real y qué no — probado, no supuesto

Se probaron 6 fuentes desde un contexto `file://`, que es como Adán abre el dashboard:

| Fuente | Resultado |
|---|---|
| **CoinGecko** (BTC) | ✅ 200, ya la usa Finanzas |
| **open.er-api.com** (USD/MXN) | ✅ 200, gratis y sin API key |
| exchangerate.host | ❌ responde 200 pero exige API key |
| frankfurter · Stooq · Yahoo Finance | ❌ **bloqueadas por CORS** |

**VOO no se puede leer desde un archivo local.** No hay fuente gratuita con CORS abierto, y las que existen piden llave de pago o un servidor intermedio. En vez de inventar un precio o dejar el hueco callado, el panel muestra la casilla de VOO en gris con *"no disponible aquí"* y un link directo a Google Finance. El propio panel explica por qué.

También se dice explícitamente que **el dólar se actualiza una vez al día**, no al segundo, y se muestra la fecha del dato — llamarlo "en vivo" sin más habría sido impreciso.

### Lo que sí calcula, con sus datos reales

Lee `finanzasmx_v2` de localStorage —donde ya vive su dinero— y aplica la regla que su Plan Maestro ya tiene escrita, al saldo de hoy:

1. **Fondo < $10,000** → *"hoy no compras nada más"*, con lo que falta.
2. **Fondo completo pero queda deuda cara** → el excedente va a la deuda; ninguna tasa de rendimiento le gana a una de tarjeta.
3. **Ni deuda ni fondo pendiente** → toca invertir.

Con su estado actual (fondo $4,000 de $10,000) el panel muestra el paso 1, con barra de avance. Debajo: su portafolio real con el % de cada instrumento, la compra rápida en 5 pasos cronometrados que suman 20 minutos, y 4 links para ejecutar (GBM+, VOO, CETES Directo, Banxico).

Cierra con el aviso de que **sigue sin una asignación objetivo escrita** (% CETES / % VOO / % BTC) — la tarea pendiente de su habilidad de Inversión, y la causa real de decidir cada lunes desde cero.

### Un bug de JavaScript que vale documentar

La primera inserción truncó el script del dashboard. Causa: `String.prototype.replace` con un **string** de reemplazo interpreta `$&`, `` $` ``, `$'` y `$1` como patrones — y este panel contiene la secuencia `'<b>$'`, así que `$'` pegó todo el resto del documento y cortó el archivo a la mitad.

Se arregló pasando **funciones** de reemplazo (`replace(a, () => b)`), que no interpretan `$`. Cualquier script futuro que inserte texto con `$` en este proyecto tiene que hacer lo mismo.

### Verificación

Escritorio y celular, con llamadas de red reales: BTC `$64,285 USD / $1,096,748 MXN`, dólar `$17.03` con su fecha, el paso correcto según su saldo, sus $4,000 y $6,500 leídos de Finanzas, 5 pasos, 4 links, **0 elementos desbordados** en 390px y cero errores de consola.

## 3 datos corregidos (2026-08-18)

- **Gimnasio**: Fitsi $1,500 → **Total Pass $650, día 17**. Son $850/mes menos, $10,200 al año, que van directo al excedente. Actualizado en `SUB_GYM` y etiquetado con su día de cobro en el plan semanal, como ya se hacía con CETES.
- **Bloque de GBM**: pasa a decir 20 minutos y "compra rápida".
- **Nota en "Importante este mes"**: *"Cancelar la membresía de Fitsi — ya estás con Total Pass"*. Solo nota, sin tocar nada más, como se pidió.

## "Qué invertir hoy" ya no depende del lunes: botón fijo en Mi Día (2026-08-18)

*"la pestaña que invertir hoy, tambien quiero verla al apretar un boton y quiero que este en el dashboard, quiero que este alado de ahora mismo a la derecha y tome el tamaño de ideas para hoy"* — con un rectángulo rojo marcando el hueco exacto a la derecha del banner.

El panel de inversión existía desde esta misma mañana, pero su única entrada era el bloque `lu-gbm` de la línea de tiempo, y ese bloque es `dias:[1]`. **De martes a domingo no había forma de abrirlo**: la pantalla estaba construida y era inalcanzable 6 de cada 7 días.

### Por qué el ancho sale solo y no a ojo

"Ahora mismo" ocupaba todo el ancho. Ahora vive dentro de `.dia-ahora-row`, un grid que **repite las columnas de `#miDiaSecundarios` (`1fr 2fr 1fr`)** con el banner tomando las dos primeras (`grid-column:1/3`) y el botón la tercera. Así el botón no "mide parecido" a Ideas para hoy: mide **lo mismo**, calculado por el navegador, y los dos bordes derechos coinciden en cualquier viewport — medido en Playwright, `x=1154 w=334` en ambos. Un ancho fijo (320px) se habría desalineado en cuanto cambiara el tamaño de la ventana. En ≤1024px la fila colapsa a 1 columna, igual que la de abajo.

El botón es un `<button>` real, no un `<div onclick>`: entra en el orden de tabulación y responde a Enter/Espacio sin JS extra.

### El botón ya responde antes de abrirlo

No dice "ver panel". Dice el paso que toca hoy, con su color: **"Primero tu fondo"** (naranja), **"Abona a tu deuda"** (rojo) o **"Hoy sí inviertes"** (verde), más una línea con las cifras. Se repinta en cada `renderDia()`, así que sigue al saldo real de Finanzas.

Para lograrlo, la regla del Plan Maestro salió de `renderGBMPanel()` a **`pasoInversionHoy()`**, que ahora leen las dos piezas. Duplicar el `if/else` habría dejado que el botón dijera una cosa y el panel otra en cuanto se tocara una sola de las copias.

### El modo privado ahora también entra al panel

*"el modo privado deberia funcionar aqui tambien con los datos de ahi"*.

El panel tenía su propio formateador (`mon = n => '$'+n.toLocaleString()`) que imprimía el número tal cual. Resultado: con **Ocultar finanzas** activo, todo el Dashboard se tapaba y bastaba abrir la inversión para ver el fondo, la deuda y el portafolio completos. `mon()` ahora delega en `money()`, la misma función del resto del archivo, y el aporte recurrente a CETES dejó de estar escrito a mano como `$1,500`.

Lo que **no** se tapa son los precios de mercado (BTC, USD/MXN): son públicos y no dicen nada de su dinero.

`togglePrivado()` además repinta el panel si está abierto en ese momento — vive fuera de los slides, así que `showSlide()` no lo alcanzaba y se quedaba destapado hasta cerrarlo y volverlo a abrir.

### Verificación (Playwright, escritorio 1600px y celular 390px)

| Comprobación | Resultado |
|---|---|
| Ancho y bordes contra "Ideas para hoy" | idénticos (`w=334`, misma `x`) |
| Misma fila, a la derecha de "Ahora mismo" | ✅ |
| Clic abre `#gbmOverlay` | ✅ |
| Los 3 pasos según el saldo sembrado | fondo $4,000 → *Primero tu fondo* · $12,000 con deuda → *Abona a tu deuda* · $12,000 sin deuda → *Hoy sí inviertes* |
| Modo privado en botón **y** panel | `$••,•••`; solo sobreviven BTC y USD/MXN |
| 390px | apilado bajo el banner, **0 elementos desbordados** |
| Consola | sin errores |

### Nota para scripts futuros: `dashboard.html` tiene finales de línea MIXTOS

6,097 líneas CRLF y 238 LF. Un script que lea con las *universal newlines* de Python y vuelva a escribir normaliza el archivo entero y produce un diff de 12,000 líneas para un cambio de 100. Hay que leer y escribir con `newline=''` — y si se inserta texto nuevo, hacerlo con `\r\n`, que es el estilo dominante.

## Una sola vía de regreso: fuera los 4 botones de Dashboard que sobraban (2026-08-18)

*"en algunos html el boton de dashboard se repite y esto no debe ser, solo debe estar el de la esquina superior derecha"*.

Al insertar `#btnVolverDash` en los 47 archivos esta misma mañana, las 4 apps que **ya** tenían su propia vía de regreso se quedaron con dos. El barrido, contando enlaces `href` reales y no impresiones:

| Archivo | Lo que sobraba | Dónde estaba |
|---|---|---|
| `Coach/Coach_v2.html` | 2 × `<a class="sb-link sb-dashboard">🚀 Dashboard` | al pie de los **dos** sidebars (`#sidebar-personal` y `#sidebar-empresa`) |
| `Finanzas/Finanzas.html` | `nav-item` "🚀 Volver al Dashboard" | primer ítem del menú lateral |
| `CuidadoPersonal/cuidadopersonal.html` | `tab-btn` "🚀 Dashboard" | última pestaña de la fila de secciones |

Coach tenía **dos** porque el archivo lleva dos sidebars completos, uno por modo. Buscar solo la primera coincidencia habría dejado el del modo Empresa vivo.

Con los enlaces fuera, el CSS `.sb-dashboard` (`margin-top:auto` + borde superior, que separaba ese enlace del resto del sidebar) se quedó sin un solo elemento al que aplicar, así que se borró también en vez de dejarlo como CSS muerto. En Finanzas se fue además la etiqueta `<div class="nav-label">Navegación</div>`: existía solo para encabezar ese enlace y, sin él, encabezaba un grupo vacío.

### Lo que NO se tocó, y por qué

- **`comida.html` → "🛒 Lista del Súper ↗"**: apunta a `dashboard.html`, sí, pero no es un botón de regreso — es el acceso a la Lista de Compras, que se mudó al Dashboard el 2026-08-12. Sigue en pie. Con una salvedad: el enlace **no lleva a la lista**, cae en la pantalla que el Dashboard tenga activa, porque el Dashboard no lee `hash` ni parámetros de la URL. Es un deep-link pendiente, no un duplicado.
- **`salud.html` y `Finanzas.html` → `nav-item` "📊 Dashboard" con `onclick="nav('dashboard')"`**: son secciones internas de esas apps que se llaman así. No salen del archivo.

### Verificación (Playwright, 1600px y 390px)

Los 47 HTML tienen exactamente **1** `#btnVolverDash`, y de los enlaces a `dashboard.html` queda **1 visible por archivo** (los 2 de `comida.html` son el botón y la Lista del Súper). En los 10 archivos probados a fondo, en ambos anchos: el botón está arriba a la derecha, `elementFromPoint` sobre su centro confirma que nada lo tapa, y la navegación propia quedó intacta — Coach 7 + 3 enlaces de sidebar, Finanzas 8 ítems en 2 grupos (Principal / Análisis), Cuidado Personal 8 pestañas, todas reales. Cero errores de consola.

## El botón de Dashboard deja de flotar y entra en la barra de cada app (2026-08-18)

*"pero hay botones dashboard que ni si quiera van acorde a la interfaz del html, osea sobre ponen a otros botones y eso esta mal, debe ser parte de la interfaz de todos"*.

Tenía razón en las dos cosas, y ambas se pueden medir.

`#btnVolverDash` nació como un bloque `position:fixed; z-index:9999` con su propio `<style>`, idéntico en los 47 archivos. Esa decisión resolvía el problema de esa mañana —meterlo en 39 lecciones que solo cargan un `styles.css` externo— pero lo hacía **encima** de la interfaz, no dentro. Medido con Playwright, elemento por elemento:

| | Antes |
|---|---|
| Archivos donde tapaba algo clicable | **43 de 47** |
| Qué tapaba | el "← Índice" de las 35 lecciones de Alemán · el botón de tema de Coach, Vestimenta y los 4 de CuidadoPersonal · "+ Nueva transacción" (Finanzas) · "+ Pesarme hoy" (Salud) · el buscador y el "↺ Reset" (Entrevistas) |
| Archivos donde desentonaba | **47 de 47** — su fondo era `rgba(20,22,30,.82)` con texto blanco, fijo, y los 47 se cargan con fondo claro |

### La solución: dejar de ser un injerto

Ahora **no hay ningún CSS propio del botón**. Es un enlace más dentro del grupo de acciones que cada app ya tenía arriba a la derecha, con **las clases nativas de esa app**, así que hereda su tema, sus colores, su tipografía y su comportamiento responsivo sin una sola regla nueva:

| App | Dónde vive ahora | Con qué clase |
|---|---|---|
| Alemán (39 archivos) | dentro de `<nav class="nav">`, junto al "← Índice" | `.nav-back` |
| Coach | `.modo-switch-right` | `.theme-toggle-btn` |
| Finanzas · Salud · Ejercicio · Comida · Vestimenta | grupo derecho de la `.topbar` | `.theme-toggle-btn` |
| Cuidado Personal | `header.topnav`, junto al botón de tema | `.theme-toggle-btn` |
| Entrevistas | `.header-right` | `.btn-theme` |

Las 20 lecciones A2 llevaban el "← Índice" como hijo directo de `.nav`, que es `justify-content:space-between`: añadir un tercer hijo habría separado los tres en vez de agrupar los dos de la derecha, así que ahí los dos enlaces se envuelven juntos en un `.nav-links`.

**Dónde va el texto y dónde solo el cohete**: en Alemán, cuya `nav` tiene enlaces con texto y espacio de sobra, dice "🚀 Dashboard". En el resto, donde los vecinos son iconos redondos de 30-38px, va solo el 🚀 con `title` y `aria-label` — alargar esas barras con texto es exactamente lo que rompió la topnav de Cuidado Personal en iPhone (ver `../CuidadoPersonal/readme_cuidadopersonal.md` → "Responsivo").

### Verificación (Playwright, 47 archivos × 2 anchos)

**1600px: 47/47 correctos. 390px: 47/47** una vez descontados los desbordes preexistentes (ver abajo). En cada archivo se comprobó, por geometría de rectángulos y no por impresión: el botón existe y es visible, **no se solapa con ningún otro elemento interactivo**, no es `fixed` ni `absolute` (está en el flujo), y queda arriba y a la derecha.

Los desbordes horizontales que aparecen en las lecciones de Alemán a 390px (12 a 104 elementos según el archivo) son **preexistentes y no cambiaron ni en uno**: medidos contra la versión en `HEAD`, `a1-10-laender` daba 104 antes y 104 después; `a1-01-saludos`, 36 y 36; `a2-01-modalverben`, 44 y 44. Son celdas `td.vocab-*` de las tablas de vocabulario dentro de su contenedor con scroll. La `nav` no desborda en ninguno (60px de alto, igual que antes), y la `.topbar` de Finanzas sigue midiendo 128px en móvil con un control más.

## Fuera la etiqueta "dura ~N sem" de la Lista de Compras (2026-08-19)

*"en la lista de compras en comida, quita esto dura ~2 sem"*.

Era una píldora gris junto a la cantidad, en los productos con `sem>1`. Se fue con su CSS (`.lc-dura`, que quedaba sin un solo uso) y con la mención que tenía en la leyenda de precios.

**Lo que NO se tocó: el dato `sem` de cada producto.** No es solo el texto de esa etiqueta — es lo que `lcTotalComida()` usa para prorratear (`mensual += imp * (LC_SEM_MES / p.sem)`) y sacar el "📅 Al mes" de la barra de totales. Borrarlo habría convertido ese número en el ticket ×4.33, que es exactamente el error que ese cálculo existe para evitar.

La leyenda decía *"`dura ~N sem` lo que no hace falta comprar cada vez — por eso «Al mes» no es el ticket ×4"*. Como el "Al mes" sigue ahí, la explicación se conserva sin la parte que ya no existe: **«Al mes» no es el ticket ×4: cada producto se prorratea por lo que dura**.

### Verificación

Con 1 aceite de oliva (`sem:8`), 1 jitomate y 2 aguacates marcados desde la propia API de la lista: **0 elementos `.lc-dura`** en el DOM y ni un "dura ~N sem" en el texto de la página, 30 renglones intactos, barra viva con **Ticket $180 · Al mes $211** — y $211 < $720 confirma que el prorrateo por duración sigue aplicándose. Cero errores de consola y 0 desbordes en 1600px y 390px.

## Cuatro arreglos y una meta nueva (2026-08-19)

### Las metas de largo plazo no se veían en celular

*"metas a largo plazo, no se ven en celular"*.

No era scroll ni un bloque oculto: **las 6 fotos medían 0 px de alto**. `.img-goal-grid` (corto y mediano plazo) declara `grid-auto-rows:minmax(100px,1fr)` — con piso. `.img-goal-grid-sm`, el de largo plazo, lo pisaba con `grid-template-rows:repeat(3,1fr)`, **sin mínimo**. En escritorio da igual, porque el slide tiene alto fijo y el `flex:1` reparte espacio real; pero en ≤1024px `.slide-inner` pasa a `height:auto` y, sin alto que repartir, `1fr` resuelve a 0.

Medido antes: bloque de **137 px**, celdas de 14 px, fotos de 0 px. Después de cambiar a `repeat(3,minmax(96px,1fr))`: bloque de **386 px**, las 6 fotos a 83 px.

### La barra inferior caía sobre el gesto del iPhone

*"haz de cuenta que el iphone tiene como una barra hasta abajo enmedio y si hago click se enciende siri, entonces arreglalo para que no lo presione sin querer"*.

El CSS **ya** reservaba `env(safe-area-inset-bottom)` en el padding de la barra. El problema es que `env()` devuelve **0** mientras el `<meta name="viewport">` no lleve `viewport-fit=cover` — y no lo llevaba. Resultado real medido en 390×844: los botones `‹`, `▶` y `›` a **9 px** del borde, y **11 botones** dentro de la franja de ~34 px donde vive el home indicator.

Dos cambios: `viewport-fit=cover` en el meta, y el padding pasa a `max(40px, calc(12px + env(safe-area-inset-bottom,0px)))`. El piso de 40 px es el que de verdad protege — con 22 px todavía quedaban 3 botones dentro de la franja cuando `env()` no está disponible (Android con barra de gestos, navegador de escritorio). En un iPhone real quedan 12+34 = **46 px**. `.slide-inner` suma el mismo `env()` a su `padding-bottom` para que el último bloque no quede debajo de la barra.

Verificado: **0 botones** en la franja del home indicator, contra 11 antes.

### El martes no es día de champú ni de nadar

*"error de ducha, los martes no voy a nadar, y no me ducho, solo miercoles"*.

La lista de compras decía que el CeraVe era su base *"martes, viernes, sábado y después de nadar"*. Contra `RUTINA_TASKS`, que es la fuente real, eso era falso en dos de los tres días: martes y viernes son `wd02co` — *"sin champú hoy"* —, el CeraVe solo aparece en `sa0506` (sábado) y la natación es `e3`, `dias:[1]`→miércoles. Ahora dice **"tu base: sábados, y los miércoles después de nadar"**.

Es una sola línea, pero era la que hacía que el martes pareciera día de lavado. Las tareas de ducha de `RUTINA_TASKS` no se tocaron: se sigue bañando a diario, lo que cambia es qué producto toca.

### Meta nueva de mediano plazo: certificación ISTQB CT-GenAI

*"agrega una meta a mediano plazo, certificacion ISTQB GENAI de brightest, llanala de info y ademas en la seccion entrevistas ya tenemos algo de info para poder hacer el examen, haz referencia a eso"*.

`istqbgenai`, con checklist de **7 pasos** y 4 enlaces. Todo el contenido está verificado, no supuesto:

| Dato | Fuente |
|---|---|
| Nombre oficial: **ISTQB® Certified Tester Specialist: Testing with Generative AI (CT-GenAI)** | istqb.org |
| Brightest es proveedor oficial del examen | brightest.org/en/certifications/ISTQB-CT-GenAI/ |
| 40 preguntas de opción múltiple en 60 minutos, ~200-249 USD según región | Brightest / ASTQB |
| Exige el Foundation Level (CTFL) | ISTQB |
| Syllabus **v1.1**, vigente desde el 27 abr 2026 | ISTQB |

Dos cosas que el paso 2 dice y que no son detalle menor: **el prerrequisito ya lo cumple** — su CTFL es de 2025 y está en `Coach_v2.html` —, así que puede inscribirse cuando quiera; y la confusión más común, que CT-GenAI **no** es la de *probar* sistemas de IA (esa es la CT-AI), sino la de *usar* IA generativa para probar.

El paso 5 enlaza a `../Entrevistas/entrevistas.html`: su módulo **📜 ISTQB CTFL** ya tiene los 6 capítulos completos (Fundamentos · SDLC · Pruebas estáticas · Test Analysis and Design · Managing the Test Activities · Test Tools) más el glosario, y el CT-GenAI da ese vocabulario por sabido. Va sin ancla porque `entrevistas.html` no lee `hash` ni parámetros de URL — es el mismo deep-link pendiente que la Lista del Súper.

Verificado en 1600px y 390px: la tarjeta entra en el grid, la imagen carga (800 px reales), el detalle abre con sus 7 pasos y 4 enlaces, 0 desbordes y sin errores de consola.

## La Lista de Compras estaba descuadrada en iPad (2026-08-19)

*"sigue sin verse bien la version de ipad de la lista de compras, no se ve ordenada se ve bien descuadrada"*.

El arreglo anterior fue en `comida.html`; esto es otra pantalla — el slide **🛒 Lista de Compras** del Dashboard. Aquí el problema era el grid de productos, `.lc-grid`, fijado a **3 columnas** pasara lo que pasara.

Cada renglón lleva 4 piezas en fila: casilla, nombre, píldora de precio y contador `− n +`. Eso entra en una sola línea a partir de unos **340 px de columna**. Con 3 columnas fijas:

| | Ancho de columna | Alturas de renglón |
|---|---|---|
| Escritorio 1600px | 422 px | 31 px — todas iguales |
| **iPad horizontal 1180px** | **284 px** | **56 px — los 30 partidos en dos líneas** |
| **iPad vertical 820px** | **333 px** | **30, 36 y 56 px mezcladas** |
| iPhone 390px | 329 px | 30, 35 y 55 px mezcladas |

El caso feo es el de en medio: unos renglones caben en una línea y otros no, así que la cuadrícula quedaba con filas de tres alturas distintas. De ahí el "descuadrado" — no era un desbordamiento, era que la mitad de los renglones se partía y la otra mitad no.

**Dos cambios, y ninguna regla nueva de breakpoint:**

1. `grid-template-columns:repeat(auto-fill,minmax(340px,1fr))` — el número de columnas lo decide el ancho disponible. Los 340 px son el ancho medido en que un renglón entra en una sola línea.
2. `.lc-item-txt` pasa de `min-width:140px` a `min-width:0`. Ese piso era el culpable de fondo: sin poder encogerse, el nombre empujaba el precio y el contador a una segunda fila en cuanto la columna bajaba de unos 420 px. Con `min-width:0` el nombre cede el espacio justo y nada salta. (`.lc-item` pasa además a `align-items:center`, que era lo que dejaba los contadores desalineados respecto al texto.)

### Resultado medido

| | Antes | Después |
|---|---|---|
| Escritorio 1600px | 3 col × 422 px · 1 altura | **igual: 3 col × 422 px · 1 altura** |
| iPad horizontal 1180px | 3 col × 284 px · todo a 56 px | **2 col × 435 px · 1 altura (30 px)** |
| iPad vertical 820px | 2 col × 333 px · **3 alturas** | **2 col × 333 px · 1 altura (30 px)** |
| iPhone 390px | 1 col · **3 alturas** | **1 col · 1 altura** |

El escritorio no se movió, que era la condición: ahí ya se veía bien. Comprobadas las **7 categorías** en iPad: 0 textos recortados y 0 desbordes en todas, sin errores de consola. Skincare, Higiene, Ojos y Libros conservan renglones de altura distinta, pero por una razón legítima que no es descuadre: sus nombres ocupan una, dos o tres líneas y llevan además los enlaces de tienda en una fila propia.

### Nota de método, porque costó un commit

La primera versión de esta misma sección se escribió con `python -c "…"` desde bash, y **bash expandió los backticks del texto como sustitución de comandos** antes de que Python los viera: cada `` `.lc-grid` `` y cada `` `min-width:0` `` desapareció del archivo, dejando frases cortadas a la mitad. Es la misma familia de trampa que el `$` en `String.prototype.replace` ya documentada aquí. Regla: cualquier texto con backticks, `$` o paréntesis va en un archivo `.py`, nunca en un `python -c` entre comillas dobles.

## La meta CT-GenAI ahora abre material de verdad (2026-08-19)

*"mi meta en dashboard del istqb gen ai no cuando doy click para que me mande al html que tiene esa seccion, no me abre bien, no me muestra eso. ademas no me abres ningun syllabus genai ni nada, ademas ya agende el examen de brightest"*.

Tres cosas, y las dos primeras eran fallas reales de la versión de esta mañana.

### El enlace a Entrevistas caía en la bienvenida

`entrevistas.html` **nunca había leído la URL**: no miraba `hash` ni parámetros. Enlazar ahí abría el archivo en su pantalla de bienvenida, sin ninguna señal de a dónde ir — de ahí el "no me abre bien, no me muestra eso". La nota anterior de este readme lo daba por sabido y lo dejaba como pendiente; ya no lo es.

`irDesdeHash()` en `Entrevistas/js/ui.js` acepta **dos formas**:

| URL | Qué hace |
|---|---|
| `entrevistas.html#istqb` | abre el módulo ISTQB en su primer capítulo |
| `entrevistas.html#istqb-ch4` | abre ese capítulo concreto |

Acepta el id del módulo (`data-mod`) además del id del tema a propósito: **los ids de tema cambian cuando se reordena un módulo, el `data-mod` no**, así que el enlace del Dashboard usa `#istqb` y sobrevive a que mañana se añada un capítulo.

Dos detalles que decidían si el enlace "se siente" bien: **despliega el módulo** si estaba plegado (si no, la página abre pero el sidebar no muestra dónde estás parado, que es exactamente la sensación de que no funcionó) y hace `scrollIntoView` del enlace activo. Va enganchado también a `hashchange`, no solo a la carga. Y **gana a la bienvenida de primera visita**: si llegas con una URL concreta, es a eso a lo que vienes.

Un hash desconocido no rompe nada: la función devuelve `false` y la página se queda como estaba.

### No abría ningún syllabus

El paso del temario apuntaba a `istqb.org/certifications/` — la portada del catálogo, no un syllabus. Ahora la meta enlaza a **material descargable verificado**, no a portadas:

| Enlace | Qué es |
|---|---|
| `ISTQB-CT-GenAI-Syllabus-v1.1.pdf` | el syllabus completo v1.1 (918 KB, comprobado que descarga) |
| `Sample-Exam-A-Questions_v1.1.pdf` | examen de muestra oficial, 40 preguntas |
| `Sample-Exam-A-Answers_v1.1.pdf` | sus respuestas razonadas |
| ASTQB · reglas del examen | número de preguntas, duración y prerrequisitos |

Y dos pasos nuevos con el método, que es lo que faltaba para que la meta sirviera: **hacer el examen de muestra antes de estudiar** —en 40 preguntas te dice qué ya sabes y qué no— y revisar las respuestas después de contestar, nunca mientras.

Se añadió además un dato que no estaba y que le aplica directo: el examen dura 60 minutos, pero **él tiene 75** — ISTQB da 15 minutos extra a quien presenta en un idioma que no es el suyo. Son casi 2 minutos por pregunta.

### El examen ya está agendado

El último paso era *"Ponle fecha"*. Ya no aplica: lo agendó con Brightest. Ahora ese paso es el plan de estudio —muestra primero, capítulos fallados después, segundo set la semana del examen— y deja anotado que **falta la fecha exacta de presentación**, que es el dato que convertiría esto en una cuenta regresiva como la de los días a 2030.

### Verificación

`#istqb`, `#istqb-ch1` y `#istqb-ch4` abren la página correcta con el módulo desplegado y el enlace marcado como activo; `hashchange` en caliente también; sin hash se conserva el comportamiento de siempre; un hash inexistente no navega ni rompe. La meta abre con **9 pasos y 6 enlaces**, y cero errores de consola.

## Imagen nueva, y en HD, para la meta CT-GenAI (2026-08-19)

*"pon otra imagen hd para esa meta"*.

La anterior era el típico letrero **AI** azul de banco de imágenes. La nueva es una placa de circuito en cian (`photo-1550751827-4bd374c3f58b`), elegida entre 9 candidatas comprobando primero que las 9 cargaran de verdad a 1920 px — no vale poner una URL que se vea rota mañana.

Dos razones además de la estética: es **oscura**, así que el título blanco y el gradiente de `.img-goal-photo::after` se leen sin competir con el fondo (el letrero azul anterior tenía zonas claras justo donde cae el texto), y es genérica de tecnología sin ser el cliché de "IA" que ya usaban mil sitios.

**Se pide en HD a propósito**: `w=1920&q=85`, frente al `w=800&q=80` del resto de metas. La diferencia no se nota en la tarjeta del grid (391×93 px) pero sí en el **hero del detalle**, que mide 270 px de alto a todo el ancho de la tarjeta — ahí una imagen de 800 px se estira y se ve blanda. Solo esta meta lo lleva; las demás siguen en 800.

Comprobado con un clic real sobre la tarjeta (no llamando a `abrirMetaDetalle()` a mano, que es lo que hace la app): el hero carga la imagen de 1920×1281 y el título se lee encima.

## Finanzas e Inversión: de "diagnóstico y hábito" a las habilidades una por una (2026-08-19)

*"quita esto 🔁 Hábito: Revisión de 10 min cada domingo… para finanzas e inversion, tambien lo de error comun quitalo, quita tambien lo de esta semana y lo de por que esta baja, aqui debes listarme las habilidades una po una de inversion y de finanzas que debo saber y explicar detalladamente como crecer esa habilidad y con recursos como libros… por que teniamos cosas inutiles pero esto si me va servir"*.

Las 6 habilidades de `APRENDIZAJE` se pintaban todas igual: diagnóstico, primer paso, semanas 2-4, hábito y error común. Para Finanzas e Inversión eso decía **cómo empezar**, pero nunca **qué hay que saber**. Ahora esas dos llevan una lista numerada de sub-habilidades: **7 de finanzas y 9 de inversión**, cada una con qué es, cómo desarrollarla con pasos medibles, y el libro que la cubre.

| Finanzas | Inversión |
|---|---|
| Saber a dónde se va tu dinero | Interés compuesto y horizonte |
| Presupuestar sobre ingreso variable | **Escribir tu asignación objetivo** |
| Dimensionar el fondo de emergencia | Conocer los instrumentos mexicanos |
| Calcular el costo real de la deuda | Ver las comisiones antes que el rendimiento |
| Leer tu propio balance | Aportar periódicamente y automatizarlo |
| Entender tus impuestos | Rebalancear una vez al año |
| Decidir con la cabeza fría | Saber qué impuestos pagas al invertir |
| | Aguantar sin vender |
| | Saber cuándo NO invertir |

El contenido está atado a su situación real, no es teoría general: el presupuesto parte de que su ingreso es mixto (ALTEN fijo, Didi variable) y manda presupuestar **sobre el mínimo de 3 meses, nunca sobre el promedio**; el fondo se compara contra su meta viva de $10,000; "escribir tu asignación objetivo" señala explícitamente el hueco que su propio diagnóstico venía marcando desde hace semanas; y "saber cuándo NO invertir" enlaza con la regla que el panel de *Qué invertir hoy* ya aplica a su saldo.

Los libros son reales y en buena parte **en español y de México** — `Pequeño Cerdo Capitalista` de Sofía Macías aparece en finanzas y su edición de *Inversiones* en la otra: habla de CETES, Afore y pesos, no de 401k.

### Cómo conviven los dos formatos

`renderSkills()` pinta uno u otro **según exista `subs`** en la habilidad. Las otras 4 (Ventas, Marketing, Datos, IA) conservan el formato anterior sin tocar una línea, y el día que alguna se reescriba basta con darle su `subs`. Nada de una segunda función ni de una rama duplicada.

`recursos` **no se tocó** aunque ya no se pinta en estas dos: de ahí salen los audiolibros de *Qué escuchar en Didi*. Borrarlo por "limpieza" habría vaciado esa pantalla en silencio.

La lista lleva `max-height:340px` con scroll propio: son 7 y 9 entradas largas, y sin tope la tarjeta empujaba fuera de pantalla al resto del slide.

### Verificación

Escritorio y celular: **7 y 9** sub-habilidades pintadas, **0** rastros de los 5 campos retirados, un recurso por sub-habilidad, scroll interno activo y 0 desbordes. Sin errores de consola.

## El hover de las tarjetas movía el título, no solo la foto (2026-08-19)

*"hay un error y lo observo en mi pc, cuando paso el mouse a mis metas en lo de byd y den ai, se hacen mas grandes las imagenes y hace cosas raras"*.

El efecto era `transform:scale(1.02)` sobre `.img-goal-photo` — pero eso **no es la imagen, es el contenedor**. Al escalarlo se escalaba todo lo que lleva dentro: el gradiente `::after` y, sobre todo, el título `.img-goal-txt`, que al re-renderizarse a un tamaño intermedio se ve borroso y corrido.

Por qué justo en esas dos y no en el resto: **son los dos títulos más largos**. "Liquidar el BYD Dolphin Mini · $X restantes" —que además lleva dinero en vivo— y "Certificación ISTQB CT-GenAI" ocupan casi todo el ancho de su tarjeta, así que un 2% de corrimiento se ve; en "Primer Hyrox" no hay dónde notarlo. No era cosa de esas dos imágenes: el defecto estaba en las 33 tarjetas y solo se apreciaba en las de título largo.

Medido antes del arreglo: la tarjeta escalada **se salía unos 4 px de su celda por cada lado**, invadiendo el espacio de las vecinas.

### El arreglo

La imagen pasa a un `::before` que hereda el `background-image` inline del padre (`background:inherit`), y es **ese pseudo-elemento** el que escala:

```
.img-goal-photo::before{...background:inherit;transition:transform .25s}
.img-goal-photo:hover::before{transform:scale(1.06)}
```

El contenedor ya no se mueve, así que ni arrastra al texto ni se sale de la celda, y el `overflow:hidden` que ya tenía recorta el zoom dentro de la tarjeta. Como ahora nada compite por espacio, el zoom pudo subir de 1.02 a **1.06**: se nota más y molesta menos. `::after` (gradiente) y `.img-goal-txt` recibieron `z-index` explícito para quedar por encima de la imagen.

### Verificación

En las 4 tarjetas probadas —BYD, CT-GenAI, Hyrox y Maestría— con el hover activo: la foto **mantiene su tamaño exacto** (391×79 → 391×79), el **título no se mueve ni un píxel**, y **no se sale de su celda**. La captura sí cambia con el puntero encima, o sea que el zoom se ve. Las **33 tarjetas** con foto del archivo (14 metas + 19 habilidades base) heredan la imagen correctamente en el pseudo-elemento, incluidas las que no vienen de Unsplash —la del BYD es de Wikimedia—, en escritorio y en celular. Cero errores de consola.

## Los medidores de Mis Metas se abren y explican su número (2026-08-19)

*"aqui quiero que cuando de click, me muestre informacion detallada como barras para ese indicador que las respalden o informacion o info para resolverla o que te ayuden o solo indicativas, tambien si puedes agregar mas, hazlo"*.

Los 4 medidores de arriba del slide eran de solo lectura: una cifra sin de dónde sale ni qué hacer con ella. Ahora son **8 y todos se abren** con un panel que responde tres cosas — **de dónde sale el número**, **qué significa** y **qué hacer**.

### Los 8

| | Medidor | Qué desglosa al abrirlo |
|---|---|---|
| 🆘 | Fondo de emergencia | avance a la meta **y cuántos meses de tu gasto real te cubre hoy** |
| 💳 | Deuda cara | cada deuda con su tasa y **lo que te cuesta al mes solo en intereses** |
| 🎓 | Fondo Maestría | lo ahorrado y **por qué está en pausa** (decisión tomada, no olvido) |
| 💰 | Patrimonio hacia $1M | qué suma y qué resta, y **el ritmo mensual que pide la meta** |
| 💸 | **Ahorro de este mes** | ingresos contra gastos del mes y tu tasa de ahorro |
| 📈 | **Total invertido** | el reparto real de tu portafolio, instrumento por instrumento |
| 🧾 | **Deuda total** | todas las deudas **ordenadas por tasa**, no por saldo |
| ⏳ | **Camino a 2030** | días restantes y % del plan recorrido |

Los 4 nuevos salen de datos que **ya estaban en `finanzasmx_v2`** y que no se miraban en ninguna pantalla: las transacciones del mes, el detalle de `investments`, las deudas sin interés (que no aparecían en "deuda cara" pero sí comprometen el excedente) y el calendario del plan.

### Nada escrito a mano

Todo el desglose se calcula en vivo al abrir el panel, así que ninguna cifra puede quedarse vieja. Algunos ejemplos de lo que eso permite decir, que antes no se podía:

- **El fondo se compara contra su gasto real**, no contra el número redondo: promedia los gastos de los 3 meses cerrados y calcula cuántos meses cubren los $10,000. Si la meta no llega a 3 meses de gasto, el panel lo avisa — los $10,000 son un buen primer escalón, no el fondo terminado.
- **La deuda cara dice lo que cuesta el mes que sigue viva**: `saldo × tasa ÷ 12`, deuda por deuda.
- **El patrimonio traduce la meta a ritmo**: cuánto habría que sumar al mes para llegar en los meses que quedan, con la aclaración de que **pagar deuda cuenta igual que ahorrar** porque mueve el mismo número.

El panel reutiliza las clases `.gbm-*` del panel de inversión en vez de duplicar 60 líneas de CSS: mismo lenguaje visual y lo que se arregle en uno vale para el otro. Solo las barras de desglose son nuevas.

### Verificación

Con datos sembrados realistas (fondo $4,000, BBVA $32,343 al 45%, crédito del coche a 0%, 3 instrumentos, 10 movimientos repartidos en 4 meses): los **8 paneles abren con su cifra, sus barras y sus secciones**, y **ninguno muestra `undefined` ni `NaN`** — que es el riesgo real de calcular todo en vivo sobre datos que pueden faltar. 0 desbordes en 1600px, 820px y 390px, y cero errores de consola.

## El medidor de ahorro se cambia por el de intereses (2026-08-19)

*"pon otra cosa en ahorr este mes"*.

**Ahorro de este mes** tenía un defecto de origen: se calculaba de las transacciones del mes en curso, así que si Adán no las captura en Finanzas, el medidor sale en ceros y no dice nada. Un indicador que depende de un hábito que todavía no existe no informa, estorba.

En su lugar, **🔥 Intereses este mes**, elegido por él entre cuatro alternativas. Sale de `saldo × tasa ÷ 12`, datos que **siempre están** en `debts`, y es el número más accionable de todos: baja únicamente cuando abona.

### Qué muestra al abrirlo

- **Quién cobra qué**: cada deuda con su tasa y lo que aporta al interés mensual, ordenadas de mayor a menor tasa.
- **Lo que ya dejaste de pagar**: una barra que compara el interés de hoy contra el que pagaba cuando debía el saldo original de cada deuda (`total` contra `balance`). No es un porcentaje decorativo — mide dinero que dejó de salir cada mes.
- **Cuánto vale abonar**: qué ahorra al año un abono extra de $1,000 a su deuda de tasa más alta. Con una tarjeta al 45%, son $450 anuales garantizados y para siempre — el argumento de por qué la deuda cara va antes que invertir, dicho con su número.
- El recordatorio de que **ya bajó este número de golpe una vez**: liquidar la Banamex el 13-ago-2026 apagó su parte de intereses para siempre.

La barra del medidor no mide "cuánto interés pagas" (eso no tiene meta), sino **cuánto ha bajado desde el saldo original**: así avanza de verdad cada vez que abona, en vez de quedarse clavada.

`kpiMesActual()`, que solo alimentaba el medidor viejo, se borró en el mismo cambio en lugar de quedarse como código muerto.

### Verificación

Con los mismos datos sembrados: el medidor muestra **$1,213 al mes · $14,554 al año**, y su panel abre con 2 barras, 3 secciones, 1 paso y 2 notas, sin `undefined` ni `NaN`. Los otros 7 siguen intactos. 0 desbordes en 1600px, 820px y 390px; sin errores de consola.

## La tasa de las tarjetas estaba en 10% — y el pago de la BBVA no amortiza nada (2026-08-19)

*"intereses son como 1500 al mes de bbva, por que debo como 32,000"*.

Tenía razón, y el error era grande: `d001` (Tarjeta BBVA) estaba registrada con **`rate:10`**. Al 10% anual, un saldo de $32,343 genera **$270 al mes** de intereses. Él reportó ~$1,500. Factor de error: **5.5×**.

### La confirmación no vino de creerle, vino de sus propios datos

La deuda lleva registrada `total == balance == 32,343.31` desde el **22-ene-2024**, con un pago de `min:1500` al mes que aparece puntualmente en las transacciones de cada mes.

| | |
|---|---|
| Meses pagando | **31** |
| Pagado en total | **$46,500** |
| Saldo hoy | **$32,343.31** — el mismo del primer día |

Un saldo que no se mueve pagando $1,500 al mes solo puede significar una cosa: **el interés mensual es igual al pago**. De ahí sale la tasa: `1500 × 12 ÷ 32,343.31 = 55.7% anual`, que es una tasa perfectamente normal para una tarjeta en México — y la que hacía falta para que las cuentas cuadraran con lo que él ve en su estado de cuenta.

Corregido a **55.7%** en `d001` y, por coherencia, en `d002` (Banamex, ya liquidada: su tasa solo afecta al histórico, y ese 55.7 es un supuesto tomado de la BBVA, no un dato medido de esa tarjeta). **Falta confirmarlo contra el estado de cuenta**, que trae la tasa y el CAT reales.

### El hallazgo que ningún medidor decía

El panel de intereses gana una sección nueva, **"Tu pago contra tu interés"**, que compara el pago programado de cada deuda (`min`) con lo que esa deuda genera de interés:

> **Tarjeta BBVA · pagas $1,500 al mes**
> De ese pago, **$1,501 son intereses**: no baja el saldo **ni un peso**. Llevas pagando desde 2024-01-22 y debes lo mismo que el primer día — todo se va en renta del dinero.
> Para liquidarla de verdad: **$2,263/mes la cierra en 2 años**, o $3,576/mes en 1. Cualquier peso por encima de $1,501 es el único que trabaja para ti.

Las cuotas salen de la fórmula de amortización real (`P·i / (1 − (1+i)^−n)`), no de dividir el saldo entre los meses.

### Que el arreglo llegue a su navegador

Cambiar la semilla de `Finanzas.html` no sirve de nada cuando el navegador ya tiene datos guardados desde hace meses. Por eso va acompañado de `fixTasaTCIfNeeded()`, mismo patrón que `fixBanamexIfNeeded()`: corrige la tasa **dentro de `finanzasmx_v2`**, y solo si sigue en el 10 original — si alguna vez la ajusta a mano, no se pisa.

### Verificación

Sembrando sus datos **con el `rate:10` viejo**, al abrir el Dashboard la tasa queda en 55.7 sola, el medidor pasa de $270 a **$1,501 al mes · $18,015 al año** —el número que él dijo— y el panel muestra las tres secciones nuevas sin `undefined` ni `NaN`. Sin errores de consola.

## Las sub-habilidades se pliegan: la tarjeta pasa a ser un índice (2026-08-19)

*"todo esto en finanzas y inversion, no muestres todo, solo lo importante, pero hazlo en forma de boton […] esto para que cuando haga click ya muestres toda la info"*.

El contenido estaba bien, el problema era mostrarlo entero de golpe: con las 7 y 9 entradas desplegadas, la tarjeta era un muro de texto donde había que scrollear solo para saber **qué habilidades hay**.

Ahora cada sub-habilidad es un **botón cerrado** con su número y su nombre. El título solo ya dice cuál es cada una, y el "qué es / cómo desarrollarla / con qué libro" aparece al tocarla. La tarjeta se lee como el **índice de lo que hay que aprender**, y el desarrollo se pide cuando se quiere.

| | Antes | Después |
|---|---|---|
| Alto de la tarjeta (escritorio) | 432 px con scroll interno | **391 px, todo a la vista** |
| Alto en celular (Finanzas) | 436 px | **323 px** |
| Entradas visibles de un vistazo | ~2 de 7 | **las 7** |

Detalles que importan: es un `<button>` real, así que entra en el orden de tabulación y responde a Enter y Espacio, y lleva `aria-expanded` que cambia con el estado. Ocupa **todo el ancho** de la fila para que sea fácil de atinar con el dedo. Y **se pueden tener varias abiertas a la vez** a propósito — sirve para comparar dos habilidades sin ir cerrando.

El mismo cambio se aplicó a las 16 tarjetas de Coach (7 de finanzas + 9 de inversión), con sus propias clases.

### Verificación

Dashboard en escritorio y celular: **7 y 9 botones**, todos cerrados al cargar, **0 cuerpos visibles**, y al hacer clic el primero abre con `aria-expanded="true"` y su contenido a la vista. En Coach, los 16 cerrados y el toggle funcionando — comprobado **después de navegar a la sección**, porque `#aprendizaje` carga con `display:none` y medir ahí daba un falso negativo. 0 desbordes y sin errores de consola.

## Un crédito a plazo no se juzga como una tarjeta revolvente (2026-08-19)

*"esto esta bien calculado, sabiendo el tiempo del credito automotriz? — Crédito Automotriz · pagas $6,700 al mes. De ese pago, $3,237 son intereses y solo $3,463 bajan el saldo. A este ritmo tardarías años en liquidarla."*.

**El cálculo estaba bien; la conclusión no.** Los números se comprobaron uno por uno:

| | |
|---|---|
| Interés mensual | `299,000 × 12.99% ÷ 12` = **$3,237** ✅ |
| Amortización | `6,700 − 3,237` = **$3,463** ✅ |
| Cuota teórica para 61 meses | **$6,722** contra los $6,700 reales — cuadra |

Lo que fallaba era la frase final. *"A este ritmo tardarías años en liquidarla"* es el texto pensado para una **tarjeta revolvente**, donde el pago mínimo puede no amortizar y eso sí es una alarma. Un crédito automotriz tiene **plazo pactado y mensualidad calculada para liquidarlo en esa fecha** — y la propia deuda ya traía el dato: **`remainingMonths: 61`**, que el panel estaba ignorando.

### Ahora distingue los dos tipos

**Deuda a plazo** (trae `remainingMonths`) — la pregunta útil no es cuándo acaba, que ya se sabe, sino cuánto de lo que falta es interés:

> **Crédito Automotriz · pagas $6,700 al mes**
> De ese pago, $3,237 son intereses y $3,463 bajan el saldo — **y va según lo pactado: te quedan 61 pagos, hasta septiembre de 2031**.
> De aquí al final pagarás **$408,700**, de los cuales **$109,700 son intereses**. Adelantar pagos aquí sí ahorra, pero **menos que en la tarjeta**: 12.99% contra la tasa de tus tarjetas. Primero la cara.

**Deuda revolvente** (sin plazo) conserva la alarma, y ahora además **calcula los meses** con la fórmula del logaritmo en vez de decir "años" a ojo.

### De paso: dos números distintos con el mismo nombre

Revisando esto apareció otra incoherencia. El **medidor** "Deuda cara" la calcula con las tarjetas (Banamex + BBVA), pero el **panel** la calculaba con `rate > 0`, que mete al crédito del coche al 12.99%. La misma pantalla mostraba dos cifras distintas bajo el mismo nombre. El panel ahora filtra por `type === 'credit_card'`, igual que el medidor.

El coche sigue contando donde corresponde: en **Deuda total** y en **Intereses este mes**, porque intereses sí paga — $3,237 de los $4,738 mensuales, de hecho.

### Verificación

Con sus deudas reales sembradas (BBVA $32,343 al 55.7% y crédito automotriz $299,000 al 12.99% con 61 meses): el panel muestra el plazo y el interés total restante en el coche, mantiene la alarma en la tarjeta, y "Deuda cara" queda en $32,343 — solo la tarjeta, igual que su medidor. Sin `undefined` ni `NaN`, sin errores de consola.

## Fondo Maestría: el desglose que faltaba, y el que no existe (2026-08-19)

> ⚠️ **Superada el 2026-08-23.** La conclusión de esta sección —"en Finanzas ese número no está desglosado"— era **falsa**, y el panel la mostró durante cuatro días. Sí está desglosado, y la pieza más grande es su Bitcoin. Ver ["El fondo sí estaba desglosado"](#el-fondo-sí-estaba-desglosado-y-dos-tercios-son-bitcoin-2026-08-23) al final de este documento.

*"fondo de maestria no desglozaste las cantidades que conforman ese numero ni las barras de ellas, debes investigar en finanzas"*.

Se investigó, y el resultado es en sí mismo el hallazgo: **en Finanzas ese número no está desglosado**. La meta `g001` guarda `current: 53740` como **una sola cifra**, sin instrumentos ligados, sin aportaciones históricas y sin cuentas asociadas. Lo único trazado como inversión son CETES y un depósito de renta, que ni suman esa cantidad ni pretenden ser ese fondo.

El panel ahora **lo dice en vez de callarlo**, y muestra todo lo que sí se puede derivar:

| Sección | Qué muestra |
|---|---|
| 📊 Cómo se reparte la meta | dos barras: lo ahorrado (11%) y lo que falta ($446,260, **8.3 veces** lo que lleva) |
| 🔍 Qué compone esos $53,740 | el aviso de que Finanzas no lo tiene desglosado, con lo que sí está registrado como inversión y su barra |
| ⏸️ Por qué ahora no aportas | la pausa, con **fechas leídas de la propia meta** (`pausadaHasta`, `date`), no de un texto fijo |
| 📈 El ritmo que pediría la meta | lo que nadie había calculado |

### El número que cambia la conversación

Las fechas ya estaban en los datos, solo que nadie las había multiplicado:

- Reanuda aportaciones en **julio de 2027**
- Meta fechada en **octubre de 2028**
- Quedan **14 meses útiles** para juntar **$446,260**

Eso son **$31,876 al mes** — más de la mitad de todo lo que gana, sin contar renta, deuda ni comida. **La meta, con su fecha actual, no es alcanzable.**

El panel no lo plantea como un fracaso sino como una decisión que conviene tomar hoy y no en 2027, con tres salidas concretas: correr la meta a 2030, bajar el objetivo (maestría más barata, beca, DAAD), o financiar parte con ingreso nuevo en vez de con ahorro. Y deja claro que **decidirlo es tarea de Coach → Plan Maestro**, no de un panel de lectura.

### Verificación

Con la meta real sembrada: 4 barras y 4 secciones, las fechas formateadas desde `pausadaHasta` y `date`, el ritmo calculado sobre los meses reales entre ambas, y ningún `undefined`, `NaN` ni `Invalid Date` — el riesgo de trabajar con fechas que pueden faltar. Sin errores de consola.

## Patrimonio, peso por peso — y los $540,600 que nadie contaba (2026-08-19)

*"aqui ni siquiera me pones lo que tengo en cetes, deposito, bitcoin, ni tampoco la deuda de bbva, ni de mi carro, ni otras cosas desglozadas, aqui debes poner todo eso y mas"*.

El panel resumía todo en **3 barras agregadas** —Inversiones, Fondo, Deudas— donde no se veía ni un CETE ni una tarjeta. Ahora sale línea por línea:

**🟢 Lo que tienes** — cada inversión con su nombre, el fondo de emergencia, y el dinero líquido que estaba en `activos` (efectivo y cuenta) y no aparecía en ningún lado.

**🔴 Lo que debes** — cada deuda con su saldo, su tasa, **lo que cuesta al mes en intereses** y, si es a plazo, los pagos que faltan. Ordenadas de mayor a menor.

Las dos listas comparten escala, así que las barras son comparables entre sí: se ve de un vistazo que el crédito del coche es casi todo lo que debe.

### El "y más" resultó ser lo importante

Finanzas tiene **15 activos registrados** —el BYD, la PC, los teléfonos, la PS5, los monitores— que `patrimonioNeto()` **nunca sumó**. Con los datos actuales son **$540,600**.

| | |
|---|---|
| Patrimonio líquido (el de la meta) | **−$311,241** |
| Bienes registrados | **+$540,600** |
| **Patrimonio contando bienes** | **+$229,359** |

El panel muestra los 8 bienes más grandes con su barra y **no cambia la fórmula del KPI**, a propósito: la meta del millón se mide en dinero, y no va a vender el coche ni la PC para llegar. Pero ignorar medio millón en cosas suyas da una foto falsa de "no tengo nada". Las dos cifras son ciertas y el panel lo dice así: *"−$311,241 es lo que tienes disponible, $229,359 es lo que vales hoy"*.

### Un hueco que el desglose deja a la vista

Adán mencionó **Bitcoin** entre lo que esperaba ver, y no aparece: **no hay ningún BTC en `investments`**. Sus inversiones registradas son CETES y un depósito de renta. El panel de inversión del lunes habla de BTC como parte de su portafolio, pero en los datos no está. En cuanto lo dé de alta en Finanzas → Inversiones, aparece aquí solo, sin tocar nada.

### Verificación

Con sus datos reales sembrados: **18 barras**, las 3 secciones con sus subtotales ($23,425 / $332,991 / $540,600), la resta explicada con sus dos operandos, los 8 bienes mayores más el "y 5 cosas más", y ningún `undefined` ni `NaN`. Sin errores de consola.

## El encabezado de la fase deja de ser plano (2026-08-19)

*"esto se ve visualmente muy mal, es muy plano y no tiene ni diseño y se ve muy plano"*.

Era un título, una línea de 11 px en gris (*"Vence 30 sep 2026 · 41 día(s) restantes"*) y cinco renglones de texto corrido. El problema de fondo no era el color: **el dato con más fuerza —el tiempo que queda— estaba escrito en palabras en vez de mostrado**, y competía en tamaño con el resto.

### Lo que hay ahora

**Una barra con la fase completa** y el marcador de dónde cae hoy entre el inicio y el fin. Lo transcurrido se llena con degradado, y el punto de hoy se mueve solo. De un vistazo se ve cuánto se ha ido y cuánto queda, que es lo que una fecha de vencimiento nunca comunica.

**Las tres cifras que importan**, en números grandes:

| | |
|---|---|
| **41** | días restantes — cambia de color: amarillo, naranja bajo 30 días, rojo bajo 14 |
| **9** | semanas en total |
| **32%** | transcurrido |

**El chip de la fase** separado del título, para que "Fase 0" no compita con el nombre de la fase.

**La primera frase del texto se destaca** como entrada, y el resto queda de apoyo. El corte se busca con `/\.\s+[A-ZÁÉÍÓÚ¿¡]/` en vez de partir por el primer punto, para no romper en "30 sep. 2026" ni en una abreviatura.

Todo el bloque va en una tarjeta con degradado y borde de acento, en el mismo lenguaje visual que los medidores de Mis Metas.

### Lo que deliberadamente no se tocó

El párrafo menciona el orden *"1) fondo de emergencia, 2) Banamex, 3) BBVA"* — y esos tres pasos **ya viven justo debajo**, en "Tu ruta hacia deuda cara en $0", con su estado real y su avance. Convertirlos también en tarjetas aquí habría duplicado la misma información dos veces en la misma pantalla.

### Verificación

Escritorio, iPad y iPhone: el chip y el título separados, la barra al **31.7%** con el marcador de hoy en la misma posición, las 3 cifras correctas (41 días / 9 semanas / 32%), la primera frase destacada, y **0 desbordes** en los tres. Sin errores de consola.

## Totales y "ya lo tengo" en las categorías que no son el súper (2026-08-20)

*"en compras no me pusiste todos los precios y no sumas los precios cuando selecciono varios, ademas otro check de comprar y otro de ya lo tengo, pero excluye esto que te digo de supermercado"*.

El súper ya tenía ticket, total mensual y contadores; **queda fuera del cambio tal como pidió**. Lo nuevo es para las otras 6 categorías: skincare, cabello, suplementos, higiene, ojos y libros.

### El total se va sumando

`lcTotalCat()` suma lo marcado y pinta la barra con **los dos precios de plataforma**: `🧮 ≈$830 Amazon · ≈$715 M. Libre · 3 productos marcados`. No es una versión recortada del ticket del súper — aquí no hay contadores ni prorrateo mensual porque no aplican: un protector solar no se compra cada semana.

### "Ya lo tengo", que son dos preguntas distintas

Un producto responde a dos cosas: **"¿lo llevo?"** (el checkbox de siempre) y **"¿ya está en mi casa?"**. Por eso son dos controles y dos claves — `dash-lista-compras` y `dash-lista-tengo` —, así marcar la compra nunca pisa lo otro.

Lo marcado como que ya tienes: **sale del total, se apaga el renglón, se deshabilita su checkbox de compra y desaparece del denominador de la pestaña** (`Skincare 2/7` en vez de 2/8). Pero **no se borra de la lista**: borrarlo sería perder el catálogo de lo que hay que tener.

No aparece en el súper, a propósito: ahí todo se vuelve a comprar cada semana y "ya lo tengo" no significaría nada.

### Los precios: 17 nuevos, y por qué faltan los demás

| Categoría | Antes | Ahora |
|---|---|---|
| Cabello | 1/11 | **8/11** |
| Ojos | 0/12 | **4/12** |
| Higiene | 0/34 | **6/34** |
| Skincare · Suplementos · Libros · Comida | completos | completos |

**4 de los de cabello no hacían falta buscarlos**: ya existían en el proyecto, pero con el nombre anterior del producto. Al renombrarlos el 18-ago las claves dejaron de coincidir y **el precio se perdió en silencio** — el mismo fallo que se documentó al cambiar el acondicionador, ahora encontrado en 4 productos más.

Los 13 restantes se buscaron en tiendas mexicanas reales: Sanborns, Farmacias del Ahorro, Prixz, Walmart, Amazon MX y Mercado Libre.

**Lo que falta es Higiene sobre todo, y hay una razón**: son artículos genéricos —curitas, lima de uñas, talco, tijeras de cejas— cuyo precio varía tanto entre marcas que una búsqueda devuelve rangos, no cifras. Poner un número inventado ahí haría que el total mintiera, que es peor que dejarlo vacío. Por eso la barra **cuenta los que no tienen precio y lo dice** (`⚠ 6 sin precio`), en vez de sumar como si estuvieran todos.

Además, 4 de los 34 de Higiene (*"Champú y acondicionador en envase de 100 ml (los tuyos)"*, *"Skincare AM/PM en botellas pequeñas"*, *"Minoxidil en su envase original"*, *"Suplementos en pastillero"*) **no son compras**: son "usa lo que ya tienes, en tamaño de viaje". Encajan exactamente con el botón nuevo de "Ya lo tengo".

### Verificación

Marcando 3 productos de Skincare: la barra suma **$830 / $715**. Al marcar uno como "ya lo tengo" baja a **$550 / $460**, aparece `✓ ya tienes 1`, el renglón se apaga, su checkbox se deshabilita y la pestaña pasa de 2/8 a **2/7**. En el súper hay **0 botones** de "ya lo tengo" y conserva su barra de ticket. 0 desbordes y sin errores de consola.

### El pasillo "Los que ya tienes" nace marcado (2026-08-20)

*"añadelo"*.

De los 34 productos del kit de higiene, 4 no son compras y su propio pasillo lo dice: **"Los que ya tienes — solo cámbialos a tamaño viaje"** (champú y acondicionador rellenados, skincare en botellas pequeñas, minoxidil en su envase original y suplementos en pastillero). Estaban inflando los pendientes desde el primer día.

`seedTengoViajeIfNeeded()` los marca como "ya lo tengo" en la primera carga, con el mismo patrón de bandera que `seedMetasLogradasIfNeeded()`. La pestaña pasa de **0/34 a 0/30**, que es el número real de cosas por comprar.

**Se siembra una sola vez, y eso importa**: si algún día se le acaba el champú y sí tiene que comprarlo, lo desmarca y no se le vuelve a marcar en la siguiente carga. Comprobado: 4 marcados en carga limpia → desmarca uno → recarga → siguen 3.

## "Ideas para hoy" muestra la mitad y el resto va con scroll (2026-08-20)

*"lo de ideas para hoy quiero que me muestres la mitad y lo demas le haga scroll down para verlo"*.

La lista tenía `flex:1` sin techo desde el 2026-08-12 —se le quitó el `max-height` para que se estirara hasta igualar al panel de gym, que era lo que se había pedido entonces— y el efecto acumulado es que **mostraba las 10 recetas y no hacía scroll nunca**.

Medido antes de tocar: 10 tarjetas de 20 px con 3 px de gap = **23 px cada una**, en una lista de 227-238 px. La mitad son 5 tarjetas = **115 px**.

| | Antes | Después |
|---|---|---|
| Recetas visibles | 10 de 10 | **5 de 10** |
| Alto de la lista | 227-238 px | **115 px** |
| Alto del panel | 306-317 px | **194-242 px** |

### Dos detalles que hacían falta

**El `min-height` tuvo que bajar de `clamp(90px,14vh,118px)` a 92 px.** En CSS un `min-height` mayor que el `max-height` **gana**, así que en cualquier pantalla donde `14vh` superara los 115 px el techo no habría servido de nada. Los 92 px siguen cumpliendo su función original: que en móvil, donde no hay alto sobrante que absorber, la lista no colapse.

**Una máscara de degradado en los últimos 18 px.** Una lista cortada limpia parece una lista completa; con la última tarjeta desvaneciéndose se ve que sigue. Es constante y suave a propósito, no un indicador que aparezca y desaparezca: el scroll no cambia el DOM, así que un `:has()` no podría detectarlo.

### Verificación

Escritorio, monitor grande, iPad e iPhone: **5 de 10 visibles** en los cuatro, con la lista en 115 px sobre un contenido de 227-238 px. Y no basta con que haya barra: se comprobó llevando el scroll al fondo que **llega hasta el final y la décima receta es alcanzable**. Sin errores de consola.

## El slide de Coach se salía de la pantalla (2026-08-20)

*"la segunda pagina del dashboard no se ve bien, se pasa de los bordes"*.

Medido en 1366×768 antes de tocar nada: el tile del checklist mide 404 px y **se salía 150 px por debajo del borde**. Como el slide es `overflow-y:hidden` en escritorio, esa parte quedaba recortada **sin ninguna forma de llegar a ella**.

**El desbordamiento ya existía**; el rediseño del encabezado de fase del 19-ago lo agravó de 150 a 204 px, porque el hero pasó de 249 px a 362 px. Comprobado contra `4569997^`, no supuesto.

### El primer intento no sirvió, y por qué

Lo natural era dar el alto sobrante al checklist con `flex:1` y que scrolleara dentro de su tarjeta — el patrón que ya usan "Importante este mes" y `#diaTimeline`. Medido: en FHD funcionaba, pero **en 1600×900 el checklist quedó en 22 px y en 1366×768 en 0 px**. La razón es simple: `flex:1` reparte el espacio *sobrante*, y en esas alturas no sobra nada. El resultado era peor que el problema.

### Lo que sí lo arregla

**El slide scrollea en vez de recortar.** Es la diferencia entre *"no cabe, mala suerte"* y *"no cabe, baja a verlo"*. Las demás pantallas del Dashboard son de vistazo y caben; esta lleva el plan de la fase completo —encabezado, ruta de deuda y el checklist entero— y en 720-900 px de alto no entra por diseño, no por accidente.

- `.slide.theme-coach.active{overflow-y:auto;overscroll-behavior:contain}` — el `overscroll-behavior` evita que al llegar al final el scroll se propague al carrusel.
- `.slide-inner` pasa a `height:auto;min-height:100%` con el contenido anclado arriba, en vez de centrado: centrar contenido que no cabe lo recorta **por los dos lados**.
- En `@media(max-height:820px)` el hero de la fase cede espacio (paddings menores y el texto explicativo a 3 líneas). Es un encabezado; el checklist es la parte con la que se trabaja.

### Verificación

**7 resoluciones, 7 correctas**: FHD, 1600×900, 1366×768, 1280×720, MacBook 1440×900, iPad y iPhone. En todas: **0 desbordes horizontales**, y llevando el scroll al fondo se comprueba que **el último bloque queda visible** — que es lo que de verdad se pedía, no solo que existiera barra. El checklist se muestra completo (341-705 px según el tamaño). Sin errores de consola.

## La fuente dejaba la página esperando a Google (2026-08-23)

*"como que se traba esa pagina"*.

Medido en Coach: el único recurso externo de la página es la hoja de **Google Fonts**, y tardaba entre **400 y 1,440 ms** — el recurso más lento por goleada. Estaba cargada con `@import` **dentro del `<style>`**, que es la peor forma posible: el navegador no la descubre hasta parsear el CSS y, mientras Google no contesta, **no pinta nada**. Sin internet o con conexión lenta, la página se queda en blanco esperando a un servidor que no va a responder.

Estaba así en **las 8 apps** del proyecto, desde siempre.

Ahora se carga con `<link ... media="print" onload="this.media='all'">` más los `preconnect`: la hoja se descarga sin bloquear el pintado y se activa al llegar. El `<noscript>` cubre el caso sin JavaScript, y la tipografía de respaldo ya estaba en cada `font-family`, así que el texto se lee desde el primer instante.

| | Con red | **Con Google Fonts caído** |
|---|---|---|
| Coach | 920 → **612 ms** | **481 ms**, texto completo |
| Dashboard | **550-808 ms** | **550 ms**, texto completo |
| Vestimenta | **216 ms** | **146 ms**, texto completo |

La prueba que importa es la segunda columna: se bloqueó `fonts.*` en el navegador y **las 8 apps cargan igual de rápido y muestran todo su texto**. Antes, ese escenario dejaba la página esperando.

**Lo que NO era**: las 4 tarjetas sociales nuevas de Coach. Comparado contra `a06c8b4^` en 3 corridas, la versión anterior y la actual cargan igual (~920 ms de DOM). El `@import` ya estaba antes.

## Las 4 habilidades sociales, ahora en el sitio correcto (2026-08-23)

*"sigo sin verlo aqui"* — con una captura del slide **Habilidades Base**.

Y con razón: el 20-ago el contenido se escribió en `Coach_v2.html`, en la sección "Habilidades de un Hombre de Valor". Pero el sitio que él tenía en mente es este slide del Dashboard, cuyo título es literalmente **"Lo que todo hombre debería saber hacer"**. Dos secciones con nombres casi idénticos en apps distintas, y el contenido fue a la que no era.

Ahora están donde las buscaba, en el mismo formato que las 19 que ya vivían ahí:

| | Habilidad | Pasos de checklist |
|---|---|---|
| 🤝 | Hacer networking de verdad | 8 |
| 🎯 | Persuadir sin manipular | 11 |
| 💬 | Relacionarte con las personas | 6 |
| 🌱 | Sacarle lo mejor a una persona | 7 |

**32 pasos**, cada uno marcable, llenando la barra de progreso de su tarjeta como el resto.

**Van primero en el array a propósito.** Las otras 19 son habilidades físicas o de protocolo —nadar, fogata, nudos, mecánica—; estas cuatro son las que mueven una carrera, y en la primera fila es donde se ven sin scroll.

Cada una cierra con un paso **"✅ Ya lo dominas cuando…"** con criterios comprobables, siguiendo el patrón de las 19 existentes. No dicen "cuando te sientas seguro":

- **Networking**: cuando alguien de tu lista te presenta a un tercero **sin que se lo pidas**.
- **Persuadir**: cuando descartas un argumento que funcionaba **porque no era verdad**.
- **Relacionarte**: cuando sales de una conversación sabiendo tres cosas del otro y él casi nada nuevo de ti.
- **Sacarle lo mejor**: cuando dices algo incómodo y la relación queda **mejor**, no peor.

### Verificación

Escritorio, iPad e iPhone: **23 habilidades y 23 tarjetas pintadas**, las 4 nuevas en cabeza, **ninguna sin su detalle** (se comprobó cruzando `HABILIDADES_BASE` contra `HABILIDAD_DETALLE`, que es donde una tarjeta nueva se queda muda si se olvida), las 4 fotos cargando a **1920×1280** reales, y el detalle de "Persuadir" abriendo con sus 11 pasos. 0 desbordes y sin errores de consola.

## El panel que se abre al hacer clic, rediseñado (2026-08-23)

> *"es pagina del dashboard, mejora el diseño cuando hago click a cada una"* → tres direcciones en un canvas → *"me gusta el b, hazlo para todos al hacer click"*.

### Qué estaba mal

El panel era una **lista plana de hasta 11 pasos**, y con las habilidades sociales recién agregadas se notó:

- La foto se llevaba **340px de alto** antes de leer una sola palabra.
- El título de cada paso iba **pegado al texto**, en el mismo párrafo.
- El cuerpo era de **11.5px** — tamaño de dato, no de algo que te sientas a estudiar.
- La barra de progreso quedaba arriba del todo y **se perdía al bajar**.
- Con 11 pasos no había forma de saber **por dónde ibas** ni cuánto faltaba.

### Lo que hay ahora — dirección "Estudio"

De las tres direcciones que se dibujaron (**A · Ruta**, un recorrido con nodos; **B · Estudio**; **C · Fichas**, un acordeón), eligió la B.

| Antes | Ahora |
|---|---|
| Foto a 340px | Miniatura de 78px en la franja del título |
| Lista de 11 pasos | **Un paso a la vez**, a 15px |
| Sin saber dónde vas | **Temario** en columna, con el paso activo marcado y ✓ en los hechos |
| Barra que se perdía | Barra + `3/11` fijos en la cabecera |
| "Tu caso" como una viñeta más | **Caja propia en cian** — es lo único escrito para él, el resto es teoría del libro |
| Casilla por paso | Botón **"Marcar como dominado"** en el pie, con ‹ › al lado |

Detalles que salieron de probarlo, no del diseño:

- **Retoma donde te quedaste.** Al reabrir una habilidad a medias, arranca en el primer paso *pendiente*, no en el primero. Marcar tres pasos y volver te deja en el 4.
- **Marcar no te devuelve al principio.** Marcar repinta el panel entero; sin guardar el paso actual en `mdEstado`, cada check te tiraba al paso 1.
- **El temario se arrastra solo** hasta el paso activo — en el celular es una tira horizontal y el paso 9 quedaba fuera de vista.
- **Teclado**: ← → cambian de paso, Espacio marca. El recorrido es lineal, no hace falta el ratón.
- **Ancho de lectura de 72ch.** El panel mide 1280px: sin tope, un párrafo se estiraba a ~180 caracteres por línea (681px medidos ahora, ~1300 antes).

### Los tres sitios que lo usan

El mismo panel abre desde **Mis Metas**, **Habilidades Base** y la **barra de edad** — de ahí el *"hazlo para todos"*. Las tres funciones de apertura (`abrirMetaDetalle`, `abrirHabilidadDetalle`, `abrirEdadDetalle`) no cambiaron de firma; solo se les añadió el epígrafe que ahora encabeza el panel: *Corto y mediano plazo* / *Largo plazo* / *Lo que todo hombre debería saber* / *Tu año 31*.

El guardado es **el de siempre**: `mdMarcar()` llama por nombre a `toggleMetaChecklist` / `toggleHabilidadChecklist` / `toggleEdadChecklist`, que escriben en `metas_checklist_v1`, `habilidades_checklist_v1` y `edad_checklist_v1`. Ningún dato existente se migró ni se perdió.

### Dos errores que encontró el navegador

Ninguno de los dos se veía leyendo el código:

1. **El título salía blanco sobre fondo blanco** en tema claro. El `color:#fff` venía de cuando el título iba encima de la foto a sangre; en la franja nueva desaparecía. Lo mismo el cuerpo del paso, con un gris claro fijo (`#d8d9e4`) en vez de la variable del tema.
2. **El botón "Siguiente" con el texto fuera de su caja** en el celular: al reducir `.md-nav` a 34px aplasté también el `width:auto` de `.md-nav-next`.

También se subió la opacidad del panel al 94% (antes heredaba `--bar2`, al 55-60%): para un vistazo daba igual, pero aquí se leen párrafos y las fotos del slide de atrás se colaban bajo el texto.

### Limpieza

Se retiró el código del diseño anterior, que ya no genera nada: **41 líneas** entre el CSS del checklist plano (`.meta-detail-step*`, 24), las imágenes del paso viejo, la barra de progreso vieja, `.meta-detail-body` y la función `pasoLinkHtml()`. Los dos comentarios que describían ese diseño se reescribieron para contar el actual en vez de quedarse mintiendo.

### Verificación

Escritorio (1500px), iPad (820px) y iPhone (390px), en **los dos temas**:

- Las **tres entradas** abren: Mis Metas (9 metas recorridas, con la barra 💰 de BYD y Maestría intacta), Habilidades Base y la barra de edad.
- Marcar **guarda en `localStorage`** y la barra de la tarjeta de atrás se actualiza (3/11 → 27%).
- **6 cajas "Tu caso"** en los 11 pasos de Persuadir, y **ninguna** quedó suelta como viñeta.
- **0 desbordes** de la página; los del temario son su scroll horizontal, a propósito.
- Los 8 slides recorridos sin un solo error de consola.

## Las 4 habilidades sociales, ahora completas (2026-08-23)

> *"estas 4 no tienen informacion suficiente, debe estar muy muy completa, con info que me pueda ayudar y ser muy util"*

Tenía razón: con el panel nuevo cabía mucho más de lo que había. Pasaron de **32 pasos y ~2,900 palabras** a **67 pasos y 10,100 palabras**.

| Habilidad | Antes | Ahora |
|---|---|---|
| 🤝 Hacer networking de verdad | 8 pasos | **20** |
| 🎯 Persuadir sin manipular | 11 pasos | **18** |
| 💬 Relacionarte con las personas | 6 pasos | **14** |
| 🌱 Sacarle lo mejor a una persona | 7 pasos | **15** |

### Qué se añadió, no solo cuánto

Lo que faltaba no era volumen, era **lo accionable**: qué decir, cuándo, y qué hacer esta semana.

**Networking** — se añadió el mito del extrovertido (Susan Cain), la fuerza de los vínculos débiles de Granovetter (por qué el trabajo remoto no va a salir de sus amigos de CDMX), su inventario de qué tiene él para dar, la presentación de 20 segundos con la versión mala y la buena, cómo entrar en un grupo que ya está hablando, cómo salir sin quedar mal, la plantilla exacta del mensaje de 48 horas, los 5 tipos de ping, LinkedIn para reclutadores de fuera, cómo presentar a dos personas (double opt-in), los 5 errores que matan una red y **un plan de 90 días** con la semana en que va cada cosa.

**Persuadir** — cada uno de los 7 principios pasó a tener paso propio con su experimento (los caramelos del camarero, las toallas del hotel, el frasco de galletas, la calcomanía del jardín), un paso entero sobre **la diferencia real entre influir y manipular** con la prueba de las tres preguntas, las 4 herramientas de Voss desglosadas una por paso, una semana de ejercicios día por día, y un paso sobre **cómo defenderte cuando te los aplican a ti** — con la regla que le sirve directo: *ninguna buena decisión financiera necesita tomarse hoy*.

**Relacionarte** — los tres niveles de escucha, cómo recordar nombres sin buena memoria (repetir → asociar → anotar el mismo día), cómo criticar sin romper nada (incluido por qué el "pero" borra todo lo que va antes), **cómo pedir perdón de verdad** con las cuatro partes obligatorias y las tres disculpas falsas, y cómo mantener las relaciones que ya tiene — que es lo difícil y de lo que nadie habla.

**Sacarle lo mejor** — el efecto Golem además del Pigmalión, un paso para revisar **qué espera él de cada persona** antes de aplicar nada, las 7 preguntas de *The Coaching Habit*, aguantar el silencio (contar hasta siete), cómo dar feedback sin que el otro se cierre y por qué el sándwich está desacreditado, elogiar el esfuerzo y no el talento (Dweck), y el triaje de **¿no sabe, no puede o no quiere?** — que es donde se pierde a la gente buena tratando un problema del sistema como si fuera de actitud.

Las cuatro cierran con **📚 qué leer y en qué orden**, con la edición en español cuando existe, y con el paso "✅ Ya lo dominas cuando…" reforzado a cuatro criterios comprobables.

### Las cajas de "Tu caso" y "Plantilla"

`pintarDetailOverlay()` ya sacaba de la lista los ítems que empiezan por *Tu caso* para darles su caja en cian. Se generalizó a **cualquier etiqueta accionable** — `Tu caso`, `Tu caso concreto`, `Plantilla…`, `Ejemplo…` — porque el mensaje de las 48 horas, que es literalmente para copiar y pegar, estaba perdido como una viñeta más. Son **10 cajas** repartidas en las cuatro; se recorrieron las **23 habilidades completas** para confirmar que no aparece ninguna caja donde no toca.

### Un fallo que solo apareció con el contenido largo

**El pie con "Marcar" y ‹ › se salía de la pantalla en el celular.** `.md-main` tenía `min-width:0` pero no `min-height:0`; en la columna del móvil crecía con su contenido en vez de dejar que `.md-paso` hiciera scroll, y empujaba las acciones fuera. Con 8 pasos cortos no se notaba; con 20 pasos largos, sí. Comprobado ahora en los 67 pasos a 1500, 820, 390 y 360px: el pie siempre visible.

De paso, el botón mostraba *"Marcar como domin…"* cortado en el celular: por debajo de 600px dice **"Marcar"**, y se repinta al girar el teléfono.

### Verificación

- **67 pasos recorridos uno por uno** en las 4 habilidades: ninguno vacío, todos con su lista, ninguna etiqueta HTML cruda.
- **10,104 palabras** medidas en el DOM, no en el archivo.
- Las **23 habilidades** abiertas completas sin un error de consola.
- El temario con 20 entradas hace scroll y **el paso activo siempre queda a la vista**.
- Marcar sigue guardando en `habilidades_checklist_v1` y actualizando la barra de la tarjeta.

## Las otras 19 habilidades, al mismo nivel (2026-08-23)

> *"haz lo mismo para las demas"*

Después de ampliar las 4 sociales, las otras 19 quedaron a **1,381 palabras de media contra 2,532**, y muchas tenían solo 4 pasos. Ahora las 23 están al mismo nivel: **322 pasos en total** (antes 150) y **45,500 palabras** (antes 36,400).

| Habilidad | Antes | Ahora | | Habilidad | Antes | Ahora |
|---|---|---|---|---|---|---|
| 💰 Dinero | 4 | **18** | | 🔧 Mecánica | 8 | **13** |
| 🚫 Decir que no | 4 | **16** | | 🪢 Nudos | 10 | **13** |
| 🧘 Recuperarte | 4 | **16** | | 🍳 Cocinar | 6 | **13** |
| 🍷 Vino | 4 | **14** | | 🍽️ Modales | 4 | **13** |
| 🧭 Brújula | 4 | **14** | | 🥃 Coctelería | 4 | **13** |
| 🧘 Meditar | 7 | **14** | | 🥊 Pelear | 4 | **12** |
| 🩹 Primeros auxilios | 8 | **12** | | 🏊 Nadar | 5 | **12** |
| 🥩 Asado | 6 | **13** | | 🚗 Manejar | 5 | **11** |
| 🔥 Fogata | 4 | **14** | | 🔨 Reparaciones | 6 | **11** |
| 🎯 Armas | 4 | **13** | | | | |

### El problema no era la longitud, era la forma

Casi todas tenían el mismo defecto: **4 "Fases" gigantes con listas de 8 a 10 viñetas cada una**. Con el panel viejo daba igual —era una lista plana de todas formas—, pero con el diseño "Estudio" un paso es una pantalla de lectura, y una fase con diez viñetas es ilegible. Se desglosaron en pasos temáticos: un paso, una idea.

### Qué se añadió de verdad

No es relleno. Lo que faltaba era lo mismo en todas: **el porqué, los errores concretos y qué hacer esta semana**.

- **💰 Dinero** (la de su meta de $1M) — las tres formas de generar y el techo de cada una, subir el precio antes que las horas, el fondo de emergencia antes de invertir, avalancha contra bola de nieve, por qué los MSI no son dinero gratis, el número del interés compuesto, los instrumentos mexicanos uno por uno (CETES, Udibonos, ETF vía GBM, Afore), **impuestos y RESICO** al pasar de sueldo a ingreso propio, cómo detectar un fraude, y una revisión mensual de 20 minutos en 5 preguntas.
- **🚫 Decir que no** — los tres miedos que lo hacen difícil, la fórmula de tres partes, decir el "no" al principio y no al final, las tres muletillas que lo convierten en un quizá, el disco rayado, **el caso de la familia mexicana**, cómo negarse en el trabajo priorizando en vez de negando, y decirte que no a ti mismo.
- **🧘 Recuperarte** — su dato real (5h40–6h40) y qué significa, las cuatro palancas del sueño en orden de impacto, la cuenta de la cafeína (un café a las 4 pm sigue actuando a las 10), por qué el alcohol no es un somnífero, dolor normal contra señal de alarma, y las señales tempranas de quemarse.
- **🍷 Vino** — las 5 uvas que resuelven cualquier carta, catar en 4 pasos, **la temperatura como error número uno**, descorchar, decantar, maridar (incluido que el picante rompe el tinto), vino mexicano, cómo pedirlo en un restaurante y cómo reconocer uno picado.
- **🥃 Coctelería** — la ecuación fuerte + ácido + dulce, agitar contra revolver y por qué, jarabe natural, y cinco clásicos con su plantilla exacta.
- **🍽️ Modales** — la regla que ordena todo (que el otro esté cómodo), la mesa, los dos códigos de cubiertos, ser buen invitado y buen anfitrión, brindar, y **lo que cambia en Alemania**.
- **🥊 Pelear** — la jerarquía evitar → desescalar → escapar → pelear, los códigos de color de Cooper, desescalar con la voz, qué disciplina entrenar, y **la legítima defensa en México** con el riesgo real para su visa.
- **🎯 Armas** — el marco legal mexicano completo (SEDENA, UCAM, poseer contra portar), las cuatro reglas de seguridad, fundamentos de puntería, limpieza, y la ética.
- **🚗 Manejar** — manejo defensivo, **manejar estándar paso a paso** (para Alemania), lo específico de su eléctrico, aquaplaning y ABS, y qué hacer tras un accidente.
- **🏊 Nadar**, **🔥 Fogata**, **🧭 Brújula**, **🍳 Cocinar**, **🥩 Asado**, **🔨 Reparaciones**, **🧘 Meditar** — todas reestructuradas con el mismo criterio.
- **🔧 Mecánica**, **🩹 Primeros auxilios**, **🪢 Nudos** — estas tres **no se reescribieron**: ya tenían un paso por tema con su imagen verificada. Se les añadieron pasos alrededor (seguridad de la escena y protocolo, qué llevar siempre en el coche, lo específico del eléctrico, lo legal de auxiliar en México, cuidar la cuerda, cómo practicar).

Cada una cierra con **📚 qué leer** cuando el tema tiene bibliografía real, y todas conservan su paso "✅ Ya lo dominas cuando…" con criterios comprobables.

### Verificación

- Las **23 habilidades** abiertas y sus **322 pasos recorridos uno por uno**: ninguno sin título, ninguno con descripción vacía, ninguna etiqueta HTML cruda, y el último paso de cada una sigue siendo "Ya lo dominas".
- **44 imágenes** en pasos conservadas — ninguna se perdió al reescribir.
- El pie del panel visible en los 322 pasos a **1500, 820, 390 y 360px**.
- **Sin errores de consola**, y el rendimiento intacto: primer texto en pantalla ~1.0 s, abrir el panel de la habilidad más larga (20 pasos) **36 ms**.

## "Saber meditar" salía estirada a lo ancho (2026-08-23)

> *"la de meditar hazla pequeña como los demas"*

La tarjeta medía **1208px contra los 298px** de las otras 22: ocupaba las cuatro columnas ella sola.

No era nada del contenido de meditar. Era esta regla:

```css
.img-goal-cell:last-child:nth-child(odd){grid-column:1/-1}
```

Está pensada para el grid de **2 columnas** de Mis Metas: si hay un número impar de tarjetas, la última queda sola en su fila y se estira para llenarla, que ahí es lo correcto. Pero el mismo selector alcanzaba al grid de **4 columnas** de Habilidades Base, donde las 23 tarjetas hacen que la 23ª sea impar — y "Saber meditar", que es la última del array, se iba a lo ancho completo.

Ahora la regla está acotada al grid que la necesita:

```css
.img-goal-grid:not(.img-goal-grid-4col)>.img-goal-cell:last-child:nth-child(odd){grid-column:1/-1}
```

En el de 4 columnas la fila incompleta simplemente deja hueco, que es el comportamiento correcto.

### Verificación

- Las **23 tarjetas miden lo mismo** (298px) a 1500px, y los tres grids —2 columnas, `-sm` y 4 columnas— quedan uniformes también a 820 y 390px.
- **La regla sigue viva donde sí hace falta**: con 9 tarjetas simuladas en Mis Metas, la novena llena la fila (363 y 731px). Con 24 en Habilidades, todas siguen iguales.

## La cinta del día sustituye a la lista con scroll (2026-08-23)

> *"el diseño tal cual como lo tenemos, me gusta, pero propuestas que me hiciste me gustaron mas y vamos a probar. Arriba de las tarjetas donde estan las imagenes de los ejercicios de los dias de la semana, arriba quiero que pongas esta barra que me propusiste y quitando toda la lista del scroll donde muestras toda mi rutina, entonces esa barra que me propusiste quiero que al tocar cada seccion me des mas detalles acerca de esa seccion"*

De las cuatro direcciones que se dibujaron en el lienzo, eligió la **A · El día en una cinta** — y solo esa pieza: el resto de Mi Día se queda como estaba.

### Qué cambió

**Se fue** `#diaTimeline`, la lista de 17 a 26 tarjetas con scroll que ocupaba la mitad inferior de la pantalla. Con 26 bloques entre semana se cortaba a mitad del día y había que scrollear para ver el resto.

**Llegó** `#cintaDia`, encima de la tira semanal: el día entero en una barra horizontal. Cada tramo es un bloque real de `RUTINA_TASKS`, con **ancho proporcional a su duración** y el color de su categoría (el mismo `CAT_META` de la píldora de siempre). La cabecera lleva el rango del día, cuántos bloques van hechos y cuánto queda; el marcador verde es la hora actual.

De paso, la cinta muestra algo que la lista escondía: **los dos bloques de Didi son más de la mitad del día despierto.**

**Al tocar un tramo**, su detalle se pinta abajo, en `#diaBloque`, donde estaba la lista: categoría, rango y duración, el título completo, las subtareas marcables (las mismas de siempre, con sus enlaces a Mercado Libre) y los botones de marcar. Las flechas ‹ › recorren el día bloque a bloque, que es como se navega en el celular, donde un tramo de 11px es difícil de acertar.

`cintaSel` guarda qué bloque estás mirando: **en `null` sigue al bloque actual**, que es lo que quieres al abrir el Dashboard. En cuanto tocas otro se queda ahí, con un botón "● Volver a ahora", y se resetea al cambiar de día en la tira semanal.

### Decisiones que salieron de probarlo

- **El detalle no hereda el `flex:1` de la lista.** Con un bloque de 20 minutos sin subtareas quedaba una tarjeta enorme y vacía. Ahora crece con su contenido, con `min-height:158px` para que no dé un salto al pasar de un bloque con subtareas a uno sin ellas.
- **Estirar la fila secundaria para llenar el hueco fue peor**: "Importante este mes" y "Hoy toca" no tienen contenido para tanto alto. El slide simplemente termina antes.
- **El `gap` entre tramos se fue.** Con 26 bloques, los 25 huecos de 2px suman 50px y la cinta se salía 3px en el celular. El separador pasó a ser un `border-right` dentro de cada tramo, que con `box-sizing:border-box` no ocupa ancho extra.
- **`marcarBloque()`** es nuevo: marca cualquier bloque, no solo el actual, y escribe sobre **el día que estás viendo**, no siempre sobre hoy. `quickMarkDone()` sigue existiendo para el botón de "Ahora mismo".
- El acceso a **GBM no se perdió** al quitar la lista: vive en el botón "Qué invertir hoy", que no se tocó.

### Limpieza

Se retiraron **16 reglas CSS** de la lista larga: la línea conectora (`#diaTimeline::before`, que se medía en JS), `.rt2-card` y todas sus partes, y las tres de `.rt2-gbm`. `.rt2-cat` y `.rt2-sub*` se quedan — los usa el detalle nuevo.

### Verificación

En escritorio (1500px), iPad (820px, tema claro) y iPhone (390px), más un celular de 360px:

- **Los 17 tramos del domingo recorridos uno por uno**: todos pintan su detalle, ninguno sin título.
- El peor caso, **el lunes con 26 bloques**: cabe entero sin desbordar en los cuatro anchos (el tramo más fino, 11px).
- Las flechas llegan del primer al último bloque y se deshabilitan en los extremos.
- Marcar guarda en `coach_rutina_v1`, la cabecera pasa de 0 a 1 y el tramo se raya.
- Cambiar de día repinta la cinta (25 tramos el miércoles) y vuelve al bloque activo de ese día.
- **0 desbordes y sin errores de consola.**

## "Ahora mismo" y el detalle del bloque son ya un solo panel (2026-08-23)

> *"hay 2 bloques muy similares y solo quiero uno, en ahora mismo quiero que muestres lo que pusiste abajo, es decir cuando en la barra haga click en ahora mismo ahi debe de mostrarme la seccion que hice click, y el otro bloque debe desaparecer, pero tambien el ahora mismo debe funcionar mostrando la actividad que toca en la hora que estamos"*

Tenía razón: al meter la cinta quedaron dos tarjetas casi idénticas — "Ahora mismo" arriba y el detalle del tramo tocado abajo. Ahora hay una.

**`#diaAhoraTile` es el panel único.** Lo pinta `pintarBloqueDetalle()`, y funciona en los dos modos que pidió:

- **Sin tocar nada** muestra la actividad de la hora actual, con el punto verde pulsante y la etiqueta "Ahora mismo" de siempre.
- **Al tocar un tramo** de la cinta muestra ese bloque: la etiqueta cambia a "Bloque del día", desaparece el punto pulsante y aparece "● Volver a ahora".

El acento de color a la izquierda y el halo siguen la categoría del bloque mostrado, igual que hacía "Ahora mismo" desde agosto. Se conservan las subtareas marcables, el botón de marcar, el contador (*7 de 17*) y las flechas ‹ ›.

### El reloj ya no repinta cada segundo

`tickClock()` llamaba a `pintarAhora()` + `updateMarkDoneBtn()` **60 veces por minuto**. Con el panel viejo daba igual —solo mostraba el bloque activo—, pero con el panel unificado eso te quitaría de debajo del cursor el tramo que acabas de tocar.

Ahora el reloj:
- **Repinta entero solo cuando el bloque activo CAMBIA de verdad** (`_ultimoBloqueActivo`), unas 17 a 26 veces al día en vez de 86,400.
- **Mueve la línea verde de "ahora"** cada segundo con `moverMarcadorCinta()`, que solo toca el `left` de un div — la cinta publica su rango en `data-ini`/`data-fin` al construirse.

Comprobado: con un tramo tocado, el panel sigue mostrándolo tras 3 segundos de reloj.

### Un detalle que solo se ve navegando

Viendo **otro día** de la tira semanal, el panel decía "Ahora mismo" — pero ese día no es hoy, y lo que muestra es *lo que tocaría a esa hora ese día*. Ahora la etiqueta dice **"A esta hora, ese día"** y el botón de volver a ahora no aparece, porque no aplica.

### Lo que se fue

`pintarAhora()`, `updateMarkDoneBtn()`, el `<div id="diaBloque">` de abajo y el markup interno de `#diaAhoraTile` (`#diaAhora`, `#diaAhoraCat`, `#diaAhoraTime`, `#diaAhoraBtn`). `quickMarkDone()` se queda por si vuelve a hacer falta un marcado directo. El botón **"Qué invertir hoy" no se tocó**: sigue a la derecha del panel.

### El espacio que sobró

Al fusionar los dos bloques quedaban ~350px libres. Van a la fila de abajo con un tope de 430px: **"Ideas para hoy" deja de cortar la lista de recetas** sin que las otras dos tarjetas queden absurdamente vacías. En tablet y celular el tope se anula (`@media(max-width:1024px)`), porque ahí las tres se apilan en una columna y 430px no les alcanzan.

### Verificación

Escritorio (1500px), iPad (820px, tema claro) e iPhone (390px):

- Los **17 tramos del domingo tocados uno por uno**: cada uno pinta su bloque y **siempre hay un solo panel** en pantalla.
- Marcar desde el panel guarda en `coach_rutina_v1`, sube el contador de la cinta y raya el tramo.
- Tras **3 segundos de reloj**, el bloque tocado sigue en pantalla.
- Cambiar de día muestra "A esta hora, ese día"; al volver, "Ahora mismo".
- **0 desbordes horizontales** en los cuatro anchos, los 8 slides recorridos y sin errores de consola.

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

## Duración propia para los bloques que caben dentro de otro (2026-08-23)

> *"esta seccion, solamente dura 20 min y no 4 hrs, por que despues de los 20 min, ya continuo mi jornada laboral en ALTEN"*

La duración se calculaba **siempre** como "hasta el bloque siguiente". Eso vale para una rutina en fila, pero falla cuando un bloque es un **paréntesis dentro de otro**: la Bolsa GBM son 20 minutos a media jornada de ALTEN, y el panel decía **09:00 – 13:00 · 4h**, que son las horas hasta el siguiente bloque de la lista.

Ahora una tarea puede traer **`dur:<minutos>`** y esa cifra manda sobre el cálculo:

| Bloque | Antes | Ahora |
|---|---|---|
| 💰 Bolsa GBM | 09:00 – 13:00 · 4h | **09:00 – 09:20 · 20m** |
| 🏢 ALTEN (mañana) | 08:30 – 09:00 · 30m | **08:30 – 13:00 · 4h 30m** |

ALTEN tenía el mismo problema al revés: su tramo se cortaba en GBM y decía 30 minutos, cuando esa parte de la jornada va hasta la comida de las 13:00.

### En la cinta

El tramo de GBM mide lo que dura — **2.3% del día**, 28px de 1230 — y el tiempo restante se pinta como **continuación de lo que lo envuelve**: mismo color que ALTEN, más apagado y sin texto, porque no es un bloque propio sino lo que sigue corriendo debajo. Al tocarlo se abre ALTEN.

### Se buscaron más casos

Se recorrieron los 7 días comparando la duración calculada contra la que declara el texto de cada bloque. **GBM era el único caso real**; los otros tres que saltaron eran falsos positivos del detector (leía "4h 45m" como "4h").

De paso: la última marca de hora de la cinta mostraba **"24:29"** entre semana — el último bloque es a las 23:59 y la cola de 30 minutos se pasaba de la medianoche.

### Verificación

- **142 tramos** recorridos (los 7 días × 3 tamaños de pantalla): **ningún fallo** de duración ni de contenido.
- **Ninguna hora inválida** en las marcas de la cinta, en ninguno de los siete días.
- 0 desbordes a 1500, 820 y 390px, y sin errores de consola.
- `dur` está también en `Coach_v2.html`, que lleva la otra copia del horario.

## Cierre del día en un bloque, y la tarde entra al CENLEX (2026-08-23)

> *"el bloque de lectura y Diario del día (5 min) y el de Planear el día de mañana (5 min), esto hazlo en uno mismo e igualmente haz bloques divisorios. Ademas entre semana mi jornada laboral deberia terminar 4:40 debido a que ya entre a mis clases de aleman y de 4:40 manejo al cenlex santo tomas y de 5:00 pm a 6 pm ya son mis clases de aleman, entonces elimina lo que ocupaba ese espacio y acomoda lo demas"*

### 1 · 📓 Cierre del día — lectura, diario y plan de mañana

**7 bloques pasaron a 1**: la lectura estaba repetida cinco veces (`l1`…`l5`, un bloque idéntico por día), más el diario y el plan de mañana. Ahora es uno solo, **21:45 – 22:30 · 45 min**, con sus tres divisores:

**LECTURA** ──── · **DIARIO DEL DÍA** ──── · **PLAN DE MAÑANA** ────

El plan de mañana estaba **después** de la rutina de la noche (22:55); al entrar aquí, la rutina de la noche pasa a durar 30 minutos en vez de 25 y la meditación de las 23:00 no se mueve.

La lectura pasa a ser una subtarea con id propio (`wd-lect`), así que su histórico anterior queda en los ids viejos — es lo único que no se arrastra en todo este cambio.

### 2 · La tarde, con las clases de alemán

| Hora | Bloque |
|---|---|
| 13:40 – **16:40** | 🏢 ALTEN — de vuelta a la jornada (ahora con `dur:180`) |
| **16:40** | 🚗 Manejar al CENLEX Santo Tomás (~20 min) |
| **17:00 – 18:00** | 🇩🇪 Clase de alemán — CENLEX Santo Tomás |
| **18:00** | 🚗 Del CENLEX al gimnasio (~15 min) |
| 18:15 | 🏋️ Ejercicio (antes 17:40) |
| 19:05 | 🚿 Ducha post-ejercicio (antes 18:30) |
| 19:30 | 🚗 Didi — sesión corta de la noche (antes 19:20) |
| 20:00 | 🎯 Prioridad de Fase 0 — **sin cambios** |

**Se eliminó** `wd08` — *"🚗 Didi — 1 pasajero a Buenavista (~40 min)"*, a las 17:00 —, que era exactamente lo que ocupaba el hueco de las clases.

Todo lo posterior a las 20:00 queda igual: solo se corrieron el ejercicio, la ducha y el Didi de la noche, y el bloque de las 20:00 vuelve a caer en su hora.

**El traslado del CENLEX al gimnasio son 15 minutos estimados** — es el único dato que no salía de la rutina existente. Si tardas más o si entrenas en otro sitio ahora, se ajusta.

También se corrigieron los textos que quedaban mintiendo: *"entras 08:30, sales 17:00"* → *"sales 16:40"*, y el bloque de la tarde ahora dice *"(hasta las 16:40)"*.

### El aviso de "Rutina del Lunes"

Vivía encima de la lista con scroll; al quitarla quedó suelto al final del slide, **encima de otras tarjetas**. Ahora va junto a la cinta, que es lo que cambia cuando navegas a otro día — y sigue desapareciendo al volver a hoy.

### Verificación

- **142 tramos** recorridos (los 7 días × 3 tamaños): ningún fallo de duración ni de contenido, ninguna hora inválida, **0 desbordes**.
- El aviso de día **no solapa con ninguna tarjeta** a 1500, 820 ni 390px.
- **Ninguna subtarea perdida**: 84 antes, 85 ahora — la nueva es la lectura.
- `RUTINA_TASKS` queda en **58 tareas**, replicado en Coach y Dashboard, sin errores de consola en ninguna.

## El bloque de ejercicio lee la rutina real, con imágenes (2026-08-23)

> *"cuando sea el tiempo de ejercicio, veo que esta mal, los ejercicios correctos son los que tienen imagenes, los del bloque de abajo, pero eso debe mostrarse en el bloque de ahora mismo, ademas igual mostrar imagenes, tiene que tener la misma informacion"*

**Los bloques de ejercicio de `RUTINA_TASKS` estaban desfasados.** Traían su propia lista escrita a mano:

| Día | El bloque decía | La rutina real es |
|---|---|---|
| Lunes | Empuje — press de banca, press militar… | **Brazos A — bíceps + tríceps** (Fondos, Curl con Barra…) |
| Martes | Cardio + core | **Piernas — completa** |
| Jueves | Cardio / HIIT | **Brazos B — bíceps + tríceps** |
| Viernes | Piernas / glúteo | **Abdomen — core + cardio** |

Ahora esos bloques **no guardan ejercicios**: leen `D.gym.rutina` (`mirutina_v1`), la misma fuente que el panel de abajo, y muestran nombre, series, peso, el consejo de cada ejercicio y **su imagen** (de `EJ_LOOKUP`: 30 de los 42 ejercicios tienen). Clic en la foto o en el nombre abre el visor grande que ya existía.

El título del bloque también sale de ahí (`gym:true` → `tituloBloque()`), así que la cinta y el panel dicen *"Brazos A — Bíceps + Tríceps"*, no el nombre viejo.

De paso se corrigió el **dato** en los dos archivos: los bloques de gym perdieron sus listas obsoletas y su título ahora coincide con la rutina real, para que **Coach** —que muestra el mismo array y no lee `mirutina_v1`— deje de enseñar ejercicios que no hace.

### El panel de un bloque fijo

> *"los bloques de alten entre semana en la mañana visualmente al hacer click no se ve bien, parece que esta mal algo, pero los tiempos que abarcan son correctos"*

Los tiempos estaban bien; lo que fallaba era el hueco. Un bloque fijo no tiene botón de marcar ni subtareas, así que el panel quedaba con **las flechas descolgadas sobre un vacío**. Ahora esos bloques llevan una nota: *"Este bloque no se marca: es horario fijo."* — el panel pasa de 141px con hueco a 172px con contenido.

### Verificación

- **Los 7 días comparados uno a uno** contra el panel de abajo: la lista de ejercicios **coincide exactamente** en los siete, incluido el domingo (descanso activo, con su nota en vez de lista).
- Las **5 imágenes del lunes cargan de verdad** (`naturalWidth > 0`), no solo el `<img>`.
- 142 tramos recorridos a 1500, 820 y 390px: ningún fallo, ninguna hora inválida, **0 desbordes**.
- Sin errores de consola en Dashboard ni en Coach.

## La cinta de Mi Día pasó a riel + fichas (2026-08-23)

Adán, sobre la barra que se había estrenado esa misma mañana: *"de la primer pagina del dashboard, me puedes dar mejores diseños de la barra de la rutina?"*. Se le propusieron cuatro y eligió la tercera: *"me gusto la opcion del c, riel mas fichas"*.

### Por qué la barra anterior no daba más de sí

El problema no era de estilo, era de escala, y se midió sobre el lunes real (23 bloques entre las 06:40 y las 23:59):

- **14 de los 23 bloques miden menos de 45 minutos**, que era justo el umbral que `pintarCintaDia()` exigía para escribir el nombre dentro del tramo. O sea: en la mayoría del día la barra era color sin texto.
- Un bloque de 10 minutos ocupaba **11px** — el `min-width` que tenía — imposible de acertar con el dedo.
- **ALTEN entraba partido en tres trozos** (30 min + 220 apagados + 180) porque los 20 min de GBM lo interrumpen, así que las 8h 10m de jornada no se leían como un bloque.
- Lo cumplido se rellenaba al 20% con hachura diagonal, así que **lo hecho parecía lo desactivado**.

### La solución: dos piezas con un trabajo cada una

- **El riel** (`.cinta`, 11px de alto) es el mapa: proporción real del día y la línea verde de "ahora". Sin texto — a 45 minutos un tramo mide 40px y nunca cupo un nombre.
- **Las fichas** (`.cinta-fic`) son lo que se toca: **60px de alto y un ancho que depende de la duración** (`anchoFicha()`, ver abajo), con hora, nombre completo y duración. Muy por encima del mínimo de 44px para el pulgar. Se deslizan con las flechas ‹ › (`cintaScroll()`) y la ficha activa se centra sola al repintar (`centrarFichaActiva()`, con `scrollLeft` a mano y **no** `scrollIntoView()`, que arrastraría el scroll del carrusel entero).

Se invirtió el contraste: **hecho = encendido, pendiente = apagado**.

### Las fichas dejaron de medir todas lo mismo (2026-08-24)

*"abajo de la barra de actividades todas las cajas tienen el mismo tamaño y eso no debería ser"*.

Las fichas nacieron a 148px fijos porque su trabajo era ser tocables, y la proporción se la dejaban entera al riel. El efecto secundario: en la fila, los **20 minutos de GBM** y las **8h 10m de ALTEN** ocupaban exactamente el mismo espacio, así que la fila contradecía al riel que tiene justo encima.

Ahora el ancho lo pone `anchoFicha(mins)` y viaja al CSS como la variable `--fw` (`.cinta-fic{width:var(--fw,148px)}`; la **altura sigue fija** a 60px, para que la fila quede a ras). La escala es de **raíz cuadrada, no regla de tres**: en el mismo carril conviven bloques de 10 min y de 5 h, y en proporción directa el largo mediría 30 veces el corto — se comería la fila y los cortos caerían por debajo del mínimo tocable.

| Duración | 10-30 min | 45 min | 1 h | 1 h 30 | 2 h | 3 h | 4 h | 5 h |
|---|---|---|---|---|---|---|---|---|
| Ancho | 104px | 127px | 147px | 180px | 208px | 255px | 294px | 300px |

El **suelo de 104px** es lo que necesita la fila de arriba para que la hora y la duración no se pisen; el **techo de 300px** evita que una sola ficha tape a todas sus vecinas. En móvil (`max-width:700px`) la media query ya no fija `width` — eso aplastaba la proporción —, solo sube el suelo a `min-width:132px`, porque el pulgar necesita más blanco que el cursor.

No contradice a **`.coach-ruta-band`**, cuyos tres pasos sí miden lo mismo entre sí: aquellos son hitos de una secuencia y estos son magnitudes comparables. Es el mismo criterio aplicado a los dos casos.

### El verde es "ahora", y solo eso

Segunda pasada, tras verlo funcionando: *"no me queda claro que esta sucediendo ahora mismo, entonces cuando pase eso ponlo de verde futurista como transparente todo ese"*.

Antes la ficha activa se pintaba con el color de **su categoría** — amarillo si era un bloque profundo, rojo si era de salud — exactamente igual que la ficha que solo estabas mirando. Al tocar otra, la de "ahora" perdía su marca. Ahora hay tres estados excluyentes y en este orden: `.ahora` (verde) gana sobre `.sel` (color de categoría) gana sobre `.hecho` (apagado). El verde se propaga a las tres piezas: el tramo del riel, la ficha, y el acento del panel "Ahora mismo" (`pintarBloqueDetalle()` lee `--g` de la variable, no a mano, para que siga funcionando en tema claro).

### La tira de 7 días subió y adelgazó

*"quiero que los dias de la semana esten abajo de la frase y del reloj, y arriba de la barra de la rutina, pero quiero que esos iconos de los dias con las imagenes, hazlas mas peque;as a lo alto"*.

Tiene sentido de lectura: primero eliges el día, luego ves el día que elegiste. Al bajar de ~106px a **66px** hubo que cambiar la anatomía de la tarjeta: antes era encabezado arriba + franja de foto abajo; ahora la foto es el fondo de toda la tarjeta (`.ws-gym-photo` en `position:absolute`) y el texto va encima. Partida en dos, la foto quedaba en ~40px y el degradado se la comía entera; por eso el degradado también se aclaró arriba (`.26` en vez de transparente).

### Fuera el gym y el recetario, entran tres tarjetas nuevas

*"para no repetir lo del gym, muestrame mas cosas"*. La rutina del día salía **tres veces en la misma pantalla**: la tira de 7 días, la ficha de las 18:15 y su propia tarjeta. El recetario era un catálogo de 28 recetas para hojear, no algo que haga falta al abrir el día. `renderHeroGymPanel()` y `renderHeroNutri()` **siguen en el archivo** con su guarda `if(!el)return`: devolverlas es volver a poner sus dos `<div>`.

Las tres nuevas leen fuentes que ya existían, ninguna calcula nada por su cuenta:

| Tarjeta | De dónde sale |
|---|---|
| 💰 Tu dinero | `pasoInversionHoy()` → `finanzasmx_v2` — la misma función del botón "Qué invertir hoy" |
| 🎯 Fase | `activePhase()` y `PHASES[].semanas`, como el slide de Coach |
| 🎓 Hoy aprendes | `alemanTemaHoy()` y `entrevistaTemaHoy()`, las mismas que pintan sus slides |

La tercera se repinta desde `alemanSiguiente()`/`entrevistaSiguiente()`: sin eso, avanzar de lección en el slide de Alemán dejaba la tarjeta de Mi Día mostrando la anterior.

### Dos errores propios, encontrados midiendo

La primera versión se entregó sin medir geometría y tenía dos fallos que se vieron en cuanto se cargó la página en Chrome:

- **Las 14 fichas del día tenían el texto encimado.** La duración estaba en `position:absolute` abajo a la derecha, pero en 60px de alto no caben dos líneas de título más una tercera flotando. Se movió a la misma fila de la hora (`.cinta-fic-top`). Solapamientos medidos: **14 → 0**.
- **Las cuatro tarjetas de abajo estaban medio vacías.** Llevaban `flex:1` y `max-height:430px` con un contenido que mide entre 117 y 213px: **217px de hueco muerto** dentro de cada una. Quitado el alto forzado, la fila mide su contenido. Hueco: **217px → 14px**; la fila bajó de 430 a **227px**.

Además, `.g4` reparte con `repeat(4,1fr)`, y con `1fr` el mínimo de cada columna es su propio contenido: el título largo de la fase ensanchaba su columna y estrechaba las otras tres. `#miDiaSecundarios` lo sobreescribe con `repeat(4,minmax(0,1fr))` y gap fijo de 12px (el `clamp` general se abre a 20px en 1440). Las cuatro miden ahora **331px exactos, mismo top y mismo alto**.

### Verificación

Cargado en Chrome headless, no solo validando sintaxis: **13 de 13 comprobaciones** (las tres tarjetas con su contenido real, 7 días con sus 7 fotos, riel con tramos, una ficha por bloque, flechas, panel "Ahora mismo", y la tira **antes** de la cinta en el orden del DOM) y **0 errores de JavaScript** al cargar. En la corrida real la ficha verde salió en `AHORA · 14:40 🚗 Didi — bloque de tarde-noche`, con su tramo verde en el riel y el panel en `rgb(0, 232, 122)`.

## El Plan Maestro pasó a tablero de tres columnas (2026-08-23)

*"ahora ayudame a mejorar el diseño de la segunda pagina del dashboard"*. Se propusieron tres direcciones y eligió la tercera: *"la opcion c me gussto, hazla"*.

### Lo que estaba mal, medido antes de tocar nada

- **No cabía en pantalla**: el `.slide-inner` necesitaba **1092px** de alto contra 1000 de ventana, y lo que se cortaba por arriba era justo el título de la fase.
- **Todo en una columna a ancho completo.** En 1600px de pantalla sobraba media, mientras el contenido se apilaba hacia abajo.
- **Dos muros de texto seguidos**: el párrafo de `explica` (4 líneas a ancho completo) y las 8 tareas del mes, todas con el mismo peso visual — las dos que de verdad importan, "Prioridad 1" y "Prioridad 2", no se distinguían del resto.

### La estructura nueva

`.fase-hero` y los dos tiles apilados se sustituyeron por tres piezas:

1. **`.coach-fase-band`** — chip, título, barra con la posición de hoy y las 3 cifras, todo en **una fila**.
2. **`.coach-ruta-band`** — los tres pasos hacia deuda cara en $0, del mismo ancho entre sí: son hitos de una secuencia, no magnitudes comparables.
3. **`.coach-cols`** — el tablero: **Ahora / Este mes / Hecho**. Cada columna scrollea por su cuenta, así que un mes con 12 tareas hace crecer la columna, no la página — que era exactamente el desbordamiento anterior.

Una tarea es prioridad si su texto empieza por `Prioridad N`, que es como las escribe `PHASES[].semanas`. Es el único marcador que existe hoy: añadir un campo nuevo obligaría a mantenerlo sincronizado a mano con `Coach_v2.html`, que lee los mismos objetos. El número del chip sale del **texto**, no de la posición en la lista: al marcar la Prioridad 1, la 2 sigue llamándose 2.

La columna **"Hecho"** reúne las tareas marcadas del mes y la libreta de logros (`logrosLoad()`), que es lo único que no se "desmarca" solo porque un saldo cambió. Sigue existiendo por el pedido de Adán del 2026-08-13: *"si no, sentiré que no logro nada"*.

El párrafo de `explica` **salió de la pantalla** y vive como `title` de la banda de fase, en texto plano: repetía lo que la banda de ruta ya dice con números reales.

### Verificación

Medido a **1600 y 390px**: el slide pasa de 1092 a **841px** de alto en escritorio — ya cabe con margen —, tres columnas de **444×668** iguales, **0 solapamientos** entre el checkbox y el título, sin scroll horizontal de página y **0 errores de JavaScript** en ninguno de los dos anchos. El tooltip de la fase conserva los 496 caracteres del párrafo.


## El fondo sí estaba desglosado, y dos tercios son Bitcoin (2026-08-23)

*"esta parte no esta muy clara, ademas esa suma contiene lo del precio en bitcoin que tengo guardado, revisa todo eso"*.

Tenía razón, y el panel decía exactamente lo contrario. El bloque "🔍 Qué compone esos $53,740" afirmaba que **Finanzas no lo tenía desglosado**. Es la afirmación de la sección del 2026-08-19, y es falsa.

### Lo que se había pasado por alto

`Finanzas.html` **sí** compone ese fondo, en `renderIndicatorsHTML()`, y hasta lo pinta con cinco barras de colores:

```js
const cur = isMae ? (efV2 + cetesV2 + accV2 + rentaV2 + btcValue2) : (g.current || 0);
```

Cinco piezas: fondo de emergencia, CETES, acciones, depósito de renta y **Bitcoin** — este último valuado en vivo desde `btcHistory` × `currentBtcPrice` × `usdMxn`, que Finanzas refresca contra CoinGecko.

El Dashboard nunca miró nada de eso. Leía `goal.current` — los `53740` escritos a mano en el seed — y, de paso, la palabra `btcHistory` **no aparecía ni una sola vez en todo `dashboard.html`**. La pieza más grande del dinero de Adán no existía en ninguna pantalla del Dashboard: ni en el fondo de la maestría, ni en el patrimonio, ni en el medidor de invertido.

### Los números (con los datos del seed de Finanzas)

| Pieza | Monto | % del fondo |
|---|---:|---:|
| Fondo de emergencia | $4,000 | 6% |
| CETES | $6,500 | 10% |
| Depósito de renta | $11,250 | 18% |
| **Bitcoin** | **$40,492** | **65%** |
| **Total vivo** | **$62,242** | |
| Cifra a mano en `g001.current` | $53,740 | −$8,502 de diferencia |

El Bitcoin son **0.032509 BTC** de 3 compras: entraron $2,878 USD y hoy valen $2,077 USD (−$801 USD). Y son el **65% de una meta a la que aún le faltan 26 meses** — una caída del 40%, normal en ese activo, le quita $16,197 al fondo en semanas.

### Qué se cambió

**`fondoMaestria()`** (nueva, junto a `patrimonioNeto()`) es ahora la **única fuente** de esa cifra en todo el archivo. Suma fondo de emergencia + cada inversión + Bitcoin, y devuelve también el total sin el fondo de emergencia, los datos del BTC y una bandera de doble conteo. **`btcInfo()`** valora el BTC: monedas, USD puestos, USD de hoy, MXN y qué tan viejo está el precio guardado.

Diferencia deliberada contra Finanzas: allá se suma **por tipo** (`cetes` + `acciones` + `otro`), así que un instrumento de tipo `fondos`, `crypto`, `deuda` o `inmuebles` se caería del total sin avisar. Aquí se lista **cada inversión por su nombre** — no se pierde ninguna. *(Ese hueco sigue vivo en `Finanzas.html`; no se tocó ese archivo en esta ronda.)*

Las cuatro piezas que hablaban del fondo dejaron de leer `goal.current`: el medidor 🎓 de Mis Metas, la barra de dinero de la tarjeta "Maestría en Alemania", el bloque "medido con dinero real" de la barra de edad, y el panel de detalle.

El panel se reescribió entero:

| Sección | Qué muestra |
|---|---|
| 🔍 De qué se compone, pieza por pieza | una barra por pieza real, con su % del fondo |
| ₿ La pieza que se mueve sola | el BTC: monedas, precio, tipo de cambio, ganancia/pérdida en USD, y lo que le quitaría una caída del 40% |
| ⚠️ Doble conteo | los $4,000 del fondo de emergencia se cuentan aquí **y** en su propio medidor — se dice, con la cifra sin él |
| 📌 Desfase con Finanzas | avisa cuando `g001.current` ya no coincide con el fondo vivo, y por cuánto |
| ⏸️ Por qué ahora no aportas | igual que antes, pero sin prometer que el saldo "queda intacto": lo mueve el BTC |
| 📈 El ritmo que pediría la meta | igual, ahora comparado contra su gasto mensual real cuando hay transacciones |

### De paso, otros dos arreglos

**El Bitcoin entró al panel de Patrimonio**, con su propia fila. Y ahí salió un error de aritmética que llevaba tiempo: la nota presentaba `tieneHoy − deudaTot = pat` como una identidad, pero `tieneHoy` incluía el efectivo y la cuenta y `patrimonioNeto()` no — la resta no daba. Ahora la nota usa la fórmula real (`inversiones + fondo − deudas`), explica por qué está congelada (para seguir siendo comparable contra el punto de partida de −$308,830 del 18-jul-2026, decisión de `readme_finanzas`) y dice aparte los $42,167 que deja fuera y que también son dinero suyo.

**El precio del BTC ya no depende de abrir Finanzas.** `guardarPrecioBtc()` guarda en `finanzasmx_v2` el precio que el panel de inversión del lunes ya le pedía a CoinGecko — misma semántica que `fetchBtcPrice()` de Finanzas, y solo escribe si ya hay historial de compras. Sin esto, un precio de hace meses valuaba el 65% del fondo. El panel avisa cuando el precio guardado tiene más de 2 días.

`META_DETALLE.maestria` dejó de citar "$53,740" (es texto estático, no puede calcular) y ahora manda al medidor que sí lo hace en vivo.

### Verificación

`node --check` sobre los dos bloques `<script>` del archivo: sin errores. Las funciones reales (`fondoMaestria`, `btcInfo`, `patrimonioNeto`, `kpiDetalle`) se extrajeron del HTML y se corrieron en Node contra los datos del seed de Finanzas: el fondo da **$62,242** repartido en 4 piezas, el panel de patrimonio ahora cuadra (`$21,750 − $341,362 = −$319,612`) y ninguna cifra sale `NaN` ni `undefined`.

**Lo que queda pendiente y no se tocó:** en `Finanzas.html`, `g001.current` sigue guardando los $53,740 a mano (el panel ahora lo avisa en vez de creerle), y su suma por tipo sigue pudiendo perder instrumentos de tipo `fondos`/`crypto`/`deuda`/`inmuebles`.

## Habilidades pasó a "Foco": una habilidad grande y el ranking por retorno (2026-08-23)

*"en el dashboard en la pagina 5 dame opciones de diseños, futuristas y modernos"*. Se le dibujaron tres direcciones y eligió la segunda: *"realiza la opcion b"*.

### Lo que estaba mal, medido antes de tocar nada

- **Las 16 sub-habilidades salían las 16 cerradas.** Ese es el problema de fondo: el slide se diseñó para leerse de reojo mientras se trabaja — está escrito en su propio comentario, *"nada de clics — este slide es pasivo"* — pero desde el 2026-08-19 el 100% de lo accionable (el cómo, el recurso) vivía detrás de un clic. De reojo solo se leían 16 títulos.
- **90px de hueco muerto** en la tarjeta de Finanzas: tiene 7 pasos contra los 9 de Inversión y el grid las igualaba a 418px de alto.
- **Las 12 barras se ordenaban por el valor crudo e ignoraban el peso**, que iba como texto de 9px (`×1.5`). El slide se llama *En qué invertir tu tiempo* y no calculaba en ningún lado dónde rinde la hora.

### La estructura nueva

`#skillBars` (las 12 barras) y `#skillPriority` (las 2 tarjetas) desaparecen. En su lugar, dos columnas 1.75 : 1:

1. **`#habFoco`** — una sola habilidad con **un solo paso abierto y legible entero**: por qué esa, cómo desarrollarla, con qué libro, y la rejilla de los N pasos donde se toca otro.
2. **`#habOvr` + `#habRank` + la franja de Didi** — el nivel general, las 12 ordenadas por retorno, y el contexto de siempre.

La franja de Didi bajó del título a la columna derecha: ahí ya no le pelea la fila al título y queda junto al resto del contexto. Sigue siendo el mismo `#didiStrip`, con la misma `renderDidiStrip()`.

### El retorno, que es lo que el título promete

`skRetorno(s) = peso × (100 − valor)`. No es cuál está más baja, es cuánto mueve el nivel general por hora invertida. Con el peso dentro, el orden cambia: **Inversión (25, ×1.2 → 90) rinde más que Finanzas (20, ×1.1 → 88)** aunque su valor sea mayor. Por eso el foco por omisión es Inversión.

Las candidatas se siguen eligiendo igual que antes — las `PRIORIDAD_N` más bajas de las que no están en `PRIORIDAD_EXCLUIDAS` — para no tocar la decisión del 2026-08-09 de dejar Ventas y Marketing fuera. Lo único nuevo es que **entre esas dos manda el retorno, no el valor**.

Ventas y Marketing sí aparecen en el ranking, encabezándolo (127 y 96) pero **apagadas y marcadas EN PAUSA**. Es deliberado: son las que más rendirían y verlas ahí explica por qué no son la habilidad de la semana. Ocultarlas dejaría la pregunta sin respuesta.

### Las cifras se calculan, no se estiman

La línea del OVR promete un número concreto (*"Llevar Inversión de 25 a 40 lo sube a 48"*), así que sale de `calcOVRcon()`, que es `calcOVR()` con un valor sustituido — misma fórmula, mismo redondeo. El `40` es el siguiente escalón de `skLevel()` por encima del valor actual, no un número elegido a ojo.

En el borrador la frase remataba con *"es el movimiento más grande que tienes disponible"*. Al calcularlo resultó **falso**: Finanzas está más lejos de su escalón (20→40 son 20 puntos contra 15) y da el mismo 48. La comparación entre las dos candidatas ahora **solo se escribe si de verdad gana una**; hoy empatan y no se escribe nada.

### Qué se guarda

`dash_habfoco_v1`, y solo dos cosas: cuál de las dos candidatas está en el foco y en qué paso va cada una. **No hay "completado"**: marcar pasos como hechos sería un modelo nuevo que habría que mantener sincronizado a mano con `Coach_v2.html`, igual que ya pasa con `SK` y `APRENDIZAJE`. El paso seleccionado *es* el estado, y cada habilidad recuerda el suyo por separado.

Si el campo `skill` viene vacío (nunca se tocó el botón), el foco lo decide el retorno. Así, si mañana Finanzas adelanta a Inversión, el slide se mueve solo en vez de quedarse congelado en la última elección.

### Una sola ruta de pintado para las dos formas de APRENDIZAJE

`habPasos(id)` normaliza las dos que conviven: las que ganaron `subs` el 2026-08-19 (Finanzas e Inversión) y las del formato viejo (diagnóstico / esta semana / semanas 2-4 / hábito / error), que se convierten en 5 pasos. Así no hay rama duplicada y, si mañana IA o Datos entran al foco porque cambian los valores, el slide ya sabe mostrarlas. Con esto se fueron `toggleSubhab()` y todo el CSS de `.sc-*`, `.skbar-*` y `.skill-card`, que ya no tenían usuario.

### Pantallas bajas: el problema que solo aparece barriendo todos los pasos

El alto del panel de foco lo manda el largo del texto del paso, y ese largo varía mucho — el paso 4 de Inversión ocupa casi el doble que el 8. Midiendo **solo el paso que estaba abierto** todo cabía; barriendo **los 16 pasos en 15 resoluciones**, en 1440×900, 1366×768 y 1280×720 los más largos se salían entre **9 y 31px**.

La corrección va en `@media(max-height:940px)` y recupera espacio en tres frentes a la vez, para que aguante el peor paso y no solo el que estaba abierto al medir:

1. la rejilla de 9 pasos con nombre (**166px fijos**) pasa a una tira de números (**~70px**) — el nombre del paso abierto sigue en el título grande y el de cada número está en su `title`;
2. título, cifra del OVR y cuerpo bajan un escalón de tamaño;
3. se aprietan gaps y paddings.

El corte va en 940px de alto a propósito, para cubrir las laptops de 900. La misma tira compacta se usa en móvil, donde además sube el área de toque de 30 a 46px: las 9 fichas apiladas costaban ~360px y empujaban el slide a 1704px de alto.

### Verificación

**15 resoluciones × 16 pasos = 240 combinaciones, todas sin desborde ni error de JavaScript**, de 1920×1080 a 360×740, en tema oscuro y claro. Además se probó la interacción completa en Chrome: tocar un paso, cambiar de habilidad, recargar y comprobar que cada habilidad vuelve a su propio paso. En escritorio el slide mide **841px** en ventana de 1000 y en móvil **1325px** (antes 1488). Ningún control queda por debajo de 32px.

## Habilidades Base pasa a "consola táctica": la barra de avance se vuelve una marca por paso (2026-08-23)

Pedido: *"de la 4 pagina del dashboard, dame alternativas de diseño moderno y futurista"*. Se le mostraron a Adán **cuatro direcciones renderizadas**, cada una a 1440×900 con la carcasa real del Dashboard (barra de apps, rieles del HUD, manchas `--ac1`/`--ac2` de `.theme-basicas`) y con las 23 habilidades, sus fotos y el número real de pasos de cada checklist — no maquetas con texto de relleno:

| | Dirección | Qué proponía | Por qué no |
|---|---|---|---|
| **A** | Consola táctica | Instrumentación: retícula, brackets de HUD, mono al frente, franja de instrumentos arriba | **Elegida** |
| B | Vitrina cinemática | Una habilidad ocupando media pantalla con su siguiente paso; las otras 22 en un riel | 22 de 23 quedaban en miniaturas de 32px |
| C | Bento de cristal | La misma rejilla pero con vidrio real, halo de neón por estado y jerarquía por tamaño | Los tamaños desiguales sugerían una prioridad que los datos no tienen |
| D | Núcleo orbital | Las 23 como nodos en tres órbitas por familia, con el progreso global al centro | Comparar dos habilidades cuesta más que en una rejilla, y no escala a 40 |

Respuesta: *"me gusta la opcion a, quiero que la hagas"*.

### El cambio que justificó el rediseño

**La barra de progreso deja de ser una barra.** Antes cada tarjeta pintaba `.img-goal-pbar` (una barra sólida) más el `%` de `detailPct()`. Ahora pinta **una marca por cada paso real del checklist de esa habilidad**: 20 marcas en "Hacer networking de verdad", 12 en "Saber nadar", 11 en "Manejar todo tipo de vehículos". El dato ya existía (`HABILIDAD_DETALLE[id].pasos.length`) y no se estaba usando en ningún lado — la pantalla decía "15 %" donde podía decir "3 de 20, te faltan 17". Es la diferencia entre un medidor y un temario.

Piezas nuevas:

- **`hbAvance(id)`** — hermana de `detailPct()`, devuelve `{hechos, total, pct}` en vez de solo el porcentaje. `detailPct()` **no se tocó**: la comparte Mis Metas (`imgListHtml()`) y ahí el % basta.
- **Franja de instrumentos `#hbBay`** — progreso global, ecualizador de las 23 habilidades (una barra por habilidad, ordenadas como el temario, con piso de 18 % para que una en 0 % siga siendo un elemento visible) y cuatro lecturas: dominadas / en curso / sin empezar / pasos totales. Con los datos de prueba: 41 %, 2 dominadas, 19 en curso, 2 sin empezar, 131 de 322 pasos.
- **Ficha "SIGUIENTE"** — con 23 tarjetas hacía falta un punto de entrada o la pantalla se vuelve un catálogo. La regla es **la habilidad empezada que está más cerca de terminar** (mayor % sin llegar a 100): cerrar algo que ya llevas a medias motiva más que abrir una novena habilidad en 1 paso. Si no hay ninguna empezada (navegador nuevo) marca la primera del temario, para que nunca se quede sin marcar. Se distingue con brackets en los 4 ángulos en `--ac1` en vez de 2, y el chip de `%` baja a `top:22px` para no chocar con la etiqueta.
- **Celda de lectura** — la última de la rejilla explica las marcas, el verde de "dominada" y el rosa de "sin empezar". No es relleno: las marcas por paso son un lenguaje nuevo en el Dashboard y sin esa celda no hay dónde explicarlas.

### Decisiones de implementación

- **Clases propias `.hb-*`, no `.img-goal-*`.** Esas las comparte con Mis Metas (slide 2) y con `imgListHtml()`, que no cambian. Se conservó de ahí el truco de `::before` con `background:inherit` para el zoom del hover — el que evita que el título se re-renderice borroso (ver el comentario largo en `.img-goal-photo::before`).
- **`grid-template-columns:repeat(auto-fill,minmax(178px,1fr))`** en vez de un número fijo de columnas. Con 23 fichas + la celda de lectura el número correcto depende del ancho real, y una sola regla cubre monitor (7 columnas a 1920), escritorio (6 a 1440), iPad (3) y celular (2). Las filas siguen el patrón de siempre — `minmax(128px,1fr)` + `overflow-y:auto`, "estira si cabe, scrollea si no" — con 128 en vez de 150 porque la fila de marcas mide 12px y la vieja fila de barra medía más.
- **Se eliminó `.img-goal-grid-4col`**, que quedó muerta al migrar esta pantalla (mismo criterio con que se borró `.img-goal-grid-8` en su día, verificado con grep: no quedan referencias fuera de comentarios históricos). Con ella se fue el `:not(.img-goal-grid-4col)` de la regla de "tarjeta suelta en la última fila llena el ancho" — esa excepción existía solo para Habilidades Base.
- **Los alfa rosados literales son a propósito**: `--ac1` (`#ff5470`) lo fija `.theme-basicas` y no se redefine en tema claro, y las `.hb-*` solo viven dentro de ese slide. Los degradados oscuros van encima de una foto, igual que el `.img-goal-photo::after` de siempre, así que tampoco siguen al tema.
- **Un override puntual de tema claro**: `:root[data-theme="light"] .hb-eq i{opacity:.8}`. En claro el verde es `#00a758` sobre fondo casi blanco y al 55 % el ecualizador se lavaba. Mismo patrón que ya usan `.slide::before` y `.meta-detail-card`.
- **Barras del ecualizador con `max-width:16px` + `justify-content:space-between`**: a `flex:1` puro, 23 barras en un monitor de 1440 salían de ~27px cada una y la franja se leía como bloques, no como instrumento. En celular, donde 23×16px ya no caben, el tope no aplica y se encogen solas.

### Verificado con Playwright

Cinco combinaciones renderizadas con progreso de prueba sembrado en `habilidades_checklist_v1`, **sin un solo error de JavaScript y sin desborde horizontal en ninguna**:

| Viewport | Tema | Columnas | Foto | Scroll de la rejilla |
|---|---|---|---|---|
| 1440×900 | oscuro y claro | 6 | 117px | 0 |
| 1366×768 | oscuro | 6 | 112px | 91px |
| 820×1180 (iPad) | oscuro | 3 | 134px | 0 (el slide entero scrollea) |
| 390×844 (iPhone) | oscuro | 2 | 134px | 0 (ídem) |

Los 91px de scroll en la laptop de 768px de alto son **menos** de lo que scrolleaba el diseño anterior (filas de 150px contra 128px). En ≤1024px la franja de instrumentos se parte en dos filas y el ecualizador baja completo debajo, donde tiene ancho para que 23 barras se lean; la rejilla suelta su scroll propio (`overflow:visible`) porque ahí el slide ya scrollea entero.
