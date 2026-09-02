# DATOS MAESTROS — índice del proyecto

> **Léeme primero.** Este archivo es el mapa de todo el proyecto en una página. Está hecho para
> abrirse entero y de un vistazo: si buscas un dato o quieres saber qué app tocar, la respuesta
> está aquí, sin abrir 900 KB de HTML.
>
> Pedido de Adán, 2026-08-24: *"cuando yo te diga cambia algo, te pasaré el html del dashboard,
> pero rápidamente tú debes leer el .md y ahí tendremos toda la información maestra de todo
> nuestro proyecto... esto para que gastes menos tokens y sea muy rápido los cambios"*.

**Los datos viven en [`datos-maestros.js`](datos-maestros.js) (esta carpeta).** Este `.md` dice
qué hay y dónde se usa; ese `.js` es lo que las apps ejecutan. Si cambias uno, cambia el otro.

---

## La regla

**Un dato se escribe UNA vez.** Si aparece en dos pantallas, va en `datos-maestros.js` y las
apps lo leen. Nunca se copia un número a mano en un HTML.

En la prosa se escribe un marcador y el módulo lo sustituye al cargar la página:

```html
<p>un crédito de {{autoSaldo}}</p>        →   un crédito de $293,000
<p>ganas {{sueldo}} en {{empleador}}</p>  →   ganas $41,000 en ALTEN
```

---

## Las dos clases de dato

| | **Constantes** | **Saldos vivos** |
|---|---|---|
| Qué son | Sueldo, renta, empleador, fechas clave | Lo que Adán mueve: deudas, ahorro, inversiones |
| Dónde viven | `PROYECTO` en `datos-maestros.js` | `localStorage['finanzasmx_v2']` |
| Quién los cambia | **Se editan aquí, a mano** | Adán desde `Finanzas.html`, o una migración |
| Si cambian | Edita el `.js` y esta tabla | No toques nada: las apps ya lo leen |

---

## Catálogo de variables

Todas se usan como `{{nombre}}` en la prosa, o como `CIFRAS.n('nombre')` / `CIFRAS.v('nombre')`
desde JS. En consola, `CIFRAS.tabla()` las lista con su valor actual.

### Quién es · constantes

| Marcador | Valor hoy | Se nombraba a mano en |
|---|---|---|
| `{{nombre}}` | Adán | — |
| `{{empleador}}` | ALTEN | 5 apps, 78 veces |
| `{{auto}}` | BYD Dolphin Mini | 3 apps |
| `{{broker}}` | GBM | 3 apps, 103 veces |
| `{{bancoSueldo}}` | BBVA | 3 apps |

### Ingresos y gastos fijos · constantes

| Marcador | Valor hoy | Nota |
|---|---|---|
| `{{sueldo}}` | $41,000 | Bruto mensual ALTEN, quincenal a BBVA |
| `{{sueldoQuinc}}` | $20,500 | |
| `{{didiMes}}` | $11,200 | ~$400/día × 28, cobro semanal |
| `{{siVale}}` | $940 | Vale de despensa |
| `{{ingresoTotal}}` | $53,140 | Derivada: sueldo + Didi + Si Vale |
| `{{renta}}` | $11,000 | Día 1 |
| `{{gym}}` `{{gymNombre}}` | $650 · Total Pass | Día 17. Era Fitsi a $1,500 hasta el 18-ago-2026 |
| `{{celular}}` `{{celularPlan}}` | $650 · Plan de datos AT&T | Día 1. Subió de $600 el 30-ago-2026, cuando se supo su día |
| `{{servicios}}` | $1,075 | Plan AT&T + internet + gas (la mitad: es bimestral) + luz/agua |
| `{{suscripciones}}` | $1,080 | Gym + Claude Code + iCloud |
| `{{cetesDia15}}` | $1,500 | Aporte recurrente a CETES el día 15 |
| `{{fijosTotal}}` | $13,155 | Derivada: renta + servicios + suscripciones |

### Deudas · saldos vivos (`finanzasmx_v2`)

| Marcador | Valor hoy | id |
|---|---|---|
| `{{autoSaldo}}` `{{autoTotal}}` `{{autoPago}}` `{{autoTasa}}` `{{autoMeses}}` | $293,000 · $315,800 · $6,700 · 12.99% · 61 | `d003` |
| `{{tcBbva}}` `{{tcBbvaMin}}` `{{tcBbvaTasa}}` | $34,000 ⚠️ subiendo · $1,500 · 55.7% | `d001` |
| `{{banamex}}` `{{banamexMin}}` | $0 ✅ liquidada · $810 | `d002` |
| `{{iphone}}` | $11,362 | `d008` |
| `{{appleWatch}}` `{{appleWatchCuota}}` | $854 · $854 — queda 1 cuota (18 sep) | `d004` |
| `{{zapStylo}}` `{{zapStyloCuota}}` | $334 · $167 — "el de los zapatos" | `d009` |
| `{{deudaTotal}}` `{{deudaCara}}` `{{deudaMsi}}` | $339,550 · $34,000 · $12,550 | derivadas |
| `{{minimosDeuda}}` `{{margen}}` | suma de mínimos vivos · lo que sobra al mes | derivadas |

**Derivadas del auto**, que antes se escribían a mano y se quedaban congeladas:
`{{autoAPagar}}` (meses × pago) y `{{autoInteres}}` (lo que cuesta en puro interés).

