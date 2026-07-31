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

**Nuevo el 2026-07-30**, a petición explícita de Adán ("arriba pon una sección para que vaya directo a mis otros proyectos"): `.qa-bar` (`#qaBar`, `renderQuickApps()`) es una franja fija en `top:0` — **no** forma parte del carrusel de slides, está siempre visible sin importar qué slide esté activo. Muestra una píldora compacta (ícono + nombre + estadística corta opcional) por cada app hermana: Coach, Finanzas, Skincare, Cabello, Salud, Ejercicio. Se repinta en cada `showSlide(i)` y en el listener de `storage`, igual que el slide activo. `.slides` se corrió a `top:58px` para dejarle espacio. (**2026-07-30**: se quitó la píldora de Proyectos junto con toda la app — ver nota más abajo.)

## Navegación (motor de slides, rotación automática cada 3 min)

**Reducido de 8 a 6 slides el 2026-07-30** a petición de Adán ("las demás pestañas hay cosas que no me interesan") — se retiraron **Alertas**, **Hoy en números** y **Apps** (esta última se reemplazó por la barra superior fija de arriba, que cubre el mismo caso de uso — ir directo a otra app — sin ocupar un slide completo ni esperar a que rote). `getAlerts()`/`addDays()`/`renderAlertas()`/`renderHoy()`/el `renderApps()` original ya no existen en el archivo.

**Hero pasó a ser el slide 0 (pantalla principal) el mismo día**, más tarde, cuando a Adán le terminó gustando el resultado tras varias iteraciones ("esa que hiciste ponla como principal") — antes era Mi Día. Se intercambiaron `data-i="0"`/`data-i="1"` entre las dos `<section>` (y su posición física en el HTML, para que el orden de lectura del archivo coincida) y el orden de `const RENDERS=[renderHero,renderDia,...]`. `showSlide(0)` en el arranque ahora muestra Hero primero sin ningún otro cambio de lógica — el motor de slides es genérico (indexa por `data-i`, no por nombre), así que no hubo que tocar `nextSlide()`/`prevSlide()`/`goTo()`/`buildDots()`.

