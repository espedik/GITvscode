# vestimenta.html — Mi Guía de Vestimenta

Aplicación web de una sola página (HTML+CSS+JS, sin backend) — guía de guardarropa en tres mitades: **qué me pongo hoy**, **cómo combinarlo** (la matriz de color y las 48 combinaciones que salen de ella) y **qué comprar** (la ruta ordenada por cuántos outfits abre cada prenda, más las fichas con precio y link). **Nueva el 2026-08-01**, pedido explícito de Adán: *"hazme un html y proyecto de vestimenta, debes darme muchas opciones de que comprar, basicos chaquetas, zapatos, y ademas para cada ocacion... busca en alguna web que tenga una buena base de fotos y descargarlas y ponlas en el folder en especifico"*.

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

Doce secciones en cuatro grupos:

- **Principal** — **Hoy** (`renderHoy()`), la sección de arranque, contada abajo; y
  🏠 Inicio (`renderInicio()`): filosofía de guardarropa cápsula y el plan de
  compra por fases (`FASES`, 4 tarjetas), con el mismo lenguaje de «fases» que el Plan
  Maestro de `Coach/Coach.html`.
- **Qué comprar** — **Playeras** (16) y **Pantalones** (6), que son las prendas de color
  y se cuentan abajo; más 👕 Básicos (8), 🧥 Chaquetas (6), 👞 Zapatos (6), ⌚ Accesorios (5).
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

## Playeras y Pantalones — todo lo comprable, por sección

**Las 22 prendas de la colorimetría, cada una con LO QUE ABRE**: con cuántas
contrapartes está en verde. Ese número ordena la lista y es el mismo que manda en la
ruta de Hoy — aquí se ve el catálogo entero, allí solo el paso siguiente.

Las fichas **no están escritas a mano**: `renderColorCompra(tipo, …)` cruza
`COLORIMETRIA` con `COLORIMETRIA.compra`, que guarda tiendas y precio **por tipo de
prenda** (playera, jeans, chino). Un color nuevo en los datos aparece aquí solo.

**El precio va por tipo y no por color, a propósito.** Los rangos y los links son los
mismos de `b1` (playera lisa), `b3` (jeans) y `b4` (chino) en `BASICOS`, verificados uno
por uno: una playera burdeos cuesta lo que una blanca. Poner un precio distinto para
cada uno de los 16 colores sería inventarlo.

Cada ficha lleva **los cuadritos de las contrapartes**: uno por cada prenda del otro
eje, entero si están en verde y apagado si no. Se lee cuántas *y cuáles* sin leer una
palabra. Las que abren el máximo llevan la insignia «Va con todos» —blanco, verde oliva
y burdeos, las tres que van con los seis pantalones— y las que **no abren ninguna**
(rojo ladrillo, rosa palo, berenjena) salen atenuadas y con «no la compres» en vez de
tiendas: enseñar dónde comprar algo que la tabla desaconseja sería contradecirse.

Los seis pantalones aceptan ocho playeras cada uno, así que ahí el número no discrimina
y lo que informa son los cuadritos: no cuántas, sino cuáles.

**Marcar es la misma acción en los dos sitios.** Cuatro de las 22 viven también en el
catálogo y `COLORIMETRIA` las enlaza con el campo `item` (blanco→`b1`, negro→`b2`,
índigo→`b3`, caqui→`b4`): esas se leen y se escriben en `S.marcados`, las otras 18 en
`S.color`. Sin ese enlace se marcaban las cuatro en Básicos y **Hoy seguía diciendo que
no había outfit** — que es exactamente lo que pasaba.

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
{
  marcados: ['b1', 'c3', 'z1', ...],      // los 25 items del catálogo, con precio y link
  color:    ['p:indigo', 't:blanco', ...] // las 22 prendas de la colorimetría
}
```

**Son dos listas y no una a propósito.** `marcados` son los items comprables del catálogo
(Básicos, Chaquetas, Zapatos, Accesorios) y de ahí sale el estado de cada pieza en Ejercicio
y Bodas. `color` son las 22 prendas de la colorimetría, que el catálogo no cubre: solo cuatro
de ellas existen ahí, así que las otras 18 no tendrían dónde marcarse.

Las claves de `color` van **cualificadas por tipo** (`p:` pantalón, `t:` playera). Sin eso,
«negro» y «marino» —que existen en los dos ejes— se pisarían: marcar la playera negra habría
marcado también los jeans negros.

Clave **propia de este archivo**, no compartida con el resto del ecosistema (igual que
`theme`/`sidebar-collapsed` en `Entrevistas/`). El contador del sidebar (`updateCounter()`)
cuenta solo sobre los 25 items comprables; el clóset de color lo cuenta la cabecera, sobre 22.

**Excepción intencional**: el botón de tema (🌙/☀️) sí usa la clave compartida `coach-theme` (ver `../README.md` → "Convenciones de diseño compartidas") para que el tema visual se sincronice con el resto de apps que Adán ya usa — es solo una preferencia visual, no dato personal, así que no rompe el aislamiento de datos del resto de la app.

## Sistema de diseño — «Cero»

**Sin radios, sin sombras, sin desenfoque y sin degradados.** La jerarquía la hacen la
REGLA de 1,5px (`--bd`), el tamaño del tipo y un único acento: **naranja señal**
`#ff4a00`. Ese naranja no aparece en ninguna de las 16 playeras ni en los 6 pantalones,
así que nunca compite con la prenda — que es lo único aquí con derecho a color. Elegido
por Adán entre tres direcciones futuristas: *"aplica la c"*.

