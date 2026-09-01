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
  btcPriceHist:   [],       // [[ts, precioMXN], …] caché del histórico diario de CoinGecko
  btcHistFetch:   '',       // ISO timestamp del último fetch del histórico
  weeklyLeftover:  0,       // sobrante semanal manual para GBM+
  sivaleBalance:   0,       // saldo acumulado tarjeta Si Vale
  sivaleLastMonth: '',      // YYYY-MM del último mes agregado Si Vale
  emergencyFund:   0,       // saldo del fondo de emergencia BBVA
  didiMonthly:     0,       // ingreso mensual real de Didi (0 = usar estimado $11,200)
  gbmMonth:       '',       // YYYY-MM seleccionado en Plan de Inversiones
}
```

Variables globales adicionales: `editId`, `confCb`, `payDebtId`, `contribGoalId`, `btcEditId`, `activoEditId`, `btcCur` (MXN|USD, moneda de la gráfica de BTC, persiste en `localStorage['btc_cur']`), `curType` (expense|income), instancias de Chart (`chCat`, `chBal`, `chBud`, `chInv`, `chGbmInv`, `chBtcPnl`, `chPat`), `dashMonth`.

---

## Constantes importantes

### Categorías (`CATS`)
- **expense**: Alimentación, Transporte, Hogar/Renta, Salud, Entretenimiento, Educación, Ropa, Servicios, Suscripciones, Restaurantes, Viajes, Deudas, Otros gastos
- **income**: Salario, Freelance/Honorarios, Inversiones, Renta/Propiedades, Bonos, Regalos, Otros ingresos

### Gastos fijos: ya no se escriben aquí

Salen de `PROYECTO` en [`../Dashboard/datos-maestros.js`](../Dashboard/datos-maestros.js), vía los
helpers `_PG()`, `_autoMin()` y `_metaFondo()` del principio del `<script>`. `_autoMin()` y
`_metaFondo()` prefieren el dato **vivo** de `S` y solo caen al maestro si todavía no hay nada
guardado.

| Concepto | Monto | Cuándo |
|---|---|---|
| Salario BBVA | `{{sueldo}}` $41,000 | Quincenal |
| Renta | `{{renta}}` $11,000 | Día 1 |
| Crédito Dolphin Mini | `_autoMin()` $6,700 | Día 15 |
| Servicios | `{{servicios}}` $1,075 | Plan AT&T $650 (día 1), internet (8), gas (bimestral, día 1), luz y agua (1) |
| Suscripciones | `{{suscripciones}}` $1,080 | Gym Total Pass $650, Claude Code $380, iCloud $50 |
| CETES | `{{cetesDia15}}` $1,500 | Día 15 |
| Mínimos de TC | `minimosTC()` | Sale de `S.debts`, no de un número escrito |

**Por qué se movieron (2026-08-25).** Estos importes estaban escritos a mano en **cinco sitios de
este mismo archivo** —`renderGBM()`, dos cálculos de `_fixedFloor`, el bloque `_gbm*` y la lista
`fixed` de la proyección— y habían divergido de verdad: al cambiar de gimnasio el 18-ago
(Fitsi $1,500 → Total Pass $650) se actualizó **solo `renderGBM()`**. Los otros cuatro siguieron
calculando con $1,500 durante una semana, así que el plan semanal y la proyección mensual daban
cifras distintas para el mismo mes.

Lo encontró una auditoría de "números crudos" tras un fallo parecido en el verificador. Ahora
`verificar-sincronia.js` incluye ese control (el nº 5), que busca los valores del maestro escritos
como número pelado —sin `$`— en el código.

## Gastos fijos hardcodeados (usados en `renderGBM` y `getMonthProjection`)
| Concepto             | Monto MXN | Semana / Fecha |
|----------------------|-----------|----------------|
| Salario BBVA         | $41,000   | Quincenal      |
| Didi (estimado)      | $11,200   | Ya no forma parte del flujo GBM — ver nota abajo |
| Renta departamento   | $11,000   | Día 1          |
| Crédito Dolphin Mini | $6,700    | Día 14         |
| Celular (datos)      | $600      | Día 15 (Sem 3) |
| Gym                  | $1,500    | Día 15 (Sem 3) |
| TC BBVA mínimo       | $1,500    | Día 15 (Sem 3) — ya **no** hardcodeado, sale de `S.debts` (ver abajo) |
| TC Banamex mínimo    | $0        | Liquidada el 2026-08-13 — desaparece sola del plan |
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
- Nota de contexto (ver `../Coach/readme_coach.md` → Plan Maestro): en julio 2026 se decidió pausar nuevas aportaciones a esta meta por 1 año; confirmar contra el `date` real en `S.goals` antes de asumir que sigue vigente tal cual, ya que este tipo de decisión vive en Coach, no en el código de Finanzas.

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

## El lenguaje visual del Plan de Inversiones

Cinco clases en el `<style>` de la cabecera, compartidas por el plan semanal y la gráfica de BTC.
Viven como clases y no como `style=""` en cada elemento porque son **el sistema**: si el acento
cambia, cambia en un sitio. Todos los colores salen del `:root`, así que el tema claro funciona
sin reglas aparte.

| Clase | Qué hace |
|---|---|
| `.fx-num` | Space Grotesk con `tabular-nums`: una columna de importes queda alineada aunque cambien los dígitos |
| `.fx-lbl` | Etiqueta de sección: 9.5 px, `letter-spacing: .14em`, mayúsculas |
| `.fx-panel` | Panel base con borde y fondo tenue |
| `.fx-grid` | Rejilla técnica de 64 px como `::before`, enmascarada con un radial para que se desvanezca antes del contenido. Es `::before` para no meter un `<div>` vacío en cada panel |
| `.fx-edge` | Borde de gradiente cyan→purple: un envoltorio de 1 px de padding con el degradado de fondo y el hijo opaco encima — la única forma de que un borde degradado respete el `border-radius` |
| `.wk-card` | Tarjeta de semana. Es un `<button>`, así que funciona con teclado |

**Inter sigue siendo el cuerpo.** Space Grotesk entra solo en cifras y titulares, donde el rasgo
técnico se nota. La gráfica de BTC pasa la misma familia a Chart.js (`FX_FONT`) para sus ejes y
el título del tooltip: con el eje en Inter y la tarjeta de al lado en Grotesk, se lee como dos
gráficas distintas.

Las cifras del canvas (las etiquetas de aportación que dibuja `btcAportPlugin`) también usan
Grotesk, escrito a mano en `ctx.font` porque el canvas no hereda CSS.

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

### Helpers de deuda vigente (2026-08-13)
Tres funciones de nivel superior que existen para que una deuda liquidada nunca contamine un total:
- `deudasActivas()` — `S.debts` filtrado por `balance > 0`
- `minimosVigentes()` — suma de `min` solo de las activas
- `minimosTC()` — suma de `min` solo de tarjetas de crédito activas; es lo que consume `renderGBM` en vez del viejo `TC_BBVA + TC_BANAMEX` escrito a mano

### `renderDebts()`
Renderiza KPIs (deuda total, pagos mínimos/mes, tasa promedio) y las tarjetas individuales de cada deuda con barra de progreso de pago. Si la deuda tiene `noInterest`, muestra bloque especial de "paga antes del día X".

Los tres KPIs se calculan **solo sobre `deudasActivas()`**: una tarjeta en $0 no exige pago mínimo ni debe promediar su tasa. Las deudas con `balance <= 0` se listan aparte, al final, en un bloque compacto **"✅ Liquidadas — ya no generan pago mensual"** (verde, sin mínimo ni barra de progreso, conservando editar/eliminar). Se conservan en vez de borrarse porque la tarjeta sigue existiendo y Adán puede volver a usarla; el contador del KPI las reporta como `N liquidada(s) ✅`.

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

#### El plan semanal, tal como se ve

Cuatro tarjetas clicables y el detalle de la elegida, encabezados por una **línea de tiempo del
mes**. La pregunta que responde el bloque es *por qué unas semanas dan para invertir y otras no*,
y la línea lo enseña antes de que haya que leer una cifra: la quincena entra los días 1 y 15,
así que las semanas 2 y 4 se quedan a cero.

Los eventos de la línea (`GRUPOS`) van **agrupados por día** — el 1 lleva quincena y renta a la
vez — y los grupos alternan arriba y abajo del eje, porque el día 14 y el 15 caen a un 3% de
distancia y las etiquetas se pisarían. Por debajo de **760 px** la línea horizontal se oculta
(`.fx-tl`) y aparece una lista vertical (`.fx-tl-lista`) generada del **mismo array**: dos formas,
un solo origen. Medido a 390 px, donde el día 14 y el 17 quedaban a diez píxeles.

Ningún importe está escrito en el marcado: las tarjetas leen `w1GBM`…`w4GBM` y el detalle
reconstruye entradas y salidas desde las mismas constantes que alimentan esas fórmulas.

**El bloque dice en voz alta lo que el modelo no cuenta**: el plan semanal solo reparte la nómina.
Los ingresos de Didi no entran, y la mensualidad del auto aparece en el calendario pero no se
descuenta de ninguna semana. Son ~$4,500 al mes fuera de la cuenta, y ahora se lee en pantalla en
vez de quedar como una diferencia inexplicable entre el estimado y el banco.

### `switchGBMTab(n)`
Mueve la clase `.on` entre las cuatro tarjetas y muestra el panel de la semana `n`.

Antes reescribía el atributo `style` de cada botón con cinco expresiones regulares sobre
`cssText`. Cualquier retoque al estilo del botón rompía el resaltado sin avisar, porque el regex
dejaba de encontrar lo que buscaba. El estado activo es ahora una clase y esto solo la mueve.

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
**La lista de deudas ya no se escribe aquí**: sale de `CIFRAS.DEUDAS_SEED`, en
`../Dashboard/datos-maestros.js`. Estaba duplicada de hecho —el seed aquí, la prosa en las otras
apps— y cada subida de `SEED_VER` resembraba estos saldos, así que un saldo corregido a mano se
perdía en el siguiente reseed si nadie se acordaba de tocar el seed también.

Si el `<script src>` fallara, siembra **sin** deudas y avisa con un `console.error`: mejor eso que
sembrar con una copia vieja escondida aquí.

Solo se ejecuta si `localStorage['finanzasmx_v2_v'] !== SEED_VER` (actualmente `'23'`). Borra el estado anterior e inyecta datos de ejemplo con 6 meses de transacciones (ene-jun 2026) más los movimientos sueltos de agosto 2026, presupuestos, deudas reales, metas, inversiones, activos físicos e historial BTC. Incrementar `SEED_VER` para forzar re-seed.

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

### La gráfica, reescrita el 2026-08-26

Adán: *"esta gráfica no me gusta … quiero ver lo que he invertido y cuánto dinero es en el
transcurso del tiempo pero en pesos mexicanos y muy puntual en el gráfico se vea cuando haga
aportaciones"*. Lo que estaba mal no era el estilo:

| Tenía | Por qué engañaba |
|---|---|
| Un punto por compra, eje X categórico | Los 10 meses de feb→dic medían lo mismo que los 6 de dic→jun. La curva dibujaba el **orden** de las compras, no el tiempo |
| Todo el historial valuado al precio de HOY | La línea "valor" no fue nunca el valor del portafolio: reescribía el pasado, y subía suave aunque BTC se hubiera desplomado en medio |
| Dólares | No es la moneda en la que Adán cobra, paga la renta ni decide |
| Las aportaciones eran un punto más de la curva | No se distinguía "aporté dinero" de "subió el precio" — las dos cosas mueven la línea hacia arriba |

Ahora: **un punto por día**, eje temporal lineal en milisegundos, pesos por defecto, y cada
aportación con su línea vertical y su monto.

### `btcSerie()`

Construye la serie diaria desde la primera compra hasta hoy. Devuelve
`{pts, compras, t0, tEnd, reales, dias}`; cada `pt` trae `{t, btc, aMxn, aUsd, vMxn, vUsd, pMxn, pUsd}`.

**El precio de cada día** sale de interpolar linealmente entre anclas, de menos a más fiable
(la última gana si caen el mismo día):

1. el precio que Adán anotó en cada compra (`h.btcPrice`)
2. el histórico diario real de CoinGecko (`S.btcPriceHist`), si lo trajo el botón 📈
3. el precio de hoy (`S.currentBtcPrice`)

Con el histórico cargado hay un ancla por día y la interpolación no interviene. Sin él la curva
entre compras es una recta — una reconstrucción, no un dato — y **la leyenda lo dice**:
`reales/dias` mide la cobertura y el pie del gráfico cambia de texto según el porcentaje. Una
curva inventada y una real se dibujan igual de bonitas; solo una de las dos es información.

### `btcFxDe(h)` — el tipo de cambio vive con la compra

`h.fx` si existe, si no `S.usdMxn`. El campo es nuevo (input **Tipo de cambio USD/MXN ese día**
en `mo-btc`, opcional). Sin él, "cuánto llevo metido en pesos" se recalculaba con el dólar de
hoy y **el histórico entero se movía solo** cada vez que el peso se movía, aunque Adán no
hubiera aportado un peso.

La regla que se sigue en todo el módulo: **un valor de HOY** (lo que vale, el P&L) se convierte
con `fxNow`; **lo APORTADO** se convierte con el fx de su día. Mezclarlos era el bug.

### `btcAportPlugin`

Plugin inline de Chart.js (no hay dependencia nueva: `chartjs-plugin-annotation` habría sido
otro `<script>` de CDN). Dibuja por cada compra una vertical punteada naranja y una etiqueta con
el monto. La etiqueta va en el `layout.padding.top` — **fuera** del área de trazado — porque
dentro chocaba con el triángulo cuando la aportación caía cerca del techo. Si dos etiquetas
quedan a menos de 64 px, la segunda no se dibuja: encimadas son ilegibles y la vertical sola ya
marca el día.

### `fetchBtcHistory()`

`async`. Trae `coins/bitcoin/market_chart?vs_currency=mxn&days=365` y guarda en `S.btcPriceHist`
**recortado al rango que la gráfica dibuja** (el historial completo son ~100 KB de localStorage
que no se ven nunca). CoinGecko gratis entrega 365 días hacia atrás; lo anterior sigue
interpolado. Si falla, toast y la curva se queda reconstruida — nunca se rompe la vista.

### `setBtcCur(c)`

Alterna MXN/USD, lo persiste en `localStorage['btc_cur']` y re-renderiza. El toggle gobierna la
gráfica, la fila de tarjetas, los tabs por mes y sus paneles. La tabla histórica muestra
**siempre las dos** monedas (USD arriba, MXN debajo): es el registro, no la vista.

### `renderBtcHistory()`

Renderiza el panel completo de BTC en `btc-history` dentro del Plan de Inversiones.

**KPIs en USD:** `totalBtc`, `totalUsd`, `avgPrice` (`totalUsd/totalBtc`), `curVal`, `pnl`, `pnlPct`.

**KPIs en MXN:** `invMxn` (cada compra a su propio fx), `valMxn`, `pnlMxn`, `pnlMxnPct`.

**Renderiza:**
- Inputs inline de precio BTC y tasa USD/MXN + botón "Actualizar precio" (`fetchBtcPrice()`)
- La gráfica `btc-ch-pnl` con su toggle de moneda y el botón 📈 **Precio real**
- Fila de 6 tarjetas bajo la gráfica, en la moneda activa y con la otra como subtítulo
- Tabs por mes con el P&L de cada período, en la moneda activa
- Tabla histórica por compra en ambas monedas, con botones editar/eliminar

**La banda de 5 tarjetas en dólares** que estaba arriba se oculta (`display:none`) cuando hay
precio actual: repetía en dólares lo que la fila bajo la gráfica ya dice en pesos. Sigue en el
código porque es la única vista cuando **no** hay precio actual y por tanto no hay gráfica.

### `switchBtcTab(key)`
Muestra el pane del tab `key` ('resumen' o 'YYYY-MM') y oculta los demás. Actualiza estilos.

### `fetchBtcPrice()`
`async`. Llama a `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,mxn`. Actualiza `S.currentBtcPrice`, `S.usdMxn` y `S.btcLastFetch`. Refresca BTC history, dashboard, indicadores y patrimonio. Maneja errores con toast.

### `updateBtcPrice(val)`
Actualiza `S.currentBtcPrice` manualmente (desde input). Refresca todas las vistas afectadas.

### `updateUsdMxn(val)`
Actualiza `S.usdMxn` manualmente (desde input). Refresca todas las vistas afectadas.

### `openBtcModal(id=null)`
Abre `mo-btc`. Si `id` existe carga datos para edición. El campo de tipo de cambio se prellena
con `S.usdMxn`.

### `calcBtc()`
Calcula automáticamente `btc-received = btc-usd / btc-price-at` cuando el usuario edita los campos.

### `saveBtcPurchase()`
Valida fecha, USD y precio BTC. Calcula `btc = usd / btcPrice` con 8 decimales. Guarda en
`S.btcHistory` **con `fx`** (el del formulario, o `S.usdMxn` como respaldo).

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

**Segunda migración con este patrón, `_pagos20260813`** (ver la sección fechada al final de este documento): liquidación de la TC Banamex, Boletos Ticketmaster pagados y Apple Watch MSI corregido a 2 cuotas. Igual que la anterior, está **replicada en `Dashboard/dashboard.html`** (`fixPagos20260813IfNeeded()`, bandera compartida) porque Adán normalmente abre el Dashboard antes que Finanzas — regla general: **toda migración de `finanzasmx_v2` tiene que existir en las dos apps**.

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

## Modo oscuro/claro

Toggle 🌙/☀️ en la barra superior, persistido en `coach-theme` — la misma clave que Coach y el
Dashboard, así que el tema se siente uno solo al saltar entre apps. Se aplica como `data-theme` en
`<html>` antes de pintar, para que no haya destello claro al cargar en oscuro.

## Responsivo

Verificado a **1600px y 390px** (iPad y iPhone 15 Pro). En móvil el sidebar se colapsa tras el
botón ☰ (`#menuBtn`, visible bajo 640px), las tablas scrollean dentro de su contenedor y los KPIs
pasan a una columna. La página nunca scrollea en horizontal.

