# Finanzas.html — Contexto completo de funciones y estructura

App de finanzas personales en un solo archivo HTML (4340 líneas). Usa Chart.js 4.4 para gráficas y localStorage (`finanzasmx_v2`) para persistencia. Todo en MXN.

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
| Salario BBVA         | $41,000   | Quincenal      |
| Didi (estimado)      | $11,200   | Ya no forma parte del flujo GBM — ver nota abajo |
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
- Nota de contexto (ver `../Coach/readme_coach_v2.md` → Plan Maestro): en julio 2026 se decidió pausar nuevas aportaciones a esta meta por 1 año; confirmar contra el `date` real en `S.goals` antes de asumir que sigue vigente tal cual, ya que este tipo de decisión vive en Coach, no en el código de Finanzas.

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
⚠️ **Desactualizado a la fecha de esta revisión (2026-08-01)** — `semana`/`actualizadoEl` siguen en "23 Jun 2026", ~5-6 semanas atrás. El propio comentario del código pide refrescar esto cada lunes y no se ha hecho; los precios/consensus/upside de MSFT y NVDA que se muestran como "actuales" son de hace más de un mes. No se corrigió en esta revisión porque requiere datos de mercado en vivo (Claude no debe inventar precios de acciones) — pedir explícitamente "actualiza WEEKLY_PICKS con precios de hoy" la próxima vez que se use esta app.

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
Función central del módulo. **Fórmulas verificadas contra el código el 2026-08-01** (versión anterior de este documento tenía Didi metido en las 4 semanas — ya no es así, ver nota "Didi ya no es parte de BASE_INC" más abajo). Calcula:
- `BASE_SALARY = 41000`, `QUINC = Math.round(BASE_SALARY/2) = $20,500` (mitad del salario mensual)
- `msiActive` = suma de cuotas de deudas a 0% aún vigentes
- `avgExpTotal` = promedio de gastos reales de los últimos 3 meses reales (no el mes seleccionado)
- `varPerWeek` = (gastos variables estimados) / 4
- **Sobrante semanal por semana** (`Math.max(0, ...)` en cada una — nunca negativo):
  - `w1GBM = QUINC - RENTA - varPerWeek` (el auto **no** se resta aquí — se paga en la semana 2 del saldo ya reservado en BBVA)
  - `w2GBM = 0` (sin ingreso ni GBM esta semana; el Dolphin Mini se paga del saldo reservado)
  - `w3GBM = QUINC - CETES_DIA15 - SERVICIOS - SUSCRIPCIONES - TC_MINS - msiActive - varPerWeek`
  - `w4GBM = 0` (semana libre, sin pagos ni ingresos programados)
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

### Snapshots mensuales congelados (`S.indicatorHistory`) — documentado 2026-08-01, existía sin documentar

Módulo completo (~450 líneas, función `renderIndicators()` en adelante) que **no estaba documentado aquí** pese a ser funcionalidad real y ya construida:
- `autoSaveCurrentMonthSnapshot()` — cada vez que se abre `#s-indicators`, guarda/sobrescribe automáticamente un snapshot del **mes actual** en `S.indicatorHistory` (array de `{month:'YYYY-MM', score, savedAt, ...indicadores}`). Solo el mes en curso se sobrescribe; los meses ya cerrados quedan congelados.
- Tabs de navegación: "📊 Mes actual" (en vivo, editable) + un botón 🔒 por cada mes histórico ya guardado.
- `switchIndMonth(monthOrLive)` — cambia entre la vista en vivo y la vista congelada de un mes pasado.
- Vista histórica: banner de solo lectura con fecha de guardado y comparación de score "entonces vs. hoy" (↑/↓ puntos) contra el mes actual.
- Útil para responder "¿mi salud financiera mejoró este trimestre?" con datos reales en vez de memoria — vale la pena que Adán sepa que existe, ya que no hay ningún botón que lo anuncie explícitamente, simplemente aparecen tabs nuevas conforme pasan los meses.

