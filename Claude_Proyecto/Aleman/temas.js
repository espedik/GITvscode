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
              ficha: [{ lbl, preg:[grande, chico] | chips:[[de, es]] | tabla:{ cab:[], filas:[[]], de:[cols], colores:[] } | de:'texto' | txt:'texto', nota }],
                                                      tarjetas de consulta, arriba y lado a lado
              reglas: [{ t, de, d, ej: [[de, es]], nota }], col, lblReglas,
                                                      una tabla: la palabra (de) o la regla (t), para qué (d, nota), y una fila
                                                      por ejemplo; `col` nombra la primera columna (Preposición, Verbo…)
              tablas: [{ lbl, cab:[], filas:[[]] o ['— separador —'], de:[cols], colores:[], buscar:true, nota }],
              ojo: [[mal, bien, porqué]] }],             los errores típicos, en tabla: así no · así sí · por qué
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
  function leer() { try { return JSON.parse(localStorage.getItem(T.clave) || '{}') || {}; } catch (e) { return {}; } }
  function guardar(o) { try { localStorage.setItem(T.clave, JSON.stringify(o)); } catch (e) { /* sin almacenamiento, sin récord */ } }
  function sinAcento(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss'); }

  /* ── Las piezas de un panel ── */
  // `colores`: un color por columna (el del género, como en la tabla de los casos): tiñe su encabezado y lo subrayado.
  function celdas(f, de, col) {
    return f.map(function (x, j) {
      var d = de && de.indexOf(j) >= 0, c = col && col[j];
      return '<td' + (d ? ' class="de" lang="de"' : '') + (c ? ' style="--c:' + c + '"' : '') + '>' + (d ? marca(x) : txt(x)) + '</td>';
    }).join('');
  }
  function cabecera(cab, col) { return '<thead><tr>' + cab.map(function (c, j) { return '<th' + (col && col[j] ? ' style="color:' + col[j] + '"' : '') + '>' + esc(c) + '</th>'; }).join('') + '</tr></thead>'; }
  function tablaChica(t) {
    return '<table class="cs-t">' + (t.cab ? cabecera(t.cab, t.colores) : '') +
      '<tbody>' + t.filas.map(function (f) { return '<tr>' + celdas(f, t.de, t.colores) + '</tr>'; }).join('') + '</tbody></table>';
  }
  function chips(L) { return '<div class="cs-chips">' + L.map(function (p) { return '<span class="cs-chip"><span lang="de">' + esc(p[0]) + '</span>' + (p[1] ? '<small>' + esc(p[1]) + '</small>' : '') + '</span>'; }).join('') + '</div>'; }
  function tarjeta(c) {
    return '<div class="cs-card"><div class="cs-lbl">' + esc(c.lbl) + '</div>' +
      (c.preg ? '<div class="cs-preg"><b lang="de">' + esc(c.preg[0]) + '</b><span>' + txt(c.preg[1]) + '</span></div>' : '') +
      (c.chips ? chips(c.chips) : '') + (c.tabla ? tablaChica(c.tabla) : '') +
      (c.de ? '<div class="cs-txt" lang="de">' + marca(c.de) + '</div>' : '') + (c.txt ? '<div class="cs-nota" style="margin-top:0">' + txt(c.txt) + '</div>' : '') +
      (c.nota ? '<div class="cs-nota">' + txt(c.nota) + '</div>' : '') + '</div>';
  }
  /* Las reglas, en una tabla (Adán, 26-nov-2026: "lo quiero de mejor formato en forma de tabla, así como en el subtab de
     casos"): una fila por ejemplo y, a la izquierda, la palabra o la regla con su explicación, que abarcan sus ejemplos.
     Cada regla es su propio <tbody>, separado del siguiente. En el teléfono, cada celda baja a su renglón. */
  function reglasTabla(P) {
    var R = P.reglas, conDe = R.every(function (r) { return r.de; }), conD = R.some(function (r) { return r.d || r.nota; });
    var cab = [P.col || (conDe ? 'Palabra' : 'La regla')].concat(conD ? ['Para qué'] : [], ['Ejemplo', 'En español']);
    var cuerpo = R.map(function (r, i) {
      var ej = r.ej && r.ej.length ? r.ej : [['', '']], n = ej.length;
      var k = r.de ? '<b lang="de">' + esc(r.de) + '</b>' + (r.t ? '<small>' + esc(r.t.replace(/^—\s*/, '')) + '</small>' : '')
        : '<em>' + (i + 1) + '</em><span>' + esc(r.t) + '</span>';
      var d = (r.d ? txt(r.d) : '') + (r.nota ? '<div class="cs-nota">' + txt(r.nota) + '</div>' : '');
      return '<tbody' + (r.c ? ' style="--c:' + r.c + '"' : '') + '>' + ej.map(function (e, j) {
        return '<tr>' + (j ? '' : '<td class="tm-rk" rowspan="' + n + '">' + k + '</td>' + (conD ? '<td class="tm-rd" rowspan="' + n + '">' + d + '</td>' : '')) +
          '<td class="de" lang="de">' + marca(e[0]) + '</td><td class="es">' + txt(e[1]) + '</td></tr>';
      }).join('') + '</tbody>';
    }).join('');
    return '<div class="tm-tabla tm-reglas"><div class="tm-tabla-cab"><div class="cs-lbl">' + esc(P.lblReglas || (conDe ? 'Una por una, con sus usos y ejemplos' : 'Las reglas, con ejemplos')) + '</div></div>' +
      '<div class="tm-wrap"><table class="tm-t tm-rt' + (conD ? '' : ' sin-d') + '"><thead><tr>' + cab.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead>' +
      cuerpo + '</table></div></div>';
  }
  var nTabla = 0;
  function tablaGrande(t) {
    var id = 'tmT' + (++nTabla);
    return '<div class="tm-tabla"><div class="tm-tabla-cab"><div class="cs-lbl">' + esc(t.lbl || '') + '</div>' +
      (t.buscar ? '<input class="tm-buscar" type="search" placeholder="Buscar en alemán o en español…" aria-label="Buscar" oninput="TEMA_buscar(\'' + id + '\',this.value)">' : '') + '</div>' +
      '<div class="tm-wrap"><table class="tm-t" id="' + id + '">' + cabecera(t.cab, t.colores) + '<tbody>' +
      t.filas.map(function (f) { return typeof f === 'string' ? '<tr class="sep"><td colspan="' + t.cab.length + '">' + esc(f) + '</td></tr>' : '<tr>' + celdas(f, t.de, t.colores) + '</tr>'; }).join('') +
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
    return '<section class="cs-ojo"><h3>⚠️ Los errores típicos</h3><table class="tm-ojo"><thead><tr><th>Así no</th><th>Así sí</th><th>Por qué</th></tr></thead><tbody>' + L.map(function (o) {
      return '<tr><td class="x" lang="de">' + esc(o[0]) + '</td><td class="ok" lang="de">' + esc(o[1]) + '</td><td class="por">' + txt(o[2]) + '</td></tr>';
    }).join('') + '</tbody></table></section>';
  }
  function panel(P) {
    var arriba = (P.pasos ? '<div class="cs-pasos" style="--n:' + Math.min(4, P.pasos.length) + '">' + P.pasos.map(function (p, i) { return '<div class="cs-paso"><b>' + (i + 1) + '</b><h3>' + esc(p[0]) + '</h3><p>' + txt(p[1]) + '</p></div>'; }).join('') + '</div>' : '') +
      (P.grupos ? '<div class="tm-grupos" style="--n:' + Math.min(4, P.grupos.length) + '">' + P.grupos.map(function (g) {
        return '<div class="tm-grupo" style="--g:' + g.c + '"><h3>' + esc(g.t) + '</h3>' + (g.p ? '<p>' + txt(g.p) + '</p>' : '') + chips(g.chips) + '</div>'; }).join('') + '</div>' : '');
    var cuerpo = (P.reglas ? reglasTabla(P) : '') + (P.tablas || []).map(tablaGrande).join('') + (P.ojo ? ojo(P.ojo) : '');
    // La ficha va arriba, en tarjetas lado a lado, para que las tablas tengan todo el ancho (dentro del Dashboard la
    // tabla de consulta fija va a la izquierda de la página).
    var todo = (P.ficha ? '<div class="tm-fichas">' + P.ficha.map(tarjeta).join('') + '</div>' : '') + '<div class="cs-col">' + cuerpo + '</div>';
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