**El día de pago vive en `day`**, dentro de cada entrada de `DEUDAS_SEED`. No tiene marcador
porque no se escribe en prosa, pero **sí se dibuja**: el calendario del Dashboard arma con él el
globo de "se mueve dinero" de cada día.

| id | Deuda | `day` |
|---|---|---|
| `d008` | iPhone 15 · crédito AT&T | 1 |
| `d002` | Tarjeta Banamex | 8 |
| `d001` | Tarjeta BBVA | 11 |
| `d003` | Crédito Automotriz | **15** |
| `d004` | Apple Watch MSI | 18 |
| `d009` `d010` `d011` | MSI de TC BBVA | 22 |

**Un `day` equivocado no mueve ninguna cifra** — `minimosDeuda` y `margen` suman igual — así que
ningún cálculo lo delata: solo se ve en el calendario, mirando el día. Dos casos, los dos el
28-ago-2026:

- El del auto estaba en `1` y el calendario metía sus $6,700 junto a la renta.
  Adán: *"credito automotriz no lo pago el los dias 1 primero"*.
- El del iPhone estaba en `0`, que para el calendario significa *sin día*: una deuda viva de
  $494 al mes que **no aparecía en ninguna fecha**. Lo encontró el control 9 del verificador,
  añadido a raíz del primero.

Por eso el **control 9** exige día a toda deuda con saldo y mínimo, y el **control 10** compara
esta tabla contra el maestro fila a fila. Documentar un dato que nadie verifica es justo como se
desincronizó todo lo demás.

⚠️ **`deudaMsi` no son solo los MSI de tarjeta.** El criterio real es `type === 'other'` con saldo
vivo, o sea **deuda a 0% de interés**: ahí entra el crédito de AT&T del iPhone, que no es de
ninguna tarjeta. Es lo correcto para el plan — no es deuda cara y no compite con la TC BBVA —
pero el nombre de la variable se queda corto.

### Ahorro y metas

| Marcador | Valor hoy | Origen |
|---|---|---|
| `{{fondo}}` `{{fondoMeta}}` | $4,000 de $10,000 | vivo |
| `{{cetes}}` | $6,500 | vivo |
| `{{maestria}}` `{{maestriaMeta}}` | $53,740 de $500,000 | vivo |
| `{{maestriaEscuela}}` | Esslingen — Automotive Systems M.Eng. | constante |
| `{{maestriaInicio}}` | 2028-10-01 (pausada hasta 2027-07-18) | constante |

### Estudios de alemán · constantes

| Marcador | Valor hoy | Para qué |
|---|---|---|
| `{{escuelaAleman}}` | Cenlex Santo Tomás | Clases presenciales desde el 25-ago-2026 |
| `{{proteinaMeta}}` | 186 | Meta diaria de proteína. La citan la rutina (whey de la noche) y la ficha de whey de Salud |
| `{{kapitelAleman}}` | 10 | **Filtra el slide de Alemán del Dashboard**: con un capítulo puesto muestra solo sus lecciones en vez de rotar por las 40. En `null` vuelve la rotación completa |

### La rutina diaria

`RUTINA_TASKS` — **58 bloques** con sus subtareas: el horario completo de los 7 días. No es un
marcador, se pide desde JS:

```js
CIFRAS.rutina('')                          // Coach: los href ya son anclas suyas
CIFRAS.rutina('../Coach/Coach.html')    // Dashboard: tiene que salir de su archivo
```

Devuelve **copia profunda** con los `href` resueltos, para que una app no pueda contaminar a la
otra dentro de la misma página. `dias`: 0=domingo…6=sábado. Los bloques con `fijo:true` (ALTEN)
salen en la línea de tiempo pero no llevan checkbox ni suman al progreso.

Estaba copiada en `dashboard.html` y `Coach.html`, 17.5 KB en cada uno. Era la estructura más
grande y más tocada de las duplicadas, y llegó a divergir 6 días.

### La biblioteca

`BIBLIOTECA` — los **44 libros** en 9 grupos. Como el kit de higiene, hasta el
2026-09-02 eran cadenas `"Título — Autor"` dentro de `LISTA_COMPRAS`, y ahora cada
uno es un libro con su ficha:

```js
CIFRAS.BIBLIOTECA.todos              // los 44, sin agrupar
CIFRAS.BIBLIOTECA.porGrupo           // lo que usa la lista de la compra
CIFRAS.BIBLIOTECA.deTextoCompra(t)   // del renglón al libro
```

**La ficha de un libro NO lleva los mismos campos que la de un producto**, y por eso
tiene su propio molde (`pfLibroHtml`) y su propio control. De una crema interesa el
activo y cómo se aplica; de un libro, otra cosa:

| Campo | Qué lleva |
|---|---|
| `sobre` | de qué trata y de dónde sale, en amplio |
| `resumen` | qué dice: las ideas centrales, que es lo que se lee si no se lee el libro |
| `porQue` | por qué está en la lista de Adán y no en otra |
| `idea` | la que más rinde, en una frase |
| `cuando` | en qué momento leerlo, y respecto a cuál de los otros |

**Las portadas** salen de Open Library (`covers.openlibrary.org`): 43 de 44. La que
falta — *$100M Offers*, autopublicado — se dibuja con la silueta `libro` en el color
de su grupo. Se eligieron **mirándolas**: la búsqueda devolvió *Roughing It* de Mark
Twain para los dos libros de Hormozi y un disco de música para *One Up On Wall
Street*, y tres se tuvieron que pedir por ISBN de una edición concreta porque el
registro genérico tenía la portada mal asociada.

