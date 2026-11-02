/* ══════════════════════════════════════════════════════════════════════════════════════════
   LOS HÁBITOS Y LA AUDITORÍA DE LA PC, AL REPOSITORIO — lo corre el hook de pre-commit
   ══════════════════════════════════════════════════════════════════════════════════════════
   Adán, 19-oct-2026: "con respecto a hábitos, yo los actualizaré desde mi pc… pero quiero que se
   reflejen las actualizaciones en mis otros dispositivos, entonces crea un hook que actualice esa
   info que tenemos aquí, que cada día cuando haga algún commit, de cualquier cosa se actualicen los
   hábitos, así la mayor parte del tiempo estará actualizado y tendríamos métricas". Y el 1-nov-2026:
   "sube los datos de mis hábitos y auditoría".

   Los hábitos viven en `localStorage['dash-habitos-v1']` del Chrome de la PC (origen file://); la
   auditoría de cada mes de las fases, en `plan_auditoria_v1`, y cuándo se tocó cada mes, en
   `plan_auditoria_sinc`. Este script copia la base de datos de ese almacenamiento a una carpeta
   temporal, la abre con el mismo Chrome en modo invisible y con un perfil aparte —nunca el de Adán:
   su navegador abierto no se toca— y escribe lo que encuentra en `Dashboard/habitos-sync.js` y
   `Dashboard/auditoria-sync.js`, que la página publicada carga en el iPad y en cualquier otro
   dispositivo (`habitos.js` funde los hábitos y `fzmDelRepo` trae cada mes auditado, ver *Tu iPad y
   tu PC* en readme_dashboard.md). Cada archivo se escribe solo si lo suyo cambió, y con `--add`
   queda listo para el commit en curso.

   Y los saldos de Finanzas (Adán, 2-nov-2026: en el iPad las cifras del Plan Maestro salían en «Sin datos»; eligió
   subir solo las cifras resumidas, sin sus movimientos): de `finanzasmx_v2` salen únicamente las deudas, el fondo,
   las inversiones, los activos y el Bitcoin sumado en un solo lote —ni movimientos, ni notas, ni historial—, más lo
   que queda en la cuenta de la quincena que el Dashboard guarda en `fin_resumen_v1`. Van a `finanzas-sync.js`.

   Nunca detiene un commit: si no encuentra Chrome, el perfil o la clave, lo dice en una línea y sale
   con 0. `HABITOS_CHROME` y `HABITOS_PERFIL` cambian la ruta de Chrome y la de su perfil.

     node Dashboard/habitos-exportar.js          # escribe los dos archivos si cambiaron
     node Dashboard/habitos-exportar.js --add    # y los agrega al commit (así lo llama el hook)
   ══════════════════════════════════════════════════════════════════════════════════════════ */
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');

const SALIDA = path.join(__dirname, 'habitos-sync.js');
const SALIDA_AUD = path.join(__dirname, 'auditoria-sync.js');
const SALIDA_FIN = path.join(__dirname, 'finanzas-sync.js');
const CLAVE = 'dash-habitos-v1', CLAVE_AUD = 'plan_auditoria_v1', CLAVE_SINC = 'plan_auditoria_sinc';
const CLAVE_FIN = 'finanzasmx_v2', CLAVE_RES = 'fin_resumen_v1';
const di = m => console.log('hábitos · ' + m);
const da = m => console.log('auditoría · ' + m);
const df = m => console.log('finanzas · ' + m);

