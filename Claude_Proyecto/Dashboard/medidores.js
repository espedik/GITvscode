/* Las ventanas de los seis medidores del Plan Maestro.

   Adán, 23-nov-2026: "estos indicadores son los más importantes… quiero que mejores la presentación de todos, el
   contenido y visualmente cómo se ve, debe ser claro y moderno… debe ser contenido relevante para mi día a día".
   Todas con el mismo orden: la cifra y lo que significa, cuatro datos, lo de hoy con su botón, una gráfica, y el detalle
   y los formularios. Ninguna cuenta vive aquí: salen del maestro (CIFRAS) y de Finanzas, con las funciones del Dashboard.
   kpiDetalle (dashboard.html) devuelve MEDIDORES[id](F); `listo` dibuja las gráficas cuando la ventana ya tiene tamaño. */
(function () {
  'use strict';
  const M = {}, abiertos = {}, sim = { extra: 10000, mes: 0 };
  let graficas = [];
  const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const mesTxt = ym => MES[+ym.slice(5, 7) - 1] + ' ' + ym.slice(0, 4);
  const diaTxt = k => +k.slice(8, 10) + ' ' + MES[+k.slice(5, 7) - 1];
  const fechaTxt = d => d.getDate() + ' ' + MES[d.getMonth()] + ' ' + d.getFullYear();
  const mas = (ym, n) => { const p = ym.split('-').map(Number), d = new Date(p[0], p[1] - 1 + n, 1); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); };
  const pct = (a, b) => b > 0 ? Math.max(0, Math.min(100, a / b * 100)) : 0;
  const signo = v => (v >= 0 ? '+' : '−') + money(Math.abs(v));
  const gana = v => '<em class="' + (v >= 0 ? 'ok' : 'mal') + '">' + (v >= 0 ? '▲ ' : '▼ ') + signo(v) + '</em>';
  const plural = (n, u, v) => n + ' ' + (n === 1 ? u : v);
  // Eje: corto solo desde diez mil, y tapado en modo privado como money().
  function corto(v) {
    if (privado) return '$••';
    const a = Math.abs(v), s = v < 0 ? '−$' : '$';
    if (a >= 1e6) return s + (Math.round(a / 1e5) / 10) + ' M';
    if (a >= 1e4) return s + Math.round(a / 1e3) + ' mil';
    return s + Math.round(a).toLocaleString('es-MX');
  }

  // ── Piezas ──
  const caja = (cls, t, p, html, pie) => '<section class="kv-c ' + cls + '"><h3>' + t + '</h3>' + (p ? '<p>' + p + '</p>' : '') + html + (pie ? '<div class="kv-pie">' + pie + '</div>' : '') + '</section>';
  const hero = (n, small, q, meter) => '<section class="kv-c kv-hero s4"><div class="n">' + n + (small ? '<small>' + small + '</small>' : '') + '</div>' +
    (meter != null ? '<div class="kv-med"><i style="width:' + meter + '%"></i></div>' : '') + '<div class="q">' + q + '</div></section>';
  const tiles = L => '<div class="kv-tiles s8">' + L.map(x => '<div class="kv-tile"><span>' + x[0] + '</span><b>' + x[1] + '</b><i>' + x[2] + '</i></div>').join('') + '</div>';
  const hoy = (et, tx, small, ac, cls) => '<div class="kv-hoy' + (cls ? ' ' + cls : '') + '"><span class="et">' + et + '</span><div class="tx">' + tx + (small ? '<small>' + small + '</small>' : '') + '</div>' + (ac ? '<div class="ac">' + ac + '</div>' : '') + '</div>';
  const boton = (t, js, sec) => '<button type="button" class="kv-b' + (sec ? ' sec' : '') + '" onclick="' + js + '">' + t + '</button>';
  const med = (v, c) => '<div class="kv-med"' + (c ? ' style="--c:' + c + '"' : '') + '><i style="width:' + v + '%"></i></div>';
  const fila = (n, v, d, d2, color, extra, cls) => '<div class="kv-r' + (cls ? ' ' + cls : '') + '"><b>' + (color ? '<i style="background:' + color + '"></i>' : '') + n + '</b><strong>' + v + '</strong>' +
    (d || d2 ? '<span>' + (d || '') + '</span><span class="d">' + (d2 || '') + '</span>' : '') + (extra || '') + '</div>';
  const plega = (id, t, der, html, cls, abre) => '<details class="kv-d ' + (cls || 's12') + '" data-kv="' + id + '"' + (abre || abiertos[id] ? ' open' : '') + ' ontoggle="MEDIDORES.plegado(this)"><summary>' + t + (der ? '<span>' + der + '</span>' : '') + '</summary><div>' + html + '</div></details>';
  const leyenda = L => '<div class="kv-ley">' + L.map(x => '<span><i class="' + (x[2] || '') + '" style="background:' + x[1] + '"></i>' + x[0] + '</span>').join('') + '</div>';
  const grafica = id => '<div class="kv-g" id="kvg-' + id + '" tabindex="0"></div>';
  const tabla = (cab, filas, tot) => '<table class="kv-t"><thead><tr>' + cab.map(c => '<th>' + c + '</th>').join('') + '</tr></thead><tbody>' +
    filas.map(f => '<tr>' + f.map(c => '<td>' + c + '</td>').join('') + '</tr>').join('') + (tot ? '<tr class="tot">' + tot.map(c => '<td>' + c + '</td>').join('') + '</tr>' : '') + '</tbody></table>';
  const copia = que => '<p class="kv-p">' + (FIN_REPO ? 'Este dispositivo enseña la copia de tu PC' + (FIN_REPO.exportado ? ' del ' + tiFecha(C().fechaLocal(new Date(FIN_REPO.exportado))) : '') + '. ' + que + ' en tu PC.'
    : 'Abre Finanzas una vez en este navegador para anotar aquí.') + '</p>';
  const C = () => window.CIFRAS;
  const lista = h => '<div class="kv-lista">' + h + '</div>';
  const V = { a: 'var(--kv-1)', b: 'var(--kv-2)', c: 'var(--kv-3)', g: 'var(--kv-gris)' };

  // ── Lo que comparten: lo invertido de verdad, lo que el plan ya pedía y los envíos a GBM ──
  function dinero(F) {
    const inv = F.investments || [], dep = inv.filter(i => i.id === 'i004'), otras = inv.filter(i => i.id !== 'i004');
    const val = L => L.reduce((s, i) => s + (+i.value || +i.invested || 0), 0);
    const b = btcInfo(), BA = tiBtcAbiertas(F), venta = h => h.tipo === 'venta' || +h.btc < 0, pes = h => (+h.usd || 0) * (+h.fx || b.fx);
    const btcMet = Math.max(0, BA.ops.reduce((s, h) => s + (venta(h) ? -1 : 1) * pes(h), 0)), btcV = Math.max(0, b.mxn);
    const liq = (F.activos || []).filter(a => a.type === 'liquido'), bienes = (F.activos || []).filter(a => a.type !== 'liquido');
    const suma = L => L.reduce((s, a) => s + (+a.value || 0), 0);
    return { inv, otras, deposito: val(dep), otrasV: val(otras), otrasMet: otras.reduce((s, i) => s + (+i.invested || 0), 0), btcV, btcMet, b, BA, venta, pes,
      ef: +F.emergencyFund || 0, liq, liqV: suma(liq), bienes, bienesV: suma(bienes), debe: (F.debts || []).reduce((s, d) => s + (+d.balance || 0), 0) };
  }
  function envios(ym) {
    const G = C().gbmMes(ym), out = [];
    G.semanas.forEach(s => s.gbm.forEach(x => out.push({ k: ym + '-' + String(x.dia).padStart(2, '0'), t: x.de === 'didi' ? 'Lo que apartas de Didi' : 'Ahorro de la quincena', v: x.mxn })));
    return out.sort((a, b) => a.k < b.k ? -1 : 1);
  }
  function contraPlan(F) {
    const x = dinero(F), k = hoyLocal(), ym = k.slice(0, 7), P = C().PROYECCION.meses, prev = P.filter(m => m.mes < ym).pop();
    const E = envios(ym), toca = E.filter(e => e.k <= k).reduce((s, e) => s + e.v, 0);
    const plan = (prev ? prev.alemania : 0) + toca, real = x.ef + x.otrasV + x.btcV;
    const mes = P.filter(m => m.mes === ym)[0];
    return { x, k, ym, E, toca, plan, real, dif: real - plan, cierre: mes ? mes.alemania : null, sig: E.filter(e => e.k >= k).concat(envios(mas(ym, 1)))[0] };
  }
  const sigTxt = s => s ? (s.k === hoyLocal() ? 'hoy' : 'el ' + diaTxt(s.k)) + ', ' + money(s.v) : '';

  // ══ Fondo de emergencia ══
  // Cuántos días alcanza y cuánto de los meses de la meta. Las cuentas son del maestro (gastoEmergencia, fondoMeta).
  const MESL = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  function anillo(p) {
    const n = 40, r = 82, g = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n * 360 - 90) * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
      g.push('<line x1="' + (100 + c * (r - 9)).toFixed(1) + '" y1="' + (100 + s * (r - 9)).toFixed(1) + '" x2="' + (100 + c * (r + 9)).toFixed(1) + '" y2="' + (100 + s * (r + 9)).toFixed(1) + '"' + (i < Math.round(p / 100 * n) ? ' class="on"' : '') + '/>');
    }
    return '<svg viewBox="0 0 200 200" aria-hidden="true">' + g.join('') + '</svg>';
  }
  // Una barra por mes de la meta: los días que cubre el fondo y lo que falta para completarlo.
  function ruta(hay, G, meta, meses) {
    const dias = G.minimo > 0 ? Math.floor(hay / (G.minimo / 30)) : 0;
    const mes = i => {
      const cubre = Math.max(0, Math.min(30, dias - i * 30)), p = pct(hay - i * G.minimo, G.minimo), falta = (i === meses - 1 ? meta : G.minimo * (i + 1)) - hay;
      return '<div class="kf-mes' + (falta <= 0 ? ' listo' : '') + '"><div class="kf-mt"><b>Mes ' + (i + 1) + '</b><span>' + (falta <= 0 ? 'Cubierto' : cubre + ' de 30 días') + '</span></div><div class="kf-bat"><i style="width:' + (falta <= 0 ? 100 : p) + '%"></i></div>' +
        '<em>' + (falta <= 0 ? 'Ya lo tienes' : 'Te faltan ' + money(falta) + ' para llegar aquí') + '</em></div>';
    };
    return '<h3>Si te quedas sin trabajo, tu fondo te alcanza para</h3><strong class="kf-tit">' + plural(dias, 'día', 'días') + '</strong>' +
      '<p>Vivir un mes con lo indispensable cuesta <b>' + money(G.minimo) + '</b> y tienes <b>' + money(hay) + '</b> entre cuenta, efectivo y CETES. Tu meta es llenar ' + (meses === 1 ? 'la barra.' : 'las ' + meses + ' barras.') + '</p>' +
      '<div class="kf-meses" style="--n:' + meses + '">' + Array.from({ length: meses }, (_, i) => mes(i)).join('') + '</div>';
  }


  // A la mano se edita aquí: los saldos con la fecha de hoy y CETES con su movimiento (CIFRAS.saldosPoner). ceGuardar repinta
  // la pantalla y la ventana, y todo Finanzas viaja a GitHub con el siguiente commit.
  const mano = { edita: false, aviso: '' };
  const manoLista = F => {
    const liq = (F.activos || []).filter(a => a.type === 'liquido'), base = C().A_LA_MANO.filter(p => !liq.some(a => a.id === p[0])).map(p => ({ id: p[0], name: p[1], value: 0 }));
    return liq.concat(base).map((a, i) => ({ id: a.id, n: a.name, v: +a.value || 0, fecha: a.fecha, c: [V.a, V.c, V.g][Math.min(i, 2)] })).concat([{ id: 'cetes', n: 'Tu fondo en CETES', v: +F.emergencyFund || 0, c: 'var(--ac)' }]);
  };
  function manoForm(F) {
    return '<form class="ti-form kf-mf" onsubmit="MEDIDORES.guardarMano(event)" oninput="MEDIDORES.sumaMano(this)">' + manoLista(F).map(q => '<label><span><i style="background:' + q.c + '"></i>' + esc(q.n) + '</span><input type="number" name="' + esc(q.id) + '" min="0" step="0.01" inputmode="decimal" value="' + q.v + '" required></label>').join('') +
      '<div class="kf-mt2"><span>Total</span><strong>' + money(manoLista(F).reduce((s, q) => s + q.v, 0)) + '</strong></div>' +
      '<span class="ti-form-acc"><button type="button" class="ce-btn sec" onclick="MEDIDORES.editarMano(false)">Cancelar</button><button type="submit" class="ce-btn">Guardar</button></span></form>';
  }
  M.sumaMano = function (f) { const e = f.querySelector('.kf-mt2 strong'); if (e) e.textContent = money([...f.querySelectorAll('input')].reduce((s, i) => s + (+i.value || 0), 0)); };
  M.editarMano = function (si) { mano.edita = si; mano.aviso = ''; abrirKpi('fondo'); const q = document.querySelector('.kf-mf input'); if (si && q) { q.focus(); q.select(); } };
  M.guardarMano = function (ev) {
    ev.preventDefault();
    const f = ev.target, F = rawGet('finanzasmx_v2', null); if (!F || !tiEditable()) return;
    const vals = {}; f.querySelectorAll('input').forEach(i => { vals[i.name] = i.value; });
    const res = C().saldosPoner(F, vals);
    if (res.error) {
      let e = f.querySelector('.ef-error'); if (!e) { e = document.createElement('span'); e.className = 'ef-error'; f.insertBefore(e, f.querySelector('.ti-form-acc')); }
      e.textContent = res.error; return;
    }
    mano.edita = false; mano.aviso = res.cambios.length ? 'Guardado: ya cambió en todas tus pantallas. Llega a GitHub con tu siguiente commit.' : 'Guardado con la fecha de hoy. Llega a GitHub con tu siguiente commit.';
    ceGuardar(F);
    ctCifrasHoy();   // deja anotado lo que queda para gastar, que viaja con el commit a los otros dispositivos
  };

  // Cómo se llama cada renglón del mes en la ventana.
  const EF_NOM = { renta: 'Renta', depa: 'Luz, agua, internet y gas', celular: 'Plan de datos', familia: 'Aporte a tu familia', auto: 'El BYD', iphone: 'El iPhone', comida: 'Comida', suscripciones: 'suscripciones', cuidado: 'rutinas de cuidado', personal: 'ropa, salidas y compras' };
  M.fondo = function (F) {
    const ov = document.getElementById('kpiOverlay');
    if (!ov || !ov.classList.contains('open') || ov.dataset.kpi !== 'fondo') { mano.edita = false; mano.aviso = ''; }
    if (_efEdit) mano.edita = false;
    const x = dinero(F), k = hoyLocal(), hay = C().fondoHoy(F), meta = _metaFondo(), falta = Math.max(0, meta - hay), p = pct(hay, meta), editable = tiEditable(), meses = C().PROYECTO.fondoMeses;
    const prox = mas(k.slice(0, 7), 1), E = C().gastoEmergencia, G = E(prox), P = C().PROYECCION.meses;
    // A la mano, en el orden en que se usa. El saldo de la cuenta lleva su fecha: si es viejo, se dice.
    const liq = x.liq.filter(a => +a.value > 0), piezas = manoLista(F).map(q => [esc(q.n), q.v, q.id === 'cetes' ? '1 o 2 días hábiles' : !q.fecha ? '' : q.fecha === k ? 'de hoy' : 'del ' + diaTxt(q.fecha), q.c]);
    const vieja = liq.map(a => a.fecha).filter(Boolean).sort()[0], dv = vieja ? Math.round((new Date(k + 'T12:00') - new Date(vieja + 'T12:00')) / 864e5) : 0;
    const dinHtml = '<div class="kf-bar">' + piezas.filter(q => q[1] > 0).map(q => '<i style="flex:' + Math.max(1, Math.round(q[1])) + ';background:' + q[3] + '"></i>').join('') + '</div>' + lista(piezas.map(q => fila(q[0] + ' <u>' + q[2] + '</u>', money(q[1]), '', '', q[3])).join(''));

    // Un mes sin sueldo: lo que se paga y lo que se apaga.
    const nom = q => EF_NOM[q.id] || q.t, mayor = (a, b) => b.v - a.v, paga = G.partes.filter(q => !q.apaga).sort(mayor), apaga = G.partes.filter(q => q.apaga).sort(mayor), chicas = paga.slice(3);
    const renglones = paga.slice(0, 3).map(q => [nom(q), q.v]).concat(chicas.length ? [[chicas.length > 1 ? 'Servicios, datos y lo demás fijo' : nom(chicas[0]), chicas.reduce((s, q) => s + q.v, 0)]] : []);
    const baja = P.filter(q => q.mes > prox && E(q.mes).minimo < G.minimo * .8).map(q => E(q.mes))[0];
    const mesHtml = lista(renglones.map(q => fila(q[0], money(q[1]), '', '')).join('') + (apaga.length ? fila('Lo que apagas', '<em class="ok">−' + money(G.recorte) + '</em>', apaga.map(nom).join(', '), '') : ''));

    const FL = C().fondoLista(F), ed = _efEdit ? FL.movs.find(m => m.id === _efEdit) : null;
    const movs = FL.movs.map(m => {
      const ret = m.tipo === 'retiro';
      return '<div class="ti-fila' + (_efEdit === m.id ? ' edita' : '') + '"><span class="ti-f">' + tiFecha(m.date) + '</span><span class="ti-n"><b>' + (ret ? 'Retiro' : 'Aportación') + '</b>' + (m.nota ? '<i>' + esc(m.nota) + '</i>' : '') + '</span>' +
        '<span class="ti-m"><em class="' + (ret ? 'mal' : 'ok') + '">' + (ret ? '−' : '+') + money(+m.amount || 0) + '</em></span>' +
        (editable ? '<span class="ti-acc"><button type="button" class="ce-btn sec" onclick="efEditar(\'' + m.id + '\')">Editar</button><button type="button" class="ce-btn sec" onclick="efBorrar(\'' + m.id + '\')">Borrar</button></span>' : '') + '</div>';
    }).join('');

    return { kv: 'var(--w)', titulo: 'Fondo de emergencia', sub: 'Tu cuenta, tu efectivo y tus CETES: para cuánto te alcanzan si te quedas sin trabajo, y qué falta.', html:
      '<div class="kf"><div class="kf-a"><section class="kv-c kf-hero"><div class="kf-an" role="img" aria-label="' + Math.round(p) + '% de tu meta">' + anillo(p) + '<div><strong>' + money(hay) + '</strong><span>de ' + money(meta) + '</span></div></div>' +
        '<div class="kf-pc"><strong>' + Math.round(p) + '%</strong><span>' + (falta > 0 ? 'Te faltan <b>' + money(falta) + '</b> para cubrir ' + plural(meses, 'mes', 'meses') + ' de lo indispensable.' : 'Meta completa. Lo que sobre va a GBM.') + '</span></div></section>' +
      '<section class="kv-c kf-ruta">' + ruta(hay, G, meta, meses) + '</section></div>' +
      '<div class="kf-d">' +
        '<section class="kv-c kf-mano"><div class="kf-cab"><div><h3>A la mano: ' + money(hay) + '</h3><p>' + (mano.edita ? 'Escribe lo que tienes hoy.' : 'En el orden en que se usa.') + '</p></div>' + (editable && !mano.edita ? boton('Editar', 'MEDIDORES.editarMano(true)', 1) : '') + '</div>' +
          (mano.edita && editable ? manoForm(F) : dinHtml + (mano.aviso ? '<div class="kv-pie kf-ok">' + mano.aviso + '</div>' : !editable ? copia('Se edita') : dv > 7 ? '<div class="kv-pie">El saldo de tu cuenta es de hace ' + dv + ' días: ponlo al día con Editar.</div>' : '')) + '</section>' +
        '<section class="kv-c"><h3>Un mes sin sueldo: ' + money(G.minimo) + '</h3><p>Lo que pagarías sí o sí.</p>' + mesHtml + (baja ? '<div class="kv-pie">Desde ' + MESL[+baja.mes.slice(5) - 1] + (baja.partes.some(q => q.id === 'renta') ? '' : ', sin renta,') + ' baja a <b>' + money(baja.minimo) + '</b> al mes.</div>' : '') + '</section>' +
        '<section class="kv-c kf-form' + (ed ? ' edita' : '') + '"><h3>Meter o sacar de tus CETES</h3><p>Sale igual en Finanzas. No lo anotes también en Total invertido: contaría dos veces.</p>' + (editable ? efFormHtml(ed) : copia('Se anota')) + '</section></div>' +
      (movs ? plega('fondo-movs', 'Lo que has metido y sacado de CETES', plural(FL.movs.length, 'movimiento', 'movimientos') + ': +' + money(FL.aporto) + ', −' + money(FL.saco), '<div class="ti-lista">' + movs + '</div>', 's12', !!_efEdit) : '') + '</div>' };
  };

  // ══ Fondo Maestría ══
  // Lo que llevabas en cada cierre (los de Finanzas · Indicadores), lo de hoy y a dónde llegas guardando lo que te queda: lo que
  // entra menos lo documentado que sale. La cuenta es del maestro (CIFRAS.ritmoMaestria): cada cierre nuevo la mueve.
  // El desglose de un mes: el que se toca en la tabla. Se contrae, pasa al mes de junto y recuerda qué gastos dejaste abiertos.
  const mae = { L: [], mes: '', abre: false, gasto: '' };
  const NOM_G = Object.assign({}, EF_NOM, { suscripciones: 'Suscripciones', cuidado: 'Rutinas', depa: 'Servicios', familia: 'A tu familia', tarjeta: 'Tarjetas' });
  const ACT_M = [['bolsa', 'Bolsa (GBM)', V.a], ['cetes', 'CETES', 'var(--w)'], ['btc', 'Bitcoin', V.b], ['liq', 'Cuenta y efectivo', V.c], ['dep', 'Depósito de la renta', V.g]];
  function desgloseMae() {
    const L = mae.L, i = L.findIndex(m => m.mes === mae.mes), m = L[i]; if (!m) return '';
    const nombre = MESL[+m.mes.slice(5) - 1] + ' ' + m.mes.slice(0, 4), estado = m.tipo === 'cierre' ? 'cierre' : m.tipo === 'hoy' ? 'hasta hoy' : 'lo que tendrías', crece = m.tipo === 'proy' ? m.queda : m.crecio;
    const flecha = (d, t, dib) => '<button type="button" class="km-fl" aria-label="' + t + '"' + (L[i + d] ? ' onclick="MEDIDORES.mesMae(\'' + L[i + d].mes + '\')"' : ' disabled') + '>' + dib + '</button>';
    const cab = '<div class="km-dc"><button type="button" class="km-dt" aria-expanded="' + mae.abre + '" onclick="MEDIDORES.abreMae()">Desglose de ' + nombre + '<span>' + estado + '</span></button>' +
      '<div class="km-dr"><span>Entra <b>' + money(m.entra) + '</b></span><span>Sale <b>' + money(m.sale) + '</b></span><span>Te queda <b>' + (m.queda >= 0 ? money(m.queda) : '−' + money(-m.queda)) + '</b></span>' + flecha(-1, 'Mes anterior', '‹') + flecha(1, 'Mes siguiente', '›') + '</div></div>';
    if (!mae.abre) return cab;
    const barra = (v, tot, c) => '<i class="km-bl"><u style="width:' + Math.max(1.5, pct(v, tot)) + '%;background:' + c + '"></u></i>', renglon = (t, v, tot, c, nota) => '<div class="km-li"><b>' + t + (nota ? ' <u>' + nota + '</u>' : '') + '</b><strong>' + money(v) + '</strong>' + barra(v, tot, c) + '</div>';
    const ent = [['Sueldo', 'sueldo'], ['Didi', 'didi'], ['Vale de despensa', 'vale'], ['Otros', 'otros']].map(q => [q[0], m.entraDe[q[1]]]).filter(q => q[1] > 0).sort((a, b) => b[1] - a[1]).map(q => renglon(q[0], q[1], m.entra, V.a)).join('');
    // En qué sale: de lo más grande a lo más chico; lo que tiene detalle se abre.
    const prod = (t, v) => { const p = t.split('|'); return '<div class="km-sub"><span>' + esc(p[p.length > 1 && /^cada /.test(p[p.length - 1]) ? p.length - 2 : p.length - 1]) + (/^cada /.test(p[p.length - 1]) ? ' <u>' + p[p.length - 1] + '</u>' : '') + '</span><strong>' + money(v) + '</strong></div>'; };
    const detalle = k => {
      const it = m.items[k] || {}, ks = Object.keys(it).sort((a, b) => it[b] - it[a]); if (k !== 'cuidado') return ks.map(x => prod(x, it[x])).join('');
      return [...new Set(ks.map(x => x.split('|')[0]))].map(g => { const q = ks.filter(x => x.split('|')[0] === g); return '<div><div class="km-gr"><span>' + g + '</span><strong>' + money(q.reduce((s, x) => s + it[x], 0)) + '</strong></div>' + q.map(x => prod(x, it[x])).join('') + '</div>'; }).join('');
    };
    const hay = k => m.saleDe[k] >= 1 && (k === 'cuidado' || ((k === 'suscripciones' || k === 'depa') && Object.keys(m.items[k] || {}).length > 1)), sel = hay(mae.gasto) ? mae.gasto : '';
    const sal = Object.keys(m.saleDe).filter(k => m.saleDe[k] >= 1).sort((a, b) => m.saleDe[b] - m.saleDe[a]).map(k => {
      const l = '<b>' + (NOM_G[k] || k) + '</b><strong>' + money(m.saleDe[k]) + '</strong>' + barra(m.saleDe[k], m.sale, V.b);
      return hay(k) ? '<button type="button" class="km-li" data-g="' + k + '" aria-expanded="' + (sel === k) + '" onclick="MEDIDORES.gastoMae(\'' + k + '\')">' + l + '</button>' : '<div class="km-li">' + l + '</div>';
    }).join('') + '</div>' + (sel ? '<div class="km-pn' + (sel === 'cuidado' ? ' tres' : '') + '">' + detalle(sel) + '</div>' : '');
    const ant = i > 0 ? L[i - 1].activos : null, total = m.tipo === 'proy' ? m.proy : m.real;
    const act = m.activos ? ACT_M.map(q => { const v = m.activos[q[0]], d = m.tipo === 'proy' ? (q[0] === 'bolsa' ? m.queda : 0) : ant && m.crecio != null ? v - ant[q[0]] : 0; return Math.abs(v) < 1 && Math.abs(d) < 1 ? '' : '<div class="km-li"><b>' + q[1] + (Math.abs(d) >= 1 ? ' <em class="' + (d >= 0 ? 'ok' : 'mal') + '">' + signo(d) + '</em>' : '') + '</b><strong>' + money(v) + '</strong>' + barra(Math.max(0, v), total, q[2]) + '</div>'; }).join('') : '<p class="kv-p">Sin cierre guardado de ese mes.</p>';
    const aviso = m.tipo !== 'proy' && crece != null && m.queda - crece > 500 ? '<div class="km-av">Te quedaban ' + money(m.queda) + ' y tu dinero ' + (crece >= 0 ? 'creció ' + money(crece) : 'bajó ' + money(-crece)) + ': <b>' + money(m.queda - crece) + '</b> sin anotar.</div>' : '';
    return cab + '<div class="km-dg"><section><h4>Entra<strong>' + money(m.entra) + '</strong></h4>' + ent + '</section><section class="dos"><h4>Sale en gastos<strong>' + money(m.sale) + '</strong></h4><div class="km-d2">' + sal + '</section>' +
      '<section><h4>' + (m.tipo === 'proy' ? 'Tendrías' : 'Tienes en activos') + '<strong>' + money(total) + '</strong></h4>' + act + aviso + '</section></div>';
  }
  function pintaMae() {
    const d = document.getElementById('kmDet'); if (!d) return; d.innerHTML = desgloseMae(); d.classList.toggle('abre', mae.abre);
    document.querySelectorAll('.km-f [data-m]').forEach(c => c.classList.toggle('sel', mae.abre && c.dataset.m === mae.mes));
  }
  M.mesMae = function (mes) { mae.abre = !(mae.abre && mae.mes === mes && document.activeElement && document.activeElement.closest('.km-f')); mae.mes = mes; pintaMae(); const d = document.getElementById('kmDet'); if (mae.abre && d) d.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
  M.abreMae = function () { mae.abre = !mae.abre; pintaMae(); const b = document.querySelector('.km-dt'); if (b) b.focus({ preventScroll: true }); };
  M.gastoMae = function (k) { mae.gasto = mae.gasto === k ? '' : k; pintaMae(); const b = document.querySelector('.km-li[data-g="' + k + '"]'), q = document.querySelector('.km-pn'); if (b) b.focus({ preventScroll: true }); if (q) q.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
  M.maestria = function (F) {
    const R = contraPlan(F), x = R.x, fm = fondoMaestria(), T = C().ritmoMaestria(F, { real: fm.total }), L = T.meses, fin = L[L.length - 1], falta = T.pide - fin.proy, ok = falta <= 0, dif = T.hoy - T.planHoy;
    // Las cuatro fechas: las dos primeras piden lo que toca ese día para llegar al corte; la cuenta bloqueada y el corte, lo suyo.
    const en = m => L.filter(q => q.mes === m)[0], cor = cortesSalidaDash().map((c, i) => ({ mes: c.mes, t: c.t, pide: i < 2 && en(c.mes) && en(c.mes).nec != null ? en(c.mes).nec : c.pide }));
    const dec = String(C().n('decisionMaestria') || ''), diasDec = Math.max(0, Math.ceil((new Date(dec + 'T12:00:00') - new Date()) / 864e5)), mayo = (en(dec.slice(0, 7)) || {}).nec || 0;
    const queda = L.filter(m => m.tipo === 'proy'), este = L.filter(m => m.tipo === 'hoy')[0] || fin, sinAnotar = este.crecio != null ? Math.max(0, este.queda - este.crecio) : 0, nm = MESL[+este.mes.slice(5) - 1];
    const D = C().rutinasDesglose(), c28 = C().cortesSalida(C().proyectar({ desfase: 12 }), { desfase: 12 }).salida, salto = queda.filter(m => m.queda > queda[0].queda * 1.2)[0];

    // Lo que debes tener en la mano al irte: lo que no se gasta o se paga después. Los pagos de la salida no van en este presupuesto.
    const CORTO = { bloqueada: 'Cuenta bloqueada', reservaByd: 'Reserva del BYD', colegiatura: 'Colegiatura', colchon: 'Colchón de llegada' };
    const costos = ((C().SALIDA && C().SALIDA.costos) || []).filter(c => !c.gasta || c.mes > fin.mes), v = c => C().costoSalida(c);
    const listaCostos = costos.map(c => '<div class="km-cos"><span>' + mesTxt(c.mes) + '</span><b>' + (CORTO[c.id] || esc(c.txt)) + '</b><strong>' + money(v(c)) + '</strong></div>').join('');
    // Todo lo que tienes guardado, pieza por pieza: la bolsa sale aunque esté en cero, para que se vea que falta anotarla.
    const M2 = C().fondoMaestria(F), bolsa = M2.inversiones.filter(i => i.id !== 'i004' && i.tipo !== 'cetes').reduce((s, i) => s + i.v, 0), cetes = M2.ef + M2.inversiones.filter(i => i.id !== 'i004' && i.tipo === 'cetes').reduce((s, i) => s + i.v, 0);
    const piezas = [['Bolsa y fondos', bolsa, V.a, bolsa > 0 ? '' : 'sin compras anotadas'], ['CETES', cetes, 'var(--w)'], ['Bitcoin', M2.btc, V.b]].concat(M2.liquidos.map((a, i) => [esc(a.n), a.v, i ? V.c : 'var(--ac)']), x.deposito > 0 ? [['Depósito de la renta', x.deposito, V.g, 'regresa en ' + MESL[+mas(C().PROYECTO.rentaHasta, 1).slice(5) - 1]]] : []);
    const listaPiezas = '<div class="kf-bar">' + piezas.filter(q => q[1] > 0).map(q => '<i style="flex:' + Math.max(1, Math.round(q[1])) + ';background:' + q[2] + '"></i>').join('') + '</div>' +
      piezas.map(q => '<div class="km-pz"><i style="background:' + q[2] + '"></i><b>' + q[0] + (q[3] ? ' <u>' + q[3] + '</u>' : '') + '</b><strong>' + money(q[1]) + '</strong></div>').join('');

    // Los consejos, de lo que toca ya a lo que más mueve; cambian con tu ritmo.
    const pasos = [], bt = boton('Registrar una compra', 'abrirKpi(\'invertido\')') + boton('Qué invertir hoy', 'cerrarKpi();abrirGBM()', 1);
    const sigue = R.sig ? (R.sig.k === R.k ? 'Hoy mandas <b>' + money(R.sig.v) + '</b> a GBM' : 'El <b>' + diaTxt(R.sig.k) + '</b> mandas <b>' + money(R.sig.v) + '</b> a GBM') + ' (' + R.sig.t.charAt(0).toLowerCase() + R.sig.t.slice(1) + ').' : '';
    if (sinAnotar > 500) pasos.push(['Anota lo que no aparece', money(sinAnotar), 'En ' + nm + ' te quedaban <b>' + money(este.queda) + '</b> y tu dinero creció <b>' + money(Math.max(0, este.crecio)) + '</b>.', bt]);
    else pasos.push(['Sigue así', 'vas bien', 'Guardas lo que te queda. ' + sigue, bt]);
    if (!ok) pasos.push(['Gana o guarda más', '+' + money(falta / Math.max(1, queda.length)) + ' al mes', 'Es lo que falta, repartido de ' + MESL[+queda[0].mes.slice(5) - 1] + ' a ' + MESL[+fin.mes.slice(5) - 1] + ': el aumento por escrito o un freelance de pruebas.']);
    else pasos.push(['Cuida cada envío', sigTxt(R.sig) ? money(R.sig.v) : 'cada quincena', sigue || 'Manda a GBM lo que te queda el día que entra.']);
    if (!ok && D.ahorro > 0) pasos.push(['Recorta tus rutinas', '+' + money(D.ahorro * queda.length) + ' en ' + mesTxt(fin.mes).slice(0, 3), '<b>' + money(D.ahorro) + '</b> al mes en piel, cabello y suplementos, de aquí a agosto. De eso, ' + money(D.medico) + ' los decide tu dermatólogo.']);
    pasos.push(['Decide el ' + diaTxt(dec), plural(diasDec, 'día', 'días'), 'Con la admisión y <b>' + money(mayo) + '</b> te vas. Con menos, irte en septiembre de 2028 te deja ' + (c28.falta > 0 ? 'con ' + money(c28.falta) + ' por juntar.' : '<b>' + money(-c28.falta) + '</b> de sobra.')]);

    // El flujo de cada mes, debajo de la gráfica y alineado con ella: cuatro renglones; tocar un mes abre su desglose.
    mae.L = L; if (!L.some(m => m.mes === mae.mes)) mae.mes = (queda[0] || este).mes;
    const sg = n => '<em class="' + (n >= 0 ? 'ok' : 'mal') + '">' + signo(n) + '</em>', reng = (t, g, cls) => '<b class="' + (cls || '') + '">' + t + '</b>' + L.map(m => '<span data-m="' + m.mes + '" class="' + (cls || '') + (mae.abre && m.mes === mae.mes ? ' sel' : '') + '">' + g(m) + '</span>').join('');
    const flujo = '<div class="km-tw"><div class="km-f" style="--n:' + L.length + '" onclick="const c=event.target.closest(\'[data-m]\');if(c)MEDIDORES.mesMae(c.dataset.m)"><b></b>' +
      L.map(m => '<span data-m="' + m.mes + '" class="h' + (m.tipo === 'hoy' ? ' hoy' : '') + (mae.abre && m.mes === mae.mes ? ' sel' : '') + '"><button type="button">' + MES[+m.mes.slice(5) - 1] + (m.mes.slice(5) === '01' ? ' ' + m.mes.slice(2, 4) : '') + '<i>' + (m.tipo === 'cierre' ? 'cierre' : m.tipo === 'hoy' ? 'hoy' : '') + '</i></button></span>').join('') +
      reng('Entra', m => money(m.entra)) + reng('Sale', m => money(m.sale)) + reng('Te queda', m => sg(m.queda)) + reng('Llevas o tendrías', m => money(m.tipo === 'proy' ? m.proy : m.real || 0), 'tot') + '</div></div>';

    return { kv: 'var(--cy)', titulo: 'Fondo Maestría', sub: 'Tu dinero para irte a Esslingen en septiembre de 2027.', html:
      '<div class="km"><div class="km-a"><section class="kv-c km-hero"><span>Guardando lo que te queda, en ' + MESL[+fin.mes.slice(5) - 1] + ' tendrías</span><div><strong>' + money(fin.proy) + '</strong><em>de ' + money(T.pide) + '</em></div>' + med(pct(fin.proy, T.pide)) +
          '<p class="' + (ok ? 'si' : 'no') + '">' + (ok ? 'Sí llegas: te sobran ' + money(-falta) + '.' : 'Todavía no llegas: te faltan ' + money(falta) + '.') + '</p></section>' +
        '<div class="kv-tiles">' + [['Llevas en todo', money(T.hoy), dif < -1 ? 'Tu plan pedía ' + money(T.planHoy) + '. <em class="mal">Vas ' + money(-dif) + ' abajo</em>' : 'Tu plan pedía ' + money(T.planHoy) + '. <em class="ok">Vas ' + money(dif) + ' arriba</em>'],
          ['Te entra cada mes', money(queda[0] ? queda[0].entra : 0), queda[0] ? 'sueldo ' + money(queda[0].entraDe.sueldo) + ', Didi ' + money(queda[0].entraDe.didi) + ' y vale ' + money(queda[0].entraDe.vale) : ''],
          ['Te queda cada mes', money(queda[0] ? queda[0].queda : 0), 'lo que entra menos lo documentado' + (salto ? '; desde ' + MESL[+salto.mes.slice(5) - 1] + ', ' + money(salto.queda) : '')],
          ['Guardaste en ' + nm, money(Math.max(0, este.crecio || 0)), este.crecio == null ? 'se mide con tu primer cierre' : sinAnotar > 1 ? 'de ' + money(este.queda) + ' que te quedaban. <em class="mal">' + money(sinAnotar) + ' sin anotar</em>' : '<em class="ok">todo lo que te quedaba</em>']]
          .map(q => '<div class="kv-tile"><span>' + q[0] + '</span><b>' + q[1] + '</b><i>' + q[2] + '</i></div>').join('') + '</div></div>' +
      '<div class="km-b"><section class="kv-c km-g"><div class="km-cab"><div><h3>Tu camino a la salida</h3></div>' +
          leyenda([['Lo que llevas', 'var(--text)', 'l'], ['Lo que tendrías', 'var(--ac)', 'l'], ['Tu plan completo', 'var(--kv-gris)', 'd'], ['Lo que se necesita', 'var(--kv-2)', 'd']]) + '</div>' + grafica('salida') + flujo + '</section>' +
        '<section class="kv-c km-nec"><div class="km-tot"><h3>Todo lo que tienes</h3><strong>' + money(T.hoy) + '</strong></div>' + listaPiezas + (tiEditable() ? '<div class="km-ed">' + boton('Anotar una compra', 'abrirKpi(\'invertido\')', 1) + boton('Editar saldos', 'abrirKpi(\'fondo\');MEDIDORES.editarMano(true)', 1) + '</div>' : '') + '<div class="km-tot dos"><h3>Lo que debes tener en ' + mesTxt(fin.mes).slice(0, 3) + '</h3><strong>' + money(T.pide) + '</strong></div><div class="km-lista">' + listaCostos + '</div><div class="kv-pie">No incluye los ' + money(T.fuera) + ' de trámites, vuelo y primera renta: no van en este presupuesto.</div></section></div>' +
      '<section class="kv-c km-det' + (mae.abre ? ' abre' : '') + '" id="kmDet">' + desgloseMae() + '</section>' +
      '<div class="km-pasos" style="--n:' + pasos.length + '">' + pasos.map((q, i) => '<section class="kv-c km-paso' + (i ? '' : ' uno') + '"><b class="n">' + (i + 1) + '</b><div><div class="t"><h3>' + q[0] + '</h3><strong>' + q[1] + '</strong></div><p>' + q[2] + '</p>' + (q[3] ? '<div class="ac">' + q[3] + '</div>' : '') + '</div></section>').join('') + '</div>' +
      '</div>',
      listo: () => trayecto('salida', { L, cor, hoy: diaTxt(R.k) }) };
  };
  // La gráfica de la maestría: un punto y su cifra por mes —lo que llevabas, lo de hoy y lo que tendrías—, el plan y lo que
  // se necesita punteados, y las cuatro fechas con lo que piden.
  function trayecto(id, o) {
    const g = base(id, { aria: 'Lo que llevabas en cada cierre, lo que llevas hoy y lo que tendrías cada mes hasta la salida, contra tu plan y lo que se necesita' }); if (!g) return; guarda(id, trayecto, o);
    const L = o.L, n = L.length, chico = g.w < 760; g.l = chico ? 52 : 132; g.r = chico ? 16 : 0; g.t = 30; g.b = chico ? 44 : 10;
    const alto = Math.max(...L.map(m => Math.max(m.real || 0, m.proy || 0, m.plan || 0, m.nec || 0)), ...o.cor.map(c => c.pide)), Y = ejes(g, 0, alto * 1.05), X = i => chico ? g.l + 26 + i / (n - 1) * (g.w - g.r - g.l - 52) : g.l + (i + .5) * (g.w - g.l) / n, y0 = Y(0);
    const H = L.findIndex(m => m.tipo === 'hoy'), xh = X(H), en = mes => L.findIndex(m => m.mes === mes), P = (f, desde) => L.map((m, i) => i < (desde || 0) || f(m) == null ? null : [X(i), Y(f(m))]).filter(Boolean);
    const d = p => p.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(''), linea = (p, at) => p.length > 1 && nodo(g.svg, 'path', Object.assign({ d: d(p), fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, at));
    const txt = (x, y, t, at) => nodo(g.svg, 'text', Object.assign({ x, y, 'text-anchor': 'middle', class: 'km-x' }, at), t);
    // Lo que ya pasó y lo que falta.
    nodo(g.svg, 'rect', { x: g.l, y: g.t - 22, width: xh - g.l, height: y0 - g.t + 22, class: 'km-past' });
    if (!chico) { txt(xh - 10, g.t - 8, 'Lo que ya pasó', { 'text-anchor': 'end' }); txt(xh + 10, g.t - 8, 'Proyección', { 'text-anchor': 'start' }); }
    nodo(g.svg, 'line', { x1: xh, x2: xh, y1: g.t - 22, y2: y0, class: 'km-hoy' });
    linea(P(m => m.nec), { stroke: 'var(--kv-2)', 'stroke-width': 1.5, 'stroke-dasharray': '2 6' });
    linea(P(m => m.plan), { stroke: 'var(--kv-gris)', 'stroke-width': 2, 'stroke-dasharray': '7 6' });
    const pr = P(m => m.proy, H); if (pr.length > 1) nodo(g.svg, 'path', { d: d(pr) + 'L' + pr[pr.length - 1][0] + ' ' + y0 + 'L' + pr[0][0] + ' ' + y0 + 'Z', class: 'km-area' });
    linea(pr, { stroke: 'var(--ac)', 'stroke-width': 3.5 });
    linea(P(m => m.tipo === 'proy' ? null : m.real), { stroke: 'var(--text)', 'stroke-width': 3 });
    // Las cuatro fechas: cuánto piden y cuánto falta para llegar.
    o.cor.forEach((c, k) => {
      const i = en(c.mes); if (i < 0) return; const x = X(i), y = Y(c.pide), sig = o.cor[k + 1], ant = o.cor[k - 1], der = ant && en(ant.mes) === i - 1 && k < o.cor.length - 1;
      nodo(g.svg, 'line', { x1: x, x2: x, y1: y, y2: Y(L[i].proy), class: 'km-gap' }); nodo(g.svg, 'circle', { cx: x, cy: y, r: 7, fill: 'var(--kv-2)', stroke: 'var(--kv-caja)', 'stroke-width': 2 });
      const junto = Math.abs(y - Y(L[i].proy)) < 44;
      if (!chico && c.pide > L[i].proy && !junto) { const ult = i === n - 1; txt(x + (ult ? -9 : 9), y + (Y(L[i].proy) - y) * (ult ? .58 : der ? .72 : .5) + 4, 'faltan ' + money(c.pide - L[i].proy), { 'text-anchor': ult ? 'end' : 'start', class: 'km-x o' }); }
      if (!chico) { const bajo = L[i].proy >= c.pide, fin = i === n - 1, a = { 'text-anchor': (der || bajo) && !fin ? 'start' : 'end' }, tx = x + (a['text-anchor'] === 'start' ? 13 : -13), dy = bajo ? 17 : junto ? -22 : der && g.h > 260 ? -15 : 0; txt(tx, y - 3 + dy, money(c.pide), Object.assign({ class: 'km-x f' }, a)); if (!der || g.h > 260) txt(tx, y + 14 + dy, c.t, a); }
    });
    // Un punto y su cifra por mes.
    L.forEach((m, i) => {
      const x = X(i), real = m.tipo !== 'proy', val = real ? m.real : m.proy; if (val == null) return; const y = Y(val);
      nodo(g.svg, 'circle', { cx: x, cy: y, r: m.tipo === 'hoy' ? 7 : 5, fill: real ? 'var(--text)' : 'var(--ac)', stroke: 'var(--kv-caja)', 'stroke-width': 2 });
      if (chico && m.tipo !== 'hoy' && i !== n - 1) return;
      const pasa = o.cor.some(c => c.mes === m.mes && c.pide <= val), abajo = !real && y0 - y > 46 && !(pasa && i !== n - 1); txt(x + (pasa && !abajo ? 8 : 0), abajo ? y + 22 : y - 12, money(val), { class: 'km-x f' + (real ? '' : ' p'), 'text-anchor': pasa && !abajo ? 'end' : 'middle' });
    });
    L.forEach((m, i) => {
      if (m.vendio > 0 && !chico) txt(X(i) + 4, Y(m.real) - 34, 'vendiste Bitcoin: ' + money(m.vendio), { 'text-anchor': 'start' });
      if (!chico || (i % 2 && m.tipo !== 'hoy' && i !== n - 1)) return;
      txt(X(i), g.h - 24, MES[+m.mes.slice(5) - 1] + (m.mes.slice(5) === '01' ? ' ' + m.mes.slice(0, 4) : ''), { class: 'km-x' + (m.tipo === 'hoy' ? ' f' : '') });
      if (m.tipo !== 'proy') txt(X(i), g.h - 8, m.tipo === 'hoy' ? 'hoy' : 'cierre', { class: 'km-x c' });
    });
    const cruz = nodo(g.svg, 'line', { y1: g.t, y2: y0, stroke: 'var(--kv-gris)', 'stroke-width': 1, opacity: 0 });
    raton(g, n, X, i => {
      const m = L[i]; cruz.setAttribute('x1', X(i)); cruz.setAttribute('x2', X(i)); cruz.setAttribute('opacity', .8);
      globo(g, X(i), mesTxt(m.mes) + (m.tipo === 'cierre' ? ', cierre' : m.tipo === 'hoy' ? ', hoy' : ''), [m.real != null && { c: 'var(--text)', v: money(m.real), n: m.tipo === 'hoy' ? 'llevas' : 'llevabas' }, m.tipo === 'proy' && { c: 'var(--ac)', v: money(m.proy), n: 'tendrías' },
        m.plan != null && { c: 'var(--kv-gris)', v: money(m.plan), n: 'tu plan' }, m.nec != null && { c: 'var(--kv-2)', v: money(m.nec), n: 'se necesita' }, m.entra != null && { c: 'var(--kv-1)', v: money(m.entra), n: 'entra' }, m.queda != null && { c: 'var(--kv-1)', v: signo(m.queda), n: 'te queda' }].filter(Boolean));
    }, () => cruz.setAttribute('opacity', 0));
  }

  // ══ Patrimonio ══
  const pat = { C: null, st: [], s: 0, ve: '', cambios: [], u: null, F: null };
  const mesL = ym => MESL[+ym.slice(5) - 1] + ' de ' + ym.slice(0, 4);
  const barraP = (v, tot, c) => '<i class="km-bl"><u style="width:' + (v > 0 ? Math.max(1.5, pct(v, tot)) : 0) + '%;background:' + c + '"></u></i>';
  // Lo que pasa hasta la parada elegida: hoy, qué cambió desde el último cierre; las demás, qué crece, qué baja y qué viene.
  function tramoMillon() {
    const K = pat.C, st = pat.st, s = st[pat.s], a = st[pat.s - 1], tope = Math.max(1, ...st.map(q => Math.max(q.dinero, q.debe)));
    const par = (t, v, c) => '<div class="km-li"><b>' + t + '</b><strong>' + (v < 1 ? 'nada' : money(v)) + '</strong>' + barraP(v, tope, c) + '</div>';
    let txt = '', tit = mesL(s.mes), de = 'Hoy';
    if (!a) {
      tit = +hoyLocal().slice(8) + ' de ' + MESL[+hoyLocal().slice(5, 7) - 1];
      const L = pat.cambios.filter(c => Math.abs(c[1]) >= 1), mx = Math.max(1, ...L.map(c => Math.abs(c[1])));
      txt = L.length ? '<h4>Qué cambió desde ' + mesL(pat.u.month) + '</h4>' + L.map(c => '<div class="kv-dv"><span>' + c[0] + '</span><span class="z"><i style="' + (c[1] >= 0 ? 'left:50%' : 'right:50%') + ';width:' + Math.max(1.5, Math.abs(c[1]) / mx * 50) + '%;background:' + (c[1] >= 0 ? 'var(--g)' : 'var(--o)') + '"></i></span><strong>' + signo(c[1]) + '</strong></div>').join('') : '<p>' + (pat.u ? 'Nada cambió desde tu último cierre.' : 'Se compara cuando cierre un mes.') + '</p>';
    } else {
      de = 'De ' + (pat.s === 1 ? 'hoy' : mesL(a.mes)) + ' a';
      const d = s.dinero - a.dinero, b = a.debe - s.debe, ini = K.meses.findIndex(m => m.mes === K.maestria[0]), baja = ini > 0 && K.maestria[0] > a.mes && K.maestria[0] <= s.mes ? K.meses[ini - 1].dinero - K.meses[ini].dinero : 0;
      txt = '<p>Tu dinero ' + (d >= 0 ? 'crece <b>' + money(d) + '</b>' : 'baja <b>' + money(-d) + '</b>') + ' y tu deuda ' + (b >= 0 ? 'baja <b>' + money(b) + '</b>' : 'sube <b>' + money(-b) + '</b>') + '.</p>' +
        (baja > 0 ? '<p>Al empezar la maestría salen <b>' + money(baja) + '</b>: la colegiatura, el colchón de llegada y los ' + money(K.fuera) + ' de trámites, vuelo y primera renta.</p>' : '');
    }
    const L = K.paradas, toca = p => a && p.mes > a.mes && p.mes <= s.mes;
    return '<div class="kp-tit"><span>' + de + '</span><h3>' + tit + '</h3></div>' + par('Tu dinero', s.dinero, V.a) + par('Lo que debes', s.debe, V.b) + '<div class="kp-q"><b>Te queda</b><strong class="' + (s.queda < 0 ? 'mal' : 'ok') + '">' + (s.queda < 0 ? '−' : '') + money(Math.abs(s.queda)) + '</strong></div>' +
      '<div class="kp-txt">' + txt + '</div>' + (L.length ? '<div class="kp-par' + (a ? ' el' : '') + '"><h4>Tus paradas</h4>' + L.map(p => '<div' + (toca(p) ? ' class="si"' : '') + '><span>' + mesTxt(p.mes) + '</span><b>' + esc(p.t) + '</b></div>').join('') + '</div>' : '');
  }
  const patListas = {
    dinero: () => { const x = dinero(pat.F); return [['Depósito de la renta', x.deposito, 'regresa al dejar el depa'], ['CETES', x.ef], ['Bitcoin', x.btcV]].concat(x.otras.map(i => [esc(i.name), +i.value || +i.invested || 0]), x.liq.map(q => [esc(q.name), +q.value || 0, q.fecha ? 'dicho el ' + diaTxt(q.fecha) : ''])); },
    debe: () => (pat.F.debts || []).filter(d => +d.balance > 0).map(d => [esc(d.name), +d.balance, (+d.min > 0 ? money(+d.min) + ' al mes, ' : '') + (d.rate > 0 && tasaQueCorre(d) > 0 ? d.rate + '% al año' : 'sin intereses')]),
    cosas: () => dinero(pat.F).bienes.map(q => [esc(q.name), +q.value || 0, esc(q.notes || '')])
  };
  const patLista = () => pat.ve ? '<div class="kp-lista">' + patListas[pat.ve]().filter(q => q[1] >= 1).sort((a, b) => b[1] - a[1]).map(q => '<div class="km-li"><b>' + q[0] + (q[2] ? ' <u>' + q[2] + '</u>' : '') + '</b><strong>' + money(q[1]) + '</strong></div>').join('') + '</div>' : '';
  M.patVe = function (k) {
    pat.ve = pat.ve === k ? '' : k;
    const d = document.getElementById('kpLista'); if (d) d.innerHTML = patLista();
    document.querySelectorAll('.kp .kv-tile[data-k]').forEach(b => b.setAttribute('aria-expanded', b.dataset.k === pat.ve));
  };
  M.patMes = function (i) {
    pat.s = i; const d = document.getElementById('kpTramo'); if (d) d.innerHTML = tramoMillon();
    document.querySelectorAll('.kp-t button').forEach((b, k) => { b.classList.toggle('sel', k === i); b.setAttribute('aria-pressed', k === i); });
    graficas.filter(q => q[0] === 'millon').forEach(q => q[1](q[0], q[2]));
  };
  // La gráfica: tu dinero menos tus deudas, de tu primer cierre al millón. Lo real en blanco, lo que tendrías en verde.
  const KP = { l: 132, a: 34, b: 66 };
  function rutaMillon(id, o) {
    const g = base(id, { aria: 'Tu dinero menos tus deudas, de tu primer cierre al millón' }); if (!g) return; guarda(id, rutaMillon, o);
    const L = o.L, n = L.length, chico = g.w < 760; g.l = chico ? 58 : KP.l; g.r = 0; g.t = 30; g.b = chico ? 30 : 12;
    const v = L.map(m => m.queda), Y = ejes(g, Math.min(0, ...v), Math.max(1e6, ...v) * 1.04), ini = chico ? g.l + 8 : g.l + KP.a, fin = g.w - (chico ? 16 : KP.b), X = i => ini + i / Math.max(1, n - 1) * (fin - ini), y0 = Y(0), H = Math.max(0, L.findIndex(m => m.tipo === 'hoy')), en = ym => L.findIndex(m => m.mes === ym);
    const txt = (x, y, t, at) => nodo(g.svg, 'text', Object.assign({ x, y, class: 'km-x' }, at), t), pts = L.map((m, i) => [X(i), Y(m.queda)]), d = p => p.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join('');
    const m0 = en(o.K.maestria[0]), m1 = en(o.K.maestria[1]); if (m0 > 0 && m1 > m0) { nodo(g.svg, 'rect', { x: X(m0), y: g.t - 22, width: X(m1) - X(m0), height: g.h - g.b - g.t + 22, class: 'kp-mae' }); txt((X(m0) + X(m1)) / 2, g.t - 4, chico ? 'Maestría' : 'Maestría en Alemania', { 'text-anchor': 'middle', class: 'km-x f' }); }
    nodo(g.svg, 'line', { x1: g.l, x2: g.w, y1: Y(1e6), y2: Y(1e6), class: 'kp-mil' }); if (!chico) txt(g.l + 10, Y(1e6) - 9, 'El millón', { 'text-anchor': 'start', class: 'km-x o' });
    // El área, de cero a la línea: naranja abajo, verde arriba.
    [['var(--kv-2)', Math.max], ['var(--ac)', Math.min]].forEach(q => nodo(g.svg, 'path', { d: 'M' + X(H) + ' ' + y0 + pts.slice(H).map(p => 'L' + p[0].toFixed(1) + ' ' + q[1](p[1], y0).toFixed(1)).join('') + 'L' + X(n - 1) + ' ' + y0 + 'Z', fill: q[0], opacity: .13 }));
    const sx = X(Math.max(0, en(pat.st[pat.s] ? pat.st[pat.s].mes : ''))); nodo(g.svg, 'line', { x1: sx, x2: sx, y1: g.t - 10, y2: g.h - g.b, class: 'km-hoy' });
    [[pts.slice(H), 'var(--ac)', 4], [pts.slice(0, H + 1), 'var(--text)', 3]].forEach(q => q[0].length > 1 && nodo(g.svg, 'path', { d: d(q[0]), fill: 'none', stroke: q[1], 'stroke-width': q[2], 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
    L.slice(0, H).forEach((m, i) => nodo(g.svg, 'circle', { cx: X(i), cy: Y(m.queda), r: 4, fill: 'var(--text)', stroke: 'var(--kv-caja)', 'stroke-width': 2 }));
    pat.st.forEach((q, k) => { const i = en(q.mes); if (i >= 0) nodo(g.svg, 'circle', { cx: X(i), cy: Y(L[i].queda), r: k === pat.s ? 8 : 5, fill: q.tipo === 'hoy' ? 'var(--text)' : 'var(--ac)', stroke: 'var(--kv-caja)', 'stroke-width': 2 }); });
    const NOM = { cero: 'pasas de cero', medio: 'medio millón', millon: 'el millón' };
    if (!chico) { const at = { 'text-anchor': 'end' }; txt(X(H) - 12, Y(L[H].queda) - 30, (L[H].queda < 0 ? '−' : '') + money(Math.abs(L[H].queda)), Object.assign({}, at, { class: 'km-x f' })); txt(X(H) - 12, Y(L[H].queda) - 13, 'hoy', at); }
    o.K.paradas.forEach(p => {
      const i = en(p.mes); if (!NOM[p.tipo] || i < 0) return; const x = X(i), y = Y(L[i].queda);
      nodo(g.svg, 'circle', { cx: x, cy: y, r: 7, fill: 'var(--kv-2)', stroke: 'var(--kv-caja)', 'stroke-width': 2 });
      if (chico && p.tipo !== 'millon') return;
      txt(x - 14, y - 26, mesL(p.mes), { 'text-anchor': 'end', class: 'km-x f' }); txt(x - 14, y - 9, NOM[p.tipo], { 'text-anchor': 'end' });
    });
    if (chico) { txt(X(H), g.h - 8, 'hoy', { 'text-anchor': 'middle', class: 'km-x f' }); txt(X(n - 1), g.h - 8, mesTxt(L[n - 1].mes), { 'text-anchor': 'end' }); }
    const cruz = nodo(g.svg, 'line', { y1: g.t, y2: g.h - g.b, stroke: 'var(--kv-gris)', 'stroke-width': 1, opacity: 0 });
    raton(g, n, X, i => {
      const m = L[i], p = o.K.plan[m.mes]; cruz.setAttribute('x1', X(i)); cruz.setAttribute('x2', X(i)); cruz.setAttribute('opacity', .8);
      const sg = q => (q < 0 ? '−' : '') + money(Math.abs(q));
      globo(g, X(i), mesTxt(m.mes) + (m.tipo === 'cierre' ? ', cierre' : m.tipo === 'hoy' ? ', hoy' : ''), [{ c: 'var(--ac)', v: sg(m.queda), n: 'te queda' }, { c: V.a, v: money(m.dinero), n: 'tu dinero' }, { c: V.b, v: money(m.debe), n: 'debes' }, p && m.tipo === 'proy' && { c: 'var(--kv-gris)', v: sg(p.liquido), n: 'tu plan completo' }].filter(Boolean));
    }, () => cruz.setAttribute('opacity', 0));
  }
  M.patrimonio = function (F) {
    const x = dinero(F), neto = patrimonioNeto(), ym = hoyLocal().slice(0, 7), real = fondoMaestria().total, K = C().caminoMillon(F, { real });
    const H = (F.indicatorHistory || []).filter(h => h.month < ym && isFinite(h.netWorth)).sort((a, b) => a.month < b.month ? -1 : 1), u = H[H.length - 1];
    const val = L => (L || []).reduce((s, i) => s + (+i.value || +i.invested || 0), 0), act = (h, f) => (h.activos || []).filter(f).reduce((s, a) => s + (+a.value || 0), 0);
    let cambios = [];
    if (u) {
      cambios = [['Deudas', u.debts.reduce((s, d) => s + (+d.balance || 0), 0) - x.debe], ['Bitcoin', x.btcV - (+u.btcValue || 0)], ['Otras inversiones', x.otrasV + x.deposito - val(u.investments)],
        ['CETES', x.ef - (+u.emergencyFund || 0)], ['Cuenta y efectivo', x.liqV - act(u, a => a.type === 'liquido')], ['Tus cosas', x.bienesV - act(u, a => a.type !== 'liquido')]];
      const resto = (neto - u.netWorth) - cambios.reduce((s, c) => s + c[1], 0);
      if (Math.abs(resto) >= 1) cambios.push(['Otros', resto]);
      cambios = cambios.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
    }
    const dif = u ? neto - u.netWorth : 0, mejor = cambios.filter(c => c[1] >= 1)[0], peor = cambios.filter(c => c[1] <= -1)[0], tiene = x.ef + x.otrasV + x.deposito + x.btcV + x.liqV;
    const compra = x.bienes.filter(a => /precio de compra/i.test(a.notes || '')).sort((a, b) => b.value - a.value)[0], ds = (F.debts || []).filter(d => +d.balance > 0).sort((a, b) => b.balance - a.balance), d0 = ds[0];
    // Las columnas: hoy, los diciembres y el millón (o el último mes), sin que se encimen.
    const fin = K.cruza || K.meses[K.meses.length - 1].mes, L = K.meses.filter(m => m.mes <= fin), iH = Math.max(0, L.findIndex(m => m.tipo === 'hoy')), st = L.filter((m, i) => i === iH || i === L.length - 1 || (m.mes.slice(5) === '12' && i - iH >= 8 && L.length - 1 - i >= 6));
    Object.assign(pat, { C: K, st, cambios, u, F, s: Math.min(pat.s, st.length - 1) });
    const hoyM = L[iH], a1 = K.adelanta(1000), a5 = K.adelanta(5000), dm = K.planCruza && K.cruza ? (+K.planCruza.slice(0, 4) - +K.cruza.slice(0, 4)) * 12 + +K.planCruza.slice(5) - +K.cruza.slice(5) : 0, finD = d0 ? K.paradas.filter(p => p.tipo === 'deuda').slice(-1)[0] : null, piezas = L2 => L2.filter(q => q[1] >= 1).sort((a, b) => b[1] - a[1]);
    const n1 = piezas([['depósito', x.deposito], ['CETES', x.ef], ['Bitcoin', x.btcV], ['inversiones', x.otrasV], ['cuenta y efectivo', x.liqV]]), junta = q => q.map(z => z[0] + ' ' + money(z[1])).reduce((t, z, i, l) => t + (i ? (i === l.length - 1 ? (/^h?i/i.test(z) ? ' e ' : ' y ') : ', ') : '') + z, '');
    const tile = (k, t, v, s) => k ? '<button type="button" class="kv-tile" data-k="' + k + '" aria-expanded="' + (pat.ve === k) + '" onclick="MEDIDORES.patVe(\'' + k + '\')"><span>' + t + '</span><b>' + v + '</b><i>' + s + '</i></button>' : '<div class="kv-tile"><span>' + t + '</span><b>' + v + '</b><i>' + s + '</i></div>';
    const pasos = [
      ['Este mes', u ? signo(dif) : '—', u ? (mejor ? 'Lo que más ayudó: <b>' + (mejor[0] === 'Deudas' ? 'bajar tus deudas' : mejor[0] === 'Bitcoin' ? 'tu Bitcoin' : mejor[0].toLowerCase()) + '</b>, ' + signo(mejor[1]) + '.' : 'Nada sumó.') + (peor ? ' Lo que más restó: ' + (peor[0] === 'Deudas' ? 'tus deudas' : peor[0] === 'Bitcoin' ? 'tu Bitcoin' : peor[0].toLowerCase()) + ', ' + signo(peor[1]) + '.' : ' Nada restó.') : 'Se compara cuando cierre el mes.', boton('Registrar una compra', 'abrirKpi(\'invertido\')')],
      d0 ? ['Tu deuda más grande', money(+d0.balance), esc(d0.name) + (+d0.min > 0 ? ': pagas <b>' + money(+d0.min) + '</b> al mes' : '') + (finD ? ' y acabas en ' + mesL(finD.mes) : '') + '.', boton('Simular un abono', 'abrirKpi(\'deudatotal\')', 1)] : ['Sin deudas', 'bien', 'Todo lo que guardas suma al millón.'],
      a5 > 0 ? ['Guarda ' + money(5000) + ' más al mes', plural(a5, 'mes', 'meses') + ' antes', 'Es lo que se adelanta el millón, sin contar lo que rinda.' + (a1 > 0 ? ' Con ' + money(1000) + ', ' + plural(a1, 'mes', 'meses') + '.' : '')] : ['Guarda lo que te queda', 'cada mes', 'Es lo que más te acerca al millón.'],
      ['Contra tu plan completo', dm > 0 ? plural(dm, 'mes', 'meses') + ' antes' : dm < 0 ? plural(-dm, 'mes', 'meses') + ' después' : K.planCruza ? 'igual' : '—', (K.planCruza ? 'Tu plan llega en ' + mesL(K.planCruza) + '. ' : '') + 'Cada cierre de Finanzas mueve la línea y la fecha.']];
    return { kv: 'var(--g)', titulo: 'Patrimonio hacia $1M', sub: 'Para el millón cuenta tu dinero menos tus deudas. Tus cosas van aparte.', html:
      '<div class="km kp"><div class="km-a"><section class="kv-c km-hero"><span>' + (K.cruza ? 'Guardando lo que te queda, llegas al millón en' : 'Con estos números todavía no llegas al millón') + '</span><div><strong>' + (K.cruza ? mesL(K.cruza) : '—') + '</strong>' + (K.faltan ? '<em>' + plural(K.faltan, 'mes', 'meses') + '</em>' : '') + '</div>' +
          '<p>Hoy vas en <b>' + (hoyM.queda < 0 ? '−' : '') + money(Math.abs(hoyM.queda)) + '</b>.' + (K.cero ? ' Desde ' + mesL(K.cero) + ' ya no bajas de cero.' : '') + '</p></section>' +
        '<div class="kv-tiles">' + tile('dinero', 'Tienes en dinero', money(tiene), n1.length ? junta(n1) : 'todavía nada') + tile('debe', 'Debes', money(x.debe), ds.length ? junta(ds.slice(0, 3).map(d => [esc(d.name.replace(/\s*\([^)]*\)/g, '')), +d.balance])) : 'nada') +
          tile('cosas', 'Tus cosas', money(x.bienesV), compra ? esc(compra.name) + ' va a precio de compra, ' + money(+compra.value) + ': hoy se vendería en menos' : plural(x.bienes.length, 'bien registrado', 'bienes registrados') + ' en Finanzas') + tile('', 'Con todo, tu patrimonio', money(neto), u ? gana(dif) + ' desde que cerró ' + mesTxt(u.month) : 'se compara cuando cierre un mes') + '</div></div>' +
      '<div id="kpLista">' + patLista() + '</div>' +
      '<div class="km-b"><section class="kv-c km-g"><div class="km-cab"><div><h3>Tu camino al millón</h3></div>' + leyenda([['Lo que llevabas', 'var(--text)'], ['Lo que tendrías', 'var(--ac)'], ['Una parada', V.b]]) + '</div>' + grafica('millon') +
        '<div class="km-tw"><div class="kp-t"><div class="e"><span>Tu dinero</span><span>Debes</span><span>Te queda</span></div>' + st.map((q, k) => '<button type="button" class="' + (k === pat.s ? 'sel' : '') + '" aria-pressed="' + (k === pat.s) + '" style="--f:' + (L.indexOf(q) / Math.max(1, L.length - 1)).toFixed(4) + '" onclick="MEDIDORES.patMes(' + k + ')"><b>' + (k ? mesTxt(q.mes) : 'hoy') + '</b><span>' + money(q.dinero) + '</span><span>' + (q.debe < 1 ? 'nada' : money(q.debe)) + '</span><strong class="' + (q.queda < 0 ? 'mal' : 'ok') + '">' + (q.queda < 0 ? '−' : '') + money(Math.abs(q.queda)) + '</strong></button>').join('') + '</div></div></section>' +
        '<section class="kv-c km-nec kp-tr" id="kpTramo">' + tramoMillon() + '</section></div>' +
      '<div class="km-pasos" style="--n:' + pasos.length + '">' + pasos.map((p, i) => '<section class="kv-c km-paso' + (i ? '' : ' uno') + '"><b class="n">' + (i + 1) + '</b><div><div class="t"><h3>' + p[0] + '</h3><strong>' + p[1] + '</strong></div><p>' + p[2] + '</p>' + (p[3] ? '<div class="ac">' + p[3] + '</div>' : '') + '</div></section>').join('') + '</div></div>',
      listo: () => rutaMillon('millon', { L, K }) };
  };

  // ══ Intereses este mes ══
  const prestamos = F => (F.debts || []).filter(d => +d.balance > 0 && tasaQueCorre(d) > 0 && +d.min > 0 && d.type !== 'credit_card').map(d => ({ d, R: C().prestamoResumen(d, F) }));
  // El contrato y los datos de hoy no acaban en el mismo mes: alguna cifra no es la del estado de cuenta.
  const chocaC = R => !!(R && R.contrato && R.contrato.faltan != null && !R.proy.nunca && Math.abs(R.contrato.faltan - R.proy.meses) > 2);
  M.intereses = function (F) {
    const con = (F.debts || []).filter(d => +d.balance > 0 && tasaQueCorre(d) > 0), mes = con.reduce((s, d) => s + d.balance * d.rate / 1200, 0), L = prestamos(F);
    if (!con.length) return { kv: 'var(--g)', titulo: 'Intereses este mes', sub: '', html: '<div class="kv-fila">' + hero(money(0), '', 'No pagas intereses. Todo lo que abones baja tu deuda.', null) + '</div>' };
    const doce = L.reduce((s, p) => s + p.R.tabla.slice(0, 12).reduce((a, t) => a + t.interes, 0), 0), p = L[0], R = p && p.R, t = R && R.tabla[0];
    const total = L.reduce((s, q) => s + (q.R.proy.interes || 0), 0), tarj = con.filter(d => d.type === 'credit_card');
    let cuerpo = '', listo = null;
    if (t) {
      const pago = t.interes + t.cargos + t.capital, partes = [['Interés', t.interes, V.b], ['IVA y seguros', t.cargos, V.c], ['Baja tu deuda', t.capital, V.a]].filter(q => q[1] > 0), a = v => R.ahorro({ extra: v });
      cuerpo = hoy(t.fecha && C().fechaLocal(t.fecha) === hoyLocal() ? 'Hoy' : 'Sigue', 'El <b>' + prDia(t.fecha) + '</b> pagas <b>' + money(pago) + '</b>: <b>' + money(t.interes) + '</b> se van en interés y <b>' + money(t.capital) + '</b> bajan tu deuda.', chocaC(R) ? 'Ojo: con estos datos acabarías en ' + prMes(R.fin) + ' y tu contrato dice ' + prMes(R.contrato.ultima) + '. Los totales pueden estar cortos.' : 'Se anota solo. Lo único que lo baja es abonar aparte.', (chocaC(R) ? boton('Revisar mis datos', 'abrirKpi(\'deudatotal\')', 1) : '') + boton('Simular un abono', 'abrirKpi(\'deudatotal\')')) +
        '<div class="kv-fila crece"><section class="kv-c s8"><h3>A dónde va tu dinero cada año</h3><p>' + esc(p.d.name) + ', hasta que acabes en ' + prMes(R.fin) + '.</p>' + grafica('anios') + leyenda(partes.map(q => [q[0], q[2]])) + '</section>' +
        '<section class="kv-c s4"><h3>Tu mensualidad, partida</h3><p>De cada pago de ' + money(pago) + '.</p><div class="kv-alta">' + partes.map(q => '<i style="flex:' + q[1] + ';background:' + q[2] + '" title="' + q[0] + ': ' + money(q[1]) + '">' + (q[1] / pago > .14 ? Math.round(q[1] / pago * 100) + '%' : '') + '</i>').join('') + '</div>' + lista(partes.map(q => fila(q[0], money(q[1]), '', '', q[2])).join('')) +
          '<h3 style="margin-top:16px;font-size:16px">Si abonas hoy</h3>' + lista([5000, 10000, 20000].map(v => { const s = a(v); return s.nunca ? '' : fila(money(v), 'ahorras ' + money(s.ahorra), s.menos > 0 ? 'acabas ' + prMeses(s.menos) + ' antes' : 'misma fecha', money(v * p.d.rate / 1200) + ' menos al mes'); }).join('')) + '</section></div>' +
        '<div class="kv-fila">' + plega('in-tabla', 'Los números, año por año', money(R.proy.interes) + ' de interés en total', tabla(['Año', 'Interés'].concat(R.cargos > 0 ? ['IVA y seguros'] : [], ['Baja tu deuda', 'Debes al cerrar']),
          R.porAnio.map(q => [q.anio + (q.meses < 12 ? ' (' + plural(q.meses, 'mes', 'meses') + ')' : ''), money(q.interes)].concat(R.cargos > 0 ? [money(q.cargos)] : [], [money(q.capital), money(q.saldo)])), ['Total', money(R.proy.interes)].concat(R.cargos > 0 ? [money(R.cargosFaltan)] : [], [money(R.saldo), '']))) + '</div>';
      listo = () => columnas('anios', { et: R.porAnio.map(q => String(q.anio)), aria: 'Interés y capital de cada año', series: [{ n: 'Baja tu deuda', c: V.a, v: R.porAnio.map(q => q.capital) }].concat(R.cargos > 0 ? [{ n: 'IVA y seguros', c: V.c, v: R.porAnio.map(q => q.cargos) }] : [], [{ n: 'Interés', c: V.b, v: R.porAnio.map(q => q.interes) }]) });
    }
    if (tarj.length) cuerpo += '<div class="kv-fila">' + caja('s12', 'Tarjetas con saldo', 'Una tarjeta cobra mucho más que el auto: primero esto.', lista(tarj.map(d => fila(esc(d.name), money(d.balance * d.rate / 1200) + ' este mes', d.rate + '% al año sobre ' + money(d.balance), '')).join(''))) + '</div>';
    return { kv: 'var(--r)', titulo: 'Intereses este mes', sub: 'Lo que te cuesta deber, y cómo bajarlo.', html:
      '<div class="kv-fila">' + hero(money(mes), '', 'Es lo que te cobran por deber ' + money(con.reduce((s, d) => s + +d.balance, 0)) + '. No baja tu deuda.', null) +
      tiles([['Cada día', money(mes / 30), 'mientras debas lo mismo'], ['En los próximos 12 meses', money(doce), 'si pagas solo la mensualidad'], ['Hasta que acabes', money(total), R ? 'de interés, en ' + plural(R.proy.meses, 'mensualidad', 'mensualidades') : ''],
        ['En un año, cada mes', R && R.tabla[12] ? money(R.tabla[12].interes) : '—', R && R.tabla[12] ? 'de interés: ' + money(mes - R.tabla[12].interes) + ' menos que hoy' : '']]) + '</div>' + cuerpo, listo };
  };

  // ══ Total invertido ══
  M.invertido = function (F) {
    const R = contraPlan(F), x = R.x, editable = tiEditable(), total = x.otrasV + x.deposito + x.btcV, trabaja = x.otrasV + x.btcV, metido = x.otrasMet + x.btcMet, dif = trabaja - metido, pB = x.b.price * x.b.fx;
    const tipo = t => (TI_TIPOS.find(q => q[0] === t) || [0, 'Otro'])[1];
    const filas = x.inv.map(i => ({ date: i.date, key: i.id, n: i.name || 'Inversión', s: tipo(i.type) + tiSigueTxt(i), met: +i.invested || 0, v: +i.value || +i.invested || 0, dep: i.id === 'i004' }));
    x.BA.ops.forEach(h => { const q = Math.abs(+h.btc || 0), m = x.pes(h), ve = x.venta(h); filas.push({ date: h.date, key: ve || h.id === 'total' ? null : 'btc:' + h.id, n: ve ? 'Bitcoin, venta' : 'Bitcoin', s: tiCantTxt(q, { tipo: 'cripto', tk: 'BTC' }), met: m, v: ve ? null : pB > 0 ? q * pB : m }); });
    filas.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
    const delMes = filas.filter(f => String(f.date || '').slice(0, 7) === R.ym && f.v != null && !f.dep).reduce((s, f) => s + f.met, 0), falta = R.toca - delMes, planMes = R.E.reduce((s, e) => s + e.v, 0);
    const por = {}; filas.forEach(f => { if (f.v != null) por[f.n] = (por[f.n] || 0) + f.v; });
    if (x.BA.resto > 0 && pB > 0) por.Bitcoin = (por.Bitcoin || 0) + x.BA.resto * pB;
    const cols = [V.a, V.b, V.c, V.g], part = Object.keys(por).sort((a, b) => por[b] - por[a]).map((n, i) => [n, por[n], cols[Math.min(i, 3)]]);
    const rep = (F.reparto && F.reparto.length ? F.reparto : C().REPARTO_BASE) || [], sig = R.E.concat(envios(mas(R.ym, 1)));
    // Tu Bitcoin hoy: el precio del último mes contra lo que pagaste en promedio, en dólares.
    const ab = x.BA.ops.filter(h => !x.venta(h)), bq = ab.reduce((z, h) => z + (+h.btc || 0), 0), prom = bq > 0 ? ab.reduce((z, h) => z + (+h.usd || 0), 0) / bq : 0;
    const act = qiActivos().filter(q => q.s === 'BTC-USD')[0], hace = new Date(); hace.setDate(hace.getDate() - 30);
    const serie = act && act.d1 ? act.d1.filter(q => q[0] >= C().fechaLocal(hace)) : [], falta2 = trabaja > 0 && x.btcV > 0 && x.btcMet > x.btcV ? (x.btcMet / x.btcV - 1) * 100 : 0;
    const btcHtml = x.btcV > 0 ? '<section class="kv-c"><h3>Tu Bitcoin hoy</h3><p>Vale <b>' + money(x.btcV) + '</b>. ' + (falta2 > 0 ? 'Para recuperar lo que metiste tendría que subir <b>' + falta2.toFixed(1) + '%</b>.' : 'Ya vale más de lo que metiste.') + '</p>' + (serie.length > 1 ? '<p class="kv-p">El precio del último mes, en dólares.</p>' + grafica('btc') : '') + '</section>' : '';
    const envT = '<table class="kv-t kv-mini" style="margin-top:8px"><tbody>' + sig.map(e => '<tr' + (e.k < R.k ? ' class="pasado"' : '') + '><td><b>' + diaTxt(e.k) + '</b></td><td>' + (/Didi/.test(e.t) ? 'De Didi' : 'De tu quincena') + '</td><td>' + (e.k === R.k ? '<span class="chip">hoy</span>' : e.k < R.k ? 'ya tocó' : '') + '</td><td><b>' + money(e.v) + '</b></td></tr>').join('') + '</tbody></table>';
    const filaH = f => { const d = f.v != null ? f.v - f.met : 0; return '<div class="ti-fila' + (f.key && _tiEdit === f.key ? ' edita' : '') + '"><span class="ti-f">' + tiFecha(f.date) + '</span><span class="ti-n"><b>' + esc(f.n) + '</b><i>' + f.s + (f.dep ? ' · no rinde, lo regresan' : '') + '</i></span><span class="ti-m">' + (f.v == null ? 'te dieron <b>' + money(f.met) + '</b>' : 'metiste <b>' + money(f.met) + '</b><br>vale <b>' + money(f.v) + '</b>' + (Math.abs(d) >= 1 ? ' ' + gana(d) : '')) + '</span>' +
      (editable && f.key ? '<span class="ti-acc"><button type="button" class="ce-btn sec" onclick="tiEditar(\'' + f.key + '\')">Editar</button><button type="button" class="ce-btn sec" onclick="tiBorrar(\'' + f.key + '\')">Borrar</button></span>' : '') + '</div>'; };
    return { kv: 'var(--cy)', titulo: 'Total invertido', sub: 'Lo que tienes, cuánto va ganando y qué toca mandar.', html:
      '<div class="kv-fila">' + hero(money(total), '', 'Trabajando: <b>' + money(trabaja) + '</b>. Guardado en el depósito de la renta: <b>' + money(x.deposito) + '</b>.', null) +
      tiles([['Ganas o pierdes', metido > 0 ? signo(dif) : money(0), metido > 0 ? 'metiste ' + money(metido) + ' y vale ' + money(trabaja) + ' (' + (dif >= 0 ? '+' : '−') + Math.abs(dif / metido * 100).toFixed(1) + '%)' : 'todavía no hay compras'],
        ['Este mes el plan manda', money(planMes), 'a GBM; hasta hoy tocaban ' + money(R.toca)], ['Registraste este mes', money(delMes), falta > 1 ? 'te faltan ' + money(falta) + ' por mandar o por anotar' : 'vas al corriente'],
        ['Lo siguiente', R.sig ? money(R.sig.v) : '—', R.sig ? (R.sig.k === R.k ? 'hoy' : 'el ' + diaTxt(R.sig.k)) + (/Didi/.test(R.sig.t) ? ', de Didi' : ', de tu quincena') : 'sin envíos próximos']]) + '</div>' +
      '<div class="kv-fila crece"><div class="kv-col s4">' + ctEstrategiaHoyHtml() + '<section class="kv-c"><h3>Lo que toca mandar a GBM</h3><p>Este mes y el que sigue, según tu plan.</p>' + envT + '</section></div>' +
      '<div class="kv-col s5"><section class="kv-c"><h3>Tus compras</h3><p>De la más nueva a la más vieja. El Bitcoin y las acciones se valúan solos.</p>' + (part.length ? '<div class="kv-fin">' + part.map(q => '<i style="flex:' + q[1] + ';background:' + q[2] + '"></i>').join('') + '</div>' + leyenda(part.map(q => [esc(q[0]) + ' ' + Math.round(pct(q[1], total)) + '%', q[2]])) : '') +
        '<div class="ti-lista" style="margin-top:14px">' + (filas.map(filaH).join('') || '<p class="kv-p" style="padding:14px">Todavía no hay compras.</p>') + '</div>' + (x.BA.resto * pB >= 1 ? '<div class="kv-pie">Tu Bitcoin incluye ' + money(x.BA.resto * pB) + ' que te quedaron de antes.</div>' : '') + '</section>' +
      '<section class="kv-c kv-tres">' + (editable ? tiFormHtml(tiEditObj(F, _tiEdit)) : '<h3>Tus compras se anotan en tu PC</h3>' + copia('Se agregan')) + '</section></div>' +
      '<div class="kv-col s3 arriba">' + btcHtml + caja('', 'En qué ponerlo', F.reparto && F.reparto.length ? 'Tu reparto.' : 'El reparto de base de tu plan. Puedes escribir el tuyo.', lista(rep.map(r => fila(esc(r.n), r.pct + '%', esc(r.porque || ''), esc(r.donde || ''))).join('')) + '<div style="margin-top:14px">' + boton('Abrir Qué invertir hoy', 'cerrarKpi();abrirGBM()', 1) + '</div>') + '</div></div>',
      listo: () => { if (serie.length > 1) lineas('btc', { et: serie.map(q => diaTxt(q[0])), largo: serie.map(q => tiFecha(q[0])), ref: prom > 0 ? { v: prom, t: 'Tu promedio' } : null, aria: 'Precio del Bitcoin en dólares, último mes', series: [{ n: 'Bitcoin, en dólares', c: V.a, v: serie.map(q => q[1]) }] }); } };
  };

  // ══ Deuda total ══
  // Lo que se debe mes a mes, sumando todas: las de plazo con su tabla, las demás con su pago; `o` es el abono simulado.
  const caminoDeuda = (F, o) => C().deudaCamino(F, o);
  function simular() {
    const F = D.fin || {}, p = prestamos(F).sort((a, b) => b.d.rate - a.d.rate)[0]; if (!p) return;
    const q = id => document.getElementById(id), s = p.R.ahorro({ extra: sim.extra, extraMes: sim.mes });
    if (q('kvs-e')) q('kvs-e').textContent = money(sim.extra); if (q('kvs-m')) q('kvs-m').textContent = money(sim.mes);
    if (q('kvs-r')) q('kvs-r').innerHTML = [['Acabas', s.nunca ? '—' : prMes(s.fin)], ['Antes', s.menos > 0 ? prMeses(s.menos) : 'igual'], ['Te ahorras en intereses', s.nunca ? '—' : money(s.ahorra)]].map(z => '<div><span>' + z[0] + '</span><b>' + z[1] + '</b></div>').join('');
    const a = caminoDeuda(F, {}), b = caminoDeuda(F, { extra: sim.extra, extraMes: sim.mes }), igual = !sim.extra && !sim.mes;
    lineas('deuda', { et: a.et.map(m => m.slice(5) === '01' ? m.slice(0, 4) : ''), largo: a.et.map(mesTxt), desde: 0, aria: 'Lo que debes mes a mes, con y sin abonos',
      series: [{ n: 'Como vas', c: V.g, v: a.v, area: igual ? 1 : 0 }].concat(igual ? [] : [{ n: 'Con tus abonos', c: V.a, v: a.v.map((_, i) => i < b.v.length && (i === 0 || b.v[i - 1] > 0) ? b.v[i] : null), area: 1 }]) });
  }
  M.simula = function (campo, v) { sim[campo] = +v || 0; simular(); };
  M.llevarAbono = function () { const d = document.querySelector('[data-kv="de-abono"]'); if (d) d.open = true; const f = document.querySelector('#kpiBody form[data-pr="abono"]'); if (f) { f.pa_m.value = sim.extra; prPrevia(f.pa_m, (prestamos(D.fin || {})[0] || { d: {} }).d.id); f.scrollIntoView({ block: 'center' }); f.pa_m.focus(); } };
  M.deudatotal = function (F) {
    const ds = (F.debts || []).filter(d => +d.balance > 0).sort((a, b) => b.balance - a.balance), debe = ds.reduce((s, d) => s + +d.balance, 0), editable = tiEditable(), L = prestamos(F).sort((a, b) => b.d.rate - a.d.rate), p = L[0], R = p && p.R;
    if (!ds.length) return { kv: 'var(--g)', titulo: 'Deuda total', sub: '', html: '<div class="kv-fila">' + hero(money(0), '', 'No debes nada.', null) + '</div>' };
    const nacio = (F.debts || []).reduce((s, d) => s + (+d.total || +d.balance || 0), 0), pagos = ds.map(d => ({ d, q: C().cuotas(d) })).filter(z => z.q.siguiente).sort((a, b) => a.q.siguiente - b.q.siguiente), s1 = pagos[0];
    const fin = pagos.map(z => z.q.ultima).filter(Boolean).sort((a, b) => b - a)[0], mensual = ds.reduce((s, d) => s + (+d.min || 0), 0), mesInt = L.reduce((s, z) => s + z.R.interesSig, 0);
    const K = R && R.contrato, choca = chocaC(R);
    const salida = cortesSalidaDash().slice(-1)[0], mS = salida && C().PROYECCION.meses.filter(m => m.mes === salida.mes)[0], faltaS = salida && mS ? salida.pide - mS.alemania : 0;
    const abonos = R ? R.abonos.map(t => '<div class="ti-fila' + (_prEdit === t.id ? ' edita' : '') + '"><span class="ti-f">' + tiFecha(t.date) + '</span><span class="ti-n"><b>Abono</b><i>' + esc(t.nota || '') + '</i></span><span class="ti-m"><b>' + money(+t.amount || 0) + '</b></span>' +
      (editable ? '<span class="ti-acc"><button type="button" class="ce-btn sec" onclick="prAbonoEditar(\'' + t.id + '\')">Editar</button><button type="button" class="ce-btn sec" onclick="prAbonoBorrar(\'' + t.id + '\')">Borrar</button></span>' : '') + '</div>').join('') : '';
    return { kv: 'var(--r)', titulo: 'Deuda total', sub: 'Lo que debes, cuándo acabas y cómo acabar antes.', html:
      '<div class="kv-fila">' + hero(money(debe), '', 'Ya pagaste <b>' + Math.round(pct(nacio - debe, nacio)) + '%</b> de todo lo que has debido.', pct(nacio - debe, nacio)) +
      tiles([['Pagas cada mes', money(mensual), plural(ds.length, 'deuda viva', 'deudas vivas')], ['Próximo pago', s1 ? money(+s1.d.min) : '—', s1 ? 'el ' + prDia(s1.q.siguiente) + ', ' + esc(s1.d.name) : ''],
        ['Sin deudas en', fin ? prMes(fin) : '—', 'si pagas solo lo de cada mes'], ['De eso, intereses', money(mesInt), 'en tu próxima mensualidad del auto']]) + '</div>' +
      (choca ? hoy('Revisa', 'Tu contrato acaba en <b>' + prMes(K.ultima) + '</b>, pero con estos datos acabarías en <b>' + prMes(R.fin) + '</b>.', K.cargosSugeridos ? 'Para que cuadre, unos ' + money(K.cargosSugeridos) + ' de cada mensualidad serían IVA y seguros. Es un cálculo: el dato real viene en tu estado de cuenta.' : 'Compara el saldo y la tasa con tu estado de cuenta.',
          editable ? (K.cargosSugeridos ? boton('Usar ' + money(K.cargosSugeridos), 'prCargosUsar(\'' + p.d.id + '\',' + K.cargosSugeridos + ')') : '') + boton('Corregir mis datos', 'MEDIDORES.abre(\'de-datos\')', 1) : '', 'alto')
        : s1 ? hoy('Sigue', 'El <b>' + prDia(s1.q.siguiente) + '</b> pagas <b>' + money(+s1.d.min) + '</b> de ' + esc(s1.d.name) + '.', 'La mensualidad se anota sola.', '') : '') +
      '<div class="kv-fila crece">' + (p ? '<section class="kv-c s6"><h3>Cuánto debes, mes a mes</h3><p>Todas tus deudas juntas. Mueve los controles para ver qué cambia.</p>' + grafica('deuda') + leyenda([['Como vas', V.g, 'l'], ['Con tus abonos', V.a, 'l']]) + '</section>' +
        '<section class="kv-c s3"><h3>¿Y si abono?</h3><p>Se prueba con ' + esc(p.d.name) + ', la que cobra más: ' + p.d.rate + '% al año.</p>' +
          '<div class="kv-sl"><label for="kvs-ie">Abono hoy</label><output id="kvs-e"></output><input id="kvs-ie" type="range" min="0" max="' + Math.min(100000, Math.floor(p.d.balance / 1000) * 1000) + '" step="1000" value="' + sim.extra + '" oninput="MEDIDORES.simula(\'extra\',this.value)"></div>' +
          '<div class="kv-sl"><label for="kvs-im">Extra cada mes</label><output id="kvs-m"></output><input id="kvs-im" type="range" min="0" max="5000" step="250" value="' + sim.mes + '" oninput="MEDIDORES.simula(\'mes\',this.value)"></div>' +
          '<div class="kv-res uno" id="kvs-r"></div>' + (editable ? boton('Anotar el abono de hoy', 'MEDIDORES.llevarAbono()') : '') +
          (faltaS > 0 ? '<div class="kv-pie">Lo abonado ya no se puede sacar. A tu salida a Alemania le faltan ' + money(faltaS) + ': va primero.</div>' : '') + '</section>' : '') + '<div class="kv-col ' + (p ? 's3' : 's12') + '">' + ds.map(d => { const q = C().cuotas(d), pr = L.filter(z => z.d === d)[0], pg = pct((+d.total || 0) - d.balance, +d.total || 0);
        return caja('kv-deu', esc(d.name), d.rate > 0 && tasaQueCorre(d) > 0 ? d.rate + '% al año' : 'Sin intereses', '<b class="n">' + money(+d.balance) + '</b>' + med(pg, V.a) +
          '<p class="kv-p" style="margin-top:9px"><b>' + Math.round(pg) + '%</b> pagado' + (+d.total ? ' de ' + money(+d.total) : '') + '</p>', (q.siguiente ? 'Próximo pago: <b>' + prDia(q.siguiente) + ', ' + money(+d.min) + '</b>' + (pr ? ' (' + money(pr.R.interesSig) + ' de interés)' : '') + '.' : '') + (q.ultima ? ' Acabas en <b>' + prMes(q.ultima) + '</b>, ' + plural(q.restantes, 'pago más', 'pagos más') + '.' : '')); }).join('') + '</div></div>' +
      (p ? '<div class="kv-fila">' + plega('de-abono', 'Anotar un abono', R.abonado > 0 ? money(R.abonado) + ' abonados' : 'ninguno todavía', (editable ? prAbonoForm(p.d, R) : copia('Se anotan')) + (abonos ? '<div class="ti-lista" style="margin-top:12px">' + abonos + '</div>' : ''), 's4', !!_prEdit) +
        plega('de-datos', 'Los datos de tu crédito', p.d.rate + '% · ' + (K ? K.plazo + ' mensualidades' : ''), editable ? prDatosForm(p.d, R) : copia('Se corrigen'), 's4') +
        plega('de-contrato', 'Lo que dice tu contrato', K ? 'última en ' + prMes(K.ultima) : '', K ? lista(fila('En total pagas', money(K.total), K.plazo + ' × ' + money(R.pago), '') + (K.interes != null ? fila('De eso, intereses y cargos', money(K.interes), 'si te prestaron ' + money(+p.d.total), '') : '') + fila('Te falta pagar', money(K.faltaPagar), plural(K.faltan, 'mensualidad', 'mensualidades'), '') +
          (R.cuadra ? fila('Intereses que ya pagaste', money(R.interesPagado), 'aproximado', '') : R.interesMin != null ? fila('Intereses que ya pagaste', 'más de ' + money(R.interesMin), 'el exacto sale si pones lo que te prestaron', '') : '')) : '<p class="kv-p">Pon el plazo en los datos de tu crédito.</p>', 's4') + '</div>' : ''),
      listo: simular };
  };
  M.abre = function (id) { const d = document.querySelector('[data-kv="' + id + '"]'); if (d) { d.open = true; d.scrollIntoView({ block: 'center', behavior: 'smooth' }); } };
  M.plegado = function (d) { abiertos[d.dataset.kv] = d.open; };

  // ══ Gráficas ══ SVG al tamaño real de su caja; con cruz o resalte, y las flechas del teclado.
  const NS = 'http://www.w3.org/2000/svg';
  const nodo = (p, t, at, txt) => { const e = document.createElementNS(NS, t); Object.keys(at || {}).forEach(k => e.setAttribute(k, at[k])); if (txt != null) e.textContent = txt; p.appendChild(e); return e; };
  function marcasY(lo, hi) { const r = (hi - lo) || 1, b = Math.pow(10, Math.floor(Math.log10(r / 4))), paso = [1, 2, 2.5, 5, 10].map(m => m * b).find(q => r / q <= 5), out = []; for (let v = Math.ceil(lo / paso) * paso; v <= hi + paso * .01; v += paso) out.push(Math.abs(v) < paso * 1e-6 ? 0 : v); return { out, paso }; }
  function base(id, o) {
    const el = document.getElementById('kvg-' + id); if (!el) return null;
    const w = el.clientWidth, h = el.clientHeight; if (w < 40 || h < 40) return null;
    el.textContent = ''; el.setAttribute('role', 'img'); el.setAttribute('aria-label', o.aria);
    const svg = nodo(el, 'svg', { width: w, height: h, 'aria-hidden': 'true' }), tip = document.createElement('div'); tip.className = 'kv-tip'; el.appendChild(tip);
    return { el, svg, tip, w, h, l: 62, r: 18, t: 14, b: 28 };
  }
  function ejes(g, lo, hi) {
    const m = marcasY(lo, hi), y0 = Math.min(lo, m.out[0]), y1 = Math.max(hi, m.out[m.out.length - 1] >= hi ? m.out[m.out.length - 1] : hi), Y = v => g.t + (y1 - v) / ((y1 - y0) || 1) * (g.h - g.t - g.b);
    m.out.forEach(v => { nodo(g.svg, 'line', { class: v === 0 ? 'cero' : 'eje', x1: g.l, x2: g.w - g.r, y1: Y(v), y2: Y(v) }); nodo(g.svg, 'text', { x: g.l - 10, y: Y(v) + 4, 'text-anchor': 'end' }, corto(v)); });
    return Y;
  }
  function globo(g, x, titulo, filas) {
    g.tip.textContent = '';
    const u = document.createElement('u'); u.textContent = titulo; g.tip.appendChild(u);
    filas.forEach(f => { const d = document.createElement('div'), i = document.createElement('i'), b = document.createElement('b'), s = document.createElement('span'); i.style.background = f.c; b.textContent = f.v; s.textContent = f.n; d.append(i, b, s); g.tip.appendChild(d); });
    g.tip.classList.add('si');
    const tw = g.tip.offsetWidth; g.tip.style.left = Math.max(0, Math.min(g.w - tw, x + 14 + tw > g.w ? x - tw - 14 : x + 14)) + 'px'; g.tip.style.top = g.t + 'px';
  }
  function raton(g, n, xDe, entra, sale) {
    let act = -1; const va = i => { act = Math.max(0, Math.min(n - 1, i)); entra(act); };
    g.el.onpointermove = g.el.onpointerdown = e => { const x = e.clientX - g.el.getBoundingClientRect().left; let m = 0; for (let i = 1; i < n; i++) if (Math.abs(xDe(i) - x) < Math.abs(xDe(m) - x)) m = i; va(m); };
    g.el.onpointerleave = g.el.onblur = () => { g.tip.classList.remove('si'); sale(); };
    g.el.onkeydown = e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); va(act + (e.key === 'ArrowRight' ? 1 : -1)); } };
  }
  function lineas(id, o) {
    const g = base(id, o); if (!g) return; guarda(id, lineas, o);
    const todos = [].concat(...o.series.map(s => s.v.filter(v => v != null))).concat(o.ref ? [o.ref.v] : []); let lo = Math.min(...todos), hi = Math.max(...todos);
    if (o.desde != null) { lo = Math.min(o.desde, lo); hi = Math.max(o.desde, hi); } else { const a = (hi - lo) * .25 || Math.abs(hi) * .1 || 1; lo -= a; hi += a; }
    const Y = ejes(g, lo, hi + (hi - lo) * .06), n = o.et.length, X = i => n < 2 ? (g.l + g.w - g.r) / 2 : g.l + 8 + i / (n - 1) * (g.w - g.r - g.l - 16);
    let ult = -99; o.et.forEach((t, i) => { if (!t || X(i) - ult < 44) return; ult = X(i); nodo(g.svg, 'text', { x: X(i), y: g.h - 7, 'text-anchor': 'middle' }, t); });
    if (o.ref) { nodo(g.svg, 'line', { x1: g.l, x2: g.w - g.r, y1: Y(o.ref.v), y2: Y(o.ref.v), stroke: V.b, 'stroke-width': 1.5 }); nodo(g.svg, 'text', { class: 'f', x: g.l + 8, y: Y(o.ref.v) + 18 }, o.ref.t); }
    o.series.forEach(s => {
      const pts = s.v.map((v, i) => v == null ? null : [X(i), Y(v)]), vis = pts.filter(Boolean); if (!vis.length) return;
      if (!s.puntos) {
        const d = vis.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('');
        if (s.area) nodo(g.svg, 'path', { d: d + 'L' + vis[vis.length - 1][0] + ' ' + Y(o.desde != null ? o.desde : lo) + 'L' + vis[0][0] + ' ' + Y(o.desde != null ? o.desde : lo) + 'Z', fill: s.c, opacity: .1 });
        nodo(g.svg, 'path', { d, fill: 'none', stroke: s.c, 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
      }
      (s.puntos || s.marcas ? vis : vis.slice(-1)).forEach(p => nodo(g.svg, 'circle', { cx: p[0], cy: p[1], r: 5, fill: s.c, stroke: 'var(--kv-caja)', 'stroke-width': 2 }));
      if (s.fin) { const p = vis[vis.length - 1]; nodo(g.svg, 'text', { class: 'f', x: Math.min(p[0], g.w - g.r), y: p[1] - 12, 'text-anchor': 'end' }, money(s.v.filter(v => v != null).pop())); }
    });
    const cruz = nodo(g.svg, 'line', { y1: g.t, y2: g.h - g.b, stroke: 'var(--kv-gris)', 'stroke-width': 1, opacity: 0 });
    raton(g, n, X, i => { cruz.setAttribute('x1', X(i)); cruz.setAttribute('x2', X(i)); cruz.setAttribute('opacity', .8); globo(g, X(i), o.largo[i], o.series.filter(s => s.v[i] != null).map(s => ({ c: s.c, v: money(s.v[i]), n: s.n }))); }, () => cruz.setAttribute('opacity', 0));
  }
  function columnas(id, o) {
    const g = base(id, o); if (!g) return; guarda(id, columnas, o);
    const n = o.et.length, tot = o.et.map((_, i) => o.series.reduce((s, q) => s + q.v[i], 0)), Y = ejes(g, 0, Math.max(...tot) * 1.04), ancho = (g.w - g.l - g.r) / n, bw = Math.min(24, ancho * .6), X = i => g.l + ancho * (i + .5), G = [];
    o.et.forEach((t, i) => {
      const gr = nodo(g.svg, 'g', {}); G.push(gr); let ac = 0;
      o.series.forEach((s, k) => { const y1 = Y(ac), y2 = Y(ac + s.v[i]), ult = k === o.series.length - 1, hh = Math.max(0, y1 - y2 - (k ? 2 : 0)), x = X(i) - bw / 2, r = ult ? Math.min(4, hh / 2) : 0; ac += s.v[i]; if (hh < .5) return;
        nodo(gr, 'path', { d: 'M' + x + ' ' + (y2 + hh) + 'V' + (y2 + r) + 'Q' + x + ' ' + y2 + ' ' + (x + r) + ' ' + y2 + 'H' + (x + bw - r) + 'Q' + (x + bw) + ' ' + y2 + ' ' + (x + bw) + ' ' + (y2 + r) + 'V' + (y2 + hh) + 'Z', fill: s.c }); });
      nodo(g.svg, 'text', { x: X(i), y: g.h - 7, 'text-anchor': 'middle' }, t);
    });
    raton(g, n, X, i => { G.forEach((q, k) => q.setAttribute('opacity', k === i ? 1 : .45)); globo(g, X(i), o.et[i], o.series.slice().reverse().map(s => ({ c: s.c, v: money(s.v[i]), n: s.n }))); }, () => G.forEach(q => q.setAttribute('opacity', 1)));
  }
  function guarda(id, f, o) { graficas = graficas.filter(q => q[0] !== id); graficas.push([id, f, o]); }
  let t = 0;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => graficas.slice().forEach(q => q[1](q[0], q[2])), 120); });
  // Las flechas, el espacio y los números mueven las pantallas del Dashboard: dentro de una ventana, solo Escape sale.
  let oye = false;
  M.pinta = function (info) {
    graficas = [];
    if (!oye) { oye = true; document.getElementById('kpiBody').addEventListener('keydown', e => { if (e.key !== 'Escape') e.stopPropagation(); }); }
    return '<div class="kv" style="--ac:' + info.kv + '">' + info.html + '</div>';
  };
  window.MEDIDORES = M;
})();
