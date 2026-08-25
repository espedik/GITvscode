/* ══════════════════════════════════════════════════════════════════════════════════════════
   VERIFICAR SINCRONÍA — ¿dicen todas las apps lo mismo?
   ══════════════════════════════════════════════════════════════════════════════════════════
   Uso:   node Dashboard/verificar-sincronia.js        (desde Claude_Proyecto/)

   Sale con código 1 si encuentra algo desincronizado, así que sirve tal cual en un hook.

   POR QUÉ EXISTE
   No todo se puede mover a `datos-maestros.js`: hay estructuras grandes (la rutina de 58
   bloques, el radar, la rutina de gym) que hoy siguen copiadas entre archivos. Mientras sigan
   duplicadas, este script las compara EVALUANDO los literales de cada HTML — no leyéndolos a
   ojo — y dice exactamente qué campo de qué entrada difiere.

   La primera vez que se corrió (2026-08-24) encontró 7 textos de la rutina de cabello que se
   habían mejorado en Coach_v2.html el 2026-08-18 y nunca se replicaron al Dashboard. Llevaban
   6 días divergentes sin que nadie lo notara.

   AHORRA TOKENS: en vez de abrir 900 KB de HTML para comparar, se corre esto y se lee el
   resumen. Un dato duro en 20 líneas en vez de medio archivo en el contexto.
   ══════════════════════════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const BS = String.fromCharCode(92);
const leer = rel => fs.readFileSync(path.join(RAIZ, rel), 'utf8');

/* Extrae el literal JS que sigue a `decl`, balanceando corchetes y saltando strings.
   No usa regex: con textos que llevan llaves y comillas dentro, una regex se equivoca. */
function literal(txt, decl, abre = '[') {
  const i = txt.indexOf(decl); if (i < 0) return null;
  const j = txt.indexOf(abre, i); if (j < 0) return null;
  const cierra = abre === '[' ? ']' : '}';
  let d = 0, k = j, instr = null;
  while (k < txt.length) {
    const c = txt[k];
    if (instr) { if (c === BS) { k += 2; continue; } if (c === instr) instr = null; }
    else if (c === '"' || c === "'" || c === '`') instr = c;
    else if (c === abre) d++;
    else if (c === cierra) { if (--d === 0) return txt.slice(j, k + 1); }
    k++;
  }
  return null;
}
const evaluar = src => { try { return eval('(' + src + ')'); } catch (e) { return null; } };

const problemas = [];
const ok = [];
const aviso = [];

const dash  = leer('Dashboard/dashboard.html');
const coach = leer('Coach/Coach_v2.html');
const ejer  = leer('CuidadoPersonal/ejercicio.html');
const finz  = leer('Finanzas/Finanzas.html');

/* ── 1. RUTINA_TASKS: Dashboard ↔ Coach ──────────────────────────────────────────────────────
   `link`/`href` se ignoran a propósito: en Coach apuntan a un ancla interna (#aprendizaje) y en
   el Dashboard a la ruta relativa (../Coach/Coach_v2.html#aprendizaje). Está documentado en el
   README raíz; no es una divergencia, es la misma información adaptada al archivo. */
(function rutina() {
  const A = evaluar(literal(dash,  'const RUTINA_TASKS='));
  const B = evaluar(literal(coach, 'const RUTINA_TASKS'));
  if (!A || !B) { problemas.push('RUTINA_TASKS: no se pudo extraer de uno de los dos archivos'); return; }
  const ma = new Map(A.map(t => [t.id, t])), mb = new Map(B.map(t => [t.id, t]));
  const soloA = [...ma.keys()].filter(k => !mb.has(k));
  const soloB = [...mb.keys()].filter(k => !ma.has(k));
  if (soloA.length) problemas.push('RUTINA_TASKS: ids solo en Dashboard → ' + soloA.join(' '));
  if (soloB.length) problemas.push('RUTINA_TASKS: ids solo en Coach → ' + soloB.join(' '));

  let difs = 0;
  const detalle = [];
  const comparar = (ida, xa, xb, ruta) => {
    for (const c of new Set([...Object.keys(xa), ...Object.keys(xb)])) {
      if (c === 'link' || c === 'href' || c === 'subtareas') continue;
      const va = JSON.stringify(xa[c]), vb = JSON.stringify(xb[c]);
      if (va !== vb) { difs++; detalle.push(['  ' + ruta + ' · campo "' + c + '"',
        '     dash : ' + String(va).slice(0, 120), '     coach: ' + String(vb).slice(0, 120)].join('\n')); }
    }
  };
  for (const [id, ta] of ma) {
    const tb = mb.get(id); if (!tb) continue;
    comparar(id, ta, tb, id);
    const sa = new Map((ta.subtareas || []).map(x => [x.id, x]));
    const sb = new Map((tb.subtareas || []).map(x => [x.id, x]));
    for (const [sid, xa] of sa) {
      const xb = sb.get(sid);
      if (!xb) { difs++; detalle.push('  ' + id + ' > ' + sid + ' solo en Dashboard'); continue; }
      comparar(sid, xa, xb, id + ' > ' + sid);
    }
    for (const sid of sb.keys()) if (!sa.has(sid)) { difs++; detalle.push('  ' + id + ' > ' + sid + ' solo en Coach'); }
  }
  if (difs) problemas.push('RUTINA_TASKS: ' + difs + ' diferencia(s) Dashboard ↔ Coach\n' + detalle.join('\n'));
  else ok.push('RUTINA_TASKS — ' + A.length + ' bloques idénticos en Dashboard y Coach');
})();

