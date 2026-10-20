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
   5. Que los .md sigan siendo referencia y no diario, y que todo el código que citan exista
      (control 23).
   6. Que toda página cargue el icono de su prompt y que todo prompt esté completo (control 24);
      con --hook, además, recuerda qué prompt gobierna cada página tocada.

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

/* ── Cómo NOMBRA la prosa a cada deuda ──────────────────────────────────────
   Los ids (`d002`) solo viven en el código; los textos dicen "Banamex" o "el BYD". Este mapa es
   el puente, y lo usan dos cosas: el control 22 (afirmaciones contra el saldo vivo) y el aviso
   de "cambió una variable maestra", que con él puede decir EN QUÉ ARCHIVOS se habla de la deuda
   que se acaba de mover, en vez de un genérico "revisa los textos".
   Al añadir una deuda al maestro, añade aquí sus alias: sin ellos, nadie vigila lo que se diga
   de ella. Un alias de más solo hace mirar una frase extra; uno de menos deja un punto ciego. */
const ALIAS_DEUDA = {
  d001: ['BBVA'],
  d002: ['Banamex'],
  d003: ['BYD', 'automotriz'],
  d004: ['Apple Watch'],
  d008: ['iPhone'],
  d009: ['Zap Stylo'],
};
/* De la variable del catálogo a la deuda que describe — para el aviso del cambio. */
const CLAVE_DEUDA = { tcBbva: 'd001', tcBbvaMin: 'd001', banamex: 'd002', banamexMin: 'd002',
                      autoSaldo: 'd003', autoPago: 'd003', appleWatch: 'd004',
                      iphone: 'd008', zapStylo: 'd009' };
