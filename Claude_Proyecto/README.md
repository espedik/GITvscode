# Claude_Proyecto — Mapa maestro

Este documento es el **índice central** de todo lo que vive en `Claude_Proyecto/`: qué apps existen, dónde están sus datos, cómo se relacionan entre sí, y qué hay que tocar cuando se edita algo. Está pensado para leerse **antes** de tocar cualquier archivo — evita tener que releer miles de líneas de HTML/JS para entender cómo encaja todo.

**Regla del proyecto (pedida por Adán, 2026-07-29): toda la aplicación (todas las apps de vida/negocio, no las de estudio) debe estar bien referenciada y trazable.**
- **Cada archivo `.html` tiene su propio `.md`** con la misma información que un futuro Claude necesitaría para modificarlo sin releer todo el código: estructura, modelo de datos (`localStorage`), funciones clave, y referencias cruzadas a otros archivos.
- **Convención de nombres (pedida por Adán, 2026-07-30):** el `.md` de cada `.html` se llama `readme_{nombrehtml}.md` (ej. `Coach_v2.html` → `readme_coach_v2.md`) para diferenciarlos rápido de un vistazo en el árbol de carpetas. Este `README.md` de la raíz es la única excepción — es el mapa maestro, no el doc de un `.html` específico.
- **Siempre que se modifique un `.html`, se actualiza su `.md` en el mismo cambio** (no después, no "cuando haya tiempo").
- Este `README.md` es el mapa de las **ramificaciones** entre archivos — para el detalle interno de cada app, ir a su `.md` propio (enlazado abajo).

## Qué es esto

Un conjunto de aplicaciones web de una sola página (HTML + CSS + JS, **sin backend, sin build step**), cada una con su propio `localStorage`, que en conjunto forman el "sistema de vida" de Adán: finanzas reales, plan de negocio (Coach), cuidado personal, proyectos, y un dashboard central que agrega todo. Todo se abre directamente con doble clic (`file://`) — no hace falta servidor.

**Por qué comparten datos entre carpetas sin backend**: todos estos archivos se abren vía `file://`. En ese esquema, el navegador trata todo `file://` como **un solo origen**, así que `localStorage` se comparte entre carpetas — un HTML en `Dashboard/` puede leer perfectamente lo que guardó otro en `CuidadoPersonal/`. Esto es lo que hace posible el Dashboard sin ninguna sincronización explícita, pero también significa que **los nombres de las claves de `localStorage` son un contrato implícito entre archivos** — cambiarlos en un lugar sin avisar a los demás rompe la integración silenciosamente (no da error, simplemente el otro archivo deja de encontrar los datos).

## Mapa de carpetas

| Carpeta | HTML | Doc (`.md`) | Qué es | Clave(s) `localStorage` |
|---|---|---|---|---|
| `Dashboard/` | `dashboard.html` | [`Dashboard/readme_dashboard.md`](Dashboard/readme_dashboard.md) | Panel central: agrega datos de todas las apps, slide "Mi Día" en vivo | *(no escribe, solo lee las de las demás)* |
| `Coach/` | `Coach_v2.html` | [`Coach/readme_coach_v2.md`](Coach/readme_coach_v2.md) | Coach de vida/negocio: Plan Maestro, rutina diaria completa, radar de habilidades, legal | `coach-theme`, `radarp_*` (12), `coach_rutina_v1` |
| `CuidadoPersonal/` | `cuidadopersonal.html` | [`CuidadoPersonal/readme_cuidadopersonal.md`](CuidadoPersonal/readme_cuidadopersonal.md) | Shell con 4 subtabs: Skincare y Cabello nativas | `skincare_v1`, `cabello_v1` |
| `CuidadoPersonal/` | `salud.html` | [`CuidadoPersonal/readme_salud.md`](CuidadoPersonal/readme_salud.md) | Nutrición, ejercicio ligero, peso/medidas — incrustada por iframe en el shell | `misalud_v1` |
| `CuidadoPersonal/` | `ejercicio.html` | [`CuidadoPersonal/readme_ejercicio.md`](CuidadoPersonal/readme_ejercicio.md) | Rutina de gimnasio completa — incrustada por iframe en el shell | `mirutina_v1` |
| `Finanzas/` | `Finanzas.html` | [`Finanzas/readme_finanzas.md`](Finanzas/readme_finanzas.md) | Finanzas personales reales, plan GBM, BTC, deudas | `finanzasmx_v2` |
| `Proyectos/` | `proyectos.html` | [`Proyectos/readme_proyectos.md`](Proyectos/readme_proyectos.md) | Proyectos personales, tareas, tiempo invertido | `proyectos_v1` |

