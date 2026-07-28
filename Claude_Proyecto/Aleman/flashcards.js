/* ── FLASHCARDS INTERACTIVAS (slides de vocabulario) ─────────────────────
   Uso:
     <div id="fc-ejemplo" class="flashcards"></div>
     <script src="flashcards.js"></script>
     <script>
       initFlashcards('fc-ejemplo', [
         {art:'die', de:'Wohnung', es:'el apartamento', ex:'Ich suche eine Wohnung.'},
         ...
       ]);
     </script>
   Cada tarjeta muestra el alemán (con artículo si aplica) y, al hacer clic
   o pulsar Enter/Espacio, voltea para revelar la traducción y el ejemplo.
   Incluye navegación anterior/siguiente y mezclar aleatoriamente.
------------------------------------------------------------------------ */
function initFlashcards(containerId, data) {
  const root = document.getElementById(containerId);
  if (!root || !Array.isArray(data) || !data.length) return;

  let idx = 0;
  let flipped = false;
  let order = data.map((_, i) => i);

  function current() { return data[order[idx]]; }

  function render() {
    const item = current();
    const art = item.art && item.art !== '-' ? `<span class="fc-art">${item.art}</span>` : '';
    root.innerHTML = `
      <div class="fc-progress">🎴 Tarjeta ${idx + 1} / ${order.length}</div>
      <div class="fc-card${flipped ? ' flipped' : ''}" tabindex="0" role="button" aria-label="Voltear tarjeta">
        <div class="fc-face fc-front">
          ${art}
          <span class="fc-de">${item.de}</span>
          <span class="fc-hint">👆 Toca para revelar</span>
        </div>
        <div class="fc-face fc-back">
          <span class="fc-es">${item.es}</span>
          ${item.ex ? `<span class="fc-ex">${item.ex}</span>` : ''}
        </div>
      </div>
      <div class="fc-controls">
        <button type="button" class="fc-btn" data-act="prev">← Anterior</button>
        <button type="button" class="fc-btn fc-shuffle" data-act="shuffle">🔀 Mezclar</button>
        <button type="button" class="fc-btn" data-act="next">Siguiente →</button>
      </div>`;

    const cardEl = root.querySelector('.fc-card');
    const flip = () => { flipped = !flipped; render(); };
    cardEl.addEventListener('click', flip);
    cardEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
    });

    root.querySelector('[data-act="prev"]').addEventListener('click', (e) => {
      e.stopPropagation();
      idx = (idx - 1 + order.length) % order.length;
      flipped = false;
      render();
    });
    root.querySelector('[data-act="next"]').addEventListener('click', (e) => {
      e.stopPropagation();
      idx = (idx + 1) % order.length;
      flipped = false;
      render();
    });
    root.querySelector('[data-act="shuffle"]').addEventListener('click', (e) => {
      e.stopPropagation();
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      idx = 0;
      flipped = false;
      render();
    });
  }

  render();
}