Ese mismo fallo dejó un rastro que no se veía en la portada: los dos de Hormozi se
quedaron también con **el año y las páginas** de *Roughing It* — 1872 y 558 páginas —
y eso solo se vio abriendo la ficha. El **control 16** lo vigila ahora comparando con
el contexto: en esta lista todo es negocio, finanzas o software moderno, y el único
anterior a 1900 es *Meditaciones*, que está declarado como excepción.

**La ficha vive en dos archivos aparte** — `Dashboard/ficha.css` y
`Dashboard/ficha.js` — porque la usan dos apps: el dashboard, en la lista de la
compra, y **Coach**, donde los libros salen nombrados **58 veces**. Copiar el molde
en cada una era la duplicación de siempre.

Coach no reescribe sus 58 recursos: un script los recorre al cargar, busca cada
título con `BIBLIOTECA.porTitulo()` y le pone el botón al que encuentra. La
descripción corta que antes estaba escrita en el HTML de Coach ahora sale de
`ficha.idea`, así que ese texto vive en un solo sitio.

`porTitulo` resuelve los **alias**: Coach nombra a Carnegie en inglés (*How to Win
Friends*) y la lista de la compra en español (*Cómo Ganar Amigos*). Son el mismo
libro y no puede haber dos fichas, así que el título alternativo se declara una vez
en `alias`. Cinco libros lo tienen.

Como módulo compartido, `ficha.css` **no da por hechos los tokens de la app**:
define los suyos con `var(--x, valor)`, que heredan del tema cuando existe y caen a
un valor propio cuando no. Coach solo define 3 de los 13 que hacían falta, y sin
esto el botón salía gris y con el icono relleno. Lo mismo con el precio: `ficha.js`
lo pide con `typeof lcPrecioOtros === 'function'`, porque esa función solo existe
en el dashboard.

### El kit de higiene y el cuidado de los ojos

`KIT_HIGIENE` (34 artículos en 7 grupos) y `CUIDADO_OJOS` (12 en 4). Hasta el
2026-09-02 esto eran **cadenas de texto sueltas** dentro de `LISTA_COMPRAS`: no
había ningún objeto detrás, así que no había dónde colgar una ficha. Ahora cada
artículo es un producto y las dos listas de la compra salen de aquí:

```js
CIFRAS.KIT_HIGIENE.todos            // los 34, sin agrupar
CIFRAS.KIT_HIGIENE.porGrupo         // {grupo: [texto, ...]} — lo que usa la compra
CIFRAS.CUIDADO_OJOS.deTextoCompra(t)  // del renglón al producto
```

Los dos van agrupados **por la situación, no por el tipo de producto**: en higiene
por bolsa (cuando armas la maleta lo que importa es qué meter en el neceser), y en
ojos por la causa («al volante», «pantalla»). En las fichas de ojos el nombre del
grupo hace de rótulo, porque el grupo ES la explicación.

El **precio no se escribe aquí**: vive en `LISTA_COMPRAS_PRECIOS_OTROS`, en el
dashboard, indexado por el texto del renglón. La ficha lo lee de ahí con
`lcPrecioOtros()`.

### La rutina de la piel

`RUTINA_PIEL` — los **5 productos** que Adán usa en la cara (más la mascarilla opcional), con
lo que hace falta para saber cuánto dura un bote y cuánto cuesta al mes. Se pide desde JS:

```js
CIFRAS.RUTINA_PIEL.pasos('am')        // [{orden, n, cat, uso, min, esperaDespues, ...}]
CIFRAS.RUTINA_PIEL.duracionDias(p)    // contenido / dosisDia
CIFRAS.RUTINA_PIEL.costoMes(p)        // precio / duracion * 30
CIFRAS.RUTINA_PIEL.costoMesTotal      // $806 hoy, sin contar la mascarilla
CIFRAS.RUTINA_PIEL.textoCompra(p)     // el renglón tal cual sale en la compra
CIFRAS.RUTINA_PIEL.deTextoCompra(txt) // y de vuelta: del renglón al producto
```

| Producto | Paso | Tamaño | Dura | Al mes |
|---|---|---|---|---|
| CeraVe Limpiador Espumoso (verde) | AM 1 y PM 1 | 236 ml | ~79 d | $99 |
| The Ordinary Niacinamida 10% + Zinc 1% | AM 2 | 30 ml | ~200 d | $35 |
| La Roche-Posay Anthelios Oil Free SPF50 | AM 3 | 50 ml | ~40 d | **$390** |
| Differin Adapaleno 0.1% Gel | PM 2 | 45 g | ~180 d | $72 |
| Eucerin Hyaluron-Filler + Epigenetic Noche | PM 3 | 50 ml | ~100 d | $210 |
| Aztec Secret Indian Healing Clay | opcional | 454 g | ~175 d | $50 |

**Cada producto trae una `ficha`** (2026-09-02). Hasta esa fecha las rutinas sabían
decir *cómo* se usa cada cosa — eso vive en `am.uso`/`pm.uso`/`uso` y sigue ahí —
pero no *qué es* ni *por qué sirve*. Ese hueco es la ficha, y la tienen los **68
artículos de las cinco categorías**: skincare, cabello, suplementos, kit de higiene
y cuidado de los ojos.