**Fuera de este ecosistema** (no se documentan archivo por archivo aquí, no comparten datos con las apps de arriba):
- `Aleman/` — 35+ páginas estáticas de estudio de alemán (A1/A2), sin `localStorage`, sin interconexión con el resto.
- `Entrevistas/` — app de preparación de entrevistas técnicas automotrices, con su propio `CLAUDE.md`/`estructura.md` ya documentados dentro de esa carpeta; usa `localStorage['theme']` y `['sidebar-collapsed']`, ajenas a las claves de la tabla de arriba.

**Carpetas eliminadas** (ver historial de git para detalle): `Salud/`, `Ejercicio/` (contenido movido a `CuidadoPersonal/`), `Animo/`, `Habitos/`, `Sueno/`, `Tiempo/`, `Vehiculo/`, `Social/`, `Aprendizaje/` (retiradas del proyecto el 2026-07-29 a petición de Adán). El score de aprendizaje/skills del Dashboard y el bloque de habilidad diario de Coach ya no dependen de esta app — siguen vivos como contenido de referencia dentro de `Coach/Coach_v2.html → #aprendizaje` únicamente.

## Registro maestro de claves `localStorage`

| Clave | Dueña (quien escribe) | Quién más la lee |
|---|---|---|
| `finanzasmx_v2` | `Finanzas/Finanzas.html` | `Dashboard/dashboard.html` |
| `misalud_v1` | `CuidadoPersonal/salud.html` | `Dashboard/dashboard.html` |
| `mirutina_v1` | `CuidadoPersonal/ejercicio.html` | `Dashboard/dashboard.html` (`D.gym`, solo `sesiones`/`metas.frecuencia`, desde 2026-07-30) |
| `skincare_v1` | `CuidadoPersonal/cuidadopersonal.html` | `Dashboard/dashboard.html` |
| `cabello_v1` | `CuidadoPersonal/cuidadopersonal.html` | `Dashboard/dashboard.html` |
| `proyectos_v1` | `Proyectos/proyectos.html` | `Dashboard/dashboard.html` |
| `coach_rutina_v1` | `Coach/Coach_v2.html` | `Dashboard/dashboard.html` |
| `coach-theme` | `Coach/Coach_v2.html` | *(nadie más — solo tema visual)* |
| `radarp_{id}` × 12 | `Coach/Coach_v2.html` | *(nadie más — el radar del Dashboard usa sus propios valores base duplicados, no lee estas claves)* |

`Dashboard/dashboard.html` es el único archivo que lee prácticamente todo; ningún otro archivo lee datos de otro (excepto el caso especial de abajo). Si agregas una app nueva o una clave nueva, decide explícitamente si el Dashboard debe leerla (`loadAll()`) y actualiza esta tabla.

## Ramificaciones — cómo se conectan los archivos entre sí

