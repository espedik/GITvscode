# dashboard.html — Dashboard Maestro: Mi Vida

Panel central que agrega los datos de **todas las demás apps** del proyecto (Finanzas, Cuidado Personal —Skincare, Cabello, Salud, Ejercicio—, Proyectos) leyendo directamente las claves que cada una guarda en `localStorage`, sin necesidad de un backend. Es la "página de inicio" pensada para ver de un vistazo cómo va la vida en conjunto.

## Cómo obtiene los datos

`loadAll()` lee del `localStorage` del navegador las claves usadas por cada app individual:

| App | Clave localStorage |
|---|---|
| Finanzas | `finanzasmx_v2` |
| Cuidado de la Salud (nutrición) | `misalud_v1` |
| Skincare | `skincare_v1` |
| Cuidado del Cabello | `cabello_v1` |
| Proyectos | `proyectos_v1` |
| Rutina diaria (Coach → #rutina) | `coach_rutina_v1` |

Nota: Skincare, Cuidado de la Salud y Ejercicio viven ahora dentro de `CuidadoPersonal/cuidadopersonal.html` (subtabs), que a su vez incrusta `salud.html` y `ejercicio.html` completos vía `<iframe>`. El Dashboard no lee `mirutina_v1` (datos de Ejercicio) todavía; sólo usa los ejercicios ligeros que se registran dentro de `misalud_v1`.

Esto significa que el dashboard **solo muestra datos reales si se abrió desde el mismo navegador** donde se usaron las otras apps (comparten el mismo origen/almacenamiento). Si se abre en un navegador limpio, todo aparecerá vacío.

## Barra superior — acceso directo a los demás proyectos (fija, no rota)

**Nuevo el 2026-07-30**, a petición explícita de Adán ("arriba pon una sección para que vaya directo a mis otros proyectos"): `.qa-bar` (`#qaBar`, `renderQuickApps()`) es una franja fija en `top:0` — **no** forma parte del carrusel de slides, está siempre visible sin importar qué slide esté activo. Muestra una píldora compacta (ícono + nombre + estadística corta opcional) por cada app hermana: Coach, Finanzas, Skincare, Cabello, Salud, Ejercicio, Proyectos. Se repinta en cada `showSlide(i)` y en el listener de `storage`, igual que el slide activo. `.slides` se corrió a `top:58px` para dejarle espacio.

## Navegación (motor de slides, rotación automática cada 3 min)

**Reducido de 8 a 6 slides el 2026-07-30** a petición de Adán ("las demás pestañas hay cosas que no me interesan") — se retiraron **Alertas**, **Hoy en números** y **Apps** (esta última se reemplazó por la barra superior fija de arriba, que cubre el mismo caso de uso — ir directo a otra app — sin ocupar un slide completo ni esperar a que rote). `getAlerts()`/`addDays()`/`renderAlertas()`/`renderHoy()`/el `renderApps()` original ya no existen en el archivo.

- **🕐 Mi Día** (slide 0, pantalla principal) — vive/actualiza cada segundo: bloque "Ahora mismo" y "Siguiente" calculados en tiempo real contra el horario de `Coach_v2.html → #rutina` (arreglo `RUTINA_TASKS`, 63 tareas, duplicado idéntico en ambos archivos — si se edita el horario en uno, hay que replicarlo en el otro), progreso de hoy (X/Y bloques completados, excluyendo el bloque fijo de ALTEN que no lleva checkbox) y una **línea de tiempo relativa a la hora actual**: no muestra el día completo desde que despierta, sino solo los **3 bloques anteriores al actual + el actual + todos los de después** (`renderDia()`, variable `visibles` = `tareasHoy.slice(idxAnchor-3)`). **Rediseñada el 2026-07-30** ("detalla cada actividad") con tarjetas `.rt2-card` en vez de filas planas: cada bloque muestra una píldora de categoría con ícono y color (`CAT_META`, mismo mapa de 7 categorías que `Coach_v2.html → #rutina`) y la duración hasta el siguiente bloque (`rtDur()`), más un resumen de categorías del día arriba de la línea de tiempo. Enlaza a Coach → Rutina para editar el horario.
- **🌟 Hero** (slide 1) — "Vida Score" del momento y barras de progreso por área.
- **🪙 Coach · Plan Maestro** (slide 2) — fase activa, días restantes a la meta, prioridades de la fase.
- **💰 Finanzas** (slide 3) — patrimonio, fondo de emergencia, deuda, flujo del mes.
- **🧠 Habilidades** (slide 4) — radar de skills (mismo set que Coach) y, junto a él, `#skillPriority` (`renderSkills()`): las **`PRIORIDAD_N` (4) prioridades más bajas** de `APRENDIZAJE` (de las 5 totales — se calcula ordenando por `val` ascendente y con `.slice(0,PRIORIDAD_N)`, así que sube/baja sola si cambian los valores del radar), cada una como una fila `.skill-row` compacta de **una sola línea**, siempre visible, sin clics: ícono, nombre, valor y un resumen accionable corto (`a.corto`, campo nuevo en `APRENDIZAJE`, distinto del `a.primer` largo que usa Coach). **Iteración 2026-07-30**: primero se probó con subtabs clicables (mala idea — el slide rota solo, nadie hace clic, escondía casi todo); después con las 5 completas y texto largo (mucho para un vistazo); esta versión (4, una línea, texto corto) es la que se quedó. Link final a Coach → Aprendizaje para las 5 completas con hábito + los 4 recursos de cada una.
- **🎯 Mis Metas** (slide 5, **nuevo el 2026-07-30**) — `renderMetasSlide()`. Dos mitades: **progreso real** (`#metasProgreso`, 4 tiles con barra de avance) — fondo de emergencia, deuda cara (Banamex+BBVA combinadas, buscadas en `D.fin.debts` por nombre vía regex `/banamex/i`/`/bbva/i`, con fallback "Sin datos" si no existen todavía en Finanzas), fondo de la Maestría (`D.fin.goals`, busca `id==='g001'` o nombre `/maestr/i`) y patrimonio hacia $1,000,000 (reusa `patrimonioNeto()`/`hasFinData()` de la slide de Finanzas) — y **bucket list** (`#metasListas`, sin datos en vivo, mismo contenido que `Coach_v2.html → #perfil → 🎯 Metas`): corto/mediano plazo (torneo de ajedrez, Hyrox, trabajo remoto, Cupra Formentor, liquidar el BYD — este último sí con saldo en vivo si existe una deuda `type:'car'` en Finanzas) y largo plazo/extras (empresa creada, departamento, Tailandia, Hong Kong, SpaceX, Maestría, Hyrox internacional), con link de vuelta a Coach para el detalle completo.

## Cálculo del "Vida Score"

`calcScores()` calcula un puntaje 0-100 por área a partir de los datos de los últimos 7 días (salud/nutrición, finanzas). Luego `vidaScore()` combina esas 2 áreas con una ponderación fija (salud 76%, finanzas 24%) para obtener el score global.

## Nota sobre los enlaces

Las píldoras de la barra superior (`renderQuickApps()`) y `AREAS` usan **rutas relativas** apuntando a la carpeta de cada app dentro de `Claude_Proyecto`. Los enlaces a Skincare, Cuidado del Cabello, Cuidado de la Salud y Ejercicio apuntan todos a `../CuidadoPersonal/cuidadopersonal.html?tab=<skincare|cabello|salud|ejercicio>`, que abre directamente el subtab correspondiente. Si en el futuro se vuelve a mover o renombrar alguna carpeta de app, hay que actualizar también los `href` correspondientes en `renderQuickApps()`/`AREAS` (JS) de este archivo.

## Datos duplicados — sincronizar a mano

El Dashboard no puede leer el JS de `Coach_v2.html` (son documentos HTML distintos, sin build step ni imports), así que **copia literalmente 4 estructuras de datos** de Coach dentro de su propio `<script>`. Si se edita cualquiera de estas en Coach, hay que replicar el cambio aquí también — no hay ningún mecanismo automático que los mantenga sincronizados:

| Estructura | Origen (Coach_v2.html) | Copia (dashboard.html) | Verificación rápida |
|---|---|---|---|
| Horario completo de la rutina (63 tareas) | `const RUTINA_TASKS` en `#rutina` | `const RUTINA_TASKS` (idéntica) | Ambas deben ser byte-idénticas tras `JSON.stringify` — ver comando de verificación abajo |
| Fechas de las 4 fases del Plan Maestro | IIFE "Plan Maestro" (`const fases`) | `const PHASES` | Mismas 4 fechas: 18 jul 2026 / 1 oct 2026 / 1 abr 2027 / 1 ene 2029 / 1 ene 2030 |
| Radar de 12 habilidades (valores base + pesos) | `const SK` (IIFE "Radar FIFA") | `const SK` | Mismos 12 `id`/`val`/`w` |
| Contenido de las 5 prioridades de aprendizaje (primer paso, hábito, recursos) | `#aprendizaje` (5 `.card`, IDs `cu1`-`cu5`) | `const APRENDIZAJE` (objeto por `id` de skill: `datos`/`ventas`/`marketing`/`finanzas`/`ia`; solo Dashboard tiene además `corto`, un resumen de 1 línea que no existe en Coach — es exclusivo del slide compacto, no hay que sincronizarlo) | Mismo texto de "Primer paso esta semana" y "Hábito recomendado" en ambos; recursos con el mismo `n` (nombre) por `t` (tipo) |

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