| Campo | Qué lleva |
|---|---|
| `activo` | el ingrediente que hace el trabajo |
| `que` | qué es el producto, en una línea |
| `hace` | qué le pasa a la piel, sin jerga |
| `sirve` | para qué le sirve a Adán en concreto |
| `tarda` | cuándo se nota, para no abandonarlo antes de tiempo |
| `ojo` | el error que arruina el producto |

El botón **«Qué es»** de cada renglón de la lista de la compra abre esa ficha, y el
dashboard **no guarda ni una línea de ese texto**: lo arma todo leyendo el maestro.
Se entra por el texto del renglón — lo único que la lista conoce — y
`deTextoCompra` lo deshace, que es el inverso exacto de `textoCompra`, con el que el
getter de esa categoría lo armó. Las cinco fuentes exponen ese mismo par, así que el
dashboard solo tiene que saber a quién preguntar:

| Categoría | Fuente | De dónde sale el «cómo se usa» |
|---|---|---|
| skincare | `RUTINA_PIEL` | `am.uso` / `pm.uso` / `extra.uso` — son dos rutinas |
| cabello | `RUTINA_PELO` | `uso`, con los días de `diasTexto(p)` |
| suplementos | `SUPLEMENTOS` | no hay `uso`: se arma con `dosis`, `cuando` y `momento` |
| higiene | `KIT_HIGIENE` | `uso` |
| ojos | `CUIDADO_OJOS` | `uso` |

Dos campos de la ficha pueden **no estar en la ficha**: los suplementos ya tenían
escritos `porQue` y `ojo` desde antes, y la ficha los lee de ahí. Escribirlos otra
vez sería crear el segundo sitio de siempre — el control 15 lo marca como error.
Lo mismo con el `aviso` del Avodart, que sale en su propia tarjeta.

**Las imágenes: 45 con foto y 23 dibujadas.** Las fotos van en `foto` y salen de
tres bases con licencia libre — Wikimedia Commons, Open Beauty Facts y Open Food
Facts — buscando con términos en inglés por producto. **Se eligieron mirándolas**,
en hojas de contacto, no por el nombre del resultado: buscar «Differin» devolvía un
limpiador de esa marca, «hair mask» devolvía fotografías de arqueología y «minoxidil»
devolvía un modelo 3D de la molécula. De 67 productos con candidatas, sobrevivieron
45 a la criba.

El criterio depende de cómo esté escrito el artículo, y de ahí sale lo que dice la
etiqueta de la esquina:

| | Nombre del artículo | Qué foto vale | Etiqueta |
|---|---|---|---|
| skincare, cabello | lleva **marca** («CeraVe Limpiador Espumoso») | solo el producto exacto | «Foto del producto» |
| higiene, ojos, suplementos | ya es **genérico** («Cortauñas de mano y de pie») | esa cosa, de cualquier marca | «Foto de referencia» |
| cualquiera, sin foto | — | ninguna servía | «Envase dibujado» |

Por eso skincare y cabello son los que peor salen (6 fotos de 16): sus nombres
llevan marca y casi ninguna marca comercial tiene foto libre. Higiene, en cambio,
tiene 29 de 34, porque un cortauñas es un cortauñas. Los 23 restantes siguen con su
silueta, que para eso está — y el dibujo es además el **respaldo** de las 45 fotos:
vienen de internet y las apps se abren con `file://`, así que sin red el `onerror`
cae al envase en vez de dejar un hueco.

Las de Wikimedia se guardan apuntando a `upload.wikimedia.org` y **sin query**. La
API las devuelve con host `thumb.wikimedia.org` y parámetros `utm_` pegados detrás;
ese host no es fiable y dejó 31 fotos rotas en el dashboard. No se vio al montar las
hojas de contacto — ahí a veces redirige — sino midiendo con una espera corta.

**El renglón en celular** se rehizo el 2026-09-02: el botón «Qué es» caía a **1 píxel**
por debajo del cuadro de marcar y alineado con él, así que parecían el mismo control, y
el nombre se cortaba a media palabra. Ahora el nombre se envuelve, la barra de botones
se alinea con el NOMBRE (32px) y hay 9px de aire. Los cuatro botones se reparten en dos
filas **a propósito**: con los nombres de tienda completos no caben en una sola ni en un
iPhone SE — medido, sobran 86px — y dejándolos partirse solos «Ya lo tengo» caía a una
segunda línea sin relación con nada. Arriba lo que haces con el producto, abajo dónde
comprarlo. El renglón pasa de 47px a 150px: caben 5 productos en pantalla en vez de 14
ilegibles.

Hay **19 siluetas** (`bomba`, `gotero`, `tubo`, `tarro`, `bote`, `botella`, `tela`,
`pastillas`, `caja`, `polvo`, `sobre`, `bolsa`, `barra`, `cepillo`, `utensilio`,
`aparato`, `pano`, `gafas`, `gotas`) y viven en `PF_FORMAS`, dentro de
`dashboard.html`. Cada producto elige la suya con `frasco` — se llamaba `envase`
hasta el 2026-09-02, pero en `SUPLEMENTOS` ese nombre ya significaba *cuántas
cápsulas trae el bote*, y un nombre no puede querer decir dos cosas.

**Los días y el costo NO se escriben**: salen de `contenido / dosisDia`. Por eso el protector se
lleva casi la mitad del gasto — dos dedos diarios, que es la dosis correcta, vacían un bote de
50 ml en 40 días. Los `precio` sí son constantes de referencia (farmacia y Amazon MX, sep 2026)
y se editan aquí.

