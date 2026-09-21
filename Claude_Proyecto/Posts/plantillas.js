/* ══════════════════════════════════════════════════════════════════════════
   POSTS — las plantillas de publicación de Aeroresinas y Heliescala.

   Aquí no hay cifras, nombres ni pies de foto escritos a mano: cada plantilla se
   ARMA con lo que ya dicen las dos webs (Aeroresinas/datos.js y Heliescala/datos.js).
   posts.html carga esos dos archivos antes que este y los deja en AERO y HELI, así
   que cambiar un precio, un pie de foto o el WhatsApp en su datos.js cambia la web,
   el PDF y el post a la vez (regla 1 del proyecto: un dato, un sitio).

   Cada empresa tiene una SEMANA: siete pilares, uno por día de lunes a domingo.
   Cada pilar es una SERIE de posts, y el de hoy se elige por el número de semana
   del año: cada día tiene un post concreto y la serie se recorre sola.

   Un post: { id, titulo, texto, fotos:[ruta…], nota? }. El texto va en primera
   persona porque lo publica él desde su perfil, no una empresa; sin markdown, que
   LinkedIn no lo pinta; y termina con el WhatsApp, que es a donde llega un cliente.
   ══════════════════════════════════════════════════════════════════════════ */

// ── Utilidades ──────────────────────────────────────────────────────────────
// Los textos de las webs llevan <b>, <br> y {marcadores} de PERFIL: aquí se vuelven texto plano.
const limpia = s => String(s || '')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
const sub = (s, P) => limpia(s).replace(/\{(\w+)\}/g, (m, k) => (k in P) ? P[k] : m);
// Un hashtag no lleva espacios ni puntos: 'EE. UU.' → 'EEUU', 'AEROMÉDICA' → 'Aeromédica'. Una
// sigla de hasta cuatro letras se queda en mayúsculas ('FAM', 'MIL').
const tag = t => { const s = String(t).replace(/[^\p{L}\p{N}]/gu, ''); return s.length <= 4 ? s.toUpperCase() : s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); };
const tags = a => a.map(t => '#' + (/[a-z]/.test(t) ? t : tag(t))).join(' ');
const parrafos = (...p) => p.filter(Boolean).join('\n\n');
const primera = s => limpia(s).split(/(?<=\.)\s/)[0];   // la primera frase de un pie de foto

// ── Los objetivos que persigue cada pilar ───────────────────────────────────
const OBJETIVOS = {
  reparar:   { n: 'Reparar helicópteros', c: 'var(--o-reparar)' },
  vender:    { n: 'Vender réplicas',      c: 'var(--o-vender)' },
  clientes:  { n: 'Más clientes',         c: 'var(--o-clientes)' },
  presencia: { n: 'Presencia en redes',   c: 'var(--o-presencia)' },
};

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const DIAS_ABR = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

/* ═══════════════════════════════════════════════════════════════════════════
   AERORESINAS — reparación estructural de helicópteros
   ═══════════════════════════════════════════════════════════════════════════ */
const A = AERO.T.es, AP = AERO.PERFIL;
const af = r => '../Aeroresinas/' + r;
const TA = ['Aeroresinas', 'Helicópteros', 'MantenimientoAeronáutico'];
const ctaAero = `¿Tienes una aeronave con un daño parecido? Mándame fotos del área por WhatsApp (${AP.whatsappTxt}) y te digo si se repara o se sustituye. La evaluación no se cobra.`;
const waAero = `WhatsApp: ${AP.whatsappTxt}.`;

// Una foto por técnica, de las que ya tiene la web: la que enseña esa técnica.
const FOTO_TECNICA = ['vacio-1.jpg', 'hangar.jpg', 'panel-1.jpg', 'antena-3.jpg', 'composite-antes.jpg', 'corrosion.jpg', 'antena-3.jpg', 'parabrisas-3.jpg'];

