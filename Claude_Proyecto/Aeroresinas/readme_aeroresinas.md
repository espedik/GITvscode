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

**Y son independientes de verdad**: ninguna página menciona a la otra ni enlaza con ella. Adán,
2026-09-17: *"de ambas páginas no pongas lo de que se relacionan"*. Se quitaron la sección puente,
los enlaces del menú y del pie, y las frases que apoyaban una en la otra. Cada archivo es
**autónomo** —su CSS va dentro, sin hoja compartida— y se puede subir a su propio dominio sin
arrastrar nada.

Lo único que las relaciona es esta documentación y la carpeta del repositorio; nada de eso lo ve
un cliente.

## Quién es, y por qué eso lo cambia todo

**José Arturo Martínez Ponce**, técnico de mantenimiento de aeronaves. Los datos salen de su perfil
de LinkedIn (17-sep-2026), no de suposiciones:

| | |
|---|---|
| **1988 — 2024** | **Airbus**, técnico de mantenimiento. 36 años de planta trabajando estructura en A320, A321, ATR 42 y ATR 72 |
| **2025 — hoy** | **Aeroresinas**, por su cuenta: reparación estructural de helicópteros |
| Aeronaves | Bell, Airbus Helicopters y Robinson |
| Clientes | Operadores civiles, privados y gubernamentales |
| Dónde | México, Panamá y Guatemala — hangar y campo |
| Base | Miguel Hidalgo, Ciudad de México |
| Especialidad | Composites (fibra de vidrio), técnicas al vacío, parabrisas y acrílicos, estructuras remachadas |

**36 años en Airbus es el argumento de la página entera.** Un dueño de aeronave no contrata a un
desconocido para abrir su fuselaje; contrata a alguien con un historial que puede comprobar. Por eso
la trayectoria tiene **sección propia** —no una línea perdida en "quién lo hace"— y por eso la
página enlaza a su LinkedIn: es la prueba verificable de todo lo anterior.

La lista de **20 trabajos** de su historial en Airbus (radomos, piel de fuselaje, panel sándwich de
nido de abeja, reparación al vacío, restitución del puenteo eléctrico…) está ahí por la misma razón,
y el pie lo dice explícito: *la técnica es la misma, cambia la aeronave*.

También entró lo que él mismo anuncia y vende bien: **soporte AOG** (aeronave en tierra), movilidad
internacional y disposición a **colaborar con talleres MRO**. Y que repara conforme a **SRM, AMM y
Boletines de Servicio**: es lo que separa una reparación aeronáutica de un arreglo.

## Estructura

Barra → hero → **qué repara** (5 servicios, cada uno con su foto) → **un trabajo de principio a
fin** → **cómo trabaja** (4 pasos) → **trayectoria** → **galería** → **quién lo hace** → contacto.

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
y un **retrato** suyo mirando a cámara — el de su perfil de LinkedIn serviría, y le daría cara a la
sección "Quién lo hace", que hoy usa una foto de él trabajando de espaldas.

## Lo que hay que rellenar — `PERFIL`

Todo vive en la constante `PERFIL`, al principio del `<script>`. Lo que falta sale **marcado en
azul** en la página: se ve que falta y nadie lo confunde con un dato real.

Con el perfil de LinkedIn se llenaron nombre, ciudad, años, dónde trabajó, cobertura, países,
aeronaves y credenciales: **de 15 huecos quedan 3**.

| Falta | Por qué importa |
|---|---|
| **WhatsApp** | Sin él la página no puede convertir una visita en un mensaje: el formulario avisa en vez de fallar, pero no hay a dónde escribir |
| **Correo** | Para el operador que no usa WhatsApp y para las cotizaciones formales |
| **Licencia o figura con la que firma** | AFAC/DGAC, A&P o el taller que ampara el trabajo. Es lo primero que pregunta un operador serio, y hoy es el único hueco de credibilidad que queda |

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
como un folleto. Un solo acento, `#1b47ff`.

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

Chromium `file://` a 1600 y 390 px, en español y en inglés: 15 imágenes, **ninguna rota**, 5
servicios, 2 etapas de trayectoria, 20 capacidades, 3 fotos de galería, **3 huecos** (los de la
tabla de arriba), sin desborde horizontal y sin errores de consola. Desde el Dashboard la píldora abre la página. **Cero referencias a Heliescala** en el
cuerpo del documento (la única mención es la ruta en el comentario del `<style>`, que explica por
qué el CSS está duplicado).

**El idioma se probó con el navegador puesto en `en-US`**, que es el caso que fallaba: la página
abre en español, el botón dice *English*, cambia y vuelve. En 390px el menú es visible con sus 6
enlaces y el WhatsApp flotante aparece (en 1600 no).
