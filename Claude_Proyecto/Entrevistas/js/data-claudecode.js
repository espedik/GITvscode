// ══════════════════════════════════════════════════════════════════
//  CLAUDECODE_RICH — Claude Code: guía completa (básico → complejo)
// ══════════════════════════════════════════════════════════════════
const CLAUDECODE_RICH = {

'cc-que-es': `
<div class="tab-group-ccq">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccq-1','ccq')">Concepto y filosofía</button>
    <button class="tab-btn" onclick="switchTab(this,'ccq-2','ccq')">Agentic coding vs autocompletado</button>
    <button class="tab-btn" onclick="switchTab(this,'ccq-3','ccq')">Qué puede (y no puede) hacer</button>
  </div>
  <div id="ccq-1" class="tab-panel active">
<div class="concept-intro"><strong>Claude Code</strong> es una herramienta de línea de comandos (CLI) de Anthropic que ejecuta a Claude directamente sobre un proyecto real: puede leer y escribir archivos, ejecutar comandos de terminal, correr tests, usar git, navegar la web y mucho más — todo dentro de una conversación en lenguaje natural. En vez de pedirle un fragmento de código y copiarlo a mano, le describís una tarea ("arregla el bug en el módulo de login" o "agrega un endpoint para listar usuarios") y Claude Code investiga el código, hace los cambios, corre los tests y te muestra el resultado.</div>
<div class="concept-intro">Esto se conoce como <strong>agentic coding</strong>: el modelo no solo genera texto, sino que actúa en bucle — decide qué archivo leer, qué comando ejecutar, evalúa el resultado, y decide el siguiente paso — hasta completar la tarea o hasta necesitar tu aprobación para un paso sensible. Es la diferencia entre "un modelo que escribe código" y "un colega que usa una terminal para resolver un problema".</div>
<div class="pipeline-diagram"><span class="p-blue">Vos describís la tarea</span> ──▶ <span class="p-amber">Claude Code lee archivos, busca en el código, planea</span> ──▶ <span class="p-green">Ejecuta cambios (edita, corre comandos, git)</span> ──▶ <span class="p-amber">Evalúa el resultado (tests, output)</span> ──▶ <span class="p-blue">Te muestra el resumen — repite si falta algo</span></div>
<div class="concept-intro">Corre en la terminal (también hay extensión de VS Code / JetBrains y una app de escritorio), funciona sobre cualquier lenguaje o stack porque no depende de un plugin específico del lenguaje — su "herramienta" es literalmente el sistema de archivos y la shell, igual que las usaría un desarrollador humano.</div>
  </div>
  <div id="ccq-2" class="tab-panel">
<div class="concept-intro">Vale la pena distinguir tres categorías de herramientas de IA para programar, porque suelen confundirse en entrevistas y conversaciones técnicas:</div>
<table class="kv-table"><tr><th>Herramienta</th><th>Cómo funciona</th><th>Ejemplo</th></tr>
<tr><td>Autocompletado inline</td><td>Sugiere la próxima línea o bloque mientras escribís, dentro del editor. Vos aceptás o seguís escribiendo.</td><td>GitHub Copilot (modo clásico), Tab completion</td></tr>
<tr><td>Chat / asistente conversacional</td><td>Le pedís algo en una ventana de chat y te devuelve texto o código que vos copiás y pegás manualmente.</td><td>ChatGPT, Claude.ai en el navegador</td></tr>
<tr><td>Agentic coding (Claude Code)</td><td>Ejecuta un ciclo autónomo de leer → decidir → actuar sobre el proyecto real: edita archivos directamente, corre comandos, itera hasta cumplir la tarea.</td><td>Claude Code, Claude Agent SDK</td></tr>
</table>
<div class="concept-intro">La diferencia práctica es el <strong>alcance de la tarea</strong> que podés delegar. Con autocompletado, delegás una línea. Con un chat, delegás un fragmento que después integrás vos. Con Claude Code, podés delegar una tarea completa — "migra este módulo de callbacks a async/await y actualizá los tests" — porque la herramienta puede explorar el proyecto entero, tocar múltiples archivos coordinadamente, ejecutar los tests para verificar, y corregir si algo falla, sin que vos tengas que ir copiando resultados a mano.</div>
<div class="alert-card">💡 Esto no vuelve obsoletas a las otras categorías — de hecho Claude Code se integra dentro del editor (VS Code / JetBrains) combinando ambos mundos: el agente trabaja en la terminal integrada mientras ves los diffs aplicarse en tiempo real sobre los archivos abiertos.</div>
  </div>
  <div id="ccq-3" class="tab-panel">
<div class="two-col">
  <div class="info-card">
    <h5>✅ Lo que SÍ hace</h5>
    <li>Lee y edita archivos de cualquier lenguaje/framework</li>
    <li>Ejecuta comandos de terminal (tests, build, linters)</li>
    <li>Busca en el código con grep/glob para entender el contexto antes de tocar nada</li>
    <li>Usa git: commits, branches, diffs, y puede crear Pull Requests con GitHub CLI</li>
    <li>Delega subtareas a subagentes para no saturar el contexto principal</li>
    <li>Se conecta a herramientas externas vía MCP (bases de datos, APIs, navegadores)</li>
    <li>Corre en modo interactivo (conversación) o en modo script/CI para automatización</li>
  </div>
  <div class="info-card">
    <h5>⚠️ Lo que NO hace (por diseño)</h5>
    <li class="warn">No aplica cambios "a ciegas": por defecto pide tu aprobación antes de editar archivos o ejecutar comandos</li>
    <li class="warn">No reemplaza tu criterio técnico: propone y ejecuta, pero las decisiones de arquitectura y los merges finales siguen siendo tuyos</li>
    <li class="warn">No hace deploys a producción ni acciones irreversibles de forma automática sin que las autorices explícitamente</li>
    <li class="warn">No "sabe" nada de tu proyecto que no esté en el código, en <code>CLAUDE.md</code> o en lo que vos le contás</li>
    <li class="warn">No sustituye tests ni code review — sigue siendo software escrito por un modelo, hay que verificarlo</li>
  </div>
</div>
<div class="concept-intro">Esta combinación — autonomía real para ejecutar tareas de varios pasos, pero con puntos de control explícitos antes de acciones sensibles — es el diseño central de Claude Code, y se profundiza en el tema de <strong>modos de permisos</strong> más adelante en esta guía.</div>
  </div>
</div>
`,

'cc-instalacion': `
<div class="tab-group-cci">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'cci-1','cci')">Instalar</button>
    <button class="tab-btn" onclick="switchTab(this,'cci-2','cci')">Requisitos del sistema</button>
    <button class="tab-btn" onclick="switchTab(this,'cci-3','cci')">Autenticación y primer arranque</button>
  </div>
  <div id="cci-1" class="tab-panel active">
<div class="concept-intro">Hay dos familias de instalación: el <strong>instalador nativo</strong> (recomendado, se actualiza solo) y <strong>npm</strong> (si ya tenés Node.js y preferís gestionarlo como cualquier paquete global). Ambos terminan dejando disponible el comando <code>claude</code> en la terminal.</div>
<div class="code-block"><div class="code-lang">macOS / Linux / WSL — instalador nativo</div><pre>
curl -fsSL https://claude.ai/install.sh | bash</pre></div>
<div class="code-block"><div class="code-lang">Windows — PowerShell</div><pre>
irm https://claude.ai/install.ps1 | iex</pre></div>
<div class="code-block"><div class="code-lang">Vía npm (requiere Node.js 22+)</div><pre>
npm install -g @anthropic-ai/claude-code</pre></div>
<div class="code-block"><div class="code-lang">Gestores de paquetes alternativos</div><pre>
<span class="c-cm"># Homebrew (macOS/Linux)</span>
brew install --cask claude-code

<span class="c-cm"># WinGet (Windows)</span>
winget install Anthropic.ClaudeCode</pre></div>
<div class="alert-card">💡 El instalador nativo empaqueta un binario propio: no necesitás Node.js instalado para usarlo. Si tu equipo ya usa Node en el proyecto, la vía npm es cómoda porque el comando queda gestionado junto al resto de tus paquetes globales.</div>
  </div>
  <div id="cci-2" class="tab-panel">
<table class="kv-table"><tr><th>Requisito</th><th>Detalle</th></tr>
<tr><td>Sistemas operativos</td><td>macOS, Windows (10/11, con o sin WSL), y las distribuciones Linux más comunes (Ubuntu, Debian, y similares)</td></tr>
<tr><td>Hardware</td><td>Equipo de desarrollo estándar — no requiere GPU ni hardware especial, toda la inferencia ocurre en los servidores de Anthropic</td></tr>
<tr><td>Red</td><td>Conexión a Internet activa y estable (cada turno de la conversación es una llamada a la API)</td></tr>
<tr><td>Shell</td><td>Bash / Zsh en Unix; en Windows funciona tanto con PowerShell como con Git Bash si está instalado</td></tr>
<tr><td>Git (opcional pero recomendado)</td><td>Sin Git for Windows instalado, Claude Code usa PowerShell como shell de comandos; con Git for Windows instalado, puede usar Git Bash</td></tr>
</table>
<div class="concept-intro">No hace falta un IDE específico: funciona en cualquier terminal. La extensión de VS Code y el plugin de JetBrains son capas opcionales que integran esa misma sesión de terminal dentro del editor, mostrando los diffs de archivos en tiempo real.</div>
  </div>
  <div id="cci-3" class="tab-panel">
<div class="concept-intro">Al ejecutar <code>claude</code> por primera vez, te pide autenticarte. Hay dos caminos principales según cómo lo vayas a usar:</div>
<table class="kv-table"><tr><th>Método</th><th>Cuándo usarlo</th></tr>
<tr><td>Login con cuenta (OAuth)</td><td>Uso interactivo normal — abre el navegador, iniciás sesión con tu cuenta de Claude (Pro/Max) o de Anthropic Console, y queda vinculada a esa terminal.</td></tr>
<tr><td>API Key (variable de entorno)</td><td>Automatización, CI/CD, o servidores sin navegador — se define <code>ANTHROPIC_API_KEY</code> como variable de entorno y Claude Code la usa automáticamente, sin pedir login interactivo.</td></tr>
</table>
<div class="code-block"><div class="code-lang">Primer arranque — comandos útiles</div><pre>
<span class="c-cm"># Verificar que quedó instalado y ver la versión</span>
claude --version

<span class="c-cm"># Diagnóstico de la instalación (sin necesidad de haber iniciado sesión)</span>
claude doctor

<span class="c-cm"># Arrancar una sesión interactiva -- pide login la primera vez</span>
claude

<span class="c-cm"># Dentro de la sesión, para volver a iniciar sesión o ver el estado</span>
/login
/status</pre></div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ API key hardcodeada</div><pre>
<span class="c-cm"># En un script de CI, jamás así:</span>
claude --api-key <span class="c-st">"sk-ant-abc123..."</span> -p <span class="c-st">"..."</span></pre></div>
  <div class="err-good"><div class="err-label">✅ API key como secreto de entorno</div><pre>
<span class="c-cm"># La key vive en el secret manager del CI/CD,</span>
<span class="c-cm"># nunca en el comando ni en el repo:</span>
export ANTHROPIC_API_KEY=<span class="c-st">"$SECRET_ANTHROPIC_KEY"</span>
claude -p <span class="c-st">"..."</span></pre></div>
</div>
<div class="error-note"><b>Por qué:</b> la misma regla de oro que aplica a cualquier API key aplica acá — nunca en el código fuente, nunca en el historial de comandos de una terminal compartida, siempre en un gestor de secretos o variable de entorno inyectada por el propio pipeline.</div>
  </div>
</div>
`,

'cc-primeros-pasos': `
<div class="tab-group-ccp">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccp-1','ccp')">La sesión interactiva</button>
    <button class="tab-btn" onclick="switchTab(this,'ccp-2','ccp')">Atajos de teclado esenciales</button>
    <button class="tab-btn" onclick="switchTab(this,'ccp-3','ccp')">Modo -p (no interactivo)</button>
  </div>
  <div id="ccp-1" class="tab-panel active">
<div class="concept-intro">Ejecutando <code>claude</code> desde la carpeta de tu proyecto abrís un REPL (Read-Eval-Print Loop) conversacional: escribís lo que necesitás en lenguaje natural, Claude Code responde investigando el código, proponiendo o aplicando cambios, y el diálogo continúa. A diferencia de una terminal común, esta sesión mantiene memoria de todo lo conversado hasta que la cerrás, la limpiás o el contexto se compacta.</div>
<div class="code-block"><div class="code-lang">Formas de arrancar una sesión</div><pre>
<span class="c-cm"># Sesión interactiva vacía, empezás escribiendo</span>
claude

<span class="c-cm"># Sesión interactiva con un primer mensaje ya cargado</span>
claude <span class="c-st">"revisa el módulo de autenticación y dime si ves problemas de seguridad"</span>

<span class="c-cm"># Continuar la conversación más reciente de este proyecto</span>
claude --continue</pre></div>
<div class="concept-intro">Dentro de la sesión, cualquier texto que empieza con <code>/</code> es un <strong>comando slash</strong> (acciones de la herramienta misma, como limpiar contexto o cambiar de modelo — se cubren en detalle en el tema "Slash Commands y Skills"), y cualquier texto que empieza con <code>!</code> ejecuta ese comando directamente en la shell sin pasar por el modelo. Todo lo demás es simplemente tu mensaje a Claude.</div>
  </div>
  <div id="ccp-2" class="tab-panel">
<table class="kv-table"><tr><th>Atajo</th><th>Acción</th></tr>
<tr><td>Shift+Tab</td><td>Cicla entre los modos de permiso (default → aceptar ediciones → plan → …). Ver el tema "Modos de permisos".</td></tr>
<tr><td>Esc Esc</td><td>Con el input vacío, abre el menú de "rewind" para volver a un punto anterior de la conversación o del código.</td></tr>
<tr><td>Ctrl+C</td><td>Interrumpe la acción en curso; presionado una segunda vez, sale de la sesión.</td></tr>
<tr><td>Ctrl+V</td><td>Pega una imagen del portapapeles directamente en el mensaje (útil para mandar screenshots de un error o un diseño).</td></tr>
<tr><td>Shift+Enter</td><td>Salto de línea dentro del mensaje sin enviarlo todavía.</td></tr>
<tr><td>@</td><td>Autocompleta rutas de archivo del proyecto para referenciarlas directamente en el mensaje.</td></tr>
<tr><td>!</td><td>Cambia el input a "modo shell": lo que escribas se ejecuta directo en bash/PowerShell, sin pasar por el modelo.</td></tr>
</table>
<div class="alert-card">💡 No hace falta memorizar todos los atajos de entrada: escribiendo <code>/</code> solo, la interfaz te muestra la lista completa y filtrable de comandos disponibles en esa sesión.</div>
  </div>
  <div id="ccp-3" class="tab-panel">
<div class="concept-intro">El modo <code>-p</code> (de <em>print</em>) ejecuta un único prompt, imprime la respuesta en la salida estándar, y termina — sin abrir una sesión interactiva ni pedir aprobaciones en pantalla. Es la forma de usar Claude Code desde scripts, pipelines de CI/CD, o cualquier contexto donde no hay una persona mirando la terminal en tiempo real. Se profundiza en el tema "Modo headless y CI/CD".</div>
<div class="code-block"><div class="code-lang">Comparación rápida</div><pre>
<span class="c-cm"># Interactivo -- queda abierta la conversación</span>
claude

<span class="c-cm"># No interactivo -- responde una vez y termina</span>
claude -p <span class="c-st">"explica qué hace la función calcularDescuento en pricing.py"</span>

<span class="c-cm"># No interactivo, recibiendo entrada por pipe</span>
git diff | claude -p <span class="c-st">"revisa este diff, ¿hay algún riesgo?"</span></pre></div>
<div class="concept-intro">La regla práctica: usá la sesión interactiva para trabajo exploratorio o de varios pasos donde querés ver y aprobar cada cambio; usá <code>-p</code> cuando la tarea es puntual, repetible, o se dispara automáticamente sin supervisión humana directa.</div>
  </div>
</div>
`,

'cc-contexto': `
<div class="tab-group-ccc">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccc-1','ccc')">@ para referenciar archivos</button>
    <button class="tab-btn" onclick="switchTab(this,'ccc-2','ccc')">Imágenes y pegado</button>
    <button class="tab-btn" onclick="switchTab(this,'ccc-3','ccc')">La ventana de contexto</button>
  </div>
  <div id="ccc-1" class="tab-panel active">
<div class="concept-intro">Escribiendo <code>@</code> dentro de un mensaje se activa un autocompletado de rutas del proyecto — así le indicás a Claude Code exactamente qué archivo (o carpeta) querés que tenga en cuenta, en vez de describirlo en palabras y esperar que lo encuentre solo. Es más rápido y más preciso que decir "el archivo de configuración de la base de datos".</div>
<div class="code-block"><div class="code-lang">Ejemplos de uso de @</div><pre>
Revisa @src/auth/login.py y dime si el manejo de sesiones es seguro

Compara @tests/test_pricing.py con @src/pricing.py -- faltan casos de prueba?

Aplica el mismo patrón de @src/models/user.py a un nuevo modelo Order</pre></div>
<div class="concept-intro">Aun sin usar <code>@</code>, Claude Code puede explorar el proyecto por su cuenta con las mismas herramientas que usaría un desarrollador — buscar por nombre de archivo, buscar texto dentro del código, listar carpetas — así que muchas veces alcanza con describir la tarea y dejar que investigue. El <code>@</code> es para cuando ya sabés exactamente dónde mirar y querés ahorrar esa exploración.</div>
  </div>
  <div id="ccc-2" class="tab-panel">
<div class="concept-intro">Además de texto, se le pueden pasar <strong>imágenes</strong> a Claude Code — un screenshot de un error en consola, una captura de un diseño de Figma, un diagrama dibujado a mano. Es especialmente útil para depurar errores visuales de UI o para pedir que se implemente un diseño a partir de una imagen de referencia.</div>
<table class="kv-table"><tr><th>Forma</th><th>Cómo</th></tr>
<tr><td>Pegar desde el portapapeles</td><td>Copiás la imagen (por ejemplo con una herramienta de captura de pantalla) y la pegás en el input con Ctrl+V.</td></tr>
<tr><td>Referenciar un archivo de imagen</td><td>Igual que con código: <code>@screenshot.png</code> o <code>@design/mockup.jpg</code> dentro del mensaje.</td></tr>
</table>
<div class="concept-intro">Un flujo típico: reproducís un bug visual, tomás un screenshot, lo pegás junto con "el botón de submit queda fuera de la tarjeta en mobile, revisa el CSS del componente Checkout" — Claude Code interpreta la imagen igual que interpretaría una descripción en texto, pero con la ventaja de ver exactamente el problema en vez de depender de tu descripción.</div>
  </div>
  <div id="ccc-3" class="tab-panel">
<div class="concept-intro">Como cualquier modelo de lenguaje, Claude Code trabaja dentro de una <strong>ventana de contexto</strong> finita (ver el tema "¿Qué es una API de IA?" para el concepto general de tokens y contexto). En una sesión larga — muchos archivos leídos, muchos comandos ejecutados, mucha conversación — ese espacio se va llenando, y llenarlo del todo degrada la calidad de las respuestas o corta la sesión.</div>
<table class="kv-table"><tr><th>Comando</th><th>Qué hace</th></tr>
<tr><td>/context</td><td>Muestra visualmente cuánto de la ventana de contexto está en uso y en qué se está gastando (archivos leídos, historial de conversación, etc.).</td></tr>
<tr><td>/compact [instrucciones]</td><td>Resume la conversación hasta ese punto para liberar espacio, conservando lo esencial. Podés darle instrucciones de qué priorizar al resumir.</td></tr>
<tr><td>/clear</td><td>Empieza una conversación completamente nueva y vacía, sin nada del historial anterior.</td></tr>
</table>
<div class="alert-card">💡 Buena práctica: en tareas largas, cuando termina una etapa clara del trabajo (por ejemplo, "ya migré el módulo A"), conviene compactar el contexto antes de seguir con el módulo B — así el modelo mantiene lo esencial de lo decidido, sin arrastrar el detalle completo de cada archivo que ya no hace falta releer.</div>
  </div>
</div>
`,

'cc-permisos': `
<div class="tab-group-ccpe">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccpe-1','ccpe')">Los modos de permiso</button>
    <button class="tab-btn" onclick="switchTab(this,'ccpe-2','ccpe')">Reglas allow / deny</button>
    <button class="tab-btn" onclick="switchTab(this,'ccpe-3','ccpe')">¿Qué modo elegir?</button>
  </div>
  <div id="ccpe-1" class="tab-panel active">
<div class="concept-intro">Este es el mecanismo de seguridad central de Claude Code: antes de ejecutar una acción con efecto real (editar un archivo, correr un comando de terminal, hacer un push), el modo de permisos activo decide si se pide tu aprobación, si se ejecuta directo, o si se rechaza. Se cicla entre modos con <strong>Shift+Tab</strong> dentro de la sesión.</div>
<table class="kv-table"><tr><th>Modo</th><th>Comportamiento</th></tr>
<tr><td>Default</td><td>Modo más conservador: cualquier edición de archivo o comando con efecto pide tu aprobación explícita antes de ejecutarse. Las acciones de solo lectura (leer archivos, buscar) no la piden.</td></tr>
<tr><td>Accept edits</td><td>Las ediciones de archivos se aplican automáticamente sin preguntar; comandos de terminal potencialmente riesgosos siguen pidiendo aprobación.</td></tr>
<tr><td>Plan mode</td><td>Modo de solo exploración: Claude Code puede leer e investigar todo lo que necesite, pero no aplica ningún cambio — te presenta un plan y esperás tu aprobación antes de que ejecute nada.</td></tr>
<tr><td>Auto</td><td>Modo más autónomo dentro de los que siguen pidiendo cierto control: un clasificador de seguridad evalúa cada acción y solo interrumpe para pedir aprobación en las que considera de riesgo real, en vez de preguntar por todo. Pensado para tareas largas donde aprobar cada paso sería demasiado fricción.</td></tr>
<tr><td>Don't ask</td><td>Solo se ejecutan las herramientas ya pre-aprobadas explícitamente en <code>permissions.allow</code> — cualquier otra acción se rechaza automáticamente en vez de preguntarte. Pensado para entornos automatizados donde no hay nadie mirando la pantalla para responder un diálogo.</td></tr>
<tr><td>Bypass permissions</td><td>Modo sin fricciones: se auto-aprueba todo. Pensado exclusivamente para correr dentro de un entorno aislado (contenedor o VM desechable), nunca sobre tu máquina de trabajo directa.</td></tr>
</table>
<div class="alert-card">💡 El modo por defecto no es un obstáculo — es la razón por la que podés delegarle tareas de varios pasos con confianza: vos seguís siendo quien aprueba cada cambio con efecto real antes de que ocurra, en vez de descubrirlo después en el diff.</div>
  </div>
  <div id="ccpe-2" class="tab-panel">
<div class="concept-intro">Más allá de elegir un modo general, se pueden definir reglas finas de qué acciones se permiten o se bloquean siempre, sin preguntar cada vez. Esto se configura en <code>settings.json</code> (ver el tema dedicado) bajo la clave <code>permissions</code>.</div>
<div class="code-block"><div class="code-lang">JSON — reglas allow / deny en settings.json</div><pre>
{
  <span class="c-st">"permissions"</span>: {
    <span class="c-st">"allow"</span>: [
      <span class="c-st">"Bash(npm test)"</span>,
      <span class="c-st">"Bash(npm run lint)"</span>,
      <span class="c-st">"Read(src/**)"</span>
    ],
    <span class="c-st">"deny"</span>: [
      <span class="c-st">"Bash(rm -rf *)"</span>,
      <span class="c-st">"Read(.env*)"</span>,
      <span class="c-st">"Read(secrets/**)"</span>
    ]
  }
}</pre></div>
<div class="concept-intro">Con estas reglas, comandos como <code>npm test</code> se ejecutan sin pedir aprobación cada vez (quedan en la lista blanca), mientras que cualquier intento de leer un archivo <code>.env</code> o de borrar recursivamente se bloquea siempre, sin importar el modo activo. Es el mismo principio de una política de permisos de sistema operativo: permitir lo rutinario, bloquear explícitamente lo peligroso, y dejar todo lo demás para aprobación caso por caso.</div>
  </div>
  <div id="ccpe-3" class="tab-panel">
<div class="dtree">
  <div class="dtree-title">Guía rápida para elegir el modo de permisos</div>
  <div class="dtree-step">
    <div class="dtree-num ok">1</div>
    <div class="dtree-body"><h5>¿Es tu primera vez con esta tarea o este código?</h5><p>Usá <span class="yes">Default</span> o <span class="yes">Plan mode</span> — querés ver y aprobar cada paso mientras te generás confianza en cómo la herramienta interpreta el pedido.</p></div>
  </div>
  <div class="dtree-step">
    <div class="dtree-num ok">2</div>
    <div class="dtree-body"><h5>¿Tarea de varios archivos, pero de bajo riesgo (ej. renombrar, formatear)?</h5><p>Usá <span class="yes">Accept edits</span> — revisás el diff completo al final en vez de aprobar archivo por archivo.</p></div>
  </div>
  <div class="dtree-step">
    <div class="dtree-num warn">3</div>
    <div class="dtree-body"><h5>¿Necesitás correr Claude Code sin supervisión (CI/CD, script programado)?</h5><p>Combiná <span class="no">reglas allow/deny específicas</span> con modo no interactivo, en vez de bypass total — así el proceso automatizado solo puede hacer lo que explícitamente le permitiste.</p></div>
  </div>
  <div class="dtree-step">
    <div class="dtree-num warn">4</div>
    <div class="dtree-body"><h5>¿Estás considerando "Bypass permissions"?</h5><p>Solo si estás dentro de un contenedor o VM aislada y desechable. Nunca sobre tu máquina real con acceso a credenciales, producción o archivos que te importen.</p></div>
  </div>
</div>
  </div>
</div>
`,

'cc-git': `
<div class="tab-group-ccg">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccg-1','ccg')">Commits y diffs</button>
    <button class="tab-btn" onclick="switchTab(this,'ccg-2','ccg')">Pull Requests con GitHub CLI</button>
    <button class="tab-btn" onclick="switchTab(this,'ccg-3','ccg')">Reglas de seguridad por defecto</button>
    <button class="tab-btn" onclick="switchTab(this,'ccg-4','ccg')">Worktrees — trabajo en paralelo</button>
  </div>
  <div id="ccg-1" class="tab-panel active">
<div class="concept-intro">Claude Code usa git como lo usaría cualquier desarrollador desde la terminal: revisa <code>git status</code> y <code>git diff</code> para entender qué cambió, arma commits con mensajes descriptivos, y puede crear o cambiar de rama. La diferencia es que vos lo pedís en lenguaje natural en vez de escribir cada comando.</div>
<div class="code-block"><div class="code-lang">Ejemplos de pedidos típicos</div><pre>
Revisa los cambios pendientes y crea un commit con un mensaje descriptivo

Crea una rama feature/reportes-pdf y cambia a ella

Muéstrame el diff de los últimos 3 commits en el módulo de pagos</pre></div>
<div class="concept-intro">Un buen hábito es pedir explícitamente que <strong>siga el estilo de mensajes de commit del repositorio</strong> (por ejemplo, Conventional Commits si el equipo los usa) — Claude Code puede inspeccionar <code>git log</code> para inferir el patrón y mantenerlo consistente, en vez de generar mensajes genéricos tipo "update files".</div>
  </div>
  <div id="ccg-2" class="tab-panel">
<div class="concept-intro">Para todo lo relacionado con GitHub (Pull Requests, Issues, revisar checks de CI), Claude Code usa la <strong>GitHub CLI</strong> (<code>gh</code>) si está instalada y autenticada en tu máquina — no reinventa esa integración, aprovecha la herramienta oficial de línea de comandos de GitHub.</div>
<div class="code-block"><div class="code-lang">Flujo típico: rama, commit y PR en un solo pedido</div><pre>
Crea una rama para este fix, commitea los cambios, sube la rama
y abre un Pull Request con una descripción de qué se arregló y cómo probarlo</pre></div>
<div class="concept-intro">Claude Code arma el título y la descripción del PR a partir de los commits reales incluidos (no solo del último), y suele incluir una sección de "plan de pruebas" o checklist para quien vaya a revisarlo. Como con cualquier acción que publica algo visible para otros (push, PR, comentarios), esto cae bajo el mismo criterio de aprobación explícita cubierto en "Modos de permisos".</div>
  </div>
  <div id="ccg-3" class="tab-panel">
<div class="concept-intro">Por diseño, hay una serie de operaciones de git que Claude Code trata como especialmente sensibles y evita hacer salvo pedido explícito y claro de tu parte, incluso en modos de permisos más permisivos:</div>
<table class="kv-table"><tr><th>Operación</th><th>Por qué se trata distinto</th></tr>
<tr><td>git push --force</td><td>Puede sobrescribir el historial remoto y perder commits de otras personas — solo se hace si lo pedís explícitamente.</td></tr>
<tr><td>git reset --hard / git clean -f</td><td>Descartan cambios locales sin posibilidad de recuperarlos fácilmente — antes de este tipo de comandos, conviene revisar <code>git status</code> primero.</td></tr>
<tr><td>--no-verify / saltar hooks</td><td>Se evita salvo pedido explícito: los hooks de pre-commit suelen existir por una razón (linters, tests rápidos).</td></tr>
<tr><td>Amend de commits ya publicados</td><td>Se prefiere crear un commit nuevo en vez de reescribir uno que ya podría estar compartido con otros.</td></tr>
</table>
<div class="alert-card">💡 Esta cautela por defecto es exactamente la misma que seguirías vos con un compañero nuevo en el equipo: podés pedirle que haga esas operaciones cuando realmente hace falta, pero la herramienta no las toma como "el camino por defecto" para resolver un problema.</div>
  </div>
  <div id="ccg-4" class="tab-panel">
<div class="concept-intro">Un <strong>worktree</strong> de git es un checkout adicional del mismo repositorio en otra carpeta, con su propia rama activa, que comparte el historial pero permite tener varias ramas "abiertas" físicamente al mismo tiempo sin hacer <code>git stash</code> ni <code>git checkout</code> de un lado a otro. Claude Code se apoya en este mecanismo para paralelizar trabajo: en vez de una tarea larga a la vez, se pueden lanzar varias tareas independientes, cada una en su propio worktree aislado.</div>
<div class="pipeline-diagram"><span class="p-blue">Repo original (rama main)</span> ──▶ <span class="p-amber">Worktree A -- rama feature/auth</span>
                    ──▶ <span class="p-green">Worktree B -- rama fix/bug-123</span>
                    ──▶ <span class="p-amber">Worktree C -- rama refactor/pricing</span></div>
<div class="concept-intro">Cada worktree tiene su propio directorio de trabajo y su propia rama, así que una tarea puede estar corriendo tests en el worktree A mientras otra edita archivos en el worktree B, sin pisarse — algo que sería imposible en una sola carpeta con una sola rama activa a la vez. Es el mismo principio detrás de <code>/batch</code> (lanzar varias tareas en paralelo, cada una en su propio worktree con su propio PR) o de correr varios subagentes que necesitan tocar archivos de forma simultánea sin interferir entre sí.</div>
<table class="kv-table"><tr><th>Ventaja</th><th>Detalle</th></tr>
<tr><td>Aislamiento real</td><td>Cada worktree es una copia de trabajo separada — los cambios sin commitear de una tarea no pueden mezclarse por accidente con los de otra.</td></tr>
<tr><td>Historial compartido</td><td>Todos los worktrees comparten el mismo <code>.git</code> — no hace falta clonar el repo varias veces ni sincronizar manualmente.</td></tr>
<tr><td>Limpieza</td><td>Un worktree que ya no se usa se elimina y se libera con los comandos estándar de git para worktrees, sin dejar residuos en el historial.</td></tr>
</table>
<div class="alert-card">💡 No hace falta pensarlo como una herramienta aparte: es git haciendo lo que siempre supo hacer (múltiples ramas), aplicado a que varias tareas de Claude Code — sean tuyas en paralelo o de varios subagentes — puedan avanzar al mismo tiempo sin bloquearse unas a otras.</div>
  </div>
</div>
`,

'cc-claudemd': `
<div class="tab-group-ccm">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccm-1','ccm')">Qué es y para qué sirve</button>
    <button class="tab-btn" onclick="switchTab(this,'ccm-2','ccm')">Dónde colocarlo</button>
    <button class="tab-btn" onclick="switchTab(this,'ccm-3','ccm')">Generarlo con /init</button>
  </div>
  <div id="ccm-1" class="tab-panel active">
<div class="concept-intro"><code>CLAUDE.md</code> es un archivo Markdown que Claude Code carga automáticamente al iniciar una sesión en un proyecto — funciona como <strong>memoria persistente del proyecto</strong>: información que querés que el modelo tenga siempre presente, sin tener que repetirla en cada conversación nueva.</div>
<div class="concept-intro">Es el lugar correcto para hechos estables sobre el proyecto: comandos de build y test, convenciones de código del equipo, decisiones de arquitectura, partes del código que son delicadas y requieren cuidado extra. <strong>No</strong> es el lugar para instrucciones de una tarea puntual — eso va directo en el mensaje de esa conversación.</div>
<div class="code-block"><div class="code-lang">Ejemplo de CLAUDE.md</div><pre>
<span class="c-cm"># Nombre del Proyecto</span>

<span class="c-cm">## Comandos</span>
- Build: npm run build
- Test: npm run test
- Lint: npm run lint

<span class="c-cm">## Arquitectura</span>
API REST en Express (src/api/), frontend en React (src/web/).
La lógica de negocio vive en src/services/, nunca en los controllers.

<span class="c-cm">## Convenciones</span>
- Indentación de 2 espacios
- Todas las funciones exportadas llevan JSDoc
- Los tests van junto al archivo que testean (*.test.ts)

<span class="c-cm">## Cuidado especial</span>
El módulo src/billing/ toca el sistema de facturación real -- cualquier
cambio ahí requiere correr la suite completa de tests antes de commitear.</pre></div>
  </div>
  <div id="ccm-2" class="tab-panel">
<table class="kv-table"><tr><th>Ubicación</th><th>Alcance</th></tr>
<tr><td>./CLAUDE.md (raíz del proyecto)</td><td>Compartido con el equipo vía git — instrucciones que aplican a cualquiera que trabaje en el repo.</td></tr>
<tr><td>./CLAUDE.local.md</td><td>Personal, se agrega a .gitignore — tus propias notas o preferencias que no querés imponerle al resto del equipo.</td></tr>
<tr><td>~/.claude/CLAUDE.md (carpeta de usuario)</td><td>Global para vos, aplica a todos tus proyectos — preferencias personales de estilo o de flujo de trabajo, independientes del repo.</td></tr>
</table>
<div class="concept-intro">Cuando existen varios, Claude Code los combina: primero lo global de usuario, después lo del proyecto, después lo local — de más general a más específico. Esto permite tener reglas de equipo compartidas en el repo, y encima tus propias preferencias personales, sin que choquen entre sí.</div>
<div class="alert-card">💡 Mantenelo corto y concreto. Un CLAUDE.md de 300 líneas con reglas vagas se lee peor (por el modelo y por las personas) que uno de 40 líneas con comandos exactos y reglas accionables. Si algo dejó de ser cierto, conviene borrarlo — instrucciones obsoletas confunden más de lo que ayudan.</div>
  </div>
  <div id="ccm-3" class="tab-panel">
<div class="concept-intro">En vez de escribir el CLAUDE.md desde cero, el comando <code>/init</code> le pide a Claude Code que <strong>explore el proyecto por su cuenta</strong> — lea el <code>package.json</code> o equivalente, detecte el framework, revise la estructura de carpetas, identifique comandos de test/build existentes — y genere un CLAUDE.md inicial razonable a partir de eso.</div>
<div class="code-block"><div class="code-lang">Dentro de una sesión, en la raíz del proyecto</div><pre>
/init</pre></div>
<div class="concept-intro">El resultado es un punto de partida, no un documento final: conviene revisarlo, corregir lo que el modelo haya inferido mal, y sobre todo agregar el conocimiento que <em>no</em> está en el código — decisiones de arquitectura, trampas conocidas, contexto de negocio — porque eso es información que ningún análisis automático del repo puede deducir por sí solo.</div>
  </div>
</div>
`,

'cc-settings': `
<div class="tab-group-ccs">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccs-1','ccs')">Jerarquía de archivos</button>
    <button class="tab-btn" onclick="switchTab(this,'ccs-2','ccs')">Permisos allow / deny</button>
    <button class="tab-btn" onclick="switchTab(this,'ccs-3','ccs')">Entorno y modelo</button>
  </div>
  <div id="ccs-1" class="tab-panel active">
<div class="concept-intro"><code>settings.json</code> es el archivo de configuración de Claude Code: define permisos por defecto, variables de entorno, hooks, y otras preferencias de comportamiento. Igual que <code>CLAUDE.md</code>, existe en distintos niveles que se combinan de más general a más específico.</div>
<table class="kv-table"><tr><th>Ubicación</th><th>Alcance</th><th>Se comparte con git</th></tr>
<tr><td>~/.claude/settings.json</td><td>Usuario — aplica a todos tus proyectos</td><td>No</td></tr>
<tr><td>.claude/settings.json</td><td>Proyecto — reglas del equipo para ese repo</td><td>Sí</td></tr>
<tr><td>.claude/settings.local.json</td><td>Local — tus overrides personales para ese proyecto puntual</td><td>No (va en .gitignore)</td></tr>
</table>
<div class="concept-intro">El patrón es el mismo que usarías para variables de entorno de un proyecto: configuración compartida y versionada en <code>.claude/settings.json</code>, y overrides personales o con datos sensibles en el archivo <code>.local.json</code> que cada quien mantiene fuera del control de versiones.</div>
  </div>
  <div id="ccs-2" class="tab-panel">
<div class="concept-intro">La sección más usada de <code>settings.json</code> es <code>permissions</code> — ya se vio en el tema anterior cómo definir reglas <code>allow</code> y <code>deny</code>. Acá el foco es la sintaxis de los patrones, porque es donde más se cometen errores al configurarlo por primera vez.</div>
<div class="code-block"><div class="code-lang">Sintaxis de patrones de permisos</div><pre>
{
  <span class="c-st">"permissions"</span>: {
    <span class="c-st">"allow"</span>: [
      <span class="c-st">"Bash(npm test)"</span>,        <span class="c-cm">// comando exacto</span>
      <span class="c-st">"Bash(npm run *)"</span>,       <span class="c-cm">// * = cualquier cosa después de este prefijo</span>
      <span class="c-st">"Read(src/**)"</span>,          <span class="c-cm">// ** = cualquier profundidad de carpetas</span>
      <span class="c-st">"Edit(docs/*.md)"</span>        <span class="c-cm">// glob de un solo nivel</span>
    ],
    <span class="c-st">"deny"</span>: [
      <span class="c-st">"Read(.env*)"</span>,           <span class="c-cm">// bloquea .env, .env.local, etc.</span>
      <span class="c-st">"Bash(curl *)"</span>           <span class="c-cm">// bloquea cualquier llamada a curl</span>
    ]
  }
}</pre></div>
<div class="alert-card">💡 <code>deny</code> siempre gana sobre <code>allow</code>: si un patrón coincide con ambas listas, se bloquea. Esto es intencional — te deja escribir reglas amplias en <code>allow</code> para comodidad, y after excepciones puntuales estrictas en <code>deny</code> para lo que nunca debería pasar, sin tener que hacer el <code>allow</code> perfectamente quirúrgico.</div>
  </div>
  <div id="ccs-3" class="tab-panel">
<div class="concept-intro">Además de permisos, <code>settings.json</code> permite fijar variables de entorno propias del proyecto y elegir el modelo por defecto, entre otras opciones de comportamiento general.</div>
<div class="code-block"><div class="code-lang">Ejemplo combinado</div><pre>
{
  <span class="c-st">"env"</span>: {
    <span class="c-st">"NODE_ENV"</span>: <span class="c-st">"development"</span>
  },
  <span class="c-st">"model"</span>: <span class="c-st">"claude-sonnet-5"</span>,
  <span class="c-st">"permissions"</span>: {
    <span class="c-st">"defaultMode"</span>: <span class="c-st">"acceptEdits"</span>
  }
}</pre></div>
<div class="concept-intro">Fijar <code>defaultMode</code> a nivel de proyecto es útil cuando un repo tiene una dinámica de trabajo conocida (por ejemplo, un repo de documentación de bajo riesgo donde aceptar ediciones automáticamente ahorra fricción), sin tener que recordar cambiar el modo cada vez que entrás a ese proyecto.</div>
<div class="error-note"><b>Importante:</b> nunca pongas API keys ni secretos directamente en <code>settings.json</code> si ese archivo se sube a git (el de nivel proyecto sí se versiona). Los valores sensibles van en variables de entorno del sistema o en <code>settings.local.json</code>, que queda fuera del repositorio.</div>
  </div>
</div>
`,

'cc-slash-skills': `
<div class="tab-group-ccsk">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccsk-1','ccsk')">Slash commands esenciales</button>
    <button class="tab-btn" onclick="switchTab(this,'ccsk-2','ccsk')">Skills personalizadas</button>
  </div>
  <div id="ccsk-1" class="tab-panel active">
<div class="concept-intro">Los comandos slash son atajos incorporados para acciones sobre la herramienta misma (no sobre tu código) — cambiar de modelo, limpiar contexto, revisar configuración. Escribiendo <code>/</code> solo, la interfaz muestra la lista completa filtrable; estos son los que más se usan en el día a día:</div>
<table class="kv-table"><tr><th>Comando</th><th>Qué hace</th></tr>
<tr><td>/help</td><td>Muestra la ayuda y la lista de comandos disponibles.</td></tr>
<tr><td>/clear</td><td>Empieza una conversación nueva, sin el historial anterior.</td></tr>
<tr><td>/compact [instrucciones]</td><td>Resume la conversación para liberar espacio de contexto, conservando lo importante.</td></tr>
<tr><td>/model</td><td>Abre el selector de modelo (por ejemplo, cambiar entre un modelo más rápido y uno más potente según la tarea).</td></tr>
<tr><td>/init</td><td>Genera un CLAUDE.md inicial explorando el proyecto.</td></tr>
<tr><td>/permissions</td><td>Abre la configuración de reglas de permisos.</td></tr>
<tr><td>/mcp</td><td>Gestiona los servidores MCP conectados (conectar, reconectar, ver estado).</td></tr>
<tr><td>/review</td><td>Revisa el diff actual con foco en calidad y correctitud.</td></tr>
<tr><td>/cost</td><td>Muestra el uso y costo estimado de la sesión actual.</td></tr>
<tr><td>/resume</td><td>Vuelve a una conversación anterior guardada.</td></tr>
<tr><td>/doctor</td><td>Diagnostica y ayuda a reparar problemas de configuración.</td></tr>
</table>
<div class="alert-card">💡 La lista exacta y el nombre de algunos comandos puede variar entre versiones de Claude Code — la fuente de verdad siempre es <code>/help</code> dentro de tu propia instalación, no una lista memorizada.</div>
  </div>
  <div id="ccsk-2" class="tab-panel">
<div class="concept-intro">Cuando un flujo de trabajo se repite en el equipo — por ejemplo, "generar un reporte de cobertura de tests y explicarlo" o "revisar un PR contra el checklist de seguridad interno" — tiene sentido empaquetarlo como una <strong>Skill</strong> personalizada en vez de re-explicarlo cada vez en el chat. Una Skill es un archivo <code>SKILL.md</code> con instrucciones reutilizables (y opcionalmente scripts de apoyo) que Claude Code puede invocar.</div>
<div class="code-block"><div class="code-lang">Estructura típica de una Skill del proyecto</div><pre>
.claude/skills/revision-seguridad/
├── SKILL.md          <span class="c-cm"># instrucciones de la skill</span>
└── checklist.md       <span class="c-cm"># checklist de referencia que la skill usa</span></pre></div>
<div class="code-block"><div class="code-lang">SKILL.md — ejemplo</div><pre>
---
name: <span class="c-st">"revision-seguridad"</span>
description: <span class="c-st">"Revisa un diff contra el checklist de seguridad interno del equipo"</span>
---

<span class="c-cm"># Revisión de seguridad</span>

Revisa el diff actual contra @.claude/skills/revision-seguridad/checklist.md.
Por cada ítem del checklist que aplique al código modificado, indica si se
cumple, no se cumple, o no aplica -- con la línea exacta cuando corresponda.</pre></div>
<div class="concept-intro">La diferencia con un <strong>subagente</strong> (tema siguiente) es que una Skill son instrucciones que se cargan dentro de la conversación actual cuando hacen falta, mientras que un subagente corre en su propio contexto aislado. Como regla general: si es "seguí estos pasos con este contexto", es una Skill; si es "delegá esto por completo y traeme solo el resultado", es un subagente.</div>
  </div>
</div>
`,

'cc-subagents': `
<div class="tab-group-cca">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'cca-1','cca')">Qué son y cuándo usarlos</button>
    <button class="tab-btn" onclick="switchTab(this,'cca-2','cca')">Cómo definir uno</button>
    <button class="tab-btn" onclick="switchTab(this,'cca-3','cca')">Ejemplo práctico</button>
  </div>
  <div id="cca-1" class="tab-panel active">
<div class="concept-intro">Un <strong>subagente</strong> es una instancia de Claude Code especializada que corre una tarea en su <strong>propio contexto aislado</strong>, separado de la conversación principal, y devuelve solo el resultado final. Se invoca a través de la herramienta <code>Task</code>: la sesión principal delega, el subagente investiga/ejecuta por su cuenta, y solo su conclusión vuelve a ocupar espacio en el contexto de la sesión principal.</div>
<div class="pipeline-diagram"><span class="p-blue">Sesión principal</span> ──▶ <span class="p-amber">Task(subagente, "investiga X")</span> ──▶ <span class="p-green">Subagente explora en SU PROPIO contexto (puede leer 50 archivos)</span> ──▶ <span class="p-amber">Devuelve un resumen conciso</span> ──▶ <span class="p-blue">Sesión principal sigue con contexto limpio</span></div>
<div class="concept-intro">El beneficio central es <strong>preservar el contexto de la sesión principal</strong>. Si una investigación requiere leer veinte archivos para responder una sola pregunta, hacerlo directo en el hilo principal llena la ventana de contexto con contenido que ya no hace falta una vez que tenés la respuesta. Delegado a un subagente, esos veinte archivos se leen "en otro lado", y a la sesión principal solo le llega la conclusión.</div>
<div class="concept-intro">Otro uso frecuente: correr varias exploraciones o tareas independientes <strong>en paralelo</strong> — por ejemplo, tres subagentes investigando tres partes distintas de un bug al mismo tiempo, en vez de una tras otra.</div>
  </div>
  <div id="cca-2" class="tab-panel">
<div class="concept-intro">Los subagentes personalizados se definen como archivos Markdown con frontmatter, uno por agente, en una carpeta reservada del proyecto o del usuario.</div>
<table class="kv-table"><tr><th>Ubicación</th><th>Alcance</th></tr>
<tr><td>.claude/agents/nombre-agente.md</td><td>Del proyecto — compartido con el equipo vía git.</td></tr>
<tr><td>~/.claude/agents/nombre-agente.md</td><td>Personal — disponible en todos tus proyectos.</td></tr>
</table>
<div class="code-block"><div class="code-lang">.claude/agents/revisor-codigo.md</div><pre>
---
name: revisor-codigo
description: >
  Experto en revisión de código para bugs, seguridad y calidad.
  Úsalo antes de abrir un Pull Request.
tools:
  - Read
  - Glob
  - Grep
---

<span class="c-cm"># Instrucciones de revisión</span>

Eres un revisor de código senior. Analiza el diff actual buscando:
- Errores lógicos y edge cases no manejados
- Vulnerabilidades de seguridad (inyección, datos sin validar)
- Código duplicado o que podría simplificarse
- Violaciones de las convenciones descritas en CLAUDE.md

No hagas cambios -- solo reporta hallazgos, ordenados por severidad.</pre></div>
<div class="concept-intro">El campo <code>tools</code> limita qué herramientas puede usar ese subagente en particular — un subagente de solo revisión, por ejemplo, no necesita permiso de <code>Edit</code> o <code>Bash</code>, lo cual además reduce el riesgo si algo sale mal en su ejecución.</div>
  </div>
  <div id="cca-3" class="tab-panel">
<div class="concept-intro">Un ejemplo concreto de cuándo conviene delegar en vez de investigar directo en el hilo principal:</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Sin subagente</div><pre>
Tú: "¿Por qué falla el test de integración de pagos?"

Claude Code lee 15 archivos del módulo de pagos,
2 archivos de configuración, y el log de CI completo
-- directo en el hilo principal.

Resultado: la respuesta llega, pero el contexto de
la sesión principal quedó lleno con contenido que
ya no hace falta para seguir trabajando.</pre></div>
  <div class="err-good"><div class="err-label">✅ Con subagente</div><pre>
Tú: "Delega en un subagente investigar por qué falla
el test de integración de pagos, y que me traiga
solo la causa raíz y el archivo/línea involucrados"

El subagente lee esos mismos 15+ archivos EN SU
PROPIO contexto aislado, y devuelve 3 líneas:
causa raíz + ubicación exacta + sugerencia de fix.

Resultado: la sesión principal recibe la conclusión,
sin cargar con el detalle de la exploración.</pre></div>
</div>
<div class="concept-intro">Esta es la misma lógica detrás de agentes de propósito general como <em>Explore</em> (búsqueda de código de solo lectura) que existen precisamente para investigaciones amplias que no deberían "costar" contexto en la conversación principal.</div>
  </div>
</div>
`,

'cc-hooks': `
<div class="tab-group-cch">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'cch-1','cch')">Eventos disponibles</button>
    <button class="tab-btn" onclick="switchTab(this,'cch-2','cch')">Configurar un hook</button>
    <button class="tab-btn" onclick="switchTab(this,'cch-3','cch')">Casos de uso típicos</button>
  </div>
  <div id="cch-1" class="tab-panel active">
<div class="concept-intro">Los <strong>hooks</strong> son comandos externos que Claude Code ejecuta automáticamente en momentos específicos del ciclo de vida de una sesión o de una herramienta — igual que un hook de git (<code>pre-commit</code>, por ejemplo), pero para eventos de la propia herramienta. Se configuran en <code>settings.json</code>.</div>
<table class="kv-table"><tr><th>Evento</th><th>Cuándo dispara</th></tr>
<tr><td>PreToolUse</td><td>Antes de que se ejecute una herramienta (por ejemplo, antes de un Bash o un Edit) — puede bloquear la acción.</td></tr>
<tr><td>PostToolUse</td><td>Después de que una herramienta terminó con éxito — útil para reaccionar al resultado (ej. correr un linter tras una edición).</td></tr>
<tr><td>UserPromptSubmit</td><td>Antes de procesar un mensaje nuevo que enviaste — puede inyectar contexto adicional o bloquear el mensaje.</td></tr>
<tr><td>SessionStart / SessionEnd</td><td>Al iniciar o cerrar una sesión — útil para setup/cleanup de entorno.</td></tr>
<tr><td>Stop</td><td>Cuando Claude Code termina de responder — útil para notificaciones.</td></tr>
</table>
<div class="concept-intro">Un hook puede además <strong>bloquear</strong> la acción que dispara el evento (por ejemplo, impedir que se ejecute un comando de Bash que coincide con un patrón peligroso), no solo observarla pasivamente.</div>
  </div>
  <div id="cch-2" class="tab-panel">
<div class="concept-intro">Un hook se define con un <code>matcher</code> (a qué herramienta o evento aplica) y un comando a ejecutar. El comando recibe información del evento y puede responder si debe continuar o bloquearse.</div>
<div class="code-block"><div class="code-lang">settings.json — formatear automáticamente tras cada edición</div><pre>
{
  <span class="c-st">"hooks"</span>: {
    <span class="c-st">"PostToolUse"</span>: [
      {
        <span class="c-st">"matcher"</span>: <span class="c-st">"Edit"</span>,
        <span class="c-st">"hooks"</span>: [
          {
            <span class="c-st">"type"</span>: <span class="c-st">"command"</span>,
            <span class="c-st">"command"</span>: <span class="c-st">"npx prettier --write $(git diff --name-only)"</span>
          }
        ]
      }
    ]
  }
}</pre></div>
<div class="code-block"><div class="code-lang">settings.json — bloquear comandos destructivos</div><pre>
{
  <span class="c-st">"hooks"</span>: {
    <span class="c-st">"PreToolUse"</span>: [
      {
        <span class="c-st">"matcher"</span>: <span class="c-st">"Bash"</span>,
        <span class="c-st">"hooks"</span>: [
          {
            <span class="c-st">"type"</span>: <span class="c-st">"command"</span>,
            <span class="c-st">"command"</span>: <span class="c-st">"./.claude/hooks/bloquear-comandos-riesgosos.sh"</span>
          }
        ]
      }
    ]
  }
}</pre></div>
<div class="concept-intro">El script del hook recibe los datos del evento (qué comando se va a ejecutar, en qué directorio, etc.) y decide si continúa o bloquea, de forma parecida a como un middleware valida una request antes de dejarla pasar.</div>
  </div>
  <div id="cch-3" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Formateo y lint automáticos</div>
  <p>Un hook de PostToolUse en Edit que corre Prettier, Black, o gofmt automáticamente tras cada cambio, para que el estilo del código nunca dependa de que el modelo lo recuerde.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Bloquear comandos peligrosos por política de equipo</div>
  <p>Un hook de PreToolUse en Bash que rechaza patrones específicos (por ejemplo, cualquier comando que toque una base de datos de producción) más allá de las reglas generales de <code>permissions.deny</code>, con lógica custom si hace falta.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Notificaciones al terminar una tarea larga</div>
  <p>Un hook de Stop que manda una notificación (Slack, sonido del sistema, notificación de escritorio) cuando Claude Code termina una tarea que tomó varios minutos, para no tener que estar mirando la terminal.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Correr tests automáticamente tras cada edición relevante</div>
  <p>Un hook de PostToolUse que corre la suite de tests del archivo modificado, dando feedback inmediato sin que haga falta pedirlo explícitamente en cada turno.</p>
</div>
  </div>
</div>
`,

'cc-mcp': `
<div class="tab-group-ccmc">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccmc-1','ccmc')">Qué problema resuelve</button>
    <button class="tab-btn" onclick="switchTab(this,'ccmc-2','ccmc')">Configurar un servidor MCP</button>
    <button class="tab-btn" onclick="switchTab(this,'ccmc-3','ccmc')">Comandos claude mcp</button>
  </div>
  <div id="ccmc-1" class="tab-panel active">
<div class="concept-intro"><strong>MCP</strong> (Model Context Protocol) es un protocolo abierto que estandariza cómo un modelo de IA se conecta a herramientas y fuentes de datos externas — una base de datos, un sistema de tickets, un navegador, un servicio interno de la empresa. Antes de un estándar así, cada integración de este tipo requería código a medida; con MCP, cualquier herramienta que implemente el protocolo queda disponible para cualquier cliente compatible (Claude Code entre ellos) sin desarrollo adicional.</div>
<div class="pipeline-diagram"><span class="p-blue">Claude Code</span> ──▶ <span class="p-amber">Protocolo MCP (estándar)</span> ──▶ <span class="p-green">Servidor MCP (Postgres, Slack, Sentry, Playwright, tu API interna, ...)</span></div>
<div class="concept-intro">Es conceptualmente similar a lo que USB hizo para periféricos: en vez de un cable distinto por cada dispositivo, un puerto estándar al que cualquier fabricante puede conectar el suyo. Acá, en vez de escribir código de integración distinto para cada base de datos o servicio, el servidor MCP de ese servicio expone sus capacidades de forma estándar, y Claude Code las puede usar directamente.</div>
  </div>
  <div id="ccmc-2" class="tab-panel">
<div class="concept-intro">Los servidores MCP de un proyecto se configuran en un archivo <code>.mcp.json</code> en la raíz — así el equipo entero comparte la misma configuración vía git, igual que <code>CLAUDE.md</code>.</div>
<div class="code-block"><div class="code-lang">.mcp.json — ejemplo con dos servidores</div><pre>
{
  <span class="c-st">"mcpServers"</span>: {
    <span class="c-st">"playwright"</span>: {
      <span class="c-st">"type"</span>: <span class="c-st">"stdio"</span>,
      <span class="c-st">"command"</span>: <span class="c-st">"npx"</span>,
      <span class="c-st">"args"</span>: [<span class="c-st">"-y"</span>, <span class="c-st">"@playwright/mcp@latest"</span>]
    },
    <span class="c-st">"docs-internos"</span>: {
      <span class="c-st">"type"</span>: <span class="c-st">"http"</span>,
      <span class="c-st">"url"</span>: <span class="c-st">"https://mcp.miempresa.com/docs"</span>
    }
  }
}</pre></div>
<table class="kv-table"><tr><th>Tipo de transporte</th><th>Cuándo se usa</th></tr>
<tr><td>stdio</td><td>Proceso local que se ejecuta en tu máquina (ej. un servidor que corre con npx). Más control, no requiere infraestructura hosteada.</td></tr>
<tr><td>http</td><td>Servidor remoto expuesto por URL. Menos setup local, requiere que el servicio esté hosteado y accesible.</td></tr>
</table>
<div class="alert-card">💡 Con Playwright MCP conectado, por ejemplo, Claude Code puede abrir un navegador real, navegar tu aplicación, hacer clicks y leer el DOM — útil para verificar visualmente un cambio de frontend, no solo confiar en que el código "debería" verse bien.</div>
  </div>
  <div id="ccmc-3" class="tab-panel">
<div class="concept-intro">Además de editar <code>.mcp.json</code> a mano, hay comandos de CLI para gestionar servidores MCP sin salir de la terminal.</div>
<div class="code-block"><div class="code-lang">Gestión de servidores MCP</div><pre>
<span class="c-cm"># Agregar un servidor MCP local (stdio)</span>
claude mcp add playwright -- npx -y @playwright/mcp@latest

<span class="c-cm"># Agregar un servidor MCP remoto (http)</span>
claude mcp add --transport http docs-internos https://mcp.miempresa.com/docs

<span class="c-cm"># Ver los servidores conectados y su estado</span>
claude mcp list

<span class="c-cm"># Quitar un servidor</span>
claude mcp remove playwright</pre></div>
<div class="code-block"><div class="code-lang">Dentro de una sesión interactiva</div><pre>
/mcp              <span class="c-cm"># ver estado, conectar/autenticar servidores</span></pre></div>
<div class="concept-intro">Algunos servidores MCP remotos requieren autenticación (por ejemplo, OAuth con tu cuenta de ese servicio) — en esos casos, <code>/mcp</code> dentro de la sesión te guía por el flujo de login la primera vez que lo usás.</div>
  </div>
</div>
`,

'cc-headless': `
<div class="tab-group-ccx">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccx-1','ccx')">claude -p en scripts</button>
    <button class="tab-btn" onclick="switchTab(this,'ccx-2','ccx')">Salida en JSON</button>
    <button class="tab-btn" onclick="switchTab(this,'ccx-3','ccx')">Integración en CI/CD</button>
  </div>
  <div id="ccx-1" class="tab-panel active">
<div class="concept-intro">El modo <strong>headless</strong> (sin interfaz interactiva) es <code>claude -p</code>: se le da un prompt, corre hasta terminar la tarea, imprime el resultado y sale con un código de salida (0 = éxito, distinto de 0 = error) — el mismo contrato que cualquier otro comando de Unix que se usa dentro de un script o pipeline.</div>
<div class="code-block"><div class="code-lang">Ejemplos de uso en scripts</div><pre>
<span class="c-cm"># Prompt directo, sin interacción</span>
claude -p <span class="c-st">"resume los cambios de este PR en 3 líneas"</span>

<span class="c-cm"># Recibiendo contenido por pipe (stdin)</span>
git diff main | claude -p <span class="c-st">"revisa este diff, señala riesgos de seguridad"</span>

<span class="c-cm"># Encadenado en un script bash con manejo de error</span>
if ! claude -p <span class="c-st">"corre los tests y confirma que todos pasan"</span>; then
  echo <span class="c-st">"Claude Code reportó un problema"</span>
  exit 1
fi</pre></div>
<div class="concept-intro">Como no hay una persona mirando la pantalla para aprobar cada paso, el modo de permisos en headless normalmente se combina con reglas explícitas de <code>allow</code>/<code>deny</code> (ver "Modos de permisos") en vez de dejarlo en el modo por defecto, que quedaría bloqueado esperando una aprobación que nunca llega.</div>
  </div>
  <div id="ccx-2" class="tab-panel">
<div class="concept-intro">Para que la salida de <code>claude -p</code> sea fácil de procesar por otro programa (en vez de leerla como texto libre), existe el flag <code>--output-format json</code>, que devuelve un objeto estructurado en vez de solo el texto de respuesta.</div>
<div class="code-block"><div class="code-lang">Salida en JSON</div><pre>
claude -p <span class="c-st">"resume el estado del proyecto"</span> --output-format json</pre></div>
<div class="code-block"><div class="code-lang">Forma aproximada del JSON de respuesta</div><pre>
{
  <span class="c-st">"result"</span>: <span class="c-st">"..."</span>,
  <span class="c-st">"session_id"</span>: <span class="c-st">"..."</span>,
  <span class="c-st">"total_cost_usd"</span>: <span class="c-nb">0.012</span>,
  <span class="c-st">"usage"</span>: { <span class="c-st">"input_tokens"</span>: <span class="c-nb">...</span>, <span class="c-st">"output_tokens"</span>: <span class="c-nb">...</span> }
}</pre></div>
<div class="code-block"><div class="code-lang">Procesando el JSON con jq en un script</div><pre>
RESUMEN=$(claude -p <span class="c-st">"resume este PR"</span> --output-format json | jq -r <span class="c-st">'.result'</span>)
echo <span class="c-st">"$RESUMEN"</span></pre></div>
<div class="concept-intro">Esto es lo que permite integrar Claude Code como un paso más de un pipeline automatizado — el output ya no es "texto para que lo lea una persona", sino datos que otro programa puede leer y sobre los que puede tomar decisiones (por ejemplo, fallar el build si el campo de resultado contiene ciertas palabras clave).</div>
  </div>
  <div id="ccx-3" class="tab-panel">
<div class="concept-intro">Un caso de uso frecuente es integrarlo como paso de un workflow de GitHub Actions — por ejemplo, para que revise automáticamente cada Pull Request nuevo.</div>
<div class="code-block"><div class="code-lang">.github/workflows/revision-ia.yml — ejemplo conceptual</div><pre>
name: Revision automatica con Claude Code

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  revisar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Instalar Claude Code
        run: curl -fsSL https://claude.ai/install.sh | bash

      - name: Revisar el diff del PR
        env:
          ANTHROPIC_API_KEY: <span class="c-st">\${{ secrets.ANTHROPIC_API_KEY }}</span>
        run: |
          git diff origin/main | claude -p \\
            <span class="c-st">"revisa este diff buscando bugs y riesgos de seguridad"</span> \\
            --output-format json > revision.json</pre></div>
<div class="concept-intro">La <code>API_KEY</code> vive como secreto de GitHub Actions (nunca en el código del workflow), exactamente con la misma disciplina de seguridad que cualquier otro secreto usado en CI/CD. El resultado (<code>revision.json</code>) puede después comentarse automáticamente en el PR, bloquear el merge si detecta problemas graves, o simplemente quedar como un artefacto de esa corrida.</div>
<div class="alert-card">💡 Este patrón — Claude Code como un paso más de CI, con su propia API key y reglas de permisos acotadas — es la base de integraciones más completas, como una GitHub App dedicada a revisar PRs automáticamente en cada push.</div>
  </div>
</div>
`,

'cc-sdk': `
<div class="tab-group-ccd">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccd-1','ccd')">Qué es el Agent SDK</button>
    <button class="tab-btn" onclick="switchTab(this,'ccd-2','ccd')">Ejemplo en Python</button>
    <button class="tab-btn" onclick="switchTab(this,'ccd-3','ccd')">SDK vs CLI vs API cruda</button>
  </div>
  <div id="ccd-1" class="tab-panel active">
<div class="concept-intro">El <strong>Claude Agent SDK</strong> (disponible para Python y TypeScript) es la forma de usar todo el motor de agente de Claude Code — el bucle de leer/decidir/actuar, el manejo de herramientas, hooks, sesiones, MCP — pero <strong>embebido dentro de tu propio programa</strong>, en vez de a través de la terminal interactiva. Es la opción para cuando necesitás construir un producto o una automatización propia sobre esta misma tecnología, no solo usar la CLI vos mismo.</div>
<div class="concept-intro">La diferencia clave frente a llamar a la API de Claude directamente (como se ve en el módulo "IA — Trabajar con APIs de IA") es que la API cruda te da <em>un modelo</em> con el que vos armás tu propio bucle de herramientas desde cero; el Agent SDK te da <em>el agente completo ya armado</em> — con su gestión de sesión, sus herramientas de archivo/bash incorporadas, y su sistema de permisos — listo para que lo configures y lo alojes vos.</div>
  </div>
  <div id="ccd-2" class="tab-panel">
<div class="code-block"><div class="code-lang">Instalación (Python)</div><pre>
pip install claude-agent-sdk</pre></div>
<div class="code-block"><div class="code-lang">Python — ejemplo mínimo funcional</div><pre>
<span class="c-kw">import</span> asyncio
<span class="c-kw">from</span> claude_agent_sdk <span class="c-kw">import</span> query, ClaudeAgentOptions

<span class="c-kw">async</span> <span class="c-kw">def</span> <span class="c-fn">main</span>():
    <span class="c-kw">async</span> <span class="c-kw">for</span> mensaje <span class="c-kw">in</span> <span class="c-fn">query</span>(
        prompt=<span class="c-st">"Encuentra y repara el bug en auth.py"</span>,
        options=ClaudeAgentOptions(
            allowed_tools=[<span class="c-st">"Read"</span>, <span class="c-st">"Edit"</span>, <span class="c-st">"Bash"</span>],
            permission_mode=<span class="c-st">"acceptEdits"</span>,
        ),
    ):
        <span class="c-kw">if</span> <span class="c-bi">hasattr</span>(mensaje, <span class="c-st">"result"</span>):
            <span class="c-bi">print</span>(mensaje.result)

asyncio.<span class="c-fn">run</span>(<span class="c-fn">main</span>())</pre></div>
<div class="concept-intro">Igual que con el CLI, <code>allowed_tools</code> y <code>permission_mode</code> controlan qué puede hacer el agente y con cuánta autonomía — el mismo modelo de seguridad de "Modos de permisos" se traslada al SDK, porque es literalmente el mismo motor por debajo.</div>
<div class="code-block"><div class="code-lang">TypeScript — el mismo ejemplo</div><pre>
<span class="c-kw">import</span> { query } <span class="c-kw">from</span> <span class="c-st">"@anthropic-ai/claude-agent-sdk"</span>;

<span class="c-kw">for</span> <span class="c-kw">await</span> (<span class="c-kw">const</span> mensaje <span class="c-kw">of</span> <span class="c-fn">query</span>({
  prompt: <span class="c-st">"Encuentra y repara el bug en auth.ts"</span>,
  options: { allowedTools: [<span class="c-st">"Read"</span>, <span class="c-st">"Edit"</span>, <span class="c-st">"Bash"</span>] }
})) {
  <span class="c-kw">if</span> (<span class="c-st">"result"</span> <span class="c-kw">in</span> mensaje) <span class="c-bi">console</span>.log(mensaje.result);
}</pre></div>
  </div>
  <div id="ccd-3" class="tab-panel">
<table class="kv-table"><tr><th>Opción</th><th>Qué controlás</th><th>Cuándo usarla</th></tr>
<tr><td>CLI de Claude Code</td><td>Nada de código propio — es la herramienta terminada, interactiva o en modo -p.</td><td>Uso personal en la terminal, o scripts simples de automatización.</td></tr>
<tr><td>Claude Agent SDK</td><td>Todo el agente (herramientas, hooks, sesiones, MCP) embebido en tu propio programa.</td><td>Construir un producto propio, un servicio, o una integración compleja sobre el mismo motor de agente.</td></tr>
<tr><td>API de Claude directa (Messages API)</td><td>Cada llamada individual al modelo — vos armás el bucle de herramientas, el manejo de sesión, todo desde cero.</td><td>Casos donde necesitás control total y mínimo, sin el "agente completo" ya armado -- ver el módulo "IA — Trabajar con APIs de IA".</td></tr>
</table>
<div class="alert-card">💡 Una forma simple de decidir: si la pregunta es "¿cómo hago que Claude use herramientas y tome decisiones de varios pasos sobre un sistema real?", la respuesta casi siempre es el Agent SDK, no reconstruir ese bucle a mano sobre la API cruda — ya está resuelto y probado en producción por el propio Claude Code.</div>
  </div>
</div>
`,

'cc-practicas': `
<div class="tab-group-ccz">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccz-1','ccz')">Buenas prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'ccz-2','ccz')">Errores comunes</button>
  </div>
  <div id="ccz-1" class="tab-panel active">
<div class="practice-card">
  <div class="practice-title">Empezá tareas grandes o ambiguas en Plan Mode</div>
  <p>Para un cambio de arquitectura o una tarea que toca muchos archivos, dejá que Claude Code explore y proponga un plan antes de tocar nada. Revisar el plan te cuesta un minuto; revisar cambios ya aplicados sobre veinte archivos te cuesta mucho más.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Invertí tiempo en un buen CLAUDE.md</div>
  <p>Diez minutos documentando comandos de build/test, convenciones y partes delicadas del código se pagan solos en cada sesión futura — es la diferencia entre repetir el mismo contexto una y otra vez, y que ya esté ahí desde el primer mensaje.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Delegá investigaciones largas a subagentes</div>
  <p>Si una pregunta requiere leer muchos archivos para llegar a una respuesta corta, un subagente evita que ese detalle de exploración le "cueste" contexto a la conversación principal. Ver el tema "Subagents".</p>
</div>
<div class="practice-card">
  <div class="practice-title">Revisá el diff igual que revisarías el de una persona</div>
  <p>Claude Code reduce el trabajo de escribir el código, no la responsabilidad de verificarlo. Tratá cada cambio propuesto con el mismo criterio que aplicarías a un Pull Request de un compañero de equipo.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Compactá el contexto entre etapas de una tarea larga</div>
  <p>Cuando termina una etapa clara (por ejemplo, "ya está el backend, ahora el frontend"), usar /compact antes de seguir mantiene la sesión liviana y las respuestas más enfocadas.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Sé específico en el pedido, no en la implementación</div>
  <p>"Agrega paginación al endpoint de usuarios, 20 por página, con cursor en vez de offset" da mejor resultado que "arregla el endpoint de usuarios que está lento" — dale el objetivo y las restricciones que importan, y dejá que la implementación la resuelva la herramienta.</p>
</div>
  </div>
  <div id="ccz-2" class="tab-panel">
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Bypass permissions "porque es más rápido"</div><pre>
claude --permission-mode bypassPermissions
<span class="c-cm"># sobre tu máquina de trabajo real, con acceso</span>
<span class="c-cm"># a credenciales y repos de producción</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Reglas allow/deny específicas</div><pre>
<span class="c-cm">// settings.json -- permite lo rutinario, bloquea</span>
<span class="c-cm">// lo peligroso, sin desactivar todo el sistema</span>
{
  <span class="c-st">"permissions"</span>: {
    <span class="c-st">"allow"</span>: [<span class="c-st">"Bash(npm test)"</span>, <span class="c-st">"Bash(npm run lint)"</span>],
    <span class="c-st">"deny"</span>: [<span class="c-st">"Read(.env*)"</span>, <span class="c-st">"Bash(rm -rf *)"</span>]
  }
}</pre></div>
</div>
<div class="error-note"><b>Por qué:</b> bypass permissions desactiva por completo la red de seguridad para ganar comodidad — si algo sale mal (un comando mal interpretado, una edición no deseada), no hay punto de control que lo detenga antes de ejecutarse. Reglas allow/deny dan casi la misma fluidez para lo rutinario, sin perder la protección donde más importa.</div>
<table class="kv-table"><tr><th>Error común</th><th>Por qué pasa factura</th></tr>
<tr><td>CLAUDE.md gigante y desactualizado</td><td>Reglas obsoletas confunden más de lo que ayudan, y un archivo muy largo diluye la atención sobre lo que sí importa.</td></tr>
<tr><td>Pedir tareas enormes y ambiguas de una sola vez</td><td>"Rehace todo el frontend" da peores resultados que dividir en pasos concretos y verificables — igual que le pasaría a cualquier desarrollador humano con un pedido así de vago.</td></tr>
<tr><td>No revisar el diff antes de commitear</td><td>La velocidad de generar el cambio no reemplaza la necesidad de entender qué se cambió, sobre todo en código que toca lógica de negocio sensible.</td></tr>
<tr><td>Dejar la sesión crecer sin compactar</td><td>Una conversación muy larga sin /compact eventualmente degrada la calidad de las respuestas al acercarse al límite de contexto.</td></tr>
</table>
  </div>
</div>
`,

'cc-skills-utiles': `
<div class="tab-group-ccu">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccu-1','ccu')">Calidad y seguridad del código</button>
    <button class="tab-btn" onclick="switchTab(this,'ccu-2','ccu')">Diseño y visualización</button>
    <button class="tab-btn" onclick="switchTab(this,'ccu-3','ccu')">Automatización y productividad</button>
    <button class="tab-btn" onclick="switchTab(this,'ccu-4','ccu')">Cómo descubrir las tuyas</button>
  </div>
  <div id="ccu-1" class="tab-panel active">
<div class="concept-intro">Más allá de las Skills que uno mismo se arma (ver el tema anterior), Claude Code trae incorporado un conjunto curado de skills oficiales para tareas frecuentes de desarrollo — no hace falta escribirlas, ya están listas para invocarse con <code>/</code>. Estas son de las más usadas en el día a día de cualquier equipo, agrupadas por lo que resuelven.</div>
<table class="kv-table"><tr><th>Skill</th><th>Qué hace</th><th>Cuándo usarla</th></tr>
<tr><td>code-review</td><td>Revisa el diff de trabajo actual (lo que todavía no se subió) buscando bugs, riesgos y problemas de diseño.</td><td>Antes de commitear o abrir un PR, como última pasada de control de calidad.</td></tr>
<tr><td>review</td><td>Revisa un Pull Request ya abierto en GitHub, con sus comentarios y contexto de la conversación del PR.</td><td>Cuando el cambio a revisar ya vive en GitHub, no en tu working diff local.</td></tr>
<tr><td>security-review</td><td>Hace una revisión de seguridad completa de los cambios pendientes en la rama actual (inyección, secretos expuestos, validación de entradas, etc.).</td><td>Antes de mergear cambios que tocan autenticación, datos de usuario, o cualquier superficie sensible.</td></tr>
<tr><td>simplify</td><td>Revisa el código recién cambiado buscando reutilización, simplificación y eficiencia — <em>no</em> busca bugs, solo calidad y limpieza.</td><td>Después de una sesión larga de cambios, para pulir antes del commit final.</td></tr>
</table>
<div class="alert-card">💡 <code>code-review</code> y <code>simplify</code> se complementan: uno busca errores y riesgos, el otro busca oportunidades de dejar el código más limpio. Correr los dos antes de un PR importante cubre ángulos distintos con poco esfuerzo extra.</div>
  </div>
  <div id="ccu-2" class="tab-panel">
<table class="kv-table"><tr><th>Skill</th><th>Qué hace</th><th>Cuándo usarla</th></tr>
<tr><td>dataviz</td><td>Guía de diseño para cualquier gráfico, dashboard o visualización de datos — paleta, tipografía, forma del gráfico según el dato, antes de escribir la primera línea de código de un chart.</td><td>Cada vez que vayas a pedir un gráfico, gráfico de barras, dashboard o KPI — se activa automáticamente antes de escribir código de visualización.</td></tr>
<tr><td>artifact-design</td><td>Principios de diseño para páginas HTML completas: paleta con roles, tipografía, modo claro/oscuro, layout — el mismo criterio que se usó para armar el tema "Crear HTML — Diseño y buenas prácticas" de esta guía.</td><td>Antes de pedir o construir cualquier página, herramienta o documento HTML que quieras que se vea bien pensado, no genérico.</td></tr>
<tr><td>run</td><td>Levanta y usa la app del proyecto para comprobar un cambio en la práctica — busca primero cómo arrancar ese proyecto en particular, y si hace falta, toma una captura del resultado.</td><td>Después de un cambio de frontend/UI, para confirmar que funciona de verdad en el navegador y no solo "debería funcionar" según el código.</td></tr>
</table>
<div class="concept-intro">Estas tres cubren el ciclo completo de una interfaz: <strong>dataviz/artifact-design</strong> antes de escribir el código (para partir de buenas decisiones de diseño), y <strong>run</strong> después (para verificar el resultado real, no solo confiar en que el código compila).</div>
  </div>
  <div id="ccu-3" class="tab-panel">
<table class="kv-table"><tr><th>Skill</th><th>Qué hace</th><th>Cuándo usarla</th></tr>
<tr><td>update-config</td><td>Configura settings.json del proyecto o de usuario: permisos, hooks, variables de entorno — todo lo que se automatiza a nivel de configuración en vez de a mano.</td><td>Cuando querés que algo pase automáticamente cada vez ("cada vez que edite un .py, corré el linter") en vez de pedirlo cada sesión.</td></tr>
<tr><td>fewer-permission-prompts</td><td>Revisa tu propio historial de comandos aprobados y arma una lista blanca priorizada en settings.json, para dejar de aprobar uno por uno los comandos de lectura que siempre apruebas igual.</td><td>Cuando notás que estás aprobando el mismo tipo de comando (ej. git status, npm test) una y otra vez sin pensarlo.</td></tr>
<tr><td>loop</td><td>Corre un prompt o comando de forma recurrente, en un intervalo fijo o dejando que el propio modelo decida cuándo revisar de nuevo.</td><td>Tareas de monitoreo: "revisá cada 5 minutos si el deploy terminó", "segui iterando sobre este problema hasta resolverlo".</td></tr>
<tr><td>schedule</td><td>Crea, edita o lista agentes que corren en un horario fijo (cron), como tareas programadas que se disparan solas sin que vos tengas la sesión abierta.</td><td>Automatizaciones que deberían pasar todos los días o cada semana sin intervención manual (ej. un reporte matutino).</td></tr>
<tr><td>keybindings-help</td><td>Ayuda a personalizar atajos de teclado, incluidas combinaciones tipo "chord" (dos teclas en secuencia).</td><td>Cuando un atajo por defecto choca con otro que ya usás, o querés uno más cómodo para tu flujo.</td></tr>
</table>
  </div>
  <div id="ccu-4" class="tab-panel">
<div class="concept-intro">La lista de skills disponibles no es fija ni universal — varía según la versión de Claude Code, tu plan, y qué plugins o skills propias del proyecto/usuario tengas instaladas. En vez de memorizar un catálogo cerrado, la forma correcta de saber qué tenés disponible es preguntarle directamente a la herramienta.</div>
<div class="code-block"><div class="code-lang">Formas de descubrir qué skills tenés</div><pre>
<span class="c-cm"># Escribiendo "/" solo, se muestra la lista completa filtrable</span>
/

<span class="c-cm"># O directamente preguntando en lenguaje natural</span>
¿Qué skills tengo disponibles en este proyecto?</pre></div>
<div class="alert-card">💡 Muchas de estas skills se activan <strong>solas</strong> cuando el pedido calza con su propósito (por ejemplo, pedir un gráfico dispara automáticamente la guía de dataviz sin que escribas su nombre) — no todas requieren invocarse explícitamente con <code>/</code>. Otras, como las que creás vos mismo en <code>.claude/skills/</code> (ver el tema "Slash Commands y Skills"), solo se activan si les diste una descripción clara de cuándo usarlas.</div>
<div class="concept-intro">Si tu equipo repite un flujo de trabajo seguido y no encontrás una skill oficial que lo cubra, esa es la señal exacta para crear una propia — el catálogo curado cubre lo genérico y común a cualquier proyecto, pero el conocimiento específico de tu equipo y tu dominio (automotriz, en el caso de esta guía) solo lo tenés vos.</div>
  </div>
</div>
`,

'cc-html-diseno': `
<div class="tab-group-cch2">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'cch2-1','cch2')">Cómo pedir una página bien hecha</button>
    <button class="tab-btn" onclick="switchTab(this,'cch2-2','cch2')">Color y tipografía</button>
    <button class="tab-btn" onclick="switchTab(this,'cch2-3','cch2')">Modo claro/oscuro y layout</button>
    <button class="tab-btn" onclick="switchTab(this,'cch2-4','cch2')">Checklist y errores comunes</button>
  </div>
  <div id="cch2-1" class="tab-panel active">
<div class="concept-intro">Claude Code puede generar páginas HTML completas — desde un reporte interno hasta una herramienta interactiva — pero la calidad del resultado depende mucho de cómo se pide. Tres cosas ayudan más que cualquier detalle técnico: describir el <strong>sujeto concreto</strong> y la <strong>audiencia</strong>, darle <strong>contenido real</strong> en vez de dejar que rellene con placeholders genéricos, y aclarar qué tipo de página es — porque el tratamiento visual correcto no es el mismo para un informe interno que para un producto que se va a compartir.</div>
<table class="kv-table"><tr><th>Tipo de página</th><th>Tratamiento esperado</th></tr>
<tr><td>Documento, informe, plan interno</td><td>Pulido pero contenido: jerarquía tipográfica real y espaciado cuidado, sin hero gigante ni animaciones de más.</td></tr>
<tr><td>Landing page, herramienta o juego para compartir</td><td>Tratamiento con más personalidad: tipografía con carácter, una decisión de diseño distintiva, quizás animación intencional.</td></tr>
<tr><td>Dashboard o panel de datos</td><td>Se escanea, no se lee de arriba a abajo: lo importante debe reconocerse de un vistazo (color semántico para estados, jerarquía por tamaño).</td></tr>
</table>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Pedido vago</div><pre>
Hazme una página bonita para mi
proyecto de finanzas personales</pre></div>
  <div class="err-good"><div class="err-label">✅ Pedido específico</div><pre>
Un dashboard de finanzas personales
para uso propio (no un producto): balance
total arriba, gasto por categoria del mes
en un grafico, y las ultimas 10 transacciones
reales de este CSV. Tono serio pero cercano,
no corporativo.</pre></div>
</div>
<div class="alert-card">💡 Al pedir ajustes, sé tan específico como al pedir el diseño inicial: "no me gusta" no le dice nada útil al modelo. "El contraste del texto secundario es muy bajo en modo oscuro, y la tarjeta de balance debería destacar visualmente sobre las demás" sí produce una corrección concreta.</div>
  </div>
  <div id="cch2-2" class="tab-panel">
<div class="concept-intro">Un neutro <strong>elegido</strong>, no heredado por defecto, es lo que distingue una paleta pensada de una genérica: un gris puro se lee como "no se decidió nada"; un gris con un ligero sesgo de tono hacia el color de acento se lee como una decisión de diseño real.</div>
<div class="concept-intro">Un buen ejemplo concreto es la propia paleta de este sitio (<code>styles.css</code>): un puñado de variables con un rol claro, no colores sueltos repetidos por todos lados.</div>
<table class="kv-table"><tr><th>Variable</th><th>Rol</th></tr>
<tr><td>--accent</td><td>Color de marca — enlaces activos, botones primarios, barra de progreso</td></tr>
<tr><td>--text / --text-muted</td><td>Texto principal vs texto secundario (menor jerarquía, mismo tono base)</td></tr>
<tr><td>--bg / --white</td><td>Fondo de página vs superficie de tarjetas — dos neutros, no uno solo repetido</td></tr>
<tr><td>--border</td><td>Separadores y contornos — un neutro discreto, no el mismo gris que el texto</td></tr>
</table>
<div class="concept-intro">En tipografía, la regla básica es usar <strong>al menos dos roles</strong> — una familia (o peso) para encabezados y otra para el cuerpo de texto — mantener el texto de lectura cerca de los 65 caracteres de ancho por línea, y definir una escala de tamaños consistente en vez de improvisar tamaños sueltos página por página.</div>
<div class="alert-card">⚠️ Looks genéricos de IA a evitar si no pediste una dirección visual específica: crema cálido + serif + acento terracota; fondo casi negro con un único verde ácido o rojo como pop; hero con degradado morado-a-azul; Inter o Space Grotesk como fuente "segura" por defecto; emoji como separador de sección; todo centrado; <code>rounded-lg</code> en cada tarjeta. Ninguno es "malo" en sí — el problema es usarlos por default en vez de por decisión.</div>
  </div>
  <div id="cch2-3" class="tab-panel">
<div class="concept-intro">La página se va a ver tanto en el tema claro como en el oscuro del navegador o del visor — hay que diseñar los dos con el mismo cuidado, no invertir los colores a último momento. El patrón más robusto es a nivel de <strong>tokens</strong>: variables CSS en <code>:root</code>, redefinidas bajo <code>@media (prefers-color-scheme: dark)</code> para seguir la preferencia del sistema, y redefinidas de nuevo bajo <code>[data-theme="dark"]</code> / <code>[data-theme="light"]</code> para cuando existe un botón de cambio manual que debe ganarle a la preferencia del sistema.</div>
<div class="code-block"><div class="code-lang">CSS — mismo patrón de theming que usa este propio sitio</div><pre>
:root {
  --bg: #F9FAFB;
  --text: #111827;
  --accent: #2563EB;
}

<span class="c-cm">/* sigue la preferencia del sistema operativo */</span>
@media (prefers-color-scheme: dark) {
  :root { --bg: #0B1220; --text: #E2E8F0; --accent: #3B82F6; }
}

<span class="c-cm">/* gana siempre que exista un toggle manual en la página */</span>
:root[data-theme="dark"]  { --bg: #0B1220; --text: #E2E8F0; --accent: #3B82F6; }
:root[data-theme="light"] { --bg: #F9FAFB; --text: #111827; --accent: #2563EB; }</pre></div>
<div class="concept-intro">Para el layout, conviene ordenar grupos de elementos con <code>flex</code> o <code>grid</code> y la propiedad <code>gap</code>, en vez de márgenes sueltos por elemento — los márgenes individuales se colapsan o se duplican de formas poco predecibles, mientras que <code>gap</code> se comporta igual siempre. El contenido ancho (tablas grandes, bloques de código) debería vivir en su propio contenedor con <code>overflow-x: auto</code>, para que sea esa sección la que scrollea horizontalmente y nunca la página completa.</div>
  </div>
  <div id="cch2-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">HTML válido y bien cerrado</div>
  <p>Cada etiqueta abierta se cierra, los atributos van entre comillas dobles. Son bugs silenciosos: el navegador suele "adivinar" y seguir renderizando algo, ocultando el error hasta que aparece un problema visual difícil de rastrear.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Estado de foco visible en todo lo interactivo</div>
  <p>Cualquiera que navegue con teclado necesita ver claramente qué elemento tiene el foco en cada momento — un botón o link sin ese estado visible es, en la práctica, inaccesible para ese tipo de navegación.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Respetar prefers-reduced-motion</div>
  <p>Quien activó esa preferencia del sistema lo hizo por una razón (mareo, distracción, batería) — las animaciones decorativas deberían reducirse o desactivarse para esas personas en vez de ignorar la preferencia.</p>
</div>
<div class="practice-card">
  <div class="practice-title">HTML semántico, no todo con &lt;div&gt;</div>
  <p>Un botón real (&lt;button&gt;) en vez de un &lt;div onclick&gt;, una &lt;table&gt; para datos tabulares en vez de divs alineados con CSS — el HTML semántico llega gratis con accesibilidad, comportamiento de teclado y significado para lectores de pantalla.</p>
</div>
<div class="practice-card">
  <div class="practice-title">No sobre-diseñes un documento utilitario</div>
  <p>Un plan, una nota o un reporte interno se benefician de jerarquía tipográfica clara y buen espaciado — no de un hero gigante ni de animaciones de entrada. Guardá el tratamiento más audaz para páginas que de verdad lo ameritan (landing pages, herramientas, algo que se va a compartir).</p>
</div>
<div class="practice-card">
  <div class="practice-title">Alinea columnas de números</div>
  <p><code>font-variant-numeric: tabular-nums</code> en cualquier lugar donde haya dígitos alineados en columna (tablas de precios, métricas) — sin esto, los números con distinto ancho de carácter desalinean visualmente la columna.</p>
</div>
  </div>
</div>
`,

'cc-vscode': `
<div class="tab-group-ccv">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccv-1','ccv')">Instalación y qué aporta</button>
    <button class="tab-btn" onclick="switchTab(this,'ccv-2','ccv')">Selección y diagnósticos del IDE</button>
    <button class="tab-btn" onclick="switchTab(this,'ccv-3','ccv')">Atajos y settings de la extensión</button>
    <button class="tab-btn" onclick="switchTab(this,'ccv-4','ccv')">Conectar desde la terminal — /ide</button>
  </div>
  <div id="ccv-1" class="tab-panel active">
<div class="concept-intro">Claude Code tiene una extensión oficial para VS Code que integra la sesión dentro del propio editor, en vez de vivir solo en una terminal aparte. Se instala como cualquier extensión: <code>Ctrl+Shift+X</code> (o <code>Cmd+Shift+X</code> en macOS) para abrir el panel de extensiones, buscar "Claude Code", e instalar. También funciona en editores basados en VS Code que soportan Open VSX (como Cursor), no solo en VS Code oficial.</div>
<div class="alert-card">💡 La extensión trae <strong>su propio CLI empaquetado</strong> para el panel de chat gráfico. Si además querés poder escribir <code>claude</code> directamente en la terminal integrada de VS Code, hace falta instalar el CLI standalone por separado (ver "Instalación y autenticación") — son dos instalaciones relacionadas pero distintas.</div>
<table class="kv-table"><tr><th>Con la extensión (panel gráfico)</th><th>Con claude en terminal simple</th></tr>
<tr><td>Diffs inline visuales en el propio editor, con botones de aceptar/rechazar</td><td>Diff como texto en la terminal</td></tr>
<tr><td>Selección de código compartida automáticamente</td><td>Requiere conectar con /ide primero</td></tr>
<tr><td>Indicador visual del modo de permisos activo</td><td>Se ve en la línea de estado de la terminal</td></tr>
<tr><td>Historial de sesiones en panel visual</td><td>Se gestiona con /resume</td></tr>
<tr><td>Autocompletado de bash y atajo ! para shell directo</td><td>Disponible</td></tr>
</table>
<div class="concept-intro">El panel de la extensión puede abrirse en la barra lateral derecha (posición por defecto), reubicarse a la izquierda, o abrirse como una pestaña más del editor — según cómo prefieras organizar el espacio de trabajo.</div>
  </div>
  <div id="ccv-2" class="tab-panel">
<div class="concept-intro">Con la extensión activa, cualquier texto que selecciones en el editor queda disponible automáticamente como contexto para Claude Code — no hace falta copiarlo ni referenciarlo con <code>@</code> a mano. El pie del cuadro de mensaje muestra cuántas líneas están seleccionadas en ese momento, así siempre es visible qué está "viendo" el modelo.</div>
<div class="concept-intro">Además, la extensión comparte los <strong>diagnósticos del propio editor</strong> — los errores y warnings que ya te marca el linter o el compilador con el subrayado rojo/amarillo habitual — así Claude Code puede verlos directamente, sin que se los tengas que describir en texto.</div>
<div class="alert-card">🔐 Si hay un archivo sensible que no querés que forme parte de este contexto automático (por ejemplo un archivo de credenciales que tenés abierto por otra razón), una regla de <code>Read</code> en <code>deny</code> dentro de <code>permissions</code> (ver el tema "settings.json") bloquea tanto la selección como el aviso de archivo abierto para esa ruta.</div>
  </div>
  <div id="ccv-3" class="tab-panel">
<table class="kv-table"><tr><th>Atajo (Win/Linux — macOS)</th><th>Acción</th></tr>
<tr><td>Ctrl+Esc — Cmd+Esc</td><td>Alterna el foco entre el editor y el panel de Claude Code.</td></tr>
<tr><td>Alt+K — Option+K</td><td>Inserta una referencia de la selección actual (archivo y rango de líneas) en el mensaje.</td></tr>
<tr><td>Ctrl+Shift+Esc — Cmd+Shift+Esc</td><td>Abre una conversación nueva en una pestaña separada.</td></tr>
<tr><td>Ctrl+Shift+T — Cmd+Shift+T</td><td>Reabre la última sesión que cerraste.</td></tr>
</table>
<div class="alert-card">💡 Estos atajos no se reconfiguran desde los settings de VS Code — la extensión respeta el archivo de keybindings del propio Claude Code, así que se personalizan ahí, no en un namespace separado de VS Code.</div>
<div class="code-block"><div class="code-lang">Settings de VS Code — namespace claudeCode.* (Ctrl+, → buscar "Claude Code")</div><pre>
{
  <span class="c-st">"claudeCode.initialPermissionMode"</span>: <span class="c-st">"default"</span>,
  <span class="c-st">"claudeCode.preferredLocation"</span>: <span class="c-st">"sidebar"</span>,
  <span class="c-st">"claudeCode.useTerminal"</span>: <span class="c-kw">false</span>,
  <span class="c-st">"claudeCode.respectGitIgnore"</span>: <span class="c-kw">true</span>
}</pre></div>
<div class="concept-intro">Estos valores viven en la configuración propia de VS Code (no en <code>~/.claude/settings.json</code>) porque controlan cómo se comporta la extensión como plugin del editor — cosas como dónde abre el panel o si arranca en modo terminal — más que el comportamiento del agente en sí.</div>
  </div>
  <div id="ccv-4" class="tab-panel">
<div class="concept-intro">Si preferís trabajar con <code>claude</code> desde una terminal (integrada o externa) en vez del panel gráfico, el comando <code>/ide</code> dentro de esa sesión la conecta con la ventana de VS Code que tengas abierta — así esa sesión de terminal también gana selección de código compartida y acceso a los diagnósticos del editor, aunque no muestre los diffs visuales de la interfaz gráfica.</div>
<div class="code-block"><div class="code-lang">Dentro de una sesión de claude en terminal</div><pre>
/ide</pre></div>
<div class="concept-intro">Es la forma de combinar lo mejor de ambos mundos: la terminal para quien prefiere el teclado y los atajos de shell (autocompletado de bash, el atajo <code>!</code> para comandos directos), sumándole el contexto del editor que normalmente solo tendría la extensión gráfica.</div>
  </div>
</div>
`,

'cc-thinking': `
<div class="tab-group-cct">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'cct-1','cct')">Qué es el razonamiento extendido</button>
    <button class="tab-btn" onclick="switchTab(this,'cct-2','cct')">Cuándo activarlo y su costo</button>
    <button class="tab-btn" onclick="switchTab(this,'cct-3','cct')">/deep-research</button>
  </div>
  <div id="cct-1" class="tab-panel active">
<div class="concept-intro"><strong>Extended thinking</strong> (razonamiento extendido) es un modo en el que el modelo genera un razonamiento intermedio explícito antes de dar la respuesta final, en vez de ir directo a la conclusión. Es la diferencia entre contestar de memoria y pensarlo primero en un borrador: para tareas de varios pasos lógicos, ese paso intermedio suele mejorar la calidad del resultado final.</div>
<div class="concept-intro">En la sesión, ese razonamiento aparece colapsado por defecto — podés expandirlo para ver el proceso completo, no solo la conclusión. Es información real de cómo se llegó a la respuesta, útil cuando querés auditar el razonamiento (por ejemplo, entender por qué se descartó un enfoque) y no solo confiar ciegamente en el resultado.</div>
<div class="alert-card">💡 No es magia adicional — es el mismo modelo, dándose más espacio explícito para razonar antes de responder. Para preguntas directas y bien definidas, no cambia mucho el resultado; donde más se nota es en problemas ambiguos, con varios pasos, o con trade-offs que hay que sopesar.</div>
  </div>
  <div id="cct-2" class="tab-panel">
<table class="kv-table"><tr><th>Conviene activarlo</th><th>No aporta demasiado</th></tr>
<tr><td>Depurar un bug difícil de reproducir con causa poco clara</td><td>Cambios mecánicos (renombrar, formatear, mover archivos)</td></tr>
<tr><td>Diseñar la arquitectura de un cambio grande con varios trade-offs</td><td>Preguntas directas con una sola respuesta clara</td></tr>
<tr><td>Algoritmos con varios casos borde a considerar</td><td>Tareas ya bien definidas paso a paso</td></tr>
<tr><td>Decisiones donde el "por qué" importa tanto como el "qué"</td><td>Consultas de referencia rápida (ej. "qué hace este flag")</td></tr>
</table>
<div class="concept-intro">Como cualquier texto que el modelo genera, el razonamiento intermedio también consume tokens de salida y por lo tanto también se cobra (ver el tema "¿Qué es una API de IA?" del módulo de IA para el concepto general) — activarlo de forma indiscriminada en tareas simples suma costo y tiempo de respuesta sin necesariamente mejorar el resultado.</div>
<div class="concept-intro">Se puede alternar dentro de la sesión con un atajo de teclado dedicado para activar/desactivar el modo. La combinación exacta puede variar entre versiones y plataformas, así que la referencia confiable es siempre <code>/help</code> o los atajos configurados en tu propia instalación, en vez de memorizar una combinación fija.</div>
  </div>
  <div id="cct-3" class="tab-panel">
<div class="concept-intro"><code>/deep-research</code> dispara una investigación web más amplia y estructurada que una pregunta suelta: en vez de una sola búsqueda, se consultan múltiples fuentes, se cruza la información entre ellas, y se devuelve una síntesis final con las fuentes relevantes citadas.</div>
<div class="code-block"><div class="code-lang">Ejemplo de uso</div><pre>
/deep-research ¿cuáles son las diferencias clave entre ISO 26262 e ISO 21434?</pre></div>
<div class="concept-intro">Es la herramienta correcta cuando la pregunta no tiene una respuesta única y rápida, sino que requiere comparar y sintetizar varias fuentes — por ejemplo, entender el estado actual de un estándar, comparar herramientas o enfoques, o investigar un tema donde la respuesta "correcta" depende de cruzar varias perspectivas. Para una búsqueda puntual de un dato concreto y verificable, alcanza con pedirlo directo en la conversación sin necesidad de este comando.</div>
  </div>
</div>
`,

'cc-checkpoints': `
<div class="tab-group-ccch">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccch-1','ccch')">Qué son los checkpoints</button>
    <button class="tab-btn" onclick="switchTab(this,'ccch-2','ccch')">Usar Rewind</button>
    <button class="tab-btn" onclick="switchTab(this,'ccch-3','ccch')">Rewind no reemplaza a git</button>
  </div>
  <div id="ccch-1" class="tab-panel active">
<div class="concept-intro">Mientras trabaja, Claude Code va guardando <strong>puntos de control automáticos</strong> de los archivos que edita — no hace falta activarlos ni pedirlos explícitamente, quedan disponibles solos a medida que avanza la sesión. Funcionan como una red de seguridad para volver atrás rápido si un cambio o un enfoque no resultó como esperabas.</div>
<div class="concept-intro">Es importante entender qué cubren y qué no: los checkpoints registran <strong>ediciones de archivo hechas por la herramienta</strong> (Edit, Write). No registran modificaciones hechas indirectamente por un comando de bash (por ejemplo, un script que sobreescribe un archivo, o <code>sed</code> corriendo sobre varios archivos) — para esos casos, la única red de seguridad real sigue siendo git.</div>
  </div>
  <div id="ccch-2" class="tab-panel">
<div class="concept-intro">Con el input vacío, <code>Esc Esc</code> abre el menú de rewind — desde ahí podés elegir a qué punto de la conversación y del código querés volver.</div>
<table class="kv-table"><tr><th>Opción</th><th>Qué hace</th></tr>
<tr><td>Restaurar código y conversación</td><td>Vuelve el código a como estaba en ese punto Y borra los mensajes posteriores de la conversación.</td></tr>
<tr><td>Restaurar solo conversación</td><td>Vuelve el hilo de mensajes a ese punto, sin tocar el código actual (útil si el código está bien pero querés replantear el pedido).</td></tr>
<tr><td>Restaurar solo código</td><td>Vuelve los archivos a ese estado anterior, sin perder el resto de la conversación (útil para deshacer un cambio puntual sin perder el contexto acumulado).</td></tr>
<tr><td>Resumir desde acá / hasta acá</td><td>Comprime la conversación antes o después de ese punto, para liberar contexto sin perder por completo lo que se decidió ahí.</td></tr>
</table>
<div class="concept-intro">Es más preciso que pedir en texto "deshacé lo que hiciste": el rewind vuelve literalmente al estado real de los archivos en ese momento, en vez de depender de que el modelo recuerde y revierta correctamente cada cambio hecho desde entonces.</div>
  </div>
  <div id="ccch-3" class="tab-panel">
<div class="alert-card">⚠️ Rewind es para iterar rápido <strong>dentro de una sesión</strong> — no es historial de versiones. Para un registro permanente, compartido con el equipo, y a largo plazo, seguís necesitando commits de git como siempre. Son complementarios: rewind te saca de un mal camino mientras trabajás, git es el registro real de qué cambió y por qué en la historia del proyecto.</div>
<div class="concept-intro">Un buen hábito: usá rewind libremente mientras explorás un enfoque dentro de una sesión, pero seguí commiteando en los puntos donde el trabajo ya está en un estado sólido — así no dependés de que el checkpoint siga disponible para volver a un estado que en verdad valía la pena conservar.</div>
  </div>
</div>
`,

'cc-modelos-effort': `
<div class="tab-group-ccme">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccme-1','ccme')">Elegir el modelo — /model</button>
    <button class="tab-btn" onclick="switchTab(this,'ccme-2','ccme')">Effort — profundidad del razonamiento</button>
    <button class="tab-btn" onclick="switchTab(this,'ccme-3','ccme')">Fast mode</button>
  </div>
  <div id="ccme-1" class="tab-panel active">
<div class="concept-intro">Claude Code no está atado a un único modelo — dentro de la familia Claude hay modelos más rápidos/económicos y modelos con más capacidad para tareas complejas, y podés elegir cuál usar según la tarea con <code>/model</code>.</div>
<div class="code-block"><div class="code-lang">Dentro de una sesión</div><pre>
/model              <span class="c-cm"># abre el selector de modelo</span></pre></div>
<table class="kv-table"><tr><th>Tipo de tarea</th><th>Qué conviene</th></tr>
<tr><td>Cambios mecánicos, repetitivos, de bajo riesgo (renombrar, formatear, tareas muy acotadas)</td><td>Un modelo más rápido y económico — no hace falta la mayor capacidad de razonamiento para esto.</td></tr>
<tr><td>Arquitectura, bugs difíciles, decisiones con trade-offs, código crítico</td><td>El modelo de mayor capacidad disponible — el costo extra se justifica por la calidad del resultado en tareas donde equivocarse sale caro.</td></tr>
</table>
<div class="alert-card">💡 No hay una única elección "correcta" para todo el proyecto: es normal cambiar de modelo varias veces en un mismo día según qué estés haciendo en ese momento, igual que elegirías distinta herramienta para distintas partes de un trabajo manual.</div>
  </div>
  <div id="ccme-2" class="tab-panel">
<div class="concept-intro">Además del modelo, existe un nivel de <strong>esfuerzo</strong> (<code>/effort</code>) que regula cuánta profundidad de razonamiento dedica antes de responder — independientemente del modelo elegido, un esfuerzo más alto tiende a explorar más alternativas y revisar más su propio razonamiento antes de concluir, a costa de más tiempo y más tokens consumidos.</div>
<div class="code-block"><div class="code-lang">Dentro de una sesión</div><pre>
/effort             <span class="c-cm"># abre el selector de nivel de esfuerzo</span></pre></div>
<div class="concept-intro">La lógica es la misma que con la elección de modelo: subir el esfuerzo tiene sentido para problemas genuinamente difíciles o ambiguos, y es un costo innecesario para tareas donde la respuesta correcta ya es bastante directa.</div>
  </div>
  <div id="ccme-3" class="tab-panel">
<div class="concept-intro"><strong>Fast mode</strong> prioriza la velocidad de respuesta por sobre la máxima capacidad, pensado para tareas simples donde esperar una respuesta más elaborada no aporta nada — correcciones triviales, preguntas directas, cambios de una sola línea.</div>
<div class="code-block"><div class="code-lang">Activar/desactivar</div><pre>
/fast on
/fast off</pre></div>
<div class="concept-intro">En conjunto, modelo + effort + fast mode son las tres perillas que controlan el balance entre velocidad, costo y profundidad de una tarea — la habilidad de ajustarlas según lo que realmente necesita cada pedido es lo que separa un uso eficiente de simplemente dejar todo en la configuración por defecto todo el tiempo.</div>
  </div>
</div>
`,

'cc-paralelo': `
<div class="tab-group-ccpa">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccpa-1','ccpa')">Background — soltar una tarea</button>
    <button class="tab-btn" onclick="switchTab(this,'ccpa-2','ccpa')">Fork — bifurcar la conversación</button>
    <button class="tab-btn" onclick="switchTab(this,'ccpa-3','ccpa')">Batch — muchas tareas en paralelo</button>
  </div>
  <div id="ccpa-1" class="tab-panel active">
<div class="concept-intro"><code>/background</code> (o su alias <code>/bg</code>) desprende la tarea actual para que siga corriendo en segundo plano, en vez de dejarte esperando bloqueado a que termine. Podés seguir conversando de otra cosa, o simplemente seguir con tu trabajo, y te llega la notificación cuando esa tarea de fondo termina.</div>
<div class="code-block"><div class="code-lang">Ejemplo</div><pre>
/background corre la suite completa de tests de integración y avisame si algo falla</pre></div>
<div class="concept-intro">Es la misma lógica de lanzar un proceso largo en segundo plano desde una terminal — salvo que acá lo que corre en segundo plano es una tarea completa del agente, con su propio ciclo de leer/decidir/actuar, no solo un comando.</div>
  </div>
  <div id="ccpa-2" class="tab-panel">
<div class="concept-intro"><code>/fork</code> copia la conversación actual — con todo su contexto acumulado — a una sesión nueva que corre en segundo plano. Sirve para explorar un camino alternativo ("¿y si en vez de esto probamos este otro enfoque?") sin arriesgar ni contaminar el hilo principal en el que ya invertiste tiempo.</div>
<div class="concept-intro">Si el camino alternativo resulta mejor, seguís desde ahí; si no funciona, simplemente descartás esa rama y el hilo principal sigue intacto exactamente como estaba antes de bifurcar.</div>
  </div>
  <div id="ccpa-3" class="tab-panel">
<div class="concept-intro"><code>/batch</code> lanza varias tareas <strong>independientes entre sí</strong> al mismo tiempo, cada una en su propio worktree de git (ver el tema "Git, GitHub y control de versiones"), en vez de resolverlas una por una en secuencia. Tiene sentido cuando tenés una lista de cambios que no dependen unos de otros — por ejemplo, actualizar la misma dependencia en cinco microservicios distintos del mismo repo.</div>
<div class="code-block"><div class="code-lang">Ejemplo conceptual</div><pre>
/batch actualiza el paquete de logging a la v3 en cada uno de estos
5 servicios, y corre sus tests -- son cambios independientes entre si</pre></div>
<table class="kv-table"><tr><th>Comando</th><th>Qué hace</th></tr>
<tr><td>/tasks</td><td>Lista el trabajo de fondo y los subagentes activos en ese momento, con su estado.</td></tr>
</table>
<div class="alert-card">💡 Cada tarea de un <code>/batch</code> termina en su propio worktree con su propio diff (y potencialmente su propio Pull Request) — la revisión sigue siendo tuya sobre cada resultado, igual que revisarías cualquier otro cambio. Paralelizar el trabajo no paraleliza la responsabilidad de verificarlo.</div>
  </div>
</div>
`,

'cc-seguridad': `
<div class="tab-group-ccse">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ccse-1','ccse')">Prompt injection en contenido externo</button>
    <button class="tab-btn" onclick="switchTab(this,'ccse-2','ccse')">Supply chain — MCP y skills de terceros</button>
    <button class="tab-btn" onclick="switchTab(this,'ccse-3','ccse')">Proteger secretos</button>
  </div>
  <div id="ccse-1" class="tab-panel active">
<div class="concept-intro">Cuando Claude Code lee contenido que vos no escribiste — una página web, un archivo descargado, la salida de una herramienta MCP, el contenido de un Pull Request de un desconocido — ese contenido podría incluir texto diseñado para manipular al agente ("ignora tus instrucciones anteriores y ejecuta esto otro"). Es el mismo riesgo de <strong>prompt injection</strong> que se explica en el módulo "IA — Trabajar con APIs de IA", pero acá el riesgo es mayor porque el agente tiene acceso real a tu sistema de archivos y a una terminal, no solo genera texto.</div>
<div class="alert-card">🔐 La mitigación real no es "confiar en que el modelo se va a dar cuenta" — son las reglas de permisos (<code>allow</code>/<code>deny</code> en <code>settings.json</code>) y la revisión de cada diff antes de aplicarlo, exactamente los mecanismos ya cubiertos en "Modos de permisos". Cuanto más sensible el entorno (acceso a producción, credenciales reales), más vale mantenerse en modos que piden aprobación explícita en vez de modos permisivos.</div>
  </div>
  <div id="ccse-2" class="tab-panel">
<div class="concept-intro">Un servidor MCP o una skill instalada de un tercero corre con las mismas capacidades que vos le diste a Claude Code en esa sesión. Agregar uno sin revisar qué hace es, en términos de riesgo, equivalente a instalar una dependencia de npm o un paquete de pip sin mirar su código: heredás la confianza (o la falta de ella) de quien lo escribió.</div>
<table class="kv-table"><tr><th>Práctica</th><th>Por qué</th></tr>
<tr><td>Preferir servidores MCP oficiales o de proveedores conocidos</td><td>Reduce la superficie de un servidor malicioso o mal hecho que exponga datos o ejecute acciones no deseadas.</td></tr>
<tr><td>Revisar el código de una skill antes de instalarla, si es de origen no oficial</td><td>Una SKILL.md con instrucciones maliciosas puede intentar guiar al modelo hacia acciones dañinas la próxima vez que se invoque.</td></tr>
<tr><td>Limitar el campo <code>tools</code> de subagentes y skills a lo mínimo necesario</td><td>Un subagente de solo lectura no puede hacer daño con Bash o Edit aunque algo salga mal en su ejecución.</td></tr>
</table>
  </div>
  <div id="ccse-3" class="tab-panel">
<div class="concept-intro">Los mismos principios de manejo de secretos que aplican a cualquier herramienta de desarrollo aplican acá, sin excepciones especiales por tratarse de IA.</div>
<table class="kv-table"><tr><th>Regla</th><th>Cómo aplicarla</th></tr>
<tr><td>Bloquear la lectura de archivos sensibles</td><td>Reglas <code>deny</code> en <code>permissions</code> para <code>.env*</code>, <code>secrets/**</code>, claves privadas — ver el tema "settings.json".</td></tr>
<tr><td>Nunca secretos como argumento de comando</td><td>Un secreto pasado como argumento de shell queda visible en el historial de comandos y en <code>ps</code> mientras corre — usar variables de entorno en su lugar.</td></tr>
<tr><td>API keys solo en gestores de secretos o variables de entorno</td><td>Nunca hardcodeadas en <code>settings.json</code> versionado ni en el código — mismo principio que se vio para la API key de Anthropic en "Instalación y autenticación".</td></tr>
<tr><td>Cuidado con el contexto compartido en VS Code</td><td>Si tenés un archivo sensible abierto en el editor, su contenido puede compartirse automáticamente como contexto (ver "Claude Code en Visual Studio Code") salvo que lo excluyas explícitamente.</td></tr>
</table>
<div class="concept-intro">En síntesis: un agente con acceso real a tu sistema no cambia las reglas de seguridad que ya conocés de cualquier herramienta con esos mismos permisos — las vuelve más importantes de aplicar consistentemente, porque el agente puede actuar sobre muchos archivos y comandos en el tiempo que a una persona le tomaría revisar uno solo.</div>
  </div>
</div>
`,

};  // fin CLAUDECODE_RICH