## Enlace al Dashboard

Botón redondo con 🚀 en `.topbar-actions`, con la clase `.theme-toggle-btn` que ya usan sus
vecinos — hereda tema y estilos sin CSS nuevo. **No** es un bloque flotante: uno `position:fixed`
se encimaba sobre "+ Nueva transacción" y no seguía el tema del archivo.

---

## Las cifras compartidas y las migraciones

Esta app es la **fuente** de los saldos: los escribe en `finanzasmx_v2`, que leen el Dashboard y
Coach. Pero el *seed* y las *migraciones* ya no viven aquí, sino en
[`../Dashboard/datos-maestros.js`](../Dashboard/datos-maestros.js).

Carga ese módulo en el `<head>`. No lo necesita para pintar nada —sus datos salen de `S`— pero así
cualquier texto nuevo puede usar los mismos `{{marcadores}}` que las otras apps en vez de empezar
otra copia a mano.

**Las correcciones de saldo nuevas van al módulo**, nunca duplicadas aquí. Las anteriores al
2026-08-24 (`_banamex9k`, `_pagos20260813`, `_msibbva20260813`, `_ahorro20260817`) siguen en
`init()`: ya corrieron, tienen su bandera y son inertes.

Detalle en [`../Dashboard/DATOS-MAESTROS.md`](../Dashboard/DATOS-MAESTROS.md).

