// ══════════════════════════════════════════════════════════════════
//  WAYVE RICH CONTENT (páginas con contenido pre-cargado)
// ══════════════════════════════════════════════════════════════════
const WAYVE_RICH = {

'wayve-plan': `
<div class="alert-card">
  🎯 <strong>La entrevista es el martes 14 de julio — tienes 7 días.</strong> Este plan está diseñado para cubrir todo lo que te evaluarán: HIL/SIL/MIL, pytest, algoritmos, system design, MCAP y triage. Sigue los días en orden; cada uno construye sobre el anterior.
</div>

<div class="plan-card">
  <div class="plan-card-title">📅 DÍA 1 — Lunes 7 Jul · Fundamentos del rol (2.5h)</div>

  <div class="plan-block">
    <div class="plan-time">60 min<br><span class="priority-tag p-alta">CRÍTICO</span></div>
    <div class="plan-content">
      <h4>HIL / SIL / MIL — El corazón del JD</h4>
      <p>Lee la sección "HIL/SIL/MIL para la entrevista Wayve" en esta app. Luego ciérrala y explícalo en voz alta en 2 minutos como si fuera la entrevista. Repite hasta que fluya.</p>
      <div class="p-chips"><span class="p-chip">HIL vs SIL vs MIL</span><span class="p-chip">Triage por nivel</span><span class="p-chip">Bench HW vs firmware</span></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">60 min<br><span class="priority-tag p-alta">CRÍTICO</span></div>
    <div class="plan-content">
      <h4>Triage methodology + MCAP</h4>
      <p>Lee las secciones "Triage HW vs SW vs Tooling" y "MCAP" de esta app. MCAP lo mencionan por nombre en el JD — debes poder explicar qué es aunque no lo hayas usado.</p>
      <div class="p-chips"><span class="p-chip">MCAP = sensor container</span><span class="p-chip">Foxglove Studio</span><span class="p-chip">Triage paso a paso</span></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">30 min<br><span class="priority-tag p-media">MEDIA</span></div>
    <div class="plan-content">
      <h4>Wayve — Investigar la empresa</h4>
      <p>Lee la sección "Wayve — Quiénes son" y busca noticias recientes. Debes poder responder: "¿por qué Wayve?" con algo específico, no genérico.</p>
    </div>
  </div>
</div>

<div class="plan-card">
  <div class="plan-card-title">📅 DÍA 2 — Martes 8 Jul · pytest profundo (2.5h)</div>

  <div class="plan-block">
    <div class="plan-time">90 min<br><span class="priority-tag p-alta">CRÍTICO</span></div>
    <div class="plan-content">
      <h4>pytest — tu ventaja confirmada, exprime hasta el fondo</h4>
      <p>Te dijeron explícitamente que pytest ayuda. No solo repasar — PRACTICAR. Escribe código real: un conftest.py con fixtures de scope session/module/function, un test parametrizado, un test que use markers personalizados.</p>
      <div class="p-chips"><span class="p-chip">conftest.py real</span><span class="p-chip">@parametrize con ids</span><span class="p-chip">fixture yield</span><span class="p-chip">pytest-cov</span><span class="p-chip">marks custom</span></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">60 min<br><span class="priority-tag p-alta">ALTA</span></div>
    <div class="plan-content">
      <h4>Mock / Patch en unittest + integración con pytest</h4>
      <p>Practica: mockear una llamada HTTP, mockear un archivo, mockear una función de HW. Esto aparece en cualquier test automation role.</p>
      <div class="p-chips"><span class="p-chip">@patch decorator</span><span class="p-chip">MagicMock</span><span class="p-chip">return_value / side_effect</span></div>
    </div>
  </div>
</div>

<div class="plan-card">
  <div class="plan-card-title">📅 DÍA 3 — Miércoles 9 Jul · Algoritmos parte 1 (2.5h)</div>

  <div class="plan-block">
    <div class="plan-time">30 min<br><span class="priority-tag p-alta">CRÍTICO</span></div>
    <div class="plan-content">
      <h4>Teoría: Big O + estructuras de datos clave</h4>
      <p>Repasa: O(1), O(n), O(log n), O(n²). Cuándo usar: list vs deque vs heap vs dict. Esta base es lo que necesitas para razonar en voz alta durante el coding challenge.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">2h<br><span class="priority-tag p-alta">CRÍTICO</span></div>
    <div class="plan-content">
      <h4>Práctica: Sliding Window + HashMap (los más probables para este rol)</h4>
      <p>Resuelve 3-4 problemas de cada patrón. Para Wayve: "top N errores más frecuentes", "detectar gap en stream de timestamps", "ventana de tiempo con más fallos".</p>
      <div class="p-chips"><span class="p-chip">collections.Counter</span><span class="p-chip">collections.deque</span><span class="p-chip">Sliding Window</span><span class="p-chip">Two Pointers</span></div>
    </div>
  </div>
</div>

<div class="plan-card">
  <div class="plan-card-title">📅 DÍA 4 — Jueves 10 Jul · Algoritmos parte 2 + CI/CD (2.5h)</div>

  <div class="plan-block">
    <div class="plan-time">90 min<br><span class="priority-tag p-alta">ALTA</span></div>
    <div class="plan-content">
      <h4>BFS / DFS + Binary Search</h4>
      <p>Practica 2 problemas de BFS/DFS (grafos de dependencias entre tests) y 2 de Binary Search (buscar en logs ordenados, git bisect lógica).</p>
      <div class="p-chips"><span class="p-chip">BFS con deque</span><span class="p-chip">DFS recursivo</span><span class="p-chip">bisect module</span></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">60 min<br><span class="priority-tag p-alta">ALTA</span></div>
    <div class="plan-content">
      <h4>CI/CD debugging + Linux commands</h4>
      <p>Lee la sección "CI/CD debugging strategy" y practica comandos Linux en tu terminal: grep -rn, tail -f, awk, find, ps aux, kill, cron. El rol vive en Linux.</p>
      <div class="p-chips"><span class="p-chip">grep -rn "ERROR" logs/</span><span class="p-chip">tail -f pipeline.log</span><span class="p-chip">awk '{print $2}'</span><span class="p-chip">ps aux | grep python</span></div>
    </div>
  </div>
</div>

<div class="plan-card">
  <div class="plan-card-title">📅 DÍA 5 — Viernes 11 Jul · System Design (2h)</div>

  <div class="plan-block">
    <div class="plan-time">60 min<br><span class="priority-tag p-alta">CRÍTICO</span></div>
    <div class="plan-content">
      <h4>System design: pipeline de validación de datos de sensores</h4>
      <p>Dibuja (en papel o app) el flujo: vehículo captura datos → MCAP → offload → ingest → validación → almacenamiento → dashboard. Para cada componente: ¿qué puede fallar? ¿cómo lo detectas?</p>
      <div class="p-chips"><span class="p-chip">Data pipeline AV</span><span class="p-chip">Message queues</span><span class="p-chip">Monitoreo</span><span class="p-chip">Escalabilidad</span></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">60 min<br><span class="priority-tag p-media">MEDIA</span></div>
    <div class="plan-content">
      <h4>Observabilidad: Logs + Métricas + Traces</h4>
      <p>Entiende los 3 pilares. Para Wayve: ¿cómo monitorizarías la salud del pipeline de validación? ¿qué métricas importan? (tasa de fallos, latencia de ingesta, cobertura de tests).</p>
      <div class="p-chips"><span class="p-chip">Prometheus metrics</span><span class="p-chip">Grafana dashboard</span><span class="p-chip">Python logging</span><span class="p-chip">Alertas</span></div>
    </div>
  </div>
</div>

<div class="plan-card">
  <div class="plan-card-title">📅 DÍA 6 — Sábado 12 Jul · Simulacro de entrevista (2h)</div>

  <div class="plan-block">
    <div class="plan-time">30 min<br><span class="priority-tag p-alta">CRÍTICO</span></div>
    <div class="plan-content">
      <h4>Coding challenge en tiempo real</h4>
      <p>Pon un timer de 30 min. Resuelve este problema SIN ver notas: "Dado una lista de eventos [(timestamp, tipo_error)], encuentra los 3 errores más frecuentes en la última hora." Habla en voz alta mientras lo resuelves.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">30 min<br><span class="priority-tag p-alta">CRÍTICO</span></div>
    <div class="plan-content">
      <h4>Preguntas de entrevista — responde en voz alta</h4>
      <p>Usa las "Preguntas probables" de esta app. Responde cada una en voz alta, como si el entrevistador estuviera frente a ti. Grábate si puedes para escucharte.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">60 min<br><span class="priority-tag p-media">MEDIA</span></div>
    <div class="plan-content">
      <h4>Prepara tus 3 historias STAR</h4>
      <p>Escríbelas completas: S(ituación) → T(area) → A(cción) → R(esultado). Una sobre debugging complejo, una sobre mejora de proceso, una sobre trabajo ambiguo. Deben durar ~2 min cada una.</p>
    </div>
  </div>
</div>

<div class="plan-card">
  <div class="plan-card-title">📅 DÍA 7 — Domingo 13 Jul · Repaso final + descanso (1h max)</div>

  <div class="plan-block">
    <div class="plan-time">30 min</div>
    <div class="plan-content">
      <h4>Flash review de los temas críticos</h4>
      <p>Solo leer, no estudiar nuevo contenido. Revisa: HIL/SIL/MIL (3 párrafos), pytest fixtures (código), triage methodology (pasos), MCAP (1 párrafo), tus 3 historias STAR.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">15 min</div>
    <div class="plan-content">
      <h4>Tus 3 preguntas al entrevistador</h4>
      <p>Elige las 3 mejores de la sección "Preguntas al entrevistador — Wayve". Memorízalas. Terminar la entrevista con buenas preguntas diferencia a los candidatos mediocres de los buenos.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Resto del día</div>
    <div class="plan-content">
      <h4>Descanso — sin estudiar más</h4>
      <p>No estudies más el domingo. Duerme bien. La mente descansada retiene mejor y piensa más rápido en la entrevista que una mente saturada.</p>
    </div>
  </div>
</div>

<div class="plan-card">
  <div class="plan-card-title">☀️ DÍA DE LA ENTREVISTA — Martes 14 Jul</div>
  <div class="plan-block">
    <div class="plan-time">-60 min</div>
    <div class="plan-content"><h4>Quick review de 3 cosas</h4><p>HIL vs SIL vs MIL en una oración cada uno. Triage = reproduce → aisla → root cause. MCAP = contenedor de datos de sensores AV.</p></div>
  </div>
  <div class="plan-block">
    <div class="plan-time">-15 min</div>
    <div class="plan-content"><h4>Setup técnico</h4><p>Conexión estable. Cámara. Micrófono. Agua. Esta app abierta en otra pantalla si la necesitas. IDE listo para el coding challenge.</p></div>
  </div>
</div>

<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Notas del plan / ajustes</div>
  <p class="notes-placeholder">Si un día te quedas corto de tiempo, prioriza en este orden: HIL/SIL/MIL → pytest → Algoritmos → System Design → MCAP → Behavioral.</p>
</div>`,

'wayve-empresa': `
<div class="plan-card">
  <div class="plan-card-title">🏢 Wayve — Deep Dive Company Profile</div>
  <div class="plan-block">
    <div class="plan-time">Fundación y misión</div>
    <div class="plan-content">
      <h4>Founded 2017 — "Embodied Intelligence"</h4>
      <p>Wayve fue fundada en Cambridge en 2017 por <b>Amar Shah</b> (CEO, ex-Cambridge PhD) y <b>Alex Kendall</b> (Chief Scientist, ex-Cambridge, experto en deep learning para visión). Su tesis central: la conducción autónoma se debe aprender, no programar.<br><br>
      <b>Misión oficial:</b> "To develop the intelligence for self-driving cars using embodied AI" — IA que aprende de la experiencia en el mundo real, no de reglas escritas a mano.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Funding y crecimiento</div>
    <div class="plan-content">
      <h4>$1.05 Billion Series C — Mayo 2024</h4>
      <p>La ronda de Series C de Wayve fue la <b>más grande en la historia del deep tech europeo</b>:<br>
      • <b>SoftBank:</b> Lead investor (Vision Fund)<br>
      • <b>NVIDIA:</b> Investor estratégico (también proveen el hardware de cómputo)<br>
      • <b>Microsoft:</b> Investor (alianza para compute en Azure)<br>
      • <b>Eclipse Ventures, Uber:</b> También participaron<br><br>
      Rondas previas: Series A $20M (2019), Series B $200M (2022).<br>
      Total raised: ~$1.3 billion. Valoración estimada: $5B+</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Diferenciadores clave</div>
    <div class="plan-content">
      <h4>Por qué Wayve es diferente a Waymo/Mobileye</h4>
      <p><b>Waymo/Cruise (AV 1.0):</b> Mapas HD detallados de cada calle + reglas escritas a mano para cada situación + ML para percepción. Muy caro de escalar (necesitas mapear cada ciudad).<br><br>
      <b>Wayve (AV 2.0):</b> Un modelo de deep learning aprende de datos. Sin mapas HD requeridos (aunque los usan para contexto). El modelo generaliza a calles nuevas como lo haría un humano. Más barato de escalar geográficamente.<br><br>
      <b>LINGO:</b> Su "foundation model" para conducción — multimodal (video + lenguaje), entrenado en millones de millas de datos. Puede recibir instrucciones en lenguaje natural ("be more cautious near schools").</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Operaciones actuales</div>
    <div class="plan-content">
      <h4>Dónde y cómo operan</h4>
      <p>• <b>Sede:</b> King's Cross, London (HQ). También Cambridge.<br>
      • <b>Testing:</b> Vehículos de desarrollo en calles de Londres y Cambridge. Safety driver siempre presente (reglamento DVSA UK).<br>
      • <b>Socios comerciales:</b> Acuerdo con <b>Uber</b> para llevar la tecnología a taxis autónomos en UK y Europa.<br>
      • <b>Partnership con Asda (Walmart UK):</b> Pruebas de delivery autónomo de supermercado (van autónoma).<br>
      • <b>Fleet:</b> ~100+ vehículos de desarrollo activos.<br>
      • <b>Empleados:</b> ~600 personas (post Series C).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">El rol — Platform Validation</div>
    <div class="plan-content">
      <h4>Por qué este rol existe en Wayve</h4>
      <p>En Wayve, el software del modelo se itera <b>muy rápido</b> (AV 2.0 permite entrenar y desplegar nuevas versiones frecuentemente). Para que esto funcione, necesitan:<br>
      1. <b>Benches HIL confiables</b> para probar firmware sin usar el vehículo real.<br>
      2. <b>Pipelines de CI robustos</b> que validen cada nuevo modelo antes de poner un safety driver en riesgo.<br>
      3. <b>Validación de datos</b> de los sensores del vehículo (para asegurar que lo que llega al entrenamiento sea bueno).<br><br>
      <b>TÚ eres la persona que hace que esa cadena no se rompa.</b></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Frases para la entrevista</div>
    <div class="plan-content">
      <h4>Di EXACTAMENTE esto en la entrevista (en inglés)</h4>
      <p><em>"I'm particularly excited about Wayve because the AV 2.0 approach — learning end-to-end from data rather than writing rules — fundamentally changes what validation means. Instead of testing rule coverage, you're validating data quality, model behavior, and platform reliability at scale. That's a much harder and more interesting problem."</em><br><br>
      <em>"The combination of embedded systems work on the HIL benches and the software pipeline work in CI is exactly where I want to be — it's the intersection of hardware reliability and software automation."</em></p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas sobre Wayve</div>
  <p class="notes-placeholder">Agrega aquí detalles adicionales que investigues antes de la entrevista...</p>
</div>`,

'wayve-jd': `
<div class="alert-card">
  🎯 <strong>Cada palabra del JD es una pregunta disfrazada.</strong> Aquí desglosamos qué preguntan, qué buscan escuchar, y exactamente qué decir para cada requisito.
</div>

<!-- ═══ REQUIREMENT 1: HIL/SIL/MIL ═══ -->
<div class="plan-card">
  <div class="plan-card-title">🔴 Req 1 — "Experience with HIL/SIL/MIL bench testing"</div>
  <div class="plan-block">
    <div class="plan-time">Lo que buscan</div>
    <div class="plan-content">
      <h4>Que hayas tocado hardware real de pruebas embebidas</h4>
      <p>No quieren teoría — quieren saber que has conectado una ECU a un bench, has visto fallar un test en HIL y has tenido que debuggearlo. El JD lo pone primero porque es su pain point #1: los benches son hardware físico que falla de maneras impredecibles y alguien tiene que mantenerlos.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Di exactamente</div>
    <div class="plan-content">
      <h4>En inglés, primera vez que te lo pregunten</h4>
      <p><em>"I've worked with HIL benches for [X years] in an automotive context. Specifically, I've used them to test [ECU tipo / función]. The part I've spent the most time on is triage — when a HIL test fails, the first question is always: is this a firmware bug, a bench hardware issue, or a tooling/infrastructure problem? I have a methodology for that that I can walk you through."</em></p>
      <div class="p-chips"><span class="p-chip">Menciona años de experiencia</span><span class="p-chip">Menciona el tipo de ECU</span><span class="p-chip">Ofrece explicar tu metodología</span></div>
    </div>
  </div>
</div>

<!-- ═══ REQUIREMENT 2: PYTHON ═══ -->
<div class="plan-card" style="margin-top:12px">
  <div class="plan-card-title">🔴 Req 2 — "Python proficiency for automation and tooling"</div>
  <div class="plan-block">
    <div class="plan-time">Lo que buscan</div>
    <div class="plan-content">
      <h4>Python como herramienta de trabajo diario, no como hobby</h4>
      <p>Quieren alguien que pueda escribir scripts de validación de MCAP, parsers de logs de CI, dashboards, herramientas de triage — todo en Python. No preguntan Python básico (listas, diccionarios): preguntan pytest avanzado, manejo de archivos binarios, asyncio, dataclasses, typing. Y esperan un coding challenge en vivo.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Señales que demuestran nivel</div>
    <div class="plan-content">
      <h4>Menciona estas cosas naturalmente</h4>
      <p>• Usas <b>type hints</b> en todo tu código (<code>def fn(x: List[int]) -&gt; Dict[str, int]</code>)<br>
      • Usas <b>dataclasses</b> para estructurar datos, no dicts anidados<br>
      • Conoces <b>collections.defaultdict, Counter, deque</b> y cuándo usarlos<br>
      • Escribes <b>pytest con fixtures y parametrize</b>, no unittest al azar<br>
      • Has procesado archivos binarios (<b>struct.unpack</b>, buffers de bytes)<br>
      • Conoces <b>pathlib</b>, no <code>os.path</code> legacy<br>
      • Sabes qué es el <b>GIL</b> y cuándo usar multiprocessing vs threading</p>
    </div>
  </div>
</div>

<!-- ═══ REQUIREMENT 3: CI/CD ═══ -->
<div class="plan-card" style="margin-top:12px">
  <div class="plan-card-title">🔴 Req 3 — "Debug and operate CI/CD pipelines"</div>
  <div class="plan-block">
    <div class="plan-time">Lo que buscan</div>
    <div class="plan-content">
      <h4>Que no huyas cuando el pipeline explota</h4>
      <p>En Wayve, el modelo de ML se actualiza frecuentemente → el CI/CD es crítico para no meter bugs en el vehículo. Buscan a alguien que sepa distinguir un fallo real de un fallo de infra, que documente las causas, y que reduzca el tiempo de investigación. "Operate" significa también que seas el que mantiene los runners, el que configura los steps, el que crea los dashboards de health del pipeline.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Di exactamente</div>
    <div class="plan-content">
      <h4>Demuestra ownership del pipeline</h4>
      <p><em>"In my current role, I'm not just a consumer of the CI pipeline — I'm a contributor and maintainer. When tests start failing, I own the investigation end-to-end: I look at the failure rate trend, categorize failures by type, and fix the ones that are infrastructure or test-design issues before escalating real regressions to the engineering team. I've reduced false positive rates by [X]% through fixture improvements and retry policies."</em></p>
    </div>
  </div>
</div>

<!-- ═══ REQUIREMENT 4: LINUX ═══ -->
<div class="plan-card" style="margin-top:12px">
  <div class="plan-card-title">🔴 Req 4 — "Linux environment (development vehicle compute platform)"</div>
  <div class="plan-block">
    <div class="plan-time">Lo que buscan</div>
    <div class="plan-content">
      <h4>Comodidad real en la terminal, no solo saber <code>ls</code></h4>
      <p>El HPC del vehículo de desarrollo corre Ubuntu. Cuando hay un problema in-field, alguien tiene que SSH al vehículo y debuggear en tiempo real. Esperan que sepas: <code>journalctl</code> para logs de servicios, <code>dmesg</code> para kernel/driver errors, <code>htop</code>/<code>top</code> para recursos, <code>tcpdump</code>/<code>netstat</code> para red, <code>strace</code>/<code>lsof</code> para procesos, y <code>systemctl</code> para gestión de servicios.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Ejemplo de respuesta</div>
    <div class="plan-content">
      <h4>Cuando te pregunten "how comfortable are you with Linux?"</h4>
      <p><em>"Very comfortable — it's my primary working environment. I spend most of my day in the terminal. Specifically, I'm comfortable with service management via systemd, reading kernel logs with dmesg to diagnose driver issues, network debugging with tcpdump and netstat, and process-level debugging with strace and lsof. In an embedded AV context, I've also worked with PTP for clock synchronization across compute modules."</em></p>
    </div>
  </div>
</div>

<!-- ═══ REQUIREMENT 5: MCAP ═══ -->
<div class="plan-card" style="margin-top:12px">
  <div class="plan-card-title">🔴 Req 5 — "MCAP format, offload and ingest processes"</div>
  <div class="plan-block">
    <div class="plan-time">Lo que buscan</div>
    <div class="plan-content">
      <h4>El único que menciona MCAP por nombre — es su tech actual</h4>
      <p>Que un JD mencione MCAP explícitamente significa que es parte de su stack actual. Esperan que sepas qué es (no que hayas trabajado con él obligatoriamente), que puedas leerlo en Python, y que entiendas el flujo: graban en el vehículo → offload al server → validan → ingestan al cloud storage para training. Si has trabajado con ROS bags o cualquier sistema de logging de sensores, ese contexto aplica perfectamente.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Si no tienes experiencia directa — di esto</div>
    <div class="plan-content">
      <h4>Honestidad + competencia = mejor respuesta</h4>
      <p><em>"I haven't used MCAP specifically in production, but I understand the concept well — it's a container format for time-series sensor data, similar to ROS bags but with better indexing and random access. I've worked with [ROS bags / custom binary formats / similar] and the validation patterns are the same: check topic completeness, timestamp monotonicity, frequency within tolerance, and file integrity. I've already written validation scripts targeting the MCAP Python library to get familiar before this interview."</em></p>
    </div>
  </div>
</div>

<!-- ═══ REQUIREMENT 6: TRIAGE ═══ -->
<div class="plan-card" style="margin-top:12px">
  <div class="plan-card-title">🔴 Req 6 — "Triage: bench HW vs firmware defect vs tooling"</div>
  <div class="plan-block">
    <div class="plan-time">Lo que buscan</div>
    <div class="plan-content">
      <h4>Una metodología sistemática, no intuición aleatoria</h4>
      <p>Esto es el corazón del rol. Cuando falla algo en el sistema AV, hay tres lugares donde puede estar el problema: el hardware físico del bench (cablea flojo, interfaz CAN defectuosa), el firmware del vehículo (bug real de software), o la infraestructura de testing (runner de CI saturado, configuración incorrecta del test). El entrevistador quiere saber que tienes un proceso reproducible, no que "lo sientes".</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Tu metodología (memoriza los pasos)</div>
    <div class="plan-content">
      <h4>El árbol de decisión de triage</h4>
      <p><b>Step 1:</b> <em>"Is it reproducible?"</em><br>
      → Si NO: infra/tooling flaky. Retry → si pasa, documenta como known flaky, crea ticket, no bloquea merge.<br>
      → Si SÍ: sigue al paso 2.<br><br>
      <b>Step 2:</b> <em>"Does it reproduce on a different bench?"</em><br>
      → Si NO: bench-specific hardware issue. Revisa el bench físico.<br>
      → Si SÍ: sigue al paso 3.<br><br>
      <b>Step 3:</b> <em>"Does it reproduce in SIL (sin hardware real)?"</em><br>
      → Si SÍ: firmware bug. Escala al equipo de SW con el log completo.<br>
      → Si NO: problema específico de interacción HW/SW. Necesita debugging conjunto.</p>
    </div>
  </div>
</div>

<!-- ═══ JD MATRIX ═══ -->
<div class="plan-card" style="margin-top:12px">
  <div class="plan-card-title">🗺️ Mapa completo — JD vs Tu experiencia vs Qué decir</div>
  <div class="plan-block">
    <div class="plan-time">Tabla de mapeo</div>
    <div class="plan-content">
      <table class="ref-table">
        <thead><tr><th>JD dice</th><th>Prioridad</th><th>Tu experiencia equivalente</th><th>Frase clave en inglés</th></tr></thead>
        <tbody>
          <tr><td>HIL/SIL/MIL</td><td>🔴 Crítico</td><td>Testing de ECUs automotrices</td><td>"I've maintained HIL benches and triaged their failures end-to-end"</td></tr>
          <tr><td>Python automation</td><td>🔴 Crítico</td><td>Scripts pytest, automatización</td><td>"Python is my primary automation language — I write frameworks, not just scripts"</td></tr>
          <tr><td>CI/CD debugging</td><td>🔴 Crítico</td><td>Jenkins/GitHub Actions</td><td>"I own CI reliability, not just consume it"</td></tr>
          <tr><td>Linux</td><td>🔴 Crítico</td><td>Bash, SSH, systemd</td><td>"It's my primary environment — I'm comfortable in the terminal for debugging"</td></tr>
          <tr><td>MCAP</td><td>🔴 Crítico</td><td>Formatos de datos de sensores</td><td>"I've studied MCAP and written validation scripts for it"</td></tr>
          <tr><td>Triage methodology</td><td>🔴 Crítico</td><td>Debugging sistemático</td><td>"I have a 3-step triage process: reproducibility → isolation → root cause"</td></tr>
          <tr><td>C/C++</td><td>🟡 Bonus</td><td>Código embebido</td><td>"I can read and debug C firmware when needed — I've worked with embedded codebases"</td></tr>
          <tr><td>Embedded systems</td><td>🟡 Bonus</td><td>ECUs, microcontroladores</td><td>"My background is embedded automotive — that's where I started"</td></tr>
          <tr><td>Sensor data validation</td><td>🟡 Bonus</td><td>Scripts de validación</td><td>"I've designed validation pipelines for sensor data before"</td></tr>
          <tr><td>Observability/dashboards</td><td>🟡 Bonus</td><td>Grafana, logging</td><td>"I've built Grafana dashboards for pipeline health monitoring"</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- ═══ SUCCESS METRICS ═══ -->
<div class="plan-card" style="margin-top:12px">
  <div class="plan-card-title">✅ Cómo te miden — Los 4 KPIs del rol</div>
  <div class="plan-block">
    <div class="plan-time">KPI 1</div>
    <div class="plan-content"><h4>Efficiency — Reduce mean time to triage</h4><p>El JD lo dice explícitamente. El éxito se mide en <b>cuánto más rápido</b> el equipo sabe si un fallo es real o ruido. Si hoy tarda 4 horas promedio y en 6 meses tarda 30 minutos, eso es éxito. <em>En la entrevista: menciona un ejemplo donde redujiste tiempo de diagnóstico y da el número.</em></p></div>
  </div>
  <div class="plan-block">
    <div class="plan-time">KPI 2</div>
    <div class="plan-content"><h4>Clarity — Pipeline visibility</h4><p>¿Hay un dashboard? ¿Puede cualquier engineer saber en 30 segundos si el CI está sano? ¿Hay alertas cuando algo se rompe antes de que alguien lo reporte? <em>Menciona si has construido dashboards de CI health o runbooks documentados.</em></p></div>
  </div>
  <div class="plan-block">
    <div class="plan-time">KPI 3</div>
    <div class="plan-content"><h4>Confidence — Evidence for release</h4><p>Cuando el equipo de software dice "ready to deploy this firmware to the vehicle", ¿qué evidencia tienes de que es seguro? Tu trabajo crea esa evidencia: HIL passed, sensor data validated, CI green. <em>Menciona cómo tu trabajo ha dado confianza al equipo para hacer releases.</em></p></div>
  </div>
  <div class="plan-block">
    <div class="plan-time">KPI 4</div>
    <div class="plan-content"><h4>Scalability — Less manual work over time</h4><p>Cada proceso que automatizas = uno menos que alguien tiene que hacer a mano. El rol evoluciona: empiezas arreglando el bench, terminas habiendo construido el sistema que monitorea todos los benches automáticamente. <em>Menciona proyectos donde reemplazaste trabajo manual con automatización.</em></p></div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis mapeos personales</div>
  <p class="notes-placeholder">Para cada req del JD, escribe aquí tu experiencia CONCRETA más relevante. Ejemplo: "HIL → trabajé con benches Bosch para ECU de ABS, usé CANoe + dSPACE 2021-2023"</p>
</div>`,

'wayve-preguntas': `
<div class="plan-card">
  <div class="plan-card-title">💬 Preguntas probables y cómo responderlas</div>

  <div class="plan-block">
    <div class="plan-time">Triage</div>
    <div class="plan-content">
      <h4>"¿Cómo distingues un bug de firmware de un problema de bench hardware?"</h4>
      <p><b>Respuesta marco:</b> Paso 1: ¿es reproducible? Si es intermitente → sospecha de HW/tooling. Paso 2: ¿falla en otra plataforma HW? Si sí → firmware. Si no → HW específico. Paso 3: ¿falla en SIL pero no en HIL? → problema de configuración/entorno.</p>
    </div>
  </div>

  <div class="plan-block">
    <div class="plan-time">Testing</div>
    <div class="plan-content">
      <h4>"Describe tu experiencia con HIL testing"</h4>
      <p>Usa STAR. Prepara una historia real donde hayas identificado un fallo en HIL, triageado su causa, y mejorado el proceso.</p>
    </div>
  </div>

  <div class="plan-block">
    <div class="plan-time">CI/CD</div>
    <div class="plan-content">
      <h4>"¿Cómo mejorarías la confiabilidad de un pipeline de CI con muchos flaky tests?"</h4>
      <p>1) Identificar y cuantificar flakiness (tracking DB). 2) Clasificar: infra vs test vs código. 3) Quarantine automático de flaky. 4) Retry con backoff. 5) Dashboard de health. 6) Runbook para cada tipo de fallo recurrente.</p>
    </div>
  </div>

  <div class="plan-block">
    <div class="plan-time">Python</div>
    <div class="plan-content">
      <h4>"¿Cómo usarías pytest para validar datos de sensores?"</h4>
      <p>Fixture que carga archivo MCAP → parametrize para distintas configs de sensor → assert en frecuencia, gaps, formato. Mark tests que requieren HW real.</p>
    </div>
  </div>

  <div class="plan-block">
    <div class="plan-time">Algoritmos</div>
    <div class="plan-content">
      <h4>Coding challenge probable: procesar un stream de eventos</h4>
      <p>Ejemplo: "dado un log de eventos, encuentra los 3 errores más frecuentes en ventanas de 5 minutos". → Sliding window + Counter/HashMap. Complejidad O(n).</p>
    </div>
  </div>

  <div class="plan-block">
    <div class="plan-time">Behavioral</div>
    <div class="plan-content">
      <h4>"Cuéntame de un proyecto ambiguo donde tuviste que aprender rápido"</h4>
      <p>El JD dice "ability to pick up context quickly in ambiguous environments". Prepara una historia donde hayas entrado a un sistema que no conocías y lo resolviste rápido.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis historias STAR preparadas</div>
  <p class="notes-placeholder">Escribe aquí tus 2-3 historias STAR con contexto específico de tu experiencia...</p>
</div>`,

'wayve-lingo': `
<div class="plan-card">
  <div class="plan-card-title">🧠 LINGO — El foundation model de Wayve para conducción</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es LINGO?</div>
    <div class="plan-content">
      <h4>Large Intelligent Network for Driving — End-to-end AV model</h4>
      <p>LINGO es el modelo central de Wayve. A diferencia de los sistemas AV tradicionales con módulos separados (percepción → predicción → planificación → control), LINGO aprende <b>una función end-to-end</b>: de inputs de cámara directamente a señales de control del vehículo.<br><br>
      <b>LINGO-1</b> (publicado 2023): Primer modelo que puede explicar sus decisiones de conducción en lenguaje natural. "I'm slowing down because there's a pedestrian about to cross." — El modelo no solo conduce, puede verbalizar por qué.<br><br>
      <b>LINGO-2</b> (2024): Versión multimodal mejorada. Puede recibir instrucciones en lenguaje natural Y responder preguntas sobre lo que ve. Como GPT-4V pero para conducción autónoma.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Implicación para tu rol</div>
    <div class="plan-content">
      <h4>¿Por qué importa LINGO para Platform Validation?</h4>
      <p>En Wayve, el modelo se actualiza frecuentemente (iteración rápida de ML). Esto significa:<br>
      • <b>Cada nueva versión del modelo necesita ser validada en HIL antes de ir al vehículo real.</b><br>
      • Los <b>datos de entrenamiento</b> (grabados por los development vehicles) deben ser de alta calidad — tu trabajo de sensor validation alimenta directamente la calidad del modelo.<br>
      • Si los datos tienen gaps, timestamps incorrectos, o sensores fallidos, el modelo aprende cosas incorrectas.<br>
      • La validación de datos no es un paso burocrático — es <b>seguridad crítica</b>.<br><br>
      <b>Frase para la entrevista:</b> <em>"Understanding that LINGO is trained on vehicle data makes sensor validation especially critical — bad data doesn't just break a test, it corrupts the model."</em></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Comparativa técnica</div>
    <div class="plan-content">
      <h4>LINGO vs sistemas clásicos modulares</h4>
      <table class="ref-table">
        <thead><tr><th>Aspecto</th><th>Sistema clásico (Waymo)</th><th>LINGO (Wayve)</th></tr></thead>
        <tbody>
          <tr><td>Arquitectura</td><td>Módulos separados: percepción + planificación + control</td><td>Una red neuronal end-to-end</td></tr>
          <tr><td>Reglas</td><td>Miles de reglas escritas a mano</td><td>Todo aprendido de datos</td></tr>
          <tr><td>Mapas HD</td><td>Requiere mapas detallados de cada calle</td><td>Puede generalizar a calles nuevas</td></tr>
          <tr><td>Debugging</td><td>Errores en módulo específico son rastreables</td><td>Comportamiento emergente, más difícil de debuggear</td></tr>
          <tr><td>Validación</td><td>Test coverage de reglas</td><td>Distribución de escenarios de datos</td></tr>
          <tr><td>Escalado</td><td>Caro: mapear cada ciudad</td><td>Barato: más datos = mejor modelo</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas sobre LINGO</div>
  <p class="notes-placeholder">Busca los papers de LINGO en arxiv.org para más profundidad técnica antes de la entrevista...</p>
</div>`,

'wayve-av20': `
<div class="plan-card">
  <div class="plan-card-title">🚗 AV 1.0 vs AV 2.0 — La apuesta de Wayve</div>
  <div class="plan-block">
    <div class="plan-time">AV 1.0 — La generación anterior</div>
    <div class="plan-content">
      <h4>Reglas + ML modular — Waymo, Cruise, Mobileye tradicional</h4>
      <p><b>Stack típico AV 1.0:</b><br>
      1. <b>Percepción:</b> ML detecta objetos (coches, peatones, señales)<br>
      2. <b>Predicción:</b> Modelos predicen movimiento de los objetos detectados<br>
      3. <b>Planificación:</b> <em>Reglas escritas a mano</em> deciden la ruta y maniobras<br>
      4. <b>Control:</b> PID/MPC controla volante/freno/acelerador<br><br>
      <b>Problemas:</b><br>
      • Long tail problem: cada nueva situación (rotonda inusual, señal de tráfico caída) necesita nueva regla.<br>
      • Mapas HD: necesitas mapear cada ciudad a $1M/milla antes de operar.<br>
      • Escalado muy caro.<br>
      • Brittle: un módulo falla → todo falla.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">AV 2.0 — La nueva generación</div>
    <div class="plan-content">
      <h4>End-to-end learning — Tesla, Wayve, otros</h4>
      <p><b>Stack AV 2.0 (Wayve/Tesla):</b><br>
      Una sola red neuronal (o conjunto de redes grandes) aprende directamente:<br>
      Inputs de cámara → salidas de control (ángulo de volante, presión de freno, aceleración)<br><br>
      <b>Ventajas:</b><br>
      • <b>Generalización:</b> El modelo aprende a "conducir" no a seguir reglas. Se adapta a situaciones nuevas.<br>
      • <b>Escala con datos:</b> Más datos de conducción = modelo mejor. Ley de escala.<br>
      • <b>Sin mapas HD:</b> El modelo usa cámaras como un humano.<br>
      • <b>Iteración rápida:</b> Reentrenar el modelo mejora todo el stack a la vez.<br><br>
      <b>Retos:</b><br>
      • <b>Explainability:</b> Más difícil entender por qué tomó una decisión.<br>
      • <b>Validación:</b> No puedes probar "coverage de reglas" — debes probar distribución de escenarios.<br>
      • <b>Safety case:</b> Certificar safety de un modelo ML es un reto regulatorio no resuelto.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Impacto en tu rol</div>
    <div class="plan-content">
      <h4>AV 2.0 cambia cómo se valida</h4>
      <p>En AV 1.0: validas que las reglas se cumplen (unit testing de lógica de planificación).<br>
      En AV 2.0 (Wayve): validas que:<br>
      • Los <b>datos de entrenamiento</b> son completos, correctos, sin corruption.<br>
      • La <b>plataforma de cómputo</b> del vehículo corre el modelo sin errores de timing.<br>
      • Los <b>sensores</b> graban a la frecuencia y calidad correcta.<br>
      • Los <b>pipelines de CI</b> detectan regresiones en el comportamiento del modelo antes de ir al vehículo.<br><br>
      <em>"In an AV 2.0 company, Platform Validation isn't just about hardware — it's about ensuring the data flywheel works."</em></p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas sobre AV 2.0</div>
  <p class="notes-placeholder">Puedes mencionar Tesla Autopilot como otro ejemplo de AV 2.0 que conoces...</p>
</div>`,

'wayve-dev-vehicle': `
<div class="plan-card">
  <div class="plan-card-title">🚙 Development Vehicle — El hardware donde vive el sistema</div>
  <div class="plan-block">
    <div class="plan-time">Plataforma vehicular</div>
    <div class="plan-content">
      <h4>¿Qué es un Development Vehicle (DV)?</h4>
      <p>Un DV (también llamado "test vehicle" o "bench vehicle") es un vehículo comercial modificado con equipamiento adicional para el desarrollo de AV. Wayve usa principalmente vehículos de pasajeros modificados (reportes públicos mencionan Nissan LEAFs y vanes de Asda para delivery).<br><br>
      <b>Modificaciones típicas:</b><br>
      • <b>Roof rack:</b> LIDAR (Velodyne, Ouster) y cámaras adicionales.<br>
      • <b>Parabrisas:</b> Cámaras frontales (principal input del modelo LINGO).<br>
      • <b>Maletero:</b> High Performance Computer (HPC) — normalmente NVIDIA Drive AGX Orin.<br>
      • <b>Baterías adicionales</b> para alimentar el equipo electrónico.<br>
      • <b>Drive-by-wire:</b> Interface que permite al sistema AV controlar volante/frenos/acelerador eléctricamente.<br>
      • <b>Safety driver seat:</b> Safety driver siempre presente (exigido por DVSA en UK para testing en vía pública).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Sensor stack</div>
    <div class="plan-content">
      <h4>Los sensores del Development Vehicle</h4>
      <table class="ref-table">
        <thead><tr><th>Sensor</th><th>Tipo típico</th><th>Función</th><th>Frecuencia</th></tr></thead>
        <tbody>
          <tr><td>Cámaras frontales</td><td>3-7 cámaras multi-angular</td><td>Input principal del modelo LINGO</td><td>30 Hz</td></tr>
          <tr><td>Cámaras perimetrales</td><td>Fisheye / surround</td><td>Parking, blind spots</td><td>15-30 Hz</td></tr>
          <tr><td>LIDAR</td><td>Ouster OS1, Velodyne Alpha Prime</td><td>Nube de puntos 3D, obstáculos</td><td>10 Hz</td></tr>
          <tr><td>RADAR</td><td>Continental ARS5xx</td><td>Velocidad y distancia de objetos</td><td>20 Hz</td></tr>
          <tr><td>GPS/GNSS</td><td>NovAtel, Trimble</td><td>Posición centimétrica con RTK</td><td>100 Hz</td></tr>
          <tr><td>IMU</td><td>VectorNav VN-300</td><td>Aceleración y orientación</td><td>200 Hz</td></tr>
          <tr><td>CAN bus</td><td>OBD/CAN del vehículo</td><td>Velocidad, ángulo volante, frenos</td><td>100-1000 Hz</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Compute platform</div>
    <div class="plan-content">
      <h4>NVIDIA Drive AGX Orin — El cerebro del vehículo</h4>
      <p><b>NVIDIA Drive AGX Orin</b> (o similar HPC) es el sistema de cómputo en el vehículo:<br>
      • <b>254 TOPS</b> de capacidad de inferencia (para correr LINGO en tiempo real)<br>
      • Multiple CPU cores (ARM) + GPU integrada<br>
      • Interfaces: PCIe para GPUs adicionales, MIPI para cámaras, CAN, Ethernet<br>
      • OS: Linux (Ubuntu o derivado)<br>
      • Software: ROS2 o middleware propio de Wayve para comunicar sensores<br><br>
      <b>Tu rol interactúa con esto en HIL:</b> El bench HIL replica la interfaz eléctrica/lógica del HPC para probar firmware sin el vehículo completo.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Data recording</div>
    <div class="plan-content">
      <h4>Cómo se graban los datos en el vehículo</h4>
      <p>Durante una sesión de conducción, el DV graba todos los streams de sensores en tiempo real:<br>
      • El software de grabación (tipo rosbag2 o propio) escribe <b>MCAP files</b> al storage NVMe local.<br>
      • Capacidad típica: 10-20 TB en el vehículo para sesiones largas.<br>
      • Se crean archivos con timestamp y metadata de la sesión.<br>
      • Al regresar a base, los archivos se <b>offload</b> (descargan) vía Ethernet/WiFi de alta velocidad.<br>
      • 1 hora de datos de todos los sensores = ~1 TB.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas sobre el development vehicle</div>
  <p class="notes-placeholder">Menciona en la entrevista que entiendes que el HPC corre Linux y que el debugging in-vehicle es via SSH...</p>
</div>`,

'wayve-data-pipeline': `
<div class="plan-card">
  <div class="plan-card-title">🔄 Data Pipeline — El flujo de datos de Wayve</div>
  <div class="plan-block">
    <div class="plan-time">Visión general</div>
    <div class="plan-content">
      <h4>Del asfalto al modelo en 5 pasos</h4>
      <div class="code-block"><div class="code-lang">Data Pipeline — Wayve Development Vehicle</div><pre>
1. RECORD (en el vehículo)
   Sensores → MCAP writer → NVMe local
   ~1TB/hora de todos los sensores

2. OFFLOAD (al regresar a base)
   Vehículo → Switch Ethernet 10G → Offload server
   Transferencia: 15-30 min para 1TB vía 10GbE

3. VALIDATE (tu trabajo principal)
   ✓ ¿Están todos los topics/sensores?
   ✓ ¿Timestamps sin gaps &gt; 100ms?
   ✓ ¿Frecuencias de muestreo correctas?
   ✓ ¿Datos numéricamente válidos (no NaN)?
   ✓ ¿Archivo no truncado (MCAP integridad)?
   → Resultado: PASS / FAIL con reporte detallado

4. INGEST (al cloud)
   Validated MCAP → S3/GCS bucket → metadata DB
   Indexado por sesión, vehículo, fecha, escenario

5. CONSUMPTION
   ├─ Training: muestras de datos para entrenar LINGO
   ├─ Evaluation: benchmark de nuevas versiones del modelo
   └─ Replay: reproducir sesiones para debugging</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Paso 3 en detalle — Validation</div>
    <div class="plan-content">
      <h4>Qué significa "validate sensor data"</h4>
      <div class="code-block"><div class="code-lang">Python — Validación de MCAP (pseudocódigo real)</div><pre>
<span class="c-kw">from</span> mcap.reader <span class="c-kw">import</span> make_reader
<span class="c-kw">from</span> dataclasses <span class="c-kw">import</span> dataclass
<span class="c-kw">from</span> collections <span class="c-kw">import</span> defaultdict
<span class="c-kw">import</span> numpy <span class="c-kw">as</span> np

<span class="c-cm"># Frecuencias esperadas por sensor (Hz)</span>
EXPECTED_HZ = {
    <span class="c-st">"/camera/front"</span>: <span class="c-nb">30.0</span>,
    <span class="c-st">"/lidar/points"</span>: <span class="c-nb">10.0</span>,
    <span class="c-st">"/radar/detections"</span>: <span class="c-nb">20.0</span>,
    <span class="c-st">"/imu/data"</span>: <span class="c-nb">200.0</span>,
    <span class="c-st">"/gps/fix"</span>: <span class="c-nb">100.0</span>,
}

<span class="c-kw">def</span> <span class="c-fn">validate_mcap</span>(filepath: str) -&gt; dict:
    issues = defaultdict(list)
    timestamps_by_topic = defaultdict(list)

    <span class="c-kw">with</span> <span class="c-bi">open</span>(filepath, <span class="c-st">"rb"</span>) <span class="c-kw">as</span> f:
        reader = make_reader(f)
        <span class="c-cm"># 1. Verificar que todos los topics esperados existen</span>
        present = {ch.topic <span class="c-kw">for</span> _, ch, _ <span class="c-kw">in</span> reader.iter_messages()}
        <span class="c-kw">for</span> topic <span class="c-kw">in</span> EXPECTED_HZ:
            <span class="c-kw">if</span> topic <span class="c-kw">not in</span> present:
                issues[<span class="c-st">"missing_topics"</span>].append(topic)

        <span class="c-cm"># 2. Recopilar timestamps por topic</span>
        f.seek(<span class="c-nb">0</span>)
        reader = make_reader(f)
        <span class="c-kw">for</span> _, channel, msg <span class="c-kw">in</span> reader.iter_messages():
            timestamps_by_topic[channel.topic].append(msg.log_time)

    <span class="c-cm"># 3. Verificar frecuencias y gaps</span>
    <span class="c-kw">for</span> topic, times <span class="c-kw">in</span> timestamps_by_topic.items():
        <span class="c-kw">if</span> topic <span class="c-kw">not in</span> EXPECTED_HZ:
            <span class="c-kw">continue</span>
        times_s = np.array(times) / <span class="c-nb">1e9</span>  <span class="c-cm"># nanoseg → segundos</span>
        diffs = np.diff(times_s)
        expected_period = <span class="c-nb">1.0</span> / EXPECTED_HZ[topic]
        <span class="c-cm"># Gap: más del doble del período esperado</span>
        gaps = np.where(diffs &gt; expected_period * <span class="c-nb">2.0</span>)[<span class="c-nb">0</span>]
        <span class="c-kw">if</span> <span class="c-bi">len</span>(gaps) &gt; <span class="c-nb">0</span>:
            issues[<span class="c-st">"gaps"</span>].append({
                <span class="c-st">"topic"</span>: topic,
                <span class="c-st">"count"</span>: <span class="c-bi">len</span>(gaps),
                <span class="c-st">"max_gap_ms"</span>: diffs[gaps].max() * <span class="c-nb">1000</span>
            })
    <span class="c-kw">return</span> dict(issues)  <span class="c-cm"># {} = PASS, keys = tipos de fallo</span></pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Runbook de offload</div>
    <div class="plan-content">
      <h4>Lo que harías día a día</h4>
      <p>1. El vehículo regresa de una sesión de 2 horas (~2 TB de datos).<br>
      2. Se conecta al dock de la base. Offload automático inicia.<br>
      3. Tu script de validación corre automáticamente al completarse el offload.<br>
      4. Si PASS → datos se mueven al bucket S3 para ingest.<br>
      5. Si FAIL → creas un issue (GitHub/Jira) con el reporte, notificas al equipo de Perception qué perdieron.<br>
      6. Si el fallo es recurrente → buscas la causa raíz (¿sensor físicamente flojo? ¿bug en el recorder?).<br>
      7. Actualizas el runbook con la nueva causa de fallo conocida.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas sobre el data pipeline</div>
  <p class="notes-placeholder">Este es el corazón del rol. Estudia bien el código de validación...</p>
</div>`,

'wayve-linux-debug': `
<div class="plan-card">
  <div class="plan-card-title">🐧 Linux Debugging en Development Vehicles</div>
  <div class="plan-block">
    <div class="plan-time">Acceso al vehículo</div>
    <div class="plan-content">
      <h4>SSH al HPC del vehículo — tu terminal de campo</h4>
      <div class="code-block"><div class="code-lang">Shell — Conectarse al vehículo de desarrollo</div><pre>
<span class="c-cm"># El HPC corre Ubuntu 20.04/22.04. IP en la red de la base</span>
ssh wayve@192.168.10.45          <span class="c-cm"># HPC del vehículo</span>
ssh -i ~/.ssh/dv_key wayve@dv-042.wayve.local

<span class="c-cm"># Ver logs del sistema AV en tiempo real</span>
journalctl -u wayve-av -f        <span class="c-cm"># logs del servicio AV</span>
journalctl -p err -n 50          <span class="c-cm"># últimos 50 errores del sistema</span>

<span class="c-cm"># Ver uso de recursos del HPC</span>
htop                             <span class="c-cm"># CPU/RAM de todos los procesos</span>
nvidia-smi                       <span class="c-cm"># GPU utilization (para inferencia del modelo)</span>
nvidia-smi dmon -s u             <span class="c-cm"># monitor GPU en tiempo real</span>
iostat -x 1                      <span class="c-cm"># I/O del NVMe (es el cuello de botella al grabar)</span>

<span class="c-cm"># Ver si el recorder está corriendo y grabando</span>
systemctl status wayve-recorder
ls -lh /data/recordings/         <span class="c-cm"># ver archivos MCAP siendo creados</span>
watch -n 1 'ls -lh /data/recordings/*.mcap | tail -5'

<span class="c-cm"># Ver temperatura del HPC (crítico — el compute se apaga por calor)</span>
cat /sys/class/thermal/thermal_zone*/temp
sensors                          <span class="c-cm"># si está instalado lm-sensors</span></pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Debugging de sensores</div>
    <div class="plan-content">
      <h4>Cuando un sensor no está grabando</h4>
      <div class="code-block"><div class="code-lang">Shell — Diagnóstico de sensor offline</div><pre>
<span class="c-cm"># 1. Ver si el proceso del sensor corre</span>
ps aux | grep "camera\|lidar\|radar"
systemctl status wayve-camera-front

<span class="c-cm"># 2. Ver si hay errores en el log del driver</span>
dmesg | grep -i "camera\|usb\|i2c\|error" | tail -20
journalctl -u wayve-camera-front -n 50 --no-pager

<span class="c-cm"># 3. Verificar conectividad de red del sensor (LIDAR/RADAR vía Ethernet)</span>
ip link show                     <span class="c-cm"># ver interfaces de red</span>
ping 192.168.11.100              <span class="c-cm"># IP del LIDAR</span>
tcpdump -i eth1 -c 100          <span class="c-cm"># ¿hay paquetes del LIDAR?</span>

<span class="c-cm"># 4. Para cámaras USB/MIPI — ver si están enumeradas</span>
v4l2-ctl --list-devices          <span class="c-cm"># cámaras V4L2</span>
lsusb                            <span class="c-cm"># dispositivos USB</span>

<span class="c-cm"># 5. Revisar espacio en disco (el recorder falla si se llena)</span>
df -h /data/                     <span class="c-cm"># ver espacio disponible</span>
du -sh /data/recordings/*        <span class="c-cm"># tamaño de cada sesión</span></pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Debugging de timing</div>
    <div class="plan-content">
      <h4>Cuando los timestamps están mal sincronizados</h4>
      <p><b>El problema:</b> Si el reloj del HPC y el reloj del LIDAR están desfasados, los datos grabados tendrán timestamps inconsistentes → el modelo aprende con datos corruptos.<br><br>
      <b>Soluciones comunes:</b><br>
      • <b>PTP (Precision Time Protocol / IEEE 1588):</b> Sincronización de relojes a nanosegundos sobre Ethernet. El HPC actúa como PTP master, los sensores como slaves.<br>
      • <code>ptp4l -i eth1 -m</code> — ver estado de sincronización PTP<br>
      • <code>phc2sys</code> — sincronizar reloj del sistema con el hardware clock<br>
      • <b>GPS-disciplined NTP:</b> El GPS provee referencia de tiempo absoluto.<br><br>
      <b>Verificar sincronización:</b><br>
      <code>timedatectl show</code> — ver NTP sync status<br>
      <code>chronyc tracking</code> — offset del reloj del sistema</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas sobre Linux debugging</div>
  <p class="notes-placeholder">Practica estos comandos en Linux. Instala Ubuntu en una VM si no tienes...</p>
</div>`,

'wayve-reliability': `
<div class="plan-card">
  <div class="plan-card-title">📊 Reliability Engineering para AV Platforms</div>
  <div class="plan-block">
    <div class="plan-time">SLI y SLO para AV</div>
    <div class="plan-content">
      <h4>Medir la confiabilidad de la plataforma</h4>
      <p><b>SLI (Service Level Indicator):</b> La métrica que mides.<br>
      <b>SLO (Service Level Objective):</b> El objetivo de esa métrica.<br>
      <b>SLA (Service Level Agreement):</b> El compromiso formal (con penalizaciones).<br><br>
      <b>SLIs/SLOs típicos para Platform Validation en Wayve:</b></p>
      <table class="ref-table">
        <thead><tr><th>SLI</th><th>Definición</th><th>SLO objetivo</th></tr></thead>
        <tbody>
          <tr><td>Bench availability</td><td>% tiempo que el bench HIL está operacional</td><td>&gt; 95% en horas de trabajo</td></tr>
          <tr><td>Offload success rate</td><td>% de sesiones de conducción que se offloadean correctamente</td><td>&gt; 99%</td></tr>
          <tr><td>Validation pass rate</td><td>% de MCAP files que pasan validación sin errores de datos</td><td>&gt; 98% (fallos = sensor bugs)</td></tr>
          <tr><td>CI pipeline success rate</td><td>% de builds que pasan todos los tests</td><td>&gt; 85% (resto = flaky o bugs reales)</td></tr>
          <tr><td>Mean time to triage</td><td>Tiempo promedio para clasificar un fallo de CI</td><td>&lt; 30 minutos</td></tr>
          <tr><td>Flaky test rate</td><td>% de tests que fallan intermitentemente</td><td>&lt; 5% del total de tests</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Runbooks</div>
    <div class="plan-content">
      <h4>Guías de respuesta a incidentes</h4>
      <p>Un <b>runbook</b> es un documento que describe paso a paso cómo responder a un fallo conocido. Para una plataforma AV, los runbooks más importantes:<br><br>
      <b>Runbook: "Bench HIL no responde"</b><br>
      1. Verificar que el servidor del bench tiene conectividad: <code>ping bench-01</code><br>
      2. Ver logs del daemon: <code>systemctl status hil-daemon</code><br>
      3. Verificar que los cables CAN están conectados (LED verde en el VN1610)<br>
      4. Si el OS del bench está colgado: hard reboot vía IPMI (<code>ipmitool chassis power reset</code>)<br>
      5. Si persiste: revisar si el update de firmware del último deploy fue correcto<br>
      6. Escalar a: @hardware-team en Slack con el log adjunto<br><br>
      <b>Runbook: "MCAP validation failures &gt;5% en una sesión"</b><br>
      1. Identificar qué topic/sensor está fallando<br>
      2. Ver si el fallo es en todos los vehículos o solo uno<br>
      3. Si es solo uno → revisar historial de mantenimiento del sensor físico<br>
      4. Si es todos → probable bug en el recorder software → crear issue con prioridad alta</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Post-mortems</div>
    <div class="plan-content">
      <h4>Análisis sin culpa después de incidentes</h4>
      <p>Estructura de un post-mortem blameless:<br>
      1. <b>Timeline:</b> Cuándo se detectó, cuándo se resolvió, qué pasó entre medio.<br>
      2. <b>Impact:</b> Qué se afectó — ¿cuántas sesiones de datos perdidas? ¿cuánto tiempo parado el bench?<br>
      3. <b>Root cause:</b> La causa raíz real (no "error humano" — eso no es root cause).<br>
      4. <b>Contributing factors:</b> Qué condiciones permitieron que ocurriera.<br>
      5. <b>Action items:</b> Cambios concretos para evitar recurrencia. Con dueño y fecha.<br><br>
      <em>"We had a 4-hour bench outage last quarter when a firmware update broke the CAN driver. Our post-mortem identified that we had no automated rollback and no pre-deployment smoke test for the bench itself. We added both, and haven't had that issue since."</em></p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas sobre reliability</div>
  <p class="notes-placeholder">Prepara una historia STAR sobre cómo mejoraste la confiabilidad de un sistema...</p>
</div>`,

'wayve-design-fleet': `
<div class="plan-card">
  <div class="plan-card-title">🏗️ System Design — Monitorear una flota de vehículos AV</div>
  <div class="plan-block">
    <div class="plan-time">El problema</div>
    <div class="plan-content">
      <h4>"Design a system to monitor 20 development vehicles in real time"</h4>
      <p>Esta es la pregunta de system design más probable para este rol. Lo que el entrevistador quiere ver:<br>
      1. Que entiendas los <b>requisitos de observabilidad</b> específicos de un DV fleet.<br>
      2. Que elijas herramientas apropiadas (no over-engineer).<br>
      3. Que consideres los <b>constraints</b> reales: vehículos en movimiento, conectividad intermitente, seguridad.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Clarifying questions</div>
    <div class="plan-content">
      <h4>Primero pregunta esto (siempre)</h4>
      <p><em>"Before I start designing, let me ask a few clarifying questions:"</em><br>
      • <em>"What metrics are most critical to monitor — sensor health, recording status, vehicle location, compute temperature?"</em><br>
      • <em>"Do the vehicles have continuous connectivity or is it intermittent?"</em><br>
      • <em>"What's the latency requirement — real-time alerting in seconds, or is a 5-minute dashboard refresh acceptable?"</em><br>
      • <em>"How many engineers will be using this dashboard simultaneously?"</em><br>
      • <em>"Is this cloud-hosted or on-premise in the garage?"</em></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Architecture</div>
    <div class="plan-content">
      <h4>Diseño propuesto — pragmático y escalable</h4>
      <div class="code-block"><div class="code-lang">System Design — Fleet Monitoring</div><pre>
┌──────────────────────────────────────────────────────────┐
│  VEHICLE (20 DVs)                                        │
│  ┌────────────────────────────────────┐                  │
│  │ Telemetry Agent (Python daemon)    │                  │
│  │ - Sensor health (is_alive, hz)     │                  │
│  │ - GPU/CPU temp and utilization     │                  │
│  │ - Recording status (bytes/sec)     │                  │
│  │ - GPS position (for map view)      │                  │
│  │ - CAN bus error counts             │                  │
│  │ Publish via: MQTT or HTTP POST     │                  │
│  └──────────────┬─────────────────────┘                  │
└─────────────────│────────────────────────────────────────┘
                  │ WiFi (when in garage) or 4G/5G (in field)
                  │ [Buffered if offline — flush on reconnect]
                  ▼
┌─────────────────────────────────────────────────────────┐
│  BACKEND (On-prem server or cloud)                      │
│                                                          │
│  ┌──────────────┐   ┌──────────────┐  ┌──────────────┐  │
│  │  MQTT Broker │→  │  Prometheus  │→ │   Grafana    │  │
│  │  (Mosquitto) │   │  (scrape     │  │  (dashboards │  │
│  │  or REST API │   │   or push    │  │   + alerts)  │  │
│  └──────────────┘   │   gateway)   │  └──────────────┘  │
│                     └──────────────┘                     │
│  ┌──────────────┐                                        │
│  │  PostgreSQL  │← Store: sessions, incidents, SLI data  │
│  └──────────────┘                                        │
│  ┌──────────────┐                                        │
│  │  PagerDuty   │← Alertmanager → on-call engineer       │
│  │  / Slack     │                                        │
│  └──────────────┘                                        │
└─────────────────────────────────────────────────────────┘</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Detalles críticos</div>
    <div class="plan-content">
      <h4>Lo que distingue una respuesta buena de una excelente</h4>
      <p><b>Conectividad intermitente:</b> El telemetry agent debe buffear datos en disco cuando no hay WiFi y enviarlos en batch al reconectarse. Un vehículo puede estar 2 horas sin conexión.<br><br>
      <b>Alertas útiles vs ruidosas:</b> <em>"An alert fires only when a sensor is offline for &gt;30 seconds, not on every dropped packet — otherwise engineers get alert fatigue and start ignoring them."</em><br><br>
      <b>Seguridad:</b> El tráfico de telemetría debe ir encriptado (TLS). Los DVs son propiedad intelectual de Wayve — los datos de posición y estado no deben filtrarse.<br><br>
      <b>Escalado:</b> <em>"For 20 vehicles, a single Prometheus instance is fine. At 200 vehicles, we'd shard by fleet or use Thanos for distributed Prometheus."</em></p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas sobre system design</div>
  <p class="notes-placeholder">Practica dibujando este diagrama en papel. En la entrevista dibujarás en whiteboard...</p>
</div>`,

'wayve-english-mock': `
<div class="plan-card">
  <div class="plan-card-title">🗣️ Mock Interview Completa en Inglés</div>
  <div class="plan-block">
    <div class="plan-time">Opening (primeros 5 min)</div>
    <div class="plan-content">
      <h4>Ellos dicen: "Tell me about yourself"</h4>
      <p><b>TÚ dices (memoriza esta versión):</b><br><br>
      <em>"Sure! I'm a software engineer specializing in automotive embedded systems and test automation. For the past [X] years I've been working in the automotive software validation space — specifically around CAN/LIN network testing, ECU validation, and building Python automation tooling for CI pipelines.</em><br><br>
      <em>What draws me to Wayve specifically is the intersection of embedded reliability and ML platform engineering. In my current work, I've been responsible for [triage of HIL bench failures / building pytest suites for automotive validators / CI pipeline debugging] — which I understand is exactly what this Platform Validation role needs.</em><br><br>
      <em>I'm excited to work in an AV 2.0 environment where sensor data quality has a direct impact on model performance, not just on test results."</em><br><br>
      <b>Duración objetivo: 90 segundos. No más.</b></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Q1 — Technical</div>
    <div class="plan-content">
      <h4>"How would you approach validating data from a development vehicle after a drive session?"</h4>
      <p><b>TÚ respondes:</b><br>
      <em>"I'd approach it in layers. First, structural validation — is the MCAP file complete, not truncated, and does it contain all the expected topics like camera streams, LIDAR, IMU, and GPS?</em><br><br>
      <em>Second, temporal validation — for each topic, are the timestamps monotonically increasing? Are there any gaps larger than two times the expected sampling period? A 30Hz camera that stops for 500ms is a red flag.</em><br><br>
      <em>Third, semantic validation — are the data values within physically plausible ranges? An IMU reporting 50G of acceleration didn't happen — that's sensor corruption. Is the GPS position consistent with the known route?</em><br><br>
      <em>I'd automate all of this in a Python script that produces a structured JSON report with PASS/FAIL per topic and a human-readable summary. That report would gate whether the data gets ingested to the training pipeline.</em><br><br>
      <em>What validation criteria are most important to your team currently?"</em></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Q2 — Triage</div>
    <div class="plan-content">
      <h4>"Describe how you would triage a failure in your CI pipeline that's blocking all merges"</h4>
      <p><b>TÚ respondes:</b><br>
      <em>"My first question is: is this deterministic or flaky? I'd run the failing job again without any code changes. If it passes, it's flaky infrastructure — I'd add a retry with a cap of 2 attempts, document it, and create a ticket to investigate the root cause separately so we don't block the team.</em><br><br>
      <em>If it fails consistently, I'd look at what changed. Git bisect or just checking what was merged in the last hour is usually enough. Then I'd look at the failure message itself — is it an assertion failure (code bug), a timeout (infra/resource issue), or a connection error (bench or external service issue)?</em><br><br>
      <em>If it's infra — I'd check bench availability, disk space, network connectivity to test targets. If it's a code regression, I'd identify the commit, revert it or mark it as a known failure, and unblock the pipeline. The key principle is: don't leave the team blocked while I investigate the root cause. Restore first, analyze second."</em></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Q3 — Behavioral</div>
    <div class="plan-content">
      <h4>"Tell me about a time you significantly improved the reliability of a system"</h4>
      <p><b>TÚ respondes (STAR):</b><br>
      <em>"Sure. At [empresa], our HIL test suite had a 35% flaky failure rate — nearly a third of runs failed for reasons unrelated to the code under test. This was causing the team to ignore CI results entirely, which is dangerous.</em><br><br>
      <em>[Task] I was asked to reduce flakiness below 5% within a quarter.</em><br><br>
      <em>[Action] I started by categorizing every failure over two weeks using a simple tagging system — bench connectivity, timeout, test ordering, or genuine code regression. That surfaced the top 3 causes: a CAN interface that would drop if not reset between tests, a shared test resource with no locking mechanism, and a timing assumption that broke on slower machines.</em><br><br>
      <em>I fixed each: added a teardown to explicitly reset the CAN interface, implemented a fixture-level resource lock, and replaced the sleep-based timing with condition polling with a timeout.</em><br><br>
      <em>[Result] Flakiness dropped from 35% to 3% in 6 weeks. The team started trusting CI again, and we caught 2 real regressions in the next month that previously would have been dismissed as 'just flaky'."</em></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Q4 — Coding live</div>
    <div class="plan-content">
      <h4>"Write a function to find the 3 most frequent errors in the last hour of a log file"</h4>
      <p><b>TÚ dices primero:</b><br>
      <em>"Let me clarify — by 'last hour' do you mean the last 3600 seconds from the current time, or from the last timestamp in the file? And what defines an 'error' — any line with 'ERROR' in it, or a specific format?"</em><br><br>
      Luego escribes (en voz alta):<br>
      <em>"I'll assume each log line has a Unix timestamp at the start and an error code. I'll use a Counter and filter by the time window."</em> → Escribe el código de la sección de coding challenges.<br><br>
      <em>"Let me trace through the example to verify… okay, that looks correct. Edge cases: if the log is empty, it returns an empty list. If there are fewer than 3 distinct errors, it returns all of them — Counter.most_common handles that gracefully."</em></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Closing</div>
    <div class="plan-content">
      <h4>Cómo cerrar la entrevista</h4>
      <p>Cuando digan <em>"Do you have any questions for us?"</em>, usa estas 3:<br><br>
      1. <em>"What does success look like for someone in this role at the 6-month mark? What problem would you most want them to have solved?"</em><br><br>
      2. <em>"You mentioned MCAP and the offload pipeline — how automated is the validation pipeline today, and where are the biggest pain points?"</em><br><br>
      3. <em>"Wayve's model iterates quickly — how does the frequency of model updates affect the bench workload and CI schedule?"</em><br><br>
      Y al final: <em>"Thank you for your time. I really enjoyed this conversation — the intersection of embedded reliability and ML data quality is exactly the kind of problem I want to work on, and it's clear Wayve is doing it at a level few companies match."</em></p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis respuestas personalizadas</div>
  <p class="notes-placeholder">Adapta las respuestas con tus experiencias reales. La estructura es el esqueleto, tus historias son la carne...</p>
</div>`,

'wayve-star-stories': `
<div class="plan-card">
  <div class="plan-card-title">⭐ 5 STAR Stories Pre-construidas para Wayve</div>
  <div class="plan-block">
    <div class="plan-time">Story 1 — CI Pipeline</div>
    <div class="plan-content">
      <h4>"Tell me about a time you improved CI reliability"</h4>
      <p><b>SITUATION:</b> Our HIL test suite had [X]% flaky failure rate. Engineers were ignoring CI results because they couldn't tell real failures from infrastructure noise.<br><br>
      <b>TASK:</b> Reduce flakiness to below 5% without removing any tests.<br><br>
      <b>ACTION:</b><br>
      • Tagged every failure for 2 weeks: bench connectivity / timeout / test order / real regression<br>
      • Found top 3 causes: CAN interface not reset between tests, shared resource race condition, sleep-based timing on slower machines<br>
      • Fixed: teardown fixture to reset CAN, resource lock in conftest, polling with timeout instead of sleep<br>
      • Added a flakiness dashboard in Grafana to track regression<br><br>
      <b>RESULT:</b> Flakiness dropped from [X]% to [Y]%. Team began trusting CI. Caught 2 real regressions in the following month that previously would have been dismissed.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Story 2 — Triage de bug difícil</div>
    <div class="plan-content">
      <h4>"Describe a complex debugging challenge you solved"</h4>
      <p><b>SITUATION:</b> A test that verified CAN message timing was failing intermittently — about 1 in 10 runs — on the HIL bench, but never locally.<br><br>
      <b>TASK:</b> Root-cause the intermittent failure without disrupting the team's CI.<br><br>
      <b>ACTION:</b><br>
      • Added verbose logging to the test to capture exact timestamps on each run<br>
      • After 20 runs, found the failure always correlated with a specific bench load pattern<br>
      • Discovered another test running in parallel was consuming CPU and causing scheduling jitter on the CAN driver<br>
      • Isolated by running the tests with different CPU affinities using <code>taskset</code><br>
      • Confirmed root cause: shared bench, no isolation between parallel test processes<br>
      • Fix: added pytest marks to run timing-sensitive tests exclusively (no parallel), documented in runbook<br><br>
      <b>RESULT:</b> Zero failures of that test in the 3 months since the fix. Also identified 4 other timing-sensitive tests with the same vulnerability.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Story 3 — Aprender rápido (para Wayve)</div>
    <div class="plan-content">
      <h4>"Tell me about a time you had to pick up context quickly in an ambiguous environment"</h4>
      <p><b>SITUATION:</b> Joined a project where I had to maintain and extend a sensor data validation system I had never seen before, with a 2-week handover window from the previous engineer.<br><br>
      <b>TASK:</b> Become productive enough to be on-call for sensor validation within the first month.<br><br>
      <b>ACTION:</b><br>
      • Day 1-3: Read all runbooks and post-mortems — these were the fastest way to understand failure modes<br>
      • Day 4-7: Shadowed every on-call incident, even small ones<br>
      • Day 8-14: Paired with the outgoing engineer on live incidents, writing down my understanding and confirming it<br>
      • Wrote a "what I understand" doc and asked the team to correct it — this surfaced 5 incorrect assumptions<br><br>
      <b>RESULT:</b> Was fully independent on-call by day 28. Caught a new failure mode (GPS dropout correlation with cellular interference) in week 5 that the previous engineer hadn't documented.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Story 4 — Colaboración / conflicto</div>
    <div class="plan-content">
      <h4>"Tell me about a conflict with a team member and how you resolved it"</h4>
      <p><b>SITUATION:</b> I disagreed with a firmware engineer about whether a test failure was a real ECU bug or an issue with our HIL bench configuration. They wanted to close the ticket as "bench issue"; I believed it was a real firmware regression based on log analysis.<br><br>
      <b>TASK:</b> Resolve the disagreement without damaging the relationship or letting a real bug reach production.<br><br>
      <b>ACTION:</b><br>
      • Instead of escalating, proposed a joint debugging session of 1 hour<br>
      • We replicated the exact same test on a second bench with different hardware<br>
      • Failure reproduced identically on the second bench — confirming it was software, not hardware<br>
      • I presented the evidence neutrally: "The bug reproduced on two independent benches with different serial numbers — that rules out HW"<br><br>
      <b>RESULT:</b> The firmware engineer agreed it was a software bug. Fixed it in 2 days. More importantly, we established a shared protocol: before closing a ticket as "bench issue", always reproduce on a second bench.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Story 5 — Impacto con datos</div>
    <div class="plan-content">
      <h4>"Tell me about a time your work had significant impact"</h4>
      <p><b>SITUATION:</b> Our Python test automation scripts were maintained by copying and modifying a growing set of bash scripts. Each new test added 3-4 hours of setup work. The team was spending 20% of sprint capacity on test maintenance.<br><br>
      <b>TASK:</b> Design a reusable test framework to reduce that overhead.<br><br>
      <b>ACTION:</b><br>
      • Audited all existing tests: found 80% shared the same 4 setup steps (connect to bench, configure CAN, run ECU reset, set diagnostic session)<br>
      • Created a pytest plugin with fixtures for each of those steps, configurable by YAML<br>
      • Migrated the top 20 most-used tests to the new framework as proof of concept<br>
      • Documented the framework with examples and ran a 1-hour workshop for the team<br><br>
      <b>RESULT:</b> Writing a new test dropped from 3-4 hours to 30 minutes. Test maintenance overhead dropped from 20% of sprint to under 5%. The framework was adopted by 2 other teams in the department within the quarter.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis historias reales</div>
  <p class="notes-placeholder">Adapta estas 5 historias con tus números y contexto reales. Los números hacen las historias creíbles...</p>
</div>`,

'wayve-vocab-english': `
<div class="plan-card">
  <div class="plan-card-title">🔤 Vocabulario Técnico en Inglés para la Entrevista</div>
  <div class="plan-block">
    <div class="plan-time">Términos de la JD</div>
    <div class="plan-content">
      <h4>Palabras que DEBES usar fluidamente</h4>
      <table class="ref-table">
        <thead><tr><th>Término</th><th>Cómo pronunciarlo</th><th>Cómo usarlo en oración</th></tr></thead>
        <tbody>
          <tr><td>flaky test</td><td>FLAY-ki test</td><td>"This test is flaky — it fails intermittently due to a race condition, not a real bug."</td></tr>
          <tr><td>bench (HIL bench)</td><td>bench</td><td>"The bench was unavailable for 2 hours due to a firmware update failure."</td></tr>
          <tr><td>offload</td><td>OFF-lode</td><td>"After the drive session, we offload the MCAP data via a 10G Ethernet connection."</td></tr>
          <tr><td>ingest</td><td>IN-jest</td><td>"Once validated, the data is ingested into our S3 bucket for training."</td></tr>
          <tr><td>triage</td><td>TREE-azh o TRY-ij</td><td>"My first step when a CI job fails is to triage it — deterministic bug or infrastructure noise?"</td></tr>
          <tr><td>runbook</td><td>RUN-book</td><td>"I documented the fix in the runbook so the next on-call engineer can resolve it in minutes."</td></tr>
          <tr><td>regression</td><td>reh-GRESH-un</td><td>"The nightly run caught a regression in the CAN parser introduced in yesterday's commit."</td></tr>
          <tr><td>throughput</td><td>THROO-put</td><td>"Our offload throughput is limited by the NVMe write speed on the vehicle."</td></tr>
          <tr><td>latency</td><td>LAY-ten-see</td><td>"End-to-end latency from sensor to actuator needs to be under 100ms for real-time control."</td></tr>
          <tr><td>on-call</td><td>on-call</td><td>"I was on-call rotation for the bench infrastructure — I handled 3-4 incidents per week."</td></tr>
          <tr><td>footprint</td><td>FOOT-print</td><td>"We reduced the test footprint on the bench by parallelizing independent tests."</td></tr>
          <tr><td>blameless post-mortem</td><td>BLAYM-les POST-mor-tem</td><td>"After the 4-hour outage, we ran a blameless post-mortem to find systemic fixes."</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Frases de transición</div>
    <div class="plan-content">
      <h4>Para cuando necesitas tiempo para pensar</h4>
      <p>• <em>"That's a great question. Let me think about that for a moment."</em><br>
      • <em>"Before I answer, can I ask a clarifying question?"</em><br>
      • <em>"My initial instinct is X, but let me think through the edge cases…"</em><br>
      • <em>"I haven't worked with that specific tool, but the equivalent I've used is [Y], and the concepts should transfer."</em><br>
      • <em>"In my experience, the pattern that works well here is…"</em><br>
      • <em>"I might be missing something, so feel free to push back, but my thinking is…"</em></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Números y métricas en inglés</div>
    <div class="plan-content">
      <h4>Cómo decir cifras técnicas</h4>
      <p>• <em>"35 percent flakiness"</em> (no "35 percento")<br>
      • <em>"under 30 milliseconds latency"</em><br>
      • <em>"a 10 gigabit Ethernet link"</em><br>
      • <em>"roughly one terabyte per hour of recording"</em><br>
      • <em>"we reduced triage time from 4 hours to under 30 minutes"</em><br>
      • <em>"the bench has 99.2% availability over the last quarter"</em><br>
      • <em>"we process about 50 drive sessions per week, each around 2 hours"</em></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Preguntas que te harán en inglés</div>
    <div class="plan-content">
      <h4>Con traducción y respuesta corta de referencia</h4>
      <p>• <em>"Walk me through how you'd approach this problem."</em> → Descríbeme paso a paso tu enfoque. Responde: "Sure, I'd start by…"<br>
      • <em>"What's your biggest weakness?"</em> → Responde con algo real pero con crecimiento: "I tend to over-document early on — I now focus on capturing the minimum viable runbook and expanding it based on what actually comes up."<br>
      • <em>"Why Wayve specifically?"</em> → "The AV 2.0 approach is genuinely different — validation here means ensuring data quality for a learning system, not just coverage of hand-written rules. That's a harder and more interesting problem."<br>
      • <em>"Are you comfortable working in a fast-moving environment?"</em> → "Absolutely — I actually prefer it. In a fast-moving environment, the infra and tooling work I do has immediate, visible impact. If I improve triage time today, the team benefits tomorrow."</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis frases favoritas para practicar</div>
  <p class="notes-placeholder">Lee estas frases en voz alta 3 veces antes de la entrevista. La fluidez viene de la repetición oral, no de leerlas...</p>
</div>`,

'wayve-checklist': `
<div class="alert-card">
  ✅ <strong>Todo lo que debes dominar antes del martes 14 de julio.</strong> Marca cada item a medida que lo estudias. Prioridad 🔴 = pregunta segura · 🟡 = probable · 🟢 = bonus si lo mencionas.
</div>

<!-- ── BLOQUE 1: EMPRESA ─────────────────────────────── -->
<div class="plan-card">
  <div class="plan-card-title">🏢 EMPRESA — Historia & Contexto</div>
  <div class="check-list">
    <div class="check-item"><input type="checkbox" id="c1"><label for="c1">🔴 <b>Qué hace Wayve</b> — conducción autónoma ML-first (no rule-based)<small>Frase: "Wayve uses end-to-end deep learning instead of hand-coded rules"</small></label></div>
    <div class="check-item"><input type="checkbox" id="c2"><label for="c2">🔴 <b>AV 1.0 vs AV 2.0</b> — la diferencia y por qué Wayve es AV 2.0<small>Saber: modular rule-based vs end-to-end learned model</small></label></div>
    <div class="check-item"><input type="checkbox" id="c3"><label for="c3">🔴 <b>LINGO</b> — su foundation model, qué es, por qué importa para tu rol<small>Key: bad sensor data → bad training data → bad LINGO model → unsafe car</small></label></div>
    <div class="check-item"><input type="checkbox" id="c4"><label for="c4">🟡 <b>Funding</b> — Series C $1.05B, mayo 2024. Inversores: SoftBank, NVIDIA, Microsoft</small></label></div>
    <div class="check-item"><input type="checkbox" id="c5"><label for="c5">🟡 <b>Socios comerciales</b> — Uber (ride-hailing UK), Asda (delivery autónomo)</small></label></div>
    <div class="check-item"><input type="checkbox" id="c6"><label for="c6">🟢 <b>Fundadores</b> — Amar Shah (CEO), Alex Kendall (Chief Scientist)</small></label></div>
    <div class="check-item"><input type="checkbox" id="c7"><label for="c7">🟢 <b>Regulación UK</b> — safety driver obligatorio (DVSA), testing en Londres/Cambridge</small></label></div>
  </div>
</div>

<!-- ── BLOQUE 2: JD ──────────────────────────────────── -->
<div class="plan-card" style="margin-top:12px">
  <div class="plan-card-title">📋 JOB DESCRIPTION — Cada requisito</div>
  <div class="check-list">
    <div class="check-item"><input type="checkbox" id="d1"><label for="d1">🔴 <b>HIL / SIL / MIL</b> — puedes explicar los 3, sus diferencias y cuándo triageas en cada nivel<small>Script: "I've maintained HIL benches and triaged failures end-to-end"</small></label></div>
    <div class="check-item"><input type="checkbox" id="d2"><label for="d2">🔴 <b>Python</b> — type hints, dataclasses, pytest fixtures, collections module, file I/O<small>Coding challenge será en Python — sin IDE, en voz alta</small></label></div>
    <div class="check-item"><input type="checkbox" id="d3"><label for="d3">🔴 <b>CI/CD</b> — puedes describir un pipeline de 5 stages y cómo debuggeas cada uno<small>Know: cuál stage = qué tipo de fallo (setup=infra, flash=HW, test=FW o flaky)</small></label></div>
    <div class="check-item"><input type="checkbox" id="d4"><label for="d4">🔴 <b>Linux</b> — journalctl, dmesg, ps aux, ssh, systemctl, df, iostat, tcpdump<small>Saber: cómo SSH al HPC del vehículo y ver logs de sensores en tiempo real</small></label></div>
    <div class="check-item"><input type="checkbox" id="d5"><label for="d5">🔴 <b>MCAP</b> — qué es, por qué lo usan, cómo leerlo en Python (mcap.reader)<small>Si no lo has usado: "I studied it before this interview and wrote validation scripts"</small></label></div>
    <div class="check-item"><input type="checkbox" id="d6"><label for="d6">🔴 <b>Triage metodología</b> — árbol de decisión de 4 pasos de memoria<small>1. Reproducible? 2. SIL pasa? 3. Otro bench? 4. Commit reciente?</small></label></div>
    <div class="check-item"><input type="checkbox" id="d7"><label for="d7">🟡 <b>C/C++</b> — "I can read and debug C firmware when needed" (no tienes que escribirlo)<small>Nice to have — no te preocupes si no tienes experiencia profunda</small></label></div>
    <div class="check-item"><input type="checkbox" id="d8"><label for="d8">🟡 <b>Observability</b> — Prometheus + Grafana stack, SLI/SLO, runbooks<small>Mencionar: "I've built Grafana dashboards for CI pipeline health"</small></label></div>
  </div>
</div>

<!-- ── BLOQUE 3: TÉCNICO AV ──────────────────────────── -->
<div class="plan-card" style="margin-top:12px">
  <div class="plan-card-title">🔬 TÉCNICO AV — Plataforma</div>
  <div class="check-list">
    <div class="check-item"><input type="checkbox" id="t1"><label for="t1">🔴 <b>Development vehicle stack</b> — cámaras (30 Hz), LIDAR (10 Hz), RADAR (20 Hz), IMU (200 Hz), GPS, CAN<small>Saber: ~2 TB/hora por vehículo</small></label></div>
    <div class="check-item"><input type="checkbox" id="t2"><label for="t2">🔴 <b>Data pipeline</b> — Record → Offload → Validate → Ingest → Train<small>Saber qué falla en cada paso y cómo detectarlo</small></label></div>
    <div class="check-item"><input type="checkbox" id="t3"><label for="t3">🔴 <b>MCAP validation 5 dimensiones</b> — Completitud · Frecuencia · Timing · Integridad · Ingesta<small>Saber el código Python de validación de memoria</small></label></div>
    <div class="check-item"><input type="checkbox" id="t4"><label for="t4">🟡 <b>HIL bench setup</b> — dSPACE o NI, self-hosted CI runner, flash via JTAG/USB<small>Know: por qué self-hosted runners para HIL y no GitHub-hosted</small></label></div>
    <div class="check-item"><input type="checkbox" id="t5"><label for="t5">🟡 <b>PTP time sync</b> — IEEE 1588, ptp4l, chronyc — por qué importa para sensor fusion<small>Saber: timestamps mal sincronizados = datos de entrenamiento corruptos</small></label></div>
    <div class="check-item"><input type="checkbox" id="t6"><label for="t6">🟡 <b>Linux debug commands</b> — journalctl, dmesg, nvidia-smi, iostat, tcpdump, sensors<small>Practica estos comandos en una terminal real</small></label></div>
    <div class="check-item"><input type="checkbox" id="t7"><label for="t7">🟢 <b>NVIDIA Drive AGX Orin</b> — compute platform del vehículo, 254 TOPS<small>Nice to know — demuestra que sabes del HW específico de AV</small></label></div>
  </div>
</div>

<!-- ── BLOQUE 4: CODING ──────────────────────────────── -->
<div class="plan-card" style="margin-top:12px">
  <div class="plan-card-title">💻 CODING — Challenges & Algoritmos</div>
  <div class="check-list">
    <div class="check-item"><input type="checkbox" id="co1"><label for="co1">🔴 <b>Gap detection en sensor streams</b> — find_sensor_gaps con Two Pointers / GroupBy<small>El challenge más probable. Practica escribirlo en 15 min sin ver la solución</small></label></div>
    <div class="check-item"><input type="checkbox" id="co2"><label for="co2">🔴 <b>Sliding Window</b> — ventana fija y variable, complejidad O(n)<small>Template de memoria: expand si cumple condición, shrink si no</small></label></div>
    <div class="check-item"><input type="checkbox" id="co3"><label for="co3">🔴 <b>HashMap / Counter</b> — top-K errores, deduplicación de eventos<small>collections.Counter.most_common(k) — saber de memoria</small></label></div>
    <div class="check-item"><input type="checkbox" id="co4"><label for="co4">🔴 <b>Hablar mientras código</b> — explicar el approach ANTES de escribir, mencionar complejidad<small>Frase: "My first thought is X with time complexity O(n) because..."</small></label></div>
    <div class="check-item"><input type="checkbox" id="co5"><label for="co5">🟡 <b>Merge Intervals</b> — sort por start, iterar con max del end<small>Ordenar primero, luego una sola pasada: O(n log n)</small></label></div>
    <div class="check-item"><input type="checkbox" id="co6"><label for="co6">🟡 <b>Binary Search</b> — bisect_left para timestamps, implementación manual<small>Saber: bisect.bisect_left(arr, target) → índice del primer elemento >= target</small></label></div>
    <div class="check-item"><input type="checkbox" id="co7"><label for="co7">🟡 <b>BFS / DFS</b> — grafos de dependencias CI, componentes conectados<small>BFS con deque, DFS con set de visitados</small></label></div>
    <div class="check-item"><input type="checkbox" id="co8"><label for="co8">🟢 <b>Topological Sort (Kahn)</b> — orden de ejecución de tests con dependencias<small>In-degree map + queue de nodos con in-degree 0</small></label></div>
    <div class="check-item"><input type="checkbox" id="co9"><label for="co9">🟢 <b>LRU Cache con OrderedDict</b> — implementación O(1) get/put<small>Raramente preguntan esto, pero demuestra nivel senior</small></label></div>
  </div>
</div>

<!-- ── BLOQUE 5: SYSTEM DESIGN ───────────────────────── -->
<div class="plan-card" style="margin-top:12px">
  <div class="plan-card-title">🏗️ SYSTEM DESIGN</div>
  <div class="check-list">
    <div class="check-item"><input type="checkbox" id="sd1"><label for="sd1">🔴 <b>Framework de 5 pasos</b> — Clarify · Scale estimates · High-level · Deep dive · Trade-offs<small>Practica en voz alta: "Before I start designing, let me ask..."</small></label></div>
    <div class="check-item"><input type="checkbox" id="sd2"><label for="sd2">🔴 <b>Scale estimates de memoria</b> — 2 TB/hora, 160 TB/día para 20 vehículos<small>Decirlos espontáneamente demuestra que piensas en producción</small></label></div>
    <div class="check-item"><input type="checkbox" id="sd3"><label for="sd3">🔴 <b>Data validation pipeline design</b> — Offload → Queue → Workers → DB → Dashboard<small>El diseño más probable. Dibújalo en papel antes de la entrevista</small></label></div>
    <div class="check-item"><input type="checkbox" id="sd4"><label for="sd4">🟡 <b>Fleet monitoring design</b> — MQTT/HTTP → Prometheus → Grafana + PagerDuty<small>Vehicle telemetry con connectivity intermitente — buffer en disco</small></label></div>
    <div class="check-item"><input type="checkbox" id="sd5"><label for="sd5">🟡 <b>Trade-offs clave</b> — validación completa vs sampling, latencia vs throughput<small>Siempre termina con: "The trade-off here is X for Y"</small></label></div>
  </div>
</div>

<!-- ── BLOQUE 6: ENTREVISTA ──────────────────────────── -->
<div class="plan-card" style="margin-top:12px">
  <div class="plan-card-title">🎯 ENTREVISTA — Práctica y frases</div>
  <div class="check-list">
    <div class="check-item"><input type="checkbox" id="e1"><label for="e1">🔴 <b>Tu "Tell me about yourself" en inglés</b> — ≤90 seg, con mención a Wayve al final<small>Lee el script de la sección Mock Interview y memorízalo</small></label></div>
    <div class="check-item"><input type="checkbox" id="e2"><label for="e2">🔴 <b>Historia STAR de CI reliability</b> — con números reales (% de flakiness reducido)<small>La pregunta de behavioral más probable. Tienes que saber el % de memoria</small></label></div>
    <div class="check-item"><input type="checkbox" id="e3"><label for="e3">🔴 <b>Historia STAR de debugging difícil</b> — con pasos de triage claros<small>Segunda pregunta de behavioral más probable</small></label></div>
    <div class="check-item"><input type="checkbox" id="e4"><label for="e4">🔴 <b>3 preguntas al entrevistador memorizadas</b> — sobre el trabajo real, no sobre beneficios<small>Primera: "What would success look like in the first 6 months?"</small></label></div>
    <div class="check-item"><input type="checkbox" id="e5"><label for="e5">🟡 <b>Vocabulario técnico clave</b> — flaky · bench · offload · ingest · triage · runbook · SLO<small>Úsalos naturalmente, no los traduzcas al español</small></label></div>
    <div class="check-item"><input type="checkbox" id="e6"><label for="e6">🟡 <b>Historia STAR de aprender rápido</b> — tecnología nueva, timeline corto<small>El JD dice "pick up context quickly in ambiguous environments"</small></label></div>
    <div class="check-item"><input type="checkbox" id="e7"><label for="e7">🟢 <b>Mock interview completa en voz alta</b> — cronometra 45 min, grábate si puedes<small>Hablar en inglés sobre temas técnicos requiere práctica, no solo lectura</small></label></div>
  </div>
</div>

<!-- ── PROGRESO VISUAL ───────────────────────────────── -->
<div class="plan-card" style="margin-top:12px; border-left-color: #22C55E;">
  <div class="plan-card-title" style="color:#16A34A;">📊 Mi progreso — cuenta los checks</div>
  <div class="plan-block">
    <div class="plan-time" style="color:#16A34A;">0-10 ✓</div>
    <div class="plan-content"><h4>Inicio — hay mucho por revisar</h4><p>Empieza por los 🔴 de Empresa y JD. Son los más preguntados y los más rápidos de aprender.</p></div>
  </div>
  <div class="plan-block">
    <div class="plan-time" style="color:#D97706;">11-20 ✓</div>
    <div class="plan-content"><h4>En camino — base técnica cubierta</h4><p>Asegura que todos los 🔴 de Coding estén marcados. Sin eso, el challenge puede bloquear la entrevista.</p></div>
  </div>
  <div class="plan-block">
    <div class="plan-time" style="color:#2563EB;">21-30 ✓</div>
    <div class="plan-content"><h4>Preparado — listo para la entrevista</h4><p>Todos los 🔴 marcados = estás preparado. Los 🟡 te darán ventaja. Los 🟢 son bonus.</p></div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas de repaso</div>
  <p class="notes-placeholder">Anota aquí los temas donde te sientes menos seguro para priorizarlos en los días que quedan...</p>
</div>`,

'wayve-entrevistador': `
<div class="plan-card">
  <div class="plan-card-title">❓ Preguntas que TÚ haces al entrevistador — con propósito estratégico</div>
  <div class="plan-block">
    <div class="plan-time">Stack técnico<br><span class="priority-tag p-alta">Usar</span></div>
    <div class="plan-content">
      <h4>"¿Qué herramientas usan actualmente para HIL y cuántos benches tienen?"</h4>
      <p>Muestra conocimiento técnico real. Revela si usan dSPACE, NI, o tooling propio. También da contexto del escala del trabajo.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Métricas<br><span class="priority-tag p-alta">Usar</span></div>
    <div class="plan-content">
      <h4>"¿Cuál es el tiempo promedio actual de triage de un fallo en el pipeline?"</h4>
      <p>El JD dice que el éxito se mide en reducir esto. Hacer esta pregunta demuestra que leíste y entendiste los success criteria, no solo el título del puesto.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Impacto<br><span class="priority-tag p-alta">Usar</span></div>
    <div class="plan-content">
      <h4>"¿Cuál sería el primer problema concreto que resolvería alguien en este rol?"</h4>
      <p>Pregunta de alto impacto. Revela qué está realmente roto y dónde puedes agregar valor inmediato. También sirve para prepararte si te contratan.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Equipo</div>
    <div class="plan-content">
      <h4>"¿Cómo es la colaboración entre Platform Validation y el equipo de firmware?"</h4>
      <p>Entender dónde terminan tus responsabilidades y empiezan las de los demás. Importante para saber si hay fricción entre equipos.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Datos</div>
    <div class="plan-content">
      <h4>"¿Qué volumen de datos MCAP procesan por día y cómo está estructurado el pipeline de ingesta?"</h4>
      <p>Demuestra que conoces MCAP y entiendes la escala del problema. Revela complejidad técnica real.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Futuro</div>
    <div class="plan-content">
      <h4>"¿Hay posibilidad de que el engagement se convierta en posición full-time?"</h4>
      <p>Solo si te interesa. Preguntarlo muestra interés a largo plazo, no solo en hacer el trabajo y salir.</p>
    </div>
  </div>
</div>
<div class="alert-card" style="margin-top:12px">
  💡 <strong>Tip:</strong> Elige máximo 3 preguntas. Hazlas al final cuando te digan "¿tienes preguntas?". La primera pregunta siempre debe ser sobre el trabajo/problema real, no sobre beneficios o compensación.
</div>`,

'wayve-hil-sil-mil': `
<div class="plan-card">
  <div class="plan-card-title">🔬 HIL / SIL / MIL — Para la entrevista Wayve</div>

  <div class="plan-block">
    <div class="plan-time">MIL<br>Model-in-the-Loop</div>
    <div class="plan-content">
      <h4>Prueba el modelo matemático (Simulink)</h4>
      <p>Todo corre en PC. El modelo de control se prueba contra una simulación de la planta. Muy rápido, muy barato. Detecta errores de lógica de control antes de generar código.</p>
      <div class="p-chips"><span class="p-chip">Simulink</span><span class="p-chip">Más rápido</span><span class="p-chip">Sin código C</span><span class="p-chip">Errores de diseño</span></div>
    </div>
  </div>

  <div class="plan-block">
    <div class="plan-time">SIL<br>Software-in-the-Loop</div>
    <div class="plan-content">
      <h4>Prueba el código generado en PC</h4>
      <p>Se genera código C/C++ del modelo. Ese código se ejecuta en PC (no en ECU). La planta sigue siendo simulada. Detecta errores de generación de código y comportamiento numérico.</p>
      <div class="p-chips"><span class="p-chip">Código C generado</span><span class="p-chip">En PC</span><span class="p-chip">Sin HW real</span><span class="p-chip">Fácil de debuggear</span></div>
    </div>
  </div>

  <div class="plan-block">
    <div class="plan-time">HIL<br>Hardware-in-the-Loop</div>
    <div class="plan-content">
      <h4>Prueba en hardware real con entorno simulado</h4>
      <p>La ECU real ejecuta el firmware. La planta (motor, sensores, actuadores) es simulada en tiempo real (dSPACE, NI). Es el nivel más caro y lento, pero el más representativo. Detecta: timing, interrupciones, problemas de HW específico.</p>
      <div class="p-chips"><span class="p-chip">ECU real</span><span class="p-chip">dSPACE</span><span class="p-chip">Tiempo real</span><span class="p-chip">Más costoso</span><span class="p-chip">Más realista</span></div>
    </div>
  </div>
</div>

<div class="plan-card">
  <div class="plan-card-title">🔍 Triage de fallos — cómo diferenciarlos en Wayve</div>

  <div class="plan-block">
    <div class="plan-time">Fallo en HIL<br>¿Es HW o SW?</div>
    <div class="plan-content">
      <h4>Pasos de triage</h4>
      <p><b>1.</b> ¿Es reproducible consistentemente? No → sospecha bench HW o infra.<br>
      <b>2.</b> Corre el mismo test en SIL. ¿Falla también? Sí → firmware defect. No → HW-specific issue.<br>
      <b>3.</b> ¿Falla en otra placa del mismo modelo? No → problema de esa placa específica (bench HW).<br>
      <b>4.</b> ¿Coincide con un cambio reciente en el firmware? Sí → bisect el commit.</p>
    </div>
  </div>

  <div class="plan-block">
    <div class="plan-time">Fallo en CI<br>¿Es tooling?</div>
    <div class="plan-content">
      <h4>Cuando el pipeline falla pero el código está bien</h4>
      <p>Señales de problema de tooling/infra: fallo intermitente, solo en un runner específico, errores de timeout o conexión, falla en step de setup no en step de test. Solución: retry automático + alerta + runbook.</p>
    </div>
  </div>
</div>

<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis experiencias con HIL/SIL/MIL</div>
  <p class="notes-placeholder">Escribe aquí ejemplos reales de tu experiencia para contarlos en la entrevista...</p>
</div>`,

'wayve-mcap': `
<div class="plan-card">
  <div class="plan-card-title">📦 MCAP — Qué es y por qué importa en Wayve</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es?</div>
    <div class="plan-content">
      <h4>Contenedor open-source para datos de robots y vehículos autónomos</h4>
      <p>MCAP (.mcap) es un formato de archivo diseñado para almacenar streams de datos de sensores con timestamps precisos. Creado por Foxglove, es el sucesor moderno de ROS2 bags. Wayve lo usa para guardar los datos de sus development vehicles.</p>
      <div class="p-chips"><span class="p-chip">Open source</span><span class="p-chip">foxglove.dev</span><span class="p-chip">Reemplaza ROS2 bags</span><span class="p-chip">Compresión</span></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">¿Qué guarda?</div>
    <div class="plan-content">
      <h4>Streams de sensores con timestamps nanosegundo</h4>
      <p>Cámara (imágenes), LIDAR (nube de puntos), IMU (aceleración/giroscopio), GPS, CAN bus data. Cada mensaje tiene: timestamp, topic (canal), schema (formato del mensaje).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">¿Cómo se usa?</div>
    <div class="plan-content">
      <h4>CLI + Python SDK + Foxglove Studio</h4>
      <p><code>mcap info archivo.mcap</code> — resumen del archivo.<br>
      <code>mcap filter --topics /camera/front</code> — filtrar topics.<br>
      Python: <code>from mcap.reader import make_reader</code><br>
      Foxglove Studio: visualización gráfica de todos los sensores.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Validación</div>
    <div class="plan-content">
      <h4>Qué validar en datos MCAP (para el rol)</h4>
      <p>✓ Completitud: ¿todos los topics esperados están presentes?<br>
      ✓ Frecuencia: ¿la cámara llega a 30fps, el LIDAR a 10Hz?<br>
      ✓ Gaps: ¿hay saltos en timestamps > umbral?<br>
      ✓ Integridad: ¿mensajes corruptos o mal formateados?<br>
      ✓ Ingest: ¿el archivo se subió/procesó correctamente al pipeline?</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas sobre MCAP</div>
  <p class="notes-placeholder">Si puedes, descarga mcap CLI y pruébalo antes de la entrevista: https://mcap.dev/docs/cli</p>
</div>`,

'wayve-sensor': `
<div class="tab-group-sensor">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ws-1','sensor')">Tipos de datos</button>
    <button class="tab-btn" onclick="switchTab(this,'ws-2','sensor')">Qué validar</button>
    <button class="tab-btn" onclick="switchTab(this,'ws-3','sensor')">Código Python</button>
    <button class="tab-btn" onclick="switchTab(this,'ws-4','sensor')">Problemas comunes</button>
  </div>

  <div id="ws-1" class="tab-panel active">
    <table class="kv-table amber">
      <tr><th>Sensor</th><th>Frecuencia típica</th><th>Formato</th><th>Qué valida</th></tr>
      <tr><td>Cámara frontal</td><td>20–30 Hz</td><td>CompressedImage / H264</td><td>FPS, resolución, exposición, timestamp sync</td></tr>
      <tr><td>LIDAR</td><td>10 Hz</td><td>PointCloud2</td><td>Puntos por scan, intensidad, rango, rotación completa</td></tr>
      <tr><td>RADAR</td><td>13–20 Hz</td><td>RadarScan</td><td>Detecciones, doppler, RCS</td></tr>
      <tr><td>IMU</td><td>100–200 Hz</td><td>Imu message</td><td>Aceleración, giroscopio, covarianza</td></tr>
      <tr><td>GPS/GNSS</td><td>10 Hz</td><td>NavSatFix</td><td>Fix type, HDOP, satélites, coordenadas</td></tr>
      <tr><td>CAN Bus</td><td>Variable por señal</td><td>MCAP CAN frames</td><td>Cycle time, DLC, checksum</td></tr>
    </table>
    <div class="alert-card">
      💡 En Wayve cada sensor tiene un <b>topic</b> en MCAP. El pipeline espera que todos los topics estén presentes y sincronizados temporalmente dentro de tolerancias definidas.
    </div>
  </div>

  <div id="ws-2" class="tab-panel">
    <div class="plan-card">
      <div class="plan-card-title">5 dimensiones de validación</div>
      <div class="plan-block">
        <div class="plan-time">1. Completitud</div>
        <div class="plan-content"><h4>¿Están todos los topics esperados?</h4><p>Verificar que el archivo MCAP contiene todos los canales requeridos. Un sensor que se desconectó en el recorrido deja el topic vacío o ausente.</p><div class="p-chips"><span class="p-chip">topic_count == expected</span><span class="p-chip">message_count > 0</span></div></div>
      </div>
      <div class="plan-block">
        <div class="plan-time">2. Frecuencia</div>
        <div class="plan-content"><h4>¿Los mensajes llegan a la frecuencia esperada?</h4><p>Calcular Hz real vs Hz esperado. Una cámara a 30Hz que llega a 8Hz indica un problema de driver, buffering o ancho de banda.</p><div class="p-chips"><span class="p-chip">actual_hz = msg_count / duration</span><span class="p-chip">tolerance: ±10%</span></div></div>
      </div>
      <div class="plan-block">
        <div class="plan-time">3. Timing</div>
        <div class="plan-content"><h4>¿Los timestamps son correctos y consistentes?</h4><p>Detectar: timestamps negativos, saltos, mensajes desordenados, deriva de reloj. Crítico para sensor fusion.</p><div class="p-chips"><span class="p-chip">t[i+1] > t[i]</span><span class="p-chip">gaps < threshold</span><span class="p-chip">clock drift</span></div></div>
      </div>
      <div class="plan-block">
        <div class="plan-time">4. Integridad</div>
        <div class="plan-content"><h4>¿Los datos tienen valores válidos?</h4><p>NaN en campos numéricos, valores fuera de rango físico (velocidad -999, temperatura 9999°C), checksum failures en CAN.</p></div>
      </div>
      <div class="plan-block">
        <div class="plan-time">5. Ingesta</div>
        <div class="plan-content"><h4>¿El archivo se procesó correctamente en el pipeline?</h4><p>Verificar que el offload (copia del vehículo al server) fue completo. File size vs expected, hash/checksum del archivo, metadatos de la sesión.</p></div>
      </div>
    </div>
  </div>

  <div id="ws-3" class="tab-panel">
<div class="code-block">
  <div class="code-lang">Python — Validación básica de MCAP</div>
  <pre><span class="c-kw">from</span> mcap.reader <span class="c-kw">import</span> make_reader
<span class="c-kw">from</span> collections <span class="c-kw">import</span> defaultdict
<span class="c-kw">import</span> dataclasses

<span class="c-dc">@dataclasses.dataclass</span>
<span class="c-kw">class</span> <span class="c-fn">TopicStats</span>:
    count: <span class="c-bi">int</span> = <span class="c-nb">0</span>
    first_ts: <span class="c-bi">float</span> = <span class="c-kw">None</span>
    last_ts:  <span class="c-bi">float</span> = <span class="c-kw">None</span>
    gaps: <span class="c-bi">list</span> = dataclasses.field(default_factory=<span class="c-bi">list</span>)

<span class="c-kw">def</span> <span class="c-fn">validate_mcap</span>(path: str, expected_topics: <span class="c-bi">dict</span>) -&gt; <span class="c-bi">dict</span>:
    <span class="c-cm">"""
    expected_topics = {"/camera/front": {"min_hz": 25, "max_hz": 35}}
    Devuelve: {"ok": [...], "warn": [...], "error": [...]}
    """</span>
    stats = defaultdict(TopicStats)
    issues = {<span class="c-st">"ok"</span>: [], <span class="c-st">"warn"</span>: [], <span class="c-st">"error"</span>: []}

    <span class="c-kw">with</span> <span class="c-bi">open</span>(path, <span class="c-st">"rb"</span>) <span class="c-kw">as</span> f:
        reader = make_reader(f)
        prev_ts = {}

        <span class="c-kw">for</span> schema, channel, message <span class="c-kw">in</span> reader.iter_messages():
            topic = channel.topic
            ts = message.log_time / <span class="c-nb">1e9</span>  <span class="c-cm"># nanosec → seg</span>
            s = stats[topic]
            s.count += <span class="c-nb">1</span>
            <span class="c-kw">if</span> s.first_ts <span class="c-kw">is None</span>: s.first_ts = ts
            s.last_ts = ts

            <span class="c-kw">if</span> topic <span class="c-kw">in</span> prev_ts:
                gap = ts - prev_ts[topic]
                <span class="c-kw">if</span> gap &gt; <span class="c-nb">0.5</span>:  <span class="c-cm"># gap > 500ms</span>
                    s.gaps.append(gap)
            prev_ts[topic] = ts

    <span class="c-cm"># Validar contra expected</span>
    <span class="c-kw">for</span> topic, cfg <span class="c-kw">in</span> expected_topics.items():
        <span class="c-kw">if</span> topic <span class="c-kw">not in</span> stats:
            issues[<span class="c-st">"error"</span>].append(<span class="c-bi">f</span><span class="c-st">"MISSING topic: {topic}"</span>)
            <span class="c-kw">continue</span>
        s = stats[topic]
        duration = s.last_ts - s.first_ts
        hz = s.count / duration <span class="c-kw">if</span> duration &gt; <span class="c-nb">0</span> <span class="c-kw">else</span> <span class="c-nb">0</span>
        <span class="c-kw">if not</span> (cfg[<span class="c-st">"min_hz"</span>] &lt;= hz &lt;= cfg[<span class="c-st">"max_hz"</span>]):
            issues[<span class="c-st">"warn"</span>].append(<span class="c-bi">f</span><span class="c-st">"{topic}: {hz:.1f}Hz (expected {cfg['min_hz']}-{cfg['max_hz']}Hz)"</span>)
        <span class="c-kw">elif</span> s.gaps:
            issues[<span class="c-st">"warn"</span>].append(<span class="c-bi">f</span><span class="c-st">"{topic}: {len(s.gaps)} gaps detected"</span>)
        <span class="c-kw">else</span>:
            issues[<span class="c-st">"ok"</span>].append(topic)

    <span class="c-kw">return</span> issues</pre>
</div>

<div class="code-block">
  <div class="code-lang">Python — pytest para validación de MCAP</div>
  <pre><span class="c-cm"># conftest.py</span>
<span class="c-kw">import</span> pytest
<span class="c-kw">from</span> pathlib <span class="c-kw">import</span> Path

REQUIRED_TOPICS = {
    <span class="c-st">"/camera/front"</span>:   {<span class="c-st">"min_hz"</span>: <span class="c-nb">25</span>, <span class="c-st">"max_hz"</span>: <span class="c-nb">35</span>},
    <span class="c-st">"/lidar/points"</span>:   {<span class="c-st">"min_hz"</span>: <span class="c-nb">8</span>,  <span class="c-st">"max_hz"</span>: <span class="c-nb">12</span>},
    <span class="c-st">"/imu/data"</span>:       {<span class="c-st">"min_hz"</span>: <span class="c-nb">90</span>, <span class="c-st">"max_hz"</span>: <span class="c-nb">110</span>},
}

<span class="c-dc">@pytest.fixture</span>(scope=<span class="c-st">"session"</span>)
<span class="c-kw">def</span> <span class="c-fn">mcap_files</span>(tmp_path_factory):
    <span class="c-kw">return</span> <span class="c-bi">list</span>(Path(<span class="c-st">"test_data/"</span>).glob(<span class="c-st">"*.mcap"</span>))

<span class="c-cm"># test_sensor_data.py</span>
<span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"topic,cfg"</span>, REQUIRED_TOPICS.items())
<span class="c-kw">def</span> <span class="c-fn">test_topic_frequency</span>(mcap_files, topic, cfg):
    <span class="c-kw">for</span> mcap_path <span class="c-kw">in</span> mcap_files:
        result = validate_mcap(mcap_path, {topic: cfg})
        <span class="c-kw">assert</span> topic <span class="c-kw">not in</span> result[<span class="c-st">"error"</span>], <span class="c-bi">f</span><span class="c-st">"Missing in {mcap_path.name}"</span>
        <span class="c-kw">assert not</span> result[<span class="c-st">"warn"</span>], <span class="c-bi">f</span><span class="c-st">"Warnings: {result['warn']}"</span></pre>
</div>
  </div>

  <div id="ws-4" class="tab-panel">
    <table class="kv-table amber">
      <tr><th>Problema</th><th>Síntoma</th><th>Causa probable</th><th>Cómo detectarlo</th></tr>
      <tr><td>Topic faltante</td><td>Canal ausente en MCAP</td><td>Sensor desconectado / driver crash</td><td>Comparar topics vs lista esperada</td></tr>
      <tr><td>Frecuencia baja</td><td>Hz < min esperado</td><td>CPU saturada / ancho de banda insuficiente</td><td>msg_count / duración</td></tr>
      <tr><td>Timestamps desordenados</td><td>t[i+1] < t[i]</td><td>Bug en driver, reordenamiento en buffer</td><td>Iterar y comparar ts consecutivos</td></tr>
      <tr><td>Gap grande</td><td>Silencio > 500ms</td><td>Reinicio de sensor, pérdida de conexión</td><td>Diferencia entre mensajes consecutivos</td></tr>
      <tr><td>Archivo incompleto</td><td>Size < esperado / checksum fail</td><td>Offload interrumpido</td><td>File size + SHA256 hash vs manifiesto</td></tr>
      <tr><td>NaN / valores inválidos</td><td>Campos con NaN o fuera de rango</td><td>Sensor no calibrado / fallo de HW</td><td>Verificar campos numéricos en muestra</td></tr>
    </table>
  </div>
</div>

<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí experiencias propias con validación de datos de sensores...</p>
</div>`,

'wayve-triage': `
<div class="tab-group-triage">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'wt-1','triage')">Metodología</button>
    <button class="tab-btn" onclick="switchTab(this,'wt-2','triage')">Decision Tree</button>
    <button class="tab-btn" onclick="switchTab(this,'wt-3','triage')">Patrones</button>
    <button class="tab-btn" onclick="switchTab(this,'wt-4','triage')">Plantilla</button>
    <button class="tab-btn" onclick="switchTab(this,'wt-5','triage')">Escenarios reales</button>
    <button class="tab-btn" onclick="switchTab(this,'wt-6','triage')">English phrases</button>
  </div>

  <div id="wt-1" class="tab-panel active">
    <div class="plan-card">
      <div class="plan-card-title">5 pasos — de fallo a root cause</div>
      <div class="dtree">
        <div class="dtree-step">
          <div class="dtree-num">1</div>
          <div class="dtree-body"><h5>Reproducir</h5><p>¿El fallo ocurre consistentemente o es intermitente? Corre el test 3 veces. Si siempre falla → determinista (probable SW/FW). Si falla 1/3 → sospecha infra o HW.</p></div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num">2</div>
          <div class="dtree-body"><h5>Aislar el ambiente</h5><p>Corre el mismo test en SIL (sin HW). Si falla igual → bug de firmware o lógica. Si pasa → el problema es específico del HW real.</p></div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num warn">3</div>
          <div class="dtree-body"><h5>Aislar el HW</h5><p>Si falló solo en HIL: cambia el bench HW (otra placa, otro cable, otro adaptador). Si el nuevo HW pasa → placa defectuosa. Si sigue fallando → driver o configuración.</p></div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num warn">4</div>
          <div class="dtree-body"><h5>Bisect temporal</h5><p>¿Cuándo empezó a fallar? Usa git bisect o compara con el último build verde. El commit que lo introduce es el culpable.</p></div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num ok">5</div>
          <div class="dtree-body"><h5>Documentar y escalar</h5><p>Escribe el root cause, los pasos de reproducción, la plataforma afectada, y el ticket. Si es HW → plataforma team. Si es FW → dev team. Si es tooling → tú lo arreglas.</p></div>
        </div>
      </div>
    </div>
  </div>

  <div id="wt-2" class="tab-panel">
    <div class="plan-card">
      <div class="plan-card-title">¿Es HW, SW o Tooling? — árbol de decisión</div>
      <div class="dtree">
        <div class="dtree-step">
          <div class="dtree-num">?</div>
          <div class="dtree-body"><h5>¿El fallo es reproducible 100% de las veces?</h5>
          <p><span class="no">NO →</span> Probable Tooling/Infra (flaky). Investiga: timeout, red, recursos del runner.<br>
          <span class="yes">SÍ →</span> Sigue al siguiente paso.</p></div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num">?</div>
          <div class="dtree-body"><h5>¿Falla también en SIL (sin HW físico)?</h5>
          <p><span class="yes">SÍ →</span> Bug de firmware o lógica de SW. → Escalar a dev team.<br>
          <span class="no">NO →</span> El problema es específico del hardware. Sigue.</p></div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num">?</div>
          <div class="dtree-body"><h5>¿Falla en otro bench con el mismo modelo de HW?</h5>
          <p><span class="yes">SÍ →</span> Problema de modelo de HW o driver. → Escalar a plataforma.<br>
          <span class="no">NO →</span> Bench específico defectuoso. → Reparar/reemplazar esa placa.</p></div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num">?</div>
          <div class="dtree-body"><h5>¿El fallo coincide con un cambio reciente?</h5>
          <p><span class="yes">SÍ →</span> Regresión. Git bisect para encontrar commit culpable.<br>
          <span class="no">NO →</span> Puede ser desgaste de HW, condición ambiental, o bug latente.</p></div>
        </div>
      </div>
    </div>
  </div>

  <div id="wt-3" class="tab-panel">
    <table class="kv-table amber">
      <tr><th>Patrón del fallo</th><th>Clasificación</th><th>Acción</th></tr>
      <tr><td>Falla siempre en el mismo step, mismo mensaje de error</td><td><span class="badge badge-red">Firmware bug</span></td><td>Reportar con logs + bisect</td></tr>
      <tr><td>Falla 1 de cada 3-5 veces, sin patrón</td><td><span class="badge badge-ylw">Tooling/Infra</span></td><td>Agregar retry, investigar recursos</td></tr>
      <tr><td>Falla solo en bench específico, pasa en otros</td><td><span class="badge badge-red">Bench HW</span></td><td>Swap de placa, verificar cables</td></tr>
      <tr><td>Falla después de X horas de uptime</td><td><span class="badge badge-ylw">Memory leak / Thermal</span></td><td>Profiling de memoria, temp monitoring</td></tr>
      <tr><td>Falla en HIL pero pasa en SIL</td><td><span class="badge badge-red">HW-specific</span></td><td>Revisar driver, timing, interrupciones</td></tr>
      <tr><td>Falla después de un deploy nuevo</td><td><span class="badge badge-red">Regresión SW</span></td><td>Git bisect, rollback temporal</td></tr>
      <tr><td>Falla solo en horario específico (noche/madrugada)</td><td><span class="badge badge-ylw">Infra / Scheduling</span></td><td>Revisar cron jobs, recursos compartidos</td></tr>
      <tr><td>Timeout en step de setup, no en el test en sí</td><td><span class="badge badge-ylw">Tooling</span></td><td>Revisar conectividad, bench disponibilidad</td></tr>
    </table>
  </div>

  <div id="wt-4" class="tab-panel">
    <div class="plan-card">
      <div class="plan-card-title">📝 Plantilla de triage report</div>
      <div class="plan-block">
        <div class="plan-time">Usar siempre</div>
        <div class="plan-content">
          <h4>Estructura del reporte de triage</h4>
          <div class="check-list">
            <div class="check-item"><input type="checkbox" id="tri1"><label for="tri1"><b>Título:</b> [COMPONENTE] Descripción del fallo en una línea<small>Ej: [CAN Driver] Timeout al enviar mensaje 0x123 en bench A3</small></label></div>
            <div class="check-item"><input type="checkbox" id="tri2"><label for="tri2"><b>Reproducibilidad:</b> X/Y veces + condiciones exactas<small>Ej: 3/3 veces, solo en HIL, solo después de 10 min de uptime</small></label></div>
            <div class="check-item"><input type="checkbox" id="tri3"><label for="tri3"><b>Plataformas afectadas:</b> Lista de benches/configuraciones<small>Ej: Bench A3 (HW rev 2.1), Bench B1 (HW rev 2.1) — Bench C2 (rev 2.2) pasa</small></label></div>
            <div class="check-item"><input type="checkbox" id="tri4"><label for="tri4"><b>Primer build fallido:</b> Commit/tag + fecha<small>Ej: commit abc1234, 2024-07-08 — build anterior (abc1230) pasaba</small></label></div>
            <div class="check-item"><input type="checkbox" id="tri5"><label for="tri5"><b>Logs relevantes:</b> Extracto del error + stack trace</label></div>
            <div class="check-item"><input type="checkbox" id="tri6"><label for="tri6"><b>Clasificación:</b> HW / FW / Tooling / Infra + justificación</label></div>
            <div class="check-item"><input type="checkbox" id="tri7"><label for="tri7"><b>Owner sugerido:</b> Equipo que debe resolver + urgencia</label></div>
            <div class="check-item"><input type="checkbox" id="tri8"><label for="tri8"><b>Workaround temporal:</b> Si existe, para no bloquear el pipeline</label></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ════ TAB 5: ESCENARIOS REALES ════ -->
  <div id="wt-5" class="tab-panel">
    <div class="plan-card">
      <div class="plan-card-title">📋 Escenario A — LIDAR deja de grabar a mitad de sesión</div>
      <div class="plan-block">
        <div class="plan-time">Síntoma</div>
        <div class="plan-content"><h4>MCAP validation reporta gap de 45 minutos en /lidar/points</h4><p>La sesión dura 2 horas. Los primeros 75 minutos el LIDAR graba a 10 Hz perfecto. De repente, gap de 45 minutos, y luego vuelve con datos.</p></div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Investigación</div>
        <div class="plan-content">
          <h4>Pasos exactos</h4>
          <p>1. Verifico el log del sistema en el HPC durante ese período: <code>journalctl --since "14:30" --until "15:15"</code><br>
          2. Encuentro: <code>ERROR: lidar_driver: connection lost to 192.168.11.100 — retry 1/5</code><br>
          3. Verifico si la IP del LIDAR respondía: <code>ping -c 3 192.168.11.100</code> → sin respuesta en ese período<br>
          4. Reviso temperatura del LIDAR: el sensor se sobrecalentó a 75°C y se reinició automáticamente<br>
          5. El driver tenía lógica de reconexión pero tardaba 45 minutos por un timeout mal configurado</p>
        </div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Root cause + fix</div>
        <div class="plan-content"><h4>Thermal throttling del LIDAR + timeout excesivo en el driver</h4><p><b>Inmediato:</b> Marcar la sesión como "sensor_gap_lidar" en el sistema, no ingestar para training esos 45 minutos.<br><b>Corto plazo:</b> Reducir timeout de reconexión de 45 minutos a 30 segundos en el driver.<br><b>Largo plazo:</b> Añadir monitoreo de temperatura del LIDAR al dashboard de telemetría del vehículo.</p></div>
      </div>
    </div>

    <div class="plan-card" style="margin-top:12px">
      <div class="plan-card-title">📋 Escenario B — CI falla solo en el runner de noche</div>
      <div class="plan-block">
        <div class="plan-time">Síntoma</div>
        <div class="plan-content"><h4>test_can_timing falla 8/10 veces en el build de las 2am, pero 0/10 en el de las 10am</h4><p>El test verifica que los mensajes CAN se envían dentro de ±5ms del ciclo esperado.</p></div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Investigación</div>
        <div class="plan-content">
          <h4>Hipótesis y verificación</h4>
          <p>1. <b>Primer pensamiento:</b> Temperatura (nocturna más fría → ¿afecta oscilador del bench?).<br>
          2. Reviso el runner del build nocturno: es el mismo servidor que corre los backups de las 2am.<br>
          3. <code>iostat -x 1 60</code> durante el backup muestra: 98% disk I/O → el servidor está saturado.<br>
          4. El test usa <code>time.sleep(0.1)</code> para timing → la precisión depende del scheduler del OS.<br>
          5. Con el servidor saturado, los sleeps duran 150-200ms en vez de 100ms → el test falla.</p>
        </div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Root cause + fix</div>
        <div class="plan-content"><h4>Recurso compartido: runner de CI + job de backup en el mismo servidor</h4><p><b>Inmediato:</b> Mover el backup a las 4am o a un servidor diferente.<br><b>Fix del test:</b> Reemplazar <code>time.sleep(0.1)</code> con polling del event flag con timeout → no depende de precisión del scheduler.<br><b>CI:</b> Agregar label <code>timing-sensitive</code> al job y forzar que corra solo en el runner dedicado al bench.</p></div>
      </div>
    </div>

    <div class="plan-card" style="margin-top:12px">
      <div class="plan-card-title">📋 Escenario C — Todos los benches fallan en flash después de deploy</div>
      <div class="plan-block">
        <div class="plan-time">Síntoma</div>
        <div class="plan-content"><h4>Post-deploy de firmware v2.4.1, 100% de los benches fallan en Stage 3 (Flash)</h4><p>Error: <code>Flash verification failed: checksum mismatch at address 0x8000000</code></p></div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Investigación</div>
        <div class="plan-content">
          <h4>Cuando todos los benches fallan → no es HW</h4>
          <p>1. <b>Clasifiación inmediata:</b> Si todos los benches fallan a la vez después de un deploy → 99% es el firmware o el proceso de flash, no HW.<br>
          2. Comparo el binario de v2.4.1 con v2.4.0: el tamaño del archivo es diferente en 1 byte.<br>
          3. Reviso el pipeline de build: en el paso de linking, una nueva opción de optimización (<code>-Os</code>) cambió el alignment de las secciones.<br>
          4. El flash script tenía la dirección hardcodeada a 0x8000000 pero el nuevo binario espera 0x8000100 (diferente según el linker script).<br>
          5. <b>Rollback inmediato</b> a v2.4.0 → benches funcionales en 5 minutos.</p>
        </div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Root cause + fix</div>
        <div class="plan-content"><h4>Flash script con dirección hardcodeada + cambio de linker script no comunicado</h4><p><b>Fix del proceso:</b> El flash script debe leer la dirección del linker script automáticamente, no hardcodearla.<br><b>Proceso:</b> Cualquier cambio al linker script debe incluir actualización al flash script en el mismo PR.<br><b>Smoke test:</b> Agregar al CI un test que verifique el tamaño y checksum del binario contra el linker script antes de intentar el flash.</p></div>
      </div>
    </div>
  </div>

  <!-- ════ TAB 6: ENGLISH PHRASES ════ -->
  <div id="wt-6" class="tab-panel">
    <div class="plan-card">
      <div class="plan-card-title">🗣️ Cómo hablar de triage en inglés — frases exactas</div>
      <div class="plan-block">
        <div class="plan-time">Abriendo</div>
        <div class="plan-content">
          <h4>Cuando te pregunten sobre tu proceso de triage</h4>
          <p><em>"My triage process starts with a single question: is this deterministic or flaky? I never spend more than 5 minutes on a flaky failure before adding retry logic and moving on — that's the fastest way to unblock the team. For deterministic failures, I follow a systematic isolation approach: first reproduce it in a clean environment, then narrow down whether it's firmware, hardware, or infrastructure."</em></p>
        </div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Describir el árbol de decisión</div>
        <div class="plan-content">
          <h4>Walking through your decision tree</h4>
          <p><em>"When I see a HIL failure, my first step is to reproduce it in SIL — software-in-the-loop, without real hardware. If it fails in SIL, I know it's a firmware bug and I escalate to the dev team immediately with the full log. If it passes in SIL, the problem is hardware-specific, so I swap to a different bench of the same model. If the second bench also fails, it's a driver or model-level issue. If it passes, the original bench has a hardware defect."</em></p>
        </div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Comunicar el resultado</div>
        <div class="plan-content">
          <h4>How to present your finding</h4>
          <p><em>"After triaging, I always provide three things: the root cause in one sentence, the reproduction steps so someone else can verify it, and my recommended owner — because escalating to the right team is part of triage. If I can't determine the owner, I say that explicitly rather than guessing."</em></p>
        </div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Preguntas de seguimiento</div>
        <div class="plan-content">
          <h4>Likely follow-up questions and short answers</h4>
          <p><b>"What if you can't reproduce it?"</b><br>
          <em>"Then I add verbose logging, increase the run count to 20, and look for statistical patterns — does it fail more on certain benches? At certain times of day? Under certain system load? If I still can't reproduce it after 20 runs, I mark it as suspected-flaky and document my investigation."</em><br><br>
          <b>"How do you balance triage speed vs thoroughness?"</b><br>
          <em>"Speed first, always. My goal is to unblock the pipeline within 30 minutes. A 30-minute investigation that correctly classifies the failure as firmware vs hardware is worth more than a 4-hour deep dive. Thorough root-cause analysis happens in a dedicated ticket, not on the critical path."</em></p>
        </div>
      </div>
    </div>

    <div class="quiz-section" style="margin-top:16px">
      <div class="quiz-title">5 preguntas de triage — responde en inglés</div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">EN</span>"A test fails 1 in 4 runs with no clear pattern. What do you do first?"<span class="q-arr">▶</span></div>
        <div class="quiz-a"><em>"I classify it as potentially flaky and add a retry with a cap of 2 attempts. That unblocks the pipeline immediately. Then I investigate in parallel: I check whether it fails on specific runners, whether shared resources are involved, and whether there are timing dependencies. I document everything in a ticket and track the failure rate over the next 20 runs."</em></div>
      </div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">EN</span>"The test passes in SIL but fails in HIL. How do you proceed?"<span class="q-arr">▶</span></div>
        <div class="quiz-a"><em>"That tells me the failure is hardware-specific — the firmware logic is correct. My next step is to swap the bench — run on a different bench of the same hardware model. If the second bench passes, the original bench has a hardware defect. If it fails too, it's a driver issue or a hardware model issue, and I escalate to the platform team with logs from both benches."</em></div>
      </div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">EN</span>"All benches are failing after a firmware deploy. What's your first thought?"<span class="q-arr">▶</span></div>
        <div class="quiz-a"><em>"When all benches fail simultaneously right after a deploy, it's almost certainly the firmware or the tooling, not the hardware — hardware doesn't fail in sync. I immediately compare the new binary to the previous version, check the build pipeline for any changes, and consider a rollback to unblock the team while I investigate. Speed matters here: rollback first, root cause second."</em></div>
      </div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">EN</span>"How do you prevent the same triage issue from happening again?"<span class="q-arr">▶</span></div>
        <div class="quiz-a"><em>"I write a runbook for every new failure pattern I triage. The runbook has: how to recognize the failure in the logs, the classification, the steps to resolve it, and who to escalate to. After 3 months, the runbook covers 80% of failures and the next on-call engineer can resolve them in 10 minutes instead of 2 hours."</em></div>
      </div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">EN</span>"How do you communicate a triage finding to the team?"<span class="q-arr">▶</span></div>
        <div class="quiz-a"><em>"I use a standard format: one-line title with the component and failure type, reproducibility data, affected platforms, the first failing build, a snippet of the relevant log, my classification and reasoning, and the recommended owner with priority. I post it in the relevant Slack channel and create a ticket in the same message — so people can see the context and the action item in one place."</em></div>
      </div>
    </div>
  </div>
</div>

<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas de triage</div>
  <p class="notes-placeholder">Agrega aquí ejemplos reales de triages que hayas hecho con sus root causes...</p>
</div>`,

'wayve-ci': `
<div class="tab-group-ci">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'wci-1','ci')">Anatomía del pipeline</button>
    <button class="tab-btn" onclick="switchTab(this,'wci-2','ci')">Leer logs</button>
    <button class="tab-btn" onclick="switchTab(this,'wci-3','ci')">Automatización</button>
    <button class="tab-btn" onclick="switchTab(this,'wci-4','ci')">Runbook</button>
    <button class="tab-btn" onclick="switchTab(this,'wci-5','ci')">Dashboard KPIs</button>
    <button class="tab-btn" onclick="switchTab(this,'wci-6','ci')">GitHub Actions AV</button>
    <button class="tab-btn" onclick="switchTab(this,'wci-7','ci')">English — CI debug</button>
  </div>

  <div id="wci-1" class="tab-panel active">
    <div class="pipeline-diagram">
<span class="p-gray">┌─ Trigger ──────────────────────────────────────────────────────────┐</span>
<span class="p-blue">  git push / PR / schedule / manual</span>
<span class="p-gray">└────────────────────────────────────────────────────────────────────┘</span>
           <span class="p-gray">↓</span>
<span class="p-gray">┌─ Stage 1: Setup & Checkout ────────────────────────────────────────┐</span>
<span class="p-green">  git clone, selección de runner, carga de variables de entorno</span>
<span class="p-amber">  ⚠ Fallos aquí: runner sin recursos, credenciales expiradas</span>
<span class="p-gray">└────────────────────────────────────────────────────────────────────┘</span>
           <span class="p-gray">↓</span>
<span class="p-gray">┌─ Stage 2: Build / Compile ─────────────────────────────────────────┐</span>
<span class="p-green">  compilar firmware C/C++, generar binarios, artefactos</span>
<span class="p-amber">  ⚠ Fallos aquí: errores de compilación = bug de código</span>
<span class="p-gray">└────────────────────────────────────────────────────────────────────┘</span>
           <span class="p-gray">↓</span>
<span class="p-gray">┌─ Stage 3: Flash & Setup HW ────────────────────────────────────────┐</span>
<span class="p-green">  flashear firmware al bench, inicializar conexiones HW</span>
<span class="p-red">  🔴 Fallos aquí: HW no disponible, flash timeout, bench ocupado</span>
<span class="p-gray">└────────────────────────────────────────────────────────────────────┘</span>
           <span class="p-gray">↓</span>
<span class="p-gray">┌─ Stage 4: Test Execution ──────────────────────────────────────────┐</span>
<span class="p-green">  pytest / unittest, HIL/SIL tests, sensor validation</span>
<span class="p-red">  🔴 Fallos aquí: firmware bug, HW defecto, flaky test</span>
<span class="p-gray">└────────────────────────────────────────────────────────────────────┘</span>
           <span class="p-gray">↓</span>
<span class="p-gray">┌─ Stage 5: Report & Cleanup ────────────────────────────────────────┐</span>
<span class="p-green">  JUnit XML, coverage HTML, liberar bench HW, notificaciones</span>
<span class="p-gray">└────────────────────────────────────────────────────────────────────┘</span>
    </div>
    <div class="alert-card">💡 <strong>Key insight:</strong> El stage donde falla te da la primera pista de la categoría: Setup=Infra, Build=Código, Flash=HW/Tooling, Test=Firmware o Flaky, Report=Tooling.</div>
  </div>

  <div id="wci-2" class="tab-panel">
    <div class="plan-card">
      <div class="plan-card-title">Cómo leer logs de CI eficientemente</div>
      <div class="plan-block">
        <div class="plan-time">Paso 1</div>
        <div class="plan-content"><h4>Ve directo al primer ERROR o FAILED</h4><p>No leas de arriba a abajo. Busca el primer error con <code>Ctrl+F: ERROR</code> o <code>FAILED</code>. El resto es contexto.</p></div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Paso 2</div>
        <div class="plan-content"><h4>Lee hacia atrás desde el error</h4><p>El error suele ser consecuencia. La causa está 5-20 líneas antes. Busca el "WARNING" o la acción fallida.</p></div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Paso 3</div>
        <div class="plan-content"><h4>Identifica el stage del fallo</h4><p>¿En qué step del pipeline falló? (Setup, Build, Flash, Test). Esto clasifica el problema inmediatamente.</p></div>
      </div>
    </div>
<div class="code-block">
  <div class="code-lang">Bash — Comandos para analizar logs en Linux</div>
  <pre><span class="c-cm"># Buscar todos los errores en un log</span>
grep -n <span class="c-st">"ERROR\|FAILED\|Exception"</span> pipeline.log

<span class="c-cm"># Contexto alrededor de cada error (5 líneas antes y después)</span>
grep -n -B5 -A5 <span class="c-st">"FAILED"</span> pipeline.log

<span class="c-cm"># Contar tipos de error</span>
grep <span class="c-st">"ERROR"</span> pipeline.log | awk <span class="c-st">'{print $NF}'</span> | sort | uniq -c | sort -rn

<span class="c-cm"># Ver log en tiempo real (CI corriendo)</span>
tail -f /var/log/jenkins/build.log

<span class="c-cm"># Buscar en múltiples logs cuándo empezó a fallar</span>
grep -l <span class="c-st">"FAILED: test_sensor"</span> builds/*/log.txt | head -5

<span class="c-cm"># Extraer timestamps de fallos para análisis</span>
grep <span class="c-st">"FAILED"</span> pipeline.log | awk <span class="c-st">'{print $1, $2}'</span></pre>
</div>
  </div>

  <div id="wci-3" class="tab-panel">
<div class="code-block">
  <div class="code-lang">Python — Script de triage automático de CI</div>
  <pre><span class="c-kw">import</span> re, json
<span class="c-kw">from</span> collections <span class="c-kw">import</span> Counter, defaultdict
<span class="c-kw">from</span> pathlib <span class="c-kw">import</span> Path
<span class="c-kw">from</span> dataclasses <span class="c-kw">import</span> dataclass, field
<span class="c-kw">from</span> typing <span class="c-kw">import</span> List

<span class="c-dc">@dataclass</span>
<span class="c-kw">class</span> <span class="c-fn">FailureReport</span>:
    test_name: str
    category: str        <span class="c-cm"># FIRMWARE | HW | TOOLING | UNKNOWN</span>
    occurrences: <span class="c-bi">int</span>
    first_seen: str
    pattern: str

CATEGORY_PATTERNS = {
    <span class="c-st">"TOOLING"</span>:  [<span class="c-st">r"timeout"</span>, <span class="c-st">r"connection refused"</span>, <span class="c-st">r"resource unavailable"</span>],
    <span class="c-st">"HW"</span>:       [<span class="c-st">r"flash failed"</span>, <span class="c-st">r"bench not responding"</span>, <span class="c-st">r"JTAG error"</span>],
    <span class="c-st">"FIRMWARE"</span>: [<span class="c-st">r"assertion failed"</span>, <span class="c-st">r"segfault"</span>, <span class="c-st">r"ASSERT"</span>, <span class="c-st">r"stack overflow"</span>],
}

<span class="c-kw">def</span> <span class="c-fn">classify_failure</span>(log_snippet: str) -&gt; str:
    log_lower = log_snippet.lower()
    <span class="c-kw">for</span> category, patterns <span class="c-kw">in</span> CATEGORY_PATTERNS.items():
        <span class="c-kw">if any</span>(re.search(p, log_lower) <span class="c-kw">for</span> p <span class="c-kw">in</span> patterns):
            <span class="c-kw">return</span> category
    <span class="c-kw">return</span> <span class="c-st">"UNKNOWN"</span>

<span class="c-kw">def</span> <span class="c-fn">analyze_builds</span>(log_dir: str) -&gt; <span class="c-bi">dict</span>:
    failures = defaultdict(<span class="c-bi">list</span>)
    <span class="c-kw">for</span> log_file <span class="c-kw">in</span> Path(log_dir).glob(<span class="c-st">"*.log"</span>):
        content = log_file.read_text()
        <span class="c-kw">for</span> match <span class="c-kw">in</span> re.finditer(<span class="c-st">r"FAILED: (\w+)"</span>, content):
            test = match.group(<span class="c-nb">1</span>)
            category = classify_failure(content[match.start()-<span class="c-nb">200</span>:match.end()+<span class="c-nb">200</span>])
            failures[test].append({<span class="c-st">"file"</span>: log_file.name, <span class="c-st">"category"</span>: category})
    <span class="c-kw">return</span> {t: v <span class="c-kw">for</span> t, v <span class="c-kw">in</span> failures.items() <span class="c-kw">if</span> <span class="c-bi">len</span>(v) &gt;= <span class="c-nb">3</span>}  <span class="c-cm"># recurrentes</span></pre>
</div>
  </div>

  <div id="wci-4" class="tab-panel">
    <div class="plan-card">
      <div class="plan-card-title">📋 Runbook template — para cada tipo de fallo</div>
      <div class="plan-block">
        <div class="plan-time">Estructura</div>
        <div class="plan-content">
          <h4>Cada runbook debe tener exactamente esto</h4>
          <div class="check-list">
            <div class="check-item"><input type="checkbox" id="rb1"><label for="rb1"><b>Nombre del fallo:</b> identificador único legible<small>Ej: HIL_BENCH_FLASH_TIMEOUT</small></label></div>
            <div class="check-item"><input type="checkbox" id="rb2"><label for="rb2"><b>Señales de detección:</b> cómo reconocer este fallo en el log<small>Ej: "ERROR: Flash timeout after 30s" en Stage 3</small></label></div>
            <div class="check-item"><input type="checkbox" id="rb3"><label for="rb3"><b>Categoría:</b> HW / FW / Tooling / Infra</label></div>
            <div class="check-item"><input type="checkbox" id="rb4"><label for="rb4"><b>Frecuencia histórica:</b> X veces en los últimos Y días</label></div>
            <div class="check-item"><input type="checkbox" id="rb5"><label for="rb5"><b>Pasos de resolución:</b> numerados, con comandos exactos<small>1. Verificar si bench responde: ping bench-a3. 2. Reiniciar power supply: ...</small></label></div>
            <div class="check-item"><input type="checkbox" id="rb6"><label for="rb6"><b>Workaround:</b> si el fallo no se puede resolver inmediatamente</label></div>
            <div class="check-item"><input type="checkbox" id="rb7"><label for="rb7"><b>Escalation:</b> a quién escalar y cuándo</label></div>
            <div class="check-item"><input type="checkbox" id="rb8"><label for="rb8"><b>Tiempo de resolución esperado:</b> para SLA</label></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="wci-5" class="tab-panel">
    <div class="two-col">
      <div class="info-card">
        <h5>📊 KPIs del pipeline (métricas clave)</h5>
        <ul>
          <li><b>Mean Time to Triage (MTTT)</b> — el JD quiere reducirlo</li>
          <li><b>Pipeline pass rate</b> — % builds que pasan por semana</li>
          <li><b>Flaky test rate</b> — % tests no deterministas</li>
          <li><b>Bench utilization</b> — % tiempo que el bench está en uso</li>
          <li><b>Mean Time to Recovery</b> — cuánto tarda un bench caído en volver</li>
          <li class="warn"><b>False negative rate</b> — tests que pasan pero tienen bugs</li>
        </ul>
      </div>
      <div class="info-card">
        <h5>🖥️ Dashboard ideal para Wayve</h5>
        <ul>
          <li><b>Vista en tiempo real:</b> qué builds están corriendo</li>
          <li><b>Top 10 tests más flaky</b> esta semana</li>
          <li><b>Mapa de benches:</b> verde/amarillo/rojo por disponibilidad</li>
          <li><b>Tendencia de pass rate</b> últimas 2 semanas</li>
          <li><b>Alertas activas</b> con owner y tiempo abierto</li>
          <li class="warn"><b>Comparativa por plataforma HW</b> (¿qué bench falla más?)</li>
        </ul>
      </div>
    </div>
    <div class="alert-card">💡 Menciona <strong>Grafana</strong> para el dashboard + <strong>Prometheus</strong> para las métricas si te preguntan por herramientas. Son el stack estándar en empresas como Wayve.</div>
  </div>

  <!-- ════ TAB 6: GITHUB ACTIONS AV ════ -->
  <div id="wci-6" class="tab-panel">
<div class="code-block"><div class="code-lang">YAML — CI pipeline completo para AV platform validation</div><pre>
name: AV Platform CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
  schedule:
    - cron: '0 2 * * *'    # nightly build at 2am

jobs:
  # ── STAGE 1: Static analysis (no HW needed) ────────────────────
  static-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with: { python-version: "3.11" }
      - run: pip install flake8 mypy pytest-cov
      - run: flake8 src/ --max-line-length=100
      - run: mypy src/ --ignore-missing-imports

  # ── STAGE 2: Unit tests (no HW needed) ─────────────────────────
  unit-tests:
    needs: static-analysis
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with: { python-version: "3.11" }
      - run: pip install -r requirements.txt
      - run: pytest tests/unit/ -v --cov=src --cov-report=xml -m "not hil"
      - uses: codecov/codecov-action@v3
        with: { files: coverage.xml }

  # ── STAGE 3: HIL tests (requiere bench físico) ─────────────────
  hil-tests:
    needs: unit-tests
    runs-on: [self-hosted, bench-a1]   # runner en el bench HIL
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt
      - name: Reset bench to clean state
        run: python scripts/bench_reset.py --bench bench-a1
      - name: Run HIL test suite
        run: pytest tests/hil/ -v -m hil --bench bench-a1 --junitxml=hil-results.xml
        continue-on-error: false
      - name: Collect bench logs on failure
        if: failure()
        run: python scripts/collect_bench_logs.py --bench bench-a1 --output logs/
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: hil-results
          path: |
            hil-results.xml
            logs/

  # ── STAGE 4: MCAP validation (nightly only) ────────────────────
  sensor-validation:
    needs: unit-tests
    if: github.event_name == 'schedule'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt mcap
      - name: Validate latest drive session MCAP
        run: python scripts/validate_mcap.py --dir /mnt/sessions/latest/
      - name: Upload validation report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: mcap-validation-report
          path: validation_report.json</pre></div>

    <div class="plan-card" style="margin-top:16px">
      <div class="plan-card-title">💡 Decisiones de diseño importantes en este pipeline</div>
      <div class="plan-block">
        <div class="plan-time">Self-hosted runners</div>
        <div class="plan-content"><h4>¿Por qué self-hosted para HIL?</h4><p>Los benches HIL son hardware físico en tu oficina. GitHub-hosted runners son máquinas en la nube de Microsoft — no tienen acceso físico a tu bench de CAN/ECU. <code>runs-on: [self-hosted, bench-a1]</code> dirige el job exactamente al runner instalado en el servidor junto al bench A1. Esto es una decisión arquitectural crítica en CI para plataformas embebidas.</p></div>
      </div>
      <div class="plan-block">
        <div class="plan-time">continue-on-error: false</div>
        <div class="plan-content"><h4>¿Por qué explícito en HIL?</h4><p>En un fallo de HIL quieres que el pipeline PARE y notifique. Un fallo en HIL puede significar firmware con bugs que no debería llegar al vehículo real. Dejarlo pasar sería un riesgo de seguridad.</p></div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Collect logs on failure</div>
        <div class="plan-content"><h4>Siempre recopilar evidencia al fallar</h4><p><code>if: failure()</code> garantiza que aunque el test falle, los logs del bench se guardan. Sin esto, el estado del bench se pierde en el próximo reset y el triage se vuelve imposible.</p></div>
      </div>
    </div>
  </div>

  <!-- ════ TAB 7: ENGLISH ════ -->
  <div id="wci-7" class="tab-panel">
    <div class="plan-card">
      <div class="plan-card-title">🗣️ Cómo hablar de CI/CD debugging en inglés</div>
      <div class="plan-block">
        <div class="plan-time">Abriendo</div>
        <div class="plan-content">
          <p><em>"Our CI pipeline for embedded platform validation has multiple stages: static analysis, unit tests that run without hardware, and HIL tests that run on physical benches. The challenge I've spent the most time on is the HIL stage — bench availability, flaky connectivity, and distinguishing bench hardware failures from firmware regressions."</em></p>
        </div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Flaky tests</div>
        <div class="plan-content">
          <p><em>"Our flaky test rate was around 30% when I joined. The root cause was three things: shared bench resources with no locking, sleep-based timing assumptions that broke under load, and a CAN interface that needed an explicit reset between tests. After fixing those, we got to under 5%. The key insight was that flakiness isn't random — it always has a root cause, you just need enough data to find it."</em></p>
        </div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Pipeline ownership</div>
        <div class="plan-content">
          <p><em>"I think the most important thing about CI in an embedded context is ownership. If nobody owns the pipeline health, it degrades slowly and engineers stop trusting it — which is worse than having no CI at all. I was the owner for our HIL pipeline: I tracked the pass rate weekly, investigated any drop above 5%, and made sure the flaky test rate stayed below our SLO."</em></p>
        </div>
      </div>
    </div>

    <div class="quiz-section" style="margin-top:16px">
      <div class="quiz-title">Preguntas de CI — responde en inglés</div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">EN</span>"How would you reduce the flaky test rate in a HIL pipeline?"<span class="q-arr">▶</span></div>
        <div class="quiz-a"><em>"First, measure: I'd track every failure for 2 weeks, tagging each as bench-connectivity, resource-contention, timing, or genuine failure. That surfaces the top 3 causes — in my experience it's usually a shared resource without locking, sleep-based timing, or a sensor that needs an explicit teardown. Fix the top 3 and flakiness typically drops by 70%."</em></div>
      </div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">EN</span>"The CI pipeline is blocking all merges. What do you do?"<span class="q-arr">▶</span></div>
        <div class="quiz-a"><em>"First question: is this a new failure or did it start after a recent change? If it started after a commit, I revert or skip that commit and restore the pipeline — unblocking the team is priority one. Then I investigate the root cause in a separate branch. If it's infrastructure, I fix it and re-run. I never leave the main pipeline blocked while doing a deep investigation."</em></div>
      </div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">EN</span>"How do you manage bench scheduling so multiple CI jobs don't conflict?"<span class="q-arr">▶</span></div>
        <div class="quiz-a"><em>"The cleanest solution is a resource lock at the CI level — GitHub Actions has concurrency groups, Jenkins has lockable resources plugins. Each bench gets a unique resource name, and only one job can hold the lock at a time. Jobs queue rather than fail. The alternative is a bench reservation system, but that adds complexity. I'd start with the locking mechanism and only build a reservation system if we have more than 20 benches and complex scheduling needs."</em></div>
      </div>
    </div>
  </div>
</div>

<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas de CI/CD</div>
  <p class="notes-placeholder">Agrega aquí experiencias propias con pipelines, Jenkins, GitHub Actions...</p>
</div>`,

'wayve-pytest': `
<div class="tab-group-pytest">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'wp-1','pytest')">Arquitectura</button>
    <button class="tab-btn" onclick="switchTab(this,'wp-2','pytest')">conftest.py</button>
    <button class="tab-btn" onclick="switchTab(this,'wp-3','pytest')">Tests HIL/sensor</button>
    <button class="tab-btn" onclick="switchTab(this,'wp-4','pytest')">Marks & CI</button>
    <button class="tab-btn" onclick="switchTab(this,'wp-5','pytest')">Quiz</button>
  </div>

  <div id="wp-1" class="tab-panel active">
    <div class="pipeline-diagram">
<span class="p-gray">proyecto/</span>
<span class="p-gray">├── src/</span>
<span class="p-blue">│   ├── sensor_validator.py</span>
<span class="p-blue">│   ├── mcap_reader.py</span>
<span class="p-blue">│   └── triage_classifier.py</span>
<span class="p-gray">├── tests/</span>
<span class="p-green">│   ├── conftest.py            </span><span class="p-gray"># fixtures compartidas</span>
<span class="p-green">│   ├── unit/</span>
<span class="p-green">│   │   ├── test_sensor_validator.py</span>
<span class="p-green">│   │   └── test_triage_classifier.py</span>
<span class="p-amber">│   ├── hil/                   </span><span class="p-gray"># requieren HW real</span>
<span class="p-amber">│   │   ├── conftest.py        </span><span class="p-gray"># fixtures HIL-específicas</span>
<span class="p-amber">│   │   └── test_firmware.py</span>
<span class="p-blue">│   └── integration/</span>
<span class="p-blue">│       └── test_pipeline.py</span>
<span class="p-gray">├── pytest.ini</span>
<span class="p-gray">├── pyproject.toml</span>
<span class="p-gray">└── .github/workflows/ci.yml</span>
    </div>
<div class="code-block">
  <div class="code-lang">pytest.ini — configuración base</div>
  <pre>[pytest]
testpaths = tests
addopts = -v --tb=short --strict-markers
markers =
    hil: requiere hardware físico (bench)
    sil: corre en software-in-the-loop
    slow: test de larga duración (>60s)
    sensor: prueba de validación de sensores
    smoke: suite rápida de verificación básica</pre>
</div>
  </div>

  <div id="wp-2" class="tab-panel">
<div class="code-block">
  <div class="code-lang">conftest.py — fixtures para testing de plataforma</div>
  <pre><span class="c-kw">import</span> pytest
<span class="c-kw">from</span> pathlib <span class="c-kw">import</span> Path
<span class="c-kw">from</span> typing <span class="c-kw">import</span> Generator
<span class="c-kw">from</span> src.mcap_reader <span class="c-kw">import</span> McapReader
<span class="c-kw">from</span> src.bench_client <span class="c-kw">import</span> BenchClient

<span class="c-cm"># ─── Fixtures de datos ───────────────────────────────────────────</span>

<span class="c-dc">@pytest.fixture</span>(scope=<span class="c-st">"session"</span>)
<span class="c-kw">def</span> <span class="c-fn">test_mcap_files</span>() -&gt; Generator:
    <span class="c-cm">"""Carga todos los archivos MCAP de la sesión de prueba."""</span>
    mcap_dir = Path(<span class="c-st">"test_data/mcap/"</span>)
    files = <span class="c-bi">list</span>(mcap_dir.glob(<span class="c-st">"*.mcap"</span>))
    <span class="c-kw">assert</span> files, <span class="c-st">"No MCAP files found in test_data/mcap/"</span>
    <span class="c-kw">yield</span> files  <span class="c-cm"># teardown: nada (files son read-only)</span>

<span class="c-dc">@pytest.fixture</span>(scope=<span class="c-st">"module"</span>)
<span class="c-kw">def</span> <span class="c-fn">sample_mcap</span>(test_mcap_files) -&gt; McapReader:
    <span class="c-cm">"""Un archivo MCAP de muestra para tests de unidad."""</span>
    <span class="c-kw">return</span> McapReader(test_mcap_files[<span class="c-nb">0</span>])

<span class="c-cm"># ─── Fixtures de HW (solo para mark hil) ─────────────────────────</span>

<span class="c-dc">@pytest.fixture</span>(scope=<span class="c-st">"session"</span>)
<span class="c-kw">def</span> <span class="c-fn">bench_connection</span>(request) -&gt; Generator:
    <span class="c-cm">"""Conexión al bench HIL. Solo se usa si el test tiene @pytest.mark.hil."""</span>
    bench_id = request.config.getoption(<span class="c-st">"--bench"</span>, default=<span class="c-st">"bench-a1"</span>)
    client = BenchClient(bench_id)
    client.connect()
    <span class="c-kw">yield</span> client
    client.disconnect()  <span class="c-cm"># teardown garantizado</span>

<span class="c-dc">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">fresh_bench</span>(bench_connection) -&gt; Generator:
    <span class="c-cm">"""Reinicia el bench a estado limpio antes de cada test HIL."""</span>
    bench_connection.reset()
    bench_connection.wait_ready(timeout=<span class="c-nb">30</span>)
    <span class="c-kw">yield</span> bench_connection
    bench_connection.collect_logs()  <span class="c-cm"># siempre guardar logs post-test</span>

<span class="c-cm"># ─── Hooks ────────────────────────────────────────────────────────</span>

<span class="c-kw">def</span> <span class="c-fn">pytest_addoption</span>(parser):
    parser.addoption(<span class="c-st">"--bench"</span>, action=<span class="c-st">"store"</span>, help=<span class="c-st">"ID del bench HIL"</span>)

<span class="c-kw">def</span> <span class="c-fn">pytest_configure</span>(config):
    config.addinivalue_line(<span class="c-st">"markers"</span>, <span class="c-st">"hil: requiere HW real"</span>)

<span class="c-kw">def</span> <span class="c-fn">pytest_runtest_makereport</span>(item, call):
    <span class="c-cm">"""Al fallar un test HIL, guarda captura del estado del bench."""</span>
    <span class="c-kw">if</span> call.when == <span class="c-st">"call"</span> <span class="c-kw">and</span> call.excinfo <span class="c-kw">and</span> <span class="c-st">"hil"</span> <span class="c-kw">in</span> item.keywords:
        bench = item.funcargs.get(<span class="c-st">"fresh_bench"</span>)
        <span class="c-kw">if</span> bench: bench.dump_state(item.name)</pre>
</div>
  </div>

  <div id="wp-3" class="tab-panel">
<div class="code-block">
  <div class="code-lang">test_sensor_validation.py — tests parametrizados multi-config</div>
  <pre><span class="c-kw">import</span> pytest
<span class="c-kw">from</span> src.sensor_validator <span class="c-kw">import</span> validate_mcap

<span class="c-cm"># Config por tipo de run: diferentes requisitos según la misión</span>
SENSOR_CONFIGS = [
    pytest.param(
        {<span class="c-st">"/camera/front"</span>: {<span class="c-st">"min_hz"</span>: <span class="c-nb">25</span>, <span class="c-st">"max_hz"</span>: <span class="c-nb">35</span>},
         <span class="c-st">"/lidar/points"</span>: {<span class="c-st">"min_hz"</span>: <span class="c-nb">8</span>,  <span class="c-st">"max_hz"</span>: <span class="c-nb">12</span>}},
        id=<span class="c-st">"urban_drive"</span>
    ),
    pytest.param(
        {<span class="c-st">"/camera/front"</span>: {<span class="c-st">"min_hz"</span>: <span class="c-nb">28</span>, <span class="c-st">"max_hz"</span>: <span class="c-nb">32</span>},
         <span class="c-st">"/radar/front"</span>:  {<span class="c-st">"min_hz"</span>: <span class="c-nb">13</span>, <span class="c-st">"max_hz"</span>: <span class="c-nb">20</span>}},
        id=<span class="c-st">"highway_run"</span>
    ),
]

<span class="c-dc">@pytest.mark.sensor</span>
<span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"expected_topics"</span>, SENSOR_CONFIGS)
<span class="c-kw">def</span> <span class="c-fn">test_sensor_completeness</span>(test_mcap_files, expected_topics):
    <span class="c-kw">for</span> mcap_path <span class="c-kw">in</span> test_mcap_files:
        result = validate_mcap(str(mcap_path), expected_topics)
        <span class="c-kw">assert not</span> result[<span class="c-st">"error"</span>], (
            <span class="c-bi">f</span><span class="c-st">"Missing topics in {mcap_path.name}: {result['error']}"</span>
        )

<span class="c-dc">@pytest.mark.sensor</span>
<span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"expected_topics"</span>, SENSOR_CONFIGS)
<span class="c-kw">def</span> <span class="c-fn">test_sensor_frequency</span>(test_mcap_files, expected_topics):
    <span class="c-kw">for</span> mcap_path <span class="c-kw">in</span> test_mcap_files:
        result = validate_mcap(str(mcap_path), expected_topics)
        <span class="c-kw">assert not</span> result[<span class="c-st">"warn"</span>], (
            <span class="c-bi">f</span><span class="c-st">"Frequency issues in {mcap_path.name}: {result['warn']}"</span>
        )

<span class="c-cm"># Test HIL: verifica que la ECU responde correctamente</span>
<span class="c-dc">@pytest.mark.hil</span>
<span class="c-dc">@pytest.mark.slow</span>
<span class="c-kw">def</span> <span class="c-fn">test_ecu_sensor_output</span>(fresh_bench):
    <span class="c-cm">"""Verifica salida de sensores desde la ECU real en el bench."""</span>
    fresh_bench.start_recording(duration=<span class="c-nb">10</span>)
    mcap = fresh_bench.get_last_recording()
    result = validate_mcap(mcap, {<span class="c-st">"/camera/front"</span>: {<span class="c-st">"min_hz"</span>: <span class="c-nb">25</span>, <span class="c-st">"max_hz"</span>: <span class="c-nb">35</span>}})
    <span class="c-kw">assert not</span> result[<span class="c-st">"error"</span>]</pre>
</div>
  </div>

  <div id="wp-4" class="tab-panel">
<div class="code-block">
  <div class="code-lang">GitHub Actions — CI con pytest (lo que Wayve probablemente usa)</div>
  <pre><span class="c-cm"># .github/workflows/ci.yml</span>
name: Platform Validation CI

on:
  push:
    branches: [main, develop]
  pull_request:
  schedule:
    - cron: <span class="c-st">'0 6 * * 1-5'</span>  <span class="c-cm"># Lunes-Viernes 6am</span>

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: {python-version: <span class="c-st">'3.11'</span>}
      - run: pip install -e .[dev]
      - run: pytest tests/unit/ -v --tb=short
               --cov=src --cov-report=html
               --junitxml=results-unit.xml
               -m <span class="c-st">"not hil and not slow"</span>
      - uses: actions/upload-artifact@v4
        <span class="c-kw">if</span>: always()
        with:
          name: unit-test-results
          path: [results-unit.xml, htmlcov/]

  hil-tests:
    runs-on: [self-hosted, bench-available]  <span class="c-cm"># runner con HW</span>
    needs: unit-tests
    steps:
      - uses: actions/checkout@v4
      - run: pip install -e .[dev]
      - run: pytest tests/hil/ -v -m hil
               --bench=bench-a1
               --junitxml=results-hil.xml
               --timeout=120
      - uses: actions/upload-artifact@v4
        <span class="c-kw">if</span>: always()
        with: {name: hil-results, path: results-hil.xml}</pre>
</div>
<div class="code-block">
  <div class="code-lang">Bash — Correr solo tests rápidos (útil en desarrollo)</div>
  <pre><span class="c-cm"># Solo unit tests (sin HW)</span>
pytest tests/unit/ -m <span class="c-st">"not hil and not slow"</span> -v

<span class="c-cm"># Solo tests de sensor</span>
pytest -m sensor -v

<span class="c-cm"># Con coverage</span>
pytest --cov=src --cov-report=html --cov-fail-under=80

<span class="c-cm"># Paralelo (pytest-xdist)</span>
pytest -n auto tests/unit/

<span class="c-cm"># Solo tests que fallaron la vez anterior</span>
pytest --lf</pre>
</div>
  </div>

  <div id="wp-5" class="tab-panel">
    <div class="quiz-section">
      <div class="quiz-title">Quiz — pytest en la entrevista</div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Fixture</span>¿Cuál es la diferencia entre scope="session" y scope="function"?<span class="q-arr">▶</span></div>
        <div class="quiz-a"><b>scope="function"</b>: la fixture se crea y destruye para CADA test (default). <b>scope="session"</b>: se crea una vez para toda la sesión de pytest. Para conexiones costosas (HW, DB) usa session o module. Para datos que deben estar limpios entre tests, usa function.<div class="a-tip">Para bench HIL, siempre session (conectar una vez) + fixture function interna para reset del estado.</div></div>
      </div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Marks</span>¿Por qué separar tests con @pytest.mark.hil vs tests sin mark?<span class="q-arr">▶</span></div>
        <div class="quiz-a">Porque los tests HIL requieren hardware físico disponible — no puedes correrlos en cualquier runner de CI. Con marks puedes: 1) correr <code>pytest -m "not hil"</code> en CI general, 2) correr <code>pytest -m hil</code> solo en runners con bench disponible, 3) en el PR, solo correr unit tests rápidos y dejar HIL para nightly.</div>
      </div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">conftest</span>¿Para qué sirve yield en una fixture?<span class="q-arr">▶</span></div>
        <div class="quiz-a">El código antes del <code>yield</code> es el setup (se ejecuta antes del test). El código después del <code>yield</code> es el teardown (se ejecuta siempre, incluso si el test falla). Es equivalente a try/finally. Para bench: <code>yield client</code> → después: <code>client.disconnect()</code>.<div class="a-tip">Siempre usa yield para recursos que necesitan cleanup (conexiones, archivos, procesos).</div></div>
      </div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Parametrize</span>¿Cuándo usarías @parametrize vs SubTest?<span class="q-arr">▶</span></div>
        <div class="quiz-a"><b>pytest @parametrize</b>: cuando los casos de prueba son conocidos en tiempo de definición. Genera tests separados visibles en el reporte. Mejor para configuraciones de HW distintas.<br><b>SubTest (unittest)</b>: cuando iteras en el test mismo. Los failures no detienen el loop. Mejor para datos tabulares dentro de un test.<div class="a-tip">Para Wayve: @parametrize para diferentes configs de sensor, SubTest para validar múltiples frames de un mismo MCAP.</div></div>
      </div>
    </div>
  </div>
</div>

<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas de pytest</div>
  <p class="notes-placeholder">Agrega aquí patrones de pytest que hayas usado en proyectos reales...</p>
</div>`,

'wayve-system-design': `
<div class="tab-group-sysdesign">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'wsd-1','sysdesign')">Framework</button>
    <button class="tab-btn" onclick="switchTab(this,'wsd-2','sysdesign')">AV Pipeline</button>
    <button class="tab-btn" onclick="switchTab(this,'wsd-3','sysdesign')">Componentes</button>
    <button class="tab-btn" onclick="switchTab(this,'wsd-4','sysdesign')">Preguntas posibles</button>
  </div>

  <div id="wsd-1" class="tab-panel active">
    <div class="plan-card">
      <div class="plan-card-title">Framework para responder system design en la entrevista</div>
      <div class="dtree">
        <div class="dtree-step">
          <div class="dtree-num">1</div>
          <div class="dtree-body"><h5>Clarifica el problema (2 min)</h5><p>Antes de diseñar: ¿Cuántos vehículos? ¿Cuántos GB de datos por día? ¿Latencia requerida? ¿El sistema es online o batch? ¿Quién consume los resultados?</p></div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num">2</div>
          <div class="dtree-body"><h5>Estimaciones de escala (2 min)</h5><p>Haz números en voz alta: "Si hay 50 vehículos, cada uno genera 10 GB/hora → 500 GB/hora → ~12 TB/día". Esto muestra que piensas en escala real.</p></div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num">3</div>
          <div class="dtree-body"><h5>Diseño de alto nivel (5 min)</h5><p>Dibuja los componentes principales con flechas. No profundices aún. Cubre: ingesta → procesamiento → almacenamiento → consumo.</p></div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num warn">4</div>
          <div class="dtree-body"><h5>Deep dive en el componente más crítico (5 min)</h5><p>El entrevistador te pedirá profundizar en algo. Para Wayve probablemente: validación de datos o pipeline de ingesta. Ten detalles listos.</p></div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num ok">5</div>
          <div class="dtree-body"><h5>Trade-offs y fallas (3 min)</h5><p>¿Qué puede fallar? ¿Qué sacrificas? (latencia vs throughput, consistencia vs disponibilidad). Muestra que piensas en producción, no en un sistema perfecto.</p></div>
        </div>
      </div>
    </div>
  </div>

  <div id="wsd-2" class="tab-panel">
    <div class="plan-card">
      <div class="plan-card-title">Pipeline de validación de datos AV — diseño completo</div>
    </div>
    <div class="pipeline-diagram">
<span class="p-amber">┌─ VEHÍCULO ──────────────────────────────────────────────────────────┐</span>
<span class="p-green">  Sensores: Camera + LIDAR + RADAR + IMU + GPS + CAN</span>
<span class="p-blue">  ↓ Graba datos en tiempo real → archivos .mcap locales</span>
<span class="p-amber">└─────────────────────────────────────────────────────────────────────┘</span>
           <span class="p-gray">↓ WiFi/4G/5G cuando vuelve a base</span>
<span class="p-amber">┌─ OFFLOAD ──────────────────────────────────────────────────────────┐</span>
<span class="p-green">  Transferencia .mcap al servidor → checksum → metadata upload</span>
<span class="p-red">  ⚠ Punto de fallo: conexión interrumpida, archivo incompleto</span>
<span class="p-amber">└─────────────────────────────────────────────────────────────────────┘</span>
           <span class="p-gray">↓</span>
<span class="p-amber">┌─ INGEST ───────────────────────────────────────────────────────────┐</span>
<span class="p-green">  Message Queue (Kafka/RabbitMQ) → workers de validación en paralelo</span>
<span class="p-blue">  Cada worker: abre MCAP → valida topics → verifica timestamps/Hz</span>
<span class="p-red">  ⚠ Punto de fallo: queue llena, worker crash, schema mismatch</span>
<span class="p-amber">└─────────────────────────────────────────────────────────────────────┘</span>
           <span class="p-gray">↓</span>
<span class="p-amber">┌─ VALIDACIÓN ───────────────────────────────────────────────────────┐</span>
<span class="p-green">  Completitud → Frecuencia → Timestamps → Integridad → Formato</span>
<span class="p-blue">  Resultado: OK / WARN / ERROR por topic y por sesión</span>
<span class="p-amber">└─────────────────────────────────────────────────────────────────────┘</span>
           <span class="p-gray">↓</span>
<span class="p-amber">┌─ ALMACENAMIENTO + REPORTE ─────────────────────────────────────────┐</span>
<span class="p-green">  DB de resultados (PostgreSQL/BigQuery) → Dashboard (Grafana)</span>
<span class="p-blue">  Alertas automáticas si session error rate &gt; umbral</span>
<span class="p-amber">└─────────────────────────────────────────────────────────────────────┘</span>
    </div>
  </div>

  <div id="wsd-3" class="tab-panel">
    <table class="kv-table amber">
      <tr><th>Componente</th><th>Tecnología posible</th><th>Por qué / Trade-off</th></tr>
      <tr><td>Queue de ingesta</td><td>Kafka, RabbitMQ, AWS SQS</td><td>Kafka: alta throughput, persistente. RabbitMQ: más simple. Para 12 TB/día → Kafka.</td></tr>
      <tr><td>Workers de validación</td><td>Python scripts, Celery, Dask</td><td>Python por integración con MCAP SDK. Celery para distribución. Dask para procesamiento paralelo de dataframes.</td></tr>
      <tr><td>Almacenamiento MCAP</td><td>S3, GCS, NFS</td><td>Object storage (S3) para escala. NFS para acceso rápido local.</td></tr>
      <tr><td>BD de resultados</td><td>PostgreSQL, BigQuery, InfluxDB</td><td>PostgreSQL: flexible, relacional. InfluxDB: optimizada para series de tiempo (métricas de sensores).</td></tr>
      <tr><td>Dashboard</td><td>Grafana, Metabase, custom</td><td>Grafana + Prometheus: stack estándar en infra. Metabase para no-técnicos.</td></tr>
      <tr><td>Alertas</td><td>PagerDuty, Slack webhook, email</td><td>Slack para notificaciones de team. PagerDuty para incidentes críticos con on-call.</td></tr>
      <tr><td>Orquestación CI/CD</td><td>GitHub Actions, Jenkins, Argo</td><td>GH Actions: fácil integración con repo. Jenkins: más control. Argo: nativo Kubernetes.</td></tr>
    </table>
    <div class="alert-card">💡 <strong>No necesitas saber todos estos.</strong> Lo que importa es poder razonar: "usaría X porque Y, con el trade-off de Z". El entrevistador quiere ver cómo piensas, no que sepas la respuesta "correcta".</div>
  </div>

  <div id="wsd-4" class="tab-panel">
    <div class="plan-card">
      <div class="plan-card-title">📐 Cómo hacer scale estimates — siempre di los números</div>
      <div class="plan-block">
        <div class="plan-time">Estimaciones para Wayve</div>
        <div class="plan-content">
          <h4>Los números que debes mencionar espontáneamente</h4>
          <p><b>Datos por vehículo:</b><br>
          • 1 cámara HD × 30 fps × ~3 MB/frame comprimido ≈ 90 MB/s por cámara<br>
          • 6 cámaras × 90 MB/s ≈ 540 MB/s de cámaras solo<br>
          • LIDAR: 10 Hz × ~1 MB/scan ≈ 10 MB/s<br>
          • IMU + GPS + CAN: negligible (&lt;1 MB/s)<br>
          • <b>Total por vehículo: ~550 MB/s ≈ ~2 TB por hora de conducción</b><br><br>
          <b>Para la flota (20 vehículos, 4h/día de conducción promedio):</b><br>
          • 20 vehículos × 2 TB/h × 4 h/día = <b>160 TB/día</b><br>
          • Esto requiere un offload de alta velocidad (10GbE por vehículo)<br>
          • Storage: 160 TB/día × 30 días ≈ 4.8 PB/mes (antes de compresión y selección)<br>
          • En la práctica: no todo se retiene — se hace selección basada en escenarios interesantes</p>
        </div>
      </div>
    </div>

    <div class="quiz-section" style="margin-top:16px">
      <div class="quiz-title">6 preguntas de system design para Wayve</div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Diseño</span>"Diseña un sistema para detectar sesiones con datos corruptos"<span class="q-arr">▶</span></div>
        <div class="quiz-a">
          <b>1. Clarify:</b> 50 vehicles × 4h/day = 200 sessions/day. Need to know within 2 hours of offload. Corruption types: missing topics, timestamp gaps, NaN values, incomplete file.<br><br>
          <b>2. High-level design:</b> Offload triggers event → Kafka queue → N validation workers in parallel → results to PostgreSQL → Grafana dashboard + Slack alerts if error rate &gt; 5%.<br><br>
          <b>3. Validation stages:</b><br>
          • Level 1 (fast, 30s): File size, SHA256 hash, MCAP header integrity<br>
          • Level 2 (medium, 5min): Topic completeness, frequency stats<br>
          • Level 3 (slow, 20min): Full timestamp scan, NaN check, sync check<br><br>
          <b>4. Trade-off:</b> Do L1+L2 immediately to gate ingestion. L3 runs async. Result in DB with status: PASS/WARN/FAIL with details per topic.
          <div class="a-tip">Tip: Mention "I'd run the three levels in parallel to save time — L1 is the gate, L2 and L3 run after L1 passes."</div>
        </div>
      </div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Diseño</span>"How would you design the offload pipeline for 20 development vehicles?"<span class="q-arr">▶</span></div>
        <div class="quiz-a">
          <b>Constraints:</b> 20 vehicles × 2TB/session → 40TB/day peak offload. WiFi 10GbE (1.25 GB/s) per dock.<br><br>
          <b>Design:</b><br>
          1. Vehicle arrives at dock → auto-connects to 10GbE switch<br>
          2. Offload agent on vehicle starts rsync/custom transfer with checksum verification<br>
          3. Transfer to NAS server in the garage (fast local storage)<br>
          4. On completion: emit event to message queue → validation pipeline triggered<br>
          5. After validation: async upload to cloud (S3/GCS) for long-term storage and training<br><br>
          <b>Failure handling:</b> If vehicle disconnects mid-transfer, rsync resumes from last checkpoint. Checksum at end guarantees integrity.
          <div class="a-tip">Mention: "The bottleneck is usually the NAS write speed, not the network. We'd use RAID for throughput and plan for 4 vehicles offloading simultaneously."</div>
        </div>
      </div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Diseño</span>"Design a bench reservation system for 10 HIL benches and 20 engineers"<span class="q-arr">▶</span></div>
        <div class="quiz-a">
          <b>Requirements:</b> Engineers need to reserve benches for manual testing. CI also uses benches. Priority: CI > manual testing. Max reservation: 4 hours.<br><br>
          <b>Design:</b><br>
          1. Simple DB table: reservations(bench_id, user, start_time, end_time, type: CI|MANUAL)<br>
          2. REST API: GET /benches (availability), POST /reserve (with conflict check), DELETE /reserve (release)<br>
          3. Slack bot: @bench-bot reserve bench-a1 for 2h → checks DB and confirms/rejects<br>
          4. CI integration: CI pipeline requests bench via API before job, releases after cleanup<br><br>
          <b>Edge cases:</b> CI never waits more than 30 min (fail fast). Manual reservations auto-expire. Admin override for emergencies.
          <div class="a-tip">Don't over-engineer: "I'd start with a Google Sheet and a script — build the REST API only if the team uses it enough to justify the maintenance."</div>
        </div>
      </div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Diseño</span>"How would you reduce mean time to triage from 4 hours to 30 minutes?"<span class="q-arr">▶</span></div>
        <div class="quiz-a">
          <b>Current state:</b> Someone sees a CI failure → reads logs manually → asks around → figures out root cause. 4 hours of human time.<br><br>
          <b>My approach:</b><br>
          1. <b>Instrument first:</b> Add structured logging to every CI stage with categories (HW, FW, TOOLING)<br>
          2. <b>Auto-classify:</b> Python script that reads the log and outputs: "Most likely category: HW BENCH (bench-a3 flash timeout, seen 5 times this week). Runbook: link"<br>
          3. <b>Enrich alerts:</b> Slack alert includes: what failed, which stage, auto-classification, and link to runbook<br>
          4. <b>Runbook coverage:</b> Top 10 failure patterns covered with step-by-step resolution (target: 80% of failures)<br>
          5. <b>Measure MTTT weekly:</b> Track if it's actually going down<br><br>
          Result: Engineer sees alert with context → clicks runbook → resolves in 15 min.
        </div>
      </div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Diseño</span>"Design an alerting system for sensor anomalies during a drive session"<span class="q-arr">▶</span></div>
        <div class="quiz-a">
          <b>Problem:</b> Safety driver and operator need to know if a sensor stops working mid-drive so they can decide whether to end the session.<br><br>
          <b>Design:</b><br>
          1. On the vehicle: lightweight watchdog process checks each sensor's message rate every second<br>
          2. Alert conditions: no message for 2× expected period, frequency drops below 50% of nominal<br>
          3. Alert delivery: HMI display in vehicle (immediate), push notification to operator phone, log entry in MCAP<br>
          4. Alert resolution: operator acknowledges → decide continue/abort session<br><br>
          <b>Key consideration:</b> False alarms are costly (they abort sessions and waste safety driver time). Threshold must be calibrated per sensor — LIDAR gap of 200ms is normal (rotation), camera gap of 200ms is not.
        </div>
      </div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Diseño</span>"How do you ensure data quality for ML training at scale?"<span class="q-arr">▶</span></div>
        <div class="quiz-a">
          <b>The problem:</b> Bad data in training = bad model = unsafe vehicle. Garbage in, garbage out — but at much higher cost than in standard ML.<br><br>
          <b>My design (data quality pipeline):</b><br>
          1. <b>Pre-ingest validation:</b> Every session goes through validation before being eligible for training. Output: quality score per session, per topic.<br>
          2. <b>Tagging system:</b> Sessions are tagged: TRAIN_ELIGIBLE, TRAIN_INELIGIBLE (with reason: gap_lidar / missing_gps / etc.), REVIEW_NEEDED.<br>
          3. <b>Sampling with weights:</b> Not all sessions are equal — rarer scenarios (rain, night, construction) get higher sampling weight.<br>
          4. <b>Feedback loop:</b> ML team flags sessions where the model behaved unexpectedly → those sessions get reviewed → root cause often is data quality.<br><br>
          <b>Key metric:</b> % of training data that passes all validation checks. Target: &gt;98%.
        </div>
      </div>
    </div>
  </div>
</div>

<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mi diseño propio</div>
  <p class="notes-placeholder">Dibuja aquí tu propio diseño del pipeline antes de la entrevista. Practica explicándolo en voz alta en 5 minutos. Cronometra...</p>
</div>`,

};
