/* ══════════════════════════════════════════════════════════════════════════════════════════
   VERIFICAR SINCRONÍA — ¿dicen todas las apps lo mismo?
   ══════════════════════════════════════════════════════════════════════════════════════════
   Uso:   node Dashboard/verificar-sincronia.js           (desde Claude_Proyecto/)
          node Dashboard/verificar-sincronia.js --hook    (para el hook: JSON, y solo si hay algo roto)

   Sin --hook imprime el informe y sale con código 1 si algo está desincronizado.
   Con --hook no imprime nada cuando todo está bien y siempre sale con 0: informa, no bloquea.

   QUÉ VIGILA
   1. Que las estructuras que ya viven en `datos-maestros.js` no se hayan vuelto a incrustar en
      ningún HTML — es la guardia de la Regla 1.
   2. Lo que todavía no se puede unificar: `GYM_RUTINA_DEFAULT` contra `ejercicio.html`, y el
      texto de `PHASES`/`APRENDIZAJE` contra el HTML equivalente de Coach.
   3. Que ninguna cifra con variable siga escrita a mano.
   4. Que no haya `{{marcadores}}` fuera del catálogo.

   Extrae los literales balanceando corchetes y **saltando strings** — no con regex: los textos
   del proyecto llevan llaves y comillas dentro, y una regex se equivoca.

   La primera vez que se corrió (2026-08-24) encontró 7 textos de la rutina de cabello que se
   habían mejorado en Coach y nunca se replicaron al Dashboard. Llevaban 6 días divergentes.
   ══════════════════════════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const BS = String.fromCharCode(92);
const leer = rel => fs.readFileSync(path.join(RAIZ, rel), 'utf8');

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

const problemas = [], avisos = [], ok = [];

const maestro = leer('Dashboard/datos-maestros.js');
const dash    = leer('Dashboard/dashboard.html');
const coach   = leer('Coach/Coach_v2.html');
const ejer    = leer('CuidadoPersonal/ejercicio.html');
const finz    = leer('Finanzas/Finanzas.html');

const APPS = [['Dashboard/dashboard.html', dash], ['Coach/Coach_v2.html', coach],
              ['Finanzas/Finanzas.html', finz]];

const sinComentarios = s => s.replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/<!--[\s\S]*?-->/g, '')
  .split('\n').filter(l => !l.trim().startsWith('//')).join('\n');

/* ── 1. Fuente única: nadie puede volver a incrustar lo que ya vive en el maestro ─────────────
   La declaración legítima en una app es una línea que lee `CIFRAS.…`; un literal `[` o `{` no. */
(function fuenteUnica() {
  const PIEZAS = [
    { nom: 'RUTINA_TASKS',  enMaestro: 'const RUTINA_TASKS = [', lee: 'CIFRAS.rutina' },
    { nom: 'SK',            enMaestro: 'const SK = [',            lee: 'CIFRAS.SK' },
    { nom: 'PHASES',        enMaestro: 'const PHASES = [',        lee: 'CIFRAS.PHASES' },
    { nom: 'APRENDIZAJE',   enMaestro: 'const APRENDIZAJE = {',   lee: 'CIFRAS.APRENDIZAJE' },
    { nom: 'LISTA_COMPRAS', enMaestro: 'const LISTA_COMPRAS = {', lee: 'CIFRAS.LISTA_COMPRAS' },
    { nom: 'DEUDAS_SEED',   enMaestro: 'const DEUDAS_SEED = [',   lee: null },
  ];
  const bien = [];
  for (const p of PIEZAS) {
    if (maestro.indexOf(p.enMaestro) < 0) {
      problemas.push('datos-maestros.js ya no declara ' + p.nom + ' — es la fuente única, tiene que estar ahí');
      continue;
    }
    if (!p.lee) { bien.push(p.nom); continue; }
    const copian = [];
    for (const [rel, src] of APPS) {
      const i = src.indexOf('const ' + p.nom);
      if (i < 0) continue;                       // no todas las apps usan todas las piezas
      const linea = src.slice(i, src.indexOf('\n', i));
      if (linea.indexOf(p.lee) < 0) copian.push(rel);
    }
    if (copian.length)
      problemas.push(p.nom + ' volvió a incrustarse en: ' + copian.join(', ') +
        '\n     Debe leerse con ' + p.lee + ' — la fuente es Dashboard/datos-maestros.js');
    else bien.push(p.nom);
  }
  if (bien.length) ok.push('Fuente única respetada: ' + bien.join(', '));
})();