### `renderIndicators()`
Calcula y renderiza 9 indicadores financieros en la sección `ind-body`.

**Inputs:**
- `BASE_INC = 41000` (corregido 2026-08-01 — el código ya no suma Didi aquí, ver "Didi ya no es parte de BASE_INC" abajo). Si Vale excluido.
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
Para meses futuros. `BASE_INC = 41000` (sin sumar Didi). Construye lista de gastos fijos del mes (renta, CETES, gym, servicios, suscripciones, deudas con interés, deudas tipo 'car', y cuotas MSI vigentes). Calcula el promedio de gastos variables de las 3 categorías (`Alimentación`, `Restaurantes`, `Entretenimiento`) de los últimos 3 meses reales. Retorna `{inc, fixedExp, varExp, fixed, varItems, totalExp, balance}`.

### `loadRecurringForMonth(month)`
Genera transacciones con `notes: '[recurrente]'` para el mes dado:
- Ingresos: Salario $41,000 y Si Vale $940 (día 1)
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

**Ingresos base calculados** (corregido 2026-08-01 — ver "Didi ya no es parte de BASE_INC" abajo):
- `BASE_SALARY = 41000`
- `BASE_INC = BASE_SALARY` (Si Vale excluido del flujo; Didi ya **no** se suma aquí — se registra como transacción manual de ingreso si ocurre)
- `extras` = transacciones de ingreso del mes que NO son salario ni vale (ej. PTU, bonos, Didi si se registró manualmente)

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
3. **Migraciones puntuales** (ver abajo) — corrigen campos específicos sin tocar el resto de los datos de Adán
4. Crea meta `ef-001` (fondo de emergencia) si no existe
5. Establece `dashMonth = nowYM()`
6. Escribe la fecha actual en el topbar
7. Establece `f-month` al mes actual en el filtro de transacciones
8. Configura listener de resize para mostrar/ocultar botón de menú móvil
9. Llama a `renderDashboard()`
10. Hace auto-fetch del precio BTC si tiene más de 15 minutos sin actualizarse (y hay historial BTC)

### Migraciones puntuales — corregir un dato real sin bumpear `SEED_VER`

`seedData()` solo re-siembra si `SEED_VER` cambió, y cuando lo hace **borra por completo** `localStorage[KEY]` antes de reinyectar el seed (`localStorage.removeItem(KEY)`) — cualquier transacción, deuda o inversión que Adán haya agregado a mano desde el último seed **se pierde**. Bumpear `SEED_VER` es el mecanismo correcto para cambios estructurales del modelo de datos, pero es demasiado destructivo para una corrección puntual tipo "este saldo ya cambió en la vida real".

Para esos casos, `init()` trae un patrón más seguro: un `if` puntual después de `load()` que busca el registro por `id`, verifica que no se haya aplicado ya, lo corrige, y llama a `save()` — sin tocar nada más del objeto `S`. Ya existía uno (`_maeGoal.target===300000` → `500000`, meta de la Maestría). **Ejemplo nuevo, 2026-08-02** (Adán reportó "Banamex ya solo le debo $9,000, pero vendí todas mis acciones de GBM"):

```js
// Migración 2026-08-02: se vendieron todas las acciones de GBM
if(S.investments.find(i=>i.id==='i003')){S.investments=S.investments.filter(i=>i.id!=='i003');save();}
// Migración 2026-08-02b: Banamex a $9,000 real — bandera propia, no comparación de balance
if(!localStorage.getItem(KEY+'_banamex9k')){
  const _banamex=S.debts.find(d=>d.id==='d002');
  if(_banamex){_banamex.balance=9000;save();}
  localStorage.setItem(KEY+'_banamex9k','1');
}
```

