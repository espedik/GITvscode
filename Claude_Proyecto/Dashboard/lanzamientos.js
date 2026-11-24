/* Los lanzamientos de SpaceX desde California, en vivo y sin Claude: los que vienen, y cuántos salieron de ahí.

   Adán, 24-nov-2026: "los lanzamientos de SpaceX serían solo los de California, ya que tengo familia en Long Beach". Por eso
   cada uno trae su hora de Long Beach, si cae entre viernes y lunes y cómo se vería desde la playa, según el sol de ese día.
   Los lee de Launch Library 2 (thespacedevs.com), que es gratis y sin cuenta, a lo mucho cada 8 horas, y los guarda en el
   navegador. Sin internet usa lo último que guardó o la foto de abajo, y siempre dice de cuándo es el dato.
   Los enseña la meta «Lanzamiento de SpaceX» (mpRealSpacex, dashboard.html): con ellos se elige la fecha del viaje. */
(function () {
  const KEY_LANZ = 'dash-lanzamientos-v1', HORAS = 8, API = 'https://ll.thespacedevs.com/2.2.0/launch/';
  const LB = { lat: 33.77, lon: -118.19, tz: 'America/Los_Angeles' };
  const ESTADO = { Go: ['ok', 'Fecha firme'], TBC: ['medio', 'Por confirmar'], TBD: ['', 'Sin día fijo'], Hold: ['medio', 'En espera'] };
  // Lo que había el 24-nov-2026: lo que se ve sin internet.
  const FOTO = {
    t: '2026-11-24T06:00:00Z', foto: true,
    ritmo: { ini: '2026-03-10T04:19:00Z', fin: '2026-11-24T06:00:00Z', n: 100, ca: 58, rec: 18 },
    vienen: [
      { d: '2026-11-24T16:08:00Z', n: 'USSF-266', c: 'Falcon 9', e: 'Go' },
      { d: '2026-11-29T04:39:00Z', n: 'USSF-380', c: 'Falcon 9', e: 'Go' },
      { d: '2026-12-02T20:30:00Z', n: 'NROL-132', c: 'Falcon 9', e: 'TBC' }
    ]
  };
  let pidiendo = false, fallo = 0;
  const esCa = x => /Vandenberg/i.test(x || '');
  // Lo guardado antes traía también Florida y Texas (`l`), y sus conteos por sitio.
  function guardado() {
    try {
      const x = JSON.parse(localStorage.getItem(KEY_LANZ) || 'null');
      if (!x || !x.ritmo || !x.vienen) return null;
      if (x.ritmo.rec && typeof x.ritmo.rec === 'object') x.ritmo.rec = x.ritmo.rec.ca || 0;
      x.vienen = x.vienen.filter(y => !y.l || y.l === 'ca');
      return x;
    } catch (e) { return null; }
  }
  function datos() { return guardado() || FOTO; }
  // «2026-12-31 a las 0:00» no es un día: es «diciembre, sin día» (así lo escribe la fuente cuando no hay fecha).
  function sinDia(x) { const d = new Date(x.d); return x.e === 'TBD' && d.getUTCHours() === 0 && d.getUTCMinutes() === 0; }
  function armar(up, pv) {
    const ahora = Date.now(), U = up.results || [], R = pv.results || [];
    if (!U.length || R.length < 50) return null;
    const vienen = U.filter(r => esCa(r.location)).map(r => {
      const p = String(r.name || '').split('|');
      return { d: r.net, n: (p[1] || p[0] || '').trim(), c: (p[0] || '').replace('Block 5', '').trim(), e: (r.status && r.status.abbrev) || 'TBD' };
    }).filter(x => x.d && Date.parse(x.d) > ahora - 2 * 36e5).sort((a, b) => a.d < b.d ? -1 : 1);
    const ca = L => L.filter(r => esCa(r.location)).length;
    return { t: new Date(ahora).toISOString(), vienen: vienen.slice(0, 30),
      ritmo: { ini: R[R.length - 1].net, fin: new Date(ahora).toISOString(), n: R.length, ca: ca(R), rec: ca(R.filter(r => Date.parse(r.net) > ahora - 90 * 864e5)) } };
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
  // Qué tan probable es que salga al menos uno en `dias` días, con el ritmo de los últimos 100 de SpaceX.
  function prob(dias, D) {
    const r = (D || datos()).ritmo, d = Math.max(1, (Date.parse(r.fin) - Date.parse(r.ini)) / 864e5);
    return 1 - Math.exp(-(r.ca || 0) / d * dias);
  }
  const DIA = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'], MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  // La hora de allá: {a, m, d, dia, min}, con `min` los minutos desde la medianoche de Long Beach.
  function alla(iso) {
    const p = {};
    new Intl.DateTimeFormat('en-CA', { timeZone: LB.tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
      .formatToParts(new Date(iso)).forEach(x => { p[x.type] = +x.value; });
    return { a: p.year, m: p.month, d: p.day, dia: new Date(p.year, p.month - 1, p.day).getDay(), min: p.hour * 60 + p.minute };
  }
  // Cuándo sale y se mete el sol en Long Beach ese día (la fórmula de la NOAA), en minutos de allá.
  function sol(iso) {
    const L = alla(iso), n = Math.round((Date.UTC(L.a, L.m - 1, L.d) - Date.UTC(L.a, 0, 1)) / 864e5), g = 2 * Math.PI / 365 * n, r = Math.PI / 180;
    const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
    const de = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
    const ha = Math.acos(Math.cos(90.833 * r) / (Math.cos(LB.lat * r) * Math.cos(de)) - Math.tan(LB.lat * r) * Math.tan(de)) / r;
    const d = new Date(iso), utc = d.getUTCHours() * 60 + d.getUTCMinutes();
    let dif = L.min - utc; if (dif > 0) dif -= 1440;                       // lo que Long Beach va atrás de UTC, con su horario de verano
    return { sale: 720 - 4 * (LB.lon + ha) - eq + dif, mete: 720 - 4 * (LB.lon - ha) - eq + dif, min: L.min };
  }
  // Cómo se vería desde la playa: en el crepúsculo la estela brilla; de noche, una luz; de día, hay que ir a Lompoc.
  function vista(iso) {
    const s = sol(iso), tras = s.min - s.mete, antes = s.sale - s.min;
    if ((tras >= 10 && tras <= 80) || (antes >= 10 && antes <= 80)) return { id: 'medusa', t: 'Se ve desde Long Beach' };
    if (tras > 80 || antes > 80) return { id: 'noche', t: 'De noche: una luz que sube' };
    return { id: 'dia', t: 'De día: ve a Lompoc' };
  }
  const finde = iso => [5, 6, 0, 1].indexOf(alla(iso).dia) >= 0;
  function cuando(x) {
    if (sinDia(x)) { const d = new Date(x.d); return MES[d.getUTCMonth()] + ' ' + d.getUTCFullYear() + ', sin día'; }
    const L = alla(x.d);
    return DIA[L.dia] + ' ' + L.d + ' ' + MES[L.m - 1] + ' · ' + String(Math.floor(L.min / 60)).padStart(2, '0') + ':' + String(L.min % 60).padStart(2, '0');
  }
  // Los próximos de California, con su día y hora de Long Beach; aparte, los que todavía no tienen día.
  function panel() {
    const D = datos(), ahora = Date.now(), v = D.vienen.filter(x => Date.parse(x.d) > ahora - 2 * 36e5);
    const con = v.filter(x => !sinDia(x)).slice(0, 6), sin = v.filter(sinDia).slice(0, 4);
    const fila = x => {
      const e = ESTADO[x.e] || ['', x.e], w = sinDia(x) ? null : vista(x.d);
      return '<div class="lz-f"><span class="lz-d">' + cuando(x) + '</span><b>' + esc(x.n) + '</b>' +
        '<span class="lz-l">' + (w ? '<i class="lz-v ' + w.id + '">' + w.t + '</i>' + (finde(x.d) ? '<i class="lz-v fin">Vie a lun</i>' : '') : esc(x.c)) + '</span><em class="' + e[0] + '">' + e[1] + '</em></div>';
    };
    const r = D.ritmo, hora = new Date(D.t);
    return '<div class="md-hair"></div><div class="md-rec-hd"><span class="md-lbl">Tu probabilidad</span><small>de ver uno</small></div>' +
      '<div class="lz-p dos">' + [4, 7, 10].map(n => { const p = Math.round(prob(n, D) * 100); return '<span>' + n + ' días</span><i><u style="width:' + p + '%"></u><b>' + p + ' %</b></i>'; }).join('') + '</div>' +
      '<div class="mpr-nota">' + (r.ca || 0) + ' de los últimos ' + r.n + ' de SpaceX salieron de California; ' + (r.rec || 0) + ' en los últimos 90 días.</div>' +
      '<div class="md-hair"></div><div class="md-rec-hd"><span class="md-lbl">Los próximos</span><small>hora de Long Beach</small></div>' +
      '<div class="lz">' + (con.length ? con.map(fila).join('') : '<div class="mpr-vacio">Ninguno con día fijo por ahora.</div>') + '</div>' +
      (sin.length ? '<div class="md-rec-hd"><span class="md-lbl">Sin día todavía</span></div><div class="lz">' + sin.map(fila).join('') + '</div>' : '') +
      '<div class="mpr-nota">' + (D.foto ? 'Datos guardados del 24 de noviembre de 2026: se ponen al día solos con internet.' : 'Al ' + hora.getDate() + ' ' + MES[hora.getMonth()] + ', ' + String(hora.getHours()).padStart(2, '0') + ':' + String(hora.getMinutes()).padStart(2, '0') + '.') +
        ' Fuente: <a href="https://thespacedevs.com/llapi" target="_blank" rel="noopener">Launch Library ↗</a></div>';
  }
  window.LANZAMIENTOS = { datos: datos, pedir: pedir, prob: prob, panel: panel, vista: vista, sol: sol, alla: alla, finde: finde, FOTO: FOTO };
})();
