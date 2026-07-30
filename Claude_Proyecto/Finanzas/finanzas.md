# Finanzas.html — Contexto completo de funciones y estructura

App de finanzas personales en un solo archivo HTML (3981 líneas). Usa Chart.js 4.4 para gráficas y localStorage (`finanzasmx_v2`) para persistencia. Todo en MXN.

---

## Estado global — objeto `S`

```js
S = {
  transactions:   [],       // array de transacciones
  budgets:        [],       // array de presupuestos
  debts:          [],       // array de deudas
  goals:          [],       // array de metas de ahorro
  investments:    [],       // array de inversiones
  activos:        [],       // array de activos físicos
  btcHistory:     [],       // historial de compras BTC
  currentBtcPrice: 0,       // precio actual BTC en USD
  usdMxn:         19.5,     // tasa de cambio USD/MXN
  btcLastFetch:   '',       // ISO timestamp del último fetch de BTC
  weeklyLeftover:  0,       // sobrante semanal manual para GBM+
  sivaleBalance:   0,       // saldo acumulado tarjeta Si Vale
  sivaleLastMonth: '',      // YYYY-MM del último mes agregado Si Vale
  emergencyFund:   0,       // saldo del fondo de emergencia BBVA
  didiMonthly:     0,       // ingreso mensual real de Didi (0 = usar estimado $11,200)
  gbmMonth:       '',       // YYYY-MM seleccionado en Plan de Inversiones
}
```

Variables globales adicionales: `editId`, `confCb`, `payDebtId`, `contribGoalId`, `btcEditId`, `activoEditId`, `curType` (expense|income), instancias de Chart (`chCat`, `chBal`, `chBud`, `chInv`, `chGbmInv`, `chBtcPnl`, `chPat`), `dashMonth`.

---

## Constantes importantes

### Categorías (`CATS`)
- **expense**: Alimentación, Transporte, Hogar/Renta, Salud, Entretenimiento, Educación, Ropa, Servicios, Suscripciones, Restaurantes, Viajes, Deudas, Otros gastos
- **income**: Salario, Freelance/Honorarios, Inversiones, Renta/Propiedades, Bonos, Regalos, Otros ingresos

### Gastos fijos hardcodeados (usados en `renderGBM` y `getMonthProjection`)
| Concepto             | Monto MXN | Semana / Fecha |
|----------------------|-----------|----------------|
| Salario BBVA         | $43,000   | Quincenal      |
| Didi (estimado)      | $11,200   | Semanal (~$2,800/sem) |
| Renta departamento   | $11,000   | Día 1          |
| Crédito Dolphin Mini | $6,700    | Día 14         |
| Celular (datos)      | $600      | Día 15 (Sem 3) |
| Gym                  | $1,500    | Día 15 (Sem 3) |
| TC BBVA mínimo       | $1,500    | Día 15 (Sem 3) |
| TC Banamex mínimo    | $810      | Día 15 (Sem 3) |
| Internet             | $200      | Día 15 (Sem 3) |
| Gas                  | $179      | Día 15 (Sem 3) |
| Claude Code          | $380      | Día 15 (Sem 3) |
| Agua y luz           | $135      | Día 15 (Sem 3) |
| Limpieza             | $150      | Día 15 (Sem 3) |
| iCloud               | $50       | Día 15 (Sem 3) |
| CETES recurrente     | $1,500    | Día 15         |
| Si Vale (display)    | $940      | Día 1 (no suma al flujo) |

### Meta Maestría
- **Target**: $500,000 MXN para **01 oct 2027** (verificado 2026-07-29 contra el seed en código — el dato anterior de este documento, $300,000/dic 2027, estaba desactualizado)
- **ID de meta**: `g001` (o `icon === '🎓'`)
- **Componentes que cuentan**: Fondo de emergencia + CETES + Acciones/inversiones + BTC en MXN
- Nota de contexto (ver `../Coach/README.md` → Plan Maestro): en julio 2026 se decidió pausar nuevas aportaciones a esta meta por 1 año; confirmar contra el `date` real en `S.goals` antes de asumir que sigue vigente tal cual, ya que este tipo de decisión vive en Coach, no en el código de Finanzas.

