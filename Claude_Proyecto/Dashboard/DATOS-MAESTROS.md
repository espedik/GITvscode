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
<p>un crédito de {{autoSaldo}}</p>        →   un crédito de $279,363
<p>ganas {{sueldo}} en {{empleador}}</p>  →   ganas $41,000 en ALTEN
```

---

## El balance mensual, compartido

`datos-maestros.js` no solo guarda datos: también **la lógica que dos apps tienen que
compartir**. La primera es `CIFRAS.balanceMeses(hastaYM, n, opts)`, que arma la serie de los
últimos `n` meses para la gráfica de balance de **Finanzas** (`ch-bal`) y sus indicadores del mes: dos
copias de la misma lógica daban cifras distintas del mismo mes. El Plan Maestro del Dashboard no la usa:
explica el dinero con la cuenta de la quincena (`ctTramo`).

Cada mes se arma en **dos capas**:

1. **Lo previsto** — lo que ya se sabe y no cambia: las dos quincenas, la renta, el crédito
   del auto, los servicios y los mínimos de las tarjetas (de `CALENDARIO.cobros` y del
   `day`/`min` de cada deuda), más los tres que van por **total mensual** y no tienen día:
   Didi, el vale y lo que cuesta comer.
   Lo que se aparta —el ahorro de cada quincena, cobros con `ahorro: true`— **no es
   gasto**: no suma a los gastos, pero se queda en la lista contra la que `yaContado` compara, para
   que una transacción que lo anote no se cuente encima.
2. **Lo registrado** — las transacciones que la agenda no conoce. `yaContado` evita el doble
   conteo.

Un cero que en realidad es «no lo anoté» miente más que una previsión bien etiquetada; por eso
existe la capa 1, y por eso cada concepto sale marcado con `prev` para que la pantalla pueda
pintar distinto lo previsto y lo anotado.

Dos reglas que costaron una vuelta cada una:

- **La nómina aporta `sueldo` al mes y punto.** Un movimiento de nómina anotado es *ese mismo*
  dinero. Lo decide `esNomina()` por **categoría** (`Salario`), con palabras como red: antes
  `yaContado` cazaba `Quincena ALTEN` pero se le escapaban `Sueldo` o `Nómina`, y cada uno
  sumaba $20,500 de más.
- **Los tres mensuales llevan su propia comprobación**, porque `yaContado` compara importes y
  un cobro de Didi de $2,800 no se parece a los $11,200 del mes. Si el mes trae algo anotado
  que caiga en sus palabras o su categoría, **manda lo anotado**.

Lo que cuesta comer se **deriva de la lista de compras**, cuyos precios viven en
`dashboard.html` (153 KB que no tiene sentido cargar en las tres apps). El Dashboard lo
calcula y lo deja con `CIFRAS.guardarComeDia()`; Finanzas lo lee con `CIFRAS.comeDia()`. Es
una **caché de un dato que se calcula en un solo sitio**, no una segunda copia. Si nunca se
abrió el Dashboard en ese navegador vale 0 y la comida no entra —mejor faltar que inventar—.
En casa de su familia (de `PROYECTO.enCasaDesde` al último mes en México) comer es solo su
desayuno: `SUPUESTOS.comidaEnCasa` al mes. Lo decide `comerEnMes(ym, come)`, que usa también el
tablero del Dashboard.

Junto a ella viajan sus piezas, para que nadie las reimplemente: `agendaDia`, `palabras`,
`norm`, `yaContado`, `esNomina`, y la regla de la tarjeta: `tarjetaDe` y `movimientoTarjeta` (ver
*La tarjeta se mueve con lo que se anota*).

`agendaDia` pone el mínimo de cada deuda en su día, salvo una tarjeta que se paga completa
(`noInterest`): en su **próximo** pago sale el total para no generar intereses; los meses de
después siguen con el mínimo, porque esos estados de cuenta todavía no existen. **La BBVA con plan
de pago no lleva ninguno de los dos**: desde `PROYECTO.bbvaFecha` la pintan los abonos de
`planBbva` —el día 1 y el 15, lo que sobra de la quincena (y el envío a GBM de ese día baja en lo
mismo); el día de pago, lo que pide el estado de cuenta, que paga Didi—, con `tarjeta: true` y `de`. Lo que Didi aparta
cada lunes no pasa por el calendario. Un día con un pago anotado dice lo que se mandó de verdad
(*lo que mandaste de la quincena*, o *un abono de más* si ese día no tocaba nada), con `hecho`; el
envío a GBM de ese día baja en lo **previsto**: si se mandó menos, la diferencia se queda en la
cuenta para la quincena, no se va a GBM mientras la tarjeta tenga saldo.
Si un cobro cae en un mes lo decide `caeEnMes` —`cada`, `desde` y `hasta`; sin `cada`, `desde` es
el primer mes en que cae—, el mismo predicado que usa el desglose de la proyección.

**El patrimonio, igual: una sola fórmula.** `CIFRAS.patrimonio(fin)` devuelve `neto` (inversiones,
fondo, activos y Bitcoin a precio de hoy, menos todas las deudas), `liquido` (lo mismo sin los
bienes: es el número del millón), `bienes` y `deuda`. Sin argumento usa el `finanzasmx_v2` que leyó
el módulo; el Dashboard le pasa el suyo (`patrimonioNeto()`, `patrimonioLiquido()`) y Coach lo usa en
"Progreso real" y en la brecha del Plan Maestro, así que las dos apps dan el mismo patrimonio.

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
| `PROYECTO.nacimiento` | 1995-07-01 | La edad del Dashboard (Tu año) y de Salud (IMC por edad) sale de aquí |
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
| `{{didiAhorro}}` | $5,000 | Lo que Didi aparta al mes —a la BBVA mientras tenga saldo, después a GBM—, de octubre de 2026 a enero de 2027 (dicho por Adán) |
| `{{didiAhorroMas}}` | $10,000 | Lo mismo desde `PROYECTO.didiMasDesde` (febrero de 2027), cuando trabaja más horas. El último mes en México va la mitad (`didiAlAhorro`) |
| `{{siVale}}` | $940 | Vale de despensa |
| `{{ingresoTotal}}` | $53,140 | Derivada: sueldo + Didi + Si Vale |
| `{{renta}}` | $11,250 | Día 1 · hasta enero de 2027 (`PROYECTO.rentaHasta`): el depa se entrega a fin de mes y desde febrero la renta es ahorro |
| `{{aporteCasa}}` | $3,000 | Día 1, a su familia, de `PROYECTO.enCasaDesde` (el mes siguiente a `rentaHasta`) a `PROYECTO.ultimoMesMexico`. En casa come ahí y solo paga su desayuno |
| `{{gym}}` `{{gymNombre}}` | $650 · Total Pass | Día 17 |
| `{{celular}}` `{{celularPlan}}` | $650 · Plan de datos AT&T | Día 1 |
| `{{servicios}}` | $1,075 | Plan AT&T + internet + gas (la mitad: es bimestral) + luz/agua |
| `{{suscripciones}}` | $1,080 | Gym + Claude Code + iCloud |
| `{{cetesDia15}}` | $0 | El aporte a CETES del día 15. En 0: el ahorro va todo a GBM (Adán, 5-oct-2026: *"el ahorro no se irá a cetes, se irá a gbm, lo invertiré todo"*). Los CETES que ya tiene siguen siendo su fondo de emergencia |
| `{{ahorroDia1}}` | $2,050 | Págate primero, con depa: lo que va a GBM el día 1, desde noviembre de 2026 |
| `{{ahorroDia15}}` | $6,950 | Lo mismo el día 15, con depa |
| `{{ahorroDia1Casa}}` | $12,100 | En casa de su familia: lo que va a GBM el día 1 |
| `{{ahorroDia15Casa}}` | $8,900 | En casa: lo que va el día 15. Cada quincena se sostiene sola (Adán: *"eso debe ser cada quincena y deja dinero sobrante para la quincena"*): su sueldo menos los fijos de sus días, la comida de sus días y su parte del gasto personal —sus rutinas y el tope de lo demás (`SUPUESTOS.loDemas`, `loDemasEnCasa`) repartidos por día—, redondeado a cientos hacia abajo con el peor mes de cada etapa. Mientras la BBVA tenga saldo, los cuatro van primero a ella (`planBbva`) |
| `{{especulacionMes}}` `{{especulacionBtcPct}}` | $20,000 · 10 | La pestaña *Riesgo súper alto* de Qué invertir hoy: al mes, `{{cetesDia15}}` a CETES (hoy nada), ese % a Bitcoin y todo el resto a una sola empresa a la baja que investiga Claude |
| `{{fijosTotal}}` | $13,405 | Derivada: renta + servicios + suscripciones |

### Deudas · saldos vivos (`finanzasmx_v2`)

| Marcador | Valor hoy | id |
|---|---|---|
| `{{autoSaldo}}` `{{autoTotal}}` `{{autoPago}}` `{{autoTasa}}` `{{autoMeses}}` | $279,363 · $315,800 · $6,700 · 12.99% · 56 (calculado) — baja sola cada día 15 (`aplicarPagosFijos`) | `d003` |
| `{{tcBbva}}` `{{tcBbvaMin}}` `{{tcBbvaTasa}}` | $8,900 · $1,500 · 55.7% | `d001` |
| `{{banamex}}` `{{banamexMin}}` | $0 · $810 — liquidada el 30-sep-2026 | `d002` |
| `{{depto}}` | $0 — "por temas de mi apartamento"; pagada entera el 21-sep-2026 | `d012` |
| `{{iphone}}` | $9,880 — baja sola cada día 1 (`aplicarPagosFijos`) | `d008` |
| `{{appleWatch}}` `{{appleWatchCuota}}` | $0 · $854 — liquidado: la última cuota era la del 18 sep 2026 | `d004` |
| `{{zapStylo}}` `{{zapStyloCuota}}` | $0 · $167 — "el de los zapatos", liquidado el 21-sep-2026 | `d009` |
| `{{deudaTotal}}` `{{deudaCara}}` `{{deudaMsi}}` | $298,143 · $8,900 · $9,880 | derivadas |
| `{{minimosDeuda}}` `{{margen}}` | suma de mínimos vivos · lo que sobra al mes | derivadas |

**Derivadas del auto**, que antes se escribían a mano y se quedaban congeladas: `{{autoMeses}}`
sale de `CIFRAS.mesesRestantes(deuda)` —saldo, tasa y pago de hoy, la fórmula de la anualidad—
porque el `remainingMonths` del seed (61) no bajaba con el saldo; queda solo como respaldo si
falta el pago. De ahí `{{autoAPagar}}` (meses × pago) y `{{autoInteres}}` (lo que cuesta en puro
interés). El detalle de intereses del Dashboard usa la misma función para cualquier crédito a plazo.

**La BBVA debe $8,900 al 19-oct-2026 y se paga quincena a quincena** desde el 5-oct, cuando debía $15,000 (Adán: *"me estás
diciendo de pagar mi tarjeta pero ni tengo dinero, eso está mal, eso debe ser cada quincena y deja
dinero sobrante para la quincena; actualmente debo 15,000 a bbva"*). La Banamex quedó liquidada el
30-sep-2026. El 19-sep la venta del Bitcoin había dejado la BBVA de $39,000 en $900; el 30-sep iba
en $10,000 y la pagaba completa; el 5-oct, en $15,000, ya sin con qué pagarla el 11; el 14-oct, en
$9,900 (*"el credito de tarjeta de bbva ya bajo a 9,900"*), y el 19-oct, en $8,900 (*"aún debo hoy mismo,
debo 8,900"*): los abonos del 15 y de ese lunes no pasaron como decía el plan. Cada saldo nuevo que
reporta es una entrada de `MIGRACIONES` (`_bbva20261005` además puso `noInterest` en 0 para que el 11
no pida el total; la última es `_saldos20261019`, que con la tarjeta puso la cuenta y el efectivo y
quitó los abonos que el plan había restado solo después del 14), el saldo en `d001` y su día en
`PROYECTO.bbvaSaldoFecha`. El arranque del plan, `bbvaInicio` ($15,000) el día `bbvaFecha`, no se mueve. **No paga intereses**: cada mes cubre lo que pide el estado de cuenta para no generarlos (Adán, 6-oct-2026: *"bbva no va cobrar intereses, eso déjalo en 0"*); `PROYECTO.bbvaSinIntereses` se lo dice al plan y a `tasaQueCorre` del Dashboard, y la tasa de 55.7% se queda como la del producto. Con Banamex en $0 su mínimo de $810 sale de
`minimosDeuda` y `margen` sube eso mismo; `deudaCara` es solo la BBVA. En `d001` `total` se queda
en $39,000: el "pagado real" de las barras de Finanzas sale de ahí.

**`planBbva()`** es el plan de pago, y la única cuenta: lo leen el calendario (`agendaDia`), el
desglose del sueldo (`desgloseMes`, renglón `tarjeta`) y la proyección. Arranca de
`PROYECTO.bbvaInicio` el día `bbvaFecha` y, el día `bbvaSaldoFecha`, se ancla al saldo de `d001` en
DEUDAS_SEED: los abonos de antes se quedan como pasaron, así la proyección no vuelve a contar como
ahorro lo que ya se pagó, y lo que vaya adelante del plan llega a GBM en la quincena en que la
tarjeta ya no lo pide. La deuda cara va primero (prompt del Plan Maestro): lo
que cada quincena manda a GBM y lo que Didi aparta cada lunes van a la tarjeta hasta dejarla en
cero, y el día de pago se cubre, con lo de Didi, lo que pide el estado de cuenta. Con `bbvaSinIntereses` no corre interés; sin él correría por día a la tasa más
IVA y cada abono lo pagaría primero, así el último no deja centavos. Con los números de hoy, desde
los $8,900 del 19 de octubre: $1,154 de Didi los lunes 19 y 26, $2,050 de la quincena el 1 de
noviembre, $1,154 los lunes 2 y 9 y $2,235 el 15 (el resto de esa quincena, a GBM); queda en cero el
`{{bbvaCero}}` (15 nov 2026) con `{{bbvaIntereses}}` ($0) de intereses. `{{bbvaRuta}}` dice esos abonos
en una frase, desde hoy (`bbvaRutaTxt`): la prosa del Plan Maestro y de Coach lo usa en vez de
escribir las fechas. En cero se cancela (Adán, 15-oct-2026: *"después que la liquide la cancelo y de ahí nos
vamos a incrementar números en inversiones"*) y lo que iba a ella va a GBM.

**Con Finanzas en el navegador, el plan sigue al saldo vivo** (Adán, 15-oct-2026: *"debe
actualizarse lo de tarjeta de bbva solito, en base a cuánto gasto y cuánto gano cada día"*): arranca
HOY del saldo de `d001` que lleva Finanzas, que se mueve solo con los abonos del plan y con cada
compra y cada pago anotados. Un día con pago lleva lo pagado (`hecho`, con lo previsto en `plan`,
topado en lo que la tarjeta debía ese día); un día que Adán dijo que no mandó (`omitidos` de la
deuda) no lleva abono, y lo previsto de la quincena se queda en la cuenta (`omitidos` del plan: la
agenda no lo manda a GBM). `desgloseMes` cuenta un abono hecho por lo previsto —es el presupuesto— y
uno de más no entra.

**Los abonos del plan se restan solos el día que tocan** (`aplicarPlanBbva`; Adán, 17-oct-2026: *"no
se actualiza conforme a los días"*): al cargar cualquier app, después de las migraciones, cada abono
del plan cuyo día ya llegó se anota en Finanzas —una transacción en Deudas con `origen: 'plan'` y
`abono` (de dónde sale), y el saldo de `d001` que baja—. Si ese día ya hay un pago anotado a mano,
manda el anotado, y un pago a mano posterior responde por lo de antes. `planAl` dice hasta qué día ya
se aplicó: nada se resta dos veces y lo que se quitó no vuelve. El Dashboard la vuelve a llamar
cuando cambia el día con la página abierta. El **control 37** vigila las dos llamadas. Así el saldo baja con los días: desde los $8,900 del 19
de octubre, $6,592 el 26 (con lo de Didi del 19 mandado), $4,542 el 1 de noviembre, $3,388 el 2, $2,235 el 9
y $0 el 15. Un saldo dicho el mismo día de un abono (`bbvaSaldoFecha` igual a hoy) es de antes de ese
abono: el del día no se resta solo, se queda como lo que toca hoy, y «Ya lo mandé» lo anota. Sin datos (el verificador,
un navegador en blanco) es el plan puro desde `bbvaSaldoFecha`, idéntico al de antes. Se calcula
una vez por día y por lectura de Finanzas (`planCache`): lo piden el calendario y la cuenta de la quincena día por
día. Con la tarjeta en cero, `fin` es el día en que llegó ahí (su último movimiento).

### La tarjeta se mueve con lo que se anota

Una sola regla para Finanzas y el Dashboard. **`tarjetaDe(t, debts)`**: la tarjeta de crédito que
nombra un gasto —en la nota (*TC BBVA*) o, si es un pago en `Deudas`, también en la descripción
(*Pago: Tarjeta BBVA*)—; *débito* en la nota es la cuenta, y una tarjeta con `cancelada` ya no se
nombra. El Dashboard la usa para saber qué no sale de la caja ese día. **`movimientoTarjeta(t, debts,
ahora)`**: lo que le hace a su saldo, `{id, delta}` —una compra suma, un pago resta—; una compra a
meses (*MSI*) es su propia deuda y no lo toca. Solo cuenta lo fechado **después** del último saldo
que dijo Adán (`corteTarjeta`: `saldoAl` de la deuda, sus `liquidaciones` y, para la BBVA,
`bbvaSaldoFecha`), porque ese saldo ya traía lo de ese día y lo de antes; `ahora` es un pago que se
hace en el momento («Pagar» en Finanzas, «Ya lo mandé» en el Plan Maestro) y cuenta con la fecha
que lleve. El **control 36** del verificador vigila que la regla siga siendo una sola: ni Finanzas ni el
Dashboard vuelven a buscar por su cuenta las palabras de las tarjetas.

Lo que guarda cada uno en `finanzasmx_v2`:

| Campo | Dónde | Qué es |
|---|---|---|
| `tarjeta: {id, delta}` | transacción | lo que le aplicó a la tarjeta, para deshacerlo al editarla o borrarla; `null` si no movió nada. Las anotadas antes de la regla no lo llevan y no mueven saldos |
| `origen: 'plan'`, `abono` | transacción | el abono que el plan restó solo ese día, y de dónde sale (`quincena`, `didi`, `minimo`) |
| `origen: 'planmaestro'`, `anotado`, `original` | transacción | la anotó o la corrigió el Plan Maestro ese día («Ya lo mandé», «Abonar», «Corregir»): lo que busca «Deshacer»; `original`, lo que había restado el plan |
| `planAl` | deuda (`d001`) | hasta qué día ya se aplicaron los abonos del plan |
| `omitidos: [{fecha, de, monto}]` | deuda (`d001`) | los abonos del plan que Adán dijo que no mandó («No lo mandé») |
| `fecha` | deuda | el día de su último movimiento |
| `saldoAl` | deuda | el día en que se escribió su saldo a mano en Finanzas: un saldo dicho |
| `cancelada` | deuda | el día que se canceló, ya en $0 |

**`bbvaEstado()`** es lo que el Plan Maestro le dice cada día: el saldo vivo, el día que queda en
cero, lo que toca hoy si el plan todavía no lo restó (`hoy`), lo ya mandado hoy (`pagadoHoy`), lo que
el plan restó solo hoy y los dos días de antes (`recientes`, para corregirlo), lo que hoy no se mandó
(`omitidoHoy`), el abono `siguiente` y `cancelada`. Un pago a la BBVA posterior al último saldo dicho lo pone el plan en su
día, así que `yaContado` lo da por contado aunque se llame distinto.

**El 21-sep-2026 se liquidaron tres de golpe**: el Apple Watch (`d004`, su última cuota era la del
18 sep), los zapatos (`d009`, el último MSI vivo de la TC BBVA) y la deuda del departamento (`d012`).
Con ellas salen de `minimosDeuda` los $854 del reloj y los $167 de los zapatos, y `margen` sube eso
mismo; `deudaMsi` se queda solo con el iPhone. El auto bajó a $283,000 ese mismo día.

**La deuda del departamento** (`d012`) entró el 16-sep-2026 con $13,000 (*"tengo una deuda de 13,000
por temas de mi apartamento"*) y **se pagó entera el 21-sep-2026**. Es `type:'loan'` a 0%: mientras
vivió sumó en `deudaTotal` y no en `deudaCara` ni en `deudaMsi`; nunca tuvo mínimo ni día, así que
no tocó `margen` ni el calendario.

**El día de pago vive en `day`**, dentro de cada entrada de `DEUDAS_SEED`. No tiene marcador
porque no se escribe en prosa, pero **sí se dibuja**: el calendario del Dashboard arma con él el
globo de "se mueve dinero" de cada día.

| id | Deuda | `day` |
|---|---|---|
| `d008` | iPhone 15 · crédito AT&T | 1 |
| `d002` | Tarjeta Banamex | 8 |
| `d001` | Tarjeta BBVA | 11 |
| `d003` | Crédito Automotriz | **15** |
| `d004` | Apple Watch MSI | 18 |
| `d009` `d010` `d011` | MSI de TC BBVA | 22 |

`d012` (deuda del departamento) no está en la tabla: nunca tuvo mínimo ni día, y ya está pagada.

**Un `day` equivocado no mueve ninguna cifra** — `minimosDeuda` y `margen` suman igual — así que
ningún cálculo lo delata: solo se ve en el calendario. `day: 0` significa *sin día* y la deuda
desaparece de todas las fechas. Por eso el **control 9** exige día a toda deuda con saldo y
mínimo, y el **control 10** compara esta tabla contra el maestro fila a fila.

⚠️ **`deudaMsi` no son solo los MSI de tarjeta.** El criterio real es `type === 'other'` con saldo
vivo, o sea **deuda a 0% de interés**: ahí entra el crédito de AT&T del iPhone, que no es de
ninguna tarjeta. Es lo correcto para el plan — no es deuda cara y no compite con la TC BBVA —
pero el nombre de la variable se queda corto.

### Ahorro y metas

| Marcador | Valor hoy | Origen |
|---|---|---|
| `{{fondo}}` `{{fondoMeta}}` | $6,000 de $10,000 — son los CETES | vivo |
| `{{salidaTotal}}` | $397,878 — lo que cuesta irse a Alemania, completo (`SALIDA.costos`) | derivada; se mueve con `PROYECTO.eurMxn` |
| `{{salidaJunio}}` | $254,478 — lo que tiene que estar en la cuenta en junio de 2027: la cuenta bloqueada y la visa | derivada |
| `{{sperrkonto}}` | $249,984 — la cuenta bloqueada, €11,904 al euro del plan | derivada |
| `{{sperrkontoEur}}` `{{colegiaturaEur}}` `{{werkstudentEur}}` | €11,904 · €1,900 · €1,100 — en euros, como los pide Alemania: la cuenta bloqueada (`SALIDA.costos`), la colegiatura de cada semestre y lo que deja el Werkstudent al mes, neto (`SUPUESTOS.alemania`) (`fmt: 'txt'`) | constantes |
| `{{bydRenta}}` | $7,500 — lo que deja el BYD rentado al mes, neto (`SUPUESTOS.byd.rentaNeta`) | constante |
| `{{ahorroMesDepa}}` | $14,000 — lo que llega a GBM en un mes con depa: lo del 1, lo del 15 y Didi | derivada (`mesTipo(false)`) |
| `{{ahorroMesCasa}}` | $31,000 — lo mismo en casa de su familia: lo del 1, lo del 15 y Didi | derivada (`mesTipo(true)`) |
| `{{gastoPersonalDepa}}` | $8,022 — lo que queda del sueldo con depa tras los fijos, la comida y el ahorro: su gasto personal, con sus rutinas dentro; lo que pague con tarjeta, saldado en la misma quincena | derivada |
| `{{gastoPersonalCasa}}` | $7,255 — lo mismo en casa | derivada |
| `{{cuidadoMes}}` | $4,624 — lo que cuestan al mes sus rutinas de piel, cabello y suplementos (`RUTINA_PIEL`, `RUTINA_PELO`, `SUPLEMENTOS`) | derivada |
| `{{recorteRutinas}}` | $1,880 — lo que se ahorraría al mes con todos los `recorte` de sus rutinas; $857 de eso los decide su dermatólogo | derivada (`rutinasDesglose()`) |
| `{{alemaniaMarzo}}` | $130,686 — lo que la proyección espera en GBM al cerrar la Fase 1, con el ritmo de hoy | derivada de la PROYECCION |
| `{{salidaAgosto}}` | $324,284 — lo que pide la salida completa en agosto de 2027: la cuenta bloqueada, la reserva del BYD, el colchón y la colegiatura del primer semestre (`cortes.salida.pide`) | derivada; se mueve con `PROYECTO.eurMxn` |
| `{{extraSalida}}` | $11,119 — el ingreso nuevo al mes, de `SUPUESTOS.extraDesde` al último mes en México, que paga esa salida completa (`salidaConIngreso()`) | derivada |
| `{{marzoParaSalida}}` | $186,282 — lo que tendría GBM al cerrar la Fase 1 con ese ingreso nuevo: el punto de control del 31 de marzo | derivada |
| `{{mayoParaSalida}}` | $258,920 — lo mismo el día de decidir (`PROYECTO.maestriaDecision`) | derivada |
| `{{salida2028}}` | «sobran …» o «faltan …»: la salida completa si se mueve a septiembre de 2028 (`desfase: 12`, `fmt: 'txt'`) | derivada |
| `{{alemaniaJunio}}` | $207,592 — la cuenta a fin de junio de 2027, con el ritmo de hoy | derivada de `PROYECCION.cortes` |
| `{{bbvaCero}}` | 15 nov 2026 — el día que la BBVA queda en cero con `planBbva` (`fmt: 'fecha'`) | derivada |
| `{{bbvaIntereses}}` | $0 — lo que costaría en intereses llegar a cero; en 0 con `PROYECTO.bbvaSinIntereses` | derivada |
| `{{bbvaRuta}}` | «hoy, $1,154 de Didi; el lunes 26, $1,154 de Didi; … y el domingo 15 nov, $2,235 de la quincena»: los abonos que le quedan a la BBVA, desde hoy (`bbvaRutaTxt`, `fmt: 'txt'`) | derivada de `planBbva` |
| `{{junioVeredicto}}` | «faltan … para la cuenta bloqueada» o «alcanza, con … de margen» (`fmt: 'txt'`) | derivada |
| `{{junioCorto}}` | «faltan …» o «sobran …»: lo mismo en corto, para la cifra grande de las tarjetas de las fases (`fmt: 'txt'`) | derivada |
| `{{salidaVeredicto}}` | «faltan …» o «sobran …»: lo que pide la salida —cuenta bloqueada, reserva del BYD, colchón y la colegiatura del primer semestre— contra la cuenta a fin de agosto (`fmt: 'txt'`) | derivada |
| `{{mesMillon}}` | ago 2031 — el mes en que la proyección cruza el millón (`fmt: 'mes'`) | derivada de la PROYECCION |
| `PROYECTO.eurMxn` | 21.0 — el euro para planear; el 2-oct-2026 estaba en $20.46 | constante |
| `{{cetes}}` | $6,000 — el mismo número que `{{fondo}}` | derivada de `fondo` |
| `{{maestria}}` `{{maestriaMeta}}` | $17,250 de $398,000 — el dinero es `CIFRAS.fondoMaestria()`: el fondo de emergencia (CETES), las inversiones de Finanzas (hoy el depósito de la renta) y el Bitcoin; la meta es lo que cuesta irse (migraciones `_alemania20261003` y `_ahorroReal20261003`) | derivada de lo vivo |
| `{{maestriaEscuela}}` | Esslingen — Automotive Systems M.Eng. | constante |
| `{{maestriaInicio}}` `{{decisionMaestria}}` | 1 sep 2027 · 31 may 2027, la decisión (`PROYECTO.maestriaInicio`, `maestriaDecision`) | constantes, con `fmt: 'fecha'` |
| `{{hyroxSede}}` `{{hyroxFecha}}` | HYROX Guadalajara · 20 mar 2027, el primer Hyrox (`PROYECTO.hyroxSede`, `hyroxFecha`). Lo leen Mis Metas, la lista de salida y Coach | constantes |
| `{{metaMillon}}` | 31 dic 2031 — el cierre de la última fase del Plan Maestro | derivada de `PHASES` |

**El fondo de emergencia son los CETES** (Adán, 20-sep-2026: *"mi fondo de emergencia van a ser los
cetes, de ahí tendré mi fondo de emergencia y cualquier cosa los vendo"*). Es **un solo número**,
`emergencyFund` en `finanzasmx_v2` (y `current` de la meta `ef-001`, que se llama "Fondo de
emergencia (CETES)"); ya no hay una inversión CETES aparte en `investments`, porque las apps sumaban
las dos cosas en patrimonio y en el fondo de la maestría. **Ya no recibe aporte**: el ahorro de cada
quincena va a GBM (`{{cetesDia15}}` en $0) y el fondo se queda en lo que tiene; una aportación en
Finanzas → Metas → ef-001 sigue siendo la forma de subirlo. Hasta la salida, el colchón del plan son los CETES más GBM: lo que le falta a `ef-001` lo cubre la primera quincena que llega a GBM.

### La salida a Alemania y la proyección

Adán se va a la maestría de Esslingen en **septiembre de 2027** (`maestriaInicio`) y el BYD se queda: se renta a un conductor de plataforma mientras está fuera. Dos estructuras lo sostienen:

- **`SALIDA`**: lo que cuesta irse (`costos`, cada uno en su mes, en pesos o en euros al
  `PROYECTO.eurMxn`; `gasta:false` es dinero que se mueve pero sigue siendo suyo: la cuenta
  bloqueada, la reserva del BYD y el colchón) y la lista exhaustiva de lo que hay que reunir
  (`bloques`: admisión, visa, dinero, el BYD, salud física y mental, ropa, tecnología, vivienda,
  trabajo y lo que se queda en México), cada pendiente con su mes. Coach la pinta.
- **`PROYECCION`**: el plan mes a mes desde la foto de Finanzas del 1 oct 2026 hasta el millón —lo
  que entra, lo que sale, GBM (todo el efectivo) y el patrimonio líquido—, y
  `cortes`: lo que piden junio (la cuenta bloqueada) y el último mes en México (la cuenta
  bloqueada, la reserva del BYD, el colchón y la colegiatura del primer semestre) contra lo que
  hay. `CIFRAS.proyectar(cambios)` corre escenarios —`menosAhorro`, `extraMes` (un ingreso nuevo al mes desde `extraDesde`), `desfase: 12` para irse en
  septiembre de 2028, otro euro, sin Werkstudent— y `CIFRAS.cortesSalida(filas, cambios)` los
  mide. De aquí salen el `liquido` de cada fase y los marcadores de la salida.
  Cada mes guarda además su detalle: `partes` —los renglones que forman `entra` (positivos) y
  `sale` (negativos), y suman exacto—, `aparte` —lo que se mueve sin dejar de ser suyo: la cuenta
  bloqueada, la reserva del BYD, el colchón y el depósito del depa—, `rendimiento`, y lo que
  queda de cada deuda (`auto`, `iphone`, `bbva`) y del depósito. `SUPUESTOS.porque` dice de dónde
  sale cada supuesto, en una frase con su fuente. Coach los enseña mes por mes.

**Las mensualidades fijas se anotan solas: `aplicarPagosFijos()`** (Adán, 19-oct-2026: *"siempre en
finanzas algo está desactualizado… arréglalo y que no vuelva a pasar"*). Una deuda a plazo con `pagosAl`
—hasta qué día ya se aplicaron sus pagos— recibe cada mensualidad el día que toca, como los abonos de la
BBVA: una transacción en Deudas con `origen: 'plan'`, `abono: 'mensualidad'` y `prestamo: {id, delta}`, y
el saldo que baja por el capital (en el auto, la mensualidad menos el interés del mes). Corre al cargar
cualquier app junto a `aplicarPlanBbva`, y el Dashboard la vuelve a llamar al cambiar el día (control
37). El auto y el iPhone la llevan desde `_mensualidades20261019`; en `DEUDAS_SEED` ya van con su saldo de
hoy. `cuotas(d)` da cuántas van, cuántas faltan (con interés, `mesesRestantes`) y la fecha de la siguiente
y de la última: una sola cuenta para Finanzas.

**Lo que va a GBM cada semana: `gbmMes(ym)`**: el envío de cada quincena (los cobros `ahorro` de
`agendaDia`), lo de Didi de los lunes —`didiGbmLunes(ym)`: lo que `desgloseMes` le deja a GBM, repartido
entre los lunes que no van a la tarjeta, la misma regla de `estadoDia`—, las ventas del plan, el depósito
que regresa y los abonos de la BBVA desde el último saldo dicho. Lo pinta el plan de inversiones de
Finanzas. **`presupuestoFijo(cat, ym)`**: el límite de una categoría de Finanzas que el plan conoce
(renta y aporte, servicios, suscripciones, comida, rutinas y deudas), de `desgloseMes`.

**Tu dinero un día, de lo de hoy en adelante: `estadoDia(fecha)`** (Adán, 19-oct-2026: *"conforme
seleccione otro día, debes proyectar todo todo hasta mis inversiones… ya tenemos un trackeo muy
completo de mis finanzas y actualiza todo día a día"*). La `PROYECCION` es el plan desde la foto del 1
oct; esto arranca de lo que hoy dice Finanzas —la BBVA viva, lo invertido, los CETES, el depósito del
depa, el auto, el iPhone y el Bitcoin— y camina día por día con el mismo plan que el calendario: los
abonos de `planBbva`, lo que cada quincena manda a GBM (los cobros `ahorro` de `agendaDia`, ya sin la
parte de la tarjeta), lo que Didi aparta cada lunes cuando ya no va a la tarjeta, las ventas de
`SUPUESTOS.extras` (el último día de su mes), lo que cuesta la salida ese mes (`SALIDA.costos` con
`gasta`, de GBM y también el último día: `aSalida`), el depósito que regresa el mes después de `rentaHasta` y
lo que bajan el auto (su día, con su interés) y el iPhone. Devuelve el estado de ese día (`bbva`, `gbm`,
`cetes`, `deposito`, `btc`, `auto`, `iphone`, `otras`), lo que se mandó para llegar ahí (`aBbva`, `aGbm`,
`aSalida`, `movs`) y, para hoy, lo que el plan pide hoy (`pendiente`). Hoy es lo real; un día que viene ya cuenta
lo de hoy, porque proyectar es seguir el plan. El dinero para gastar —la cuenta y el efectivo— no va
aquí: lo lleva la cuenta de la quincena del Plan Maestro (`ctTramo`), con la comida y lo anotado. Un día que ya pasó, o después de
`ultimoMesMexico`, devuelve null. Desde los saldos del 21-oct-2026, la proyección pone GBM en $4,459 el
20 de noviembre —la BBVA quedará en cero el 15—, en $34,254 el 31 de diciembre, ya pagadas las apostillas, y en
$121,504 el 31 de marzo, con el depósito ya dentro. Lo usa Finanzas: GBM y los CETES al cerrar la fase y al irte, si sigues el plan. **Sube mes a
mes lo mismo que la `PROYECCION`** (control 43); lo que las separa es de dónde arrancan: el plan contó como ahorro
los $1,990 de la cuenta y el efectivo del 1 oct. Por eso lo que pide una fase y lo que da tu ritmo —el checkpoint
de la banda, la meta de la fase, Mis Metas, la ventana de las fases— salen del plan, y este, de lo de hoy.

**El ahorro sale de lo que se manda, no de una resta.** En México, del sueldo solo llega a GBM lo
que se aparta el día que entra cada quincena —`ahorroDia1`, `ahorroDia15`, `ahorroDia1Casa` y
`ahorroDia15Casa`, que son cobros del calendario, menos lo que se lleva la BBVA mientras tenga
saldo— y de Didi lo que Adán dijo
que aparta (`didiAlAhorro`). Lo demás del sueldo son los fijos, la comida, sus rutinas y el gasto personal,
que es lo que queda: `desgloseMes(mes)` lo da renglón por renglón con el `grupo` de cada cobro —y en
`items` los cobros de cada grupo, para que el Dashboard abra un renglón en sus partes—, y
`mesTipo(casa)` da un mes tipo de cada etapa —con depa y en casa de su familia— para las tablas
de las fases. Así el calendario del Dashboard y la proyección no pueden decir cosas distintas, y
el verificador lo comprueba mes a mes. El aguinaldo paga el seguro del BYD y ALTEN no da
finiquito: no entran.

**La salida se mide completa.** Los dos puntos de control del plan —el cierre de la Fase 1
(`{{marzoParaSalida}}`) y el día de decidir (`{{mayoParaSalida}}`)— comparan GBM contra lo que pide
agosto, no solo contra la cuenta bloqueada de junio: con un ritmo que alcance junio y no agosto, la
salida se haría a medias. Lo que falta se dice como ingreso nuevo al mes (`{{extraSalida}}`), porque
los recortes de las rutinas (`{{recorteRutinas}}`) y las ventas ya contadas no llegan; sin ese
ingreso, la fecha que el ahorro sí paga es septiembre de 2028 (`{{salida2028}}`). `salidaConIngreso()`
reparte el hueco de agosto entre los meses que quedan en México y corre la proyección con él.
Para cambiar un supuesto (el tope de lo demás, la comida de la lista, lo que cuesta la vida allá, el Werkstudent,
la renta del auto) se edita `SUPUESTOS`; para un costo, `SALIDA.costos`; para lo que se manda cada
quincena, `PROYECTO.ahorroDia…`. Las fases, los marcadores y Coach se recalculan solos.

**Dónde recortar.** Un producto de piel, cabello o suplementos puede llevar un `recorte`: **una**
recomendación concreta, nunca un menú (Adán, 2026-08-18: *"no me des alternativas, porque si no al
final no compraré nada"*), con su precio y envase (`contenido` o `envase`, con fuente y fecha) o
`quitar: true`, y `medico: true` cuando el cambio lo decide su dermatólogo. `rutinasDesglose()`
calcula cada producto al mes con la fórmula de su rutina y lo que costaría el recorte con la misma
dosis; Coach (en cada fase en México) y la ventana de fases del Dashboard lo pintan debajo de la
tabla, en verde. Lo que recorte va a GBM.

### Estudios de alemán · constantes

| Marcador | Valor hoy | Para qué |
|---|---|---|
| `{{escuelaAleman}}` | Cenlex Santo Tomás | Clases presenciales desde el 25-ago-2026. La citan Coach y el inicio de Alemán |
| `{{proteinaMeta}}` | 186 | Meta diaria de proteína. La citan la rutina (whey de la noche) y la ficha de whey de Salud |
| `{{kcalMeta}}` | 3115 | Meta diaria de calorías del Plan Masa Muscular (≈325 sobre el mantenimiento). Con `carbsMeta` (404 g) y `grasaMeta` (86 g), que viven a su lado en `PROYECTO`: las leen Comida y la semilla de Salud |
| `{{kapitelAleman}}` | 10 | El capítulo que cursa en Cenlex. Dato del proyecto; no filtra ninguna pantalla |

### La rutina diaria

`RUTINA_TASKS` — **56 bloques** con sus subtareas: el horario completo de los 7 días. No es un
marcador, se pide desde JS:

```js
CIFRAS.rutina('')                          // Coach: los href ya son anclas suyas
CIFRAS.rutina('../Coach/Coach.html')    // Dashboard: tiene que salir de su archivo
```

Devuelve **copia profunda** con los `href` resueltos, para que una app no pueda contaminar a la
otra dentro de la misma página. `dias`: 0=domingo…6=sábado. Los bloques con `fijo:true` (ALTEN)
salen en la línea de tiempo pero no llevan checkbox ni suman al progreso.
Cada bloque lleva dos títulos: `txt`, el completo (el AHORA del Dashboard y Coach), y `corto`, el de
la agenda de Mi Día —«🚗 Didi rumbo a ALTEN» en vez de «Didi con direccionamiento — camino a ALTEN
(~50 min…)»—, sin horas dentro: la hora de inicio y fin la pone la agenda. Los de ejercicio toman
el corto del nombre de la rutina real (`tituloCorto` en el Dashboard).

**La noche de lunes a viernes sí tiene marcadores**, porque la citan Coach, Cuidado Personal, los
hábitos y las fichas del Dashboard. Salen de los bloques de `RUTINA_TASKS` por su id, así que
mover un bloque los mueve a todos. La noche está ordenada para dormir 7 h (Adán, 13-oct-2026:
*"corrige el tiempo de sueño"*): la app es la última pantalla y lo que sigue va sin celular.

| Marcador | Valor hoy | Bloque |
|---|---|---|
| `{{horaDespertar}}` | 06:40 | `wd01` |
| `{{horaApp}}` | 22:30 — Construir esta app, media hora | `wd-app-pm` |
| `{{horaRutinaNoche}}` | 23:00 — piel, minoxidil y suplementos, sin pantalla | `wd-pm` |
| `{{horaMeditacion}}` | 23:30 | `wd20` |
| `{{horaDormir}}` | 23:40 — luz fuera | `wd21` |
| `{{horasSueno}}` | 7 h — de `wd21` a `wd01` | derivada |

El hábito «Dormir 7 h» (`habitos.js`) lleva su hora y su nombre escritos —son datos que Adán puede
editar en la pantalla—, así que el **control 31** comprueba que la semilla diga lo mismo que la
rutina y que ningún otro archivo vuelva a escribir las horas de sueño a mano.

### La versión corta de cada paso

Cada paso de una ruta (`APRENDIZAJE[hab].subs[]`) trae, además de su texto largo (`c`), su instrucción corta y revisada (`corto`): una frase completa y en palabras de todos los días, que es lo que enseña la tarjeta *Ejercicio de …* de Mi Día. Un paso nuevo llega con su `corto`; el control 34 del verificador lo exige.

### Los recursos de las rutas de habilidad

Cada paso de una ruta (`APRENDIZAJE[hab].subs[].r`) y cada habilidad
(`APRENDIZAJE[hab].recursos`) traen **con qué** hacerlo, y cada recurso dice **qué es** y **cómo
llegar** (una cadena de texto pintaba un libro delante de todo, fuera podcast o portal, y no
llevaba a ninguna parte):

| Tipo | Qué lleva | Qué hace el botón |
|---|---|---|
| `libro` | `id` de BIBLIOTECA | abre su ficha |
| `yt` `podcast` `curso` `web` `repo` `practica` `empleo` | `n` + `url` | abre en otra pestaña |
| `propio` | `n` | nada: es algo suyo — su calendario, su cuaderno — y no hay a dónde ir |

Todos llevan `nota`, que es la frase de por qué ESE recurso para ESE paso.

**El título de un libro no se escribe aquí**: se guarda su `id` y el título y el autor
salen de BIBLIOTECA (repetirlo es error declarado en el control 18). Todo libro que una ruta
recomiende tiene ficha en la biblioteca y entra en la lista de la compra.

Las URLs se comprobaron cargando cada una (las de la ISTQB, Esslingen, pytest y SQLZoo, el 3-oct-2026). Dos respondieron 403 a la
comprobación automática — Wayve y Meta bloquean bots — y se verificaron abriéndolas
en un navegador de verdad.

El pintado es `pfRecursoHtml`, en `ficha.js`, y lo usan el Dashboard (la pantalla de Habilidades)
y Coach, que genera sus rutas de `APRENDIZAJE` con `pintarAprendizaje()`.

### La biblioteca

`BIBLIOTECA` — los **60 libros** en 9 grupos, cada uno con su ficha:

```js
CIFRAS.BIBLIOTECA.todos              // los 60, sin agrupar
CIFRAS.BIBLIOTECA.porGrupo           // lo que usa la lista de la compra
CIFRAS.BIBLIOTECA.deTextoCompra(t)   // del renglón al libro
```

**La ficha de un libro NO lleva los mismos campos que la de un producto**, y por eso
tiene su propio molde (`pfLibroHtml`) y su propio control. De una crema interesa el
activo y cómo se aplica; de un libro, otra cosa:

| Campo | Qué lleva |
|---|---|
| `sobre` | de qué trata y de dónde sale, en amplio |
| `resumen` | qué dice: las ideas centrales, que es lo que se lee si no se lee el libro |
| `porQue` | por qué está en la lista de Adán y no en otra |
| `idea` | la que más rinde, en una frase |
| `cuando` | en qué momento leerlo, y respecto a cuál de los otros |

**Las portadas** salen de Open Library (`covers.openlibrary.org`): 43 de 44. La que
falta — *$100M Offers*, autopublicado — se dibuja con la silueta `libro` en el color
de su grupo. Se eligieron **mirándolas**: la búsqueda devolvió *Roughing It* de Mark
Twain para los dos libros de Hormozi y un disco de música para *One Up On Wall
Street*, y tres se tuvieron que pedir por ISBN de una edición concreta porque el
registro genérico tenía la portada mal asociada.

Ese mismo fallo dejó un rastro que no se veía en la portada: los dos de Hormozi se
quedaron también con **el año y las páginas** de *Roughing It* — 1872 y 558 páginas —
y eso solo se vio abriendo la ficha. El **control 16** lo vigila ahora comparando con
el contexto: en esta lista todo es negocio, finanzas o software moderno, y el único
anterior a 1900 es *Meditaciones*, que está declarado como excepción.

**La ficha vive en dos archivos aparte** — `Dashboard/ficha.css` y
`Dashboard/ficha.js` — porque la usan dos apps: el dashboard, en la lista de la
compra, y **Coach**, donde los libros salen nombrados **58 veces**. Copiar el molde
en cada una era la duplicación de siempre.

Coach no reescribe sus 58 recursos: un script los recorre al cargar, busca cada
título con `BIBLIOTECA.porTitulo()` y le pone el botón al que encuentra. La
descripción corta sale de `ficha.idea`, no del HTML de Coach: ese texto vive en un solo sitio.

`porTitulo` resuelve los **alias**: Coach nombra a Carnegie en inglés (*How to Win
Friends*) y la lista de la compra en español (*Cómo Ganar Amigos*). Son el mismo
libro y no puede haber dos fichas, así que el título alternativo se declara una vez
en `alias`. Cinco libros lo tienen.

**Cuatro apps la usan**, y ninguna copia el molde ni el texto:

| App | Qué enlaza |
|---|---|
| `dashboard.html` | los 112 artículos de la lista de la compra |
| `Coach.html` | las 58 menciones de libros |
| `cuidadopersonal.html` | botiquín de la cara, del pelo, guía de ojos y guía dental |
| `salud.html` | los suplementos |

Las tres últimas no reescriben sus listas: **`pfEnlazar(selector, categoría, nombre,
dónde)`** recorre lo ya pintado, busca cada nombre en el maestro y le cuelga el
botón al que encuentra. **`pfEnlazarVivo`** lo repite cuando la lista se repinta —
pasa al marcar un producto como abierto o un suplemento como tomado — observando
el contenedor, para no tener que tocar cada función de render.

Al que NO encuentra no le pone nada, y eso es cómodo y peligroso a la vez: no falla,
simplemente se queda sin ficha. De ahí el **control 17**.

Los **`alias`** hacen el trabajo de siempre: la guía dental dice «Hilo o seda dental»
y el kit «Hilo dental»; Coach cita a Carnegie en inglés y la compra en español. Es
el mismo producto y no puede haber dos fichas, así que el nombre alternativo se
declara una vez. Diez productos lo tienen — cinco libros y cinco de higiene — y los
nombres de la guía dental son **condicionales** según el perfil, así que se declaran
todas las variantes.

Y `OJ_PRODUCTOS`, en cuidadopersonal.html, **dejó de escribir los nombres a mano**:
salen de `CUIDADO_OJOS`. El emoji y la frase corta sí se quedan ahí, porque dicen
para qué sirve cada cosa *en su caso* («Pantalla — para el bloque de la noche»),
que es más específico que el grupo del maestro.

Como módulo compartido, `ficha.css` **no da por hechos los tokens de la app**:
define los suyos con `var(--x, valor)`, que heredan del tema cuando existe y caen a
un valor propio cuando no. Coach solo define 3 de los 13 que hacían falta, y sin
esto el botón salía gris y con el icono relleno. Lo mismo con el precio: `ficha.js`
lo pide con `typeof lcPrecioOtros === 'function'`, porque esa función solo existe
en el dashboard.

### El kit de higiene y el cuidado de los ojos

`KIT_HIGIENE` (34 artículos en 7 grupos) y `CUIDADO_OJOS` (12 en 4). Cada artículo es un
producto con ficha y las dos listas de la compra salen de aquí:

```js
CIFRAS.KIT_HIGIENE.todos            // los 34, sin agrupar
CIFRAS.KIT_HIGIENE.porGrupo         // {grupo: [texto, ...]} — lo que usa la compra
CIFRAS.CUIDADO_OJOS.deTextoCompra(t)  // del renglón al producto
```

Los dos van agrupados **por la situación, no por el tipo de producto**: en higiene
por bolsa (cuando armas la maleta lo que importa es qué meter en el neceser), y en
ojos por la causa («al volante», «pantalla»). En las fichas de ojos el nombre del
grupo hace de rótulo, porque el grupo ES la explicación.

El **precio no se escribe aquí**: vive en `LISTA_COMPRAS_PRECIOS_OTROS`, en el
dashboard, indexado por el texto del renglón. La ficha lo lee de ahí con
`lcPrecioOtros()`.

### La rutina de la piel

`RUTINA_PIEL` — los **5 productos** que Adán usa en la cara (más la mascarilla opcional), con
lo que hace falta para saber cuánto dura un bote y cuánto cuesta al mes. Se pide desde JS:

```js
CIFRAS.RUTINA_PIEL.pasos('am')        // [{orden, n, cat, uso, min, esperaDespues, ...}]
CIFRAS.RUTINA_PIEL.duracionDias(p)    // contenido / dosisDia
CIFRAS.RUTINA_PIEL.costoMes(p)        // precio / duracion * 30
CIFRAS.RUTINA_PIEL.costoMesTotal      // $683 hoy, sin contar la mascarilla
CIFRAS.RUTINA_PIEL.textoCompra(p)     // el renglón tal cual sale en la compra
CIFRAS.RUTINA_PIEL.deTextoCompra(txt) // y de vuelta: del renglón al producto
```

| Producto | Paso | Tamaño | Dura | Al mes |
|---|---|---|---|---|
| CeraVe Limpiador Espumoso (verde) | AM 1 y PM 1 | 236 ml | ~79 d | $99 |
| The Ordinary Niacinamida 10% + Zinc 1% | AM 2 | 30 ml | ~200 d | $35 |
| La Roche-Posay Anthelios Oil Free SPF50 | AM 3 | 50 ml | ~40 d | **$390** |
| Differin Adapaleno 0.1% Gel | PM 2 | 45 g | ~180 d | $72 |
| CeraVe Loción Hidratante Facial PM | PM 3 | 52 ml | ~104 d | $87 |
| Aztec Secret Indian Healing Clay | opcional | 454 g | ~175 d | $50 |

**Cada producto trae una `ficha`.** *Cómo* se usa vive en `am.uso`/`pm.uso`/`uso`; *qué es* y
*por qué sirve* es la ficha, y la tienen los artículos de las cinco categorías: skincare,
cabello, suplementos, kit de higiene y cuidado de los ojos.

| Campo | Qué lleva |
|---|---|
| `activo` | el ingrediente que hace el trabajo |
| `que` | qué es el producto, en una línea |
| `hace` | qué le pasa a la piel, sin jerga |
| `sirve` | para qué le sirve a Adán en concreto |
| `tarda` | cuándo se nota, para no abandonarlo antes de tiempo |
| `ojo` | el error que arruina el producto |

El botón **«Qué es»** de cada renglón de la lista de la compra abre esa ficha, y el
dashboard **no guarda ni una línea de ese texto**: lo arma todo leyendo el maestro.
Se entra por el texto del renglón — lo único que la lista conoce — y
`deTextoCompra` lo deshace, que es el inverso exacto de `textoCompra`, con el que el
getter de esa categoría lo armó. Las cinco fuentes exponen ese mismo par, así que el
dashboard solo tiene que saber a quién preguntar:

| Categoría | Fuente | De dónde sale el «cómo se usa» |
|---|---|---|
| skincare | `RUTINA_PIEL` | `am.uso` / `pm.uso` / `extra.uso` — son dos rutinas |
| cabello | `RUTINA_PELO` | `uso`, con los días de `diasTexto(p)` |
| suplementos | `SUPLEMENTOS` | no hay `uso`: se arma con `dosis`, `cuando` y `momento` |
| higiene | `KIT_HIGIENE` | `uso` |
| ojos | `CUIDADO_OJOS` | `uso` |

Dos campos de la ficha pueden **no estar en la ficha**: los suplementos ya tenían
escritos `porQue` y `ojo` desde antes, y la ficha los lee de ahí. Escribirlos otra
vez sería crear el segundo sitio de siempre — el control 15 lo marca como error.
Lo mismo con el `aviso` del Avodart, que sale en su propia tarjeta.

**Las imágenes: 45 con foto y 23 dibujadas.** Las fotos van en `foto` y salen de
tres bases con licencia libre — Wikimedia Commons, Open Beauty Facts y Open Food
Facts — buscando con términos en inglés por producto. **Se eligieron mirándolas**,
en hojas de contacto, no por el nombre del resultado: buscar «Differin» devolvía un
limpiador de esa marca, «hair mask» devolvía fotografías de arqueología y «minoxidil»
devolvía un modelo 3D de la molécula. De 67 productos con candidatas, sobrevivieron
45 a la criba.

El criterio depende de cómo esté escrito el artículo, y de ahí sale lo que dice la
etiqueta de la esquina:

| | Nombre del artículo | Qué foto vale | Etiqueta |
|---|---|---|---|
| skincare, cabello | lleva **marca** («CeraVe Limpiador Espumoso») | solo el producto exacto | «Foto del producto» |
| higiene, ojos, suplementos | ya es **genérico** («Cortauñas de mano y de pie») | esa cosa, de cualquier marca | «Foto de referencia» |
| cualquiera, sin foto | — | ninguna servía | «Envase dibujado» |

Por eso skincare y cabello son los que peor salen (6 fotos de 16): sus nombres
llevan marca y casi ninguna marca comercial tiene foto libre. Higiene, en cambio,
tiene 29 de 34, porque un cortauñas es un cortauñas. Los 23 restantes siguen con su
silueta, que para eso está — y el dibujo es además el **respaldo** de las 45 fotos:
vienen de internet y las apps se abren con `file://`, así que sin red el `onerror`
cae al envase en vez de dejar un hueco.