`debts[].total` (14349.72) se dejó intacto a propósito — sigue siendo el monto original de la deuda, usado para calcular el % pagado (`1-balance/total`) en Dashboard y en el propio `renderDebts()`. Solo `balance` (lo que falta por pagar hoy) cambió. La inversión `i003` (NVIDIA — GBM+) se eliminó del array por completo, no se puso en `$0`, porque ya no existe esa posición. El seed base (más abajo, dentro de `seedData()`) también se actualizó con estos mismos valores, para que una instalación nueva desde cero ya nazca correcta — pero **sin** bumpear `SEED_VER`, así que no dispara un re-seed destructivo en el navegador donde Adán ya tiene datos reales.

**Por qué la migración de Banamex usa una bandera y no `balance===14349.72` (corregido el mismo día, segunda vuelta)**: la primera versión comparaba el balance contra el valor exacto del seed original. Adán reportó que el Dashboard seguía mostrando ~$17,000 — su balance real ya había cambiado (probablemente por interés acumulado, `rate:10`) y ya no coincidía con `14349.72`, así que la comparación estricta nunca disparaba el fix. La versión con bandera (`KEY+'_banamex9k'` en `localStorage`) corrige el balance a $9,000 **una sola vez, sin importar qué valor tuviera antes**, y no vuelve a tocarlo — así que si Adán paga más adelante y baja de $9,000 por su cuenta, esta migración no se lo revierte en la siguiente carga. Este es el patrón a preferir sobre comparar por igualdad exacta cuando se corrige un dato que pudo haber cambiado por el uso normal de la app entre que se escribió la migración y que el usuario la corrió.

Verificado con Playwright: una carga limpia (`localStorage` vacío) usa el seed corregido directamente; un `localStorage` ya sembrado con un balance distinto (simulando el drift real que reportó Adán, ~$17,000) se corrige a $9,000 en la siguiente carga sin perder una transacción manual de prueba agregada aparte; y si después se simula que Adán paga y baja el balance a $5,000 por su cuenta, una recarga posterior **no lo revierte** — confirma que la migración es de un solo uso.

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

**Corregido 2026-08-01** — la versión anterior de este diagrama incluía "Didi semanal" en las 4 semanas; el código real ya no reparte Didi por semana (Didi se registra como transacción manual si ocurre, y ya no alimenta el cálculo de `renderGBM()`):

```
Semana 1 (días 1-7):
  IN:  Quincena 1 ($20,500)
  OUT: Renta ($11,000) + gastos variables
  → GBM: sobrante → MSFT 70% / NVDA 30%

Semana 2 (días 8-14):
  IN:  ninguno
  OUT: Dolphin Mini ($6,700) del saldo reservado en BBVA la semana 1
  → GBM: $0 (sin ingreso ni sobrante esta semana)

Semana 3 (días 15-21):
  IN:  Quincena 2 ($20,500)
  OUT: CETES ($1,500) + Servicios ($1,264) + Suscripciones ($1,930)
       + TC mínimos ($2,310) + MSI activas + gastos variables
  → GBM: sobrante → MSFT 70% / NVDA 30%

Semana 4 (días 22-28):
  IN:  ninguno
  OUT: ninguno
  → GBM: $0 (semana libre)
```

Si `S.weeklyLeftover > 0`, ese monto manual reemplaza el estimado automático en la semana actual.

### Didi ya no es parte de `BASE_INC` ni de `renderGBM()` (código muerto detectado 2026-08-01)

`S.didiMonthly` y `setDidiMonthly(val)` (línea ~283) **siguen existiendo en el código pero ya no los invoca ningún botón del HTML** — verificado con búsqueda exhaustiva. En algún punto se simplificó el flujo de ingresos (`BASE_INC = BASE_SALARY` a secas, sin sumar Didi) y se dejó de repartir Didi entre semanas en `renderGBM()`, pero la función/campo no se borraron. Si Adán vuelve a manejar Didi como ingreso recurrente en vez de transacción manual caso por caso, hay 2 opciones: (a) borrar `S.didiMonthly`/`setDidiMonthly()` por completo si de verdad ya no se usa, o (b) reconectarlo a `BASE_INC` y a `renderGBM()` a propósito. Ahora mismo no rompe nada (simplemente nunca se ejecuta), pero es deuda de código que vale la pena resolver en un sentido o el otro.

