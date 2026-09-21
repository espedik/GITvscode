# comida.html — Mi Comida: Recetario & Plan Masa Muscular

App de una sola página (HTML+CSS+JS, sin backend): el recetario de **12 desayunos y 12 cenas** a
la medida de Adán, con buscador, filtros y la ficha de cada receta; y el **Plan Masa Muscular**.
Es el centro de nutrición del proyecto: lo que registra aquí lo leen Salud y el Dashboard.

> Referencia, no diario. Historial en `git log -p -- Claude_Proyecto/CuidadoPersonal/comida.html`.

Vive en `CuidadoPersonal/comida.html`. Se abre incrustada en `cuidadopersonal.html` (pestaña
**Comida**, `?embed=1` con `embed.js` y la cabecera común de `cabecera.js`) o directa. Carga
`../Dashboard/datos-maestros.js` y `vidrio.css`.

**Solo desayuno y cena**: la comida de mediodía Adán la resuelve aparte, y el banner lo dice al
abrir. El Plan Masa Muscular sí incluye la comida de mediodía.

## Secciones

`SECS = ['desayunos','cenas','rutina']`, títulos en `STITLE`. Deep-link **`?s=<id>`** → `nav(s)`
(Coach y el Dashboard enlazan `comida.html?s=cenas` desde la rutina); un valor desconocido cae al
default sin romper nada. No hay `RENDERS`: `nav()` solo cambia de vista. El renglón "🛒 Lista del
Súper" del menú es un **enlace al Dashboard** (↗): la lista vive solo allá.

| id | Pestaña | Qué hay |
|---|---|---|
| `desayunos` | 🌅 Desayunos | 12 tarjetas de receta |
| `cenas` | 🌙 Cenas | 12 tarjetas de receta |
| `rutina` | 🥩 Plan Masa Muscular | Perfil (`.pm-hero`: peso/estatura/edad/objetivo), 4 KPI de macros objetivo, desglose desayuno/comida/cena con tabla de alimentos (`PLAN_ITEMS`), alimentos de bajo presupuesto por categoría y 6 tips. Cada comida se registra con un botón (`registrarRutinaMeal`) |

## El recetario vive en el maestro

`const RECETAS = CIFRAS.RECETARIO` — `datos-maestros.js` tiene las 24 recetas (`desayuno`, `cena`,
`todas`, `porPasillo`), **cada ingrediente declara su pasillo y `LISTA_COMPRAS.comida` es un
getter sobre ellos**: agregar una receta agrega sus ingredientes a la compra del Dashboard sin
tocar nada más. El **control 14** del verificador lo vigila (recetas completas, ids únicos, lista
derivada). `CATEGORIA_ING`/`ORDEN_CAT` quedan aquí solo como clasificación de referencia.

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

Cada receta: tiempo, macros, ingredientes con cantidad, pasos, tip y **foto de Wikimedia
Commons** (las 24, en el maestro junto a su receta; verificadas cargándolas en un navegador —
comprobarlas en serie con `fetch` da 429). Cada `<img>` lleva `onerror` con respaldo dibujado.

## Encontrarlas, elegirlas, cocinarlas

- **La tarjeta es la foto** (214 px; 4 por fila en el shell, 1 en móvil) con tiempo, kcal y
  proteína: lo que decide si la haces hoy.
- **Buscador y filtros**: por texto —nombre **o ingrediente**— y por lo que de verdad decide una
  cena: **30 g+ de proteína** y **10 min o menos**.
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

- **iPad vertical (641–1100 px)**: la barra lateral baja a **190 px** (sigue visible: en una
  tablet un menú escondido no ayuda) y `.recetas-grid` pide 250 px en vez de 300 → 2 columnas de
  291 px en 820 px. Sin este bloque el iPad tenía una sola columna y un tercio en blanco.
- `900px`: `.g4`/`.g3` a 2 columnas, `.pm-hero` a 2×2. `640px`: sidebar overlay, todo a una
  columna; la barra de filtros se apila y los filtros se deslizan.
- **`.main{min-width:0}`** y **`.g4>*,.g3>*,.g2>*,.fr>*,.recetas-grid>*,.pm-hero>*{min-width:0}`** +
  `canvas{max-width:100%}`: sin eso las tablas con `nowrap` del Plan empujaban el documento fuera
  del viewport (misma trampa de flex/grid que `salud.html`).

Se verifica a 1500 y 390 px en los dos temas: 24 tarjetas, ficha fija que cabe en pantalla,
filtros y panel de "lo que vas a cocinar", contraste sin nada bajo el mínimo, cero errores.

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