- **🕐 Mi Día** (slide 1, antes slide 0 — ver nota de reordenamiento abajo) — vive/actualiza cada segundo: bloque "Ahora mismo" y "Siguiente" calculados en tiempo real contra el horario de `Coach_v2.html → #rutina` (arreglo `RUTINA_TASKS`, 63 tareas, duplicado idéntico en ambos archivos — si se edita el horario en uno, hay que replicarlo en el otro), progreso de hoy (X/Y bloques completados, excluyendo el bloque fijo de ALTEN que no lleva checkbox) y una **línea de tiempo relativa a la hora actual**: no muestra el día completo desde que despierta, sino solo los **3 bloques anteriores al actual + el actual + todos los de después** (`renderDia()`, variable `visibles` = `tareasHoy.slice(idxAnchor-3)`). **Rediseñada el 2026-07-30** ("detalla cada actividad") con tarjetas `.rt2-card` en vez de filas planas: cada bloque muestra una píldora de categoría con ícono y color (`CAT_META`, mismo mapa de 7 categorías que `Coach_v2.html → #rutina`) y la duración hasta el siguiente bloque (`rtDur()`), más un resumen de categorías del día arriba de la línea de tiempo. Enlaza a Coach → Rutina para editar el horario.
- **🌟 Hero** (**slide 0, pantalla principal desde el 2026-07-30** — "esa que hiciste ponla como principal", ver nota abajo) — **"JARVIS · Tu semana completa"**. Cuarto rediseño el 2026-07-30, cada vez con más detalle real (ver historial abajo). Reloj+fecha ahora chicos y a la derecha (`clamp(20px,2.2vw,28px)`, ya no dominan la pantalla). Debajo, tres bloques:
  1. **Tira de 7 días** (`#heroWeekStrip`, `.week-strip`, Domingo→Sábado vía `semanaActual()`) — una tarjeta `.ws-day` por día con: nombre corto + fecha, ícono de gym (✅ si hay sesión real ese día en `D.gym.sesiones`, 😴 si la rutina de ese día es descanso, ⏳ si es hoy/futuro y todavía no se entrena, ❌ si ya pasó y no se entrenó) + el **nombre real de la rutina** de ese día, y las calorías registradas ese día (`D.sal.alimentos` sumado por fecha). El día de hoy se resalta con borde de color.
  2. **Fila de estadísticas rápidas** (`#heroQuickStats`, `.grid.g3`, agregada 2026-07-30 a petición de Adán — "métele más cosas ahí"; reducida de 4 a 3 el mismo día al quitarse Proyectos, ver nota abajo), todas con datos ya cargados en `D`, sin campos inventados: **🔥 Racha de gym** (días consecutivos entrenando, mismo algoritmo que `ejercicio.html` → `renderDashboard()`: cuenta hacia atrás desde hoy, los días de descanso programados no rompen la racha), **⚖️ Peso actual** (`D.sal.medidas`, el más reciente, con la diferencia vs. el anterior en verde si bajó / rojo si subió — directo a la meta de "bajar panza"), **💧 Agua hoy** (`D.sal.agua[hoy]` vs. `D.sal.metas.vasos`).
  3. **2 paneles de detalle** (`.grid.g2`, `.tile` con clase `.hp-*`; antes 3, ver nota abajo), con datos reales y específicos, no agregados abstractos:
     - **🏋️ Gym esta semana** (`#heroGymPanel`) — lista cada sesión real de la semana (fecha + nombre de la rutina que se entrenó) y, si hoy no se ha entrenado todavía, qué rutina toca.
     - **🥗 Nutrición de hoy** (`#heroNutriPanel`) — calorías de hoy vs. meta en grande, más 3 barras de progreso (proteína/carbs/grasa). Si no hay comidas registradas hoy, muestra las metas en $0$ con una nota aclaratoria — ya no se oculta el panel entero.

  **2026-07-30, más tarde el mismo día — se eliminó la app Proyectos por completo** ("elimina la carpeta de proyectos y todas las referencias que tengan que ver con esto"): el panel "✅ Tareas pendientes" (`#heroTareasPanel`) y la estadística "⏱️ Proyectos (semana)" ya no existen — dependían de `D.pro.tareas`/`D.pro.sesiones`, que ya no se leen (`pro:` se quitó de `loadAll()`). La fila de estadísticas bajó de `.grid.g4` a `.grid.g3` y los paneles de `.grid.g3` a `.grid.g2` para no dejar huecos vacíos.

  **`GYM_RUTINA_DEFAULT` — respaldo sin depender de abrir `ejercicio.html` primero (fix 2026-07-30, mismo día)**: Adán reportó "sigo sin ver nada" después de que el fix de `save()` en `ejercicio.html` (ver `../CuidadoPersonal/readme_ejercicio.md`) no sirvió porque nunca abrió esa app en el mismo navegador/puerto de Live Server que el Dashboard — y no quiso hacerlo ("tú arréglalo"). Solución: copia liviana (solo `{nombre, tipo}` por día, **no** el detalle de ejercicios — para eso sí hace falta abrir `ejercicio.html`) del programa de 6 días de `S.rutina`, hardcodeada en `dashboard.html` junto a `semanaActual()`. `renderHero()` arma `gymRutina = (D.gym.rutina tiene contenido) ? D.gym.rutina : GYM_RUTINA_DEFAULT` — si Adán personaliza su rutina real en `ejercicio.html`, esa versión manda; si nunca la ha abierto, el Dashboard igual muestra "qué toca hoy" correctamente desde el primer momento. **Es una 5ª estructura duplicada entre Coach/ejercicio.html y Dashboard** (ver README raíz → "Ramificaciones" #3) — si se cambia el programa semanal en `ejercicio.html`, replicar `nombre`/`tipo` aquí también. Las sesiones reales (`D.gym.sesiones`) siguen sin tener respaldo — no se pueden inventar, esas sí solo existen si de verdad se entrena y se registra en `ejercicio.html`.

  **Historial de iteración (2026-07-30, 3 rondas de feedback de Adán sobre este slide en particular)**: 1) "Vida Score" compuesto (`calcScores()`/`vidaScore()`/`AREAS`/`sCol()`/`sLab()`) → "eso no me aporta nada", número abstracto y desmotivante con datos incompletos; 2) 3 tiles simples con un número cada uno (sesiones/días/% completación) → "es muy simple, debe ser algo muchísimo más detallado"; 3) **versión actual** — tira semanal + 3 paneles con contenido real (nombres de rutinas, macros reales, títulos de tareas), no solo cifras agregadas. Toda la lógica de las versiones 1 y 2 (incluida `heroGym`/`heroNutricion`/`heroTareas` y sus `-Sub`) ya no existe en el archivo.
