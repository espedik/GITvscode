# vestimenta.html — Mi Guía de Vestimenta

Aplicación web de una sola página (HTML+CSS+JS, sin backend) — guía de guardarropa en dos mitades: **qué comprar** (básicos, chaquetas, zapatos, accesorios, con precio y link) y **cómo combinarlo** (la matriz de color y las 48 combinaciones que salen de ella). **Nueva el 2026-08-01**, pedido explícito de Adán: *"hazme un html y proyecto de vestimenta, debes darme muchas opciones de que comprar, basicos chaquetas, zapatos, y ademas para cada ocacion... busca en alguna web que tenga una buena base de fotos y descargarlas y ponlas en el folder en especifico"*.

**Fuera del ecosistema principal** (igual que `Aleman/` y `Entrevistas/`, ver `../README.md` → "Mapa de carpetas") — no comparte datos con Finanzas/Coach/CuidadoPersonal/Dashboard, es una guía de referencia personal independiente.

## Archivos

| Archivo | Qué es |
|---|---|
| `vestimenta.html` | Shell: sidebar, topbar, CSS, cascarón de `<div id="content-root">` |
| `vestimenta_data.js` | Todo el contenido: `BASICOS`, `CHAQUETAS`, `ZAPATOS`, `ACCESORIOS` (arrays de items comprables), `COLORIMETRIA` (la matriz de color y las reglas de ocasión), `OCASIONES` (solo ejercicio y bodas), `FASES` (plan de compra) |
| `vestimenta_app.js` | Render (`RENDERS`), navegación (`nav()`), checklist (`toggleCheck()`), tema (`toggleTheme()`), las 48 combinaciones (`combLista()`) |

## Sin fotos, a propósito

**No hay una sola imagen en la app.** Las 35 que había se borraron, con su manifiesto.
Adán (2026-09-09): *"osea queria que borraras todo y me dieras buenas combinaciones, por
que lo que tenemos no me gusta nada"*, y antes: *"en vez de buscar imagenes feas por que no
hay ninguna bonita"*. Dos rondas de sourcing con licencia libre no habían dado un catálogo
que se viera bien, y para lo que la app tiene que resolver —qué me pongo con qué— la foto
de una prenda genérica no aporta: lo que decide una combinación es el color.

Lo que sustituye a la foto es el **color puro**: en Colorimetría, una muestra por prenda;
en Combinaciones, dos bloques apilados en el orden en que se ven. El fondo carbón de la app
ayuda — un color de tela se lee mucho mejor sobre carbón que sobre blanco.

Las fichas de compra (Básicos, Chaquetas, Zapatos, Accesorios) siguen ahí **con sus precios
y sus links verificados uno por uno**, ya como texto. Eso no se tocó: es la parte que sí
servía.

## Estructura de contenido

Nueve secciones en tres grupos:

- **Principal** — 🏠 Inicio (`renderInicio()`): filosofía de guardarropa cápsula y el plan de
  compra por fases (`FASES`, 4 tarjetas), con el mismo lenguaje de «fases» que el Plan
  Maestro de `Coach/Coach.html`.
- **Qué comprar** — 👕 Básicos (8), 🧥 Chaquetas (6), 👞 Zapatos (6), ⌚ Accesorios (5).
  `renderCategoria()` pinta una rejilla de `.item-card`: nombre, para qué sirve, 2-3 tiendas
  con rango de precio en MXN (70 de 74 con link real y verificado), un tip y un checkbox
  «Ya lo tengo / lo quiero comprar». **25 items marcables**, que es lo que cuenta el sidebar.
- **Cómo combinar** — 🎨 Colorimetría (la matriz) y 🧩 Combinaciones (las 48). Es el corazón
  de la app; las dos secciones se cuentan abajo.
- **Aparte** — 🏋️ Ejercicio y 💍 Bodas (`renderOcasion(key)`, desde `OCASIONES`). Son las dos
  únicas ocasiones que **no** se resuelven eligiendo color de playera y de pantalón: una pide
  ropa técnica y la otra, traje o guayabera. Trabajo, Casual y Fiestas ya no existen como
  sección — las absorbió Combinaciones, que dice lo mismo pero con prendas concretas.
  - Cada pieza de `OCASIONES` es `{n, ids}` con los productos reales del catálogo. Varios ids
    son alternativas y basta tener uno; **`ids:[]` es una prenda que el catálogo no cubre** y
    se dibuja con recuadro punteado y «no está en tus listas» en vez de fingir que la cubre.
  - El estado del combo y el «desde $X para completarlo» son **derivados**: `precioMin(item)`
    lee los números de los rangos de `compra[].p` y toma el menor.

