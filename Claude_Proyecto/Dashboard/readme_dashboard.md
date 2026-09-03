# dashboard.html — referencia

Panel central del proyecto: agrega en vivo los datos de las demás apps y presenta el día, el plan
y el estudio en 8 pantallas a pantalla completa.

> **Esto es referencia, no diario.** Describe cómo funciona **hoy**. El historial de cada cambio
> vive en `git log -p -- Claude_Proyecto/Dashboard/dashboard.html`, que es donde toca buscarlo.
> Ver `../../CLAUDE.md` → Regla 3.

**Antes de tocar datos, leer [`DATOS-MAESTROS.md`](DATOS-MAESTROS.md)** — el índice del proyecto
en una página.

---

## Archivos de esta carpeta

| Archivo | Qué es |
|---|---|
| `dashboard.html` | La app entera: HTML, CSS y JS en un archivo (~854 KB) |
| `datos-maestros.js` | **Fuente única** de las variables del proyecto. Lo cargan también Coach y Finanzas |
| `DATOS-MAESTROS.md` | Índice del proyecto: catálogo de variables, mapa de apps, cómo se corrige un saldo |
| `verificar-sincronia.js` | Comprueba que nada se haya vuelto a duplicar. Lo corre un hook al final de cada turno |
| — | El vocabulario de alemán ya no vive aquí: los datos, el diseño y el motor están en `Aleman/` (`vocab-datos.js`, `vocab.css`, `vocab.js`) y esta pantalla los carga — ver abajo |
| `aleman-data.js` | Las 40 lecciones de alemán extraídas de `Aleman/`. **En reposo** desde el 2026-09-02: ninguna pantalla lo carga (ver abajo) |
| `entrevistas-data.js` | Temas extraídos de `Entrevistas/` para su slide |
| `readme_dashboard.md` | Este archivo |

Se abre con `file://`, sin servidor ni build. Los `<script src="…">` cargan con normalidad — es
lo que permite compartir `datos-maestros.js` entre apps de carpetas distintas.

---

## De dónde salen los datos

No hay backend. El Dashboard lee el `localStorage` que escriben las demás apps:

| Clave | La escribe | Qué saca el Dashboard |
|---|---|---|
| `finanzasmx_v2` | `Finanzas.html` | Deudas, inversiones, patrimonio, fondo de emergencia |
| `coach_rutina_v1` | `Coach.html` | Progreso de la rutina del día |
| `coach_checks_v1` | `Coach.html` | Checklist de la fase del Plan Maestro |
| `mirutina_v1` | `ejercicio.html` | Qué toca hoy en el gimnasio |
| `misalud_v1` | `salud.html` / `comida.html` | Peso, medidas, alimentos |
| `skincare_v1`, `comida_v1` | sus apps | Rutinas y recetas |

Todas comparten origen porque se abren con `file://`. `loadAll()` las lee al arrancar y las deja
en el objeto `D`.

**Escribe en claves ajenas en dos sitios** — es la excepción a que sea de solo lectura:
`coach_rutina_v1.completado[hoy]` (botón "Marcar hecho" de Mi Día) y `coach_checks_v1[id]`
(checklist de fase). Usa `rawGet`/`rawSet`, que preservan el resto del objeto intacto. Si cambian
la forma de `completado` o los ids `sN-M` en Coach, hay que revisar estas dos funciones.

---

## Las 8 pantallas

Cada una es un `<section class="slide theme-…">`. Rotan solas cada 3 minutos; se navega con las
flechas, los puntos del HUD lateral, o deslizando en táctil.

| Tema | Pantalla | Qué muestra |
|---|---|---|
| `theme-dia` | **Mi Día** | La principal. Tira de 7 días, cinta del día completo, bloque actual, KPIs |
| `theme-coach` | **Plan Maestro** | Fase activa, ruta de deuda cara y el tablero calendario / día / semana — ver abajo |
| `theme-metas` | **Mis Metas** | 8 KPIs financieros, franja de instrumentos y las 14 metas con estado — ver abajo |
| `theme-basicas` | **Habilidades Base** | 23 guías de vida práctica. **Única fuente** desde el 30-ago-2026: la sección equivalente de Coach se eliminó — ver abajo |
| `theme-skills` | **Habilidades** | Radar de 12 habilidades y prioridades de aprendizaje |
| `theme-lista` | **Lista de Compras** | 7 categorías. Comida con precios por pieza, ticket, costo al mes y proporción de verduras/frutas/almidones — ver abajo |
| `theme-aleman` | **Alemán** | Vocabulario por secciones y el tema de Partizip I y II, desde `Aleman/vocab-datos.js` — ver abajo |
| `theme-entrevista` | **Entrevista del día** | Un tema técnico al día, desde `entrevistas-data.js` |

Entrevistas **no usa `<iframe>`**: su contenido se extrajo a `entrevistas-data.js` y se pinta
nativo dentro del slide, con botón "Siguiente →" para no esperar al día siguiente. Alemán
hacía lo mismo hasta el 2026-09-02; ahora es una pantalla de consulta y no avanza sola.

### La pantalla de Alemán: vocabulario y Partizip

Petición del 2026-09-02: *"de momento quiero que me quites las lecciones en dashboard y solo me
pongas uno de vocabulario super extenso y acomodalo por secciones y quiero el tema de partizip 1 y
2, lo demas quitalo"*. Lo que hay ahora:

- **1.516 palabras en 37 secciones y 188 subsecciones**, con artículo, traducción, ejemplo
  traducido y la morfología que le toque a cada tipo de palabra. El artículo se
  ve antes de leerlo: la barra de la izquierda de cada tarjeta es azul en *der*, rosa en *die* y
  verde en *das*.
- **Un buscador** que mira en alemán, en español y en los ejemplos, y que manda sobre la sección
  abierta — si escribe algo espera verlo aunque esté en otra parte.
- **Un filtro de nivel** (A1 / A2 / B1) en la cabecera. Con 1.516 palabras, poder quedarse
  solo en A1 es lo que hace la lista abarcable; hasta el 2026-09-03 eso solo estaba en la
  app de Alemán.
- **Partizip I y II** en 9 bloques, con tablas, comparativas y avisos. Por encima de 1200px sale
  a la derecha un índice que sigue la lectura (`alIdxSigue()`); ahí antes solo había hueco.
- Dónde se quedó se guarda en `localStorage`: la sección (`al_sec_v1`), su subsección
  (`al_sub_v1`), la familia que tenía abierta en el índice (`al_fam_v1`) y el nivel
  filtrado (`al_niv_v1`).

**Nada de esto vive aquí.** Los datos, el diseño y el motor están en `Aleman/`
(`vocab-datos.js`, `vocab.css`, `vocab.js`) y esta pantalla los carga con un `../`. La
pantalla principal del vocabulario es `Aleman/vocabulario.html`: ahí se trabaja y esta lo
refleja. Adán (2026-09-03): *"quiero un solo diseño, no lo quiero duplicado, entonces el
principal es el html de aleman"*.

**El índice es lateral, el mismo árbol que la app.** Hasta el 2026-09-03 aquí había dos
tiras de chips, y con 37 secciones ocupaban 190px de alto en cuatro filas más 48 de
subsecciones: a 1.600px dejaban ver 10 palabras de las 13 de una subsección, y a 1.460px
cuatro. El árbol se lleva 238px de ANCHO — que es lo que sobra en una pantalla apaisada, no
lo que falta — y deja 663px para las palabras: doce de trece. Medido antes y después con la
misma subsección.

Dentro, **dos zonas que no se parecen**: la gramática arriba en su caja morada, separada
por una línea, y el vocabulario debajo repartido en **siete familias** que se abren
(familia › sección › subsección). Partizip I y II era un chip más de la tira, entre
«Colores» y «Escuela»; no es una sección de palabras y ya no se pinta como tal. Elección de
Adán entre tres maquetas: *"me gusta la opcion c"*.