`LISTA_COMPRAS.skincare` es un **getter sobre esta lista**, no una lista aparte: un producto por
necesidad y sin alternativas, la misma regla que ya tenía `cabello`.

**Nació el 2026-09-01 de una contradicción real**: los productos estaban escritos a mano en dos
sitios que no coincidían. `RUTINA_TASKS` aplicaba La Roche-Posay y la guía de Skincare
recomendaba Isdin; `RUTINA_TASKS` ponía el adapaleno las 7 noches y la guía mandaba alternarlo
con un BHA que él no usa en ninguna parte. Ningún control miraba texto de productos, así que
nadie lo vio. Ahora lo vigila el **control 11**.

### La rutina del cabello

`RUTINA_PELO` — los **10 productos** del pelo y, sobre todo, **la semana de lavado**: qué champú
toca cada día vive aquí y en ningún otro sitio. Se pide desde JS:

```js
CIFRAS.RUTINA_PELO.dia(2)             // martes -> {champu, condicional, nota, mascarilla, ...}
CIFRAS.RUTINA_PELO.duracionDias(p)    // contenido / (usos por semana / 7)
CIFRAS.RUTINA_PELO.costoMesTotal      // $2,854 hoy — el NR-11 y el Avodart son $2,400
```

| Producto | Cuándo | Tamaño | Dura | Al mes |
|---|---|---|---|---|
| Minoxidil 5% en ESPUMA (Kirkland) | todos los días, **2 veces** | 60 g | ~30 d | **$233** |
| Pilexil Anticaída 300 ml | lunes y jueves | 300 ml | ~88 d | $153 |
| CeraVe Champú Hidratante sin sulfatos | sábado, y miércoles al nadar | 355 ml | ~83 d | $108 |
| Darrow Doctar (alquitrán) | solo si hay caspa activa | 200 ml | — | — |
| L'Oréal Elvive Reparación Total 5 | todos menos sábado | 680 ml | ~53 d | $68 |
| Mascarilla L'Oréal Elvive Total Repair 5 | sábado | 300 ml | ~105 d | $37 |
| Crema sin enjuague L'Oréal Elvive Total Repair 5 | todos los días | 200 ml | ~67 d | $49 |
| Moroccanoil Treatment Light | cuando lo note áspero | 100 ml | ~700 d | $39 |
| Funda de almohada de satín | una sola vez | — | — | — |

`dias` es **0=domingo…6=sábado**, y `diasCondicionales` marca los que dependen de algo: el
CeraVe del miércoles no va en la ducha de la mañana sino al salir de la alberca. El control 12
lo tiene en cuenta al comparar días.

`LISTA_COMPRAS.cabello` es un **getter sobre esta lista**, con los días incluidos, más los 2
tratamientos de receta al final — que no son de mostrador y no forman parte de la rutina.

### Los suplementos y el chequeo médico

`SUPLEMENTOS` — los **6** que toma de verdad, con dosis, momento y tamaño de envase. Estaban
escritos a mano en TRES sitios (las subtareas de `RUTINA_TASKS`, `LISTA_COMPRAS.suplementos` y
el catálogo de `salud.html`) y coincidían de casualidad.

| Suplemento | Momento | Dosis | Envase | Dura | Al mes |
|---|---|---|---|---|---|
| Vitamina D3 | AM | 2000-4000 UI | 120 cáps | ~120 d | $55 |
| Multivitamínico | AM | 1 tableta | 90 tabs | ~90 d | $117 |
| Omega 3 | AM | 1-2 g EPA+DHA | 120 cáps | ~60 d | $225 |
| Creatina monohidratada | AM | 5 g | 300 g | ~60 d | $200 |
| Magnesio (glicinato) | PM | 200-400 mg | 120 cáps | ~60 d | $200 |
| Proteína Whey | PM | 25-30 g, 4 días/sem | 2000 g | ~117 d | $333 |

**$1,130 al mes** — más que el gimnasio y el plan de datos juntos. `LISTA_COMPRAS.suplementos`
es un getter sobre esta lista.

`CHEQUEO` — los **9 análisis** que le tocan y por qué. Varios entran por algo que ya está en el
proyecto: la vitamina D porque toma D3 a diario, la creatinina porque toma creatina (**la sube en
sangre sin daño renal**), el tiroideo porque la caída de cabello lo pide descartar, y el PSA
porque **toma dutasterida (Avodart) desde el 1-sep-2026 y eso parte su valor a la mitad** — dejó
de ser opcional y de tener `desdeEdad`. `desdeEdad` desactiva un examen hasta esa edad;
`mesesVigencia` es cada cuánto se repite.

### El calendario · constantes

`CALENDARIO` — lo que el calendario del Dashboard necesita y **no puede derivar solo**. Se pide
desde JS, no es un marcador:

```js
CIFRAS.CALENDARIO.cobros   // [{dia, txt, monto, entra?}] — los días fijos del mes
CIFRAS.CALENDARIO.hitos    // [{fecha, txt, sub}] — fechas duras que no salen de ningún otro dato
```

| | Qué trae | De dónde sale el número |
|---|---|---|
| `cobros` | Renta día 1, plan AT&T día 1, quincena días 1 y 15, CETES día 15, gym día 17 | El **monto** es un getter sobre `PROYECTO`: si sube la renta o vuelve a cambiar el gimnasio, el calendario se entera solo. El **día** vive aquí — hasta el 26-ago-2026 solo existía como comentario al lado de la cifra, o sea que ninguna app podía leerlo. |
| `hitos` | Decisión Maestría (18 jul 2027) y arranque de la Maestría (1 oct 2028) | `PROYECTO.maestriaPausa` y `PROYECTO.maestriaInicio`. |

