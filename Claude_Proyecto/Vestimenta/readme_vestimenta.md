# vestimenta.html — Mi Guía de Vestimenta

Aplicación web de una sola página (HTML+CSS+JS, sin backend) — catálogo/guía de compras de guardarropa: qué comprar (básicos, chaquetas, zapatos) y cómo combinarlo por ocasión (trabajo, casual, ejercicio, bodas, fiestas). **Nueva el 2026-08-01**, pedido explícito de Adán: *"hazme un html y proyecto de vestimenta, debes darme muchas opciones de que comprar, basicos chaquetas, zapatos, y ademas para cada ocacion... busca en alguna web que tenga una buena base de fotos y descargarlas y ponlas en el folder en especifico"*.

**Fuera del ecosistema principal** (igual que `Aleman/` y `Entrevistas/`, ver `../README.md` → "Mapa de carpetas") — no comparte datos con Finanzas/Coach/CuidadoPersonal/Dashboard, es una guía de referencia personal independiente.

## Archivos

| Archivo | Qué es |
|---|---|
| `vestimenta.html` | Shell: sidebar, topbar, CSS, cascarón de `<div id="content-root">` |
| `vestimenta_data.js` | Todo el contenido: `BASICOS`, `CHAQUETAS`, `ZAPATOS` (arrays de items comprables), `OCASIONES` (combos por ocasión), `FASES` (plan de compra) |
| `vestimenta_app.js` | Render (`RENDERS`), navegación (`nav()`), checklist (`toggleCheck()`), tema (`toggleTheme()`) |
| `images/{basicos,chaquetas,zapatos,accesorios,trabajo,casual,ejercicio,bodas,fiestas}/` | 35 fotos descargadas, una carpeta por categoría/ocasión (`accesorios/` es nueva, 2026-08-03) |
| `_image_sources.json` | Manifiesto de las 30 fotos: URL de origen, licencia y título — para atribución si se necesita en el futuro |

## Estructura de contenido

- **🏠 Inicio** (`renderInicio()`) — filosofía de guardarropa cápsula ("con 8 básicos + 6 chaquetas + 6 zapatos + 5 accesorios ya cubres las 5 ocasiones") y **plan de compra por fases** (`FASES`, 4 tarjetas) — mismo lenguaje de "fases" que el Plan Maestro de `Coach/Coach.html`, a propósito, para que se sienta consistente con cómo Adán ya planea su dinero. Explícitamente conecta con su prioridad actual de liquidar deuda antes de comprar ropa de golpe.
- **👕 Básicos** (8 items), **🧥 Chaquetas** (6 items), **👞 Zapatos** (6 items), **⌚ Accesorios** (5 items, nuevo 2026-08-03) — `renderCategoria()`, grid `.item-grid` de `.item-card`: foto, nombre, para qué sirve, 2-3 opciones de tienda con rango de precio MXN (varias con link real y clicable a la tienda oficial, ver más abajo), un tip, y un checkbox "Ya lo tengo / lo quiero comprar".
- **💼 Trabajo, 🙂 Casual, 🏋️ Ejercicio, 💍 Bodas, 🎉 Fiestas** — `renderOcasion(key)`, 2-3 `.combo-card` por ocasión (foto + descripción + lista de piezas + costo total aproximado). La mayoría de las piezas de estos combos son las mismas de Básicos/Chaquetas/Zapatos — el objetivo es mostrar reutilización, no un guardarropa nuevo por ocasión.
  - **Trabajo**: 3 combos de business casual (contexto ALTEN — nota explícita de "confirma el código real de tu equipo antes de invertir fuerte", ya que no hay dato confirmado del dress code real).
  - **Ejercicio**: conecta directamente con la sección "🧭 Deportes para Explorar" de `../CuidadoPersonal/ejercicio.html` (ver `readme_ejercicio.md`) — el tenis de cross-training se explica ahí mismo como prioridad si la meta de Hyrox va en serio.
  - **Bodas**: dos rutas (formal de noche con traje completo vs. de día/jardín con guayabera), con nota explícita de rentar el traje antes de comprarlo dado el enfoque actual en liquidar deuda.
  - **Fiestas**: marcado explícitamente como "$0 extra" si ya se compró lo de Básicos/Chaquetas/Zapatos — es la ocasión con menor costo incremental a propósito.