---

## Estado de las deudas

| id | Deuda | Saldo | Nota |
|---|---|---|---|
| `d001` | Tarjeta BBVA | **$34,000** ⚠️ | Subiendo: el mínimo de $1,500 no cubre el interés |
| `d002` | Tarjeta Banamex | $0 ✅ | Liquidada el 13-ago-2026, saldo completo |
| `d003` | Crédito Automotriz | $293,000 | 12.99%, $6,700/mes — ver nota abajo |
| `d004` | Apple Watch MSI | $854 | Queda 1 cuota, la del 18 sep 2026 |
| `d007` | Boletos Ticketmaster | $0 ✅ | Liquidado |
| `d008` | iPhone 15 MSI | $11,362 | |
| `d009` | Zap Stylo (MSI BBVA) | $334 | "El de los zapatos" — el único MSI de BBVA vivo |
| `d010`, `d011` | Merpago, Mercado Pago | $0 ✅ | Liquidados el 24-ago-2026 |

Deuda total **$339,550**. Los valores vivos están en `finanzasmx_v2`; esta tabla es la foto para
orientarse rápido.

### El auto subió $1,000 el 25-ago-2026

De $292,000 a **$293,000**, un día después. En un crédito con pagos mensuales el saldo no sube:
o el dato del 24 era una estimación, o ese mes cargó interés sin que entrara el abono. **Sin
confirmar contra el estado de cuenta.** Se registró el número tal cual lo reportó Adán.

