/* ══════════════════════════════════════════════════════════════════════════════════════════
   DATOS MAESTROS — todas las variables del proyecto, en un solo archivo
   ══════════════════════════════════════════════════════════════════════════════════════════
   Adán, 2026-08-24: "quiero que toda la info de todos mis proyectos esté en un archivo que
   esté en esta carpeta [Dashboard], así cuando cambie algo en alguno, los demás cambiarán
   automáticamente... esto para que gastar menos tokens y sea muy rápido los cambios".

   QUÉ ES
   El único sitio donde se escribe un dato sobre Adán o sobre su plan. Las apps no repiten
   números: los leen de aquí. Cambias un dato una vez y las cuatro pantallas lo dicen igual.

   Vive en `Dashboard/` porque el Dashboard es el centro del proyecto. Las demás apps lo cargan con
   una ruta relativa: `<script src="../Dashboard/datos-maestros.js"></script>`.

   EL MAPA ESTÁ EN `DATOS-MAESTROS.md`, en esta misma carpeta: qué variable existe, qué vale hoy
   y quién la usa. Ese `.md` es el índice para leer rápido sin abrir 900 KB de HTML.

   ── LAS DOS CLASES DE DATO ──────────────────────────────────────────────────────────────────
   1. CONSTANTES (`PROYECTO`, aquí abajo) — hechos que no cambian solos: el sueldo, la renta, el
      empleador, las fechas clave. Se editan AQUÍ, a mano, y ya.
   2. SALDOS VIVOS (`finanzasmx_v2` en localStorage) — lo que Adán mueve desde Finanzas.html.
      No se escriben aquí: se leen. `DEUDAS_SEED` es solo el punto de partida de un navegador
      en blanco, y `MIGRACIONES` las correcciones puntuales cuando reporta un saldo nuevo.

   ── CÓMO SE USA UN DATO EN LA PROSA ─────────────────────────────────────────────────────────
   En vez del número va un marcador, y este archivo lo sustituye al cargar la página:

       <p>un crédito de {{autoSaldo}}</p>          →   un crédito de $292,000
       <p>ganas {{sueldo}} en {{empleador}}</p>    →   ganas $41,000 en ALTEN

     CIFRAS.aplicarDOM()        resuelve los {{marcadores}} del HTML ya pintado
     CIFRAS.texto(str)          resuelve en un string suelto (para HTML que se arma en JS)
     CIFRAS.n('autoSaldo')      el número crudo, por si hay que calcular con él
     CIFRAS.v('autoSaldo')      el texto ya formateado ("$292,000")
     CIFRAS.refrescar()         relee localStorage (tras una migración o un cambio en vivo)
     CIFRAS.tabla()             en la consola: todas las variables de golpe

   El Dashboard además usa `cifrarLiterales(obj)`, porque su prosa no está en el HTML sino en
   constantes JS (`PHASES`, `META_DETALLE`) que inyecta con innerHTML: ahí hay que sustituir en
   el literal, o cada repintado volvería a traer el marcador.

   ── AÑADIR UNA VARIABLE ─────────────────────────────────────────────────────────────────────
   Una línea en `PROYECTO` (si es constante) o en `CLAVES` (si sale de los datos vivos), y otra
   en `DATOS-MAESTROS.md`. Queda disponible en las cuatro apps a la vez.

   Un marcador que no exista se deja A LA VISTA en pantalla en vez de borrarse: un {{tipoDeDedo}}
   se detecta al instante; una frase mutilada, no.
   ══════════════════════════════════════════════════════════════════════════════════════════ */
window.CIFRAS = (function () {
  'use strict';
  const KEY = 'finanzasmx_v2';
  const VACIO = '—';
  let fin = null;

  /* ── CONSTANTES DEL PROYECTO ───────────────────────────────────────────────────────────────
     Hechos sobre Adán y su plan que estaban escritos a mano en cada app. El número entre
     paréntesis es en cuántas apps aparecía repetido cuando se centralizó (medido el 2026-08-24).
     Estos SÍ se editan aquí: no salen de localStorage porque no cambian solos. */
  const PROYECTO = {
    // ── Quién es ── (ALTEN salía 78 veces repartidas en 5 apps)
    nombre:      'Adán',
    nacimiento:  '1995-07-01',   // el Dashboard (Tu año) y Salud (IMC por edad) sacan la edad de aquí
    empleador:   'ALTEN',
    puesto:      'Ingeniero de pruebas — automotriz (ADAS)',
    ciudad:      'CDMX',

    // ── Ingresos ── (el sueldo, 17 veces en 2 apps; Didi, 92 en 4)
    sueldo:        41000,     // bruto mensual en ALTEN, quincenal a BBVA
    sueldoQuinc:   20500,
    didiMes:       11200,     // ~$400/día × 28 días, semanal
    // Lo que Didi pone en GBM, no lo que factura (Adán, 3-oct-2026): "de octubre
    // a febrero puedo juntar de Didi 5000 al mes" y "desde febrero empezaré a trabajar más de Didi
    // y puedo sacar 10,000 cada mes y eso meterlo a ahorro". Lo demás de Didi paga la carga del
    // auto y lo suyo; el plan no lo cuenta. El último mes en México va la mitad: la segunda
    // quincena es de empacar y entregar el auto (`didiAlAhorro`).
    didiAhorro:     5000,     // al mes, de octubre de 2026 a enero de 2027
    didiAhorroMas: 10000,     // al mes, desde didiMasDesde
    didiMasDesde: '2027-02',
    siVale:          940,     // vale de despensa
    // Lo que de verdad entra al mes si Didi va como el promedio.
    get ingresoTotal() { return this.sueldo + this.didiMes + this.siVale; },

    // ── Gastos fijos ── (renta y gym salían en 3 apps)
    // Adán, 3-oct-2026: "en febrero de 2027 dejaré de rentar mi departamento y podré ahorrar todo
    // ese dinero, los 11,250". Hasta `rentaHasta` se paga; desde el mes siguiente el calendario ya
    // no la cobra (CALENDARIO.cobros → agendaDia) y la proyección la cuenta como ahorro.
    renta:         11250,     // día 1
    rentaHasta:  '2027-01',   // el último mes de renta: el depa se entrega a fin de enero
    // Desde el mes siguiente vive con su familia (Adán, 3-oct-2026): "a mi familia aportaré como 3
    // mil al mes, pero ahorraré en comida". El aporte cae el día 1 hasta el último mes en México; la
    // comida y la cena son de la casa y él paga su desayuno (`SUPUESTOS.comidaEnCasa`).
    aporteCasa:     3000,
    get enCasaDesde() { return mesSiguiente(this.rentaHasta); },
    // El último mes en México, el anterior a la salida: hasta ahí llegan el sueldo de ALTEN, el
    // ahorro de cada quincena y lo de Didi.
    get ultimoMesMexico() { const p = this.maestriaInicio.split('-').map(Number); return mesDe(new Date(p[0], p[1] - 2, 1)); },
    // 2026-08-18 cambió de gimnasio: Fitsi ($1,500) → Total Pass ($650), que se cobra el día 17.
    // Son $850/mes menos, $10,200 al año. Este valor llevaba desactualizado aquí mientras
    // Finanzas ya usaba el nuevo en una parte de su código y el viejo en otras tres.
    gym:             650,     // Total Pass, día 17
    gymNombre:  'Total Pass',
    internet:        200,
    // 2026-08-30: el plan de datos de AT&T, $650 y se paga el dia 1 (Adan). Es este
    // mismo concepto, no uno nuevo: `celular` ya suma en servicios -> fijosTotal, asi
    // que un cobro aparte lo habria contado dos veces. Lo que faltaba era el DIA, que
    // hasta ahora no existia en ningun lado y por eso no salia en el calendario.
    celular:         650,     // Plan de datos AT&T, dia 1
    celularPlan: 'Plan de datos AT&T',
    // 2026-08-30: el gas se paga CADA DOS MESES, no cada mes (Adán: "gas cada 2 meses el
    // perimero del mes, el ultimo fue el 3 agosto"). `gas` es el importe del recibo; lo que
    // pesa en un mes cualquiera es la mitad, y eso es lo que entra en `servicios`.
    gas:             179,     // recibo bimestral, día 1 de los meses pares
    gasCadaMeses:      2,
    gasDesdeMes: '2026-08',   // el último recibo pagado; desde aquí se cuenta de dos en dos
    get gasMensual() { return this.gas / this.gasCadaMeses; },
    luzAgua:         135,     // día 1 (luz y agua caen el mismo día)
    claudeCode:      380,     // $20 USD
    icloud:            50,
    // Los tres grupos tal como los usa el plan semanal de Finanzas, para que no los sume a mano.
    // La limpieza salió el 2026-08-30: Adán, preguntado por su día, contestó "esa no la
    // pago". Eran $150/mes que el presupuesto llevaba dando por gastados.
    get servicios() { return this.celular + this.internet + this.gasMensual + this.luzAgua; },
    get suscripciones() { return this.gym + this.claudeCode + this.icloud; },
    get fijosTotal() { return this.renta + this.servicios + this.suscripciones; },
    // El ahorro ya no va a CETES: va todo a GBM (Adán, 5-oct-2026: "el ahorro no se irá a cetes,
    // se irá a gbm, lo invertiré todo"). Queda en 0 porque Finanzas y Qué invertir hoy lo leen; los
    // CETES que ya tiene siguen siendo su fondo de emergencia.
    cetesDia15:        0,
    // Págate primero (Plan Maestro, Fases 1 y 2): lo que sale a GBM el día que entra cada quincena.
    // Cada quincena se sostiene sola (Adán, 5-oct-2026: "eso debe ser cada quincena y deja dinero
    // sobrante para la quincena"): su sueldo menos los fijos que caen en sus días, la comida de sus
    // días y su parte del gasto personal —sus rutinas y el tope de lo demás de SUPUESTOS, repartidos
    // por día—, redondeado a cientos hacia abajo con el peor mes de cada etapa. Ninguna quincena
    // vive del sobrante de la otra y la tarjeta ya no se paga de golpe el 11: mientras la BBVA tenga
    // saldo, estos envíos van primero a ella (`planBbva`). El verificador avisa si dejan de caber.
    ahorroDia1:      2050,    // con depa: de noviembre de 2026 a enero de 2027
    ahorroDia15:     6950,    // con depa: del 15 de octubre de 2026 a enero de 2027
    ahorroDia1Casa: 12100,    // en casa de tu familia: de enCasaDesde a ultimoMesMexico
    ahorroDia15Casa: 8900,
    // El plan de la BBVA arranca el día `bbvaFecha` con `bbvaInicio` (lo que debía entonces), y
    // contra ese saldo se mide lo pagado (`avanceBbva`). No se mueven con cada saldo nuevo: el
    // último que dice Adán va en `d001` de DEUDAS_SEED y su día en `bbvaSaldoFecha`; ahí el plan
    // se ancla al saldo real. Lo de antes se queda como pasó, y la proyección no vuelve a contar
    // como ahorro lo que ya se pagó.
    bbvaFecha: '2026-10-05',
    bbvaInicio: 15000,
    bbvaSaldoFecha: '2026-10-25',
    // Y no cobra intereses (Adán, 6-oct-2026: "bbva no va cobrar intereses, eso déjalo en 0, por
    // que pagaré para no pagar intereses a la tarjeta"): cada mes cubre lo que pide el estado de
    // cuenta para no generarlos. `planBbva` no les suma nada y el Dashboard no se los cuenta.
    bbvaSinIntereses: true,
    // La pestaña "Riesgo súper alto" de Qué invertir hoy (Adán, 21-sep-2026): al mes van
    // especulacionMes, de los que cetesDia15 son CETES fijos, especulacionBtcPct % a Bitcoin y
    // TODO el resto a una sola empresa a la baja que investiga Claude.
    especulacionMes:    20000,
    especulacionBtcPct: 10,

    // ── Cosas suyas que se nombran en varias apps ──
    auto:        'BYD Dolphin Mini',
    broker:      'GBM',                     // estrategia: empresas de EE. UU.
    bancoSueldo: 'BBVA',

    // ── Estudios de alemán ──
    // Retomó clases presenciales el 25-ago-2026 y va por el Kapitel 10 (Perfekt + Berufe).
    // `escuelaAleman` la citan Coach y el inicio de la app de Alemán; `kapitelAleman` es dato del
    // proyecto y no filtra ninguna pantalla.
    escuelaAleman:   'Cenlex Santo Tomás',
    kapitelAleman:   10,
    // ── El libro que está leyendo ──
    // Lo que Adán dice que lee manda sobre lo que el Dashboard eligió solo (26-oct-2026: "este mes compré Hábitos
    // Atómicos y quiero leerlo todo el mes"). El Dashboard lo pone UNA vez como libro del mes (`libroMes()`; el id y
    // la fecha son la bandera) y lo que él mueva después con «Otro» o «Empezarlo ya» no se revierte. Cuando diga que
    // empezó otro, se cambia aquí: `id` es el de la biblioteca y `desde`, el día que lo empezó.
    libroEnCurso:    { id: 'atomicHabits', desde: '2026-10-26' },
    // La meta diaria de proteína. Estaba escrita a mano en las 3 subtareas de la whey y en
    // el catálogo de salud.html; ahora la citan como {{proteinaMeta}}.
    proteinaMeta:    186,
    // Las otras metas diarias del Plan Masa Muscular (≈325 kcal sobre el mantenimiento de ~2,790).
    // Estaban escritas a mano en comida.html (dos veces) y en la semilla de salud.html.
    kcalMeta:        3115,
    carbsMeta:       404,
    grasaMeta:       86,

    // ── Fechas y metas no financieras ──
    entrevistaWayve: '2026-07-08',          // ver Entrevistas/ → sección Wayve
    maestriaEscuela: 'Esslingen — Automotive Systems M.Eng.',
    // Adán, 3-oct-2026: "de prioridad mejor si me quiero ir en sep del 2027 a Alemania". El
    // programa arranca en septiembre (hs-esslingen.de): ese mes es la salida.
    maestriaInicio:  '2027-09-01',
    inicioCenlex:    '2026-08-25',
    // La respuesta de Esslingen llega "antes de fin de mayo" (hs-esslingen.de) y la cuenta
    // bloqueada se llena a mediados de junio: ese es el día de decidir la salida, con las dos.
    maestriaDecision: '2027-05-31',
    // El primer Hyrox. El de CDMX (29 oct–1 nov 2026) quedó a tres semanas de la rutina nueva, sin el
    // bloque de carrera; el siguiente en México que cae en la Fase 1 es Guadalajara, del 19 al 21 de
    // marzo de 2027 en Expo Guadalajara (hyrox.com, revisado el 11-oct-2026). El sábado es el día:
    // el domingo es de Didi. Monterrey (16–18 abr 2027) ya cae en la Fase 2, sin viajes.
    hyroxSede:       'HYROX Guadalajara',
    hyroxFecha:      '2027-03-20',
    // El euro para planear. El 2-oct-2026 estaba en $20.46 (Infobae); se planea a $21.00 para
    // que una subida normal (su volatilidad anda en ~7 %) no tumbe la cuenta bloqueada.
    eurMxn:          21.0,
    // El dólar para planear lo que se cobra en dólares (los proyectos de Laptop). El 8-abr-2026 estaba
    // en $17.76 (Banxico, vía Uno TV); se planea un poco abajo para no inflar lo que entra.
    usdMxn:          17.5,
  };

  /* ── EL CALENDARIO ────────────────────────────────────────────────────────────────────────
     Lo que el calendario del Dashboard necesita y NO puede derivar solo.

     `cobros` — los días fijos del mes. Los MONTOS salen de PROYECTO con getters, así que si
     sube la renta o vuelve a cambiar el gimnasio el calendario se entera sin tocar nada aquí.
     El DÍA sí vive aquí: hasta el 2026-08-26 solo existía como comentario al lado de la cifra
     ("renta, día 1"), o sea que ninguna app podía leerlo.

     `grupo` dice a qué renglón del desglose del sueldo va cada cobro (`desgloseMes`): sueldo,
     renta, depa, celular, suscripciones, familia o ahorro. `ahorro: true` es dinero que se aparta
     —el ahorro de cada quincena—: sale de la cuenta pero no es gasto.
     `hitos` — fechas duras que no se pueden sacar de ningún otro dato. Todo lo demás lo
     calcula el Dashboard en vivo y por eso no está escrito aquí: los cierres y arranques de
     fase salen de PHASES, y la última cuota de un MSI sale de `balance / min` sobre las
     deudas vivas de Finanzas.

     Regla al agregar: si una fecha se puede derivar de un dato que ya existe, NO va aquí. */
  const CALENDARIO = {
    cobros: [
      { dia:  1, txt: 'Renta', grupo: 'renta', get monto() { return PROYECTO.renta; }, get hasta() { return PROYECTO.rentaHasta; } },
      { dia:  1, get txt() { return PROYECTO.celularPlan; }, grupo: 'celular', get monto() { return PROYECTO.celular; } },
      { dia:  1, txt: 'Quincena', grupo: 'sueldo', get monto() { return PROYECTO.sueldoQuinc; }, entra: true },
      // El 15, no el 14 (Adán, 2026-08-28). El plan semanal de Finanzas ya la trataba así
      // — la mete en la semana 3 (días 15-21) y deja la semana 2 sin ingreso — pero aquí
      // decía 14, así que el calendario y el plan se contradecían sin que nada lo notara.
      { dia: 15, txt: 'Quincena', grupo: 'sueldo', get monto() { return PROYECTO.sueldoQuinc; }, entra: true },
      { dia: 17, txt: 'Gym', grupo: 'suscripciones', get monto() { return PROYECTO.gym; } },
      // 2026-08-30 — los seis fijos que el calendario no contemplaba. Sumaban $1,094 al mes
      // saliendo de la cuenta sin que ninguna pantalla los descontara del tramo. Los días
      // los dio Adán; la limpieza se cayó de la lista porque no la paga.
      { dia:  1, txt: 'Luz y agua', grupo: 'depa', get monto() { return PROYECTO.luzAgua; }, get hasta() { return PROYECTO.rentaHasta; } },
      { dia:  2, txt: 'Claude Code', grupo: 'suscripciones', get monto() { return PROYECTO.claudeCode; } },
      { dia:  8, txt: 'Internet', grupo: 'depa', get monto() { return PROYECTO.internet; }, get hasta() { return PROYECTO.rentaHasta; } },
      { dia:  8, txt: 'iCloud', grupo: 'suscripciones', get monto() { return PROYECTO.icloud; } },
      // Luz, agua, internet y gas son del depa: terminan con la renta (`hasta`, rentaHasta).
      // El gas no cae todos los meses: `cada` y `desde` lo dicen, y ctAgenda los respeta.
      { dia:  1, txt: 'Gas', grupo: 'depa', get monto() { return PROYECTO.gas; },
        get cada() { return PROYECTO.gasCadaMeses; }, get desde() { return PROYECTO.gasDesdeMes; }, get hasta() { return PROYECTO.rentaHasta; } },
      // Plan Maestro — el ahorro de cada quincena a GBM (PROYECTO.ahorroDia1…) y el aporte a la casa.
      // `ahorro: true`: sale de la cuenta del día a día pero sigue siendo tuyo, así que el balance
      // mensual no lo cuenta como gasto. Mientras la BBVA tenga saldo, lo de ese día va primero a
      // ella: `agendaDia` lo parte con `planBbva`. El 1 de octubre de 2026 ya había pasado.
      { dia:  1, txt: 'Ahorro → GBM', grupo: 'ahorro', ahorro: true, quincena: true,
        get monto() { return PROYECTO.ahorroDia1; }, desde: '2026-11', get hasta() { return PROYECTO.rentaHasta; } },
      { dia: 15, txt: 'Ahorro → GBM', grupo: 'ahorro', ahorro: true, quincena: true,
        get monto() { return PROYECTO.ahorroDia15; }, desde: '2026-10', get hasta() { return PROYECTO.rentaHasta; } },
      { dia:  1, txt: 'Ahorro → GBM', grupo: 'ahorro', ahorro: true, quincena: true,
        get monto() { return PROYECTO.ahorroDia1Casa; },
        get desde() { return PROYECTO.enCasaDesde; }, get hasta() { return PROYECTO.ultimoMesMexico; } },
      { dia: 15, txt: 'Ahorro → GBM', grupo: 'ahorro', ahorro: true, quincena: true,
        get monto() { return PROYECTO.ahorroDia15Casa; },
        get desde() { return PROYECTO.enCasaDesde; }, get hasta() { return PROYECTO.ultimoMesMexico; } },
      { dia:  1, txt: 'Aporte a tu familia', grupo: 'familia', get monto() { return PROYECTO.aporteCasa; },
        get desde() { return PROYECTO.enCasaDesde; }, get hasta() { return PROYECTO.ultimoMesMexico; } },
    ],
    hitos: [
      { fecha: PROYECTO.maestriaDecision, txt: 'Decisión Maestría',
        sub: 'Con la admisión de Esslingen y el dinero de la cuenta bloqueada: si están las dos, te vas en septiembre; si falta una, se reaplica para 2028 y el ahorro sigue.' },
      { fecha: PROYECTO.maestriaInicio, txt: 'Salida a Alemania',
        sub: PROYECTO.maestriaEscuela },
    ],
  };

  function leer() {
    try { const r = localStorage.getItem(KEY); fin = r ? JSON.parse(r) : null; }
    catch (e) { fin = null; }
    return fin;
  }

  /* ── EL SEED DE LAS DEUDAS ────────────────────────────────────────────────────────────────
     Vivía dentro de `seedData()` en Finanzas.html, y era la OTRA fuente de verdad: cada vez que
     se sube `SEED_VER` (van 23 veces), seedData() vuelve a sembrar y pisa los saldos con lo que
     hubiera escrito aquí. O sea que un saldo actualizado a mano se perdía en el siguiente reseed
     si a nadie se le ocurría cambiarlo también en el seed.
     Ahora vive aquí, en el mismo archivo que las cifras y las migraciones. Finanzas.html lo lee
     de `CIFRAS.DEUDAS_SEED`, y este módulo lo usa además como respaldo para las cifras cuando el
     navegador todavía no tiene datos guardados.
     Los saldos vivos NO se editan aquí: se editan en Finanzas (o llegan por una migración). Esto
     es solo el punto de partida de un navegador en blanco. */
  const DEUDAS_SEED = [
    // rate 10 -> 55.7 (2026-08-19). El 10% anual daba $270/mes de intereses, y Adán reportó
    // ~$1,500. Sus propios registros lo confirman sin necesidad de creerle a nadie: esta
    // tarjeta lleva `total == balance` desde el 22-ene-2024 pagando $1,500 al mes — 31 meses,
    // $46,500 pagados, saldo intacto. Si el saldo no baja, el interés mensual ES el pago:
    // 1500 × 12 / 32,343.31 = 55.7% anual, que es una tasa normal de tarjeta en México.
    // ⚠️ Confirmar contra el estado de cuenta (ahí viene la tasa y el CAT) y ajustar si difiere.
    // 2026-08-24: el saldo SUBIÓ de $32,343.31 a $34,000. Con $1,500 de mínimo contra ~55.7%
    // anual, el pago no alcanza a cubrir el interés y la tarjeta crece sola. `total` sube con el
    // saldo para conservar la invariante `total == balance` que esta tarjeta lleva desde 2024;
    // si `total` se quedara en 32,343.31, el "pagado real" de las barras saldría en negativo.
    // Saldos dichos por Adán: $34,000 (24-ago) → $37,000 (7-sep) → $39,000 (16-sep-2026) →
    // $900 (20-sep-2026: vendió todo el Bitcoin, $39,500, y con eso más $4,000 de la cuenta
    // pagó $38,100 aquí). `total` se queda en 39,000: ya no hace falta la invariante
    // `total == balance` —era para que el saldo creciente no dejara el "pagado real" en
    // negativo— y así las barras enseñan los $38,100 pagados de verdad.
    // 2026-09-30: vuelve a $10,000 ("la de bbva le debo 10 mil") y la pagaba completa cada mes. El
    // 5-oct-2026 debe $15,000 y no le alcanza para pagarla el 11 ("me estás diciendo de pagar mi
    // tarjeta pero ni tengo dinero"): `noInterest` queda en 0 —el 11 ya no pide el total— y se paga quincena a
    // quincena con `planBbva`, desde `PROYECTO.bbvaFecha`, sin intereses (`bbvaSinIntereses`).
    // 14-oct-2026: $9,900 ("el credito de tarjeta de bbva ya bajo a 9,900"), adelante del plan. 19-oct-2026:
    // $8,900 ("aún debo hoy mismo, debo 8,900"): los abonos del 15 y del 19 no pasaron como decía el plan.
    // 25-oct-2026: $14,500 ("mi deuda de BBVA subió a 14,500"): $5,600 más que el 19.
    // El día del último saldo va en `PROYECTO.bbvaSaldoFecha`.
    {id:'d001',name:'Tarjeta BBVA',                  type:'credit_card',total:39000,     balance:14500,        rate:55.7,  min:1500, day:11,start:'2024-01-22', noInterest:0},
    // Liquidada el 13 ago 2026 — Adán pagó el saldo completo. 55.7 es un supuesto tomado de
    // la BBVA, no un dato medido de esta tarjeta.
    // 2026-09-01: VUELVE A TENER SALDO, y con él vuelve a ser deuda cara. Cuatro compras de ese
    // día se cargaron aquí —plancha de Amazon $1,902, dutasterida $1,560, minoxidil NR-11 $900
    // y mouse $1,623— que suman $5,985. Su mínimo de $810 llevaba desde el 13 ago fuera de
    // `minimosDeuda` (solo cuentan las deudas con saldo vivo) y vuelve a entrar, así que
    // `margen` baja esos $810 sin que nadie toque un gasto fijo.
    // `total` se queda en 14349.72, el pico de 2024: es mayor que el saldo nuevo, así que el
    // "pagado real" de las barras sigue saliendo positivo y no hay que romper la invariante
    // `total == balance` como hubo que hacer con la BBVA.
    // Saldos dichos por Adán: $5,985 (1-sep) → $7,000 (7-sep) → $7,800 (16-sep-2026) →
    // $4,900 (20-sep-2026 → $3,900 el 21-sep: abonó $3,000 de la venta del Bitcoin; los $100 sobre la resta son
    // intereses o cargos del corte, dicho por él) → $0 (30-sep-2026: "ya no debo nada a mi tarjeta
    // de crédito de banamex"). Liquidada por segunda vez.
    // `liquidaciones`: cada vez que quedó en $0. Se liquidó dos veces —13 ago y 30 sep 2026— y la
    // libreta de logros solo guardaba la primera; la ruta del Plan Maestro enseña la última y cuántas.
    {id:'d002',name:'Tarjeta Banamex',               type:'credit_card',total:14349.72,  balance:0,          rate:55.7,  min:810,  day:8, start:'2024-06-18', noInterest:0, liquidaciones:['2026-08-13','2026-09-30']},
    // Saldo reportado por Adán: $299,000 (24-ago) → $292,000 → $293,000 (25-ago-2026) → $283,000 (21-sep-2026).
    {id:'d003',name:'Crédito Automotriz',            type:'car',        total:315800,    balance:279363.48, rate:12.99, min:6700, day:15, start:'2026-01-01', remainingMonths:61, pagosAl:'2026-10-15'},
    // Liquidado: la última cuota era la del 18 sep 2026 y Adán la dio por pagada el 21-sep-2026.
    {id:'d004',name:'Apple Watch MSI (TC Banamex)',  type:'other',      total:10248,     balance:0,        rate:0,     min:854,  day:18,start:'2025-09-16'},
    // d005 (Vuelo Viva Aerobus) y d006 (Mercado Libre) se ELIMINARON el 13 ago 2026: Adán
    // revisó su historial real de BBVA y esos dos MSI no existen — no aparecen en ningún
    // movimiento. Se borran en vez de ponerlos en $0 porque nunca fueron deuda suya.
    // Liquidados el 13 ago 2026 — se pagó la última de las 3 cuotas MSI.
    {id:'d007',name:'Boletos Ticketmaster (MSI)',   type:'other',      total:3780,      balance:0,         rate:0,     min:1260, day:0, start:'2026-04-20'},
    // No es un MSI de tarjeta aunque el nombre viejo lo dijera: es un crédito del propio
    // AT&T, y se cobra el día 1 (Adán, 2026-08-28). `type:'other'` se mantiene porque esa
    // categoría agrupa la deuda a 0% de interés, no solo los MSI de tarjeta — sigue contando
    // en `deudaMsi` y fuera de `deudaCara`, que es lo correcto.
    {id:'d008',name:'iPhone 15 (crédito AT&T)',    type:'other',      total:13337.46,  balance:9879.6,    rate:0,     min:493.98,day:1, start:'2026-03-20', pagosAl:'2026-10-01'},
    // MSI reales de la TC BBVA, leídos del estado de cuenta con corte del 22 jul 2026
    // (captura que mandó Adán el 13 ago 2026). El `start` de cada uno está puesto para que
    // `autoBalance()` reproduzca exactamente las cuotas ya cobradas: 30.44 días por mes desde
    // esa fecha dan el número de cargos que se ven en el estado de cuenta, ni uno más.
    {id:'d009',name:'Zap Stylo (MSI TC BBVA)',      type:'other',      total:1002,      balance:0,         rate:0,     min:167,  day:22,start:'2026-03-22'},
    // d010 y d011 quedaron liquidados el 24-ago-2026: cerraron su tercera y última cuota. De los
    // tres MSI de la TC BBVA, d009 (los zapatos) fue el último: Adán lo dio por pagado el 21-sep-2026.
    {id:'d010',name:'Merpago*Merca (MSI TC BBVA)', type:'other',      total:1791,      balance:0,         rate:0,     min:597,  day:22,start:'2026-05-22'},
    {id:'d011',name:'Mercado Pago (MSI TC BBVA)',  type:'other',      total:2151,      balance:0,         rate:0,     min:717,  day:22,start:'2026-05-22'},
    // 2026-09-16 · Adán: "tengo una deuda de 13,000 por temas de mi apartamento". Sin tasa, sin
    // mínimo y sin día: no dijo cómo la paga. Con `min:0` no entra en `minimosDeuda` ni baja
    // `margen` — en cuanto diga cuánto abona al mes y qué día, van aquí y el calendario la
    // pinta solo. `loan` (préstamo personal): no es tarjeta (`deudaCara`) ni MSI (`deudaMsi`),
    // pero sí suma en `deudaTotal`. Se pagó entera el 21-sep-2026 (Adán: "deuda de apartamento
    // también ya la pagué"); nunca tuvo mínimo ni día.
    {id:'d012',name:'Deuda del departamento',       type:'loan',       total:13000,     balance:0,         rate:0,     min:0,    day:0, start:'2026-09-16'}
  
  ];

  /* ── LA RUTINA DIARIA ─────────────────────────────────────────────────────────────────────
     El horario completo: 57 bloques con sus subtareas. Estaba COPIADO en dashboard.html y en
     Coach.html, 17.5 KB en cada uno, y era la estructura más grande y más tocada de las que
     había que mantener a mano en dos sitios. El 2026-08-24 se detectó que llevaban 6 días
     divergentes: 7 textos de la rutina de cabello mejorados solo en Coach.

     dias: 0=domingo … 6=sábado. Los bloques con `fijo:true` (ALTEN) salen en la línea de tiempo
     y cuentan para "ahora/siguiente", pero no llevan checkbox ni suman al progreso.

     Los `href` se guardan en forma NEUTRA, como ancla interna (#aprendizaje). Cada app los
     resuelve al pedir la lista con `CIFRAS.rutina(base)`: Coach pasa "" porque las anclas son
     suyas, y el Dashboard pasa "../Coach/Coach.html" porque tiene que salir de su archivo.
     Era la única diferencia legítima entre las dos copias; ahora es un parámetro.

     `corto` es el título de la agenda de Mi Día (Adán, 6-oct-2026: "simplifica todos los títulos de
     mañana, tarde y noche"): lo que se lee de un vistazo junto a la hora de inicio y fin. `txt` sigue
     siendo el completo, el del AHORA y de Coach. */
  const RUTINA_TASKS = [
    {id:"wd01",dias:[1,2,3,4,5],hora:"06:40",cat:"salud",corto:"Despertar",txt:"Despertar sin snooze — celular fuera del cuarto"},
    {id:"wd-app-am",dias:[1,2,3,4,5],hora:"06:43",cat:"aprender",corto:"💻 Construir esta app",txt:"💻 Construir esta aplicación — 10 min antes de arrancar el día"},
    {id:"wd-am-lav",dias:[1,4],hora:"06:53",cat:"salud",corto:"🚿 Rutina de la mañana",txt:"🚿 Rutina de la mañana — ducha, cabello, piel y suplementos",producto:true,subtareas:[{id:"wd02a",sec:"Ducha y cabello",txt:"Champú: <b>Pilexil Anticaída 300 ml</b> — masajea el cuero cabelludo 2 min y enjuaga. NO lo frotes en el largo: su trabajo es la raíz."},{id:"wd02b",txt:"Acondicionador: <b>L'Oréal Elvive Reparación Total 5</b> — solo de medios a puntas, nunca en la raíz."},{id:"wd02d",txt:"Deja secar al aire. Si tienes prisa y usas secadora, aire tibio y a 20 cm — nunca caliente ni pegado."},{id:"wd02e",txt:"⚠️ Si HOY hay caspa o descamación, usas <b>Darrow Doctar (alquitrán)</b> en lugar del Pilexil. Nunca los dos el mismo día."},{id:"wd03a",sec:"Piel y minoxidil",txt:"Limpiador suave: CeraVe Limpiador Espumoso (verde) — quita grasa y sudor de la noche sin resecar"},{id:"wd03b",txt:"Sérum de niacinamida 10%: The Ordinary Niacinamida 10% + Zinc 1% — controla grasa y afina los poros"},{id:"wd03c",txt:"Protector solar: <b>La Roche-Posay Anthelios Oil Free SPF50</b> — <b>dos dedos completos</b> para cara y cuello. Con menos, un SPF50 protege como un SPF15"},{id:"wd04",txt:"<b>Minoxidil 5% NR-11 (Polaris Research)</b> 5 atomizaciones (1 ml) en cuero cabelludo seco — es loción, no espuma: si te pica o reseca, baja a una dosis al día — estimula el folículo, dosis de la mañana"},{id:"wd04av",txt:"<b>Avodart (dutasterida 0,5 mg)</b> — una cápsula con el desayuno, siempre a la misma hora. Actúa por dentro bloqueando la DHT: no sustituye al minoxidil, se suman"},{id:"wdSupAm1",sec:"Suplementos",txt:"Vitamina D3 — 2000-4000 UI, con algo de grasa en la comida",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"wdSupAm2",txt:"Multivitamínico — 1 tableta"},{id:"wdSupAm3",txt:"Omega 3 — 1-2g EPA+DHA, con alimento"},{id:"wdSupAm4",txt:"Creatina monohidratada — 5g (todos los días, no solo si entrenas hoy)"}]},
    {id:"wd-am-co",dias:[2,3,5],hora:"06:53",cat:"salud",corto:"🚿 Rutina de la mañana",txt:"🚿 Rutina de la mañana — ducha, cabello, piel y suplementos",producto:true,subtareas:[{id:"wd02ca",sec:"Ducha y cabello",txt:"Hoy <b>no lleva champú</b>: mojas, y aplicas <b>L'Oréal Elvive Reparación Total 5</b> solo de medios a puntas. Lavar a diario con champú es lo que termina de secar el pelo."},{id:"wd02cc",txt:"Ya seco, si lo notas áspero: 2 gotas de <b>Moroccanoil Treatment Light</b> solo en las puntas."},{id:"wd03a",sec:"Piel y minoxidil",txt:"Limpiador suave: CeraVe Limpiador Espumoso (verde) — quita grasa y sudor de la noche sin resecar"},{id:"wd03b",txt:"Sérum de niacinamida 10%: The Ordinary Niacinamida 10% + Zinc 1% — controla grasa y afina los poros"},{id:"wd03c",txt:"Protector solar: <b>La Roche-Posay Anthelios Oil Free SPF50</b> — <b>dos dedos completos</b> para cara y cuello. Con menos, un SPF50 protege como un SPF15"},{id:"wd04",txt:"<b>Minoxidil 5% NR-11 (Polaris Research)</b> 5 atomizaciones (1 ml) en cuero cabelludo seco — es loción, no espuma: si te pica o reseca, baja a una dosis al día — estimula el folículo, dosis de la mañana"},{id:"wd04av",txt:"<b>Avodart (dutasterida 0,5 mg)</b> — una cápsula con el desayuno, siempre a la misma hora. Actúa por dentro bloqueando la DHT: no sustituye al minoxidil, se suman"},{id:"wdSupAm1",sec:"Suplementos",txt:"Vitamina D3 — 2000-4000 UI, con algo de grasa en la comida",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"wdSupAm2",txt:"Multivitamínico — 1 tableta"},{id:"wdSupAm3",txt:"Omega 3 — 1-2g EPA+DHA, con alimento"},{id:"wdSupAm4",txt:"Creatina monohidratada — 5g (todos los días, no solo si entrenas hoy)"}]},
    {id:"sa-am",dias:[6],hora:"09:05",cat:"salud",corto:"🚿 Rutina de la mañana",txt:"🚿 Rutina de la mañana — ducha, cabello, piel y suplementos",producto:true,subtareas:[{id:"sa05a",sec:"Ducha y cabello",txt:"Champú: <b>CeraVe Champú Hidratante sin sulfatos</b>. Hoy es día de reparación, no de tratamiento."},{id:"sa05b",txt:"<b>Mascarilla L'Oréal Elvive Total Repair 5</b> — es un acondicionador concentrado, viene en TARRO (no en botella). Va de medios a puntas y se deja actuar <b>5-10 min</b> mientras terminas de bañarte. Es el paso que más repara de toda tu semana: si te saltas uno, que no sea este."},{id:"sa05c",txt:"Hoy <b>NO</b> uses acondicionador: la mascarilla ya hizo ese trabajo, y ponerle los dos apelmaza el cabello fino."},{id:"sa05d",txt:"Ya seco: 2 gotas de <b>Moroccanoil Treatment Light</b> en puntas."},{id:"sa05e",txt:"Revisa las puntas: si ves pelos abiertos en forma de Y, ya toca corte. Cada 8-12 semanas, 1-2 cm — solo puntas."},{id:"sa02",sec:"Piel y minoxidil",txt:"Skincare AM — limpiador + niacinamida + hidratante con SPF 50 (mismos productos que entre semana)"},{id:"sa02b",txt:"<b>Minoxidil 5% NR-11 (Polaris Research)</b> 5 atomizaciones (1 ml) en cuero cabelludo seco — es loción, no espuma: si te pica o reseca, baja a una dosis al día — dosis de la mañana"},{id:"sa02bav",txt:"<b>Avodart (dutasterida 0,5 mg)</b> — una cápsula con el desayuno, siempre a la misma hora. Actúa por dentro bloqueando la DHT: no sustituye al minoxidil, se suman"},{id:"saSupAm1",sec:"Suplementos",txt:"Vitamina D3 — 2000-4000 UI, con algo de grasa en la comida",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"saSupAm2",txt:"Multivitamínico — 1 tableta"},{id:"saSupAm3",txt:"Omega 3 — 1-2g EPA+DHA, con alimento"},{id:"saSupAm4",txt:"Creatina monohidratada — 5g (todos los días, no solo si entrenas hoy)"}]},
    {id:"do-am",dias:[0],hora:"08:35",cat:"salud",corto:"🚿 Rutina de la mañana",txt:"🚿 Rutina de la mañana — ducha, cabello, piel y suplementos",producto:true,subtareas:[{id:"do045a",sec:"Ducha y cabello",txt:"Hoy <b>no lleva champú</b>: <b>L'Oréal Elvive Reparación Total 5</b> de medios a puntas y enjuaga."},{id:"do045c",txt:"Antes de dormir, <b>funda de almohada de satín</b>. Pasas 7 horas frotando el pelo contra la almohada: el algodón lo rompe y le roba humedad, el satín no."},{id:"do02",sec:"Piel y minoxidil",txt:"Skincare AM — limpiador + niacinamida + hidratante con SPF 50 (mismos productos que entre semana)"},{id:"do02b",txt:"<b>Minoxidil 5% NR-11 (Polaris Research)</b> 5 atomizaciones (1 ml) en cuero cabelludo seco — es loción, no espuma: si te pica o reseca, baja a una dosis al día — dosis de la mañana"},{id:"do02bav",txt:"<b>Avodart (dutasterida 0,5 mg)</b> — una cápsula con el desayuno, siempre a la misma hora. Actúa por dentro bloqueando la DHT: no sustituye al minoxidil, se suman"},{id:"doSupAm1",sec:"Suplementos",txt:"Vitamina D3 — 2000-4000 UI, con algo de grasa en la comida",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"doSupAm2",txt:"Multivitamínico — 1 tableta"},{id:"doSupAm3",txt:"Omega 3 — 1-2g EPA+DHA, con alimento"},{id:"doSupAm4",txt:"Creatina monohidratada — 5g (todos los días, no solo si entrenas hoy)"}]},
    {id:"wd05",dias:[1,2,3,4,5],hora:"07:33",cat:"descanso",corto:"Vestirte",txt:"Vestirte y alistarte"},
    {id:"wd06",dias:[1,2,3,4,5],hora:"07:40",cat:"admin",corto:"🚗 Didi rumbo a ALTEN",txt:"🚗 Didi con direccionamiento — camino a ALTEN (~50 min: el traslado normal + el desvío del pasajero)"},
    {id:"wd07",dias:[1,2,3,4,5],hora:"08:30",dur:270,cat:"trabajo",corto:"🏢 ALTEN",txt:"🏢 ALTEN — jornada laboral (HIL/SIL Ford) — entras 08:30, sales 16:40",fijo:true},
    {id:"wd12b",dias:[1,2,3,4,5],hora:"13:00",cat:"salud",corto:"🛒 Comprar comida",txt:"🛒 Comprar comida — descanso de ALTEN"},
    {id:"wd12c",dias:[1,2,3,4,5],hora:"13:40",dur:180,cat:"trabajo",corto:"🏢 ALTEN",txt:"🏢 ALTEN — de vuelta a la jornada laboral (hasta las 16:40)",fijo:true},
    {id:"wd-cenlex",dias:[1,2,3,4,5],hora:"16:40",dur:20,cat:"admin",corto:"🚗 Al CENLEX",txt:"🚗 Manejar al CENLEX Santo Tomás (~20 min)"},
    {id:"wd-aleman",dias:[1,2,3,4,5],hora:"17:00",dur:60,cat:"aprender",corto:"🇩🇪 Clase de alemán",txt:"🇩🇪 Clase de alemán — CENLEX Santo Tomás (17:00 a 18:00)"},
    {id:"wd-al-gym",dias:[1,2,3,4,5],hora:"18:00",dur:35,cat:"admin",corto:"🚗 Al gimnasio",txt:"🚗 Del CENLEX al gimnasio (~35 min)"},
    {id:"wd09",dias:[1,2,3,4,5],hora:"20:05",dur:15,cat:"salud",corto:"👕 Cambiarte",txt:"👕 Cambiarte — sin ducha: ropa seca para manejar, en 15 min",subtareas:[{id:"wd09a",txt:"Ropa seca y la del gimnasio en su bolsa: en 15 min estás listo para manejar."}]},
    {id:"wd-didi2",dias:[1,2,3,4,5],hora:"20:20",cat:"admin",corto:"🚗 Didi",txt:"🚗 Didi — sesión corta de la noche (hasta ~20:50)"},
    {id:"wd11",dias:[1,2,3,4,5],hora:"20:50",dur:60,cat:"profundo",corto:"🎯 Plan Maestro",txt:"🎯 Plan Maestro — 1 h en la tarea de la fase que te toca"},
    {id:"wd14",dias:[1,2,3,4,5],hora:"21:50",cat:"salud",corto:"🍽️ Cena y comida de mañana",txt:"🍽️ Cena + preparar la comida de mañana",subtareas:[{id:"wd14a",txt:"Cocina un solo platillo para cenar hoy y llevar de comida mañana a ALTEN — ahorra tiempo, sin carbohidratos refinados en la cena",link:{href:"../CuidadoPersonal/comida.html?s=cenas",label:"🍳 Ver cenas"}},{id:"wd14b",txt:"Deja todo empacado y listo junto a la puerta para salir rápido mañana",link:{href:"../CuidadoPersonal/comida.html?s=desayunos",label:"🍳 Ver desayunos"}}]},
    {id:"wd-pm",dias:[1,2,3,4,5],hora:"23:05",dur:15,cat:"salud",corto:"🌙 Rutina de la noche",txt:"🌙 Rutina de la noche — piel, minoxidil y suplementos, en 15 min",producto:true,subtareas:[{id:"wd17a",sec:"Piel y minoxidil",txt:"Limpiador: CeraVe Limpiador Espumoso (verde) — una sola pasada de 60 segundos: quita el protector y el sudor del día"},{id:"wd17b",txt:"Retinoide, con la cara bien seca: Differin Adapaleno 0.1% Gel — un chícharo para toda la cara; si te arde o se pela, noche sí y noche no hasta que se calme"},{id:"wd17c",txt:"Hidratante, encima y sin esperar: CeraVe Loción Hidratante Facial PM — sin perfume ni aceite: calma el adapaleno sin tapar poros"},{id:"wd18",txt:"<b>Minoxidil 5% NR-11 (Polaris Research)</b> 5 atomizaciones (1 ml) en cuero cabelludo seco — es loción, no espuma: si te pica o reseca, baja a una dosis al día — dosis de la noche: espera 30 minutos antes de acostarte, para que no se quede en la almohada"},{id:"wdSupPm1",sec:"Suplementos",txt:"Magnesio (glicinato) — 200-400mg, 30-60 min antes de dormir",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"wdSupPm2",txt:"Proteína Whey — 25-30g si hoy no llegaste a tu meta de proteína ({{proteinaMeta}}g/día)"}]},
    {id:"sa-pm",dias:[6],hora:"22:20",dur:15,cat:"salud",corto:"🌙 Rutina de la noche",txt:"🌙 Rutina de la noche — piel, minoxidil y suplementos, en 15 min",producto:true,subtareas:[{id:"sa13",sec:"Piel y minoxidil",txt:"Skincare PM — limpiador + retinoide + hidratante nocturno"},{id:"sa13b",txt:"<b>Minoxidil 5% NR-11 (Polaris Research)</b> 5 atomizaciones (1 ml) en cuero cabelludo seco — es loción, no espuma: si te pica o reseca, baja a una dosis al día — dosis de la noche: espera 30 minutos antes de acostarte, para que no se quede en la almohada"},{id:"saSupPm1",sec:"Suplementos",txt:"Magnesio (glicinato) — 200-400mg, 30-60 min antes de dormir",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"saSupPm2",txt:"Proteína Whey — 25-30g si hoy no llegaste a tu meta de proteína ({{proteinaMeta}}g/día)"}]},
    {id:"do-pm",dias:[0],hora:"22:05",dur:15,cat:"salud",corto:"🌙 Rutina de la noche",txt:"🌙 Rutina de la noche — piel, minoxidil y suplementos, en 15 min",producto:true,subtareas:[{id:"do10",sec:"Piel y minoxidil",txt:"Skincare PM — limpiador + retinoide + hidratante nocturno"},{id:"do10b",txt:"<b>Minoxidil 5% NR-11 (Polaris Research)</b> 5 atomizaciones (1 ml) en cuero cabelludo seco — es loción, no espuma: si te pica o reseca, baja a una dosis al día — dosis de la noche: espera 30 minutos antes de acostarte, para que no se quede en la almohada"},{id:"doSupPm1",sec:"Suplementos",txt:"Magnesio (glicinato) — 200-400mg, 30-60 min antes de dormir",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"doSupPm2",txt:"Proteína Whey — 25-30g si hoy no llegaste a tu meta de proteína ({{proteinaMeta}}g/día)"}]},
    {id:"wd-app-pm",dias:[1,3,5],hora:"22:35",cat:"aprender",corto:"💻 Construir esta app",txt:"💻 Construir esta aplicación — media hora, y es la última pantalla del día: lo que no cupo se parte para mañana"},
    {id:"wd21",dias:[1,2,3,4,5],hora:"23:40",cat:"salud",corto:"Dormir",txt:"Luz fuera y celular fuera del cuarto: sin pantallas desde que cerraste la app"},
    {id:"lu-gbm",dias:[1],hora:"09:00",dur:20,cat:"admin",corto:"💰 Bolsa GBM",txt:"💰 Bolsa GBM (20 min): compra rápida — revisa qué toca hoy y ejecuta. Solo lunes."},
    {id:"wd-cierre",dias:[1,2,3,4,5],hora:"22:20",dur:15,cat:"descanso",corto:"📓 Cierre del día",txt:"📓 Cierre del día — lectura, diario y plan de mañana, en 15 min",subtareas:[{id:"wd-lect",sec:"Lectura",txt:"10 minutos de lectura — 10 páginas del libro que tengas en curso, en papel o en el celular con la pantalla en modo noche."},{id:"wd16a",sec:"Diario del día",txt:"Escribe 3 cosas que sí lograste hoy, aunque sean pequeñas"},{id:"wd16b",txt:"1 cosa que salió mal o que aprendiste — sin autocastigo, solo para no repetirla"},{id:"wd16c",txt:"1 gasto que pudiste evitar hoy (o \"ninguno\" si no hubo)"},{id:"wd19a",sec:"Plan de mañana",txt:"Elige 1 sola tarea que, si mañana solo lograras esa, el día ya valió la pena — tu tarea más importante (MIT)"},{id:"wd19b",txt:"Anota 4 tareas más chicas para mañana, en el orden en que las harás"}]},
    {id:"e1",dias:[1],gym:true,hora:"18:35",dur:90,cat:"salud",corto:"🏋️ Espalda + bíceps",txt:"🏋️ Ejercicio: Espalda + bíceps"},
    {id:"e2",dias:[2],gym:true,hora:"18:35",dur:90,cat:"salud",corto:"🏋️ Piernas",txt:"🏋️ Ejercicio: Piernas + core"},
    {id:"k2",dias:[2],hora:"22:35",cat:"aprender",corto:"🤝 Negociar tu ingreso",txt:"🤝 Negociar tu ingreso: 30 min — tu caso para el aumento o el puesto mejor pagado: logros con números, el rango del mercado y tu guion (Never Split the Difference)",link:{href:"#aprendizaje",label:"📚 Ver la ruta de Ventas"}},
    {id:"e3",dias:[3],gym:true,hora:"18:35",dur:90,cat:"salud",corto:"🚴 Intervalos",txt:"🚴 Ejercicio: Condición — intervalos (bici, cuerdas y elíptica)"},
    {id:"e4",dias:[4],gym:true,hora:"18:35",dur:90,cat:"salud",corto:"🏋️ Pecho + tríceps",txt:"🏋️ Ejercicio: Pecho + hombro + tríceps"},
    {id:"k4",dias:[4],hora:"22:35",cat:"aprender",corto:"💰 Finanzas",txt:"💰 Finanzas: 30 min — categoriza los gastos de la semana y revisa cuánto bajó la deuda",link:{href:"../Finanzas/Finanzas.html",label:"💰 Abrir Finanzas"}},
    {id:"e5",dias:[5],gym:true,hora:"18:35",dur:90,cat:"salud",corto:"🏃 Cardio largo",txt:"🏃 Ejercicio: Cardio largo + core"},
    {id:"sa01",dias:[6],hora:"07:00",cat:"salud",corto:"Despertar",txt:"Despertar (sin alarma agresiva)"},
    {id:"sa03",dias:[6],hora:"07:18",cat:"salud",corto:"🍳 Desayuno",txt:"🍳 Preparar y desayunar tranquilo",link:{href:"../CuidadoPersonal/comida.html?s=desayunos",label:"Ver desayunos"}},
    {id:"sa04",dias:[6],gym:true,hora:"07:35",dur:90,cat:"salud",corto:"🏋️ Brazos + pecho",txt:"🏋️ Ejercicio: Brazos + pecho + cardio"},
    {id:"sa-didi1",dias:[6],hora:"09:45",cat:"admin",corto:"🚗 Didi",txt:"🚗 Didi — bloque de día (~09:45 a 14:00, 4h 15m)"},
    {id:"sa07",dias:[6],hora:"14:00",cat:"salud",corto:"Almuerzo",txt:"Almuerzo"},
    {id:"sa10",dias:[6],hora:"14:40",cat:"admin",corto:"💰 Revisión semanal",txt:"💰 Revisión semanal: finanzas, metas, hábitos cumplidos"},
    {id:"sa12",dias:[6],hora:"15:30",cat:"descanso",corto:"Tiempo libre",txt:"Tiempo libre / familia — descanso antes del segundo bloque de Didi"},
    {id:"sa-didi2",dias:[6],hora:"17:00",cat:"admin",corto:"🚗 Didi",txt:"🚗 Didi — bloque de tarde-noche (~17:00 a 22:00, 5h)"},
    {id:"sa11",dias:[6],hora:"22:00",cat:"salud",corto:"🍽️ Cena",txt:"🍽️ Cena",link:{href:"../CuidadoPersonal/comida.html?s=cenas",label:"Ver cenas"}},
    {id:"sa15",dias:[6],hora:"23:00",cat:"salud",corto:"Dormir",txt:"Apagar pantallas. Dormir"},
    {id:"do01",dias:[0],hora:"07:30",cat:"salud",corto:"Despertar",txt:"Despertar"},
    {id:"do03",dias:[0],hora:"07:48",cat:"salud",corto:"🍳 Desayuno",txt:"🍳 Preparar y desayunar tranquilo",link:{href:"../CuidadoPersonal/comida.html?s=desayunos",label:"Ver desayunos"}},
    {id:"do04",dias:[0],gym:true,hora:"08:05",cat:"salud",corto:"Descanso activo",txt:"Ejercicio: descanso activo — caminata o movilidad 30 min"},
    {id:"do05",dias:[0],hora:"09:15",cat:"admin",corto:"🚗 Didi",txt:"🚗 Didi — bloque de día (~09:15 a 14:00, 4h 45m)"},
    {id:"do-alm",dias:[0],hora:"14:00",cat:"salud",corto:"🍽️ Almuerzo",txt:"🍽️ Almuerzo — come de verdad antes del segundo turno, son 6h más al volante"},
    {id:"do-didi2",dias:[0],hora:"14:40",cat:"admin",corto:"🚗 Didi",txt:"🚗 Didi — bloque de tarde-noche (~14:40 a 21:00, 6h20)"},
    {id:"do08",dias:[0],hora:"21:00",cat:"salud",corto:"🍽️ Cena ligera",txt:"🍽️ Cena ligera",link:{href:"../CuidadoPersonal/comida.html?s=cenas",label:"Ver cenas"}},
    {id:"do06",dias:[0],hora:"21:20",cat:"admin",corto:"💰 Finanzas",txt:"💰 Finanzas: revisión de presupuesto + planificar semana + revisar inversiones"},
    {id:"do07",dias:[0],hora:"21:35",cat:"profundo",corto:"🎯 Revisar Plan Maestro",txt:"🎯 Revisar Plan Maestro: ¿la fase actual sigue en verde? Ajustar si hace falta"},
    {id:"do09",dias:[0],hora:"21:45",cat:"descanso",corto:"📓 Diario de la semana",txt:"📓 Diario de cierre de semana (10 min)",subtareas:[{id:"do09a",txt:"Qué avanzó esta semana en el Plan Maestro"},{id:"do09b",txt:"Qué NO avanzó y por qué"},{id:"do09c",txt:"1 ajuste concreto para la semana que entra"}]},
    {id:"do12",dias:[0],hora:"22:45",cat:"salud",corto:"Dormir",txt:"Apagar pantallas. Dormir — el lunes te levantas a las 06:40"},
    ];

  /* Devuelve la rutina con los href resueltos para quien la pide. Copia profunda: si una app
     modificara la lista en el sitio, contaminaría a la otra dentro de la misma página. */
  function rutina(base) {
    const pre = base || '';
    const copia = JSON.parse(JSON.stringify(RUTINA_TASKS));
    const fix = o => {
      if (Array.isArray(o)) return o.forEach(fix);
      if (!o || typeof o !== 'object') return;
      for (const k of Object.keys(o)) {
        if (k === 'href' && typeof o[k] === 'string' && o[k].charAt(0) === '#') o[k] = pre + o[k];
        else if (o[k] && typeof o[k] === 'object') fix(o[k]);
      }
    };
    fix(copia);
    return copia;
  }
  /* ── HABILIDADES (el radar) ────────────────────────────────────────────────────────────────
     Las 12 habilidades, redefinidas el 3-oct-2026 con el prompt de su página (En qué invertir tu
     tiempo, `prompts-paginas.js` → skills): el nivel (`val` 0-100) se justifica con evidencia en
     `desc`; `w` es el impacto en carrera y patrimonio CON EL PLAN DE HOY —la salida a Alemania en
     septiembre de 2027—, y pesa en el nivel general y en el orden de "Lo que sabes"; `porQue` es el
     costo de oportunidad de una hora; `prueba`, con qué se demuestra (un proyecto, un certificado,
     una entrevista o una venta); `mant`, el paso de la semana cuando no está en foco, con horas;
     `practica`, dónde se entrena; `pausa`, fuera del foco por decisión propia (Ventas y Marketing,
     9 de agosto de 2026); `porExamen`, no se sube con su ruta de ejercicios sino con el examen ISTQB CT-GenAI —la
     pregunta del día y los capítulos del syllabus— (la IA; Adán, 26-oct-2026: "esa habilidad no me interesa subirla, de momento la abarcaremos con las preguntas diarias de GenAI"). Coach usa además `full` y `cat`.
     Los overrides que Adán ajusta a mano viven en localStorage (`radarp_{id}`) y ganan sobre el
     `val` de aquí; esto es el punto de partida. */
  const SK = [
    { id: 'ventas', name: 'Ventas', full: 'Ventas & Negociación', icon: '🤝', val: 15, w: 1, cat: 'negocios', pausa: true, desc: 'Estás en 15: no has vendido en frío ni sostenido un precio frente a un extraño. Lo que sí sabes: negociar tu propio sueldo al cambiar de empresa —Ford, Continental, Bosch—.', porQue: 'En pausa por decisión tuya (9 de agosto de 2026): no se vende sin una oferta terminada. Lo que sí rinde ahora es negociar —tu ingreso de este año, que decide si te vas en 2027, y después el sueldo del Werkstudent y el primero en Alemania— y vender lo que no usas para GBM.', prueba: 'Lo que no usas, vendido a su precio en noviembre y diciembre; tu ingreso nuevo negociado antes del 31 de marzo, y el sueldo del Werkstudent.', mant: { h: 0.5, txt: 'Media hora el martes: tu caso para el aumento o el puesto nuevo, y las ventas de Marketplace de esta fase.' }, practica: 'Posts y el modo Empresa de Coach' },
    { id: 'copy', name: 'Copy', full: 'Copywriting & Persuasión', icon: '✍️', val: 55, w: 0.8, cat: 'negocios', desc: 'Estás en 55: generas ganchos e ideas con facilidad y con IA los multiplicas, pero todavía no tienes un texto publicado con resultados medidos.', porQue: 'Tu carta de motivación, tu perfil de LinkedIn y tus correos a reclutadores son copy: una promesa clara por texto es lo que hace que alguien te conteste.', prueba: 'Tu perfil de LinkedIn en inglés listo para Werkstudent (febrero de 2027) y la carta de motivación de Esslingen.', mant: { h: 0.5, txt: 'Media hora: reescribe un texto tuyo —un correo, tu titular— con una sola promesa y léelo en voz alta.' }, practica: 'Posts y el modo Empresa de Coach' },
    { id: 'marketing', name: 'Marketing', full: 'Marketing Digital', icon: '📣', val: 20, w: 0.6, cat: 'negocios', pausa: true, desc: 'Estás en 20: tienes ideas —Marketplace, posts— pero ninguna campaña ejecutada y medida.', porQue: 'En pausa por decisión tuya (9 de agosto de 2026) y por el plan: el negocio de tu papá va en piloto automático con los posts y el dossier. Se retoma en la Fase 4, con sueldo estable.', prueba: 'Los posts del negocio de tu papá programados para que él publique sin ti, antes de febrero de 2027.', mant: { h: 0, txt: 'En pausa: solo dejar listos los posts del negocio de tu papá.' }, practica: 'Posts, Aeroresinas y Heliescala' },
    { id: 'network', name: 'Networking', full: 'Networking & Relaciones', icon: '🔗', val: 55, w: 1.3, cat: 'negocios', desc: 'Estás en 55: tienes red real —Ford, Continental, Bosch y Google, y líderes de Bosch en Stuttgart con mexicanos expatriados ahí—, pero no la cultivas con intención: no hay lista, ni seguimiento, ni un bloque fijo.', porQue: 'En Alemania el Werkstudent y el primer empleo llegan más por recomendación que por portal. Y este mes salen de tu red las dos cartas de recomendación para Esslingen.', prueba: 'Las dos cartas de recomendación firmadas (noviembre de 2026) y, antes de irte, tres conversaciones con gente de Bosch o de sus proveedores en Stuttgart.', mant: { h: 1, txt: 'Una hora: tres mensajes de reactivación sin pedir nada y un seguimiento.' }, practica: 'Coach (tu marca personal) y Habilidades Base (las fichas sociales)' },
    { id: 'liderazgo', name: 'Liderazgo', full: 'Liderazgo & Equipos', icon: '👑', val: 80, w: 0.8, cat: 'negocios', desc: 'Estás en 80: en Bosch dirigiste a tu equipo y te eligieron líder del equipo de México para una asignación de cuatro meses en Stuttgart, frente a líderes de otros países. Tu techo está en las conversaciones difíciles.', porQue: 'Ya es tu fuerte: se mantiene, no se estudia. En la maestría habrá proyectos en equipo y en Alemania se espera retroalimentación directa: ahí se nota.', prueba: 'Una conversación pendiente al mes, tenida y anotada: qué dijiste y qué pasó.', mant: { h: 0.5, txt: 'Media hora: prepara por escrito la conversación pendiente del mes —el hecho, tu historia y lo que pides—.' }, practica: 'Habilidades Base (las fichas sociales) y tu trabajo en ALTEN' },
    { id: 'codigo', name: 'Código', full: 'Programación & Software', icon: '💻', val: 60, w: 1.3, cat: 'tecnico', desc: 'Estás en 60: lees y diriges código con soltura y con IA ejecutas lo que quieres, pero escribirlo desde cero —lo que piden los retos técnicos— todavía es lento. La Mecatrónica del IPN te dio microcontroladores, PLC y control: no partes de cero.', porQue: 'Los Werkstudent de validación, HIL y ADAS en Bosch, Mercedes-Benz y Porsche piden Python para automatizar pruebas. Un proyecto que se pueda enseñar vale más que un curso terminado.', prueba: 'Un repositorio público de pruebas automatizadas en Python (pytest) sobre un sistema simulado, con README en inglés, antes de junio de 2027.', mant: { h: 1, txt: 'Una hora: un ejercicio de Python escrito sin IA y comparado después con lo que te propone la IA.' }, practica: 'Entrevistas (los temas de código y de Python)' },
    { id: 'ia', name: 'IA', full: 'IA & Automatización', icon: '🤖', val: 45, w: 1.3, cat: 'tecnico', porExamen: true, desc: 'Estás en 45, no en 30: validaste IA generativa para Google, usas Claude Code a diario en producción y armaste con agentes este sistema de apps. Lo que falta es lo que otro pueda comprobar: un certificado y una pieza de pruebas con IA que se pueda enseñar.', porQue: 'Es tu diferencial en el mercado al que vas: un ingeniero de validación que sabe probar sistemas con IA y usar IA para probar. El CT-GenAI tiene fecha —enero de 2027— y entra en tu CV para Esslingen y en cada aplicación a Werkstudent.', prueba: 'El ISTQB CT-GenAI aprobado en enero de 2027 y, después, un repositorio con pruebas generadas con IA y revisadas por ti.', mant: { h: 1, txt: 'Una hora: un experimento de IA en tu trabajo o en este sistema, anotado en una línea —qué probaste y qué salió—.' }, practica: 'Mis Metas (el simulacro del CT-GenAI) y Entrevistas (los temas de IA)' },
    { id: 'datos', name: 'Datos', full: 'Análisis de Datos', icon: '📊', val: 55, w: 1, cat: 'tecnico', desc: 'Estás en 55 y la evidencia lo sostiene: lees un problema de datos, analizas resultados de pruebas y armaste los tableros de este sistema. Te falta soltura en Python y pandas para no depender de Excel.', porQue: 'En validación cada prueba deja datos: quien los analiza en Python encuentra la falla antes que nadie. En la maestría y en la tesis lo vas a necesitar.', prueba: 'Un cuaderno de pandas con el análisis de tus gastos o de tus pruebas, publicado junto a tu proyecto de código (mayo de 2027).', mant: { h: 1, txt: 'Una hora: un módulo de Kaggle Learn con tus propios datos, no con los del ejemplo.' }, practica: 'Entrevistas (los temas de datos) y Finanzas (tus propios datos)' },
    { id: 'inversion', name: 'Inversión', full: 'Inversión en Mercados', icon: '📈', val: 25, w: 1, cat: 'finanzas', desc: 'Estás en 25: abriste CETES y compraste acciones y Bitcoin —que vendiste para pagar la tarjeta—. Sabes empezar; te falta el sistema: una asignación escrita y aportes automáticos.', porQue: 'Hoy el dinero de Alemania vive en GBM, en un fondo de deuda de corto plazo, porque se usa en meses, no en años. La inversión de largo plazo arranca con el sueldo de ingeniero (Fase 4): aprender ahora cuesta poco y te ahorra los errores caros de después.', prueba: 'Tu política de inversión en una página —asignación, aportes y qué haces si el mercado cae 30%— antes de tu primer sueldo en Alemania.', mant: { h: 0.5, txt: 'Media hora en el coche: un capítulo en audio de The Simple Path to Wealth o de Bogleheads.' }, practica: 'Qué invertir hoy y Finanzas' },
    { id: 'finanzas', name: 'Finanzas', full: 'Finanzas Personales', icon: '💰', val: 20, w: 1.5, cat: 'finanzas', desc: 'Estás en 20 por los hechos: septiembre cerró con la cuenta en $390 y la BBVA subió $9,100 en diez días. Lo que sí hiciste: liquidaste Banamex y pagas la BBVA completa. Lo que sube el número es un mes cerrado dentro del presupuesto.', porQue: 'Es la habilidad que decide si te vas en 2027: cada peso que se te va de más sale de GBM. No se estudia: se practica cada día con el tablero del Plan Maestro.', prueba: 'Tres meses seguidos —noviembre, diciembre y enero— con el ahorro mandado el día que entra la quincena y tu gasto personal dentro del tope.', mant: { h: 1, txt: 'Diez minutos al día: anota cada gasto en Finanzas y mira en el Plan Maestro lo que te queda. El 1 y el 15, el ahorro antes de gastar.' }, practica: 'Finanzas, el tablero del Plan Maestro y Qué invertir hoy' },
    { id: 'ingles', name: 'Inglés', full: 'Inglés / Idioma Global', icon: '🌐', val: 80, w: 1.3, cat: 'personal', desc: 'Estás en 80: tienes el IELTS en 6.0 (B2) y lees y escribes inglés técnico todos los días. El hueco está al hablar sin preparar —una entrevista, defender un proyecto—, que es justo lo que viene en la maestría y con el Werkstudent.', porQue: 'La maestría es en inglés y las entrevistas de Werkstudent y de trabajo en Stuttgart también. Pasar de 80 a 90 al hablar es la diferencia entre pasar una entrevista y quedarte en la lista de espera.', prueba: 'La solicitud a Esslingen en inglés —CV europeo y carta de motivación— enviada en enero de 2027, y dos simulacros de entrevista grabados.', mant: { h: 1, txt: 'Una hora: un simulacro de entrevista grabado de diez minutos. En el coche, repite frases en voz alta.' }, practica: 'Entrevistas (los simulacros) y la solicitud a Esslingen (Coach → Plan Maestro)' },
    { id: 'mente', name: 'Mentalidad', full: 'Mentalidad & Ejecución', icon: '🚀', val: 85, w: 1, cat: 'personal', desc: 'Estás en 85: tolerancia al riesgo alta y resiliencia probada —vendiste todo el Bitcoin para pagar la tarjeta y rehiciste el plan dos veces sin abandonarlo—. Lo que la baja son tus dos metas de conducta: el alcohol y el celular.', porQue: 'Mudarte solo a otro país a los 32 es de los cambios más fuertes: llegar con hábitos firmes y con herramientas es lo que te sostiene en el primer invierno.', prueba: 'La cadena de cero alcohol y del celular fuera del cuarto en Hábitos, y la revisión de cada domingo, escrita.', mant: { h: 0.5, txt: 'Media hora el domingo: la revisión de la semana por escrito —qué salió, qué no y qué cambias—.' }, practica: 'Hábitos, Mis Metas (alcohol y celular) y Salud' },
  ];

  /* El foco: una habilidad a la vez, con fechas, alineada al Plan Maestro ("una habilidad en foco
     a la vez; las demás, en mantenimiento"). Cada tramo dice cuántas horas a la semana, el paso de
     la semana, el entregable que lo demuestra y cuándo y por qué cambia el foco. El Dashboard
     recomienda el tramo de hoy; Adán puede abrir cualquier otra ruta. */
  const HAB_FOCO = [
    { id: 'ia', desde: '2026-10', hasta: '2027-01', horas: 4, semana: 'Dos sesiones del syllabus, martes y jueves, y el simulacro del viernes, con reloj: las tres en el bloque de la noche del Plan Maestro. El domingo es de Didi.', entregable: 'El ISTQB CT-GenAI aprobado.', cambio: 'Al presentar el CT-GenAI en enero, el foco pasa a Inglés: la solicitud a Esslingen, que cierra el 31 de marzo.' },
    { id: 'ingles', desde: '2027-02', hasta: '2027-03', horas: 4, semana: 'Un borrador de la carta de motivación y un simulacro de entrevista grabado.', entregable: 'La solicitud a Esslingen enviada, en inglés, antes del 31 de marzo.', cambio: 'Con la solicitud enviada, el foco pasa a Código: el proyecto para el Werkstudent.' },
    { id: 'codigo', desde: '2027-04', hasta: '2027-05', horas: 4, semana: 'Media hora diaria en tu proyecto, un commit por sesión.', entregable: 'Tu repositorio de pruebas en Python, público.', cambio: 'Con el proyecto publicado, el foco pasa a Networking: el Werkstudent se busca desde junio.' },
    { id: 'network', desde: '2027-06', hasta: '2027-08', horas: 2, semana: 'Cinco aplicaciones a Werkstudent y tres mensajes a tu red de Stuttgart.', entregable: 'Tres conversaciones en Stuttgart y tus aplicaciones enviadas.', cambio: 'En Alemania manda la maestría: el foco lo decide el semestre.' },
  ];
  /* ── EL PLAN MAESTRO ───────────────────────────────────────────────────────────────────────
     Las fases hacia $1,000,000 de patrimonio líquido, con la salida a Alemania en septiembre de
     2027 en medio: fechas ancla, título, meta, el porqué (`razones`) y el checklist de cada mes. Cada fase
     dice además lo que DEJA de hacerse (`deja`) y la prueba con la que cierra (`checkpoint`);
     `liquido` —el patrimonio que espera la trayectoria al cerrarla— NO se escribe aquí: lo pone
     la PROYECCION de abajo, mes a mes, y la última fase lleva el millón.

     Las tareas de fase son los HITOS; el detalle de la salida (documentos, ropa, salud, el BYD…)
     vive en SALIDA, más abajo. Los ids son el contrato con `coach_checks_v1[id]`: la Fase 0
     conserva sus `sN-M` y las demás llevan `aN-M`, nuevos para no heredar casillas de tareas que
     ya no existen.

     Coach pinta la Fase 0 como HTML escrito a mano y GENERA las demás desde aquí
     (`pintarFasesPlan()`), igual que el Dashboard: un solo texto para las dos apps.

     Fechas que no son de aquí y que las fases respetan: la Fase 3 arranca el
     `PROYECTO.maestriaInicio` y la decisión (`PROYECTO.maestriaDecision`) cae en la fase
     anterior — el control 9 de `verificar-sincronia.js` lo comprueba. La fecha del millón es el
     cierre de la última fase: el marcador `{{metaMillon}}`. */
  const PHASES = [
    {start:new Date(2026,7,1),end:new Date(2026,8,30),tag:"Fase 0",title:"Cerrar la fuga y arrancar ingreso, no solo pensar",meta:"Cerró el 30 sep 2026. ✅ Banamex liquidada el 13 ago 2026 (era meta de Fase 1, para ene 2027; volvió a tener saldo el 1 sep y quedó otra vez en $0 el 30 sep) y ✅ BBVA de $39,000 a $900 el 19 sep 2026 con la venta del Bitcoin. Lo que no cerró pasó a la Fase 1 con otro orden: la BBVA volvió a subir en diez días y ahora se paga quincena a quincena, y el fondo de emergencia son los CETES ({{fondo}}) más lo que entre a GBM: pasa de {{fondoMeta}} con la primera quincena que llegue ahí.",
     razones:[
      {tipo:"lema",d:"Fase 0 fue el arranque del plan: cerrar la fuga de dinero y sentar las bases."},
      {tipo:"logro",t:"Cumplió lo grande",foto:"fase-tarjeta-cortada",cifras:[{v:"$0",l:"Banamex, otra vez en cero el 30 sep 2026"},{v:"$900",l:"la BBVA el 19 sep 2026, desde $39,000"}],d:"Banamex quedó en $0 el 30 sep 2026 y la BBVA bajó de $39,000 a $900 el 19 sep, con la venta del Bitcoin."},
      {tipo:"riesgo",t:"Pero la tarjeta volvió a subir",foto:"fase-tarjeta",cifras:[{v:"10 días",l:"lo que tardó en volver a llenarse"}],d:"en diez días, porque mientras se pague con la quincena siguiente se vuelve a llenar."},
      {tipo:"paso",t:"Por eso la Fase 1 cambió el orden",foto:"fase-alcancia",cifras:[{v:"1 · BBVA",l:"quincena a quincena, sin intereses"},{v:"2 · GBM",l:"todo lo demás"}],d:"primero la BBVA, quincena a quincena y sin intereses; después, todo a GBM."},
      {tipo:"regla",t:"Dos decisiones, cerradas el 3 oct 2026",foto:"meta-esslingen",cifras:[{v:"Sep 2027",l:"la salida: terminó la pausa de la maestría"},{v:"1 negocio",l:"el de tu papá, en piloto automático"}],d:"la pausa de la maestría terminó —la salida es en septiembre de 2027— y la plantilla para comunidades de GBM salió del plan: hasta la Fase 4, el único negocio es el de tu papá, en piloto automático."},
     ],
     semanas:[
      {id:"s0-9",mes:"2026-08",txt:"Prioridad 1 — Fondo de emergencia a {{fondoMeta}}. Se quedó en los CETES ({{fondo}}): desde el 5 oct 2026 ya no recibe aporte aparte, y lo que le falta lo pone la primera quincena que llegue a GBM, después del {{bbvaCero}}."},
      {id:"s0-10",mes:"2026-08",txt:"Prioridad 2 — Liquidar las dos tarjetas. Banamex quedó en $0 el 30 sep 2026; la BBVA bajó a $900 el 19 sep con la venta del Bitcoin y volvió a subir: la Fase 1 la paga quincena a quincena, sin intereses."},
      {id:"s0-4",mes:"2026-08",txt:"Sube a Marketplace tus activos ociosos (PS5, control, monitores, iPad). Pasó a la Fase 1: se venden en noviembre y diciembre, y cada venta va a GBM."},
      {id:"s0-3",mes:"2026-08",txt:"Plantilla Finanzas.html para venderla en comunidades de GBM (Opción 1). Salió del plan el 3 oct 2026: hasta la Fase 4 no se abren frentes de negocio nuevos."},
      {id:"s0-2",mes:"2026-08",txt:"Revisar las fotos y el material del negocio de tu papá y ponerle atención real (Opción 5). Sigue en la Fase 1, en piloto automático: los posts y el dossier."},
      {id:"s0-6",mes:"2026-08",txt:"Pausa de un año a las aportaciones de la maestría. Se cerró el 3 oct 2026: te vas en septiembre de 2027 y todo el ahorro va a GBM."},
      {id:"s0-8",mes:"2026-08",txt:"Liquidar la TC Banamex. (✅ 13 ago 2026 — pagaste los $9,000 completos, no el mínimo, 5 meses antes de la meta)"},
      {id:"s0-1",mes:"2026-08",txt:"Corrige \"Deudas\" en Finanzas.html · cero MSI nuevo. (✅ 13 ago 2026: quedó en $8,200 = auto {{autoPago}} + mínimo BBVA {{tcBbvaMin}})"},
      {id:"s0-7",mes:"2026-09",txt:"Cada peso de ventas, en orden fijo: fondo de emergencia y después la BBVA. Desde el 5 oct 2026 la BBVA la pagan las quincenas y lo de Didi; las ventas de noviembre y diciembre van a GBM."},
    ]},
    {start:new Date(2026,9,1),end:new Date(2027,2,31),tag:"Fase 1",title:"Solicitud enviada y el ahorro en marcha",
     meta:"Al 31 mar 2027: <b>1)</b> la solicitud a {{maestriaEscuela}} enviada completa —el IELTS (6.0) y el pasaporte ya los tienes; faltan las dos cartas de recomendación, el CV y la carta de motivación—; <b>2)</b> el depa entregado a fin de enero y, desde febrero, en casa de tu familia; <b>3)</b> la BBVA en cero desde el {{bbvaCero}} y, desde ahí, lo que pagues con ella saldado en la misma quincena: ni un peso de interés; <b>4)</b> el ISTQB CT-GenAI aprobado; <b>5)</b> la fecha de salida decidida con el saldo de GBM: {{marzoParaSalida}} sostiene septiembre de 2027 —tu ritmo da {{alemaniaMarzo}} y la diferencia es el ingreso nuevo, {{extraSalida}} al mes desde noviembre—; con menos, te vas en septiembre de 2028, con todo pagado.",
     razones:[
      {tipo:"ruta",t:"Para irte en septiembre de 2027 todo converge en tres fechas",d:"el 31 mar 2027 cierra la solicitud de Esslingen; en junio, la cuenta bloqueada y la visa piden {{salidaJunio}}, y en agosto la salida completa —con la colegiatura del primer semestre, la reserva del BYD y el colchón— pide {{salidaAgosto}} en la cuenta.",
       hitos:[{f:"31 mar 2027",t:"Cierra la solicitud de Esslingen",s:"completa: CV, carta de motivación y las dos de recomendación",foto:"meta-esslingen"},
              {f:"Junio 2027",t:"La cuenta bloqueada y la visa",v:"{{salidaJunio}}",s:"en la cuenta a mediados de mes",foto:"de-dinero"},
              {f:"Agosto 2027",t:"La salida completa",v:"{{salidaAgosto}}",s:"con la colegiatura del 1er semestre, la reserva del BYD y el colchón",foto:"fase-avion"}]},
      {tipo:"paso",t:"Primero la BBVA",foto:"fase-tarjeta",cifras:[{v:"{{tcBbva}}",l:"lo que debes"},{v:"{{bbvaCero}}",l:"en cero, sin intereses"}],d:"debes {{tcBbva}} y no se paga de golpe. Lo que sobra de cada quincena y lo de Didi de cada lunes van a la tarjeta hasta dejarla en cero el {{bbvaCero}}, sin intereses: {{bbvaRuta}}."},
      {tipo:"paso",t:"Después, todo a GBM",foto:"fase-alcancia",cifras:[{v:"{{ahorroMesDepa}}",l:"al mes, hasta enero"},{v:"{{ahorroMesCasa}}",l:"al mes, desde febrero"}],d:"cada quincena se sostiene sola. Hasta enero mandas {{ahorroDia1}} el 1 y {{ahorroDia15}} el 15, más {{didiAhorro}} de Didi; desde febrero, sin renta y en casa de tu familia ({{aporteCasa}} de aporte, y comes en casa), {{ahorroDia1Casa}} el 1 y {{ahorroDia15Casa}} el 15, más {{didiAhorroMas}} de Didi. El aguinaldo paga el seguro del BYD y no entra."},
      {tipo:"riesgo",t:"Con ese ritmo",foto:"sk-inversion",cifras:[{v:"{{junioCorto}}",l:"en junio, para la cuenta bloqueada"},{v:"{{salidaVeredicto}}",l:"en agosto, para la salida completa"}],d:"en junio {{junioVeredicto}} y en agosto {{salidaVeredicto}}, aun mandando cada quincena completa y lo de Didi cada lunes."},
      {tipo:"palanca",t:"Lo cierra el ingreso, no el recorte",foto:"istqb-5",cifras:[{v:"{{recorteRutinas}}",l:"lo que dan tus rutinas al mes",tono:"gris"},{v:"+{{extraSalida}}",l:"de ingreso nuevo al mes, de noviembre a agosto"},{v:"{{marzoParaSalida}}",l:"en GBM el 31 de marzo, con él"}],d:"tus rutinas pueden dar {{recorteRutinas}} al mes y las ventas ya están contadas. Hacen falta unos {{extraSalida}} más al mes, de noviembre a agosto —un aumento, un puesto mejor pagado o freelance de pruebas en lugar de horas de Didi—, y con ellos GBM llega a {{marzoParaSalida}} el 31 de marzo."},
      {tipo:"planb",t:"Si no llega",foto:"fase-calendario",cifras:[{v:"Sep 2028",l:"la fecha que tu ahorro sí paga"},{v:"{{salida2028}}",l:"a la salida, con el mismo ahorro"}],d:"la fecha que tu ahorro sí paga es septiembre de 2028 (a la salida, {{salida2028}}), con el mismo ahorro de cada quincena."},
      {tipo:"regla",t:"Invertido, sí, pero sin jugarlo",foto:"fase-caja",d:"lo de la cuenta bloqueada se usa en menos de un año, así que en GBM va en un fondo de deuda de corto plazo, no en acciones: una caída de la bolsa en mayo no da tiempo de recuperarse."},
     ],
     deja:"Riesgo alto y súper alto en Qué invertir hoy: el dinero de Alemania vive en GBM, en un fondo de deuda de corto plazo, porque se usa en meses, no en años. Compras a meses. Gastar de la quincena antes de mandar el ahorro. Abonos extra al BYD: cada peso extra va a la salida. Nuevos frentes de negocio: el de tu papá se queda en piloto automático con los posts y el dossier. Y el depa: a fin de enero se entrega.",
     checkpoint:"31 mar 2027: solicitud enviada y GBM contra {{marzoParaSalida}}, lo que hace falta para pagar la salida completa en agosto si el ingreso nuevo sigue hasta allá. Si llega, sigue septiembre de 2027 y se decide el {{decisionMaestria}}. Si no, la salida se mueve a septiembre de 2028 —la solicitud se repite en noviembre, ya armada— y el ahorro sigue igual: no se viaja a medias ni con deuda.",
     // Lo que se repite cada mes de la fase, además de lo de toda la fase (`cont`): lo lee el plan de
     // cada mes (`planMes`). El día 1 y el 15 los dice el dinero del mes, con sus montos.
     mensual:[
      {id:"m1-1",cuando:"Cada lunes",txt:"Lo que apartas de Didi, el mismo lunes: a la BBVA mientras tenga saldo y, después, a GBM."},
      {id:"m1-2",cuando:"Cada semana",txt:"Las horas de tu foco de aprendizaje, en el bloque de la noche del Plan Maestro."},
      {id:"m1-3",cuando:"Cada día",txt:"Cada gasto anotado en Finanzas el mismo día; lo que pagues con tarjeta, con la tarjeta en la nota."},
      // Adán, 21-oct-2026: "no dejes de lado lo de publicar en LinkedIn o FB acerca de la empresa de mi papá de reparar
      // helicópteros y vender helicópteros a escala, esto es muy necesario porque si llega un cliente, nos ahorraremos mucho
      // tiempo y ganaremos mucho dinero". Los posts salen de la app Posts; el hábito «Posts del negocio de tu papá» los marca.
      {id:"m1-4",cuando:"Lunes, miércoles y viernes",txt:"Los posts del negocio de tu papá, sin falta. El de Aeroresinas —reparación de helicópteros— y el de Heliescala —helicópteros a escala—, listos en la app Posts: en LinkedIn y su versión corta en Facebook. Hasta enero los publicas tú, 20 min al llegar a {{empleador}}; desde febrero, tu papá, y tú revisas cada lunes que salieron. Cada uno cierra con el WhatsApp de su web: el cliente que llega ya sabe dónde escribir."},
     ],
     semanas:[
      {id:"a1-1",mes:"2026-10",txt:"Deja la BBVA en cero quincena a quincena. Lo que sobra de cada quincena y lo de Didi de cada lunes van a la tarjeta y no a GBM —{{bbvaRuta}}— y quedará en cero el {{bbvaCero}}. Desde ahí, lo que pagues con ella lo pagas en la misma quincena."},
      {id:"a1-2",mes:"2026-10",txt:"Abre tu cuenta de GBM para Alemania, aparte del día a día. En cuanto la BBVA quede en cero, lo que sobra de cada quincena va ahí el día que entra el sueldo —{{ahorroDia1}} el 1 y {{ahorroDia15}} el 15— y lo de Didi cada lunes, hasta juntar {{didiAhorro}} al mes."},
      {id:"a1-18",mes:"2026-10",txt:"Decide tu palanca de ingreso este mes. Septiembre de 2027 pide {{extraSalida}} más al mes desde noviembre, y la de ese tamaño es el sueldo: pide el aumento en {{empleador}} con números —lo que haces en Ford y el CT-GenAI que presentas en enero— o aplica a puestos que paguen más, remotos o en un Tier 1. Freelance de pruebas en lugar de horas de Didi también suma, después de revisar tu contrato. Cada peso, a GBM el día que entra."},
      {id:"a1-4",mes:"2026-10",txt:"Pide las dos cartas de recomendación. Un jefe de Bosch, Continental o ALTEN y un líder técnico o profesor: en inglés y firmadas."},
      {id:"a1-19",mes:"2026-10",txt:"Arranca hoy los posts del negocio de tu papá. La app Posts trae listo el de cada día de Aeroresinas y de Heliescala: publica el de hoy de las dos en LinkedIn y en Facebook, y sigue lunes, miércoles y viernes. Un cliente que llega por un post ya vio el trabajo y escribe directo al WhatsApp de la web: menos tiempo para cerrarlo."},
      {id:"a1-5",mes:"2026-11",txt:"La ventana de Esslingen abre el 4 nov. Arma la solicitud: CV europeo, carta de motivación, título y certificado del IPN."},
      {id:"a1-6",mes:"2026-11",txt:"Vende lo que no usas. PS5 y su control, monitores e iPad: cada venta, a GBM."},
      {id:"a1-7",mes:"2027-01",txt:"Presenta el ISTQB CT-GenAI en enero. Llega con el simulacro de Mis Metas en 34 de 46 o más, dos veces seguidas: el corte oficial es 30."},
      {id:"a1-9",mes:"2026-12",txt:"Las ventas, a GBM el día que cobras. El aguinaldo paga el seguro del BYD: no entra al plan."},
      {id:"a1-10",mes:"2027-02",txt:"Manda la solicitud completa a Esslingen en febrero, con el CT-GenAI ya en tu CV. No esperes a marzo: cierra el 31 y la respuesta llega antes de fin de mayo."},
      {id:"a1-11",mes:"2027-01",txt:"Entrega el depa a fin de mes y recupera el depósito. Lo que no te llevas a casa de tu familia —muebles, electrodomésticos, cocina— se vende: a GBM."},
      {id:"a1-16",mes:"2027-02",txt:"Arranca la vida en casa de tu familia. {{aporteCasa}} a la casa el día 1, {{ahorroDia1Casa}} a GBM ese mismo día y {{ahorroDia15Casa}} el 15; Didi sube a {{didiAhorroMas}} al mes y el ahorro llega a {{ahorroMesCasa}}."},
      {id:"a1-12",mes:"2027-03",txt:"Cierra la Fase 1 por escrito. Solicitud, saldo de GBM contra {{marzoParaSalida}}, BBVA e ISTQB, y la fecha de salida decidida."},
      {id:"a1-13",cont:true,txt:"Págate primero cada quincena. El ahorro sale el día que entra el sueldo, antes de gastar; lo que queda es tu gasto personal de esa quincena —lo que pagues con tarjeta, saldado en la misma quincena— y el tablero del Plan Maestro te dice cuánto te toca por día."},
      {id:"a1-14",cont:true,txt:"Alemán sin pausa en {{escuelaAleman}}. Esslingen pide A2 antes de terminar el 2º semestre: llega con la constancia."},
      {id:"a1-15",cont:true,txt:"Conducta primero: cero alcohol y el celular fuera del cuarto. Llegas a Alemania con la cadena hecha, no a empezarla allá."},
      {id:"a1-17",cont:true,txt:"Cierra el hueco de la salida, no solo el de junio. Con tu ritmo, en agosto {{salidaVeredicto}}: el ingreso nuevo, cada venta y lo que recortes —tus rutinas pueden dar {{recorteRutinas}} al mes— van a GBM el mismo día."},
    ]},
    {start:new Date(2027,3,1),end:new Date(2027,7,31),tag:"Fase 2",title:"Admisión, visa y salida",
     meta:"Al 31 ago 2027: <b>1)</b> la admisión de {{maestriaEscuela}}; <b>2)</b> la cuenta bloqueada llena ({{sperrkonto}}) y la visa de estudiante en el pasaporte; <b>3)</b> cuarto en Esslingen con contrato; <b>4)</b> el {{auto}} rentado con contrato, seguro para plataformas, GPS y tu papá como administrador; <b>5)</b> la salud lista: chequeo, dentista, lentes y medicamentos; <b>6)</b> {{empleador}} cerrado con constancia laboral y carta de recomendación.",
     razones:[
      {tipo:"ruta",une:"→",t:"Cinco meses con un orden que no se salta",d:"admisión → cuenta bloqueada → visa (mínimo de 6 a 8 semanas) → vuelo.",
       hitos:[{t:"La admisión",s:"la respuesta de Esslingen llega antes de fin de mayo",foto:"meta-esslingen"},
              {t:"La cuenta bloqueada",v:"{{sperrkontoEur}}",s:"{{sperrkonto}} al euro del plan",foto:"de-dinero"},
              {t:"La visa",v:"6 a 8 semanas",s:"como mínimo, con la cuenta ya llena",foto:"fase-visa"},
              {t:"El vuelo",s:"para empezar el {{maestriaInicio}}",foto:"fase-avion"}]},
      {tipo:"paso",t:"El ahorro sigue",foto:"fase-alcancia",cifras:[{v:"{{ahorroMesCasa}}",l:"al mes, más el ingreso nuevo"}],d:"a {{ahorroMesCasa}} al mes, más el ingreso nuevo; en agosto, la mitad de Didi, que es de empacar."},
      {tipo:"riesgo",t:"La cuenta bloqueada es el punto más apretado",foto:"sk-inversion",cifras:[{v:"{{junioCorto}}",l:"en junio, con tu ritmo"},{v:"{{salidaVeredicto}}",l:"en agosto, para irte completo"}],d:"pide {{sperrkontoEur}} ({{sperrkonto}} al euro del plan). Con tu ritmo, en junio {{junioVeredicto}}, y en agosto, para irte con la colegiatura del primer semestre, la reserva del BYD y el colchón, {{salidaVeredicto}}."},
      {tipo:"palanca",t:"Con el ingreso nuevo alcanza para las dos",foto:"meta-salida",cifras:[{v:"{{mayoParaSalida}}",l:"en GBM el {{decisionMaestria}}, el día de decidir"}],d:"el {{decisionMaestria}} GBM tiene {{mayoParaSalida}}, que llenan la cuenta bloqueada en junio y pagan la salida completa en agosto."},
      {tipo:"paso",t:"El auto no se vende",foto:"fase-auto",cifras:[{v:"{{bydRenta}}",l:"al mes, rentado y neto"},{v:"{{autoPago}}",l:"su mensualidad"}],d:"es tu respaldo para trabajar Didi si regresas sin empleo. Mientras estás fuera se renta a un conductor de plataforma: las flotillas cobran de $3,600 a $4,500 a la semana por un Dolphin Mini; un particular, unos $3,000, y ya con seguro, GPS y semanas vacías deja unos {{bydRenta}} al mes, que pagan sus {{autoPago}}."},
     ],
     deja:"Viajes y compras que no estén en la lista de salida. Y nada sin papel: cuarto y auto, con contrato.",
     checkpoint:"{{decisionMaestria}}, el día de decidir: la admisión en la mano y {{mayoParaSalida}} en GBM —lo que llena la cuenta bloqueada en junio y deja pagada la salida completa en agosto—. Si están las dos, te vas. Sin admisión, se reaplica para septiembre de 2028; sin el dinero, la salida se mueve un año y el ahorro sigue. No se viaja a medias ni con deuda.",
     mensual:[
      {id:"m2-1",cuando:"Cada semana",txt:"Las horas de tu foco de aprendizaje y alemán sin pausa: llegas a Esslingen con el A2 y rumbo al B1."},
      {id:"m2-2",cuando:"Cada día",txt:"Cada gasto anotado en Finanzas el mismo día, y nada que no esté en la lista de salida."},
      {id:"m2-3",cuando:"Cada lunes",txt:"Los posts del negocio de tu papá siguen saliendo. Los publica él con la app Posts —Aeroresinas y Heliescala, en LinkedIn y en Facebook—; tú revisas que salieron los de la semana y contestas ese mismo día lo que llegue."},
     ],
     semanas:[
      {id:"a2-1",mes:"2027-04",txt:"Declaración anual. Con tus deducciones; si sale saldo a favor, a GBM."},
      {id:"a2-2",mes:"2027-04",txt:"Goethe-Zertifikat A2 (o telc A2) en México. El requisito de alemán de Esslingen queda cumplido desde el primer día."},
      {id:"a2-3",mes:"2027-05",txt:"Chequeo médico, dentista y lentes. Todo lo pendiente se arregla aquí; la receta de lo que tomes, en inglés y con el genérico."},
      {id:"a2-4",mes:"2027-05",txt:"La respuesta de Esslingen, antes de fin de mayo. Si es sí: acepta el lugar, pide la carta de admisión y solicita cuarto en el Studierendenwerk Stuttgart ese día."},
      {id:"a2-5",mes:"2027-06",txt:"Cuenta bloqueada llena. Expatrio, Fintiba o Coracle: con la confirmación se completa el expediente de visa."},
      {id:"a2-6",mes:"2027-06",txt:"Cita de visa con BLS. Dos juegos de todo: formularios, fotos biométricas, pasaporte, admisión, cuenta bloqueada, seguro de viaje e IELTS. Visa €75 + BLS €39.90."},
      {id:"a2-7",mes:"2027-06",txt:"Aplica a Werkstudent desde México. Bosch, Mercedes-Benz, Porsche y sus proveedores: 20 h a la semana pagan unos €1,200 brutos al mes, {{werkstudentEur}} netos."},
      {id:"a2-8",mes:"2027-07",txt:"Renta el BYD con contrato. Seguro para plataformas, GPS con paro de motor, depósito y pago semanal por adelantado; tu papá lo administra."},
      {id:"a2-9",mes:"2027-07",txt:"Compra el vuelo y el seguro de viaje. Salida a fines de agosto; el seguro cubre los primeros 3 meses, como pide la visa."},
      {id:"a2-10",mes:"2027-08",txt:"Renuncia en {{empleador}} con el aviso que pida tu contrato. Constancia laboral y carta de recomendación en inglés; el plan no cuenta finiquito."},
      {id:"a2-11",mes:"2027-08",txt:"Cierra México. BBVA en $0, iPhone domiciliado, tu número en un plan barato, poder notarial a tu papá y respaldos en la nube."},
      {id:"a2-12",mes:"2027-08",txt:"Dos maletas. Los documentos originales en la de mano; la ropa gruesa de invierno, mejor allá en octubre."},
      {id:"a2-13",cont:true,txt:"GBM va primero. {{ahorroDia1Casa}} el 1, {{ahorroDia15Casa}} el 15, lo de Didi y el ingreso nuevo van antes que cualquier gasto: el {{decisionMaestria}} tiene que haber {{mayoParaSalida}}."},
      {id:"a2-14",cont:true,txt:"Terapia antes de irte. Llegas con herramientas y con tu red armada: mexicanos en Stuttgart, los líderes de Bosch que conoces y el buddy de la Hochschule."},
    ]},
    {start:new Date(2027,8,1),end:new Date(2029,1,28),tag:"Fase 3",title:"Esslingen: la maestría que cambia tu sueldo",
     meta:"Al 28 feb 2029: <b>1)</b> el M.Eng. terminado —tres semestres y la tesis en una empresa—; <b>2)</b> Werkstudent desde el segundo o tercer mes, 20 h a la semana; <b>3)</b> alemán A2 certificado antes de terminar el 2º semestre y B1 al final; <b>4)</b> una oferta de trabajo firmada antes de entregar la tesis; <b>5)</b> cero deuda nueva.",
     razones:[
      {tipo:"lema",d:"Es la fase en que menos sube el patrimonio, y es a propósito: el fondo compra la palanca más grande del plan."},
      {tipo:"ruta",une:"+",t:"Las cuentas cierran solo con dos supuestos",d:"que el Werkstudent llegue pronto —sin él, el dinero no alcanza para las tres colegiaturas— y que el BYD siga rentado.",
       hitos:[{t:"El Werkstudent, pronto",v:"{{werkstudentEur}}",s:"netos al mes por 20 h a la semana, desde el tercer mes",foto:"de-f-trabajo"},
              {t:"El BYD, rentado",v:"{{bydRenta}}",s:"netos al mes, que pagan su mensualidad",foto:"fase-auto"}]},
      {tipo:"paso",t:"Con los dos, la maestría cuesta casi solo las colegiaturas",foto:"meta-salida",cifras:[{v:"3 × {{colegiaturaEur}}",l:"en tres semestres"}],d:"tres de {{colegiaturaEur}}, una por semestre: la primera va en la salida y las otras dos, en marzo y septiembre de 2028."},
      {tipo:"palanca",t:"Al graduarte",foto:"fase-graduacion",cifras:[{v:"18 meses",l:"de permiso para buscar trabajo"}],d:"el permiso de residencia deja buscar trabajo hasta 18 meses, pero la meta es no necesitarlo: oferta firmada antes de entregar la tesis."},
     ],
     deja:"Gastos fuera del presupuesto en euros, viajes que no paga el Werkstudent y cualquier deuda alemana: ni tarjeta a meses ni préstamo.",
     checkpoint:"Al cerrar el 1er semestre (feb 2028): sin Werkstudent, el plan se ajusta ese mes —más horas en vacaciones, un HiWi en la universidad (no cuenta en el tope de 140 días) o recortar— antes de que el dinero llegue a seis meses de gasto. Sin oferta en enero de 2029, la búsqueda se vuelve de tiempo completo.",
     mensual:[
      {id:"m3-1",cuando:"Cada mes",txt:"Tu presupuesto en euros: la vida en Esslingen dentro de lo previsto en el dinero del mes; si algo se pasa, se recorta antes de tocar el fondo."},
      {id:"m3-2",cuando:"Cada semana",txt:"El Werkstudent hasta 20 horas en semestre —el tope es de 140 días al año— y una sesión de alemán o Tandem."},
      {id:"m3-3",cuando:"Cada mes",txt:"Cuántos meses de gasto quedan en el fondo: si bajan de seis, el plan se ajusta ese mismo mes."},
      {id:"m3-4",cuando:"Cada lunes",txt:"Los posts del negocio de tu papá, también desde Esslingen. Él los publica con la app Posts —Aeroresinas y Heliescala, en LinkedIn y en Facebook—; tú revisas que salieron los de la semana y le ayudas a contestar lo que llegue."},
     ],
     semanas:[
      {id:"a3-1",mes:"2027-09",txt:"Las primeras dos semanas. Anmeldung (obligatoria en 14 días), inscripción, cuenta, seguro y SIM; después, el permiso de residencia."},
      {id:"a3-2",mes:"2027-09",txt:"Presupuesto en euros. €1,050 al mes: renta, comida, seguro y transporte; lo que pase de ahí se recorta antes de tocar el fondo."},
      {id:"a3-12",mes:"2027-09",txt:"Pide la exención de colegiatura por talento. Del 1 al 30 de septiembre, con CV, calificaciones y la carta de admisión: si sale, son €1,500 menos cada semestre."},
      {id:"a3-3",mes:"2027-10",txt:"Werkstudent. Si no lo cerraste desde México, este mes: con seis años de HIL y testing eres el perfil que buscan."},
      {id:"a3-4",mes:"2028-02",txt:"Pausa entre semestres: Praktikum o más horas. Cuentan en el tope de 140 días al año; los empleos de la universidad (HiWi) no."},
      {id:"a3-5",mes:"2028-03",txt:"Segunda colegiatura (€1,900) y el A2 certificado, si no lo trajiste. Esslingen lo pide antes de cerrar el 2º semestre."},
      {id:"a3-6",mes:"2028-09",txt:"Tercera colegiatura y tesis en empresa. Validación, ADAS o HIL dentro de una empresa: de ahí salen las ofertas."},
      {id:"a3-7",mes:"2028-11",txt:"Busca empleo con el título por salir. Aplicaciones desde noviembre: la meta es la oferta antes de entregar la tesis."},
      {id:"a3-8",mes:"2029-02",txt:"Cierra la Fase 3 por escrito. Título, oferta, cuánto quedó del fondo y dónde vas a vivir."},
      {id:"a3-9",cont:true,txt:"El BYD rentado, cada mes. Tu papá confirma el pago semanal; si un mes se queda sin rentar, la reserva paga la mensualidad."},
      {id:"a3-10",cont:true,txt:"Activa la red de Bosch en Stuttgart. Los líderes con los que trabajaste en tu asignación: el atajo a Werkstudent, tesis y empleo."},
      {id:"a3-11",cont:true,txt:"Salud en el invierno. Luz del día, vitamina D, el deporte de la Hochschule y llamadas fijas con tu familia."},
    ]},
    {start:new Date(2029,2,1),end:new Date(2031,11,31),tag:"Fase 4",title:"El millón líquido con sueldo de ingeniero",
     meta:"<b>$1,000,000</b> de patrimonio líquido al {{metaMillon}}, con el sueldo del título nuevo. La proyección llega en {{mesMillon}}; el crédito del auto, pagado con su propia renta, termina hacia mediados de 2031.",
     razones:[
      {tipo:"lema",d:"Con el título y un puesto de ingeniero —en Alemania o remoto en euros— el ahorro del mes es el más alto de todo el plan."},
      {tipo:"paso",t:"Págate primero",foto:"fase-alcancia",cifras:[{v:"30%",l:"del neto, a la inversión el día de pago"}],d:"es la regla de la Fase 1, con el 30% del neto a la inversión el día que entra el sueldo y antes de gastar."},
      {tipo:"regla",t:"El millón, para el largo plazo",foto:"sk-datos",d:"se invierte en fondos indexados globales con comisión baja, no en apuestas."},
      {tipo:"ruta",t:"Las metas que esperaron su turno se pagan de contado",d:"cuando el patrimonio vaya en su trayectoria. Primero Tailandia, con las vacaciones de un contrato alemán (de 25 a 30 días en uno típico); después Hong Kong, y al cerrar el plan, el Cupra y el depa.",
       hitos:[{f:"Abr 2030",t:"Tailandia",s:"con las vacaciones de un contrato alemán: de 25 a 30 días",foto:"fase-tailandia"},
              {f:"2031",t:"Hong Kong",s:"si el corte de 2030 va en la proyección",foto:"fase-hongkong"},
              {t:"El Cupra",s:"al cerrar el plan, con el millón",foto:"fase-cupra"},
              {t:"El depa",s:"al cerrar el plan, en su orden",foto:"fase-depa"}]},
     ],
     deja:"Subir el nivel de vida al ritmo del sueldo nuevo: cada aumento va primero al ahorro. Y ningún premio a crédito.",
     checkpoint:"Cada diciembre, el patrimonio líquido contra la proyección. Dos cortes seguidos por debajo: se ajusta el porcentaje de ahorro o la fecha, sin abandonar la meta.",
     mensual:[
      {id:"m4-1",cuando:"El día de pago",txt:"El 30 % del neto a la inversión el mismo día —el ETF-Sparplan—, antes de gastar."},
      {id:"m4-2",cuando:"Cada mes",txt:"Tu gasto dentro de lo previsto en el dinero del mes y el patrimonio líquido contra la proyección."},
      {id:"m4-3",cuando:"Cada lunes",txt:"Los posts del negocio de tu papá siguen saliendo. Revisa con él los de la semana y lo que llegó: un cliente de Aeroresinas o de Heliescala se contesta el mismo día."},
     ],
     semanas:[
      {id:"a4-1",mes:"2029-03",txt:"Automatiza el ahorro el día de pago. 30% del neto a la inversión el mismo día; súbelo con cada aumento."},
      {id:"a4-2",mes:"2029-06",txt:"Portafolio de largo plazo. Fondos indexados globales con comisión baja (en Alemania, un ETF-Sparplan); acciones sueltas, no más del 10%."},
      {id:"a4-3",mes:"2029-12",txt:"Primer corte de diciembre. Patrimonio líquido contra la proyección del Plan Maestro, en Coach."},
      {id:"a4-4",mes:"2030-04",txt:"Tailandia, de contado. Abril es temporada seca: el campamento de Mis Metas, con las vacaciones de tu contrato."},
      {id:"a4-5",mes:"2030-12",txt:"Segundo corte de diciembre. Si vas en la proyección, Hong Kong en 2031, de contado."},
      {id:"a4-6",mes:"2031-06",txt:"Termina el crédito del BYD. Desde ahí la renta del auto es ingreso entero, o el auto vuelve a ser tuyo si regresas."},
      {id:"a4-7",mes:"2031-12",txt:"El millón líquido. Cierra el Plan Maestro y arma el siguiente: el depa y el Cupra en su orden."},
      {id:"a4-8",cont:true,txt:"Cada aumento, primero al ahorro. El nivel de vida sube después que el patrimonio, no antes."},
    ]},
  ];
  // «Por qué esta fase», en bloques (`razones`) que el Dashboard pinta como tarjetas: `lema` (la
  // frase que manda), `ruta` (sus `hitos` con fecha, cifra y foto; `une` dice si van en orden →
  // o si son condiciones +), `paso`, `riesgo`, `palanca`, `planb`, `regla` y `logro`, cada uno con
  // su título `t`, sus `cifras` grandes y su frase `d`. La `foto` es un archivo de
  // Dashboard/fotos-aprende. Unidos en orden dan el párrafo `explica`, que leen Coach y el título
  // de cada fase en la ruta del Plan Maestro: un solo texto para las dos apps.
  PHASES.forEach(function (f) {
    if (f.razones) f.explica = f.razones.map(function (b) { return b.t ? b.t + ': ' + b.d : b.d; }).join(' ');
  });

  /* ── LA SALIDA A ALEMANIA ──────────────────────────────────────────────────────────────────
     Adán, 3-oct-2026: "contempla que me quiero ir en sep del 2027 a Alemania, contempla todo lo
     que debo reunir hasta esa fecha: documentos, ropa necesaria, herramientas necesarias, salud
     física, salud mental, etc. Tú eres mi coach y debes guiarme exhaustivamente al éxito". Y: "el
     byd no lo venderé… lo rentaré a alguna persona".

     `costos`: lo que cuesta irse, en el mes en que se paga, en pesos (`mxn`) o en euros (`eur`, al
     `PROYECTO.eurMxn` del plan). `gasta:false` = el dinero se mueve pero sigue siendo suyo (la
     cuenta bloqueada, la reserva del BYD, el colchón): cuenta para juntar, no baja el patrimonio.
     Fuentes, revisadas el 3-oct-2026: cuenta bloqueada €11,904 al año (Auswärtiges Amt, 2026);
     Esslingen: solicitud del 4 nov al 31 mar, respuesta antes de fin de mayo, arranque en
     septiembre, €1,500 por semestre para no europeos, A2 de alemán antes de cerrar el 2º semestre,
     CV y dos recomendaciones (hs-esslingen.de); visa €75 + BLS €39.90, mínimo 6 a 8 semanas
     (blsinternational.com). El IELTS (6.0) y el pasaporte ya los tiene (Adán, 3-oct-2026). Lo demás son
     estimaciones y lo dicen.

     `bloques`: la lista exhaustiva, por tema. `cuando` es el mes (AAAA-MM) o 'cont' (toda la
     preparación); los ids `sa-*` son el contrato con `coach_checks_v1`. Coach la pinta
     (`pintarSalida()`); las tareas de fase son solo los hitos. */
  const SALIDA = {
    costos: [
      {id:'apostillas',  mes:'2026-12', mxn:6000,  gasta:true,  txt:'Apostillas y traducciones: título, certificado y acta (estimado)'},
      {id:'goethe',      mes:'2027-04', mxn:3600,  gasta:true,  txt:'Examen A2 de alemán, Goethe o telc (estimado)'},
      {id:'salud',       mes:'2027-05', mxn:8000,  gasta:true,  txt:'Chequeo, dentista, lentes y medicamentos para 3 meses (estimado)'},
      {id:'bloqueada',   mes:'2027-06', eur:11904, gasta:false, txt:'Cuenta bloqueada: €11,904, el monto de 2026'},
      {id:'apertura',    mes:'2027-06', eur:100,   gasta:true,  txt:'Apertura de la cuenta bloqueada (estimado)'},
      {id:'visa',        mes:'2027-06', mxn:2394,  gasta:true,  txt:'Visa (€75 = $1,600) y servicio de BLS (€39.90 = $794)'},
      {id:'seguroViaje', mes:'2027-07', mxn:2500,  gasta:true,  txt:'Seguro de viaje de los primeros 3 meses, lo pide la visa (estimado)'},
      {id:'vuelo',       mes:'2027-07', mxn:20000, gasta:true,  txt:'Vuelo CDMX → Stuttgart, solo ida (estimado)'},
      {id:'ropa',        mes:'2027-08', mxn:8000,  gasta:true,  txt:'Ropa de invierno y equipo (estimado)'},
      {id:'reservaByd',  mes:'2027-08', mxn:13400, gasta:false, txt:'Reserva del BYD: dos mensualidades en CETES'},
      {id:'vivienda',    mes:'2027-08', eur:1000,  gasta:true,  txt:'Depósito y primera renta en Esslingen (estimado)'},
      {id:'colegiatura', mes:'2027-09', eur:1900,  gasta:true,  txt:'Colegiatura (€1,500) y cuotas del 1er semestre'},
      {id:'colchon',     mes:'2027-09', eur:1000,  gasta:false, txt:'Colchón de llegada, fuera de la cuenta bloqueada'},
    ],
    // Lo que tiene que estar en la cuenta a mediados de junio: la cuenta bloqueada y la visa.
    junio: ['bloqueada', 'apertura', 'visa'],
    bloques: [
      {id:'admision', ico:'🎓', titulo:'Admisión en Esslingen', items:[
        {id:'sa-adm-1',  cuando:'2026-10', txt:'Lee los requisitos exactos en el portal de la Esslingen Graduate School (Automotive Systems): idioma, documentos y formato. La ventana abre el 4 nov.'},
        {id:'sa-adm-2',  cuando:'2026-10', txt:'IELTS 6.0 ✅. Revisa la fecha de tu resultado: vale dos años y tiene que seguir vigente al mandar la solicitud (enero) y en la cita de visa (junio).'},
        {id:'sa-adm-3',  cuando:'2026-10', txt:'Pide las dos cartas de recomendación: un jefe de Bosch, Continental o ALTEN y un líder técnico o profesor. En inglés, firmadas y con datos de contacto.'},
        {id:'sa-adm-4',  cuando:'2026-11', txt:'CV en inglés y formato europeo, dos páginas: Ford, Continental, Bosch, Google, ALTEN, el ISTQB y lo que construyes con IA.'},
        {id:'sa-adm-5',  cuando:'2026-11', txt:'Carta de motivación: por qué Automotive Systems en Esslingen, qué traes (seis años de validación y HIL) y qué quieres después (Bosch, Mercedes-Benz, Porsche).'},
        {id:'sa-adm-6',  cuando:'2026-11', txt:'Pide al IPN el título, el certificado total de estudios con promedio y, si lo dan, una constancia de tu lugar en la generación.'},
        {id:'sa-adm-7',  cuando:'2026-12', txt:'Apostilla el título y el certificado —son documentos federales: los apostilla Gobernación— y tradúcelos al inglés con perito si el portal los pide traducidos.'},
        {id:'sa-adm-9',  cuando:'2027-01', txt:'Manda la solicitud completa en el portal de la Graduate School. En enero, no en marzo: cierra el 31 mar.'},
        {id:'sa-adm-10', cuando:'2027-05', txt:'La respuesta llega antes de fin de mayo: si es sí, acepta el lugar ese mismo día y pide la carta de admisión para la visa.'},
      ]},
      {id:'visa', ico:'🛂', titulo:'Visa y papeles alemanes', items:[
        {id:'sa-visa-1', cuando:'2026-10', txt:'Pasaporte ✅. Revisa que su vigencia cubra hasta 2029 y que le queden dos hojas libres: la visa pide al menos un año de vigencia.'},
        {id:'sa-visa-2', cuando:'2027-05', txt:'En cuanto llegue la admisión, abre la cuenta bloqueada (Expatrio, Fintiba o Coracle): €11,904, el monto de 2026. Va atado al BAföG, que tiene una subida anunciada para 2027: revisa el vigente en mayo.'},
        {id:'sa-visa-3', cuando:'2027-05', txt:'Agenda la cita de visa nacional de estudiante con BLS (Embajada de Alemania, CDMX): el trámite tarda mínimo de 6 a 8 semanas.'},
        {id:'sa-visa-4', cuando:'2027-06', txt:'Expediente en dos juegos: formularios firmados, 2 fotos biométricas, pasaporte y copias, admisión, cuenta bloqueada, seguro de viaje e IELTS. Visa €75 ($1,600) y BLS €39.90 ($794).'},
        {id:'sa-visa-5', cuando:'2027-07', txt:'Seguro médico alemán: a los 32 ya no aplica la tarifa de estudiante del seguro público (es hasta los 30). Compara el público voluntario (~€135 al mes) con uno privado para estudiantes (~€100) antes de inscribirte.'},
        {id:'sa-visa-6', cuando:'2027-08', txt:'Al recoger la visa, revisa nombre, fechas y tipo antes de salir de la embajada.'},
        {id:'sa-visa-7', cuando:'2027-09', txt:'Allá: Anmeldung en 14 días, inscripción en la Hochschule y permiso de residencia en la Ausländerbehörde antes de que venza la visa.'},
      ]},
      {id:'dinero', ico:'💶', titulo:'Dinero', items:[
        {id:'sa-din-1', cuando:'2026-10', txt:'Abre tu cuenta de GBM para Alemania, aparte del día a día: el ahorro se va ahí el día que entra la quincena, en cuanto la BBVA quede en cero.'},
        {id:'sa-din-2', cuando:'2026-10', txt:'Págate primero, cada quincena: {{ahorroDia1}} el 1 y {{ahorroDia15}} el 15 —a la BBVA hasta el {{bbvaCero}}, después a GBM— y lo de Didi cada lunes. Lo que queda es tu gasto personal de esa quincena, {{gastoPersonalDepa}} al mes, y lo que pagues con tarjeta se paga en la misma quincena.'},
        {id:'sa-din-3', cuando:'2026-11', txt:'Vende lo que no usas: PS5 y su control, monitores, iPad y lo que no hayas tocado en tres meses.'},
        {id:'sa-din-4', cuando:'2026-12', txt:'El aguinaldo paga el seguro del BYD: no entra al plan.'},
        {id:'sa-din-5', cuando:'2027-01', txt:'Entrega el depa a fin de enero y recupera el depósito. Lo que no te llevas a casa de tu familia —muebles, electrodomésticos, cocina— se vende: a GBM.'},
        {id:'sa-din-10', cuando:'2027-02', txt:'En casa de tu familia: {{aporteCasa}} el día 1 y comes en casa. Lo de la renta se vuelve ahorro: {{ahorroDia1Casa}} el 1 y {{ahorroDia15Casa}} el 15 a GBM, más {{didiAhorroMas}} de Didi al mes.'},
        {id:'sa-din-6', cuando:'2027-06', txt:'Junio: {{salidaJunio}} en la cuenta, para la cuenta bloqueada y la visa. Es el punto más apretado del plan.'},
        {id:'sa-din-11', cuando:'2027-08', txt:'Agosto: {{salidaAgosto}} entre la cuenta bloqueada y GBM, para irte completo —la cuenta bloqueada, la colegiatura del primer semestre, la reserva del BYD y el colchón de llegada—.'},
        {id:'sa-din-7', cuando:'2027-08', txt:'Tarjeta sin comisión en el extranjero (Wise o Revolut), y la BBVA en $0 con el pago domiciliado, o cancelada.'},
        {id:'sa-din-8', cuando:'2027-08', txt:'iPhone de AT&T: domicilia lo que quede o liquídalo antes de irte.'},
        {id:'sa-din-9', cuando:'2027-07', txt:'Con un contador: el aviso al SAT si dejas de ser residente fiscal en México y cómo se declara la renta del BYD. Antes de firmar el contrato del auto.'},
      ]},
      {id:'byd', ico:'🚗', titulo:'El BYD se queda y se renta', items:[
        {id:'sa-byd-1', cuando:'2027-05', txt:'Revisa el contrato del crédito y la póliza: que permitan rentarlo y usarlo en plataformas.'},
        {id:'sa-byd-2', cuando:'2027-06', txt:'Decide cómo: rentarlo tú a un conductor (un particular cobra unos $3,000 a la semana; las flotillas, de $3,600 a $4,500 por un Dolphin Mini) o dejarlo con una flotilla que lo administre.'},
        {id:'sa-byd-3', cuando:'2027-07', txt:'Seguro para plataformas —el normal no cubre si maneja para Didi o Uber— y GPS con paro de motor.'},
        {id:'sa-byd-4', cuando:'2027-07', txt:'Contrato por escrito: depósito, pago semanal por adelantado, kilometraje, mantenimiento, multas y qué pasa si no paga.'},
        {id:'sa-byd-5', cuando:'2027-08', txt:'Tu papá administra: poder notarial para trámites y la cuenta donde entra la renta y sale la mensualidad de {{autoPago}}.'},
        {id:'sa-byd-6', cuando:'2027-08', txt:'Reserva de dos mensualidades en CETES por si un mes se queda sin rentar.'},
      ]},
      {id:'fisica', ico:'🩺', titulo:'Salud física', items:[
        {id:'sa-sal-1', cuando:'2026-11', txt:'Chequeo general con análisis (biometría hemática, química sanguínea y lípidos): tu línea base antes del cambio.'},
        {id:'sa-sal-2', cuando:'2027-03', txt:'Dentista: limpieza y todo lo pendiente, aquí. Allá es caro y las citas tardan.'},
        {id:'sa-sal-3', cuando:'2027-05', txt:'Oftalmólogo: graduación nueva y lentes de repuesto.'},
        {id:'sa-sal-4', cuando:'2027-06', txt:'Cartilla de vacunación al día (tétanos, sarampión, hepatitis), con una copia en inglés.'},
        {id:'sa-sal-5', cuando:'2027-07', txt:'Medicamentos que tomes: receta en inglés con el nombre genérico y tres meses de reserva.'},
        {id:'sa-sal-6', cuando:'cont',    txt:'Gym seis días y tu primer Hyrox —{{hyroxSede}}, el {{hyroxFecha}}—: llegas en forma. Allá, el deporte universitario (Hochschulsport) es barato.'},
        {id:'sa-sal-7', cuando:'cont',    txt:'Proteína como hasta hoy ({{proteinaMeta}} g al día): cambiar de país no es razón para perder lo ganado.'},
      ]},
      {id:'mental', ico:'🧠', titulo:'Salud mental', items:[
        {id:'sa-men-1', cuando:'2026-11', txt:'Empieza terapia aquí, no allá: mudarte solo a otro país a los 32 es de los cambios más fuertes. Llega con herramientas.'},
        {id:'sa-men-2', cuando:'cont',    txt:'Cero alcohol también en Alemania: la cerveza es parte de la vida social; ten lista tu respuesta y tu bebida.'},
        {id:'sa-men-3', cuando:'2027-07', txt:'Tu red antes de llegar: mexicanos en Stuttgart, los líderes de Bosch que conoces y el programa de buddies de la Hochschule.'},
        {id:'sa-men-4', cuando:'2027-08', txt:'Llamadas fijas con tu familia, con día y hora: lo que se agenda pasa.'},
        {id:'sa-men-5', cuando:'2027-10', txt:'Invierno: en diciembre hay unas 8 horas de luz. Rutina fija, ejercicio diario, luz del día y revisa tu vitamina D.'},
        {id:'sa-men-6', cuando:'cont',    txt:'Si te sientes mal: la asesoría psicológica del Studierendenwerk es gratis para estudiantes, y la Telefonseelsorge (0800 111 0 111) atiende las 24 horas.'},
      ]},
      {id:'ropa', ico:'🧥', titulo:'Ropa para el invierno alemán', items:[
        {id:'sa-ropa-1', cuando:'2027-10', txt:'Chamarra de invierno impermeable, para −10 °C: cómprala allá en octubre (Decathlon, TK Maxx), no la cargues.'},
        {id:'sa-ropa-2', cuando:'2027-10', txt:'Botas impermeables con suela antiderrapante: hay nieve y hielo de diciembre a febrero.'},
        {id:'sa-ropa-3', cuando:'2027-08', txt:'Dos juegos de ropa térmica, guantes, gorro y bufanda: aquí son baratos.'},
        {id:'sa-ropa-4', cuando:'2027-08', txt:'Un saco y una camisa para entrevistas de Werkstudent y de empleo.'},
        {id:'sa-ropa-5', cuando:'2027-08', txt:'Ropa de gym y para correr con frío: térmicos y rompevientos.'},
        {id:'sa-ropa-6', cuando:'2027-08', txt:'Dos maletas: lo demás se compra allá. Lo que no cabe se vende o se queda en casa de tu familia.'},
      ]},
      {id:'tecnologia', ico:'💻', titulo:'Herramientas y tecnología', items:[
        {id:'sa-tec-1', cuando:'2027-08', txt:'La laptop para la maestría (la Zephyrus sirve) con su cargador; revisa que diga 100-240 V.'},
        {id:'sa-tec-2', cuando:'2027-08', txt:'Adaptadores de enchufe tipo C/F: Alemania usa 230 V.'},
        {id:'sa-tec-3', cuando:'2027-08', txt:'Tu número mexicano vivo en un plan barato o de prepago: el banco, el SAT y WhatsApp dependen de él. Allá, una eSIM alemana.'},
        {id:'sa-tec-4', cuando:'2027-08', txt:'Escaneos de todo (pasaporte, visa, títulos, apostillas, admisión y seguro) en la nube y en una USB.'},
        {id:'sa-tec-5', cuando:'2027-08', txt:'Gestor de contraseñas y verificación en dos pasos que no dependa de un SMS mexicano.'},
        {id:'sa-tec-6', cuando:'2027-08', txt:'Licencia de conducir vigente: allá sirve unos meses; pregunta en la Führerscheinstelle cómo se canjea la mexicana.'},
        {id:'sa-tec-7', cuando:'2027-09', txt:'Transporte: el Deutschland-Semesterticket suele venir con la cuota del semestre; confírmalo en Esslingen.'},
      ]},
      {id:'vivienda', ico:'🏠', titulo:'Vivienda y llegada', items:[
        {id:'sa-viv-1', cuando:'2027-05', txt:'El día de la admisión, solicita cuarto en las residencias del Studierendenwerk Stuttgart: la lista de espera es larga.'},
        {id:'sa-viv-2', cuando:'2027-06', txt:'Plan B: WG-Gesucht en Esslingen o Stuttgart. Nunca pagues un depósito sin contrato ni sin ver el cuarto en videollamada: hay fraudes.'},
        {id:'sa-viv-3', cuando:'2027-08', txt:'Pide al arrendador la Wohnungsgeberbestätigung: sin ella no hay Anmeldung.'},
        {id:'sa-viv-4', cuando:'2027-09', txt:'Primera semana: Anmeldung, inscripción, cuenta, SIM y transporte; la segunda, el permiso de residencia.'},
      ]},
      {id:'trabajo', ico:'💼', titulo:'Trabajo', items:[
        {id:'sa-trab-1', cuando:'2027-02', txt:'LinkedIn en inglés: «Open to Werkstudent · Stuttgart region · from Oct 2027», con el ISTQB y tu experiencia en HIL.'},
        {id:'sa-trab-2', cuando:'2027-04', txt:'Goethe-Zertifikat A2 o telc A2 en México: Esslingen pide A2 antes de terminar el 2º semestre y llegas con él cumplido.'},
        {id:'sa-trab-3', cuando:'2027-06', txt:'Aplica a Werkstudent desde México con la admisión en la mano: Bosch, Mercedes-Benz, Porsche, Vector, ETAS y proveedores. 20 h a la semana pagan unos €1,200 al mes.'},
        {id:'sa-trab-4', cuando:'2027-07', txt:'Constancia laboral y carta de recomendación de ALTEN en inglés: sirven para el Werkstudent y para tu primer empleo allá.'},
        {id:'sa-trab-5', cuando:'2027-08', txt:'Renuncia con el aviso que pida tu contrato y pide por escrito tu constancia laboral. El plan no cuenta finiquito: si te pagan algo de aguinaldo o vacaciones, va al colchón.'},
      ]},
      {id:'mexico', ico:'🇲🇽', titulo:'Lo que se queda en México', items:[
        {id:'sa-mx-1', cuando:'2027-02', txt:'El negocio de tu papá, en sus manos: el dossier, el QR de WhatsApp y las plantillas de Posts para que publique sin ti.'},
        {id:'sa-mx-2', cuando:'2027-08', txt:'CETES y GBM: entra desde el extranjero y deja beneficiarios registrados.'},
        {id:'sa-mx-3', cuando:'2027-08', txt:'Cancela el gym ({{gymNombre}}) y revisa qué suscripciones siguen.'},
        {id:'sa-mx-4', cuando:'2027-08', txt:'Poder notarial a tu papá para el auto y los trámites que no puedas hacer desde allá.'},
        {id:'sa-mx-5', cuando:'2027-08', txt:'Despedidas sin alcohol: comidas, no fiestas. La cadena no se rompe en la última semana.'},
      ]},
    ],
  };
  function costoSalida(c, eur) { return (c.mxn || 0) + (c.eur || 0) * (eur || PROYECTO.eurMxn); }

  /* ── El plan de un mes ──────────────────────────────────────────────────────────────────────
     Adán, 18-oct-2026: "en cada fase debes crear diferentes subtabs de los meses y poner la
     información… en todas las fases cada mes tiene un plan completo". Un mes del plan, armado con
     lo que ya vive aquí, sin escribir nada dos veces: sus tareas de fase (`semanas` con `mes`), lo
     de la salida a Alemania que cae ese mes (`SALIDA.bloques`, y lo que se paga en `costos`), lo
     que se sostiene toda la fase (`cont`) y lo que se repite cada mes (`mensual`), el foco de
     aprendizaje (`HAB_FOCO`), el dinero de la proyección (`PROYECCION.meses`: lo que entra y sale,
     el ahorro, GBM y el patrimonio al cerrar), los abonos de la BBVA y las fechas que caen en él:
     el arranque y el cierre de la fase, su checkpoint, los hitos de las rutas de las fases y el
     cambio de foco. Lo pinta la ventana de las fases del Dashboard, una pestaña por mes, y ahí
     mismo se audita al cerrarlo. */
  const MESES_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  // El mes ('AAAA-MM') y el día, si lo trae, de una fecha escrita: «31 mar 2027», «Junio 2027».
  function mesDeTexto(s) {
    const m = String(s || '').toLowerCase()
      .match(/(?:(\d{1,2})\s+(?:de\s+)?)?(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)[a-zé]*\.?\s+(?:de\s+)?(\d{4})/);
    return m ? { mes: m[3] + '-' + String(MESES_ES.indexOf(m[2]) + 1).padStart(2, '0'), dia: m[1] ? +m[1] : 0 } : null;
  }
  function planMes(ym) {
    const f = PHASES.filter(function (p) { return ym >= mesDe(p.start) && ym <= mesDe(p.end); })[0] || null;
    const salida = [];
    SALIDA.bloques.forEach(function (b) {
      b.items.forEach(function (x) { if (x.cuando === ym) salida.push({ id: x.id, txt: x.txt, ico: b.ico, tema: b.titulo }); });
    });
    const fechas = [];
    const pon = function (dia, txt, tipo) { fechas.push({ dia: dia || 0, txt: txt, tipo: tipo }); };
    if (f && mesDe(f.start) === ym) pon(f.start.getDate(), 'Arranca la ' + f.tag + ': ' + f.title + '.', 'fase');
    if (f && mesDe(f.end) === ym) pon(f.end.getDate(), 'Cierra la ' + f.tag + '.', 'fase');
    // Los hitos fechados de cualquier ruta: la de la Fase 1 pone junio y agosto de 2027, que caen en la 2.
    PHASES.forEach(function (p) {
      (p.razones || []).forEach(function (b) {
        (b.hitos || []).forEach(function (h) {
          const d = mesDeTexto(texto(h.f || ''));
          if (d && d.mes === ym) pon(d.dia, texto(h.t + (h.v ? ' (' + h.v + ')' : '') + (h.s ? ': ' + h.s : '') + '.'), 'hito');
        });
      });
    });
    if (f && f.checkpoint) {
      const cp = texto(f.checkpoint), antes = cp.split(':')[0], d = mesDeTexto(antes);
      if (/cada diciembre/i.test(antes) && ym.slice(5) === '12') pon(0, 'Checkpoint: ' + cp, 'checkpoint');
      else if (d && d.mes === ym) pon(d.dia, 'Checkpoint: ' + cp.slice(antes.length + 1).trim(), 'checkpoint');
    }
    const foco = HAB_FOCO.filter(function (h) { return ym >= h.desde && ym <= h.hasta; })[0] || null;
    if (foco && foco.hasta === ym) pon(0, 'Cambia el foco: ' + foco.cambio, 'foco');
    fechas.sort(function (a, b) { return (a.dia || 99) - (b.dia || 99); });
    const sk = foco ? SK.filter(function (x) { return x.id === foco.id; })[0] : null;
    return {
      mes: ym, fase: f ? PHASES.indexOf(f) : -1,
      tareas: f ? (f.semanas || []).filter(function (x) { return x.mes === ym; }) : [],
      salida: salida,
      siempre: f ? (f.semanas || []).filter(function (x) { return x.cont; }) : [],
      mensual: (f && f.mensual) || [],
      foco: foco ? Object.assign({ nombre: sk ? sk.name : foco.id }, foco) : null,
      dinero: PROYECCION.meses.filter(function (m) { return m.mes === ym; })[0] || null,
      costos: SALIDA.costos.filter(function (c) { return c.mes === ym; })
        .map(function (c) { return { txt: c.txt, mxn: costoSalida(c), gasta: c.gasta !== false }; }),
      bbva: planBbva().abonos.filter(function (a) { return a.fecha.slice(0, 7) === ym; }),
      fechas: fechas,
      metas: metasMes(PROYECCION.meses.filter(function (m) { return m.mes === ym; })[0] || null, ym),
    };
  }
  /* Las cifras con que se audita un mes: lo que la proyección pone al cerrarlo. `dinero` son los
     activos líquidos —en la proyección, GBM (todo el efectivo: fondo, cuenta y GBM) más el depósito
     del depa—, `bbva` la tarjeta mientras su plan corre y `liquido` el patrimonio líquido (el dinero
     menos todo lo que se debe, el auto incluido). `mas`: si más es mejor. Lo real lo mide `cifrasHoy`
     con la misma definición, así que meta y real comparan lo mismo. */
  function metasMes(fila, ym) {
    if (!fila) return [];
    const fuera = ym >= String(PROYECTO.maestriaInicio || '').slice(0, 7);
    const ant = PROYECCION.meses.filter(function (m) { return m.mes === mesMas(ym, -1); })[0];
    const out = [{ k: 'dinero', t: 'Tu dinero al cerrar', d: fuera ? 'lo invertido y el efectivo' : 'efectivo, CETES, GBM y el depósito del depa',
                   meta: fila.alemania + (fila.deposito || 0), mas: true }];
    if (fila.bbva > 0.5 || (ant && ant.bbva > 0.5)) out.push({ k: 'bbva', t: 'La BBVA al cerrar', d: 'lo que debes en la tarjeta', meta: fila.bbva, mas: false });
    out.push({ k: 'liquido', t: 'Patrimonio líquido al cerrar', d: 'tu dinero menos todo lo que debes, el auto incluido', meta: fila.liquido, mas: true });
    return out;
  }
  // Lo real de hoy, medido como `metasMes`: los activos líquidos, la BBVA y el patrimonio líquido. `gastar`, si se da, es
  // lo que hoy hay para gastar —la cuenta y el efectivo— según el riel del Plan Maestro (tu último saldo dicho y lo previsto
  // desde entonces) y sustituye al saldo de Finanzas, que es el del día en que lo dijiste: así una pantalla entera mide con
  // la misma cifra (Adán, 21-oct-2026: "todo cuadre"). Sin él, lo de Finanzas.
  function cifrasHoy(f, gastar) {
    const F = f || fin || {}, Pt = patrimonio(F), tc = (F.debts || []).filter(function (d) { return d.id === 'd001'; })[0];
    const caja = (F.activos || []).filter(function (a) { return a.type === 'liquido'; }).reduce(function (s, a) { return s + (+a.value || 0); }, 0);
    const aj = typeof gastar === 'number' && isFinite(gastar) ? gastar - caja : 0;
    return { dinero: Pt.liquido + Pt.deuda + aj, bbva: tc ? Math.max(0, +tc.balance || 0) : 0, liquido: Pt.liquido + aj, gastar: caja + aj };
  }

  /* ── LA PROYECCIÓN DEL PLAN MAESTRO ──────────────────────────────────────────────────────────
     Mes a mes, del 1 oct 2026 al millón: lo que entra, lo que sale, GBM (todo el
     efectivo) y el patrimonio líquido (efectivo y depósito, menos el auto, el iPhone y la BBVA).
     En México, del sueldo solo llega a la cuenta lo que se manda —el ahorro de cada
     quincena, que son cobros del calendario— y de Didi lo que Adán dijo que aparta; lo demás del
     sueldo son los fijos, la comida y su gasto personal (`desgloseMes`). Así el plan y el
     calendario del Dashboard no pueden decir cosas distintas. Lo demás son los SUPUESTOS de abajo,
     cada uno con su porqué. La `foto` es el 1 oct 2026 en Finanzas —una foto, como una migración:
     no se actualiza—, así que la proyección es el PLAN, y Coach la compara contra lo real.
     `proyectar(cambios)` admite escenarios (mandar menos, irse un año después, sin Werkstudent,
     otro euro); `PROYECCION.meses` es el escenario base y `PROYECCION.cortes`, lo que pide la
     salida contra lo que hay. De aquí sale el `liquido` de cada fase. */
  const SUPUESTOS = {
    desde: '2026-10', hasta: '2032-12',
    // 1 oct 2026: fondo $6,000 + cuenta $390 + efectivo $1,600; el depósito del depa; el crédito
    // del auto con su tasa y su pago; el iPhone de AT&T. La BBVA no va aquí: la lleva `planBbva`.
    foto: { efectivo: 7990, deposito: 11250, auto: 283000, autoTasa: 12.99, autoPago: 6700, iphone: 11362, iphonePago: 494 },
    // Comer al mes: lo que da la lista de compras del Dashboard al día, por 30.4. En casa de su
    // familia, comida y cena son de la casa —las cubre el aporte— y él paga su desayuno: el promedio
    // de sus recetas de desayuno, por 30.4. El verificador los compara con la lista
    // y las recetas: si cambian, avisa que hay que actualizarlos aquí.
    comida: 3379,
    comidaEnCasa: 821,
    // El gasto personal tiene dos partes. Sus rutinas —piel, cabello y suplementos— salen de
    // RUTINA_PIEL, RUTINA_PELO y SUPLEMENTOS (`cuidadoMes`). Lo demás —ropa, salidas, regalos,
    // compras sueltas, la carga del auto fuera de Didi— no lo ha dicho: es el tope con que se
    // cuadró el ahorro de cada quincena. En casa baja: ya no hay cosas del depa.
    loDemas: 3200,
    loDemasEnCasa: 2200,
    menosAhorro: 0,        // escenario: cuánto MENOS se manda a la cuenta cada mes en México
    // Lo que no es sueldo ni Didi. El aguinaldo paga el seguro del BYD (Adán, 3-oct-2026: "va
    // directo a pagar el seguro de mi byd, no lo consideres") y ALTEN no da finiquito: no entran.
    extras: [
      {mes:'2026-11', txt:'Venta de lo que no usas (1 de 2)', mxn:10000},
      {mes:'2026-12', txt:'Venta de lo que no usas (2 de 2)', mxn:10000},
    ],
    // El ingreso nuevo que pide irse completo en septiembre de 2027 (`extraSalida`): entra a GBM
    // cada mes en México desde `extraDesde`. Es un escenario, no un supuesto del plan base: aquí
    // `extraMes` es 0 y solo lo pasan las claves de la salida (`salidaConIngreso`).
    extraDesde: '2026-11',
    extraMes: 0,
    // En Esslingen, en euros: renta ~€450, comida ~€250, seguro ~€120, celular, libros y algo de
    // vida. Werkstudent: 20 h a la semana pagan ~€1,200 (workingstudentjobs.de, 2026), ~€1,100
    // netos; se supone desde el tercer mes. Colegiaturas de €1,900 en marzo y septiembre (la
    // primera va en SALIDA). La maestría son tres semestres: termina en febrero de 2029.
    alemania: { gasto: 1050, werkstudent: 1100, werkDesde: '2027-11', colegiatura: 1900, semestres: ['2028-03', '2028-09'], fin: '2029-02' },
    // El BYD rentado: ~$3,000 a la semana menos seguro de plataforma, GPS, mantenimiento y semanas
    // vacías. Paga su mensualidad y deja un poco.
    byd: { rentaNeta: 7500 },
    // Ingeniero recién titulado en la región de Stuttgart: ~€58,000 brutos al año, unos €3,200
    // netos al mes; la vida allá, ~€1,900.
    trabajo: { neto: 3200, gasto: 1900, desde: '2029-03' },
    rendimiento: 0.06,     // CETES o índices sobre lo que se tiene, ya fuera de México (anual)
    // De dónde sale cada supuesto, en una frase: Coach lo enseña junto a su valor en la
    // proyección. Lo que se afirma como hecho lleva su fuente.
    porque: {
      foto:        'La foto de Finanzas del 1 oct 2026: el fondo, la cuenta y el efectivo; el depósito del depa; el crédito del auto con su tasa y su pago, y el iPhone de AT&T. La BBVA la lleva su plan quincena a quincena.',
      quincenas:   'Cada quincena se sostiene sola: su sueldo menos los fijos de sus días, la comida y su parte del gasto personal; el resto va a GBM el día que entra.',
      didi:        'Lo que Adán dijo que aparta (3 oct 2026): de octubre a enero, y más desde febrero, cuando maneja más; el resto de Didi paga la carga del auto y lo suyo.',
      casa:        'Adán (3 oct 2026): el depa se entrega a fin de enero y desde febrero vive con su familia: aporta cada mes, y comida y cena son de la casa.',
      comida:      'La lista de compras del Dashboard, al día por 30.4. En casa de su familia comida y cena las cubre el aporte; él paga su desayuno, el promedio de sus recetas.',
      loDemas:     'Ropa, salidas, regalos, compras sueltas y la carga del auto fuera de Didi: el tope con que se cuadró el ahorro de cada quincena. En casa baja: ya no hay cosas del depa.',
      extras:      'Lo que no usas, vendido en noviembre y diciembre. El aguinaldo paga el seguro del BYD (Adán, 3 oct 2026) y ALTEN no da finiquito: no entran.',
      eurMxn:      'El 2 oct 2026 estaba en $20.46 (Infobae); se planea más alto para que una subida normal —su volatilidad anda en 7%— no tumbe la cuenta bloqueada.',
      gasto:       'Renta de un cuarto ~€450, comida ~€250, seguro médico ~€120, celular, libros y algo de vida.',
      werkstudent: '20 horas a la semana pagan ~€1,200 (workingstudentjobs.de, 2026), unos €1,100 netos; se supone desde el tercer mes.',
      colegiatura: '€1,500 por semestre para quien viene de fuera de la UE, más las cuotas (hs-esslingen.de): la primera va en la salida, las otras dos en marzo y septiembre.',
      byd:         'Un particular cobra ~$3,000 a la semana; menos el seguro de plataforma, el GPS, el mantenimiento y las semanas vacías. Paga su mensualidad y deja un poco.',
      trabajo:     'Ingeniero recién titulado en la región de Stuttgart: ~€58,000 brutos al año, unos €3,200 netos al mes; la vida allá, ~€1,900.',
      rendimiento: 'CETES o fondos indexados sobre lo ahorrado, ya fuera de México. En México el plan no cuenta rendimiento: es la parte conservadora.',
    },
  };
  function mesDe(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); }
  function mesSiguiente(ym) { const p = ym.split('-').map(Number); return mesDe(new Date(p[0], p[1], 1)); }
  function mesMas(ym, k) { const p = ym.split('-').map(Number); return mesDe(new Date(p[0], p[1] - 1 + k, 1)); }

  /* Lo que Didi pone en GBM en `mes`: didiAhorro hasta enero, didiAhorroMas desde
     didiMasDesde, la mitad el último mes en México y nada fuera de él. `ultimo` es el último mes en
     México del escenario (irse un año después lo estira). */
  function didiAlAhorro(mes, ultimo) {
    const P = PROYECTO, fin = ultimo || P.ultimoMesMexico;
    if (mes < SUPUESTOS.desde || mes > fin) return 0;
    const m = mes >= P.didiMasDesde ? P.didiAhorroMas : P.didiAhorro;
    return mes === fin ? m / 2 : m;
  }

  /* La BBVA, quincena a quincena (Adán, 5-oct-2026: "me estás diciendo de pagar mi tarjeta pero ni
     tengo dinero… eso debe ser cada quincena y deja dinero sobrante para la quincena; actualmente
     debo 15,000 a bbva"). Ya no se paga de golpe el 11: la deuda cara va primero (prompt del Plan
     Maestro), así que lo que cada quincena manda a GBM y lo que Didi aparta cada lunes van a la
     tarjeta hasta dejarla en cero, y el día de pago se completa al menos el mínimo con lo de Didi.
     Arranca de `PROYECTO.bbvaInicio` el día `PROYECTO.bbvaFecha` y, el día `bbvaSaldoFecha`, se ancla
     al último saldo que dijo Adán (`d001` en DEUDAS_SEED): los abonos de antes quedan como pasaron.
     Salvo con `PROYECTO.bbvaSinIntereses`, el interés corre por día
     a la tasa de la tarjeta más IVA, se carga el día de pago y, al llegar a cero, lo que quedaba va
     con el abono siguiente. Devuelve cada abono con su fecha y de dónde sale (`quincena`, `didi` o
     `minimo`), el día que queda en cero, lo que cuesta en intereses y el saldo al cerrar cada mes.
     Lo leen `agendaDia` (el calendario), `desgloseMes` y `proyectar`: una sola cuenta.
     Con Finanzas en el navegador sigue al saldo VIVO (Adán, 15-oct-2026: "debe actualizarse lo de
     tarjeta de bbva solito, en base a cuánto gasto y cuánto gano cada día"): Finanzas mueve `d001`
     con cada compra y cada pago que se anotan (`movimientoTarjeta`) y el plan arranca HOY de ese
     saldo. Un día con un pago anotado después del último saldo dicho lleva lo pagado (`hecho`, con
     lo previsto en `plan`) en vez de lo previsto, y lo previsto que no se anotó es lo que el Plan
     Maestro pregunta si ya se mandó (`bbvaEstado`). Sin datos —el verificador, un navegador en
     blanco— es el plan puro desde `bbvaSaldoFecha`. Se calcula una vez por día y por lectura de
     Finanzas: lo piden el calendario y el riel día por día. */
  // De dónde sale cada abono, en palabras: lo dicen la nota del pago y el Plan Maestro.
  const ABONO_DE = { quincena: 'lo que sobra de la quincena', didi: 'lo que apartas de Didi',
                     minimo: 'el pago del corte, con lo de Didi', extra: 'un abono de más' };
  let planCache = null;
  function planBbva() {
    const hoyK = fechaLocal();
    if (planCache && planCache.fin === fin && planCache.hoy === hoyK) return planCache.out;
    const P = PROYECTO, tc = DEUDAS_SEED.filter(function (d) { return d.id === 'd001'; })[0];
    const vivo = fin && Array.isArray(fin.debts) ? fin.debts.filter(function (d) { return d.id === 'd001'; })[0] : null;
    const conVivo = !!vivo && !!P.bbvaSaldoFecha && hoyK >= P.bbvaSaldoFecha;
    // Lo que Adán dijo que no mandó («No lo mandé»): ese día no lleva abono, ni en el plan ni en la caja.
    const omitidos = conVivo && Array.isArray(vivo.omitidos) ? vivo.omitidos : [];
    const omite = function (x, dia) { return omitidos.some(function (o) { return o.fecha === dia && o.de === x.de; }); };
    const out = { abonos: [], fin: null, intereses: 0, saldoMes: {}, desde: P.bbvaFecha || null, vivo: conVivo, omitidos: [] };
    planCache = { fin: fin, hoy: hoyK, out: out };
    if (!tc || !P.bbvaFecha || (!conVivo && !(+tc.balance > 0))) return out;
    const diario = P.bbvaSinIntereses ? 0 : (+tc.rate || 0) / 100 * 1.16 / 365, min = +tc.min || 0, diaPago = +tc.day || 0;
    const p = P.bbvaFecha.split('-').map(Number), d = new Date(p[0], p[1] - 1, p[2]);
    const r2 = function (x) { return Math.round(x * 100) / 100; };
    // Lo pagado de verdad cada día, del último saldo dicho a hoy, y —con la tarjeta ya en cero— el
    // día en que llegó ahí: su último movimiento o su último pago.
    const pagos = {};
    if (conVivo) (fin.transactions || []).forEach(function (t) {
      const m = pagoBbva(t, fin.debts);
      if (m > 0 && t.date <= hoyK) pagos[t.date] = (pagos[t.date] || 0) + m;
    });
    const cero = conVivo && !(+vivo.balance > 0)
      ? [vivo.fecha, Object.keys(pagos).sort().pop(), P.bbvaSaldoFecha].filter(function (x) { return x && x <= hoyK; }).sort().pop() : null;
    // `acum` es el interés que corre y todavía no se carga: cada abono lo paga primero, así el
    // último deja la tarjeta en cero de verdad y no un residuo de centavos para la quincena siguiente.
    let saldo = +P.bbvaInicio || +tc.balance, acum = 0, ciclo = 0;
    const abona = function (monto, de) {
      const x = Math.round(Math.min(saldo + acum, monto) * 100) / 100;
      if (!(x >= 1)) return;
      const aInteres = Math.min(acum, x);
      acum -= aInteres; saldo -= x - aInteres; ciclo += x;
      out.abonos.push({ fecha: mesDe(d) + '-' + String(d.getDate()).padStart(2, '0'), monto: x, de: de });
    };
    const ORDEN = { quincena: 0, minimo: 1, didi: 2 };
    for (let k = 0; k < 730; k++, d.setDate(d.getDate() + 1)) {
      const ym = mesDe(d), dia = d.getDate();
      if (k > 0) { const i = saldo * diario; acum += i; out.intereses += i; }
      const hoyEs = ym + '-' + String(dia).padStart(2, '0');
      const anclado = conVivo ? hoyEs >= hoyK : (!P.bbvaSaldoFecha || hoyEs >= P.bbvaSaldoFecha);
      if (hoyEs === P.bbvaSaldoFecha) { saldo = +tc.balance; acum = 0; }   // el último saldo que dijo Adán
      if (conVivo && hoyEs === hoyK) { saldo = Math.max(0, +vivo.balance || 0); acum = 0; }   // y hoy, el de Finanzas
      if (dia === diaPago) { saldo += acum; acum = 0; }
      // Lo que toca ese día: completar el pago del día de corte, lo de Didi del lunes y la quincena.
      const toca = [];
      if (dia === diaPago && k > 0 && ciclo < min) toca.push({ de: 'minimo', m: min - ciclo });
      if (k > 0 && d.getDay() === 1) toca.push({ de: 'didi', m: didiAlAhorro(ym) * 12 / 52 });
      if (dia === 1 || dia === 15) toca.push({ de: 'quincena', m: envioQuincena(dia, ym) });
      const pagado = pagos[hoyEs] || 0;
      if (pagado > 0) {
        // Lo pagado, repartido en lo que tocaba —primero la quincena, después el pago del corte y al
        // final lo de Didi—; lo que pasa de ahí va con el primero, y si ese día no tocaba nada es un
        // abono de más. Hoy el saldo vivo ya lo trae; los días de antes se descuenta aquí. Lo previsto se
        // topa en lo que la tarjeta debía ese día: el último abono no pide la quincena entera.
        let disp = (conVivo && hoyEs === hoyK ? saldo + pagado : saldo) + acum;
        const filas = toca.filter(function (x) { return x.m >= 1; })
          .sort(function (a, b) { return ORDEN[a.de] - ORDEN[b.de]; })
          .map(function (x) { const pl = Math.max(0, Math.min(x.m, disp)); disp -= pl; return { de: x.de, plan: pl, monto: 0 }; })
          .filter(function (x) { return x.plan >= 1; });
        if (!filas.length) filas.push({ de: 'extra', plan: 0, monto: 0 });
        let resta = pagado;
        filas.forEach(function (x) { x.monto = Math.min(resta, x.plan); resta -= x.monto; });
        filas[0].monto += resta;
        filas.forEach(function (x) {
          if (x.monto > 0) out.abonos.push({ fecha: hoyEs, monto: r2(x.monto), de: x.de, plan: r2(x.plan), hecho: true });
        });
        if (!(conVivo && hoyEs === hoyK)) saldo = Math.max(0, saldo - pagado);
        if (dia === diaPago) ciclo = 0;
        ciclo += pagado - filas.filter(function (x) { return x.de === 'minimo'; }).reduce(function (s, x) { return s + x.monto; }, 0);
      } else {
        toca.filter(function (x) { return x.de === 'minimo' && !omite(x, hoyEs); }).forEach(function (x) { abona(x.m, x.de); });
        if (dia === diaPago) ciclo = 0;
        toca.filter(function (x) { return x.de !== 'minimo' && !omite(x, hoyEs); }).forEach(function (x) { abona(x.m, x.de); });
        // Lo que no se mandó queda dicho: la agenda no lo manda a GBM, se queda en la cuenta.
        toca.filter(function (x) { return omite(x, hoyEs); }).forEach(function (x) { out.omitidos.push({ fecha: hoyEs, de: x.de, plan: r2(x.m) }); });
      }
      out.saldoMes[ym] = saldo + acum;
      if (saldo + acum < 1 && anclado) {
        const c = cero ? cero.split('-').map(Number) : null;
        out.fin = c ? new Date(c[0], c[1] - 1, c[2]) : new Date(d.getFullYear(), d.getMonth(), d.getDate());
        out.saldoMes[ym] = 0; break;
      }
    }
    return out;
  }
  /* Un pago a la BBVA anotado DESPUÉS del último saldo que dijo Adán: lo que el plan pone en su día
     en vez del abono previsto. Lo marca lo que Finanzas o el Plan Maestro le aplicaron al saldo
     (`tarjeta`); uno anotado antes de esa marca se reconoce por la regla de siempre. */
  function pagoBbva(t, debts) {
    if (!t || t.type !== 'expense' || t.cat !== 'Deudas' || !(String(t.date || '') > String(PROYECTO.bbvaSaldoFecha || ''))) return 0;
    if (t.tarjeta) return t.tarjeta.id === 'd001' ? +t.amount || 0 : 0;
    const m = movimientoTarjeta(t, debts, true);
    return m && m.id === 'd001' ? +t.amount || 0 : 0;
  }
  // Lo que un día de quincena manda a GBM según el calendario, antes de que la tarjeta tome su parte.
  function envioQuincena(dia, ym) {
    return CALENDARIO.cobros.reduce(function (a, c) {
      return a + (c.quincena && c.ahorro && c.dia === dia && caeEnMes(c, ym) ? +c.monto || 0 : 0);
    }, 0);
  }

  /* El sueldo de un mes en México, renglón por renglón: lo que entra, cada fijo por su `grupo`, el
     auto y el iPhone, la comida, lo que va a GBM (el ahorro de cada
     quincena) y lo que queda: tu gasto personal. Los cobros son los del calendario, los mismos que
     pinta el Dashboard; el auto y el iPhone, las mensualidades de la foto (o lo que la proyección
     pague ese mes). `promedio`: el mes tipo de su etapa —el gas a su promedio— para las tablas de
     las fases. `ultimo`: el último mes en México del escenario. */
  const GRUPOS_SUELDO = [
    ['sueldo', 'Sueldo de ALTEN, las dos quincenas'], ['renta', 'Renta'],
    ['depa', 'Luz, agua, internet y gas'], ['celular', 'Plan de datos'],
    ['suscripciones', 'Gym, Claude Code e iCloud'], ['familia', 'Aporte a tu familia'],
    ['auto', 'BYD, la mensualidad'], ['iphone', 'iPhone'], ['comida', 'Comida'],
    ['cuidado', 'Tus rutinas: piel, cabello y suplementos'],
    ['personal', 'Lo demás: ropa, salidas, regalos, compras'], ['tarjeta', 'La BBVA, hasta dejarla en cero'],
    ['ahorro', 'A GBM, el ahorro para Alemania'],
  ];
  function desgloseMes(mes, s, opts) {
    s = s || SUPUESTOS; opts = opts || {};
    const P = PROYECTO, f = s.foto, ultimo = opts.ultimo || P.ultimoMesMexico;
    const casa = mes >= P.enCasaDesde;
    const g = {};
    GRUPOS_SUELDO.forEach(function (x) { g[x[0]] = 0; });
    let dia1 = 0, dia15 = 0;
    const items = {};
    CALENDARIO.cobros.forEach(function (c) {
      // Irse un año después estira lo que dura hasta el último mes en México.
      const hasta = c.hasta === P.ultimoMesMexico ? ultimo : c.hasta;
      if (!caeEnMes({ cada: c.cada, desde: c.desde, hasta: hasta }, mes, opts.promedio)) return;
      const v = opts.promedio && c.cada > 1 ? c.monto / c.cada : c.monto;
      g[c.grupo] = (g[c.grupo] || 0) + v;
      (items[c.grupo] = items[c.grupo] || []).push({ t: c.txt, v: v });
      if (c.quincena) { if (c.dia < 15) dia1 += v; else dia15 += v; }
    });
    g.auto = opts.pagoAuto != null ? opts.pagoAuto : f.autoPago;
    g.iphone = opts.pagoIphone != null ? opts.pagoIphone : f.iphonePago;
    g.comida = casa ? s.comidaEnCasa : s.comida;
    g.cuidado = cuidadoMes();
    // En el mes tipo el gas va a su promedio ($89.50): cada renglón se redondea al peso y el gasto
    // personal, que es lo que queda, absorbe la diferencia, para que la tabla sume exacto.
    if (opts.promedio) GRUPOS_SUELDO.forEach(function (x) { g[x[0]] = Math.round(g[x[0]]); });
    // La BBVA con plan: lo que se lleva de cada quincena sale del ahorro de ese mes y va en su
    // propio renglón; lo que se lleva de Didi (los lunes y el mínimo del día de pago), de Didi.
    // Es el presupuesto: un abono ya hecho cuenta por lo previsto (`plan`), y uno de más no entra.
    let deDidi = 0;
    planBbva().abonos.forEach(function (a) {
      if (a.fecha.slice(0, 7) !== mes) return;
      const m = a.hecho ? a.plan : a.monto;
      if (a.de !== 'quincena') { deDidi += m; return; }
      g.tarjeta += m; g.ahorro -= m;
      if (+a.fecha.slice(8) < 15) dia1 -= m; else dia15 -= m;
    });
    const cetes = g.ahorro - dia1 - dia15;
    g.ahorro -= s.menosAhorro || 0;
    g.personal = g.sueldo - g.ahorro - GRUPOS_SUELDO.reduce(function (a, x) {
      return x[0] === 'sueldo' || x[0] === 'ahorro' || x[0] === 'personal' ? a : a + g[x[0]];
    }, 0);
    const didi = didiAlAhorro(mes, ultimo) - deDidi;
    return { mes: mes, casa: casa, g: g, items: items, cetes: cetes, dia1: dia1, dia15: dia15, didi: didi, ahorro: g.ahorro + didi };
  }
  // Lo que cuestan al mes sus rutinas de piel, cabello y suplementos: el mismo número que pintan
  // esas pantallas, leído de sus estructuras.
  function cuidadoMes() { return RUTINA_PIEL.costoMesTotal + RUTINA_PELO.costoMesTotal + SUPLEMENTOS.costoMesTotal; }
  /* Las rutinas producto por producto, con lo que cuesta cada uno al mes, y dónde recortar: el
     `recorte` de un producto es UNA recomendación concreta, nunca un menú (Adán, 2026-08-18: "no me
     des alternativas, porque si no al final no compraré nada"), con lo que costaría al mes con la
     misma dosis —la fórmula de su rutina, cambiando precio y envase— y lo que ahorra. `medico`: lo
     decide su dermatólogo (prompt de Cabello). Lo que se ahorra va a GBM. */
  function rutinasDesglose() {
    const grupos = [['Piel', RUTINA_PIEL, RUTINA_PIEL.productos.filter(function (p) { return !p.opcional; })],
                    ['Cabello', RUTINA_PELO, RUTINA_PELO.productos],
                    ['Suplementos', SUPLEMENTOS, SUPLEMENTOS.lista]];
    let total = 0, ahorro = 0, medico = 0;
    const out = grupos.map(function (g) {
      const R = g[1];
      const items = g[2].map(function (p) {
        const mes = R.costoMes(p);
        let rec = null;
        if (p.recorte) {
          const r = p.recorte, nuevo = r.quitar ? 0 : R.costoMes(Object.assign({}, p, r));
          rec = { n: r.n || '', quitar: !!r.quitar, medico: !!r.medico, txt: r.txt, fuente: r.fuente, mes: nuevo, ahorro: mes - nuevo };
          ahorro += mes - nuevo;
          if (r.medico) medico += mes - nuevo;
        }
        total += mes;
        return { id: p.id, n: p.n, mes: mes, recorte: rec };
      }).filter(function (x) { return x.mes > 0 || x.recorte; });
      return { grupo: g[0], total: items.reduce(function (a, x) { return a + x.mes; }, 0), items: items };
    });
    return { grupos: out, total: total, ahorro: ahorro, medico: medico };
  }
  // El mes tipo de cada etapa: con depa (su último mes) y en casa de su familia (el primero).
  function mesTipo(casa, s) {
    return desgloseMes(casa ? PROYECTO.enCasaDesde : PROYECTO.rentaHasta, s, { promedio: true });
  }

  function proyectar(cambios) {
    const s = Object.assign({}, SUPUESTOS, cambios || {});
    const P = PROYECTO, eur = s.eurMxn || P.eurMxn, f = s.foto, A = s.alemania, T = s.trabajo;
    // `desfase`: irse N meses después (12 = septiembre de 2028). Mueve la salida, sus costos y todo
    // lo de Alemania; el ahorro de México sigue hasta el nuevo último mes.
    const dm = s.desfase || 0;
    const salida = mesMas(P.maestriaInicio.slice(0, 7), dm), ultimo = mesMas(salida, -1);
    const werkDesde = mesMas(A.werkDesde, dm), finMaestria = mesMas(A.fin, dm), trabajoDesde = mesMas(T.desde, dm);
    const semestres = A.semestres.map(function (m) { return mesMas(m, dm); });
    const costos = SALIDA.costos.map(function (c) { return Object.assign({}, c, { mes: mesMas(c.mes, dm) }); });
    const devuelve = mesSiguiente(P.rentaHasta);
    let cash = f.efectivo, deposito = f.deposito, auto = f.auto, iphone = f.iphone;
    const B = planBbva();
    const grupo = function (k) { return GRUPOS_SUELDO.filter(function (x) { return x[0] === k; })[0][1]; };
    const eu = function (n) { return '€' + n.toLocaleString('es-MX'); };
    const filas = [];
    for (let k = 0; ; k++) {
      const mes = mesMas(s.desde, k);
      if (mes > s.hasta) break;
      const enMexico = mes < salida, enMaestria = !enMexico && mes <= finMaestria;
      let entra = 0, sale = 0, desglose = null;
      const notas = [];
      /* El detalle del mes, para que Coach lo enseñe renglón por renglón: `partes` son los renglones
         que forman `entra` (positivos) y `sale` (negativos) —suman exacto—, y `aparte`, lo que se
         mueve sin dejar de ser suyo (la cuenta bloqueada, la reserva del BYD, el colchón, el
         depósito del depa): no es gasto y sigue en la columna GBM. */
      const partes = [], aparte = [];
      const pon = function (t, mxn, extra) { if (mxn) partes.push(Object.assign({ t: t, mxn: mxn }, extra || {})); };
      // El auto: el interés es gasto; el capital baja la deuda (no el patrimonio).
      const interes = auto > 0 ? auto * f.autoTasa / 100 / 12 : 0;
      const pagoAuto = auto > 0 ? Math.min(auto + interes, f.autoPago) : 0;
      auto = Math.max(0, auto + interes - pagoAuto);
      const pagoIphone = Math.min(iphone, f.iphonePago); iphone -= pagoIphone;
      if (enMexico) {
        desglose = desgloseMes(mes, s, { pagoAuto: pagoAuto, pagoIphone: pagoIphone, ultimo: ultimo });
        entra += desglose.g.sueldo + desglose.didi;
        sale += desglose.g.sueldo - desglose.g.ahorro;
        // De Didi llega lo que apartas menos lo que se lleva la BBVA mientras tenga saldo.
        pon(grupo('sueldo'), desglose.g.sueldo);
        pon('Didi, lo que llega a GBM', desglose.didi, { aparta: didiAlAhorro(mes, ultimo) });
        GRUPOS_SUELDO.forEach(function (x) { if (x[0] !== 'sueldo' && x[0] !== 'ahorro') pon(x[1], -desglose.g[x[0]]); });
        if (desglose.g.tarjeta > 0) notas.push(B.fin && mesDe(B.fin) === mes ? 'la BBVA queda en cero el ' + B.fin.getDate() : 'lo que sobra de cada quincena, a la BBVA');
        if (mes === devuelve) {
          cash += deposito; aparte.push({ t: 'Regresa el depósito del depa', mxn: deposito });
          deposito = 0; notas.push('sin renta desde este mes; regresa el depósito del depa');
        }
        if (mes.slice(5) === '12') notas.push('el aguinaldo, al seguro del BYD');
        if (mes === ultimo) notas.push('Didi, la mitad: la segunda quincena es de empacar');
      } else {
        entra += s.byd.rentaNeta; pon('Renta del ' + P.auto + ', neta', s.byd.rentaNeta);
        sale += pagoAuto + pagoIphone; pon(grupo('auto'), -pagoAuto); pon(grupo('iphone'), -pagoIphone);
        if (mes === salida) notas.push('el BYD empieza a rentarse');
        if (enMaestria) {
          sale += A.gasto * eur; pon('Vida en Esslingen (' + eu(A.gasto) + ')', -A.gasto * eur);
          if (mes >= werkDesde) { entra += A.werkstudent * eur; pon('Werkstudent (' + eu(A.werkstudent) + ' netos)', A.werkstudent * eur); }
          if (mes === werkDesde && A.werkstudent) notas.push('primer mes de Werkstudent');
          if (semestres.indexOf(mes) !== -1) {
            sale += A.colegiatura * eur; pon('Colegiatura del semestre (' + eu(A.colegiatura) + ')', -A.colegiatura * eur);
            notas.push('colegiatura del semestre');
          }
        } else if (mes >= trabajoDesde) {
          entra += T.neto * eur; pon('Sueldo de ingeniero (' + eu(T.neto) + ' netos)', T.neto * eur);
          sale += T.gasto * eur; pon('Vida en Alemania (' + eu(T.gasto) + ')', -T.gasto * eur);
          if (mes === trabajoDesde) notas.push('primer sueldo de ingeniero');
        }
      }
      s.extras.forEach(function (e) {
        if (e.mes !== mes) return;
        const x = typeof e.mxn === 'string' ? P[e.mxn] : e.mxn;
        entra += x; pon(e.txt, x); notas.push(e.txt);
      });
      // El ingreso nuevo del escenario (`extraMes`): a GBM cada mes en México desde `extraDesde`.
      if (enMexico && s.extraMes && mes >= s.extraDesde) { entra += s.extraMes; pon('Ingreso nuevo', s.extraMes); notas.push('ingreso nuevo'); }
      costos.forEach(function (c) {
        if (c.mes !== mes) return;
        const x = costoSalida(c, eur), t = c.txt.replace(/ \(estimado[^)]*\)$/, '');
        if (c.gasta) { sale += x; pon(t, -x, { salida: true }); } else aparte.push({ t: t, mxn: x });
        notas.push(t);
      });
      cash += entra - sale;
      // Lo que ganan las inversiones ya fuera de México; en México el plan no cuenta rendimiento.
      const rend = !enMexico && cash > 0 ? cash * s.rendimiento / 12 : 0;
      cash += rend;
      if (auto <= 0 && pagoAuto > 0) notas.push('se termina de pagar el BYD');
      const bbva = B.saldoMes[mes] || 0;
      filas.push({ mes: mes, entra: entra, sale: sale, ahorro: entra - sale, alemania: cash, auto: auto,
                   iphone: iphone, deposito: deposito, bbva: bbva, rendimiento: rend,
                   liquido: cash + deposito - auto - iphone - bbva, notas: notas, desglose: desglose,
                   partes: partes, aparte: aparte });
    }
    return filas;
  }

  /* Los dos cortes que deciden la salida, con lo que pide cada uno contra lo que la proyección
     tiene: junio (la cuenta bloqueada; la apertura y la visa ya salieron ese mes) y el último mes
     en México (la cuenta bloqueada, la reserva del BYD, el colchón y la colegiatura del primer
     semestre, que se paga al llegar). `falta` > 0 es dinero que el plan todavía no tiene. */
  function cortesSalida(filas, cambios) {
    const s = Object.assign({}, SUPUESTOS, cambios || {}), eur = s.eurMxn || PROYECTO.eurMxn, dm = s.desfase || 0;
    const salida = mesMas(PROYECTO.maestriaInicio.slice(0, 7), dm), ultimo = mesMas(salida, -1);
    const bloq = SALIDA.costos.filter(function (c) { return c.id === 'bloqueada'; })[0];
    const tiene = function (m) { const r = filas.filter(function (x) { return x.mes === m; })[0]; return r ? r.alemania : 0; };
    const corte = function (m, pide) { return { mes: m, pide: pide, tiene: tiene(m), falta: pide - tiene(m) }; };
    return {
      junio: corte(mesMas(bloq.mes, dm), costoSalida(bloq, eur)),
      salida: corte(ultimo, SALIDA.costos.filter(function (c) { return !c.gasta || mesMas(c.mes, dm) > ultimo; })
        .reduce(function (a, c) { return a + costoSalida(c, eur); }, 0)),
    };
  }
  /* Lo que pide irse completo en septiembre de 2027: el ingreso nuevo al mes que cierra el corte
     de agosto —lo que falta, repartido entre los meses de `extraDesde` al último en México— y lo
     que tendría GBM con él al cerrar la Fase 1 y el día de decidir (`maestriaDecision`). Sin
     hueco, el ingreso nuevo es 0 y los dos cortes son los del ritmo de hoy. */
  function salidaConIngreso() {
    const c = cortesSalida(proyectar()).salida, ultimo = PROYECTO.ultimoMesMexico;
    let n = 0;
    for (let m = SUPUESTOS.extraDesde; m <= ultimo; m = mesSiguiente(m)) n++;
    const mes = c.falta > 0 && n ? c.falta / n : 0;
    const F = proyectar({ extraMes: mes });
    const en = function (ym) { const f = F.filter(function (x) { return x.mes === ym; })[0]; return f ? f.alemania : null; };
    return { mes: mes, marzo: en(mesDe(PHASES[1].end)), mayo: en(PROYECTO.maestriaDecision.slice(0, 7)) };
  }
  // Se arma al final del módulo, antes de lo que se exporta: el desglose lee las rutinas de piel,
  // cabello y suplementos (`cuidadoMes`), que se declaran más abajo.
  const PROYECCION = { supuestos: SUPUESTOS, meses: [], cortes: null };
  /* ── APRENDIZAJE ───────────────────────────────────────────────────────────────────────────
     La ruta de cada una de las 12 habilidades, todas con el mismo formato (3-oct-2026): pasos
     (`subs`) de práctica deliberada, ordenados por impacto, cada uno con su nombre (`n`), por qué
     (`q`), qué hacer —objetivo concreto, cómo saber que salió y el entregable— (`c`) y con qué
     (`r`, ver "Los recursos de las rutas de habilidad" en DATOS-MAESTROS.md). `recursos` son los
     de la habilidad entera. Coach y el Dashboard las pintan desde aquí. */
  const APRENDIZAJE = {
    ia: {
      subs: [
        { n: 'El syllabus, capítulo por capítulo', corto: 'Lee un capítulo del temario del examen (empieza por el 2) y escribe de memoria sus cinco ideas principales.',
          q: 'El examen pregunta el syllabus, no tu experiencia: hay que contestar con sus palabras. Son cinco capítulos y el 2 —ingeniería de instrucciones— vale 16 de los 46 puntos.',
          c: 'Una sesión por capítulo, empezando por el 2: léelo y escribe sin mirar sus cinco ideas en una tarjeta. Al cerrar, contesta las preguntas de ese capítulo en el simulacro; lo que falles abre la sesión siguiente.',
          r: [
            { t: 'web', n: 'ISTQB — Testing with Generative AI (CT-GenAI)', url: 'https://istqb.org/certifications/gen-ai/', nota: 'la página oficial: temario, examen y requisito del CTFL' },
          ] },
        { n: 'El simulacro como termómetro', corto: 'Haz un examen de práctica completo cada viernes, con reloj. Presentas el real cuando saques 34 de 46 dos veces seguidas.',
          q: 'Saber que sabes no es lo mismo que contestar con reloj. El simulacro te dice cuándo estás listo; tu sensación, no.',
          c: 'Un simulacro completo cada viernes, con reloj, en el bloque de la noche del Plan Maestro. Presentas cuando saques <b>34 de 46 o más dos veces seguidas</b> (el corte es 30). Cada pregunta fallada va a una lista con su sección del syllabus.',
          r: [
            { t: 'propio', n: 'El simulacro de Mis Metas', nota: '40 preguntas y 46 puntos sacados del programa de estudio oficial' },
          ] },
        { n: 'Una prueba con IA que puedas enseñar', corto: 'Después del examen: pídele a una IA casos de prueba para un frenado de emergencia, revísalos y publica qué estaba mal y por qué.',
          q: 'El certificado dice que sabes la teoría; un repositorio dice que la usas. Es lo que pregunta un entrevistador de validación.',
          c: 'Después del examen: toma el requisito de una función ADAS —un frenado de emergencia, por ejemplo—, pídele a un modelo los casos de prueba, revísalos tú y anota cuáles estaban mal y por qué. Publícalo con un README en inglés: ese "por qué" es lo que vale.',
          r: [
            { t: 'curso', n: 'DeepLearning.AI — Prompt Engineering for Developers', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/', nota: 'gratis, una hora y media, y es el de Andrew Ng' },
            { t: 'propio', n: 'Tu propio repositorio', nota: 'donde vive la prueba que vas a enseñar' },
          ] },
        { n: 'Automatiza una tarea tuya', corto: 'Elige una tarea que repites cada semana, como anotar tus gastos, y automatízala en menos de una hora.',
          q: 'Automatizar lo que repites cada semana libera horas y te da un caso real que contar.',
          c: 'Elige una tarea que hagas cada semana —anotar gastos, armar un reporte— y automatízala en menos de una hora. Mide cuánto tiempo te ahorra al mes.',
          r: [
            { t: 'web', n: 'n8n', url: 'https://n8n.io/', nota: 'automatizaciones conectando servicios, sin escribir casi nada' },
          ] },
        { n: 'Lo que no se le delega a la IA', corto: 'Antes de usar IA con datos de tu trabajo o de un cliente, revisa sus reglas de privacidad, y revisa todo lo que la IA te entregue.',
          q: 'Alucinaciones, datos de un cliente en un modelo público, una prueba que nadie revisó: son los riesgos del capítulo 3 y los que pueden costarte el trabajo.',
          c: 'Antes de usar IA con algo de ALTEN o de un cliente, revisa su política de datos. Cada salida de un modelo se revisa como el trabajo de alguien nuevo: con criterio, no con fe.',
          r: [
            { t: 'curso', n: 'fast.ai — Practical Deep Learning', url: 'https://course.fast.ai/', nota: 'gratis y de arriba abajo: entrenas algo antes de entender la teoría' },
          ] },
      ],
      recursos: [
        { t: 'web', n: 'ISTQB — Testing with Generative AI (CT-GenAI)', url: 'https://istqb.org/certifications/gen-ai/', nota: 'la página oficial: temario, examen y requisito del CTFL' },
        { t: 'curso', n: 'DeepLearning.AI — Prompt Engineering for Developers', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/', nota: 'gratis, una hora y media, y es el de Andrew Ng' },
        { t: 'curso', n: 'fast.ai — Practical Deep Learning', url: 'https://course.fast.ai/', nota: 'gratis y de arriba abajo: entrenas algo antes de entender la teoría' },
        { t: 'web', n: 'n8n', url: 'https://n8n.io/', nota: 'automatizaciones conectando servicios, sin escribir casi nada' },
        { t: 'web', n: 'Cursor', url: 'https://cursor.com/', nota: 'el editor con IA integrada; hay plan gratis' },
      ],
    },
    ingles: {
      subs: [
        { n: 'Tu nivel real es el de hablar bajo presión', corto: 'Grábate dos minutos respondiendo «tell me about yourself» sin guion y cuenta cuántas veces te trabas o traduces del español.',
          q: 'Estás en <b>80</b>: el IELTS dice B2 y lees y escribes bien. El hueco está en <b>hablar sin preparar</b>, que es exactamente lo que pasa en una entrevista.',
          c: 'Grábate dos minutos contestando "tell me about yourself" sin guión y escucha la grabación. Cuenta las pausas largas y las veces que traduces del español. Ese es tu número real, no el del certificado.',
          r: [
            { t: 'propio', n: 'Tu propio teléfono', nota: 'grabarte es el diagnóstico más honesto y no cuesta nada' },
          ] },
        { n: 'La carta de motivación de Esslingen', corto: 'Escribe una página para la maestría: por qué esa escuela, qué experiencia traes y qué quieres después. Un borrador por semana.',
          q: 'Es tu primera entrevista, por escrito: con ella decide el comité si vales una plaza.',
          c: 'Una página: por qué Automotive Systems en Esslingen, qué traes —seis años de validación, HIL y ADAS en Ford, Continental, Bosch y ALTEN— y qué quieres después. Un borrador por semana; léelo en voz alta y pásalo a alguien que lo critique sin piedad.',
          r: [
            { t: 'web', n: 'Esslingen — Automotive Systems (M.Eng.)', url: 'https://www.hs-esslingen.de/en/international/coming-to-esslingen-uas/international-masters-programmes-graduate-school/master-degree-programmes/automotive-systems-meng', nota: 'requisitos, fechas y lo que esperan de quien aplica' },
          ] },
        { n: 'El vocabulario de TU trabajo primero', corto: 'Haz una lista de 40 palabras técnicas de tu trabajo que dudarías al decir en inglés y practica frases completas con ellas.',
          q: 'No necesitas inglés general: necesitas explicar arquitectura, sensores y decisiones técnicas.',
          c: 'Haz una lista de 40 términos que usáis en ALTEN y que dudarías al decir en inglés: <i>trade-off, edge case, throughput, root cause, deprecate</i>. Practica frases con ellos, no palabras sueltas. Cuarenta términos cubren el 90% de tu jornada.',
          r: [
            { t: 'web', n: 'English for Career Development (Coursera, gratis)', url: 'https://www.coursera.org/learn/careerdevelopment', nota: 'inglés de trabajo: CV, entrevista y correo. Auditarlo es gratis' },
            { t: 'web', n: 'Glosario de ROS', url: 'https://docs.ros.org/en/rolling/Glossary.html', nota: 'el vocabulario exacto que vas a tener que decir en voz alta' },
          ] },
        { n: 'Simulacros de entrevista de verdad', corto: 'Una vez por semana, ensaya en voz alta las preguntas típicas de una entrevista en inglés y grábate.',
          q: 'Con la maestría y el Werkstudent por delante, es el escenario exacto que hay que ensayar.',
          c: 'Una sesión a la semana en voz alta con las preguntas típicas: proyecto del que estés orgulloso, un conflicto técnico, por qué esta empresa. Grábalas. La primera vez da vergüenza; a la cuarta ya no.',
          r: [
            { t: 'practica', n: 'Pramp', url: 'https://www.pramp.com/', nota: 'entrevistas técnicas en inglés con otra persona, gratis' },
            { t: 'practica', n: 'interviewing.io', url: 'https://interviewing.io/', nota: 'entrevistas anónimas con ingenieros de empresas grandes' },
            { t: 'propio', n: 'Un compañero de ALTEN', nota: 'lo más barato y lo que menos gente usa' },
          ] },
        { n: 'Pensar en inglés durante el manejo', corto: 'Mientras manejas, escucha podcasts técnicos en inglés y repite frases en voz alta.',
          q: 'Tienes ~28 h a la semana al volante con Didi. Es el mayor bloque de tiempo libre que tienes.',
          c: 'Podcasts técnicos en inglés mientras manejas, y <b>repite en voz alta</b> frases sueltas. Repetir es lo que entrena la boca; sólo escuchar entrena el oído, que ya lo tienes. Nadie te ve en el coche.',
          r: [
            { t: 'podcast', n: 'The Autonocast', url: 'https://www.autonocast.com/', nota: 'conducción autónoma, justo tu sector' },
            { t: 'podcast', n: 'Lex Fridman Podcast', url: 'https://lexfridman.com/podcast/', nota: 'episodios largos: bueno para acostumbrar el oído' },
            { t: 'podcast', n: 'Software Engineering Daily', url: 'https://softwareengineeringdaily.com/', nota: 'media hora al día de inglés técnico' },
          ] },
        { n: 'Cero traducción en el trabajo', corto: 'Cambia a inglés todo lo que usas en el trabajo: tus programas, tus notas y la documentación.',
          q: 'El hábito que sube de 80 a 90 sin estudiar una hora más.',
          c: 'Pon en inglés todo lo que ya usas: el editor, la documentación, tus notas técnicas, los commits. No es estudiar más, es dejar de traducir. El idioma se aprende usando lo que ya haces.',
          r: [
            { t: 'propio', n: 'Tu propio entorno de trabajo', nota: 'cambiar el sistema y el editor a inglés no cuesta nada y actúa todo el día' },
          ] },
      ],
      recursos: [
        { t: 'podcast', n: 'The Autonocast', url: 'https://www.autonocast.com/', nota: 'conducción autónoma en inglés: tu sector y tu oído a la vez' },
        { t: 'practica', n: 'Pramp', url: 'https://www.pramp.com/', nota: 'simulacros de entrevista técnica en inglés, gratis' },
      ],
    },
    codigo: {
      subs: [
        { n: 'Qué te pide el puesto que quieres', corto: 'Lee cinco anuncios de trabajo de estudiante (Werkstudent) en pruebas de software en Stuttgart y marca qué piden que todavía no dominas.',
          q: 'Estás en <b>60</b>: escribes código que funciona. Estudiar sin un anuncio delante es estudiar a ciegas: los de Werkstudent dicen exactamente qué piden.',
          c: 'Lee cinco anuncios de Werkstudent de validación, HIL o ADAS en la región de Stuttgart y subraya lo que se repite: Python, pytest, CAN, HIL, CI. Marca en cuáles podrías resolver un ejercicio mañana sin buscar: esa marca es tu punto de partida.',
          r: [
            { t: 'empleo', n: 'Bosch — ofertas', url: 'https://www.bosch.com/careers/' },
          ] },
        { n: 'Tests antes que features', corto: 'En tu próximo cambio en el trabajo, escribe la prueba antes que el código, una sola vez, para sentir la diferencia.',
          q: 'En automotive, el código sin test no llega a producción. Es lo que más separa a un junior de un senior en una revisión.',
          c: 'En tu próximo cambio en ALTEN, escribe la prueba <b>antes</b> del arreglo. Una sola vez, para sentir la diferencia: la prueba te obliga a decir qué esperas, y eso es la mitad del diseño hecho.',
          r: [
            { t: 'libro', id: 'legacyCode' },
          ] },
        { n: 'pytest de verdad', corto: 'Escribe pruebas automáticas con pytest para una función de control (casos normales, límites y fallos) que corran solas en cada cambio.',
          q: 'pytest es el estándar para automatizar pruebas en Python y aparece en casi todos los anuncios de validación.',
          c: 'Escribe pruebas con pytest para una función de control —un PID o la lógica de un frenado de emergencia simulado—: casos normales, límites y fallos, y que corran solas en cada commit con GitHub Actions.',
          r: [
            { t: 'web', n: 'pytest — Get Started', url: 'https://docs.pytest.org/en/stable/getting-started.html', nota: 'la documentación oficial; empieza aquí' },
          ] },
        { n: 'Un proyecto que se pueda enseñar', corto: 'Termina un proyecto pequeño y completo, por ejemplo procesar datos de un sensor, con sus pruebas y una explicación de tus decisiones.',
          q: 'En la entrevista pesa más un proyecto tuyo explicado bien que diez cursos terminados.',
          c: 'Algo pequeño y completo: un nodo que procese datos de sensor, con tests, CI en GitHub Actions y un README que explique <b>la decisión difícil</b> que tomaste. Lo que impresiona no es el tamaño, es que esté terminado y razonado.',
          r: [
            { t: 'propio', n: 'Tu propio repositorio', nota: 'el README es la mitad del trabajo; es lo que va a leer un reclutador' },
          ] },
        { n: 'Leer código ajeno a propósito', corto: 'Una vez por semana, lee un archivo completo de un proyecto serio de tu área (como ROS 2) y anota una idea que copiarías.',
          q: 'Se aprende más leyendo un buen repositorio que escribiendo tres tuyos.',
          c: 'Elige un repositorio serio de tu campo — Autoware, ROS 2, o el propio Apollo— y lee <b>un archivo entero</b> a la semana, entendiendo por qué está hecho así. Anota una cosa que copiarías. En tres meses son doce ideas que no tenías.',
          r: [
            { t: 'repo', n: 'autowarefoundation/autoware', url: 'https://github.com/autowarefoundation/autoware', nota: 'la pila de conducción autónoma de referencia en abierto' },
            { t: 'repo', n: 'ros2', url: 'https://github.com/ros2', nota: 'el código de ROS 2, que es lo que piden esas ofertas' },
          ] },
        { n: 'Media hora diaria, no seis el domingo', corto: 'Programa media hora cada día antes del trabajo, en vez de seis horas el domingo.',
          q: 'El hábito. Programar es memoria muscular: se pierde rápido y se recupera despacio.',
          c: 'Media hora al día antes de ALTEN, con el bloque de las 06:40 que ya tienes. Media hora diaria son 15 horas al mes; seis horas el domingo son seis y además se olvidan.',
          r: [
            { t: 'propio', n: 'Tu bloque de la mañana', nota: 'el que ya existe en Mi Día' },
          ] },
      ],
      recursos: [
        { t: 'libro', id: 'legacyCode' },
        { t: 'libro', id: 'staffPath' },
      ],
    },
    network: {
      subs: [
        { n: 'Tu red real, en una hoja', corto: 'Escribe 20 nombres de gente de tu área con la que hablaste alguna vez y cuándo fue la última vez.',
          q: 'Estás en <b>55</b>: conoces gente, pero no sabes a quién tienes. Sin esa lista, "hacer networking" es un deseo, no un plan.',
          c: 'Escribe 20 nombres de gente de tu campo con la que hablaste alguna vez: ALTEN, la universidad, proyectos, gente de automotive. Al lado de cada uno, cuándo fue la última vez. Las que pasen de un año son tu trabajo de las próximas semanas.',
          r: [
            { t: 'libro', id: 'neverEatAlone' },
          ] },
        { n: 'Las cartas de recomendación, ya', corto: 'Pide tus dos cartas de recomendación para la maestría, a un exjefe y a un líder técnico o profesor, con un correo corto.',
          q: 'Esslingen pide dos y una carta tarda semanas: si se piden en enero, la solicitud se atrasa.',
          c: 'Un jefe de Bosch o de ALTEN y un líder técnico o profesor. Pídela con un correo corto: para qué es, la fecha y tres cosas tuyas que te gustaría que mencione. Ofrece un borrador: casi todos lo agradecen.',
          r: [
            { t: 'propio', n: 'Tu lista de jefes y líderes', nota: 'los que te vieron trabajar, no los de más cargo' },
          ] },
        { n: 'Reactivar sin pedir nada', corto: 'Manda cinco mensajes esta semana sin pedir nada: algo útil, una felicitación o una pregunta sobre su trabajo.',
          q: 'El error común es aparecer cuando necesitas algo. Reactivar antes de necesitarlo es lo que hace que la red exista.',
          c: 'Manda cinco mensajes esta semana sin pedir <b>nada</b>: algo que leíste y le sirve a esa persona, una felicitación por un cambio de trabajo, una pregunta concreta sobre algo suyo. Tres líneas. Sin pedir café.',
          r: [
            { t: 'libro', id: 'giveAndTake' },
          ] },
        { n: 'Stuttgart antes de llegar', corto: 'Desde marzo, una videollamada al mes con alguien que ya trabaja o vive en Stuttgart.',
          q: 'Llegar con cinco personas que ya te conocen cambia el primer invierno y la búsqueda de Werkstudent.',
          c: 'Desde marzo, una videollamada al mes con alguien de Bosch o con un mexicano en Stuttgart: cómo se busca Werkstudent, qué equipos contratan, dónde vivir. Anótalo en tu hoja.',
          r: [
            { t: 'web', n: 'LinkedIn — grupos de automotive y ADAS', url: 'https://www.linkedin.com/search/results/groups/?keywords=ADAS', nota: 'donde está la gente del sector' },
          ] },
        { n: 'La pregunta que abre puertas', corto: 'Pregúntale a dos personas que trabajan donde quieres entrar: «¿qué te habría gustado saber antes de entrar?».',
          q: 'Con el Werkstudent y la maestría por delante, la conversación informal vale más que la formal.',
          c: 'A quien ya trabaja donde tú quieres, pregúntale: <b>"¿qué te habría gustado saber antes de entrar?"</b>. Casi nadie se niega y casi todos contestan algo que no sale en ninguna oferta. Úsalo con dos personas antes de tu primera entrevista de Werkstudent.',
          r: [
            { t: 'libro', id: 'designingLife', nota: 'capítulo de entrevistas de prototipo' },
          ] },
        { n: 'Una hora al mes, en el calendario', corto: 'Aparta una hora al mes para revisar tu lista de contactos y escribirle a tres personas.',
          q: 'El hábito: sin bloque fijo, esto se cae en dos semanas.',
          c: 'Un bloque de una hora al mes para revisar la lista, escribir a tres personas y añadir a los nuevos que conociste. Una hora al mes sostiene una red; cero horas la disuelve en un año.',
          r: [
            { t: 'propio', n: 'Tu propio calendario', nota: 'el bloque reservado ES el sistema; no hay nada que descargar' },
          ] },
      ],
      recursos: [
        { t: 'libro', id: 'neverEatAlone' },
        { t: 'libro', id: 'giveAndTake' },
      ],
    },
    finanzas: {
      subs: [
        { n: 'Págate primero', corto: 'El día que cobras, manda primero tu ahorro a tu cuenta de inversión y gasta solo lo que queda.',
          q: 'El ahorro que sale el día que entra el dinero es el único que sobrevive al mes. Todo lo que ahorres es para Alemania.',
          c: 'El 15 —y desde febrero también el 1—, lo que va a GBM sale en cuanto entra la quincena, antes de pagar o comprar nada. Lo que queda es lo que puedes gastar: Tu estrategia de hoy —al tocar la cifra de Deuda cara en el Plan Maestro— te dice cuánto al día.',
          r: [
            { t: 'libro', id: 'iWillTeach' },
          ] },
        { n: 'Saber a dónde se va tu dinero', corto: 'Anota cada gasto el mismo día durante 30 días y mira en qué tres categorías se te va más dinero.',
          q: 'Es la base de todo lo demás. Sin el dato real, cualquier presupuesto es una suposición y cualquier recorte es adivinar.',
          c: 'Registra <b>30 días seguidos</b>, cada gasto el mismo día en que ocurre — no el domingo de memoria, porque ahí ya perdiste los chicos, que son justo los que no ves. Cinco categorías bastan: fijos, comida, transporte, deuda y gusto. Al día 30 ordénalas de mayor a menor y mira solo las tres primeras: ahí está el 80% de lo que puedes mover. Tu app de <b>Finanzas</b> ya hace esto, no necesitas otra herramienta.',
          r: [
            { t: 'libro', id: 'cerdo', nota: 'los capítulos de gastos hormiga; es de México, habla de pesos y de CETES, no de 401k' },
          ] },
        { n: 'Presupuestar sobre ingreso variable', corto: 'Haz tu presupuesto con tu peor mes de los últimos tres, no con el promedio; lo que entre de más va directo al ahorro.',
          q: 'Tu ingreso no es uno: ALTEN es fijo y Didi cambia cada semana. Presupuestar sobre el promedio es lo que hace que un mes flojo te descuadre.',
          c: 'Presupuesta sobre el <b>mínimo de tus últimos 3 meses</b>, nunca sobre el promedio ni sobre el mejor mes. Lo que entre por encima de ese mínimo no es para gastar: va a GBM el mismo día. Con Didi, aparta cada lunes lo de la semana antes de tocarlo.',
          r: [
            { t: 'libro', id: 'profitFirst', nota: 'el método de repartir el ingreso en cuentas separadas antes de gastarlo' },
          ] },
        { n: 'Decidir con la cabeza fría', corto: 'Antes de comprar algo de más de $2,000, espera 72 horas; si todavía lo quieres, cómpralo sin culpa.',
          q: 'Casi ninguna mala decisión de dinero viene por no saber matemáticas. Viene por decidir cansado, con prisa o comparándote.',
          c: 'Ponle una regla mecánica a lo que te cuesta: <b>72 horas</b> entre querer algo de más de $2,000 y comprarlo. Si a las 72 h sigues queriéndolo, cómpralo sin culpa. Y escribe la razón de cada decisión grande antes de tomarla — al releerla en 6 meses aprendes más de ti que de cualquier libro.',
          r: [
            { t: 'libro', id: 'psychMoney', nota: '18 historias cortas; se lee en una semana' },
          ] },
        { n: 'Calcular el costo real de la deuda', corto: 'Ordena tus deudas de la tasa más alta a la más baja y paga primero la más cara.',
          q: 'La tasa que anuncian no es lo que pagas. El CAT sí, porque mete comisiones y seguros. Sin ese número no puedes comparar dos créditos ni saber si un MSI te conviene.',
          c: 'Aprende a leer el <b>CAT</b> de cada estado de cuenta y ordena tus deudas por tasa, de mayor a menor: eso es el <b>método avalancha</b> y es el que menos intereses te cuesta (la bola de nieve, de menor a mayor saldo, solo gana en motivación). Antes de un MSI, calcula qué porcentaje de tu excedente mensual te compromete y por cuántos meses: un MSI no es dinero gratis, es un pago fijo que ya vendiste.',
          r: [
            { t: 'libro', id: 'cerdo', nota: 'deuda y CAT explicados con productos mexicanos' },
          ] },
        { n: 'El colchón dentro de la cuenta', corto: 'Guarda un mes de tus gastos fijos en CETES como colchón, solo para emergencias de verdad.',
          q: 'Todo tu ahorro va a GBM, pero no todo se puede gastar en la salida: una parte es el colchón que evita volver a la tarjeta ante un imprevisto.',
          c: 'Dentro de la cuenta, un mes de tus fijos ({{fijosTotal}}) no se toca para nada que no sea una emergencia de verdad: el auto, la salud, un gasto que no podías prever. Guárdalo en CETES de 28 días: se saca en 24 a 48 horas y no vale menos el día que lo necesites.',
          r: [
            { t: 'libro', id: 'simplePath' },
          ] },
        { n: 'Leer tu propio balance', corto: 'Una vez al mes, revisa lo que tienes menos lo que debes: ese número tiene que subir cada mes.',
          q: 'Flujo (lo que entra y sale cada mes) y patrimonio (lo que tienes menos lo que debes) son dos cosas distintas. Puedes tener buen flujo y patrimonio negativo, que es donde estabas hace un año.',
          c: 'Una vez al mes anota <b>activos − pasivos</b>: efectivo + fondo + inversiones + valor del BYD, menos lo que reste de deuda. Ese número, no tu quincena, es el que tiene que subir todos los meses rumbo al millón. El Dashboard ya lo calcula en <b>patrimonio neto</b>: tu trabajo es mirarlo una vez al mes, no cada día.',
          r: [
            { t: 'libro', id: 'millionaireNextDoor', nota: 'por qué el patrimonio y el ingreso no son lo mismo' },
          ] },
        { n: 'Entender tus impuestos', corto: 'Aprende qué gastos puedes deducir, cuándo es tu declaración anual (abril) y qué avisar al SAT si te vas de México.',
          q: 'Lo que ganas fuera de la nómina tiene reglas propias. No saberlas cuesta dinero de dos formas: multas, y deducciones que dejas en la mesa.',
          c: 'Aprende tres cosas concretas: qué gastos son deducibles para una persona física (salud, lentes, colegiaturas), cuándo cae la declaración anual (abril) y qué avisas al SAT si dejas de vivir en México. Empieza por tu constancia de situación fiscal en el portal del SAT: ahí está tu situación real.',
          r: [
            { t: 'web', n: 'Portal del SAT — Guía de Personas Físicas', url: 'https://www.sat.gob.mx/personas', nota: 'gratis y es la fuente, no una interpretación' },
          ] },
      ],
      recursos: [
        { t: 'libro', id: 'iWillTeach' },
        { t: 'web', n: 'YNAB', url: 'https://www.ynab.com/', nota: 'presupuesto de asignación por sobres; de pago, con prueba gratis' },
        { t: 'libro', id: 'millionaireNextDoor' },
        { t: 'libro', id: 'psychMoney' },
      ],
    },
    inversion: {
      subs: [
        { n: 'Saber cuándo NO invertir', corto: 'Respeta el orden: primero el fondo de emergencia, después pagar las deudas caras y solo entonces invertir.',
          q: 'Invertir con deuda cara viva o sin fondo de emergencia no es ser agresivo, es perder dinero con más pasos.',
          c: 'Ordena siempre igual: <b>1) fondo de emergencia completo · 2) deuda con tasa alta a cero · 3) invertir</b>. Ninguna tasa de rendimiento razonable le gana a una tarjeta. Tu panel de "Qué invertir hoy" ya aplica esta regla a tu saldo real cada vez que lo abres — la habilidad es respetarla cuando el mercado esté subiendo y dé comezón saltarse un paso.',
          r: [
            { t: 'libro', id: 'iWillTeach', nota: 'el orden de operaciones, capítulos 1 a 4' },
          ] },
        { n: 'Conocer los instrumentos mexicanos', corto: 'Aprende tres datos de cada inversión que usas (CETES, VOO y Bitcoin): plazo, riesgo y cómo paga impuestos.',
          q: 'No puedes repartir entre cosas que no distingues. En México tienes acceso directo a más de lo que parece, y cada instrumento tiene un para qué distinto.',
          c: 'Aprende de cada uno tres datos: <b>plazo, riesgo y cómo se le cobran impuestos</b>. Empieza por los que ya usas — CETES a 28 días (cetesdirecto, sin comisión), un índice como VOO vía GBM, y BTC — y añade solo lo que entiendas: Bonos M, Udibonos si te preocupa la inflación, y tu Afore, que es inversión aunque no lo parezca y casi nadie revisa.',
          r: [
            { t: 'web', n: 'Banxico — Educación financiera', url: 'https://educa.banxico.org.mx/', nota: 'fuente oficial, sin nadie vendiéndote nada' },
            { t: 'web', n: 'cetesdirecto', url: 'https://www.cetesdirecto.com/', nota: 'donde se compran los CETES sin intermediario' },
          ] },
        { n: 'Interés compuesto y horizonte', corto: 'Calcula con tus números cuánto juntarías para 2030 invirtiendo cada mes, y cuánto pierdes si te saltas un año.',
          q: 'Es el motor de todo. Y lo que lo mueve no es la tasa, es el <b>tiempo</b>: cada año que pospones cuesta más que cualquier punto extra de rendimiento.',
          c: 'Haz el cálculo una vez con tus números reales, no con ejemplos de libro: lo que puedes aportar al mes, un rendimiento conservador (8-10% anual nominal en México) y los años hasta 2030. Repítelo restando un año de aportaciones y compara — ver esa diferencia en pesos es lo que hace que ya no te saltes un mes.',
          r: [
            { t: 'libro', id: 'littleBook', nota: 'corto y va directo al punto' },
          ] },
        { n: 'Escribir tu asignación objetivo', corto: 'Escribe en porcentajes cómo vas a repartir tu dinero (CETES, un índice y Bitcoin): cada compra solo completa lo que falte.',
          q: '<b>Esta es la que te falta</b>, y es la razón real de que cada lunes decidas desde cero. Una asignación es un reparto en porcentajes, escrito una sola vez, que decide por ti cuando el mercado te esté gritando.',
          c: 'Define <b>tres porcentajes que sumen 100</b>: renta fija (CETES), índice global o S&P 500, y una porción chica de riesgo alto (BTC). Escríbelos con fecha en un solo renglón y guárdalos. La regla que evita el error clásico: en lo volátil no pongas más de lo que puedas ver caer un 50% sin tocarlo. Cada compra del lunes deja de ser una decisión y pasa a ser rellenar el porcentaje que quedó abajo.',
          r: [
            { t: 'libro', id: 'bogleheads', nota: 'capítulo de asset allocation' },
            { t: 'libro', id: 'cerdoInv' },
          ] },
        { n: 'Aportar periódicamente y automatizarlo', corto: 'Invierte el mismo monto el mismo día cada vez; súbelo cuando ganes más y nunca lo bajes por cómo va el mercado.',
          q: 'Aportar lo mismo cada periodo (DCA) compra más barato cuando el mercado cae y menos caro cuando sube, sin que tengas que adivinar. Y quita la decisión de en medio.',
          c: 'Fija un <b>monto y un día</b> — tú ya tienes el bloque de GBM de los lunes y los $1,500 a CETES el día 15. Súbelo cuando suba tu ingreso, nunca lo bajes por cómo se vea el mercado. La prueba de que funciona es aburrida a propósito: 12 meses seguidos sin saltarte uno.',
          r: [
            { t: 'libro', id: 'simplePath' },
          ] },
        { n: 'Ver las comisiones antes que el rendimiento', corto: 'Antes de comprar, compara comisiones: el mismo índice puede costar 0.03 % o 1.5 % al año.',
          q: 'El rendimiento no lo controlas; el costo sí. Un 1% anual de comisión, sostenido 20 años, se come cerca de una quinta parte de lo que habrías acumulado.',
          c: 'De cada instrumento busca tres costos: <b>comisión de administración</b> (anual, el que más pesa), <b>comisión por operación</b> y el <b>spread</b> de compra-venta si es en dólares o cripto. Compara el mismo índice en dos casas antes de comprarlo: la diferencia entre 0.03% y 1.5% anual es la diferencia entre llegar y no llegar al millón en 2030.',
          r: [
            { t: 'libro', id: 'randomWalk', nota: 'por qué los costos predicen mejor que las estrellas de un fondo' },
          ] },
        { n: 'Aguantar sin vender', corto: 'Escribe hoy qué harás si tus inversiones caen 30 %, y revisa los precios solo una vez por semana.',
          q: 'La diferencia entre lo que rinde un fondo y lo que gana la gente que lo tiene se explica casi entera por comprar arriba y vender abajo. Es la habilidad que más dinero vale y la única que no se estudia, se entrena.',
          c: 'Escribe <b>hoy</b>, con el mercado tranquilo, qué vas a hacer si tu cartera cae 30% — y déjalo junto a la asignación. En la caída no se decide, se ejecuta lo que ya está escrito. Regla de higiene: revisa precios una vez por semana, en tu bloque del lunes, y no vuelvas a abrir la app hasta el siguiente.',
          r: [
            { t: 'libro', id: 'psychMoney' },
            { t: 'libro', id: 'intelligentInvestor', nota: 'los capítulos 8 y 20, que son los que Buffett señala' },
          ] },
        { n: 'Rebalancear una vez al año', corto: 'Una vez al año, vuelve a tu reparto ideal metiendo el dinero nuevo en lo que quedó abajo.',
          q: 'Con el tiempo, lo que sube se lleva más peso del que le asignaste y tu cartera termina siendo más arriesgada de lo que decidiste.',
          c: 'Una vez al año, o cuando algo se desvíe más de <b>5 puntos</b> de su porcentaje, vuelve a los números que escribiste. Lo más fácil: no vendas nada, dirige las aportaciones nuevas a lo que quedó abajo hasta emparejar. Rebalancear obliga a vender caro y comprar barato, que es justo lo contrario de lo que pide el instinto.',
          r: [
            { t: 'libro', id: 'bogleheads' },
          ] },
        { n: 'Saber qué impuestos pagas al invertir', corto: 'Aprende cómo pagan impuestos tus inversiones y guarda en una carpeta tus constancias anuales de GBM y Cetesdirecto.',
          q: 'El rendimiento que ves no es el que te queda. En México hay retención sobre intereses y un ISR distinto para ganancias de bolsa y para cripto.',
          c: 'Aprende cómo tributa cada cosa que tienes: la retención anual sobre el capital en instrumentos de deuda, el <b>10% sobre la ganancia</b> en enajenación de acciones en bolsa, y que la ganancia por cripto se acumula a tus demás ingresos. Guarda tus constancias anuales de GBM y cetesdirecto en la misma carpeta desde ahora: en abril valen oro.',
          r: [
            { t: 'web', n: 'Portal del SAT — tus constancias', url: 'https://www.sat.gob.mx/personas', nota: 'las constancias de tus instituciones financieras llegan aquí' },
          ] },
      ],
      recursos: [
        { t: 'libro', id: 'intelligentInvestor' },
        { t: 'libro', id: 'littleBook' },
        { t: 'libro', id: 'randomWalk' },
        { t: 'libro', id: 'oneUp' },
      ],
    },
    datos: {
      subs: [
        { n: 'Python y pandas con tus datos', corto: 'Haz el curso gratis de Python y pandas de Kaggle (2 a 3 horas) y úsalo para analizar tus propios gastos.',
          q: 'El hueco es de herramienta, no de criterio: ya sabes qué preguntarle a los datos.',
          c: 'Haz los módulos de Python y pandas de Kaggle Learn (2 a 3 horas) y, en paralelo, carga tus gastos de Finanzas en un cuaderno: cuánto gastas por categoría y por semana.',
          r: [
            { t: 'curso', n: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', nota: 'módulos cortos y gratis de Python y pandas, con cuaderno incluido' },
          ] },
        { n: 'Un tablero que responda una pregunta', corto: 'Arma un tablero en Looker Studio que responda una sola pregunta: ¿en qué semana del mes se te va el dinero?',
          q: 'Un tablero sin pregunta es decoración.',
          c: 'Arma en Looker Studio un tablero que conteste una sola pregunta: ¿en qué semana del mes se me va el dinero? Después repítelo con otros datos tuyos: el segundo tarda la mitad, y esa caída es la señal de que ya es hábito.',
          r: [
            { t: 'web', n: 'Google Looker Studio', url: 'https://lookerstudio.google.com/', nota: 'para montar el dashboard de gastos sin instalar nada' },
          ] },
        { n: 'Contar lo que dicen los datos', corto: 'Toma un resultado de pruebas de tu trabajo y explícalo con una gráfica y tres frases.',
          q: 'En una revisión de pruebas, convence quien explica el dato, no quien lo tiene.',
          c: 'Toma un resultado de pruebas de tu trabajo —sin datos del cliente— y cuéntalo en una gráfica y tres frases. Pídele a alguien que te diga qué entendió.',
          r: [
            { t: 'libro', id: 'storytellingData' },
          ] },
        { n: 'SQL, diez minutos al día', corto: 'Haz 10 minutos diarios de ejercicios de SQL en SQLZoo durante 30 días, escribiendo tú cada consulta.',
          q: 'SQL se olvida si no se usa: diez minutos diarios le ganan a tres horas al mes.',
          c: 'Treinta días seguidos de ejercicios en SQLZoo. Teclea cada consulta; no la copies.',
          r: [
            { t: 'practica', n: 'SQLZoo', url: 'https://sqlzoo.net/wiki/SQL_Tutorial', nota: 'ejercicios cortos que corren en el navegador' },
          ] },
        { n: 'Teclear, no mirar', corto: 'Por cada video tutorial que veas, haz el mismo ejercicio con tus propios datos.',
          q: 'Ver tutoriales sin escribir código en paralelo se te olvida en una semana.',
          c: 'Por cada video, el mismo ejercicio con tus datos. Si no lo tecleaste, no lo aprendiste.',
          r: [
            { t: 'libro', id: 'pythonData', nota: 'el libro de pandas escrito por quien lo creó' },
          ] },
      ],
      recursos: [
        { t: 'curso', n: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', nota: 'módulos cortos y gratis de Python y pandas, con cuaderno incluido' },
        { t: 'curso', n: 'Google Data Analytics Certificate', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', nota: 'el certificado completo; se puede auditar gratis' },
        { t: 'libro', id: 'storytellingData' },
        { t: 'web', n: 'Google Looker Studio', url: 'https://lookerstudio.google.com/', nota: 'para montar el dashboard de gastos sin instalar nada' },
      ],
    },
    mente: {
      subs: [
        { n: 'Lo alto no se mantiene solo', corto: 'Anota las tres cosas que te mantienen bien (por ejemplo dormir, entrenar y tener un plan) y cuál dejas primero cuando el mes se complica: esa es la que debes cuidar.',
          q: 'Estás en <b>85</b>: es tu punto más fuerte. La trampa de lo alto es creer que ya no necesita mantenimiento.',
          c: 'Escribe qué tres cosas te sostienen hoy — dormir, entrenar, tener un plan— y cuál de las tres es la primera que se cae cuando el mes se pone duro. Esa es la que hay que blindar, no las otras dos.',
          r: [
            { t: 'libro', id: 'atomicHabits', nota: 'capítulo de sistemas frente a metas' },
          ] },
        { n: 'El sueño es la palanca, no la fuerza de voluntad', corto: 'Apaga la luz a tu hora de dormir dos semanas seguidas y fíjate cómo cambia tu energía en el gimnasio.',
          q: 'Tu rutina te da {{horasSueno}} de sueño, justo el mínimo: cada noche que la app se alarga caes debajo, y a ese nivel la mitad de lo que parece falta de disciplina es falta de sueño.',
          c: 'Cumple la luz fuera de las {{horaDormir}} dos semanas seguidas: lo que no cupo en la media hora de la app, se parte para mañana. Mide el cambio en la sesión de gimnasio y en los bloques del día: se nota antes en el gimnasio.',
          r: [
            { t: 'libro', id: 'whySleep' },
          ] },
        { n: 'Terapia antes de irte', corto: 'Empieza terapia antes de irte: cuatro sesiones para prepararte para la soledad, el estrés y el sueño.',
          q: 'Llegar con herramientas es más fácil que construirlas solo en febrero, con ocho horas de luz.',
          c: 'Empieza terapia aquí en noviembre: cuatro sesiones para armar tu plan de soledad, estrés y sueño. Allá, el Studierendenwerk da asesoría psicológica gratis a estudiantes.',
          r: [
            { t: 'propio', n: 'Un terapeuta, aquí', nota: 'antes de la mudanza, no después' },
          ] },
        { n: 'La deuda pesa en la cabeza, no sólo en la cartera', corto: 'Una vez al mes, mira cuánto bajó tu deuda: ver el avance la vuelve un problema con fecha de fin.',
          q: 'Es tu ruido de fondo. Y es el que hace que un mal día parezca un mal año.',
          c: 'Una vez al mes, mira el número real y qué bajó — el Dashboard ya lo calcula. Ver un abono real convierte la deuda de <b>amenaza difusa</b> en <b>problema con plazo</b>, que es una carga mucho más ligera de llevar.',
          r: [
            { t: 'propio', n: 'Tu propio Dashboard', nota: 'la pantalla de Finanzas' },
          ] },
        { n: 'Cortar la rumia con una acción pequeña', corto: 'Cuando lleves 10 minutos dándole vueltas a algo, haz la acción más pequeña que lo mueva: un mensaje, una línea, una búsqueda.',
          q: 'Pensar mucho un problema que no se mueve no es analizar: es girar.',
          c: 'Cuando notes que llevas 10 minutos dando vueltas a lo mismo, haz <b>la cosa más pequeña</b> que lo mueva: un mensaje, una línea, una búsqueda. No la solución completa. La acción corta la rumia mejor que cualquier razonamiento.',
          r: [
            { t: 'libro', id: 'practicing' },
          ] },
        { n: 'Una revisión corta cada domingo', corto: 'Cada domingo, 10 minutos por escrito: qué salió bien, qué falló y qué cambiarás la próxima semana.',
          q: 'El hábito que sostiene el 85.',
          c: 'Diez minutos el domingo: qué salió bien esta semana, qué se cayó y qué es lo único que cambio la que viene. Escrito, no pensado. Escribirlo es lo que hace que la semana siguiente no sea igual que la anterior.',
          r: [
            { t: 'propio', n: 'Tu propio cuaderno', nota: 'o la pantalla de Metas, si prefieres tenerlo en la app' },
          ] },
      ],
      recursos: [
        { t: 'libro', id: 'atomicHabits' },
        { t: 'libro', id: 'whySleep' },
      ],
    },
    liderazgo: {
      subs: [
        { n: 'Dónde está tu techo', corto: 'Anota las tres conversaciones difíciles que llevas evitando y qué dirías en cada una, en una frase.',
          q: 'Estás en <b>80</b>: alto. Lo que separa 80 de 90 no es técnica, es <b>hacerlo cuando cuesta</b> — la conversación incómoda que pospones.',
          c: 'Apunta las tres conversaciones que llevas evitando (en ALTEN, en un proyecto, en casa). No las tengas todavía: sólo escribe qué dirías en una frase. Ver las tres juntas te dice si tu techo es de valentía o de claridad.',
          r: [
            { t: 'libro', id: 'crucial' },
          ] },
        { n: 'Separar el hecho de la historia', corto: 'En una de esas conversaciones, separa en dos columnas lo que pasó y lo que tú interpretaste, y empieza solo por lo que pasó.',
          q: 'Casi todo conflicto viene de contar la historia como si fuera el hecho.',
          c: 'Para una de esas tres conversaciones, escribe en dos columnas: <b>lo que pasó</b> (grabable en vídeo) y <b>lo que tú concluiste</b>. Casi siempre la segunda columna es larga y la primera cabe en dos líneas. Empieza la conversación sólo por la primera.',
          r: [
            { t: 'libro', id: 'crucial', nota: 'capítulos 4 y 5, los hechos frente a las historias' },
          ] },
        { n: 'Liderar sin el puesto', corto: 'Arregla algo que esté roto en tu equipo y que nadie haya tomado, y cuéntalo en una frase.',
          q: 'No tienes gente a cargo, y ahí está la oportunidad: el liderazgo que se ve en una entrevista es el que ejerces sin autoridad.',
          c: 'Elige algo que esté roto en tu equipo y que nadie ha tomado —una documentación, un proceso de revisión, un test que siempre falla—. Arréglalo y cuéntalo en una frase: es lo que te van a preguntar en cada entrevista de Werkstudent cuando digan "háblame de una vez que lideraste".',
          r: [
            { t: 'libro', id: 'staffPath' },
          ] },
        { n: 'Dar retroalimentación que no duela', corto: 'Da tu opinión en tres partes: qué pasó, qué efecto tuvo y qué propones. Pruébalo esta semana con algo pequeño.',
          q: 'La mitad del liderazgo real es decirle a alguien algo que no quiere oír sin romper la relación.',
          c: 'Fórmula de tres partes: qué pasó (hecho), qué efecto tuvo (concreto), qué propones. Sin "siempre" ni "nunca". Pruébalo una vez esta semana con algo pequeño — la práctica en cosas pequeñas es lo que te deja usarlo en las grandes.',
          r: [
            { t: 'libro', id: 'radicalCandor' },
          ] },
        { n: 'Una conversación pendiente al mes', corto: 'Cada mes, ten una de las conversaciones que evitas, agendada como cualquier cita.',
          q: 'El hábito que mantiene el 80 y lo sube.',
          c: 'Una de las conversaciones que evitas, al mes. Una. No más, porque quemarse tampoco es liderar. Apúntala en el calendario como cualquier otra cita.',
          r: [
            { t: 'propio', n: 'Tu lista de las tres', nota: 'revisada cada mes; vive donde tú decidas, no en una app' },
          ] },
      ],
      recursos: [
        { t: 'libro', id: 'crucial' },
        { t: 'libro', id: 'staffPath' },
      ],
    },
    copy: {
      subs: [
        { n: 'Qué te falta, exactamente', corto: 'Revisa tus últimos cinco mensajes importantes y marca en cuáles pediste algo concreto al final.',
          q: 'Estás en <b>55</b>: escribes claro. Lo que falta no es redacción, es <b>pedir algo</b> al final de lo que escribes.',
          c: 'Toma los últimos 5 mensajes largos que mandaste — correo a un reclutador, mensaje a un cliente, tu perfil de LinkedIn— y subraya la frase donde pides algo concreto. Si en tres de los cinco no hay ninguna, ese es tu hueco entero.',
          r: [
            { t: 'libro', id: 'everybody' },
          ] },
        { n: 'Una promesa por texto', corto: 'Antes de escribir, anota en una línea quién lo leerá y qué quieres que haga. Empieza por tu perfil de LinkedIn.',
          q: 'Un texto que promete tres cosas no promete ninguna. Es el error más caro y el más fácil de arreglar.',
          c: 'Antes de escribir nada, apunta en una línea: <b>quién lo lee</b> y <b>qué quiero que haga</b>. Si no cabe en una línea, todavía no sabes qué estás escribiendo. Aplica esto primero a tu perfil de LinkedIn, que es el que más gente ve.',
          r: [
            { t: 'libro', id: 'blyCopy' },
          ] },
        { n: 'Reescribe tu perfil de LinkedIn', corto: 'Reescribe tu perfil de LinkedIn en inglés: qué resuelves, un resultado con número y qué estás buscando.',
          q: 'Es lo primero que ve un reclutador de Stuttgart, y hoy describe un puesto, no un resultado.',
          c: 'Titular en inglés con lo que resuelves y lo que buscas: «Validation engineer · HIL & ADAS · open to Werkstudent in the Stuttgart region from Oct 2027». En el "acerca de", tres líneas: qué haces, un resultado con número y cómo contactarte.',
          r: [
            { t: 'web', n: 'LinkedIn — perfiles de ingenieros senior de automotive', url: 'https://www.linkedin.com/search/results/people/?keywords=senior%20automotive%20software%20engineer', nota: 'para calibrar el tono, no para copiar' },
          ] },
        { n: 'El correo frío de 5 líneas', corto: 'Escribe tres correos de cinco líneas a gente que no te conoce: por qué a esa persona, quién eres, un logro y qué le pides.',
          q: 'Es el formato que más te va a servir este año: para reclutadores, para clientes de proyectos y para pedir referencias.',
          c: 'Cinco líneas: por qué le escribes a esa persona (algo suyo, no genérico), qué haces tú en una frase, un resultado concreto, qué le pides, y una salida fácil ("si no es el momento, sin problema"). Escribe tres esta semana y mándalos.',
          r: [
            { t: 'libro', id: 'coldEmail' },
          ] },
        { n: 'Leer en voz alta antes de enviar', corto: 'Lee en voz alta todo mensaje importante antes de enviarlo: donde te trabes, sobra algo.',
          q: 'Es el hábito que sostiene todo lo anterior y cuesta 30 segundos.',
          c: 'Antes de dar enviar a cualquier cosa que importe, léela en voz alta. Donde te tropieces, ahí sobra algo. Es el filtro más barato que existe y detecta el 80% de lo que un editor te marcaría.',
          r: [
            { t: 'libro', id: 'onWriting', nota: 'capítulos 2 a 5' },
          ] },
      ],
      recursos: [
        { t: 'libro', id: 'everybody' },
        { t: 'libro', id: 'blyCopy' },
      ],
    },
    ventas: {
      subs: [
        { n: 'Vender lo que no usas a su precio', corto: 'Vende algo que no uses: fotos con luz de día, un precio 10 % arriba de anuncios iguales y contesta en menos de una hora.',
          q: 'Es la venta que hoy sí rinde: cada peso va a GBM.',
          c: 'Fotos con luz de día, el precio de tres anuncios iguales y un 10% arriba para tener margen al negociar. Contesta en menos de una hora: en Marketplace vende el primero que contesta.',
          r: [
            { t: 'libro', id: 'neverSplit' },
          ] },
        { n: 'El seguimiento es la venta', corto: 'A quien preguntó y no compró, escríbele de nuevo a los 1, 3 y 7 días, sin presionar.',
          q: 'La mayoría de las ventas cierran entre el tercer y el quinto contacto, no en el primero.',
          c: 'A quien preguntó y no compró: seguimiento a los días 1, 3 y 7, sin presionar. Anota quién respondió y en qué contacto.',
          r: [
            { t: 'libro', id: 'influence' },
          ] },
        { n: 'Negociar tu sueldo en euros', corto: 'Antes de negociar tu sueldo en Alemania, investiga cuánto paga el puesto y fija tu mínimo; nunca digas tu número primero.',
          q: 'Una buena negociación en tu primer empleo en Alemania vale más que cualquier venta de este año.',
          c: 'Antes de cualquier oferta, el rango del puesto en la región y tu número mínimo, por escrito. Nunca digas tu número primero: pregunta el rango del puesto.',
          r: [
            { t: 'libro', id: 'neverSplit' },
          ] },
        { n: 'Una oferta que se pueda comprar', corto: 'Escribe en una frase la oferta del negocio de tu papá: para quién es, qué resultado da y en cuánto tiempo.',
          q: 'Cuando el negocio vuelva —en la Fase 4—, se empieza por la oferta, no por el anuncio.',
          c: 'Escribe la oferta del negocio de tu papá en una frase: para quién, qué resultado y en cuánto tiempo. Si no cabe en una frase, no está terminada.',
          r: [
            { t: 'libro', id: 'offers100m' },
          ] },
      ],
      recursos: [
        { t: 'libro', id: 'influence' },
        { t: 'libro', id: 'offers100m' },
        { t: 'libro', id: 'neverSplit' },
        { t: 'yt', n: 'Alex Hormozi', url: 'https://www.youtube.com/@AlexHormozi', nota: 'su canal es gratis y vale más que muchos cursos de pago' },
      ],
    },
    marketing: {
      subs: [
        { n: 'Dejar el negocio en piloto automático', corto: 'Deja listos 12 posts con foto, texto y fecha para que tu papá pueda publicar sin ti.',
          q: 'Tu papá tiene que poder publicar sin ti desde febrero.',
          c: 'Doce posts listos con su foto, su texto y su fecha; el dossier y el QR de WhatsApp en sus manos. Publica uno con él para que vea cómo se hace.',
          r: [
            { t: 'propio', n: 'Las plantillas de Posts', nota: 'ya están en el proyecto; solo falta programarlas' },
          ] },
        { n: 'Una métrica antes de gastar', corto: 'Anota vistas, comentarios y mensajes de cada post, y repite el formato que más mensajes trae.',
          q: 'Sin medir, no sabes si un post funciona o solo se ve bien.',
          c: 'De cada post anota vistas, comentarios y mensajes. Al mes, repite el formato que más mensajes trajo y deja de hacer el que menos.',
          r: [
            { t: 'libro', id: 'leads100m' },
          ] },
        { n: 'Un canal a la vez', corto: 'Publica cuatro semanas seguidas en la red donde ya están los clientes de tu papá antes de abrir otra.',
          q: 'Tres redes a medias no traen un cliente.',
          c: 'Elige el canal donde ya están los clientes de tu papá y publica ahí cuatro semanas seguidas antes de abrir otro.',
          r: [
            { t: 'curso', n: 'HubSpot Academy', url: 'https://academy.hubspot.com/', nota: 'gratis y con certificado; lo de inbound y correo es lo mejor' },
          ] },
      ],
      recursos: [
        { t: 'curso', n: 'Google Skillshop', url: 'https://skillshop.exceedlms.com/', nota: 'lo que antes era Digital Garage; certificaciones de Ads y Analytics' },
        { t: 'curso', n: 'HubSpot Academy', url: 'https://academy.hubspot.com/', nota: 'gratis y con certificado; lo de inbound y correo es lo mejor' },
        { t: 'curso', n: 'Meta Blueprint', url: 'https://www.facebook.com/business/learn', nota: 'para anuncios en Facebook e Instagram' },
        { t: 'libro', id: 'leads100m' },
      ],
    },
  };

  /* ── Lo que enseña cada paso de las rutas, en su ventana ──
     Adán, 26-oct-2026: "mejora el contenido de todos, más cosas gráficas, más explicaciones, más fotos".
     Por habilidad y por el nombre del paso (`n`): la foto, en Dashboard/fotos-habilidades/, con su crédito (`cred`:
     autor · fuente · licencia); el pie que la ata al paso; tres cifras grandes, y «En detalle»: cómo se hace, con un
     «Tu caso:» y un «⚠️ Error común:», que la ventana pone en sus cajas. Se mezcla en cada paso al cargar; el control
     45 del verificador avisa si a un paso le falta lo suyo, si una foto no está en disco o si un detalle se quedó sin
     paso. Las cifras que viven en el maestro van como {{marcador}}. */
  const APRENDIZAJE_DETALLE = {
    "ia": {
      "El syllabus, capítulo por capítulo": {
        "foto": "ia-1.jpg",
        "cred": "Alex E. Proimos · Flickr · CC BY-NC 2.0",
        "pie": "Una sesión, un capítulo: el syllabus se lee para contestar con sus palabras, no para entenderlo a grandes rasgos.",
        "cifras": [
          [
            "5",
            "capítulos del syllabus"
          ],
          [
            "16 de 46",
            "puntos vale el capítulo 2"
          ],
          [
            "1",
            "capítulo por sesión"
          ]
        ],
        "list": [
          "<b>Lee con un objetivo:</b> antes de abrir el capítulo, mira sus objetivos de aprendizaje; cada pregunta del examen sale de uno de ellos.",
          "<b>Cierra el libro y escribe:</b> cinco ideas en una tarjeta, sin mirar. Lo que no puedes escribir de memoria todavía no lo sabes, aunque lo hayas subrayado.",
          "<b>Usa sus palabras:</b> el examen premia el término exacto del syllabus —<i>few-shot</i>, <i>prompt chaining</i>, <i>hallucination</i>—, no tu forma de decirlo en el trabajo.",
          "Tu caso: los capítulos, en orden y con el que toca leer resaltado, están en la ventana del Examen ISTQB CT-GenAI; la pregunta del día repasa lo que lees.",
          "⚠️ Error común: releer el capítulo en vez de contestar preguntas. Releer se siente productivo; recordar sin mirar es lo que fija."
        ]
      },
      "El simulacro como termómetro": {
        "foto": "ia-2.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "El reloj no miente: saber que sabes no es lo mismo que contestar todo el examen a tiempo.",
        "cifras": [
          [
            "34 de 46",
            "para presentar, dos veces seguidas"
          ],
          [
            "30",
            "el corte para aprobar"
          ],
          [
            "1",
            "simulacro completo por semana"
          ]
        ],
        "list": [
          "<b>Con reloj y de una sentada:</b> un simulacro en pedazos no te dice si llegas al final con la cabeza fresca.",
          "<b>Cada fallo a la lista:</b> la pregunta, su sección del syllabus y por qué elegiste la otra. La lista de fallos es tu temario de la semana siguiente.",
          "<b>Mira la tendencia, no un número:</b> dos simulacros seguidos arriba de 34 valen más que uno de 40 después de uno de 28.",
          "Tu caso: el simulacro vive en Mis Metas y guarda cada intento; Coach · Habilidades te dice cuántos llevas y si ya cumples para presentar.",
          "⚠️ Error común: repetir el mismo simulacro hasta aprenderte las respuestas. Sube el número y no sube lo que sabes: alterna los dos bancos de preguntas."
        ]
      },
      "Una prueba con IA que puedas enseñar": {
        "foto": "ia-3.jpg",
        "cred": "jaguarmena · Flickr · CC BY 2.0",
        "pie": "Lo que se enseña en una entrevista de validación: un requisito real, lo que propuso la IA y lo que tú corregiste.",
        "cifras": [
          [
            "1",
            "requisito: un frenado de emergencia"
          ],
          [
            "20",
            "casos que le pides al modelo"
          ],
          [
            "1",
            "README que dice cuáles estaban mal"
          ]
        ],
        "list": [
          "<b>Empieza por el requisito, no por el modelo:</b> escribe en dos líneas qué debe hacer la función —frenar sola ante un obstáculo, por ejemplo— y con qué entradas.",
          "<b>Revisa los casos uno por uno:</b> marca los correctos, los repetidos, los imposibles y los que faltan —límites, falla de un sensor, lluvia—. Esa tabla es el trabajo.",
          "<b>Cuenta lo que encontraste:</b> en el README, en inglés, cuántos casos útiles dio el modelo, qué se le escapó y qué instrucción mejoró el resultado.",
          "Tu caso: llevas seis años probando ADAS y HIL; pocos candidatos a un Werkstudent tienen un ejemplo tan cercano a lo que hace el equipo.",
          "⚠️ Error común: publicar lo que generó el modelo sin tu revisión. Lo que vale es tu criterio sobre la salida, no la salida."
        ]
      },
      "Automatiza una tarea tuya": {
        "foto": "ia-4.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Lo que repites cada semana es lo primero que se automatiza: libera horas y te da un caso real que contar.",
        "cifras": [
          [
            "1",
            "tarea que repites cada semana"
          ],
          [
            "< 1 h",
            "para automatizarla"
          ],
          [
            "× 4",
            "veces que te la ahorras al mes"
          ]
        ],
        "list": [
          "<b>Elige por frecuencia:</b> lo que haces cada semana con los mismos pasos —pasar gastos, armar un reporte, renombrar archivos— rinde más que lo que haces una vez al año.",
          "<b>Escribe los pasos a mano primero:</b> si no los puedes listar, no los puedes automatizar. La lista es la mitad del trabajo.",
          "<b>Mide el antes y el después:</b> minutos por vez y veces por mes. Ese número es lo que cuentas en la entrevista.",
          "Tu caso: ya automatizaste este Dashboard con Claude Code; lo siguiente es algo de tu trabajo que no toque datos de un cliente.",
          "⚠️ Error común: pasar una tarde automatizando algo que te quita cinco minutos al año. Si no se repite, no se automatiza."
        ]
      },
      "Lo que no se le delega a la IA": {
        "foto": "ia-5.jpg",
        "cred": "stockcatalog · Flickr · CC BY 2.0",
        "pie": "La IA propone; tú respondes por lo que se entrega. Revisar con criterio es parte del trabajo, no un extra.",
        "cifras": [
          [
            "0",
            "datos de un cliente en un modelo público"
          ],
          [
            "100 %",
            "de las salidas, revisadas"
          ],
          [
            "3",
            "riesgos: alucinación, datos y sesgo"
          ]
        ],
        "list": [
          "<b>Alucinaciones:</b> un modelo inventa con la misma seguridad con la que acierta. Todo dato, cita o número que te dé se comprueba en su fuente.",
          "<b>Datos:</b> lo que pegas en un modelo público puede salir de tu control. Código, requisitos y resultados de un cliente solo van a herramientas aprobadas por la empresa.",
          "<b>Sesgo:</b> un modelo repite los patrones con los que se entrenó; en pruebas, eso es casos parecidos entre sí y huecos en los raros.",
          "Tu caso: antes de usar IA con algo de ALTEN, pregunta qué herramientas están permitidas; esa pregunta, hecha a tiempo, te cuida el trabajo.",
          "⚠️ Error común: revisar la salida de la IA con menos cuidado que el trabajo de un compañero porque «se ve bien». Se ve bien siempre."
        ]
      }
    },
    "ingles": {
      "Tu nivel real es el de hablar bajo presión": {
        "foto": "ingles-1.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "El micrófono es el diagnóstico más honesto: dos minutos sin guion dicen más que el certificado.",
        "cifras": [
          [
            "2 min",
            "grabándote sin guion"
          ],
          [
            "B2",
            "lo que dice tu IELTS 6.0"
          ],
          [
            "0",
            "pausas largas: la meta"
          ]
        ],
        "list": [
          "<b>Graba sin preparar:</b> pon el teléfono a grabar y contesta «tell me about yourself» de corrido, sin notas.",
          "<b>Escúchate con una hoja:</b> anota cada pausa larga, cada «eh» y cada vez que se nota que traduces del español. Esos tres números son tu nivel real.",
          "<b>Repite la misma pregunta una semana después:</b> si bajaron las pausas, subiste; el certificado no te lo va a decir.",
          "Tu caso: lees y escribes inglés técnico a diario; el hueco está en hablar sin preparar, justo lo que piden la maestría y el Werkstudent.",
          "⚠️ Error común: medirte por lo que entiendes. Entender es el oído; una entrevista evalúa lo que dices."
        ]
      },
      "La carta de motivación de Esslingen": {
        "foto": "ingles-2.jpg",
        "cred": "Wim Mulder · Flickr · CC BY-NC-SA 2.0",
        "pie": "Tu primera entrevista es por escrito: una página que decide si vales una plaza.",
        "cifras": [
          [
            "1",
            "página"
          ],
          [
            "3",
            "párrafos: por qué, qué traes, qué sigue"
          ],
          [
            "1",
            "borrador por semana"
          ]
        ],
        "list": [
          "<b>Primero, por qué ese programa:</b> Automotive Systems en Esslingen, en la región de Stuttgart y su industria; nada que sirva para cualquier universidad.",
          "<b>Después, lo que traes:</b> HIL, ADAS y validación en Ford, Continental, Bosch y ALTEN, con un resultado concreto por empresa.",
          "<b>Al final, qué quieres después:</b> el Werkstudent y el puesto al que apuntas; el comité busca a alguien que sabe a dónde va.",
          "Tu caso: tus años en la industria son tu ventaja frente a recién egresados; la carta tiene que dejarlo claro en los primeros diez segundos.",
          "⚠️ Error común: contar tu vida en orden cronológico. El comité lee decenas: lo importante va primero."
        ]
      },
      "El vocabulario de TU trabajo primero": {
        "foto": "ingles-3.jpg",
        "cred": "This is Engineering image library · Flickr · CC BY-NC-ND 2.0",
        "pie": "No necesitas inglés general: necesitas explicar tus decisiones técnicas sin buscar la palabra.",
        "cifras": [
          [
            "40",
            "términos de tu trabajo"
          ],
          [
            "90 %",
            "de tu jornada cubierta"
          ],
          [
            "3",
            "frases por término"
          ]
        ],
        "list": [
          "<b>Saca la lista de tu día real:</b> reuniones, correos y revisiones de ALTEN; anota las palabras que dudarías al decir en voz alta.",
          "<b>Practica frases, no palabras:</b> «the trade-off here is…», «this edge case fails when…», «the root cause was…». La frase entera es lo que sale bajo presión.",
          "<b>Dilas en voz alta en el coche:</b> tres frases por término; repetir entrena la boca, que es donde está tu hueco.",
          "Tu caso: el inglés que te van a pedir es el de explicar arquitectura, sensores y decisiones técnicas, no el de un examen general.",
          "⚠️ Error común: estudiar listas de vocabulario general. Cuarenta términos tuyos rinden más que mil palabras de libro."
        ]
      },
      "Simulacros de entrevista de verdad": {
        "foto": "ingles-4.jpg",
        "cred": "Alan Cleaver · Flickr · CC BY 2.0",
        "pie": "Ensayar en voz alta es la única forma de que la entrevista real no sea la primera.",
        "cifras": [
          [
            "1",
            "sesión a la semana"
          ],
          [
            "3",
            "preguntas que siempre salen"
          ],
          [
            "2 min",
            "por respuesta"
          ]
        ],
        "list": [
          "<b>Las tres que siempre salen:</b> un proyecto del que estés orgulloso, un conflicto técnico y por qué esa empresa. Prepara los puntos, nunca el texto.",
          "<b>Contesta con estructura:</b> la situación, lo que hiciste tú y el resultado con un número, en dos minutos.",
          "<b>Grábalo y escúchalo:</b> en cada sesión, una sola cosa a corregir para la siguiente.",
          "Tu caso: el Werkstudent y la maestría empiezan con una entrevista en inglés; llegar con cuatro simulacros hechos cambia cómo te ves.",
          "⚠️ Error común: memorizar respuestas. Se nota en la primera repregunta y te quedas sin nada."
        ]
      },
      "Pensar en inglés durante el manejo": {
        "foto": "ingles-5.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Tus horas al volante son tu bloque más grande de tiempo libre: el coche es tu laboratorio de idiomas.",
        "cifras": [
          [
            "1",
            "frase repetida en voz alta por trayecto"
          ],
          [
            "0",
            "pantallas: solo audio"
          ],
          [
            "2",
            "cosas a la vez: la habilidad y el idioma"
          ]
        ],
        "list": [
          "<b>Escucha y repite:</b> pausa el podcast después de una frase útil y dila en voz alta; solo escuchar entrena el oído, que ya tienes.",
          "<b>Narra lo que haces:</b> describe en inglés el tráfico, la ruta y lo que harás mañana. Es práctica de hablar sin preparar.",
          "<b>Elige audio de tu sector:</b> conducción autónoma, pruebas, ingeniería; así el vocabulario es el de tu trabajo.",
          "Tu caso: Qué escuchar mientras manejas ya te pone el audio de la semana; en inglés te sirve doble: la habilidad y el idioma de la maestría.",
          "⚠️ Error común: seguir repitiendo frases con un pasajero. Tu calificación en Didi es parte del ingreso: baja el volumen o pausa."
        ]
      },
      "Cero traducción en el trabajo": {
        "foto": "ingles-6.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "El idioma se aprende usándolo en lo que ya haces: el entorno en inglés trabaja por ti todo el día.",
        "cifras": [
          [
            "0",
            "horas extra de estudio"
          ],
          [
            "4",
            "cosas que pasas a inglés"
          ],
          [
            "1",
            "idioma para pensar el trabajo"
          ]
        ],
        "list": [
          "<b>Cambia el idioma de lo que ya usas:</b> el sistema, el editor, el teléfono y tus herramientas de trabajo.",
          "<b>Escribe en inglés lo que es tuyo:</b> notas técnicas, mensajes de commit y tu lista de pendientes.",
          "<b>Lee la documentación original:</b> nada de traducir la página; si una palabra no sale, búscala y sigue.",
          "Tu caso: ya lees y escribes inglés técnico todos los días; el paso es dejar de traducir en la cabeza, que es lo que te hace lento al hablar.",
          "⚠️ Error común: cambiar todo de golpe y regresarlo a la semana. Empieza por el editor y el teléfono; lo demás, cuando ya no te estorbe."
        ]
      }
    },
    "codigo": {
      "Qué te pide el puesto que quieres": {
        "foto": "codigo-1.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Los anuncios son el temario: dicen exactamente qué te van a pedir.",
        "cifras": [
          [
            "5",
            "anuncios de Werkstudent"
          ],
          [
            "5",
            "requisitos que se repiten"
          ],
          [
            "1",
            "marca: lo que ya resuelves sin buscar"
          ]
        ],
        "list": [
          "<b>Busca en la región correcta:</b> Werkstudent de validación, HIL o ADAS en la región de Stuttgart: Bosch, Mercedes-Benz, Porsche y sus proveedores.",
          "<b>Subraya lo que se repite:</b> si cinco de cinco piden Python y pytest, ese es el temario; lo que sale una vez, no.",
          "<b>Marca lo que ya haces:</b> en cada requisito, ¿podrías resolver un ejercicio mañana sin buscar? Lo que no marques, en orden de frecuencia, es tu ruta.",
          "Tu caso: con la Mecatrónica del IPN y seis años de validación ya cubres CAN, HIL y pruebas; el hueco suele estar en escribir Python desde cero y en CI.",
          "⚠️ Error común: estudiar un lenguaje o un curso porque está de moda. Si los anuncios no lo piden, no es para este año."
        ]
      },
      "Tests antes que features": {
        "foto": "codigo-2.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Primero la lista de lo que debe cumplirse, después el código: la prueba te obliga a decir qué esperas.",
        "cifras": [
          [
            "1",
            "prueba antes del arreglo"
          ],
          [
            "3",
            "casos: normal, límite y falla"
          ],
          [
            "0",
            "código sin prueba en producción"
          ]
        ],
        "list": [
          "<b>Escribe primero lo que esperas:</b> una prueba que falla porque el arreglo todavía no existe. Si no sabes qué escribir, todavía no entiendes el problema.",
          "<b>Haz el arreglo mínimo:</b> lo justo para que la prueba pase; después limpia el código con la prueba como red.",
          "<b>Cubre el límite y la falla:</b> un caso normal, uno en el borde —cero, el máximo, el valor vacío— y uno que debe fallar con un error claro.",
          "Tu caso: en automotive el código sin prueba no llega a producción; hacerlo así en ALTEN es lo que separa a un junior de un senior en una revisión.",
          "⚠️ Error común: escribir la prueba después y a la medida del código. Así solo confirma lo que ya hiciste, errores incluidos."
        ]
      },
      "pytest de verdad": {
        "foto": "codigo-3.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "pytest es el estándar para automatizar pruebas en Python y aparece en casi todos los anuncios de validación.",
        "cifras": [
          [
            "1",
            "función de control"
          ],
          [
            "3",
            "tipos de caso: normal, límite y falla"
          ],
          [
            "1",
            "pipeline que las corre en cada commit"
          ]
        ],
        "list": [
          "<b>Empieza simple:</b> un archivo <i>test_*.py</i>, funciones que empiezan con <i>test_</i> y <i>assert</i>; pytest las encuentra solo.",
          "<b>Usa parametrize:</b> la misma prueba con muchos valores —velocidades, distancias, ganancias del PID— en una sola función.",
          "<b>Fixtures para lo que se repite:</b> el modelo del vehículo o los datos del sensor se preparan una vez y se reusan en cada prueba.",
          "Tu caso: un PID o la lógica de un frenado de emergencia simulado es justo lo que prueba tu equipo; en Python y con CI es lo que piden los anuncios.",
          "⚠️ Error común: pruebas que dependen del orden en que corren. Cada una debe poder correr sola y dar el mismo resultado."
        ]
      },
      "Un proyecto que se pueda enseñar": {
        "foto": "codigo-4.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "En la entrevista pesa más un proyecto tuyo, explicado bien, que diez cursos terminados.",
        "cifras": [
          [
            "1",
            "proyecto pequeño y terminado"
          ],
          [
            "3",
            "piezas: pruebas, CI y README"
          ],
          [
            "2 min",
            "para explicarlo en una entrevista"
          ]
        ],
        "list": [
          "<b>Pequeño y completo:</b> un nodo que lee datos de un sensor, los filtra y decide algo; mejor terminado que grande.",
          "<b>Con pruebas y CI:</b> GitHub Actions corre las pruebas en cada commit y pone la insignia verde en el README.",
          "<b>Un README que explica la decisión difícil:</b> qué opciones había, cuál elegiste y por qué. Es lo que lee un reclutador técnico.",
          "Tu caso: el repositorio público es el entregable del foco de Código en tu plan y lo que vas a enseñar para el Werkstudent.",
          "⚠️ Error común: diez proyectos a medias. Uno terminado y razonado vale más que todos juntos."
        ]
      },
      "Leer código ajeno a propósito": {
        "foto": "codigo-5.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Se aprende más leyendo un buen repositorio que escribiendo tres tuyos.",
        "cifras": [
          [
            "1",
            "archivo entero a la semana"
          ],
          [
            "1",
            "idea que copiarías"
          ],
          [
            "12",
            "ideas nuevas en tres meses"
          ]
        ],
        "list": [
          "<b>Elige un repositorio serio de tu campo:</b> Autoware o ROS 2, código que usan equipos de verdad.",
          "<b>Lee un archivo completo:</b> de arriba abajo, preguntándote por qué está hecho así; las pruebas del mismo módulo te dicen qué se esperaba.",
          "<b>Anota una idea:</b> un patrón, un nombre, una forma de manejar errores. Una por semana.",
          "Tu caso: ya diriges código con IA; leer código bueno es lo que te da el criterio para saber si lo que te propone está bien.",
          "⚠️ Error común: hojear muchos archivos. Uno entendido a fondo enseña más que veinte vistos por encima."
        ]
      },
      "Media hora diaria, no seis el domingo": {
        "foto": "codigo-6.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Programar es memoria muscular: media hora diaria le gana a seis horas el domingo.",
        "cifras": [
          [
            "30 min",
            "al día"
          ],
          [
            "15 h",
            "al mes"
          ],
          [
            "1",
            "ejercicio por sesión"
          ]
        ],
        "list": [
          "<b>Siempre a la misma hora:</b> el bloque de la mañana antes de ALTEN; sin decidirlo cada día, no hay nada que negociar.",
          "<b>Un ejercicio por sesión:</b> pequeño y terminado; mañana se empieza donde quedó.",
          "<b>Sin IA la primera vez:</b> escríbelo tú y luego compáralo con lo que te propone la IA; ahí está el aprendizaje.",
          "Tu caso: tu bloque de la mañana ya está en Mi Día; usarlo a diario cuenta más que una maratón.",
          "⚠️ Error común: compensar los días perdidos con una sesión larga el fin de semana. La memoria muscular se hace con frecuencia, no con horas juntas."
        ]
      }
    },
    "network": {
      "Tu red real, en una hoja": {
        "foto": "network-1.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Sin lista, «hacer networking» es un deseo; con veinte nombres escritos es un plan.",
        "cifras": [
          [
            "20",
            "nombres de tu campo"
          ],
          [
            "1 año",
            "sin hablar: los que van primero"
          ],
          [
            "5",
            "columnas por persona"
          ]
        ],
        "list": [
          "<b>Cinco columnas:</b> nombre, dónde lo conociste, qué hace hoy, cuándo hablaron por última vez y qué le puedes ofrecer.",
          "<b>Saca nombres de tu historia:</b> Ford, Continental, Bosch, Google, ALTEN, el IPN y la gente que conociste en Stuttgart.",
          "<b>Ordena por fecha:</b> los que pasan de un año sin hablar son tu trabajo de las próximas semanas.",
          "Tu caso: ya tienes red en las empresas a las que quieres llegar; lo que falta es tenerla escrita y cuidarla con un ritmo.",
          "⚠️ Error común: hacer la lista con los de más cargo. Sirve más quien te vio trabajar y te contesta."
        ]
      },
      "Las cartas de recomendación, ya": {
        "foto": "network-2.jpg",
        "cred": "LarimdaME · Flickr · CC BY-NC 2.0",
        "pie": "Una carta tarda semanas: se pide pronto, con fecha y con un borrador en la mano.",
        "cifras": [
          [
            "2",
            "cartas que pide Esslingen"
          ],
          [
            "3",
            "cosas tuyas que pides que mencionen"
          ],
          [
            "1",
            "borrador que ofreces"
          ]
        ],
        "list": [
          "<b>Elige a quien te vio trabajar:</b> un jefe de Bosch o de ALTEN y un líder técnico o profesor; el cargo pesa menos que los detalles que pueden contar.",
          "<b>Pídela con un correo corto:</b> para qué es, la fecha límite y tres cosas concretas tuyas que te gustaría que mencione.",
          "<b>Ofrece un borrador:</b> casi todos lo agradecen y la carta sale a tiempo y con lo que importa.",
          "Tu caso: la solicitud a Esslingen tiene fecha; si las cartas se piden tarde, todo se atrasa con ellas.",
          "⚠️ Error común: pedirla sin fecha. «Cuando puedas» quiere decir nunca."
        ]
      },
      "Reactivar sin pedir nada": {
        "foto": "network-3.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Tres líneas sin pedir nada: así existe la red el día que la necesitas.",
        "cifras": [
          [
            "5",
            "mensajes esta semana"
          ],
          [
            "3",
            "líneas cada uno"
          ],
          [
            "0",
            "favores pedidos"
          ]
        ],
        "list": [
          "<b>Algo útil para esa persona:</b> un artículo de su tema, una noticia de su empresa, una herramienta que le ahorra trabajo.",
          "<b>Una felicitación concreta:</b> por un cambio de puesto o un proyecto, con un detalle que demuestre que lo leíste.",
          "<b>Una pregunta sobre algo suyo:</b> cómo le fue con el lanzamiento que mencionó; la gente contesta lo que le interesa.",
          "Tu caso: tu hoja te dice a quién le toca; con cinco a la semana, en un mes reactivas a toda tu lista de veinte.",
          "⚠️ Error común: aparecer solo cuando necesitas algo. Se nota siempre y quema el contacto."
        ]
      },
      "Stuttgart antes de llegar": {
        "foto": "network-4.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "La ciudad de Mercedes-Benz y de Bosch: llegar con contactos hechos cambia el primer invierno.",
        "cifras": [
          [
            "1",
            "videollamada al mes"
          ],
          [
            "5",
            "personas que ya te conocen al llegar"
          ],
          [
            "20 min",
            "por llamada"
          ]
        ],
        "list": [
          "<b>Empieza por lo que ya tienes:</b> los líderes de Bosch con los que trabajaste y los mexicanos que viven en Stuttgart.",
          "<b>Pide 20 minutos, no un favor:</b> «quiero entender cómo se busca Werkstudent allá»; una pregunta concreta se contesta, una petición abierta no.",
          "<b>Anota y agradece:</b> lo que aprendiste va a tu hoja y, una semana después, mandas algo útil de vuelta.",
          "Tu caso: llegar con cinco personas que ya te conocen cambia el primer invierno y la búsqueda de trabajo.",
          "⚠️ Error común: pedir trabajo en la primera llamada. Primero se aprende; la recomendación llega sola cuando hay confianza."
        ]
      },
      "La pregunta que abre puertas": {
        "foto": "network-5.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "La conversación informal vale más que la formal: una buena pregunta abre la puerta que un CV no abre.",
        "cifras": [
          [
            "1",
            "pregunta"
          ],
          [
            "2",
            "conversaciones antes de tu primera entrevista"
          ],
          [
            "20 min",
            "cada una"
          ]
        ],
        "list": [
          "<b>La pregunta:</b> «¿qué te habría gustado saber antes de entrar?». Casi nadie se niega y casi todos contestan algo que no sale en ninguna oferta.",
          "<b>Luego escucha:</b> el equipo, cómo se trabaja y qué valoran en un Werkstudent; anota las palabras que usan.",
          "<b>Cierra con una puerta abierta:</b> «¿hay alguien más con quien me recomiendes hablar?». Una conversación lleva a la siguiente.",
          "Tu caso: con dos de estas conversaciones llegas a tu primera entrevista de Werkstudent hablando como alguien de adentro.",
          "⚠️ Error común: convertirla en una entrevista disfrazada. Si preguntas por vacantes, la otra persona se pone a la defensiva."
        ]
      },
      "Una hora al mes, en el calendario": {
        "foto": "network-6.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Una hora al mes sostiene una red; cero horas la disuelve en un año.",
        "cifras": [
          [
            "1 h",
            "al mes"
          ],
          [
            "3",
            "personas a quienes escribes"
          ],
          [
            "12 h",
            "al año sostienen tu red"
          ]
        ],
        "list": [
          "<b>Ponla como cita fija:</b> el mismo día del mes y a la misma hora; el bloque reservado es el sistema.",
          "<b>Tres cosas en esa hora:</b> revisar la hoja, escribir a tres personas y añadir a quien conociste ese mes.",
          "<b>Una nota por conversación:</b> qué le preocupa y qué le sirvió; el mes siguiente tienes de qué hablar.",
          "Tu caso: tu red ya existe; una hora al mes la mantiene viva hasta que llegues a Stuttgart.",
          "⚠️ Error común: depender de la memoria. Sin bloque fijo, esto se cae en dos semanas."
        ]
      }
    },
    "finanzas": {
      "Págate primero": {
        "foto": "finanzas-1.jpg",
        "cred": "Images_of_Money · Flickr · CC BY 2.0",
        "pie": "Lo primero que sale de la quincena es lo tuyo: el ahorro que se aparta el día que entra es el único que sobrevive al mes.",
        "cifras": [
          [
            "1º",
            "el ahorro, antes de cualquier gasto"
          ],
          [
            "1",
            "transferencia programada"
          ],
          [
            "0",
            "pesos «de lo que sobre»"
          ]
        ],
        "list": [
          "<b>El ahorro sale primero:</b> el día que entra la quincena, lo que va a tu plan se transfiere antes de pagar o comprar cualquier cosa.",
          "<b>Lo que queda es tu presupuesto:</b> ya no hay que ver cuánto sobra; lo que hay en la cuenta es lo que puedes gastar.",
          "<b>Prográmalo:</b> una transferencia automática no depende de tu ánimo del día.",
          "Tu caso: Qué invertir hoy te dice si esa quincena va a la BBVA o a GBM; págate primero es seguir ese orden el mismo día que entra el dinero.",
          "⚠️ Error común: ahorrar lo que sobra a fin de mes. Casi nunca sobra."
        ]
      },
      "Saber a dónde se va tu dinero": {
        "foto": "finanzas-2.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Cada recibo cuenta: lo que no anotas el mismo día no existe a fin de mes.",
        "cifras": [
          [
            "30",
            "días seguidos anotando"
          ],
          [
            "5",
            "categorías"
          ],
          [
            "3",
            "las que mueven el 80 %"
          ]
        ],
        "list": [
          "<b>Anota el mismo día:</b> el gasto chico que no anotas hoy ya no existe el domingo, y los chicos son justo los que no ves.",
          "<b>Cinco categorías bastan:</b> fijos, comida, transporte, deuda y gusto. Más categorías es más tiempo y la misma información.",
          "<b>Al día 30, ordena:</b> de mayor a menor, y mira solo las tres primeras; ahí está lo que puedes mover.",
          "Tu caso: tu app de Finanzas ya registra y suma por categoría; no necesitas otra herramienta, solo anotar el mismo día.",
          "⚠️ Error común: recortar antes de medir. Sin el dato real, cualquier recorte es adivinar."
        ]
      },
      "Presupuestar sobre ingreso variable": {
        "foto": "finanzas-3.jpg",
        "cred": "Images_of_Money · Flickr · CC BY 2.0",
        "pie": "Con un ingreso que cambia, se presupuesta sobre el mes malo, no sobre el bueno.",
        "cifras": [
          [
            "3",
            "meses para sacar tu mínimo"
          ],
          [
            "1",
            "número: el mínimo, no el promedio"
          ],
          [
            "0",
            "pesos de lo extra al gasto"
          ]
        ],
        "list": [
          "<b>Saca tu mínimo:</b> el peor de tus últimos tres meses, sumando tu sueldo y Didi. Ese es el ingreso sobre el que presupuestas.",
          "<b>Lo extra tiene destino fijo:</b> todo lo que entre arriba del mínimo va a tu plan —la BBVA mientras exista, después GBM— el mismo día.",
          "<b>Con Didi, cada lunes:</b> lo que dejó la semana se aparta antes de tocarlo.",
          "Tu caso: tu sueldo es fijo y Didi cambia cada semana; presupuestar sobre el promedio es lo que hace que un mes flojo te descuadre.",
          "⚠️ Error común: gastar el mes bueno como si fuera el normal. El mes malo llega después y encuentra la cuenta vacía."
        ]
      },
      "Decidir con la cabeza fría": {
        "foto": "finanzas-4.jpg",
        "cred": "Photos By Dlee · Flickr · CC BY-NC-ND 2.0",
        "pie": "Casi ninguna mala decisión de dinero viene de las matemáticas: viene de decidir con prisa.",
        "cifras": [
          [
            "72 h",
            "entre querer y comprar"
          ],
          [
            "$2,000",
            "desde ahí aplica la regla"
          ],
          [
            "1",
            "razón escrita por decisión grande"
          ]
        ],
        "list": [
          "<b>La regla de las 72 horas:</b> lo que cuesta más de $2,000 espera tres días; si sigues queriéndolo, cómpralo sin culpa.",
          "<b>No decidas cansado:</b> de noche, con prisa o después de ver lo que compró otro; ahí se toman casi todas las malas compras.",
          "<b>Escribe la razón:</b> antes de una decisión grande, una línea con el porqué; releerla en seis meses te enseña más que cualquier libro.",
          "Tu caso: los MSI y los saldos de la BBVA no vinieron de no saber hacer cuentas, sino de decidir rápido; la regla mecánica decide por ti.",
          "⚠️ Error común: «es una oferta, se acaba hoy». La prisa es parte de la venta."
        ]
      },
      "Calcular el costo real de la deuda": {
        "foto": "finanzas-5.jpg",
        "cred": "cafecredit · Flickr · CC BY 2.0",
        "pie": "La tasa que anuncian no es lo que pagas: el CAT sí.",
        "cifras": [
          [
            "CAT",
            "el costo real: tasa, comisiones y seguros"
          ],
          [
            "1º",
            "la deuda de tasa más alta"
          ],
          [
            "MSI",
            "un pago fijo que ya vendiste"
          ]
        ],
        "list": [
          "<b>Lee el CAT en tu estado de cuenta:</b> incluye intereses, comisiones y seguros; es el único número con el que puedes comparar dos créditos.",
          "<b>Ordena por tasa:</b> el mínimo en todas y todo lo extra a la de tasa más alta (avalancha). La bola de nieve —el saldo más chico primero— solo gana en motivación.",
          "<b>Antes de un MSI:</b> calcula qué parte de tu excedente mensual compromete y por cuántos meses; esa parte ya no es tuya.",
          "Tu caso: la BBVA es tu deuda cara; el plan la paga quincena a quincena y Qué invertir hoy te dice cuánto toca.",
          "⚠️ Error común: pagar solo el mínimo. En una tarjeta, casi todo el mínimo se va en intereses."
        ]
      },
      "El colchón dentro de la cuenta": {
        "foto": "finanzas-6.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Un colchón que no se toca: es lo que evita que un imprevisto regrese a la tarjeta.",
        "cifras": [
          [
            "1 mes",
            "de tus fijos: {{fijosTotal}}"
          ],
          [
            "28 días",
            "CETES: se saca en uno o dos días"
          ],
          [
            "0",
            "retiros que no sean emergencia"
          ]
        ],
        "list": [
          "<b>Cuánto:</b> un mes de tus fijos; es lo que evita volver a la tarjeta cuando algo se rompe.",
          "<b>Dónde:</b> CETES a 28 días en cetesdirecto; rinde, no tiene comisión y se saca en uno o dos días hábiles.",
          "<b>Qué es emergencia:</b> la salud, el auto, un gasto que no podías prever; un viaje o una oferta no lo son.",
          "Tu caso: el fondo de emergencia es el primer paso de la ruta del dinero, antes de invertir; Qué invertir hoy lo cuenta con tu saldo real.",
          "⚠️ Error común: tenerlo en la cuenta de débito. Lo que se ve disponible se gasta."
        ]
      },
      "Leer tu propio balance": {
        "foto": "finanzas-7.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "El número que importa no es tu quincena: es lo que tienes menos lo que debes.",
        "cifras": [
          [
            "1",
            "vez al mes"
          ],
          [
            "A − P",
            "activos menos pasivos"
          ],
          [
            "↑",
            "cada mes, rumbo al millón"
          ]
        ],
        "list": [
          "<b>Activos:</b> efectivo, fondo, lo que tienes en GBM y el valor de lo que es tuyo, como el BYD.",
          "<b>Pasivos:</b> lo que debes: la tarjeta, lo que queda del auto y cualquier MSI.",
          "<b>Compara mes contra mes:</b> la quincena dice cómo fluye el dinero; el balance dice si estás construyendo algo.",
          "Tu caso: el Dashboard ya calcula tu patrimonio neto; tu trabajo es mirarlo una vez al mes, no cada día.",
          "⚠️ Error común: confundir un buen mes de ingresos con avanzar. Si el balance no sube, no avanzaste."
        ]
      },
      "Entender tus impuestos": {
        "foto": "finanzas-8.jpg",
        "cred": "401(K) 2013 · Flickr · CC BY-SA 2.0",
        "pie": "Los papeles del SAT en orden: no saber las reglas cuesta en multas y en deducciones que se quedan en la mesa.",
        "cifras": [
          [
            "Abril",
            "la declaración anual"
          ],
          [
            "4",
            "deducciones que suelen olvidarse"
          ],
          [
            "1",
            "constancia de situación fiscal"
          ]
        ],
        "list": [
          "<b>Lo deducible:</b> gastos médicos y dentales, lentes, colegiaturas y aportaciones voluntarias al retiro, cada uno con su tope.",
          "<b>La declaración anual:</b> en abril; si tienes deducciones o ingresos además del sueldo, conviene presentarla.",
          "<b>Antes de irte:</b> qué le avisa al SAT una persona que deja de vivir en México; se averigua antes, no después.",
          "Tu caso: empieza por tu constancia de situación fiscal en el portal del SAT; ahí está tu situación real.",
          "⚠️ Error común: pagar en efectivo un gasto deducible. Sin pago electrónico y factura, no cuenta."
        ]
      }
    },
    "inversion": {
      "Saber cuándo NO invertir": {
        "foto": "inversion-1.jpg",
        "cred": "Clover Autrey · Flickr · CC BY 2.0",
        "pie": "Antes de invertir hay dos altos: el fondo completo y la deuda cara en cero.",
        "cifras": [
          [
            "1",
            "fondo de emergencia completo"
          ],
          [
            "2",
            "deuda cara en cero"
          ],
          [
            "3",
            "invertir"
          ]
        ],
        "list": [
          "<b>El orden no se negocia:</b> primero el fondo, luego la deuda cara y al final invertir; ninguna inversión razonable rinde lo que cobra una tarjeta.",
          "<b>Por qué:</b> una tarjeta cobra arriba de 30 % al año y un buen año de bolsa da alrededor de 10 %; invertir con deuda viva es perder la diferencia.",
          "<b>La parte difícil:</b> respetarlo cuando el mercado sube y da comezón saltarse un paso.",
          "Tu caso: Qué invertir hoy aplica esta regla a tu saldo real cada vez que lo abres y te dice qué paso toca.",
          "⚠️ Error común: «solo un poquito» en algo que está subiendo. Ese poquito sale de pagar la deuda más tarde."
        ]
      },
      "Conocer los instrumentos mexicanos": {
        "foto": "inversion-2.jpg",
        "cred": "Dennis S. Hurd · Flickr · CC0 1.0",
        "pie": "No puedes repartir entre cosas que no distingues: cada instrumento tiene un para qué.",
        "cifras": [
          [
            "3",
            "datos de cada uno: plazo, riesgo e impuestos"
          ],
          [
            "28 días",
            "el CETE más corto"
          ],
          [
            "0",
            "comisión en cetesdirecto"
          ]
        ],
        "list": [
          "<b>CETES:</b> deuda del gobierno a 28, 91, 182 o 364 días; el riesgo más bajo en pesos, y se compran sin comisión en cetesdirecto.",
          "<b>Índices:</b> un ETF como VOO compra las 500 empresas grandes de EE. UU. de una vez; en GBM se compra en el SIC.",
          "<b>Bonos M y Udibonos:</b> deuda del gobierno a plazos largos; el Udibono sube con la inflación.",
          "Tu caso: ya usas CETES y VOO en GBM, y tuviste BTC; añade solo lo que entiendas y revisa tu Afore, que es inversión aunque no lo parezca.",
          "⚠️ Error común: comprar algo porque rindió mucho el año pasado sin saber qué es. Si no lo puedes explicar en una frase, no lo compres."
        ]
      },
      "Interés compuesto y horizonte": {
        "foto": "inversion-3.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Lo que mueve el interés compuesto no es la tasa: es el tiempo.",
        "cifras": [
          [
            "72 ÷ 9",
            "≈ 8 años para duplicar al 9 %"
          ],
          [
            "8–10 %",
            "anual: un supuesto conservador"
          ],
          [
            "2030",
            "tu horizonte"
          ]
        ],
        "list": [
          "<b>La regla del 72:</b> 72 entre la tasa anual da los años para duplicar; al 9 %, tu dinero se duplica en unos ocho años.",
          "<b>Hazlo con tus números:</b> lo que aportas al mes, un rendimiento conservador y los años hasta 2030.",
          "<b>Repítelo con un año menos:</b> la diferencia en pesos es lo que cuesta posponer; verla es lo que hace que no te saltes un mes.",
          "Tu caso: tu meta del millón tiene fecha; el tiempo que queda es el motor más fuerte que tienes.",
          "⚠️ Error común: perseguir un punto más de rendimiento en vez de empezar antes. El tiempo pesa más que la tasa."
        ]
      },
      "Escribir tu asignación objetivo": {
        "foto": "inversion-4.jpg",
        "cred": "ccPixs.com · Flickr · CC BY 2.0",
        "pie": "Tres porcentajes escritos una vez deciden por ti cuando el mercado te está gritando.",
        "cifras": [
          [
            "3",
            "porcentajes que suman 100"
          ],
          [
            "50 %",
            "la caída que debes poder ver sin vender"
          ],
          [
            "1",
            "renglón escrito con fecha"
          ]
        ],
        "list": [
          "<b>Renta fija:</b> CETES; lo estable, lo que te deja dormir.",
          "<b>Renta variable:</b> un índice global o del S&P 500; el motor de largo plazo.",
          "<b>Riesgo alto:</b> una porción chica, como BTC; nunca más de lo que puedas ver caer a la mitad sin tocarlo.",
          "Tu caso: con la asignación escrita, cada compra del lunes deja de ser una decisión y pasa a ser rellenar el porcentaje que quedó abajo.",
          "⚠️ Error común: cambiar los porcentajes cada vez que el mercado se mueve. Se escriben una vez y se revisan una vez al año."
        ]
      },
      "Aportar periódicamente y automatizarlo": {
        "foto": "inversion-5.jpg",
        "cred": "Images_of_Money · Flickr · CC BY 2.0",
        "pie": "Aportar lo mismo cada periodo quita la decisión de en medio: el método más aburrido es el que funciona.",
        "cifras": [
          [
            "1",
            "monto fijo"
          ],
          [
            "1",
            "día fijo"
          ],
          [
            "12",
            "meses seguidos sin saltarte uno"
          ]
        ],
        "list": [
          "<b>Monto y día fijos:</b> lo mismo cada periodo; compras más cuando cae y menos cuando sube, sin adivinar.",
          "<b>Súbelo con el ingreso:</b> cuando sube el sueldo o termina una deuda, el aporte sube; nunca lo bajas por cómo se ve el mercado.",
          "<b>Prográmalo:</b> si el aporte depende de que te acuerdes, depende de tu ánimo.",
          "Tu caso: ya tienes el bloque de GBM de los lunes; la meta es aburrida a propósito: doce meses seguidos.",
          "⚠️ Error común: esperar «el momento». Nadie lo sabe; aportar siempre le gana a adivinar."
        ]
      },
      "Ver las comisiones antes que el rendimiento": {
        "foto": "inversion-6.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "El rendimiento no lo controlas; el costo sí.",
        "cifras": [
          [
            "1 %",
            "al año parece poco"
          ],
          [
            "≈ 1/5",
            "de lo acumulado en 20 años"
          ],
          [
            "0.03 %",
            "lo que cobra VOO al año"
          ]
        ],
        "list": [
          "<b>Comisión de administración:</b> anual y sobre todo tu saldo; es la que más pesa.",
          "<b>Por operación:</b> lo que te cobra la casa cada vez que compras o vendes.",
          "<b>El spread:</b> la diferencia entre el precio de compra y el de venta; en dólares y en cripto puede ser grande.",
          "Tu caso: compara el mismo índice en dos casas antes de comprarlo; la diferencia entre 0.03 % y 1.5 % al año es llegar o no al millón en 2030.",
          "⚠️ Error común: elegir un fondo por lo que rindió el año pasado. El rendimiento pasado no se repite; la comisión sí."
        ]
      },
      "Aguantar sin vender": {
        "foto": "inversion-7.jpg",
        "cred": "metal-crow · Flickr · CC BY-NC 2.0",
        "pie": "En la tormenta no se decide: se ejecuta lo que escribiste con el mar en calma.",
        "cifras": [
          [
            "30 %",
            "la caída para la que escribes tu plan"
          ],
          [
            "1",
            "vez por semana que miras precios"
          ],
          [
            "0",
            "ventas por pánico"
          ]
        ],
        "list": [
          "<b>Escribe hoy qué harás:</b> con el mercado tranquilo, una línea: «si cae 30 %, no vendo y sigo aportando».",
          "<b>Mira menos:</b> precios una vez por semana, en tu bloque del lunes; abrir la app a diario solo te hace sentir cada caída.",
          "<b>Recuerda la historia:</b> el S&P 500 perdió más de la mitad entre 2007 y 2009, y en 2020 se desplomó en semanas; quien no vendió se recuperó.",
          "Tu caso: tu asignación y esta línea escrita van juntas; en la caída no se decide, se ejecuta.",
          "⚠️ Error común: vender abajo «para no perder más» y volver a comprar arriba. Es la forma más común de perder dinero en bolsa."
        ]
      },
      "Rebalancear una vez al año": {
        "foto": "inversion-8.jpg",
        "cred": "Sepehr Ehsani · Flickr · CC BY-NC-ND 2.0",
        "pie": "La balanza vuelve al centro: rebalancear es vender caro y comprar barato, lo contrario del instinto.",
        "cifras": [
          [
            "1",
            "vez al año"
          ],
          [
            "5 pts",
            "de desvío para actuar"
          ],
          [
            "0",
            "ventas: rebalanceas con aportes"
          ]
        ],
        "list": [
          "<b>Compara con lo escrito:</b> una vez al año, pon junto a cada porcentaje objetivo el que tienes hoy.",
          "<b>Si algo se desvió más de 5 puntos:</b> manda las aportaciones nuevas a lo que quedó abajo hasta emparejar.",
          "<b>Vende solo si hace falta:</b> rebalancear con aportes no genera impuestos ni comisiones.",
          "Tu caso: con aportes cada lunes, rebalancear es decidir a dónde va el siguiente, no vender nada.",
          "⚠️ Error común: dejar que lo que más subió se quede con todo. Tu cartera termina más arriesgada de lo que decidiste."
        ]
      },
      "Saber qué impuestos pagas al invertir": {
        "foto": "inversion-9.jpg",
        "cred": "scribbletaylor · Flickr · CC BY-NC 2.0",
        "pie": "El rendimiento que ves no es el que te queda: los impuestos van en la cuenta desde el principio.",
        "cifras": [
          [
            "10 %",
            "de ISR sobre la ganancia en bolsa"
          ],
          [
            "Abril",
            "cuando las constancias valen oro"
          ],
          [
            "1",
            "carpeta para todas las constancias"
          ]
        ],
        "list": [
          "<b>Deuda (CETES):</b> se retiene un impuesto anual sobre el capital; lo ves en tu constancia.",
          "<b>Acciones y ETF en bolsa:</b> 10 % sobre la ganancia cuando vendes; la pérdida también se reporta.",
          "<b>Cripto:</b> la ganancia se suma a tus demás ingresos y paga con tu tasa normal.",
          "Tu caso: guarda las constancias anuales de GBM y de cetesdirecto en la misma carpeta desde ahora.",
          "⚠️ Error común: ver el rendimiento como si fuera lo que te queda. Lo que te queda es después de impuestos y comisiones."
        ]
      }
    },
    "datos": {
      "Python y pandas con tus datos": {
        "foto": "datos-1.jpg",
        "cred": "kenteegardin · Flickr · CC BY-SA 2.0",
        "pie": "El hueco es de herramienta, no de criterio: ya sabes qué preguntarle a los datos.",
        "cifras": [
          [
            "2–3 h",
            "los módulos de Kaggle Learn"
          ],
          [
            "1",
            "cuaderno con tus gastos"
          ],
          [
            "2",
            "preguntas: por categoría y por semana"
          ]
        ],
        "list": [
          "<b>Primero los módulos cortos:</b> Python y pandas de Kaggle Learn; ejercicios en el navegador, sin instalar nada.",
          "<b>En paralelo, tus datos:</b> exporta tus gastos de Finanzas a CSV y cárgalos con <i>pandas.read_csv</i>.",
          "<b>Dos preguntas:</b> cuánto gastas por categoría (<i>groupby</i>) y por semana (<i>resample</i>); con eso ya usaste lo esencial.",
          "Tu caso: ya sabes qué preguntarle a los datos; el hueco es de herramienta: soltarte de Excel.",
          "⚠️ Error común: practicar con datos de ejemplo que no te importan. Con los tuyos llegas al final porque quieres la respuesta."
        ]
      },
      "Un tablero que responda una pregunta": {
        "foto": "datos-2.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Un tablero sin pregunta es decoración.",
        "cifras": [
          [
            "1",
            "pregunta por tablero"
          ],
          [
            "3",
            "gráficas, no más"
          ],
          [
            "½",
            "del tiempo tarda el segundo"
          ]
        ],
        "list": [
          "<b>Escribe la pregunta arriba:</b> «¿en qué semana del mes se me va el dinero?»; todo lo que no la contesta, sobra.",
          "<b>Tres gráficas bastan:</b> la respuesta, el detalle que la explica y una tendencia.",
          "<b>Hazlo dos veces:</b> el segundo, con otros datos tuyos, tarda la mitad; esa caída es la señal de que ya es hábito.",
          "Tu caso: ya armaste los tableros de este sistema; Looker Studio es lo mismo en una herramienta que piden los anuncios.",
          "⚠️ Error común: meter todas las gráficas que se pueden. Nadie lee un tablero que no contesta algo."
        ]
      },
      "Contar lo que dicen los datos": {
        "foto": "datos-3.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "En una revisión convence quien explica el dato, no quien lo tiene.",
        "cifras": [
          [
            "1",
            "gráfica"
          ],
          [
            "3",
            "frases"
          ],
          [
            "1",
            "persona que te dice qué entendió"
          ]
        ],
        "list": [
          "<b>Empieza por la conclusión:</b> la primera frase dice qué pasó; la gráfica lo demuestra.",
          "<b>Una gráfica, un mensaje:</b> quita lo que distrae —rejillas, colores de más— y resalta solo la línea que importa.",
          "<b>Prueba con alguien:</b> enséñala y pregunta qué entendió; si no coincide con tu primera frase, se rehace.",
          "Tu caso: tus resultados de validación son el material perfecto, siempre sin datos del cliente.",
          "⚠️ Error común: enseñar la tabla completa y esperar que el otro saque la conclusión. Nadie lo hace."
        ]
      },
      "SQL, diez minutos al día": {
        "foto": "datos-4.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "SQL se olvida si no se usa: diez minutos diarios le ganan a tres horas al mes.",
        "cifras": [
          [
            "10 min",
            "al día"
          ],
          [
            "30",
            "días seguidos"
          ],
          [
            "0",
            "consultas copiadas"
          ]
        ],
        "list": [
          "<b>El orden de SQLZoo:</b> SELECT básico, WHERE, funciones de agregado y JOIN; un tema por semana.",
          "<b>Teclea cada consulta:</b> copiar y pegar no deja nada; teclear deja la sintaxis en los dedos.",
          "<b>Predice el resultado:</b> antes de correrla, di qué filas esperas; si no coincide, ahí aprendes.",
          "Tu caso: diez minutos caben en cualquier hueco del día; treinta días seguidos y SQL deja de ser un pendiente.",
          "⚠️ Error común: tres horas un domingo y nada el resto del mes. Lo que no se usa a diario se olvida."
        ]
      },
      "Teclear, no mirar": {
        "foto": "datos-5.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Si no lo tecleaste, no lo aprendiste.",
        "cifras": [
          [
            "1",
            "ejercicio por video"
          ],
          [
            "100 %",
            "tecleado por ti"
          ],
          [
            "1 sem",
            "dura lo que solo viste"
          ]
        ],
        "list": [
          "<b>Video y editor lado a lado:</b> pausa, teclea y corre; no avances hasta que tu versión funcione.",
          "<b>Cambia los datos:</b> el mismo ejercicio con tus datos te obliga a entenderlo, no a copiarlo.",
          "<b>Rómpelo a propósito:</b> cambia algo y mira qué error sale; leer errores es la mitad del oficio.",
          "Tu caso: con IA ejecutas lo que quieres; teclear tú es lo que te da soltura cuando no la tienes a mano, como en una prueba técnica.",
          "⚠️ Error común: ver tutoriales completos «para entender primero». Sin teclear, se olvida en una semana."
        ]
      }
    },
    "mente": {
      "Lo alto no se mantiene solo": {
        "foto": "mente-1.jpg",
        "cred": "U.S. Department of Agriculture · Rawpixel · CC0 1.0",
        "pie": "Lo que te sostiene hay que nombrarlo: lo alto se cae por descuido, no por un golpe.",
        "cifras": [
          [
            "3",
            "cosas que te sostienen"
          ],
          [
            "1",
            "la primera que se cae"
          ],
          [
            "1",
            "que blindas este mes"
          ]
        ],
        "list": [
          "<b>Escribe las tres:</b> por ejemplo dormir, entrenar y tener un plan; las que de verdad te sostienen, no las ideales.",
          "<b>Busca la primera que se cae:</b> piensa en tu último mes difícil; ¿qué dejaste primero? Esa es la que hay que blindar.",
          "<b>Blíndala con un sistema:</b> una hora fija, una alarma, algo que no dependa de las ganas; un sistema aguanta el mes difícil, la motivación no.",
          "Tu caso: rehiciste el plan dos veces sin abandonarlo; tu fuerza es la resiliencia, y lo que la baja son tus dos metas de conducta.",
          "⚠️ Error común: creer que lo alto ya no necesita mantenimiento. Es lo primero que se descuida porque «ya está bien»."
        ]
      },
      "El sueño es la palanca, no la fuerza de voluntad": {
        "foto": "mente-2.jpg",
        "cred": "elizabeth lies · StockSnap · CC0 1.0",
        "pie": "La memoria se fija dormido: dormir no compite con estudiar, es parte de estudiar.",
        "cifras": [
          [
            "{{horasSueno}}",
            "de sueño en tu rutina"
          ],
          [
            "{{horaDormir}}",
            "luz fuera"
          ],
          [
            "14",
            "noches seguidas para medir"
          ]
        ],
        "list": [
          "<b>La hora de dormir es una cita:</b> luz fuera a tu hora aunque la app no quede terminada; lo que no cupo se parte para mañana.",
          "<b>Nada de pantalla en la cama:</b> el celular fuera del cuarto, que además es tu meta de conducta.",
          "<b>Mide en el gimnasio:</b> después de dos semanas compara la energía de tus sesiones; se nota ahí antes que en ningún otro lado.",
          "Tu caso: tu rutina te da justo el mínimo de sueño; cada noche que se alarga caes debajo, y la mitad de lo que parece falta de disciplina es cansancio.",
          "⚠️ Error común: «recuperar» el fin de semana. El sueño perdido no se paga con un día largo; se paga con una hora fija."
        ]
      },
      "Terapia antes de irte": {
        "foto": "mente-3.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Llegar con herramientas: la terapia se empieza antes del primer invierno, no durante.",
        "cifras": [
          [
            "4",
            "sesiones antes de la mudanza"
          ],
          [
            "3",
            "temas: soledad, estrés y sueño"
          ],
          [
            "0 €",
            "la asesoría del Studierendenwerk"
          ]
        ],
        "list": [
          "<b>Ve con un objetivo:</b> no a «ver qué sale», sino a armar un plan para la soledad, el estrés y el sueño del primer invierno.",
          "<b>Cuatro sesiones para empezar:</b> salir con herramientas concretas y sabiendo a quién acudir allá.",
          "<b>Allá ya hay apoyo:</b> el Studierendenwerk da asesoría psicológica gratis a estudiantes; búscalo desde el primer mes.",
          "Tu caso: mudarte solo a otro país es de los cambios más fuertes; llegar con herramientas es más fácil que construirlas en febrero, con ocho horas de luz.",
          "⚠️ Error común: esperar a sentirte mal para buscar ayuda. Allá, con el idioma y la distancia, cuesta más empezar."
        ]
      },
      "La deuda pesa en la cabeza, no sólo en la cartera": {
        "foto": "mente-4.jpg",
        "cred": "robtxgal · Flickr · CC BY 2.0",
        "pie": "Una deuda con fecha de fin es un problema con plazo, no una amenaza difusa.",
        "cifras": [
          [
            "1",
            "vez al mes miras la deuda"
          ],
          [
            "1",
            "fecha de fin"
          ],
          [
            "0",
            "vistazos diarios"
          ]
        ],
        "list": [
          "<b>Mira el número real una vez al mes:</b> cuánto debes y cuánto bajó; el Dashboard ya lo calcula.",
          "<b>Ponle fecha:</b> una deuda con fecha de fin es un problema con plazo; sin fecha es una amenaza que pesa todo el día.",
          "<b>Cuenta cada abono:</b> ver que el número baja es lo que quita el ruido de fondo.",
          "Tu caso: Qué invertir hoy te dice el día en que el plan termina de pagar la BBVA; esa es tu fecha.",
          "⚠️ Error común: no mirar para no sentirte mal. Lo que no se mira crece en la cabeza."
        ]
      },
      "Cortar la rumia con una acción pequeña": {
        "foto": "mente-5.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "El primer escalón: la acción corta la rumia mejor que cualquier razonamiento.",
        "cifras": [
          [
            "10 min",
            "dando vueltas: la señal"
          ],
          [
            "1",
            "acción pequeña"
          ],
          [
            "2 min",
            "lo que tarda"
          ]
        ],
        "list": [
          "<b>Reconoce la señal:</b> diez minutos pensando lo mismo sin una idea nueva es rumia, no análisis.",
          "<b>Haz la cosa más pequeña:</b> un mensaje, una línea, una búsqueda; algo que se pueda hacer en dos minutos.",
          "<b>Después decide si sigues:</b> casi siempre la acción cambia el problema, y lo que parecía enorme se vuelve un paso.",
          "Tu caso: cuando el plan se mueve —un saldo, una fecha—, tu mejor respuesta ha sido rehacerlo; la acción pequeña es la versión diaria de eso.",
          "⚠️ Error común: esperar a tener la solución completa para moverte. Mientras tanto, la cabeza sigue girando."
        ]
      },
      "Una revisión corta cada domingo": {
        "foto": "mente-6.jpg",
        "cred": "tonyduckles · Flickr · CC BY-NC-SA 2.0",
        "pie": "Diez minutos por escrito: lo que no se revisa se repite.",
        "cifras": [
          [
            "10 min",
            "a la semana"
          ],
          [
            "3",
            "preguntas"
          ],
          [
            "1",
            "cambio para la semana que viene"
          ]
        ],
        "list": [
          "<b>Qué salió bien:</b> una o dos cosas, con el dato; reconocerlo es lo que sostiene la racha.",
          "<b>Qué se cayó:</b> sin castigo, solo el hecho y por qué.",
          "<b>Lo único que cambias:</b> una sola cosa para la semana que viene; más de una no se cumple.",
          "Tu caso: Hábitos y el Plan Maestro ya dicen qué hiciste en la semana; la revisión es mirarlos diez minutos y escribir.",
          "⚠️ Error común: hacerla de memoria y en la cabeza. Escribirla es lo que hace que la semana siguiente sea distinta."
        ]
      }
    },
    "liderazgo": {
      "Dónde está tu techo": {
        "foto": "liderazgo-1.jpg",
        "cred": "U.S. Embassy Jerusalem · Flickr · CC BY 2.0",
        "pie": "Lo que separa a un buen líder de uno muy bueno no es técnica: es tener la conversación que cuesta.",
        "cifras": [
          [
            "3",
            "conversaciones que evitas"
          ],
          [
            "1",
            "frase por conversación"
          ],
          [
            "2",
            "techos posibles: valentía o claridad"
          ]
        ],
        "list": [
          "<b>Escribe las tres:</b> en el trabajo, en un proyecto y en casa; las que llevas semanas posponiendo.",
          "<b>Una frase cada una:</b> qué dirías si la tuvieras mañana, no la conversación entera.",
          "<b>Léelas juntas:</b> si las frases salen claras y aun así no las tienes, tu techo es de valentía; si no sabes qué decir, es de claridad.",
          "Tu caso: en Bosch dirigiste a tu equipo y te eligieron para Stuttgart; tu techo no es técnico, está en las conversaciones difíciles.",
          "⚠️ Error común: tenerlas sin prepararlas. Una conversación difícil improvisada casi siempre sale peor que la que no se tuvo."
        ]
      },
      "Separar el hecho de la historia": {
        "foto": "liderazgo-2.jpg",
        "cred": "Nguyen Nguyen · StockSnap · CC0 1.0",
        "pie": "Casi todo conflicto viene de contar la historia como si fuera el hecho.",
        "cifras": [
          [
            "2",
            "columnas"
          ],
          [
            "2",
            "líneas para el hecho"
          ],
          [
            "1",
            "conversación que abre con el hecho"
          ]
        ],
        "list": [
          "<b>Columna 1, el hecho:</b> lo que habría grabado una cámara: «llegó 20 minutos tarde a tres juntas este mes».",
          "<b>Columna 2, tu historia:</b> lo que concluiste: «no le importa el proyecto». Casi siempre es más larga.",
          "<b>Abre con el hecho y pregunta:</b> «noté esto, ¿qué está pasando?»; la otra persona te da su historia y muchas veces cambia la tuya.",
          "Tu caso: hazlo por escrito con una de tus tres conversaciones antes de tenerla.",
          "⚠️ Error común: abrir con la historia («no te importa»). La otra persona defiende su intención y nunca llegan al hecho."
        ]
      },
      "Liderar sin el puesto": {
        "foto": "liderazgo-3.jpg",
        "cred": "Startup Stock Photos · StockSnap · CC0 1.0",
        "pie": "El liderazgo que se ve en una entrevista es el que ejerces sin el puesto.",
        "cifras": [
          [
            "1",
            "cosa rota que nadie ha tomado"
          ],
          [
            "1",
            "frase para contarlo"
          ],
          [
            "0",
            "personas a cargo necesarias"
          ]
        ],
        "list": [
          "<b>Busca lo que todos ven y nadie toma:</b> una documentación vieja, un proceso de revisión confuso, una prueba que siempre falla.",
          "<b>Arréglalo y deja el sistema:</b> no solo el arreglo; que no se vuelva a romper.",
          "<b>Cuéntalo en una frase:</b> qué estaba roto, qué hiciste y qué cambió, con un número si lo hay.",
          "Tu caso: es tu respuesta a «háblame de una vez que lideraste» en cada entrevista de Werkstudent.",
          "⚠️ Error común: esperar el puesto para liderar. Nadie te lo da sin haberte visto hacerlo antes."
        ]
      },
      "Dar retroalimentación que no duela": {
        "foto": "liderazgo-4.jpg",
        "cred": "U.S. Embassy Jerusalem · Flickr · CC BY 2.0",
        "pie": "Decir algo difícil sin romper la relación: hecho, efecto y propuesta.",
        "cifras": [
          [
            "3",
            "partes: hecho, efecto y propuesta"
          ],
          [
            "0",
            "«siempre» y «nunca»"
          ],
          [
            "1",
            "prueba esta semana, con algo pequeño"
          ]
        ],
        "list": [
          "<b>El hecho:</b> qué pasó, concreto y reciente; nada de «siempre» ni «nunca».",
          "<b>El efecto:</b> qué provocó en el trabajo o en ti: «tuvimos que rehacer la prueba».",
          "<b>La propuesta:</b> qué harías distinto la próxima vez, y pregunta qué opina.",
          "Tu caso: pruébalo esta semana con algo pequeño en el trabajo; practicar en lo pequeño es lo que te deja usarlo en lo grande.",
          "⚠️ Error común: el sándwich de elogio, crítica y elogio. La gente aprende a esperar el golpe y deja de creer el elogio."
        ]
      },
      "Una conversación pendiente al mes": {
        "foto": "liderazgo-5.jpg",
        "cred": "photosteve101 · Flickr · CC BY 2.0",
        "pie": "Una conversación pendiente al mes: el hábito que sube tu techo sin quemarte.",
        "cifras": [
          [
            "1",
            "al mes"
          ],
          [
            "12",
            "al año"
          ],
          [
            "1",
            "cita en el calendario"
          ]
        ],
        "list": [
          "<b>Elige la siguiente de tu lista:</b> la que más pesa o la más fácil, pero una.",
          "<b>Ponle fecha y hora:</b> como cualquier cita, y prepárala con el hecho y la historia separados.",
          "<b>Después, una nota:</b> cómo salió y qué aprendiste para la siguiente.",
          "Tu caso: tu lista de tres se revisa cada mes; doce conversaciones al año cambian cómo te ven sin desgastarte.",
          "⚠️ Error común: querer tenerlas todas de una vez. Quemarse tampoco es liderar."
        ]
      }
    },
    "copy": {
      "Qué te falta, exactamente": {
        "foto": "copy-1.jpg",
        "cred": "AlaskaTeacher · Flickr · CC BY-NC-ND 2.0",
        "pie": "Escribes claro; lo que falta es pedir algo al final.",
        "cifras": [
          [
            "5",
            "textos tuyos revisados"
          ],
          [
            "1",
            "frase que pide algo concreto"
          ],
          [
            "3 de 5",
            "sin petición: ese es el hueco"
          ]
        ],
        "list": [
          "<b>Reúne cinco textos tuyos:</b> un correo a un reclutador, un mensaje a un cliente, tu perfil de LinkedIn, un post.",
          "<b>Subraya la petición:</b> la frase donde le pides al lector algo concreto: contestar, agendar, revisar.",
          "<b>Cuenta:</b> si en tres de cinco no hay ninguna, ese es tu hueco entero; no es la redacción.",
          "Tu caso: generas ideas y ganchos con facilidad; lo que falta es cerrar cada texto con lo que quieres que pase.",
          "⚠️ Error común: terminar con «quedo atento». No le dice a nadie qué hacer."
        ]
      },
      "Una promesa por texto": {
        "foto": "copy-2.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Un texto, una promesa: si no cabe en una línea, todavía no sabes qué estás escribiendo.",
        "cifras": [
          [
            "1",
            "lector"
          ],
          [
            "1",
            "acción que quieres"
          ],
          [
            "1",
            "línea antes de escribir"
          ]
        ],
        "list": [
          "<b>Antes de escribir, una línea:</b> quién lo lee y qué quiero que haga.",
          "<b>Todo se mide contra esa línea:</b> lo que no ayuda a esa acción, sale.",
          "<b>El título promete eso y nada más:</b> un texto que promete tres cosas no promete ninguna.",
          "Tu caso: aplícalo primero a tu perfil de LinkedIn, que es el texto tuyo que más gente ve.",
          "⚠️ Error común: escribir para todos. Un texto para todos no mueve a nadie."
        ]
      },
      "Reescribe tu perfil de LinkedIn": {
        "foto": "copy-3.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Lo primero que ve un reclutador: el titular dice lo que resuelves, no solo tu puesto.",
        "cifras": [
          [
            "220",
            "caracteres del titular"
          ],
          [
            "3",
            "líneas del «acerca de»"
          ],
          [
            "1",
            "resultado con número"
          ]
        ],
        "list": [
          "<b>El titular:</b> lo que resuelves y lo que buscas, en inglés: «Validation engineer · HIL & ADAS · open to Werkstudent in the Stuttgart region».",
          "<b>El «acerca de», en tres líneas:</b> qué haces, un resultado con número y cómo contactarte.",
          "<b>La experiencia, en logros:</b> qué cambió porque estuviste tú, no la lista de tareas del puesto.",
          "Tu caso: es lo primero que ve un reclutador de Stuttgart, y hoy describe un puesto, no un resultado.",
          "⚠️ Error común: un titular con solo el cargo y la empresa. Así te encuentran por lo que haces hoy, no por lo que buscas."
        ]
      },
      "El correo frío de 5 líneas": {
        "foto": "copy-4.jpg",
        "cred": "Ed Yourdon · Flickr · CC BY-NC-SA 2.0",
        "pie": "Cinco líneas que se contestan: corto, concreto y con una salida fácil.",
        "cifras": [
          [
            "5",
            "líneas"
          ],
          [
            "3",
            "correos esta semana"
          ],
          [
            "1",
            "salida fácil al final"
          ]
        ],
        "list": [
          "<b>Línea 1, por qué a esa persona:</b> algo suyo —un post, un proyecto, su equipo—, nunca genérico.",
          "<b>Líneas 2 y 3, tú:</b> qué haces en una frase y un resultado concreto.",
          "<b>Líneas 4 y 5, la petición y la salida:</b> qué le pides, fácil de contestar, y «si no es el momento, sin problema».",
          "Tu caso: es el formato que más te va a servir este año: reclutadores, proyectos y referencias para Stuttgart.",
          "⚠️ Error común: contar tu historia completa en el primer correo. El primero solo tiene que conseguir una respuesta."
        ]
      },
      "Leer en voz alta antes de enviar": {
        "foto": "copy-5.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "El filtro más barato que existe: donde te tropiezas al leer en voz alta, sobra algo.",
        "cifras": [
          [
            "30 s",
            "lo que cuesta"
          ],
          [
            "80 %",
            "de lo que te marcaría un editor"
          ],
          [
            "1",
            "tropiezo = algo que sobra"
          ]
        ],
        "list": [
          "<b>Léelo en voz alta y completo:</b> no en la cabeza; la voz no se salta palabras.",
          "<b>Donde te trabes, corta:</b> una frase que no se puede decir de corrido tampoco se lee bien.",
          "<b>Quita una palabra por frase:</b> casi siempre sobra un adverbio o un «que».",
          "Tu caso: antes de mandar la carta de Esslingen o un correo a un reclutador, este filtro de 30 segundos es obligatorio.",
          "⚠️ Error común: revisarlo justo después de escribirlo. Deja pasar unos minutos y léelo como si fuera de otro."
        ]
      }
    },
    "ventas": {
      "Vender lo que no usas a su precio": {
        "foto": "ventas-1.jpg",
        "cred": "John Beagle · Flickr · CC BY 2.0",
        "pie": "Lo que no usas también es dinero: fotos con luz, precio con margen y respuesta rápida.",
        "cifras": [
          [
            "3",
            "anuncios iguales para fijar el precio"
          ],
          [
            "+10 %",
            "de margen para negociar"
          ],
          [
            "< 1 h",
            "para contestar"
          ]
        ],
        "list": [
          "<b>Fotos con luz de día:</b> fondo limpio, el objeto completo y sus detalles; la foto vende antes que el texto.",
          "<b>El precio:</b> busca tres anuncios iguales, toma el de en medio y súbele 10 % para tener margen.",
          "<b>Contesta rápido:</b> en Marketplace vende el primero que contesta; en menos de una hora.",
          "Tu caso: cada peso de lo que vendes va a tu plan; es la venta que hoy sí rinde.",
          "⚠️ Error común: bajar el precio al primer «¿lo menos?». Pregunta cuánto ofrece; muchas veces ofrece más de lo que ibas a bajar."
        ]
      },
      "El seguimiento es la venta": {
        "foto": "ventas-2.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Casi ninguna venta cierra en el primer contacto: el seguimiento es la venta.",
        "cifras": [
          [
            "1 · 3 · 7",
            "días para el seguimiento"
          ],
          [
            "3–5",
            "contactos para cerrar"
          ],
          [
            "0",
            "presión"
          ]
        ],
        "list": [
          "<b>Día 1:</b> «¿te quedó alguna duda?»; corto y útil.",
          "<b>Día 3:</b> algo nuevo: otra foto, un dato, una hora en que puedes entregarlo.",
          "<b>Día 7:</b> el cierre amable: «te lo aparto hasta el viernes y después lo libero».",
          "Tu caso: anota quién respondió y en qué contacto; en un mes sabrás cuál te funciona.",
          "⚠️ Error común: rendirte después del primer mensaje sin respuesta. La mayoría cierra entre el tercero y el quinto."
        ]
      },
      "Negociar tu sueldo en euros": {
        "foto": "ventas-3.jpg",
        "cred": "flazingo_photos · Flickr · CC BY-SA 2.0",
        "pie": "Quien dice el número primero pone el ancla: tú preguntas el rango.",
        "cifras": [
          [
            "1",
            "rango del puesto en la región"
          ],
          [
            "1",
            "número mínimo, por escrito"
          ],
          [
            "0",
            "veces que dices tu número primero"
          ]
        ],
        "list": [
          "<b>Investiga el rango:</b> lo que paga ese puesto en la región de Stuttgart; para un Werkstudent, la tarifa por hora del sector.",
          "<b>Escribe tu mínimo:</b> antes de cualquier llamada, el número debajo del cual dices que no.",
          "<b>Pregunta primero:</b> «¿cuál es el rango previsto para el puesto?»; quien dice el número primero pone el ancla.",
          "Tu caso: ya negociaste tu sueldo al cambiar de Ford, Continental y Bosch; es la misma habilidad, en euros.",
          "⚠️ Error común: aceptar en la misma llamada. Agradece, pide un día y contesta por escrito."
        ]
      },
      "Una oferta que se pueda comprar": {
        "foto": "ventas-4.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Se empieza por la oferta, no por el anuncio: si no cabe en una frase, no está terminada.",
        "cifras": [
          [
            "1",
            "frase"
          ],
          [
            "3",
            "partes: para quién, qué resultado y en cuánto tiempo"
          ],
          [
            "0",
            "anuncios antes de la oferta"
          ]
        ],
        "list": [
          "<b>Para quién:</b> el cliente exacto, no «todos los que lo necesiten».",
          "<b>Qué resultado:</b> lo que obtiene el cliente, no lo que haces tú.",
          "<b>En cuánto tiempo:</b> un plazo concreto hace creíble la oferta.",
          "Tu caso: cuando el negocio de tu papá vuelva al plan, se empieza por esta frase, no por el anuncio.",
          "⚠️ Error común: anunciar antes de tener clara la oferta. Se gasta en llegar a gente que no sabe qué le ofreces."
        ]
      }
    },
    "marketing": {
      "Dejar el negocio en piloto automático": {
        "foto": "marketing-1.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Lo que tu papá pueda publicar sin ti: doce posts listos y la forma de hacerlo.",
        "cifras": [
          [
            "12",
            "posts listos"
          ],
          [
            "1",
            "QR de WhatsApp"
          ],
          [
            "1",
            "post publicado juntos"
          ]
        ],
        "list": [
          "<b>Doce posts completos:</b> foto, texto y fecha de cada uno; nada que haya que inventar el día.",
          "<b>El dossier y el QR:</b> en manos de tu papá, impresos y en su teléfono.",
          "<b>Publica uno con él:</b> que vea cada paso y que el siguiente lo haga él.",
          "Tu caso: las plantillas de Posts ya están en el proyecto; falta programarlas y entregarlas.",
          "⚠️ Error común: dejar todo listo y no enseñar a usarlo. Un sistema que solo tú sabes mover se detiene cuando te vas."
        ]
      },
      "Una métrica antes de gastar": {
        "foto": "marketing-2.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Sin medir no sabes si un post funciona o solo se ve bien.",
        "cifras": [
          [
            "3",
            "números por post: vistas, comentarios y mensajes"
          ],
          [
            "1",
            "formato que repites al mes"
          ],
          [
            "$0",
            "gastados antes de medir"
          ]
        ],
        "list": [
          "<b>Anota los tres números:</b> vistas, comentarios y mensajes de cada post, en una tabla sencilla.",
          "<b>El que manda es mensajes:</b> las vistas no pagan; un mensaje es alguien que preguntó.",
          "<b>Al mes, decide:</b> repite el formato que más mensajes trajo y deja el que menos.",
          "Tu caso: con la tabla de un mes sabes qué funciona en el negocio de tu papá antes de gastar un peso.",
          "⚠️ Error común: medir por «me gusta». Se ven bien y no traen clientes."
        ]
      },
      "Un canal a la vez": {
        "foto": "marketing-3.jpg",
        "cred": "Autor desconocido · Rawpixel · CC0 1.0",
        "pie": "Tres redes a medias no traen un cliente: una, cuatro semanas seguidas.",
        "cifras": [
          [
            "1",
            "canal"
          ],
          [
            "4",
            "semanas seguidas"
          ],
          [
            "0",
            "redes abiertas a medias"
          ]
        ],
        "list": [
          "<b>Elige donde ya están los clientes:</b> pregunta a los clientes de hoy dónde los encontraron o dónde pasan el tiempo.",
          "<b>Cuatro semanas seguidas:</b> con un calendario fijo; un canal necesita constancia para mostrar resultados.",
          "<b>Después, evalúa:</b> con la tabla de mensajes; si funciona, se queda; si no, se cambia, no se suma otro.",
          "Tu caso: para el negocio de tu papá, un canal bien llevado vale más que tres que nadie atiende.",
          "⚠️ Error común: abrir todas las redes el primer día. Ninguna recibe lo que necesita."
        ]
      }
    }
  };
  /* ── La práctica de cada paso: la sesión, cómo sabes que salió y lo que se copia ──
     Adán, 26-oct-2026: "agrega más contenido… cosas súper útiles, porque solo me pones info superficial". Por habilidad
     y por el nombre del paso, como APRENDIZAJE_DETALLE: `sesion`, la sesión en minutos —[minutos, qué haces], en tres
     tiempos: cómo arrancas, el bloque y con qué cierras (el prompt de la página: "qué hacer en los primeros diez
     minutos, cómo sabe que salió y qué deja hecho")—; `sale`, el criterio de que salió, y `copia`, lo que se usa tal
     cual —un guion, una plantilla, un código, una lista— con su título (`t`) y sus renglones (`l`), en texto plano.
     Se mezcla en cada paso al cargar; el control 45 del verificador exige los tres. */
  const APRENDIZAJE_PRACTICA = {
    ia: {
      "El syllabus, capítulo por capítulo": {
        sesion: [[10, "Abre el capítulo en sus objetivos de aprendizaje y convierte cada uno en una pregunta: «¿qué es…?», «¿cuándo conviene…?»."],
                 [35, "Lee buscando la respuesta a esas preguntas; marca solo los términos en inglés que el syllabus define."],
                 [15, "Cierra el PDF: llena la tarjeta de memoria y contesta en el simulacro las preguntas de ese capítulo."]],
        sale: "Llenas la tarjeta sin mirar y aciertas al menos 4 de cada 5 preguntas del capítulo.",
        copia: { t: "La tarjeta de cada capítulo", l: [
          "Capítulo __ · fecha __",
          "1. Término: ______ = su definición del syllabus, en una línea",
          "2. Término: ______ = …",
          "3. Cuándo se usa: ______ · cuándo NO: ______",
          "4. El riesgo que menciona: ______",
          "5. Un ejemplo de pruebas de tu trabajo: ______",
          "Preguntas falladas → su sección: ______"] } },
      "El simulacro como termómetro": {
        sesion: [[5, "Celular en otro cuarto, reloj a la vista y la hoja de fallos al lado."],
                 [60, "El simulacro completo, de una sentada y con el tiempo del examen; marca con «?» lo que contestaste dudando."],
                 [20, "Revisa fallos y dudas: de cada uno, su sección del syllabus y por qué la otra opción era la correcta."]],
        sale: "Terminas antes del reloj, con 34 o más, y cada fallo queda anotado con su sección.",
        copia: { t: "La hoja de fallos", l: [
          "Simulacro #__ · fecha __ · puntos __ de 46 · tiempo __ min",
          "Pregunta | Sección del syllabus | Elegí | Correcta | Por qué me equivoqué",
          "__ | __ | __ | __ | no conocía el término / leí mal / dudé entre dos",
          "Las 3 secciones con más fallos = mis sesiones de la semana:",
          "1. ______   2. ______   3. ______"] } },
      "Una prueba con IA que puedas enseñar": {
        sesion: [[10, "Escribe el requisito en dos líneas: qué hace la función, con qué entradas y en qué condiciones."],
                 [30, "Pide los casos con el prompt de abajo y clasifica cada uno: correcto, repetido, imposible o falta."],
                 [20, "Escribe el README en inglés: qué dio el modelo, qué se le escapó y qué instrucción lo mejoró."]],
        sale: "Tu tabla dice cuántos casos útiles dio el modelo y encontraste al menos tres que faltaban.",
        copia: { t: "El prompt para pedir casos de prueba", l: [
          "Role: You are a senior test engineer for automotive ADAS functions.",
          "Requirement: <el requisito en dos líneas; p. ej., Autonomous Emergency Braking>",
          "Inputs and ranges: <speed 0–130 km/h, distance to obstacle 0–150 m, …>",
          "Task: Generate test cases as a table: ID | precondition | inputs | expected result | technique.",
          "Techniques: boundary values, equivalence classes and fault injection.",
          "Include: sensor failure, degraded weather and at least 3 negative cases.",
          "Do not invent requirements; list every assumption separately."] } },
      "Automatiza una tarea tuya": {
        sesion: [[10, "Elige la tarea que repites cada semana con los mismos pasos y mide cuánto tardas hoy."],
                 [10, "Escribe los pasos a mano, del disparador al resultado, en la ficha de abajo."],
                 [40, "Arma la automatización con n8n o un script de Python y pruébala con el caso de esta semana."]],
        sale: "La tarea corre sin ti y anotaste los minutos que te ahorra al mes.",
        copia: { t: "La ficha de la automatización", l: [
          "Tarea: ______ · se repite __ veces al mes · tardo __ min",
          "Disparador: cuándo arranca (una hora, un correo, un archivo nuevo)",
          "Paso 1: ______",
          "Paso 2: ______",
          "Paso 3: ______",
          "Resultado: qué queda hecho y dónde",
          "Ahorro: __ min × __ veces = __ min al mes",
          "Para la entrevista: «Automaticé ____, que me tomaba __ min a la semana, con ____.»"] } },
      "Lo que no se le delega a la IA": {
        sesion: [[10, "Pregunta a tu líder, o busca en la intranet, qué herramientas de IA están aprobadas en {{empleador}} y con qué datos."],
                 [20, "Toma una salida de IA de esta semana y pásala por la lista de abajo, punto por punto."],
                 [10, "Escribe tu regla en tres líneas: qué nunca pegas, qué siempre compruebas y quién revisa."]],
        sale: "Sabes qué herramientas están aprobadas y cada salida que usas pasó la lista.",
        copia: { t: "La lista antes de usar una salida de IA", l: [
          "☐ ¿Pegué datos de un cliente, código o requisitos fuera de una herramienta aprobada? Si sí, para.",
          "☐ Cada número, norma o cita: ¿lo comprobé en su fuente?",
          "☐ ¿Faltan casos raros? Límites, fallas, combinaciones.",
          "☐ ¿Lo revisé como revisaría el trabajo de alguien nuevo en el equipo?",
          "☐ ¿Queda claro qué hizo la IA y qué revisé yo?"] } },
    },
    ingles: {
      "Tu nivel real es el de hablar bajo presión": {
        sesion: [[5, "Teléfono a grabar, sin notas: «Tell me about yourself», dos minutos de corrido."],
                 [15, "Escúchate con una hoja: cuenta pausas largas, muletillas y frases que se notan traducidas."],
                 [10, "Contesta otra vez con la estructura de abajo, graba y compara los tres números."]],
        sale: "Tienes tus tres números de hoy y la segunda grabación trae menos pausas que la primera.",
        copia: { t: "Tell me about yourself, en 90 segundos", l: [
          "Present: I'm a validation engineer at {{empleador}}, working on HIL testing for ADAS functions.",
          "Past: Over the last six years I've validated automotive software at Ford, Continental and Bosch, where I led a test team in Stuttgart.",
          "Proof: <un resultado con número: «I cut regression time from __ to __ by automating __»>",
          "Future: Now I want to go deeper into systems with the Automotive Systems master's in Esslingen, and work as a Werkstudent in validation.",
          "Close: That's why this role caught my attention: ______."] } },
      "La carta de motivación de Esslingen": {
        sesion: [[10, "Lee la página del programa y anota tres cosas concretas que te atan a él: su enfoque, un laboratorio, la región."],
                 [35, "Escribe el borrador en los cuatro párrafos de abajo, de corrido y sin pulir."],
                 [15, "Léelo en voz alta, corta un 10 % y mándalo a quien lo critique sin piedad."]],
        sale: "Una página, cuatro párrafos, y en las dos primeras líneas ya se lee por qué Esslingen.",
        copia: { t: "La carta en cuatro párrafos", l: [
          "1. The hook (3–4 lines): why Automotive Systems at Esslingen, with one specific detail of the program and of the Stuttgart region.",
          "2. What I bring (6–8 lines): six years of validation, HIL and ADAS at Ford, Continental, Bosch and {{empleador}}; one result with a number per company.",
          "3. Why now (3–4 lines): the gap the master's closes —systems engineering, the German industry— and how you will fund it.",
          "4. After the degree (3–4 lines): a Werkstudent role in validation, then a full-time role in the region, and what you add to the cohort.",
          "Closing line: I would welcome the opportunity to bring my industry experience to the program."] } },
      "El vocabulario de TU trabajo primero": {
        sesion: [[15, "Repasa los correos y las juntas de la semana y anota los términos que dudarías al decir."],
                 [20, "Por cada término, una frase completa tuya, como las de abajo."],
                 [10, "Dilas en voz alta tres veces; mañana, en el coche, sin mirar."]],
        sale: "Llevas 40 términos con su frase y dices 30 sin mirar.",
        copia: { t: "Tus primeras frases de trabajo", l: [
          "The trade-off here is latency versus accuracy.",
          "This edge case fails when the sensor signal drops for more than 100 ms.",
          "The root cause was a timing issue in the CAN message, not the algorithm.",
          "We need to deprecate this test bench configuration by Q2.",
          "Can we align on the acceptance criteria before we start testing?",
          "The regression suite covers most requirements; the gap is in fault injection.",
          "I'd push back on that: if the requirement is ambiguous, the test is ambiguous too.",
          "Let me walk you through the test results."] } },
      "Simulacros de entrevista de verdad": {
        sesion: [[5, "Elige tres preguntas de la lista y pon el teléfono a grabar."],
                 [25, "Contesta cada una con STAR en dos minutos, solo con tus puntos, sin texto escrito."],
                 [15, "Escucha, anota una sola cosa a corregir y repite la peor respuesta una vez más."]],
        sale: "Cada respuesta dura menos de dos minutos y termina con un resultado con número.",
        copia: { t: "Las preguntas que siempre salen", l: [
          "Tell me about a project you're proud of.",
          "Describe a technical conflict and how you resolved it.",
          "Tell me about a time a test you designed found a critical bug.",
          "Why this company? Why Germany?",
          "What's your biggest weakness? (una real, con lo que haces para corregirla)",
          "STAR: Situation (1 frase) · Task (1 frase) · Action, lo que hiciste TÚ (3 frases) · Result, con número",
          "Para ganar tiempo: That's a good question — let me think of the best example."] } },
      "Pensar en inglés durante el manejo": {
        sesion: [[5, "Antes de arrancar, deja listo el episodio de Qué escuchar."],
                 [40, "Escucha y pausa después de cada frase útil: dila en voz alta dos veces. Con pasajero, solo escuchas."],
                 [5, "Al estacionarte, narra en inglés lo que harás mañana, en 30 segundos."]],
        sale: "Repetiste al menos diez frases en voz alta y narraste sin pausas largas.",
        copia: { t: "Frases para narrar al volante", l: [
          "Traffic is heavy on ___ because ___.",
          "I'm taking ___ instead of ___ to avoid ___.",
          "Tomorrow I need to ___, so first I'll ___.",
          "The main risk this week is ___; my plan B is ___.",
          "If I had to explain my job to a kid, I'd say ___."] } },
      "Cero traducción en el trabajo": {
        sesion: [[10, "Cambia a inglés el idioma del teléfono y del editor (en VS Code: Configure Display Language)."],
                 [10, "Escribe en inglés la lista de pendientes de mañana y tus próximos commits."],
                 [10, "Lee en inglés la documentación de lo que usas hoy; si una palabra no sale, búscala y sigue."]],
        sale: "Una semana con el teléfono y el editor en inglés, sin regresarlos.",
        copia: { t: "Plantillas para escribir en inglés todo el día", l: [
          "Commit: fix(can): handle timeout when the ECU response exceeds 200 ms",
          "Commit: test(aeb): add boundary cases for 0 and 130 km/h",
          "To-do: Follow up with ___ on ___ by ___.",
          "Note: Decision: ___ · Why: ___ · Next step: ___",
          "Email: Quick update: ___ is done; ___ is blocked by ___. I'll update you by ___."] } },
    },
    codigo: {
      "Qué te pide el puesto que quieres": {
        sesion: [[15, "Busca cinco anuncios: «Werkstudent Validierung», «Werkstudent HiL», «Working student ADAS testing», región Stuttgart."],
                 [20, "Pasa cada requisito a la tabla de abajo y cuenta en cuántos anuncios sale."],
                 [10, "Marca lo que resolverías mañana sin buscar; los «no» más repetidos son tu ruta."]],
        sale: "La tabla con cinco anuncios y tres huecos ordenados por frecuencia.",
        copia: { t: "La tabla de requisitos", l: [
          "Requisito | Anuncios que lo piden (de 5) | ¿Lo resuelvo mañana sin buscar? | Con qué lo demuestro",
          "Python | _/5 | sí / no | ______",
          "pytest | _/5 | sí / no | ______",
          "CAN / CANoe | _/5 | sí / no | ______",
          "HiL / dSPACE | _/5 | sí / no | ______",
          "CI (GitHub Actions, Jenkins) | _/5 | sí / no | ______",
          "Alemán (el nivel que piden) | _/5 | ______ | ______",
          "Mi ruta = los «no» con más anuncios, en orden."] } },
      "Tests antes que features": {
        sesion: [[10, "Escribe en una frase qué debe pasar después del arreglo: la entrada y el resultado esperado."],
                 [20, "Escribe la prueba y córrela: tiene que fallar, y por la razón correcta."],
                 [20, "Haz el arreglo mínimo hasta que pase y limpia el código con la prueba en verde."]],
        sale: "La prueba falló antes del arreglo, pasa después y cubre un caso límite.",
        copia: { t: "El ciclo, en pytest", l: [
          "# 1. Rojo: la prueba dice lo que esperas",
          "def test_frena_si_el_choque_es_en_menos_de_1_5_s():",
          "    assert decidir_frenado(velocidad_kmh=50, distancia_m=8) is True",
          "",
          "# 2. Verde: el arreglo mínimo",
          "def decidir_frenado(velocidad_kmh, distancia_m):",
          "    ttc = distancia_m / (velocidad_kmh / 3.6)   # tiempo al choque, en segundos",
          "    return ttc < 1.5",
          "",
          "# 3. El límite: falla (división entre cero) hasta que el arreglo cubra el auto detenido",
          "def test_auto_detenido_no_frena():",
          "    assert decidir_frenado(velocidad_kmh=0, distancia_m=8) is False"] } },
      "pytest de verdad": {
        sesion: [[10, "Crea test_pid.py con una primera prueba que pase: pytest la encuentra solo."],
                 [30, "Pasa los casos a parametrize —normal, límites y falla— y añade un fixture."],
                 [15, "Sube el workflow de abajo y comprueba que GitHub Actions corre en verde."]],
        sale: "Al hacer push, GitHub Actions corre tus pruebas y el README enseña la insignia en verde.",
        copia: { t: "parametrize, fixture y CI", l: [
          "import pytest",
          "from control import pid_salida   # kp*error + ki*integral + kd*derivada",
          "",
          "@pytest.fixture",
          "def ganancias():",
          "    return {\"kp\": 1.2, \"ki\": 0.1, \"kd\": 0.05}",
          "",
          "@pytest.mark.parametrize(\"error, esperado\", [(0, 0), (1, 1.2), (-1, -1.2)])",
          "def test_proporcional(ganancias, error, esperado):",
          "    assert pid_salida(error, integral=0, derivada=0, **ganancias) == pytest.approx(esperado)",
          "",
          "# .github/workflows/test.yml",
          "on: [push]",
          "jobs:",
          "  test:",
          "    runs-on: ubuntu-latest",
          "    steps:",
          "      - uses: actions/checkout@v4",
          "      - uses: actions/setup-python@v5",
          "        with:",
          "          python-version: \"3.12\"",
          "      - run: pip install pytest",
          "      - run: pytest -q"] } },
      "Un proyecto que se pueda enseñar": {
        sesion: [[10, "Escribe el alcance en tres renglones: qué entra, qué sale y qué decide."],
                 [40, "Avanza una sola pieza —la lectura, el filtro, la decisión o las pruebas— y haz commit."],
                 [10, "Anota en el README la decisión difícil de hoy, aunque sea en borrador."]],
        sale: "Cada sesión cierra con un commit y el README crece con una decisión explicada.",
        copia: { t: "El README que lee un reclutador", l: [
          "# Sensor filter for emergency braking (demo)",
          "What it does: reads radar distance at 20 Hz, filters the noise and decides when to brake.",
          "Why: <una frase con tu experiencia en validación>",
          "How to run: pip install -r requirements.txt && pytest",
          "Design decision: Kalman filter vs moving average → chose ___ because ___ (trade-off: ___).",
          "Tests: __ cases — nominal, boundaries, sensor dropout. CI: GitHub Actions.",
          "What I'd do next: ___"] } },
      "Leer código ajeno a propósito": {
        sesion: [[5, "Elige un archivo de 200 a 400 líneas de Autoware o ROS 2, y su archivo de pruebas."],
                 [35, "Léelo de arriba abajo; de cada función, una línea: qué hace y por qué así."],
                 [10, "Anota una idea que copiarías y dónde la usarías esta semana."]],
        sale: "Explicas el archivo en tres frases y tienes una idea nueva anotada.",
        copia: { t: "La ficha de lectura", l: [
          "Repositorio y archivo: ______ (__ líneas)",
          "Qué resuelve, en una frase: ______",
          "Cómo maneja los errores: ______",
          "Un nombre o un patrón que me gustó: ______",
          "Qué espera su prueba (test_*): ______",
          "La idea que copio, y dónde: ______"] } },
      "Media hora diaria, no seis el domingo": {
        sesion: [[5, "Abre el ejercicio donde quedó ayer: la nota del final te dice qué sigue."],
                 [20, "Escríbelo tú, sin IA."],
                 [5, "Compáralo con lo que propone la IA y deja la nota para mañana."]],
        sale: "Cinco mañanas de cinco con su sesión, cada una con su nota para la siguiente.",
        copia: { t: "La nota del final de cada sesión", l: [
          "Fecha: __ · Ejercicio: ______",
          "Lo terminé: sí / no · Lo escribí sin IA: sí / no",
          "Qué me trabó: ______",
          "Lo que la IA hizo distinto, y si era mejor: ______",
          "Mañana empiezo por: ______"] } },
    },
    network: {
      "Tu red real, en una hoja": {
        sesion: [[15, "Recorre LinkedIn, WhatsApp y tu correo por empresa: Ford, Continental, Bosch, {{empleador}}, el IPN."],
                 [20, "Llena la hoja con 20 nombres y la fecha del último contacto."],
                 [5, "Ordena por fecha y marca los cinco que pasan de un año."]],
        sale: "Veinte nombres con fecha y cinco marcados para escribirles esta semana.",
        copia: { t: "Las columnas de tu hoja", l: [
          "Nombre | Empresa hoy | Dónde nos conocimos | Último contacto | Qué le puedo ofrecer | Siguiente paso",
          "Ej.: ____ | Bosch, Stuttgart | proyecto HIL, 20__ | mar 2025 | un artículo de su tema | mensaje sin pedir nada",
          "Regla: más de 12 meses sin hablar → a la lista de esta semana."] } },
      "Las cartas de recomendación, ya": {
        sesion: [[10, "Elige a tus dos: un jefe que te vio trabajar y un líder técnico o profesor."],
                 [20, "Adapta el correo de abajo para cada uno, con tres hechos concretos tuyos."],
                 [10, "Ofrece el borrador y pon en tu calendario el recordatorio a una semana."]],
        sale: "Los dos correos salen hoy, con fecha límite, y los dos aceptan o te dan otro nombre.",
        copia: { t: "El correo para pedir la carta", l: [
          "Asunto: ¿Me ayudarías con una carta de recomendación para mi maestría en Alemania?",
          "Hola ____: voy a aplicar a {{maestriaEscuela}}, que empieza el {{maestriaInicio}}.",
          "Me ayudaría mucho una carta tuya, en inglés, porque me viste trabajar en ____.",
          "Si puedes mencionar: 1) ____ 2) ____ 3) ____ (hechos, con su resultado).",
          "La necesito antes del ____. Si te sirve, te mando un borrador para que lo ajustes.",
          "Si no es buen momento, lo entiendo perfectamente. ¡Gracias!"] } },
      "Reactivar sin pedir nada": {
        sesion: [[10, "De tu hoja, toma los cinco más viejos y busca algo suyo reciente: un post, su empresa, un cambio."],
                 [20, "Escribe los cinco mensajes con las plantillas: tres líneas y sin pedir nada."],
                 [5, "Anota en la hoja la fecha de hoy y qué mandaste."]],
        sale: "Cinco mensajes enviados y al menos dos respuestas en la semana.",
        copia: { t: "Tres mensajes que no piden nada", l: [
          "Útil: «Vi este artículo sobre ____ y me acordé de lo que hacían en ____. Por si te sirve: (link). ¡Saludos!»",
          "Felicitación: «¡Felicidades por ____! Vi que ahora estás en ____, se oye muy interesante. ¿Qué tal el cambio?»",
          "Pregunta: «Oye, ¿cómo les fue con ____ que mencionaste? Me quedé con la curiosidad.»"] } },
      "Stuttgart antes de llegar": {
        sesion: [[10, "Elige a una persona: alguien de Bosch con quien trabajaste o un mexicano en Stuttgart."],
                 [10, "Mándale la petición de abajo: 20 minutos y una pregunta concreta."],
                 [25, "En la llamada, tres preguntas: escuchas, anotas y cierras con «¿con quién más me recomiendas hablar?»."]],
        sale: "Una llamada al mes desde marzo, anotada en tu hoja con lo que aprendiste.",
        copia: { t: "La petición y las preguntas", l: [
          "Mensaje: «Hola ____, me mudo a Stuttgart el {{maestriaInicio}} para la maestría en Esslingen. ¿Tendrías 20 minutos en las próximas dos semanas? Quiero entender cómo se busca un Werkstudent en validación allá.»",
          "1. ¿Cómo encontraste tu primer trabajo allá y qué te funcionó?",
          "2. ¿Qué equipos contratan Werkstudent en pruebas o HIL?",
          "3. ¿Qué nivel de alemán piden de verdad en el día a día?",
          "Cierre: ¿con quién más me recomiendas hablar?"] } },
      "La pregunta que abre puertas": {
        sesion: [[10, "Elige a dos personas que trabajan donde quieres entrar y mándales la petición."],
                 [20, "En la conversación, la pregunta y las de seguimiento de abajo; tú hablas el 20 %."],
                 [10, "Anota las palabras que usan y manda un agradecimiento con algo útil."]],
        sale: "Dos conversaciones antes de tu primera entrevista de Werkstudent, y una presentación a alguien más.",
        copia: { t: "La conversación, en cinco preguntas", l: [
          "1. ¿Qué te habría gustado saber antes de entrar?",
          "2. ¿Cómo es una semana normal en tu equipo?",
          "3. ¿Qué tiene el Werkstudent al que luego contratan?",
          "4. ¿Qué herramientas usan todos los días?",
          "5. ¿Hay alguien más con quien me recomiendes hablar?"] } },
      "Una hora al mes, en el calendario": {
        sesion: [[15, "Revisa la hoja: quién pasó de seis meses, quién respondió, a quién conociste este mes."],
                 [30, "Escribe a tres personas con las plantillas de «Reactivar sin pedir nada»."],
                 [15, "Añade a los nuevos y una nota de cada conversación del mes."]],
        sale: "La cita está en tu calendario los próximos doce meses y este mes escribiste a tres personas.",
        copia: { t: "La cita fija", l: [
          "Título: Red · 1 h · el primer sábado de cada mes",
          "Minuto 0 a 15: revisar la hoja (fechas, respuestas, nuevos)",
          "Minuto 15 a 45: tres mensajes (útil, felicitación o pregunta)",
          "Minuto 45 a 60: añadir a los nuevos y una nota por conversación",
          "Indicador: contactos con menos de seis meses sin hablar: __ de __"] } },
    },
    finanzas: {
      "Págate primero": {
        sesion: [[10, "En la app de {{bancoSueldo}}, programa la transferencia recurrente del día 15."],
                 [10, "Haz lo mismo con la del día 1 y revisa a dónde va: a la tarjeta BBVA mientras tenga saldo; después, a {{broker}}."],
                 [10, "Anota en Finanzas lo que queda para gastar y divídelo entre los días de la quincena."]],
        sale: "Las dos transferencias están programadas y el día que entra la quincena salen solas.",
        copia: { t: "Tu calendario de págate primero", l: [
          "Día 1: {{ahorroDia1}} sale en cuanto entra la quincena.",
          "Día 15: {{ahorroDia15}} sale en cuanto entra la quincena.",
          "Didi: {{didiAhorro}} al mes, apartado cada lunes.",
          "A dónde: a la tarjeta BBVA mientras tenga saldo; después, a {{broker}}.",
          "Lo que queda en la cuenta ÷ los días de la quincena = tu tope diario."] } },
      "Saber a dónde se va tu dinero": {
        sesion: [[2, "Al pagar, anota el gasto en Finanzas en ese momento: monto, categoría y una palabra."],
                 [5, "En la noche, revisa contra tu banca móvil que estén todos los del día."],
                 [15, "El día 30, ordena las cinco categorías de mayor a menor y elige un recorte en la primera."]],
        sale: "Treinta días seguidos sin hueco, y un recorte con su monto en la categoría más alta.",
        copia: { t: "Las cinco categorías y el cierre del día 30", l: [
          "Fijos (renta, servicios, suscripciones): $____",
          "Comida (súper y fuera): $____",
          "Transporte (gasolina, casetas, mantenimiento): $____",
          "Deuda (abonos): $____",
          "Gusto (todo lo demás): $____",
          "Las tres primeras: 1) ____ 2) ____ 3) ____",
          "Un recorte: en ____ bajo $____ al mes haciendo ____."] } },
      "Presupuestar sobre ingreso variable": {
        sesion: [[15, "Saca de Finanzas lo que entró en cada uno de los últimos tres meses: sueldo más Didi."],
                 [15, "Toma el más bajo y arma con él el presupuesto del mes, con la plantilla."],
                 [5, "Fija la regla: lo que entre arriba del mínimo va a tu plan el mismo día."]],
        sale: "El presupuesto del mes cuadra con tu peor mes, y lo extra de Didi salió el lunes.",
        copia: { t: "El presupuesto sobre tu mínimo", l: [
          "Mes 1: $____ · Mes 2: $____ · Mes 3: $____ → el mínimo: $____",
          "Fijos: {{fijosTotal}}",
          "Ahorro, págate primero: $____",
          "Comida: $____",
          "Gasto personal: $____",
          "El mínimo − todo lo anterior = $____ (tiene que ser cero o más)",
          "Regla: cada peso arriba del mínimo va al plan el mismo día."] } },
      "Decidir con la cabeza fría": {
        sesion: [[2, "Cuando quieras algo de más de $2,000, anótalo en la lista de abajo con fecha y hora."],
                 [3, "Escribe en una línea para qué lo quieres y qué dejarías de hacer con ese dinero."],
                 [5, "A las 72 horas, relee: si sigue valiendo, cómpralo sin culpa; si no, táchalo."]],
        sale: "Cada compra grande del mes pasó por la lista, y al menos una se tachó.",
        copia: { t: "La lista de las 72 horas", l: [
          "Qué: ______ · Precio: $____ · Fecha y hora: ______",
          "Para qué: ______",
          "Con ese dinero dejo de: ______",
          "Lo decido el: ______ (72 horas después)",
          "Decisión: compro / no compro · Por qué: ______"] } },
      "Calcular el costo real de la deuda": {
        sesion: [[10, "Abre el estado de cuenta de cada deuda y copia el saldo, la tasa anual y el CAT."],
                 [10, "Ordénalas en la tabla, de mayor a menor CAT."],
                 [10, "Calcula con la fórmula de abajo cuánto te cuesta cada una al mes."]],
        sale: "Sabes el CAT de cada deuda, el orden de pago y cuánto te cuesta al mes la más cara.",
        copia: { t: "Tus deudas y su costo al mes", l: [
          "Deuda | Saldo | Tasa anual | CAT | Mínimo | Costo al mes",
          "Interés del mes ≈ saldo × tasa anual ÷ 12",
          "Ej.: $10,000 × 60 % ÷ 12 = $500 al mes, solo de intereses.",
          "Orden de pago (avalancha): el mínimo a todas y todo lo extra a la de CAT más alto.",
          "Antes de un MSI: mensualidad ÷ tu excedente del mes = __ % comprometido por __ meses."] } },
      "El colchón dentro de la cuenta": {
        sesion: [[10, "Calcula tu colchón: un mes de fijos, {{fijosTotal}}."],
                 [10, "Compáralo con lo que tienes hoy en CETES: lo ves en Finanzas o en Qué invertir hoy."],
                 [10, "Escribe la regla de abajo y decide de qué quincena sale lo que falta."]],
        sale: "El colchón vive en CETES, aparte de la cuenta del día a día, y tiene su regla escrita.",
        copia: { t: "La regla del colchón", l: [
          "Cuánto: un mes de fijos = {{fijosTotal}}.",
          "Dónde: CETES a 28 días en cetesdirecto; se sacan en 24 a 48 horas.",
          "Sí es emergencia: la salud, el {{auto}}, una reparación o un gasto que no podía prever.",
          "No es emergencia: un viaje, una oferta, un regalo, «me lo merezco».",
          "Si lo uso: lo repongo con la quincena siguiente, antes que cualquier otro ahorro."] } },
      "Leer tu propio balance": {
        sesion: [[5, "El primer domingo del mes, abre Patrimonio en el Dashboard."],
                 [10, "Copia tus activos y tus pasivos a la tabla de abajo."],
                 [5, "Compara con el mes pasado y escribe una frase: por qué subió o bajó."]],
        sale: "Doce meses seguidos anotados, y el número sube en la mayoría.",
        copia: { t: "Tu balance de cada mes", l: [
          "Mes: ______",
          "Activos: efectivo $____ + CETES $____ + {{broker}} $____ + {{auto}} $____ = $____",
          "Pasivos: tarjeta $____ + auto $____ + MSI $____ = $____",
          "Patrimonio = activos − pasivos = $____",
          "Contra el mes pasado: +/− $____ · Por qué: ______"] } },
      "Entender tus impuestos": {
        sesion: [[10, "Entra al portal del SAT con tu RFC y descarga tu constancia de situación fiscal."],
                 [15, "Revisa tu régimen y si tus gastos médicos del año tienen factura a tu RFC."],
                 [10, "Llena la lista de abajo y pon abril en tu calendario para la declaración anual."]],
        sale: "Tienes tu constancia, sabes tu régimen y hay una carpeta con las facturas deducibles del año.",
        copia: { t: "Tu lista fiscal del año", l: [
          "☐ Constancia de situación fiscal descargada (régimen: ______)",
          "☐ Facturas de gastos médicos, dentales y lentes a mi RFC, pagadas con tarjeta o transferencia",
          "☐ Constancias anuales de {{broker}} y cetesdirecto",
          "☐ Didi: ¿me retiene impuestos y me da constancia? ______",
          "☐ Declaración anual: en abril; recordatorio el 1 de abril",
          "☐ Antes de irme: cómo y cuándo se avisa al SAT el cambio de residencia"] } },
    },
    inversion: {
      "Saber cuándo NO invertir": {
        sesion: [[5, "Abre Qué invertir hoy y mira en qué escalón del orden estás."],
                 [10, "Llena la escalera de abajo con tus números de hoy."],
                 [5, "Escribe la siguiente acción: a qué va la próxima quincena."]],
        sale: "Sabes en qué escalón estás, y la próxima quincena va al que toca, no al que da comezón.",
        copia: { t: "La escalera, con tus números", l: [
          "1. Fondo de emergencia: $____ de $____ (los dos números te los da Qué invertir hoy) → ¿completo? sí / no",
          "2. Deuda cara, la tarjeta: $____ → ¿sin saldo? sí / no",
          "3. Invertir: solo si 1 y 2 dicen sí.",
          "La cuenta que lo explica: una tarjeta cobra más de 30 % al año; un buen año de bolsa da cerca de 10 %.",
          "Mi próxima quincena va a: ______"] } },
      "Conocer los instrumentos mexicanos": {
        sesion: [[10, "Elige un instrumento de la tabla y lee su ficha en Banxico o en cetesdirecto."],
                 [15, "Llena sus datos: para qué, plazo, riesgo e impuesto."],
                 [5, "Explícalo en voz alta en una frase; si no te sale, no lo compras."]],
        sale: "La tabla completa con lo que usas, y cada instrumento cabe en una frase tuya.",
        copia: { t: "Tu tabla de instrumentos", l: [
          "Instrumento | Para qué | Plazo | Riesgo | Impuesto",
          "CETES | colchón y renta fija | 28 a 364 días | muy bajo | retención anual sobre el capital",
          "VOO, en el SIC de {{broker}} | crecer a largo plazo | años | medio a alto | 10 % de la ganancia al vender",
          "Udibonos | protegerte de la inflación | 3 a 30 años | bajo | retención anual",
          "Bitcoin | apuesta chica | sin plazo | muy alto | la ganancia se suma a tu ingreso",
          "Afore | tu retiro | hasta los 65 | según tu Siefore | lo voluntario es deducible, con tope"] } },
      "Interés compuesto y horizonte": {
        sesion: [[10, "Junta tus números: cuánto aportas al mes, desde cuándo y hasta cuándo."],
                 [15, "Haz la cuenta en una hoja de cálculo con la fórmula de abajo."],
                 [5, "Repítela con un año menos de aportes y escribe la diferencia en pesos."]],
        sale: "Tienes dos números —con y sin un año de aportes— y la diferencia escrita.",
        copia: { t: "La cuenta, en una hoja de cálculo", l: [
          "=VF(tasa_anual/12; meses; -aporte_mensual; -saldo_de_hoy)",
          "Tu aporte: tu ahorro del mes, {{ahorroMesDepa}} con depa o {{ahorroMesCasa}} en casa.",
          "Ej.: =VF(9%/12; 60; -aporte; 0) = lo que juntas en cinco años al 9 % anual.",
          "Regla del 72: 72 ÷ la tasa = los años para duplicar; al 9 %, unos ocho.",
          "La lección: un año menos no son doce aportes menos; son doce aportes más todo lo que habrían rendido."] } },
      "Escribir tu asignación objetivo": {
        sesion: [[10, "Mira lo que tienes hoy en {{broker}}, CETES y Bitcoin y saca tus porcentajes actuales."],
                 [15, "Decide tus tres porcentajes objetivo con la regla de abajo."],
                 [5, "Escríbelos con fecha en un renglón y guárdalo junto a tu regla para las caídas."]],
        sale: "Un renglón con tres porcentajes que suman 100, con fecha, y la próxima compra ya sabe a dónde va.",
        copia: { t: "Tu asignación, en un renglón", l: [
          "Asignación al __/__/____: CETES __ % · índice __ % · riesgo alto __ % = 100 %",
          "Regla del riesgo alto: nunca más de lo que puedas ver caer a la mitad sin tocarlo.",
          "Cada compra va a la parte que esté más abajo de su porcentaje.",
          "Se revisa una vez al año (el ______), no cuando el mercado se mueve."] } },
      "Aportar periódicamente y automatizarlo": {
        sesion: [[10, "Decide el monto y el día: el lunes de {{broker}} y el día que entra la quincena."],
                 [10, "Programa la transferencia y, si tu casa de bolsa lo permite, la compra recurrente."],
                 [5, "Pon en el calendario cuándo subes el monto: cuando suba el ingreso."]],
        sale: "El aporte sale sin que lo decidas, y llevas la cuenta de meses seguidos sin saltarte uno.",
        copia: { t: "Tu regla de aportes", l: [
          "Monto: $____ · Día: ______ · A: ______",
          "Sube cuando: sube el sueldo, termina una deuda o cambia tu etapa (en casa, {{ahorroMesCasa}} al mes).",
          "Nunca baja por: cómo se ve el mercado.",
          "Meses seguidos sin saltarme uno: __ de 12"] } },
      "Ver las comisiones antes que el rendimiento": {
        sesion: [[10, "Elige lo que vas a comprar y busca sus tres costos en dos casas de bolsa."],
                 [10, "Llena la tabla y haz la cuenta de veinte años de abajo."],
                 [5, "Quédate con la opción más barata del MISMO índice."]],
        sale: "Antes de cada compra sabes cuánto cuesta al año, y elegiste la versión más barata.",
        copia: { t: "Cuánto pesa una comisión", l: [
          "Instrumento | Casa | Administración al año | Por operación | Spread",
          "Lo que se lleva en 20 años ≈ 1 − (1 − comisión)^20 de lo acumulado",
          "Al 0.03 % anual se va cerca del 0.6 %; al 1 %, cerca del 18 %; al 1.5 %, cerca del 26 %.",
          "Regla: mismo índice, misma exposición → gana el más barato."] } },
      "Aguantar sin vender": {
        sesion: [[10, "Mira la gráfica del S&P 500 de 2007 a 2013 y la de 2020: cuánto cayó y cuánto tardó en volver."],
                 [10, "Escribe tu regla para las caídas con la plantilla."],
                 [5, "Quita del teléfono las alertas de precios y deja la revisión para el lunes."]],
        sale: "Tu regla está escrita junto a tu asignación, y solo abres la app el lunes.",
        copia: { t: "Tu regla para las caídas", l: [
          "Si mi cartera cae 10 %: no hago nada y sigo aportando.",
          "Si cae 30 %: no vendo; el aporte del lunes va a lo que quedó más abajo.",
          "Si cae 50 %: releo esta hoja y mi asignación antes de abrir la app.",
          "Solo vendo si cambia mi plan —una fecha o una meta—, nunca por el precio.",
          "Firmado el __/__/____, con el mercado tranquilo."] } },
      "Rebalancear una vez al año": {
        sesion: [[10, "Saca el valor de cada parte: {{broker}}, CETES y Bitcoin."],
                 [10, "Calcula el porcentaje de hoy y cuánto se desvía de tu asignación."],
                 [10, "Decide a dónde van los aportes de los próximos meses hasta emparejar."]],
        sale: "Ninguna parte se desvía más de 5 puntos, y lo arreglaste con aportes, sin vender.",
        copia: { t: "La cuenta del rebalanceo", l: [
          "Parte | Objetivo % | Valor hoy | % hoy | Desviación",
          "CETES | __ | $____ | __ | __",
          "Índice | __ | $____ | __ | __",
          "Riesgo alto | __ | $____ | __ | __",
          "Lo que le falta a una parte: objetivo % × el total − su valor de hoy = $____",
          "Si una se desvía más de 5 puntos, los aportes van a la que quedó abajo."] } },
      "Saber qué impuestos pagas al invertir": {
        sesion: [[10, "Crea la carpeta «Impuestos 20__» y descarga las constancias del año pasado de {{broker}} y cetesdirecto."],
                 [10, "Lee en cada constancia los intereses reales, la retención y las ganancias o pérdidas."],
                 [10, "Llena la lista de abajo para la declaración de abril."]],
        sale: "Tus constancias están en una carpeta y sabes qué va en tu declaración.",
        copia: { t: "Lo que buscas en cada constancia", l: [
          "CETES y deuda: el interés real y la retención del año → a la declaración anual.",
          "Acciones y ETF del SIC: la ganancia o pérdida neta del año → 10 % de ISR sobre la ganancia.",
          "Dividendos: el monto y lo que ya te retuvieron.",
          "Cripto: compra, venta y ganancia de cada operación; se suma a tus ingresos.",
          "Todo en la carpeta «Impuestos 20__», antes de abril."] } },
    },
    datos: {
      "Python y pandas con tus datos": {
        sesion: [[10, "Exporta tus gastos de Finanzas a CSV y ábrelo en un cuaderno de Kaggle o de Colab."],
                 [35, "Un módulo corto de Kaggle Learn —Pandas: grouping and sorting— y aplícalo a tu CSV."],
                 [10, "Contesta las dos preguntas con el código de abajo y anota la respuesta."]],
        sale: "Tu cuaderno contesta cuánto gastas por categoría y por semana, con tus datos.",
        copia: { t: "Las dos preguntas, en pandas", l: [
          "import pandas as pd",
          "df = pd.read_csv(\"gastos.csv\", parse_dates=[\"fecha\"])   # ajusta los nombres a tus columnas",
          "",
          "# 1. ¿En qué categoría se va más?",
          "df.groupby(\"categoria\")[\"monto\"].sum().sort_values(ascending=False)",
          "",
          "# 2. ¿Cuánto por semana?",
          "df.set_index(\"fecha\")[\"monto\"].resample(\"W\").sum()"] } },
      "Un tablero que responda una pregunta": {
        sesion: [[10, "Escribe la pregunta arriba de la hoja y sube tu CSV a Google Sheets."],
                 [30, "En Looker Studio, conecta la hoja y arma las tres gráficas de abajo."],
                 [10, "Enséñaselo a alguien: ¿contesta la pregunta en diez segundos?"]],
        sale: "Alguien que no conoce tus datos contesta la pregunta en diez segundos viendo el tablero.",
        copia: { t: "El tablero, en tres piezas", l: [
          "Título = la pregunta: ¿En qué semana del mes se me va el dinero?",
          "Gráfica 1, la respuesta: barras con el gasto de cada semana del mes (1 a 5).",
          "Gráfica 2, el porqué: barras apiladas por categoría dentro de cada semana.",
          "Gráfica 3, la tendencia: línea del gasto semanal de los últimos tres meses.",
          "Campo calculado, la semana del mes: CEIL(DAY(fecha) / 7)"] } },
      "Contar lo que dicen los datos": {
        sesion: [[10, "Elige un resultado de pruebas sin datos del cliente y escribe la conclusión en una frase."],
                 [20, "Haz una sola gráfica que la demuestre: sin rejilla, todo en gris menos lo que importa."],
                 [10, "Escribe las tres frases de abajo y enséñaselo a alguien."]],
        sale: "Quien lo ve repite tu conclusión con sus palabras sin que se la expliques.",
        copia: { t: "Las tres frases", l: [
          "1. Qué pasó: «El __ % de las pruebas de ____ falló en ____.»",
          "2. Por qué importa: «Eso significa ____ para ____.»",
          "3. Qué propones: «Recomiendo ____ antes de ____.»",
          "El título de la gráfica es la frase 1, no «Resultados de pruebas»."] } },
      "SQL, diez minutos al día": {
        sesion: [[2, "Abre SQLZoo donde te quedaste ayer."],
                 [6, "Dos o tres ejercicios: antes de correr cada consulta, di qué filas esperas."],
                 [2, "Anota en tu racha el día y el tema."]],
        sale: "Treinta días seguidos, y escribes sin mirar un JOIN con GROUP BY.",
        copia: { t: "Las cuatro consultas que cubren casi todo", l: [
          "SELECT name, population FROM world WHERE continent = 'Europe' ORDER BY population DESC;",
          "SELECT continent, COUNT(*), SUM(population) FROM world GROUP BY continent;",
          "SELECT continent FROM world GROUP BY continent HAVING SUM(population) > 100000000;",
          "SELECT goal.player, goal.gtime FROM goal JOIN game ON goal.matchid = game.id WHERE game.team1 = 'GER';"] } },
      "Teclear, no mirar": {
        sesion: [[10, "Video y editor lado a lado; pausa cada vez que el instructor escribe."],
                 [30, "Teclea, corre y cambia los datos por los tuyos."],
                 [10, "Rompe algo a propósito y lee el error completo."]],
        sale: "El ejercicio funciona con tus datos y explicas un error que provocaste tú.",
        copia: { t: "Las reglas del tutorial", l: [
          "1. No avanzo el video hasta que mi versión corre.",
          "2. Cambio los datos: el mismo ejercicio con mi CSV.",
          "3. Rompo una cosa y leo el error: qué línea, qué tipo, qué esperaba.",
          "Al final: lo que hoy ya escribo sin mirar: ______"] } },
    },
    mente: {
      "Lo alto no se mantiene solo": {
        sesion: [[10, "Escribe las tres cosas que hoy te sostienen."],
                 [10, "Piensa en tu último mes difícil: ¿cuál dejaste primero? Márcala."],
                 [10, "Arma su escudo con la plantilla: hora fija, señal y plan B."]],
        sale: "Lo primero que se te cae tiene hora fija, alarma y una versión mínima para el día malo.",
        copia: { t: "El escudo de lo que se cae primero", l: [
          "Lo que me sostiene: 1) ____ 2) ____ 3) ____",
          "Lo primero que dejo cuando el mes se pone duro: ____",
          "Su hora fija: ____ · Su señal (alarma, lugar): ____",
          "Su versión mínima para el día malo: ____ (ej.: 20 min en vez de 60)",
          "Si fallo dos días seguidos: ____"] } },
      "El sueño es la palanca, no la fuerza de voluntad": {
        sesion: [[5, "A las {{horaRutinaNoche}}, el celular se queda cargando fuera del cuarto."],
                 [15, "La rutina sin pantalla: piel, minoxidil y suplementos."],
                 [5, "Luz fuera a las {{horaDormir}}, y anota a qué hora apagaste."]],
        sale: "Catorce noches seguidas con luz fuera a las {{horaDormir}}, y la segunda semana se nota en el gimnasio.",
        copia: { t: "Tu bitácora de dos semanas", l: [
          "Noche | Luz fuera | Celular fuera del cuarto | Energía en el gym (1 a 5)",
          "Lun __ | __:__ | sí / no | __",
          "Regla: lo que no cupo en la media hora de la app de las {{horaApp}} se parte para mañana.",
          "Meta: {{horasSueno}} cada noche, de las {{horaDormir}} a las {{horaDespertar}}."] } },
      "Terapia antes de irte": {
        sesion: [[15, "Busca dos opciones: un psicólogo con enfoque cognitivo-conductual, o lo que cubra tu seguro de gastos médicos."],
                 [10, "Agenda la primera sesión y escribe tus tres objetivos con la plantilla."],
                 [5, "Guarda desde hoy cómo pedir la asesoría psicológica del Studierendenwerk para tu primer mes allá."]],
        sale: "La primera sesión está agendada y llevas tus tres objetivos escritos.",
        copia: { t: "Lo que llevas a la primera sesión", l: [
          "Objetivo 1, la soledad: un plan para el primer invierno lejos de mi familia.",
          "Objetivo 2, el estrés: qué hago cuando se juntan la maestría, el trabajo y el dinero.",
          "Objetivo 3, el sueño: cómo sostener {{horasSueno}} con un horario nuevo.",
          "Pregunta: ¿qué señales me dicen que tengo que pedir ayuda allá?",
          "Allá: la asesoría psicológica del Studierendenwerk es gratis para estudiantes."] } },
      "La deuda pesa en la cabeza, no sólo en la cartera": {
        sesion: [[5, "El primer domingo del mes, abre el panel de Deuda cara del Plan Maestro."],
                 [5, "Anota cuánto debías el mes pasado, cuánto debes hoy y cuánto bajó."],
                 [5, "Escribe la fecha en que el plan termina de pagar la tarjeta y una frase de cómo te sientes."]],
        sale: "Tres meses seguidos con el número anotado y la fecha de fin a la vista.",
        copia: { t: "La hoja de la deuda", l: [
          "Mes | Debía | Debo hoy | Bajó | Cómo me siento (1 a 5)",
          "El día en que el plan termina de pagar la tarjeta: {{bbvaCero}}",
          "Lo que haré ese día con lo que hoy va a la tarjeta: ______"] } },
      "Cortar la rumia con una acción pequeña": {
        sesion: [[1, "Nota la señal: diez minutos con la misma idea y nada nuevo."],
                 [2, "Escribe la acción de dos minutos con la plantilla, y hazla ya."],
                 [2, "Decide: ¿sigo con esto ahora o lo agendo? Escribe la hora."]],
        sale: "La idea que giraba termina en una acción hecha o en una cita con hora.",
        copia: { t: "Las tres preguntas que cortan la rumia", l: [
          "¿Qué me preocupa, en una frase? ______",
          "¿Qué es lo más pequeño que lo mueve en dos minutos? Un mensaje, una búsqueda, una línea: ______",
          "¿Cuándo lo vuelvo a ver? Día y hora: ______",
          "Si no depende de mí, lo escribo y lo suelto hasta esa hora."] } },
      "Una revisión corta cada domingo": {
        sesion: [[3, "Abre Hábitos y el Plan Maestro: qué marcaste esta semana."],
                 [5, "Escribe las respuestas de abajo."],
                 [2, "Pon el cambio de la semana en tu calendario del lunes."]],
        sale: "Diez domingos seguidos por escrito, cada uno con un solo cambio.",
        copia: { t: "La revisión de diez minutos", l: [
          "Semana del __ al __",
          "Salió bien, con su dato: ______",
          "Se cayó, sin castigo, el hecho y por qué: ______",
          "Lo único que cambio la semana que viene: ______",
          "¿Cumplí el cambio de la semana pasada? sí / no"] } },
    },
    liderazgo: {
      "Dónde está tu techo": {
        sesion: [[10, "Escribe las tres conversaciones que llevas posponiendo."],
                 [10, "De cada una, la frase con la que la abrirías mañana."],
                 [5, "Léelas juntas y marca: ¿me falta valentía o claridad?"]],
        sale: "Tres frases claras escritas, y sabes cuál de las dos cosas te frena.",
        copia: { t: "Tus tres conversaciones", l: [
          "Trabajo · con ____ · lo que diría: «____» · ¿desde cuándo la evito? ____",
          "Proyecto · con ____ · lo que diría: «____»",
          "Casa · con ____ · lo que diría: «____»",
          "Mi techo es de valentía (sé qué decir y no lo digo) o de claridad (no sé qué decir)."] } },
      "Separar el hecho de la historia": {
        sesion: [[10, "Elige una de las tres y escribe la columna del hecho: lo que grabaría una cámara."],
                 [10, "Escribe la columna de tu historia: lo que concluiste."],
                 [10, "Arma la apertura con la plantilla y ensáyala en voz alta."]],
        sale: "Tu apertura usa solo hechos y termina en una pregunta.",
        copia: { t: "La apertura que no pone a nadie a la defensiva", l: [
          "El hecho: «Noté que ____ (cuándo, cuántas veces).»",
          "Tu historia, dicha como historia: «Me quedé pensando que ____, pero no sé si es así.»",
          "La pregunta: «¿Cómo lo ves tú? ¿Qué está pasando?»",
          "Lo que no se dice: «siempre», «nunca», «no te importa»."] } },
      "Liderar sin el puesto": {
        sesion: [[10, "Lista tres cosas rotas en tu equipo que todos ven y nadie toma."],
                 [40, "Elige la de más impacto y menos permiso necesario, y arregla su primera parte."],
                 [10, "Escribe la respuesta STAR con su número y cuéntaselo a tu líder."]],
        sale: "Lo que arreglaste tiene un sistema para no volver a romperse, y tu respuesta lleva un número.",
        copia: { t: "Tu respuesta a «háblame de una vez que lideraste»", l: [
          "Situation: In my team at {{empleador}}, ____ was broken and nobody owned it.",
          "Task: I took it on without being asked.",
          "Action: I ____, ____ and documented ____ so it wouldn't break again.",
          "Result: ____ went from __ to __ (horas, fallas, tiempo de revisión)."] } },
      "Dar retroalimentación que no duela": {
        sesion: [[5, "Elige algo pequeño y reciente de esta semana."],
                 [5, "Escribe las tres partes con la plantilla."],
                 [5, "Dilo en privado y en persona, y cierra preguntando qué opina."]],
        sale: "Lo dijiste en menos de un minuto, sin «siempre» ni «nunca», y la otra persona propuso algo.",
        copia: { t: "Hecho, efecto y propuesta", l: [
          "El hecho: «En la revisión del martes, el reporte llegó sin los casos de falla.»",
          "El efecto: «Tuvimos que rehacer la prueba y la entrega se movió un día.»",
          "La propuesta: «¿Te parece si la próxima vez los revisamos juntos el lunes?»",
          "El cierre: «¿Cómo lo ves?»"] } },
      "Una conversación pendiente al mes": {
        sesion: [[10, "Elige la siguiente de tu lista y prepárala: el hecho, tu historia y la apertura."],
                 [20, "Tenla en la fecha que agendaste."],
                 [5, "Escribe la nota: cómo salió y qué cambias para la siguiente."]],
        sale: "Una conversación al mes, cada una con su nota: doce al año.",
        copia: { t: "La nota después de la conversación", l: [
          "Fecha: __ · Con: ____ · Tema: ____",
          "Cómo abrí: ____",
          "Lo que dijo la otra persona que yo no sabía: ____",
          "El acuerdo: ____ · Cuándo lo revisamos: ____",
          "La próxima vez cambio: ____"] } },
    },
    copy: {
      "Qué te falta, exactamente": {
        sesion: [[5, "Reúne tus cinco últimos textos importantes."],
                 [10, "Subraya en cada uno la petición concreta; si no hay, márcalo."],
                 [10, "Reescribe el final de los que no piden nada, con la plantilla."]],
        sale: "Los cinco textos terminan con una petición que se contesta con un sí, un no o una fecha.",
        copia: { t: "Cómo cerrar un texto", l: [
          "Mal: «Quedo atento a sus comentarios.»",
          "Bien: «¿Le parece si hablamos 15 minutos el jueves a las 10?»",
          "Bien: «¿Me confirma antes del viernes si avanzo con la opción B?»",
          "Bien: «Si le interesa, conteste con un sí y le mando el detalle.»",
          "Regla: el último renglón dice qué hacer, cuándo y cómo."] } },
      "Una promesa por texto": {
        sesion: [[5, "Antes de escribir, llena las dos líneas de abajo."],
                 [20, "Escribe el texto: cada frase tiene que ayudar a esa acción."],
                 [5, "Tacha lo que no ayuda y revisa que el título prometa eso y nada más."]],
        sale: "Quien lo lee puede decir en una frase qué le pediste.",
        copia: { t: "Las dos líneas antes de escribir", l: [
          "Lo lee: ______ (una persona concreta: «un reclutador de Bosch en Stuttgart»)",
          "Quiero que: ______ (una acción: «me escriba para una llamada»)",
          "La promesa: «Te muestro ____ para que ____.»",
          "Si no cabe en una línea, todavía no sé qué estoy escribiendo."] } },
      "Reescribe tu perfil de LinkedIn": {
        sesion: [[15, "Mira tres perfiles de ingenieros de validación en Stuttgart: su titular y su «acerca de»."],
                 [25, "Reescribe en inglés tu titular y tu «acerca de» con la plantilla."],
                 [15, "Pasa cada puesto de tareas a logros: qué cambió porque estuviste tú."]],
        sale: "Tu titular dice qué resuelves y qué buscas, y cada puesto trae al menos un logro con número.",
        copia: { t: "Titular y «acerca de», en inglés", l: [
          "Headline: Validation Engineer · HIL & ADAS · Python test automation · Open to Werkstudent roles in Stuttgart",
          "About, line 1: I validate automotive software —HIL, ADAS and test automation— at {{empleador}}, after Ford, Continental and Bosch.",
          "About, line 2: <un resultado con número: «I reduced regression time by __ % by automating ____»>",
          "About, line 3: Starting the Automotive Systems master's in Esslingen on {{maestriaInicio}}. Let's talk: ____",
          "Un puesto, como logro: «Automated ____ with Python, cutting ____ from __ h to __ h per release.»"] } },
      "El correo frío de 5 líneas": {
        sesion: [[10, "Elige a tres personas y busca algo suyo reciente."],
                 [20, "Escribe los tres correos con la plantilla; ninguno pasa de cinco líneas."],
                 [5, "Léelos en voz alta y mándalos hoy."]],
        sale: "Tres correos enviados esta semana y al menos una respuesta.",
        copia: { t: "El correo de cinco líneas, en inglés", l: [
          "Subject: Question about Werkstudent roles in ____ (su equipo)",
          "Hi ____, I read your post about ____ — the part on ____ was spot on.",
          "I'm a validation engineer (HIL, ADAS) at {{empleador}}, moving to Stuttgart for a master's at Esslingen.",
          "Last year I ____ (un resultado con número).",
          "Would you have 15 minutes in the next two weeks to tell me how your team hires working students?",
          "If it's not a good time, no worries at all. Thanks!"] } },
      "Leer en voz alta antes de enviar": {
        sesion: [[1, "Deja pasar unos minutos después de escribir."],
                 [2, "Léelo completo en voz alta y marca donde te trabes."],
                 [2, "Corta: una palabra por frase y la frase donde te trabaste."]],
        sale: "Ningún texto importante sale sin pasar por tu voz.",
        copia: { t: "Lo que se corta casi siempre", l: [
          "«Quería comentarle que…» → dilo directo.",
          "«Realmente», «básicamente», «de alguna manera» → fuera.",
          "«Con el fin de» → «para».",
          "«Llevar a cabo» → «hacer».",
          "Dos ideas en una frase con «que… que…» → dos frases."] } },
    },
    ventas: {
      "Vender lo que no usas a su precio": {
        sesion: [[15, "Fotos con luz de día: el objeto completo, sus detalles y lo que incluya (caja, cargador)."],
                 [10, "Busca tres anuncios iguales, toma el de en medio y súbele 10 %."],
                 [10, "Publica con la plantilla y activa las notificaciones para contestar en menos de una hora."]],
        sale: "Publicado hoy, cada mensaje contestado en menos de una hora, y vendido arriba de tu mínimo.",
        copia: { t: "El anuncio que vende", l: [
          "Título: marca + modelo + estado; ej.: «Monitor Dell 27 pulgadas 4K, como nuevo, con caja»",
          "Línea 1: qué es y por qué lo vendes («lo cambié por uno más grande»).",
          "Línea 2: su estado real, con cualquier detalle que tenga.",
          "Línea 3: qué incluye.",
          "Línea 4: entrega (punto y horario) y forma de pago.",
          "A «¿lo menos?»: «¿Cuánto me ofreces?». Tu mínimo, escrito antes de publicar: $____"] } },
      "El seguimiento es la venta": {
        sesion: [[5, "Revisa quién preguntó y no compró en los últimos siete días."],
                 [10, "A cada uno, el mensaje del día que le toca."],
                 [5, "Anota quién respondió y en qué contacto."]],
        sale: "Nadie que preguntó se quedó sin su seguimiento, y sabes en qué contacto cierras más.",
        copia: { t: "Los tres mensajes de seguimiento", l: [
          "Día 1: «¡Hola! ¿Te quedó alguna duda del ____? Te puedo mandar más fotos.»",
          "Día 3: «Te comparto una foto del ____ funcionando. Lo puedo entregar el ____ en ____.»",
          "Día 7: «Te lo aparto hasta el viernes; después lo libero. ¿Te funciona?»",
          "La tabla: Persona | Día 1 | Día 3 | Día 7 | ¿Compró? | ¿En cuál?"] } },
      "Negociar tu sueldo en euros": {
        sesion: [[15, "Busca el rango del puesto en la región: Glassdoor, StepStone, Kununu y la tabla del convenio de la IG Metall, si la empresa lo tiene."],
                 [10, "Escribe tu mínimo y tu objetivo."],
                 [10, "Ensaya en voz alta las frases de abajo, en inglés y en alemán."]],
        sale: "Tienes el rango, tu mínimo y tu objetivo por escrito, y dices las frases sin dudar.",
        copia: { t: "Las frases para la llamada", l: [
          "Primero el rango: «What's the salary range planned for this position?» · «Welche Gehaltsspanne ist für die Stelle vorgesehen?»",
          "Si insisten: «Based on the market for this role in Stuttgart, I'm looking at ____ to ____.»",
          "Para ganar tiempo: «Thank you — could I have a day to review the full offer?»",
          "Por escrito: «I'm very excited about the role. Could we get closer to ____?»",
          "Tu mínimo: €____ · tu objetivo: €____ · el Werkstudent que cuenta el plan: {{werkstudentEur}} al mes, neto"] } },
      "Una oferta que se pueda comprar": {
        sesion: [[10, "Habla con tu papá: ¿quién es su mejor cliente y qué problema le resolvió?"],
                 [15, "Escribe la oferta con la plantilla, en tres versiones."],
                 [5, "Léele las tres a un cliente y quédate con la que entienda a la primera."]],
        sale: "La oferta cabe en una frase y un cliente la repite con sus palabras.",
        copia: { t: "La oferta en una frase", l: [
          "Para [cliente exacto] que [problema], [negocio] le da [resultado] en [plazo], o [garantía].",
          "Prueba 1: ¿se entiende sin explicarla?",
          "Prueba 2: ¿dice un resultado y no un servicio?",
          "Prueba 3: ¿el plazo es una fecha o un número, no «rápido»?"] } },
    },
    marketing: {
      "Dejar el negocio en piloto automático": {
        sesion: [[15, "Elige los doce posts de las plantillas de Posts y ponle fecha a cada uno: uno por semana."],
                 [30, "Deja cada uno completo —foto, texto y fecha— en una carpeta compartida con tu papá."],
                 [15, "Publica uno con él, paso a paso; el siguiente lo hace él."]],
        sale: "Tu papá publica el segundo post sin ti.",
        copia: { t: "La guía para tu papá", l: [
          "1. Abre la carpeta «Posts» y busca el de esta semana: tiene la fecha en el nombre.",
          "2. Copia el texto y descarga la foto.",
          "3. En la app, toca «+», elige la foto y pega el texto.",
          "4. Publícalo el día que dice el nombre, entre las 7 y las 9 de la noche.",
          "5. Contesta cada mensaje el mismo día; si preguntan el precio, manda el dossier.",
          "Si algo falla, mándame una captura por WhatsApp."] } },
      "Una métrica antes de gastar": {
        sesion: [[5, "Cada lunes, abre las estadísticas de los posts de la semana."],
                 [5, "Anota vistas, comentarios y mensajes en la tabla."],
                 [5, "Al cerrar el mes: ¿qué formato trajo más mensajes? Ese se repite."]],
        sale: "Un mes de tabla completa y una decisión: qué formato se repite y cuál se deja.",
        copia: { t: "La tabla de cada post", l: [
          "Fecha | Formato (foto, video, carrusel) | Tema | Vistas | Comentarios | Mensajes",
          "La que manda: mensajes ÷ vistas × 100 = __ %",
          "Al mes: repito ____ (el de más mensajes) · dejo ____ (el de menos)"] } },
      "Un canal a la vez": {
        sesion: [[15, "Pregunta a cinco clientes dónde los encontró tu papá o dónde pasan su tiempo."],
                 [10, "Elige el canal con más respuestas y escribe el calendario de cuatro semanas."],
                 [5, "Pon en el calendario la evaluación del día 28."]],
        sale: "Cuatro semanas seguidas en un solo canal, y una decisión tomada con la tabla de mensajes.",
        copia: { t: "El calendario de cuatro semanas", l: [
          "Canal: ______ (el que más nombraron los clientes)",
          "Semana 1: dos posts · tema: ____",
          "Semana 2: dos posts · tema: ____",
          "Semana 3: dos posts · tema: ____",
          "Semana 4: dos posts · tema: ____",
          "Día 28: ¿trajo mensajes? Se queda o se cambia; no se suma otro canal."] } },
    },
  };
  /* ── Los subtemas de cada paso: lo que hay que saber a fondo ──
     Adán, 26-oct-2026: "quiero información más detallada de más subtemas, pero que sean muy importantes y que me ayuden
     muchísimo". Por habilidad y por el nombre del paso, como APRENDIZAJE_DETALLE: tres subtemas, cada uno con su título
     (`t`), la explicación (`d`) —el concepto, de dónde sale y por qué importa— y sus claves (`l`), concretas y
     aplicables. Se mezcla en cada paso al cargar como `subtemas`; el control 45 exige tres por paso. */
  const APRENDIZAJE_SUBTEMAS = {
    ia: {
      "El syllabus, capítulo por capítulo": [
        { t: "El mapa del examen: qué se pregunta y cómo", d: "Cada pregunta del CT-GenAI sale de un objetivo de aprendizaje del syllabus, y cada objetivo tiene un nivel K: K1 es recordar, K2 entender y K3 aplicar. Las de K1 se contestan con la definición exacta; las de K3 te dan un escenario y piden elegir la técnica correcta.", l: [
          "Empieza por el capítulo de ingeniería de instrucciones: es el que más puntos reparte y el que más usas en el trabajo.",
          "Para cada objetivo K3, practica con un caso tuyo: un requisito de ADAS y la técnica de prompt que elegirías.",
          "Los K1 se ganan con tarjetas: el término de un lado y la definición del syllabus del otro."] },
        { t: "Las partes de una buena instrucción", d: "El syllabus descompone un prompt en piezas: el rol, el contexto, la instrucción, los datos de entrada, las restricciones y el formato de salida. Muchas preguntas te dan un prompt incompleto y preguntan qué pieza falta o cuál mejoraría el resultado.", l: [
          "Rol: «actúa como ingeniero de pruebas de ADAS»; contexto: el sistema y sus límites.",
          "Restricciones y formato: «solo casos negativos, en tabla con ID, entrada y resultado esperado».",
          "Ejercicio: toma tres prompts que hayas usado en el trabajo y marca qué pieza les falta."] },
        { t: "Las técnicas de prompting que entran al examen", d: "Few-shot es dar ejemplos; chain-of-thought, pedir que razone paso a paso; prompt chaining, encadenar instrucciones donde cada una usa la salida de la anterior; meta-prompting, pedirle al modelo que mejore tu prompt. El examen pregunta cuándo conviene cada una.", l: [
          "Few-shot: cuando quieres un formato fijo, como los casos de prueba con la plantilla del equipo.",
          "Chain-of-thought: cuando la tarea pide razonar, como derivar valores límite de un requisito.",
          "Chaining: cuando la tarea es larga; primero requisitos, luego condiciones, luego casos y al final la revisión."] },
      ],
      "El simulacro como termómetro": [
        { t: "Cómo leer una pregunta de ISTQB", d: "Las preguntas de ISTQB castigan la lectura rápida: una palabra como «MÁS», «NO» o «PRIMERO» cambia la respuesta. Casi siempre hay dos opciones que se descartan rápido y dos plausibles; la diferencia entre las plausibles está en el término exacto del syllabus.", l: [
          "Ubica la palabra clave del enunciado antes de leer las opciones.",
          "Descarta las dos que no encajan y compara las que quedan contra la definición literal.",
          "Si dudas entre dos, elige la que usa el vocabulario del syllabus, no el de tu trabajo diario."] },
        { t: "El tiempo y el ritmo por pregunta", d: "El examen tiene 40 preguntas y un tiempo fijo. Si presentas en inglés, ISTQB da 25 % más de tiempo a quien no es nativo, pero hay que pedirlo al registrarte. La trampa es atorarse en una pregunta: vale lo mismo que las fáciles.", l: [
          "Primera vuelta: contesta lo seguro y marca las dudosas; segunda vuelta: solo las marcadas.",
          "Si una te lleva más de tres minutos, elige la mejor que tengas, márcala y sigue.",
          "En el simulacro, anota en qué minuto ibas en la pregunta 20: debería ser antes de la mitad del tiempo."] },
        { t: "El análisis de errores que sube la nota", d: "Cada fallo cae en una de tres causas: no conocías el concepto, lo conocías pero leíste mal, o dudaste entre dos y elegiste mal. Cada causa se arregla distinto; mezclarlas hace que repases lo que ya sabes.", l: [
          "No lo conocías: vuelve a esa sección del syllabus y haz su tarjeta.",
          "Leíste mal: es un problema de método, no de estudio; practica ubicar la palabra clave.",
          "Dudaste entre dos: escribe en una línea por qué la correcta es mejor; ese contraste es lo que pregunta el examen."] },
      ],
      "Una prueba con IA que puedas enseñar": [
        { t: "Las técnicas de diseño que la IA debe cubrir", d: "Un buen conjunto de casos para una función como el frenado de emergencia combina valores límite, clases de equivalencia, tablas de decisión y transiciones de estado. La IA suele cubrir bien los casos nominales y olvidar los límites y las combinaciones.", l: [
          "Valores límite: justo en, debajo y arriba de cada umbral: velocidad, distancia, tiempo al choque.",
          "Tabla de decisión: las combinaciones de condiciones, como lluvia con sensor degradado.",
          "Transiciones: de alerta a frenado parcial, a frenado total y de regreso."] },
        { t: "Cómo medir qué tan buena fue la IA", d: "Lo que hace valioso tu repositorio es el número: de todo lo que propuso el modelo, cuántos casos eran correctos, cuántos repetidos, cuántos imposibles y cuántos faltaron. Con eso dices algo concreto en una entrevista, no una opinión.", l: [
          "Precisión: casos correctos ÷ casos propuestos.",
          "Cobertura: casos correctos ÷ casos que debía haber según tu lista de referencia.",
          "Compara dos prompts, sin y con few-shot, y reporta cuál mejoró qué."] },
        { t: "El README que convence a un equipo de validación", d: "Un reclutador técnico lee un README en dos minutos: busca el problema, tu criterio y el resultado. Una tabla de antes y después vale más que tres párrafos.", l: [
          "Abre con el problema en una frase y el resultado en otra.",
          "Incluye la tabla de clasificación de casos y los tres que faltaban, con por qué importan.",
          "Cierra con lo que no le delegarías a la IA y por qué: es lo que demuestra criterio de ingeniero."] },
      ],
      "Automatiza una tarea tuya": [
        { t: "Qué conviene automatizar: la cuenta del retorno", d: "Una automatización vale la pena cuando el tiempo que ahorra en un año supera varias veces lo que tardas en hacerla y mantenerla. La regla práctica: lo que haces al menos cada semana, con los mismos pasos y sin tener que decidir nada.", l: [
          "Ahorro al año = minutos por vez × veces al año. Si da menos de dos horas, no la hagas.",
          "Busca tareas de copiar y pegar, renombrar, mover archivos o armar el mismo reporte.",
          "Lo que pide decidir algo distinto cada vez se queda manual."] },
        { t: "Tres formas de automatizar, de menos a más código", d: "Sin código, con herramientas como n8n que conectan servicios; con un script corto de Python para archivos y datos; o con IA dentro del flujo para resumir o clasificar texto. Empieza por la más simple que resuelva el problema.", l: [
          "n8n: un disparador —una hora, un correo— y pasos encadenados; se puede instalar en tu computadora sin pagar.",
          "Python: pathlib para archivos, pandas para tablas y el Programador de tareas de Windows para que corra solo.",
          "IA en el flujo: para clasificar o resumir, nunca para decidir sin que tú revises."] },
        { t: "Que no se rompa: de script a herramienta", d: "Una automatización que falla en silencio es peor que no tenerla. Lo mínimo es que deje registro, que avise cuando algo sale mal y que se pueda correr dos veces sin duplicar nada.", l: [
          "Registro: que escriba en un archivo qué hizo y cuándo.",
          "Aviso: si falla, que te mande un correo o un mensaje.",
          "Correrla dos veces el mismo día no debe crear dos registros."] },
      ],
      "Lo que no se le delega a la IA": [
        { t: "Alucinaciones: por qué pasan y cómo atraparlas", d: "Un modelo predice la palabra más probable, no la verdadera; por eso inventa normas, números y referencias con la misma seguridad con la que acierta. El riesgo crece cuando le pides datos específicos que no le diste.", l: [
          "Dale la fuente: pega el requisito o la norma y pídele que cite de ahí.",
          "Pídele que marque lo que no sabe: «si no está en el texto, escribe NO ENCONTRADO».",
          "Comprueba todo número y toda cita de una norma, como ISO 26262, contra el documento."] },
        { t: "Privacidad y confidencialidad en el trabajo", d: "Lo que pegas en un servicio público de IA puede guardarse o usarse según sus términos. En automotive, los requisitos y el código de un cliente suelen estar bajo contratos de confidencialidad: una filtración puede costarle el contrato a la empresa y a ti el puesto.", l: [
          "Antes de usar una herramienta, pregunta si está aprobada y con qué tipo de datos.",
          "Anonimiza: cambia nombres de proyectos, clientes y valores reales por genéricos.",
          "Nunca pegues contraseñas, direcciones internas ni datos personales."] },
        { t: "Sesgo y resultados que cambian", d: "El mismo prompt puede dar resultados distintos cada vez, y el modelo tiende a repetir los patrones comunes de lo que aprendió. En pruebas eso significa casos parecidos entre sí y huecos justo en lo raro, que es donde fallan los sistemas.", l: [
          "Corre el mismo prompt dos o tres veces y compara: lo que cambia te dice qué tan estable es.",
          "Pide casos raros de forma explícita: fallas de sensor, datos fuera de rango, combinaciones improbables.",
          "La revisión humana es parte del proceso: deja escrito quién revisó qué."] },
      ],
    },
    ingles: {
      "Tu nivel real es el de hablar bajo presión": [
        { t: "Las tres medidas de tu fluidez", d: "La fluidez se mide con tres números: palabras por minuto —al conversar, entre 120 y 150 suena natural—, pausas de más de dos segundos y muletillas. Con ellos ves el avance semana a semana, que es justo lo que el certificado no dice.", l: [
          "Transcribe tu grabación con el dictado del teléfono y cuenta las palabras de un minuto.",
          "Meta realista: bajar las pausas largas a la mitad en un mes.",
          "Tus muletillas del español se cuelan en inglés: cámbialas por «well», «so» o «let me think»."] },
        { t: "Shadowing: la técnica que entrena la boca", d: "Shadowing es repetir un audio en voz alta casi al mismo tiempo que lo escuchas, imitando el ritmo y la entonación. Entrena justo lo que falla bajo presión: sacar frases completas sin traducir.", l: [
          "Usa audios de uno o dos minutos, con transcripción, de gente de tu sector.",
          "Primero escucha y lee; luego repite con el texto; al final, sin texto.",
          "Diez minutos al día rinden más que una hora el domingo."] },
        { t: "Frases puente para ganar tiempo sin traducir", d: "En una entrevista no se nota que pienses; se nota el silencio. Tener frases puente automáticas te da tres o cuatro segundos para ordenar la idea sin regresar al español.", l: [
          "«That's a great question. Let me think about the best example.»",
          "«The short answer is…, and the reason is…»",
          "«Let me put it another way.» Sirve para corregirte sin trabarte."] },
      ],
      "La carta de motivación de Esslingen": [
        { t: "Qué buscan las universidades alemanas en una carta", d: "En Alemania la carta de motivación es corta, concreta y sin adornos: el comité quiere ver que el programa encaja con tu experiencia y con lo que harás después. Las frases genéricas sobre la pasión restan; los hechos suman.", l: [
          "Una página, de 400 a 600 palabras, salvo que el programa pida otra cosa.",
          "Nombra materias, laboratorios o líneas de investigación del programa que te interesan, y por qué.",
          "No repitas el CV: la carta explica las decisiones; el CV las enumera."] },
        { t: "Convertir tu experiencia en argumentos", d: "Cada empresa de tu historia debe aportar una prueba distinta: una de profundidad técnica, una de liderazgo y una de impacto. Con un número por empresa, la carta deja de ser una lista y se vuelve una historia con dirección.", l: [
          "Ford o Continental: qué validabas y con qué herramientas, como HIL y CAN.",
          "Bosch: el equipo que dirigiste y por qué te mandaron a Stuttgart.",
          "{{empleador}}: qué mejoraste, con un número: tiempo, defectos o cobertura."] },
        { t: "Los errores que hacen descartar una carta", d: "Los comités leen decenas de cartas y descartan rápido las que parecen copiadas o no dicen por qué ese programa. También pesan los errores de idioma: en un programa en inglés, la carta es tu primera muestra de nivel.", l: [
          "Usar la misma carta para varias universidades cambiando solo el nombre.",
          "Empezar con tu infancia o con una cita famosa.",
          "No pedir revisión: un nativo o un profesor ve lo que tú ya no ves."] },
      ],
      "El vocabulario de TU trabajo primero": [
        { t: "Colocaciones: las palabras que van juntas", d: "Un nativo no elige palabras sueltas: usa combinaciones fijas como «run a test», «raise an issue», «meet a requirement» o «fix a bug». Saber la palabra sin su verbo es lo que hace que una frase suene traducida.", l: [
          "Anota cada término con el verbo que lo acompaña en tu trabajo.",
          "Busca la combinación en Google entre comillas: si casi no hay resultados, no se dice así.",
          "Más ejemplos: «perform a root cause analysis», «sign off the release», «flag a risk»."] },
        { t: "Repetición espaciada, con frases y no con palabras", d: "La memoria se consolida repasando justo antes de olvidar. Una aplicación como Anki programa los repasos sola; el truco es que cada tarjeta sea una frase tuya, no una palabra con su traducción.", l: [
          "Frente: la situación en español, como «explicar que la causa no era el algoritmo».",
          "Reverso: tu frase en inglés: «The root cause was not the algorithm but…».",
          "Diez minutos al día; Anki decide qué toca repasar."] },
        { t: "La pronunciación que más confunde en una junta", d: "Algunos sonidos hacen que una palabra técnica no se entienda aunque esté bien elegida: el acento en la sílaba equivocada, la terminación -ed y las vocales largas o cortas. No necesitas acento nativo; necesitas que te entiendan a la primera.", l: [
          "Acento: «DAY-ta», «a-NA-ly-sis», «en-gi-NEER».",
          "-ed: «tested» suena «TEST-id», pero «fixed» suena «fixt».",
          "Escucha en Youglish cómo dicen un término ingenieros de verdad."] },
      ],
      "Simulacros de entrevista de verdad": [
        { t: "STAR bien hecho: el detalle que casi todos fallan", d: "La mayoría cuenta de más la situación y de menos la acción. El entrevistador quiere saber qué hiciste TÚ, no lo que hizo el equipo, y qué cambió, con números.", l: [
          "Situación y tarea: 20 % del tiempo; acción: 60 %; resultado: 20 %.",
          "En la acción, «I», no «we»: «I designed…», «I convinced…».",
          "Cierra con lo que aprendiste: demuestra que reflexionas."] },
        { t: "Las preguntas técnicas de validación que vas a oír", d: "En un Werkstudent o un puesto de validación automotriz suelen preguntar por tu proceso de pruebas, no solo por herramientas: cómo derivas casos de un requisito, cómo priorizas y cómo reportas un defecto.", l: [
          "«How do you derive test cases from a requirement?»: valores límite, clases de equivalencia, tablas de decisión.",
          "«What's the difference between MIL, SIL and HIL?»: dónde corre el software y qué se simula.",
          "«How would you test an emergency braking function?»: casos nominales, límites, fallas de sensor y clima."] },
        { t: "Las preguntas que haces tú al final", d: "Al final siempre te preguntan si tienes preguntas, y decir que no resta. Una buena pregunta muestra interés y te da información para decidir.", l: [
          "«What does a typical week look like for a working student on your team?»",
          "«How do you measure success for this role in the first three months?»",
          "«Which tools and test benches would I be working with?»"] },
      ],
      "Pensar en inglés durante el manejo": [
        { t: "Elegir audio que entrene y no solo entretenga", d: "El audio útil está un poco arriba de tu nivel: entiendes casi todo, pero tienes que poner atención. Si lo entiendes sin esfuerzo, es entretenimiento; si te pierdes, es ruido.", l: [
          "Prefiere conversaciones a monólogos: se parecen más a una entrevista.",
          "Busca tu sector: conducción autónoma, pruebas de software, sistemas embebidos.",
          "Sube la velocidad a 1.2 cuando todo te resulte fácil."] },
        { t: "Narrar: hablar sin preparar todos los días", d: "Describir en voz alta lo que ves y lo que harás es la forma más barata de practicar hablar sin guion. Te obliga a encontrar las palabras al momento, que es lo que pasa en una entrevista.", l: [
          "Narra en presente lo que ves, en futuro lo que harás y en pasado lo que hiciste hoy.",
          "Si no sabes una palabra, rodéala en vez de detenerte: «the thing that measures distance».",
          "Al llegar, apunta las palabras que te faltaron y búscalas."] },
        { t: "La seguridad y tu calificación primero", d: "Aprender al volante solo funciona si no compite con manejar ni con el pasajero. Tu calificación en Didi es ingreso: un pasajero incómodo cuesta más que un día sin práctica.", l: [
          "Con pasajero, audio bajo o en pausa; repite en voz alta solo cuando vayas solo.",
          "Nada de pantallas: el episodio se elige antes de arrancar.",
          "En tráfico pesado o de noche, solo escucha."] },
      ],
      "Cero traducción en el trabajo": [
        { t: "Por qué traducir te hace lento", d: "Cuando traduces haces dos tareas: pensar la idea en español y convertirla. Bajo presión, la segunda se traba. Usar el inglés en lo que ya haces crea un camino directo entre la idea y la palabra en inglés.", l: [
          "Lo que lees en inglés, resúmelo en inglés.",
          "Tus notas de juntas, directo en inglés, aunque salgan imperfectas.",
          "Si te falta una palabra, descríbela en inglés antes de buscarla."] },
        { t: "Escribir inglés técnico claro", d: "En documentación y correos técnicos, el inglés claro usa frases cortas, voz activa y el verbo al inicio. Es más fácil de escribir y de leer en equipos donde nadie es nativo, como los de Stuttgart.", l: [
          "Voz activa: «The test failed», no «It was observed that the test was failing».",
          "Una idea por frase, y el resultado primero.",
          "Revisa con LanguageTool o Grammarly antes de mandar."] },
        { t: "Leer documentación técnica más rápido", d: "La documentación técnica se lee distinto que un libro: primero la estructura y los ejemplos, después el detalle. Leer así en inglés todos los días sube tu velocidad sin estudiar más.", l: [
          "Empieza por los ejemplos de código o los diagramas.",
          "Lee la primera línea de cada párrafo: casi siempre dice la idea.",
          "Las palabras que se repiten en una documentación son tu vocabulario de esa semana."] },
      ],
    },
    codigo: {
      "Qué te pide el puesto que quieres": [
        { t: "Qué es un Werkstudent y sus reglas", d: "Un Werkstudent es un estudiante inscrito que trabaja en una empresa mientras estudia. Durante el semestre puede trabajar hasta 20 horas a la semana sin perder ese estatus; en vacaciones, más. Para las empresas es la forma de probar a alguien antes de contratarlo.", l: [
          "Te pedirán la constancia de inscripción de la universidad (Immatrikulationsbescheinigung).",
          "Con visa de estudiante de fuera de la UE hay además un tope de días de trabajo al año: revisa el que marque tu permiso.",
          "Muchos equipos contratan a sus Werkstudenten al terminar la maestría."] },
        { t: "Las palabras clave en alemán de los anuncios", d: "Muchos anuncios están en alemán aunque el trabajo sea en inglés. Reconocer los términos te deja filtrar rápido y entender qué piden de verdad.", l: [
          "Validierung y Absicherung: validación; Erprobung: pruebas en vehículo; Prüfstand: banco de pruebas.",
          "Fahrerassistenzsysteme: sistemas de asistencia (ADAS); Steuergerät: unidad de control (ECU).",
          "Kenntnisse: conocimientos; wünschenswert: deseable, no obligatorio."] },
        { t: "De los huecos a un plan de ocho semanas", d: "La tabla de requisitos te da la lista; falta el orden. Prioriza lo que sale en más anuncios y lo que puedes demostrar con un proyecto: un requisito sin prueba visible no cuenta en una entrevista.", l: [
          "Semanas 1 a 3: el hueco más frecuente, con un ejercicio diario.",
          "Semanas 4 a 6: el segundo, integrado al proyecto de tu repositorio.",
          "Semanas 7 y 8: un README que muestre los dos y un simulacro de entrevista técnica."] },
      ],
      "Tests antes que features": [
        { t: "Rojo, verde y refactor: el ciclo de TDD", d: "El desarrollo guiado por pruebas tiene tres pasos: escribes una prueba que falla (rojo), el código mínimo para que pase (verde) y luego limpias el código sin cambiar lo que hace (refactor). La prueba en verde es la red que te deja limpiar sin miedo.", l: [
          "Una prueba a la vez; si escribes cinco juntas, pierdes el ciclo.",
          "El paso verde puede ser feo a propósito: la limpieza viene después.",
          "Si una prueba pasa a la primera, desconfía: quizá no prueba lo que crees."] },
        { t: "Qué probar: la pirámide de pruebas", d: "Abajo, muchas pruebas unitarias rápidas; en medio, menos pruebas de integración; arriba, pocas pruebas de sistema, lentas y caras. En automotive, la punta es tu HIL; la base es lo que corre en cada commit.", l: [
          "Unitarias: una función, sin hardware, en milisegundos.",
          "Integración: varios módulos juntos, con las interfaces simuladas.",
          "Sistema o HIL: el software real contra el entorno simulado; las más caras, para lo crítico."] },
        { t: "Cómo encaja con Automotive SPICE e ISO 26262", d: "En automotive el proceso exige verificación trazable: cada requisito con sus pruebas y cada prueba con su resultado. Automotive SPICE lo pide por niveles —verificación de unidades, pruebas de integración y de calificación del software— e ISO 26262 añade rigor según el nivel de seguridad (ASIL).", l: [
          "Trazabilidad: el ID del requisito en el nombre o en los metadatos de cada prueba.",
          "Cobertura: a mayor ASIL, mayor cobertura estructural exigida.",
          "En una entrevista, hablar de trazabilidad y de ASIL te distingue de un programador sin experiencia en el sector."] },
      ],
      "pytest de verdad": [
        { t: "Fixtures: preparar sin repetir", d: "Un fixture es una función que prepara lo que una prueba necesita —un objeto, datos, una conexión— y pytest se la pasa a cada prueba que la pide por su nombre. Su scope dice cada cuánto se crea: por prueba, por módulo o por sesión.", l: [
          "scope='function', el de siempre: limpio en cada prueba y el más seguro.",
          "scope='session': una sola vez para todo; útil para algo caro, como cargar un modelo.",
          "Con yield, lo que va después se ejecuta al terminar, como cerrar una conexión."] },
        { t: "Simular lo que no tienes: mocks", d: "Cuando el código depende de hardware, de la red o del tiempo, la prueba unitaria lo simula con un mock: un objeto falso que responde lo que tú decides. Así pruebas tu lógica sin el banco de pruebas.", l: [
          "unittest.mock.patch reemplaza una función durante la prueba.",
          "Simula un sensor que devuelve un valor fuera de rango y comprueba que tu código lo maneja.",
          "No simules lo que estás probando: el mock va en las dependencias, no en tu función."] },
        { t: "Cobertura y marcas: saber qué falta", d: "pytest-cov mide qué líneas y qué ramas ejecutaron tus pruebas. No es un fin —un 100 % con malas aserciones no sirve—, pero señala el código que ninguna prueba toca.", l: [
          "pytest --cov=control --cov-branch --cov-report=term-missing te dice las líneas sin probar.",
          "@pytest.mark.slow y pytest -m 'not slow' separan lo rápido de lo lento.",
          "Una meta sana: todas las ramas de la lógica de decisión, cubiertas."] },
      ],
      "Un proyecto que se pueda enseñar": [
        { t: "Un proyecto que hable de validación", d: "El mejor proyecto para un Werkstudent de validación muestra que sabes probar un sistema, no solo programarlo. Un sistema simulado pequeño, con requisitos escritos, pruebas trazables y un reporte, vale más que una aplicación vistosa.", l: [
          "Ejemplo: un control de crucero adaptativo simulado, con cinco requisitos y sus pruebas.",
          "Una matriz de trazabilidad: requisito → prueba → resultado.",
          "Simula una falla de sensor y muestra cómo la detectan tus pruebas."] },
        { t: "La estructura de un repositorio profesional", d: "Un repositorio ordenado se entiende en segundos: el código en una carpeta, las pruebas en otra, las dependencias declaradas y la integración continua a la vista. Es lo primero que revisa quien te va a entrevistar.", l: [
          "src/ para el código, tests/ para las pruebas y docs/ para requisitos y decisiones.",
          "requirements.txt o pyproject.toml con las versiones fijas.",
          "La insignia de GitHub Actions y una sección «How to run» de tres comandos."] },
        { t: "Cómo presentarlo en una entrevista", d: "En una entrevista tienes unos cinco minutos para tu proyecto. Ensaya la explicación como un recorrido: el problema, la arquitectura en un diagrama, una decisión difícil y qué harías distinto.", l: [
          "Un diagrama de una sola imagen: entradas, procesamiento y salida.",
          "Un bug real que encontraron tus pruebas, contado como historia.",
          "La respuesta a «what would you improve?»: siempre la preguntan."] },
      ],
      "Leer código ajeno a propósito": [
        { t: "Cómo leer un repositorio grande", d: "Un repositorio no se lee de arriba abajo: se entra por un punto —el main, el launch file o una prueba— y se sigue un flujo. Las pruebas te dicen qué se esperaba del código antes de entender cómo lo hace.", l: [
          "Empieza por el README y las carpetas: dónde está cada cosa.",
          "Elige un flujo: cómo llega el dato del sensor hasta la decisión.",
          "Usa «Go to definition» del editor y anota la ruta que seguiste."] },
        { t: "Qué observar en código profesional", d: "Más allá de lo que hace, fíjate en cómo está hecho: los nombres, el manejo de errores, cómo se separan las responsabilidades y cómo se prueba. Ahí está el criterio que quieres copiar.", l: [
          "Nombres: ¿se entiende la función sin leer su cuerpo?",
          "Errores: ¿qué pasa con un dato inválido? ¿Se registra, se lanza o se ignora?",
          "Configuración: ¿qué valores están fijos y cuáles se leen de un archivo?"] },
        { t: "ROS 2 en pocos conceptos", d: "ROS 2 organiza un robot o un vehículo en nodos que se comunican por tópicos, servicios y acciones. Es la base de Autoware y de muchos proyectos de conducción autónoma; conocerlo te deja leer esos repositorios.", l: [
          "Nodo: un proceso con una tarea; tópico: un canal donde unos publican y otros se suscriben.",
          "Mensaje: el tipo de dato de un tópico, como la nube de puntos de un LiDAR.",
          "Launch file: arranca varios nodos juntos con su configuración."] },
      ],
      "Media hora diaria, no seis el domingo": [
        { t: "Por qué gana la práctica espaciada", d: "El cerebro consolida lo aprendido entre sesiones, sobre todo al dormir. Repartir el mismo tiempo en sesiones cortas diarias deja más que concentrarlo en una sola, y además mantiene vivo el hábito.", l: [
          "Media hora diaria son unas 15 horas al mes, con más de 20 repasos.",
          "Lo de una sesión larga el domingo se olvida en buena parte antes del siguiente domingo.",
          "El día que no puedas, haz cinco minutos: lo que importa es no romper la cadena."] },
        { t: "De dónde sacar buenos ejercicios", d: "Los ejercicios útiles son pequeños, con una respuesta comprobable y cerca de tu trabajo. Combinar una plataforma de ejercicios con problemas tuyos evita practicar solo cosas abstractas.", l: [
          "Exercism: ejercicios de Python con pruebas incluidas y revisión gratuita.",
          "Tu trabajo: reescribe en Python algo que hoy haces a mano.",
          "Kata de pruebas: escribe las pruebas de una función ya hecha y encuentra su bug."] },
        { t: "Aprender con IA sin dejar de aprender", d: "La IA acelera, pero si siempre escribe por ti no se te queda nada. La regla que funciona: primero lo intentas tú; después le pides que revise o que proponga otra versión, y comparas.", l: [
          "Pídele que te explique tu error, no que te dé la solución.",
          "Pídele un ejercicio parecido al que fallaste.",
          "Una vez por semana, una sesión sin IA ni autocompletado."] },
      ],
    },
    network: {
      "Tu red real, en una hoja": [
        { t: "Lazos débiles: de dónde salen los trabajos", d: "Un estudio clásico de Mark Granovetter encontró que mucha gente consigue trabajo por conocidos lejanos más que por amigos cercanos: los conocidos se mueven en otros círculos y saben de otras oportunidades. Tu hoja debe incluir a esa gente, no solo a tus amigos del trabajo.", l: [
          "Excompañeros de proyectos de hace años: son lazos débiles valiosos.",
          "Gente de otras empresas con la que coincidiste en una prueba o una auditoría.",
          "Profesores y compañeros del IPN que hoy están en la industria."] },
        { t: "Clasificar: a quién cuidar primero", d: "No toda la red pesa igual para tu plan. Clasifica por qué tan cerca está de lo que buscas —Stuttgart, validación, automotive— y por qué tan buena es la relación.", l: [
          "A: trabaja en Stuttgart o en una empresa objetivo y te conoce bien.",
          "B: está en el sector, o te conoce bien pero en otra área.",
          "C: el resto; con un mensaje al año basta."] },
        { t: "LinkedIn como tu base de datos", d: "LinkedIn es una agenda que se actualiza sola: te dice dónde trabaja hoy cada persona. Bien usado, te muestra a quién conoces dentro de cada empresa objetivo.", l: [
          "Busca la empresa y filtra por tus contactos: verás a quién conoces adentro.",
          "Filtra por ubicación: «Stuttgart Region».",
          "Revisa tus contactos de segundo grado: alguien de tu hoja te puede presentar."] },
      ],
      "Las cartas de recomendación, ya": [
        { t: "Qué hace fuerte una carta", d: "Una carta pesa por sus detalles, no por sus adjetivos: qué hiciste, cómo lo hiciste y cómo te compara con otros que el recomendador ha visto. Por eso conviene alguien que te vio trabajar de cerca.", l: [
          "La relación: cuánto tiempo y en qué proyecto te supervisó.",
          "Ejemplos concretos: un problema que resolviste y su resultado.",
          "Una comparación: «de los mejores ingenieros con los que he trabajado»."] },
        { t: "Facilitarle el trabajo a quien la escribe", d: "Quien te recomienda está ocupado; si le das todo listo, la carta sale antes y mejor. Un paquete con tu CV, el programa y tus puntos clave le ahorra horas.", l: [
          "Mándale tu CV, el enlace del programa y la fecha límite.",
          "Incluye tres logros que viviste con esa persona, con fechas.",
          "Pregunta el formato: firmada en papel membretado, en PDF o enviada desde el portal de la universidad."] },
        { t: "El seguimiento sin ser molesto", d: "Una carta pedida con tiempo y recordada con tacto llega a tiempo. Un recordatorio a mitad del plazo y otro unos días antes es lo normal; nadie se ofende.", l: [
          "A la mitad del plazo: «¿necesitas algo más de mi parte?».",
          "A tres días del límite: un mensaje corto con la fecha.",
          "Al recibirla: agradece, y cuéntale el resultado cuando lo tengas."] },
      ],
      "Reactivar sin pedir nada": [
        { t: "Dar primero", d: "Adam Grant muestra en Give and Take que quienes ayudan sin llevar la cuenta construyen redes más fuertes a largo plazo, siempre que no se dejen explotar. Dar primero hace que, cuando pidas, la otra persona quiera ayudarte.", l: [
          "Ayudas de cinco minutos: una presentación, un artículo, una recomendación en LinkedIn.",
          "Comparte algo de tu experiencia que le sirva: una herramienta, una lección.",
          "Con quien solo toma y nunca da, reciprocidad: no más que eso."] },
        { t: "Retomar después de años sin hablar", d: "Escribirle a alguien después de mucho tiempo da pena, pero casi todo el mundo lo recibe bien. Lo que funciona es reconocer el tiempo con naturalidad y dar una razón concreta para escribir.", l: [
          "«Hace mucho que no hablamos; vi que ahora estás en ____ y me dio gusto.»",
          "Una pregunta fácil de contestar sobre su trabajo actual.",
          "Nada de pedir en el primer mensaje."] },
        { t: "El ritmo que mantiene viva una relación", d: "Una relación profesional se sostiene con contactos ligeros y regulares, no con un mensaje largo cada tres años. Con la gente A de tu hoja, cada dos o tres meses; con los demás, una o dos veces al año.", l: [
          "Usa fechas naturales: un aniversario laboral, un cambio de puesto, un logro de su empresa.",
          "Anota de qué hablaron para retomar el hilo la próxima vez.",
          "Comentar con sustancia una publicación suya también cuenta."] },
      ],
      "Stuttgart antes de llegar": [
        { t: "Cómo funciona el trato profesional en Alemania", d: "En Alemania el trato es más formal al inicio: el apellido y el «Sie» hasta que la otra persona proponga el «du», aunque en ingeniería y en inglés suele ser más directo. Se valora la puntualidad y que vayas al punto.", l: [
          "En una videollamada, conéctate a tiempo y termina en el tiempo que pediste.",
          "Directo no es grosero: pregunta lo que quieres saber sin rodeos.",
          "LinkedIn es la red principal; Xing se usa menos, sobre todo en empresas tradicionales."] },
        { t: "Dónde encontrar a la gente adecuada", d: "Quien más te puede orientar es quien estuvo en tu situación hace dos o tres años: extranjeros que estudiaron en la región y ahora trabajan en automotive.", l: [
          "En LinkedIn, busca «Hochschule Esslingen» en educación: son exalumnos de tu programa.",
          "Grupos de mexicanos y latinos en Stuttgart, en Facebook y LinkedIn.",
          "Comunidades técnicas de la región en Meetup: Python, ROS o testing."] },
        { t: "Qué preguntar para ahorrarte meses", d: "Una conversación bien preparada te da información que tardarías meses en descubrir solo: cómo es de verdad el mercado, qué valoran y qué errores evitar.", l: [
          "¿Cuánto alemán necesitaste de verdad para tu primer Werkstudent?",
          "¿En qué época del año contratan más?",
          "¿Qué harías distinto si llegaras hoy?"] },
      ],
      "La pregunta que abre puertas": [
        { t: "Cómo pedir la conversación", d: "La petición que funciona es corta, específica y fácil de aceptar: quién eres, por qué esa persona y qué le pides, con un tiempo limitado. «Veinte minutos» se acepta más que «un café».", l: [
          "Personaliza: menciona algo suyo, como su equipo o una publicación.",
          "Ofrece dos o tres horarios, o un enlace de calendario.",
          "Si no contesta, un solo recordatorio a la semana."] },
        { t: "Escuchar para aprender el idioma del equipo", d: "En estas conversaciones vas a oír cómo llaman a sus procesos, herramientas y problemas. Usar esas mismas palabras en tu CV y en tu entrevista te hace sonar como alguien de adentro.", l: [
          "Anota las herramientas que mencionen: dSPACE, Vector CANoe, Jenkins, Polarion.",
          "Anota los problemas que nombren: ahí está lo que valoran.",
          "Pregunta qué distingue a un buen Werkstudent: la respuesta es tu plan."] },
        { t: "Convertir la conversación en relación", d: "El agradecimiento y el seguimiento son lo que hace que te recuerden. Un mensaje el mismo día y, semanas después, la noticia de cómo usaste su consejo cierran el círculo.", l: [
          "El mismo día: agradece y menciona una cosa concreta que te sirvió.",
          "Cuando apliques su consejo, cuéntaselo.",
          "Si te recomendó a alguien, avísale cuando hables con esa persona."] },
      ],
      "Una hora al mes, en el calendario": [
        { t: "Un sistema simple de seguimiento", d: "Un sistema de contactos no necesita software: una hoja con la fecha del último contacto y la del siguiente basta. Lo importante es que cada mes te diga a quién escribir.", l: [
          "Una columna «próximo contacto», según si es A, B o C.",
          "Cada mes, filtra las fechas vencidas.",
          "Al terminar la hora, cada persona queda con su siguiente fecha."] },
        { t: "Qué medir para saber si tu red crece", d: "Una red útil no se mide por número de contactos sino por cuántas relaciones activas tienes donde quieres estar. Dos o tres números al mes te dicen si vas bien.", l: [
          "Contactos A con menos de tres meses sin hablar.",
          "Gente nueva en Stuttgart o en empresas objetivo este mes.",
          "Conversaciones de 20 minutos o más en el mes."] },
        { t: "Aportar en público", d: "La forma más eficiente de que te conozcan es aportar algo visible: un post útil, una respuesta en un foro, una charla corta. Así te encuentran a ti, en vez de que tú busques a cada persona.", l: [
          "Escribe en LinkedIn lo que aprendiste en un proyecto de validación.",
          "Comparte tu repositorio con una explicación de lo que resolviste.",
          "Comenta con sustancia las publicaciones de gente de tu sector."] },
      ],
    },
    finanzas: {
      "Págate primero": [
        { t: "Por qué funciona: el dinero que no ves no se gasta", d: "Gastamos según lo que vemos disponible. Si el ahorro sale antes de que lo veas, ajustas tu gasto a lo que queda casi sin esfuerzo; si esperas a fin de mes, el gasto crece hasta ocupar todo.", l: [
          "Automatiza el día que cae la quincena, no un día después.",
          "Usa una cuenta separada para el ahorro, sin tarjeta de débito.",
          "Empieza con lo que dice tu plan y súbelo cuando suba tu ingreso."] },
        { t: "Los gastos que no son de cada mes", d: "El seguro del auto, el refrendo, los regalos de diciembre, el mantenimiento: no llegan cada mes, pero siempre llegan. Si no los apartas, rompen el presupuesto del mes en que caen y te mandan a la tarjeta.", l: [
          "Lista los gastos anuales o semestrales y súmalos.",
          "Divide el total entre 12 y apártalo cada mes.",
          "Guárdalo aparte del fondo de emergencia: no es emergencia, es previsible."] },
        { t: "Cuando un mes no alcanza", d: "Habrá meses que no cuadren. La regla es no tocar primero el ahorro automatizado: recorta lo variable y, solo si no basta, baja el ahorro de ese mes y escribe por qué.", l: [
          "Primero: comida fuera y gustos.",
          "Segundo: el ahorro de ese mes; nunca el abono a la deuda cara.",
          "Tercero: anota la causa; si se repite tres meses, el plan necesita cambiar."] },
      ],
      "Saber a dónde se va tu dinero": [
        { t: "Gastos hormiga: cómo encontrarlos", d: "Los gastos pequeños y frecuentes —cafés, botanas, envíos, suscripciones— se pierden porque ninguno duele solo. Sumados en un mes suelen ser una de las categorías más grandes.", l: [
          "Filtra en Finanzas los gastos menores de $200 del mes y súmalos.",
          "Revisa las suscripciones del estado de cuenta: ¿las usas todas?",
          "Multiplica por 12: el número del año es el que motiva el cambio."] },
        { t: "Fijos, variables y de gusto", d: "No todos los gastos se mueven igual. Los fijos —renta, servicios— cambian con decisiones grandes; los variables —comida, gasolina— con hábitos; los de gusto, con decisiones del día.", l: [
          "Fijos: negocia o cambia una vez y ahorras cada mes.",
          "Variables: un tope por semana se controla mejor que uno por mes.",
          "Gusto: decide de antemano cuánto, y sin culpa dentro de eso."] },
        { t: "Revisar el mes en quince minutos", d: "Una revisión corta al cerrar el mes vale más que registrar perfecto. Tres preguntas bastan para aprender del mes y ajustar el siguiente.", l: [
          "¿Cuál fue la categoría más alta, y era la que esperabas?",
          "¿Qué gasto no volverías a hacer?",
          "¿Qué ajustas para el mes que viene, en una sola acción?"] },
      ],
      "Presupuestar sobre ingreso variable": [
        { t: "Vivir con el dinero del mes pasado", d: "La meta de quien tiene ingreso variable es pagar el mes actual con lo que ganó el mes anterior. Con un mes de gastos guardado, los meses flojos dejan de ser una crisis.", l: [
          "Junta un mes de gastos en una cuenta aparte, distinta del fondo de emergencia.",
          "Lo que entra cada mes va a esa cuenta, y de ahí sale el presupuesto del siguiente.",
          "Lo que sobre del mes bueno va al plan."] },
        { t: "Cuánto deja de verdad una hora de Didi", d: "Lo que cobras en Didi no es lo que ganas: hay que restar gasolina, desgaste del auto, mantenimiento y comisiones. Tu ganancia neta por hora te dice si una hora de manejo vale más que una de estudio o de descanso.", l: [
          "Neto por hora = (lo cobrado − gasolina − desgaste estimado) ÷ horas manejadas.",
          "Desgaste: llantas, servicios y depreciación; estímalo por kilómetro.",
          "Compara ese número con lo que vale una hora de tu plan de carrera."] },
        { t: "Repartir cada ingreso extra", d: "Un ingreso extra sin destino se diluye en gastos pequeños. Decidir el reparto de antemano hace que cada peso extra empuje el plan.", l: [
          "Mientras haya deuda cara, todo el extra va a la deuda.",
          "Sin deuda cara, casi todo al ahorro de la salida y una parte chica a gusto, para sostener el hábito.",
          "Escribe el reparto y aplícalo el mismo día que entra el dinero."] },
      ],
      "Decidir con la cabeza fría": [
        { t: "Los sesgos que más dinero cuestan", d: "La economía conductual documentó errores que todos repetimos: preferir lo de hoy aunque cueste más mañana, compararnos con otros y dejarnos llevar por la urgencia. Ponerles nombre ayuda a reconocerlos a tiempo.", l: [
          "Sesgo del presente: pagar a meses porque hoy duele menos.",
          "Anclaje: un «antes $5,000, hoy $3,000» te hace sentir que ahorras.",
          "Escasez fabricada: «últimas piezas» o «solo hoy», para que no lo pienses."] },
        { t: "El precio en horas de tu trabajo", d: "Traducir un precio a horas de trabajo lo vuelve concreto. Con tu ingreso del mes y tus horas sabes cuántas horas cuesta cada compra.", l: [
          "Tu hora = ingreso neto del mes ÷ horas trabajadas en el mes.",
          "Precio ÷ tu hora = las horas de trabajo que cuesta.",
          "Pregúntate: ¿cambiaría esas horas por esto?"] },
        { t: "Las decisiones grandes, por escrito", d: "En compras grandes, cambios de trabajo o inversiones, escribir la decisión antes de tomarla mejora el juicio y te deja aprender después. Annie Duke lo llama separar la calidad de la decisión de la suerte del resultado.", l: [
          "Qué decido, qué alternativas tenía y qué espero que pase.",
          "Qué información me faltaba y qué me haría cambiar de opinión.",
          "Relee la nota en seis meses y anota qué aprendiste."] },
      ],
      "Calcular el costo real de la deuda": [
        { t: "Tasa, CAT y lo que de verdad pagas", d: "La tasa de interés es solo una parte: el CAT, Costo Anual Total, suma intereses y comisiones, y es el número con el que el Banco de México pide comparar créditos. En tarjetas, además, se cobra IVA sobre los intereses.", l: [
          "Compara siempre por CAT, no por tasa ni por mensualidad.",
          "El IVA de los intereses no está en la tasa: súmalo a tu cuenta.",
          "Tu estado de cuenta trae la tasa, el CAT y los intereses del periodo."] },
        { t: "El pago mínimo y el pago para no generar intereses", d: "Tu estado de cuenta trae dos números clave: el pago mínimo, que apenas cubre intereses y un poco de capital, y el pago para no generar intereses, que es el saldo del periodo. Pagar solo el mínimo puede alargar una deuda años.", l: [
          "Paga el «pago para no generar intereses» en cuanto puedas: así eres totalero y no pagas intereses.",
          "Si no alcanzas, paga lo más que puedas arriba del mínimo.",
          "Muchos estados de cuenta dicen cuánto tardarías pagando solo el mínimo: léelo una vez."] },
        { t: "Meses sin intereses: cuándo sí y cuándo no", d: "Los MSI no cobran intereses si pagas cada mensualidad a tiempo, pero ocupan tu línea de crédito y comprometen tu flujo de los meses siguientes. El riesgo es acumular varios hasta que la suma ahogue la quincena.", l: [
          "Sí: una compra planeada, con el dinero ya apartado, para no descapitalizarte.",
          "No: si la suma de tus mensualidades pasa del 10 % de tu ingreso del mes (regla práctica).",
          "Lleva una lista de tus MSI activos con su fecha de fin."] },
      ],
      "El colchón dentro de la cuenta": [
        { t: "Cuánto fondo necesitas de verdad", d: "La recomendación común va de tres a seis meses de gastos, pero el número depende de qué tan estable es tu ingreso y de qué otros respaldos tienes. Con ingreso variable o una mudanza en puerta, conviene ir hacia arriba.", l: [
          "Mínimo: un mes de fijos; meta: tres meses de gastos.",
          "El colchón de la salida a Alemania es aparte del de emergencia.",
          "Allá, la cuenta bloqueada no es fondo de emergencia: libera una cantidad fija por mes."] },
        { t: "CETES para el fondo: cómo funcionan", d: "Los CETES son deuda del gobierno federal que se compra con descuento y se paga a su valor completo al vencer; la diferencia es tu rendimiento. En cetesdirecto se compran desde $100, sin comisiones, y pueden reinvertirse solos.", l: [
          "Plazo de 28 días para el fondo: se recupera rápido.",
          "Activa la reinversión automática para no dejar el dinero quieto.",
          "Si los necesitas antes del vencimiento, puedes venderlos y el dinero llega en uno o dos días hábiles."] },
        { t: "Reponer el fondo después de usarlo", d: "Usar el fondo en una emergencia real es justo para lo que existe; el error es no reponerlo. La regla: se repone antes que cualquier otro ahorro.", l: [
          "Calcula lo que usaste y divídelo entre las quincenas que tardarás.",
          "Mientras se repone, pausa los gustos grandes.",
          "Anota qué pasó: si era previsible, va a la lista de gastos que no son de cada mes."] },
      ],
      "Leer tu propio balance": [
        { t: "Activos que valen y activos que se deprecian", d: "No todo lo que tienes conserva su valor. El efectivo y las inversiones lo mantienen o lo aumentan; un auto pierde una parte cada año. En tu balance, el auto cuenta a su valor de venta de hoy, no al que pagaste.", l: [
          "El valor del {{auto}}: busca anuncios del mismo modelo y año, y toma el de en medio.",
          "Actualízalo cada seis meses, no cada mes.",
          "Separa el patrimonio líquido —lo que puedes usar pronto— del total."] },
        { t: "La tasa de ahorro: el número que manda", d: "Tu tasa de ahorro es la parte de tu ingreso que se queda como patrimonio. En los primeros años pesa mucho más en tus metas que el rendimiento de tus inversiones.", l: [
          "Tasa de ahorro = (ingreso − gasto) ÷ ingreso.",
          "Mídela cada mes; el promedio de tres meses es el que importa.",
          "Subirla cinco puntos suele adelantar una meta más que buscar mejor rendimiento."] },
        { t: "Cómo leer una caída del patrimonio", d: "Un mes con el patrimonio abajo no siempre es malo: puede ser una inversión que bajó, un gasto planeado o la depreciación del auto. Lo importante es separar la causa y ver la tendencia de varios meses.", l: [
          "Caída por el mercado: no pide acción si tu plan sigue igual.",
          "Caída por un gasto: revisa si estaba previsto.",
          "Caída por deuda nueva: es la única que pide un cambio inmediato."] },
      ],
      "Entender tus impuestos": [
        { t: "Deducciones personales: qué entra y el tope", d: "En tu declaración anual puedes deducir gastos médicos, dentales, de psicología y nutrición, lentes graduados, primas de seguros de gastos médicos e intereses reales de un crédito hipotecario, entre otros. El total tiene un tope: el menor entre el 15 % de tus ingresos del año y cinco UMA anuales.", l: [
          "Pagados con tarjeta, transferencia o cheque: en efectivo no cuentan.",
          "Con factura a tu RFC y el uso de CFDI de gastos médicos.",
          "Las colegiaturas, de preescolar a bachillerato, y las aportaciones voluntarias al retiro tienen sus propios límites."] },
        { t: "Cuándo te conviene presentar la declaración anual", d: "Si solo tienes sueldo de un patrón y ganas menos de 400 mil pesos al año, normalmente no estás obligado; pero presentarla con deducciones puede darte saldo a favor. Si tienes otros ingresos —intereses, venta de acciones, plataformas— revisa si te obliga.", l: [
          "En abril, entra a la declaración del SAT: trae tus ingresos y tus facturas precargados.",
          "Revisa que estén tus deducciones; si falta una, pide la factura.",
          "El saldo a favor se deposita en tu cuenta, a veces en días."] },
        { t: "Antes de irte a vivir fuera", d: "Si dejas de ser residente fiscal en México existe un aviso de cambio de residencia que se presenta ante el SAT antes de irte. Si te toca o no depende de dónde quede el centro de tus intereses; confírmalo con un contador.", l: [
          "Renueva tu e.firma antes de irte: vence cada cuatro años y sin ella no haces casi ningún trámite.",
          "Guarda tu constancia de situación fiscal y las declaraciones de los últimos cinco años.",
          "Lleva tu caso a un contador: estudiante en el extranjero, con o sin ingresos en México."] },
      ],
    },
    inversion: {
      "Saber cuándo NO invertir": [
        { t: "La cuenta que decide: tu deuda contra el rendimiento", d: "Pagar una deuda es una inversión con rendimiento garantizado igual a su tasa. Si tu tarjeta cobra más de 30 % al año, abonarle es ganar ese 30 % sin riesgo, algo que ninguna inversión razonable ofrece.", l: [
          "Deuda arriba de 15 % al año: pagarla le gana a casi cualquier inversión.",
          "Deuda barata, como un crédito de auto a tasa baja, puede convivir con invertir.",
          "Compara siempre después de impuestos y comisiones."] },
        { t: "El orden completo de operaciones", d: "Más allá del fondo y la deuda, el orden sano es: lo esencial cubierto, colchón, deuda cara en cero, fondo completo y después invertir a largo plazo. Cada paso protege al siguiente.", l: [
          "1. Lo esencial cubierto y un mes de colchón.",
          "2. Deuda cara en cero.",
          "3. Fondo completo; metas cercanas en renta fija y largo plazo en índices."] },
        { t: "Cuando el mercado sube y da comezón", d: "El momento más peligroso para saltarse el orden es cuando todos hablan de lo que subió. El miedo a quedarse fuera empuja a comprar caro y con dinero que no debería estar invertido.", l: [
          "Si una inversión es tema de conversación general, probablemente ya subió.",
          "Escribe la regla: nada nuevo hasta que la deuda esté en cero.",
          "Lleva una lista de ideas para cuando toque invertir: anotarlas quita la urgencia."] },
      ],
      "Conocer los instrumentos mexicanos": [
        { t: "Deuda del gobierno: CETES, Bonos M y Udibonos", d: "El gobierno emite deuda a distintos plazos. Los CETES son de corto plazo y se compran con descuento; los Bonos M pagan una tasa fija cada seis meses; los Udibonos están en UDIS y suben con la inflación. Todos se compran sin comisión en cetesdirecto.", l: [
          "CETES: liquidez y colchón.",
          "Bonos M: tasa fija; si las tasas del mercado bajan, su precio sube, y al revés.",
          "Udibonos: protegen tu poder de compra a largo plazo."] },
        { t: "ETF e índices desde México", d: "Un ETF es un fondo que cotiza en bolsa y replica un índice, como el S&P 500. En México se compran en el SIC, el Sistema Internacional de Cotizaciones, desde casas como {{broker}}, en pesos y sin abrir cuenta en el extranjero.", l: [
          "Revisa el costo anual del ETF: VOO cobra 0.03 %.",
          "Un ETF global, como VT, reparte el riesgo entre miles de empresas de muchos países.",
          "El tipo de cambio cuenta: un ETF en dólares sube o baja también con el peso."] },
        { t: "La Afore: la inversión que ya tienes", d: "Tu Afore recibe las aportaciones obligatorias de tu sueldo y las invierte en una Siefore según tu edad. Puedes revisar su rendimiento neto, cambiarte a una que rinda más y hacer aportaciones voluntarias que se deducen.", l: [
          "Consulta tu saldo y tu Afore en la app AforeMóvil.",
          "Compara el rendimiento neto que publica la CONSAR antes de elegir.",
          "Las aportaciones voluntarias se deducen en tu declaración, con su propio límite."] },
      ],
      "Interés compuesto y horizonte": [
        { t: "Nominal contra real: la inflación se come una parte", d: "Un rendimiento de 10 % con inflación de 4 % te deja cerca de 6 % real: eso es lo que crece tu poder de compra. Planear con rendimientos nominales hace que tus metas parezcan más cerca de lo que están.", l: [
          "Rendimiento real ≈ rendimiento nominal − inflación.",
          "Para metas a cinco años o más, planea con rendimiento real.",
          "Los Udibonos y los índices de largo plazo tienden a proteger contra la inflación."] },
        { t: "Cerca de la meta, el riesgo cambia", d: "Si tu meta tiene fecha, una caída fuerte justo antes duele más que una al principio. Por eso el dinero que vas a usar en uno o dos años no debería estar en bolsa, aunque en promedio rinda más.", l: [
          "Meta a menos de dos años: renta fija.",
          "Meta de dos a cinco años: una mezcla que pasa a renta fija conforme se acerca la fecha.",
          "El dinero de tu salida a Alemania tiene fecha: no debería estar en algo que pueda caer 30 % el mes antes."] },
        { t: "Aportar más le gana a buscar más rendimiento", d: "En los primeros años tus aportaciones pesan mucho más que el rendimiento. Subir lo que aportas acelera tus metas más que encontrar un instrumento que rinda un punto más.", l: [
          "Con poco capital, un punto extra de rendimiento son pocos pesos al año.",
          "Un aumento de sueldo dirigido al ahorro cambia toda la trayectoria.",
          "El rendimiento empieza a pesar más cuando el capital ya es grande."] },
      ],
      "Escribir tu asignación objetivo": [
        { t: "Cómo elegir los porcentajes", d: "La asignación depende de tu horizonte, de cuánto puedes ver caer sin vender y de tus metas. Un punto de partida: en renta fija, el dinero que usarás en los próximos dos años; en índices, el de largo plazo.", l: [
          "Pregúntate cuánto podrías ver caer tu cartera sin vender: ese es tu límite de riesgo.",
          "Separa por metas: la salida, el colchón y el largo plazo.",
          "Empieza simple: dos o tres partes bastan."] },
        { t: "Diversificar de verdad", d: "Diversificar no es tener muchas cosas, sino cosas que no se mueven igual. Diez acciones de tecnología de Estados Unidos están menos diversificadas que un solo ETF global.", l: [
          "Por país: no todo en un solo mercado.",
          "Por tipo: renta fija y renta variable.",
          "Por moneda: pesos, dólares y, para tu plan, euros."] },
        { t: "Tu política de inversión en una página", d: "Los inversionistas institucionales escriben una política que dice qué hacen y qué no, para no decidir con emociones. La tuya cabe en una página y te protege de ti mismo.", l: [
          "Tus metas, con fecha y monto.",
          "Tu asignación objetivo y cuándo rebalanceas.",
          "Qué haces si el mercado cae, y qué no harás nunca."] },
      ],
      "Aportar periódicamente y automatizarlo": [
        { t: "Aportar cada mes o invertir todo de una vez", d: "Con una cantidad grande, invertir todo de una vez gana en promedio, porque el mercado sube más veces de las que baja; pero aportar por partes reduce el arrepentimiento, y es lo natural cuando el dinero llega cada quincena.", l: [
          "Si el dinero llega cada mes, aportar cada mes es lo lógico.",
          "Con una cantidad grande y miedo a entrar, repártela en tres a seis meses.",
          "Lo peor es esperar «el momento perfecto» con el dinero quieto."] },
        { t: "Que la compra no dependa de tu ánimo", d: "Algunas casas de bolsa permiten programar compras recurrentes. Si la tuya no lo tiene, una transferencia automática más un bloque fijo en tu semana hacen lo mismo.", l: [
          "Programa la transferencia el día que entra la quincena.",
          "Ten escrito qué comprar según tu asignación.",
          "La compra toma cinco minutos en tu bloque del lunes."] },
        { t: "Subir el aporte sin sentirlo", d: "Cada aumento de ingreso es la oportunidad de subir el ahorro antes de acostumbrarte a gastarlo. Richard Thaler y Shlomo Benartzi lo probaron con «Save More Tomorrow»: comprometer de antemano una parte de los aumentos futuros.", l: [
          "Decide hoy: la mitad de cada aumento va al aporte.",
          "Cuando termines de pagar la tarjeta, ese abono se vuelve aporte.",
          "Escríbelo en el plan para que pase solo."] },
      ],
      "Ver las comisiones antes que el rendimiento": [
        { t: "Dónde se esconden los costos", d: "Además de la comisión del fondo puede haber comisión por operación, el IVA de esa comisión, el tipo de cambio que te aplican y la diferencia entre el precio de compra y el de venta. Juntos pueden duplicar el costo que ves.", l: [
          "Revisa una vez la tabla de comisiones de tu casa de bolsa.",
          "En dólares, compara el tipo de cambio que te dan con el del día.",
          "Menos operaciones, menos costos: compra en bloques, no a diario."] },
        { t: "Fondos de banco contra ETF", d: "Muchos fondos de inversión de bancos cobran entre 1 % y 2.5 % al año y casi nunca le ganan a su índice después de costos. Un ETF que replica el mismo índice cobra una fracción.", l: [
          "Busca en el prospecto la «comisión por administración».",
          "Compara su rendimiento con el de su índice, no con el de otros fondos.",
          "Si en cinco años no le gana a su índice, no hay razón para pagar más."] },
        { t: "El efecto acumulado de una comisión", d: "Una comisión parece pequeña porque se expresa en porcentaje al año, pero se cobra sobre todo tu saldo, cada año. A largo plazo es de las pocas cosas que sí controlas.", l: [
          "Compara dos opciones del mismo índice con la cuenta de «Para copiar».",
          "Revisa tus costos totales una vez al año.",
          "Prefiere lo simple: menos capas, menos comisiones."] },
      ],
      "Aguantar sin vender": [
        { t: "La brecha del comportamiento", d: "Estudios de Morningstar como «Mind the Gap» muestran que el inversionista promedio gana menos que los fondos en los que invierte, porque compra después de que suben y vende después de que bajan. La diferencia es puro comportamiento.", l: [
          "El rendimiento del fondo no es el tuyo si entras y sales.",
          "Los mejores días del mercado suelen llegar justo después de los peores.",
          "Quedarte invertido es una habilidad, no pasividad."] },
        { t: "Qué hacer en una caída, paso a paso", d: "En una caída, el primer impulso es hacer algo. Un protocolo escrito convierte la emoción en una lista de pasos que no incluye vender por pánico.", l: [
          "Paso 1: no abras la app más de una vez al día.",
          "Paso 2: relee tu política de inversión y tu asignación.",
          "Paso 3: si toca aportar, aporta a lo que quedó más abajo."] },
        { t: "Cuándo sí vender", d: "Vender no es malo; vender por miedo sí. Hay razones válidas: necesitas el dinero para una meta cercana, tu asignación se desvió mucho o cambió la razón por la que compraste.", l: [
          "Meta cercana: pasa a renta fija con anticipación, no el último mes.",
          "Rebalanceo: vende lo que subió de más, con calma y en su fecha.",
          "Error de inversión: si ya no la entiendes o cambió su razón de ser."] },
      ],
      "Rebalancear una vez al año": [
        { t: "Por calendario o por bandas", d: "Hay dos formas comunes: revisar en una fecha fija una vez al año, o actuar solo cuando una parte se sale de una banda, por ejemplo cinco puntos. Las dos funcionan; lo importante es decidir la regla antes.", l: [
          "Calendario: fácil de recordar; elige un mes tranquilo.",
          "Bandas: reacciona solo a movimientos grandes.",
          "Combinadas: revisas en la fecha y actúas solo si hay desviación."] },
        { t: "Rebalancear con aportes, sin vender", d: "La forma más barata de rebalancear es dirigir el dinero nuevo a lo que quedó abajo. No pagas impuestos ni comisiones de venta, y con aportes cada quincena suele bastar.", l: [
          "Calcula cuánto le falta a cada parte para llegar a su porcentaje.",
          "Manda los aportes a la que más le falte.",
          "Vende solo si la desviación es tan grande que los aportes no alcanzan."] },
        { t: "El impuesto de vender para rebalancear", d: "Vender lo que subió genera una ganancia, y en acciones o ETF del SIC pagas 10 % de ISR sobre ella. Por eso conviene rebalancear con aportes y vender solo lo necesario.", l: [
          "Antes de vender, calcula la ganancia y su impuesto.",
          "Las pérdidas de otra posición pueden compensar ganancias del año.",
          "Guarda los comprobantes para tu declaración."] },
      ],
      "Saber qué impuestos pagas al invertir": [
        { t: "Interés real y retención", d: "En instrumentos de deuda pagas impuesto sobre el interés real: lo que rindió por encima de la inflación. Durante el año la institución retiene un porcentaje sobre tu capital, que cuenta como pago a cuenta en tu declaración.", l: [
          "Tu constancia anual dice el interés real y la retención.",
          "Si el interés real fue bajo, la retención puede quedarte a favor.",
          "Presentar la declaración te deja recuperar esa diferencia."] },
        { t: "Ganancias en bolsa: el 10 %", d: "La venta de acciones y ETF en la bolsa mexicana, incluido el SIC, paga 10 % de ISR sobre la ganancia neta del año; tu casa de bolsa te da la constancia con el cálculo. Las pérdidas se restan de las ganancias.", l: [
          "La ganancia se calcula con el costo de compra actualizado por inflación.",
          "Las pérdidas compensan ganancias de ese año y de los siguientes, con sus reglas.",
          "Se declara en la anual aunque ya tengas la constancia."] },
        { t: "Dividendos: la otra parte del impuesto", d: "Los dividendos también pagan impuesto: los de empresas mexicanas llevan una retención adicional de 10 %, y los de empresas extranjeras suelen tener retención en su país de origen. Tu constancia trae los montos y lo que ya se retuvo.", l: [
          "Revisa en tu constancia los dividendos y su retención.",
          "Lo retenido en el extranjero puede acreditarse, con sus reglas.",
          "Si no quieres recibir dividendos, hay ETF que los reinvierten solos."] },
      ],
    },
    datos: {
      "Python y pandas con tus datos": [
        { t: "Las cinco operaciones que hacen casi todo", d: "Casi todo análisis con pandas usa cinco cosas: filtrar filas, elegir columnas, agrupar y resumir, ordenar y unir tablas. Dominar esas cinco te deja contestar la mayoría de las preguntas.", l: [
          "Filtrar: df[df['monto'] > 500]",
          "Agrupar: df.groupby('categoria')['monto'].agg(['sum', 'mean', 'count'])",
          "Unir: pd.merge(gastos, categorias, on='categoria')"] },
        { t: "Limpiar datos: donde se va el tiempo real", d: "Los datos reales vienen sucios: fechas como texto, montos con símbolos, categorías escritas de varias formas. Limpiar suele ser más de la mitad del trabajo, y hacerlo con código lo vuelve repetible.", l: [
          "Fechas: pd.to_datetime(df['fecha'], dayfirst=True)",
          "Montos: df['monto'].str.replace('[$,]', '', regex=True).astype(float)",
          "Categorías: df['categoria'].str.strip().str.lower()"] },
        { t: "Cuadernos: Kaggle, Colab o tu computadora", d: "Un cuaderno mezcla código, resultados y notas: es ideal para explorar. Kaggle y Google Colab corren en el navegador sin instalar nada; en tu computadora, VS Code abre cuadernos con la extensión de Jupyter.", l: [
          "Para empezar, Colab con tu CSV subido.",
          "Para tu repositorio: guarda el cuaderno y un script .py con lo que funcionó.",
          "Pon arriba de cada celda qué pregunta contesta."] },
      ],
      "Un tablero que responda una pregunta": [
        { t: "La gráfica correcta para cada pregunta", d: "Cada pregunta tiene su gráfica: comparar categorías pide barras; una tendencia en el tiempo, líneas; las partes de un total, barras apiladas. Las gráficas de pastel con muchas partes casi nunca son la mejor opción.", l: [
          "Comparar: barras horizontales, de mayor a menor.",
          "Tendencia: una línea con el tiempo completo en el eje.",
          "Distribución: un histograma, para ver cómo se reparten los montos."] },
        { t: "Filtros y controles útiles", d: "Un buen tablero deja que quien lo ve cambie el periodo o la categoría sin romperlo. Pocos controles bien elegidos valen más que muchos.", l: [
          "Un control de rango de fechas arriba.",
          "Un filtro de categoría que mueva todas las gráficas.",
          "Valores por defecto que contesten la pregunta principal sin tocar nada."] },
        { t: "El tablero como pieza de portafolio", d: "Un tablero publicado con datos tuyos o públicos es una prueba visible de que sabes trabajar con datos. Para validación, un tablero de resultados de pruebas simuladas muestra justo lo que hace un equipo.", l: [
          "Datos públicos o simulados, nunca de tu empresa.",
          "Publícalo con un enlace de solo lectura.",
          "En tu repositorio, explica la pregunta, la fuente y la decisión que permite tomar."] },
      ],
      "Contar lo que dicen los datos": [
        { t: "La estructura de una explicación con datos", d: "Cole Nussbaumer Knaflic propone pensar primero en el mensaje y en quién lo escucha, y después en la gráfica. La estructura más útil: el contexto en una frase, el hallazgo, por qué importa y qué propones.", l: [
          "Contexto: «Corrimos 400 pruebas de regresión en la versión 2.3.»",
          "Hallazgo: «Falló el 12 %, todas en el módulo de frenado.»",
          "Propuesta: «Recomiendo revisar el cambio de calibración antes de liberar.»"] },
        { t: "Quitar lo que distrae", d: "Cada elemento que no ayuda al mensaje compite por atención: rejillas, bordes, leyendas lejanas, colores de más. Quitar es lo que hace que una gráfica se entienda en segundos.", l: [
          "Sin bordes ni rejillas pesadas; si hace falta, una rejilla tenue.",
          "Etiqueta directo sobre la línea en vez de usar leyenda.",
          "Un solo color fuerte para lo importante; lo demás en gris."] },
        { t: "El mensaje según quién escucha", d: "Un gerente quiere la decisión; un ingeniero, el detalle técnico. El mismo análisis se cuenta distinto según quién lo recibe.", l: [
          "Gerencia: la conclusión y el riesgo primero; el detalle, en un anexo.",
          "Equipo técnico: el método, los datos y sus limitaciones.",
          "Cliente: el impacto en su producto y los siguientes pasos."] },
      ],
      "SQL, diez minutos al día": [
        { t: "El orden en que SQL ejecuta una consulta", d: "Escribes SELECT primero, pero la base de datos ejecuta en otro orden: FROM y JOIN, luego WHERE, GROUP BY, HAVING, SELECT y al final ORDER BY. Entenderlo explica muchos errores, como no poder usar en el WHERE un alias del SELECT.", l: [
          "WHERE filtra filas antes de agrupar; HAVING filtra grupos después.",
          "Un alias del SELECT sí se puede usar en ORDER BY.",
          "Si una consulta da resultados raros, léela en el orden en que se ejecuta."] },
        { t: "Los JOIN y cuándo usar cada uno", d: "INNER JOIN devuelve solo lo que coincide en las dos tablas; LEFT JOIN conserva todo lo de la izquierda aunque no tenga pareja. Elegir mal es la causa más común de resultados que parecen correctos pero tienen filas de menos.", l: [
          "INNER: las pruebas que tienen resultado.",
          "LEFT: todos los requisitos, tengan o no prueba; los NULL son los huecos.",
          "Cuenta las filas antes y después de un JOIN para detectar duplicados."] },
        { t: "Funciones de ventana: el siguiente nivel", d: "Las funciones de ventana calculan sobre grupos de filas sin juntarlas: rankings, acumulados, comparaciones con el registro anterior. Salen en entrevistas de datos y resuelven en una línea lo que antes pedía varias consultas.", l: [
          "ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY monto DESC): el ranking dentro de cada categoría.",
          "SUM(monto) OVER (ORDER BY fecha): el acumulado.",
          "LAG(monto) OVER (ORDER BY fecha): el valor anterior, para ver cambios."] },
      ],
      "Teclear, no mirar": [
        { t: "La ilusión de saber", d: "Ver a alguien resolver algo te hace sentir que sabes hacerlo; es la ilusión de competencia. Solo al intentarlo sin ayuda descubres lo que no sabes, y ese es el momento en que se aprende.", l: [
          "Después de cada video, ciérralo y reprodúcelo de memoria.",
          "Si te atoras, mira solo esa parte y vuelve a cerrar.",
          "Al día siguiente, rehazlo sin ver nada."] },
        { t: "Leer un mensaje de error", d: "Un error de Python dice qué pasó y dónde: el tipo de error, el mensaje y la línea. Leerlo de abajo hacia arriba te lleva a la causa en la mayoría de los casos.", l: [
          "La última línea: el tipo —KeyError, TypeError— y el mensaje.",
          "Las de arriba: el camino de llamadas hasta tu código.",
          "Un KeyError en pandas casi siempre es una columna mal escrita."] },
        { t: "Proyectos pequeños en vez de cursos largos", d: "Un curso largo sin proyecto se olvida; un proyecto pequeño con una pregunta real obliga a usar lo aprendido. Alterna: un tema del curso y su aplicación a tus datos esa misma semana.", l: [
          "Una pregunta real: ¿en qué meses gasto más en comida?",
          "Las herramientas: lo que acabas de ver en el curso.",
          "El entregable: un cuaderno con la respuesta y una gráfica."] },
      ],
    },
    mente: {
      "Lo alto no se mantiene solo": [
        { t: "Sistemas, no metas", d: "James Clear lo resume así: no subes al nivel de tus metas, caes al nivel de tus sistemas. La meta dice a dónde vas; el sistema —la hora fija, el lugar, la señal— es lo que te lleva en los días difíciles.", l: [
          "Cada hábito clave con su hora, su lugar y su señal.",
          "Hazlo fácil: deja listo el entorno la noche anterior.",
          "Mide el sistema —¿lo hice?— más que el resultado del día."] },
        { t: "La versión mínima: no romper la cadena", d: "En un día malo el objetivo no es hacerlo bien, sino no dejar de hacerlo. Una versión mínima definida de antemano —diez minutos en vez de una hora— mantiene la racha y la identidad.", l: [
          "Define la versión mínima de cada hábito clave.",
          "Regla: nunca dos días seguidos sin hacerlo.",
          "La versión mínima cuenta como hecho; no es trampa."] },
        { t: "Las señales tempranas de que algo se cae", d: "Antes de que un hábito se pierda hay señales: lo pospones, lo acortas, lo haces más tarde. Detectarlas a tiempo es mucho más fácil que reconstruir el hábito después.", l: [
          "Dos días seguidos pospuesto: alerta.",
          "Una semana más corta de lo normal: revisa qué cambió.",
          "En la revisión del domingo, mira primero lo que cambió de hora."] },
      ],
      "El sueño es la palanca, no la fuerza de voluntad": [
        { t: "Qué hace el sueño por tu memoria y tu cuerpo", d: "Dormir consolida lo aprendido en el día, repara el músculo y regula el apetito y el ánimo. Con menos sueño del que necesitas bajan la atención, la fuerza y el autocontrol, aunque no lo notes.", l: [
          "El sueño profundo fija lo que estudiaste; el REM, las habilidades y las emociones.",
          "Dos semanas durmiendo seis horas afectan la atención casi como una noche sin dormir.",
          "Lo que repasas antes de dormir se fija mejor si duermes completo."] },
        { t: "La cafeína, el alcohol y la luz", d: "La cafeína tarda unas cinco horas en bajar a la mitad: un café a las cuatro de la tarde sigue actuando a medianoche. El alcohol ayuda a dormirse pero fragmenta el sueño y reduce el REM. La luz de las pantallas retrasa tu reloj interno.", l: [
          "Último café antes de las dos de la tarde.",
          "Alcohol lejos de la hora de dormir; mejor nada entre semana.",
          "Luz baja y cálida en la última hora; luz natural fuerte en la mañana."] },
        { t: "Si no puedes dormir", d: "La terapia cognitivo-conductual para el insomnio es el tratamiento de primera línea. Una de sus reglas: si llevas unos veinte minutos despierto en la cama, levántate y haz algo tranquilo con luz baja hasta que tengas sueño.", l: [
          "La misma hora de despertar todos los días, también el fin de semana.",
          "La cama solo para dormir: nada de celular ni de trabajo.",
          "Si el problema dura semanas, búscalo con un especialista."] },
      ],
      "Terapia antes de irte": [
        { t: "Cómo elegir terapeuta", d: "La relación con el terapeuta predice buena parte del resultado. Busca formación en un enfoque con evidencia, como la terapia cognitivo-conductual o la de aceptación y compromiso, y a alguien con quien te sientas cómodo hablando.", l: [
          "Pregunta por su enfoque y su experiencia con cambios de vida o migración.",
          "Date dos o tres sesiones para evaluar la relación.",
          "La terapia en línea funciona y te deja seguir con la misma persona desde Alemania."] },
        { t: "El choque cultural y sus etapas", d: "Quien se muda de país suele pasar por etapas: luna de miel, frustración, ajuste y adaptación. Saber que la frustración es normal, y que suele llegar en los primeros meses, ayuda a no tomarla como fracaso.", l: [
          "Luna de miel: todo es nuevo y emociona.",
          "Frustración: el idioma, los trámites y la soledad pesan; a ti te coincide con el invierno.",
          "Ajuste: rutinas y amigos nuevos; ahí rinde el plan que armaste en terapia."] },
        { t: "El invierno alemán: luz y ánimo", d: "En Stuttgart, en diciembre hay unas ocho horas de luz y muchos días nublados. La falta de luz afecta el ánimo y el sueño; prepararse funciona mejor que aguantar.", l: [
          "Sal a la luz natural en la mañana, aunque esté nublado.",
          "Pregúntale a tu médico por la vitamina D: en invierno conviene revisarla.",
          "A muchas personas les ayuda una lámpara de luz brillante en la mañana; consúltalo antes de usarla."] },
      ],
      "La deuda pesa en la cabeza, no sólo en la cartera": [
        { t: "Por qué la deuda cansa", d: "Sendhil Mullainathan y Eldar Shafir mostraron en Escasez que las preocupaciones de dinero ocupan atención y te dejan menos para todo lo demás. No es falta de voluntad: es una carga real, y se aligera al tener un plan con fecha.", l: [
          "Un plan escrito con fecha libera parte de esa carga.",
          "Mirar el avance una vez al mes basta.",
          "Revisar el saldo varias veces al día alimenta la preocupación."] },
        { t: "Celebrar los hitos de la deuda", d: "Una deuda larga se sostiene mejor con hitos intermedios: la mitad pagada, el último abono. Reconocerlos refuerza lo que te llevó ahí.", l: [
          "Marca hitos: 25 %, 50 %, 75 % y el último abono.",
          "Celebra con algo que no genere deuda nueva.",
          "Cuéntaselo a alguien: decirlo lo hace real."] },
        { t: "Qué hacer el día que termines de pagar", d: "El día que termines, el dinero que iba a la deuda queda libre. Si no tiene destino se va en gastos; si lo rediriges ese mismo día, tu ahorro sube sin que cambie tu nivel de vida.", l: [
          "Programa ese mismo monto hacia tu inversión.",
          "Decide qué haces con la tarjeta: cancelarla o dejarla sin uso.",
          "Escribe lo que aprendiste para no repetir el ciclo."] },
      ],
      "Cortar la rumia con una acción pequeña": [
        { t: "Rumiar no es resolver", d: "Rumiar es repetir un problema sin avanzar; resolver produce un siguiente paso. La pregunta que los separa: ¿en los últimos diez minutos apareció una idea nueva o una acción? Si no, estás rumiando.", l: [
          "Rumiar: «¿y si sale mal?», una y otra vez.",
          "Resolver: «¿qué es lo peor probable y qué haría?».",
          "Cambia el «por qué me pasa» por el «qué hago ahora»."] },
        { t: "El rato fijo para preocuparte", d: "Una técnica de la terapia cognitivo-conductual es agendar un rato fijo para preocuparte, unos quince minutos al día. Si la preocupación aparece fuera de ese horario, la anotas y la dejas para su cita.", l: [
          "Elige una hora lejos de la de dormir.",
          "Durante el día, anota la preocupación en una línea.",
          "En la cita, decide: ¿hay una acción? Si no, se suelta."] },
        { t: "Planes «si… entonces…»", d: "Peter Gollwitzer mostró que decidir de antemano qué harás cuando aparezca una señal —«si pasa esto, entonces hago aquello»— aumenta mucho la probabilidad de hacerlo. Sirve para cortar la rumia antes de que empiece.", l: [
          "«Si llevo diez minutos dándole vueltas, entonces mando el mensaje o escribo la línea.»",
          "«Si me despierto pensando en el trabajo, entonces lo anoto y vuelvo a dormir.»",
          "Escribe tres de estos y léelos el domingo."] },
      ],
      "Una revisión corta cada domingo": [
        { t: "El formato que dura años", d: "Una revisión funciona si es corta, escrita y siempre igual. Diez minutos con las mismas preguntas se sostienen años; una revisión de una hora se abandona en un mes.", l: [
          "El mismo lugar y la misma hora cada domingo.",
          "Las mismas preguntas: lo que salió, lo que se cayó y lo único que cambias.",
          "Guárdalas juntas para releerlas cada trimestre."] },
        { t: "Revisar sin castigarte", d: "Una revisión que se vuelve juicio se acaba evitando. Tratarte como tratarías a un amigo no baja la exigencia: la investigación de Kristin Neff muestra que facilita retomar después de fallar.", l: [
          "Describe lo que pasó como si le hubiera pasado a otra persona.",
          "Pregunta qué lo hizo difícil, no qué está mal contigo.",
          "Termina con la acción, no con el juicio."] },
        { t: "La revisión de cada trimestre", d: "Cada tres meses, relee tus revisiones de los domingos. Lo que se repite —el mismo hábito que se cae, la misma causa— es lo que de verdad hay que cambiar.", l: [
          "Cuenta qué causa se repite más.",
          "Elige un solo cambio grande para el trimestre.",
          "Compáralo con el Plan Maestro: ¿vas al ritmo de tu fase?"] },
      ],
    },
    liderazgo: {
      "Dónde está tu techo": [
        { t: "Por qué evitamos las conversaciones difíciles", d: "Las evitamos porque esperamos que salgan mal: conflicto, rechazo, dañar la relación. Pero no tenerlas también cuesta, y ese costo crece en silencio: el problema sigue y la relación se desgasta igual.", l: [
          "Calcula el costo de callar: ¿qué pasa si esto sigue seis meses así?",
          "Separa el miedo a la conversación del problema real.",
          "Una conversación difícil bien preparada casi nunca sale tan mal como imaginas."] },
        { t: "Valentía o claridad: cuál te falta", d: "Si sabes exactamente qué decir y no lo dices, te falta valentía: se trabaja con exposición gradual, empezando por conversaciones pequeñas. Si no sabes qué decir, te falta claridad: se trabaja escribiendo los hechos y lo que quieres lograr.", l: [
          "Valentía: empieza por la conversación de menor riesgo de tu lista.",
          "Claridad: escribe qué quieres para ti, para la otra persona y para la relación.",
          "Las dos mejoran practicando, no pensando más."] },
        { t: "El objetivo antes de hablar", d: "En Conversaciones cruciales, la pregunta antes de hablar es qué quieres de verdad: para ti, para la otra persona y para la relación. Si tu objetivo se vuelve ganar, la conversación se rompe.", l: [
          "Escribe en una frase el resultado que buscas.",
          "Si notas que quieres tener la razón, regresa a esa frase.",
          "Busca un propósito común: algo que los dos quieran."] },
      ],
      "Separar el hecho de la historia": [
        { t: "Del hecho a la reacción", d: "Conversaciones cruciales describe cómo pasamos de ver algo a reaccionar: vemos un hecho, nos contamos una historia, sentimos una emoción y actuamos. Si cambias la historia, cambian la emoción y la reacción.", l: [
          "El hecho: lo que observaste.",
          "La historia: la interpretación que le añadiste.",
          "La pregunta: ¿qué otra historia explicaría el mismo hecho?"] },
        { t: "Cómo decir lo difícil sin cerrar el diálogo", d: "El mismo libro propone un orden: compartir los hechos, contar tu historia, preguntar por la del otro, hablar con tentatividad y animarlo a que te contradiga. Así dices lo difícil sin que el otro se cierre.", l: [
          "Los hechos primero: no se discuten.",
          "Tu historia como hipótesis: «empiezo a pensar que…».",
          "La invitación: «¿tú lo ves distinto?»."] },
        { t: "Mantener la seguridad en la conversación", d: "Cuando alguien se siente atacado, se defiende o se calla. Restaurar la seguridad —aclarar tu intención, disculparte si hace falta— permite regresar al tema.", l: [
          "Señales: silencio, sarcasmo, cambio de tema, tono alto.",
          "Contraste: «no quiero decir que…; lo que sí quiero decir es que…».",
          "Si se rompe, pausa y regresa a lo que los dos quieren."] },
      ],
      "Liderar sin el puesto": [
        { t: "Influir sin autoridad", d: "Sin jerarquía, la influencia viene de la credibilidad, de la reciprocidad y de entender qué le importa a cada persona. Allan Cohen y David Bradford lo explican como un intercambio: ofreces lo que el otro valora.", l: [
          "Identifica qué le importa a cada parte: tiempo, reconocimiento, menos riesgo.",
          "Ofrece primero: ayuda que les quite trabajo.",
          "La credibilidad se construye cumpliendo siempre lo pequeño."] },
        { t: "Cómo proponer un cambio en tu equipo", d: "Una propuesta se acepta más fácil si llega con el problema medido, una solución pequeña para probar y la forma de deshacerla. Pedir un piloto asusta menos que pedir un cambio permanente.", l: [
          "El problema, con un número: horas perdidas, fallas, retrabajo.",
          "Un piloto de dos semanas con su criterio de éxito.",
          "Comparte el crédito: invita a otros a mejorarlo."] },
        { t: "Documentar tu impacto", d: "Lo que no se documenta no existe en una evaluación ni en una entrevista. Un registro de logros con fecha y número te da material para tu CV y para negociar.", l: [
          "Una nota por logro: qué, cuándo, impacto y quién lo vio.",
          "Revísala cada mes y antes de cada evaluación.",
          "Convierte los mejores en respuestas STAR."] },
      ],
      "Dar retroalimentación que no duela": [
        { t: "Situación, comportamiento, impacto", d: "El Center for Creative Leadership propone describir la situación concreta, el comportamiento que se vio y su impacto. Evita juzgar a la persona y hace que la retroalimentación sirva.", l: [
          "Situación: «en la revisión del martes».",
          "Comportamiento: «el reporte no traía los casos de falla».",
          "Impacto: «tuvimos que repetir la prueba»."] },
        { t: "Franqueza radical: que te importe y decirlo", d: "Kim Scott la define como importarte la persona y retarla de frente al mismo tiempo. Sin lo primero es agresión; sin lo segundo es empatía ruinosa: callarte para no incomodar.", l: [
          "Elogio específico y frecuente; crítica en privado y pronto.",
          "Pide retroalimentación tú primero: das el ejemplo.",
          "Si dudas en decir algo importante, pregúntate a quién proteges callando."] },
        { t: "Recibir retroalimentación sin defenderte", d: "La reacción natural ante una crítica es explicar por qué no tienen razón. Escuchar primero, agradecer y pedir un ejemplo te da información y muestra madurez.", l: [
          "Escucha completo antes de responder.",
          "Pregunta: «¿me das un ejemplo?».",
          "Agradece, y decide después qué cambias."] },
      ],
      "Una conversación pendiente al mes": [
        { t: "Preparar una conversación difícil en diez minutos", d: "No hace falta una hora: diez minutos de preparación por escrito cambian el resultado. Lo esencial es el objetivo, los hechos, la apertura y la pregunta.", l: [
          "El objetivo: qué quieres para ti, para el otro y para la relación.",
          "Los hechos y la apertura: tus dos primeras frases.",
          "La pregunta y el acuerdo: qué propones al final."] },
        { t: "El momento y el lugar", d: "La misma conversación sale distinta según cuándo y dónde. En privado, con tiempo, sin interrupciones y nunca en medio de un problema que está ardiendo.", l: [
          "En privado, nunca frente a otros.",
          "Con tiempo: no cinco minutos antes de una junta.",
          "Si el tema es emocional, deja que baje la temperatura, pero no semanas."] },
        { t: "Cerrar con acuerdos claros", d: "Muchas conversaciones buenas terminan sin acuerdo, y el problema regresa. Cerrar con quién hace qué, para cuándo y cuándo lo revisan convierte la conversación en un cambio.", l: [
          "Resume en voz alta lo acordado.",
          "Fija una fecha para revisarlo.",
          "Si es de trabajo, mándalo por escrito."] },
      ],
    },
    copy: {
      "Qué te falta, exactamente": [
        { t: "La llamada a la acción", d: "Una llamada a la acción dice qué hacer, cuándo y cómo, y es fácil de cumplir. Cuanto más concreta y pequeña, más gente responde.", l: [
          "Concreta: «respóndeme con un día y una hora».",
          "Pequeña: pedir 15 minutos funciona mejor que pedir una hora.",
          "Una sola: dos peticiones en un mensaje dividen la respuesta."] },
        { t: "Escribir para quien lee", d: "El error de fondo es escribir lo que quieres decir en vez de lo que el lector necesita para actuar. Antes de escribir, piensa qué sabe ya, qué le falta y qué le preocupa.", l: [
          "Lo que ya sabe: no lo repitas.",
          "Lo que le falta: el dato que necesita para decidir.",
          "Lo que le preocupa: respóndelo antes de que lo pregunte."] },
        { t: "La primera línea decide", d: "Casi todo el mundo decide en la primera línea si sigue leyendo. En correos, mensajes y posts, la primera línea dice para qué es el mensaje.", l: [
          "Correo: el propósito en el asunto y en la primera frase.",
          "LinkedIn: la primera línea es lo único que se ve antes de «ver más».",
          "Mensaje: primero la petición, después el contexto."] },
      ],
      "Una promesa por texto": [
        { t: "Dos estructuras probadas: AIDA y PAS", d: "AIDA —atención, interés, deseo, acción— y PAS —problema, agitación, solución— son estructuras clásicas para textos que buscan una acción. Sirven de esqueleto, no de plantilla rígida.", l: [
          "AIDA: un gancho, por qué importa, qué gana el lector y qué hacer.",
          "PAS: el problema, por qué duele y cómo se resuelve.",
          "Úsalas en los posts del negocio de tu papá y en tu perfil."] },
        { t: "Beneficios, no características", d: "Una característica dice qué es; un beneficio dice qué gana el lector. La gente decide por los beneficios y se justifica con las características.", l: [
          "Característica: «seis años de validación HIL».",
          "Beneficio: «llego probando desde el primer día, sin curva de aprendizaje».",
          "Pregunta «¿y eso qué?» hasta llegar al beneficio."] },
        { t: "Frases cortas y palabras simples", d: "Un texto claro se lee rápido y todos lo entienden igual: frases de menos de veinte palabras, palabras comunes y un solo tema por párrafo.", l: [
          "Revisa la legibilidad con un editor como Hemingway Editor.",
          "Cambia palabras largas por cortas: «utilizar» por «usar».",
          "Un párrafo, una idea."] },
      ],
      "Reescribe tu perfil de LinkedIn": [
        { t: "Cómo te encuentran los reclutadores", d: "Los reclutadores buscan por palabras clave: el puesto, las herramientas y la ubicación. Si tu titular y tu experiencia no traen las palabras que buscan, no apareces aunque seas el candidato ideal.", l: [
          "Incluye: validation, HIL, ADAS, Python, test automation, CAN.",
          "Ubicación y disponibilidad: Stuttgart, desde septiembre de 2027.",
          "Repite las palabras clave en tus puestos, de forma natural."] },
        { t: "La experiencia como logros", d: "Cada puesto debe tener tres o cuatro logros con número, no una lista de responsabilidades. La fórmula: verbo de acción, qué hiciste y el resultado medible.", l: [
          "«Designed 120 HIL test cases for an AEB function, finding 8 critical defects before release.»",
          "«Led a team of __ engineers in Stuttgart to deliver ____.»",
          "«Automated ____ in Python, reducing ____ by __ %.»"] },
        { t: "Las señales de que buscas", d: "LinkedIn te deja marcar que estás abierto a oportunidades, visible solo para reclutadores o para todos. Con un titular claro, aumenta los mensajes que recibes.", l: [
          "Activa «Open to work» solo para reclutadores mientras sigas en tu trabajo.",
          "Indica el tipo de puesto: working student, validation engineer.",
          "Pide dos o tres recomendaciones a antiguos jefes."] },
      ],
      "El correo frío de 5 líneas": [
        { t: "La personalización que hace que respondan", d: "Un correo frío genérico se ignora. Una línea que demuestre que conoces algo de esa persona —su proyecto, su publicación, su equipo— multiplica las respuestas.", l: [
          "Revisa su actividad reciente en LinkedIn.",
          "Menciona algo específico, no «me impresiona tu trayectoria».",
          "Conecta su trabajo con el tuyo en una frase."] },
        { t: "El asunto que se abre", d: "El asunto decide si se abre el correo. Corto, específico y sin sonar a publicidad funciona mejor.", l: [
          "Menos de seis palabras.",
          "Específico: «Question about HIL testing at your team».",
          "Sin mayúsculas, sin signos de exclamación y sin «urgente»."] },
        { t: "El seguimiento, donde llegan las respuestas", d: "Muchas respuestas llegan al segundo o tercer correo, no al primero. Un seguimiento corto a la semana, sin reproches, es normal y esperado.", l: [
          "Seguimiento 1, a los cinco o siete días: una línea, respondiendo a tu propio correo.",
          "Seguimiento 2, a las dos semanas: aporta algo nuevo.",
          "Después, para y pasa a otra persona."] },
      ],
      "Leer en voz alta antes de enviar": [
        { t: "Editar en tres pasadas", d: "Editar todo a la vez no funciona. Tres pasadas cortas, cada una con un objetivo, atrapan más errores: estructura, claridad y detalle.", l: [
          "Pasada 1: ¿el mensaje principal está arriba?",
          "Pasada 2: corta palabras y frases que sobran.",
          "Pasada 3: ortografía, nombres y números."] },
        { t: "El tono según el canal", d: "Un correo formal, un WhatsApp y un post piden tonos distintos. Leer en voz alta te deja escuchar si el tono es el correcto para quien lo recibe.", l: [
          "Correo a un reclutador: profesional y directo.",
          "WhatsApp a un cliente: cercano pero claro.",
          "LinkedIn: conversacional y con datos."] },
        { t: "Revisar un texto en inglés", d: "Los errores más comunes de quien habla español al escribir en inglés son los falsos amigos, las preposiciones y el orden de las palabras. Una lista corta de tus errores frecuentes te ahorra la mayoría.", l: [
          "Falsos amigos: «actually» no es «actualmente»; «eventually» no es «eventualmente».",
          "Preposiciones: «depend on», «responsible for», «interested in».",
          "LanguageTool o Grammarly como segunda revisión."] },
      ],
    },
    ventas: {
      "Vender lo que no usas a su precio": [
        { t: "Fotos que venden", d: "La foto es lo primero, y casi lo único, que se ve en Marketplace. Luz natural, fondo limpio, el objeto completo y los detalles que dan confianza hacen que se venda más rápido y a mejor precio.", l: [
          "Luz de ventana, sin flash; fondo liso.",
          "Una foto general, una de cada lado y una de cada detalle o defecto.",
          "Si trae caja o accesorios, una foto con todo junto."] },
        { t: "Vender y entregar con seguridad", d: "Las estafas más comunes en ventas entre personas son los pagos falsos y los comprobantes editados. Entregar en lugares públicos y confirmar el pago en tu banca antes de soltar el artículo evita casi todos los problemas.", l: [
          "Entrega en lugares públicos y concurridos, de día.",
          "Confirma el depósito en la app de tu banco, no en una captura de pantalla.",
          "Desconfía de quien paga de más y te pide la diferencia."] },
        { t: "Cuándo bajar el precio", d: "Si en una semana nadie escribe, el problema es el precio o las fotos; si escriben pero nadie compra, es la negociación o la entrega. Ajusta según la señal, no por impaciencia.", l: [
          "Sin mensajes en siete días: baja 10 % o mejora las fotos.",
          "Muchas preguntas y ninguna venta: revisa tus respuestas y tu disponibilidad.",
          "Vuelve a publicar el anuncio para que aparezca arriba otra vez."] },
      ],
      "El seguimiento es la venta": [
        { t: "Por qué la gente no responde", d: "Casi nunca es un no: es olvido, duda o falta de tiempo. Un buen seguimiento resuelve la duda o facilita la decisión, en vez de solo presionar.", l: [
          "Olvido: un recordatorio amable.",
          "Duda: más información, otra foto, una garantía.",
          "Tiempo: una opción concreta de entrega."] },
        { t: "Influir sin trampas", d: "Robert Cialdini describe principios como la reciprocidad, la prueba social, la escasez y el compromiso. Usados con honestidad ayudan a decidir; con trampas, queman la relación.", l: [
          "Prueba social: «ya vendí otro igual y el comprador quedó contento».",
          "Escasez real: «hay otra persona interesada», solo si es verdad.",
          "Compromiso: un apartado pequeño hace que la gente cumpla."] },
        { t: "Registrar para mejorar", d: "Anotar cada contacto te muestra qué funciona: en qué mensaje cierras, a qué hora responden más y qué preguntas se repiten. Las preguntas repetidas van al anuncio.", l: [
          "Tasa de cierre: ventas ÷ personas que preguntaron.",
          "Las tres preguntas más comunes, contestadas en la descripción.",
          "La hora en que más responden: publica a esa hora."] },
      ],
      "Negociar tu sueldo en euros": [
        { t: "Bruto, neto y lo que te queda", d: "En Alemania el sueldo se negocia en bruto. Del bruto salen impuestos y seguridad social; como Werkstudent pagas mucho menos de seguridad social, porque mientras respetes el límite de horas solo cotizas al seguro de pensiones.", l: [
          "Pregunta siempre si la cifra es bruta por mes, bruta por año o por hora.",
          "Usa una calculadora Brutto-Netto alemana para ver tu neto.",
          "El límite de 20 horas a la semana durante el semestre es el que protege ese beneficio."] },
        { t: "Tu mejor alternativa", d: "En una negociación, tu fuerza viene de tu mejor alternativa si no hay acuerdo: otra oferta, seguir buscando, otro plan. Conocerla y mejorarla antes de negociar te da la seguridad para pedir.", l: [
          "Escribe tu alternativa real: ¿qué haces si te dicen que no?",
          "Mejórala: aplica a varios puestos a la vez.",
          "Si tu alternativa es débil, no la menciones."] },
        { t: "Más allá del sueldo", d: "Si el sueldo tiene poco margen, hay otras cosas negociables: las horas, días de trabajo remoto, presupuesto de formación, la fecha de inicio o una revisión a los seis meses.", l: [
          "Formación: cursos o certificaciones pagadas.",
          "Flexibilidad: un horario compatible con tus clases.",
          "Revisión: «¿podemos revisar el sueldo a los seis meses con estos objetivos?»."] },
      ],
      "Una oferta que se pueda comprar": [
        { t: "La ecuación de valor", d: "Alex Hormozi propone que el valor que percibe el cliente sube con el resultado que sueña y con la probabilidad de lograrlo, y baja con el tiempo de espera y el esfuerzo que le pide. Una oferta mejora si mueve cualquiera de las cuatro.", l: [
          "Resultado: qué obtiene el cliente, en sus palabras.",
          "Probabilidad: testimonios, garantía, casos.",
          "Tiempo y esfuerzo: entrega rápida y menos trabajo para el cliente."] },
        { t: "El cliente ideal", d: "Una oferta para todos no le habla a nadie. Definir al cliente ideal —quién es, qué problema tiene y cuánto le cuesta— hace que el mensaje salga solo.", l: [
          "Mira a los mejores clientes de hoy: ¿qué tienen en común?",
          "Escribe su problema con las palabras que usan ellos.",
          "Calcula cuánto les cuesta el problema: es tu referencia para el precio."] },
        { t: "Garantías que reducen el riesgo", d: "Una garantía pasa el riesgo del cliente al vendedor y aumenta las ventas cuando el producto cumple. Tiene que ser concreta y fácil de entender.", l: [
          "De resultado: «si no ____, te devolvemos ____».",
          "De tiempo: «entregado en __ días o con descuento».",
          "Solo promete lo que puedes cumplir siempre."] },
      ],
    },
    marketing: {
      "Dejar el negocio en piloto automático": [
        { t: "El calendario de contenido", d: "Un calendario de contenido define qué se publica, cuándo y para qué. Hecho una vez por trimestre, quita la pregunta diaria de qué publicar.", l: [
          "Temas fijos por semana: producto, cliente, detrás de cámaras, oferta.",
          "Las fechas importantes del año para el negocio.",
          "Un objetivo por post: mensajes, visitas o que los conozcan."] },
        { t: "Producir en lote", d: "Crear el contenido un día al mes, todo junto, es mucho más eficiente que hacerlo a diario: fotos, textos y programación en una sola sesión.", l: [
          "Un día para las fotos de todo el mes.",
          "Textos con plantillas que se reutilizan.",
          "Programa en Meta Business Suite para Facebook e Instagram."] },
        { t: "WhatsApp Business: el canal que cierra", d: "En un negocio local, muchas ventas terminan en WhatsApp. WhatsApp Business permite un catálogo, respuestas rápidas y mensajes de ausencia, sin costo.", l: [
          "Un catálogo con fotos y precios de lo principal.",
          "Respuestas rápidas para las preguntas de siempre.",
          "Etiquetas para saber quién preguntó, quién compró y a quién darle seguimiento."] },
      ],
      "Una métrica antes de gastar": [
        { t: "Métricas de vanidad y métricas que importan", d: "Seguidores y «me gusta» se ven bien pero no pagan. En un negocio local importan los mensajes, las visitas y las ventas que trae cada publicación.", l: [
          "Vanidad: seguidores, «me gusta», alcance.",
          "Importan: mensajes, llamadas, cotizaciones, ventas.",
          "Pregúntale siempre al cliente cómo los encontró."] },
        { t: "Probar antes de pagar anuncios", d: "Los anuncios amplifican lo que ya funciona; no arreglan lo que no funciona. Primero encuentra el post que trae mensajes sin pagar y luego promociónalo con poco presupuesto.", l: [
          "Promociona solo posts que ya trajeron mensajes.",
          "Empieza con un presupuesto chico al día y en una zona cercana.",
          "Mide el costo por mensaje y compáralo con lo que deja una venta."] },
        { t: "Cuánto puedes pagar por un cliente", d: "Un negocio sano sabe cuánto le deja un cliente y cuánto le cuesta conseguirlo. Si conseguirlo cuesta más de lo que deja, cada venta pierde dinero.", l: [
          "Lo que deja un cliente = margen por venta × las veces que vuelve a comprar.",
          "Costo por cliente = gasto en anuncios ÷ clientes nuevos.",
          "Regla práctica: que el cliente deje al menos tres veces lo que costó conseguirlo."] },
      ],
      "Un canal a la vez": [
        { t: "Elegir el canal por el cliente, no por la moda", d: "El mejor canal es donde los clientes ya pasan su tiempo y donde compran cosas parecidas. En un negocio local suelen ser Facebook, WhatsApp y Google Maps antes que la red de moda.", l: [
          "Pregunta a los clientes dónde buscan este tipo de servicio.",
          "Revisa dónde están los competidores que venden bien.",
          "Piensa en Google Maps: la gente busca «cerca de mí»."] },
        { t: "El perfil de empresa en Google", d: "Un perfil de empresa en Google aparece en Maps y en las búsquedas locales. Con fotos, horario, reseñas y respuestas, trae clientes sin publicar a diario.", l: [
          "Crea o reclama el perfil con la dirección exacta.",
          "Pide reseñas a los clientes contentos y contéstalas todas.",
          "Mantén al día fotos y horarios: Google favorece los perfiles activos."] },
        { t: "Una frecuencia que se pueda sostener", d: "Un canal crece con constancia, no con picos. Es mejor publicar dos veces por semana durante un año que diez veces en una semana y después nada.", l: [
          "Elige la frecuencia que tu papá pueda sostener sin ti.",
          "La semana que no se pueda, publica algo simple, no nada.",
          "Evalúa cada mes, no cada día."] },
      ],
    },
  };
  Object.keys(APRENDIZAJE).forEach(function (id) {
    ((APRENDIZAJE[id] || {}).subs || []).forEach(function (s) {
      Object.assign(s, (APRENDIZAJE_DETALLE[id] || {})[s.n] || {}, (APRENDIZAJE_PRACTICA[id] || {})[s.n] || {});
      const sub = (APRENDIZAJE_SUBTEMAS[id] || {})[s.n]; if (sub) s.subtemas = sub;
    });
  });

  /* ── LISTA DE COMPRAS ──────────────────────────────────────────────────────────────────────
     El catálogo por pasillos. Su contenido se armó a mano cruzando `RECETAS` de comida.html,
     `SKIN_DB`/`HAIR_DB` de cuidadopersonal.html y `SUPP_CATALOG` de salud.html — tres apps con
     estructuras distintas, así que no es una copia literal que se pueda leer en vivo.
     Vive aquí para que exista UN sitio donde editarlo, y para que el día que esas apps expongan
     sus catálogos se pueda derivar en vez de mantener a mano. */
  // ── LA RUTINA DE LA PIEL ─────────────────────────────────────────────────
  // Los 5 productos que Adán usa de verdad en la cara. Estaban escritos a mano en dos sitios que
  // NO coincidían: `RUTINA_TASKS` decía La Roche-Posay Anthelios y la guía de Skincare
  // recomendaba Isdin; `RUTINA_TASKS` aplica el Differin las 7 noches y la guía mandaba
  // alternarlo con un BHA que él no usa en ninguna parte. Aquí hay una sola versión, y el
  // control 12 de verificar-sincronia.js comprueba que cada nombre siga apareciendo en
  // `RUTINA_TASKS`, que es donde se ejecuta la rutina.
  //
  // Un producto por necesidad, sin alternativas — la misma regla que ya tenía `cabello`
  // (2026-08-18, "no me des alternativas, por que si no al final no comprare nada").
  //
  // `contenido` y `dosisDia` van en la MISMA unidad. De ahí salen SOLOS los días que dura un
  // bote y el costo mensual: no se escriben a mano. Los `precio` son de REFERENCIA (farmacia y
  // Amazon MX, septiembre 2026) y las dosis son las correctas, no las que se usan por costumbre
  // — por eso el protector solar sale caro: dos dedos diarios vacían un bote de 50 ml en 40
  // días. Poner menos es lo que convierte un SPF50 en un SPF15.
  // Cada producto trae una `ficha`: lo que es y lo que hace. Hasta el 2026-09-02
  // eso no estaba escrito en ninguna parte — la rutina solo decía CÓMO aplicarlo,
  // nunca QUÉ era ni POR QUÉ servía. El "cómo se aplica" sigue viviendo en
  // `am.uso`/`pm.uso`/`extra.uso` y la ficha lo lee de ahí, no lo repite.
  //   activo  el ingrediente que hace el trabajo
  //   que     qué es el producto, en una línea
  //   hace    qué le pasa a la piel, sin jerga
  //   sirve   para qué le sirve a Adán en concreto
  //   tarda   cuándo se nota, para no abandonarlo antes de tiempo
  //   ojo     el error que arruina el producto
  //   frasco  forma del envase, para dibujarlo (bomba/gotero/tubo/tarro/bote...)
  //   marca   los dos colores del envase real
  //   foto    SOLO si existe foto del producto EXACTO con licencia libre. Cuatro de
  //           los seis no la tienen en ninguna base abierta: esos se dibujan.
  const RUTINA_PIEL = {
    productos: [
      { id:'limpiador', cat:'Limpiador', n:'CeraVe Limpiador Espumoso (verde)',
        contenido:236, unidad:'ml', dosisDia:3, precio:260, tono:'ok',
        ayuda:['acne','sensibilidad'],
        frasco:'bomba', marca:{a:'#f2f4f6', b:'#00a94f'},
        foto:'https://images.openbeautyfacts.org/images/products/360/600/053/7194/front_en.4.full.jpg',
        ficha:{
          activo:'Ceramidas + \u00e1cido hialur\u00f3nico, con tensioactivos suaves',
          que:'El gel limpiador de diario. La versi\u00f3n verde es la de piel grasa; la azul es para piel seca y no es la tuya.',
          hace:'Arrastra grasa, sudor y protector solar sin quitarle a la piel su propia barrera. Las ceramidas son el cemento que mantiene unidas las c\u00e9lulas de la superficie: casi todos los jabones se lo llevan, y \u00e9ste lo repone mientras limpia.',
          sirve:'Es el primer paso de las dos rutinas. Todo lo dem\u00e1s \u2014 s\u00e9rum, retinoide, hidratante \u2014 entra mejor en una piel limpia, y ninguno funciona sobre una capa de protector solar del d\u00eda anterior.',
          tarda:'Desde el primer d\u00eda: la diferencia es que la cara no queda jalada al secarse.',
          ojo:'Agua tibia, nunca caliente. El agua caliente disuelve los l\u00edpidos que este limpiador acaba de reponer.'
        },
        am:{ orden:1, min:1, uso:'Masajea sobre piel húmeda 30-60 seg y enjuaga con agua tibia, nunca caliente. Quita la grasa y el sudor de la noche sin dejar la piel jalada.' },
        pm:{ orden:1, min:1, esperaDespues:20,
             esperaTxt:'Sécate del todo y espera',
             uso:'<b>Una sola pasada de 60 segundos</b>, masajeando sobre piel húmeda con agua tibia: alcanza para quitar el protector solar y el sudor del día. Dos pasadas seguidas de un limpiador espumoso resecan y, con el adapaleno encima, irritan.' } },

      { id:'niacinamida', cat:'Sérum', n:'The Ordinary Niacinamida 10% + Zinc 1%',
        contenido:30, unidad:'ml', dosisDia:0.15, precio:230, tono:'teal',
        ayuda:['acne','manchas'],
        frasco:'gotero', marca:{a:'#e9e4d8', b:'#1c1c1c'},
        ficha:{
          activo:'Niacinamida (vitamina B3) al 10% + zinc PCA al 1%',
          que:'Un s\u00e9rum acuoso, de los m\u00e1s baratos que existen con evidencia real detr\u00e1s.',
          hace:'La niacinamida le baja el ritmo a las gl\u00e1ndulas que producen grasa y frena el paso del pigmento a la superficie de la piel. El zinc acompa\u00f1a calmando. El resultado es menos brillo a media tarde, poro menos abierto y marcas viejas que se van aclarando.',
          sirve:'Es tu producto para las marcas que deja el acn\u00e9 \u2014 esas manchas caf\u00e9s que quedan despu\u00e9s, no el grano. Y le quita a la cara el brillo del mediod\u00eda, que en piel grasa se nota a las pocas horas del protector.',
          tarda:'El brillo, en 2 semanas. Las manchas, entre 8 y 12 semanas.',
          ojo:'Es de los pocos activos que se lleva bien con todo, retinoide incluido. No hace falta separarlo de nada ni dejar d\u00edas de por medio.'
        },
        am:{ orden:2, min:1,
             uso:'2-3 gotas sobre piel seca, antes del protector. Controla la grasa del día, afina poros y ayuda a desvanecer marcas — y es compatible con todo lo demás, incluido el retinoide.' } },

      { id:'spf', cat:'Protector solar', n:'La Roche-Posay Anthelios Oil Free SPF50',
        contenido:50, unidad:'ml', dosisDia:1.25, precio:520, tono:'am',
        recorte:{ n:'Neutrogena Ultra Sheer FPS 50+ (88 ml)', precio:295, contenido:88, fuente:'Amazon MX, oct 2026', txt:'El mismo FPS 50 de amplio espectro, con acabado seco. El protector no se deja: se cambia de marca.' },
        ayuda:['manchas','arrugas'], clave:true,
        frasco:'tubo', marca:{a:'#ffffff', b:'#0f5fa6'},
        ficha:{
          activo:'Filtros UVA/UVB de amplio espectro, base oil free',
          que:'El protector solar diario, en textura fluida y sin aceites \u2014 la que no deja la cara grasosa ni tapa el poro.',
          hace:'Intercepta la radiaci\u00f3n antes de que llegue a da\u00f1ar las c\u00e9lulas. El UVB es el que quema; el UVA atraviesa nubes y ventanas y es el que envejece la piel y oscurece las manchas.',
          sirve:'Es el \u00fanico producto de la lista que <b>previene</b> en vez de reparar. Sin \u00e9l, la niacinamida est\u00e1 aclarando manchas que el sol vuelve a oscurecer cada ma\u00f1ana, y el retinoide trabaja sobre una piel a la que se le sigue haciendo da\u00f1o.',
          tarda:'No se ve nada a corto plazo. Se ve a los 10 a\u00f1os, comparando con quien no lo us\u00f3.',
          ojo:'Es el producto m\u00e1s caro por mes de todos, y es el que m\u00e1s se justifica. Si el presupuesto aprieta, se recorta cualquier otro antes que \u00e9ste.'
        },
        am:{ orden:3, min:2,
             uso:'<b>Dos dedos completos</b> para cara y cuello. Casi todo el mundo se pone un tercio de lo que debe, y eso convierte un SPF50 en un SPF15 — es el error más caro de la rutina. Todos los días, nublado incluido.' } },

      { id:'retinoide', cat:'Retinoide', n:'Differin Adapaleno 0.1% Gel',
        foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Adapalene_Gel_%28Differin%29_in_China.jpg/960px-Adapalene_Gel_%28Differin%29_in_China.jpg',
        contenido:45, unidad:'g', dosisDia:0.25, precio:430, tono:'pink',
        ayuda:['acne','arrugas','manchas'], clave:true,
        frasco:'tubo', marca:{a:'#ffffff', b:'#00a3c4'},
        ficha:{
          activo:'Adapaleno al 0.1%, un retinoide de tercera generaci\u00f3n',
          que:'Un gel de receta que en M\u00e9xico se vende sin ella. Es el retinoide m\u00e1s potente que puedes comprar en mostrador.',
          hace:'Acelera la renovaci\u00f3n de la piel y evita que las c\u00e9lulas muertas se queden pegadas tapando el poro \u2014 que es como empieza un grano, antes de que se vea. Al mismo tiempo estimula col\u00e1geno, que es lo que sostiene la piel por debajo.',
          sirve:'Es el \u00fanico de la lista que ataca las tres cosas a la vez: acn\u00e9, arrugas y manchas. Si tuvieras que quedarte con un solo activo, es \u00e9ste.',
          tarda:'Las primeras 4 semanas la piel empeora \u2014 se llama purga y es normal, est\u00e1 sacando lo que ya estaba abajo. La mejora se ve entre la semana 8 y la 12. Casi todo el mundo lo abandona en la semana 3, justo antes de que empiece a servir.',
          ojo:'Piel completamente seca y un ch\u00edcharo para toda la cara. M\u00e1s cantidad no acelera nada: solo irrita, y una piel irritada obliga a suspenderlo.'
        },
        pm:{ orden:2, min:1,
             uso:'Un <b>chícharo</b> para toda la cara, sobre piel <b>completamente seca</b>. Con la piel húmeda penetra de más y ahí empieza la irritación. Deja un dedo de margen alrededor del ojo: es la piel más delgada del cuerpo. Es el activo de mostrador con más evidencia — trata acné, previene arrugas y ayuda con manchas, los tres a la vez. Si te arde o se te pela, ponlo <b>noche sí y noche no</b> hasta que se calme, sin dejarlo, y luego vuelve a diario.' } },

      // La crema de noche va encima del adapaleno: sin perfume, sin aceites pesados y sin otro «retinol». La
      // Eucerin Hyaluron-Filler que estaba aquí lleva perfume, manteca de karité y bakuchiol, y no se vende en
      // México con ese nombre (Adán, 2026-10-10: "no estoy seguro que los productos estén bien, revísalos").
      { id:'hidratantePM', cat:'Hidratante', n:'CeraVe Loción Hidratante Facial PM',
        contenido:52, unidad:'ml', dosisDia:0.5, precio:300, tono:'pm',
        ayuda:['sensibilidad','acne'],
        frasco:'bomba', marca:{a:'#f3f7fb', b:'#1d5fae'},
        ficha:{
          activo:'Ceramidas, niacinamida y ácido hialurónico, sin perfume ni aceite',
          que:'La crema de noche: una loción ligera de CeraVe, la misma marca de tu limpiador, hecha para no tapar poros.',
          hace:'Repone las ceramidas que se llevan la limpieza y el adapaleno, y la niacinamida calma el enrojecimiento. Hidrata sin dejar la cara grasa.',
          sirve:'Es lo que te deja usar el adapaleno todas las noches sin que la cara se pele: el adapaleno reseca, y esta capa lo compensa.',
          tarda:'Desde la primera noche: la piel amanece menos tirante.',
          ojo:'Dos o tres bombeos para cara y cuello, encima del adapaleno y sin esperar. Una crema con perfume, aceites pesados u otro «retinol» —como el bakuchiol— encima del adapaleno es lo que más irrita y tapa poros en piel grasa: por eso salió la Eucerin.'
        },
        pm:{ orden:3, min:1,
             uso:'Encima del adapaleno, sin esperar: <b>dos o tres bombeos</b> para cara y cuello. Amortigua la irritación sin engrasar la piel.' } },

      // No está en `RUTINA_TASKS`: no forma parte de su semana, se compra y se usa si quiere.
      { id:'mascarilla', cat:'Mascarilla', n:'Aztec Secret Indian Healing Clay',
        contenido:454, unidad:'g', dosisDia:2.6, precio:290, tono:'mint',
        ayuda:['acne'], opcional:true,
        frasco:'bote', marca:{a:'#e8e2d4', b:'#c0392b'},
        foto:'https://images.openbeautyfacts.org/images/products/000/000/000/1277/front_en.10.full.jpg',
        ficha:{
          activo:'Arcilla bentonita de calcio, 100% y sin nada m\u00e1s',
          que:'Un bote de polvo que t\u00fa mezclas. Medio kilo dura a\u00f1os, y por eso sale a unos pocos pesos por uso.',
          hace:'La bentonita tiene carga el\u00e9ctrica: al humedecerse atrae y se lleva la grasa y la suciedad del poro. Al secarse tensa \u2014 esa sensaci\u00f3n de que la cara late es normal.',
          sirve:'Para la zona T cuando la notes cargada. Es un extra, no forma parte de tu semana: el trabajo de fondo lo hacen el retinoide y la niacinamida.',
          tarda:'Se ve al enjuagar, el mismo d\u00eda. No deja nada a largo plazo.',
          ojo:'Una vez por semana como mucho. Con adapaleno cada noche, dos veces reseca de m\u00e1s y te obliga a parar el retinoide, que es el que de verdad importa.'
        },
        extra:{ uso:'Mezcla con agua hasta pasta, 10-15 min, 1 vez por semana. Controla grasa y afina poros, pero reseca si te pasas — y con el adapaleno cada noche, más de una vez por semana es sobra.' } },
    ],

    // Los pasos de una rutina, ya ordenados. `momento` es 'am' o 'pm'.
    pasos: function (momento) {
      return this.productos
        .filter(function (p) { return p[momento]; })
        .map(function (p) {
          var d = p[momento];
          return {
            id: p.id, n: p.n, cat: d.etiqueta || p.cat, uso: d.uso, min: d.min,
            orden: d.orden, ayuda: p.ayuda, clave: p.clave, tono: p.tono,
            esperaDespues: d.esperaDespues || 0, esperaTxt: d.esperaTxt || '',
          };
        })
        .sort(function (a, b) { return a.orden - b.orden; });
    },

    // El renglón tal como sale en la lista de la compra. Se escribe aquí una sola vez
    // para que `deTextoCompra` pueda deshacerlo y el dashboard sepa qué producto abrir.
    textoCompra: function (p) {
      return p.cat + ' — ' + p.n + (p.opcional ? ' (opcional)' : '');
    },
    deTextoCompra: function (txt) {
      var t = this;
      return this.productos.filter(function (p) { return t.textoCompra(p) === txt; })[0] || null;
    },

    // Cuánto dura un bote con la dosis correcta, y lo que sale al mes. Derivados: si cambia el
    // precio o el tamaño, el botíquin y el total se enteran solos.
    duracionDias: function (p) { return Math.round(p.contenido / p.dosisDia); },
    costoMes: function (p) { return Math.round(p.precio / (p.contenido / p.dosisDia) * 30); },
    get costoMesTotal() {
      var t = this;
      return this.productos.filter(function (p) { return !p.opcional; })
        .reduce(function (a, p) { return a + t.costoMes(p); }, 0);
    },
    get minutosAM() { return this.pasos('am').reduce(function (a, p) { return a + p.min; }, 0); },
    get minutosPM() { return this.pasos('pm').reduce(function (a, p) { return a + p.min; }, 0); },
    // Los minutos de espera entre pasos no son trabajo, pero sí alargan la rutina.
    get esperaPM() { return this.pasos('pm').reduce(function (a, p) { return a + p.esperaDespues; }, 0); },
  };

  // ── LA RUTINA DEL CABELLO ──────────────────────────────────────────────
  // Lo mismo que `RUTINA_PIEL`, para el pelo. Antes vivía en un `HAIR_DB` dentro de
  // cuidadopersonal.html que filtraba por grosor y presupuesto y que aún ofrecía
  // ALTERNATIVAS (Pantene, Kérastase, Elvive Aceite Extraordinario) pese a la petición del
  // 2026-08-18: "no me des alternativas, por que si no al final no comprare nada". Hoy no
  // salían porque Elvive gana el orden, pero bastaba tocar el perfil para que la lista de la
  // compra nombrara una marca y la rutina diaria otra.
  //
  // `dias` es 0=domingo…6=sábado, y ES la fuente de la semana de lavado: la vista de Cabello
  // no escribe "lunes y jueves" en ningún sitio, lo lee de aquí.
  //
  // Duración y costo son DERIVADOS de `contenido`, `porUso` y los días de uso. Los `precio`
  // son de referencia (farmacia y Amazon MX, septiembre 2026) y se editan aquí.
  // El precio del Avodart pasó de 1500 a 1560 el 1-sep-2026: ya no es una referencia, es lo que
  // Adán pagó de verdad esa vez (queda como gasto en Finanzas, transacción s069). Sube con él
  // el `costoMesTotal` del pelo, porque ese bote dura exactamente un mes.
  const RUTINA_PELO = {
    productos: [
      { id:'minoxidil', cat:'Tratamiento anticaída', n:'Minoxidil 5% NR-11 (Polaris Research)',
        frasco:'bomba', marca:{a:'#f2f4f6', b:'#1a3a6b'},
        ficha:{
          activo:'Minoxidil al 5%, en solución con atomizador',
          que:'El tratamiento tópico de la caída. La NR-11 de Polaris es minoxidil al 5 % en solución con atomizador: la misma concentración que la Kirkland que usabas antes, no una más fuerte.',
          hace:'Ensancha los vasos que riegan el fol\u00edculo y alarga la fase en la que el pelo crece. No mata la causa \u2014eso lo hace la dutasterida\u2014 pero sostiene con vida fol\u00edculos que iban camino de cerrarse.',
          sirve:'Es la mitad de fuera de tu tratamiento: la dutasterida ataca la hormona por dentro y el minoxidil mantiene despierto al fol\u00edculo por arriba. Juntos hacen bastante m\u00e1s que cualquiera solo.',
          tarda:'Las primeras 6-8 semanas se cae M\u00c1S pelo. Es el shedding y es buena se\u00f1al: los fol\u00edculos est\u00e1n soltando el pelo viejo para arrancar uno nuevo. Resultados reales a los 4-6 meses, y el m\u00e1ximo al a\u00f1o.',
          ojo:'El d\u00eda que lo dejes, en 3-4 meses vuelves al punto de partida. No es un tratamiento con final: mientras lo quieras conservar, va todos los d\u00edas.'
        },
        contenido:60, unidad:'ml', porUso:1, vecesDia:2, dias:[0,1,2,3,4,5,6], precio:900,
        recorte:{ n:'Kirkland Minoxidil 5% (6 frascos de 60 ml)', precio:2499, contenido:360, fuente:'Sears MX, oct 2026', txt:'El mismo minoxidil al 5 % en solución —la NR-11 no es más concentrada— a menos de la mitad por mililitro, con la misma dosis: 1 ml dos veces al día. Cambiar de marca no es cambiar de dosis.' },
        tono:'am', clave:true, momento:'seco',
        uso:'<b>5 atomizaciones (1 ml)</b> directo en el <b>cuero cabelludo</b> seco — no en el pelo— y repártelo con los dedos. Masajea 30 segundos y lávate las manos. Es <b>loción, no espuma</b>: sí lleva propilenglicol, así que si te pica o te reseca, baja a una dosis al día antes de abandonarlo. De noche, espera al menos 30 minutos antes de acostarte, para que no se quede en la almohada.' },

      { id:'avodart', cat:'Tratamiento por dentro', n:'Avodart (dutasterida 0,5 mg)',
        frasco:'caja', marca:{a:'#f7f8fa', b:'#b02a37'},
        ficha:{
          activo:'Dutasterida 0,5 mg, un inhibidor de la 5-alfa-reductasa',
          que:'Una c\u00e1psula diaria. Es el escal\u00f3n m\u00e1s fuerte del tratamiento por dentro: bloquea las dos enzimas que fabrican DHT, mientras que la finasterida s\u00f3lo bloquea una.',
          hace:'Corta la producci\u00f3n de DHT hasta en un 90%. La DHT es la hormona que va encogiendo el fol\u00edculo generaci\u00f3n tras generaci\u00f3n hasta que ya no produce pelo visible. Sin ella, el proceso se frena.',
          sirve:'Es lo \u00fanico de tu rutina que ataca la CAUSA. El minoxidil, el Pilexil y todo lo dem\u00e1s sostienen lo que hay; esto detiene lo que lo est\u00e1 destruyendo.',
          tarda:'Frena la ca\u00edda en 3-4 meses. La recuperaci\u00f3n visible, entre 6 y 12. Un a\u00f1o antes de juzgarlo.',
          ojo:'Es un tratamiento de a\u00f1os, no de meses. Dejarlo un trimestre y retomar no reanuda donde ibas: lo que el fol\u00edculo pierde en la pausa no se recupera despu\u00e9s. Lo m\u00e9dico \u2014receta, PSA, efectos\u2014 est\u00e1 abajo, en Antes de empezar.'
        },
        contenido:30, unidad:'cáps', porUso:1, vecesDia:1, dias:[0,1,2,3,4,5,6], precio:1560,
        recorte:{ n:'Zivata (dutasterida 0.5 mg, genérico)', precio:703, contenido:30, medico:true, fuente:'Benavides, oct 2026', txt:'La misma molécula y la misma dosis. El cambio lo autoriza tu dermatólogo.' },
        tono:'warn', clave:true, momento:'oral', receta:true,
        uso:'<b>Una cápsula al día</b>, con o sin comida, siempre a la misma hora. Actúa <b>por dentro</b> bloqueando la DHT, que es la hormona que encoge el folículo: no sustituye al minoxidil \u2014 uno frena la caída y el otro empuja el crecimiento. Tarda <b>3 a 6 meses</b> en verse, igual que el minoxidil.',
        aviso:'Es <b>medicamento de receta</b> y para la caída se usa fuera de indicación. Dos cosas que tienes que saber: <b>parte tu PSA a la mitad</b> \u2014 mídelo y dile a quien lo interprete que la tomas \u2014 y si aparecen efectos sexuales o bulto/dolor en el pecho, es motivo de consulta, no de aguantarse. Llévala con un médico, no en solitario.' },

      { id:'pilexil', cat:'Champú anticaída', n:'Pilexil Anticaída 300 ml',
        foto:'https://images.openbeautyfacts.org/images/products/847/000/174/8768/front_es.6.full.jpg',
        frasco:'botella', marca:{a:'#f4f6f8', b:'#e8590c'},
        ficha:{
          activo:'Complejo antica\u00edda con amino\u00e1cidos azufrados y vitaminas del grupo B',
          que:'Un champ\u00fa de tratamiento, no de mantenimiento. Por eso son s\u00f3lo dos d\u00edas a la semana y no todos.',
          hace:'Limpia el cuero cabelludo de sebo y c\u00e9lulas muertas \u2014lo que tapa el fol\u00edculo\u2014 y deja actuar sus activos los minutos que lo tienes puesto. Es apoyo, no el motor del tratamiento.',
          sirve:'Prepara el terreno para el minoxidil: sobre un cuero cabelludo sucio o con exceso de grasa, la loci\u00f3n penetra peor.',
          tarda:'El cuero cabelludo se siente distinto en 2-3 semanas. En la ca\u00edda, su aporte es modesto y se mide en meses.',
          ojo:'No sustituye al minoxidil ni a la dutasterida. Un champ\u00fa est\u00e1 en contacto con la piel dos minutos: por bueno que sea, no puede hacer el trabajo de un tratamiento que se queda puesto.'
        },
        contenido:300, unidad:'ml', porUso:12, dias:[1,4], precio:450, tono:'am', champu:true,
        uso:'Solo en el <b>cuero cabelludo</b>, nunca en el largo. Masajea <b>2 minutos con las yemas</b> — no con las uñas — y enjuaga: lo que escurre ya limpia el resto del pelo.' },

      { id:'cerave', cat:'Champú suave', n:'CeraVe Champú Hidratante sin sulfatos',
        foto:'https://images.openbeautyfacts.org/images/products/360/600/060/7019/front_en.3.full.jpg',
        frasco:'botella', marca:{a:'#f2f4f6', b:'#0d6ebf'},
        ficha:{
          activo:'Tensioactivos suaves, sin sulfatos, con ceramidas',
          que:'Tu champú suave: el del sábado, el día de reparación. Los otros dos —Pilexil y Darrow— son tratamiento y van sólo sus días.',
          hace:'Limpia sin sulfatos, que son los detergentes agresivos que dejan el cuero cabelludo tirante y disparan el rebote de grasa. Menos irritaci\u00f3n abajo es mejor terreno para el fol\u00edculo.',
          sirve:'Es lo que usas los d\u00edas que no tocan medicados. Sin \u00e9l acabar\u00edas lav\u00e1ndote con champ\u00fa de tratamiento a diario, que reseca, o no lav\u00e1ndote, que tapa el poro.',
          tarda:'Desde el primer lavado: el cuero cabelludo deja de picar y de engrasarse tan r\u00e1pido.',
          ojo:'Es limpieza, no tratamiento. No aporta nada contra la ca\u00edda y no pretende hacerlo.'
        },
        contenido:355, unidad:'ml', porUso:15, dias:[6], precio:300,
        tono:'agua', champu:true,
        uso:'Tu lavado suave: limpia sin arrastrar los aceites naturales. Los champús medicados son TRATAMIENTO, no mantenimiento.' },

      { id:'darrow', cat:'Champú medicado', n:'Darrow Doctar (alquitrán)',
        frasco:'botella', marca:{a:'#f4f6f8', b:'#5a3e2b'},
        ficha:{
          activo:'Alquitr\u00e1n de hulla (coaltar)',
          que:'Un champ\u00fa medicado de verdad, de los de farmacia. Es para cuando hay descamaci\u00f3n o placas, no para uso continuo.',
          hace:'El alquitr\u00e1n frena la velocidad a la que se reproducen las c\u00e9lulas de la piel del cuero cabelludo. Esa reproducci\u00f3n acelerada es exactamente lo que produce la caspa gruesa y las placas.',
          sirve:'Para los brotes de descamaci\u00f3n. Un cuero cabelludo inflamado y descamado empeora la ca\u00edda, as\u00ed que apagarlo protege tambi\u00e9n el tratamiento.',
          tarda:'La descamaci\u00f3n cede en 1-2 semanas de uso.',
          ojo:'Ese d\u00eda sustituye al Pilexil, nunca se suman: dos champ\u00fas medicados seguidos resecan el cuero cabelludo y consiguen justo lo contrario. Y ti\u00f1e las toallas claras.'
        },
        contenido:200, unidad:'ml', porUso:12, dias:[], usosSemana:0, precio:350, tono:'warn',
        champu:true, soloSi:'caspa activa',
        uso:'Masajea el cuero 2-3 minutos y deja actuar antes de enjuagar. <b>Sustituye</b> al Pilexil ese día, nunca se suma.' },

      { id:'acondicionador', cat:'Acondicionador', n:"L'Oréal Elvive Reparación Total 5",
        frasco:'botella', marca:{a:'#f4f6f8', b:'#8b1a3a'},
        ficha:{
          activo:'Ceramidas y siliconas de aclarado',
          que:'El acondicionador de diario, para el largo del pelo. No tiene nada que ver con la ca\u00edda: esto es cosm\u00e9tica del tallo.',
          hace:'Cierra la cut\u00edcula, que son las escamas que recubren el pelo y que el lavado levanta. Cerradas, el pelo refleja la luz y no se engancha consigo mismo.',
          sirve:'Para que el pelo que conservas se vea y se sienta mejor. El tratamiento se ocupa de que haya pelo; esto, de que el que hay luzca.',
          tarda:'Desde el primer uso: se nota al peinar.',
          ojo:'Nunca en la ra\u00edz. Tu pelo es fino y graso: en la ra\u00edz aplana el volumen y adelanta el momento en que se ve sucio.'
        },
        contenido:680, unidad:'ml', porUso:15, dias:[0,1,2,3,4,5], precio:120, tono:'ok',
        momento:'ducha',
        uso:'<b>Solo de medios a puntas</b>, nunca en la raíz: en cabello fino y graso, la raíz se aplana y se engrasa antes. Espera 1-2 minutos y enjuaga con agua fresca — ese minuto es lo que hace que sirva de algo.' },

      { id:'mascarilla', cat:'Mascarilla', n:"Mascarilla L'Oréal Elvive Total Repair 5",
        frasco:'tarro', marca:{a:'#f6f7f9', b:'#8b1a3a'},
        ficha:{
          activo:'Ceramidas en concentraci\u00f3n alta, base m\u00e1s densa que el acondicionador',
          que:'El acondicionador en versi\u00f3n concentrada. Viene en tarro, no en botella, porque la textura es mucho m\u00e1s espesa.',
          hace:'Lo mismo que el acondicionador pero con m\u00e1s carga y m\u00e1s tiempo de contacto, as\u00ed que llega m\u00e1s adentro del tallo en vez de quedarse s\u00f3lo en la superficie.',
          sirve:'Para el d\u00eda de la semana en que el pelo lo necesita m\u00e1s: despu\u00e9s del champ\u00fa medicado, o cuando lo notas seco de puntas.',
          tarda:'Ese mismo d\u00eda, y el efecto dura 2-3 lavados.',
          ojo:'Sustituye al acondicionador ese d\u00eda, no se pone encima. Los dos juntos apelmazan el cabello fino y lo dejan sin cuerpo.'
        },
        contenido:300, unidad:'ml', porUso:20, dias:[6], precio:130, tono:'oro', momento:'ducha',
        uso:'De medios a puntas, <b>5 minutos</b> mientras terminas de bañarte. Ese día <b>sustituye al acondicionador</b>: ponerle los dos apelmaza el cabello fino. Viene en TARRO, no en botella — es un acondicionador mucho más concentrado.' },

      // 2026-09-02: fuera la crema sin enjuague (L'Oréal Elvive Total Repair 5, 200 ml, id
      // 'sinEnjuague'). Adán: "de lista de compras quita: Crema sin enjuague L'Oréal Elvive
      // Total Repair 5, 200 ml (todos los días)" y, preguntado si la seguía usando, "fuera de
      // todo: ya no la uso". De la compra salió por derivación — `LISTA_COMPRAS.cabello` es un
      // getter sobre esta lista — y con ella se fueron sus 5 menciones en RUTINA_TASKS (wd02c,
      // wd02cb y do045b, que eran solo suyas; sa05d y wd09c, que compartía con otro producto).
      // Era el único con momento:'humedo', así que ese paso de la rutina de Cuidado Personal
      // queda con toalla, peine y secado — el render ya filtraba nulos, no hubo que tocarlo.

      { id:'aceite', cat:'Aceite de puntas', n:'Moroccanoil Treatment Light',
        frasco:'gotero', marca:{a:'#f5f0e3', b:'#0e4f4f'},
        ficha:{
          activo:'Aceite de arg\u00e1n con siliconas ligeras',
          que:'Un aceite de acabado, para las puntas. La versi\u00f3n Light es la que corresponde a cabello fino; la normal pesar\u00eda demasiado.',
          hace:'Sella la punta del pelo, que es la parte m\u00e1s vieja y m\u00e1s da\u00f1ada: por ah\u00ed se abre y se rompe. El aceite tapa esa apertura y devuelve brillo.',
          sirve:'Para el d\u00eda que lo notes rasposo o encrespado. Es un extra de acabado, no forma parte del tratamiento.',
          tarda:'Inmediato, y s\u00f3lo mientras est\u00e9 puesto. No cambia el pelo, cambia c\u00f3mo se ve hoy.',
          ojo:'Dos gotas y s\u00f3lo en puntas. Es el producto m\u00e1s f\u00e1cil de pasarse: con tres el pelo fino queda grasoso todo el d\u00eda y no se arregla sin lavarlo.'
        },
        contenido:100, unidad:'ml', porUso:0.5, dias:[], usosSemana:2, precio:900, tono:'gris',
        momento:'seco',
        uso:'<b>2 gotas solo en las puntas</b>, con el pelo ya seco. No es diario: es para el día que lo notes rasposo. En raíz no va nunca y de más engrasa.' },

      { id:'funda', cat:'Funda de almohada', n:'Funda de almohada de satín',
        frasco:'tela', marca:{a:'#eef1f6', b:'#7a5ea8'},
        ficha:{
          activo:'Sat\u00edn \u2014 la clave es el tejido, no la fibra',
          que:'Una funda de almohada de sat\u00edn en vez de algod\u00f3n. Es lo m\u00e1s barato de toda tu rutina y de lo poco que trabaja mientras duermes.',
          hace:'El algod\u00f3n tiene una superficie rugosa que agarra el pelo y absorbe la humedad; el sat\u00edn es liso y no lo hace. Siete horas de cabeza girando sobre algod\u00f3n son siete horas de fricci\u00f3n sobre pelo que ya est\u00e1 fr\u00e1gil.',
          sirve:'Menos pelo partido por la ma\u00f1ana y menos encrespado. Tambi\u00e9n le hace bien a la cara: el algod\u00f3n marca l\u00edneas de almohada y absorbe la crema de noche.',
          tarda:'Se nota en un par de semanas, sobre todo en c\u00f3mo amanece el pelo.',
          ojo:'L\u00e1vala cada semana como cualquier funda. El sat\u00edn es liso, no antibacteriano, y ah\u00ed duerme una cara con retinoide.'
        },
        contenido:1, unidad:'pza', porUso:0, dias:[], usosSemana:0, precio:250, tono:'gris',
        momento:'noche', noConsumible:true,
        uso:'Menos fricción durante las 7 horas que pasas con la cara contra la almohada. Es lo más barato que puedes hacer por tu pelo.' },
    ],

    // El renglón tal como sale en la lista de la compra. Se escribe aquí una sola vez
    // para que `deTextoCompra` pueda deshacerlo y el dashboard sepa qué producto abrir.
    diasTexto: function (p) {
      const D = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
      if (p.soloSi) return 'solo si hay ' + p.soloSi + ', nunca junto al Pilexil';
      if (p.noConsumible) return null;
      if (!p.dias.length) return 'cuando lo notes áspero, solo puntas';
      if (p.dias.length === 7) return 'todos los días' + (p.vecesDia > 1 ? ', ' + p.vecesDia + ' veces' : '');
      const n = p.dias.map(function (d) { return D[d]; });
      return n.slice(0, -1).join(', ') + (n.length > 1 ? ' y ' : '') + n[n.length - 1];
    },
    textoCompra: function (p) {
      const c = this.diasTexto(p);
      return p.n + ', ' + p.contenido + ' ' + p.unidad + (c ? ' (' + c + ')' : '');
    },
    deTextoCompra: function (txt) {
      var t = this;
      return this.productos.filter(function (p) { return t.textoCompra(p) === txt; })[0] || null;
    },

    // Cuántas veces se usa a la semana. De aquí sale todo lo demás.
    usosSemana: function (p) {
      return p.usosSemana != null ? p.usosSemana : p.dias.length * (p.vecesDia || 1);
    },
    duracionDias: function (p) {
      const u = this.usosSemana(p);
      if (!u || !p.porUso) return null;                 // no consumible o solo si hace falta
      return Math.round(p.contenido / (u * p.porUso / 7));
    },
    costoMes: function (p) {
      const d = this.duracionDias(p);
      return d ? Math.round(p.precio / d * 30) : 0;
    },
    get costoMesTotal() {
      var t = this;
      return this.productos.reduce(function (a, p) { return a + t.costoMes(p); }, 0);
    },

    // Qué toca un día concreto (0=domingo). El único sitio donde vive la semana de lavado.
    dia: function (dow) {
      var t = this;
      const champu = this.productos.find(function (p) { return p.champu && p.dias.indexOf(dow) !== -1; }) || null;
      const cond = champu ? (champu.diasCondicionales || []).indexOf(dow) !== -1 : false;
      return {
        champu: champu,
        condicional: cond,
        nota: champu && champu.notaDia ? (champu.notaDia[dow] || '') : '',
        mascarilla: this.productos.some(function (p) { return p.id === 'mascarilla' && p.dias.indexOf(dow) !== -1; }),
        acondicionador: this.productos.some(function (p) { return p.id === 'acondicionador' && p.dias.indexOf(dow) !== -1; }),
        dosisMinoxidil: (this.productos.find(function (p) { return p.id === 'minoxidil'; }) || {}).vecesDia || 0,
      };
    },
    // Los productos de un momento del día, en el orden en que se usan.
    delMomento: function (m, dow) {
      return this.productos.filter(function (p) {
        return p.momento === m && (!p.dias.length || p.dias.indexOf(dow) !== -1);
      });
    },
  };

  // ── LOS SUPLEMENTOS ──────────────────────────────────────────────────────
  // Los 6 que Adán toma de verdad. Estaban escritos a mano en TRES sitios: las subtareas de
  // `RUTINA_TASKS`, la lista de `LISTA_COMPRAS.suplementos` y el catálogo de `salud.html`.
  // Coincidían de casualidad, y además salud.html arrancaba con "Mi lista: 0" y pedía darlos
  // de alta a mano — datos que el proyecto ya tenía.
  //
  // `momento` es 'am' o 'pm'. `usosSemana` sale de `porDia * 7` salvo que se escriba: la whey
  // solo se toma los días que la comida no llega a la meta de proteína.
  // Duración y costo son DERIVADOS; los `precio` son de referencia (Amazon MX, sep 2026).
  const SUPLEMENTOS = {
    lista: [
      { id:'d3', n:'Vitamina D3', dosis:'2000-4000 UI', momento:'am', cuando:'con algo de grasa',
        foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Softgels.jpg/960px-Softgels.jpg',
        frasco:'pastillas', marca:{a:'#ffffff', b:'#e8a317'},
        ficha:{
          activo:'Colecalciferol (vitamina D3), la misma forma que fabrica la piel con el sol',
          que:'Una c\u00e1psula peque\u00f1a de aceite. No es una vitamina cualquiera: el cuerpo la trata como una hormona.',
          hace:'Regula la absorci\u00f3n de calcio y participa en la producci\u00f3n de testosterona. Tu piel la fabrica con luz solar directa, pero entre la oficina y el coche puedes pasar semanas sin exposici\u00f3n real.',
          tarda:'Los niveles en sangre suben en 6-8 semanas. Lo que sientas antes de eso es sugesti\u00f3n.'
        },
        envase:120, unidad:'cápsulas', porDia:1, precio:220, tono:'gris',
        porQue:'Soporte hormonal — incluida la testosterona — y salud ósea. La deficiencia es muy común si te da poco sol, y tú pasas el día dentro.',
        ojo:'Es el único de la lista cuyo efecto depende de un número que no conoces: <b>hazte el examen de Vitamina D</b> antes de sostener dosis altas.' },

      { id:'multi', n:'Multivitamínico', dosis:'1 tableta', momento:'am', cuando:'con el desayuno',
        foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/B_vitamin_supplement_tablets.jpg/960px-B_vitamin_supplement_tablets.jpg',
        frasco:'pastillas', marca:{a:'#ffffff', b:'#2b8a3e'},
        ficha:{
          activo:'Mezcla de vitaminas y minerales en dosis cercanas a la recomendada diaria',
          que:'Una tableta grande al d\u00eda. Es un seguro barato, no un tratamiento.',
          hace:'Cubre el m\u00ednimo de una docena de micronutrientes. No te sube por encima de lo normal: te evita quedarte por debajo el d\u00eda que comiste mal.',
          tarda:'No se siente nada, y as\u00ed debe ser. Su trabajo es que no pase nada.'
        },
        envase:90, unidad:'tabletas', porDia:1, precio:350, tono:'teal',
        recorte:{ quitar:true, fuente:'USPSTF, 2022', txt:'La USPSTF no encontró evidencia suficiente de que un multivitamínico prevenga enfermedad en adultos sanos; la vitamina D y el magnesio ya los tomas aparte.' },
        porQue:'Cubre huecos de micronutrientes los días en que la dieta no es perfecta.',
        ojo:'No sustituye comer variado — es un seguro, no la base de la nutrición.' },

      { id:'omega3', n:'Omega 3 (aceite de pescado)', dosis:'1-2 g EPA+DHA', momento:'am', cuando:'con alimento',
        foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bao_bi_dau_ca.jpg/960px-Bao_bi_dau_ca.jpg',
        frasco:'pastillas', marca:{a:'#ffffff', b:'#1864ab'},
        ficha:{
          activo:'EPA y DHA, los dos \u00e1cidos grasos que el cuerpo no fabrica',
          que:'C\u00e1psulas de aceite de pescado. Lo que importa no son los miligramos del bote sino cu\u00e1nto EPA+DHA trae por c\u00e1psula \u2014 muchos venden 1000 mg de aceite con 300 de activo.',
          hace:'Se incorpora a la membrana de tus c\u00e9lulas y baja la producci\u00f3n de mol\u00e9culas inflamatorias. Menos inflamaci\u00f3n de fondo significa mejor recuperaci\u00f3n entre entrenamientos.',
          tarda:'6-12 semanas para que cambie la composici\u00f3n de las membranas. No es de efecto inmediato.'
        },
        envase:120, unidad:'cápsulas', porDia:2, precio:450, tono:'agua',
        porQue:'Antiinflamatorio, apoya la recuperación muscular y la salud cardiovascular.',
        ojo:'Si tienes reflujo, tómalo con una comida grande para evitar el "repique" de sabor a pescado.' },

      { id:'creatina', n:'Creatina monohidratada', dosis:'5 g', momento:'am', cuando:'también sin entrenar',
        foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Creatine_monohydrate_powder.jpg/960px-Creatine_monohydrate_powder.jpg',
        frasco:'polvo', marca:{a:'#f2f4f6', b:'#e8590c'},
        ficha:{
          activo:'Creatina monohidratada \u2014 la forma barata, y la \u00fanica con evidencia s\u00f3lida',
          que:'Un polvo sin sabor que se disuelve en agua. Es el suplemento deportivo m\u00e1s estudiado que existe.',
          hace:'Rellena el dep\u00f3sito de fosfocreatina del m\u00fasculo, que es el combustible de los primeros segundos de esfuerzo m\u00e1ximo. Con el dep\u00f3sito lleno sacas una o dos repeticiones m\u00e1s por serie, y esas repeticiones extra son las que construyen m\u00fasculo con el tiempo.',
          tarda:'El m\u00fasculo se satura en 3-4 semanas tom\u00e1ndola a diario. El primer par de kilos que subas es agua dentro del m\u00fasculo, no grasa.'
        },
        envase:300, unidad:'g', porDia:5, precio:400, tono:'am', clave:true,
        recorte:{ n:'Creatina monohidratada B Life, bolsa de 1 kg', precio:717, envase:1000, fuente:'Amazon MX, oct 2026', txt:'La creatina monohidratada es la misma en cualquier marca seria: el ahorro está en el tamaño.' },
        porQue:'El suplemento con más evidencia para fuerza y ganancia de masa muscular.',
        ojo:'No necesita fase de carga, y va <b>todos los días</b>: el efecto es por acumulación. Sube la creatinina en sangre <b>sin daño renal</b> — avisa antes de un perfil renal.' },

      { id:'magnesio', n:'Magnesio (glicinato o citrato)', dosis:'200-400 mg', momento:'pm', cuando:'30-60 min antes de dormir',
        frasco:'pastillas', marca:{a:'#ffffff', b:'#5f3dc4'},
        ficha:{
          activo:'Magnesio quelado \u2014 glicinato o citrato, nunca \u00f3xido',
          que:'C\u00e1psulas para la noche. La forma importa m\u00e1s que la dosis: el \u00f3xido es barato porque casi no se absorbe.',
          hace:'Interviene en cientos de reacciones, y entre ellas relaja la musculatura y ayuda a bajar el sistema nervioso a modo de reposo. Por eso va de noche y no por la ma\u00f1ana.',
          tarda:'El sue\u00f1o suele mejorar en la primera semana. Los calambres tardan algo m\u00e1s.'
        },
        envase:120, unidad:'cápsulas', porDia:2, precio:400, tono:'pm',
        recorte:{ n:'Bisglicinato de magnesio B Life (180 cápsulas)', precio:399, envase:180, fuente:'Amazon MX, oct 2026', txt:'La misma forma, glicinato, en un envase más grande.' },
        porQue:'Mejora la calidad del sueño y reduce calambres — complementa lo de Postura y Salud Mental.',
        ojo:'Va de noche por una razón: tomarlo por la mañana desperdicia la mitad de para lo que lo compraste. El glicinato es el mejor tolerado; evita el óxido si tienes estómago sensible.' },

      { id:'whey', n:'Proteína Whey (suero de leche)', dosis:'25-30 g', momento:'pm', cuando:'solo si faltan gramos',
        foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Orgain_organic_protein_powder.jpg/960px-Orgain_organic_protein_powder.jpg',
        frasco:'polvo', marca:{a:'#f2f4f6', b:'#c92a2a'},
        ficha:{
          activo:'Prote\u00edna de suero de leche, rica en leucina',
          que:'Un bote de polvo. No es un producto especial: es comida, en formato c\u00f3modo y con un perfil de amino\u00e1cidos muy bueno.',
          hace:'Aporta los amino\u00e1cidos con los que se reconstruye el m\u00fasculo despu\u00e9s de entrenar. Se absorbe r\u00e1pido, que es lo \u00fanico que la diferencia de un filete.',
          tarda:'No hay efecto que sentir. Sirve si te falta prote\u00edna en el d\u00eda; si ya llegas con comida, no aporta nada.'
        },
        envase:2000, unidad:'g', porDia:30, usosSemana:4, precio:1300, tono:'ok',
        porQue:'Completar tu meta de <b>{{proteinaMeta}} g de proteína al día</b> los días en que la comida no alcanza.',
        ojo:'No reemplaza comida real — es para los días en que no llegas solo con alimentos.' },
    ],

    // El renglón de la lista de la compra, escrito una sola vez y reversible.
    textoCompra: function (p) {
      return p.n + ', ' + p.envase + ' ' + p.unidad + ' (' + p.dosis + ', ' +
        (p.momento === 'am' ? 'mañana' : 'noche') + ')';
    },
    deTextoCompra: function (txt) {
      var t = this;
      return this.lista.filter(function (p) { return t.textoCompra(p) === txt; })[0] || null;
    },

    usosSemana: function (p) { return p.usosSemana != null ? p.usosSemana : 7; },
    porSemana: function (p) { return this.usosSemana(p) * p.porDia; },
    duracionDias: function (p) {
      const x = this.porSemana(p);
      return x ? Math.round(p.envase / (x / 7)) : null;
    },
    costoMes: function (p) {
      const d = this.duracionDias(p);
      return d ? Math.round(p.precio / d * 30) : 0;
    },
    get costoMesTotal() {
      var t = this;
      return this.lista.reduce(function (a, p) { return a + t.costoMes(p); }, 0);
    },
    delMomento: function (m) { return this.lista.filter(function (p) { return p.momento === m; }); },
  };

  // ── EL CHEQUEO DEL AÑO ──────────────────────────────────────────────────
  // Qué análisis le tocan y por qué. Antes la pestaña de Exámenes era una tabla vacía que no
  // proponía ninguno: guardaba resultados pero no decía cuáles pedir.
  //
  // Varios entran por algo que ya está en el proyecto: la vitamina D porque toma D3 a diario,
  // la creatinina porque toma creatina, el tiroideo porque la caída de cabello lo pide
  // descartar, y el PSA porque el dutasteride tópico de la lista de Cabello parte su valor a
  // la mitad. `mesesVigencia` es cada cuánto se repite; `desdeEdad` lo desactiva hasta esa edad.
  const CHEQUEO = {
    examenes: [
      { id:'lipidico', n:'Perfil lipídico', mesesVigencia:12, ayuno:'9-12 h',
        t:'Colesterol total, HDL, LDL y trigliceridos. Es el que más cambia con la dieta, y el que más pronto avisa.' },
      { id:'glucosa', n:'Glucosa en ayuno + HbA1c', mesesVigencia:12, ayuno:'8 h',
        t:'La HbA1c es el promedio de <b>3 meses</b>: no la puedes "preparar" el día antes como la glucosa suelta.' },
      { id:'vitd', n:'Vitamina D (25-OH)', mesesVigencia:12, prioritario:true,
        t:'<b>Tomas D3 a diario sin saber tu nivel.</b> Es el que más falta te hace: define si 2000 UI te sobran o te faltan.' },
      { id:'hepatico', n:'Perfil hepático (ALT / AST)', mesesVigencia:12, ayuno:'8 h',
        t:'Con 6 suplementos diarios vale tener una línea base. No porque sean peligrosos, sino para poder comparar si algo cambia.' },
      { id:'renal', n:'Creatinina y función renal', mesesVigencia:12, ayuno:'8 h',
        t:'<b>Aviso:</b> la creatina sube la creatinina en sangre <b>sin daño renal</b>. Si sale alta, dilo antes de que te asusten: se repite midiendo cistatina C.' },
      { id:'tiroides', n:'Perfil tiroideo (TSH)', mesesVigencia:12,
        t:'Entra por la caída de cabello: el hipotiroidismo es una de las causas que tu propia pestaña de Cabello te dice que descartes.' },
      { id:'biometria', n:'Biometría hemática', mesesVigencia:12,
        t:'La base de cualquier chequeo: anemia, infección, plaquetas.' },
      { id:'testo', n:'Testosterona total y libre', mesesVigencia:12, ayuno:'8 h',
        t:'Se mide <b>antes de las 10 am</b>, cuando está más alta. A otra hora el resultado no significa lo mismo.' },
      { id:'psa', n:'PSA', mesesVigencia:12, prioritario:true,
        t:'<b>Ya no es opcional: tomas dutasterida.</b> Ese fármaco <b>parte el PSA a la mitad</b>, así que un valor "normal" bajo tratamiento puede estar tapando uno alto de verdad.',
        aviso:'Reglas con las que se lee tu PSA a partir de ahora: <b>di siempre que tomas dutasterida</b> a quien lo interprete, y <b>multiplica el resultado por 2</b> para compararlo con los rangos normales. Si no te hiciste una medición antes de empezar, pide una ahora: sirve de línea base, y lo que importa a partir de aquí no es el número suelto sino que <b>suba</b> respecto a ella.' }
    ],
    get enAyuno() { return this.examenes.filter(function (e) { return e.ayuno; }); },
  };

  // ── EL PESO ─────────────────────────────────────────────────
  // El histórico de pesajes vive aquí y no en el navegador. Adán, 2026-09-02: "no te los daré
  // cada mes, te los daré cada que me acuerde y anotamos la fecha, además no quiero que esos
  // registros se pierdan, entonces los anotas en variables maestras". salud.html siembra
  // `registros` en su tabla de Peso & Medidas en cada carga (maestro → app, nunca al revés) y
  // toma de aquí la altura y la meta. `fecha` y `kg` obligatorios; cintura, brazo, muslo y grasa
  // opcionales — la cintura es la que dice si un kilo fue músculo o panza, así que se pide.
  // (Este bloque estaba documentado en readme_salud.md desde el 2-sep pero nunca llegó al
  // archivo: la app caía a su respaldo y enseñaba "configura tu meta". Entró el 13-sep-2026.)
  const PESO = {
    alturaCm: 178,
    metaKg:   80,                          // acordado el 2026-09-02, partiendo de 75 kg
    objetivo: 'Ganar masa muscular y bajar panza',
    registros: [
      { fecha: '2026-09-02', kg: 75, nota: 'Punto de partida al fijar la meta de 80 kg' },
      { fecha: '2026-09-13', kg: 78, nota: 'Dicho al pedir la gráfica de IMC por edad' },
    ],
    get ultimo()  { const r = this.registros.slice().sort(function (a, b) { return a.fecha < b.fecha ? 1 : -1; }); return r[0] || null; },
    get actualKg() { return this.ultimo ? this.ultimo.kg : 0; },
    get inicioKg() { const r = this.registros.slice().sort(function (a, b) { return a.fecha > b.fecha ? 1 : -1; }); return r[0] ? r[0].kg : 0; },
    get faltanKg() { return this.actualKg ? Math.round((this.metaKg - this.actualKg) * 10) / 10 : 0; },
    // IMC = kg / m². La OMS lo lee igual de los 20 a los 65: sano de 18.5 a 24.9.
    get imc()      { const m = this.alturaCm / 100; return this.actualKg ? Math.round(this.actualKg / (m * m) * 10) / 10 : 0; },
    get cinturaUltima() { const r = this.registros.filter(function (x) { return x.cintura; }).sort(function (a, b) { return a.fecha < b.fecha ? 1 : -1; }); return r[0] || null; },
  };

  // ─── Los precios del súper ─────────────────────────────────────────────────────
  // Vivían en dashboard.html; están aquí porque de ellos sale también el costo de cada receta del
  // recetario (costoReceta, abajo), que leen Comida, el Dashboard, Finanzas y la proyección.
  // `gPaq` — gramos (o ml) de lo que cuesta `precio` en los productos por paquete o pieza: con él
  // sale la tarifa por gramo. Los de `tipo:'peso'` ya traen el precio por kg.
  // Precios de referencia — Lista de Compras → Comida (2026-08-11). "real:true" viene del
  // ticket de Walmart de Adán (10-ago-2026, 22:51h) mapeado al producto de la lista más
  // parecido — con `nota` cuando el producto exacto del ticket no es 100% el mismo (p. ej.
  // compró "Jamón Virginia" y la etiqueta no dice "de pavo"). "real:false" no aparece en ese
  // ticket: precio investigado (Walmart México / Profeco "Quién es Quién en los Precios",
  // ago-2026), aproximado — varía por sucursal y temporada. Solo cubre la categoría `comida`;
  // `lcPrecioHtml()` no pinta nada para skincare/cabello/suplementos/libros.
  // `monto` (2026-08-11) — número en MXN usado SOLO para sumar el total marcado (`lcTotalComida()`),
  // no es lo mismo que `precio` (que muestra precio unitario/por kg, útil como referencia de
  // mercado). `monto` asume una cantidad típica de una sola compra — para los 11 productos
  // `real:true` con presentación por peso, es la cantidad exacta que Adán compró ese día en el
  // ticket (aguacate 0.2kg, cebolla 0.375kg, jitomate 0.38kg, papaya 1.43kg, plátano 0.895kg);
  // para el resto, una porción razonable (≈0.3-1kg fruta/verdura cruda, 0.5kg carne/pescado, 1
  // paquete/lata/frasco/bolsa) — por eso `monto` casi nunca es igual al número que aparece en
  // `precio` (ese es por kg o por unidad, `monto` ya multiplicó por la cantidad típica).
  // Reestructurado el 2026-08-12 — pedido explícito: "siento que lo de los precios esta un poco
  // mal por que luego puedo escoger por pieza o por paquete o por peso, entonces acomodalo mejor".
  // Antes `precio` era UN solo string que mezclaba 3 formas distintas de vender el mismo tipo de
  // producto ('$59/kg', '$18/pza', '$20 (bolsa 400g)'), así que no se podía comparar nada entre sí
  // ni se veía de dónde salía el total. Ahora cada producto declara por separado:
  //   tipo   — 'peso' | 'pieza' | 'paquete' — CÓMO se vende (es lo que decide si el precio de
  //            referencia es por kg, por pieza suelta, o por la presentación cerrada).
  //   precio — número en MXN del precio de referencia según ese `tipo`.
  //   unidad — texto corto de a qué corresponde ese `precio` ('kg', 'pza', 'paquete 250 g', ...).
  //   paso   — QUÉ suma un "+1" del contador, escrito como lo pides en el súper ('1 pza ≈127 g').
  //   monto  — lo que cuesta UN `paso`. Es lo único que suma el ticket.
  //   g      — gramos de UN `paso`. Solo en frutas / verduras / almidones / grasas: de ahí sale el
  //            chip de fruta+verdura por día. Ausente en el resto — una lata de atún no entra ahí.
  //   prot   — gramos de proteína de UN `paso`, aproximados por etiqueta. No se pinta: es el dato
  //            con el que se mide la proteína por peso gastado del prompt de Lista de Compras.
  //   base   — cuántos `paso` te comes en UNA semana. Hace dos cosas: marcar la casilla mete esa
  //            cantidad de golpe (un clic = tu semana) y el "Al mes" sabe cuánto dura lo que
  //            llevas — dura = pasos / base, con piso de 1 semana.
  //   real   — true = precio de tu ticket de Walmart (10-ago-2026, 22:51h); false = investigado
  //            (Walmart MX / Profeco "Quién es Quién en los Precios", ago-2026), aproximado.
  //   nota   — cuando el producto del ticket no es exactamente el de la lista.
  //
  // 2026-08-27 — `compra` y `sem` se sustituyeron por `paso` / `g` / `base`. Pedido de Adán: "las
  // cantidades en comida, maneja mejor por pieza, por que no siempre agarro el kg". Antes el
  // contador multiplicaba la COMPRA TÍPICA COMPLETA (Jitomate: +1 = 380 g = 3 piezas = $6), así
  // que "llevo 2 jitomates" no se podía expresar: o llevabas 3 o llevabas 6. Ahora +1 = 1 pieza
  // ($2) y `base:3` dice que tu semana son 3 piezas.
  // De paso arregla el "Al mes", que con unidades por pieza contaba doble: la fórmula vieja
  // multiplicaba por la cantidad Y dividía por `sem`, y con `sem` por pieza (1/3 de semana) el
  // resultado se disparaba. Ahora la duración se DERIVA de lo que llevas (`pasos / base`), que es
  // lo que de verdad significa "me dura": 6 plátanos duran una semana, 12 duran dos, y el gasto
  // mensual es el mismo en los dos casos.
  // `monto` va redondeado al peso entero: 127 g de jitomate a $15/kg son $1.90 y se guardan como
  // $2. En un carrito de 30 productos la diferencia son unos pesos, y el precio real varía más que
  // eso entre sucursales y temporada.
  // Para los `real:true` vendidos por peso, el precio por kg es el EXACTO que Adán pagó ese día;
  // el corte por pieza sale de dividir la cantidad del ticket entre las piezas que traía.
  const PRECIOS_SUPER = {
  // ── Verduras ──
  'Cebolla':{tipo:'peso',precio:62,unidad:'kg',paso:'1 pza ≈190 g',g:190,monto:12,base:1,real:true},
  'Champiñones':{tipo:'peso',precio:70,unidad:'kg',paso:'250 g',g:250,monto:18,base:1,real:false,nota:'No tiene pieza natural: el paso es la porción de 250 g que se pesa en bolsa.'},
  'Chayote':{tipo:'peso',precio:22,unidad:'kg',paso:'1 pza ≈300 g',g:300,monto:7,base:2,real:false},
  'Jitomate':{tipo:'peso',precio:15,unidad:'kg',paso:'1 pza ≈127 g',g:127,monto:2,base:3,real:true},
  'Lechuga':{tipo:'pieza',precio:18,gPaq:500,unidad:'pza',paso:'1 pza ≈500 g',g:500,monto:18,base:1,real:false,nota:'Se vende por pieza; los 500 g son una romana mediana, estimados.'},
  'Nopales cocidos':{tipo:'paquete',precio:20,gPaq:400,unidad:'bolsa 400 g',paso:'1 bolsa 400 g',g:400,monto:20,base:1,real:false},
  'Pepino':{tipo:'peso',precio:18,unidad:'kg',paso:'1 pza ≈250 g',g:250,monto:5,base:2,real:false},
  'Pimiento morrón':{tipo:'peso',precio:50,unidad:'kg',paso:'1 pza ≈150 g',g:150,monto:8,base:2,real:false},
  // ── Frutas ──
  'Papaya':{tipo:'peso',precio:40,unidad:'kg',paso:'1 pza ≈1.4 kg',g:1430,monto:57,base:1,real:true,nota:'La pieza de tu ticket pesó 1.43 kg. Si la compras en trozo, ajusta el contador a ojo.'},
  'Pera':{tipo:'peso',precio:55,unidad:'kg',paso:'1 pza ≈167 g',g:167,monto:9,base:3,real:false},
  'Plátano':{tipo:'peso',precio:24,unidad:'kg',paso:'1 pza ≈150 g',g:149,monto:4,base:6,real:true},
  // ── Almidones y grasas ──
  'Papa':{tipo:'peso',precio:24,unidad:'kg',paso:'1 pza ≈200 g',g:200,monto:5,base:2,real:false},
  'Aguacate':{tipo:'peso',precio:59,unidad:'kg',paso:'1 pza ≈200 g',g:200,monto:12,base:1,real:true},
  // ── Carnes y Pescados ──
  'Filete de res magro':{tipo:'peso',precio:220,unidad:'kg',paso:'1 filete ≈250 g',monto:55,base:2,real:false,prot:53},
  'Filete de tilapia':{tipo:'peso',precio:130,unidad:'kg',paso:'1 filete ≈250 g',monto:33,base:2,real:false,nota:'En tu ticket compraste Filete de Basa, no tilapia (pagaste $55, 1 pieza con descuento) — precio de tilapia investigado aparte.',prot:50},
  'Jamón de pavo':{tipo:'paquete',precio:57,gPaq:250,unidad:'paquete 250 g',paso:'1 paquete 250 g',monto:57,base:1,real:true,nota:'Ticket: "Jamón Virginia" — casi siempre es la variante de pavo en súper, pero la etiqueta no lo dice explícito.',prot:35},
  'Pechuga de pollo':{tipo:'paquete',precio:66,gPaq:265,unidad:'paquete ≈265 g',paso:'1 paquete ≈265 g',monto:66,base:1,real:true,nota:'Ticket: "Milanesa de Pechuga" — mismo corte, ya fileteado delgado. Se vende por paquete ya pesado, sale a ≈$249/kg.',prot:61},
  // ── Lácteos y Huevo ──
  'Clara de huevo':{tipo:'paquete',precio:45,gPaq:946,unidad:'envase 946 ml',paso:'1 envase 946 ml',monto:45,base:0.5,real:false,prot:100},
  'Huevo':{tipo:'paquete',precio:29,gPaq:600,unidad:'paquete 12 pza',paso:'1 paquete 12 pza',monto:29,base:1,real:true,nota:'Ticket: Bachoco. También se vende suelto por pieza o por kg en mercado — el paquete de 12 sale más barato por huevo.',prot:75},
  'Leche entera':{tipo:'paquete',precio:26,gPaq:1000,unidad:'L',paso:'1 L',monto:26,base:1,real:false,nota:'En tu ticket compraste Lala Deslactosada, no entera — precio de leche entera investigado aparte.',prot:33},
  'Queso panela':{tipo:'paquete',precio:42,gPaq:400,unidad:'paquete ≈400 g',paso:'1 paquete ≈400 g',monto:42,base:0.5,real:true,nota:'Precio con descuento en tu ticket. También se vende por peso en cremería, a ≈$120-140/kg.',prot:72},
  'Yogurt griego natural':{tipo:'paquete',precio:38,gPaq:900,unidad:'envase ≈900 g',paso:'1 envase ≈900 g',monto:38,base:0.5,real:false,nota:'En tu ticket compraste Yoplait ($12 c/u) — no es griego. Precio de yogurt griego investigado aparte.',prot:80},
  // ── Abarrotes y Despensa ──
  'Aceite de oliva':{tipo:'paquete',precio:150,gPaq:500,unidad:'botella 500 ml',paso:'1 botella 500 ml',monto:150,base:0.125,real:false},
  'Arroz blanco cocido':{tipo:'peso',precio:28,unidad:'kg (crudo)',paso:'1 kg crudo',monto:28,base:0.25,real:false,prot:70},
  'Atún en agua':{tipo:'pieza',precio:20,gPaq:140,unidad:'lata 140 g',paso:'1 lata 140 g',monto:20,base:1,real:true,nota:'Precio con descuento en tu ticket. En paquete de 4-6 latas sale más barato por lata.',prot:26},
  'Frijoles negros':{tipo:'paquete',precio:24,gPaq:560,unidad:'lata 560 g',paso:'1 lata 560 g',monto:24,base:0.5,real:false,prot:34},
  'Granola de amaranto':{tipo:'paquete',precio:60,gPaq:400,unidad:'bolsa 400 g',paso:'1 bolsa 400 g',monto:60,base:0.33,real:false,prot:40},
  'Miel de abeja':{tipo:'paquete',precio:90,gPaq:500,unidad:'frasco 500 g',paso:'1 frasco 500 g',monto:90,base:0.125,real:false},
  // ── Panadería y Tortillas ──
  'Pan integral':{tipo:'paquete',precio:75,gPaq:720,unidad:'paquete grande',paso:'1 paquete',monto:75,base:0.5,real:true,nota:'Ticket: "Pan Doble" (Bimbo Doble Fibra) — no dice "integral", pero es el pan de caja más cercano que compraste.'},
  'Tortilla de maíz':{tipo:'peso',precio:17,unidad:'kg',paso:'½ kg',monto:9,base:2,real:false,nota:'Medio kilo es lo que se pide de una en la tortillería; $8.50 redondeado a $9.',prot:28},
  // ── Los 4 de la lista que no tenían precio (contaban $0 en lo que cuesta comer) ──
  'Tortilla de harina':{tipo:'paquete',precio:32,gPaq:320,unidad:'paquete 10 pza',paso:'1 paquete 10 pza',monto:32,base:1,real:false,nota:'Precio estimado de súper (Walmart MX, oct-2026), no de tu ticket: corrígelo cuando lo compres.'},
  'Nuez':{tipo:'paquete',precio:85,gPaq:200,unidad:'bolsa 200 g',paso:'1 bolsa 200 g',monto:85,base:0.25,real:false,nota:'Precio estimado de súper (Walmart MX, oct-2026), no de tu ticket: corrígelo cuando lo compres.'},
  'Bolsa de verduras (brócoli, col y zanahoria)':{tipo:'paquete',precio:42,gPaq:500,unidad:'bolsa 500 g',paso:'1 bolsa 500 g',g:500,monto:42,base:1,real:false,nota:'Precio estimado de súper (Walmart MX, oct-2026), no de tu ticket: corrígelo cuando lo compres.'},
  'Láminas de salmón':{tipo:'peso',precio:420,unidad:'kg',paso:'1 paquete ≈200 g',monto:84,base:0.5,real:false,nota:'Precio estimado de súper (Walmart MX, oct-2026), no de tu ticket: corrígelo cuando lo compres.'},
  };

  // ─── El recetario ──────────────────────────────────────────────────────────
  // Las recetas son la fuente y LISTA_COMPRAS.comida se deriva de sus ingredientes: cada uno
  // declara su pasillo (`p`) y el getter los agrupa. Agregar una receta agrega sus
  // ingredientes a la compra sin tocar nada más.
  //
  // Sencillas (Adán, 12-oct-2026: "comidas más sencillas"): 4 ingredientes o menos, 3 pasos
  // y 15 minutos como máximo; 30 g de proteína o más en el desayuno y 40 g o más en la cena.
  // Los macros salen de una tabla por ingrediente, no a ojo. La cena se cocina doble: la
  // mitad es la comida del día siguiente (la cena de la rutina). El control 14 lo vigila.
  //
  // Lo que NO entra, y por qué: café, picante, cítricos en exceso, chocolate, frituras y
  // cebolla/ajo CRUDOS le disparan el reflujo (cocidos sí van); y calabaza, ejotes, hierbas de
  // olor, camote, espinaca, pavo molido, leche de avena, crema de cacahuate, caldo de pollo y
  // avena en hojuelas no le gustan. Brócoli y zanahoria sí: los compra en bolsa, cocidos y
  // mezclados, y así se los come.
  //
  // `foto` es relativa a CuidadoPersonal/ (la pinta comida.html) y `fotoCredito` lleva el
  // autor, la fuente y la licencia: fotos de Openverse y Wikimedia Commons, a 800 px.
  const RECETARIO = {
    desayuno: [
      {id:'d1', nombre:'Molletes de frijol con queso panela', tiempo:'10 min',
       foto:'fotos-comida/d1.jpg', fotoCredito:'Foodie Girl · StockSnap · CC0 1.0',
       ingredientes:[{n:'Pan integral',c:'2 rebanadas',p:'Panadería y Tortillas',g:60},{n:'Frijoles negros',c:'1/2 taza',p:'Abarrotes y Despensa',g:86},{n:'Queso panela',c:'90 g',p:'Lácteos y Huevo',g:90},{n:'Jitomate',c:'1/2 pza, picado',p:'Verduras',g:64}],
       pasos:['Unta los frijoles en el pan y cúbrelos con el queso en rebanadas.','Tápalos en el sartén a fuego bajo 5 minutos, hasta que el queso se suavice.','Sirve con el jitomate picado encima.'],
       macros:{cal:490,prot:30,carbs:51,gra:19},
       tip:'Frijoles enteros, no refritos con manteca: más ligeros y no te caen pesados a media mañana.'},
      {id:'d2', nombre:'Tacos de huevo con jamón de pavo', tiempo:'10 min',
       foto:'fotos-comida/d2.jpg', fotoCredito:'U.S. Department of Agriculture · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Huevo',c:'3 pza',p:'Lácteos y Huevo',g:150},{n:'Jamón de pavo',c:'60 g',p:'Carnes y Pescados',g:60},{n:'Tortilla de harina',c:'2 pza',p:'Panadería y Tortillas',g:64}],
       pasos:['Pica el jamón y dóralo 1 minuto en el sartén.','Agrega los huevos batidos y revuelve a fuego bajo hasta que cuajen.','Sirve en las tortillas calientes.'],
       macros:{cal:482,prot:34,carbs:35,gra:22},
       tip:'El jamón ya trae sal: no le pongas más.'},
      {id:'d3', nombre:'Yogurt griego con pera y granola', tiempo:'3 min',
       foto:'fotos-comida/d3.jpg', fotoCredito:'Jamie Hamel-Smith · StockSnap · CC0 1.0',
       ingredientes:[{n:'Yogurt griego natural',c:'300 g',p:'Lácteos y Huevo',g:300},{n:'Pera',c:'1 pza',p:'Frutas',g:167},{n:'Granola de amaranto',c:'30 g',p:'Abarrotes y Despensa',g:30},{n:'Miel de abeja',c:'1 cdta',p:'Abarrotes y Despensa',g:7}],
       pasos:['Sirve el yogurt en un tazón.','Pica la pera encima.','Termina con la granola y la miel.'],
       macros:{cal:500,prot:32,carbs:66,gra:14},
       tip:'La granola va al final para que siga crujiente. El yogurt griego de verdad trae unos 10 g de proteína por cada 100 g: revísalo en la etiqueta.'},
      {id:'d4', nombre:'Huevos con nopales y queso panela', tiempo:'10 min',
       foto:'fotos-comida/d4.jpg', fotoCredito:'U.S. Department of Agriculture · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Huevo',c:'3 pza',p:'Lácteos y Huevo',g:150},{n:'Nopales cocidos',c:'1 taza',p:'Verduras',g:150},{n:'Queso panela',c:'30 g',p:'Lácteos y Huevo',g:30},{n:'Tortilla de harina',c:'2 pza',p:'Panadería y Tortillas',g:64}],
       pasos:['Escurre y seca los nopales, y saltéalos 2 minutos en el sartén caliente.','Agrega los huevos batidos y revuelve a fuego bajo.','Sirve con el queso desmoronado y las tortillas calientes.'],
       macros:{cal:510,prot:31,carbs:39,gra:25},
       tip:'Secar los nopales es el truco: si sueltan baba, el huevo queda aguado.'},
      {id:'d5', nombre:'Licuado de plátano con yogurt griego', tiempo:'3 min',
       foto:'fotos-comida/d5.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Plátano',c:'1 pza',p:'Frutas',g:149},{n:'Yogurt griego natural',c:'200 g',p:'Lácteos y Huevo',g:200},{n:'Leche entera',c:'300 ml',p:'Lácteos y Huevo',g:300}],
       pasos:['Licúa el plátano con el yogurt y la leche 30 segundos.','Sírvelo al momento.'],
       macros:{cal:461,prot:30,carbs:49,gra:17},
       tip:'Con el plátano bien maduro no necesita miel.'},
      {id:'d6', nombre:'Sándwich de pollo con aguacate', tiempo:'5 min',
       foto:'fotos-comida/d6.jpg', fotoCredito:'Jay Mantri · StockSnap · CC0 1.0',
       ingredientes:[{n:'Pan integral',c:'2 rebanadas',p:'Panadería y Tortillas',g:60},{n:'Pechuga de pollo',c:'100 g, cocida',p:'Carnes y Pescados',g:133},{n:'Aguacate',c:'1/2 pza',p:'Almidones y grasas',g:100},{n:'Jitomate',c:'2 rodajas',p:'Verduras',g:32}],
       pasos:['Tuesta el pan.','Unta el aguacate y arma con el pollo deshebrado y el jitomate.'],
       macros:{cal:440,prot:40,carbs:34,gra:17},
       tip:'Usa la pechuga de la cena: cocina una de más y ya tienes el desayuno.'},
      {id:'d7', nombre:'Omelette de claras con pimiento y queso', tiempo:'8 min',
       foto:'fotos-comida/d7.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Clara de huevo',c:'6 pza',p:'Lácteos y Huevo',g:198},{n:'Pimiento morrón',c:'1/2 pza',p:'Verduras',g:75},{n:'Queso panela',c:'30 g',p:'Lácteos y Huevo',g:30},{n:'Tortilla de harina',c:'2 pza',p:'Panadería y Tortillas',g:64}],
       pasos:['Saltea el pimiento en tiras 2 minutos.','Vierte las claras batidas encima y tapa a fuego bajo 3 minutos.','Pon el queso, dobla a la mitad y sirve con las tortillas.'],
       macros:{cal:390,prot:33,carbs:38,gra:12},
       tip:'Las claras son proteína casi pura: el desayuno para los días que vas justo de calorías.'},
      {id:'d8', nombre:'Burritos de huevo con frijoles', tiempo:'10 min',
       foto:'fotos-comida/d8.jpg', fotoCredito:'Jakub Kapusnak · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Huevo',c:'3 pza',p:'Lácteos y Huevo',g:150},{n:'Frijoles negros',c:'1/2 taza',p:'Abarrotes y Despensa',g:86},{n:'Queso panela',c:'30 g',p:'Lácteos y Huevo',g:30},{n:'Tortilla de harina',c:'2 pza',p:'Panadería y Tortillas',g:64}],
       pasos:['Revuelve los huevos a fuego bajo.','Calienta los frijoles y las tortillas.','Rellena con el huevo, los frijoles y el queso, y enróllalos.'],
       macros:{cal:602,prot:37,carbs:54,gra:26},
       tip:'Envueltos en papel aluminio se llevan al coche sin ensuciar.'},
      {id:'d9', nombre:'Yogurt griego con plátano y nuez', tiempo:'3 min',
       foto:'fotos-comida/d9.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Yogurt griego natural',c:'300 g',p:'Lácteos y Huevo',g:300},{n:'Plátano',c:'1 pza',p:'Frutas',g:149},{n:'Nuez',c:'15 g',p:'Abarrotes y Despensa',g:15},{n:'Miel de abeja',c:'1 cdta',p:'Abarrotes y Despensa',g:7}],
       pasos:['Sirve el yogurt en un tazón.','Agrega el plátano en rodajas y la nuez picada.','Termina con un hilo de miel.'],
       macros:{cal:478,prot:32,carbs:47,gra:21},
       tip:'La nuez da grasa buena y te deja satisfecho: con 15 g basta.'},
      {id:'d10', nombre:'Huevos con jitomate y frijoles', tiempo:'10 min',
       foto:'fotos-comida/d10.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Huevo',c:'3 pza',p:'Lácteos y Huevo',g:150},{n:'Jitomate',c:'1 pza',p:'Verduras',g:127},{n:'Frijoles negros',c:'1/2 taza',p:'Abarrotes y Despensa',g:86},{n:'Tortilla de harina',c:'2 pza',p:'Panadería y Tortillas',g:64}],
       pasos:['Sofríe el jitomate picado 2 minutos, hasta que se ablande.','Agrega los huevos y revuelve a fuego bajo.','Sirve con los frijoles calientes y las tortillas.'],
       macros:{cal:552,prot:33,carbs:58,gra:20},
       tip:'Sin chile ni cebolla cruda: el jitomate cocido da el sabor sin las agruras.'},
      {id:'d11', nombre:'Pan tostado con aguacate y huevo', tiempo:'8 min',
       foto:'fotos-comida/d11.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Pan integral',c:'2 rebanadas',p:'Panadería y Tortillas',g:60},{n:'Huevo',c:'4 pza',p:'Lácteos y Huevo',g:200},{n:'Aguacate',c:'1/2 pza',p:'Almidones y grasas',g:100}],
       pasos:['Tuesta el pan.','Estrella los huevos tapados, en sartén antiadherente.','Unta el aguacate en el pan y pon los huevos encima.'],
       macros:{cal:558,prot:34,carbs:34,gra:32},
       tip:'La otra mitad del aguacate, con el hueso y tapada, aguanta para mañana.'},
      {id:'d12', nombre:'Quesadillas de pollo y queso panela', tiempo:'8 min',
       foto:'fotos-comida/d12.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Tortilla de harina',c:'3 pza',p:'Panadería y Tortillas',g:96},{n:'Pechuga de pollo',c:'80 g, cocida',p:'Carnes y Pescados',g:107},{n:'Queso panela',c:'50 g',p:'Lácteos y Huevo',g:50}],
       pasos:['Rellena las tortillas con el pollo deshebrado y el queso.','Dóralas en el comal sin aceite hasta que el queso se suavice.'],
       macros:{cal:552,prot:41,carbs:50,gra:20},
       tip:'En comal y sin aceite: la quesadilla frita es de las que te dan agruras a media mañana.'},
      {id:'d13', nombre:'Sándwich de atún con aguacate', tiempo:'5 min',
       foto:'fotos-comida/d13.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Pan integral',c:'2 rebanadas',p:'Panadería y Tortillas',g:60},{n:'Atún en agua',c:'1 lata',p:'Abarrotes y Despensa',g:140},{n:'Aguacate',c:'1/2 pza',p:'Almidones y grasas',g:100},{n:'Jitomate',c:'2 rodajas',p:'Verduras',g:32}],
       pasos:['Escurre bien el atún y mézclalo con el aguacate machacado.','Úntalo en el pan tostado y pon el jitomate encima.'],
       macros:{cal:392,prot:34,carbs:34,gra:14},
       tip:'El aguacate sustituye a la mayonesa: misma cremosidad, grasa buena y nada que te caiga pesado.'},
      {id:'d14', nombre:'Huevos revueltos con jamón y pimiento', tiempo:'10 min',
       foto:'fotos-comida/d14.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Huevo',c:'3 pza',p:'Lácteos y Huevo',g:150},{n:'Jamón de pavo',c:'50 g',p:'Carnes y Pescados',g:50},{n:'Pimiento morrón',c:'1/2 pza',p:'Verduras',g:75},{n:'Pan integral',c:'2 rebanadas',p:'Panadería y Tortillas',g:60}],
       pasos:['Saltea el pimiento y el jamón picados 2 minutos.','Agrega los huevos batidos y revuelve a fuego bajo.','Sirve con el pan tostado.'],
       macros:{cal:436,prot:35,carbs:32,gra:18},
       tip:'El pimiento cocido no da agruras y le pone color y dulzor al huevo.'},
      {id:'d15', nombre:'Licuado de pera con yogurt y amaranto', tiempo:'3 min',
       foto:'fotos-comida/d15.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Pera',c:'1 pza',p:'Frutas',g:167},{n:'Yogurt griego natural',c:'250 g',p:'Lácteos y Huevo',g:250},{n:'Leche entera',c:'200 ml',p:'Lácteos y Huevo',g:200},{n:'Granola de amaranto',c:'20 g',p:'Abarrotes y Despensa',g:20}],
       pasos:['Pica la pera sin el corazón.','Licúala con el yogurt, la leche y el amaranto 30 segundos.'],
       macros:{cal:520,prot:33,carbs:61,gra:18},
       tip:'La pera madura endulza sola; el amaranto lo espesa y te deja satisfecho más rato.'},
      {id:'d16', nombre:'Pan francés con plátano', tiempo:'10 min',
       foto:'fotos-comida/d16.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Pan integral',c:'2 rebanadas',p:'Panadería y Tortillas',g:60},{n:'Huevo',c:'3 pza',p:'Lácteos y Huevo',g:150},{n:'Leche entera',c:'100 ml',p:'Lácteos y Huevo',g:100},{n:'Plátano',c:'1 pza',p:'Frutas',g:149}],
       pasos:['Bate los huevos con la leche y remoja el pan por los dos lados.','Dóralo 2 minutos por lado en sartén antiadherente.','Sirve con el plátano en rodajas.'],
       macros:{cal:533,prot:30,carbs:59,gra:20},
       tip:'Sin mantequilla ni azúcar: el plátano endulza, y en antiadherente no hace falta grasa.'},
      {id:'d17', nombre:'Burrito de pollo con frijoles y aguacate', tiempo:'8 min',
       foto:'fotos-comida/d17.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Tortilla de harina',c:'2 pza',p:'Panadería y Tortillas',g:64},{n:'Pechuga de pollo',c:'80 g, cocida',p:'Carnes y Pescados',g:107},{n:'Frijoles negros',c:'1/2 taza',p:'Abarrotes y Despensa',g:86},{n:'Aguacate',c:'1/2 pza',p:'Almidones y grasas',g:100}],
       pasos:['Calienta los frijoles y el pollo deshebrado.','Calienta las tortillas en el comal.','Rellénalas con el pollo, los frijoles y el aguacate, y enróllalas.'],
       macros:{cal:566,prot:39,carbs:59,gra:20},
       tip:'Con el pollo de la cena de ayer sale en 8 minutos.'},
      {id:'d18', nombre:'Claras con nopales y frijoles', tiempo:'10 min',
       foto:'fotos-comida/d18.jpg', fotoCredito:'Brooke Lark · StockSnap · CC0 1.0',
       ingredientes:[{n:'Clara de huevo',c:'6 pza',p:'Lácteos y Huevo',g:198},{n:'Nopales cocidos',c:'1 taza',p:'Verduras',g:150},{n:'Frijoles negros',c:'1/2 taza',p:'Abarrotes y Despensa',g:86},{n:'Tortilla de harina',c:'2 pza',p:'Panadería y Tortillas',g:64}],
       pasos:['Saltea los nopales escurridos 2 minutos.','Agrega las claras batidas y revuelve hasta que cuajen.','Sirve con los frijoles calientes y las tortillas.'],
       macros:{cal:438,prot:37,carbs:59,gra:7},
       tip:'Casi sin grasa y llena de proteína: para los días que vas justo de calorías.'}
    ],
    cena: [
      {id:'c1', nombre:'Tilapia con verduras salteadas', tiempo:'12 min',
       foto:'fotos-comida/c1.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Filete de tilapia',c:'200 g',p:'Carnes y Pescados',g:200},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'2 tazas',p:'Verduras',g:180},{n:'Aceite de oliva',c:'1 cda',p:'Abarrotes y Despensa',g:14},{n:'Tortilla de harina',c:'2 pza',p:'Panadería y Tortillas',g:64}],
       pasos:['Saltea las verduras 5 minutos en el aceite y sácalas.','Seca la tilapia y séllala 3 minutos por lado en el mismo sartén.','Sirve el pescado sobre la verdura, con las tortillas calientes.'],
       macros:{cal:574,prot:49,carbs:45,gra:23},
       tip:'Pescado blanco: la cena más ligera que tienes, no te pesa al acostarte.'},
      {id:'c2', nombre:'Pechuga asada con verduras y frijoles', tiempo:'15 min',
       foto:'fotos-comida/c2.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Pechuga de pollo',c:'200 g',p:'Carnes y Pescados',g:200},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'2 tazas',p:'Verduras',g:180},{n:'Frijoles negros',c:'1/2 taza',p:'Abarrotes y Despensa',g:86},{n:'Aceite de oliva',c:'1 cdta',p:'Abarrotes y Despensa',g:4}],
       pasos:['Aplana la pechuga y ásala 5 minutos por lado sin moverla.','Mientras reposa 3 minutos, saltea las verduras en el aceite.','Sirve con los frijoles calientes.'],
       macros:{cal:456,prot:57,carbs:33,gra:11},
       tip:'Asa dos pechugas: la segunda es tu comida de mañana o el pollo de tus quesadillas.'},
      {id:'c3', nombre:'Bistec de res con nopales', tiempo:'12 min',
       foto:'fotos-comida/c3.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Filete de res magro',c:'200 g',p:'Carnes y Pescados',g:200},{n:'Nopales cocidos',c:'1 taza',p:'Verduras',g:150},{n:'Tortilla de harina',c:'2 pza',p:'Panadería y Tortillas',g:64}],
       pasos:['Sella la carne 3 minutos por lado y déjala reposar.','En el mismo sartén saltea los nopales 2 minutos.','Sirve con las tortillas calientes.'],
       macros:{cal:522,prot:51,carbs:37,gra:18},
       tip:'Res magra dos veces por semana, no más: la grasa de la carne es de lo que más agruras da de noche.'},
      {id:'c4', nombre:'Atún con aguacate y frijoles', tiempo:'8 min',
       foto:'fotos-comida/c4.jpg', fotoCredito:'Katrin Gilger · Wikimedia Commons · BY-SA 2.0',
       ingredientes:[{n:'Atún en agua',c:'2 latas',p:'Abarrotes y Despensa',g:280},{n:'Aguacate',c:'1/2 pza',p:'Almidones y grasas',g:100},{n:'Frijoles negros',c:'1/2 taza',p:'Abarrotes y Despensa',g:86}],
       pasos:['Calienta los frijoles.','Escurre el atún y mézclalo con el aguacate en cubos.','Sírvelo sobre los frijoles.'],
       macros:{cal:466,prot:60,carbs:27,gra:13},
       tip:'La cena de 8 minutos para cuando llegas tarde de Didi: todo sale de la despensa.'},
      {id:'c5', nombre:'Salmón al sartén con verduras', tiempo:'12 min',
       foto:'fotos-comida/c5.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Láminas de salmón',c:'180 g',p:'Carnes y Pescados',g:180},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'2 tazas',p:'Verduras',g:180}],
       pasos:['Saltea las verduras 5 minutos y apártalas.','Dora las láminas de salmón 2 minutos por lado: son finas y se cuecen rápido.','Sirve el salmón sobre la verdura.'],
       macros:{cal:436,prot:40,carbs:13,gra:25},
       tip:'Sácalo en cuanto se separe con el tenedor: un minuto de más y queda seco.'},
      {id:'c6', nombre:'Tacos de tilapia con aguacate', tiempo:'12 min',
       foto:'fotos-comida/c6.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Filete de tilapia',c:'200 g',p:'Carnes y Pescados',g:200},{n:'Tortilla de harina',c:'3 pza',p:'Panadería y Tortillas',g:96},{n:'Aguacate',c:'1/2 pza',p:'Almidones y grasas',g:100},{n:'Aceite de oliva',c:'1 cdta',p:'Abarrotes y Despensa',g:4}],
       pasos:['Corta la tilapia en tiras y dórala 2 minutos por lado con el aceite.','Calienta las tortillas.','Arma los tacos con el pescado y el aguacate.'],
       macros:{cal:652,prot:50,carbs:54,gra:27},
       tip:'Sin salsa picante ni mucho limón: de noche te caen mal y el pescado no los necesita.'},
      {id:'c7', nombre:'Pollo salteado con verduras y pimiento', tiempo:'12 min',
       foto:'fotos-comida/c7.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Pechuga de pollo',c:'200 g',p:'Carnes y Pescados',g:200},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'2 tazas',p:'Verduras',g:180},{n:'Pimiento morrón',c:'1 pza',p:'Verduras',g:150},{n:'Aceite de oliva',c:'1 cda',p:'Abarrotes y Despensa',g:14}],
       pasos:['Dora la pechuga en tiras a fuego alto y sácala.','Saltea las verduras y el pimiento 4 minutos.','Regresa el pollo un minuto y sirve.'],
       macros:{cal:453,prot:50,carbs:20,gra:20},
       tip:'Sacar el pollo y regresarlo al final es lo que evita que quede seco.'},
      {id:'c8', nombre:'Bowl de pollo, huevo y aguacate', tiempo:'10 min',
       foto:'fotos-comida/c8.jpg', fotoCredito:'James Harris · StockSnap · CC0 1.0',
       ingredientes:[{n:'Pechuga de pollo',c:'150 g, cocida',p:'Carnes y Pescados',g:200},{n:'Huevo',c:'2 pza',p:'Lácteos y Huevo',g:100},{n:'Aguacate',c:'1/2 pza',p:'Almidones y grasas',g:100},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'1 taza',p:'Verduras',g:90}],
       pasos:['Cuece los huevos 10 minutos y, mientras, calienta la verdura.','Arma el bowl con la verdura, el pollo deshebrado y los huevos en cuartos.','Termina con el aguacate y una pizca de sal.'],
       macros:{cal:542,prot:63,carbs:14,gra:26},
       tip:'Con el pollo ya cocido es la cena de los días que entrenas tarde.'},
      {id:'c9', nombre:'Tacos de pollo con nopales', tiempo:'12 min',
       foto:'fotos-comida/c9.jpg', fotoCredito:'Tim Sullivan · StockSnap · CC0 1.0',
       ingredientes:[{n:'Pechuga de pollo',c:'200 g',p:'Carnes y Pescados',g:200},{n:'Nopales cocidos',c:'1 taza',p:'Verduras',g:150},{n:'Tortilla de harina',c:'3 pza',p:'Panadería y Tortillas',g:96}],
       pasos:['Dora la pechuga en tiras 6 minutos.','Agrega los nopales escurridos y saltea 2 minutos más.','Sirve en las tortillas calientes.'],
       macros:{cal:562,prot:55,carbs:53,gra:13},
       tip:'Haz el doble: es tu comida de mañana en ALTEN, y todo sale de un solo sartén.'},
      {id:'c10', nombre:'Fajitas de res con pimiento', tiempo:'12 min',
       foto:'fotos-comida/c10.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Filete de res magro',c:'200 g',p:'Carnes y Pescados',g:200},{n:'Pimiento morrón',c:'1 pza',p:'Verduras',g:150},{n:'Tortilla de harina',c:'3 pza',p:'Panadería y Tortillas',g:96},{n:'Aceite de oliva',c:'1 cdta',p:'Abarrotes y Despensa',g:4}],
       pasos:['Saltea el pimiento en tiras 3 minutos con el aceite.','Agrega la res en tiras a fuego alto, 3 minutos.','Sirve en las tortillas calientes.'],
       macros:{cal:671,prot:53,carbs:55,gra:26},
       tip:'Tiras delgadas y fuego alto: así la res se dora en 3 minutos y no se endurece.'},
      {id:'c11', nombre:'Frijoles con huevo estrellado y queso', tiempo:'10 min',
       foto:'fotos-comida/c11.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Frijoles negros',c:'1 taza',p:'Abarrotes y Despensa',g:172},{n:'Huevo',c:'3 pza',p:'Lácteos y Huevo',g:150},{n:'Queso panela',c:'40 g',p:'Lácteos y Huevo',g:40}],
       pasos:['Calienta los frijoles hasta que espesen un poco.','Estrella los huevos tapados, en sartén antiadherente.','Sirve los huevos sobre los frijoles, con el queso desmoronado.'],
       macros:{cal:539,prot:41,carbs:43,gra:22},
       tip:'La cena más barata de la semana, y con 40 g de proteína.'},
      {id:'c12', nombre:'Pollo en jitomate', tiempo:'15 min',
       foto:'fotos-comida/c12.jpg', fotoCredito:'rexipe · Flickr · BY 2.0',
       ingredientes:[{n:'Pechuga de pollo',c:'200 g',p:'Carnes y Pescados',g:200},{n:'Jitomate',c:'2 pza',p:'Verduras',g:254},{n:'Tortilla de harina',c:'2 pza',p:'Panadería y Tortillas',g:64}],
       pasos:['Dora la pechuga en cubos 5 minutos.','Agrega el jitomate picado, tapa y deja 7 minutos hasta que se haga salsa.','Sirve con las tortillas calientes.'],
       macros:{cal:484,prot:53,carbs:41,gra:11},
       tip:'El jitomate cocido hace la salsa solo: sin chile ni cebolla cruda, no hay agruras.'},
      {id:'c13', nombre:'Tacos de res con aguacate', tiempo:'12 min',
       foto:'fotos-comida/c13.jpg', fotoCredito:'Dan Gold · StockSnap · CC0 1.0',
       ingredientes:[{n:'Filete de res magro',c:'200 g',p:'Carnes y Pescados',g:200},{n:'Tortilla de harina',c:'3 pza',p:'Panadería y Tortillas',g:96},{n:'Aguacate',c:'1/2 pza',p:'Almidones y grasas',g:100},{n:'Jitomate',c:'1/2 pza, picado',p:'Verduras',g:64}],
       pasos:['Corta la res en tiras y dórala a fuego alto 3 minutos.','Calienta las tortillas.','Arma los tacos con la res, el aguacate y el jitomate.'],
       macros:{cal:731,prot:54,carbs:57,gra:32},
       tip:'Jitomate picado en vez de salsa picante: frescura sin agruras.'},
      {id:'c14', nombre:'Salmón con aguacate y jitomate', tiempo:'12 min',
       foto:'fotos-comida/c14.jpg', fotoCredito:'usembassynewzealand · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Láminas de salmón',c:'200 g',p:'Carnes y Pescados',g:200},{n:'Aguacate',c:'1/2 pza',p:'Almidones y grasas',g:100},{n:'Jitomate',c:'1 pza',p:'Verduras',g:127}],
       pasos:['Dora las láminas de salmón 2 minutos por lado.','Pica el aguacate y el jitomate.','Sirve el salmón sobre la ensalada.'],
       macros:{cal:558,prot:43,carbs:11,gra:38},
       tip:'Salmón y aguacate son la grasa buena de la semana; por eso esta cena no lleva aceite.'},
      {id:'c15', nombre:'Ensalada tibia de pollo con aguacate', tiempo:'12 min',
       foto:'fotos-comida/c15.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Pechuga de pollo',c:'200 g',p:'Carnes y Pescados',g:200},{n:'Aguacate',c:'1/2 pza',p:'Almidones y grasas',g:100},{n:'Jitomate',c:'1 pza',p:'Verduras',g:127},{n:'Aceite de oliva',c:'1 cdta',p:'Abarrotes y Despensa',g:4}],
       pasos:['Asa la pechuga 5 minutos por lado y córtala en tiras.','Pica el jitomate y el aguacate.','Mezcla todo con el aceite y una pizca de sal.'],
       macros:{cal:422,prot:48,carbs:11,gra:21},
       tip:'Tibia, no fría: el pollo recién hecho le da sabor a toda la ensalada.'},
      {id:'c16', nombre:'Pechuga con nopales y frijoles', tiempo:'15 min',
       foto:'fotos-comida/c16.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Pechuga de pollo',c:'200 g',p:'Carnes y Pescados',g:200},{n:'Nopales cocidos',c:'1 taza',p:'Verduras',g:150},{n:'Frijoles negros',c:'1/2 taza',p:'Abarrotes y Despensa',g:86},{n:'Aceite de oliva',c:'1 cdta',p:'Abarrotes y Despensa',g:4}],
       pasos:['Asa la pechuga 5 minutos por lado.','En el mismo sartén saltea los nopales 2 minutos.','Sirve con los frijoles calientes.'],
       macros:{cal:416,prot:55,carbs:25,gra:10},
       tip:'Nopal y frijol: fibra que te deja satisfecho hasta el desayuno.'},
      {id:'c17', nombre:'Omelette de claras con pollo', tiempo:'10 min',
       foto:'fotos-comida/c17.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Clara de huevo',c:'6 pza',p:'Lácteos y Huevo',g:198},{n:'Pechuga de pollo',c:'80 g, cocida',p:'Carnes y Pescados',g:107},{n:'Pimiento morrón',c:'1/2 pza',p:'Verduras',g:75},{n:'Queso panela',c:'30 g',p:'Lácteos y Huevo',g:30}],
       pasos:['Saltea el pimiento en tiras con el pollo deshebrado 2 minutos.','Vierte las claras batidas, tapa y deja 3 minutos a fuego bajo.','Pon el queso, dobla a la mitad y sirve.'],
       macros:{cal:322,prot:52,carbs:6,gra:9},
       tip:'Cena ligera y con mucha proteína: ideal si entrenaste tarde y no quieres acostarte lleno.'},
      {id:'c18', nombre:'Res con verduras salteadas', tiempo:'12 min',
       foto:'fotos-comida/c18.jpg', fotoCredito:'Autor desconocido · Rawpixel · CC0 1.0',
       ingredientes:[{n:'Filete de res magro',c:'200 g',p:'Carnes y Pescados',g:200},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'2 tazas',p:'Verduras',g:180},{n:'Aceite de oliva',c:'1 cdta',p:'Abarrotes y Despensa',g:4}],
       pasos:['Saltea las verduras 4 minutos en el aceite y apártalas.','Dora la res en tiras a fuego alto 3 minutos.','Junta todo un minuto y sirve.'],
       macros:{cal:402,prot:48,carbs:13,gra:18},
       tip:'Haz el doble: es tu comida de mañana en ALTEN.'}
    ],
    get todas() { return this.desayuno.concat(this.cena); },
    // Lo que cuesta, en promedio, cocinar una receta de cada tiempo (MXN, por porción).
    get costoDesayuno() { return promedioCosto(this.desayuno); },
    get costoCena() { return promedioCosto(this.cena); },
    // Los ingredientes de todas las recetas, agrupados por pasillo y sin repetir.
    // De aquí sale la lista de la compra: no hay una segunda lista que mantener.
    get porPasillo() {
      const m = {};
      this.todas.forEach(function (r) {
        r.ingredientes.forEach(function (i) {
          (m[i.p] = m[i.p] || {})[i.n] = 1;
        });
      });
      const orden = ['Verduras', 'Frutas', 'Almidones y grasas', 'Carnes y Pescados',
                     'Lácteos y Huevo', 'Abarrotes y Despensa', 'Panadería y Tortillas'];
      const out = {};
      orden.forEach(function (p) { if (m[p]) out[p] = Object.keys(m[p]).sort(); });
      Object.keys(m).forEach(function (p) { if (!out[p]) out[p] = Object.keys(m[p]).sort(); });
      return out;
    },
  };
  // Lo que cuesta cocinar una receta: los gramos de cada ingrediente (`g`) por la tarifa por gramo de su
  // producto en PRECIOS_SUPER. null si algún ingrediente no tiene precio o gramos (el control 14 lo exige).
  function tarifaGramo(n) {
    const x = PRECIOS_SUPER[n];
    if (!x) return null;
    if (x.tipo === 'peso') return x.precio / 1000;
    return x.gPaq ? x.precio / x.gPaq : null;
  }
  function costoReceta(r) {
    let t = 0;
    for (let i = 0; i < r.ingredientes.length; i++) {
      const x = r.ingredientes[i], k = tarifaGramo(x.n);
      if (k == null || !x.g) return null;
      t += k * x.g;
    }
    return Math.round(t);
  }
  function promedioCosto(xs) {
    const c = xs.map(costoReceta).filter(function (x) { return x != null; });
    return c.length ? Math.round(c.reduce(function (a, b) { return a + b; }, 0) / c.length) : 0;
  }

  // \u2500\u2500 KIT DE HIGIENE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // Agrupado por bolsa, no por tipo de producto: cuando armas la maleta lo que importa
  // es qu\u00e9 meter en el neceser, no si algo es \"cuidado bucal\" o \"cuidado corporal\". Lo
  // que ya vive en Skincare y Cabello NO se duplica aqu\u00ed \u2014 esta lista es lo que hay que
  // COMPRAR APARTE en tama\u00f1o de viaje o lo que solo existe en el neceser.
  //
  // Hasta el 2026-09-02 esto eran cadenas sueltas dentro de `LISTA_COMPRAS`: no hab\u00eda
  // ning\u00fan objeto detr\u00e1s, as\u00ed que no hab\u00eda d\u00f3nde colgar una ficha. Ahora cada art\u00edculo
  // es un producto y la lista de la compra sale de aqu\u00ed. El `precio` NO se escribe:
  // vive en `LISTA_COMPRAS_PRECIOS_OTROS`, indexado por el texto del rengl\u00f3n.
  const KIT_HIGIENE = {
    grupos: [
      { n: 'Bolsa base \u2014 el neceser en s\u00ed', items: [
        { id:'neceser', n:'Neceser con gancho para colgar (impermeable por dentro)',
          foto:'https://upload.wikimedia.org/wikipedia/commons/b/be/Kulturbeutel1.jpg',
          frasco:'bolsa', marca:{a:'#e9ecf1', b:'#2c3e50'},
          uso:'Cu\u00e9lgalo del gancho nada m\u00e1s llegar y no lo vuelvas a abrir sobre la cama. Todo lo l\u00edquido, en la mitad impermeable.',
          ficha:{
            activo:'Forro impermeable y gancho giratorio',
            que:'La bolsa donde vive todo lo dem\u00e1s. Las dos caracter\u00edsticas que importan son el gancho y el forro; el resto es decoraci\u00f3n.',
            hace:'El gancho te da una repisa donde no la hay: los ba\u00f1os de hotel tienen un lavabo del tama\u00f1o de un plato. El forro impermeable convierte un gel reventado en un incordio en vez de en una maleta perdida.',
            sirve:'Es lo que hace que el kit sea un kit y no doce cosas sueltas por la maleta. Tambi\u00e9n es lo que hace que armar el equipaje deje de ser una decisi\u00f3n y pase a ser coger una bolsa.',
            tarda:'Desde el primer viaje.',
            ojo:'C\u00f3mpralo del tama\u00f1o de lo que llevas, no del que te gustar\u00eda llevar. Un neceser grande se llena de cosas que no usas y acaba pesando m\u00e1s que la ropa.'
          } },
        { id:'botellas', n:'Botellas de viaje rellenables 100 ml (set de 4, aptas para equipaje de mano)',
          frasco:'botella', marca:{a:'#eef1f6', b:'#1c7ed6'},
          uso:'Rell\u00e9nalas la noche antes, no en el aeropuerto. Etiqu\u00e9talas: a los tres viajes ya no sabes cu\u00e1l es el champ\u00fa y cu\u00e1l el gel.',
          ficha:{
            activo:'100 ml exactos \u2014 el l\u00edmite de cabina',
            que:'Cuatro botes peque\u00f1os rellenables. Son los que convierten tus productos de casa en productos de viaje sin comprarlos otra vez.',
            hace:'Cien mililitros es el m\u00e1ximo que deja pasar el control de un aeropuerto, y se mide por la capacidad impresa en el bote, no por lo que lleve dentro. Un bote de 200 ml medio vac\u00edo te lo quitan igual.',
            sirve:'Te ahorran comprar versiones de viaje de todo. Tu champ\u00fa, tu acondicionador y tu gel viajan contigo en vez de usar lo que haya en el hotel.',
            tarda:'Inmediato.',
            ojo:'El minoxidil NO va aqu\u00ed. Se degrada fuera de su envase original, y eso s\u00ed arruina el tratamiento.'
          } },
        { id:'bolsaLiquidos', n:'Bolsa de pl\u00e1stico con cierre para l\u00edquidos (regla de aeropuerto: 1 L transparente)',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Druckverschlussbeutel.jpg/960px-Druckverschlussbeutel.jpg',
          frasco:'bolsa', marca:{a:'#f0f3f7', b:'#868e96'},
          uso:'Todos los l\u00edquidos dentro, y la bolsa a mano en la mochila \u2014no en el fondo. En el control la sacas sin desarmar nada.',
          ficha:{
            activo:'Un litro, transparente y con cierre herm\u00e9tico',
            que:'Una bolsa de pl\u00e1stico. Cuesta lo que nada y es lo que decide si pasas el control en treinta segundos o en diez minutos.',
            hace:'La norma es la misma en casi todos los aeropuertos: los l\u00edquidos van en una sola bolsa transparente de un litro que se ense\u00f1a aparte. Sin ella, te vac\u00edan el neceser en la bandeja.',
            sirve:'Para no perder el vuelo por el control, y para no acabar tirando el gel que acabas de comprar.',
            tarda:'El primer control.',
            ojo:'UNA bolsa por persona, y tiene que cerrar. Si va tan llena que no cierra, no cuenta y te hacen sacar cosas all\u00ed mismo.'
          } },
        { id:'toallaMicro', n:'Toalla de microfibra de secado r\u00e1pido',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Mikrofaser-Handtuch_f%C3%BCr_Unterwegs.JPG/960px-Mikrofaser-Handtuch_f%C3%BCr_Unterwegs.JPG',
          frasco:'tela', marca:{a:'#eef1f6', b:'#0ca678'},
          uso:'S\u00e9cate a toques, no frotando. Al terminar, ti\u00e9ndela: doblada y h\u00fameda dentro del neceser huele mal en un d\u00eda.',
          ficha:{
            activo:'Microfibra \u2014 absorbe varias veces su peso y se seca en un par de horas',
            que:'Una toalla que ocupa como una camiseta doblada. No sustituye a la de casa: sustituye a la que no cabe en la maleta.',
            hace:'La fibra es mucho m\u00e1s fina que la del algod\u00f3n, as\u00ed que tiene mucha m\u00e1s superficie por gramo: absorbe m\u00e1s y, sobre todo, se seca sola antes de que le d\u00e9 tiempo a oler.',
            sirve:'Para el gimnasio, la alberca de Fitsi y cualquier viaje. Una toalla de algod\u00f3n mojada en la maleta arruina el resto de la ropa.',
            tarda:'Desde el primer uso.',
            ojo:'Nada de suavizante al lavarla: tapona la fibra y deja de absorber. Es el error que las convierte en un trapo que resbala sobre la piel.'
          } },
      ] },
      { n: 'Cuidado bucal', items: [
        { id:'cepilloViaje', n:'Cepillo de dientes de viaje con tapa',
          alias: ['Cepillo de cerdas suaves (o el\u00e9ctrico)', 'Cepillo de cerdas suaves'],
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Smiling_Travel_Set_%282143747248%29.jpg/960px-Smiling_Travel_Set_%282143747248%29.jpg',
          frasco:'cepillo', marca:{a:'#f2f4f6', b:'#12b886'},
          uso:'Dos minutos, cerdas suaves y en \u00e1ngulo hacia la enc\u00eda. Enju\u00e1galo y d\u00e9jalo secar ANTES de taparlo.',
          ficha:{
            activo:'Cerdas suaves \u2014 nunca medias ni duras',
            que:'Un cepillo plegable o con capuch\u00f3n. Lo de la tapa es por transporte, no por higiene.',
            hace:'Las cerdas suaves limpian igual que las duras: la placa es blanda y no hace falta fuerza. Las duras lo que hacen es retirarte la enc\u00eda y desgastar el esmalte del cuello del diente, y eso no vuelve.',
            sirve:'Para no acabar usando el cepillo de cortes\u00eda del hotel, que suele ser de cerda dura.',
            tarda:'C\u00e1mbialo cada 3 meses o en cuanto las cerdas se abran.',
            ojo:'No lo tapes mojado. Un capuch\u00f3n cerrado sobre un cepillo h\u00famedo es una incubadora; por eso muchos vienen con agujeros.'
          } },
        { id:'pastaViaje', n:'Pasta dental tama\u00f1o viaje (\u226475 ml)',
          alias: ['Pasta dental con fl\u00faor', 'Pasta dental para sensibilidad'],
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Zahnpastatube_%28fcm%29.jpg/960px-Zahnpastatube_%28fcm%29.jpg',
          frasco:'tubo', marca:{a:'#ffffff', b:'#1971c2'},
          uso:'Del tama\u00f1o de un ch\u00edcharo, no la tira entera del anuncio. Y al terminar, escupe pero no te enjuagues con agua.',
          ficha:{
            activo:'Fl\u00faor, 1450 ppm \u2014 el n\u00famero que hay que mirar en la caja',
            que:'Un tubo peque\u00f1o. Lo \u00fanico que decide si una pasta sirve es que lleve fl\u00faor en cantidad suficiente; lo dem\u00e1s es sabor y marketing.',
            hace:'El fl\u00faor se incorpora al esmalte y lo vuelve m\u00e1s resistente al \u00e1cido de las bacterias. Es de las medidas de salud p\u00fablica con m\u00e1s evidencia que existen.',
            sirve:'Para que la parte de tu rutina que m\u00e1s se repite \u2014dos veces al d\u00eda, todos los d\u00edas\u2014 siga funcionando tambi\u00e9n fuera de casa.',
            tarda:'Es prevenci\u00f3n: no se nota, se mide en la revisi\u00f3n.',
            ojo:'Enjuagarte con agua despu\u00e9s se lleva el fl\u00faor que acabas de poner. Escupe y ya est\u00e1: es el cambio gratis que m\u00e1s rinde de todo el cuidado bucal.'
          } },
        { id:'hilo', n:'Hilo dental',
          alias: ['Hilo o seda dental'],
          foto:'https://upload.wikimedia.org/wikipedia/commons/5/53/Dental_floss_%28whole%29.jpg',
          frasco:'caja', marca:{a:'#ffffff', b:'#0ca678'},
          uso:'Antes de cepillarte, no despu\u00e9s. Rodea el diente en forma de C y baja hasta la enc\u00eda: si s\u00f3lo metes y sacas, no limpias nada.',
          ficha:{
            activo:'El hilo \u2014 encerado si tienes los dientes juntos',
            que:'Un carrete de hilo. Es lo m\u00e1s aburrido de la lista y probablemente lo que m\u00e1s te ahorra en dentista.',
            hace:'El cepillo llega a tres de las cinco caras del diente. Las dos que quedan son justo donde empieza la caries entre dientes y donde se acumula la placa que inflama la enc\u00eda.',
            sirve:'Es la diferencia entre limpiarte el 60% de la boca y limpi\u00e1rtela entera. Con tu tema de reflujo, adem\u00e1s, la salud de la enc\u00eda importa a\u00fan m\u00e1s.',
            tarda:'Si sangra al principio, es que hay inflamaci\u00f3n. Deja de sangrar en 1-2 semanas de uso diario, y eso es la se\u00f1al de que va bien.',
            ojo:'Que sangre no es motivo para dejarlo \u2014 es el motivo por el que hay que hacerlo. Lo que s\u00ed hay que evitar es meterlo de golpe y cortar la enc\u00eda.'
          } },
        { id:'enjuague', n:'Enjuague bucal tama\u00f1o viaje',
          alias: ['Enjuague con fl\u00faor', 'Enjuague antibacterial', 'Enjuague sin alcohol para sensibilidad'],
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Colgate_Alcohol_Free_Mouthwash.jpg/960px-Colgate_Alcohol_Free_Mouthwash.jpg',
          frasco:'botella', marca:{a:'#ffffff', b:'#5f3dc4'},
          uso:'En otro momento del cepillado, no justo despu\u00e9s. Y sin diluir, 30 segundos.',
          ficha:{
            activo:'Fl\u00faor y agentes antis\u00e9pticos, mejor sin alcohol',
            que:'Un complemento, nunca un sustituto. Enjuagarse no quita placa: la placa se quita por rozamiento.',
            hace:'Reparte fl\u00faor por toda la boca y baja la carga bacteriana. Ayuda con el aliento y con la enc\u00eda, pero no despega nada.',
            sirve:'Como refuerzo entre cepillados, sobre todo en viaje, cuando comes fuera y a deshoras.',
            tarda:'El aliento, inmediato. La enc\u00eda, semanas.',
            ojo:'El\u00edgelo sin alcohol: el alcohol reseca la boca, y una boca seca da M\u00c1S caries y peor aliento, que es justo lo contrario de lo que buscas.'
          } },
        { id:'interdental', n:'Cepillos interdentales o irrigador de viaje',
          alias: ['Cepillo interdental + hilo dental'],
          foto:'https://upload.wikimedia.org/wikipedia/commons/6/60/Interdental-brushes.JPG',
          frasco:'utensilio', marca:{a:'#cfd6de', b:'#495057'},
          uso:'Uno por hueco, del grosor que entre sin forzar. Si tienes que empujar, es demasiado grande.',
          ficha:{
            activo:'El calibre \u2014 el grosor correcto para cada hueco',
            que:'Cepillitos diminutos para los espacios entre dientes. Donde caben, limpian mejor que el hilo.',
            hace:'Barren la superficie entre dientes con cerdas de verdad, en vez de rasparla con un hilo. En huecos amplios el hilo pasa sin tocar los lados.',
            sirve:'Para los huecos donde el hilo se queda corto, y en general para hacer m\u00e1s r\u00e1pido y m\u00e1s c\u00f3modo lo que casi nadie sostiene.',
            tarda:'La enc\u00eda deja de sangrar en 1-2 semanas.',
            ojo:'Forzar uno grueso separa los dientes y lastima la enc\u00eda. Pide en la farmacia que te digan el calibre, o compra un surtido y qu\u00e9date con el que entra solo.'
          } },
      ] },
      { n: 'Afeitado y barba', items: [
        { id:'rastrillo', n:'Rastrillo + cartuchos de repuesto',
          foto:'https://upload.wikimedia.org/wikipedia/commons/9/9b/Quattro_Titanium_Energy.jpg',
          frasco:'utensilio', marca:{a:'#dfe4ea', b:'#1c7ed6'},
          uso:'Siempre a favor del pelo, nunca a contrapelo, y sin apretar: el peso de la m\u00e1quina basta. Enjuaga la hoja cada dos pasadas.',
          ficha:{
            activo:'La hoja \u2014 y que est\u00e9 nueva, que es lo que de verdad importa',
            que:'La m\u00e1quina y sus repuestos. El repuesto es la parte que hay que recordar comprar: casi todo el mundo alarga el cartucho el triple de lo que deber\u00eda.',
            hace:'Una hoja afilada corta el pelo de una pasada. Una gastada lo arranca y tira, y eso es lo que produce la irritaci\u00f3n, los granitos y el pelo enterrado.',
            sirve:'Es el paso donde m\u00e1s f\u00e1cil te haces da\u00f1o en la cara, y donde el resultado depende casi por completo de una cosa que cuesta poco: cambiar el cartucho.',
            tarda:'Cada afeitado.',
            ojo:'Cambia el cartucho cada 5-7 afeitados. Si tienes que pasar dos veces por el mismo sitio, ya lo cambiaste tarde.'
          } },
        { id:'gelAfeitar', n:'Gel o espuma de afeitar tama\u00f1o viaje',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Nivea_men_shaving_gel.jpg/960px-Nivea_men_shaving_gel.jpg',
          frasco:'botella', marca:{a:'#f2f4f6', b:'#0d6ebf'},
          uso:'Sobre la piel ya mojada con agua tibia, y d\u00e9jalo un minuto antes de pasar la m\u00e1quina. Ese minuto es la mitad del trabajo.',
          ficha:{
            activo:'Lubricantes y emolientes con agua',
            que:'Lo que va entre la hoja y tu cara. El gel transparente deja ver por d\u00f3nde vas; la espuma lo tapa todo.',
            hace:'Hidrata el pelo, que as\u00ed se ablanda y se corta con menos fuerza, y deja una capa resbaladiza para que la hoja se deslice en vez de arrastrar la piel.',
            sirve:'Es lo que separa un afeitado limpio de una cara irritada. Afeitarse con jab\u00f3n de manos \u2014que es lo que hay en un hotel\u2014 reseca y raspa.',
            tarda:'El mismo d\u00eda.',
            ojo:'Nunca en seco ni con agua fr\u00eda. El agua tibia y el minuto de espera son gratis y son lo que evita el ardor de despu\u00e9s.'
          } },
        { id:'balsamo', n:'B\u00e1lsamo after-shave sin alcohol',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Pitralon_Polar_1.jpg/960px-Pitralon_Polar_1.jpg',
          frasco:'tubo', marca:{a:'#ffffff', b:'#0ca678'},
          uso:'Justo despu\u00e9s de secarte, con la cara todav\u00eda algo h\u00fameda. Si te afeitas por la ma\u00f1ana, va antes del protector solar.',
          ficha:{
            activo:'Calmantes como alanto\u00edna o pantenol, sin alcohol',
            que:'Lo que se pone despu\u00e9s. El de toda la vida llevaba alcohol y ard\u00eda; ese ardor no es que est\u00e9 funcionando, es que te est\u00e1 resecando.',
            hace:'Afeitarse retira una capa de piel adem\u00e1s del pelo. El b\u00e1lsamo repone agua y l\u00edpidos sobre esa piel reci\u00e9n raspada y baja la inflamaci\u00f3n.',
            sirve:'Encaja con tu rutina de skincare: es la misma l\u00f3gica de reparar la barrera, aplicada al d\u00eda que te afeitas.',
            tarda:'Alivio inmediato; menos irritaci\u00f3n acumulada en un par de semanas.',
            ojo:'Sin alcohol, y esto no es cosm\u00e9tico: sobre piel reci\u00e9n afeitada el alcohol irrita, reseca y empeora el pelo enterrado.'
          } },
        { id:'recortadora', n:'Recortadora de barba con bater\u00eda (y su cable)',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Bartschneider.jpg/960px-Bartschneider.jpg',
          frasco:'aparato', marca:{a:'#eef1f5', b:'#343a40'},
          uso:'Con la barba SECA y peinada. Empieza por un peine m\u00e1s largo del que crees y baja si hace falta: no hay vuelta atr\u00e1s.',
          ficha:{
            activo:'Los peines gu\u00eda, que son los que fijan el largo',
            que:'La m\u00e1quina de mantener la barba. El cable es parte de la compra: es lo que todo el mundo se deja en casa.',
            hace:'Corta todo a la misma altura, que es lo que da la sensaci\u00f3n de barba cuidada. El contorno lo haces con la m\u00e1quina sin peine, y eso es lo que se ve de lejos.',
            sirve:'Es lo que mantiene la barba en algo deliberado en vez de en lo que haya crecido. Cuenta tambi\u00e9n para las entrevistas.',
            tarda:'Cada 3-4 d\u00edas.',
            ojo:'Nunca sobre barba mojada: el pelo h\u00famedo se estira y cortas m\u00e1s de lo que crees. Y aceita las cuchillas de vez en cuando o empiezan a tirar.'
          } },
        { id:'tijerasNariz', n:'Tijeras peque\u00f1as para nariz y cejas',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nose_hair_Cut_Scissors.jpg/960px-Nose_hair_Cut_Scissors.jpg',
          frasco:'utensilio', marca:{a:'#cfd6de', b:'#495057'},
          uso:'Con punta redondeada, a contraluz y sobre seco. En la nariz s\u00f3lo lo que asoma, nunca hacia dentro.',
          ficha:{
            activo:'La punta redondeada \u2014 el detalle que evita el pinchazo',
            que:'Unas tijeras diminutas. Es el detalle que nadie mira en s\u00ed mismo y todo el mundo nota en los dem\u00e1s.',
            hace:'Cortan lo que sobresale sin arrancar. Arrancar el pelo de la nariz deja el fol\u00edculo abierto justo donde m\u00e1s bacterias hay, y de ah\u00ed salen las foliculitis dolorosas.',
            sirve:'Para el arreglo de dos minutos antes de una reuni\u00f3n o una entrevista. Rinde much\u00edsimo para lo que cuesta.',
            tarda:'Cada 1-2 semanas.',
            ojo:'Nada de pinzas ni de depiladoras dentro de la nariz. Ese pelo filtra el aire y arrancarlo abre la puerta a una infecci\u00f3n en una zona que drena hacia sitios delicados.'
          } },
      ] },
      { n: 'Cuerpo y ducha', items: [
        { id:'gelBano', n:'Gel de ba\u00f1o tama\u00f1o viaje',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Care_bamboo_green_tea_shower_gel_%282019%29_01.jpg/960px-Care_bamboo_green_tea_shower_gel_%282019%29_01.jpg',
          frasco:'botella', marca:{a:'#f2f4f6', b:'#0ca678'},
          uso:'En las zonas que lo necesitan \u2014axilas, ingles, pies\u2014 y agua en el resto. Agua tibia, no caliente.',
          ficha:{
            activo:'Tensioactivos suaves, con pH cercano al de la piel (5,5)',
            que:'El gel de la ducha. En viaje, uno peque\u00f1o tuyo; el del hotel suele ser jab\u00f3n agresivo y perfumado.',
            hace:'Un pH cercano al de la piel limpia sin romper el manto \u00e1cido, que es la defensa natural contra bacterias y hongos. El jab\u00f3n cl\u00e1sico tiene pH 9-10 y se lo lleva por delante.',
            sirve:'Es la misma l\u00f3gica del CeraVe de la cara, aplicada al cuerpo: limpiar sin desmontar la barrera.',
            tarda:'La piel deja de tirar desde el primer d\u00eda.',
            ojo:'Agua caliente y gel a diario por todo el cuerpo reseca las piernas y la espalda. No hace falta enjabonar entero cada d\u00eda.'
          } },
        { id:'desodorante', n:'Desodorante en barra (no aerosol \u2014 el aerosol da problemas en avi\u00f3n)',
          foto:'https://upload.wikimedia.org/wikipedia/commons/4/41/Stick_deodorant_%28blur%29.jpg',
          frasco:'barra', marca:{a:'#f4f6f8', b:'#1c7ed6'},
          uso:'Sobre piel limpia y SECA. El mejor momento es por la noche, no por la ma\u00f1ana.',
          ficha:{
            activo:'Sales de aluminio si es antitranspirante; antibacteriano si es s\u00f3lo desodorante',
            que:'Una barra, no un aerosol. Los aerosoles van presurizados y dan problemas en cabina; adem\u00e1s la barra dura mucho m\u00e1s.',
            hace:'El antitranspirante forma un tap\u00f3n temporal en el conducto del sudor. El desodorante no reduce el sudor: mata a las bacterias que lo descomponen, que son las que huelen.',
            sirve:'Con tu jornada m\u00e1s las horas de coche, es de lo que m\u00e1s se agradece. La barra adem\u00e1s no se derrama en la maleta.',
            tarda:'El antitranspirante llega a su m\u00e1ximo tras 3-4 noches seguidas de uso.',
            ojo:'Por la noche funciona mejor: de madrugada sudas poco y el producto entra en el conducto en vez de escurrirse. Y sobre piel reci\u00e9n afeitada arde.'
          } },
        { id:'esponja', n:'Esponja o guante exfoliante',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Gant_de_toilette_Kiss.jpg/960px-Gant_de_toilette_Kiss.jpg',
          frasco:'pano', marca:{a:'#f4f7fa', b:'#f08c00'},
          uso:'Dos veces por semana como mucho, con movimientos suaves. Despu\u00e9s de la ducha, cu\u00e9lgalo a secar fuera de la mampara.',
          ficha:{
            activo:'La textura \u2014 nada qu\u00edmico',
            que:'Un guante o esponja de trama \u00e1spera. Es exfoliaci\u00f3n mec\u00e1nica: raspa, no disuelve.',
            hace:'Retira las c\u00e9lulas muertas de la superficie, que en la espalda y los brazos se acumulan y tapan el poro. Ayuda adem\u00e1s con el pelo enterrado en la zona de la barba y el cuello.',
            sirve:'Para la espalda y los hombros, donde la piel es m\u00e1s gruesa y donde t\u00fa no llegas bien con las manos.',
            tarda:'La textura de la piel cambia en 2-3 semanas.',
            ojo:'Todos los d\u00edas es demasiado: rompes la barrera y consigues m\u00e1s granitos, no menos. Y una esponja que vive h\u00fameda en la ducha cr\u00eda hongos \u2014 c\u00e1mbiala cada 4-6 semanas.'
          } },
        { id:'chanclas', n:'Chanclas de ducha (hotel, gym, alberca de Fitsi)',
          foto:'https://upload.wikimedia.org/wikipedia/commons/f/f3/Green_flip_flops_on_red_background.jpg',
          frasco:'utensilio', marca:{a:'#dfe4ea', b:'#1971c2'},
          uso:'Puestas desde el vestuario hasta el agua, sin pisar descalzo en medio. S\u00e9calas despu\u00e9s.',
          ficha:{
            activo:'Una suela de goma entre tu pie y el suelo',
            que:'Unas chanclas de pl\u00e1stico. Es prevenci\u00f3n pura, y de la m\u00e1s rentable de la lista.',
            hace:'El hongo del pie de atleta vive en suelos h\u00famedos y compartidos: vestuarios, duchas de gimnasio, bordes de alberca. Se contagia por contacto directo con el suelo, y ya est\u00e1.',
            sirve:'Vas a la alberca de Fitsi. Es exactamente el sitio donde se contagia, y curar un pie de atleta lleva semanas de crema.',
            tarda:'Desde el primer d\u00eda que las usas.',
            ojo:'No sirven de nada en la mochila. La \u00fanica forma en que fallan es que no te las pongas por pereza en el trayecto corto del vestuario.'
          } },
        { id:'talco', n:'Talco o polvo antifricci\u00f3n para pies',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Johnsons_Baby_Powder_1%2C5_OZS_talc%2C_pic1.JPG/960px-Johnsons_Baby_Powder_1%2C5_OZS_talc%2C_pic1.JPG',
          frasco:'bote', marca:{a:'#ffffff', b:'#12b886'},
          uso:'En el pie bien seco antes del calcet\u00edn, insistiendo entre los dedos. Tambi\u00e9n un poco dentro del zapato.',
          ficha:{
            activo:'Almid\u00f3n de ma\u00edz o talco, a veces con antif\u00fangico',
            que:'Polvo para mantener el pie seco. No es perfume: es control de humedad.',
            hace:'Absorbe el sudor y baja la fricci\u00f3n. El hongo necesita humedad para crecer, as\u00ed que un pie seco es un pie donde no prospera; y menos fricci\u00f3n es menos ampollas.',
            sirve:'Zapato cerrado toda la jornada m\u00e1s las horas de coche es humedad constante. Es la pareja de las chanclas: unas evitan el contagio, esto evita que arraigue.',
            tarda:'Desde el primer d\u00eda.',
            ojo:'Entre los dedos es donde importa y es donde nadie lo pone. Ah\u00ed es donde empieza siempre el pie de atleta.'
          } },
      ] },
      { n: 'Manos, u\u00f1as y pies', items: [
        { id:'cortaunas', n:'Cortau\u00f1as de mano y de pie',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Nail-clippers-variety.jpg/960px-Nail-clippers-variety.jpg',
          frasco:'utensilio', marca:{a:'#cfd6de', b:'#495057'},
          uso:'Despu\u00e9s de la ducha, con la u\u00f1a blanda. En el pie, corte RECTO; en la mano puedes seguir la curva del dedo.',
          ficha:{
            activo:'Acero \u2014 y dos tama\u00f1os, porque la u\u00f1a del pie es mucho m\u00e1s gruesa',
            que:'Dos corta\u00fa\u00f1as, no uno. El peque\u00f1o no puede con la u\u00f1a del pie y acaba desgarr\u00e1ndola en vez de cortarla.',
            hace:'Un corte limpio deja el borde entero. Un corte a tirones deja una esquirla que se engancha en el calcet\u00edn y termina clav\u00e1ndose.',
            sirve:'Es de lo que menos se piensa y m\u00e1s molesta cuando falla. Una u\u00f1a encarnada te deja cojeando una semana.',
            tarda:'Cada 2-3 semanas.',
            ojo:'En el pie NUNCA redondees las esquinas. Redondear es exactamente lo que hace que la u\u00f1a crezca hacia dentro de la piel.'
          } },
        { id:'lima', n:'Lima de u\u00f1as',
          foto:'https://upload.wikimedia.org/wikipedia/commons/7/72/Glass_nail_file.jpg',
          frasco:'utensilio', marca:{a:'#e9ecf1', b:'#f08c00'},
          uso:'Siempre en UNA direcci\u00f3n, no en vaiv\u00e9n. Despu\u00e9s de cortar, para rematar el borde.',
          ficha:{
            activo:'El grano \u2014 de cart\u00f3n o cristal, mejor que las de metal',
            que:'Una lima. Es el remate de dos segundos que evita el enganch\u00f3n.',
            hace:'Alisa el borde que dej\u00f3 el corta\u00fa\u00f1as. Ese borde microsc\u00f3picamente astillado es el que se engancha en la tela y arranca la u\u00f1a en diagonal.',
            sirve:'Para no destrozar la u\u00f1a con lo que se enganche, y para dejar las manos presentables \u2014 que en una entrevista se ven.',
            tarda:'Al momento.',
            ojo:'Limar en vaiv\u00e9n calienta y deshilacha la u\u00f1a por capas. Una direcci\u00f3n, siempre la misma.'
          } },
        { id:'cuticula', n:'Alicate de cut\u00edcula o empujador',
          frasco:'utensilio', marca:{a:'#dfe4ea', b:'#7048e8'},
          uso:'Sobre la cut\u00edcula ablandada tras la ducha, EMPUJA. Cortar s\u00f3lo el padrastro que ya est\u00e1 levantado, nada m\u00e1s.',
          ficha:{
            activo:'La punta roma del empujador',
            que:'Un empujador y, como mucho, un alicate peque\u00f1o. La versi\u00f3n segura de esto es empujar, no cortar.',
            hace:'La cut\u00edcula es un sello vivo entre la u\u00f1a y la piel: sella la entrada a la matriz donde la u\u00f1a se fabrica. Empujarla la ordena; cortarla abre el sello.',
            sirve:'Para las manos, que se ven al dar la mano y en una entrevista. Un padrastro arrancado duele varios d\u00edas.',
            tarda:'Cada 1-2 semanas.',
            ojo:'No cortes la cut\u00edcula sana. Es lo que m\u00e1s infecciones de dedo produce y es completamente evitable: se empuja y ya.'
          } },
        { id:'cremaManos', n:'Crema para manos y pies',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Eucerin_hand_cream.jpg/960px-Eucerin_hand_cream.jpg',
          frasco:'tubo', marca:{a:'#ffffff', b:'#e8590c'},
          uso:'En las manos, despu\u00e9s de cada lavado. En los pies, por la noche, en el tal\u00f3n y la planta \u2014 nunca entre los dedos.',
          ficha:{
            activo:'Urea al 10-20% para el pie; emolientes m\u00e1s ligeros para la mano',
            que:'Dos usos con un mismo tubo, aunque lo ideal son dos productos: el pie pide urea y la mano no la necesita.',
            hace:'La urea hace dos cosas a la vez: retiene agua en la piel y ablanda la queratina endurecida del tal\u00f3n. Por eso funciona donde una crema normal resbala.',
            sirve:'Las manos se lavan y se secan diez veces al d\u00eda; el tal\u00f3n se agrieta con el zapato cerrado. Una grieta en el tal\u00f3n es una puerta de entrada abierta.',
            tarda:'Las manos, al momento. El tal\u00f3n agrietado, 2-3 semanas de uso diario.',
            ojo:'Entre los dedos del pie NO. Ah\u00ed lo que hace falta es sequedad \u2014 es lo contrario de lo que pide el tal\u00f3n, y en el mismo pie.'
          } },
      ] },
      { n: 'Botiqu\u00edn m\u00ednimo', items: [
        { id:'curitas', n:'Curitas surtidas + gasas est\u00e9riles',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Sparadrap_2.jpg/960px-Sparadrap_2.jpg',
          frasco:'caja', marca:{a:'#f7f8fa', b:'#c92a2a'},
          uso:'Lava la herida con agua y jab\u00f3n, s\u00e9cala, y cubre. Cambia la curita cuando se moje.',
          ficha:{
            activo:'Adhesivo y ap\u00f3sito est\u00e9ril',
            que:'Una caja de curitas de varios tama\u00f1os y unas gasas. Es el punto de partida de cualquier botiqu\u00edn.',
            hace:'Cubrir una herida limpia la mantiene h\u00fameda y protegida, y as\u00ed cierra m\u00e1s r\u00e1pido y con menos cicatriz que al aire. Lo de \u00abdejar que respire\u00bb es un mito.',
            sirve:'Para cortes de afeitado, rozaduras del zapato nuevo y lo que pase en el gimnasio.',
            tarda:'Un corte peque\u00f1o cierra en 3-5 d\u00edas.',
            ojo:'Si se moja, se cambia. Una curita empapada mantiene la herida en remojo y favorece justo la infecci\u00f3n que ven\u00edas a evitar.'
          } },
        { id:'alcoholGel', n:'Alcohol en gel y toallitas antibacteriales',
          frasco:'botella', marca:{a:'#f2f4f6', b:'#1971c2'},
          uso:'Una nuez, frotando 20 segundos hasta que sequen las manos solas. Sobre mano visiblemente sucia no sirve: ah\u00ed hay que lavar con agua y jab\u00f3n.',
          ficha:{
            activo:'Alcohol al 70% \u2014 ni menos ni, curiosamente, m\u00e1s',
            que:'Gel de manos y toallitas. El n\u00famero que importa es el 70%: por debajo del 60 no mata lo suficiente.',
            hace:'El alcohol rompe la envoltura de virus y bacterias. Al 70% funciona mejor que al 96 porque necesita algo de agua para penetrar; el m\u00e1s concentrado seca la superficie del germen sin llegar dentro.',
            sirve:'Para el avi\u00f3n, el volante y el gimnasio, donde tocas superficies compartidas y no hay lavabo cerca.',
            tarda:'Inmediato.',
            ojo:'No sustituye al agua y jab\u00f3n cuando la mano est\u00e1 sucia de verdad \u2014 el gel no arrastra nada, s\u00f3lo desinfecta lo que toca.'
          } },
        { id:'analgesico', n:'Analg\u00e9sico (paracetamol o ibuprofeno)',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Medication_Paracetamol.JPG/960px-Medication_Paracetamol.JPG',
          frasco:'caja', marca:{a:'#ffffff', b:'#1c7ed6'},
          uso:'La dosis de la caja, con comida si es ibuprofeno. Nunca los dos a la vez sin que te lo indiquen.',
          ficha:{
            activo:'Paracetamol o ibuprofeno \u2014 no son intercambiables',
            que:'Una caja de cada, o de uno. La elecci\u00f3n importa en tu caso concreto.',
            hace:'El paracetamol act\u00faa en el sistema nervioso central sobre el dolor y la fiebre. El ibuprofeno adem\u00e1s desinflama, pero lo hace bloqueando unas enzimas que tambi\u00e9n protegen la mucosa del est\u00f3mago.',
            sirve:'Dolor de cabeza, muscular o de muelas cuando est\u00e1s fuera y no hay farmacia cerca.',
            tarda:'30-60 minutos.',
            ojo:'Con tu gastritis, el ibuprofeno es el que puede darte problemas. Para dolor sin inflamaci\u00f3n, el paracetamol es la opci\u00f3n segura \u2014 y cons\u00faltalo con tu m\u00e9dico antes de tomar antiinflamatorios con frecuencia.'
          } },
        { id:'antidiarreico', n:'Antidiarreico y suero oral en sobre',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Oral_rehydration_salts_%28ORS%29_-_Packet.jpg/960px-Oral_rehydration_salts_%28ORS%29_-_Packet.jpg',
          frasco:'sobre', marca:{a:'#f5f2ea', b:'#0ca678'},
          uso:'El suero siempre; el antidiarreico s\u00f3lo si tienes que viajar o trabajar y no hay fiebre ni sangre. El sobre se disuelve en el agua que diga el envase, ni m\u00e1s ni menos.',
          ficha:{
            activo:'Sales de rehidrataci\u00f3n oral, en la proporci\u00f3n exacta de glucosa y sodio',
            que:'Dos cosas distintas: una repone lo que pierdes, la otra corta el s\u00edntoma. La importante es la primera.',
            hace:'El suero oral usa un truco de fisiolog\u00eda: el intestino absorbe sodio y glucosa juntos, y el agua va detr\u00e1s. Por eso rehidrata cuando el agua sola no lo consigue.',
            sirve:'Para una intoxicaci\u00f3n de viaje. Lo que te manda al hospital no es la diarrea: es la deshidrataci\u00f3n.',
            tarda:'La rehidrataci\u00f3n se nota en horas.',
            ojo:'Con fiebre alta o sangre, nada de antidiarreico: encerrar dentro lo que el cuerpo intenta expulsar empeora una infecci\u00f3n. Ah\u00ed toca m\u00e9dico.'
          } },
        { id:'antihistaminico', n:'Antihistam\u00ednico (alergias)',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Zyrtec-D_blister_pack.png/960px-Zyrtec-D_blister_pack.png',
          frasco:'caja', marca:{a:'#ffffff', b:'#5f3dc4'},
          uso:'Una al d\u00eda. Elige uno de segunda generaci\u00f3n \u2014loratadina, cetirizina\u2014 si vas a conducir.',
          ficha:{
            activo:'Antihistam\u00ednico H1, mejor de segunda generaci\u00f3n',
            que:'Una caja de pastillas para reacciones al\u00e9rgicas. La generaci\u00f3n importa mucho m\u00e1s de lo que parece.',
            hace:'Bloquea la histamina, que es lo que tus c\u00e9lulas liberan en una reacci\u00f3n al\u00e9rgica y lo que produce el picor, los estornudos y las ronchas. Los de primera generaci\u00f3n cruzan al cerebro y por eso dan sue\u00f1o.',
            sirve:'Para una reacci\u00f3n inesperada estando fuera: comida, picadura, polvo de un hotel.',
            tarda:'1-2 horas.',
            ojo:'Los de primera generaci\u00f3n \u2014difenhidramina, clorfenamina\u2014 dan un sue\u00f1o que no se siente venir. Con 28 horas de coche a la semana, esa es una interacci\u00f3n seria: no los tomes antes de conducir.'
          } },
        { id:'spfViaje', n:'Protector solar SPF 50 tama\u00f1o viaje',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Sunbum_sunscreen_spf_30.jpg/960px-Sunbum_sunscreen_spf_30.jpg',
          frasco:'tubo', marca:{a:'#ffffff', b:'#0f5fa6'},
          uso:'Dos dedos para cara y cuello, y repite cada 2 horas si est\u00e1s al aire libre.',
          ficha:{
            activo:'Filtros UVA/UVB de amplio espectro',
            que:'El mismo protector que ya usas, en formato peque\u00f1o. No es un producto nuevo: es tu SPF de siempre en un tama\u00f1o que pasa el control.',
            hace:'Lo mismo que tu Anthelios de diario: intercepta la radiaci\u00f3n antes de que da\u00f1e la c\u00e9lula.',
            sirve:'En viaje sueles estar m\u00e1s horas fuera que un d\u00eda normal, justo cuando es m\u00e1s f\u00e1cil salt\u00e1rselo. Va en el botiqu\u00edn para que no dependa de que te acuerdes.',
            tarda:'No se ve a corto plazo. Se ve a los 10 a\u00f1os.',
            ojo:'Es el paso que m\u00e1s se salta la gente en vacaciones, que es cuando m\u00e1s radiaci\u00f3n recibe. Que viva en el neceser y no en casa.'
          } },
        { id:'repelente', n:'Repelente de insectos (si el viaje es a zona tropical)',
          foto:'https://upload.wikimedia.org/wikipedia/commons/b/bd/SKEETER.JPG',
          frasco:'botella', marca:{a:'#f2f4f6', b:'#2b8a3e'},
          uso:'Sobre la piel expuesta, DESPU\u00c9S del protector solar y esperando unos minutos. Nunca debajo.',
          ficha:{
            activo:'DEET al 20-30%, o icaridina al 20%',
            que:'Un repelente de verdad, con concentraci\u00f3n suficiente. El porcentaje no aumenta la potencia: aumenta las horas que dura.',
            hace:'No mata al mosquito: le confunde los receptores con los que te localiza por el olor y el CO2 que exhalas. Deja de encontrarte.',
            sirve:'En zona tropical el mosquito transmite dengue y otras cosas que arruinan bastante m\u00e1s que un viaje.',
            tarda:'Inmediato; el DEET al 30% dura unas 6 horas.',
            ojo:'Va SIEMPRE encima del protector solar y nunca debajo. Al rev\u00e9s, el repelente aumenta la absorci\u00f3n del filtro y reduce su protecci\u00f3n.'
          } },
      ] },
      { n: 'Los que ya tienes \u2014 solo c\u00e1mbialos a tama\u00f1o viaje', items: [
        { id:'champuViaje', n:'Champ\u00fa y acondicionador en envase de 100 ml (los tuyos, rellenados)',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Care_seven_herbs_shampoo_%282019%29_03.jpg/960px-Care_seven_herbs_shampoo_%282019%29_03.jpg',
          frasco:'botella', marca:{a:'#f2f4f6', b:'#0d6ebf'},
          uso:'Rellena los tuyos la noche antes. Etiqu\u00e9talos, que los dos son botes blancos iguales.',
          ficha:{
            activo:'Los mismos que usas en casa',
            que:'No es una compra: es rellenar los botes de viaje con tu CeraVe y tu Elvive.',
            hace:'Mantiene tu rutina igual fuera de casa. El champ\u00fa del hotel suele llevar sulfatos, y en dos d\u00edas de viaje te deshace lo que llevas meses cuidando.',
            sirve:'Para no volver de cada viaje con el cuero cabelludo irritado y el pelo \u00e1spero.',
            tarda:'Se nota en el primer viaje de m\u00e1s de dos d\u00edas.',
            ojo:'El Pilexil y el Darrow son tratamiento y llevan su d\u00eda en la semana: si el viaje cae en lunes o jueves, \u00e9se es el que hay que llevar, no s\u00f3lo el suave.'
          } },
        { id:'skincareViaje', n:'Skincare AM/PM en botellas peque\u00f1as (limpiador, s\u00e9rum, hidratante con SPF, retinoide)',
          frasco:'bomba', marca:{a:'#f2f4f6', b:'#00a94f'},
          uso:'Los cuatro pasos completos. Si algo se cae de la maleta por espacio, que no sea el protector solar.',
          ficha:{
            activo:'Los mismos activos de tu rutina de casa',
            que:'Tu rutina entera, en peque\u00f1o. Cuatro botes de 100 ml, no cuatro productos nuevos.',
            hace:'Sostiene la continuidad, que en skincare es todo. El retinoide tarda 12 semanas en dar resultados: dos semanas de pausa en un viaje se notan de verdad.',
            sirve:'Para que un viaje de trabajo no le cueste un mes a la rutina.',
            tarda:'El da\u00f1o de dejarlo se ve a las 2-3 semanas de haberlo dejado.',
            ojo:'El retinoide en un frasco transparente al sol de la maleta se degrada. Que vaya en un bote opaco o en el suyo original.'
          } },
        { id:'minoxidilViaje', n:'Minoxidil en su envase original (no lo pases a otro frasco \u2014 se degrada)',
          frasco:'gotero', marca:{a:'#f2f4f6', b:'#1a3a6b'},
          uso:'En su bote, dentro de la bolsa de l\u00edquidos. Sigue siendo dos veces al d\u00eda, tambi\u00e9n en viaje.',
          ficha:{
            activo:'Minoxidil 5%',
            que:'La excepci\u00f3n de todo este kit: es lo \u00fanico que NO se pasa a un bote de viaje.',
            hace:'El minoxidil va disuelto en propilenglicol y alcohol, y esa mezcla se evapora y se oxida con la luz y el aire. En un frasco que no es el suyo, la concentraci\u00f3n deja de ser la que dice la etiqueta.',
            sirve:'Es la mitad de tu tratamiento contra la ca\u00edda. Salt\u00e1rtelo una semana de viaje no arruina nada, pero hacerlo cada mes s\u00ed.',
            tarda:'Dejarlo del todo revierte lo ganado en 3-4 meses.',
            ojo:'Es el \u00fanico de la lista que no se trasvasa. Si el bote es de m\u00e1s de 100 ml, tiene que ir en la maleta facturada.'
          } },
        { id:'pastillero', n:'Suplementos en pastillero por d\u00edas',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Pill_box_with_pills.JPG/960px-Pill_box_with_pills.JPG',
          frasco:'caja', marca:{a:'#f7f8fa', b:'#7048e8'},
          uso:'C\u00e1rgalo el domingo para toda la semana. Con dos compartimentos por d\u00eda, ma\u00f1ana y noche, porque el magnesio va de noche.',
          ficha:{
            activo:'Los compartimentos por d\u00eda \u2014 que es lo que evita la duda',
            que:'Una caja con divisiones. Resuelve un problema que no es de salud sino de memoria.',
            hace:'Te dice de un vistazo si ya tomaste lo de hoy. Sin \u00e9l, la duda de \u00ab\u00bfme lo tom\u00e9?\u00bb acaba siempre en salt\u00e1rselo o en repetir.',
            sirve:'Llevas seis suplementos en dos momentos distintos del d\u00eda. Fuera de casa, sin la rutina que los ancla, es donde se pierden.',
            tarda:'Desde la primera semana.',
            ojo:'Que tenga DOS compartimentos por d\u00eda. Con uno solo acabas tomando el magnesio por la ma\u00f1ana, que es tirar la mitad de para lo que lo compras.'
          } },
      ] },
    ],

    // Todos en fila, sin grupos. Es como se recorren para buscar uno.
    get todos() {
      return this.grupos.reduce(function (a, g) { return a.concat(g.items); }, []);
    },
    // El rengl\u00f3n de la lista de la compra ES el nombre, pero se pasa por aqu\u00ed
    // igual que en las dem\u00e1s categor\u00edas para que el camino de vuelta exista.
    textoCompra: function (p) { return p.n; },
    deTextoCompra: function (txt) {
      return this.todos.filter(function (p) { return p.n === txt; })[0] || null;
    },
    // La forma que espera la lista de la compra: {grupo: [texto, ...]}.
    get porGrupo() {
      var t = this, out = {};
      this.grupos.forEach(function (g) {
        out[g.n] = g.items.map(function (p) { return t.textoCompra(p); });
      });
      return out;
    },
  };

  // \u2500\u2500 CUIDADO DE LOS OJOS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // Agrupado por la CAUSA, no por el tipo de producto: 10-12 h de pantalla, 28 h de
  // volante. As\u00ed se ve para qu\u00e9 sirve cada cosa en vez de tener una lista de gotas.
  // Misma historia que el kit de higiene: eran cadenas y ahora son productos con ficha.
  const CUIDADO_OJOS = {
    grupos: [
      { n: 'Ojo seco \u2014 el problema n\u00famero uno con 10-12h de pantalla', items: [
        { id:'lagrimas', n:'L\u00e1grimas artificiales sin conservadores (monodosis)',
          frasco:'gotas', marca:{a:'#ffffff', b:'#1098ad'},
          uso:'Una gota en cada ojo, sin tocar el ojo con la punta. T\u00edralas despu\u00e9s de usar la monodosis, aunque quede l\u00edquido. Cada 3-4 horas de pantalla, sin esperar a que molesten.',
          ficha:{
            activo:'Hipromelosa o carboximetilcelulosa, sin cloruro de benzalconio',
            que:'Las gotas de todos los d\u00edas. \u00abSin conservadores\u00bb no es una etiqueta de lujo: es la diferencia entre poder usarlas 6 veces al d\u00eda y no poder.',
            hace:'Reponen la pel\u00edcula de l\u00e1grima que la pantalla te hace evaporar. Delante de un monitor parpadeas un tercio de lo normal, y la l\u00e1grima que deb\u00eda renovarse cada pocos segundos se queda ah\u00ed sec\u00e1ndose.',
            sirve:'Es lo primero contra el ojo seco, que con 10-12 horas de pantalla al d\u00eda es tu problema ocular n\u00famero uno. Tambi\u00e9n es lo que evita que llegues al volante con los ojos ya irritados.',
            tarda:'Alivio inmediato. La mejora de fondo, si las usas con constancia, en 2-3 semanas.',
            ojo:'Si el frasco es multidosis, lleva conservador, y usado muchas veces al d\u00eda ese conservador irrita m\u00e1s de lo que la gota alivia. Por eso van en monodosis.'
          } },
        { id:'gelNoche', n:'L\u00e1grimas en gel para la noche',
          frasco:'tubo', marca:{a:'#ffffff', b:'#0b7285'},
          uso:'Una tira peque\u00f1a dentro del p\u00e1rpado inferior justo antes de dormir. Va a nublar la vista unos minutos: por eso es lo \u00faltimo que haces del d\u00eda.',
          ficha:{
            activo:'Carb\u00f3mero en gel, de mucha m\u00e1s viscosidad que una gota',
            que:'La versi\u00f3n espesa de las l\u00e1grimas, para las horas en que no puedes ponerte nada.',
            hace:'Se queda sobre el ojo toda la noche en vez de escurrirse en minutos. Mucha gente duerme con los p\u00e1rpados ligeramente entreabiertos y amanece con el ojo reseco de ocho horas.',
            sirve:'Para levantarte sin ese ardor de los primeros minutos. Un ojo que amanece seco llega peor a la jornada de pantalla.',
            tarda:'La primera ma\u00f1ana ya se nota.',
            ojo:'Nunca de d\u00eda. Nubla la vista lo suficiente como para que no sea seguro conducir ni trabajar con ella puesta.'
          } },
        { id:'compresa', n:'Compresa o antifaz t\u00e9rmico para ojos de microondas',
          frasco:'pano', marca:{a:'#f4f7fa', b:'#5f3dc4'},
          uso:'20-30 segundos al microondas, comprueba que no queme, y 10 minutos sobre los ojos cerrados. Por la noche, 4-5 veces por semana.',
          ficha:{
            activo:'Calor h\u00famedo sostenido a unos 40 \u00b0C',
            que:'Un antifaz relleno que se calienta. Parece un capricho y es el tratamiento con m\u00e1s respaldo para el ojo seco.',
            hace:'En el borde del p\u00e1rpado tienes unas gl\u00e1ndulas que segregan la parte grasa de la l\u00e1grima, la que impide que se evapore. Con los a\u00f1os y las pantallas esa grasa se espesa y tapona la salida. El calor la vuelve l\u00edquida y deja que salga otra vez.',
            sirve:'Ataca la causa del ojo seco en vez de compensarla. Las gotas reponen lo que se evapora; esto hace que se evapore menos.',
            tarda:'6-8 semanas de uso constante. Es lento y por eso casi nadie lo sostiene.',
            ojo:'Diez minutos de verdad, no dos. Por debajo de ese tiempo la grasa no llega a fundirse y la sesi\u00f3n no sirve de nada.'
          } },
        { id:'toallitas', n:'Toallitas limpiadoras de p\u00e1rpados',
          frasco:'pano', marca:{a:'#f4f7fa', b:'#0ca678'},
          uso:'Justo despu\u00e9s de la compresa, con los ojos cerrados, pasa la toallita por el borde del p\u00e1rpado \u2014la l\u00ednea de las pesta\u00f1as\u2014 en horizontal. Una por ojo.',
          ficha:{
            activo:'Limpiador suave con pH del ojo, a veces con \u00e1cido hipocloroso',
            que:'Toallitas para el borde del p\u00e1rpado, no para la cara. Es la mitad que falta del tratamiento de la compresa.',
            hace:'Arrastran los restos y las bacterias que se acumulan en la salida de esas gl\u00e1ndulas. El calor las destapa por dentro; esto limpia la boca por fuera.',
            sirve:'Sin esto, la compresa funde la grasa y se vuelve a atascar en la misma costra. Van juntas o no vale la pena.',
            tarda:'Con la compresa, 6-8 semanas.',
            ojo:'Movimiento horizontal a lo largo del p\u00e1rpado, nunca frotando el ojo. Frotar el ojo es de las peores cosas que puedes hacerle a una c\u00f3rnea.'
          } },
        { id:'hialuronico', n:'Gotas humectantes con \u00e1cido hialur\u00f3nico',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Visine.JPG/960px-Visine.JPG',
          frasco:'gotas', marca:{a:'#ffffff', b:'#1971c2'},
          uso:'Una gota cuando notes el ojo especialmente cansado o antes de un tramo largo al volante. No sustituyen a las l\u00e1grimas de diario.',
          ficha:{
            activo:'\u00c1cido hialur\u00f3nico al 0,15-0,3%',
            que:'Unas l\u00e1grimas de gama alta. El hialur\u00f3nico es el mismo que llevan tus cremas, aqu\u00ed en concentraci\u00f3n oft\u00e1lmica.',
            hace:'Retiene agua sobre la superficie del ojo y aguanta bastante m\u00e1s que una l\u00e1grima normal antes de escurrirse, sin llegar a nublar la vista como el gel de noche.',
            sirve:'Para los tramos largos: una jornada entera de monitor, o las horas de carretera en las que no vas a poder estar ech\u00e1ndote gotas.',
            tarda:'Inmediato, y el alivio dura m\u00e1s que con las l\u00e1grimas simples.',
            ojo:'Son caras para usarlas seis veces al d\u00eda. Gu\u00e1rdalas para cuando las necesites y deja el trabajo de rutina a las monodosis.'
          } },
      ] },
      { n: 'Al volante \u2014 28h a la semana de exposici\u00f3n', items: [
        { id:'polarizados', n:'Lentes de sol polarizados con UV400',
          frasco:'gafas', marca:{a:'#dfe4ea', b:'#212529'},
          uso:'Al volante, siempre que haya sol, y tambi\u00e9n en d\u00eda nublado: el UV atraviesa las nubes.',
          ficha:{
            activo:'Filtro polarizado + protecci\u00f3n UV400',
            que:'Dos cosas distintas en un mismo lente, y hay que exigir las dos. El polarizado quita reflejos; el UV400 protege. Un lente oscuro sin UV400 es peor que no llevar nada.',
            hace:'El polarizado bloquea la luz que rebota horizontalmente \u2014el destello del cap\u00f3, del asfalto mojado, del parabrisas de delante\u2014 y deja pasar el resto. El UV400 frena la radiaci\u00f3n que con los a\u00f1os va formando cataratas.',
            sirve:'Pasas 28 horas a la semana conduciendo. Es tu mayor exposici\u00f3n a radiaci\u00f3n y a deslumbramiento, y las dos cosas cansan la vista y se acumulan durante d\u00e9cadas.',
            tarda:'El descanso visual es inmediato. La protecci\u00f3n se cobra en 20 a\u00f1os.',
            ojo:'Un lente oscuro SIN UV400 hace da\u00f1o: la oscuridad te dilata la pupila y deja entrar m\u00e1s radiaci\u00f3n de la que entrar\u00eda a ojo descubierto. Si no dice UV400, no sirve.'
          } },
        { id:'antirreflejante', n:'Antirreflejante para lentes graduados (se pide en la \u00f3ptica)',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Anti-reflective_coating_comparison.jpg/960px-Anti-reflective_coating_comparison.jpg',
          frasco:'gafas', marca:{a:'#e9ecf1', b:'#495057'},
          uso:'No se compra aparte: se pide al encargar los lentes. L\u00edmpialos s\u00f3lo con pa\u00f1o de microfibra y l\u00edquido de \u00f3ptica.',
          ficha:{
            activo:'Capa antirreflejo por evaporaci\u00f3n al vac\u00edo',
            que:'Un tratamiento sobre el cristal, no un accesorio. Se pide al hacer los lentes y encarece poco.',
            hace:'Sin \u00e9l, parte de la luz rebota en las dos caras del cristal y vuelve a tu ojo como un halo. De noche eso es exactamente el resplandor alrededor de los faros que te obliga a entrecerrar los ojos.',
            sirve:'Para la conducci\u00f3n nocturna y para las horas de monitor. Es la mejora m\u00e1s barata que puedes hacerle a unos lentes que ya vas a comprar.',
            tarda:'Desde el primer d\u00eda que los pones.',
            ojo:'Se raya con facilidad y una vez rayado no se arregla. Nada de limpiarlos con la camiseta: pide el pa\u00f1o y el l\u00edquido cuando los recojas.'
          } },
      ] },
      { n: 'Pantalla \u2014 ALTEN y los 2 bloques de la app', items: [
        { id:'luzAzul', n:'Lentes con filtro de luz azul y antirreflejante',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Reading-Glasses.jpg/960px-Reading-Glasses.jpg',
          frasco:'gafas', marca:{a:'#e3e8ef', b:'#364fc7'},
          uso:'Durante la jornada de monitor y en los bloques de la app por la noche.',
          ficha:{
            activo:'Filtro parcial del azul-violeta, m\u00e1s antirreflejante',
            que:'Unos lentes de pantalla. Conviene decirlo claro: la evidencia de que el filtro azul reduzca la fatiga visual es floja; la del antirreflejante que los acompa\u00f1a es s\u00f3lida.',
            hace:'Recorta parte del azul de longitud corta. Lo que s\u00ed est\u00e1 bien documentado es su efecto sobre el sue\u00f1o: el azul de la noche retrasa la melatonina, y esa es la parte que te interesa por los bloques nocturnos.',
            sirve:'Por las horas de monitor de ALTEN m\u00e1s los dos bloques de la app por la noche. C\u00f3mpralos por el antirreflejante y por el sue\u00f1o, no esperando que se te quite el cansancio de ojos.',
            tarda:'En el sue\u00f1o, un par de semanas. En la fatiga, no esperes gran cosa.',
            ojo:'La fatiga de pantalla viene sobre todo de no parpadear y de no mirar lejos. Ning\u00fan lente arregla eso: para eso est\u00e1 la regla 20-20-20 y las l\u00e1grimas.'
          } },
        { id:'soporte', n:'Soporte para elevar el monitor a la altura de los ojos',
          frasco:'aparato', marca:{a:'#eef1f5', b:'#343a40'},
          uso:'El borde superior de la pantalla a la altura de tus ojos, y a un brazo de distancia. Aj\u00fastalo sentado como te sientas de verdad, no erguido para la ocasi\u00f3n.',
          ficha:{
            activo:'Altura \u2014 nada m\u00e1s, y es lo que importa',
            que:'Una base o un brazo para subir el monitor. De lo m\u00e1s barato de la lista y de lo que m\u00e1s cambia el d\u00eda.',
            hace:'Con la pantalla baja, miras hacia abajo con el p\u00e1rpado m\u00e1s abierto de lo necesario y el ojo se seca m\u00e1s r\u00e1pido. Y el cuello va hacia delante, que es de donde salen las contracturas.',
            sirve:'Ataca a la vez el ojo seco y tu tema de postura. Es de las pocas compras que sirven para dos cosas de tu lista a la vez.',
            tarda:'El cuello lo agradece en d\u00edas. El ojo, en un par de semanas.',
            ojo:'Si subes el monitor y no subes la silla o el escritorio, mueves el problema a los hombros. Ajusta los dos.'
          } },
        { id:'lampara', n:'L\u00e1mpara de escritorio de luz c\u00e1lida regulable',
          foto:'https://upload.wikimedia.org/wikipedia/commons/3/38/Led_desk_lmap_1.png',
          frasco:'aparato', marca:{a:'#f2f4f6', b:'#e8a317'},
          uso:'Encendida siempre que uses la pantalla a oscuras. Por la noche, al m\u00ednimo y en tono c\u00e1lido.',
          ficha:{
            activo:'Temperatura de color regulable, de 2700 K a 4000 K',
            que:'Una l\u00e1mpara de escritorio que se pueda bajar de intensidad y de temperatura. Lo regulable es el requisito, no un extra.',
            hace:'Reduce el contraste entre una pantalla brillante y un cuarto oscuro. Ese salto obliga a la pupila a estar ajust\u00e1ndose todo el rato, y ese trabajo continuo es buena parte de lo que llamas vista cansada.',
            sirve:'Para los bloques de la app por la noche, que es cuando el cuarto est\u00e1 oscuro y la pantalla al m\u00e1ximo. Es la peor combinaci\u00f3n posible y la que m\u00e1s haces.',
            tarda:'Se nota la misma noche.',
            ojo:'Que no te d\u00e9 directa a los ojos ni rebote en la pantalla. Va a un lado y ligeramente por detr\u00e1s del plano del monitor.'
          } },
      ] },
      { n: 'Nutrici\u00f3n y contorno', items: [
        { id:'luteina', n:'Suplemento de Lute\u00edna + Zeaxantina 10 mg / 2 mg',
          foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Omega_3_capsules_in_white_bottle_%2852715127894%29.jpg/960px-Omega_3_capsules_in_white_bottle_%2852715127894%29.jpg',
          frasco:'pastillas', marca:{a:'#ffffff', b:'#f08c00'},
          uso:'Una c\u00e1psula al d\u00eda con una comida que lleve grasa: son carotenoides y sin grasa se absorben mal.',
          ficha:{
            activo:'Lute\u00edna 10 mg y zeaxantina 2 mg, las dosis del estudio AREDS2',
            que:'Dos pigmentos que tu retina concentra en la m\u00e1cula, la zona del centro de la visi\u00f3n. El cuerpo no los fabrica: s\u00f3lo llegan por la dieta.',
            hace:'Se depositan en la m\u00e1cula y filtran la luz azul justo antes de que llegue a las c\u00e9lulas fotorreceptoras, adem\u00e1s de actuar como antioxidantes ah\u00ed dentro. Es un filtro de luz azul, pero por dentro del ojo.',
            sirve:'Es prevenci\u00f3n a largo plazo de la degeneraci\u00f3n macular. Con tus horas de pantalla y de carretera, la exposici\u00f3n acumulada no es peque\u00f1a.',
            tarda:'El pigmento de la m\u00e1cula sube en 3-6 meses. No hay nada que notar: se mide, no se siente.',
            ojo:'No arregla el ojo seco ni la vista cansada de hoy. Es una inversi\u00f3n a 20 a\u00f1os, y comprarlo esperando alivio inmediato lleva a abandonarlo en un mes.'
          } },
        { id:'contorno', n:'Crema de contorno de ojos con cafe\u00edna',
          frasco:'tubo', marca:{a:'#ffffff', b:'#7048e8'},
          uso:'Del tama\u00f1o de un grano de arroz para los dos ojos, con el dedo anular, dando toquecitos sobre el hueso \u2014nunca sobre el p\u00e1rpado. Por la ma\u00f1ana.',
          ficha:{
            activo:'Cafe\u00edna al 3-5%, normalmente con p\u00e9ptidos',
            que:'Una crema ligera para la piel de alrededor del ojo, que es la m\u00e1s fina del cuerpo. Es cosm\u00e9tica, no oftalmolog\u00eda.',
            hace:'La cafe\u00edna contrae los vasos de esa zona, y con eso baja la hinchaz\u00f3n de la ma\u00f1ana y aclara algo el tono oscuro cuando ese tono viene de la sangre acumulada, que es lo habitual.',
            sirve:'Para la ojera de dormir poco y para la hinchaz\u00f3n al despertar. Es lo \u00fanico de esta lista que se ocupa de c\u00f3mo se ve la zona, no de c\u00f3mo funciona el ojo.',
            tarda:'La hinchaz\u00f3n, en 15 minutos. El tono, semanas \u2014 y s\u00f3lo si la causa es vascular.',
            ojo:'Si tu ojera es por surco o por sombra de la propia anatom\u00eda, ninguna crema la va a quitar. Y ojo con acercarte al p\u00e1rpado: si el producto migra al ojo, arde.'
          } },
      ] },
    ],

    // Todos en fila, sin grupos. Es como se recorren para buscar uno.
    get todos() {
      return this.grupos.reduce(function (a, g) { return a.concat(g.items); }, []);
    },
    // El rengl\u00f3n de la lista de la compra ES el nombre, pero se pasa por aqu\u00ed
    // igual que en las dem\u00e1s categor\u00edas para que el camino de vuelta exista.
    textoCompra: function (p) { return p.n; },
    deTextoCompra: function (txt) {
      return this.todos.filter(function (p) { return p.n === txt; })[0] || null;
    },
    // La forma que espera la lista de la compra: {grupo: [texto, ...]}.
    get porGrupo() {
      var t = this, out = {};
      this.grupos.forEach(function (g) {
        out[g.n] = g.items.map(function (p) { return t.textoCompra(p); });
      });
      return out;
    },
  };

  // \u2500\u2500 BIBLIOTECA \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // Los 44 libros, agrupados por para qu\u00e9 sirven. Hasta el 2026-09-02 esto eran cadenas
  // \"T\u00edtulo \u2014 Autor\" dentro de `LISTA_COMPRAS`; ahora cada uno es un libro con su ficha y
  // la lista de la compra sale de aqu\u00ed.
  //
  // La ficha de un libro NO lleva los mismos campos que la de un producto:
  //   sobre    de qu\u00e9 trata y de d\u00f3nde sale, en amplio
  //   resumen  qu\u00e9 dice: las ideas centrales, que es lo que se lee si no se lee el libro
  //   porQue   por qu\u00e9 est\u00e1 en la lista de Ad\u00e1n y no en otra
  //   idea     la que m\u00e1s rinde, en una frase
  //   cuando   en qu\u00e9 momento leerlo, y respecto a cu\u00e1l de los otros
  //
  // `portada`, `anio` y `pags` vienen de Open Library. 43 de los 44 tienen portada; el que
  // no (\u0024100M Offers, autopublicado) se dibuja con la silueta `libro`. Las portadas se
  // comprobaron MIR\u00c1NDOLAS: Open Library devolv\u00eda \"Roughing It\" de Mark Twain para los dos
  // de Hormozi y un disco de m\u00fasica para One Up On Wall Street.
  const BIBLIOTECA = {
    grupos: [
      { n: 'Ventas', color: '#b02a37', items: [
        { id: 'influence', t: 'Influence', a: 'Robert Cialdini',
          anio: 1983, pags: 287,
          portada: 'https://covers.openlibrary.org/b/id/431011-L.jpg',
          ficha: {
            sobre: 'Cialdini pas\u00f3 tres a\u00f1os infiltrado en escuelas de venta, agencias de captaci\u00f3n y organizaciones de recaudaci\u00f3n para averiguar qu\u00e9 hace que una persona diga que s\u00ed. El resultado no es un manual de trucos: es un libro de psicolog\u00eda social que explica los atajos mentales que todos usamos para decidir r\u00e1pido, y c\u00f3mo un profesional los activa a prop\u00f3sito.',
            resumen: 'Seis principios, y el libro dedica un cap\u00edtulo a cada uno. <b>Reciprocidad</b>: recibir algo crea una deuda que incomoda hasta que se paga. <b>Compromiso y coherencia</b>: quien dice s\u00ed a algo peque\u00f1o dice s\u00ed a algo grande despu\u00e9s, porque necesita seguir pareci\u00e9ndose a s\u00ed mismo. <b>Prueba social</b>: cuando no sabemos qu\u00e9 hacer, miramos qu\u00e9 hacen los dem\u00e1s, y m\u00e1s cuanto m\u00e1s se nos parecen. <b>Simpat\u00eda</b>: compramos de quien nos cae bien, y nos cae bien quien se nos parece, quien nos halaga y quien colabora con nosotros. <b>Autoridad</b>: obedecemos t\u00edtulos y uniformes sin comprobar qu\u00e9 hay detr\u00e1s. <b>Escasez</b>: lo que puede acabarse vale m\u00e1s, y perderlo pesa m\u00e1s que ganarlo. Cada cap\u00edtulo cierra con c\u00f3mo defenderse de ese mismo principio cuando lo usan contigo.',
            porQue: 'Es el cimiento de todo lo dem\u00e1s que hay en esta lista. Hormozi, Brunson y Voss construyen sobre estos seis principios; leerlos aqu\u00ed primero hace que los otros libros se entiendan en vez de memorizarse.',
            idea: 'La escasez no motiva por lo que puedes ganar sino por lo que vas a perder: la gente se mueve m\u00e1s por evitar una p\u00e9rdida que por conseguir algo equivalente.',
            cuando: 'El primero de la lista de Ventas. Todo lo dem\u00e1s se apoya en \u00e9l.'
          } },
        { id: 'offers100m', t: '$100M Offers', a: 'Alex Hormozi',
          anio: 2021, pags: 178,
          frasco: 'libro', marca: {a: '#f4f2ee', b: '#b02a37'},
          ficha: {
            sobre: 'Hormozi construy\u00f3 y vendi\u00f3 una cadena de gimnasios y luego una empresa de licencias; este libro es su m\u00e9todo para armar una oferta tan buena que el cliente se sienta tonto diciendo que no. No va de vender mejor: va de tener algo distinto que vender.',
            resumen: 'Arranca con una idea inc\u00f3moda: si tienes que convencer mucho, el problema es la oferta, no tu t\u00e9cnica. Propone su <b>ecuaci\u00f3n de valor</b> \u2014 el valor sube con el resultado so\u00f1ado y la probabilidad de lograrlo, y baja con el tiempo que tarda y el esfuerzo que cuesta. Cuatro palancas, y las dos de abajo son las que casi nadie toca. Luego ense\u00f1a a construir la oferta por acumulaci\u00f3n: listar todos los problemas que impiden el resultado, convertir cada uno en una soluci\u00f3n, y empaquetarlas. Cierra con los amplificadores \u2014 escasez, urgencia, bonos y garant\u00edas \u2014 y con por qu\u00e9 una garant\u00eda potente sube las ventas m\u00e1s de lo que cuestan las devoluciones.',
            porQue: 'Es el libro m\u00e1s pr\u00e1ctico de la lista para tu Fase 1: no necesitas audiencia ni presupuesto para aplicarlo, s\u00f3lo replantear qu\u00e9 vendes y c\u00f3mo lo empaquetas.',
            idea: 'Cuando la oferta es lo bastante buena, la venta deja de ser persuasi\u00f3n y pasa a ser explicaci\u00f3n.',
            cuando: 'Despu\u00e9s de Influence. Es el paso de la teor\u00eda a algo que puedes escribir en una tarde.'
          } },
        { id: 'spin', t: 'SPIN Selling', a: 'Neil Rackham',
          anio: 1988, pags: 197,
          portada: 'https://covers.openlibrary.org/b/id/55114-L.jpg',
          ficha: {
            sobre: 'Rackham analiz\u00f3 35.000 llamadas de venta reales en 20 pa\u00edses, el estudio m\u00e1s grande que se ha hecho sobre el tema. Su hallazgo desmont\u00f3 lo que se ense\u00f1aba: las t\u00e9cnicas de cierre agresivo funcionan en ventas peque\u00f1as y perjudican en las grandes.',
            resumen: 'El m\u00e9todo est\u00e1 en las preguntas, y en el orden. <b>S</b>ituaci\u00f3n: datos del contexto \u2014 las m\u00ednimas, porque aburren al cliente y s\u00f3lo te sirven a ti. <b>P</b>roblema: qu\u00e9 le est\u00e1 fallando. <b>I</b>mplicaci\u00f3n: qu\u00e9 le cuesta ese problema en dinero, tiempo o riesgo; es la parte que casi nadie hace y la que de verdad mueve una venta grande, porque convierte un fastidio en algo urgente. <b>N</b>ecesidad de soluci\u00f3n: preguntas que hacen que el propio cliente diga en voz alta el valor de resolverlo. El libro demuestra con datos que los vendedores de \u00e9xito hacen muchas preguntas de implicaci\u00f3n y pocas de situaci\u00f3n, y que cerrar antes de tiempo baja la tasa de \u00e9xito.',
            porQue: 'Es el contrapeso de los libros de venta r\u00e1pida. Si alg\u00fan d\u00eda vendes servicios o proyectos de software, este es el que aplica \u2014 ah\u00ed el ciclo es largo y presionar cierra la puerta.',
            idea: 'En una venta grande no vendes tu soluci\u00f3n: haces que el cliente se d\u00e9 cuenta de lo que le cuesta no resolverlo.',
            cuando: 'Cuando pases de vender algo barato a vender algo caro. Antes no le sacas partido.'
          } },
        { id: 'neverSplit', t: 'Never Split the Difference', a: 'Chris Voss',
          anio: 2016, pags: 288,
          portada: 'https://covers.openlibrary.org/b/id/8365942-L.jpg',
          ficha: {
            sobre: 'Voss fue el principal negociador de secuestros del FBI. El libro traslada lo que funciona cuando hay vidas en juego y no se puede repartir la diferencia \u2014 de ah\u00ed el t\u00edtulo \u2014 al terreno de un sueldo, un contrato o un precio.',
            resumen: 'Su tesis es que negociar no es un intercambio racional sino emocional, y que la herramienta central es la <b>empat\u00eda t\u00e1ctica</b>: entender y nombrar en voz alta lo que siente el otro, sin necesidad de estar de acuerdo. De ah\u00ed salen sus t\u00e9cnicas: el <b>etiquetado</b> (\u00abparece que esto te preocupa\u00bb), el <b>espejo</b> \u2014 repetir las \u00faltimas tres palabras para que el otro siga hablando \u2014, y provocar un <b>\u00abtienes raz\u00f3n\u00bb</b> que no vale nada frente a un <b>\u00abas\u00ed es\u00bb</b> que s\u00ed. Insiste en buscar el \u00abno\u00bb en vez del \u00abs\u00ed\u00bb, porque el no da control y relaja. Y desmonta el reparto equitativo: quien parte la diferencia acaba con medio traje. Cierra con el <b>cisne negro</b>: en toda negociaci\u00f3n hay informaci\u00f3n que si supieras lo cambiar\u00eda todo.',
            porQue: 'Es el m\u00e1s aplicable a tu d\u00eda a d\u00eda ahora mismo \u2014 un sueldo, un plazo, un proveedor \u2014 y no requiere ning\u00fan contexto de negocio para empezar a usarlo.',
            idea: '\u00abAs\u00ed es\u00bb es el punto de inflexi\u00f3n de una negociaci\u00f3n; \u00abtienes raz\u00f3n\u00bb s\u00f3lo significa que el otro quiere que te calles.',
            cuando: 'Cuando quieras algo que ya puedas aplicar esta semana.'
          } },
        { id: 'psychSelling', t: 'The Psychology of Selling', a: 'Brian Tracy',
          anio: 1986, pags: 220,
          portada: 'https://covers.openlibrary.org/b/id/13270498-L.jpg',
          ficha: {
            sobre: 'Tracy lleva d\u00e9cadas formando comerciales y este es su compendio: por qu\u00e9 compra la gente, qu\u00e9 frena una venta y c\u00f3mo se comporta quien vende bien. Es m\u00e1s cl\u00e1sico y m\u00e1s de motivaci\u00f3n que los otros, con muchas listas y repeticiones.',
            resumen: 'Dedica la primera parte a la cabeza del vendedor \u2014 autoimagen, miedo al rechazo, el hecho de que el 20% superior hace el 80% de las ventas \u2014 y la segunda al proceso: prospecci\u00f3n, c\u00f3mo abrir, c\u00f3mo descubrir la necesidad real, c\u00f3mo presentar en t\u00e9rminos de beneficio y no de caracter\u00edstica, c\u00f3mo tratar objeciones y c\u00f3mo cerrar. Insiste mucho en que la gente compra por emoci\u00f3n y justifica por l\u00f3gica, y en que el precio casi nunca es la objeci\u00f3n real.',
            porQue: 'Es el m\u00e1s flojo de los cinco de Ventas y est\u00e1 aqu\u00ed por completitud, no por urgencia. Si s\u00f3lo lees tres de este grupo, que sean Influence, $100M Offers y Never Split the Difference.',
            idea: 'El miedo al rechazo es el mayor obst\u00e1culo en ventas, y se reduce entendiendo que el no es a la oferta, no a ti.',
            cuando: 'El \u00faltimo del grupo, y s\u00f3lo si te sobra tiempo.'
          } },
      ] },
      { n: 'Marketing', color: '#e8590c', items: [
        { id: 'leads100m', t: '$100M Leads', a: 'Alex Hormozi',
          anio: 2023, pags: 285,
          portada: 'https://covers.openlibrary.org/b/isbn/9781737475767-L.jpg',
          ficha: {
            sobre: 'La continuaci\u00f3n de $100M Offers. Si aquel resolv\u00eda qu\u00e9 vender, este resuelve c\u00f3mo conseguir que alguien se entere: de d\u00f3nde salen los interesados y c\u00f3mo conseguir m\u00e1s sin gastar m\u00e1s.',
            resumen: 'Ordena todas las formas de captar en cuatro y las llama <b>los cuatro core</b>: gente que ya te conoce a la que contactas uno a uno, gente que ya te conoce a la que publicas contenido, desconocidos a los que contactas en fr\u00edo, y desconocidos a los que llegas con anuncios. Cada una tiene su cap\u00edtulo con vol\u00famenes concretos \u2014 cu\u00e1ntos mensajes al d\u00eda, cu\u00e1ntas publicaciones \u2014 porque su argumento central es que casi todo el mundo falla por hacer demasiado poco, no por hacerlo mal. Luego a\u00f1ade lo que multiplica: clientes que traen clientes, empleados, agencias y afiliados. Termina con un plan de escalado por fases y con la idea de <b>lead magnet</b>: algo gratis y de valor real que da el primer paso.',
            porQue: 'Es la mitad que falta de $100M Offers. Con una buena oferta y nadie que la vea no pasa nada, y ese es el punto exacto donde se atasca la mayor\u00eda al buscar su primer cliente.',
            idea: 'El problema casi nunca es el m\u00e9todo de captaci\u00f3n: es el volumen. La mayor\u00eda abandona en el punto en el que apenas empezaba a funcionar.',
            cuando: 'Justo despu\u00e9s de $100M Offers. Los dos son un solo libro partido en dos.'
          } },
        { id: 'hackingGrowth', t: 'Hacking Growth', a: 'Sean Ellis',
          anio: 2017, pags: 314,
          portada: 'https://covers.openlibrary.org/b/id/14377164-L.jpg',
          ficha: {
            sobre: 'Sean Ellis acu\u00f1\u00f3 el t\u00e9rmino growth hacking trabajando en Dropbox y LogMeIn. El libro cuenta el m\u00e9todo que usaron equipos como Facebook, Airbnb y Uber para crecer: no ideas sueltas, sino un proceso de experimentaci\u00f3n continuo.',
            resumen: 'Primero exige dos cosas antes de intentar crecer: un producto que la gente quiera de verdad \u2014 lo mide con la pregunta de \u00ab\u00bfcu\u00e1nto te decepcionar\u00eda no poder usarlo?\u00bb, y el umbral es 40% \u2014 y un equipo con gente de producto, datos y marketing. Despu\u00e9s define el proceso: analizar los datos, generar ideas, priorizarlas con un criterio de impacto y esfuerzo, y probar r\u00e1pido en ciclos cortos. La segunda mitad recorre el embudo \u2014 captar, activar, retener, monetizar \u2014 con casos reales. Insiste en que la <b>retenci\u00f3n</b> es la m\u00e9trica que decide, porque crecer sobre un cubo agujereado no lleva a ninguna parte.',
            porQue: 'Es el puente entre tu parte t\u00e9cnica y la comercial: el m\u00e9todo es de experimentaci\u00f3n, medici\u00f3n y iteraci\u00f3n, que es como ya piensas escribiendo software.',
            idea: 'Antes de intentar crecer hay que comprobar que el producto le importa a alguien: crecer sin eso s\u00f3lo acelera el fracaso.',
            cuando: 'Cuando ya tengas algo funcionando con usuarios de verdad. Antes es teor\u00eda.'
          } },
        { id: 'trafficSecrets', t: 'Traffic Secrets', a: 'Russell Brunson',
          anio: 2020, pags: 305,
          portada: 'https://covers.openlibrary.org/b/id/10297778-L.jpg',
          ficha: {
            sobre: 'Brunson, fundador de ClickFunnels, explica c\u00f3mo conseguir visitas y, sobre todo, c\u00f3mo no depender de ninguna plataforma para tenerlas. Es el tercero de su trilog\u00eda y el m\u00e1s \u00fatil de los tres.',
            resumen: 'Empieza oblig\u00e1ndote a definir a qui\u00e9n le hablas \u2014 su <b>Dream 100</b>: identificar las cien cuentas, canales o comunidades donde ya est\u00e1 reunida tu gente, en vez de buscarla de cero. De ah\u00ed salen dos caminos: entrar comprando (anuncios) o entrar gan\u00e1ndotelo (colaboraciones, apariciones, contenido). Luego desarrolla la idea de que hay que llevar a esa gente a un sitio que sea tuyo \u2014 lista de correo, comunidad propia \u2014 porque el alcance prestado desaparece con cada cambio de algoritmo. Cierra con embudos concretos por tipo de negocio y con estrategias de contenido para varias plataformas a la vez.',
            porQue: 'Complementa a Hormozi: aquel dice cu\u00e1nto hacer, este dice d\u00f3nde. La idea del Dream 100 es la que m\u00e1s rinde de las dos.',
            idea: 'Tu audiencia ya est\u00e1 reunida en alg\u00fan sitio que no es tuyo. El trabajo no es crearla, es ir a buscarla ah\u00ed y llev\u00e1rtela a un canal propio.',
            cuando: 'Con $100M Leads. Se solapan bastante, as\u00ed que lee el de Hormozi primero.'
          } },
        { id: 'jab', t: 'Jab, Jab, Jab, Right Hook', a: 'Gary Vaynerchuk',
          anio: 2013, pags: 195,
          portada: 'https://covers.openlibrary.org/b/id/11955993-L.jpg',
          ficha: {
            sobre: 'Vaynerchuk escribe contra la publicidad que s\u00f3lo pide. El t\u00edtulo es su tesis: muchos jabs \u2014 contenido que aporta y no pide nada \u2014 y de vez en cuando un gancho de derecha, que es cuando pides la venta.',
            resumen: 'La primera mitad argumenta que cada red social tiene su propio idioma y que copiar y pegar el mismo mensaje en todas es la forma m\u00e1s r\u00e1pida de que no funcione en ninguna: hay que adaptar formato, tono y expectativa. La segunda mitad es un desfile de ejemplos reales de marcas, cada uno puntuado y comentado \u2014 por qu\u00e9 esta publicaci\u00f3n funcion\u00f3 y esta otra no. Es un libro visual y pr\u00e1ctico, y tambi\u00e9n el m\u00e1s envejecido de los cuatro de Marketing, porque las plataformas que analiza han cambiado.',
            porQue: 'Su idea central sigue en pie aunque las redes hayan cambiado: dar mucho antes de pedir. Los ejemplos concretos ya no.',
            idea: 'El derecho a pedir se gana aportando primero, muchas veces, sin pedir nada a cambio.',
            cuando: 'El m\u00e1s prescindible del grupo. L\u00e9elo por la idea, hojea los ejemplos.'
          } },
      ] },
      { n: 'Finanzas e Inversi\u00f3n', color: '#1d6f42', items: [
        { id: 'intelligentInvestor', t: 'The Intelligent Investor', a: 'Benjamin Graham',
          anio: 1949, pags: 352,
          portada: 'https://covers.openlibrary.org/b/id/36434-L.jpg',
          ficha: {
            sobre: 'Graham fue el maestro de Warren Buffett y el padre de la inversi\u00f3n en valor. Escrito en 1949 y actualizado hasta su muerte, sigue siendo el libro que m\u00e1s recomienda Buffett, que llama al cap\u00edtulo 8 y al 20 los dos mejores textos jam\u00e1s escritos sobre inversi\u00f3n.',
            resumen: 'Separa al <b>inversor</b> del <b>especulador</b>: el primero compra un trozo de un negocio, el segundo apuesta al precio. De ah\u00ed nacen sus dos ideas centrales. <b>Mr. Market</b>: imagina que el mercado es un socio man\u00edaco-depresivo que cada d\u00eda te ofrece comprarte o venderte tu parte a un precio distinto seg\u00fan su humor; no tienes obligaci\u00f3n de hacerle caso, y su locura es tu oportunidad. Y el <b>margen de seguridad</b>: comprar s\u00f3lo a un precio bastante por debajo de lo que el negocio vale, para que un error de c\u00e1lculo no te arruine. Distingue al inversor defensivo \u2014 que reparte entre acciones y bonos y no toca nada \u2014 del emprendedor, que s\u00ed analiza. La edici\u00f3n moderna trae comentarios de Jason Zweig con casos recientes.',
            porQue: 'Es el ancla de tu estrategia de invertir en empresas de EE. UU. por GBM. Te vacuna contra lo que m\u00e1s dinero cuesta a un inversor peque\u00f1o: entrar y salir siguiendo el \u00e1nimo del mercado.',
            idea: 'El mayor problema del inversor, y su peor enemigo, es \u00e9l mismo.',
            cuando: 'El primero de Finanzas, y el m\u00e1s denso. Si se te atraganta, empieza por Bogle y vuelve.'
          } },
        { id: 'littleBook', t: 'The Little Book of Common Sense Investing', a: 'John Bogle',
          anio: 2007, pags: 228,
          portada: 'https://covers.openlibrary.org/b/id/1239500-L.jpg',
          ficha: {
            sobre: 'Bogle fund\u00f3 Vanguard e invent\u00f3 el fondo indexado para el peque\u00f1o inversor. Este libro es su argumento, contado en 200 p\u00e1ginas cortas: no intentes ganarle al mercado, c\u00f3mpralo entero y qu\u00e9date quieto.',
            resumen: 'El razonamiento es aritm\u00e9tico antes que te\u00f3rico. Todos los inversores juntos SON el mercado, as\u00ed que en conjunto obtienen el rendimiento del mercado menos los costes; por lo tanto, en promedio, la gesti\u00f3n activa tiene que perder contra la indexada por la diferencia de comisiones. Ense\u00f1a lo que hace una comisi\u00f3n del 2% anual compuesta a treinta a\u00f1os \u2014 se lleva m\u00e1s de la mitad de lo que habr\u00edas acumulado \u2014 y muestra los datos de cu\u00e1ntos fondos activos baten al \u00edndice a largo plazo, que son muy pocos y adem\u00e1s cambian cada d\u00e9cada. Cierra con la parte psicol\u00f3gica: el enemigo no es el mercado sino la tentaci\u00f3n de moverse.',
            porQue: 'Es el contrapeso exacto a la idea de escoger empresas una por una. L\u00e9elo aunque decidas no hacerle caso: te obliga a justificar por qu\u00e9 crees que puedes hacerlo mejor.',
            idea: 'En inversi\u00f3n, no obtienes lo que pagas: obtienes exactamente lo que NO pagas.',
            cuando: 'Es el m\u00e1s corto y el m\u00e1s f\u00e1cil de los diez. Puede ser tu primero.'
          } },
        { id: 'randomWalk', t: 'A Random Walk Down Wall Street', a: 'Burton Malkiel',
          anio: 1973, pags: 440,
          portada: 'https://covers.openlibrary.org/b/id/246978-L.jpg',
          ficha: {
            sobre: 'Malkiel lleva actualiz\u00e1ndolo desde 1973 y es el manual acad\u00e9mico m\u00e1s le\u00eddo de finanzas personales. Recorre la historia de las burbujas, explica las dos escuelas de an\u00e1lisis y termina con una gu\u00eda pr\u00e1ctica por edades.',
            resumen: 'La primera parte es un recorrido por las man\u00edas especulativas, de los tulipanes holandeses a las puntocom y las criptomonedas: siempre la misma estructura, siempre gente convencida de que esta vez es distinto. La segunda explica el <b>an\u00e1lisis t\u00e9cnico</b> \u2014 leer gr\u00e1ficos \u2014 y el <b>fundamental</b> \u2014 leer el negocio \u2014 y por qu\u00e9 el primero no funciona y el segundo es m\u00e1s dif\u00edcil de lo que parece. La tercera presenta la teor\u00eda del mercado eficiente y sus grietas reconocidas. La cuarta es la parte pr\u00e1ctica: reparto de cartera seg\u00fan tu edad y tu tolerancia al riesgo, con recomendaciones concretas.',
            porQue: 'Es el que mejor te ense\u00f1a a reconocer una burbuja mientras est\u00e1 pasando, que es exactamente el riesgo cuando alguien empieza a invertir en un mercado en subida.',
            idea: 'Un mono con los ojos vendados lanzando dardos a la p\u00e1gina de cotizaciones formar\u00eda una cartera tan buena como la de los expertos. La exageraci\u00f3n es intencionada, los datos que la sostienen no.',
            cuando: 'Despu\u00e9s de Bogle. Los dos dicen lo mismo, este con m\u00e1s historia y m\u00e1s matices.'
          } },
        { id: 'oneUp', t: 'One Up On Wall Street', a: 'Peter Lynch',
          anio: 1989, pags: 318,
          portada: 'https://covers.openlibrary.org/b/isbn/0743200403-L.jpg',
          ficha: {
            sobre: 'Lynch dirigi\u00f3 el fondo Magellan de Fidelity durante trece a\u00f1os con un rendimiento anual del 29%, probablemente el mejor registro sostenido de la historia. Aqu\u00ed explica c\u00f3mo eleg\u00eda, y su tesis es que un aficionado tiene ventajas reales sobre un profesional.',
            resumen: 'Su idea m\u00e1s conocida: <b>invierte en lo que conoces</b>. T\u00fa ves antes que Wall Street qu\u00e9 producto est\u00e1 funcionando, porque lo usas o lo ves usar en tu trabajo. Pero avisa de que la idea es s\u00f3lo el punto de partida \u2014 despu\u00e9s hay que estudiar los n\u00fameros. Clasifica las empresas en seis tipos (lentas, s\u00f3lidas, c\u00edclicas, de crecimiento r\u00e1pido, en recuperaci\u00f3n y con activos ocultos) porque cada una se compra y se vende con criterios distintos. Ense\u00f1a qu\u00e9 mirar en un balance, explica el PEG \u2014 el PER dividido entre el crecimiento \u2014 y describe los <b>tenbaggers</b>, las que multiplican por diez. Advierte contra las \u00abdiworsificaciones\u00bb: empresas que compran otras que no tienen nada que ver.',
            porQue: 'Es el manual pr\u00e1ctico de lo que t\u00fa quieres hacer: elegir empresas concretas. Lynch te dice c\u00f3mo, y tambi\u00e9n cu\u00e1nto trabajo cuesta hacerlo bien.',
            idea: 'Nunca inviertas en una empresa cuyo negocio no puedas explicar con un dibujo en una servilleta.',
            cuando: 'Cuando ya tengas claro el marco general \u2014 Graham y Bogle \u2014 y quieras pasar a escoger.'
          } },
        { id: 'psychMoney', t: 'Psicolog\u00eda del Dinero', a: 'Morgan Housel',
          alias: ['The Psychology of Money'],
          anio: 2020, pags: 289,
          portada: 'https://covers.openlibrary.org/b/id/10389354-L.jpg',
          ficha: {
            sobre: 'Housel argumenta que rendir bien con el dinero tiene poco que ver con lo que sabes y mucho con c\u00f3mo te comportas. Son diecinueve historias cortas e independientes, cada una con una idea.',
            resumen: 'Entre las que m\u00e1s pesan: nadie est\u00e1 loco \u2014 cada uno decide seg\u00fan lo que vivi\u00f3, y quien creci\u00f3 en una crisis invierte distinto que quien creci\u00f3 en una expansi\u00f3n. La suerte y el riesgo son hermanos y cuesta separarlos al juzgar un resultado. El inter\u00e9s compuesto explica la fortuna de Buffett mucho mejor que su habilidad: su ventaja no es el rendimiento, es haber empezado a los diez a\u00f1os. Ser rico y estar forrado son cosas distintas: la riqueza es el dinero que NO se ve, el que no gastaste. Y la libertad \u2014 poder decidir qu\u00e9 haces con tu d\u00eda \u2014 es el mayor dividendo que paga el dinero.',
            porQue: 'Es el m\u00e1s aplicable a tu situaci\u00f3n actual, con un fondo de emergencia por delante. Trata de comportamiento y de constancia, que es tu variable de control ahora, no de t\u00e9cnica de inversi\u00f3n.',
            idea: 'El inter\u00e9s compuesto no premia el rendimiento alto: premia el rendimiento decente sostenido durante much\u00edsimo tiempo sin interrumpirlo.',
            cuando: 'Puede ser el primero de todos. Se lee en dos tardes y no exige nada previo.'
          } },
        { id: 'iWillTeach', t: 'I Will Teach You to Be Rich', a: 'Ramit Sethi',
          anio: 2009, pags: 272,
          portada: 'https://covers.openlibrary.org/b/id/6305971-L.jpg',
          ficha: {
            sobre: 'Sethi propone un plan de seis semanas para automatizar tus finanzas personales. Es el m\u00e1s operativo del grupo: menos filosof\u00eda y m\u00e1s \u00ababre esta cuenta y programa esta transferencia\u00bb.',
            resumen: 'Semana a semana: optimizar tarjetas y cr\u00e9dito, abrir las cuentas correctas, arrancar la inversi\u00f3n, hacer un reparto consciente del gasto y automatizar los traspasos para que todo ocurra solo el d\u00eda de la n\u00f3mina. Su idea central es el <b>gasto consciente</b>: en vez de recortar en todo, gasta sin culpa en las dos o tres cosas que de verdad disfrutas y recorta con brutalidad en el resto. Y su argumento contra los consejos de caf\u00e9: preocuparse por cinco euros al d\u00eda distrae de las decisiones grandes \u2014 sueldo, vivienda, inversi\u00f3n \u2014 que mueven cien veces m\u00e1s dinero.',
            porQue: 'Encaja con tu quincena de BBVA y tu semanal de Didi: la automatizaci\u00f3n es lo que evita que el fondo de emergencia dependa de acordarte.',
            idea: 'C\u00e9ntrate en las pocas decisiones grandes en vez de en las cien peque\u00f1as: ah\u00ed est\u00e1 el dinero de verdad.',
            cuando: 'Ahora mismo. Es el que m\u00e1s rinde estando en la Fase 1.'
          } },
        { id: 'millionaireNextDoor', t: 'The Millionaire Next Door', a: 'Thomas Stanley',
          anio: 1996, pags: 258,
          portada: 'https://covers.openlibrary.org/b/id/797467-L.jpg',
          ficha: {
            sobre: 'Stanley y Danko entrevistaron durante veinte a\u00f1os a personas con patrimonio alto en Estados Unidos esperando encontrar un perfil de lujo. Encontraron lo contrario, y el libro es ese hallazgo documentado.',
            resumen: 'El millonario t\u00edpico no vive en el barrio caro ni conduce coche nuevo: vive por debajo de sus posibilidades, en una casa modesta, y acumula porque gasta poco en relaci\u00f3n con lo que gana. Separan a los <b>PAW</b> \u2014 acumuladores prodigiosos \u2014 de los <b>UAW</b>, que ganan mucho y no tienen nada, con una f\u00f3rmula para calcular en cu\u00e1l est\u00e1s seg\u00fan tu edad e ingresos. Dedican cap\u00edtulos a por qu\u00e9 muchos profesionales de ingresos altos son pobres en patrimonio (el gasto sube con el sueldo) y a c\u00f3mo la ayuda econ\u00f3mica continuada a los hijos adultos suele reducir su capacidad de generar riqueza.',
            porQue: 'Es el ant\u00eddoto contra confundir ingreso con riqueza. Con ingresos variables como los tuyos, la distinci\u00f3n importa m\u00e1s todav\u00eda.',
            idea: 'La riqueza no es lo que ganas: es lo que no gastas. Un sueldo alto con gasto alto produce cero.',
            cuando: 'Con Psicolog\u00eda del Dinero. Se refuerzan.'
          } },
        { id: 'tuDinero', t: 'Tu Dinero o Tu Vida', a: 'Vicki Robin',
          alias: ['Your Money or Your Life'],
          anio: 1992, pags: 376,
          portada: 'https://covers.openlibrary.org/b/id/6975229-L.jpg',
          ficha: {
            sobre: 'Robin y Dominguez plantean una relaci\u00f3n distinta con el dinero: verlo como energ\u00eda vital, porque lo cambias por horas de tu vida que no vuelven. Es el libro fundacional del movimiento de independencia financiera.',
            resumen: 'Un programa de nueve pasos. Empieza calculando cu\u00e1nto has ganado en toda tu vida y qu\u00e9 patrimonio tienes hoy \u2014 la diferencia suele doler. Despu\u00e9s calcula tu <b>salario real por hora</b> restando del sueldo todo lo que el trabajo te cuesta: transporte, ropa, comidas fuera, el tiempo de desplazamiento, el gasto de desconectar el fin de semana. Con esa cifra, cada compra se eval\u00faa en horas de vida y no en dinero. Luego lleva un registro de todo lo que gastas y lo punt\u00faas por satisfacci\u00f3n real. El objetivo final es el <b>punto de cruce</b>: el d\u00eda en que los ingresos de tus inversiones superan tus gastos, que es cuando trabajar se vuelve opcional.',
            porQue: 'El c\u00e1lculo del salario real por hora encaja con tu situaci\u00f3n: entre ALTEN y las horas de Didi, saber cu\u00e1nto vale de verdad tu hora cambia qu\u00e9 decisiones tomas.',
            idea: 'El dinero es energ\u00eda vital: lo cambias por horas que no recuperas, as\u00ed que el precio real de algo se mide en horas de tu vida.',
            cuando: 'Cuando quieras replantear el marco entero, no s\u00f3lo optimizar dentro del que tienes.'
          } },
        { id: 'padreRico', t: 'Padre Rico, Padre Pobre', a: 'Robert Kiyosaki',
          alias: ['Rich Dad Poor Dad', 'Rich Dad, Poor Dad'],
          anio: 1990, pags: 241,
          portada: 'https://covers.openlibrary.org/b/id/8315603-L.jpg',
          ficha: {
            sobre: 'Kiyosaki contrapone dos figuras: su padre biol\u00f3gico, profesor con empleo estable, y el padre de su amigo, empresario. Es el libro de finanzas personales m\u00e1s vendido de la historia y tambi\u00e9n el m\u00e1s discutido.',
            resumen: 'Su aportaci\u00f3n que s\u00ed vale: la distinci\u00f3n entre <b>activo</b> \u2014 lo que mete dinero en tu bolsillo \u2014 y <b>pasivo</b> \u2014 lo que lo saca \u2014 y la observaci\u00f3n de que mucha gente compra pasivos creyendo que son activos, empezando por la casa propia con hipoteca. De ah\u00ed sale la <b>carrera de la rata</b>: subes de sueldo, subes de nivel de vida, y sigues igual de atado. Tambi\u00e9n habla de alfabetizaci\u00f3n financiera y de que la escuela no la ense\u00f1a. Ahora lo criticable: las an\u00e9cdotas est\u00e1n probablemente adornadas, el \u00abpadre rico\u00bb nunca se ha identificado, y varios de sus consejos concretos \u2014 sobre deuda y bienes ra\u00edces \u2014 son imprudentes.',
            porQue: 'Est\u00e1 en la lista por la distinci\u00f3n activo/pasivo, que es s\u00f3lida y ordena la cabeza. El resto conviene leerlo con distancia.',
            idea: 'Los ricos compran activos; los dem\u00e1s compran pasivos creyendo que son activos.',
            cuando: 'Pronto, es f\u00e1cil de leer, pero con Graham y Bogle tambi\u00e9n en la lista para equilibrarlo.'
          } },
        { id: 'fastlane', t: 'The Millionaire Fastlane', a: 'MJ DeMarco',
          anio: 2011, pags: 332,
          portada: 'https://covers.openlibrary.org/b/id/7892520-L.jpg',
          ficha: {
            sobre: 'DeMarco ataca directamente la idea de ahorrar cuarenta a\u00f1os para jubilarse rico, a la que llama el \u00abcarril lento\u00bb. Su alternativa es construir algo que crezca sin depender de tus horas.',
            resumen: 'Divide a la gente en tres caminos: la acera (gastar todo, sin plan), el carril lento (trabajar y ahorrar cuarenta a\u00f1os) y el carril r\u00e1pido (crear un negocio que escale). Su cr\u00edtica al carril lento es que hace depender la riqueza de una variable que no controlas \u2014 el tiempo \u2014 y de un rendimiento que no puedes acelerar. Propone cinco filtros para saber si una idea sirve: necesidad real, barrera de entrada, control sobre tu negocio, escala y tiempo desacoplado de los ingresos. Insiste en que el dinero est\u00e1 en resolver problemas a mucha gente, y en que el n\u00famero de personas a las que llegas multiplicado por el impacto es lo que determina cu\u00e1nto ganas.',
            porQue: 'Es el que mejor explica por qu\u00e9 el ingreso de Didi tiene techo: cambia horas por dinero, uno a uno, sin apalancamiento.',
            idea: 'Si tus ingresos dependen de tu presencia, no tienes un negocio: tienes un empleo que adem\u00e1s administras t\u00fa.',
            cuando: 'Cuando est\u00e9s decidiendo en qu\u00e9 invertir tu tiempo libre, no tu dinero.'
          } },
        { id: 'cerdo', t: 'Peque\u00f1o Cerdo Capitalista', a: 'Sof\u00eda Mac\u00edas',
          anio: 2021, pags: 288,
          portada: 'https://covers.openlibrary.org/b/id/12422219-L.jpg',
          ficha: {
            sobre: 'Sof\u00eda Mac\u00edas escribe finanzas personales para M\u00e9xico, y eso es lo que lo separa de casi todo lo dem\u00e1s de la lista: habla de pesos, de CETES, del SAT y del Bur\u00f3 de Cr\u00e9dito, no de 401k ni de Roth IRA.',
            resumen: 'Empieza por el diagn\u00f3stico: sacar todos los n\u00fameros a la mesa, incluidos los gastos hormiga que no aparecen en ning\u00fan presupuesto porque son de cien pesos. Despu\u00e9s el orden de operaciones \u2014 fondo de emergencia antes que nada, deuda cara despu\u00e9s, inversi\u00f3n al final \u2014 y c\u00f3mo montar el fondo con instrumentos que existen aqu\u00ed. Dedica cap\u00edtulos enteros a la deuda mexicana: qu\u00e9 es el CAT, por qu\u00e9 es el \u00fanico n\u00famero que compara tarjetas de verdad, c\u00f3mo funciona el Bur\u00f3 y qu\u00e9 se puede negociar. Cierra con una introducci\u00f3n a inversi\u00f3n en CETES y fondos.',
            porQue: 'Es el que mejor encaja con tu Fase 1 porque los productos de los que habla son los que t\u00fa puedes contratar. Bogle y Graham te dan el marco; este te dice d\u00f3nde meter el dinero en M\u00e9xico.',
            idea: 'El CAT es el \u00fanico n\u00famero que compara dos cr\u00e9ditos de verdad: la tasa a secas esconde comisiones y seguros.',
            cuando: 'Ahora, con el fondo de emergencia por delante. Es el m\u00e1s aplicable de todos a tu situaci\u00f3n.'
          } },
        { id: 'cerdoInv', t: 'Peque\u00f1o Cerdo Capitalista: Inversiones', a: 'Sof\u00eda Mac\u00edas',
          anio: 2014, pags: 448,
          alias: ['Peque\u00f1o Cerdo Capitalista: Inversiones'],
          portada: 'https://covers.openlibrary.org/b/id/11142387-L.jpg',
          ficha: {
            sobre: 'La continuaci\u00f3n del anterior, dedicada s\u00f3lo a invertir. Mismo enfoque: instrumentos mexicanos, cifras en pesos y tr\u00e1mites reales.',
            resumen: 'Recorre lo que puedes contratar aqu\u00ed y qu\u00e9 esperar de cada cosa: CETES y bonos gubernamentales por cetesdirecto, fondos de inversi\u00f3n, la bolsa mexicana y el SIC \u2014que es por donde compras acciones de Estados Unidos desde M\u00e9xico, que es exactamente lo que haces con GBM\u2014, adem\u00e1s de FIBRAS y de las afores. Explica el perfil de riesgo, la diversificaci\u00f3n y el horizonte, y dedica espacio a los impuestos: qu\u00e9 retiene cada instrumento y qu\u00e9 tienes que declarar.',
            porQue: 'Es el puente entre la teor\u00eda de Bogle y tu cuenta de GBM: te explica c\u00f3mo se compra desde aqu\u00ed lo que aquellos libros dan por hecho.',
            idea: 'Invertir en empresas de Estados Unidos desde M\u00e9xico pasa por el SIC, y eso cambia comisiones e impuestos respecto a lo que cuenta un libro americano.',
            cuando: 'Despu\u00e9s del primer Peque\u00f1o Cerdo y de Bogle.'
          } },
        { id: 'profitFirst', t: 'Profit First', a: 'Mike Michalowicz',
          anio: 2014, pags: 207,
          portada: 'https://covers.openlibrary.org/b/id/13193805-L.jpg',
          ficha: {
            sobre: 'Michalowicz propone dar la vuelta a la f\u00f3rmula contable de siempre. En vez de \u00abingresos menos gastos igual a ganancia\u00bb, propone \u00abingresos menos ganancia igual a gastos\u00bb: apartar primero, gastar con lo que quede.',
            resumen: 'El m\u00e9todo es de cuentas separadas: cada vez que entra dinero se reparte de inmediato en varias cuentas con porcentajes fijos \u2014beneficio, impuestos, sueldo del due\u00f1o y gastos\u2014 y cada gasto sale de la suya. Su argumento es psicol\u00f3gico antes que financiero: si el dinero de los impuestos est\u00e1 en otra cuenta, no lo gastas; si tienes una sola cuenta con todo junto, el gasto se expande hasta llenarla. Recomienda hacer los traspasos dos veces al mes y subir los porcentajes poco a poco. Est\u00e1 escrito para negocios peque\u00f1os, pero funciona igual para un ingreso personal variable.',
            porQue: 'Encaja con tu situaci\u00f3n exacta: dos ingresos de ritmo distinto \u2014la quincena de BBVA y lo semanal de Didi\u2014 y ning\u00fan reparto autom\u00e1tico entre ellos.',
            idea: 'El gasto se expande hasta llenar la cuenta que ve. Apartar primero no es disciplina: es quitar de la vista.',
            cuando: 'Con I Will Teach You to Be Rich, que dice lo mismo desde el lado de automatizar.'
          } },
        { id: 'simplePath', t: 'The Simple Path to Wealth', a: 'JL Collins',
          anio: 2000, pags: 289,
          portada: 'https://covers.openlibrary.org/b/id/10448941-L.jpg',
          ficha: {
            sobre: 'Collins escribi\u00f3 esto como una serie de cartas a su hija, y se nota: es el libro de inversi\u00f3n m\u00e1s f\u00e1cil de leer que existe sin ser simpl\u00f3n.',
            resumen: 'Su tesis cabe en una frase: gasta menos de lo que ganas, invierte la diferencia en un fondo indexado total del mercado y no toques nada. Alrededor de eso construye lo dem\u00e1s. El fondo de emergencia y por qu\u00e9 va antes que invertir. La deuda, que llama emergencia y no un asunto pendiente. La idea de <b>f-you money</b>: el dinero suficiente para poder decir que no, que aparece mucho antes que la independencia financiera completa. La regla del 4% y cu\u00e1nto necesitas realmente. Y la parte m\u00e1s \u00fatil: qu\u00e9 hacer cuando el mercado se derrumba, que es no hacer nada, explicado con datos de las ca\u00eddas anteriores.',
            porQue: 'Es el m\u00e1s corto y directo sobre por qu\u00e9 el fondo de emergencia va PRIMERO. Justo el escal\u00f3n donde est\u00e1s.',
            idea: 'El mercado siempre sube a largo plazo, pero el camino es violento. Tu \u00fanico trabajo durante una ca\u00edda es no vender.',
            cuando: 'Junto a Bogle. Dicen lo mismo, este m\u00e1s ameno.'
          } },
        { id: 'bogleheads', t: 'The Bogleheads\' Guide to Investing', a: 'Larimore, Lindauer y LeBoeuf',
          anio: 2006, pags: 307,
          alias: ['The Bogleheads\u2019 Guide to Investing'],
          portada: 'https://covers.openlibrary.org/b/id/306608-L.jpg',
          ficha: {
            sobre: 'Escrito por tres veteranos de la comunidad Bogleheads, el foro de seguidores de John Bogle. Es m\u00e1s manual y menos ensayo que los otros: tiene tablas, pasos y cap\u00edtulos de consulta.',
            resumen: 'El coraz\u00f3n es el <b>reparto de cartera</b> \u2014 cu\u00e1nto en acciones y cu\u00e1nto en renta fija \u2014 y por qu\u00e9 esa decisi\u00f3n explica la mayor parte de tu resultado, mucho m\u00e1s que elegir bien las acciones concretas. Explica c\u00f3mo ajustarlo seg\u00fan tu edad y tu tolerancia real al riesgo, no la que crees tener. Despu\u00e9s: c\u00f3mo elegir fondos mirando el coste, c\u00f3mo hacer el <b>rebalanceo</b> peri\u00f3dico y por qu\u00e9 obliga a comprar barato y vender caro sin pensarlo, la eficiencia fiscal, y los errores de comportamiento m\u00e1s caros. Es un libro para consultar por cap\u00edtulos, no para leer de cabo a rabo.',
            porQue: 'Es el que mejor explica el reparto de cartera, que es la decisi\u00f3n que tienes que tomar antes de comprar tu primera acci\u00f3n por GBM.',
            idea: 'La proporci\u00f3n entre acciones y renta fija decide m\u00e1s de tu resultado que cualquier acci\u00f3n concreta que elijas.',
            cuando: 'Cuando vayas a decidir en qu\u00e9 proporci\u00f3n invertir. El cap\u00edtulo de asset allocation es el que importa.'
          } },
      ] },
      { n: 'Copywriting', color: '#7048e8', items: [
        { id: 'breakthrough', t: 'Breakthrough Advertising', a: 'Eugene Schwartz',
          anio: 1966, pags: 236,
          portada: 'https://covers.openlibrary.org/b/id/11942597-L.jpg',
          ficha: {
            sobre: 'Escrito en 1966 y descatalogado durante d\u00e9cadas, lleg\u00f3 a venderse de segunda mano por cientos de d\u00f3lares. Es el libro de copywriting m\u00e1s respetado que existe, y tambi\u00e9n el m\u00e1s dif\u00edcil: Schwartz no explica c\u00f3mo escribir bonito, explica c\u00f3mo funciona el deseo.',
            resumen: 'Su idea fundacional: <b>el copy no crea deseo, lo canaliza</b>. La demanda de estar en forma o de ganar m\u00e1s ya existe en millones de personas; tu trabajo es dirigir ese deseo hacia tu producto. De ah\u00ed sale su aportaci\u00f3n m\u00e1s citada, los <b>cinco niveles de consciencia</b> del cliente: quien no sabe que tiene un problema, quien lo sabe, quien conoce que hay soluciones, quien conoce tu producto, y quien ya est\u00e1 convencido. Cada nivel exige un titular distinto, y escribirle a uno como si fuera otro es el error que hunde una campa\u00f1a. A\u00f1ade los <b>tres niveles de sofisticaci\u00f3n del mercado</b>: seg\u00fan cu\u00e1ntos competidores han hecho ya la misma promesa, tienes que prometer m\u00e1s, prometer distinto o cambiar el mecanismo.',
            porQue: 'Es la base te\u00f3rica de todo lo dem\u00e1s que se escribe hoy sobre persuasi\u00f3n, incluido Hormozi. Es denso y viejo, y aun as\u00ed el que m\u00e1s rinde a largo plazo.',
            idea: 'No puedes crear deseo en un mercado: s\u00f3lo puedes capturar el que ya existe y dirigirlo hacia tu oferta.',
            cuando: 'No lo pongas de primero. Empieza por Sugarman o Cashvertising y vuelve a este cuando ya escribas.'
          } },
        { id: 'cashvertising', t: 'Ca$hvertising', a: 'Drew Eric Whitman',
          anio: 2008, pags: 236,
          portada: 'https://covers.openlibrary.org/b/id/8537250-L.jpg',
          ficha: {
            sobre: 'Whitman traduce la psicolog\u00eda del consumidor a t\u00e9cnicas concretas. Es el m\u00e1s directo del grupo: poca teor\u00eda, muchas herramientas numeradas y listas para usar.',
            resumen: 'Arranca con los <b>ocho deseos vitales</b> \u2014 supervivencia, comida, ausencia de miedo, sexo, comodidad, superioridad, cuidado de los seres queridos y aprobaci\u00f3n social \u2014 y sostiene que toda venta que funciona toca alguno. Despu\u00e9s despliega diecisiete principios de psicolog\u00eda aplicada (miedo, transferencia de autoridad, comparaci\u00f3n, prueba) y m\u00e1s de cien t\u00e9cnicas de redacci\u00f3n: c\u00f3mo escribir titulares, qu\u00e9 palabras mueven, c\u00f3mo estructurar un anuncio, c\u00f3mo usar el espacio en blanco. Es un cat\u00e1logo, no un ensayo.',
            porQue: 'Es el que puedes aplicar el mismo d\u00eda que lo lees, sin necesidad de entender la teor\u00eda de fondo. Bien acompa\u00f1ado de Schwartz, que s\u00ed la da.',
            idea: 'La gente no compra el producto: compra lo que el producto hace por uno de sus ocho deseos b\u00e1sicos.',
            cuando: 'El primero del grupo, por lo pr\u00e1ctico.'
          } },
        { id: 'adweek', t: 'The Adweek Copywriting Handbook', a: 'Joseph Sugarman',
          anio: 2006, pags: 349,
          portada: 'https://covers.openlibrary.org/b/id/299664-L.jpg',
          ficha: {
            sobre: 'Sugarman vendi\u00f3 millones de d\u00f3lares en productos por cat\u00e1logo y correo directo antes de internet, y este libro recoge lo que aprendi\u00f3 escribiendo esos anuncios. Es m\u00e1s artesanal y m\u00e1s ameno que los otros.',
            resumen: 'Su idea central es el <b>tobog\u00e1n resbaladizo</b>: la \u00fanica funci\u00f3n del titular es que leas la primera frase; la de la primera frase, que leas la segunda; y as\u00ed hasta el final. Por eso defiende primeras frases muy cortas, casi absurdamente cortas, que no cuesten nada empezar. Desarrolla treinta y un elementos psicol\u00f3gicos de la venta, con la <b>semilla de curiosidad</b> entre ellos \u2014 insinuar algo que se resolver\u00e1 m\u00e1s adelante para que sigas leyendo. Y dedica cap\u00edtulos a la mec\u00e1nica: c\u00f3mo editar hasta dejarlo tenso, por qu\u00e9 el copy largo vende m\u00e1s que el corto cuando el producto lo requiere. Cierra analizando sus propios anuncios l\u00ednea a l\u00ednea.',
            porQue: 'Es el que mejor ense\u00f1a el oficio de escribir, no s\u00f3lo la estrategia. Los ejemplos comentados valen tanto como la teor\u00eda.',
            idea: 'Cada frase existe con un \u00fanico prop\u00f3sito: conseguir que se lea la siguiente.',
            cuando: 'Despu\u00e9s de Cashvertising y antes de Schwartz.'
          } },
        { id: 'storybrand', t: 'Building a StoryBrand', a: 'Donald Miller',
          anio: 2017, pags: 240,
          portada: 'https://covers.openlibrary.org/b/id/8458703-L.jpg',
          ficha: {
            sobre: 'Miller aplica la estructura del relato cl\u00e1sico a c\u00f3mo una empresa se explica. Su diagn\u00f3stico es que casi todas las marcas hablan de s\u00ed mismas cuando deber\u00edan hablar del cliente.',
            resumen: 'Su marco tiene siete piezas: hay un <b>personaje</b> \u2014 el cliente, no t\u00fa \u2014 que tiene un <b>problema</b>, se encuentra con un <b>gu\u00eda</b> \u2014 ah\u00ed est\u00e1s t\u00fa \u2014 que le da un <b>plan</b>, le <b>llama a la acci\u00f3n</b>, y as\u00ed evita un <b>fracaso</b> y consigue un <b>\u00e9xito</b>. La regla que lo ordena todo: el cliente es el h\u00e9roe y t\u00fa eres Yoda, no Luke. Insiste en que la confusi\u00f3n mata m\u00e1s ventas que la mala calidad: si alguien no entiende en cinco segundos qu\u00e9 ofreces y qu\u00e9 gana, se va. Y da guiones concretos para la web, el correo y la presentaci\u00f3n de una empresa.',
            porQue: 'Es el m\u00e1s \u00fatil para presentar lo que hagas, incluido presentarte a ti mismo en una entrevista: el marco funciona igual para una web que para un curr\u00edculum.',
            idea: 'El cliente es el h\u00e9roe de la historia; t\u00fa eres el gu\u00eda. Cuando te pones de h\u00e9roe, dejas de vender.',
            cuando: 'Cuando tengas que escribir una web, una propuesta o presentarte. Es muy pr\u00e1ctico y muy corto.'
          } },
        { id: 'everybody', t: 'Everybody Writes', a: 'Ann Handley',
          anio: 2014, pags: 320,
          portada: 'https://covers.openlibrary.org/b/id/8449611-L.jpg',
          ficha: {
            sobre: 'Handley trata la escritura como una habilidad de trabajo, no de artista. El t\u00edtulo es su tesis: en un puesto moderno todo el mundo escribe, y escribir mal cuesta oportunidades aunque nadie te lo diga.',
            resumen: 'La primera parte son reglas de escritura: empieza por el lector y no por ti, usa la voz activa, corta los adverbios y las palabras de relleno, y escribe un primer borrador malo a prop\u00f3sito porque el trabajo real es reescribir. La segunda parte son formatos concretos \u2014correo, publicaci\u00f3n, p\u00e1gina de aterrizaje, informe\u2014 con lo que funciona en cada uno. Y en medio, un tema que atraviesa el libro: la <b>empat\u00eda con el lector</b>, que en la pr\u00e1ctica significa escribir lo que necesita saber, no lo que a ti te apetece contar.',
            porQue: 'Es el m\u00e1s aplicable a tu d\u00eda a d\u00eda: correos a ALTEN, mensajes a reclutadores y la documentaci\u00f3n que escribes. No hace falta querer ser copywriter.',
            idea: 'Nadie tiene un primer borrador bueno. Escribir bien no es escribir a la primera: es reescribir.',
            cuando: 'El primero del grupo de copy, antes que Schwartz o Sugarman.'
          } },
        { id: 'blyCopy', t: 'The Copywriter\'s Handbook', a: 'Robert Bly',
          anio: 1985, pags: 352,
          alias: ['The Copywriter\u2019s Handbook'],
          portada: 'https://covers.openlibrary.org/b/id/579121-L.jpg',
          ficha: {
            sobre: 'Bly lleva m\u00e1s de cuarenta a\u00f1os escribiendo publicidad de respuesta directa. Este es su manual de oficio y probablemente el m\u00e1s completo del grupo.',
            resumen: 'Empieza por los titulares: da cuatro funciones que debe cumplir uno \u2014captar atenci\u00f3n, seleccionar al lector, entregar un mensaje y llevar al cuerpo\u2014 y treinta y ocho plantillas probadas. Despu\u00e9s, la f\u00f3rmula <b>AIDA</b> \u2014atenci\u00f3n, inter\u00e9s, deseo, acci\u00f3n\u2014 y otras estructuras. Dedica cap\u00edtulos a cada formato: anuncio, carta de venta, folleto, correo, p\u00e1gina web. Y una parte muy \u00fatil sobre el proceso: c\u00f3mo investigar antes de escribir, qu\u00e9 preguntar al cliente, c\u00f3mo revisar y c\u00f3mo probar dos versiones.',
            porQue: 'Es el manual de referencia del grupo. Sugarman ense\u00f1a a enganchar y Schwartz el fondo te\u00f3rico; este es el que tiene las plantillas.',
            idea: 'El titular tiene una sola funci\u00f3n real: seleccionar a qui\u00e9n le interesa lo que sigue y dejar fuera al resto.',
            cuando: 'Despu\u00e9s de Everybody Writes y de Cashvertising.'
          } },
        { id: 'coldEmail', t: 'The Cold Email Manifesto', a: 'Alex Berman',
          anio: 2021, pags: 130,
          frasco: 'libro', marca: {a: '#f4f2ee', b: '#7048e8'},
          ficha: {
            sobre: 'Un libro corto y muy espec\u00edfico sobre correo en fr\u00edo: c\u00f3mo escribirle a alguien que no te conoce y conseguir respuesta. Se lee en una tarde.',
            resumen: 'Su estructura se resume en tres frases: qui\u00e9n eres, qu\u00e9 has hecho por alguien parecido a \u00e9l, y una petici\u00f3n peque\u00f1a y concreta. Insiste en que el correo en fr\u00edo no vende, s\u00f3lo consigue la conversaci\u00f3n, y que pedir demasiado en el primer mensaje es lo que lo mata. Da f\u00f3rmulas de asunto, el largo que funciona \u2014muy corto\u2014, y el sistema de seguimiento: varios toques espaciados, porque casi todas las respuestas llegan despu\u00e9s del primero. Tambi\u00e9n explica c\u00f3mo construir la lista y c\u00f3mo personalizar a escala sin que suene a plantilla.',
            porQue: 'Es directamente aplicable a buscar trabajo: escribirle a un reclutador o a un ingeniero de Wayve es exactamente correo en fr\u00edo.',
            idea: 'Un correo en fr\u00edo no vende nada: s\u00f3lo pide la conversaci\u00f3n. Cuanto m\u00e1s peque\u00f1o el favor que pides, m\u00e1s probable la respuesta.',
            cuando: 'Cuando empieces a contactar gente para las entrevistas. Es el m\u00e1s corto de los 60.'
          } },
        { id: 'onWriting', t: 'On Writing Well', a: 'William Zinsser',
          anio: 1976, pags: 288,
          portada: 'https://covers.openlibrary.org/b/id/20450-L.jpg',
          ficha: {
            sobre: 'Zinsser fue periodista y profesor en Yale, y este es el cl\u00e1sico sobre escribir no ficci\u00f3n: informes, art\u00edculos, documentaci\u00f3n, memorias. Lleva cuarenta a\u00f1os reedit\u00e1ndose.',
            resumen: 'Su obsesi\u00f3n es la <b>simplicidad</b>: sostiene que el enemigo de la escritura clara no es la falta de talento sino el desorden \u2014 palabras que no aportan, frases que se adornan, jerga que finge autoridad. Ense\u00f1a a podar sin piedad, y en la edici\u00f3n comentada ense\u00f1a sus propios manuscritos tachados. Dedica cap\u00edtulos a la voz propia, al uso de los verbos, al ritmo de la frase y a los finales. Y una idea que atraviesa todo: escribes para pensar, no para lucirte; si no puedes explicarlo simple es que no lo entiendes.',
            porQue: 'Es el que m\u00e1s te sirve para escribir documentaci\u00f3n t\u00e9cnica y para las respuestas largas de una entrevista. La claridad se nota m\u00e1s ah\u00ed que en un anuncio.',
            idea: 'El secreto de escribir bien es quitar de cada frase las palabras que no hacen ning\u00fan trabajo.',
            cuando: 'Los cap\u00edtulos 2 a 5 son el n\u00facleo. El resto se puede hojear.'
          } },
      ] },
      { n: 'Datos', color: '#1971c2', items: [
        { id: 'storytellingData', t: 'Storytelling with Data', a: 'Cole Nussbaumer Knaflic',
          anio: 2015, pags: 288,
          portada: 'https://covers.openlibrary.org/b/id/7932707-L.jpg',
          ficha: {
            sobre: 'Knaflic trabaj\u00f3 en el equipo de anal\u00edtica de Google y este es el libro de referencia para comunicar datos. No trata de qu\u00e9 gr\u00e1fico es m\u00e1s bonito sino de qu\u00e9 hace que alguien entienda y act\u00fae.',
            resumen: 'Seis lecciones. Entender el contexto \u2014 a qui\u00e9n le hablas y qu\u00e9 quieres que haga \u2014 antes de abrir ninguna herramienta. Elegir la representaci\u00f3n adecuada, con criterios claros: por qu\u00e9 la tarta casi nunca sirve, por qu\u00e9 la barra horizontal casi siempre s\u00ed. Eliminar el <b>desorden</b>: cada l\u00ednea de rejilla, borde o efecto que no aporta carga cognitiva sin dar informaci\u00f3n. Dirigir la atenci\u00f3n con <b>atributos preatentivos</b> \u2014 el color, el grosor, el tama\u00f1o \u2014 para que el ojo vaya donde t\u00fa quieres antes de que el cerebro lea. Pensar como un dise\u00f1ador (jerarqu\u00eda, alineaci\u00f3n, espacio en blanco). Y contar una historia con principio, tensi\u00f3n y desenlace, en vez de soltar una tabla.',
            porQue: 'Es directamente aplicable a tu trabajo en ALTEN y a cualquier informe que presentes. De los 44, es el de retorno m\u00e1s inmediato en tu empleo actual.',
            idea: 'Un gr\u00e1fico no se hace poniendo cosas: se hace quitando todo lo que no ayuda a entender.',
            cuando: 'Ya. Se aplica desde el primer cap\u00edtulo.'
          } },
        { id: 'pythonData', t: 'Python for Data Analysis', a: 'Wes McKinney',
          anio: 2012, pags: 508,
          portada: 'https://covers.openlibrary.org/b/id/7548132-L.jpg',
          ficha: {
            sobre: 'McKinney es el creador de pandas, la biblioteca con la que se manipulan datos en Python. Este es su manual oficial y el est\u00e1ndar de facto para aprender el ecosistema.',
            resumen: 'Es un libro de referencia, no de lectura seguida. Cubre NumPy y los arrays, y sobre todo pandas: Series y DataFrames, c\u00f3mo cargar datos de CSV, Excel, JSON o bases de datos, c\u00f3mo limpiar lo que viene sucio \u2014 nulos, duplicados, tipos mal detectados \u2014, c\u00f3mo reestructurar tablas con pivot y melt, c\u00f3mo agrupar y agregar con groupby, c\u00f3mo trabajar con fechas y series temporales, y c\u00f3mo dibujar lo b\u00e1sico con matplotlib. Termina con casos de an\u00e1lisis reales de principio a fin.',
            porQue: 'Es la herramienta, no la idea. Va con Storytelling with Data: uno te da los datos limpios y el otro te dice c\u00f3mo ense\u00f1arlos.',
            idea: 'El 80% del trabajo con datos es limpiarlos y reestructurarlos; el an\u00e1lisis en s\u00ed es la parte corta.',
            cuando: 'Como manual de consulta mientras haces algo real, nunca de cabo a rabo.'
          } },
      ] },
      { n: 'Networking', color: '#c2255c', items: [
        { id: 'neverEatAlone', t: 'Never Eat Alone', a: 'Keith Ferrazzi',
          anio: 2005, pags: 326,
          portada: 'https://covers.openlibrary.org/b/id/6802201-L.jpg',
          ficha: {
            sobre: 'Ferrazzi cuenta c\u00f3mo pas\u00f3 de una familia obrera a director de marketing de una gran consultora, y sostiene que la diferencia fue su forma de relacionarse. El t\u00edtulo es literal: no comas solo, cada comida es una oportunidad.',
            resumen: 'Su premisa es que las relaciones no son un intercambio de favores sino un m\u00fasculo: cuanto m\u00e1s las usas, m\u00e1s fuertes se ponen. De ah\u00ed salen sus pr\u00e1cticas: dar antes de pedir y sin llevar la cuenta; ser <b>generoso con lo que sabes</b> en vez de guard\u00e1rtelo; hacer los deberes antes de conocer a alguien; el <b>ping constante</b> \u2014 mantener contacto ligero y frecuente con mucha gente, no llamar s\u00f3lo cuando necesitas algo; y construir una red diversa, porque las oportunidades suelen venir de contactos lejanos y no del c\u00edrculo \u00edntimo. Incluye t\u00e1cticas concretas para hablar con desconocidos, para eventos y para no quedarse atascado en la conversaci\u00f3n de siempre.',
            porQue: 'Es el libro de networking m\u00e1s aplicable si vienes de perfil t\u00e9cnico: da un m\u00e9todo en vez de pedirte que seas extrovertido.',
            idea: 'El error es acordarse de la red cuando hace falta. La red se construye cuando no hace falta nada.',
            cuando: 'El primero del grupo.'
          } },
        { id: 'carnegie', t: 'C\u00f3mo Ganar Amigos e Influir sobre las Personas', a: 'Dale Carnegie',
          alias: ['How to Win Friends and Influence People'],
          anio: 1936, pags: 280,
          portada: 'https://covers.openlibrary.org/b/isbn/0671027034-L.jpg',
          ficha: {
            sobre: 'Publicado en 1936 y con m\u00e1s de treinta millones de ejemplares vendidos, es el abuelo de todos los libros de relaciones. Suena antiguo en los ejemplos y sigue siendo exacto en el fondo.',
            resumen: 'Son listas de principios con an\u00e9cdotas. Para tratar con la gente: no critiques ni te quejes, da aprecio sincero, y despierta en el otro un deseo. Para caer bien: inter\u00e9sate de verdad por los dem\u00e1s, sonr\u00ede, recuerda y usa su nombre, escucha, habla de lo que a ellos les interesa y hazles sentir importantes con sinceridad. Para convencer sin ofender: evita la discusi\u00f3n, nunca digas \u00abest\u00e1s equivocado\u00bb, admite tus errores r\u00e1pido, empieza de forma amistosa y consigue que digan s\u00ed desde el principio. Y para corregir sin humillar: empieza elogiando, se\u00f1ala los errores de forma indirecta, y habla de los propios antes.',
            porQue: 'Es la base de todo el grupo y de buena parte del de Ventas. Los ejemplos de 1936 se perdonan porque la mec\u00e1nica humana no ha cambiado.',
            idea: 'El nombre de una persona es, para ella, el sonido m\u00e1s dulce en cualquier idioma.',
            cuando: 'Con Never Eat Alone. Este da el fundamento, aquel el m\u00e9todo moderno.'
          } },
        { id: 'giveAndTake', t: 'Give and Take', a: 'Adam Grant',
          anio: 2013, pags: 314,
          portada: 'https://covers.openlibrary.org/b/id/7391212-L.jpg',
          ficha: {
            sobre: 'Grant, profesor de Wharton, investiga con datos qu\u00e9 tipo de persona acaba llegando m\u00e1s lejos en su carrera. Su respuesta tiene un giro que sostiene el libro entero.',
            resumen: 'Divide a la gente en tres estilos: <b>los que dan</b>, <b>los que toman</b> y <b>los que igualan</b> \u2014 que dan esperando reciprocidad. Al medir el \u00e9xito profesional, quienes dan aparecen en los dos extremos: son los que peor rendimiento tienen y tambi\u00e9n los mejores. La diferencia entre unos y otros no es cu\u00e1nto dan, sino si adem\u00e1s saben cuidar de sus propios intereses: quien da sin l\u00edmite se agota y lo explotan; quien da con criterio construye una red que le devuelve mucho m\u00e1s de lo que puso. Documenta que dar es m\u00e1s ventajoso cuanto m\u00e1s largo es el plazo y m\u00e1s conectada est\u00e1 la industria, porque la reputaci\u00f3n circula.',
            porQue: 'Corrige el riesgo de Never Eat Alone: dar sin l\u00edmite no es la estrategia, dar con criterio s\u00ed.',
            idea: 'Los que dan ocupan el peor y el mejor puesto de la escala; lo que los separa no es la generosidad sino saber protegerse.',
            cuando: 'Despu\u00e9s de Never Eat Alone, como contrapeso.'
          } },
        { id: 'artGathering', t: 'The Art of Gathering', a: 'Priya Parker',
          anio: 2018, pags: 320,
          portada: 'https://covers.openlibrary.org/b/id/10286212-L.jpg',
          ficha: {
            sobre: 'Priya Parker es facilitadora profesional de reuniones y di\u00e1logos dif\u00edciles. El libro trata de por qu\u00e9 casi todas las reuniones \u2014 de trabajo, cenas, eventos \u2014 son mediocres, y de qu\u00e9 se puede hacer.',
            resumen: 'Empieza exigiendo un <b>prop\u00f3sito espec\u00edfico y discutible</b>: \u00abhacer networking\u00bb no es un prop\u00f3sito, \u00abque estas ocho personas salgan con un contacto que les resuelva algo\u00bb s\u00ed. Defiende la exclusi\u00f3n generosa \u2014 invitar a todo el mundo diluye el sentido y no reunir a quien no encaja es un favor para todos. Habla de la responsabilidad del anfitri\u00f3n: no ser invisible, porque cuando el anfitri\u00f3n no dirige, manda el invitado m\u00e1s dominante. Propone dise\u00f1ar un principio temporal \u2014 reglas que s\u00f3lo valen durante la reuni\u00f3n \u2014 y cuidar el principio y el final, que es lo que la gente recuerda. Y argumenta a favor de las conversaciones con riesgo frente a la charla cort\u00e9s.',
            porQue: 'Es el m\u00e1s original de la lista y el que menos se parece a los dem\u00e1s. Sirve para cualquier cosa que organices, de una cena a una reuni\u00f3n de equipo.',
            idea: 'Si tu prop\u00f3sito no puede excluir a nadie, no es un prop\u00f3sito: es una excusa para juntar gente.',
            cuando: 'Cuando te toque organizar algo. Fuera de ese momento rinde menos.'
          } },
        { id: 'likeSwitch', t: 'The Like Switch', a: 'Jack Schafer',
          anio: 2015, pags: 145,
          portada: 'https://covers.openlibrary.org/b/id/10299599-L.jpg',
          ficha: {
            sobre: 'Schafer fue agente del FBI dedicado a captar esp\u00edas, un trabajo que consiste en caerle bien a alguien hasta el punto de que traicione a su pa\u00eds. El libro traduce esa t\u00e9cnica a la vida normal.',
            resumen: 'Su base es la <b>f\u00f3rmula de la amistad</b>: proximidad, frecuencia, duraci\u00f3n e intensidad; manipulando esas cuatro variables se construye cercan\u00eda casi con cualquiera. Ense\u00f1a las <b>se\u00f1ales de amistad</b> no verbales que emitimos sin darnos cuenta \u2014 cejas levantadas un instante, ladear la cabeza, sonrisa genuina \u2014 y c\u00f3mo usarlas conscientemente. Explica el <b>efecto dorado</b>: la gente se siente mejor contigo cuanto mejor se siente consigo misma en tu presencia, as\u00ed que el trabajo no es impresionar sino hacer que el otro brille. Y dedica una parte a leer lenguaje corporal y a detectar el enga\u00f1o, con la honestidad de decir que es mucho menos fiable de lo que se cree.',
            porQue: 'Es el m\u00e1s t\u00e1ctico de los cinco, y el m\u00e1s f\u00e1cil de aplicar si las conversaciones con desconocidos te cuestan.',
            idea: 'No gustas por lo que consigues que piensen de ti, sino por c\u00f3mo consigues que se sientan consigo mismos.',
            cuando: 'El \u00faltimo del grupo. Es el m\u00e1s ligero de los cinco.'
          } },
        { id: 'designingLife', t: 'Designing Your Life', a: 'Burnett y Evans',
          anio: 2018, pags: 144,
          portada: 'https://covers.openlibrary.org/b/isbn/1101875321-L.jpg',
          ficha: {
            sobre: 'Burnett y Evans dan un curso en Stanford que aplica el m\u00e9todo del dise\u00f1o de producto a decidir qu\u00e9 hacer con tu vida profesional. El libro es ese curso.',
            resumen: 'La idea de fondo: una carrera no se planifica, se prototipa. En vez de decidir en abstracto qu\u00e9 quieres ser, construyes versiones peque\u00f1as y baratas de esa vida y ves qu\u00e9 pasa. De ah\u00ed salen sus herramientas: el <b>diario de buen tiempo</b>, para registrar qu\u00e9 actividades te dan energ\u00eda y cu\u00e1les te la quitan; los <b>tres planes de cinco a\u00f1os</b>, deliberadamente distintos, para romper la idea de que hay un solo camino correcto; y las <b>entrevistas de prototipo</b> \u2014 hablar con gente que ya hace lo que te interesa, no para pedir trabajo sino para saber c\u00f3mo es de verdad. Tambi\u00e9n el concepto de problema de gravedad: si no es accionable, no es un problema, es una circunstancia.',
            porQue: 'Las entrevistas de prototipo son la forma menos inc\u00f3moda de hacer networking que existe: no pides nada, preguntas.',
            idea: 'No decidas tu carrera en abstracto: construye un prototipo peque\u00f1o y mira qu\u00e9 se siente. Prototipar es m\u00e1s barato que equivocarse.',
            cuando: 'Con Never Eat Alone. Este da la excusa para hablar con gente.'
          } },
      ] },
      { n: 'Programaci\u00f3n', color: '#343a40', items: [
        { id: 'cleanCode', t: 'Clean Code', a: 'Robert C. Martin',
          anio: 2008, pags: 444,
          portada: 'https://covers.openlibrary.org/b/id/8065615-L.jpg',
          ficha: {
            sobre: 'Robert C. Martin \u2014 \u00abUncle Bob\u00bb \u2014 escribe sobre el oficio de programar: no sobre qu\u00e9 lenguaje usar, sino sobre c\u00f3mo dejar el c\u00f3digo de forma que otro pueda leerlo dentro de dos a\u00f1os. Es de los libros m\u00e1s citados y tambi\u00e9n de los m\u00e1s discutidos del sector.',
            resumen: 'Va bajando de escala. Los nombres primero: un nombre debe decir por qu\u00e9 existe algo, qu\u00e9 hace y c\u00f3mo se usa, y si necesita un comentario para entenderse es que est\u00e1 mal elegido. Las funciones: peque\u00f1as, que hagan una sola cosa, con pocos argumentos y sin efectos secundarios ocultos. Los comentarios: casi todos son un fracaso del c\u00f3digo para explicarse solo, y los peores son los que mienten porque nadie los actualiz\u00f3. Sigue con formato, objetos frente a estructuras de datos, manejo de errores con excepciones en vez de c\u00f3digos de retorno, y pruebas limpias \u2014 el c\u00f3digo de test merece el mismo cuidado que el de producci\u00f3n. Termina con cap\u00edtulos de refactorizaci\u00f3n paso a paso sobre c\u00f3digo real.',
            porQue: 'Es lo que separa a un programador que entrega de uno al que llaman para mantener. Directamente aplicable en ALTEN.',
            idea: 'El c\u00f3digo se lee muchas m\u00e1s veces de las que se escribe: escribirlo para el que lo lea es la \u00fanica optimizaci\u00f3n que siempre paga.',
            cuando: 'El primero del grupo. Es el m\u00e1s accesible.'
          } },
        { id: 'ddia', t: 'Designing Data-Intensive Applications', a: 'Martin Kleppmann',
          anio: 2017, pags: 618,
          portada: 'https://covers.openlibrary.org/b/id/8434671-L.jpg',
          ficha: {
            sobre: 'Kleppmann explica c\u00f3mo funcionan por dentro los sistemas que mueven datos: bases de datos, colas, r\u00e9plicas, sistemas distribuidos. Es el libro de referencia para dise\u00f1ar sistemas serios, y el m\u00e1s exigente de los 44.',
            resumen: 'Tres partes. La primera, los fundamentos de un sistema fiable, escalable y mantenible, con los modelos de datos (relacional, documental, grafo) y c\u00f3mo se almacenan e indexan de verdad \u2014 \u00e1rboles B frente a LSM. La segunda, los datos distribuidos: replicaci\u00f3n, particionado, transacciones y niveles de aislamiento, y por qu\u00e9 en un sistema distribuido casi todo lo que puede fallar falla. La tercera, sistemas derivados: procesamiento por lotes, streaming, y c\u00f3mo se construye lo que llega al usuario a partir de eventos. Es denso, con referencias acad\u00e9micas al final de cada cap\u00edtulo, y explicado con una claridad rara en este tema.',
            porQue: 'Es el que m\u00e1s peso tiene en una entrevista t\u00e9cnica seria de las que est\u00e1s preparando. Tambi\u00e9n el que m\u00e1s tiempo pide.',
            idea: 'En sistemas distribuidos no existe la respuesta correcta, s\u00f3lo intercambios: cada garant\u00eda que ganas la pagas en otra parte.',
            cuando: 'El \u00faltimo del grupo, y con calma. No es un libro de un fin de semana.'
          } },
        { id: 'pragmatic', t: 'The Pragmatic Programmer', a: 'Hunt & Thomas',
          anio: 1999, pags: 352,
          portada: 'https://covers.openlibrary.org/b/id/10143650-L.jpg',
          ficha: {
            sobre: 'Hunt y Thomas escribieron en 1999 el libro que m\u00e1s ha influido en c\u00f3mo se entiende la carrera de programador. La edici\u00f3n del vig\u00e9simo aniversario est\u00e1 reescrita y es la que hay que leer.',
            resumen: 'Son consejos numerados, cada uno con su nombre. <b>DRY</b> \u2014 no repitas el mismo conocimiento en dos sitios \u2014 es el m\u00e1s famoso y el m\u00e1s malentendido: va de conocimiento duplicado, no de l\u00edneas parecidas. La <b>teor\u00eda de las ventanas rotas</b>: un trozo de c\u00f3digo malo que se tolera invita a que todo lo dem\u00e1s se degrade. La <b>programaci\u00f3n por coincidencia</b>: hacer que funcione sin saber por qu\u00e9 es deuda que se cobra sola. Insisten en automatizar todo lo repetitivo, en dominar de verdad las herramientas \u2014 editor, shell, control de versiones \u2014, en programar de forma que el cambio sea barato, y en asumir la responsabilidad de la propia carrera aprendiendo un lenguaje nuevo cada a\u00f1o.',
            porQue: 'Es el que habla de la carrera y no s\u00f3lo del c\u00f3digo. Encaja con tu momento: est\u00e1s decidiendo hacia d\u00f3nde crecer.',
            idea: 'No arregles el c\u00f3digo malo con parches: la primera ventana rota que dejas sin reparar autoriza todas las dem\u00e1s.',
            cuando: 'Con Clean Code, y este primero si tuvieras que elegir uno.'
          } },
        { id: 'philosophySoftware', t: 'A Philosophy of Software Design', a: 'John Ousterhout',
          anio: 2018, pags: 193,
          portada: 'https://covers.openlibrary.org/b/id/10352230-L.jpg',
          ficha: {
            sobre: 'Ousterhout, catedr\u00e1tico en Stanford, escribi\u00f3 este libro corto a partir de un curso donde los alumnos escriben c\u00f3digo y lo revisan varias veces. Su tema \u00fanico es la complejidad: qu\u00e9 la produce y c\u00f3mo reducirla.',
            resumen: 'Define la complejidad por sus s\u00edntomas: <b>amplificaci\u00f3n del cambio</b> \u2014 tocar una cosa obliga a tocar muchas \u2014, <b>carga cognitiva</b> y <b>inc\u00f3gnitas desconocidas</b> \u2014 no saber qu\u00e9 hay que tocar. Su propuesta central son los <b>m\u00f3dulos profundos</b>: interfaz peque\u00f1a y sencilla que esconde mucha implementaci\u00f3n; lo contrario, los m\u00f3dulos superficiales, son los que multiplican el trabajo. De ah\u00ed sale su choque m\u00e1s comentado con Clean Code: sostiene que trocear en funciones diminutas puede aumentar la complejidad en vez de reducirla, porque llena el sistema de interfaces. Defiende los comentarios \u2014 dice que un buen comentario aporta informaci\u00f3n que el c\u00f3digo no puede expresar \u2014 y dise\u00f1ar dos veces antes de elegir.',
            porQue: 'Es el contrapunto directo a Clean Code, y leer los dos juntos vale m\u00e1s que leer cualquiera por separado: te obliga a formar criterio en vez de seguir reglas.',
            idea: 'Los m\u00f3dulos deben ser profundos: mucha funcionalidad detr\u00e1s de una interfaz peque\u00f1a. Una interfaz casi tan grande como lo que esconde no esconde nada.',
            cuando: 'Justo despu\u00e9s de Clean Code, mientras lo tengas fresco.'
          } },
        { id: 'staffPath', t: 'The Staff Engineer\'s Path', a: 'Tanya Reilly',
          anio: 2022, pags: 521,
          alias: ['The Staff Engineer\u2019s Path'],
          portada: 'https://covers.openlibrary.org/b/id/15104792-L.jpg',
          ficha: {
            sobre: 'Reilly fue staff engineer en Squarespace y Google. El libro es sobre el escal\u00f3n que viene despu\u00e9s de senior, que es donde el trabajo deja de ser escribir c\u00f3digo y casi nadie te explica en qu\u00e9 consiste.',
            resumen: 'Tres partes. La primera, el mapa: qu\u00e9 es un staff engineer, los arquetipos que existen \u2014arquitecto, solucionador, l\u00edder t\u00e9cnico, gu\u00eda\u2014 y c\u00f3mo tener una visi\u00f3n t\u00e9cnica y un \u00e1mbito claro. La segunda, la ejecuci\u00f3n: c\u00f3mo elegir en qu\u00e9 proyectos meterte, c\u00f3mo llevar uno grande, c\u00f3mo tomar decisiones cuando nadie tiene la autoridad formal para decidir. La tercera, escalar: c\u00f3mo se te multiplica el impacto a trav\u00e9s de otros, c\u00f3mo dejar huella en el c\u00f3digo y en la gente, y c\u00f3mo se toma la decisi\u00f3n de seguir por la v\u00eda t\u00e9cnica o pasar a gesti\u00f3n.',
            porQue: 'Es el mapa del escal\u00f3n que te toca despu\u00e9s de las entrevistas que preparas. Ninguno de los otros libros de Programaci\u00f3n habla de la carrera.',
            idea: 'A partir de senior, tu trabajo deja de medirse por lo que escribes y empieza a medirse por lo que consigues que pase.',
            cuando: 'Despu\u00e9s de Clean Code y The Pragmatic Programmer.'
          } },
        { id: 'legacyCode', t: 'Working Effectively with Legacy Code', a: 'Michael Feathers',
          anio: 2004, pags: 456,
          portada: 'https://covers.openlibrary.org/b/id/86561-L.jpg',
          ficha: {
            sobre: 'Feathers define c\u00f3digo heredado de una forma que escuece: cualquier c\u00f3digo sin pruebas. El libro es c\u00f3mo trabajar con \u00e9l sin romperlo, que es lo que hace la mayor\u00eda de los programadores casi todos los d\u00edas.',
            resumen: 'El problema que resuelve es circular: para cambiar c\u00f3digo con seguridad necesitas pruebas, pero para poder probarlo tienes que cambiarlo. Su respuesta son las <b>costuras</b>: puntos donde se puede alterar el comportamiento sin editar el c\u00f3digo en ese sitio, y que permiten meter una prueba alrededor de lo que vas a tocar. A partir de ah\u00ed, un cat\u00e1logo de t\u00e9cnicas con nombre para casos concretos \u2014 \u00abno puedo poner esta clase en un banco de pruebas\u00bb, \u00abeste m\u00e9todo necesita algo que tarda una eternidad\u00bb, \u00abmi aplicaci\u00f3n es puro c\u00f3digo espagueti\u00bb \u2014 cada una con su procedimiento paso a paso.',
            porQue: 'Es el m\u00e1s realista de los cuatro de Programaci\u00f3n: en ALTEN vas a tocar mucho m\u00e1s c\u00f3digo existente que c\u00f3digo nuevo.',
            idea: 'C\u00f3digo heredado es c\u00f3digo sin pruebas, aunque lo escribieras t\u00fa la semana pasada.',
            cuando: 'Cuando te toque mantener algo que no escribiste, que es casi siempre.'
          } },
      ] },
      { n: 'Liderazgo', color: '#8a6d1f', items: [
        { id: 'extremeOwnership', t: 'Extreme Ownership', a: 'Jocko Willink',
          anio: 2015, pags: 325,
          portada: 'https://covers.openlibrary.org/b/id/12835042-L.jpg',
          ficha: {
            sobre: 'Willink y Babin dirigieron el equipo SEAL m\u00e1s condecorado de la guerra de Irak y hoy dan formaci\u00f3n a empresas. Cada cap\u00edtulo cuenta una operaci\u00f3n, extrae el principio y lo aplica a un caso de negocio.',
            resumen: 'El principio que da t\u00edtulo: el l\u00edder es responsable de <b>todo</b> lo que pasa en su equipo, sin excepci\u00f3n \u2014 si alguien no entendi\u00f3, no lo explicaste bien; si alguien fall\u00f3, no lo entrenaste. No hay malos equipos, s\u00f3lo malos l\u00edderes. De ah\u00ed salen las <b>leyes del combate</b>: cubrirse y avanzar (las partes del equipo se apoyan en vez de competir), simplificar hasta que nadie pueda malinterpretar, priorizar y ejecutar una cosa cada vez, y el <b>mando descentralizado</b> \u2014 la gente decide sola si entiende la intenci\u00f3n. La segunda mitad va de mandar hacia arriba y de la <b>dicotom\u00eda del liderazgo</b>: ser agresivo pero no temerario, disciplinado pero no r\u00edgido.',
            porQue: 'Es el m\u00e1s \u00fatil de los cinco antes de tener gente a cargo, porque el principio se aplica a ti solo: dejar de explicar los fallos con causas externas.',
            idea: 'Si tu equipo no hizo lo que quer\u00edas, el problema es tu comunicaci\u00f3n, no su capacidad.',
            cuando: 'El primero del grupo.'
          } },
        { id: 'goodToGreat', t: 'Good to Great', a: 'Jim Collins',
          anio: 2001, pags: 300,
          portada: 'https://covers.openlibrary.org/b/id/7431270-L.jpg',
          ficha: {
            sobre: 'Collins y su equipo analizaron durante cinco a\u00f1os 1.435 empresas para aislar las once que pasaron de resultados normales a excepcionales y los sostuvieron quince a\u00f1os. El libro es qu\u00e9 ten\u00edan en com\u00fan.',
            resumen: 'El <b>l\u00edder de nivel 5</b>: humildad personal y voluntad profesional feroz, lo contrario del director carism\u00e1tico de portada. <b>Primero qui\u00e9n, despu\u00e9s qu\u00e9</b>: subir a la gente correcta al autob\u00fas antes de decidir a d\u00f3nde va. Enfrentar los <b>hechos brutales</b> sin perder la fe en el desenlace, lo que llama la paradoja de Stockdale. El <b>concepto del erizo</b>: la intersecci\u00f3n entre en qu\u00e9 puedes ser el mejor del mundo, qu\u00e9 te apasiona y qu\u00e9 mueve tu motor econ\u00f3mico. Cultura de disciplina, tecnolog\u00eda como acelerador y no como causa, y el <b>volante de inercia</b>: no hay un momento milagroso, sino empujones acumulados que un d\u00eda parecen un salto desde fuera.',
            porQue: 'El concepto del erizo es directamente aplicable a la decisi\u00f3n que tienes delante sobre d\u00f3nde concentrar tu tiempo.',
            idea: 'No hay un momento decisivo: hay muchos empujones en la misma direcci\u00f3n que desde fuera parecen un salto.',
            cuando: 'Cuando est\u00e9s eligiendo en qu\u00e9 concentrarte.'
          } },
        { id: 'hardThing', t: 'The Hard Thing About Hard Things', a: 'Ben Horowitz',
          anio: 2014, pags: 145,
          portada: 'https://covers.openlibrary.org/b/id/7279515-L.jpg',
          ficha: {
            sobre: 'Horowitz fund\u00f3 Opsware, la vendi\u00f3 por 1.600 millones y hoy es socio de una gran firma de capital riesgo. Escribi\u00f3 este libro porque los de gesti\u00f3n cuentan c\u00f3mo hacer las cosas bien y nadie cuenta qu\u00e9 hacer cuando todo se rompe.',
            resumen: 'Es medio memorias, medio manual. La parte narrativa cuenta c\u00f3mo estuvo a semanas de quebrar varias veces y qu\u00e9 decisiones tom\u00f3. La parte pr\u00e1ctica cubre lo que nadie ense\u00f1a: c\u00f3mo despedir a alguien y c\u00f3mo despedir a un amigo, c\u00f3mo degradar a un directivo leal, cu\u00e1ndo un fundador debe dejar de ser director general, c\u00f3mo se contrata a un ejecutivo, la diferencia entre <b>tiempos de paz</b> y <b>tiempos de guerra</b> y por qu\u00e9 exigen l\u00edderes distintos, y la <b>lucha</b> \u2014 su nombre para el periodo en que todo va mal y no sabes si saldr\u00e1s. Su consejo repetido: cuida a la gente, al producto y a los beneficios, en ese orden.',
            porQue: 'Es el m\u00e1s honesto sobre el coste real de emprender, y el mejor ant\u00eddoto contra la versi\u00f3n de LinkedIn de montar algo.',
            idea: 'No hay f\u00f3rmulas para los problemas dif\u00edciles: por eso son los dif\u00edciles. S\u00f3lo se puede seguir jugando un movimiento m\u00e1s.',
            cuando: 'Cuando el proyecto ya est\u00e9 en marcha y duela.'
          } },
        { id: 'leadersEatLast', t: 'Leaders Eat Last', a: 'Simon Sinek',
          anio: 1900, pags: 368,
          portada: 'https://covers.openlibrary.org/b/id/8246311-L.jpg',
          ficha: {
            sobre: 'Sinek parte de una costumbre de los marines \u2014 los oficiales comen los \u00faltimos \u2014 para argumentar que el trabajo del l\u00edder es crear un entorno donde la gente se sienta segura. Combina biolog\u00eda, antropolog\u00eda y casos de empresa.',
            resumen: 'Su marco es qu\u00edmico: endorfina y dopamina son las sustancias del logro individual, y oxitocina y serotonina las de la confianza y el v\u00ednculo. Una organizaci\u00f3n que s\u00f3lo premia lo individual funciona con las dos primeras, que adem\u00e1s crean adicci\u00f3n y aislamiento. Introduce el <b>c\u00edrculo de seguridad</b>: cuando la gente se siente protegida por su propio grupo dedica su energ\u00eda a los peligros de fuera, y cuando no, la dedica a protegerse de sus compa\u00f1eros. Critica la gesti\u00f3n por n\u00fameros trimestrales y el cortisol cr\u00f3nico de las plantillas con miedo, y sostiene que el liderazgo no es un rango sino la decisi\u00f3n de cuidar a los que tienes a la izquierda y a la derecha.',
            porQue: 'Es el m\u00e1s blando de los cinco y el que mejor explica por qu\u00e9 un equipo con miedo rinde menos aunque tenga mejores individuos.',
            idea: 'El liderazgo no es un rango: es la decisi\u00f3n de anteponer el bienestar de tu gente a tus propios intereses.',
            cuando: 'Cuando ya tengas gente a tu cargo o est\u00e9 cerca.'
          } },
        { id: 'fiveDysfunctions', t: 'The Five Dysfunctions of a Team', a: 'Patrick Lencioni',
          anio: 2007, anio: 2002, pags: 229,
          portada: 'https://covers.openlibrary.org/b/id/549590-L.jpg',
          ficha: {
            sobre: 'Lencioni escribe una novela corta \u2014 una directora general reci\u00e9n llegada arregla un comit\u00e9 de direcci\u00f3n roto \u2014 y en el \u00faltimo tercio extrae el modelo. Se lee en una tarde.',
            resumen: 'Cinco disfunciones apiladas, cada una causada por la anterior. En la base, la <b>ausencia de confianza</b>: nadie admite un error ni pide ayuda por miedo a parecer d\u00e9bil. Encima, el <b>miedo al conflicto</b>: sin confianza no hay debate real, s\u00f3lo armon\u00eda artificial. Despu\u00e9s la <b>falta de compromiso</b>: quien no pudo discutir no se compromete con lo decidido. Luego la <b>evasi\u00f3n de responsabilidades</b>: nadie exige a un compa\u00f1ero lo que no se comprometi\u00f3 a hacer. Y arriba, la <b>falta de atenci\u00f3n a los resultados</b>: cada uno cuida su parcela. Incluye ejercicios concretos para cada nivel y un cuestionario de diagn\u00f3stico.',
            porQue: 'Es el m\u00e1s r\u00e1pido de leer y el que da un diagn\u00f3stico usable de cualquier equipo del que formes parte, aunque no lo dirijas.',
            idea: 'Sin confianza no hay conflicto sano, y sin conflicto sano no hay compromiso: s\u00f3lo silencio en la sala y quejas en el pasillo.',
            cuando: 'Cualquier momento. Es el m\u00e1s corto de los 44.'
          } },
        { id: 'crucial', t: 'Crucial Conversations', a: 'Patterson, Grenny, McMillan y Switzler',
          anio: 2001, pags: 272,
          alias: ['Crucial Conversations \u2014 cap\u00edtulos 4 y 5'],
          portada: 'https://covers.openlibrary.org/b/id/1711809-L.jpg',
          ficha: {
            sobre: 'Trata de las conversaciones en las que hay mucho en juego, las opiniones difieren y las emociones est\u00e1n altas: un aumento, un conflicto con un compa\u00f1ero, decirle a un jefe que el plazo es imposible.',
            resumen: 'Su punto de partida es que en esas conversaciones caemos en la <b>elecci\u00f3n del tonto</b>: creer que s\u00f3lo se puede callar o pelear. La alternativa es mantener el di\u00e1logo, y para eso hay que cuidar dos cosas: la <b>seguridad</b> \u2014 la gente se cierra cuando siente que su reputaci\u00f3n o su relaci\u00f3n est\u00e1n en juego \u2014 y los <b>hechos frente a las historias</b>: separar lo que pas\u00f3 de la interpretaci\u00f3n que te montaste. De ah\u00ed salen sus herramientas: empezar por los hechos, contar tu historia como historia y no como verdad, preguntar la del otro, y el <b>contraste</b> \u2014 decir lo que NO quieres decir cuando ves que alguien se ofende.',
            porQue: 'Es el m\u00e1s aplicable de Liderazgo antes de tener gente a cargo: sirve para negociar un sueldo o para decir que no a un plazo.',
            idea: 'Cuando alguien se cierra, el problema casi nunca es lo que dijiste: es que dej\u00f3 de sentirse seguro.',
            cuando: 'Los cap\u00edtulos 4 y 5 son el n\u00facleo \u2014 los hechos frente a las historias. Lee esos primero.'
          } },
        { id: 'radicalCandor', t: 'Radical Candor', a: 'Kim Scott',
          anio: 2017, pags: 297,
          portada: 'https://covers.openlibrary.org/b/id/8088432-L.jpg',
          ficha: {
            sobre: 'Kim Scott trabaj\u00f3 en Google y Apple, y escribi\u00f3 esto a partir de una cr\u00edtica que recibi\u00f3 y que le cambi\u00f3 la carrera. Trata de c\u00f3mo decir la verdad sin ser un imb\u00e9cil.',
            resumen: 'Su marco son dos ejes: <b>preocuparse personalmente</b> por la gente y <b>desafiar directamente</b>. Cruzarlos da cuatro cuadrantes. La <b>franqueza radical</b> es tener los dos. Si desaf\u00edas sin preocuparte, es <b>agresividad odiosa</b>. Si te preocupas pero no desaf\u00edas, es <b>empat\u00eda ruinosa</b> \u2014 el cuadrante donde cae casi todo el mundo, y el que m\u00e1s da\u00f1o hace, porque dejar que alguien siga haci\u00e9ndolo mal por no incomodarlo no es amabilidad. Y si no haces ninguna de las dos, <b>insinceridad manipuladora</b>. La segunda mitad son herramientas: c\u00f3mo pedir cr\u00edtica antes de darla, c\u00f3mo darla en el momento y en privado, y c\u00f3mo montar reuniones uno a uno que sirvan.',
            porQue: 'El cuadrante de la empat\u00eda ruinosa explica por qu\u00e9 la mayor\u00eda de los equipos callan lo que ven. Es \u00fatil aunque no dirijas a nadie.',
            idea: 'Callarte una cr\u00edtica por no incomodar no es amabilidad: es dejar que alguien siga equivoc\u00e1ndose para estar t\u00fa c\u00f3modo.',
            cuando: 'Con Extreme Ownership. Uno da la responsabilidad, el otro la comunicaci\u00f3n.'
          } },
      ] },
      { n: 'H\u00e1bitos y Mentalidad', color: '#0b7285', items: [
        { id: 'atomicHabits', t: 'Atomic Habits', a: 'James Clear',
          anio: 2016, pags: 323,
          portada: 'https://covers.openlibrary.org/b/id/12539702-L.jpg',
          ficha: {
            sobre: 'Clear sistematiza lo que se sabe sobre formaci\u00f3n de h\u00e1bitos en un m\u00e9todo operativo. Es el libro de h\u00e1bitos m\u00e1s vendido de la \u00faltima d\u00e9cada y el m\u00e1s pr\u00e1ctico de su categor\u00eda.',
            resumen: 'Su tesis: los cambios grandes vienen de mejoras diminutas repetidas \u2014 un 1% diario compone a 37 veces en un a\u00f1o. Distingue objetivos de <b>sistemas</b>: los objetivos dan la direcci\u00f3n, los sistemas producen el resultado, y quien se queda en el objetivo s\u00f3lo es feliz al llegar. Propone construir el h\u00e1bito desde la <b>identidad</b>: no \u00abquiero correr\u00bb sino \u00absoy alguien que corre\u00bb. El m\u00e9todo son cuatro leyes, cada una con su inversa para romper h\u00e1bitos malos: hazlo <b>obvio</b> (dise\u00f1a el entorno, encadena h\u00e1bitos), <b>atractivo</b> (j\u00fantalo con algo que ya te gusta), <b>f\u00e1cil</b> (la regla de los dos minutos, reducir la fricci\u00f3n) y <b>satisfactorio</b> (refuerzo inmediato, no romper la cadena). A\u00f1ade que el entorno pesa m\u00e1s que la fuerza de voluntad.',
            porQue: 'Es el que sostiene a todos los dem\u00e1s: cualquier cosa que aprendas en esta lista s\u00f3lo sirve si consigues hacerla de forma constante.',
            idea: 'No subes al nivel de tus objetivos: bajas al nivel de tus sistemas.',
            cuando: 'El primero de los 44 si s\u00f3lo vas a leer uno.'
          } },
        { id: 'mindset', t: 'Mindset: The New Psychology of Success', a: 'Carol Dweck',
          anio: 2006, pags: 288,
          portada: 'https://covers.openlibrary.org/b/id/746414-L.jpg',
          ficha: {
            sobre: 'Dweck, psic\u00f3loga de Stanford, lleva d\u00e9cadas investigando qu\u00e9 creemos sobre nuestra propia capacidad y c\u00f3mo eso cambia lo que conseguimos. El libro divulga treinta a\u00f1os de estudios.',
            resumen: 'Dos creencias. La <b>mentalidad fija</b>: la inteligencia y el talento son lo que son, as\u00ed que cada tarea es un examen que puede demostrar que no vales, y por eso conviene evitar los retos y ocultar los errores. La <b>mentalidad de crecimiento</b>: las capacidades se desarrollan con esfuerzo y estrategia, as\u00ed que el reto es informaci\u00f3n y el error es parte del proceso. Recorre c\u00f3mo se manifiestan en el colegio, el deporte, los negocios y las relaciones. Un hallazgo con consecuencias: elogiar la inteligencia de un ni\u00f1o empeora su rendimiento posterior \u2014 se vuelve conservador para no perder la etiqueta \u2014 mientras que elogiar el proceso lo mejora. Y admite el matiz que a menudo se ignora: nadie tiene una mentalidad pura, y cada uno tiene \u00e1reas donde se vuelve fijo.',
            porQue: 'Es el marco mental de todo lo dem\u00e1s. Aprender ventas, copywriting o sistemas distribuidos requiere ser malo en p\u00fablico durante un tiempo.',
            idea: 'Elogiar el talento vuelve a la gente conservadora; elogiar el esfuerzo la vuelve capaz de arriesgarse.',
            cuando: 'Con Atomic Habits. Uno da la creencia, el otro el m\u00e9todo.'
          } },
        { id: 'cantHurtMe', t: 'Can\'t Hurt Me', a: 'David Goggins',
          anio: 2018, pags: 364,
          portada: 'https://covers.openlibrary.org/b/id/8305903-L.jpg',
          ficha: {
            sobre: 'Goggins pas\u00f3 de pesar 130 kilos y fumigar cucarachas a ser SEAL, Ranger y ultramaratoniano. Es en parte autobiograf\u00eda brutal y en parte manual de resistencia mental, con cap\u00edtulos que terminan en retos concretos.',
            resumen: 'Cuenta una infancia de maltrato y racismo, y c\u00f3mo decidi\u00f3 cambiar. De ah\u00ed saca sus conceptos: el <b>espejo de la responsabilidad</b> \u2014 escribir en el espejo lo que no quieres admitir sobre ti y mirarlo cada d\u00eda \u2014; la <b>regla del 40%</b>, seg\u00fan la cual cuando tu mente dice basta llevas usado m\u00e1s o menos el 40% de tu capacidad real; el <b>callo mental</b>, que se forma haciendo a prop\u00f3sito cosas que odias; el <b>banco de pruebas</b> \u2014 un archivo mental de las veces que superaste algo, para consultarlo cuando dudes \u2014; y buscar el <b>malestar</b> deliberadamente. El tono es agresivo y no es para todo el mundo; tambi\u00e9n conviene leerlo con cabeza, porque cuenta lesiones graves como logros.',
            porQue: 'Es el m\u00e1s motivacional de los 44 y el que menos m\u00e9todo tiene. Sirve para arrancar, no para sostener \u2014 de sostener se ocupa Atomic Habits.',
            idea: 'Cuando tu cabeza dice que no puedes m\u00e1s, todav\u00eda te queda alrededor del 60% del dep\u00f3sito.',
            cuando: 'Cuando te falte impulso, no cuando te falte plan.'
          } },
        { id: 'obstacle', t: 'The Obstacle is the Way', a: 'Ryan Holiday',
          anio: 2013, pags: 224,
          portada: 'https://covers.openlibrary.org/b/id/14428233-L.jpg',
          ficha: {
            sobre: 'Holiday traduce el estoicismo a un manual de actuaci\u00f3n, apoy\u00e1ndose en Marco Aurelio, Epicteto y S\u00e9neca, y en ejemplos hist\u00f3ricos de gente que convirti\u00f3 un impedimento en el camino.',
            resumen: 'Tres partes que son tres disciplinas estoicas. <b>Percepci\u00f3n</b>: casi nada es objetivamente bueno o malo hasta que lo juzgas, y controlar la interpretaci\u00f3n es lo \u00fanico que siempre est\u00e1 en tu mano. <b>Acci\u00f3n</b>: moverse con lo que hay, empezar por lo que s\u00ed puedes hacer, aceptar el fracaso como material de trabajo y la persistencia como m\u00e9todo. <b>Voluntad</b>: la parte interior, para lo que no se puede cambiar \u2014 aceptar, prepararse para lo peor de antemano y encontrar sentido. Cada cap\u00edtulo es corto y va acompa\u00f1ado de un caso hist\u00f3rico, de Rockefeller a Lincoln.',
            porQue: 'Es la versi\u00f3n pr\u00e1ctica de Meditaciones y buena puerta de entrada al \u00faltimo libro de la lista.',
            idea: 'El impedimento a la acci\u00f3n hace avanzar la acci\u00f3n: lo que se interpone en el camino se convierte en el camino.',
            cuando: 'Antes de Meditaciones.'
          } },
        { id: 'meditaciones', t: 'Meditaciones', a: 'Marco Aurelio',
          alias: ['Meditations'],
          anio: 180, pags: 254,
          portada: 'https://covers.openlibrary.org/b/id/211529-L.jpg',
          ficha: {
            sobre: 'Marco Aurelio fue emperador de Roma y escribi\u00f3 esto para s\u00ed mismo, sin intenci\u00f3n de publicarlo: son sus notas privadas para recordarse c\u00f3mo quer\u00eda comportarse. Han sobrevivido dieciocho siglos.',
            resumen: 'No hay estructura ni argumento: son doce cuadernos de anotaciones sueltas que vuelven una y otra vez sobre los mismos temas. La <b>dicotom\u00eda del control</b>: separar lo que depende de ti \u2014 tus juicios y tus actos \u2014 de lo que no, y no gastar ni un gramo de energ\u00eda en lo segundo. La brevedad de la vida y la insignificancia de la fama, escritas por el hombre m\u00e1s poderoso del mundo conocido. El deber hacia los dem\u00e1s porque somos partes de un mismo cuerpo. La aceptaci\u00f3n de lo que ocurre. Y el trato con la gente dif\u00edcil: recordar cada ma\u00f1ana que te vas a cruzar con ingratos y soberbios, y que ninguno puede da\u00f1ar tu car\u00e1cter si t\u00fa no se lo permites.',
            porQue: 'Es el cierre de la lista y el que menos caduca. Se lee suelto, unas p\u00e1ginas cuando hagan falta, no de principio a fin.',
            idea: 'Tienes poder sobre tu mente, no sobre los acontecimientos. Date cuenta de esto y encontrar\u00e1s la fuerza.',
            cuando: 'Despu\u00e9s de El obst\u00e1culo es el camino, y luego a ratos durante a\u00f1os.'
          } },
        { id: 'whySleep', t: 'Why We Sleep', a: 'Matthew Walker',
          anio: 2017, pags: 360,
          portada: 'https://covers.openlibrary.org/b/id/8814155-L.jpg',
          ficha: {
            sobre: 'Walker dirige el laboratorio del sue\u00f1o de Berkeley y este es el libro divulgativo de referencia sobre el tema. Tambi\u00e9n es el m\u00e1s inc\u00f3modo de la lista si duermes poco.',
            resumen: 'Explica las dos fases \u2014<b>NREM</b>, que consolida lo aprendido y repara el cuerpo, y <b>REM</b>, donde se procesa lo emocional y aparecen las conexiones creativas\u2014 y por qu\u00e9 recortar horas recorta sobre todo REM, que es la del final de la noche. Despu\u00e9s el cat\u00e1logo de consecuencias, documentado: memoria, aprendizaje, sistema inmune, regulaci\u00f3n del apetito, testosterona, riesgo cardiovascular y capacidad de decidir. Dedica un cap\u00edtulo a la cafe\u00edna y su vida media de seis horas, otro al alcohol \u2014que seda pero destruye el REM\u2014, y termina con lo que s\u00ed funciona para dormir mejor: horario constante, oscuridad, fr\u00edo y nada de pantallas a \u00faltima hora.',
            porQue: 'Tu rutina te da el m\u00ednimo de sue\u00f1o, sin margen, y tu \u00faltimo bloque del d\u00eda es de pantalla. Este libro es el que pone n\u00fameros a lo que cuesta pasarte de la hora.',
            idea: 'Dormir menos no se compensa: el rendimiento cae y la percepci\u00f3n de que est\u00e1s bien cae con \u00e9l, as\u00ed que no lo notas.',
            cuando: 'Ahora. Es el que m\u00e1s puede cambiar tu d\u00eda a d\u00eda de toda la lista.'
          } },
        { id: 'practicing', t: 'The Practicing Mind', a: 'Thomas Sterner',
          anio: 2006, pags: 100,
          portada: 'https://covers.openlibrary.org/b/id/743264-L.jpg',
          ficha: {
            sobre: 'Sterner es m\u00fasico y trata la pr\u00e1ctica deliberada desde el proceso, no desde la meta. Es corto \u2014cien p\u00e1ginas\u2014 y el m\u00e1s contemplativo de la lista.',
            resumen: 'Su tesis: nos ense\u00f1an a valorar s\u00f3lo el resultado, as\u00ed que mientras practicamos estamos inc\u00f3modos, porque el resultado siempre est\u00e1 en el futuro. La alternativa es la <b>orientaci\u00f3n al proceso</b>: poner la atenci\u00f3n en lo que est\u00e1s haciendo ahora y no en lo lejos que queda la meta, con lo que la pr\u00e1ctica deja de ser peaje y pasa a ser el sitio donde est\u00e1s. De ah\u00ed saca herramientas concretas: dividir en unidades muy peque\u00f1as, trabajar despacio a prop\u00f3sito, la regla de las cuatro eses \u2014simplificar, small, short, slow\u2014, y observar el juicio interno en vez de obedecerlo.',
            porQue: 'Es el complemento de Atomic Habits: aquel da el sistema para aparecer cada d\u00eda, este la forma de no odiar el rato que pasas practicando.',
            idea: 'La meta sirve para poner el rumbo, no para medir cada d\u00eda. Si s\u00f3lo disfrutas al llegar, vas a estar inc\u00f3modo todo el camino.',
            cuando: 'Con Atomic Habits. Se lee en dos tardes.'
          } },
      ] },
    ],

    get todos() {
      return this.grupos.reduce(function (a, g) { return a.concat(g.items); }, []);
    },
    // El rengl\u00f3n de la compra es \"T\u00edtulo \u2014 Autor\", escrito una sola vez y reversible.
    textoCompra: function (p) { return p.t + ' \u2014 ' + p.a; },
    deTextoCompra: function (txt) {
      var t = this;
      return this.todos.filter(function (p) { return t.textoCompra(p) === txt; })[0] || null;
    },
    // Encuentra un libro aunque se le llame de otra forma. Coach lo nombra en inglés
    // y la lista de la compra en español, y no puede haber dos fichas del mismo libro:
    // los títulos alternativos se declaran en `alias` y esto los resuelve.
    porTitulo: function (txt) {
      if (!txt) return null;
      var n = function (x) { return String(x).toLowerCase().replace(/[^a-z0-9]/g, ''); };
      var q = n(txt);
      return this.todos.filter(function (l) {
        if (n(l.t) === q) return true;
        return (l.alias || []).some(function (a) { return n(a) === q; });
      })[0] || this.deTextoCompra(txt);
    },
    get porGrupo() {
      var t = this, out = {};
      this.grupos.forEach(function (g) {
        out[g.n] = g.items.map(function (p) { return t.textoCompra(p); });
      });
      return out;
    },
  };

  const LISTA_COMPRAS = {
    // Sale de RECETARIO: cada ingrediente declara su pasillo y aquí se agrupan.
    // Antes esta lista estaba escrita a mano y había que replicar a mano cada
    // cambio del recetario — el comentario de comida.html lo admitía. Ahora
    // agregar una receta agrega sus ingredientes a la compra sin tocar nada.
    get comida() { return RECETARIO.porPasillo; },
    // Sale de RUTINA_PIEL, no se escribe a mano: así la lista de la compra no puede nombrar
    // una marca distinta a la que dice la rutina, que es justo lo que pasaba hasta el
    // 2026-09-01 (aquí Isdin, en la rutina La Roche-Posay).
    get skincare() {
      return RUTINA_PIEL.productos.map(function (p) { return RUTINA_PIEL.textoCompra(p); });
    },
    // Sale de RUTINA_PELO, incluidos los días: así no puede decir aquí una marca (o un día)
    // y otra en la rutina, que es lo que pasó con skincare. Los 2 de receta van al final
    // porque NO son de mostrador y no forman parte de la rutina diaria.
    get cabello() {
      return RUTINA_PELO.productos.map(function (p) { return RUTINA_PELO.textoCompra(p); })
        .concat([
        // 2026-09-02: este ítem tenía el formato invertido del resto — el nombre DELANTE del
        // guión y la nota detrás — y `lcAmazonQuery()` del Dashboard, que se queda con lo de
        // después del ' — ' porque ahí suele ir el producto, acababa buscando en Amazon
        // "el escalón que queda si en 6 meses el tópico + la dutasterida no bastan". Adán:
        // "lo de minoxidil oral no se busca bien en amazon, es por eso que no tienes precio de
        // eso". Con la dosis entre paréntesis (las aclaraciones se quitan antes de buscar) la
        // búsqueda queda en "Minoxidil oral", y el \ud83e\ude7a hace que el Dashboard lo pinte como
        // de receta — que es la otra mitad del problema: **no se vende en Amazon ni en Mercado
        // Libre**, es de farmacia con receta, y por eso nunca hubo precio de lista que ponerle.
        'Minoxidil oral (2.5-5 mg) — \ud83e\ude7a solo con receta y con revisión de presión antes y durante; es el escalón que queda si en 6 meses el tópico + la dutasterida no bastan',
      ]);
    },
    // Sale de SUPLEMENTOS: el nombre y el tamaño del envase se escriben una sola vez.
    get suplementos() {
      return SUPLEMENTOS.lista.map(function (p) { return SUPLEMENTOS.textoCompra(p); });
    },
    // ── KIT DE HIGIENE (2026-08-15, pedido: "en alguna parte debes poner un kit de higiene super
    // completo, ya sea para viajes o persona, con imagenes y productos que comprar") ────────────
    // Agrupado por bolsa, no por tipo de producto: cuando armas la maleta lo que importa es qué
    // meter en el neceser, no si algo es "cuidado bucal" o "cuidado corporal". Lo que ya vive en
    // Skincare y Cabello NO se duplica aquí — esta lista es lo que hay que COMPRAR APARTE en
    // tamaño de viaje o lo que solo existe en el neceser (cortauñas, rastrillo, botiquín).
    // Sale de KIT_HIGIENE, no se escribe a mano.
    get higiene() { return KIT_HIGIENE.porGrupo; },
    // Espejo de OJ_PRODUCTOS en CuidadoPersonal/cuidadopersonal.html -> pestana "Ojos y Vista"
    // (2026-08-15). Agrupado por para-que-sirve y no por tipo de producto, igual que el kit de
    // higiene: en la tienda lo que decides es "necesito algo para el ojo seco", no "necesito un gel".
    // Sale de CUIDADO_OJOS, no se escribe a mano.
    get ojos() { return CUIDADO_OJOS.porGrupo; },
    // 45 libros únicos recomendados dentro de Coach.html → #aprendizaje (5 cards de skill: Ventas,
    // Copywriting, Marketing, Networking, Liderazgo, más las secciones de Datos/Finanzas/Software del
    // mismo bloque) y #perfil-rico, agrupados por el mismo tema bajo el que Coach los presenta —
    // deduplicados donde el mismo libro aparece recomendado en más de una sección (ej. "Never Split
    // the Difference" en Ventas y en Networking). 9ª estructura duplicada del tipo "Datos duplicados"
    // del README: si Adán cambia/agrega una recomendación en Coach.html → #aprendizaje o
    // #perfil-rico, replicar aquí a mano.
    // Categorías reordenadas el 2026-08-07 (pedido explícito: "ordenalos deacuerdo a las
    // debilidades de mis habilidades") — de más débil a más fuerte según el valor real de cada
    // skill en `SK` (Coach.html → Radar FIFA): Ventas 15, Marketing 20, Finanzas 20/Inversión
    // 25 (categoría combinada), Copy/Datos/Networking empatados en 55 (Copy primero por tener
    // mayor ponderación real, ×1.2 vs ×1.0), Programación 60, Liderazgo 80, Mentalidad 85 (su
    // habilidad más fuerte de las 12 — por eso esta categoría queda al final, no al principio).
    // Sale de BIBLIOTECA, no se escribe a mano.
    get libros() { return BIBLIOTECA.porGrupo; },
  };

  /* ── MIGRACIONES COMPARTIDAS ────────────────────────────────────────────────────────────────
     Correcciones puntuales sobre `finanzasmx_v2` cuando Adán reporta un saldo nuevo.

     Antes había que escribir cada una DOS veces —en `Finanzas.html → init()` y su espejo
     `fix*IfNeeded()` en `dashboard.html`— porque cualquiera de las dos apps puede ser la primera
     que abra, y la que arranca es la que tiene que aplicar el fix. Dos copias del mismo código
     que hay que mantener a la par: la misma trampa que las cifras escritas a mano.

     Ahora viven aquí. Este archivo lo cargan las tres apps y se ejecuta antes que su JS, así que
     la corrección llega abra lo que abra — incluido Coach.html, que nunca tuvo migraciones y
     por eso podía enseñar saldos viejos si era la primera pantalla del día.

     Cada migración lleva su bandera y corre UNA sola vez. Si después Adán mueve ese saldo a mano,
     no se lo revierte nunca.

     PARA AÑADIR UNA: una entrada más en esta lista. En un solo archivo, para las tres apps. */
  const MIGRACIONES = [
    {
      // 2026-08-24 · "Mi deuda de carro bajó, a 292,000 y ya se liquidaron los 2 pagos de la
      // tarjeta de BBVA, solo queda el de los zapatos, pero mi deuda de TV [TC] de BBVA subió
      // a 34,000". En d001 se mueve también `total`: esa tarjeta mantiene `total == balance`
      // desde 2024 y, con `total` congelado, el "pagado real" de las barras saldría negativo.
      flag: '_deudas20260824',
      hacer: function (f) {
        const auto = (f.debts || []).find(d => d.id === 'd003');
        if (auto) auto.balance = 292000;
        const tc = (f.debts || []).find(d => d.id === 'd001');
        if (tc) { tc.balance = 34000; tc.total = 34000; }
        ['d010', 'd011'].forEach(function (id) {
          const m = (f.debts || []).find(d => d.id === id);
          if (m) m.balance = 0;
        });
      }
    },
    {
      // 2026-08-25 · "la deuda de mi crédito automotriz es 293,000". Sube $1,000 sobre el dato
      // de ayer; en un crédito con pagos mensuales eso solo pasa si el saldo anterior era una
      // estimación o si el mes cargó interés sin abono. Se registra el dato tal cual y queda
      // anotado en readme_finanzas.md para contrastarlo contra el estado de cuenta.
      flag: '_auto20260825',
      hacer: function (f) {
        const auto = (f.debts || []).find(d => d.id === 'd003');
        if (auto) auto.balance = 293000;
      }
    },
    {
      // 2026-08-25 · "el Apple Watch MSI, ya se pagó la penúltima mensualidad, entonces solo
      // queda una". De $1,708 (2 cuotas de $854) a $854. El `min` no cambia: la última cuota
      // sigue siendo de $854, así que `minimosDeuda` y `margen` no se mueven — solo bajan
      // `deudaTotal` y `deudaMsi`.
      flag: '_appleWatch20260825',
      hacer: function (f) {
        const aw = (f.debts || []).find(d => d.id === 'd004');
        if (aw) aw.balance = 854;
      }
    },
    {
      // 2026-08-28 · "credito automotriz no lo pago el los dias 1 primero". El seed tenía
      // `day: 1` para d003, así que el calendario del Dashboard metía los $6,700 del auto
      // en el globo del día 1, junto a la renta y la quincena. El día real es el 14 — es lo
      // que dice DATOS-MAESTROS.md y lo que ya asumía el plan semanal de Finanzas, que
      // coloca el auto en la semana 2. Solo se mueve `day`: el importe no cambia, así que
      // ninguna derivada (`minimosDeuda`, `margen`) se entera.
      flag: '_autoDia20260828',
      hacer: function (f) {
        const auto = (f.debts || []).find(d => d.id === 'd003');
        if (auto) auto.day = 14;
      }
    },
    {
      // 2026-08-28 · "se paga el 1 de sep, pero no es ningun credito con tarjetas, es un
      // credito de AT&T". d008 tenía `day: 0`, que para el calendario significa "sin día": una
      // deuda viva de $494 al mes que no aparecía en ninguna fecha. Salió al añadir el control
      // 9 del verificador, que ahora exige día de pago a toda deuda con saldo y mínimo.
      // El nombre también mentía: decía "MSI" y no es de tarjeta.
      flag: '_iphoneAtt20260828',
      hacer: function (f) {
        const ip = (f.debts || []).find(d => d.id === 'd008');
        if (ip) { ip.day = 1; ip.name = 'iPhone 15 (crédito AT&T)'; }
      }
    },
    {
      // 2026-08-29 · "el pago automotriz ponlo los dias 15 de cada mes". Ayer quedó en 14
      // por lo que decía DATOS-MAESTROS.md; Adán lo corrige al 15, que es cuando de verdad
      // se cobra. No es un detalle: la pantalla reparte el mes en dos quincenas que
      // arrancan el 1 y el 15, así que el 14 metía los $6,700 del auto en la PRIMERA
      // quincena — la que solo tiene renta — y desbalanceaba las dos.
      flag: '_autoDia15_20260829',
      hacer: function (f) {
        const auto = (f.debts || []).find(d => d.id === 'd003');
        if (auto) auto.day = 15;
      }
    },
    {
      // 2026-09-01 · seis compras en un solo día, reportadas el 3-sep. Cuatro se cargaron a la
      // TC Banamex —plancha de Amazon, dutasterida, minoxidil NR-11 y mouse— y suman $5,985:
      // la tarjeta llevaba en $0 desde el 13 ago 2026 y vuelve a tener saldo. Las otras dos
      // —tenis Tommy $1,500 y despensa $1,800— fueron de contado y solo entran como gasto.
      //
      // Lo que se mueve sin que nadie lo escriba: `deudaCara` sube de $34,000 a $39,985 —Banamex
      // vuelve a ser tarjeta con saldo—, `deudaTotal` de $339,550 a $345,535, y el mínimo de
      // $810 vuelve a `minimosDeuda`, que baja `margen` en esa misma cantidad.
      //
      // Las transacciones se añaden por id y solo si faltan: esta migración y el seed de
      // Finanzas.html siembran las mismas seis, y un navegador que ya las tenga no las duplica.
      flag: '_gastos20260901',
      hacer: function (f) {
        const bx = (f.debts || []).find(d => d.id === 'd002');
        if (bx) bx.balance = 5985;
        if (!Array.isArray(f.transactions)) f.transactions = [];
        GASTOS_20260901.forEach(function (t) {
          if (!f.transactions.some(x => x.id === t.id)) f.transactions.push(Object.assign({}, t));
        });
      }
    },
    {
      // 2026-09-07 · "ya debo 7,000 a mi tc banamex y a la de bbva 37,000". La BBVA sube
      // $3,000 sobre el dato del 24-ago y la Banamex $1,015 sobre las cuatro compras del
      // 1-sep ($5,985). En d001 se mueve también `total`: esa tarjeta mantiene
      // `total == balance` desde 2024 y, con `total` congelado, el "pagado real" de las
      // barras de Finanzas saldría negativo.
      //
      // Lo que se mueve sin que nadie lo escriba: `deudaCara` de $39,985 a $44,000 y
      // `deudaTotal` de $345,535 a $349,550. Los mínimos no se tocan ($1,500 y $810), así
      // que `minimosDeuda` y `margen` se quedan donde estaban.
      flag: '_tarjetas20260907',
      hacer: function (f) {
        const tc = (f.debts || []).find(d => d.id === 'd001');
        if (tc) { tc.balance = 37000; tc.total = 37000; }
        const bx = (f.debts || []).find(d => d.id === 'd002');
        if (bx) bx.balance = 7000;
        /* Y se sellan las correcciones de AGOSTO que tocan estas mismas tarjetas. Siguen en
           `Finanzas.html` (su `init()`) como espejos —las del Dashboard se borraron: ya eran
           inertes— y corren DESPUÉS que este archivo: a un navegador al que le falte una de sus banderas, esa
           foto de agosto le devolvería la Banamex a $0 y pisaría el dato de hoy —salió al
           probar esta migración con Playwright—. Es la misma defensa que ya aplica el seed de
           Finanzas.html: ninguna corrección histórica puede pisar un dato más nuevo que ella.
           Al añadir una migración de saldo, revisa si hay espejos viejos que sellar. */
        ['_banamex9k', '_pagos20260813', '_msibbva20260813'].forEach(function (fl) {
          try { localStorage.setItem(KEY + fl, '1'); } catch (e) {}
        });
      }
    },
    {
      // 2026-09-16 · "debo a bbva 39,000, a banamex debo 7,800 y tengo una deuda de 13,000 por
      // temas de mi apartamento y vendí 5,300 pesos de mi bitcoin antier". Cuatro cosas:
      //   - d001 sube $2,000 (y `total` con ella, misma invariante de siempre); d002 sube $800.
      //   - Entra d012, la deuda del departamento, copiada de DEUDAS_SEED si el navegador no la
      //     tiene (sin mínimo ni día hasta que Adán diga cómo la paga).
      //   - La venta de BTC (btc004) entra en `btcHistory` por id, solo si falta.
      // Lo que se mueve sin que nadie lo escriba: `deudaCara` de $44,000 a $46,800, `deudaTotal`
      // de $349,550 a $365,350. `minimosDeuda` y `margen` no cambian: los mínimos de las
      // tarjetas siguen en $1,500 y $810, y d012 no tiene mínimo todavía.
      flag: '_deudas20260916',
      hacer: function (f) {
        const tc = (f.debts || []).find(d => d.id === 'd001');
        if (tc) { tc.balance = 39000; tc.total = 39000; }
        const bx = (f.debts || []).find(d => d.id === 'd002');
        if (bx) bx.balance = 7800;
        if (!(f.debts || []).some(d => d.id === 'd012')) {
          const dep = DEUDAS_SEED.find(d => d.id === 'd012');
          if (dep) f.debts.push(Object.assign({}, dep));
        }
        if (!Array.isArray(f.btcHistory)) f.btcHistory = [];
        BTC_SEED.forEach(function (o) {
          const ya = f.btcHistory.find(x => x.id === o.id);
          if (!ya) { if (o.tipo === 'venta') f.btcHistory.push(Object.assign({}, o)); return; }
          // Las compras que ya estaban no traían `fx` (se valuaban con el dólar de hoy): se les
          // pone el de su día. Solo si no lo tienen, por si Adán lo anotó a mano.
          if (!(ya.fx > 0) && o.fx > 0) ya.fx = o.fx;
        });
      }
    },
    {
      // 2026-09-20 · "vendí todos mis bitcoin y me dieron 39,500 y en mi tarjeta tenía como
      // 4,000, entonces pagué mi tc de bbva con ese dinero y ahora queda con un saldo de 900,
      // también a mi tc banamex pagué 3,000 y me quedan 4,900 (…) mi fondo de emergencia van a
      // ser los cetes (…) actualmente en cetes tengo 6,000 y mi saldo de mi tarjeta de débito
      // tengo 1200". Seis cosas:
      //   - d001 baja de $39,000 a $900 (`total` se queda: el "pagado real" son los $38,100).
      //   - d002 baja de $7,800 a $4,900.
      //   - La venta total de BTC (btc005) entra en `btcHistory` por id, solo si falta.
      //   - Los tres movimientos del 19-sep (MOVIMIENTOS_20260920) entran por id, solo si faltan.
      //     Se llaman como la deuda ("Tarjeta BBVA — …") a propósito: así `yaContado` los
      //     empareja con el mínimo previsto del mes y no se cuentan las dos cosas.
      //   - EL FONDO DE EMERGENCIA SON LOS CETES. Hasta hoy eran dos números —`emergencyFund`
      //     ($4,000) y una inversión CETES ($6,500)— y las apps sumaban los dos. Desde hoy es
      //     UNO: `emergencyFund` = lo que hay en CETES ($6,000), la meta ef-001 lo dice en su
      //     nombre, y la inversión CETES desaparece de `investments` para no contarla dos
      //     veces (`{{cetes}}` lee el fondo). El aporte de {{cetesDia15}} sigue: es el aporte
      //     al fondo.
      //   - La cuenta BBVA (activo líquido ac013) queda en $1,200.
      // Lo que se mueve sin que nadie lo escriba: `deudaCara` de $46,800 a $5,800, `deudaTotal`
      // de $365,350 a $324,350. `minimosDeuda` y `margen` no cambian: las dos tarjetas siguen
      // vivas con sus mínimos ($1,500 y $810).
      flag: '_liquidacion20260920',
      hacer: function (f) {
        const tc = (f.debts || []).find(d => d.id === 'd001');
        if (tc) tc.balance = 900;
        const bx = (f.debts || []).find(d => d.id === 'd002');
        if (bx) bx.balance = 4900;
        if (!Array.isArray(f.btcHistory)) f.btcHistory = [];
        BTC_SEED.filter(o => o.tipo === 'venta').forEach(function (o) {
          if (!f.btcHistory.some(x => x.id === o.id)) f.btcHistory.push(Object.assign({}, o));
        });
        if (!Array.isArray(f.transactions)) f.transactions = [];
        MOVIMIENTOS_20260920.forEach(function (t) {
          if (!f.transactions.some(x => x.id === t.id)) f.transactions.push(Object.assign({}, t));
        });
        f.emergencyFund = 6000;
        if (!Array.isArray(f.goals)) f.goals = [];
        const ef = f.goals.find(g => g.id === 'ef-001');
        if (ef) { ef.current = 6000; ef.name = 'Fondo de emergencia (CETES)'; }
        else f.goals.unshift({ id: 'ef-001', name: 'Fondo de emergencia (CETES)', icon: '🛡️', target: 10000, current: 6000, date: '' });
        if (Array.isArray(f.investments))
          f.investments = f.investments.filter(i => !(i.type === 'cetes' || /cetes/i.test(i.name || '')));
        const cta = (f.activos || []).find(a => a.id === 'ac013');
        if (cta) cta.value = 1200;
        /* Se sella el espejo del ahorro de agosto (el de Finanzas; el del Dashboard ya se borró): a un navegador sin esa bandera le devolvería el fondo a
           $4,000 y volvería a meter CETES como inversión. Misma defensa que el 7-sep. */
        try { localStorage.setItem(KEY + '_ahorro20260817', '1'); } catch (e) {}
      }
    },
    {
      // 2026-09-21 · "la tarjeta banamex ya está en 3,900, el crédito automotriz 283,000, el apple
      // watch ponlo como pagado, Zap Stylo los zapatos también ya pagados, deuda de apartamento
      // también ya la pagué". Solo saldos, como el 7 y el 16 de sep: no dijo con qué ni qué día,
      // así que no se inventan movimientos.
      // Lo que se mueve sin que nadie lo escriba: `deudaCara` $5,800 → $4,800; `deudaMsi` $12,550 →
      // $11,362 (solo queda el iPhone); `deudaTotal` $324,350 → $299,162; `minimosDeuda` baja
      // $1,021 (los $854 del reloj y los $167 de los zapatos) y `margen` sube eso mismo.
      flag: '_pagos20260921',
      hacer: function (f) {
        const pon = function (id, saldo) { const d = (f.debts || []).find(x => x.id === id); if (d) d.balance = saldo; };
        pon('d002', 3900); pon('d003', 283000); pon('d004', 0); pon('d009', 0); pon('d012', 0);
      }
    },
    {
      // 2026-09-21 · "lo de Te queda $11,006 esa cifra está mal, ya te había dicho que me quedan
      // 1200". El riel del Plan Maestro calculaba el saldo desde la nómina y no podía saber lo
      // que hay de verdad en la cuenta. Ahora la cuenta BBVA (activo líquido ac013) lleva la
      // FECHA del saldo, y el riel se ancla ahí: ese día vale eso, y de ahí en adelante resta lo
      // que la agenda tiene previsto. Finanzas pone la fecha sola al editar el activo.
      flag: '_cuenta20260921',
      hacer: function (f) {
        const cta = (f.activos || []).find(a => a.id === 'ac013');
        if (cta) { cta.value = 1200; cta.fecha = '2026-09-21'; }
      }
    },
    {
      // 2026-09-30 · "ya no debo nada a mi tarjeta de credito de banamex, y la de bbva le debo 10
      // mil". Solo saldos: no dijo con qué pagó Banamex ni qué se cargó a la BBVA, así que no se
      // inventan movimientos. Banamex en $0 saca sus $810 de `minimosDeuda` y `margen` sube eso.
      flag: '_tarjetas20260930',
      hacer: function (f) {
        const pon = function (id, saldo) { const d = (f.debts || []).find(x => x.id === id); if (d) d.balance = saldo; };
        pon('d001', 10000); pon('d002', 0);
      }
    },
    {
      // 2026-09-30 · "en bbva ahorita ya estoy pagando todo y no me cobran intereses". Va aparte
      // de `_tarjetas20260930` porque esa pudo correr ya: una bandera puesta no vuelve a correr.
      flag: '_bbvaSinInteres20260930',
      hacer: function (f) {
        const tc = (f.debts || []).find(x => x.id === 'd001'); if (tc) tc.noInterest = 10000;
      }
    },
    {
      // 2026-09-30 · "la quincena del 1 octubre al 15 de octubre, solo tengo 390 para todo ese
      // periodo, debido a que pagué todo lo que me sobraba a las tarjetas". Es el saldo de la
      // cuenta para el tramo que arranca el 1-oct, con la nómina y la renta de ese día ya dentro:
      // el riel del Plan Maestro se ancla ahí y de ahí en adelante resta lo previsto.
      flag: '_cuenta20261001',
      hacer: function (f) {
        const cta = (f.activos || []).find(a => a.id === 'ac013');
        if (cta) { cta.value = 390; cta.fecha = '2026-10-01'; }
      }
    },
    {
      // 2026-10-03 · "de prioridad mejor si me quiero ir en sep del 2027 a Alemania". La meta de
      // la maestría deja de estar en pausa, se fecha en septiembre de 2027 y su objetivo pasa a
      // ser lo que cuesta irse: el total de SALIDA al 3-oct-2026, redondeado ($406,000). Si los
      // costos cambian, la meta se ajusta a mano en Finanzas. Finanzas.html la siembra igual.
      flag: '_alemania20261003',
      hacer: function (f) {
        const g = (f.goals || []).find(x => x.id === 'g001');
        if (g) { g.date = '2027-09-01'; delete g.pausadaHasta; g.target = 406000; }
      }
    },
    {
      // 2026-10-03 · Adán ya tiene el IELTS (6.0) y el pasaporte: salen de lo que cuesta irse y la
      // meta de la maestría baja al total de SALIDA, redondeado ($398,000). Solo si sigue en los
      // $406,000 de la migración anterior: un objetivo movido a mano no se toca. Finanzas.html la
      // siembra igual.
      flag: '_ahorroReal20261003',
      hacer: function (f) {
        const g = (f.goals || []).find(x => x.id === 'g001');
        if (g && g.target === 406000) g.target = 398000;
      }
    },
    {
      // 2026-10-05 · "actualmente debo 15,000 a bbva… eso debe ser cada quincena". El saldo nuevo, y
      // ya no se paga completa: `noInterest` en 0 para que el 11 no pida el total.
      flag: '_bbva20261005',
      hacer: function (f) {
        const tc = (f.debts || []).find(x => x.id === 'd001'); if (tc) { tc.balance = 15000; tc.noInterest = 0; }
      }
    },
    {
      // 2026-10-13 · El dinero de la maestría se calcula, no se escribe: `fondoMaestria()`. El
      // `current` de g001 era un número puesto a mano ($53,740) que nadie recalculaba y que
      // `{{maestria}}` y Coach seguían citando mientras Mis Metas decía otra cosa. Se borra para que
      // nadie pueda volver a leerlo. Finanzas.html ya no lo siembra.
      flag: '_maestriaViva20261013',
      hacer: function (f) {
        const g = (f.goals || []).find(x => x.id === 'g001'); if (g) delete g.current;
      }
    },
    {
      // 2026-10-14 · "el credito de tarjeta de bbva ya bajo a 9,900". El saldo nuevo; el plan se
      // ancla a él ese día (`PROYECTO.bbvaSaldoFecha`) y el avance se sigue midiendo desde los $15,000.
      flag: '_bbva20261014',
      hacer: function (f) {
        const tc = (f.debts || []).find(x => x.id === 'd001'); if (tc) tc.balance = 9900;
      }
    },
    {
      // 2026-10-19 · "en mi deuda de bbva tarjeta de crédito aún debo hoy mismo, debo 8,900 y tengo en mi
      // tarjeta de débito 1,700 y 2500 en efectivo, actualiza todo conforme a eso a día de hoy". Tres saldos
      // dichos el mismo día: la BBVA (`d001`; su día va en `PROYECTO.bbvaSaldoFecha`), la cuenta (`ac013`) y el
      // efectivo (`ac014`), los dos con la fecha de hoy para que el riel del Plan Maestro se ancle ahí. Los
      // abonos que el plan restó solo después del 14 —el del 15 y el de hoy— no pasaron así, porque la tarjeta
      // sigue en $8,900: se quitan y el plan vuelve a contar desde hoy. Lo anotado a mano se queda.
      flag: '_saldos20261019',
      hacer: function (f) {
        const tc = (f.debts || []).find(x => x.id === 'd001');
        if (tc) {
          tc.balance = 8900; tc.fecha = '2026-10-19'; tc.planAl = '2026-10-19';
          if (Array.isArray(tc.omitidos)) tc.omitidos = tc.omitidos.filter(o => o.fecha > '2026-10-19');
        }
        if (Array.isArray(f.transactions))
          f.transactions = f.transactions.filter(t => !(t.origen === 'plan' && t.date > '2026-10-14' && t.date <= '2026-10-19'));
        if (!Array.isArray(f.activos)) f.activos = [];
        const pon = function (id, nombre, v) {
          let a = f.activos.find(x => x.id === id);
          if (!a) { a = { id: id, name: nombre, type: 'liquido', notes: '' }; f.activos.push(a); }
          a.value = v; a.fecha = '2026-10-19';
        };
        pon('ac013', 'Cuenta BBVA', 1700); pon('ac014', 'Efectivo', 2500);
      }
    },
    {
      // 2026-10-19 · "siempre en finanzas algo está desactualizado… arréglalo y que no vuelva a pasar". El auto y el
      // iPhone se pagan cada mes y su saldo no se movía: el iPhone seguía en los $11,361.54 de julio y Finanzas lo
      // contaba de tres maneras. Desde hoy cada mensualidad se aplica sola el día que toca (`aplicarPagosFijos`), y
      // `pagosAl` es el día del último saldo que se sabe: el auto, los $283,000 que Adán dijo el 21-sep (ya con el pago
      // del 15); el iPhone, los $11,361.54 del seed, que traían la cuota del 1 de julio (4 de 27). Al cargar se
      // aplican las que faltan: el auto el 15 de octubre; el iPhone el 1 de agosto, de septiembre y de octubre.
      flag: '_mensualidades20261019',
      hacer: function (f) {
        const pon = function (id, al) { const d = (f.debts || []).find(x => x.id === id); if (d && !d.pagosAl) d.pagosAl = al; };
        pon('d003', '2026-09-21'); pon('d008', '2026-07-01');
      }
    },
    {
      // 2026-10-25 · "mi deuda de bbva subió a 14,500". El saldo nuevo, dicho hoy: `d001` y su día en
      // `PROYECTO.bbvaSaldoFecha`; el plan se ancla a él y vuelve a contar desde hoy. Si el plan hubiera restado
      // solo algún abono después del 19, no pasó así —la tarjeta subió—: se quita. Lo anotado a mano se queda.
      flag: '_bbva20261025',
      hacer: function (f) {
        const tc = (f.debts || []).find(x => x.id === 'd001');
        if (tc) {
          tc.balance = 14500; tc.fecha = '2026-10-25'; tc.planAl = '2026-10-25';
          if (Array.isArray(tc.omitidos)) tc.omitidos = tc.omitidos.filter(o => o.fecha > '2026-10-25');
        }
        if (Array.isArray(f.transactions))
          f.transactions = f.transactions.filter(t => !(t.origen === 'plan' && t.date > '2026-10-19' && t.date <= '2026-10-25'));
      }
    },
  ];

  /* Las seis compras del 1-sep-2026, en un solo sitio: las usa la migración de arriba para el
     navegador que ya tiene datos, y Finanzas.html las repite en su seed para el que arranca en
     blanco. Los dos tratamientos llevan el nombre exacto del catálogo de RUTINA_PELO, para que
     el gasto y la ficha del producto se puedan cruzar. */
  const GASTOS_20260901 = [
    {id:'s066',type:'expense',desc:'Tenis Tommy Hilfiger',                  amount:1500, date:'2026-09-01',cat:'Ropa',        notes:'Compra única — de contado'},
    {id:'s067',type:'expense',desc:'Despensa del mes',                      amount:1800, date:'2026-09-01',cat:'Alimentación',notes:'Compra única — de contado'},
    {id:'s068',type:'expense',desc:'Plancha (Amazon)',                      amount:1902, date:'2026-09-01',cat:'Hogar/Renta', notes:'TC Banamex'},
    {id:'s069',type:'expense',desc:'Avodart (dutasterida 0,5 mg)',          amount:1560, date:'2026-09-01',cat:'Salud',       notes:'TC Banamex — 30 cápsulas, un mes de tratamiento'},
    {id:'s070',type:'expense',desc:'Minoxidil 5% NR-11 (Polaris Research)', amount:900,  date:'2026-09-01',cat:'Salud',       notes:'TC Banamex — 60 ml, un mes de tratamiento'},
    {id:'s071',type:'expense',desc:'Mouse',                                 amount:1623, date:'2026-09-01',cat:'Otros gastos',notes:'TC Banamex'}
  ];

  /* Los tres movimientos del 19-sep-2026 (dichos el 20): la venta de todo el Bitcoin y los dos
     pagos que salieron de ella. Los pagos se llaman como la deuda para que `yaContado` los
     empareje con el mínimo previsto de ese mes (dos palabras en común) y no los sume encima. */
  const MOVIMIENTOS_20260920 = [
    {id:'s072',type:'income', desc:'Venta de Bitcoin (todo)',                   amount:39500, date:'2026-09-19',cat:'Inversiones',notes:'0.028579 ₿, el saldo completo — para pagar la TC BBVA'},
    {id:'s073',type:'expense',desc:'Tarjeta BBVA — pago con la venta del Bitcoin', amount:38100, date:'2026-09-19',cat:'Deudas',     notes:'De $39,000 a $900: los $39,500 del Bitcoin más $4,000 de la cuenta'},
    {id:'s074',type:'expense',desc:'Tarjeta Banamex — abono',                  amount:3000,  date:'2026-09-19',cat:'Deudas',     notes:'De $7,800 a $4,900'}
  ];

  /* ── EL BITCOIN ─────────────────────────────────────────────────────────────────────
     Las operaciones de BTC vivían solo en el seed de Finanzas.html, o sea en un navegador: la
     misma fuga que tuvo el peso (ver PESO). Desde el 2026-09-16 están aquí y Finanzas las
     siembra desde `CIFRAS.BTC_SEED`, igual que hace con DEUDAS_SEED. Una compra lleva `usd`
     (lo que salió), `btcPrice` (USD por ₿ ese día), `btc` (lo recibido) y `fx` (pesos por
     dólar ese día, para que "lo aportado en pesos" no se mueva con el dólar de hoy). Una VENTA
     lleva `tipo:'venta'`, `btc` NEGATIVO (lo que salió) y `usd` lo que entró: no suma a lo
     aportado ni mueve el precio promedio, resta ₿ y cuenta como retirado.
     `fx` es el tipo de cambio de referencia del BCE ese día (api.frankfurter.dev; si cae en fin
     de semana, el del viernes anterior): 20.665 el 31-ene-2025, 17.980 el 15-dic-2025, 17.336 el
     19-jun-2026 y 17.072 el 14-sep-2026. Sin `fx` la app usaba el dólar de HOY para todas, y "lo
     aportado en pesos" se movía solo con el peso. CoinGecko da lo mismo con ±0,5 % (17.98, 17.36,
     16.99) y no llega a la compra de 2025.
     La venta del 14-sep: Adán, 16-sep-2026: "vendí 5,300 pesos de mi bitcoin antier, que valía
     79,000" — 79,000 leído como el precio del BTC en dólares ese día, dicho por él (CoinGecko:
     apertura $76,819 el 14 y $78,173 el 15; sus 0.0325 ₿ NO valían $79,000 MXN: ~$42,400).
     $5,300 / 17.072 = $310.45 USD → 0.003930 ₿. ⚠️ El ₿ exacto vendido está en el recibo de su
     exchange; hasta tenerlo, esta es la mejor cifra. Los saldos de hoy NO se editan aquí
     (Finanzas guarda los suyos); esto es el punto de partida de un navegador en blanco y la lista
     que la migración de abajo usa para completar uno que ya tenga datos.
     La venta total del 19-sep (btc005): Adán, 20-sep-2026: "vendí todos mis bitcoin y me dieron
     39,500". Salieron los 0.028579 ₿ que quedaban; $39,500 / 17.1776 (BCE del viernes 18) =
     $2,299.51 USD → $80,461 USD/₿ implícito, que casa con CoinGecko el 19 ($80,874; el 18 daba
     $76,371), de ahí la fecha. Ya no queda Bitcoin. */
  const BTC_SEED = [
    {id:'btc001', date:'2025-02-01', usd:200,    btcPrice:102007, btc:0.001960,  fx:20.665, notes:'Primera compra'},
    {id:'btc002', date:'2025-12-15', usd:2438,   btcPrice:91000,  btc:0.026791,  fx:17.980, notes:'Compra mayor'},
    {id:'btc003', date:'2026-06-21', usd:240,    btcPrice:63875,  btc:0.003758,  fx:17.336, notes:'Compra reciente'},
    {id:'btc004', tipo:'venta', date:'2026-09-14', usd:310.45, btcPrice:79000, btc:-0.003930, fx:17.072,
     notes:'Venta de $5,300 MXN (dicho el 16-sep-2026)'},
    {id:'btc005', tipo:'venta', date:'2026-09-19', usd:2299.51, btcPrice:80461, btc:-0.028579, fx:17.1776,
     notes:'Venta de TODO: $39,500 MXN, para pagar la TC BBVA (dicho el 20-sep-2026)'},
  ];

  function migrar() {
    let f;
    try { const r = localStorage.getItem(KEY); f = r ? JSON.parse(r) : null; } catch (e) { return; }
    if (!f || !Array.isArray(f.debts)) return;   // sin datos todavía: no se marca nada, se reintenta
    let toco = false;
    MIGRACIONES.forEach(function (m) {
      if (localStorage.getItem(KEY + m.flag)) return;
      try { m.hacer(f); localStorage.setItem(KEY + m.flag, '1'); toco = true; }
      catch (e) { /* una migración rota no puede tumbar la carga de la app */ }
    });
    if (toco) { try { localStorage.setItem(KEY, JSON.stringify(f)); } catch (e) {} }
  }

  /* ── Accesos a los datos, tolerantes a que falte cualquier cosa ──
     Si el navegador todavía no tiene `finanzasmx_v2` (primera vez, o se abrió Coach antes que
     Finanzas), las deudas caen a DEUDAS_SEED. No es una segunda fuente: es LA misma lista que
     Finanzas.html usa para sembrar, leída del mismo sitio. */
  const deudas = () => (fin && Array.isArray(fin.debts) ? fin.debts : DEUDAS_SEED);
  const deuda  = id => deudas().find(d => d.id === id) || null;
  const meta   = id => (fin && Array.isArray(fin.goals) ? fin.goals.find(g => g.id === id) : null) || null;
  const campo  = (id, k) => { const d = deuda(id); return d && d[k] != null ? +d[k] : null; };
  const sum    = arr => arr.reduce((a, d) => a + (+d.balance || 0), 0);

  /* Cuántos pagos quedan de una deuda, con su saldo, tasa y pago de HOY. `remainingMonths` era un
     número escrito a mano (61 desde enero) que no bajaba con el saldo: al abonar $10,000 al auto
     seguía diciendo 61. Con tasa, es la fórmula de la anualidad; sin tasa, saldo entre pago. Si el
     pago no cubre ni el interés no hay fin: null. Lo usan `autoMeses` y el detalle de intereses
     del Dashboard; `remainingMonths` queda solo como respaldo cuando falta el pago. */
  function mesesRestantes(d) {
    if (!d) return null;
    const B = +d.balance || 0, P = +d.min || 0, r = (+d.rate || 0) / 100 / 12;
    if (B <= 0) return 0;
    if (P <= 0) return d.remainingMonths != null ? +d.remainingMonths : null;
    if (r <= 0) return Math.ceil(B / P);
    if (P <= B * r) return null;
    return Math.ceil(-Math.log(1 - r * B / P) / Math.log(1 + r));
  }

  /* ── EL CATÁLOGO ──────────────────────────────────────────────────────────────────────────
     Cada clave dice de dónde sale el número y cómo se escribe (`fmt` por omisión es dinero).
     Los ids (d001, d003…) son los de `debts` en Finanzas.html — el mismo contrato que ya usan
     las migraciones `fix*IfNeeded()` del Dashboard. */
  /* ── La noche y el sueño, leídos de RUTINA_TASKS ──
     Adán, 2026-10-13: "corrige el tiempo de sueño". La rutina de lunes a viernes dormía de 23:59 a
     06:40 y el hábito decía «Dormir 7 h»; además «5h40–6h40», «el bloque de las 23:30» y «la
     meditación de las 23:10» estaban escritos a mano en Coach, Cuidado Personal y el Dashboard. Ahora
     se cita {{horaDormir}}, {{horasSueno}}… y el control 31 del verificador vigila que nadie lo copie. */
  const horaBloque = id => { const t = RUTINA_TASKS.find(x => x.id === id); return t ? t.hora : null; };
  const aMin = h => { const p = String(h).split(':'); return +p[0] * 60 + +p[1]; };
  function suenoMin() {
    const d = horaBloque('wd21'), a = horaBloque('wd01');
    return d && a ? (aMin(a) - aMin(d) + 1440) % 1440 : null;
  }
  function horasSueno() {
    const m = suenoMin(); if (m == null) return null;
    return Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + (m % 60) + ' min' : '');
  }

  const CLAVES = {
    // ── Deudas ──
    autoSaldo:     { v: () => campo('d003', 'balance') },
    autoTotal:     { v: () => campo('d003', 'total') },
    autoPago:      { v: () => campo('d003', 'min') },
    autoTasa:      { v: () => campo('d003', 'rate'), fmt: 'pct' },
    // Meses que quedan, calculados del saldo, la tasa y el pago (ver mesesRestantes).
    autoMeses:     { dep: ['autoSaldo','autoPago','autoTasa'], v: () => mesesRestantes(deuda('d003')), fmt: 'num' },
    // Derivadas del auto: lo que acabas pagando si solo das el mínimo, y cuánto de eso es
    // interés. Se calculan, no se copian — antes estaban escritas a mano en Coach y se
    // quedaron congeladas en el saldo de hace dos meses.
    autoAPagar:    { dep: ['autoMeses','autoPago'],
                     v: () => { const m = mesesRestantes(deuda('d003')), p = campo('d003','min');
                                return m != null && p != null ? m * p : null; } },
    autoInteres:   { dep: ['autoMeses','autoPago','autoSaldo'],
                     v: () => { const m = mesesRestantes(deuda('d003')), p = campo('d003','min'),
                                      s = campo('d003','balance');
                                return m != null && p != null && s != null ? m * p - s : null; } },
    tcBbva:        { v: () => campo('d001', 'balance') },
    tcBbvaMin:     { v: () => campo('d001', 'min') },
    tcBbvaTasa:    { v: () => campo('d001', 'rate'), fmt: 'pct' },
    banamex:       { v: () => campo('d002', 'balance') },
    banamexMin:    { v: () => campo('d002', 'min') },
    iphone:        { v: () => campo('d008', 'balance') },
    depto:         { v: () => campo('d012', 'balance') },
    appleWatch:    { v: () => campo('d004', 'balance') },
    // El importe de la cuota, distinto del saldo aunque hoy coincidan: queda una sola.
    appleWatchCuota: { v: () => campo('d004', 'min') },
    zapStylo:      { v: () => campo('d009', 'balance') },
    zapStyloCuota: { v: () => campo('d009', 'min') },
    // ── Totales ──
    deudaTotal:    { dep: ['*deudas'], v: () => sum(deudas()) },
    // "Deuda cara" = tarjetas de crédito con saldo vivo. Mismo criterio que la ruta de deuda
    // cara del Dashboard: los MSI a 0% no cuentan aunque tengan saldo.
    deudaCara:     { dep: ['*deudas'], v: () => sum(deudas().filter(d => d.type === 'credit_card' && +d.balance > 0)) },
    deudaMsi:      { dep: ['*deudas'], v: () => sum(deudas().filter(d => d.type === 'other' && +d.balance > 0)) },
    // ── Ahorro y metas ──
    fondo:         { v: () => (fin && fin.emergencyFund != null ? +fin.emergencyFund : null) },
    fondoMeta:     { v: () => { const g = meta('ef-001'); return g ? +g.target : null; } },
    // El dinero de la maestría NO es un campo guardado: es `fondoMaestria()`, la misma cuenta que
    // enseñan Mis Metas, los indicadores de Finanzas y Coach. Sin datos de Finanzas, null.
    maestria:      { v: () => (fin ? fondoMaestria(fin).total : null) },
    maestriaMeta:  { v: () => { const g = meta('g001');   return g ? +g.target  : null; } },
    // ── Constantes del proyecto, expuestas como marcadores ──
    // Van por PROYECTO y no por localStorage: no cambian solas, se editan aquí arriba.
    sueldo:        { v: () => PROYECTO.sueldo },
    sueldoQuinc:   { v: () => PROYECTO.sueldoQuinc },
    didiMes:       { v: () => PROYECTO.didiMes },
    siVale:        { v: () => PROYECTO.siVale },
    ingresoTotal:  { dep: ['sueldo','didiMes','siVale'], v: () => PROYECTO.ingresoTotal },
    renta:         { v: () => PROYECTO.renta },
    gym:           { v: () => PROYECTO.gym },
    gymNombre:     { v: () => PROYECTO.gymNombre, fmt: 'txt' },
    // ── La noche de lunes a viernes, de RUTINA_TASKS (ver horasSueno, arriba) ──
    horaDespertar:   { v: () => horaBloque('wd01'), fmt: 'txt' },
    horaApp:         { v: () => horaBloque('wd-app-pm'), fmt: 'txt' },
    horaRutinaNoche: { v: () => horaBloque('wd-pm'), fmt: 'txt' },
    horaGym:         { v: () => horaBloque('e1'), fmt: 'txt' },
    horaPlanMaestro: { v: () => horaBloque('wd11'), fmt: 'txt' },
    horaDormir:      { v: () => horaBloque('wd21'), fmt: 'txt' },
    horasSueno:      { v: () => horasSueno(), fmt: 'txt' },
    // `gasCadaMeses` divide al recibo antes de entrar en servicios, así que mueve el
    // total igual que el importe. Sin declararlo, el impacto quedaba invisible.
    gasMensual:    { dep: ['gas','gasCadaMeses'], v: () => PROYECTO.gasMensual },
    gasCadaMeses:  { v: () => PROYECTO.gasCadaMeses },
    servicios:     { dep: ['celular','internet','gas','gasCadaMeses','luzAgua'], v: () => PROYECTO.servicios },
    suscripciones: { dep: ['gym','claudeCode','icloud'], v: () => PROYECTO.suscripciones },
    cetesDia15:    { v: () => PROYECTO.cetesDia15 },
    especulacionMes:    { v: () => PROYECTO.especulacionMes },
    especulacionBtcPct: { v: () => PROYECTO.especulacionBtcPct, fmt: 'txt' },
    fijosTotal:    { dep: ['renta','servicios','suscripciones'], v: () => PROYECTO.fijosTotal },
    empleador:     { v: () => PROYECTO.empleador,   fmt: 'txt' },
    nombre:        { v: () => PROYECTO.nombre,      fmt: 'txt' },
    auto:          { v: () => PROYECTO.auto,        fmt: 'txt' },
    broker:        { v: () => PROYECTO.broker,      fmt: 'txt' },
    bancoSueldo:   { v: () => PROYECTO.bancoSueldo, fmt: 'txt' },
    maestriaEscuela:{ v: () => PROYECTO.maestriaEscuela, fmt: 'txt' },
    escuelaAleman: { v: () => PROYECTO.escuelaAleman, fmt: 'txt' },
    kapitelAleman: { v: () => PROYECTO.kapitelAleman, fmt: 'num' },
    proteinaMeta: { v: () => PROYECTO.proteinaMeta, fmt: 'num' },
    kcalMeta:     { v: () => PROYECTO.kcalMeta, fmt: 'num' },
    maestriaInicio:{ v: () => PROYECTO.maestriaInicio,   fmt: 'fecha' },
    // Las fechas del plan, para escribirlas en prosa sin copiarlas: `fecha` las pinta "18 jul 2027".
    decisionMaestria: { v: () => PROYECTO.maestriaDecision, fmt: 'fecha' },
    hyroxSede:     { v: () => PROYECTO.hyroxSede,  fmt: 'txt' },
    hyroxFecha:    { v: () => PROYECTO.hyroxFecha, fmt: 'fecha' },
    // El millón se fecha con el cierre de la última fase del Plan Maestro.
    metaMillon:    { v: () => PHASES[PHASES.length - 1].end, fmt: 'fecha' },
    // ── Derivadas que cruzan constantes con saldos vivos ──
    // Lo que queda del sueldo tras los fijos y los mínimos de deuda: el margen real del mes.
    margen:        { dep: ['ingresoTotal','fijosTotal','minimosDeuda'],
                     v: () => {
      const min = deudas().filter(d => +d.balance > 0).reduce((a, d) => a + (+d.min || 0), 0);
      return PROYECTO.ingresoTotal - PROYECTO.fijosTotal - min;
    } },
    minimosDeuda:  { dep: ['*deudas'], v: () => deudas().filter(d => +d.balance > 0).reduce((a, d) => a + (+d.min || 0), 0) },
    // ── La salida a Alemania (SALIDA y la PROYECCION, arriba) ──
    // Lo que cuesta irse, completo; lo que tiene que estar en la cuenta a mediados de junio (la
    // cuenta bloqueada y la visa), y la cuenta bloqueada sola. Se mueven con el euro del plan.
    salidaTotal:   { dep: ['eurMxn'], v: () => SALIDA.costos.reduce((a, c) => a + costoSalida(c), 0) },
    salidaJunio:   { dep: ['eurMxn'], v: () => SALIDA.costos.filter(c => SALIDA.junio.indexOf(c.id) !== -1).reduce((a, c) => a + costoSalida(c), 0) },
    sperrkonto:    { dep: ['eurMxn'], v: () => costoSalida(SALIDA.costos.filter(c => c.id === 'bloqueada')[0]) },
    // En euros, como los pide Alemania: la cuenta bloqueada, la colegiatura de cada semestre y lo
    // que deja el Werkstudent al mes (SUPUESTOS.alemania); y lo que deja el BYD rentado, neto.
    sperrkontoEur: { fmt: 'txt', v: () => '€' + SALIDA.costos.filter(c => c.id === 'bloqueada')[0].eur.toLocaleString('es-MX') },
    colegiaturaEur: { fmt: 'txt', v: () => '€' + SUPUESTOS.alemania.colegiatura.toLocaleString('es-MX') },
    werkstudentEur: { fmt: 'txt', v: () => '€' + SUPUESTOS.alemania.werkstudent.toLocaleString('es-MX') },
    bydRenta:      { v: () => SUPUESTOS.byd.rentaNeta },
    // ── El ahorro de cada mes en México (el desglose renglón por renglón, en Coach) ──
    didiAhorro:      { v: () => PROYECTO.didiAhorro },
    didiAhorroMas:   { v: () => PROYECTO.didiAhorroMas },
    aporteCasa:      { v: () => PROYECTO.aporteCasa },
    ahorroDia1:      { v: () => PROYECTO.ahorroDia1 },
    ahorroDia15:     { v: () => PROYECTO.ahorroDia15 },
    ahorroDia1Casa:  { v: () => PROYECTO.ahorroDia1Casa },
    ahorroDia15Casa: { v: () => PROYECTO.ahorroDia15Casa },
    // La BBVA, quincena a quincena: el día que queda en cero y lo que cuesta en intereses.
    bbvaCero:        { fmt: 'fecha', v: () => planBbva().fin },
    // Los abonos que siguen, en una frase («hoy, $1,154 de Didi; el lunes 26, …»): sale del plan de cada día.
    bbvaRuta:        { fmt: 'txt', v: () => bbvaRutaTxt() },
    bbvaIntereses:   { v: () => Math.round(planBbva().intereses) },
    // Lo que llega a GBM en un mes tipo, con depa (hasta enero) y en casa.
    ahorroMesDepa:   { dep: ['ahorroDia1','ahorroDia15','didiAhorro'], v: () => mesTipo(false).ahorro },
    ahorroMesCasa:   { dep: ['ahorroDia1Casa','ahorroDia15Casa','didiAhorroMas'], v: () => mesTipo(true).ahorro },
    // Lo que queda del sueldo después de los fijos, la comida y el ahorro: el gasto personal, con
    // sus rutinas dentro. Las rutinas solas son `cuidadoMes`.
    cuidadoMes:      { v: () => cuidadoMes() },
    // Lo que se ahorraría al mes con todos los recortes de las rutinas (el detalle, en Coach).
    recorteRutinas:  { v: () => rutinasDesglose().ahorro },
    gastoPersonalDepa: { dep: ['sueldoQuinc','renta','servicios','suscripciones','ahorroDia1','ahorroDia15'],
                         v: () => { const t = mesTipo(false); return t.g.cuidado + t.g.personal; } },
    gastoPersonalCasa: { dep: ['sueldoQuinc','celular','suscripciones','aporteCasa','ahorroDia1Casa','ahorroDia15Casa'],
                         v: () => { const t = mesTipo(true); return t.g.cuidado + t.g.personal; } },
    // La proyección en sus cortes: el cierre de la Fase 1, junio y agosto, con su veredicto. Se
    // calculan cada vez: el verificador las mueve.
    alemaniaMarzo:   { dep: ['ahorroDia1','ahorroDia15','ahorroDia1Casa','ahorroDia15Casa','didiAhorro','didiAhorroMas'],
                       v: () => proyectar().filter(f => f.mes === mesDe(PHASES[1].end))[0].alemania },
    alemaniaJunio:   { dep: ['ahorroDia1','ahorroDia15','ahorroDia1Casa','ahorroDia15Casa','didiAhorro','didiAhorroMas','eurMxn'],
                       v: () => cortesSalida(proyectar()).junio.tiene },
    junioVeredicto:  { dep: ['ahorroDia1','ahorroDia15','ahorroDia1Casa','ahorroDia15Casa','didiAhorro','didiAhorroMas','eurMxn'], fmt: 'txt',
                       v: () => { const c = cortesSalida(proyectar()).junio;
                         return c.falta > 0 ? 'faltan ' + fmt(c.falta) + ' para la cuenta bloqueada' : 'alcanza, con ' + fmt(-c.falta) + ' de margen'; } },
    // Lo mismo en corto, para una cifra grande: «faltan …» o «sobran …».
    junioCorto:      { dep: ['ahorroDia1','ahorroDia15','ahorroDia1Casa','ahorroDia15Casa','didiAhorro','didiAhorroMas','eurMxn'], fmt: 'txt',
                       v: () => { const c = cortesSalida(proyectar()).junio;
                         return c.falta > 0 ? 'faltan ' + fmt(c.falta) : 'sobran ' + fmt(-c.falta); } },
    salidaVeredicto: { dep: ['ahorroDia1','ahorroDia15','ahorroDia1Casa','ahorroDia15Casa','didiAhorro','didiAhorroMas','eurMxn'], fmt: 'txt',
                       v: () => { const c = cortesSalida(proyectar()).salida;
                         return c.falta > 0 ? 'faltan ' + fmt(c.falta) : 'sobran ' + fmt(-c.falta); } },
    // Lo que pide la salida completa en agosto: la cuenta bloqueada, la reserva del BYD, el colchón
    // y la colegiatura del primer semestre (el corte `salida`).
    salidaAgosto:    { dep: ['eurMxn'], v: () => cortesSalida(proyectar()).salida.pide },
    // El ingreso nuevo que cierra ese corte, al mes desde `SUPUESTOS.extraDesde`, y lo que tendría
    // GBM con él al cerrar la Fase 1 y el día de decidir: los dos puntos de control de la salida.
    extraSalida:     { dep: ['ahorroDia1','ahorroDia15','ahorroDia1Casa','ahorroDia15Casa','didiAhorro','didiAhorroMas','eurMxn'], v: () => salidaConIngreso().mes },
    marzoParaSalida: { dep: ['ahorroDia1','ahorroDia15','ahorroDia1Casa','ahorroDia15Casa','didiAhorro','didiAhorroMas','eurMxn'], v: () => salidaConIngreso().marzo },
    mayoParaSalida:  { dep: ['ahorroDia1','ahorroDia15','ahorroDia1Casa','ahorroDia15Casa','didiAhorro','didiAhorroMas','eurMxn'], v: () => salidaConIngreso().mayo },
    // Si la salida se mueve a septiembre de 2028: «sobran …» o «faltan …» en su corte de agosto.
    salida2028:      { dep: ['ahorroDia1','ahorroDia15','ahorroDia1Casa','ahorroDia15Casa','didiAhorro','didiAhorroMas','eurMxn'], fmt: 'txt',
                       v: () => { const c = cortesSalida(proyectar({ desfase: 12 }), { desfase: 12 }).salida;
                         return c.falta > 0 ? 'faltan ' + fmt(c.falta) : 'sobran ' + fmt(-c.falta); } },
    // El mes en que la proyección cruza el millón (lo mueve sobre todo el euro: el sueldo de allá).
    mesMillon:     { dep: ['eurMxn'], fmt: 'mes',
                     v: () => { const f = proyectar().filter(x => x.liquido >= 1000000)[0]; return f ? new Date(f.mes + '-01T00:00:00') : null; } },
    // Desde el 20-sep-2026 el fondo de emergencia SON los CETES (Adán: "mi fondo de emergencia
    // van a ser los cetes, de ahí tendré mi fondo de emergencia y cualquier cosa los vendo").
    // Un solo número: `emergencyFund`. Ya no hay inversión CETES aparte que sumar dos veces.
    cetes:         { dep: ['fondo'], v: () => (fin && fin.emergencyFund != null ? +fin.emergencyFund : null) },
  };


  /* ── EL MAPA DE DEPENDENCIAS ───────────────────────────────────────────────────────────────
     Adán, 2026-08-25: "si se actualiza esa variable, va influir en otras variables, entonces
     debes mapear muy muy bien las variables que se relacionan unas con otras".

     Es lo que faltaba. Cambiar `gym` de $1,500 a $650 movió también `suscripciones`,
     `fijosTotal` y `margen` — los cálculos se ajustaron solos porque son getters, pero las
     TABLAS de los .md se quedaron con los valores viejos hasta que alguien se acordó.

     Cada derivada declara su `dep`. `*deudas` significa "cualquier cambio en la lista de
     deudas" (un saldo, un mínimo, una que se liquida).

     `CIFRAS.impacto('gym')` responde qué más hay que revisar antes de dar el cambio por
     terminado. `verificar-sincronia.js` comprueba que lo declarado coincida con lo REAL,
     midiéndolo por perturbación: cambia una base y mira qué se movió de verdad. Una
     dependencia que se olvide declarar salta ahí, no meses después. */
  /* `*deudas` es un comodín: cualquier clave que salga de la lista de deudas mueve a las que
     agregan esa lista. Sin esto, cambiar el saldo del Apple Watch mostraba `deudaTotal` como si
     alguien la hubiera editado a mano, en vez de como lo que es: algo que se movió con él. */
  const DE_DEUDAS = ['autoSaldo','autoTotal','autoPago','autoMeses','tcBbva','tcBbvaMin',
                     'banamex','banamexMin','iphone','appleWatch','zapStylo','zapStyloCuota'];
  function impacto(clave) {
    const comodin = DE_DEUDAS.indexOf(clave) !== -1;
    const directos = Object.keys(CLAVES).filter(function (k) {
      const dep = CLAVES[k].dep || [];
      return dep.indexOf(clave) !== -1 || (comodin && dep.indexOf('*deudas') !== -1);
    });
    const todos = directos.slice();
    directos.forEach(function (d) {
      impacto(d).forEach(function (x) { if (todos.indexOf(x) === -1) todos.push(x); });
    });
    return todos;
  }

  /* Todo el grafo de una vez: { clave: [lo que se mueve si la tocas] }. Solo las que mueven algo. */
  function grafo() {
    const g = {};
    const bases = Object.keys(PROYECTO).filter(k => typeof PROYECTO[k] === 'number')
      .concat(Object.keys(CLAVES));
    bases.forEach(function (k) { const i = impacto(k); if (i.length) g[k] = i; });
    return g;
  }
  // ── Formato ──
  // Los saldos se escriben redondeados al peso, que es como aparecen en la prosa de las tres
  // apps ("$292,000", "$11,362"). Los centavos solo importan dentro de Finanzas.
  function fmt(num, tipo) {
    if (num == null) return VACIO;
    if (tipo === 'txt') return String(num);        // antes que isNaN: un texto no es un número
    if (tipo === 'fecha' || tipo === 'mes') {        // Date o 'AAAA-MM-DD' → "1 oct 2028" · mes: "may 2031"
      const d = num instanceof Date ? num : new Date(String(num) + 'T00:00:00');
      if (isNaN(d)) return VACIO;
      return tipo === 'mes' ? d.toLocaleDateString('es-MX', { month: 'short', year: 'numeric' })
                            : d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    if (isNaN(num)) return VACIO;
    if (tipo === 'txt') return String(num);
    if (tipo === 'pct') return (Math.round(num * 100) / 100) + '%';
    if (tipo === 'num') return String(Math.round(num));
    return '$' + Math.round(num).toLocaleString('es-MX');
  }

  function n(clave) {
    const c = CLAVES[clave];
    if (!c) return null;
    try { return c.v(); } catch (e) { return null; }
  }
  function v(clave) { const c = CLAVES[clave]; return c ? fmt(n(clave), c.fmt) : VACIO; }

  // Un marcador desconocido se deja tal cual, a la vista: un {{tipoDeDedo}} en pantalla se
  // detecta al instante, mientras que borrarlo en silencio dejaría una frase mutilada.
  function texto(s) {
    if (typeof s !== 'string' || s.indexOf('{{') === -1) return s;
    return s.replace(/\{\{(\w+)\}\}/g, function (m, k) { return CLAVES[k] ? v(k) : m; });
  }

  /* Recorre el HTML ya pintado y sustituye los marcadores. Solo toca nodos de TEXTO, así que
     no puede romper etiquetas ni atributos, y se puede volver a llamar cuantas veces haga
     falta: una vez sustituido, el nodo ya no contiene "{{" y se salta solo. */
  function aplicarDOM(root) {
    const base = root || document.body;
    if (!base) return 0;
    const it = document.createTreeWalker(base, NodeFilter.SHOW_TEXT, {
      acceptNode: function (nd) {
        return nd.nodeValue && nd.nodeValue.indexOf('{{') !== -1
          ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const pend = [];
    while (it.nextNode()) pend.push(it.currentNode);
    pend.forEach(function (nd) { nd.nodeValue = texto(nd.nodeValue); });
    // Los `title` (tooltips) también llevan cifras y no son nodos de texto.
    base.querySelectorAll('[title*="{{"]').forEach(function (el) { el.title = texto(el.title); });
    return pend.length;
  }

  function refrescar() { leer(); return aplicarDOM(); }

  // Diagnóstico: `CIFRAS.tabla()` en la consola lista todo lo que hay, para comprobar de un
  // vistazo que una pantalla dice lo mismo que Finanzas.
  function tabla() {
    const o = {};
    Object.keys(CLAVES).forEach(function (k) { o[k] = v(k); });
    return o;
  }

  // Las migraciones van ANTES de la primera lectura: así todo lo que venga después —esta misma
  // caché, y el load() de la app que nos cargó— ya ve los saldos corregidos.
  migrar();
  leer();
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { aplicarDOM(); });
    else aplicarDOM();
  }

  /* ── EL BALANCE MENSUAL, PARA LAS DOS APPS ──────────────────────────────────────────────────
     Adán, 2026-09-07: *"también el html de finanzas la gráfica está mal, debería estar como la
     que hiciste hace rato"*. El Dashboard ya armaba cada mes en dos capas; Finanzas seguía
     sumando `transactions` a secas y por eso pintaba meses en cero. En vez de copiar la lógica
     —que es justo lo que este archivo existe para evitar— vive aquí y las dos la llaman.

     CADA MES SE ARMA EN DOS CAPAS:

     1. Lo PREVISTO — lo que ya se sabe y no cambia de mes a mes: las dos quincenas, la renta,
        el crédito del auto, los servicios, los mínimos de las tarjetas (de `CALENDARIO.cobros`
        y del `day`/`min` de cada deuda), más los tres que van por TOTAL MENSUAL y no tienen
        día: Didi, el vale y lo que cuesta comer.
     2. Lo REGISTRADO — las transacciones que la agenda no conoce. `yaContado` evita el doble
        conteo: si la renta está anotada a mano, no se suma otra vez.

     Un cero que en realidad es "no lo anoté" miente más que una previsión bien etiquetada, y
     de ahí la capa 1. Cada concepto sale marcado con `prev`, para que la pantalla pueda pintar
     distinto lo previsto y lo anotado. */

  const CT_VACIAS = ['del','los','las','por','con','una','uno','para','que','sus','este','esta','mes','pago'];

  function palabras(s) {
    return String(s || '').toLowerCase().split(/[^a-záéíóúüñ0-9]+/)
      .filter(function (w) { return w.length >= 3 && CT_VACIAS.indexOf(w) === -1; });
  }
  function norm(s) {
    return String(s || '').toLowerCase().split(/[^a-záéíóúüñ0-9]+/).filter(Boolean).sort().join(' ');
  }

  /* ── La tarjeta de crédito que nombra un movimiento, y lo que le hace a su saldo ─────────────
     La convención de Finanzas («Transacciones» en readme_finanzas.md): lo pagado con tarjeta de
     crédito la nombra en la nota («TC BBVA»), y un pago a la tarjeta va en Deudas y la nombra en la
     nota o en la descripción («Pago: Tarjeta BBVA»). Una sola regla para las dos apps: el Dashboard
     la usa para saber qué no sale de la caja ese día y Finanzas para mover el saldo de la tarjeta
     (Adán, 15-oct-2026: "debe actualizarse lo de tarjeta de bbva solito, en base a cuánto gasto y
     cuánto gano cada día"). «Débito» en la nota es la cuenta, no la tarjeta, y una tarjeta cancelada
     (`cancelada`) ya no se nombra: su banco en una nota es la cuenta de débito. */
  function tarjetaDe(t, debts) {
    if (!t || t.type !== 'expense') return null;
    const txt = (String(t.notes || '') + (t.cat === 'Deudas' ? ' ' + String(t.desc || '') : '')).toLowerCase();
    if (/d[eé]bito/.test(txt)) return null;
    return (debts && debts.length ? debts : deudas()).filter(function (d) {
      return d.type === 'credit_card' && !d.cancelada &&
        palabras(d.name).some(function (w) { return w !== 'tarjeta' && txt.indexOf(w) !== -1; });
    })[0] || null;
  }
  /* Lo que el movimiento le hace al saldo de su tarjeta: `{id, delta}` —una compra suma, un pago
     (Deudas) resta— o null. Una compra a meses sin intereses es su propia deuda (`type:'other'`) y
     no toca el saldo de la tarjeta. Solo cuenta lo anotado con fecha POSTERIOR al último saldo que
     dijo Adán (`corteTarjeta`): ese saldo ya traía lo de ese día y lo de antes. `ahora`: un pago que
     se está haciendo («Pagar» en Finanzas, «Ya lo mandé» en el Plan Maestro), que cuenta con la
     fecha que lleve. */
  function movimientoTarjeta(t, debts, ahora) {
    const d = tarjetaDe(t, debts), monto = +(t && t.amount) || 0;
    if (!d || !(monto > 0) || /\bmsi\b/i.test(String(t.notes || '') + ' ' + String(t.desc || ''))) return null;
    if (!ahora && !(String(t.date || '') > corteTarjeta(d))) return null;
    return { id: d.id, delta: t.cat === 'Deudas' ? -monto : monto };
  }
  // El último día en que Adán dijo el saldo de una tarjeta: `saldoAl` (lo escribe Finanzas cuando se
  // edita a mano), sus liquidaciones del seed y, para la BBVA, `PROYECTO.bbvaSaldoFecha`.
  function corteTarjeta(d) {
    const sd = DEUDAS_SEED.filter(function (x) { return x.id === d.id; })[0] || {};
    return [String(d.saldoAl || ''), d.id === 'd001' ? String(PROYECTO.bbvaSaldoFecha || '') : '']
      .concat(sd.liquidaciones || []).sort().pop() || '';
  }

  /* ¿Este movimiento ya está en la agenda del mes? Se mira por nombre y, si comparten una
     sola palabra, además por importe. Es lo que evita contar la renta dos veces cuando
     además está anotada a mano. Un pago a la BBVA de después de su último saldo dicho lo pone
     el plan en su día (`planBbva`): ya está, aunque se llame distinto. */
  function yaContado(t, agenda) {
    if (t.notes === '[recurrente]') return true;
    if (pagoBbva(t) > 0) return true;
    const imp = Math.round(+t.amount || 0), pt = palabras(t.desc), nt = norm(t.desc);
    return (agenda || []).some(function (f) {
      if (norm(f.t) === nt) return true;
      const pf = palabras(f.t);
      const comunes = pt.filter(function (w) { return pf.indexOf(w) !== -1; }).length;
      if (comunes >= 2) return true;
      return comunes >= 1 && Math.abs(Math.round(+f.monto || 0) - imp) <= 1;
    });
  }

  /* ¿Este ingreso es la nómina? Adán, 2026-09-07: "mi sueldo solo son 20,500 cada quincena, no
     lo cuentes más veces, porque no gano el doble".

     LA NÓMINA APORTA `sueldo` AL MES Y PUNTO —las dos quincenas del calendario—. Un movimiento
     de nómina anotado es ESE MISMO dinero, no dinero de más, así que no se suma encima.

     `yaContado` no bastaba: compara palabras contra "Quincena", así que cazaba "Quincena ALTEN"
     pero se le escapaban "Sueldo", "Nómina" o "Depósito" —y cada uno sumó $20,500 de más—. Aquí
     manda la CATEGORÍA, que es lo que Finanzas guarda siempre, con las palabras como red por si
     estuviera mal categorizado. `palabras` no quita acentos, de ahí nómina con tilde y sin ella.

     El precio: un bono extraordinario anotado como 'Salario' tampoco se sumaría. Va en otra
     categoría —Bonos, u Otros ingresos— y entonces sí entra. */
  const NOMINA_PAL = ['quincena', 'sueldo', 'nomina', 'nómina', 'salario', 'alten'];
  function esNomina(t) {
    if (t.cat === 'Salario') return true;
    const pd = palabras(t.desc);
    return NOMINA_PAL.some(function (w) { return pd.indexOf(w) !== -1; });
  }

  /* Lo que está PROGRAMADO un día concreto, venga de donde venga: los cobros del calendario y
     el mínimo de cada deuda que se paga ese día.
     Una tarjeta con `noInterest` se paga COMPLETA (Adán, 30-sep-2026: "ya estoy pagando todo y
     no me cobran intereses"): en su PRÓXIMO pago sale el total del estado de cuenta, no el
     mínimo. Los meses de después siguen con el mínimo: esos estados de cuenta aún no existen, y
     inventarles un total sería peor que quedarse corto. */
  /* Si un cobro cae en el mes `mes` ('AAAA-MM'). El gas es bimestral: `cada` dice cada cuántos
     meses y `desde` desde cuál se cuenta. Sin `cada`, `desde` es el primer mes en que cae (el
     aporte a la casa, desde febrero de 2027) y `hasta` el último (la renta, en enero). Sin esos
     campos, cae siempre. `promedio`, para un mes tipo: el bimestral cae todos los meses y quien
     suma lo divide entre `cada`. */
  function caeEnMes(c, mes, promedio) {
    if (!mes) return true;
    if (c.cada > 1 && c.desde) {
      if (!promedio) {
        const a0 = c.desde.split('-').map(Number), a1 = mes.split('-').map(Number);
        if (((a1[0] - a0[0]) * 12 + (a1[1] - a0[1])) % c.cada !== 0) return false;
      }
    } else if (c.desde && mes < c.desde) return false;
    if (c.hasta && mes > c.hasta) return false;
    return true;
  }
  function agendaDia(dia, ym, debts) {
    const out = [];
    const mes = ym || '';
    // La BBVA con plan de pago (`planBbva`): lo que le toca ese día sale del envío a GBM de la
    // quincena —o, el día de pago, de lo de Didi para completar el mínimo— y su pago genérico, el
    // mínimo o el total, deja de pintarse. Lo de Didi de cada lunes no pasa por aquí: Didi no está
    // en el calendario.
    // Lo que la tarjeta le quita a GBM es lo previsto: si se mandó menos —o nada («No lo mandé»)—, la
    // diferencia se queda en la cuenta para la quincena, no se va a GBM mientras la tarjeta tenga saldo.
    const B = mes ? planBbva() : null, fecha = mes + '-' + String(dia).padStart(2, '0');
    const tarjeta = B ? B.abonos.filter(function (a) { return a.fecha === fecha && a.de !== 'didi'; }) : [];
    let resta = tarjeta.reduce(function (s, a) { return s + (a.de === 'quincena' ? (a.hecho ? a.plan : a.monto) : 0); }, 0) +
      (B ? (B.omitidos || []).reduce(function (s, o) { return s + (o.fecha === fecha && o.de === 'quincena' ? o.plan : 0); }, 0) : 0);
    (CALENDARIO.cobros || []).forEach(function (c) {
      if (c.dia !== dia || !caeEnMes(c, mes)) return;
      let monto = c.monto;
      if (c.quincena && c.ahorro && resta > 0) { const x = Math.min(resta, monto); monto -= x; resta -= x; }
      if (c.ahorro && !(monto > 0)) return;
      out.push({ t: c.txt, monto: monto, entra: !!c.entra, ahorro: !!c.ahorro });
    });
    tarjeta.forEach(function (a) {
      out.push({ t: a.de === 'minimo' ? 'Tarjeta BBVA — el pago del ' + dia + ', con lo de Didi'
                  : a.de === 'extra' ? 'Tarjeta BBVA — un abono de más'
                  : a.hecho ? 'Tarjeta BBVA — lo que mandaste de la quincena' : 'Tarjeta BBVA — lo que sobra de la quincena',
                 monto: a.monto, entra: false, tarjeta: true, de: a.de, hecho: !!a.hecho });
    });
    const DEU = (debts && debts.length) ? debts : deudas();
    const hoy = new Date();
    const proximo = function (d) {      // el mes del próximo pago de esa deuda, 'YYYY-MM'
      const m = hoy.getDate() <= d.day ? hoy.getMonth() : hoy.getMonth() + 1;
      const f = new Date(hoy.getFullYear(), m, 1);
      return f.getFullYear() + '-' + String(f.getMonth() + 1).padStart(2, '0');
    };
    DEU.forEach(function (d) {
      if (d.day !== dia || !(+d.balance > 0) || !(+d.min > 0)) return;
      if (d.id === 'd001' && B && B.desde && fecha >= B.desde) return;     // la paga el plan
      if (+d.noInterest > 0 && mes === proximo(d))
        out.push({ t: d.name + ' — pago total, sin intereses', monto: +d.noInterest, entra: false });
      else out.push({ t: d.name, monto: +d.min, entra: false });
    });
    return out;
  }

  /* Lo que cuesta comer al mes. Se DERIVA de la lista de compras, que con sus precios vive en
     `dashboard.html` (153 KB que no tiene sentido cargar en las tres apps). El Dashboard lo
     calcula y lo deja aquí; Finanzas lo lee de aquí. Es una caché de un dato que se calcula en
     un solo sitio, no una segunda copia del dato. Si Adán nunca abrió el Dashboard en este
     navegador, vale 0 y la comida sencillamente no entra —mejor faltar que inventar—. */
  const COME_KEY = KEY + '_comeDia';
  function guardarComeDia(v) {
    if (!(+v > 0)) return;
    // Con decimales: redondear aquí hacía que el mismo mes diera $2,737 en una app y
    // $2,746 en la otra, que es justo lo que este archivo existe para evitar.
    try { localStorage.setItem(COME_KEY, String(+v)); } catch (e) {}
  }
  function comeDia() {
    try { return +localStorage.getItem(COME_KEY) || 0; } catch (e) { return 0; }
  }

  /* La serie de los últimos `n` meses hasta `hastaYM` (incluido). `opts.tx` y `opts.debts`
     permiten pasar los datos ya en memoria —Finanzas los tiene más frescos que localStorage—. */
  /* Lo que cuesta comer un día de `ym`: lo de la lista de compras (`come`), salvo en casa de su
     familia, donde paga solo su desayuno (`SUPUESTOS.comidaEnCasa` al mes). */
  function comerEnMes(ym, come) {
    const P = PROYECTO;
    return ym >= P.enCasaDesde && ym <= P.ultimoMesMexico ? SUPUESTOS.comidaEnCasa / 30.4 : come;
  }
  function balanceMeses(hastaYM, n, opts) {
    const O = opts || {};
    const TX = O.tx || (fin && Array.isArray(fin.transactions) ? fin.transactions : []);
    const DEU = (O.debts && O.debts.length) ? O.debts : deudas();
    const MC = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const cuantos = Math.max(1, n || 6);
    const base = /^\d{4}-\d{2}$/.test(hastaYM || '')
      ? new Date(+hastaYM.slice(0, 4), +hastaYM.slice(5, 7) - 1, 1)
      : new Date();
    const come = comeDia();
    const out = [];

    for (let i = cuantos - 1; i >= 0; i--) {
      const d = new Date(base.getFullYear(), base.getMonth() - i, 1);
      const k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
      const nDias = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

      let inc = 0, exp = 0, nTx = 0;
      const cosas = {};
      /* Una entrada por CONCEPTO: seis despensas del mismo mes son una línea con un 6×.
         `prev` distingue lo previsto de lo anotado, y solo cae a false: si un concepto tiene
         las dos cosas, manda el hecho real. */
      const anota = function (desc, v, tipo, cat, prev) {
        const o = cosas[desc] = cosas[desc] || { inc: 0, exp: 0, veces: { inc: 0, exp: 0 }, cat: cat, prev: prev };
        o[tipo] += v; o.veces[tipo]++;
        if (!prev) { o.prev = false; o.cat = cat; }
      };

      // ── Capa 1a: lo previsto con día fijo ──
      const fijos = [], entradas = [];
      for (let dd = 1; dd <= nDias; dd++) {
        agendaDia(dd, k, DEU).forEach(function (a) {
          const v = +a.monto || 0;
          if (!v) return;
          (a.entra ? entradas : fijos).push(a);
          if (a.entra) { inc += v; anota(a.t, v, 'inc', '__entra', true); }
          // Lo que se aparta (el ahorro de cada quincena) se queda en `fijos` para que una
          // transacción que lo anote no se cuente encima, pero no es gasto.
          else if (!a.ahorro) { exp += v; anota(a.t, v, 'exp', a.t, true); }
        });
      }

      /* ── Capa 1b: LOS TRES QUE VAN POR TOTAL MENSUAL ──
         Ni Didi, ni el vale, ni comer tienen día: uno se cobra por semana, otro llega solo y el
         tercero es todos los días. Van como un concepto cada uno, que es como se leen ("comer me
         cuesta $2,746 al mes", no treinta líneas de $92).

         Y NO los caza `yaContado`, que compara importes: un cobro de Didi de $2,800 no se parece
         a los $11,200 del mes, así que se habrían contado los dos. Cada uno lleva su lista de
         palabras y su categoría; si el mes tiene algo anotado que caiga ahí, MANDA LO ANOTADO y
         la previsión no se pone. Un dato real siempre gana a una estimación. */
      const MENSUALES = [
        { t: 'Didi', tipo: 'inc', cat: '__entra', monto: PROYECTO.didiMes,
          pal: ['didi', 'uber', 'viajes'], txCat: 'Freelance/Honorarios' },
        { t: 'Vale de despensa', tipo: 'inc', cat: '__entra', monto: PROYECTO.siVale,
          pal: ['vale', 'sivale'] },
        { t: 'Comer', tipo: 'exp', cat: 'comida', monto: comerEnMes(k, come) * nDias,
          pal: ['comer', 'comida', 'despensa', 'super', 'supermercado', 'mandado', 'alimentacion'] }
      ].filter(function (x) { return +x.monto > 0; });

      const delMes = TX.filter(function (t) {
        return t && t.date && String(t.date).slice(0, 7) === k;
      });
      MENSUALES.forEach(function (x) {
        const tipoTX = x.tipo === 'inc' ? 'income' : 'expense';
        const cubierto = delMes.some(function (t) {
          if (t.type !== tipoTX) return false;
          if (x.txCat && t.cat === x.txCat) return true;
          const pd = palabras(t.desc);
          return x.pal.some(function (w) { return pd.indexOf(w) !== -1; });
        });
        if (cubierto) return;
        if (x.tipo === 'inc') inc += x.monto; else exp += x.monto;
        anota(x.t, x.monto, x.tipo, x.cat, true);
        cosas[x.t].veces[x.tipo] = 1;   // es un total del mes, no un movimiento suelto
      });

      // ── Capa 2: lo registrado que la agenda no conoce ──
      delMes.forEach(function (t) {
        nTx++;
        const v = +t.amount || 0;
        if (!v) return;
        const desc = String(t.desc || '').trim() || t.cat || 'Sin concepto';
        if (t.type === 'income') {
          if (esNomina(t) || yaContado(t, entradas)) return;   // la nómina ya está puesta, fija
          inc += v; anota(desc, v, 'inc', t.cat || '', false);
        } else if (t.type === 'expense') {
          if (yaContado(t, fijos)) return;
          exp += v; anota(desc, v, 'exp', t.cat || '', false);
        }
      });

      out.push({
        ym: k, lbl: MC[d.getMonth()] + ' ' + String(d.getFullYear()).slice(2),
        inc: inc, exp: exp, bal: inc - exp, n: nTx, cosas: cosas
      });
    }
    return out;
  }

  /* ── EL PATRIMONIO — una sola fórmula ──────────────────────────────────────────────────────
     Neto: inversiones, fondo de emergencia, activos (líquidos y bienes) y Bitcoin a precio de
     hoy, menos todas las deudas. Líquido: lo mismo sin los bienes (auto, gadgets, muebles), que
     es lo que cuenta para el millón. Era la cuenta de `patrimonioNeto()` del Dashboard; Coach
     llevaba otra que dejaba fuera la cuenta, el efectivo y el Bitcoin, y su "patrimonio líquido
     hoy" salía distinto del mismo número en el Dashboard. `f` es un `finanzasmx_v2` ya leído
     (el Dashboard pasa el suyo); sin él, el que leyó este módulo. */
  function patrimonio(f) {
    const F = f || fin || {};
    const inv = (F.investments || []).reduce((s, i) => s + (+i.value || +i.invested || 0), 0);
    const ef = +F.emergencyFund || 0;
    const act = F.activos || [];
    const liquidos = act.filter(a => a.type === 'liquido').reduce((s, a) => s + (+a.value || 0), 0);
    const bienes = act.filter(a => a.type !== 'liquido').reduce((s, a) => s + (+a.value || 0), 0);
    const btc = (F.btcHistory || []).reduce((s, x) => s + (+x.btc || 0), 0) *
                (+F.currentBtcPrice || 0) * (+F.usdMxn || 19.5);
    const deuda = (F.debts || []).reduce((s, d) => s + (+d.balance || 0), 0);
    const neto = inv + ef + liquidos + bienes + btc - deuda;
    return { neto: neto, liquido: neto - bienes, bienes: bienes, deuda: deuda };
  }

  /* ── EL DINERO DE LA MAESTRÍA — una sola cuenta ────────────────────────────────────────────
     Lo que hoy tienes para irte: el fondo de emergencia (los CETES), cada inversión registrada en
     Finanzas —hoy el depósito de la renta, que vuelve al dejar el depa— y el Bitcoin a precio de
     hoy. Adán, 2026-10-13, sobre los $17,250 de Mis Metas: *"esta cifra es la correcta… te dije que
     ligaras los datos entre sí para que no pasara nunca esto"*. Había cinco copias de esta suma en
     Finanzas, otra en el Dashboard, y `{{maestria}}` leía un `current` escrito a mano ($53,740).
     Ahora todas llaman aquí, y el control 30 del verificador lo vigila.
     `f` es un `finanzasmx_v2` ya leído; sin él, el que leyó este módulo. */
  function fondoMaestria(f) {
    const F = f || fin || {};
    const ef = +F.emergencyFund || 0;
    const inversiones = (F.investments || []).map(function (i) {
      return { id: i.id, n: i.name || 'Inversión', tipo: i.type || '', v: +i.value || +i.invested || 0, rate: i.rate };
    }).filter(function (i) { return i.v > 0; });
    const inv = inversiones.reduce(function (s, i) { return s + i.v; }, 0);
    const held = (F.btcHistory || []).reduce(function (s, x) { return s + (+x.btc || 0); }, 0);
    const precio = +F.currentBtcPrice || 0, fx = +F.usdMxn || 19.5;
    // Vendido todo, el historial deja -0.000000 ₿: nunca resta.
    const btc = Math.max(0, held * precio * fx);
    return { ef: ef, inversiones: inversiones, inv: inv, btc: btc, btcHeld: held, total: ef + inv + btc };
  }

  // Los abonos del plan y las mensualidades que ya llegaron se anotan solos (aplicarPlanBbva,
  // aplicarPagosFijos); después, la proyección.
  try { if (aplicarPlanBbva() + aplicarPagosFijos()) leer(); } catch (e) { /* sin localStorage (el verificador): nada que aplicar */ }
  // La proyección del Plan Maestro (ver PROYECCION, arriba), ya con todo lo que lee declarado.
  PROYECCION.meses = proyectar();
  PROYECCION.cortes = cortesSalida(PROYECCION.meses);
  // El patrimonio que espera cada fase al cerrar sale de la proyección; la última, del millón.
  PHASES.forEach(function (f, i) {
    if (i === 0) return;
    if (i === PHASES.length - 1) { f.liquido = 1000000; return; }
    const r = PROYECCION.meses.filter(function (m) { return m.mes === mesDe(f.end); })[0];
    if (r) f.liquido = Math.round(r.liquido / 1000) * 1000;
  });

  /* ── El avance de la BBVA, desde que arrancó el plan quincena a quincena ───────────────────────
     Adán, 2026-10-13: "el 74% ya es 0%". El tablero enseñaba el promedio de los tres pasos de la
     ruta (fondo, Banamex y BBVA) y Mis Metas lo pagado sobre los $53,350 con que nacieron las dos
     tarjetas: los dos decían que la deuda iba de salida cuando los $15,000 del 5 de octubre no
     habían bajado. Se mide contra el saldo con que arrancó el plan, `PROYECTO.bbvaInicio` el día
     `PROYECTO.bbvaFecha`, que no se mueve: cada saldo nuevo que reporta Adán va a `d001` con su
     migración, y si moviera también el inicio, lo pagado volvería a 0 %. */
  function avanceBbva(f) {
    const F = f || fin;
    const vivo = ((F && F.debts) || DEUDAS_SEED).filter(d => d.id === 'd001')[0];
    const inicio = +PROYECTO.bbvaInicio || 0, saldo = vivo ? +vivo.balance || 0 : inicio;
    const pagado = Math.max(0, inicio - saldo);
    return { inicio: inicio, saldo: saldo, pagado: pagado, desde: PROYECTO.bbvaFecha,
             pct: inicio > 0 ? Math.min(100, pagado / inicio * 100) : (saldo > 0 ? 0 : 100) };
  }
  /* ── La BBVA hoy, para la estrategia del día del Plan Maestro ──────────────────────────────────
     Lo que el Plan Maestro le dice a Adán cada día sobre la tarjeta, de una sola cuenta: el saldo
     vivo, el día que queda en cero, lo que toca hoy si todavía no se restó, lo que el plan restó solo
     estos tres días (`recientes`, para corregirlo si no fue así), lo que hoy no se mandó y el abono
     siguiente. `cancelada`: el día que la canceló, después de dejarla en cero (Adán, 15-oct-2026:
     "después que la liquide la cancelo y de ahí nos vamos a incrementar números en inversiones"). */
  function bbvaEstado() {
    const B = planBbva(), hoyK = fechaLocal(), P = PROYECTO;
    const tc = deudas().filter(function (d) { return d.id === 'd001'; })[0] || null;
    const tx = fin && Array.isArray(fin.transactions) ? fin.transactions : [];
    const h = new Date(); h.setDate(h.getDate() - 2);
    const desde = fechaLocal(h);
    const hoy = B.abonos.filter(function (a) { return a.fecha === hoyK; });
    const om = (tc && Array.isArray(tc.omitidos) ? tc.omitidos : []).filter(function (o) { return o.fecha === hoyK; });
    return {
      saldo: tc ? Math.max(0, +tc.balance || 0) : 0, nombre: tc ? tc.name : 'Tarjeta BBVA',
      fecha: (tc && tc.fecha) || null, cancelada: (tc && tc.cancelada) || null,
      vivo: B.vivo, fin: B.fin, inicio: +P.bbvaInicio || 0,
      hoy: hoy.filter(function (a) { return !a.hecho; }),
      pagadoHoy: hoy.filter(function (a) { return a.hecho; }).reduce(function (s, a) { return s + a.monto; }, 0),
      recientes: tx.filter(function (t) {
        return t.origen === 'plan' && t.tarjeta && t.tarjeta.id === 'd001' && t.date >= desde && t.date <= hoyK;
      }).map(function (t) { return { id: t.id, fecha: t.date, monto: +t.amount || 0, de: t.abono || 'quincena' }; })
        .sort(function (a, b) { return a.fecha < b.fecha ? 1 : -1; }).slice(0, 2),
      omitidoHoy: om.length ? { monto: om.reduce(function (s, o) { return s + (+o.monto || 0); }, 0), de: om[0].de } : null,
      siguiente: B.abonos.filter(function (a) { return a.fecha > hoyK; })[0] || null,
    };
  }
  /* Los abonos que le quedan a la BBVA, en una frase: el marcador {{bbvaRuta}}. Sale del plan de cada día
     (`planBbva`), así que la prosa del Plan Maestro y de Coach no se queda con un calendario viejo. */
  const RUTA_DE = { quincena: 'de la quincena', didi: 'de Didi', minimo: 'para el pago del corte, con lo de Didi', extra: 'de más' };
  const RUTA_DIA = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  function bbvaRutaTxt(tope) {
    const B = planBbva(), hoyK = fechaLocal(), max = tope || 6;
    const xs = B.abonos.filter(function (a) { return !a.hecho && a.fecha >= hoyK; });
    if (!xs.length) return B.fin ? 'ya está en cero' : 'sin abonos pendientes';
    const dia = function (k) {
      if (k === hoyK) return 'hoy';
      const p = k.split('-').map(Number), d = new Date(p[0], p[1] - 1, p[2]);
      return 'el ' + RUTA_DIA[d.getDay()] + ' ' + p[2] +
        (k.slice(0, 7) !== hoyK.slice(0, 7) ? ' ' + d.toLocaleDateString('es-MX', { month: 'short' }).replace('.', '') : '');
    };
    const partes = xs.slice(0, max).map(function (a) { return dia(a.fecha) + ', ' + fmt(a.monto) + ' ' + (RUTA_DE[a.de] || ''); });
    const resto = xs.length - partes.length;
    return (partes.length > 1 ? partes.slice(0, -1).join('; ') + ' y ' + partes[partes.length - 1] : partes[0]) +
      (resto > 0 ? '; y ' + resto + (resto === 1 ? ' abono más' : ' abonos más') : '');
  }
  /* ── Tu dinero un día: de lo de hoy, día por día ─────────────────────────────────────────────
     Adán, 19-oct-2026: "conforme seleccione otro día, debes proyectar todo todo hasta mis
     inversiones… ya tenemos un trackeo muy completo de mis finanzas y actualiza todo día a día".
     Arranca de lo que hoy dice Finanzas —la BBVA viva, lo invertido, los CETES, el depósito del depa, el
     auto, el iPhone y el Bitcoin— y camina día por día con el mismo plan que el calendario: los abonos
     de la BBVA (`planBbva`), lo que cada quincena manda a GBM (los cobros `ahorro` de `agendaDia`, ya
     sin lo que se lleva la tarjeta), lo que Didi aparta cada lunes cuando ya no va a la tarjeta
     (`didiAlAhorro`, menos lo que se llevó el pago del corte), las ventas del plan (`SUPUESTOS.extras`,
     el último día de su mes), lo que cuesta la salida ese mes (`SALIDA.costos` con `gasta`, también el último día,
     en `aSalida`), el depósito que regresa al dejar el depa y lo que bajan el auto (su día,
     con su interés) y el iPhone. Hoy es lo real, con lo que el plan pide hoy (`pendiente`); un día que
     viene ya cuenta lo de hoy, porque la proyección es seguir el plan. El dinero para gastar —la cuenta
     y el efectivo— lo lleva el riel del Plan Maestro, con la comida y lo anotado. Un día que ya pasó, o
     después del último mes en México (de ahí la proyección es mes a mes, en Coach), devuelve null. */
  function estadoDia(fechaK) {
    const hoyK = fechaLocal(), P = PROYECTO;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaK || '') || fechaK < hoyK) return null;
    const pu = P.ultimoMesMexico.split('-').map(Number);
    if (fechaK > P.ultimoMesMexico + '-' + String(new Date(pu[0], pu[1], 0).getDate()).padStart(2, '0')) return null;
    const F = fin || {}, DEU = deudas(), r2 = function (x) { return Math.round(x * 100) / 100; };
    const deuda = function (id) { return DEU.filter(function (d) { return d.id === id; })[0] || null; };
    const tc = deuda('d001'), car = deuda('d003'), iph = deuda('d008');
    const inv = F.investments || [], dep = inv.filter(function (i) { return i.id === 'i004'; })[0];
    const o = {
      fecha: fechaK, hoy: fechaK === hoyK,
      bbva: tc && !tc.cancelada ? Math.max(0, +tc.balance || 0) : 0,
      gbm: inv.filter(function (i) { return i.id !== 'i004'; }).reduce(function (s, i) { return s + (+i.value || +i.invested || 0); }, 0),
      cetes: +F.emergencyFund || 0,
      deposito: dep ? (+dep.value || +dep.invested || 0) : 0,
      btc: Math.max(0, (F.btcHistory || []).reduce(function (s, x) { return s + (+x.btc || 0); }, 0) * (+F.currentBtcPrice || 0) * (+F.usdMxn || 19.5)),
      auto: car ? Math.max(0, +car.balance || 0) : 0,
      iphone: iph ? Math.max(0, +iph.balance || 0) : 0,
      otras: DEU.filter(function (d) { return ['d001', 'd003', 'd008'].indexOf(d.id) === -1; })
        .reduce(function (s, d) { return s + Math.max(0, +d.balance || 0); }, 0),
      aBbva: 0, aGbm: 0, aSalida: 0, movs: [], pendiente: { bbva: [], gbm: 0 }, bbvaCero: null,
    };
    const B = planBbva();
    o.bbvaCero = B.fin;
    const gbmDe = function (k) {
      return agendaDia(+k.slice(8), k.slice(0, 7)).filter(function (c) { return c.ahorro; })
        .reduce(function (s, c) { return s + (+c.monto || 0); }, 0);
    };
    // Lo que el plan pide hoy: lo de la BBVA que todavía no se anotó y el envío de la quincena a GBM.
    o.pendiente.bbva = B.abonos.filter(function (a) { return a.fecha === hoyK && !a.hecho; });
    o.pendiente.gbm = gbmDe(hoyK);
    if (o.hoy) return o;
    const devuelve = mesSiguiente(P.rentaHasta) + '-01';
    const p0 = hoyK.split('-').map(Number), d = new Date(p0[0], p0[1] - 1, p0[2]), didiDe = {};
    for (let k = 0; k < 400; k++, d.setDate(d.getDate() + 1)) {
      const ym = mesDe(d), dia = d.getDate(), kd = ym + '-' + String(dia).padStart(2, '0');
      if (kd > fechaK) break;
      const delDia = B.abonos.filter(function (a) { return a.fecha === kd && !a.hecho; });
      delDia.forEach(function (a) { const x = Math.min(o.bbva, a.monto); o.bbva = r2(o.bbva - x); o.aBbva += x; });
      const q = gbmDe(kd);
      if (q > 0) { o.gbm += q; o.aGbm += q; o.movs.push({ fecha: kd, t: 'de la quincena', mxn: q }); }
      // Lo de Didi del lunes que ya no se lleva la tarjeta: la misma regla que el plan de inversiones (`didiGbmLunes`).
      const dd = (didiDe[ym] = didiDe[ym] || didiGbmLunes(ym))[kd];
      if (dd >= 1) { o.gbm += dd; o.aGbm += dd; o.movs.push({ fecha: kd, t: 'de Didi', mxn: dd }); }
      if (new Date(d.getFullYear(), d.getMonth(), dia + 1).getDate() === 1) {
        SUPUESTOS.extras.forEach(function (e) {
          if (e.mes !== ym) return;
          const x = typeof e.mxn === 'string' ? P[e.mxn] : e.mxn;
          o.gbm += x; o.aGbm += x; o.movs.push({ fecha: kd, t: e.txt, mxn: x });
        });
        // Lo que la salida cuesta ese mes (`SALIDA.costos` con `gasta`) sale de GBM el último día del mes, como en la
        // proyección. Sin esto el 31 de marzo traía $6,000 de más: las apostillas de diciembre (control 43).
        SALIDA.costos.forEach(function (c) {
          if (c.mes !== ym || !c.gasta) return;
          const x = costoSalida(c);
          o.gbm -= x; o.aSalida += x; o.movs.push({ fecha: kd, t: c.txt.replace(/ \(estimado[^)]*\)$/, ''), mxn: -x });
        });
      }
      if (kd === devuelve && o.deposito > 0) {
        o.gbm += o.deposito; o.aGbm += o.deposito; o.movs.push({ fecha: kd, t: 'regresa el depósito del depa', mxn: o.deposito }); o.deposito = 0;
      }
      if (car && dia === +car.day && o.auto > 0 && !(car.pagosAl && kd <= car.pagosAl)) {
        const i = o.auto * (+car.rate || 0) / 100 / 12;
        o.auto = r2(Math.max(0, o.auto + i - Math.min(o.auto + i, +car.min || 0)));
      }
      if (iph && dia === +iph.day && o.iphone > 0 && !(iph.pagosAl && kd <= iph.pagosAl)) o.iphone = r2(Math.max(0, o.iphone - (+iph.min || 0)));
    }
    o.gbm = r2(o.gbm); o.aGbm = r2(o.aGbm); o.aBbva = r2(o.aBbva); o.aSalida = r2(o.aSalida);
    return o;
  }
  /* ── Los abonos del plan se restan solos el día que tocan ─────────────────────────────────────
     Adán, 17-oct-2026: "no se actualiza conforme a los días". Cuando llega el día de un abono del
     plan —lo de la quincena el 1 y el 15, lo de Didi el lunes, el pago del corte—, se anota solo en
     Finanzas: una transacción en Deudas con `origen: 'plan'` y `abono` (de dónde sale), y el saldo de
     `d001` que baja. Si ese día ya hay un pago anotado a mano, manda el anotado, y un pago a mano
     posterior responde por lo de antes. `planAl` en la deuda dice hasta qué día ya se aplicó: nada se
     resta dos veces, y lo que Adán quitó con «No lo mandé» (`omitidos`) no vuelve. Corre al cargar
     cualquier app, después de las migraciones, y el Dashboard la vuelve a llamar cuando cambia el día.
     Devuelve cuántos abonos anotó. */
  function aplicarPlanBbva() {
    let f;
    try { const r = localStorage.getItem(KEY); f = r ? JSON.parse(r) : null; } catch (e) { return 0; }
    const d = f && Array.isArray(f.debts) ? f.debts.filter(function (x) { return x.id === 'd001'; })[0] : null;
    if (!d) return 0;
    const hoyK = fechaLocal(), tx = Array.isArray(f.transactions) ? f.transactions : (f.transactions = []);
    let desde = [String(PROYECTO.bbvaSaldoFecha || ''), String(d.planAl || '')].sort().pop();
    tx.forEach(function (t) {
      if (t.origen !== 'plan' && t.date > desde && t.date <= hoyK && pagoBbva(t, f.debts) > 0) desde = t.date;
    });
    let n = 0;
    if (hoyK > desde && !d.cancelada && +d.balance > 0) {
      const antes = fin; fin = f;                       // el plan, con los datos que se van a tocar
      const B = planBbva();
      fin = antes;
      B.abonos.filter(function (a) { return !a.hecho && a.fecha > desde && a.fecha <= hoyK; }).forEach(function (a) {
        const id = 'plan-' + a.fecha + '-' + a.de, s = +d.balance || 0, x = Math.round(Math.min(s, a.monto) * 100) / 100;
        if (!(x >= 1) || tx.some(function (t) { return t.id === id; })) return;
        d.balance = Math.round((s - x) * 100) / 100;
        tx.push({ id: id, type: 'expense', desc: 'Pago: ' + (d.name || 'Tarjeta BBVA'), amount: x, date: a.fecha, cat: 'Deudas',
                  notes: 'TC BBVA — ' + (ABONO_DE[a.de] || 'abono') + ' (del plan: se anotó solo)',
                  tarjeta: { id: 'd001', delta: -x }, origen: 'plan', abono: a.de });
        n++;
      });
    }
    if (!n && d.planAl === hoyK) return 0;
    if (n) d.fecha = hoyK;
    d.planAl = hoyK;
    try { localStorage.setItem(KEY, JSON.stringify(f)); } catch (e) { return 0; }
    return n;
  }
  /* ── Las mensualidades fijas se pagan solas el día que tocan ─────────────────────────────────
     Adán, 19-oct-2026: "siempre en finanzas algo está desactualizado… arréglalo y que no vuelva a
     pasar". El auto y el iPhone se quedaban con el saldo del día en que Adán lo dijo aunque cada mes se
     pagan solos. Una deuda a plazo con `pagosAl` —hasta qué día ya se aplicaron sus pagos— recibe cada
     mensualidad el día que toca, como los abonos de la BBVA: una transacción en Deudas con
     `origen: 'plan'` y `abono: 'mensualidad'`, y el saldo que baja por el capital —en el auto, la
     mensualidad menos el interés del mes—. `prestamo: {id, delta}` es lo que se le aplicó, para
     deshacerlo si se borra (Finanzas). Un saldo nuevo que diga Adán va como migración con su `pagosAl`.
     Corre al cargar cualquier app, junto a `aplicarPlanBbva`. Devuelve cuántas anotó. */
  function aplicarPagosFijos() {
    let f;
    try { const r = localStorage.getItem(KEY); f = r ? JSON.parse(r) : null; } catch (e) { return 0; }
    if (!f || !Array.isArray(f.debts)) return 0;
    const hoyK = fechaLocal(), tx = Array.isArray(f.transactions) ? f.transactions : (f.transactions = []);
    let n = 0;
    f.debts.forEach(function (d) {
      if (!d.pagosAl || !(+d.balance > 0) || !(+d.min > 0) || !(+d.day > 0) || d.pagosAl >= hoyK) return;
      const p = d.pagosAl.split('-').map(Number);
      for (let m = p[1] - 1 + (p[2] >= +d.day ? 1 : 0), k = 0; k < 120; k++, m++) {
        const dia = new Date(p[0], m, Math.min(+d.day, new Date(p[0], m + 1, 0).getDate())), kd = fechaLocal(dia);
        if (kd > hoyK || !(+d.balance > 0)) break;
        const id = 'fijo-' + kd + '-' + d.id;
        if (tx.some(function (t) { return t.id === id; })) continue;
        const interes = Math.round((+d.balance) * (+d.rate || 0) / 100 / 12 * 100) / 100;
        const pago = Math.round(Math.min(+d.balance + interes, +d.min) * 100) / 100;
        const capital = Math.round((pago - interes) * 100) / 100;
        d.balance = Math.max(0, Math.round((+d.balance - capital) * 100) / 100);
        tx.push({ id: id, type: 'expense', desc: 'Pago: ' + d.name, amount: pago, date: kd, cat: 'Deudas',
                  notes: 'Mensualidad' + (interes > 0 ? ' — ' + fmt(interes) + ' de interés y ' + fmt(capital) + ' a capital' : '') + ' (del plan: se anotó sola)',
                  prestamo: { id: d.id, delta: -capital }, origen: 'plan', abono: 'mensualidad' });
        d.fecha = kd; n++;
      }
      d.pagosAl = hoyK;
    });
    if (n) { try { localStorage.setItem(KEY, JSON.stringify(f)); } catch (e) { return 0; } }
    return n;
  }
  /* Las cuotas de una deuda a plazo: cuántas van, cuántas faltan y cuándo cae la siguiente y la última.
     Las que faltan salen del saldo —con interés, de `mesesRestantes`—, y la siguiente es el próximo día de
     pago que todavía no se aplicó (`pagosAl`). Una sola cuenta: la hoja de ruta y las suscripciones de
     Finanzas daban dos fechas distintas para el mismo iPhone. */
  function cuotas(d, hoy) {
    const min = +(d && d.min) || 0, bal = Math.max(0, +(d && d.balance) || 0), dia = +(d && d.day) || 1;
    const h = hoy ? new Date(hoy) : new Date(); h.setHours(0, 0, 0, 0);
    const total = +d.total > 0 && min > 0 ? Math.round(+d.total / min) : 0;
    const restantes = bal > 0 && min > 0 ? (+d.rate > 0 ? mesesRestantes(d) : Math.ceil(bal / min - 1e-9)) : 0;
    let sig = new Date(h.getFullYear(), h.getMonth(), dia);
    if (sig < h || (d.pagosAl && fechaLocal(sig) <= d.pagosAl)) sig = new Date(h.getFullYear(), h.getMonth() + 1, dia);
    return { total: total, restantes: restantes, pagadas: total && restantes != null ? Math.max(0, total - restantes) : null,
             siguiente: restantes ? sig : null, ultima: restantes ? new Date(sig.getFullYear(), sig.getMonth() + restantes - 1, dia) : null };
  }
  /* Lo de Didi que llega a GBM cada lunes de un mes: lo que el plan del mes le deja a GBM
     (`desgloseMes(mes).didi`: lo que Didi aparta menos lo que se lleva la BBVA), repartido entre los lunes
     que no van a la tarjeta. Una sola regla para la proyección día a día y el plan de inversiones de
     Finanzas: la suma del mes es la de `desgloseMes`. */
  function didiGbmLunes(ym) {
    const p = ym.split('-').map(Number), n = new Date(p[0], p[1], 0).getDate(), B = planBbva(), out = {};
    const dDidi = desgloseMes(ym).didi, lunes = [];
    for (let dia = 1; dia <= n; dia++) if (new Date(p[0], p[1] - 1, dia).getDay() === 1) lunes.push(ym + '-' + String(dia).padStart(2, '0'));
    if (!(dDidi >= 1) || !lunes.length) return out;
    const libres = lunes.filter(function (k) { return !B.abonos.some(function (a) { return a.fecha === k && a.de === 'didi'; }); });
    const usa = libres.length ? libres : [lunes[lunes.length - 1]];
    usa.forEach(function (k) { out[k] = Math.round(dDidi / usa.length * 100) / 100; });
    return out;
  }
  /* Lo que va a GBM —y a la BBVA mientras tenga saldo— en un mes, semana por semana (1–7, 8–14, 15–21 y
     22–fin, los tramos del tablero). Del mismo plan que el calendario: el envío de cada quincena (los cobros
     `ahorro` de `agendaDia`, ya sin la parte de la tarjeta), lo de Didi de los lunes (`didiGbmLunes`), las
     ventas del plan (el último día de su mes) y el depósito que regresa al dejar el depa; y los abonos de
     `planBbva`. Lo pinta el plan de inversiones de Finanzas. */
  function gbmMes(ym) {
    const p = ym.split('-').map(Number), n = new Date(p[0], p[1], 0).getDate(), B = planBbva(), P = PROYECTO;
    const didi = didiGbmLunes(ym), F = fin || {};
    const dep = ((F.investments || []).filter(function (i) { return i.id === 'i004'; })[0] || {}).value || SUPUESTOS.foto.deposito;
    const semanas = [[1, 7], [8, 14], [15, 21], [22, n]].map(function (r, i) { return { n: i + 1, ini: r[0], fin: r[1], gbm: [], bbva: [], aGbm: 0, aBbva: 0 }; });
    const sem = function (dia) { return semanas[dia <= 7 ? 0 : dia <= 14 ? 1 : dia <= 21 ? 2 : 3]; };
    for (let dia = 1; dia <= n; dia++) {
      const k = ym + '-' + String(dia).padStart(2, '0'), S = sem(dia);
      agendaDia(dia, ym).filter(function (c) { return c.ahorro; }).forEach(function (c) { S.gbm.push({ dia: dia, t: c.t, mxn: +c.monto || 0, de: 'quincena' }); });
      if (didi[k]) S.gbm.push({ dia: dia, t: 'Lo que apartas de Didi', mxn: didi[k], de: 'didi' });
      // Lo del plan de antes del último saldo que dijo Adán ya no cuenta: ese saldo lo desmintió o lo confirmó.
      B.abonos.filter(function (a) { return a.fecha === k && (a.hecho || !P.bbvaSaldoFecha || a.fecha >= P.bbvaSaldoFecha); }).forEach(function (a) {
        S.bbva.push({ dia: dia, t: ABONO_DE[a.de] || 'un abono', mxn: a.monto, de: a.de, hecho: !!a.hecho });
      });
    }
    SUPUESTOS.extras.forEach(function (e) {
      if (e.mes === ym) semanas[3].gbm.push({ dia: n, t: e.txt, mxn: typeof e.mxn === 'string' ? P[e.mxn] : e.mxn, de: 'venta' });
    });
    if (ym === mesSiguiente(P.rentaHasta) && dep > 0) semanas[0].gbm.unshift({ dia: 1, t: 'Regresa el depósito del depa', mxn: dep, de: 'deposito' });
    semanas.forEach(function (x) {
      x.aGbm = Math.round(x.gbm.reduce(function (a, y) { return a + y.mxn; }, 0) * 100) / 100;
      x.aBbva = Math.round(x.bbva.reduce(function (a, y) { return a + y.mxn; }, 0) * 100) / 100;
    });
    return { mes: ym, semanas: semanas, bbvaCero: B.fin,
             aGbm: semanas.reduce(function (a, x) { return a + x.aGbm; }, 0), aBbva: semanas.reduce(function (a, x) { return a + x.aBbva; }, 0) };
  }
  /* El presupuesto de una categoría de Finanzas que el plan ya conoce, en un mes: lo que `desgloseMes` aparta
     para ella —la renta y el aporte a tu familia, los servicios, las suscripciones, la comida, tus rutinas— y, en
     Deudas, las mensualidades más los abonos de la BBVA de ese mes. Un límite escrito a mano se quedaba atrás (la
     renta seguía en $11,000). Las demás categorías son tu gasto personal y llevan el límite que tú pones: null. */
  const PRESUPUESTO_DE = { 'Hogar/Renta': ['renta', 'familia'], 'Servicios': ['depa', 'celular'], 'Suscripciones': ['suscripciones'],
                           'Alimentación': ['comida'], 'Salud': ['cuidado'], 'Deudas': ['auto', 'iphone'] };
  function presupuestoFijo(cat, ym) {
    const g = PRESUPUESTO_DE[cat];
    if (!g || !ym || ym < SUPUESTOS.desde || ym > PROYECTO.ultimoMesMexico) return null;
    const D = desgloseMes(ym).g;
    let v = g.reduce(function (a, k) { return a + (+D[k] || 0); }, 0);
    // La BBVA: lo del plan desde el último saldo que dijo Adán (lo de antes, ese saldo lo desmintió o lo confirmó).
    if (cat === 'Deudas') v += planBbva().abonos.filter(function (a) { return a.fecha.slice(0, 7) === ym && (a.hecho || !PROYECTO.bbvaSaldoFecha || a.fecha >= PROYECTO.bbvaSaldoFecha); })
      .reduce(function (a, x) { return a + (x.hecho ? x.plan : x.monto); }, 0);
    return Math.round(v);
  }
  /* ── La deuda que de verdad cobra interés ──
     La BBVA tiene la tasa del producto (55.7 %) pero no le corre interés: Adán paga lo que pide el
     estado de cuenta (`PROYECTO.bbvaSinIntereses`). Sumarla como «con interés» daba $298,000 donde
     son los $283,000 del BYD, y la regla de «Qué invertir hoy» la trataba como deuda que muerde. */
  function deudasConInteres(f) {
    const F = f || fin;
    return ((F && F.debts) || DEUDAS_SEED).filter(d => +d.rate > 0 && +d.balance > 0 && !(d.id === 'd001' && PROYECTO.bbvaSinIntereses));
  }

  /* ── Los días de una fase — una sola cuenta ─────────────────────────────────────────────────
     El tablero del Plan Maestro decía «quedan 168 días · 26 semanas» —contaba con la hora del reloj
     y sin el día de inicio— mientras el calendario y Coach decían 169. Adán, 2026-10-13: "arregla
     los días de las fases". Se cuenta en días de calendario, de medianoche a medianoche: el día de
     hoy ya corre (`corrido`), y `quedan` son los que faltan después de hoy. Fase 1 el 13-oct-2026:
     día 13 de 182, quedan 169 (24 semanas), 7 %. La usan el tablero, el calendario, el panel de las
     fases y Coach; el control 33 vigila que nadie vuelva a contar por su cuenta. */
  function diasHasta(fecha, hoy) {
    const a = new Date(hoy || new Date()), b = new Date(fecha);
    a.setHours(0, 0, 0, 0); b.setHours(0, 0, 0, 0);
    return Math.round((b - a) / 86400000);
  }
  function diasFase(f, hoy) {
    const largo = diasHasta(f.end, f.start) + 1;
    const corrido = Math.min(largo, Math.max(0, diasHasta(hoy || new Date(), f.start) + 1));
    const quedan = Math.max(0, diasHasta(f.end, hoy));
    return { largo: largo, corrido: corrido, quedan: quedan, pct: largo ? corrido / largo * 100 : 0,
             semanas: Math.round(largo / 7), semanasQuedan: Math.round(quedan / 7) };
  }

  // La fecha LOCAL de un día ('AAAA-MM-DD'; sin argumento, hoy). Nunca toISOString(): en México
  // (UTC-6) el ISO ya es el día siguiente desde las 18:00, y lo que se marcaba de noche —la rutina,
  // la cena, el cierre del día— quedaba fechado mañana. La usan todas las apps que cargan el maestro;
  // el control 26 del verificador vigila que nadie vuelva a sacar «hoy» de toISOString().
  function fechaLocal(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  return {
    n: n, v: v, texto: texto, aplicarDOM: aplicarDOM, refrescar: refrescar, tabla: tabla, fechaLocal: fechaLocal,
    // El balance mensual y sus piezas, para que Dashboard y Finanzas pinten LO MISMO.
    balanceMeses: balanceMeses, agendaDia: agendaDia, caeEnMes: caeEnMes, comerEnMes: comerEnMes, planBbva: planBbva,
    palabras: palabras, norm: norm, yaContado: yaContado, esNomina: esNomina,
    comeDia: comeDia, guardarComeDia: guardarComeDia,
    claves: function () { return Object.keys(CLAVES); },
    dep: function (k) { return (CLAVES[k] && CLAVES[k].dep) || []; },
    impacto: impacto,
    grafo: grafo,
    DEUDAS_SEED: DEUDAS_SEED,
    GASTOS_20260901: GASTOS_20260901,
    MOVIMIENTOS_20260920: MOVIMIENTOS_20260920,
    mesesRestantes: mesesRestantes,
    patrimonio: patrimonio,
    fondoMaestria: fondoMaestria,
    diasFase: diasFase, diasHasta: diasHasta,
    avanceBbva: avanceBbva, deudasConInteres: deudasConInteres, bbvaEstado: bbvaEstado, estadoDia: estadoDia, bbvaRutaTxt: bbvaRutaTxt, aplicarPagosFijos: aplicarPagosFijos, cuotas: cuotas,
    didiGbmLunes: didiGbmLunes, gbmMes: gbmMes, presupuestoFijo: presupuestoFijo,
    tarjetaDe: tarjetaDe, movimientoTarjeta: movimientoTarjeta, aplicarPlanBbva: aplicarPlanBbva, ABONO_DE: ABONO_DE,
    BTC_SEED: BTC_SEED,
    // Para que `seedData()` pueda marcarlas como aplicadas: un seed nuevo ya las incluye.
    MIGRACIONES_FLAGS: MIGRACIONES.map(function (m) { return m.flag; }),
    rutina: rutina,
    SK: SK, HAB_FOCO: HAB_FOCO,
    PHASES: PHASES,
    SALIDA: SALIDA,
    PROYECCION: PROYECCION,
    proyectar: proyectar,
    cortesSalida: cortesSalida, desgloseMes: desgloseMes, mesTipo: mesTipo, planMes: planMes, cifrasHoy: cifrasHoy,
    didiAlAhorro: didiAlAhorro, GRUPOS_SUELDO: GRUPOS_SUELDO, rutinasDesglose: rutinasDesglose,
    costoSalida: costoSalida,
    APRENDIZAJE: APRENDIZAJE,
    APRENDIZAJE_DETALLE: APRENDIZAJE_DETALLE,
    APRENDIZAJE_PRACTICA: APRENDIZAJE_PRACTICA,
    APRENDIZAJE_SUBTEMAS: APRENDIZAJE_SUBTEMAS,
    LISTA_COMPRAS: LISTA_COMPRAS,
    RUTINA_PIEL: RUTINA_PIEL,
    RUTINA_PELO: RUTINA_PELO,
    KIT_HIGIENE: KIT_HIGIENE,
    CUIDADO_OJOS: CUIDADO_OJOS,
    BIBLIOTECA: BIBLIOTECA,
    RECETARIO: RECETARIO, PRECIOS_SUPER: PRECIOS_SUPER, costoReceta: costoReceta,
    SUPLEMENTOS: SUPLEMENTOS,
    CHEQUEO: CHEQUEO,
    PESO: PESO,
    PROYECTO: PROYECTO,
    CALENDARIO: CALENDARIO,
    get datos() { return fin; }
  };
})();
