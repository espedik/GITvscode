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

/* ── 15. La ficha de cada producto de skincare ─────────────────────────
   El botón "Qué es" de la lista de la compra abre una ficha que se arma entera desde
   `RUTINA_PIEL`: el dashboard no guarda ni una línea de ese texto. Eso deja dos formas
   de romperla en silencio, y las dos se comprueban aquí:

     1. Un producto nuevo sin `ficha` — o con un campo vacío — sale en la lista con su
        botón y abre una ficha a medias, sin que nada avise.
     2. El renglón de la compra se arma con `textoCompra` y se deshace con
        `deTextoCompra`. Si alguna vez dejan de ser inversas (alguien vuelve a escribir el
        texto a mano en el getter, por ejemplo) el botón deja de encontrar el producto y
        no hace nada al pulsarlo: ningún error en consola, solo un botón muerto.

   También comprueba que cada producto trae con qué pintarse — `envase` conocido y los
   dos colores —, porque cuatro de los seis no tienen foto y se dibujan. */
(function fichaSkincare() {
  if (!global.window || !global.window.CIFRAS) return;   // el control 4 ya avisó
  const C = global.window.CIFRAS;
  const RP = C.RUTINA_PIEL;
  if (!RP) return;                                       // el control 11 ya avisó
  const CAMPOS = ['activo', 'que', 'hace', 'sirve', 'tarda', 'ojo'];
  const ENVASES = ['bomba', 'gotero', 'tubo', 'tarro', 'bote'];
  const malos = [];
  let conFoto = 0;

  RP.productos.forEach(function (p) {
    const f = p.ficha;
    if (!f) { malos.push('  ' + p.id + ': sin `ficha` — su botón abriría una ficha vacía'); return; }
    CAMPOS.forEach(function (k) {
      if (!f[k] || String(f[k]).trim().length < 20)
        malos.push('  ' + p.id + '.ficha.' + k + ': falta o es demasiado corto');
    });
    // Con qué se dibuja cuando no hay foto.
    if (ENVASES.indexOf(p.envase) === -1)
      malos.push('  ' + p.id + ': envase "' + p.envase + '" no está entre ' + ENVASES.join('/'));
    if (!p.marca || !/^#[0-9a-f]{6}$/i.test(p.marca.a || '') || !/^#[0-9a-f]{6}$/i.test(p.marca.b || ''))
      malos.push('  ' + p.id + ': `marca` necesita dos colores en hex');
    if (p.foto) conFoto++;

    // El "cómo se aplica" lo lee la ficha de la rutina: si un producto no tiene
    // ningún momento, esa tarjeta sale vacía.
    if (!p.am && !p.pm && !p.extra)
      malos.push('  ' + p.id + ': sin am/pm/extra — "Cómo se aplica" saldría en blanco');

    // Ida y vuelta: el renglón de la compra tiene que devolver este mismo producto.
    const vuelta = RP.deTextoCompra(RP.textoCompra(p));
    if (!vuelta || vuelta.id !== p.id)
      malos.push('  ' + p.id + ': `deTextoCompra(textoCompra(p))` no devuelve el producto — ' +
                 'el botón "Qué es" quedaría muerto');
  });

  // La lista de la compra tiene que seguir saliendo de la rutina, no de una copia.
  const enLista = C.LISTA_COMPRAS.skincare;
  if (enLista.length !== RP.productos.length)
    malos.push('  la lista de la compra tiene ' + enLista.length + ' productos y la rutina ' +
               RP.productos.length + ': dejó de derivarse');
  enLista.forEach(function (txt) {
    if (!RP.deTextoCompra(txt))
      malos.push('  "' + txt + '" en la lista no corresponde a ningún producto de la rutina');
  });

  if (malos.length)
    problemas.push('La ficha de skincare está incompleta:\n' + malos.slice(0, 14).join('\n'));
  else
    ok.push('Ficha de skincare completa (' + RP.productos.length + ' productos, ' +
            conFoto + ' con foto y ' + (RP.productos.length - conFoto) + ' dibujados, ' +
            'ida y vuelta con la lista de la compra)');
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