- **🪙 Coach · Plan Maestro** (slide 2) — fase activa, días restantes a la meta, prioridades de la fase.
- **💰 Finanzas** (slide 3) — patrimonio, fondo de emergencia, deuda, flujo del mes.
- **🧠 Habilidades** (slide 4) — dos filas a pantalla completa, igual de "grande y dramático" que el resto de los slides (Hero, Coach, Finanzas): **fila 1** — radar (`.chart-wrap` normal, `clamp(240px,34vh,420px)`) + tarjeta OVR grande (`clamp(56px,7vw,96px)`) en `grid-template-columns:1fr 1fr`. **Fila 2** — título `.skill-priority-title` ("⚠️ Habilidades a mejorar…", con el link a Coach a la derecha) y debajo `#skillPriority` (`renderSkills()`) en `.grid.g4`: **`PRIORIDAD_N` (4) tarjetas grandes**, una por prioridad (de las 5 de `APRENDIZAJE` — `.slice(0,PRIORIDAD_N)` tras ordenar por `val` ascendente), cada `.tile` con `.skill-card` dentro: ícono+nombre+valor arriba, el **primer paso completo** de esta semana (`a.primer`, sin truncar) y los 2 recursos principales al pie. Siempre visibles, sin clics — este slide rota solo cada 3 min y se ve de reojo. **Iteración 2026-07-30** (4 rondas de feedback de Adán, en orden): 1) subtabs clicables → mala idea, nadie hace clic con rotación automática; 2) 5 prioridades con texto largo en columna angosta → mucho para un vistazo; 3) se compactó de más (letra 9.5px, radar `.chart-wrap-sm` de 150-220px) → quedó chico y desproporcionado en una pantalla completa; 4) **layout actual**: tarjetas grandes a pantalla completa, con el detalle completo pero bien organizado — ya no existen `.chart-wrap-sm`/`.skill-row`/`.sr-*`.
- **🎯 Mis Metas** (slide 5, **nuevo el 2026-07-30**) — `renderMetasSlide()`. Dos mitades: **progreso real** (`#metasProgreso`, 4 tiles con barra de avance) — fondo de emergencia, deuda cara (Banamex+BBVA combinadas, buscadas en `D.fin.debts` por nombre vía regex `/banamex/i`/`/bbva/i`, con fallback "Sin datos" si no existen todavía en Finanzas), fondo de la Maestría (`D.fin.goals`, busca `id==='g001'` o nombre `/maestr/i`) y patrimonio hacia $1,000,000 (reusa `patrimonioNeto()`/`hasFinData()` de la slide de Finanzas) — y **bucket list** (`#metasListas`, sin datos en vivo, mismo contenido que `Coach_v2.html → #perfil → 🎯 Metas`): corto/mediano plazo (torneo de ajedrez, Hyrox, trabajo remoto, Cupra Formentor, liquidar el BYD — este último sí con saldo en vivo si existe una deuda `type:'car'` en Finanzas) y largo plazo/extras (empresa creada, departamento, Tailandia, Hong Kong, SpaceX, Maestría, Hyrox internacional), con link de vuelta a Coach para el detalle completo.

## Cálculo del "Vida Score"

`calcScores()` calcula un puntaje 0-100 por área a partir de los datos de los últimos 7 días (salud/nutrición, finanzas). Luego `vidaScore()` combina esas 2 áreas con una ponderación fija (salud 76%, finanzas 24%) para obtener el score global.

## Nota sobre los enlaces

