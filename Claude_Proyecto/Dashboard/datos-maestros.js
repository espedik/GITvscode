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
    gym:            1500,
    internet:        200,
    celular:         600,
    gas:             179,
    luzAgua:         135,
    limpieza:        150,
    claudeCode:      380,     // $20 USD
    icloud:            50,
    get fijosTotal() { return this.renta + this.gym + this.internet + this.celular +
                              this.gas + this.luzAgua + this.limpieza + this.claudeCode + this.icloud; },

    // ── Cosas suyas que se nombran en varias apps ──
    auto:        'BYD Dolphin Mini',
    broker:      'GBM',                     // estrategia: empresas de EE. UU.
    bancoSueldo: 'BBVA',

    // ── Fechas y metas no financieras ──
    entrevistaWayve: '2026-07-08',          // ver Entrevistas/ → sección Wayve
    maestriaEscuela: 'Esslingen — Automotive Systems M.Eng.',
    maestriaInicio:  '2028-10-01',
    maestriaPausa:   '2027-07-18',          // pausada hasta aquí, decidido en Coach
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
    // Saldo real reportado por Adán el 24-ago-2026: bajó de $299,000 a $292,000.
    {id:'d003',name:'Crédito Automotriz',            type:'car',        total:315800,    balance:292000,    rate:12.99, min:6700, day:1, start:'2026-01-01', remainingMonths:61},
    // Quedan 2 cuotas: 18 ago y 18 sep 2026 (confirmado por Adán el 13 ago 2026).
    {id:'d004',name:'Apple Watch MSI (TC Banamex)',  type:'other',      total:10248,     balance:1708,      rate:0,     min:854,  day:18,start:'2025-09-16'},
    // d005 (Vuelo Viva Aerobus) y d006 (Mercado Libre) se ELIMINARON el 13 ago 2026: Adán
    // revisó su historial real de BBVA y esos dos MSI no existen — no aparecen en ningún
    // movimiento. Se borran en vez de ponerlos en $0 porque nunca fueron deuda suya.
    // Liquidados el 13 ago 2026 — se pagó la última de las 3 cuotas MSI.
    {id:'d007',name:'Boletos Ticketmaster (MSI)',   type:'other',      total:3780,      balance:0,         rate:0,     min:1260, day:0, start:'2026-04-20'},
    {id:'d008',name:'iPhone 15 MSI',               type:'other',      total:13337.46,  balance:11361.54,  rate:0,     min:493.98,day:0, start:'2026-03-20'},
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
     Coach_v2.html, 17.5 KB en cada uno, y era la estructura más grande y más tocada de las que
     había que mantener a mano en dos sitios. El 2026-08-24 se detectó que llevaban 6 días
     divergentes: 7 textos de la rutina de cabello mejorados solo en Coach.

     dias: 0=domingo … 6=sábado. Los bloques con `fijo:true` (ALTEN) salen en la línea de tiempo
     y cuentan para "ahora/siguiente", pero no llevan checkbox ni suman al progreso.

     Los `href` se guardan en forma NEUTRA, como ancla interna (#aprendizaje). Cada app los
     resuelve al pedir la lista con `CIFRAS.rutina(base)`: Coach pasa "" porque las anclas son
     suyas, y el Dashboard pasa "../Coach/Coach_v2.html" porque tiene que salir de su archivo.
     Era la única diferencia legítima entre las dos copias; ahora es un parámetro. */
  const RUTINA_TASKS = [
    {id:"wd01",dias:[1,2,3,4,5],hora:"06:40",cat:"salud",txt:"Despertar sin snooze — celular fuera del cuarto"},
    {id:"wd-app-am",dias:[1,2,3,4,5],hora:"06:43",cat:"aprender",txt:"💻 Construir esta aplicación — 10 min antes de arrancar el día"},
    {id:"wd-am-lav",dias:[1,4],hora:"06:53",cat:"salud",txt:"🚿 Rutina de la mañana — ducha, cabello, piel y suplementos",producto:true,subtareas:[{id:"wd02a",sec:"Ducha y cabello",txt:"Champú: <b>Pilexil Anticaída 300 ml</b> — masajea el cuero cabelludo 2 min y enjuaga. NO lo frotes en el largo: su trabajo es la raíz."},{id:"wd02b",txt:"Acondicionador: <b>L'Oréal Elvive Reparación Total 5</b> — solo de medios a puntas, nunca en la raíz."},{id:"wd02c",txt:"Con el pelo AÚN HÚMEDO: <b>crema sin enjuague L'Oréal Elvive Total Repair 5</b> (se pone sobre el pelo húmedo y NO se enjuaga), cantidad de un chícharo, solo en la mitad de abajo."},{id:"wd02d",txt:"Deja secar al aire. Si tienes prisa y usas secadora, aire tibio y a 20 cm — nunca caliente ni pegado."},{id:"wd02e",txt:"⚠️ Si HOY hay caspa o descamación, usas <b>Darrow Doctar (alquitrán)</b> en lugar del Pilexil. Nunca los dos el mismo día."},{id:"wd03a",sec:"Piel y minoxidil",txt:"Limpiador suave: CeraVe Limpiador Espumoso (verde) — quita grasa y sudor de la noche sin resecar"},{id:"wd03b",txt:"Sérum de niacinamida 10%: The Ordinary Niacinamida 10% + Zinc 1% — controla grasa y afina los poros"},{id:"wd03c",txt:"Hidratante con protector solar SPF 50: La Roche-Posay Anthelios — hidrata y protege del sol, obligatorio de día"},{id:"wd04",txt:"<b>Minoxidil 5% en ESPUMA (Kirkland)</b> en cuero cabelludo seco — la espuma no lleva propilenglicol, que es lo que reseca el tallo en la versión líquida — estimula el folículo, dosis de la mañana"},{id:"wdSupAm1",sec:"Suplementos",txt:"Vitamina D3 — 2000-4000 UI, con algo de grasa en la comida",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"wdSupAm2",txt:"Multivitamínico — 1 tableta"},{id:"wdSupAm3",txt:"Omega 3 — 1-2g EPA+DHA, con alimento"},{id:"wdSupAm4",txt:"Creatina monohidratada — 5g (todos los días, no solo si entrenas hoy)"}]},
    {id:"wd-am-co",dias:[2,3,5],hora:"06:53",cat:"salud",txt:"🚿 Rutina de la mañana — ducha, cabello, piel y suplementos",producto:true,subtareas:[{id:"wd02ca",sec:"Ducha y cabello",txt:"Hoy <b>no lleva champú</b>: mojas, y aplicas <b>L'Oréal Elvive Reparación Total 5</b> solo de medios a puntas. Lavar a diario con champú es lo que termina de secar el pelo."},{id:"wd02cb",txt:"Con el pelo húmedo: <b>crema sin enjuague L'Oréal Elvive Total Repair 5</b> (se pone sobre el pelo húmedo y NO se enjuaga), un chícharo. Este paso va todos los días, no solo cuando te lavas."},{id:"wd02cc",txt:"Ya seco, si lo notas áspero: 2 gotas de <b>Moroccanoil Treatment Light</b> solo en las puntas."},{id:"wd03a",sec:"Piel y minoxidil",txt:"Limpiador suave: CeraVe Limpiador Espumoso (verde) — quita grasa y sudor de la noche sin resecar"},{id:"wd03b",txt:"Sérum de niacinamida 10%: The Ordinary Niacinamida 10% + Zinc 1% — controla grasa y afina los poros"},{id:"wd03c",txt:"Hidratante con protector solar SPF 50: La Roche-Posay Anthelios — hidrata y protege del sol, obligatorio de día"},{id:"wd04",txt:"<b>Minoxidil 5% en ESPUMA (Kirkland)</b> en cuero cabelludo seco — la espuma no lleva propilenglicol, que es lo que reseca el tallo en la versión líquida — estimula el folículo, dosis de la mañana"},{id:"wdSupAm1",sec:"Suplementos",txt:"Vitamina D3 — 2000-4000 UI, con algo de grasa en la comida",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"wdSupAm2",txt:"Multivitamínico — 1 tableta"},{id:"wdSupAm3",txt:"Omega 3 — 1-2g EPA+DHA, con alimento"},{id:"wdSupAm4",txt:"Creatina monohidratada — 5g (todos los días, no solo si entrenas hoy)"}]},
    {id:"sa-am",dias:[6],hora:"08:35",cat:"salud",txt:"🚿 Rutina de la mañana — ducha, cabello, piel y suplementos",producto:true,subtareas:[{id:"sa05a",sec:"Ducha y cabello",txt:"Champú: <b>CeraVe Champú Hidratante (sin sulfatos)</b>. Hoy es día de reparación, no de tratamiento."},{id:"sa05b",txt:"<b>Mascarilla L'Oréal Elvive Total Repair 5</b> — es un acondicionador concentrado, viene en TARRO (no en botella). Va de medios a puntas y se deja actuar <b>5-10 min</b> mientras terminas de bañarte. Es el paso que más repara de toda tu semana: si te saltas uno, que no sea este."},{id:"sa05c",txt:"Hoy <b>NO</b> uses acondicionador: la mascarilla ya hizo ese trabajo, y ponerle los dos apelmaza el cabello fino."},{id:"sa05d",txt:"Con el pelo húmedo: <b>crema sin enjuague L'Oréal Elvive Total Repair 5</b> — se pone y NO se enjuaga, se queda todo el día. Ya seco: 2 gotas de <b>Moroccanoil Treatment Light</b> en puntas."},{id:"sa05e",txt:"Revisa las puntas: si ves pelos abiertos en forma de Y, ya toca corte. Cada 8-12 semanas, 1-2 cm — solo puntas."},{id:"sa02",sec:"Piel y minoxidil",txt:"Skincare AM — limpiador + niacinamida + hidratante con SPF 50 (mismos productos que entre semana)"},{id:"sa02b",txt:"<b>Minoxidil 5% en ESPUMA (Kirkland)</b> en cuero cabelludo seco — la espuma no lleva propilenglicol, que es lo que reseca el tallo en la versión líquida — dosis de la mañana"},{id:"saSupAm1",sec:"Suplementos",txt:"Vitamina D3 — 2000-4000 UI, con algo de grasa en la comida",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"saSupAm2",txt:"Multivitamínico — 1 tableta"},{id:"saSupAm3",txt:"Omega 3 — 1-2g EPA+DHA, con alimento"},{id:"saSupAm4",txt:"Creatina monohidratada — 5g (todos los días, no solo si entrenas hoy)"}]},
    {id:"do-am",dias:[0],hora:"08:35",cat:"salud",txt:"🚿 Rutina de la mañana — ducha, cabello, piel y suplementos",producto:true,subtareas:[{id:"do045a",sec:"Ducha y cabello",txt:"Hoy <b>no lleva champú</b>: <b>L'Oréal Elvive Reparación Total 5</b> de medios a puntas y enjuaga."},{id:"do045b",txt:"Con el pelo húmedo: <b>crema sin enjuague L'Oréal Elvive Total Repair 5</b> (se pone sobre el pelo húmedo y NO se enjuaga), un chícharo."},{id:"do045c",txt:"Antes de dormir, <b>funda de almohada de satín</b>. Pasas 7 horas frotando el pelo contra la almohada: el algodón lo rompe y le roba humedad, el satín no."},{id:"do02",sec:"Piel y minoxidil",txt:"Skincare AM — limpiador + niacinamida + hidratante con SPF 50 (mismos productos que entre semana)"},{id:"do02b",txt:"<b>Minoxidil 5% en ESPUMA (Kirkland)</b> en cuero cabelludo seco — la espuma no lleva propilenglicol, que es lo que reseca el tallo en la versión líquida — dosis de la mañana"},{id:"doSupAm1",sec:"Suplementos",txt:"Vitamina D3 — 2000-4000 UI, con algo de grasa en la comida",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"doSupAm2",txt:"Multivitamínico — 1 tableta"},{id:"doSupAm3",txt:"Omega 3 — 1-2g EPA+DHA, con alimento"},{id:"doSupAm4",txt:"Creatina monohidratada — 5g (todos los días, no solo si entrenas hoy)"}]},
    {id:"wd05",dias:[1,2,3,4,5],hora:"07:33",cat:"descanso",txt:"Vestirte y alistarte"},
    {id:"wd06",dias:[1,2,3,4,5],hora:"07:40",cat:"admin",txt:"🚗 Didi con direccionamiento — camino a ALTEN (~50 min: el traslado normal + el desvío del pasajero)"},
    {id:"wd07",dias:[1,2,3,4,5],hora:"08:30",dur:270,cat:"trabajo",txt:"🏢 ALTEN — jornada laboral (HIL/SIL Ford) — entras 08:30, sales 16:40",fijo:true},
    {id:"wd12b",dias:[1,2,3,4,5],hora:"13:00",cat:"salud",txt:"🛒 Comprar comida — descanso de ALTEN"},
    {id:"wd12c",dias:[1,2,3,4,5],hora:"13:40",dur:180,cat:"trabajo",txt:"🏢 ALTEN — de vuelta a la jornada laboral (hasta las 16:40)",fijo:true},
    {id:"wd-cenlex",dias:[1,2,3,4,5],hora:"16:40",dur:20,cat:"admin",txt:"🚗 Manejar al CENLEX Santo Tomás (~20 min)"},
    {id:"wd-aleman",dias:[1,2,3,4,5],hora:"17:00",dur:60,cat:"aprender",txt:"🇩🇪 Clase de alemán — CENLEX Santo Tomás (17:00 a 18:00)"},
    {id:"wd-al-gym",dias:[1,2,3,4,5],hora:"18:00",dur:15,cat:"admin",txt:"🚗 Del CENLEX al gimnasio (~15 min)"},
    {id:"wd09",dias:[1,2,3,4,5],hora:"19:05",cat:"salud",txt:"Ducha rápida post-ejercicio",subtareas:[{id:"wd09a",txt:"Ducha rápida para quitar el sudor del entrenamiento."},{id:"wd09b",txt:"🏊 <b>SOLO MIÉRCOLES, después de nadar:</b> lava el cabello con <b>CeraVe Champú Hidratante (sin sulfatos)</b>. El cloro se queda en el pelo y lo reseca durante horas — este lavado no es opcional."},{id:"wd09c",txt:"🏊 Miércoles: después del champú, <b>L'Oréal Elvive Reparación Total 5</b> de medios a puntas y <b>crema sin enjuague L'Oréal Elvive Total Repair 5</b> (se pone sobre el pelo húmedo y NO se enjuaga) con el pelo húmedo."},{id:"wd09d",txt:"🏊 Truco para el miércoles: <b>moja el pelo con agua limpia ANTES de meterte a la alberca</b>. El pelo mojado absorbe menos cloro, igual que una esponja llena."}]},
    {id:"wd-didi2",dias:[1,2,3,4,5],hora:"19:30",cat:"admin",txt:"🚗 Didi — sesión corta de la noche (hasta ~20:00)"},
    {id:"wd11",dias:[1,2,3,4,5],hora:"20:00",cat:"profundo",txt:"🎯 Prioridad activa de Fase 0: negocio de tu papá o plantilla GBM — 1h15 de avance real (20:00–21:15)"},
    {id:"wd14",dias:[1,2,3,4,5],hora:"21:15",cat:"salud",txt:"🍽️ Cena + preparar la comida de mañana",subtareas:[{id:"wd14a",txt:"Cocina un solo platillo para cenar hoy y llevar de comida mañana a ALTEN — ahorra tiempo, sin carbohidratos refinados en la cena",link:{href:"../CuidadoPersonal/comida.html?s=cenas",label:"🍳 Ver cenas"}},{id:"wd14b",txt:"Deja todo empacado y listo junto a la puerta para salir rápido mañana",link:{href:"../CuidadoPersonal/comida.html?s=desayunos",label:"🍳 Ver desayunos"}}]},
    {id:"wd-pm",dias:[1,2,3,4,5],hora:"22:30",cat:"salud",txt:"🌙 Rutina de la noche — piel, minoxidil y suplementos",producto:true,subtareas:[{id:"wd17a",sec:"Piel y minoxidil",txt:"Limpiador (doble limpieza si usaste protector solar): CeraVe Limpiador Espumoso (verde) — remueve el bloqueador y el sudor del día"},{id:"wd17b",txt:"Tratamiento con retinoide: Differin Adapaleno 0.1% Gel — controla brotes y mejora la textura"},{id:"wd17c",txt:"Hidratante nocturno: Eucerin Hyaluron-Filler + Epigenetic Noche — repara la piel mientras duermes"},{id:"wd18",txt:"<b>Minoxidil 5% en ESPUMA (Kirkland)</b> en cuero cabelludo seco — la espuma no lleva propilenglicol, que es lo que reseca el tallo en la versión líquida — dosis de la noche"},{id:"wdSupPm1",sec:"Suplementos",txt:"Magnesio (glicinato) — 200-400mg, 30-60 min antes de dormir",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"wdSupPm2",txt:"Proteína Whey — 25-30g si hoy no llegaste a tu meta de proteína (186g/día)"}]},
    {id:"sa-pm",dias:[6],hora:"22:20",cat:"salud",txt:"🌙 Rutina de la noche — piel, minoxidil y suplementos",producto:true,subtareas:[{id:"sa13",sec:"Piel y minoxidil",txt:"Skincare PM — limpiador + retinoide + hidratante nocturno"},{id:"sa13b",txt:"<b>Minoxidil 5% en ESPUMA (Kirkland)</b> en cuero cabelludo seco — la espuma no lleva propilenglicol, que es lo que reseca el tallo en la versión líquida — dosis de la noche"},{id:"saSupPm1",sec:"Suplementos",txt:"Magnesio (glicinato) — 200-400mg, 30-60 min antes de dormir",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"saSupPm2",txt:"Proteína Whey — 25-30g si hoy no llegaste a tu meta de proteína (186g/día)"}]},
    {id:"do-pm",dias:[0],hora:"22:05",cat:"salud",txt:"🌙 Rutina de la noche — piel, minoxidil y suplementos",producto:true,subtareas:[{id:"do10",sec:"Piel y minoxidil",txt:"Skincare PM — limpiador + retinoide + hidratante nocturno"},{id:"do10b",txt:"<b>Minoxidil 5% en ESPUMA (Kirkland)</b> en cuero cabelludo seco — la espuma no lleva propilenglicol, que es lo que reseca el tallo en la versión líquida — dosis de la noche"},{id:"doSupPm1",sec:"Suplementos",txt:"Magnesio (glicinato) — 200-400mg, 30-60 min antes de dormir",link:{href:"../CuidadoPersonal/salud.html?tab=suplementos",label:"💊 Ver Suplementos"}},{id:"doSupPm2",txt:"Proteína Whey — 25-30g si hoy no llegaste a tu meta de proteína (186g/día)"}]},
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
  /* ── MIGRACIONES COMPARTIDAS ────────────────────────────────────────────────────────────────
     Correcciones puntuales sobre `finanzasmx_v2` cuando Adán reporta un saldo nuevo.

     Antes había que escribir cada una DOS veces —en `Finanzas.html → init()` y su espejo
     `fix*IfNeeded()` en `dashboard.html`— porque cualquiera de las dos apps puede ser la primera
     que abra, y la que arranca es la que tiene que aplicar el fix. Dos copias del mismo código
     que hay que mantener a la par: la misma trampa que las cifras escritas a mano.

     Ahora viven aquí. Este archivo lo cargan las tres apps y se ejecuta antes que su JS, así que
     la corrección llega abra lo que abra — incluido Coach_v2.html, que nunca tuvo migraciones y
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
    // interés. Se calculan, no se copian — antes estaban escritas a mano en Coach_v2 y se
    // quedaron congeladas en el saldo de hace dos meses.
    autoAPagar:    { v: () => { const m = campo('d003','remainingMonths'), p = campo('d003','min');
                                return m != null && p != null ? m * p : null; } },
    autoInteres:   { v: () => { const m = campo('d003','remainingMonths'), p = campo('d003','min'),
                                      s = campo('d003','balance');
                                return m != null && p != null && s != null ? m * p - s : null; } },
    tcBbva:        { v: () => campo('d001', 'balance') },
    tcBbvaMin:     { v: () => campo('d001', 'min') },
    tcBbvaTasa:    { v: () => campo('d001', 'rate'), fmt: 'pct' },
    banamex:       { v: () => campo('d002', 'balance') },
    banamexMin:    { v: () => campo('d002', 'min') },
    iphone:        { v: () => campo('d008', 'balance') },
    appleWatch:    { v: () => campo('d004', 'balance') },
    zapStylo:      { v: () => campo('d009', 'balance') },
    zapStyloCuota: { v: () => campo('d009', 'min') },
    // ── Totales ──
    deudaTotal:    { v: () => sum(deudas()) },
    // "Deuda cara" = tarjetas de crédito con saldo vivo. Mismo criterio que la ruta de deuda
    // cara del Dashboard: los MSI a 0% no cuentan aunque tengan saldo.
    deudaCara:     { v: () => sum(deudas().filter(d => d.type === 'credit_card' && +d.balance > 0)) },
    deudaMsi:      { v: () => sum(deudas().filter(d => d.type === 'other' && +d.balance > 0)) },
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
    ingresoTotal:  { v: () => PROYECTO.ingresoTotal },
    renta:         { v: () => PROYECTO.renta },
    gym:           { v: () => PROYECTO.gym },
    fijosTotal:    { v: () => PROYECTO.fijosTotal },
    empleador:     { v: () => PROYECTO.empleador,   fmt: 'txt' },
    nombre:        { v: () => PROYECTO.nombre,      fmt: 'txt' },
    auto:          { v: () => PROYECTO.auto,        fmt: 'txt' },
    broker:        { v: () => PROYECTO.broker,      fmt: 'txt' },
    bancoSueldo:   { v: () => PROYECTO.bancoSueldo, fmt: 'txt' },
    maestriaEscuela:{ v: () => PROYECTO.maestriaEscuela, fmt: 'txt' },
    maestriaInicio:{ v: () => PROYECTO.maestriaInicio,   fmt: 'txt' },
    // ── Derivadas que cruzan constantes con saldos vivos ──
    // Lo que queda del sueldo tras los fijos y los mínimos de deuda: el margen real del mes.
    margen:        { v: () => {
      const min = deudas().filter(d => +d.balance > 0).reduce((a, d) => a + (+d.min || 0), 0);
      return PROYECTO.ingresoTotal - PROYECTO.fijosTotal - min;
    } },
    minimosDeuda:  { v: () => deudas().filter(d => +d.balance > 0).reduce((a, d) => a + (+d.min || 0), 0) },
    cetes:         { v: () => {
      const i = (fin && Array.isArray(fin.investments) ? fin.investments : [])
        .find(x => x.type === 'cetes' || /cetes/i.test(x.name || ''));
      return i ? +i.value : null;
    } },
  };

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
    DEUDAS_SEED: DEUDAS_SEED,
    rutina: rutina,
    PROYECTO: PROYECTO,
    get datos() { return fin; }
  };
})();