/* ── 2. GYM_RUTINA_DEFAULT contra ejercicio.html ──
   Sigue duplicado: `ejercicio.html` guarda la rutina en su propio localStorage y este literal es
   solo el respaldo para un navegador que nunca abrió esa app. */
(function gym() {
  const A = evaluar(literal(dash, 'const GYM_RUTINA_DEFAULT=', '{'));
  const B = evaluar(literal(ejer, 'rutina:', '{'));
  if (!A || !B) { avisos.push('GYM_RUTINA_DEFAULT: no se pudo extraer; comprobar a mano'); return; }
  const dias = [0, 1, 2, 3, 4, 5, 6];
  const na = dias.map(d => A[d] && A[d].nombre), nb = dias.map(d => B[d] && B[d].nombre);
  if (JSON.stringify(na) === JSON.stringify(nb)) ok.push('GYM_RUTINA_DEFAULT — los 7 días coinciden con ejercicio.html');
  else problemas.push('GYM_RUTINA_DEFAULT DISTINTO de ejercicio.html\n     dash     : ' +
    JSON.stringify(na) + '\n     ejercicio: ' + JSON.stringify(nb));
})();

/* ── 3. El texto del plan: maestro ↔ el HTML de Coach ─────────────────────────────────────────
   Coach escribe las fases y el aprendizaje como HTML a mano en sus secciones, y ese texto no se
   puede generar desde el literal sin rediseñar la sección. Mientras siga así, al menos se
   comprueba que los nombres y las prioridades coincidan. */
(function planEnCoach() {
  const P = evaluar(literal(maestro, 'const PHASES = [', '['));
  if (P) {
    const tagsMaestro = P.map(f => f.tag);
    const tagsCoach = [...coach.matchAll(/class="fase-tag">([^<]+)/g)].map(m => m[1].trim());
    const faltan = tagsMaestro.filter(t => !tagsCoach.some(c => c.indexOf(t) === 0));
    if (faltan.length) problemas.push('Fases del maestro que no aparecen en el HTML de Coach: ' + faltan.join(', '));
    else ok.push('PHASES — las ' + P.length + ' fases aparecen en el HTML de Coach');
  } else problemas.push('PHASES: no se pudo evaluar desde el maestro');

  const A = evaluar(literal(maestro, 'const APRENDIZAJE = {', '{'));
  if (A) {
    const claves = Object.keys(A);
    const faltan = claves.filter(k => coach.toLowerCase().indexOf(k.toLowerCase()) < 0);
    if (faltan.length) avisos.push('Prioridades de APRENDIZAJE que no se nombran en Coach: ' + faltan.join(', '));
    else ok.push('APRENDIZAJE — las ' + claves.length + ' prioridades se nombran en Coach');
  } else problemas.push('APRENDIZAJE: no se pudo evaluar desde el maestro');
})();

