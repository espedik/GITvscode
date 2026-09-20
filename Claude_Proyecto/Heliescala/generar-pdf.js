// Genera Heliescala-catalogo.pdf a partir de dossier.html.
//
//   node generar-pdf.js          → español (Heliescala-catalogo.pdf)
//   node generar-pdf.js en       → inglés  (Heliescala-catalogo-en.pdf)
//
// Usa el Chromium de Playwright que ya está en la caché de npx (ver CLAUDE.md):
//   NODE_PATH="C:/Users/esped/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules" node generar-pdf.js
//
// Antes de imprimir COMPRUEBA que ninguna página desborda: cada .pg mide 11 in
// fijas y su contenido no puede pasar de ahí, porque lo que se pasa se corta sin
// aviso. Si alguna desborda, lo dice y no genera el PDF.
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const EXE = 'C:/Users/esped/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const AQUI = __dirname.replace(/\\/g, '/');
const EN = process.argv.includes('en');
const SALIDA = path.join(__dirname, EN ? 'Heliescala-catalogo-en.pdf' : 'Heliescala-catalogo.pdf');

(async () => {
  const b = await chromium.launch({ executablePath: EXE });
  const pg = await (await b.newContext({ viewport: { width: 816, height: 1056 } })).newPage();
  const errs = [];
  pg.on('pageerror', e => errs.push(e.message));
  pg.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await pg.goto('file:///' + AQUI + '/dossier.html' + (EN ? '?en' : ''), { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(600);

  // ── Comprobación: nada desborda su página ─────────────────────────────────
  const rev = await pg.evaluate(() => {
    const out = [];
    document.querySelectorAll('.pg').forEach((p, i) => {
      const H = p.clientHeight;
      // El punto más bajo de cualquier hijo visible, medido contra la página.
      let max = 0;
      p.querySelectorAll('*').forEach(el => {
        // Lo que va pegado al borde a propósito no cuenta: el pie de página y
        // la foto a sangre de la portada están en su sitio aunque toquen el fondo.
        if (el.closest('.pie-pg, .portada-foto, .portada-pie, .portada-txt, .portada-marca')) return;
        const r = el.getBoundingClientRect(), pr = p.getBoundingClientRect();
        if (r.height === 0) return;
        max = Math.max(max, r.bottom - pr.top);
      });
      const titulo = (p.querySelector('.h2, .h1') || {}).textContent || '';
      out.push({ n: i + 1, alto: H, usado: Math.round(max), libre: Math.round(H - max), titulo: titulo.trim().slice(0, 40) });
    });
    const imgs = [...document.images];
    return { paginas: out, imgs: imgs.length, rotas: imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src')) };
  });

  const desbordan = rev.paginas.filter(p => p.libre < 30);   // 30 px = margen de seguridad
  console.log(`${rev.paginas.length} páginas · ${rev.imgs} imágenes · ${rev.rotas.length} rotas`);
  rev.paginas.forEach(p => console.log(`  ${String(p.n).padStart(2)}  ${String(p.usado).padStart(4)}/${p.alto}px  libre ${String(p.libre).padStart(4)}  ${p.libre < 30 ? '✗ ' : '  '}${p.titulo}`));
  if (rev.rotas.length) console.log('IMÁGENES ROTAS:', rev.rotas.join(', '));
  if (errs.length) console.log('ERRORES:', errs.join(' | '));
  if (desbordan.length || rev.rotas.length) {
    console.log('\nNO se generó el PDF: hay páginas que desbordan o imágenes rotas.');
    await b.close(); process.exit(1);
  }

  await pg.pdf({
    path: SALIDA,
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    outline: true,   // marcadores del lector, a partir de los h1/h2
    tagged: true,    // PDF accesible: el texto se puede seleccionar y leer
  });
  await b.close();
  const kb = Math.round(fs.statSync(SALIDA).size / 1024);
  console.log(`\nPDF: ${SALIDA} · ${kb} KB (${(kb / 1024).toFixed(1)} MB)`);
})();