**Regla al agregar: si una fecha se puede derivar de un dato que ya existe, NO va aquí.** Por eso
esta lista es corta. El Dashboard calcula en vivo, y no están escritos en ningún lado:

- los **cierres y arranques de fase** → de `PHASES[].start` / `.end`;
- la **última cuota de cada MSI vivo** → de `balance / min` sobre las deudas de Finanzas, con el
  día del cargo en `day` (los MSI con `day: 0`, como el iPhone, no se inventan: no salen);
- el **trabajo sin cerrar detrás de cada hito** → de `PHASES[].semanas` contra `coach_checks_v1`;
- el **ritmo requerido** ($/día para cerrar el fondo antes de que acabe la fase) → del fondo de
  emergencia real de `finanzasmx_v2` contra `fondoMeta`.

Es lo que evita que el calendario se congele como se congeló la vieja barra de metas.

---

## Quién carga qué

| App | Cómo lo carga | Para qué |
|---|---|---|
| `Dashboard/dashboard.html` | `<script src="datos-maestros.js">` | Prosa del Plan Maestro (`cifrarLiterales`) |
| `Coach/Coach.html` | `<script src="../Dashboard/datos-maestros.js">` | Hallazgos, tabla de deudas, checklists (`aplicarDOM`) |
| `Finanzas/Finanzas.html` | `<script src="../Dashboard/datos-maestros.js">` | **Es la fuente**: `seedData()` lee `CIFRAS.DEUDAS_SEED` |
| `CuidadoPersonal/cuidadopersonal.html` | `<script src="../Dashboard/datos-maestros.js">` | Skincare y Cabello: `CIFRAS.RUTINA_PIEL`, `CIFRAS.RUTINA_PELO` y las horas desde `CIFRAS.rutina()` |
| `CuidadoPersonal/salud.html` | `<script src="../Dashboard/datos-maestros.js">` | `CIFRAS.SUPLEMENTOS` (siembra la lista y el botiquín) y `CIFRAS.CHEQUEO` |

El Dashboard es donde vive el archivo porque es el centro del proyecto, y ahí ya estaban
`aleman-data.js` y `entrevistas-data.js`.

---

## Migraciones: cómo se corrige un saldo

Cuando Adán reporta un saldo nuevo, se añade una entrada a `MIGRACIONES` en `datos-maestros.js`.
Corre **una sola vez** (bandera propia en localStorage) y nunca revierte un cambio hecho a mano.

Antes había que escribir cada migración **dos veces** —en `Finanzas.html` y como espejo en
`dashboard.html`— porque cualquiera de las dos puede ser la primera app que se abra. Coach no
sabía migrar y por eso enseñaba saldos viejos. Ahora se escribe una vez y la ven las tres.

Las migraciones anteriores a esa fecha (`_banamex9k`, `_pagos20260813`, `_msibbva20260813`,
`_ahorro20260817`) siguen en sus archivos: ya corrieron y tienen bandera, son inertes.

---

## Mapa de apps

| Carpeta | Archivo | Qué es | Su `localStorage` |
|---|---|---|---|
| `Dashboard/` | `dashboard.html` | Panel central, "Mi Día" en vivo, agrega todo | *(solo lee, salvo checks de Coach)* |
| `Coach/` | `Coach.html` | Plan Maestro, rutina, radar de habilidades | `coach_rutina_v1`, `coach_checks_v1`, `radarp_*` |
| `Finanzas/` | `Finanzas.html` | Finanzas reales, GBM, BTC, deudas | `finanzasmx_v2` |
| `CuidadoPersonal/` | `cuidadopersonal.html` + `salud`/`ejercicio`/`comida` | Shell con 7 subtabs | `skincare_v1`, `misalud_v1`, `mirutina_v1`, `comida_v1` |
| `Vestimenta/` | `vestimenta.html` | Guardarropa y compras | `vestimenta_v1` |
| `Aleman/` | 35+ páginas | Estudio A1/A2, sin datos | — |
| `Entrevistas/` | `index.html` + `js/data-*.js` | Prep. técnica automotriz, 229 temas | `theme` |

Detalle por app en su propio `.md` (`readme_dashboard.md`, `readme_finanzas.md`, …). Este índice
es el punto de entrada; esos son la historia larga de cada cambio.

---

## Una variable nunca cambia sola

Cambiar `gym` mueve también `suscripciones`, `fijosTotal` y `margen`. Los cálculos se ajustan
solos porque son getters; **lo que se queda atrás son las tablas de los `.md`**, que llevan el
número escrito. Por eso el mapa es explícito y comprobado.

```bash
node -e "require('./Dashboard/datos-maestros.js'); console.log(window.CIFRAS.impacto('gym'))"
# → [ 'suscripciones', 'fijosTotal', 'margen' ]
```

| Si tocas… | se mueven |
|---|---|
| `sueldo`, `didiMes`, `siVale` | `ingresoTotal` → `margen` |
| `celular`, `internet`, `gas`, `gasCadaMeses`, `luzAgua` | `servicios` → `fijosTotal` → `margen` |
| `gym`, `claudeCode`, `icloud` | `suscripciones` → `fijosTotal` → `margen` |
| `renta` | `fijosTotal` → `margen` |
| el saldo o el mínimo de cualquier deuda | `deudaTotal`, `deudaCara`, `deudaMsi`, `minimosDeuda` → `margen` |
| `autoSaldo`, `autoPago`, `autoMeses` | `autoAPagar`, `autoInteres` |

