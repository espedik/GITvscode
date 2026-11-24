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
  // Lo que llevabas en cada cierre (los de Finanzas · Indicadores), lo de hoy y a dónde llegas si sigues juntando al ritmo
  // de tus últimos meses. La cuenta es del maestro (CIFRAS.ritmoMaestria): cada cierre nuevo la mueve.
  M.maestria = function (F) {
    const R = contraPlan(F), x = R.x, fm = fondoMaestria(), T = C().ritmoMaestria(F, R.real), L = T.meses, cor = cortesSalidaDash().map(c => ({ mes: c.mes, pide: c.pide, t: c.t }));
    const sal = cor[cor.length - 1], fin = L[L.length - 1], falta = sal ? sal.pide - fin.proy : 0, pctR = Math.round(T.ritmo * 100), ok = falta <= 0;
    const dec = String(C().n('decisionMaestria') || ''), diasDec = Math.max(0, Math.ceil((new Date(dec + 'T12:00:00') - new Date()) / 864e5)), mayo = +C().n('mayoParaSalida') || 0;
    const queda = L.filter(m => m.tipo === 'proy'), este = L.filter(m => m.tipo === 'hoy')[0] || fin, gastos = queda.reduce((s, m) => s + m.fijo, 0);
    const alMes = queda.length ? Math.max(0, (sal.pide - este.proy - gastos) / queda.length) : 0, D = C().rutinasDesglose(), extra = +C().n('extraSalida') || 0, c28 = C().cortesSalida(C().proyectar({ desfase: 12 }), { desfase: 12 }).salida;

    // Lo que cuesta irte, mes por mes.
    const corta = t => { const a = String(t).replace(/ \(.*$/, '').split(':')[0], q = a.split(',')[0]; return / /.test(q) ? q : a; }, costos = (C().SALIDA && C().SALIDA.costos) || [], v = c => C().costoSalida(c);
    const porMes = [...new Set(costos.map(c => c.mes))].sort().map(m => { const q = costos.filter(c => c.mes === m); return { m, n: q.map(c => corta(c.txt)).join(', '), v: q.reduce((s, c) => s + v(c), 0) }; });
    const listaCostos = porMes.map(q => '<div class="km-cos"><span>' + mesTxt(q.m) + '</span><b>' + esc(q.n) + '</b><strong>' + money(q.v) + '</strong></div>').join('');

    // Los consejos, de lo que toca ya a lo que más mueve; cambian con tu ritmo.
    const pasos = [], bt = boton('Registrar una compra', 'abrirKpi(\'invertido\')') + boton('Qué invertir hoy', 'cerrarKpi();abrirGBM()', 1);
    const sigue = R.sig ? (R.sig.k === R.k ? 'Hoy mandas <b>' + money(R.sig.v) + '</b> a GBM' : 'El <b>' + diaTxt(R.sig.k) + '</b> mandas <b>' + money(R.sig.v) + '</b> a GBM') + ' (' + R.sig.t.charAt(0).toLowerCase() + R.sig.t.slice(1) + ').' : '';
    if (T.ritmo < .995) pasos.push(['Cumple tu plan completo', '+' + money(Math.max(0, T.finPlan - fin.proy)) + ' en ' + mesTxt(fin.mes).slice(0, 3), (R.dif < -1 ? 'Traes <b>' + money(-R.dif) + '</b> atrasados. ' : '') + sigue, bt]);
    else pasos.push(['Sigue así', 'vas bien', 'Juntas lo que tu plan pide o más. ' + sigue, bt]);
    if (!ok && extra > 0) pasos.push(['Consigue un ingreso nuevo', '+' + money(extra) + ' al mes', 'El aumento por escrito o un freelance de pruebas. Con tu plan completo, cierra los <b>' + money(Math.max(0, sal.pide - T.finPlan)) + '</b> que el plan solo no alcanza.']);
    if (!ok && D.ahorro > 0) pasos.push(['Recorta tus rutinas', '+' + money(D.ahorro * queda.length) + ' en ' + mesTxt(fin.mes).slice(0, 3), '<b>' + money(D.ahorro) + '</b> al mes en piel, cabello y suplementos, de aquí a agosto. De eso, ' + money(D.medico) + ' los decide tu dermatólogo.']);
    pasos.push(['Decide el ' + diaTxt(dec), plural(diasDec, 'día', 'días'), 'Con la admisión y <b>' + money(mayo) + '</b> te vas. Con menos, irte en septiembre de 2028 te deja ' + (c28.falta > 0 ? 'con ' + money(c28.falta) + ' por juntar.' : '<b>' + money(-c28.falta) + '</b> de sobra.')]);

    const celda = (m, n, cls) => '<td' + (cls ? ' class="' + cls + '"' : '') + '>' + (n == null ? '' : money(n)) + '</td>', filaT = (t, f, cls) => '<tr><td>' + t + '</td>' + L.map(m => celda(m, f(m), cls && cls(m))).join('') + '</tr>';
    const tablaM = '<div class="km-tw"><table class="kv-t km-t"><thead><tr><th></th>' + L.map(m => '<th>' + mesTxt(m.mes).slice(0, 3) + (m.tipo === 'cierre' ? '<i>cierre</i>' : m.tipo === 'hoy' ? '<i>hoy</i>' : '') + '</th>').join('') + '</tr></thead><tbody>' +
      filaT('Llevabas o llevas', m => m.real) + filaT('A tu ritmo', m => m.tipo === 'cierre' ? null : m.proy) + filaT('Tu plan', m => m.plan) + filaT('Se necesita', m => m.nec) +
      '<tr class="tot"><td>Contra lo que se necesita</td>' + L.map(m => { const a = m.tipo === 'cierre' ? m.real : m.proy; return '<td>' + (m.nec == null ? '' : '<em class="' + (a >= m.nec ? 'ok' : 'mal') + '">' + signo(a - m.nec) + '</em>') + '</td>'; }).join('') + '</tr></tbody></table></div>';
    const med1 = T.medidos.map(q => mesTxt(q.mes).slice(0, 3) + ' ' + Math.round(q.ritmo * 100) + '%').join(', ');

    return { kv: 'var(--cy)', titulo: 'Fondo Maestría', sub: 'Tu dinero para irte a Esslingen en septiembre de 2027.', html:
      '<div class="km"><div class="km-a"><section class="kv-c km-hero"><span>A tu ritmo, en ' + MESL[+fin.mes.slice(5) - 1] + ' tendrías</span><div><strong>' + money(fin.proy) + '</strong><em>de ' + money(sal.pide) + '</em></div>' + med(pct(fin.proy, sal.pide)) +
          '<p class="' + (ok ? 'si' : 'no') + '">' + (ok ? 'Sí llegas: te sobran ' + money(-falta) + '.' : 'Todavía no llegas: te faltan ' + money(falta) + '.') + '</p></section>' +
        '<div class="kv-tiles">' + [['Llevas hoy', money(fm.total), money(R.real) + ' ya cuentan; el depósito, ' + money(x.deposito) + ', regresa al dejar el depa'],
          ['Tu plan pedía hoy', money(R.plan), R.dif < -1 ? '<em class="mal">Vas ' + money(-R.dif) + ' abajo</em>' : '<em class="ok">Vas ' + money(R.dif) + ' arriba</em>'],
          ['Tu ritmo', pctR + '%', 'de lo que tocaba juntar' + (med1 ? ': ' + med1 + (T.tope ? '. La proyección usa ' + pctR + '% como máximo' : '') : '. Se mide con tu primer cierre')],
          ['Necesitas juntar', money(alMes), 'al mes, desde ' + (queda[0] ? MESL[+queda[0].mes.slice(5) - 1] : 'ya') + '. Para ir en tu plan, cierra ' + MESL[+este.mes.slice(5) - 1] + ' con ' + money(este.plan)]]
          .map(q => '<div class="kv-tile"><span>' + q[0] + '</span><b>' + q[1] + '</b><i>' + q[2] + '</i></div>').join('') + '</div></div>' +
      '<div class="km-b"><section class="kv-c km-g"><div class="km-cab"><div><h3>Tu camino a la salida</h3><p>Tus cierres de Finanzas y lo que tendrías cada mes si sigues igual. Cada cierre mueve la línea.</p></div>' +
          leyenda([['Lo que llevas', 'var(--text)', 'l'], ['A tu ritmo', 'var(--ac)', 'l'], ['Tu plan completo', 'var(--kv-gris)', 'd'], ['Lo que se necesita', 'var(--kv-2)', 'd']]) + '</div>' + grafica('salida') + '</section>' +
        '<section class="kv-c km-nec"><div class="km-tot"><h3>Lo que cuesta irte</h3><strong>' + money(porMes.reduce((s, q) => s + q.v, 0)) + '</strong></div><div class="km-lista">' + listaCostos + '</div></section></div>' +
      '<div class="km-pasos" style="--n:' + pasos.length + '">' + pasos.map((q, i) => '<section class="kv-c km-paso' + (i ? '' : ' uno') + '"><b class="n">' + (i + 1) + '</b><div><div class="t"><h3>' + q[0] + '</h3><strong>' + q[1] + '</strong></div><p>' + q[2] + '</p>' + (q[3] ? '<div class="ac">' + q[3] + '</div>' : '') + '</div></section>').join('') + '</div>' +
      plega('mae-meses', 'Mes a mes, en números', plural(L.filter(m => m.tipo === 'cierre').length, 'cierre', 'cierres') + ' de Finanzas y ' + queda.length + ' meses por venir', tablaM, 's12') + '</div>',
      listo: () => trayecto('salida', { L, cor, fin: sal, hoy: diaTxt(R.k) }) };
  };
  // La gráfica de la maestría: un punto y su cifra por mes —lo que llevabas, lo de hoy y lo que tendrías—, el plan y lo que
  // se necesita punteados, y las cuatro fechas con lo que piden.
  function trayecto(id, o) {
    const g = base(id, { aria: 'Lo que llevabas en cada cierre, lo que llevas hoy y lo que tendrías cada mes hasta la salida, contra tu plan y lo que se necesita' }); if (!g) return; guarda(id, trayecto, o);
    const L = o.L, n = L.length, chico = g.w < 760; g.l = chico ? 52 : 64; g.r = chico ? 16 : 26; g.t = 30; g.b = 44;
    const alto = Math.max(...L.map(m => Math.max(m.real || 0, m.proy || 0, m.plan || 0, m.nec || 0)), ...o.cor.map(c => c.pide)), Y = ejes(g, 0, alto * 1.05), X = i => g.l + 26 + i / (n - 1) * (g.w - g.r - g.l - 52), y0 = Y(0);
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
      if (!chico && c.pide > L[i].proy && !junto) { const ult = i === n - 1; txt(x + (ult ? -9 : 9), (y + Y(L[i].proy)) / 2 + (der ? 26 : 4), 'faltan ' + money(c.pide - L[i].proy), { 'text-anchor': ult ? 'end' : 'start', class: 'km-x o' }); }
      if (!chico) { const bajo = L[i].proy >= c.pide, fin = i === n - 1, a = { 'text-anchor': (der || bajo) && !fin ? 'start' : 'end' }, tx = x + (a['text-anchor'] === 'start' ? 13 : -13), dy = bajo ? 17 : junto ? -22 : 0; txt(tx, y - 3 + dy, money(c.pide), Object.assign({ class: 'km-x f' }, a)); txt(tx, y + 14 + dy, c.t, a); }
    });
    // Un punto y su cifra por mes.
    L.forEach((m, i) => {
      const x = X(i), real = m.tipo !== 'proy', val = real ? m.real : m.proy; if (val == null) return; const y = Y(val);
      nodo(g.svg, 'circle', { cx: x, cy: y, r: m.tipo === 'hoy' ? 7 : 5, fill: real ? 'var(--text)' : 'var(--ac)', stroke: 'var(--kv-caja)', 'stroke-width': 2 });
      if (chico && m.tipo !== 'hoy' && i !== n - 1) return;
      const abajo = !real && y0 - y > 46 && !(m.proy >= m.plan); txt(x, abajo ? y + 22 : y - 12, money(val), { class: 'km-x f' + (real ? '' : ' p') });
    });
    L.forEach((m, i) => {
      if (m.vendio > 0 && !chico) txt(X(i) + 4, Y(m.real) - 34, 'vendiste Bitcoin: ' + money(m.vendio), { 'text-anchor': 'start' });
      if (chico && i % 2 && m.tipo !== 'hoy' && i !== n - 1) return;
      txt(X(i), g.h - 24, MES[+m.mes.slice(5) - 1] + (m.mes.slice(5) === '01' ? ' ' + m.mes.slice(0, 4) : ''), { class: 'km-x' + (m.tipo === 'hoy' ? ' f' : '') });
      if (m.tipo !== 'proy') txt(X(i), g.h - 8, m.tipo === 'hoy' ? 'hoy' : 'cierre', { class: 'km-x c' });
    });
    const cruz = nodo(g.svg, 'line', { y1: g.t, y2: y0, stroke: 'var(--kv-gris)', 'stroke-width': 1, opacity: 0 });
    raton(g, n, X, i => {
      const m = L[i]; cruz.setAttribute('x1', X(i)); cruz.setAttribute('x2', X(i)); cruz.setAttribute('opacity', .8);
      globo(g, X(i), mesTxt(m.mes) + (m.tipo === 'cierre' ? ', cierre' : m.tipo === 'hoy' ? ', hoy' : ''), [m.real != null && { c: 'var(--text)', v: money(m.real), n: m.tipo === 'hoy' ? 'llevas' : 'llevabas' }, m.tipo !== 'cierre' && { c: 'var(--ac)', v: money(m.proy), n: m.tipo === 'hoy' ? 'al cerrar, a tu ritmo' : 'a tu ritmo' },
        m.plan != null && { c: 'var(--kv-gris)', v: money(m.plan), n: 'tu plan' }, m.nec != null && { c: 'var(--kv-2)', v: money(m.nec), n: 'se necesita' }].filter(Boolean));
    }, () => cruz.setAttribute('opacity', 0));
  }

  // ══ Patrimonio ══
  M.patrimonio = function (F) {
    const x = dinero(F), neto = patrimonioNeto(), liquido = patrimonioLiquido(), P = C().PROYECCION.meses, ym = hoyLocal().slice(0, 7);
    const H = (F.indicatorHistory || []).filter(h => h.month < ym && isFinite(h.netWorth)).sort((a, b) => a.month < b.month ? -1 : 1), u = H[H.length - 1];
    const val = L => (L || []).reduce((s, i) => s + (+i.value || +i.invested || 0), 0), act = (h, f) => (h.activos || []).filter(f).reduce((s, a) => s + (+a.value || 0), 0);
    let cambios = [];
    if (u) {
      cambios = [['Deudas', u.debts.reduce((s, d) => s + (+d.balance || 0), 0) - x.debe], ['Bitcoin', x.btcV - (+u.btcValue || 0)], ['Otras inversiones', x.otrasV + x.deposito - val(u.investments)],
        ['CETES', x.ef - (+u.emergencyFund || 0)], ['Cuenta y efectivo', x.liqV - act(u, a => a.type === 'liquido')], ['Bienes', x.bienesV - act(u, a => a.type !== 'liquido')]];
      const resto = (neto - u.netWorth) - cambios.reduce((s, c) => s + c[1], 0);
      if (Math.abs(resto) >= 1) cambios.push(['Otros', resto]);
      cambios = cambios.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
    }
    const dif = u ? neto - u.netWorth : 0, mx = Math.max(1, ...cambios.map(c => Math.abs(c[1]))), mejor = cambios.filter(c => c[1] >= 1)[0], peor = cambios.filter(c => c[1] <= -1)[0];
    const dicho = x.liq.map(a => a.fecha).filter(Boolean).sort()[0];
    const tiene = x.ef + x.otrasV + x.deposito + x.btcV + x.liqV, compra = x.bienes.filter(a => /precio de compra/i.test(a.notes || '')).sort((a, b) => b.value - a.value)[0];
    const camino = P.filter(m => m.mes <= '2031-12'), cruza = P.filter(m => m.liquido >= 1e6)[0];
    const filas = L => lista(L.filter(q => Math.abs(q[1]) >= 1).sort((a, b) => b[1] - a[1]).map(q => fila(q[0], money(q[1]), q[2] || '', q[3] || '')).join(''));
    return { kv: 'var(--g)', titulo: 'Patrimonio hacia $1M', sub: 'Todo lo tuyo menos lo que debes, y qué lo está moviendo.', html:
      '<div class="kv-fila">' + hero(money(neto), '', u ? gana(dif) + ' desde que cerró ' + mesTxt(u.month) + '.' : 'Todavía no hay un mes cerrado para comparar.', null) +
      tiles([['Tu dinero, sin contar cosas', money(liquido), 'lo que cuenta para el millón de tu plan: dinero menos deudas, sin carro ni aparatos'],
        ['Tienes en dinero', money(tiene), 'inversiones, CETES, Bitcoin, depósito, cuenta y efectivo'], ['Tienes en cosas', money(x.bienesV), plural(x.bienes.length, 'bien registrado', 'bienes registrados') + ' en Finanzas'],
        ['Tu plan cruza el millón', cruza ? mesTxt(cruza.mes) : '—', 'si sigues la proyección; es una hipótesis']]) + '</div>' +
      hoy('Este mes', u ? (dif >= 0 ? 'Subiste <b>' + money(dif) + '</b>.' : 'Bajaste <b>' + money(-dif) + '</b>.') + (mejor ? ' Lo que más ayudó: <b>' + (mejor[0] === 'Deudas' ? 'bajar tus deudas' : mejor[0] === 'Bitcoin' ? 'tu Bitcoin' : mejor[0].toLowerCase()) + '</b>, ' + signo(mejor[1]) + '.' : '') : 'Se compara cuando cierre el mes.',
        peor ? 'Lo que más restó: ' + (peor[0] === 'Deudas' ? 'tus deudas, que crecieron' : peor[0] === 'Bitcoin' ? 'tu Bitcoin' : peor[0].toLowerCase()) + ', ' + signo(peor[1]) + '.' : 'Nada restó este mes.', boton('Ver mis deudas', 'abrirKpi(\'deudatotal\')', 1) + boton('Registrar una compra', 'abrirKpi(\'invertido\')')) +
      '<div class="kv-fila crece"><section class="kv-c s4"><h3>Mes a mes</h3><p>Tu patrimonio al cierre de cada mes.</p>' + grafica('mesames') + '</section>' +
      caja('s4', u ? 'Qué cambió desde ' + MES[+u.month.slice(5, 7) - 1] : 'Qué cambió', 'A la derecha suma, a la izquierda resta.', cambios.length ? cambios.map(c => '<div class="kv-dv"><span>' + c[0] + '</span><span class="z"><i style="' + (c[1] >= 0 ? 'left:50%' : 'right:50%') + ';width:' + (Math.abs(c[1]) < 1 ? 0 : Math.max(1.5, Math.abs(c[1]) / mx * 50)) + '%;background:' + (c[1] >= 0 ? 'var(--g)' : 'var(--r)') + '"></i></span><strong>' + (Math.abs(c[1]) < 1 ? 'igual' : signo(c[1])) + '</strong></div>').join('') : '<p class="kv-p">Se compara cuando cierre un mes.</p>', dicho ? 'Tu cuenta y tu efectivo son lo que dijiste el ' + diaTxt(dicho) + '. Si ya cambiaron, corrígelos en Finanzas.' : '') +
      '<section class="kv-c s4"><h3>Camino al millón</h3><p>Tu dinero sin contar cosas, según la proyección.</p>' + grafica('millon') + '</section></div>' +
      '<div class="kv-fila"><section class="kv-c s12"><div class="kv-ec"><div><span>Tienes en dinero</span><b>' + money(tiene) + '</b></div><u>+</u><div><span>Tienes en cosas</span><b>' + money(x.bienesV) + '</b></div><u>−</u><div><span>Debes</span><b>' + money(x.debe) + '</b></div><u>=</u><div><span>Tu patrimonio</span><b>' + money(neto) + '</b></div></div>' +
        (compra ? '<p class="kv-p" style="margin-top:10px">' + esc(compra.name) + ' está a precio de compra (' + money(+compra.value) + '). Hoy se vendería en menos, así que tu patrimonio real es menor.</p>' : '') + '</section>' +
      plega('pt-dinero', 'Tu dinero', money(tiene), filas([['Depósito de la renta', x.deposito], ['CETES', x.ef], ['Bitcoin', x.btcV]].concat(x.otras.map(i => [esc(i.name), +i.value || +i.invested || 0]), x.liq.map(a => [esc(a.name), +a.value || 0, a.fecha ? 'dicho el ' + diaTxt(a.fecha) : '']))), 's4') +
      plega('pt-cosas', 'Tus cosas', money(x.bienesV), filas(x.bienes.map(a => [esc(a.name), +a.value || 0, esc(a.notes || '')])), 's4') +
      plega('pt-debes', 'Lo que debes', money(x.debe), filas((F.debts || []).filter(d => +d.balance > 0).map(d => [esc(d.name), +d.balance, d.rate > 0 && tasaQueCorre(d) > 0 ? d.rate + '% al año' : 'sin intereses'])), 's4') + '</div>',
      listo: () => {
        lineas('mesames', { et: H.map(h => MES[+h.month.slice(5, 7) - 1]).concat('hoy'), largo: H.map(h => 'Cierre de ' + mesTxt(h.month)).concat('Hoy'), aria: 'Patrimonio mes a mes', series: [{ n: 'Patrimonio', c: V.a, v: H.map(h => h.netWorth).concat(neto), fin: 1, marcas: 1 }] });
        lineas('millon', { et: camino.map(m => m.mes.slice(5) === '12' ? m.mes.slice(0, 4) : ''), largo: camino.map(m => mesTxt(m.mes)), desde: 0, ref: { v: 1e6, t: 'El millón' }, aria: 'Proyección del patrimonio líquido hasta 2031', series: [{ n: 'Tu dinero', c: V.a, v: camino.map(m => m.liquido), area: 1 }] });
      } };
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
  function caminoDeuda(F, o) {
    const ds = (F.debts || []).filter(d => +d.balance > 0 && +d.min > 0), peor = ds.filter(d => d.type !== 'credit_card').sort((a, b) => (b.rate || 0) - (a.rate || 0))[0];
    const T = ds.map(d => C().prestamoTabla(d, d === peor ? o : {})), ym0 = hoyLocal().slice(0, 7), n = Math.min(240, Math.max(0, ...T.map(t => t.length))), out = [ds.reduce((s, d) => s + +d.balance, 0) - (o && o.extra && peor ? Math.min(o.extra, +peor.balance) : 0)];
    // Al cierre de cada mes, el saldo de cada deuda tras su último pago de ese mes: no todas pagan el mismo día.
    const alCierre = (d, t, ym) => { let s = Math.max(0, +d.balance - (d === peor ? +o.extra || 0 : 0)); for (const r of t) { if (C().fechaLocal(r.fecha).slice(0, 7) > ym) break; s = r.saldo; } return s; };
    for (let i = 1; i <= n; i++) out.push(ds.reduce((s, d, k) => s + alCierre(d, T[k], mas(ym0, i)), 0));
    return { v: out, et: out.map((_, i) => mas(ym0, i)), peor };
  }
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
