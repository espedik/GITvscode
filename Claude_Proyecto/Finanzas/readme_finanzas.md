# Finanzas.html — referencia

App de finanzas personales en un solo archivo HTML (~5 600 líneas, 376 KB). Chart.js 4.4 para
gráficas, `localStorage['finanzasmx_v2']` para persistencia, todo en MXN. Es **la fuente de los
saldos** del proyecto: lo que escribe aquí lo leen el Dashboard y Coach.

> Referencia, no diario. Historial en `git log -p -- Claude_Proyecto/Finanzas/Finanzas.html`.
> Los saldos de hoy no están aquí: están en [`../Dashboard/DATOS-MAESTROS.md`](../Dashboard/DATOS-MAESTROS.md).

Carga `../Dashboard/datos-maestros.js` en el `<head>` (no lo necesita para pintar —sus datos
salen de `S`— pero así la prosa usa los mismos `{{marcadores}}` que las otras apps) y
`../Dashboard/sin-zoom.js`.

---

## Estado global — objeto `S`

```js
S = {
  transactions:   [],       // transacciones
  budgets:        [],       // presupuestos
  debts:          [],       // deudas
  goals:          [],       // metas de ahorro
  investments:    [],       // inversiones
  activos:        [],       // activos físicos y líquidos
  btcHistory:     [],       // compras y ventas de BTC
  currentBtcPrice: 0,       // precio actual BTC en USD
  usdMxn:         19.5,     // tipo de cambio de HOY
  btcLastFetch:   '',       // ISO del último fetch de precio
  btcPriceHist:   [],       // [[ts, precioMXN], …] caché del histórico diario de CoinGecko
  btcHistFetch:   '',       // ISO del último fetch del histórico
  weeklyLeftover:  0,       // sobrante semanal manual para GBM
  sivaleBalance:   0,       // saldo acumulado Si Vale
  sivaleLastMonth: '',      // YYYY-MM del último mes agregado Si Vale
  emergencyFund:   0,       // fondo de emergencia
  didiMonthly:     0,       // sin uso desde la UI (código muerto, ver abajo)
  gbmMonth:       '',       // YYYY-MM seleccionado en Plan de Inversiones
  indicatorHistory: []      // snapshots mensuales de indicadores (ver Indicadores)
}
```

Globales adicionales: `editId`, `confCb`, `payDebtId`, `contribGoalId`, `btcEditId`, `activoEditId`,
`btcCur` (MXN|USD, persiste en `localStorage['btc_cur']`), `curType` (expense|income), las
instancias de Chart (`chCat`, `chBal`, `chBud`, `chInv`, `chGbmInv`, `chBtcPnl`, `chPat`) y `dashMonth`.

---

## Constantes y de dónde salen los importes

- **`CATS`** — expense: Alimentación, Transporte, Hogar/Renta, Salud, Entretenimiento, Educación,
  Ropa, Servicios, Suscripciones, Restaurantes, Viajes, Deudas, Otros gastos · income: Salario,
  Freelance/Honorarios, Inversiones, Renta/Propiedades, Bonos, Regalos, Otros ingresos.
  `CCOLORS` da el color de cada una (los mismos hex que `CT_COLOR` del Dashboard).
- **Los gastos fijos no se escriben aquí.** Salen de `PROYECTO` en `datos-maestros.js` vía
  `_PG()`, `_autoMin()` y `_metaFondo()`; `BASE_INC = _PG().sueldo` en los tres sitios que lo usan.
  `_autoMin()` y `_metaFondo()` prefieren el dato **vivo** de `S` y solo caen al maestro si aún no
  hay nada guardado. Los mínimos de tarjeta salen de `minimosTC()` sobre `S.debts`, nunca de un
  número escrito. El **control 5** del verificador busca valores del maestro escritos como número
  pelado en el código. `RECURRENTES` (lo que `loadRecurringForMonth` siembra) también lee de
  `PROYECTO`.
