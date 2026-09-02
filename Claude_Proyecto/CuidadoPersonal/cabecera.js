/* ════════════════════════════════════════════════════════════════════════════
   cabecera.js — la cabecera de un área de Cuidado Personal

   Adán: "hay apps que ni siquiera tocaste… quiero un diseño unificado para
   todas". El material ya era común (vidrio.css), pero la ANATOMÍA no: Skincare,
   Cabello y Ejercicio abrían con eyebrow + título + KPIs, y Salud, Comida,
   Dentista, Ojos y Vestimenta abrían directamente con contenido. Medido con
   `querySelectorAll` dentro de cada vista: 1 eyebrow y 3-4 KPIs en las primeras,
   0 en las otras cinco.

   Aquí vive esa cabecera una sola vez. Cada área la llama con sus datos:

     cpCabecera('#donde', {
       area:   'comida',                      // decide el color del acento
       ojo:    'Martes 1 de septiembre',      // el eyebrow
       titulo: 'Tu comida del día',
       sub:    '6 desayunos · 8 cenas',
       kpis:   [{v:'186 g', k:'Meta de proteína'}, …]   // 2 a 4
     });

   Los números salen de quien llame: esta hoja no inventa datos ni los guarda.
   ════════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // El acento de cada área. Los mismos que ya usaban sus pestañas en el shell.
  var COLOR = {
    skincare:'#ff6bd6', cabello:'#e0a020', salud:'#00e87a', ejercicio:'#ff6b35',
    comida:'#ffd93d', dentista:'#4fd6ad', ojos:'#4f8cff', vestimenta:'#c17f4a',
  };

  var CSS = [
    '.cp-cab{display:flex;align-items:flex-end;gap:18px;flex-wrap:wrap;margin-bottom:18px}',
    '.cp-cab-i{min-width:0;flex:1}',
    '.cp-ojo{display:flex;align-items:center;gap:7px;font-size:10px;font-weight:800;',
    '  letter-spacing:.16em;text-transform:uppercase;color:var(--cp-c)}',
    '.cp-ojo i{width:6px;height:6px;border-radius:50%;background:var(--cp-c);',
    '  box-shadow:0 0 10px var(--cp-c);flex:none;display:block}',
    '.cp-h1{font-size:26px;font-weight:800;letter-spacing:-.03em;margin-top:7px;',
    '  color:var(--text);line-height:1.15;text-wrap:pretty}',
    '.cp-h1 em{font-style:normal;color:var(--text3);font-weight:600;font-size:14px;',
    '  margin-left:11px;font-family:"Inter",sans-serif;letter-spacing:0}',
    '.cp-kpis{display:flex;gap:9px;flex-wrap:wrap}',
    '.cp-kpi{padding:10px 15px;border-radius:13px;border:1px solid var(--border);',
    '  background:var(--surface);text-align:right;min-width:104px;',
    '  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);',
    '  box-shadow:0 1px 0 var(--vi-luz) inset}',
    '.cp-kpi-v{font-size:19px;font-weight:800;line-height:1;color:var(--cp-c)}',
    '.cp-kpi-v em{font-style:normal;font-size:11px;color:var(--text3);font-weight:700;margin-left:3px}',
    '.cp-kpi-k{font-size:8.5px;font-weight:800;letter-spacing:.11em;text-transform:uppercase;',
    '  color:var(--text3);margin-top:5px}',
    '@media(max-width:760px){',
    '  .cp-cab{gap:12px}.cp-h1{font-size:21px}',
    '  .cp-kpis{width:100%}.cp-kpi{flex:1;min-width:0;padding:9px 11px}',
    '}',
  ].join('\n');

  function estilos() {
    if (document.getElementById('cp-cab-css')) return;
    var st = document.createElement('style');
    st.id = 'cp-cab-css';
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  function esc(t) {
    return String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // El valor puede traer una unidad pequeña detrás: "186 g" -> 186 grande, g chica.
  function valor(v) {
    var m = String(v).match(/^([\d.,]+(?:\s*\/\s*[\d.,]+)?)\s*(.*)$/);
    if (!m || !m[2]) return esc(v);
    return esc(m[1]) + '<em>' + esc(m[2]) + '</em>';
  }

  window.cpCabecera = function (donde, o) {
    estilos();
    var el = typeof donde === 'string' ? document.querySelector(donde) : donde;
    if (!el || !o) return;
    var c = COLOR[o.area] || 'var(--text)';
    var kpis = (o.kpis || []).slice(0, 4);
    el.style.setProperty('--cp-c', c);
    el.className = (el.className ? el.className + ' ' : '') + 'cp-cab';
    el.innerHTML =
      '<div class="cp-cab-i">' +
        (o.ojo ? '<div class="cp-ojo"><i></i>' + esc(o.ojo) + '</div>' : '') +
        '<div class="cp-h1">' + esc(o.titulo || '') +
          (o.sub ? '<em>' + esc(o.sub) + '</em>' : '') + '</div>' +
      '</div>' +
      (kpis.length
        ? '<div class="cp-kpis">' + kpis.map(function (k) {
            return '<div class="cp-kpi"><div class="cp-kpi-v">' + valor(k.v) + '</div>' +
                   '<div class="cp-kpi-k">' + esc(k.k) + '</div></div>';
          }).join('') + '</div>'
        : '');
  };

  // La fecha de hoy en el formato que usan todas: "martes 1 de septiembre".
  var DIAS = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  var MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto',
               'septiembre','octubre','noviembre','diciembre'];
  window.cpHoyTexto = function () {
    var d = new Date();
    return DIAS[d.getDay()] + ' ' + d.getDate() + ' de ' + MESES[d.getMonth()];
  };
})();
