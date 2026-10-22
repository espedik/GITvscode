/* ══ oscuro.js — el modo oscuro de las lecciones y de casos.html dentro de la ventana del Dashboard ══

   Mi Día abre la lección y los casos en un iframe (Alemán de hoy). Si el Dashboard va en oscuro, la página
   también: leccion.js lee el tema del Dashboard (`coach-theme` en localStorage, el mismo que comparten Coach y
   Finanzas) y, solo entonces, carga este archivo. Abierta sola, la página sigue en claro.

   No hay un segundo diseño escrito a mano: el oscuro se DERIVA del claro, color por color, según el papel que
   hace cada uno —
     · fondo  → oscuro, y más claro cuanto más se separaba del papel: una tarjeta o un recuadro de color quedan
                por encima del fondo, igual que en claro; los botones de acento se quedan como están.
     · texto  → claro, subiendo la luz hasta 4.5:1 sobre la tarjeta; los grises conservan su jerarquía.
     · borde  → un trazo claro y tenue; sombra → negra y más densa.
   Una regla que deja un fondo claro (un botón amarillo) mantiene su letra oscura, y uno negro con letra blanca
   (`background:var(--black)`) pasa a gris levantado.

   Cada hoja recibe una CAPA: las mismas reglas con solo sus declaraciones de color, convertidas, puesta justo
   detrás de su hoja. Así la cascada es la misma que en claro. Los <style> de cada página y sus atributos
   `style` se convierten aquí mismo; styles.css, k10.css y partizip.css no se pueden leer desde file:// —el
   navegador lo bloquea—, así que sus capas van calculadas en HOJAS, abajo. `node Aleman/oscuro.js` las
   recalcula; el verificador (control 28) avisa si alguna se quedó atrás de su hoja.
   ══════════════════════════════════════════════════════════════════════════════════════════ */
