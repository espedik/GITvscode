# entrevistas.html — Interview Prep (Automotive SW Engineering)

Aplicación web de una sola página (HTML+CSS+JS, sin backend) — temario de preparación técnica para entrevistas de Automotive Software Engineering: arquitectura automotriz, protocolos (CAN/LIN/Ethernet/XCP), diagnóstico (UDS/OBD-II), herramientas (CANoe/CAPL/dSPACE), estándares (ISO 26262/21434, ASPICE, MISRA), Python (fundamentos, POO, testing), Git/GitHub, DevOps/Docker, Linux, metodologías, ISTQB (CTFL y CT-GenAI), APIs, IA/LLMs, Claude Code, y una sección especial de preparación para la entrevista de Wayve. 229 temas en total, cada uno con notas, tags, quizzes y contenido enriquecido (diagramas, tablas, code blocks, cheat sheets).

**Fuera del ecosistema principal** (igual que `Aleman/` y `Vestimenta/`, ver `../README.md` → "Mapa de carpetas" y `readme_vestimenta.md`) — no comparte `localStorage` con Finanzas/Coach/CuidadoPersonal/Dashboard. **Sí tiene un consumidor de solo lectura desde el 2026-08-07**: el Dashboard extrae (no scrapea en vivo) el contenido real de los 229 temas para su slide "Entrevista del día" — ver `../Dashboard/readme_dashboard.md` → "Entrevista del día — contenido real, nativo, sin iframe" y la sección nueva más abajo.

## Archivos

La documentación técnica de la estructura (qué objeto vive en cada `js/data-*.js`, orden de carga de `<script>`, convenciones de los objetos `*_RICH`) ya está en `CLAUDE.md` en esta misma carpeta — no se duplica aquí. `estructura.md` es un outline temático de referencia, no conectado al código. Este archivo (`readme_entrevistas.md`) es el registro human-readable de cambios, siguiendo el mismo formato `readme_*.md` fechado que usa el resto del ecosistema (`Vestimenta/readme_vestimenta.md`, etc.) — antes de esta fecha `Entrevistas/` no tenía uno, solo `CLAUDE.md`.

## Responsivo — iPad / iPhone 15 Pro (2026-08-03)

No existía ningún `@media` en todo el proyecto (`entrevistas.html` no tiene `<style>` propio, todo el CSS vive en `styles.css`) — el layout de sidebar fijo de 290px + header de una sola fila + varios grids de 2-3 columnas se rompía por completo en tablet/móvil. Todos los cambios de esta sección son exclusivamente en `styles.css`, agregados al final del archivo; no se tocó `entrevistas.html` ni ningún `js/*.js` salvo por overrides de CSS con `!important` (ver más abajo), sin tocar lógica, nombres de función/variable ni claves de `localStorage`.

**Breakpoint principal en 900px, no 800px**: el sidebar fijo mide 290px, así que en un iPad de 820px de ancho quedarían solo 530px de contenido si el sidebar se mantuviera empujando el layout como en desktop — insuficiente para los grids de 2-3 columnas del contenido. Por eso el sidebar pasa a overlay y los grids se apilan un poco antes (900px) que el resto del ecosistema. Un segundo breakpoint en 480px compacta más para iPhone.