## Colorimetría — qué playera va con qué pantalón

**La sección que sustituye a las fotos de outfit.** Pedido de Adán (2026-09-08): *"en vez de
buscar imagenes feas por que no hay ninguna bonita dame como la colorimetria mejor para
combinar playeras de diferentes colores con pantalones en especificos"*. Elegida entre tres
maquetas: *"direccion b"*.

`COLORIMETRIA` (en `vestimenta_data.js`) son **6 pantalones × 16 playeras = 96 celdas**, cada
una con veredicto (`s` va siempre · `o` con cuidado · `n` evítalo) **y el porqué escrito**.
`renderColorimetria()` pinta la matriz con las playeras en **filas** y los pantalones en
columnas — al revés no cabe: 16 columnas no entran ni en escritorio.

**El veredicto es un punto, no una palabra**: son 96 celdas y leer 96 etiquetas no es leer. La
forma lo dice además del color —círculo lleno, aro y raya—, así que se distingue en blanco y
negro y con cualquier daltonismo. El semáforo usa los acentos que la app ya tiene (`--g`,
`--w`, `--r`), no colores nuevos. El porqué de cada celda vive en el `title`, donde no
estorba; en táctil no hay `title`, y por eso el subtítulo dice «en escritorio» en vez de
prometer algo que el teléfono no cumple.

**Los hex son de TELA, no de pantalla**: un blanco de camiseta es `#F2EFE9` y no `#FFFFFF`, y
un negro lavado tira a `#1B1B1D`. Sobre el fondo carbón de esta app se leen mucho mejor que
sobre blanco — es la razón de que la sección no lleve tarjetas claras.

Los tres criterios detrás de cada veredicto son **contraste de valor** (claro contra oscuro),
**temperatura** (cálido contra frío) y **saturación** (solo una prenda saturada por outfit).
Cuando dos prendas comparten familia de color sin salto de valor, es `n`: no lee como
conjunto, lee como error — por eso playera azul marino sobre jeans azules está en rojo.

**Lo que dice la tabla, medido sobre las 96 celdas y no supuesto:**

- **Blanco, verde oliva y burdeos** van con los seis pantalones. De las tres, solo la blanca
  (`b1`) está en el catálogo.
- **Celeste** va con cinco: todos menos el jeans índigo.
- **Rojo ladrillo, rosa palo y berenjena** no tienen un solo verde. La berenjena es «evítalo»
  en los seis.
- **Playera azul marino** solo funciona sobre el chino caqui y el chino gris — los dos únicos
  pantalones que no son ni azules ni negros.
- Los seis pantalones aceptan **ocho playeras cada uno**: ninguno es «más combinable», lo que
  cambia es *cuáles* ocho.

Dos pantalones salen del catálogo (`b3` jeans azul clásico, `b4` chino caqui) y el marino lo
pide el propio tip de `b4`; los otros tres completan la semana y no están comprados. **De las
16 playeras solo existen dos en el catálogo** (`b1` blanca, `b2` negra), así que la matriz es
también la lista de qué comprar. Esa correspondencia se guarda en el campo opcional `item` de
cada entrada; hoy no se pinta, está para cuando se enlace con el checklist.

La sección **no añade estado**: no hay nada que marcar, así que el contador del sidebar sigue
contando sobre los 25 items comprables.

## Combinaciones — las 48, ya resueltas

**La sección que responde «qué me pongo».** `renderCombinaciones()` no lee una lista escrita
a mano: cruza las **48 celdas verdes** de `COLORIMETRIA.reglas` con `COLORIMETRIA.ocasiones`
y arma cada combinación al vuelo. Si un veredicto de la matriz cambia, la combinación
aparece o desaparece sola — no hay dos sitios que puedan contradecirse.

Cada tarjeta es **dos bloques de color apilados en el orden en que se ven** —playera arriba,
pantalón abajo, y el pantalón más alto porque ocupa más cuerpo—, el nombre de las dos
prendas, el porqué (el mismo texto que sale en el `title` de la matriz) y una línea por
ocasión con su zapato.

`ocasiones` son tres reglas, no una etiqueta por combinación: `pant` es qué pantalones admite
y `pl` qué playeras son de su registro (`null` = cualquiera que esté en verde).

| Ocasión | Cuántas | Zapato | Qué la define |
| --- | --- | --- | --- |
| 💼 Oficina | 27 | Derby café o mocasín | Chino marino, gris o caqui, y jeans oscuro. Sin mostaza ni terracota: funcionan de color pero bajan el registro |
| 🌙 Noche | 18 | Botines Chelsea | Pantalón oscuro siempre; el único color, arriba |
| 🙂 Diario | 40 | Sneakers blancos | Todo lo que la matriz da por bueno |