## Modelo de datos — `localStorage['vestimenta_v1']`

```js
{ marcados: ['b1', 'c3', 'z1', ...] }   // ids de items marcados en el checklist (Básicos/Chaquetas/Zapatos)
```

Solo el checklist de compra persiste — las secciones de ocasión (Trabajo/Casual/Ejercicio/Bodas/Fiestas) son de solo lectura, sin estado propio. Clave **propia de este archivo**, no compartida con el resto del ecosistema (igual que `theme`/`sidebar-collapsed` en `Entrevistas/`). El contador `X/20` del sidebar (`updateCounter()`) cuenta sobre el total de los 20 items comprables (8+6+6), no sobre las ocasiones.

**Excepción intencional**: el botón de tema (🌙/☀️) sí usa la clave compartida `coach-theme` (ver `../README.md` → "Convenciones de diseño compartidas") para que el tema visual se sincronice con el resto de apps que Adán ya usa — es solo una preferencia visual, no dato personal, así que no rompe el aislamiento de datos del resto de la app.

## Sistema de diseño

Paleta propia "premium minimalista" (cognac/carbón, `--p:#c17f4a`), **no** la paleta naranja/verde compartida de Salud/Ejercicio — es un catálogo de referencia, no parte del ecosistema de tracking de vida, así que tiene su propia identidad visual. Sigue el estándar del proyecto (2026-07-31): sin gradientes decorativos, sin glow de neón, tarjetas planas con sombra estándar. Reutiliza el patrón de sidebar de 245px + `.nav-item` que ya usan Salud/Ejercicio/Comida/Finanzas, y el truco `--ov` para que los overlays funcionen en ambos temas. Sin Chart.js — no hay gráficas, es contenido estático + un checklist simple.

## Cómo se eligieron y verificaron las fotos (2026-08-01)

Las 30 fotos vienen de **Wikipedia (imagen principal de artículo)** y **Openverse** (agregador de fotos con licencia libre de Flickr/rawpixel/etc., `api.openverse.org`, sin necesidad de API key) — **no** de bancos de fotos de pago ni de sitios de retail (evita problemas de derechos de marca/modelo). Cada URL final se verificó una por una descargándola y **viendo la imagen real** antes de aceptarla — la búsqueda automática por texto (tanto en Wikimedia Commons como en Openverse) devuelve falsos positivos con frecuencia (p.ej. buscar "denim jacket" puede traer una foto histórica sin relación solo porque el texto coincide). Varias fotos necesitaron 2-3 intentos:
- `basicos/playera-blanca-lisa.jpg` y `playera-negra-lisa.jpg`: los primeros resultados eran escenas de mercado/bicicleta sin relación — reemplazadas por plantillas de playera lisa reales.
- `chaquetas/chamarra-mezclilla.jpg`: el primer resultado (CC0 de rawpixel) era una foto artística demasiado oscura para distinguir la prenda.
- `basicos/polo-pique.jpg`: la URL original titulada "Blue polo shirt" resultó ser, al verla, una foto de una playera manchada — reemplazada por una foto de producto real de Under Armour (CC0).
- `casual/outfit-casual-diario.jpg`: el primer resultado mostraba un señor mayor en foto artística en blanco y negro, tono equivocado para "casual diario".

Detalle completo de qué URL se usó para cada archivo, su licencia y por qué, en `_image_sources.json` (30 entradas, incluye notas de reemplazo donde aplicó).

## Probado (2026-08-01)

