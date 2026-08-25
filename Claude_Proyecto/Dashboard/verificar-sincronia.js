/* ══════════════════════════════════════════════════════════════════════════════════════════
   VERIFICAR SINCRONÍA — ¿dicen todas las apps lo mismo?
   ══════════════════════════════════════════════════════════════════════════════════════════
   Uso:   node Dashboard/verificar-sincronia.js           (desde Claude_Proyecto/)
          node Dashboard/verificar-sincronia.js --hook    (para el hook: JSON, y solo si hay algo roto)

   Sin --hook imprime el informe y sale con código 1 si algo está desincronizado.
   Con --hook no imprime nada cuando todo está bien y siempre sale con 0: informa, no bloquea.

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

/* ── 1. RUTINA_TASKS: que NADIE la tenga incrustada ──────────────────────────────────────────
   Desde el 2026-08-24 la rutina vive solo en datos-maestros.js y las apps la piden con
   CIFRAS.rutina(base). Antes estaba copiada en los dos HTML y llegó a divergir 6 días.
   Este control es la guardia de esa decisión: si alguien vuelve a pegar el literal en un HTML,
   salta aquí en vez de descubrirse semanas después. */
(function rutinaUnaSolaFuente() {
  const maestro = leer('Dashboard/datos-maestros.js');
  if (maestro.indexOf('const RUTINA_TASKS = [') < 0)
    problemas.push('datos-maestros.js ya no declara RUTINA_TASKS — es la fuente única, tiene que estar ahí');
  const R = evaluar(literal(maestro, 'const RUTINA_TASKS = ['));
  if (!R) { problemas.push('RUTINA_TASKS del maestro no se pudo evaluar'); return; }

  let incrustada = [];
  for (const [rel, src] of [['Dashboard/dashboard.html', dash], ['Coach/Coach_v2.html', coach]]) {
    // La declaración legítima es una línea que llama a CIFRAS.rutina(); un literal `[` no lo es.
    const i = src.indexOf('const RUTINA_TASKS');
    if (i < 0) { problemas.push(rel + ': no declara RUTINA_TASKS'); continue; }
    const linea = src.slice(i, src.indexOf('\n', i));
    if (linea.indexOf('CIFRAS.rutina') < 0) incrustada.push(rel);
  }
  if (incrustada.length)
    problemas.push('RUTINA_TASKS volvió a incrustarse en: ' + incrustada.join(', ') +
      '\n     Debe pedirse con CIFRAS.rutina(base) — la fuente es Dashboard/datos-maestros.js');
  else ok.push('RUTINA_TASKS — fuente única en datos-maestros.js (' + R.length + ' bloques), ninguna app la copia');
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

/* ── Modo --hook ──────────────────────────────────────────────────────────────────────────────
   Con `--hook` no imprime el informe: emite el JSON que Claude Code entiende, y SOLO cuando hay
   algo roto. Un hook que habla cuando todo está bien se vuelve ruido y se acaba ignorando.
   Los avisos (deuda pendiente) no interrumpen: solo los problemas. */
if (process.argv.indexOf('--hook') !== -1) {
  if (problemas.length) {
    const msg = 'DATOS DESINCRONIZADOS (' + problemas.length + ')\n\n' + problemas.join('\n\n') +
      '\n\nDetalle: node Dashboard/verificar-sincronia.js';
    process.stdout.write(JSON.stringify({ systemMessage: msg }));
  }
  process.exit(0);   // 0 siempre: el hook informa, no bloquea la respuesta
}

// ── Informe ──
console.log('\nVERIFICAR SINCRONÍA — ' + new Date().toISOString().slice(0, 10));
console.log('='.repeat(70));
if (ok.length) { console.log('\nOK'); ok.forEach(l => console.log('  ✔ ' + l)); }
if (aviso.length) { console.log('\nAVISOS (no está roto, pero es deuda pendiente)'); aviso.forEach(l => console.log('  ! ' + l)); }
if (problemas.length) { console.log('\nDESINCRONIZADO'); problemas.forEach(l => console.log('  ✘ ' + l)); }
else console.log('\nNada desincronizado.');
console.log('');
process.exit(problemas.length ? 1 : 0);