- **`WEEKLY_PICKS`** — `{ semana, acciones:[{ticker, pct, tipo}] }`, el reparto del sobrante
  semanal en GBM. **Se actualiza pidiéndoselo a Claude cada lunes** y solo con precios reales:
  no se inventan cotizaciones.
- **Meta Maestría** — `g001` (o `icon === '🎓'`), `target` del propio registro con respaldo en
  `CIFRAS.n('maestriaMeta')` (`_metaMaestria()`). Cuentan fondo de emergencia (que son los CETES) +
  inversiones + BTC en MXN.
- **Fondo de emergencia** — meta `ef-001` ("Fondo de emergencia (CETES)"); `EF_TARGET = _metaFondo()`.
  **Son los CETES**, un solo número (`S.emergencyFund`): no hay inversión `type:'cetes'` en
  `investments`, porque los indicadores, el patrimonio y el fondo de la maestría sumaban las dos
  cosas. Aportar a `ef-001` (`saveContrib`/`setEmergencyFund`) es anotar lo que entró a CETES; el
  bloque de CETES del plan GBM lo dice y muestra el saldo.

---

## El lenguaje visual del Plan de Inversiones

Cinco clases en el `<style>`, compartidas por el plan semanal y la gráfica de BTC. Viven como
clases y no como `style=""` porque son **el sistema**; todos los colores salen del `:root`, así
que el tema claro funciona sin reglas aparte.

| Clase | Qué hace |
|---|---|
| `.fx-num` | Space Grotesk con `tabular-nums`: una columna de importes queda alineada |
| `.fx-lbl` | Etiqueta de sección: 9.5 px, `letter-spacing:.14em`, mayúsculas |
| `.fx-panel` | Panel base con borde y fondo tenue |
| `.fx-grid` | Rejilla técnica de 64 px como `::before`, enmascarada con un radial |
| `.fx-edge` | Borde de gradiente cyan→purple: envoltorio de 1 px de padding con el hijo opaco encima — la única forma de que un borde degradado respete el `border-radius` |
| `.wk-card` | Tarjeta de semana; es un `<button>`, funciona con teclado |

**Inter sigue siendo el cuerpo.** Space Grotesk entra solo en cifras y titulares; la gráfica de
BTC pasa la misma familia a Chart.js (`FX_FONT`) y a `ctx.font` de los plugins (el canvas no
hereda CSS).

### El instrumento: `.btcx-*`

La gráfica de BTC es la única pieza que mira un precio vivo, así que lleva una segunda capa
encima de `.fx-*`: se lee como un instrumento. El acento es un **verde de fósforo** que comparte
el RGB de `--success`; el cian entra solo en el borde y en la retícula del cursor. La paleta
vive en `:root` y cada tema la redefine (un verde neón legible sobre negro se pierde sobre blanco):

| Variable | Claro | Oscuro | Para qué |
|---|---|---|---|
| `--btc-rgb` | `0,232,122` | igual | el RGB suelto de los `rgba(…)` y de los plugins |
| `--btc` | `#009c55` | `#00e87a` | texto, iconos, bordes activos |
| `--btc-hi` | `#00c46a` | `#7dffc4` | extremo encendido de la rampa (hoy, triángulos) |
| `--btc-lo` | `#00603a` | `#0b8f57` | extremo apagado (el pasado de la curva) |
| `--btc-glow` | `.3` | `.62` | intensidad del halo |

En el dónut de Patrimonio y en el desglose de inversiones BTC sigue siendo `#f7931a`: ahí es un
color categórico. Clases: `.btcx-scope` (define `--bx`), `.btcx`/`.btcx-in` (marco con borde
degradado; `::before` líneas de barrido, `::after` las cuatro esquinas de mira en **un**
pseudo-elemento), `.btcx-sweep` (barrido de luz al montar, **una** vez), `.btcx-rail` con
`.btcx-live` (el punto que late), `.btcx-tabs`/`.btcx-tab` y `.btcx-seg` (estado activo `.on`,
no estilos desde JS), `.btcx-kpi(s)` (el filete superior toma el color de su cifra con `--kc`),
`.btcx-ley`/`.btcx-key`/`.btcx-src`. `@media(prefers-reduced-motion:reduce)` apaga barrido,
latido y levantamiento.