function chrome() {
  const env = process.env, c = [env.HABITOS_CHROME,
    env.ProgramFiles && path.join(env.ProgramFiles, 'Google/Chrome/Application/chrome.exe'),
    env['ProgramFiles(x86)'] && path.join(env['ProgramFiles(x86)'], 'Google/Chrome/Application/chrome.exe'),
    env.LOCALAPPDATA && path.join(env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe')];
  return c.filter(Boolean).find(p => fs.existsSync(p)) || null;
}
function perfil() {
  const p = process.env.HABITOS_PERFIL || (process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Google/Chrome/User Data/Default'));
  const ldb = p && path.join(p, 'Local Storage', 'leveldb');
  return ldb && fs.existsSync(ldb) ? ldb : null;
}

// Lee las claves de una COPIA del almacenamiento, con Chrome invisible y un --user-data-dir propio.
// Devuelve {clave: valor ya leído de JSON, o null si no está}.
function leer(exe, ldb, claves) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'habitos-'));
  try {
    const dest = path.join(tmp, 'perfil', 'Default', 'Local Storage', 'leveldb');
    fs.mkdirSync(dest, { recursive: true });
    for (const f of fs.readdirSync(ldb)) if (f !== 'LOCK') fs.copyFileSync(path.join(ldb, f), path.join(dest, f));
    const html = path.join(tmp, 'leer.html');
    fs.writeFileSync(html, '<!doctype html><meta charset="utf-8"><body><script>' +
      'var o = {};' + JSON.stringify(claves) + '.forEach(function (k) { o[k] = localStorage.getItem(k); });' +
      'document.body.textContent = "@@" + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + "@@";</script>');
    const r = spawnSync(exe, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
      '--disable-extensions', '--user-data-dir=' + path.join(tmp, 'perfil'), '--dump-dom',
      'file:///' + html.replace(/\\/g, '/')], { timeout: 40000, encoding: 'utf8', windowsHide: true });
    const m = /@@([^@]*)@@/.exec(r.stdout || '');
    if (!m) throw new Error('Chrome no devolvió nada' + (r.error ? ' (' + r.error.message + ')' : ''));
    const o = JSON.parse(Buffer.from(m[1], 'base64').toString('utf8')), v = {};
    claves.forEach(k => { try { v[k] = o[k] ? JSON.parse(o[k]) : null; } catch (e) { v[k] = null; } });
    return v;
  } finally {
    try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (e) { /* una carpeta temporal que queda no importa */ }
  }
}

// Una línea por hábito y una por día: así el historial de git enseña qué se marcó cada día.
function escribir(exportado, d) {
  const L = [];
  L.push('/* Las marcas de hábitos de la PC, para tus otros dispositivos. Lo escribe el hook de pre-commit');
  L.push('   (Dashboard/habitos-exportar.js) con lo que guarda el Chrome de la PC: no se edita a mano. */');
  L.push('window.HABITOS_SYNC = {');
  L.push('  "exportado": ' + JSON.stringify(exportado) + ',');
  L.push('  "datos": {');
  L.push('    "desde": ' + JSON.stringify(d.desde || null) + ',');
  L.push('    "mig": ' + JSON.stringify(d.mig || null) + ',');
  L.push('    "def": [');
  d.def.forEach((h, i) => L.push('      ' + JSON.stringify(h) + (i < d.def.length - 1 ? ',' : '')));
  L.push('    ],');
  L.push('    "marcas": {');
  const dias = Object.keys(d.marcas).sort();
  dias.forEach((f, i) => L.push('      ' + JSON.stringify(f) + ': ' + JSON.stringify(d.marcas[f]) + (i < dias.length - 1 ? ',' : '')));
  L.push('    }');
  L.push('  }');
  L.push('};');
  fs.writeFileSync(SALIDA + '.tmp', L.join('\n') + '\n', 'utf8');
  fs.renameSync(SALIDA + '.tmp', SALIDA);
}
// Un mes por línea: así el historial de git enseña qué mes cambió. `meses` dice cuándo se tocó cada mes en la PC.
function escribirAud(exportado, meses, d) {
  const L = [], ks = Object.keys(d).sort();
  L.push('/* La auditoría de cada mes de las fases, de la PC para tus otros dispositivos. Lo escribe el hook de');
  L.push('   pre-commit (Dashboard/habitos-exportar.js) con lo que guarda el Chrome de la PC: no se edita a mano. */');
  L.push('window.AUDITORIA_SYNC = {');
  L.push('  "exportado": ' + JSON.stringify(exportado) + ',');
  L.push('  "meses": ' + JSON.stringify(meses) + ',');
  L.push('  "datos": {');
  ks.forEach((ym, i) => L.push('    ' + JSON.stringify(ym) + ': ' + JSON.stringify(d[ym]) + (i < ks.length - 1 ? ',' : '')));
  L.push('  }');
  L.push('};');
  fs.writeFileSync(SALIDA_AUD + '.tmp', L.join('\n') + '\n', 'utf8');
  fs.renameSync(SALIDA_AUD + '.tmp', SALIDA_AUD);
}
function previo(f) {
  try {
    const t = fs.readFileSync(f, 'utf8'), i = t.indexOf('{'), j = t.lastIndexOf('}');
    return JSON.parse(t.slice(i, j + 1));
  } catch (e) { return null; }
}
function agregar(f, dice) {
  if (process.argv.indexOf('--add') === -1) return;
  const r = spawnSync('git', ['-c', 'core.autocrlf=false', 'add', f], { encoding: 'utf8', windowsHide: true });
  if (r.status !== 0) dice('no se pudo agregar al commit: ' + String(r.stderr || '').trim());
}