Las de Wikimedia se guardan apuntando a `upload.wikimedia.org` y **sin query**. La
API las devuelve con host `thumb.wikimedia.org` y parámetros *utm* pegados detrás;
ese host no es fiable y dejó 31 fotos rotas en el dashboard. No se vio al montar las
hojas de contacto — ahí a veces redirige — sino midiendo con una espera corta.

**El renglón en celular**: el nombre se envuelve, la barra de botones se alinea con el NOMBRE
(32px) y hay 9px de aire, para que «Qué es» no parezca parte del cuadro de marcar. Los cuatro botones se reparten en dos
filas **a propósito**: con los nombres de tienda completos no caben en una sola ni en un
iPhone SE — medido, sobran 86px — y dejándolos partirse solos «Ya lo tengo» caía a una
segunda línea sin relación con nada. Arriba lo que haces con el producto, abajo dónde
comprarlo. El renglón pasa de 47px a 150px: caben 5 productos en pantalla en vez de 14
ilegibles.

Hay **19 siluetas** (`bomba`, `gotero`, `tubo`, `tarro`, `bote`, `botella`, `tela`,
`pastillas`, `caja`, `polvo`, `sobre`, `bolsa`, `barra`, `cepillo`, `utensilio`,
`aparato`, `pano`, `gafas`, `gotas`) y viven en `PF_FORMAS`, dentro de
`dashboard.html`. Cada producto elige la suya con `frasco` (no `envase`, que en
`SUPLEMENTOS` ya significa *cuántas cápsulas trae el bote*).

