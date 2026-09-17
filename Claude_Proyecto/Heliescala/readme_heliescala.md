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
rescate con flotadores, dos Bell 407 de gobierno estatal y la flota de la **Policía** (Cóndores).
Más, en "tu aeronave", el Bell 412 de la policía con su número de unidad y el de la **Fuerza Aérea
Mexicana** con su matrícula.

Para añadir un modelo hacen falta dos cosas: la foto en `fotos/` y una línea en `T.es.piezas` (con
su traducción en `T.en.piezas`). El último elemento de cada línea son sus etiquetas; la primera se
pinta en cian.

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
