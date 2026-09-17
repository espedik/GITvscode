# heliescala.html — helicópteros a escala en resina

La segunda mitad del negocio del papá de Adán: réplicas en resina de casi cualquier helicóptero,
hechas a mano. La reparación de aeronaves vive en
[`../Aeroresinas/`](../Aeroresinas/readme_aeroresinas.md).

**El nombre se eligió el 2026-09-17**, al partir la empresa en dos (Adán: *"dividiremos la empresa,
necesitaremos un nombre para eso"*). De cuatro opciones eligió **Heliescala**: nombre propio, corto,
se entiende solo y se busca fácil. La firma *«por Aeroresinas»* va en la barra y en el pie — es lo
que le da el respaldo técnico, y ese respaldo es el mejor argumento de venta que tiene esta página.

## Por qué es oscura

Misma familia visual que Aeroresinas (vidrio, Space Grotesk + IBM Plex, retícula técnica) pero
**invertida**: fondo `#080c16`, acento cian. Dos razones, y las dos importan:

1. Una maqueta es una pieza de vitrina y **se ve mejor iluminada sobre negro**. Las fotos del
   catálogo tienen fondo blanco de estudio, así que recortan solas contra el panel oscuro.
2. Distingue las dos casas de un vistazo sin cambiar de tipografía ni de retícula: se ve que son
   la misma mano, no la misma página.

Cada archivo es **autónomo** —su CSS va dentro— porque algún día serán dos dominios.

## Estructura

Barra → hero → **catálogo** (8 piezas reales) → **tu aeronave** → **cómo se hace una** (4 pasos,
con la foto del taller) → **puente a Aeroresinas** → contacto.

**"La réplica de tu propia aeronave" es la sección que vende**, no el catálogo: el catálogo prueba
que puede hacer cualquier modelo, y esa sección convierte esa prueba en un encargo — el helicóptero
que vuelas o que operas, con sus colores, su número de unidad y su matrícula. Sirve de regalo de
retiro, de reconocimiento, de pieza de recepción o de obsequio a un cliente.

**"Cómo se hace una"** existe para justificar el precio: molde, colada, lijado y montaje, y pintura
a mano. No es un juguete pintado, y hay que decirlo con el taller de fondo.

## El catálogo

Ocho piezas reales suyas, cada una con la librea que llevaba el original: Airbus H145 (corporativa
y de exhibición), AS350/H125 de servicios médicos, Mi-17, tres Panther de la **Marina**, un par de
rescate en librea AESSA, dos del **gobierno de San Luis Potosí** (XC-PSI) y la flota de la
**Policía** (Bell 412, grupo Cóndores). Más, en "tu aeronave", el Bell 412 de la policía con su
número de unidad y el de la **Fuerza Aérea Mexicana** con su matrícula.

Para añadir un modelo hacen falta dos cosas: la foto en `fotos/` y una línea en `T.es.piezas` (con
su traducción en `T.en.piezas`). Cada línea es `[clave, nombre, foto, texto, etiquetas, modelo]`:
la primera etiqueta se pinta en cian y `modelo` es la clave de su ficha (ver abajo).

## La ficha del helicóptero

Adán, 2026-09-17: *"de los helicópteros puedes hacer al abrir que te dé una ficha completa del
helicóptero?"*. Al tocar una pieza del catálogo se abre un panel a pantalla partida: a la izquierda
la foto de la réplica, a la derecha **el helicóptero de verdad**.

| Bloque | Qué lleva |
|---|---|
| Identidad | Fabricante, designación y un párrafo de qué es y por qué existe |
| Ficha técnica | Motor, rotor, peso máximo, capacidad, crucero y alcance |
| Para qué se usa | Las misiones reales del tipo |
| **Cómo se reconoce** | El detalle que hay que clavar para que se identifique: el fenestron, las cinco palas, el rotor de cola de tres… |
| En México | Quién lo vuela aquí — la Marina, la FAM, la policía, los servicios médicos |
| La réplica | Escala, tiempo, envío y precio, con el botón que la encarga por WhatsApp **con el modelo ya escrito en el mensaje** |

**"Cómo se reconoce" es el bloque que justifica la página**: es lo que separa una maqueta fiel de
un juguete, y es el argumento de por qué la hace quien repara las de verdad.

Se cierra con **Esc**, con clic fuera o con la ✕, y se navega entre las ocho piezas con las
**flechas** del teclado o los botones del pie. El panel es uno solo en el DOM y se repinta; al
cambiar de idioma con una ficha abierta, se repinta en el idioma nuevo sin cerrarse.

**Los datos son del fabricante y se comprobaron el 2026-09-17**, no salen de memoria:

| Modelo | Fuente |
|---|---|
| H145 (BK117 D-3) | [airbus.com/…/h145](https://www.airbus.com/en/products-services/helicopters/civil-helicopters/h145) — 2 × Arriel 2E, 5 palas, 241 km/h, ≈650 km, hasta 10 pax |
| H125 / AS350 | [airbus.com/…/h125](https://www.airbus.com/en/products-services/helicopters/civil-helicopters/h125) — Arriel 2D 952 shp, 2,250 kg, 1+6, 252 km/h, 630 km, récord del Everest 2005 |
| AS565 MBe Panther | Airbus — 2 × Arriel 2N, 4,500 kg, 165 kt, 780 km; **10 unidades entregadas a la Marina de México entre 2016 y 2017** |
| Bell 412 | [bellflight.com/products/bell-412](https://www.bellflight.com/products/bell-412) — Twin-Pac, 1+14, 5,534 kg, 228 km/h, 669 km |
| Mi-17 / Mi-8MTV | No hay ficha pública del fabricante: se usan los datos de la versión de exportación (2 × TV3-117, 13,000 kg, 24 pax, 225 km/h) |

Las cifras **varían con la versión y la configuración**, y la ficha lo dice en el comentario del
código: quien necesite el número exacto de SU aeronave va al manual, no a esta página.

**Dos piezas no tienen ficha de modelo a propósito**: el par rojo de rescate con librea AESSA y las
dos azules del gobierno de San Luis Potosí (matrícula XC-PSI). Por la foto no se puede afirmar qué
modelo son —el par azul tiene rotor de dos palas con barra estabilizadora, así que **no** es un Bell
407— y en esta página no se inventa un dato. Su ficha enseña lo que sí se sabe (librea, operador,
qué es la pieza) y marca el modelo como pendiente de confirmar con su papá. En cuanto lo diga, es
una línea: se le pone la clave del modelo y su ficha en `T.*.modelos`.

## Las fotos

Las 15 de `fotos/` salen de las 300 originales de Adán (`C:\Users\esped\Desktop\Aeroresinas\`,
carpetas `resina3` e `iCloud Photos (3)`), optimizadas para web: **1.2 MB en total**. `resina3` son
fotos de estudio con fondo blanco —las mejores que tiene— y de ahí sale todo el catálogo;
`iCloud Photos (3)` aporta las de librea real (Policía, Fuerza Aérea) y las del taller.

`fotos/LEEME.txt` dice qué es cada una. Lo que falta: una con **algo al lado que dé escala** y una
**réplica junto a la aeronave real** que copia — esa foto vende sola.

## Lo que hay que rellenar — `PERFIL`

Escalas, tiempo de entrega, envío, precio desde, WhatsApp, correo y ciudad. Ocho marcas, todas en
la constante `PERFIL` al principio del `<script>`, y salen **marcadas en cian** en la página.

`whatsapp` va en formato internacional y **solo dígitos** (`5215512345678`), que es lo que pide
`wa.me`. El formulario arma el mensaje con modelo y librea y abre WhatsApp con él ya escrito; sin
servidor, igual que Aeroresinas.

## Bilingüe con un solo archivo

Español e inglés con el diccionario `T` y atributos `data-t`. Pesa más aquí que en Aeroresinas: una
réplica se envía a cualquier parte, y el comprador de fuera llega en inglés.

## Dónde está enlazada

En la **barra de apps del Dashboard**, junto a Aeroresinas, con su propio icono — el helicóptero
sobre el pedestal de vitrina, porque es una réplica y no una aeronave. Con ella la fila llegó a 17
píldoras: ver "La barra de apps" en `../Dashboard/readme_dashboard.md`.

## Comprobado

Chromium `file://` a 1600 y 390 px, en español y en inglés: 13 imágenes, **ninguna rota**, 8 piezas
en el catálogo, sin desborde horizontal, sin errores de consola y sin marcadores sin resolver.
Desde el Dashboard la píldora abre la página, y el menú cruza a Aeroresinas y vuelve.

**Las ocho fichas**, recorridas una a una en los dos anchos y los dos idiomas: las seis con modelo
pintan 5 o 6 datos técnicos y sus tres bloques de texto; las dos sin modelo pintan su aviso y
ocultan la rejilla de datos en vez de dejarla vacía. Esc cierra y devuelve el scroll del fondo, las
flechas giran del 8 al 1, el clic y el Enter en la tarjeta abren, y el botón de encargo lleva el
modelo en el mensaje. El `<img>` del panel nace **sin** atributo `src` — con `src=""` el navegador
pide la propia página.
