# posts.html — plantillas de publicación para Aeroresinas y Heliescala

Herramienta de Adán, no página pública. Arma **el post de cada día** para LinkedIn (y una versión
corta para Facebook y WhatsApp), lo enseña como lo va a ver LinkedIn y lo deja listo para copiar.
Sirve a cuatro objetivos, y cada pilar de la semana declara a cuáles: **reparar helicópteros**,
**vender réplicas**, **más clientes** y **presencia en redes**.

Adán, 2026-09-21: *"un html para subir post de la página de aeroresinas y heliescala, deben ser
plantillas de post en linkedin… se separe en 2 tabs por cada empresa y en la empresa en específico
debe haber plantillas diarias de acuerdo a la información que tenemos"*.

## Los archivos

| | Qué tiene |
|---|---|
| `posts.html` | El molde: CSS, la tarjeta de LinkedIn, la semana, la ficha y las acciones. Ni un texto de post |
| `plantillas.js` | Las dos semanas (`SEMANA_AERO`, `SEMANA_HELI`), los objetivos (`OBJETIVOS`) y `EMPRESAS`. **Se arma con los `datos.js` de las dos webs**, no lleva cifras ni pies de foto propios |
| `readme_posts.md` | Este archivo |

Orden de carga: `../Dashboard/sin-zoom.js` → `../Aeroresinas/datos.js` (se guarda en `AERO`) →
`../Heliescala/datos.js` (se guarda en `HELI`) → `plantillas.js`.

## Un dato, un sitio: los posts salen de las webs

**No hay un solo hecho escrito aquí dos veces.** El WhatsApp, los 36 años en Airbus, el precio
desde $1,800, los pies de las 51 fotos de etapa, las 8 técnicas, las 26 piezas, las fichas de los
5 modelos: todo se lee de `Aeroresinas/datos.js` y `Heliescala/datos.js` en el momento de pintar.
Cambiar un pie de foto en su `datos.js` cambia la web, el PDF **y el post**.

Para eso los dos `datos.js` declaran `PERFIL` y `T` con **`var`, no `const`**: dos `const PERFIL`
en scripts distintos de la misma página chocan con *"already been declared"*. Con `var`, la
página guarda cada uno en su cajón (`AERO`, `HELI`) antes de cargar el siguiente. Para las webs y
los PDF es indistinto — comprobado: las dos abren igual, 11 y 7 secciones, sin marcadores.

Lo que sí es propio de `plantillas.js`: los **ganchos** (la primera línea de cada post), el
**orden** de los párrafos, las **llamadas a la acción** y los **hashtags**. Los textos de las webs
llegan con `<b>`, `<br>` y `{marcadores}`; `limpia()` y `sub()` los vuelven texto plano con los
valores de `PERFIL`, porque LinkedIn no pinta HTML ni markdown.

## La semana: siete pilares, uno por día

Cada empresa tiene siete pilares, de lunes a domingo, y **cada pilar es una serie**. El post de hoy
es `semana ISO del año % largo de la serie`: cada día tiene un post concreto, la serie avanza sola
y no se repite hasta agotarse. Con ← → (o las flechas de la cabecera) se recorre el resto de la
serie; ↑ ↓ cambian de día.

| Día | Aeroresinas | Serie | Heliescala | Serie |
|---|---|---|---|---|
| L | Caso real, paso a paso | los 14 `trabajos`, con sus etapas como carrusel | Pieza de la semana | las 26 `piezas` |
| M | La técnica, explicada | las 8 `tecnicas` | El helicóptero de verdad | los 5 `modelos`, con ficha y «cómo se reconoce» |
| X | Un apunte de oficio | los 7 `servicios`, abriendo con su apunte | La réplica de tu propia aeronave | 5: retiro, reconocimiento, recepción, cliente, flota |
| J | Lo que suelen preguntar | las 8 `faq` | Cómo se hace una | los 4 `pasos` + 2 de galería |
| V | Cómo trabajo · AOG | 8: AOG, seis pasos, voy a la aeronave, MRO, cobertura, presupuesto, reporte, manual | Encargo y entrega | 6: precio, entrega en persona, DHL, tiempo, aviones, catálogo |
| S | Del hangar | 12 de `galeria` + 6 de `flota` | La vitrina | las 9 de `galeria` |
| D | Trayectoria y red de contactos | 6: Airbus, 20 capacidades, quién soy, credenciales, pedir presentaciones, 2025—hoy | Red de contactos | 5: pilotos, quien se retira, exposición, presidencial, operadores |