**Los días y el costo NO se escriben**: salen de `contenido / dosisDia`. Por eso el protector se
lleva casi la mitad del gasto — dos dedos diarios, que es la dosis correcta, vacían un bote de
50 ml en 40 días. Los `precio` sí son constantes de referencia (farmacia y Amazon MX, sep 2026)
y se editan aquí.

`LISTA_COMPRAS.skincare` es un **getter sobre esta lista**, no una lista aparte: un producto por
necesidad y sin alternativas, la misma regla que ya tenía `cabello`.

Existe porque los productos escritos a mano en dos sitios dejaron de coincidir (una marca en
`RUTINA_TASKS` y otra en la guía) y ningún control miraba texto de productos. Ahora lo vigila el
**control 11**.

### La rutina del cabello

`RUTINA_PELO` — los **10 productos** del pelo y, sobre todo, **la semana de lavado**: qué champú
toca cada día vive aquí y en ningún otro sitio. Se pide desde JS:

```js
CIFRAS.RUTINA_PELO.dia(2)             // martes -> {champu, condicional, nota, mascarilla, ...}
CIFRAS.RUTINA_PELO.duracionDias(p)    // contenido / (usos por semana / 7)
CIFRAS.RUTINA_PELO.costoMesTotal      // $2,811 hoy — el NR-11 y el Avodart son $2,460
```