- **Header** (`header{display:flex}` sin wrap): logo + buscador + barra de progreso + botones no caben en una sola fila ni en iPad ni en iPhone. Se agregó `flex-wrap:wrap` + padding/gap reducidos; el subtítulo del logo (`.logo h1 small`) se oculta a 900px por ser decorativo; a 480px el buscador y el bloque de progreso/tema/reset pasan a su propia fila completa (`flex-basis:100%`) para no verse apretados.
- **Sidebar: de panel fijo en flujo a drawer off-canvas, reutilizando el toggle que ya existía**. La app ya tenía un botón ☰ (`#sidebar-toggle`) y una función `toggleSidebar()` en `js/ui.js` que alternan el atributo `data-sidebar-collapsed` en `<html>` (persistido en `localStorage['sidebar-collapsed']`) — en desktop ese atributo reduce el sidebar a `width:0`. En vez de tocar JS para inventar un mecanismo nuevo, el `@media(max-width:900px)` **reutiliza el mismo atributo pero invierte su efecto solo dentro del media query**: por defecto (sin el atributo) el sidebar queda con `position:fixed` fuera de pantalla (`transform:translateX(-100%)`); con `data-sidebar-collapsed="true"` se desliza a la vista como overlay (`transform:translateX(0)`, con sombra, por encima del contenido). Es decir, en móvil el primer tap en ☰ **abre** el menú en vez de "colapsar" algo que ya estaba empujando el contenido (eso solo pasa en desktop, donde el sidebar sigue en flujo). Mismo botón, misma función JS, mismo `localStorage`, comportamiento adaptado solo con CSS. Verificado con Playwright: el tap en `#sidebar-toggle` muestra el drawer con overflow=0 tanto en iPad como en iPhone, y un segundo tap lo cierra.
- **Grids de 2-3 columnas → 1 columna** (trampa de CSS Grid con hijos que fuerzan overflow): `.jd-grid`, `.two-col`, `.error-compare`, `.cs-grid` (todas `grid-template-columns:1fr 1fr` en `styles.css`) pasan a `1fr` en el breakpoint de 900px, con `> * { min-width: 0 }` como red de seguridad (los grid items tienen `min-width:auto` implícito y no se encogen aunque la columna sea `1fr`).
- **Trampa — grids definidos en un `<style>` embebido dentro de un archivo `.js`**: la página "Cómo resolver cualquier coding challenge" (`wayve-algo-approach`, en `js/data-coding.js`) inyecta su propio `<style>` con clases exclusivas (`.approach-summary` a `repeat(6,1fr)`, `.pattern-row` a 4 columnas, `.py-tool-grid`, `.ec-grid` a 3 columnas, `.optim-head`). Ese `<style>` se inserta en el DOM (dentro de `#content`) en tiempo de ejecución vía `buildPages()`, **después** de que `styles.css` ya se cargó — con la misma especificidad, un selector normal en `styles.css` pierde por orden de aparición en el documento. Se resolvió agregando los overrides responsivos en `styles.css` con `!important` (mismo principio que un `style=""` inline: hace falta ganar por peso, no por orden), sin necesidad de editar `data-coding.js`. Es la única `.js` afectada indirectamente, y solo su CSS incrustado — cero cambios de lógica.
- **Tablas anchas**: `.cs-table` ya tenía su propio wrapper `.cs-table-wrap{overflow-x:auto}` del diseño original (cheat sheet). `.kv-table` (usada en decenas de páginas para "Ejemplo → Resultado") no tenía wrapper — se le puso `display:block;overflow-x:auto` directo en la regla `.kv-table` a partir de 900px: `thead`/`tbody`/`tr`/`td` conservan su `display` por defecto del user-agent stylesheet aunque el `<table>` sea `display:block`, así que se sigue viendo como tabla, solo que ahora es su propio contenedor de scroll en vez de forzar el ancho de toda la página.
- **`.tab-bar` con `flex-wrap:wrap`** a partir de 900px: se usa en decenas de páginas (`js/data-*.js`) para navegación entre sub-pestañas dentro de un tema, sin `flex-wrap` en la regla base — inofensivo agregarlo (si ya cabían en una fila, no cambia nada; si no cabían, ahora bajan de línea en vez de desbordar).
- **Padding de contenido reducido**: `.topic-page{padding:36px 48px}` baja a `22px 20px` (900px) y `16px 14px` (480px); `.topic-page.fullwidth` (el cheat sheet) baja a `12px 14px`.

**Verificación**: Playwright headless en iPad (820×1180) e iPhone 15 Pro (393×852, `isMobile:true, hasTouch:true`). Se recorrieron **los 229 temas** (`Object.keys(T)` desde la consola de la página, navegando con `go(id)` directamente — no solo una muestra) en ambos viewports: `document.documentElement.scrollWidth - clientWidth` fue 0 en los 229×2, cero errores de consola/página. Además, sobre 13 páginas de muestra elegidas por tener el layout de mayor riesgo (grids 2-col, la página con `<style>` embebido, cheat sheet, tablas `kv-table`/`cs-table`, `tab-bar` con varias pestañas) se probó también hacer click en cada botón de pestaña interno — sin overflow en ninguna combinación. Se probó también el buscador (`#search`) con texto y el toggle de tema claro/oscuro, ambos sin overflow. Capturas en `shots_responsive/entrevistas_*` de la sesión (welcome, sidebar abierto, cheat sheet, páginas con grid, modo oscuro, en ambos viewports).