La tarjeta — que es el 90% del diseño — no ha cambiado.

Lo único propio de esta pantalla son los **tokens** `--v-*`, en `.al-fondo`: tiene modo
oscuro y el fondo es translúcido sobre las manchas animadas del slide, así que los colores
no pueden ser los de la app de Alemán. La estructura sí es la misma. El slide lleva las dos
clases, `v-vocab al-fondo`: la primera trae los valores por defecto del motor y la segunda
los cambia — sin la primera, cada token nuevo del motor saldría sin valor aquí.

Los controles 19 y 20 de `verificar-sincronia.js` vigilan que ni los datos ni el diseño
vuelvan a duplicarse, y el 21 que las siete familias sigan cubriendo las 37 secciones.

**`--v-txt-inv` existe por un fallo que solo se veía aquí.** Los botones que se rellenan con
`--v-txt` (el filtro de nivel activo, la subsección elegida) pintaban las letras con
`--v-card`. En la app de Alemán eso es `#ffffff` sólido y funciona; aquí `--v-card` es
blanco al 6%, así que en tema oscuro quedaba texto blanco-al-6% sobre relleno casi blanco:
**1.01:1**. Ahora usan `--v-txt-inv`, que es «lo que se lee encima de `--v-txt`» y aquí vale
`var(--bg)`.

**En móvil el índice se apila encima, no se encoge.** A 390px no hay 238px de ancho que
ceder, así que por debajo de 900px la rejilla pasa a una columna y el árbol se queda arriba
con su propio scroll y un tope de `26vh` — a `32vh` dejaba dos tarjetas a la vista.

**Los dos colores de énfasis son tokens** (`--al-oro`, `--al-mal`) y no el amarillo y el rojo de
la bandera: `#ffce00` sobre el tema claro da 1.49:1 y los ejemplos en alemán eran invisibles de
día.

**Las 40 lecciones siguen enteras en `Aleman/`**, a un clic desde el botón de la cabecera.
`aleman-data.js` (327 KB, extraído con Playwright por `Aleman/_generar-datos-dashboard.js`) y el
filtro por `kapitelAleman` que mostraba solo el Kapitel en curso se quedan en el repo pero sin
cargarse: Adán dijo *"de momento"*, y volver a ponerlas es cargar el archivo otra vez.
---

### La Lista de Compras

Siete categorías (`LISTA_CAT_META`), una activa a la vez. **Comida** es la única con precios,
contador y proporciones; el resto son checklists con dos precios de plataforma.

**El contador cuenta piezas, no compras típicas.** Cada producto de `LISTA_COMPRAS_PRECIOS`
declara un `paso` —lo que suma un `+`— con su `monto` y sus `g`: un jitomate son 127 g y $2, no
"380 g = 3 piezas = $6". `base` dice cuántos `paso` son una semana de consumo, y es lo que mete el
checkbox de un clic: marcar Plátano pone 6, no 1. De ahí salen las dos cifras del HUD:

| Cifra | Cómo se calcula |
|---|---|
| **Ticket de hoy** | `Σ monto × cantidad` — lo que pagas en caja |
| **Costo al mes** | `Σ importe × 4.33 / dura`, con `dura = max(1, cantidad / base)` |

`dura` se deriva de lo que llevas, no es un número fijo del producto: 6 plátanos duran una semana
y 12 duran dos, así que los dos carritos cuestan lo mismo al mes. Un aceite de $150 que dura ocho
semanas no son $150/mes, son ~$81.

**Las proporciones.** Los 13 productos frescos viven en tres pasillos —`Verduras`, `Frutas`,
`Almidones y grasas`— y se clasifican en cuatro clases con `lcClase()`: la clase sale del pasillo,
y `LC_ITEM_CLASE` es la excepción para el aguacate, que comparte pasillo con la papa pero cuenta
como grasa. La barra compara el peso del canasto contra `LC_CLASE_META` (**55 / 30 / 10 / 5**, la
regla de "más verdura que fruta" repartida sobre el peso en fresco). Los gramos son **por semana**:
`g × cantidad / dura`, el mismo prorrateo que el costo mensual. Cuando una clase queda corta, la
frase de abajo dice cuántos gramos faltan y ofrece los productos que cierran el hueco — un clic
mete la semana de ese producto.

Esa meta es un criterio de diseño del slide, **no sale de `salud.html`**; el bloque lo dice en
pantalla junto a la cifra.

**El renglón cabe en una línea** — checkbox · nombre · píldora · precio unitario · contador ·
tiendas · subtotal — y por eso `.lc-grid` pide columnas de 430 px. La píldora lleva punto lleno si
el precio salió del ticket de Walmart y hueco si es estimado: forma además de color, para que se
distinga en escala de grises. Los links de tienda están en **todas** las categorías; en Comida el
par es Walmart Súper + Amazon, en el resto Amazon + Mercado Libre.

En celular (`≤760px`) el renglón pasa a dos líneas de 46 px de alto —nombre y subtotal arriba, el
resto abajo—, las pestañas se deslizan en un solo renglón y las cuatro cifras de proporción se
quedan solo con su nombre y su porcentaje: los gramos y el desfase ya los dice la frase de abajo.
Medido a 390 px: 30 renglones de alto idéntico, 0 elementos desbordados, primer pasillo visible a
544 px.

**Dónde se guarda.** `dash-lista-compras` (producto → número de `paso`) y `dash-lista-tengo`
("ya lo tengo", solo fuera de Comida). Los `true` de listas guardadas antes del contador se leen
como 1.


## Citas en CDMX

Adán, 2026-09-01: *"un hombre siempre debe saber a donde ir a cenar, comer, citas interesantes"*.

Es una **habilidad más** de Habilidades Base y la única atada a una ciudad, a propósito: un
consejo genérico sobre citas no sirve de nada a las ocho de la noche en la Roma. Diez pasos, de
los cuales siete son listas de lugares:

| Paso | Lugares |
|---|---|
| Primera cita — café y salida fácil | 4 |
| Comer bien de día | 4 |
| Cenar sin quedar mal | 4 |
| Terrazas — cuando la vista es el plan | 6 |
| Cuando la ocasión lo pide | 2 |
| Copas — la segunda parte | 4 |
| Citas que no son comer | 6 |

Los otros tres no llevan lugares y son los que hacen que la lista sirva: **cómo elegir** según qué
cita es, **la logística** (reservar, confirmar el mismo día, llegar antes, tener un plan B a cinco
minutos) y el `✅ Ya lo dominas cuando…` de siempre.

**Cada lugar enlaza a una BÚSQUEDA de Google Maps por nombre**, no a unas coordenadas ni a un
`place_id`: así no hay que inventarse un identificador que no se puede verificar, y el enlace
sigue llevando al sitio correcto si el local se muda. Toda la fila es el enlace, con el pin a la
derecha para que se vea que lleva a algún lado.

**Lo que no se escribió a propósito**: precios y horarios. Cambian solos y un dato viejo es peor
que ninguno. Sí está lo de *"hay que reservar con semanas"* en Pujol, Quintonil, Rosetta, Máximo,
Contramar y la Casa Barragán, porque es justo lo que arruina la noche cuando no lo sabes.

Las terrazas tienen paso propio: Terraza Cha Cha Chá estaba listada en "Cenar", que es lo que es
pero no para lo que se va. Su aviso —**pedir mesa en la baranda** al reservar, y que de junio a
septiembre llueve y te mandan adentro— vale para las seis.

Comprobado en dark y light a 1600 y 390px: los 30 lugares aparecen en sus siete pasos, ninguno con
el enlace roto ni repetido en dos pasos, todos con `target="_blank"` y `rel="noopener"`.

## Mis Metas — "panel de trayectoria"

