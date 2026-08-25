# Aleman/ — referencia

40 lecciones de alemán en HTML, sin backend ni build. Se abren con `file://` y el Dashboard las
consume a través de `../Dashboard/aleman-data.js`.

> **Referencia, no diario.** El historial vive en `git log -p -- Claude_Proyecto/Aleman/`.
> Ver `../../CLAUDE.md` → Regla 3.

---

## Estructura

| Grupo | Archivos | Qué es |
|---|---|---|
| **Kapitel 10** | `k10-01`…`k10-05` | Lo que Adán cursa en Cenlex Santo Tomás desde el 25-ago-2026 |
| A1 | `a1-01`…`a1-15` | Base: saludos, números, artículos, hora, profesiones… |
| A2 | `a2-01`…`a2-20` | Gramática y vocabulario temático |
| Apoyo | `index.html`, `gramatica.html`, `vocabulario.html` | Índice y referencia transversal |
| Compartido | `styles.css`, `flashcards.js`, `k10.css`, `k10-interactivo.js` | Estilos y motores |

---

## Kapitel 10 — el capítulo en curso

Cinco lecciones que cubren el temario real de clase: la regla del Perfekt, la tabla de verbos,
los ejercicios y el minitest, Berufe y «Mein Tag» (la tarea de video).

`k10.css` y `k10-interactivo.js` son suyos y los comparten las cinco.

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

`k10-interactivo.js` los expone todos. **233 ejercicios** repartidos en las cinco lecciones.

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
dependencias, cero red, y funciona desde `file://`. Hay **471 elementos con botón 🔊** — cada verbo
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
