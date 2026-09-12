/* ══════════════════════════════════════════════════════════════════════════
   HÁBITOS — la pestaña de la cadena que no se rompe
   ══════════════════════════════════════════════════════════════════════════

   El slide 8 del Dashboard. Sale del diseño acordado en `diseno-habitos/`
   (dirección principal: el mes entero en una cuadrícula, hábitos en filas y
   días en columnas).

   POR QUÉ ES UN MÓDULO APARTE, como examen-genai.js: dashboard.html ya pesa
   1.1 MB y esto son ~600 líneas entre datos, motor, pintado y estilos. El
   dashboard solo aporta el <section> vacío, el tema de color del slide y la
   entrada en RENDERS/SLIDE_MENU_META/HUD_ICO. Todo lo demás vive aquí.

   LAS TRES DECISIONES DE DISEÑO QUE HAY QUE RESPETAR AL TOCAR ESTO:

   1. CUATRO ESTADOS, NO DOS. Hecho, fallé, NO TOCABA y futuro. Natación es
      solo los miércoles: un martes en blanco no es un fallo, y pintarlo como
      tal haría que cualquier hábito de días alternos pareciera un desastre.
      `estado()` es donde vive esa distinción y es el corazón del módulo.

   2. EL ANCLAJE VIVE JUNTO AL NOMBRE. "23:10, después de lavarme los dientes"
      no es decoración: es lo que hace que el hábito ocurra (intención de
      implementación). Por eso va en la fila, no escondido en un ajuste.

   3. UN SOLO AVISO, Y SOLO CUANDO TOCA. "Nunca falles dos veces seguidas"
      aparece únicamente cuando algo se cayó ayer y hoy sigue sin marcar.
      Gritarlo todos los días lo convertiría en ruido y dejaría de funcionar.

   DÓNDE VIVEN LOS DATOS: `localStorage['dash-habitos-v1']`, con la misma
   pareja rawGet/rawSet que usa el resto del Dashboard. Dos cosas distintas
   dentro: `def` son los hábitos (constantes que Adán edita a mano desde la
   pantalla) y `marcas` es el registro vivo, indexado por fecha ISO real
   —no por número de día— para que cruzar de mes no desplace nada.
   ══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const LS = 'dash-habitos-v1';

  /* ── Los hábitos de arranque ──────────────────────────────────────────
     Salen de lo que el proyecto ya registra en otras pantallas: gym 2×,
     natación los miércoles, el CENLEX, el bloque de las 23:10 y la revisión
     de gastos. `dow` son los días de la semana en que toca (0=domingo), o
     'todos'. Se editan desde la pantalla; esto es solo la semilla. */
  const SEMILLA = [
    { id: 'gym',   nombre: 'Gimnasio',          ancla: '19:00 · después de comer',        color: '#ff8a3d', dow: [1, 2, 4, 5] },
    { id: 'nata',  nombre: 'Natación',          ancla: 'Miércoles, 20:00',                color: '#00e0c0', dow: [3] },
    { id: 'ale',   nombre: 'Alemán · 15 min',   ancla: 'Antes del café',                  color: '#ffd93d', dow: 'todos' },
    { id: 'leer',  nombre: 'Leer 10 páginas',   ancla: 'Al acostarme',                    color: '#b06eff', dow: 'todos' },
    { id: 'medi',  nombre: 'Meditar · 5 min',   ancla: '23:10 · tras lavarme los dientes', color: '#00e87a', dow: 'todos' },
    { id: 'gasto', nombre: 'Anotar gastos',     ancla: 'Al llegar a casa',                color: '#3b82f6', dow: 'todos' },
    { id: 'agua',  nombre: '3 litros de agua',  ancla: 'Botella llena al salir',          color: '#00b8d9', dow: 'todos' }
  ];

  const PALETA = ['#ff8a3d', '#00e0c0', '#ffd93d', '#b06eff', '#00e87a', '#3b82f6', '#00b8d9', '#f472b6', '#ff5c5c', '#8b5cf6'];
  const DOW_N = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const DOW_LARGO = ['domingos', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábados'];
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
                 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  /* ── Estado ───────────────────────────────────────────────────────────── */
  let S = null;            // { def:[], marcas:{} }
  let mesVisto = null;     // Date del día 1 del mes en pantalla
  let fichaId = null;      // hábito abierto en la ficha, o null

  function cargar() {
    const g = (typeof rawGet === 'function')
      ? rawGet(LS, null)
      : (function () { try { return JSON.parse(localStorage.getItem(LS)); } catch (e) { return null; } })();
    S = g && g.def ? g : { def: SEMILLA.slice(), marcas: {} };
    if (!S.marcas) S.marcas = {};
    /* EL ARRANQUE EN FRÍO. Sin esta fecha, el primer día que se abre la pestaña
       el mes entero sale pintado de rojo: días en que "tocaba y no se marcó"
       porque no existía el registro todavía. Un hábito no puede fallar antes de
       existir, así que nada anterior a `desde` cuenta — ni como fallo ni como
       acierto. Cada hábito puede traer el suyo (los creados más tarde), y este
       es el del tablero entero. */
    if (!S.desde) {
      S.desde = hoyISO();
      /* Se persiste en el acto, no al primer toggle: si se abre la pestaña hoy,
         no se marca nada y se vuelve dentro de una semana, `desde` tiene que
         seguir siendo hoy. Calcularlo en cada carga sin guardarlo movería el
         arranque hacia adelante y se perderían esos días de historial. */
      guardar();
    }
    return S;
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
     'off'   no tocaba ese día de la semana  → ni suma ni resta
     'fut'   todavía no ha llegado
     'hoy'   toca hoy y sigue sin marcar     → aún no es un fallo
     'hoyok' toca hoy y ya está marcado
     'ok'    día pasado cumplido
     'no'    día pasado en que tocaba y no se hizo                        */
  function toca(h, fecha) {
    if (h.dow === 'todos') return true;
    return h.dow.indexOf(desdeISO(fecha).getDay()) >= 0;
  }
  function marcado(h, fecha) {
    return !!(S.marcas[fecha] && S.marcas[fecha][h.id]);
  }
  function estado(h, fecha) {
    if (!toca(h, fecha)) return 'off';
    const arranque = h.desde || S.desde;
    if (arranque && fecha < arranque) return 'pre';   // no existía todavía
    const hoy = hoyISO();
    if (fecha > hoy) return 'fut';
    if (fecha === hoy) return marcado(h, fecha) ? 'hoyok' : 'hoy';
    return marcado(h, fecha) ? 'ok' : 'no';
  }
  /* 'pre' y 'off' son lo mismo para todo el mundo: neutros. Ni suman, ni
     restan, ni rompen una racha. Se separan solo porque significan cosas
     distintas ("aún no lo llevabas" contra "ese día no tocaba"). */
  function neutro(e) { return e === 'off' || e === 'pre'; }

  /* Racha: días consecutivos cumplidos hacia atrás. Los días que no tocaban
     se saltan (no rompen ni suman) y hoy sin marcar tampoco rompe todavía —
     solo cuando el día se cierra cuenta como fallo. */
  function racha(h) {
    let n = 0;
    let d = new Date();
    for (let i = 0; i < 400; i++) {
      const f = iso(d);
      const e = estado(h, f);
      if (neutro(e)) { d = sumaDias(d, -1); continue; }
      if (e === 'ok' || e === 'hoyok') n++;
      else if (e === 'hoy') { d = sumaDias(d, -1); continue; }
      else break;
      d = sumaDias(d, -1);
    }
    return n;
  }

  /* La mejor racha histórica de un hábito, recorriendo lo que haya marcado. */
  function record(h) {
    const fechas = Object.keys(S.marcas).sort();
    if (!fechas.length) return 0;
    let mejor = 0, run = 0;
    let d = desdeISO(fechas[0]);
    const fin = new Date();
    while (d <= fin) {
      const f = iso(d);
      const e = estado(h, f);
      if (e === 'ok' || e === 'hoyok') { run++; if (run > mejor) mejor = run; }
      else if (neutro(e) || e === 'hoy' || e === 'fut') { /* no corta */ }
      else run = 0;
      d = sumaDias(d, 1);
    }
    return mejor;
  }

  /* Qué hábitos fallaron ayer y hoy siguen sin marcar: la regla de los dos días. */
  function enRiesgo() {
    const ayer = iso(sumaDias(new Date(), -1));
    const hoy = hoyISO();
    return S.def.filter(function (h) {
      return estado(h, ayer) === 'no' && toca(h, hoy) && !marcado(h, hoy);
    });
  }

  function delDia(fecha) {
    return S.def.filter(function (h) { return toca(h, fecha); });
  }

  function toggle(id, fecha) {
    if (fecha > hoyISO()) return;              // el futuro no se marca
    if (!S.marcas[fecha]) S.marcas[fecha] = {};
    if (S.marcas[fecha][id]) delete S.marcas[fecha][id];
    else S.marcas[fecha][id] = 1;
    if (!Object.keys(S.marcas[fecha]).length) delete S.marcas[fecha];
    guardar();
    pintar();
    if (fichaId) pintarFicha();
  }

  /* ── Estadísticas del mes en pantalla ─────────────────────────────────── */
  function diasDelMes(base) {
    const y = base.getFullYear(), m = base.getMonth();
    const n = new Date(y, m + 1, 0).getDate();
    const out = [];
    for (let i = 1; i <= n; i++) out.push(iso(new Date(y, m, i)));
    return out;
  }

  function statsMes(base) {
    const dias = diasDelMes(base);
    let ok = 0, tot = 0, redondos = 0;
    const hoy = hoyISO();
    dias.forEach(function (f) {
      if (f > hoy) return;
      let todo = true, alguno = false;
      S.def.forEach(function (h) {
        const e = estado(h, f);
        if (neutro(e) || e === 'fut') return;
        if (e === 'hoy') { todo = false; return; }   // hoy a medias no es redondo
        tot++; alguno = true;
        if (e === 'ok' || e === 'hoyok') ok++; else todo = false;
      });
      if (alguno && todo) redondos++;
    });
    return { ok: ok, tot: tot, pct: tot ? Math.round(ok / tot * 100) : 0, redondos: redondos };
  }

  const esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  const colRacha = function (r) { return r >= 7 ? 'var(--g)' : (r >= 3 ? 'var(--w)' : 'var(--text3)'); };

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
    const hoyEnEsteMes = dias.indexOf(hoy) >= 0;
    const deHoy = delDia(hoy);
    const hechosHoy = deHoy.filter(function (h) { return marcado(h, hoy); }).length;
    const riesgo = enRiesgo();

    const mejor = S.def.reduce(function (a, h) {
      const r = racha(h);
      return r > a.r ? { r: r, n: h.nombre } : a;
    }, { r: 0, n: '—' });

    /* Cabecera de días del mes */
    const cabDias = dias.map(function (f) {
      const d = desdeISO(f);
      const finde = d.getDay() === 0 || d.getDay() === 6;
      const col = f === hoy ? 'var(--w)' : (finde ? 'rgba(var(--ov),.28)' : 'var(--text3)');
      return '<div class="hb2-dn" style="color:' + col + '">' + d.getDate() + '</div>';
    }).join('');

    /* Una fila por hábito */
    const filas = S.def.map(function (h) {
      const r = racha(h);
      let ok = 0, tot = 0;
      const celdas = dias.map(function (f) {
        const e = estado(h, f);
        if (!neutro(e) && e !== 'fut' && e !== 'hoy') { tot++; if (e === 'ok' || e === 'hoyok') ok++; }
        else if (e === 'hoy') { tot++; }
        const tit = h.nombre + ' · ' + desdeISO(f).getDate() + ' ' + MESES[desdeISO(f).getMonth()];
        const clic = f <= hoy ? ' onclick="HB.toggle(\'' + h.id + '\',\'' + f + '\')"' : '';
        return '<div class="hb2-c hb2-' + (e === 'pre' ? 'off' : e) + '"' + clic + ' title="' + esc(tit) + '"></div>';
      }).join('');
      const pct = tot ? Math.round(ok / tot * 100) : 0;
      const peligro = riesgo.some(function (x) { return x.id === h.id; });

      return '<div class="hb2-fila' + (peligro ? ' peligro' : '') + '">' +
        '<button class="hb2-nom" onclick="HB.ficha(\'' + h.id + '\')" title="Ver la ficha de este hábito">' +
          '<span class="hb2-pt" style="background:' + esc(h.color) + '"></span>' +
          '<span class="hb2-nom-t">' +
            '<span class="hb2-nom-n">' + esc(h.nombre) + '</span>' +
            '<span class="hb2-nom-a">' + esc(h.ancla || '') + '</span>' +
          '</span>' +
        '</button>' +
        '<div class="hb2-celdas">' + celdas + '</div>' +
        '<div class="hb2-rac"><b style="color:' + colRacha(r) + '">' + r + '</b><i>' + pct + '%</i></div>' +
      '</div>';
    }).join('');

    /* El checklist de hoy */
    const listaHoy = deHoy.length ? deHoy.map(function (h) {
      const hecho = marcado(h, hoy);
      const r = racha(h);
      return '<button class="hb2-t' + (hecho ? ' on' : '') + '" onclick="HB.toggle(\'' + h.id + '\',\'' + hoy + '\')">' +
        '<span class="hb2-box">' + (hecho ? '<svg viewBox="0 0 24 24"><path d="M5 12.5 10 17.5 19 7"/></svg>' : '') + '</span>' +
        '<span class="hb2-t-txt">' +
          '<span class="hb2-t-n">' + esc(h.nombre) + '</span>' +
          '<span class="hb2-t-a">' + esc(h.ancla || '') + '</span>' +
        '</span>' +
        '<span class="hb2-t-r" style="color:' + colRacha(r) + '">' + ICO_FUEGO + r + '</span>' +
      '</button>';
    }).join('') : '<div class="hb2-vacio">Hoy no toca ninguno. Día libre de verdad, no un fallo.</div>';

    const pctHoy = deHoy.length ? Math.round(hechosHoy / deHoy.length * 100) : 0;

    /* El aviso: solo existe si de verdad hay algo en riesgo */
    const aviso = riesgo.length ? (
      '<div class="hb2-aviso">' +
        '<div class="hb2-aviso-h">' + ICO_ALERTA + '<span>Nunca falles dos veces seguidas</span></div>' +
        /* Con más de tres nombres el párrafo se come el panel y el aviso deja de
           leerse de un vistazo, que era justo su trabajo. */
        '<div class="hb2-aviso-d"><b>' +
          esc(riesgo.slice(0, 3).map(function (h) { return h.nombre; }).join(', ')) +
          (riesgo.length > 3 ? '</b> y ' + (riesgo.length - 3) + ' más<b>' : '') + '</b> ' +
        (riesgo.length > 1 ? 'se cayeron' : 'se cayó') + ' ayer. Un fallo es un accidente; dos seguidos es el ' +
        'principio de dejarlo. Hoy es el día que importa.</div>' +
      '</div>'
    ) : '';

    const finMes = new Date(mesVisto.getFullYear(), mesVisto.getMonth() + 1, 1) <= new Date();

    raiz.innerHTML =
      '<div class="hb2-hd">' +
        '<div>' +
          '<div class="eyebrow"><span class="dot"></span> Hábitos</div>' +
          '<div class="slide-title"><span class="ico">🔗</span> La cadena que no se rompe</div>' +
        '</div>' +
        '<div class="hb2-hd-r">' +
          '<div class="hb2-mes">' +
            '<button class="hb2-mb" onclick="HB.mes(-1)" title="Mes anterior">‹</button>' +
            '<span>' + MESES[mesVisto.getMonth()] + ' ' + mesVisto.getFullYear() + '</span>' +
            '<button class="hb2-mb" onclick="HB.mes(1)" title="Mes siguiente"' + (finMes ? '' : ' disabled') + '>›</button>' +
          '</div>' +
          (hoyEnEsteMes
            ? '<div class="hb2-hoy-pill"><span class="hb2-k" style="color:var(--w)">Hoy</span>' +
              '<span class="hb2-hoy-n"><b>' + hechosHoy + '</b><i>/' + deHoy.length + '</i></span></div>'
            : '') +
        '</div>' +
      '</div>' +

      '<div class="hb2-stats">' +
        stat(ICO_FUEGO_G, 'var(--o)', mejor.r, 'días', 'Racha viva · ' + mejor.n) +
        stat(ICO_SUBE, 'var(--g)', st.pct, '%', 'Cumplido en ' + MESES[mesVisto.getMonth()]) +
        stat(ICO_CAL, 'var(--cy)', st.redondos, 'días', 'Redondos · todo marcado') +
        stat(ICO_ALERTA_G, 'var(--r)', riesgo.length, riesgo.length === 1 ? 'en riesgo' : 'en riesgo',
             riesgo.length ? 'Falló ayer · hoy no' : 'Nada colgando', riesgo.length > 0) +
      '</div>' +

      '<div class="hb2-cuerpo">' +
        '<div class="tile hb2-grid">' +
          '<div class="hb2-grid-hd">' +
            '<div class="hb2-k">Cuadrícula del mes</div>' +
            '<div class="hb2-leg">' +
              leg('hb2-ok', 'Hecho') + leg('hb2-no', 'Fallé') +
              leg('hb2-off', 'No tocaba') + leg('hb2-hoy', 'Hoy') +
            '</div>' +
          '</div>' +
          '<div class="hb2-scroll">' +
            '<div class="hb2-cab"><div class="hb2-nom-sp"></div><div class="hb2-celdas">' + cabDias + '</div>' +
            '<div class="hb2-rac hb2-k">Racha</div></div>' +
            '<div class="hb2-filas">' + filas + '</div>' +
          '</div>' +
          '<button class="hb2-add" onclick="HB.nuevo()">' + ICO_MAS + ' Añadir un hábito</button>' +
        '</div>' +

        '<div class="hb2-side">' +
          aviso +
          '<div class="tile hb2-hoy">' +
            '<div class="hb2-hoy-hd">' +
              '<div class="hb2-k">Lo de hoy</div>' +
              '<div class="hb2-hoy-c">' + hechosHoy + ' de ' + deHoy.length + '</div>' +
            '</div>' +
            '<div class="hb2-barra"><i style="width:' + pctHoy + '%"></i></div>' +
            '<div class="hb2-lista">' + listaHoy + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function stat(ico, col, n, uni, lbl, alerta) {
    return '<div class="tile hb2-stat' + (alerta ? ' alerta' : '') + '">' +
      '<span class="hb2-stat-i" style="color:' + col + '">' + ico + '</span>' +
      '<span class="hb2-stat-t">' +
        '<span class="hb2-stat-v"><b style="color:' + col + '">' + n + '</b><i>' + uni + '</i></span>' +
        '<span class="hb2-k"' + (alerta ? ' style="color:var(--r)"' : '') + '>' + esc(lbl) + '</span>' +
      '</span></div>';
  }
  function leg(cls, txt) {
    return '<span class="hb2-leg-i"><i class="hb2-c ' + cls + '"></i>' + txt + '</span>';
  }

  /* ══════════════════════════════════════════════════════════════════════
     LA FICHA DE UN HÁBITO — donde vive lo que de verdad ayuda a sostenerlo
     ══════════════════════════════════════════════════════════════════════ */
  function pintarFicha() {
    const ov = document.getElementById('hb2Ficha');
    if (!ov || !fichaId) return;
    const h = S.def.filter(function (x) { return x.id === fichaId; })[0];
    if (!h) { cerrarFicha(); return; }

    const hoy = hoyISO();
    const r = racha(h), rec = record(h);
    const base = mesVisto || new Date();
    const dias = diasDelMes(base);

    /* Calendario del mes, solo de este hábito */
    const primero = desdeISO(dias[0]).getDay();
    let cal = '';
    for (let i = 0; i < primero; i++) cal += '<div class="hb2-fd"></div>';
    dias.forEach(function (f) {
      const e = estado(h, f);
      const n = desdeISO(f).getDate();
      const clic = f <= hoy ? ' onclick="HB.toggle(\'' + h.id + '\',\'' + f + '\')"' : '';
      cal += '<div class="hb2-fd hb2-f-' + (e === 'pre' ? 'off' : e) + '"' + clic + '>' + n + '</div>';
    });

    /* Cumplimiento por día de la semana, últimos 90 días: el dato accionable.
       Dice DÓNDE se cae, que es lo que permite cambiar algo — a diferencia de
       un porcentaje global, que solo dice que te va mal. */
    const porDow = [0, 0, 0, 0, 0, 0, 0].map(function () { return { ok: 0, tot: 0 }; });
    let d = sumaDias(new Date(), -90);
    while (iso(d) < hoy) {
      const f = iso(d), e = estado(h, f);
      if (e === 'ok' || e === 'no') {
        const k = desdeISO(f).getDay();
        porDow[k].tot++;
        if (e === 'ok') porDow[k].ok++;
      }
      d = sumaDias(d, 1);
    }
    const conDatos = porDow.filter(function (x) { return x.tot > 0; });
    const barras = porDow.map(function (x, i) {
      const pct = x.tot ? Math.round(x.ok / x.tot * 100) : null;
      const alto = pct === null ? 4 : Math.max(5, Math.round(pct / 100 * 92));
      const col = pct === null ? 'rgba(var(--ov),.12)'
                : (pct < 60 ? 'var(--r)' : (pct < 80 ? 'var(--w)' : 'rgba(var(--g-rgb),.75)'));
      const txt = pct === null ? 'var(--text3)' : (pct < 60 ? 'var(--r)' : 'var(--text3)');
      return '<div class="hb2-bar"><span class="hb2-bar-v" style="color:' + txt + '">' +
             (pct === null ? '—' : pct + '%') + '</span>' +
             '<i style="height:' + alto + 'px;background:' + col + '"></i>' +
             '<span class="hb2-bar-d" style="color:' + txt + '">' + DOW_N[i] + '</span></div>';
    }).join('');

    /* El consejo solo aparece si hay un día claramente peor y datos que lo sostengan */
    let consejo = '';
    if (conDatos.length >= 3) {
      let peor = -1, peorPct = 101;
      porDow.forEach(function (x, i) {
        if (x.tot < 3) return;
        const p = Math.round(x.ok / x.tot * 100);
        if (p < peorPct) { peorPct = p; peor = i; }
      });
      if (peor >= 0 && peorPct < 70) {
        consejo = '<div class="hb2-consejo">' + ICO_BOMBILLA +
          '<div>Los <b>' + DOW_LARGO[peor] + '</b> caes al ' + peorPct + '%. ' +
          'Ahí el problema no es la fuerza de voluntad, es la hora: mueve el bloque ese día.</div></div>';
      }
    }

    const ayer = iso(sumaDias(new Date(), -1));
    const enPeligro = estado(h, ayer) === 'no' && toca(h, hoy) && !marcado(h, hoy);

    ov.innerHTML =
      '<div class="hb2-ficha-card" onclick="event.stopPropagation()">' +
        '<button class="hb2-x" onclick="HB.cerrarFicha()" aria-label="Cerrar">✕</button>' +

        '<div class="hb2-k" style="color:' + esc(h.color) + '">Ficha del hábito</div>' +
        '<div class="hb2-ficha-t">' + esc(h.nombre) + '</div>' +
        '<div class="hb2-ficha-a">' + ICO_ANCLA + '<span>' +
          (h.ancla ? esc(h.ancla) : '<i style="color:var(--text3)">Sin anclaje — añádele uno, es lo que hace que ocurra</i>') +
        '</span></div>' +
        '<div class="hb2-ficha-dow">' + (h.dow === 'todos' ? 'Todos los días'
          : 'Toca los ' + h.dow.map(function (i) { return DOW_LARGO[i]; }).join(', ')) + '</div>' +

        '<div class="hb2-ficha-2">' +
          '<div class="tile hb2-ficha-st" style="border-color:rgba(var(--o-rgb),.30);background:rgba(var(--o-rgb),.07)">' +
            '<span style="color:var(--o)">' + ICO_FUEGO_G + '<b>' + r + '</b></span>' +
            '<span class="hb2-k">Racha ahora</span>' +
          '</div>' +
          '<div class="tile hb2-ficha-st">' +
            '<span style="color:var(--w)">' + ICO_COPA + '<b>' + rec + '</b></span>' +
            '<span class="hb2-k">Tu récord</span>' +
          '</div>' +
        '</div>' +

        (enPeligro
          ? '<div class="hb2-aviso" style="margin:0 0 13px">' +
              '<div class="hb2-aviso-h">' + ICO_ALERTA + '<span>Hoy es el día que cuenta</span></div>' +
              '<div class="hb2-aviso-d">Fallaste ayer. Hacerlo hoy corta la caída en un día; ' +
              'saltártelo lo convierte en la primera semana de haberlo dejado.</div>' +
            '</div>'
          : '') +

        '<div class="tile hb2-ficha-cal">' +
          '<div class="hb2-ficha-cal-hd">' +
            '<div class="hb2-k">' + MESES[base.getMonth()] + '</div>' +
            '<div class="hb2-k" style="letter-spacing:.08em">Toca un día para corregirlo</div>' +
          '</div>' +
          '<div class="hb2-fdow">' + DOW_N.map(function (n) { return '<span>' + n + '</span>'; }).join('') + '</div>' +
          '<div class="hb2-fcal">' + cal + '</div>' +
        '</div>' +

        '<div class="tile hb2-ficha-bars">' +
          '<div class="hb2-k">Dónde se te cae</div>' +
          '<div class="hb2-ficha-sub">Cumplimiento por día de la semana, últimos 90 días.</div>' +
          '<div class="hb2-bars">' + barras + '</div>' +
          consejo +
        '</div>' +

        '<div class="hb2-ficha-pie">' +
          '<button class="hb2-b" onclick="HB.editar(\'' + h.id + '\')">' + ICO_LAPIZ + ' Editar</button>' +
          '<button class="hb2-b hb2-b-r" onclick="HB.borrar(\'' + h.id + '\')">' + ICO_BOTE + ' Borrar</button>' +
        '</div>' +
      '</div>';
    ov.classList.add('open');
  }

  /* ══════════════════════════════════════════════════════════════════════
     GESTIÓN DE HÁBITOS
     ══════════════════════════════════════════════════════════════════════ */
  function editor(h) {
    const ov = document.getElementById('hb2Ficha');
    const nuevo = !h;
    const v = h || { id: '', nombre: '', ancla: '', color: PALETA[S.def.length % PALETA.length], dow: 'todos' };
    const todos = v.dow === 'todos';

    ov.innerHTML =
      '<div class="hb2-ficha-card hb2-ed" onclick="event.stopPropagation()">' +
        '<button class="hb2-x" onclick="HB.cerrarFicha()" aria-label="Cerrar">✕</button>' +
        '<div class="hb2-k" style="color:var(--ac1)">' + (nuevo ? 'Nuevo hábito' : 'Editar hábito') + '</div>' +
        '<div class="hb2-ficha-t" style="margin-bottom:18px">' + (nuevo ? '¿Qué vas a sostener?' : esc(v.nombre)) + '</div>' +

        '<label class="hb2-lbl">Nombre</label>' +
        '<input class="hb2-in" id="hbEdN" value="' + esc(v.nombre) + '" placeholder="Leer 10 páginas" maxlength="40">' +

        '<label class="hb2-lbl">Anclaje <i>— después de qué cosa que ya haces</i></label>' +
        '<input class="hb2-in" id="hbEdA" value="' + esc(v.ancla) + '" placeholder="Al acostarme, tras dejar el móvil" maxlength="60">' +

        '<label class="hb2-lbl">Qué días toca</label>' +
        '<div class="hb2-dows">' +
          '<button class="hb2-dow' + (todos ? ' on' : '') + '" data-d="todos" onclick="HB.edDow(\'todos\')">Todos</button>' +
          DOW_N.map(function (n, i) {
            const on = !todos && v.dow.indexOf(i) >= 0;
            return '<button class="hb2-dow' + (on ? ' on' : '') + '" data-d="' + i + '" onclick="HB.edDow(' + i + ')">' + n + '</button>';
          }).join('') +
        '</div>' +

        '<label class="hb2-lbl">Color</label>' +
        '<div class="hb2-cols">' +
          PALETA.map(function (c) {
            return '<button class="hb2-col' + (c === v.color ? ' on' : '') + '" data-c="' + c + '" ' +
                   'style="background:' + c + '" onclick="HB.edCol(\'' + c + '\')"></button>';
          }).join('') +
        '</div>' +

        '<div class="hb2-ficha-pie" style="margin-top:20px">' +
          '<button class="hb2-b hb2-b-g" onclick="HB.guardarEd(' + (nuevo ? 'null' : "'" + v.id + "'") + ')">' +
            ICO_CHECK + ' ' + (nuevo ? 'Crear' : 'Guardar') + '</button>' +
          '<button class="hb2-b" onclick="HB.cerrarFicha()">Cancelar</button>' +
        '</div>' +
      '</div>';
    ov.classList.add('open');
    ov.dataset.dow = todos ? 'todos' : v.dow.join(',');
    ov.dataset.col = v.color;
    setTimeout(function () { const n = document.getElementById('hbEdN'); if (n) n.focus(); }, 40);
  }

  /* ── Iconos (trazo, no emoji: a 14px un emoji es una mancha) ──────────── */
  const sv = function (d, w) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 1.8) +
           '" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
  };
  const P_FUEGO = '<path d="M12 3c.7 3 2.6 4.2 4 5.8A7.5 7.5 0 0 1 12 21a7.5 7.5 0 0 1-4-13.2C9.3 9 10 10 10 11c1.4-1.6 2-5 2-8Z"/>';
  const P_ALERTA = '<path d="M12 3.5 22 20H2L12 3.5Z"/><path d="M12 10v4.5M12 17.3v.2"/>';
  const ICO_FUEGO = sv(P_FUEGO, 2);
  const ICO_FUEGO_G = sv(P_FUEGO);
  const ICO_ALERTA = sv(P_ALERTA, 2);
  const ICO_ALERTA_G = sv(P_ALERTA);
  const ICO_SUBE = sv('<path d="M3 17.5 8.5 12l3.5 3.5L21 6.5"/><path d="M15 6.5h6v6"/>');
  const ICO_CAL = sv('<rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>');
  const ICO_MAS = sv('<path d="M12 5v14M5 12h14"/>', 2);
  const ICO_ANCLA = sv('<path d="M9 6.5H6a3.5 3.5 0 0 0 0 7h3M15 17.5h3a3.5 3.5 0 0 0 0-7h-3"/><path d="M8.5 12h7"/>');
  const ICO_COPA = sv('<path d="M8 21h8M12 17v4"/><path d="M17 4H7v6a5 5 0 0 0 10 0V4Z"/><path d="M17 5.5h2.5a2.5 2.5 0 0 1 0 5H17M7 5.5H4.5a2.5 2.5 0 0 0 0 5H7"/>');
  const ICO_BOMBILLA = sv('<path d="M9.5 18h5M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.4.3.6.7.6 1.1h5.8c0-.4.2-.8.6-1.1A6 6 0 0 0 12 3Z"/>');
  const ICO_LAPIZ = sv('<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z"/><path d="M14.5 7.5 16.5 9.5"/>');
  const ICO_BOTE = sv('<path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>');
  const ICO_CHECK = sv('<path d="M5 12.5 10 17.5 19 7"/>', 2.4);

  /* ══════════════════════════════════════════════════════════════════════
     API PÚBLICA
     ══════════════════════════════════════════════════════════════════════ */
  const HB = {
    render: function () { cargar(); if (!mesVisto) mesVisto = new Date(new Date().getFullYear(), new Date().getMonth(), 1); pintar(); },
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
    guardarEd: function (id) {
      const ov = document.getElementById('hb2Ficha');
      const nom = (document.getElementById('hbEdN').value || '').trim();
      if (!nom) { document.getElementById('hbEdN').focus(); return; }
      const ancla = (document.getElementById('hbEdA').value || '').trim();
      const dowS = ov.dataset.dow;
      const dow = dowS === 'todos' ? 'todos' : dowS.split(',').map(Number);
      const color = ov.dataset.col || PALETA[0];

      if (id) {
        S.def.forEach(function (h) {
          if (h.id === id) { h.nombre = nom; h.ancla = ancla; h.dow = dow; h.color = color; }
        });
      } else {
        let base = nom.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8) || 'h';
        let nid = base, k = 2;
        while (S.def.some(function (h) { return h.id === nid; })) nid = base + (k++);
        S.def.push({ id: nid, nombre: nom, ancla: ancla, color: color, dow: dow, desde: hoyISO() });
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

  /* Esc cierra la ficha antes que nadie más la vea pasar */
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
#habitosSlide{display:flex;flex-direction:column;gap:14px;height:100%;min-height:0}
.hb2-hd{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-shrink:0}
.hb2-hd .slide-title{margin-bottom:0;font-size:clamp(22px,2.8vw,36px)}
.hb2-hd .eyebrow{margin-bottom:8px}
.hb2-hd-r{display:flex;align-items:center;gap:10px;flex-shrink:0}
.hb2-mes{display:flex;align-items:center;gap:4px;font-family:var(--mono);font-size:12px;
  font-weight:700;color:var(--text2);text-transform:capitalize}
.hb2-mb{width:24px;height:24px;border-radius:8px;border:1px solid rgba(var(--ov),.12);
  background:rgba(var(--ov),.04);color:var(--text2);cursor:pointer;font-size:14px;line-height:1;
  font-family:inherit;transition:background .15s}
.hb2-mb:hover:not(:disabled){background:rgba(var(--ov),.1);color:var(--text)}
.hb2-mb:disabled{opacity:.25;cursor:default}
.hb2-hoy-pill{display:flex;align-items:center;gap:11px;padding:9px 15px;border-radius:14px;
  border:1px solid rgba(var(--w-rgb),.30);background:rgba(var(--w-rgb),.07)}
.hb2-hoy-n{display:flex;align-items:baseline;gap:2px;font-family:var(--mono)}
.hb2-hoy-n b{font-size:22px;font-weight:700;color:var(--w)}
.hb2-hoy-n i{font-size:13px;font-style:normal;font-weight:700;color:var(--text3)}

.hb2-k{font-family:var(--mono);font-size:8.5px;font-weight:700;letter-spacing:.16em;
  text-transform:uppercase;color:var(--text3)}

/* ── Las cuatro cifras ─────────────────────────────────────────────────── */
.hb2-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;flex-shrink:0}
.hb2-stat{padding:13px 16px;display:flex;align-items:center;gap:13px;border-radius:16px}
.hb2-stat.alerta{border-color:rgba(var(--r-rgb),.32);background:rgba(var(--r-rgb),.07)}
.hb2-stat-i{flex-shrink:0;display:flex}
.hb2-stat-i svg{width:21px;height:21px}
.hb2-stat-t{min-width:0;display:flex;flex-direction:column;gap:4px}
.hb2-stat-v{display:flex;align-items:baseline;gap:5px;font-family:var(--mono);line-height:1}
.hb2-stat-v b{font-size:25px;font-weight:700}
.hb2-stat-v i{font-size:11px;font-style:normal;font-weight:700;color:var(--text3)}

/* ── Cuerpo: cuadrícula + panel ───────────────────────────────────────── */
.hb2-cuerpo{display:flex;gap:14px;flex:1;min-height:0}
.hb2-grid{flex:1;min-width:0;padding:16px 18px;display:flex;flex-direction:column;gap:10px;border-radius:20px}
.hb2-grid-hd{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-shrink:0}
.hb2-leg{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.hb2-leg-i{display:flex;align-items:center;gap:5px;font-size:10px;color:var(--text3)}
.hb2-leg-i .hb2-c{width:11px;height:11px;border-radius:3px;cursor:default}
.hb2-scroll{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;gap:6px}
.hb2-cab{display:flex;align-items:center;gap:9px;flex-shrink:0;position:sticky;top:0;z-index:2;
  background:linear-gradient(180deg,rgba(var(--ov),.02),transparent);padding-bottom:2px}
.hb2-nom-sp{width:186px;flex-shrink:0}
.hb2-dn{width:20px;text-align:center;font-family:var(--mono);font-size:8.5px;font-weight:700;flex-shrink:0}
.hb2-filas{display:flex;flex-direction:column;gap:3px}
.hb2-fila{display:flex;align-items:center;gap:9px;padding:4px 6px;border-radius:11px;
  transition:background .15s}
.hb2-fila:hover{background:rgba(var(--ov),.035)}
.hb2-fila.peligro{background:rgba(var(--r-rgb),.06)}
.hb2-nom{width:186px;flex-shrink:0;min-width:0;display:flex;align-items:center;gap:8px;
  background:none;border:0;padding:0;cursor:pointer;font-family:inherit;text-align:left}
.hb2-pt{width:7px;height:7px;border-radius:2px;flex-shrink:0;display:block}
.hb2-nom-t{min-width:0;display:flex;flex-direction:column}
.hb2-nom-n{font-size:12px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;
  text-overflow:ellipsis}
.hb2-nom:hover .hb2-nom-n{color:var(--ac1)}
.hb2-nom-a{font-size:9px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hb2-celdas{display:flex;gap:3px}
.hb2-rac{width:70px;flex-shrink:0;display:flex;align-items:center;justify-content:flex-end;gap:5px;
  font-family:var(--mono)}
.hb2-rac b{font-size:14px;font-weight:700}
.hb2-rac i{font-size:9px;font-style:normal;font-weight:600;color:var(--text3)}
.hb2-cab .hb2-rac{justify-content:flex-end}

/* ── La celda ─────────────────────────────────────────────────────────── */
.hb2-c{width:20px;height:20px;border-radius:6px;flex-shrink:0;cursor:pointer;
  transition:transform .12s,box-shadow .12s}
.hb2-c:hover{transform:scale(1.2)}
.hb2-ok,.hb2-hoyok{background:var(--g);box-shadow:0 0 10px rgba(var(--g-rgb),.4)}
.hb2-no{background:rgba(var(--r-rgb),.13);border:1px solid rgba(var(--r-rgb),.38)}
.hb2-off{background:rgba(var(--ov),.035);cursor:default}
.hb2-off:hover{transform:none}
.hb2-fut{background:rgba(var(--ov),.05);border:1px solid rgba(var(--ov),.07);cursor:default}
.hb2-fut:hover{transform:none}
.hb2-hoy{background:rgba(var(--ov),.05);border:1.5px dashed rgba(var(--w-rgb),.75)}
.hb2-hoyok{box-shadow:0 0 0 2px rgba(var(--w-rgb),.85),0 0 14px rgba(var(--g-rgb),.55)}

.hb2-add{margin-top:2px;flex-shrink:0;align-self:flex-start;display:flex;align-items:center;gap:7px;
  padding:7px 13px;border-radius:10px;border:1px dashed rgba(var(--ov),.18);background:transparent;
  color:var(--text3);font-family:inherit;font-size:11px;font-weight:600;cursor:pointer;
  transition:border-color .15s,color .15s,background .15s}
.hb2-add:hover{border-color:var(--ac1);color:var(--ac1);background:rgba(var(--ov),.04)}
.hb2-add svg{width:13px;height:13px}

/* ── Panel derecho ────────────────────────────────────────────────────── */
.hb2-side{width:326px;flex-shrink:0;display:flex;flex-direction:column;gap:12px;min-height:0}
.hb2-aviso{padding:14px 16px;border-radius:16px;border:1px solid rgba(var(--r-rgb),.32);
  background:rgba(var(--r-rgb),.07);flex-shrink:0}
.hb2-aviso-h{display:flex;align-items:center;gap:8px;margin-bottom:7px;color:var(--r)}
.hb2-aviso-h svg{width:14px;height:14px;flex-shrink:0}
.hb2-aviso-h span{font-family:var(--mono);font-size:9px;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase}
.hb2-aviso-d{font-size:11.5px;line-height:1.5;color:var(--text2)}
.hb2-aviso-d b{color:var(--text)}

.hb2-hoy{padding:16px 18px;flex:1;min-height:0;display:flex;flex-direction:column;gap:10px;
  border-radius:20px}
.hb2-hoy-hd{display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.hb2-hoy-c{font-family:var(--mono);font-size:10.5px;font-weight:700;color:var(--text3)}
.hb2-barra{height:5px;border-radius:3px;background:rgba(var(--ov),.1);overflow:hidden;flex-shrink:0}
.hb2-barra i{display:block;height:100%;border-radius:3px;
  background:linear-gradient(90deg,var(--g),var(--cy));transition:width .3s}
.hb2-lista{display:flex;flex-direction:column;gap:6px;overflow-y:auto;min-height:0}
.hb2-t{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;cursor:pointer;
  background:rgba(var(--ov),.035);border:1px solid rgba(var(--ov),.09);font-family:inherit;
  text-align:left;transition:background .15s,border-color .15s}
.hb2-t:hover{background:rgba(var(--ov),.07)}
.hb2-t.on{background:rgba(var(--g-rgb),.09);border-color:rgba(var(--g-rgb),.3)}
.hb2-box{width:19px;height:19px;border-radius:6px;flex-shrink:0;display:flex;align-items:center;
  justify-content:center;background:rgba(var(--ov),.04);border:1.5px solid rgba(var(--ov),.22);
  transition:background .16s,border-color .16s}
.hb2-t.on .hb2-box{background:var(--g);border-color:var(--g);box-shadow:0 0 12px rgba(var(--g-rgb),.45)}
.hb2-box svg{width:12px;height:12px;fill:none;stroke:var(--bg);stroke-width:3.4;
  stroke-linecap:round;stroke-linejoin:round}
.hb2-t-txt{flex:1;min-width:0;display:flex;flex-direction:column}
.hb2-t-n{font-size:12px;font-weight:600;color:var(--text2);white-space:nowrap;overflow:hidden;
  text-overflow:ellipsis}
.hb2-t.on .hb2-t-n{color:var(--text)}
.hb2-t-a{font-size:9px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hb2-t-r{display:flex;align-items:center;gap:3px;flex-shrink:0;font-family:var(--mono);
  font-size:11px;font-weight:700}
.hb2-t-r svg{width:11px;height:11px}
.hb2-vacio{font-size:11.5px;color:var(--text3);line-height:1.5;padding:10px 2px}

/* ── La ficha ─────────────────────────────────────────────────────────── */
.hb2-ficha-ov{position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.6);backdrop-filter:blur(6px);
  display:none;align-items:center;justify-content:center;padding:24px}
.hb2-ficha-ov.open{display:flex}
.hb2-ficha-card{position:relative;width:100%;max-width:480px;max-height:100%;overflow-y:auto;
  border-radius:22px;padding:26px 28px;border:1px solid rgba(var(--ov),.13);
  box-shadow:0 24px 70px rgba(0,0,0,.5)}
:root:not([data-theme="light"]) .hb2-ficha-card{background:rgba(12,12,22,.97)}
:root[data-theme="light"] .hb2-ficha-card{background:rgba(255,255,255,.98)}
.hb2-x{position:absolute;top:16px;right:16px;width:30px;height:30px;border-radius:50%;
  border:1px solid rgba(var(--ov),.12);background:rgba(var(--ov),.05);color:var(--text2);
  cursor:pointer;font-size:13px;font-family:inherit;line-height:1}
.hb2-x:hover{background:rgba(var(--ov),.12);color:var(--text)}
.hb2-ficha-t{font-family:var(--font-title);font-size:25px;font-weight:600;line-height:1.15;
  margin:7px 0 9px;padding-right:36px}
.hb2-ficha-a{display:flex;align-items:center;gap:7px;font-size:11.5px;color:var(--text2)}
.hb2-ficha-a svg{width:13px;height:13px;color:var(--cy);flex-shrink:0}
.hb2-ficha-dow{font-size:10.5px;color:var(--text3);margin:6px 0 16px}
.hb2-ficha-2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:13px}
.hb2-ficha-st{padding:13px 15px;border-radius:15px}
.hb2-ficha-st>span:first-child{display:flex;align-items:center;gap:7px;font-family:var(--mono)}
.hb2-ficha-st svg{width:15px;height:15px}
.hb2-ficha-st b{font-size:23px;font-weight:700}
.hb2-ficha-st .hb2-k{display:block;margin-top:6px}
.hb2-ficha-cal{padding:15px 17px;border-radius:16px;margin-bottom:13px}
.hb2-ficha-cal-hd{display:flex;align-items:center;justify-content:space-between;gap:10px;
  margin-bottom:10px;text-transform:capitalize}
.hb2-fdow,.hb2-fcal{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
.hb2-fdow span{text-align:center;font-family:var(--mono);font-size:8px;font-weight:700;
  color:var(--text3);letter-spacing:.1em;margin-bottom:4px}
.hb2-fd{height:26px;border-radius:7px;display:flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:10px;font-weight:700;color:rgba(var(--ov),.22);
  background:rgba(var(--ov),.045);cursor:pointer;transition:transform .12s}
.hb2-fd:hover{transform:scale(1.08)}
.hb2-fd:empty{background:transparent;cursor:default}
.hb2-fd:empty:hover{transform:none}
.hb2-f-ok,.hb2-f-hoyok{background:var(--g);color:var(--bg)}
.hb2-f-no{background:rgba(var(--r-rgb),.13);color:var(--r);border:1px solid rgba(var(--r-rgb),.38)}
.hb2-f-hoy{background:rgba(var(--w-rgb),.10);color:var(--w);border:1.5px dashed rgba(var(--w-rgb),.75)}
.hb2-f-hoyok{box-shadow:0 0 0 2px rgba(var(--w-rgb),.7)}
.hb2-f-off{background:rgba(var(--ov),.03);color:rgba(var(--ov),.14);cursor:default}
.hb2-f-off:hover{transform:none}
.hb2-f-fut{cursor:default}
.hb2-f-fut:hover{transform:none}
.hb2-ficha-bars{padding:15px 17px;border-radius:16px}
.hb2-ficha-sub{font-size:10.5px;color:var(--text3);line-height:1.4;margin:4px 0 13px}
.hb2-bars{display:flex;align-items:flex-end;justify-content:space-between;gap:6px;height:120px}
.hb2-bar{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;
  justify-content:flex-end}
.hb2-bar i{display:block;width:100%;border-radius:5px 5px 2px 2px}
.hb2-bar-v{font-family:var(--mono);font-size:9.5px;font-weight:700}
.hb2-bar-d{font-family:var(--mono);font-size:9px;font-weight:700;letter-spacing:.1em}
.hb2-consejo{display:flex;align-items:flex-start;gap:8px;margin-top:13px;padding-top:12px;
  border-top:1px solid rgba(var(--ov),.08);font-size:11px;color:var(--text2);line-height:1.45}
.hb2-consejo svg{width:14px;height:14px;color:var(--w);flex-shrink:0;margin-top:1px}
.hb2-consejo b{color:var(--text)}
.hb2-ficha-pie{display:flex;gap:9px;margin-top:14px}
.hb2-b{display:flex;align-items:center;gap:6px;padding:9px 15px;border-radius:11px;
  border:1px solid rgba(var(--ov),.13);background:rgba(var(--ov),.05);color:var(--text2);
  font-family:inherit;font-size:11.5px;font-weight:700;cursor:pointer;transition:background .15s}
.hb2-b:hover{background:rgba(var(--ov),.11);color:var(--text)}
.hb2-b svg{width:13px;height:13px}
.hb2-b-r:hover{background:rgba(var(--r-rgb),.14);border-color:rgba(var(--r-rgb),.35);color:var(--r)}
.hb2-b-g{background:rgba(var(--g-rgb),.13);border-color:rgba(var(--g-rgb),.35);color:var(--g)}
.hb2-b-g:hover{background:rgba(var(--g-rgb),.2);color:var(--g)}

/* ── Editor ───────────────────────────────────────────────────────────── */
.hb2-lbl{display:block;font-family:var(--mono);font-size:8.5px;font-weight:700;letter-spacing:.16em;
  text-transform:uppercase;color:var(--text3);margin:14px 0 6px}
.hb2-lbl i{font-style:normal;text-transform:none;letter-spacing:0;font-size:9.5px;opacity:.8}
.hb2-in{width:100%;padding:10px 13px;border-radius:11px;border:1px solid rgba(var(--ov),.13);
  background:rgba(var(--ov),.04);color:var(--text);font-family:inherit;font-size:13px}
.hb2-in:focus{outline:none;border-color:var(--ac1);background:rgba(var(--ov),.07)}
.hb2-dows,.hb2-cols{display:flex;gap:6px;flex-wrap:wrap}
.hb2-dow{padding:7px 12px;border-radius:10px;border:1px solid rgba(var(--ov),.13);
  background:rgba(var(--ov),.04);color:var(--text2);font-family:var(--mono);font-size:11px;
  font-weight:700;cursor:pointer;transition:background .15s,border-color .15s}
.hb2-dow:hover{background:rgba(var(--ov),.09)}
.hb2-dow.on{background:rgba(var(--g-rgb),.15);border-color:rgba(var(--g-rgb),.4);color:var(--g)}
.hb2-col{width:26px;height:26px;border-radius:8px;border:2px solid transparent;cursor:pointer;
  transition:transform .12s}
.hb2-col:hover{transform:scale(1.12)}
.hb2-col.on{border-color:var(--text);transform:scale(1.12)}

/* ── Angosto ──────────────────────────────────────────────────────────── */
@media (max-width:1100px){
  .hb2-cuerpo{flex-direction:column;overflow-y:auto}
  .hb2-side{width:100%;flex-shrink:0}
  .hb2-hoy{max-height:none}
}
@media (max-width:720px){
  .hb2-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
  .hb2-hd{flex-direction:column;align-items:flex-start;gap:12px}
  .hb2-nom,.hb2-nom-sp{width:128px}
  .hb2-leg{display:none}
}
`;

  const st = document.createElement('style');
  st.id = 'hb2-css';
  st.textContent = CSS;
  document.head.appendChild(st);
})();
