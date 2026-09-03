# Aleman/ — referencia

41 lecciones de alemán en HTML, sin backend ni build. Se abren con `file://` y el Dashboard las
consumió a través de `../Dashboard/aleman-data.js` hasta el 2026-09-02. Desde entonces la
pantalla de Alemán del Dashboard es vocabulario y Partizip, **y lo carga de aquí**: los
datos, el diseño y el motor viven en esta carpeta y esa pantalla los refleja.

> **Referencia, no diario.** El historial vive en `git log -p -- Claude_Proyecto/Aleman/`.
> Ver `../../CLAUDE.md` → Regla 3.

---

## Estructura

| Grupo | Archivos | Qué es |
|---|---|---|
| **Kapitel 10** | `k10-01`…`k10-06` | Lo que Adán cursa en Cenlex Santo Tomás desde el 25-ago-2026 |
| A1 | `a1-01`…`a1-15` | Base: saludos, números, artículos, hora, profesiones… |
| A2 | `a2-01`…`a2-20` | Gramática y vocabulario temático |
| Apoyo | `index.html`, `gramatica.html`, `vocabulario.html` | Índice y referencia transversal |
| Compartido | `styles.css`, `flashcards.js`, `k10.css`, `partizip.css`, `k10-interactivo.js` | Estilos y motores |
| **Vocabulario** | `vocab-datos.js`, `vocab.css`, `vocab.js` | Los datos, el diseño y el motor. Los carga también el Dashboard — ver abajo |

---

## `vocabulario.html` — donde se trabaja el vocabulario

Es la pantalla principal del vocabulario: **aquí se añade y se corrige**, y la pantalla de
Alemán del Dashboard lo refleja. Cuatro pestañas:

| Pestaña | Qué es |
|---|---|
| 📖 Diccionario | Las 538 palabras en tarjetas, agrupadas por subsección |
| 🗨️ Frases por situación | 60 frases listas para usar, escritas en este archivo |
| 🎴 Tarjetas | Repaso con `flashcards.js` |
| 🧩 Partizip I y II | El tema de gramática, en 9 bloques |

**Nada de esto está dentro del HTML.** El vocabulario son tres archivos de esta carpeta,
y los tres los carga también la pantalla de Alemán del Dashboard:

| Archivo | Qué es | Cuándo se toca |
|---|---|---|
| `vocab-datos.js` | Las 538 palabras en 22 secciones y **108 subsecciones**, más el Partizip | Al añadir o corregir vocabulario |
| `vocab.css` | El diseño: la tarjeta, la rejilla, la tira de secciones, el Partizip | Al cambiar cómo se ve |
| `vocab.js` | El motor: filtrar, agrupar y pintar | Al cambiar cómo se comporta |

**Un cambio en cualquiera de los tres llega a las dos pantallas.** Está comprobado: subir
la barra de género de 4px a 12px en `vocab.css`, sin tocar ningún HTML, la sube en las dos.
Los controles 19 y 20 de `../Dashboard/verificar-sincronia.js` vigilan que siga siendo así.

### Subsecciones y qué lleva cada palabra

Las 22 secciones se reparten en **108 subsecciones** — Comida tiene *Frutas y verduras*,
*Carnes y pescado*, *Bebidas*…; Hobbies tiene *Deporte*, *Música*, *Salir*… — porque el
objetivo es pasar de 538 palabras a varios miles y una lista de 300 no se navega. En la app se ven como un **árbol** a la izquierda;
en el Dashboard, como una **segunda tira** bajo la sección abierta (ahí el slide es
apaisado y una barra lateral le quitaría el ancho a las palabras).

Una palabra solo necesita `de`, `es` y `cat`. Lo demás se pinta **si está**, así que una
preposición no arrastra los huecos de un verbo:

```js
// Un sustantivo
{art:'der', de:'Apfel', es:'la manzana', ex:'Der Apfel ist rot.',
 cat:'comida', sub:'frutas', niv:'A1', tipo:'sust',
 pl:'Äpfel', gen:'-s', esEx:'La manzana es roja.'},

// Un verbo con régimen
{art:'-', de:'warten', es:'esperar', ex:'Ich warte auf den Bus.',
 cat:'verbos', sub:'dar', niv:'A1', tipo:'verbo',
 conj:'wartet · wartete · gewartet', aux:'hat',
 reg:'warten auf + Akk.', esEx:'Espero el autobús.'},

// Una sección con sus subsecciones
comida: {label:'Comida', icon:'🍽️', subs:{
  frutas: 'Frutas y verduras',
  carnes: 'Carnes y pescado',
}},
```

