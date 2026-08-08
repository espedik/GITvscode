// ── Generador de Dashboard/entrevistas-data.js ───────────────────────────────────────────────
// Lee los 229 temas reales de Entrevistas/js/core.js (metadata, objeto T) y de los 19
// js/data-*.js (contenido enriquecido, objetos *_RICH — ya son template strings de HTML real,
// escritas a mano, no HTML renderizado que haya que scrapear) y produce un solo archivo de
// datos estático que el Dashboard carga con <script src="entrevistas-data.js">.
//
// Por qué NO usa Playwright (a diferencia de Aleman/_generar-datos-dashboard.js): las lecciones
// de Alemán son HTML ya renderizado por el navegador (hay que abrir la página y leer el DOM
// resultante). El contenido de Entrevistas, en cambio, YA es HTML plano dentro de un objeto JS
// (`core.js` → `T`, `data-*.js` → `*_RICH`) — no hace falta un navegador para extraerlo, basta
// con ejecutar esos archivos en una sandbox de Node (`vm`) y leer las variables resultantes.
// Más rápido y sin dependencias externas (no requiere `npm install playwright`).
//
// Qué hace con el CSS: los `*_RICH` son HTML con clases de `Entrevistas/styles.css` (tablas,
// code blocks, quiz cards, diagramas de pasos, etc.) — 154 reglas de ese archivo (de sus ~317
// bloques totales) definen esas clases. Este script las extrae, las reescribe con el prefijo
// `.en-content ` (para que no choquen con nada del resto del Dashboard) y las junta con las
// variables de color propias de Entrevistas (`--accent`, `--text-muted`, etc., en sus versiones
// claro Y oscuro) para que el contenido se vea igual de cuidado que en la app original, sin
// heredar ni pisar la paleta del Dashboard. También incluye el único bloque `<style>` embebido
// que trae `data-coding.js` (tema 'wayve-algo-approach') para que esas clases (bigo-*, err-*,
// step-*, etc.) existan siempre, sin importar qué tema le toque al día de hoy.
//
// Cuándo volver a correrlo: si se agrega, quita o edita un tema en Entrevistas/js/core.js o
// cualquier Entrevistas/js/data-*.js, o si cambian las clases de contenido en
// Entrevistas/styles.css. Solo requiere Node (sin dependencias extra):
//
//   node Entrevistas/_generar-datos-dashboard.js
//
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const DIR = path.resolve(__dirname);
const OUTPUT_FILE = path.resolve(__dirname, '../Dashboard/entrevistas-data.js');

// ══════════════════════════════════════════════════════════════════════════
// 1) Cargar T + todos los *_RICH ejecutando los archivos reales en una sandbox
// ══════════════════════════════════════════════════════════════════════════
const DATA_FILES = fs.readdirSync(path.join(DIR, 'js')).filter(f => f.startsWith('data-') && f.endsWith('.js'));
const CORE_FILE = 'core.js';

const store = {};
const ctx = {
  console,
  localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
  document: { addEventListener: () => {}, getElementById: () => null, querySelector: () => null, createElement: () => ({ style: {}, classList: { add(){}, remove(){} } }) },
  window: {},
};
vm.createContext(ctx);

vm.runInContext(fs.readFileSync(path.join(DIR, 'js', CORE_FILE), 'utf8'), ctx, { filename: CORE_FILE });

// Detecta los nombres reales de las constantes *_RICH declaradas en cada archivo (no hardcodear
// la lista — así un módulo nuevo se recoge solo con tal de que siga el patrón `const X_RICH =`).
const richNamesPerFile = {};
DATA_FILES.forEach(f => {
  const code = fs.readFileSync(path.join(DIR, 'js', f), 'utf8');
  vm.runInContext(code, ctx, { filename: f });
  richNamesPerFile[f] = [...code.matchAll(/^const\s+(\w+_RICH\w*)\s*=/gm)].map(m => m[1]);
});
const allRichNames = Object.values(richNamesPerFile).flat();
const bridge = 'globalThis.__T__=T; globalThis.__RICH__={};' +
  allRichNames.map(n => `Object.assign(globalThis.__RICH__, ${n});`).join(' ');
vm.runInContext(bridge, ctx, { filename: 'bridge.js' });

const T = ctx.__T__;
const RICH = ctx.__RICH__;

