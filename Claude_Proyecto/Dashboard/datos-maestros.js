/* ══════════════════════════════════════════════════════════════════════════════════════════
   DATOS MAESTROS — todas las variables del proyecto, en un solo archivo
   ══════════════════════════════════════════════════════════════════════════════════════════
   Adán, 2026-08-24: "quiero que toda la info de todos mis proyectos esté en un archivo que
   esté en esta carpeta [Dashboard], así cuando cambie algo en alguno, los demás cambiarán
   automáticamente... esto para que gastar menos tokens y sea muy rápido los cambios".

   QUÉ ES
   El único sitio donde se escribe un dato sobre Adán o sobre su plan. Las apps no repiten
   números: los leen de aquí. Cambias un dato una vez y las cuatro pantallas lo dicen igual.

   Vive en `Dashboard/` porque el Dashboard es el centro del proyecto y ahí ya viven los otros
   archivos de datos (`aleman-data.js`, `entrevistas-data.js`). Las demás apps lo cargan con una
   ruta relativa: `<script src="../Dashboard/datos-maestros.js"></script>`.

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
    empleador:   'ALTEN',
    puesto:      'Ingeniero de pruebas — automotriz (ADAS)',
    ciudad:      'CDMX',

    // ── Ingresos ── (el sueldo, 17 veces en 2 apps; Didi, 92 en 4)
    sueldo:        41000,     // bruto mensual en ALTEN, quincenal a BBVA
    sueldoQuinc:   20500,
    didiMes:       11200,     // ~$400/día × 28 días, semanal
    siVale:          940,     // vale de despensa
    // Lo que de verdad entra al mes si Didi va como el promedio.
    get ingresoTotal() { return this.sueldo + this.didiMes + this.siVale; },

    // ── Gastos fijos ── (renta y gym salían en 3 apps)
    renta:         11000,     // día 1
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
    cetesDia15:     1500,     // aporte recurrente a CETES el día 15

    // ── Cosas suyas que se nombran en varias apps ──
    auto:        'BYD Dolphin Mini',
    broker:      'GBM',                     // estrategia: empresas de EE. UU.
    bancoSueldo: 'BBVA',

    // ── Estudios de alemán ──
    // Retomó clases presenciales el 25-ago-2026 y va por el Kapitel 10 (Perfekt + Berufe).
    // El Dashboard filtra por `kapitelAleman`: mientras esté puesto, el slide de Alemán muestra
    // SOLO ese capítulo en vez de rotar por las 35 lecciones. Ponerlo en null devuelve la
    // rotación completa. Adán: "necesito enfocarme en estos temas".
    escuelaAleman:   'Cenlex Santo Tomás',
    kapitelAleman:   10,
    // La meta diaria de proteína. Estaba escrita a mano en las 3 subtareas de la whey y en
    // el catálogo de salud.html; ahora la citan como {{proteinaMeta}}.
    proteinaMeta:    186,

    // ── Fechas y metas no financieras ──
    entrevistaWayve: '2026-07-08',          // ver Entrevistas/ → sección Wayve
    maestriaEscuela: 'Esslingen — Automotive Systems M.Eng.',
    maestriaInicio:  '2028-10-01',
    inicioCenlex:    '2026-08-25',
    maestriaPausa:   '2027-07-18',          // pausada hasta aquí, decidido en Coach
  };

  /* ── EL CALENDARIO ────────────────────────────────────────────────────────────────────────
     Lo que el calendario del Dashboard necesita y NO puede derivar solo.

     `cobros` — los días fijos del mes. Los MONTOS salen de PROYECTO con getters, así que si
     sube la renta o vuelve a cambiar el gimnasio el calendario se entera sin tocar nada aquí.
     El DÍA sí vive aquí: hasta el 2026-08-26 solo existía como comentario al lado de la cifra
     ("renta, día 1"), o sea que ninguna app podía leerlo.

     `hitos` — fechas duras que no se pueden sacar de ningún otro dato. Todo lo demás lo
     calcula el Dashboard en vivo y por eso no está escrito aquí: los cierres y arranques de
     fase salen de PHASES, y la última cuota de un MSI sale de `balance / min` sobre las
     deudas vivas de Finanzas.

     Regla al agregar: si una fecha se puede derivar de un dato que ya existe, NO va aquí. */
  const CALENDARIO = {
    cobros: [
      { dia:  1, txt: 'Renta',    get monto() { return PROYECTO.renta; } },
      { dia:  1, get txt() { return PROYECTO.celularPlan; }, get monto() { return PROYECTO.celular; } },
      { dia:  1, txt: 'Quincena', get monto() { return PROYECTO.sueldoQuinc; }, entra: true },
      // El 15, no el 14 (Adán, 2026-08-28). El plan semanal de Finanzas ya la trataba así
      // — la mete en la semana 3 (días 15-21) y deja la semana 2 sin ingreso — pero aquí
      // decía 14, así que el calendario y el plan se contradecían sin que nada lo notara.
      { dia: 15, txt: 'Quincena', get monto() { return PROYECTO.sueldoQuinc; }, entra: true },
      { dia: 15, txt: 'CETES',    get monto() { return PROYECTO.cetesDia15; } },
      { dia: 17, txt: 'Gym',      get monto() { return PROYECTO.gym; } },
      // 2026-08-30 — los seis fijos que el calendario no contemplaba. Sumaban $1,094 al mes
      // saliendo de la cuenta sin que ninguna pantalla los descontara del tramo. Los días
      // los dio Adán; la limpieza se cayó de la lista porque no la paga.
      { dia:  1, txt: 'Luz y agua', get monto() { return PROYECTO.luzAgua; } },
      { dia:  2, txt: 'Claude Code', get monto() { return PROYECTO.claudeCode; } },
      { dia:  8, txt: 'Internet',   get monto() { return PROYECTO.internet; } },
      { dia:  8, txt: 'iCloud',     get monto() { return PROYECTO.icloud; } },
      // El gas no cae todos los meses: `cada` y `desde` lo dicen, y ctAgenda los respeta.
      { dia:  1, txt: 'Gas', get monto() { return PROYECTO.gas; },
        get cada() { return PROYECTO.gasCadaMeses; }, get desde() { return PROYECTO.gasDesdeMes; } },
    ],
    hitos: [
      { fecha: PROYECTO.maestriaPausa,  txt: 'Decisión Maestría',
        sub: 'Retomarla con datos reales del negocio, o posponerla otra vez — pero conscientemente.' },
      { fecha: PROYECTO.maestriaInicio, txt: 'Arranca la Maestría',
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
    {id:'d001',name:'Tarjeta BBVA',                  type:'credit_card',total:34000,     balance:34000,     rate:55.7,  min:1500, day:11,start:'2024-01-22'},
    // Liquidada el 13 ago 2026 — Adán pagó el saldo completo. Se conserva en la lista
    // como registro (la tarjeta sigue existiendo), pero ya no exige mínimo ni interés.
    // Misma corrección por coherencia; está liquidada (balance 0), así que su tasa ya no
    // afecta a ningún interés vivo — solo al histórico. 55.7 es un supuesto tomado de la BBVA,
    // no un dato medido de esta tarjeta.
    {id:'d002',name:'Tarjeta Banamex',               type:'credit_card',total:14349.72,  balance:0,         rate:55.7,  min:810,  day:8, start:'2024-06-18', noInterest:0},
    // Saldo reportado por Adán: $299,000 (24-ago) → $292,000 → $293,000 (25-ago-2026).
    {id:'d003',name:'Crédito Automotriz',            type:'car',        total:315800,    balance:293000,    rate:12.99, min:6700, day:15, start:'2026-01-01', remainingMonths:61},
    // Queda 1 cuota, la del 18 sep 2026: la penúltima se pagó (confirmado el 25-ago-2026).
    {id:'d004',name:'Apple Watch MSI (TC Banamex)',  type:'other',      total:10248,     balance:854,      rate:0,     min:854,  day:18,start:'2025-09-16'},
    // d005 (Vuelo Viva Aerobus) y d006 (Mercado Libre) se ELIMINARON el 13 ago 2026: Adán
    // revisó su historial real de BBVA y esos dos MSI no existen — no aparecen en ningún
    // movimiento. Se borran en vez de ponerlos en $0 porque nunca fueron deuda suya.
    // Liquidados el 13 ago 2026 — se pagó la última de las 3 cuotas MSI.
    {id:'d007',name:'Boletos Ticketmaster (MSI)',   type:'other',      total:3780,      balance:0,         rate:0,     min:1260, day:0, start:'2026-04-20'},
    // No es un MSI de tarjeta aunque el nombre viejo lo dijera: es un crédito del propio
    // AT&T, y se cobra el día 1 (Adán, 2026-08-28). `type:'other'` se mantiene porque esa
    // categoría agrupa la deuda a 0% de interés, no solo los MSI de tarjeta — sigue contando
    // en `deudaMsi` y fuera de `deudaCara`, que es lo correcto.
    {id:'d008',name:'iPhone 15 (crédito AT&T)',    type:'other',      total:13337.46,  balance:11361.54,  rate:0,     min:493.98,day:1, start:'2026-03-20'},
    // MSI reales de la TC BBVA, leídos del estado de cuenta con corte del 22 jul 2026
    // (captura que mandó Adán el 13 ago 2026). El `start` de cada uno está puesto para que
    // `autoBalance()` reproduzca exactamente las cuotas ya cobradas: 30.44 días por mes desde
    // esa fecha dan el número de cargos que se ven en el estado de cuenta, ni uno más.
    {id:'d009',name:'Zap Stylo (MSI TC BBVA)',      type:'other',      total:1002,      balance:334,       rate:0,     min:167,  day:22,start:'2026-03-22'},
    // d010 y d011 quedaron liquidados el 24-ago-2026: cerraron su tercera y última cuota. De los
    // tres MSI de la TC BBVA el único vivo es d009, los zapatos.
    {id:'d010',name:'Merpago*Merca (MSI TC BBVA)', type:'other',      total:1791,      balance:0,         rate:0,     min:597,  day:22,start:'2026-05-22'},
    {id:'d011',name:'Mercado Pago (MSI TC BBVA)',  type:'other',      total:2151,      balance:0,         rate:0,     min:717,  day:22,start:'2026-05-22'}
  
  ];

  /* ── LA RUTINA DIARIA ─────────────────────────────────────────────────────────────────────
     El horario completo: 58 bloques con sus subtareas. Estaba COPIADO en dashboard.html y en
     Coach.html, 17.5 KB en cada uno, y era la estructura más grande y más tocada de las que
     había que mantener a mano en dos sitios. El 2026-08-24 se detectó que llevaban 6 días
     divergentes: 7 textos de la rutina de cabello mejorados solo en Coach.

     dias: 0=domingo … 6=sábado. Los bloques con `fijo:true` (ALTEN) salen en la línea de tiempo
     y cuentan para "ahora/siguiente", pero no llevan checkbox ni suman al progreso.

     Los `href` se guardan en forma NEUTRA, como ancla interna (#aprendizaje). Cada app los
     resuelve al pedir la lista con `CIFRAS.rutina(base)`: Coach pasa "" porque las anclas son
     suyas, y el Dashboard pasa "../Coach/Coach.html" porque tiene que salir de su archivo.
     Era la única diferencia legítima entre las dos copias; ahora es un parámetro. */
  const RUTINA_TASKS = [
    {id:"wd01",dias:[1,2,3,4,5],hora:"06:40",cat:"salud",txt:"Despertar sin snooze — celular fuera del cuarto"},
    {id:"wd-app-am",dias:[1,2,3,4,5],hora:"06:43",cat:"aprender",txt:"💻 Construir esta aplicación — 10 min antes de arrancar el día"},
    {id:"wd-am-lav",dias:[1,4],hora:"06:53",cat:"salud",txt:"🚿 Rutina de la mañana — ducha, cabello, piel y suplementos",producto:true,subtareas:[{id:"wd02a",sec:"Ducha y cabello",txt:"Champú: <b>Pilexil Anticaída 300 ml</b> — masajea el cuero cabelludo 2 min y enjuaga. NO lo frotes en el largo: su trabajo es la raíz."},{id:"wd02b",txt:"Acondicionador: <b>L'Oréal Elvive Reparación Total 5</b> — solo de medios a puntas, nunca en la raíz."},{id:"wd02c",txt:"Con el pelo AÚN HÚMEDO: <b>crema sin enjuague L'Oréal Elvive Total Repair 5</b> (se pone sobre el pelo húmedo y NO se enjuaga), cantidad de un chícharo, solo en la mitad de abajo."},{id:"wd02d",txt:"Deja secar al aire. Si tienes prisa y usas secadora, aire tibio y a 20 cm — nunca caliente ni pegado."},{id:"wd02e",txt:"⚠️ Si HOY hay caspa o descamación, usas <b>Darrow Doctar (alquitrán)</b> en lugar del Pilexil. Nunca los dos el mismo día."},{id:"wd03a",sec:"Piel y minoxidil",txt:"Limpiador suave: CeraVe Limpiador Espumoso (verde) — quita grasa y sudor de la noche sin resecar"},{id:"wd03b",txt:"Sérum de niacinamida 10%: The Ordinary Niacinamida 10% + Zinc 1% — controla grasa y afina los poros"},{id:"wd03c",txt:"Protector solar: <b>La Roche-Posay Anthelios Oil Free SPF50</b> — <b>dos dedos completos</b> para cara y cuello. Con menos, un SPF50 protege como un SPF15"},{id:"wd04",txt:"<b>Minoxidil 5% NR-11 (Polaris Research)</b> 1 ml con el gotero en cuero cabelludo seco — es loción, no espuma: si te pica o reseca, baja a una dosis al día — estimula el folículo, dosis de la mañana"},{id:"wd04av",txt:"<b>Avodart (dutasterida 0,5 mg)</b> — una cápsula con el desayuno, siempre a la misma hora. Actúa por dentro bloqueando la DHT: no sustituye al minoxidil, se suman"},{id:"wdSupAm1",sec:"Suplementos",txt:"Vitamina D3 — 2000-4000 UI, con algo de grasa en la comida",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"wdSupAm2",txt:"Multivitamínico — 1 tableta"},{id:"wdSupAm3",txt:"Omega 3 — 1-2g EPA+DHA, con alimento"},{id:"wdSupAm4",txt:"Creatina monohidratada — 5g (todos los días, no solo si entrenas hoy)"}]},
    {id:"wd-am-co",dias:[2,3,5],hora:"06:53",cat:"salud",txt:"🚿 Rutina de la mañana — ducha, cabello, piel y suplementos",producto:true,subtareas:[{id:"wd02ca",sec:"Ducha y cabello",txt:"Hoy <b>no lleva champú</b>: mojas, y aplicas <b>L'Oréal Elvive Reparación Total 5</b> solo de medios a puntas. Lavar a diario con champú es lo que termina de secar el pelo."},{id:"wd02cb",txt:"Con el pelo húmedo: <b>crema sin enjuague L'Oréal Elvive Total Repair 5</b> (se pone sobre el pelo húmedo y NO se enjuaga), un chícharo. Este paso va todos los días, no solo cuando te lavas."},{id:"wd02cc",txt:"Ya seco, si lo notas áspero: 2 gotas de <b>Moroccanoil Treatment Light</b> solo en las puntas."},{id:"wd03a",sec:"Piel y minoxidil",txt:"Limpiador suave: CeraVe Limpiador Espumoso (verde) — quita grasa y sudor de la noche sin resecar"},{id:"wd03b",txt:"Sérum de niacinamida 10%: The Ordinary Niacinamida 10% + Zinc 1% — controla grasa y afina los poros"},{id:"wd03c",txt:"Protector solar: <b>La Roche-Posay Anthelios Oil Free SPF50</b> — <b>dos dedos completos</b> para cara y cuello. Con menos, un SPF50 protege como un SPF15"},{id:"wd04",txt:"<b>Minoxidil 5% NR-11 (Polaris Research)</b> 1 ml con el gotero en cuero cabelludo seco — es loción, no espuma: si te pica o reseca, baja a una dosis al día — estimula el folículo, dosis de la mañana"},{id:"wd04av",txt:"<b>Avodart (dutasterida 0,5 mg)</b> — una cápsula con el desayuno, siempre a la misma hora. Actúa por dentro bloqueando la DHT: no sustituye al minoxidil, se suman"},{id:"wdSupAm1",sec:"Suplementos",txt:"Vitamina D3 — 2000-4000 UI, con algo de grasa en la comida",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"wdSupAm2",txt:"Multivitamínico — 1 tableta"},{id:"wdSupAm3",txt:"Omega 3 — 1-2g EPA+DHA, con alimento"},{id:"wdSupAm4",txt:"Creatina monohidratada — 5g (todos los días, no solo si entrenas hoy)"}]},
    {id:"sa-am",dias:[6],hora:"08:35",cat:"salud",txt:"🚿 Rutina de la mañana — ducha, cabello, piel y suplementos",producto:true,subtareas:[{id:"sa05a",sec:"Ducha y cabello",txt:"Champú: <b>CeraVe Champú Hidratante sin sulfatos</b>. Hoy es día de reparación, no de tratamiento."},{id:"sa05b",txt:"<b>Mascarilla L'Oréal Elvive Total Repair 5</b> — es un acondicionador concentrado, viene en TARRO (no en botella). Va de medios a puntas y se deja actuar <b>5-10 min</b> mientras terminas de bañarte. Es el paso que más repara de toda tu semana: si te saltas uno, que no sea este."},{id:"sa05c",txt:"Hoy <b>NO</b> uses acondicionador: la mascarilla ya hizo ese trabajo, y ponerle los dos apelmaza el cabello fino."},{id:"sa05d",txt:"Con el pelo húmedo: <b>crema sin enjuague L'Oréal Elvive Total Repair 5</b> — se pone y NO se enjuaga, se queda todo el día. Ya seco: 2 gotas de <b>Moroccanoil Treatment Light</b> en puntas."},{id:"sa05e",txt:"Revisa las puntas: si ves pelos abiertos en forma de Y, ya toca corte. Cada 8-12 semanas, 1-2 cm — solo puntas."},{id:"sa02",sec:"Piel y minoxidil",txt:"Skincare AM — limpiador + niacinamida + hidratante con SPF 50 (mismos productos que entre semana)"},{id:"sa02b",txt:"<b>Minoxidil 5% NR-11 (Polaris Research)</b> 1 ml con el gotero en cuero cabelludo seco — es loción, no espuma: si te pica o reseca, baja a una dosis al día — dosis de la mañana"},{id:"sa02bav",txt:"<b>Avodart (dutasterida 0,5 mg)</b> — una cápsula con el desayuno, siempre a la misma hora. Actúa por dentro bloqueando la DHT: no sustituye al minoxidil, se suman"},{id:"saSupAm1",sec:"Suplementos",txt:"Vitamina D3 — 2000-4000 UI, con algo de grasa en la comida",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"saSupAm2",txt:"Multivitamínico — 1 tableta"},{id:"saSupAm3",txt:"Omega 3 — 1-2g EPA+DHA, con alimento"},{id:"saSupAm4",txt:"Creatina monohidratada — 5g (todos los días, no solo si entrenas hoy)"}]},
    {id:"do-am",dias:[0],hora:"08:35",cat:"salud",txt:"🚿 Rutina de la mañana — ducha, cabello, piel y suplementos",producto:true,subtareas:[{id:"do045a",sec:"Ducha y cabello",txt:"Hoy <b>no lleva champú</b>: <b>L'Oréal Elvive Reparación Total 5</b> de medios a puntas y enjuaga."},{id:"do045b",txt:"Con el pelo húmedo: <b>crema sin enjuague L'Oréal Elvive Total Repair 5</b> (se pone sobre el pelo húmedo y NO se enjuaga), un chícharo."},{id:"do045c",txt:"Antes de dormir, <b>funda de almohada de satín</b>. Pasas 7 horas frotando el pelo contra la almohada: el algodón lo rompe y le roba humedad, el satín no."},{id:"do02",sec:"Piel y minoxidil",txt:"Skincare AM — limpiador + niacinamida + hidratante con SPF 50 (mismos productos que entre semana)"},{id:"do02b",txt:"<b>Minoxidil 5% NR-11 (Polaris Research)</b> 1 ml con el gotero en cuero cabelludo seco — es loción, no espuma: si te pica o reseca, baja a una dosis al día — dosis de la mañana"},{id:"do02bav",txt:"<b>Avodart (dutasterida 0,5 mg)</b> — una cápsula con el desayuno, siempre a la misma hora. Actúa por dentro bloqueando la DHT: no sustituye al minoxidil, se suman"},{id:"doSupAm1",sec:"Suplementos",txt:"Vitamina D3 — 2000-4000 UI, con algo de grasa en la comida",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"doSupAm2",txt:"Multivitamínico — 1 tableta"},{id:"doSupAm3",txt:"Omega 3 — 1-2g EPA+DHA, con alimento"},{id:"doSupAm4",txt:"Creatina monohidratada — 5g (todos los días, no solo si entrenas hoy)"}]},
    {id:"wd05",dias:[1,2,3,4,5],hora:"07:33",cat:"descanso",txt:"Vestirte y alistarte"},
    {id:"wd06",dias:[1,2,3,4,5],hora:"07:40",cat:"admin",txt:"🚗 Didi con direccionamiento — camino a ALTEN (~50 min: el traslado normal + el desvío del pasajero)"},
    {id:"wd07",dias:[1,2,3,4,5],hora:"08:30",dur:270,cat:"trabajo",txt:"🏢 ALTEN — jornada laboral (HIL/SIL Ford) — entras 08:30, sales 16:40",fijo:true},
    {id:"wd12b",dias:[1,2,3,4,5],hora:"13:00",cat:"salud",txt:"🛒 Comprar comida — descanso de ALTEN"},
    {id:"wd12c",dias:[1,2,3,4,5],hora:"13:40",dur:180,cat:"trabajo",txt:"🏢 ALTEN — de vuelta a la jornada laboral (hasta las 16:40)",fijo:true},
    {id:"wd-cenlex",dias:[1,2,3,4,5],hora:"16:40",dur:20,cat:"admin",txt:"🚗 Manejar al CENLEX Santo Tomás (~20 min)"},
    {id:"wd-aleman",dias:[1,2,3,4,5],hora:"17:00",dur:60,cat:"aprender",txt:"🇩🇪 Clase de alemán — CENLEX Santo Tomás (17:00 a 18:00)"},
    {id:"wd-al-gym",dias:[1,2,3,4,5],hora:"18:00",dur:15,cat:"admin",txt:"🚗 Del CENLEX al gimnasio (~15 min)"},
    {id:"wd09",dias:[1,2,3,4,5],hora:"19:05",cat:"salud",txt:"Ducha rápida post-ejercicio",subtareas:[{id:"wd09a",txt:"Ducha rápida para quitar el sudor del entrenamiento."},{id:"wd09b",txt:"🏊 <b>SOLO MIÉRCOLES, después de nadar:</b> lava el cabello con <b>CeraVe Champú Hidratante sin sulfatos</b>. El cloro se queda en el pelo y lo reseca durante horas — este lavado no es opcional."},{id:"wd09c",txt:"🏊 Miércoles: después del champú, <b>L'Oréal Elvive Reparación Total 5</b> de medios a puntas y <b>crema sin enjuague L'Oréal Elvive Total Repair 5</b> (se pone sobre el pelo húmedo y NO se enjuaga) con el pelo húmedo."},{id:"wd09d",txt:"🏊 Truco para el miércoles: <b>moja el pelo con agua limpia ANTES de meterte a la alberca</b>. El pelo mojado absorbe menos cloro, igual que una esponja llena."}]},
    {id:"wd-didi2",dias:[1,2,3,4,5],hora:"19:30",cat:"admin",txt:"🚗 Didi — sesión corta de la noche (hasta ~20:00)"},
    {id:"wd11",dias:[1,2,3,4,5],hora:"20:00",cat:"profundo",txt:"🎯 Prioridad activa de Fase 0: negocio de tu papá o plantilla GBM — 1h15 de avance real (20:00–21:15)"},
    {id:"wd14",dias:[1,2,3,4,5],hora:"21:15",cat:"salud",txt:"🍽️ Cena + preparar la comida de mañana",subtareas:[{id:"wd14a",txt:"Cocina un solo platillo para cenar hoy y llevar de comida mañana a ALTEN — ahorra tiempo, sin carbohidratos refinados en la cena",link:{href:"../CuidadoPersonal/comida.html?s=cenas",label:"🍳 Ver cenas"}},{id:"wd14b",txt:"Deja todo empacado y listo junto a la puerta para salir rápido mañana",link:{href:"../CuidadoPersonal/comida.html?s=desayunos",label:"🍳 Ver desayunos"}}]},
    {id:"wd-pm",dias:[1,2,3,4,5],hora:"22:30",cat:"salud",txt:"🌙 Rutina de la noche — piel, minoxidil y suplementos",producto:true,subtareas:[{id:"wd17a",sec:"Piel y minoxidil",txt:"Limpiador (doble limpieza si usaste protector solar): CeraVe Limpiador Espumoso (verde) — remueve el bloqueador y el sudor del día"},{id:"wd17b",txt:"Tratamiento con retinoide: Differin Adapaleno 0.1% Gel — controla brotes y mejora la textura"},{id:"wd17c",txt:"Hidratante nocturno: Eucerin Hyaluron-Filler + Epigenetic Noche — repara la piel mientras duermes"},{id:"wd18",txt:"<b>Minoxidil 5% NR-11 (Polaris Research)</b> 1 ml con el gotero en cuero cabelludo seco — es loción, no espuma: si te pica o reseca, baja a una dosis al día — dosis de la noche"},{id:"wdSupPm1",sec:"Suplementos",txt:"Magnesio (glicinato) — 200-400mg, 30-60 min antes de dormir",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"wdSupPm2",txt:"Proteína Whey — 25-30g si hoy no llegaste a tu meta de proteína ({{proteinaMeta}}g/día)"}]},
    {id:"sa-pm",dias:[6],hora:"22:20",cat:"salud",txt:"🌙 Rutina de la noche — piel, minoxidil y suplementos",producto:true,subtareas:[{id:"sa13",sec:"Piel y minoxidil",txt:"Skincare PM — limpiador + retinoide + hidratante nocturno"},{id:"sa13b",txt:"<b>Minoxidil 5% NR-11 (Polaris Research)</b> 1 ml con el gotero en cuero cabelludo seco — es loción, no espuma: si te pica o reseca, baja a una dosis al día — dosis de la noche"},{id:"saSupPm1",sec:"Suplementos",txt:"Magnesio (glicinato) — 200-400mg, 30-60 min antes de dormir",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"saSupPm2",txt:"Proteína Whey — 25-30g si hoy no llegaste a tu meta de proteína ({{proteinaMeta}}g/día)"}]},
    {id:"do-pm",dias:[0],hora:"22:05",cat:"salud",txt:"🌙 Rutina de la noche — piel, minoxidil y suplementos",producto:true,subtareas:[{id:"do10",sec:"Piel y minoxidil",txt:"Skincare PM — limpiador + retinoide + hidratante nocturno"},{id:"do10b",txt:"<b>Minoxidil 5% NR-11 (Polaris Research)</b> 1 ml con el gotero en cuero cabelludo seco — es loción, no espuma: si te pica o reseca, baja a una dosis al día — dosis de la noche"},{id:"doSupPm1",sec:"Suplementos",txt:"Magnesio (glicinato) — 200-400mg, 30-60 min antes de dormir",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"doSupPm2",txt:"Proteína Whey — 25-30g si hoy no llegaste a tu meta de proteína ({{proteinaMeta}}g/día)"}]},
    {id:"wd20",dias:[1,2,3,4,5],hora:"23:00",cat:"descanso",txt:"🧘 Meditación — respiración box (10 min)",subtareas:[{id:"wd20a",txt:"Inhala 4 segundos por la nariz"},{id:"wd20b",txt:"Sostén el aire 4 segundos"},{id:"wd20c",txt:"Exhala 4 segundos por la boca"},{id:"wd20d",txt:"Sostén sin aire 4 segundos — repite el ciclo (~10 veces en 10 min)"}]},
    {id:"wd20e",dias:[1,2,3,4,5],hora:"23:10",cat:"descanso",txt:"Tiempo libre / relajación (20 min, hasta las 23:30)"},
    {id:"wd-app-pm",dias:[1,2,3,4,5],hora:"23:30",cat:"aprender",txt:"💻 Construir esta aplicación — de 23:30 a 00:00, a veces hasta la 01:00"},
    {id:"wd21",dias:[1,2,3,4,5],hora:"23:59",cat:"salud",txt:"Apagar pantallas y dormir en cuanto cierres la app — entre 00:00 y 01:00 (5h40–6h40 de sueño con el despertar de las 06:40)"},
    {id:"lu-gbm",dias:[1],hora:"09:00",dur:20,cat:"admin",txt:"💰 Bolsa GBM (20 min): compra rápida — revisa qué toca hoy y ejecuta. Solo lunes."},
    {id:"wd-cierre",dias:[1,2,3,4,5],hora:"21:45",dur:45,cat:"descanso",txt:"📓 Cierre del día — lectura, diario y plan de mañana",subtareas:[{id:"wd-lect",sec:"Lectura",txt:"30 minutos de lectura — el libro que tengas en curso, en papel o en el celular con la pantalla en modo noche."},{id:"wd16a",sec:"Diario del día",txt:"Escribe 3 cosas que sí lograste hoy, aunque sean pequeñas"},{id:"wd16b",txt:"1 cosa que salió mal o que aprendiste — sin autocastigo, solo para no repetirla"},{id:"wd16c",txt:"1 gasto que pudiste evitar hoy (o \"ninguno\" si no hubo)"},{id:"wd19a",sec:"Plan de mañana",txt:"Elige 1 sola tarea que, si mañana solo lograras esa, el día ya valió la pena — tu tarea más importante (MIT)"},{id:"wd19b",txt:"Anota 4 tareas más chicas para mañana, en el orden en que las harás"}]},
    {id:"e1",dias:[1],gym:true,hora:"18:15",cat:"salud",txt:"🏋️ Ejercicio: Brazos A — bíceps + tríceps"},
    {id:"e2",dias:[2],gym:true,hora:"18:15",cat:"salud",txt:"🏋️ Ejercicio: Piernas — completa"},
    {id:"k2",dias:[2],hora:"19:00",cat:"aprender",txt:"🤝 Ventas: 30 min — 1 capítulo de Influence / $100M Offers y escribe cómo lo aplicarías a GBM o CodeReview",link:{href:"#aprendizaje",label:"📚 Ver libros de Ventas"}},
    {id:"e3",dias:[3],gym:true,hora:"18:15",cat:"salud",txt:"🏊 Ejercicio: Natación — aprender a nadar (alberca del Fitsi Buenavista)"},
    {id:"e4",dias:[4],gym:true,hora:"18:15",cat:"salud",txt:"🏋️ Ejercicio: Brazos B — bíceps + tríceps"},
    {id:"k4",dias:[4],hora:"19:00",cat:"aprender",txt:"💰 Finanzas: 30 min — categoriza los gastos de la semana y revisa cuánto bajó la deuda",link:{href:"../Finanzas/Finanzas.html",label:"💰 Abrir Finanzas"}},
    {id:"e5",dias:[5],gym:true,hora:"18:15",cat:"salud",txt:"🏋️ Ejercicio: Abdomen — core + cardio"},
    {id:"k5",dias:[5],hora:"19:00",cat:"creativo",txt:"📣 GBM: personaliza el post de venta ya escrito (precio/fecha) y publícalo en 1 comunidad real de inversión",link:{href:"#plantillas-mensajes",label:"Ver mensaje ya escrito"}},
    {id:"sa01",dias:[6],hora:"07:00",cat:"salud",txt:"Despertar (sin alarma agresiva)"},
    {id:"sa03",dias:[6],hora:"07:18",cat:"salud",txt:"🍳 Preparar y desayunar tranquilo",link:{href:"../CuidadoPersonal/comida.html?s=desayunos",label:"Ver desayunos"}},
    {id:"sa04",dias:[6],gym:true,hora:"07:35",cat:"salud",txt:"🏋️ Ejercicio: Pecho + cardio + core"},
    {id:"sa-didi1",dias:[6],hora:"09:15",cat:"admin",txt:"🚗 Didi — bloque de día (~09:15 a 14:00, 4h 45m)"},
    {id:"sa07",dias:[6],hora:"14:00",cat:"salud",txt:"Almuerzo"},
    {id:"sa10",dias:[6],hora:"14:40",cat:"admin",txt:"💰 Revisión semanal: finanzas, metas, hábitos cumplidos"},
    {id:"sa12",dias:[6],hora:"15:30",cat:"descanso",txt:"Tiempo libre / familia — descanso antes del segundo bloque de Didi"},
    {id:"sa-didi2",dias:[6],hora:"17:00",cat:"admin",txt:"🚗 Didi — bloque de tarde-noche (~17:00 a 22:00, 5h)"},
    {id:"sa11",dias:[6],hora:"22:00",cat:"salud",txt:"🍽️ Cena",link:{href:"../CuidadoPersonal/comida.html?s=cenas",label:"Ver cenas"}},
    {id:"sa14",dias:[6],hora:"22:45",cat:"descanso",txt:"🧘 Meditación — misma respiración box 4-4-4-4 que entre semana"},
    {id:"sa15",dias:[6],hora:"23:00",cat:"salud",txt:"Apagar pantallas. Dormir"},
    {id:"do01",dias:[0],hora:"07:30",cat:"salud",txt:"Despertar"},
    {id:"do03",dias:[0],hora:"07:48",cat:"salud",txt:"🍳 Preparar y desayunar tranquilo",link:{href:"../CuidadoPersonal/comida.html?s=desayunos",label:"Ver desayunos"}},
    {id:"do04",dias:[0],gym:true,hora:"08:05",cat:"salud",txt:"Ejercicio: descanso activo — caminata o movilidad 30 min"},
    {id:"do05",dias:[0],hora:"09:15",cat:"admin",txt:"🚗 Didi — bloque de día (~09:15 a 14:00, 4h 45m)"},
    {id:"do-alm",dias:[0],hora:"14:00",cat:"salud",txt:"🍽️ Almuerzo — come de verdad antes del segundo turno, son 6h más al volante"},
    {id:"do-didi2",dias:[0],hora:"14:40",cat:"admin",txt:"🚗 Didi — bloque de tarde-noche (~14:40 a 21:00, 6h20)"},
    {id:"do08",dias:[0],hora:"21:00",cat:"salud",txt:"🍽️ Cena ligera",link:{href:"../CuidadoPersonal/comida.html?s=cenas",label:"Ver cenas"}},
    {id:"do06",dias:[0],hora:"21:20",cat:"admin",txt:"💰 Finanzas: revisión de presupuesto + planificar semana + revisar inversiones"},
    {id:"do07",dias:[0],hora:"21:35",cat:"profundo",txt:"🎯 Revisar Plan Maestro: ¿la fase actual sigue en verde? Ajustar si hace falta"},
    {id:"do09",dias:[0],hora:"21:45",cat:"descanso",txt:"📓 Diario de cierre de semana (10 min)",subtareas:[{id:"do09a",txt:"Qué avanzó esta semana en el Plan Maestro"},{id:"do09b",txt:"Qué NO avanzó y por qué"},{id:"do09c",txt:"1 ajuste concreto para la semana que entra"}]},
    {id:"do11",dias:[0],hora:"22:30",cat:"descanso",txt:"🧘 Meditación — misma respiración box 4-4-4-4 que entre semana"},
    {id:"do12",dias:[0],hora:"22:45",cat:"salud",txt:"Apagar pantallas. Dormir — el lunes te levantas a las 06:40"},
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
     Las 12 habilidades con su nivel (`val` 0-100) y su peso (`w`) en el promedio.
     Estaba copiado en dashboard.html y Coach.html. Se conserva la versión de Coach, que es
     el superconjunto: `full`, `cat` y `desc` los usa su panel explicativo y el Dashboard no los
     pinta — no era divergencia, era que cada app usaba lo que necesitaba.
     Los overrides que Adán ajusta a mano viven en localStorage (`radarp_{id}`) y ganan sobre
     el `val` de aquí; esto es el punto de partida. */
  const SK = [
      {id:'ventas',    name:'Ventas',     full:'Ventas & Negociación',     icon:'🤝', val:15, w:1.5, cat:'negocios', desc:'No sabes regatear ni sostener un precio. Única excepción: negocias muy bien tu propio sueldo al cambiar de empresa — sabes venderte a ti mismo en una entrevista, no un producto en frío.'},
      {id:'copy',      name:'Copy',       full:'Copywriting & Persuasión', icon:'✍️', val:55, w:1.2, cat:'negocios', desc:'No sabes redactar copy clásico, pero generas ideas y expectativa con facilidad, y con IA ese efecto se multiplica. Tu fuerza real es el "gancho", no la redacción fina.'},
      {id:'marketing', name:'Marketing',  full:'Marketing Digital',        icon:'📣', val:20, w:1.2, cat:'negocios', desc:'Generas ideas (ej. al vender en Marketplace) pero nunca las ejecutas. Es una habilidad de práctica pura — hoy vale cero porque no se ha probado.'},
      {id:'network',   name:'Networking', full:'Networking & Relaciones',  icon:'🔗', val:55, w:1.0, cat:'negocios', desc:'Naturalmente bueno haciendo amigos 1 a 1, pero sin estructura para hacer networking con intención. Sí tienes red real: 4 empresas de trayectoria (Ford, Continental, Bosch, Google), y sobre todo contacto activo con líderes de Bosch en Stuttgart más mexicanos expatriados ahí — una red internacional que hoy casi no explotas.'},
      {id:'liderazgo', name:'Liderazgo',  full:'Liderazgo & Equipos',      icon:'👑', val:80, w:1.0, cat:'negocios', desc:'Probado en Bosch: supiste dirigir las habilidades de tu equipo para potenciarlo, y te eligieron líder del equipo de México para una asignación de 4 meses en Stuttgart ante otros líderes globales. Es real y ya reconocido más allá de tu equipo inmediato.'},
      {id:'codigo',    name:'Código',     full:'Programación & Software',  icon:'💻', val:60, w:1.2, cat:'tecnico',  desc:'Bueno leyendo y dirigiendo código, débil escribiéndolo desde cero. Tu Mecatrónica de IPN ya te dio base formal de microcontroladores, PLCs y control — no partes de cero técnico, solo de la escritura pura. Con ejemplo o ayuda de IA ejecutas exactamente lo que quieres: eres director de código, no programador puro.'},
      {id:'ia',        name:'IA',         full:'IA & Automatización',      icon:'🤖', val:30, w:1.2, cat:'tecnico',  desc:'Te sientes principiante, pero ya validaste IA generativa para Google, usas Claude Code a diario en producción, y tu carrera incluyó Visión Artificial y Sistemas Neurodifusos — tienes base formal que no te has reconocido. Es tu fortaleza más subestimada.'},
      {id:'datos',     name:'Datos',      full:'Análisis de Datos',        icon:'📊', val:55, w:1.0, cat:'tecnico',  desc:'Nivel medio — mejor de lo que reflejaba antes (Adán confirmó que este terreno sí lo domina más que el valor viejo). Ajusta el slider de abajo si quieres un número más preciso.'},
      {id:'inversion', name:'Inversión',  full:'Inversión en Mercados',    icon:'📈', val:25, w:1.2, cat:'finanzas', desc:'Principiante real, aprendiendo poco a poco. Ya diste el primer paso (CETES, BTC, acciones) — falta volumen y estructura.'},
      {id:'finanzas',  name:'Finanzas',   full:'Finanzas Personales',      icon:'💰', val:20, w:1.1, cat:'finanzas', desc:'Te excedes en gastos mensuales seguido (deuda ~$366k vs. inversión ~$55k). Es tu debilidad más cara — literalmente, en intereses.'},
      {id:'ingles',    name:'Inglés',     full:'Inglés / Idioma Global',   icon:'🌐', val:80, w:1.1, cat:'personal', desc:'B2 real, confirmado. Es tu pasaporte a clientes, mercados y sueldos en dólares — úsalo como ventaja, no solo como requisito de trabajo.'},
      {id:'mente',     name:'Mentalidad', full:'Mentalidad & Ejecución',   icon:'🚀', val:85, w:1.0, cat:'personal', desc:'Tu activo más grande. Tolerancia al riesgo alta, resiliencia real ante pérdidas, y ahora mismo estás en el punto de romper años de inacción. Esto es lo que hace que todo lo demás sea entrenable.'},
    ];
  /* ── EL PLAN MAESTRO ───────────────────────────────────────────────────────────────────────
     Las 4 fases hacia $1,000,000 líquido: fechas ancla, título, meta, explicación y el
     checklist de cada mes. Los ids `sN-M` de las tareas son el contrato con Coach.html, que
     guarda su estado en `coach_checks_v1[id]` — si se renombra un id aquí, se pierde lo marcado.
     Coach tiene las mismas fases escritas como HTML en su sección #perfil. Ese texto NO se puede
     generar desde aquí sin rediseñar la sección, así que sigue a mano: `verificar-sincronia.js`
     compara los títulos y las metas de fase entre este literal y ese HTML. */
  const PHASES = [
    {start:new Date(2026,7,1),end:new Date(2026,8,30),tag:"Fase 0",title:"Cerrar la fuga y arrancar ingreso, no solo pensar",meta:"✅ Banamex liquidada el 13 ago 2026 (era meta de Fase 1, para ene 2027). Quedan 2 objetivos financieros, en este orden: 1) fondo de emergencia a {{fondoMeta}}, 2) abonos extra a BBVA.",explica:"Fase 0 es el arranque del plan (1 ago – 30 sep 2026, ~9 semanas). Todavía no se trata de ganar mucho — se trata de cerrar la fuga de dinero y sentar las bases. El orden era 1) fondo de emergencia, 2) Banamex, 3) BBVA: el paso 2 ya está hecho desde el 13 ago 2026, así que la prioridad es el fondo de emergencia y, en cuanto llegue a {{fondoMeta}}, todo excedente a BBVA. En paralelo arrancas el negocio: dedicar atención real al negocio de tu papá y publicar tu primera plantilla en comunidades de GBM.",semanas:[
      {id:"s0-9",mes:"2026-08",txt:"Prioridad 1 — Fondo de emergencia a {{fondoMeta}}. Antes que cualquier abono extra a deuda: es el colchón que evita que un imprevisto te regrese a la tarjeta. (hoy en $0)"},
      {id:"s0-10",mes:"2026-08",txt:"Prioridad 2 — Liquidar la TC BBVA ({{tcBbva}}). Única deuda cara que queda — y sigue SUBIENDO: el mínimo de {{tcBbvaMin}} no cubre el interés. En cuanto el fondo llegue a {{fondoMeta}}, todo excedente va aquí. (la proyección de “$0 en mar 2027” se hizo con $32,343 al 10% anual; con el saldo real y la tasa real de 55.7% hay que rehacerla)"},
      {id:"s0-4",mes:"2026-08",txt:"Sube a Marketplace tus activos ociosos (PS5, control, monitores, iPad) — es la fuente más rápida para completar el fondo de emergencia de la Prioridad 1."},
      {id:"s0-3",mes:"2026-08",txt:"Plantilla Finanzas.html, de principio a fin: versión limpia sin tus datos + post de venta + publicarla en 2-3 comunidades de GBM (Opción 1)."},
      {id:"s0-2",mes:"2026-08",txt:"Revisar las fotos y el material del negocio de tu papá y ponerle atención real — primer paso concreto de la Opción 5."},
      {id:"s0-6",mes:"2026-08",txt:"Pausa aportaciones a la Maestría 1 año (hasta 18 jul 2027) — los {{maestria}} quedan intactos, nueva meta oct 2028."},
      {id:"s0-8",mes:"2026-08",txt:"Liquidar la TC Banamex. (✅ 13 ago 2026 — pagaste los $9,000 completos, no el mínimo, 5 meses antes de la meta)"},
      {id:"s0-1",mes:"2026-08",txt:"Corrige \"Deudas\" en Finanzas.html · cero MSI nuevo. (✅ 13 ago 2026: quedó en $8,200 = auto {{autoPago}} + mínimo BBVA {{tcBbvaMin}})"},
      {id:"s0-7",mes:"2026-09",txt:"Cada peso de ventas/activos va, en orden fijo: (1) fondo de emergencia a {{fondoMeta}}, (2) resto a BBVA — Banamex ya está en $0. Este mes cierra la fase."},
    ]},
    {start:new Date(2026,9,1),end:new Date(2027,2,31),tag:"Fase 1",title:"Los $3,145/mes liberados entran en acción + primer ingreso real",meta:"Primer contrato freelance o 20+ ventas de la plantilla cobradas. La meta vieja —Banamex liquidada— ya se cumplió el 13 ago 2026, así que el objetivo financiero pasa a bajar BBVA de {{tcBbva}} a menos de $15,000.",explica:"Fase 1 (oct 2026 – mar 2027) arranca cuando los $2,335/mes de MSI de gadgets quedan libres, que sumados a los {{banamexMin}} del mínimo de Banamex ya liquidada dan $3,145/mes nuevos. Con Banamex en $0 desde agosto, ese dinero tiene un solo destino: fondo de emergencia a {{fondoMeta}} y todo lo demás a BBVA, la única deuda cara que queda. En paralelo, buscas tu primer ingreso real fuera de ALTEN.",semanas:[
      {id:"s1-1",mes:"2026-10",txt:"Oct 2026: los $2,335/mes liberados de MSI + los {{banamexMin}} del mínimo de Banamex van, en orden fijo: fondo de emergencia a {{fondoMeta}} → 100% BBVA (única deuda cara restante) = $4,645/mes."},
      {id:"s1-2",cont:true,txt:"Prioridad: cerrar el primer contrato freelance (Opción 2) + 1 post de seguimiento mensual de la plantilla GBM (Opción 1)."},
      {id:"s1-3",mes:"2026-11",txt:"En paralelo: primer post de mentoría pagada (Opción 3) — bajo riesgo, casi sin preparación."},
      {id:"s1-4",cont:true,txt:"Primer peso cobrado en Opción 1-3 → esas horas de Didi se mueven ahí (Opción 6), no antes."},
      {id:"s1-5",cont:true,txt:"iPhone 15 (crédito AT&T) sigue corriendo ($494/mes) hasta jun 2028 — ya comprometido, no toca tu excedente nuevo."},
      {id:"s1-6",cont:true,txt:"Foco de habilidad (Radar): sube <strong>Copy</strong> (55→) escribiendo los posts, y <strong>Finanzas</strong> (20→) sosteniendo el presupuesto corregido. Solo estas dos."},
    ]},
    {start:new Date(2027,3,1),end:new Date(2028,11,31),tag:"Fase 2",title:"Doblar apuesta en lo que mostró tracción",meta:"BBVA liquidada, deuda cara en $0, ingreso extra estable de al menos $10,000–15,000/mes.",explica:"Fase 2 (abr 2027 – dic 2028) es la fase más larga. Con Banamex resuelta desde el 13 ago 2026 y BBVA proyectada a mar 2027, esta fase debería arrancar ya con la deuda cara en $0 — el excedente completo se va a doblar la apuesta en la opción de negocio que ya mostró tracción real, en vez de dispersarte entre varias.",semanas:[
      {id:"s2-1",mes:"2027-04",txt:"Elige la opción (1, 2 o 3) con ingreso recurrente real y concéntrate ahí — resiste saltar a \"algo mejor\"."},
      {id:"s2-2",mes:"2027-10",txt:"Con tracción sostenida, arranca la Opción 4 (CodeReview productizado) — único punto del plan que requiere capital, ya disponible tras liquidar BBVA."},
      {id:"s2-3",cont:true,txt:"Usa IA para construir tu propio sistema de ventas/argumentos — tu fuerza real, en vez de improvisar en vivo."},
      {id:"s2-4",mes:"2028-06",txt:"Jun 2028: se libera el iPhone de AT&T ($494/mes) — súmalo a inversión, no a gasto nuevo."},
      {id:"s2-5",cont:true,txt:"Foco de habilidad: sube <strong>Ventas</strong> (15→) y <strong>Marketing</strong> (20→) lo mínimo para vender la Opción 4 sin depender solo de referidos."},
    ]},
    {start:new Date(2029,0,1),end:new Date(2030,0,1),tag:"Fase 3",title:"Escalar, cerrar la brecha de $31,540/mes y reevaluar",meta:"Cerrar la distancia final a $1,000,000 líquido con el negocio como fuente principal de excedente.",explica:"Fase 3 (ene 2029 – ene 2030) es el cierre. Con la deuda cara ya en $0 desde la fase anterior, todo el excedente nuevo va directo a cerrar la brecha final hacia $1,000,000 de patrimonio líquido — la meta central de todo el Plan Maestro.",semanas:[
      {id:"s3-1",mes:"2029-01",txt:"El negocio debe cubrir ya parte real de la brecha. Ingreso extra cercano a cero en 2029 = problema de opción elegida, no de timing — revisa Posibles Negocios."},
      {id:"s3-2",cont:true,txt:"Todo ingreso adicional va primero a inversión (CETES, fondos indexados, ampliar BTC/acciones) — nunca a consumo nuevo."},
      {id:"s3-3",cont:true,txt:"La decisión de Maestría (18 jul 2027) ya está tomada: retomarla en oct 2028 con datos reales del negocio, o posponerla de nuevo, conscientemente."},
      {id:"s3-4",mes:"2029-07",txt:"Reevalúa la meta de $1,000,000 líquido con números reales del negocio y ajusta la fecha si hace falta — sin abandonarlo."},
    ]},
  ];

  /* ── APRENDIZAJE ───────────────────────────────────────────────────────────────────────────
     Las 5 prioridades (Datos, Ventas, Marketing, Finanzas, IA) con diagnóstico, primer paso,
     hábito, el error típico y los recursos. Coach.html tiene lo mismo como HTML en
     #aprendizaje; igual que con PHASES, ese texto sigue a mano y el verificador lo compara. */
  const APRENDIZAJE = {
    datos:{
      diagnostico:'Ya no es tu debilidad real (subiste el valor tú mismo a 55/100), pero el hueco que queda es de herramienta, no de criterio: sabes leer un problema de datos, te falta soltura en Python/SQL para no depender de Excel.',
      primer:'Módulos de Python y Pandas en Kaggle Learn (2-3h, gratis) + arma un dashboard simple de tus gastos en Google Looker Studio.',
      semana24:'Repite el mismo dashboard con datos de otra app tuya (ejercicio o comida) — el segundo dashboard te toma la mitad del tiempo del primero, esa caída es la señal real de que se está volviendo hábito.',
      habito:'10 min/día de SQL en SQLZoo o LeetCode SQL, 30 días seguidos.',
      error:'Ver tutoriales sin escribir código en paralelo — Pandas/SQL se te va a olvidar en una semana si no lo tecleas tú mismo con tus propios datos reales.',
      recursos:[{t:'Curso',n:'Kaggle Learn'},{t:'Curso',n:'Google Data Analytics Certificate'},{t:'Libro',n:'Storytelling with Data — Cole Nussbaumer Knaflic'},{t:'Tool',n:'Google Looker Studio'}]},
    ventas:{
      diagnostico:'No es que no sepas vender — vendes bien tu propio sueldo al cambiar de empresa (ya lo hiciste con Ford→Continental→Bosch). El hueco real es vender en frío a un extraño que no te conoce, sin la credibilidad de una entrevista formal detrás.',
      primer:'Lee el cap. 1 de "Influence" (reciprocidad) y úsalo en el mensaje de venta que ya tienes listo (Coach → Posibles Negocios → Plantillas de mensajes): personalízalo con tu precio de lanzamiento ($99 MXN) y publícalo en 1 comunidad real de GBM/inversión.',
      semana24:'Arma un embudo simple de 3 columnas (Contactado / Respondió / Cerró) para la plantilla Finanzas.html y llénalo con 5 conversaciones reales por semana — sin medirlo, no vas a saber si estás mejorando o solo ocupado.',
      habito:'5 mensajes personalizados/día a prospectos + follow-up en días 1-3-7-14-30.',
      error:'Rendirte después de un "no" o un silencio. La mayoría de las ventas B2B cierran entre el 3er y 5to contacto, no en el primero — el follow-up es la venta, no un extra opcional.',
      recursos:[{t:'Libro',n:'Influence — Robert Cialdini'},{t:'Libro',n:'$100M Offers — Alex Hormozi'},{t:'Libro',n:'Never Split the Difference — Chris Voss'},{t:'YouTube',n:'Alex Hormozi'}]},
    marketing:{
      diagnostico:'Tu problema no es de ideas — ya vendiste tus activos ociosos en Marketplace sin ayuda. Es de constancia: publicas una vez, no ves resultado inmediato, y lo dejas — el marketing orgánico premia repetición, no un post perfecto aislado.',
      primer:'Termina el módulo de fundamentos de Google Digital Garage y publica tu primer post de valor en LinkedIn sobre la plantilla Finanzas.html.',
      semana24:'Publica 4 semanas seguidas (1 post/semana mínimo) y anota views/comentarios/DMs de cada uno en una nota simple — al final del mes vas a saber qué formato (texto, carrusel, caso real) te funcionó mejor, en vez de seguir adivinando.',
      habito:'3 publicaciones/semana en LinkedIn — lunes, miércoles y viernes.',
      error:'Perfeccionar el post en vez de publicarlo. La versión imperfecta que sí sale hoy vale más que la perfecta que nunca sale — puedes editar/mejorar el siguiente con lo que aprendas de este.',
      recursos:[{t:'Curso',n:'Google Digital Garage'},{t:'Curso',n:'HubSpot Academy'},{t:'Curso',n:'Meta Blueprint'},{t:'Libro',n:'$100M Leads — Alex Hormozi'}]},
    finanzas:{
      // 2026-08-19 — Adán pidió cambiar el formato de estas dos: fuera diagnóstico,
      // "esta semana", plan de semanas, hábito y error común; en su lugar, la lista de
      // sub-habilidades concretas, cada una con cómo desarrollarla y con qué recurso.
      // Las otras 4 habilidades conservan el formato viejo — renderSkills() pinta uno u
      // otro según exista `subs`, así que ambos conviven sin ramas duplicadas.
      subs:[
        {n:'Saber a dónde se va tu dinero',q:'Es la base de todo lo demás. Sin el dato real, cualquier presupuesto es una suposición y cualquier recorte es adivinar.',c:'Registra <b>30 días seguidos</b>, cada gasto el mismo día en que ocurre — no el domingo de memoria, porque ahí ya perdiste los chicos, que son justo los que no ves. Cinco categorías bastan: fijos, comida, transporte, deuda y gusto. Al día 30 ordénalas de mayor a menor y mira solo las tres primeras: ahí está el 80% de lo que puedes mover. Tu app de <b>Finanzas</b> ya hace esto, no necesitas otra herramienta.',r:'Pequeño Cerdo Capitalista — Sofía Macías (los capítulos de gastos hormiga; es de México, habla de pesos y de CETES, no de 401k)'},
        {n:'Presupuestar sobre ingreso variable',q:'Tu ingreso no es uno: ALTEN es fijo y Didi cambia cada semana. Presupuestar sobre el promedio es lo que hace que un mes flojo te descuadre.',c:'Presupuesta sobre el <b>mínimo de tus últimos 3 meses</b>, nunca sobre el promedio ni sobre el mejor mes. Lo que entre por encima de ese mínimo no es para gastar: va al fondo, a la deuda o a inversión, en ese orden. Págate un "sueldo" fijo cada mes desde lo que junta Didi, en vez de gastar lo que va entrando.',r:'Profit First — Mike Michalowicz (el método de repartir el ingreso en cuentas separadas antes de gastarlo)'},
        {n:'Dimensionar el fondo de emergencia',q:'No es un número redondo que suena bien: son <b>3 a 6 meses de tus gastos fijos</b>. Sin él, cualquier imprevisto vuelve a la tarjeta y deshace el avance de meses.',c:'Suma tus fijos reales de un mes (renta, comida, transporte, gym, suscripciones) y multiplica por 3. Ese es tu piso; por 6 es tu techo. Tu meta actual son <b>{{fondoMeta}}</b> y llevas {{fondo}} — compara ese {{fondoMeta}} contra el número que te dé la suma y ajústalo si sale corto. Guárdalo donde puedas sacarlo en 24-48 h: CETES a 28 días o una cuenta de ahorro, nunca en algo que pueda valer menos el día que lo necesites.',r:'The Simple Path to Wealth — JL Collins (capítulo del fondo y por qué va antes que invertir)'},
        {n:'Calcular el costo real de la deuda',q:'La tasa que anuncian no es lo que pagas. El CAT sí, porque mete comisiones y seguros. Sin ese número no puedes comparar dos créditos ni saber si un MSI te conviene.',c:'Aprende a leer el <b>CAT</b> de cada estado de cuenta y ordena tus deudas por tasa, de mayor a menor: eso es el <b>método avalancha</b> y es el que menos intereses te cuesta (la bola de nieve, de menor a mayor saldo, solo gana en motivación). Antes de un MSI, calcula qué porcentaje de tu excedente mensual te compromete y por cuántos meses: un MSI no es dinero gratis, es un pago fijo que ya vendiste.',r:'Pequeño Cerdo Capitalista — Sofía Macías (deuda y CAT explicados con productos mexicanos)'},
        {n:'Leer tu propio balance',q:'Flujo (lo que entra y sale cada mes) y patrimonio (lo que tienes menos lo que debes) son dos cosas distintas. Puedes tener buen flujo y patrimonio negativo, que es donde estabas hace un año.',c:'Una vez al mes anota <b>activos − pasivos</b>: efectivo + fondo + inversiones + valor del BYD, menos lo que reste de deuda. Ese número, no tu quincena, es el que tiene que subir todos los meses rumbo al millón. El Dashboard ya lo calcula en <b>patrimonio neto</b>: tu trabajo es mirarlo una vez al mes, no cada día.',r:'The Millionaire Next Door — Thomas J. Stanley (por qué el patrimonio y el ingreso no son lo mismo)'},
        {n:'Entender tus impuestos',q:'Lo que ganas fuera de la nómina tiene reglas propias. No saberlas cuesta dinero de dos formas: multas, y deducciones que dejas en la mesa.',c:'Aprende primero tres cosas concretas: qué régimen te corresponde por lo que ganas fuera de ALTEN, qué gastos son deducibles para una persona física (salud, colegiaturas, intereses de crédito hipotecario) y cuándo cae la declaración anual. Empieza por leer tu propia constancia de situación fiscal en el portal del SAT antes que cualquier guía: ahí ya está tu situación real.',r:'Portal del SAT · Guía de Personas Físicas (gratis y es la fuente, no una interpretación)'},
        {n:'Decidir con la cabeza fría',q:'Casi ninguna mala decisión de dinero viene por no saber matemáticas. Viene por decidir cansado, con prisa o comparándote.',c:'Ponle una regla mecánica a lo que te cuesta: <b>72 horas</b> entre querer algo de más de $2,000 y comprarlo. Si a las 72 h sigues queriéndolo, cómpralo sin culpa. Y escribe la razón de cada decisión grande antes de tomarla — al releerla en 6 meses aprendes más de ti que de cualquier libro.',r:'Psicología del Dinero — Morgan Housel (18 historias cortas; se lee en una semana)'},
      ],
      recursos:[{t:'Libro',n:'I Will Teach You to Be Rich — Ramit Sethi'},{t:'App',n:'YNAB'},{t:'Libro',n:'The Millionaire Next Door — Thomas Stanley'},{t:'Libro',n:'Psicología del Dinero — Morgan Housel'}]},
    inversion:{
      // 2026-08-19 — Adán pidió cambiar el formato de estas dos: fuera diagnóstico,
      // "esta semana", plan de semanas, hábito y error común; en su lugar, la lista de
      // sub-habilidades concretas, cada una con cómo desarrollarla y con qué recurso.
      // Las otras 4 habilidades conservan el formato viejo — renderSkills() pinta uno u
      // otro según exista `subs`, así que ambos conviven sin ramas duplicadas.
      subs:[
        {n:'Interés compuesto y horizonte',q:'Es el motor de todo. Y lo que lo mueve no es la tasa, es el <b>tiempo</b>: cada año que pospones cuesta más que cualquier punto extra de rendimiento.',c:'Haz el cálculo una vez con tus números reales, no con ejemplos de libro: lo que puedes aportar al mes, un rendimiento conservador (8-10% anual nominal en México) y los años hasta 2030. Repítelo restando un año de aportaciones y compara — ver esa diferencia en pesos es lo que hace que ya no te saltes un mes.',r:'The Little Book of Common Sense Investing — John C. Bogle (corto y va directo al punto)'},
        {n:'Escribir tu asignación objetivo',q:'<b>Esta es la que te falta</b>, y es la razón real de que cada lunes decidas desde cero. Una asignación es un reparto en porcentajes, escrito una sola vez, que decide por ti cuando el mercado te esté gritando.',c:'Define <b>tres porcentajes que sumen 100</b>: renta fija (CETES), índice global o S&P 500, y una porción chica de riesgo alto (BTC). Escríbelos con fecha en un solo renglón y guárdalos. La regla que evita el error clásico: en lo volátil no pongas más de lo que puedas ver caer un 50% sin tocarlo. Cada compra del lunes deja de ser una decisión y pasa a ser rellenar el porcentaje que quedó abajo.',r:'The Bogleheads’ Guide to Investing (capítulo de asset allocation) · Pequeño Cerdo Capitalista: Inversiones — Sofía Macías'},
        {n:'Conocer los instrumentos mexicanos',q:'No puedes repartir entre cosas que no distingues. En México tienes acceso directo a más de lo que parece, y cada instrumento tiene un para qué distinto.',c:'Aprende de cada uno tres datos: <b>plazo, riesgo y cómo se le cobran impuestos</b>. Empieza por los que ya usas — CETES a 28 días (cetesdirecto, sin comisión), un índice como VOO vía GBM, y BTC — y añade solo lo que entiendas: Bonos M, Udibonos si te preocupa la inflación, y tu Afore, que es inversión aunque no lo parezca y casi nadie revisa.',r:'Banxico · Educación financiera y cetesdirecto.com (fuentes oficiales, sin nadie vendiéndote nada)'},
        {n:'Ver las comisiones antes que el rendimiento',q:'El rendimiento no lo controlas; el costo sí. Un 1% anual de comisión, sostenido 20 años, se come cerca de una quinta parte de lo que habrías acumulado.',c:'De cada instrumento busca tres costos: <b>comisión de administración</b> (anual, el que más pesa), <b>comisión por operación</b> y el <b>spread</b> de compra-venta si es en dólares o cripto. Compara el mismo índice en dos casas antes de comprarlo: la diferencia entre 0.03% y 1.5% anual es la diferencia entre llegar y no llegar al millón en 2030.',r:'A Random Walk Down Wall Street — Burton Malkiel (por qué los costos predicen mejor que las estrellas de un fondo)'},
        {n:'Aportar periódicamente y automatizarlo',q:'Aportar lo mismo cada periodo (DCA) compra más barato cuando el mercado cae y menos caro cuando sube, sin que tengas que adivinar. Y quita la decisión de en medio.',c:'Fija un <b>monto y un día</b> — tú ya tienes el bloque de GBM de los lunes y los $1,500 a CETES el día 15. Súbelo cuando suba tu ingreso, nunca lo bajes por cómo se vea el mercado. La prueba de que funciona es aburrida a propósito: 12 meses seguidos sin saltarte uno.',r:'The Simple Path to Wealth — JL Collins'},
        {n:'Rebalancear una vez al año',q:'Con el tiempo, lo que sube se lleva más peso del que le asignaste y tu cartera termina siendo más arriesgada de lo que decidiste.',c:'Una vez al año, o cuando algo se desvíe más de <b>5 puntos</b> de su porcentaje, vuelve a los números que escribiste. Lo más fácil: no vendas nada, dirige las aportaciones nuevas a lo que quedó abajo hasta emparejar. Rebalancear obliga a vender caro y comprar barato, que es justo lo contrario de lo que pide el instinto.',r:'The Bogleheads’ Guide to Investing'},
        {n:'Saber qué impuestos pagas al invertir',q:'El rendimiento que ves no es el que te queda. En México hay retención sobre intereses y un ISR distinto para ganancias de bolsa y para cripto.',c:'Aprende cómo tributa cada cosa que tienes: la retención anual sobre el capital en instrumentos de deuda, el <b>10% sobre la ganancia</b> en enajenación de acciones en bolsa, y que la ganancia por cripto se acumula a tus demás ingresos. Guarda tus constancias anuales de GBM y cetesdirecto en la misma carpeta desde ahora: en abril valen oro.',r:'Portal del SAT · Constancias de tus instituciones financieras'},
        {n:'Aguantar sin vender',q:'La diferencia entre lo que rinde un fondo y lo que gana la gente que lo tiene se explica casi entera por comprar arriba y vender abajo. Es la habilidad que más dinero vale y la única que no se estudia, se entrena.',c:'Escribe <b>hoy</b>, con el mercado tranquilo, qué vas a hacer si tu cartera cae 30% — y déjalo junto a la asignación. En la caída no se decide, se ejecuta lo que ya está escrito. Regla de higiene: revisa precios una vez por semana, en tu bloque del lunes, y no vuelvas a abrir la app hasta el siguiente.',r:'Psicología del Dinero — Morgan Housel · El Inversor Inteligente — Benjamin Graham (los capítulos 8 y 20, que son los que Buffett señala)'},
        {n:'Saber cuándo NO invertir',q:'Invertir con deuda cara viva o sin fondo de emergencia no es ser agresivo, es perder dinero con más pasos.',c:'Ordena siempre igual: <b>1) fondo de emergencia completo · 2) deuda con tasa alta a cero · 3) invertir</b>. Ninguna tasa de rendimiento razonable le gana a una tarjeta. Tu panel de "Qué invertir hoy" ya aplica esta regla a tu saldo real cada vez que lo abres — la habilidad es respetarla cuando el mercado esté subiendo y dé comezón saltarse un paso.',r:'I Will Teach You to Be Rich — Ramit Sethi (el orden de operaciones, capítulos 1 a 4)'},
      ],
      recursos:[{t:'Libro',n:'The Intelligent Investor — Benjamin Graham'},{t:'Libro',n:'The Little Book of Common Sense Investing — John Bogle'},{t:'Libro',n:'A Random Walk Down Wall Street — Burton Malkiel'},{t:'Libro',n:'One Up On Wall Street — Peter Lynch'}]},
    ia:{
      diagnostico:'Te sientes principiante, pero ya validaste IA generativa para Google y usas Claude Code a diario en producción — el hueco real no es técnico, es que nunca lo has aplicado a un proyecto tuyo, solo al trabajo de otros.',
      primer:'Construye una automatización simple en n8n.io conectando un formulario a Google Sheets — menos de 1h.',
      semana24:'Aplica esa misma automatización a un problema real tuyo (ej. capturar leads de la plantilla Finanzas.html sin revisar mensajes a mano) — la diferencia entre "saber IA" y "usar IA" es tenerla resolviendo algo tuyo, no un ejercicio de práctica.',
      habito:'1 bloque de 30 min/semana construyendo (no solo leyendo) un mini-proyecto de IA.',
      error:'Quedarte en el modo "leer sobre IA" indefinidamente. Ya tienes más base real que la mayoría (Visión Artificial, Sistemas Neurodifusos en tu carrera) — te falta construir, no aprender más teoría.',
      recursos:[{t:'Curso',n:'DeepLearning.AI — Prompt Engineering for Developers'},{t:'Curso',n:'Fast.ai'},{t:'Tool',n:'n8n.io'},{t:'Tool',n:'Cursor IDE'}]},

    /* ── Las 6 que tenian nivel pero ninguna ruta ──────────────────
       Copy, Networking, Liderazgo, Codigo, Ingles y Mentalidad salian en la lista
       con su numero, pero al tocarlas el panel de la izquierda no pintaba nada
       porque no estaban aqui. Cada paso arranca del nivel que YA tiene (55-85, no
       cero) y de lo que ya hace: ALTEN, Didi, la entrevista de Wayve, la deuda. */
    copy: {
      subs: [
        { n: 'Qué te falta, exactamente',
          q: 'Estás en <b>55</b>: escribes claro. Lo que falta no es redacción, es <b>pedir algo</b> al final de lo que escribes.',
          c: 'Toma los últimos 5 mensajes largos que mandaste — correo a un reclutador, mensaje a un cliente, tu perfil de LinkedIn— y subraya la frase donde pides algo concreto. Si en tres de los cinco no hay ninguna, ese es tu hueco entero.',
          r: 'Everybody Writes — Ann Handley' },
        { n: 'Una promesa por texto',
          q: 'Un texto que promete tres cosas no promete ninguna. Es el error más caro y el más fácil de arreglar.',
          c: 'Antes de escribir nada, apunta en una línea: <b>quién lo lee</b> y <b>qué quiero que haga</b>. Si no cabe en una línea, todavía no sabes qué estás escribiendo. Aplica esto primero a tu perfil de LinkedIn, que es el que más gente ve.',
          r: 'The Copywriter’s Handbook — Robert Bly' },
        { n: 'Reescribe tu perfil de LinkedIn',
          q: 'Es tu único texto que trabaja mientras duermes, y ahora mismo describe un puesto, no un resultado.',
          c: 'Cambia el titular por lo que <b>resuelves</b>, no por tu cargo. En el "acerca de", tres párrafos: qué haces, un resultado con número (algo que enviaste, algún sistema que tocaste en ALTEN) y cómo contactarte. Nada más.',
          r: 'Perfiles de ingenieros senior de automotive en LinkedIn, para calibrar el tono' },
        { n: 'El correo frío de 5 líneas',
          q: 'Es el formato que más te va a servir este año: para reclutadores, para clientes de proyectos y para pedir referencias.',
          c: 'Cinco líneas: por qué le escribes a esa persona (algo suyo, no genérico), qué haces tú en una frase, un resultado concreto, qué le pides, y una salida fácil ("si no es el momento, sin problema"). Escribe tres esta semana y mándalos.',
          r: 'The Cold Email Manifesto — Alex Berman' },
        { n: 'Leer en voz alta antes de enviar',
          q: 'Es el hábito que sostiene todo lo anterior y cuesta 30 segundos.',
          c: 'Antes de dar enviar a cualquier cosa que importe, léela en voz alta. Donde te tropieces, ahí sobra algo. Es el filtro más barato que existe y detecta el 80% de lo que un editor te marcaría.',
          r: 'On Writing Well — William Zinsser (capítulos 2 a 5)' },
      ],
      recursos: [
        { n: 'Everybody Writes — Ann Handley', t: 'libro' },
        { n: 'The Copywriter’s Handbook — Robert Bly', t: 'libro' },
      ],
    },
    network: {
      subs: [
        { n: 'Tu red real, en una hoja',
          q: 'Estás en <b>55</b>: conoces gente, pero no sabes a quién tienes. Sin esa lista, "hacer networking" es un deseo, no un plan.',
          c: 'Escribe 20 nombres de gente de tu campo con la que hablaste alguna vez: ALTEN, la universidad, proyectos, gente de automotive. Al lado de cada uno, cuándo fue la última vez. Las que pasen de un año son tu trabajo de las próximas semanas.',
          r: 'Never Eat Alone — Keith Ferrazzi' },
        { n: 'Reactivar sin pedir nada',
          q: 'El error común es aparecer cuando necesitas algo. Reactivar antes de necesitarlo es lo que hace que la red exista.',
          c: 'Manda cinco mensajes esta semana sin pedir <b>nada</b>: algo que leíste y le sirve a esa persona, una felicitación por un cambio de trabajo, una pregunta concreta sobre algo suyo. Tres líneas. Sin pedir café.',
          r: 'Give and Take — Adam Grant' },
        { n: 'Aparecer donde ya están',
          q: 'No hace falta ir a eventos: la gente de automotive software vive en sitios concretos y escribe en público.',
          c: 'Elige <b>un</b> sitio — LinkedIn, un Discord de la industria, un grupo de ADAS— y comenta con algo útil dos veces por semana. No publiques todavía: comenta. Comentar bien en el post de alguien vale más que veinte posts tuyos sin audiencia.',
          r: 'Los grupos de automotive/ADAS de LinkedIn y el Discord de ROS' },
        { n: 'La pregunta que abre puertas',
          q: 'Con Wayve y otras entrevistas por delante, la conversación informal vale más que la formal.',
          c: 'A quien ya trabaja donde tú quieres, pregúntale: <b>"¿qué te habría gustado saber antes de entrar?"</b>. Casi nadie se niega y casi todos contestan algo que no sale en ninguna oferta de empleo. Úsalo con dos personas antes de tu próxima entrevista.',
          r: 'Designing Your Life — Burnett & Evans (capítulo de entrevistas de prototipo)' },
        { n: 'Una hora al mes, en el calendario',
          q: 'El hábito: sin bloque fijo, esto se cae en dos semanas.',
          c: 'Un bloque de una hora al mes para revisar la lista, escribir a tres personas y añadir a los nuevos que conociste. Una hora al mes sostiene una red; cero horas la disuelve en un año.',
          r: 'Tu propio calendario — el bloque es el sistema' },
      ],
      recursos: [
        { n: 'Never Eat Alone — Keith Ferrazzi', t: 'libro' },
        { n: 'Give and Take — Adam Grant', t: 'libro' },
      ],
    },
    liderazgo: {
      subs: [
        { n: 'Dónde está tu techo',
          q: 'Estás en <b>80</b>: alto. Lo que separa 80 de 90 no es técnica, es <b>hacerlo cuando cuesta</b> — la conversación incómoda que pospones.',
          c: 'Apunta las tres conversaciones que llevas evitando (en ALTEN, en un proyecto, en casa). No las tengas todavía: sólo escribe qué dirías en una frase. Ver las tres juntas te dice si tu techo es de valentía o de claridad.',
          r: 'Crucial Conversations — Patterson et al.' },
        { n: 'Separar el hecho de la historia',
          q: 'Casi todo conflicto viene de contar la historia como si fuera el hecho.',
          c: 'Para una de esas tres conversaciones, escribe en dos columnas: <b>lo que pasó</b> (grabable en vídeo) y <b>lo que tú concluiste</b>. Casi siempre la segunda columna es larga y la primera cabe en dos líneas. Empieza la conversación sólo por la primera.',
          r: 'Crucial Conversations — capítulos 4 y 5' },
        { n: 'Liderar sin el puesto',
          q: 'No tienes gente a cargo, y ahí está la oportunidad: el liderazgo que se ve en una entrevista es el que ejerces sin autoridad.',
          c: 'Elige algo que esté roto en tu equipo y que nadie ha tomado — una documentación, un proceso de revisión, un test que siempre falla. Arréglalo y cuéntalo en una frase. Eso es exactamente lo que Wayve te va a preguntar cuando diga "háblame de una vez que lideraste".',
          r: 'The Staff Engineer’s Path — Tanya Reilly' },
        { n: 'Dar retroalimentación que no duela',
          q: 'La mitad del liderazgo real es decirle a alguien algo que no quiere oír sin romper la relación.',
          c: 'Fórmula de tres partes: qué pasó (hecho), qué efecto tuvo (concreto), qué propones. Sin "siempre" ni "nunca". Pruébalo una vez esta semana con algo pequeño — la práctica en cosas pequeñas es lo que te deja usarlo en las grandes.',
          r: 'Radical Candor — Kim Scott' },
        { n: 'Una conversación pendiente al mes',
          q: 'El hábito que mantiene el 80 y lo sube.',
          c: 'Una de las conversaciones que evitas, al mes. Una. No más, porque quemarse tampoco es liderar. Apúntala en el calendario como cualquier otra cita.',
          r: 'Tu lista de las tres, revisada cada mes' },
      ],
      recursos: [
        { n: 'Crucial Conversations — Patterson et al.', t: 'libro' },
        { n: 'The Staff Engineer’s Path — Tanya Reilly', t: 'libro' },
      ],
    },
    codigo: {
      subs: [
        { n: 'Qué te pide el puesto que quieres',
          q: 'Estás en <b>60</b>: escribes código que funciona. Para automotive y para Wayve, lo que falta es <b>código que otros mantienen</b>.',
          c: 'Abre tres ofertas reales del puesto que quieres (Wayve incluida) y saca la lista de lo que se repite: C++ moderno, Python, ROS, tests, CI. Marca en cuáles de esos podrías resolver un ejercicio mañana sin buscar. Esa marca es tu punto de partida real.',
          r: 'Las ofertas de Wayve, Zoox y Bosch — la lista sale de ahí, no de un curso' },
        { n: 'Tests antes que features',
          q: 'En automotive, el código sin test no llega a producción. Es lo que más separa a un junior de un senior en una revisión.',
          c: 'En tu próximo cambio en ALTEN, escribe la prueba <b>antes</b> del arreglo. Una sola vez, para sentir la diferencia: la prueba te obliga a decir qué esperas, y eso es la mitad del diseño hecho.',
          r: 'Working Effectively with Legacy Code — Michael Feathers' },
        { n: 'Leer código ajeno a propósito',
          q: 'Se aprende más leyendo un buen repositorio que escribiendo tres tuyos.',
          c: 'Elige un repositorio serio de tu campo — Autoware, ROS 2, o el propio Apollo— y lee <b>un archivo entero</b> a la semana, entendiendo por qué está hecho así. Anota una cosa que copiarías. En tres meses son doce ideas que no tenías.',
          r: 'github.com/autowarefoundation/autoware · github.com/ros2' },
        { n: 'Un proyecto que se pueda enseñar',
          q: 'En la entrevista pesa más un proyecto tuyo explicado bien que diez cursos terminados.',
          c: 'Algo pequeño y completo: un nodo que procese datos de sensor, con tests, CI en GitHub Actions y un README que explique <b>la decisión difícil</b> que tomaste. Lo que impresiona no es el tamaño, es que esté terminado y razonado.',
          r: 'Tu propio repositorio — el README es la mitad del trabajo' },
        { n: 'Media hora diaria, no seis el domingo',
          q: 'El hábito. Programar es memoria muscular: se pierde rápido y se recupera despacio.',
          c: 'Media hora al día antes de ALTEN, con el bloque de las 06:40 que ya tienes. Media hora diaria son 15 horas al mes; seis horas el domingo son seis y además se olvidan.',
          r: 'Tu bloque de la mañana, el que ya existe en Mi Día' },
      ],
      recursos: [
        { n: 'Working Effectively with Legacy Code — Michael Feathers', t: 'libro' },
        { n: 'The Staff Engineer’s Path — Tanya Reilly', t: 'libro' },
      ],
    },
    ingles: {
      subs: [
        { n: 'Tu nivel real es el de hablar bajo presión',
          q: 'Estás en <b>80</b>: lees y escribes bien. El hueco está en <b>hablar sin preparar</b>, que es exactamente lo que pasa en una entrevista.',
          c: 'Grábate dos minutos contestando "tell me about yourself" sin guión y escucha la grabación. Cuenta las pausas largas y las veces que traduces del español. Ese es tu número real, no el del certificado.',
          r: 'Tu propio teléfono — grabarte es el diagnóstico más honesto' },
        { n: 'El vocabulario de TU trabajo primero',
          q: 'No necesitas inglés general: necesitas explicar arquitectura, sensores y decisiones técnicas.',
          c: 'Haz una lista de 40 términos que usáis en ALTEN y que dudarías al decir en inglés: <i>trade-off, edge case, throughput, root cause, deprecate</i>. Practica frases con ellos, no palabras sueltas. Cuarenta términos cubren el 90% de tu jornada.',
          r: 'English for Professional Success · los glosarios de Autoware y ROS' },
        { n: 'Pensar en inglés durante el manejo',
          q: 'Tienes ~28 h a la semana al volante con Didi. Es el mayor bloque de tiempo libre que tienes.',
          c: 'Podcasts técnicos en inglés mientras manejas, y <b>repite en voz alta</b> frases sueltas. Repetir es lo que entrena la boca; sólo escuchar entrena el oído, que ya lo tienes. Nadie te ve en el coche.',
          r: 'The Autonocast · Lex Fridman Podcast · Software Engineering Daily' },
        { n: 'Simulacros de entrevista de verdad',
          q: 'Con Wayve por delante, esto no es opcional: es el escenario exacto que hay que ensayar.',
          c: 'Una sesión a la semana en voz alta con las preguntas típicas: proyecto del que estés orgulloso, un conflicto técnico, por qué esta empresa. Grábalas. La primera vez da vergüenza; a la cuarta ya no.',
          r: 'Pramp · interviewing.io · o un compañero de ALTEN' },
        { n: 'Cero traducción en el trabajo',
          q: 'El hábito que sube de 80 a 90 sin estudiar una hora más.',
          c: 'Pon en inglés todo lo que ya usas: el editor, la documentación, tus notas técnicas, los commits. No es estudiar más, es dejar de traducir. El idioma se aprende usando lo que ya haces.',
          r: 'Tu propio entorno de trabajo' },
      ],
      recursos: [
        { n: 'The Autonocast — podcast de automotive', t: 'podcast' },
        { n: 'Pramp — simulacros de entrevista gratis', t: 'web' },
      ],
    },
    mente: {
      subs: [
        { n: 'Lo alto no se mantiene solo',
          q: 'Estás en <b>85</b>: es tu punto más fuerte. La trampa de lo alto es creer que ya no necesita mantenimiento.',
          c: 'Escribe qué tres cosas te sostienen hoy — dormir, entrenar, tener un plan— y cuál de las tres es la primera que se cae cuando el mes se pone duro. Esa es la que hay que blindar, no las otras dos.',
          r: 'Atomic Habits — James Clear (capítulo de sistemas vs. metas)' },
        { n: 'El sueño es la palanca, no la fuerza de voluntad',
          q: 'Duermes 5h40-6h40. A ese nivel, la mitad de lo que parece falta de disciplina es falta de sueño.',
          c: 'Sube 30 minutos durante dos semanas, adelantando la hora de acostarte, no atrasando la de levantarte (tu mañana ya está comprometida). Mide el cambio en la sesión de gimnasio y en los bloques del día: se nota antes en el gimnasio.',
          r: 'Why We Sleep — Matthew Walker' },
        { n: 'La deuda pesa en la cabeza, no sólo en la cartera',
          q: 'Es tu ruido de fondo. Y es el que hace que un mal día parezca un mal año.',
          c: 'Una vez al mes, mira el número real y qué bajó — el Dashboard ya lo calcula. Ver un abono real convierte la deuda de <b>amenaza difusa</b> en <b>problema con plazo</b>, que es una carga mucho más ligera de llevar.',
          r: 'Tu propio Dashboard — pantalla de Finanzas' },
        { n: 'Cortar la rumia con una acción pequeña',
          q: 'Pensar mucho un problema que no se mueve no es analizar: es girar.',
          c: 'Cuando notes que llevas 10 minutos dando vueltas a lo mismo, haz <b>la cosa más pequeña</b> que lo mueva: un mensaje, una línea, una búsqueda. No la solución completa. La acción corta la rumia mejor que cualquier raz onamiento.',
          r: 'The Practicing Mind — Thomas Sterner' },
        { n: 'Una revisión corta cada domingo',
          q: 'El hábito que sostiene el 85.',
          c: 'Diez minutos el domingo: qué salió bien esta semana, qué se cayó y qué es lo único que cambio la que viene. Escrito, no pensado. Escribirlo es lo que hace que la semana siguiente no sea igual que la anterior.',
          r: 'Tu propio cuaderno · o la pantalla de Metas' },
      ],
      recursos: [
        { n: 'Atomic Habits — James Clear', t: 'libro' },
        { n: 'Why We Sleep — Matthew Walker', t: 'libro' },
      ],
    },
  };

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
        pm:{ orden:1, min:2, etiqueta:'Doble limpieza', esperaDespues:20,
             esperaTxt:'Sécate del todo y espera',
             uso:'Hoy usaste protector solar, así que van <b>dos pasadas</b>: la primera arrastra el SPF, la segunda limpia la piel. Con una sola, el retinoide se aplica encima del bloqueador.' } },

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
        foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Adapalene_Gel_%28Differin%29_in_China.jpg/960px-Adapalene_Gel_%28Differin%29_in_China.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
             uso:'Un <b>chícharo</b> para toda la cara, sobre piel <b>completamente seca</b>. Con la piel húmeda penetra de más y ahí empieza la irritación. Deja un dedo de margen alrededor del ojo: es la piel más delgada del cuerpo. Es el activo de mostrador con más evidencia — trata acné, previene arrugas y ayuda con manchas, los tres a la vez.' } },

      { id:'hidratantePM', cat:'Hidratante', n:'Eucerin Hyaluron-Filler + Epigenetic Noche',
        contenido:50, unidad:'ml', dosisDia:0.5, precio:700, tono:'pm',
        ayuda:['arrugas','sensibilidad'],
        frasco:'tarro', marca:{a:'#f6f7f9', b:'#12305e'},
        ficha:{
          activo:'\u00c1cido hialur\u00f3nico de dos tama\u00f1os de mol\u00e9cula',
          que:'La crema de noche. El hialur\u00f3nico corto entra a las capas de abajo y el largo se queda arriba reteniendo agua.',
          hace:'Rellena de agua las l\u00edneas de expresi\u00f3n desde dentro, y encima del retinoide hace de amortiguador: la irritaci\u00f3n del adapaleno viene en buena parte de que reseca, y esta capa lo compensa.',
          sirve:'Es lo que hace que puedas usar el retinoide todas las noches sin que la cara termine descamada. Sin ella, el adapaleno se vuelve intolerable a las dos semanas.',
          tarda:'La piel se siente distinta a la ma\u00f1ana siguiente. Las l\u00edneas finas, unas 4 semanas.',
          ojo:'Va encima del retinoide y sin esperar. No lo diluye ni le quita efecto \u2014 eso es un mito.'
        },
        pm:{ orden:3, min:1,
             uso:'Encima del retinoide, sin esperar. Amortigua la irritación mientras rellena líneas de expresión con ácido hialurónico.' } },

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
  const RUTINA_PELO = {
    productos: [
      { id:'minoxidil', cat:'Tratamiento anticaída', n:'Minoxidil 5% NR-11 (Polaris Research)',
        frasco:'gotero', marca:{a:'#f2f4f6', b:'#1a3a6b'},
        ficha:{
          activo:'Minoxidil al 5%, en loci\u00f3n',
          que:'El tratamiento t\u00f3pico de la ca\u00edda. La NR-11 de Polaris es una f\u00f3rmula concentrada, m\u00e1s fuerte que la Kirkland de farmacia que usabas antes.',
          hace:'Ensancha los vasos que riegan el fol\u00edculo y alarga la fase en la que el pelo crece. No mata la causa \u2014eso lo hace la dutasterida\u2014 pero sostiene con vida fol\u00edculos que iban camino de cerrarse.',
          sirve:'Es la mitad de fuera de tu tratamiento: la dutasterida ataca la hormona por dentro y el minoxidil mantiene despierto al fol\u00edculo por arriba. Juntos hacen bastante m\u00e1s que cualquiera solo.',
          tarda:'Las primeras 6-8 semanas se cae M\u00c1S pelo. Es el shedding y es buena se\u00f1al: los fol\u00edculos est\u00e1n soltando el pelo viejo para arrancar uno nuevo. Resultados reales a los 4-6 meses, y el m\u00e1ximo al a\u00f1o.',
          ojo:'El d\u00eda que lo dejes, en 3-4 meses vuelves al punto de partida. No es un tratamiento con final: mientras lo quieras conservar, va todos los d\u00edas.'
        },
        contenido:60, unidad:'ml', porUso:1, vecesDia:2, dias:[0,1,2,3,4,5,6], precio:900,
        tono:'am', clave:true, momento:'seco',
        uso:'<b>1 ml con el gotero</b>, repartido con los dedos <b>directo en el cuero cabelludo</b> seco — no en el pelo. Masajea 30 segundos y lávate las manos. Es <b>loción, no espuma</b>: sí lleva propilenglicol, así que si te pica o te reseca, baja a una dosis al día antes de abandonarlo.' },

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
        contenido:30, unidad:'cáps', porUso:1, vecesDia:1, dias:[0,1,2,3,4,5,6], precio:1500,
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
          que:'Tu champ\u00fa de todos los d\u00edas. Los otros dos \u2014Pilexil y Darrow\u2014 son tratamiento y van s\u00f3lo sus d\u00edas.',
          hace:'Limpia sin sulfatos, que son los detergentes agresivos que dejan el cuero cabelludo tirante y disparan el rebote de grasa. Menos irritaci\u00f3n abajo es mejor terreno para el fol\u00edculo.',
          sirve:'Es lo que usas los d\u00edas que no tocan medicados. Sin \u00e9l acabar\u00edas lav\u00e1ndote con champ\u00fa de tratamiento a diario, que reseca, o no lav\u00e1ndote, que tapa el poro.',
          tarda:'Desde el primer lavado: el cuero cabelludo deja de picar y de engrasarse tan r\u00e1pido.',
          ojo:'Es limpieza, no tratamiento. No aporta nada contra la ca\u00edda y no pretende hacerlo.'
        },
        contenido:355, unidad:'ml', porUso:15, dias:[3,6], diasCondicionales:[3], precio:300,
        tono:'agua', champu:true,
        uso:'Tu lavado suave: limpia sin arrastrar los aceites naturales. Los champús medicados son TRATAMIENTO, no mantenimiento.',
        notaDia:{ 3:'Solo después de nadar. El cloro se queda en el pelo y lo reseca durante horas — ese lavado no es opcional.' } },

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

      { id:'sinEnjuague', cat:'Crema sin enjuague', n:"Crema sin enjuague L'Oréal Elvive Total Repair 5",
        foto:'https://images.openbeautyfacts.org/images/products/007/124/936/4840/front_en.3.full.jpg',
        frasco:'tubo', marca:{a:'#ffffff', b:'#8b1a3a'},
        ficha:{
          activo:'Agentes acondicionadores que no se aclaran',
          que:'Una crema ligera que se queda puesta. Es el \u00fanico producto del largo que va TODOS los d\u00edas, tambi\u00e9n los que no te lavas.',
          hace:'Deja una pel\u00edcula fina que reduce la fricci\u00f3n durante todo el d\u00eda: al peinar, al pasar la mano, contra el cuello de la camisa. Menos fricci\u00f3n es menos pelo partido.',
          sirve:'Protege el pelo que ya tienes de romperse por el camino. En una cabeza que adem\u00e1s est\u00e1 perdiendo densidad, cada pelo que se parte cuenta doble.',
          tarda:'El tacto cambia el mismo d\u00eda. Menos puntas abiertas, en unas semanas.',
          ojo:'Un ch\u00edcharo, y s\u00f3lo en la mitad de abajo. En la ra\u00edz engrasa y aplana, y como no se enjuaga el error se queda ah\u00ed todo el d\u00eda.'
        },
        contenido:200, unidad:'ml', porUso:3, dias:[0,1,2,3,4,5,6], precio:110, tono:'pm',
        momento:'humedo',
        uso:'Cantidad de un chícharo sobre el pelo húmedo, <b>solo en la mitad de abajo</b>, y NO se enjuaga. Va <b>todos los días</b>, no solo los que te lavas.' },

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
        foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Softgels.jpg/960px-Softgels.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
        foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/B_vitamin_supplement_tablets.jpg/960px-B_vitamin_supplement_tablets.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
        frasco:'pastillas', marca:{a:'#ffffff', b:'#2b8a3e'},
        ficha:{
          activo:'Mezcla de vitaminas y minerales en dosis cercanas a la recomendada diaria',
          que:'Una tableta grande al d\u00eda. Es un seguro barato, no un tratamiento.',
          hace:'Cubre el m\u00ednimo de una docena de micronutrientes. No te sube por encima de lo normal: te evita quedarte por debajo el d\u00eda que comiste mal.',
          tarda:'No se siente nada, y as\u00ed debe ser. Su trabajo es que no pase nada.'
        },
        envase:90, unidad:'tabletas', porDia:1, precio:350, tono:'teal',
        porQue:'Cubre huecos de micronutrientes los días en que la dieta no es perfecta.',
        ojo:'No sustituye comer variado — es un seguro, no la base de la nutrición.' },

      { id:'omega3', n:'Omega 3 (aceite de pescado)', dosis:'1-2 g EPA+DHA', momento:'am', cuando:'con alimento',
        foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Bao_bi_dau_ca.jpg/960px-Bao_bi_dau_ca.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
        foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/Creatine_monohydrate_powder.jpg/960px-Creatine_monohydrate_powder.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
        frasco:'polvo', marca:{a:'#f2f4f6', b:'#e8590c'},
        ficha:{
          activo:'Creatina monohidratada \u2014 la forma barata, y la \u00fanica con evidencia s\u00f3lida',
          que:'Un polvo sin sabor que se disuelve en agua. Es el suplemento deportivo m\u00e1s estudiado que existe.',
          hace:'Rellena el dep\u00f3sito de fosfocreatina del m\u00fasculo, que es el combustible de los primeros segundos de esfuerzo m\u00e1ximo. Con el dep\u00f3sito lleno sacas una o dos repeticiones m\u00e1s por serie, y esas repeticiones extra son las que construyen m\u00fasculo con el tiempo.',
          tarda:'El m\u00fasculo se satura en 3-4 semanas tom\u00e1ndola a diario. El primer par de kilos que subas es agua dentro del m\u00fasculo, no grasa.'
        },
        envase:300, unidad:'g', porDia:5, precio:400, tono:'am', clave:true,
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
        porQue:'Mejora la calidad del sueño y reduce calambres — complementa lo de Postura y Salud Mental.',
        ojo:'Va de noche por una razón: tomarlo por la mañana desperdicia la mitad de para lo que lo compraste. El glicinato es el mejor tolerado; evita el óxido si tienes estómago sensible.' },

      { id:'whey', n:'Proteína Whey (suero de leche)', dosis:'25-30 g', momento:'pm', cuando:'solo si faltan gramos',
        foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/Orgain_organic_protein_powder.jpg/960px-Orgain_organic_protein_powder.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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

  // ─── El recetario ──────────────────────────────────────────────────────────
  // Vivía en comida.html y la lista de compras aquí, escritas por separado. El
  // comentario de ese archivo lo admitía: "si se agrega o quita una receta, hay
  // que replicar el cambio allá a mano". Ahora las recetas son la fuente y
  // LISTA_COMPRAS.comida se deriva de sus ingredientes: cada uno declara su
  // pasillo (`p`) y el getter los agrupa.
  //
  // Lo que NO entra, y por qué: café, picante, cítricos en exceso, chocolate,
  // frituras y cebolla/ajo CRUDOS le disparan el reflujo (cocidos sí van); y
  // calabaza, ejotes, hierbas de olor, camote, espinaca, pavo molido, leche de
  // avena, crema de cacahuate, caldo de pollo y avena en hojuelas. Brócoli y
  // zanahoria salieron de esa lista el 2-sep-2026: los compra en bolsa, cocidos
  // y mezclados, y así sí se los come.
  // hojuelas son los 12 que no le gustan.
  const RECETARIO = {
    desayuno: [
      {id:'d1', nombre:'Molletes de frijol con queso panela', tiempo:'15 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Molletes_mexicanos.jpg/1280px-Molletes_mexicanos.jpg',
       ingredientes:[{n:'Pan integral',c:'2 rebanadas',p:'Panadería y Tortillas'},{n:'Frijoles negros',c:'1/2 taza',p:'Abarrotes y Despensa'},{n:'Queso panela',c:'40 g',p:'Lácteos y Huevo'},{n:'Jitomate',c:'1/2 pza, picado',p:'Verduras'}],
       pasos:['Unta los frijoles sobre el pan.','Cubre con el queso panela rallado o en láminas.','Gratina en sartén tapado 5 min hasta que el queso se derrita.','Sirve con el jitomate picado encima.'],
       macros:{cal:420,prot:24,carbs:45,gra:14},
       tip:'Frijoles enteros, no refritos con manteca — más ligeros antes de manejar a ALTEN.'},
      {id:'d2', nombre:'Tacos de huevo con jamón de pavo y queso panela', tiempo:'10 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Tres_huevos_revueltos_con_jam%C3%B3n_de_pierna_y_cebolla_%2811380609084%29.jpg/1280px-Tres_huevos_revueltos_con_jam%C3%B3n_de_pierna_y_cebolla_%2811380609084%29.jpg',
       ingredientes:[{n:'Huevo',c:'3 pza',p:'Lácteos y Huevo'},{n:'Jamón de pavo',c:'60 g',p:'Carnes y Pescados'},{n:'Queso panela',c:'30 g',p:'Lácteos y Huevo'},{n:'Tortilla de harina',c:'3 pza',p:'Panadería y Tortillas'}],
       pasos:['Pica el jamón de pavo y sofríelo 1 minuto.','Agrega los huevos batidos y revuelve a fuego bajo.','En los últimos segundos agrega el queso en cubos para que se suavice.','Sirve en las tortillas calientes.'],
       macros:{cal:440,prot:32,carbs:28,gra:22},
       tip:'El jamón de pavo ya trae algo de sal — no le agregues más.'},
      {id:'d3', nombre:'Yogurt griego con granola de amaranto, miel y pera', tiempo:'5 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Granola_and_Yogurt.jpg/1280px-Granola_and_Yogurt.jpg',
       ingredientes:[{n:'Yogurt griego natural',c:'200 g',p:'Lácteos y Huevo'},{n:'Granola de amaranto',c:'30 g',p:'Abarrotes y Despensa'},{n:'Miel de abeja',c:'1 cda',p:'Abarrotes y Despensa'},{n:'Pera',c:'1 pza',p:'Frutas'}],
       pasos:['Sirve el yogurt en un tazón.','Agrega la granola de amaranto encima para que quede crujiente.','Corona con la pera picada y la miel.'],
       macros:{cal:400,prot:22,carbs:55,gra:8},
       tip:'El amaranto es un cereal mexicano de bajo índice glucémico, con más proteína que la avena.'},
      {id:'d4', nombre:'Huevos revueltos con nopales y queso panela', tiempo:'12 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Nopales_con_huevo_%2833798458511%29.jpg/1280px-Nopales_con_huevo_%2833798458511%29.jpg',
       ingredientes:[{n:'Huevo',c:'3 pza',p:'Lácteos y Huevo'},{n:'Nopales cocidos',c:'1 taza',p:'Verduras'},{n:'Queso panela',c:'40 g',p:'Lácteos y Huevo'},{n:'Tortilla de harina',c:'2 pza',p:'Panadería y Tortillas'}],
       pasos:['Escurre bien los nopales y sécalos con papel: si sueltan agua, los huevos quedan aguados.','Saltéalos 2 minutos en el sartén caliente, sin aceite.','Agrega los huevos batidos y revuelve a fuego bajo.','Fuera del fuego, agrega el queso en cubos y sirve con las tortillas.'],
       macros:{cal:430,prot:30,carbs:26,gra:22},
       tip:'El nopal baja el pico de glucosa del desayuno. Es de lo mejor que puedes desayunar antes de un día largo.'},
      {id:'d5', nombre:'Licuado de plátano, yogurt griego y granola', tiempo:'5 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Fresh_fruit_smoothie_being_poured_into_a_glass.jpg/1280px-Fresh_fruit_smoothie_being_poured_into_a_glass.jpg',
       ingredientes:[{n:'Plátano',c:'1 pza',p:'Frutas'},{n:'Yogurt griego natural',c:'150 g',p:'Lácteos y Huevo'},{n:'Leche entera',c:'200 ml',p:'Lácteos y Huevo'},{n:'Granola de amaranto',c:'20 g',p:'Abarrotes y Despensa'},{n:'Miel de abeja',c:'1 cda',p:'Abarrotes y Despensa'}],
       pasos:['Licúa el plátano con el yogurt y la leche.','Sirve y agrega la granola encima, no adentro: dentro se ablanda.','Endulza con la miel sólo si el plátano no estaba muy maduro.'],
       macros:{cal:480,prot:26,carbs:62,gra:12},
       tip:'Si te lo llevas al coche, la granola aparte en un frasco — si no, llega hecha papilla.'},
      {id:'d6', nombre:'Sándwich de pechuga con aguacate y queso panela', tiempo:'8 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Chipotle_chicken_avocado_sandwich_from_Earl_of_Sandwich.jpg/1280px-Chipotle_chicken_avocado_sandwich_from_Earl_of_Sandwich.jpg',
       ingredientes:[{n:'Pan integral',c:'2 rebanadas',p:'Panadería y Tortillas'},{n:'Pechuga de pollo',c:'80 g, cocida',p:'Carnes y Pescados'},{n:'Aguacate',c:'1/2 pza',p:'Almidones y grasas'},{n:'Queso panela',c:'30 g',p:'Lácteos y Huevo'},{n:'Jitomate',c:'2 rodajas',p:'Verduras'}],
       pasos:['Tuesta el pan para que aguante el aguacate sin deshacerse.','Machaca el aguacate y úntalo en las dos rebanadas.','Arma con la pechuga deshebrada, el queso y el jitomate en rodajas.','Prénsalo 30 segundos en el sartén si lo quieres caliente.'],
       macros:{cal:510,prot:38,carbs:38,gra:22},
       tip:'La pechuga cocida del domingo sirve para tres desayunos de la semana.'},
      {id:'d7', nombre:'Omelette de claras con verduras', tiempo:'12 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Mushroom_Omelette_-_Breakfast_At_Tiffany%27s_Brighton.jpg/1280px-Mushroom_Omelette_-_Breakfast_At_Tiffany%27s_Brighton.jpg',
       ingredientes:[{n:'Clara de huevo',c:'5 pza',p:'Lácteos y Huevo'},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'1 taza',p:'Verduras'},{n:'Pimiento morrón',c:'1/2 pza',p:'Verduras'},{n:'Queso panela',c:'30 g',p:'Lácteos y Huevo'}],
       pasos:['Saltea la bolsa de verduras y el pimiento hasta que se doren y suelten el agua.','Bate las claras con una pizca de sal y viértelas sobre la verdura.','Cocina a fuego bajo, tapado, hasta que cuaje arriba.','Agrega el queso, dobla a la mitad y sirve.'],
       macros:{cal:350,prot:35,carbs:14,gra:16},
       tip:'Sólo claras es proteína casi pura. Si vas justo de calorías del día, este es tu desayuno.'},
      {id:'d8', nombre:'Chilaquiles de tortilla horneada con pollo', tiempo:'18 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Chilaquiles_at_the_Grand_Cantina%2C_Windsor%2C_Ontario%2C_2025-09-01_04.jpg/1280px-Chilaquiles_at_the_Grand_Cantina%2C_Windsor%2C_Ontario%2C_2025-09-01_04.jpg',
       ingredientes:[{n:'Tortilla de harina',c:'4 pza',p:'Panadería y Tortillas'},{n:'Pechuga de pollo',c:'100 g, cocida',p:'Carnes y Pescados'},{n:'Jitomate',c:'3 pza',p:'Verduras'},{n:'Queso panela',c:'40 g',p:'Lácteos y Huevo'},{n:'Aceite de oliva',c:'1 cda',p:'Abarrotes y Despensa'}],
       pasos:['Corta las tortillas en triángulos y hornéalas 10 min hasta que truenen — horneadas, no fritas.','Licúa el jitomate cocido y sazona; hiérvelo 5 minutos.','Baña las tortillas justo antes de servir para que no se hagan sopa.','Corona con el pollo deshebrado y el queso.'],
       macros:{cal:560,prot:44,carbs:48,gra:20},
       tip:'Salsa de jitomate sin chile: los chilaquiles clásicos son de tus peores disparadores de agruras.'},
      {id:'d9', nombre:'Yogurt griego con pera, nuez y miel', tiempo:'5 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Requeij%C3%A3o_Portugu%C3%AAs.jpg/1280px-Requeij%C3%A3o_Portugu%C3%AAs.jpg',
       ingredientes:[{n:'Yogurt griego natural',c:'200 g',p:'Lácteos y Huevo'},{n:'Pera',c:'1 pza',p:'Frutas'},{n:'Nuez',c:'20 g',p:'Abarrotes y Despensa'},{n:'Miel de abeja',c:'1 cda',p:'Abarrotes y Despensa'}],
       pasos:['Sirve el yogurt en un tazón.','Corta la pera en cubos y repártela por encima.','Termina con la nuez picada y la miel.'],
       macros:{cal:420,prot:24,carbs:42,gra:16},
       tip:'El yogurt griego trae el doble de proteína que el normal. Míralo en la etiqueta antes de comprar: hay muchos que sólo lo dicen en el nombre.'},
      {id:'d10', nombre:'Huevos al albañil con tortilla', tiempo:'12 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Huevos_a_la_mexicana_y_quesadillas.png/1280px-Huevos_a_la_mexicana_y_quesadillas.png',
       ingredientes:[{n:'Huevo',c:'3 pza',p:'Lácteos y Huevo'},{n:'Jitomate',c:'2 pza',p:'Verduras'},{n:'Frijoles negros',c:'1/2 taza',p:'Abarrotes y Despensa'},{n:'Tortilla de harina',c:'2 pza',p:'Panadería y Tortillas'},{n:'Queso panela',c:'20 g',p:'Lácteos y Huevo'}],
       pasos:['Cuece el jitomate y licúalo; sazona sin chile.','Revuelve los huevos aparte, a fuego bajo.','Mezcla los huevos con la salsa un minuto, sin que se seque.','Sirve con los frijoles calientes, el queso y las tortillas.'],
       macros:{cal:470,prot:30,carbs:44,gra:18},
       tip:'Los frijoles de olla del domingo rinden aquí, en los molletes y en la cena.'},
      {id:'d11', nombre:'Avena de amaranto con plátano y nuez', tiempo:'8 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/7/72/Oat_porridge_in_Ghana.jpg',
       ingredientes:[{n:'Granola de amaranto',c:'50 g',p:'Abarrotes y Despensa'},{n:'Leche entera',c:'250 ml',p:'Lácteos y Huevo'},{n:'Plátano',c:'1 pza',p:'Frutas'},{n:'Nuez',c:'20 g',p:'Abarrotes y Despensa'},{n:'Miel de abeja',c:'1 cda',p:'Abarrotes y Despensa'}],
       pasos:['Calienta la leche con el amaranto a fuego bajo, moviendo, hasta que espese.','Retira antes de que hierva del todo: sigue espesando fuera del fuego.','Sirve con el plátano en rodajas, la nuez picada y la miel.'],
       macros:{cal:520,prot:22,carbs:70,gra:18},
       tip:'Amaranto en vez de avena en hojuelas, que es de los que no te gustan. Misma textura, más proteína.'},
      {id:'d12', nombre:'Quesadillas de pollo con pimiento', tiempo:'14 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Quesadilla_plate%2C_New_Orleans_November_2016.jpg/1280px-Quesadilla_plate%2C_New_Orleans_November_2016.jpg',
       ingredientes:[{n:'Tortilla de harina',c:'3 pza',p:'Panadería y Tortillas'},{n:'Pimiento morrón',c:'1 pza',p:'Verduras'},{n:'Pechuga de pollo',c:'80 g, cocida',p:'Carnes y Pescados'},{n:'Queso panela',c:'50 g',p:'Lácteos y Huevo'}],
       pasos:['Saltea el pimiento en tiras hasta que se dore.','Mézclalo con el pollo deshebrado.','Rellena las tortillas con la mezcla y el queso.','Dora en el comal, sin aceite, hasta que el queso se derrita.'],
       macros:{cal:520,prot:42,carbs:42,gra:20},
       tip:'Sin aceite en el comal: la quesadilla frita es de las que te levantan la agrura a media mañana.'}
    ],
    cena: [
      {id:'c1', nombre:'Tilapia al sartén con verduras salteadas', tiempo:'18 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Liat_Portal_for_Foodie_Disorder_-_Tilapia_with_roasted_zucchini_and_sweet_potato.jpg/1280px-Liat_Portal_for_Foodie_Disorder_-_Tilapia_with_roasted_zucchini_and_sweet_potato.jpg',
       ingredientes:[{n:'Filete de tilapia',c:'200 g',p:'Carnes y Pescados'},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'2 tazas',p:'Verduras'},{n:'Jitomate',c:'1 pza',p:'Verduras'},{n:'Aceite de oliva',c:'1 cda',p:'Abarrotes y Despensa'}],
       pasos:['Seca bien el filete: mojado no dora, se cuece.','Sella 3 minutos por lado en el sartén caliente y sácalo.','En el mismo sartén saltea la bolsa de verduras 5 minutos, que queden firmes.','Sirve el pescado sobre la verdura, con el jitomate picado encima.'],
       macros:{cal:450,prot:46,carbs:22,gra:18},
       tip:'El pescado blanco es la cena más ligera que tienes: cenas a las 8 y a las 11 ya no te pesa.'},
      {id:'c2', nombre:'Pechuga a la plancha con verduras', tiempo:'20 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Rivershack_Tavern_Shrewsbury_Louisiana_May_2016_Chicken_Red_Beans.jpg/1280px-Rivershack_Tavern_Shrewsbury_Louisiana_May_2016_Chicken_Red_Beans.jpg',
       ingredientes:[{n:'Pechuga de pollo',c:'200 g',p:'Carnes y Pescados'},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'2 tazas',p:'Verduras'},{n:'Frijoles negros',c:'1/2 taza',p:'Abarrotes y Despensa'},{n:'Aceite de oliva',c:'1 cda',p:'Abarrotes y Despensa'}],
       pasos:['Aplana un poco la pechuga para que se cocine parejo.','Plancha 5 minutos por lado, sin moverla, hasta que dore.','Saltea la bolsa de verduras mientras reposa la carne.','Deja reposar la pechuga 3 minutos antes de cortarla: si la cortas al momento, suelta todo el jugo.'],
       macros:{cal:540,prot:58,carbs:34,gra:16},
       tip:'Los 3 minutos de reposo son la diferencia entre una pechuga jugosa y una seca. No te los saltes.'},
      {id:'c3', nombre:'Filete de res con nopales y frijoles', tiempo:'22 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/A_New_Zealand_beef_steak_with_corn_and_sausage_with_potatoes_with_dinner_set_in_caf%C3%A9_de_coral.jpg/1280px-A_New_Zealand_beef_steak_with_corn_and_sausage_with_potatoes_with_dinner_set_in_caf%C3%A9_de_coral.jpg',
       ingredientes:[{n:'Filete de res magro',c:'200 g',p:'Carnes y Pescados'},{n:'Nopales cocidos',c:'1 taza',p:'Verduras'},{n:'Frijoles negros',c:'1 taza',p:'Abarrotes y Despensa'},{n:'Aceite de oliva',c:'1 cda',p:'Abarrotes y Despensa'}],
       pasos:['Saca la carne del refrigerador 15 minutos antes: fría por dentro no se cocina parejo.','Sella el filete 3-4 minutos por lado, sin picarlo con el tenedor.','Saltea los nopales escurridos en el mismo sartén, con lo que soltó la carne.','Calienta los frijoles aparte y sirve todo junto.'],
       macros:{cal:610,prot:60,carbs:40,gra:24},
       tip:'Carne magra dos veces por semana, no más: la grasa saturada es lo que te dispara el reflujo de noche.'},
      {id:'c4', nombre:'Atún con verduras y frijoles', tiempo:'15 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Tuna_in_kimchi_sauce%2C_green_olives%2C_and_black_beans_on_sticky_rice%2C_with_black_pepper_-_Massachusetts.jpg/1280px-Tuna_in_kimchi_sauce%2C_green_olives%2C_and_black_beans_on_sticky_rice%2C_with_black_pepper_-_Massachusetts.jpg',
       ingredientes:[{n:'Atún en agua',c:'2 latas',p:'Abarrotes y Despensa'},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'2 tazas',p:'Verduras'},{n:'Frijoles negros',c:'1 taza',p:'Abarrotes y Despensa'},{n:'Aceite de oliva',c:'1 cda',p:'Abarrotes y Despensa'}],
       pasos:['Saltea la bolsa de verduras hasta que se doren los bordes.','Escurre bien el atún y agrégalo al final, sólo para calentarlo.','Sirve con los frijoles calientes al lado.'],
       macros:{cal:500,prot:52,carbs:40,gra:14},
       tip:'La cena de 15 minutos para los días que llegas tarde de Didi. Todo sale de la despensa y el congelador.'},
      {id:'c5', nombre:'Láminas de salmón al horno con verduras', tiempo:'22 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Liat_Portal_for_Foodie_Disorder_-_Oven-baked_teriyaki_salmon_with_vegetables.jpg/1280px-Liat_Portal_for_Foodie_Disorder_-_Oven-baked_teriyaki_salmon_with_vegetables.jpg',
       ingredientes:[{n:'Láminas de salmón',c:'180 g',p:'Carnes y Pescados'},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'2 tazas',p:'Verduras'},{n:'Jitomate',c:'1 pza',p:'Verduras'},{n:'Aceite de oliva',c:'1 cda',p:'Abarrotes y Despensa'}],
       pasos:['Extiende las láminas en la charola sin encimarlas: encimadas se cuecen al vapor y quedan grises.','Hornea 10-12 min a 200 °C — las láminas son finas y se pasan rápido.','Saltea la bolsa de verduras mientras se hornea.','El salmón está listo cuando se separa con el tenedor, no antes.'],
       macros:{cal:520,prot:44,carbs:24,gra:30},
       tip:'En láminas se cocina en la mitad de tiempo que un lomo, y por eso mismo se seca en la mitad. Sácalo antes de que lo creas listo.'},
      {id:'c6', nombre:'Tacos de tilapia con verduras', tiempo:'18 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Fish_tacos_in_Pittsburg.jpg/1280px-Fish_tacos_in_Pittsburg.jpg',
       ingredientes:[{n:'Filete de tilapia',c:'200 g',p:'Carnes y Pescados'},{n:'Tortilla de harina',c:'3 pza',p:'Panadería y Tortillas'},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'1 taza',p:'Verduras'},{n:'Aguacate',c:'1/2 pza',p:'Almidones y grasas'}],
       pasos:['Corta el filete en tiras y séllalo 2 minutos por lado.','Saltea la bolsa de verduras hasta que la col quede tierna pero con mordida.','Calienta las tortillas en el comal.','Arma los tacos con el pescado, la verdura y el aguacate en rebanadas.'],
       macros:{cal:540,prot:46,carbs:44,gra:20},
       tip:'Sin salsa picante ni limón de más: los dos te caen mal de noche y el pescado no los necesita.'},
      {id:'c7', nombre:'Pollo con verduras al sartén', tiempo:'20 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Boneless_Chicken_Trencher%2C_classic_%E2%80%98Hunter%E2%80%99_sauce_-_Sally_Lunn%E2%80%99s_House_2025-07-22.jpg/1280px-Boneless_Chicken_Trencher%2C_classic_%E2%80%98Hunter%E2%80%99_sauce_-_Sally_Lunn%E2%80%99s_House_2025-07-22.jpg',
       ingredientes:[{n:'Pechuga de pollo',c:'200 g',p:'Carnes y Pescados'},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'2 tazas',p:'Verduras'},{n:'Pimiento morrón',c:'1 pza',p:'Verduras'},{n:'Aceite de oliva',c:'1 cda',p:'Abarrotes y Despensa'}],
       pasos:['Corta la pechuga en tiras y séllala a fuego alto, sin mover, hasta que dore.','Sácala y baja el fuego.','Saltea la bolsa de verduras y el pimiento hasta que se evapore el agua que sueltan.','Devuelve el pollo al sartén un minuto, sólo para que se junten los sabores.'],
       macros:{cal:500,prot:56,carbs:26,gra:18},
       tip:'Sacar el pollo y devolverlo al final es lo que evita que quede seco mientras se hace la verdura.'},
      {id:'c8', nombre:'Bowl de pollo, aguacate y huevo', tiempo:'15 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Chicken_salad_with_eggs.jpg/1280px-Chicken_salad_with_eggs.jpg',
       ingredientes:[{n:'Pechuga de pollo',c:'150 g, cocida',p:'Carnes y Pescados'},{n:'Huevo',c:'2 pza',p:'Lácteos y Huevo'},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'2 tazas',p:'Verduras'},{n:'Aguacate',c:'1 pza',p:'Almidones y grasas'},{n:'Aceite de oliva',c:'1 cda',p:'Abarrotes y Despensa'}],
       pasos:['Cuece los huevos 10 minutos y pásalos por agua fría para pelarlos fácil.','Cuece la bolsa de verduras 5 minutos y escúrrela bien.','Arma el bowl con la verdura abajo, el pollo deshebrado y los huevos en cuartos.','Termina con el aguacate en rebanadas, aceite de oliva y sal.'],
       macros:{cal:580,prot:50,carbs:24,gra:34},
       tip:'La cena de los días que entrenaste tarde: la verdura de bolsa se cuece en 5 minutos y lo demás ya está hecho.'},
      {id:'c9', nombre:'Pechuga al ajo cocido con verduras', tiempo:'18 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Fried_shrimp_sandwich_with_rice_and_beans.jpg/1280px-Fried_shrimp_sandwich_with_rice_and_beans.jpg',
       ingredientes:[{n:'Pechuga de pollo',c:'200 g',p:'Carnes y Pescados'},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'2 tazas',p:'Verduras'},{n:'Pimiento morrón',c:'1 pza',p:'Verduras'},{n:'Aceite de oliva',c:'1 cda',p:'Abarrotes y Despensa'}],
       pasos:['Dora el ajo en el aceite a fuego bajo hasta que huela, sin quemarlo — cocido no te cae mal, crudo sí.','Sube el fuego y sella la pechuga en tiras en ese mismo aceite.','Agrega el pimiento y la bolsa de verduras.','Saltea hasta que la verdura esté tierna y el pollo cocido por dentro.'],
       macros:{cal:510,prot:56,carbs:26,gra:18},
       tip:'El ajo cocido a fuego bajo da todo el sabor sin la agrura del crudo. Es la diferencia entre dormir bien y no.'},
      {id:'c10', nombre:'Milanesa de pollo al horno con verduras', tiempo:'28 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Milanesa.jpg/1280px-Milanesa.jpg',
       ingredientes:[{n:'Pechuga de pollo',c:'200 g',p:'Carnes y Pescados'},{n:'Huevo',c:'1 pza',p:'Lácteos y Huevo'},{n:'Pan integral',c:'2 rebanadas',p:'Panadería y Tortillas'},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'2 tazas',p:'Verduras'}],
       pasos:['Tuesta el pan y muélelo: ese es tu empanizado, sin fritura.','Pasa la pechuga aplanada por huevo batido y luego por el pan molido.','Hornea 20 min a 200 °C, volteando a la mitad.','La bolsa de verduras va en la misma charola los últimos 10 minutos.'],
       macros:{cal:560,prot:58,carbs:38,gra:16},
       tip:'Empanizado al horno: mismo antojo que la milanesa frita sin el reflujo de las 11 de la noche.'},
      {id:'c11', nombre:'Bowl de frijoles con huevo estrellado', tiempo:'15 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Rice_and_Beans_with_Egg.jpg/1280px-Rice_and_Beans_with_Egg.jpg',
       ingredientes:[{n:'Frijoles negros',c:'1.5 tazas',p:'Abarrotes y Despensa'},{n:'Huevo',c:'2 pza',p:'Lácteos y Huevo'},{n:'Aguacate',c:'1/2 pza',p:'Almidones y grasas'},{n:'Jitomate',c:'1 pza',p:'Verduras'},{n:'Tortilla de harina',c:'2 pza',p:'Panadería y Tortillas'}],
       pasos:['Calienta los frijoles hasta que espesen un poco.','Estrella los huevos con muy poco aceite, tapados, para que la yema quede tierna.','Sirve los frijoles en el tazón y los huevos encima.','Termina con el aguacate y el jitomate picado, con las tortillas al lado.'],
       macros:{cal:620,prot:34,carbs:62,gra:26},
       tip:'Frijol y tortilla juntos dan proteína completa. La cena más barata de la semana.'},
      {id:'c12', nombre:'Tilapia empapelada con verduras', tiempo:'25 min',
      foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Grilled_fish%2C_Lazaru%27s_Restaurant%2C_New_Urbane_Hotel%2C_2025_%2801%29.jpg/1280px-Grilled_fish%2C_Lazaru%27s_Restaurant%2C_New_Urbane_Hotel%2C_2025_%2801%29.jpg',
       ingredientes:[{n:'Filete de tilapia',c:'200 g',p:'Carnes y Pescados'},{n:'Bolsa de verduras (brócoli, col y zanahoria)',c:'2 tazas',p:'Verduras'},{n:'Pimiento morrón',c:'1 pza',p:'Verduras'},{n:'Aceite de oliva',c:'1 cda',p:'Abarrotes y Despensa'}],
       pasos:['Corta el pimiento en tiras finas para que se cueza al mismo tiempo que el pescado.','Arma el paquete de papel aluminio: verduras abajo, pescado encima, un chorro de aceite.','Cierra bien el paquete y hornea 20 min a 200 °C.','Ábrelo con cuidado: el vapor de dentro quema.'],
       macros:{cal:440,prot:46,carbs:22,gra:18},
       tip:'Empapelado no ensucia sartén y no lleva nada de fritura. Para las noches de poca energía.'}
    ],
    get todas() { return this.desayuno.concat(this.cena); },
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
          foto:'https://upload.wikimedia.org/wikipedia/commons/b/be/Kulturbeutel1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Druckverschlussbeutel.jpg/960px-Druckverschlussbeutel.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Mikrofaser-Handtuch_f%C3%BCr_Unterwegs.JPG/960px-Mikrofaser-Handtuch_f%C3%BCr_Unterwegs.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Smiling_Travel_Set_%282143747248%29.jpg/960px-Smiling_Travel_Set_%282143747248%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Zahnpastatube_%28fcm%29.jpg/960px-Zahnpastatube_%28fcm%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://upload.wikimedia.org/wikipedia/commons/5/53/Dental_floss_%28whole%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Colgate_Alcohol_Free_Mouthwash.jpg/960px-Colgate_Alcohol_Free_Mouthwash.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://upload.wikimedia.org/wikipedia/commons/6/60/Interdental-brushes.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled',
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
          foto:'https://upload.wikimedia.org/wikipedia/commons/9/9b/Quattro_Titanium_Energy.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Nivea_men_shaving_gel.jpg/960px-Nivea_men_shaving_gel.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Pitralon_Polar_1.jpg/960px-Pitralon_Polar_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Bartschneider.jpg/960px-Bartschneider.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Nose_hair_Cut_Scissors.jpg/960px-Nose_hair_Cut_Scissors.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Care_bamboo_green_tea_shower_gel_%282019%29_01.jpg/960px-Care_bamboo_green_tea_shower_gel_%282019%29_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://upload.wikimedia.org/wikipedia/commons/4/41/Stick_deodorant_%28blur%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Gant_de_toilette_Kiss.jpg/960px-Gant_de_toilette_Kiss.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://upload.wikimedia.org/wikipedia/commons/f/f3/Green_flip_flops_on_red_background.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Johnsons_Baby_Powder_1%2C5_OZS_talc%2C_pic1.JPG/960px-Johnsons_Baby_Powder_1%2C5_OZS_talc%2C_pic1.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Nail-clippers-variety.jpg/960px-Nail-clippers-variety.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://upload.wikimedia.org/wikipedia/commons/7/72/Glass_nail_file.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/Eucerin_hand_cream.jpg/960px-Eucerin_hand_cream.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Sparadrap_2.jpg/960px-Sparadrap_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Medication_Paracetamol.JPG/960px-Medication_Paracetamol.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Oral_rehydration_salts_%28ORS%29_-_Packet.jpg/960px-Oral_rehydration_salts_%28ORS%29_-_Packet.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Zyrtec-D_blister_pack.png/960px-Zyrtec-D_blister_pack.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/Sunbum_sunscreen_spf_30.jpg/960px-Sunbum_sunscreen_spf_30.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://upload.wikimedia.org/wikipedia/commons/b/bd/SKEETER.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Care_seven_herbs_shampoo_%282019%29_03.jpg/960px-Care_seven_herbs_shampoo_%282019%29_03.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Pill_box_with_pills.JPG/960px-Pill_box_with_pills.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Visine.JPG/960px-Visine.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Anti-reflective_coating_comparison.jpg/960px-Anti-reflective_coating_comparison.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/11/Reading-Glasses.jpg/960px-Reading-Glasses.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
          foto:'https://upload.wikimedia.org/wikipedia/commons/3/38/Led_desk_lmap_1.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled',
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
          foto:'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Omega_3_capsules_in_white_bottle_%2852715127894%29.jpg/960px-Omega_3_capsules_in_white_bottle_%2852715127894%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
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
        'Minoxidil ORAL 2.5-5 mg (\ud83e\ude7a receta + revisión de presión antes y durante) — el escalón que queda si en 6 meses el tópico + la dutasterida no bastan',
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
    libros:{
      'Ventas':['Influence — Robert Cialdini','$100M Offers — Alex Hormozi','SPIN Selling — Neil Rackham','Never Split the Difference — Chris Voss','The Psychology of Selling — Brian Tracy'],
      'Marketing':['$100M Leads — Alex Hormozi','Hacking Growth — Sean Ellis','Traffic Secrets — Russell Brunson','Jab, Jab, Jab, Right Hook — Gary Vaynerchuk'],
      'Finanzas e Inversión':['The Intelligent Investor — Benjamin Graham','The Little Book of Common Sense Investing — John Bogle','A Random Walk Down Wall Street — Burton Malkiel','One Up On Wall Street — Peter Lynch','Psicología del Dinero — Morgan Housel','I Will Teach You to Be Rich — Ramit Sethi','The Millionaire Next Door — Thomas Stanley','Tu Dinero o Tu Vida — Vicki Robin','Padre Rico, Padre Pobre — Robert Kiyosaki','The Millionaire Fastlane — MJ DeMarco'],
      'Copywriting':['Breakthrough Advertising — Eugene Schwartz','Ca$hvertising — Drew Eric Whitman','The Adweek Copywriting Handbook — Joseph Sugarman','Building a StoryBrand — Donald Miller'],
      'Datos':['Storytelling with Data — Cole Nussbaumer Knaflic','Python for Data Analysis — Wes McKinney'],
      'Networking':['Never Eat Alone — Keith Ferrazzi','Cómo Ganar Amigos e Influir sobre las Personas — Dale Carnegie','Give and Take — Adam Grant','The Art of Gathering — Priya Parker','The Like Switch — Jack Schafer'],
      'Programación':['Clean Code — Robert C. Martin','Designing Data-Intensive Applications — Martin Kleppmann','The Pragmatic Programmer — Hunt & Thomas','A Philosophy of Software Design — John Ousterhout'],
      'Liderazgo':['Extreme Ownership — Jocko Willink','Good to Great — Jim Collins','The Hard Thing About Hard Things — Ben Horowitz','Leaders Eat Last — Simon Sinek','The Five Dysfunctions of a Team — Patrick Lencioni'],
      'Hábitos y Mentalidad':['Atomic Habits — James Clear','Mindset: The New Psychology of Success — Carol Dweck',"Can't Hurt Me — David Goggins",'The Obstacle is the Way — Ryan Holiday','Meditaciones — Marco Aurelio'],
    },
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

  /* ── EL CATÁLOGO ──────────────────────────────────────────────────────────────────────────
     Cada clave dice de dónde sale el número y cómo se escribe (`fmt` por omisión es dinero).
     Los ids (d001, d003…) son los de `debts` en Finanzas.html — el mismo contrato que ya usan
     las migraciones `fix*IfNeeded()` del Dashboard. */
  const CLAVES = {
    // ── Deudas ──
    autoSaldo:     { v: () => campo('d003', 'balance') },
    autoTotal:     { v: () => campo('d003', 'total') },
    autoPago:      { v: () => campo('d003', 'min') },
    autoTasa:      { v: () => campo('d003', 'rate'), fmt: 'pct' },
    autoMeses:     { v: () => campo('d003', 'remainingMonths'), fmt: 'num' },
    // Derivadas del auto: lo que acabas pagando si solo das el mínimo, y cuánto de eso es
    // interés. Se calculan, no se copian — antes estaban escritas a mano en Coach y se
    // quedaron congeladas en el saldo de hace dos meses.
    autoAPagar:    { dep: ['autoMeses','autoPago'],
                     v: () => { const m = campo('d003','remainingMonths'), p = campo('d003','min');
                                return m != null && p != null ? m * p : null; } },
    autoInteres:   { dep: ['autoMeses','autoPago','autoSaldo'],
                     v: () => { const m = campo('d003','remainingMonths'), p = campo('d003','min'),
                                      s = campo('d003','balance');
                                return m != null && p != null && s != null ? m * p - s : null; } },
    tcBbva:        { v: () => campo('d001', 'balance') },
    tcBbvaMin:     { v: () => campo('d001', 'min') },
    tcBbvaTasa:    { v: () => campo('d001', 'rate'), fmt: 'pct' },
    banamex:       { v: () => campo('d002', 'balance') },
    banamexMin:    { v: () => campo('d002', 'min') },
    iphone:        { v: () => campo('d008', 'balance') },
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
    maestria:      { v: () => { const g = meta('g001');   return g ? +g.current : null; } },
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
    // `gasCadaMeses` divide al recibo antes de entrar en servicios, así que mueve el
    // total igual que el importe. Sin declararlo, el impacto quedaba invisible.
    gasMensual:    { dep: ['gas','gasCadaMeses'], v: () => PROYECTO.gasMensual },
    gasCadaMeses:  { v: () => PROYECTO.gasCadaMeses },
    servicios:     { dep: ['celular','internet','gas','gasCadaMeses','luzAgua'], v: () => PROYECTO.servicios },
    suscripciones: { dep: ['gym','claudeCode','icloud'], v: () => PROYECTO.suscripciones },
    cetesDia15:    { v: () => PROYECTO.cetesDia15 },
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
    maestriaInicio:{ v: () => PROYECTO.maestriaInicio,   fmt: 'txt' },
    // ── Derivadas que cruzan constantes con saldos vivos ──
    // Lo que queda del sueldo tras los fijos y los mínimos de deuda: el margen real del mes.
    margen:        { dep: ['ingresoTotal','fijosTotal','minimosDeuda'],
                     v: () => {
      const min = deudas().filter(d => +d.balance > 0).reduce((a, d) => a + (+d.min || 0), 0);
      return PROYECTO.ingresoTotal - PROYECTO.fijosTotal - min;
    } },
    minimosDeuda:  { dep: ['*deudas'], v: () => deudas().filter(d => +d.balance > 0).reduce((a, d) => a + (+d.min || 0), 0) },
    cetes:         { v: () => {
      const i = (fin && Array.isArray(fin.investments) ? fin.investments : [])
        .find(x => x.type === 'cetes' || /cetes/i.test(x.name || ''));
      return i ? +i.value : null;
    } },
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

  return {
    n: n, v: v, texto: texto, aplicarDOM: aplicarDOM, refrescar: refrescar, tabla: tabla,
    claves: function () { return Object.keys(CLAVES); },
    dep: function (k) { return (CLAVES[k] && CLAVES[k].dep) || []; },
    impacto: impacto,
    grafo: grafo,
    DEUDAS_SEED: DEUDAS_SEED,
    rutina: rutina,
    SK: SK,
    PHASES: PHASES,
    APRENDIZAJE: APRENDIZAJE,
    LISTA_COMPRAS: LISTA_COMPRAS,
    RUTINA_PIEL: RUTINA_PIEL,
    RUTINA_PELO: RUTINA_PELO,
    KIT_HIGIENE: KIT_HIGIENE,
    CUIDADO_OJOS: CUIDADO_OJOS,
    RECETARIO: RECETARIO,
    SUPLEMENTOS: SUPLEMENTOS,
    CHEQUEO: CHEQUEO,
    PROYECTO: PROYECTO,
    CALENDARIO: CALENDARIO,
    get datos() { return fin; }
  };
})();