| Campo | Qué es |
|---|---|
| `sub` | La subsección. Tiene que existir en `cats[cat].subs` |
| `niv` | A1 / A2 / B1. Alimenta el filtro de nivel |
| `tipo` | `sust` · `verbo` · `adj` · `adv` · `num` · `frase` |
| `pl`, `gen` | Plural y genitivo de un sustantivo |
| `conj`, `aux` | Presente 3ª · Präteritum · Partizip II, y si va con `hat` o `ist` |
| `reg` | El régimen: qué preposición pide y en qué caso. Va en turquesa |
| `comp` | Comparativo y superlativo de un adjetivo |
| `tag` | Lo que se sale de lo normal: *irregular*, *separable*, *incontable*, *solo plural* |
| `uso` | Cuándo se dice, o el fallo típico |
| `esEx` | La traducción del ejemplo. Las 538 la tienen |

**Añadir una sección entera** es lo mismo con una entrada más en `cats`: su etiqueta, su
emoji y sus `subs`. Así entró **Hobbies** (59 palabras en 8 subsecciones: tiempo libre,
deporte, música, arte, juegos, aire libre, en casa y salir).

**Las palabras van ordenadas por subsección** dentro de su sección, en el orden en que
están declaradas. El agrupado detecta cambios consecutivos, así que una palabra suelta
al final repetiría su encabezado a mitad de página; el motor reordena por si acaso, pero
el archivo se lee mejor si se añade cada palabra junto a las suyas.

`art` es `der`/`die`/`das`/`pl.` o `-` cuando no lleva artículo, y de ahí sale el color de la
barra izquierda de la tarjeta: el género se ve antes de leer la palabra. Las únicas dos
reglas son que `cat` exista en `cats` y que ninguna sección quede vacía; el control 19 de
`../Dashboard/verificar-sincronia.js` las comprueba, junto con que los emoji sean emoji.

### Cómo se ajusta el aspecto en cada pantalla

`vocab.css` trae **tokens `--v-*`** con valor por defecto (el de esta app). La pantalla que
lo carga redefine solo lo que cambia, en el contenedor del vocabulario: aquí `.v-vocab`, y
en el Dashboard `.al-fondo`, que tiene modo oscuro y fondo translúcido. La estructura y los
tamaños no se tocan desde fuera — eso es lo que hace que sea un solo diseño.

Dos tokens que parecen uno: `--v-acento` se usa de **fondo**, con letras blancas encima, y
`--v-acento-tx` es el mismo color usado como **texto**. Confundirlos dejó la cabecera de las
tablas en 3.8:1.

**Los colores que dependen del tema se DERIVAN del color del texto**, no llevan un valor
fijo: `color-mix(in srgb, <color> 55%, var(--v-txt))` se oscurece en el tema claro y se
aclara en el oscuro, así que un solo valor sirve para las dos pantallas y nadie tiene que
acordarse de redefinirlo. Con valores fijos, la píldora de `das` daba 1.88:1 sobre su
propio fondo y la línea técnica del Dashboard en modo oscuro, 1.08:1.

**Por qué tarjetas y no una tabla.** La tabla mostraba **9 palabras** de 538 a 1600px y en el
teléfono escondía tres de sus cinco columnas para caber. La rejilla muestra 25 y no esconde
nada. En móvil las 22 secciones no se apilan en siete filas: son una tira que se desliza, y
la elegida se trae al centro sola.

**Modo estudio** tapa la traducción de todas las tarjetas y se revela una a una al tocarlas.

---
## Kapitel 10 — el capítulo en curso

Seis lecciones que cubren el temario real de clase. **83 tarjetas de contenido y 370
ejercicios**; `k10.css` y `k10-interactivo.js` son suyos y los comparten las seis; `partizip.css` es solo de `k10-06`.

| Lección | Qué cubre | Ejercicios |
|---|---|---|
| `k10-01` La regla | Fórmula, Partizip II, los 3 casos sin *ge-*, haben/sein, **Perfekt vs Präteritum**, **modales (doble infinitivo)**, **negación**, **subordinadas**, **marcadores de tiempo** | 72 |
| `k10-02` Verbenliste | 207 verbos con las 4 columnas, patrones de vocal, **el Präsens irregular**, los que engañan | 70 |
| `k10-03` Üben | 6 bloques y **dos minitests** | 77 |
| `k10-04` Berufe | Artículo, femenino, tu área, **lugares y actividades**, **condiciones laborales**, **las 5 preguntas del oral**, plurales | 54 |
| `k10-05` Mein Tag | Conectores, tu rutina en presente y Perfekt, guion del video, **frecuencia**, **la hora hablada**, **separables de rutina** | 59 |
| `k10-06` Partizip I & II | Los dos participios enfrentados, cómo se construye cada uno paso a paso, los 4 usos del II y los 2 del I, declinación, 205 verbos con sus tres formas | 38 |

