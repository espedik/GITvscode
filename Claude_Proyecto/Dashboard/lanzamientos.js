/* Los lanzamientos de SpaceX, en vivo y sin Claude: los que vienen y de dónde salieron los últimos 100.

   Los lee de Launch Library 2 (thespacedevs.com), que es gratis y sin cuenta, a lo mucho cada 8 horas, y los guarda en el
   navegador. Sin internet usa lo último que guardó o la foto de abajo, y siempre dice de cuándo es el dato.
   Los enseña la meta «Lanzamiento de SpaceX» (mpRealSpacex, dashboard.html): con ellos se elige la fecha del viaje. */
(function () {
  'use strict';
  const KEY_LANZ = 'dash-lanzamientos-v1', HORAS = 8, API = 'https://ll.thespacedevs.com/2.2.0/launch/';
  const SITIO = { ca: 'California', fl: 'Florida', tx: 'Texas' };
  const ESTADO = { Go: ['ok', 'Fecha firme'], TBC: ['medio', 'Por confirmar'], TBD: ['', 'Sin día fijo'], Hold: ['medio', 'En espera'] };
  // Lo que había el 24-nov-2026: lo que se ve sin internet.
  const FOTO = {
    t: '2026-11-24T06:00:00Z', foto: true,
    ritmo: { ini: '2026-03-10T04:19:00Z', fin: '2026-11-24T06:00:00Z', n: 100, ca: 58, fl: 38, tx: 4, rec: { ca: 18, fl: 6, tx: 2 } },
    vienen: [
      { d: '2026-11-24T16:08:00Z', n: 'USSF-266', c: 'Falcon 9', e: 'Go', l: 'ca' },
      { d: '2026-11-29T04:39:00Z', n: 'USSF-380', c: 'Falcon 9', e: 'Go', l: 'ca' },
      { d: '2026-11-29T15:50:00Z', n: 'Cygnus NG-25', c: 'Falcon 9', e: 'Go', l: 'fl' },
      { d: '2026-12-02T20:30:00Z', n: 'NROL-132', c: 'Falcon 9', e: 'TBC', l: 'ca' },
      { d: '2027-01-06T00:00:00Z', n: 'Griffin Mission One', c: 'Falcon Heavy', e: 'TBD', l: 'fl' },
      { d: '2027-01-31T00:00:00Z', n: 'Axiom 5', c: 'Falcon 9', e: 'TBD', l: 'fl' },
      { d: '2027-02-28T00:00:00Z', n: 'SICRAL 3A', c: 'Falcon 9', e: 'TBD', l: 'fl' },
      { d: '2027-03-31T00:00:00Z', n: 'Crew-14', c: 'Falcon 9', e: 'TBD', l: 'fl' }
    ]
  };
  let pidiendo = false, fallo = 0;
  const sitio = x => /Vandenberg/i.test(x) ? 'ca' : /Canaveral|Kennedy/i.test(x) ? 'fl' : /Starbase/i.test(x) ? 'tx' : '';
  function guardado() { try { const x = JSON.parse(localStorage.getItem(KEY_LANZ) || 'null'); return x && x.ritmo && x.vienen ? x : null; } catch (e) { return null; } }
  function datos() { return guardado() || FOTO; }
  // «2026-12-31 a las 0:00» no es un día: es «diciembre, sin día» (así lo escribe la fuente cuando no hay fecha).
  function sinDia(x) { const d = new Date(x.d); return x.e === 'TBD' && d.getUTCHours() === 0 && d.getUTCMinutes() === 0; }
  function armar(up, pv) {
    const ahora = Date.now();
    const vienen = (up.results || []).map(r => {
      const p = String(r.name || '').split('|');
      return { d: r.net, n: (p[1] || p[0] || '').trim().replace('Cygnus CRS-2 ', 'Cygnus ').replace('Axiom Space Mission', 'Axiom'),
        c: (p[0] || '').replace('Block 5', '').trim(), e: (r.status && r.status.abbrev) || 'TBD', l: sitio(r.location || '') };
    }).filter(x => x.l && x.d && Date.parse(x.d) > ahora - 2 * 36e5).sort((a, b) => a.d < b.d ? -1 : 1);
    const R = pv.results || [], cta = L => { const o = { ca: 0, fl: 0, tx: 0 }; L.forEach(r => { const s = sitio(r.location || ''); if (s) o[s]++; }); return o; };
    if (!vienen.length || R.length < 50) return null;
    const c = cta(R), rec = cta(R.filter(r => Date.parse(r.net) > ahora - 90 * 864e5));
    return { t: new Date(ahora).toISOString(), vienen: vienen.slice(0, 60), ritmo: { ini: R[R.length - 1].net, fin: new Date(ahora).toISOString(), n: R.length, ca: c.ca, fl: c.fl, tx: c.tx, rec: rec } };
  }
  function pedir(listo) {
    const g = guardado();
    if (pidiendo || Date.now() - fallo < 6e5 || (g && Date.now() - Date.parse(g.t) < HORAS * 36e5)) return;
    pidiendo = true;
    const j = u => fetch(API + u + '&mode=list&lsp__name=SpaceX').then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
    Promise.all([j('upcoming/?limit=60'), j('previous/?limit=100')]).then(x => {
      const o = armar(x[0], x[1]);
      if (o) { try { localStorage.setItem(KEY_LANZ, JSON.stringify(o)); } catch (e) {} if (listo) listo(); } else fallo = Date.now();
    }).catch(() => { fallo = Date.now(); }).then(() => { pidiendo = false; });
  }
  // Qué tan probable es que salga al menos uno en `dias` días, con el ritmo de los últimos 100.
  function prob(l, dias, D) {
    const r = (D || datos()).ritmo, d = Math.max(1, (Date.parse(r.fin) - Date.parse(r.ini)) / 864e5);
    return 1 - Math.exp(-(r[l] || 0) / d * dias);
  }
  const DIA = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'], MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  function cuando(x) {
    const d = new Date(x.d);
    if (sinDia(x)) return MES[d.getUTCMonth()] + ' ' + d.getUTCFullYear() + ', sin día';
    return DIA[d.getDay()] + ' ' + d.getDate() + ' ' + MES[d.getMonth()] + ' · ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  // Los próximos, primero los que ya tienen día; después, los de Florida que faltan de fechar.
  function panel() {
    const D = datos(), ahora = Date.now(), v = D.vienen.filter(x => Date.parse(x.d) > ahora - 2 * 36e5);
    const con = v.filter(x => !sinDia(x)).slice(0, 5), sin = v.filter(sinDia), fl = sin.filter(x => x.l === 'fl').slice(0, 4);
    const fila = x => { const e = ESTADO[x.e] || ['', x.e]; return '<div class="lz-f"><span class="lz-d">' + cuando(x) + '</span><b>' + esc(x.n) + '</b><span class="lz-l">' + esc(x.c) + ' · ' + SITIO[x.l] + '</span><em class="' + e[0] + '">' + e[1] + '</em></div>'; };
    const r = D.ritmo, p = (l, n) => Math.round(prob(l, n, D) * 100), hora = new Date(D.t);
    return '<div class="md-hair"></div><div class="md-rec-hd"><span class="md-lbl">Tu probabilidad</span><small>de ver al menos uno</small></div>' +
      '<div class="lz-p"><span></span><b>4 días</b><b>7 días</b>' + ['ca', 'fl', 'tx'].map(l => '<span>' + SITIO[l] + '<small>' + (r[l] || 0) + ' de los últimos ' + r.n + '</small></span>' +
        [4, 7].map(n => '<i><u style="width:' + p(l, n) + '%"></u><b>' + p(l, n) + ' %</b></i>').join('')).join('') + '</div>' +
      (r.rec ? '<div class="mpr-nota">En los últimos 90 días: ' + r.rec.ca + ' de California, ' + r.rec.fl + ' de Florida y ' + r.rec.tx + ' de Texas.</div>' : '') +
      '<div class="md-hair"></div><div class="md-rec-hd"><span class="md-lbl">Los próximos</span><small>hora de México</small></div>' +
      '<div class="lz">' + (con.length ? con.map(fila).join('') : '<div class="mpr-vacio">Ninguno con día fijo por ahora.</div>') + '</div>' +
      (fl.length ? '<div class="md-rec-hd"><span class="md-lbl">Florida, sin día todavía</span></div><div class="lz">' + fl.map(fila).join('') + '</div>' : '') +
      '<div class="mpr-nota">' + (D.foto ? 'Datos guardados del 24 de noviembre de 2026: se ponen al día solos con internet.' : 'Al ' + hora.getDate() + ' ' + MES[hora.getMonth()] + ', ' + String(hora.getHours()).padStart(2, '0') + ':' + String(hora.getMinutes()).padStart(2, '0') + '.') +
        ' Fuente: <a href="https://thespacedevs.com/llapi" target="_blank" rel="noopener">Launch Library ↗</a></div>';
  }
  window.LANZAMIENTOS = { datos: datos, pedir: pedir, prob: prob, panel: panel, FOTO: FOTO };
})();
