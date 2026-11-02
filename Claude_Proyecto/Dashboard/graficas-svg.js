/* ══════════════════════════════════════════════════════════════════════════════════════════
   GRÁFICAS SVG para las páginas sueltas del proyecto (Laptop, Actriz IA)
   ══════════════════════════════════════════════════════════════════════════════════════════
   Adán, 2-nov-2026: "mejora muchísimo el diseño… fotos, gráficas, cuentas, pasos a seguir". Una sola
   librería para que las dos páginas dibujen igual: barras horizontales, rangos (mín–máx), columnas
   apiladas con su meta, líneas con umbrales, una barra segmentada (las partes de un todo) y un
   diagrama de dispersión. Las reglas son las del método de visualización: barras de 24 px como máximo
   con la punta redondeada y la base recta, 2 px de separación del color de la superficie, líneas de
   2 px, puntos de 8 px con anillo, cuadrícula de 1 px que no compite, leyenda siempre que hay dos series
   o más, el texto en tinta (nunca del color de la serie), un tooltip al pasar o enfocar cada marca y
   la tabla con los datos debajo de cada gráfica. La paleta categórica es la validada (cinco tonos en su orden fijo,
   un paso por modo) y se lee de las variables --s1…--s5 que esta librería define.

     GSVG.barrasH(el, {filas:[{k, v, txt?, s?}], fmt, titulo?})
     GSVG.rangos(el, {filas:[{k, min, max, s?}], fmt})
     GSVG.columnas(el, {cats, series:[{k, s, datos}], fmt, meta?, metaTxt?})
     GSVG.linea(el, {xs, series:[{k, s, datos}], fmt, umbrales:[{v, txt}]})
     GSVG.segmentos(el, {partes:[{k, v, s}], fmt, total?})
     GSVG.dispersion(el, {puntos:[{k, x, y, s?}], fmtX, fmtY, xTxt, yTxt})
   `s` es el número de la serie (1 a 5), siempre en ese orden: nunca se repite un color. Cada una vuelve a dibujarse sola al cambiar el ancho.
   ══════════════════════════════════════════════════════════════════════════════════════════ */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const css = `
:root{--s1:#3987e5;--s2:#d95926;--s3:#199e70;--s4:#c98500;--s5:#d55181;--gsvg-surf:#0e0e15;--gsvg-grid:rgba(255,255,255,.08)}
:root[data-theme="light"]{--s1:#2a78d6;--s2:#eb6834;--s3:#1baf7a;--s4:#eda100;--s5:#e87ba4;--gsvg-surf:#ffffff;--gsvg-grid:rgba(0,0,0,.08)}
.gsvg{position:relative;width:100%}
.gsvg svg{display:block;width:100%;overflow:visible}
.gsvg text{font-family:inherit;fill:var(--text2,#9a9db3);font-size:11.5px}
.gsvg .t1{fill:var(--text,#f4f4f8);font-weight:700}
.gsvg .t3{fill:var(--text3,#8589a8);font-size:10.5px}
.gsvg .hit{fill:transparent;cursor:default;outline:none}
.gsvg .mk{transition:opacity .12s}
.gsvg .on .mk,.gsvg g.on>.mk{opacity:.82}
.gsvg-leg{display:flex;flex-wrap:wrap;gap:6px 16px;margin:2px 0 8px;font-size:12px;color:var(--text2,#9a9db3)}
.gsvg-leg span{display:inline-flex;align-items:center;gap:6px}
.gsvg-leg i{display:inline-block;width:10px;height:10px;border-radius:2px}
.gsvg-leg i.ln{height:2px;width:14px;border-radius:1px}
.gsvg-tip{position:fixed;z-index:999;pointer-events:none;background:var(--bg2,#0b0b14);color:var(--text,#f4f4f8);
  border:1px solid var(--br,rgba(255,255,255,.12));border-radius:10px;padding:8px 10px;font-size:12px;line-height:1.45;
  box-shadow:0 10px 30px rgba(0,0,0,.35);max-width:280px;opacity:0;transition:opacity .1s}
.gsvg-tip.on{opacity:1}
.gsvg-tip .f{display:flex;align-items:center;gap:7px;justify-content:space-between}
.gsvg-tip .f b{font-weight:800}
.gsvg-tip .f i{display:inline-block;width:12px;height:2px;border-radius:1px;margin-right:2px}
.gsvg-tip .c{color:var(--text3,#8589a8);font-size:11px;margin-bottom:3px}
.gsvg-datos{margin-top:6px;font-size:12px;color:var(--text3,#8589a8)}
.gsvg-datos summary{cursor:pointer}
.gsvg-datos table{border-collapse:collapse;margin-top:6px;width:100%}
.gsvg-datos td,.gsvg-datos th{padding:4px 8px;border-bottom:1px solid var(--br,rgba(255,255,255,.1));text-align:right;white-space:nowrap}
.gsvg-datos td:first-child,.gsvg-datos th:first-child{text-align:left}
`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ── utilidades ─────────────────────────────────────────────────────────────────────── */
  const el = (tag, at, padre) => { const n = document.createElementNS(NS, tag); for (const k in at) n.setAttribute(k, at[k]); if (padre) padre.appendChild(n); return n; };
  const txt = (padre, x, y, s, at) => { const t = el('text', Object.assign({ x, y }, at || {}), padre); t.textContent = s; return t; };
  const col = s => 'var(--s' + (s || 1) + ')';
  const fmt0 = v => (Math.round(v * 10) / 10).toLocaleString('es-MX');
  // Una etiqueta que no cabe en `px` se corta con «…»: el nombre entero sigue en el tooltip y en la tabla.
  const corta = (t, px) => { const n = Math.floor(px / 6.4); return t.length > n ? t.slice(0, Math.max(3, n - 1)) + '…' : t; };
  // Una barra con la punta redondeada (4 px) y la base recta. Horizontal (de x0 a x1) o vertical (de y0 a y1).
  function barraH(g, x0, x1, y, h, fill) {
    const w = Math.max(0, x1 - x0), r = Math.min(4, w, h / 2);
    if (w <= 0) return null;
    return el('path', { class: 'mk', fill, d: `M${x0},${y}H${x0 + w - r}Q${x0 + w},${y} ${x0 + w},${y + r}V${y + h - r}Q${x0 + w},${y + h} ${x0 + w - r},${y + h}H${x0}Z` }, g);
  }
  function barraV(g, x, w, y0, y1, fill, redonda) {
    const h = Math.max(0, y0 - y1), r = redonda ? Math.min(4, h, w / 2) : 0;
    if (h <= 0) return null;
    return el('path', { class: 'mk', fill, d: `M${x},${y0}V${y1 + r}Q${x},${y1} ${x + r},${y1}H${x + w - r}Q${x + w},${y1} ${x + w},${y1 + r}V${y0}Z` }, g);
  }
  // Escala "bonita" para el eje: 4 o 5 marcas redondas.
  function ticks(max) {
    if (max <= 0) return [0];
    const paso0 = max / 4, mag = Math.pow(10, Math.floor(Math.log10(paso0))), n = paso0 / mag;
    const paso = (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * mag, out = [];
    for (let v = 0; v <= max + paso * 0.001; v += paso) out.push(v);
    if (out[out.length - 1] < max) out.push(out[out.length - 1] + paso);
    return out;
  }
  // El tooltip: uno para toda la página. Valor primero, etiqueta después; todo con textContent.
  let tip = null;
  function tipEl() { if (!tip) { tip = document.createElement('div'); tip.className = 'gsvg-tip'; tip.setAttribute('role', 'tooltip'); document.body.appendChild(tip); } return tip; }
  function tipMostrar(ev, titulo, filas) {
    const t = tipEl(); t.textContent = '';
    if (titulo) { const c = document.createElement('div'); c.className = 'c'; c.textContent = titulo; t.appendChild(c); }
    filas.forEach(f => {
      const d = document.createElement('div'); d.className = 'f';
      const iz = document.createElement('span');
      if (f.s) { const i = document.createElement('i'); i.style.background = col(f.s); iz.appendChild(i); }
      iz.appendChild(document.createTextNode(f.k || ''));
      const b = document.createElement('b'); b.textContent = f.v;
      d.appendChild(b); d.appendChild(iz); t.appendChild(d);
    });
    let x = 0, y = 0;
    if (ev && ev.clientX != null && ev.type !== 'focus') { x = ev.clientX; y = ev.clientY; }
    else if (ev && ev.target && ev.target.getBoundingClientRect) { const r = ev.target.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top; }
    t.classList.add('on');
    const w = t.offsetWidth, h = t.offsetHeight;
    t.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, x + 14)) + 'px';
    t.style.top = Math.max(8, Math.min(window.innerHeight - h - 8, y - h - 12 < 8 ? y + 18 : y - h - 12)) + 'px';
  }
  function tipOcultar() { if (tip) tip.classList.remove('on'); }
  // Un área de toque, más grande que la marca, con su tooltip al pasar y al enfocar.
  function zona(g, x, y, w, h, titulo, filas, grupo) {
    const r = el('rect', { class: 'hit', x, y, width: Math.max(1, w), height: Math.max(1, h), tabindex: 0 }, g);
    const on = e => { if (grupo) grupo.classList.add('on'); tipMostrar(e, titulo, filas); };
    const off = () => { if (grupo) grupo.classList.remove('on'); tipOcultar(); };
    r.addEventListener('pointermove', on); r.addEventListener('pointerleave', off);
    r.addEventListener('focus', on); r.addEventListener('blur', off);
    return r;
  }
  function leyenda(cont, items) {
    if (items.length < 2) return;
    const L = document.createElement('div'); L.className = 'gsvg-leg';
    items.forEach(it => { const s = document.createElement('span'); const i = document.createElement('i'); if (it.ln) i.className = 'ln'; i.style.background = col(it.s); s.appendChild(i); s.appendChild(document.createTextNode(it.k)); L.appendChild(s); });
    cont.appendChild(L);
  }
  function tabla(cont, cabeza, filas) {
    const d = document.createElement('details'); d.className = 'gsvg-datos';
    const s = document.createElement('summary'); s.textContent = 'Ver los datos'; d.appendChild(s);
    const T = document.createElement('table'), tr = document.createElement('tr');
    cabeza.forEach(c => { const th = document.createElement('th'); th.textContent = c; tr.appendChild(th); }); T.appendChild(tr);
    filas.forEach(f => { const r = document.createElement('tr'); f.forEach(c => { const td = document.createElement('td'); td.textContent = c; r.appendChild(td); }); T.appendChild(r); });
    d.appendChild(T); cont.appendChild(d);
  }
  // Monta la gráfica y la vuelve a dibujar cuando cambia el ancho del contenedor.
  // Volver a montar en el mismo contenedor suelta el observador anterior: si no, redibujaría con los datos viejos.
  function montar(cont, dibujar) {
    cont.classList.add('gsvg');
    if (cont._gsvgRO) cont._gsvgRO.disconnect();
    let ancho = 0;
    const pinta = () => { const w = Math.round(cont.clientWidth); if (!w || w === ancho) return; ancho = w; cont.textContent = ''; dibujar(w); };
    pinta();
    if (window.ResizeObserver) { cont._gsvgRO = new ResizeObserver(pinta); cont._gsvgRO.observe(cont); }
  }
  // La tabla de datos va justo después de la gráfica; al redibujar se reemplaza, no se apila.
  function hermano(cont) {
    if (cont._gsvgTabla && cont._gsvgTabla.parentNode) cont._gsvgTabla.remove();
    const d = document.createElement('div'); cont.after(d); cont._gsvgTabla = d; return d;
  }

  /* ── barras horizontales: una cifra por fila, ordenadas ─────────────────────────────── */
  function barrasH(cont, o) {
    const F = o.filas.slice(), fmt = o.fmt || fmt0;
    montar(cont, function (W) {
      const izq = Math.min(o.izq || 190, W * 0.42), der = o.der || 86, fila = 34, h = 18, H = F.length * fila + 6;
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, height: H, role: 'img', 'aria-label': o.titulo || 'gráfica de barras' }, cont);
      const max = Math.max.apply(null, F.map(f => f.v).concat([o.max || 0, 1e-9])), x = v => izq + (W - izq - der) * (v / max);
      F.forEach((f, i) => {
        const y = i * fila + 8, g = el('g', {}, svg);
        txt(g, izq - 10, y + 13, corta(f.k, izq - 14), { 'text-anchor': 'end' });
        el('rect', { x: izq, y, width: W - izq - der, height: h, fill: 'var(--gsvg-grid)', rx: 4 }, g);
        barraH(g, izq, x(f.v), y, h, col(f.s));
        txt(g, x(f.v) + 8, y + 13, f.txt || fmt(f.v), { class: 't1' });
        zona(g, 0, y - 6, W, fila, f.k, [{ k: o.serie || '', v: f.txt || fmt(f.v), s: f.s || 1 }], g);
      });
    });
    const d = hermano(cont);
    tabla(d, ['', o.serie || 'Valor'], F.map(f => [f.k, f.txt || fmt(f.v)]));
  }

  /* ── rangos: de lo mínimo a lo máximo, por fila ─────────────────────────────────────── */
  function rangos(cont, o) {
    const F = o.filas.slice(), fmt = o.fmt || fmt0;
    montar(cont, function (W) {
      const izq = Math.min(o.izq || 230, W * 0.45), der = 24, fila = 30, h = 14, top = 22, H = F.length * fila + top + 4;
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, height: H, role: 'img', 'aria-label': o.titulo || 'rangos' }, cont);
      const max = Math.max.apply(null, F.map(f => f.max).concat([o.meta || 0, 1e-9])), T = ticks(max), mx = T[T.length - 1];
      const x = v => izq + (W - izq - der) * (v / mx);
      T.forEach(t => { el('line', { x1: x(t), x2: x(t), y1: top - 4, y2: H, stroke: 'var(--gsvg-grid)', 'stroke-width': 1 }, svg); txt(svg, x(t), 12, fmt(t), { class: 't3', 'text-anchor': 'middle' }); });
      if (o.meta) { el('line', { x1: x(o.meta), x2: x(o.meta), y1: top - 6, y2: H, stroke: 'var(--text2,#9a9db3)', 'stroke-width': 1.5 }, svg); }
      F.forEach((f, i) => {
        const y = top + i * fila + 6, g = el('g', {}, svg);
        txt(g, izq - 10, y + 11, corta(f.k, izq - 14), { 'text-anchor': 'end' });
        barraH(g, x(f.min), Math.max(x(f.max), x(f.min) + 6), y, h, col(f.s));
        zona(g, 0, y - 8, W, fila, f.k, [{ k: 'de', v: fmt(f.min), s: f.s || 1 }, { k: 'hasta', v: fmt(f.max), s: f.s || 1 }].concat(f.nota ? [{ k: '', v: f.nota }] : []), g);
      });
    });
    const d = hermano(cont);
    tabla(d, ['', 'Desde', 'Hasta'], F.map(f => [f.k, fmt(f.min), fmt(f.max)]));
  }

  /* ── columnas apiladas, con una meta opcional ───────────────────────────────────────── */
  function columnas(cont, o) {
    const fmt = o.fmt || fmt0, S = o.series, C = o.cats;
    const tot = C.map((c, i) => S.reduce((a, s) => a + (s.datos[i] || 0), 0));
    montar(cont, function (W) {
      leyenda(cont, S.map(s => ({ k: s.k, s: s.s })));
      const izq = 56, der = 10, top = 14, baj = 26, H = o.alto || 240, ph = H - top - baj;
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, height: H, role: 'img', 'aria-label': o.titulo || 'columnas' }, cont);
      const max = Math.max.apply(null, tot.concat([o.meta || 0, 1e-9])), T = ticks(max), mx = T[T.length - 1];
      const y = v => top + ph - ph * (v / mx), banda = (W - izq - der) / C.length, bw = Math.min(24, banda * 0.62);
      T.forEach(t => { el('line', { x1: izq, x2: W - der, y1: y(t), y2: y(t), stroke: 'var(--gsvg-grid)', 'stroke-width': 1 }, svg); txt(svg, izq - 8, y(t) + 4, fmt(t), { class: 't3', 'text-anchor': 'end' }); });
      C.forEach((c, i) => {
        const g = el('g', {}, svg), x = izq + banda * i + (banda - bw) / 2;
        let acc = 0;
        const vivos = S.map((s, j) => ({ s, j, v: s.datos[i] || 0 })).filter(z => z.v > 0), ult = vivos.length - 1;
        vivos.forEach((z, n) => {
          const y0 = y(acc) - (n > 0 ? 2 : 0), y1 = y(acc + z.v);
          barraV(g, x, bw, y0, y1, col(z.s.s), n === ult);
          acc += z.v;
        });
        if (o.etiquetas !== false && (i === C.length - 1 || (o.cadaN && i % o.cadaN === 0))) txt(g, x + bw / 2, y(acc) - 6, fmt(acc), { class: 't1', 'text-anchor': 'middle' });
        txt(svg, x + bw / 2, H - 8, c, { class: 't3', 'text-anchor': 'middle' });
        zona(g, izq + banda * i, top, banda, ph, c + ' · total ' + fmt(tot[i]), S.map((s, j) => ({ k: s.k, v: fmt(s.datos[i] || 0), s: s.s })).reverse(), g);
      });
      if (o.meta) {
        el('line', { x1: izq, x2: W - der, y1: y(o.meta), y2: y(o.meta), stroke: 'var(--text,#f4f4f8)', 'stroke-width': 1.5, opacity: .7 }, svg);
        txt(svg, izq + 6, y(o.meta) - 6, o.metaTxt || ('meta ' + fmt(o.meta)), { class: 't1' });
      }
    });
    const d = hermano(cont);
    tabla(d, [''].concat(S.map(s => s.k)).concat(['Total']), C.map((c, i) => [c].concat(S.map(s => fmt(s.datos[i] || 0))).concat([fmt(tot[i])])));
  }

  /* ── línea con umbrales y cruz que sigue al puntero ─────────────────────────────────── */
  function linea(cont, o) {
    const fmt = o.fmt || fmt0, S = o.series, X = o.xs;
    montar(cont, function (W) {
      leyenda(cont, S.map(s => ({ k: s.k, s: s.s, ln: true })));
      const izq = 60, der = 16, top = 14, baj = 26, H = o.alto || 230, ph = H - top - baj, pw = W - izq - der;
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, height: H, role: 'img', 'aria-label': o.titulo || 'línea' }, cont);
      const todos = [].concat.apply([], S.map(s => s.datos)).concat((o.umbrales || []).map(u => u.v));
      const T = ticks(Math.max.apply(null, todos.concat([1e-9]))), mx = T[T.length - 1];
      const x = i => izq + (X.length < 2 ? pw / 2 : pw * i / (X.length - 1)), y = v => top + ph - ph * (v / mx);
      T.forEach(t => { el('line', { x1: izq, x2: W - der, y1: y(t), y2: y(t), stroke: 'var(--gsvg-grid)', 'stroke-width': 1 }, svg); txt(svg, izq - 8, y(t) + 4, fmt(t), { class: 't3', 'text-anchor': 'end' }); });
      const paso = Math.ceil(X.length / Math.max(2, Math.floor(pw / 70)));
      X.forEach((c, i) => { if (i % paso === 0 || i === X.length - 1) txt(svg, x(i), H - 8, c, { class: 't3', 'text-anchor': 'middle' }); });
      (o.umbrales || []).forEach(u => {
        el('line', { x1: izq, x2: W - der, y1: y(u.v), y2: y(u.v), stroke: 'var(--text2,#9a9db3)', 'stroke-width': 1 }, svg);
        txt(svg, W - der, y(u.v) - 6, u.txt, { class: 't1', 'text-anchor': 'end' });
      });
      S.forEach(s => {
        el('path', { fill: 'none', stroke: col(s.s), 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round',
          d: s.datos.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ',' + y(v).toFixed(1)).join('') }, svg);
        const n = s.datos.length - 1;
        el('circle', { cx: x(n), cy: y(s.datos[n]), r: 4, fill: col(s.s), stroke: 'var(--gsvg-surf)', 'stroke-width': 2 }, svg);
        if (S.length <= 4) txt(svg, x(n) - 6, y(s.datos[n]) - 10, fmt(s.datos[n]), { class: 't1', 'text-anchor': 'end' });
      });
      // La cruz: una línea vertical que encuentra la X más cercana; el tooltip enseña todas las series ahí.
      const cruz = el('line', { y1: top, y2: top + ph, stroke: 'var(--text3,#8589a8)', 'stroke-width': 1, opacity: 0 }, svg);
      const capa = el('rect', { class: 'hit', x: izq, y: top, width: pw, height: ph, tabindex: 0 }, svg);
      const mueve = e => {
        const r = svg.getBoundingClientRect(), px = (e.clientX != null ? e.clientX - r.left : r.width / 2) * (W / r.width);
        const i = Math.max(0, Math.min(X.length - 1, Math.round((px - izq) / pw * (X.length - 1))));
        cruz.setAttribute('x1', x(i)); cruz.setAttribute('x2', x(i)); cruz.setAttribute('opacity', 1);
        tipMostrar(e, X[i], S.map(s => ({ k: s.k, v: fmt(s.datos[i]), s: s.s })));
      };
      capa.addEventListener('pointermove', mueve); capa.addEventListener('focus', mueve);
      const sale = () => { cruz.setAttribute('opacity', 0); tipOcultar(); };
      capa.addEventListener('pointerleave', sale); capa.addEventListener('blur', sale);
    });
    const d = hermano(cont);
    tabla(d, [''].concat(S.map(s => s.k)), X.map((c, i) => [c].concat(S.map(s => fmt(s.datos[i])))));
  }

  /* ── barra segmentada: las partes de un todo ────────────────────────────────────────── */
  function segmentos(cont, o) {
    const P = o.partes, fmt = o.fmt || fmt0, total = o.total || P.reduce((a, p) => a + p.v, 0);
    montar(cont, function (W) {
      leyenda(cont, P.map(p => ({ k: p.k + ' · ' + fmt(p.v), s: p.s })));
      const H = 26, svg = el('svg', { viewBox: `0 0 ${W} ${H}`, height: H, role: 'img', 'aria-label': o.titulo || 'partes' }, cont);
      let x = 0;
      P.forEach((p, i) => {
        const w = W * p.v / total - (i < P.length - 1 ? 2 : 0), g = el('g', {}, svg);
        el('rect', { class: 'mk', x, y: 0, width: Math.max(0, w), height: H, fill: col(p.s), rx: 4 }, g);
        zona(g, x, 0, w + 2, H, p.k, [{ k: Math.round(p.v / total * 100) + ' % del total', v: fmt(p.v), s: p.s }], g);
        x += w + 2;
      });
    });
  }

  /* ── dispersión: dos medidas por punto, con las etiquetas que importan ──────────────── */
  function dispersion(cont, o) {
    const P = o.puntos, fx = o.fmtX || fmt0, fy = o.fmtY || fmt0;
    montar(cont, function (W) {
      const izq = 64, der = 20, top = 14, baj = 40, H = o.alto || 300, ph = H - top - baj, pw = W - izq - der;
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, height: H, role: 'img', 'aria-label': o.titulo || 'dispersión' }, cont);
      const TX = ticks(Math.max.apply(null, P.map(p => p.x))), TY = ticks(Math.max.apply(null, P.map(p => p.y)));
      const mxX = TX[TX.length - 1], mxY = TY[TY.length - 1], x = v => izq + pw * v / mxX, y = v => top + ph - ph * v / mxY;
      TY.forEach(t => { el('line', { x1: izq, x2: W - der, y1: y(t), y2: y(t), stroke: 'var(--gsvg-grid)', 'stroke-width': 1 }, svg); txt(svg, izq - 8, y(t) + 4, fy(t), { class: 't3', 'text-anchor': 'end' }); });
      TX.forEach(t => txt(svg, x(t), top + ph + 16, fx(t), { class: 't3', 'text-anchor': 'middle' }));
      if (o.xTxt) txt(svg, izq + pw / 2, H - 4, o.xTxt, { class: 't3', 'text-anchor': 'middle' });
      if (o.yTxt) txt(svg, izq, top - 2, o.yTxt, { class: 't3' });
      // Las etiquetas se miden antes de ponerlas: si chocan con otra, se prueba arriba o abajo; si no cabe, se queda en el tooltip.
      const cajas = [], choca = (a) => cajas.some(c => a.x < c.x + c.w && a.x + a.w > c.x && a.y < c.y + c.h && a.y + a.h > c.y);
      P.forEach(p => {
        const g = el('g', {}, svg);
        el('circle', { class: 'mk', cx: x(p.x), cy: y(p.y), r: p.grande ? 6 : 4.5, fill: col(p.s), stroke: 'var(--gsvg-surf)', 'stroke-width': 2 }, g);
        if (p.etiqueta) {
          const w = p.k.length * 6.6 + 4, izqLado = x(p.x) + 10 + w > W - der;
          const x0 = izqLado ? x(p.x) - 10 - w : x(p.x) + 10;
          const op = [0, -16, 16].map(dy => ({ x: x0, y: y(p.y) - 8 + dy, w, h: 14, dy })).find(c => !choca(c));
          if (op) { cajas.push(op); txt(g, izqLado ? x(p.x) - 10 : x0, y(p.y) + 4 + op.dy, p.k, { class: 't1', 'text-anchor': izqLado ? 'end' : 'start' }); }
        }
        zona(g, x(p.x) - 14, y(p.y) - 14, 28, 28, p.k, [{ k: o.xTxt || 'x', v: fx(p.x), s: p.s || 1 }, { k: o.yTxt || 'y', v: fy(p.y), s: p.s || 1 }], g);
      });
    });
    const d = hermano(cont);
    tabla(d, ['', o.xTxt || 'x', o.yTxt || 'y'], P.map(p => [p.k, fx(p.x), fy(p.y)]));
  }

  window.GSVG = { barrasH, rangos, columnas, linea, segmentos, dispersion, ticks };
})();