Las píldoras de la barra superior (`renderQuickApps()`) usan **rutas relativas** apuntando a la carpeta de cada app dentro de `Claude_Proyecto`. Los enlaces a Skincare, Cuidado del Cabello, Cuidado de la Salud y Ejercicio apuntan todos a `../CuidadoPersonal/cuidadopersonal.html?tab=<skincare|cabello|salud|ejercicio>`, que abre directamente el subtab correspondiente. Si en el futuro se vuelve a mover o renombrar alguna carpeta de app, hay que actualizar también los `href` correspondientes en `renderQuickApps()` (JS) de este archivo. (`AREAS` existía en la versión anterior del Hero — se eliminó junto con el resto de esa lógica, ver más abajo.)

## Datos duplicados — sincronizar a mano

El Dashboard no puede leer el JS de `Coach_v2.html` ni de `ejercicio.html` (documentos HTML distintos, sin build step ni imports), así que **copia literalmente 5 estructuras de datos** dentro de su propio `<script>`. Si se edita cualquiera de estas en su archivo de origen, hay que replicar el cambio aquí también — no hay ningún mecanismo automático que los mantenga sincronizados:

| Estructura | Origen | Copia (dashboard.html) | Verificación rápida |
|---|---|---|---|
| Horario completo de la rutina (63 tareas) | `Coach_v2.html` → `const RUTINA_TASKS` en `#rutina` | `const RUTINA_TASKS` (idéntica) | Ambas deben ser byte-idénticas tras `JSON.stringify` — ver comando de verificación abajo |
| Fechas de las 4 fases del Plan Maestro | `Coach_v2.html` → IIFE "Plan Maestro" (`const fases`) | `const PHASES` | Mismas 4 fechas: 18 jul 2026 / 1 oct 2026 / 1 abr 2027 / 1 ene 2029 / 1 ene 2030 |
| Radar de 12 habilidades (valores base + pesos) | `Coach_v2.html` → `const SK` (IIFE "Radar FIFA") | `const SK` | Mismos 12 `id`/`val`/`w` |
| Contenido de las 5 prioridades de aprendizaje (primer paso, hábito, recursos) | `Coach_v2.html` → `#aprendizaje` (5 `.card`, IDs `cu1`-`cu5`) | `const APRENDIZAJE` (objeto por `id` de skill: `datos`/`ventas`/`marketing`/`finanzas`/`ia`; solo Dashboard tiene además `corto`, un resumen de 1 línea que no existe en Coach) | Mismo texto de "Primer paso esta semana" y "Hábito recomendado" en ambos; recursos con el mismo `n` (nombre) por `t` (tipo) |
| Nombre + tipo del programa semanal de gym (7 días) | `ejercicio.html` → `S.rutina` (solo `nombre`/`tipo`, no el detalle de ejercicios) | `const GYM_RUTINA_DEFAULT` (solo se usa como respaldo si `D.gym.rutina` viene vacío — ver slide Hero arriba) | Mismos 7 `nombre`/`tipo` por día (1=Lun…0=Dom) |

Comando para verificar que `RUTINA_TASKS` sigue idéntico entre los dos archivos (ejecutar desde `Claude_Proyecto/`):
```js
node -e "
const fs=require('fs');
function ex(f){const h=fs.readFileSync(f,'utf8');const m=h.match(/const RUTINA_TASKS\s*=\s*(\[[\s\S]*?\]);/);return new Function('return '+m[1])();}
console.log(JSON.stringify(ex('Coach/Coach_v2.html'))===JSON.stringify(ex('Dashboard/dashboard.html')));
"
```

Detalle completo de cada estructura en [`../Coach/readme_coach_v2.md`](../Coach/readme_coach_v2.md).

## Cómo usarlo

Se abre `dashboard.html` en el mismo navegador donde ya se usaron las demás apps, para que pueda leer sus datos guardados. No tiene botón de refresco manual: escucha el evento `storage` (`window.addEventListener('storage', ...)`) y vuelve a leer `localStorage` automáticamente si otra pestaña del mismo navegador cambia algún dato. Además, cada vez que rota de slide (`showSlide(i)`) llama a `loadAll()` de nuevo.