---

## Utilidades, navegación, modales

`fmt(n)` (MXN con `Intl.NumberFormat`), `uid()`, `today()` (`YYYY-MM-DD`), `ym(d)`, `nowYM()`,
`save()`/`load()` (spread sobre `S`, silencia errores), `fmtDate(d)` (`"28 Jun 2026"`),
`last6Months()`, `toast(msg)`, `killChart(c)` (destruye y devuelve `null`; siempre antes de redibujar).

`nav(s)` activa una de `SECS = dashboard | transactions | budgets | debts | goals | patrimonio |
indicators | gbm` (`<section id="s-{s}">`) y llama a `RENDERS[s]()`. `closeMo(id)` cierra un
modal y resetea los ids de edición; `Escape` y el clic en el backdrop `.mo` cierran.
`askDel(type, cb)` / `doConf()` / `closeConf()` es el diálogo de confirmación.

---

## Módulo: Transacciones

`getTx()` aplica los filtros del DOM (`f-search`, `f-type`, `f-cat`, `f-month`) y devuelve el
subconjunto ordenado por fecha desc. `renderTx()` pinta la tabla con badges de resumen del filtro.
`clearF()`. `openTxModal(id)` (fecha de hoy si es nueva), `selType(type)` → `fillCatSel`,
`saveTx()` (valida, guarda, refresca dashboard e indicadores si están activos), `delTx(id)`.

**Convención: si un gasto se pagó con tarjeta de crédito, la tarjeta va en `notes`** (`TC
Banamex`, `TC BBVA`). No es cosmético: el tablero del Dashboard lee esa nota para decidir si el
gasto **sale de tu caja ese día** o solo **sube el saldo de la tarjeta**.

| Cómo se anota | Qué hace el tablero |
|---|---|
| `notes: 'Compra única — de contado'` | resta del día |
| `notes: 'TC Banamex — 30 cápsulas'` | **no** resta ese día; sale en "Cargaste a la tarjeta", y lo cobra el mínimo de la tarjeta |
| `cat: 'Deudas'` + `notes` con la tarjeta | sí resta: es un **pago a** la tarjeta |

Sin la nota, una compra a crédito se contaría dos veces: el día de la compra y en el mínimo.

**Los gastos que Adán reporta de golpe** (un lote de compras) van a `datos-maestros.js` una sola
vez (`CIFRAS.GASTOS_20260901` y `CIFRAS.MOVIMIENTOS_20260920` son el patrón): de ahí los siembra `seedData()` para un navegador en
blanco y de ahí los aplica una migración **por id, solo si falta**, para el navegador que ya
tiene datos. `SEED_VER` no se sube por eso: borraría los movimientos capturados a mano. Los
gastos de productos llevan el nombre exacto del catálogo (`RUTINA_PELO`, etc.) para poder cruzar
gasto y ficha.

---

## Módulo: Presupuestos

`spentCat(cat, month)`, `renderBudgets()` (barra verde < 70 %, amarilla < 90 %, roja ≥ 90 %),
`renderBudgetChart()`, `openBudgetModal(id)`, `saveBudget()` (uno por categoría), `delBudget(id)`.

---

## Módulo: Deudas

**Tres helpers para que una deuda liquidada nunca contamine un total**: `deudasActivas()`
(`balance > 0`), `minimosVigentes()`, `minimosTC()` (solo tarjetas activas; es lo que consume
`renderGBM`).

`renderDebts()`: los tres KPIs (deuda total, mínimos/mes, tasa promedio) se calculan **solo sobre
activas**; las de `balance <= 0` van aparte al final en **"✅ Liquidadas"** (sin mínimo ni barra,
conservando editar/eliminar: la tarjeta sigue existiendo). Con `noInterest`, bloque "paga antes
del día X". `openDebtModal`, `saveDebt`, `delDebt` (→ `maybeRefreshIndicators()`),
`openPayModal(debtId)` (prellena el mínimo), `savePayment()` (resta al saldo y crea una
transacción `expense` en `Deudas`, `"Pago: {nombre}"`).

