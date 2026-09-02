/* ════════════════════════════════════════════════════════════════════════════
   embed.js — una app de la suite, vista desde dentro del shell

   Las cuatro apps externas (salud, ejercicio, comida, vestimenta) se cargan en
   un iframe de `cuidadopersonal.html`. Cada una traía su propio carril de
   245 px y su propia cabecera de 58 px, que se apilaban sobre las del shell:
   120 px de chrome antes del contenido y dos botones de tema en pantalla.

   Con `?embed=1` la app se calla ese chrome y deja que lo pinte el shell.

   Por qué postMessage y no tocar el DOM del iframe: abiertas con `file://`,
   Chrome trata cada archivo como un origen distinto, así que el shell NO puede
   leer ni escribir dentro del iframe. Se midió: `contentDocument` es null.
   postMessage sí cruza, y es el único canal que cruza.

   Protocolo, todo con `{fuente:'cp'}` para no confundirlo con otros mensajes:
     app  → shell   {tipo:'listo',    secciones:[{id,n}], activa}
     app  → shell   {tipo:'seccion',  activa}          (navegó por su cuenta)
     shell → app    {tipo:'ir',       seccion}
     shell → app    {tipo:'tema',     tema}
   ════════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var EMBEBIDA = new URLSearchParams(location.search).get('embed') === '1';
  if (!EMBEBIDA) return;                       // abierta sola: no cambia nada

  document.documentElement.classList.add('embebida');

  // ── El chrome que ahora pone el shell ───────────────────────────────────
  var CSS =
    'html.embebida .sidebar{display:none!important}' +
    'html.embebida .topbar{display:none!important}' +
    'html.embebida body{display:block!important}' +
    // El hueco del carril lo deja `.main`, no `.content`: las cuatro apps usan
    // `.main{margin-left:var(--sw)}` con --sw a 245px.
    'html.embebida .main{margin-left:0!important}' +
    /* El shell ya pinta el fondo; el de la app taparía su vidrio. */
    'html.embebida body{background:transparent!important}';
  var st = document.createElement('style');
  st.id = 'cp-embed';
  st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);

  // ── Las secciones de esta app, leídas de su propio carril ───────────────
  // El sidebar es la fuente: si mañana se añade una sección, aparece sola en
  // la barra del shell sin tocar este archivo ni el del shell.
  function secciones() {
    var out = [];
    var vistos = {};
    var nodos = document.querySelectorAll('[onclick^="nav("]');
    for (var i = 0; i < nodos.length; i++) {
      var oc = nodos[i].getAttribute('onclick') || '';
      var m = oc.match(/nav\(\s*['"]([^'"]+)['"]/);
      if (!m || vistos[m[1]]) continue;
      vistos[m[1]] = 1;
      // El texto sin el icono ni el contador: el shell dibuja sus propios iconos,
      // y el badge de conteo pegaba "Desayunos10" en el nombre.
      var c = nodos[i].cloneNode(true);
      var quita = c.querySelectorAll('.ico,.count,.badge,.pill,svg,img');
      for (var q = 0; q < quita.length; q++) quita[q].remove();
      var t = (c.textContent || '').replace(/\s+/g, ' ').trim();
      t = t.replace(/^[^\p{L}\p{N}]+/u, '').trim();
      out.push({ id: m[1], n: t || m[1] });
    }
    return out;
  }

  function activa() {
    var a = document.querySelector('.nav-item.active, .nav-item.on, .sidebar .active');
    if (!a) return null;
    var m = (a.getAttribute('onclick') || '').match(/nav\(\s*['"]([^'"]+)['"]/);
    return m ? m[1] : null;
  }

  function avisar(tipo, extra) {
    var msg = { fuente: 'cp', tipo: tipo };
    for (var k in extra) msg[k] = extra[k];
    try { parent.postMessage(msg, '*'); } catch (e) {}
  }

  // ── Al shell: esto es lo que tengo ──────────────────────────────────────
  function presentarse() {
    avisar('listo', { secciones: secciones(), activa: activa(), titulo: document.title });
  }
  if (document.readyState === 'complete') setTimeout(presentarse, 60);
  else window.addEventListener('load', function () { setTimeout(presentarse, 60); });

  // ── Del shell: ve a esta sección / ponte este tema ──────────────────────
  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || d.fuente !== 'cp-shell') return;
    if (d.tipo === 'ir' && typeof window.nav === 'function') {
      window.nav(d.seccion);
      avisar('seccion', { activa: d.seccion });
    }
    if (d.tipo === 'tema') {
      try {
        localStorage.setItem('coach-theme', d.tema);
        document.documentElement.setAttribute('data-theme', d.tema);
        if (typeof window.aplicarTema === 'function') window.aplicarTema(d.tema);
      } catch (err) {}
    }
  });

  // ── Si la app navega por su cuenta (un enlace interno), avisa ───────────
  var navOriginal = window.nav;
  if (typeof navOriginal === 'function') {
    window.nav = function (s) {
      var r = navOriginal.apply(this, arguments);
      avisar('seccion', { activa: s });
      return r;
    };
  }
})();