const SEMANA_AERO = [
  { id: 'caso', nombre: 'Caso real, paso a paso', lema: 'Un trabajo suyo, con sus etapas en orden',
    obj: ['reparar', 'clientes'],
    porque: 'Prueba, no promesa. Un dueño de aeronave no contrata a un desconocido para abrir su fuselaje: contrata un historial que puede ver, etapa por etapa. Las fotos van en orden y LinkedIn arma el carrusel.',
    serie: () => A.trabajos.map((w, i) => ({
      id: 'caso-' + i, titulo: limpia(w.t),
      texto: parrafos(
        `Caso real: ${limpia(w.t)}.`,
        limpia(w.r),
        'Las etapas, en orden:\n' + w.f.map(e => limpia(e[1])).join('\n'),
        `Técnica: ${limpia(w.z)}.`,
        ctaAero,
        tags([...TA, 'ReparaciónEstructural', 'Composites'])),
      fotos: w.f.map(e => af(e[0])),
      nota: `${w.f.length} fotos, en orden: la primera es el daño y la última el resultado. Súbelas juntas y LinkedIn las muestra como carrusel.`,
    })) },

  { id: 'tecnica', nombre: 'La técnica, explicada', lema: 'Una palabra del presupuesto, en claro',
    obj: ['presencia', 'clientes'],
    porque: 'Quien entiende el presupuesto confía más en quien se lo da. Enseñar es la forma más barata de demostrar dominio, y es el post que más se guarda y se comparte.',
    serie: () => A.tecnicas.map(([n, d], i) => ({
      id: 'tec-' + i, titulo: n,
      texto: parrafos(
        `${n}: una de las ocho palabras que vas a oír en un presupuesto de reparación estructural.`,
        limpia(d),
        'Lo cuento en claro porque quien entiende el presupuesto puede juzgarlo en vez de aceptarlo.',
        `¿Dudas sobre una reparación? Escríbeme por WhatsApp: ${AP.whatsappTxt}.`,
        tags([...TA, 'Composites', 'Aviación'])),
      fotos: [af('fotos/' + FOTO_TECNICA[i % FOTO_TECNICA.length])],
    })) },

  { id: 'apunte', nombre: 'Un apunte de oficio', lema: 'Lo que un técnico sabe y el dueño no',
    obj: ['reparar', 'presencia'],
    porque: 'Una línea que solo sabe un técnico. Demuestra oficio en menos de 200 caracteres, que es lo que se lee antes del «ver más», y presenta uno de los siete servicios sin decir «compre».',
    serie: () => A.servicios.map(([k, n, foto, d, apunte], i) => ({
      id: 'apunte-' + i, titulo: n,
      texto: parrafos(
        limpia(apunte),
        `${n}. ${limpia(d)}`,
        limpia(A.repSub),
        `Fotos del daño por WhatsApp: ${AP.whatsappTxt}.`,
        tags([...TA, 'ReparaciónEstructural'])),
      fotos: [af(foto)],
    })) },

  { id: 'pregunta', nombre: 'Lo que suelen preguntar', lema: 'Una duda real, contestada antes de que la hagan',
    obj: ['clientes'],
    porque: 'Las dudas que frenan un encargo —¿tengo que llevar la aeronave?, ¿cuánto tarda?, ¿y si excede el manual?— contestadas con honestidad. La incómoda es la que más confianza da.',
    serie: () => A.faq.map(([q, a], i) => ({
      id: 'faq-' + i, titulo: q,
      texto: parrafos(
        `«${q}»`,
        'Me lo preguntan seguido, y la respuesta es esta:',
        limpia(a),
        `Si tienes otra pregunta sobre tu aeronave, contesto yo: ${AP.whatsappTxt}.`,
        tags([...TA, 'Aviación'])),
      fotos: [af(A.galeria[(i * 3) % A.galeria.length][0])],
    })) },

  { id: 'metodo', nombre: 'Cómo trabajo · AOG', lema: 'La oferta directa: qué hago y cómo se pide',
    obj: ['reparar', 'clientes'],
    porque: 'El viernes cierra la semana con la llamada a la acción más clara: AOG, cómo trabajo, cobertura, talleres MRO. Es el post que pide el trabajo, después de cuatro días de demostrarlo.',
    serie: () => [
      { id: 'met-aog', titulo: A.aogT, fotos: [af('fotos/hangar.jpg')],
        texto: parrafos(
          'Aeronave en tierra (AOG). Esa es la llamada que atiendo primero.',
          limpia(A.aogD),
          'Una aeronave detenida cuesta dinero cada día. Por eso el primer paso es una foto por WhatsApp, y el segundo, salir.',
          `AOG: ${AP.whatsappTxt}.`,
          tags([...TA, 'AOG', 'Aviación'])) },
      { id: 'met-pasos', titulo: 'Cómo trabajo, en seis pasos', fotos: [af('fotos/trabajando.jpg')],
        texto: parrafos(
          limpia(A.metSub),
          A.pasos.map(([t], i) => `${i + 1}. ${t}`).join('\n'),
          limpia(A.pasos[3][1]),
          ctaAero,
          tags([...TA, 'ReparaciónEstructural'])) },
      { id: 'met-voy', titulo: 'Voy a donde está la aeronave', fotos: [af('fotos/taller-1.jpg')],
        texto: parrafos(
          '¿Tengo que llevar la aeronave a algún lado? No.',
          limpia(A.faq[2][1]),
          limpia(A.pasos[2][1]),
          waAero,
          tags([...TA, 'Hangar'])) },
      { id: 'met-mro', titulo: 'Colaboración con talleres MRO', fotos: [af('fotos/real-h145.jpg')],
        texto: parrafos(
          'Para talleres MRO: si les entra un trabajo de estructura o composite y no tienen las manos, yo sí.',
          limpia(A.faq[6][1]),
          limpia(A.trayectoria[0][2]),
          `Hablemos: ${AP.whatsappTxt} · ${AP.correo}`,
          tags([...TA, 'MRO', 'Composites'])) },
      { id: 'met-cob', titulo: AP.cobertura, fotos: [af('fotos/real-panama.jpg')],
        texto: parrafos(
          `${AP.cobertura}: en hangar y en campo.`,
          limpia(A.cobD),
          limpia(A.faq[3][1]),
          waAero,
          tags([...TA, 'Panamá', 'Guatemala'])) },
      { id: 'met-pres', titulo: 'Un presupuesto serio se abre y se mide', fotos: [af('fotos/radomo-2.jpg')],
        texto: parrafos(
          'Un presupuesto hecho solo por foto es una estimación. El de verdad se hace con la zona abierta.',
          limpia(A.faq[0][1]),
          limpia(A.pasos[1][1]),
          ctaAero,
          tags([...TA, 'ReparaciónEstructural'])) },
      { id: 'met-rep', titulo: 'Entrega con reporte', fotos: [af('fotos/techo-4.jpg')],
        texto: parrafos(
          'En una línea de producción una reparación no existe si no está escrita. Por mi cuenta trabajo igual.',
          limpia(A.pasos[5][1]),
          limpia(A.faq[5][1]),
          waAero,
          tags([...TA, 'Aeronavegabilidad'])) },
      { id: 'met-manual', titulo: '¿Y si el daño excede el manual?', fotos: [af('fotos/costado-2.jpg')],
        texto: parrafos(
          '«¿Y si el daño excede el manual?» Se sustituye. No se remienda.',
          limpia(A.faq[7][1]),
          limpia(A.tecnicas[1][1]),
          ctaAero,
          tags([...TA, 'SRM', 'Aviación'])) },
    ] },

  { id: 'hangar', nombre: 'Del hangar', lema: 'Una foto real y dos líneas',
    obj: ['presencia'],
    porque: 'Constancia. Un post corto con una foto real del hangar mantiene el perfil vivo sin vender nada, y el sábado nadie lee un texto largo.',
    serie: () => [
      ...A.galeria.map(([f, p], i) => ({
        id: 'gal-' + i, titulo: primera(p), fotos: [af(f)],
        texto: parrafos(limpia(p), limpia(A.metSub), waAero, tags([...TA, 'Hangar'])) })),
      ...A.flota.map(([f, p], i) => ({
        id: 'flota-' + i, titulo: primera(p), fotos: [af(f)],
        texto: parrafos(limpia(p), limpia(A.floSub), waAero, tags([...TA, 'Aviación'])) })),
    ] },

  { id: 'red', nombre: 'Trayectoria y red de contactos', lema: 'Quién soy, y a quién conoces',
    obj: ['clientes', 'presencia'],
    porque: 'Los 36 años en Airbus son el argumento entero de la página, y el domingo se pide a la red: presentaciones, etiquetas, talleres MRO. Es el post que hace que otros hablen de él.',
    serie: () => [
      { id: 'red-airbus', titulo: A.trayT, fotos: [af('fotos/retrato.jpg')],
        texto: parrafos(
          `${AP.anios} años dentro de una aeronave.`,
          limpia(A.traySub),
          `${A.trayectoria[0][0]} · ${limpia(A.trayectoria[0][1])}. ${limpia(A.trayectoria[0][2])}`,
          `${A.trayectoria[1][0]} · ${limpia(A.trayectoria[1][1])}. ${limpia(A.trayectoria[1][2])}`,
          waAero,
          tags([...TA, 'Airbus', 'Aviación'])) },
      { id: 'red-cap', titulo: A.capT, fotos: [af('fotos/taller-2.jpg')],
        texto: parrafos(
          `${A.capacidades.length} trabajos distintos, con ese nombre, de mi historial en ${AP.donde}:`,
          A.capacidades.map(c => '• ' + c).join('\n'),
          'Los de estructura y composite son exactamente los que hoy aplico a un helicóptero: la técnica es la misma, cambia la aeronave.',
          waAero,
          tags([...TA, 'Composites', 'Airbus'])) },
      { id: 'red-quien', titulo: A.quienT, fotos: [af('fotos/retrato.jpg')],
        texto: parrafos(sub(A.quienD, AP), waAero, tags([...TA, 'Aviación'])) },
      { id: 'red-cred', titulo: A.credT, fotos: [af('fotos/real-h145b.jpg')],
        texto: parrafos(
          'Lo que respalda el trabajo, en seis líneas:',
          A.credenciales.map(([t, d]) => `• ${sub(t, AP)} — ${limpia(d)}`).join('\n'),
          `Contesto yo: ${AP.whatsappTxt}.`,
          tags([...TA, 'DGAC', 'Aviación'])) },
      { id: 'red-pide', titulo: '¿Conoces a alguien que opere un helicóptero?', fotos: [af('fotos/hangar.jpg')],
        texto: parrafos(
          `¿Conoces a alguien que opere un helicóptero Bell, Airbus o Robinson en ${AP.cobertura}? Preséntamelo, o etiquétalo aquí.`,
          sub(A.heroSub, AP),
          'Estoy disponible para proyectos por contrato, soporte urgente (AOG) y colaboración con talleres MRO.',
          `WhatsApp: ${AP.whatsappTxt} · ${AP.correo}`,
          tags([...TA, 'MRO', 'AOG'])) },
      { id: 'red-hoy', titulo: limpia(A.trayectoria[1][1]), fotos: [af('fotos/real-sgm.jpg')],
        texto: parrafos(
          `${A.trayectoria[1][0]}: ${limpia(A.trayectoria[1][1])}.`,
          limpia(A.trayectoria[1][2]),
          `${limpia(A.credenciales[3][0])}. ${limpia(A.credenciales[3][1])}`,
          ctaAero,
          tags([...TA, 'Bell', 'AirbusHelicopters', 'Robinson'])) },
    ] },
];