function habitos(s) {
  if (!s || !Array.isArray(s.def) || !s.def.length || typeof s.marcas !== 'object') return di('el Chrome de esta PC no tiene hábitos guardados todavía');
  // Los días en orden: así lo escrito y lo leído se comparan igual, y el archivo solo cambia si cambió una marca.
  const marcas = {};
  Object.keys(s.marcas || {}).sort().forEach(f => { marcas[f] = s.marcas[f]; });
  const datos = { desde: s.desde || null, mig: s.mig || null, def: s.def, marcas: marcas };
  const antes = previo(SALIDA);
  if (antes && JSON.stringify(antes.datos) === JSON.stringify(datos)) return di('sin cambios');
  // La fecha de la exportación es la de la última marca que se tocó en la PC (`editado`): así la PC
  // nunca se vuelve a importar a sí misma. Sin ella, la de ahora.
  const exportado = s.editado || new Date().toISOString();
  escribir(exportado, datos);
  const dias = Object.keys(datos.marcas).length;
  di('al día · ' + datos.def.length + ' hábitos, ' + dias + ' días con marcas');
  agregar(SALIDA, di);
}

function auditoria(a, sinc) {
  if (!a || typeof a !== 'object' || !Object.keys(a).length) return da('el Chrome de esta PC no tiene auditorías guardadas todavía');
  const datos = {};
  Object.keys(a).sort().forEach(ym => { datos[ym] = a[ym]; });
  const antes = previo(SALIDA_AUD);
  if (antes && JSON.stringify(antes.datos) === JSON.stringify(datos)) return da('sin cambios');
  // Cada mes lleva la hora en que se tocó en la PC (`plan_auditoria_sinc`); un mes que no la tiene conserva la
  // de la exportación anterior si no cambió, y si cambió, la de ahora. Los otros dispositivos traen un mes
  // solo si esta hora es más nueva que la suya.
  const ahora = new Date().toISOString(), loc = (sinc && sinc.meses) || {}, previos = (antes && antes.meses) || {}, meses = {};
  Object.keys(datos).forEach(ym => {
    const igual = antes && antes.datos && JSON.stringify(antes.datos[ym]) === JSON.stringify(datos[ym]);
    meses[ym] = loc[ym] || (igual && previos[ym]) || ahora;
  });
  const exportado = Object.keys(meses).map(k => meses[k]).sort().pop();
  escribirAud(exportado, meses, datos);
  da('al día · ' + Object.keys(datos).length + ' mes(es): ' + Object.keys(datos).join(', '));
  agregar(SALIDA_AUD, da);
}