1. **`Dashboard/dashboard.html` agrega todo.** Lee las 8 claves marcadas arriba directamente vía `localStorage.getItem`, sin backend ni API. Cualquier cambio en la *forma* de los datos de una app (agregar/quitar un campo, renombrar un array) puede romper silenciosamente algún cálculo del Dashboard — revisar su `.md` antes de cambiar la forma de `S`/`D` en cualquier app.
2. **`CuidadoPersonal/cuidadopersonal.html` incrusta dos apps enteras por `<iframe>`** (`salud.html`, `ejercicio.html`) en vez de fusionar su código, porque ambas comparten nombres de función/variable globales entre sí y con el shell — concatenarlas rompería todo. El shell y las apps incrustadas comparten `localStorage` por el mismo motivo de origen `file://` compartido (ver arriba). Detalle en [`readme_cuidadopersonal.md`](CuidadoPersonal/readme_cuidadopersonal.md).
3. **`Coach/Coach_v2.html` y `Dashboard/dashboard.html` duplican 4 estructuras de datos a mano** porque no hay build step que permita compartir un módulo JS entre dos documentos HTML distintos: el horario completo de la rutina (`RUTINA_TASKS`, 63 tareas), las 4 fechas del Plan Maestro (`PHASES`/`fases`), los 12 valores base del radar de habilidades (`SK`), y (desde 2026-07-30) el contenido de las 5 prioridades de aprendizaje (`APRENDIZAJE` en Dashboard ↔ `#aprendizaje` en Coach — primer paso, hábito y recursos de Datos/Ventas/Marketing/Finanzas/IA). **Estas son las estructuras más sensibles a romperse por edición asimétrica** — el detalle y el comando de verificación exacto viven en [`Dashboard/readme_dashboard.md`](Dashboard/readme_dashboard.md) → "Datos duplicados".
4. **Coach_v2.html, Finanzas.html, proyectos.html y cuidadopersonal.html enlazan de vuelta al Dashboard**, y el Dashboard enlaza a todas ellas desde su barra superior fija (`renderQuickApps()`, ver `Dashboard/readme_dashboard.md`) — ya no desde un slide dedicado. Si se agrega una app nueva, agregarle también el enlace de vuelta y una píldora en esa barra.
5. **Convención de fecha universal**: toda la aplicación usa `const today = () => new Date().toISOString().slice(0,10)` (UTC) como clave de fecha `'YYYY-MM-DD'` — **no** fecha local. Si algún archivo nuevo usa `getFullYear()/getMonth()/getDate()` en su lugar, sus fechas se van a desalinear con las demás apps cerca de medianoche en horario de CDMX (UTC-6). Ya pasó una vez (rutina de Coach, corregido el 2026-07-29) — verificar siempre contra este patrón.

## Convenciones de diseño compartidas (no todas las apps las usan todas)

- **Paleta oscura común**: `--bg:#05050a/#060614/#08080a` (varía ligeramente por app), acentos `--g` verde `#00e87a`, `--r` rojo `#ff3b6b`/`#ff5c5c`, `--b` azul `#3b82f6`, `--p`/`--pu` morado `#b06eff`, `--w`/`--accent` dorado/amarillo. Tipografía `Inter` (Google Fonts) + `Space Grotesk`/monoespaciada para cifras. Solo `Coach_v2.html` soporta tema claro además del oscuro.
- **Patrones de UI repetidos**: sidebar fija de 245px con `.nav-item`/`.nav-label` (Salud, Ejercicio, Finanzas, Proyectos), `.card`/`.card-title`/`.card-val`, `.mo`/`.modal` (modal genérico), `.conf`/`.conf-box` (confirmación de borrado genérica `askDel/doConf/closeConf`), `.toast` (notificación flotante), `.pbar`/`.pfill` (barra de progreso). `CuidadoPersonal/cuidadopersonal.html` usa tabs superiores en vez de sidebar porque aloja 4 apps a la vez.
- **`uid()`**: `Date.now().toString(36) + Math.random().toString(36).slice(2)` — igual en todas las apps que generan IDs.
- **Sin dependencias externas más allá de**: Google Fonts (todas), Chart.js 4.4 vía CDN (Dashboard, Salud, Ejercicio, Finanzas, Proyectos — **no** Coach ni CuidadoPersonal-shell, que dibujan sus gráficas/radares a mano en `<canvas>`).
- **Exportar/Importar JSON**: la mayoría de las apps (Finanzas, Salud, Ejercicio, Proyectos) tienen un botón de exportar respaldo JSON en la barra lateral. Coach, Skincare y Cabello **no** lo tienen todavía.

## Cómo mantener esto al día

Cuando toques cualquier `.html` de la tabla de arriba:
1. Actualiza su `.md` correspondiente en el mismo cambio (estructura, funciones, modelo de datos si cambió).
2. Si el cambio afecta una clave de `localStorage` que otro archivo lee (ver "Registro maestro" arriba), actualiza también ese otro archivo y su `.md`.
3. Si el cambio toca una de las 3 estructuras duplicadas entre Coach y Dashboard (sección "Ramificaciones" #3), replica el cambio en ambos archivos — no hay atajo, hay que copiar a mano.
4. Si agregas una carpeta/app nueva, agrégala a la tabla "Mapa de carpetas" y al "Registro maestro de claves" de este archivo.