Rediseño del 2026-08-30 (*"la sección de corto, mediano y largo plazo, dame un diseño futurista y
moderno y con indicativos claros"*). Clases `.mg-*`; de la familia anterior `.img-goal-*` solo
sobreviven `.img-goal-pbar` y `-fill`, que las usa el overlay de detalle.

**El porcentaje dejó de ser el indicador.** Cada ficha enseña **una marca por paso real** del
checklist de esa meta —15 en el Hyrox, 8 en el BYD— y debajo el conteo (`4 / 9 PASOS`). Un 33% no
dice si faltan dos pasos o diez, y el dato ya vivía en `META_DETALLE` sin usarse. Es el mismo
hallazgo que justificó el rediseño de Habilidades Base una semana antes.

**Apareció el estado**, que era lo que de verdad no se veía. Tres, cada uno con su color en una
sola variable por ficha (`--mgc`), que tiñe chip, marcas, conteo y borde:

| Estado | Clase | Color | Cuándo |
|---|---|---|---|
| LOGRADA | `.mg-card.ok` | `--g` verde | todos los pasos marcados |
| EN MARCHA | `.mg-card.on` | `--ac1` ámbar | al menos uno |
| SIN EMPEZAR | *(ninguna)* | `--text3` | ninguno |

Antes, las dos metas ya logradas (los 11K y el alemán) se dibujaban **igual** que las que no ha
empezado.

**La franja de instrumentos** (`#metasBay`, contenedor nuevo en el HTML del slide) trae el avance
del conjunto en **pasos**, no promediando porcentajes: promediar le daba el mismo peso a "Básico 5
de alemán" (1 paso) que al Hyrox (15), así que marcar la meta más chica movía la aguja tanto como
quince sesiones de entrenamiento. Más el ecualizador de las 14 metas —con piso del 20% para que
una meta sin empezar siga siendo una barra visible y no un hueco— y los tres conteos.

**La regla de edad vive dentro de la franja**, separada por un filete. Como caja aparte costaba
38 px de margen y borde propios, y ese espacio era justo el que faltaba abajo para que las metas
logradas no quedaran cortadas por el scroll.

**Tres columnas en corto/mediano, dos en largo plazo.** Con dos, las 8 metas pedían 4 filas y la
última —las dos ya logradas— caía fuera. A tres caben en tres filas y la ficha sigue siendo más
ancha que las de largo plazo, que es lo que se pidió el 2026-08-11. Medido: 0 px de desborde a
1600×950 y a 1920×1080; a 1366×768 la rejilla hace scroll interno, que es el respaldo de siempre.

**El dinero real** de BYD y Maestría es una barra continua en `--ac2`, distinta de las marcas de
paso a propósito —son dos avances distintos de la misma meta— y enseña **la cifra**
(`$22,800 pagado`), no solo el porcentaje. `METAS_MONEYBAR[x].short` es ese texto; `.lbl` sigue
siendo el largo, en el `title`.


## Mi Día, en detalle

La pantalla que más se usa, y la que más piezas tiene.

### La cinta del día

El día entero en una barra horizontal, en vez de una lista de 26 tarjetas con scroll. Son **dos
piezas con trabajos distintos**, porque una sola no podía con ambos:

- **El riel** (`.cinta`, 11px de alto) es el **mapa**: proporción real del día y la línea verde de
  "ahora". Sin texto — a 45 minutos un tramo mide 40px y nunca cupo un nombre.
- **Las fichas** (`.cinta-fic`) son **lo que se toca**: hora, nombre y duración, **78px de alto**
  (muy por encima del mínimo de 44px para el pulgar). Se deslizan con las flechas ‹ › y la del
  bloque en curso se centra sola — ver abajo.

  Los 78px salen de querer **tres líneas de título**. Con los 60px que tenía — 16 de padding + 13
  de la fila de hora + 3 de margen + 2×13.75 de texto = 59.5 — solo cabían dos, y se truncaban
  **8 de los 13 bloques del día**: "Despertar (sin alarma agresiva)" se leía *"Despertar (sin
  alarma…"*. Con tres bajan a 5, y los que siguen cortados son los de título muy largo, que no
  cabrían ni con cuatro en una ficha de 104-148px de ancho. La tercera línea pide 73.25px; los
  78 dejan aire para los emojis, que levantan un pelo la caja de línea. `.cinta-nav` va a la
  misma altura para que la fila quede a ras.

**El ancho de cada ficha depende de la duración** (`anchoFicha`), con escala de **raíz cuadrada**:
en el mismo carril conviven bloques de 10 min y de 5 h, y en proporción directa el largo mediría
30× el corto — se comería la fila y los cortos caerían por debajo del mínimo tocable. Suelo 104px
(lo que necesita la fila superior para que hora y duración no se pisen), techo 300px.

| Duración | 10–30 min | 45 min | 1 h | 2 h | 4 h | 5 h |
|---|---|---|---|---|---|---|
| Ancho | 104px | 127px | 147px | 208px | 294px | 300px |

En móvil (`max-width:700px`) no se fija `width` — eso aplastaría la proporción —, solo sube el
suelo a `min-width:132px`.

**El verde significa una sola cosa en toda la pantalla: esto está ocurriendo ahora.** Tres estados
excluyentes en este orden: `.ahora` (verde) gana sobre `.sel` (color de su categoría, lo que estás
mirando) gana sobre `.hecho` (apagado). Antes la ficha activa usaba el color de su categoría y al
tocar otra se perdía de vista cuál estaba pasando.

Contraste invertido respecto a la versión vieja: **hecho = encendido, pendiente = apagado**.

**La ficha en curso queda centrada, y vuelve al centro cada vez que entras a la pantalla.**
`centrarFichaActiva()` centra `.sel` si tocaste alguna ficha y `.ahora` —la verde— si no, que es
el caso normal. Salir de Mi Día limpia `cintaSel` igual que `diaSemanaSel`, así que al volver
siempre encuentras centrado el bloque de ahora, no el que dejaste tocado.

El centrado corre dos veces: al pintar la cinta y otra vez en el `requestAnimationFrame` de
`showSlide(0)`. Hace falta el segundo pase porque `RENDERS[i]()` corre con el slide todavía
inactivo y el carril puede medir 0 de ancho.

**En táctil, la tira se queda su propio gesto.** El swipe de cambio de pantalla vive en `#slides`
y se dispara con cualquier arrastre horizontal de más de 50px, viniera de donde viniera: al
deslizar las fichas en un iPad, el gesto burbujeaba y cambiaba de pantalla. Medido en iPad
(820×1180) el carril enseña **616px de 3,126px de fichas**, así que sin deslizar no hay forma de
llegar a la mayoría de los bloques del día.

El `touchstart` de `#slides` ahora consulta el DOM en el momento del toque y se retira si el dedo
empezó dentro de algo con scroll horizontal **real** (`overflow-x` auto/scroll y
`scrollWidth > clientWidth`). Se resuelve mirando el árbol y no con una lista de clases: hoy hay
siete tiras así — la cinta, las pestañas de meses y de la lista de compras, el vocabulario de
alemán, el índice de los `.md`, las tablas y los bloques de código — y la que se añada mañana
queda cubierta sin tocar nada.

La tira lleva además `overscroll-behavior-x: contain`, que corta el encadenamiento: al llegar al
final, el gesto no pasa al contenedor de atrás ni dispara el swipe-atrás de Safari. **No** lleva
`touch-action`, a propósito — fijarlo a `pan-x` impediría bajar la página con el dedo sobre la
cinta.

Comprobado con gestos táctiles reales (`Input.dispatchTouchEvent`) en iPad y iPhone, contra la
versión anterior: antes el mismo swipe cambiaba de pantalla, ahora las fichas avanzan 245px y la
pantalla se queda. Deslizar **fuera** de la tira sigue cambiando de pantalla.

Mueve `scrollLeft` a mano y **no** usa `scrollIntoView()`: esa función arrastraría también el
scroll del carrusel y saltaría la pantalla entera en cada repintado. La cuenta va con
`getBoundingClientRect()` y no con `offsetLeft` porque `.cinta-fic-scroll` no está posicionado —
el `offsetParent` de una ficha acaba siendo el `<section>` del slide, y ese offset traía encima
el padding del slide y de la tarjeta.

### La rutina

`RUTINA_TASKS` **no se declara aquí**: se pide con `CIFRAS.rutina('../Coach/Coach.html')` a
`datos-maestros.js`. El argumento es el prefijo de los `href`, que en el maestro se guardan como
anclas internas de Coach. Ver Regla 1 de `CLAUDE.md`.

Los bloques con `fijo:true` (ALTEN) salen en la línea de tiempo y cuentan para "ahora/siguiente",
pero no llevan checkbox ni suman al progreso.

### El rail de control

Adán, 2026-08-31: *"estas partes también las quiero cambio de diseño futurista y entendible"*.
Diseñado en canvas en tres direcciones; eligió la de un solo rail.

Eran **dos columnas de círculos con emoji**, una a cada lado. Los mismos fallos de la barra de
apps, repetidos: a 13px la bandera de Alemán salía como `DE` y la hélice del ADN como una
mancha, y encima el slide activo se marcaba con un degradado verde-morado **encima del propio
icono**, así que el que estabas viendo era el único que no se distinguía.

Ahora hay **un rail, a la izquierda**, con cuatro bloques separados por filete: el reloj y el sync,
las ocho pantallas con icono de trazo y **su nombre al lado**, los controles de reproducción con
su barra de avance, y la fila de sistema (menú, pantalla completa, ajustes, ayuda, tema). El
activo se marca con fondo y color, sin taparse.

**Vive plegado.** Adán, 2026-09-01: *"escóndelo y ya cuando haga click a esa sección, que
aparezca todo"*. En reposo es una tira de **56px** con el tirador, las **ocho pantallas sin
nombre** y el play: se sigue viendo en cuál estás y se salta a cualquier otra sin abrir nada
—*"cuando esté así, muéstrame todos los iconos"*—. Al tocar el tirador se abre a 198px con los
nombres, el reloj y los ajustes; al elegir pantalla se pliega solo, que es justo para lo que se
abre. El estado se recuerda en `dash-rail-abierto`.

Los ocho iconos de 38px caben incluso a 720px de alto, que es la ventana más baja medida.

**El hueco sigue al rail.** El padding del lado del rail es una variable (`--pad-rail`) que cambia
con la clase `rail-on` del `body`: 88px plegado, 230px abierto. Así el contenido pasa de 1306 a
**1400px** —su máximo— en cuanto el rail se cierra. El otro lado se queda en 42px, que es lo que
pide el aire, no un obstáculo que esquivar.

Comprobado slide por slide en los ocho, plegado y abierto, a 1600, 1366 y 1280×720: ninguno queda
por debajo del rail. Ojo al medirlo — `getBoundingClientRect()` incluye el `scale` de la animación
de entrada y da falsos solapes de ~20px; hay que mirar el borde de layout o esperar a que termine.

En pantallas estrechas no hay tirador: ahí el rail ya es la barra inferior y no hay nada que
plegar.

**En pantallas estrechas** el rail baja al centro-abajo como barra horizontal y la lista de
pantallas se va con él —esa navegación ya vive en el menú ☰ y en la barra de Apps—, dejando los
cinco controles que se tocan de verdad a 40px cada uno.

### La barra de apps

Adán, 2026-08-31: *"dame un mejor diseño futurista de la parte de arriba de las apps"*.

**Los emojis no servían de iconos.** La bandera de Alemán se pintaba como las letras `DE` en
Windows —Chrome no trae emoji de banderas ahí—, y a 16px el diente y el frasco de skincare no se
distinguían de una mancha. Ahora cada app lleva un **SVG de trazo** de 24×24, mismo grosor y mismas
terminaciones, así que la fila se lee pareja y el hover los enciende con un halo del propio color.

**Los colores están medidos contra los dos fondos.** El primer intento dejó el diente en `#f0f4ff`
—invisible en tema claro, el mismo fallo que tenía el emoji— y otros tres por debajo de 1.9:1.
Bajados a tonos medios (`#0891b2`, `#16a34a`, `#0d9488`, `#38bdf8`), el peor contraste es 5.43 en
oscuro y 1.92 en claro.

**Tres grupos, no diez botones sueltos.** Lo que administras (Coach, Finanzas), el cuerpo —las seis
que son pestañas de la MISMA app de Cuidado Personal— y lo que estudias (Alemán, Entrevistas), con
un separador fino entre ellos: ordena la fila sin escribir un solo rótulo. Y van dentro de un
contenedor de 1180px como máximo, porque en una pantalla de 2000px se repartían a lo ancho y
quedaban a un palmo unas de otras; ahora ocupan 999px centrados.

El botón de privacidad se ancló a la derecha, y bajo la barra corre una línea de acento en
degradado — lo único que la separa del slide cuando el de abajo también es oscuro.

**El botón de privacidad es una píldora más.** Adán: *"ocultar finanzas quiero el mismo estilo que
los demás, es más hazlo solo un icono pero del mismo estilo"*. Perdió el texto y el emoji: ahora es
el ojo en trazo, con el mismo icono de 17px, el mismo alto de 29px y el mismo radio de 9px que las
demás —medido contra una píldora sin subtítulo, que es la forma base—. Con las cifras ocultas el
ojo se tacha y el botón se pinta en rojo; lo que hace lo dice su `title`, que cambia con el estado.

### Sin zoom en táctil — `sin-zoom.js`

Adán, 2026-09-01: *"no me dejes hacer zoom en el ipad ni en mi celular, pero deja los demas
gestos de touch"*.

**El `<meta viewport>` no basta**: Safari ignora `user-scalable=no` y `maximum-scale` desde iOS 10
—lo desactivaron a propósito por accesibilidad—, así que en el iPad, que es justo donde se pidió,
el meta no hace nada. El bloqueo va por eventos, en un archivo que cargan las seis apps:

| Qué apaga | Cómo |
|---|---|
| Pellizco en Safari (iPhone, iPad) | cancela `gesturestart/change/end` |
| Pellizco en el resto | cancela `touchmove` **solo con 2+ dedos** |
| Doble toque | CSS `touch-action:manipulation` |
| Ctrl+rueda | cancela `wheel` con `ctrlKey` |

El doble toque va por CSS y no cancelando `touchend` a mano, porque eso **rompería los clicks**:
si se cancela el `touchend`, el navegador ya no sintetiza el click y ningún botón responde.

**Lo que sigue vivo**, y por eso el bloqueo mira siempre cuántos dedos hay: scroll vertical,
scroll horizontal de las tiras, swipe entre pantallas y taps usan UN dedo, así que ninguno pasa
por el filtro. Comprobado con toques reales en el Dashboard: el swipe cambia de pantalla, el
scroll baja 484px y el tap dispara su click.

Vive en `Dashboard/sin-zoom.js` y se carga con `<script src="../Dashboard/sin-zoom.js">` —una
sola copia para las seis apps, como `datos-maestros.js`—. El meta se cerró igual en las seis:
no manda en Safari, pero sí en Android y en el escritorio.

### Otras piezas

- **Tira de 7 días** arriba: 66px de alto, la foto del gimnasio como fondo de toda la tarjeta
  (`position:absolute`) con el texto encima. Partida en dos la foto quedaba en ~40px y el degradado
  se la comía.
- **KPIs de dinero**: salen de `finanzasmx_v2` en vivo, con los saldos ya migrados.
- **"Importante este mes"**: eventos propios, editables desde el slide.

---

## El tablero del Plan Maestro

La pantalla 2. Tres columnas bajo la banda de fase y la ruta de deuda: **el mes, el día que
toques y la semana a la que pertenece**. Sustituyó a las tres listas de tareas (Ahora / Este mes
/ Hecho), que pintaban las 9 tareas de la fase con el mismo peso y sin decir cuándo toca cada una.

Adán, 2026-08-29: *"quiero toda la parte del calendario en esa parte (página 2)… al pasar me das
información acerca de cuánto gasto cada día, pero debe estar todavía más completo… quiero día por
día mucha información, al igual que semana por semana"*.

### De dónde sale cada cosa

Ningún importe está escrito en el código del tablero:

| Dato | Fuente |
|---|---|
| Gasto e ingreso de cada día | `finanzasmx_v2.transactions`, agrupadas por fecha en `ctMovs(ym)` |
| Color de cada categoría | `CT_COLOR`, los mismos hex que `CCOLORS` de Finanzas.html |
| Pagos programados de un día | `CIFRAS.CALENDARIO.cobros` + el `day` de cada deuda viva (`ctAgenda`) |
| Tareas y fase | `PHASES`, con su estado en `coach_checks_v1` |
| Costo de comer, por día | `LISTA_COMPRAS_PRECIOS` × `CIFRAS.LISTA_COMPRAS.comida` (`ctComida`) |

`ctAgenda()` es la misma fuente que alimenta el globo del calendario anual, a propósito: dos
pantallas que dicen qué se paga un día no pueden discrepar.

### El mes

Cada celda lleva su carga sin tocarla: el importe redondeado a miles, una barra verde por lo que
entró y otra roja o ámbar por lo que salió — la altura es proporcional al día más caro del mes,
así que el peso se lee de un vistazo. Borde ámbar cuando ese día cae un pago fijo.

Las flechas ‹ › cambian de mes. **Al abrir un mes que no es el actual se elige el primer día con
movimiento**, no el 1: un mes que se abre en un día vacío parece que no tiene datos.

### El riel: una sola cifra manda

Adán, 2026-08-30: *"me gusta, pero hay cosas no muy entendibles, hazlo entendible y
agradablemente visual y futurista y moderno, pero mas entendible"*. Diseñado en canvas, aprobado
tal cual y llevado al HTML.

El problema no eran los datos, era que **tres cifras grandes competían** — la del día, la de la
semana y la del calendario — sin que ninguna dijera cuál mandaba. Ahora manda una sola, en una
banda a lo ancho encima de las tres columnas:

```
MARTES 18 · HACE 11 DÍAS · TE QUEDA      CÓMO CAE EL DINERO…        CIERRAS EL 31 CON
$10,336                                   ╲__                        $8,674
● Vas holgado · te sobran $667/día            ╲______                Es lo que te sobra
                                          15 16 17 18 … 31            de esta quincena
```

`ctTramo(nSel, nDias)` es el único cálculo: recorre la quincena desde que entra la nómina, arrastra
el saldo día a día y devuelve la serie completa. De ahí salen el número grande, la línea, el cierre
y la resta de la columna del día — **un solo cálculo, no cuatro que puedan discrepar**.

**El estado en palabras** es lo que faltaba: los números estaban, pero no decían si vas bien.
`Vas holgado` / `Vas justo` / `Te vas a pasar` sale de comparar lo que sobra al cerrar el tramo
contra lo que cuesta comer una semana. Al lado, `$667/día`, que es ese sobrante repartido entre los
días que quedan — lo que puedes gastar de más, no lo que tienes en la cuenta.

**La línea está escalada al rango del tramo, no al cero.** Con el tope puesto en la nómina
($20,500) los saldos vivían todos en la mitad de arriba y la línea salía plana. Escalada entre su
propio mínimo y máximo, se ve el escalón del día 15 y la bajada lenta del resto. Los 17 días son
botones: tocar uno mueve el día y el calendario a la vez.

### Elige el día

Adán, 2026-08-30: *"quiero que se vean indicativos de colores y mejor distribucion, si quieres
hacerlo mas chico para que quepan mas cosas, hazlo"*. Diseñadas tres direcciones en canvas; eligió
la del ecualizador.

El problema de fondo era que **23 de los 31 días llevaban la misma barra roja** —la de solo
comer—, así que los 8 que de verdad mueven el saldo quedaban enterrados en el ruido.

Ahora cada celda lleva una **barra vertical cuyo alto es lo que sale ese día** y cuyo color es el
concepto que manda. Los días de solo comer quedan en una rayita de 4px y el 1 y el 15 se ven como
los escalones que son. La celda baja de 48 a 38px, y con lo que se libera caben debajo dos cosas
nuevas.

**El mes de un vistazo:** las 31 barras seguidas, sin la rejilla del calendario, para leer el
ritmo del gasto de corrido. Cada barra lleva a su día y el día abierto se pinta en cian.

**Los nombres.** Adán: *"solo abajo si ponme el nombre de las cosas"*. En vez de una leyenda que
explicaba colores en abstracto —y que además se cortaba—, va la lista de lo que de verdad cae ese
mes, en orden de día: `1 Renta`, `1 Plan de datos AT&T`, `1 Quincena`, `11 Tarjeta BBVA`,
`15 Crédito Automotriz`… Cada chip lleva su color, y tocarlo abre su día. La nómina va en verde,
porque es lo único que sube el saldo.

Dos cosas que costaron una vuelta: `Math.round(20500/1000)` pintaba **"+21k"** en la celda del día
de nómina —un decimal lo arregla—, y ese texto no cabe por debajo de 1180px, así que ahí se
oculta: el borde verde y el chip de abajo ya lo dicen.

### El día: qué pagas y de dónde sale el saldo

Tres bloques, en el orden en que se preguntan:

1. **Lo que pagas el 18** — comer y los pagos que caen, con el total del día.
2. **De dónde sale ese saldo** — la resta explícita: entró el 15 `+$20,500`, salió del 15 al 18
   `−$10,164`, te queda `$10,336`, y falta por salir `$1,662` del 19 al 31. Esto sustituye al
   `viene de $0`, que no quería decir nada.
Hubo un tercer bloque, "Los días antes de este", con los tres días anteriores y su saldo.
Adán lo quitó a los pocos minutos: *"quita esto, esto no me aporta nada"* — y tenía razón, el
riel de arriba ya enseña esa misma trayectoria entera y con más contexto.

### La semana: el cierre como una resta

El cierre dejó de ser una cifra suelta y se explica en tres líneas — *arrancaste con* $20,500,
*se fue en la semana* −$10,509, *cierras el domingo con* $9,991 — seguidas de en qué se fue, de
mayor a menor, y de lo que toca esta semana con su casilla.

El día a día de la semana desapareció: lo cubre el riel, y estaba dos veces.

**Cada gasto lleva a su día.** Adán, 2026-08-30, señalando la lista: *"cuando haga click aqui, deberia llevarme al dia en que esta ese gasto"*. Ahora cada concepto que cae un día concreto es un botón que abre ese día — y arrastra con él el calendario y el riel, como cualquier otro salto.

De paso lleva el día escrito al lado (`Crédito Automotriz · día 15`), que era un dato que no estaba en ninguna parte: se veía cuánto costaba cada cosa, no cuándo caía.

Los tres tiempos de comida **no** son botones: caen los siete días de la semana, así que no hay un día al que ir. La diferencia se nota al pasar por encima — el resaltado solo aparece en los que llevan a algún sitio.

### El tablero ya no depende de que Finanzas se haya abierto

Encontrado al medir este rediseño, y **anterior a él**: `ctAgenda` leía las deudas solo de
`D.fin.debts`, que llena Finanzas.html. En un navegador donde Finanzas nunca se hubiera abierto, el
tablero veía **3 de los 8 pagos del mes** — faltaban el crédito automotriz, el iPhone y las
tarjetas — y el saldo salía inflado en miles: el 15 marcaba $18,885 en vez de $12,185.

Ahora, si `D.fin.debts` viene vacío, se leen de `CIFRAS.DEUDAS_SEED`, que es la misma fuente que
siembra Finanzas. Comprobado: con Finanzas abierto y sin abrir, los 8 pagos y las cinco cifras de
control salen idénticos.

### Lo que cuesta comer, y de dónde sale ese número

Adán pidió primero el desglose —*"las comidas desglozamelas por desayuno, comida y cena, no las
pongas junto"*— y, viéndolo en pantalla, lo deshizo en dos pasos: *"aqui por sema si juntame
cuanto gasto en comida, cena y desayuno juntos"* y después *"mejor, comida, desayuno y cena
ponmelo en uno junto"*. Tres filas idénticas cada día pesaban más de lo que aportaban.

**Ahora se muestra en una sola línea** —`Comer · desayuno, comida y cena · −$115`— en el día y en
la semana. El desglose no se perdió: vive en el `title` de esa fila, así que aparece al pasar por
encima sin ocupar sitio.

El reparto se calcula igual, y sale de datos que ya existían y no de proporciones inventadas:
`RECETAS_MINI` guarda el `costoAprox` real de cada plato.

| | De dónde sale | Vale |
|---|---|---|
| Desayuno | promedio de las 10 recetas de desayuno | $16.60 |
| Cena | promedio de las 8 recetas de cena | $37.50 |
| Comida | lo que queda de la despensa del día | $60.87 |
| **Día** | **la despensa semanal entre 7** | **$114.97** |

Los tres **suman exactamente** el gasto diario que ya usaba el tablero, así que ningún saldo se
movió en ninguno de los tres cambios: es el mismo dinero, dicho de otra forma. No hay recetas de
comida —el recetario solo cubre desayuno y cena—, y por eso ese tiempo es el resto y no un
promedio; si algún día se añaden, el reparto se afina solo.

### Una tarea marcada se queda a la vista

Adán, 2026-08-30: *"no quiero que se borren las cosas que hagan click en ya hecho"*.

Pasaba porque el reparto de `ctTareasSemana` se hace **sobre las pendientes** —lo que quedaba del
mes entre las semanas que faltan—, así que al marcar una salía del reparto y su sitio lo ocupaba
la siguiente. Cerrar una tarea la hacía desaparecer, que es lo contrario de lo que uno espera al
marcarla.

Ahora `toggleFaseCheck` no guarda un `true` pelado sino **en qué semana se cerró**
(`"2026-08#5"`), y la lista de la semana añade detrás las que llevan su marca: se quedan, con la
casilla puesta, el texto tachado y en verde en vez de ámbar, para que las pendientes sigan
mandando. Al desmarcarla vuelve a pendiente.

Dos detalles que costaron una vuelta cada uno: el tope de filas tiene que ir **sobre las
pendientes** y no sobre la lista entera —las cerradas van al final y el `slice` volvía a
borrarlas de la vista—, y el tachado se aplica a `span:not(.ct-tar-chip)`, porque si no el chip
`P1` se llevaba también el gris y quedaba ilegible sobre el verde.

Un `true` de los de antes sigue contando como hecha; solo que, al no tener semana, no reaparece
en la lista.

### Ver y revertir lo ya hecho

Adán, 2026-08-30: *"necesito poder ver y revertir las tareas ya hechas"*. El contador `8 ya
hechas` era solo un número; ahora es un botón que despliega la lista debajo.

No todo lo hecho se puede deshacer, y la lista lo distingue:

- **Con casilla** lo que se marcó desde aquí (`checks[id]`): desmarcar la devuelve a lo que toca.
- **Con un ✓ y sin casilla** lo que trae un ✅ escrito en `PHASES` —ese dato vive en el maestro—
  y los logros de la libreta, que no se desmarcan por diseño.

`ctHechasAbierto` vive fuera del render para que el desplegable siga abierto cuando el panel se
repinta al desmarcar algo.

**El fallo que costó la vuelta:** una misma tarea puede tener dos casillas en pantalla —la de
"te toca" y la del desplegable—, y `toggleFaseCheck` las buscaba por id, quedándose siempre con
la primera. Al desmarcar abajo leía la de arriba, que seguía marcada, y volvía a guardarla: la
tarea no se revertía nunca. Ahora la casilla manda su propio estado
(`toggleFaseCheck(id, this.checked)`) y la búsqueda por id queda solo para quien no lo pasa.

### Los seis fijos que el calendario no contemplaba

Adán, viendo la pantalla de suscripciones de Finanzas: *"creo no contemplaste todo esto"*. Tenía
razón, y era el fallo más caro de todos los de este día.

`CALENDARIO.cobros` solo tenía renta, plan de datos, las dos quincenas, CETES y gym. Fuera se
quedaban **seis gastos que sí estaban en el maestro** y que nadie descontaba del tramo:

| | Al mes | Día |
|---|---|---|
| Claude Code | $380 | 2 |
| Internet | $200 | 8 |
| Luz y agua | $135 | 1 |
| iCloud | $50 | 8 |
| Gas | $179 **cada dos meses** | 1 |
| ~~Limpieza~~ | ~~$150~~ | — |

Eran **$1,094 al mes** saliendo de la cuenta sin que ninguna pantalla los viera: el tablero venía
dando saldos de más todo este tiempo.

**La limpieza no existe.** Preguntado por su día, Adán contestó *"esa no la pago"*. Eran $150/mes
que el presupuesto llevaba dando por gastados; fuera del maestro.

**El gas es bimestral.** *"gas cada 2 meses el perimero del mes, el ultimo fue el 3 agosto"*. Los
cobros aceptan ahora `cada` y `desde`, y `ctAgenda` los respeta: el gas aparece en agosto y en
octubre, y no en septiembre. En el presupuesto mensual entra por la mitad (`gasMensual`), porque
un recibo cada dos meses no pesa lo mismo que uno cada mes.

Entre las dos correcciones, `servicios` pasó de $1,314 a **$1,075** y `fijosTotal` de $13,394 a
**$13,155**.

#### Finanzas los pedía con cifras escritas a mano

El mismo día apareció la causa de que Adán lo detectara: la lista `RECURRENTES` de Finanzas tenía
los importes **escritos a mano**, así que se habían quedado viejos sin que nada lo notara — el gym
seguía en $1,500 (es $650 desde que cambió a Total Pass el 18 de agosto) y el plan de datos en
$600. Y le faltaban luz/agua y limpieza, así que el subtotal pedía $2,909 cuando eran $2,394.
Ahora se leen de `PROYECTO`.

#### El control que lo habría cazado

`verificar-sincronia.js` gana un control: **todo gasto fijo de `PROYECTO` con importe tiene que
caer algún día de `CALENDARIO.cobros`**. Si mañana se añade un servicio al maestro y se olvida su
día, el verificador lo dice en vez de que el saldo salga alto y nadie se entere.

### El plan de datos de AT&T

Adán: *"los dias primero de cada mes tambien pago mi plan de datos de ATT and T, agregalo, me
cuesta 650"*.

**No era un gasto nuevo**: `PROYECTO.celular` ya existía con $600 y ya sumaba en `servicios` →
`fijosTotal`. Darlo de alta aparte habría contado el mismo recibo dos veces. Lo que faltaba era
el **día**, que no vivía en ningún lado — por eso nunca aparecía en el calendario ni descontaba
del tramo.

Corregido en su sitio: `celular: 650`, `celularPlan: 'Plan de datos AT&T'`, y su día 1 en
`CALENDARIO.cobros` leyendo ese mismo valor. `servicios` pasó de $1,264 a $1,314 y `fijosTotal`
de $13,344 a $13,394, y el verificador lo propagó a los `.md` que citaban las viejas. La primera
quincena cierra ahora en $5,246 en vez de $5,896: los $650 estaban saliendo de la cuenta sin
que el tablero lo supiera.

### El auto, el día 15

Adán: *"el pago automotriz ponlo los dias 15 de cada mes"*. No es un detalle de un día: con
`day: 14` los $6,700 caían en la semana que no recibe nómina y la hundían. Corregido en el maestro
y en su migración (`_autoDia15_20260829`).

### "Hoy aprendes" abre su sección

Adán, 2026-08-30: *"aqui si hago click deberia mandarme al dashboard de esa seccion"*. Las dos
tarjetas del panel —la lección de alemán y el tema de Python— son ahora botones que saltan a su
slide.

`irASlide(cls)` busca el slide **por su clase** (`theme-aleman`, `theme-entrevista`) y lee su
`data-i`, en vez de llevar el número escrito a mano: si algún día se reordenan los slides, el
salto sigue llegando a donde debe.

La tarjeta ya leía su contenido de `alemanTemaHoy()` / `entrevistaTemaHoy()`, las mismas
funciones que pintan los slides, así que al llegar se ve **esa misma lección** y no otra —
comprobado: el título de la tarjeta aparece en el slide de destino.

### En qué invertir tu tiempo

Dos cosas se arreglaron el 2026-08-31, y la primera era un engaño de verdad.

#### La barra medía el retorno y parecía medir el nivel

Adán: *"los indicadores no son claros, por que parece que las habilidades que tengo menos
conocimiento, parece que tengo mucho […] inviértelo"*.

El ranking ordena por **retorno** (`peso × lo que falta`) y la barra dibujaba ese mismo retorno.
Como el retorno crece cuando el nivel baja, salía al revés de lo que uno lee:

| | Nivel | Barra que salía |
|---|---|---|
| Ventas | 15/100 | llena |
| Mentalidad | 85/100 | casi vacía |

Encima el **color** venía del nivel y el **largo** del retorno: dos escalas en el mismo trazo.

Ahora la barra es el nivel y el orden sigue siendo el retorno — son dos preguntas distintas y cada
una tiene su sitio. Al pie, una frase lo dice con nombre propio: *"el orden es dónde una hora rinde
más, que no es lo mismo: Ventas va primera porque pesa ×1.5 y está casi a cero"*. La fila pasó de
15px a 33px, con el nombre y el nivel arriba y la barra debajo, y hay leyenda de los tres niveles
más la rayita de la meta de la semana.

#### El contenido manda, y la ruta se ve entera

Adán: *"el contenido eso me interesa más […] además abarca más espacio de la pantalla"*. Diseñado
en canvas en tres direcciones; eligió la de la ruta al lado, con la ruta **a la izquierda**.

El panel de foco pasó de `1.75:1` a `2.35:1` — de 857 a **952px** a 1600 — y por dentro se partió
en dos: la ruta de pasos a la izquierda y el paso abierto a la derecha.

Los 9 pasos eran una rejilla de botones bajo el texto donde el nombre no cabía; ahora son una lista
vertical con el nombre completo, su barra de avance y el número de paso. El paso abierto gana un
número grande junto al título, y el *por qué* y el *qué hacer* se separan por color (verde y cian) y
por tamaño de letra, en vez de ir seguidos con la misma voz.

**En un teléfono la ruta se apila arriba** y pasa a una tira de números con scroll horizontal: el
nombre del paso abierto ya está en el título, y el área de toque sube de 30 a 46px. Los dos botones
del pie suman 342px contra los 333 del panel, así que ahí van apilados.

### Medidas

A 1600×1000 el tablero ocupa los 748px que le deja la banda de fase, con las tres columnas
parejas (`flex:1` sobre `.slide-inner`, que ya es flex column). Sin eso se quedaba en 437px y
media pantalla iba en negro. Cada columna lleva su propio `overflow-y:auto`, para que un mes con
muchas categorías no empuje el layout.

---

## El calendario del Plan Maestro

Se abre con `abrirCalendario()` y pinta el año por meses. El panel del mes elegido lleva hasta
**tres medidores**, y el orden no es estético: es el que fija el propio Plan Maestro.

| Medidor | Qué mide | Color |
|---|---|---|
| Cierre de la fase | Días que quedan del tramo | según urgencia |
| Ritmo requerido | Lo que falta al día para cerrar el fondo de emergencia | cyan |
| Ritmo de la tarjeta | Lo que falta al día para liquidar la TC BBVA | rojo, o naranja si el mínimo cubre el interés |

Los dos últimos son los **dos objetivos financieros de la Fase 0**, tal como los enumera su propio
texto: *"1) fondo de emergencia, 2) abonos extra a BBVA"*.

### `calRitmo(fase)` — el fondo de emergencia

Devuelve `porDia` (lo que falta dividido entre los días que restan), `pct` (avance real) y
`esperado` (avance que tocaría por calendario). La barra dibuja el avance y una marca vertical en
el esperado: si la barra no llega a la marca, va atrasado.

Solo se pinta para la fase que corre **ahora**. Proyectar una cuota diaria sobre una fase cerrada
o que no ha empezado sería un número bonito y falso.

### `calRitmoTC()` — la tarjeta

Lee la deuda `d001` de `finanzasmx_v2`; ningún importe está escrito en el código. Calcula:

- `interes` = saldo × tasa ÷ 12. Con los datos de hoy, **$1,578 al mes**.
- `crece` = interés − mínimo. Si sale positivo, **pagando el mínimo el saldo sube**. Hoy sale
  **+$78**: el mínimo de $1,500 no cubre el interés de una tasa del 55.7%.
- `pmt` = cuota fija que la liquida en 12 meses, por amortización francesa
  (`P·i / (1 − (1+i)^⁻¹²)`). Dividir el saldo entre 12 daría un número optimista y falso: se
  come el interés. Son **$3,759 al mes, $124 al día**.
- `mesesMin` = lo que tardaría pagando solo el mínimo. Si el mínimo no cubre el interés el
  logaritmo no existe — es que **no se liquida nunca**, y eso es lo que dice el bloque.

**El dato que manda no es el plazo, es la comparación.** La barra no muestra avance de pago:
enfrenta el mínimo (relleno) contra el interés mensual (ancho total). Hoy llega al 95% y se
queda corta, que es exactamente el problema. El texto de la Prioridad 2 del Plan Maestro ya lo
decía en prosa; faltaba verlo como cifra.

El bloque desaparece solo si la tarjeta queda en $0, si no hay deudas o si no hay
`finanzasmx_v2` — comprobado en los cuatro casos. Todas las cantidades pasan por `money()`, así
que el modo privado las tapa; la **tasa no**, porque es una condición del producto y no su dinero.

---

## Los datos no se declaran aquí

El Dashboard **no declara ninguna de sus estructuras grandes**: las lee de `datos-maestros.js`.

```js
const RUTINA_TASKS  = CIFRAS.rutina('../Coach/Coach.html');
const SK            = CIFRAS.SK;
const PHASES        = CIFRAS.PHASES;
const APRENDIZAJE   = CIFRAS.APRENDIZAJE;
const LISTA_COMPRAS = CIFRAS.LISTA_COMPRAS;
```

Cada una llevaba su gemela a mano en otro archivo. Moverlas quitó ~57 KB de este HTML y, sobre
todo, quitó cinco sitios donde un cambio podía quedarse a medias.

**`GYM_RUTINA_DEFAULT` es la excepción** y sigue aquí: no es una copia de datos, es el *respaldo*
para un navegador que nunca abrió `ejercicio.html`. Si esa app se usó alguna vez, gana
`D.gym.rutina`. Por eso un cambio de rutina en el código no se refleja solo, y hay migraciones
`fix*IfNeeded()` que corrigen el dato ya guardado. El verificador compara los 7 días.

---

## Migraciones de datos

Las correcciones de saldo nuevas van a `MIGRACIONES` en `datos-maestros.js`, **no aquí**.

En este archivo quedan las anteriores a 2026-08-24 (`fixTasaTC`, `fixBanamex`, `fixPagos20260813`,
`fixMsiBBVA20260813`, `fixAhorro20260817`, más las de rutina y gimnasio). Ya corrieron y tienen su
bandera puesta en `localStorage`, así que son inertes: moverlas sería riesgo sin ganancia.

Todas siguen el mismo patrón: bandera propia, una sola pasada, y **nunca revierten** un cambio que
Adán haya hecho a mano después.

`CIFRAS.refrescar()` se llama **después** de esos `fix*IfNeeded()` locales: el módulo leyó
`localStorage` al cargarse, antes que ellos, y sin el refresco la prosa mostraría el saldo previo.

---

## Prosa con variables

El Dashboard no escribe su prosa en el HTML sino en constantes JS (`PHASES`, `META_DETALLE`) que
inyecta con `innerHTML`. Por eso `CIFRAS.aplicarDOM()` no basta: cada repintado volvería a traer el
`{{marcador}}` desde el literal.

La solución es **`cifrarLiterales(obj)`**, que sustituye dentro del literal una sola vez al
arrancar; todos los renders posteriores ya salen con el número puesto. Es recursiva y **en el
sitio**, para no romper las referencias que otras partes del código guardan a esos objetos.

---

## Trampas conocidas

- **Finales de línea mixtos.** El archivo tiene ~7.500 líneas CRLF y 577 LF sueltas. Leer y
  escribir con `newline=''` y usar `\r\n` en lo insertado, o un cambio de 100 líneas produce un
  diff de 12.000. Commitear con `git -c core.autocrlf=false add`.
- **`String.replace` de JS interpreta `$&` y `$1`** en el reemplazo. Como aquí casi todo lleva `$`
  (son cifras), pasar una **función** de reemplazo.
- **Comillas en literales JS.** Un texto con `"` dentro de una cadena delimitada por `"` rompe el
  archivo entero y el fallo no se ve hasta abrirlo. Validar siempre con `node --check` sobre los
  bloques `<script>` extraídos.
- **El slide de Coach scrollea por dentro** (`.theme-coach .slide-inner`), no la página. Un
  contenido que crezca alarga la columna, no desborda la pantalla.

---

## Verificar un cambio

```bash
node Dashboard/verificar-sincronia.js          # nada duplicado ni desincronizado
```

Y en navegador, con Playwright desde la caché de npx (ver `../../CLAUDE.md`), a **1600px y 390px**:
geometría real, elementos desbordados y errores de consola. Se abre con `file:///` porque así es
como se usa, y los datos se siembran con `page.addInitScript`.

Para medir "Mi Día" hay que tener en cuenta que **cambia de alto según la hora** (el bloque actual
y los que quedan), así que dos medidas a horas distintas no son comparables.

## El rail deja de plegarse solo al elegir pantalla (2026-09-01)

Adán: *"aqui si vuelvo a dar click, no quiero que se esconga ese menu de nuevo"*.

`showSlide()` terminaba con `if(!...contains('mini')) pintaRail(false)`, con el
comentario *"elegir pantalla es justo para lo que se abre el rail: al llegar, se
pliega solo"*. La idea era razonable para un salto suelto, pero convierte el menú
en algo de un solo uso: para ir de Metas a Lista de compras hay que reabrirlo cada
vez. Fuera esa línea — **sólo el tirador lo cierra**, y `RAIL_KEY` ya guardaba el
estado, así que ahora vuelve como lo dejaste.

Dónde se ve: el rail es vertical **a partir de ~1100 px** (198 px de ancho, con
los nombres al lado del icono). Por debajo se dibuja como barra inferior con los
controles de play y el ☰, sin nombres — por eso el mismo panel se ve tan distinto
en el móvil.

No se tocó el menú ☰ (`navMenuList`): ése es un overlay modal y sus ítems llaman a
`goTo(i);toggleMenu()` a propósito — cerrarse al elegir es lo que se espera de un
modal.

Comprobado a 1400 px saltando por 6 pantallas seguidas: el rail sigue abierto en
todas; el tirador lo cierra; abierto sobrevive a la recarga y cerrado también.

## El tema sube junto al ojo (2026-09-02)

Adán: *"la parte de modo oscuro o modo claro, la quiero al lado del ojo de
arriba, pero con diseño similar para que sea parecido"*.

Estaba abajo, en la fila de controles del rail (☰ ⛶ ⚙ ? 🌙), donde hay que abrir
el rail para llegar. Ahora vive en la barra de accesos, **a 5 px del ojo**, con la
misma píldora `qa-pill` de 35 px, el mismo trazo de 24 px y el mismo color de
icono — comprobado: `rgb(133,137,168)` en oscuro y `rgb(99,102,124)` en claro, el
mismo valor en los dos botones.

- El icono **enseña a dónde vas, no dónde estás**: sol en tema oscuro, luna en
  claro. `luna` y `sol` entran en `QA_ICO`, junto a `ojo` y `ojoOff`.
- El ojo dejó de posicionarse solo: los dos comparten el carril `.qa-acciones`,
  y así se leen como un par.
- **Ninguno de los dos se pliega.** Antes `.qa-collapsed` escondía el ojo, y como
  el tema salió del rail se habría quedado inalcanzable en móvil. Los dos son
  controles que se usan sin entrar a ninguna pantalla, así que se quedan visibles
  sobre el botón de desplegar.

Dos fallos que salieron al mover:

- `toggleTheme()` hacía `btn.textContent = '☀️'` sobre un botón cuyo contenido es
  un `<svg>`: **le borraba el icono** y dejaba un emoji suelto. Ahora repinta la
  barra entera, que es quien dibuja el icono correcto.
- La regla móvil `.priv-btn{position:static;order:-1}` sacaba del carril **sólo al
  ojo**; con el tema al lado, los superponía 75 px. Se aplica al par.

Comprobado a 1400, 820 y 390 px, plegada y desplegada, en los dos temas: 5 px de
separación, misma altura y mismo alto que el ojo, sin solapes ni desbordes, y el
tema cambia de verdad.

## Las 12 habilidades abren su ruta, y la barra baja a la mitad (2026-09-02)

Adán: *"las barras hazlas la mitad del ancho que tienen, y además cuando haga
click en cada habilidad, del lado izquierdo me mostrarás la ruta completa para
aumentar esa habilidad, así como ya lo tienes para inversión"*.

**La barra pasa de 6 px a 3 px de grosor**, y sigue midiendo el renglón entero.
El largo **es** el dato —es el nivel—, así que reducirlo quitaba información; lo
que sobraba era el trazo, que pesaba más que el nombre y el número. Primero se
recortó el largo por leer *"ancho"* como la dimensión horizontal, y Adán lo
corrigió: *"las redujiste de largo y no de ancho"*.

**Cada fila abre su ruta a la izquierda.** La función ya existía —`habFocoSet()`—
pero sólo la usaba el botón "Cambiar a…", y `habFocoActual()` se limitaba a las
candidatas: las que no están en pausa y entran en el top de prioridad. Ahora
**mirar una ruta y elegir el foco de la semana son cosas distintas**: se puede
abrir cualquiera, aunque esté en pausa, y el chip de la cabecera lo dice —
*"Esta semana"* si es la recomendada, *"Su ruta"* si sólo la estás consultando.
La fila abierta se marca con una barra lateral.

### Las 6 que no tenían ruta

Y aquí estaba el problema de fondo: **`APRENDIZAJE` sólo tenía 6 de las 12**.
Copy, Networking, Liderazgo, Código, Inglés y Mentalidad salían en la lista con
su número, pero al tocarlas el panel no habría pintado nada — `habPasos()`
devuelve `[]` y `renderSkills` hace `return`.

Ahora las 12 tienen ruta, **75 pasos en total**. Cada una arranca del nivel que ya
tiene, no de cero, y de lo que ya hace:

| | Nivel | De qué va su ruta |
|---|---|---|
| Copy | 55 | escribe claro pero no pide nada; el correo frío de 5 líneas |
| Networking | 55 | 20 nombres en una hoja y reactivar sin pedir |
| Liderazgo | 80 | las tres conversaciones que evita; liderar sin el puesto |
| Código | 60 | tests antes que features; un proyecto que se pueda enseñar |
| Inglés | 80 | hablar bajo presión, con las 28 h al volante como bloque |
| Mentalidad | 85 | el sueño como palanca; cortar la rumia con una acción |

El control 3 del verificador pasó de comprobar 6 prioridades a **12**, solo.