Conviene resolverlo junto con lo de la TC BBVA: son los dos saldos que se están moviendo hacia
arriba, y ambos alimentan las proyecciones del Plan Maestro que siguen sin rehacerse.

`d005` y `d006` **se borraron**, no se pusieron en $0: eran un vuelo y un MSI que nunca existieron
en el historial real de BBVA. Dejarlos en $0 los mostraría para siempre en "✅ Liquidadas", que es
una afirmación falsa distinta.

---

## La tasa de las tarjetas: 55.7%, y por qué

`d001` tenía `rate:10`, que sobre $32,343 daba $270/mes de intereses. Lo real son ~$1,500.

Lo confirman los registros de este mismo archivo: la deuda llevaba `total == balance == 32,343.31`
desde el **22-ene-2024** pagando $1,500 al mes. **31 meses, $46,500 pagados, saldo intacto** — eso
solo pasa si el interés se come el pago completo. Tasa implícita: `1500 × 12 ÷ 32,343.31 = 55.7%`.

⚠️ **Sigue pendiente confirmarlo contra el estado de cuenta**, que trae la tasa y el CAT reales.

Este dato alimenta el medidor "🔥 Intereses este mes", que ahora avisa de que **el pago mínimo no
amortiza nada**.

### Y ahora la tarjeta está subiendo