const tIds = Object.keys(T);
const richIds = Object.keys(RICH);
const missing = tIds.filter(id => !RICH[id]);
const extra = richIds.filter(id => !T[id]);
if (missing.length || extra.length) {
  console.error('DESAJUSTE T vs RICH — revisar antes de continuar.');
  console.error('Ids en T sin contenido RICH:', missing);
  console.error('Ids con contenido RICH que no están en T:', extra);
  process.exit(1);
}
console.log(`OK: ${tIds.length} temas en T, ${richIds.length} con contenido RICH — 1:1 completo.`);

// ══════════════════════════════════════════════════════════════════════════
// 2) ENTREVISTA_TEMAS — metadata plana (title/icon/mod/tags/hint), en el mismo
//    orden en que aparecen en T (que ya está agrupado por módulo temático).
// ══════════════════════════════════════════════════════════════════════════
const ENTREVISTA_TEMAS = tIds.map(id => ({ id, ...T[id] }));

// ══════════════════════════════════════════════════════════════════════════
// 3) ENTREVISTA_CONTENT — HTML real de cada tema, con 2 limpiezas puntuales
//    (2026-08-07, "mejora la calidad y el contenido"):
//
//    a) `.notes-card` genérico ("Agrega aquí tus notas sobre X...") — es una
//       invitación a escribir que no tiene sentido en el Dashboard de solo
//       lectura (no hay ningún mecanismo para guardar lo que se escriba ahí).
//       98 de las 124 apariciones son este placeholder genérico y se quitan.
//       Las otras 26 en realidad traen un consejo concreto y real bajo la
//       misma clase (ej. "Practica los 6 pasos en voz alta... Cronometra 20
//       minutos") — esas SÍ se conservan, es contenido real, no relleno.
//    b) Un `background:#fff` hardcodeado (no `var(--white)`) dentro de un
//       `style=""` inline en el tema 'wayve-algo-approach' — se normaliza a
//       `var(--white)` para que también adopte el vidrio del Dashboard (ver
//       sección 4 de más abajo) en vez de quedar como una caja blanca sólida
//       fija en modo oscuro.
// ══════════════════════════════════════════════════════════════════════════
const NOTES_CARD_RE = /<div class="notes-card"[^>]*>\s*<div class="notes-card-label">[^<]*<\/div>\s*<p class="notes-placeholder">([\s\S]*?)<\/p>\s*<\/div>/g;
let notesStripped = 0, notesKept = 0;
const ENTREVISTA_CONTENT = {};
Object.keys(RICH).forEach(id => {
  let html = RICH[id].replace(NOTES_CARD_RE, (block, texto) => {
    if (/^\s*Agrega aquí/i.test(texto)) { notesStripped++; return ''; }
    notesKept++; return block;
  });
  html = html.replace(/style="background:#fff;/g, 'style="background:var(--white);');
  ENTREVISTA_CONTENT[id] = html;
});
console.log(`Placeholders "notes-card" genéricos quitados: ${notesStripped} · con consejo real conservados: ${notesKept}`);

// ══════════════════════════════════════════════════════════════════════════
// 4) ENTREVISTA_CSS — solo las reglas de styles.css que de verdad usan las
//    clases presentes en el contenido, reescritas con el prefijo `.en-content`.
// ══════════════════════════════════════════════════════════════════════════
function collectClasses() {
  const set = new Set();
  Object.values(RICH).forEach(html => {
    [...html.matchAll(/class="([^"]+)"/g)].forEach(m => m[1].split(/\s+/).forEach(c => c && set.add(c)));
  });
  return set;
}
const usedClasses = collectClasses();

function topBlocks(text) {
  const blocks = [];
  let i = 0, n = text.length;
  while (i < n) {
    if (text[i] === '/' && text[i + 1] === '*') { const end = text.indexOf('*/', i + 2); i = end < 0 ? n : end + 2; continue; }
    if (/\s/.test(text[i])) { i++; continue; }
    const start = i;
    let depth = 0, j = i;
    for (; j < n; j++) { if (text[j] === '{') depth++; else if (text[j] === '}') { depth--; if (depth === 0) { j++; break; } } }
    blocks.push(text.slice(start, j));
    i = j;
  }
  return blocks;
}
function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function selectorUsesClass(sel, classSet) {
  for (const c of classSet) if (new RegExp('\\.' + escapeRe(c) + '\\b').test(sel)) return true;
  return false;
}
// Prefija cada selector top-level (separados por coma) con `.en-content`, respetando el caso
// especial `[data-theme="dark"] .foo` (el prefijo de tema debe quedar ANTES de `.en-content`).
function scopeSelectorList(selList) {
  return selList.split(',').map(sel => {
    sel = sel.trim();
    const m = sel.match(/^(\[data-theme="dark"\]\s*)(.*)$/);
    if (m) return m[1] + '.en-content ' + m[2].trim();
    return '.en-content ' + sel;
  }).join(', ');
}
function scopeRuleBlock(block) {
  const braceIdx = block.indexOf('{');
  const sel = block.slice(0, braceIdx);
  const rest = block.slice(braceIdx);
  return scopeSelectorList(sel) + ' ' + rest;
}
// Vidrio del Dashboard (2026-08-07, "no se ve tan bien integrado, mejora la calidad") — `--white`
// pasa a valer `var(--card)` (ver bloque de variables más abajo), pero eso solo cambia el COLOR
// de fondo a translúcido; sin `backdrop-filter` de por medio se ve como un rectángulo semi-
// transparente plano, no como el "glass" difuminado que usa el resto del Dashboard (`.tile`).
// Cualquier regla que pinte su fondo con `var(--white)` recibe el mismo `backdrop-filter:blur`
// que usa `.tile` — así toda tarjeta de Entrevistas (info-card, err-card, plan-card, step-body,
// etc.) se integra visualmente sin tener que enumerar sus ~15 nombres de clase a mano.
//
// Excepción real, encontrada probando con Playwright: `.quiz-card` puede repetirse 20-30+ veces
// en un solo tema (examen de práctica) — con backdrop-filter en cada una, Chromium en modo claro
// renderizaba toda la pantalla con un artefacto de manchado/desenfoque general (visto en captura,
// no solo un rumor). Los "cards" que se repiten como filas de una lista larga se quedan con el
// tinte de vidrio (color translúcido) pero SIN blur — el blur se reserva para tarjetas grandes y
// en poca cantidad por pantalla, que es donde de verdad se nota el efecto "glass" sin este riesgo.
const NO_BLUR_REPEATING = ['.quiz-card'];
function addGlassIfWhiteBg(ruleText) {
  if (!/background:\s*var\(--white\)/.test(ruleText)) return ruleText;
  const sel = ruleText.slice(0, ruleText.indexOf('{'));
  if (NO_BLUR_REPEATING.some(c => sel.includes(c))) return ruleText;
  return ruleText.replace(/\}\s*$/, 'backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);}');
}

