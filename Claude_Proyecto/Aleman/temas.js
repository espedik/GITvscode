/* ══ temas.js — pinta un tema de gramática a fondo desde su contenido (window.TEMA) ══

   Lo usan preposiciones.html, verbos.html, adjetivos.html y frase.html: cada una trae su TEMA y este archivo arma el
   encabezado, las pestañas, cada panel y la práctica, con el diseño de temas.css. Una pestaña a la vez; el ancla abre la
   suya (preposiciones.html#dativ). La práctica guarda la última y la mejor ronda en `TEMA.clave` —el Dashboard la lee
   para decirlo en su pestaña—.

   TEMA = {
     clave, ronda,                                   la clave de localStorage y cuántas frases por ronda
     hero: { k, h1, lead, frase: [alemán, español] }, h1 admite <em>; en la frase, [corchetes] = lo que se subraya
     tabs: [{ k, t, sub, c, alias:[], h2, p,         la pestaña: su clave, nombre, detalle (al pasar el cursor), color y otros nombres del ancla
              grupos: [{ t, p, c, chips: [[de, es]] }], un mapa de un vistazo
              pasos: [[título, texto]],               los pasos para decidir
              ficha: [{ lbl, preg:[grande, chico] | chips:[[de, es]] | tabla:{ cab:[], filas:[[]], de:[cols] } | de:'texto' | txt:'texto', nota }],
              reglas: [{ t, de, sub, d, ej: [[de, es]], nota }], dos: true para dos columnas,
              tablas: [{ lbl, cab:[], filas:[[]] o ['— separador —'], de:[cols], buscar:true, nota }],
              ojo: [[mal, bien, porqué]] }],
     practica: [[frase con ___, [opciones; la primera es la correcta], porqué, español]]
   }
   En cualquier texto en alemán, lo que va entre [corchetes] sale subrayado en el color de su pestaña. */
