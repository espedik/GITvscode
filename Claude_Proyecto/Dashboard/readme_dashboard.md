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
| `aleman-data.js` | Lecciones de alemán extraídas de `Aleman/` para el slide correspondiente |
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
| `theme-metas` | **Mis Metas** | Corto/mediano plazo con fotos, largo plazo, patrimonio neto |
| `theme-basicas` | **Habilidades Base** | Guías de vida práctica (trámites, impuestos, red, imagen…) |
| `theme-skills` | **Habilidades** | Radar de 12 habilidades y prioridades de aprendizaje |
| `theme-lista` | **Lista de Compras** | 7 categorías. Comida con precios por pieza, ticket, costo al mes y proporción de verduras/frutas/almidones — ver abajo |
| `theme-aleman` | **Alemán del día** | La lección de alemán, contenido nativo desde `aleman-data.js`. Filtrado al capítulo que cursa — ver abajo |
| `theme-entrevista` | **Entrevista del día** | Un tema técnico al día, desde `entrevistas-data.js` |

Alemán y Entrevistas **no usan `<iframe>`**: su contenido se extrajo a los dos `.js` de esta
carpeta y se pinta nativo dentro del slide. Ambos llevan botón "Siguiente →" para no esperar al
día siguiente.

### El slide de Alemán muestra solo el capítulo que se cursa

`alemanLista()` filtra `ALEMAN_TEMAS` por `PROYECTO.kapitelAleman` (en `datos-maestros.js`).
Mientras esté puesto en 10, el slide rota **solo entre las 5 lecciones del Kapitel 10** de Cenlex
Santo Tomás en vez de entre las 40; el contador lo dice: *"Tema 3 de 5 · Kapitel 10 · Cenlex Santo
Tomás"*. Poner esa clave en `null` devuelve la rotación completa **sin tocar este archivo**.

Origen (2026-08-25): *"ya estoy estudiando de nuevo en Cenlex Santo Tomás y necesito estudiar,
entonces necesito enfocarme en estos temas"*. Con 40 lecciones rotando, el tema del día casi nunca
era el suyo.

Las lecciones del capítulo llevan `kapitel:10` en su entrada de `ALEMAN_TEMAS`. Añadir un capítulo
nuevo es marcar sus lecciones con ese campo y cambiar el número en el maestro.

**Las cinco se ven a la vez.** `pintarLeccionesK10()` dibuja una fila con todas las lecciones del
capítulo (`.al-lec`), con la activa resaltada, y `alemanIr(i)` salta a la que se toque. Antes solo
existía "Siguiente lección →", que obliga a pasar por las otras cuatro para llegar a la que toca
estudiar. Esa fila **solo se pinta con el filtro activo**: con las 40 lecciones sueltas no cabría, y
el criterio fue justamente acotar.

`renderHeroAprender()` (la tarjeta "Hoy aprendes" de Mi Día) cuenta sobre la **lista filtrada**, no
sobre `ALEMAN_TEMAS`. Contaba sobre las 40 y decía "4 / 40" mientras el slide decía "Tema 4 de 5":
es el mismo dato y tiene que contar igual.

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

### El día: cuánto te queda, no cuánto te cuesta

Adán mandó dos veces la misma captura — la tarjeta de "Te queda ese día" con el desglose de
barras — y la segunda fue clara: *"pero no pusiste este diseño por dia, no lo cambiaste"*. El
panel decía **te cuesta**, que es justo la pregunta contraria.

El número grande es el **saldo de la quincena hasta ese día**: lo que entró con la nómina menos
todo lo que ya salió — pagos fijos y comida — desde el 1 o desde el 15.

#### Cómo se fue, día a día

Debajo iba el acumulado por concepto. Adán, sobre esa misma tarjeta: *"aqui desglozamelo por
dia"*. El acumulado contestaba *en qué* se fue, pero no *cuándo* — y el cuándo es lo que explica
por qué el 8 te quedan $8,086 y no otra cifra.

Ahora se guarda la **traza**: una fila por día desde que entró la nómina hasta el día que estás
viendo, y la última cierra justo en el número grande.

```
CÓMO SE FUE, DÍA A DÍA        desde el día 1 · −$12,414
  1    +$20,500  Renta, iPhone y comer    −$11,609    $8,891
       ████████████████████████████████████████████████
  2–7  6 días de comer                       −$690    $8,201
       ███
  8    desayuno, comida y cena               −$115    $8,086   ← el día abierto
       ▌
```

Cada fila lleva **dos lecturas a la vez**: la barra es *lo que salió en ese tramo* (proporcional al
más caro, y del color del concepto que manda — amarillo renta, rojo comer), y el número de la
derecha es *lo que quedaba al terminarlo*. Así el día de la renta se ve como el escalón que es, y
los días de solo comer como la bajada lenta.

#### Los días de solo comer van juntos

Adán, viendo nueve filas idénticas de `solo comer −$115`: *"no desgloces todas las comidas, solo
pon una que va al dia"*. Tenía razón — catorce filas iguales no dicen nada que no diga una.

