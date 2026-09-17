# aeroresinas.html — reparación estructural de aeronaves

La página pública del taller del papá de Adán. No es una herramienta suya: está hecha para
conseguirle clientes, así que no guarda estado, no depende del Dashboard y tiene que abrirse bien
en el teléfono de un desconocido al que le llegó el enlace por WhatsApp.

**El negocio está partido en dos** desde el 2026-09-17 (Adán: *"mejor separa lo de reparaciones y
los helicópteros de resina, cada uno haz un html, es mejor y dividiremos la empresa"*):

| | Qué vende | Dónde |
|---|---|---|
| **Aeroresinas** | Reparación estructural de aeronaves | esta página |
| **Heliescala** | Réplicas en resina de helicópteros | [`../Heliescala/`](../Heliescala/readme_heliescala.md) |

Cada archivo es **autónomo** —su CSS va dentro, sin hoja compartida— porque son dos clientes
distintos y algún día serán dos dominios. Se enlazan entre sí desde el menú, el pie y una sección
de puente a media página: son la misma casa y el argumento cruzado es bueno (quien repara las de
verdad es quien hace las réplicas).

## Estructura

Barra → hero → **qué repara** (5 servicios, cada uno con su foto) → **un trabajo de principio a
fin** → **cómo trabaja** (4 pasos) → **puente a Heliescala** → **quién lo hace** → contacto.

**El titular es el diferenciador, no un eslogan:** *"Tu aeronave no viaja al taller. El taller
viaja a tu aeronave."* Un operador no mueve un helicóptero si puede evitarlo, y eso es justo lo que
ofrece un técnico independiente que va al hangar.

**La sección que más pesa es "Un trabajo, de principio a fin"**: el mismo panel de composite en sus
tres etapas — abierto y saneado, laminado con fibra nueva, cerrado y listo para pintura — más un
par antes/después de una nariz. No hay foto de catálogo en toda la página: son reparaciones suyas,
fotografiadas mientras las hacía.

## Las fotos

Las 15 de `fotos/` salen de las 300 originales que pasó Adán (`C:\Users\esped\Desktop\Aeroresinas\`,
carpetas `reparacion` y `reparacion2`), elegidas viéndolas todas en hojas de contacto y optimizadas
para web: rotadas según EXIF, 1000–1500 px de ancho y JPEG progresivo al 79 % — **2.9 MB en total**
frente a los ~45 MB de los originales, que no se tocaron. `fotos/LEEME.txt` dice qué es cada una.

Cada foto lleva **pie de foto** explicando qué se está viendo: una reparación abierta no se entiende
sola, y el pie es lo que convierte la foto en argumento.

Falta una foto de **una antena montada** (el servicio de antenas usa hoy la del fuselaje desmontado)
y un **retrato** suyo mirando a cámara.

## Lo que hay que rellenar — `PERFIL`

Todo lo que falta vive en la constante `PERFIL`, al principio del `<script>`, y sale **marcado en
azul** en la página: se ve que falta y nadie lo confunde con un dato real. Son 15 marcas.

Pendiente al 2026-09-17: nombre, ciudad base, cobertura, años de oficio, licencia, dónde trabajó,
WhatsApp, correo y las tres credenciales — entre ellas **bajo qué figura firma** (taller autorizado
por la AFAC, licencia propia o mano de obra supervisada), que es lo primero que pregunta un
operador serio.

`whatsapp` va en formato internacional y **solo dígitos** (`5215512345678`), que es lo que pide
`wa.me`; `whatsappTxt` es cómo se escribe en pantalla.

## Sin backend, a propósito

El formulario no manda nada a ningún lado: arma el mensaje y abre **WhatsApp** con él ya escrito.
Es lo único que funciona igual desde `file://` y desde un dominio sin pagar un servidor, y deja la
conversación en el teléfono de su papá. Si no hay número cargado, lo dice en vez de fallar en
silencio.

Las etiquetas **Open Graph** del `<head>` no son adorno: es lo que se ve cuando el enlace se manda
por WhatsApp, que es como va a llegar a la mayoría de los clientes.

## Material

Blanco y transparente, como pidió Adán: vidrio (blanco al 72 % con `backdrop-filter`) sobre un
cielo claro con dos auroras y una retícula técnica al 4,5 %, para que se lea como un plano y no
como un folleto. Un solo acento, `#1b47ff`. **Heliescala usa la misma familia invertida** (fondo
oscuro, acento cian): se distinguen de un vistazo sin cambiar de tipografía ni de retícula.

Tipografía: **Space Grotesk** (títulos), **IBM Plex Sans** (cuerpo), **IBM Plex Mono** (datos). La
hoja de Google **no bloquea el pintado** (`media="print"` + `onload`), como en el resto del proyecto.

## Idioma: español por defecto, inglés a un toque

**La página abre SIEMPRE en español.** Hasta el 2026-09-17 seguía el idioma del navegador
(`navigator.language`), así que en un equipo configurado en inglés —el de Adán, por ejemplo— se
abría en inglés y parecía que no existía la versión en español. El cliente de aquí es mexicano: el
español es el punto de partida y no se negocia. Lo elegido se guarda en `localStorage`.

El selector es **un solo botón que dice a qué idioma cambias**, no en cuál estás: en español pone
*English*, en inglés pone *Español*. El par "ES | EN" obligaba a pensar cuál de los dos estaba
activo y en el teléfono era ilegible. Lleva un globo al lado y **nunca se oculta**, tampoco en
móvil (ahí se queda solo el globo).

Español e inglés viven en el mismo HTML, con un diccionario `T` y atributos `data-t`: dos archivos
se desincronizan al segundo cambio.

## En el teléfono

Tres cosas que faltaban y entraron el 2026-09-17:

- **El menú ya no desaparece.** Bajo 1080px estaba en `display:none` y no había forma de llegar a
  una sección sin recorrer la página entera; ahora pasa a una **tira que se desliza** bajo la marca.
- **Botón flotante de WhatsApp**, abajo a la derecha, solo en pantallas de teléfono. El contacto
  está al final de una página larga y desde el móvil ese camino es largo.
- La barra se reordena en dos filas (marca + botones arriba, menú debajo) en vez de recortarse.

## Dónde está enlazada

En la **barra de apps del Dashboard**, en un grupo propio al final junto a Heliescala — ver "La
barra de apps" en `../Dashboard/readme_dashboard.md`.

## El diseño

[`diseno-web/`](diseno-web/) tiene el lienzo del plan, **anterior a la separación**: ahí las
maquetas todavía eran una sección de esta misma página. Se conserva porque las direcciones
(ficha técnica, vitrina) y las notas del plan siguen valiendo; la estructura de hoy es la de
`Main`, partida en dos.

## La galería

`#galeria`, antes del contacto: las fotos que no encajaban en ninguna sección pero que valen — el
hangar donde se trabaja, una piel nueva ya imprimada y un borde de ataque abierto con la fibra a la
vista. Cada una con su pie. Se añade con una línea en `T.*.galeria`.

## Comprobado

Chromium `file://` a 1600 y 390 px, en español y en inglés: 18 imágenes, **ninguna rota**, 5
servicios, 3 fotos de galería, sin desborde horizontal, sin errores de consola y sin marcadores sin
resolver. Desde el Dashboard la píldora abre la página, y el menú cruza a Heliescala y vuelve.

**El idioma se probó con el navegador puesto en `en-US`**, que es el caso que fallaba: la página
abre en español, el botón dice *English*, cambia y vuelve. En 390px el menú es visible con sus 6
enlaces y el WhatsApp flotante aparece (en 1600 no).