Una combinación cae en varias ocasiones a la vez (27 + 18 + 40 sobre 48 parejas) y **ninguna
de las 48 se queda sin ocasión** — comprobado contando, no supuesto. El filtro de arriba
(`combFiltro`) reparte la rejilla; `combOc` guarda cuál está activo y no persiste, porque es
una vista, no una preferencia.

Las dos cifras de la cabecera (`cpCabVest`) se **derivan**: `FASES.length` y
`combLista().length`. Estaban escritas a mano y una llegó a mentir —«5 ocasiones cubiertas»
seguía ahí después de que las ocasiones cambiaran.

## Modelo de datos — `localStorage['vestimenta_v1']`

```js
{ marcados: ['b1', 'c3', 'z1', ...] }   // ids de items marcados en el checklist (Básicos/Chaquetas/Zapatos/Accesorios)
// De aquí sale también el estado de cada pieza en los combos por ocasión: qué ya tienes y cuánto falta.
```

Solo el checklist de compra persiste — las secciones de ocasión (Trabajo/Casual/Ejercicio/Bodas/Fiestas) son de solo lectura, sin estado propio. Clave **propia de este archivo**, no compartida con el resto del ecosistema (igual que `theme`/`sidebar-collapsed` en `Entrevistas/`). El contador `X/20` del sidebar (`updateCounter()`) cuenta sobre el total de los 20 items comprables (8+6+6), no sobre las ocasiones.

**Excepción intencional**: el botón de tema (🌙/☀️) sí usa la clave compartida `coach-theme` (ver `../README.md` → "Convenciones de diseño compartidas") para que el tema visual se sincronice con el resto de apps que Adán ya usa — es solo una preferencia visual, no dato personal, así que no rompe el aislamiento de datos del resto de la app.

## Sistema de diseño

Paleta propia "premium minimalista" (cognac/carbón, `--p:#c17f4a`), **no** la paleta naranja/verde compartida de Salud/Ejercicio — es un catálogo de referencia, no parte del ecosistema de tracking de vida, así que tiene su propia identidad visual. Sigue el estándar del proyecto (2026-07-31): sin gradientes decorativos, sin glow de neón, tarjetas planas con sombra estándar. Reutiliza el patrón de sidebar de 245px + `.nav-item` que ya usan Salud/Ejercicio/Comida/Finanzas, y el truco `--ov` para que los overlays funcionen en ambos temas. Sin Chart.js — no hay gráficas, es contenido estático + un checklist simple.

## Probado

Con Chromium sobre `file://`, a **1600px y 390px**, en tema claro y oscuro: las nueve
secciones sin desbordamiento horizontal, **cero elementos `<img>`** en toda la app, cero
peticiones fallidas y cero errores de consola. Las 48 combinaciones se pintan y el filtro
devuelve 27 / 18 / 40. El checklist marca, persiste y actualiza el contador.

## Responsivo — iPad / iPhone 15 Pro (2026-08-03)

Ya existían tres breakpoints funcionales de una pasada anterior (`@media(max-width:760px)` apila `.combo-card`, `900px` pone `.fase-grid` a 2 columnas, `640px` saca el sidebar de pantalla con `transform:translateX(-100%)`), así que el trabajo fue completar lo que faltaba, no reconstruir el layout:

