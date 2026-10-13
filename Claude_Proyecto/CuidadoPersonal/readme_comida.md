# comida.html — Mi Comida: Recetario & Plan Masa Muscular

App de una sola página (HTML+CSS+JS, sin backend): el recetario de **18 desayunos y 18 cenas
sencillos** a la medida de Adán, con buscador, filtros y la ficha de cada receta; y el **Plan Masa
Muscular**.
Es el centro de nutrición del proyecto: lo que registra aquí lo leen Salud y el Dashboard.

**Su prompt**: la clave `comida` de [`prompts-paginas.js`](../Dashboard/prompts-paginas.js) —el icono de la brújula, arriba a la izquierda—. Es el especialista que gobierna cada cambio de esta página (`CLAUDE.md` → Regla 6).

> Referencia, no diario. Historial en `git log -p -- Claude_Proyecto/CuidadoPersonal/comida.html`.

Vive en `CuidadoPersonal/comida.html`. Se abre incrustada en `cuidadopersonal.html` (pestaña
**Comida**, `?embed=1` con `embed.js` y la cabecera común de `cabecera.js`) o directa. Carga
`../Dashboard/datos-maestros.js` y `vidrio.css`.

**Solo desayuno y cena**: la comida de mediodía Adán la resuelve aparte, y el bloque *Proteína*
de arriba lo dice al abrir. El Plan Masa Muscular sí incluye la comida de mediodía.

Arriba, las reglas del recetario en cuatro bloques con su etiqueta (`.ctx-reglas`): *Sencillas*,
*Proteína* (con `{{proteinaMeta}}`), *Sin agruras* y *Sin lo que no te gusta*.

## Secciones

`SECS = ['desayunos','cenas','rutina']`, títulos en `STITLE`. Deep-link **`?s=<id>`** → `nav(s)`
(Coach y el Dashboard enlazan `comida.html?s=cenas` desde la rutina); un valor desconocido cae al
default sin romper nada. No hay `RENDERS`: `nav()` solo cambia de vista. El renglón "🛒 Lista del
Súper" del menú es un **enlace al Dashboard** (↗): la lista vive solo allá.

| id | Pestaña | Qué hay |
|---|---|---|
| `desayunos` | 🌅 Desayunos | 12 tarjetas de receta |
| `cenas` | 🌙 Cenas | 12 tarjetas de receta |
| `rutina` | 🥩 Plan Masa Muscular | Perfil (`.pm-hero`: peso, estatura y objetivo de `CIFRAS.PESO`, edad de `nacimiento`), 4 KPI con las metas del maestro (`kcalMeta`, `proteinaMeta`, `carbsMeta`, `grasaMeta`), desglose desayuno/comida/cena con tabla de alimentos (`PLAN_ITEMS`; los totales de cada comida se suman de ahí y las horas de la comida y la cena salen de la rutina), alimentos de bajo presupuesto por categoría y 6 tips. Nada de lo que no le gusta. Cada comida se registra con un botón (`registrarRutinaMeal`) |

## El recetario vive en el maestro

`const RECETAS = CIFRAS.RECETARIO` — `datos-maestros.js` tiene las 36 recetas (`desayuno`, `cena`,
`todas`, `porPasillo`), **cada ingrediente declara su pasillo y `LISTA_COMPRAS.comida` es un
getter sobre ellos**: agregar una receta agrega sus ingredientes a la compra del Dashboard sin
tocar nada más. El **control 14** del verificador lo vigila (recetas completas, ids únicos, lista
derivada). `CATEGORIA_ING`/`ORDEN_CAT` quedan aquí solo como clasificación de referencia.

**Sencillas** (Adán pidió *"comidas más sencillas"*): **4 ingredientes o menos, 3 pasos y 15
minutos** como máximo, con **30 g de proteína o más en el desayuno y 40 g o más en la cena**. Todas
salen de los mismos 25 productos de la lista del súper, así que el presupuesto de comida no se mueve.
La cena se cocina doble —la mitad es la comida del día siguiente, como dice la rutina de las 21:15—;
el domingo es de Didi y ninguna receta depende de cocinar ese día. Los macros se calculan con una
tabla por ingrediente, no a ojo. El control 14 exige todo esto, y que las kcal cuadren con
4·proteína + 4·carbohidratos + 9·grasa (±15 %).

**Por qué estas recetas**: se eligieron cruzando lo que el proyecto ya sabe de Adán —

1. **Reflujo** (`salud.html` → Digestión): sin café, picante, cítricos en exceso, chocolate,
   frituras, refresco, menta ni cebolla/ajo **crudos** (cocidos sí); cocciones suaves (plancha,
   vapor, horno, sartén). El `tip` de cada receta lo explica.
2. **Los 12 ingredientes que no le gustan**: calabaza, ejotes, hierbas de olor, brócoli, camote,
   espinaca, zanahoria, pavo molido, leche de avena, crema de cacahuate, caldo de pollo y avena en
   hojuelas — ninguno aparece. La granola de amaranto sustituye a la avena como base de cereal.
3. **La meta de masa muscular**: ~3 115 kcal y `{{proteinaMeta}}` g de proteína al día
   (`CIFRAS.texto()`); desayuno + cena cubren una parte sustancial y el resto es la comida de
   mediodía.

Cada receta: tiempo, macros, ingredientes con cantidad, pasos, tip y **una foto real del
platillo** en `fotos-comida/` (800 px): fotografía de estudio de StockSnap y Rawpixel (vía Openverse),
bien iluminada y de cerca, y unas pocas de Flickr y Wikimedia Commons donde no había mejor. En el maestro, `foto` es
la ruta relativa a esta carpeta y `fotoCredito` lleva el autor, la fuente y la licencia: sale en el
`title` de la tarjeta y arriba a la izquierda de la ficha (`.rf-cred`). Cada `<img>` lleva
`onerror` con respaldo dibujado.