### `k10-06` — la lección de los participios

Tiene `partizip.css` propio, y **una sola decisión de diseño manda sobre el resto: cada participio
tiene su color**, y ese color no se usa para nada más en la página.

**🔵 Azul = Partizip I · 🟠 Naranja = Partizip II.** Se confunden precisamente porque al leerlos se
parecen; si el color los separa antes de que el ojo lea la palabra, la distinción se fija sola. El
mismo par de colores manda en el duelo de apertura, en las cabeceras de la comparativa, en los
bloques de uso y en las columnas de la tabla de 205 verbos.

Piezas propias de esta lección:

- **El duelo** (`.pz-duelo`) — *das **lesende** Kind* frente a *das **gelesene** Buch*, con la
  traducción y el porqué debajo. La idea entera del tema cabe ahí: **el Partizip I es quien hace la
  acción; el Partizip II, a quien se la hacen.**
- **El constructor** (`.pz-pasos`) — cada participio armado paso a paso, con la letra añadida
  resaltada en dorado y la vocal que cambia en rojo. Tres caminos: regular, irregular y el del
  Partizip I, que es un solo paso.
- **La tabla de tres formas** — infinitivo · Partizip I · Partizip II, con filtro por tipo y un
  filtro extra 🟢 «Partizip I usual»: en muchos verbos el Partizip I existe gramaticalmente pero no
  lo dice nadie, y marcar los 49 que sí se usan evita estudiar ruido.

El aviso más importante de la lección está en rojo y aparte: **el Partizip I no es el gerundio**.
«Estoy leyendo» no es *Ich bin lesend* — es simplemente `Ich lese`. Es el error que arrastran los
hispanohablantes y los anglohablantes por igual.

Los temas en negrita son los que suelen faltar en el material de clase y son pregunta segura:

- **Perfekt vs Präteritum** — cuál se usa al hablar y cuál al escribir, y la excepción que hay que
  saber: *sein*, *haben* y los modales se dicen en Präteritum aunque estés hablando.
- **Modales en Perfekt** — el doble infinitivo (*Ich habe arbeiten müssen*), que no usa participio.
- **La negación** — *nicht* va justo antes del participio; *kein* solo con sustantivo sin artículo.
- **Subordinadas** — con *weil/dass/als* el auxiliar pasa a ser el **último**, detrás del participio.
- **La hora hablada** — *halb acht* son las 7:30, no las 8:30. El error más caro del capítulo.

### La tabla de verbos (`k10-02`)

**207 verbos** con las cuatro columnas de la tabla que se memoriza en clase:

| Significado | Präsens | Präteritum | Partizip II |
|---|---|---|---|
| comer | essen *(isst)* | aß | **hat** gegessen |

La 3ª persona del singular va entre paréntesis **solo cuando cambia** — es el mismo criterio de la
hoja de Cenlex. El auxiliar va delante del participio, y `hat/ist` no es una duda: significa que el
verbo cambia según el uso (*ich bin gefahren* / *ich habe das Auto gefahren*).

Reparto: **139 irregulares · 9 mixtos · 59 regulares**, y 35 van con `sein`.

Los datos viven en `../../scratchpad`-style listas dentro del generador que produjo el archivo; la
tabla en sí es HTML estático. Para ampliarla, editar las filas directamente.

Filtros combinables con el buscador: todos / irregulares / mixtos / regulares / con *sein* / los 15
imprescindibles. El buscador encuentra por alemán, por español **y por Präteritum** (buscar `trank`
lleva a *trinken*).

Los **mixtos** están separados a propósito aunque también aparezcan entre los irregulares en otras
listas: cambian la raíz como un irregular pero terminan en `-t` como un regular, y son solo nueve.
Verlos juntos cuesta menos que encontrárselos sueltos.

### Los ocho tipos de ejercicio

`k10-interactivo.js` los expone todos. **332 ejercicios** repartidos en las cinco lecciones.