Smoke test con Playwright (Chromium headless): las 9 pestañas cargan sin imágenes rotas ni errores de consola, el checklist marca/desmarca y persiste tras recargar, el contador del sidebar se actualiza, y el toggle de tema claro/oscuro funciona. Capturas de pantalla revisadas visualmente en ambos temas.

## Responsivo — iPad / iPhone 15 Pro (2026-08-03)

Ya existían tres breakpoints funcionales de una pasada anterior (`@media(max-width:760px)` apila `.combo-card`, `900px` pone `.fase-grid` a 2 columnas, `640px` saca el sidebar de pantalla con `transform:translateX(-100%)`), así que el trabajo fue completar lo que faltaba, no reconstruir el layout:

- **Bug real encontrado — el botón ☰ nunca se veía en móvil**: `#menuBtn` (el botón hamburguesa que abre el sidebar cuando está oculto) tenía `style="display:none;border-radius:6px"` puesto **inline** en el HTML, y no existía ningún `@media` que lo reactivara. Resultado: en cualquier pantalla ≤640px el sidebar se escondía (correcto) pero no había forma de volver a abrirlo — navegación completamente inaccesible salvo la pestaña "Inicio" ya activa al cargar. Un `@media(max-width:640px){#menuBtn{display:flex}}` normal **no alcanza** porque un inline `style` le gana a cualquier regla externa sin `!important` — se resolvió con `#menuBtn{display:flex !important}` dentro del media query. Verificado con Playwright: en iPhone 15 Pro (393px) el botón ahora es visible, el click abre `.sidebar.open`, y navegar a otra sección la vuelve a cerrar (ese comportamiento de auto-cierre ya existía en `nav()` de `vestimenta_app.js`, no se tocó JS).
- **Red de seguridad para la trampa de CSS Grid**: se agregó `.fase-grid > *, .item-grid > * { min-width: 0 }` — no había overflow activo (el `item-grid` usa `repeat(auto-fill,minmax(270px,1fr))`, que ya es responsivo por diseño, y `.combo-card` es flex, no grid), pero se deja la regla como prevención igual que en `Dashboard/Coach` por si se agregan items con texto más largo a futuro.
- **Breakpoints nuevos 800px / 480px** (los estándar del resto del ecosistema), agregados sin quitar los 760/900/640 existentes: a 800px se reduce el padding de `.content` y `.combo-body` y el tamaño de `.sh h2`; a 480px se compacta aún más (`.content` a 14px de padding, `.item-img` de 210px a 170px de alto, `.topbar` con menos padding lateral).
- **Verificado con Playwright** en iPad (820×1180) e iPhone 15 Pro (393×852, `isMobile:true, hasTouch:true`): las 9 pestañas, el checklist, el toggle de tema y (en iPhone) la apertura/cierre del sidebar móvil — overflow horizontal (`scrollWidth - clientWidth`) en 0 en todos los casos, cero errores de consola. Capturas en `shots_responsive/vestimenta_*` de la sesión.
- A 820px (iPad) el sidebar se queda en flujo normal — a esa altura el sidebar fijo de 245px + contenido (`repeat(auto-fill,minmax(270px,1fr))` / combo-card en fila) ya tienen espacio suficiente sin necesidad de convertir el sidebar en overlay, a diferencia de `Entrevistas/` que sí lo necesitó (sidebar de 290px, ver `readme_entrevistas.md`).

## Reconstrucción de fotos + Accesorios + links de compra reales (2026-08-03)

Adán probó la app integrada en Cuidado Personal y preguntó directamente *"pero lo hiciste completo, con imagenes profesionales?"* — auditoría honesta de las 30 fotos originales encontró que **19 tenían problemas reales**: mujeres modeleando prendas de hombre (chamarra de mezclilla, chamarra de cuero), sneakers Michael Kors de mujer, tenis viejos y sucios sobre pasto, una vitrina desordenada de zapatos en tienda, un traje mal entallado fotografiado en la cochera de una casa, una corbata estampada que chocaba con el saco, un retrato corporativo con marca de agua en vez de "salir de noche", una foto borrosa de una fiesta, y varias fotos que eran solo acercamientos de cara sin mostrar el outfit. Pedido explícito de seguimiento: *"para todo, usa fotos mas profesionales y la ropa debe ser que me hagan lucir muy bien, debe estar muy completo esto... tomate tu tiempo"*.

