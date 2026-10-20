# entrevistas.html — Interview Prep (Automotive SW Engineering)

App de una sola página (HTML+CSS+JS, sin backend): temario de preparación técnica para entrevistas
de Automotive Software Engineering. **229 temas** en 22 módulos —arquitectura, protocolos
(CAN/LIN/ETH/XCP), diagnóstico (UDS/OBD), herramientas (CANoe/CAPL/dSPACE), estándares (ISO 26262,
ASPICE, MISRA), Python (fundamentos, POO, testing, cheat sheet), Git, DevOps, Linux, metodologías,
ISTQB (CTFL y CT-GenAI), APIs, IA con API, Claude Code, diseño de sistemas, estrategia de entrevista,
coding challenges y la preparación de Wayve—, cada uno con notas, tags, quizzes y contenido
enriquecido.

**Su prompt**: la clave `entrevistas` de [`prompts-paginas.js`](../Dashboard/prompts-paginas.js) —el icono de la brújula, arriba a la izquierda—. Es el especialista que gobierna cada cambio de esta página (`CLAUDE.md` → Regla 6).

> Referencia, no diario. La estructura de archivos (qué objeto vive en cada `js/data-*.js`, orden
> de carga, convenciones `*_RICH`) está en [`CLAUDE.md`](CLAUDE.md) de esta carpeta y no se repite
> aquí. `estructura.md` es un outline temático sin conexión con el código.

**Fuera del ecosistema principal**: no comparte `localStorage` con Finanzas/Coach/CuidadoPersonal.
Su vínculo con el Dashboard es de ida: carga de ahí `../Dashboard/sin-zoom.js` y la brújula del prompt, y
el Dashboard enlaza aquí desde la meta ISTQB CT-GenAI. El Dashboard no lee ningún tema.

## Responsivo

Todo el CSS vive en `styles.css` (`entrevistas.html` no tiene `<style>` propio). Dos breakpoints:
**900 px** (no 800: el sidebar fijo mide 290 px y en un iPad de 820 dejaría 530 de contenido) y
**480 px**.

- **Header** con `flex-wrap:wrap`; a 900 se oculta el subtítulo del logo; a 480 el buscador y el
  bloque de progreso/tema/reset pasan a su propia fila.
- **Sidebar como drawer** reutilizando el toggle que ya existía: `#sidebar-toggle` →
  `toggleSidebar()` (`js/ui.js`) alterna `data-sidebar-collapsed` en `<html>` (persistido en
  `localStorage['sidebar-collapsed']`). En desktop el atributo reduce el sidebar a `width:0`; el
  `@media(max-width:900px)` **invierte su efecto**: sin atributo el sidebar queda fuera de pantalla
  (`translateX(-100%)`), con él se desliza como overlay. Mismo botón, misma función, mismo
  `localStorage`.
- **Grids de 2-3 columnas → 1** (`.jd-grid`, `.two-col`, `.error-compare`, `.cs-grid`) con
  `> * { min-width: 0 }` porque los grid items tienen `min-width:auto` y no se encogen.
- **Trampa**: `wayve-algo-approach` (`js/data-coding.js`) inyecta su propio `<style>` en `#content`
  en tiempo de ejecución, **después** de `styles.css`; a igual especificidad gana por orden, así que
  sus overrides responsivos en `styles.css` llevan `!important`.
- **Tablas anchas**: `.cs-table` ya tenía `.cs-table-wrap{overflow-x:auto}`; `.kv-table` lleva
  `display:block;overflow-x:auto` desde 900 (las filas conservan su `display` de tabla).
- `.tab-bar` con `flex-wrap:wrap`; `.topic-page` baja de `36px 48px` a `22px 20px` y `16px 14px`.

Se verifica recorriendo los 229 temas con `go(id)` en iPad (820×1180) e iPhone 15 Pro (393×852):
`scrollWidth - clientWidth` = 0 en todos y cero errores de consola.

## Deep-link por hash

`irDesdeHash()`, al final de `js/ui.js`, acepta `#<id>` de tema (`#istqb-ch4`) y `#<data-mod>`
(`#istqb`, abre el primer capítulo del módulo). **Desde fuera conviene la segunda**: los ids de
tema cambian al reordenar un módulo, el `data-mod` no. Antes de `go()` despliega el módulo y hace
`scrollIntoView` del enlace en el sidebar; corre al arrancar y en `hashchange`. Sin hash, la app se
queda en la portada. Un hash desconocido devuelve `false` y no toca nada. El Dashboard enlaza aquí
desde la meta ISTQB CT-GenAI.

## La portada — «Tu preparación, hoy»

Es `#welcome`, y la pinta `renderInicio()` (`js/ui.js`) con el avance real (`study-done-v2`); se
repinta cada vez que marcas un tema. Arriba, **tus prioridades** (`INICIO_PRIORIDAD`: el CT-GenAI de
Mis Metas, los fundamentos de Python, POO, pytest, coding y conducta): las tres primeras que aún tienen
temas pendientes, cada una con su barra y el **siguiente tema sin estudiar**, en el orden del panel.
Abajo, **todos los módulos** con su barra; tocar uno abre su siguiente tema. Se vuelve a ella con el
logo o con *Tu preparación, hoy*, arriba del panel (`irInicio()`).

La preparación de **Wayve** (julio 2026) queda al final del panel, en *Archivo*, plegada: la app ya
no abre en su plan de «1 día para la entrevista»; esa fecha pasó.

## El enlace al Dashboard

Es un botón `.btn-theme` (`#btnVolverDash`, 🚀) junto al de tema en `.header-right`: hereda tema y
estilos sin CSS propio. Nada flota ni se encima sobre el buscador.

## Python, explicado antes de la jerga

Los 41 temas de Python (`pyfund`, `poo`, `testing`, `pycheat`) abren, bajo el título, con su explicación en
español llano: un bloque `.py-intro` con **Qué es** (con analogía), **Para qué sirve** (cuándo lo vas a
escribir de verdad), **Lo que importa** (lo que más se malentiende o preguntan en entrevista) y, al final,
**Resumen técnico** —el `hint` del tema, que sirve de índice a quien ya lo conoce—. Lo arma `introPython()`
(`js/ui.js`) dentro de `buildPages()` con `PY_INTRO` de `js/data-python-intro.js`, que `entrevistas.html` carga
antes de `ui.js`. Es un archivo aparte para no tocar los template strings de `data-*.js`; un tema sin entrada
no lleva bloque. Usa las variables de la app (`--accent`, `--border`, `--text-muted`), así que sigue al tema
claro y al oscuro; bajo 480 px la etiqueta va encima del texto. Medido en los 41 temas a 1600, 820 y 390 px:
todos con su bloque y sin desplazamiento horizontal.

`study-done-v2` (`{id: true/false}`) lo escribe solo esta app, con `toggleDone()`.
