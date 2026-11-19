/* Fuera de la PC, tus datos son los de la PC — en cada página, antes que todo lo demás.

   Adán, 18-nov-2026: "¿por qué en mi iPad no se ven las cosas que invertí?" y "ahora esto para las demás cifras, pero
   todas, no quiero que haya errores". Todo se anota en la PC (el Chrome que abre los archivos con file://) y viaja en:
     · finanzas-sync.js  (FINANZAS_SYNC) — todo Finanzas, `finanzasmx_v2`;
     · datos-sync.js     (DATOS_SYNC)    — todo lo demás del proyecto, una clave por línea con la hora en que cambió,
                                            incluidas las banderas de las migraciones que ya corrieron en la PC.
   (Hábitos, auditoría y Mis cifras tienen su propio archivo y su propia forma de fundirse: no pasan por aquí.)

   Fuera de la PC este script, cargado en el <head> de cada página después de esos dos archivos y antes que el maestro y
   que la página:
     1. pone cada clave que la PC cambió desde la última vez que se aplicó (`datos_pc_aplicado`, por clave), y Finanzas
        entera si la copia es más nueva (`fin_pc_aplicada`). Una clave que el iPad cambió y la PC no, se queda;
     2. pide los dos archivos sin la caché de GitHub Pages (que los guarda hasta 10 minutos) —como mucho una vez por
        minuto— y, si traen algo nuevo, lo aplica y recarga la página para que se pinte con eso.
   En la PC no hace nada: ahí los datos son los originales. */
(function () {
  'use strict';
  var ES_PC = location.protocol === 'file:';
  window.DATOS_PC = { esPC: ES_PC };
  if (ES_PC) return;

  var leer = function (k, def) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } };
  function aplicarDatos(X) {
    if (!X || !X.claves) return 0;
    var hechos = leer('datos_pc_aplicado', {}) || {}, n = 0;
    Object.keys(X.claves).forEach(function (k) {
      var c = X.claves[k];
      if (!c || !c.cambiado || (hechos[k] || '') >= c.cambiado) return;
      try {
        if (c.borrado) localStorage.removeItem(k);
        else localStorage.setItem(k, c.json ? JSON.stringify(c.valor) : String(c.valor));
        hechos[k] = c.cambiado; n++;
      } catch (e) { /* sin espacio o sin permiso: se intenta la próxima vez */ }
    });
    if (n) try { localStorage.setItem('datos_pc_aplicado', JSON.stringify(hechos)); } catch (e) {}
    return n;
  }
  function aplicarFinanzas(X) {
    if (!X || !X.exportado || !X.datos || !Array.isArray(X.datos.debts)) return 0;
    var ya = ''; try { ya = localStorage.getItem('fin_pc_aplicada') || ''; } catch (e) { return 0; }
    if (ya >= X.exportado) return 0;
    try { localStorage.setItem('finanzasmx_v2', JSON.stringify(X.datos)); localStorage.setItem('fin_pc_aplicada', X.exportado); return 1; }
    catch (e) { return 0; }
  }
  // Primero las banderas y los demás datos, después Finanzas: así las migraciones del maestro y de Finanzas ya ven
  // las banderas de la PC y no vuelven a correr sobre su copia.
  aplicarDatos(window.DATOS_SYNC);
  aplicarFinanzas(window.FINANZAS_SYNC);

  // La copia más nueva, sin caché.
  if (typeof fetch !== 'function') return;
  var ultimo = 0; try { ultimo = +sessionStorage.getItem('datos_pc_pedido') || 0; } catch (e) {}
  if (Date.now() - ultimo < 60000) return;
  try { sessionStorage.setItem('datos_pc_pedido', String(Date.now())); } catch (e) {}
  var base = ((document.currentScript && document.currentScript.src) || '').replace(/datos-pc\.js(\?.*)?$/, '');
  function pedir(nombre, global) {
    return fetch(base + nombre + '?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.text() : ''; })
      .then(function (txt) { if (!txt) return null; var w = {}; new Function('window', txt)(w); return w[global] || null; })
      .catch(function () { return null; });
  }
  var conFin = !!document.querySelector('script[src*="finanzas-sync.js"]');
  Promise.all([pedir('datos-sync.js', 'DATOS_SYNC'), conFin ? pedir('finanzas-sync.js', 'FINANZAS_SYNC') : null]).then(function (r) {
    var n = aplicarDatos(r[0]) + aplicarFinanzas(r[1]);
    if (n) location.reload();
  });
})();