/* Los .md también afirman cosas sobre las deudas, así que entran en el control 22. */
const DOCS_DEUDA = ['Dashboard/DATOS-MAESTROS.md', 'Dashboard/readme_dashboard.md',
                    'Coach/readme_coach.md', 'Finanzas/readme_finanzas.md'];

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
  // 'rutina: {' y no 'rutina:': el primero de ese archivo es la regla CSS #s-rutina::before{…},
  // y con ella el control se quedaba en el aviso de "no se pudo extraer" sin comparar nada.
  const B = evaluar(literal(ejer, 'rutina: {', '{'));
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
  /* Coach GENERA las fases desde CIFRAS.PHASES (pintarFasesPlan): solo la Fase 0, cerrada el
     30 sep 2026, sigue escrita a mano. Antes este control pedía que cada fase apareciera escrita
     en el HTML — y así fue como el texto de Coach y el del maestro se separaron: hablaban de
     $3,145/mes liberados y de la plantilla GBM mucho después de que el plan cambiara.
     Ahora vigila lo contrario: que nadie vuelva a escribir a mano una fase que ya vive aquí,
     ni sus fechas en el JS de Coach. */
  const P = evaluar(literal(maestro, 'const PHASES = [', '['));
  if (P) {
    const malos = [];
    if (coach.indexOf('function pintarFasesPlan') < 0 || coach.indexOf('id="fasesPlan"') < 0 || coach.indexOf('id="planStepper"') < 0)
      malos.push('     Coach ya no genera las fases (falta pintarFasesPlan, #fasesPlan o #planStepper)');
    const escritas = [...coach.matchAll(/class="fase-tag">([^<'+]+)</g)].map(m => m[1].trim());   // sin la plantilla JS del generador
    const aMano = escritas.filter(t => t.indexOf(P[0].tag) !== 0);
    if (aMano.length) malos.push('     fases escritas a mano en Coach (se generan del maestro): ' + aMano.join(' | '));
    if (!escritas.some(t => t.indexOf(P[0].tag) === 0)) malos.push('     la ' + P[0].tag + ' ya no está en el HTML de Coach');
    const ids = P.slice(1).flatMap(f => (f.semanas || []).map(s => s.id));
    const copiadas = ids.filter(id => coach.indexOf('id="' + id + '"') >= 0);
    if (copiadas.length) malos.push('     tareas de fase copiadas en el HTML de Coach: ' + copiadas.join(', '));
    if (/id:\s*'fase\d'\s*,\s*num:/.test(coach)) malos.push('     Coach vuelve a declarar las fechas de las fases en su JS');
    if (malos.length) problemas.push('Las fases de Coach dejaron de salir del maestro:\n' + malos.join('\n'));
    else ok.push('PHASES — Coach genera del maestro las ' + (P.length - 1) + ' fases a partir de la ' + P[1].tag + '; solo la ' + P[0].tag + ' sigue escrita a mano');
  } else problemas.push('PHASES: no se pudo evaluar desde el maestro');

  /* El aprendizaje también se genera (pintarAprendizaje, 3-oct-2026): antes eran 6 tarjetas a mano
     con niveles viejos. Se vigila que siga generado, que ninguna ruta vuelva a escribirse a mano y
     que las 12 tengan lo que pide su prompt —nivel con evidencia, por qué ahora, con qué se
     demuestra, el paso de la semana y dónde se practica— y su ruta paso a paso. El plan de foco
     (HAB_FOCO) nombra habilidades que existen y sus tramos van en orden sin pisarse. */
  const A = evaluar(literal(maestro, 'const APRENDIZAJE = {', '{'));
  const SKm = evaluar(literal(maestro, 'const SK = [', '['));
  const FOCO = evaluar(literal(maestro, 'const HAB_FOCO = [', '['));
  if (A && SKm && FOCO) {
    const malos = [];
    if (coach.indexOf('function pintarAprendizaje') < 0 || coach.indexOf('id="aprendizajePlan"') < 0)
      malos.push('     Coach ya no genera el aprendizaje (falta pintarAprendizaje o #aprendizajePlan)');
    const aMano = (coach.match(/<span class="subhab-t">[^<'+]+<\/span>/g) || []).length;
    if (aMano) malos.push('     ' + aMano + ' pasos de ruta escritos a mano en Coach (salen de APRENDIZAJE)');
    SKm.forEach(function (s) {
      ['desc', 'porQue', 'prueba', 'practica'].forEach(function (k) { if (!s[k]) malos.push('     ' + s.id + ': le falta `' + k + '`'); });
      if (!s.mant || !s.mant.txt) malos.push('     ' + s.id + ': le falta `mant`, el paso de la semana en mantenimiento');
      if (!A[s.id] || !(A[s.id].subs || []).length) malos.push('     ' + s.id + ': sin ruta paso a paso en APRENDIZAJE');
    });
    FOCO.forEach(function (t, i) {
      if (!SKm.some(s => s.id === t.id)) malos.push('     HAB_FOCO: "' + t.id + '" no es una habilidad');
      if (!(t.desde <= t.hasta)) malos.push('     HAB_FOCO: el tramo de ' + t.id + ' termina antes de empezar');
      if (i && !(FOCO[i - 1].hasta < t.desde)) malos.push('     HAB_FOCO: el tramo de ' + t.id + ' pisa al anterior');
      if (!t.horas || !t.semana || !t.entregable || !t.cambio) malos.push('     HAB_FOCO: al tramo de ' + t.id + ' le falta horas, semana, entregable o cambio');
    });
    if (malos.length) problemas.push('El aprendizaje dejó de salir del maestro o de cumplir su prompt:\n' + malos.join('\n'));
    else ok.push('APRENDIZAJE — Coach genera del maestro las ' + SKm.length + ' habilidades, todas con su evidencia, su prueba y su ruta paso a paso; el plan de foco tiene ' + FOCO.length + ' tramos en orden');
  } else problemas.push('APRENDIZAJE, SK o HAB_FOCO: no se pudieron evaluar desde el maestro');
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
    // "$0" es el saldo de cualquier deuda pagada: por su cifra no se puede saber de cuál habla.
    if (v && v.charAt(0) === '$' && v !== '$0') VARS[v.slice(1)] = k;     // "$293,000" → "293,000"
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
    '$15,000–',                                    // rangos de costos del catálogo de negocios de Coach, no la BBVA
    'más que $15,000 parados',                     // el ejemplo de rotación de ese mismo catálogo
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
  // 3000, 5000 y 10000 (el aporte a la casa y lo que aparta Didi) son también tiempos en ms, escalas
  // de gráficas y precios sueltos: esas variables se vigilan por su marcador, no por su número.
  const AMBIGUOS = ['1500', '3000', '4000', '5000', '10000', '15000'];   // dosis de vitaminas, cuotas de ahorro, precios sueltos, la inversión de los negocios de Coach
  const hallazgos = [];
  for (const [rel, src] of APPS.concat([['Dashboard/datos-maestros.js', maestro]])) {
    const limpio = sinComentarios(src);
    /* En el maestro, SALIDA y los SUPUESTOS de la proyección son DATOS del plan —lo que cuesta
       irse, la foto del 1 oct 2026— y no copias de una variable: que la foto del auto valga hoy
       lo mismo que `autoSaldo` es una coincidencia que dura hasta el siguiente pago. */
    const plan0 = rel === 'Dashboard/datos-maestros.js' ? limpio.indexOf('const SALIDA = {') : -1;
    const plan1 = plan0 >= 0 ? limpio.indexOf('const PROYECCION =', plan0) : -1;
    for (const [val, k] of Object.entries(VALS)) {
      if (AMBIGUOS.indexOf(val) !== -1) continue;
      const re = new RegExp('(?<![\\$\\d.,])' + val + '(?![\\d.,]|px|%|ms|em)', 'g');
      let m;
      while ((m = re.exec(limpio)) !== null) {
        const antes = limpio.slice(Math.max(0, m.index - 90), m.index);
        if (plan0 >= 0 && m.index > plan0 && m.index < plan1) continue;                // datos del plan (SALIDA, SUPUESTOS)
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
                         'claudeCode', 'icloud', 'cetesDia15', 'aporteCasa'];
  const textoCobros = (C.CALENDARIO.cobros || []).map(function (c) { return String(c.txt).toLowerCase(); }).join(' | ');
  const APODO = { celular: 'plan de datos', luzAgua: 'luz y agua', cetesDia15: 'cetes',
                  claudeCode: 'claude code', icloud: 'icloud', aporteCasa: 'aporte a tu familia' };
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
    // El desglose del sueldo (`desgloseMes`) suma cada cobro en su `grupo`: sin uno de la lista, ese
    // dinero no saldría en ningún renglón y el gasto personal quedaría inflado.
    const GR = (C.GRUPOS_SUELDO || []).map(g => g[0]);
    if (GR.indexOf(c.grupo) === -1) malos.push('     cobro "' + c.txt + '" sin `grupo` del desglose (' + GR.join(', ') + ')');
    if (c.ahorro && c.grupo !== 'ahorro') malos.push('     cobro "' + c.txt + '" con `ahorro: true` fuera del grupo ahorro');
  });
  (CAL && CAL.hitos || []).forEach(function (h) {
    if (!esFecha(h.fecha)) malos.push('     hito "' + h.txt + '" con fecha inválida: ' + h.fecha);
  });

  // f) Las fechas sueltas de PROYECTO.
  ['entrevistaWayve','maestriaInicio','inicioCenlex','maestriaDecision'].forEach(function (k) {
    if (!esFecha(P[k])) malos.push('     PROYECTO.' + k + ' no es una fecha YYYY-MM-DD: ' + P[k]);
  });
  if (!/^\d{4}-\d{2}$/.test(P.rentaHasta || '')) malos.push('     PROYECTO.rentaHasta no es un mes AAAA-MM: ' + P.rentaHasta);

  // g) Las fases no se solapan ni dejan huecos.
  (C.PHASES || []).forEach(function (f, i) {
    if (f.end < f.start) malos.push('     ' + f.tag + ' termina antes de empezar');
    if (i > 0) {
      const hueco = Math.round((f.start - C.PHASES[i-1].end) / 86400000);
      if (hueco < 1) malos.push('     ' + C.PHASES[i-1].tag + ' y ' + f.tag + ' se solapan');
      if (hueco > 1) malos.push('     hueco de ' + hueco + ' días entre ' + C.PHASES[i-1].tag + ' y ' + f.tag);
    }
  });
  const idsFase = (C.PHASES || []).flatMap(f => (f.semanas || []).map(s => s.id));
  const repetidos = idsFase.filter((id, k) => idsFase.indexOf(id) !== k);
  if (repetidos.length) malos.push('     ids de tarea repetidos entre fases (pisan coach_checks_v1): ' + repetidos.join(', '));
  (C.PHASES || []).forEach(function (f) {
    if (f.liquido != null && typeof f.liquido !== 'number') malos.push('     ' + f.tag + ': `liquido` no es un número');
  });
  // La maestría marca dos bordes del plan: una fase arranca el día que empieza y la decisión cae
  // dentro de la fase anterior. Mover PROYECTO.maestriaInicio sin mover las fases sale aquí.
  if (esFecha(P.maestriaInicio) && (C.PHASES || []).length) {
    const ini = new Date(P.maestriaInicio + 'T00:00:00'), dec = new Date(P.maestriaDecision + 'T00:00:00');
    const k = C.PHASES.findIndex(f => f.start.getTime() === ini.getTime());
    if (k < 0) malos.push('     ninguna fase arranca el ' + P.maestriaInicio + ' (PROYECTO.maestriaInicio)');
    else if (!(k > 0 && dec >= C.PHASES[k - 1].start && dec <= C.PHASES[k - 1].end))
      malos.push('     la decisión de la maestría (' + P.maestriaDecision + ') no cae en la fase anterior a su arranque');
  }

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
  // `diasCondicionales` quedan fuera: son los días en que el champú depende de algo y va en
  // otra tarea, no en la ducha de la mañana.
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

/* ── El peso: lo que salud.html lee del maestro tiene que existir ────────────────────────────
   `PESO` estuvo documentado en readme_salud.md y en DATOS-MAESTROS.md del 2 al 13 de sep de 2026
   sin haber llegado nunca a datos-maestros.js: la app caía a su respaldo y enseñaba "configura tu
   meta" mientras los .md juraban lo contrario. Este control lee del HTML qué campos de CIFRAS.PESO
   usa salud.html y exige que el maestro los tenga, con la forma que la app espera. */
(function pesoEnElMaestro() {
  if (!global.window || !global.window.CIFRAS) return;
  const C = global.window.CIFRAS, PE = C.PESO;
  const html = leer('CuidadoPersonal/salud.html');
  if (!html) return;
  const usados = {};
  // salud.html lo lee directo (CIFRAS.PESO.x) y con el alias `const MP=CIFRAS.PESO` de init().
  html.replace(/CIFRAS\.PESO\.([A-Za-z]+)|\bMP\.([A-Za-z]+)/g, function (_, a, b) { usados[a || b] = true; return _; });
  const malos = [];
  if (!PE) malos.push('     CIFRAS.PESO no existe — salud.html lo pide (' + Object.keys(usados).join(', ') + ')');
  else {
    Object.keys(usados).forEach(function (k) { if (!(k in PE)) malos.push('     salud.html lee CIFRAS.PESO.' + k + ' y el maestro no lo tiene'); });
    if (!(PE.alturaCm > 100)) malos.push('     PESO.alturaCm tiene que ir en centímetros (' + PE.alturaCm + ')');
    if (!(PE.metaKg > 0)) malos.push('     PESO.metaKg vacío');
    if (!Array.isArray(PE.registros) || !PE.registros.length) malos.push('     PESO.registros sin pesajes');
    else PE.registros.forEach(function (r) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(r.fecha || '') || !(r.kg > 0)) malos.push('     Pesaje sin fecha ISO o sin kg: ' + JSON.stringify(r));
    });
    if (!(C.PROYECTO && /^\d{4}-\d{2}-\d{2}$/.test(C.PROYECTO.nacimiento || ''))) malos.push('     PROYECTO.nacimiento falta o no es ISO — de ahí sale la edad del IMC por edad');
  }
  if (malos.length) problemas.push('El peso que salud.html espera no está en el maestro:\n' + malos.join('\n'));
  else ok.push('PESO en el maestro (' + PE.registros.length + ' pesajes, último ' + PE.actualKg + ' kg → IMC ' + PE.imc +
    ', meta ' + PE.metaKg + ' kg, ' + Object.keys(usados).length + ' campos que lee salud.html)');
})();

/* ── El Bitcoin: BTC_SEED tiene forma y Finanzas lo lee de aquí ──────────────────────────────
   Las operaciones de BTC entraron al maestro el 2026-09-16 con la primera venta. Lo que puede
   volver a romperse: una venta con `btc` positivo (sumaría en vez de restar), una compra con
   `tipo:'venta'` olvidado, más ₿ vendidos de los que había ese día, un id repetido (la migración
   añade por id y lo saltaría), o que Finanzas.html vuelva a traer su propia lista. */
(function bitcoinEnElMaestro() {
  if (!global.window || !global.window.CIFRAS) return;
  const B = global.window.CIFRAS.BTC_SEED;
  const malos = [];
  if (!Array.isArray(B) || !B.length) { problemas.push('CIFRAS.BTC_SEED no existe o está vacío'); return; }
  const vistos = {}; let saldo = 0;
  B.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; }).forEach(function (o) {
    if (vistos[o.id]) malos.push('     id repetido en BTC_SEED: ' + o.id);
    vistos[o.id] = 1;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(o.date || '')) malos.push('     ' + o.id + ' sin fecha ISO');
    if (!(o.usd > 0) || !(o.btcPrice > 0) || typeof o.btc !== 'number') malos.push('     ' + o.id + ' sin usd, btcPrice o btc numéricos');
    const venta = o.tipo === 'venta';
    if (venta && !(o.btc < 0)) malos.push('     ' + o.id + ' es venta y su btc no es negativo (' + o.btc + ')');
    if (!venta && !(o.btc > 0)) malos.push('     ' + o.id + ' es compra y su btc no es positivo (' + o.btc + ')');
    if (Math.abs(Math.abs(o.btc) - o.usd / o.btcPrice) > 0.00002) malos.push('     ' + o.id + ': usd/btcPrice da ' + (o.usd / o.btcPrice).toFixed(6) + ' ₿ y trae ' + o.btc);
    saldo += o.btc;
    if (saldo < -1e-9) malos.push('     ' + o.id + ' vende más ₿ de los que había ese día (saldo ' + saldo.toFixed(6) + ')');
  });
  const fin = leer('Finanzas/Finanzas.html');
  if (fin.indexOf('CIFRAS.BTC_SEED') < 0) malos.push('     Finanzas.html no lee CIFRAS.BTC_SEED');
  if (/btcHistory:\s*\[\s*\{/.test(fin)) malos.push('     Finanzas.html vuelve a traer su propia lista de compras BTC en el seed');
  if (malos.length) problemas.push('BTC_SEED no tiene la forma que Finanzas espera:\n' + malos.join('\n'));
  else ok.push('BTC_SEED en el maestro (' + B.filter(o => o.tipo !== 'venta').length + ' compras, ' + B.filter(o => o.tipo === 'venta').length +
    ' ventas, quedan ' + saldo.toFixed(6) + ' ₿; Finanzas lo siembra de aquí)');
})();

/* ── Lo que una app guarda y otra lee: la forma tiene que ser la misma ───────────────────────
   Las apps comparten localStorage (mismo origen file://). El 2026-09-01 Ejercicio cambió
   `mirutina_v1.sesiones` de lista a objeto por fecha y el Dashboard siguió haciendo `.find` sobre
   él: Mi Día tronaba en cuanto se marcaba una serie, y ningún control lo veía porque ninguna
   cifra del maestro cambia. Aquí se vigila el contrato: el Dashboard solo toca `sesiones` a
   través de gymSesiones(), y Ejercicio sigue guardándolo como objeto. */
(function contratoGym() {
  const dash = leer('Dashboard/dashboard.html'), ej = leer('CuidadoPersonal/ejercicio.html');
  const malos = [];
  const usos = (sinComentarios(dash).match(/D\.gym\.sesiones/g) || []).length;
  if (dash.indexOf('function gymSesiones()') < 0) malos.push('     dashboard.html ya no tiene gymSesiones()');
  else if (usos > 1) malos.push('     dashboard.html lee D.gym.sesiones en ' + usos + ' sitios; solo gymSesiones() debe tocarlo');
  if (!/sesiones:\s*\{\}/.test(ej)) malos.push('     ejercicio.html ya no siembra `sesiones: {}` — si cambió de forma, hay que revisar gymSesiones()');
  if (malos.length) problemas.push('El contrato de mirutina_v1.sesiones entre Ejercicio y el Dashboard se rompió:\n' + malos.join('\n'));
  else ok.push('mirutina_v1.sesiones: Ejercicio lo guarda como objeto y el Dashboard lo lee solo por gymSesiones()');
})();

/* ── La biblioteca de ejercicios: una sola, la de CuidadoPersonal/ejercicios-datos.js ───────────
   Ejercicio y el Dashboard pintan la misma ficha de cada ejercicio. El Dashboard llevaba una copia
   a mano (EJ_LOOKUP) a la que se le desincronizaron las 42 técnicas y 4 imágenes. Aquí se vigila
   que EJ_DB viva solo en su archivo, que las dos páginas lo carguen, que EJ_PESO_INI no vuelva a
   copiar nombre, imagen o técnica, y que cada ejercicio de GYM_RUTINA_DEFAULT exista en la
   biblioteca: si no, su ficha no abre. */
(function bibliotecaEjercicios() {
  const malos = [];
  let datos = null;
  try { datos = leer('CuidadoPersonal/ejercicios-datos.js'); } catch (e) { /* abajo se reporta */ }
  const DB = datos ? evaluar(literal(datos, 'const EJ_DB = ', '[')) : null;
  if (!DB) malos.push('     CuidadoPersonal/ejercicios-datos.js no existe o ya no declara `const EJ_DB = [`');
  const CARGA = [['CuidadoPersonal/ejercicio.html', ejer, '<script src="ejercicios-datos.js"></script>'],
                 ['Dashboard/dashboard.html', dash, '<script src="../CuidadoPersonal/ejercicios-datos.js"></script>']];
  for (const [rel, src, tag] of CARGA) {
    if (/const\s+EJ_DB\s*=/.test(sinComentarios(src))) malos.push('     ' + rel + ' vuelve a declarar EJ_DB — se lee de ejercicios-datos.js');
    if (src.indexOf(tag) < 0) malos.push('     ' + rel + ' no carga la biblioteca: falta ' + tag);
  }
  const PI = evaluar(literal(dash, 'const EJ_PESO_INI=', '{'));
  if (!PI) malos.push('     dashboard.html: no se pudo leer EJ_PESO_INI');
  else {
    const copia = Object.keys(PI).filter(id => Object.keys(PI[id]).some(k => k !== 'pesoIni' && k !== 'porLado'));
    if (copia.length) malos.push('     EJ_PESO_INI vuelve a copiar campos de la biblioteca en: ' + copia.join(', '));
  }
  if (DB) {
    const ids = new Set(DB.map(x => x.id));
    const R = evaluar(literal(dash, 'const GYM_RUTINA_DEFAULT=', '{')) || {};
    const usados = [...new Set(Object.values(R).flatMap(d => (d.ejercicios || []).map(e => e.id)))];
    const faltan = usados.filter(id => !ids.has(id));
    if (faltan.length) malos.push('     GYM_RUTINA_DEFAULT usa ejercicios que no están en EJ_DB: ' + faltan.join(', '));
  }
  if (malos.length) problemas.push('La biblioteca de ejercicios dejó de ser una sola:\n' + malos.join('\n'));
  else ok.push('Biblioteca de ejercicios: EJ_DB vive solo en ejercicios-datos.js, la cargan Ejercicio y el Dashboard, y EJ_PESO_INI solo lleva pesos');
})();

/* ── La salida a Alemania y la proyección del Plan Maestro ──────────────────────────────────
   SALIDA es la lista exhaustiva de lo que hay que reunir antes de septiembre de 2027 y lo que
   cuesta; la PROYECCION, el plan mes a mes del que salen las metas de cada fase. Se vigila que
   las casillas no pisen otras (comparten `coach_checks_v1` con las fases y el resto de Coach),
   que cada cosa tenga mes, que Coach las pinte desde el maestro, y que el plan llegue al millón
   antes del cierre de la última fase: si no llega, la fecha del plan miente. */
(function salidaYProyeccion() {
  if (!global.window || !global.window.CIFRAS) return;
  const C = global.window.CIFRAS, S = C.SALIDA, malos = [];
  if (!S || !C.PROYECCION) { problemas.push('El maestro ya no expone SALIDA o PROYECCION'); return; }
  const ids = S.bloques.flatMap(b => b.items.map(x => x.id));
  const fases = (C.PHASES || []).flatMap(f => (f.semanas || []).map(s => s.id));
  const repetidos = ids.filter((id, k) => ids.indexOf(id) !== k || fases.indexOf(id) !== -1);
  if (repetidos.length) malos.push('     ids de la salida repetidos o iguales a una tarea de fase: ' + repetidos.join(', '));
  const enCoach = ids.filter(id => coach.indexOf('id="' + id + '"') !== -1);
  if (enCoach.length) malos.push('     casillas de la salida escritas a mano en Coach (se generan del maestro): ' + enCoach.join(', '));
  S.bloques.forEach(b => b.items.forEach(x => {
    if (!/^(\d{4}-\d{2}|cont)$/.test(x.cuando || '')) malos.push('     ' + x.id + ': `cuando` no es un mes AAAA-MM ni "cont"');
  }));
  S.costos.forEach(c => {
    if (!/^\d{4}-\d{2}$/.test(c.mes || '')) malos.push('     costo ' + c.id + ': `mes` no es AAAA-MM');
    if (!(c.mxn > 0 || c.eur > 0)) malos.push('     costo ' + c.id + ': sin importe');
  });
  if (coach.indexOf('function pintarSalida') < 0 || coach.indexOf('id="salidaAlemania"') < 0)
    malos.push('     Coach ya no pinta la lista de salida (falta pintarSalida o #salidaAlemania)');
  if (coach.indexOf('function pintarProyeccion') < 0 || coach.indexOf('id="proyeccionPlan"') < 0)
    malos.push('     Coach ya no pinta la proyección (falta pintarProyeccion o #proyeccionPlan)');
  const ultima = C.PHASES[C.PHASES.length - 1];
  const fin = ultima.end.getFullYear() + '-' + String(ultima.end.getMonth() + 1).padStart(2, '0');
  const millon = C.PROYECCION.meses.filter(m => m.liquido >= 1000000)[0];
  if (!millon || millon.mes > fin)
    malos.push('     la proyección no llega al millón antes del cierre de la ' + ultima.tag + ' (' + fin + ')');
  /* El ahorro que pinta el calendario del Dashboard (los cobros con `ahorro`, más lo que aparta
     Didi) tiene que ser el que cuenta la proyección, mes a mes: son la misma promesa en dos
     pantallas. Y ningún mes en México puede dejar el gasto personal en negativo. */
  C.PROYECCION.meses.filter(m => m.desglose).forEach(function (m) {
    const p = m.mes.split('-').map(Number), nDias = new Date(p[0], p[1], 0).getDate();
    let cal = 0;
    for (let d = 1; d <= nDias; d++) C.agendaDia(d, m.mes, C.DEUDAS_SEED).forEach(a => { if (a.ahorro) cal += +a.monto || 0; });
    if (Math.abs(cal - m.desglose.g.ahorro) > 0.5)
      malos.push('     ' + m.mes + ': el calendario aparta $' + Math.round(cal) + ' y la proyección cuenta $' + Math.round(m.desglose.g.ahorro));
    if (m.desglose.g.personal < 0) malos.push('     ' + m.mes + ': el gasto personal queda en negativo ($' + Math.round(m.desglose.g.personal) + ')');
  });
  // La meta de la maestría que siembra Finanzas es lo que cuesta irse, redondeado a miles.
  const metaSeed = (finz.match(/\{id:'g001'[^}]*target:(\d+)/) || [])[1];
  const metaPlan = Math.ceil(C.n('salidaTotal') / 1000) * 1000;
  if (+metaSeed !== metaPlan)
    malos.push('     Finanzas siembra la meta g001 en $' + metaSeed + ' y lo que cuesta irse, redondeado, es $' + metaPlan + ' (súbelo con una migración)');
  /* La comida del plan es la de la lista de compras y las recetas del Dashboard. El 3-oct-2026 el
     plan seguía con $3,500 al mes cuando la lista ya daba $2,783: cada mes de la proyección estaba
     $717 mal. Se recalcula aquí como lo hace ctComida(): cada producto de los pasillos de comida,
     `monto × base` a la semana. */
  try {
    const objeto = nombre => { const m = dash.match(new RegExp('const ' + nombre + '=(\\{[\\s\\S]*?\\n\\});')); return m ? eval('(' + m[1] + ')') : null; };
    const LP = C.PRECIOS_SUPER, LC = C.LISTA_COMPRAS.comida;
    if (!LP || !C.RECETARIO) malos.push('     el maestro no trae PRECIOS_SUPER o RECETARIO para comprobar la comida del plan');
    else {
      let semana = 0;
      Object.keys(LC).forEach(p => LC[p].forEach(n => {
        const x = LP[n];
        if (x) semana += (+x.monto || 0) * (+x.base || 0);
        else malos.push('     ' + n + ' está en la lista de compras sin precio en PRECIOS_SUPER: lo que cuesta comer lo cuenta como $0');
      }));
      const comida = Math.round(semana / 7 * 30.4), desayuno = Math.round(C.RECETARIO.costoDesayuno * 30.4);
      const SU = C.PROYECCION.supuestos;
      if (SU.comida !== comida) malos.push('     SUPUESTOS.comida es $' + SU.comida + ' y la lista de compras da $' + comida + ' al mes: actualízalo y recalcula el ahorro de cada quincena');
      if (SU.comidaEnCasa !== desayuno) malos.push('     SUPUESTOS.comidaEnCasa es $' + SU.comidaEnCasa + ' y tus recetas de desayuno dan $' + desayuno + ' al mes');
    }
  } catch (e) { malos.push('     la comprobación de la comida falló: ' + e.message); }
  /* Cada quincena se sostiene sola (Adán, 5-oct-2026: "eso debe ser cada quincena y deja dinero
     sobrante para la quincena"). En cada quincena de cada mes en México: el sueldo, menos los fijos
     de sus días, la comida de sus días y su parte del gasto personal —las rutinas y el tope de lo
     demás, por día— tiene que alcanzar para lo que manda ese día a GBM o a la BBVA. Si no alcanza es
     un problema; si en el peor mes de su etapa sobran $100 o más, se avisa que cabe mandar más. El
     mínimo de la BBVA que se paga con Didi no cuenta: no sale del sueldo. */
  const SUP = C.PROYECCION.supuestos, peor = {};
  C.PROYECCION.meses.filter(m => m.desglose).forEach(function (m) {
    const p = m.mes.split('-').map(Number), nDias = new Date(p[0], p[1], 0).getDate(), casa = m.desglose.casa;
    const come = C.comerEnMes(m.mes, SUP.comida / 30.4);
    const pers = (C.n('cuidadoMes') + (casa ? SUP.loDemasEnCasa : SUP.loDemas)) / nDias;
    [[1, 14], [15, nDias]].forEach(function (q) {
      let libre = -(come + pers) * (q[1] - q[0] + 1), envio = 0;
      for (let d = q[0]; d <= q[1]; d++) C.agendaDia(d, m.mes, C.DEUDAS_SEED).forEach(function (x) {
        if (x.entra) libre += +x.monto || 0;
        else if (x.ahorro || (x.tarjeta && x.de === 'quincena')) envio += +x.monto || 0;
        else if (!x.tarjeta) libre -= +x.monto || 0;
      });
      if (!(envio > 0)) return;
      const sobra = libre - envio, clave = (casa ? 'en casa' : 'con depa') + ', el día ' + q[0];
      if (sobra < 0) malos.push('     ' + m.mes + ', quincena del ' + q[0] + ': manda $' + Math.round(envio) + ' y solo le quedan $' +
                                Math.round(libre) + ' después de fijos, comida y su gasto. Baja PROYECTO.ahorroDia… o el tope de lo demás');
      if (!(clave in peor) || sobra < peor[clave]) peor[clave] = sobra;
    });
  });
  Object.keys(peor).forEach(function (k) {
    if (peor[k] >= 100) avisos.push('Cada quincena ' + k + ' cabe mandar $' + Math.floor(peor[k] / 100) * 100 +
      ' más a GBM sin quitarle a su gasto (en el peor mes de su etapa le sobran $' + Math.round(peor[k]) + ').');
  });
  if (malos.length) problemas.push('La salida a Alemania o la proyección dejaron de cuadrar:\n' + malos.join('\n'));
  else ok.push('Salida a Alemania: ' + ids.length + ' pendientes en ' + S.bloques.length + ' temas y ' + S.costos.length +
               ' costos; el calendario y la proyección apartan lo mismo cada mes; la proyección llega al millón en ' + millon.mes +
               ', antes del cierre de la ' + ultima.tag + ' (en junio ' + (C.PROYECCION.cortes.junio.falta > 0 ? 'faltan $' : 'sobran $') +
               Math.abs(Math.round(C.PROYECCION.cortes.junio.falta)).toLocaleString('es-MX') + ', a la salida ' +
               (C.PROYECCION.cortes.salida.falta > 0 ? 'faltan $' : 'sobran $') + Math.abs(Math.round(C.PROYECCION.cortes.salida.falta)).toLocaleString('es-MX') + ')');
  // La renta tiene fin: pasado `rentaHasta`, los fijos de hoy tienen que dejar de contarla.
  const hoy = new Date(), mesHoy = hoy.getFullYear() + '-' + String(hoy.getMonth() + 1).padStart(2, '0');
  if (C.PROYECTO.rentaHasta && mesHoy > C.PROYECTO.rentaHasta && C.PROYECTO.renta > 0)
    avisos.push('La renta terminó en ' + C.PROYECTO.rentaHasta + ' y PROYECTO.renta sigue en ' + C.PROYECTO.renta +
                ': ponla en 0 (y los servicios del depa) para que margen y fijos dejen de contarla.');
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
  /* Y, sobre todo, DÓNDE hay que mirar. Este aviso decía "revisa los textos que citen estas
     cifras" y el 2026-09-01 eso no bastó: se revisó Coach —siete frases— y no el Dashboard, que
     tenía otras tres y, peor, una LÓGICA colgando del mismo dato (el paso "Banamex" de la ruta
     de deuda, que se daba por cumplido desde la libreta de logros). Un consejo genérico es fácil
     de dar por hecho; una lista de archivos con cuántas veces sale la deuda en cada uno, no. */
  const deudasTocadas = [];
  nombres.forEach(function (k) {
    const id = CLAVE_DEUDA[k];
    if (id && deudasTocadas.indexOf(id) === -1) deudasTocadas.push(id);
  });
  if (deudasTocadas.length) {
    const fuentes = APPS.concat(DOCS_DEUDA.map(function (rel) {
      try { return [rel, leer(rel)]; } catch (e) { return null; }
    }).filter(Boolean));
    L.push('');
    L.push('  Dónde se habla de esa deuda — revísalos TODOS, no solo el primero:');
    deudasTocadas.forEach(function (id) {
      (ALIAS_DEUDA[id] || []).forEach(function (alias) {
        const filas = [];
        fuentes.forEach(function (par) {
          const n = (par[1].match(new RegExp(alias, 'gi')) || []).length;
          if (n) filas.push(par[0] + ' (' + n + ')');
        });
        if (filas.length) L.push('    "' + alias + '" → ' + filas.join(', '));
      });
    });
    L.push('    El control 22 comprueba solo la prosa. La LÓGICA que dé un hito por cumplido');
    L.push('    (libreta de logros, barras al 100%, pasos "done") hay que mirarla a mano.');
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

  // d) sencillas, con su proteína y macros que cuadran (Adán, 12-oct-2026: "comidas más
  //    sencillas"): 4 ingredientes o menos, 3 pasos, 15 minutos; 30 g de proteína o más en el
  //    desayuno y 40 g o más en la cena; kcal ≈ 4·proteína + 4·carbohidratos + 9·grasa (±15 %).
  R.desayuno.concat(R.cena).forEach(function (r) {
    const minimo = R.desayuno.indexOf(r) !== -1 ? 30 : 40, m = r.macros || {};
    if ((r.ingredientes || []).length > 4) malos.push('     ' + r.nombre + ': ' + r.ingredientes.length + ' ingredientes (máximo 4)');
    if ((r.pasos || []).length > 3) malos.push('     ' + r.nombre + ': ' + r.pasos.length + ' pasos (máximo 3)');
    if ((parseInt(r.tiempo, 10) || 99) > 15) malos.push('     ' + r.nombre + ': ' + r.tiempo + ' (máximo 15 min)');
    if ((m.prot || 0) < minimo) malos.push('     ' + r.nombre + ': ' + m.prot + ' g de proteína (mínimo ' + minimo + ')');
    const atw = 4 * (m.prot || 0) + 4 * (m.carbs || 0) + 9 * (m.gra || 0);
    if (m.cal && Math.abs(atw - m.cal) / m.cal > 0.15)
      malos.push('     ' + r.nombre + ': ' + m.cal + ' kcal no cuadran con sus macros (' + Math.round(atw) + ')');
  });

  // f) cada receta tiene costo: todos sus ingredientes con gramos y precio en PRECIOS_SUPER
  R.todas.forEach(function (r) {
    if (C.costoReceta && C.costoReceta(r) == null)
      malos.push('     ' + r.nombre + ': no se puede costear (un ingrediente sin `g` o sin precio en PRECIOS_SUPER)');
  });

  // e) cada foto existe junto a comida.html y lleva su crédito
  R.todas.forEach(function (r) {
    if (!r.foto) { malos.push('     ' + r.nombre + ': sin foto'); return; }
    if (/^https?:/.test(r.foto)) malos.push('     ' + r.nombre + ': la foto se pide a internet; va en fotos-comida/');
    else if (!fs.existsSync(path.join(RAIZ, 'CuidadoPersonal', r.foto))) malos.push('     ' + r.nombre + ': no existe CuidadoPersonal/' + r.foto);
    if (!r.fotoCredito) malos.push('     ' + r.nombre + ': la foto no lleva su crédito (fotoCredito)');
  });

  if (malos.length)
    problemas.push('El recetario y la lista de compras no cuadran:\n' + malos.slice(0, 12).join('\n'));
  else
    ok.push('RECETARIO alimenta la lista de compras (' + R.todas.length + ' recetas sencillas con foto, ' +
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

// ── 19. El vocabulario de alemán, en un solo sitio ───────────────────────────
// Las palabras viven en `Aleman/vocab-datos.js`. Las pinta `Aleman/vocabulario.html` y Mi Día
// del Dashboard toma de ahí la palabra del día; los dos CARGAN el archivo, ninguno lo copia.
// Este control está para que no vuelvan a separarse — y para cazar los emoji partidos, que fue un fallo real: el
// generador escapó 1F44B como \\u1f44 + 'b' y las 21 secciones sacaron un carácter
// griego por icono.
(function () {
  const malos = [];
  let V;
  try {
    V = require('../Aleman/vocab-datos.js');
  } catch (e) {
    problemas.push('No se puede leer Aleman/vocab-datos.js: ' + e.message);
    return;
  }

  // Se comprueba un MÍNIMO, no un número exacto: el vocabulario está hecho para
  // crecer, y clavar la cifra solo consigue que el control falle cada vez que Adán
  // añade una palabra. Lo que hay que cazar es que MENGÜE por accidente.
  if (!V.voc || V.voc.length < 500)
    malos.push('  vocab-datos.js trae ' + ((V.voc || []).length) + ' palabras; había 538');
  const cats = Object.keys(V.cats || {});
  if (cats.length < 22)
    malos.push('  vocab-datos.js trae ' + cats.length + ' secciones; había 22');

  // Cada sección tiene subsecciones, ninguna está vacía, y cada palabra pertenece
  // a una que existe. Es lo que sostiene el árbol de navegación.
  let nSubs = 0;
  cats.forEach(function (c) {
    const subs = Object.keys((V.cats[c] || {}).subs || {});
    nSubs += subs.length;
    if (!subs.length) malos.push('  la sección "' + c + '" no tiene subsecciones');
    subs.forEach(function (sid) {
      if (!V.cuantas(c, sid)) malos.push('  la subsección "' + c + '/' + sid + '" está vacía');
    });
  });
  V.voc.forEach(function (v) {
    if (!v.sub) { malos.push('  la palabra "' + v.de + '" no tiene subsección'); return; }
    if (!((V.cats[v.cat] || {}).subs || {})[v.sub])
      malos.push('  "' + v.de + '" dice ser de la subsección "' + v.sub + '", que no existe en ' + v.cat);
  });

  // Cada palabra en su sección, y ninguna sección vacía.
  V.voc.forEach(function (v, i) {
    if (cats.indexOf(v.cat) === -1)
      malos.push('  la palabra "' + v.de + '" (nº ' + i + ') dice ser de "' + v.cat + '", que no existe');
    if (!v.de || !v.es) malos.push('  la palabra nº ' + i + ' está sin alemán o sin español');
  });
  cats.forEach(function (c) {
    if (V.de(c).length === 0) malos.push('  la sección "' + c + '" no tiene ni una palabra');
  });

  // Emoji partidos. Se comprueba en positivo — el icono TIENE que ser un pictograma —
  // y no listando los caracteres raros que salen al romperse: la primera versión de este
  // control buscaba griego y cirílico (0370-04FF) y no cazaba ni uno, porque un escape
  // cortado a cuatro dígitos aterriza en 1F00-1FFF, que es Greek Extended.
  const iconos = cats.map(function (c) { return V.cats[c].icon; })
    .concat((V.partizip.secciones || []).map(function (x) { return x.ico; }));
  iconos.forEach(function (ic) {
    if (!ic) { malos.push('  hay una sección sin icono'); return; }
    if (!/\p{Extended_Pictographic}/u.test(ic) || /[\uD800-\uDBFF](?![\uDC00-\uDFFF])/.test(ic))
      malos.push('  el icono "' + ic + '" no es un emoji: el escape se cortó a los 4 dígitos');
  });

  if ((V.partizip.secciones || []).length < 9)
    malos.push('  Partizip trae ' + (V.partizip.secciones || []).length + ' bloques; había 9');

  // Y los dos lo cargan en vez de copiarlo. El archivo vive en Aleman/: es donde Adán
  // trabaja el vocabulario.
  [['Aleman', 'vocabulario.html', 'vocab-datos.js'],
   ['Dashboard', 'dashboard.html', '../Aleman/vocab-datos.js']].forEach(function (a) {
    const rel = a[0] + '/' + a[1];
    let h;
    try { h = leer(rel); } catch (e) { malos.push('  no se puede leer ' + rel); return; }
    // La ETIQUETA, no el nombre: los dos archivos nombran aleman-vocab.js en un
    // comentario, así que buscar el texto dejaba pasar un <script> borrado.
    if (h.indexOf('<script src="' + a[2] + '"></script>') === -1)
      malos.push('  ' + rel + ' no carga ' + a[2] + ' con un <script src>');
    // Una copia propia se reconoce por varias palabras con su `cat` escritas a mano.
    const copia = (h.match(/\{\s*art:/g) || []).length;
    if (copia > 3)
      malos.push('  ' + rel + ' vuelve a llevar ' + copia + ' palabras escritas dentro; ' +
                 'tienen que estar solo en Aleman/vocab-datos.js');
  });

  if (malos.length)
    problemas.push('El vocabulario de alemán no cuadra:\n' + malos.slice(0, 12).join('\n'));
  else
    ok.push('Vocabulario de alemán en un solo sitio (' + V.voc.length + ' palabras en ' +
            cats.length + ' secciones y ' + nSubs + ' subsecciones, más ' +
            V.partizip.secciones.length + ' bloques de Partizip; lo leen vocabulario.html y la palabra del día de Mi Día)');
})();

// ── 20. El diseño del vocabulario, en un solo sitio ────────────────────────
// El control 19 cuida las PALABRAS; este cuida el DISEÑO. Hasta el 2026-09-03 cada
// pantalla tenía su copia — 6.900 caracteres de CSS y unas nueve funciones por lado —
// y un retoque en una no llegaba a la otra. Adán: *"quiero un solo diseño, no lo quiero
// duplicado, entonces el principal es el html de aleman"*.
//
// Ahora está en `Aleman/vocab.css` + `Aleman/vocab.js`, que carga `vocabulario.html`. El
// Dashboard ya no tiene pantalla de vocabulario (Adán no quiere la información de alemán
// repetida), así que no los carga; lo que este control vigila es que vocabulario.html los
// siga cargando y que nadie se ponga a reescribirlos por su cuenta: la señal de que eso ha
// pasado es una regla `.v-*` o una función `voc*` escrita dentro de un HTML.
(function () {
  const malos = [];
  const CSS = 'Aleman/vocab.css', JS = 'Aleman/vocab.js';
  let css, js;
  try { css = leer(CSS); js = leer(JS); }
  catch (e) { problemas.push('No se puede leer el motor del vocabulario: ' + e.message); return; }

  // Las clases y funciones que el motor define, para buscarlas donde no deben estar.
  // `.v-vocab` queda fuera a propósito: no es una regla del diseño sino el contenedor
  // donde cada app declara SUS tokens, que es justo el punto de extensión previsto.
  const clases = (css.match(/^\.v-[a-z0-9-]+/gm) || [])
    .map(function (c) { return c.slice(1); })
    .filter(function (c, i, a) { return c !== 'v-vocab' && a.indexOf(c) === i; });
  const funcs = (js.match(/^function (voc[A-Za-z]+)/gm) || [])
    .map(function (f) { return f.replace('function ', ''); });

  if (clases.length < 15) malos.push('  vocab.css define solo ' + clases.length + ' clases; eran más de 15');
  if (funcs.length < 8) malos.push('  vocab.js define solo ' + funcs.length + ' funciones; eran más de 8');

  // `carga`: la que pinta el vocabulario tiene que cargarlo; el Dashboard, solo no copiarlo.
  [['Aleman', 'vocabulario.html', 'vocab.css', 'vocab.js', true],
   ['Dashboard', 'dashboard.html', '../Aleman/vocab.css', '../Aleman/vocab.js', false]].forEach(function (a) {
    const rel = a[0] + '/' + a[1];
    let h;
    try { h = leer(rel); } catch (e) { malos.push('  no se puede leer ' + rel); return; }

    // Que lo cargue. Se busca la ETIQUETA y no el nombre: el archivo nombra vocab.css en
    // un comentario, y buscar el texto dejaba pasar un <link> borrado.
    if (a[4] && h.indexOf('<link rel="stylesheet" href="' + a[2] + '">') === -1)
      malos.push('  ' + rel + ' no carga ' + a[2] + ' con un <link>');
    if (a[4] && h.indexOf('<script src="' + a[3] + '"></script>') === -1)
      malos.push('  ' + rel + ' no carga ' + a[3] + ' con un <script src>');

    // Y que no lo reescriban. Solo se mira dentro del <style> y de los <script> en
    // línea: un `.v-w` citado en un comentario no es una copia.
    const estilos = (h.match(/<style[^>]*>[\s\S]*?<\/style>/g) || []).join('\n');
    const repes = clases.filter(function (c) {
      return new RegExp('^\\.' + c + '\\s*\\{', 'm').test(estilos);
    });
    if (repes.length)
      malos.push('  ' + rel + ' vuelve a definir ' + repes.length + ' clase(s) del motor (' +
                 repes.slice(0, 4).join(', ') + '): tienen que estar solo en ' + CSS);

    const refun = funcs.filter(function (f) {
      return new RegExp('function\\s+' + f + '\\s*\\(').test(h);
    });
    if (refun.length)
      malos.push('  ' + rel + ' vuelve a definir ' + refun.join(', ') + ': solo en ' + JS);
  });

  if (malos.length)
    problemas.push('El diseño del vocabulario se está duplicando:\n' + malos.slice(0, 10).join('\n'));
  else
    ok.push('Diseño del vocabulario en un solo sitio (' + clases.length + ' clases en vocab.css y ' +
            funcs.length + ' funciones en vocab.js; los carga vocabulario.html y nadie los copia)');
})();

// ── 21. Las familias cubren las 37 secciones, y cada una una sola vez ────────
// El índice del vocabulario se pinta desde `familias`, no desde `cats`: una sección
// que no esté en ninguna familia sigue teniendo sus palabras y su subsección, pero ya no
// hay forma de llegar a ella. No falla, no avisa — desaparece.
(function () {
  const ruta = path.join(RAIZ, 'Aleman', 'vocab-datos.js');
  if (!fs.existsSync(ruta)) return;
  let V;
  try { V = require(ruta); } catch (e) { return; }
  if (!V || !V.cats) return;

  if (!Array.isArray(V.familias)) {
    problemas.push('`Aleman/vocab-datos.js` no trae `familias`, y el índice del ' +
      'vocabulario se pinta desde ahí: sin ellas no se ve ninguna sección.');
    return;
  }

  const secciones = Object.keys(V.cats);
  const vistas = new Map();
  const malos = [];

  V.familias.forEach(function (f) {
    if (!f.id || !f.label || !f.icon)
      malos.push('la familia ' + JSON.stringify(f.id || '?') + ' no tiene id, label o icon');
    if (!Array.isArray(f.cats) || !f.cats.length)
      malos.push('la familia "' + f.id + '" no tiene secciones');
    (f.cats || []).forEach(function (k) {
      if (!V.cats[k]) malos.push('la familia "' + f.id + '" nombra "' + k + '", que no existe en cats');
      if (vistas.has(k)) malos.push('"' + k + '" está en dos familias: ' + vistas.get(k) + ' y ' + f.id);
      vistas.set(k, f.id);
    });
  });

  const huerfanas = secciones.filter(function (k) { return !vistas.has(k); });
  if (huerfanas.length)
    malos.push('sin familia, así que no salen en el índice: ' + huerfanas.join(', '));

  const enFamilias = V.familias.reduce(function (a, f) {
    return a + (f.cats || []).reduce(function (b, k) {
      return b + V.voc.filter(function (w) { return w.cat === k; }).length; }, 0);
  }, 0);
  if (enFamilias !== V.voc.length)
    malos.push('las familias suman ' + enFamilias + ' palabras y el vocabulario tiene ' + V.voc.length);

  if (malos.length)
    problemas.push('Las familias del vocabulario no cuadran:\n  - ' + malos.slice(0, 10).join('\n  - '));
  else
    ok.push('Familias del vocabulario: ' + V.familias.length + ' cubren las ' + secciones.length +
            ' secciones y las ' + V.voc.length + ' palabras, sin repetir ninguna');
})();

/* ── 22. Lo que las apps AFIRMAN sobre una deuda, contra su saldo vivo ────────────────────────
   El control 4 vigila las CIFRAS escritas a mano y el 7 las tablas de los .md. Ninguno miraba
   las AFIRMACIONES: "Banamex ya está en $0", "la única deuda cara que queda", "✅ liquidada".
   No llevan número, así que ningún control las tocaba, y envejecen igual de mal que una cifra.

   El 2026-09-01 la TC Banamex —liquidada el 13 ago— volvió a tener saldo con cuatro compras.
   Las cifras se movieron solas, porque son getters, pero SIETE frases de Coach y TRES del
   Dashboard siguieron diciendo que estaba en $0. Y una no era prosa sino LÓGICA: el paso
   "Banamex" de la ruta de deuda daba el hito por cumplido leyendo la libreta de logros
   (`!!lgBana || ...`), y habría enseñado "Liquidada" para siempre, con la barra al 100% y el
   paso activo saltando a BBVA como si solo quedara una tarjeta cara.

   La regla que impone: **ninguna app puede afirmar EN PRESENTE que una deuda está saldada
   mientras el maestro le vea saldo vivo.** Contarlo en pasado sí vale —es historia, y los
   logros no se borran— y por eso una fecha, un "era", un "hasta" o un "volvió" en la misma
   frase la dejan pasar: eso ya es relato, no una afirmación sobre hoy.

   Solo mira TEXTO QUE ALGUIEN LEE, y por eso son dos pasadas: el HTML sin sus <script> (prosa
   de la página) y, dentro del código, únicamente las cadenas largas con varias palabras — la
   prosa que vive en literales, como los pasos de las metas o los avisos del mes. Un id como
   'banamex-liquidada' no pasa ese filtro, que es lo que hacía inservible la primera versión:
   25 hallazgos, todos código.

   Si salta y la frase es cierta, la forma de callarlo NO es una excepción: es fecharla. */
(function afirmacionesDeuda() {
  if (!global.window || !global.window.CIFRAS) return;
  const C = global.window.CIFRAS;
  const vivas = (C.DEUDAS_SEED || []).filter(d => +d.balance > 0 && ALIAS_DEUDA[d.id]);
  if (!vivas.length) { ok.push('Ninguna deuda con saldo vivo que comprobar'); return; }

  /* Los patrones se arman con `new RegExp` y clases explícitas ([0-9] en vez de una `d`
     escapada) para no llenar de barras un fichero que ya usa `BS` por el mismo motivo. */
  const B = BS + 'b', NL = BS + 'n';
  const SALDADA = new RegExp('(liquidad[ao]s?|saldad[ao]s?|en [$] ?0' + B + '|a [$] ?0' + B +
    '|ya no debes|sin saldo|ya cayó|en cero)', 'i');
  const MES = '(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)';
  const HISTORIA = new RegExp('(([0-9]{1,2} )?' + MES + '[a-zé.]* 20[0-9][0-9]' +
    '|20[0-9][0-9]-[0-9][0-9]-[0-9][0-9]|hecho el|la liquidaste|se liquidó|liquidada el' +
    '|quedó|quedaron|era |fue |fueron |hasta |antes |volvió|vuelve|otra vez|reabr|dejó de' +
    '|daba[n]? por|decía[n]?|se corrigió|se corrigieron|se borraron|nunca existieron|al arrancar' +
    '|(mostrar|ser|habr|estar|quedar|podr|deber|tendr)ían?)', 'i');
  /* Y una meta tampoco es una afirmación sobre hoy: "en cuanto BBVA llegue a $0" describe
     adónde vas, no dónde estás. Sin esto el control marcaría medio Plan Maestro. */
  const FUTURO = new RegExp('(en cuanto|cuando |hasta que|llegue|llegar|meta |objetivo|proyec' +
    '|se adelanta|una vez |ni una sola vez|apunta a|liquidar |bajar |no negocies|ninguno|nada de' +
    '|antes de|estará|quedará|será|falta[rn]?|pendiente)', 'i');
  const ESPACIOS = new RegExp('[' + BS + 's]+', 'g');
  const SCRIPTS = new RegExp('<script[^]*?</script>', 'gi');
  // Cadenas largas de varias palabras: la prosa que vive dentro del código.
  const TEXTOS = new RegExp("'[^'" + NL + "]{45,}'|" + '"[^"' + NL + ']{45,}"', 'g');
  // Marcas de que lo capturado sigue siendo código, no una frase.
  const CODIGO = new RegExp('(=>|[$]{|function |const |[.]test[(]|document[.]|localStorage)');
  const VENTANA = 130;   // la misma frase, no el párrafo entero

  /* Cada fuente se parte en trozos de prosa. Para un .md, el archivo entero. */
  function prosaDe(rel, src) {
    /* En un .md la unidad es la LÍNEA. Con una ventana de caracteres, una tabla de deudas
       mezcla la fila de la que está liquidada con la de al lado, y el control acusa a la
       equivocada. Una fila es una frase completa; no hace falta más contexto. */
    if (/[.]md$/.test(rel)) return src.split(String.fromCharCode(10));
    const limpio = sinComentarios(src);
    const trozos = [limpio.replace(SCRIPTS, ' ').replace(/<[^>]*>/g, ' ')];
    (limpio.match(TEXTOS) || []).forEach(function (s) {
      /* Solo prosa suelta. Un literal que trae HTML dentro es una plantilla, y su texto ya
         se lee entero —con lo que tiene al lado— en la pasada de arriba; volver a mirarlo aquí
         duplica el hallazgo y encima recortado por la mitad. */
      if (s.indexOf('<') === -1 && s.split(' ').length >= 6) trozos.push(s);
    });
    return trozos;
  }

  const fuentes = APPS.concat(DOCS_DEUDA.map(function (rel) {
    try { return [rel, leer(rel)]; } catch (e) { return null; }
  }).filter(Boolean));

  const malas = [], vistos = new Set();
  fuentes.forEach(function (par) {
    const rel = par[0];
    prosaDe(rel, par[1]).forEach(function (txt) {
      vivas.forEach(function (d) {
        /* Los alias son palabras llanas a propósito (ver ALIAS_DEUDA): entran en un RegExp sin
           escaparlas, y de paso nadie puede meter ahí un patrón que haga de comodín. */
        ALIAS_DEUDA[d.id].forEach(function (alias) {
          const re = new RegExp(alias, 'gi');
          let m;
          while ((m = re.exec(txt)) !== null) {
            const frase = txt.slice(Math.max(0, m.index - VENTANA), m.index + alias.length + VENTANA)
                             .replace(ESPACIOS, ' ').trim();
            if (!SALDADA.test(frase) || HISTORIA.test(frase) || FUTURO.test(frase) || CODIGO.test(frase)) continue;
            const clave = rel + ' · ' + frase.slice(0, 60);
            if (vistos.has(clave)) continue;
            vistos.add(clave);
            malas.push('     ' + rel + ' · ' + d.name + ' debe $' +
              Math.round(d.balance).toLocaleString('en-US') + ', y ahí dice: …' +
              frase.slice(0, 150) + '…');
          }
        });
      });
    });
  });

  /* La otra afirmación que envejece sola no habla de UNA deuda sino de cuántas quedan: "la
     única deuda cara que queda". Es cierta con una tarjeta viva y falsa con dos, así que se
     comprueba contra la cuenta, no contra un saldo. */
  const tarjetasVivas = (C.DEUDAS_SEED || []).filter(d => d.type === 'credit_card' && +d.balance > 0);
  if (tarjetasVivas.length > 1) {
    const UNICA = new RegExp('(única|unica|sola) deuda cara', 'i');
    fuentes.forEach(function (par) {
      prosaDe(par[0], par[1]).forEach(function (txt) {
        let m; const re = new RegExp('(única|unica|sola) deuda cara', 'gi');
        while ((m = re.exec(txt)) !== null) {
          const frase = txt.slice(Math.max(0, m.index - VENTANA), m.index + VENTANA)
                           .replace(ESPACIOS, ' ').trim();
          if (HISTORIA.test(frase) || CODIGO.test(frase)) continue;
          const clave = par[0] + ' · unica · ' + frase.slice(0, 60);
          if (vistos.has(clave)) continue;
          vistos.add(clave);
          malas.push('     ' + par[0] + ' · dice "deuda cara única" y hay ' + tarjetasVivas.length +
            ' tarjetas con saldo (' + tarjetasVivas.map(d => d.name.replace('Tarjeta ', '')).join(' y ') +
            '): …' + frase.slice(0, 130) + '…');
        }
      });
    });
  }

  if (malas.length)
    problemas.push('Afirmaciones que el saldo vivo desmiente (' + malas.length + '):\n' +
      malas.slice(0, 8).join('\n') +
      (malas.length > 8 ? '\n     … y ' + (malas.length - 8) + ' más' : '') +
      '\n     Féchalas ("liquidada el 13 ago 2026") o corrígelas. No se silencian con excepciones.');
  else
    ok.push('Ninguna app afirma en presente que una deuda con saldo vivo esté saldada (' +
      vivas.length + ' deudas vigiladas en ' + fuentes.length + ' archivos)');
})();

/* ── Las pantallas del Dashboard, en CUATRO listas paralelas ──────────────────────────────
   Un slide existe en cuatro sitios a la vez: su <section class="slide" data-i="N">, su funcion
   en RENDERS, su fila en SLIDE_MENU_META (el menu ☰) y su icono en HUD_ICO (el rail). Las
   cuatro tienen que medir lo mismo y estar en el mismo orden.

   Por que importa: si se anade una pantalla y se olvida su icono, `N` sale de RENDERS y el rail
   pinta undefined en la ultima posicion — sin error de consola, solo un hueco. Se anadio al
   sumar Habitos (slide 8, 2026-09-11), que toca esas cuatro listas a la vez. */
(function () {
  const renders = literal(dash, 'const RENDERS=');
  const menu    = literal(dash, 'const SLIDE_MENU_META=');
  const icos    = literal(dash, 'const HUD_ICO=');
  if (!renders || !menu || !icos) {
    problemas.push('No se pudieron leer RENDERS / SLIDE_MENU_META / HUD_ICO en dashboard.html.' +
      '\n     Si se renombraron, hay que actualizar este control.');
    return;
  }
  const nRend = renders.slice(1, -1).split(',').filter(x => x.trim()).length;
  const nMenu = (evaluar(menu)  || []).length;
  const nIco  = (evaluar(icos)  || []).length;
  const secs  = (dash.match(/<section class="slide[^"]*" data-i="\d+"/g) || []).length;

  if (nRend === nMenu && nMenu === nIco && nIco === secs) {
    ok.push('Las 4 listas de pantallas del Dashboard cuadran (' + secs + ' slides: <section>, ' +
      'RENDERS, SLIDE_MENU_META y HUD_ICO)');
  } else {
    problemas.push('Las listas de pantallas del Dashboard NO cuadran:' +
      '\n       <section class="slide">  ' + secs +
      '\n       RENDERS                 ' + nRend +
      '\n       SLIDE_MENU_META         ' + nMenu +
      '\n       HUD_ICO                 ' + nIco +
      '\n     Las cuatro describen las mismas pantallas y en el mismo orden. La que va corta' +
      '\n     deja el rail o el menu pintando un hueco, sin error de consola.');
  }

  // Los data-i tienen que ser 0..N-1 sin saltos: showSlide() indexa RENDERS con ese numero.
  const is = (dash.match(/<section class="slide[^"]*" data-i="(\d+)"/g) || [])
    .map(m => +m.match(/data-i="(\d+)"/)[1]);
  const esperado = is.map((_, k) => k).join(',');
  if (is.slice().sort((a, b) => a - b).join(',') !== esperado)
    problemas.push('Los data-i de los slides no son 0..' + (is.length - 1) + ' sin saltos: [' +
      is.join(', ') + ']\n     showSlide(i) usa ese numero como indice de RENDERS.');
})();

/* ── 23. Los .md son REFERENCIA, no diario, y no citan código que no existe ─────────────────
   Regla 3 del CLAUDE.md. Adán, 2026-09-20: "no quiero que vuelva a pasar que se llene de archivos
   basura". Lo que llena un readme de basura son dos cosas, y las dos se miden:

   a) BITÁCORA: encabezados fechados ("## Fix: … (2026-08-05)", "(nuevo 2026-08-03)"), y frases
      que cuentan cómo era antes en vez de cómo es hoy ("hasta el 2026-09-02 …", "antes era …",
      "el primer intento", "mismo día)", "se quitó el 2026-…"). Eso vive en `git log`.
   b) FANTASMAS: identificadores en `código` que ya no existen en ningún .html/.js/.css del
      proyecto ni son nombres de archivo. Así es como readme_ejercicio.md siguió describiendo
      Fitsi y `verSoloDia()` semanas después de borrarlos.

   Un token "parece código" si lleva `_`, `-`, camelCase o mezcla letras y dígitos; las palabras
   en MAYÚSCULAS sueltas (COMPLETA, MARTES) son rótulos de pantalla y no cuentan. Una cita que
   lleva `<…>`, `*`, `…` o `YYYY` es un molde, no un nombre. Si el token no es palabra entera de
   ninguna fuente se busca como subcadena (`fixTasaTC` vive dentro de `fixTasaTCIfNeeded`,
   `k10-01` dentro de `k10-01-perfekt-regel.html`): solo lo que no aparece de ninguna forma es
   fantasma. Las excepciones llevan su razón; una excepción sin razón es un aviso que se ignora. */
(function docsSinBasura() {
  const EXCEPCIONES = {
    addInitScript: 'API de Playwright: se cita en "Verificar un cambio", no es código del proyecto',
    finanzasmx_v2_v: "la bandera del seed se construye como KEY+'_v', nunca aparece literal",
    ReferenceError: 'error nativo de JavaScript: se cita en "Trampas conocidas", no es código del proyecto',
  };
  const DIARIO = [
    [/^#{1,6} .*(\b20\d\d-\d\d(-\d\d)?\b|\(nuevo\b)|^#{1,6} Fix:/i, 'encabezado fechado o de bitácora'],
    [/\bhasta el (\d{1,2}-\w{3}-20\d\d|20\d\d-\d\d-\d\d|\d{1,2}-\w{3})\b/i, 'cuenta cómo era antes'],
    [/\bantes (era|eran|había|estaba|estaban|marcar|cada|solo|sólo) /i, 'cuenta cómo era antes'],
    [/\b(el primer intento|la primera versión|primera versión de esto|segunda vuelta|misma tarde)\b/i, 'relato de cómo se llegó'],
    [/(, |\()mismo día\)/i, 'relato de cómo se llegó'],
    [/\bse (rehizo|quitó|quitaron|borró|borraron|eliminó|eliminaron|reescribió|reescribieron|corrigió|movió|movieron|añadió|añadieron|agregó|agregaron|cambió|cambiaron|bumpeó|sembró|detectó|encontró) el (\d{1,2}-\w{3}-20\d\d|20\d\d-\d\d-\d\d)\b/i, 'cambio fechado — eso va en el mensaje del commit'],
    [/\b(corregido|documentado|verificado|actualizado|añadido|agregado|nuevo) (el )?20\d\d-\d\d-\d\d\b/i, 'cambio fechado — eso va en el mensaje del commit'],
  ];

  // Todo lo que hay en el proyecto: fuentes (.html/.js/.css fuera de diseno-*) y nombres de archivo.
  const fuentes = [], nombres = new Set([path.basename(RAIZ)]), docs = [];
  (function listar(dir) {
    for (const e of fs.readdirSync(path.join(RAIZ, dir), { withFileTypes: true })) {
      if (e.name.charAt(0) === '.' || e.name === 'node_modules') continue;
      const rel = dir ? dir + '/' + e.name : e.name;
      nombres.add(e.name); nombres.add(e.name.replace(/\.[a-z0-9]+$/i, '')); nombres.add(e.name.split('.')[0]);
      if (e.isDirectory()) { listar(rel); continue; }
      if (/\.md$/i.test(e.name) && !/^Negocio\//.test(rel)) docs.push(rel);
      else if (/\.(html|js|css)$/i.test(e.name) && !/(^|\/)diseno-[^/]+\//.test(rel)) fuentes.push(rel);
    }
  })('');

  // Palabras enteras de las fuentes. Un bucle a mano: matchAll sobre 10 MB tarda segundos y esto
  // corre en el hook de cada turno. Este mismo archivo queda fuera: nombra las excepciones y
  // muchos de los nombres que vigila, y se taparía a sí mismo.
  const palabras = new Set(); let todo = '';
  const esId = c => (c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 95 || c === 36 || c === 45;
  for (const rel of fuentes) {
    if (/verificar-sincronia\.js$/.test(rel)) continue;
    const src = leer(rel); todo += src + '\n';
    let ini = -1;
    for (let i = 0, n = src.length; i <= n; i++) {
      const dentro = i < n && esId(src.charCodeAt(i));
      if (dentro && ini < 0) ini = i;
      else if (!dentro && ini >= 0) { if (i - ini >= 4) palabras.add(src.slice(ini, i)); ini = -1; }
    }
  }
  const pareceCodigo = t => t.length >= 4 && !(/^[A-Z0-9-]+$/.test(t)) &&
    (/_/.test(t) || /-[A-Za-z0-9]/.test(t) || /[a-z][A-Z]/.test(t) || /^[a-z]+\d/.test(t) || /\d[a-z]/i.test(t));
  const verif = leer('Dashboard/verificar-sincronia.js');   // sus constantes (ALIAS_DEUDA…) sí se pueden citar
  const existe = t => palabras.has(t) || nombres.has(t) || todo.indexOf(t) !== -1 || verif.indexOf(t) !== -1;

  const bitacora = [], fantasmas = [];
  docs.forEach(rel => {
    let enBloque = false;
    leer(rel).split('\n').forEach((l, i) => {
      if (/^\s*```/.test(l)) { enBloque = !enBloque; return; }
      for (const [re, por] of DIARIO) if (re.test(l)) { bitacora.push('     ' + rel + ':' + (i + 1) + ' · ' + por + '\n       ' + l.trim().slice(0, 100)); break; }
      if (enBloque) return;
      for (const m of l.matchAll(/`([^`\n]+)`/g)) {
        const cita = m[1];
        if (/^https?:|^\.\.\/|\.md$|\/$|[<>*…]|YYYY|NOMBRE/.test(cita)) continue;   // rutas, enlaces y moldes
        for (const p of cita.matchAll(/[A-Za-z_$][\w$-]*/g)) {
          const tok = p[0].replace(/-+$/, '');
          if (!pareceCodigo(tok) || EXCEPCIONES[tok] || existe(tok)) continue;
          fantasmas.push('     ' + rel + ':' + (i + 1) + ' · `' + tok + '` no existe en ningún .html/.js/.css  (en `' + cita.slice(0, 60) + '`)');
        }
      }
    });
  });
  // Una excepción que ya no hace falta también es basura.
  for (const tok in EXCEPCIONES) if (palabras.has(tok) || nombres.has(tok) || todo.indexOf(tok) !== -1) avisos.push('Control 23: la excepción `' + tok + '` ya no hace falta, el nombre existe en el código');

  if (bitacora.length)
    problemas.push('Los .md se están llenando de bitácora (Regla 3: referencia, no diario; la historia está en git):\n' +
      bitacora.join('\n') + '\n     Se reescribe la sección para que diga cómo funciona HOY; no se apila una entrada fechada.');
  if (fantasmas.length)
    problemas.push('Los .md citan código que ya no existe (desincronizados):\n' + fantasmas.join('\n') +
      '\n     O se borró y hay que quitar la frase, o se renombró y hay que corregirla. Si de verdad no es' +
      '\n     código del proyecto, va en EXCEPCIONES del control 23 con su razón.');
  if (!bitacora.length && !fantasmas.length)
    ok.push('Los .md son referencia, no diario, y todo el código que citan existe (' + docs.length + ' archivos, ' +
      fuentes.length + ' fuentes)');
})();

/* ── 24. Cada página carga su prompt, y cada prompt existe ─────────────────────────────────
   Adán, 2026-09-30: "en cada página debe ser un especialista en su área… esto es el pilar de
   cada página html, entonces cada vez que se modifica algo de cada html ese prompt gobernará".
   Los prompts viven en `Dashboard/prompts-paginas.js` y cada HTML los enseña con el icono de
   `Dashboard/prompt-pagina.js`. Aquí se exige que TODA página del proyecto lo cargue (salvo las
   maquetas de `diseno-*`), con una clave que exista, la ruta correcta y `data-publica` en las
   webs del negocio; y que todo prompt tenga sus cuatro campos, diga cómo se modifica su página
   y no lleve marcadores que el maestro no conozca. Una página nueva sin prompt sale aquí. */
let PROMPTS = null;
const PAGINA_PROMPT = {};          // 'Finanzas/Finanzas.html' → 'finanzas'
(function () {
  const malos = [];
  try {
    PROMPTS = new Function('window', leer('Dashboard/prompts-paginas.js') + '; return window.PROMPTS_PAGINAS;')({});
  } catch (e) { problemas.push('No se puede leer Dashboard/prompts-paginas.js: ' + e.message); return; }
  const claves = Object.keys((PROMPTS && PROMPTS.paginas) || {});
  if (!PROMPTS || !PROMPTS.COMUN) malos.push('  falta COMUN, las reglas que comparten todos');
  else {
    if (!/^## El plan que todos sirven/m.test(PROMPTS.COMUN))
      malos.push('  COMUN debe empezar con "## El plan que todos sirven": el orden que decide entre especialistas');
    if (global.window && global.window.CIFRAS) {
      const sueltosC = global.window.CIFRAS.texto(PROMPTS.COMUN).match(/\{\{\w+\}\}/g);
      if (sueltosC) malos.push('  COMUN: marcadores que el maestro no conoce: ' + sueltosC.join(', '));
    }
  }
  claves.forEach(function (k) {
    const p = PROMPTS.paginas[k];
    ['titulo', 'rol', 'proposito', 'prompt'].forEach(function (c) {
      if (typeof p[c] !== 'string' || !p[c].trim()) malos.push('  ' + k + ': falta `' + c + '`');
    });
    if (typeof p.prompt === 'string' && !/^## Al modificar/m.test(p.prompt))
      malos.push('  ' + k + ': el prompt no dice cómo se modifica su página (falta "## Al modificar…")');
    // El valor y la sinergia (Adán, 2026-10-01: "que generen valor… y que tenga sinergia con
    // todo"): cada prompt dice cómo se mide si ayuda y con qué otros especialistas trabaja,
    // nombrando al menos a dos por su título exacto (es lo que la ventana convierte en enlace).
    if (typeof p.prompt === 'string') {
      if (!/^## Cómo sabes que funciona/m.test(p.prompt))
        malos.push('  ' + k + ': falta "## Cómo sabes que funciona": cómo se mide si la página ayuda');
      const sin = (p.prompt.split(/^## Con quién trabajas.*$/m)[1] || '').split(/^## /m)[0];
      if (!sin) malos.push('  ' + k + ': falta "## Con quién trabajas": su sinergia con los demás');
      else {
        const otros = claves.filter(function (o) {
          if (o === k) return false;
          const t = PROMPTS.paginas[o].titulo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          return new RegExp('(^|[^\\p{L}])' + t + '(?![\\p{L}])', 'u').test(sin);
        });
        if (otros.length < 2)
          malos.push('  ' + k + ': "Con quién trabajas" nombra ' + otros.length + ' especialista(s) por su título; deben ser al menos 2');
      }
    }
    if (global.window && global.window.CIFRAS) {
      const sueltos = global.window.CIFRAS.texto([p.rol, p.proposito, p.prompt].join('\n')).match(/\{\{\w+\}\}/g);
      if (sueltos) malos.push('  ' + k + ': marcadores que el maestro no conoce: ' + sueltos.join(', '));
    }
  });

  const paginas = [];
  (function recorre(dir) {
    fs.readdirSync(path.join(RAIZ, dir), { withFileTypes: true }).forEach(function (e) {
      if (e.isDirectory()) {
        if (/^(diseno-|node_modules$|fotos$|\.)/.test(e.name)) return;
        recorre(dir ? dir + '/' + e.name : e.name);
      } else if (/\.html$/i.test(e.name) && !/\.PREV\.html$/i.test(e.name)) {
        paginas.push(dir ? dir + '/' + e.name : e.name);
      }
    });
  })('');

  const usadas = {};
  paginas.forEach(function (rel) {
    const h = leer(rel);
    // Los atributos se leen par a par: un data-host lleva ">" dentro (".topbar > div").
    const m = h.match(/<script src="([^"]*)prompt-pagina\.js" data-pagina="([a-z]+)"((?:\s+[a-z-]+(?:="[^"]*")?)*)\s*><\/script>/);
    if (!m) { malos.push('  ' + rel + ' no carga prompt-pagina.js: no tiene icono ni prompt'); return; }
    const esperada = rel.indexOf('Dashboard/') === 0 ? '' : '../Dashboard/';
    if (m[1] !== esperada) malos.push('  ' + rel + ' carga el icono desde "' + m[1] + '", debe ser "' + esperada + '"');
    if (claves.indexOf(m[2]) === -1) malos.push('  ' + rel + ' pide el prompt "' + m[2] + '", que no existe');
    const publica = /^(Aeroresinas|Heliescala)\//.test(rel);
    if (publica && m[3].indexOf('data-publica') === -1)
      malos.push('  ' + rel + ' es web pública y no lleva data-publica: el icono le saldría a un cliente');
    PAGINA_PROMPT[rel] = m[2];
    usadas[m[2]] = (usadas[m[2]] || 0) + 1;
  });
  // Las vistas: su clave existe y su selector apunta a algo que la página tiene. Se buscan los
  // ids, las clases y los data-tab del selector en el HTML de las páginas que usan ese prompt;
  // un `#gbmOverlay` renombrado dejaría la vista muda sin que nada fallara.
  let nVistas = 0;
  claves.forEach(function (k) {
    const vs = PROMPTS.paginas[k].vistas;
    if (!vs) return;
    if (!Array.isArray(vs)) { malos.push('  ' + k + ': `vistas` debe ser una lista'); return; }
    const html = Object.keys(PAGINA_PROMPT).filter(function (r) { return PAGINA_PROMPT[r] === k; })
      .map(function (r) { return leer(r); }).join(String.fromCharCode(10));
    vs.forEach(function (x) {
      nVistas++;
      if (!x || typeof x.si !== 'string' || !x.clave) { malos.push('  ' + k + ': una vista sin `si` o sin `clave`'); return; }
      if (claves.indexOf(x.clave) === -1) { malos.push('  ' + k + ': la vista "' + x.si + '" pide el prompt "' + x.clave + '", que no existe'); return; }
      usadas[x.clave] = (usadas[x.clave] || 0) + 1;
      const fichas = (x.si.match(/#[\w-]+/g) || []).map(function (t) { return 'id="' + t.slice(1) + '"'; })
        .concat((x.si.match(/data-tab="[\w-]+"/g) || []))
        .concat((x.si.match(/\.[\w-]+/g) || []).filter(function (t) { return ['.active', '.open'].indexOf(t) === -1; })
          .map(function (t) { return t.slice(1); }));
      fichas.forEach(function (f) {
        if (html.indexOf(f) === -1) malos.push('  ' + k + ': la vista "' + x.si + '" busca ' + f + ', que la página no tiene');
      });
    });
  });
  claves.forEach(function (k) { if (!usadas[k]) malos.push('  el prompt "' + k + '" no lo usa ninguna página ni vista'); });

  if (malos.length)
    problemas.push('Páginas sin su prompt, o prompts incompletos (control 24):\n' + malos.slice(0, 15).join('\n'));
  else
    ok.push('Cada página carga su prompt (' + paginas.length + ' páginas, ' + claves.length +
            ' especialistas, ' + nVistas + ' vistas con el suyo; el icono arriba a la izquierda los enseña)');
})();

/* Al cerrar el turno, las páginas tocadas recuerdan qué prompt las gobierna: es la otra mitad de
   la Regla 6 (el prompt se lee ANTES de modificar; aquí se comprueba DESPUÉS que se cumplió). */
function promptsDeLoTocado() {
  if (!PROMPTS || !PROMPTS.paginas) return null;
  const { execSync } = require('child_process');
  let lista;
  try {
    const opt = { cwd: RAIZ, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] };
    lista = (execSync('git diff --name-only --relative HEAD', opt) + '\n' +
             execSync('git ls-files --others --exclude-standard', opt)).split(/\r?\n/);
  } catch (e) { return null; }
  const porClave = {};
  lista.forEach(function (rel) {
    const k = PAGINA_PROMPT[rel.trim()];
    if (k) (porClave[k] = porClave[k] || []).push(rel.trim());
  });
  const ks = Object.keys(porClave);
  if (!ks.length) return null;
  const L = ['PÁGINAS TOCADAS — cada una se rige por su prompt (Dashboard/prompts-paginas.js)', ''];
  ks.forEach(function (k) {
    const f = porClave[k];
    const vs = PROMPTS.paginas[k].vistas || [];
    L.push('  ' + k + ' · ' + PROMPTS.paginas[k].rol + ' → ' +
           (f.length > 3 ? f.length + ' páginas' : f.join(', ')));
    if (vs.length) L.push('      con vistas: cada una tiene su prompt (' +
           vs.map(function (x) { return x.clave; }).join(', ') + '); se lee el de la vista tocada');
  });
  L.push('', '  ¿El cambio cumple su "Al modificar esta página" y las reglas comunes? Si no, se corrige antes de cerrar.');
  return L.join('\n');
}

/* ── 25. Las lecciones de Alemán: el catálogo contra sus páginas, y el inicio y Mi Día lo leen ──
   Las 41 lecciones viven en `Aleman/lecciones-datos.js`: de ahí pinta sus tarjetas el inicio de Alemán y
   de ahí saca Mi Día la lección que toca, con la misma regla (`queToca`). Desde file:// ninguna página puede
   abrir otra para contar sus ejercicios, así que cada lección del Kapitel lleva la lista en `bloques`: si una
   lección gana un ejercicio y la lista no, sale «Completa» con uno sin hacer; si lo pierde, no llega nunca al
   100 %. Por eso se compara con los `k10…('id'` de la página (un k10Conjugar guarda uno por verbo y va como
   `id:n`). Y: que estén todas las páginas y ninguna de más; que cada foto exista y sea la del encabezado de
   su lección, con el mismo crédito; que el inicio y el Dashboard carguen el catálogo en vez de copiarlo, y
   que no queden fotos que nadie usa. */
(function () {
  const dir = path.join(RAIZ, 'Aleman');
  if (!fs.existsSync(path.join(dir, 'index.html'))) return;
  let C;
  try { C = require('../Aleman/lecciones-datos.js'); }
  catch (e) { problemas.push('No se puede leer Aleman/lecciones-datos.js: ' + e.message); return; }
  const malos = [], lista = C.lista || [];
  let ejercicios = 0, m;

  // Cada página en el catálogo, y cada lección del catálogo con su página, su foto y, si es del Kapitel, sus ejercicios.
  const archivos = fs.readdirSync(dir).filter(function (f) { return /^(a1|a2|k10)-\d\d-[\w-]+\.html$/.test(f); });
  archivos.forEach(function (f) {
    if (!lista.some(function (l) { return l.href === f; })) malos.push(f + ' no está en lecciones-datos.js');
  });
  const vistos = new Set();
  lista.forEach(function (l) {
    if (vistos.has(l.id)) malos.push(l.id + ' está dos veces en el catálogo');
    vistos.add(l.id);
    ['href', 'num', 'de', 'es', 'tags', 'foto', 'alt', 'credito'].forEach(function (k) { if (!l[k]) malos.push(l.id + ' sin `' + k + '`'); });
    const g = C.grupo(C.grupoDe(l));
    if (!g) malos.push(l.id + ': su grupo no está en `grupos`');
    if (!l.href || l.href.indexOf(l.id + '-') !== 0) malos.push(l.id + ': su página (' + l.href + ') no empieza por su id');
    if (!l.href || !fs.existsSync(path.join(dir, l.href))) { malos.push((l.href || l.id) + ' no existe'); return; }
    const pag = fs.readFileSync(path.join(dir, l.href), 'utf8');
    if (!fs.existsSync(path.join(dir, 'fotos', l.foto || '-'))) malos.push('fotos/' + l.foto + ' no existe');
    const enc = /<figure class="lec-foto"><img src="fotos\/([^"]+)"[^>]*\btitle="Foto: ([^"]+)"/.exec(pag);
    if (enc && (enc[1] !== l.foto || enc[2].replace(/&amp;/g, '&') !== l.credito))
      malos.push(l.id + ': el catálogo dice fotos/' + l.foto + ' («' + l.credito + '») y su página, fotos/' + enc[1] + ' («' + enc[2] + '»)');
    if (!g || !g.kapitel) return;
    if (!Array.isArray(l.bloques) || !l.bloques.length) { malos.push(l.id + ' es del Kapitel y no trae sus `bloques`'); return; }
    const reales = [];
    let c;
    const reId = /k10(?:Escribir|Opciones|Ordenar|Emparejar|Hueco|Test|Dictado)\(\s*['"]([^'"]+)['"]/g;
    while ((c = reId.exec(pag))) reales.push(c[1]);
    const reConj = /k10Conjugar\(\s*['"]([^'"]+)['"]\s*,\s*\[([\s\S]*?)\]\s*\)/g;
    while ((c = reConj.exec(pag))) reales.push(c[1] + ':' + (c[2].match(/\binf\s*:/g) || []).length);
    ejercicios += l.bloques.length;
    const faltan = reales.filter(function (x) { return l.bloques.indexOf(x) === -1; });
    const sobran = l.bloques.filter(function (x) { return reales.indexOf(x) === -1; });
    if (faltan.length || sobran.length)
      malos.push(l.href + ': ' + [faltan.length ? 'le faltan ' + faltan.join(', ') : '',
                                  sobran.length ? 'sobran ' + sobran.join(', ') : ''].filter(Boolean).join('; '));
  });

  // La regla de lo que toca hoy contesta con una lección del catálogo.
  try {
    const t = C.queToca({}, null);
    if (!t || lista.indexOf(t.l) === -1) malos.push('queToca() en blanco no devuelve una lección del catálogo');
  } catch (e) { malos.push('queToca() falla: ' + e.message); }

  // El inicio y el Dashboard cargan el catálogo con un <script src>, y ninguno lleva lecciones escritas a mano.
  [['Aleman/index.html', 'lecciones-datos.js'], ['Dashboard/dashboard.html', '../Aleman/lecciones-datos.js']].forEach(function (a) {
    let h;
    try { h = leer(a[0]); } catch (e) { malos.push('no se puede leer ' + a[0]); return; }
    if (h.indexOf('<script src="' + a[1] + '"></script>') === -1) malos.push(a[0] + ' no carga ' + a[1] + ' con un <script src>');
    const copia = (h.match(/data-leccion="(a1|a2|k10)-\d\d"/g) || []).length + (h.match(/\bbloques\s*:\s*\[/g) || []).length;
    if (copia) malos.push(a[0] + ' vuelve a llevar ' + copia + ' lecciones escritas a mano: viven en Aleman/lecciones-datos.js');
  });

  // Cada foto del inicio existe y lleva su crédito; y no hay fotos sueltas que nadie usa.
  // Solo las <img> escritas en el HTML: las de las tarjetas las pinta el script con el nombre del catálogo.
  const ini = leer('Aleman/index.html'), usadas = new Set(lista.map(function (l) { return l.foto; }));
  const reFoto = /<img\b[^>]*\bsrc="fotos\/([\w.-]+\.(?:jpe?g|png|webp))"[^>]*>/g;
  while ((m = reFoto.exec(ini))) {
    usadas.add(m[1]);
    if (!fs.existsSync(path.join(dir, 'fotos', m[1]))) malos.push('fotos/' + m[1] + ' no existe');
    if (!/\btitle="Foto: [^"]+"/.test(m[0])) malos.push('fotos/' + m[1] + ' sin su crédito en el title');
  }
  const sueltas = fs.existsSync(path.join(dir, 'fotos'))
    ? fs.readdirSync(path.join(dir, 'fotos')).filter(function (f) { return !usadas.has(f); }) : [];
  if (sueltas.length) malos.push('fotos que nadie usa: ' + sueltas.join(', '));

  if (malos.length)
    problemas.push('Las lecciones de Alemán no cuadran con su catálogo (Aleman/lecciones-datos.js):\n  - ' + malos.slice(0, 12).join('\n  - '));
  else
    ok.push('Lecciones de Alemán: las ' + lista.length + ' de lecciones-datos.js con su página, ' +
            lista.filter(function (l) { return l.bloques; }).length + ' del Kapitel con sus ' + ejercicios + ' ejercicios y ' +
            usadas.size + ' fotos con crédito; las leen el inicio y Mi Día');
})();

/* ── 26. «Hoy» va en fecha LOCAL, nunca de toISOString() ─────────────────────────────────────
   toISOString() da la fecha UTC, y en México (UTC-6) ya es el día siguiente desde las 18:00: lo que se
   marcaba de noche (la rutina, la cena, el cierre del día) quedaba fechado mañana, en siete apps a la
   vez. La fecha del día sale de CIFRAS.fechaLocal(). Un cálculo que entra y sale en UTC a propósito
   lleva el comentario «UTC a propósito» en la misma línea. */
(function () {
  const re = /toISOString\(\)\s*\.\s*(slice\(\s*0\s*,\s*(7|10)\s*\)|substr\(\s*0\s*,\s*(7|10)\s*\)|split\(\s*['"]T['"]\s*\)\s*\[\s*0\s*\])/;
  const malos = [];
  let revisados = 0;
  (function recorre(dir) {
    fs.readdirSync(path.join(RAIZ, dir), { withFileTypes: true }).forEach(function (e) {
      const rel = dir ? dir + '/' + e.name : e.name;
      if (e.isDirectory()) { if (!/^(node_modules|\.git|syllabus)$/.test(e.name) && !/^diseno-/.test(e.name)) recorre(rel); return; }
      if (!/\.(html|js)$/.test(e.name) || /verificar-sincronia\.js$/.test(e.name)) return;
      revisados++;
      fs.readFileSync(path.join(RAIZ, rel), 'utf8').split(/\r?\n/).forEach(function (l, i) {
        if (re.test(l) && !/UTC a propósito/.test(l)) malos.push('     ' + rel + ':' + (i + 1) + '  ' + l.trim().slice(0, 90));
      });
    });
  })('');
  if (malos.length)
    problemas.push('Fechas sacadas de toISOString() (UTC: desde las 18:00 de México ya es mañana); usa CIFRAS.fechaLocal():\n' + malos.slice(0, 12).join('\n'));
  else
    ok.push('Fechas: ninguna app saca «hoy» de toISOString() (' + revisados + ' archivos revisados)');
})();

/* ── 27. Las lecciones de Alemán con su plantilla ────────────────────────────────────────────
   Las 41 lecciones, Principiantes y Gramática llevan la barra del inicio, en el encabezado la foto
   de su lección (la misma del inicio, con su crédito) y, las que tienen práctica, el panel
   .lec-practica con leccion.js después de k10-interactivo.js: «Tu avance» le pregunta a este qué
   ejercicios hay. Una lección hecha a mano sin alguna de esas piezas sale aquí. */
(function () {
  const dir = path.join(RAIZ, 'Aleman');
  if (!fs.existsSync(dir)) return;
  const pags = fs.readdirSync(dir).filter(function (f) {
    return /^(a1|a2|k10)-\d\d-[\w-]+\.html$/.test(f) || /^(principiantes|gramatica)\.html$/.test(f);
  });
  const malos = [];
  let practica = 0;
  pags.forEach(function (f) {
    const h = fs.readFileSync(path.join(dir, f), 'utf8');
    const faltan = [];
    if (!/<nav class="nav ini-barra"/.test(h)) faltan.push('la barra del inicio');
    const foto = /<figure class="lec-foto"><img src="fotos\/([^"]+)"[^>]*\btitle="Foto: [^"]+"/.exec(h);
    const suya = /^(a1|a2|k10)-(\d\d)-/.exec(f);
    if (!foto) faltan.push('la foto con su crédito');
    else if (!fs.existsSync(path.join(dir, 'fotos', foto[1]))) faltan.push('fotos/' + foto[1] + ', que no existe');
    else if (suya && foto[1] !== suya[1] + '-' + suya[2] + '.jpg') faltan.push('su foto (lleva fotos/' + foto[1] + ')');
    if (suya && !/class="container lec\b/.test(h)) faltan.push('las dos columnas (.lec)');
    if (/class="lec-practica"/.test(h)) {
      practica++;
      const iL = h.indexOf('src="leccion.js"'), iK = h.indexOf('src="k10-interactivo.js"');
      if (iL === -1) faltan.push('leccion.js');
      else if (iK !== -1 && iK > iL) faltan.push('leccion.js después de k10-interactivo.js');
    }
    if (faltan.length) malos.push(f + ': sin ' + faltan.join(', '));
  });
  if (malos.length)
    problemas.push('Lecciones de Alemán fuera de su plantilla (Aleman/readme_aleman.md → La plantilla de las lecciones):\n  - ' +
                   malos.slice(0, 12).join('\n  - '));
  else
    ok.push('Plantilla de Alemán: ' + pags.length + ' páginas con la barra del inicio y su foto; ' + practica +
            ' con su panel de práctica y leccion.js');
})();

/* ── 28. Ningún plan con fecha vencida ───────────────────────────────────────────────────────
   Entrevistas abría en «La entrevista es el martes 14 de julio — tienes 7 días» meses después de esa
   entrevista: una fecha y una cuenta regresiva escritas en prosa no avisan cuando pasan. Aquí se
   buscan las dos cosas en el texto de las apps: una fecha con su día de la semana («el martes 14 de
   julio» —el día fija el año— que ya pasó) y una cuenta escrita a mano («tienes 7 días», «faltan 3
   semanas»), que solo es verdad un día. Lo que va entre comillas es un ejemplo y no cuenta, ni los
   comentarios. Un archivo que guarda un plan viejo a propósito lo dice en su cabecera con
   «ARCHIVO —» (Entrevistas/js/data-wayve.js), y se salta. */
(function () {
  const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const DIAS = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const reFecha = new RegExp('(^|[^\\wáéíóúñ])(' + DIAS.join('|') + ') (\\d{1,2}) de (' + MESES.join('|') + ')(?![\\wáéíóúñ])', 'gi');
  const reCuenta = /(tienes|faltan|quedan|te quedan) (\d+) (días|semanas)/gi;
  const blanco = function (m) { return m.replace(/[^\n]/g, ' '); };
  const malos = [];
  let revisados = 0;
  (function recorre(dir) {
    fs.readdirSync(path.join(RAIZ, dir), { withFileTypes: true }).forEach(function (e) {
      const rel = dir ? dir + '/' + e.name : e.name;
      if (e.isDirectory()) { if (!/^(node_modules|\.git|syllabus)$/.test(e.name) && !/^diseno-/.test(e.name)) recorre(rel); return; }
      if (!/\.(html|js)$/.test(e.name) || /verificar-sincronia\.js$/.test(e.name)) return;
      let txt = fs.readFileSync(path.join(RAIZ, rel), 'utf8');
      if (/^[\s\S]{0,600}ARCHIVO —/.test(txt)) return;
      revisados++;
      txt = txt.replace(/\/\*[\s\S]*?\*\//g, blanco).replace(/<!--[\s\S]*?-->/g, blanco);
      txt.split(/\r?\n/).forEach(function (l, i) {
        if (/^\s*\/\//.test(l)) return;
        let m;
        reFecha.lastIndex = 0;
        while ((m = reFecha.exec(l))) {
          const dia = DIAS.indexOf(m[2].toLowerCase()), d = +m[3], mes = MESES.indexOf(m[4].toLowerCase());
          const años = [hoy.getFullYear() - 1, hoy.getFullYear(), hoy.getFullYear() + 1]
            .filter(function (a) { return new Date(a, mes, d).getDay() === dia; });
          if (años.length !== 1 || new Date(años[0], mes, d) >= hoy) continue;
          malos.push('     ' + rel + ':' + (i + 1) + '  «' + m[2] + ' ' + d + ' de ' + m[4] + '» (' + años[0] + ') ya pasó');
        }
        reCuenta.lastIndex = 0;
        while ((m = reCuenta.exec(l))) {
          if (/["«“]/.test(l.slice(Math.max(0, m.index - 3), m.index))) continue;
          malos.push('     ' + rel + ':' + (i + 1) + '  «' + m[0] + '» escrito a mano: solo es verdad un día');
        }
      });
    });
  })('');
  if (malos.length)
    problemas.push('Planes con fecha vencida o cuenta regresiva fija (si es archivo, «ARCHIVO —» en la cabecera del archivo):\n' + malos.slice(0, 12).join('\n'));
  else
    ok.push('Fechas de los planes: ninguna vencida ni cuenta regresiva escrita a mano (' + revisados + ' archivos revisados)');
})();

/* ── 29. Los precios del súper y el recetario, solo en el maestro ────────────────────────────
   El Dashboard tuvo su propio recetario (RECETAS_MINI) y su propia lista de precios mientras Comida
   y el maestro tenían otros: el costo del desayuno de la proyección salía de recetas que ya no eran
   las de Comida. Hoy viven en `PRECIOS_SUPER` y `RECETARIO`. Aquí se comprueba que ningún otro
   archivo vuelva a ponerle precio a un producto de la lista (`'Nombre': {… precio: …`), que ninguno
   copie el nombre de una receta ni arme otra lista de recetas con `ingredientes: [`. */
(function () {
  if (!global.window || !global.window.CIFRAS) return;   // el control 4 ya avisó
  const C = global.window.CIFRAS;
  const prod = Object.keys(C.PRECIOS_SUPER || {});
  const rec = ((C.RECETARIO && C.RECETARIO.todas) || []).map(function (r) { return r.nombre; }).filter(Boolean);
  const esc = function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
  const malos = [];
  (function recorre(dir) {
    fs.readdirSync(path.join(RAIZ, dir), { withFileTypes: true }).forEach(function (e) {
      const rel = dir ? dir + '/' + e.name : e.name;
      if (e.isDirectory()) { if (!/^(node_modules|\.git|syllabus)$/.test(e.name) && !/^diseno-/.test(e.name)) recorre(rel); return; }
      if (!/\.(html|js)$/.test(e.name) || /verificar-sincronia\.js$|datos-maestros\.js$/.test(e.name)) return;
      const txt = fs.readFileSync(path.join(RAIZ, rel), 'utf8');
      prod.forEach(function (n) {
        if (new RegExp('[\'"]' + esc(n) + '[\'"]\\s*:\\s*\\{[^}]*\\bprecio\\s*:').test(txt))
          malos.push('     ' + rel + '  le pone precio a «' + n + '»: ese precio vive en PRECIOS_SUPER');
      });
      rec.forEach(function (n) {
        if (txt.indexOf(n) !== -1) malos.push('     ' + rel + '  copia la receta «' + n + '»: léela de CIFRAS.RECETARIO');
      });
      const ing = (txt.match(/\bingredientes\s*:\s*\[/g) || []).length;
      if (ing >= 3) malos.push('     ' + rel + '  arma su propia lista de recetas (' + ing + ' con ingredientes): el recetario es CIFRAS.RECETARIO');
    });
  })('');
  if (malos.length)
    problemas.push('Precios del súper o recetas fuera del maestro:\n' + malos.slice(0, 12).join('\n'));
  else
    ok.push('Recetario y precios del súper: ' + rec.length + ' recetas y ' + prod.length + ' productos, solo en el maestro');
})();

/* ── 30. El dinero de la maestría: una sola cuenta ─────────────────────────────────────────────
   Mis Metas decía $17,250 y `{{maestria}}` —con él Coach— $53,740: el marcador leía `g001.current`,
   un número puesto a mano que nadie recalculaba, y Finanzas tenía cinco copias de la suma. Adán,
   2026-10-13: "te dije que ligaras los datos entre sí para que no pasara nunca esto". La suma es
   `CIFRAS.fondoMaestria()`. Aquí se comprueba que (1) el marcador y la función dan lo mismo con unos
   datos de prueba, (2) ninguna app lee el `current` de la meta de la maestría y (3) ninguna vuelve a
   sumar el fondo, las inversiones y el Bitcoin por su cuenta. */
(function () {
  const PRUEBA = { emergencyFund: 6000, debts: [], goals: [{ id: 'g001', target: 398000, current: 99999 }],
    investments: [{ id: 'i1', name: 'A', type: 'otro', value: 11250 }, { id: 'i2', name: 'B', type: 'cetes', invested: 500 }],
    btcHistory: [{ btc: 0.01 }], currentBtcPrice: 100000, usdMxn: 18 };
  let C;
  try {
    const ls = { getItem: k => (k === 'finanzasmx_v2' ? JSON.stringify(PRUEBA) : null), setItem: () => {} };
    C = new Function('window', 'localStorage', maestro + '; return window.CIFRAS;')({}, ls);
  } catch (e) { problemas.push('El maestro no carga con datos de prueba: ' + e.message); return; }
  if (!C || !C.fondoMaestria) { problemas.push('El maestro ya no exporta fondoMaestria(): {{maestria}} se quedaría sin su cuenta'); return; }
  const esperado = 6000 + 11250 + 500 + 0.01 * 100000 * 18;
  const fx = C.fondoMaestria(PRUEBA).total, marcador = C.n('maestria');
  const malos = [];
  if (Math.round(fx) !== esperado) malos.push('     fondoMaestria() da ' + fx + ' y debía dar ' + esperado + ' (fondo + inversiones + Bitcoin)');
  if (Math.round(marcador) !== esperado) malos.push('     {{maestria}} da ' + marcador + ' y fondoMaestria() ' + esperado + ': el marcador no sale de la función');
  const LEE = /\b(maestria2?|maes|mae|goalMae|_maeGoal)\??\.current\b/;
  const SUMA = /emergencyFund[^;\n]{0,90}\+[^;\n]{0,90}btc|btc[^;\n]{0,90}\+[^;\n]{0,90}emergencyFund/i;
  let revisados = 0;
  (function recorre(dir) {
    fs.readdirSync(path.join(RAIZ, dir), { withFileTypes: true }).forEach(function (e) {
      const rel = dir ? dir + '/' + e.name : e.name;
      if (e.isDirectory()) { if (!/^(node_modules|\.git|syllabus)$/.test(e.name) && !/^diseno-/.test(e.name)) recorre(rel); return; }
      if (!/\.(html|js)$/.test(e.name) || /verificar-sincronia\.js$|datos-maestros\.js$/.test(e.name)) return;
      revisados++;
      sinComentarios(fs.readFileSync(path.join(RAIZ, rel), 'utf8')).split('\n').forEach(function (l) {
        if ((/g001/.test(l) && /\.current\b/.test(l)) || LEE.test(l))
          malos.push('     ' + rel + '  lee el `current` de la meta de la maestría: usa CIFRAS.fondoMaestria() o {{maestria}}\n        ' + l.trim().slice(0, 110));
        else if (SUMA.test(l))
          malos.push('     ' + rel + '  suma fondo + Bitcoin por su cuenta: usa CIFRAS.fondoMaestria()\n        ' + l.trim().slice(0, 110));
      });
    });
  })('');
  if (malos.length) problemas.push('El dinero de la maestría ya no es una sola cuenta:\n' + malos.slice(0, 10).join('\n'));
  else ok.push('Dinero de la maestría: una sola cuenta (CIFRAS.fondoMaestria), {{maestria}} sale de ella y ninguna de ' + revisados + ' páginas la copia');
})();

/* ── 31. El sueño: la rutina, el hábito y lo que dicen las apps ────────────────────────────────
   La rutina dormía de 23:59 a 06:40 mientras el hábito se llamaba «Dormir 7 h», y «5h40–6h40», «el
   bloque de las 23:30» o «la meditación de las 23:10» estaban escritos a mano en cinco archivos.
   Adán, 2026-10-13: "corrige el tiempo de sueño". Aquí se comprueba que (1) la rutina de lunes a
   viernes da al menos 7 h —la salud va primero en el plan que todos sirven—, (2) la semilla de los
   hábitos de la noche dice las mismas horas que la rutina y (3) nadie vuelve a escribir cuánto duerme
   Adán: se cita {{horasSueno}}, {{horaDormir}}, {{horaApp}}… */
(function () {
  if (!global.window || !global.window.CIFRAS) return;   // el control 4 ya avisó
  const C = global.window.CIFRAS, malos = [];
  const RT = C.rutina(''), hora = id => (RT.filter(t => t.id === id)[0] || {}).hora;
  const aMin = x => +String(x).split(':')[0] * 60 + +String(x).split(':')[1];
  const dormir = hora('wd21'), despertar = hora('wd01'), app = hora('wd-app-pm'), noche = hora('wd-pm');
  if (!dormir || !despertar) { problemas.push('La rutina ya no tiene el bloque de dormir (wd21) o el de despertar (wd01): los marcadores del sueño se quedan sin fuente'); return; }
  const min = (aMin(despertar) - aMin(dormir) + 1440) % 1440;
  if (min < 420) malos.push('     la rutina de lunes a viernes da ' + Math.floor(min / 60) + ' h ' + (min % 60) + ' min de sueño (' + dormir + '–' + despertar + '): el mínimo es 7 h');
  const hab = leer('Dashboard/habitos.js');
  const sem = id => { const m = hab.match(new RegExp("\\{\\s*id:'" + id + "',\\s*nombre:'([^']*)',\\s*ancla:'([^']*)',\\s*hora:'([^']*)'")); return m ? { nombre: m[1], ancla: m[2], hora: m[3] } : null; };
  const s = sem('sueno'), a = sem('app'), p = sem('piel');
  if (!s) malos.push('     habitos.js: no encuentro la semilla del hábito de dormir (sueno)');
  else {
    if (s.hora !== dormir) malos.push('     habitos.js: el hábito de dormir va a las ' + s.hora + ' y la rutina apaga a las ' + dormir);
    if (s.nombre.indexOf(C.v('horasSueno')) === -1) malos.push('     habitos.js: el hábito se llama «' + s.nombre + '» y la rutina da ' + C.v('horasSueno'));
    if (s.ancla.indexOf(dormir) === -1 && s.ancla.indexOf('{{horaDormir}}') === -1) malos.push('     habitos.js: el anclaje «' + s.ancla + '» no dice la hora de dormir de la rutina (' + dormir + ')');
  }
  if (a && (a.ancla.indexOf(app) === -1 || a.ancla.indexOf(noche) === -1))
    malos.push('     habitos.js: «Construir esta app» dice «' + a.ancla + '» y la rutina le da de ' + app + ' a ' + noche);
  if (p && p.hora !== noche) malos.push('     habitos.js: «Rutina de la noche» va a las ' + p.hora + ' y en la rutina a las ' + noche);
  // Lo que se vigila es AFIRMAR cuánto duerme («5h40–6h40 de sueño», «duermes entre…»), no una meta
  // como «7 horas de sueño la mayoría de las noches» ni el tiempo de una carrera.
  const MANO = /\b\d{1,2}h\d{2}\s*(?:–|-|y|a)\s*\d{1,2}h\d{2}\s*de\s+sue|\bduermes (?:entre|\d)/i;
  let revisados = 0;
  (function recorre(dir) {
    fs.readdirSync(path.join(RAIZ, dir), { withFileTypes: true }).forEach(function (e) {
      const rel = dir ? dir + '/' + e.name : e.name;
      if (e.isDirectory()) { if (!/^(node_modules|\.git|syllabus)$/.test(e.name) && !/^diseno-/.test(e.name)) recorre(rel); return; }
      if (!/\.(html|js|md)$/.test(e.name) || /verificar-sincronia\.js$/.test(e.name)) return;
      revisados++;
      let txt = fs.readFileSync(path.join(RAIZ, rel), 'utf8');
      if (!/\.md$/.test(e.name)) txt = sinComentarios(txt);
      // La migración de los hábitos tiene que guardar los pasos viejos tal cual para reconocerlos.
      if (/habitos\.js$/.test(e.name)) { const pp = literal(txt, 'const PASOS_PREVIOS', '{'); if (pp) txt = txt.replace(pp, '{}'); }
      txt.split('\n').forEach(function (l) {
        if (MANO.test(l)) malos.push('     ' + rel + '  escribe a mano cuánto duerme: usa {{horasSueno}} / {{horaDormir}}\n        ' + l.trim().slice(0, 110));
      });
    });
  })('');
  if (malos.length) problemas.push('El sueño no cuadra entre la rutina, los hábitos y las apps:\n' + malos.slice(0, 10).join('\n'));
  else ok.push('Sueño: la rutina da ' + C.v('horasSueno') + ' (' + dormir + '–' + despertar + '), los hábitos de la noche dicen lo mismo y ninguno de ' + revisados + ' archivos lo escribe a mano');
})();

/* ── 32. Las frases de Mi Día no hablan de deudas que ya no existen ────────────────────────────
   Una frase citaba la Banamex meses después de liquidada y otra decía que el BYD «puede esperar»
   cuando ya era la única deuda con interés. Ninguna frase sin condición puede nombrar una deuda en
   $0, y la que nombre una viva lleva `si` (FRASE_SI) para salir del sorteo cuando se salde. Tampoco
   pueden escribir un monto: va con {{marcador}}. */
(function () {
  if (!global.window || !global.window.CIFRAS) return;
  const src = literal(dash, 'const FRASES_MOTIVACION', '[');
  const lista = src ? evaluar(src) : null;
  if (!lista) { problemas.push('No pude leer FRASES_MOTIVACION en dashboard.html'); return; }
  const seed = global.window.CIFRAS.DEUDAS_SEED || [];
  const malos = [];
  const escape = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  lista.forEach(function (f) {
    const t = typeof f === 'string' ? f : f.t, cond = typeof f === 'object' && f.si;
    if (/\$\d/.test(t)) malos.push('     escribe un monto a mano: «' + t.slice(0, 80) + '»');
    Object.keys(ALIAS_DEUDA).forEach(function (id) {
      const d = seed.filter(x => x.id === id)[0]; if (!d) return;
      ALIAS_DEUDA[id].forEach(function (a) {
        if (!new RegExp('\\b' + escape(a) + '\\b', 'i').test(t)) return;
        if (!(+d.balance > 0)) malos.push('     nombra «' + a + '», que está en $0: «' + t.slice(0, 80) + '»');
        else if (!cond && id !== 'd003') malos.push('     nombra «' + a + '» sin `si`: saldrá aunque se salde. «' + t.slice(0, 70) + '»');
      });
    });
  });
  if (malos.length) problemas.push('Frases de Mi Día desactualizadas:\n' + malos.slice(0, 10).join('\n'));
  else ok.push('Frases de Mi Día: ' + lista.length + ', ninguna nombra una deuda saldada ni escribe un monto a mano');
})();

/* ── 33. Los días de una fase: una sola cuenta ──────────────────────────────────────────────────
   El tablero del Plan Maestro decía «quedan 168 días · 26 semanas» y el calendario 169: uno contaba
   con la hora del reloj y sin el día de inicio. Adán, 2026-10-13: "arregla los días de las fases".
   La cuenta es `CIFRAS.diasFase()` (días de calendario; hoy ya corre). Aquí se comprueba con la
   Fase 1 a distintas horas del mismo día y que nadie vuelva a restar `.end - …` entre milisegundos de
   un día fuera del maestro (las líneas con `diasFase` son el respaldo de cuando el maestro no carga). */
(function () {
  if (!global.window || !global.window.CIFRAS || !global.window.CIFRAS.diasFase) { problemas.push('El maestro no exporta diasFase(): los días de fase no tienen cuenta única'); return; }
  const C = global.window.CIFRAS, f = { start: new Date(2026, 9, 1), end: new Date(2027, 2, 31) }, malos = [];
  [[0, 5], [12, 0], [22, 47], [23, 59]].forEach(function (hm) {
    const r = C.diasFase(f, new Date(2026, 9, 13, hm[0], hm[1]));
    if (r.largo !== 182 || r.corrido !== 13 || r.quedan !== 169)
      malos.push('     a las ' + hm.join(':') + ' del 13-oct la Fase 1 da día ' + r.corrido + ' de ' + r.largo + ', quedan ' + r.quedan + ' (debía: 13 de 182, quedan 169)');
  });
  const RESTA = /\.end\s*-\s*[\w.]+\s*\)\s*\/\s*(86400000|864e5|msDia|DIA)\b/;
  [['Dashboard/dashboard.html', dash], ['Coach/Coach.html', coach]].forEach(function (par) {
    sinComentarios(par[1]).split('\n').forEach(function (l) {
      if (RESTA.test(l) && !/diasFase|30\.44/.test(l)) malos.push('     ' + par[0] + '  cuenta días de fase por su cuenta: usa CIFRAS.diasFase()\n        ' + l.trim().slice(0, 110));
    });
  });
  if (malos.length) problemas.push('Los días de fase no salen de una sola cuenta:\n' + malos.slice(0, 8).join('\n'));
  else ok.push('Días de fase: una sola cuenta (CIFRAS.diasFase) — la Fase 1 da 13 de 182 y quedan 169 a cualquier hora del 13-oct');
})();

/* ── 34. Hoy aprendes se entiende sin conocer la app ─────────────────────────────────────────────
   Adán, 19-oct-2026: "el texto de hoy aprendes… ni se entiende para nada, si una persona que no sabe de mi app
   no va a saber ni de qué se trata, debe ser muy claro y muy entendible". Cada tarjeta de Mi Día abre con una
   frase de qué se trata (`.ap-que`) y sin siglas sueltas en su cabecera; y Qué invertir hoy, que ocupa el
   lugar de Python, sale de la misma regla que su panel (`pasoInversionHoy()`), nunca de una copia. Aquí se
   lee la lista de tarjetas de `renderHeroAprender()` y se revisa cada una. */
(function () {
  const cuerpo = function (fn) {
    const i = dash.indexOf('function ' + fn + '(');
    if (i < 0) return null;
    const m = /\n\}\r?\n/.exec(dash.slice(i));
    return m ? dash.slice(i, i + m.index) : null;
  };
  const malos = [], r = cuerpo('renderHeroAprender');
  const lista = r && (r.match(/class="ap-seis">([\s\S]*?)<\/div>/) || [])[1];
  const fns = lista ? (lista.match(/\$\{(\w+)\(/g) || []).map(function (x) { return x.slice(2, -1); }) : [];
  if (fns.length !== 6) malos.push('renderHeroAprender() debía pintar seis tarjetas y pinta ' + fns.length);
  fns.forEach(function (fn) {
    const c = cuerpo(fn);
    if (!c) { malos.push(fn + '() no existe'); return; }
    if (c.indexOf('class="ap-que') < 0) malos.push(fn + '() no dice de qué se trata la tarjeta (falta su frase .ap-que)');
    const mat = (c.match(/mat\s*:\s*(`[^`]*`|'[^']*')/) || [])[1] || '';
    if (/\bK\d|Cap\.|\$\{[^}]*\}\/\$\{/.test(mat)) malos.push(fn + '() lleva una sigla suelta en su cabecera: ' + mat.slice(0, 60));
  });
  const inv = cuerpo('invertirHoyHtml');
  if (fns.indexOf('invertirHoyHtml') < 0) malos.push('Qué invertir hoy no está entre las tarjetas de Hoy aprendes');
  if (!inv || inv.indexOf('pasoInversionHoy()') < 0) malos.push('invertirHoyHtml() no lee la regla de pasoInversionHoy()');
  if ((cuerpo('renderGBMPanel') || '').indexOf('pasoInversionHoy()') < 0) malos.push('el panel de Qué invertir hoy no lee pasoInversionHoy()');
  if (/id="diaInvertirBtn"|id="pythonOverlay"/.test(dash)) malos.push('dashboard.html todavía tiene el botón suelto de Qué invertir hoy o la ventana de Python');
  // Lo que enseñan las tarjetas viene revisado, nunca un pedazo del texto largo (Adán: "solo pones información sin
  // revisarla, debe ser muy claro lo que dice ahí"): cada paso de ejercicio con su versión corta (`corto`, en el
  // maestro), cada audio de DIDI_AUDIO con de qué trata (`trata`) y las ideas de las guías (HB_IDEA) alineadas con
  // los pasos de su guía.
  const A = (global.window && global.window.CIFRAS && global.window.CIFRAS.APRENDIZAJE) || {};
  const sinCorto = [];
  Object.keys(A).forEach(function (id) { (A[id].subs || []).forEach(function (x) { if (!x.corto) sinCorto.push(id + ' · ' + x.n); }); });
  if (sinCorto.length) malos.push(sinCorto.length + ' pasos de ejercicio sin su versión corta (corto, en datos-maestros.js): ' + sinCorto.slice(0, 4).join('; '));
  const audios = evaluar(literal(dash, 'const DIDI_AUDIO=', '[')) || [];
  const sinTrata = [];
  audios.forEach(function (g) { (g.items || []).forEach(function (it) { if (!it.trata) sinTrata.push(it.n); }); });
  if (!audios.length) malos.push('no pude leer DIDI_AUDIO');
  if (sinTrata.length) malos.push(sinTrata.length + ' audios sin «de qué trata» (trata, en DIDI_AUDIO): ' + sinTrata.slice(0, 4).join('; '));
  const HI = evaluar(literal(dash, 'const HB_IDEA =', '{')) || {}, HD = evaluar(literal(dash, 'const HABILIDAD_DETALLE=', '{')) || {};
  Object.keys(HI).forEach(function (id) {
    const n = ((HD[id] || {}).pasos || []).length;
    if (n !== HI[id].length) malos.push('HB_IDEA.' + id + ' trae ' + HI[id].length + ' ideas y la guía tiene ' + n + ' pasos');
  });
  if (malos.length) problemas.push('Hoy aprendes no se entiende solo:\n  - ' + malos.join('\n  - '));
  else ok.push('Hoy aprendes: seis tarjetas (' + fns.join(', ') + '), cada una con su frase de qué se trata, sus textos revisados (' + Object.keys(A).length + ' habilidades con versión corta, ' + audios.reduce(function (t, g) { return t + (g.items || []).length; }, 0) + ' audios con de qué trata, ideas de ' + Object.keys(HI).join(', ') + ') y Qué invertir hoy con la regla de su panel');
})();

/* ── 35. El hábito del Gimnasio toca los días con sesión de la rutina ──────────────────────────────
   El miércoles era natación y el hábito no lo tenía; cuando la rutina lo cambió por intervalos en el gym
   (10-oct-2026), el hábito siguió sin el miércoles y su celda no se podía marcar. Adán, 15-oct-2026:
   "aparece que no puedo modificar los miércoles, pero los miércoles sí voy al gym". Los días de la semilla
   (`dow` de `gym` en habitos.js) deben ser los de GYM_RUTINA_DEFAULT que no son de descanso. */
(function () {
  const R = evaluar(literal(dash, 'const GYM_RUTINA_DEFAULT=', '{'));
  const m = leer('Dashboard/habitos.js').match(/\{\s*id:'gym',[^}]*?dow:\[([\d,\s]*)\]/);
  if (!R || !m) { avisos.push('Gimnasio: no se pudo leer la rutina del gym o la semilla del hábito; comprobar a mano'); return; }
  const DIA = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const sesion = Object.keys(R).map(Number).filter(function (d) { return R[d] && R[d].tipo !== 'descanso'; }).sort();
  const dow = m[1].split(',').map(function (x) { return +x; }).filter(function (x) { return !isNaN(x); }).sort();
  const faltan = sesion.filter(function (d) { return dow.indexOf(d) === -1; }), sobran = dow.filter(function (d) { return sesion.indexOf(d) === -1; });
  if (faltan.length || sobran.length)
    problemas.push('El hábito del Gimnasio no toca los días con sesión de la rutina (habitos.js contra GYM_RUTINA_DEFAULT):' +
      (faltan.length ? '\n     le faltan: ' + faltan.map(function (d) { return DIA[d] + ' (' + R[d].nombre + ')'; }).join(', ') : '') +
      (sobran.length ? '\n     le sobran: ' + sobran.map(function (d) { return DIA[d]; }).join(', ') : ''));
  else ok.push('Gimnasio: el hábito toca los ' + sesion.length + ' días con sesión de la rutina (' + sesion.map(function (d) { return DIA[d]; }).join(', ') + ')');
})();

/* ── 36. La regla de la tarjeta vive en el maestro ─────────────────────────────────────────────────
   Una compra con «TC BBVA» en la nota sube el saldo de la tarjeta y un pago lo baja (Adán, 15-oct-2026:
   "debe actualizarse lo de tarjeta de bbva solito, en base a cuánto gasto y cuánto gano cada día"). La
   regla es una sola, `tarjetaDe` / `movimientoTarjeta` en datos-maestros.js: Finanzas mueve el saldo con
   ella y el Dashboard decide con ella qué no sale de la caja. Si una de las dos vuelve a buscar por su
   cuenta las palabras de las tarjetas, las dos apps dejan de estar de acuerdo sobre qué fue a crédito. */
(function () {
  const fin = leer('Finanzas/Finanzas.html'), mal = [];
  if (dash.indexOf('CIFRAS.tarjetaDe(') === -1) mal.push('el Dashboard ya no usa CIFRAS.tarjetaDe');
  if (fin.indexOf('CIFRAS.movimientoTarjeta(') === -1) mal.push('Finanzas ya no usa CIFRAS.movimientoTarjeta');
  // Una copia de la regla: filtrar las tarjetas de crédito y buscar las palabras de su nombre a mano.
  [['Dashboard/dashboard.html', dash], ['Finanzas/Finanzas.html', fin]].forEach(function (a) {
    let i = -1;
    while ((i = a[1].indexOf("'credit_card'", i + 1)) !== -1) {
      if (/alabras\(\s*d\.name/.test(a[1].slice(i, i + 320))) { mal.push(a[0] + ' busca otra vez las palabras de las tarjetas (línea ' + a[1].slice(0, i).split('\n').length + ')'); break; }
    }
  });
  // «Ya lo mandé» deja la marca con la que Finanzas puede deshacer el pago.
  const anota = (dash.match(/function bbvaAnotar\([\s\S]*?\n\}/) || [''])[0];
  if (!/tarjeta:\s*\{\s*id:\s*'d001'/.test(anota)) mal.push('bbvaAnotar ya no guarda la marca `tarjeta` en la transacción');
  if (mal.length) problemas.push('La regla de la tarjeta dejó de ser una sola:\n     ' + mal.join('\n     '));
  else ok.push('Tarjeta: una sola regla (CIFRAS.tarjetaDe / movimientoTarjeta) para Finanzas y el Dashboard; «Ya lo mandé» deja su marca');
})();

/* ── 37. La BBVA se actualiza con los días ──────────────────────────────────────────────────────────
   Adán, 17-oct-2026: "no se actualiza conforme a los días". El saldo solo bajaba si confirmaba cada abono,
   y con el Dashboard abierto de un día para otro el Plan Maestro seguía en el día viejo. Los abonos del plan
   se restan solos: el maestro llama a aplicarPlanBbva al cargar (antes de la proyección) y el reloj del
   Dashboard la vuelve a llamar cuando cambia la fecha (ceNuevoDia). */
(function () {
  const M = leer('Dashboard/datos-maestros.js'), mal = [];
  const iCarga = M.indexOf('if (aplicarPlanBbva() + aplicarPagosFijos()) leer();'), iProy = M.indexOf('PROYECCION.meses = proyectar();');
  if (iCarga === -1) mal.push('el maestro ya no anota solos los abonos de la BBVA y las mensualidades al cargar (aplicarPlanBbva + aplicarPagosFijos)');
  else if (iProy !== -1 && iCarga > iProy) mal.push('el maestro resta los abonos después de la proyección: la proyección nacería con el saldo viejo');
  const reloj = (dash.match(/function tickClock\(\)\{[\s\S]*?\n\}/) || [''])[0];
  if (reloj.indexOf('ceNuevoDia()') === -1) mal.push('el reloj del Dashboard ya no nota el cambio de día (ceNuevoDia)');
  if (!/function ceNuevoDia\(\)\{[\s\S]*?CIFRAS\.aplicarPlanBbva\(\)/.test(dash)) mal.push('ceNuevoDia ya no resta los abonos que llegaron');
  if (!/function ceNuevoDia\(\)\{[\s\S]*?CIFRAS\.aplicarPagosFijos\(\)/.test(dash)) mal.push('ceNuevoDia ya no anota las mensualidades que llegaron');
  if (mal.length) problemas.push('La BBVA dejó de actualizarse con los días:\n     ' + mal.join('\n     '));
  else ok.push('BBVA y mensualidades: los abonos del plan y las mensualidades fijas se anotan solos al cargar y al cambiar el día con el Dashboard abierto');
})();

/* ── 38. Cada mes de cada fase tiene su plan completo ───────────────────────────────────────────────
   Adán, 18-oct-2026: "en todas las fases cada mes tiene un plan completo". La ventana de las fases pinta un
   mes por pestaña con CIFRAS.planMes: lo que tiene que quedar hecho, lo de todo el mes, el foco, el dinero y
   las fechas, y ahí se audita al cerrarlo. Desde la Fase 1, un mes sin el dinero de la proyección o con menos
   de tres cosas que hacer es un mes vacío. Los `id` de `mensual` son el contrato con la auditoría
   (`plan_auditoria_v1`): no se repiten ni chocan con los de las tareas. */
(function () {
  if (!global.window || !global.window.CIFRAS || !global.window.CIFRAS.planMes) { problemas.push('El maestro ya no exporta planMes: la ventana de las fases se queda sin el plan de cada mes'); return; }
  const C = global.window.CIFRAS, ym = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
  const flojos = [], ids = {}, dup = [];
  let meses = 0;
  C.PHASES.forEach(function (f, i) {
    (f.semanas || []).concat(f.mensual || []).forEach(function (x) { if (ids[x.id]) dup.push(x.id); ids[x.id] = 1; });
    if (i === 0) return;                       // la Fase 0 cerró antes de la proyección
    for (let k = ym(f.start); k <= ym(f.end); ) {
      const P = C.planMes(k), cosas = P.tareas.length + P.salida.length + P.mensual.length + P.siempre.length;
      meses++;
      if (!P.dinero || cosas < 3 || (P.metas || []).length < 2)
        flojos.push(k + ' (' + f.tag + (P.dinero ? '' : ', sin dinero') + ', ' + cosas + ' cosas, ' + (P.metas || []).length + ' cifras)');
      const p = k.split('-').map(Number); k = ym(new Date(p[0], p[1], 1));
    }
  });
  if (flojos.length || dup.length)
    problemas.push('Meses de las fases sin plan completo (CIFRAS.planMes):' + (flojos.length ? '\n     ' + flojos.join('\n     ') : '') +
      (dup.length ? '\n     ids repetidos en semanas/mensual: ' + dup.join(', ') : ''));
  else ok.push('Fases: los ' + meses + ' meses de las fases 1 a 4 tienen plan completo —tareas o rutina, el dinero de la proyección y sus cifras para auditar—, con ids únicos');
})();

/* ── 39. Los hábitos de la PC llegan a los otros dispositivos ───────────────────────────────────────
   Adán, 19-oct-2026: "crea un hook que actualice esa info que tenemos aquí, que cada día cuando haga algún
   commit, de cualquier cosa se actualicen los hábitos". El hook de pre-commit (.githooks/pre-commit, activo
   con core.hooksPath) corre habitos-exportar.js, que escribe habitos-sync.js con las marcas del Chrome de la
   PC; el Dashboard lo carga antes de habitos.js, y habitos.js lo trae (delRepo) y deja la hora de lo que se
   toca en cada dispositivo (tocado). Si una pieza falta, el iPad deja de recibir los hábitos sin que se note. */
(function () {
  const malos = [];
  const existe = rel => fs.existsSync(path.join(RAIZ, rel));
  if (!existe('.githooks/pre-commit') || leer('.githooks/pre-commit').indexOf('habitos-exportar.js') === -1) malos.push('.githooks/pre-commit ya no corre habitos-exportar.js');
  if (!existe('Dashboard/habitos-exportar.js')) malos.push('falta Dashboard/habitos-exportar.js');
  const h = leer('Dashboard/dashboard.html'), iS = h.indexOf('<script src="habitos-sync.js"'), iH = h.indexOf('<script src="habitos.js"');
  if (iS === -1 || iS > iH) malos.push('dashboard.html tiene que cargar habitos-sync.js antes que habitos.js');
  const hb = leer('Dashboard/habitos.js');
  if (hb.indexOf('window.HABITOS_SYNC') === -1 || hb.indexOf('function delRepo') === -1) malos.push('habitos.js ya no trae lo de habitos-sync.js (delRepo)');
  if ((hb.match(/tocado\(\);/g) || []).length < 4) malos.push('habitos.js dejó de anotar la hora de lo que se toca (tocado) en alguno de sus cambios');
  let det = 'todavía sin exportar';
  if (existe('Dashboard/habitos-sync.js')) {
    try {
      const w = {}; new Function('window', leer('Dashboard/habitos-sync.js'))(w);
      const X = w.HABITOS_SYNC, d = X && X.datos;
      if (!X || !/^\d{4}-\d{2}-\d{2}T/.test(X.exportado || '') || !d || !Array.isArray(d.def) || typeof d.marcas !== 'object') malos.push('habitos-sync.js no tiene la forma {exportado, datos: {def, marcas}}');
      else det = d.def.length + ' hábitos y ' + Object.keys(d.marcas).length + ' días, exportados el ' + X.exportado.slice(0, 10);
    } catch (e) { malos.push('habitos-sync.js no se puede leer: ' + e.message); }
  }
  let ruta = '';
  try { ruta = require('child_process').execSync('git config --get core.hooksPath', { cwd: RAIZ, encoding: 'utf8' }).trim(); } catch (e) { ruta = ''; }
  if (malos.length) problemas.push('Hábitos a los otros dispositivos:\n     ' + malos.join('\n     '));
  else ok.push('Hábitos: el hook de pre-commit los exporta y el Dashboard los trae (' + det + ')' + (ruta ? '' : ' — en esta copia falta activar el hook: git config core.hooksPath Claude_Proyecto/.githooks'));
})();

/* ── 40. Finanzas no se queda atrás ──────────────────────────────────────────────────────────────────
   Adán, 19-oct-2026: "siempre en finanzas algo está desactualizado, revísalo, arréglalo y que no vuelva a
   pasar". Lo que se quedaba atrás eran copias y modelos propios: una lista de acciones de junio
   (WEEKLY_PICKS), un estimado de ahorro y una proyección con rendimiento inventado que contradecían al plan,
   la BBVA contada como la suma de lo que el plan suponía en vez de su saldo vivo, el auto y el iPhone con el
   saldo del día en que se dijeron, dos fechas distintas para la última cuota del iPhone, presupuestos fijos
   escritos a mano y una resiembra que borraba los datos. Cada uno vuelve a fallar aquí. */
(function () {
  const F = leer('Finanzas/Finanzas.html'), M = leer('Dashboard/datos-maestros.js'), mal = [];
  if (/WEEKLY_PICKS\s*=/.test(F)) mal.push('Finanzas volvió a tener su propia lista de acciones (WEEKLY_PICKS): la da Qué invertir hoy');
  if (F.indexOf('../Dashboard/inversion-hoy.js') === -1) mal.push('Finanzas ya no carga inversion-hoy.js (Qué invertir hoy)');
  if (/0\.10\s*\/\s*12|\*\s*1\.15\b|monthGBMCalc|scE_mo/.test(F)) mal.push('Finanzas volvió a proyectar con un modelo propio (sobrante estimado o rendimiento supuesto): la proyección es la del maestro');
  if (F.indexOf('CIFRAS.gbmMes') === -1) mal.push('el plan de inversiones de Finanzas ya no sale de CIFRAS.gbmMes');
  if (/Debe según el plan|debe hoy según tu plan/.test(F) || F.indexOf('CIFRAS.bbvaEstado') === -1 && F.indexOf('C.bbvaEstado') === -1) mal.push('Finanzas volvió a contar la BBVA con lo que el plan suponía, no con su saldo vivo (bbvaEstado)');
  if ((F.match(/CIFRAS\.cuotas\(d\)/g) || []).length < 2) mal.push('la última cuota de las deudas a plazo ya no sale de una sola cuenta (CIFRAS.cuotas) en la hoja de ruta y en las suscripciones');
  if (F.indexOf('function budgetLimit') === -1 || /\(sp\/b\.limit\)/.test(F)) mal.push('los presupuestos fijos volvieron a leer el límite escrito a mano en vez del plan (budgetLimit)');
  const iBorra = F.indexOf('localStorage.removeItem(KEY);'), iGuarda = F.indexOf("no se resiembra");
  if (iBorra !== -1 && (iGuarda === -1 || iGuarda > iBorra)) mal.push('seedData puede volver a borrar los datos de un navegador que ya los tiene');
  // Toda deuda a plazo viva del seed lleva `pagosAl`: sin él, su saldo se congela.
  try {
    const C = global.window && global.window.CIFRAS;
    (C ? C.DEUDAS_SEED : []).forEach(function (d) {
      if (d.type !== 'credit_card' && +d.balance > 0 && +d.min > 0 && +d.day > 0 && !d.pagosAl) mal.push(d.id + ' (' + d.name + ') es una deuda a plazo sin pagosAl: sus mensualidades no se aplicarían solas');
    });
  } catch (e) {}
  if (M.indexOf('function aplicarPagosFijos') === -1) mal.push('el maestro ya no tiene aplicarPagosFijos');
  if (mal.length) problemas.push('Finanzas se puede volver a quedar atrás:\n     ' + mal.join('\n     '));
  else ok.push('Finanzas al día: sin listas ni proyecciones propias, la BBVA con su saldo vivo, las mensualidades solas, una sola cuenta de las cuotas, los presupuestos fijos del plan y una resiembra que no borra');
  // Lo que Claude investiga para Qué invertir hoy envejece: se avisa (actualizarlo cuesta una corrida de Claude).
  ['inversion-hoy.js', 'inversion-alto.js', 'inversion-superalto.js'].forEach(function (f) {
    try {
      const m = /"generado"\s*:\s*"(\d{4}-\d{2}-\d{2})/.exec(leer('Dashboard/' + f));
      const dias = m ? Math.round((new Date() - new Date(m[1] + 'T12:00:00')) / 86400000) : null;
      if (dias != null && dias > 14) avisos.push('Qué invertir hoy · ' + f + ' se investigó hace ' + dias + ' días: actualízalo antes de comprar (el botón 🤖 del panel o inversion-actualizar.ps1)');
    } catch (e) {}
  });
})();

// ── Salida ──
if (process.argv.indexOf('--hook') !== -1) {
  const partes = [];
  if (problemas.length)
    partes.push('DATOS DESINCRONIZADOS (' + problemas.length + ')\n\n' + problemas.join('\n\n') +
      '\n\nDetalle: node Dashboard/verificar-sincronia.js');
  const imp = impactoDelCambio();
  if (imp) partes.push(imp);
  const pr = promptsDeLoTocado();
  if (pr) partes.push(pr);
  if (partes.length) process.stdout.write(JSON.stringify({ systemMessage: partes.join('\n\n────────\n\n') }));
  process.exit(0);   // el hook informa, no bloquea
}

// La fecha del encabezado, LOCAL (control 26): a las 22:44 de México el ISO ya decía «mañana».
console.log('\nVERIFICAR SINCRONÍA — ' + (global.window && global.window.CIFRAS ? global.window.CIFRAS.fechaLocal() : new Date().toLocaleDateString('sv')));
console.log('='.repeat(70));
if (ok.length) { console.log('\nOK'); ok.forEach(l => console.log('  ✔ ' + l)); }
if (avisos.length) { console.log('\nAVISOS (no está roto, pero es deuda pendiente)'); avisos.forEach(l => console.log('  ! ' + l)); }
if (problemas.length) { console.log('\nDESINCRONIZADO'); problemas.forEach(l => console.log('  ✘ ' + l)); }
else console.log('\nNada desincronizado.');
const _imp = impactoDelCambio();
if (_imp) { console.log(''); console.log(_imp); }
const _pr = promptsDeLoTocado();
if (_pr) { console.log(''); console.log(_pr); }
console.log('');
process.exit(problemas.length ? 1 : 0);