- **19 fotos reemplazadas** (de 30 originales, 8 se quedaron igual por ser ya buenas: playeras, camisa de vestir, polo, cinturón, chamarra puffer, botines Chelsea, zapato derby). Mismo criterio de sourcing que el 2026-08-01 (Wikimedia Commons + Openverse/Flickr, licencia libre, cada foto verificada visualmente una por una antes de aceptarla — no por el texto del resultado de búsqueda) pero con un criterio de aceptación más estricto: se rechazó cualquier foto con género equivocado, fondo/contexto inapropiado, mala iluminación, o que no mostrara la prenda con claridad. El detalle completo de qué se reemplazó y por qué está en `_image_sources.json` (35 entradas).
- **`images/casual/outfit-casual-diario.jpg` reutiliza la misma foto que `images/chaquetas/chamarra-mezclilla.jpg`** (un hombre con chamarra de mezclilla en la playa) — mismo patrón ya usado en `trabajo/outfit-business-casual.jpg` (reusada en 2 combos), no es un descuido.
- **`images/bodas/corbata-formal.jpg` ahora muestra una guayabera, no una corbata** — el nombre del archivo es heredado de la versión anterior, pero el combo real que usa esa foto es "Boda de día/jardín... con guayabera" (ver `OCASIONES.bodas` en `vestimenta_data.js`), así que una guayabera es la foto correcta para ese combo — la corbata anterior nunca encajó con el texto que la acompañaba.
- **Nueva categoría ⌚ Accesorios** (`ACCESORIOS`, 5 items: reloj análogo, lentes de sol, mochila, corbata, cartera) — mismo formato que Básicos/Chaquetas/Zapatos, con su propio nav item, su propio `RENDERS.accesorios`, y sumada a `updateCounter()` (el contador pasó de `/20` a `/25`). También se referencian desde 3 combos de `OCASIONES` donde tiene sentido (reloj en la junta importante de Trabajo y en la boda formal, lentes de sol en Casual arreglado).
- **Links de compra reales, verificados uno por uno (2026-08-03)** — nuevo campo opcional `u` en cada entrada de `compra:[{t,p,u}]`; `itemCard()` en `vestimenta_app.js` renderiza `c.t` como `<a href="${c.u}" target="_blank">` (con un ↗ al final) cuando existe `u`, texto plano si no. **70 de 74 entradas de tienda tienen link real** — verificadas con `curl`/WebSearch antes de escribirlas, no adivinadas por el nombre de la marca. Esto importó de verdad: varias búsquedas de "tienda oficial México" para marcas como Uniqlo o Aldo devuelven sobre todo **dominios apócrifos/typosquatting** (`uniqlomx.com.mx`, `aldo-mexico.com`, `lacoste-mexico.com.mx`, etc. — ninguno es el sitio real de la marca), así que cada dominio se confirmó por código de respuesta HTTP real (con user-agent de navegador, ya que varias tiendas grandes bloquean bots) y, en casos dudosos, cruzado con una búsqueda adicional.
  - **Uniqlo no tiene tienda oficial en México** (confirmado: no aparece en el listado de países de Wikipedia, el dominio `uniqlo.com/mx` da 404) — se dejó **sin link a propósito** en los 3 lugares donde aparece (playera blanca, playera negra, puffer), con una nota explícita en el tip de la puffer explicando que hay que comprarla en un viaje o por reventa verificada, en vez de inventar un link a uno de los sitios falsos.
  - **Aldo tampoco tiene un dominio propio confiable para México** (mismo patrón de typosquatting) — se usa en su lugar el link a la página de la marca Aldo dentro de **El Palacio de Hierro** (`elpalaciodehierro.com/marcas/aldo/`), una tienda departamental real que sí la vende.
  - **"Marathon" (mencionado junto con Innovasport para tenis de running) no tiene presencia confirmada en México** (la cadena real "Marathon Sports" opera en Ecuador/Perú/Bolivia, no México) — se dejó el link solo sobre "Innovasport", que sí está verificado.
  - **"Piel genuina en outlet/segunda mano (Marketplace, Bazar del Chopo)"** (chamarra de cuero) se dejó sin link a propósito — describe un mercado informal/de segunda mano, no una tienda con sitio web propio.