| Producto | Cuándo | Tamaño | Dura | Al mes |
|---|---|---|---|---|
| Minoxidil 5% NR-11 (Polaris Research) | todos los días, **2 veces** (5 atomizaciones = 1 ml) | 60 ml | ~30 d | **$900** |
| Avodart (dutasterida 0,5 mg) | todos los días, una cápsula | 30 cápsulas | ~30 d | **$1,560** |
| Pilexil Anticaída 300 ml | lunes y jueves | 300 ml | ~88 d | $153 |
| CeraVe Champú Hidratante sin sulfatos | sábado | 355 ml | ~166 d | $54 |
| Darrow Doctar (alquitrán) | solo si hay caspa activa | 200 ml | — | — |
| L'Oréal Elvive Reparación Total 5 | todos menos sábado | 680 ml | ~53 d | $68 |
| Mascarilla L'Oréal Elvive Total Repair 5 | sábado | 300 ml | ~105 d | $37 |
| Moroccanoil Treatment Light | cuando lo note áspero | 100 ml | ~700 d | $39 |
| Funda de almohada de satín | una sola vez | — | — | — |

`dias` es **0=domingo…6=sábado**, y `diasCondicionales` marca los que dependen de algo y van en
otra tarea, no en la ducha de la mañana; hoy ningún champú lo usa. El control 12 lo tiene en
cuenta al comparar días.

