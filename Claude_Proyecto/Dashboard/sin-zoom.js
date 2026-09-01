/* ═══════════════════════════════════════════════════════════════════════════
   SIN ZOOM EN TÁCTIL — y con el resto de gestos intactos
   ───────────────────────────────────────────────────────────────────────────
   Adán, 2026-09-01: "no me dejes hacer zoom en el ipad ni en mi celular, pero
   deja los demas gestos de touch".

   Por qué hace falta JS y no basta el `<meta viewport>`: Safari IGNORA
   `user-scalable=no` y `maximum-scale` desde iOS 10 — lo desactivaron a
   propósito por accesibilidad. En el iPad, que es donde Adán lo pidió, el meta
   no hace absolutamente nada. Así que el bloqueo va por eventos:

     · `gesturestart/change/end` son los eventos propios de Safari para el
       pellizco. Cancelarlos mata el pinch-zoom en iOS, que es el gesto que
       molesta al leer el Dashboard con una mano.
     · `touchmove` con 2+ dedos cubre a los navegadores que no tienen los
       `gesture*` (Chrome de Android, Firefox).
     · El doble toque lo apaga el CSS `touch-action:manipulation`, que es la
       vía estándar y NO rompe los clicks — cancelar `touchend` a mano sí los
       rompería, porque el navegador ya no sintetiza el click.

   Lo que se conserva, y por eso el bloqueo mira SIEMPRE cuántos dedos hay:
   scroll vertical, scroll horizontal de las tiras, swipe entre pantallas y
   taps normales usan UN dedo. Ninguno pasa por aquí.

   Se carga desde cada app con <script src="../Dashboard/sin-zoom.js"></script>
   (sin prefijo en el propio Dashboard), igual que datos-maestros.js: una sola
   copia, como manda la Regla 1 del proyecto.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // El doble toque, por CSS. Se inyecta desde aquí para que una app nueva no
  // tenga que acordarse de añadirlo a su hoja de estilos.
  var st = document.createElement('style');
  st.textContent = 'html{touch-action:manipulation;-webkit-text-size-adjust:100%}';
  (document.head || document.documentElement).appendChild(st);

  // El pellizco en Safari (iPhone y iPad).
  ['gesturestart', 'gesturechange', 'gestureend'].forEach(function (ev) {
    document.addEventListener(ev, function (e) { e.preventDefault(); }, { passive: false });
  });

  // El pellizco en el resto. Un solo dedo nunca entra aquí, así que el scroll
  // y el swipe siguen exactamente igual de fluidos.
  document.addEventListener('touchmove', function (e) {
    if (e.touches.length > 1) e.preventDefault();
  }, { passive: false });

  // Safari en escritorio y algunos Android hacen zoom con ctrl+rueda o con los
  // atajos del teclado. En una app de pantalla completa eso descoloca el HUD,
  // así que también se apaga — el zoom del navegador (Cmd/Ctrl +) sigue vivo
  // porque ese es del sistema y no se puede ni se debe interceptar.
  document.addEventListener('wheel', function (e) {
    if (e.ctrlKey) e.preventDefault();
  }, { passive: false });
})();