- **Verificado con Playwright**: las 10 secciones (Inicio + 4 "Qué comprar" + 5 ocasiones) navegan bien, 0 imágenes rotas de 36 totales, 70 links de compra presentes y con `href`/`target="_blank"` correctos, el contador pasa de `0/25` a `1/25` al marcar un item y sobrevive un recargo real de página, y la sección Accesorios funciona igual dentro del `<iframe>` de `CuidadoPersonal/cuidadopersonal.html`. Cero errores de consola. `node --check` limpio en los 3 archivos (`vestimenta.html`, `vestimenta_data.js`, `vestimenta_app.js`).

## Segunda ronda: consistencia visual del catálogo (2026-08-03, mismo día)

Adán vio el resultado de la reconstrucción de arriba y dijo *"siento que las imagenes son deficientes"*. Antes de reemplazar más fotos a ciegas se le preguntó qué fallaba exactamente — la respuesta fue **calidad/consistencia visual**, no relevancia ni que parecieran de stock gratuito. Diagnóstico correcto: las fotos individuales eran reales y apropiadas, pero **mezclaban estilos fotográficos** dentro de la misma cuadrícula — una en fondo blanco de estudio, otra en una playa, otra con alguien en motocicleta en la calle, otra en una alfombra roja — lo cual se lee como un collage de fotos sueltas de internet, no como el catálogo uniforme de una tienda real.

**Regla aplicada**: en las 4 secciones "Qué comprar" (Básicos/Chaquetas/Zapatos/Accesorios), **toda foto debe ser foto de producto** — colgada en gancho, doblada, en maniquí sin cabeza, o puesta sobre una superficie neutra — nunca "alguien usándola en la calle/playa/motocicleta". Las fotos de `OCASIONES` (combos por evento) son la única excepción a propósito: por definición necesitan mostrar un look puesto en una persona, así que se quedan como están (ya comparten entre sí un estilo razonablemente parecido — retrato/cuerpo completo en exterior o interior neutro).