**131 posts**: 69 de Aeroresinas y 62 de Heliescala. El más largo mide 1 485 caracteres (LinkedIn
admite 3 000) y ningún gancho pasa de 175 (LinkedIn corta a ~210 con el «…ver más»).

**Por qué este orden.** La semana va de demostrar a pedir: lunes a jueves enseñan (caso, técnica,
oficio, pregunta), el viernes pide el trabajo (AOG, encargo), el sábado es un post corto de
constancia y el domingo se pide a la red — etiquetas, presentaciones, talleres MRO. Cada pilar
lleva su **«por qué funciona»** en la ficha, para que Adán sepa qué está publicando y no solo qué.

**La voz es la de él, en primera persona**, como en la web de Aeroresinas: los posts salen de su
perfil, no de una empresa. Donde la web de Heliescala habla de él en tercera persona (*te la
entrega él*, *contesta él*), el post lo dice en primera.

## La tarjeta: como la pinta LinkedIn

Tipografía del sistema, avatar redondo (el `retrato.jpg` de Aeroresinas; el icono de la empresa
para Heliescala), nombre, titular, «Ahora · 🌐», el texto con el corte a **210 caracteres y el
«…ver más»**, las fotos en rejilla (1, 2 o 2×2 con «+N»), y el pie de Recomendar · Comentar ·
Compartir · Enviar. Los colores son los del modo oscuro o claro de LinkedIn según el tema de la
página, que **comparte `coach-theme` con el Dashboard**.

Bajo la tarjeta, las medidas: **gancho** (caracteres del primer párrafo, en ámbar pasados los 210
y en rojo pasados 273), **total** (rojo pasados 3 000) y hashtags. El gancho importa porque es lo
único que se lee sin tocar «ver más».

## Editar, copiar, publicar

- **Editar texto** convierte la tarjeta en un `textarea`; lo escrito se guarda por post en
  `posts-ediciones-v1` y sobrevive a la recarga. **Restaurar** vuelve a la plantilla. La versión
  corta y los enlaces de LinkedIn y WhatsApp se rehacen con el texto editado.
- **Copiar el post** usa el portapapeles (`navigator.clipboard`, con `execCommand` de respaldo).
- **LinkedIn** abre `linkedin.com/feed/?shareActive=true&text=…` con el post ya escrito.
- **Facebook** no admite texto por URL: copia la versión corta y abre Facebook.
- **WhatsApp** abre `wa.me/?text=…` con la versión corta, para mandarla a un contacto — la «red de
  contactos» que pidió Adán.
- **Marcar publicado** guarda la fecha en `posts-publicados-v1`; el día enseña ✓ en la semana y el
  pie cuenta los publicados de la empresa.

La **versión corta** es el gancho más el párrafo del contacto (el que lleva el WhatsApp), sin
hashtags: lo que cabe en un estado de Facebook o en un mensaje.

## La ficha

Objetivo(s) del pilar, por qué funciona, la(s) foto(s) sugerida(s) con su ruta y miniatura (más
una nota cuando son varias: *súbelas juntas, en orden*), los hashtags (clic para copiarlos), la
mejor hora (entre semana 8–10 h, fin de semana 9–11 h — criterio general de LinkedIn, no un dato
del proyecto), la versión corta y los enlaces a donde publicar (`PERFIL.linkedin` y
`PERFIL.linkedinEmp` de Aeroresinas).

Los **objetivos** también filtran: tocar uno atenúa los días que no le sirven. Un objetivo que la
empresa no usa (Vender en Aeroresinas, Reparar en Heliescala) sale atenuado de entrada.

## Dónde está enlazada

En el **carril derecho de la barra del Dashboard**, el altavoz junto al tema y la privacidad — ver
"La barra de apps" en `../Dashboard/readme_dashboard.md`. También con `?empresa=heli` en la URL
para abrir directo en Heliescala; la pestaña elegida se guarda en `posts-empresa`.

## Comprobado

Chromium `file://` a 1600, 1000 y 390 px: sin desborde horizontal, sin imágenes rotas, sin errores
de consola. Los 131 posts recorridos por script: ninguno con HTML sin limpiar, ninguno con
`{marcador}` sin sustituir, todos con foto y hashtags. Cambio de empresa, de día y de post;
«ver más»; editar, restaurar; marcar publicado (la ✓ aparece en la semana); copiar (el
portapapeles recibe el texto); filtro por objetivo (7 días atenuados con uno que la empresa no
usa); tema claro y oscuro con la tarjeta cambiando a los colores de LinkedIn.

A 1180 px la semana pasa a tira horizontal y bajo 800 px las acciones se fijan al pie como cinco
iconos.
