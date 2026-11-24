/* Próximos viajes: la sección de arriba de Mis Metas y la ventana de cada viaje.

   Adán, 23-nov-2026: "arriba pon otra sección de próximos viajes, el próximo será en Guadalajara del 4 al 7 de diciembre,
   ya tengo mi vuelo de ida pero de regreso quiero regresarme en Kolors autobuses, igual ahí quiero información completa,
   después otro viaje que quiero hacer y no tengo planeado es a Puerto Rico, que sería por febrero o marzo de 2027".
   Cada viaje trae lo que falta con fecha, cómo se llega y se regresa, qué hacer cada día, cuánto cuesta (lo estimado
   contra lo que pagaste) y qué hacer si algo falla. Los precios dicen cuándo se vieron; el clima de los próximos 16 días
   sale de Open-Meteo. Un viaje nuevo se agrega desde la pantalla, sin tocar este archivo.
   Se guarda en `viajes_v1`; los datos del vuelo y del hotel, en `viajes_privado_v1`, que no sale de este navegador. */
(function () {
  'use strict';
  const KEY = 'viajes_v1', KEY_PRIV = 'viajes_privado_v1', KEY_CLIMA = 'dash-clima-v1';
  const KOLORS = d => 'https://www.kolors.com.mx/rutas-boletos-autobus/lopez-mateos-y-tenochtitlan-guadalajara/ciudad-de-mexico?departureDate=' + d + '&adult=1';
  const usd = n => n * ((window.CIFRAS && CIFRAS.PROYECTO && CIFRAS.PROYECTO.usdMxn) || 17.5);

  // ── LOS VIAJES ───────────────────────────────────────────────────────────────────────────────────────────────────
  const BASE = [
    {
      id: 'gdl', ciudad: 'Guadalajara', lugar: 'Jalisco', ini: '2026-12-04', fin: '2026-12-07', color: '#c4831f',
      lat: 20.6736, lon: -103.344, tz: 'America/Mexico_City',
      foto: 'fotos-viajes/gdl-catedral.jpg', cred: 'ProtoplasmaKid · CC BY-SA 4.0 · Wikimedia Commons',
      q: 'La Feria del Libro en su último fin de semana, Caravaggio y los murales de Orozco.',
      elige: {
        k: 'regreso', t: 'Tu regreso en Kolors', rec: 'lun', ya: 'Ya pediste el día',
        p: 'Con el lunes libre, el tuyo es el del lunes 7. El otro queda por si ALTEN no te lo da. Sale uno al día, a las 23:30; horario y precio vistos en kolors.com.mx el 24 de noviembre.',
        L: [
          { id: 'lun', t: 'Lunes 7, 23:30', b: '$549', d: 'Llegas el martes 8 a las 6:30.', si: ['Ya pediste el lunes en ALTEN', 'Un día más: el lago de Chapala y Ajijic', 'El boleto cuesta $50 menos, y el martes llegas 2 horas antes de entrar (8:30)'], no: ['Una noche más de hotel, unos $905', 'El Cabañas y el MUSA cierran los lunes: van el sábado'] },
          { id: 'dom', t: 'Domingo 6, 23:30', b: '$599', d: 'Llegas el lunes 7 a las 6:30.', si: ['Sirve si ALTEN no te da el lunes', 'La Feria cierra el domingo a las 21:00: la ves completa', 'Te ahorras una noche de hotel'], no: ['Trabajas el lunes después de dormir en el camión'] }
        ]
      },
      chips: [{ t: 'Ida en avión', paso: 'ida' }, { t: 'Regreso en Kolors', paso: 'kolors' }, { t: 'Hospedaje', paso: 'hotel' }],
      pasos: [
        { id: 'ida', t: 'Tu vuelo de ida del viernes 4.', fijo: true },
        { id: 'alten', t: 'El lunes 7 libre en ALTEN: ya lo pediste.', fijo: true },
        { id: 'viernes', f: '2026-11-25', t: 'Pide también las horas del viernes 4, si tu vuelo sale en horario de trabajo.' },
        { id: 'kolors', f: '2026-11-26', t: s => 'Compra el Kolors del ' + (s === 'lun' ? 'lunes 7' : 'domingo 6') + ' a las 23:30, ya con el lunes confirmado por escrito: no se reembolsa.' },
        { id: 'hotel', f: '2026-11-27', t: 'Reserva hospedaje entre Expo Guadalajara y Plaza del Sol, con cancelación gratis: ahí están la Feria y el Kolors.' },
        { id: 'fil', f: '2026-11-28', t: 'Compra tu entrada a la Feria, una por día, en Boletomóvil: $40 cada una.' },
        { id: 'didi', f: '2026-11-30', t: () => 'Decide cómo repones el Didi de ese fin de semana: cada lunes el plan manda ' + money(didiSem()) + ' a GBM.' },
        { id: 'checkin', f: '2026-12-03', t: 'Haz tu check-in y guarda el pase de abordar en el celular.' },
        { id: 'mochila', f: '2026-12-03', t: 'Mochila lista, con tu INE original: Kolors no acepta copias ni fotos.' }
      ],
      gasto: [
        { id: 'vuelo', t: 'Vuelo de ida', est: 0, d: 'Escribe lo que pagaste' },
        { id: 'kolors', t: 'Kolors de regreso', est: s => s === 'lun' ? 549 : 599, d: 'kolors.com.mx' },
        { id: 'hotel', t: 'Hospedaje', est: s => (s === 'lun' ? 3 : 2) * 905, d: s => (s === 'lun' ? 3 : 2) + ' noches a $905, zona Expo' },
        { id: 'aero', t: 'Del aeropuerto a la ciudad', est: 150, d: 'Camión comunitario' },
        { id: 'fil', t: 'Feria del Libro', est: 120, d: '3 días a $40' },
        { id: 'museos', t: 'Museo Cabañas', est: 135, d: 'Con tu INE' },
        { id: 'mover', t: 'Tren ligero y camión', est: 88, d: '8 viajes a $11' },
        { id: 'chapala', t: 'Chapala y la maleta', est: s => s === 'lun' ? 264 : 0, d: s => s === 'lun' ? 'Camión ida y vuelta y guardar la maleta' : 'Solo si te quedas el lunes' },
        { id: 'comida', t: 'Comida', est: s => (s === 'lun' ? 4 : 3) * 350, d: s => (s === 'lun' ? 4 : 3) + ' días, con tope de $350' }
      ],
      tiles: v => [
        ['Ida', 'Avión', 'Viernes 4 · ya lo tienes'],
        ['Regreso', v.op === 'lun' ? 'Lun 23:30' : 'Dom 23:30', 'Kolors · 7 horas · llegas ' + (v.op === 'lun' ? 'el martes' : 'el lunes') + ' 6:30']
      ],
      acciones: v => [
        ['Ver el Kolors del ' + (v.op === 'lun' ? 'lunes 7' : 'domingo 6'), KOLORS(v.op === 'lun' ? '07/12/2026' : '06/12/2026')],
        ['Hoteles cerca de Expo', 'https://www.booking.com/searchresults.es-mx.html?ss=Expo+Guadalajara&checkin=2026-12-04&checkout=' + (v.op === 'lun' ? '2026-12-07' : '2026-12-06') + '&group_adults=1']
      ],
      dias: s => [
        { t: 'Viernes 4', foto: 'fotos-viajes/gdl-tlaquepaque.jpg', pie: 'Calle Independencia, Tlaquepaque', cred: 'Juan Carlos Fonseca Mata · CC BY-SA 4.0', L: [
          ['Al aterrizar', 'Camión comunitario por $150, cada hora: para en Av. Las Rosas y Mariano Otero, junto a Expo. El taxi fijo al centro cuesta $460.'],
          ['17:00', 'La Feria del Libro abre hasta las 23:00: es su venta nocturna. Italia es el país invitado.'],
          ['21:00', 'Concierto gratis en el Foro FIL con tu entrada del día. Llega antes: el cupo es limitado.'],
          ['23:00', 'Cierra la Feria y tu hotel queda a pie.']] },
        { t: 'Sábado 5', foto: 'fotos-viajes/gdl-cabanas.jpg', pie: '«El hombre en llamas», de Orozco, en la cúpula del Cabañas', cred: 'C. A. Caballero Vallejo · CC BY-SA 4.0', L: [
          ['10:00', 'Museo Cabañas (10 a 17 h): los murales de Orozco y la Colección Farnesina de Italia. $135 con tu INE.'],
          ['13:00', 'Come en el Mercado San Juan de Dios, a unos pasos del Cabañas.'],
          ['15:00', 'MUSA (10 a 18 h): «Caravaggio y su tiempo», que llegó con la Feria. Av. Juárez 975.'],
          ['18:30', 'De regreso a la Feria: cierra a las 21:00.']] },
        { t: 'Domingo 6', foto: 'fotos-viajes/gdl-zapopan.jpg', pie: 'Basílica de Zapopan', cred: 'Iqmann · CC BY 2.5', L: [
          ['9:00', 'Tlaquepaque: la calle Independencia, sus talleres de barro y de vidrio soplado.'],
          ['12:00', 'Línea 3 del tren ligero hasta Zapopan Centro ($11): la Basílica y su plaza.'],
          ['16:00', 'Último día de la Feria: cierra a las 21:00.']].concat(s === 'lun' ? [['21:30', 'Pregunta en el hotel si te guardan la maleta mañana y deja lista la mochila de Chapala.']] : [['22:45', 'En el punto de Kolors, con tu INE y tu número de reservación. Sale a las 23:30.']]) },
        s === 'lun'
          ? { t: 'Lunes 7', foto: 'fotos-viajes/gdl-ajijic.jpg', pie: 'Ajijic y el lago de Chapala al atardecer', cred: 'Simón Velázquez · CC BY-SA 4.0', L: [
            ['8:30', 'Deja la maleta encargada y toma el Chapala Plus en la Central Vieja: sale cada media hora, 1 h 30 de camino.'],
            ['10:30', 'Chapala: el malecón y el muelle. De ahí a Ajijic, a unos minutos: sus murales y su malecón. Los lunes cierran la parroquia y el centro cultural.'],
            ['17:00', 'De regreso a más tardar a las 18:00. Con lluvia o sin ganas, quédate en Los Colomos: gratis, de 7:00 a 19:30.'],
            ['22:45', 'En el punto de Kolors, con tu INE. Sale a las 23:30 y llegas el martes a las 6:30; a las 8:30 entras a ALTEN.']] }
          : { t: 'Lunes 7', foto: 'fotos-viajes/gdl-musa.jpg', pie: 'El MUSA, sede de «Caravaggio y su tiempo»', cred: 'Adrián Cerón · CC BY-SA 4.0', L: [
            ['6:30', 'Llegas a Encuentro Fortuna (Av. Fortuna 334, entre los metros Lindavista y Deportivo 18 de Marzo).'],
            ['7:00', 'O bajas en Reforma – Insurgentes (Dinamarca 9, Juárez). A las 8:00, en Oceanía, junto al metro Romero Rubio.'],
            ['8:30', 'Entras a ALTEN. Esa noche, a dormir temprano.']] }
      ],
      bloques: [
        { t: 'Tu Kolors, sin sorpresas', L: [
          ['Dónde sube', 'López Mateos y Tenochtitlán: calle Tenochtitlán 1, Paseos del Sol, Zapopan, a un costado de la gasolinera Valero de Plaza del Sol.', 'https://www.google.com/maps/search/?api=1&query=Tenochtitlan+1+Paseos+del+Sol+Zapopan'],
          ['Cuándo llegar', '15 minutos antes; 25 con maleta documentada. Si llegas tarde, pierdes el boleto.'],
          ['Qué te piden', 'INE o pasaporte original y vigente, y tu número de reservación.'],
          ['Equipaje', '35 kg gratis: 10 kg contigo (55 × 40 × 25 cm) y 25 kg abajo. El exceso cuesta $50 o $150.'],
          ['Cambios', 'Con 2 horas de anticipación y 10 % de cargo. No devuelven el dinero.'],
          ['Ayuda', 'WhatsApp 56 3506 6547. Avisan cambios de hora unas 2 horas antes: registra tu celular real.']] },
        { t: 'Cómo te mueves allá', L: [
          ['Dónde dormir', 'Entre Expo y Plaza del Sol: la Feria a pie y el Kolors a menos de 2 km.'],
          ['A la Feria', 'Expo Guadalajara, Av. Mariano Otero 1499. Hay camión gratis de la FIL desde el Parque Rojo y el Centro Cultural Universitario; el último de regreso, a las 21:00.', 'https://fil.com.mx/info/llegar.asp'],
          ['Tren ligero', '$11 por viaje, de 5:00 a 23:00. La Línea 3 une Tlaquepaque, el Centro y Zapopan.'],
          ['Del aeropuerto', 'La Ruta 05 va a Periférico Norte, de 5:00 a 21:10, cada 12 minutos. Por aplicación, las guías de 2026 hablan de $130 a $380.'],
          ['Los museos', 'Cabañas 8, en la Plaza Tapatía, y MUSA en Av. Juárez 975: los dos en el Centro. El domingo el MUSA cierra a las 15:00.'],
          ['A Chapala', 'Central Vieja: Dr. Michel y 5 de Febrero. De 7:00 a 21:50, cada 30 minutos; según la guía, de $75 a $115. El último de regreso sale entre 20:30 y 21:00.', 'https://chapalaplus.com/horarios/'],
          ['Tu maleta el lunes', 'Pide a tu hotel que la guarde después del check-out. Si no puede, la aplicación Qeepl la guarda desde $74 por bulto y día.']] },
        { t: 'Si algo falla', L: [
          ['Si ALTEN no te da el lunes', 'Elige arriba el domingo 6: el gasto, las noches y los días se recalculan solos.'],
          ['No hay Kolors', 'Primera Plus (36 salidas al día, desde $1,202) y ETN (23, desde $1,395), en 6 h 30 min desde la Central Nueva de Tlaquepaque.', 'https://www.reservamos.mx/autobuses-de/guadalajara-a-ciudad-de-mexico'],
          ['Tu vuelo se retrasa', 'El viernes la Feria cierra hasta las 23:00: si llegas de noche, entra el sábado a las 9:00.'],
          ['Se pierde tu maleta', 'Repórtalo a Kolors antes de 72 horas, con la etiqueta que te dan al documentarla.'],
          ['Frío de noche', 'Lleva chamarra: de día se llega a 25 °C y de madrugada baja a unos 11 °C.'],
          ['Ese sábado vence algo', 'caen']] }
      ],
      clima: ['25 °C', '11 °C', 'Casi sin lluvia'],
      fuentes: [['Kolors', 'https://www.kolors.com.mx/'], ['Términos de Kolors', 'https://www.kolors.com.mx/terminos-y-condiciones'], ['FIL: horarios y boletos', 'https://fil.com.mx/info/boletos.asp'], ['Entrada del viernes 4', 'https://boletomovil.com/evento/fil-2026-12-04'], ['Entrada del sábado 5', 'https://boletomovil.com/evento/fil-2026-12-05'], ['Entrada del domingo 6', 'https://boletomovil.com/evento/fil-2026-12-06'], ['Museo Cabañas', 'https://museocabanas.jalisco.gob.mx/'], ['MUSA', 'https://www.musaudg.mx/'], ['Tren ligero', 'https://www.siteur.gob.mx/'], ['Chapala y Ajijic', 'https://alexjumper.com/guia-completa-para-visitar-chapala/'], ['Camión a Ajijic', 'https://www.140mexico.com/jalisco/autobuses-guadalajara-ajijic/'], ['Los Colomos', 'https://bosqueloscolomos.org/'], ['Aeropuerto a la ciudad', 'https://www.nmas.com.mx/jalisco/estilo-de-vida/lugares/como-puedo-trasladarme-aeropuerto-internacional-guadalajara/']],
      visto: 'el 23 y 24 de noviembre de 2026'
    },
    {
      id: 'pr', ciudad: 'Puerto Rico', lugar: 'San Juan, Vieques, Culebra y el sur', ini: '', fin: '', sinFecha: 'Un viernes de febrero o marzo de 2027', color: '#2590b3',
      lat: 18.4655, lon: -66.1057, tz: 'America/Puerto_Rico', limite: '2027-02-05',
      foto: 'fotos-viajes/pr-culebra.jpg', cred: 'Breezy Baldwin · CC BY 2.0 · Wikimedia Commons',
      q: 'La isla completa, de viernes a lunes: fuertes, selva, Vieques, Culebra y la bahía que brilla.',
      elige: {
        k: 'fecha', t: 'Elige tus fechas', rec: 'm5', fechas: true,
        p: 'Viernes más 7 días da otro viernes; para volver en lunes son 10 noches. La bahía se ve mejor sin luna: nueva el 6 de febrero y el 8 de marzo. Del 19 al 28 de marzo, no: luna llena y Semana Santa.',
        L: [
          { id: 'm5', t: '5 al 15 de marzo', ini: '2027-03-05', fin: '2027-03-15', b: '10 noches', d: 'De 5 a 6 días de vacaciones.', si: ['El lunes 15 es feriado en México: no lo pides', 'Luna nueva el 8: la bahía en su mejor noche', 'Marzo es el mes más seco y todavía hay ballenas'], no: ['Temporada alta: precios más altos'] },
          { id: 'f26', t: '26 feb al 8 de marzo', ini: '2027-02-26', fin: '2027-03-08', b: '10 noches', d: 'De 6 a 7 días de vacaciones.', si: ['La luna ya sale de madrugada: noches oscuras', 'Regresas tres semanas antes de la fecha de Esslingen'], no: ['El lunes 8 no es feriado: un día más de vacaciones'] },
          { id: 'f5', t: '5 al 15 de febrero', ini: '2027-02-05', fin: '2027-02-15', b: '10 noches', d: 'De 6 a 7 días de vacaciones.', si: ['Luna nueva el 6', 'El mes con más ballenas en Rincón'], no: ['Cinco días después de entregar el depa', 'El vuelo se compra en diciembre, junto con Guadalajara'] },
          { id: 's7', t: '5 al 12 de marzo', ini: '2027-03-05', fin: '2027-03-12', b: '7 noches', d: 'Viernes a viernes: 7 días exactos.', si: ['Unos $8,700 menos que las 10 noches', 'Un solo domingo de Didi'], no: ['Regresas en viernes, no en lunes', 'Se quedan fuera Ponce, Cabo Rojo y Rincón'] }
        ]
      },
      chips: [{ t: 'Visa', paso: 'visa' }, { t: 'Vuelo', paso: 'vuelo' }, { t: 'Hospedaje', paso: 'hotel' }],
      pasos: [
        { id: 'visa', t: 'Tu visa de turista de Estados Unidos: ya la tienes.', fijo: true },
        { id: 'revisa', f: '2026-11-26', t: 'Revisa hasta cuándo valen tu visa y tu pasaporte: tienen que cubrir el viaje completo.' },
        { id: 'fecha', f: '2026-12-11', t: 'Elige la fecha en esta ventana, pregunta en ALTEN cuántos días de vacaciones tienes y pídelos por escrito.' },
        { id: 'vuelo', antes: 45, t: s => 'Compra el vuelo por Orlando, todo en una reservación y con cambio permitido: sales en viernes y regresas en ' + (s === 's7' ? 'viernes' : 'lunes') + '. Redondo, unos $5,664.' },
        { id: 'hotel', antes: 40, t: s => 'Reserva con cancelación gratis: San Juan, dos noches en Vieques' + (s === 's7' ? ' y Fajardo.' : ', Fajardo, el sur y Rincón.') },
        { id: 'auto', antes: 30, t: 'Renta el auto solo para los días que sales de San Juan. Retienen US$200 o más en tu tarjeta.' },
        { id: 'bahia', antes: 21, t: 'Reserva el kayak de la bahía Mosquito para tu noche más oscura, con un operador con licencia: de US$60 a US$67.' },
        { id: 'ferry', antes: 14, t: 'Compra los ferries en línea: Ceiba–Vieques, US$2, y Ceiba–Culebra, US$2.25 cada viaje. No se reembolsan.' },
        { id: 'cerrado', antes: 7, t: 'Vuelve a revisar lo que está cerrado y que el ferry salga en tus días.' },
        { id: 'checkin', antes: 2, t: 'Check-in, pase de abordar y los boletos guardados sin internet.' }
      ],
      gasto: [
        { id: 'vuelo', t: 'Vuelo redondo', est: 5664, d: 'Con una escala · Kayak, 20 nov: confírmalo con tus fechas' },
        { id: 'hotel', t: 'Hospedaje', est: (s, n) => nPr(n) < 6 ? nPr(n) * usd(68) : (nPr(n) - 2) * usd(68) + 2 * usd(89), d: (s, n) => nPr(n) < 6 ? nPr(n) + ' noches a US$68' : (nPr(n) - 2) + ' noches a US$68 y 2 en Vieques a US$89' },
        { id: 'auto', t: 'Auto y su seguro', est: (s, n) => autoPr(n) * (582 + usd(24)), d: (s, n) => autoPr(n) + ' días, desde $582 más US$24 de seguro' },
        { id: 'peaje', t: 'Peaje y gasolina', est: (s, n) => autoPr(n) * usd(10), d: 'Tu tope: US$10 por día de auto' },
        { id: 'bahia', t: 'Kayak en la bahía', est: () => usd(65), d: 'Unos US$65' },
        { id: 'fuertes', t: 'El Morro y San Cristóbal', est: () => usd(10), d: 'US$10 los dos, 24 horas; solo tarjeta' },
        { id: 'ferry', t: 'Ferries', est: (s, n) => usd(nPr(n) < 6 ? 4.5 : 8.5), d: (s, n) => nPr(n) < 6 ? 'Culebra, ida y vuelta' : 'Vieques y Culebra, ida y vuelta' },
        { id: 'culebra', t: 'Moverte en Culebra', est: () => usd(12), d: 'Entrada a Flamenco y transporte público' },
        { id: 'comida', t: 'Comida', est: (s, n) => (nPr(n) + 1) * usd(30), d: (s, n) => (nPr(n) + 1) + ' días, con tope de US$30' }
      ],
      tiles: v => [
        ['Cuándo', v.di ? noches(v) + ' noches' : 'Viernes a lunes', v.di ? 'Sales en ' + DIAS[v.di.getDay()] + ' y regresas en ' + DIAS[v.df.getDay()] : '10 noches; elige la fecha abajo'],
        ['El vuelo', '8 h 38 min', 'Con escala en Orlando; el directo promedia $13,417']
      ],
      acciones: () => [
        ['Vuelos a San Juan', 'https://www.kayak.com.mx/vuelos/Ciudad-de-Mexico-Benito-Juarez-Intl-MEX/San-Juan-Luis-Munoz-Marin-Intl-SJU'],
        ['Hospedaje en San Juan', 'https://www.booking.com/searchresults.es-mx.html?ss=San+Juan+Puerto+Rico&group_adults=1']
      ],
      dias: (s, n, di) => {
        const N = nPr(n), sj = { t: dPr(di, 1, 2) + ' · San Juan', foto: 'fotos-viajes/pr-morro.jpg', pie: 'El faro de El Morro', cred: 'Godot13 · CC BY-SA 4.0', L: [
          ['Llegada', 'Migración en Orlando. Duerme en Santurce o en el Viejo San Juan: todavía no hace falta auto.'],
          ['Mañana', 'El Morro y San Cristóbal: US$10 por los dos, válido 24 horas. No aceptan efectivo.'],
          ['Tarde', 'Calles de adoquín azul y el Paseo de la Princesa, a pie.']] };
        if (N < 6) return [sj,
          { t: dPr(di, 3) + ' · Selva y bahía', foto: 'fotos-viajes/pr-yunque.jpg', pie: 'Cascada en El Yunque', cred: 'Gordon Tarpley · CC BY 2.0', L: [
            ['8:00', 'El Yunque: gratis y sin reservar, de 8:00 a 17:00. Abren La Coca, la torre Yokahú y Baño de Oro.'],
            ['15:00', 'Maneja a Fajardo: en El Yunque no recogen las apps de transporte.'],
            ['Noche', 'Kayak en Laguna Grande: el agua brilla cuando la mueves.']] },
          { t: dPr(di, 4) + ' · Culebra', foto: 'fotos-viajes/pr-culebra.jpg', pie: 'Playa Flamenco, Culebra', cred: 'Breezy Baldwin · CC BY 2.0', L: [
            ['Temprano', 'Ferry de Ceiba a Culebra: US$2.25. Llega una hora antes; el abordaje cierra 10 minutos antes.'],
            ['Día', 'Playa Flamenco. El auto de renta no sube al ferry: allá te mueves en transporte público.'],
            ['Tarde', 'Regreso a San Juan y devuelve el auto.']] },
          { t: 'Último día', foto: 'fotos-viajes/pr-laguna.jpg', pie: 'Laguna Grande, Fajardo', cred: 'Bjoertvedt · CC BY-SA 4.0', L: [
            ['Mañana', 'Playa de Isla Verde, a minutos del aeropuerto.'],
            ['Vuelo', 'Puerto Rico va 2 horas adelante de CDMX.']] }];
        const base = [sj,
          { t: dPr(di, 3) + ' · El Yunque', foto: 'fotos-viajes/pr-yunque.jpg', pie: 'Cascada en El Yunque', cred: 'Gordon Tarpley · CC BY 2.0', L: [
            ['8:00', 'Recoge el auto. El Yunque es gratis y sin reservar, de 8:00 a 17:00: La Coca, la torre Yokahú y Baño de Oro.'],
            ['15:00', 'Playa de Luquillo, de camino a Fajardo.'],
            ['Noche', 'Duerme en Fajardo: el ferry de Ceiba sale temprano y queda cerca.']] },
          { t: dPr(di, 4, 5) + ' · Vieques', foto: 'fotos-viajes/pr-vieques.jpg', pie: 'Una playa de Vieques', cred: 'Maitra · CC BY-SA 4.0', L: [
            ['Ferry', 'El auto se queda en Ceiba: US$2 y una hora de camino. Llega una hora antes.'],
            ['Noche 1', 'Kayak en la bahía Mosquito, la más brillante del mundo según Guinness. No se nada.'],
            ['Día 2', 'Playas Sun Bay, Caracas y La Chiva. Duermes otra vez en Esperanza: la noche de repuesto.']] }];
        if (N < 10) return base.concat([
          { t: dPr(di, 6) + ' en adelante · Culebra y regreso', foto: 'fotos-viajes/pr-tanque.jpg', pie: 'El tanque pintado de Playa Flamenco', cred: 'Jami Dwyer · CC BY-SA 2.0', L: [
            ['Día 6', 'Ferry de regreso a Ceiba y tarde en Fajardo: playa Seven Seas.'],
            ['Día 7', 'Ferry a Culebra, US$2.25 y 1 h 30. Playa Flamenco: US$2 de entrada, en efectivo.'],
            ['Regreso', 'Devuelve el auto y vuela. Puerto Rico va 2 horas adelante de CDMX.']] }]);
        return base.concat([
          { t: dPr(di, 6) + ' · Fajardo', foto: 'fotos-viajes/pr-laguna.jpg', pie: 'Laguna Grande, Fajardo', cred: 'Bjoertvedt · CC BY-SA 4.0', L: [
            ['Mañana', 'Ferry de regreso a Ceiba.'],
            ['Tarde', 'Descanso y playa Seven Seas. Es el día que absorbe un retraso.'],
            ['Noche', 'Si la bahía de Vieques se canceló, aquí está la de repuesto: kayak en Laguna Grande.']] },
          { t: dPr(di, 7) + ' · Culebra', foto: 'fotos-viajes/pr-tanque.jpg', pie: 'El tanque pintado de Playa Flamenco', cred: 'Jami Dwyer · CC BY-SA 2.0', L: [
            ['Temprano', 'Ferry de Ceiba a Culebra: US$2.25 y 1 h 30. Calzado obligatorio y sin traje de baño.'],
            ['Día', 'Playa Flamenco: US$2 de entrada, en efectivo. Del muelle, en transporte público.'],
            ['Tarde', 'Regreso a Ceiba. Duerme en Fajardo y sal temprano al sur.']] },
          { t: dPr(di, 8) + ' · Ponce y La Parguera', foto: 'fotos-viajes/pr-ponce.jpg', pie: 'El Parque de Bombas, Ponce', cred: 'Ligocsicnarf89 · CC BY 4.0', L: [
            ['Mañana', 'Plaza Las Delicias y el Parque de Bombas. El Museo de Arte sigue cerrado.'],
            ['Mediodía', 'La Cruceta y el Castillo Serrallés, arriba de la ciudad.'],
            ['Noche', 'La Parguera: la única bahía donde se puede nadar. Cierra tres días con luna llena.']] },
          { t: dPr(di, 9) + ' · Cabo Rojo', foto: 'fotos-viajes/pr-faro.jpg', pie: 'El faro Los Morrillos, Cabo Rojo', cred: 'Jerjes Medina Albino · CC BY-SA 3.0', L: [
            ['Mañana', 'Faro Los Morrillos: gratis y por fuera. La reja está cerrada a los autos: son 2 km a pie, con agua.'],
            ['Tarde', 'La Playuela, abajo del acantilado. No dejes nada a la vista en el auto.'],
            ['Noche', 'Maneja a Rincón y duerme allá.']] },
          { t: dPr(di, 10, 11) + ' · Rincón y regreso', foto: 'fotos-viajes/pr-rincon.jpg', pie: 'El faro Punta Higüera, Rincón', cred: 'P. Hughes · CC BY 4.0', L: [
            ['Mañana', 'Faro Punta Higüera: de enero a marzo pasan ballenas jorobadas frente a la costa.'],
            ['Tarde', 'Cueva del Indio, en Arecibo, de camino a San Juan: 2 h 18 desde Rincón. Devuelve el auto.'],
            ['Último día', 'Playa de Isla Verde, a minutos del aeropuerto. Puerto Rico va 2 horas adelante de CDMX.']] }]);
      },
      bloques: [
        { t: 'Antes de decidir', L: [
          ['Tu dinero', 'dinero'],
          ['Tu domingo', 'didi'],
          ['Tu calendario', 'El 31 de marzo cierra la solicitud de Esslingen y ese día se mide tu GBM: el viaje no puede comerse ninguna de las dos.'],
          ['Cómo bajarlo', 'Cama en dormitorio (US$31) en lugar de cuarto: unos $5,200 menos. Cocinar la mitad de los días: unos $1,900. Las 7 noches exactas: unos $8,700.']] },
        { t: 'La bahía que brilla', L: [
          ['Mosquito, Vieques', 'La más brillante del mundo. En kayak y con operador con licencia, de US$60 a US$67; no se nada y hay que dormir en la isla.', 'https://www.puertorico.com/mosquito-bay'],
          ['La luna', 'Nueva el 6 de febrero y el 8 de marzo. Si tu noche tiene luna, pide la hora en que ya se metió.'],
          ['Laguna Grande, Fajardo', 'La de repuesto, también en kayak y sin ferry.'],
          ['La Parguera', 'La única donde se puede nadar. Cierra tres días con luna llena.']] },
        { t: 'Ferry, auto y carretera', L: [
          ['El ferry', 'Llega una hora antes: el abordaje cierra 10 minutos antes. Calzado obligatorio y sin reembolso. Las tarifas pueden cambiar después del 31 de diciembre.', 'https://puertoricoferry.com/rates/'],
          ['El auto', 'El de renta no sube al ferry: se queda en Ceiba.'],
          ['Los tramos', 'Desde San Juan: Ponce 1 h 45, Rincón 2 h 18 y Cabo Rojo 2 h 36.'],
          ['Cuidado', 'En el faro y en las playas solas hay robos a autos: no dejes nada a la vista.']] },
        { t: 'Para entrar y salir', L: [
          ['Qué llevas', 'Pasaporte y visa vigentes, y tu regreso comprado: Puerto Rico pide lo mismo que Estados Unidos. Si renovaste pasaporte, lleva también el de la visa.'],
          ['Migración', 'La pasas en Orlando, en la escala: recoges la maleta y la vuelves a documentar. Deja 3 horas entre vuelos.'],
          ['De regreso', 'En San Juan, antes de documentar, revisan que no lleves fruta ni plantas frescas.'],
          ['Tu tarjeta', 'Los fuertes no aceptan efectivo y la renta del auto retiene US$200 o más. Lleva unos dólares: Flamenco solo acepta efectivo.']] },
        { t: 'Lo que hoy está cerrado', L: [
          ['El Yunque', 'La Mina y Big Tree.'],
          ['Cuevas de Camuy', 'Cerradas. En su lugar, la Cueva del Indio, en Arecibo.'],
          ['Ponce', 'El Museo de Arte.'],
          ['Aguadilla', 'El muelle de Crash Boat está dañado; la playa, no.']] },
        { t: 'Si algo falla', L: [
          ['Se cancela el ferry', 'Por eso Vieques y Culebra van a la mitad y no al final. Con mar picado, cambia ese día por Ponce.'],
          ['Se cancela la bahía', 'La segunda noche en Vieques, o Laguna Grande desde Fajardo.'],
          ['Se retrasa Orlando', 'Con todo en una sola reservación, la aerolínea te acomoda en el siguiente vuelo.'],
          ['No te dan los días', 'Las 7 noches exactas, o cuatro días con «Otras fechas»: todo se recalcula.']] }
      ],
      clima: ['29 °C', '22 °C', 'Unos 5 días con lluvia en marzo'],
      fuentes: [['Vuelos, Kayak', 'https://www.kayak.com.mx/vuelos/Ciudad-de-Mexico-Benito-Juarez-Intl-MEX/San-Juan-Luis-Munoz-Marin-Intl-SJU'], ['Clima y temporadas', 'https://www.puertorico.com/best-times-to-visit'], ['Bahía y luna', 'https://www.puertorico.com/when-is-the-best-time-to-see-bioluminescence'], ['Vieques', 'https://www.puertorico.com/vieques'], ['El Yunque', 'https://www.puertorico.com/el-yunque-national-forest'], ['Fuertes de San Juan', 'https://www.nps.gov/saju/planyourvisit/fees.htm'], ['Ferry a Vieques', 'https://puertoricoferry.com/routes-schedules/ceiba-vieques/'], ['Ferry a Culebra', 'https://puertoricoferry.com/routes-schedules/ceiba-culebra/'], ['Playa Flamenco', 'https://www.puertorico.com/flamenco-beach'], ['Ponce', 'https://www.puertorico.com/ponce'], ['Faro de Cabo Rojo', 'https://www.puertorico.com/cabo-rojo-lighthouse'], ['Rincón', 'https://www.puertorico.com/rincon'], ['Rentar auto', 'https://www.puertorico.com/renting-a-car-in-puerto-rico']],
      visto: 'el 23 y 24 de noviembre de 2026'
    }
  ];

  // ── LO GUARDADO ──────────────────────────────────────────────────────────────────────────────────────────────────
  const S = () => { const s = rawGet(KEY, {}) || {}; ['hechos', 'pago', 'elige', 'fechas'].forEach(k => { if (!s[k] || typeof s[k] !== 'object') s[k] = {}; }); if (!Array.isArray(s.propios)) s.propios = []; return s; };
  const guarda = f => { const s = S(); f(s); rawSet(KEY, s); repinta(); };
  const D = k => { const p = String(k).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); };
  const K = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const val = (x, op, n) => typeof x === 'function' ? x(op, n) : x;
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'], MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  // Lo que el plan manda a GBM por semana de Didi en ese mes ('2027-03'): desde que maneja más, cuenta lo de más.
  const didiSem = ym => { if (!window.CIFRAS) return 0; const d = (CIFRAS.PROYECTO || {}).didiMasDesde; return Math.round((+CIFRAS.n(ym && d && ym >= d ? 'didiAhorroMas' : 'didiAhorro') || 0) * 12 / 52); };
  const noches = v => v && v.di && v.df ? Math.round((v.df - v.di) / 864e5) : 0;
  // Puerto Rico: sin fecha se calcula con 10 noches; los días de auto y el título de cada ficha salen de ahí.
  const nPr = n => n > 0 ? n : 10, autoPr = n => nPr(n) < 6 ? 2 : nPr(n) - 2;
  const dPr = (di, a, b) => { const f = k => { if (!di) return k; const d = new Date(di); d.setDate(d.getDate() + k - 1); return DIAS[d.getDay()].slice(0, 3) + ' ' + d.getDate(); }; const t = (di ? '' : b ? 'días ' : 'día ') + f(a) + (b ? ' y ' + f(b) : ''); return t.charAt(0).toUpperCase() + t.slice(1); };
  let nuevo = null;   // el viaje propio que se está editando

  // Un viaje que agregaste tú: lo que falta sale de la fecha, con la misma estructura que los demás.
  function propio(p) {
    return { id: p.id, mio: true, ciudad: p.ciudad, lugar: p.lugar || '', ini: p.ini, fin: p.fin, color: '#8d7be8', lat: p.lat, lon: p.lon, tz: p.tz || 'auto',
      foto: 'fotos-aprende/fase-avion.jpg', cred: '', q: p.nota || 'Un viaje tuyo: completa los boletos, el hospedaje y lo que cuesta.',
      chips: [{ t: 'Ida', paso: 'ida' }, { t: 'Regreso', paso: 'reg' }, { t: 'Hospedaje', paso: 'hotel' }],
      pasos: [{ id: 'dias', antes: 45, t: 'Pide los días en ALTEN por escrito.' }, { id: 'ida', antes: 40, t: 'Compra la ida' + (p.ida ? ': ' + p.ida : '') + '.' }, { id: 'reg', antes: 40, t: 'Compra el regreso' + (p.reg ? ': ' + p.reg : '') + '.' },
        { id: 'hotel', antes: 30, t: 'Reserva hospedaje con cancelación gratis.' }, { id: 'caen', antes: 7, t: 'Adelanta lo que cae en esos días y el Didi de ese fin de semana.' }, { id: 'check', antes: 2, t: 'Check-in, mochila e identificación original.' }],
      gasto: [{ id: 'ida', t: 'Ida', est: 0, d: p.ida || 'Escribe lo que cuesta' }, { id: 'reg', t: 'Regreso', est: 0, d: p.reg || 'Escribe lo que cuesta' }, { id: 'hotel', t: 'Hospedaje', est: 0, d: 'Escribe lo que cuesta' }, { id: 'comida', t: 'Comida', est: 0, d: 'Tu tope del viaje' }, { id: 'mover', t: 'Transporte allá', est: 0, d: '' }, { id: 'paseos', t: 'Entradas y paseos', est: 0, d: '' }],
      tiles: () => [['Ida', p.ida || 'Por definir', 'Salida ' + corta(D(p.ini))], ['Regreso', p.reg || 'Por definir', 'Vuelves ' + corta(D(p.fin))]], acciones: () => [], dias: () => [], bloques: [], clima: null, fuentes: [] };
  }
  const corta = d => DIAS[d.getDay()].slice(0, 3) + ' ' + d.getDate() + ' ' + MESES[d.getMonth()].slice(0, 3);

  // El viaje ya resuelto: sus fechas, lo que falta con su estado, lo que cuesta y lo siguiente.
  function viaje(id) {
    const s = S(), p = s.propios.find(x => x.id === id), b = BASE.find(x => x.id === id) || (p && propio(p)); if (!b) return null;
    const mia = b.elige && (s.elige[id] === 'otra' || b.elige.L.some(x => x.id === s.elige[id])) ? s.elige[id] : '', elegido = !!mia;   // una opción que ya no existe no cuenta
    const op = mia || (b.elige && b.elige.rec) || '';
    let ini = b.ini, fin = b.fin;
    if (b.elige && b.elige.fechas) {
      const f = mia === 'otra' ? s.fechas[id] : (b.elige.L.find(x => x.id === mia) || null);
      if (f && f.ini && f.fin) { ini = f.ini; fin = f.fin; }
    }
    const hoy = mpHoy(), di = ini ? D(ini) : null, df = fin ? D(fin) : di, H = s.hechos[id] || {}, P = s.pago[id] || {}, nn = noches({ di: di, df: df });
    const pasos = b.pasos.map(x => {
      let f = null;
      if (x.f) f = D(x.f);
      else if (x.antes && di) { f = new Date(di); f.setDate(f.getDate() - x.antes); if (f.getDay() === 0) f.setDate(f.getDate() - 1); if (f < hoy && di > hoy) f = new Date(hoy); }   // nada en domingo: es de Didi
      const fx = f ? { d: f, mes: false } : null, fa = mpFalta(fx), hecho = x.fijo ? H[x.id] !== false : !!H[x.id];
      return { id: x.id, t: val(x.t, op), f: f, fTxt: fx ? mpFechaTxt(fx) : (x.fijo ? 'listo' : x.antes ? semanas(x.antes) + ' antes' : ''), cuando: fa.txt, est: hecho ? 'hecho' : fa.est, hecho: hecho };
    });
    const gasto = b.gasto.map(g => { const est = Math.round(+val(g.est, op, nn) || 0), pago = P[g.id]; return { id: g.id, t: g.t, d: val(g.d, op, nn), est: est, pago: pago, usa: pago != null && pago !== '' ? +pago : est }; });
    const hechos = pasos.filter(x => x.hecho).length, orden = pasos.filter(x => !x.hecho).sort((x, y) => (x.f ? +x.f : 9e15) - (y.f ? +y.f : 9e15));
    const dias = di ? Math.round((di - hoy) / 864e5) : null;
    return Object.assign({}, b, { op: op, elegido: elegido, ini: ini, fin: fin, di: di, df: df, dias: dias, pasos: pasos, gasto: gasto, total: gasto.reduce((t, g) => t + g.usa, 0),
      pagado: gasto.reduce((t, g) => t + (g.pago != null && g.pago !== '' ? +g.pago : 0), 0), hechos: hechos, n: pasos.length, sig: orden[0] || null,
      paso: !!(df && df < hoy), cuentaTxt: cuenta(di, df, hoy), fechas: fechasTxt(b, di, df), src: b });
  }
  function semanas(n) { return n >= 14 ? Math.round(n / 7) + ' semanas' : n + ' días'; }
  function cuenta(di, df, hoy) {
    if (!di) return 'sin fecha';
    if (df < hoy) return 'hecho';
    const n = Math.round((di - hoy) / 864e5);
    return n <= 0 ? 'en curso' : n === 1 ? 'mañana' : n <= 60 ? 'en ' + n + ' días' : 'en ' + Math.round(n / 30.4) + ' meses';
  }
  function fechasTxt(b, di, df) {
    if (!di) return b.sinFecha || 'Sin fecha';
    const mismo = di.getMonth() === df.getMonth();
    return DIAS[di.getDay()].slice(0, 3) + ' ' + di.getDate() + (mismo ? '' : ' ' + MESES[di.getMonth()].slice(0, 3)) + ' – ' + DIAS[df.getDay()].slice(0, 3) + ' ' + df.getDate() + ' ' + MESES[df.getMonth()].slice(0, 3) + (di.getFullYear() !== new Date().getFullYear() ? ' ' + di.getFullYear() : '');
  }
  function todos() {
    const s = S();
    return BASE.map(b => b.id).concat(s.propios.map(p => p.id)).map(viaje).filter(Boolean)
      .sort((x, y) => (x.di ? +x.di : +D(x.limite || '2099-12-31')) - (y.di ? +y.di : +D(y.limite || '2099-12-31')));
  }
  // Lo que tus metas tienen con fecha en esos días: para adelantarlo.
  function caen(v) {
    if (!v.di || typeof META_PLAN === 'undefined') return [];
    const out = [];
    Object.keys(META_PLAN).forEach(id => { const mp = metaPlan(id); if (!mp || mp.pausa) return; mp.pasos.forEach(p => { if (p.f && !p.f.mes && !p.hecho && p.f.d >= v.di && p.f.d <= v.df) out.push({ f: p.fTxt, t: p.t }); }); });
    return out;
  }

  // ── LA SECCIÓN DE MIS METAS ──────────────────────────────────────────────────────────────────────────────────────
  function chipsHtml(v) {
    return (v.chips || []).map(c => { const p = v.pasos.find(x => x.id === c.paso), ok = p && p.hecho; return '<span class="vj-chip' + (ok ? ' ok' : '') + '">' + (ok ? '✓ ' : '') + esc(c.t) + '</span>'; }).join('');
  }
  function seccion() {
    const T = todos(), vienen = T.filter(v => !v.paso), ya = T.filter(v => v.paso);
    const card = v => {
      const u = v.sig ? (v.sig.est === 'tarde' ? ' tarde' : v.sig.est === 'hoy' || v.sig.est === 'pronto' ? ' pronto' : '') : '';
      return '<button type="button" class="vj-card" style="--vc:' + v.color + '" onclick="abrirKpi(\'viaje-' + v.id + '\')" title="Ver todo el viaje a ' + esc(v.ciudad) + '">' +
        '<span class="vj-ph" style="background-image:url(\'' + v.foto + '\')"><span class="vj-cuenta">' + v.cuentaTxt + '</span></span>' +
        '<span class="vj-x"><span class="vj-t">' + esc(v.ciudad) + '<small>' + esc(v.fechas) + '</small></span>' +
        '<span class="vj-q">' + esc(v.q) + '</span><span class="vj-chips">' + chipsHtml(v) + '</span>' +
        '<span class="vj-sig' + u + '"><b>' + (v.sig ? 'Sigue · ' + esc(v.sig.fTxt) : 'Todo listo') + '</b>' + (v.sig ? esc(v.sig.t) : 'Solo falta irte.') + '</span>' +
        '<span class="vj-pie"><i><u style="width:' + (v.n ? v.hechos / v.n * 100 : 0) + '%"></u></i><em>' + v.hechos + ' de ' + v.n + ' listos</em>' + (v.total ? '<em>' + money(v.total) + '</em>' : '') + '</span></span></button>';
    };
    return '<div class="mg-col-hd"><span class="mg-col-t">✈️ Próximos viajes</span><button type="button" class="vj-mas" onclick="abrirKpi(\'viaje-nuevo\')">+ Agregar viaje</button></div>' +
      '<div class="vj-deck' + (vienen.length > 2 ? ' varios' : '') + '">' + (vienen.length ? vienen.map(card).join('') : '<div class="vj-vacio">Sin viajes por delante. Agrega el siguiente.</div>') + '</div>' +
      (ya.length ? '<div class="vj-ya">' + ya.map(v => '<button type="button" onclick="abrirKpi(\'viaje-' + v.id + '\')">✓ ' + esc(v.ciudad) + ' · ' + esc(v.fechas) + '</button>').join('') + '</div>' : '');
  }
  // Los viajes con fecha, para la línea del tiempo de las metas.
  function enLinea() {
    return todos().filter(v => v.di && !v.paso).map(v => ({ id: 'viaje-' + v.id, c: v.ciudad, t: 'Viaje a ' + v.ciudad, ico: '✈️', img: '', epi: '', viaje: true, est: 'on', p: { hechos: v.hechos, total: v.n },
      mp: { fecha: { d: v.di, mes: false }, fechaTxt: v.fechas, falta: { txt: v.cuentaTxt }, pausa: false, sig: null } }));
  }

  // ── LA VENTANA ───────────────────────────────────────────────────────────────────────────────────────────────────
  const caja = (cls, t, p, html) => '<section class="kv-c ' + cls + '"><h3>' + t + '</h3>' + (p ? '<p>' + p + '</p>' : '') + html + '</section>';
  const tile = x => '<div class="kv-tile"><span>' + x[0] + '</span><b>' + x[1] + '</b><i>' + x[2] + '</i></div>';
  const pasoHtml = (v, p) => '<button type="button" class="vj-paso ' + (p.est === 'hoy' ? 'pronto' : p.est) + '" aria-pressed="' + p.hecho + '" onclick="VIAJES.palomea(\'' + v.id + '\',\'' + p.id + '\')"><span class="vj-chk">' + (p.hecho ? '✓' : '') + '</span><span class="vj-pt">' + esc(p.t) + '</span><span class="vj-pf">' + esc(p.hecho ? 'hecho' : p.fTxt) + (p.hecho || !p.f ? '' : '<small>' + esc(p.cuando) + '</small>') + '</span></button>';
  function eligeHtml(v) {
    const E = v.elige, s = S().elige[v.id], f = S().fechas[v.id] || {};
    return '<div class="vj-ops' + (E.L.length === 3 ? ' tres' : E.L.length > 3 ? ' cuatro' : '') + '">' + E.L.map(o => { const on = v.elegido ? s === o.id : !!E.ya && o.id === E.rec;   // lo que ya quedó decidido sale elegido sin tocarlo
      return '<button type="button" class="vj-op' + (on ? ' on' : '') + '" aria-pressed="' + on + '" onclick="VIAJES.elegir(\'' + v.id + '\',\'' + o.id + '\')">' +
      '<span class="vj-op-h"><b>' + esc(o.t) + '</b><em>' + esc(o.b) + '</em></span><span class="vj-op-d">' + esc(o.d) + (o.id === E.rec ? '<u>' + (E.ya || 'Te conviene') + '</u>' : '') + '</span>' +
      o.si.map(x => '<span class="si">' + esc(x) + '</span>').join('') + o.no.map(x => '<span class="no">' + esc(x) + '</span>').join('') +
      '<span class="vj-op-b">' + (on ? '✓ Elegido' : 'Elegir') + '</span></button>'; }).join('') + '</div>' +
      (E.fechas ? '<div class="vj-otra"><label>Otras fechas</label><input type="date" id="vjo-i" value="' + (s === 'otra' ? f.ini || '' : '') + '"><input type="date" id="vjo-f" value="' + (s === 'otra' ? f.fin || '' : '') + '"><button type="button" class="kv-b sec" onclick="VIAJES.otra(\'' + v.id + '\')">Usar estas</button></div>' : '');
  }
  function gastoHtml(v) {
    const edita = !privado;
    return '<div class="vj-g">' + v.gasto.map(g => '<div class="vj-gf' + (g.pago != null && g.pago !== '' ? ' pag' : '') + '"><span>' + esc(g.t) + '<small>' + esc(g.d || '') + '</small></span><b>' + (g.est ? money(g.est) : '—') + '</b>' +
        (edita ? '<input type="number" inputmode="numeric" min="0" step="1" placeholder="' + (v.mio ? 'monto' : 'pagué') + '" aria-label="' + (v.mio ? 'Lo que cuesta ' : 'Lo que pagaste por ') + esc(g.t) + '" value="' + (g.pago != null ? g.pago : '') + '" onchange="VIAJES.pago(\'' + v.id + '\',\'' + g.id + '\',this.value)">' : '<em>••</em>') + '</div>').join('') +
      '<div class="vj-gf tot"><span>Total<small>' + (v.mio ? 'la suma de lo que escribiste' : 'lo pagado cuenta en lugar de lo estimado') + '</small></span><b>' + money(v.total) + '</b><em>' + (v.mio ? '' : v.pagado ? money(v.pagado) + ' pagados' : 'nada pagado') + '</em></div></div>' +
      dineroTxt(v);
  }
  function dineroTxt(v) {
    if (!window.CIFRAS || !v.total) return '';
    const gp = +CIFRAS.n('gastoPersonalDepa') || 0, out = [];
    if (gp) out.push('Sale de tu gasto personal (' + money(gp) + ' al mes): es el <b>' + Math.round(v.total / gp * 100) + ' %</b> de un mes. Nunca del ahorro a GBM ni de meses sin intereses.');
    return out.map(x => '<p class="kv-p vj-nota">' + x + '</p>').join('');
  }
  // Lo que el viaje le cuesta a la salida a Alemania, con las cifras del plan.
  function salidaTxt(v) {
    const c = window.CIFRAS && CIFRAS.PROYECCION && CIFRAS.PROYECCION.cortes && CIFRAS.PROYECCION.cortes.salida;
    if (!c || !(c.falta > 0)) return 'Cuesta unos ' + money(v.total) + '.';
    return 'Cuesta unos ' + money(v.total) + '. Para irte en septiembre te faltan ' + money(Math.round(c.falta)) + ' con tu ritmo de hoy: este viaje es el ' + Math.round(v.total / c.falta * 100) + ' % de eso.';
  }
  // Los domingos de Didi que cruza el viaje y lo que dejan de mandar a GBM.
  function didiTxt(v) {
    const ym = v.di ? K(v.di).slice(0, 7) : '2027-03', s = didiSem(ym);
    if (!v.di) return 'Un viaje de viernes a lunes de la otra semana cruza dos domingos: ' + money(2 * s) + ' que el plan manda a GBM. Repónlos con horas de otros días o acepta el hueco.';
    let k = 0; for (let d = new Date(v.di); d <= v.df; d.setDate(d.getDate() + 1)) if (d.getDay() === 0) k++;
    return k ? 'Cruza ' + (k === 1 ? 'un domingo' : k + ' domingos') + ' de Didi: ' + money(k * s) + ' que el plan manda a GBM. Repónlos con horas de otros días o acepta el hueco.' : 'No cruza ningún domingo de Didi.';
  }
  function bloqueHtml(v, b) {
    return '<div class="vj-b">' + b.L.map(x => {
      let t = x[1], u = x[2];
      if (t === 'caen') { const c = caen(v); if (!c.length) return ''; t = c.map(y => y.t.replace(/\.$/, '') + ' (' + y.f + ')').join('; ') + '. Adelántalo antes de irte.'; return '<div><b>Tus metas esos días</b><span>' + esc(t) + '</span></div>'; }
      if (t === 'dinero') t = salidaTxt(v);
      if (t === 'didi') t = didiTxt(v);
      const a = u === 'spacex' ? ' <a href="#" onclick="VIAJES.spacex();return false">Ver los próximos ↗</a>' : u ? ' <a href="' + u + '" target="_blank" rel="noopener">' + (/maps/.test(u) ? 'Mapa' : 'Abrir') + ' ↗</a>' : '';
      return '<div><b>' + esc(x[0]) + '</b><span>' + esc(t) + a + '</span></div>';
    }).join('') + '</div>';
  }
  function privHtml(v) {
    const p = (rawGet(KEY_PRIV, {}) || {})[v.id] || {}, c = [['vuelo', 'Vuelo y aerolínea', 'Ej. Volaris Y4 123'], ['sale', 'Sale', 'Ej. vie 4, 13:20, AICM T1'], ['llega', 'Llega', 'Ej. 14:40'], ['hotel', 'Hotel y dirección', ''], ['nota', 'Lo que no quieres olvidar', '']];
    return '<div class="vj-priv">' + c.map(x => '<label' + (x[0] === 'hotel' ? ' class="dos"' : '') + '>' + x[1] + '<input type="text" maxlength="160" placeholder="' + x[2] + '" value="' + esc(p[x[0]] || '') + '" onchange="VIAJES.privado(\'' + v.id + '\',\'' + x[0] + '\',this.value)"></label>').join('') + '</div>' +
      '<p class="kv-p vj-nota">Se guarda solo en este navegador: no viaja a GitHub ni al iPad.</p>';
  }
  function climaTile(v) {
    const c = (rawGet(KEY_CLIMA, {}) || {})[v.id], L = c && c.ini === v.ini && c.fin === v.fin ? c.L : null;
    if (L && L.length) {
      const mx = Math.max.apply(null, L.map(x => x.x)), mn = Math.min.apply(null, L.map(x => x.n)), pp = Math.max.apply(null, L.map(x => x.p || 0));
      return ['El clima', Math.round(mn) + '–' + Math.round(mx) + ' °C', 'Pronóstico para tus días · lluvia ' + pp + ' % como mucho'];
    }
    return v.clima ? ['El clima', v.clima[1].replace(' °C', '') + '–' + v.clima[0], v.clima[2]] : ['El clima', '—', 'El pronóstico sale 16 días antes'];
  }
  function formHtml(p) {
    p = p || {};
    return '<div class="kv-fila"><section class="kv-c s7"><h3>' + (p.id ? 'Edita el viaje' : 'Tu siguiente viaje') + '</h3><p>Con el destino y las fechas se arma la lista de lo que falta, la cuenta de días, el gasto y el pronóstico del clima.</p>' +
      '<form class="vj-form" onsubmit="VIAJES.guardaNuevo(event)"><label class="ancho">Destino<input name="ciudad" required maxlength="40" value="' + esc(p.ciudad || '') + '" placeholder="Ej. Oaxaca"></label><label class="ancho">Estado o país<input name="lugar" maxlength="50" value="' + esc(p.lugar || '') + '"></label>' +
      '<label>Sales<input type="date" name="ini" required value="' + (p.ini || '') + '"></label><label>Vuelves<input type="date" name="fin" required value="' + (p.fin || '') + '"></label>' +
      '<label>Cómo vas<input name="ida" maxlength="40" value="' + esc(p.ida || '') + '" placeholder="Ej. avión"></label><label>Cómo regresas<input name="reg" maxlength="40" value="' + esc(p.reg || '') + '" placeholder="Ej. autobús"></label>' +
      '<label class="ancho">Para qué vas<input name="nota" maxlength="140" value="' + esc(p.nota || '') + '"></label><div class="vj-form-b"><button type="submit" class="kv-b">' + (p.id ? 'Guardar cambios' : 'Agregar viaje') + '</button><span id="vjErr" role="alert"></span></div></form></section>' +
      '<section class="kv-c s5"><h3>Antes de agregarlo</h3><div class="vj-b"><div><b>El dinero</b><span>Sale de tu gasto personal' + (window.CIFRAS ? ' (' + money(+CIFRAS.n('gastoPersonalDepa') || 0) + ' al mes)' : '') + ', no del ahorro ni de meses sin intereses.</span></div>' +
      '<div><b>El domingo</b><span>Es de Didi: cada fin de semana fuera son ' + money(didiSem()) + ' que no llegan a GBM.</span></div><div><b>La Fase 2</b><span>De abril a agosto de 2027 no lleva viajes fuera de la lista de salida.</span></div><div><b>Las fechas</b><span>Este proyecto es público en GitHub: quien lo abra puede ver cuándo estás fuera. Lo del vuelo y del hotel no se sube.</span></div></div></section></div>';
  }
  function ventana(id) {
    if (id === 'nuevo' || id.indexOf('editar-') === 0) { const p = id === 'nuevo' ? null : S().propios.find(x => 'editar-' + x.id === id); nuevo = p ? p.id : null; return { titulo: p ? 'Editar ' + p.ciudad : 'Agregar viaje', sub: 'Próximos viajes', kv: '#8d7be8', html: formHtml(p) }; }
    const v = viaje(id); if (!v) return null;
    const T = v.tiles(v).concat([climaTile(v), ['Cuesta', money(v.total), v.mio ? 'Lo que has anotado abajo' : v.pagado ? money(v.pagado) + ' ya pagados' : 'Estimado; corrígelo con lo que pagues']]);
    const hero = '<section class="kv-c kv-hero s4 vj-hero" style="background-image:linear-gradient(90deg,rgba(8,10,16,.88),rgba(8,10,16,.42)),url(\'' + v.foto + '\')"><div class="n">' +
      (v.paso ? 'Hecho' : v.dias == null ? 'Sin fecha' : v.dias <= 0 ? 'Ya' : v.dias) + '<small>' + (v.paso || v.dias == null || v.dias <= 0 ? '' : v.dias === 1 ? 'día para salir' : 'días para salir') + '</small></div><div class="q">' + esc(v.q) + '</div></section>';
    const u = v.sig && v.sig.est === 'tarde';
    const hoy = v.paso ? '' : '<div class="kv-hoy' + (u ? ' alto' : '') + '"><span class="et">' + (v.sig ? 'Lo siguiente' : 'Todo listo') + '</span><div class="tx">' + (v.sig ? esc(v.sig.t) : 'Ya está todo: solo falta irte.') + (v.sig ? '<small>' + esc(v.sig.fTxt) + (v.sig.f ? ' · ' + esc(v.sig.cuando) : '') + '</small>' : '') + '</div><div class="ac">' +
      v.acciones(v).map((a, i) => '<a class="kv-b' + (i ? ' sec' : '') + '" href="' + a[1] + '" target="_blank" rel="noopener">' + esc(a[0]) + ' ↗</a>').join('') +
      (v.mio ? '<button type="button" class="kv-b sec" onclick="abrirKpi(\'viaje-editar-' + v.id + '\')">Editar</button><button type="button" class="kv-b sec" onclick="VIAJES.borra(\'' + v.id + '\')">Borrar</button>' : '') + '</div></div>';
    const dias = v.src.dias(v.op, noches(v), v.di);
    const html = '<div class="kv-fila">' + hero + '<div class="kv-tiles s8">' + T.map(tile).join('') + '</div></div>' + hoy +
      (v.elige ? caja('s12', v.elige.t, v.elige.p, eligeHtml(v)) : '') +
      '<div class="kv-fila"><section class="kv-c s7"><h3>Lo que falta</h3><p>' + v.hechos + ' de ' + v.n + ' listos. Toca cada renglón cuando lo hagas.</p><div class="vj-pasos">' + v.pasos.map(p => pasoHtml(v, p)).join('') + '</div></section>' +
      '<section class="kv-c s5"><h3>Cuánto cuesta</h3><p>' + (v.mio ? 'Escribe lo que cuesta cada cosa: el total se suma solo.' : 'Lo estimado; a la derecha, lo que de verdad pagaste.') + '</p>' + gastoHtml(v) + '</section></div>' +
      (dias.length ? '<div class="kv-fila vj-dias">' + dias.map(d => '<section class="kv-c s3 vj-dia"><figure><img src="' + d.foto + '" alt="' + esc(d.pie) + '" loading="lazy" onerror="this.closest(\'figure\').remove()"><figcaption>' + esc(d.pie) + '<small>Foto: ' + esc(d.cred) + '</small></figcaption></figure><h3>' + esc(d.t) + '</h3>' + d.L.map(x => '<div class="vj-h"><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></div>').join('') + '</section>').join('') + '</div>' : '') +
      (v.bloques.length ? '<div class="kv-fila">' + v.bloques.map(b => caja('s4', b.t, '', bloqueHtml(v, b))).join('') + '</div>' : '') +
      '<div class="kv-fila">' + caja(v.fuentes.length ? 's6' : 's12', 'Tu vuelo y tu hotel', '', privHtml(v)) +
      (v.fuentes.length ? caja('s6', 'De dónde sale cada dato', 'Precios y horarios vistos ' + v.visto + ': confírmalos al comprar. Foto de arriba: ' + esc(v.cred) + '.', '<div class="vj-fu">' + v.fuentes.map(f => '<a href="' + f[1] + '" target="_blank" rel="noopener">' + esc(f[0]) + ' ↗</a>').join('') + '</div>') : '') + '</div>';
    return { titulo: v.ciudad, sub: (v.lugar ? v.lugar + ' · ' : '') + v.fechas, kv: v.color, html: html, listo: () => pedirClima(v) };
  }

  // ── LO QUE SE TOCA ───────────────────────────────────────────────────────────────────────────────────────────────
  function repinta() {
    if (typeof renderMetasSlide === 'function') renderMetasSlide();
    const ov = document.getElementById('kpiOverlay'), k = ov && ov.classList.contains('open') ? String(ov.dataset.kpi || '') : '';
    if (k.indexOf('viaje-') === 0 && k !== 'viaje-nuevo' && k.indexOf('viaje-editar-') !== 0) { const b = document.getElementById('kpiBody'), y = b.scrollTop; abrirKpi(k); b.scrollTop = y; }
  }
  function pedirClima(v) {
    if (!v.di || v.paso || v.lat == null) return;
    const hoy = mpHoy(), lejos = Math.round((v.df - hoy) / 864e5);
    if (lejos > 15 || v.di < hoy && v.df < hoy) return;
    const T = rawGet(KEY_CLIMA, {}) || {}, c = T[v.id];
    if (c && c.ini === v.ini && c.fin === v.fin && Date.now() - c.t < 3 * 36e5) return;
    const a = K(v.di < hoy ? hoy : v.di);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + v.lat + '&longitude=' + v.lon + '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=' + encodeURIComponent(v.tz || 'auto') + '&start_date=' + a + '&end_date=' + v.fin)
      .then(r => r.json()).then(j => {
        if (!j.daily || !j.daily.time) return;
        const X = rawGet(KEY_CLIMA, {}) || {};
        X[v.id] = { t: Date.now(), ini: v.ini, fin: v.fin, L: j.daily.time.map((d, i) => ({ d: d, x: j.daily.temperature_2m_max[i], n: j.daily.temperature_2m_min[i], p: j.daily.precipitation_probability_max[i] })) };
        rawSet(KEY_CLIMA, X); repinta();
      }).catch(() => {});
  }
  window.VIAJES = {
    BASE: BASE, todos: todos, viaje: viaje, seccion: seccion, enLinea: enLinea, ventana: ventana,
    palomea: (id, p) => guarda(s => { const h = s.hechos[id] = s.hechos[id] || {}, v = viaje(id), x = v && v.pasos.find(q => q.id === p), b = v && v.src.pasos.find(q => q.id === p); if (!x) return; if (x.hecho) { if (b.fijo) h[p] = false; else delete h[p]; } else { if (b.fijo) delete h[p]; else h[p] = true; } }),
    elegir: (id, o) => guarda(s => { if (s.elige[id] === o) delete s.elige[id]; else s.elige[id] = o; }),
    otra: id => { const i = document.getElementById('vjo-i').value, f = document.getElementById('vjo-f').value; if (!i || !f || f < i) return; guarda(s => { s.fechas[id] = { ini: i, fin: f }; s.elige[id] = 'otra'; }); },
    pago: (id, g, x) => guarda(s => { const p = s.pago[id] = s.pago[id] || {}, n = Math.round(+x); if (x === '' || !isFinite(n) || n < 0) delete p[g]; else p[g] = n; }),
    privado: (id, k, x) => { const P = rawGet(KEY_PRIV, {}) || {}; P[id] = P[id] || {}; if (String(x).trim()) P[id][k] = String(x).trim(); else delete P[id][k]; rawSet(KEY_PRIV, P); },
    spacex: () => { cerrarKpi(); const m = METAS_TODAS.find(x => x.id === 'spacex'); if (m) abrirMetaDetalle('spacex', m.img, m.epi); },
    guardaNuevo: e => {
      e.preventDefault();
      const f = e.target, g = n => f.elements[n].value.trim(), o = { ciudad: g('ciudad'), lugar: g('lugar'), ini: g('ini'), fin: g('fin'), ida: g('ida'), reg: g('reg'), nota: g('nota') }, er = document.getElementById('vjErr');
      if (!o.ciudad || !o.ini || !o.fin) { er.textContent = 'Faltan el destino o las fechas.'; return; }
      if (o.fin < o.ini) { er.textContent = 'El regreso no puede ser antes de la salida.'; return; }
      const id = nuevo || 'v' + Date.now().toString(36);
      guarda(s => { const i = s.propios.findIndex(x => x.id === id), a = i >= 0 ? s.propios[i] : {}; const n = Object.assign({}, a, o, { id: id }); if (a.ciudad !== o.ciudad || a.lugar !== o.lugar) { delete n.lat; delete n.lon; } if (i >= 0) s.propios[i] = n; else s.propios.push(n); });
      nuevo = null; abrirKpi('viaje-' + id);
      fetch('https://geocoding-api.open-meteo.com/v1/search?count=1&language=es&name=' + encodeURIComponent(o.ciudad)).then(r => r.json()).then(j => { const x = j.results && j.results[0]; if (x) { guarda(s => { const q = s.propios.find(y => y.id === id); if (q) { q.lat = x.latitude; q.lon = x.longitude; q.tz = x.timezone; } }); const v = viaje(id); if (v) pedirClima(v); } }).catch(() => {});
    },
    borra: id => { if (!confirm('¿Borrar este viaje y lo que anotaste en él?')) return; cerrarKpi(); guarda(s => { s.propios = s.propios.filter(x => x.id !== id); ['hechos', 'pago', 'elige', 'fechas'].forEach(k => { delete s[k][id]; }); }); }
  };
})();
