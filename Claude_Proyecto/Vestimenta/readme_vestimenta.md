# vestimenta.html — Mi Guía de Vestimenta

Aplicación web de una sola página (HTML+CSS+JS, sin backend) — catálogo/guía de compras de guardarropa: qué comprar (básicos, chaquetas, zapatos) y cómo combinarlo por ocasión (trabajo, casual, ejercicio, bodas, fiestas). **Nueva el 2026-08-01**, pedido explícito de Adán: *"hazme un html y proyecto de vestimenta, debes darme muchas opciones de que comprar, basicos chaquetas, zapatos, y ademas para cada ocacion... busca en alguna web que tenga una buena base de fotos y descargarlas y ponlas en el folder en especifico"*.

**Fuera del ecosistema principal** (igual que `Aleman/` y `Entrevistas/`, ver `../README.md` → "Mapa de carpetas") — no comparte datos con Finanzas/Coach/CuidadoPersonal/Dashboard, es una guía de referencia personal independiente.

## Archivos

| Archivo | Qué es |
|---|---|
| `vestimenta.html` | Shell: sidebar, topbar, CSS, cascarón de `<div id="content-root">` |
| `vestimenta_data.js` | Todo el contenido: `BASICOS`, `CHAQUETAS`, `ZAPATOS` (arrays de items comprables), `OCASIONES` (combos por ocasión), `FASES` (plan de compra) |
| `vestimenta_app.js` | Render (`RENDERS`), navegación (`nav()`), checklist (`toggleCheck()`), tema (`toggleTheme()`) |
| `images/{basicos,chaquetas,zapatos,trabajo,casual,ejercicio,bodas,fiestas}/` | 30 fotos descargadas, una carpeta por categoría/ocasión |
| `_image_sources.json` | Manifiesto de las 30 fotos: URL de origen, licencia y título — para atribución si se necesita en el futuro |

## Estructura de contenido

- **🏠 Inicio** (`renderInicio()`) — filosofía de guardarropa cápsula ("con 8 básicos + 6 chaquetas + 6 zapatos ya cubres las 5 ocasiones") y **plan de compra por fases** (`FASES`, 4 tarjetas) — mismo lenguaje de "fases" que el Plan Maestro de `Coach/Coach_v2.html`, a propósito, para que se sienta consistente con cómo Adán ya planea su dinero. Explícitamente conecta con su prioridad actual de liquidar deuda antes de comprar ropa de golpe.
- **👕 Básicos** (8 items), **🧥 Chaquetas** (6 items), **👞 Zapatos** (6 items) — `renderCategoria()`, grid `.item-grid` de `.item-card`: foto, nombre, para qué sirve, 2-3 opciones de tienda con rango de precio MXN, un tip, y un checkbox "Ya lo tengo / lo quiero comprar".
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

## Cómo mantener esto al día

- Si cambian precios o abren/cierran tiendas mencionadas, actualizar los arrays `compra` en `vestimenta_data.js` a mano — no hay ninguna fuente en vivo.
- Si se agrega o quita un item de `BASICOS`/`CHAQUETAS`/`ZAPATOS`, actualizar el total hardcodeado `0/20` en `vestimenta.html` (`#checkCounter`) y la lista `FASES` si aplica.
- Si se agrega una foto nueva, descargarla a la subcarpeta de `images/` correspondiente, verificarla visualmente (no solo por el título de la búsqueda) y añadir su entrada a `_image_sources.json`.

## Cómo usarlo

Se abre `vestimenta.html` directamente en cualquier navegador (`file://`), sin instalación ni servidor. Requiere `vestimenta_data.js` y `vestimenta_app.js` en la misma carpeta, y la carpeta `images/` junto a ellos.