El 24-ago-2026 el saldo pasó de $32,343.31 a **$34,000**: **+$1,656.69 en un mes**, que no cuadra
con pagar $1,500 y quedar en tablas. Dos lecturas, y hay que confirmar cuál es:

- **No se pagó el mínimo ese mes.** El aumento sería puro interés: `1,656.69 ÷ 32,343.31 = 5.12%
  mensual ≈ 61% anual`, muy cerca del 55.7% estimado más comisiones. Es la que mejor encaja.
- **Sí se pagó y hubo consumo nuevo.** Para subir eso tras abonar $1,500, el cargo del mes tendría
  que haber sido ~$3,157: el 9.8% del saldo, demasiado para ser solo interés.

La conclusión operativa es la misma en ambos casos: **esta tarjeta ya no está estancada, está
creciendo**. Hasta resolverlo, la simulación mes a mes de Coach queda sin rehacer.

En `d001` se mantiene la invariante `total == balance` que la tarjeta lleva desde 2024: con `total`
congelado, las barras de "pagado real" saldrían **negativas**.

---

## Cómo se calculan los saldos MSI

`autoBalance(d, refDate)` solo auto-calcula **MSI a 0%** (`type:'other'`, `rate:0`): son
deterministas, `total − meses × cuota`. Las tarjetas y el crédito con interés se quedan manuales,
porque dependen de pagos reales.