El cambio de piel costó poco código porque **toda la app ya pintaba con `--r14`, `--rs`
y `--sh`**: ponerlos a `0`, `0` y `none` quitó radios y sombras de las diez secciones de
una vez, sin tocar ninguna.

| | Claro (por defecto) | Oscuro |
| --- | --- | --- |
| Papel | `#ececea` | `#0a0a0a` |
| Tinta | `#0a0a0a` | `#ececea` |
| Acento | `#ff4a00` | `#ff6a2a` |

La versión oscura no es otro diseño: es el mismo sistema con la tinta y el papel
cambiados de sitio. El naranja sube un punto para aguantar el fondo negro. El tema
sigue en la clave compartida `coach-theme`, así que Vestimenta cambia con el resto del
ecosistema.

**Tres voces tipográficas.** `Archivo` en 700/800 para display (`--font-dsp`), que
aguanta 96px sin volverse decorativa; `Inter` para el texto; `Space Grotesk` para todo
lo que sea número o etiqueta técnica. Archivo es la única fuente nueva.

**Dos grosores de regla, y significan cosas distintas**: `--bd` (1,5px sólido) encierra;
`--bd-fina` (1px al 16%) divide por dentro. El carril de navegación no usa píldoras ni
fondos: el activo se marca en negrita con una flecha naranja.

## Hoy — la pantalla que se abre por la mañana

**Es la sección de arranque** (`nav('hoy')`), y resuelve las tres preguntas en una
pantalla sin desplazar: qué me pongo, qué más puedo armar, qué compro.

**El outfit del día** es el mismo todo el día y distinto cada día: `outfitDelDia()`
indexa las combinaciones disponibles por el día del año, el mismo criterio que la
palabra del día del Dashboard. No es aleatorio.

**`S.color` es la lista de lo que ya tienes, en color.** Existe porque el catálogo solo
conoce cuatro de las 22 prendas de la colorimetría (playera blanca, negra, jeans azul y
chino caqui): las otras 18 no se pueden marcar en Básicos. Las claves van **cualificadas
por tipo** (`p:negro`, `t:negro`) y no por id a secas — «negro» y «marino» existen como
pantalón *y* como playera, y con la id sola marcar la playera negra habría marcado
también los jeans negros.

**La ruta de compra** (`rutaCompra(n)`) es lo que responde a «qué compro sí o sí». En
cada paso elige la prenda que abre **más combinaciones nuevas con lo que ya tienes
marcado**, y dice cuántas abre. No es una lista de deseos ni un orden por precio: es el
orden que más rápido convierte dinero en outfits. Desde cero, la ruta completa son 12
prendas y llega a **31 outfits**; las 4 primeras dan 4.

Es **codiciosa, no óptima**: mira solo el paso siguiente. Con 22 prendas la diferencia no
compensa el coste de explicar un resultado que no se puede seguir a ojo.

Cada paso lleva su casilla «ya la tengo», así que la ruta **se avanza sola**: al marcar
una prenda, la lista recalcula y aparecen las siguientes. Con el clóset vacío la sección
no finge nada — dice que todavía no hay outfit y manda a marcar.

Las tres cifras de la cabecera (`cpCabVest`) se derivan: **puedes armar hoy**, **tu
clóset** sobre 22 y **combinaciones** sobre 48.

## Probado

Con Chromium sobre `file://`, a **1600px y 390px**, en tema claro y oscuro: las doce
secciones sin desbordamiento horizontal, **cero elementos `<img>`** en toda la app, cero  
peticiones fallidas y cero errores de consola. Las 48 combinaciones se pintan y el filtro
devuelve 27 / 18 / 40. El checklist marca, persiste y actualiza el contador.

El flujo de Hoy, medido de punta a punta: con el clóset vacío sale el estado vacío y la
ruta con 4 pasos; marcando esos 4 aparecen el outfit del día, 3 alternativas y la cuenta
pasa a 4 de 48, con la ruta proyectando 16. Y el camino que fallaba: marcar `b1`–`b4` en
**Básicos** da outfit en Hoy y deja 4 de 22 en el clóset, con las fichas de Playeras y
Pantalones marcadas solas.

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