**Cómo se calculan los saldos MSI.** `autoBalance(d, refDate)` solo auto-calcula **MSI a 0 %**
(`type:'other'`, `rate:0`): `total − meses × cuota`. Tarjetas y crédito con interés son manuales.
Cuenta cuotas con **`floor`, no `round`**: solo las ya cobradas. El `start` de cada MSI **no es la
fecha de compra literal**: es la que hace que `autoBalance` reproduzca las cuotas del estado de
cuenta (30.44 días por mes), y esa misma fecha decide si la cuota entra en el plan semanal
(`start + totalM`): al elegirla, verificar contra los dos cálculos.

**Lo que se sabe de las tarjetas y no está en el código**:

- La tasa de `d001` (TC BBVA) es **55.7 %**, implícita: llevó 31 meses pagando $1,500 con el saldo
  intacto (`1500 × 12 ÷ 32,343 = 55.7 %`). Alimenta el medidor "🔥 Intereses este mes", que avisa
  de que el mínimo no amortiza. Pendiente confirmar contra el estado de cuenta.
- `d001` mantiene `total == balance` (el saldo nunca bajó desde 2024; las migraciones de saldo
  lo aplican a los dos). Si baja de verdad, `total` se queda en el pico y la diferencia son las
  barras de "pagado real".
- Una deuda que **nunca existió** se borra del seed, no se pone en $0: en $0 saldría para
  siempre en "Liquidadas", que es otra afirmación falsa.
- **Un saldo que solo se escribe en un `.md` no existe**: sin migración en el maestro, las apps
  siguen con el viejo.

---

## Módulo: Metas de ahorro

`renderGoals()` (excluye `g002`, reservada), `openGoalModal`, `saveGoal`, `delGoal` (no afecta
`ef-001`), `openContribModal(goalId)`, `saveContrib()` (no supera `target`; si es `ef-001`
también actualiza `S.emergencyFund`).

**Hueco conocido**: `g001` guarda `current` como una sola cifra, sin instrumentos ligados ni
historial de aportaciones. Para verlo desglosado habría que dar de alta en Inversiones dónde
está ese dinero.

---

## Módulo: Inversiones

`openInvModal(id)` (tipos `cetes | fondos | acciones | crypto | inmuebles | deuda | otro`),
`saveInv()` (`value` = `invested` si no se da), `delInv(id)`; los tres refrescan GBM si está
activo e indicadores.

---

## Módulo: Plan de Inversiones (GBM)

`renderGBM()` calcula, sobre `_PG()`:

- `QUINC = round(sueldo/2)`; `msiActive` = cuotas 0 % vigentes; `avgExpTotal` = promedio de gastos
  reales de los últimos 3 meses; `varPerWeek` = variables estimados / 4.
- **Sobrante por semana** (`Math.max(0, …)`, nunca negativo):
  `w1 = QUINC − renta − varPerWeek` · `w2 = 0` (el auto se paga del saldo reservado la semana 1) ·
  `w3 = QUINC − CETES − servicios − suscripciones − minimosTC() − msiActive − varPerWeek` · `w4 = 0`.
- Tabs de meses (actual + 4), `efectivoSemana` (= `S.weeklyLeftover` si > 0), reparto entre
  `WEEKLY_PICKS`, portafolio con KPIs, proyecciones a 12 meses, tabla por tipo, bloque de CETES,
  y `renderBtcHistory()` al final.

**El plan semanal, tal como se ve**: cuatro `.wk-card` y el detalle de la elegida, encabezados por
una **línea de tiempo del mes** que responde *por qué unas semanas dan para invertir y otras no*
antes de leer una cifra. Los eventos (`GRUPOS`) van agrupados por día y alternan arriba y abajo
del eje (el 14 y el 15 se pisarían). Bajo **760 px** la línea (`.fx-tl`) se oculta y sale una
lista vertical (`.fx-tl-lista`) generada del **mismo array**. Ningún importe está en el marcado.
**El bloque dice lo que el modelo no cuenta**: solo reparte la nómina; Didi no entra y la
mensualidad del auto aparece en el calendario pero no se descuenta de ninguna semana.