Cuenta las cuotas con **`floor`, no `round`**: solo las YA cobradas. Con `round`, una cuota que aún
no se cobra (cobra el 18 y hoy es 13) se daba por pagada y el saldo salía una cuota más bajo.

El `start` de cada MSI **no es la fecha de compra literal**: es la que hace que `autoBalance`
reproduzca exactamente las cuotas del estado de cuenta (30.44 días por mes). Esa misma fecha decide
si la cuota entra en el plan semanal (`start + totalM`), así que al elegirla hay que verificar
contra **los dos** cálculos, no solo contra el saldo.

---

## Huecos de datos conocidos

No son fallos de la app: es información que no está registrada, y por eso no se puede mostrar.

- **El fondo de la Maestría no está desglosado.** `g001` guarda `current: 53740` como una sola
  cifra. No hay instrumentos ligados, ni historial de aportaciones, ni cuenta asociada — las únicas
  entradas de `investments` son CETES y el depósito de renta, que **no** son ese fondo. Para verlo
  desglosado habría que dar de alta en **Inversiones** dónde está guardado ese dinero.
- **Los `activos` no cuentan en el patrimonio.** Hay 15 bienes registrados (BYD, PC, teléfonos,
  PS5, monitores, efectivo, cuenta) por unos **$540,600**, y `patrimonioNeto()` solo suma
  `investments + emergencyFund − debts`. **Se decidió no cambiar la fórmula**: la meta del millón se
  mide en dinero disponible, y el punto de partida histórico de −$308,830 se calculó así. El panel
  muestra los bienes aparte y da la cifra con y sin ellos.