### WEEKLY_PICKS (actualizar cada lunes pidiendo a Claude)
```js
const WEEKLY_PICKS = {
  semana: '23 Jun 2026',
  acciones: [
    { ticker:'MSFT', pct:70, tipo:'conservadora' },  // 70% del sobrante
    { ticker:'NVDA', pct:30, tipo:'crecimiento'  },  // 30% del sobrante
  ]
}
```

### Fondo de emergencia
- **Target fijo**: $10,000 MXN (constante `EF_TARGET` en `renderDashboard`)
- **ID en metas**: `ef-001`

---

## Funciones utilitarias

### `fmt(n)`
Formatea un número como moneda MXN con `Intl.NumberFormat`. Ej: `fmt(1500)` → `"$1,500.00"`.

### `uid()`
Genera un ID único con `Date.now().toString(36) + Math.random().toString(36)`.

### `today()`
Retorna la fecha actual en formato `YYYY-MM-DD`.

### `ym(d)`
Extrae los primeros 7 caracteres de una fecha: `"2026-06-28"` → `"2026-06"`.

### `nowYM()`
Retorna el mes actual en formato `YYYY-MM`.

### `save()`
Serializa `S` a JSON y lo guarda en `localStorage[KEY]` (`KEY = 'finanzasmx_v2'`).

### `load()`
Lee `localStorage[KEY]` y mezcla sobre `S` con spread. Silencia errores.

### `fmtDate(d)`
Convierte `"2026-06-28"` → `"28 Jun 2026"` en español.

### `last6Months()`
Retorna array de 6 strings `YYYY-MM` de los últimos 6 meses, del más antiguo al más reciente.

### `toast(msg)`
Muestra notificación flotante en la esquina inferior derecha durante 2.5 segundos.

### `killChart(c)`
Llama a `.destroy()` en una instancia de Chart.js y retorna `null`. Se usa antes de redibujar cualquier gráfica.

---

## Navegación

### `nav(s)`
Activa la sección de la app (`dashboard`, `transactions`, `budgets`, `debts`, `goals`, `patrimonio`, `indicators`, `gbm`). Muestra/oculta `<section id="s-{s}">`, marca el nav item activo y llama al renderer correspondiente via `RENDERS[s]()`.

---

## Modales

### `closeMo(id)`
Quita la clase `open` del modal con ese ID y resetea `editId`, `payDebtId`, `contribGoalId`, `btcEditId`, `activoEditId` a `null`.

Eventos globales:
- `Escape` cierra todos los modales abiertos.
- Click en el backdrop (`.mo`) cierra el modal.

---

## Módulo: Transacciones

### `getTx()`
Lee los filtros activos en el DOM (`f-search`, `f-type`, `f-cat`, `f-month`) y retorna el subconjunto de `S.transactions` ordenado por fecha descendente.

### `renderTx()`
Renderiza la tabla de transacciones. Reconstruye el selector de categorías con las categorías presentes. Muestra badges de resumen (ingresos, gastos, balance del filtro activo). Genera filas con botones de editar y eliminar.

### `clearF()`
Limpia los campos de búsqueda, tipo, categoría y establece el mes en el mes actual. Llama a `renderTx()`.

### `openTxModal(id=null)`
Abre el modal `mo-tx`. Si `id` existe, carga los datos de esa transacción para edición. Establece la fecha al día de hoy si es nueva. Enfoca el campo de descripción.

### `selType(type)`
Cambia `curType` entre `'expense'` e `'income'`. Actualiza visualmente los botones del modal y regenera el select de categorías via `fillCatSel`.

### `fillCatSel(selId, type, selected=null)`
Rellena el `<select>` con las categorías de `CATS[type]`. Marca como seleccionada la categoría indicada si existe.

### `saveTx()`
Valida descripción, monto y fecha. Si `editId` existe actualiza; si no, hace push a `S.transactions`. Llama a `save()`, cierra el modal, refresca la tabla, muestra toast y refresca el dashboard/indicadores si están activos.

### `delTx(id)`
Filtra `S.transactions` eliminando el `id`. Guarda, refresca tabla, refresca dashboard e indicadores si están activos.

---

## Módulo: Presupuestos

### `spentCat(cat, month)`
Suma el total de gastos de la categoría `cat` en el mes `month` (YYYY-MM) leyendo `S.transactions`.

### `renderBudgets()`
Renderiza cada presupuesto en `bud-list` con barra de progreso (verde <70%, amarillo <90%, rojo ≥90%) y alerta si está excedido. Llama a `renderBudgetChart()`.