Cada derivada declara su `dep: [...]` en `CLAVES`. **El grafo no se cree: se mide.** El control 6
perturba cada constante, observa qué se movió de verdad y lo compara con lo declarado — así una
dependencia que alguien olvide declarar al añadir una fórmula salta en el momento.

`CIFRAS.impacto(clave)` da la lista; `CIFRAS.grafo()` el mapa completo (20 variables arrastran a
otras hoy).

**El hook lo dice solo.** Al terminar el turno, si `datos-maestros.js` cambió respecto al último
commit, compara los valores de antes y ahora y separa lo que editaste de lo que se movió contigo:

```
CAMBIÓ UNA VARIABLE MAESTRA

  editada:  gym  $650 → $800

  se movieron con ella:
    suscripciones  $1,080 → $1,230
    fijosTotal  $13,344 → $13,494
    margen  $30,081 → $29,931
```

---

## Comprobar que todo sigue sincronizado

```bash
node Dashboard/verificar-sincronia.js      # desde Claude_Proyecto/
```

Compara **evaluando los literales** de cada HTML, no leyéndolos a ojo, y dice qué campo de qué
entrada difiere. Sale con código 1 si algo está roto, así que vale tal cual para un hook.

Qué revisa:

- Que **nadie haya vuelto a incrustar** ninguna de las seis estructuras en un HTML en vez de
  leerla del maestro. Es la guardia de la Regla 1.
- `GYM_RUTINA_DEFAULT` contra `ejercicio.html`, que sigue siendo un respaldo duplicado.
- Que las fases y las prioridades del maestro aparezcan en el HTML de Coach.
- Las cifras que ya tienen variable pero siguen escritas a mano.
- **Los números del maestro escritos crudos en el código** (sin `$`), que era el punto ciego: así
  se descubrió que el gimnasio tenía dos precios a la vez en Finanzas. Acepta dos patrones
  legítimos: `dato || 500000` (fallback, solo se usa si no hay dato) y las asignaciones dentro de
  una migración (`balance = 1708` es una foto histórica, no una copia).
- **Que el mapa de dependencias declarado coincida con el real**, midiéndolo por perturbación.
- **Que los valores citados en los `.md`** coincidan con el maestro, con archivo y línea. Este es
  el que faltaba: los getters se recalculan solos, las tablas de la documentación no.
- Los `{{marcadores}}` que no existan en el catálogo.
- **La FORMA de los datos, no solo sus importes** (control 9). Los ocho anteriores vigilan que
  los números coincidan entre sitios; ninguno miraba si el dato tiene sentido en sí mismo. Aquí
  se exige día de pago a toda deuda con saldo y mínimo, tipos correctos en cada campo, fechas
  reales, `balance <= total`, ids únicos, cobros dentro de 1-28, fases sin huecos ni solapes, y
  que las sumas de `PROYECTO` cuadren con sus partes.
- **La tabla de días de pago del `.md` contra el maestro** (control 10), fila a fila. El control 7
  compara importes y por eso no veía un día: 14 no es una cantidad de dinero.

- **Que los productos de `RUTINA_PIEL` sigan nombrados en `RUTINA_TASKS`** (control 11). Los diez
  anteriores miran números y estructura; ninguno miraba **texto de productos**, y por ahí se coló
  que la guía de Skincare recomendara una marca de protector solar y la rutina diaria otra. Si
  alguien cambia de producto en un sitio y no en el otro, sale aquí.

- **Lo mismo para `RUTINA_PELO`, y además el DÍA** (control 12). La semana de lavado vive en
  `RUTINA_PELO.productos[].dias` y las tareas que la ejecutan están repartidas por día, así que
  pueden separarse sin que cambie ninguna cifra. Compara sin distinguir mayúsculas — "crema sin
  enjuague X" y "Crema sin enjuague X" son el mismo producto — y busca por el nombre completo,
  porque "CeraVe" a secas también casa con el limpiador facial de Skincare.

- **Lo mismo para `SUPLEMENTOS`, y además el MOMENTO** (control 13). Los de la mañana tienen que
  aparecer en una subtarea de la rutina de la mañana y los de la noche en una de la noche: mover
  el magnesio a la mañana en un sitio y no en el otro no mueve ninguna cifra.

Los dos últimos nacieron el 28-ago-2026, del `day` del auto. Un `day` equivocado no mueve ninguna
cifra, así que ningún control anterior podía verlo. El 9 encontró de paso un segundo caso que
llevaba meses: el iPhone, con `day: 0`, no aparecía en ninguna fecha del calendario.

Los valores **no están escritos en el verificador**: los pide al maestro. Tenerlos a mano era el
mismo fallo que persigue — con `$292,000` en su lista seguía vigilando el saldo viejo.

Lleva una lista de **excepciones documentadas**: números que coinciden con una variable pero
significan otra cosa (el precio de un servicio, el ahorro en un boleto de avión, la meta de la
maestría *antes* de reagendarse). Cada una con su razón. Un aviso que nunca se puede cerrar acaba
ignorándose, y entonces el verificador deja de servir.

**Un hook `Stop` lo corre solo** al final de cada turno, con `--hook`: solo habla cuando encuentra
un problema. Un verificador que saluda cuando todo está bien se vuelve ruido y se acaba ignorando.

