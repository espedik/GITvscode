# aeroresinas.html — reparación estructural de helicópteros

La página pública del taller del papá de Adán. No es una herramienta suya: está hecha para
conseguirle clientes, así que no guarda estado, no depende del Dashboard y tiene que abrirse bien
en el teléfono de un desconocido al que le llegó el enlace por WhatsApp.

Las réplicas en resina son **otro negocio**, con su propia página
([`../Heliescala/`](../Heliescala/readme_heliescala.md)), y **son independientes**: ninguna
menciona a la otra ni enlaza con ella (Adán, 2026-09-17: *"de ambas páginas no pongas lo de que se
relacionan"*). Lo único que las relaciona es esta documentación y la carpeta del repositorio; nada
de eso lo ve un cliente.

## El archivo está partido en dos

| | Qué tiene |
|---|---|
| `aeroresinas.html` | El molde y el CSS. Ni una frase de contenido |
| `datos.js` | **Todo** el texto, en español e inglés, más la constante `PERFIL` |

Se separaron cuando Adán pidió *"muchísima información"* y el contenido pasó de 400 a más de 1,500
líneas: buscar una frase dentro del HTML era buscar una aguja. Para cambiar cualquier texto solo se
toca `datos.js`, y las tres reglas de qué se puede escribir ahí están en su cabecera.

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
| 3 | **Trabajos** | 14 casos reales, con sus **51 fotos por etapas** en orden y lo que se hizo en cada una |
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

## Los 14 trabajos

Cada uno corresponde a fotos suyas, **en el orden real en que ocurrió el trabajo**. Son 51 fotos de
etapas, y siete de los catorce casos llegan hasta la pieza terminada.

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

**El 12 es el mejor caso de la página** y por eso tiene seis etapas: daño, piel desprendida con el
número de parte legible, preparación, laminado, **curado bajo bolsa de vacío con la manguera
conectada** y la pieza terminada. Es la única secuencia donde se ve el proceso completo, incluida
la técnica que la página explica en `#tecnicas`.

**El 11 cierra dos huecos a la vez.** Enseña una antena montada —que faltaba— y, sobre todo, el
**puenteo eléctrico**: las tiras en estrella alrededor de la base de la antena. Estaba en la lista
de 20 capacidades sin una sola foto, y es de las cosas que un operador entiende al verlas.

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

Los dos idiomas están completos: **2,857 palabras en español y 2,634 en inglés**, medidas.

## En el teléfono

- El menú **no desaparece**: pasa a una tira que se desliza bajo la marca.
- **Botón flotante de WhatsApp** abajo a la derecha.
- Los casos pasan de 4 columnas a 2 y luego a 1; las preguntas y las técnicas, a una columna.

## Material

Blanco y transparente: vidrio (blanco al 72 % con `backdrop-filter`) sobre un cielo claro con dos
auroras y una retícula técnica al 4,5 %, para que se lea como un plano y no como un folleto. Un
solo acento, `#1b47ff`; el ámbar aparece **una vez**, en el AOG, que es lo único urgente.

Tipografía: **Space Grotesk** (títulos), **IBM Plex Sans** (cuerpo), **IBM Plex Mono** (datos). La
hoja de Google **no bloquea el pintado** (`media="print"` + `onload`).

## Dónde está enlazada

En la **barra de apps del Dashboard**, en un grupo propio al final — ver "La barra de apps" en
`../Dashboard/readme_dashboard.md`.

## Comprobado

Chromium `file://` a 1600 y 390 px, en español y en inglés, **con el navegador puesto en `en-US`**
(el caso que fallaba): abre en español, **11 secciones**, 7 servicios, **14 trabajos con 51 etapas**,
6 aeronaves, 6 pasos, 8 técnicas, 20 capacidades, 6 credenciales, **12 fotos de galería**, 8
preguntas, **80 imágenes y ninguna rota**, **cero huecos**, sin desborde horizontal, sin errores de
consola y sin marcadores sin resolver. Medido: **4,192 palabras en español y 3,901 en inglés**.

Las 80 imágenes se comprobaron **forzando la carga de todo lo diferido** (`loading='eager'` y
scroll al final): con `lazy` una foto rota no se detecta hasta que alguien baja hasta ella.

Los cinco enlaces de contacto, comprobados uno a uno: `wa.me/525586184919`,
`mailto:adanarturomartinez@gmail.com`, el perfil personal de LinkedIn, la página de empresa y el
botón de AOG, que abre WhatsApp con el mensaje ya escrito.
