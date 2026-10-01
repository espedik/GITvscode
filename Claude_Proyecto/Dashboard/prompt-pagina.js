/* ══════════════════════════════════════════════════════════════════════════════════════════
   prompt-pagina.js — el icono del prompt, igual en todas las páginas
   ══════════════════════════════════════════════════════════════════════════════════════════
   Cada HTML del proyecto lo carga al final del <body> con su clave:

       <script src="../Dashboard/prompt-pagina.js" data-pagina="finanzas"></script>

   y aparece el mismo icono (una brújula) arriba a la izquierda. Al pulsarlo se abre el prompt
   de la página: el especialista que la gobierna (`prompts-paginas.js`, misma carpeta), con
   «Copiar» para pegarlo en Claude.

   Opciones en la etiqueta:
     data-pagina   la clave en PROMPTS_PAGINAS.paginas (obligatoria)
     data-publica  web pública (Aeroresinas, Heliescala): el icono solo sale en la PC de Adán
                   (file:// o localhost), nunca a un cliente en un dominio
     data-host     dónde va el icono cuando la esquina ya tiene algo (un logo, el botón ☰):
                   selectores separados por `|`; entra como PRIMER elemento del primero que
                   esté a la vista y empuja lo demás en vez de taparlo. Se vuelve a elegir
                   al cambiar el ancho (el carril de escritorio y la barra del teléfono son
                   elementos distintos). Sin host visible, va fijo arriba a la izquierda.

   Una página con varias áreas puede definir `window.promptPaginaActiva = () => 'clave'` y el
   icono enseña la del área abierta (el shell de Cuidado Personal lo hace con sus pestañas).
   Dentro de un iframe del shell (`?embed=1`) no se pinta: el icono es el del shell.
   Nunca sale impreso ni en los PDF (`@media print`).
   ══════════════════════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var yo = document.currentScript;
  if (!yo || window.__promptPagina) return;
  window.__promptPagina = true;

  var CLAVE = yo.getAttribute('data-pagina') || '';
  var BASE = (yo.src || '').replace(/[^\/]*$/, '');
  var local = /^file:/.test(location.protocol) || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  if (new URLSearchParams(location.search).get('embed') === '1') return;
  if (yo.hasAttribute('data-publica') && !local) return;

  var TOP = 10, LEFT = 10;
  var HOSTS = (yo.getAttribute('data-host') || '').split('|').map(function (x) { return x.trim(); }).filter(Boolean);

  var ICONO = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" ' +
    'stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="9"/><path d="M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1z"/>' +
    '<circle cx="12" cy="12" r=".6" fill="currentColor"/></svg>';

  var CSS =
    '.pp-btn{position:fixed;top:' + TOP + 'px;left:' + LEFT + 'px;z-index:2147483000;width:34px;height:34px;' +
      'border-radius:50%;border:1px solid rgba(255,255,255,.35);padding:0;margin:0;cursor:pointer;' +
      'display:flex;align-items:center;justify-content:center;color:#fff;' +
      'background:linear-gradient(135deg,#6366f1 0%,#0ea5e9 100%);' +
      'box-shadow:0 4px 14px rgba(14,165,233,.35),0 1px 3px rgba(0,0,0,.25);' +
      'transition:transform .15s ease,box-shadow .15s ease;-webkit-tap-highlight-color:transparent}' +
    '.pp-btn.pp-linea{position:relative;top:auto;left:auto;display:inline-flex;flex:0 0 34px;vertical-align:middle;' +
      'margin:0 10px 0 0;font-size:0;line-height:0;-webkit-text-fill-color:currentColor}' +
    '.pp-btn:hover{transform:scale(1.08);box-shadow:0 6px 20px rgba(99,102,241,.45),0 1px 3px rgba(0,0,0,.25)}' +
    '.pp-btn:focus-visible{outline:2px solid #0ea5e9;outline-offset:3px}' +
    '.pp-ov{position:fixed;inset:0;z-index:2147483001;display:none;align-items:center;justify-content:center;' +
      'padding:16px;background:rgba(5,8,15,.55);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}' +
    '.pp-ov.pp-abierto{display:flex}' +
    '.pp-panel{--pp-bg:#ffffff;--pp-tx:#1e293b;--pp-mu:#64748b;--pp-bd:#e2e8f0;--pp-ac:#4f46e5;--pp-ac2:#0284c7;--pp-sf:#f8fafc;' +
      'width:min(760px,100%);max-height:min(88vh,980px);display:flex;flex-direction:column;border-radius:18px;' +
      'background:var(--pp-bg);color:var(--pp-tx);border:1px solid var(--pp-bd);' +
      'box-shadow:0 24px 70px rgba(0,0,0,.35);overflow:hidden;' +
      'font:15px/1.6 Inter,"Segoe UI",system-ui,-apple-system,sans-serif;text-align:left;letter-spacing:normal}' +
    '.pp-panel *{box-sizing:border-box}' +
    '.pp-panel.pp-oscuro{--pp-bg:#0f172a;--pp-tx:#e2e8f0;--pp-mu:#94a3b8;--pp-bd:#1e293b;--pp-ac:#a5b4fc;--pp-ac2:#38bdf8;--pp-sf:#131c31}' +
    '.pp-cab{display:flex;gap:14px;align-items:flex-start;padding:20px 22px 16px;border-bottom:1px solid var(--pp-bd)}' +
    '.pp-cab .pp-ico{flex:0 0 40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;' +
      'color:#fff;background:linear-gradient(135deg,#6366f1,#0ea5e9)}' +
    '.pp-cab .pp-ico svg{width:22px;height:22px}' +
    '.pp-tit{flex:1;min-width:0}' +
    '.pp-k{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--pp-ac2);margin:0 0 2px}' +
    '.pp-rol{font-size:20px;line-height:1.3;font-weight:750;margin:0;color:var(--pp-tx)}' +
    '.pp-pro{margin:6px 0 0;font-size:14px;color:var(--pp-mu)}' +
    '.pp-acc{display:flex;gap:6px;flex:0 0 auto}' +
    '.pp-acc button{font-size:13px;font-weight:600;line-height:1;font-family:inherit;border-radius:9px;border:1px solid var(--pp-bd);' +
      'background:var(--pp-sf);color:var(--pp-tx);padding:8px 11px;cursor:pointer;min-height:34px}' +
    '.pp-acc button:hover{border-color:var(--pp-ac)}' +
    '.pp-acc .pp-x{width:34px;padding:0;font-size:18px}' +
    '.pp-cuerpo{overflow-y:auto;padding:6px 22px 20px;-webkit-overflow-scrolling:touch}' +
    '.pp-cuerpo h3{font-size:13px;font-weight:750;letter-spacing:.06em;text-transform:uppercase;color:var(--pp-ac);margin:18px 0 6px}' +
    '.pp-cuerpo p{margin:0 0 8px}' +
    '.pp-cuerpo ul{margin:0 0 8px;padding-left:20px}' +
    '.pp-cuerpo li{margin:0 0 5px}' +
    '.pp-cuerpo strong{font-weight:700;color:var(--pp-tx)}' +
    '.pp-comun{margin-top:18px;padding:4px 16px 8px;border-radius:12px;background:var(--pp-sf);border:1px solid var(--pp-bd);font-size:14px}' +
    '.pp-comun h3{color:var(--pp-mu)}' +
    '.pp-pie{margin:14px 0 0;font-size:12px;color:var(--pp-mu)}' +
    '.pp-pie code{font-family:ui-monospace,Consolas,monospace;font-size:12px}' +
    '@media (max-width:560px){.pp-cab{flex-wrap:wrap;padding:16px}.pp-acc{width:100%;justify-content:flex-end}' +
      '.pp-cuerpo{padding:4px 16px 16px}.pp-rol{font-size:18px}}' +
    '@media print{.pp-btn,.pp-ov{display:none!important}}';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function enLinea(s) { return esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'); }

  // `## Título`, `- viñeta`, párrafos: lo justo para leerlo bien, sin una librería de markdown.
  function pinta(txt) {
    var html = '', lista = false;
    String(txt).split(/\r?\n/).forEach(function (l) {
      var t = l.trim();
      if (/^- /.test(t)) {
        if (!lista) { html += '<ul>'; lista = true; }
        html += '<li>' + enLinea(t.slice(2)) + '</li>';
        return;
      }
      if (lista) { html += '</ul>'; lista = false; }
      if (!t) return;
      if (/^## /.test(t)) html += '<h3>' + enLinea(t.slice(3)) + '</h3>';
      else html += '<p>' + enLinea(t) + '</p>';
    });
    if (lista) html += '</ul>';
    return html;
  }

  function cargar(src, listo) {
    var s = document.createElement('script');
    s.src = BASE + src;
    s.onload = function () { listo(true); };
    s.onerror = function () { listo(false); };
    document.head.appendChild(s);
  }

  // Los marcadores ({{kapitelAleman}}…) los resuelve el maestro. La página que no lo carga lo
  // trae al abrir el prompt, y solo si el prompt lleva alguno.
  function conMaestro(txt, listo) {
    if (txt.indexOf('{{') === -1) return listo();
    if (window.CIFRAS && window.CIFRAS.texto) return listo();
    cargar('datos-maestros.js', function () { listo(); });
  }
  function resuelve(s) {
    return (window.CIFRAS && window.CIFRAS.texto) ? window.CIFRAS.texto(s) : s;
  }

  function claveActiva() {
    try {
      if (typeof window.promptPaginaActiva === 'function') return window.promptPaginaActiva() || CLAVE;
    } catch (e) {}
    return CLAVE;
  }

  // El panel se pinta oscuro o claro según el fondo REAL de la página, no según el sistema:
  // cada app tiene su propio botón de tema.
  function fondoOscuro() {
    var nodos = [document.body, document.documentElement];
    for (var i = 0; i < nodos.length; i++) {
      if (!nodos[i]) continue;
      var m = getComputedStyle(nodos[i]).backgroundColor.match(/[\d.]+/g);
      if (m && (m.length < 4 || +m[3] > 0.1)) return (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) < 128;
    }
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
  }

  var ov, panel, ultimoFoco;

  function textoPlano(p, comun) {
    return '# ' + p.rol + '\n\nPropósito: ' + p.proposito + '\n\n' + p.prompt + '\n\n' + comun;
  }

  function copiar(txt, boton) {
    function hecho() { var o = boton.textContent; boton.textContent = '✓ Copiado'; setTimeout(function () { boton.textContent = o; }, 1600); }
    function aMano() {
      var ta = document.createElement('textarea');
      ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); hecho(); } catch (e) {}
      ta.remove();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(hecho, aMano);
    else aMano();
  }

  function cierra() {
    if (!ov) return;
    ov.classList.remove('pp-abierto');
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }

  function abre() {
    ultimoFoco = document.activeElement;
    var P = window.PROMPTS_PAGINAS;
    if (!P) { cargar('prompts-paginas.js', function (ok) { if (ok && window.PROMPTS_PAGINAS) abre(); }); return; }
    var clave = claveActiva();
    var p = P.paginas[clave];
    if (!p) { alert('Esta página no tiene prompt todavía (clave "' + clave + '").'); return; }
    conMaestro(p.prompt + p.proposito, function () {
      var rol = resuelve(p.rol), pro = resuelve(p.proposito), cuerpo = resuelve(p.prompt), comun = resuelve(P.COMUN);
      if (!ov) {
        ov = document.createElement('div');
        ov.className = 'pp-ov';
        ov.addEventListener('click', function (e) { if (e.target === ov) cierra(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && ov.classList.contains('pp-abierto')) cierra(); });
        document.body.appendChild(ov);
      }
      ov.innerHTML =
        '<div class="pp-panel' + (fondoOscuro() ? ' pp-oscuro' : '') + '" role="dialog" aria-modal="true" aria-labelledby="pp-rol" tabindex="-1">' +
          '<div class="pp-cab"><div class="pp-ico">' + ICONO + '</div>' +
            '<div class="pp-tit"><p class="pp-k">El prompt de ' + esc(p.titulo) + '</p>' +
              '<h2 class="pp-rol" id="pp-rol">' + esc(rol) + '</h2>' +
              '<p class="pp-pro">' + enLinea(pro) + '</p></div>' +
            '<div class="pp-acc"><button type="button" class="pp-copia" title="Copiar el prompt completo">Copiar</button>' +
              '<button type="button" class="pp-x" title="Cerrar (Esc)" aria-label="Cerrar">×</button></div></div>' +
          '<div class="pp-cuerpo">' + pinta(cuerpo) +
            '<div class="pp-comun">' + pinta(comun) + '</div>' +
            '<p class="pp-pie">Este prompt gobierna cada cambio de la página. Vive en <code>Dashboard/prompts-paginas.js</code> · clave <code>' + esc(clave) + '</code>.</p>' +
          '</div></div>';
      panel = ov.firstChild;
      panel.querySelector('.pp-x').onclick = cierra;
      panel.querySelector('.pp-copia').onclick = function () {
        copiar(textoPlano({ rol: rol, proposito: pro, prompt: cuerpo }, comun), this);
      };
      ov.classList.add('pp-abierto');
      panel.focus();
    });
  }

  var boton;
  // A la vista = con caja y dentro de la pantalla: el carril de escritorio en el teléfono no
  // desaparece, se va fuera con un transform, y ahí no sirve.
  function aLaVista(el) {
    if (!el || !el.getClientRects().length) return false;
    var r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && r.right > 0 && r.left < innerWidth && cs.visibility !== 'hidden';
  }
  function coloca() {
    var host = null;
    for (var i = 0; i < HOSTS.length && !host; i++) {
      var el = document.querySelector(HOSTS[i]);
      if (el && aLaVista(el)) host = el;
    }
    if (host) {
      boton.classList.add('pp-linea');
      if (host.firstChild !== boton) host.insertBefore(boton, host.firstChild);
    } else {
      boton.classList.remove('pp-linea');
      if (boton.parentNode !== document.body) document.body.appendChild(boton);
    }
  }

  function monta() {
    if (document.querySelector('.pp-btn')) return;
    var st = document.createElement('style');
    st.id = 'pp-estilos';
    st.textContent = CSS;
    document.head.appendChild(st);
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'pp-btn';
    b.title = 'El prompt de esta página';
    b.setAttribute('aria-label', 'Ver el prompt de esta página');
    b.innerHTML = ICONO;
    b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); abre(); });
    boton = b;
    coloca();
    var t;
    window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(coloca, 150); });
    if (!window.PROMPTS_PAGINAS) cargar('prompts-paginas.js', function () {});
  }

  if (document.body) monta();
  else document.addEventListener('DOMContentLoaded', monta);
})();