---

## Modo oscuro/claro (2026-07-31)

Botón `.theme-toggle-btn` en el topbar, junto a "+ Nueva transacción". A diferencia de las otras 6 apps del ecosistema, **Finanzas ya era clara por defecto** (como Coach) — mismo patrón que Coach: `:root` sigue siendo el tema claro y se agregó `:root[data-theme="dark"]` como override, en vez de al revés. Persiste en la misma clave compartida `localStorage['coach-theme']` (ver `../README.md` para el detalle técnico completo de la convención `--ov` compartida entre las 7 apps).

Detalles específicos de este archivo (el más grande y con más gráficas del proyecto):
- Los bordes/hovers/divisores que ya usaban `rgba(0,0,0,.NN)` (dirección opuesta a las apps oscuras, que usan `rgba(255,255,255,.NN)`) se migraron al mismo truco `--ov`, con **7 excepciones dejadas deliberadamente en negro fijo**: los 3 `box-shadow` base (`--sh`/`--shm`/`--shl`), las sombras hardcoded de sidebar y topbar, el overlay de dimming de `.mo`/`.conf` (fondo de modales), y la tarjeta decorativa oscura de inversión GBM (`rgba(0,12,35,.95)`, un panel intencionalmente oscuro dentro de la página clara, no relacionado con el tema) — todos siguen viendo bien en ambos temas sin invertirse.
- Nueva variable `--surface-solid` (`#ffffff` claro / `#17171f` oscuro) para `.card`/`.modal`/`.conf-box`/`.toast`/`select option`, que antes tenían `#ffffff` hardcoded.
- **5 gráficas Chart.js** (`chBud`, `chGbmInv`, `chBal`, `chPat`, `chBtcPnl`) tenían colores de grid/ticks/leyenda hardcoded, algunos ya inconsistentes con el tema claro real desde antes (p.ej. grid `rgba(255,255,255,.08)` casi invisible sobre fondo blanco, o la línea "Invertido acumulado" del gráfico de BTC en blanco sobre blanco — bugs preexistentes, no introducidos ahora) — se corrigieron con el mismo helper `cssVar(n)` de las demás apps, y `toggleTheme()` vuelve a llamar al render de la sección activa para redibujar la gráfica visible al cambiar de tema.
- Un puñado de estilos inline con grises hardcoded (tabs de mes futuro, botones de tabs de BTC) también se migraron a `var(--text3)`/`rgba(var(--ov),X)` por el mismo motivo — algunos, como el texto de meses futuros en blanco sobre blanco, eran ilegibles en el tema claro ya antes de este cambio.

## Responsivo — iPad / iPhone 15 Pro (2026-08-03)

El archivo ya traía infraestructura parcial de una sesión anterior (botón `#menuBtn`, `.sidebar.open`, listener de `resize` en `init()` — ver punto 8 de `init()` arriba, y los breakpoints `@media(max-width:900px)`/`@media(max-width:640px)` que ya colapsaban `.g4`/`.g3`/`.g2` a 2/1 columnas). Pero nunca se había probado con Playwright: las 8 pestañas (`dashboard`, `transactions`, `budgets`, `debts`, `goals`, `patrimonio`, `indicators`, `gbm`) desbordaban horizontalmente tanto en iPad (820×1180) como en iPhone 15 Pro (393×852) — overflow medido entre 3px (Dashboard en iPad) y 486px (Plan de Inversiones en iPhone). Se mantuvieron los mismos breakpoints existentes (900px/640px) en vez de introducir 800px/480px, porque ya cubrían bien ambos dispositivos objetivo una vez resueltas las causas reales del desborde — que no eran el ancho de los breakpoints, sino tres problemas puntuales:

**1. El topbar empujaba las 8 pestañas por igual.** `.topbar{display:flex;justify-content:space-between}` con `.topbar-actions` (fecha + botón "+ Nueva transacción" + toggle de tema, todo con `white-space:nowrap` heredado de `.btn`) nunca hacía wrap. Como `.topbar` es a la vez contenedor flex y flex-item de `.main{display:flex;flex-direction:column}`, su contenido sin envolver forzaba el ancho de `.main` — y con eso, el de toda la página — por encima del viewport en las 8 secciones por igual (root cause compartido, no algo específico de cada tab). Pista que confirmó el diagnóstico: el `.toast` de BTC (`position:fixed;right:24px`) aparecía en las mediciones de Playwright posicionado *cientos de px fuera* del viewport nominal — eso solo pasa porque, en emulación móvil, cuando algún elemento desborda el ancho declarado en el `<meta viewport>`, el layout viewport completo (y con él, el "viewport" contra el que se calcula `right:24px` de un elemento `fixed`) se agranda para acomodarlo. En cuanto se arregló el desborde real, el toast volvió solo a su posición correcta sin tocarlo — no era un problema en sí, era el síntoma más visible de otro.
   Arreglo: `@media(max-width:640px){.topbar{flex-wrap:wrap;height:auto;min-height:58px;row-gap:8px;padding:10px 16px}.topbar-actions{flex-wrap:wrap;justify-content:flex-end}}` — el título pasa a su propia fila y fecha+botón+toggle a la siguiente, sin ocultar ni recortar ningún control. En `@media(max-width:900px)` (iPad) el desborde era de solo unos px, así que ahí bastó con reducir el padding del topbar (`0 24px`→`0 16px`) y el gap de `.topbar-actions` (`8px`→`6px`).

**2. Trampa "min-width:auto" aplicada a flexbox, no solo a grid.** `.main{flex:1}` (item del flex-row de `body`) no tenía `min-width:0`, así que aunque `.tw{overflow-x:auto}` (el wrapper de la tabla de Transacciones) esté correctamente configurado para hacer scroll interno, `.main` no se dejaba encoger por debajo del contenido de sus hijos y arrastraba a toda la página con él. Con `.main{min-width:0}` agregado, el mismo `.tw` que ya existía empezó a contener el overflow de la tabla como estaba pensado, sin tocar su CSS.

**3. Trampa #2 (grids con `style="display:grid;grid-template-columns:..."` inline, generados por JS)** — un media query no puede pisar un inline style. `renderGBM()` (la pestaña "Plan de Inversiones", la más recargada de la app) construye 6 grids así: la ficha de métricas de cada posición (4 col), el desglose semanal Entradas/Gastos/A invertir (3 col), el resumen de servicios fijos (3 col), los 5 KPIs del portafolio, el layout principal `1fr 340px` (posiciones + panel lateral) con su panel derecho en `position:sticky;top:70px`, y la comparación Mejor/Peor (2 col). `renderIndicatorsHTML()` (pestaña "Indicadores") arma un grid de 4 col para el desglose del Crédito Automotriz. `renderBtcHistory()` (dentro de la pestaña "Patrimonio") arma un layout `1.4fr 1fr` para gráfica + resumen de BTC. Los 9 casos se resolvieron igual: se sacó `display:grid;grid-template-columns:...` del `style=""` inline y se reemplazó por una clase nueva (`.gbm-metrics-grid`, `.gbm-week-grid`, `.gbm-svc-grid`, `.gbm-port-kpis`, `.gbm-port-layout` + `.gbm-port-side` para el sticky, `.gbm-bw-grid`, `.ind-grid4`, `.btc-layout`) definida en `<style>` con el **mismo** `grid-template-columns` que tenía el inline (cero cambio visual en desktop), dejando el resto del `style=""` (gap, margin, align-items) donde estaba. Con la clase ya en la hoja de estilos, sí se le pudieron agregar breakpoints — en general 900px colapsa a 2 columnas (o apila el layout `1fr 340px` y quita el `sticky` del panel lateral, que a ese ancho ya no cabe), y 640px termina de bajar a 1 columna los grids de 3 (semanal, servicios) que a 393px de ancho quedaban demasiado angostos para montos en pesos.