### `renderBudgetChart()`
Dibuja gráfica de barras comparando gastado vs. límite por categoría en el mes actual. Destruye instancia anterior si existe.

### `openBudgetModal(id=null)`
Abre `mo-bud`. Si `id` existe, carga datos del presupuesto para edición.

### `saveBudget()`
Valida que exista un límite. Si es nuevo, verifica que no exista ya un presupuesto para esa categoría. Guarda y refresca.

### `delBudget(id)`
Elimina presupuesto por `id`, guarda y refresca.

---

## Módulo: Deudas

### `renderDebts()`
Renderiza KPIs (deuda total, pagos mínimos/mes, tasa promedio) y las tarjetas individuales de cada deuda con barra de progreso de pago. Si la deuda tiene `noInterest`, muestra bloque especial de "paga antes del día X".

### `openDebtModal(id=null)`
Abre `mo-debt`. Si `id` existe, carga todos los campos de la deuda.

### `saveDebt()`
Recoge todos los campos del formulario. Actualiza o inserta en `S.debts`. Llama a `maybeRefreshIndicators()`.

### `delDebt(id)`
Elimina deuda por `id`. Llama a `maybeRefreshIndicators()`.

### `openPayModal(debtId)`
Abre `mo-pay`. Pre-llena el monto con el pago mínimo de la deuda y la fecha con hoy.

### `savePayment()`
Resta el monto al saldo de la deuda (`Math.max(0, balance - amount)`). Agrega automáticamente una transacción de tipo `expense` en categoría `Deudas` con descripción `"Pago: {nombre}"`. Guarda, refresca deudas y dashboard.

---

## Módulo: Metas de ahorro

### `renderGoals()`
Excluye la meta `g002` (reservada). Muestra todas las otras metas con barra de progreso, porcentaje alcanzado, días restantes y botones para aportar/editar/eliminar.

### `openGoalModal(id=null)`
Abre `mo-goal`. Carga datos si existe `id`.

### `saveGoal()`
Valida nombre y monto objetivo. Guarda o actualiza en `S.goals`.

### `delGoal(id)`
Filtra `S.goals` eliminando el `id`. No afecta al fondo de emergencia (`ef-001`).

### `openContribModal(goalId)`
Abre `mo-contrib`. Muestra el nombre de la meta y limpia el campo de monto.

### `saveContrib()`
Suma la aportación al `current` de la meta sin superar el `target`. Si la meta es `ef-001` también actualiza `S.emergencyFund`.

---

## Módulo: Inversiones

### `openInvModal(id=null)`
Abre `mo-inv`. Carga datos de la inversión si existe `id`. Tipos disponibles: `cetes`, `fondos`, `acciones`, `crypto`, `inmuebles`, `deuda`, `otro`.

### `saveInv()`
Valida nombre y capital invertido. Si `value` no se especifica, lo iguala al `invested`. Guarda, cierra modal, refresca GBM si está activo, y llama a `maybeRefreshIndicators()`.

### `delInv(id)`
Elimina inversión por `id`. Refresca GBM si está activo e indicadores.

---

## Módulo: Plan de Inversiones (GBM)

### `renderGBM()`
Función central del módulo. Calcula:
- `QUINC = $21,500` (mitad del salario mensual)
- `weeklyDidi = $11,200 / (52/12) ≈ $2,585/semana`
- `msiActive` = suma de cuotas de deudas a 0% aún vigentes
- `avgExpTotal` = promedio de gastos reales de los últimos 3 meses reales (no el mes seleccionado)
- `varPerWeek` = (gastos variables estimados) / 4
- **Sobrante semanal por semana:**
  - `w1GBM = QUINC - RENTA - AUTO - varPerWeek + weeklyDidi`
  - `w2GBM = weeklyDidi`
  - `w3GBM = QUINC - CETES - SERVICIOS - SUSCRIPCIONES - TC_MINS - msiActive - varPerWeek + weeklyDidi`
  - `w4GBM = weeklyDidi`