const cssSource = fs.readFileSync(path.join(DIR, 'styles.css'), 'utf8');
const targetClasses = [...usedClasses].filter(c => !c.startsWith('tab-group-'));
const cssBlocks = topBlocks(cssSource);
let scopedRules = [];
cssBlocks.forEach(b => {
  if (b.startsWith(':root')) return; // las variables se copian aparte, no se escanean por clase
  if (b.startsWith('@media') || b.startsWith('@supports')) {
    const headerEnd = b.indexOf('{');
    const header = b.slice(0, headerEnd + 1);
    const inner = b.slice(headerEnd + 1, b.lastIndexOf('}'));
    const kept = topBlocks(inner).filter(ib => selectorUsesClass(ib.slice(0, ib.indexOf('{')), targetClasses)).map(scopeRuleBlock).map(addGlassIfWhiteBg);
    if (kept.length) scopedRules.push(header + '\n' + kept.join('\n') + '\n}');
  } else if (b.startsWith('@keyframes')) {
    if (/fadeIn/.test(b)) scopedRules.push(b.replace('fadeIn', 'enFadeIn'));
  } else {
    const sel = b.slice(0, b.indexOf('{'));
    if (selectorUsesClass(sel, targetClasses)) scopedRules.push(addGlassIfWhiteBg(scopeRuleBlock(b)));
  }
});
// El único uso de la animación (dentro de .tab-panel.active) también debe apuntar a enFadeIn.
scopedRules = scopedRules.map(r => r.replace(/animation:\s*fadeIn\b/g, 'animation:enFadeIn'));

