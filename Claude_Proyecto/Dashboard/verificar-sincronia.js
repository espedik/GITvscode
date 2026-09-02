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
const coach   = leer('Coach/Coach.html');
const ejer    = leer('CuidadoPersonal/ejercicio.html');
const finz    = leer('Finanzas/Finanzas.html');

const APPS = [['Dashboard/dashboard.html', dash], ['Coach/Coach.html', coach],
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
  /* Los valores NO se escriben aquí: se piden al propio maestro. Tenerlos a mano era el mismo
     fallo que este script persigue — cada vez que un saldo cambiaba, el control seguía vigilando
     el número viejo y dejaba de ver el nuevo escrito a mano. Ahora se ajusta solo. */
  let CIFRAS;
  try {
    global.window = {}; global.localStorage = { getItem: () => null, setItem: () => {} };
    eval(maestro);
    CIFRAS = global.window.CIFRAS;
  } catch (e) { avisos.push('No se pudo cargar el maestro para leer las cifras: ' + e.message); return; }
  if (!CIFRAS) { avisos.push('El maestro no expone CIFRAS'); return; }

  /* Claves cuyo valor es un número DEMASIADO COMÚN para buscarlo por su cifra: $1,500 aparece
     como aporte a CETES, precio de un servicio, honorarios de contador, viáticos y hasta un
     vuelo interno. Rastrearlas daría ocho falsos positivos que crecerían con cada texto nuevo,
     y un aviso que no se puede cerrar acaba ignorándose. Se vigilan por contexto, no por número:
     donde SÍ significan la variable, ya llevan su marcador. */
  const AMBIGUAS = ['tcBbvaMin'];

  // Solo las que son dinero y valen la pena rastrear en prosa.
  const SEGUIR = ['autoSaldo', 'autoTotal', 'autoPago', 'tcBbva', 'tcBbvaMin', 'banamexMin',
                  'iphone', 'appleWatch', 'sueldo', 'renta', 'didiMes', 'maestria',
                  'maestriaMeta', 'fondo', 'fondoMeta', 'cetes'];
  const VARS = {};
  SEGUIR.forEach(k => {
    if (AMBIGUAS.indexOf(k) !== -1) return;
    const v = CIFRAS.v(k);
    if (v && v.charAt(0) === '$') VARS[v.slice(1)] = k;     // "$293,000" → "293,000"
  });

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
  for (const [rel, src] of APPS) {
    let s = sinComentarios(src);
    EXCEPCIONES.forEach(e => { s = s.split(e).join(''); });
    for (const [val, v] of Object.entries(VARS)) {
      const n = (s.match(new RegExp('\\$' + val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g')) || []).length;
      if (n) { total += n; filas.push('     ' + String(n).padStart(3) + ' x  $' + val.padEnd(9) + ' en ' + rel + '  →  {{' + v + '}}'); }
    }
  }
  if (total) avisos.push('Cifras con variable, todavía escritas a mano: ' + total +
    ' (coinciden hoy, pero cada una es un sitio que tocar cuando ese dato cambie)\n' + filas.join('\n'));
  else ok.push('Ninguna cifra con variable escrita a mano (' + Object.keys(VARS).length + ' valores comprobados, leídos del maestro)');
})();

/* ── 5. Números CRUDOS del maestro escritos en el código ──────────────────────────────────────
   El punto ciego que dejó pasar `ef/10000*100` y, peor, un gimnasio con dos precios a la vez:
   $650 en una función de Finanzas y $1,500 en otras cuatro del mismo archivo, meses después de
   cambiar de Fitsi a Total Pass. El control 4 solo mira cifras con `$`; este mira el número pelado.

   Dos patrones se aceptan y NO se reportan:
   · `dato?.campo || 500000` — un fallback tras leer el dato vivo. Ese número solo se usa cuando
     no hay nada guardado, así que no puede contradecir a nada.
   · las migraciones — `balance = 1708` dentro de un fix es una FOTO de un momento, no una copia:
     tiene que quedarse con su valor histórico aunque el saldo de hoy sea otro. */
(function numerosCrudos() {
  if (!global.window || !global.window.CIFRAS) return;   // el control 4 ya avisó
  const C = global.window.CIFRAS;
  const VALS = {};
  C.claves().forEach(k => {
    const n = C.n(k);
    if (typeof n === 'number' && Number.isInteger(n) && n >= 1000) VALS[n] = k;
  });
  const AMBIGUOS = ['1500', '4000'];   // dosis de vitaminas, cuotas de ahorro, precios sueltos
  const hallazgos = [];
  for (const [rel, src] of APPS.concat([['Dashboard/datos-maestros.js', maestro]])) {
    const limpio = sinComentarios(src);
    for (const [val, k] of Object.entries(VALS)) {
      if (AMBIGUOS.indexOf(val) !== -1) continue;
      const re = new RegExp('(?<![\\$\\d.,])' + val + '(?![\\d.,]|px|%|ms|em)', 'g');
      let m;
      while ((m = re.exec(limpio)) !== null) {
        const antes = limpio.slice(Math.max(0, m.index - 90), m.index);
        if (/\|\|\s*$/.test(antes)) continue;                                     // fallback legítimo
        if (/(balance|total|current|target|invested|value|emergencyFund)\s*=\s*$/.test(antes)) continue;  // migración
        const ctx = limpio.slice(Math.max(0, m.index - 60), m.index + 40).replace(/\s+/g, ' ');
        hallazgos.push('     ' + String(val).padEnd(8) + '(' + k + ')  en ' + rel + '  …' + ctx + '…');
      }
    }
  }
  if (hallazgos.length) avisos.push('Números del maestro escritos crudos en el código: ' +
    hallazgos.length + '\n' + hallazgos.slice(0, 12).join('\n') +
    (hallazgos.length > 12 ? '\n     … y ' + (hallazgos.length - 12) + ' más' : ''));
  else ok.push('Ningún número del maestro escrito crudo en el código');
})();

/* ── 6. El mapa de dependencias, comprobado contra la realidad ────────────────────────────────
   Cada derivada del maestro declara su `dep`. Aquí NO se cree esa declaración: se mide.
   Se cambia el valor de cada base, se mira qué claves se movieron de verdad y se compara con lo
   declarado. Una dependencia que alguien olvide declarar al añadir una fórmula salta aquí, no
   meses después cuando un cambio deje media documentación desfasada. */
(function grafoReal() {
  if (!global.window || !global.window.CIFRAS) return;
  const C = global.window.CIFRAS, P = C.PROYECTO;
  const claves = C.claves();
  const base = {}; claves.forEach(k => base[k] = C.v(k));
  const faltan = [], sobran = [];

  /* Solo las CONSTANTES: un getter (servicios, fijosTotal…) no acepta asignación, así que
     perturbarlo no movería nada y daría un falso "no se cumple". Sus dependencias se comprueban
     igual, a través de las bases que sí se pueden tocar. */
  const esConstante = k => {
    const d = Object.getOwnPropertyDescriptor(P, k);
    return d && !d.get && typeof d.value === 'number';
  };
  Object.keys(P).filter(esConstante).forEach(function (k) {
    const orig = P[k];
    P[k] = orig + 7;                                  // perturbar
    const movidas = claves.filter(c => C.v(c) !== base[c] && c !== k);
    P[k] = orig;                                      // restaurar
    const declarado = C.impacto(k);
    movidas.forEach(m => { if (declarado.indexOf(m) === -1) faltan.push(k + ' → ' + m); });
    declarado.forEach(d => { if (movidas.indexOf(d) === -1) sobran.push(k + ' → ' + d); });
  });

  if (faltan.length)
    problemas.push('Dependencias REALES que nadie declaró (cambiar la primera mueve la segunda):' +
      '\n     ' + faltan.join('\n     ') +
      '\n     Declararlas con `dep: [...]` en CLAVES, o el impacto de un cambio queda invisible.');
  else if (sobran.length)
    avisos.push('Dependencias declaradas que no se cumplen al medirlas: ' + sobran.join(', '));
  else
    ok.push('Mapa de dependencias — lo declarado coincide con lo medido (' +
      Object.keys(C.grafo()).length + ' variables arrastran a otras)');
})();

/* ── 7. Los valores citados en la documentación ───────────────────────────────────────────────
   ESTE es el que faltaba de verdad. Los cálculos se ajustan solos porque son getters, pero las
   TABLAS de los .md llevan el número escrito: al bajar el gym de $1,500 a $650, `fijosTotal`
   pasó de $14,194 a $13,344 en el código y los .md siguieron diciendo $14,194.
   Se comprueba que cada `{{clave}} | $valor` de las tablas coincida con lo que da el maestro. */
(function docsAlDia() {
  if (!global.window || !global.window.CIFRAS) return;
  const C = global.window.CIFRAS;
  const DOCS = ['Dashboard/DATOS-MAESTROS.md', 'Dashboard/readme_dashboard.md',
                'Coach/readme_coach.md', 'Finanzas/readme_finanzas.md'];
  const malas = [];
  DOCS.forEach(function (rel) {
    let txt; try { txt = leer(rel); } catch (e) { return; }
    /* Línea a línea, y solo filas con UN marcador: si la fila junta varios
       (`{{autoSaldo}}` `{{autoTotal}}` … | $293,000 · $315,800 · …) no hay forma fiable de saber
       qué importe le toca a cada uno, y adivinar daría falsos positivos que acaban ignorándose. */
    txt.split('\n').forEach(function (linea, i) {
      const marcas = linea.match(/\{\{(\w+)\}\}/g) || [];
      if (marcas.length !== 1) return;
      const clave = marcas[0].slice(2, -2);
      const real = C.v(clave);
      if (real === '—' || real.charAt(0) !== '$') return;
      const resto = linea.slice(linea.indexOf(marcas[0]) + marcas[0].length);
      const imp = resto.match(/\$[\d,]+/);
      if (!imp) return;
      if (imp[0] !== real)
        malas.push('     ' + rel + ':' + (i + 1) + ' · {{' + clave + '}} dice ' + imp[0] + ' y vale ' + real);
    });
  });
  if (malas.length) problemas.push('Valores desfasados en la documentación:\n' + malas.join('\n'));
  else ok.push('Los valores citados en los .md coinciden con el maestro');
})();

/* ── 8. Marcadores huérfanos ── */
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

/* ── 9. La FORMA de los datos, no solo sus importes ──────────────────────────────
   Los ocho controles de arriba vigilan que los NÚMEROS coincidan entre sitios. Ninguno miraba
   si el dato tiene sentido en sí mismo, y ese fue el hueco: el 2026-08-28 se descubrió que el
   crédito automotriz tenía `day: 1` cuando se paga el 14. El calendario lo pintaba junto a la
   renta y nada saltó — un `day` equivocado no mueve ninguna cifra, así que `minimosDeuda` y
   `margen` seguían cuadrando y los .md seguían al día.

   Lo que se comprueba aquí no se puede derivar de otro archivo: es coherencia interna.
   El caso que más duele es el que abre la lista — una deuda viva a la que nadie le puso día
   de pago simplemente NO existe para el calendario, sin aviso de ninguna clase. */
(function formaDeLosDatos() {
  if (!global.window || !global.window.CIFRAS) return;
  const C = global.window.CIFRAS, P = C.PROYECTO, D = C.DEUDAS_SEED, CAL = C.CALENDARIO;
  const malos = [];
  const esFecha = s => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(new Date(s));

  /* Día 1-28 y no 1-31: un pago fijado el 30 no existe en febrero, así que el calendario lo
     perdería un mes de cada doce. Si alguna vez hay uno real, esto es lo que hay que discutir. */
  const DIA_MAX = 28;

  // a) Deudas vivas sin día de pago: invisibles en el calendario.
  D.filter(d => +d.balance > 0 && +d.min > 0).forEach(function (d) {
    if (!(d.day >= 1 && d.day <= DIA_MAX && d.day % 1 === 0))
      malos.push('     ' + d.id + ' (' + d.name + ') tiene saldo vivo y mínimo de $' +
        Math.round(d.min).toLocaleString('es-MX') + '/mes, pero day=' + d.day +
        ' — nunca aparece en el calendario');
  });

  // b) Forma de cada registro de deuda.
  const CAMPOS = {id:'string', name:'string', type:'string', total:'number',
                  balance:'number', rate:'number', min:'number', day:'number'};
  D.forEach(function (d) {
    Object.keys(CAMPOS).forEach(function (k) {
      if (typeof d[k] !== CAMPOS[k])
        malos.push('     ' + d.id + '.' + k + ' es ' + typeof d[k] + ', se esperaba ' + CAMPOS[k]);
    });
    if (!esFecha(d.start)) malos.push('     ' + d.id + '.start no es una fecha YYYY-MM-DD: ' + d.start);
    if (+d.balance > +d.total)
      malos.push('     ' + d.id + ' debe más de lo que costó: balance ' + d.balance + ' > total ' + d.total);
    ['balance','total','min','rate'].forEach(function (k) {
      if (+d[k] < 0) malos.push('     ' + d.id + '.' + k + ' es negativo: ' + d[k]);
    });
  });

  // c) Ids únicos: dos deudas con el mismo id y una de las dos deja de existir.
  const vistos = {};
  D.forEach(function (d) {
    if (vistos[d.id]) malos.push('     id repetido en DEUDAS_SEED: ' + d.id);
    vistos[d.id] = 1;
  });

  // c-bis) Todo gasto fijo de PROYECTO tiene que caer algún día del calendario. Hasta el
  //        2026-08-30 seis de ellos —internet, gas, luz/agua, Claude Code, iCloud y una
  //        limpieza que ni siquiera se paga— sumaban $1,094 al mes que salían de la cuenta
  //        sin que ninguna pantalla los descontara: el tablero daba saldos de más.
  const FIJOS_CON_DIA = ['renta', 'celular', 'internet', 'gas', 'luzAgua', 'gym',
                         'claudeCode', 'icloud', 'cetesDia15'];
  const textoCobros = (C.CALENDARIO.cobros || []).map(function (c) { return String(c.txt).toLowerCase(); }).join(' | ');
  const APODO = { celular: 'plan de datos', luzAgua: 'luz y agua', cetesDia15: 'cetes',
                  claudeCode: 'claude code', icloud: 'icloud' };
  FIJOS_CON_DIA.forEach(function (k) {
    if (!(+P[k] > 0)) return;
    const busca = APODO[k] || k.toLowerCase();
    if (textoCobros.indexOf(busca) < 0)
      malos.push('     PROYECTO.' + k + ' ($' + P[k] + ') no tiene día en CALENDARIO.cobros');
  });

  // d) Las sumas de PROYECTO. Son getters, así que no pueden desfasarse solas — pero sí si
  //    alguien añade un servicio nuevo y se olvida de meterlo en el getter.
  [['ingresoTotal', P.sueldo + P.didiMes + P.siVale],
   ['servicios', P.celular + P.internet + P.gasMensual + P.luzAgua],
   ['suscripciones', P.gym + P.claudeCode + P.icloud],
   ['fijosTotal', P.renta + P.servicios + P.suscripciones]].forEach(function (par) {
    if (Math.abs(P[par[0]] - par[1]) > 0.005)
      malos.push('     PROYECTO.' + par[0] + ' da ' + P[par[0]] + ' y la suma de sus partes es ' + par[1]);
  });

  // e) Los cobros fijos del calendario.
  (CAL && CAL.cobros || []).forEach(function (c) {
    if (!(c.dia >= 1 && c.dia <= DIA_MAX)) malos.push('     cobro "' + c.txt + '" con día ' + c.dia + ' (fuera de 1-' + DIA_MAX + ')');
    if (typeof c.monto !== 'number' || !isFinite(c.monto)) malos.push('     cobro "' + c.txt + '" sin monto numérico');
  });
  (CAL && CAL.hitos || []).forEach(function (h) {
    if (!esFecha(h.fecha)) malos.push('     hito "' + h.txt + '" con fecha inválida: ' + h.fecha);
  });

  // f) Las fechas sueltas de PROYECTO.
  ['entrevistaWayve','maestriaInicio','inicioCenlex','maestriaPausa'].forEach(function (k) {
    if (!esFecha(P[k])) malos.push('     PROYECTO.' + k + ' no es una fecha YYYY-MM-DD: ' + P[k]);
  });

  // g) Las fases no se solapan ni dejan huecos.
  (C.PHASES || []).forEach(function (f, i) {
    if (f.end < f.start) malos.push('     ' + f.tag + ' termina antes de empezar');
    if (i > 0) {
      const hueco = Math.round((f.start - C.PHASES[i-1].end) / 86400000);
      if (hueco < 1) malos.push('     ' + C.PHASES[i-1].tag + ' y ' + f.tag + ' se solapan');
      if (hueco > 1) malos.push('     hueco de ' + hueco + ' días entre ' + C.PHASES[i-1].tag + ' y ' + f.tag);
    }
  });

  if (malos.length) problemas.push('Datos del maestro mal formados:\n' + malos.join('\n'));
  else ok.push('Forma de los datos — deudas, cobros, fechas y sumas del maestro son coherentes (' +
    D.length + ' deudas, ' + ((CAL && CAL.cobros || []).length) + ' cobros fijos)');
})();

/* ── 10. La tabla de días de pago del .md contra el maestro ─────────────────────────
   El control 7 compara los IMPORTES citados en los .md, y por eso no vio el día del auto: 14 no
   es una cantidad de dinero. Esta tabla —`| `d003` | Crédito Automotriz | **14** |`— es la única
   documentación del `day`, así que se comprueba fila a fila. Documentar un dato que nadie
   verifica es exactamente cómo se desincronizó todo lo demás. */
(function diasDocumentados() {
  if (!global.window || !global.window.CIFRAS) return;
  const C = global.window.CIFRAS;
  let txt; try { txt = leer('Dashboard/DATOS-MAESTROS.md'); } catch (e) { return; }
  const malas = [];
  let filas = 0;
  txt.split('\n').forEach(function (linea, i) {
    // | `d003` | Crédito Automotriz | **14** |   ·   ids agrupados: | `d009` `d010` | … | 22 |
    const m = linea.match(/^\s*\|((?:\s*`d\d{3}`)+)\s*\|[^|]*\|\s*\**(\d{1,2})\**\s*\|/);
    if (!m) return;
    const dia = +m[2];
    (m[1].match(/d\d{3}/g) || []).forEach(function (id) {
      const d = (C.DEUDAS_SEED || []).find(x => x.id === id);
      filas++;
      if (!d) malas.push('     DATOS-MAESTROS.md:' + (i+1) + ' cita ' + id + ', que no existe en DEUDAS_SEED');
      else if (+d.day !== dia)
        malas.push('     DATOS-MAESTROS.md:' + (i+1) + ' · ' + id + ' (' + d.name + ') documentado el día ' +
          dia + ' y en el maestro es el ' + d.day);
    });
  });
  if (malas.length) problemas.push('Días de pago desfasados entre el .md y el maestro:\n' + malas.join('\n'));
  else if (filas) ok.push('Los días de pago del .md coinciden con el maestro (' + filas + ' comprobados)');
})();

/* ── 11. La rutina de la piel: RUTINA_PIEL contra RUTINA_TASKS ──────────────────────
   Hasta el 2026-09-01 los productos de la cara vivían escritos a mano en dos sitios y no
   coincidían: `RUTINA_TASKS` aplicaba La Roche-Posay Anthelios y la guía de Skincare
   recomendaba Isdin; `RUTINA_TASKS` ponía el Differin las 7 noches y la guía mandaba
   alternarlo con un BHA que Adán no usa. Nadie lo vio porque ningún control miraba texto de
   productos.

   Ahora `RUTINA_PIEL` es la fuente y este control comprueba lo único que puede volver a
   separarse: que cada producto de la rutina siga NOMBRADO en las tareas que la ejecutan. Si
   alguien cambia de marca en un sitio y no en el otro, sale aquí. */
(function pielCoherente() {
  if (!global.window || !global.window.CIFRAS) return;
  const C = global.window.CIFRAS;
  const RP = C.RUTINA_PIEL;
  if (!RP) { problemas.push('RUTINA_PIEL no existe en el maestro'); return; }

  // Todo el texto de las tareas de la rutina, en una sola cadena.
  const texto = JSON.stringify(C.rutina(''));
  const malos = [];
  RP.productos.forEach(function (p) {
    if (p.opcional) return;               // la mascarilla no está en su semana, a propósito
    if (texto.indexOf(p.n) === -1)
      malos.push('     ' + p.cat + ': RUTINA_PIEL dice \'' + p.n + '\' y ese nombre no aparece ' +
        'en ninguna subtarea de RUTINA_TASKS');
  });

  // Y que los pasos sigan formando dos rutinas completas.
  const am = RP.pasos('am'), pm = RP.pasos('pm');
  if (!am.length) malos.push('     RUTINA_PIEL no tiene ning\u00fan paso de ma\u00f1ana');
  if (!pm.length) malos.push('     RUTINA_PIEL no tiene ning\u00fan paso de noche');
  if (!RP.productos.some(function (p) { return p.id === 'spf'; }))
    malos.push('     RUTINA_PIEL sin protector solar \u2014 es el paso que nunca se salta');

  if (malos.length) problemas.push('La rutina de la piel no coincide con las tareas que la ejecutan:\n' + malos.join('\n'));
  else ok.push('RUTINA_PIEL coincide con RUTINA_TASKS (' + RP.productos.filter(function (p) { return !p.opcional; }).length +
    ' productos, AM ' + am.length + ' pasos / PM ' + pm.length + ', $' + RP.costoMesTotal + ' al mes)');
})();

/* ── 12. La rutina del cabello: RUTINA_PELO contra RUTINA_TASKS ────────────────────
   Gemelo del 11, para el pelo. Además del nombre comprueba **el día**: la semana de lavado
   vive en `RUTINA_PELO.productos[].dias` y las tareas de `RUTINA_TASKS` que la ejecutan están
   repartidas por día de la semana, así que las dos pueden separarse sin que cambie ninguna
   cifra. El Pilexil va lunes y jueves: si un día se mueve en un sitio y no en el otro, sale
   aquí. */
(function peloCoherente() {
  if (!global.window || !global.window.CIFRAS) return;
  const C = global.window.CIFRAS;
  const RP = C.RUTINA_PELO;
  if (!RP) { problemas.push('RUTINA_PELO no existe en el maestro'); return; }

  const tareas = C.rutina('');
  const todo = JSON.stringify(tareas);
  const malos = [];

  // Sin distinguir mayúsculas: "crema sin enjuague X" y "Crema sin enjuague X" son el mismo
  // producto, y exigir la caja exacta solo genera ruido.
  const bajo = todo.toLowerCase();
  RP.productos.forEach(function (p) {
    if (bajo.indexOf(p.n.toLowerCase()) === -1)
      malos.push('     ' + p.cat + ": RUTINA_PELO dice '" + p.n + "' y ese nombre no aparece en RUTINA_TASKS");
  });

  // Los días de cada champú, contra las tareas de la MAÑANA que lo nombran. Los
  // `diasCondicionales` quedan fuera: el CeraVe del miércoles no va en la ducha de la mañana
  // sino al salir de la alberca, en otra tarea que corre de lunes a viernes.
  RP.productos.filter(function (p) { return p.champu && p.dias.length; }).forEach(function (p) {
    const corto = p.n.toLowerCase();
    const dias = {};
    tareas.forEach(function (t) {
      if (!/Rutina de la ma/.test(t.txt || '')) return;
      if (JSON.stringify(t.subtareas || []).toLowerCase().indexOf(corto) === -1) return;
      (t.dias || []).forEach(function (d) { dias[d] = true; });
    });
    const enTareas = Object.keys(dias).map(Number).sort(function (a, b) { return a - b; });
    const cond = p.diasCondicionales || [];
    const esperado = p.dias.filter(function (d) { return cond.indexOf(d) === -1; })
      .sort(function (a, b) { return a - b; });
    if (enTareas.length && enTareas.join(',') !== esperado.join(','))
      malos.push('     ' + p.n + ': RUTINA_PELO lo pone los días [' + esperado.join(',') +
        '] y la rutina de la mañana lo nombra los [' + enTareas.join(',') + ']  (0=domingo)');
  });

  if (!RP.productos.some(function (p) { return p.id === 'minoxidil'; }))
    malos.push('     RUTINA_PELO sin minoxidil \u2014 es el tratamiento, no un extra');

  if (malos.length) problemas.push('La rutina del cabello no coincide con las tareas que la ejecutan:\n' + malos.join('\n'));
  else ok.push('RUTINA_PELO coincide con RUTINA_TASKS (' + RP.productos.length +
    ' productos, $' + RP.costoMesTotal + ' al mes)');
})();

/* ── 13. Los suplementos: SUPLEMENTOS contra RUTINA_TASKS ────────────────────────
   Los 6 estaban escritos a mano en tres sitios: las subtareas de `RUTINA_TASKS`, la lista de
   `LISTA_COMPRAS.suplementos` y el catálogo de `salud.html`. Coincidían de casualidad.

   Además del nombre comprueba **el momento**: los de la mañana tienen que aparecer en una
   subtarea de la rutina de la mañana y los de la noche en una de la noche. Cambiar el magnesio
   a la mañana en un sitio y no en el otro no mueve ninguna cifra, y de otro modo nadie lo veía. */
(function suplementosCoherentes() {
  if (!global.window || !global.window.CIFRAS) return;
  const C = global.window.CIFRAS;
  const SU = C.SUPLEMENTOS;
  if (!SU) { problemas.push('SUPLEMENTOS no existe en el maestro'); return; }

  const tareas = C.rutina('');
  const malos = [];

  // El texto de las subtareas de la sección "Suplementos", separado por momento del día.
  const texto = { am: '', pm: '' };
  tareas.forEach(function (t) {
    const m = /Rutina de la ma/.test(t.txt || '') ? 'am'
            : (/Rutina de la noche/.test(t.txt || '') ? 'pm' : null);
    if (!m) return;
    let dentro = false;
    (t.subtareas || []).forEach(function (st) {
      if (st.sec) dentro = /Suplementos/i.test(st.sec);
      if (dentro) texto[m] += ' ' + (st.txt || '');
    });
  });

  SU.lista.forEach(function (p) {
    const corto = p.n.split(' (')[0].toLowerCase();
    const donde = texto[p.momento].toLowerCase();
    const otro = texto[p.momento === 'am' ? 'pm' : 'am'].toLowerCase();
    if (donde.indexOf(corto) === -1) {
      malos.push('     ' + p.n + ": SUPLEMENTOS lo pone en la " + (p.momento === 'am' ? 'mañana' : 'noche') +
        (otro.indexOf(corto) !== -1 ? ', y RUTINA_TASKS lo tiene en el otro momento' : ', y no aparece en las subtareas de Suplementos de RUTINA_TASKS'));
    }
  });

  if (SU.costoMesTotal <= 0) malos.push('     SUPLEMENTOS.costoMesTotal salió en 0 — falta precio o tamaño de envase');
  if (!C.CHEQUEO || !C.CHEQUEO.examenes.length) malos.push('     CHEQUEO sin exámenes');

  if (malos.length) problemas.push('Los suplementos no coinciden con la rutina que los ejecuta:\n' + malos.join('\n'));
  else ok.push('SUPLEMENTOS coincide con RUTINA_TASKS (' + SU.delMomento('am').length + ' AM / ' +
    SU.delMomento('pm').length + ' PM, $' + SU.costoMesTotal + ' al mes, ' + C.CHEQUEO.examenes.length + ' exámenes)');
})();

/* ── Impacto de lo que cambió en esta sesión ──────────────────────────────────────────────────
   Si `datos-maestros.js` cambió respecto al último commit, se comparan los valores de entonces
   con los de ahora y se dice qué se movió — incluido lo ARRASTRADO. Es la parte que Adán
   señaló: al bajar el gym, `suscripciones`, `fijosTotal` y `margen` cambiaron con él, y sin
   verlo escrito es fácil dar por terminado un cambio con media documentación desfasada. */
function impactoDelCambio() {
  if (!global.window || !global.window.CIFRAS) return null;
  const { execSync } = require('child_process');
  let antes;
  try {
    antes = execSync('git show HEAD:Claude_Proyecto/Dashboard/datos-maestros.js',
      { cwd: path.resolve(RAIZ, '..'), encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch (e) { return null; }                    // sin git, o archivo nuevo: no hay con qué comparar
  if (antes === maestro) return null;             // no cambió

  const ahora = global.window.CIFRAS;
  const valoresAhora = {}; ahora.claves().forEach(k => valoresAhora[k] = ahora.v(k));

  // Cargar la versión anterior en un contexto aparte
  let viejo;
  try {
    const sandbox = { window: {}, localStorage: { getItem: () => null, setItem: () => {} } };
    const fn = new Function('window', 'localStorage', antes + '; return window.CIFRAS;');
    viejo = fn(sandbox.window, sandbox.localStorage);
  } catch (e) { return null; }
  if (!viejo) return null;

  const movidas = [];
  ahora.claves().forEach(function (k) {
    let v; try { v = viejo.v(k); } catch (e) { v = null; }
    if (v !== valoresAhora[k]) movidas.push({ k: k, de: v, a: valoresAhora[k] });
  });
  if (!movidas.length) return null;

  /* Se separa lo que alguien EDITÓ de lo que se movió solo por depender de ello: es la
     diferencia entre "cambié esto" y "esto cambió conmigo, revísalo". */
  const nombres = movidas.map(m => m.k);
  const arrastradas = new Set();
  nombres.forEach(k => ahora.impacto(k).forEach(x => { if (nombres.indexOf(x) !== -1) arrastradas.add(x); }));
  const editadas = movidas.filter(m => !arrastradas.has(m.k));
  const derivadas = movidas.filter(m => arrastradas.has(m.k));

  const L = ['CAMBIÓ UNA VARIABLE MAESTRA'];
  L.push('');
  editadas.forEach(m => L.push('  editada:  ' + m.k + '  ' + m.de + ' → ' + m.a));
  if (derivadas.length) {
    L.push('');
    L.push('  se movieron con ella:');
    derivadas.forEach(m => L.push('    ' + m.k + '  ' + m.de + ' → ' + m.a));
  }
  L.push('');
  L.push('  Revisa que las tablas de los .md y cualquier texto que cite estas cifras estén al día.');
  L.push('  (el control 7 comprueba los .md; los textos con {{marcador}} se resuelven solos)');
  return L.join('\n');
}

/* ── 14. El recetario y la lista de compras ────────────────────────────────────
   RECETARIO es la fuente y LISTA_COMPRAS.comida se deriva de sus ingredientes.
   Este control comprueba que la derivación sigue viva —que nadie volvió a
   escribir la lista a mano— y que cada receta está completa: sin pasillo en un
   ingrediente, ese producto desaparece de la compra sin avisar. */
(function () {
  if (!global.window || !global.window.CIFRAS) return;
  const C = global.window.CIFRAS;
  const R = C.RECETARIO;
  if (!R) { problemas.push('RECETARIO no existe en el maestro'); return; }
  const malos = [];

  // a) toda receta con sus partes
  R.todas.forEach(function (r) {
    if (!r.id || !r.nombre) malos.push('     una receta sin id o sin nombre');
    if (!(r.ingredientes || []).length) malos.push('     ' + r.nombre + ': sin ingredientes');
    if (!(r.pasos || []).length) malos.push('     ' + r.nombre + ': sin pasos');
    if (!r.macros || !r.macros.cal) malos.push('     ' + r.nombre + ': sin macros');
    (r.ingredientes || []).forEach(function (i) {
      if (!i.n) malos.push('     ' + r.nombre + ': un ingrediente sin nombre');
      if (!i.p) malos.push('     ' + r.nombre + ' / ' + i.n + ': sin pasillo — no llegaría a la compra');
      if (!i.c) malos.push('     ' + r.nombre + ' / ' + i.n + ': sin cantidad');
    });
  });

  // b) ids únicos
  const vistos = {};
  R.todas.forEach(function (r) {
    if (vistos[r.id]) malos.push('     id repetido: ' + r.id);
    vistos[r.id] = 1;
  });

  // c) la lista de compras SIGUE siendo la derivada, no una copia a mano
  const enLista = {};
  Object.values(C.LISTA_COMPRAS.comida).forEach(function (arr) {
    arr.forEach(function (x) { enLista[x] = 1; });
  });
  const enRecetas = {};
  R.todas.forEach(function (r) {
    (r.ingredientes || []).forEach(function (i) { if (i.n) enRecetas[i.n] = 1; });
  });
  Object.keys(enRecetas).forEach(function (x) {
    if (!enLista[x]) malos.push('     ' + x + ': está en una receta y NO en la lista de compras');
  });
  Object.keys(enLista).forEach(function (x) {
    if (!enRecetas[x]) malos.push('     ' + x + ': está en la lista y en NINGUNA receta');
  });

  if (malos.length)
    problemas.push('El recetario y la lista de compras no cuadran:\n' + malos.slice(0, 12).join('\n'));
  else
    ok.push('RECETARIO alimenta la lista de compras (' + R.todas.length + ' recetas, ' +
            Object.keys(enRecetas).length + ' ingredientes en ' +
            Object.keys(C.LISTA_COMPRAS.comida).length + ' pasillos)');
})();

/* ── 15. Las fichas de producto, en las cinco categorías ─────────────────────
   El botón "Qué es" de la lista de la compra abre una ficha que se arma entera desde el
   maestro: el dashboard no guarda ni una línea de ese texto. Eso deja dos formas de
   romperla en silencio, y las dos se comprueban aquí:

     1. Un producto nuevo sin `ficha` — o con un campo vacío — sale en la lista con su
        botón y abre una ficha a medias, sin que nada avise.
     2. El renglón de la compra se arma con `textoCompra` y se deshace con
        `deTextoCompra`. Si alguna vez dejan de ser inversas (alguien vuelve a escribir el
        texto a mano en el getter, por ejemplo) el botón deja de encontrar el producto y
        no hace nada al pulsarlo: ningún error en consola, solo un botón muerto.

   Cada categoría declara qué campos de ficha le exige y de dónde saca el "cómo se usa",
   porque no todas lo tienen igual: skincare lo reparte en `am`/`pm`, los suplementos no
   tienen `uso` sino `dosis` y `momento`, y `sirve`/`ojo` pueden venir ya escritos en el
   producto (`porQue` y `ojo` de SUPLEMENTOS) en vez de en la ficha. Exigirlos en la ficha
   obligaría a repetirlos, que es justo lo que este archivo persigue.

   También comprueba que cada producto trae con qué pintarse — `frasco` conocido y los dos
   colores —, porque casi ninguno tiene foto y se dibujan. */
(function fichasDeProducto() {
  if (!global.window || !global.window.CIFRAS) return;   // el control 4 ya avisó
  const C = global.window.CIFRAS;
  const FRASCOS = ['bomba', 'gotero', 'tubo', 'tarro', 'bote', 'botella', 'tela', 'pastillas',
                   'caja', 'polvo', 'sobre', 'bolsa', 'barra', 'cepillo', 'utensilio',
                   'aparato', 'pano', 'gafas', 'gotas'];
  // `lista` dice dónde están los productos; `propios` son los campos que la ficha NO
  // tiene que traer porque el producto ya los tiene escritos.
  const CATS = [
    { cat: 'skincare',    fuente: 'RUTINA_PIEL',  lista: 'productos', propios: [] },
    { cat: 'cabello',     fuente: 'RUTINA_PELO',  lista: 'productos', propios: [] },
    { cat: 'suplementos', fuente: 'SUPLEMENTOS',  lista: 'lista',     propios: ['sirve', 'ojo'] },
    { cat: 'higiene',     fuente: 'KIT_HIGIENE',  lista: 'todos',     propios: [] },
    { cat: 'ojos',        fuente: 'CUIDADO_OJOS', lista: 'todos',     propios: [] },
  ];
  // Lo que se le exige a cada campo. `activo` y `tarda` pueden ser correctos y muy
  // cortos ("Inmediato.", "Minoxidil 5%"); los otros cuatro tienen que explicar algo,
  // y por debajo de 20 caracteres no explican nada.
  const CAMPOS = { activo: 6, que: 20, hace: 20, sirve: 20, tarda: 6, ojo: 20 };
  const malos = [];
  let total = 0, conFoto = 0;

  CATS.forEach(function (D) {
    const O = C[D.fuente];
    if (!O) { malos.push('  ' + D.fuente + ' no existe en el maestro'); return; }
    if (!O.textoCompra || !O.deTextoCompra) {
      malos.push('  ' + D.fuente + ': le falta textoCompra/deTextoCompra — el botón no ' +
                 'podría saber qué producto abrir');
      return;
    }
    const productos = O[D.lista] || [];
    if (!productos.length) { malos.push('  ' + D.fuente + '.' + D.lista + ' está vacío'); return; }

    productos.forEach(function (p) {
      total++;
      const donde = D.cat + '.' + (p.id || '?');
      const f = p.ficha;
      if (!f) { malos.push('  ' + donde + ': sin `ficha` — su botón abriría una ficha vacía'); return; }
      Object.keys(CAMPOS).forEach(function (k) {
        // Un campo puede venir del producto en vez de la ficha: los suplementos
        // ya traían `porQue` y `ojo` escritos, y repetirlos sería el error de siempre.
        if (D.propios.indexOf(k) !== -1) {
          const alt = k === 'sirve' ? p.porQue : p[k];
          if (f[k]) malos.push('  ' + donde + '.ficha.' + k + ': repetido — ya vive en el producto');
          else if (!alt || String(alt).trim().length < CAMPOS[k])
            malos.push('  ' + donde + ': le falta ' + (k === 'sirve' ? '`porQue`' : '`' + k + '`'));
          return;
        }
        if (!f[k] || String(f[k]).trim().length < CAMPOS[k])
          malos.push('  ' + donde + '.ficha.' + k + ': falta o no llega a ' + CAMPOS[k] + ' caracteres');
      });

      // Con qué se dibuja cuando no hay foto, que es casi siempre.
      if (FRASCOS.indexOf(p.frasco) === -1)
        malos.push('  ' + donde + ': frasco "' + p.frasco + '" no está entre los ' + FRASCOS.length + ' dibujados');
      if (!p.marca || !/^#[0-9a-f]{6}$/i.test((p.marca || {}).a || '') ||
          !/^#[0-9a-f]{6}$/i.test((p.marca || {}).b || ''))
        malos.push('  ' + donde + ': `marca` necesita dos colores en hex');
      if (p.foto) conFoto++;

      // De dónde sale el "cómo se usa". Sin nada de esto, esa tarjeta sale en blanco.
      const tieneUso = p.am || p.pm || p.extra || p.uso || (D.cat === 'suplementos' && p.dosis);
      if (!tieneUso) malos.push('  ' + donde + ': nada de am/pm/extra/uso/dosis — "Cómo se usa" ' +
                                'saldría en blanco');

      // Ida y vuelta: el renglón de la compra tiene que devolver este mismo producto.
      const vuelta = O.deTextoCompra(O.textoCompra(p));
      if (!vuelta || vuelta.id !== p.id)
        malos.push('  ' + donde + ': `deTextoCompra(textoCompra(p))` no lo devuelve — ' +
                   'el botón "Qué es" quedaría muerto');
    });

    // Y que la lista de la compra siga saliendo de aquí, no de una copia.
    const enLista = C.LISTA_COMPRAS[D.cat];
    const textos = Array.isArray(enLista)
      ? enLista
      : Object.keys(enLista || {}).reduce(function (a, g) { return a.concat(enLista[g]); }, []);
    const sinProducto = textos.filter(function (t) { return !O.deTextoCompra(t); });
    // Cabello lleva a propósito 1 renglón que no es un producto de mostrador (el
    // minoxidil oral): ese no tiene ficha y no debe tener botón.
    const permitidos = D.cat === 'cabello' ? 1 : 0;
    if (sinProducto.length > permitidos)
      malos.push('  ' + D.cat + ': ' + sinProducto.length + ' renglones de la lista sin producto ' +
                 'detrás (se permitían ' + permitidos + '): ' + sinProducto.slice(0, 2).join(' / '));
  });

  if (malos.length)
    problemas.push('Las fichas de producto est\u00e1n incompletas:\n' + malos.slice(0, 16).join('\n'));
  else
    ok.push('Fichas de producto completas (' + total + ' en 5 categorías, ' + conFoto +
            ' con foto y ' + (total - conFoto) + ' dibujados, ida y vuelta con la lista)');
})();

/* ── 16. La biblioteca ───────────────────────────────────────────────
   Los 44 libros van aparte del control 15 porque su ficha NO tiene los mismos campos:
   de un libro no interesa el activo ni cómo se aplica, sino de qué trata y qué dice.

   Lo que se vigila, además de que no falte texto:
     1. Que `deTextoCompra(textoCompra(p))` siga siendo la vuelta, como en las otras
        categorías: si dejan de ser inversas, el botón no encuentra el libro y al
        pulsarlo no pasa nada, sin error en consola.
     2. Que el año y las páginas sean plausibles. Esto no es una manía: los datos vienen
        de Open Library y los dos libros de Hormozi llegaron con el año y las páginas de
        "Roughing It" de Mark Twain — 1872 y 558 páginas — porque era lo que devolvía la
        búsqueda. Se vio mirando la ficha, no leyendo el JSON.
     3. Que la portada, si la hay, sea de Open Library, y que el que no la tenga traiga
        con qué dibujarse. */
(function biblioteca() {
  if (!global.window || !global.window.CIFRAS) return;   // el control 4 ya avisó
  const C = global.window.CIFRAS, B = C.BIBLIOTECA;
  if (!B) { problemas.push('BIBLIOTECA no existe en el maestro'); return; }
  const CAMPOS = { sobre: 60, resumen: 200, porQue: 40, idea: 30, cuando: 15 };
  const malos = [];
  let conPortada = 0, enCoach = 0;
  const ids = {};

  B.todos.forEach(function (l) {
    const donde = 'libros.' + (l.id || '?');
    if (ids[l.id]) malos.push('  ' + donde + ': id repetido');
    ids[l.id] = 1;
    if (!l.t || !l.a) { malos.push('  ' + donde + ': le falta título o autor'); return; }
    if (!l.ficha) { malos.push('  ' + donde + ': sin `ficha`'); return; }
    Object.keys(CAMPOS).forEach(function (k) {
      const v = l.ficha[k];
      if (!v || String(v).trim().length < CAMPOS[k])
        malos.push('  ' + donde + '.ficha.' + k + ': falta o no llega a ' + CAMPOS[k] + ' caracteres');
    });

    // Datos duros plausibles. Aquí está el control que de verdad importa: los dos
    // libros de Hormozi llegaron con el año y las páginas de "Roughing It" de Mark
    // Twain porque era lo que devolvía la búsqueda, y 1872 es un año perfectamente
    // plausible para un libro cualquiera. Lo que lo delata es el CONTEXTO: en esta
    // lista todo es negocio, finanzas o software moderno, y el único anterior a 1900
    // es Meditaciones. Cualquier otro con fecha antigua es un registro equivocado.
    const hoy = new Date().getFullYear();
    const ANTIGUOS = ['meditaciones'];   // los que SÍ pueden ser anteriores a 1900
    if (!l.anio || l.anio < 100 || l.anio > hoy)
      malos.push('  ' + donde + ': año "' + l.anio + '" no es plausible');
    else if (l.anio < 1900 && ANTIGUOS.indexOf(l.id) === -1)
      malos.push('  ' + donde + ': año ' + l.anio + ' — en esta lista solo ' +
                 ANTIGUOS.join('/') + ' es anterior a 1900, así que este dato viene ' +
                 'del registro equivocado de Open Library');
    if (!l.pags || l.pags < 80 || l.pags > 1200)
      malos.push('  ' + donde + ': ' + l.pags + ' páginas no es plausible');

    if (l.portada) {
      conPortada++;
      if (!/^https:\/\/covers\.openlibrary\.org\//.test(l.portada))
        malos.push('  ' + donde + ': la portada no es de Open Library');
    } else if (!l.frasco || !l.marca) {
      malos.push('  ' + donde + ': sin portada Y sin `frasco`/`marca` — su ficha abriría ' +
                 'con el hueco de la imagen vacío');
    }

    const vuelta = B.deTextoCompra(B.textoCompra(l));
    if (!vuelta || vuelta.id !== l.id)
      malos.push('  ' + donde + ': `deTextoCompra(textoCompra(l))` no lo devuelve — ' +
                 'el botón "Qué es" quedaría muerto');
  });

  // Y que la lista de la compra siga saliendo de aquí.
  const enLista = C.LISTA_COMPRAS.libros;
  const textos = Object.keys(enLista || {}).reduce(function (a, g) { return a.concat(enLista[g]); }, []);
  if (textos.length !== B.todos.length)
    malos.push('  la lista tiene ' + textos.length + ' libros y BIBLIOTECA ' + B.todos.length +
               ': dejó de derivarse');
  textos.forEach(function (t) {
    if (!B.deTextoCompra(t)) malos.push('  "' + t + '" en la lista no corresponde a ningún libro');
  });

  // Y los libros que nombra Coach, que son 58 menciones de 43 t\u00edtulos. Su script
  // los busca con `porTitulo` y le pone el bot\u00f3n al que encuentra; al que no,
  // nada \u2014 se queda sin ficha y sin que se note, porque el aviso va a la consola.
  // El t\u00edtulo puede estar en otro idioma que en la lista de la compra: para eso
  // est\u00e1 `alias`, y esto comprueba que sigue cubriendo todos los casos.
  try {
    const coach = fs.readFileSync(path.join(__dirname, '..', 'Coach', 'Coach.html'), 'utf8');
    const re = /<span class="recurso-tipo r-libro">Libro<\/span><div><strong>(.*?)<\/strong>/g;
    const sin = [];
    let m, n = 0;
    while ((m = re.exec(coach))) {
      n++;
      if (!B.porTitulo(m[1].trim())) sin.push(m[1].trim());
    }
    if (sin.length)
      malos.push('  Coach nombra ' + sin.length + ' libro(s) que no est\u00e1n en BIBLIOTECA, ' +
                 'as\u00ed que se quedan sin ficha: ' + [...new Set(sin)].slice(0, 4).join(' / ') +
                 ' \u2014 a\u00f1\u00e1delos, o pon el t\u00edtulo en el `alias` del que ya existe');
    else if (n) enCoach = n;
  } catch (e) { avisos.push('No pude leer Coach.html para comprobar sus libros'); }

  if (malos.length)
    problemas.push('La biblioteca est\u00e1 incompleta:\n' + malos.slice(0, 14).join('\n'));
  else
    ok.push('Biblioteca completa (' + B.todos.length + ' libros en ' + B.grupos.length +
            ' grupos, ' + conPortada + ' con portada y ' + (B.todos.length - conPortada) +
            ' dibujados' + (enCoach ? ', y las ' + enCoach + ' menciones de Coach ' +
            'apuntan a una ficha' : '') + ')');
})();

/* ── 17. Los productos que nombran las otras apps ────────────────────────
   El botón "Qué es" no está escrito en el HTML de esas apps: `pfEnlazar` recorre sus
   listas y se lo pone al que encuentra en el maestro. Eso es cómodo y tiene un riesgo:
   al que NO encuentra, no le pone nada, y no falla — simplemente se queda sin ficha.

   Las listas que se pintan desde el maestro no pueden desincronizarse. La que sí es la
   de la **guía dental** de cuidadopersonal.html, escrita a mano, que llama a las cosas
   por otro nombre ("Hilo o seda dental" por "Hilo dental"). Esos nombres se declaran en
   el `alias` del producto, y aquí se comprueba que siguen resolviendo.

   Los nombres de esa guía son CONDICIONALES según el perfil dental de Adán, así que se
   sacan todos los literales del bloque y se exige que cada uno tenga ficha o esté
   declarado como sin ella. */
(function productosEnOtrasApps() {
  if (!global.window || !global.window.CIFRAS) return;
  const C = global.window.CIFRAS;
  const K = C.KIT_HIGIENE;
  if (!K) return;

  // Lo que la guía dental ofrece y NO es un producto del kit: no tiene ficha ni debe
  // tenerla, y por eso no se le exige. Declarado, para que añadir uno nuevo cante.
  const SIN_FICHA = ['Cera ortodóntica', 'Limpiador de alineadores',
                     'Guarda/placa nocturna (a la medida con tu dentista)'];
  const norm = function (x) {
    return String(x).toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
  };
  const porNombre = function (t) {
    const q = norm(t);
    return K.todos.filter(function (p) {
      return norm(p.n) === q || (p.alias || []).some(function (a) { return norm(a) === q; });
    })[0] || null;
  };

  const malos = [];
  let mirados = 0;
  try {
    const cp = fs.readFileSync(
      path.join(__dirname, '..', 'CuidadoPersonal', 'cuidadopersonal.html'), 'utf8');
    const ini = cp.indexOf('// Lista de compras');
    const fin = cp.indexOf('de-shop-name', ini);
    if (ini < 0 || fin < 0) {
      avisos.push('No encontré la lista de compras de la guía dental para comprobarla');
    } else {
      const bloque = cp.slice(ini, fin);
      // Cada entrada es `{ico:'..',n:<lo que sea>,cat:'..'}`. Solo interesa lo que hay
      // entre `n:` y `,cat:`, porque `cat:` es la frase de la guía, no un producto.
      // Y ese `n:` puede ser un ternario con dos nombres según el perfil dental, asi
      // que se sacan todos los literales de ese tramo y se descartan los que son
      // valores de comparación ('brackets', 'alineadores'): minusculas sin espacios.
      const vistos = {};
      let m;
      const re = /n:(.*?),cat:/g;
      while ((m = re.exec(bloque))) {
        const lit = m[1].match(/'([^']+)'/g) || [];
        lit.forEach(function (crudo) {
          const t = crudo.slice(1, -1);
          if (vistos[t] || !/[A-ZÁÉÍÓÚÑ ]/.test(t)) return;
          vistos[t] = 1;
          mirados++;
          if (!porNombre(t) && SIN_FICHA.indexOf(t) === -1)
            malos.push('  la guía dental ofrece "' + t + '" y no hay ningún producto del kit ' +
                       'con ese nombre — se queda sin botón. Añádelo al `alias` del que ya ' +
                       'existe, o déjalo declarado como sin ficha');
        });
      }
    }
  } catch (e) { avisos.push('No pude leer cuidadopersonal.html para comprobar sus productos'); }

  // Y que las apps que cargan la ficha la carguen ENTERA: sin el css o sin el js,
  // el botón no aparece o aparece sin estilo, y no hay error en consola.
  [['CuidadoPersonal', 'cuidadopersonal.html'], ['CuidadoPersonal', 'salud.html'],
   ['Coach', 'Coach.html']].forEach(function (a) {
    try {
      const h = fs.readFileSync(path.join(__dirname, '..', a[0], a[1]), 'utf8');
      // La ETIQUETA, no la palabra: "ficha.js" también aparece en el comentario que
      // explica de dónde sale el molde, y eso no carga nada.
      if (!/<script src="[^"]*ficha\.js"><\/script>/.test(h))
        malos.push('  ' + a[1] + ' no carga ficha.js');
      else if (!/<link[^>]+href="[^"]*ficha\.css"/.test(h))
        malos.push('  ' + a[1] + ' carga ficha.js pero no ficha.css');
      else if (h.indexOf('id="pfFondo"') === -1) malos.push('  ' + a[1] + ' carga la ficha pero le falta el hueco `pfFondo`');
    } catch (e) { avisos.push('No pude leer ' + a[1]); }
  });

  if (malos.length)
    problemas.push('Productos nombrados fuera de la lista de la compra:\n' + malos.slice(0, 10).join('\n'));
  else
    ok.push('Las otras apps enlazan a la ficha (guía dental: ' + mirados +
            ' productos comprobados; 3 apps cargan ficha.css + ficha.js)');
})();

/* ── 18. Los recursos de las rutas de habilidad ─────────────────────────
   Hasta el 2026-09-02 el campo `r` de cada paso era una cadena suelta y el bloque
   "Con qué" pintaba un emoji de libro delante, fuera lo que fuera: un podcast, el
   portal del SAT o el propio calendario de Adán salían igual, y ninguno llevaba a
   ninguna parte.

   Ahora cada recurso dice de qué tipo es y cómo se llega:
     {t:'libro', id:'...'}                    → abre su ficha
     {t:'web'|'yt'|'podcast'|..., url:'...'}  → se abre en otra pestaña
     {t:'propio', n:'...'}                    → algo suyo, no hay nada que enlazar

   Lo que se vigila: que ningún libro apunte a un id inexistente, que todo lo que
   no sea `propio` tenga URL, y que un libro NO vuelva a traer su título escrito —
   ese sale de BIBLIOTECA y repetirlo aquí es el segundo sitio de siempre. */
(function recursosDeHabilidad() {
  if (!global.window || !global.window.CIFRAS) return;
  const C = global.window.CIFRAS, A = C.APRENDIZAJE, B = C.BIBLIOTECA;
  if (!A || !B) return;
  const TIPOS = ['libro', 'yt', 'podcast', 'curso', 'web', 'repo', 'practica', 'empleo', 'propio'];
  const malos = [];
  let n = 0, libros = 0, conUrl = 0;

  const mira = function (donde, r) {
    if (!r) return;
    if (!Array.isArray(r)) {
      malos.push('  ' + donde + ': el recurso sigue siendo una cadena, no lleva tipo');
      return;
    }
    r.forEach(function (x) {
      n++;
      if (TIPOS.indexOf(x.t) === -1) {
        malos.push('  ' + donde + ': tipo "' + x.t + '" desconocido (se pintaría como web)');
        return;
      }
      if (x.t === 'libro') {
        libros++;
        const l = B.todos.filter(function (y) { return y.id === x.id; })[0];
        if (!l) malos.push('  ' + donde + ': el libro "' + x.id + '" no está en BIBLIOTECA — ' +
                           'saldría sin ficha y sin título');
        else if (x.n) malos.push('  ' + donde + ': el libro "' + x.id + '" trae su título escrito ' +
                                 'además del id — el título sale de BIBLIOTECA, quítalo de aquí');
      } else if (x.t === 'propio') {
        if (!x.n) malos.push('  ' + donde + ': un recurso `propio` sin nombre');
        if (x.url) malos.push('  ' + donde + ': "' + x.n + '" es `propio` y trae URL — ' +
                              'si tiene enlace no es suyo, cambia el tipo');
      } else {
        if (!x.n) malos.push('  ' + donde + ': un recurso de tipo ' + x.t + ' sin nombre');
        if (!x.url) malos.push('  ' + donde + ': "' + x.n + '" no tiene URL — dice qué es pero ' +
                               'no lleva a ninguna parte');
        else { conUrl++;
          if (!/^https:\/\//.test(x.url))
            malos.push('  ' + donde + ': "' + x.n + '" tiene una URL que no es https'); }
      }
    });
  };

  Object.keys(A).forEach(function (h) {
    (A[h].subs || []).forEach(function (p, i) { mira('aprendizaje.' + h + '.paso' + (i + 1), p.r); });
    mira('aprendizaje.' + h + '.recursos', A[h].recursos);
  });

  if (malos.length)
    problemas.push('Los recursos de las rutas est\u00e1n incompletos:\n' + malos.slice(0, 12).join('\n'));
  else
    ok.push('Recursos de las rutas completos (' + n + ' en ' + Object.keys(A).length +
            ' habilidades: ' + libros + ' libros con ficha y ' + conUrl + ' con enlace)');
})();

// ── Salida ──
if (process.argv.indexOf('--hook') !== -1) {
  const partes = [];
  if (problemas.length)
    partes.push('DATOS DESINCRONIZADOS (' + problemas.length + ')\n\n' + problemas.join('\n\n') +
      '\n\nDetalle: node Dashboard/verificar-sincronia.js');
  const imp = impactoDelCambio();
  if (imp) partes.push(imp);
  if (partes.length) process.stdout.write(JSON.stringify({ systemMessage: partes.join('\n\n────────\n\n') }));
  process.exit(0);   // el hook informa, no bloquea
}

console.log('\nVERIFICAR SINCRONÍA — ' + new Date().toISOString().slice(0, 10));
console.log('='.repeat(70));
if (ok.length) { console.log('\nOK'); ok.forEach(l => console.log('  ✔ ' + l)); }
if (avisos.length) { console.log('\nAVISOS (no está roto, pero es deuda pendiente)'); avisos.forEach(l => console.log('  ! ' + l)); }
if (problemas.length) { console.log('\nDESINCRONIZADO'); problemas.forEach(l => console.log('  ✘ ' + l)); }
else console.log('\nNada desincronizado.');
const _imp = impactoDelCambio();
if (_imp) { console.log(''); console.log(_imp); }
console.log('');
process.exit(problemas.length ? 1 : 0);