## Nuevo consumidor de solo lectura — `Dashboard/dashboard.html` → "Entrevista del día" (2026-08-07)

Adán pidió que el Dashboard mostrara "un tema de entrevistas distinto cada día", igual de completo y visualmente cuidado que ya se había hecho para `Aleman/` — ver el detalle completo del pedido y la implementación en [`../Dashboard/readme_dashboard.md`](../Dashboard/readme_dashboard.md) → "Entrevista del día — contenido real, nativo, sin iframe". Resumen desde el lado de `Entrevistas/`, que es lo que le concierne a este archivo:

- **`_generar-datos-dashboard.js`** (nuevo, en esta carpeta) — script de Node de un solo uso repetible, **sin dependencias que instalar** (no usa Playwright, a diferencia del equivalente en `Aleman/`): ejecuta `js/core.js` + los 19 `js/data-*.js` en una sandbox (`vm` de Node) y lee `T` + todos los objetos `*_RICH` resultantes — no hace falta un navegador porque el contenido de cada tema ya es HTML escrito a mano en esos archivos, no HTML renderizado que haya que scrapear.
- **Es de solo lectura**: el script nunca escribe en ningún archivo de `Entrevistas/`, solo lee `core.js`/`data-*.js`/`styles.css` y escribe el resultado en `../Dashboard/entrevistas-data.js`. No cambia nada del comportamiento de `entrevistas.html` en sí.
- **Si se agrega, quita o edita un tema aquí** (nueva entrada en `T`, contenido nuevo en un `*_RICH`, o una clase de contenido nueva en `styles.css`), el Dashboard no se entera solo — hay que volver a correr `node Entrevistas/_generar-datos-dashboard.js` para que `entrevistas-data.js` quede al día. El script mismo verifica que todo id de `T` tenga contenido `RICH` correspondiente y viceversa, y aborta con error si detecta un desajuste (en vez de generar datos incompletos en silencio).
- El único caso especial que el script conoce explícitamente es el `<style>` embebido de `wayve-algo-approach` en `js/data-coding.js` (ver "Trampa — grids definidos en un `<style>` embebido..." arriba) — lo extrae y lo pone a disposición del Dashboard globalmente (no solo el día que ese tema sea el elegido). Si en el futuro se agrega OTRO `<style>` embebido en algún `data-*.js`, hay que revisar `_generar-datos-dashboard.js` para que también lo detecte (hoy busca ese bloque por el id de tema específico, `'wayve-algo-approach'`, no de forma genérica).
- **Segunda ronda, mismo día — el script también reescribe colores y limpia contenido**, no solo copia: `--white`/`--border` de `styles.css` se remapean al vidrio del Dashboard (`var(--card)`/`var(--card-br)`) en vez de a los colores propios de Entrevistas, y los 98 `.notes-card` que traen el placeholder genérico *"Agrega aquí tus notas sobre X..."* se quitan (las 26 que sí traen un consejo real se conservan). Ninguno de estos dos cambios toca `Entrevistas/` — siguen viviendo solo dentro de `_generar-datos-dashboard.js` y afectan únicamente lo que termina en `Dashboard/entrevistas-data.js`; `entrevistas.html` sigue mostrando el `.notes-card` genérico y sus propios colores blancos/azul-marino sin cambios. Ver el detalle completo (incluido un bug real de `backdrop-filter` en listas largas de quiz) en `../Dashboard/readme_dashboard.md` → "Segunda ronda — vidrio del Dashboard + limpieza de contenido".

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

## El enlace al Dashboard vive en la `.header-right` (2026-08-18)

*"hay botones dashboard que ni si quiera van acorde a la interfaz del html, osea sobre ponen a otros botones y eso esta mal, debe ser parte de la interfaz de todos"*.

El bloque flotante `#btnVolverDash` (`position:fixed`, fondo oscuro propio, z-index 9999) que se había insertado esta mañana **se encimaba sobre el buscador y el botón "↺ Reset"** y no seguía el tema de este archivo. Se retiró junto con su `<style>`: ahora el enlace es un botón con el 🚀 junto al de tema, con la clase `.btn-theme` que ya usan sus vecinos, así que hereda tema y estilos sin CSS nuevo.

Detalle completo y medición en `../Dashboard/readme_dashboard.md` → "El botón de Dashboard deja de flotar".