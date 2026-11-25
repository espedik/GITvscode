/* Las ventanas de los seis medidores del Plan Maestro.

   Adán, 23-nov-2026: "estos indicadores son los más importantes… quiero que mejores la presentación de todos, el
   contenido y visualmente cómo se ve, debe ser claro y moderno… debe ser contenido relevante para mi día a día".
   Todas con el mismo orden: la cifra y lo que significa, cuatro datos, lo de hoy con su botón, una gráfica, y el detalle
   y los formularios. Ninguna cuenta vive aquí: salen del maestro (CIFRAS) y de Finanzas, con las funciones del Dashboard.
   kpiDetalle (dashboard.html) devuelve MEDIDORES[id](F); `listo` dibuja las gráficas cuando la ventana ya tiene tamaño. */
(function () {
  'use strict';
  const M = {}, abiertos = {}, sim = { extra: 0, mes: 0 };
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

  // ── Lo que comparten: lo invertido de verdad y lo que el plan aparta cada día, con su destino ──
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
  // Cada envío del mes: el día, de dónde sale, cuánto y a dónde va (`a`: colchon, auto o gbm).
  function envios(ym) {
    const G = C().gbmMes(ym), out = [];
    G.semanas.forEach(s => s.todo.forEach(x => out.push({ k: ym + '-' + String(x.dia).padStart(2, '0'), t: x.t, v: x.mxn, a: x.destino })));
    return out.sort((a, b) => a.k < b.k ? -1 : 1);
  }
  function contraPlan(F) {
    const x = dinero(F), k = hoyLocal(), ym = k.slice(0, 7), E = envios(ym);
    return { x, k, ym, E, inv: E.filter(e => e.a === 'gbm' && e.k >= C().PROYECTO.planDesde), sig: E.filter(e => e.k >= k).concat(envios(mas(ym, 1)))[0] };
  }
  const A_DONDE = { colchon: 'al colchón', auto: 'al BYD', gbm: 'a invertir' };

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
  function ruta(hay, G, meta, meses, plan) {
    const dias = G.minimo > 0 ? Math.floor(hay / (G.minimo / 30)) : 0;
    const mes = i => {
      const cubre = Math.max(0, Math.min(30, dias - i * 30)), p = pct(hay - i * G.minimo, G.minimo), falta = (i === meses - 1 ? meta : G.minimo * (i + 1)) - hay;
      return '<div class="kf-mes' + (falta <= 0 ? ' listo' : '') + '"><div class="kf-mt"><b>Mes ' + (i + 1) + '</b><span>' + (falta <= 0 ? 'Cubierto' : cubre + ' de 30 días') + '</span></div><div class="kf-bat"><i style="width:' + (falta <= 0 ? 100 : p) + '%"></i></div>' +
        '<em>' + (falta <= 0 ? 'Ya lo tienes' : 'Te faltan ' + money(falta) + ' para llegar aquí') + '</em></div>';
    };
    return '<h3>Si te quedas sin trabajo, tu fondo te alcanza para</h3><strong class="kf-tit">' + plural(dias, 'día', 'días') + '</strong>' +
      '<p>Vivir un mes con lo indispensable cuesta <b>' + money(G.minimo) + '</b> y tienes <b>' + money(hay) + '</b> entre cuenta, efectivo y CETES. Tu meta es llenar ' + (meses === 1 ? 'la barra.' : 'las ' + meses + ' barras.') + '</p>' + (plan ? '<p class="kf-plan">' + plan + '</p>' : '') +
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

    // Lo que el plan mete al fondo: el paso 1 es el colchón (PROYECTO.colchon); después, todo va al BYD.
    const PA = C().planAhorro(), sc = PA.envios.filter(e => e.fecha >= k && e.colchon >= 1)[0], tope = C().PROYECTO.colchon;
    const planTxt = PA.lleno && PA.lleno >= k ? 'Tu plan lo lleva a <b>' + money(tope) + '</b> el <b>' + C().v('colchonFecha') + '</b>' + (sc ? ': ' + (sc.fecha === k ? 'hoy' : 'el ' + diaTxt(sc.fecha)) + ' le mandas <b>' + money(sc.colchon) + '</b>.' : '.') + ' Después, todo va al BYD.' : hay >= tope ? 'Tu plan ya lo tiene en <b>' + money(tope) + '</b> o más: lo que apartas va ' + (C().pasoAhorro(k) === 'gbm' ? 'a invertir' : 'al BYD') + '.' : '';
    const FL = C().fondoLista(F), ed = _efEdit ? FL.movs.find(m => m.id === _efEdit) : null;
    const movs = FL.movs.map(m => {
      const ret = m.tipo === 'retiro';
      return '<div class="ti-fila' + (_efEdit === m.id ? ' edita' : '') + '"><span class="ti-f">' + tiFecha(m.date) + '</span><span class="ti-n"><b>' + (ret ? 'Retiro' : 'Aportación') + '</b>' + (m.nota ? '<i>' + esc(m.nota) + '</i>' : '') + '</span>' +
        '<span class="ti-m"><em class="' + (ret ? 'mal' : 'ok') + '">' + (ret ? '−' : '+') + money(+m.amount || 0) + '</em></span>' +
        (editable ? '<span class="ti-acc"><button type="button" class="ce-btn sec" onclick="efEditar(\'' + m.id + '\')">Editar</button><button type="button" class="ce-btn sec" onclick="efBorrar(\'' + m.id + '\')">Borrar</button></span>' : '') + '</div>';
    }).join('');

    return { kv: 'var(--w)', titulo: 'Fondo de emergencia', sub: 'Tu cuenta, tu efectivo y tus CETES: para cuánto te alcanzan si te quedas sin trabajo, y qué falta.', html:
      '<div class="kf"><div class="kf-a"><section class="kv-c kf-hero"><div class="kf-an" role="img" aria-label="' + Math.round(p) + '% de tu meta">' + anillo(p) + '<div><strong>' + money(hay) + '</strong><span>de ' + money(meta) + '</span></div></div>' +
        '<div class="kf-pc"><strong>' + Math.round(p) + '%</strong><span>' + (falta > 0 ? 'Te faltan <b>' + money(falta) + '</b> para cubrir ' + plural(meses, 'mes', 'meses') + ' de lo indispensable.' : 'Meta completa. Lo que apartes sigue tu plan: el BYD y, después, a invertir.') + '</span></div></section>' +
      '<section class="kv-c kf-ruta">' + ruta(hay, G, meta, meses, planTxt) + '</section></div>' +
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
    const nombre = MESL[+m.mes.slice(5) - 1] + ' ' + m.mes.slice(0, 4), proy = m.tipo === 'proy', estado = m.tipo === 'cierre' ? 'cierre' : m.tipo === 'hoy' ? 'hasta hoy' : 'lo que tendrías', crece = proy ? m.queda : m.crecio;
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
    // A dónde va lo que te queda (solo lo que falta): el colchón, el BYD, la bolsa y cripto; y lo que rinde lo invertido.
    const dep = proy && i > 0 && L[i - 1].activos ? Math.max(0, L[i - 1].activos.dep - m.activos.dep) : 0;
    const va = proy ? '<h4>A dónde va<strong>' + money(m.queda + dep) + '</strong></h4>' + [['Al colchón', m.va.aColchon, 'var(--w)'], ['Al BYD, a capital', m.va.aAuto, V.b], ['A la bolsa', m.va.aBolsa, V.a], ['A cripto', m.va.aCripto, V.c]].filter(q => q[1] >= 1).map(q => renglon(q[0], q[1], m.queda + dep, q[2])).join('') +
      (dep >= 1 ? '<p class="kv-p">Incluye ' + money(dep) + ' del depósito de la renta.</p>' : '') + (m.va.rinde >= 1 ? '<div class="km-sub"><span>Además, lo que rinden tus inversiones</span><strong><em class="ok">+' + money(m.va.rinde) + '</em></strong></div>' : '') : '';
    const ant = i > 0 ? L[i - 1].activos : null, total = proy ? m.proy : m.real;
    const act = m.activos ? ACT_M.map(q => { const v = m.activos[q[0]], d = ant && crece != null ? v - ant[q[0]] : 0; return Math.abs(v) < 1 && Math.abs(d) < 1 ? '' : '<div class="km-li"><b>' + q[1] + (Math.abs(d) >= 1 ? ' <em class="' + (d >= 0 ? 'ok' : 'mal') + '">' + signo(d) + '</em>' : '') + '</b><strong>' + money(v) + '</strong>' + barra(Math.max(0, v), total, q[2]) + '</div>'; }).join('') : '<p class="kv-p">Sin cierre guardado de ese mes.</p>';
    const debe = m.auto == null ? '' : '<div class="km-sub"><span>Debes del BYD</span><strong>' + (m.auto < 1 ? '<em class="ok">nada</em>' : money(m.auto)) + '</strong></div>';
    const aviso = !proy && crece != null && m.queda - crece > 500 ? '<div class="km-av">Te quedaban ' + money(m.queda) + ' y tu dinero ' + (crece >= 0 ? 'creció ' + money(crece) : 'bajó ' + money(-crece)) + ': <b>' + money(m.queda - crece) + '</b> sin anotar.</div>' : '';
    return cab + '<div class="km-dg' + (proy ? ' cuatro' : '') + '"><section><h4>Entra<strong>' + money(m.entra) + '</strong></h4>' + ent + '</section><section class="dos"><h4>Sale en gastos<strong>' + money(m.sale) + '</strong></h4><div class="km-d2">' + sal + '</section>' + (proy ? '<section>' + va + '</section>' : '') +
      '<section><h4>' + (proy ? 'Tendrías' : 'Tienes en activos') + '<strong>' + money(total) + '</strong></h4>' + act + debe + aviso + '</section></div>';
  }
  function pintaMae() {
    const d = document.getElementById('kmDet'); if (!d) return; d.innerHTML = desgloseMae(); d.classList.toggle('abre', mae.abre);
    document.querySelectorAll('.km-f [data-m]').forEach(c => c.classList.toggle('sel', mae.abre && c.dataset.m === mae.mes));
  }
  // «Todo lo que tienes», plegable (Adán, 25-nov-2026: "para que se vea mejor la gráfica, la sección de Todo lo que tienes hazla
  // contraíble"): cerrada, la gráfica toma todo el ancho y se vuelve a dibujar. Empieza cerrada y recuerda, en ese dispositivo,
  // cómo la dejaste.
  const MAE_LADO = 'dash-mae-tienes';
  const maeLado = () => { try { return localStorage.getItem(MAE_LADO) === 'abierto'; } catch (e) { return false; } };
  M.maeLado = function (d) {
    try { localStorage.setItem(MAE_LADO, d.open ? 'abierto' : 'cerrado'); } catch (e) { /* sin almacenamiento: no se recuerda */ }
    requestAnimationFrame(() => graficas.filter(q => q[0] === 'salida').forEach(q => q[1](q[0], q[2])));
  };
  M.mesMae = function (mes) { mae.abre = !(mae.abre && mae.mes === mes && document.activeElement && document.activeElement.closest('.km-f')); mae.mes = mes; pintaMae(); const d = document.getElementById('kmDet'); if (mae.abre && d) d.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
  M.abreMae = function () { mae.abre = !mae.abre; pintaMae(); const b = document.querySelector('.km-dt'); if (b) b.focus({ preventScroll: true }); };
  M.gastoMae = function (k) { mae.gasto = mae.gasto === k ? '' : k; pintaMae(); const b = document.querySelector('.km-li[data-g="' + k + '"]'), q = document.querySelector('.km-pn'); if (b) b.focus({ preventScroll: true }); if (q) q.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
  // El plan 2028, con tu ritmo: el colchón, el BYD y a invertir, hasta agosto de 2028 (CIFRAS.ritmoMaestria).
  M.maestria = function (F) {
    const R = contraPlan(F), x = R.x, fm = fondoMaestria(), real = { real: fm.total }, T = C().ritmoMaestria(F, real), T3 = C().ritmoMaestria(F, { real: fm.total, parte: .75 }), L = T.meses, fin = L[L.length - 1], falta = T.pide - fin.proy, ok = falta <= 0, dif = T.hoy - T.planHoy;
    const P0 = C().PROYECTO, dec = String(P0.maestriaDecision || ''), diasDec = Math.max(0, Math.ceil((new Date(dec + 'T12:00:00') - new Date()) / 864e5)), cor = cortesSalidaDash();
    const queda = L.filter(m => m.tipo === 'proy'), este = L.filter(m => m.tipo === 'hoy')[0] || fin, sinAnotar = este.crecio != null ? Math.max(0, este.queda - este.crecio) : 0, nm = MESL[+este.mes.slice(5) - 1], debe = este.auto || 0;
    const D = C().rutinasDesglose(), salto = queda.filter(m => m.queda > queda[0].queda * 1.2)[0], PA = C().planAhorro(), paso = C().pasoAhorro(R.k), planFin = T.finPlan;

    // Lo que debes tener en la mano al irte: lo que no se gasta o se paga después. Los pagos de la salida no van en este presupuesto.
    const CORTO = { bloqueada: 'Cuenta bloqueada', colegiatura: 'Colegiatura', colchon: 'Colchón de llegada' };
    const costos = ((C().SALIDA && C().SALIDA.costos) || []).filter(c => !c.gasta || c.mes > fin.mes), v = c => C().costoSalida(c);
    const listaCostos = costos.map(c => '<div class="km-cos"><span>' + mesTxt(c.mes) + '</span><b>' + (CORTO[c.id] || esc(c.txt)) + '</b><strong>' + money(v(c)) + '</strong></div>').join('');
    // Todo lo que tienes guardado, pieza por pieza: la bolsa sale aunque esté en cero, para que se vea que falta anotarla.
    const M2 = C().fondoMaestria(F), bolsa = M2.inversiones.filter(i => i.id !== 'i004' && i.tipo !== 'cetes').reduce((s, i) => s + i.v, 0), cetes = M2.ef + M2.inversiones.filter(i => i.id !== 'i004' && i.tipo === 'cetes').reduce((s, i) => s + i.v, 0);
    const piezas = [['Bolsa y fondos', bolsa, V.a, bolsa > 0 ? '' : 'todavía no toca'], ['CETES', cetes, 'var(--w)'], ['Bitcoin', M2.btc, V.b]].concat(M2.liquidos.map((a, i) => [esc(a.n), a.v, i ? V.c : 'var(--ac)']), x.deposito > 0 ? [['Depósito de la renta', x.deposito, V.g, 'regresa en ' + MESL[+mas(P0.rentaHasta, 1).slice(5) - 1]]] : []);
    const listaPiezas = '<div class="kf-bar">' + piezas.filter(q => q[1] > 0).map(q => '<i style="flex:' + Math.max(1, Math.round(q[1])) + ';background:' + q[2] + '"></i>').join('') + '</div>' +
      piezas.map(q => '<div class="km-pz"><i style="background:' + q[2] + '"></i><b>' + q[0] + (q[3] ? ' <u>' + q[3] + '</u>' : '') + '</b><strong>' + money(q[1]) + '</strong></div>').join('');

    // Los consejos, de lo que toca ya a lo que más mueve; cambian con tu ritmo y con el paso del plan.
    const pasos = [], bt = boton('Ver el plan de este mes', 'cerrarKpi();abrirGBM()');
    const A = { colchon: 'a tu colchón', auto: 'al BYD', gbm: 'a invertir' }, sigue = R.sig ? (R.sig.k === R.k ? 'Hoy mandas <b>' + money(R.sig.v) + '</b> ' : 'El <b>' + diaTxt(R.sig.k) + '</b> mandas <b>' + money(R.sig.v) + '</b> ') + A[R.sig.a] + '.' : '';
    if (paso === 'colchon') pasos.push(['Paso 1 de 3: el colchón', R.sig ? money(R.sig.v) : 'sigue', sigue + ' ' + (PA.lleno ? 'Con tu plan se llena el <b>' + C().v('colchonFecha') + '</b>.' : ''), bt]);
    else if (paso === 'auto') pasos.push(['Paso 2 de 3: el BYD', R.sig ? money(R.sig.v) : 'sigue', sigue + ' Debes <b>' + money(debe) + '</b>.', bt]);
    else pasos.push(['Paso 3 de 3: a invertir', R.sig ? money(R.sig.v) : 'sigue', sigue + ' Según tu reparto, el mismo día.', bt]);
    if (sinAnotar > 500) pasos.push(['Anota lo que no aparece', money(sinAnotar), 'En ' + nm + ' te quedaban <b>' + money(este.queda) + '</b> y tu dinero creció <b>' + money(Math.max(0, este.crecio)) + '</b>. Cada peso sin anotar atrasa el BYD.', boton('Editar saldos', 'abrirKpi(\'fondo\');MEDIDORES.editarMano(true)', 1)]);
    else if (D.ahorro > 0) pasos.push(['Recorta tus rutinas', '+' + money(D.ahorro) + ' al mes', 'En piel, cabello y suplementos: en total, <b>' + money(D.ahorro * queda.length) + '</b> de aquí a irte. De eso, ' + money(D.medico) + ' al mes los decide tu dermatólogo.']);
    pasos.push(['Si guardas 3 de cada 4 pesos', money(T3.fin), 'El BYD queda en cero en <b>' + (T3.cero ? mesL(T3.cero) : '—') + '</b> y llegas con esto en vez de ' + money(fin.proy) + '. ' + (T3.fin >= T.pide ? 'También alcanza.' : 'No alcanza: faltarían ' + money(T.pide - T3.fin) + '.')]);
    pasos.push(['Decide el ' + diaTxt(dec) + ' de ' + dec.slice(0, 4), plural(diasDec, 'día', 'días'), 'Con oferta firmada de ALTEN en Alemania, te vas con ellos; si no, con la admisión y el dinero, a Esslingen. Nunca con deuda.']);

    // El camino en ocho columnas: hoy y el cierre de cada tres meses. Tocar una abre el desglose de ese mes; con las flechas
    // se ven todos.
    mae.L = L; if (!L.some(m => m.mes === mae.mes)) mae.mes = (queda[0] || este).mes;
    const cols = [este].concat(queda.filter(m => /-(02|05|08|11)$/.test(m.mes)));
    const sg = n => '<em class="' + (n >= 0 ? 'ok' : 'mal') + '">' + signo(n) + '</em>', reng = (t, g, cls) => '<b class="' + (cls || '') + '">' + t + '</b>' + cols.map(m => '<span data-m="' + m.mes + '" class="' + (cls || '') + (mae.abre && m.mes === mae.mes ? ' sel' : '') + '">' + g(m) + '</span>').join('');
    const flujo = '<div class="km-tw"><div class="km-f" style="--n:' + cols.length + '" onclick="const c=event.target.closest(\'[data-m]\');if(c)MEDIDORES.mesMae(c.dataset.m)"><b></b>' +
      cols.map(m => '<span data-m="' + m.mes + '" class="h' + (m.tipo === 'hoy' ? ' hoy' : '') + (mae.abre && m.mes === mae.mes ? ' sel' : '') + '"><button type="button">' + (m.tipo === 'hoy' ? 'hoy' : MES[+m.mes.slice(5) - 1] + ' ' + m.mes.slice(0, 4)) + '</button></span>').join('') +
      reng('Te queda ese mes', m => sg(m.queda)) + reng('Debes del BYD', m => m.auto == null ? '—' : m.auto < 1 ? '<em class="ok">nada</em>' : money(m.auto)) + reng('Han rendido', m => m.rindeAcum >= 1 ? '<em class="ok">+' + money(m.rindeAcum) + '</em>' : money(0)) + reng('Tienes', m => money(m.tipo === 'proy' ? m.proy : m.real || 0), 'tot') + '</div></div>';

    return { kv: 'var(--cy)', titulo: 'Fondo Maestría', sub: 'Tu dinero para irte a Alemania en septiembre de 2028: el colchón, el BYD en cero y a invertir.', html:
      '<div class="km kp8"><div class="km-a"><section class="kv-c km-hero"><span>Guardando lo que te queda, en ' + mesL(fin.mes) + ' tendrías</span><div><strong>' + money(fin.proy) + '</strong><em>la salida pide ' + money(T.pide) + '</em></div>' + med(pct(fin.proy, T.pide)) +
          '<p class="' + (ok ? 'si' : 'no') + '">' + (ok ? 'Sí llegas: te sobran ' + money(-falta) + ' y sin deber el BYD.' : 'Todavía no llegas: te faltan ' + money(falta) + '.') + '</p></section>' +
        '<div class="kv-tiles">' + [['Llevas en todo', money(T.hoy), 'Tu plan pedía ' + money(T.planHoy) + '. ' + (dif < -1 ? '<em class="mal">Vas ' + money(-dif) + ' abajo</em>' : dif > 1 ? '<em class="ok">Vas ' + money(dif) + ' arriba</em>' : '<em class="ok">Vas al día</em>')],
          ['El BYD en cero', T.cero ? mesTxt(T.cero) : '—', 'debes ' + money(debe) + '; mandando lo del calendario, el ' + C().v('autoCero')],
          ['Te queda cada mes', money(queda[0] ? queda[0].queda : 0), 'lo que entra menos lo documentado' + (salto ? '; desde ' + mesL(salto.mes) + ', ' + money(salto.queda) : '')],
          ['Rinden tus inversiones', money(T.rinde), 'de ' + mesTxt(T.cero || fin.mes) + ' a ' + mesTxt(fin.mes) + ', si la bolsa da ' + Math.round(P0.bolsaAnual * 100) + '% al año y cripto ' + Math.round(P0.criptoAnual * 100) + '%']]
          .map(q => '<div class="kv-tile"><span>' + q[0] + '</span><b>' + q[1] + '</b><i>' + q[2] + '</i></div>').join('') + '</div></div>' +
      '<div class="km-b"><section class="kv-c km-g"><div class="km-cab"><div><h3>Tu camino a septiembre de 2028</h3></div>' +
          leyenda([['Lo que tienes', 'var(--text)', 'l'], ['Lo que tendrías', 'var(--ac)', 'l'], ['Lo que debes del BYD', 'var(--kv-2)', 'l'], ['Solo lo del calendario', 'var(--kv-gris)', 'd']]) + '</div>' + grafica('salida') + flujo + '</section>' +
        '<details class="kv-c km-nec km-pl"' + (maeLado() ? ' open' : '') + ' ontoggle="MEDIDORES.maeLado(this)"><summary class="km-tot"><h3>Todo lo que tienes</h3><strong>' + money(T.hoy) + '</strong><em>la salida pide ' + money(T.pide) + '</em></summary><div class="km-pl-c">' + listaPiezas + (tiEditable() ? '<div class="km-ed">' + boton('Editar saldos', 'abrirKpi(\'fondo\');MEDIDORES.editarMano(true)', 1) + boton('Anotar un abono', 'abrirKpi(\'deudatotal\')', 1) + '</div>' : '') + '<div class="km-tot dos"><h3>Lo que pide la salida</h3><strong>' + money(T.pide) + '</strong></div><div class="km-lista">' + listaCostos + '</div>' +
          '<div class="kv-pie">Mandando solo lo del calendario llegas con <b>' + money(planFin) + '</b>. Los ' + money(T.fuera) + ' de trámites, vuelo y primera renta no van en este presupuesto. Con ALTEN no piden cuenta bloqueada ni colegiatura.</div></div></details></div>' +
      '<section class="kv-c km-det' + (mae.abre ? ' abre' : '') + '" id="kmDet">' + desgloseMae() + '</section>' +
      '<div class="km-pasos" style="--n:' + pasos.length + '">' + pasos.map((q, i) => '<section class="kv-c km-paso' + (i ? '' : ' uno') + '"><b class="n">' + (i + 1) + '</b><div><div class="t"><h3>' + q[0] + '</h3><strong>' + q[1] + '</strong></div><p>' + q[2] + '</p>' + (q[3] ? '<div class="ac">' + q[3] + '</div>' : '') + '</div></section>').join('') + '</div>' +
      '</div>',
      listo: () => trayecto('salida', { L, cor: cor.slice(-1), T, dec: dec.slice(0, 7), cols: cols.map(m => m.mes) }) };
  };
  // La gráfica de la maestría: lo que tienes, lo que tendrías y lo que debes del BYD, mes por mes hasta irte; punteado, mandando
  // solo lo del calendario; la meta de la salida, y los hitos del plan con su nombre y su fecha (Adán, 25-nov-2026: "la gráfica no es
  // clara con las fechas y faltan muchos indicativos"). Si la tabla de abajo cabe entera, cada mes queda justo arriba de su columna
  // —medido en pantalla—; si se desliza de lado, la gráfica lleva su propio eje. Las fechas, siempre con su año: «feb 2027».
  function trayecto(id, o) {
    const g = base(id, { aria: 'Lo que tienes, lo que tendrías y lo que debes del BYD cada mes hasta agosto de 2028' }); if (!g) return; guarda(id, trayecto, o);
    const L = o.L, n = L.length, H = Math.max(0, L.findIndex(m => m.tipo === 'hoy')), en = mes => L.findIndex(m => m.mes === mes), T = o.T;
    const tw = g.el.parentNode.querySelector('.km-tw'), hs = tw ? [...tw.querySelectorAll('.km-f .h')] : [], sr = g.el.getBoundingClientRect();
    const alinea = hs.length === o.cols.length && hs.length > 1 && tw.scrollWidth <= tw.clientWidth + 1;
    const cx = alinea ? hs.map(h => { const r = h.getBoundingClientRect(); return r.left + r.width / 2 - sr.left; }) : null;
    const nF = g.w < 560 ? 3 : 2;   // renglones de la franja de hitos: en una gráfica angosta caben menos por renglón
    g.l = g.w < 560 ? 52 : 64; g.r = 14; g.t = 10 + nF * 32; g.b = alinea ? 10 : 30;
    const alto = Math.max(...L.map(m => Math.max(m.real || 0, m.proy || 0, m.plan || 0, m.auto || 0)), ...o.cor.map(c => c.pide)), Y = ejes(g, 0, alto * 1.16), y0 = Y(0);   // aire arriba: la etiqueta del final no choca con los hitos
    const K = o.cols.map(en);
    const X = i => {
      if (!alinea) return g.l + 14 + i / (n - 1) * (g.w - g.r - g.l - 28);
      const cw = cx.length > 1 ? cx[1] - cx[0] : 80, pas = H > 0 ? Math.min(cw / 3, (cx[0] - g.l - 12) / H) : 0;
      if (i <= K[0]) return cx[0] - (K[0] - i) * pas;
      let k = 1; while (k < K.length - 1 && i > K[k]) k++;
      return cx[k - 1] + (i - K[k - 1]) / (K[k] - K[k - 1]) * (cx[k] - cx[k - 1]);
    };
    const xh = X(H), P = (f, desde) => L.map((m, i) => i < (desde || 0) || f(m) == null ? null : [X(i), Y(f(m))]).filter(Boolean);
    const d = p => p.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(''), linea = (p, at) => p.length > 1 && nodo(g.svg, 'path', Object.assign({ d: d(p), fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, at));
    const txt = (x, y, t, at) => nodo(g.svg, 'text', Object.assign({ x, y, 'text-anchor': 'middle', class: 'km-x' }, at), t), punto = (x, y, c, r) => nodo(g.svg, 'circle', { cx: x, cy: y, r: r || 6, fill: c, stroke: 'var(--kv-caja)', 'stroke-width': 2 });
    const fecha = mes => MES[+mes.slice(5, 7) - 1] + ' ' + mes.slice(0, 4);
    // Las guías de los meses: debajo de cada columna de la tabla, o de cada etiqueta del eje.
    const marcas = alinea ? K.map((k, j) => [X(k), j]) : L.map((m, i) => i).filter(i => i === H || (i > H && /-(02|05|08|11)$/.test(L[i].mes))).map(i => [X(i), i]);
    let ult = -1e9;
    marcas.forEach(q => {
      nodo(g.svg, 'line', { x1: q[0], x2: q[0], y1: g.t - 4, y2: y0, class: 'km-col' });
      if (alinea) return;
      const i = q[1], t = i === H ? 'hoy' : fecha(L[i].mes);
      if (q[0] - ult < 70 || q[0] > g.w - 30) return; ult = q[0];
      txt(q[0], g.h - 9, t, { class: 'km-x' + (i === H ? ' f' : '') });
    });
    nodo(g.svg, 'line', { x1: xh, x2: xh, y1: g.t - 4, y2: y0, class: 'km-hoy' });
    // La meta: lo que pide la salida, rotulada a la izquierda, donde no hay líneas encima.
    o.cor.forEach(c => { nodo(g.svg, 'line', { x1: g.l, x2: g.w - g.r, y1: Y(c.pide), y2: Y(c.pide), class: 'km-gap' }); txt(g.l + 6, Y(c.pide) - 8, 'La salida pide ' + money(c.pide), { 'text-anchor': 'start', class: 'km-x o' }); });
    linea(P(m => m.auto), { stroke: 'var(--kv-2)', 'stroke-width': 3 });
    linea(P(m => m.plan, H), { stroke: 'var(--kv-gris)', 'stroke-width': 2, 'stroke-dasharray': '7 6' });
    const pr = P(m => m.proy, H); if (pr.length > 1) nodo(g.svg, 'path', { d: d(pr) + 'L' + pr[pr.length - 1][0] + ' ' + y0 + 'L' + pr[0][0] + ' ' + y0 + 'Z', class: 'km-area' });
    linea(pr, { stroke: 'var(--ac)', 'stroke-width': 3.5 });
    linea(P(m => m.tipo === 'proy' ? null : m.real), { stroke: 'var(--text)', 'stroke-width': 3 });
    // Los hitos, de izquierda a derecha, en la franja de arriba: nombre y fecha, con una guía hasta su punto. Si dos chocan, el segundo
    // baja un renglón.
    const pide = o.cor.length ? o.cor[o.cor.length - 1].pide : T.pide, iMeta = L.findIndex((m, i) => i > H && m.proy != null && m.proy >= pide);
    const hitos = [];
    if (T.lleno && en(T.lleno) > H) hitos.push({ i: en(T.lleno), t: 'Colchón completo', y: m => Y(m.proy), c: 'var(--w)' });
    if (T.cero && en(T.cero) > H) hitos.push({ i: en(T.cero), t: 'BYD en cero', y: () => y0, c: 'var(--kv-2)', r: 7 });
    if (iMeta > H) hitos.push({ i: iMeta, t: 'Juntas lo de la salida', y: () => Y(pide), c: 'var(--o)' });
    if (o.dec && en(o.dec) > H) hitos.push({ i: en(o.dec), t: 'Decides', y: m => Y(m.proy), c: 'var(--ac)' });
    hitos.sort((a, b) => a.i - b.i);
    const filas = Array(nF).fill(-1e9);
    hitos.forEach(h => {
      const x = X(h.i), y = h.y(L[h.i]), grupo = nodo(g.svg, 'g', {});
      const a = nodo(grupo, 'text', { x: 0, y: 0, 'text-anchor': 'middle', class: 'km-x f' }, h.t), b = nodo(grupo, 'text', { x: 0, y: 15, 'text-anchor': 'middle', class: 'km-x' }, fecha(L[h.i].mes));
      const ancho = Math.max(a.getComputedTextLength(), b.getComputedTextLength()) + 10, lx = Math.min(Math.max(x, g.l + ancho / 2), g.w - ancho / 2);
      // El primer renglón donde cabe; si en ninguno, el que se libera antes.
      let f = filas.findIndex(z => lx - ancho / 2 >= z + 6); if (f < 0) f = filas.indexOf(Math.min(...filas)); filas[f] = lx + ancho / 2;
      const ty = 14 + f * 32; [a, b].forEach(e => e.setAttribute('x', lx)); grupo.setAttribute('transform', 'translate(0,' + ty + ')');
      nodo(g.svg, 'line', { x1: x, x2: x, y1: ty + 20, y2: y - 8, class: 'km-guia' });
      punto(x, y, h.c, h.r);
    });
    // Hoy: lo que tienes y lo que debes. Al final: lo que tendrías y lo de solo el calendario, a la izquierda de su punto para no salirse.
    const hoy = L[H], u = L[n - 1];
    // Una etiqueta a la izquierda de hoy no pasa del eje: en una gráfica angosta se montaba sobre las cifras del eje.
    const tope = e => { const w = e.getComputedTextLength(), x = +e.getAttribute('x'); if (x - w < g.l + 2) e.setAttribute('x', g.l + 2 + w); };
    punto(xh, Y(hoy.real || 0), 'var(--text)', 6); tope(txt(xh - 8, Y(hoy.real || 0) - 30, 'tienes ' + money(hoy.real || 0), { 'text-anchor': 'end', class: 'km-x f' }));
    // Lo que debes, a la izquierda de hoy y debajo de su línea: a la derecha la línea baja y lo cruzaba.
    if (hoy.auto > 1) { punto(xh, Y(hoy.auto), 'var(--kv-2)', 6); tope(txt(xh - 10, Y(hoy.auto) + 22, 'debes ' + money(hoy.auto), { 'text-anchor': 'end', class: 'km-x f' })); }
    const xe = X(n - 1); punto(xe, Y(u.proy), 'var(--ac)', 7);
    txt(xe - 12, Y(u.proy) - 12, 'tendrías ' + money(u.proy), { 'text-anchor': 'end', class: 'km-x f' });
    // Lo de solo el calendario, debajo de su línea y pegado a la derecha: a la izquierda la línea cian baja y lo cruzaba.
    if (u.plan != null && Math.abs(Y(u.plan) - Y(u.proy)) > 22 && g.w >= 480) {
      const e = txt(xe, 0, 'solo el calendario ' + money(u.plan), { 'text-anchor': 'end', class: 'km-x' }), xi = xe - e.getComputedTextLength();
      const pl = P(m => m.plan, H), baja = pl.filter(q => q[0] >= xi - 4).reduce((z, q) => Math.max(z, q[1]), Y(u.plan));
      let ye = Math.min(y0 - 6, baja + 20); if (o.cor.some(c => Math.abs(Y(c.pide) - (ye - 4)) < 12)) ye += 16;   // no encima de la meta
      e.setAttribute('y', Math.min(y0 - 6, ye));
    }
    const cruz = nodo(g.svg, 'line', { y1: g.t, y2: y0, stroke: 'var(--kv-gris)', 'stroke-width': 1, opacity: 0 });
    raton(g, n, X, i => {
      const m = L[i]; cruz.setAttribute('x1', X(i)); cruz.setAttribute('x2', X(i)); cruz.setAttribute('opacity', .8);
      globo(g, X(i), fecha(m.mes) + (m.tipo === 'cierre' ? ', cierre' : m.tipo === 'hoy' ? ', hoy' : ''), [m.real != null && { c: 'var(--text)', v: money(m.real), n: m.tipo === 'hoy' ? 'tienes' : 'tenías' }, m.tipo === 'proy' && { c: 'var(--ac)', v: money(m.proy), n: 'tendrías' }, m.auto != null && { c: 'var(--kv-2)', v: m.auto < 1 ? 'nada' : money(m.auto), n: 'debes del BYD' },
        m.plan != null && { c: 'var(--kv-gris)', v: money(m.plan), n: 'solo el calendario' }, m.rindeAcum >= 1 && { c: 'var(--g)', v: '+' + money(m.rindeAcum), n: 'han rendido' }, m.queda != null && { c: 'var(--kv-1)', v: signo(m.queda), n: 'te queda' }, m.vendio > 0 && { c: 'var(--o)', v: money(m.vendio), n: 'vendiste de Bitcoin' }].filter(Boolean));
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
  // Adán, 25-nov-2026: "la gráfica hacia 1 M no es muy clara, mejórala". Como la del Fondo Maestría: si la tabla de abajo cabe
  // entera, la gráfica se acomoda sobre sus columnas —medidas en pantalla—; los años van marcados abajo; las paradas, en una franja
  // arriba con nombre, fecha y una guía hasta su punto; la maestría, con sus fechas; el millón, rotulado.
  function rutaMillon(id, o) {
    const g = base(id, { aria: 'Tu dinero menos tus deudas, de tu primer cierre al millón' }); if (!g) return; guarda(id, rutaMillon, o);
    const L = o.L, n = L.length, H = Math.max(0, L.findIndex(m => m.tipo === 'hoy')), en = ym => L.findIndex(m => m.mes === ym);
    const nF = g.w < 560 ? 3 : 2; g.l = g.w < 560 ? 52 : 64; g.r = 16; g.t = 10 + nF * 32 + 6; g.b = 28;
    const v = L.map(m => m.queda), Y = ejes(g, Math.min(0, ...v), Math.max(1e6, ...v) * 1.06), y0 = Y(0);
    // ¿La tabla de abajo cabe? Entonces cada mes queda arriba de su columna: una recta por la primera y la última, medidas.
    const tw = g.el.parentNode.querySelector('.km-tw'), bs = tw ? [...tw.querySelectorAll('.kp-t button')] : [], sr = g.el.getBoundingClientRect();
    let X = i => g.l + 14 + i / Math.max(1, n - 1) * (g.w - g.r - g.l - 28);
    if (bs.length > 1 && tw.scrollWidth <= tw.clientWidth + 1 && pat.st.length === bs.length) {
      const c = b => { const r = b.getBoundingClientRect(); return r.left + r.width / 2 - sr.left; }, i0 = en(pat.st[0].mes), i1 = en(pat.st[bs.length - 1].mes), x0 = c(bs[0]), x1 = c(bs[bs.length - 1]);
      if (i0 >= 0 && i1 > i0 && x0 > g.l) X = i => x0 + (i - i0) / (i1 - i0) * (x1 - x0);
    }
    const txt = (x, y, t, at) => nodo(g.svg, 'text', Object.assign({ x, y, class: 'km-x' }, at), t), pts = L.map((m, i) => [X(i), Y(m.queda)]), d = p => p.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join('');
    const fecha = ym => MES[+ym.slice(5, 7) - 1] + ' ' + ym.slice(0, 4), sg = q => (q < 0 ? '−' : '') + money(Math.abs(q));
    const tope = e => { const w = e.getComputedTextLength(), x = +e.getAttribute('x'); if (x - w < g.l + 2) e.setAttribute('x', g.l + 2 + w); return e; };
    // Los años: una guía en cada enero y el año abajo.
    let ult = -1e9;
    L.forEach((m, i) => { if (!/-01$/.test(m.mes)) return; const x = X(i); nodo(g.svg, 'line', { x1: x, x2: x, y1: g.t - 4, y2: g.h - g.b, class: 'km-col' }); if (x - ult > 44 && x < g.w - 20) { txt(x, g.h - 9, m.mes.slice(0, 4), { 'text-anchor': 'middle' }); ult = x; } });
    // La maestría: su banda, con nombre y fechas.
    const m0 = en(o.K.maestria[0]), m1 = en(o.K.maestria[1]);
    if (m0 > 0 && m1 > m0) {
      nodo(g.svg, 'rect', { x: X(m0), y: g.t - 4, width: X(m1) - X(m0), height: g.h - g.b - g.t + 4, class: 'kp-mae' });
      // Al pie de la banda: arriba pasa la línea del millón y la tapaba.
      const cx = (X(m0) + X(m1)) / 2, ab = g.h - g.b - 10, dos = X(m1) - X(m0) > 110;
      txt(cx, dos ? ab - 16 : ab, 'Maestría', { 'text-anchor': 'middle', class: 'km-x f' });
      if (dos) txt(cx, ab, fecha(o.K.maestria[0]) + ' a ' + fecha(o.K.maestria[1]), { 'text-anchor': 'middle' });
    }
    // El millón: la meta, rotulada a la izquierda.
    nodo(g.svg, 'line', { x1: g.l, x2: g.w - g.r, y1: Y(1e6), y2: Y(1e6), class: 'kp-mil' }); txt(g.l + 8, Y(1e6) - 8, 'La meta: ' + (g.w < 560 ? corto(1e6) : money(1e6)), { 'text-anchor': 'start', class: 'km-x o' });
    // El área, de cero a la línea: naranja abajo, verde arriba.
    [['var(--kv-2)', Math.max], ['var(--ac)', Math.min]].forEach(q => nodo(g.svg, 'path', { d: 'M' + X(H) + ' ' + y0 + pts.slice(H).map(p => 'L' + p[0].toFixed(1) + ' ' + q[1](p[1], y0).toFixed(1)).join('') + 'L' + X(n - 1) + ' ' + y0 + 'Z', fill: q[0], opacity: .13 }));
    const sx = X(Math.max(0, en(pat.st[pat.s] ? pat.st[pat.s].mes : ''))); nodo(g.svg, 'line', { x1: sx, x2: sx, y1: g.t - 4, y2: g.h - g.b, class: 'km-hoy' });
    [[pts.slice(H), 'var(--ac)', 4], [pts.slice(0, H + 1), 'var(--text)', 3]].forEach(q => q[0].length > 1 && nodo(g.svg, 'path', { d: d(q[0]), fill: 'none', stroke: q[1], 'stroke-width': q[2], 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
    L.slice(0, H).forEach((m, i) => nodo(g.svg, 'circle', { cx: X(i), cy: Y(m.queda), r: 4, fill: 'var(--text)', stroke: 'var(--kv-caja)', 'stroke-width': 2 }));
    pat.st.forEach((q, k) => { const i = en(q.mes); if (i >= 0) nodo(g.svg, 'circle', { cx: X(i), cy: Y(L[i].queda), r: k === pat.s ? 8 : 5, fill: q.tipo === 'hoy' ? 'var(--text)' : 'var(--ac)', stroke: 'var(--kv-caja)', 'stroke-width': 2 }); });
    // Hoy: lo que te queda, arriba a la izquierda de su punto.
    tope(txt(X(H) - 10, Y(L[H].queda) - 26, 'hoy ' + sg(L[H].queda), { 'text-anchor': 'end', class: 'km-x f' }));
    // Las paradas, de izquierda a derecha, en la franja de arriba; si dos chocan, la segunda baja de renglón.
    const NOM = { cero: 'Pasas de cero', medio: 'Medio millón', millon: 'El millón', auto: 'El BYD es tuyo' }, filas = Array(nF).fill(-1e9);
    o.K.paradas.map(p => ({ p, tp: p.auto ? 'auto' : p.tipo, i: en(p.mes) })).filter(q => NOM[q.tp] && q.i >= 0).sort((a, b) => a.i - b.i).forEach(q => {
      const x = X(q.i), y = Y(L[q.i].queda), grupo = nodo(g.svg, 'g', {});
      const a = nodo(grupo, 'text', { x: 0, y: 0, 'text-anchor': 'middle', class: 'km-x f' }, NOM[q.tp]), b = nodo(grupo, 'text', { x: 0, y: 15, 'text-anchor': 'middle', class: 'km-x' }, fecha(q.p.mes));
      const ancho = Math.max(a.getComputedTextLength(), b.getComputedTextLength()) + 10, lx = Math.min(Math.max(x, g.l + ancho / 2), g.w - ancho / 2);
      let f = filas.findIndex(z => lx - ancho / 2 >= z + 6); if (f < 0) f = filas.indexOf(Math.min(...filas)); filas[f] = lx + ancho / 2;
      const ty = 14 + f * 32; [a, b].forEach(e => e.setAttribute('x', lx)); grupo.setAttribute('transform', 'translate(0,' + ty + ')');
      nodo(g.svg, 'line', { x1: x, x2: x, y1: ty + 20, y2: y - 9, class: 'km-guia' });
      nodo(g.svg, 'circle', { cx: x, cy: y, r: 7, fill: 'var(--kv-2)', stroke: 'var(--kv-caja)', 'stroke-width': 2 });
    });
    const cruz = nodo(g.svg, 'line', { y1: g.t, y2: g.h - g.b, stroke: 'var(--kv-gris)', 'stroke-width': 1, opacity: 0 });
    raton(g, n, X, i => {
      const m = L[i], p = o.K.plan[m.mes]; cruz.setAttribute('x1', X(i)); cruz.setAttribute('x2', X(i)); cruz.setAttribute('opacity', .8);
      globo(g, X(i), fecha(m.mes) + (m.tipo === 'cierre' ? ', cierre' : m.tipo === 'hoy' ? ', hoy' : ''), [{ c: 'var(--ac)', v: sg(m.queda), n: 'te queda' }, { c: V.a, v: money(m.dinero), n: 'tu dinero' }, { c: V.b, v: money(m.debe), n: 'debes' }, p && m.tipo === 'proy' && { c: 'var(--kv-gris)', v: sg(p.liquido), n: 'solo el calendario' }].filter(Boolean));
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
    const hoyM = L[iH], a1 = K.adelanta(1000), a5 = K.adelanta(5000), dm = K.planCruza && K.cruza ? (+K.planCruza.slice(0, 4) - +K.cruza.slice(0, 4)) * 12 + +K.planCruza.slice(5) - +K.cruza.slice(5) : 0, finD = d0 ? K.paradas.filter(p => p.tipo === 'deuda' && !!p.auto === (d0.id === 'd003'))[0] : null, piezas = L2 => L2.filter(q => q[1] >= 1).sort((a, b) => b[1] - a[1]);
    const n1 = piezas([['depósito', x.deposito], ['CETES', x.ef], ['Bitcoin', x.btcV], ['inversiones', x.otrasV], ['cuenta y efectivo', x.liqV]]), junta = q => q.map(z => z[0] + ' ' + money(z[1])).reduce((t, z, i, l) => t + (i ? (i === l.length - 1 ? (/^h?i/i.test(z) ? ' e ' : ' y ') : ', ') : '') + z, '');
    const tile = (k, t, v, s) => k ? '<button type="button" class="kv-tile" data-k="' + k + '" aria-expanded="' + (pat.ve === k) + '" onclick="MEDIDORES.patVe(\'' + k + '\')"><span>' + t + '</span><b>' + v + '</b><i>' + s + '</i></button>' : '<div class="kv-tile"><span>' + t + '</span><b>' + v + '</b><i>' + s + '</i></div>';
    const pasos = [
      ['Este mes', u ? signo(dif) : '—', u ? (mejor ? 'Lo que más ayudó: <b>' + (mejor[0] === 'Deudas' ? 'bajar tus deudas' : mejor[0] === 'Bitcoin' ? 'tu Bitcoin' : mejor[0].toLowerCase()) + '</b>, ' + signo(mejor[1]) + '.' : 'Nada sumó.') + (peor ? ' Lo que más restó: ' + (peor[0] === 'Deudas' ? 'tus deudas' : peor[0] === 'Bitcoin' ? 'tu Bitcoin' : peor[0].toLowerCase()) + ', ' + signo(peor[1]) + '.' : ' Nada restó.') : 'Se compara cuando cierre el mes.', boton('Registrar una compra', 'abrirKpi(\'invertido\')')],
      d0 ? ['Tu deuda más grande', money(+d0.balance), esc(d0.name) + (+d0.min > 0 ? ': pagas <b>' + money(+d0.min) + '</b> al mes' : '') + (finD ? ' y, guardando lo que te queda, acabas en ' + mesL(finD.mes) : '') + '.', boton('Ver el plan del BYD', 'abrirKpi(\'deudatotal\')', 1)] : ['Sin deudas', 'bien', 'Todo lo que guardas suma al millón.'],
      a5 > 0 ? ['Guarda ' + money(5000) + ' más al mes', plural(a5, 'mes', 'meses') + ' antes', 'Es lo que se adelanta el millón, sin contar lo que rinda de más.' + (a1 > 0 ? ' Con ' + money(1000) + ', ' + plural(a1, 'mes', 'meses') + '.' : '')] : ['Guarda lo que te queda', 'cada mes', 'Es lo que más te acerca al millón.'],
      ['Contra el calendario', dm > 0 ? plural(dm, 'mes', 'meses') + ' antes' : dm < 0 ? plural(-dm, 'mes', 'meses') + ' después' : K.planCruza ? 'igual' : '—', (K.planCruza ? 'Mandando solo lo del calendario llegas en ' + mesL(K.planCruza) + '. ' : '') + 'Cada cierre de Finanzas mueve la línea y la fecha.']];
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
  // Un cuadro por pago: `e` es lo que pagarías de más cada mes; `k`, el pago tocado.
  // `e`: 'plan' (los abonos de tu plan, CIFRAS.abonosPlan) o lo que pagarías de más cada mes.
  const pagos = { p: null, e: 'plan', k: 0 };
  const PAGO_MAS = ['plan', 0, 1000, 2000, 5000], opPago = e => e === 'plan' ? { abonos: C().abonosPlan() } : { extraMes: e }, sumaInt = T => T.reduce((z, q) => z + q.interes, 0), mesDe = f => C().fechaLocal(f).slice(0, 7), parteP = (v, t) => t > 0 ? v / t * 100 : 0;
  // Lo que sale de tu bolsa en cada pago (Adán, 25-nov-2026: "no está claro cuánto se paga cada mes, según los diferentes planes"):
  // interés, IVA y seguros, lo que baja la deuda y el abono del plan. `alMes`: lo que pagas al mes, sin el último pago, que es el resto.
  const pagoDe = q => q.interes + q.cargos + q.capital + (q.abono || 0);
  // En el cuadro cabe poco: los miles con una k y un decimal bajo diez mil, tapado en modo privado como money(); en un cuadro angosto
  // el signo de pesos se va (CSS).
  const milK = v => privado ? '••' : '<i>$</i>' + (v < 9950 ? (v / 1000).toFixed(1) : Math.round(v / 1000)) + 'k';
  const alMes = T => { const v = (T.length > 1 ? T.slice(0, -1) : T).map(pagoDe), a = Math.min.apply(null, v), b = Math.max.apply(null, v);
    return Math.round(b) - Math.round(a) < 1 ? money(a) : money(a) + ' a ' + money(b); };
  function pagosHtml() {
    const d = pagos.p.d, R = pagos.p.R, base = R.tabla, T = C().prestamoTabla(d, opPago(pagos.e)), n = T.length, ahorra = Math.max(0, sumaInt(base) - sumaInt(T)), k = Math.min(pagos.k, n - 1), x = T[k], ab = x.abono || 0, hechos = R.hechos || 0;
    const suma = L => L.reduce((z, q) => z + q.interes, 0), ym0 = mesDe(base[0].fecha), ini = mas(ym0, -hechos), fin = mesDe(base[base.length - 1].fecha), en = {}, viejo = {};
    T.forEach((q, i) => { en[mesDe(q.fecha)] = i; }); base.forEach((q, i) => { viejo[mesDe(q.fecha)] = i; });
    let filas = '';
    for (let a = +ini.slice(0, 4); a <= +fin.slice(0, 4); a++) {
      let cel = '', tot = 0, paga = 0;
      for (let m = 1; m <= 12; m++) {
        const ym = a + '-' + String(m).padStart(2, '0'), i = en[ym], q = T[i], nom = MESL[m - 1] + ' de ' + a;
        if (i != null) { const p = pagoDe(q); tot += q.interes; paga += p; cel += '<button type="button" class="vivo' + (i === k ? ' sel' : '') + '" data-i="' + i + '" style="--p:' + parteP(q.interes, p).toFixed(1) + '%;--q:' + parteP(q.interes + q.cargos, p).toFixed(1) + '%" aria-pressed="' + (i === k) + '" aria-label="Pago de ' + nom + ': ' + money(p) + '"><span>' + MES[m - 1] + '</span><em>' + milK(p) + '</em></button>'; }
        else if (viejo[ym] != null) cel += '<i class="libre" title="' + nom + ': te lo ahorras"><span>' + MES[m - 1] + '</span></i>';
        else if (ym >= ini && ym < ym0) cel += '<i class="hecho" title="' + nom + ': pagado"><span>' + MES[m - 1] + '</span></i>';
        else cel += '<i class="nada"></i>';
      }
      const libre = !tot && base.some(q => q.fecha.getFullYear() === a);
      filas += '<div class="kn-a"><b>' + a + '</b>' + cel + '<div class="t"><strong' + (libre ? ' class="ok"' : '') + '>' + (tot ? money(tot) : libre ? 'nada' : '—') + '</strong><span>de interés</span>' + (paga ? '<em>pagas ' + money(paga) + '</em>' : '') + '</div></div>';
    }
    const dato = (t, v, cls) => '<div><span>' + t + '</span><strong' + (cls ? ' class="' + cls + '"' : '') + '>' + v + '</strong></div>';
    return '<div class="kn-d">' + dato('Pago de ' + mesTxt(mesDe(x.fecha)), money(pagoDe(x)), 'az') + dato('Te faltan', plural(n, 'pago', 'pagos')) + dato('Acabas en', mesTxt(mesDe(T[n - 1].fecha))) + dato('Interés que falta', money(suma(T)), 'mal') + dato('Te ahorras', money(ahorra), ahorra >= 1 ? 'ok' : '') + '</div>' +
      '<div class="kn-g" onclick="const c=event.target.closest(\'[data-i]\');if(c)MEDIDORES.pagoVe(+c.dataset.i)">' + filas + '</div>' +
      '<div class="kn-pie"><p>El pago de <b>' + MESL[x.fecha.getMonth()] + ' de ' + x.fecha.getFullYear() + '</b> es de <b>' + money(pagoDe(x)) + '</b>: <b class="mal">' + money(x.interes) + '</b> de interés' + (x.cargos > 0 ? ', ' + money(x.cargos) + ' de IVA y seguros' : '') + ' y <b class="az">' + money(x.capital + ab) + '</b> bajan tu deuda' + (ab >= 1 ? ', ' + money(ab) + ' de ellos abonados por tu plan' : '') + '. ' + (x.saldo < 1 ? 'Con ese pago ya no debes nada.' : 'Después debes <b>' + money(x.saldo) + '</b>.') + '</p>' +
        leyenda([['Interés', V.b]].concat(x.cargos > 0 ? [['IVA y seguros', V.g]] : [], [['Baja tu deuda', 'color-mix(in srgb,var(--kv-1) 45%,var(--kv-caja))']], hechos ? [['Pagado', 'rgba(var(--ov),.14)']] : [], ahorra >= 1 ? [['Te lo ahorras', 'var(--g)']] : [])) + '</div>';
  }
  const pagosChips = () => { const base = sumaInt(pagos.p.R.tabla); return PAGO_MAS.map(v => { const T = C().prestamoTabla(pagos.p.d, opPago(v)), i = sumaInt(T), n = T.length, todo = T.reduce((z, q) => z + pagoDe(q), 0);
    return '<button type="button" class="kn-c' + (pagos.e === v ? ' sel' : '') + '" aria-pressed="' + (pagos.e === v) + '" onclick="MEDIDORES.pagoMas(' + (v === 'plan' ? '\'plan\'' : v) + ')">' +
      '<span class="n">' + (v === 'plan' ? 'Tu plan' : v ? 'Mensualidad +' + money(v) : 'Solo la mensualidad') + '</span>' +
      '<span class="m"><strong>' + (n ? alMes(T) : '—') + '</strong> al mes</span>' +
      '<span class="d">' + (n ? plural(n, 'pago', 'pagos') + ' · acabas ' + mesTxt(mesDe(T[n - 1].fecha)) + ' · ' : '') + '<b>' + (v ? 'ahorras ' + money(base - i) : money(i) + ' de interés') + '</b> · ' + money(todo) + ' en total</span></button>'; }).join(''); };
  function pintaPagos() {
    const a = document.getElementById('knPagos'), b = document.getElementById('knChips'); if (a) a.innerHTML = pagosHtml(); if (b) b.innerHTML = pagosChips();
  }
  M.pagoMas = function (v) { pagos.e = v; pintaPagos(); const b = document.querySelector('.kn-c.sel'); if (b) b.focus({ preventScroll: true }); };
  M.pagoVe = function (i) { pagos.k = i; pintaPagos(); const b = document.querySelector('.kn-g .sel'); if (b) b.focus({ preventScroll: true }); };
  M.intereses = function (F) {
    const con = (F.debts || []).filter(d => +d.balance > 0 && tasaQueCorre(d) > 0), mes = con.reduce((s, d) => s + d.balance * d.rate / 1200, 0), L = prestamos(F).filter(q => q.R.tabla.length).sort((a, b) => b.d.balance - a.d.balance);
    if (!con.length) return { kv: 'var(--g)', titulo: 'Intereses este mes', sub: '', html: '<div class="kv-fila">' + hero(money(0), '', 'No pagas intereses. Todo lo que abones baja tu deuda.', null) + '</div>' };
    const p = L[0], otras = con.filter(d => !p || d.id !== p.d.id);
    const resto = otras.length ? '<div class="kv-fila">' + caja('s12', p ? 'Lo demás que te cobra interés' : 'Lo que te cobra interés', otras.some(d => d.type === 'credit_card') ? 'Una tarjeta cobra mucho más que el auto: primero esto.' : '', lista(otras.map(d => fila(esc(d.name), money(d.balance * d.rate / 1200) + ' este mes', d.rate + '% al año sobre ' + money(+d.balance), '')).join(''))) + '</div>' : '';
    if (!p) return { kv: 'var(--o)', titulo: 'Intereses este mes', sub: 'Lo que te cuesta deber.', html: '<div class="kv-fila">' + hero(money(mes), '', 'Es lo que te cobran por deber ' + money(con.reduce((s, d) => s + +d.balance, 0)) + '. No baja tu deuda.', null) + '</div>' + resto };
    const R = p.R, t = R.tabla[0], pago = t.interes + t.cargos + t.capital, K = R.contrato, c = 2 * Math.PI * 112, arco = (v, desde, col) => v > 0 ? '<circle cx="140" cy="140" r="112" fill="none" stroke="' + col + '" stroke-width="26" stroke-dasharray="' + (c * v / pago).toFixed(1) + ' ' + c.toFixed(1) + '" transform="rotate(' + (-90 + desde / pago * 360).toFixed(1) + ' 140 140)"></circle>' : '';
    Object.assign(pagos, { p, k: 0 });
    const pie = chocaC(R) ? '<b>Revisa tus datos:</b> tu contrato acaba en ' + prMes(K.ultima) + ' y con estos datos acabarías en ' + prMes(R.fin) + '.' + (K.cargosSugeridos ? ' Cuadra si unos ' + money(K.cargosSugeridos) + ' de cada pago son IVA y seguros; entonces el interés que falta sería ' + money(C().prestamoSimular(Object.assign({}, p.d, { cargos: K.cargosSugeridos }), {}).interes) + '. Lo dice tu estado de cuenta.' : ' Compara el saldo y la tasa con tu estado de cuenta.')
      : '<b>La mensualidad se anota sola.</b> Un abono va todo a tu deuda: pruébalo antes de pagarlo.';
    return { kv: 'var(--o)', titulo: 'Intereses este mes', sub: 'Cada cuadro es un pago de ' + esc(p.d.name) + ' con tu plan. Lo naranja es interés: no baja tu deuda.', html:
      '<div class="km kn"><div class="kn-b"><div class="kn-i"><section class="kv-c kn-dona"><svg viewBox="0 0 280 280" role="img" aria-label="De tu próximo pago, cuánto es interés"><circle cx="140" cy="140" r="112" fill="none" stroke="var(--kv-1)" stroke-width="26"></circle>' + arco(t.interes, 0, 'var(--kv-2)') + arco(t.cargos, t.interes, 'var(--kv-gris)') +
          '<text x="140" y="112" class="s">Este mes, de interés</text><text x="140" y="158" class="n">' + money(t.interes) + '</text><text x="140" y="188" class="s">' + Math.round(t.interes / pago * 100) + '% de tu pago</text></svg>' +
          '<p><b>' + money(t.interes / 30) + ' al día.</b> El ' + prDia(t.fecha) + ' pagas ' + money(pago) + ': ' + money(t.capital) + ' bajan tu deuda' + (t.cargos > 0 ? ' y ' + money(t.cargos) + ' son IVA y seguros' : '') + '.</p></section>' +
        '<section class="kv-c kn-mas"><h3>Tu plan contra otros pagos</h3><div id="knChips">' + pagosChips() + '</div><p class="kv-p">Tu plan manda al BYD todo lo que apartas desde que se llene el colchón: queda en cero el <b>' + C().v('autoCero') + '</b>. Cada ' + money(1000) + ' que abones hoy te ahorra ' + money(R.porMil.ahorra) + '.</p></section></div>' +
      '<section class="kv-c kn-p" id="knPagos">' + pagosHtml() + '</section></div>' +
      '<section class="kv-c kn-r' + (chocaC(R) ? ' alto' : '') + '"><p>' + pie + '</p><div class="ac">' + (chocaC(R) ? boton('Revisar mis datos', 'abrirKpi(\'deudatotal\')', 1) : '') + boton('Simular un abono', 'abrirKpi(\'deudatotal\')') + '</div></section></div>' + resto };
  };

  // ══ Total invertido ══
  M.invertido = function (F) {
    const R = contraPlan(F), x = R.x, editable = tiEditable(), total = x.otrasV + x.deposito + x.btcV, trabaja = x.otrasV + x.btcV, metido = x.otrasMet + x.btcMet, dif = trabaja - metido, pB = x.b.price * x.b.fx;
    const tipo = t => (TI_TIPOS.find(q => q[0] === t) || [0, 'Otro'])[1];
    const filas = x.inv.map(i => ({ date: i.date, key: i.id, n: i.name || 'Inversión', s: tipo(i.type) + tiSigueTxt(i), met: +i.invested || 0, v: +i.value || +i.invested || 0, dep: i.id === 'i004' }));
    x.BA.ops.forEach(h => { const q = Math.abs(+h.btc || 0), m = x.pes(h), ve = x.venta(h); filas.push({ date: h.date, key: ve || h.id === 'total' ? null : 'btc:' + h.id, n: ve ? 'Bitcoin, venta' : 'Bitcoin', s: tiCantTxt(q, { tipo: 'cripto', tk: 'BTC' }), met: m, v: ve ? null : pB > 0 ? q * pB : m }); });
    filas.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
    const delMes = filas.filter(f => String(f.date || '').slice(0, 7) === R.ym && f.v != null && !f.dep).reduce((s, f) => s + f.met, 0), toca = R.inv.filter(e => e.k <= R.k).reduce((s, e) => s + e.v, 0), falta = toca - delMes, SIG = R.E.filter(e => e.k >= R.k && e.k >= C().PROYECTO.planDesde).concat(envios(mas(R.ym, 1))), partes = ['colchon', 'auto', 'gbm'].map(q => [q, SIG.reduce((s, e) => s + (e.a === q ? e.v : 0), 0)]).filter(q => q[1] >= 1).map(q => money(q[1]) + ' ' + A_DONDE[q[0]]).join(' y ');
    const T = C().ritmoMaestria(F, { real: fondoMaestria().total }), PR = T.meses.filter(m => m.tipo !== 'cierre' && m.activos), uM = PR[PR.length - 1], ini = PR.filter(m => m.va && m.va.aBolsa + m.va.aCripto >= 1)[0];
    const por = {}; filas.forEach(f => { if (f.v != null) por[f.n] = (por[f.n] || 0) + f.v; });
    if (x.BA.resto > 0 && pB > 0) por.Bitcoin = (por.Bitcoin || 0) + x.BA.resto * pB;
    const cols = [V.a, V.b, V.c, V.g], part = Object.keys(por).sort((a, b) => por[b] - por[a]).map((n, i) => [n, por[n], cols[Math.min(i, 3)]]);
    const rep = (F.reparto && F.reparto.length ? F.reparto : C().REPARTO_BASE) || [], sig = R.E.filter(e => e.k >= C().PROYECTO.planDesde).concat(envios(mas(R.ym, 1))).filter(e => e.k >= R.k);
    // Tu Bitcoin hoy: el precio del último mes contra lo que pagaste en promedio, en dólares.
    const ab = x.BA.ops.filter(h => !x.venta(h)), bq = ab.reduce((z, h) => z + (+h.btc || 0), 0), prom = bq > 0 ? ab.reduce((z, h) => z + (+h.usd || 0), 0) / bq : 0;
    const act = qiActivos().filter(q => q.s === 'BTC-USD')[0], hace = new Date(); hace.setDate(hace.getDate() - 30);
    const serie = act && act.d1 ? act.d1.filter(q => q[0] >= C().fechaLocal(hace)) : [], falta2 = trabaja > 0 && x.btcV > 0 && x.btcMet > x.btcV ? (x.btcMet / x.btcV - 1) * 100 : 0;
    const btcHtml = x.btcV > 0 ? '<section class="kv-c"><h3>Tu Bitcoin hoy</h3><p>Vale <b>' + money(x.btcV) + '</b>. ' + (falta2 > 0 ? 'Para recuperar lo que metiste tendría que subir <b>' + falta2.toFixed(1) + '%</b>.' : 'Ya vale más de lo que metiste.') + '</p>' + (serie.length > 1 ? '<p class="kv-p">El precio del último mes, en dólares.</p>' + grafica('btc') : '') + '</section>' : '';
    const envT = '<table class="kv-t kv-mini" style="margin-top:8px"><tbody>' + sig.map(e => '<tr' + (e.k < R.k ? ' class="pasado"' : '') + '><td><b>' + diaTxt(e.k) + '</b></td><td>' + (/Didi/.test(e.t) ? 'De Didi' : esc(e.t)) + '</td><td>' + A_DONDE[e.a] + (e.k === R.k ? ' <span class="chip">hoy</span>' : '') + '</td><td><b>' + money(e.v) + '</b></td></tr>').join('') + '</tbody></table>';
    const filaH = f => { const d = f.v != null ? f.v - f.met : 0; return '<div class="ti-fila' + (f.key && _tiEdit === f.key ? ' edita' : '') + '"><span class="ti-f">' + tiFecha(f.date) + '</span><span class="ti-n"><b>' + esc(f.n) + '</b><i>' + f.s + (f.dep ? ' · no rinde, lo regresan' : '') + '</i></span><span class="ti-m">' + (f.v == null ? 'te dieron <b>' + money(f.met) + '</b>' : 'metiste <b>' + money(f.met) + '</b><br>vale <b>' + money(f.v) + '</b>' + (Math.abs(d) >= 1 ? ' ' + gana(d) : '')) + '</span>' +
      (editable && f.key ? '<span class="ti-acc"><button type="button" class="ce-btn sec" onclick="tiEditar(\'' + f.key + '\')">Editar</button><button type="button" class="ce-btn sec" onclick="tiBorrar(\'' + f.key + '\')">Borrar</button></span>' : '') + '</div>'; };
    return { kv: 'var(--cy)', titulo: 'Total invertido', sub: 'Lo que tienes, cuánto va ganando y cuándo toca comprar.', html:
      '<div class="kv-fila">' + hero(money(total), '', 'Trabajando: <b>' + money(trabaja) + '</b>. Guardado en el depósito de la renta: <b>' + money(x.deposito) + '</b>.', null) +
      tiles([['Ganas o pierdes', metido > 0 ? signo(dif) : money(0), metido > 0 ? 'metiste ' + money(metido) + ' y vale ' + money(trabaja) + ' (' + (dif >= 0 ? '+' : '−') + Math.abs(dif / metido * 100).toFixed(1) + '%)' : 'todavía no hay compras'],
        ['Cuándo toca invertir', R.inv.length ? money(R.inv.reduce((s, e) => s + e.v, 0)) : ini ? mesTxt(ini.mes) : '—', R.inv.length ? 'este mes; registraste ' + money(delMes) + (falta > 1 ? ', te faltan ' + money(falta) : '') : 'primero el colchón y el BYD; después, ' + money(C().n('invertirMes') || 0) + ' al mes'],
        ['Lo siguiente', R.sig ? money(R.sig.v) : '—', R.sig ? (R.sig.k === R.k ? 'hoy, ' : 'el ' + diaTxt(R.sig.k) + ', ') + A_DONDE[R.sig.a] : 'sin envíos próximos'],
        ['En ' + mesTxt(uM ? uM.mes : R.ym) + ' tendrías', uM ? money(uM.activos.bolsa + uM.activos.btc) : '—', uM ? 'en bolsa y cripto; de eso, ' + money(T.rinde) + ' son rendimiento' : '']]) + '</div>' +
      '<div class="kv-fila crece"><div class="kv-col s4">' + ctEstrategiaHoyHtml() + '<section class="kv-c"><h3>Lo que apartas, y a dónde va</h3><p>De hoy al cierre del mes que sigue: ' + (partes || 'según tu plan') + '.</p>' + envT + '</section></div>' +
      '<div class="kv-col s5"><section class="kv-c"><h3>Tus compras</h3><p>De la más nueva a la más vieja. El Bitcoin y las acciones se valúan solos.</p>' + (part.length ? '<div class="kv-fin">' + part.map(q => '<i style="flex:' + q[1] + ';background:' + q[2] + '"></i>').join('') + '</div>' + leyenda(part.map(q => [esc(q[0]) + ' ' + Math.round(pct(q[1], total)) + '%', q[2]])) : '') +
        '<div class="ti-lista" style="margin-top:14px">' + (filas.map(filaH).join('') || '<p class="kv-p" style="padding:14px">Todavía no hay compras.</p>') + '</div>' + (x.BA.resto * pB >= 1 ? '<div class="kv-pie">Tu Bitcoin incluye ' + money(x.BA.resto * pB) + ' que te quedaron de antes.</div>' : '') + '</section>' +
      '<section class="kv-c kv-tres">' + (editable ? tiFormHtml(tiEditObj(F, _tiEdit)) : '<h3>Tus compras se anotan en tu PC</h3>' + copia('Se agregan')) + '<div class="kv-rep"><h3>En qué ponerlo' + (ini && !R.inv.length ? ', desde ' + mesL(ini.mes) : '') + '</h3>' + rep.map(r => '<span><b>' + r.pct + '%</b>' + esc(r.n) + '<i>' + esc(r.donde || '') + '</i></span>').join('') + boton(F.reparto && F.reparto.length ? 'Cambiar mi reparto' : 'Escribir mi reparto', 'cerrarKpi();abrirGBM()', 1) + '</div></section></div>' +
      '<div class="kv-col s3 arriba">' + (uM ? '<section class="kv-c"><h3>Tus inversiones hasta irte</h3><p>Guardando lo que te queda y con lo que tu plan supone que rinden.</p>' + grafica('inv') + leyenda([['Bolsa', V.a, 'l'], ['Cripto', V.b, 'l']]) + '</section>' : '') + btcHtml + '</div></div>',
      listo: () => { if (uM) lineas('inv', { et: PR.map((m, i) => i && !/-(02|08)$/.test(m.mes) ? '' : i ? MES[+m.mes.slice(5) - 1] + ' ' + m.mes.slice(2, 4) : 'hoy'), largo: PR.map(m => mesTxt(m.mes)), desde: 0, aria: 'Lo que tendrías en bolsa y en cripto cada mes hasta agosto de 2028', series: [{ n: 'Bolsa', c: V.a, v: PR.map(m => m.activos.bolsa), area: 1, fin: 1 }, { n: 'Cripto', c: V.b, v: PR.map(m => m.activos.btc) }] }); if (serie.length > 1) lineas('btc', { et: serie.map(q => diaTxt(q[0])), largo: serie.map(q => tiFecha(q[0])), ref: prom > 0 ? { v: prom, t: 'Tu promedio' } : null, aria: 'Precio del Bitcoin en dólares, último mes', series: [{ n: 'Bitcoin, en dólares', c: V.a, v: serie.map(q => q[1]) }] }); } };
  };

  // ══ Deuda total ══
  // Lo que se debe mes a mes, sumando todas: las de plazo con su tabla, las demás con su pago; `o` es el abono simulado.
  const caminoDeuda = (F, o) => C().deudaCamino(F, o);
  function simular() {
    const F = D.fin || {}, p = prestamos(F).sort((a, b) => b.d.rate - a.d.rate)[0]; if (!p) return;
    const q = id => document.getElementById(id), d = p.d, plan = C().abonosPlan(), T = C().prestamoTabla(d, { abonos: plan, extra: sim.extra, extraMes: sim.mes }), solo = p.R.tabla, u = T[T.length - 1], us = solo[solo.length - 1];
    const antes = u && us ? solo.length - T.length : 0;
    if (q('kvs-e')) q('kvs-e').textContent = money(sim.extra); if (q('kvs-m')) q('kvs-m').textContent = money(sim.mes);
    if (q('kvs-r')) q('kvs-r').innerHTML = [['Acabas', u ? prMes(u.fecha) : '—'], ['Antes', antes > 0 ? prMeses(antes) : 'igual'], ['Te ahorras en intereses', money(Math.max(0, sumaInt(solo) - sumaInt(T)))]].map(z => '<div><span>' + z[0] + '</span><b>' + z[1] + '</b></div>').join('');
    const a = caminoDeuda(F, {}), b = caminoDeuda(F, { plan: true }), c = caminoDeuda(F, { plan: true, extra: sim.extra, extraMes: sim.mes }), igual = !sim.extra && !sim.mes, corta = z => a.v.map((_, i) => i < z.v.length && (i === 0 || z.v[i - 1] > 0) ? z.v[i] : null);
    lineas('deuda', { et: a.et.map(m => m.slice(5) === '01' ? m.slice(0, 4) : ''), largo: a.et.map(mesTxt), desde: 0, aria: 'Lo que debes mes a mes, pagando solo la mensualidad, con tu plan y con tus abonos',
      series: [{ n: 'Solo la mensualidad', c: V.g, v: a.v }, { n: 'Tu plan', c: V.a, v: corta(b), area: igual ? 1 : 0 }].concat(igual ? [] : [{ n: 'Tu plan y tus abonos', c: V.b, v: corta(c), area: 1 }]) });
  }
  M.simula = function (campo, v) { sim[campo] = +v || 0; simular(); };
  M.llevarAbono = function () { const d = document.querySelector('[data-kv="de-abono"]'); if (d) d.open = true; const f = document.querySelector('#kpiBody form[data-pr="abono"]'); if (f) { f.pa_m.value = sim.extra; prPrevia(f.pa_m, (prestamos(D.fin || {})[0] || { d: {} }).d.id); f.scrollIntoView({ block: 'center' }); f.pa_m.focus(); } };
  M.deudatotal = function (F) {
    const ds = (F.debts || []).filter(d => +d.balance > 0).sort((a, b) => b.balance - a.balance), debe = ds.reduce((s, d) => s + +d.balance, 0), editable = tiEditable(), L = prestamos(F).sort((a, b) => b.d.rate - a.d.rate), p = L[0], R = p && p.R;
    if (!ds.length) return { kv: 'var(--g)', titulo: 'Deuda total', sub: '', html: '<div class="kv-fila">' + hero(money(0), '', 'No debes nada.', null) + '</div>' };
    const nacio = (F.debts || []).reduce((s, d) => s + (+d.total || +d.balance || 0), 0), pagos = ds.map(d => ({ d, q: C().cuotas(d) })).filter(z => z.q.siguiente).sort((a, b) => a.q.siguiente - b.q.siguiente), s1 = pagos[0];
    const fin = pagos.map(z => z.q.ultima).filter(Boolean).sort((a, b) => b - a)[0], mensual = ds.reduce((s, d) => s + (+d.min || 0), 0), mesInt = L.reduce((s, z) => s + z.R.interesSig, 0);
    const K = R && R.contrato, choca = chocaC(R);
    const PA = C().planAhorro(), sa = PA.envios.filter(e => e.fecha >= hoyLocal() && e.auto >= 1)[0];
    const abonos = R ? R.abonos.map(t => '<div class="ti-fila' + (_prEdit === t.id ? ' edita' : '') + '"><span class="ti-f">' + tiFecha(t.date) + '</span><span class="ti-n"><b>Abono</b><i>' + esc(t.nota || '') + '</i></span><span class="ti-m"><b>' + money(+t.amount || 0) + '</b></span>' +
      (editable ? '<span class="ti-acc"><button type="button" class="ce-btn sec" onclick="prAbonoEditar(\'' + t.id + '\')">Editar</button><button type="button" class="ce-btn sec" onclick="prAbonoBorrar(\'' + t.id + '\')">Borrar</button></span>' : '') + '</div>').join('') : '';
    return { kv: 'var(--r)', titulo: 'Deuda total', sub: 'Lo que debes, cuándo acabas y cómo acabar antes.', html:
      '<div class="kv-fila">' + hero(money(debe), '', 'Ya pagaste <b>' + Math.round(pct(nacio - debe, nacio)) + '%</b> de todo lo que has debido.', pct(nacio - debe, nacio)) +
      tiles([['Pagas cada mes', money(mensual), plural(ds.length, 'deuda viva', 'deudas vivas')], ['Próximo pago', s1 ? money(+s1.d.min) : '—', s1 ? 'el ' + prDia(s1.q.siguiente) + ', ' + esc(s1.d.name) : ''],
        ['El BYD en cero', PA.cero ? C().v('autoCero') : '—', 'con tu plan' + (R && R.fin ? '; pagando solo la mensualidad, ' + prMes(R.fin) : '')], ['Te ahorras de interés', money(C().n('autoAhorra') || 0), 'pagarías ' + money(C().n('autoInteresPlan') || 0) + ' en vez de ' + money(C().n('autoInteres') || 0)]]) + '</div>' +
      (choca ? hoy('Revisa', 'Tu contrato acaba en <b>' + prMes(K.ultima) + '</b>, pero con estos datos acabarías en <b>' + prMes(R.fin) + '</b>.', K.cargosSugeridos ? 'Para que cuadre, unos ' + money(K.cargosSugeridos) + ' de cada mensualidad serían IVA y seguros. Es un cálculo: el dato real viene en tu estado de cuenta.' : 'Compara el saldo y la tasa con tu estado de cuenta.',
          editable ? (K.cargosSugeridos ? boton('Usar ' + money(K.cargosSugeridos), 'prCargosUsar(\'' + p.d.id + '\',' + K.cargosSugeridos + ')') : '') + boton('Corregir mis datos', 'MEDIDORES.abre(\'de-datos\')', 1) : '', 'alto')
        : s1 ? hoy('Sigue', 'El <b>' + prDia(s1.q.siguiente) + '</b> pagas <b>' + money(+s1.d.min) + '</b> de ' + esc(s1.d.name) + '.', 'La mensualidad se anota sola.' + (sa ? ' Tu plan abona ' + money(sa.auto) + ' a capital el ' + diaTxt(sa.fecha) + ' de ' + sa.fecha.slice(0, 4) + ': ese abono lo anotas tú.' : ''), '') : '') +
      '<div class="kv-fila crece">' + (p ? '<section class="kv-c s6"><h3>Cuánto debes, mes a mes</h3><p>Todas tus deudas juntas: con tu plan y pagando solo la mensualidad. Mueve los controles para ver qué cambia un abono de más.</p>' + grafica('deuda') + leyenda([['Solo la mensualidad', V.g, 'l'], ['Tu plan', V.a, 'l'], ['Tu plan y tus abonos', V.b, 'l']]) + '</section>' +
        '<section class="kv-c s3"><h3>¿Y si abono de más?</h3><p>Encima de tu plan, en ' + esc(p.d.name) + ', la que cobra más: ' + p.d.rate + '% al año.</p>' +
          '<div class="kv-sl"><label for="kvs-ie">Abono hoy</label><output id="kvs-e"></output><input id="kvs-ie" type="range" min="0" max="' + Math.min(100000, Math.floor(p.d.balance / 1000) * 1000) + '" step="1000" value="' + sim.extra + '" oninput="MEDIDORES.simula(\'extra\',this.value)"></div>' +
          '<div class="kv-sl"><label for="kvs-im">Extra cada mes</label><output id="kvs-m"></output><input id="kvs-im" type="range" min="0" max="5000" step="250" value="' + sim.mes + '" oninput="MEDIDORES.simula(\'mes\',this.value)"></div>' +
          '<div class="kv-res uno" id="kvs-r"></div>' + (editable ? boton('Anotar el abono de hoy', 'MEDIDORES.llevarAbono()') : '') +
          '<div class="kv-pie">Lo abonado ya no se puede sacar: tu plan empieza cuando el colchón está completo, el ' + C().v('colchonFecha') + '.</div></section>' : '') + '<div class="kv-col ' + (p ? 's3' : 's12') + '">' + ds.map(d => { const q = C().cuotas(d), pr = L.filter(z => z.d === d)[0], pg = pct((+d.total || 0) - d.balance, +d.total || 0);
        return caja('kv-deu', esc(d.name), d.rate > 0 && tasaQueCorre(d) > 0 ? d.rate + '% al año' : 'Sin intereses', '<b class="n">' + money(+d.balance) + '</b>' + med(pg, V.a) +
          '<p class="kv-p" style="margin-top:9px"><b>' + Math.round(pg) + '%</b> pagado' + (+d.total ? ' de ' + money(+d.total) : '') + '</p>', (q.siguiente ? 'Próximo pago: <b>' + prDia(q.siguiente) + ', ' + money(+d.min) + '</b>' + (pr ? ' (' + money(pr.R.interesSig) + ' de interés)' : '') + '.' : '') + (pr && d.id === 'd003' && PA.cero ? ' Con tu plan queda en cero el <b>' + C().v('autoCero') + '</b>.' : q.ultima ? ' Acabas en <b>' + prMes(q.ultima) + '</b>, ' + plural(q.restantes, 'pago más', 'pagos más') + '.' : '')); }).join('') + '</div></div>' +
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