// Solo los campos que hacen las cifras: nada de notas, movimientos ni historial.
const tomar = (arr, campos) => (Array.isArray(arr) ? arr : []).map(x => { const o = {}; campos.forEach(k => { if (x && x[k] !== undefined) o[k] = x[k]; }); return o; });
function finanzas(f, r) {
  if (!f || !Array.isArray(f.debts)) return df('el Chrome de esta PC no tiene Finanzas todavía');
  const btc = (f.btcHistory || []).reduce((a, x) => ({ btc: a.btc + (+x.btc || 0), usd: a.usd + (+x.usd || 0) }), { btc: 0, usd: 0 });
  const datos = {
    debts: tomar(f.debts, ['id', 'name', 'type', 'total', 'balance', 'rate', 'min', 'day', 'start', 'noInterest', 'fecha', 'planAl', 'omitidos']),
    investments: tomar(f.investments, ['id', 'name', 'type', 'invested', 'value', 'date', 'rate']),
    activos: tomar(f.activos, ['id', 'name', 'type', 'value']),
    goals: tomar(f.goals, ['id', 'name', 'icon', 'target', 'current', 'date']),
    // El Bitcoin, en un solo lote: lo que tienes y lo que te costó, sin cada compra.
    btcHistory: btc.btc || btc.usd ? [{ id: 'total', btc: +btc.btc.toFixed(8), usd: Math.round(btc.usd) }] : [],
    currentBtcPrice: +f.currentBtcPrice || 0, usdMxn: +f.usdMxn || 0,
    emergencyFund: +f.emergencyFund || 0,
  };
  const gastar = r && typeof r.gastar === 'number' ? Math.round(r.gastar) : null, fecha = (r && r.fecha) || null;
  const antes = previo(SALIDA_FIN);
  if (antes && JSON.stringify(antes.datos) === JSON.stringify(datos) && antes.gastar === gastar) return df('sin cambios');
  const L = [];
  L.push('/* Los saldos de Finanzas de la PC, para el dispositivo que no tiene Finanzas: deudas, fondo, inversiones, activos y el');
  L.push('   Bitcoin en un lote, más lo que queda en la quincena. Sin movimientos ni notas. Lo escribe el hook de pre-commit');
  L.push('   (Dashboard/habitos-exportar.js): no se edita a mano. */');
  L.push('window.FINANZAS_SYNC = {');
  L.push('  "exportado": ' + JSON.stringify(new Date().toISOString()) + ',');
  L.push('  "fecha": ' + JSON.stringify(fecha) + ',');
  L.push('  "gastar": ' + JSON.stringify(gastar) + ',');
  L.push('  "datos": ' + JSON.stringify(datos, null, 1).replace(/\n/g, '\n  '));
  L.push('};');
  fs.writeFileSync(SALIDA_FIN + '.tmp', L.join('\n') + '\n', 'utf8');
  fs.renameSync(SALIDA_FIN + '.tmp', SALIDA_FIN);
  df('al día · ' + datos.debts.length + ' deudas, ' + datos.activos.length + ' activos, ' + datos.investments.length + ' inversiones');
  agregar(SALIDA_FIN, df);
}

(function () {
  try {
    const exe = chrome(), ldb = perfil();
    if (!exe) return di('no encontré Chrome; no se exportó nada');
    if (!ldb) return di('no encontré el perfil de Chrome; no se exportó nada');
    const v = leer(exe, ldb, [CLAVE, CLAVE_AUD, CLAVE_SINC, CLAVE_FIN, CLAVE_RES]);
    try { habitos(v[CLAVE]); } catch (e) { di('no se exportó: ' + e.message); }
    try { auditoria(v[CLAVE_AUD], v[CLAVE_SINC]); } catch (e) { da('no se exportó: ' + e.message); }
    try { finanzas(v[CLAVE_FIN], v[CLAVE_RES]); } catch (e) { df('no se exportó: ' + e.message); }
  } catch (e) {
    di('no se exportó: ' + e.message);
  }
})();