(function (raiz) {
  'use strict';

  /* ── El color ── */
  function lee(s) {
    s = s.trim().toLowerCase();
    if (s === 'white') return { r: 255, g: 255, b: 255, a: 1 };
    if (s === 'black') return { r: 0, g: 0, b: 0, a: 1 };
    var m;
    if (s.charAt(0) === '#') {
      var h = s.slice(1);
      if (h.length === 3 || h.length === 4) h = h.split('').map(function (c) { return c + c; }).join('');
      if (h.length !== 6 && h.length !== 8) return null;
      return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16),
        a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1 };
    }
    if ((m = /^rgba?\(([^)]*)\)$/.exec(s))) {
      var p = m[1].replace('/', ' ').split(/[\s,]+/).filter(Boolean);
      if (p.length < 3) return null;
      var n = function (x) { return /%$/.test(x) ? parseFloat(x) * 2.55 : parseFloat(x); };
      var al = p[3] === undefined ? 1 : /%$/.test(p[3]) ? parseFloat(p[3]) / 100 : parseFloat(p[3]);
      return { r: n(p[0]), g: n(p[1]), b: n(p[2]), a: al };
    }
    return null;
  }
  function escribe(c) {
    var r = Math.round(c.r), g = Math.round(c.g), b = Math.round(c.b);
    if (c.a < 1) return 'rgba(' + r + ',' + g + ',' + b + ',' + (Math.round(c.a * 1000) / 1000) + ')';
    return '#' + [r, g, b].map(function (x) { return ('0' + Math.max(0, Math.min(255, x)).toString(16)).slice(-2); }).join('');
  }
  function hsl(c) {
    var r = c.r / 255, g = c.g / 255, b = c.b / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, h = 0, s = 0;
    if (mx !== mn) {
      var d = mx - mn;
      s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h /= 6;
    }
    return { h: h, s: s, l: l, a: c.a };
  }
  function rgb(x) {
    var h = x.h, s = x.s, l = Math.max(0, Math.min(1, x.l));
    if (!s) return { r: l * 255, g: l * 255, b: l * 255, a: x.a };
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    function f(t) { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 0.5 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; }
    return { r: f(h + 1 / 3) * 255, g: f(h) * 255, b: f(h - 1 / 3) * 255, a: x.a };
  }
  function luz(c) {
    function u(v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
    return 0.2126 * u(c.r) + 0.7152 * u(c.g) + 0.0722 * u(c.b);
  }
  function contraste(a, b) { var x = luz(a), y = luz(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }

  var PAPEL = 0.955;                       // la luz del fondo claro de la app (--bg, #f5f4f0)
  // El texto se mide contra un gris algo más claro que la tarjeta (#232323): así aguanta también sobre los recuadros
  // teñidos. Medido contra la tarjeta, 1,744 textos de las lecciones quedaban por debajo de 4.5:1 sobre su fondo real.
  var TARJETA = rgb({ h: 0, s: 0, l: 0.22, a: 1 });
  var TINTA = '#18181b';                   // la letra sobre lo que se queda claro

  function texto(c, meta) {
    if (!c || c.a === 0) return c;
    var x = hsl(c), gris = x.s < 0.12 || (x.l < 0.08 || x.l > 0.97);
    if (gris) {
      if (x.l >= 0.94) return c;                                    // blanco: va sobre un acento
      x.l = x.l < 0.5 ? 1 - x.l * 0.85 : Math.max(0.52, 1.12 - x.l); // los grises invierten su jerarquía
      x.s = 0;
      return rgb(x);
    }
    // Un color se aclara mezclándolo con blanco, no subiéndole la luz: el rojo #CC0000 sube a #e88a8a, no a #ff0f0f.
    var y = { r: c.r, g: c.g, b: c.b, a: c.a }, k = 0;
    while (contraste(y, TARJETA) < (meta || 4.5) && k < 0.9) {
      k += 0.02;
      y = { r: c.r + (255 - c.r) * k, g: c.g + (255 - c.g) * k, b: c.b + (255 - c.b) * k, a: c.a };
    }
    return y;
  }
  function fondo(c) {
    if (!c || c.a === 0) return c;
    var x = hsl(c), gris = x.s < 0.12;
    if (c.a < 1) {
      if (gris && x.l < 0.5) return c.a >= 0.3 ? c : { r: 255, g: 255, b: 255, a: Math.min(0.4, Math.max(0.03, c.a * 1.15)) };
      if (!gris && x.l < 0.85) { var t = texto({ r: c.r, g: c.g, b: c.b, a: 1 }, 3); t.a = Math.min(0.4, c.a * 1.4); return t; }
    }
    if (x.l >= 0.6) { x.l = Math.min(0.2, 0.095 + Math.abs(x.l - PAPEL) * 0.9); x.s *= x.s < 0.3 ? 0.35 : 0.6; }
    else if (x.l < 0.3) x.l = 0.2 + x.l * 0.5;                      // lo negro con letra blanca: gris levantado
    return rgb(x);
  }
  function borde(c) {
    if (!c || c.a === 0) return c;
    var x = hsl(c), gris = x.s < 0.12;
    if (c.a < 1) {
      if (gris) return x.l < 0.5 ? { r: 255, g: 255, b: 255, a: Math.min(0.5, Math.max(0.07, c.a * 1.2)) }
        : { r: 255, g: 255, b: 255, a: c.a * 0.15 };
      if (x.l < 0.85) { var t = texto({ r: c.r, g: c.g, b: c.b, a: 1 }, 3); t.a = c.a; return t; }
      x.l = 0.3; x.s *= 0.6; return rgb(x);
    }
    if (gris) { x.l = x.l >= 0.6 ? 0.2 + (1 - x.l) * 0.6 : Math.max(0.55, 1 - x.l); return rgb(x); }
    if (x.l >= 0.7) { x.l = 0.3; x.s *= 0.6; return rgb(x); }
    return texto(c, 3);
  }
  function sombra(c) {
    if (!c || c.a === 0) return c;
    var x = hsl(c);
    if (x.s < 0.2) {
      if (x.l < 0.5) return { r: 0, g: 0, b: 0, a: Math.min(0.6, c.a * 2.2 + 0.08) };
      return c.a >= 0.9 ? fondo(c) : { r: 255, g: 255, b: 255, a: c.a * 0.06 };
    }
    return borde(c);
  }
  var MAPA = { fondo: fondo, texto: texto, borde: borde, sombra: sombra };

  // white y black solo como palabra suelta: dentro de var(--black) no son un color.
  var LITERAL = /#[0-9a-fA-F]{3,8}\b|rgba?\([^()]*\)|(?<![\w-])(?:white|black)(?![\w-])/g;
  function colores(valor, papel) {
    var f = MAPA[papel];
    return valor.split(/(url\([^)]*\))/).map(function (trozo, i) {
      if (i % 2) return trozo;
      return trozo.replace(LITERAL, function (m) { var c = lee(m); return c ? escribe(f(c)) : m; });
    }).join('');
  }
  function oscuroDe(valor, papel) { var c = lee(valor); return c ? escribe(MAPA[papel](c)) : null; }

  /* ── El papel de cada propiedad ── */
  var P_TEXTO = /^(color|-webkit-text-fill-color|caret-color|text-decoration(-color)?|text-emphasis-color|fill|stroke|accent-color|stop-color|-webkit-text-stroke(-color)?)$/;
  var P_FONDO = /^background(-color|-image)?$/;
  var P_BORDE = /^(border|outline|column-rule)(-(top|right|bottom|left|block|inline)(-(start|end))?)?(-color)?$|^scrollbar-color$/;
  var P_SOMBRA = /^(box-shadow|text-shadow)$/;
  function papelDe(prop) {
    if (P_TEXTO.test(prop)) return 'texto';
    if (P_FONDO.test(prop)) return 'fondo';
    if (P_BORDE.test(prop)) return 'borde';
    if (P_SOMBRA.test(prop)) return 'sombra';
    return null;
  }
  // Una variable toma el papel en que más se usa; usada a la vez de texto y de fondo, va para los dos (4:1).
  function papelesDe(textos) {
    var cuenta = {}, re = /([a-z-]+)\s*:[^;{}]*?var\(\s*(--[\w-]+)/g, m;
    textos.forEach(function (t) {
      re.lastIndex = 0;
      while ((m = re.exec(t))) {
        var p = papelDe(m[1]); if (!p) continue;
        var c = cuenta[m[2]] || (cuenta[m[2]] = { texto: 0, fondo: 0, borde: 0, sombra: 0 });
        c[p]++;
      }
    });
    var out = {};
    Object.keys(cuenta).forEach(function (v) {
      var c = cuenta[v], tot = c.texto + c.fondo + c.borde + c.sombra;
      var mayor = Object.keys(c).sort(function (a, b) { return c[b] - c[a]; })[0];
      out[v] = c.texto / tot >= 0.1 && c.fondo / tot >= 0.1 && c.fondo < c.texto ? 'ambos' : mayor;
    });
    return out;
  }
  function papelVar(nombre, papeles) {
    if (/shadow|sombra/.test(nombre)) return 'sombra';
    if (papeles[nombre]) return papeles[nombre];
    if (/bg|fondo|surface|soft/.test(nombre)) return 'fondo';
    if (/border|borde|line/.test(nombre)) return 'borde';
    if (/text|txt|ink/.test(nombre)) return 'texto';
    return 'ambos';
  }

  /* ── El CSS: reglas, @media y @keyframes, sin depender del navegador (corre también en Node) ── */
  function sinComentarios(t) { return t.replace(/\/\*[\s\S]*?\*\//g, ''); }
  function cierre(t, i) {               // i apunta a '{'; devuelve la posición de su '}'
    var n = 0, q = null;
    for (; i < t.length; i++) {
      var ch = t.charAt(i);
      if (q) { if (ch === '\\') i++; else if (ch === q) q = null; continue; }
      if (ch === '"' || ch === "'") q = ch;
      else if (ch === '{') n++;
      else if (ch === '}' && --n === 0) return i;
    }
    return t.length;
  }
  function bloques(t) {
    var out = [], i = 0;
    while (i < t.length) {
      var a = t.indexOf('{', i), sc = t.indexOf(';', i);
      if (a < 0) break;
      var cab = t.slice(i, a).trim();
      if (cab.charAt(0) === '@' && sc >= 0 && sc < a) { i = sc + 1; continue; }   // @import, @charset
      if (cab.charAt(0) !== '@') cab = cab.replace(/^[\s\S]*;/, '').trim();
      var z = cierre(t, a), cuerpo = t.slice(a + 1, z);
      if (cab.charAt(0) === '@') {
        if (/^@(media|supports|container|layer)\b/.test(cab)) out.push({ at: cab, hijos: bloques(cuerpo) });
        else if (/keyframes\b/.test(cab)) out.push({ at: cab, cuadros: bloques(cuerpo) });
      } else out.push({ sel: cab, decl: declaraciones(cuerpo) });
      i = z + 1;
    }
    return out;
  }
  function declaraciones(cuerpo) {
    var out = [], n = 0, q = null, ini = 0;
    for (var i = 0; i <= cuerpo.length; i++) {
      var ch = cuerpo.charAt(i);
      if (q) { if (ch === q) q = null; continue; }
      if (ch === '"' || ch === "'") q = ch;
      else if (ch === '(') n++;
      else if (ch === ')') n--;
      else if ((ch === ';' && !n) || i === cuerpo.length) {
        var d = cuerpo.slice(ini, i), k = d.indexOf(':');
        if (k > 0) out.push({ prop: d.slice(0, k).trim().toLowerCase(), val: d.slice(k + 1).trim() });
        ini = i + 1;
      }
    }
    return out;
  }

  /* Cada var(…) de un valor, con su paréntesis completo (el respaldo puede llevar otro var). */
  function conVars(v, f) {
    var out = '', i = 0, k;
    while ((k = v.indexOf('var(', i)) >= 0) {
      var n = 0, z = k + 3;
      for (; z < v.length; z++) { if (v.charAt(z) === '(') n++; else if (v.charAt(z) === ')' && --n === 0) break; }
      var todo = v.slice(k, z + 1), nombre = (/^var\(\s*(--[\w-]+)/.exec(todo) || [])[1];
      out += v.slice(i, k) + (nombre ? f(nombre, todo) : todo);
      i = z + 1;
    }
    return out + v.slice(i);
  }
  // Una variable que no es de fondo lleva un GEMELO para cuando se usa de fondo: --c (el color de cada caso en
  // casos.html) es letra en un título y fondo en su pestaña; con un solo valor uno de los dos quedaba sin contraste.
  var GEMELO = '--fondo';
  function conGemelo(papel) { return papel !== 'fondo' && papel !== 'sombra'; }

  /* Una regla: sus declaraciones de color convertidas, en orden, cada una con el índice de la original. */
  function regla(decl, ctx) {
    var clip = decl.some(function (d) {
      return (/background-clip$/.test(d.prop) && /text/.test(d.val)) || (d.prop === '-webkit-text-fill-color' && /transparent/.test(d.val));
    });
    function papel(d) {
      if (d.prop.slice(0, 2) === '--') { var r = papelVar(d.prop, ctx.papeles); return r === 'ambos' ? 'texto' : r; }
      var p = papelDe(d.prop);
      return p === 'fondo' && clip ? 'texto' : p;
    }
    // Una variable global usada en un papel que no es el suyo (var(--red) de fondo, var(--black) de botón) se
    // resuelve aquí con este papel, desde su valor en claro; una que no se conoce, de fondo, toma su gemelo.
    function valor(v, p) {
      v = conVars(v, function (n, todo) {
        var tk = ctx.tokens[n];
        if (tk) return tk[1] === p || (tk[1] === 'ambos' && p !== 'fondo') ? todo : (oscuroDe(tk[0], p) || todo);
        if (p === 'fondo' && conGemelo(papelVar(n, ctx.papeles))) return 'var(' + n + GEMELO + ',' + todo + ')';
        return todo;
      });
      return colores(v, p);
    }
    var out = [], fondoClaro = false, fuente = null;
    decl.forEach(function (d, i) {
      var p = papel(d);
      if (!p) return;
      if (d.prop.slice(0, 2) === '--') {
        out.push({ i: i, prop: d.prop, val: colores(d.val, p), orig: d.val });
        if (conGemelo(p) && (d.val.search(LITERAL) >= 0 || /var\(/.test(d.val))) out.push({ i: i, prop: d.prop + GEMELO, val: valor(d.val, 'fondo'), orig: d.val });
        return;
      }
      var v = valor(d.val, p);
      if ((d.prop === 'background' || d.prop === 'background-color') && !clip) {
        var c = lee(v.replace(/\s*!important$/, ''));
        if (c && c.a > 0.8 && luz(c) > 0.25) fondoClaro = true;
        fuente = d.val;
      }
      out.push({ i: i, prop: d.prop, val: v, orig: d.val });
    });
    // Lo que se queda claro conserva su letra oscura; el borde igual a su fondo lo sigue.
    out.forEach(function (o) {
      if (o.prop === 'color' && fondoClaro) {
        var oc = lee(o.orig.replace(/\s*!important$/, '').replace(/^var\(\s*(--[\w-]+)\s*\)$/, function (m, n) { return ctx.tokens[n] ? ctx.tokens[n][0] : m; }));
        o.val = oc && luz(oc) > 0.5 ? TINTA : (oc ? escribe(oc) : o.orig);
      }
      if (fuente && /^border(-[a-z]+)?-color$/.test(o.prop) && o.orig === fuente) {
        var f = out.filter(function (x) { return x.prop === 'background' || x.prop === 'background-color'; })[0];
        if (f) o.val = f.val;
      }
    });
    // Van todas, cambien o no: así cada declaración de color de la hoja queda tapada por su copia, en orden.
    return out;
  }
  function capaDe(nodos, ctx) {
    var out = [];
    nodos.forEach(function (n) {
      if (n.sel) {
        if (/^@font-face/.test(n.sel)) return;
        var d = regla(n.decl, ctx);
        if (d.length) out.push(n.sel + '{' + d.map(function (o) { return o.prop + ':' + o.val; }).join(';') + '}');
      } else if (n.hijos) {
        var h = capaDe(n.hijos, ctx);
        if (h) out.push(n.at + '{' + h + '}');
      } else if (n.cuadros) {
        // Un @keyframes se reemplaza entero (el último gana): va completo, con sus colores convertidos.
        var hay = false, k = n.cuadros.map(function (q) {
          return q.sel + '{' + q.decl.map(function (d) {
            var p = papelDe(d.prop); if (p) { hay = true; return d.prop + ':' + colores(d.val, p); }
            return d.prop + ':' + d.val;
          }).join(';') + '}';
        }).join('');
        if (hay) out.push(n.at + '{' + k + '}');
      }
    });
    return out.join('\n');
  }
  // Las variables con color definidas en :root: su valor en claro y su papel.
  function tokensDe(nodos, papeles, out) {
    out = out || {};
    nodos.forEach(function (n) {
      if (n.hijos) return;
      if (n.sel && /^(:root|html)$/.test(n.sel)) n.decl.forEach(function (d) {
        if (d.prop.slice(0, 2) === '--' && lee(d.val)) out[d.prop] = [d.val, papelVar(d.prop, papeles)];
      });
    });
    return out;
  }
  function contexto(textos, tokens) {
    var papeles = papelesDe(textos), tk = {};
    Object.keys(TOKENS).forEach(function (k) { tk[k] = TOKENS[k]; });
    Object.keys(tokens || {}).forEach(function (k) { tk[k] = tokens[k]; });
    return { papeles: papeles, tokens: tk };
  }
  function capa(css, ctx) {
    var nodos = bloques(sinComentarios(css));
    ctx = ctx || contexto([css]);
    tokensDe(nodos, ctx.papeles, ctx.tokens);
    return capaDe(nodos, ctx);
  }
  function estilo(attr, ctx) {
    var d = declaraciones(attr);
    if (!d.some(function (x) { return papelDe(x.prop) || x.prop.slice(0, 2) === '--'; })) return attr;
    var conv = regla(d, ctx);
    return d.map(function (x, i) {
      var c = conv.filter(function (o) { return o.i === i; });
      return c.length ? c.map(function (o) { return o.prop + ':' + o.val; }).join(';') : x.prop + ':' + x.val;
    }).join(';');
  }

  /* ── HOJAS: generado por `node Aleman/oscuro.js` desde styles.css, k10.css y partizip.css. No se edita a mano. ── */
  var TOKENS = {"--black":["#1a1a1a","texto"],"--red":["#CC0000","ambos"],"--red-dark":["#aa0000","texto"],"--gold":["#D4A000","ambos"],"--gold-dark":["#b08800","texto"],"--bg":["#f5f4f0","fondo"],"--surface":["#ffffff","fondo"],"--surface2":["#eeece8","fondo"],"--border":["rgba(0,0,0,.09)","borde"],"--text":["#1a1a1a","texto"],"--text2":["#555","texto"],"--text3":["#999","texto"],"--pz-i":["#1668c7","ambos"],"--pz-i-bg":["rgba(22,104,199,.08)","fondo"],"--pz-ii":["#d97400","ambos"],"--pz-ii-bg":["rgba(217,116,0,.10)","fondo"]};
  var HOJAS = {
    "styles.css": ":root{--black:#e9e9e9;--black--fondo:#404040;--red:#e88a8a;--red--fondo:#cc0000;--red-dark:#da8f8f;--red-dark--fondo:#aa0000;--gold:#d4a000;--gold--fondo:#d4a000;--gold-dark:#be9d2e;--gold-dark--fondo:#b08800;--bg:#1b1a17;--surface:#232323;--surface2:#22201e;--border:rgba(255,255,255,0.108);--border--fondo:rgba(255,255,255,0.104);--text:#e9e9e9;--text--fondo:#404040;--text2:#b7b7b7;--text2--fondo:#555555;--text3:#858585;--text3--fondo:#333333;--r:14px;--rs:9px;--shadow:0 2px 12px rgba(0,0,0,0.234);--shadow-md:0 4px 24px rgba(0,0,0,0.3)}\nbody{background:var(--bg);color:var(--text)}\n::-webkit-scrollbar-track{background:transparent}\n::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.173)}\n.nav{background:rgba(27,26,23,0.95);border-bottom:1px solid rgba(255,255,255,0.096);box-shadow:0 1px 8px rgba(0,0,0,0.212)}\n.nav-logo{background:linear-gradient(90deg,var(--red),var(--gold-dark));-webkit-text-fill-color:transparent;text-decoration:none}\n.nav-link{text-decoration:none;color:var(--text2)}\n.nav-link:hover{color:var(--red);background:rgba(221,87,87,0.084)}\n.nav-link.active{background:rgba(221,87,87,0.112);color:var(--red);border:1px solid rgba(221,87,87,0.18)}\n.nav-back{text-decoration:none;color:var(--text2);border:1px solid var(--border);background:var(--surface)}\n.nav-back:hover{color:var(--red);border-color:rgba(221,87,87,0.25);background:#232323}\n.hero::before{background:radial-gradient(ellipse 70% 60% at 50% 0%,rgba(221,87,87,0.084) 0%,transparent 70%),radial-gradient(ellipse 50% 40% at 80% 100%,rgba(212,160,0,0.098) 0%,transparent 60%)}\n.flag-black{background:#404040}\n.flag-red{background:#cc0000}\n.flag-gold{background:#ffce00}\n.hero-tag{background:rgba(221,87,87,0.112);color:var(--red);border:1px solid rgba(221,87,87,0.2)}\n.hero h1{color:var(--black)}\n.hero h1 span{background:linear-gradient(90deg,var(--red),var(--gold-dark));-webkit-text-fill-color:transparent}\n.hero p{color:var(--text2)}\n.hero-stat-n{color:var(--red)}\n.hero-stat-l{color:var(--text3)}\n.sh-badge.a1{background:rgba(212,160,0,0.168);color:var(--gold-dark);border:1px solid rgba(212,160,0,0.25)}\n.sh-badge.a2{background:rgba(221,87,87,0.112);color:var(--red);border:1px solid rgba(221,87,87,0.18)}\n.sh h2{color:var(--text)}\n.sh-line{background:rgba(35,35,35,0.104)}\n.topic-card{background:var(--surface);border:1px solid var(--border);text-decoration:none;color:var(--text);box-shadow:var(--shadow)}\n.topic-card.a1::before{background:linear-gradient(135deg,rgba(212,160,0,0.084),transparent)}\n.topic-card.a2::before{background:linear-gradient(135deg,rgba(221,87,87,0.07),transparent)}\n.topic-card:hover{border-color:rgba(221,87,87,0.2);box-shadow:var(--shadow-md)}\n.topic-num{color:var(--text3)}\n.topic-title{color:var(--text)}\n.topic-sub{color:var(--text2)}\n.topic-tag{background:rgba(255,255,255,0.057);color:var(--text2)}\n.topic-arrow{color:var(--red)}\n.topic-hero{border-bottom:1px solid var(--border);background:linear-gradient(180deg,rgba(221,87,87,0.042) 0%,transparent 100%)}\n.topic-hero-tag{color:var(--red)}\n.topic-hero h1{color:var(--black)}\n.topic-hero h1 em{color:var(--red)}\n.topic-hero-desc{color:var(--text2)}\n.meta-pill{background:var(--surface);border:1px solid var(--border);color:var(--text2);box-shadow:var(--shadow)}\n.card{background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow)}\n.card-gold{border-color:rgba(212,160,0,0.25);background:linear-gradient(135deg,rgba(212,160,0,0.07),var(--surface))}\n.card-red{border-color:rgba(221,87,87,0.15);background:linear-gradient(135deg,rgba(221,87,87,0.056),var(--surface))}\n.card h3{color:var(--text2)}\n.rule-box{background:rgba(255,255,255,0.034);border:1.5px solid rgba(212,160,0,0.3);color:var(--text)}\n.rule-box strong{color:var(--red)}\n.vocab-table th{color:var(--red);border-bottom:1px solid rgba(221,87,87,0.15)}\n.vocab-table td{border-bottom:1px solid var(--border);color:var(--text)}\n.vocab-table tr:last-child td{border-bottom:none}\n.vocab-table tbody tr:hover td{background:rgba(221,87,87,0.042)}\n.vocab-de{color:var(--black)}\n.vocab-es{color:var(--text2)}\n.vocab-ex{color:var(--text3)}\n.example{background:rgba(255,255,255,0.034);border-left:3px solid #b08800}\n.example-de{color:var(--black)}\n.example-es{color:var(--text2)}\n.exercise{background:var(--surface2);border:1px solid var(--border)}\n.exercise-num{color:var(--red)}\n.exercise-q{color:var(--text)}\n.exercise-blank{background:rgba(255,255,255,0.173)}\n.exercise-hint{color:var(--text3)}\n.placeholder{border:1.5px dashed rgba(255,255,255,0.144);color:var(--text3);background:rgba(255,255,255,0.03)}\n.prog-label{color:var(--text2)}\n.prog-bar{background:rgba(255,255,255,0.092)}\n.prog-fill{background:linear-gradient(90deg,#cc0000,#b08800)}\n.page-nav{border-top:1px solid var(--border);background:var(--surface2)}\n.page-nav-btn{border:1px solid var(--border);background:var(--surface);text-decoration:none;color:var(--text);box-shadow:var(--shadow)}\n.page-nav-btn:hover{border-color:rgba(221,87,87,0.25);background:#232323;box-shadow:var(--shadow-md)}\n.page-nav-dir{color:var(--text3)}\n.page-nav-title{color:var(--text)}\n.footer{border-top:1px solid var(--border);background:var(--surface)}\n.footer p{color:var(--text3)}\n.motivation{background:linear-gradient(135deg,rgba(221,87,87,0.07),rgba(212,160,0,0.098));border:1px solid rgba(212,160,0,0.2);box-shadow:var(--shadow)}\n.motivation-quote{color:var(--black)}\n.motivation-attr{color:var(--text2)}\n.progress-overview{background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow)}\n.progress-overview h3{color:var(--text2)}\n.dialog-box{background:var(--surface2);border:1px solid var(--border)}\n.dialog-speaker{color:var(--red)}\n.dialog-de{color:var(--black)}\n.dialog-es{color:var(--text2)}\n.fc-progress{color:var(--text3)}\n.fc-card{outline:none}\n.fc-face{box-shadow:var(--shadow-md)}\n.fc-front{background:linear-gradient(135deg,var(--surface),var(--surface2));border:1.5px solid var(--border)}\n.fc-back{background:linear-gradient(135deg,#cc0000,#b08800);color:#ffffff}\n.fc-card:focus-visible .fc-face{box-shadow:0 0 0 3px rgba(221,87,87,0.35),var(--shadow-md)}\n.fc-art{color:var(--red)}\n.fc-de{color:var(--black)}\n.fc-hint{color:var(--text3)}\n.fc-btn{border:1.5px solid var(--border);background:var(--surface);color:var(--text2);box-shadow:var(--shadow)}\n.fc-btn:hover{border-color:rgba(221,87,87,0.3);color:var(--red)}\n.fc-shuffle{background:#404040;color:#ffffff;border-color:#404040}\n.fc-shuffle:hover{color:#ffffff}\n.phrase-item{background:var(--surface2);border:1px solid var(--border)}\n.phrase-situation{color:var(--gold-dark)}\n.phrase-de{color:var(--black)}\n.phrase-es{color:var(--text2)}\n.section-label{color:var(--text3);border-bottom:1px solid var(--border)}\n.nav.ini-barra{background:rgba(35,32,23,0.96);border-bottom:1px solid #545045;box-shadow:none}\n.ini-marca{color:var(--black);text-decoration:none}\n.ini-bandera i:nth-child(1){background:#404040}\n.ini-bandera i:nth-child(2){background:#cc0000}\n.ini-bandera i:nth-child(3){background:#e8b500}\n.ini-nav a{color:#bcbcbc;text-decoration:none}\n.ini-nav a:hover{color:var(--black);background:#23211e}\n.ini-nav a.on{background:#535353;color:#ffffff}\n.ini-dash{border:1px solid #534f46;background:#232323;color:var(--black);text-decoration:none}\n.ini-dash:hover{border-color:#434343}\n.lec-foto img{box-shadow:var(--shadow-md);background:var(--surface2)}\n.lec-foto figcaption{color:var(--text3)}\n.lec-indice{background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow)}\n.lec-indice-t{color:var(--text2)}\n.lec-indice li a{color:var(--text);text-decoration:none;border-bottom:1px solid var(--border)}\n.lec-indice li a::before{color:var(--red)}\n.lec-indice li a:hover{color:var(--red)}\n.lec-indice-p{background:#535353;color:#ffffff;text-decoration:none}\n.lec-indice-p:hover{background:#cc0000}\n.lec-practica-cab h2{color:var(--text2)}\n.lec-chips a{border:1px solid var(--border);background:var(--surface);color:var(--text2);text-decoration:none}\n.lec-chips a:hover{border-color:rgba(221,87,87,0.35);color:var(--red)}\n@media(min-width:1280px){.lec-practica{background:#242320;border:1px solid var(--border)}\n.lec-practica-cab{background:#242320;border-bottom:1px solid var(--border)}}",
    "k10.css": ".k10-slot{background:var(--surface);border:1px solid var(--border)}\n.k10-slot-lbl{color:#949494}\n.k10-slot-w{color:var(--black)}\n.k10-aux{border-color:var(--red);background:rgba(221,87,87,0.07)}\n.k10-aux .k10-slot-w{color:var(--red)}\n.k10-part{border-color:var(--gold);background:rgba(212,160,0,0.126)}\n.k10-part .k10-slot-w{color:var(--gold-dark)}\n.k10-plus{color:#858585}\n.k10-trad{color:#a8a8a8}\n.k10-hl{background:rgba(212,160,0,0.4)}\n.k10-mini{color:#9a9a9a}\n.k10-de{color:var(--black)}\n.k10-col{border:1px solid var(--border);background:var(--surface)}\n.k10-col-haben{border-left:4px solid var(--red)}\n.k10-col-sein{border-left:4px solid var(--gold)}\n.k10-col-haben .k10-col-t{color:var(--red)}\n.k10-col-sein .k10-col-t{color:var(--gold-dark)}\n.k10-ej{border:1px solid var(--border);background:var(--surface)}\n.k10-ej.bien{border-color:#1a9e5c;background:rgba(26,158,92,0.084)}\n.k10-ej.mal{border-color:var(--red);background:rgba(221,87,87,0.07)}\n.k10-ej-n{background:#535353;color:#ffffff}\n.k10-ej-inf{color:var(--black)}\n.k10-ej-flecha{color:#858585}\n.k10-ej-in{border:1px solid var(--border);background:#232323}\n.k10-ej-in:focus{outline:none;border-color:var(--red);box-shadow:0 0 0 3px rgba(221,87,87,0.1)}\n.k10-ej.bien .k10-ej-in{border-color:#1a9e5c}\n.k10-ej-pista{color:#949494}\n.k10-ej.bien .k10-ej-marca{color:#4cb380}\n.k10-ej.mal .k10-ej-marca{color:var(--red)}\n.k10-ej-ayuda{border:1px solid var(--border);background:#232323;color:#969696}\n.k10-ej-ayuda:hover{border-color:var(--gold);color:var(--gold-dark)}\n.k10-q{border:1px solid var(--border);background:var(--surface)}\n.k10-q.resuelto{border-color:#1a9e5c;background:rgba(26,158,92,0.07)}\n.k10-q-frase{color:var(--black)}\n.k10-q-hueco{border-bottom:2px solid var(--red);color:var(--red)}\n.k10-q-hueco.lleno{border-bottom-color:#1a9e5c;color:#4cb380}\n.k10-op{border:1px solid var(--border);background:#232323}\n.k10-op:hover{border-color:#434343}\n.k10-op.bien{background:#1a9e5c;border-color:#1a9e5c;color:#18181b}\n.k10-op.mal{background:rgba(221,87,87,0.14);border-color:var(--red);color:var(--red)}\n.k10-q-por.bien{background:rgba(26,158,92,0.126);color:#71af90}\n.k10-q-por.mal{background:rgba(221,87,87,0.098);color:var(--red-dark)}\n.k10-ord{border:1px solid var(--border);background:var(--surface)}\n.k10-ord.resuelto{border-color:#1a9e5c;background:rgba(26,158,92,0.07)}\n.k10-ord-es{color:#a8a8a8}\n.k10-ord-linea{border:2px dashed var(--border);background:#1e1e1e}\n.k10-pieza{border:1px solid var(--border);background:#232323}\n.k10-pieza:hover{border-color:var(--red)}\n.k10-ord-linea .k10-pieza{background:rgba(221,87,87,0.084);border-color:rgba(221,87,87,0.3)}\n.k10-ord-msg.bien{color:#71af90}\n.k10-ord-msg.mal{color:var(--red)}\n.k10-prog-bar{background:rgba(255,255,255,0.081)}\n.k10-prog-bar span{background:linear-gradient(90deg,#d4a000,#cc0000)}\n.k10-prog.lleno .k10-prog-bar span{background:#1a9e5c}\n.k10-prog-txt{color:#9a9a9a}\n.k10-buscador{border:1px solid var(--border);background:#232323}\n.k10-buscador:focus{outline:none;border-color:var(--red);box-shadow:0 0 0 3px rgba(221,87,87,0.1)}\n.k10-sin{color:#969696}\n.k10-tag-sein{background:rgba(212,160,0,0.252);color:var(--gold-dark)}\n.k10-tag-haben{background:rgba(221,87,87,0.14);color:var(--red)}\n.k10-filtro{border:1px solid var(--border);background:#232323;color:#a8a8a8}\n.k10-filtro:hover{border-color:#434343;color:var(--black)}\n.k10-filtro.on{background:#535353;border-color:#535353;color:#ffffff}\n.k10-conteo{color:#949494}\n.k10-3p{color:var(--red)}\n.k10-prat{color:#c5c5c5}\n.k10-tag-ambos{background:linear-gradient(90deg,rgba(221,87,87,0.14),rgba(212,160,0,0.252));color:#bb9f6b}\n.k10-verbos thead th{background:var(--surface);box-shadow:0 1px 0 rgba(0,0,0,0.6)}\n.k10-say{border:none;background:none}\n.k10-em-cab span{color:#949494}\n.k10-em-b{border:1px solid var(--border);background:#232323}\n.k10-em-b:hover{border-color:#434343}\n.k10-em-b.sel{border-color:var(--red);background:rgba(221,87,87,0.098);box-shadow:0 0 0 3px rgba(221,87,87,0.1)}\n.k10-em-b.ok{border-color:#1a9e5c;background:rgba(26,158,92,0.14);color:#71af90}\n.k10-em-b.nope{border-color:var(--red);background:rgba(221,87,87,0.168)}\n.k10-hueco-txt{color:var(--black)}\n.k10-hueco-in{border:none;border-bottom:2px solid var(--red);color:var(--red);background:rgba(221,87,87,0.056)}\n.k10-hueco-in:focus{outline:none;background:rgba(221,87,87,0.126)}\n.k10-hueco-in.bien{border-bottom-color:#1a9e5c;color:#71af90;background:rgba(26,158,92,0.126)}\n.k10-hueco-in.mal{border-bottom-color:var(--red);background:rgba(221,87,87,0.196)}\n.k10-hueco-in::placeholder{color:#858585}\n.k10-conj-tab{border:1px solid var(--border);background:#232323;color:#a8a8a8}\n.k10-conj-tab:hover{border-color:#434343;color:var(--black)}\n.k10-conj-tab.on{background:#cc0000;border-color:#cc0000;color:#ffffff}\n.k10-conj{border:1px solid var(--border);background:var(--surface)}\n.k10-conj-cab{border-bottom:1px solid var(--border)}\n.k10-conj-es{color:#969696}\n.k10-conj-pron{color:#a8a8a8}\n.k10-conj-in{border:1px solid var(--border);background:#232323}\n.k10-conj-in:focus{outline:none;border-color:var(--red);box-shadow:0 0 0 3px rgba(221,87,87,0.1)}\n.k10-conj-in.bien{border-color:#1a9e5c;background:rgba(26,158,92,0.112);color:#71af90}\n.k10-conj-in.mal{border-color:var(--red);background:rgba(221,87,87,0.084)}\n.k10-conj-part{color:var(--gold-dark)}\n.k10-conj-nota{border-top:1px solid var(--border);color:#9a9a9a}\n.k10-test-n{color:#949494}\n.k10-test-marcador{color:#4cb380}\n.k10-test-bar{background:rgba(255,255,255,0.081)}\n.k10-test-bar span{background:linear-gradient(90deg,#d4a000,#cc0000)}\n.k10-test-q{color:var(--black)}\n.k10-test-fin.bien{background:rgba(26,158,92,0.14)}\n.k10-test-fin.medio{background:rgba(212,160,0,0.182)}\n.k10-test-fin.mal{background:rgba(221,87,87,0.112)}\n.k10-test-nota{color:var(--black)}\n.k10-test-msg{color:#b7b7b7}\n.k10-test-t{color:#969696}\n.k10-test-rev{border:1px solid var(--border);background:var(--surface)}\n.k10-test-f{border-bottom:1px solid var(--border)}\n.k10-test-f:last-child{border-bottom:none}\n.k10-test-fq{color:var(--black)}\n.k10-test-fp{color:var(--red-dark)}\n.k10-test-otra{border:none;background:#535353;color:#ffffff}\n.k10-test-otra:hover{background:#cc0000}\n.k10-dic{border:1px solid var(--border);background:var(--surface)}\n.k10-dic.bien{border-color:#1a9e5c;background:rgba(26,158,92,0.084)}\n.k10-dic.mal{border-color:var(--red);background:rgba(221,87,87,0.07)}\n.k10-dic-play{border:1px solid var(--border);background:#232323;color:var(--red)}\n.k10-dic-play:hover{background:#cc0000;color:#ffffff;border-color:#cc0000}\n.k10-dic-in{border:1px solid var(--border);background:#232323}\n.k10-dic-in:focus{outline:none;border-color:var(--red);box-shadow:0 0 0 3px rgba(221,87,87,0.1)}\n.k10-dic-es{color:#858585}\n.lec-avance-res{color:var(--text2)}\n.lec-avance-res b{color:var(--text)}\n.lec-avance-res .tarde{color:var(--red)}\n.lec-avance a{text-decoration:none;color:var(--text)}\n.lec-avance a:hover{background:rgba(255,255,255,0.046)}\n.lec-avance-b{background:rgba(255,255,255,0.081)}\n.lec-avance-b i{background:#cc0000}\n.lec-avance li.lleno .lec-avance-b i{background:#1a9e5c}\n.lec-avance-c{color:var(--text3)}\n.lec-avance li.lleno .lec-avance-c{color:#4cb380}\n.lec-chips a.hecho{border-color:rgba(26,158,92,0.45);color:#6db08f}",
    "partizip.css": ":root{--pz-i:#73a4dd;--pz-i--fondo:#1668c7;--pz-i-bg:rgba(64,131,209,0.112);--pz-ii:#e19033;--pz-ii--fondo:#d97400;--pz-ii-bg:rgba(217,116,0,0.14)}\n.pz-i{color:var(--pz-i)}\n.pz-ii{color:var(--pz-ii)}\n.pz-lead{color:var(--black)}\n.pz-lado{border:1px solid var(--border)}\n.pz-uno{background:var(--pz-i-bg);border-color:rgba(64,131,209,0.3)}\n.pz-dos{background:var(--pz-ii-bg);border-color:rgba(217,116,0,0.32)}\n.pz-uno .pz-badge{background:#1668c7;color:#ffffff}\n.pz-dos .pz-badge{background:#d97400;color:#18181b}\n.pz-frase{color:var(--black)}\n.pz-uno .pz-frase b{color:var(--pz-i)}\n.pz-dos .pz-frase b{color:var(--pz-ii)}\n.pz-trad{color:#b7b7b7}\n.pz-nota{color:#9a9a9a;border-top:1px solid var(--border)}\n.pz-vs{color:#858585}\n.pz-build{border:1px solid var(--border)}\n.pz-build-i{background:var(--pz-i-bg);border-color:rgba(64,131,209,0.25)}\n.pz-build-ii{background:var(--pz-ii-bg);border-color:rgba(217,116,0,0.25)}\n.pz-build-t{color:var(--black)}\n.pz-chip{color:#ffffff}\n.pz-chip-i{background:#1668c7}\n.pz-chip-ii{background:#d97400}\n.pz-paso{background:#232323;border:1px solid var(--border)}\n.pz-paso-n{background:#535353;color:#ffffff}\n.pz-paso-w{color:var(--black)}\n.pz-paso-l{color:#969696}\n.pz-paso.pz-ok{border-color:#1a9e5c;box-shadow:0 0 0 2px rgba(26,158,92,0.13)}\n.pz-paso.pz-ok .pz-paso-w{color:#71af90}\n.pz-add{background:rgba(212,160,0,0.4)}\n.pz-vow{background:rgba(221,87,87,0.308)}\n.pz-flecha{color:#858585}\n.pz-msg{color:#b7b7b7}\n.pz-ejs span{background:#232323;border:1px solid var(--border);color:var(--black)}\n.pz-comp thead .pz-th-i{color:var(--pz-i);border-bottom:2px solid var(--pz-i)}\n.pz-comp thead .pz-th-ii{color:var(--pz-ii);border-bottom:2px solid var(--pz-ii)}\n.pz-comp td:nth-child(2){background:var(--pz-i-bg)}\n.pz-comp td:nth-child(3){background:var(--pz-ii-bg)}\n.pz-warn{background:rgba(221,87,87,0.084);border-left:4px solid var(--red)}\n.pz-uso{border:1px solid var(--border)}\n.pz-uso-i{background:var(--pz-i-bg);border-color:rgba(64,131,209,0.25)}\n.pz-uso-ii{background:var(--pz-ii-bg);border-color:rgba(217,116,0,0.25)}\n.pz-uso-b{background:#232323;border:1px solid var(--border)}\n.pz-uso-n{color:var(--black)}\n.pz-uso-tag{background:rgba(255,255,255,0.069);color:#9a9a9a}\n.pz-tabla thead .pz-th-i{color:var(--pz-i)}\n.pz-tabla thead .pz-th-ii{color:var(--pz-ii)}\n.pz-tabla td.p1-cel{color:var(--pz-i)}\n.p1-d{background:rgba(64,131,209,0.308)}\n.pz-tabla tbody tr:hover{background:rgba(255,255,255,0.03)}"
  };
  /* ── fin de HOJAS ── */

  /* ── En la página ── */
  var activo = false, obs = null, ctxPag = null;
  function pinta(el) {
    if (el.nodeType !== 1 || !el.hasAttribute('style')) return;
    var s = el.getAttribute('style');
    if (el.__alOsc === s) return;
    el.__alClaro = s;
    var o = estilo(s, ctxPag);
    el.__alOsc = o;
    if (o !== s) el.setAttribute('style', o);
  }
  function aplicar(on) {
    var doc = document, html = doc.documentElement;
    if (on === activo) return;
    activo = on;
    html.classList.toggle('oscuro', on);
    if (!on) {
      if (obs) { obs.disconnect(); obs = null; }
      [].forEach.call(doc.querySelectorAll('style[data-al-oscuro]'), function (s) { s.remove(); });
      [].forEach.call(doc.querySelectorAll('[style]'), function (el) {
        if (el.__alClaro !== undefined && el.getAttribute('style') === el.__alOsc) el.setAttribute('style', el.__alClaro);
        el.__alClaro = el.__alOsc = undefined;
      });
      return;
    }
    var propios = [].filter.call(doc.querySelectorAll('style'), function (s) { return !s.hasAttribute('data-al-oscuro'); });
    var textos = propios.map(function (s) { return s.textContent; });
    ctxPag = contexto(textos);
    textos.forEach(function (t) { tokensDe(bloques(sinComentarios(t)), ctxPag.papeles, ctxPag.tokens); });
    function tras(nodo, css) {
      var s = doc.createElement('style'); s.setAttribute('data-al-oscuro', ''); s.textContent = css;
      nodo.parentNode.insertBefore(s, nodo.nextSibling);
    }
    [].forEach.call(doc.querySelectorAll('link[rel="stylesheet"][href]'), function (l) {
      var nombre = l.getAttribute('href').split('/').pop().split('?')[0];
      if (HOJAS[nombre]) tras(l, HOJAS[nombre]);
    });
    propios.forEach(function (s, i) { tras(s, capa(textos[i], ctxPag)); });
    var base = doc.createElement('style'); base.setAttribute('data-al-oscuro', '');
    base.textContent = 'html.oscuro{color-scheme:dark}html.oscuro img{filter:brightness(.92)}';
    doc.head.appendChild(base);
    [].forEach.call(doc.querySelectorAll('[style]'), pinta);
    obs = new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        if (m.type === 'attributes') pinta(m.target);
        else [].forEach.call(m.addedNodes, function (n) {
          if (n.nodeType !== 1) return;
          pinta(n); [].forEach.call(n.querySelectorAll('[style]'), pinta);
        });
      });
    });
    obs.observe(doc.body || html, { subtree: true, childList: true, attributes: true, attributeFilter: ['style'] });
  }

  var API = { lee: lee, escribe: escribe, colores: colores, capa: capa, estilo: estilo, contexto: contexto,
    bloques: bloques, tokensDe: tokensDe, papelesDe: papelesDe, aplicar: aplicar, HOJAS: HOJAS, TOKENS: TOKENS };
  raiz.ALEMAN_OSCURO = API;

  /* ── node Aleman/oscuro.js → recalcula HOJAS y TOKENS ── */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
    API.calcular = function (dir) {
      var fs = require('fs'), path = require('path');
      var leer = function (f) { return fs.readFileSync(path.join(dir, f), 'utf8'); };
      var todos = fs.readdirSync(dir).filter(function (f) { return /\.(css|html|js)$/.test(f) && f !== 'oscuro.js'; }).map(leer);
      var papeles = papelesDe(todos), tokens = {};
      var nombres = ['styles.css', 'k10.css', 'partizip.css'];
      nombres.forEach(function (n) { tokensDe(bloques(sinComentarios(leer(n))), papeles, tokens); });
      var ctx = { papeles: papeles, tokens: tokens }, hojas = {};
      nombres.forEach(function (n) { hojas[n] = capaDe(bloques(sinComentarios(leer(n))), ctx); });
      return { TOKENS: tokens, HOJAS: hojas };
    };
    API.bloqueGenerado = function (r) {
      return '  var TOKENS = ' + JSON.stringify(r.TOKENS) + ';\n  var HOJAS = ' + JSON.stringify(r.HOJAS, null, 2).replace(/\n/g, '\n  ') + ';\n';
    };
    if (require.main === module) {
      var fs = require('fs'), path = require('path'), yo = path.join(__dirname, 'oscuro.js');
      var txt = fs.readFileSync(yo, 'utf8');
      var ini = txt.indexOf('No se edita a mano. ── */\n'), fin = txt.indexOf('  /* ── fin de HOJAS ── */');
      ini = txt.indexOf('\n', ini) + 1;
      var nuevo = txt.slice(0, ini) + API.bloqueGenerado(API.calcular(__dirname)) + txt.slice(fin);
      if (nuevo !== txt) { fs.writeFileSync(yo, nuevo); console.log('oscuro.js: HOJAS recalculadas'); }
      else console.log('oscuro.js: HOJAS ya estaban al día');
    }
  }
})(typeof window !== 'undefined' ? window : globalThis);
