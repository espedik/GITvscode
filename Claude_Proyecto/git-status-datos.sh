# Tus datos del navegador aparecen en `git status` (Git Bash).
#
# Adán, 18-nov-2026: "yo quiero usar el git status y que me marque los cambios… y ya con git add . y git commit -m
# quiero subirlos". Lo que anotas en el Dashboard y en Finanzas vive dentro de Chrome, no en un archivo, y git no tiene
# un hook para `status`. Esta función, antes de cada `git status` en GITvscode, corre Dashboard/habitos-exportar.js:
# copia lo del navegador a Dashboard/finanzas-sync.js (todo Finanzas), habitos-sync.js, auditoria-sync.js y
# ajustes-sync.js, solo si cambió. Tarda menos de un segundo. En cualquier otro repositorio, git es el de siempre.
#
# Se activa una vez, en Git Bash (luego cierra y abre Git Bash):
#   echo 'source ~/Desktop/GIT/GITvscode/Claude_Proyecto/git-status-datos.sh' >> ~/.bashrc
#   echo 'test -f ~/.bashrc && . ~/.bashrc' >> ~/.bash_profile
git() {
  if [ "$1" = "status" ]; then
    local raiz
    raiz="$(command git rev-parse --show-toplevel 2>/dev/null)"
    if [ -n "$raiz" ] && [ -f "$raiz/Claude_Proyecto/Dashboard/habitos-exportar.js" ]; then
      node "$raiz/Claude_Proyecto/Dashboard/habitos-exportar.js" >/dev/null 2>&1
    fi
  fi
  command git "$@"
}