**Trampa #1 (grid con hijos que no se encogen)**: no resultó ser la causa de ningún desborde real en este archivo (los `.g2`/`.g3`/`.g4` existentes ya se comportaban bien una vez resueltos los 3 puntos de arriba), pero se agregó de todas formas el mismo fix defensivo usado en Dashboard/Coach — un bloque `min-width:0` para los hijos de `.g2/.g3/.g4/.fr` y de las 9 clases nuevas, puesto al final de la hoja de estilos (después de `@media(max-width:640px)`) para ganar por orden de aparición si algún dato futuro con texto largo llegara a necesitarlo.

**Verificación (Playwright, Chromium headless):** las 8 pestañas se recorrieron con `nav('<tab>')` en iPad (820×1180) e iPhone 15 Pro (393×852, `isMobile:true`, `hasTouch:true`) — `document.documentElement.scrollWidth - clientWidth = 0` en las 16 combinaciones, cero `console.error`/`pageerror`. En desktop (1500×1000) el mismo recorrido confirmó `overflow=0` y las 8 pantallas visualmente idénticas a antes del cambio (mismas 4/3/5/2 columnas y el panel lateral `340px` sticky del Plan de Inversiones, que solo se apila por debajo de 900px). Se corrieron además los 3 scripts de prueba funcional ya existentes en el repo (`test_finanzas.js`, `test_finanzas_cat.js`, `test_finanzas_migration.js`) — mismos resultados que antes de tocar el CSS (gráfica de categoría con/sin datos, migración de Banamex/NVIDIA con y sin datos previos en `localStorage`), cero errores de consola. También se extrajeron ambos bloques `<script>` con regex y se validaron con `new Function()` — sin errores de sintaxis.

No se modificó ninguna función, variable, estructura de dato ni clave de `localStorage` — todos los cambios fueron CSS nuevo (breakpoints + 9 clases de grid) y, en el HTML/JS, únicamente reemplazar `style="display:grid;grid-template-columns:..."` por `class="..."` en esos mismos 9 elementos (mismo resto de estilos inline, mismo markup alrededor).

## Referencias cruzadas

- El **Dashboard** (`../Dashboard/dashboard.html`) lee `finanzasmx_v2` directamente (`D.fin`): usa `investments`, `emergencyFund`, `debts` (patrimonio neto, fondo de emergencia, deuda total del slide "💰 Finanzas") y `transactions` del mes actual (ingresos/gastos, score de finanzas del Vida Score). Si cambias la forma de `S.investments`/`S.debts`/`S.transactions`/`S.emergencyFund` aquí, revisa `patrimonioNeto()`, `hasFinData()`, `calcScores()` y `renderFinanzas()` en `Dashboard/dashboard.html`.
- El enlace "🚀 Volver al Dashboard" **sí existe** en el sidebar (confirmado 2026-08-01) — la nota anterior que decía que faltaba estaba desactualizada.
- Mapa completo del proyecto: [`../README.md`](../README.md).
- **Auditoría completa realizada el 2026-08-01** (la primera desde la creación de este documento): se verificaron contra el código real todos los cálculos financieros, se corrigió el sueldo base documentado ($43,000 → $41,000, el código nunca tuvo $43,000 — era el `.md` el que estaba mal), se corrigió la fórmula semanal de GBM (ya no reparte Didi por semana), se documentó el módulo de snapshots mensuales que no tenía entrada propia, y se restauró en el código la gráfica `ch-cat` (dona de gastos por categoría del mes) que el propio `.md` ya describía como existente pero había sido removida del HTML/JS — ver `renderDashCharts(mtx)` arriba, ya vuelve a estar en el Dashboard junto a la gráfica de balance. No se encontró ningún botón muerto, cálculo con división por cero sin manejar, ni referencia a función/ID inexistente en todo el archivo (4340 líneas).