`LISTA_COMPRAS.cabello` es un **getter sobre esta lista**, con los días incluidos, más los 2
tratamientos de receta al final — que no son de mostrador y no forman parte de la rutina.

### Los suplementos y el chequeo médico

`SUPLEMENTOS` — los **6** que toma de verdad, con dosis, momento y tamaño de envase. Estaban
escritos a mano en TRES sitios (las subtareas de `RUTINA_TASKS`, `LISTA_COMPRAS.suplementos` y
el catálogo de `salud.html`) y coincidían de casualidad.

| Suplemento | Momento | Dosis | Envase | Dura | Al mes |
|---|---|---|---|---|---|
| Vitamina D3 | AM | 2000-4000 UI | 120 cáps | ~120 d | $55 |
| Multivitamínico | AM | 1 tableta | 90 tabs | ~90 d | $117 |
| Omega 3 | AM | 1-2 g EPA+DHA | 120 cáps | ~60 d | $225 |
| Creatina monohidratada | AM | 5 g | 300 g | ~60 d | $200 |
| Magnesio (glicinato) | PM | 200-400 mg | 120 cáps | ~60 d | $200 |
| Proteína Whey | PM | 25-30 g, 4 días/sem | 2000 g | ~117 d | $333 |

**$1,130 al mes** — más que el gimnasio y el plan de datos juntos. `LISTA_COMPRAS.suplementos`
es un getter sobre esta lista.

