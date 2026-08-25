// ── Generador de Dashboard/aleman-data.js ────────────────────────────────────────────────────
// Lee las 35 lecciones reales de Aleman/*.html (con Playwright, cada una como página propia —
// nunca como iframe de otra, así no hay restricción de origen file:// que bloquear) y extrae su
// contenido real (tablas de vocabulario, diálogos, frases, ejercicios, reglas gramaticales,
// conjugaciones y los widgets visuales propios de cada lección A1: números, colores, días,
// meses, familia, artículos, pronombres, hora) a un solo archivo de datos estático que el
// Dashboard carga con <script src="aleman-data.js">.
//
// Por qué existe esto: Dashboard/dashboard.html NO puede leer el contenido de estas lecciones en
// vivo desde el navegador de Adán — Chrome bloquea tanto el acceso a `iframe.contentDocument`
// como `fetch()` entre dos documentos `file://` distintos (confirmado con Playwright, ver
// readme_dashboard.md → "Alemán del día"). Este script corre UNA VEZ, offline, de mi lado (no en
// el navegador de Adán), y el resultado es texto real sacado de las lecciones — no contenido
// escrito a mano.
//
// Cuándo volver a correrlo: si se agrega, quita o edita una lección en Aleman/*.html. Requiere
// Node + Playwright instalado (`npm install playwright` en algún directorio, no forma parte de
// las dependencias del proyecto en sí — este script es una herramienta de desarrollo, no algo
// que corra en el navegador de Adán).
//
//   node Aleman/_generar-datos-dashboard.js
//
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ALEMAN_DIR = path.resolve(__dirname);
const OUTPUT_FILE = path.resolve(__dirname, '../Dashboard/aleman-data.js');

const FILES = [
  // Kapitel 10 · Cenlex Santo Tomás — lo que Adán cursa ahora (2026-08-25)
  'k10-01-perfekt-regel.html','k10-02-verben-liste.html','k10-03-perfekt-uben.html',
  'k10-04-berufe.html','k10-05-mein-tag.html',
  'a1-01-saludos.html','a1-02-zahlen.html','a1-03-farben.html','a1-04-wochentage.html','a1-05-familie.html',
  'a1-06-artikel.html','a1-07-pronomen.html','a1-08-sein-haben.html','a1-09-uhrzeit.html','a1-10-laender.html',
  'a1-11-berufe.html','a1-12-essen.html','a1-13-wohnen.html','a1-14-verkehr.html','a1-15-hobbys.html',
  'a2-01-modalverben.html','a2-02-perfekt-haben.html','a2-03-perfekt-sein.html','a2-04-prateritum.html','a2-05-verbos-separables.html',
  'a2-06-verbos-reflexivos.html','a2-07-kasus.html','a2-08-komparativ.html','a2-09-konjunktionen.html','a2-10-preposiciones.html',
  'a2-11-adjetivos.html','a2-12-infinitiv.html','a2-13-wohnen.html','a2-14-arbeit.html','a2-15-gesundheit.html',
  'a2-16-reisen.html','a2-17-freizeit.html','a2-18-essen.html','a2-19-einkaufen.html','a2-20-medien.html'
];