- **Bug real encontrado — el botón ☰ nunca se veía en móvil**: `#menuBtn` (el botón hamburguesa que abre el sidebar cuando está oculto) tenía `style="display:none;border-radius:6px"` puesto **inline** en el HTML, y no existía ningún `@media` que lo reactivara. Resultado: en cualquier pantalla ≤640px el sidebar se escondía (correcto) pero no había forma de volver a abrirlo — navegación completamente inaccesible salvo la pestaña "Inicio" ya activa al cargar. Un `@media(max-width:640px){#menuBtn{display:flex}}` normal **no alcanza** porque un inline `style` le gana a cualquier regla externa sin `!important` — se resolvió con `#menuBtn{display:flex !important}` dentro del media query. Verificado con Playwright: en iPhone 15 Pro (393px) el botón ahora es visible, el click abre `.sidebar.open`, y navegar a otra sección la vuelve a cerrar (ese comportamiento de auto-cierre ya existía en `nav()` de `vestimenta_app.js`, no se tocó JS).
- **`.main` lleva `min-width:0`**, y esto sí arregló un desbordamiento real: `.main` es flex item de `body` y, sin declararlo, un flex item crece con su contenido en vez de limitarlo. La matriz de colorimetría (mínimo 490px en móvil) empujaba la página **166px** a 390 de ancho en lugar de rodar dentro de su propio scroll. Medido antes y después. Es la misma trampa que las dos rejillas de abajo, un nivel más arriba.
- **Red de seguridad para la trampa de CSS Grid**: se agregó `.fase-grid > *, .item-grid > * { min-width: 0 }` — no había overflow activo (el `item-grid` usa `repeat(auto-fill,minmax(270px,1fr))`, que ya es responsivo por diseño, y `.combo-card` es flex, no grid), pero se deja la regla como prevención igual que en `Dashboard/Coach` por si se agregan items con texto más largo a futuro.
- **Breakpoints nuevos 800px / 480px** (los estándar del resto del ecosistema), agregados sin quitar los 760/900/640 existentes: a 800px se reduce el padding de `.content` y `.combo-body` y el tamaño de `.sh h2`; a 480px se compacta aún más (`.content` a 14px de padding, `.item-img` de 210px a 170px de alto, `.topbar` con menos padding lateral).
- **Verificado con Playwright** en iPad (820×1180) e iPhone 15 Pro (393×852, `isMobile:true, hasTouch:true`): las 9 pestañas, el checklist, el toggle de tema y (en iPhone) la apertura/cierre del sidebar móvil — overflow horizontal (`scrollWidth - clientWidth`) en 0 en todos los casos, cero errores de consola. Capturas en `shots_responsive/vestimenta_*` de la sesión.
- A 820px (iPad) el sidebar se queda en flujo normal — a esa altura el sidebar fijo de 245px + contenido (`repeat(auto-fill,minmax(270px,1fr))` / combo-card en fila) ya tienen espacio suficiente sin necesidad de convertir el sidebar en overlay, a diferencia de `Entrevistas/` que sí lo necesitó (sidebar de 290px, ver `readme_entrevistas.md`).

## Cómo mantener esto al día

- Si cambian precios, abren/cierran tiendas mencionadas, o cambia la URL de una tienda, actualizar los arrays `compra` en `vestimenta_data.js` a mano (incluyendo el campo `u` si aplica) — no hay ninguna fuente en vivo.
- **Antes de agregar un link nuevo, verificarlo de verdad** (código de respuesta HTTP con user-agent de navegador, y si el dominio no es obviamente el oficial, cruzarlo con una búsqueda) — varias marcas grandes tienen clones/typosquats en los primeros resultados de búsqueda para "tienda oficial México" (ver la sección de arriba). Si no se puede confirmar un dominio oficial, mejor dejar esa tienda sin link (`{t:'...',p:'...'}` sin `u`) que inventar uno.
- Si se agrega o quita un item de `BASICOS`/`CHAQUETAS`/`ZAPATOS`/`ACCESORIOS`, actualizar el total hardcodeado `0/25` en `vestimenta.html` (`#checkCounter`) y la lista `FASES` si aplica.
- **La app no lleva imágenes.** Si alguna vez vuelven, que no sea para ilustrar una prenda genérica: eso ya se intentó dos veces y no funcionó (ver «Sin fotos, a propósito»).
- Para añadir una playera o un pantalón a la colorimetría hay que darle su veredicto contra **todos** los del otro eje: son 16 y 6, y una celda vacía rompe la tabla. `COLORIMETRIA` es la única fuente — las combinaciones salen de ahí, no se escriben aparte.

## Cómo usarlo

Se abre `vestimenta.html` directamente en cualquier navegador (`file://`), sin instalación ni servidor. Requiere `vestimenta_data.js` y `vestimenta_app.js` en la misma carpeta.

## El enlace al Dashboard vive en la `.topbar` (2026-08-18)

*"hay botones dashboard que ni si quiera van acorde a la interfaz del html, osea sobre ponen a otros botones y eso esta mal, debe ser parte de la interfaz de todos"*.

El bloque flotante `#btnVolverDash` (`position:fixed`, fondo oscuro propio, z-index 9999) que se había insertado esta mañana **se encimaba sobre el botón de tema en pantallas angostas** y no seguía el tema de este archivo. Se retiró junto con su `<style>`: ahora el enlace es un botón redondo con el 🚀 antes del de tema, con la clase `.theme-toggle-btn` que ya usan sus vecinos, así que hereda tema y estilos sin CSS nuevo.

Detalle completo y medición en `../Dashboard/readme_dashboard.md` → "El botón de Dashboard deja de flotar".