`switchGBMTab(n)` mueve `.on` (antes reescribía `style` con regex y cualquier retoque lo rompía).
`setWeeklyLeftover`, `addSivaleMonth`/`undoSivaleMonth` (±$940), `setSivaleBalance`, `setGbmMonth`,
`setEmergencyFund` (sincroniza `ef-001`), `maybeRefreshIndicators()` (solo si `s-indicators` está
activa).

**Código muerto**: `S.didiMonthly` y `setDidiMonthly()` existen pero ningún botón los llama;
`BASE_INC` es solo el sueldo y Didi se registra como transacción manual. Borrarlos o reconectarlos
es una decisión pendiente; hoy no rompe nada.

---

## Módulo: Indicadores Financieros

`renderIndicators()` calcula 9 indicadores sobre `BASE_INC` (sueldo; Si Vale excluido), activos
financieros (inversiones + BTC en MXN), líquidos y físicos, y pasivos (suma de `balance`):

| Indicador | Fórmula | Verde | Amarillo | Rojo |
|---|---|---|---|---|
| DTI | Σ mínimos / ingreso × 100 | <20 % | 20-40 % | >40 % |
| Tasa de ahorro | (ingreso − gasto prom.) / ingreso | >20 % | 10-20 % | <10 % |
| Fondo emergencia | meses cubiertos + % de meta | ≥6 meses o 100 % | 50-75 % | <50 % |
| Deuda vs activos | deuda / activos | <30 % | 30-60 % | >80 % |
| Solvencia | activos / deuda | ≥3x | 1.5-3x | <1x |
| Multiplicador deuda | deuda / ingreso anual | <1x | 1-2x | >4x |
| ROI portafolio | (valor − capital) / capital | >10 % | 0-10 % | <0 % |
| Inversión vs ingreso anual | activos fin. / ingreso anual | ≥25x | ≥1x | <0.5x |
| Patrimonio neto | activos − deudas | >0 | — | <0 |

**Score 0-100 con letra A-F**: DTI 28 %, ahorro 24 %, fondo 20 %, deuda vs activos 16 %,
solvencia 12 %. Barra de progreso de la Maestría contra `_metaMaestria()`.

**Snapshots mensuales congelados (`S.indicatorHistory`)**: `autoSaveCurrentMonthSnapshot()`
guarda/sobrescribe al abrir la sección el snapshot del **mes actual** (`{month, score, savedAt,
…}`); los meses cerrados quedan congelados y aparecen como tabs 🔒 (`switchIndMonth`), con
comparación "entonces vs. hoy". No hay botón que lo anuncie: aparecen tabs conforme pasan los
meses. Es el archivo histórico del proyecto y el dato vive solo aquí: por eso el import lo
fusiona en vez de pisarlo.

---

## Módulo: Proyección y Recurrentes

`getMonthProjection(month)` (meses futuros): fijos del mes (renta, CETES, gym, servicios,
suscripciones, deudas con interés, `car`, MSI vigentes) + promedio de variables de Alimentación,
Restaurantes y Entretenimiento de los últimos 3 meses → `{inc, fixedExp, varExp, fixed, varItems,
totalExp, balance}`. `loadRecurringForMonth(month)` genera transacciones con `notes:'[recurrente]'`
(salario y Si Vale el día 1, fijos de `RECURRENTES`, deudas con interés y auto, MSI el 16); pide
confirmación si ya existen. `removeRecurringForMonth(month)` las borra.

---

## Módulo: Dashboard