(function () {
  'use strict';
  var T = window.TEMA; if (!T) return;
  var RONDA = T.ronda || 12;

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function marca(s) { return esc(s).replace(/\[([^\]]+)\]/g, '<mark>$1</mark>'); }
  // El texto en español admite negritas con **…**. Una terminación (-en, -er, -es) no se parte al final del renglón.
  function txt(s) { return esc(s).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/(^|[\s(«/>])(-[a-zäöüß]+)/gi, '$1<span class="nw">$2</span>'); }
  function ejHtml(e) { return '<div class="cs-ej"><span class="de" lang="de">' + marca(e[0]) + '</span><span class="es">' + txt(e[1]) + '</span></div>'; }
  function leer() { try { return JSON.parse(localStorage.getItem(T.clave) || '{}') || {}; } catch (e) { return {}; } }
  function guardar(o) { try { localStorage.setItem(T.clave, JSON.stringify(o)); } catch (e) { /* sin almacenamiento, sin récord */ } }
  function sinAcento(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss'); }

  /* ── Las piezas de un panel ── */
  function celdas(f, de) { return f.map(function (x, j) { var d = de && de.indexOf(j) >= 0; return '<td' + (d ? ' class="de" lang="de"' : '') + '>' + (d ? marca(x) : txt(x)) + '</td>'; }).join(''); }
  function tablaChica(t) {
    return '<table class="cs-t">' + (t.cab ? '<thead><tr>' + t.cab.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead>' : '') +
      '<tbody>' + t.filas.map(function (f) { return '<tr>' + celdas(f, t.de) + '</tr>'; }).join('') + '</tbody></table>';
  }
  function chips(L) { return '<div class="cs-chips">' + L.map(function (p) { return '<span class="cs-chip"><span lang="de">' + esc(p[0]) + '</span>' + (p[1] ? '<small>' + esc(p[1]) + '</small>' : '') + '</span>'; }).join('') + '</div>'; }
  function tarjeta(c) {
    return '<div class="cs-card"><div class="cs-lbl">' + esc(c.lbl) + '</div>' +
      (c.preg ? '<div class="cs-preg"><b lang="de">' + esc(c.preg[0]) + '</b><span>' + txt(c.preg[1]) + '</span></div>' : '') +
      (c.chips ? chips(c.chips) : '') + (c.tabla ? tablaChica(c.tabla) : '') +
      (c.de ? '<div class="cs-txt" lang="de">' + marca(c.de) + '</div>' : '') + (c.txt ? '<div class="cs-nota" style="margin-top:0">' + txt(c.txt) + '</div>' : '') +
      (c.nota ? '<div class="cs-nota">' + txt(c.nota) + '</div>' : '') + '</div>';
  }
  function regla(r, i) {
    return '<article class="cs-regla"' + (r.c ? ' style="--c:' + r.c + '"' : '') + '><h3>' + (r.de ? '<b lang="de">' + esc(r.de) + '</b>' + (r.t ? ' ' + esc(r.t) : '') : '<em>' + (i + 1) + '</em>' + esc(r.t)) +
      (r.sub ? ' <small>' + esc(r.sub) + '</small>' : '') + '</h3>' + (r.d ? '<p>' + txt(r.d) + '</p>' : '') + (r.ej || []).map(ejHtml).join('') +
      (r.nota ? '<div class="cs-nota">' + txt(r.nota) + '</div>' : '') + '</article>';
  }
  var nTabla = 0;
  function tablaGrande(t) {
    var id = 'tmT' + (++nTabla);
    return '<div class="tm-tabla"><div class="tm-tabla-cab"><div class="cs-lbl">' + esc(t.lbl || '') + '</div>' +
      (t.buscar ? '<input class="tm-buscar" type="search" placeholder="Buscar en alemán o en español…" aria-label="Buscar" oninput="TEMA_buscar(\'' + id + '\',this.value)">' : '') + '</div>' +
      '<div class="tm-wrap"><table class="tm-t" id="' + id + '"><thead><tr>' + t.cab.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      t.filas.map(function (f) { return typeof f === 'string' ? '<tr class="sep"><td colspan="' + t.cab.length + '">' + esc(f) + '</td></tr>' : '<tr>' + celdas(f, t.de) + '</tr>'; }).join('') +
      '</tbody></table><div class="tm-vacio" hidden>Nada con eso. Prueba con menos letras.</div></div>' + (t.nota ? '<div class="cs-nota">' + txt(t.nota) + '</div>' : '') + '</div>';
  }
  window.TEMA_buscar = function (id, q) {
    var t = document.getElementById(id); if (!t) return;
    var s = sinAcento(q.trim()), vistos = 0, sep = null, sepVis = false;
    [].forEach.call(t.tBodies[0].rows, function (tr) {
      if (tr.classList.contains('sep')) { if (sep) sep.hidden = !!s && !sepVis; sep = tr; sepVis = false; return; }
      var ok = !s || sinAcento(tr.textContent).indexOf(s) >= 0; tr.hidden = !ok; if (ok) { vistos++; sepVis = true; }
    });
    if (sep) sep.hidden = !!s && !sepVis;
    t.parentNode.querySelector('.tm-vacio').hidden = vistos > 0;
  };
  function ojo(L) {
    return '<section class="cs-ojo"><h3>⚠️ Los errores típicos</h3>' + L.map(function (o) {
      return '<div class="cs-mal"><span class="x" lang="de">' + esc(o[0]) + '</span><span class="ok" lang="de">' + esc(o[1]) + '</span><span class="por">' + txt(o[2]) + '</span></div>';
    }).join('') + '</section>';
  }
  function panel(P) {
    var arriba = (P.pasos ? '<div class="cs-pasos" style="--n:' + Math.min(4, P.pasos.length) + '">' + P.pasos.map(function (p, i) { return '<div class="cs-paso"><b>' + (i + 1) + '</b><h3>' + esc(p[0]) + '</h3><p>' + txt(p[1]) + '</p></div>'; }).join('') + '</div>' : '') +
      (P.grupos ? '<div class="tm-grupos" style="--n:' + Math.min(4, P.grupos.length) + '">' + P.grupos.map(function (g) {
        return '<div class="tm-grupo" style="--g:' + g.c + '"><h3>' + esc(g.t) + '</h3>' + (g.p ? '<p>' + txt(g.p) + '</p>' : '') + chips(g.chips) + '</div>'; }).join('') + '</div>' : '');
    var cuerpo = (P.reglas ? '<div class="cs-reglas' + (P.dos ? ' dos' : '') + '">' + P.reglas.map(regla).join('') + '</div>' : '') +
      (P.tablas || []).map(tablaGrande).join('') + (P.ojo ? ojo(P.ojo) : '');
    var todo = P.ficha ? '<div class="cs-grid"><aside class="cs-ficha">' + P.ficha.map(tarjeta).join('') + '</aside><div class="cs-col">' + cuerpo + '</div></div>'
      : '<div class="cs-col">' + cuerpo + '</div>';
    return '<section class="cs-panel" data-tab="' + P.k + '" style="--c:' + P.c + '"><div class="cs-cab"><h2>' + esc(P.h2 || P.t) + '</h2>' + (P.p ? '<p>' + txt(P.p) + '</p>' : '') + '</div>' + arriba + todo + '</section>';
  }

  /* ── La práctica ── */
  var PR = null;
  function barajar(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function nuevaRonda() {
    PR = { items: barajar(T.practica).slice(0, RONDA).map(function (it) {
      return { it: it, ops: barajar(it[1].map(function (o, i) { return { o: o, ok: i === 0 }; })), r: null };
    }), i: 0 };
    pintarPractica();
  }
  function responder(n) { var q = PR && PR.items[PR.i]; if (!q || q.r !== null || !q.ops[n]) return; q.r = n; pintarPractica(); }
  function siguiente() {
    if (!PR || PR.items[PR.i].r === null) return;
    PR.i++;
    if (PR.i >= PR.items.length) {
      var bien = PR.items.filter(function (q) { return q.ops[q.r].ok; }).length, d = leer(), h = new Date();
      d.ultimo = bien; d.de = PR.items.length; d.mejor = Math.max(d.mejor || 0, bien); d.rondas = (d.rondas || 0) + 1;
      d.fecha = h.getFullYear() + '-' + String(h.getMonth() + 1).padStart(2, '0') + '-' + String(h.getDate()).padStart(2, '0');
      guardar(d);
    }
    pintarPractica();
  }
  function pintarPractica() {
    var el = document.getElementById('csPractica'); if (!el) return;
    if (!PR) { nuevaRonda(); return; }
    var d = leer();
    if (PR.i >= PR.items.length) {
      var mal = PR.items.filter(function (q) { return !q.ops[q.r].ok; }), n = PR.items.length - mal.length;
      el.innerHTML = '<div class="cs-pr-card cs-pr-fin"><h3>' + n + ' de ' + PR.items.length + '</h3><p>' + (mal.length ? 'Repasa estas, con su regla:' : 'Todas a la primera.') + '</p>' +
        (mal.length ? '<ul>' + mal.map(function (q) { return '<li><b lang="de">' + esc(q.it[0].replace('___', q.it[1][0])) + '</b> — ' + txt(q.it[2]) + '</li>'; }).join('') + '</ul>' : '') +
        '<button class="cs-pr-sig" type="button" onclick="TEMA_ronda()">Otra ronda</button>' +
        '<div class="cs-pr-mejor">Tu mejor ronda: ' + (d.mejor || 0) + ' de ' + RONDA + ' · rondas hechas: ' + (d.rondas || 0) + '</div></div>';
      return;
    }
    var q = PR.items[PR.i], resp = q.r !== null, ok = resp && q.ops[q.r].ok, partes = q.it[0].split('___'), nOps = q.ops.length;
    var hueco = '<span class="hueco' + (resp ? (ok ? ' bien' : ' mal') : '') + '">' + (resp ? esc(q.ops[q.r].o) : '…') + '</span>';
    el.innerHTML = '<div class="cs-pr-card"><div class="cs-pr-top"><span>Frase ' + (PR.i + 1) + ' de ' + PR.items.length + '</span><span>Teclas 1 a ' + nOps + ' y Enter</span></div>' +
      '<div class="cs-pr-bar"><i style="width:' + (PR.i / PR.items.length * 100) + '%"></i></div>' +
      '<div class="cs-pr-f" lang="de">' + esc(partes[0]) + hueco + esc(partes[1] || '') + '</div><div class="cs-pr-es">' + esc(q.it[3]) + '</div>' +
      '<div class="cs-pr-ops">' + q.ops.map(function (o, i) {
        var cls = resp ? (o.ok ? 'bien' : (i === q.r ? 'mal' : '')) : '';
        return '<button type="button" class="' + cls + '"' + (resp ? ' disabled' : '') + ' onclick="TEMA_responder(' + i + ')" lang="de">' + esc(o.o || '—') + '<small>' + (i + 1) + '</small></button>';
      }).join('') + '</div>' +
      (resp ? '<div class="cs-pr-por ' + (ok ? 'bien' : 'mal') + '">' + (ok ? '✓ Bien. ' : '✗ Es <b lang="de">' + esc(q.it[1][0] || '—') + '</b>. ') + txt(q.it[2]) + '</div>' +
        '<button class="cs-pr-sig" type="button" onclick="TEMA_siguiente()">' + (PR.i === PR.items.length - 1 ? 'Ver resultado' : 'Siguiente') + '</button>' : '') + '</div>';
  }
  window.TEMA_ronda = nuevaRonda; window.TEMA_responder = responder; window.TEMA_siguiente = siguiente;
  document.addEventListener('keydown', function (e) {
    var pr = document.querySelector('.cs-panel[data-tab="practica"]');
    if (!pr || !pr.classList.contains('on') || !PR || PR.i >= PR.items.length || /input|textarea/i.test((e.target || {}).tagName || '')) return;
    if (/^[1-9]$/.test(e.key)) responder(+e.key - 1);
    else if (e.key === 'Enter') siguiente();
  });

  /* ── Las pestañas ── */
  var TABS = T.tabs.concat([{ k: 'practica', t: 'Practica', sub: RONDA + ' frases', c: '#1a1a1a' }]);
  function ver(k, sinAncla) {
    k = String(k || '').toLowerCase();
    var t = TABS.filter(function (x) { return x.k === k || (x.alias || []).indexOf(k) >= 0; })[0] || TABS[0];
    document.querySelectorAll('.cs-panel').forEach(function (p) { p.classList.toggle('on', p.dataset.tab === t.k); });
    document.querySelectorAll('.cs-tab').forEach(function (b) { var on = b.dataset.tab === t.k; b.classList.toggle('on', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
    if (t.k === 'practica' && !PR) nuevaRonda();
    if (!sinAncla) { try { history.replaceState(null, '', '#' + t.k); } catch (e) { /* file:// sin historial */ } }
    window.scrollTo(0, 0);
  }
  window.TEMA_ver = ver;
  var H = T.hero || {};
  document.getElementById('csHero').innerHTML = '<div class="cs-in"><div class="cs-k">' + esc(H.k || '') + '</div><h1>' + (H.h1 || '') + '</h1>' +
    (H.lead ? '<p class="cs-lead">' + txt(H.lead) + '</p>' : '') +
    (H.frase ? '<div class="cs-frase" lang="de">' + marca(H.frase[0]) + ' <small lang="es">' + esc(H.frase[1]) + '</small></div>' : '') + '</div>';
  document.getElementById('csTabs').innerHTML = TABS.map(function (t) {
    // Solo el nombre: con su detalle, once pestañas ocupaban tres filas fijas a 1600 px. El detalle va al pasar el cursor.
    return '<button type="button" class="cs-tab" role="tab" data-tab="' + t.k + '" style="--c:' + t.c + '"' + (t.sub ? ' title="' + esc(t.sub) + '"' : '') + ' onclick="TEMA_ver(\'' + t.k + '\')"><i></i>' + esc(t.t) + '</button>';
  }).join('');
  document.getElementById('csMain').innerHTML = T.tabs.map(panel).join('') +
    '<section class="cs-panel" data-tab="practica" style="--c:#1a1a1a"><div class="cs-cab"><h2>Practica</h2><p>' + RONDA + ' frases al azar de ' + T.practica.length +
    ': elige la forma correcta y lee el porqué. Cada ronda cambia.</p></div><div class="cs-pr" id="csPractica"></div></section>';
  ver((location.hash || '').slice(1), true);
})();