- Tabs de meses: mes actual + 4 meses siguientes (proyección)
- `efectivoSemana`: usa `S.weeklyLeftover` si > 0, o el estimado automático de la semana actual
- Distribuye `efectivoSemana` entre las acciones de `WEEKLY_PICKS` según su `pct`
- Renderiza portafolio actual con KPIs (valor total, capital, P&L, ROI, antigüedad promedio)
- Proyecciones a 12 meses (sin rendimiento y con +15%)
- Tabla resumen por tipo de activo
- Bloque de CETES recurrente
- Llama a `renderBtcHistory()` al final

### `switchGBMTab(n)`
Muestra el panel de la semana `n` (1-4) y oculta los demás. Actualiza estilos visuales de los tabs.

### `setWeeklyLeftover(val)`
Guarda `S.weeklyLeftover = parseFloat(val) || 0`. Guarda y llama a `renderGBM()`.

### `addSivaleMonth()`
Suma $940 a `S.sivaleBalance` y establece `S.sivaleLastMonth = nowYM()`. Refresca dashboard.

### `undoSivaleMonth()`
Resta $940 de `S.sivaleBalance` (mínimo 0) y limpia `S.sivaleLastMonth`. Refresca dashboard.

### `setSivaleBalance(val)`
Establece `S.sivaleBalance` directamente. Guarda y refresca dashboard.

### `setDidiMonthly(val)`
Establece `S.didiMonthly`. Valor 0 = usar estimado ($11,200). Guarda y refresca dashboard.

### `setGbmMonth(m)`
Establece `S.gbmMonth = m` (YYYY-MM). Guarda y llama a `renderGBM()`.

### `setEmergencyFund(val)`
Establece `S.emergencyFund`. Sincroniza `current` de la meta `ef-001` si existe. Guarda, refresca dashboard e indicadores.

### `maybeRefreshIndicators()`
Solo llama a `renderIndicators()` si la sección `s-indicators` tiene la clase `active`.

---

## Módulo: Indicadores Financieros

### `renderIndicators()`
Calcula y renderiza 9 indicadores financieros en la sección `ind-body`.

**Inputs:**
- `BASE_INC = 43000 + (didiMonthly > 0 ? didiMonthly : 11200)` — Si Vale excluido
- Activos: financieros (investments + BTC en MXN), líquidos (activos tipo 'liquido'), físicos (resto de activos)
- Pasivos: suma de `balance` de todas las deudas

**Indicadores calculados:**
| Indicador | Fórmula | Verde | Amarillo | Rojo |
|-----------|---------|-------|----------|------|
| DTI (carga deuda) | Σ mín mensuales / ingreso × 100 | <20% | 20-40% | >40% |
| Tasa de ahorro | (ingreso - gasto prom.) / ingreso × 100 | >20% | 10-20% | <10% |
| Fondo emergencia | meses de gastos cubiertos + % de meta | ≥6 meses o 100% | 50-75% | <50% |
| Deuda vs activos | deuda total / activos × 100 | <30% | 30-60% | >80% |
| Solvencia | activos / deuda | ≥3x | 1.5-3x | <1x |
| Multiplicador deuda | deuda / ingreso anual | <1x | 1-2x | >4x |
| ROI portafolio | (valor - capital) / capital × 100 | >10% | 0-10% | <0% |
| Inversión vs ingreso anual | activos fin. / ingreso anual | ≥25x (indep.) | ≥1x | <0.5x |
| Patrimonio neto | activos totales - deudas | >0 | — | <0 |

**Score financiero** (0-100, con letra A-F):
- DTI: peso 28%
- Tasa de ahorro: peso 24%
- Fondo emergencia: peso 20%
- Deuda vs activos: peso 16%
- Solvencia: peso 12%

**Progreso Meta Maestría** (barra segmentada):
`(Fondo emergencia + CETES + Acciones + BTC) / $300,000 × 100`

---

## Módulo: Proyección y Recurrentes

### `getMonthProjection(month)`
Para meses futuros. Construye lista de gastos fijos del mes (renta, CETES, gym, servicios, suscripciones, deudas con interés, deudas tipo 'car', y cuotas MSI vigentes). Calcula el promedio de gastos variables de las 3 categorías (`Alimentación`, `Restaurantes`, `Entretenimiento`) de los últimos 3 meses reales. Retorna `{inc, fixedExp, varExp, fixed, varItems, totalExp, balance}`.