**La primera vez que se corrió encontró 7 textos** de la rutina de cabello mejorados en Coach el
2026-08-18 (commit `0ef03b4`, *"Explica qué ES una mascarilla capilar"*) que nunca se replicaron
al Dashboard: 6 días divergentes sin que nadie lo notara.

---

## Lo que todavía está duplicado

Ya no queda ninguna estructura copiada entre archivos. Las seis viven aquí:

| Estructura | Qué es | Cómo se lee |
|---|---|---|
| `DEUDAS_SEED` | Punto de partida de las deudas | `CIFRAS.DEUDAS_SEED` |
| `RUTINA_TASKS` | 58 bloques del horario | `CIFRAS.rutina(base)` |
| `SK` | 12 habilidades del radar | `CIFRAS.SK` |
| `PHASES` | 4 fases del Plan Maestro | `CIFRAS.PHASES` |
| `APRENDIZAJE` | 6 prioridades de aprendizaje | `CIFRAS.APRENDIZAJE` |
| `LISTA_COMPRAS` | Catálogo de compras por pasillos — 7 categorías; `comida` en 7 pasillos, con `Verduras` / `Frutas` / `Almidones y grasas` separados para medir la proporción del canasto | `CIFRAS.LISTA_COMPRAS` |

`verificar-sincronia.js` vigila que **ninguna vuelva a incrustarse** en un HTML.

### Los dos casos que no son literal contra literal

No todo era una copia que se pudiera mover, y conviene saber por qué siguen necesitando cuidado:

- **`GYM_RUTINA_DEFAULT`** es solo el respaldo para un navegador que nunca abrió `ejercicio.html`;
  esa app guarda la rutina real en su propio `localStorage` y gana sobre este literal. El
  verificador compara los 7 días.
- **El texto de `PHASES` y `APRENDIZAJE` en Coach** está escrito como HTML a mano en sus
  secciones, no generado desde el literal. Convertirlo exigiría rediseñar esas secciones. El
  verificador comprueba que las fases y las prioridades del maestro aparezcan ahí, y las cifras
  que contienen ya usan `{{marcadores}}`.
- **`LISTA_COMPRAS`** se armó cruzando `RECETAS` de comida.html, `SKIN_DB`/`HAIR_DB` de
  cuidadopersonal.html y `SUPP_CATALOG` de salud.html: tres estructuras distintas, así que no se
  puede derivar en vivo. Vive aquí para tener un solo sitio donde editarlo.

### El recetario

`RECETARIO` — las **24 recetas** (12 desayunos, 12 cenas) con sus ingredientes,
pasos, macros y el tip de cada una. Cada ingrediente declara `{n, c, p}`: nombre,
cantidad y **pasillo del súper**.

```js
CIFRAS.RECETARIO.desayuno            // 12
CIFRAS.RECETARIO.todas               // 24
CIFRAS.RECETARIO.porPasillo          // {Verduras:[…], Frutas:[…], …}
CIFRAS.LISTA_COMPRAS.comida          // === porPasillo
```

**`LISTA_COMPRAS.comida` se deriva de aquí.** Hasta el 2026-09-01 el recetario
vivía en `comida.html` y la lista estaba escrita a mano en este archivo; el
comentario de ese HTML lo admitía: *"si se agrega o quita una receta, hay que
replicar el cambio allá a mano"*. Coincidían de casualidad (30 ingredientes, 0
diferencias medidas) y se rompían al primer cambio. Ahora agregar una receta
agrega sus ingredientes a la compra sin tocar nada más.

Lo que no entra en una receta: café, picante, cítricos en exceso, chocolate,
frituras y cebolla/ajo **crudos** (le disparan el reflujo; cocidos sí van), y los
que no le gustan — calabaza, ejotes, hierbas de olor, camote,
espinaca, pavo molido, leche de avena, crema de cacahuate, caldo de
pollo y avena en hojuelas. El **control 14** del verificador comprueba que cada
receta esté completa (ingredientes con pasillo y cantidad, pasos, macros, ids
únicos) y que la lista siga siendo la derivada y no una copia.

El **control 15** hace lo propio con las fichas de las **cinco categorías** (68
artículos): que ninguno se quede sin `ficha` o con un campo corto, que traiga con
qué dibujarse cuando no hay foto, que tenga de dónde sacar el «cómo se usa», que
no repita en la ficha lo que el producto ya trae escrito, y que
`deTextoCompra(textoCompra(p))` devuelva el mismo producto. Esa última es la que
importa: si dejan de ser inversas, el botón «Qué es» no encuentra nada y al
pulsarlo no pasa **nada** — sin error en consola, sin señal de ningún tipo.

El **control 16** hace lo mismo con los 44 libros, aparte porque sus campos son otros, y añade lo que un producto no tiene: año y páginas plausibles, y que la portada sea de Open Library o haya con qué dibujar el libro. Probado rompiendo el maestro de cuatro formas, incluida la que ocurrió de verdad.

El umbral de longitud va **por campo**: `que`, `hace`, `sirve` y `ojo` tienen que
explicar algo y se les exigen 20 caracteres; `activo` y `tarda` pueden ser correctos
y muy cortos («Inmediato.», «1-2 horas.») y se quedan en 6. La única excepción
declarada es el renglón del minoxidil ORAL en cabello: no es un producto de
mostrador, no tiene ficha y no debe tener botón.
