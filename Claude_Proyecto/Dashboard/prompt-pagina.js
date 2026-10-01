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

   VISTAS. Si el prompt de la página declara `vistas` (pantallas del Dashboard, pestañas de
   Cuidado Personal, el modo Empresa de Coach), el icono enseña el de la vista abierta: la primera
   cuyo selector `si` exista en ese momento. La ventana dice de qué vista es y trae un selector
   para pasar al prompt general de la página, que rige lo que las vistas comparten.
   Dentro de un iframe del shell (`?embed=1`) no se pinta: el icono es el del shell.
   Nunca sale impreso ni en los PDF (`@media print`).

   LA VENTANA (Adán, 2026-09-30: "mejora su diseño y además que sea más ancha"). Hasta 1240 px
   de ancho, y el prompt no va de corrido: cada `## sección` cae en su tarjeta — Quién eres, Tu
   misión y Cómo aconsejas a la izquierda; Cómo piensas, numerado, a la derecha; y Al modificar
   debajo, a todo lo ancho y resaltada, porque es la que gobierna los cambios. Las reglas comunes
   van plegadas al final: son las mismas en todas las páginas y se copian igual.
   Bajo 860 px, una columna.
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

  function svg(d, extra) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true">' + d + (extra || '') + '</svg>';
  }
  var ICONO = svg('<circle cx="12" cy="12" r="9"/><path d="M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1z"/>',
                  '<circle cx="12" cy="12" r=".6" fill="currentColor"/>');
  var ICO = {
    quien:    svg('<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6"/>'),
    mision:   svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8" fill="currentColor"/>'),
    piensa:   svg('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>'),
    aconseja: svg('<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z"/><path d="M8.5 11h7M8.5 14h4.5"/>'),
    modifica: svg('<path d="M12 3l7.5 3v5.4c0 4.6-3.1 8.4-7.5 9.6-4.4-1.2-7.5-5-7.5-9.6V6z"/><path d="M8.8 12.2l2.2 2.2 4.3-4.6"/>'),
    extra:    svg('<path d="M5 12h14M12 5v14"/>'),
    copia:    svg('<rect x="8.5" y="8.5" width="11" height="11" rx="2.2"/><path d="M15.5 8.5V6.2A1.7 1.7 0 0 0 13.8 4.5H6.2a1.7 1.7 0 0 0-1.7 1.7v7.6a1.7 1.7 0 0 0 1.7 1.7h2.3"/>'),
    cierra:   svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    chev:     svg('<path d="M9 6l6 6-6 6"/>')
  };

  var F_TXT = "Inter,'Segoe UI',system-ui,-apple-system,sans-serif";
  var F_MONO = "'Space Grotesk',ui-monospace,'SF Mono',Consolas,monospace";
  var F_TIT = "Fraunces,Georgia,'Times New Roman',serif";

  var CSS =
    /* ── El icono ── */
    '.pp-btn{position:fixed;top:' + TOP + 'px;left:' + LEFT + 'px;z-index:2147483000;width:34px;height:34px;' +
      'border-radius:50%;border:1px solid rgba(255,255,255,.35);padding:0;margin:0;cursor:pointer;' +
      'display:flex;align-items:center;justify-content:center;color:#fff;' +
      'background:linear-gradient(135deg,#6366f1 0%,#0ea5e9 100%);' +
      'box-shadow:0 4px 14px rgba(14,165,233,.35),0 1px 3px rgba(0,0,0,.25);' +
      'transition:transform .15s ease,box-shadow .15s ease;-webkit-tap-highlight-color:transparent}' +
    '.pp-btn svg{width:18px;height:18px}' +
    '.pp-btn.pp-linea{position:relative;top:auto;left:auto;display:inline-flex;flex:0 0 34px;vertical-align:middle;' +
      'margin:0 10px 0 0;font-size:0;line-height:0;-webkit-text-fill-color:currentColor}' +
    '.pp-btn:hover{transform:scale(1.08);box-shadow:0 6px 20px rgba(99,102,241,.45),0 1px 3px rgba(0,0,0,.25)}' +
    '.pp-btn:focus-visible{outline:2px solid #0ea5e9;outline-offset:3px}' +

    /* ── El velo y el panel ── */
    '.pp-ov{position:fixed;inset:0;z-index:2147483001;display:none;align-items:center;justify-content:center;' +
      'padding:24px;background:rgba(6,9,18,.62);-webkit-backdrop-filter:blur(8px) saturate(.9);backdrop-filter:blur(8px) saturate(.9)}' +
    '.pp-ov.pp-abierto{display:flex}' +
    '.pp-panel{--pp-bg:#ffffff;--pp-sf:#f6f7fb;--pp-bd:#e5e8f0;--pp-tx:#131826;--pp-tx2:#434c63;--pp-mu:#687089;' +
      '--pp-ac:#4f46e5;--pp-ac2:#0369a1;--pp-ac-rgb:79,70,229;--pp-ac2-rgb:3,105,161;' +
      'position:relative;width:min(1240px,100%);max-height:min(92vh,1060px);display:flex;flex-direction:column;' +
      'border-radius:22px;background:var(--pp-bg);color:var(--pp-tx);border:1px solid var(--pp-bd);' +
      'box-shadow:0 30px 90px rgba(0,0,0,.38),0 2px 8px rgba(0,0,0,.12);overflow:hidden;' +
      'font:15px/1.6 ' + F_TXT + ';text-align:left;letter-spacing:normal;-webkit-font-smoothing:antialiased}' +
    '.pp-panel.pp-oscuro{--pp-bg:#0c1120;--pp-sf:#111a2d;--pp-bd:#1e2a42;--pp-tx:#eef1f8;--pp-tx2:#b6bfd4;--pp-mu:#8b96b0;' +
      '--pp-ac:#a5b4fc;--pp-ac2:#38bdf8;--pp-ac-rgb:165,180,252;--pp-ac2-rgb:56,189,248}' +
    '.pp-panel *{box-sizing:border-box}' +
    '.pp-panel:focus{outline:none}' +
    '.pp-panel button{font-family:inherit}' +
    '.pp-panel.pp-entra{animation:pp-entra .2s cubic-bezier(.2,.8,.2,1)}' +
    '@keyframes pp-entra{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}' +
    '@media (prefers-reduced-motion:reduce){.pp-panel.pp-entra{animation:none}}' +

    /* ── Cabecera ── */
    '.pp-cab{display:grid;grid-template-columns:56px minmax(0,1fr) auto;gap:20px;align-items:start;padding:28px 34px 24px;' +
      'border-bottom:1px solid var(--pp-bd);' +
      'background:radial-gradient(120% 140% at 0% 0%,rgba(var(--pp-ac-rgb),.12),transparent 55%),' +
        'radial-gradient(90% 120% at 100% 0%,rgba(var(--pp-ac2-rgb),.09),transparent 60%)}' +
    '.pp-cab .pp-ico{width:56px;height:56px;border-radius:16px;display:flex;align-items:center;justify-content:center;' +
      'color:#fff;background:linear-gradient(135deg,#6366f1,#0ea5e9);box-shadow:0 8px 22px rgba(79,70,229,.32)}' +
    '.pp-cab .pp-ico svg{width:30px;height:30px}' +
    '.pp-tit{min-width:0}' +
    '.pp-k{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 8px;font:700 11px/1.2 ' + F_MONO + ';' +
      'letter-spacing:.16em;text-transform:uppercase;color:var(--pp-mu)}' +
    '.pp-k .pp-chip{padding:4px 8px;border-radius:6px;background:rgba(var(--pp-ac-rgb),.12);color:var(--pp-ac)}' +
    '.pp-k .pp-sep{opacity:.55}' +
    '.pp-k b{color:var(--pp-ac2);font-weight:700}' +
    '.pp-rol{margin:0;padding:0;font:600 30px/1.18 ' + F_TIT + ';letter-spacing:-.015em;text-transform:none;color:var(--pp-tx);border:0;background:none}' +
    '.pp-pro{margin:14px 0 0;max-width:84ch;padding:2px 0 2px 14px;border-left:3px solid transparent;' +
      'border-image:linear-gradient(180deg,#6366f1,#0ea5e9) 1;font-size:16px;line-height:1.55;color:var(--pp-tx2)}' +
    '.pp-pro strong{color:var(--pp-tx)}' +
    '.pp-acc{display:flex;flex-direction:column;align-items:flex-end;gap:10px}' +
    '.pp-fila{display:flex;gap:8px;align-items:center}' +
    '.pp-bt{display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 16px;border-radius:11px;cursor:pointer;' +
      'font-size:14px;font-weight:650;line-height:1;border:1px solid var(--pp-bd);background:var(--pp-bg);color:var(--pp-tx);' +
      'transition:border-color .15s,background .15s,transform .1s}' +
    '.pp-bt svg{width:17px;height:17px}' +
    '.pp-bt:hover{border-color:rgba(var(--pp-ac-rgb),.6)}' +
    '.pp-bt:active{transform:translateY(1px)}' +
    '.pp-bt:focus-visible,.pp-seg button:focus-visible,.pp-comun summary:focus-visible{outline:2px solid var(--pp-ac2);outline-offset:2px}' +
    '.pp-bt.pp-copia{border:0;color:#fff;background:linear-gradient(135deg,#6366f1,#0ea5e9);box-shadow:0 6px 16px rgba(79,70,229,.28)}' +
    '.pp-bt.pp-copia:hover{filter:brightness(1.06)}' +
    '.pp-bt.pp-x{width:40px;padding:0;justify-content:center}' +
    '.pp-seg{display:inline-flex;padding:3px;border-radius:12px;background:var(--pp-sf);border:1px solid var(--pp-bd)}' +
    '.pp-seg button{height:32px;padding:0 14px;border:0;border-radius:9px;background:transparent;cursor:pointer;' +
      'font-size:13px;font-weight:650;color:var(--pp-mu);white-space:nowrap}' +
    '.pp-seg button.pp-on{background:var(--pp-bg);color:var(--pp-tx);box-shadow:0 1px 3px rgba(0,0,0,.12),0 0 0 1px var(--pp-bd)}' +

    /* ── Cuerpo: retícula de tarjetas ── */
    '.pp-cuerpo{overflow-y:auto;padding:26px 34px 30px;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}' +
    '.pp-cols{display:grid;gap:18px;grid-template-columns:minmax(0,1.04fr) minmax(0,1fr);align-items:stretch}' +
    '.pp-col{display:flex;flex-direction:column;gap:18px;min-width:0}' +
    '.pp-col>.pp-sec:last-child{flex:1}' +
    '.pp-sec{min-width:0;padding:20px 22px 18px;border-radius:16px;background:var(--pp-sf);border:1px solid var(--pp-bd)}' +
    '.pp-sec[data-a="modifica"],.pp-sec[data-a="extra"]{margin-top:18px}' +
    '.pp-sec[data-a="modifica"]{background:linear-gradient(160deg,rgba(var(--pp-ac-rgb),.10),rgba(var(--pp-ac2-rgb),.05));' +
      'border-color:rgba(var(--pp-ac-rgb),.35)}' +
    '.pp-sh{display:flex;align-items:center;gap:10px;margin:0 0 12px;padding:0;border:0;background:none;font:700 11.5px/1.2 ' + F_MONO + ';letter-spacing:.15em;' +
      'text-transform:uppercase;color:var(--pp-ac)}' +
    '.pp-sh i{flex:0 0 28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;' +
      'background:rgba(var(--pp-ac-rgb),.12);color:var(--pp-ac)}' +
    '.pp-sh i svg{width:16px;height:16px}' +
    '.pp-sh small{margin-left:auto;font-size:10px;letter-spacing:.12em;color:var(--pp-mu)}' +
    '.pp-sec p{margin:0 0 10px;font-size:15.5px;line-height:1.7;color:var(--pp-tx2)}' +
    '.pp-sec p:last-child{margin-bottom:0}' +
    '.pp-sec strong{color:var(--pp-tx);font-weight:700}' +
    '.pp-lista{list-style:none;margin:0;padding:0;counter-reset:pp}' +
    '.pp-lista li{position:relative;margin:0;list-style:none;padding:9px 0 9px 22px;font-size:15px;line-height:1.6;color:var(--pp-tx2);' +
      'border-top:1px solid var(--pp-bd)}' +
    '.pp-lista li:first-child{border-top:0;padding-top:2px}' +
    '.pp-lista li::before{content:"";position:absolute;left:3px;top:18px;width:7px;height:7px;border-radius:50%;' +
      'background:linear-gradient(135deg,#6366f1,#0ea5e9)}' +
    '.pp-lista li:first-child::before{top:11px}' +
    '.pp-num li{padding-left:40px;counter-increment:pp}' +
    '.pp-num li::before{content:counter(pp,decimal-leading-zero);width:auto;height:auto;border-radius:0;background:none;' +
      'top:10px;left:0;font:700 12px/1.6 ' + F_MONO + ';letter-spacing:.06em;color:var(--pp-ac2)}' +
    '.pp-num li:first-child::before{top:3px}' +
    '.pp-sec[data-a="modifica"] .pp-lista{columns:2 340px;column-gap:36px}' +
    '.pp-sec[data-a="modifica"] .pp-lista li{break-inside:avoid;border-top:0;padding-top:4px;padding-bottom:8px;color:var(--pp-tx)}' +
    '.pp-sec[data-a="modifica"] .pp-lista li::before{top:13px}' +

    /* ── Reglas comunes, plegadas ── */
    '.pp-comun{margin-top:18px;border-radius:16px;border:1px dashed var(--pp-bd);background:transparent}' +
    '.pp-comun summary{display:flex;align-items:center;gap:10px;padding:15px 20px;cursor:pointer;list-style:none;' +
      'font:700 11.5px/1.2 ' + F_MONO + ';letter-spacing:.15em;text-transform:uppercase;color:var(--pp-mu)}' +
    '.pp-comun summary::-webkit-details-marker{display:none}' +
    '.pp-comun summary svg{width:16px;height:16px;transition:transform .15s}' +
    '.pp-comun[open] summary svg{transform:rotate(90deg)}' +
    '.pp-comun summary span{margin-left:auto;font-weight:600;letter-spacing:.06em;text-transform:none;font-family:' + F_TXT + ';font-size:12.5px}' +
    '.pp-comun .pp-lista{padding:0 22px 16px;columns:2 380px;column-gap:34px}' +
    '.pp-comun .pp-lista li{break-inside:avoid;font-size:14px;border-top:0;padding-top:5px;padding-bottom:7px}' +
    '.pp-comun .pp-lista li::before,.pp-comun .pp-lista li:first-child::before{top:14px}' +
    '.pp-pie{display:flex;flex-wrap:wrap;gap:6px 14px;justify-content:space-between;margin:18px 2px 0;font-size:12.5px;color:var(--pp-mu)}' +
    '.pp-pie code{font:600 12px/1.4 ' + F_MONO + ';color:var(--pp-tx2)}' +

    /* ── Teléfono y ventanas angostas ── */
    '@media (max-width:860px){' +
      '.pp-ov{padding:10px}' +
      '.pp-panel{max-height:calc(100vh - 20px);border-radius:18px}' +
      '.pp-cab{grid-template-columns:44px minmax(0,1fr);gap:14px;padding:18px 18px 16px}' +
      '.pp-cab .pp-ico{width:44px;height:44px;border-radius:13px}.pp-cab .pp-ico svg{width:24px;height:24px}' +
      '.pp-acc{grid-column:1/-1;flex-direction:row;flex-wrap:wrap;justify-content:space-between;align-items:center}' +
      '.pp-rol{font-size:22px}.pp-pro{font-size:15px}' +
      '.pp-cuerpo{padding:16px 14px 20px}' +
      '.pp-cols{grid-template-columns:minmax(0,1fr);gap:12px}.pp-col{display:contents}' +
      '.pp-sec[data-a="piensa"]{order:3}.pp-sec[data-a="aconseja"]{order:4}' +
      '.pp-sec[data-a="modifica"],.pp-sec[data-a="extra"]{margin-top:12px}' +
      '.pp-sec[data-a="modifica"] .pp-lista{columns:1}' +
      '.pp-sec{padding:16px 16px 14px}' +
      '.pp-comun .pp-lista{columns:1}' +
    '}' +
    '@media print{.pp-btn,.pp-ov{display:none!important}}';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function enLinea(s) { return esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'); }
  function sinAcentos(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  // `## Título` abre una sección; `- viñeta` va a su lista; lo demás son párrafos.
  function secciones(txt) {
    var out = [], cur = null;
    String(txt).split(/\r?\n/).forEach(function (l) {
      var t = l.trim();
      if (/^## /.test(t)) { cur = { t: t.slice(3), p: [], li: [] }; out.push(cur); return; }
      if (!t) return;
      if (!cur) { cur = { t: '', p: [], li: [] }; out.push(cur); }
      if (/^- /.test(t)) cur.li.push(t.slice(2)); else cur.p.push(t);
    });
    return out;
  }
  // Cada sección cae en su sitio de la retícula según su título.
  function area(t) {
    var n = sinAcentos(t);
    if (/^quien/.test(n)) return 'quien';
    if (/^tu mision/.test(n)) return 'mision';
    if (/^como piensas/.test(n)) return 'piensa';
    if (/^como aconsejas/.test(n)) return 'aconseja';
    if (/^al modificar/.test(n)) return 'modifica';
    return 'extra';
  }
  function lista(items, numerada) {
    if (!items.length) return '';
    return '<ul class="pp-lista' + (numerada ? ' pp-num' : '') + '">' +
      items.map(function (x) { return '<li>' + enLinea(x) + '</li>'; }).join('') + '</ul>';
  }
  function tarjetas(txt) {
    var por = { quien: '', mision: '', piensa: '', aconseja: '', modifica: '', extra: '' };
    secciones(txt).forEach(function (s) {
      var a = area(s.t);
      var cuenta = s.li.length > 1 && a === 'piensa' ? '<small>' + s.li.length + ' principios</small>' : '';
      var html = '<div class="pp-sec" data-a="' + a + '">' +
        (s.t ? '<h3 class="pp-sh"><i>' + ICO[a] + '</i>' + esc(s.t) + cuenta + '</h3>' : '') +
        s.p.map(function (x) { return '<p>' + enLinea(x) + '</p>'; }).join('') +
        lista(s.li, a === 'piensa') + '</div>';
      por[a] += html;
    });
    // Izquierda: quién eres, la misión y cómo aconseja. Derecha: cómo piensa. Debajo, a lo
    // ancho, lo que gobierna los cambios. La última tarjeta de cada columna se estira para
    // que las dos acaben a la misma altura.
    return '<div class="pp-cols"><div class="pp-col">' + por.quien + por.mision + por.aconseja + '</div>' +
      '<div class="pp-col">' + por.piensa + '</div></div>' + por.modifica + por.extra;
  }

  function cargar(src, listo) {
    var s = document.createElement('script');
    s.src = BASE + src;
    s.onload = function () { listo(true); };
    s.onerror = function () { listo(false); };
    document.head.appendChild(s);
  }

  // Las mismas tres familias que el resto del proyecto (Inter, Space Grotesk, Fraunces). Se
  // piden al abrir la ventana por primera vez; sin conexión caen a las del sistema.
  var fuentes = false;
  function pideFuentes() {
    if (fuentes) return; fuentes = true;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700' +
             '&family=Fraunces:opsz,wght@9..144,600&display=swap';
    document.head.appendChild(l);
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

  // La vista abierta: la primera de `vistas` cuyo selector existe ahora mismo (la pantalla con
  // `.active`, el panel con `.open`). Sin vistas, o sin ninguna abierta, la página.
  function claveActiva(P) {
    var pg = P.paginas[CLAVE], vs = (pg && pg.vistas) || [];
    for (var i = 0; i < vs.length; i++) {
      try { if (document.querySelector(vs[i].si)) return vs[i].clave; } catch (e) {}
    }
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
    function hecho() {
      var o = boton.innerHTML;
      boton.innerHTML = svg('<path d="M5 12.5l4.2 4.2L19 7"/>') + 'Copiado';
      setTimeout(function () { boton.innerHTML = o; }, 1600);
    }
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

  function abre(forzada) {
    var yaAbierta = !!(ov && ov.classList.contains('pp-abierto'));
    if (!yaAbierta) ultimoFoco = document.activeElement;
    var P = window.PROMPTS_PAGINAS;
    if (!P) { cargar('prompts-paginas.js', function (ok) { if (ok && window.PROMPTS_PAGINAS) abre(forzada); }); return; }
    pideFuentes();
    var activa = claveActiva(P);
    var clave = forzada || activa;
    var p = P.paginas[clave], pagina = P.paginas[CLAVE] || p;
    if (!p) { alert('Esta página no tiene prompt todavía (clave "' + clave + '").'); return; }
    var esVista = clave !== CLAVE, hayVista = activa !== CLAVE;
    conMaestro(p.prompt + p.proposito, function () {
      var rol = resuelve(p.rol), pro = resuelve(p.proposito), cuerpo = resuelve(p.prompt), comun = resuelve(P.COMUN);
      if (!ov) {
        ov = document.createElement('div');
        ov.className = 'pp-ov';
        ov.addEventListener('click', function (e) { if (e.target === ov) cierra(); });
        // En captura y sin propagar: el Esc cierra esta ventana y NO el panel que haya debajo
        // (Qué invertir hoy, el calendario… tienen su propio Esc).
        window.addEventListener('keydown', function (e) {
          if (e.key !== 'Escape' || !ov.classList.contains('pp-abierto')) return;
          e.preventDefault(); e.stopImmediatePropagation(); cierra();
        }, true);
        document.body.appendChild(ov);
      }

      // Dónde estás: Prompt · Dashboard › Plan Maestro
      var ruta = '<span class="pp-chip">Prompt</span>' +
        (hayVista ? esc(pagina.titulo) + ' <span class="pp-sep">›</span> <b>' + esc(esVista ? p.titulo : 'General') + '</b>'
                  : '<b>' + esc(p.titulo) + '</b>');
      var selector = !hayVista ? '' :
        '<div class="pp-seg" role="group" aria-label="Qué prompt ver">' +
          '<button type="button" data-k="vista" class="' + (esVista ? 'pp-on' : '') + '" aria-pressed="' + esVista + '">' + esc(P.paginas[activa].titulo) + '</button>' +
          '<button type="button" data-k="general" class="' + (esVista ? '' : 'pp-on') + '" aria-pressed="' + !esVista + '" ' +
            'title="El prompt general de ' + esc(pagina.titulo) + ': rige lo que comparten sus vistas">General</button>' +
        '</div>';
      var gobierna = esVista
        ? 'Gobierna cada cambio de esta vista; lo que comparte con el resto de ' + esc(pagina.titulo) + ' lo rige el prompt general.'
        : 'Gobierna cada cambio de la página' + (hayVista ? ' en lo que comparten sus vistas; cada vista tiene el suyo.' : '.');
      var nComun = secciones(comun).reduce(function (n, s) { return n + s.li.length; }, 0);

      ov.innerHTML =
        '<div class="pp-panel' + (fondoOscuro() ? ' pp-oscuro' : '') + (yaAbierta ? '' : ' pp-entra') +
          '" role="dialog" aria-modal="true" aria-labelledby="pp-rol" tabindex="-1">' +
          '<div class="pp-cab"><div class="pp-ico">' + ICONO + '</div>' +
            '<div class="pp-tit"><p class="pp-k">' + ruta + '</p>' +
              '<h2 class="pp-rol" id="pp-rol">' + esc(rol) + '</h2>' +
              '<p class="pp-pro">' + enLinea(pro) + '</p></div>' +
            '<div class="pp-acc">' +
              '<div class="pp-fila">' +
                '<button type="button" class="pp-bt pp-copia" title="Copiar el prompt completo, con las reglas comunes">' + ICO.copia + 'Copiar prompt</button>' +
                '<button type="button" class="pp-bt pp-x" title="Cerrar (Esc)" aria-label="Cerrar">' + ICO.cierra + '</button>' +
              '</div>' + selector +
            '</div></div>' +
          '<div class="pp-cuerpo">' +
            tarjetas(cuerpo) +
            '<details class="pp-comun"><summary>' + ICO.chev + 'Reglas comunes a todas las páginas' +
              '<span>' + nComun + ' reglas · van incluidas al copiar</span></summary>' +
              lista(secciones(comun).reduce(function (a, s) { return a.concat(s.li); }, []), false) +
            '</details>' +
            '<p class="pp-pie"><span>' + gobierna + '</span>' +
              '<span><code>Dashboard/prompts-paginas.js</code> · clave <code>' + esc(clave) + '</code></span></p>' +
          '</div></div>';
      panel = ov.firstChild;
      panel.querySelector('.pp-x').onclick = cierra;
      panel.querySelector('.pp-copia').onclick = function () {
        copiar(textoPlano({ rol: rol, proposito: pro, prompt: cuerpo }, comun), this);
      };
      Array.prototype.forEach.call(panel.querySelectorAll('.pp-seg button'), function (b) {
        b.onclick = function () {
          if (b.classList.contains('pp-on')) return;
          abre(b.getAttribute('data-k') === 'general' ? CLAVE : activa);
        };
      });
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