- **5 fotos más reemplazadas** por versiones de foto de producto limpia: `chaquetas/chamarra-mezclilla.jpg` (ahora un maniquí sin cabeza en fondo beige — recortada con Pillow del panel superior izquierdo de una foto de 4 ángulos, la original de este mismo día era una foto de estilo de vida en la playa), `chaquetas/chamarra-cuero.jpg` (chamarra aislada en fondo blanco, en vez de la foto de motociclista en la calle), `chaquetas/chamarra-bomber.jpg` (chamarra suede AllSaints en gancho sobre fondo gris de estudio — esta foto nunca se había tocado desde el 2026-08-01, seguía siendo la original con fondo de alfombra roja anticuado), `chaquetas/blazer-casual.jpg` (blazer Polo Ralph Lauren en fondo blanco, en vez del flat-lay sobre piso de madera) y `accesorios/cartera.jpg` (cartera Bellroy sola sobre papel de seda, en vez de una mano sosteniéndola sobre una mesa de madera).
- **`images/casual/outfit-casual-diario.jpg` casi se rompe por accidente**: al recortar la foto de maniquí para `chamarra-mezclilla.jpg`, por un momento se le puso la misma foto recortada (una sola chamarra, sin outfit completo) a este combo — pero ese archivo necesita mostrar un **look completo puesto en una persona** (`OCASIONES.casual`, combo "El default de fin de semana": playera+jean+chamarra+sneaker), no una sola prenda. Se revirtió a la foto de estilo de vida en la playa (que sí muestra el outfit completo) antes de terminar — la lección: las fotos de `OCASIONES` y las de los items sueltos tienen requisitos distintos aunque compartan el mismo archivo fuente.
- **Se intentó también conseguir fotos de producto limpio para jeans, chino, sneakers blancos y tenis de running** — sin éxito después de más de 15 búsquedas distintas entre esta ronda y la anterior (jeans en particular parece ser un género de fotografía casi inexistente en los bancos de imágenes con licencia libre: la mayoría son fotos de gente usándolos, vitrinas de tienda desordenadas, o acercamientos de costura). Estos 4 quedan con la foto de la ronda anterior (no son fotos rotas ni inapropiadas, solo un poco menos consistentes visualmente que el resto) — si en el futuro aparece una fuente mejor, reemplazar siguiendo el mismo criterio de "foto de producto, fondo neutro".
- **Verificado de nuevo con Playwright**: 0 imágenes rotas en las 10 secciones, la sección Chaquetas funciona igual dentro del `<iframe>` de `CuidadoPersonal/cuidadopersonal.html`, cero errores de consola.

## Cómo mantener esto al día

- Si cambian precios, abren/cierran tiendas mencionadas, o cambia la URL de una tienda, actualizar los arrays `compra` en `vestimenta_data.js` a mano (incluyendo el campo `u` si aplica) — no hay ninguna fuente en vivo.
- **Antes de agregar un link nuevo, verificarlo de verdad** (código de respuesta HTTP con user-agent de navegador, y si el dominio no es obviamente el oficial, cruzarlo con una búsqueda) — varias marcas grandes tienen clones/typosquats en los primeros resultados de búsqueda para "tienda oficial México" (ver la sección de arriba). Si no se puede confirmar un dominio oficial, mejor dejar esa tienda sin link (`{t:'...',p:'...'}` sin `u`) que inventar uno.
- Si se agrega o quita un item de `BASICOS`/`CHAQUETAS`/`ZAPATOS`/`ACCESORIOS`, actualizar el total hardcodeado `0/25` en `vestimenta.html` (`#checkCounter`) y la lista `FASES` si aplica.
- Si se agrega una foto nueva, descargarla a la subcarpeta de `images/` correspondiente (o crear `images/accesorios/` si hiciera falta una 6ª categoría), verificarla visualmente (no solo por el título de la búsqueda ni por el nombre de archivo) y añadir su entrada a `_image_sources.json`.

## Cómo usarlo

Se abre `vestimenta.html` directamente en cualquier navegador (`file://`), sin instalación ni servidor. Requiere `vestimenta_data.js` y `vestimenta_app.js` en la misma carpeta, y la carpeta `images/` junto a ellos.

## El enlace al Dashboard vive en la `.topbar` (2026-08-18)

*"hay botones dashboard que ni si quiera van acorde a la interfaz del html, osea sobre ponen a otros botones y eso esta mal, debe ser parte de la interfaz de todos"*.

El bloque flotante `#btnVolverDash` (`position:fixed`, fondo oscuro propio, z-index 9999) que se había insertado esta mañana **se encimaba sobre el botón de tema en pantallas angostas** y no seguía el tema de este archivo. Se retiró junto con su `<style>`: ahora el enlace es un botón redondo con el 🚀 antes del de tema, con la clase `.theme-toggle-btn` que ya usan sus vecinos, así que hereda tema y estilos sin CSS nuevo.

Detalle completo y medición en `../Dashboard/readme_dashboard.md` → "El botón de Dashboard deja de flotar".