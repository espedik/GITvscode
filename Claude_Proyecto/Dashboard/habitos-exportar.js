/* ══════════════════════════════════════════════════════════════════════════════════════════
   LOS HÁBITOS DE LA PC, AL REPOSITORIO — lo corre el hook de pre-commit
   ══════════════════════════════════════════════════════════════════════════════════════════
   Adán, 19-oct-2026: "con respecto a hábitos, yo los actualizaré desde mi pc… pero quiero que se
   reflejen las actualizaciones en mis otros dispositivos, entonces crea un hook que actualice esa
   info que tenemos aquí, que cada día cuando haga algún commit, de cualquier cosa se actualicen los
   hábitos, así la mayor parte del tiempo estará actualizado y tendríamos métricas".

   Los hábitos viven en `localStorage['dash-habitos-v1']` del Chrome de la PC (origen file://). Este
   script copia la base de datos de ese almacenamiento a una carpeta temporal, la abre con el mismo
   Chrome en modo invisible y con un perfil aparte —nunca el de Adán: su navegador abierto no se
   toca— y escribe lo que encuentra en `Dashboard/habitos-sync.js`, que la página publicada carga en
   el iPad y en cualquier otro dispositivo (`habitos.js` lo funde, ver *Tu iPad y tu PC* en
   readme_dashboard.md). Solo escribe si las marcas cambiaron, y con `--add` deja el archivo listo
   para el commit en curso.

   Nunca detiene un commit: si no encuentra Chrome, el perfil o la clave, lo dice en una línea y sale
   con 0. `HABITOS_CHROME` y `HABITOS_PERFIL` cambian la ruta de Chrome y la de su perfil.

     node Dashboard/habitos-exportar.js          # escribe Dashboard/habitos-sync.js si cambió
     node Dashboard/habitos-exportar.js --add    # y lo agrega al commit (así lo llama el hook)
   ══════════════════════════════════════════════════════════════════════════════════════════ */
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');

const SALIDA = path.join(__dirname, 'habitos-sync.js');
const CLAVE = 'dash-habitos-v1';
const di = m => console.log('hábitos · ' + m);

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

// Lee la clave de una COPIA del almacenamiento, con Chrome invisible y un --user-data-dir propio.
function leer(exe, ldb) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'habitos-'));
  try {
    const dest = path.join(tmp, 'perfil', 'Default', 'Local Storage', 'leveldb');
    fs.mkdirSync(dest, { recursive: true });
    for (const f of fs.readdirSync(ldb)) if (f !== 'LOCK') fs.copyFileSync(path.join(ldb, f), path.join(dest, f));
    const html = path.join(tmp, 'leer.html');
    fs.writeFileSync(html, '<!doctype html><meta charset="utf-8"><body><script>' +
      'var v = localStorage.getItem(' + JSON.stringify(CLAVE) + ');' +
      'document.body.textContent = "@@" + (v ? btoa(unescape(encodeURIComponent(v))) : "VACIO") + "@@";</script>');
    const r = spawnSync(exe, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
      '--disable-extensions', '--user-data-dir=' + path.join(tmp, 'perfil'), '--dump-dom',
      'file:///' + html.replace(/\\/g, '/')], { timeout: 40000, encoding: 'utf8', windowsHide: true });
    const m = /@@([^@]*)@@/.exec(r.stdout || '');
    if (!m) throw new Error('Chrome no devolvió nada' + (r.error ? ' (' + r.error.message + ')' : ''));
    return m[1] === 'VACIO' ? null : JSON.parse(Buffer.from(m[1], 'base64').toString('utf8'));
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
function previo() {
  try {
    const t = fs.readFileSync(SALIDA, 'utf8'), i = t.indexOf('{'), j = t.lastIndexOf('}');
    return JSON.parse(t.slice(i, j + 1));
  } catch (e) { return null; }
}

(function () {
  try {
    const exe = chrome(), ldb = perfil();
    if (!exe) return di('no encontré Chrome; no se exportó nada');
    if (!ldb) return di('no encontré el perfil de Chrome; no se exportó nada');
    const s = leer(exe, ldb);
    if (!s || !Array.isArray(s.def) || !s.def.length || typeof s.marcas !== 'object') return di('el Chrome de esta PC no tiene hábitos guardados todavía');
    // Los días en orden: así lo escrito y lo leído se comparan igual, y el archivo solo cambia si cambió una marca.
    const marcas = {};
    Object.keys(s.marcas || {}).sort().forEach(f => { marcas[f] = s.marcas[f]; });
    const datos = { desde: s.desde || null, mig: s.mig || null, def: s.def, marcas: marcas };
    const antes = previo();
    if (antes && JSON.stringify(antes.datos) === JSON.stringify(datos)) return di('sin cambios');
    // La fecha de la exportación es la de la última marca que se tocó en la PC (`editado`): así la PC
    // nunca se vuelve a importar a sí misma. Sin ella, la de ahora.
    const exportado = s.editado || new Date().toISOString();
    escribir(exportado, datos);
    const dias = Object.keys(datos.marcas).length;
    di('al día · ' + datos.def.length + ' hábitos, ' + dias + ' días con marcas');
    if (process.argv.indexOf('--add') !== -1) {
      const r = spawnSync('git', ['-c', 'core.autocrlf=false', 'add', SALIDA], { encoding: 'utf8', windowsHide: true });
      if (r.status !== 0) di('no se pudo agregar al commit: ' + String(r.stderr || '').trim());
    }
  } catch (e) {
    di('no se exportó: ' + e.message);
  }
})();