### `loadRecurringForMonth(month)`
Genera transacciones con `notes: '[recurrente]'` para el mes dado:
- Ingresos: Salario $43,000 y Si Vale $940 (día 1)
- Gastos fijos: renta, agua, internet, celular, gas, limpieza, gym, Claude, iCloud
- Deudas con interés y crédito automotriz (día 1)
- Cuotas MSI vigentes (día 16)
Si ya existen recurrentes para ese mes, pide confirmación para reemplazar.

### `removeRecurringForMonth(month)`
Elimina todas las transacciones del mes que tengan `notes === '[recurrente]'`. Pide confirmación.

---

## Módulo: Dashboard

### `setDashMonth(ym)`
Establece `dashMonth = ym` y llama a `renderDashboard()`.

### `renderDashboard()`
Función principal del dashboard. Determina si el mes es futuro (`isFuture`) y obtiene proyección si aplica.

**Ingresos base calculados:**
- `BASE_SALARY = 43000`
- `BASE_DIDI = S.didiMonthly > 0 ? S.didiMonthly : 11200`
- `BASE_INC = BASE_SALARY + BASE_DIDI` (Si Vale excluido del flujo)
- `extras` = transacciones de ingreso del mes que NO son salario, didi, ni vale (ej. PTU, bonos)

**Renderiza:**
- Tabs de meses (mes actual hasta diciembre del año en curso)
- Banner de proyección para meses futuros con botones de cargar/quitar recurrentes
- Fondo de emergencia con input inline
- 4 KPIs: Balance, Ingresos, Gastos, Activos Totales
- Desglose de ingresos (Salario / Didi / Si Vale / Extras) con inputs inline
- Llama a: `renderInsights`, `renderDashCharts`, `renderSpecials`, `renderSubscriptions`, `renderRecent`, `renderAlerts`

### `renderInsights(inc, exp)`
Renderiza 4 tarjetas en `d-insights`: Patrimonio Neto, Dinero Libre/Mes, Carga de Deuda (DTI), Tasa de Ahorro.

### `renderSpecials(freeMonth, refDate)`
Renderiza 2 paneles en `d-specials`:

**Panel 1 — Maestría en Alemania:**
- Barra segmentada de activos actuales hacia $300,000
- Calcula `monthlyNeeded` = monto mensual necesario para llegar en dic 2027
- 5 escenarios: ahorrar 100%, 70%, mínimo exacto, 50%, 30% del dinero libre
- Cada escenario muestra fecha estimada de llegada y si es antes/a tiempo/tarde

**Panel 2 — Hoja de Ruta de Deudas:**
- Cuotas 0% MSI: barra de progreso y fecha de liquidación
- Tarjetas de crédito con interés: progreso y meses estimados
- Crédito automotriz: progreso y tip de "paga $1,000 extra para terminar antes"
- Deudas proyectadas al mes seleccionado usando `pb(d) = Math.max(0, d.balance - monthsFromNow * d.min)`

### `renderDashCharts(mtx)`
Dibuja 2 gráficas:
- **`ch-cat`** (donut): gastos del mes actual agrupados por categoría con colores de `CCOLORS`
- **`ch-bal`** (línea): balance, ingresos y gastos de los últimos 6 meses

### `renderSubscriptions(refDate)`
Renderiza el panel `d-subs` con 2 columnas:
- **Recurrentes sin fin**: Claude Code, iCloud, Gym, Internet, Celular, Gas (hardcodeados, ordenados por monto)
- **Cuotas MSI activas**: lee `S.debts` filtrando `rate===0 && type==='other' && start`, calcula meses restantes con barra de progreso y fecha de término. Urgencia: verde ≤1 mes, amarillo ≤3 meses, azul resto.

### `renderRecent()`
Muestra las últimas 7 transacciones ordenadas por fecha en `d-recent`.

### `renderAlerts()`
Filtra presupuestos con ≥70% de uso en el mes actual. Muestra alertas amarillas (70-100%) o rojas (>100%) en `d-alerts`.

---

## Módulo: Confirmación

### `askDel(type, cb)`
Guarda el callback en `confCb` y abre el diálogo `conf` con el tipo indicado.

### `doConf()`
Ejecuta `confCb()` y llama a `closeConf()`.

### `closeConf()`
Quita clase `open` del diálogo y resetea `confCb = null`.

---

## Módulo: Export / Import

### `exportData()`
Crea un Blob JSON con `S`, genera un enlace de descarga con nombre `finanzas_YYYY-MM-DD.json` y hace clic automático.