## Encontrarlas, elegirlas, cocinarlas

- **La tarjeta es la foto** (248 px de alto) con tiempo, kcal y proteína: lo que decide si la
  haces hoy. Van en 6 columnas a partir de 1500 px, y en 3, 2 o 1 más abajo: con 18 recetas por
  sección nunca queda una fila a medias.
- **Buscador y filtros**: por texto —nombre **o ingrediente**— y por proteína y tiempo. Como todo
  desayuno ya pasa de 30 g y de 10 minutos, los umbrales van por comida (`RC_UMBRAL`: desayuno 35 g y
  5 min; cena 55 g y 10 min) y las etiquetas de los botones salen de ahí.
- **El ✓ marca "voy a cocinar esta"** → `comida_v1.elegidas`. Arriba aparece **Lo que vas a
  cocinar** con los ingredientes de las marcadas **agrupados por pasillo** (el orden del súper),
  con `×2` si sale en dos; la cabecera común (`cpCabecera`) cuenta las marcadas.
- **La ficha** (`.rf-fondo`, `rcCerrarFicha()`; cierra con ✕, fuera o Escape): foto a sangre,
  4 macros, ingredientes, preparación paso a paso y tip. Dos botones: **Registrar hoy**
  (`registrarReceta(id,tipo)` → `misalud_v1.alimentos`) y **A la compra** (marca la receta y
  lleva a la Lista del Súper del Dashboard). Es la única ventana de la app: no hay modales ni
  diálogos de confirmación.

**Registrar dos veces pregunta antes**: `registrarReceta` y `registrarRutinaMeal` comprueban si
ya existe un registro con el mismo `nombre`+`fecha`+`comida` (o la misma nota del Plan) y piden
`confirm()`; un doble tap en iPad no infla las calorías del día.

## Modelo de datos

- **`localStorage['comida_v1']`** (propio): `{ elegidas: ['d1','c5',…] }`. Claves viejas que un
  navegador pueda tener (`comprado`, `planSemana`) no se borran; nadie las lee.
- **`localStorage['misalud_v1']`** (de `salud.html`): esta app **escribe** `alimentos` con
  `readSalud()`/`writeSalud()` (leen y escriben el objeto completo con default seguro, como
  `rawGet`/`rawSet` del Dashboard) y lee `metas`. Forma de cada alimento:
  `{ id, fecha:'YYYY-MM-DD', comida:'desayuno|almuerzo|cena|snack', nombre, cantidad, unidad, cal, prot, carbs, gra, notas }`.
  No hay pantalla en el proyecto que edite o borre un alimento a mano; el Dashboard y Salud lo
  leen para las calorías y la proteína del día.

`RECETAS` y `PLAN_ITEMS` son contenido de referencia, no se guardan.

## Diseño y tema

Superficies con `--surface`/`--surface-2`/`--surface-3` y el truco `--ov`; tarjetas con acento por
tipo (`.t-desayuno` dorado, `.t-cena` azul). Tema con `.theme-toggle-btn`; el enlace al Dashboard
(`#btnVolverDash`, 🚀) es otro botón de esa clase. Sin gráficas.

**`vidrio.css` no toca el `position` de nadie**: tenía `body > * {position:relative}` para que el
contenido quedara sobre las auroras y eso pisaba el `position:fixed` de cualquier modal (la ficha
se abría dentro del flujo). La aurora va detrás con `z-index:-1`; vale para toda la suite.

## Responsivo

- **A todo el ancho**: `.content` no tiene tope, como Salud y Ejercicio. Con el tope de 1200 px
  el recetario dejaba vacío el tercio derecho de una pantalla de 2048.
- **iPad vertical (641–1100 px)**: la barra lateral baja a **190 px** (sigue visible: en una
  tablet un menú escondido no ayuda) y las recetas van en 3 o 2 columnas.
- `900px`: `.g4`/`.g3` a 2 columnas, `.pm-hero` a 2×2. `640px`: sidebar overlay, todo a una
  columna; la barra de filtros se apila y los filtros se deslizan.
- **`.main{min-width:0}`** y **`.g4>*,.g3>*,.g2>*,.fr>*,.recetas-grid>*,.pm-hero>*{min-width:0}`** +
  `canvas{max-width:100%}`: sin eso las tablas con `nowrap` del Plan empujaban el documento fuera
  del viewport (misma trampa de flex/grid que `salud.html`).

Se verifica a 2048, 1600, 1024 y 390 px: 36 tarjetas con su foto y su crédito, columnas sin
filas a medias, ficha fija que cabe en pantalla, filtros, cero desborde y cero errores.

## Referencias cruzadas

- El shell la incrusta y arma sus subpestañas leyendo los `.nav-item` de aquí vía `embed.js`
  (`readme_cuidadopersonal.md`): quitar una sección del carril la quita del shell sola.
- Si cambia la forma de `alimentos` en `salud.html`, revisar `readSalud()`/`writeSalud()`,
  `registrarReceta` y `registrarRutinaMeal`. El Dashboard no lee `comida_v1`.
- La Lista del Súper y `RECETAS_MINI` del Dashboard salen del mismo `RECETARIO`.
- Mapa completo: [`../README.md`](../README.md).

## Cómo usarlo

`cuidadopersonal.html` → Comida, o `comida.html` directo. Sin instalación ni servidor. No hay
exportación propia: `alimentos` se respalda con el JSON de `salud.html`.
