/* ══ leccion.js — lo que la plantilla de las lecciones necesita además de su CSS (styles.css) ══

   1. En pantalla ancha la práctica vive en un panel fijo (.lec-practica) con su propio scroll. Un
      enlace a algo que está dentro del panel —sus chips, «Práctica · N bloques» del encabezado o un
      enlace directo como k10-03-perfekt-uben.html#minitest— mueve el panel hasta el bloque, y la
      página solo lo necesario para que el panel quede completo a la vista. Sin esto, el navegador
      bajaba la página entera y la cabecera del panel se escondía bajo la barra.

   2. En las lecciones del Kapitel 10, «Tu avance en esta lección», al final de la explicación: cada
      bloque de práctica con lo que llevas, de aleman_k10_v1 (lo que guarda k10-interactivo.js y lee
      el inicio, con la misma regla: un ejercicio está completo cuando tiene todos sus reactivos bien).
      Los ejercicios de cada bloque los da k10Ejercicios(); un bloque completo marca su chip.

   3. Dentro de la ventana del Dashboard (Mi Día → Hoy aprendes → Alemán), que abre la lección en un
      iframe: pone `.embebida` en <html> —styles.css quita la barra, «Anterior/Siguiente», el pie y la
      brújula—, un enlace a otra página se lo pide a la ventana, que abre ahí otra lección o, si no es
      lección, la abre aparte, y Escape cierra la ventana. Si el Dashboard va en oscuro (`coach-theme`), carga
      oscuro.js y la página se pinta en oscuro; cambia con él.

   Sin dependencias. Va al final del <body>, después de los scripts de la lección.
   ══════════════════════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  /* ── 3. Dentro de la ventana del Dashboard ── */
  var dentro = false;
  try { dentro = window.self !== window.top; } catch (e) { dentro = true; }
  if (!dentro) return;
  document.documentElement.classList.add('embebida');
  // El tema del Dashboard, con su misma regla: lo guardado o, si nada, el del sistema.
  var aqui = ((document.currentScript && document.currentScript.src) || '').replace(/[^\/]*$/, '');
  function tema() {
    var t = null;
    try { t = localStorage.getItem('coach-theme'); } catch (e) { /* sin almacenamiento, el del sistema */ }
    return t || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }
  function oscuro() {
    if (window.ALEMAN_OSCURO) { window.ALEMAN_OSCURO.aplicar(tema() === 'dark'); return; }
    if (tema() !== 'dark') return;
    var s = document.createElement('script');
    s.src = aqui + 'oscuro.js';
    s.onload = function () { window.ALEMAN_OSCURO.aplicar(tema() === 'dark'); };
    document.head.appendChild(s);
  }
  oscuro();
  window.addEventListener('storage', function (e) { if (e.key === 'coach-theme' || e.key === null) oscuro(); });
  function avisa(m) { m.aleman = 1; try { window.parent.postMessage(m, '*'); } catch (e) { /* sin ventana, nada */ } }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || e.defaultPrevented) return;
    var href = a.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#' || /^(javascript|mailto|tel):/i.test(href)) return;
    if (/^https?:/i.test(href)) { a.target = '_blank'; a.rel = 'noopener'; return; }
    e.preventDefault();
    avisa({ tipo: 'abrir', href: href });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') avisa({ tipo: 'cerrar' }); });
})();

