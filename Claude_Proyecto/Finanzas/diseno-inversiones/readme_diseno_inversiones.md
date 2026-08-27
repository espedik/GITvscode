# Rediseño del Plan de Inversiones — canvas de diseño

Propuesta visual para la sección `#s-gbm` de [`Finanzas.html`](../Finanzas.html). **Todavía no está
implementada**: esto es el diseño, no el código de la app.

Canvas publicado: <https://claude.ai/code/artifact/be12bfbf-6a83-4b6e-898b-00d172b13ada>

---

## Qué problema resuelve

La sección actual son **20 tarjetas del mismo peso visual** apiladas en 2,778 px de alto. Tres
fallos concretos, medidos sobre la vista real:

| Fallo | Dónde se ve |
|---|---|
| Ninguna cifra dice de dónde sale | `$19,359.02` aparece sin desglose; el usuario no puede comprobarla |
| El rendimiento engaña | Muestra `+0.00%` sobre $17,750, de los que $11,250 (63%) son la garantía del departamento — capital que no puede rendir. Y a los CETES nunca se les suman los intereses devengados |
| Nada manda | Cinco KPIs del mismo tamaño compiten; la cifra que Adán necesita cada semana no destaca |

## Los cinco artboards

| Archivo | Responde | Notas |
|---|---|---|
| `Main.dc.html` | ¿Cuánto invierto esta semana? | Una cifra dominante (`$4,840`) y la cadena de cinco pasos que la produce |
| `Semanas.dc.html` | ¿Por qué unas semanas aprietan? | **Único con controles vivos**: al tocar una semana cambia el detalle |
| `Portafolio.dc.html` | ¿Qué tengo y cuánto rinde? | Separa capital que trabaja ($49,958) del retenido ($11,250) |
| `Acciones.dc.html` | ¿Qué me llevo con ese dinero? | Traduce «70% MSFT» a dólares y a fracciones de acción |
| `DireccionB.dc.html` | — | Alternativa de densidad: todo sin scroll, tipo panel de operador |

## Vocabulario visual

Los tokens salen tal cual del `:root` de `Finanzas.html` — no se inventó ninguno:
`#00d4ff` primary, `#b06eff` purple, `#00e87a` success, `#ff3b6b` danger, `#ffd93d` warning,
fondo `#08080f`, texto `#f0f0f5` / `#a8acc4` / `#6a6e88`, radios 14 px y 9 px.

Lo que se añade para el registro futurista:

- **Space Grotesk** para cifras y titulares, con `font-variant-numeric: tabular-nums` — los
  números quedan alineados en columna. Inter sigue siendo el cuerpo, como en la app.
- Rejilla técnica de 64 px enmascarada con un radial, sobre los dos radiales que el `body` de la
  app ya usa.
- Bordes de gradiente cyan→purple en la tarjeta dominante de cada pantalla.
- Barras segmentadas en vez de barras sólidas.
- **Iconos SVG de trazo**, nunca emoji. La sección actual usa emoji como iconografía.

## Cifras y de dónde salen

Todas verificadas contra `datos-maestros.js` y el estado real de `finanzasmx_v2`:

```
53,140 ingresos − 13,344 fijos − 9,715 mínimos de deuda = 30,081 margen
30,081 = 19,359 bolsa + 1,500 CETES + 9,222 sin asignar
19,359 ÷ 4 semanas = 4,840 · × 70/30 = 3,388 MSFT + 1,452 NVDA
4,840 ÷ 16.95 = 285.55 USD → 0.43 acc. MSFT ($470) + 0.63 acc. NVDA ($135)
6,500 CETES × 11% × 129/365 = +253 devengados
43,458 BTC + 6,500 CETES = 49,958 trabajando · + 11,250 garantía = 61,208
```

**Dos cosas son lectura propia, no dato de la app**: el nombre «colchón» para los $9,222 sin
asignar, y meter el BTC dentro del portafolio (hoy vive en su propio módulo, más abajo en la
misma sección).

El valor del BTC es una foto del momento en que se midió — cambia en cada fetch de CoinGecko.

## Regenerar el canvas

Los `.dc.html` y `canvas.json` son la fuente. `plan-de-inversiones.html` es el resultado
ensamblado (2.5 MB, no se versiona):

```bash
cd Claude_Proyecto/Finanzas/diseno-inversiones
BASE="<directorio de la skill design>"
node "$BASE/seed-canvas.mjs" --template "$BASE/payload.template.html" \
  --out plan-de-inversiones.html --title "Plan de Inversiones" \
  --artboard Main.dc.html --artboard Semanas.dc.html --artboard Portafolio.dc.html \
  --artboard Acciones.dc.html --artboard DireccionB.dc.html --canvas canvas.json
```

`canvas.json` fija posición y **tamaño del marco** de cada artboard. El marco no escala el
contenido: si el `div` raíz mide más que `h`, se recorta sin avisar. Por eso cada raíz lleva un
`min-height` igual al `h` de su entrada, con ~8% de holgura sobre el alto real medido.