- **No hay Bitcoin en `investments`.** Adán lo menciona como parte de su portafolio y el panel de
  inversión lo trata como tal, pero en los datos solo están CETES y el depósito de renta.

---

## Alimentación: dato medido contra patrón declarado

El desglose de gastos **no inventa categorías**: muestra solo las que tienen movimientos reales.
Restaurantes no aparece si no se gastó ahí.

Alimentación se modela con su patrón real en vez de un promedio ciego, y el modal muestra juntos el
**promedio medido** ($1,766.67) y el **patrón declarado** ($7,110). Esa brecha de $5,343 a la vista
es el valor del cambio. **La regla de fondo no cambió**: el dato medido siempre le gana al
declarado.

---

## Referencias cruzadas

- [`../Dashboard/DATOS-MAESTROS.md`](../Dashboard/DATOS-MAESTROS.md) — índice del proyecto, catálogo de variables
- [`../Dashboard/readme_dashboard.md`](../Dashboard/readme_dashboard.md) — quién consume estos datos
- [`../Coach/readme_coach.md`](../Coach/readme_coach.md) — el Plan Maestro que se apoya en ellos
- `../../CLAUDE.md` — las tres reglas del proyecto

---

## Verificar un cambio

```bash
node Dashboard/verificar-sincronia.js      # desde Claude_Proyecto/
```

Y en navegador a 1600px y 390px con `file:///`. Para probar migraciones hay que sembrar
`finanzasmx_v2` **y** `finanzasmx_v2_v` con el `SEED_VER` actual: sin esa bandera, `seedData()`
resiembra y lo que se mide es un reseed, no el uso normal.
