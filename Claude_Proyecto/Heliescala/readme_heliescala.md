# heliescala.html — helicópteros a escala en resina

La segunda mitad del negocio del papá de Adán: réplicas en resina de casi cualquier helicóptero,
hechas a mano. La reparación de aeronaves vive en
[`../Aeroresinas/`](../Aeroresinas/readme_aeroresinas.md), y es **otro negocio**.

**El nombre se eligió el 2026-09-17**, al partir la empresa en dos (Adán: *"dividiremos la empresa,
necesitaremos un nombre para eso"*). De cuatro opciones eligió **Heliescala**: nombre propio, corto,
se entiende solo y se busca fácil.

**Las dos páginas son independientes**: ninguna menciona a la otra ni enlaza con ella (Adán:
*"de ambas páginas no pongas lo de que se relacionan"*). No hay sección puente ni enlaces
cruzados; la barra dice **HECHO A MANO EN MÉXICO** y el hero se sostiene con lo suyo: **cada modelo sale de su propio molde**, y la librea, el número de unidad y la
matrícula se pintan una por una.

## Por qué es oscura, y el modo claro

Fondo `#080c16` y acento cian, con la misma retícula técnica y la misma tipografía que se usa en
el resto del proyecto: **una maqueta es una pieza de vitrina y se ve mejor iluminada sobre negro**.
Las fotos del catálogo tienen fondo blanco de estudio, así que recortan solas contra el panel.

**Hay modo claro** (Adán, 2026-09-18). El botón está junto al de idioma; el icono dice a qué tema
cambias —en oscuro se ve el sol— y lo elegido se guarda en `localStorage['heli-tema']`. **La página
abre siempre en oscuro**, porque esa es su identidad y la razón está en el párrafo de arriba; no
sigue `prefers-color-scheme` por el mismo motivo por el que no sigue el idioma del navegador.

Está hecho con `--ov`, la base de las superposiciones (`255,255,255` en oscuro, `10,16,32` en
claro): el tema claro son solo tokens. El cian baja a `#07707c` en claro porque `#00c2d4` sobre
blanco da 2.1:1, y el texto sobre el botón cian pasa a blanco (`--sobre-cian`). La barra tenía su
fondo fijo en oscuro y en claro dejaba el menú invisible; ahora es `--barra`.

**Lo que no se invierte**: el visor de fotos y el panel de la ficha del helicóptero. Son visores
sobre imagen y van oscuros en los dos temas; las fotos del catálogo siguen sobre blanco de estudio.

Medido con los colores calculados por el navegador, en los dos temas: todo el texto por encima de
4.5:1. De paso se corrigió el pie del tema oscuro, que daba **4.36:1** desde antes (`--t3` sube a
`#7f8ba4`, 5.2:1).

El archivo es **autónomo** —su CSS va dentro— porque algún día tendrá su propio dominio.

## Los archivos

| | Qué tiene |
|---|---|
| `heliescala.html` | La vista de la web: CSS, iconos, render, ficha del catálogo, visor, temas |
| `datos.js` | **Todo** el contenido: `PERFIL`, `PERFIL_EN` y `T` (los dos idiomas, las 26 piezas, las fichas de los modelos, el tabulador de envíos). Lo leen la web, **el catálogo en PDF** y **Posts** (`../Posts/readme_posts.md`), que arma los posts de LinkedIn con él. Por eso las tres van con `var`: Posts carga este archivo y el de Aeroresinas en la misma página, y dos `const PERFIL` chocarían |
| `dossier.html` | El molde del **PDF**: páginas carta fijas, leídas del mismo `datos.js` |
| `generar-pdf.js` | Genera `Heliescala-catalogo.pdf` con Chromium, comprobando antes que ninguna página desborda |
| `Heliescala-catalogo.pdf` | **El catálogo para mandar por WhatsApp.** 15 páginas, 4.8 MB |
| `qr-whatsapp.svg` | El QR de la última página: abre WhatsApp con el saludo ya escrito |
| `diseno-catalogo/` | Las tres direcciones del catálogo en PDF (Adán eligió la B) |

Los datos salieron del HTML el 2026-09-19, al hacer el PDF: con dos consumidores del mismo texto,
tenerlo dentro de uno de ellos habría sido tenerlo dos veces (regla 1). Se comprobó que la web
quedó idéntica: 26 piezas, 39 imágenes, las mismas palabras, los dos temas.

## El catálogo en PDF — ficha por modelo

Adán, 2026-09-19: *"ahora un pdf para resinas"*, y de las tres direcciones eligió la B (*"me gusta
la opción B"*): **una página por helicóptero de verdad**. A la izquierda las réplicas que hay de
ese tipo; a la derecha la **ficha del fabricante** —motor, rotor, peso, capacidad, crucero,
alcance—, para qué se usa, cómo se reconoce y quién lo vuela en México. Es lo que nadie más tiene:
los datos comprobados de `T.*.modelos`.

**Las 13 piezas sin modelo confirmado no se inventan una ficha.** Van en cuatro páginas por
familia —*Super Puma y Cougar*, *Rescate · librea AESSA*, *Bimotores corporativos y de Estado*,
*Ligeros, gobierno y ala fija*— con las fotos a todo lo ancho, lo que sí se sabe (librea, operador,
matrícula) y una nota que dice, literalmente, que el modelo exacto está por confirmar con el
taller. El reparto en familias es presentación del PDF y vive en `dossier.html`, no en los datos.

Las 15 páginas: portada oscura con el presidencial a sangre, índice, **5 fichas** (H145, H125,
Bell 412, Panther, Mi-17: 13 piezas), **4 familias** (13 piezas), la réplica de tu aeronave, cómo se
hace, envíos con el tabulador por zona, y contacto con QR. Todo lo demás es como en Aeroresinas:
paginación fija, índice con enlaces (comprobado: los 9 destinos resuelven a las páginas 3–11),
15 marcadores, `wa.me` con el mensaje ya escrito, texto seleccionable, y el generador se niega a
imprimir si algo desborda. **4.8 MB** — las fotos del catálogo son ligeras.

Dos cosas que salieron de mirar las páginas: el índice va **a dos columnas**, porque 26 filas y 9
cabeceras se pasaban 381 px en una; y en las páginas de familia las fotos ocupan **todo el ancho**
con la nota abajo, porque una columna lateral repetía el texto que ya llevaba cada foto.

```bash
cd Heliescala
NODE_PATH="C:/Users/esped/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules" node generar-pdf.js      # español
NODE_PATH="…" node generar-pdf.js en                                                                        # inglés
```

## Estructura

Barra → hero → **catálogo** (8 piezas reales) → **tu aeronave** → **cómo se hace una** (4 pasos,
con la foto del taller) → **entrega y envíos** → **galería** → contacto.

**"La réplica de tu propia aeronave" es la sección que vende**, no el catálogo: el catálogo prueba
que puede hacer cualquier modelo, y esa sección convierte esa prueba en un encargo — el helicóptero
que vuelas o que operas, con sus colores, su número de unidad y su matrícula. Sirve de regalo de
retiro, de reconocimiento, de pieza de recepción o de obsequio a un cliente.

Sus dos fotos lo demuestran en vez de prometerlo: un Bell 412 de la policía con su número de
unidad, y **una pieza con placa en la base con el nombre del dueño**. Esa placa es exactamente lo
que compra quien encarga una.

**"Cómo se hace una"** existe para justificar el precio: molde, colada, lijado y montaje, y pintura
a mano. No es un juguete pintado, y hay que decirlo con el taller de fondo.

## El catálogo — 26 piezas

Adán: *"siento que en ambas no estás usando todas las imágenes, usa todas y pon la información
completa"*. Se revisaron las 321 fotos originales, carpeta por carpeta.

| Grupo | Piezas |
|---|---|
| Civil y corporativo | H145 (dos libreas), H145 **XA-MVR**, AgustaWestland **Grand New XB-HFY**, **XA-ECJ**, bimotor con fenestrón, AS350/H125 de servicios médicos, monomotor rojo de gran formato |
| Rescate | Par en librea AESSA, **XA-MCM**, **XA-JGH** |
| Marina | Tres Panther en serie, Panther sanitario con la cruz roja |
| Fuerza Aérea | **MX-UMA**, Bell 412 en camuflaje, Super Puma **1006**, Mi-17 |
| Policía | La flota Cóndores (dos fotos distintas) |
| Militar | Super Puma con camuflaje verde, Cougar con camuflaje gris, ligero con camuflaje |
| Gobierno estatal | Dos de San Luis Potosí, **XC-PSI** |
| Otros | Mi-17, **el presidencial de Estados Unidos** y un **bimotor de ala fija** |

**Dos piezas cambian lo que la página puede decir**:

- **El presidencial de Estados Unidos**, verde y blanco, con *UNITED STATES OF AMERICA* rotulado en
  el costado. Es la librea más reconocible del mundo y prueba que el catálogo no se limita a
  aeronaves mexicanas.
- **Un avión**. No todo son helicópteros, y hasta hoy la página afirmaba lo contrario por omisión.

**Donde la matrícula se lee en la foto, se escribe** (XA-MVR, XB-HFY, XA-MCM, XA-JGH, MX-UMA,
XA-ECJ, XC-PSI): es lo que demuestra que cada pieza salió de una aeronave concreta y no de un
molde genérico.

La cifra del hero dice **26 y no "30+"**. El 30+ era una estimación mía y era el único número de
las dos páginas que no venía de un dato comprobable; 26 son las piezas que se pueden contar en la
pantalla.

Para añadir un modelo hacen falta dos cosas: la foto en `fotos/` y una línea en `T.es.piezas` de
`datos.js` (con su traducción en `T.en.piezas`). Sale en la web y en el PDF a la vez; en el PDF cae
en la ficha de su modelo si lo tiene, o en «Más piezas» si no encaja en ninguna familia. Cada línea es `[clave, nombre, foto, texto, etiquetas, modelo]`:
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

**Trece de las 26 piezas no tienen ficha de modelo a propósito** — entre ellas el par rojo de
rescate con librea AESSA y las dos azules del gobierno de San Luis Potosí (matrícula XC-PSI).
Enseñan lo que sí se sabe (librea, operador, matrícula cuando se lee) y marcan el modelo como
pendiente. Confirmar cada uno es **una línea**: se le pone la clave del modelo y su ficha en
`T.*.modelos`. Por la foto no se puede afirmar qué
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

## El visor de fotos

Adán, 2026-09-17: *"cuando intento ver las fotos en grande no se puede ver, cuando hago clic
debería de verse"*. Lo dijo por Aeroresinas, pero aquí pasaba lo mismo: las fotos del taller, de la
producción y de la sala de exposición iban recortadas dentro de sus tarjetas.

**El catálogo queda fuera a propósito**: tocar una pieza abre su ficha técnica, y dos cosas
distintas con el mismo clic confunden. El visor es para el hero, "tu aeronave", el taller y la
galería — 13 fotos.

**Cualquier foto de la página se abre a pantalla completa con un clic**, y se ve **entera**
(`contain`, sin recorte). Se recorren las 13 con las flechas del teclado o los botones, se cierra
con Esc, con la ✕ o con un clic fuera, y al cerrar **el scroll vuelve a la foto que estabas
mirando** — sin eso, cerrar en la etapa 5 de un trabajo te dejaba arriba del todo.

**Un segundo clic la lleva a tamaño real.** Medido: en una ventana de 900 px de alto, una foto
vertical de 1000×1333 se mostraba ajustada a 567×755, **más chica que el archivo**. Ampliada llega
a sus 1000×1333 y el visor se arrastra. Cada foto nueva vuelve a empezar ajustada, porque heredar
el zoom de la anterior desorienta cuando cada imagen tiene otro tamaño.

El pie de la foto viaja con ella, que es cuando sirve.

El clic está **delegado en `document`** y la lista se recoge al abrir. Las fotos las pinta el
render desde el diccionario, así que engancharse a cada `<img>` obligaría a re-enganchar en cada
repintado y en cada cambio de idioma. Una lupa aparece al pasar el cursor —en móvil siempre— porque
sin ella nadie sabe que se puede abrir.

## Las fotos

Las **42** de `fotos/` salen de las **321 originales** de Adán (fuera del repo, en
`C:\Users\esped\Desktop\Aeroresinas\`, carpetas *resina*, *resina2*, *resina3* e *iCloud Photos (3)*),
optimizadas para web: **5.4 MB en total**. *resina3* son fotos de estudio con fondo blanco —las
mejores que tiene— y de ahí salen las ocho primeras del catálogo; *resina* y *resina2* aportan los
militares, el presidencial y las piezas en bruto; *iCloud Photos (3)*, las de matrícula real, la
producción y la sala de exposición.

`fotos/LEEME.txt` dice qué es cada una.

Lo que falta: una con **algo al lado que dé escala** —con 26 piezas sigue sin saberse de qué tamaño
son— y una **réplica junto a la aeronave real** que copia. Esta segunda está a un paso: la XA-MVR
existe como réplica y la aeronave real está fotografiada; falta una sola foto con las dos juntas.

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

**La página abre SIEMPRE en español**, no en el idioma del navegador (`navigator.language`): en
un equipo configurado en inglés —el de Adán— se abría en inglés y parecía que no existía la
versión en español. El cliente de aquí es mexicano: el español es el punto de partida y no se
negocia. Lo elegido se guarda en `localStorage['heli-idioma']`.

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

Nueve fotos del taller y de lo que sale de él. Tres importan más que el resto:

- **La sala de exposición.** Piezas suyas montadas sobre pedestal, detrás del cordón. Es lo más
  cerca que tiene la página de una credencial.
- **Seis iguales.** Un pedido de flota completo, mismo modelo y mismo camuflaje. Demuestra lo que
  el catálogo no puede: que repite una pieza sin que se note la diferencia.
- **Las piezas en bruto.** Recién salidas del molde, sin lijar y sin pintar, con la lija y el
  pegamento al lado. Justifican el precio mejor que cualquier frase.

## Dónde está enlazada

En la **barra de apps del Dashboard**, junto a Aeroresinas, con su propio icono — el helicóptero
sobre el pedestal de vitrina, porque es una réplica y no una aeronave. Ver "La barra de apps" en
`../Dashboard/readme_dashboard.md`.

## Comprobado

Chromium `file://` a 1600 y 390 px, en español y en inglés: 7 secciones, **39 imágenes, ninguna
rota**, **26 piezas** en el catálogo, 9 de galería, sin desborde horizontal, sin errores de consola
y **sin `{marcadores}` sin sustituir**. Los cuatro huecos que quedan salen marcados y son los
cuatro esperados. Desde el Dashboard la píldora abre la página. **Cero referencias a Aeroresinas**
en el cuerpo del documento (la única mención es la ruta en el comentario del `<style>`).

Las 39 imágenes se comprobaron **forzando la carga de todo lo diferido**: con `lazy` una foto rota
no se detecta hasta que alguien baja hasta ella.

**El visor**, probado a 1600 y 390 px: 13 fotos abribles, abre sin recortar, las flechas pasan de
foto, Esc cierra y el segundo clic lleva de 1007×755 a 1300×975. Su Esc y sus flechas se capturan
antes que las de la ficha del catálogo, así que con el visor abierto manda el visor —que es lo que
está encima— y con el visor cerrado siguen funcionando en la ficha.

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