`setDashMonth(ym)` → `renderDashboard()`: tabs de meses (actual → diciembre), banner de
proyección para meses futuros con cargar/quitar recurrentes, fondo de emergencia inline, 4 KPIs
(Balance, Ingresos, Gastos, Activos), desglose de ingresos (Salario / Didi / Si Vale / Extras —
`extras` son ingresos del mes que no son salario ni vale), y llama a `renderInsights` (Patrimonio
Neto, Dinero Libre, DTI, Tasa de Ahorro), `renderDashCharts`, `renderSpecials`,
`renderSubscriptions`, `renderRecent` (últimas 7), `renderAlerts` (presupuestos ≥ 70 %).

`renderSpecials(freeMonth, refDate)`: **Maestría** (barra segmentada, `monthlyNeeded` para
llegar a la fecha, 5 escenarios de ahorro con fecha estimada) y **Hoja de Ruta de Deudas** (MSI
con fecha de liquidación, tarjetas con meses estimados, auto con tip de $1,000 extra; proyección
`pb(d) = max(0, balance − meses × min)`). `renderSubscriptions`: recurrentes sin fin (de
`PROYECTO`) y MSI activas (`rate===0 && type==='other' && start`) con urgencia por meses restantes.

**La gráfica de balance `ch-bal`** toma sus seis puntos de **`CIFRAS.balanceMeses`**, la misma
función que el tablero del Dashboard, para que las dos pantallas no discrepen; se le pasan
`S.transactions` y `S.debts` (más frescos que `localStorage`). Si el maestro no cargara, cae al
cálculo local. Sumar `transactions` a secas dejaba los meses sin registrar en cero.

**Alimentación** se modela con su patrón real, y el modal muestra juntos el **promedio medido** y
el **patrón declarado**: la brecha a la vista es el valor del cambio. El dato medido siempre gana.
El desglose solo muestra categorías con movimientos.

---

## Módulo: Export / Import

`exportData()` descarga `finanzas_YYYY-MM-DD.json`. `importData(input)` reemplaza `S` tras
confirmar, **con una excepción: `indicatorHistory` se FUSIONA por `month`** (gana el `savedAt`
más reciente): el histórico mensual es lo único que no se puede reconstruir, y restaurar un
respaldo viejo borraba meses que el navegador sí tenía. Un import nunca quita meses.

---

## Módulo: Seed Data y migraciones

`seedData()` corre solo si `localStorage['finanzasmx_v2_v'] !== SEED_VER` (hoy `'23'`): **borra**
`localStorage[KEY]` y siembra 6 meses de transacciones de ejemplo más los lotes reales,
presupuestos, deudas, metas, inversiones, activos e historial BTC. **Las deudas salen de
`CIFRAS.DEUDAS_SEED`** y el BTC de `CIFRAS.BTC_SEED` (copia profunda): si el `<script src>` fallara,
siembra sin deudas y avisa por `console.error`, mejor que sembrar una copia vieja escondida aquí.
Al terminar marca todas las banderas de migración (las suyas y las del maestro) para que ninguna
corrección histórica pise un seed más nuevo.

**Bumpear `SEED_VER` es para cambios estructurales**; es demasiado destructivo para "este saldo
cambió". Para eso, **migraciones puntuales**: un `if` después de `load()` con **bandera propia en
`localStorage`** (nunca comparación de igualdad con el valor viejo: el saldo pudo moverse por el
uso normal y la comparación no dispara), que corrige y no vuelve a tocar, así que si Adán paga
por su cuenta después no se lo revierte. **Las nuevas van a `MIGRACIONES` en
`datos-maestros.js`**, nunca aquí; las anteriores al 2026-08-24 (`_banamex9k`, `_pagos20260813`,
`_msibbva20260813`, `_ahorro20260817`) siguen en `init()`, inertes. **Toda migración de
`finanzasmx_v2` existe en las dos apps** (Dashboard la replica) porque Adán suele abrir el
Dashboard primero.

`init()`: `seedData()` → `load()` → migraciones → crea `ef-001` si falta → `dashMonth = nowYM()` →
fecha del topbar → `f-month` → listener de resize (`#menuBtn` bajo 640 px) → `renderDashboard()` →
auto-fetch del precio BTC si tiene más de 15 minutos y hay historial.

