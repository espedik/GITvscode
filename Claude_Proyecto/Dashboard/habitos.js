/* ══════════════════════════════════════════════════════════════════════════
   HÁBITOS — la pestaña de la cadena que no se rompe
   ══════════════════════════════════════════════════════════════════════════

   El slide 8 del Dashboard. Sale del diseño acordado en `diseno-habitos/`.

   POR QUÉ ES UN MÓDULO APARTE, como examen-genai.js: dashboard.html ya pesa
   1.1 MB y esto son ~900 líneas entre datos, motor, gráficas, pintado y
   estilos. El HTML solo aporta el <section>, las capas del fondo, el tema de
   color y la entrada en las cuatro listas de pantallas.

   LAS TRES DECISIONES DE DISEÑO QUE HAY QUE RESPETAR AL TOCAR ESTO:

   1. CUATRO ESTADOS, NO DOS. Hecho, fallé, NO TOCABA y futuro (más `pre`,
      abajo). Natación es solo los miércoles: un martes en blanco no es un
      fallo. `estado()` es donde vive esa distinción y es el corazón del módulo.

   2. EL ANCLAJE VIVE JUNTO AL NOMBRE. "23:10, después de lavarme los dientes"
      es lo que hace que el hábito ocurra, así que va en la fila.

   3. UN SOLO AVISO, Y SOLO CUANDO TOCA. "Nunca falles dos veces seguidas"
      aparece únicamente cuando algo se cayó ayer y hoy sigue sin marcar.

   LAS TRES GRÁFICAS, cada una con un trabajo distinto — ninguna repite lo que
   dice otra, que es lo que las haría ruido:
     · El ANILLO es el titular: el % del mes.
     · CÓMO VA EL MES es el acumulado día a día: dice si vas a mejor o a peor.
       (Antes era "% por semana" y salía plana: con 11 días de mes no hay
       material para cinco semanas. Se midió y se cambió.)
     · El PERFIL POR DÍA dice DÓNDE se cae, que es lo accionable: un total
       global solo dice que te va mal.
   La fila al pie de la cuadrícula añade la cuarta lectura, la vertical:
   cuántos de los que tocaban cerraste cada día.

   DÓNDE VIVEN LOS DATOS: `localStorage['dash-habitos-v1']`, con la misma
   pareja rawGet/rawSet del resto del Dashboard. Dos cosas distintas dentro:
   `def` son los hábitos (los edita Adán desde la pantalla) y `marcas` es el
   registro vivo, indexado por fecha ISO local — no por número de día — para
   que cruzar de mes no desplace nada.
   ══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const LS = 'dash-habitos-v1';

  /* ── Iconos de trazo, uno por hábito ───────────────────────────────────
     Cada uno comprimido a UN solo atributo `d` (los subtrazos se encadenan
     con M). A 14px un emoji es una mancha; un trazo se lee y recolorea. */
  const ICO = {
    pesa:  'M6.5 8v8M17.5 8v8M3.5 10v4M20.5 10v4M6.5 12h11',
    onda:  'M2.5 8.5c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 3-1.5' +
           'M2.5 14c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 3-1.5' +
           'M2.5 19.5c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 3-1.5',
    pasos: 'M8.5 4.5c1.6 0 2.6 1.2 2.6 3 0 2.4-1.3 3.6-1.3 5.4 0 1.1-.6 1.8-1.6 1.8s-1.8-.8-1.8-2c0-2 1-3.2 1-5.2 0-1.8.5-3 1.1-3Z' +
           'M15.5 10c1.5 0 2.4 1.1 2.4 2.8 0 2.2-1.2 3.4-1.2 5 0 1-.6 1.7-1.5 1.7s-1.7-.7-1.7-1.8c0-1.9.9-3 .9-4.8 0-1.7.5-2.9 1.1-2.9Z',
    habla: 'M20 4.5H4a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 16.5h3v4l4.5-4H20a1.5 1.5 0 0 0 1.5-1.5V6A1.5 1.5 0 0 0 20 4.5Z',
    chip:  'M7.5 7.5h9v9h-9zM4.5 4.5h15v15h-15z' +
           'M9.5 4.5v-2M14.5 4.5v-2M9.5 21.5v-2M14.5 21.5v-2M4.5 9.5h-2M4.5 14.5h-2M21.5 9.5h-2M21.5 14.5h-2',
    libro: 'M3.5 5.5A2 2 0 0 1 5.5 3.5H11v16H5.5a2 2 0 0 0-2 2V5.5Z' +
           'M20.5 5.5a2 2 0 0 0-2-2H13v16h5.5a2 2 0 0 1 2 2V5.5Z',
    loto:  'M12 20.5c-4.5 0-8-2.8-8-6 2.4 0 4.3.8 5.6 1.9' +
           'M12 20.5c4.5 0 8-2.8 8-6-2.4 0-4.3.8-5.6 1.9' +
           'M12 20.5c-2.5-2-3.8-4.6-3.8-7.2 0-3 1.4-5.6 3.8-7.8 2.4 2.2 3.8 4.8 3.8 7.8 0 2.6-1.3 5.2-3.8 7.2Z',
    luna:  'M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z',
    nocar: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 1 0 0-17M6 6l12 12',
    moneda:'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 1 0 0-17' +
           'M12 7.5v9M14.6 9.8c-.6-.7-1.5-1-2.6-1-1.5 0-2.5.7-2.5 1.8 0 2.6 5.2 1.2 5.2 3.8 0 1.1-1 1.9-2.7 1.9-1.2 0-2.1-.4-2.7-1.1',
    gota:  'M12 3.5c3.2 3.6 6 6.4 6 9.6a6 6 0 0 1-12 0c0-3.2 2.8-6 6-9.6Z',
    chispa:'M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9Z' +
           'M18.5 15.5l.7 2.2 2.3.8-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.8Z',
    sol:   'M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 1 0 0-8',
    codigo:'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
    diana: 'M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18M12 8a4 4 0 1 0 0 8 4 4 0 1 0 0-8M12 11.5a.5.5 0 1 0 0 1 .5.5 0 1 0 0-1',
    pluma: 'M4 20l4-1 11-11a2.1 2.1 0 0 0-3-3L5 16l-1 4ZM13.5 6.5l3 3M4 20h6',
    punto: 'M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 1 0 0-15'   // el de los hábitos nuevos
  };
  const ICO_NOMBRES = Object.keys(ICO);

  /* ── Los hábitos de arranque ──────────────────────────────────────────
     Salen del horario real de Adán (RUTINA_TASKS en datos-maestros.js, los 58
     bloques de la semana): la hora, el anclaje y los días son los de ahí.
     `hora` ordena la lista; 'todo el día' (vacío) va al final. `dow` son los
     días en que toca (0=domingo) o 'todos'. Es solo la semilla: se editan
     desde la propia pantalla. */
  const SEMILLA = [
    { id:'app',    nombre:'Construir esta app',     ancla:'10 min antes de arrancar · y de 23:30 a 00:00', hora:'06:43', color:'#22d3ee', ico:'codigo', dow:[1,2,3,4,5],
      pasos:[
        'Por la mañana, 10 min: abre el proyecto y anota UNA mejora concreta para hoy.',
        'De 23:30 a 00:00: constrúyela, pruébala en el navegador y súbela a GitHub.',
        'Si no cabe en 30 min, pártela. Lo que suba hoy tiene que funcionar.'
      ] },
    { id:'genai',  nombre:'CT-GenAI · 30 min',      ancla:'Al llegar a ALTEN, antes del correo',         hora:'08:30', color:'#4ade80', ico:'chip',   dow:[1,2,3,4,5],
      pasos:[
        'Al llegar a ALTEN, antes de abrir el correo: 30 min con el syllabus o con el simulacro.',
        'El orden que funciona: examen de muestra primero, después los capítulos que fallaste.',
        'El simulacro está en Metas → ISTQB CT-GenAI: 40 preguntas, 46 puntos, corte en 30.',
        'El capítulo 2 (ingeniería de instrucciones) es un tercio del examen: 11 preguntas, 16 puntos.'
      ] },
    { id:'ale',    nombre:'Clase de alemán',        ancla:'CENLEX · ESCA Santo Tomás, hasta las 18:00',  hora:'17:00', color:'#ffd93d', ico:'habla',  dow:[1,2,3,4,5],
      pasos:[
        'Sales de ALTEN a las 16:40 y manejas unos 20 min al CENLEX.',
        'Clase de 17:00 a 18:00 · vas por el Kapitel {{kapitelAleman}}.',
        'Lleva anotadas las 3 palabras que no te salieron en la clase anterior.',
        'A las 18:00, del CENLEX al gimnasio: unos 15 min.'
      ] },
    /* `gym:true`: la ficha lee el día de GYM_RUTINA_DEFAULT que toca hoy (nombre y
       foco) en vez de copiarlo aquí. El detalle de cada ejercicio vive en Ejercicio. */
    { id:'gym',    nombre:'Gimnasio',               ancla:'Tras el CENLEX · el sábado a las 07:35',      hora:'18:15', color:'#ff8a3d', ico:'pesa',   dow:[1,2,4,5,6], gym:true,
      pasos:['Series, reps y peso de cada ejercicio: en Ejercicio, en la barra de arriba.'] },
    { id:'fase0',  nombre:'Fase 0 · 1h15',          ancla:'Negocio de tu papá o plantilla GBM',          hora:'20:00', color:'#8b5cf6', ico:'diana',  dow:[1,2,3,4,5],
      pasos:[
        '1h15 de avance en la prioridad activa: el negocio de tu papá o la plantilla GBM.',
        'Antes de empezar, decide qué vas a tener hecho a las 21:15. Una cosa, no tres.',
        'Sin Didi ni celular en este bloque: es el único hueco de trabajo profundo del día.'
      ] },
    /* `rutina` + `sec`: la ficha enseña las subtareas de ese bloque de RUTINA_TASKS,
       solo la sección indicada. Aquí, la lectura del cierre del día. */
    { id:'leer',   nombre:'Leer 10 páginas',        ancla:'En el cierre del día',                        hora:'21:45', color:'#b06eff', ico:'libro',  dow:'todos', rutina:'wd-cierre', sec:'Lectura',
      pasos:['10 páginas es el mínimo para marcarlo; el bloque completo son 30 min.'] },
    { id:'piel',   nombre:'Rutina de la noche',     ancla:'Piel, minoxidil y suplementos',               hora:'22:30', color:'#fb7185', ico:'chispa', dow:'todos', rutina:'wd-pm' },
    { id:'medi',   nombre:'Meditar · 10 min',       ancla:'Respiración box 4-4-4-4',                     hora:'23:00', color:'#00e87a', ico:'loto',   dow:'todos', rutina:'wd20' },
    { id:'sueno',  nombre:'Dormir 7 h',             ancla:'Apagar pantallas al cerrar la app',           hora:'23:59', color:'#818cf8', ico:'luna',   dow:'todos',
      pasos:[
        'Apaga pantallas en cuanto cierres la app: entre 00:00 y 01:00.',
        'Son 5h40 a 6h40 de sueño hasta las 06:40. Cada media hora que te pases se nota al día siguiente.',
        'Celular fuera del cuarto: es lo que hace que despertar sin snooze funcione.'
      ] },
    /* `meta` parte el hábito en pasos: el agua se marca litro a litro y solo
       cuenta como cumplida al tercero. Sin hora: es de todo el día. */
    { id:'agua',   nombre:'Agua · 3 litros',        ancla:'Botella llena al salir',                      hora:'',      color:'#00b8d9', ico:'gota',   dow:'todos', meta:3,
      pasos:[
        'Litro 1: la botella llena al salir de casa, terminada antes de comer.',
        'Litro 2: en ALTEN por la tarde, antes de salir al CENLEX.',
        'Litro 3: entre el gimnasio y la cena.',
        'Marca un litro cada vez que termines la botella: tres toques y el día está.'
      ] }
  ];

  /* ── Migraciones ──────────────────────────────────────────────────────
     `S.mig` guarda la última aplicada. Cada una corre una sola vez y en orden.
     La regla de todas: lo que Adán editó a mano manda. Un hábito se considera
     "suyo" si su nombre o su anclaje no son los que le puso la semilla anterior
     — entonces se le añade solo lo nuevo (la hora) y no se le toca nada más. */
  const MIG = 5;
  const RETIRADOS = { 2: ['azucar', 'gasto'], 3: ['pasos'], 4: ['snooze', 'diario'], 5: ['nata'] };
  /* Lo que decía la semilla anterior de cada hábito, para saber si Adán lo tocó */
  const PREVIO = {
    gym:   [['Gimnasio', '19:00 · después de comer'], ['Gimnasio', 'Tras el CENLEX · el sábado a las 07:35']],
    nata:  [['Natación', 'Miércoles, 20:00'], ['Natación', 'Alberca del Fitsi Buenavista']],
    app:   [['Construir esta app', '10 min antes de arrancar · y de 23:30 a 00:00']],
    fase0: [['Fase 0 · 1h15', 'Negocio de tu papá o plantilla GBM']],
    ale:   [['Alemán · 15 min', 'Antes del café'], ['Clase de alemán', 'CENLEX · ESCA Santo Tomás, hasta las 18:00']],
    genai: [['CT-GenAI · 30 min', 'Antes de abrir el correo'], ['CT-GenAI · 30 min', 'Al llegar a ALTEN, antes del correo']],
    leer:  [['Leer 10 páginas', 'Al acostarme'], ['Leer 10 páginas', 'En el cierre del día']],
    medi:  [['Meditar · 5 min', '23:10 · tras lavarme los dientes'], ['Meditar · 10 min', 'Respiración box 4-4-4-4']],
    sueno: [['Dormir 7 h', 'Luz fuera a las 23:40'], ['Dormir 7 h', 'Apagar pantallas al cerrar la app']],
    agua:  [['Agua · 3 litros', 'Botella llena al salir'], ['3 litros de agua', 'Botella llena al salir']],
    piel:  [['Skincare noche', 'Después de la ducha'], ['Rutina de la noche', 'Piel, minoxidil y suplementos']]
  };
  const intacto = function (h) {
    const p = PREVIO[h.id];
    if (!p) return false;
    return p.some(function (v) { return h.nombre === v[0] && h.ancla === v[1]; });
  };
  const semillaDe = function (id) {
    return SEMILLA.filter(function (x) { return x.id === id; })[0];
  };

  const PALETA = ['#ff8a3d','#00e0c0','#ffd93d','#b06eff','#00e87a','#3b82f6',
                  '#00b8d9','#f472b6','#ff5c5c','#8b5cf6','#4ade80','#22d3ee','#818cf8','#fb7185','#fb923c'];
  const DOW_N = ['D','L','M','M','J','V','S'];
  const DOW_LARGO = ['domingos','lunes','martes','miércoles','jueves','viernes','sábados'];
  const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio',
                 'agosto','septiembre','octubre','noviembre','diciembre'];

  /* ── Frases para formar hábitos ───────────────────────────────────────
     Una por día, elegida por la fecha (no al azar: la misma todo el día). Solo
     autores comprobables; las que no llevan nombre son de la casa. */
  const FRASES = [
    ['No subes al nivel de tus metas. Caes al nivel de tus sistemas.', 'James Clear, Hábitos atómicos'],
    ['Cada acción que tomas es un voto por el tipo de persona en que quieres convertirte.', 'James Clear'],
    ['Los hábitos son el interés compuesto de la superación personal.', 'James Clear'],
    ['Somos lo que hacemos repetidamente. La excelencia, entonces, no es un acto sino un hábito.', 'Will Durant, sobre Aristóteles'],
    ['Primero hacemos nuestros hábitos, y luego nuestros hábitos nos hacen a nosotros.', 'John Dryden'],
    ['La motivación es lo que te pone en marcha. El hábito es lo que te mantiene.', 'Jim Ryun'],
    ['No rompas la cadena.', 'Jerry Seinfeld'],
    ['Nunca falles dos veces seguidas. Un fallo es un accidente; dos es el principio de un hábito nuevo.', 'James Clear'],
    ['Hazlo tan fácil que no puedas decir que no.', 'James Clear, la regla de los dos minutos'],
    ['Un uno por ciento mejor cada día es treinta y siete veces mejor en un año.', 'James Clear'],
    ['La motivación te va a fallar la mayoría de los días. Exígete el hábito, no la motivación.', ''],
    ['El día que no tienes ganas es el único que cuenta de verdad.', ''],
    ['No se trata de hacerlo perfecto. Se trata de no dejar el hueco.', ''],
    ['La racha no es el premio. El premio es en quién te conviertes mientras la sostienes.', ''],
    ['Cinco minutos hoy valen más que una hora que nunca llega.', ''],
    ['Le exiges rigor a un sistema en el trabajo. Exígeselo a tus hábitos.', '']
  ];
  function fraseDelDia() {
    const d = new Date();
    const inicio = new Date(d.getFullYear(), 0, 0);
    const dia = Math.floor((d - inicio) / 86400000);
    return FRASES[dia % FRASES.length];
  }

  /* ── Estado ───────────────────────────────────────────────────────────── */
  let S = null;            // { def:[], marcas:{}, desde:'YYYY-MM-DD', mig:n }
  let mesVisto = null;
  let fichaId = null;

  function cargar() {
    const g = (typeof rawGet === 'function')
      ? rawGet(LS, null)
      : (function () { try { return JSON.parse(localStorage.getItem(LS)); } catch (e) { return null; } })();

    let nuevo = false;
    if (g && g.def && g.def.length) {
      S = g;
      if (!S.marcas) S.marcas = {};
      /* La bandera vieja `retirado` equivale a la migración 2 */
      if (!S.mig) S.mig = S.retirado ? 2 : 1;

      for (let m = S.mig + 1; m <= MIG; m++) {
        /* 1) Los retirados salen de la lista y de su historial */
        const fuera = RETIRADOS[m] || [];
        if (fuera.length) {
          S.def = S.def.filter(function (h) { return fuera.indexOf(h.id) < 0; });
          Object.keys(S.marcas).forEach(function (f) {
            fuera.forEach(function (id) { delete S.marcas[f][id]; });
            if (!Object.keys(S.marcas[f]).length) delete S.marcas[f];
          });
        }
        /* 2) Los que siguen: si Adán no los tocó, toman la semilla nueva entera;
              si los tocó, solo reciben lo que no tenían (hora, icono, meta). */
        S.def.forEach(function (h) {
          const sem = semillaDe(h.id);
          if (!sem) { if (!h.ico || !ICO[h.ico]) h.ico = 'punto'; return; }
          if (intacto(h)) {
            h.nombre = sem.nombre; h.ancla = sem.ancla; h.dow = sem.dow;
            h.color = sem.color; h.ico = sem.ico;
          }
          if (h.hora === undefined) h.hora = sem.hora;
          if (h.pasos === undefined && sem.pasos) h.pasos = sem.pasos.slice();
          if (h.rutina === undefined && sem.rutina) { h.rutina = sem.rutina; if (sem.sec) h.sec = sem.sec; }
          if (h.gym === undefined && sem.gym) h.gym = true;
          if (!h.ico || !ICO[h.ico]) h.ico = sem.ico;
          if (sem.meta && !h.meta) h.meta = sem.meta;
        });
        /* 3) Los nuevos de la semilla entran con su arranque en hoy */
        SEMILLA.forEach(function (sem) {
          if (S.def.some(function (h) { return h.id === sem.id; })) return;
          S.def.push(Object.assign({}, sem, { desde: hoyISO() }));
        });
        S.mig = m;
        nuevo = true;
      }
      delete S.retirado;
    } else {
      /* Sin lista de hábitos, pero `marcas` y `desde` se conservan: pueden venir
         de una versión anterior o de una restauración a medias, y son historial
         real. Reemplazar el objeto entero los borraría sin avisar. */
      S = {
        def: SEMILLA.map(function (h) { return Object.assign({}, h); }),
        marcas: (g && g.marcas) || {},
        desde: g && g.desde,
        mig: MIG
      };
      /* Ese historial puede traer marcas de hábitos ya retirados: como aquí no
         corren las migraciones, se limpian de una vez. */
      const todosFuera = Object.keys(RETIRADOS).reduce(function (a, k) { return a.concat(RETIRADOS[k]); }, []);
      Object.keys(S.marcas).forEach(function (f) {
        todosFuera.forEach(function (id) { delete S.marcas[f][id]; });
        if (!Object.keys(S.marcas[f]).length) delete S.marcas[f];
      });
      nuevo = true;
    }
    if (!S.marcas) S.marcas = {};

    /* EL ARRANQUE EN FRÍO. Sin esta fecha, el primer día que se abre la pestaña
       el mes entero sale pintado de rojo: días en que "tocaba y no se marcó"
       porque no existía el registro. Un hábito no puede fallar antes de
       existir, así que nada anterior a `desde` cuenta. Se persiste en el acto
       y no al primer toggle: si se abre hoy, no se marca nada y se vuelve en
       una semana, el arranque tiene que seguir siendo hoy. */
    if (!S.desde) { S.desde = hoyISO(); nuevo = true; }
    if (nuevo) guardar();
    return S;
  }

  /* La lista en el orden en que se vive el día. Los sin hora (el agua) al final.
     Se ordena una copia: el orden guardado es el de creación y no se toca. */
  function ordenados() {
    return S.def.slice().sort(function (a, b) {
      const ha = a.hora || '99:99', hb = b.hora || '99:99';
      return ha < hb ? -1 : (ha > hb ? 1 : 0);
    });
  }

  function guardar() {
    if (typeof rawSet === 'function') rawSet(LS, S);
    else { try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) {} }
  }

  /* ── Fechas ───────────────────────────────────────────────────────────
     Todo se indexa por 'YYYY-MM-DD' en hora local. Nada de toISOString(),
     que convierte a UTC y en México adelanta el día a partir de las 18:00. */
  function iso(d) {
    return d.getFullYear() + '-' +
           String(d.getMonth() + 1).padStart(2, '0') + '-' +
           String(d.getDate()).padStart(2, '0');
  }
  function hoyISO() { return iso(new Date()); }
  function desdeISO(s) { const p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function sumaDias(d, n) { const x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }

  /* ── El corazón: en qué estado está un hábito un día dado ──────────────
     'off'   no tocaba ese día de la semana   → neutro
     'pre'   aún no llevabas el hábito        → neutro
     'fut'   todavía no ha llegado
     'hoy'   toca hoy y sigue sin marcar      → aún NO es un fallo
     'hoyok' toca hoy y ya está marcado
     'ok'    día pasado cumplido
     'no'    día pasado en que tocaba y no se hizo                        */
  function toca(h, fecha) {
    if (h.dow === 'todos') return true;
    return h.dow.indexOf(desdeISO(fecha).getDay()) >= 0;
  }
  /* Un hábito puede pedir varios pasos (el agua, tres litros). `valor` es
     cuántos llevas ese día y `marcado` solo es cierto al llegar a la meta.
     Lo guardado sigue siendo un número, así que el historial viejo (1) se lee
     igual en un hábito de un solo paso. */
  function meta(h) { return h.meta > 1 ? h.meta : 1; }
  function valor(h, fecha) {
    const v = S.marcas[fecha] && S.marcas[fecha][h.id];
    return typeof v === 'number' ? v : (v ? 1 : 0);
  }
  function marcado(h, fecha) { return valor(h, fecha) >= meta(h); }
  function estado(h, fecha) {
    if (!toca(h, fecha)) return 'off';
    const arranque = h.desde || S.desde;
    if (arranque && fecha < arranque) return 'pre';
    const hoy = hoyISO();
    if (fecha > hoy) return 'fut';
    if (fecha === hoy) return marcado(h, fecha) ? 'hoyok' : 'hoy';
    return marcado(h, fecha) ? 'ok' : 'no';
  }
  /* 'pre' y 'off' son lo mismo para todo el mundo: neutros. Ni suman, ni
     restan, ni rompen una racha. Se separan porque significan cosas distintas
     ("aún no lo llevabas" contra "ese día no tocaba"). */
  function neutro(e) { return e === 'off' || e === 'pre'; }
  function cuenta(e) { return e === 'ok' || e === 'no' || e === 'hoyok'; }
  function logrado(e) { return e === 'ok' || e === 'hoyok'; }

  function racha(h) {
    let n = 0, d = new Date();
    for (let i = 0; i < 400; i++) {
      const e = estado(h, iso(d));
      if (neutro(e)) { d = sumaDias(d, -1); continue; }
      if (logrado(e)) n++;
      else if (e === 'hoy') { d = sumaDias(d, -1); continue; }
      else break;
      d = sumaDias(d, -1);
    }
    return n;
  }

  function record(h) {
    const fechas = Object.keys(S.marcas).sort();
    if (!fechas.length) return 0;
    let mejor = 0, run = 0;
    let d = desdeISO(fechas[0]);
    const fin = new Date();
    while (d <= fin) {
      const e = estado(h, iso(d));
      if (logrado(e)) { run++; if (run > mejor) mejor = run; }
      else if (neutro(e) || e === 'hoy' || e === 'fut') { /* no corta */ }
      else run = 0;
      d = sumaDias(d, 1);
    }
    return mejor;
  }

  function enRiesgo() {
    const ayer = iso(sumaDias(new Date(), -1)), hoy = hoyISO();
    return S.def.filter(function (h) {
      return estado(h, ayer) === 'no' && toca(h, hoy) && !marcado(h, hoy);
    });
  }
  function delDia(fecha) { return ordenados().filter(function (h) { return toca(h, fecha); }); }

  function toggle(id, fecha) {
    if (fecha > hoyISO()) return;
    const h = S.def.filter(function (x) { return x.id === id; })[0];
    if (!h) return;
    /* Con meta > 1 cada toque suma un paso; al completar, el siguiente vuelve
       a cero. Con meta 1 es el interruptor de siempre. */
    const m = meta(h), v = valor(h, fecha);
    const n = v >= m ? 0 : v + 1;
    if (!S.marcas[fecha]) S.marcas[fecha] = {};
    if (n === 0) delete S.marcas[fecha][id];
    else S.marcas[fecha][id] = n;
    if (!Object.keys(S.marcas[fecha]).length) delete S.marcas[fecha];
    guardar();
    pintar();
    if (fichaId) pintarFicha();
  }

  function diasDelMes(base) {
    const y = base.getFullYear(), m = base.getMonth();
    const n = new Date(y, m + 1, 0).getDate(), out = [];
    for (let i = 1; i <= n; i++) out.push(iso(new Date(y, m, i)));
    return out;
  }

  function statsMes(base) {
    const dias = diasDelMes(base), hoy = hoyISO();
    let ok = 0, tot = 0, redondos = 0;
    dias.forEach(function (f) {
      if (f > hoy) return;
      let todo = true, alguno = false;
      S.def.forEach(function (h) {
        const e = estado(h, f);
        if (neutro(e) || e === 'fut') return;
        if (e === 'hoy') { todo = false; return; }
        tot++; alguno = true;
        if (logrado(e)) ok++; else todo = false;
      });
      if (alguno && todo) redondos++;
    });
    return { ok: ok, tot: tot, pct: tot ? Math.round(ok / tot * 100) : 0, redondos: redondos };
  }

  const esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
    });
  };
  const colRacha = function (r) { return r >= 7 ? 'var(--g)' : (r >= 3 ? 'var(--w)' : 'var(--text3)'); };
  const svgIco = function (nombre, color, px) {
    const d = ICO[nombre] || ICO.punto;
    return '<svg viewBox="0 0 24 24" width="' + (px || 14) + '" height="' + (px || 14) + '" fill="none" ' +
      'stroke="' + esc(color) + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="' + d + '"></path></svg>';
  };

  /* ══════════════════════════════════════════════════════════════════════
     PINTADO
     ══════════════════════════════════════════════════════════════════════ */
  function pintar() {
    const raiz = document.getElementById('habitosSlide');
    if (!raiz) return;
    if (!S) cargar();
    if (!mesVisto) mesVisto = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    const hoy = hoyISO();
    const dias = diasDelMes(mesVisto);
    const st = statsMes(mesVisto);
    const hoyEnMes = dias.indexOf(hoy) >= 0;
    const deHoy = delDia(hoy);
    const hechosHoy = deHoy.filter(function (h) { return marcado(h, hoy); }).length;
    /* El CONTADOR cuenta hábitos cerrados (dos litros de tres no es un hábito
       hecho), pero la BARRA cuenta pasos: así cada litro la mueve un poco en vez
       de dejarla quieta hasta el tercero. */
    const pasosHoy = deHoy.reduce(function (a, h) {
      return a + Math.min(valor(h, hoy) / meta(h), 1);
    }, 0);
    const pctHoy = deHoy.length ? Math.round(pasosHoy / deHoy.length * 100) : 0;
    const riesgo = enRiesgo();

    const mejor = S.def.reduce(function (a, h) {
      const r = racha(h);
      return r > a.r ? { r: r, n: h.nombre } : a;
    }, { r: 0, n: '—' });

    /* ── Cabecera de días: la letra; el número va dentro de cada celda ── */
    const cabDias = dias.map(function (f) {
      const d = desdeISO(f), w = d.getDay(), fin = w === 0 || w === 6;
      const col = f === hoy ? 'var(--w)' : (fin ? 'rgba(var(--ov),.3)' : 'var(--text3)');
      return '<div class="hb2-dn" style="color:' + col + '">' + DOW_N[w] + '</div>';
    }).join('');

    /* ── Filas ─────────────────────────────────────────────────────────── */
    const filas = ordenados().map(function (h) {
      const r = racha(h), rec = Math.max(record(h), r);
      const peligro = riesgo.some(function (x) { return x.id === h.id; });
      const celdas = dias.map(function (f) {
        const e = estado(h, f), d = desdeISO(f), w = d.getDay();
        const cls = e === 'pre' ? 'off' : e;
        const fondo = f === hoy ? ' hb2-colhoy' : ((w === 0 || w === 6) ? ' hb2-finde' : '');
        const clic = f <= hoy ? ' onclick="HB.toggle(\'' + h.id + '\',\'' + f + '\')"' : '';
        /* Con meta > 1, un día a medias se pinta con el relleno subiendo desde
           abajo: dos litros de tres se ven como dos tercios de celda. Sin esto,
           beber dos litros y beber cero se verían exactamente igual. */
        const m = meta(h), v = valor(h, f);
        const parcial = m > 1 && v > 0 && v < m
          ? '<u style="height:' + Math.round(v / m * 100) + '%"></u>' : '';
        const tit = h.nombre + ' · ' + d.getDate() + ' ' + MESES[d.getMonth()] +
          (m > 1 ? ' · ' + v + ' de ' + m : '');
        return '<div class="hb2-c hb2-' + cls + (parcial ? ' hb2-parc' : '') + fondo + '"' +
          clic + ' title="' + esc(tit) + '">' + parcial + '<span>' + d.getDate() + '</span></div>';
      }).join('');

      return '<div class="hb2-fila' + (peligro ? ' peligro' : '') + '">' +
        '<button class="hb2-nom" onclick="HB.ficha(\'' + h.id + '\')" title="Ver la ficha de este hábito">' +
          '<span class="hb2-ico">' + svgIco(h.ico, h.color, 14) + '</span>' +
          '<span class="hb2-nom-t">' +
            '<span class="hb2-nom-n">' + esc(h.nombre) + '</span>' +
            '<span class="hb2-nom-a">' +
              (h.hora ? '<b>' + esc(h.hora) + '</b>' : '<b>Todo el día</b>') +
              (h.ancla ? ' · ' + esc(h.ancla) : '') + '</span>' +
          '</span>' +
        '</button>' +
        '<div class="hb2-celdas">' + celdas + '</div>' +
        '<div class="hb2-rac">' +
          '<span class="hb2-rac-n"><b style="color:' + colRacha(r) + '">' + r + '</b>' +
            '<i><u style="width:' + (rec ? Math.round(Math.min(r / rec, 1) * 100) : 0) + '%;' +
            'background:' + colRacha(r) + '"></u></i></span>' +
          '<span class="hb2-rec">' + rec + '</span>' +
        '</div>' +
      '</div>';
    }).join('');

    /* ── La lectura vertical: cuántos cerró cada día ───────────────────── */
    const MAXH = 22;
    const totales = dias.map(function (f) {
      let ok = 0, tot = 0;
      S.def.forEach(function (h) {
        const e = estado(h, f);
        if (neutro(e) || e === 'fut') return;
        tot++;
        if (logrado(e)) ok++;
      });
      if (!tot || f > hoy) return '<div class="hb2-tt"><span></span><i><u style="height:2px;' +
        'background:rgba(var(--ov),.05)"></u></i></div>';
      const p = ok / tot;
      const bg = p === 1 ? 'rgba(var(--g-rgb),.85)' : (p >= .6 ? 'rgba(var(--w-rgb),.8)' : 'rgba(var(--r-rgb),.7)');
      const col = p === 1 ? 'var(--g)' : (p >= .6 ? 'var(--w)' : 'var(--r)');
      return '<div class="hb2-tt"><span style="color:' + col + '">' + ok + '</span>' +
        '<i><u style="height:' + Math.max(3, Math.round(p * MAXH)) + 'px;background:' + bg + '"></u></i></div>';
    }).join('');

    /* ── Chips de hoy ──────────────────────────────────────────────────── */
    const chips = deHoy.length ? deHoy.map(function (h) {
      const hecho = marcado(h, hoy), m = meta(h), v = valor(h, hoy);
      /* El de varios pasos lleva su cuenta al lado y la casilla a medio llenar:
         es la señal de que falta poco, que es justo lo que empuja a cerrarlo. */
      const caja = hecho
        ? '<svg viewBox="0 0 24 24"><path d="M5 12.5 10 17.5 19 7"/></svg>'
        : (m > 1 && v > 0 ? '<u style="height:' + Math.round(v / m * 100) + '%"></u>' : '');
      return '<button class="hb2-chip' + (hecho ? ' on' : '') + '" onclick="HB.toggle(\'' + h.id + '\',\'' + hoy + '\')">' +
        '<span class="hb2-box">' + caja + '</span>' + esc(h.nombre) +
        (m > 1 ? '<i class="hb2-chip-n">' + v + '/' + m + '</i>' : '') + '</button>';
    }).join('') : '<div class="hb2-vacio">Hoy no toca ninguno. Día libre de verdad, no un fallo.</div>';

    /* ── Aviso: solo existe si de verdad hay algo en riesgo ────────────── */
    const nomR = riesgo.slice(0, 3).map(function (h) { return h.nombre; }).join(', ') +
      (riesgo.length > 3 ? ' y ' + (riesgo.length - 3) + ' más' : '');
    const aviso = riesgo.length ? (
      '<div class="hb2-panel hb2-hot hb2-aviso">' +
        '<div class="hb2-aviso-h">' + ICO_ALERTA + '<span>Nunca falles dos veces seguidas</span></div>' +
        '<div class="hb2-aviso-d"><b>' + esc(nomR) + '</b> ' +
        (riesgo.length > 1 ? 'se cayeron' : 'se cayó') + ' ayer. Un fallo es un accidente; ' +
        'dos seguidos es el principio de dejarlo.</div>' +
      '</div>'
    ) : (
      '<div class="hb2-panel hb2-aviso">' +
        '<div class="hb2-aviso-h" style="color:var(--g)">' + ICO_ESCUDO + '<span>Cadena intacta</span></div>' +
        '<div class="hb2-aviso-d">Nada se cayó ayer. El día que algo falle, aparece aquí — ' +
        'y ese día es el que decide si el hábito sobrevive.</div>' +
      '</div>'
    );

    const finMes = new Date(mesVisto.getFullYear(), mesVisto.getMonth() + 1, 1) <= new Date();

    raiz.innerHTML =
      /* ── Cabecera ─────────────────────────────────────────────────── */
      '<div class="hb2-hd">' +
        '<div>' +
          '<div class="hb2-eyebrow"><span class="hb2-dot"></span>' +
            '<span class="hb2-k" style="color:var(--cy)">Hábitos · sistema de constancia</span>' +
            '<span class="hb2-linea"></span></div>' +
          '<div class="hb2-titulo">La cadena que no se rompe</div>' +
          fraseHTML() +
        '</div>' +
        '<div class="hb2-hd-r">' +
          '<div class="hb2-panel hb2-mes">' +
            '<button class="hb2-mb" onclick="HB.mes(-1)" title="Mes anterior">‹</button>' +
            '<span>' + MESES[mesVisto.getMonth()].slice(0, 3) + ' ' + mesVisto.getFullYear() + '</span>' +
            '<button class="hb2-mb" onclick="HB.mes(1)" title="Mes siguiente"' + (finMes ? '' : ' disabled') + '>›</button>' +
          '</div>' +
          (hoyEnMes ? '<div class="hb2-panel hb2-hoypill">' +
            '<span class="hb2-k" style="color:var(--w)">Hoy</span>' +
            '<span class="hb2-hoypill-n"><b>' + hechosHoy + '</b><i>/' + deHoy.length + '</i></span></div>' : '') +
        '</div>' +
      '</div>' +

      /* ── Telemetría ───────────────────────────────────────────────── */
      '<div class="hb2-tel">' +
        anilloHTML(st) +
        acumuladoHTML(dias, hoy) +
        perfilHTML() +
        '<div class="hb2-kpis">' +
          kpi(mejor.r, 'días', 'Racha viva', 'var(--o)') +
          kpi(st.redondos, 'días', 'Redondos', 'var(--p)') +
          kpi(st.ok, 'marcas', 'Este mes', 'var(--cy)') +
          kpi(riesgo.length, 'en riesgo', riesgo.length ? 'Falló ayer' : 'Nada colgando', 'var(--r)', riesgo.length > 0) +
        '</div>' +
      '</div>' +

      /* ── Cuadrícula ───────────────────────────────────────────────── */
      '<div class="hb2-panel hb2-grid">' +
        '<div class="hb2-grid-hd">' +
          '<div class="hb2-grid-t">' +
            '<span class="hb2-k" style="color:var(--cy)">Cuadrícula del mes</span>' +
            '<span class="hb2-linea"></span>' +
            '<span class="hb2-k" style="font-size:7.5px">' + S.def.length + ' hábitos · ' + dias.length + ' días · toca un día pasado para corregirlo</span>' +
          '</div>' +
          '<button class="hb2-add" onclick="HB.nuevo()">' + ICO_MAS + ' Hábito</button>' +
          '<div class="hb2-leg">' +
            leg('ok', 'Hecho') + leg('no', 'Fallé') + leg('off', 'No tocaba') + leg('hoy', 'Hoy') +
          '</div>' +
        '</div>' +
        '<div class="hb2-scroll"><div class="hb2-tabla">' +
          '<div class="hb2-cab"><div class="hb2-nom-sp"></div>' +
            '<div class="hb2-celdas">' + cabDias + '</div>' +
            '<div class="hb2-rac"><span class="hb2-k" style="font-size:7.5px">Racha</span>' +
            '<span class="hb2-k" style="font-size:7.5px;opacity:.55">Récord</span></div></div>' +
          '<div class="hb2-filasw"><div class="hb2-filas">' + filas + '</div></div>' +
          '<div class="hb2-tot"><div class="hb2-nom-sp">' +
            '<span class="hb2-k" style="color:var(--cy);font-size:8px">Cuántos cerraste ese día</span></div>' +
            '<div class="hb2-celdas">' + totales + '</div>' +
            '<div class="hb2-rac"></div></div>' +
        '</div></div>' +
      '</div>' +

      /* ── Pie ──────────────────────────────────────────────────────── */
      '<div class="hb2-pie">' +
        aviso +
        '<div class="hb2-panel hb2-hoy">' +
          '<div class="hb2-hoy-n"><span class="hb2-k">Lo de hoy</span>' +
            '<span><b>' + hechosHoy + '</b><i>/' + deHoy.length + '</i></span>' +
            '<div class="hb2-barra"><u style="width:' + pctHoy + '%"></u></div></div>' +
          '<div class="hb2-sep"></div>' +
          '<div class="hb2-chips">' + chips + '</div>' +
        '</div>' +
      '</div>';
  }

  /* ── Gráfica 1 · El anillo: el titular del mes ───────────────────────── */
  function anilloHTML(st) {
    const R = 50, C = 2 * Math.PI * R;
    const arco = (C * st.pct / 100).toFixed(1) + ' ' + C.toFixed(1);
    return '<div class="hb2-panel hb2-anillo">' +
      '<div class="hb2-k">Cumplido · ' + MESES[mesVisto.getMonth()].slice(0, 3) + '</div>' +
      '<div class="hb2-anillo-w">' +
        '<svg viewBox="0 0 120 120">' +
          '<circle cx="60" cy="60" r="50" fill="none" stroke="rgba(var(--ov),.08)" stroke-width="11"></circle>' +
          '<circle cx="60" cy="60" r="50" fill="none" stroke="var(--cy)" stroke-width="11" ' +
            'stroke-linecap="round" stroke-dasharray="' + arco + '"></circle>' +
        '</svg>' +
        '<div class="hb2-anillo-c"><b>' + st.pct + '</b><i>' + st.ok + '/' + st.tot + '</i></div>' +
      '</div></div>';
  }

  /* ── Gráfica 2 · Cómo va el mes: el acumulado día a día ──────────────
     No es el % de cada día suelto (eso ya lo cuenta la fila de totales al pie
     de la cuadrícula): es el del mes calculado HASTA cada día. Sube cuando
     cierras días completos y cae cuando no. */
  function acumuladoHTML(dias, hoy) {
    const serie = [];
    let ok = 0, tot = 0;
    dias.forEach(function (f) {
      if (f >= hoy) return;
      S.def.forEach(function (h) {
        const e = estado(h, f);
        if (neutro(e) || e === 'fut' || e === 'hoy') return;
        tot++;
        if (logrado(e)) ok++;
      });
      if (tot) serie.push({ d: desdeISO(f).getDate(), pct: Math.round(ok / tot * 100) });
    });

    if (serie.length < 2) {
      return '<div class="hb2-panel hb2-acum">' +
        '<div class="hb2-k">Cómo va el mes · acumulado</div>' +
        '<div class="hb2-sindatos">Con dos días marcados empieza a dibujarse.</div></div>';
    }

    const W = 420, H = 96, P = 10;
    const paso = (W - P * 2) / (serie.length - 1);
    const yDe = function (p) { return H - P - (p / 100) * (H - P * 2); };
    const pts = serie.map(function (s, i) {
      return { x: +(P + i * paso).toFixed(1), y: +yDe(s.pct).toFixed(1), pct: s.pct, d: s.d };
    });
    const linea = pts.map(function (p, i) { return (i ? 'L' : 'M') + p.x + ' ' + p.y; }).join(' ');
    const area = linea + ' L' + pts[pts.length - 1].x + ' ' + H + ' L' + pts[0].x + ' ' + H + ' Z';

    /* Solo cuatro etiquetas: con una por día se amontonan y no se lee ninguna */
    const marcas = [0, Math.floor((pts.length - 1) / 3), Math.floor((pts.length - 1) * 2 / 3), pts.length - 1];
    const ejes = pts.map(function (p, i) {
      return '<span>' + (marcas.indexOf(i) >= 0 ? p.d : '') + '</span>';
    }).join('');

    let dif = '—', dcol = 'var(--text3)';
    if (serie.length >= 4) {
      const v = serie[serie.length - 1].pct - serie[serie.length - 4].pct;
      dif = (v > 0 ? '+' : '') + v + ' pts';
      dcol = v > 0 ? 'var(--g)' : (v < 0 ? 'var(--r)' : 'var(--text3)');
    }

    const circulos = pts.map(function (p, i) {
      const ult = i === pts.length - 1;
      return '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + (ult ? 4.5 : 2.5) + '" ' +
        'fill="var(--bg)" stroke="var(--g)" stroke-width="2" opacity="' + (ult ? 1 : .45) + '"></circle>';
    }).join('');

    return '<div class="hb2-panel hb2-acum">' +
      '<div class="hb2-acum-hd">' +
        '<div class="hb2-k">Cómo va el mes · acumulado</div>' +
        '<div class="hb2-acum-d"><b style="color:' + dcol + '">' + dif + '</b>' +
          '<span class="hb2-k" style="font-size:7.5px">últimos 3 días</span></div>' +
      '</div>' +
      '<svg class="hb2-acum-g" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none">' +
        '<defs><linearGradient id="hb2Area" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#00e87a" stop-opacity=".45"></stop>' +
          '<stop offset="100%" stop-color="#00e87a" stop-opacity="0"></stop>' +
        '</linearGradient></defs>' +
        '<line x1="0" y1="24" x2="' + W + '" y2="24" stroke="rgba(var(--ov),.07)"></line>' +
        '<line x1="0" y1="58" x2="' + W + '" y2="58" stroke="rgba(var(--ov),.07)"></line>' +
        '<path d="' + area + '" fill="url(#hb2Area)"></path>' +
        '<path d="' + linea + '" fill="none" stroke="var(--g)" stroke-width="2" ' +
          'stroke-linecap="round" stroke-linejoin="round"></path>' +
        circulos +
      '</svg>' +
      '<div class="hb2-acum-x">' + ejes + '</div>' +
    '</div>';
  }

  /* ── Gráfica 3 · Perfil por día de la semana ─────────────────────────
     El único dato de la pantalla que dice DÓNDE se cae, no solo cuánto. */
  function perfilHTML() {
    const acum = [0,0,0,0,0,0,0].map(function () { return { ok: 0, tot: 0 }; });
    const hoy = hoyISO();
    let d = sumaDias(new Date(), -90);
    while (iso(d) < hoy) {
      const f = iso(d), w = d.getDay();
      S.def.forEach(function (h) {
        const e = estado(h, f);
        if (!cuenta(e)) return;
        acum[w].tot++;
        if (logrado(e)) acum[w].ok++;
      });
      d = sumaDias(d, 1);
    }
    const MAXB = 74;
    const barras = acum.map(function (x, i) {
      const pct = x.tot ? Math.round(x.ok / x.tot * 100) : null;
      const bg = pct === null ? 'rgba(var(--ov),.08)'
        : (pct < 60 ? 'var(--r)' : (pct < 80 ? 'var(--w)' : 'rgba(var(--g-rgb),.8)'));
      const col = pct === null ? 'var(--text3)' : (pct < 60 ? 'var(--r)' : 'var(--text3)');
      return '<div class="hb2-pb">' +
        '<span style="color:' + col + '">' + (pct === null ? '—' : pct + '%') + '</span>' +
        '<u style="height:' + (pct === null ? 3 : Math.max(4, Math.round(pct / 100 * MAXB))) + 'px;background:' + bg + '"></u>' +
        '<i style="color:' + col + '">' + DOW_N[i] + '</i></div>';
    }).join('');
    return '<div class="hb2-panel hb2-perfil">' +
      '<div class="hb2-k">Perfil por día de la semana</div>' +
      '<div class="hb2-pbs">' + barras + '</div></div>';
  }

  /* La frase del día. Está debajo del título, que es donde se lee antes de
     mirar ningún número — y cambia con la fecha, no con cada repintado. */
  function fraseHTML() {
    const f = fraseDelDia();
    return '<div class="hb2-frase">' +
      '<span class="hb2-frase-t">' + esc(f[0]) + '</span>' +
      (f[1] ? '<span class="hb2-frase-a">' + esc(f[1]) + '</span>' : '') +
    '</div>';
  }

  function kpi(n, uni, lbl, col, alerta) {
    return '<div class="hb2-panel hb2-kpi' + (alerta ? ' hb2-hot' : '') + '">' +
      '<div class="hb2-kpi-v"><b style="color:' + col + '">' + n + '</b>' +
      '<span class="hb2-k" style="font-size:7.5px' + (alerta ? ';color:var(--r)' : '') + '">' + uni + '</span></div>' +
      '<div class="hb2-k" style="font-size:7.5px' + (alerta ? ';color:var(--r)' : '') + '">' + esc(lbl) + '</div></div>';
  }
  function leg(cls, txt) {
    return '<span class="hb2-leg-i"><i class="hb2-c hb2-' + cls + '"></i>' + txt + '</span>';
  }

  /* ══════════════════════════════════════════════════════════════════════
     LA FICHA — donde vive lo que de verdad ayuda a sostener un hábito
     ══════════════════════════════════════════════════════════════════════ */
  function pintarFicha() {
    const ov = document.getElementById('hb2Ficha');
    if (!ov || !fichaId) return;
    const h = S.def.filter(function (x) { return x.id === fichaId; })[0];
    if (!h) { cerrarFicha(); return; }

    const hoy = hoyISO();
    const r = racha(h), rec = Math.max(record(h), r);
    const base = mesVisto || new Date();
    const dias = diasDelMes(base);

    const primero = desdeISO(dias[0]).getDay();
    let cal = '';
    for (let i = 0; i < primero; i++) cal += '<div class="hb2-fd"></div>';
    dias.forEach(function (f) {
      const e = estado(h, f), cls = e === 'pre' ? 'off' : e;
      const clic = f <= hoy ? ' onclick="HB.toggle(\'' + h.id + '\',\'' + f + '\')"' : '';
      cal += '<div class="hb2-fd hb2-f-' + cls + '"' + clic + '>' + desdeISO(f).getDate() + '</div>';
    });

    /* Cumplimiento por día de la semana: dice DÓNDE se cae este hábito */
    const porDow = [0,0,0,0,0,0,0].map(function () { return { ok: 0, tot: 0 }; });
    let d = sumaDias(new Date(), -90);
    while (iso(d) < hoy) {
      const f = iso(d), e = estado(h, f);
      if (cuenta(e)) { const k = d.getDay(); porDow[k].tot++; if (logrado(e)) porDow[k].ok++; }
      d = sumaDias(d, 1);
    }
    const conDatos = porDow.filter(function (x) { return x.tot > 0; });
    const MAXH = 92;
    const barras = porDow.map(function (x, i) {
      const pct = x.tot ? Math.round(x.ok / x.tot * 100) : null;
      const bg = pct === null ? 'rgba(var(--ov),.08)'
        : (pct < 60 ? 'var(--r)' : (pct < 80 ? 'var(--w)' : 'rgba(var(--g-rgb),.8)'));
      const col = pct === null ? 'var(--text3)' : (pct < 60 ? 'var(--r)' : 'var(--text3)');
      return '<div class="hb2-pb"><span style="color:' + col + '">' + (pct === null ? '—' : pct + '%') + '</span>' +
        '<u style="height:' + (pct === null ? 4 : Math.max(6, Math.round(pct / 100 * MAXH))) + 'px;background:' + bg + '"></u>' +
        '<i style="color:' + col + '">' + DOW_N[i] + '</i></div>';
    }).join('');

    let consejo = '';
    if (conDatos.length >= 3) {
      let peor = -1, peorPct = 101;
      porDow.forEach(function (x, i) {
        if (x.tot < 3) return;
        const p = Math.round(x.ok / x.tot * 100);
        if (p < peorPct) { peorPct = p; peor = i; }
      });
      if (peor >= 0 && peorPct < 70)
        consejo = '<div class="hb2-consejo">' + ICO_BOMBILLA +
          '<div>Los <b>' + DOW_LARGO[peor] + '</b> caes al ' + peorPct + '%. ' +
          'Ahí el problema no es la fuerza de voluntad, es la hora: mueve el bloque ese día.</div></div>';
    }

    const ayer = iso(sumaDias(new Date(), -1));
    const peligro = estado(h, ayer) === 'no' && toca(h, hoy) && !marcado(h, hoy);

    ov.innerHTML =
      '<div class="hb2-ficha-card" onclick="event.stopPropagation()">' +
        '<button class="hb2-x" onclick="HB.cerrarFicha()" aria-label="Cerrar">✕</button>' +
        '<div class="hb2-eyebrow"><span class="hb2-dot" style="background:' + esc(h.color) + ';box-shadow:0 0 10px ' + esc(h.color) + '"></span>' +
          '<span class="hb2-k" style="color:' + esc(h.color) + '">Ficha del hábito</span>' +
          '<span class="hb2-linea"></span></div>' +
        '<div class="hb2-ficha-t">' + svgIco(h.ico, h.color, 20) + '<span>' + esc(h.nombre) + '</span></div>' +
        '<div class="hb2-ficha-a">' + ICO_ANCLA + '<span>' +
          (h.ancla ? esc(h.ancla) : '<i style="color:var(--text3)">Sin anclaje — añádele uno, es lo que hace que ocurra</i>') +
        '</span></div>' +
        '<div class="hb2-ficha-dow">' + (h.hora ? '<b>' + esc(h.hora) + '</b> · ' : '') +
          (h.dow === 'todos' ? 'Todos los días'
          : 'Toca los ' + h.dow.map(function (i) { return DOW_LARGO[i]; }).join(', ')) + '</div>' +
        '<div class="hb2-ficha-cols">' +
        '<div class="hb2-ficha-col">' +
        queHacerHTML(h) +

        '<div class="hb2-panel hb2-ficha-rac">' +
          '<div class="hb2-ficha-rac-r">' +
            '<div><span class="hb2-k">Racha ahora</span>' +
              '<div class="hb2-ficha-big" style="color:var(--o)">' + r + '<i>días</i></div></div>' +
            '<div style="text-align:right"><span class="hb2-k">Tu récord</span>' +
              '<div class="hb2-ficha-big" style="color:var(--w);font-size:20px">' + rec + '</div></div>' +
          '</div>' +
          '<div class="hb2-ficha-bar"><u style="width:' + (rec ? Math.round(Math.min(r / rec, 1) * 100) : 0) + '%"></u></div>' +
        '</div>' +

        (peligro ? '<div class="hb2-panel hb2-hot hb2-aviso">' +
            '<div class="hb2-aviso-h">' + ICO_ALERTA + '<span>Hoy es el día que cuenta</span></div>' +
            '<div class="hb2-aviso-d">Fallaste ayer. Hacerlo hoy corta la caída en un día; ' +
            'saltártelo lo convierte en la primera semana de haberlo dejado.</div></div>' : '') +
        '</div>' +
        '<div class="hb2-ficha-col">' +
        '<div class="hb2-panel hb2-ficha-cal">' +
          '<div class="hb2-ficha-cal-hd"><span class="hb2-k" style="color:var(--cy)">' +
            MESES[base.getMonth()] + '</span>' +
            '<span class="hb2-k" style="font-size:7.5px">Toca un día para corregirlo</span></div>' +
          '<div class="hb2-fdow">' + DOW_N.map(function (n) { return '<span>' + n + '</span>'; }).join('') + '</div>' +
          '<div class="hb2-fcal">' + cal + '</div>' +
        '</div>' +

        '<div class="hb2-panel hb2-ficha-bars">' +
          '<span class="hb2-k" style="color:var(--cy)">Dónde se te cae</span>' +
          '<div class="hb2-ficha-sub">Cumplimiento por día de la semana, últimos 90 días.</div>' +
          '<div class="hb2-pbs">' + barras + '</div>' + consejo +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="hb2-ficha-pie">' +
          '<button class="hb2-b" onclick="HB.editar(\'' + h.id + '\')">' + ICO_LAPIZ + ' Editar</button>' +
          '<button class="hb2-b hb2-b-r" onclick="HB.borrar(\'' + h.id + '\')">' + ICO_BOTE + ' Borrar</button>' +
        '</div>' +
      '</div>';
    ov.classList.add('open');
  }

  /* ── QUÉ HACER: el detalle del hábito, leído de donde ya vive ────────
     Tres fuentes, en este orden: el día de GYM_RUTINA_DEFAULT que toca hoy
     (gym), las subtareas del bloque de RUTINA_TASKS (rutina, filtrado por sec)
     y los `pasos` propios. Ninguna se copia: si Adán cambia un producto en la
     rutina o un ejercicio en Ejercicio, la ficha lo refleja sola. */
  const resuelve = function (t) {
    return (typeof CIFRAS !== 'undefined' && CIFRAS.texto) ? CIFRAS.texto(t) : t;
  };
  function queHacerHTML(h) {
    const partes = [];

    if (h.gym && typeof GYM_RUTINA_DEFAULT !== 'undefined') {
      const w = new Date().getDay();
      const hoyToca = toca(h, hoyISO());
      const dia = GYM_RUTINA_DEFAULT[w];
      if (hoyToca && dia && dia.foco) {
        partes.push('<div class="hb2-qh-hoy"><span class="hb2-k" style="color:var(--o)">Hoy · ' +
          DOW_LARGO[w].replace(/s$/, '') + '</span>' +
          '<b>' + esc(dia.nombre) + '</b><p>' + esc(dia.foco.replace(/<[^>]+>/g, '')) + '</p></div>');
      }
      const semana = (h.dow === 'todos' ? [1,2,3,4,5,6,0] : h.dow).map(function (d) {
        const x = GYM_RUTINA_DEFAULT[d];
        return x ? '<li><b>' + DOW_N[d] + '</b> ' + esc(x.nombre) + '</li>' : '';
      }).join('');
      if (semana) partes.push('<ul class="hb2-qh-sem">' + semana + '</ul>');
    }

    if (h.rutina && typeof CIFRAS !== 'undefined' && CIFRAS.rutina) {
      const bloque = CIFRAS.rutina('').filter(function (t) { return t.id === h.rutina; })[0];
      if (bloque && bloque.subtareas && bloque.subtareas.length) {
        let sec = null, html = '';
        bloque.subtareas.forEach(function (st) {
          if (st.sec) sec = st.sec;
          if (h.sec && sec !== h.sec) return;
          if (st.sec && !h.sec) html += '<li class="hb2-qh-sec">' + esc(st.sec) + '</li>';
          html += '<li>' + resuelve(st.txt) + '</li>';
        });
        if (html) partes.push('<ul class="hb2-qh-lista">' + html + '</ul>');
      }
    }

    if (h.pasos && h.pasos.length) {
      partes.push('<ul class="hb2-qh-lista">' +
        h.pasos.map(function (p) { return '<li>' + esc(resuelve(p)) + '</li>'; }).join('') + '</ul>');
    }

    if (!partes.length) {
      partes.push('<div class="hb2-qh-vacio">Sin detalle todavía. Edítalo y escribe, una línea por paso, ' +
        'qué haces exactamente cuando toca.</div>');
    }

    return '<div class="hb2-panel hb2-qh">' +
      '<div class="hb2-qh-hd"><span class="hb2-k" style="color:var(--cy)">Qué hacer</span>' +
      '<span class="hb2-linea"></span></div>' + partes.join('') + '</div>';
  }

  /* ══════════════════════════════════════════════════════════════════════
     EDITOR
     ══════════════════════════════════════════════════════════════════════ */
  function editor(h) {
    const ov = document.getElementById('hb2Ficha');
    const nuevo = !h;
    const v = h || { id:'', nombre:'', ancla:'', hora:'', color: PALETA[S.def.length % PALETA.length],
                     ico: 'punto', dow: 'todos' };
    const todos = v.dow === 'todos';

    ov.innerHTML =
      '<div class="hb2-ficha-card hb2-ed" onclick="event.stopPropagation()">' +
        '<button class="hb2-x" onclick="HB.cerrarFicha()" aria-label="Cerrar">✕</button>' +
        '<div class="hb2-eyebrow"><span class="hb2-dot"></span>' +
          '<span class="hb2-k" style="color:var(--cy)">' + (nuevo ? 'Nuevo hábito' : 'Editar hábito') + '</span>' +
          '<span class="hb2-linea"></span></div>' +
        '<div class="hb2-ficha-t" style="margin-bottom:16px"><span>' +
          (nuevo ? '¿Qué vas a sostener?' : esc(v.nombre)) + '</span></div>' +

        '<label class="hb2-lbl">Nombre</label>' +
        '<input class="hb2-in" id="hbEdN" value="' + esc(v.nombre) + '" placeholder="Leer 10 páginas" maxlength="40">' +

        '<div class="hb2-ed-2">' +
          '<div><label class="hb2-lbl">Hora <i>— ordena la lista</i></label>' +
          '<input class="hb2-in" id="hbEdH" type="time" value="' + esc(v.hora || '') + '"></div>' +
          '<div style="flex:1"><label class="hb2-lbl">Anclaje <i>— después de qué cosa que ya haces</i></label>' +
          '<input class="hb2-in" id="hbEdA" value="' + esc(v.ancla) + '" placeholder="Al acostarme, tras dejar el móvil" maxlength="60"></div>' +
        '</div>' +

        '<label class="hb2-lbl">Qué hacer <i>— una línea por paso</i></label>' +
        '<textarea class="hb2-in hb2-ta" id="hbEdP" rows="4" placeholder="Abre el proyecto y anota una mejora&#10;Constrúyela y súbela">' +
          esc((v.pasos || []).join('\n')) + '</textarea>' +
        (v.rutina || v.gym ? '<div class="hb2-lbl-nota">Además, la ficha enseña ' +
          (v.gym ? 'el día de gimnasio que toca (desde Ejercicio)' : 'los pasos de tu rutina (desde datos maestros)') +
          ', que se editan allí.</div>' : '') +
        '<label class="hb2-lbl">Qué días toca</label>' +
        '<div class="hb2-dows">' +
          '<button class="hb2-dow' + (todos ? ' on' : '') + '" data-d="todos" onclick="HB.edDow(\'todos\')">Todos</button>' +
          DOW_N.map(function (n, i) {
            const on = !todos && v.dow.indexOf(i) >= 0;
            return '<button class="hb2-dow' + (on ? ' on' : '') + '" data-d="' + i + '" onclick="HB.edDow(' + i + ')">' + n + '</button>';
          }).join('') +
        '</div>' +

        '<label class="hb2-lbl">Icono</label>' +
        '<div class="hb2-icos">' +
          ICO_NOMBRES.map(function (n) {
            return '<button class="hb2-icb' + (n === v.ico ? ' on' : '') + '" data-i="' + n + '" ' +
              'onclick="HB.edIco(\'' + n + '\')">' + svgIco(n, 'currentColor', 15) + '</button>';
          }).join('') +
        '</div>' +

        '<label class="hb2-lbl">Color</label>' +
        '<div class="hb2-cols">' +
          PALETA.map(function (c) {
            return '<button class="hb2-col' + (c === v.color ? ' on' : '') + '" data-c="' + c + '" ' +
              'style="background:' + c + '" onclick="HB.edCol(\'' + c + '\')"></button>';
          }).join('') +
        '</div>' +

        '<div class="hb2-ficha-pie" style="margin-top:18px">' +
          '<button class="hb2-b hb2-b-g" onclick="HB.guardarEd(' + (nuevo ? 'null' : "'" + v.id + "'") + ')">' +
            ICO_CHECK + ' ' + (nuevo ? 'Crear' : 'Guardar') + '</button>' +
          '<button class="hb2-b" onclick="HB.cerrarFicha()">Cancelar</button>' +
        '</div>' +
      '</div>';
    ov.classList.add('open');
    ov.dataset.dow = todos ? 'todos' : v.dow.join(',');
    ov.dataset.col = v.color;
    ov.dataset.ico = v.ico;
    setTimeout(function () { const n = document.getElementById('hbEdN'); if (n) n.focus(); }, 40);
  }

  /* ── Iconos de interfaz ────────────────────────────────────────────── */
  const sv = function (d, w) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 1.8) +
      '" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
  };
  const ICO_ALERTA = sv('<path d="M12 3.5 22 20H2L12 3.5Z"/><path d="M12 10v4.5M12 17.3v.2"/>', 2);
  const ICO_ESCUDO = sv('<path d="M12 3 20 6v6c0 4.4-3.2 7.8-8 9-4.8-1.2-8-4.6-8-9V6l8-3Z"/><path d="M8.8 12.2l2.2 2.2 4.2-4.4"/>');
  const ICO_MAS = sv('<path d="M12 5v14M5 12h14"/>', 2);
  const ICO_ANCLA = sv('<path d="M9 6.5H6a3.5 3.5 0 0 0 0 7h3M15 17.5h3a3.5 3.5 0 0 0 0-7h-3"/><path d="M8.5 12h7"/>');
  const ICO_BOMBILLA = sv('<path d="M9.5 18h5M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.4.3.6.7.6 1.1h5.8c0-.4.2-.8.6-1.1A6 6 0 0 0 12 3Z"/>');
  const ICO_LAPIZ = sv('<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z"/><path d="M14.5 7.5 16.5 9.5"/>');
  const ICO_BOTE = sv('<path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>');
  const ICO_CHECK = sv('<path d="M5 12.5 10 17.5 19 7"/>', 2.4);

  /* ══════════════════════════════════════════════════════════════════════
     API PÚBLICA
     ══════════════════════════════════════════════════════════════════════ */
  const HB = {
    render: function () {
      cargar();
      if (!mesVisto) mesVisto = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      pintar();
    },
    toggle: function (id, f) { toggle(id, f); },
    mes: function (n) {
      const m = new Date(mesVisto.getFullYear(), mesVisto.getMonth() + n, 1);
      if (m > new Date()) return;
      mesVisto = m;
      pintar();
      if (fichaId) pintarFicha();
    },
    ficha: function (id) { fichaId = id; pintarFicha(); },
    cerrarFicha: function () {
      const ov = document.getElementById('hb2Ficha');
      if (ov) { ov.classList.remove('open'); ov.innerHTML = ''; }
      fichaId = null;
    },
    nuevo: function () { fichaId = null; editor(null); },
    editar: function (id) { editor(S.def.filter(function (h) { return h.id === id; })[0]); },

    edDow: function (d) {
      const ov = document.getElementById('hb2Ficha');
      let cur = ov.dataset.dow;
      if (d === 'todos') cur = 'todos';
      else {
        let arr = cur === 'todos' ? [] : cur.split(',').filter(function (x) { return x !== ''; }).map(Number);
        const i = arr.indexOf(d);
        if (i >= 0) arr.splice(i, 1); else arr.push(d);
        arr.sort();
        cur = arr.length ? arr.join(',') : 'todos';
      }
      ov.dataset.dow = cur;
      ov.querySelectorAll('.hb2-dow').forEach(function (b) {
        const v = b.dataset.d;
        b.classList.toggle('on', cur === 'todos' ? v === 'todos'
          : v !== 'todos' && cur.split(',').indexOf(v) >= 0);
      });
    },
    edCol: function (c) {
      const ov = document.getElementById('hb2Ficha');
      ov.dataset.col = c;
      ov.querySelectorAll('.hb2-col').forEach(function (b) { b.classList.toggle('on', b.dataset.c === c); });
    },
    edIco: function (n) {
      const ov = document.getElementById('hb2Ficha');
      ov.dataset.ico = n;
      ov.querySelectorAll('.hb2-icb').forEach(function (b) { b.classList.toggle('on', b.dataset.i === n); });
    },
    guardarEd: function (id) {
      const ov = document.getElementById('hb2Ficha');
      const nom = (document.getElementById('hbEdN').value || '').trim();
      if (!nom) { document.getElementById('hbEdN').focus(); return; }
      const ancla = (document.getElementById('hbEdA').value || '').trim();
      const hora = (document.getElementById('hbEdH').value || '').trim();
      const pasos = (document.getElementById('hbEdP').value || '').split('\n')
        .map(function (x) { return x.trim(); }).filter(function (x) { return x; });
      const dowS = ov.dataset.dow;
      const dow = dowS === 'todos' ? 'todos' : dowS.split(',').map(Number);
      const color = ov.dataset.col || PALETA[0];
      const ico = ov.dataset.ico || 'punto';

      if (id) {
        S.def.forEach(function (h) {
          if (h.id === id) { h.nombre = nom; h.ancla = ancla; h.hora = hora; h.dow = dow; h.color = color; h.ico = ico; h.pasos = pasos; }
        });
      } else {
        let base = nom.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8) || 'h';
        let nid = base, k = 2;
        while (S.def.some(function (h) { return h.id === nid; })) nid = base + (k++);
        S.def.push({ id: nid, nombre: nom, ancla: ancla, hora: hora, color: color, ico: ico, dow: dow, pasos: pasos, desde: hoyISO() });
      }
      guardar();
      HB.cerrarFicha();
      pintar();
    },
    borrar: function (id) {
      const h = S.def.filter(function (x) { return x.id === id; })[0];
      if (!h) return;
      if (!confirm('¿Borrar «' + h.nombre + '»? Se pierde también su historial de marcas.')) return;
      S.def = S.def.filter(function (x) { return x.id !== id; });
      Object.keys(S.marcas).forEach(function (f) {
        delete S.marcas[f][id];
        if (!Object.keys(S.marcas[f]).length) delete S.marcas[f];
      });
      guardar();
      HB.cerrarFicha();
      pintar();
    }
  };

  window.HB = HB;
  window.renderHabitos = function () { HB.render(); };

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    const ov = document.getElementById('hb2Ficha');
    if (ov && ov.classList.contains('open')) { e.stopPropagation(); HB.cerrarFicha(); }
  }, true);

  /* ══════════════════════════════════════════════════════════════════════
     ESTILOS — prefijo hb2- porque hb- ya es de Habilidades Base.
     Usa las variables del tema del Dashboard, así que sigue el modo
     claro/oscuro sin una sola regla extra.
     ══════════════════════════════════════════════════════════════════════ */
  const CSS = `
/* ── ESTA PANTALLA ES SIEMPRE OSCURA ───────────────────────────────────
   Un HUD sobre fondo blanco deja de ser un HUD: la retícula, las manchas y el
   glow de las celdas viven de un fondo casi negro. Así que el slide fija sus
   propias variables de superficie en vez de heredar el tema, igual que
   .theme-aleman fija los colores de su bandera. El resto del Dashboard sigue
   el tema claro/oscuro como siempre. */
.theme-habitos,.hb2-ficha-ov{
  --bg:#04040c; --text:#f4f4f8; --text2:#9a9db3; --text3:#7d8199;
  --ov:255,255,255;
  --g:#00e87a; --o:#ff8a3d; --w:#ffd93d; --r:#ff5c5c; --cy:#00e0c0; --p:#b06eff;
  --g-rgb:0,232,122; --o-rgb:255,138,61; --r-rgb:255,92,92; --w-rgb:255,217,61;
  --cy-rgb:0,224,192;
}
.theme-habitos{background:#04040c;padding-right:max(1.6vw,18px)}
/* Sin el tope de 1400px del resto de pantallas: aquí cada píxel de ancho es
   tamaño de celda, que es lo que Adán pidió. */
.theme-habitos .slide-inner{max-width:none}
.theme-habitos .slide-title,.theme-habitos .eyebrow{color:var(--text)}

/* ── EL FONDO: cuatro capas, todas CSS, ni una imagen ──────────────────
   Va en el <section> y no dentro de #habitosSlide, porque .slide-inner está
   limitado a 1400px y el fondo tiene que llegar a los bordes de la pantalla.
   Las manchas por defecto del slide se apagan: aquí manda esta retícula. */
.theme-habitos::before,.theme-habitos::after{display:none}
.hb2-bg{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}
.hb2-bg i{position:absolute;display:block}
.hb2-bg-net{inset:0;
  background-image:linear-gradient(rgba(var(--cy-rgb),.055) 1px,transparent 1px),
    linear-gradient(90deg,rgba(var(--cy-rgb),.055) 1px,transparent 1px);
  background-size:46px 46px;
  -webkit-mask-image:radial-gradient(ellipse 120% 85% at 50% 30%,#000 30%,transparent 78%);
  mask-image:radial-gradient(ellipse 120% 85% at 50% 30%,#000 30%,transparent 78%)}
.hb2-bg-a{width:1100px;height:760px;left:-240px;top:-380px;filter:blur(18px);
  background:radial-gradient(ellipse at center,rgba(var(--cy-rgb),.2),transparent 68%)}
.hb2-bg-b{width:1000px;height:700px;right:-220px;bottom:-320px;filter:blur(18px);
  background:radial-gradient(ellipse at center,rgba(176,110,255,.19),transparent 68%)}
.hb2-bg-h{left:0;right:0;bottom:210px;height:1px;
  background:linear-gradient(90deg,transparent,rgba(var(--cy-rgb),.55),rgba(176,110,255,.4),transparent);
  box-shadow:0 0 22px rgba(var(--cy-rgb),.45)}
/* La malla en fuga: la que da la sensación de estar dentro de algo */
.hb2-bg-f{left:-30%;right:-30%;bottom:-46px;height:300px;opacity:.72;
  transform:perspective(340px) rotateX(62deg);transform-origin:50% 100%;
  background-image:linear-gradient(rgba(var(--cy-rgb),.3) 1px,transparent 1px),
    linear-gradient(90deg,rgba(var(--cy-rgb),.22) 1px,transparent 1px);
  background-size:56px 40px;
  -webkit-mask-image:linear-gradient(to top,#000,transparent 72%);
  mask-image:linear-gradient(to top,#000,transparent 72%)}
.hb2-bg-s{inset:0;background:repeating-linear-gradient(0deg,rgba(var(--ov),.018) 0 1px,transparent 1px 3px)}

#habitosSlide{display:flex;flex-direction:column;gap:11px;height:100%;min-height:0}

/* ── Panel con esquinas cortadas ──────────────────────────────────────── */
.hb2-panel{position:relative;
  background:linear-gradient(160deg,rgba(var(--ov),.055),rgba(var(--ov),.022));
  border:1px solid rgba(var(--cy-rgb),.16);
  clip-path:polygon(0 12px,12px 0,calc(100% - 12px) 0,100% 12px,100% calc(100% - 12px),calc(100% - 12px) 100%,12px 100%,0 calc(100% - 12px));
  box-shadow:0 10px 40px rgba(0,0,0,.45),inset 0 1px 0 rgba(var(--ov),.06)}
.hb2-hot{border-color:rgba(var(--r-rgb),.4);
  background:linear-gradient(160deg,rgba(var(--r-rgb),.13),rgba(var(--r-rgb),.05))}

.hb2-k{font-family:var(--mono);font-size:8px;font-weight:700;letter-spacing:.2em;
  text-transform:uppercase;color:var(--text3)}
.hb2-linea{width:44px;height:1px;flex-shrink:0;display:block;
  background:linear-gradient(90deg,rgba(var(--cy-rgb),.5),transparent)}
.hb2-dot{width:7px;height:7px;border-radius:50%;background:var(--cy);flex-shrink:0;
  box-shadow:0 0 12px var(--cy);display:block}
.hb2-eyebrow{display:flex;align-items:center;gap:9px;margin-bottom:5px}

/* ── Cabecera ─────────────────────────────────────────────────────────── */
.hb2-hd{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-shrink:0}
.hb2-titulo{font-family:var(--font-title);font-size:clamp(21px,2.4vw,32px);font-weight:600;
  letter-spacing:-.01em;line-height:1.06;color:var(--text)}
.hb2-hd-r{display:flex;align-items:center;gap:10px;flex-shrink:0}
/* La frase del día: itálica bajo el título, con el autor en mono pequeño */
.hb2-frase{display:flex;align-items:baseline;gap:9px;margin-top:6px;max-width:760px}
.hb2-frase-t{font-size:12.5px;font-style:italic;color:var(--text2);line-height:1.4}
.hb2-frase-a{font-family:var(--mono);font-size:8px;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;color:var(--text3);white-space:nowrap;flex-shrink:0}
.hb2-frase-a::before{content:'— '}
.hb2-mes{padding:7px 12px;display:flex;align-items:center;gap:8px;
  font-family:var(--mono);font-size:11.5px;font-weight:700;color:var(--text2);
  letter-spacing:.1em;text-transform:uppercase}
.hb2-mb{width:19px;height:19px;border:0;background:transparent;color:var(--text3);
  cursor:pointer;font-family:var(--mono);font-size:14px;line-height:1;padding:0}
.hb2-mb:hover:not(:disabled){color:var(--cy)}
.hb2-mb:disabled{opacity:.25;cursor:default}
.hb2-hoypill{padding:8px 15px;display:flex;align-items:center;gap:12px;
  border-color:rgba(var(--w-rgb),.4);
  background:linear-gradient(160deg,rgba(var(--w-rgb),.14),rgba(var(--w-rgb),.04))}
.hb2-hoypill-n{display:flex;align-items:baseline;gap:2px;font-family:var(--mono)}
.hb2-hoypill-n b{font-size:24px;font-weight:700;color:var(--w);text-shadow:0 0 18px rgba(var(--w-rgb),.6)}
.hb2-hoypill-n i{font-size:12px;font-style:normal;font-weight:700;color:var(--text3)}

/* ── Telemetría ───────────────────────────────────────────────────────── */
.hb2-tel{display:flex;gap:11px;flex-shrink:0;height:140px}
.hb2-anillo{width:184px;flex-shrink:0;padding:13px 15px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:7px}
.hb2-anillo .hb2-k{align-self:flex-start}
.hb2-anillo-w{position:relative;width:88px;height:88px}
.hb2-anillo-w svg{width:88px;height:88px;transform:rotate(-90deg)}
.hb2-anillo-w circle:last-child{filter:drop-shadow(0 0 7px rgba(var(--cy-rgb),.75))}
.hb2-anillo-c{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;
  justify-content:center;font-family:var(--mono)}
.hb2-anillo-c b{font-size:24px;font-weight:700;color:var(--cy);line-height:1}
.hb2-anillo-c i{font-size:9px;font-style:normal;font-weight:700;color:var(--text3);margin-top:2px}

.hb2-acum{flex:1;min-width:0;padding:13px 15px;display:flex;flex-direction:column;gap:5px}
.hb2-acum-hd{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
.hb2-acum-d{display:flex;align-items:center;gap:5px}
.hb2-acum-d b{font-family:var(--mono);font-size:11px;font-weight:700}
.hb2-acum-g{width:100%;flex:1;min-height:0}
.hb2-acum-x{display:flex;justify-content:space-between}
.hb2-acum-x span{font-family:var(--mono);font-size:7.5px;font-weight:700;color:var(--text3);
  flex:1;text-align:center}
.hb2-sindatos{flex:1;display:flex;align-items:center;justify-content:center;
  font-size:11px;color:var(--text3);text-align:center;line-height:1.4}

.hb2-perfil{width:252px;flex-shrink:0;padding:13px 15px;display:flex;flex-direction:column;gap:6px}
.hb2-pbs{display:flex;align-items:flex-end;justify-content:space-between;gap:5px;flex:1;min-height:0}
.hb2-pb{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;
  justify-content:flex-end}
.hb2-pb span{font-family:var(--mono);font-size:8.5px;font-weight:700}
.hb2-pb u{display:block;width:100%;border-radius:4px 4px 2px 2px;text-decoration:none}
.hb2-pb i{font-family:var(--mono);font-size:8px;font-style:normal;font-weight:700;letter-spacing:.1em}

.hb2-kpis{width:238px;flex-shrink:0;display:grid;grid-template-columns:1fr 1fr;
  grid-template-rows:1fr 1fr;gap:7px}
.hb2-kpi{padding:9px 11px;display:flex;flex-direction:column;justify-content:center;gap:3px}
.hb2-kpi-v{display:flex;align-items:baseline;gap:4px;font-family:var(--mono)}
.hb2-kpi-v b{font-size:21px;font-weight:700;line-height:1}

/* ── Cuadrícula ───────────────────────────────────────────────────────── */
.hb2-grid{flex:1;min-height:0;padding:13px 16px;display:flex;flex-direction:column;gap:7px}
.hb2-grid-hd{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-shrink:0}
.hb2-grid-hd .hb2-leg{order:1;margin-left:auto}
.hb2-grid-t{display:flex;align-items:center;gap:9px}
.hb2-leg{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.hb2-leg-i{display:flex;align-items:center;gap:5px;font-size:9.5px;color:var(--text3)}
.hb2-leg-i .hb2-c{flex:none;width:12px;min-width:12px;max-width:12px;height:12px;aspect-ratio:auto;
  border-radius:3px;font-size:0;cursor:default}
/* El scroll HORIZONTAL envuelve la tabla entera para que cabecera, filas y
   totales scrollen juntos y nunca se desalineen. El VERTICAL vive solo en
   .hb2-filasw: si la ventana es baja, scrollean los hábitos y la fila de
   totales sigue a la vista, que es donde tiene que estar. */
.hb2-scroll{flex:1;min-height:0;overflow-x:auto;overflow-y:hidden;display:flex}
.hb2-tabla{flex:1;min-width:max-content;width:100%;min-height:0;display:flex;flex-direction:column}
.hb2-filasw{flex:1;min-height:0;overflow-y:auto}
/* Mismo padding lateral que .hb2-fila (5px): sin él la cabecera arrancaba 5px
   antes que las celdas y las letras de los días no caían sobre su columna. */
.hb2-cab{display:flex;align-items:flex-end;gap:10px;flex:none;padding:0 5px 3px}
.hb2-nom-sp{width:168px;flex-shrink:0}
.hb2-dn{flex:1 1 0;min-width:30px;max-width:44px;text-align:center;font-family:var(--mono);
  font-size:8px;font-weight:700;padding-bottom:2px}
.hb2-filas{display:flex;flex-direction:column;min-height:100%}
/* flex:1 0 33px - crece si sobra alto, pero NUNCA por debajo de 33px. Con 12
   hábitos y poco alto, antes se comprimían hasta solaparse con los totales. */
.hb2-fila{display:flex;align-items:center;gap:10px;padding:1px 5px;border-radius:9px;
  flex:1 0 33px;border-bottom:1px solid rgba(var(--ov),.04);transition:background .15s}
.hb2-fila:hover{background:rgba(var(--ov),.03)}
.hb2-fila.peligro{background:rgba(var(--r-rgb),.055)}
.hb2-nom{width:168px;flex-shrink:0;min-width:0;display:flex;align-items:center;gap:7px;
  background:none;border:0;padding:0;cursor:pointer;font-family:inherit;text-align:left}
.hb2-ico{width:26px;height:26px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;
  justify-content:center;background:rgba(var(--ov),.05);border:1px solid rgba(var(--ov),.1)}
.hb2-nom-t{min-width:0;display:flex;flex-direction:column}
.hb2-nom-n{font-size:12px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;
  text-overflow:ellipsis}
.hb2-nom:hover .hb2-nom-n{color:var(--cy)}
.hb2-nom-a{font-size:9px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hb2-nom-a b{font-family:var(--mono);font-weight:700;color:var(--cy);letter-spacing:.04em}
/* Las tres filas (cabecera, hábitos, totales) comparten este contenedor con
   flex:1, y cada celda se reparte el ancho entre 30 y 42px con aspect-ratio 1.
   Así la cuadrícula crece con la pantalla en vez de quedarse en 30px fijos. */
.hb2-celdas{display:flex;gap:2px;flex:1;min-width:0}
.hb2-rac{width:98px;flex-shrink:0;display:flex;align-items:center;justify-content:flex-end;
  gap:8px;padding-right:2px}
.hb2-rac-n{text-align:right}
.hb2-rac-n b{display:block;font-family:var(--mono);font-size:15px;font-weight:700;line-height:1}
.hb2-rac-n i{display:block;width:34px;height:2.5px;border-radius:2px;margin-top:3px;
  background:rgba(var(--ov),.1);overflow:hidden}
.hb2-rac-n u{display:block;height:100%;border-radius:2px;text-decoration:none}
.hb2-rec{font-family:var(--mono);font-size:10px;font-weight:700;color:var(--text3);
  min-width:18px;text-align:right}
.hb2-cab .hb2-rac,.hb2-tot .hb2-rac{gap:13px}

/* ── La celda ─────────────────────────────────────────────────────────── */
.hb2-c{flex:1 1 0;min-width:30px;max-width:44px;aspect-ratio:1;border-radius:8px;display:flex;
  align-items:center;justify-content:center;position:relative;cursor:pointer;
  font-family:var(--mono);font-size:11px;font-weight:700;
  transition:transform .12s,box-shadow .12s}
.hb2-c:hover{transform:translateY(-2px) scale(1.08);z-index:4}
/* EL PASADO VA APAGADO, HOY ENCENDIDO. Las celdas de días anteriores se pueden
   marcar y desmarcar igual que la de hoy (se te olvidó anotar ayer, lo corriges),
   pero con el mismo brillo no se distinguía qué día era el vivo. Un día pasado
   cumplido es verde tenue sin glow; fallado, rojo tenue. Al pasar el ratón se
   encienden: es la señal de que se pueden tocar. Hoy conserva el brillo entero. */
.hb2-ok{background:rgba(var(--g-rgb),.11);color:rgba(var(--g-rgb),.72);
  border:1px solid rgba(var(--g-rgb),.36)}
.hb2-ok:hover{background:rgba(var(--g-rgb),.22);color:var(--g);border-color:rgba(var(--g-rgb),.75);
  box-shadow:0 0 12px rgba(var(--g-rgb),.3)}
.hb2-no{background:rgba(var(--r-rgb),.06);color:rgba(var(--r-rgb),.62);border:1px solid rgba(var(--r-rgb),.26)}
.hb2-no:hover{background:rgba(var(--r-rgb),.12);color:var(--r);border-color:rgba(var(--r-rgb),.48)}
/* Hoy cumplido: el verde entero, con borde encendido y glow — el único que brilla */
.hb2-hoyok{background:rgba(var(--g-rgb),.24);color:var(--g);
  border:1px solid rgba(var(--g-rgb),.8);
  box-shadow:0 0 12px rgba(var(--g-rgb),.3),inset 0 0 12px rgba(var(--g-rgb),.15)}
.hb2-off{background:rgba(var(--ov),.026);color:rgba(var(--ov),.15);cursor:default}
.hb2-off:hover{transform:none}
.hb2-fut{background:rgba(var(--ov),.038);color:rgba(var(--ov),.19);
  border:1px solid rgba(var(--ov),.045);cursor:default}
.hb2-fut:hover{transform:none}
.hb2-hoy{background:rgba(var(--w-rgb),.09);color:var(--w);border:1.5px dashed rgba(var(--w-rgb),.85)}
.hb2-hoyok{box-shadow:0 0 0 2px rgba(var(--w-rgb),.9),0 0 16px rgba(var(--g-rgb),.55),
  inset 0 1px 0 rgba(255,255,255,.4)}
/* La palomita dentro de la celda cumplida: a este tamaño el color solo no basta */
.hb2-ok::after,.hb2-hoyok::after{content:'';position:absolute;right:11%;bottom:11%;
  width:13%;height:23%;border:solid var(--g);border-width:0 2px 2px 0;
  transform:rotate(42deg);filter:drop-shadow(0 0 3px rgba(var(--g-rgb),.9))}
.hb2-ok::after{border-color:rgba(var(--g-rgb),.6);filter:none}
.hb2-ok:hover::after{border-color:var(--g);filter:drop-shadow(0 0 3px rgba(var(--g-rgb),.9))}
/* Un día a medias en un hábito por pasos: el relleno sube con lo que llevas.
   El número se queda por encima, para que siga leyéndose. */
.hb2-parc{border:1px solid rgba(var(--g-rgb),.45);color:var(--g)}
.hb2-no.hb2-parc{border-color:rgba(var(--g-rgb),.3);color:rgba(var(--g-rgb),.65)}
.hb2-parc u{position:absolute;left:0;right:0;bottom:0;display:block;text-decoration:none;
  background:rgba(var(--g-rgb),.3);z-index:0}
.hb2-c span{position:relative;z-index:1}
.hb2-finde{background:rgba(var(--ov),.03)}
.hb2-colhoy{background:linear-gradient(180deg,rgba(var(--w-rgb),.16),rgba(var(--w-rgb),.04));
  box-shadow:0 0 0 1px rgba(var(--w-rgb),.22)}

/* La lectura vertical */
.hb2-tot{display:flex;align-items:flex-end;gap:10px;flex:none;padding:6px 5px 0;
  border-top:1px solid rgba(var(--cy-rgb),.14)}
.hb2-tt{flex:1 1 0;min-width:30px;max-width:44px;display:flex;flex-direction:column;align-items:center;gap:2px}
.hb2-tt span{font-family:var(--mono);font-size:8px;font-weight:700;min-height:10px}
.hb2-tt i{width:100%;height:22px;display:flex;align-items:flex-end;font-style:normal}
.hb2-tt u{width:100%;border-radius:3px 3px 1px 1px;text-decoration:none;display:block}

.hb2-add{flex-shrink:0;display:flex;align-items:center;gap:5px;order:2;
  padding:5px 11px;border-radius:9px;border:1px dashed rgba(var(--ov),.18);background:transparent;
  color:var(--text3);font-family:inherit;font-size:10.5px;font-weight:600;cursor:pointer;
  transition:border-color .15s,color .15s,background .15s}
.hb2-add:hover{border-color:var(--cy);color:var(--cy);background:rgba(var(--cy-rgb),.06)}
.hb2-add svg{width:12px;height:12px}

/* ── Pie ──────────────────────────────────────────────────────────────── */
.hb2-pie{display:flex;gap:11px;flex-shrink:0}
.hb2-aviso{width:340px;flex-shrink:0;padding:10px 14px}
.hb2-aviso-h{display:flex;align-items:center;gap:7px;margin-bottom:5px;color:var(--r)}
.hb2-aviso-h svg{width:13px;height:13px;flex-shrink:0}
.hb2-aviso-h span{font-family:var(--mono);font-size:8px;font-weight:700;letter-spacing:.16em;
  text-transform:uppercase}
.hb2-aviso-d{font-size:11px;line-height:1.45;color:var(--text2)}
.hb2-aviso-d b{color:var(--text)}
.hb2-hoy{flex:1;min-width:0;padding:10px 14px;display:flex;align-items:center;gap:12px}
.hb2-hoy-n{flex-shrink:0}
.hb2-hoy-n span:first-child{display:block}
.hb2-hoy-n>span:last-child{display:flex;align-items:baseline;gap:2px;margin-top:3px;font-family:var(--mono)}
.hb2-hoy-n b{font-size:18px;font-weight:700;color:var(--w)}
.hb2-hoy-n i{font-size:11px;font-style:normal;font-weight:700;color:var(--text3)}
.hb2-barra{width:78px;height:4px;border-radius:3px;background:rgba(var(--ov),.1);
  overflow:hidden;margin-top:6px}
.hb2-barra u{display:block;height:100%;border-radius:3px;text-decoration:none;
  background:linear-gradient(90deg,var(--g),var(--cy));
  box-shadow:0 0 8px rgba(var(--g-rgb),.55);transition:width .3s}
.hb2-sep{width:1px;align-self:stretch;background:rgba(var(--cy-rgb),.18);flex-shrink:0}
.hb2-chips{display:flex;gap:6px;flex:1;min-width:0;flex-wrap:wrap;overflow-y:auto;max-height:64px}
.hb2-chip{display:flex;align-items:center;gap:7px;padding:6px 10px;border-radius:9px;cursor:pointer;
  background:rgba(var(--ov),.035);border:1px solid rgba(var(--ov),.09);font-family:inherit;
  font-size:11px;font-weight:600;color:var(--text2);transition:background .15s,border-color .15s}
.hb2-chip:hover{background:rgba(var(--ov),.07)}
.hb2-chip.on{background:rgba(var(--g-rgb),.1);border-color:rgba(var(--g-rgb),.32);color:var(--text)}
.hb2-box{width:15px;height:15px;border-radius:5px;flex-shrink:0;display:flex;align-items:center;
  justify-content:center;background:rgba(var(--ov),.04);border:1.5px solid rgba(var(--ov),.22);
  transition:background .16s,border-color .16s}
.hb2-chip.on .hb2-box{background:rgba(var(--g-rgb),.18);border-color:var(--g);
  box-shadow:0 0 10px rgba(var(--g-rgb),.35)}
/* La palomita va en VERDE sobre fondo tenue, no en negro sobre verde sólido. */
.hb2-box svg{width:11px;height:11px;fill:none;stroke:var(--g);stroke-width:3.4;
  stroke-linecap:round;stroke-linejoin:round;
  filter:drop-shadow(0 0 4px rgba(var(--g-rgb),.7))}
/* La casilla hace de vaso: el relleno sube con cada paso dado. */
.hb2-box{position:relative;overflow:hidden}
.hb2-box u{position:absolute;left:0;right:0;bottom:0;display:block;text-decoration:none;
  background:rgba(var(--g-rgb),.5)}
.hb2-chip-n{font-family:var(--mono);font-size:9.5px;font-style:normal;font-weight:700;
  color:var(--g);margin-left:1px}
.hb2-vacio{font-size:11px;color:var(--text3);line-height:1.5}

/* ── La ficha ─────────────────────────────────────────────────────────── */
.hb2-ficha-ov{position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.68);backdrop-filter:blur(7px);
  display:none;align-items:center;justify-content:center;padding:24px}
.hb2-ficha-ov.open{display:flex}
/* 1040px: el doble de antes. Con ese ancho el contenido va en dos columnas y
   la ficha entera cabe sin scrollear en 950px de alto. El editor (.hb2-ed)
   conserva 520px: un formulario no gana nada con inputs de un metro. */
.hb2-ficha-card{position:relative;width:100%;max-width:1040px;max-height:100%;overflow-y:auto;
  padding:22px 26px;border:1px solid rgba(var(--cy-rgb),.2);
  clip-path:polygon(0 14px,14px 0,calc(100% - 14px) 0,100% 14px,100% calc(100% - 14px),calc(100% - 14px) 100%,14px 100%,0 calc(100% - 14px));
  box-shadow:0 24px 70px rgba(0,0,0,.6)}
/* color explícito: el overlay es position:fixed fuera del <section> y heredaba el
   texto oscuro del tema claro — el título salía negro sobre negro. */
.hb2-ficha-card{background:linear-gradient(160deg,#0b0b18,#07070f);color:var(--text)}
.hb2-ficha-card.hb2-ed{max-width:520px}
.hb2-ficha-cols{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:start;margin-top:2px}
.hb2-ficha-col{min-width:0}
.hb2-ficha-col>.hb2-panel:last-child{margin-bottom:0}
.hb2-x{position:absolute;top:15px;right:15px;width:28px;height:28px;border-radius:50%;
  border:1px solid rgba(var(--ov),.12);background:rgba(var(--ov),.05);color:var(--text2);
  cursor:pointer;font-size:12px;font-family:inherit;line-height:1;z-index:2}
.hb2-x:hover{background:rgba(var(--ov),.12);color:var(--text)}
.hb2-ficha-t{display:flex;align-items:center;gap:10px;font-family:var(--font-title);font-size:27px;
  font-weight:600;line-height:1.15;margin:6px 0 8px;padding-right:34px}
.hb2-ficha-t svg{flex-shrink:0}
.hb2-ficha-a{display:flex;align-items:center;gap:7px;font-size:11.5px;color:var(--text2)}
.hb2-ficha-a svg{width:13px;height:13px;color:var(--cy);flex-shrink:0}
.hb2-ficha-dow{font-size:10.5px;color:var(--text3);margin:5px 0 14px}
.hb2-ficha-dow b{font-family:var(--mono);color:var(--cy)}
/* Qué hacer: va lo primero después del anclaje, porque es lo que se abre a leer */
.hb2-qh{padding:13px 15px;margin-bottom:11px}
.hb2-qh-hd{display:flex;align-items:center;gap:9px;margin-bottom:9px}
.hb2-qh-hoy{padding:10px 12px;border-radius:9px;background:rgba(var(--o-rgb),.08);
  border:1px solid rgba(var(--o-rgb),.28);margin-bottom:9px}
.hb2-qh-hoy b{display:block;font-size:12.5px;font-weight:700;color:var(--text);margin:4px 0 5px}
.hb2-qh-hoy p{font-size:11px;line-height:1.5;color:var(--text2)}
.hb2-qh-sem{list-style:none;display:flex;flex-wrap:wrap;gap:5px 12px;margin-bottom:9px}
.hb2-qh-sem li{font-size:10.5px;color:var(--text3)}
.hb2-qh-sem li b{font-family:var(--mono);color:var(--cy);margin-right:3px}
.hb2-qh-lista{list-style:none;display:flex;flex-direction:column;gap:6px}
.hb2-qh-lista li{position:relative;padding-left:14px;font-size:11.5px;line-height:1.5;color:var(--text2)}
.hb2-qh-lista li::before{content:'';position:absolute;left:0;top:8px;width:5px;height:5px;
  border-radius:50%;background:var(--cy);box-shadow:0 0 6px rgba(var(--cy-rgb),.6)}
.hb2-qh-lista li b{color:var(--text)}
.hb2-qh-lista li.hb2-qh-sec{padding-left:0;margin-top:4px;font-family:var(--mono);font-size:8px;
  font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--text3)}
.hb2-qh-lista li.hb2-qh-sec::before{display:none}
.hb2-qh-lista + .hb2-qh-lista{margin-top:8px;padding-top:8px;border-top:1px solid rgba(var(--ov),.07)}
.hb2-qh-vacio{font-size:11px;color:var(--text3);line-height:1.5}
.hb2-ta{resize:vertical;min-height:72px;line-height:1.45;font-size:12px}
.hb2-lbl-nota{font-size:10px;color:var(--text3);margin-top:5px;line-height:1.4}
.hb2-ficha-rac{padding:13px 15px;margin-bottom:11px}
.hb2-ficha-rac-r{display:flex;align-items:flex-end;justify-content:space-between;gap:14px;margin-bottom:9px}
.hb2-ficha-big{font-family:var(--mono);font-size:28px;font-weight:700;line-height:1;margin-top:5px;
  display:flex;align-items:baseline;gap:5px}
.hb2-ficha-big i{font-family:var(--mono);font-size:8px;font-style:normal;font-weight:700;
  letter-spacing:.16em;text-transform:uppercase;color:var(--text3)}
.hb2-ficha-bar{height:5px;border-radius:3px;background:rgba(var(--ov),.08);overflow:hidden}
.hb2-ficha-bar u{display:block;height:100%;text-decoration:none;
  background:linear-gradient(90deg,var(--o),var(--w))}
.hb2-ficha-cal{padding:13px 15px;margin-bottom:11px}
.hb2-ficha-cal-hd{display:flex;align-items:center;justify-content:space-between;gap:10px;
  margin-bottom:9px;text-transform:capitalize}
.hb2-fdow,.hb2-fcal{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
.hb2-fdow span{text-align:center;font-family:var(--mono);font-size:7.5px;font-weight:700;
  color:var(--text3);letter-spacing:.1em;margin-bottom:3px}
.hb2-fd{height:25px;border-radius:6px;display:flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:9.5px;font-weight:700;color:rgba(var(--ov),.2);
  background:rgba(var(--ov),.04);cursor:pointer;transition:transform .12s}
.hb2-fd:hover{transform:scale(1.08)}
.hb2-fd:empty{background:transparent;cursor:default}
.hb2-fd:empty:hover{transform:none}
.hb2-f-ok{background:rgba(var(--g-rgb),.12);color:rgba(var(--g-rgb),.75);border:1px solid rgba(var(--g-rgb),.36)}
.hb2-f-ok:hover{background:rgba(var(--g-rgb),.24);color:var(--g);border-color:rgba(var(--g-rgb),.75)}
.hb2-f-hoyok{background:rgba(var(--g-rgb),.26);color:var(--g);border:1px solid rgba(var(--g-rgb),.8);
  box-shadow:0 0 10px rgba(var(--g-rgb),.3)}
.hb2-f-no{background:rgba(var(--r-rgb),.07);color:rgba(var(--r-rgb),.65);border:1px solid rgba(var(--r-rgb),.28)}
.hb2-f-no:hover{background:rgba(var(--r-rgb),.13);color:var(--r);border-color:rgba(var(--r-rgb),.48)}
.hb2-f-hoy{background:rgba(var(--w-rgb),.1);color:var(--w);border:1.5px dashed rgba(var(--w-rgb),.85)}
.hb2-f-hoyok{box-shadow:0 0 0 2px rgba(var(--w-rgb),.7)}
.hb2-f-off{background:rgba(var(--ov),.03);color:rgba(var(--ov),.13);cursor:default}
.hb2-f-off:hover{transform:none}
.hb2-f-fut{cursor:default}
.hb2-f-fut:hover{transform:none}
.hb2-ficha-bars{padding:13px 15px}
.hb2-ficha-bars .hb2-pbs{height:132px;margin-top:11px}
.hb2-ficha-sub{font-size:10.5px;color:var(--text3);line-height:1.4;margin-top:3px}
.hb2-consejo{display:flex;align-items:flex-start;gap:8px;margin-top:12px;padding-top:11px;
  border-top:1px solid rgba(var(--cy-rgb),.14);font-size:11px;color:var(--text2);line-height:1.45}
.hb2-consejo svg{width:14px;height:14px;color:var(--w);flex-shrink:0;margin-top:1px}
.hb2-consejo b{color:var(--text)}
.hb2-ficha-pie{display:flex;gap:8px;margin-top:13px}
.hb2-b{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:9px 14px;
  border-radius:9px;border:1px solid rgba(var(--ov),.13);background:rgba(var(--ov),.05);
  color:var(--text2);font-family:inherit;font-size:11px;font-weight:700;cursor:pointer;
  transition:background .15s}
.hb2-b:hover{background:rgba(var(--ov),.11);color:var(--text)}
.hb2-b svg{width:13px;height:13px}
.hb2-b-r:hover{background:rgba(var(--r-rgb),.14);border-color:rgba(var(--r-rgb),.35);color:var(--r)}
.hb2-b-g{background:rgba(var(--g-rgb),.13);border-color:rgba(var(--g-rgb),.35);color:var(--g)}
.hb2-b-g svg{filter:drop-shadow(0 0 4px rgba(var(--g-rgb),.6))}
.hb2-b-g:hover{background:rgba(var(--g-rgb),.2);color:var(--g)}

/* ── Editor ───────────────────────────────────────────────────────────── */
.hb2-lbl{display:block;font-family:var(--mono);font-size:8px;font-weight:700;letter-spacing:.2em;
  text-transform:uppercase;color:var(--text3);margin:13px 0 6px}
.hb2-lbl i{font-style:normal;text-transform:none;letter-spacing:0;font-size:9.5px;opacity:.8}
.hb2-in{width:100%;padding:10px 13px;border-radius:9px;border:1px solid rgba(var(--ov),.13);
  background:rgba(var(--ov),.04);color:var(--text);font-family:inherit;font-size:13px}
.hb2-in:focus{outline:none;border-color:var(--cy);background:rgba(var(--ov),.07)}
.hb2-in[type=time]{width:112px;font-family:var(--mono);color-scheme:dark}
.hb2-ed-2{display:flex;gap:10px;align-items:flex-start}
.hb2-dows,.hb2-cols,.hb2-icos{display:flex;gap:6px;flex-wrap:wrap}
.hb2-dow{padding:7px 12px;border-radius:8px;border:1px solid rgba(var(--ov),.13);
  background:rgba(var(--ov),.04);color:var(--text2);font-family:var(--mono);font-size:11px;
  font-weight:700;cursor:pointer;transition:background .15s,border-color .15s}
.hb2-dow:hover{background:rgba(var(--ov),.09)}
.hb2-dow.on{background:rgba(var(--g-rgb),.15);border-color:rgba(var(--g-rgb),.4);color:var(--g)}
.hb2-icb{width:30px;height:30px;border-radius:8px;border:1px solid rgba(var(--ov),.13);
  background:rgba(var(--ov),.04);color:var(--text3);cursor:pointer;display:flex;
  align-items:center;justify-content:center;transition:background .15s,border-color .15s,color .15s}
.hb2-icb:hover{background:rgba(var(--ov),.09);color:var(--text2)}
.hb2-icb.on{background:rgba(var(--cy-rgb),.15);border-color:rgba(var(--cy-rgb),.45);color:var(--cy)}
.hb2-col{width:25px;height:25px;border-radius:7px;border:2px solid transparent;cursor:pointer;
  transition:transform .12s}
.hb2-col:hover{transform:scale(1.12)}
.hb2-col.on{border-color:var(--text);transform:scale(1.12)}

/* ── Angosto ──────────────────────────────────────────────────────────── */
@media (max-width:1200px){
  .hb2-tel{flex-wrap:wrap;height:auto}
  .hb2-anillo{width:160px}
  .hb2-acum{min-width:280px}
  .hb2-perfil,.hb2-kpis{width:calc(50% - 6px)}
  .hb2-acum-g{height:80px}
}
@media (max-width:900px){
  .hb2-ficha-cols{grid-template-columns:1fr}
}
@media (max-width:760px){
  /* En vertical la telemetría se apila y el contenido pasa del alto de la
     pantalla: sin esto el pie queda cortado y no hay forma de llegar a él. */
  #habitosSlide{overflow-y:auto;height:auto;max-height:100%}
  .hb2-grid{flex:none}
  .hb2-scroll{overflow-x:auto;overflow-y:visible}
  .hb2-filasw{overflow-y:visible}
  .hb2-hd{flex-direction:column;align-items:flex-start;gap:11px}
  .hb2-tel{flex-direction:column}
  .hb2-anillo,.hb2-perfil,.hb2-kpis,.hb2-acum{width:100%}
  .hb2-pie{flex-direction:column}
  .hb2-aviso{width:100%}
  .hb2-nom,.hb2-nom-sp{width:132px}
  .hb2-leg{display:none}
}
`;

  const st = document.createElement('style');
  st.id = 'hb2-css';
  st.textContent = CSS;
  document.head.appendChild(st);
})();
