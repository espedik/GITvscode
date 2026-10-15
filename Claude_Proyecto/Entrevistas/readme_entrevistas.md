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
Su único vínculo es el Dashboard, que carga `../Dashboard/sin-zoom.js` desde aquí y **lee** su
contenido a través del generador (abajo).

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
Mis Metas, el Python de Mi Día, POO, pytest, coding y conducta): las tres primeras que aún tienen
temas pendientes, cada una con su barra y el **siguiente tema sin estudiar**, en el orden del panel.
Abajo, **todos los módulos** con su barra; tocar uno abre su siguiente tema. Se vuelve a ella con el
logo o con *Tu preparación, hoy*, arriba del panel (`irInicio()`).

La preparación de **Wayve** (julio 2026) queda al final del panel, en *Archivo*, plegada: la app ya
no abre en su plan de «1 día para la entrevista»; esa fecha pasó.

## El enlace al Dashboard

Es un botón `.btn-theme` (`#btnVolverDash`, 🚀) junto al de tema en `.header-right`: hereda tema y
estilos sin CSS propio. Nada flota ni se encima sobre el buscador.

## Lo que viaja al Dashboard — `_generar-datos-dashboard.js`

Script de Node **sin dependencias**: ejecuta `js/core.js` + los `js/data-*.js` en una sandbox
(`vm`), lee `T` y los `*_RICH`, y escribe en `../Dashboard/` lo único que el Dashboard lee de aquí, en dos
archivos: `entrevistas-data.js`, el catálogo (`ENTREVISTA_TEMAS` y `PY_MOD_LABEL`, 10 KB), que carga al
arrancar, y `entrevistas-temas.js`, el HTML de cada tema con su CSS (`ENTREVISTA_CONTENT` y `ENTREVISTA_CSS`,
~1 MB), que solo carga la ventana de Python de Mi Día cuando se abre. **Es de solo lectura sobre esta
carpeta.** Todo lo arma `generar()`, que devuelve los dos archivos sin escribirlos: corrido a mano los
escribe, y el control 34 de `../Dashboard/verificar-sincronia.js` lo llama para comparar lo que escribiría con
lo que hay.

**Lo que el Dashboard usa** es la tarjeta *Hoy aprendes* de Mi Día: nombra el tema de Python del día
(`entrevistaTemaHoy()`, en el orden de Coach, saltando los que ya estudiaste, con la etiqueta de
`PY_MOD_LABEL`) y, al tocarla, lo abre entero en su ventana (`abrirPython()`): la explicación en llano primero
y después el contenido, con sus pestañas y su quiz; *Abrir en Entrevistas →* lo abre aquí por hash
(`entrevistas.html#<id>`). **`study-done-v2` lo escriben las dos**: esta app con `toggleDone()` y la ventana
con «Marcar estudiado», en la misma forma (`{id: true/false}`); el Dashboard saca de ahí cuántos llevas y si
el de hoy ya está. Si cambia su forma, hay que revisar `pythonHoyHtml()` y `pythonEstudiado()` del Dashboard.

**Si se agrega, quita o edita un tema aquí, el Dashboard no se entera solo**: hay que correr
`node Entrevistas/_generar-datos-dashboard.js` (el control 34 lo avisa al final del turno). El script aborta
si un id de `T` no tiene contenido `RICH` o viceversa, y si algún tema de Python se queda sin explicación.

- **Solo viaja Python**: `MODULOS_DASHBOARD = ['pyfund','poo','testing','pycheat']` — **41 temas**
  (13 + 7 + 20 + 1), los que la propia app agrupa bajo ese nombre en su menú. Filtrar en origen
  deja el archivo en ~1 MB en vez de 2.5 y el Dashboard no necesita lógica: recibe 41 y los ordena
  como dice Coach —Testing primero, con pytest antes que unittest— (`aprendeOrdenPython()`, ver *Lo decide Coach* en `readme_dashboard.md`). Para incluir otro módulo, añadir su id y volver a correr. `testing` es
  Python de verdad (unittest, pytest, mock, fixtures, coverage), no testing genérico.
- **`PY_MOD_LABEL`** sale de los `m-label` del menú de `entrevistas.html`, sin el prefijo
  "Python —": la tarjeta ya dice que es Python.
- **El CSS se remapea al Dashboard**: `--white`/`--border` → `var(--card)`/`var(--card-br)`,
  `--accent` → `var(--ac1)` (la ventana de Python lo fija en su cian), `--text-muted` → `var(--text2)`, `--tag-*` → el gris de las píldoras;
  las reglas se prefijan con `.en-content`. **Los colores semánticos se quedan fijos** (verde de
  correcto, ámbar de aviso, fondo oscuro de código): ahí el color es la información. **No se
  declara `--text:var(--text)`** dentro de `.en-content`: es una autorreferencia, el CSS la trata
  como ciclo y el texto se queda sin color; las variables se heredan solas.
- Los `.notes-card` con el placeholder genérico *"Agrega aquí tus notas…"* se quitan; los que
  traen un consejo real se conservan. `entrevistas.html` no cambia.

### Los 41 temas de Python se explican antes de la jerga

`js/data-python-intro.js` (`PY_INTRO`) tiene una entrada por tema con tres campos en español
llano —**Qué es** (con analogía), **Para qué sirve** (cuándo lo vas a escribir de verdad) y
**Lo que importa** (lo que más se malentiende o preguntan en entrevista)— que el generador antepone
al contenido como bloque `.py-intro`, estilado con las variables del Dashboard. Es un archivo
aparte para no tocar los template strings de `data-*.js`; si se borrara, el generador sigue (lo
comprueba con `typeof`).

**El resumen técnico no se tira, se mueve**: el `hint` original sirve como índice para quien ya
conoce el tema, así que baja al final como cuarta fila, "Resumen técnico"; el subtítulo bajo el
título pasa a ser la primera frase de "Qué es" (plano, cortado en el primer punto, ≤170
caracteres).