| Función | Qué hace | Para qué sirve |
|---|---|---|
| `k10Escribir` | Escribir la respuesta, con botón `?` que la revela y marca la fila como *ayudada* | Producción: lo más exigente |
| `k10Opciones` | Elegir entre 2-4, **con el porqué acierte o falle** | Entender la regla, no adivinar |
| `k10Ordenar` | Tocar palabras para armar la frase | Dónde va cada pieza — lo que más se falla |
| `k10Emparejar` | Unir dos columnas | Reconocer, que es el paso previo a producir |
| `k10Hueco` | Lückentext: huecos dentro de un texto seguido | El formato de examen; obliga a leer contexto |
| `k10Conjugar` | Rellenar las seis personas del Perfekt | Ver que el participio **no cambia** ni una vez |
| `k10Test` | Modo examen: una a la vez, nota, tiempo y repaso de fallos | Medirse de verdad |
| `k10Dictado` | Escuchar y escribir | Comprensión oral; sin ver la palabra antes |

Decisiones que cambian cómo se usan:

- **Se corrigen solos al escribir, sin botón de comprobar.** Con botón se acaba respondiendo las
  diez a ciegas y revisando al final, que es justo como no se aprende. La excepción es `k10Test`,
  que **no** explica el fallo hasta el final: ahí el objetivo es medirse, no aprender sobre la marcha.
- **La comparación es tolerante**: ignora mayúsculas y acepta `ue/ae/oe/ss` por `ü/ä/ö/ß`. Un
  acierto real no debe marcarse como error por cómo está configurado el teclado.
- **El rojo tarda en aparecer**: solo se marca error tras 4 letras. A mitad de palabra todavía no es
  un fallo, y pintarlo rojo desde la primera letra desanima.
- El progreso se guarda en `localStorage['aleman_k10_v1']`; `k10Progreso()` lo devuelve sumado.

### Audio en alemán

`k10Hablar(texto)` y `k10Altavoces(selector)` usan **SpeechSynthesis del navegador**: cero
dependencias, cero red, y funciona desde `file://`. Hay **487 elementos con botón 🔊** — cada verbo
de la tabla, cada ejemplo, cada línea del diálogo y del día.

**Las voces cargan de forma asíncrona.** `getVoices()` viene vacío en la primera llamada y Chrome
avisa después con `voiceschanged`; decidir "no hay voz alemana" a la primera dejaba el dictado
desactivado en equipos que sí la tienen. Por eso no se cachea un "no": quien depende de la voz se
apunta a `alLlegarVoz()`, con un reintento a 1,2 s por si el evento no llega a dispararse.

Sin voz alemana instalada: los botones 🔊 **no se ponen** —uno que no suena es peor que nada— y el
dictado explica cómo instalarla (Windows: Configuración → Hora e idioma → Voz → Agregar voces →
Deutsch).

---

## Cómo el Dashboard lee estas lecciones

`_generar-datos-dashboard.js` abre cada lección con Playwright **como página propia** y vuelca su
contenido real a `../Dashboard/aleman-data.js`.

```bash
NODE_PATH="…/npm-cache/_npx/…/node_modules" node Aleman/_generar-datos-dashboard.js
```

**Correrlo cada vez que se añada, quite o edite una lección.** No corre en el navegador de Adán:
es una herramienta de desarrollo.

Existe porque el Dashboard **no puede** leer estas lecciones en vivo — Chrome bloquea tanto
`iframe.contentDocument` como `fetch()` entre dos documentos `file://` distintos.

### `data-dashboard="no"`

Una tarjeta con ese atributo queda fuera de la extracción. Se usa en las tarjetas de ejercicios:
se generan por JS y, volcadas a texto, salen como una lista suelta de números y opciones sin
sentido. El ejercicio se hace **en** la lección, donde es interactivo; el Dashboard muestra la
teoría, las tablas y los ejemplos, que sí se leen de un vistazo.

Por eso `k10-03` —que es casi todo ejercicios— lleva además una tarjeta de resumen con los cuatro
modelos resueltos: sin ella, su slide en el Dashboard salía vacío.

---

## Añadir una lección

1. Crear el HTML siguiendo la estructura de las existentes (`.topic-hero`, `.topic-content`,
   `.card`, `.vocab-table`, `.rule-box`, `.example`).
2. Añadirla a `FILES` en `_generar-datos-dashboard.js` y a `ALEMAN_TEMAS` en `dashboard.html`
   (con `kapitel:N` si pertenece a un capítulo en curso).
3. Añadir su tarjeta en `index.html`.
4. Regenerar `aleman-data.js`.
5. Comprobar en el navegador que el slide no sale vacío y que no hay scroll horizontal a 390px.