// El <style> embebido en el tema 'wayve-algo-approach' (data-coding.js) define ~65 clases
// propias (bigo-*, err-*, step-*, script-*, optim-*, ec-*, pattern-*) que no viven en
// styles.css — se extraen aparte y se escopean igual, para que existan siempre en el Dashboard
// y no solo el día en que ese tema en particular sea el elegido. Sus fondos de tarjeta están
// hardcodeados como `#fff` (no `var(--white)`, a diferencia de styles.css) — se normalizan
// primero para que también reciban el vidrio del Dashboard (`addGlassIfWhiteBg`). El único
// `color:#fff` real del bloque (texto, no fondo) usa un espacio distinto (`color: #fff` vs
// `background:#fff`) así que el reemplazo dirigido a `background:` no lo toca.
let embeddedCss = '';
const codingSrc = RICH['wayve-algo-approach'] || '';
const styleMatch = codingSrc.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  const normalized = styleMatch[1].replace(/background:#fff\b/g, 'background:var(--white)');
  const innerBlocks = topBlocks(normalized);
  embeddedCss = innerBlocks.map(scopeRuleBlock).map(addGlassIfWhiteBg).join('\n');
}

// Variables de color propias de Entrevistas (copiadas literal de styles.css :root /
// :root[data-theme="dark"] / bloque wayve), con 2 excepciones deliberadas: `--white` y
// `--border` SÍ se remapean al vidrio del Dashboard (`var(--card)`/`var(--card-br)`, ya se
// adaptan solos a ambos temas — por eso no hace falta repetirlos en CSS_VARS_DARK) — es
// justo lo que pidió Adán ("no se ve tan bien integrado"): que las tarjetas de Entrevistas
// se sientan parte del mismo sistema visual que el resto del Dashboard, no una app ajena
// pegada encima. El resto de las variables (verde/rojo/ámbar semánticos, texto, tags) se
// queda igual que en Entrevistas — esos sí tienen significado propio que no debe perderse.
const CSS_VARS_LIGHT = `.en-content{
  --sidebar-bg:#FBFCFE; --table-dark-bg:#0F172A;
  --accent:#2563EB; --accent-light:#EFF6FF;
  --green:#16A34A; --green-light:#F0FDF4;
  --text:#111827; --text-muted:#6B7280;
  --border:var(--card-br); --bg:#F9FAFB; --white:var(--card);
  --tag-bg:#F1F5F9; --tag-text:#475569;
  --wayve:#D97706; --wayve-dark:#92400E; --wayve-light:#FFFBEB; --wayve-border:#FCD34D;
}`;
const CSS_VARS_DARK = `[data-theme="dark"] .en-content{
  --sidebar-bg:#0B1220; --table-dark-bg:#05080F;
  --accent:#3B82F6; --accent-light:rgba(59,130,246,.16);
  --green:#4ADE80; --green-light:rgba(74,222,128,.14);
  --text:#E2E8F0; --text-muted:#94A3B8;
  --bg:#0B1220;
  --tag-bg:#1E293B; --tag-text:#CBD5E1;
  --wayve:#FBBF24; --wayve-dark:#FDE68A; --wayve-light:rgba(217,119,6,.14); --wayve-border:#92400E;
}`;

const ENTREVISTA_CSS = [CSS_VARS_LIGHT, CSS_VARS_DARK, scopedRules.join('\n'), embeddedCss].join('\n\n');

// ══════════════════════════════════════════════════════════════════════════
// 5) Escribir el archivo generado
// ══════════════════════════════════════════════════════════════════════════
const header = '// Generado automáticamente por Entrevistas/_generar-datos-dashboard.js a partir de\n' +
  '// Entrevistas/js/core.js + js/data-*.js + styles.css — no editar a mano. Si cambia un tema o\n' +
  '// una clase de contenido, volver a correr: node Entrevistas/_generar-datos-dashboard.js\n';
const out = header +
  'const ENTREVISTA_TEMAS = ' + JSON.stringify(ENTREVISTA_TEMAS) + ';\n' +
  'const ENTREVISTA_CONTENT = ' + JSON.stringify(ENTREVISTA_CONTENT) + ';\n' +
  'const ENTREVISTA_CSS = ' + JSON.stringify(ENTREVISTA_CSS) + ';\n';
fs.writeFileSync(OUTPUT_FILE, out);
console.log('Escrito', OUTPUT_FILE, '—', fs.statSync(OUTPUT_FILE).size, 'bytes,', ENTREVISTA_TEMAS.length, 'temas,', scopedRules.length, 'reglas CSS portadas +', innerBlocksCountSafe(), 'del <style> embebido.');
function innerBlocksCountSafe(){ try{ return topBlocks((RICH['wayve-algo-approach'].match(/<style>([\s\S]*?)<\/style>/)||[,''])[1]).length; }catch(e){ return 0; } }