`CHEQUEO` — los **9 análisis** que le tocan y por qué. Varios entran por algo que ya está en el
proyecto: la vitamina D porque toma D3 a diario, la creatinina porque toma creatina (**la sube en
sangre sin daño renal**), el tiroideo porque la caída de cabello lo pide descartar, y el PSA
porque **toma dutasterida (Avodart) desde el 1-sep-2026 y eso parte su valor a la mitad** — dejó
de ser opcional y de tener `desdeEdad`. `desdeEdad` desactiva un examen hasta esa edad;
`mesesVigencia` es cada cuánto se repite.

### El calendario · constantes

`CALENDARIO` — lo que el calendario del Dashboard necesita y **no puede derivar solo**. Se pide
desde JS, no es un marcador:

```js
CIFRAS.CALENDARIO.cobros   // [{dia, txt, grupo, monto, entra?, ahorro?, desde?, hasta?, cada?}] — los días fijos del mes
CIFRAS.CALENDARIO.hitos    // [{fecha, txt, sub}] — fechas duras que no salen de ningún otro dato
```

| | Qué trae | De dónde sale el número |
|---|---|---|
| `cobros` | Renta día 1, plan AT&T día 1, quincena días 1 y 15, gym día 17. Renta, luz y agua, internet y gas llevan `hasta` (`rentaHasta`): son del depa y terminan con él. Y el plan: el ahorro a GBM el 1 y el 15 (con depa, el del 1 desde noviembre), con `ahorro: true`, y el aporte a su familia el día 1 desde `enCasaDesde`. `grupo` dice a qué renglón del desglose del sueldo va cada uno | El **monto** es un getter sobre `PROYECTO`: si sube la renta o vuelve a cambiar el gimnasio, el calendario se entera solo. El **día** vive aquí como dato, no como comentario al lado de la cifra: las apps lo leen. |
| `hitos` | Decisión Maestría (31 may 2027) y Salida a Alemania (1 sep 2027) | `PROYECTO.maestriaDecision` y `PROYECTO.maestriaInicio`. |

**Regla al agregar: si una fecha se puede derivar de un dato que ya existe, NO va aquí.** Por eso
esta lista es corta. El Dashboard calcula en vivo, y no están escritos en ningún lado:

- los **cierres y arranques de fase** → de `PHASES[].start` / `.end`;
- la **última cuota de cada MSI vivo** → de `balance / min` sobre las deudas de Finanzas, con el
  día del cargo en `day` (los MSI con `day: 0`, como el iPhone, no se inventan: no salen);
- el **trabajo sin cerrar detrás de cada hito** → de `PHASES[].semanas` contra `coach_checks_v1`;
- el **ritmo requerido** ($/día para cerrar el fondo antes de que acabe la fase) → del fondo de
  emergencia real de `finanzasmx_v2` contra `fondoMeta`.

Es lo que evita que el calendario se congele como se congeló la vieja barra de metas.

---

## Quién carga qué

| App | Cómo lo carga | Para qué |
|---|---|---|
| `Dashboard/dashboard.html` | `<script src="datos-maestros.js">` | Prosa del Plan Maestro (`cifrarLiterales`) |
| `Coach/Coach.html` | `<script src="../Dashboard/datos-maestros.js">` | Hallazgos, tabla de deudas, checklists (`aplicarDOM`) |
| `Finanzas/Finanzas.html` | `<script src="../Dashboard/datos-maestros.js">` | **Es la fuente**: `seedData()` lee `CIFRAS.DEUDAS_SEED` |
| `CuidadoPersonal/cuidadopersonal.html` | `<script src="../Dashboard/datos-maestros.js">` | Skincare y Cabello: `CIFRAS.RUTINA_PIEL`, `CIFRAS.RUTINA_PELO` y las horas desde `CIFRAS.rutina()` |
| `CuidadoPersonal/salud.html` | `<script src="../Dashboard/datos-maestros.js">` | `CIFRAS.SUPLEMENTOS` (siembra la lista y el botiquín) y `CIFRAS.CHEQUEO` |
| `Aleman/index.html` | `<script src="../Dashboard/datos-maestros.js">` | `{{escuelaAleman}}` en el encabezado del Kapitel 10 (`aplicarDOM`) |

El Dashboard es donde vive el archivo porque es el centro del proyecto. El alemán vive en su app: el vocabulario en `Aleman/vocab-datos.js`, junto
con su diseño (`vocab.css`) y su motor (`vocab.js`), y las 41 lecciones en `Aleman/lecciones-datos.js`
—su catálogo, con la regla de qué lección toca (`queToca`)—. Los pintan `vocabulario.html` y el inicio de
Alemán, y el Dashboard —que no tiene pantalla de alemán— solo lee los dos para la ventana del alemán de
Mi Día; la lección se ve en su propia página. En `vocab-datos.js` viven también las **siete familias** en
las que se agrupan las 37 secciones, que es lo que pinta el índice lateral del vocabulario.

La biblioteca de ejercicios (`EJ_DB`: los 62 ejercicios con su imagen, sus pasos y su error típico) vive en
`CuidadoPersonal/ejercicios-datos.js`, junto a Ejercicio, que es su pantalla principal; el Dashboard la carga para
abrir la misma ficha desde Mi Día. Del Dashboard es solo el peso inicial sugerido (`EJ_PESO_INI`).

---

## Migraciones: cómo se corrige un saldo

Cuando Adán reporta un saldo nuevo, se añade una entrada a `MIGRACIONES` en `datos-maestros.js`.
Corre **una sola vez** (bandera propia en localStorage) y nunca revierte un cambio hecho a mano.

Se escribe una vez y la ven las tres apps, sea cual sea la primera que se abra.

Las migraciones anteriores al 2026-08-24 (`_banamex9k`, `_pagos20260813`, `_msibbva20260813`,
`_ahorro20260817`) siguen en sus archivos: ya corrieron y tienen bandera, son inertes.

Las vivas están en `MIGRACIONES`, en orden, cada una con la fecha en su nombre. Una migración
que añade un registro lo hace **por id y solo si falta**: así el navegador que arranca en blanco
(que ya lo trae del seed) no lo duplica.

---

## Mapa de apps

| Carpeta | Archivo | Qué es | Su `localStorage` |
|---|---|---|---|
| `Dashboard/` | `dashboard.html` | Panel central, "Mi Día" en vivo, agrega todo | *(solo lee, salvo checks de Coach)* |
| `Coach/` | `Coach.html` | Plan Maestro, rutina, radar de habilidades | `coach_rutina_v1`, `coach_checks_v1`, `radarp_*` |
| `Finanzas/` | `Finanzas.html` | Finanzas reales, GBM, BTC, deudas | `finanzasmx_v2` |
| `CuidadoPersonal/` | `cuidadopersonal.html` + `salud`/`ejercicio`/`comida` | Shell de 8 áreas (Skincare, Cabello, Dentista, Ojos nativas; Salud, Ejercicio, Comida, Vestimenta en iframe) | `skincare_v1`, `cabello_v1`, `dentista_v1`, `misalud_v1`, `mirutina_v1`, `comida_v1` |
| `Vestimenta/` | `vestimenta.html` | Guardarropa y compras | `vestimenta_v1` |
| `Aleman/` | `index.html` (el inicio) + 41 lecciones + `vocabulario.html` | Estudio A1/A2/Kapitel 10. Aloja el vocabulario entero (`vocab-datos.js` + `vocab.css` + `vocab.js`) y el catálogo de las lecciones (`lecciones-datos.js`); Mi Día solo lee los datos y abre la lección en su ventana | `aleman_k10_v1`, `voc_estado_v1`, `aleman_leccion_v1`, `aleman_repaso_v1` (el repaso del vocabulario, que escribe la ventana del alemán) |
| `Entrevistas/` | `entrevistas.html` + `js/data-*.js` | Prep. técnica automotriz, 229 temas; los 41 de Python abren con su explicación en llano (`js/data-python-intro.js`) | `theme`, `sidebar-collapsed`, `study-done-v2` |
| `Aeroresinas/`, `Heliescala/` | `aeroresinas.html`, `heliescala.html` + `dossier.html` | Las dos webs públicas del negocio del papá de Adán | solo tema e idioma |
| `Posts/` | `posts.html` + `plantillas.js` | Plantillas de LinkedIn para las dos empresas, armadas con los `datos.js` de sus webs (no con el maestro) | `posts-*`, `coach-theme` |

Detalle por app en su propio `readme_<app>.md`; el mapa completo de claves y conexiones está en
[`../README.md`](../README.md).

### El prompt de cada página

Cada HTML lleva al final del `<body>` la etiqueta de `prompt-pagina.js` con su clave, y el icono
de la brújula arriba a la izquierda abre su prompt (con **Copiar**, para pegarlo en Claude). Los
prompts viven en `prompts-paginas.js`: el especialista, su propósito y cómo se modifica su
página, más las reglas `COMUN` a todos. Gobiernan cada cambio (`../../CLAUDE.md` → Regla 6).

**Cada prompt tiene siete secciones**: Quién eres, Tu misión, Cómo piensas, Cómo aconsejas,
**Con quién trabajas** (la sinergia: nombra por su título a los especialistas con los que se
pasa datos y decisiones, y en la ventana cada nombre abre el prompt de ese especialista, con
**Volver**), **Cómo sabes que funciona** (los indicadores, con datos que ya existen, que dicen
si la página ayuda) y Al modificar. `COMUN` empieza con **El plan que todos sirven**: seis
prioridades en orden —salud y seguridad, metas de conducta, el orden del dinero, carrera con
fecha, el cuerpo, el negocio de su papá— que deciden cuando dos especialistas chocan; la
ventana lo enseña arriba de todo, en cada prompt.

**Las vistas tienen el suyo.** Una página con pantallas, pestañas o modos de especialidades
distintas declara `vistas` en su prompt (`{si, clave}`: un selector que solo existe con la vista
abierta) y el icono enseña el de la vista donde está Adán; la ventana tiene un botón **General**
para pasar al de la página, que rige lo que las vistas comparten. Secciones de una misma
especialidad (las de Finanzas, los módulos de Entrevistas) comparten el de su página.

| Clave | Páginas |
|---|---|
| `dashboard` | `dashboard.html` — general (rail, barra de apps, rotación). Vistas: `midia` · `planmaestro` · `metas` · `basicas` · `skills` · `lista` · `habitos` (las 7 pantallas) y los paneles `invertir` (Qué invertir hoy) y `didi` (Qué escuchar) |
| `coach` | `Coach.html` — el modo Personal. Vista: `coachempresa` (el modo Empresa) |
| `finanzas` | `Finanzas.html` |
| `cuidadopersonal` | `cuidadopersonal.html` — general (barra, carril, cabecera). Vistas: `skincare` · `cabello` · `dentista` · `ojos` y las cuatro incrustadas con el de su app |
| `salud` · `ejercicio` · `comida` | sus tres apps |
| `vestimenta` | `vestimenta.html` |
| `aleman` | las 45 páginas de `Aleman/` |
| `entrevistas` | `entrevistas.html` |
| `aeroresinas` · `heliescala` | la web y el dossier de cada una, con `data-publica`: el icono solo sale en `file://` o `localhost`, nunca a un cliente |
| `posts` | `posts.html` |

**Dónde va el icono**: fijo en la esquina si está libre (Dashboard, los dossiers); si la esquina
tiene logo o botón ☰, la etiqueta lleva `data-host` y el icono entra como primer elemento de esa
cabecera y la empuja en vez de taparla. En el shell de Cuidado Personal las apps incrustadas no lo
pintan (`?embed=1`): lo pinta el shell. No sale impreso ni en los PDF. Las maquetas `diseno-*/`
no lo llevan.

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
| `celular`, `internet`, `gas`, `gasCadaMeses`, `luzAgua` | `servicios` → `fijosTotal` → `margen` |
| `gym`, `claudeCode`, `icloud` | `suscripciones` → `fijosTotal` → `margen` |
| `renta` | `fijosTotal` → `margen` |
| el saldo o el mínimo de cualquier deuda | `deudaTotal`, `deudaCara`, `deudaMsi`, `minimosDeuda` → `margen` |
| `autoSaldo`, `autoPago`, `autoMeses` | `autoAPagar`, `autoInteres` |

Cada derivada declara su `dep: [...]` en `CLAVES`. **El grafo no se cree: se mide.** El control 6
perturba cada constante, observa qué se movió de verdad y lo compara con lo declarado — así una
dependencia que alguien olvide declarar al añadir una fórmula salta en el momento.

