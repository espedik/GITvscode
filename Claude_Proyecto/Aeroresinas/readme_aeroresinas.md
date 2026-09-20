# aeroresinas.html — reparación estructural de helicópteros

La página pública del taller del papá de Adán. No es una herramienta suya: está hecha para
conseguirle clientes, así que no guarda estado, no depende del Dashboard y tiene que abrirse bien
en el teléfono de un desconocido al que le llegó el enlace por WhatsApp.

Las réplicas en resina son **otro negocio**, con su propia página
([`../Heliescala/`](../Heliescala/readme_heliescala.md)), y **son independientes**: ninguna
menciona a la otra ni enlaza con ella (Adán, 2026-09-17: *"de ambas páginas no pongas lo de que se
relacionan"*). Lo único que las relaciona es esta documentación y la carpeta del repositorio; nada
de eso lo ve un cliente.

## Los archivos

| | Qué tiene |
|---|---|
| `aeroresinas.html` | El molde y el CSS de la web. Ni una frase de contenido |
| `datos.js` | **Todo** el texto, en español e inglés, más la constante `PERFIL`. Lo leen la web **y el dossier** |
| `dossier.html` | El molde del **PDF**: páginas carta fijas, leídas del mismo `datos.js` |
| `generar-pdf.js` | Genera `Aeroresinas-dossier.pdf` con Chromium, comprobando antes que ninguna página desborda |
| `Aeroresinas-dossier.pdf` | **El portafolio para mandar por WhatsApp.** 24 páginas, 11.8 MB |
| `qr-whatsapp.svg` | El QR de la última página: abre WhatsApp con el saludo ya escrito |

## El dossier en PDF

Adán, 2026-09-19: *"haz un pdf con el mejor diseño que puedas e info"*, tras preguntar si la web
podía ser un PDF interactivo. La respuesta corta es que **«interactivo» en PDF es mucho menos que
en HTML**, y el dossier usa exactamente lo que sí funciona en cualquier lector — teléfono, WhatsApp,
Chrome, papel:

- **Índice con enlaces** (página 5): los 14 trabajos, cada uno salta a su página. Se comprobó
  abriendo el PDF: los 14 destinos resuelven a las páginas 6–19, las mismas que imprime el índice.
- **Marcadores del lector**: 24, uno por página, del `h1`/`h2` de cada una.
- **WhatsApp con el mensaje ya escrito**: `wa.me/…?text=` en la portada, en el AOG y en contacto.
  Más `mailto:` y los dos LinkedIn.
- **QR** en la última página, para el que lo tiene impreso delante.
- **Texto seleccionable** (PDF etiquetado), no una imagen de la página.

**No es la web impresa.** Son 24 páginas carta de paginación **fija** —cada `<section class="pg">`
es una página— porque así el índice puede decir *p. 12* sin adivinar. Portada oscura con la
aeronave a sangre, quién soy, qué reparo (2), índice, **un trabajo por página** (14), aeronaves,
cómo trabajo, técnicas, preguntas y contacto.

**La rejilla de etapas cambia con el número de fotos**, al revés que en la web: dos van una encima
de otra a todo lo ancho, tres con la primera grande, cuatro en 2×2, cinco y seis en tres columnas.
En pantalla una foto pequeña se amplía con un clic; **en papel una página medio vacía se lee como
"se acabó"**. Medido: con la rejilla fija de la web, el trabajo de 2 etapas dejaba el 55 % de la
página en blanco. Las dos páginas de solo texto llevan una foto del taller al pie por lo mismo.

**Regla 1, respetada.** `dossier.html` lee `datos.js`: cambiar un pie de foto ahí cambia la web y
el PDF. Nada está escrito dos veces. Para regenerarlo:

```bash
cd Aeroresinas
NODE_PATH="C:/Users/esped/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules" node generar-pdf.js      # español
NODE_PATH="…" node generar-pdf.js en                                                                        # inglés
```

El generador **mide cada página antes de imprimir** y se niega a generar si alguna desborda sus
11 in o si hay una imagen rota — lo que se sale de una página fija se corta sin aviso, y así no
puede pasar en silencio. Las fotos van del mismo `fotos/`; Chromium las incrusta tal cual, de ahí
los 11.8 MB (69 imágenes). Cabe en WhatsApp de sobra.

**Lo que el PDF no lleva, a propósito**: el visor de fotos (el zoom del lector hace lo mismo), el
botón de idioma (el inglés es otro archivo, `generar-pdf.js en`) y el tema oscuro (en papel no
tiene sentido).

Se separaron cuando Adán pidió *"muchísima información"* y el contenido pasó de 400 a más de 1,500
líneas: buscar una frase dentro del HTML era buscar una aguja. Para cambiar cualquier texto solo se
toca `datos.js`, y las tres reglas de qué se puede escribir ahí están en su cabecera.

## La voz: habla él, en primera persona

Adán, 2026-09-18: *"es la página de Arturo, pero habla como la empresa"*. Tenía razón y era general,
no un descuido suelto: medidas **30 líneas con marca de tercera persona y ninguna en primera**. La
página estaba escrita desde fuera —*qué repara*, *cómo trabaja*, *contesta él*, *cuéntale*— como si
una empresa presentara a un empleado. Es su página: **habla él**.

*Qué reparo · Cómo trabajo · Las aeronaves con las que trabajo · Quién soy · Cuéntame qué le pasó a
tu aeronave · Contesto yo, no un conmutador.* En inglés igual: *What I repair, How I work, Who I am,
Tell me what happened to your aircraft.*

**Solo cambió la persona.** Ni un dato, ni una cifra, ni el tono. Y el **impersonal técnico se
queda** —*se abre y se sanea*, *se retira material hasta zona sana*, *se compara con los límites del
manual*—: es el registro del oficio, lo usa cualquier manual de mantenimiento, y suena a alguien que
sabe. Cambiarlo a *yo abro, yo saneo* habría sonado a folleto.

Al pasar a primera persona, dos preguntas cambiaron de dueño: *¿Trabaja fuera de la Ciudad de
México?* es ahora *¿Trabajas…?*, porque quien pregunta se dirige a él y no a un tercero.

## Quién es, y por qué eso lo cambia todo

**José Arturo Martínez Ponce**, técnico de mantenimiento de aeronaves con licencia **DGAC**. Los
datos salen de su perfil profesional, no de suposiciones:

| | |
|---|---|
| **1988 — 2024** | **Airbus**, técnico de mantenimiento. 36 años de planta trabajando estructura en A320, A321, ATR 42 y ATR 72 |
| **2025 — hoy** | **Aeroresinas**, por su cuenta: reparación estructural de helicópteros |
| Aeronaves | Bell, Airbus Helicopters y Robinson |
| Clientes | Operadores civiles, privados y gubernamentales |
| Dónde | México, Panamá y Guatemala — hangar y campo |
| Base | Miguel Hidalgo, Ciudad de México |
| Especialidad | Composites (fibra de vidrio), técnicas al vacío, parabrisas y acrílicos, estructuras remachadas |
| Además | Soporte **AOG**, movilidad internacional, colaboración con talleres **MRO** |

**36 años en Airbus es el argumento de la página entera.** Un dueño de aeronave no contrata a un
desconocido para abrir su fuselaje: contrata a alguien con un historial que puede comprobar. Por
eso la trayectoria tiene sección propia, los 20 trabajos de su historial están listados con nombre
y apellido, y la página enlaza a su LinkedIn — la prueba verificable de todo lo anterior.

**Van los dos LinkedIn, en filas separadas y con etiqueta propia**, porque no prueban lo mismo:

| Fila | Enlace | Qué prueba |
|---|---|---|
| LINKEDIN | [Perfil personal](https://www.linkedin.com/in/jose-arturo-martinez-ponce-34697b243/) | **La persona**: los 36 años en Airbus, con fechas. Es el que convence |
| EMPRESA | [Aeroresinas](https://www.linkedin.com/company/107151473/) | **El negocio**: que existe y tiene nombre |

## Cómo está ordenada

Diez secciones, en el orden en que un cliente decide:

| # | Sección | Para qué está |
|---|---|---|
| 1 | Hero | Qué hace y dónde, con las cuatro cifras que importan: 36 años en Airbus, licencia DGAC, marcas que repara, países |

Son **11 secciones**, y el orden no es casual: los 14 trabajos terminan en paneles abiertos, y lo siguiente que ve el visitante son **aeronaves enteras en línea de vuelo**. Ese contraste es el argumento entero de la página, y por eso `#flota` va pegada a `#trabajos` y no al final.
| 2 | **Qué repara** | 7 servicios, cada uno con foto, descripción y **un apunte de oficio** — lo que un técnico sabe y el dueño no |
| 3 | **Trabajos** | Índice de los 14 casos + el elegido con sus etapas en orden. 51 fotos en total |
| 4 | **Aeronaves** | 6 aeronaves completas, en el hangar. Es lo único de la página que no es trabajo abierto |
| 5 | **Cómo trabaja** | 6 pasos, cobertura y el bloque de **AOG** |
| 6 | **Técnicas** | 8 términos explicados en claro, para poder juzgar un presupuesto |
| 7 | **Trayectoria** | Las dos etapas y los 20 trabajos de su historial en Airbus |
| 8 | **Quién lo hace** | Su biografía completa y 6 credenciales |
| 9 | Galería | 12 fotos: el taller, las bolsas de vacío, la cabina protegida |
| 10 | **Preguntas** | 8 preguntas reales con respuesta honesta |
| 11 | Contacto | WhatsApp, correo, **los dos LinkedIn**, base y licencia, más el formulario |

**Tres secciones existen para vender sin decir "compre"**:

- **El apunte de oficio de cada servicio.** *"Un daño de 10 cm en la piel puede haber deformado el
  larguero de abajo"*, *"un acrílico se agrieta por tensión, no por golpe"*. Demuestra dominio en
  una línea, que es más de lo que consigue un párrafo de adjetivos.
- **Técnicas explicadas.** Bolsa de vacío, SRM/AMM/boletines, panel sándwich, doubler,
  delaminación, líquidos penetrantes, puenteo eléctrico y sellado. Están escritas **para el dueño
  de la aeronave**, no para el técnico: quien entiende el presupuesto confía más en quien se lo da.
- **Preguntas.** Incluida la incómoda —*"¿y si el daño excede el manual?"*— con la respuesta que da
  confianza: *se sustituye, no se remienda*.

El **AOG** tiene bloque propio, en ámbar, porque es lo único urgente de la página: quien tiene una
aeronave parada no está para leer, y su botón abre WhatsApp con el mensaje ya escrito.

**No tiene taller propio, y la página no finge que sí.** Una de las preguntas lo dice entera: va él
a donde esté la aeronave —por eso no hay dirección a donde mandarla— y lo único que se trabaja
fuera son **piezas pequeñas desmontadas**, una tapa, un carenado, una ventanilla o un acrílico, que
sí se le pueden entregar y devuelve listas para montar. Es un servicio más, no una limitación, y
aparece dicho así.

**Lo que no está y es deliberado: la facturación.** Adán, 2026-09-17: *"no factura de momento,
déjalo pendiente"*. Se queda fuera de la página hasta que haya con qué responder; prometerlo y no
poder cumplirlo cuesta más que no mencionarlo. Cuando exista, va en las preguntas.

## Los 14 trabajos — índice y escenario

Cada uno corresponde a fotos suyas, **en el orden real en que ocurrió el trabajo**. Son 51 fotos de
etapas, y siete de los catorce casos llegan hasta la pieza terminada.

**No se muestran los 14 a la vez.** A la izquierda, un **índice pegajoso** con los catorce (número,
título y cuántas etapas tiene); a la derecha, el **escenario**: solo el caso elegido, con sus
etiquetas de técnica, su descripción y sus etapas en rejilla. Se cambia tocando el índice o con las
flechas del escenario, que se deshabilitan en los extremos. Es la dirección C de
`diseno-trabajos/`, elegida por Adán el 2026-09-18 (*"opción c"*).

**Por qué, medido.** Con los 14 apilados la página entera medía **17 900 px en escritorio —20
pantallas— y 38 999 px en móvil, 43 pantallas**, y `#trabajos` se llevaba el **43 % y el 47 %**. Los
14 casos sumaban 7 091 px, y en el teléfono **uno solo llegaba a 1 908 px**: más de dos pantallas
para un trabajo. Todo lo que va después —aeronaves, técnicas, quién es, preguntas y **el
contacto**— quedaba enterrado detrás.

| | Antes | Ahora |
|---|---|---|
| Página, escritorio | 17 900 px · **20 pantallas** | 11 286 px · **12.5** |
| Página, móvil | 38 999 px · **43 pantallas** | 22 481 px · **25** |
| `#trabajos` | 7 631 px · 43 % del total | **1 017 px · 9 %** |
| Imágenes en el DOM | 81 | **34** |

**Solo un caso está en el DOM a la vez**, que es de dónde sale la mitad del ahorro: no es que se
oculten con CSS, es que no se pintan. El visor de fotos recorre lo que hay en el DOM, así que
también baja de 81 a 35.

**Bajo 1080 px el índice deja de ser columna** y pasa a una tira horizontal que se desliza sobre el
escenario: una barra lateral de 320 px se comía el ancho útil justo donde menos sobra.

`.trab-es` lleva `min-height:620px` en escritorio para que la página **no dé un salto** al cambiar
de caso — uno de 2 etapas y otro de 6 no miden lo mismo.

| # | Caso | Etapas | Llega a |
|---|---|---|---|
| 01 | Techo de cabina de un Bell | 4 | **Pintado, sin rastro** |
| 02 | Carenado con el núcleo deshecho | 4 | **Entregado con su librea** |
| 03 | Techo delaminado | 3 | Cerrado |
| 04 | Piel y estructura | 3 | Estructura repuesta |
| 05 | Nariz | 2 | Cerrada |
| 06 | Parabrisas y acrílicos | 3 | Cristal montado |
| 07 | Tomas de aire y rejillas | 3 | Alojamiento saneado |
| 08 | Puertas y estabilizador | 2 | Saneado |
| 09 | **Techo con corrosión, larguero y piel nueva** | 5 | **Cerrado, antenas montadas** |
| 10 | **Radomo delaminado** | 4 | Sellado |
| 11 | **Antenas: desmontaje, sellado y puenteo** | 5 | **Montadas en la aeronave** |
| 12 | **Costado bajo el parabrisas** | 6 | **Terminado** |
| 13 | **Nariz del monomotor** | 4 | **Entregada con librea** |
| 14 | **Estabilizador horizontal** | 3 | **Pintado con sus franjas** |

**Todas las fotos de etapa miden lo mismo**, en los catorce casos. La rejilla es **fija** —3
columnas, 2 bajo 1080 px y 1 bajo 520— y **no depende de cuántas etapas tenga el trabajo**. Son 3 y
no 4 porque el escenario le cede 346 px al índice: a 4 columnas las fotos se quedaban en 220 px.

Hasta el 2026-09-18 la clase era `etapas n<número de etapas>`, con reglas de CSS solo para `n2`,
`n3` y `n4`. Al pasar los casos de 8 a 14 aparecieron uno de **5** etapas y otro de **6**: `n5` y
`n6` no existían, así que caían al `display:grid` pelado —una columna— y sus fotos salían **a todo
el ancho de la sección**. Y aun con la clase correcta el tamaño dependía del caso: un trabajo de 2
etapas daba fotos del doble de ancho que uno de 4, con el mismo alto de 250 px. De ahí venía la
desproporción.

Medido: **un solo tamaño en cada ancho** (281×250 a 1600 px, 461×250 a 1000, 385×250 en iPad,
354×250 en móvil), y **cero trabajos con fotos desiguales**. Una fila incompleta deja huecos, que es
lo que toca en una rejilla.

**El 12 es el mejor caso de la página** y por eso tiene seis etapas: daño, piel desprendida con el
número de parte legible, preparación, laminado, **curado bajo bolsa de vacío con la manguera
conectada** y la pieza terminada. Es la única secuencia donde se ve el proceso completo, incluida
la técnica que la página explica en `#tecnicas`.

**El 11 cierra dos huecos a la vez.** Enseña una antena montada —que faltaba— y, sobre todo, el
**puenteo eléctrico**: las tiras en estrella alrededor de la base de la antena. Estaba en la lista
de 20 capacidades sin una sola foto, y es de las cosas que un operador entiende al verlas.

## El visor de fotos

Adán, 2026-09-17: *"cuando intento ver las fotos en grande no se puede ver, cuando hago clic
debería de verse"*. Tenía razón y era grave en esta página en concreto: las fotos iban recortadas
a `object-fit:cover` dentro de tarjetas de 180 a 430 px de alto, y **lo que hay que mirar en una
reparación es justo el detalle** — la trama de la fibra, la huella hexagonal del núcleo, el número
de parte estampado en la piel. Todo eso cabía en una franja recortada.

**Cualquier foto de la página se abre a pantalla completa con un clic**, y se ve **entera**
(`contain`, sin recorte). Se recorren con las flechas del teclado o los botones, se cierra
con Esc, con la ✕ o con un clic fuera, y al cerrar **el scroll vuelve a la foto que estabas
mirando** — sin eso, cerrar en la etapa 5 de un trabajo te dejaba arriba del todo.

**Un segundo clic la lleva a tamaño real.** Medido: en una ventana de 900 px de alto, una foto
vertical de 1000×1333 se mostraba ajustada a 567×755, **más chica que el archivo**. Ampliada llega
a sus 1000×1333 y el visor se arrastra. Cada foto nueva vuelve a empezar ajustada, porque heredar
el zoom de la anterior desorienta cuando cada imagen tiene otro tamaño.

El pie de la foto viaja con ella: en un trabajo, eso significa que **la etapa se lee mientras se
mira la imagen** («03 · Relleno y lijado…»), que es cuando sirve.

El clic está **delegado en `document`** y la lista se recoge al abrir. Las fotos las pinta el
render desde el diccionario, así que engancharse a cada `<img>` obligaría a re-enganchar en cada
repintado y en cada cambio de idioma. Una lupa aparece al pasar el cursor —en móvil siempre— porque
sin ella nadie sabe que se puede abrir.

## Las fotos

**73 en `fotos/`**, salidas de las **321 originales** que pasó Adán
(`C:\Users\esped\Desktop\Aeroresinas\`, carpetas `reparacion`, `reparacion2` e `iCloud Photos (3)`),
elegidas viéndolas todas en hojas de contacto y optimizadas: rotadas según EXIF, 1000–1300 px de
ancho y JPEG progresivo al 79 % — **13.5 MB en total** frente a los ~45 MB de los originales, que
no se tocaron. `fotos/LEEME.txt` dice qué es cada una, caso por caso.

Hasta el 2026-09-17 solo había 31, y dos carpetas enteras de originales estaban sin revisar. De
ahí salieron las cinco secuencias nuevas, la bolsa de vacío, el puenteo eléctrico y las seis
aeronaves terminadas.

Cada foto lleva **pie**: una reparación abierta no se entiende sola, y el pie es lo que convierte
la foto en argumento. Todas van con `loading="lazy"`.

**"Quién lo hace" tiene cara.** `retrato.jpg` es la única foto de la página en la que se le ve el
rostro, y por eso va ahí: nadie deja entrar a un desconocido a abrir su fuselaje, y una foto de
espaldas no presenta a nadie. Lleva pie con su nombre, su licencia y sus años, para que el nombre y
la cara lleguen juntos. Es cuadrada y el rostro cae arriba, así que el recorte se ancla en
`object-position:50% 22%` — centrado se comía la frente. `trabajando.jpg`, que ocupaba ese sitio,
no se perdió: sigue en la galería, que es donde valía.

Lo que falta: una foto de **una antena montada** y una de **aeronave terminada** — hoy todas son de
trabajo abierto y no hay ninguna del resultado.

## `PERFIL` está completo

**Ningún hueco.** Nombre, licencia DGAC, WhatsApp, correo, ciudad, cobertura, años y los dos
LinkedIn. La página no muestra ni un marcador en azul.

`whatsapp` va en formato internacional y **solo dígitos** (`525586184919`), que es lo que pide
`wa.me`; `whatsappTxt` (`+52 55 8618 4919`) es cómo se escribe en pantalla. El correo es
`adanarturomartinez@gmail.com`.

Las etiquetas de las vías de contacto (`kWa`, `kMail`, `kIn`, `kEmp`, `kBase`, `kLic`) viven en el
diccionario, no en el HTML: estaban fijas en español y en la versión inglesa salía *CORREO*.

## Sin backend, a propósito

El formulario no manda nada a ningún lado: arma el mensaje y abre **WhatsApp** con él ya escrito.
Es lo único que funciona igual desde `file://` y desde un dominio sin pagar un servidor, y deja la
conversación en el teléfono de su papá.

Las etiquetas **Open Graph** del `<head>` no son adorno: es lo que se ve cuando el enlace se manda
por WhatsApp, que es como va a llegar a la mayoría de los clientes.

## Idioma: español por defecto, inglés a un toque

**La página abre SIEMPRE en español.** Hasta el 2026-09-17 seguía el idioma del navegador, así que
en un equipo configurado en inglés se abría en inglés y parecía que no existía la versión en
español. El cliente de aquí es mexicano.

El selector es **un botón que dice a qué idioma cambias**, no en cuál estás: en español pone
*English*. Nunca se oculta, tampoco en móvil (ahí queda solo el globo).

Los dos idiomas están completos. El contenido de `datos.js` son **4,192 palabras en español y
3,901 en inglés**, medidas con los 14 trabajos pintados a la vez; con el índice y el escenario en
pantalla hay **2,683 y 2,493**, porque solo un caso se pinta cada vez. No falta nada: el resto
está a un toque en el índice.

## En el teléfono

- El menú **no desaparece**: pasa a una tira que se desliza bajo la marca.
- **Botón flotante de WhatsApp** abajo a la derecha.
- Los casos pasan de 4 columnas a 2 y luego a 1; las preguntas y las técnicas, a una columna.

## Material, y el modo oscuro

Blanco y transparente: vidrio (blanco al 72 % con `backdrop-filter`) sobre un cielo claro con dos
auroras y una retícula técnica al 4,5 %, para que se lea como un plano y no como un folleto. Un
solo acento, `#1b47ff`; el ámbar aparece **una vez**, en el AOG, que es lo único urgente.

**Hay modo oscuro** (Adán, 2026-09-18: *"en ambos html de Aeroresinas y Heliescala, pon modo
oscuro y modo claro"*). El botón está junto al de idioma y sigue el mismo criterio: **el icono dice
a qué tema cambias**, no en cuál estás — en claro se ve la luna. Lo elegido se guarda en
`localStorage['aero-tema']`.

**La página abre siempre en claro.** No sigue `prefers-color-scheme`: nació blanca por encargo
(*"quiero que se base en el color blanco y transparente"*), y arrancar en el tema del sistema haría
que un visitante viera una página que no es la que se diseñó. Es el mismo criterio que con el
idioma, que abre siempre en español.

**Cómo está hecho, y por qué es barato.** Todo cuelga de `--ov`, la base de las superposiciones:
`10,16,32` (tinta sobre blanco) en claro y `255,255,255` en oscuro. Las líneas, los vidrios, la
retícula y las tarjetas están escritas como `rgba(var(--ov),X)`, así que **el tema oscuro son solo
tokens** —ni una regla duplicada. Es el patrón del Dashboard.

Tres cosas que salieron de **medir el contraste**, no de mirarlo:

- `--tinta` hacía dos trabajos: color del texto **y** fondo de los bloques oscuros (pie, AOG,
  «2025 — hoy», el ítem activo del índice, el cuadro de la marca). Al invertir, esos bloques se
  volvían blancos con texto blanco: **1.09:1**. Se separó en `--sup`, la superficie fuerte, que es
  oscura en los dos temas porque su trabajo es contrastar con la página, no acompañarla.
- `.sec-blanca` tenía `#fff` fijo: media página seguía blanca en oscuro. Ahora es `--panel`.
- El azul sube a `#6b8cff` en oscuro (`#1b47ff` sobre `#0b1018` da 2.2:1) y el texto de los botones
  primarios pasa a `--sobre-azul`, oscuro, porque blanco sobre ese azul claro daba 2.6:1.

**Lo que no se invierte, a propósito**: el visor de fotos, el AOG, la tarjeta «2025 — hoy» y el
pie. Son oscuros en los dos temas.

Medido en los dos temas con los colores calculados por el navegador: **títulos, cuerpo, menú,
índice, credenciales, botones y pie, todos por encima de 4.5:1** (la mayoría entre 6 y 19). El
tema cambia con el botón, se guarda y **sobrevive a la recarga**.

Tipografía: **Space Grotesk** (títulos), **IBM Plex Sans** (cuerpo), **IBM Plex Mono** (datos). La
hoja de Google **no bloquea el pintado** (`media="print"` + `onload`).

## Dónde está enlazada

En la **barra de apps del Dashboard**, en un grupo propio al final — ver "La barra de apps" en
`../Dashboard/readme_dashboard.md`.

## Comprobado

Chromium `file://` a 1600, 1000, 820 y 390 px, en español y en inglés, **con el navegador puesto en
`en-US`** (el caso que fallaba): abre en español, **11 secciones**, 7 servicios, **índice de 14
trabajos** que abre el caso elegido con sus etapas,
6 aeronaves, 6 pasos, 8 técnicas, 20 capacidades, 6 credenciales, **12 fotos de galería**, 8
preguntas, **33 imágenes en el DOM y ninguna rota**, **cero huecos**, sin desborde horizontal, sin
errores de consola y sin marcadores sin resolver.

**El índice**, recorrido entero: los 14 abren su caso, el activo se marca, las flechas avanzan y se
deshabilitan en el primero y en el último, y las lupas del visor se vuelven a poner en cada cambio.

Las imágenes se comprueban **forzando la carga de todo lo diferido** (`loading='eager'` y scroll
al final): con `lazy` una foto rota no se detecta hasta que alguien baja hasta ella. Las 51 de
etapa se comprobaron recorriendo los 14 casos del índice, uno a uno.

**El visor**, probado a 1600 y 390 px: abre sin recortar (proporción idéntica a la del archivo),
bloquea el scroll del fondo, las flechas pasan de foto, Esc cierra y devuelve el scroll, el segundo
clic lleva de 567×755 a 1000×1333 y con la foto ampliada el clic fuera **no** cierra, para poder
arrastrarla. Recorre lo que hay en el DOM, así que con el índice y el escenario son 35 fotos y no
81.

Los cinco enlaces de contacto, comprobados uno a uno: `wa.me/525586184919`,
`mailto:adanarturomartinez@gmail.com`, el perfil personal de LinkedIn, la página de empresa y el
botón de AOG, que abre WhatsApp con el mensaje ya escrito.
