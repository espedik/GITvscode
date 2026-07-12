
// ══════════════════════════════════════════════════════════════════
//  GIT_RICH — Git y GitHub
// ══════════════════════════════════════════════════════════════════
const GIT_RICH = {

'git-config': `
<div class="plan-card">
  <div class="plan-card-title">⚙️ Configurar Git</div>
  <div class="plan-block">
    <div class="plan-time">Configuración inicial</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Configuración de Git</div><pre>
<span class="c-cm"># Identidad (obligatorio antes del primer commit)</span>
git config --global user.name "Adan Martinez"
git config --global user.email "adanarturomartinez@gmail.com"

<span class="c-cm"># Editor predeterminado</span>
git config --global core.editor "code --wait"   <span class="c-cm"># VS Code</span>
git config --global core.editor "vim"

<span class="c-cm"># Alias útiles</span>
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.unstage "reset HEAD --"

<span class="c-cm"># Default branch name</span>
git config --global init.defaultBranch main

<span class="c-cm"># Ver toda la configuración</span>
git config --list
cat ~/.gitconfig

<span class="c-cm"># .gitignore global (ignora archivos en TODOS los repos)</span>
git config --global core.excludesfile ~/.gitignore_global</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre configuración Git...</p>
</div>`,

'git-comandos': `
<div class="plan-card">
  <div class="plan-card-title">💻 Comandos Git más usados</div>
  <div class="plan-block">
    <div class="plan-time">Referencia rápida</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Comandos esenciales de Git</div><pre>
<span class="c-cm"># Iniciar / clonar</span>
git init                          <span class="c-cm"># nuevo repo local</span>
git clone git@github.com:user/repo.git

<span class="c-cm"># Estado y diferencias</span>
git status                        <span class="c-cm"># archivos modificados</span>
git diff                          <span class="c-cm"># cambios no staged</span>
git diff --staged                 <span class="c-cm"># cambios staged</span>
git diff main..feature/x          <span class="c-cm"># entre dos ramas</span>

<span class="c-cm"># Agregar y commit</span>
git add archivo.py                <span class="c-cm"># agregar archivo específico</span>
git add -p                        <span class="c-cm"># agregar por hunks (interactivo)</span>
git commit -m "feat: agregar parser CAN"

<span class="c-cm"># Sincronización</span>
git fetch origin                  <span class="c-cm"># descargar sin merge</span>
git pull origin main              <span class="c-cm"># fetch + merge</span>
git push origin feature/mi-rama   <span class="c-cm"># subir rama</span>
git push -u origin feature/x      <span class="c-cm"># -u = set upstream</span>

<span class="c-cm"># Historial</span>
git log --oneline --graph --decorate --all
git log --author="Adan" --since="1 week ago"
git shortlog -sn                  <span class="c-cm"># commits por autor</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus comandos Git más usados...</p>
</div>`,

'git-branching': `
<div class="plan-card">
  <div class="plan-card-title">🌿 Branching — Gitflow y estrategias</div>
  <div class="plan-block">
    <div class="plan-time">Comandos de ramas</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Ramas en Git</div><pre>
git branch                        <span class="c-cm"># listar ramas locales</span>
git branch -a                     <span class="c-cm"># locales + remotas</span>
git branch feature/can-parser     <span class="c-cm"># crear rama</span>
git checkout feature/can-parser   <span class="c-cm"># cambiar a rama</span>
git checkout -b feature/can-parser  <span class="c-cm"># crear y cambiar</span>
git switch -c feature/can-parser  <span class="c-cm"># forma moderna</span>

<span class="c-cm"># Merge</span>
git checkout main
git merge feature/can-parser      <span class="c-cm"># fast-forward si posible</span>
git merge --no-ff feature/can-parser  <span class="c-cm"># siempre crea merge commit</span>

<span class="c-cm"># Eliminar</span>
git branch -d feature/can-parser  <span class="c-cm"># local (si mergeada)</span>
git branch -D feature/can-parser  <span class="c-cm"># forzar eliminar</span>
git push origin --delete feature/can-parser  <span class="c-cm"># remota</span></pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Gitflow</div>
    <div class="plan-content">
      <h4>Estrategia de ramas</h4>
      <p><b>main:</b> código en producción. Solo merge desde release o hotfix.<br>
      <b>develop:</b> integración continua. Features se mergean aquí.<br>
      <b>feature/x:</b> nueva funcionalidad. Sale de develop, vuelve a develop.<br>
      <b>release/x.y:</b> preparar release. Sale de develop, merge a main Y develop.<br>
      <b>hotfix/x:</b> fix urgente en prod. Sale de main, merge a main Y develop.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre branching...</p>
</div>`,

'git-conflictos': `
<div class="plan-card">
  <div class="plan-card-title">⚠️ Conflictos de merge</div>
  <div class="plan-block">
    <div class="plan-time">Cómo resolver</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Resolver conflictos de merge</div><pre>
<span class="c-cm"># Git marca los conflictos en el archivo:</span>
<<<<<<< HEAD (tu rama)
def parse_can(data):
    return data[0:8]
=======
def parse_can(data, extended=False):
    return data[0:8] if not extended else data[0:12]
>>>>>>> feature/extended-can

<span class="c-cm"># 1. Editar el archivo → dejar la versión correcta</span>
<span class="c-cm"># 2. Eliminar los marcadores <<<, ===, >>></span>

<span class="c-cm"># 3. Marcar como resuelto</span>
git add archivo.py

<span class="c-cm"># 4. Continuar el merge</span>
git commit

<span class="c-cm"># Abortar el merge si algo va mal</span>
git merge --abort

<span class="c-cm"># Herramientas gráficas para conflictos</span>
git mergetool                     <span class="c-cm"># abre la herramienta configurada</span>
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd "code --wait $MERGED"</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre conflictos de merge...</p>
</div>`,

'git-reset-revert': `
<div class="plan-card">
  <div class="plan-card-title">↩️ Reset vs Revert vs Checkout</div>
  <div class="plan-block">
    <div class="plan-time">Diferencias clave</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Reset, Revert y Checkout</div><pre>
<span class="c-cm"># GIT RESET — mueve el HEAD (¡reescribe historial!)</span>
git reset --soft HEAD~1   <span class="c-cm"># deshace commit, cambios quedan staged</span>
git reset --mixed HEAD~1  <span class="c-cm"># deshace commit, cambios quedan unstaged (default)</span>
git reset --hard HEAD~1   <span class="c-cm"># deshace commit + BORRA los cambios ⚠️</span>
<span class="c-cm"># ⚠️ Nunca usar reset --hard en ramas compartidas (origin/main)</span>

<span class="c-cm"># GIT REVERT — crea commit inverso (historial intacto, seguro)</span>
git revert abc1234        <span class="c-cm"># crea commit que revierte los cambios de abc1234</span>
git revert HEAD           <span class="c-cm"># revierte el último commit</span>
git revert HEAD~3..HEAD   <span class="c-cm"># revierte los últimos 3 commits</span>
<span class="c-cm"># ✓ Seguro en ramas compartidas. Uso: fix urgente en main</span>

<span class="c-cm"># GIT CHECKOUT / RESTORE — para archivos específicos</span>
git checkout HEAD -- archivo.py   <span class="c-cm"># restaurar archivo al último commit</span>
git restore archivo.py            <span class="c-cm"># forma moderna</span>
git restore --staged archivo.py   <span class="c-cm"># quitar del staging</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre reset vs revert...</p>
</div>`,

'git-stash': `
<div class="plan-card">
  <div class="plan-card-title">📦 Git Stash — Guardar trabajo sin commit</div>
  <div class="plan-block">
    <div class="plan-time">Comandos de stash</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Git stash</div><pre>
<span class="c-cm"># Guardar cambios en progreso sin commit</span>
git stash                         <span class="c-cm"># guarda tracked + staged</span>
git stash -u                      <span class="c-cm"># incluye untracked</span>
git stash push -m "WIP: parser CAN en desarrollo"

<span class="c-cm"># Ver stashes guardados</span>
git stash list
<span class="c-cm"># stash@{0}: WIP: parser CAN en desarrollo</span>
<span class="c-cm"># stash@{1}: On main: fix sensor timeout</span>

<span class="c-cm"># Recuperar stash</span>
git stash pop                     <span class="c-cm"># recupera stash@{0} y lo elimina</span>
git stash apply stash@{1}         <span class="c-cm"># recupera pero mantiene en lista</span>
git stash pop stash@{1}           <span class="c-cm"># recupera y elimina el stash@{1}</span>

<span class="c-cm"># Eliminar stash</span>
git stash drop stash@{0}          <span class="c-cm"># eliminar uno</span>
git stash clear                   <span class="c-cm"># eliminar todos</span>

<span class="c-cm"># Crear rama desde stash</span>
git stash branch feature/can-parser stash@{0}</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre git stash...</p>
</div>`,

'git-rebase': `
<div class="plan-card">
  <div class="plan-card-title">🔀 Rebase vs Merge</div>
  <div class="plan-block">
    <div class="plan-time">Cuándo usar cada uno</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Rebase interactivo</div><pre>
<span class="c-cm"># Rebase simple: mover rama sobre main actualizado</span>
git checkout feature/can-parser
git rebase main
<span class="c-cm"># El historial queda lineal (sin merge commits)</span>

<span class="c-cm"># Rebase interactivo: limpiar commits antes del PR</span>
git rebase -i HEAD~4   <span class="c-cm"># modificar los últimos 4 commits</span>
<span class="c-cm"># Abre editor con:</span>
<span class="c-cm"># pick abc1234 feat: agregar parser</span>
<span class="c-cm"># pick def5678 WIP fix</span>
<span class="c-cm"># pick ghi9012 otro fix</span>
<span class="c-cm"># pick jkl3456 tests</span>
<span class="c-cm">#</span>
<span class="c-cm"># Cambiar pick por:</span>
<span class="c-cm"># squash = combinar con commit anterior</span>
<span class="c-cm"># fixup  = combinar sin mensaje</span>
<span class="c-cm"># reword = cambiar mensaje</span>
<span class="c-cm"># drop   = eliminar commit</span></pre></div>
      <p><b>Regla de oro:</b> Nunca hagas rebase de ramas que otros comparten (main, develop). Solo en tu rama feature privada. El rebase reescribe el historial y causará problemas a quienes ya hayan clonado.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre rebase vs merge...</p>
</div>`,

'git-tag': `
<div class="plan-card">
  <div class="plan-card-title">🏷️ Tags y Versionado Semántico</div>
  <div class="plan-block">
    <div class="plan-time">Comandos de tags</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Git tags</div><pre>
<span class="c-cm"># Crear tag</span>
git tag v1.0.0                        <span class="c-cm"># lightweight (solo puntero)</span>
git tag -a v1.0.0 -m "Release v1.0.0"  <span class="c-cm"># annotated (con metadata)</span>
git tag -a v1.0.1 abc1234 -m "Patch"  <span class="c-cm"># taguear commit específico</span>

<span class="c-cm"># Listar y ver</span>
git tag
git tag -l "v1.*"                     <span class="c-cm"># filtrar</span>
git show v1.0.0                       <span class="c-cm"># ver detalles del tag</span>

<span class="c-cm"># Publicar tags</span>
git push origin v1.0.0                <span class="c-cm"># un tag específico</span>
git push origin --tags                <span class="c-cm"># todos los tags</span>

<span class="c-cm"># SemVer: MAJOR.MINOR.PATCH</span>
<span class="c-cm"># v2.0.0 → breaking change (incompatible)</span>
<span class="c-cm"># v1.3.0 → nueva funcionalidad (compatible)</span>
<span class="c-cm"># v1.2.1 → bug fix (compatible)</span>

<span class="c-cm"># Ir a un tag específico</span>
git checkout v1.0.0                   <span class="c-cm"># detached HEAD</span>
git checkout -b release/1.0.0 v1.0.0 <span class="c-cm"># crear rama desde tag</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre tags y versionado...</p>
</div>`,

'git-logs': `
<div class="plan-card">
  <div class="plan-card-title">📜 Logs y Blame — Investigar el historial</div>
  <div class="plan-block">
    <div class="plan-time">Comandos de historial</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Git log y blame</div><pre>
<span class="c-cm"># Log básico</span>
git log --oneline --graph --decorate --all
git log --since="2 weeks ago" --author="Adan"
git log -p archivo.py             <span class="c-cm"># historial con diff</span>
git log --follow archivo.py       <span class="c-cm"># sigue renombrados</span>

<span class="c-cm"># Blame — quién cambió cada línea</span>
git blame archivo.py              <span class="c-cm"># hash + autor + línea</span>
git blame -L 10,20 archivo.py     <span class="c-cm"># solo líneas 10-20</span>

<span class="c-cm"># Bisect — encontrar qué commit introdujo un bug</span>
git bisect start
git bisect bad                    <span class="c-cm"># HEAD tiene el bug</span>
git bisect good v1.2.0            <span class="c-cm"># v1.2.0 no tenía el bug</span>
<span class="c-cm"># Git hace checkout en el medio y tú pruebas</span>
git bisect good                   <span class="c-cm"># o git bisect bad</span>
<span class="c-cm"># Repite hasta que Git identifica el commit exacto</span>
git bisect reset                  <span class="c-cm"># terminar</span>

<span class="c-cm"># Grep en el historial</span>
git log -S "parse_can_frame"      <span class="c-cm"># commits que añaden/eliminan esta string</span>
git log -G "def parse.*"          <span class="c-cm"># commits cuyo diff coincide con regex</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre git log y blame...</p>
</div>`,

'gh-intro': `
<div class="plan-card">
  <div class="plan-card-title">🐙 GitHub — Conceptos clave</div>
  <div class="plan-block">
    <div class="plan-time">Fork vs Clone</div>
    <div class="plan-content">
      <h4>Términos fundamentales de GitHub</h4>
      <p><b>Clone:</b> Copia local de un repositorio (tuyo o con acceso). La referencia <code>origin</code> apunta al repo clonado.<br>
      <b>Fork:</b> Copia del repo en tu cuenta GitHub. Para contribuir a repos donde no tienes write access. Tu fork tiene su propio URL. Para proponer cambios: fork → clone → branch → commit → push → PR al repo original.<br>
      <b>Upstream:</b> El repo original del que hiciste fork. Se agrega como remote: <code>git remote add upstream git@github.com:original/repo.git</code>. Para actualizar tu fork: <code>git fetch upstream &amp;&amp; git rebase upstream/main</code>.<br>
      <b>Organization:</b> Grupo de repos con miembros y permisos compartidos. Ej: <code>github.com/wayve</code>.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre GitHub...</p>
</div>`,

'gh-ssh': `
<div class="plan-card">
  <div class="plan-card-title">🔑 SSH Key y conexión a GitHub</div>
  <div class="plan-block">
    <div class="plan-time">Configurar SSH</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Configurar SSH para GitHub</div><pre>
<span class="c-cm"># 1. Generar par de claves (ed25519 es más seguro que RSA)</span>
ssh-keygen -t ed25519 -C "adanarturomartinez@gmail.com"
<span class="c-cm"># Guarda en ~/.ssh/id_ed25519 y ~/.ssh/id_ed25519.pub</span>

<span class="c-cm"># 2. Agregar al SSH agent</span>
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

<span class="c-cm"># 3. Copiar la clave pública</span>
cat ~/.ssh/id_ed25519.pub
<span class="c-cm"># Copiar el texto y pegarlo en GitHub Settings → SSH Keys</span>

<span class="c-cm"># 4. Verificar conexión</span>
ssh -T git@github.com
<span class="c-cm"># "Hi username! You've successfully authenticated"</span>

<span class="c-cm"># 5. Clonar con SSH (no HTTPS)</span>
git clone git@github.com:user/repo.git

<span class="c-cm"># Cambiar remote de HTTPS a SSH</span>
git remote set-url origin git@github.com:user/repo.git</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre SSH y GitHub...</p>
</div>`,

'gh-pr': `
<div class="plan-card">
  <div class="plan-card-title">🔃 Pull Requests</div>
  <div class="plan-block">
    <div class="plan-time">Flujo de PR</div>
    <div class="plan-content">
      <h4>Proceso completo de Pull Request</h4>
      <p>1. Crear rama desde main/develop: <code>git checkout -b feature/can-parser</code><br>
      2. Hacer commits con mensajes claros (Conventional Commits: <code>feat:</code>, <code>fix:</code>, <code>docs:</code>, <code>test:</code>)<br>
      3. Push de la rama: <code>git push -u origin feature/can-parser</code><br>
      4. Crear PR en GitHub con título descriptivo y descripción (qué, por qué, cómo probar)<br>
      5. Asignar reviewers. Los reviewers hacen comentarios línea a línea.<br>
      6. Responder comentarios o hacer cambios solicitados.<br>
      7. Una vez aprobado: merge (puede ser merge commit, squash, o rebase según la política del equipo).<br><br>
      <b>Draft PR:</b> Para trabajo en progreso donde quieres feedback temprano sin que se mergee accidentalmente. Marca como "Ready for review" cuando esté listo.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Estrategias de merge</div>
    <div class="plan-content">
      <h4>Merge vs Squash vs Rebase</h4>
      <p><b>Merge commit:</b> Preserva toda la historia de la rama. Crea un commit de merge. Historial honesto pero puede ser ruidoso.<br>
      <b>Squash and merge:</b> Combina todos los commits de la rama en UNO solo. Historial limpio en main. Se pierde el detalle granular de los commits.<br>
      <b>Rebase and merge:</b> Pone los commits de la rama linealmente en main. Sin merge commit. Historial limpio y lineal.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Pull Requests...</p>
</div>`,

'gh-issues': `
<div class="plan-card">
  <div class="plan-card-title">🐛 Issues y Projects</div>
  <div class="plan-block">
    <div class="plan-time">Issues</div>
    <div class="plan-content">
      <h4>Seguimiento de bugs y features</h4>
      <p><b>Labels:</b> Categorización de issues: <code>bug</code>, <code>enhancement</code>, <code>documentation</code>, <code>good first issue</code>, <code>help wanted</code>, <code>wontfix</code>.<br>
      <b>Milestones:</b> Agrupación de issues para un release: "v1.1.0", "Sprint 5".<br>
      <b>Assignees:</b> Quién es responsable del issue.<br>
      <b>Cerrar issues con commit:</b> En el mensaje de commit poner <code>Closes #42</code> o <code>Fix #42</code> — GitHub cierra el issue automáticamente al merge.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">GitHub Projects</div>
    <div class="plan-content">
      <h4>Tablero Kanban integrado</h4>
      <p>GitHub Projects (v2) es un tablero Kanban/Lista/Roadmap integrado con issues y PRs. Permite crear vistas personalizadas, filtros, campos custom (prioridad, estimación) y automatizaciones (mover issue a "In Progress" al asignarlo).<br>
      Diferencia de Jira: más simple, nativo en GitHub, gratis para repos públicos.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Issues y Projects...</p>
</div>`,

'gh-actions': `
<div class="plan-card">
  <div class="plan-card-title">🤖 GitHub Actions — CI/CD</div>
  <div class="plan-block">
    <div class="plan-time">Conceptos</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">YAML — Workflow de GitHub Actions</div><pre>
<span class="c-cm"># .github/workflows/ci.yml</span>
name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with: { python-version: "3.11" }
      - run: pip install flake8 && flake8 src/

  test:
    needs: lint           <span class="c-cm"># espera que lint pase</span>
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.10", "3.11", "3.12"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: \${{ matrix.python-version }}
      - run: pip install -r requirements.txt
      - run: pytest --cov=src --junitxml=junit.xml
      - uses: actions/upload-artifact@v3
        with:
          name: test-results-\${{ matrix.python-version }}
          path: junit.xml

<span class="c-cm"># Secrets: Settings → Secrets → Actions</span>
<span class="c-cm"># Acceder: \${{ secrets.MY_SECRET }}</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre GitHub Actions...</p>
</div>`,

'gh-markdown': `
<div class="plan-card">
  <div class="plan-card-title">📝 Markdown y GitHub Gist</div>
  <div class="plan-block">
    <div class="plan-time">Sintaxis Markdown</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Markdown — Referencia rápida</div><pre>
# H1  ## H2  ### H3

**negrita**  *cursiva*  ~~tachado~~  &#96;código inline&#96;

- Lista  * otro item  1. numerada

&gt; Cita / blockquote

&#96;&#96;&#96;python
def hello():
    return "world"
&#96;&#96;&#96;

| Col1 | Col2 | Col3 |
|------|------|------|
| a    | b    | c    |

[texto](URL)  ![imagen](URL)

- [x] Tarea completada
- [ ] Tarea pendiente

Menciones: @usuario  #42 (issue)  abc1234 (commit)</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">GitHub Gist</div>
    <div class="plan-content">
      <h4>Snippets compartibles</h4>
      <p>Gist es un servicio de GitHub para compartir snippets de código o notas. <b>Público:</b> visible para todos, aparece en búsquedas. <b>Secreto:</b> no indexado pero accesible con el URL. Útil para: compartir config de herramientas, scripts de un archivo, notas técnicas. URL: <code>gist.github.com/tu_usuario</code>.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Markdown y Gist...</p>
</div>`,

'git-bitbucket': `
<div class="plan-card">
  <div class="plan-card-title">🪣 Bitbucket — Alternativa Atlassian</div>
  <div class="plan-block">
    <div class="plan-time">Diferencias con GitHub</div>
    <div class="plan-content">
      <h4>Bitbucket en el entorno enterprise</h4>
      <p>Bitbucket es el servicio de repositorios Git de Atlassian. Es muy común en empresas que ya usan el ecosistema Atlassian (Jira, Confluence).<br>
      <b>Ventajas sobre GitHub en enterprise:</b><br>
      • Integración nativa con Jira: los commits y PRs se vinculan automáticamente a Jira issues.<br>
      • Bitbucket Pipelines: CI/CD integrado, similar a GitHub Actions pero con configuración YAML propia.<br>
      • Bitbucket Server / Data Center: instalación on-premise para empresas con requisitos de seguridad/compliance que no quieren datos en la nube.<br>
      <b>Los comandos Git son idénticos</b> — solo cambia el servidor remoto y la UI web.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Bitbucket...</p>
</div>`,

};  // fin GIT_RICH