---

## Módulo: Patrimonio Neto

`renderPatrimonio()`: financieros (`investments` + BTC en MXN), líquidos (`activos` tipo
`liquido`), físicos (el resto); 3 KPIs, listas con barras y edición inline, pasivos por deuda y
dónut `ch-pat`. `openActivoModal` (tipos `liquido | vehiculo | electronico | inmueble | joyeria |
mueble | otro`), `saveActivo`, `delActivo`.

Aquí el patrimonio sí suma los físicos. **El del proyecto no**: `patrimonioNeto()` del Dashboard y
Coach suman `investments + emergencyFund − debts`, porque la meta del millón se mide en dinero
disponible y el punto de partida histórico se calculó así. Las dos cifras son distintas a propósito.

---

## Módulo: Bitcoin

**Un punto por día**, eje temporal lineal en milisegundos, pesos por defecto, y cada aportación
con su línea vertical y su monto. Lo que eso evita: un eje categórico por compra dibuja el orden
y no el tiempo; valuar todo el historial al precio de hoy reescribe el pasado; y una aportación
como punto más no se distingue de una subida de precio.

**Compras y ventas.** Una entrada de `btcHistory` puede ser venta: `tipo:'venta'`, `btc`
**negativo**, `usd` lo que entró. `btcEsVenta(h)`, `btcCompras(hist)`, `btcVentas(hist)` las
separan, y la regla es una: **lo aportado y el precio promedio salen solo de las compras; una
venta resta ₿ y suma a "retirado"**. P&L = `vale hoy + retirado − aportado`. En pantalla: botón
**− Venta** junto a **+ Compra** (mismo modal, `btcTipoUI()` cambia rótulos y no deja vender más ₿
de los que hay), fila roja en la tabla, lectura **Ya retirado**, triángulo invertido rojo sobre la
curva con su marca con signo.

**El tipo de cambio vive con la compra**: `btcFxDe(h)` = `h.fx` o `S.usdMxn`. Un valor de **hoy**
(lo que vale, el P&L) se convierte con `fxNow`; lo **aportado** con el fx de su día. Mezclarlos
hacía que el histórico entero se moviera cada vez que el peso se movía. Las operaciones del
maestro traen su `fx` y una migración se lo pone a las que ya estaban sin él.

- **`btcSerie()`** construye la serie diaria desde la primera compra: `{pts, compras, ventas, t0,
  tEnd, reales, dias}`, cada `pt` con `{t, btc, aMxn, aUsd, rMxn, rUsd, vMxn, vUsd, pMxn, pUsd}`.
  El precio de cada día interpola entre anclas, de menos a más fiable: el precio anotado en cada
  compra → el histórico de CoinGecko (`S.btcPriceHist`) → el precio de hoy. Sin histórico la
  curva entre compras es una recta, **y la leyenda lo dice** (`reales/dias` mide la cobertura).