/* ── 4. Cifras que ya tienen variable pero siguen escritas a mano ───────────────────────────── */
(function cifrasAMano() {
  const VARS = {
    '292,000': 'autoSaldo', '34,000': 'tcBbva', '315,800': 'autoTotal', '6,700': 'autoPago',
    '11,362': 'iphone', '1,708': 'appleWatch', '41,000': 'sueldo', '11,000': 'renta',
    '11,200': 'didiMes', '53,740': 'maestria', '10,000': 'fondoMeta', '500,000': 'maestriaMeta',
    '4,000': 'fondo', '6,500': 'cetes', '810': 'banamexMin',
  };
  /* Coincidencias numéricas que NO son la variable. Van con su razón: un aviso que nunca se
     puede cerrar acaba ignorándose, y entonces el verificador deja de servir. Si aparece un
     número nuevo que sí es la variable, salta igual — estas excepciones son literales exactos. */
  const EXCEPCIONES = [
    'ingreso extra estable de al menos $10,000',   // ingreso objetivo, no la meta del fondo
    'ingreso extra estable de al menos <strong>$10,000',
    'ahorras ~$10,000 solo en el boleto',          // vuelo a Tailandia
    'a 12 meses $4,000/mes',                       // cuota de ahorro, no el saldo del fondo
    'Precio: $10,000 setup',                       // precio de un servicio del catálogo de negocios
    'original (oct. 2027, $500,000)',              // foto histórica: la meta ANTES de reagendarse
  ];
  let total = 0;
  const filas = [];
  for (const [rel, src] of APPS.concat([['Dashboard/datos-maestros.js', maestro]])) {
    let s = sinComentarios(src);
    EXCEPCIONES.forEach(e => { s = s.split(e).join(''); });
    for (const [val, v] of Object.entries(VARS)) {
      const n = (s.match(new RegExp('\\$' + val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g')) || []).length;
      if (n) { total += n; filas.push('     ' + String(n).padStart(3) + ' x  $' + val.padEnd(9) + ' en ' + rel + '  →  {{' + v + '}}'); }
    }
  }
  if (total) avisos.push('Cifras con variable, todavía escritas a mano: ' + total +
    ' (coinciden hoy, pero cada una es un sitio que tocar cuando ese dato cambie)\n' + filas.join('\n'));
  else ok.push('Ninguna cifra con variable escrita a mano');
})();

/* ── 5. Marcadores huérfanos ── */
(function marcadores() {
  const conocidos = new Set();
  const cat = maestro.slice(maestro.indexOf('const CLAVES'), maestro.indexOf('// ── Formato'));
  for (const m of cat.matchAll(/^\s{4}(\w+):\s*\{/gm)) conocidos.add(m[1]);
  const huerfanos = new Set();
  for (const [rel, src] of APPS)
    for (const m of sinComentarios(src).matchAll(/\{\{(\w+)\}\}/g))
      if (!conocidos.has(m[1])) huerfanos.add(m[1] + ' (' + rel + ')');
  if (huerfanos.size) problemas.push('Marcadores sin variable en el catálogo: ' + [...huerfanos].join(', '));
  else ok.push('Todos los {{marcadores}} existen en el catálogo (' + conocidos.size + ' variables)');
})();

// ── Salida ──
if (process.argv.indexOf('--hook') !== -1) {
  if (problemas.length) {
    process.stdout.write(JSON.stringify({
      systemMessage: 'DATOS DESINCRONIZADOS (' + problemas.length + ')\n\n' + problemas.join('\n\n') +
        '\n\nDetalle: node Dashboard/verificar-sincronia.js'
    }));
  }
  process.exit(0);   // el hook informa, no bloquea
}

console.log('\nVERIFICAR SINCRONÍA — ' + new Date().toISOString().slice(0, 10));
console.log('='.repeat(70));
if (ok.length) { console.log('\nOK'); ok.forEach(l => console.log('  ✔ ' + l)); }
if (avisos.length) { console.log('\nAVISOS (no está roto, pero es deuda pendiente)'); avisos.forEach(l => console.log('  ! ' + l)); }
if (problemas.length) { console.log('\nDESINCRONIZADO'); problemas.forEach(l => console.log('  ✘ ' + l)); }
else console.log('\nNada desincronizado.');
console.log('');
process.exit(problemas.length ? 1 : 0);