### `importData(input)`
Lee el archivo seleccionado con `FileReader`. Si es JSON válido, pide confirmación y reemplaza todo `S`. Resetea el input al terminar.

---

## Módulo: Seed Data

### `seedData()`
Solo se ejecuta si `localStorage['finanzasmx_v2_v'] !== SEED_VER` (actualmente `'22'`). Borra el estado anterior e inyecta datos de ejemplo con 6 meses de transacciones (ene-jun 2026), presupuestos, deudas reales, metas, inversiones, activos físicos e historial BTC. Incrementar `SEED_VER` para forzar re-seed.

---

## Módulo: Patrimonio Neto

### `renderPatrimonio()`
Calcula activos en 3 categorías:
- **Financieros**: `S.investments` + BTC en MXN (`btcHeld × btcPrice × usdMxn`)
- **Líquidos**: `S.activos` con `type === 'liquido'`
- **Físicos**: `S.activos` con `type !== 'liquido'`

Renderiza 3 KPIs, lista de activos financieros con barras de % del total, activos líquidos y físicos con edición inline, resumen de pasivos por deuda, y gráfica donut de distribución (`ch-pat`).

### `openActivoModal(id=null)`
Abre `mo-activo`. Tipos: `liquido`, `vehiculo`, `electronico`, `inmueble`, `joyeria`, `mueble`, `otro`.

### `saveActivo()`
Valida nombre y valor. Crea o actualiza en `S.activos`. Llama a `maybeRefreshIndicators()`.

### `delActivo(id)`
Filtra `S.activos`. Llama a `maybeRefreshIndicators()`.

---

## Módulo: Bitcoin (BTC)

### `renderBtcHistory()`
Renderiza el panel completo de BTC en `btc-history` dentro del Plan de Inversiones.

**KPIs calculados:**
- `totalBtc` = suma de `btc` en todo el historial
- `totalUsd` = suma de `usd` invertidos
- `avgPrice` = `totalUsd / totalBtc` (precio promedio de compra)
- `curVal` = `totalBtc × currentBtcPrice`
- `pnl` = `curVal - totalUsd`
- `pnlPct` = `pnl / totalUsd × 100`

**Renderiza:**
- Inputs inline de precio BTC y tasa USD/MXN
- Botón "Actualizar precio" → llama a `fetchBtcPrice()`
- KPIs de portafolio total
- Tabs por mes con P&L de cada período
- Gráfica de área acumulada (invertido vs. valor actual) → `btc-ch-pnl`
- Tabla histórica por compra con botones editar/eliminar

### `switchBtcTab(key)`
Muestra el pane del tab `key` ('resumen' o 'YYYY-MM') y oculta los demás. Actualiza estilos.

### `fetchBtcPrice()`
`async`. Llama a `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,mxn`. Actualiza `S.currentBtcPrice`, `S.usdMxn` y `S.btcLastFetch`. Refresca BTC history, dashboard, indicadores y patrimonio. Maneja errores con toast.

### `updateBtcPrice(val)`
Actualiza `S.currentBtcPrice` manualmente (desde input). Refresca todas las vistas afectadas.

### `updateUsdMxn(val)`
Actualiza `S.usdMxn` manualmente (desde input). Refresca todas las vistas afectadas.

### `openBtcModal(id=null)`
Abre `mo-btc`. Si `id` existe carga datos para edición.

### `calcBtc()`
Calcula automáticamente `btc-received = btc-usd / btc-price-at` cuando el usuario edita los campos.

### `saveBtcPurchase()`
Valida fecha, USD y precio BTC. Calcula `btc = usd / btcPrice` con 8 decimales. Guarda en `S.btcHistory`.

### `delBtc(id)`
Filtra `S.btcHistory` y llama a `renderBtcHistory()`.

---

## Inicialización

### `init()`
Se ejecuta al cargar la página:
1. Llama a `seedData()` (solo si es primera vez o SEED_VER cambió)
2. Llama a `load()` para cargar datos de localStorage
3. Crea meta `ef-001` (fondo de emergencia) si no existe
4. Establece `dashMonth = nowYM()`
5. Escribe la fecha actual en el topbar
6. Establece `f-month` al mes actual en el filtro de transacciones
7. Configura listener de resize para mostrar/ocultar botón de menú móvil
8. Llama a `renderDashboard()`
9. Hace auto-fetch del precio BTC si tiene más de 15 minutos sin actualizarse (y hay historial BTC)