- **Plugins inline** (diez líneas de canvas cada uno, sin `<script>` de CDN): `btcGridPlugin`
  (retícula punteada; Chart.js 4 no deja puntear la rejilla; en `beforeDatasetsDraw`, ambas
  escalas con `grid:{display:false}`), `btcAportPlugin` (vertical ámbar que se apaga hacia abajo y
  etiqueta con esquinas cortadas en `layout.padding.top`, **fuera** del área; si dos quedan a
  menos de 64 px la segunda no se dibuja), `btcGlowPlugin` (`ctx.shadowBlur` solo en los datasets
  1 y 2), `btcCrossPlugin` (cursor cian **continuo**: las ámbar punteadas ya significan "aquí
  aportaste"), `btcNowPlugin` (el punto de hoy como faro; `layout.padding.right` existe por él).
  Pintan con `btcAcc` y `btcGlow`, que `renderBtcHistory()` **relee del tema en cada render**. Los
  degradados se crean con `createLinearGradient` sobre el alto y ancho reales del contenedor
  (el `chartArea` aún no existe).
- **`fetchBtcHistory(auto)`**: `market_chart?vs_currency=mxn&days=365`, guardado **recortado al
  rango que la gráfica dibuja**. Con `auto` (al abrir, si el guardado tiene más de un día) va en
  silencio, 1.5 s después del precio actual (CoinGecko limita por minuto). Si falla, toast y la
  curva se queda reconstruida.
- **`renderBtcHistory()`**: inputs de precio y tipo de cambio + `fetchBtcPrice()`, la gráfica
  `btc-ch-pnl` con toggle MXN/USD (`setBtcCur`, persiste en `btc_cur`) y botón 📈 **Precio
  real**, seis lecturas `.btcx-kpi` en la moneda activa con la otra de subtítulo, tabs por mes
  con P&L (`switchBtcTab`) y tabla histórica **siempre en las dos monedas** (es el registro, no la
  vista). KPIs USD: `totalBtc` (compras − ventas), `totalUsd` (compras), `avgPrice`, `retUsd`,
  `curVal`, `pnl`, `pnlPct`; MXN: `invMxn` (cada compra a su fx), `retMxn`, `valMxn`, `pnlMxn`.
  La banda vieja de 5 tarjetas en dólares queda oculta cuando hay precio; es la única vista
  cuando no lo hay.
- `openBtcModal(id, tipo)`, `calcBtc()` (`btc = usd / precio`), `saveBtcPurchase()` (8 decimales,
  negativo si es venta, guarda `fx` y `tipo`), `delBtc(id)`, `updateBtcPrice`, `updateUsdMxn`.

---

## Estructura de datos — ejemplos

```js
// Transacción
{ id, type:'expense'|'income', desc, amount, date:'YYYY-MM-DD', cat, notes }
// Presupuesto
{ id, cat, limit }
// Deuda   type: credit_card | loan | mortgage | car | other · rate 0 = MSI · noInterest: monto para no generar intereses
{ id:'d001', name:'Tarjeta BBVA', type:'credit_card', total, balance, rate, min, day, start, noInterest }
// Meta    ids especiales: 'ef-001' fondo de emergencia, 'g001' maestría, 'g002' reservada
{ id, name, target, current, date, icon }
// Inversión   type: cetes | fondos | acciones | crypto | inmuebles | deuda | otro
{ id, name, type, invested, value, date, rate }
// Activo      type: liquido | vehiculo | electronico | inmueble | joyeria | mueble | otro
{ id, name, type, value, notes }
// Operación BTC
{ id, date, usd, btcPrice, btc, fx, tipo:'venta'?, notes }
```

---

## Modo oscuro/claro · Responsivo · Enlace al Dashboard

Toggle 🌙/☀️ persistido en **`coach-theme`**, la misma clave que Coach y el Dashboard; se aplica
como `data-theme` en `<html>` antes de pintar. Se verifica a **1600 y 390 px**: sidebar tras ☰
bajo 640 px, tablas con scroll interno, KPIs a una columna, nunca scroll horizontal. El enlace al
Dashboard (`#btnVolverDash`, 🚀) es un botón `.theme-toggle-btn` en `.topbar-actions`, nunca
flotante.

---

## Referencias cruzadas

- [`../Dashboard/DATOS-MAESTROS.md`](../Dashboard/DATOS-MAESTROS.md) — catálogo de variables y saldos de hoy
- [`../Dashboard/readme_dashboard.md`](../Dashboard/readme_dashboard.md) — quién consume estos datos
- [`../Coach/readme_coach.md`](../Coach/readme_coach.md) — el Plan Maestro que se apoya en ellos
- `../../CLAUDE.md` — las reglas del proyecto

## Verificar un cambio

```bash
node Dashboard/verificar-sincronia.js      # desde Claude_Proyecto/
```

Y en navegador a 1600 y 390 px con `file:///`. Para probar migraciones hay que sembrar
`finanzasmx_v2` **y** `finanzasmx_v2_v` con el `SEED_VER` actual: sin esa bandera, `seedData()`
resiembra y lo que se mide es un reseed.