### Y una AFIRMACIÓN tampoco cambia sola

Las cifras se ajustan solas porque son getters. **Las frases no**, y una frase envejecida miente
igual que un número viejo: una tarjeta liquidada que vuelve a tener saldo mueve `deudaCara` y
`margen` solos, pero *"ya está en $0"* y *"✅ liquidada"* se quedan escritos en tres apps, y una
lógica que dé el hito por cumplido leyendo la libreta de logros lo enseñaría para siempre.

**La regla, y quién la vigila:**

| | |
|---|---|
| **Ninguna app puede afirmar en presente que una deuda está saldada mientras el maestro le vea saldo vivo.** | **control 22** del verificador |
| Contarlo en pasado sí vale — los logros de Adán no se borran. Se hace **fechando la frase** ("liquidada el 13 ago 2026"), nunca con una excepción en el código. | el control deja pasar toda frase con fecha, "era", "hasta", "volvió" o un condicional |
| Un logro registrado **no puede tapar el presente**: si el saldo vuelve, el paso se reabre y lo dice con su fecha al lado. | a mano — ver `renderCoach()` en `dashboard.html` |
| Al añadir una deuda al maestro, añade cómo la nombra la prosa en **`ALIAS_DEUDA`** (`verificar-sincronia.js`). Sin alias, nadie vigila lo que se diga de ella. | — |

Y cuando un saldo se mueve, el aviso de **«cambió una variable maestra»** **lista los archivos**
que nombran esa deuda y cuántas veces sale en cada uno: se revisan todos, no solo el primero.

```
Dónde se habla de esa deuda — revísalos TODOS, no solo el primero:
  "Banamex" → dashboard.html (60), Coach.html (40), Finanzas.html (32), …
```

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
- Que Coach **genere** las fases del maestro (solo la Fase 0, cerrada, sigue escrita a mano: el control 3 falla si otra fase, sus tareas o sus fechas vuelven a escribirse en Coach) y que las prioridades de `APRENDIZAJE` aparezcan en su HTML.
- **La salida a Alemania y la proyección**: ids de `SALIDA` únicos y distintos de las tareas de fase, cada pendiente con su mes y cada costo con importe, Coach pintándolas desde el maestro, y la proyección llegando al millón antes del cierre de la última fase. Pasado `rentaHasta`, avisa si la renta sigue contando en los fijos. Cada cobro lleva un `grupo` del desglose; el calendario y la proyección apartan lo mismo cada mes y ningún mes deja el gasto personal en negativo; la meta `g001` que siembra Finanzas es lo que cuesta irse, redondeado; la comida del plan (`SUPUESTOS.comida`, `comidaEnCasa`) es la que dan la lista de compras y las recetas de desayuno del Dashboard. Avisa si un fijo cambia y el ahorro de cada quincena deja de cuadrar con el tope de gasto personal.
- Las cifras que ya tienen variable pero siguen escritas a mano.
- **Los números del maestro escritos crudos en el código** (sin `$`): así es como una app acaba
  con dos precios del mismo gimnasio a la vez. Acepta dos patrones
  legítimos: `dato || 500000` (fallback, solo se usa si no hay dato) y las asignaciones dentro de
  una migración (`balance = 1708` es una foto histórica, no una copia).
- **Que el mapa de dependencias declarado coincida con el real**, midiéndolo por perturbación.
- **Que los valores citados en los `.md`** coincidan con el maestro, con archivo y línea. Este es
  el que faltaba: los getters se recalculan solos, las tablas de la documentación no.
- Los `{{marcadores}}` que no existan en el catálogo.
- **La FORMA de los datos, no solo sus importes** (control 9): se exige día de pago a toda deuda con saldo y mínimo, tipos correctos en cada campo, fechas
  reales, `balance <= total`, ids únicos, cobros dentro de 1-28, fases sin huecos ni solapes, ids de
  tarea únicos entre fases, una fase que arranque el `maestriaInicio` con la decisión dentro de la anterior, y
  que las sumas de `PROYECTO` cuadren con sus partes.
- **La tabla de días de pago del `.md` contra el maestro** (control 10), fila a fila. El control 7
  compara importes y por eso no veía un día: 14 no es una cantidad de dinero.

- **Que los productos de `RUTINA_PIEL` sigan nombrados en `RUTINA_TASKS`** (control 11). Los diez
  anteriores miran números y estructura; ninguno miraba **texto de productos**, y por ahí se coló
  que la guía de Skincare recomendara una marca de protector solar y la rutina diaria otra. Si
  alguien cambia de producto en un sitio y no en el otro, sale aquí.

- **Lo mismo para `RUTINA_PELO`, y además el DÍA** (control 12). La semana de lavado vive en
  `RUTINA_PELO.productos[].dias` y las tareas que la ejecutan están repartidas por día, así que
  pueden separarse sin que cambie ninguna cifra. Compara sin distinguir mayúsculas — "mascarilla X" y "Mascarilla X" son el mismo producto — y busca por el nombre completo,
  porque "CeraVe" a secas también casa con el limpiador facial de Skincare.

- **Que toda página cargue su prompt** (control 24): la etiqueta de `prompt-pagina.js` con una
  clave que exista en `prompts-paginas.js`, la ruta correcta y `data-publica` en las webs del
  negocio; que cada prompt tenga sus campos, su `## Al modificar…`, su `## Cómo sabes que
  funciona` y un `## Con quién trabajas` que nombre al menos a dos especialistas por su título,
  y ningún marcador suelto; que `COMUN` abra con el plan; y que cada vista pida un prompt que
  exista y apunte a ids, clases y `data-tab` que su página tiene.

- **Lo mismo para `SUPLEMENTOS`, y además el MOMENTO** (control 13). Los de la mañana tienen que
  aparecer en una subtarea de la rutina de la mañana y los de la noche en una de la noche: mover
  el magnesio a la mañana en un sitio y no en el otro no mueve ninguna cifra.

- **«Hoy» en fecha local** (control 26): ninguna app saca la fecha del día de `toISOString()`, que
  es UTC y en México ya es mañana desde las 18:00; se usa `CIFRAS.fechaLocal()`. Un cálculo que
  entra y sale en UTC a propósito lo dice en la misma línea («UTC a propósito»).

- **Las lecciones de Alemán con su plantilla** (control 27): la barra del inicio, su foto con
  crédito, las dos columnas y, con práctica, `leccion.js` después de `k10-interactivo.js`.

- **Ningún plan con fecha vencida** (control 28): una fecha con su día de la semana («el martes 14
  de julio», el día fija el año) que ya pasó, o una cuenta regresiva escrita a mano («tienes 7
  días»), en el texto de cualquier app. Así abrió Entrevistas meses después de la entrevista de
  Wayve. Lo que va entre comillas es un ejemplo y no cuenta, ni los comentarios; un archivo que
  guarda un plan viejo a propósito lo declara con «ARCHIVO —» en su cabecera.

- **Los precios del súper y el recetario, solo aquí** (control 29): ningún otro archivo le pone
  precio a un producto de `PRECIOS_SUPER`, copia el nombre de una receta del `RECETARIO` ni arma
  su propia lista con `ingredientes: [`. El Dashboard tuvo las dos copias, y el costo del desayuno
  de la proyección salía de recetas que ya no eran las de Comida.

- **El dinero de la maestría es una sola cuenta** (control 30): `{{maestria}}` sale de
  `CIFRAS.fondoMaestria()` y ninguna app lee el `current` de la meta `g001` ni vuelve a sumar fondo,
  inversiones y Bitcoin por su cuenta. Mis Metas decía $17,250 mientras `{{maestria}}` y Coach
  decían $53,740, un número puesto a mano; Finanzas tenía cinco copias de la suma.

- **El sueño cuadra** (control 31): la rutina de lunes a viernes da al menos 7 h, la semilla de los
  hábitos de la noche dice las mismas horas que la rutina y nadie escribe a mano cuánto duerme Adán
  —ni un rango de horas de sueño ni un «duermes» con cifras—: se cita `{{horasSueno}}`, `{{horaDormir}}`…

- **Las frases de Mi Día no hablan de deudas que ya no existen** (control 32): ninguna nombra una
  deuda en $0, la que nombra una viva lleva `si` para salir del sorteo cuando se salde, y ninguna
  escribe un monto.

- **Los días de una fase son una sola cuenta** (control 33): `CIFRAS.diasFase()` da el mismo día a
  cualquier hora (la Fase 1 el 13-oct: 13 de 182, quedan 169) y nadie vuelve a restar `f.end - hoy`
  en milisegundos fuera del maestro. El tablero del Plan Maestro decía 168 y el calendario 169.

Los valores **no están escritos en el verificador**: los pide al maestro. Tenerlos a mano era el
mismo fallo que persigue — con `$292,000` en su lista seguía vigilando el saldo viejo.

Lleva una lista de **excepciones documentadas**: números que coinciden con una variable pero
significan otra cosa (el precio de un servicio, el ahorro en un boleto de avión, la meta de la
maestría *antes* de reagendarse). Cada una con su razón. Un aviso que nunca se puede cerrar acaba
ignorándose, y entonces el verificador deja de servir.

**Un hook `Stop` lo corre solo** al final de cada turno, con `--hook`: solo habla cuando encuentra
un problema. Un verificador que saluda cuando todo está bien se vuelve ruido y se acaba ignorando.

---

## Las estructuras que viven aquí

Ninguna estructura está copiada entre archivos; todas se leen de aquí:

