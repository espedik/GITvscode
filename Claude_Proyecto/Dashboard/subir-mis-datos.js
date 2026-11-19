/* Subir mis datos — lo que anotas en el navegador de esta PC, a GitHub, sin Claude.

   Adán, 18-nov-2026: "agregué esta compra de bitcoin, pero mi git no registró nada… recuerda que debemos ya no depender
   de Claude esta app". Lo que anotas en el Dashboard y en Finanzas vive en el Chrome de esta PC (localStorage), no en
   archivos: git no lo ve hasta que habitos-exportar.js lo copia a los *-sync.js, y eso pasaba solo dentro de un commit
   (el hook de pre-commit). Este script hace ese commit por ti:

     1. trae lo último de GitHub (si no puede, sigue con lo de esta PC),
     2. corre habitos-exportar.js --add: hábitos, auditoría, todo Finanzas —movimientos, Bitcoin…— y Mis cifras,
     3. si algo cambió, hace el commit y el push; si no, lo dice y no hace nada.

   Se usa con `git datos` (alias de este clon: git config alias.datos '!node Claude_Proyecto/Dashboard/subir-mis-datos.js'),
   con doble clic en Claude_Proyecto/subir-mis-datos.bat, o solo cada noche con la tarea de Windows
   «Subir mis datos» (subir-mis-datos.bat /instalar la registra). Si ya había algo preparado para un commit (git add de
   otra cosa), no lo mezcla: avisa y se detiene. */
'use strict';
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const RAIZ = path.resolve(__dirname, '..', '..');
const git = (...a) => execFileSync('git', a, { cwd: RAIZ, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const preparado = () => git('diff', '--cached', '--name-only').split('\n').filter(Boolean);
const QUE = { 'habitos-sync.js': 'hábitos', 'auditoria-sync.js': 'auditoría', 'finanzas-sync.js': 'Finanzas',
  'ajustes-sync.js': 'mis cifras' };

function main() {
  if (preparado().length) {
    console.log('Hay cambios preparados para otro commit (git add): súbelos o quítalos primero; no los mezclo con tus datos.');
    return 1;
  }
  try { git('pull', '--ff-only', '-q', 'origin', 'main'); console.log('✓ Traje lo último de GitHub'); }
  catch (e) { console.log('· No pude traer lo último de GitHub (sin internet o con cambios a medias): sigo con lo de esta PC'); }

  execFileSync(process.execPath, [path.join(__dirname, 'habitos-exportar.js'), '--add'], { cwd: RAIZ, stdio: 'inherit' });
  // Y los que ya estaban escritos sin subir (el exportador corrió antes sin commit): dice «sin cambios» y no los agrega.
  const sync = Object.keys(QUE).map(f => path.join(__dirname, f)).filter(f => fs.existsSync(f));
  if (sync.length) git('add', '--', ...sync);

  const archivos = preparado();
  if (!archivos.length) { console.log('\nNada nuevo que subir: lo de tu navegador ya está en GitHub.'); return 0; }
  const que = archivos.map(f => QUE[path.basename(f)] || path.basename(f));
  git('commit', '-q', '-m', 'Mis datos de la PC: ' + que.join(', '), '-m', 'Subidos con subir-mis-datos, sin Claude.');
  try { git('push', '-q', 'origin', 'main'); }
  catch (e) {
    console.log('\n✗ Quedó el commit en esta PC, pero no pude subirlo a GitHub: ' + String(e.stderr || e.message).trim().split('\n')[0]);
    console.log('  Vuelve a correrlo con internet; se sube con el siguiente.');
    return 1;
  }
  console.log('\n✓ Subido a GitHub: ' + que.join(', ') + '. El iPad lo ve en unos minutos.');
  return 0;
}

try { process.exitCode = main(); }
catch (e) { console.log('✗ ' + String(e.stderr || e.message).trim().split('\n')[0]); process.exitCode = 1; }
