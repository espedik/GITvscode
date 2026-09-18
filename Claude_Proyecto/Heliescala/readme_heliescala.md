# heliescala.html — helicópteros a escala en resina

La segunda mitad del negocio del papá de Adán: réplicas en resina de casi cualquier helicóptero,
hechas a mano. La reparación de aeronaves vive en
[`../Aeroresinas/`](../Aeroresinas/readme_aeroresinas.md), y es **otro negocio**.

**El nombre se eligió el 2026-09-17**, al partir la empresa en dos (Adán: *"dividiremos la empresa,
necesitaremos un nombre para eso"*). De cuatro opciones eligió **Heliescala**: nombre propio, corto,
se entiende solo y se busca fácil.

**Las dos páginas son independientes**: ninguna menciona a la otra ni enlaza con ella (Adán,
2026-09-17: *"de ambas páginas no pongas lo de que se relacionan"*). Se quitaron la sección puente,
los enlaces del menú y del pie, la firma *«por Aeroresinas»* de la barra —hoy dice **HECHO A MANO
EN MÉXICO**— y la frase del hero que se apoyaba en la reparación. En su lugar, el hero se sostiene
con lo suyo: **cada modelo sale de su propio molde**, y la librea, el número de unidad y la
matrícula se pintan una por una.

## Por qué es oscura

Fondo `#080c16` y acento cian, con la misma retícula técnica y la misma tipografía que se usa en
el resto del proyecto: **una maqueta es una pieza de vitrina y se ve mejor iluminada sobre negro**.
Las fotos del catálogo tienen fondo blanco de estudio, así que recortan solas contra el panel.

El archivo es **autónomo** —su CSS va dentro— porque algún día tendrá su propio dominio.

## Estructura

Barra → hero → **catálogo** (8 piezas reales) → **tu aeronave** → **cómo se hace una** (4 pasos,
con la foto del taller) → **entrega y envíos** → **galería** → contacto.

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
un juguete, y es el argumento de por qué estas réplicas salen de un taller de reparación.

**La foto de la ficha se ve entera, sin recorte** (`object-fit:contain`): con `cover` el panel la
recortaba y parecía que le hacía zoom, y en una ficha técnica lo que importa es la silueta completa
— es justo lo que se compara con el helicóptero real. El fondo de estas fotos ya es blanco de
estudio, así que el relleno no se nota.

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

## Entrega y envíos — el tabulador

Adán, 2026-09-17: *"ciudad de méxico y estado de méxico entregas personales, envíos por DHL costo
extra, haz un tabulador de estados o sea añade al diseño eso"*. La sección `#envios` es esa tabla:
**las 32 entidades del país repartidas en cuatro zonas**, y qué cuesta llegar a cada una.

| Zona | Entidades | Envío |
|---|---|---|
| **01 · Entrega en persona** | Ciudad de México, Estado de México (2) | **Sin costo** — se la entrega él |
| 02 · Centro | Hidalgo, Morelos, Puebla, Tlaxcala, Querétaro, Guanajuato, San Luis Potosí, Michoacán (8) | DHL — `envZ2` |
| 03 · Occidente y norte | Jalisco, Colima, Nayarit, Aguascalientes, Zacatecas, Durango, Sinaloa, Coahuila, Nuevo León, Tamaulipas, Chihuahua, Sonora (12) | DHL — `envZ3` |
| 04 · Sur, sureste y penínsulas | Guerrero, Oaxaca, Veracruz, Chiapas, Tabasco, Campeche, Yucatán, Quintana Roo, Baja California, Baja California Sur (10) | DHL — `envZ4` |

**La primera fila va en cian y las otras no**: es la buena noticia —entrega en mano, sin costo— y
es la que busca el cliente de la ciudad, que es la mayoría. Las otras tres esperan la tarifa.

Cada zona es `[nº, nombre, estados, costo]` en `T.*.envZonas`. El costo puede ser **texto fijo**
(«Sin costo») o **`'@clave'`**, y entonces se lee de `PERFIL` y se marca en cian si todavía falta —
un solo mecanismo para las dos cosas.

La nota del pie explica lo que sorprende al cliente: **el envío lo cotiza DHL sobre la caja ya
embalada**, porque en paquetería manda el volumen y no el peso, y una réplica pesa poco pero ocupa.
Varias piezas viajan en una caja y reparten el envío.

## El precio: `$1,800` es el punto de partida

Bajo las cuatro fichas del catálogo hay una línea que lo dice: el precio final depende del modelo,
del tamaño y de cuánta decoración lleve — **no cuesta lo mismo un fuselaje gris que una librea con
escudo, número de unidad y matrícula**. Cada encargo se cotiza antes de empezar.

La cifra se escribe `{desde}` en el texto y la sustituye `sub()` desde `PERFIL`, para no tener el
precio en dos sitios (Regla 1): sale en la ficha del catálogo, en el panel de cada helicóptero y en
esa nota, y se cambia en una línea.

## Las fotos

Las 15 de `fotos/` salen de las 300 originales de Adán (`C:\Users\esped\Desktop\Aeroresinas\`,
carpetas `resina3` e `iCloud Photos (3)`), optimizadas para web: **1.2 MB en total**. `resina3` son
fotos de estudio con fondo blanco —las mejores que tiene— y de ahí sale todo el catálogo;
`iCloud Photos (3)` aporta las de librea real (Policía, Fuerza Aérea) y las del taller.

`fotos/LEEME.txt` dice qué es cada una. Lo que falta: una con **algo al lado que dé escala** y una
**réplica junto a la aeronave real** que copia — esa foto vende sola.

## Lo que hay que rellenar — `PERFIL`

Ya están ciudad (Ciudad de México), tiempo (2 semanas), envío, precio desde ($1,800 MXN), WhatsApp
y correo. **Quedan cuatro marcas**, todas en la constante `PERFIL` y todas **en cian** en la página:

| Falta | Dónde se ve |
|---|---|
| `escalas` | En la ficha del catálogo y en el panel de cada helicóptero — dos veces |
| `envZ2`, `envZ3`, `envZ4` | La columna de costo del tabulador, una por zona |

Las tres tarifas de DHL **no se inventan**: cambian con el volumen de la caja, y un precio que
después no se cumple es peor que un hueco declarado.

`whatsapp` va en formato internacional y **solo dígitos** (`525586184919`), que es lo que pide
`wa.me`; `whatsappTxt` (`+52 55 8618 4919`) es cómo se escribe en pantalla. El formulario arma el
mensaje con modelo y librea y abre WhatsApp con él ya escrito; sin servidor, igual que Aeroresinas.

### `PERFIL_EN`

`PERFIL` es **un solo objeto** —un dato, un sitio— pero tres de sus valores son texto y en inglés
no pueden salir en español: `ciudad`, `tiempo` y `envio`. `PERFIL_EN` sobrescribe **solo esos
tres**, y `perfil()` devuelve la mezcla según el idioma. El resto (precio, teléfono, correo,
tarifas) es el mismo valor en los dos idiomas y no se duplica.

## Idioma: español por defecto, inglés a un toque

**La página abre SIEMPRE en español.** Hasta el 2026-09-17 seguía el idioma del navegador
(`navigator.language`), así que en un equipo configurado en inglés —el de Adán, por ejemplo— se
abría en inglés y parecía que no existía la versión en español. El cliente de aquí es mexicano: el
español es el punto de partida y no se negocia. Lo elegido se guarda en `localStorage`.

El selector es **un solo botón que dice a qué idioma cambias**, no en cuál estás: en español pone
*English*, en inglés pone *Español*. El par "ES | EN" obligaba a pensar cuál de los dos estaba
activo y en el teléfono era ilegible. Lleva un globo al lado y **nunca se oculta**, tampoco en
móvil (ahí se queda solo el globo).

Español e inglés viven en el diccionario `T` con atributos `data-t`. Pesa más aquí que en
Aeroresinas: una réplica se envía a cualquier parte, y el comprador de fuera llega en inglés — pero
llega a una página que abre en español y cambia con un toque.

## En el teléfono

- **El menú ya no desaparece** bajo 1080px: pasa a una tira que se desliza bajo la marca.
- **Botón flotante de WhatsApp** abajo a la derecha, solo en pantallas de teléfono.
- La barra se reordena en dos filas en vez de recortarse.

## La galería

`#galeria`, entre el proceso y el puente: entregas de varias unidades y producción en curso — el
trío del mismo lote, los fuselajes en fila esperando pintura y el Bell 412 de la policía con su
número. Sirve para lo que el catálogo no dice: que puede hacer **una flota entera igual**.

## Dónde está enlazada

En la **barra de apps del Dashboard**, junto a Aeroresinas, con su propio icono — el helicóptero
sobre el pedestal de vitrina, porque es una réplica y no una aeronave. Con ella la fila llegó a 17
píldoras: ver "La barra de apps" en `../Dashboard/readme_dashboard.md`.

## Comprobado

Chromium `file://` a 1600 y 390 px, en español y en inglés: 7 secciones, 16 imágenes, **ninguna
rota**, 8 piezas en el catálogo, 3 de galería, sin desborde horizontal, sin errores de consola y
**sin `{marcadores}` sin sustituir**. Los cuatro huecos que quedan salen marcados y son los cuatro
esperados. Desde el Dashboard la píldora abre la página. **Cero referencias a Aeroresinas** en el
cuerpo del documento (la única mención es la ruta en el comentario del `<style>`).

La única imagen que el navegador reporta sin cargar es `#fp-img`, el `<img>` del panel de ficha:
nace **sin** atributo `src` a propósito y está oculto hasta que se abre una ficha.

**El tabulador**: 4 zonas, 32 entidades sin repetir ninguna, la fila 01 en cian con «Sin costo» y
las otras tres con su marca. A 1600 px son tres columnas; bajo 820 px cada zona se apila y el costo
se alinea a la izquierda. Los contactos apuntan a `wa.me/525586184919` y a
`mailto:adanarturomartinez@gmail.com`.

**El idioma se probó con el navegador puesto en `en-US`**, que es el caso que fallaba: la página
abre en español, el botón dice *English*, cambia y vuelve. En 390px el menú es visible con sus 5
enlaces y el WhatsApp flotante aparece (en 1600 no).

**Las ocho fichas**, recorridas una a una en los dos anchos y los dos idiomas: las seis con modelo
pintan 5 o 6 datos técnicos y sus tres bloques de texto; las dos sin modelo pintan su aviso y
ocultan la rejilla de datos en vez de dejarla vacía. Esc cierra y devuelve el scroll del fondo, las
flechas giran del 8 al 1, el clic y el Enter en la tarjeta abren, y el botón de encargo lleva el
modelo en el mensaje. El `<img>` del panel nace **sin** atributo `src` — con `src=""` el navegador
pide la propia página.