/* ═══════════════════════════════════════════════════════════════════════════
   HELIESCALA — helicópteros a escala en resina
   ═══════════════════════════════════════════════════════════════════════════ */
const H = HELI.T.es, HP = HELI.PERFIL;
const hf = r => '../Heliescala/' + r;
const TH = ['Heliescala', 'Helicópteros', 'RéplicasEnResina', 'HechoEnMéxico'];
const ctaHeli = `Desde ${HP.desde} · ${HP.tiempo} · ${HP.envio}.\nPídela por WhatsApp: ${HP.whatsappTxt}.`;
const listaTuya = H.tuyaLista.map(l => '• ' + limpia(l)).join('\n');
const piezaPorClave = k => H.piezas.find(p => p[0] === k);

const SEMANA_HELI = [
  { id: 'pieza', nombre: 'Pieza de la semana', lema: 'Una réplica del catálogo, con su librea',
    obj: ['vender'],
    porque: 'La pieza habla sola: foto de estudio sobre blanco, la librea real y el precio de partida. Es el post que vende, y con 26 piezas la serie dura medio año sin repetirse.',
    serie: () => H.piezas.map(([k, n, foto, txt, etq, mod]) => ({
      id: 'pieza-' + k, titulo: n, fotos: [hf(foto)],
      texto: parrafos(
        `${n}, en resina y pintada a mano.`,
        limpia(txt),
        limpia(H.heroSub),
        mod && H.modelos[mod] ? `Cómo se reconoce el de verdad: ${limpia(H.modelos[mod].ojo)}` : '',
        ctaHeli,
        tags([...TH, ...etq])),
    })) },

  { id: 'ficha', nombre: 'El helicóptero de verdad', lema: 'La ficha del fabricante y cómo se reconoce',
    obj: ['presencia', 'vender'],
    porque: 'Datos comprobados del fabricante que nadie más publica. Atrae a quien sabe de helicópteros —pilotos, mecánicos, operadores—, que es exactamente quien encarga una réplica fiel.',
    serie: () => Object.entries(H.modelos).map(([k, m]) => {
      const pieza = H.piezas.find(p => p[5] === k);
      const spec = Object.entries(m.sp).map(([c, v]) => `${H.fpSpec[c]}: ${limpia(v)}`).join(' · ');
      return { id: 'ficha-' + k, titulo: `${m.fab} ${m.n}`, fotos: [hf(pieza ? pieza[2] : 'fotos/hero.jpg')],
        texto: parrafos(
          `${m.n}: cómo se reconoce, y por qué lo hago en resina.`,
          limpia(m.r),
          `${H.fpBl.ojo}: ${limpia(m.ojo)}`,
          `Ficha — ${spec}.`,
          `${H.fpBl.mx}: ${limpia(m.mx)}`,
          limpia(H.fpRepD),
          ctaHeli,
          tags([...TH, m.n.split(/[ /(]/)[0], 'Aviación'])) };
    }) },

  { id: 'tuya', nombre: 'La réplica de tu propia aeronave', lema: 'Lo que más se encarga',
    obj: ['vender', 'clientes'],
    porque: 'La sección que vende no es el catálogo: es SU aeronave, con sus colores, su número y su matrícula. Regalo de retiro, reconocimiento, pieza de recepción, obsequio a un cliente.',
    serie: () => [
      { id: 'tuya-retiro', titulo: 'Regalo de retiro', fotos: [hf('fotos/personalizado.jpg')],
        texto: parrafos(
          'Un regalo de retiro que no se guarda en un cajón.',
          `El helicóptero que voló durante años, con sus colores, su número de unidad y su matrícula, y una placa en la base con su nombre. ${limpia(H.tuyaOjo)}.`,
          'Cómo se pide:\n' + listaTuya,
          ctaHeli,
          tags([...TH, 'RegaloDeRetiro', 'Pilotos'])) },
      { id: 'tuya-recon', titulo: 'Reconocimiento a un piloto o a una tripulación', fotos: [hf('fotos/policia.jpg')],
        texto: parrafos(
          'Para reconocer a un piloto o a una tripulación: su propia aeronave, en la mano.',
          limpia(H.tuyaSub),
          limpia(H.piePolicia),
          ctaHeli,
          tags([...TH, 'Pilotos', 'Aviación'])) },
      { id: 'tuya-recep', titulo: 'Pieza de recepción', fotos: [hf('fotos/xamvr.jpg')],
        texto: parrafos(
          'La aeronave de tu operación, en la recepción.',
          limpia(H.tuyaSub),
          'Cómo se pide:\n' + listaTuya,
          ctaHeli,
          tags([...TH, 'Operadores', 'Aviación'])) },
      { id: 'tuya-cliente', titulo: 'Obsequio a un cliente', fotos: [hf('fotos/grandnew.jpg')],
        texto: parrafos(
          'Un obsequio que un cliente de aviación no olvida: su aeronave, con su matrícula.',
          limpia(H.tuyaSub),
          limpia(H.pieFam),
          ctaHeli,
          tags([...TH, 'Aviación'])) },
      { id: 'tuya-flota', titulo: 'Una flota completa, todas iguales', fotos: [hf('fotos/flota6.jpg')],
        texto: parrafos(
          'Una pieza o una flota completa, todas iguales.',
          limpia(H.galeria[3][1]),
          limpia(H.tuyaLista[3]),
          ctaHeli,
          tags([...TH, 'Operadores'])) },
    ] },

  { id: 'proceso', nombre: 'Cómo se hace una', lema: 'Molde, colada, lijado, pintura a mano',
    obj: ['presencia', 'vender'],
    porque: 'Justifica el precio: molde, colada, lijado y montaje, pintura a mano. No es un juguete pintado, y hay que decirlo con el taller de fondo.',
    serie: () => [
      ...H.pasos.map(([t, d], i) => ({
        id: 'proc-' + i, titulo: `Paso ${i + 1}: ${t}`,
        fotos: [hf(['fotos/taller.jpg', 'fotos/produccion.jpg', 'fotos/bruto-2.jpg', 'fotos/policia.jpg'][i])],
        texto: parrafos(
          `Paso ${i + 1} de ${H.pasos.length} — ${t}.`,
          limpia(d),
          limpia(H.procSub),
          `Por eso cada encargo tarda ${HP.tiempo}. WhatsApp: ${HP.whatsappTxt}.`,
          tags([...TH, 'HechoAMano', 'Taller'])) })),
      { id: 'proc-bruto', titulo: primera(H.galeria[4][1]), fotos: [hf(H.galeria[4][0])],
        texto: parrafos(limpia(H.galeria[4][1]), limpia(H.procSub), ctaHeli, tags([...TH, 'HechoAMano'])) },
      { id: 'proc-lote', titulo: primera(H.galeria[2][1]), fotos: [hf(H.galeria[2][0])],
        texto: parrafos(limpia(H.galeria[2][1]), limpia(H.procSub), ctaHeli, tags([...TH, 'Taller'])) },
    ] },

  { id: 'encargo', nombre: 'Encargo y entrega', lema: 'Precio, tiempo, entrega y envío, sin rodeos',
    obj: ['vender'],
    porque: 'El viernes se pide el encargo: cuánto cuesta, cuánto tarda, cómo llega. Un cliente que ya vio cuatro días de piezas necesita saber cómo se pide una.',
    serie: () => [
      { id: 'enc-precio', titulo: `Desde ${HP.desde}: cómo se cotiza`, fotos: [hf('fotos/hero.jpg')],
        texto: parrafos(
          '¿Cuánto cuesta una réplica? Depende de tres cosas: el modelo, el tamaño y cuánta decoración lleva.',
          sub(H.fichasNota, HP),
          'Con el modelo y una foto de la librea te digo tiempo y precio.',
          `WhatsApp: ${HP.whatsappTxt}.`,
          tags([...TH, 'Maquetas'])) },
      { id: 'enc-entrega', titulo: 'Entrega en persona, sin costo', fotos: [hf('fotos/trio.jpg')],
        texto: parrafos(
          `En la ${H.envZonas[0][2].replace(' · ', ' y el ')}, te la entrego en persona. ${H.envZonas[0][3]}.`,
          limpia(H.envNota),
          ctaHeli,
          tags([...TH, 'CDMX'])) },
      { id: 'enc-dhl', titulo: 'Envíos a todo el país', fotos: [hf('fotos/produccion.jpg')],
        texto: parrafos(
          'Al resto del país va por DHL: embalada en caja rígida y con su número de guía.',
          `Cuatro zonas: ${H.envZonas.map(z => z[1]).join(' · ')}.`,
          limpia(H.envNota),
          ctaHeli,
          tags([...TH, 'Envíos', 'México'])) },
      { id: 'enc-tiempo', titulo: `${HP.tiempo} por pieza`, fotos: [hf('fotos/fila.jpg')],
        texto: parrafos(
          `${HP.tiempo}: lo que tarda una réplica desde que se confirma el encargo.`,
          limpia(H.pasos[0][1]),
          limpia(H.procSub),
          ctaHeli,
          tags([...TH, 'HechoAMano'])) },
      { id: 'enc-avion', titulo: 'También aviones', fotos: [hf(piezaPorClave('avion')[2])],
        texto: parrafos(
          'No todo son helicópteros: también hago aviones.',
          limpia(piezaPorClave('avion')[3]),
          'Si el tuyo no está en el catálogo, se hace: el molde y la decoración se preparan para cada encargo.',
          ctaHeli,
          tags([...TH, 'AlaFija', 'Aviación'])) },
      { id: 'enc-catalogo', titulo: `${H.dModelos} piezas en el catálogo`,
        fotos: ['h145a', 'marina', 'fam-uma', 'marineone'].map(k => hf(piezaPorClave(k)[2])),
        texto: parrafos(
          `${H.dModelos} piezas reales, cada una con la librea que llevaba el original.`,
          limpia(H.catSub),
          ctaHeli,
          tags([...TH, 'Catálogo', 'Aviación'])),
        nota: 'Cuatro fotos de piezas distintas, para que se vea la variedad: civil, Marina, Fuerza Aérea y el presidencial.' },
    ] },

  { id: 'vitrina', nombre: 'La vitrina', lema: 'El taller y lo que sale de él',
    obj: ['presencia'],
    porque: 'Constancia con lo mejor que tiene: la sala de exposición, los lotes completos, las piezas en bruto. Un post corto de sábado que mantiene la marca a la vista.',
    serie: () => H.galeria.map(([f, p], i) => ({
      id: 'vit-' + i, titulo: primera(p), fotos: [hf(f)],
      texto: parrafos(limpia(p), limpia(H.galSub), `WhatsApp: ${HP.whatsappTxt}.`, tags([...TH, 'Taller'])) })) },

  { id: 'red', nombre: 'Red de contactos', lema: 'Pilotos, operadores, quien se retira',
    obj: ['clientes', 'presencia'],
    porque: 'Pedir a la red: que etiqueten a un piloto, a quien se retira, al operador. Una etiqueta es la forma más barata de llegar a un cliente nuevo, y el domingo es cuando la gente está en el teléfono.',
    serie: () => [
      { id: 'redh-piloto', titulo: '¿Vuelas o operas un helicóptero?', fotos: [hf('fotos/policia.jpg')],
        texto: parrafos(
          '¿Vuelas o operas un helicóptero? Etiqueta a quien debería tener el suyo en resina.',
          limpia(H.tuyaSub),
          ctaHeli,
          tags([...TH, 'Pilotos', 'Aviación'])) },
      { id: 'redh-retiro', titulo: '¿Alguien de tu equipo se retira este año?', fotos: [hf('fotos/personalizado.jpg')],
        texto: parrafos(
          '¿Alguien de tu equipo se retira de volar este año? Su aeronave, con su matrícula y una placa con su nombre.',
          limpia(H.pieFam),
          'Cómo se pide:\n' + listaTuya,
          ctaHeli,
          tags([...TH, 'RegaloDeRetiro', 'Pilotos'])) },
      { id: 'redh-museo', titulo: primera(H.galeria[0][1]), fotos: [hf(H.galeria[0][0])],
        texto: parrafos(
          limpia(H.galeria[0][1]),
          'Cada una salió de su propio molde y se pintó a mano, con la librea del original.',
          ctaHeli,
          tags([...TH, 'Exposición', 'Aviación'])) },
      { id: 'redh-usa', titulo: 'El presidencial de Estados Unidos', fotos: [hf(piezaPorClave('marineone')[2])],
        texto: parrafos(
          'La librea más reconocible del mundo, en resina.',
          limpia(piezaPorClave('marineone')[3]),
          'El catálogo no se limita a aeronaves mexicanas: Airbus, Bell, Agusta, Mil y hasta un avión.',
          ctaHeli,
          tags([...TH, 'Aviación'])) },
      { id: 'redh-operadores', titulo: 'Para operadores: su flota, en la recepción', fotos: [hf('fotos/flota6.jpg'), hf('fotos/fila.jpg')],
        texto: parrafos(
          'Para operadores y dependencias: la flota completa, en la recepción.',
          limpia(H.galeria[3][1]),
          limpia(H.tuyaLista[3]),
          ctaHeli,
          tags([...TH, 'Operadores', 'Aviación'])) },
    ] },
];

/* ═══════════════════════════════════════════════════════════════════════════
   Las dos empresas, tal como las pinta posts.html
   ═══════════════════════════════════════════════════════════════════════════ */
const EMPRESAS = {
  aero: {
    nombre: 'Aeroresinas', sub: A.marcaSub, web: '../Aeroresinas/aeroresinas.html',
    autor: { nombre: AP.nombre, titular: `${AP.puesto} · Licencia ${AP.licencia} · ${AP.anios} años en ${AP.donde}`, foto: af('fotos/retrato.jpg') },
    enlaces: [['Perfil de LinkedIn', AP.linkedin], ['Página de empresa', AP.linkedinEmp]],
    semana: SEMANA_AERO,
  },
  heli: {
    nombre: 'Heliescala', sub: H.marcaSub, web: '../Heliescala/heliescala.html',
    autor: { nombre: AP.nombre, titular: `Heliescala · ${limpia(H.heroOjo)} · ${HP.ciudad}`, foto: af('fotos/retrato.jpg') },
    enlaces: [['Perfil de LinkedIn', AP.linkedin]],
    semana: SEMANA_HELI,
  },
};