// Corre DENTRO de cada página de lección (page.evaluate) — mismo origen que la propia lección,
// cero restricciones de acceso al DOM.
const SCRAPE_FN = () => {
  const txt = (el) => el ? el.textContent.trim() : '';

  // innerText respeta los saltos de línea reales del layout (CSS block/flex/<br>) — funciona
  // bien para la gran mayoría de los widgets custom (num-card, day-card, color-card anidado,
  // etc.). Único caso conocido donde no separa bien: 2 <span> inline uno junto al otro sin <br>
  // entre ellos (ej. art-big "der"+"masculino" en a1-06) — ahí walkText (que sí separa por
  // elemento, a costa de perder algo de fidelidad al layout real) es mejor.
  const walkText = (el) => {
    let out = '';
    el.childNodes.forEach(node => {
      if (node.nodeType === 3) out += node.textContent;
      else if (node.tagName === 'BR') out += '\n';
      else out += walkText(node) + ' ';
    });
    return out;
  };
  const extractLines = (el) => {
    const viaInnerText = (el.innerText || '').split('\n').map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
    if (viaInnerText.length <= 1 && el.children.length >= 2) {
      const viaWalk = walkText(el).split('\n').map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
      if (viaWalk.length > viaInnerText.length) return viaWalk;
    }
    return viaInnerText;
  };
  const firstClass = (el) => ((el.className || '').toString().trim().split(/\s+/)[0]) || '';

  const hero = {
    tag: txt(document.querySelector('.topic-hero-tag')),
    desc: txt(document.querySelector('.topic-hero-desc')),
  };

  // Estructuras "conocidas" de Aleman/styles.css — se extraen con su propio esquema de datos,
  // limpio y fiel. Todo lo que NO caiga aquí (los widgets únicos de cada lección A1: números,
  // colores, días, meses, familia, artículos, pronombres, reloj...) cae al extractor genérico
  // de más abajo (`extra`), que no necesita conocer el nombre de cada clase custom.
  const RECOGNIZED_SEL = '.vocab-table, .rule-box, .example, .tip-box, .phrase-grid, .dialog-box, .exercise, .conj-big';

  /* Las tarjetas con data-dashboard="no" quedan fuera: son los ejercicios interactivos, que se
     generan por JS y al volcarlos como texto salen como una lista suelta de números y opciones
     sueltas. El ejercicio se hace EN la lección, donde se corrige solo; el Dashboard muestra la
     teoría, las tablas y los ejemplos, que sí se leen bien de un vistazo. */
  const cards = [...document.querySelectorAll('.topic-content .card:not([data-dashboard="no"])')].map(card => {
    const h3 = card.querySelector('h3');
    const iconEl = h3 ? h3.querySelector('span') : null;
    const icon = txt(iconEl);
    const titulo = h3 ? h3.textContent.replace(icon, '').trim() : '';
    const introP = h3 ? h3.nextElementSibling : null;
    const intro = (introP && introP.tagName === 'P') ? introP.textContent.trim() : '';

    const vocabTables = [...card.querySelectorAll('.vocab-table')].map(tbl => ({
      headers: [...tbl.querySelectorAll('thead th')].map(txt),
      rows: [...tbl.querySelectorAll('tbody tr')].map(tr => [...tr.children].map(td => td.innerHTML.trim()))
    }));
    const ruleEl = card.querySelector('.rule-box');
    const rule = ruleEl ? ruleEl.innerHTML.trim() : '';
    const examples = [...card.querySelectorAll('.example')].map(ex => ({
      de: txt(ex.querySelector('.example-de')), es: txt(ex.querySelector('.example-es'))
    }));
    const tip = txt(card.querySelector('.tip-box'));
    const phrases = [...card.querySelectorAll('.phrase-item')].map(p => ({
      sit: txt(p.querySelector('.phrase-situation')), de: txt(p.querySelector('.phrase-de')), es: txt(p.querySelector('.phrase-es'))
    }));

    const dialogTitleEls = new Set();
    const dialogs = [...card.querySelectorAll('.dialog-box')].map(box => {
      const prev = box.previousElementSibling;
      const dTitulo = (prev && prev.tagName === 'DIV' && !prev.className) ? prev.textContent.trim() : '';
      if (dTitulo) dialogTitleEls.add(prev);
      const lineas = [...box.querySelectorAll('.dialog-line')].map(l => ({
        speaker: txt(l.querySelector('.dialog-speaker')), de: txt(l.querySelector('.dialog-de')), es: txt(l.querySelector('.dialog-es'))
      }));
      return { titulo: dTitulo, lineas };
    });

    const exercises = [...card.querySelectorAll('.exercise')].map(ex => {
      const qEl = ex.querySelector('.exercise-q');
      return {
        num: txt(ex.querySelector('.exercise-num')),
        q: qEl ? qEl.innerHTML.trim() : '',
        hint: txt(ex.querySelector('.exercise-hint')),
        placeholder: txt(ex.querySelector('.placeholder'))
      };
    });

    const conjugations = [...card.querySelectorAll('.conj-big')].map(block => ({
      header: txt(block.querySelector('.conj-header')),
      rows: [...block.querySelectorAll('.conj-row')].map(r => ({
        pron: txt(r.querySelector('.conj-pron')), form: txt(r.querySelector('.conj-form')), ex: txt(r.querySelector('.conj-ex'))
      }))
    }));

    // Todo lo demás (num-grid, color-grid, art-big, pron-big, family-tree, clock-grid, etc.) —
    // capturado de forma genérica por texto visual, sin depender del nombre de cada clase.
    const extra = [];
    [...card.children].forEach(child => {
      if (child === h3 || child === introP || dialogTitleEls.has(child)) return;
      if (child.matches(RECOGNIZED_SEL) || child.querySelector(RECOGNIZED_SEL)) return;
      const cls = (child.className || '').toString();
      const gridItems = [...child.children].filter(c => c.children.length || c.textContent.trim());
      const itemClasses = gridItems.map(firstClass);
      const looksLikeGrid = gridItems.length >= 2 && (
        /grid|tree/i.test(cls) || itemClasses.every(c => c && c === itemClasses[0])
      );
      if (looksLikeGrid) {
        extra.push({ type: 'grid', items: gridItems.map(it => extractLines(it)) });
      } else {
        const lines = extractLines(child);
        if (lines.length) extra.push({ type: 'text', lines });
      }
    });

    return { icon, titulo, intro, vocabTables, rule, examples, tip, phrases, dialogs, exercises, conjugations, extra };
  }).filter(c =>
    c.vocabTables.length || c.rule || c.examples.length || c.tip || c.phrases.length ||
    c.dialogs.length || c.exercises.length || c.conjugations.length || c.extra.length || c.intro
  ); // filtra tarjetas vacías (la de "🎴 Repasa con tarjetas" no tiene nada extraíble — las
     //  flashcards interactivas no se replican, su vocabulario ya está en las tablas)

  return { hero, cards };
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const result = {};
  for (const file of FILES) {
    const filePath = path.join(ALEMAN_DIR, file);
    await page.goto('file:///' + filePath.replace(/\\/g, '/'));
    result[file] = await page.evaluate(SCRAPE_FN);
  }
  await browser.close();

  const header = '// Generado automáticamente por Aleman/_generar-datos-dashboard.js a partir del\n' +
    '// contenido real de las 35 lecciones de Aleman/*.html — no editar a mano. Si cambia una\n' +
    '// lección, volver a correr: node Aleman/_generar-datos-dashboard.js\n';
  fs.writeFileSync(OUTPUT_FILE, header + 'const ALEMAN_CONTENT = ' + JSON.stringify(result) + ';\n');
  console.log('Escrito', OUTPUT_FILE, '—', fs.statSync(OUTPUT_FILE).size, 'bytes,', FILES.length, 'lecciones.');
})();
