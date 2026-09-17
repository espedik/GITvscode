# aeroresinas.html — la página del taller del papá de Adán

App nueva del proyecto (2026-09-17). No es una herramienta de Adán: es **la página pública del
negocio de su papá**, hecha para conseguirle clientes. Eso cambia todo lo demás — no guarda estado,
no depende del Dashboard, y tiene que abrirse bien en el teléfono de un desconocido al que le
llegó el enlace por WhatsApp.

Adán, 2026-09-17: *"se llama aeroresinas, prácticamente él se dedica a reparar estructuras,
corrosiones, parabrisas rotos, reparación de antenas, fuselaje de helicópteros, actualmente él es
retirado y trabaja independientemente, entonces estoy buscando crear esta página para maximizar las
posibilidades de dar a conocer su trabajo […] adicionalmente mi papá hace helicópteros a escala y
los vende, tiene réplicas de casi cualquier modelo"*.

## Las cuatro decisiones que la definen

| Decisión | Qué se eligió | Por qué |
|---|---|---|
| Foco | **Reparación y maquetas con el mismo peso** | Lo pidió así. La página tiene dos mitades y un puente entre ellas |
| Idioma | **Español e inglés**, en la misma página | Operadores y talleres buscan en inglés, y las réplicas se venden fuera. Dos archivos se desincronizan al segundo cambio |
| Dónde vive | **Local + enlace para compartir** | Entra en la barra del Dashboard, y el mismo archivo sirve subido a un dominio sin tocar nada |
| Fotos | **Huecos marcados** hasta que lleguen | Cada hueco dice qué foto va ahí y con qué encuadre |

**El puente entre las dos mitades es el mejor argumento que hay aquí**, y es la razón de que las
maquetas NO vayan como apéndice: al que le reparas el helicóptero es exactamente el que quiere la
réplica de *su* aeronave, con su matrícula. Por eso la franja de maquetas va justo después de la
prueba de que sabe reparar, y la última tarjeta del catálogo es "Tu aeronave".

**El titular es el diferenciador, no un eslogan:** *"Tu aeronave no viaja al taller. El taller viaja
a tu aeronave."* Un operador no mueve un helicóptero a un taller si puede evitarlo, y eso es
exactamente lo que ofrece un técnico independiente que va al hangar.

## Estructura

Barra → hero (dos llamadas) → **qué repara** (5 servicios) → **cómo trabaja** (4 pasos) →
**maquetas** (franja oscura) → **quién lo hace** → **contacto** → pie.

Los cinco servicios son los que dijo Adán, cada uno con lo que implica de verdad: estructuras,
corrosión (*"no se limpia: se remueve hasta material sano"*), parabrisas y ventanas, antenas (*"el
problema no es la antena: es la piel de abajo"*) y fuselaje de helicóptero, marcado como la
especialidad.

## Lo que hay que rellenar — `PERFIL`

**Todo dato que falta vive en un solo sitio**: la constante `PERFIL`, al principio del `<script>`.
Lo que esté entre corchetes sale **marcado en azul** en la página (clase `.pend`), así que se ve
que falta y nadie lo confunde con un dato real. Al llenarlo aquí aparece en los ocho sitios donde
se cita.

Pendiente al 2026-09-17: nombre, ciudad base, cobertura, años, licencia, aeronaves atendidas, dónde
trabajó, WhatsApp, correo, escalas, tiempo de entrega, envío, precio desde y las tres credenciales.

`whatsapp` va en formato internacional y **solo dígitos** (`5215512345678`), que es lo que pide
`wa.me`; `whatsappTxt` es cómo se escribe en pantalla.

## Las fotos

Viven en `fotos/` con nombre fijo (`FOTOS` en el script): `trabajando.jpg`, `antes.jpg`,
`despues.jpg`, `retrato.jpg`, `maqueta-h125.jpg`, `maqueta-h145.jpg`, `maqueta-fam.jpg`,
`maqueta-encargo.jpg`, y `og.jpg` para la miniatura de WhatsApp.

**Mientras un archivo no exista, su hueco se queda con la instrucción de qué foto va ahí**; en
cuanto se copia a la carpeta, aparece sola sin tocar el HTML. Se comprueba cargando la imagen
(`new Image()` + `onload`), que es lo único que funciona desde `file://`: un `fetch` a un archivo
local lo bloquea el navegador.

La que más pesa es `trabajando.jpg` — él sobre el fuselaje, con herramienta a la vista — y el par
`antes/despues` **con el mismo encuadre**: eso es lo que convence a un dueño de aeronave.

## Sin backend, a propósito

El formulario no manda nada a ningún lado: arma el mensaje y abre **WhatsApp** con él ya escrito
(`wa.me/<número>?text=…`). Es lo único que funciona igual desde `file://` y desde un dominio sin
pagar un servidor, y además deja la conversación en el teléfono de su papá, que es donde la quiere.
Si no hay número cargado, el botón lo dice en vez de fallar en silencio.

Las etiquetas **Open Graph** del `<head>` no son adorno: así es como va a llegar la página a la
mayoría de los clientes. Sin ellas el mensaje de WhatsApp sale como una URL pelada.

## Material: blanco y transparente

Adán: *"quiero que se base en el color blanco y transparente"*, futurista. Vidrio (blanco al 72 %
con `backdrop-filter`) sobre un cielo claro con dos auroras —azul de instrumento y cian— y una
retícula técnica al 4,5 % de opacidad, para que se lea como un plano y no como un folleto. Un solo
acento, `#1b47ff`; el cian solo en la franja oscura de maquetas, que es el único bloque invertido
—y está invertido a propósito: separa los dos negocios sin un rótulo.

Tipografía: **Space Grotesk** para los títulos, **IBM Plex Sans** para el cuerpo, **IBM Plex Mono**
para los datos técnicos. La hoja de Google **no bloquea el pintado** (`media="print"` + `onload`),
como en el resto del proyecto.

## Dónde está enlazada

En la **barra de apps del Dashboard**, en un grupo propio al final, con el subtítulo *de tu papá* —
ver "La barra de apps" en `../Dashboard/readme_dashboard.md`. Con ella la fila pasó a 16 píldoras y
1,531px, así que el contenedor subió de 1440 a 1560px y el umbral de solo-iconos de 1500 a 1580.

## El diseño

En [`diseno-web/`](diseno-web/): `Main` (la elegida), `MainMovil`, `DireccionB` (ficha técnica, piel
de manual) y `DireccionC` (vitrina, las maquetas mandando). El lienzo lleva las notas del plan y la
lista de lo que falta.

## Comprobado

Chromium `file://` a 1600, 900 y 390px, en español y en inglés: 6 secciones, 5 servicios, 4 pasos,
4 maquetas, 8 huecos marcados, 19 datos pendientes señalados, sin desborde horizontal, sin errores
de consola y sin ningún `{marcador}` sin resolver. Desde el Dashboard, la píldora abre la página y
el título carga.
