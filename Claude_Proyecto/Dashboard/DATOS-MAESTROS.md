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
<p>un crédito de {{autoSaldo}}</p>        →   un crédito de $292,000
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
| `{{gym}}` | $1,500 | |
| `{{fijosTotal}}` | $14,194 | Derivada: renta + gym + servicios + suscripciones |

### Deudas · saldos vivos (`finanzasmx_v2`)

| Marcador | Valor hoy | id |
|---|---|---|
| `{{autoSaldo}}` `{{autoTotal}}` `{{autoPago}}` `{{autoTasa}}` `{{autoMeses}}` | $292,000 · $315,800 · $6,700 · 12.99% · 61 | `d003` |
| `{{tcBbva}}` `{{tcBbvaMin}}` `{{tcBbvaTasa}}` | $34,000 ⚠️ subiendo · $1,500 · 55.7% | `d001` |
| `{{banamex}}` `{{banamexMin}}` | $0 ✅ liquidada · $810 | `d002` |
| `{{iphone}}` | $11,362 | `d008` |
| `{{appleWatch}}` | $1,708 | `d004` |
| `{{zapStylo}}` `{{zapStyloCuota}}` | $334 · $167 — "el de los zapatos" | `d009` |
| `{{deudaTotal}}` `{{deudaCara}}` `{{deudaMsi}}` | $339,404 · $34,000 · $13,404 | derivadas |
| `{{minimosDeuda}}` `{{margen}}` | suma de mínimos vivos · lo que sobra al mes | derivadas |

**Derivadas del auto**, que antes se escribían a mano y se quedaban congeladas:
`{{autoAPagar}}` (meses × pago) y `{{autoInteres}}` (lo que cuesta en puro interés).

### Ahorro y metas

| Marcador | Valor hoy | Origen |
|---|---|---|
| `{{fondo}}` `{{fondoMeta}}` | $4,000 de $10,000 | vivo |
| `{{cetes}}` | $6,500 | vivo |
| `{{maestria}}` `{{maestriaMeta}}` | $53,740 de $500,000 | vivo |
| `{{maestriaEscuela}}` | Esslingen — Automotive Systems M.Eng. | constante |
| `{{maestriaInicio}}` | 2028-10-01 (pausada hasta 2027-07-18) | constante |

---

## Quién carga qué

| App | Cómo lo carga | Para qué |
|---|---|---|
| `Dashboard/dashboard.html` | `<script src="datos-maestros.js">` | Prosa del Plan Maestro (`cifrarLiterales`) |
| `Coach/Coach_v2.html` | `<script src="../Dashboard/datos-maestros.js">` | Hallazgos, tabla de deudas, checklists (`aplicarDOM`) |
| `Finanzas/Finanzas.html` | `<script src="../Dashboard/datos-maestros.js">` | **Es la fuente**: `seedData()` lee `CIFRAS.DEUDAS_SEED` |

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
| `Coach/` | `Coach_v2.html` | Plan Maestro, rutina, radar de habilidades | `coach_rutina_v1`, `coach_checks_v1`, `radarp_*` |
| `Finanzas/` | `Finanzas.html` | Finanzas reales, GBM, BTC, deudas | `finanzasmx_v2` |
| `CuidadoPersonal/` | `cuidadopersonal.html` + `salud`/`ejercicio`/`comida` | Shell con 7 subtabs | `skincare_v1`, `misalud_v1`, `mirutina_v1`, `comida_v1` |
| `Vestimenta/` | `vestimenta.html` | Guardarropa y compras | `vestimenta_v1` |
| `Aleman/` | 35+ páginas | Estudio A1/A2, sin datos | — |
| `Entrevistas/` | `index.html` + `js/data-*.js` | Prep. técnica automotriz, 229 temas | `theme` |

Detalle por app en su propio `.md` (`readme_dashboard.md`, `readme_finanzas.md`, …). Este índice
es el punto de entrada; esos son la historia larga de cada cambio.

---

## Comprobar que todo sigue sincronizado

```bash
node Dashboard/verificar-sincronia.js      # desde Claude_Proyecto/
```

Compara **evaluando los literales** de cada HTML, no leyéndolos a ojo, y dice qué campo de qué
entrada difiere. Sale con código 1 si algo está roto, así que vale tal cual para un hook.

Qué revisa: `RUTINA_TASKS` (Dashboard ↔ Coach, campo a campo incluidas subtareas), `SK` el radar,
`GYM_RUTINA_DEFAULT` contra `ejercicio.html`, las cifras que ya tienen variable pero siguen
escritas a mano, y los `{{marcadores}}` que no existan en el catálogo.

Ignora a propósito dos cosas: los `href` de `RUTINA_TASKS` (ancla interna en Coach, ruta relativa
en Dashboard) y los campos `full`/`cat`/`desc` de `SK`, que solo usa el panel de Coach.

**La primera vez que se corrió encontró 7 textos** de la rutina de cabello mejorados en Coach el
2026-08-18 (commit `0ef03b4`, *"Explica qué ES una mascarilla capilar"*) que nunca se replicaron
al Dashboard: llevaban 6 días divergentes sin que nadie lo notara. Ya están sincronizados.

**Correr esto antes de dar por terminada una tarea** que toque cualquier estructura duplicada.

---

## Lo que todavía está duplicado

`dashboard.html` copia a mano 6 estructuras de otras apps. **Ya no hay razón técnica que lo
impida** — `<script src="../ruta/archivo.js">` carga bien desde `file://`, está probado con este
mismo archivo; solo falta el trabajo de moverlas:

`RUTINA_TASKS` (71 tareas, ↔ Coach) · `PHASES` (↔ Coach) · `SK` (radar, ↔ Coach) ·
`APRENDIZAJE` (↔ Coach) · `GYM_RUTINA_DEFAULT` (↔ ejercicio.html) ·
`LISTA_COMPRAS` (↔ comida + cuidadopersonal + salud).

Son las más sensibles a romperse por edición asimétrica. El siguiente candidato natural es
`RUTINA_TASKS`, que es la más grande y la que más se toca.