Los días seguidos en que **no cae ningún pago fijo** se juntan en un tramo (`2–7 · 6 días de
comer`), con la suma y el saldo al cerrarlo. Van sueltos el día que estás viendo y cualquiera con
pago fijo, que son los que de verdad mueven el saldo. La quincena 1 completa pasó de 14 filas a 5,
y el mes entero de 17 a 8, sin perder un peso: los totales y el cierre no cambian.

**La comida nombra sus tres tiempos.** *"la cena no te olvides todos los dias y desayuno"*. El
`$115` sale de la despensa semanal completa de `LISTA_COMPRAS.comida` dividida entre 7, así que
las tres comidas ya estaban dentro — lo que faltaba era decirlo. El día suelto dice **"desayuno,
comida y cena"** en vez de "solo comer", el día con pagos dice **"Renta, iPhone y comer"** para
que se vea que ese monto también los trae, y la línea de *lo que pasa ese día* quedó como
`Comer · desayuno, comida y cena`. Ningún día cuesta $0.

**El reinicio se ve en la cifra**: el día 14 cierra en $5,896 y el 15 salta a $12,185 con una sola
fila en la traza, porque entra la segunda nómina y el tramo empieza de cero. Comprobado en los
seis días de control (1, 8, 14, 15, 20, 31) y en los cuatro tamaños: el número grande y la última
fila coinciden siempre.

Debajo, **lo que pasa ese día** — comer y los pagos que caen — y, si hay movimientos anotados en
Finanzas, su desglose por categoría. Lo anotado va aparte y no se suma: es lo que pasó por la
cuenta, no lo que consume el tramo.

### La semana: el tramo que se mira

Adán, 2026-08-29: *"no quiero datos por quincena, quiero por semana"*.

La quincena sigue siendo la **mecánica** — el dinero entra el 1 y el 15, y el saldo se reinicia
ahí — pero ya no es lo que se lee. La tercera columna abre en la semana del día elegido y
responde tres cosas en ese orden: **con cuánto la cierras**, **en qué se te fue** y **qué cae
cada día**.

`ctQuincena(q, nDias)` sigue siendo el motor — reparte pagos fijos y comida por día y arrastra el
saldo — pero la vista toma de él una sola semana: `Q.semanas.filter(x => x.n === ctSemDe(nSel))`.

#### Con cuánto cierras

El número grande es el saldo al terminar la semana, y debajo van las tres piezas que lo explican:
`entra`, `sale` y **`viene de`** (`W.saldo - W.mueve`), que es lo que traes de la semana anterior.
Esa tercera es la que hace legible el reinicio — vale `$0` justo en las semanas que arrancan con
nómina, y la línea de abajo lo dice con palabras: *"Arranca con la nómina del día 15: el saldo se
reinicia aquí"* o *"Continúa el tramo que arrancó el día 15"*.

Las cinco semanas de un mes de 31 días, comprobadas en los cuatro tamaños:

```
S1  1–7    +$20,500  −$12,299   $8,201   ← entra nómina, viene de $0
S2  8–14              −$2,305    $5,896
S3  15–21   +$20,500  −$10,509   $9,991   ← entra nómina, viene de $0
S4  22–28              −$972      $9,019
S5  29–31              −$345      $8,674
```

**Cinco semanas cuando toca.** Adán: *"vi que algunos meses tienen 5 semanas, debes aun asi hacer
los calculos"*. `ctSemDe` pasó de un corte fijo en cuatro a `Math.min(5, Math.ceil(n/7))`; con el
anterior, los días 29 en adelante se caían de la cuenta y el cierre salía de más.

**Didi queda fuera a propósito.** Es ingreso variable, y contarlo daría un colchón de $11,200 que
puede no llegar: la semana tiene que aguantar solo con la nómina.

#### En qué se fue esta semana

Barras por concepto, ordenadas de mayor a menor y con la comida como una línea más — no en un
bloque aparte. Los colores salen de `colorDeW()`, los mismos hex que usa Finanzas, para que un
concepto tenga el mismo color en las dos pantallas. La semana 3:

```
Crédito Automotriz  $6,700   CETES  $1,500   Apple Watch MSI  $854
Comer · 7 días        $805   Gym      $650
```

#### Día a día

Una fila por día con lo que sale — comida incluida — y los conceptos que caen, o *"solo comer"* si
no cae ninguno. Cada fila es un `<button>` que llama a `ctVerDia()`: tocar el 18 en la semana
mueve el panel del día y el calendario a la vez. El día abierto queda resaltado en la lista.

#### El auto, el día 15

Adán: *"el pago automotriz ponlo los dias 15 de cada mes"*. No es un detalle de un día: con
`day: 14` los $6,700 caían en la semana 2 — la que no recibe nómina — y la hundían. Corregido en
el maestro y en su migración (`_autoDia15_20260829`).

#### Lo hecho contra lo que toca

Las dos listas van **en paralelo, no una debajo de otra**: a la izquierda lo cerrado, a la derecha
lo que toca en esa semana, con su casilla. Adán: *"detallarme todo lo de la semana y lo que ya
hici contraelo"*.

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
