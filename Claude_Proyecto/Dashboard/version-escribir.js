/* ═══════════════════════════════════════════════════════════════════════════════════════════════
   LA HORA DEL COMMIT, PARA QUE CADA DISPOSITIVO SEPA QUÉ VERSIÓN TIENE — lo corre el hook de pre-commit
   ═══════════════════════════════════════════════════════════════════════════════════════════════
   Adán, 2-nov-2026: "pon cuál es la última vez que se subió un commit, esto debido a que a veces no sé
   cuándo mi app está actualizada porque mi iPad tarda en jalar cambios".

   Escribe `Dashboard/version.js` (`window.APP_VERSION = {commit}`) con la hora de ahora, justo antes de
   que se cree el commit, y con `--add` lo agrega a ese commit. Mi Día lo enseña junto a la semana
   (`pintarVersion`) y lo compara con el último commit de GitHub: si GitHub tiene uno más nuevo, este
   dispositivo todavía no lo jala. Nunca detiene un commit: si no puede escribir, lo dice en una línea.

     node Dashboard/version-escribir.js          # escribe version.js
     node Dashboard/version-escribir.js --add    # y lo agrega al commit (así lo llama el hook)
   ═══════════════════════════════════════════════════════════════════════════════════════════════ */
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process');

const SALIDA = path.join(__dirname, 'version.js');
const ahora = new Date().toISOString();
try {
  fs.writeFileSync(SALIDA, '/* La hora del último commit de esta copia. La escribe el hook de pre-commit\n' +
    '   (Dashboard/version-escribir.js) antes de cada commit: no se edita a mano. */\n' +
    'window.APP_VERSION = { "commit": "' + ahora + '" };\n');
  if (process.argv.indexOf('--add') !== -1) spawnSync('git', ['add', SALIDA], { stdio: 'ignore' });
  console.log('versión · ' + ahora);
} catch (e) {
  console.log('versión · no se pudo escribir version.js: ' + e.message);
}
process.exit(0);
