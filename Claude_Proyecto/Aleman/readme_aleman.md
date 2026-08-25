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

Cinco lecciones que cubren el temario real de clase: la regla del Perfekt, el listado de verbos
irregulares, los ejercicios y el minitest, Berufe y «Mein Tag» (la tarea de video).

`k10.css` y `k10-interactivo.js` son suyos y los comparten las cinco.

### Los tres tipos de ejercicio

`k10-interactivo.js` expone tres funciones, y todas **se corrigen solas mientras escribes**, sin
botón de comprobar. Con un botón se acaba respondiendo las diez a ciegas y revisando al final,
que es justo como no se aprende.

| Función | Qué hace |
|---|---|
| `k10Escribir(id, items)` | Escribir el Partizip II. Verde al acertar, rojo al fallar, botón `?` que revela la respuesta y marca la fila como *ayudada* |
| `k10Opciones(id, items)` | Elegir entre 2-4 opciones. **El porqué se muestra acierte o falle** — fallar sin saber por qué no enseña nada |
| `k10Ordenar(id, items)` | Tocar palabras para armar la frase. Entrena lo que más se falla: dónde va cada pieza |

Detalles que importan:

- **La comparación es tolerante**: ignora mayúsculas y acepta `ue/ae/oe/ss` por `ü/ä/ö/ß`. Un
  acierto real no debe marcarse como error por cómo está configurado el teclado.
- **El rojo tarda en aparecer**: solo se marca error cuando ya se escribieron al menos 4 letras. A
  mitad de palabra todavía no es un fallo, y pintarlo rojo desde la primera letra desanima.
- El progreso se guarda en `localStorage['aleman_k10_v1']` y `k10Progreso()` lo devuelve sumado.

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