---

## Estructura de datos — Ejemplos

### Transacción
```js
{ id: 'abc123', type: 'expense', desc: 'Supermercado', amount: 2500,
  date: '2026-06-05', cat: 'Alimentación', notes: '' }
```

### Presupuesto
```js
{ id: 'b001', cat: 'Alimentación', limit: 3000 }
```

### Deuda
```js
{ id: 'd001', name: 'Tarjeta BBVA', type: 'credit_card',
  total: 32343.31, balance: 32343.31, rate: 10, min: 1500,
  day: 11, start: '2024-01-22', noInterest: 0 }
// type: credit_card | loan | mortgage | car | other
// rate: 0 = MSI sin intereses
// noInterest: monto a pagar para no generar intereses
// remainingMonths: meses restantes (opcional, usado por auto)
```

### Meta de ahorro
```js
{ id: 'g001', name: 'Maestría en Alemania', target: 300000,
  current: 53740, date: '2027-12-01', icon: '🎓' }
// id especiales: 'ef-001' = fondo de emergencia, 'g001' = maestría
```

### Inversión
```js
{ id: 'i002', name: 'CETES', type: 'cetes', invested: 3000,
  value: 3000, date: '2026-04-20', rate: 11 }
// type: cetes | fondos | acciones | crypto | inmuebles | deuda | otro
```

### Activo físico
```js
{ id: 'ac001', name: 'BYD Dolphin Mini', type: 'vehiculo',
  value: 415000, notes: 'Precio de compra' }
// type: liquido | vehiculo | electronico | inmueble | joyeria | mueble | otro
```

### Compra BTC
```js
{ id: 'btc001', date: '2025-02-01', usd: 200,
  btcPrice: 102007, btc: 0.001960, notes: 'Primera compra' }
```

---

## Flujo semanal de inversión (lógica GBM)

```
Semana 1 (días 1-7):
  IN:  Quincena 1 ($21,500) + Didi semanal
  OUT: Renta ($11,000) + Reserva auto ($6,700) + gastos variables
  → GBM: sobrante → MSFT 70% / NVDA 30%

Semana 2 (días 8-14):
  IN:  Didi semanal
  OUT: Dolphin Mini ($6,700) del saldo reservado
  → GBM: Didi íntegro → MSFT 70% / NVDA 30%

Semana 3 (días 15-21):
  IN:  Quincena 2 ($21,500) + Didi semanal
  OUT: CETES ($1,500) + Servicios ($1,264) + Suscripciones ($1,930)
       + TC mínimos ($2,310) + MSI activas + gastos variables
  → GBM: sobrante → MSFT 70% / NVDA 30%

Semana 4 (días 22-28):
  IN:  Didi semanal
  OUT: ninguno
  → GBM: Didi íntegro → MSFT 70% / NVDA 30%
```

Si `S.weeklyLeftover > 0`, ese monto manual reemplaza el estimado automático en la semana actual.

---

## Referencias cruzadas

- El **Dashboard** (`../Dashboard/dashboard.html`) lee `finanzasmx_v2` directamente (`D.fin`): usa `investments`, `emergencyFund`, `debts` (patrimonio neto, fondo de emergencia, deuda total del slide "💰 Finanzas") y `transactions` del mes actual (ingresos/gastos, score de finanzas del Vida Score). Si cambias la forma de `S.investments`/`S.debts`/`S.transactions`/`S.emergencyFund` aquí, revisa `patrimonioNeto()`, `hasFinData()`, `calcScores()` y `renderFinanzas()` en `Dashboard/dashboard.html`.
- No tiene enlace "Volver al Dashboard" en el sidebar todavía a la fecha de esta nota (2026-07-29) — pendiente de agregar si se retoma este archivo.
- Mapa completo del proyecto: [`../README.md`](../README.md).
- **Este documento no se ha vuelto a auditar por completo desde su creación** — se corrigió un dato desactualizado (meta Maestría) el 2026-07-29 al escribir el README maestro del proyecto, pero el resto del contenido no se verificó línea por línea contra el código actual. Verificar contra `Finanzas.html` antes de asumir como hecho cualquier cifra específica de este documento.