/* ── 2. SK, el radar de habilidades ── */
(function radar() {
  const A = evaluar(literal(dash,  'const SK=')) || evaluar(literal(dash,  'const SK ='));
  const B = evaluar(literal(coach, 'const SK=')) || evaluar(literal(coach, 'const SK ='));
  if (!A || !B) { aviso.push('SK (radar): no se pudo extraer; comprobar a mano'); return; }
  // Solo id/val/w: Coach lleva además `full`, `cat` y `desc` para su panel explicativo, que el
  // Dashboard no pinta. Eso no es divergencia — es que cada uno usa lo que necesita.
  const nucleo = L => JSON.stringify(L.map(x => [x.id, x.val, x.w]));
  const a = nucleo(A), b = nucleo(B);
  if (a === b) ok.push('SK (radar) — los ' + A.length + ' valores coinciden (id/val/peso)');
  else problemas.push('SK (radar) DISTINTO\n     dash : ' + a.slice(0, 200) + '\n     coach: ' + b.slice(0, 200));
})();

/* ── 3. La rutina de gym: Dashboard ↔ ejercicio.html ── */
(function gym() {
  const A = evaluar(literal(dash, 'const GYM_RUTINA_DEFAULT=', '{'));
  const B = evaluar(literal(ejer, 'rutina:', '{'));
  if (!A || !B) { aviso.push('GYM_RUTINA_DEFAULT: no se pudo extraer; comprobar a mano'); return; }
  const dias = [0, 1, 2, 3, 4, 5, 6];
  const na = dias.map(d => A[d] && A[d].nombre), nb = dias.map(d => B[d] && B[d].nombre);
  if (JSON.stringify(na) === JSON.stringify(nb)) ok.push('GYM_RUTINA_DEFAULT — los 7 días coinciden con ejercicio.html');
  else problemas.push('GYM_RUTINA_DEFAULT DISTINTO de ejercicio.html\n     dash     : ' +
    JSON.stringify(na) + '\n     ejercicio: ' + JSON.stringify(nb));
})();

/* ── 4. Cifras que YA tienen variable pero siguen escritas a mano ─────────────────────────────
   No están mal hoy —coinciden con el dato real—, pero son las que se desincronizan en cuanto
   ese dato cambie: cada una es un sitio más que hay que acordarse de tocar. */
(function cifrasAMano() {
  const VARS = {
    '292,000': 'autoSaldo', '34,000': 'tcBbva', '315,800': 'autoTotal', '6,700': 'autoPago',
    '11,362': 'iphone', '1,708': 'appleWatch', '41,000': 'sueldo', '11,000': 'renta',
    '11,200': 'didiMes', '53,740': 'maestria', '10,000': 'fondoMeta', '500,000': 'maestriaMeta',
    '4,000': 'fondo', '6,500': 'cetes', '810': 'banamexMin',
  };
  const sinComentarios = s => s.replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n').filter(l => !l.trim().startsWith('//')).join('\n');
  let total = 0;
  const filas = [];
  for (const [rel, src] of [['Dashboard/dashboard.html', dash], ['Coach/Coach_v2.html', coach],
                            ['Finanzas/Finanzas.html', finz]]) {
    const s = sinComentarios(src);
    for (const [val, v] of Object.entries(VARS)) {
      const n = (s.match(new RegExp('\\$' + val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g')) || []).length;
      if (n) { total += n; filas.push('     ' + String(n).padStart(3) + ' x  $' + val.padEnd(9) + ' en ' + rel + '  →  {{' + v + '}}'); }
    }
  }
  if (total) aviso.push('Cifras con variable, todavía escritas a mano: ' + total +
    ' (coinciden hoy, pero cada una es un sitio que tocar cuando ese dato cambie)\n' + filas.join('\n'));
  else ok.push('Ninguna cifra con variable escrita a mano');
})();

/* ── 5. Marcadores {{x}} que no existan en el catálogo ── */
(function marcadores() {
  const maestro = leer('Dashboard/datos-maestros.js');
  const conocidos = new Set();
  const cat = maestro.slice(maestro.indexOf('const CLAVES'), maestro.indexOf('// ── Formato'));
  for (const m of cat.matchAll(/^\s{4}(\w+):\s*\{/gm)) conocidos.add(m[1]);
  const huerfanos = new Set();
  for (const [rel, src] of [['Dashboard/dashboard.html', dash], ['Coach/Coach_v2.html', coach],
                            ['Finanzas/Finanzas.html', finz]]) {
    // Fuera comentarios: la documentación del propio sistema usa "{{marcador}}" como ejemplo,
    // y eso no es un marcador roto en pantalla.
    const limpio = src.replace(/[/][*][\s\S]*?[*][/]/g, '')
                      .replace(/<!--[\s\S]*?-->/g, '')
                      .split('\n').filter(l => !l.trim().startsWith('//')).join('\n');
    for (const m of limpio.matchAll(/\{\{(\w+)\}\}/g)) if (!conocidos.has(m[1])) huerfanos.add(m[1] + ' (' + rel + ')');
  }
  if (huerfanos.size) problemas.push('Marcadores sin variable en el catálogo: ' + [...huerfanos].join(', '));
  else ok.push('Todos los {{marcadores}} existen en el catálogo (' + conocidos.size + ' variables)');
})();

// ── Informe ──
console.log('\nVERIFICAR SINCRONÍA — ' + new Date().toISOString().slice(0, 10));
console.log('='.repeat(70));
if (ok.length) { console.log('\nOK'); ok.forEach(l => console.log('  ✔ ' + l)); }
if (aviso.length) { console.log('\nAVISOS (no está roto, pero es deuda pendiente)'); aviso.forEach(l => console.log('  ! ' + l)); }
if (problemas.length) { console.log('\nDESINCRONIZADO'); problemas.forEach(l => console.log('  ✘ ' + l)); }
else console.log('\nNada desincronizado.');
console.log('');
process.exit(problemas.length ? 1 : 0);
