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
| `{{servicios}}` | $1,264 | Celular + internet + gas + luz/agua + limpieza |
| `{{suscripciones}}` | $1,080 | Gym + Claude Code + iCloud |
| `{{cetesDia15}}` | $1,500 | Aporte recurrente a CETES el día 15 |
| `{{fijosTotal}}` | $13,344 | Derivada: renta + servicios + suscripciones |

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
| `{{kapitelAleman}}` | 10 | **Filtra el slide de Alemán del Dashboard**: con un capítulo puesto muestra solo sus lecciones en vez de rotar por las 40. En `null` vuelve la rotación completa |

### La rutina diaria

`RUTINA_TASKS` — **58 bloques** con sus subtareas: el horario completo de los 7 días. No es un
marcador, se pide desde JS:

```js
CIFRAS.rutina('')                          // Coach: los href ya son anclas suyas
CIFRAS.rutina('../Coach/Coach_v2.html')    // Dashboard: tiene que salir de su archivo
```

Devuelve **copia profunda** con los `href` resueltos, para que una app no pueda contaminar a la
otra dentro de la misma página. `dias`: 0=domingo…6=sábado. Los bloques con `fijo:true` (ALTEN)
salen en la línea de tiempo pero no llevan checkbox ni suman al progreso.

Estaba copiada en `dashboard.html` y `Coach_v2.html`, 17.5 KB en cada uno. Era la estructura más
grande y más tocada de las duplicadas, y llegó a divergir 6 días.

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
| `celular`, `internet`, `gas`, `luzAgua`, `limpieza` | `servicios` → `fijosTotal` → `margen` |
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
| `LISTA_COMPRAS` | Catálogo de compras por pasillos | `CIFRAS.LISTA_COMPRAS` |

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