| Estructura | Qué es | Cómo se lee |
|---|---|---|
| `DEUDAS_SEED` | Punto de partida de las deudas | `CIFRAS.DEUDAS_SEED` |
| `GASTOS_20260901` | Las seis compras del 1-sep-2026 — las siembra Finanzas.html y las aplica la migración `_gastos20260901` | `CIFRAS.GASTOS_20260901` |
| `MOVIMIENTOS_20260920` | Los tres movimientos del 19-sep-2026 — la venta de todo el Bitcoin ($39,500), el pago a la TC BBVA ($38,100) y el abono a Banamex ($3,000). Los pagos se llaman como la deuda para que `yaContado` los empareje con el mínimo previsto del mes. Los siembra Finanzas.html y los aplica `_liquidacion20260920` | `CIFRAS.MOVIMIENTOS_20260920` |
| `RUTINA_TASKS` | 56 bloques del horario | `CIFRAS.rutina(base)` |
| `SK` | 12 habilidades del radar: nivel con su evidencia (`desc`), peso por impacto en carrera y patrimonio con el plan de hoy (`w`), `porQue`, `prueba`, `mant` (el paso de la semana fuera del foco, con horas), `practica` y `pausa` | `CIFRAS.SK` |
| `HAB_FOCO` | El foco de las habilidades, una a la vez y con fechas, alineado al Plan Maestro: cada tramo con horas, el paso de la semana, el entregable y cuándo cambia | `CIFRAS.HAB_FOCO` |
| `PESO` | Altura (178 cm), meta (80 kg), objetivo y el histórico de pesajes (2: 75 kg el 2-sep-2026, 78 el 13-sep) con IMC derivado. Salud lo siembra en Peso & Medidas en cada carga | `CIFRAS.PESO` |
| `BTC_SEED` | Las operaciones de Bitcoin: 3 compras ($2,878 USD = $52,129 MXN al cambio de cada día, 0.032509 ₿) y 2 ventas: 14-sep-2026 ($5,300 MXN = $310.45 USD = 0.003930 ₿ a $79,000 USD/₿, precio dicho por Adán) y 19-sep-2026 (todo lo que quedaba, 0.028579 ₿, por $39,500 MXN = $2,299.51 USD a $80,461 USD/₿ implícito — para pagar la TC BBVA). **Ya no queda Bitcoin.** Cada operación lleva `fx` (BCE del día). Finanzas lo siembra en `btcHistory`; una venta lleva `tipo:'venta'` y `btc` negativo | `CIFRAS.BTC_SEED` |
| `PHASES` | Las 5 fases del Plan Maestro (la 0 cerrada): fechas, meta, el porqué en bloques (`razones`: `lema`, `ruta` con sus `hitos`, `paso`, `riesgo`, `palanca`, `planb`, `regla` y `logro`, cada uno con título, `cifras`, frase y `foto`; unidos dan el párrafo `explica` que lee Coach), `deja` (lo que se deja de hacer), `checkpoint`, el checklist por mes (`semanas`, con `cont` lo de toda la fase) y lo que se repite cada mes (`mensual`, con su `cuando`); `liquido` lo pone la `PROYECCION`. La última fija la fecha del millón (`{{metaMillon}}`) | `CIFRAS.PHASES` |
| `SALIDA` | La salida a Alemania: lo que cuesta (`costos`) y todo lo que hay que reunir, por tema (`bloques`) | `CIFRAS.SALIDA`, `CIFRAS.costoSalida(c)` |
| `PROYECCION` | El plan mes a mes hasta el millón, con sus `supuestos` y los `cortes` de la salida | `CIFRAS.PROYECCION`, `CIFRAS.proyectar(cambios)`, `CIFRAS.cortesSalida()`, `CIFRAS.desgloseMes()`, `CIFRAS.mesTipo()` |
| `APRENDIZAJE` | 6 prioridades de aprendizaje | `CIFRAS.APRENDIZAJE` |
| `fondoMaestria(f)` | El dinero de la maestría: el fondo de emergencia (CETES), las inversiones de Finanzas (hoy el depósito de la renta) y el Bitcoin a precio de hoy. Lo usan `{{maestria}}`, Mis Metas, los indicadores de Finanzas, Coach y el contexto de *Qué invertir hoy* | `CIFRAS.fondoMaestria(f)` |
| `diasFase(f, hoy)` · `diasHasta(fecha, hoy)` | Los días de una fase en días de calendario —`largo`, `corrido` (hoy ya corre), `quedan`, `pct`, `semanas`, `semanasQuedan`— y los días entre hoy y una fecha, de medianoche a medianoche. Los usan el tablero, el calendario, la ventana de las fases, Mis Metas y Coach | `CIFRAS.diasFase()`, `CIFRAS.diasHasta()` |
| `planMes(ym)` | El plan completo de un mes, sin escribir nada dos veces: sus tareas de fase, lo de la salida a Alemania de ese mes y lo que se paga, lo de toda la fase (`cont`) y lo de cada mes (`mensual`), el foco de `HAB_FOCO`, el dinero de la proyección, los abonos de la BBVA y las fechas que caen en él (arranque y cierre de la fase, checkpoint, hitos fechados de las rutas, cambio de foco). Trae también las cifras con que se audita (`metas`: el dinero al cerrar —todos los activos líquidos, GBM más el depósito del depa en la proyección—, la BBVA mientras su plan corre y el patrimonio líquido), y `cifrasHoy(f, gastar)` mide lo real con la misma definición —con `gastar`, lo que hay para gastar según la cuenta de la quincena del Plan Maestro, que el Dashboard le pasa desde `ctCifrasHoy()` (control 42)—. Lo pinta la ventana de las fases, una ficha por mes, y ahí se audita (`plan_auditoria_v1`); el control 38 vigila que ningún mes quede vacío ni sin cifras | `CIFRAS.planMes(ym)`, `CIFRAS.cifrasHoy(f, gastar)` |
| `avanceBbva(f)` | Lo pagado de la BBVA desde el saldo con que arrancó su plan quincena a quincena (`PROYECTO.bbvaInicio` el día `PROYECTO.bbvaFecha`, que no se mueven con cada saldo nuevo): el medidor de Deuda cara del Plan Maestro | `CIFRAS.avanceBbva(f)` |
| `tarjetaDe(t, debts)` · `movimientoTarjeta(t, debts, ahora)` | La regla de la tarjeta: qué tarjeta de crédito nombra un movimiento y lo que le hace a su saldo. Finanzas mueve el saldo con ella; el Dashboard sabe qué no sale de la caja | `CIFRAS.tarjetaDe()`, `CIFRAS.movimientoTarjeta()` |
| `bbvaEstado()` | La BBVA de hoy para la estrategia del Plan Maestro: saldo vivo, fecha de cero, lo que toca hoy, lo mandado hoy, lo restado solo estos días, lo que hoy no se mandó, el abono siguiente y si está cancelada | `CIFRAS.bbvaEstado()` |
| `aplicarPlanBbva()` · `ABONO_DE` | Resta solos los abonos del plan cuyo día ya llegó (corre al cargar; el Dashboard la llama al cambiar el día) y dice en palabras de dónde sale cada abono | `CIFRAS.aplicarPlanBbva()`, `CIFRAS.ABONO_DE` |
| `deudasConInteres(f)` | Las deudas a las que de verdad les corre interés: la BBVA no mientras `PROYECTO.bbvaSinIntereses`. *Con interés* en Mis Metas, la regla de *Qué invertir hoy* y su panel | `CIFRAS.deudasConInteres(f)` |
| `liquidaciones` (en una deuda de `DEUDAS_SEED`) | Cada fecha en que esa deuda quedó en $0: la Banamex, `['2026-08-13','2026-09-30']`. El detalle de Deuda cara las cita todas | `CIFRAS.DEUDAS_SEED` |
| `LISTA_COMPRAS` | Catálogo de compras por pasillos — 7 categorías; `comida` en 7 pasillos, con `Verduras` / `Frutas` / `Almidones y grasas` separados para colorear los frescos por clase y sumar la fruta+verdura por día | `CIFRAS.LISTA_COMPRAS` |

`verificar-sincronia.js` vigila que **ninguna vuelva a incrustarse** en un HTML.

### Lo que no es literal contra literal

Tres casos que no son una copia movida y siguen necesitando cuidado:

- **`GYM_RUTINA_DEFAULT`** es solo el respaldo para un navegador que nunca abrió `ejercicio.html`;
  esa app guarda la rutina real en su propio `localStorage` y gana sobre este literal. El
  verificador compara los 7 días.
- **Las fases en Coach se generan de aquí** (`pintarFasesPlan()`), igual que en el Dashboard; solo
  la Fase 0, cerrada, sigue escrita a mano. Las tareas llevan ids como `a1-1` (`coach_checks_v1`). **El
  texto de `APRENDIZAJE`** sí sigue como HTML a mano en `#aprendizaje`: convertirlo exigiría
  rediseñar esa sección. El verificador comprueba que sus prioridades aparezcan ahí, y las cifras
  que contiene ya usan `{{marcadores}}`.
- **`LISTA_COMPRAS`**: sus siete categorías son **getters** — `comida` sobre `RECETARIO`,
  `skincare` y `cabello` sobre `RUTINA_PIEL`/`RUTINA_PELO`, `suplementos`, `higiene`, `ojos` y
  `libros` sobre sus catálogos. Se edita el catálogo, nunca la lista.

### Los precios del súper

`PRECIOS_SUPER` — el precio de cada producto de la lista de comida: `tipo` (peso, pieza o paquete),
`precio`, `paso` y `monto` (lo que suma un `+`), `base` (cuántos pasos son tu semana), `real` (de tu
ticket o investigado) y `gPaq` (los gramos que cuesta `precio` en los productos por paquete). Vivía
en el Dashboard; está aquí porque de él sale también el costo de cada receta.

```js
CIFRAS.costoReceta(r)                // MXN por porción: Σ gramos × tarifa por gramo
CIFRAS.RECETARIO.costoDesayuno       // promedio de las recetas de desayuno
CIFRAS.RECETARIO.costoCena           // promedio de las recetas de cena
```

**Lo que cuesta comer al mes** (`SUPUESTOS.comida`) es la despensa semanal —`monto × base` de cada
producto de la lista— por 30.4 entre 7, y **el desayuno en casa** (`SUPUESTOS.comidaEnCasa`), el
promedio de las recetas de desayuno por 30.4. Los dos son constantes que el verificador recalcula:
si la lista o una receta cambian y no coinciden, avisa. Tortilla de harina, nuez, bolsa de verduras
y láminas de salmón llevan **precio estimado** (`real:false`), no de ticket: se corrigen cuando
Adán los compre.

### El recetario

`RECETARIO` — las **36 recetas** (18 desayunos, 18 cenas) con sus ingredientes,
pasos, macros, el tip y la foto de cada una. Cada ingrediente declara `{n, c, p}`: nombre,
cantidad y **pasillo del súper**. `foto` es la ruta relativa a `CuidadoPersonal/` (los archivos
viven en `CuidadoPersonal/fotos-comida/`) y `fotoCredito`, su autor, fuente y licencia.

**Son sencillas**: 4 ingredientes o menos, 3 pasos y 15 minutos; 30 g de proteína o más en el
desayuno y 40 g o más en la cena; y las kcal cuadran con sus macros. Las 36 usan los mismos 25
productos de la lista, así que cambiar una receta sin cambiar productos no mueve el presupuesto de
comida.

```js
CIFRAS.RECETARIO.desayuno            // 12
CIFRAS.RECETARIO.todas               // 24
CIFRAS.RECETARIO.porPasillo          // {Verduras:[…], Frutas:[…], …}
CIFRAS.LISTA_COMPRAS.comida          // === porPasillo
```

**`LISTA_COMPRAS.comida` se deriva de aquí**: agregar una receta agrega sus ingredientes a la
compra sin tocar nada más. Una lista escrita aparte coincidía de casualidad y se rompía al
primer cambio.

Lo que no entra en una receta: café, picante, cítricos en exceso, chocolate,
frituras y cebolla/ajo **crudos** (le disparan el reflujo; cocidos sí van), y los
que no le gustan — calabaza, ejotes, hierbas de olor, camote,
espinaca, pavo molido, leche de avena, crema de cacahuate, caldo de
pollo y avena en hojuelas. El **control 14** del verificador comprueba que cada
receta esté completa (ingredientes con pasillo y cantidad, pasos, macros, ids
únicos), que sea sencilla y llegue a su proteína, que su foto exista con su crédito,
y que la lista siga siendo la derivada y no una copia.

El **control 15** hace lo propio con las fichas de las **cinco categorías** (68
artículos): que ninguno se quede sin `ficha` o con un campo corto, que traiga con
qué dibujarse cuando no hay foto, que tenga de dónde sacar el «cómo se usa», que
no repita en la ficha lo que el producto ya trae escrito, y que
`deTextoCompra(textoCompra(p))` devuelva el mismo producto. Esa última es la que
importa: si dejan de ser inversas, el botón «Qué es» no encuentra nada y al
pulsarlo no pasa **nada** — sin error en consola, sin señal de ningún tipo.

El **control 18** vigila los 94 recursos de las rutas: que ningún libro apunte a un id que no existe, que todo lo que no sea `propio` tenga URL https, y que un libro no vuelva a traer su título escrito. Probado rompiéndolo de cuatro formas.

El **control 17** vigila lo que `pfEnlazar` no puede: que los nombres de la guía dental — la única lista escrita a mano que queda — sigan resolviendo a un producto del kit, y que las tres apps carguen `ficha.css`, `ficha.js` y el hueco `pfFondo`. Comprueba la **etiqueta** `<script src=...>`, no la palabra «ficha.js», que también aparece en un comentario y no carga nada.

El **control 23** vigila los `.md`: que **no vuelvan a ser diario** (encabezados fechados,
"hasta el 2026-…", "antes era…", "mismo día)") y que **todo el código que citan exista** — cada
identificador en `código` (ids, clases, funciones, claves) se busca en los `.html/.js/.css` del
proyecto y en los nombres de archivo; lo que no aparece de ninguna forma es un fantasma y sale
con archivo y línea. Las excepciones (`addInitScript` de Playwright, la bandera construida
`finanzasmx_v2_v`) llevan su razón, y una excepción que deje de hacer falta también se avisa.

El **control 16** hace lo mismo con los 60 libros, aparte porque sus campos son otros, y añade lo que un producto no tiene: año y páginas plausibles, y que la portada sea de Open Library o haya con qué dibujar el libro. Probado rompiendo el maestro de cuatro formas, incluida la que ocurrió de verdad.

El umbral de longitud va **por campo**: `que`, `hace`, `sirve` y `ojo` tienen que
explicar algo y se les exigen 20 caracteres; `activo` y `tarda` pueden ser correctos
y muy cortos («Inmediato.», «1-2 horas.») y se quedan en 6. La única excepción
declarada es el renglón del minoxidil ORAL en cabello: no es un producto de
mostrador, no tiene ficha y no debe tener botón.