(function () {
  'use strict';
  var panel = document.querySelector('.lec-practica');
  if (!panel) return;

  /* ── 1. Los enlaces al panel ── */
  function fijo() { return getComputedStyle(panel).position === 'sticky'; }
  function cabecera() { var c = panel.querySelector('.lec-practica-cab'); return c ? c.offsetHeight : 0; }

  function ir(id, suave) {
    var el = id && document.getElementById(id);
    if (!el || !fijo() || (el !== panel && !panel.contains(el))) return false;
    var modo = suave ? 'smooth' : 'auto';
    var dy = panel.getBoundingClientRect().top - (parseFloat(getComputedStyle(panel).top) || 0);
    if (Math.abs(dy) > 1) window.scrollTo({ top: window.scrollY + dy, behavior: modo });
    // Si el destino está al principio de un bloque (#minitest, debajo de su título), se va al bloque.
    var bloque = el === panel ? null : el.closest('.lec-practica > .content-full');
    if (bloque && el.getBoundingClientRect().top - bloque.getBoundingClientRect().top < 240) el = bloque;
    var y = el === panel ? 0 :
      el.getBoundingClientRect().top - panel.getBoundingClientRect().top + panel.scrollTop - cabecera() - 12;
    panel.scrollTo({ top: Math.max(0, y), behavior: modo });
    return true;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var id = decodeURIComponent(a.getAttribute('href').slice(1));
    if (ir(id, true)) { e.preventDefault(); history.replaceState(null, '', '#' + id); }
  });
  function alHash() { if (location.hash) ir(decodeURIComponent(location.hash.slice(1)), false); }
  window.addEventListener('hashchange', alHash);
  if (document.readyState === 'complete') setTimeout(alHash, 0);
  else window.addEventListener('load', function () { setTimeout(alHash, 0); });

  /* ── 2. Tu avance en esta lección (Kapitel 10) ── */
  if (typeof window.k10Ejercicios !== 'function') return;
  var explica = document.querySelector('.lec-explica');
  var bloques = [].slice.call(panel.children).filter(function (b) { return b.id && b.classList.contains('content-full'); });
  var regs = window.k10Ejercicios();
  if (!explica || !bloques.length || !regs.length) return;

  // Cada ejercicio, en el bloque que contiene su caja.
  var porBloque = bloques.map(function (b) {
    var chip = panel.querySelector('.lec-chips a[href="#' + b.id + '"]');
    return {
      b: b, chip: chip, nombre: chip ? chip.textContent : b.id,
      claves: regs.filter(function (r) { var c = document.getElementById(r.caja); return c && b.contains(c); })
                  .map(function (r) { return r.clave; })
    };
  }).filter(function (x) { return x.claves.length; });
  if (!porBloque.length) return;

  var caja = document.createElement('div');
  caja.className = 'content-full lec-avance-caja';
  caja.innerHTML = '<div class="card"><h3>Tu avance en esta lección</h3>' +
    '<p class="lec-avance-res"></p><ol class="lec-avance"></ol></div>';
  explica.appendChild(caja);
  var lista = caja.querySelector('.lec-avance');
  porBloque.forEach(function (x) {
    var li = document.createElement('li');
    li.innerHTML = '<a href="#' + x.b.id + '"><span class="lec-avance-n"></span>' +
      '<span class="lec-avance-b"><i></i></span><span class="lec-avance-c"></span></a>';
    li.querySelector('.lec-avance-n').textContent = x.nombre;
    lista.appendChild(li);
    x.li = li;
  });

  function datos() {
    try { return JSON.parse(localStorage.getItem('aleman_k10_v1')) || {}; } catch (e) { return {}; }
  }
  function hace(f) {
    var d = new Date(), h = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var p = String(f).split('-'), dia = new Date(+p[0], +p[1] - 1, +p[2]);
    var n = Math.round((h - dia) / 86400000);
    return n <= 0 ? 'hoy' : n === 1 ? 'ayer' : 'hace ' + n + ' días';
  }
  function pinta() {
    var d = datos(), completos = 0, total = 0, ultima = '';
    porBloque.forEach(function (x) {
      var hechos = 0, parcial = 0;
      x.claves.forEach(function (k) {
        var e = d[k];
        if (!e || !e.total) return;
        if (e.fecha && e.fecha > ultima) ultima = e.fecha;
        if (e.hechos >= e.total) hechos++;
        parcial += Math.min(1, e.hechos / e.total);
      });
      completos += hechos; total += x.claves.length;
      var lleno = hechos === x.claves.length;
      x.li.classList.toggle('lleno', lleno);
      x.li.querySelector('i').style.width = Math.round(parcial / x.claves.length * 100) + '%';
      x.li.title = hechos + ' de ' + x.claves.length + (x.claves.length === 1 ? ' ejercicio completo' : ' ejercicios completos');
      var pct = Math.round(parcial / x.claves.length * 100);
      x.li.querySelector('.lec-avance-c').textContent = lleno ? 'completo' : pct ? pct + ' %' : 'sin empezar';
      if (x.chip) x.chip.classList.toggle('hecho', lleno);
    });
    var res = caja.querySelector('.lec-avance-res');
    res.innerHTML = '<b>' + completos + ' de ' + total + '</b> ejercicios completos';
    if (ultima) {
      var t = document.createElement('span');
      var dias = Math.round((new Date(new Date().toDateString()) - new Date(ultima.replace(/-/g, '/'))) / 86400000);
      t.className = dias > 2 ? 'tarde' : '';
      t.textContent = ' · practicaste ' + hace(ultima);
      res.appendChild(t);
    }
  }
  pinta();
  var espera;
  ['click', 'input', 'change'].forEach(function (ev) {
    panel.addEventListener(ev, function () { clearTimeout(espera); espera = setTimeout(pinta, 120); });
  });
})();
