/* ══════════════════════════════════════════════════════════════════════════
   SIMULACRO CT-GenAI — el motor
   ══════════════════════════════════════════════════════════════════════════

   Simulacro de examen ISTQB® CT-GenAI en condiciones reales: 40 preguntas,
   46 puntos, reloj corriendo y entrega automática al agotarse el tiempo.
   Las preguntas y la estructura salen de `examen-genai-data.js` — ahí está
   documentado de qué documento oficial viene cada cosa.

   POR QUÉ ES UN OVERLAY PROPIO Y NO UN PASO MÁS DE LA FICHA
   El panel de metas repinta su cuerpo entero cada vez que se cambia de paso
   (mdPintar()), así que un examen incrustado ahí perdería el DOM —y el
   temporizador— al primer clic. Este módulo monta su propia capa por encima,
   con su propio ciclo de vida.

   LO QUE SE GUARDA (localStorage, clave `examen_genai_v1`)
   · `curso`: el examen a medias, con el instante de finalización. Cerrar la
     pestaña por accidente no debe costar el intento: al volver se reanuda con
     el tiempo que quedaba de verdad, no con el que quedaba al guardar.
   · `intentos`: el histórico (fecha, puntos, %, aprobado, minutos usados y el
     desglose por capítulo), para ver si se está mejorando.

   CÓMO SE ARMA CADA EXAMEN
   Se recorre el blueprint oficial objetivo por objetivo y se eligen al azar
   las `n` variantes que pide de ese objetivo. Después se barajan las 40
   preguntas y también las 4 opciones de cada una: así ni el orden ni la letra
   se pueden memorizar entre intentos. La respuesta correcta viaja como texto
   y se recalcula su índice tras barajar.
   ══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const LS = 'examen_genai_v1';
  const D = () => window.EXAMEN_GENAI;

  /* Los dos juegos de preguntas. El A y el B cubren el mismo temario por caras
     distintas —ninguna pregunta del B repite el ángulo de una del A—, igual que
     los exámenes de muestra A y B de ISTQB. `AB` tira de los dos a la vez: los
     identificadores no se solapan, así que la mezcla no puede duplicar nada. */
  const SETS = {
    A:  { n: 'Examen A', d: 'El primer juego de preguntas' },
    B:  { n: 'Examen B', d: 'El segundo, sin repetir ningún ángulo del A' },
    AB: { n: 'Mezcla', d: 'Los dos bancos a la vez: la prueba más dura' }
  };
  function bancoDe(s) {
    const a = D().banco;
    const b = (window.EXAMEN_GENAI_B && window.EXAMEN_GENAI_B.banco) || [];
    if (s === 'B') return b.length ? b : a;
    if (s === 'AB') return a.concat(b);
    return a;
  }
  function haySetB() { return !!(window.EXAMEN_GENAI_B && window.EXAMEN_GENAI_B.banco.length); }

  /* ── Estado vivo ────────────────────────────────────────────────────── */
  let ex = null;        // { preguntas, resp, marcadas, i, finEn, minutos, inicio, set }
  let vista = 'inicio'; // inicio | test | fin | revision
  let tick = null;
  let resultado = null;
  let filtroFallos = false;
  let setElegido = 'A';

  /* ── Utilidades ─────────────────────────────────────────────────────── */
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const $ = id => document.getElementById(id);

  function barajar(a) {
    const r = a.slice();
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  }

  function guardado() {
    try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; }
  }
  function guardar(o) {
    try { localStorage.setItem(LS, JSON.stringify(o)); } catch (e) { /* modo privado */ }
  }
  function guardarCurso() {
    if (!ex) return;
    const g = guardado();
    g.curso = { preguntas: ex.preguntas, resp: ex.resp, marcadas: ex.marcadas,
                i: ex.i, finEn: ex.finEn, minutos: ex.minutos, inicio: ex.inicio,
                set: ex.set };
    guardar(g);
  }
  function borrarCurso() { const g = guardado(); delete g.curso; guardar(g); }

  const mmss = ms => {
    if (ms < 0) ms = 0;
    const t = Math.floor(ms / 1000);
    return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
  };

  /* ── Armar un examen conforme al blueprint ──────────────────────────── */
  function armar(minutos, set) {
    const d = D();
    const banco = bancoDe(set);
    const preguntas = [];
    d.blueprint.forEach(b => {
      const variantes = barajar(banco.filter(q => q.lo === b.lo));
      variantes.slice(0, b.n).forEach(q => {
        const correcta = q.o[q.r];
        const ops = barajar(q.o);
        preguntas.push({
          id: q.id, cap: q.cap, lo: q.lo, k: q.k, pts: q.pts,
          q: q.q, o: ops, r: ops.indexOf(correcta), why: q.why, ref: q.ref
        });
      });
    });
    const p = barajar(preguntas);
    ex = {
      preguntas: p,
      resp: new Array(p.length).fill(null),
      marcadas: new Array(p.length).fill(false),
      i: 0,
      minutos: minutos,
      set: set,
      inicio: Date.now(),
      finEn: Date.now() + minutos * 60000
    };
    guardarCurso();
  }

  /* ── Corregir ───────────────────────────────────────────────────────── */
  function corregir() {
    const d = D();
    let pts = 0, ok = 0, sinResponder = 0;
    const caps = {}, ks = {};
    ex.preguntas.forEach((q, i) => {
      const acierta = ex.resp[i] === q.r;
      if (ex.resp[i] === null) sinResponder++;
      if (acierta) { pts += q.pts; ok++; }
      caps[q.cap] = caps[q.cap] || { pts: 0, max: 0, ok: 0, n: 0 };
      caps[q.cap].max += q.pts; caps[q.cap].n++;
      if (acierta) { caps[q.cap].pts += q.pts; caps[q.cap].ok++; }
      ks[q.k] = ks[q.k] || { ok: 0, n: 0 };
      ks[q.k].n++; if (acierta) ks[q.k].ok++;
    });
    const usados = Math.min(Date.now() - ex.inicio, ex.minutos * 60000);
    resultado = {
      pts: pts, max: d.meta.puntos, ok: ok, n: ex.preguntas.length,
      sinResponder: sinResponder,
      pct: Math.round(pts / d.meta.puntos * 100),
      aprobado: pts >= d.meta.corte,
      caps: caps, ks: ks, ms: usados,
      fecha: Date.now(), minutos: ex.minutos, set: ex.set || 'A'
    };
    const g = guardado();
    g.intentos = (g.intentos || []).concat([{
      fecha: resultado.fecha, pts: pts, max: d.meta.puntos, pct: resultado.pct,
      aprobado: resultado.aprobado, ms: usados, minutos: ex.minutos, set: ex.set || 'A',
      caps: Object.keys(caps).reduce((a, c) => { a[c] = caps[c].pts + '/' + caps[c].max; return a; }, {})
    }]).slice(-40);
    delete g.curso;
    guardar(g);
  }

  /* ── Reloj ──────────────────────────────────────────────────────────── */
  function arrancarReloj() {
    pararReloj();
    tick = setInterval(() => {
      if (vista !== 'test' || !ex) return pararReloj();
      const q = ex.finEn - Date.now();
      const el = $('xg-reloj');
      if (el) {
        el.textContent = mmss(q);
        el.classList.toggle('urgente', q <= 5 * 60000);
        el.classList.toggle('aviso', q <= 10 * 60000 && q > 5 * 60000);
      }
      if (q <= 0) { pararReloj(); entregar(true); }
    }, 250);
  }
  function pararReloj() { if (tick) { clearInterval(tick); tick = null; } }

  /* ══════════════════════════════════════════════════════════════════════
     PINTAR
     ══════════════════════════════════════════════════════════════════════ */
  function pintar() {
    const cont = $('xg-cuerpo');
    if (!cont) return;
    if (vista === 'inicio') cont.innerHTML = vistaInicio();
    else if (vista === 'test') { cont.innerHTML = vistaTest(); arrancarReloj(); }
    else if (vista === 'fin') cont.innerHTML = vistaFin();
    else if (vista === 'revision') cont.innerHTML = vistaRevision();
    cont.scrollTop = 0;
  }

  /* ── Pantalla de inicio ─────────────────────────────────────────────── */
  function vistaInicio() {
    const d = D(), g = guardado();
    const hist = (g.intentos || []).slice().reverse();
    const curso = g.curso && g.curso.finEn > Date.now() ? g.curso : null;

    const filas = hist.slice(0, 6).map(t => {
      const f = new Date(t.fecha);
      const s = SETS[t.set || 'A'];
      return `<tr>
        <td>${f.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}
            <span class="xg-hora">${f.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</span></td>
        <td><span class="xg-tag">${esc(s ? s.n : t.set)}</span></td>
        <td class="xg-num">${t.pts}/${t.max}</td>
        <td class="xg-num">${t.pct}%</td>
        <td class="xg-num">${mmss(t.ms)}</td>
        <td><span class="xg-pill ${t.aprobado ? 'ok' : 'no'}">${t.aprobado ? 'Aprobado' : 'No'}</span></td>
      </tr>`;
    }).join('');

    const mejor = hist.length ? Math.max.apply(null, hist.map(t => t.pct)) : null;

    return `
    <div class="xg-inicio">
      <div class="xg-eyebrow">Simulacro en condiciones reales</div>
      <h2 class="xg-h2">${esc(d.meta.nombre)}</h2>
      <p class="xg-lead">${esc(d.meta.subtitulo)}. Mismo número de preguntas, mismo reparto por
      capítulo, mismos puntos y mismo corte que el examen oficial. Todas las preguntas se responden
      desde el <b>${esc(d.meta.syllabus)}</b>: no hay nada inventado fuera de ese documento.</p>

      ${curso ? `
      <div class="xg-reanudar">
        <div>
          <b>Tienes un examen a medias${SETS[curso.set || 'A'] ? ' — ' + esc(SETS[curso.set || 'A'].n) : ''}.</b>
          <span>Te quedan ${mmss(curso.finEn - Date.now())} y llevas
          ${curso.resp.filter(x => x !== null).length} de ${curso.preguntas.length} respondidas.</span>
        </div>
        <button class="xg-b xg-b-p" onclick="XGenAI.reanudar()">Reanudar</button>
      </div>` : ''}

      <div class="xg-datos">
        <div class="xg-dato"><b>${d.meta.preguntas}</b><span>preguntas</span></div>
        <div class="xg-dato"><b>${d.meta.puntos}</b><span>puntos</span></div>
        <div class="xg-dato"><b>${d.meta.corte}</b><span>para aprobar (${d.meta.cortePct}%)</span></div>
        <div class="xg-dato"><b>${d.meta.minutos}′</b><span>oficiales</span></div>
      </div>

      ${haySetB() ? `
      <div class="xg-arranque">
        <div class="xg-arranque-t">Elige el juego de preguntas</div>
        <div class="xg-sets">
          ${Object.keys(SETS).map(k => `
            <button class="xg-set${setElegido === k ? ' on' : ''}" onclick="XGenAI.elegirSet('${k}')">
              <b>${esc(SETS[k].n)}</b>
              <span>${esc(SETS[k].d)}</span>
              <i>${bancoDe(k).length} preguntas en banco</i>
            </button>`).join('')}
        </div>
        <p class="xg-nota">Los tres arman el mismo examen: 40 preguntas y 46 puntos con el reparto
        oficial. Cambia de dónde salen. Ninguna pregunta del <b>Examen B</b> repite el ángulo de una
        del A — es el mismo temario visto por la otra cara.</p>
      </div>` : ''}

      <div class="xg-arranque">
        <div class="xg-arranque-t">Elige el reloj${haySetB() ? ` · vas a hacer el <b>${esc(SETS[setElegido].n)}</b>` : ''}</div>
        <div class="xg-arranque-b">
          <button class="xg-b xg-b-p" onclick="XGenAI.empezar(75)">
            <b>75 minutos</b><span>Tu caso: +25% por presentar en un idioma que no es el tuyo</span>
          </button>
          <button class="xg-b" onclick="XGenAI.empezar(60)">
            <b>60 minutos</b><span>El tiempo oficial base, si quieres apretar</span>
          </button>
        </div>
      </div>

      <div class="xg-bloque">
        <div class="xg-bloque-t">Cómo se reparten las 40 preguntas</div>
        <table class="xg-tabla">
          <thead><tr><th>Capítulo</th><th>Preguntas</th><th>Puntos</th></tr></thead>
          <tbody>
            <tr><td>1 · Introducción a la IA generativa</td><td class="xg-num">7</td><td class="xg-num">7</td></tr>
            <tr><td>2 · Ingeniería de instrucciones</td><td class="xg-num">11</td><td class="xg-num">16</td></tr>
            <tr><td>3 · Gestión de riesgos</td><td class="xg-num">10</td><td class="xg-num">11</td></tr>
            <tr><td>4 · Infraestructura impulsada por MLG</td><td class="xg-num">5</td><td class="xg-num">5</td></tr>
            <tr><td>5 · Despliegue e integración</td><td class="xg-num">7</td><td class="xg-num">7</td></tr>
          </tbody>
        </table>
        <p class="xg-nota">Las 6 preguntas de nivel <b>K3</b> (aplicar) valen <b>2 puntos</b>; las 34 de
        K1 y K2, 1 punto. Por eso 40 preguntas dan 46 puntos. El capítulo 2 se lleva un tercio del
        examen: es donde más se pierde y donde más se recupera.</p>
      </div>

      <div class="xg-bloque">
        <div class="xg-bloque-t">Reglas de la casa</div>
        <ul class="xg-reglas">
          <li>Una sola respuesta correcta por pregunta. No se penaliza fallar, así que <b>no dejes ninguna en blanco</b>.</li>
          <li>Puedes marcar preguntas para revisarlas al final y volver a ellas desde el mapa lateral.</li>
          <li>Al acabarse el tiempo se entrega solo, con lo que lleves contestado.</li>
          <li>Si cierras sin querer, el examen se reanuda con el tiempo real que quedaba.</li>
          <li>Atajos: <b>1-4</b> responder · <b>←/→</b> navegar · <b>M</b> marcar · <b>Esc</b> salir.</li>
        </ul>
      </div>

      ${hist.length ? `
      <div class="xg-bloque">
        <div class="xg-bloque-t">Tus intentos ${mejor !== null ? `<span class="xg-mejor">mejor: ${mejor}%</span>` : ''}</div>
        <table class="xg-tabla xg-tabla-hist">
          <thead><tr><th>Fecha</th><th>Examen</th><th>Puntos</th><th>%</th><th>Tiempo</th><th></th></tr></thead>
          <tbody>${filas}</tbody>
        </table>
        ${hist.length > 6 ? `<p class="xg-nota">Se muestran los 6 últimos de ${hist.length}.</p>` : ''}
        <button class="xg-b xg-b-min" onclick="XGenAI.borrarHistorial()">Borrar historial</button>
      </div>` : ''}

      <p class="xg-pie">Requisito de acceso al examen real: ${esc(d.meta.requisito)}.</p>
    </div>`;
  }

  /* ── Pantalla de examen ─────────────────────────────────────────────────
     Durante el examen solo se ve el número de pregunta y lo que vale. El
     capítulo, el objetivo de aprendizaje y el nivel K son pistas que el examen
     real no da —saber que una pregunta es del capítulo 3 ya orienta la
     respuesta—, así que se guardan para la revisión, que es donde sirven. */
  function vistaTest() {
    const q = ex.preguntas[ex.i];
    const total = ex.preguntas.length;
    const hechas = ex.resp.filter(x => x !== null).length;

    const mapa = ex.preguntas.map((_, k) => {
      const cls = (ex.resp[k] !== null ? ' hecha' : '') + (ex.marcadas[k] ? ' marcada' : '') + (k === ex.i ? ' on' : '');
      return `<button class="xg-mp${cls}" onclick="XGenAI.ir(${k})" title="Pregunta ${k + 1}">${k + 1}</button>`;
    }).join('');

    const ops = q.o.map((t, k) => `
      <button class="xg-op${ex.resp[ex.i] === k ? ' on' : ''}" onclick="XGenAI.responder(${k})">
        <span class="xg-op-l">${'ABCD'[k]}</span><span class="xg-op-t">${t}</span>
      </button>`).join('');

    return `
    <div class="xg-test">
      <aside class="xg-lateral">
        <div class="xg-lateral-t">Mapa del examen</div>
        <div class="xg-mapa">${mapa}</div>
        <div class="xg-leyenda">
          <span><i class="l-hecha"></i>respondida</span>
          <span><i class="l-marcada"></i>para revisar</span>
        </div>
        <button class="xg-b xg-b-entregar" onclick="XGenAI.pedirEntrega()">Entregar examen</button>
        <div class="xg-lateral-n">${hechas} de ${total} respondidas</div>
      </aside>

      <section class="xg-panel">
        <div class="xg-panel-top">
          <div class="xg-mig">
            <span class="xg-n">Pregunta ${ex.i + 1} / ${total}</span>
            <span class="xg-tag">${q.pts} ${q.pts === 1 ? 'punto' : 'puntos'}</span>
            ${ex.set && SETS[ex.set] && haySetB() ? `<span class="xg-tag">${esc(SETS[ex.set].n)}</span>` : ''}
          </div>
          <div class="xg-reloj-caja">
            <span class="xg-reloj-lbl">Tiempo</span>
            <b id="xg-reloj">${mmss(ex.finEn - Date.now())}</b>
          </div>
        </div>

        <div class="xg-progreso"><i style="width:${(ex.i + 1) / total * 100}%"></i></div>

        <div class="xg-q">${q.q}</div>
        <div class="xg-ops">${ops}</div>

        <div class="xg-acc">
          <button class="xg-b xg-b-min${ex.marcadas[ex.i] ? ' on' : ''}" onclick="XGenAI.marcar()">
            ${ex.marcadas[ex.i] ? '★ Marcada' : '☆ Marcar para revisar'}
          </button>
          <div class="xg-acc-nav">
            <button class="xg-b" onclick="XGenAI.mover(-1)" ${ex.i === 0 ? 'disabled' : ''}>‹ Anterior</button>
            <button class="xg-b xg-b-p" onclick="XGenAI.mover(1)" ${ex.i === total - 1 ? 'disabled' : ''}>Siguiente ›</button>
          </div>
        </div>
      </section>
    </div>`;
  }

  /* ── Pantalla de resultado ──────────────────────────────────────────── */
  function vistaFin() {
    const d = D(), r = resultado;
    const caps = Object.keys(r.caps).sort().map(c => {
      const x = r.caps[c];
      const pct = Math.round(x.pts / x.max * 100);
      return `<div class="xg-cap">
        <div class="xg-cap-h">
          <span class="xg-cap-n">Capítulo ${c}</span>
          <span class="xg-cap-t">${esc(d.capitulos[c])}</span>
          <b class="xg-cap-p ${pct >= 65 ? 'ok' : 'no'}">${x.pts}/${x.max}</b>
        </div>
        <div class="xg-cap-bar"><i class="${pct >= 65 ? 'ok' : 'no'}" style="width:${pct}%"></i></div>
      </div>`;
    }).join('');

    const ks = ['K1', 'K2', 'K3'].filter(k => r.ks[k]).map(k =>
      `<div class="xg-dato"><b>${r.ks[k].ok}/${r.ks[k].n}</b><span>${k} · ${k === 'K1' ? 'recordar' : k === 'K2' ? 'comprender' : 'aplicar'}</span></div>`
    ).join('');

    const falla = Object.keys(r.caps).sort()
      .filter(c => r.caps[c].pts / r.caps[c].max < 0.65)
      .map(c => 'capítulo ' + c);

    return `
    <div class="xg-fin">
      <div class="xg-veredicto ${r.aprobado ? 'ok' : 'no'}">
        <div class="xg-veredicto-l">${r.aprobado ? 'APROBADO' : 'NO APROBADO'}${SETS[r.set] && haySetB() ? ' · ' + esc(SETS[r.set].n.toUpperCase()) : ''}</div>
        <div class="xg-veredicto-n">${r.pts}<span>/${r.max} puntos</span></div>
        <div class="xg-veredicto-d">${r.pct}% · el corte está en ${d.meta.corte} puntos (${d.meta.cortePct}%)</div>
      </div>

      <div class="xg-datos">
        <div class="xg-dato"><b>${r.ok}/${r.n}</b><span>preguntas acertadas</span></div>
        <div class="xg-dato"><b>${mmss(r.ms)}</b><span>de ${r.minutos} minutos</span></div>
        ${ks}
        ${r.sinResponder ? `<div class="xg-dato alerta"><b>${r.sinResponder}</b><span>sin responder</span></div>` : ''}
      </div>

      <div class="xg-bloque">
        <div class="xg-bloque-t">Dónde estás por capítulo</div>
        ${caps}
        <p class="xg-nota">${falla.length
          ? `Por debajo del 65% en <b>${falla.join(' y ')}</b>. Ahí es donde toca releer el syllabus antes del siguiente intento — la revisión de abajo te dice la sección exacta de cada fallo.`
          : (haySetB() && r.set !== 'AB'
              ? `Vas por encima del 65% en todos los capítulos. Prueba ahora el <b>${esc(SETS[r.set === 'A' ? 'B' : 'A'].n)}</b>, que ataca el mismo temario por otra cara, o la <b>Mezcla</b> si quieres el banco entero.`
              : 'Vas por encima del 65% en todos los capítulos. Repite el simulacro en unos días: cada intento arma preguntas distintas del banco.')}</p>
      </div>

      <div class="xg-fin-acc">
        <button class="xg-b xg-b-p" onclick="XGenAI.revisar()">Revisar las 40 preguntas</button>
        <button class="xg-b" onclick="XGenAI.aInicio()">Volver al inicio</button>
      </div>
    </div>`;
  }

  /* ── Pantalla de revisión ───────────────────────────────────────────── */
  function vistaRevision() {
    const lista = ex.preguntas.map((q, i) => ({ q: q, i: i, ok: ex.resp[i] === q.r }))
      .filter(x => !filtroFallos || !x.ok);

    const items = lista.map(x => {
      const q = x.q, i = x.i;
      const ops = q.o.map((t, k) => {
        let cls = '';
        if (k === q.r) cls = ' correcta';
        else if (ex.resp[i] === k) cls = ' elegida-mal';
        return `<div class="xg-rop${cls}">
          <span class="xg-op-l">${'ABCD'[k]}</span><span class="xg-op-t">${t}</span>
          ${k === q.r ? '<span class="xg-rmark ok">correcta</span>' : ''}
          ${(ex.resp[i] === k && k !== q.r) ? '<span class="xg-rmark no">tu respuesta</span>' : ''}
        </div>`;
      }).join('');
      return `
      <div class="xg-rev-item ${x.ok ? 'ok' : 'no'}">
        <div class="xg-rev-h">
          <span class="xg-rev-n">${i + 1}</span>
          <span class="xg-tag">Cap. ${q.cap}</span>
          <span class="xg-tag">${q.lo}</span>
          <span class="xg-tag">${q.k}</span>
          <span class="xg-rev-v ${x.ok ? 'ok' : 'no'}">${x.ok ? '✓ acertada' : (ex.resp[i] === null ? '— sin responder' : '✕ fallada')}</span>
        </div>
        <div class="xg-q">${q.q}</div>
        <div class="xg-rops">${ops}</div>
        <div class="xg-why"><b>Por qué:</b> ${q.why}
          <span class="xg-ref">Syllabus, sección ${esc(q.ref)}</span></div>
      </div>`;
    }).join('');

    const fallos = ex.preguntas.filter((q, i) => ex.resp[i] !== q.r).length;

    return `
    <div class="xg-rev">
      <div class="xg-rev-top">
        <div>
          <div class="xg-eyebrow">Revisión razonada</div>
          <h2 class="xg-h2">${resultado.pts}/${resultado.max} puntos · ${fallos} ${fallos === 1 ? 'fallo' : 'fallos'}</h2>
        </div>
        <div class="xg-rev-acc">
          <button class="xg-b xg-b-min${filtroFallos ? ' on' : ''}" onclick="XGenAI.filtrar()">
            ${filtroFallos ? 'Ver las 40' : 'Solo lo fallado'}
          </button>
          <button class="xg-b" onclick="XGenAI.aInicio()">Volver al inicio</button>
        </div>
      </div>
      ${lista.length ? items : '<p class="xg-nota">No fallaste ninguna. Vuelve a intentarlo en unos días con preguntas nuevas.</p>'}
    </div>`;
  }

  /* ══════════════════════════════════════════════════════════════════════
     API pública
     ══════════════════════════════════════════════════════════════════════ */
  const API = {
    abrir: function () {
      if (!D()) { alert('No se pudo cargar el banco de preguntas (examen-genai-data.js).'); return; }
      montar();
      vista = 'inicio'; ex = null; resultado = null; filtroFallos = false;
      $('xg-overlay').classList.add('open');
      document.body.classList.add('xg-abierto');
      pintar();
    },

    cerrar: function () {
      if (vista === 'test' && ex) {
        if (!confirm('Vas a salir del examen. El tiempo sigue corriendo y podrás reanudarlo desde donde lo dejaste. ¿Salir?')) return;
        guardarCurso();
      }
      pararReloj();
      const ov = $('xg-overlay');
      if (ov) ov.classList.remove('open');
      document.body.classList.remove('xg-abierto');
    },

    elegirSet: function (s) {
      if (!SETS[s]) return;
      setElegido = s;
      pintar();
    },

    empezar: function (min) {
      armar(min, setElegido);
      vista = 'test';
      pintar();
    },

    reanudar: function () {
      const g = guardado();
      if (!g.curso || g.curso.finEn <= Date.now()) { API.aInicio(); return; }
      ex = g.curso;
      if (ex.set && SETS[ex.set]) setElegido = ex.set;
      vista = 'test';
      pintar();
    },

    responder: function (k) {
      ex.resp[ex.i] = (ex.resp[ex.i] === k ? null : k);
      guardarCurso();
      pintar();
    },

    marcar: function () {
      ex.marcadas[ex.i] = !ex.marcadas[ex.i];
      guardarCurso();
      pintar();
    },

    ir: function (k) { ex.i = k; guardarCurso(); pintar(); },

    mover: function (d) {
      const n = ex.i + d;
      if (n < 0 || n >= ex.preguntas.length) return;
      ex.i = n; guardarCurso(); pintar();
    },

    pedirEntrega: function () {
      const faltan = ex.resp.filter(x => x === null).length;
      const marcadas = ex.marcadas.filter(Boolean).length;
      let msg = '¿Entregar el examen?';
      if (faltan) msg += `\n\nTe quedan ${faltan} preguntas sin responder. No se penaliza fallar, así que conviene contestarlas todas.`;
      if (marcadas) msg += `\n\nTienes ${marcadas} marcadas para revisar.`;
      if (confirm(msg)) entregar(false);
    },

    revisar: function () { vista = 'revision'; filtroFallos = false; pintar(); },
    filtrar: function () { filtroFallos = !filtroFallos; pintar(); },
    aInicio: function () { pararReloj(); vista = 'inicio'; ex = null; pintar(); },

    borrarHistorial: function () {
      if (!confirm('¿Borrar el historial de intentos? No se puede deshacer.')) return;
      const g = guardado(); delete g.intentos; guardar(g); pintar();
    }
  };

  function entregar(porTiempo) {
    pararReloj();
    corregir();
    vista = 'fin';
    pintar();
    if (porTiempo) {
      const av = document.createElement('div');
      av.className = 'xg-toast';
      av.textContent = 'Se acabó el tiempo. El examen se entregó con lo que llevabas respondido.';
      $('xg-overlay').appendChild(av);
      setTimeout(() => av.remove(), 6000);
    }
  }

  /* ── Teclado ────────────────────────────────────────────────────────── */
  function teclas(e) {
    const ov = $('xg-overlay');
    if (!ov || !ov.classList.contains('open')) return;
    if (e.key === 'Escape') { e.stopPropagation(); API.cerrar(); return; }
    if (vista !== 'test' || !ex) return;
    if (e.key >= '1' && e.key <= '4') { API.responder(+e.key - 1); e.preventDefault(); return; }
    if (e.key === 'ArrowRight') { API.mover(1); e.preventDefault(); return; }
    if (e.key === 'ArrowLeft') { API.mover(-1); e.preventDefault(); return; }
    if (e.key === 'm' || e.key === 'M') { API.marcar(); e.preventDefault(); }
  }

  /* ── Montaje: la capa y sus estilos, una sola vez ───────────────────── */
  let montado = false;
  function montar() {
    if (montado) return;
    montado = true;

    const st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    const ov = document.createElement('div');
    ov.id = 'xg-overlay';
    ov.className = 'xg-overlay';
    ov.innerHTML = `
      <div class="xg-card">
        <div class="xg-head">
          <div class="xg-head-t">
            <span class="xg-head-ico">🤖</span>
            <div>
              <div class="xg-head-n">Simulacro ISTQB® CT-GenAI</div>
              <div class="xg-head-d">40 preguntas · 46 puntos · corte en 30</div>
            </div>
          </div>
          <button class="xg-x" onclick="XGenAI.cerrar()" aria-label="Cerrar">✕</button>
        </div>
        <div class="xg-cuerpo" id="xg-cuerpo"></div>
      </div>`;
    document.body.appendChild(ov);
    ov.addEventListener('click', e => { if (e.target === ov) API.cerrar(); });
    // Captura, para ganarle al Escape del panel de metas que hay debajo.
    document.addEventListener('keydown', teclas, true);
  }

  window.XGenAI = API;
  window.abrirExamenGenAI = API.abrir;

  /* ══════════════════════════════════════════════════════════════════════
     ESTILOS — usan las variables de tema del dashboard (--bg, --g, --r…),
     así que el examen sigue el modo claro/oscuro sin código extra.
     ══════════════════════════════════════════════════════════════════════ */
  const CSS = `
.xg-overlay{position:fixed;inset:0;z-index:2600;display:none;align-items:center;justify-content:center;
  padding:min(3vh,26px) min(3vw,26px);background:rgba(2,2,8,.82);backdrop-filter:blur(7px)}
.xg-overlay.open{display:flex}
body.xg-abierto{overflow:hidden}
.xg-card{width:min(1180px,100%);height:100%;display:flex;flex-direction:column;border-radius:20px;
  border:1px solid rgba(var(--ov),.12);overflow:hidden;box-shadow:0 30px 90px rgba(0,0,0,.55);
  background:var(--bg)}
:root[data-theme="light"] .xg-card{background:rgba(255,255,255,.97)}
:root:not([data-theme="light"]) .xg-card{background:rgba(10,10,18,.97)}

.xg-head{flex:none;display:flex;align-items:center;justify-content:space-between;gap:14px;
  padding:14px 20px;border-bottom:1px solid rgba(var(--ov),.09);
  background:linear-gradient(100deg,rgba(0,232,122,.09),transparent 62%)}
.xg-head-t{display:flex;align-items:center;gap:12px;min-width:0}
.xg-head-ico{font-size:22px;flex-shrink:0}
.xg-head-n{font-family:var(--font-title);font-size:17px;font-weight:600;color:var(--text)}
.xg-head-d{font-family:var(--mono);font-size:11px;color:var(--text3);margin-top:2px}
.xg-x{width:34px;height:34px;flex-shrink:0;border-radius:50%;border:1px solid rgba(var(--ov),.14);
  background:rgba(var(--ov),.05);color:var(--text2);font-size:14px;cursor:pointer;font-family:inherit}
.xg-x:hover{background:rgba(var(--ov),.11);color:var(--text)}
.xg-cuerpo{flex:1;min-height:0;overflow-y:auto}

/* ── Piezas comunes ── */
.xg-eyebrow{font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--g)}
.xg-h2{font-family:var(--font-title);font-size:clamp(21px,2.4vw,29px);font-weight:600;
  color:var(--text);margin:6px 0 0;letter-spacing:-.01em}
.xg-lead{font-size:14px;line-height:1.65;color:var(--text2);margin:11px 0 0;max-width:74ch}
.xg-nota{font-size:12.5px;line-height:1.6;color:var(--text3);margin:11px 0 0}
.xg-pie{font-size:11.5px;color:var(--text3);margin:22px 0 0;padding-top:14px;
  border-top:1px solid rgba(var(--ov),.08)}
.xg-num{font-family:var(--mono);text-align:right;white-space:nowrap}

.xg-b{padding:9px 16px;border-radius:11px;border:1px solid rgba(var(--ov),.14);
  background:rgba(var(--ov),.05);color:var(--text);font-family:inherit;font-size:13px;
  font-weight:700;cursor:pointer;transition:background .15s,border-color .15s}
.xg-b:hover:not(:disabled){background:rgba(var(--ov),.11)}
.xg-b:disabled{opacity:.35;cursor:default}
.xg-b-p{background:linear-gradient(135deg,rgba(0,232,122,.2),rgba(0,224,192,.12));
  border-color:rgba(0,232,122,.4);color:var(--g)}
.xg-b-p:hover:not(:disabled){background:linear-gradient(135deg,rgba(0,232,122,.3),rgba(0,224,192,.18))}
.xg-b-min{padding:7px 13px;font-size:12px;color:var(--text2)}
.xg-b-min.on{color:var(--w);border-color:rgba(var(--w-rgb),.4);background:rgba(var(--w-rgb),.12)}

.xg-tag{font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.04em;
  padding:3px 7px;border-radius:6px;background:rgba(var(--ov),.07);color:var(--text3);white-space:nowrap}

.xg-datos{display:flex;flex-wrap:wrap;gap:10px;margin:20px 0 0}
.xg-dato{flex:1 1 130px;padding:12px 14px;border-radius:13px;border:1px solid rgba(var(--ov),.1);
  background:rgba(var(--ov),.04)}
.xg-dato b{display:block;font-family:var(--mono);font-size:22px;font-weight:700;color:var(--g);line-height:1.1}
.xg-dato span{display:block;font-size:11px;color:var(--text3);margin-top:4px;line-height:1.35}
.xg-dato.alerta b{color:var(--w)}

.xg-bloque{margin:24px 0 0;padding:16px 18px;border-radius:15px;border:1px solid rgba(var(--ov),.1);
  background:rgba(var(--ov),.03)}
.xg-bloque-t{display:flex;align-items:center;gap:9px;font-size:10px;font-weight:800;letter-spacing:.1em;
  text-transform:uppercase;color:var(--text3);margin-bottom:12px}
.xg-mejor{font-family:var(--mono);font-size:10px;letter-spacing:0;color:var(--g);
  padding:2px 7px;border-radius:6px;background:rgba(0,232,122,.12)}

.xg-tabla{width:100%;border-collapse:collapse;font-size:13px}
.xg-tabla th{text-align:left;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;
  color:var(--text3);padding:0 10px 8px 0;border-bottom:1px solid rgba(var(--ov),.09)}
.xg-tabla th:not(:first-child){text-align:right}
.xg-tabla td{padding:8px 10px 8px 0;color:var(--text2);border-bottom:1px solid rgba(var(--ov),.05)}
.xg-tabla tr:last-child td{border-bottom:none}
.xg-hora{font-family:var(--mono);font-size:11px;color:var(--text3);margin-left:5px}
.xg-pill{font-size:10.5px;font-weight:700;padding:3px 9px;border-radius:20px;white-space:nowrap}
.xg-pill.ok{background:rgba(0,232,122,.14);color:var(--g)}
.xg-pill.no{background:rgba(var(--r-rgb),.14);color:var(--r)}
.xg-tabla-hist td:last-child{text-align:right}

.xg-reglas{margin:0;padding-left:19px;font-size:13px;line-height:1.75;color:var(--text2)}
.xg-reglas li{margin-bottom:3px}
.xg-reglas b{color:var(--text)}

/* ── Inicio ── */
.xg-inicio{padding:26px 26px 34px;max-width:960px;margin:0 auto}
.xg-reanudar{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;
  margin:20px 0 0;padding:14px 16px;border-radius:14px;border:1px solid rgba(var(--w-rgb),.32);
  background:rgba(var(--w-rgb),.09)}
.xg-reanudar b{display:block;font-size:13.5px;color:var(--text)}
.xg-reanudar span{display:block;font-size:12px;color:var(--text2);margin-top:3px}
.xg-arranque{margin:24px 0 0;padding:18px;border-radius:15px;
  border:1px solid rgba(0,232,122,.24);background:linear-gradient(135deg,rgba(0,232,122,.07),transparent 70%)}
.xg-arranque-t{font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
  color:var(--g);margin-bottom:12px}
.xg-arranque-t b{color:var(--text)}
/* Los tres juegos de preguntas. Chips grandes: se elige una vez y se ve cuál está activo. */
.xg-sets{display:flex;gap:10px;flex-wrap:wrap}
.xg-set{flex:1 1 200px;text-align:left;padding:13px 15px;border-radius:13px;cursor:pointer;
  font-family:inherit;border:1px solid rgba(var(--ov),.13);background:rgba(var(--ov),.04);
  transition:border-color .15s,background .15s}
.xg-set:hover{background:rgba(var(--ov),.09)}
.xg-set.on{border-color:rgba(0,232,122,.5);background:rgba(0,232,122,.1)}
.xg-set b{display:block;font-size:14px;font-weight:800;color:var(--text);margin-bottom:3px}
.xg-set.on b{color:var(--g)}
.xg-set span{display:block;font-size:11.5px;line-height:1.4;color:var(--text3)}
.xg-set i{display:block;margin-top:6px;font-family:var(--mono);font-style:normal;font-size:10px;
  color:var(--text3);opacity:.8}
.xg-arranque-b{display:flex;gap:11px;flex-wrap:wrap}
.xg-arranque-b .xg-b{flex:1 1 240px;text-align:left;padding:14px 16px}
.xg-arranque-b .xg-b b{display:block;font-size:15px;margin-bottom:3px}
.xg-arranque-b .xg-b span{display:block;font-size:11.5px;font-weight:500;color:var(--text3);line-height:1.4}

/* ── Examen ── */
.xg-test{display:flex;height:100%;min-height:0}
.xg-lateral{flex:none;width:214px;display:flex;flex-direction:column;gap:12px;padding:16px 14px;
  border-right:1px solid rgba(var(--ov),.09);overflow-y:auto}
.xg-lateral-t{font-size:9.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--text3)}
.xg-mapa{display:grid;grid-template-columns:repeat(5,1fr);gap:5px}
.xg-mp{aspect-ratio:1;border-radius:8px;border:1px solid rgba(var(--ov),.12);
  background:rgba(var(--ov),.04);color:var(--text3);font-family:var(--mono);font-size:11px;
  font-weight:700;cursor:pointer;transition:transform .12s}
.xg-mp:hover{transform:translateY(-1px);color:var(--text)}
.xg-mp.hecha{background:rgba(0,232,122,.16);border-color:rgba(0,232,122,.32);color:var(--g)}
.xg-mp.marcada{border-color:rgba(var(--w-rgb),.55);box-shadow:inset 0 0 0 1px rgba(var(--w-rgb),.3)}
.xg-mp.on{outline:2px solid var(--g);outline-offset:1px;color:var(--text)}
.xg-leyenda{display:flex;flex-direction:column;gap:5px;font-size:10.5px;color:var(--text3)}
.xg-leyenda span{display:flex;align-items:center;gap:6px}
.xg-leyenda i{width:11px;height:11px;border-radius:4px;flex-shrink:0}
.xg-leyenda i.l-hecha{background:rgba(0,232,122,.35)}
.xg-leyenda i.l-marcada{border:1.5px solid rgba(var(--w-rgb),.7)}
.xg-b-entregar{margin-top:auto;width:100%;border-color:rgba(var(--r-rgb),.32);
  background:rgba(var(--r-rgb),.1);color:var(--r)}
.xg-b-entregar:hover{background:rgba(var(--r-rgb),.18)}
.xg-lateral-n{font-family:var(--mono);font-size:11px;color:var(--text3);text-align:center}

.xg-panel{flex:1;min-width:0;display:flex;flex-direction:column;padding:18px 24px 22px;overflow-y:auto}
.xg-panel-top{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;flex-wrap:wrap}
.xg-mig{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.xg-n{font-family:var(--mono);font-size:11px;font-weight:700;letter-spacing:.08em;
  text-transform:uppercase;color:var(--g)}
.xg-reloj-caja{display:flex;align-items:center;gap:8px;padding:6px 13px;border-radius:11px;
  border:1px solid rgba(var(--ov),.12);background:rgba(var(--ov),.05)}
.xg-reloj-lbl{font-size:9.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--text3)}
#xg-reloj{font-family:var(--mono);font-size:19px;font-weight:700;color:var(--text);
  font-variant-numeric:tabular-nums}
#xg-reloj.aviso{color:var(--w)}
#xg-reloj.urgente{color:var(--r);animation:xgpulso 1s ease-in-out infinite}
@keyframes xgpulso{50%{opacity:.45}}

.xg-progreso{height:3px;border-radius:3px;background:rgba(var(--ov),.09);margin:13px 0 20px;overflow:hidden}
.xg-progreso i{display:block;height:100%;border-radius:3px;
  background:linear-gradient(90deg,var(--g),var(--cy));transition:width .3s}

.xg-q{font-size:16px;line-height:1.6;color:var(--text);font-weight:500}
.xg-q b{font-weight:700}
.xg-ops{display:flex;flex-direction:column;gap:9px;margin:20px 0 0}
.xg-op{display:flex;align-items:flex-start;gap:12px;padding:13px 15px;border-radius:13px;
  border:1px solid rgba(var(--ov),.11);background:rgba(var(--ov),.035);text-align:left;
  cursor:pointer;font-family:inherit;transition:border-color .15s,background .15s}
.xg-op:hover{background:rgba(var(--ov),.07);border-color:rgba(var(--ov),.2)}
.xg-op.on{border-color:rgba(0,232,122,.5);background:rgba(0,232,122,.1)}
.xg-op-l{flex:none;width:24px;height:24px;border-radius:7px;display:flex;align-items:center;
  justify-content:center;font-family:var(--mono);font-size:11px;font-weight:700;
  background:rgba(var(--ov),.09);color:var(--text3)}
.xg-op.on .xg-op-l{background:rgba(0,232,122,.25);color:var(--g)}
.xg-op-t{flex:1;font-size:14px;line-height:1.55;color:var(--text2)}
.xg-op.on .xg-op-t{color:var(--text)}
.xg-acc{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;
  margin-top:22px;padding-top:16px;border-top:1px solid rgba(var(--ov),.08)}
.xg-acc-nav{display:flex;gap:9px}

/* ── Resultado ── */
.xg-fin{padding:26px 26px 34px;max-width:900px;margin:0 auto}
.xg-veredicto{padding:22px 24px;border-radius:17px;text-align:center}
.xg-veredicto.ok{border:1px solid rgba(0,232,122,.36);
  background:linear-gradient(135deg,rgba(0,232,122,.13),rgba(0,224,192,.05))}
.xg-veredicto.no{border:1px solid rgba(var(--r-rgb),.34);
  background:linear-gradient(135deg,rgba(var(--r-rgb),.11),transparent 70%)}
.xg-veredicto-l{font-size:11px;font-weight:800;letter-spacing:.18em}
.xg-veredicto.ok .xg-veredicto-l{color:var(--g)}
.xg-veredicto.no .xg-veredicto-l{color:var(--r)}
.xg-veredicto-n{font-family:var(--mono);font-size:clamp(38px,6vw,56px);font-weight:700;
  color:var(--text);line-height:1.05;margin:6px 0 2px}
.xg-veredicto-n span{font-size:19px;color:var(--text3);font-weight:500}
.xg-veredicto-d{font-size:12.5px;color:var(--text2)}

.xg-cap{margin-bottom:13px}
.xg-cap:last-of-type{margin-bottom:0}
.xg-cap-h{display:flex;align-items:baseline;gap:9px;margin-bottom:6px;flex-wrap:wrap}
.xg-cap-n{font-family:var(--mono);font-size:11px;font-weight:700;color:var(--text3);flex:none}
.xg-cap-t{flex:1;min-width:0;font-size:12.5px;color:var(--text2)}
.xg-cap-p{font-family:var(--mono);font-size:13px;font-weight:700;flex:none}
.xg-cap-p.ok{color:var(--g)} .xg-cap-p.no{color:var(--r)}
.xg-cap-bar{height:5px;border-radius:5px;background:rgba(var(--ov),.09);overflow:hidden}
.xg-cap-bar i{display:block;height:100%;border-radius:5px;transition:width .5s}
.xg-cap-bar i.ok{background:linear-gradient(90deg,var(--g),var(--cy))}
.xg-cap-bar i.no{background:var(--r)}
.xg-fin-acc{display:flex;gap:11px;flex-wrap:wrap;margin-top:24px}

/* ── Revisión ── */
.xg-rev{padding:26px 26px 34px;max-width:920px;margin:0 auto}
.xg-rev-top{display:flex;align-items:flex-end;justify-content:space-between;gap:14px;flex-wrap:wrap;
  margin-bottom:22px}
.xg-rev-acc{display:flex;gap:9px}
.xg-rev-item{padding:17px 18px;border-radius:15px;border:1px solid rgba(var(--ov),.1);
  background:rgba(var(--ov),.03);margin-bottom:14px}
.xg-rev-item.no{border-color:rgba(var(--r-rgb),.26);background:rgba(var(--r-rgb),.045)}
.xg-rev-h{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:11px}
.xg-rev-n{font-family:var(--mono);font-size:12px;font-weight:700;color:var(--text3);
  width:25px;height:25px;border-radius:7px;background:rgba(var(--ov),.08);
  display:flex;align-items:center;justify-content:center;flex:none}
.xg-rev-v{margin-left:auto;font-size:11px;font-weight:700;white-space:nowrap}
.xg-rev-v.ok{color:var(--g)} .xg-rev-v.no{color:var(--r)}
.xg-rev-item .xg-q{font-size:14.5px}
.xg-rops{display:flex;flex-direction:column;gap:6px;margin:13px 0 0}
.xg-rop{display:flex;align-items:flex-start;gap:11px;padding:10px 13px;border-radius:11px;
  border:1px solid rgba(var(--ov),.08);background:rgba(var(--ov),.02)}
.xg-rop .xg-op-t{font-size:13px}
.xg-rop.correcta{border-color:rgba(0,232,122,.42);background:rgba(0,232,122,.09)}
.xg-rop.correcta .xg-op-l{background:rgba(0,232,122,.25);color:var(--g)}
.xg-rop.elegida-mal{border-color:rgba(var(--r-rgb),.4);background:rgba(var(--r-rgb),.08)}
.xg-rop.elegida-mal .xg-op-l{background:rgba(var(--r-rgb),.22);color:var(--r)}
.xg-rmark{flex:none;align-self:center;font-size:9.5px;font-weight:800;letter-spacing:.06em;
  text-transform:uppercase;padding:3px 8px;border-radius:20px}
.xg-rmark.ok{background:rgba(0,232,122,.18);color:var(--g)}
.xg-rmark.no{background:rgba(var(--r-rgb),.18);color:var(--r)}
.xg-why{margin:14px 0 0;padding:12px 14px;border-radius:11px;background:rgba(var(--ov),.05);
  font-size:13px;line-height:1.65;color:var(--text2)}
.xg-why b{color:var(--text)}
.xg-ref{display:block;margin-top:8px;font-family:var(--mono);font-size:10.5px;color:var(--text3)}

.xg-toast{position:absolute;left:50%;bottom:26px;transform:translateX(-50%);z-index:5;
  padding:11px 19px;border-radius:12px;font-size:13px;font-weight:600;color:var(--bg);
  background:var(--w);box-shadow:0 12px 34px rgba(0,0,0,.4);max-width:88%;text-align:center}

/* ── Angosto ── */
@media(max-width:900px){
  .xg-overlay{padding:0}
  .xg-card{border-radius:0;border:none;height:100%}
  .xg-test{flex-direction:column-reverse}
  .xg-lateral{width:auto;flex-direction:row;align-items:center;gap:10px;overflow-x:auto;
    border-right:none;border-top:1px solid rgba(var(--ov),.09);padding:10px 12px}
  .xg-lateral-t,.xg-leyenda,.xg-lateral-n{display:none}
  .xg-mapa{display:flex;gap:5px;flex:1;min-width:0;overflow-x:auto;padding-bottom:2px}
  .xg-mp{aspect-ratio:auto;flex:none;width:31px;height:31px}
  .xg-b-entregar{margin-top:0;width:auto;flex:none;padding:8px 13px;font-size:12px}
  .xg-panel{padding:15px 16px 20px}
  .xg-inicio,.xg-fin,.xg-rev{padding:20px 16px 30px}
  .xg-q{font-size:15px}
  .xg-op-t{font-size:13.5px}
  .xg-acc{flex-direction:column;align-items:stretch}
  .xg-acc-nav{display:grid;grid-template-columns:1fr 1fr}
}`;
})();
