
// ══════════════════════════════════════════════════════════════════
//  GIT_RICH — Git y GitHub
// ══════════════════════════════════════════════════════════════════
const GIT_RICH = {

'git-config': `
<div class="concept-intro">Git lee su configuración en tres niveles, cada uno sobreescribiendo al anterior: <strong>system</strong> (toda la máquina) → <strong>global</strong> (tu usuario, el más usado) → <strong>local</strong> (solo ese repositorio). La identidad (<code>user.name</code>, <code>user.email</code>) es obligatoria antes del primer commit — sin ella Git rechaza el commit.</div>
<table class="kv-table"><tr><th>Nivel</th><th>Flag</th><th>Dónde vive</th><th>Alcance</th></tr>
<tr><td>System</td><td><code>--system</code></td><td><code>/etc/gitconfig</code></td><td>Todos los usuarios de la máquina</td></tr>
<tr><td>Global</td><td><code>--global</code></td><td><code>~/.gitconfig</code></td><td>Todos los repos de tu usuario</td></tr>
<tr><td>Local</td><td>(sin flag, default)</td><td><code>.git/config</code> del repo</td><td>Solo ese repositorio — útil para usar otro email en un repo de trabajo</td></tr>
</table>
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
<div class="concept-intro">Casi todo comando de Git mueve cambios entre <strong>cuatro</strong> áreas: el directorio de trabajo (tus archivos), el staging area (lo que va en el próximo commit), el repositorio local (tu historial de commits) y el remoto (el historial compartido en GitHub/GitLab/Bitbucket).</div>
<div class="diagram-card">
<svg viewBox="0 0 620 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Las cuatro areas de Git: directorio de trabajo, staging area, repositorio local y repositorio remoto, conectadas por git add, git commit, git push y git pull o fetch en sentido contrario">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="10" y="35" width="130" height="55" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="75" y="58" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Directorio de</text>
    <text x="75" y="71" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">trabajo</text>

    <rect x="180" y="35" width="130" height="55" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="245" y="58" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Staging</text>
    <text x="245" y="71" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">area</text>

    <rect x="350" y="35" width="130" height="55" rx="7" fill="var(--accent)" fill-opacity="0.85" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="415" y="58" font-size="10" font-weight="700" fill="white" text-anchor="middle">Repositorio</text>
    <text x="415" y="71" font-size="10" font-weight="700" fill="white" text-anchor="middle">local</text>

    <rect x="510" y="35" width="105" height="55" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="562" y="58" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">Repositorio</text>
    <text x="562" y="71" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">remoto</text>

    <line x1="140" y1="53" x2="176" y2="53" stroke="var(--text-muted)" stroke-width="1.5"/><path d="M176,49 L184,53 L176,57 Z" fill="var(--text-muted)"/>
    <text x="158" y="42" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">add</text>

    <line x1="310" y1="53" x2="346" y2="53" stroke="var(--text-muted)" stroke-width="1.5"/><path d="M346,49 L354,53 L346,57 Z" fill="var(--text-muted)"/>
    <text x="328" y="42" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">commit</text>

    <line x1="480" y1="53" x2="506" y2="53" stroke="var(--text-muted)" stroke-width="1.5"/><path d="M506,49 L514,53 L506,57 Z" fill="var(--text-muted)"/>
    <text x="493" y="42" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">push</text>

    <line x1="506" y1="78" x2="484" y2="78" stroke="var(--green)" stroke-width="1.5"/><path d="M484,74 L476,78 L484,82 Z" fill="var(--green)"/>
    <text x="493" y="99" font-size="8.5" fill="var(--green)" text-anchor="middle">pull / fetch</text>
  </g>
</svg>
<div class="diagram-caption"><code>git add</code> mueve cambios al staging area; <code>git commit</code> los guarda en el historial local; <code>git push</code> los publica en el remoto. <code>git fetch</code> solo descarga sin tocar tus archivos; <code>git pull</code> descarga y además hace merge automáticamente.</div>
</div>
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
<div class="concept-intro">Una rama en Git es solo un <strong>puntero móvil</strong> a un commit — crear una es prácticamente instantáneo porque no copia archivos, solo agrega una referencia nueva. Trabajar en ramas aisladas evita que código a medio terminar afecte a <code>main</code>.</div>
<div class="tab-group-gitb">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'gitb-1','gitb')">Comandos de rama</button>
    <button class="tab-btn" onclick="switchTab(this,'gitb-2','gitb')">Flujo básico</button>
    <button class="tab-btn" onclick="switchTab(this,'gitb-3','gitb')">Gitflow</button>
  </div>
  <div id="gitb-1" class="tab-panel active">
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
  <div id="gitb-2" class="tab-panel">
<div class="diagram-card">
<svg viewBox="0 0 560 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flujo básico de branching: la rama main tiene dos commits, se crea una rama feature que se bifurca y agrega dos commits propios, y finalmente se hace merge de vuelta a main">
  <g font-family="'Segoe UI',sans-serif">
    <line x1="40" y1="40" x2="520" y2="40" stroke="var(--accent)" stroke-width="2.5"/>
    <circle cx="80" cy="40" r="7" fill="var(--accent)"/>
    <circle cx="180" cy="40" r="7" fill="var(--accent)"/>
    <circle cx="480" cy="40" r="7" fill="var(--accent)"/>
    <text x="480" y="22" font-size="9.5" fill="var(--accent)" text-anchor="middle">merge commit</text>
    <text x="20" y="44" font-size="10" font-weight="700" fill="var(--accent)">main</text>

    <line x1="180" y1="40" x2="380" y2="120" stroke="var(--green)" stroke-width="2.5"/>
    <line x1="380" y1="120" x2="480" y2="40" stroke="var(--green)" stroke-width="2.5" stroke-dasharray="5 4"/>
    <circle cx="280" cy="80" r="7" fill="var(--green)"/>
    <circle cx="380" cy="120" r="7" fill="var(--green)"/>
    <text x="380" y="145" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">feature/can-parser</text>

    <text x="180" y="60" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">git checkout -b</text>
  </g>
</svg>
<div class="diagram-caption">La rama se bifurca desde un commit de <code>main</code>, avanza con sus propios commits, y al terminar se vuelve a integrar con <code>git merge</code> — la línea punteada es el camino que Git recorre para combinar ambos historiales.</div>
</div>
  </div>
  <div id="gitb-3" class="tab-panel">
<table class="kv-table"><tr><th>Rama</th><th>Sale de</th><th>Se mergea a</th><th>Propósito</th></tr>
<tr><td><code>main</code></td><td>—</td><td>—</td><td>Código en producción. Solo recibe merge desde <code>release</code> o <code>hotfix</code></td></tr>
<tr><td><code>develop</code></td><td><code>main</code> (una vez)</td><td>—</td><td>Integración continua. Las features se mergean aquí primero</td></tr>
<tr><td><code>feature/x</code></td><td><code>develop</code></td><td><code>develop</code></td><td>Nueva funcionalidad en desarrollo</td></tr>
<tr><td><code>release/x.y</code></td><td><code>develop</code></td><td><code>main</code> y <code>develop</code></td><td>Estabilizar una versión antes de publicarla</td></tr>
<tr><td><code>hotfix/x</code></td><td><code>main</code></td><td><code>main</code> y <code>develop</code></td><td>Fix urgente directo a producción</td></tr>
</table>
<div class="alert-card">💡 Gitflow es el modelo más completo pero también el más pesado — muchos equipos modernos usan <strong>Trunk-Based Development</strong> o <strong>GitHub Flow</strong> (solo <code>main</code> + ramas de feature de vida corta) porque despliegan varias veces al día y Gitflow añade fricción innecesaria para ese ritmo.</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre branching...</p>
</div>`,

'git-conflictos': `
<div class="concept-intro">Un conflicto ocurre cuando Git no puede combinar automáticamente dos cambios porque <strong>ambas ramas modificaron las mismas líneas</strong> de forma distinta desde que se separaron de un ancestro común. Git no adivina cuál versión es la correcta — se detiene y te pide que decidas.</div>
<div class="diagram-card">
<svg viewBox="0 0 500 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dos ramas que divergen desde un commit comun C0: HEAD avanza a C1 modificando una funcion, feature avanza a C2 modificando la misma funcion de otra forma. Al intentar el merge Git detecta el conflicto porque no puede decidir cual version es correcta">
  <g font-family="'Segoe UI',sans-serif">
    <circle cx="60" cy="90" r="9" fill="var(--text-muted)"/>
    <text x="60" y="115" font-size="9.5" fill="var(--text-muted)" text-anchor="middle">C0 (común)</text>

    <line x1="69" y1="85" x2="220" y2="35" stroke="var(--accent)" stroke-width="2.5"/>
    <circle cx="230" cy="30" r="9" fill="var(--accent)"/>
    <text x="230" y="18" font-size="9.5" fill="var(--accent)" text-anchor="middle">C1 — HEAD (main)</text>
    <text x="230" y="50" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">return data[0:8]</text>

    <line x1="69" y1="95" x2="220" y2="145" stroke="#DC2626" stroke-width="2.5"/>
    <circle cx="230" cy="150" r="9" fill="#DC2626"/>
    <text x="230" y="168" font-size="9.5" fill="#DC2626" text-anchor="middle">C2 — feature/extended-can</text>
    <text x="230" y="130" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">return data[0:8] if not extended...</text>

    <line x1="239" y1="35" x2="380" y2="85" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 4"/>
    <line x1="239" y1="145" x2="380" y2="95" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 4"/>
    <rect x="360" y="65" width="110" height="40" rx="7" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/>
    <text x="415" y="88" font-size="10" font-weight="700" fill="#B91C1C" text-anchor="middle">⚠️ CONFLICTO</text>
  </g>
</svg>
<div class="diagram-caption">Ambos commits tocaron la misma función de forma incompatible. <code>git merge feature/extended-can</code> se detiene ahí y marca el archivo con los delimitadores <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> / <code>=======</code> / <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code> para que tú elijas o combines manualmente.</div>
</div>
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
<div class="concept-intro">Los tres comandos "deshacen" cambios pero de formas muy distintas: <strong>reset</strong> mueve el puntero <code>HEAD</code> hacia atrás y reescribe qué commits existen; <strong>revert</strong> no toca el historial, crea un commit nuevo que hace lo opuesto; <strong>checkout/restore</strong> operan sobre archivos individuales, no sobre commits.</div>
<table class="kv-table"><tr><th>Modo</th><th>Commit</th><th>Staging area</th><th>Working directory</th></tr>
<tr><td><code>--soft</code></td><td>Se deshace</td><td>Los cambios quedan <strong>staged</strong></td><td>Sin tocar</td></tr>
<tr><td><code>--mixed</code> (default)</td><td>Se deshace</td><td>Los cambios quedan <strong>unstaged</strong></td><td>Sin tocar</td></tr>
<tr><td><code>--hard</code></td><td>Se deshace</td><td>Limpio</td><td><strong>Se borra todo</strong> — ⚠️ irreversible sin reflog</td></tr>
</table>
<div class="alert-card">💡 <strong>Regla de oro:</strong> nunca uses <code>reset --hard</code> ni reescribas historial (<code>reset</code>, <code>rebase</code>, <code>push --force</code>) en una rama que otros ya compartan (<code>origin/main</code>). Si el commit ya se publicó, usa <code>revert</code> — crea un commit nuevo que deshace los cambios sin alterar lo que otros ya tienen clonado.</div>
<div class="plan-card">
  <div class="plan-card-title">↩️ Reset vs Revert vs Checkout</div>
  <div class="plan-block">
    <div class="plan-time">Comandos</div>
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
<div class="concept-intro"><code>git stash</code> guarda tus cambios sin terminar en una pila temporal y limpia el directorio de trabajo — útil cuando necesitas cambiar de rama urgentemente (ej. un hotfix) pero no quieres commitear trabajo a medias.</div>
<div class="diagram-card">
<svg viewBox="0 0 500 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flujo de git stash: el directorio de trabajo con cambios sin terminar se guarda en la pila de stash quedando limpio, y luego con git stash pop los cambios regresan al directorio de trabajo">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="10" y="25" width="150" height="50" rx="7" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
    <text x="85" y="47" font-size="10" font-weight="700" fill="#92400E" text-anchor="middle">Working dir</text>
    <text x="85" y="61" font-size="9" fill="#92400E" text-anchor="middle">(cambios sin terminar)</text>

    <rect x="200" y="25" width="150" height="50" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="275" y="47" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">stash@{0}</text>
    <text x="275" y="61" font-size="9" fill="var(--text-muted)" text-anchor="middle">pila de stash</text>

    <rect x="390" y="25" width="105" height="50" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="442" y="47" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">Working dir</text>
    <text x="442" y="61" font-size="9" fill="var(--text-muted)" text-anchor="middle">(limpio)</text>

    <line x1="160" y1="50" x2="196" y2="50" stroke="var(--text-muted)" stroke-width="1.5"/><path d="M196,46 L204,50 L196,54 Z" fill="var(--text-muted)"/>
    <text x="178" y="38" font-size="8" fill="var(--text-muted)" text-anchor="middle">stash</text>
    <line x1="350" y1="60" x2="386" y2="60" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="4 3"/><path d="M350,56 L342,60 L350,64 Z" fill="var(--text-muted)"/>
    <text x="368" y="80" font-size="8" fill="var(--text-muted)" text-anchor="middle">pop (después)</text>
  </g>
</svg>
<div class="diagram-caption">La pila de stash puede acumular varios guardados (<code>stash@{0}</code>, <code>stash@{1}</code>...). <code>pop</code> recupera el más reciente y lo elimina de la pila; <code>apply</code> lo recupera pero lo deja guardado por si lo necesitas de nuevo.</div>
</div>
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
<div class="concept-intro">Merge y rebase resuelven el mismo problema — integrar los cambios de una rama en otra — pero producen historiales muy distintos. Es de las preguntas más frecuentes en entrevista, y la respuesta corta es: <strong>merge preserva lo que pasó, rebase reescribe cómo se ve que pasó</strong>.</div>
<div class="diagram-card">
<svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparacion entre merge y rebase: con merge el historial de main y feature se combinan mediante un commit de merge con dos padres, manteniendo la bifurcacion visible; con rebase los commits de feature se reescriben uno por uno sobre el ultimo commit de main, resultando en un historial lineal sin commit de merge">
  <g font-family="'Segoe UI',sans-serif">
    <text x="10" y="18" font-size="11" font-weight="700" fill="var(--accent)">MERGE — preserva el historial real</text>
    <line x1="20" y1="45" x2="280" y2="45" stroke="var(--accent)" stroke-width="2.5"/>
    <circle cx="50" cy="45" r="7" fill="var(--accent)"/>
    <circle cx="120" cy="45" r="7" fill="var(--accent)"/>
    <circle cx="260" cy="45" r="7" fill="var(--accent)"/>
    <text x="260" y="30" font-size="8.5" fill="var(--accent)" text-anchor="middle">merge commit</text>
    <line x1="120" y1="45" x2="190" y2="80" stroke="var(--green)" stroke-width="2.5"/>
    <line x1="190" y1="80" x2="260" y2="45" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 3"/>
    <circle cx="190" cy="80" r="7" fill="var(--green)"/>
    <text x="190" y="98" font-size="8.5" fill="var(--green)" text-anchor="middle">feature</text>

    <text x="10" y="140" font-size="11" font-weight="700" fill="var(--green)">REBASE — reescribe para que se vea lineal</text>
    <line x1="20" y1="170" x2="280" y2="170" stroke="var(--accent)" stroke-width="2.5"/>
    <circle cx="50" cy="170" r="7" fill="var(--accent)"/>
    <circle cx="120" cy="170" r="7" fill="var(--accent)"/>
    <circle cx="190" cy="170" r="7" fill="var(--green)"/>
    <circle cx="260" cy="170" r="7" fill="var(--green)"/>
    <text x="190" y="190" font-size="8.5" fill="var(--green)" text-anchor="middle">feature' (reescritos)</text>
    <text x="260" y="155" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">sin merge commit</text>
  </g>
</svg>
<div class="diagram-caption">Con <b>merge</b>, el commit con dos padres queda como evidencia de que hubo dos ramas trabajando en paralelo. Con <b>rebase</b>, Git aplica cada commit de <code>feature</code> uno por uno sobre la punta actual de <code>main</code>, generando commits <b>nuevos</b> (con hash distinto) que dan la ilusión de un desarrollo lineal.</div>
</div>
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
    </div>
  </div>
</div>
<div class="alert-card">💡 <strong>Regla de oro:</strong> nunca hagas rebase de ramas que otros comparten (main, develop). Solo en tu rama feature privada. El rebase reescribe el historial (nuevos hashes) y causará conflictos graves a quienes ya hayan clonado o hecho pull de los commits originales.</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre rebase vs merge...</p>
</div>`,

'git-tag': `
<div class="concept-intro">Un tag marca un commit específico como un punto de referencia permanente — típicamente una versión publicada. A diferencia de una rama, un tag <strong>no se mueve</strong> automáticamente con nuevos commits.</div>
<table class="kv-table"><tr><th>Versión</th><th>Cambia cuando...</th><th>Ejemplo</th></tr>
<tr><td>MAJOR</td><td>Hay un breaking change (API incompatible con versiones anteriores)</td><td><code>1.x.x → 2.0.0</code></td></tr>
<tr><td>MINOR</td><td>Se agrega funcionalidad nueva, compatible hacia atrás</td><td><code>1.2.x → 1.3.0</code></td></tr>
<tr><td>PATCH</td><td>Corrección de bug, compatible hacia atrás</td><td><code>1.2.1 → 1.2.2</code></td></tr>
</table>
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

<span class="c-cm"># Ir a un tag específico</span>
git checkout v1.0.0                   <span class="c-cm"># detached HEAD</span>
git checkout -b release/1.0.0 v1.0.0 <span class="c-cm"># crear rama desde tag</span></pre></div>
    </div>
  </div>
</div>
<div class="alert-card">💡 Diferencia clave: un tag <strong>lightweight</strong> es solo un nombre apuntando a un commit (como una rama que no se mueve). Un tag <strong>annotated</strong> es un objeto completo en la base de datos de Git, con autor, fecha, mensaje y — opcionalmente — firma GPG. Para releases reales, siempre usa <code>-a</code>.</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre tags y versionado...</p>
</div>`,

'git-logs': `
<div class="concept-intro">Cuando el problema no es "qué cambiar" sino "quién cambió esto y cuándo se rompió", estas tres herramientas son las que investigan el historial en vez de modificarlo.</div>
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
<div class="alert-card">💡 <code>git bisect</code> usa <strong>búsqueda binaria</strong> sobre el historial: en vez de revisar commit por commit linealmente, cada respuesta ("good"/"bad") descarta la mitad de los commits restantes — encontrar el commit culpable entre 1000 toma como máximo ~10 pruebas, no 1000.</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre git log y blame...</p>
</div>`,

'gh-intro': `
<div class="concept-intro">GitHub añade una capa de colaboración sobre Git puro: repos alojados en la nube, permisos de acceso, y un flujo estándar para que <strong>cualquiera</strong> pueda proponer cambios a un proyecto sin tener permiso de escritura directo.</div>
<div class="diagram-card">
<svg viewBox="0 0 600 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flujo de contribucion en GitHub: el repositorio upstream se copia como fork en tu cuenta, se clona a tu maquina local como origin, haces commits y push a tu fork, y finalmente abres un pull request de vuelta al repositorio upstream">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="230" y="10" width="140" height="45" rx="7" fill="var(--accent)" fill-opacity="0.85" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="300" y="37" font-size="10" font-weight="700" fill="white" text-anchor="middle">upstream (original)</text>

    <rect x="230" y="90" width="140" height="45" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="300" y="117" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">tu fork (GitHub)</text>

    <rect x="20" y="90" width="140" height="45" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="90" y="117" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">clon local (origin)</text>

    <line x1="300" y1="55" x2="300" y2="86" stroke="var(--text-muted)" stroke-width="1.5"/><path d="M296,79 L300,88 L304,79 Z" fill="var(--text-muted)"/>
    <text x="330" y="72" font-size="8.5" fill="var(--text-muted)">Fork (botón)</text>

    <line x1="226" y1="112" x2="164" y2="112" stroke="var(--text-muted)" stroke-width="1.5"/><path d="M164,108 L156,112 L164,116 Z" fill="var(--text-muted)"/>
    <text x="195" y="103" font-size="8" fill="var(--text-muted)" text-anchor="middle">clone</text>

    <line x1="90" y1="139" x2="90" y2="145" stroke="none"/>
    <path d="M160,120 C190,150 240,150 270,140" fill="none" stroke="var(--green)" stroke-width="1.5"/><path d="M263,144 L272,140 L266,132 Z" fill="var(--green)"/>
    <text x="215" y="152" font-size="8" fill="var(--green)" text-anchor="middle">push (después de commit)</text>

    <path d="M300,90 C300,70 300,60 300,58" fill="none" stroke="#DC2626" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="440" y="35" font-size="8.5" fill="#DC2626">Pull Request de tu fork hacia upstream</text>
  </g>
</svg>
<div class="diagram-caption">El código nunca va directo de tu máquina al repo original: pasa por tu fork, y el mantenedor decide si acepta tu Pull Request. Para mantener tu fork al día: <code>git fetch upstream &amp;&amp; git rebase upstream/main</code>.</div>
</div>
<table class="kv-table"><tr><th>Término</th><th>Qué es</th></tr>
<tr><td>Clone</td><td>Copia local de un repositorio al que ya tienes acceso. El remote se llama <code>origin</code> por convención</td></tr>
<tr><td>Fork</td><td>Copia del repo en tu propia cuenta de GitHub. Se usa para contribuir donde no tienes permiso de escritura directo</td></tr>
<tr><td>Upstream</td><td>El repositorio original del que hiciste fork — se agrega como remote extra para poder sincronizarte con él</td></tr>
<tr><td>Organization</td><td>Grupo de repos con miembros y permisos compartidos, ej. <code>github.com/wayve</code></td></tr>
</table>
<div class="plan-card">
  <div class="plan-card-title">🐙 GitHub — Comandos de sincronización</div>
  <div class="plan-block">
    <div class="plan-time">Agregar y usar upstream</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Sincronizar fork con upstream</div><pre>
git remote add upstream git@github.com:original/repo.git
git remote -v                     <span class="c-cm"># ver origin (tu fork) y upstream (original)</span>
git fetch upstream
git rebase upstream/main          <span class="c-cm"># traer los cambios del original a tu rama</span>
git push origin main --force-with-lease  <span class="c-cm"># actualizar tu fork tras el rebase</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre GitHub...</p>
</div>`,

'gh-ssh': `
<div class="concept-intro">SSH permite autenticarte con GitHub usando un par de claves criptográficas en vez de escribir usuario y contraseña (o un token) en cada operación. Una vez configurado, <code>git push</code>/<code>pull</code> por SSH no vuelve a pedir credenciales.</div>
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
<div class="alert-card">💡 La clave <strong>privada</strong> (<code>id_ed25519</code>, sin extensión) nunca sale de tu máquina. Solo la <strong>pública</strong> (<code>id_ed25519.pub</code>) se sube a GitHub — es matemáticamente imposible reconstruir la privada a partir de la pública, así que compartirla no compromete tu acceso.</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre SSH y GitHub...</p>
</div>`,

'gh-pr': `
<div class="concept-intro">Un Pull Request no es solo "subir código" — es una propuesta de cambio que otros revisan antes de integrarse a la rama principal. Es el punto de control de calidad más importante del flujo colaborativo.</div>
<div class="diagram-card">
<svg viewBox="0 0 620 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flujo de Pull Request: crear rama, hacer commits, hacer push, abrir el PR en GitHub, pasar por code review, y finalmente merge a la rama principal">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="5" y="30" width="95" height="40" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="52" y="54" font-size="9.5" font-weight="700" fill="var(--accent)" text-anchor="middle">git branch</text>

    <rect x="125" y="30" width="95" height="40" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="172" y="54" font-size="9.5" font-weight="700" fill="var(--accent)" text-anchor="middle">commits</text>

    <rect x="245" y="30" width="95" height="40" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="292" y="54" font-size="9.5" font-weight="700" fill="var(--accent)" text-anchor="middle">git push</text>

    <rect x="365" y="30" width="95" height="40" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
    <text x="412" y="54" font-size="9.5" font-weight="700" fill="#92400E" text-anchor="middle">abrir PR</text>

    <rect x="485" y="30" width="115" height="40" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
    <text x="542" y="47" font-size="9.5" font-weight="700" fill="#92400E" text-anchor="middle">code review</text>
    <text x="542" y="60" font-size="8" fill="#92400E" text-anchor="middle">comentarios / cambios</text>

    <g stroke="var(--text-muted)" stroke-width="1.4" fill="var(--text-muted)">
      <line x1="100" y1="50" x2="121" y2="50"/><path d="M121,46 L129,50 L121,54 Z"/>
      <line x1="220" y1="50" x2="241" y2="50"/><path d="M241,46 L249,50 L241,54 Z"/>
      <line x1="340" y1="50" x2="361" y2="50"/><path d="M361,46 L369,50 L361,54 Z"/>
      <line x1="460" y1="50" x2="481" y2="50"/><path d="M481,46 L489,50 L481,54 Z"/>
    </g>
    <text x="550" y="90" font-size="9" fill="var(--green)" text-anchor="middle">→ aprobado → merge a main</text>
  </g>
</svg>
<div class="diagram-caption">El ciclo se repite tantas veces como haga falta: cada comentario de revisión suele traducirse en nuevos commits que se hacen push a la misma rama, actualizando el PR automáticamente sin abrir uno nuevo.</div>
</div>
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
</div>
<table class="kv-table"><tr><th>Estrategia</th><th>Qué hace</th><th>Cuándo conviene</th></tr>
<tr><td>Merge commit</td><td>Preserva todos los commits de la rama y agrega un commit de merge</td><td>Cuando el detalle de cada commit importa para auditoría/historia</td></tr>
<tr><td>Squash and merge</td><td>Combina todos los commits de la rama en uno solo sobre main</td><td>Historial de <code>main</code> limpio; commits WIP intermedios no importan</td></tr>
<tr><td>Rebase and merge</td><td>Aplica los commits de la rama linealmente sobre main, sin merge commit</td><td>Se quiere historial lineal pero conservando cada commit individual</td></tr>
</table>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Pull Requests...</p>
</div>`,

'gh-issues': `
<div class="concept-intro">Los Issues son el sistema de seguimiento de trabajo pendiente de GitHub — bugs, features, tareas — y GitHub Projects los organiza visualmente en tableros.</div>
<table class="kv-table"><tr><th>Label</th><th>Uso típico</th></tr>
<tr><td><code>bug</code></td><td>Algo no funciona como debería</td></tr>
<tr><td><code>enhancement</code></td><td>Mejora o nueva funcionalidad solicitada</td></tr>
<tr><td><code>documentation</code></td><td>Falta o hay que corregir documentación</td></tr>
<tr><td><code>good first issue</code></td><td>Tarea acotada, ideal para nuevos contribuidores</td></tr>
<tr><td><code>help wanted</code></td><td>El equipo busca ayuda externa activamente</td></tr>
<tr><td><code>wontfix</code></td><td>Reportado pero se decidió no resolver</td></tr>
</table>
<div class="plan-card">
  <div class="plan-block">
    <div class="plan-time">Issues</div>
    <div class="plan-content">
      <h4>Seguimiento de bugs y features</h4>
      <p><b>Milestones:</b> Agrupación de issues para un release: "v1.1.0", "Sprint 5".<br>
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
<div class="concept-intro">GitHub Actions ejecuta automáticamente flujos de trabajo (tests, builds, deploys) cuando ocurre un evento en el repo — el archivo YAML define <strong>qué</strong> dispara el workflow, <strong>qué jobs</strong> corren, y <strong>qué pasos</strong> tiene cada uno.</div>
<div class="diagram-card">
<svg viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pipeline de GitHub Actions: un push o pull request dispara el workflow, que ejecuta primero el job lint y despues, si pasa, el job test en paralelo sobre tres versiones de Python">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="10" y="45" width="110" height="50" rx="7" fill="var(--accent)" fill-opacity="0.85" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="65" y="66" font-size="10" font-weight="700" fill="white" text-anchor="middle">push /</text>
    <text x="65" y="80" font-size="10" font-weight="700" fill="white" text-anchor="middle">pull_request</text>

    <rect x="165" y="45" width="110" height="50" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="220" y="75" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">job: lint</text>

    <rect x="330" y="10" width="130" height="35" rx="6" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="395" y="32" font-size="9" font-weight="700" fill="var(--green)" text-anchor="middle">job: test (py 3.10)</text>
    <rect x="330" y="52" width="130" height="35" rx="6" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="395" y="74" font-size="9" font-weight="700" fill="var(--green)" text-anchor="middle">job: test (py 3.11)</text>
    <rect x="330" y="94" width="130" height="35" rx="6" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="395" y="116" font-size="9" font-weight="700" fill="var(--green)" text-anchor="middle">job: test (py 3.12)</text>
    <text x="395" y="140" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">strategy: matrix — corren en paralelo</text>

    <line x1="120" y1="70" x2="161" y2="70" stroke="var(--text-muted)" stroke-width="1.5"/><path d="M161,66 L169,70 L161,74 Z" fill="var(--text-muted)"/>
    <text x="140" y="60" font-size="8" fill="var(--text-muted)" text-anchor="middle">on:</text>

    <line x1="275" y1="70" x2="300" y2="27" stroke="var(--text-muted)" stroke-width="1.5"/><path d="M296,20 L303,26 L296,32 Z" fill="var(--text-muted)"/>
    <line x1="275" y1="70" x2="300" y2="70" stroke="var(--text-muted)" stroke-width="1.5"/><path d="M296,64 L303,70 L296,76 Z" fill="var(--text-muted)"/>
    <line x1="275" y1="70" x2="300" y2="112" stroke="var(--text-muted)" stroke-width="1.5"/><path d="M296,105 L303,111 L296,118 Z" fill="var(--text-muted)"/>
    <text x="290" y="55" font-size="8" fill="var(--text-muted)">needs: lint</text>
  </g>
</svg>
<div class="diagram-caption">El job <code>test</code> declara <code>needs: lint</code>, así que solo arranca si <code>lint</code> termina exitosamente. Dentro de <code>test</code>, la <code>matrix</code> multiplica el job en tres ejecuciones paralelas — una por versión de Python.</div>
</div>
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
<table class="kv-table"><tr><th>Concepto</th><th>Qué significa</th></tr>
<tr><td>Workflow</td><td>El archivo YAML completo — una automatización con nombre propio</td></tr>
<tr><td>Trigger (<code>on:</code>)</td><td>El evento que dispara el workflow: push, pull_request, schedule (cron), workflow_dispatch (manual)</td></tr>
<tr><td>Job</td><td>Un conjunto de pasos que corre en un runner independiente — jobs distintos corren en paralelo salvo que uno dependa de otro (<code>needs:</code>)</td></tr>
<tr><td>Step</td><td>Un comando o una acción reutilizable (<code>uses:</code>) dentro de un job, ejecutado en orden</td></tr>
<tr><td>Matrix</td><td>Corre el mismo job múltiples veces con distintas combinaciones de variables (ej. 3 versiones de Python)</td></tr>
</table>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre GitHub Actions...</p>
</div>`,

'gh-markdown': `
<div class="concept-intro">Markdown es el lenguaje de formato ligero que usa GitHub en issues, PRs, comentarios y archivos <code>.md</code> — se escribe como texto plano y se renderiza con formato.</div>
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
<div class="concept-intro">Bitbucket es el servicio de repositorios Git de Atlassian — mismos comandos de Git de siempre, distinta plataforma web y ecosistema de integración.</div>
<table class="kv-table"><tr><th></th><th>GitHub</th><th>Bitbucket</th></tr>
<tr><td>Empresa</td><td>Microsoft</td><td>Atlassian</td></tr>
<tr><td>CI/CD nativo</td><td>GitHub Actions</td><td>Bitbucket Pipelines</td></tr>
<tr><td>Integración de tickets</td><td>GitHub Issues / Projects</td><td>Nativa con Jira (vínculo automático commit ↔ issue)</td></tr>
<tr><td>On-premise</td><td>GitHub Enterprise Server</td><td>Bitbucket Server / Data Center</td></tr>
<tr><td>Comandos Git</td><td colspan="2" style="text-align:center">Idénticos — solo cambia el remote y la UI web</td></tr>
</table>
<div class="plan-card">
  <div class="plan-card-title">🪣 Bitbucket — Alternativa Atlassian</div>
  <div class="plan-block">
    <div class="plan-time">Bitbucket en el entorno enterprise</div>
    <div class="plan-content">
      <p>Es muy común en empresas que ya usan el ecosistema Atlassian (Jira, Confluence).<br>
      <b>Ventajas sobre GitHub en enterprise:</b><br>
      • Integración nativa con Jira: los commits y PRs se vinculan automáticamente a Jira issues.<br>
      • Bitbucket Pipelines: CI/CD integrado, similar a GitHub Actions pero con configuración YAML propia.<br>
      • Bitbucket Server / Data Center: instalación on-premise para empresas con requisitos de seguridad/compliance que no quieren datos en la nube.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Bitbucket...</p>
</div>`,

};  // fin GIT_RICH
