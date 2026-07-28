
// ══════════════════════════════════════════════════════════════════
//  ISTQB_RICH — ISTQB Certified Tester Foundation Level (CTFL) v4.0.1
//  2024-09-15 — Contenido fiel a la estructura oficial de 6 capítulos.
// ══════════════════════════════════════════════════════════════════
const ISTQB_RICH = {

'istqb-ch1': `
<div class="concept-intro"><strong>Capítulo 1 del syllabus CTFL (180 min).</strong> Establece el vocabulario y la mentalidad base de todo el examen: qué es testing, por qué es necesario, los 7 principios que lo rigen, cómo se organiza el trabajo de prueba, y qué habilidades hacen a un buen tester.</div>
<div class="tab-group-fc1">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'fc1-1','fc1')">1.1-1.2 Qué es y por qué</button>
    <button class="tab-btn" onclick="switchTab(this,'fc1-2','fc1')">1.3 Los 7 Principios</button>
    <button class="tab-btn" onclick="switchTab(this,'fc1-3','fc1')">1.4 Actividades y Roles</button>
    <button class="tab-btn" onclick="switchTab(this,'fc1-4','fc1')">1.5 Habilidades</button>
  </div>
  <div id="fc1-1" class="tab-panel active">
<div class="concept-intro"><strong>1.1 — ¿Qué es Testing?</strong> Un error común es pensar que testing es solo "ejecutar pruebas". En realidad incluye muchas más actividades y debe alinearse con el ciclo de vida de desarrollo. Otro error común: pensar que testing solo verifica — también <strong>valida</strong>.</div>
<table class="kv-table"><tr><th>Concepto</th><th>Pregunta que responde</th></tr>
<tr><td>Verification</td><td>¿El sistema cumple los requisitos especificados?</td></tr>
<tr><td>Validation</td><td>¿El sistema cumple las necesidades reales de usuarios y stakeholders en su entorno operativo?</td></tr>
<tr><td>Static testing</td><td>Examina sin ejecutar el software (reviews, análisis estático — Cap. 3)</td></tr>
<tr><td>Dynamic testing</td><td>Ejecuta el software y usa técnicas de prueba para derivar test cases (Cap. 4)</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>1.1.1 — Objetivos típicos de testing</strong> (FL-1.1.1): evaluar work products (requisitos, historias de usuario, diseño, código); provocar failures y encontrar defects; asegurar la cobertura requerida; reducir el riesgo de calidad inadecuada; verificar el cumplimiento de requisitos especificados y contractuales/legales/regulatorios; dar información a los stakeholders para decisiones informadas; construir confianza en la calidad; y validar que el test object es completo y funciona como esperan los stakeholders. Estos objetivos varían según el contexto: el work product bajo prueba, el nivel de prueba, los riesgos, el SDLC seguido, y factores del negocio.</div>
<div class="concept-intro" style="margin-top:14px"><strong>1.1.2 — Testing vs. Debugging</strong> (FL-1.1.2): son actividades separadas. Testing puede disparar failures (dynamic testing) o encontrar defects directamente (static testing). Cuando dynamic testing dispara un failure, debugging se encarga de: reproducir el failure, diagnosticar (encontrar el defect), y corregirlo — luego el confirmation testing verifica que el fix funcionó. Cuando static testing identifica un defect, no hace falta reproducción ni diagnóstico: static testing encuentra defects directamente y no puede causar failures.</div>
<div class="concept-intro" style="margin-top:14px"><strong>1.2 — ¿Por qué es necesario Testing?</strong></div>
<table class="kv-table"><tr><th>Aporte (1.2.1)</th><th>Detalle</th></tr>
<tr><td>Detección de defectos costo-efectiva</td><td>Los defectos encontrados se eliminan vía debugging (actividad distinta de testing) — testing contribuye indirectamente a mayor calidad</td></tr>
<tr><td>Evaluación directa de calidad</td><td>En distintas fases del SDLC, alimentando decisiones de gestión de proyecto como el release</td></tr>
<tr><td>Representación indirecta de usuarios</td><td>Los testers aseguran que la comprensión de las necesidades del usuario se considere durante todo el desarrollo</td></tr>
<tr><td>Cumplimiento</td><td>Requisitos contractuales, legales o regulatorios</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>1.2.2 — Testing vs. Quality Assurance (QA).</strong></div>
<table class="kv-table"><tr><th></th><th>Testing</th><th>QA</th></tr>
<tr><td>Enfoque</td><td>Orientado al <strong>producto</strong>, correctivo</td><td>Orientado al <strong>proceso</strong>, preventivo</td></tr>
<tr><td>Lógica</td><td>Una forma mayor de control de calidad (junto a métodos formales, simulación, prototyping)</td><td>Si se sigue un buen proceso correctamente, se genera un buen producto</td></tr>
<tr><td>Alcance</td><td>Actividades de prueba específicas</td><td>Aplica tanto a desarrollo como a testing — responsabilidad de todo el proyecto</td></tr>
<tr><td>Uso de resultados</td><td>Los resultados de prueba se usan para corregir defectos</td><td>Los resultados de prueba dan feedback sobre qué tan bien funcionan los procesos</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>1.2.3 — Root Cause, Error, Defect, Failure.</strong></div>
<div class="diagram-card">
<svg viewBox="0 0 640 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cadena causal: una causa raiz fundamental lleva a un error humano, que produce un defecto en el codigo o documento, y ese defecto puede resultar en un failure observable si el codigo defectuoso se ejecuta">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="5" y="35" width="140" height="55" rx="7" fill="var(--text-muted)" fill-opacity="0.15" stroke="var(--text-muted)" stroke-width="1.5"/>
    <text x="75" y="58" font-size="10" font-weight="700" fill="var(--text-muted)" text-anchor="middle">Root Cause</text>
    <text x="75" y="72" font-size="8" fill="var(--text-muted)" text-anchor="middle">presión de tiempo, complejidad</text>

    <rect x="170" y="35" width="140" height="55" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="240" y="58" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Error (humano)</text>
    <text x="240" y="72" font-size="8" fill="var(--text-muted)" text-anchor="middle">acción/decisión equivocada</text>

    <rect x="335" y="35" width="140" height="55" rx="7" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
    <text x="405" y="58" font-size="10" font-weight="700" fill="#92400E" text-anchor="middle">Defect</text>
    <text x="405" y="72" font-size="8" fill="#92400E" text-anchor="middle">en código o documento</text>

    <rect x="500" y="35" width="135" height="55" rx="7" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/>
    <text x="567" y="58" font-size="10" font-weight="700" fill="#B91C1C" text-anchor="middle">Failure</text>
    <text x="567" y="72" font-size="8" fill="#B91C1C" text-anchor="middle">solo si se ejecuta el defecto</text>

    <g stroke="var(--text-muted)" stroke-width="1.4" fill="var(--text-muted)">
      <line x1="145" y1="62" x2="166" y2="62"/><path d="M166,58 L174,62 L166,66 Z"/>
      <line x1="310" y1="62" x2="331" y2="62"/><path d="M331,58 L339,62 L331,66 Z"/>
      <line x1="475" y1="62" x2="496" y2="62"/><path d="M496,58 L504,62 L496,66 Z"/>
    </g>
  </g>
</svg>
<div class="diagram-caption">No todo defecto se convierte en failure: algunos siempre fallan al ejecutarse, otros solo en circunstancias específicas, y algunos nunca. Los failures también pueden originarse sin error humano — por ejemplo, radiación o campos electromagnéticos que afectan firmware. La causa raíz se identifica con <b>root cause analysis</b>, típicamente tras un failure o defecto, para prevenir su recurrencia.</div>
</div>
  </div>
  <div id="fc1-2" class="tab-panel">
<div class="concept-intro">Los <strong>7 principios de testing</strong> (FL-1.3.1) son guías generales aplicables a todo tipo de testing, acumuladas a lo largo de los años.</div>
<table class="kv-table"><tr><th>#</th><th>Principio</th><th>Explicación</th></tr>
<tr><td>1</td><td>Testing muestra la presencia, no la ausencia, de defectos</td><td>Puede mostrar que hay defectos, pero no puede probar que no hay ninguno — reduce la probabilidad de defectos no descubiertos, pero nunca prueba corrección total</td></tr>
<tr><td>2</td><td>El testing exhaustivo es imposible</td><td>Probar todo no es viable salvo en casos triviales. En vez de exhaustividad: técnicas de prueba (Cap. 4), priorización de test cases (5.1.5) y testing basado en riesgo (5.2)</td></tr>
<tr><td>3</td><td>El testing temprano ahorra tiempo y dinero</td><td>Los defectos eliminados temprano no generan defectos derivados después. Tanto static testing (Cap. 3) como dynamic testing (Cap. 4) deben iniciar lo antes posible</td></tr>
<tr><td>4</td><td>Los defectos se agrupan</td><td>Un número pequeño de componentes suele contener la mayoría de los defectos (Principio de Pareto) — insumo clave para testing basado en riesgo (5.2)</td></tr>
<tr><td>5</td><td>Las pruebas se desgastan (pesticide paradox)</td><td>Repetir los mismos tests muchas veces los hace cada vez menos efectivos para encontrar defectos nuevos — hay que modificarlos y añadir nuevos (aunque repetir tests sí es útil en regresión automatizada)</td></tr>
<tr><td>6</td><td>El testing depende del contexto</td><td>No existe un enfoque único universalmente aplicable — se hace distinto en distintos contextos</td></tr>
<tr><td>7</td><td>La falacia de "ausencia de defectos"</td><td>Es un error esperar que verificar el software garantice el éxito del sistema. Probar todos los requisitos y arreglar todos los defectos aún puede producir un sistema que no cumple las necesidades reales del usuario — por eso también se necesita <strong>validación</strong>, no solo verificación</td></tr>
</table>
  </div>
  <div id="fc1-3" class="tab-panel">
<div class="concept-intro"><strong>1.4.1 — Actividades y tareas de prueba.</strong> El testing es dependiente del contexto, pero a alto nivel hay un conjunto común de actividades que forman el <strong>proceso de prueba</strong> — a menudo implementadas de forma iterativa o en paralelo, no estrictamente secuencial.</div>
<div class="diagram-card">
<svg viewBox="0 0 640 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Las actividades del proceso de prueba: test planning, test monitoring y control de forma continua, test analysis, test design, test implementation, test execution, y test completion">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="5" y="45" width="95" height="50" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="52" y="66" font-size="9" font-weight="700" fill="var(--accent)" text-anchor="middle">Test</text>
    <text x="52" y="78" font-size="9" font-weight="700" fill="var(--accent)" text-anchor="middle">Analysis</text>

    <rect x="110" y="45" width="95" height="50" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="157" y="66" font-size="9" font-weight="700" fill="var(--accent)" text-anchor="middle">Test</text>
    <text x="157" y="78" font-size="9" font-weight="700" fill="var(--accent)" text-anchor="middle">Design</text>

    <rect x="215" y="45" width="105" height="50" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="267" y="66" font-size="9" font-weight="700" fill="var(--accent)" text-anchor="middle">Test</text>
    <text x="267" y="78" font-size="8.5" font-weight="700" fill="var(--accent)" text-anchor="middle">Implementation</text>

    <rect x="330" y="45" width="105" height="50" rx="6" fill="var(--accent)" fill-opacity="0.85" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="382" y="66" font-size="9" font-weight="700" fill="white" text-anchor="middle">Test</text>
    <text x="382" y="78" font-size="9" font-weight="700" fill="white" text-anchor="middle">Execution</text>

    <rect x="445" y="45" width="105" height="50" rx="6" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="497" y="66" font-size="9" font-weight="700" fill="var(--green)" text-anchor="middle">Test</text>
    <text x="497" y="78" font-size="9" font-weight="700" fill="var(--green)" text-anchor="middle">Completion</text>

    <rect x="150" y="10" width="340" height="24" rx="5" fill="#FEF3C7" stroke="#D97706" stroke-width="1.2"/>
    <text x="320" y="26" font-size="9" font-weight="700" fill="#92400E" text-anchor="middle">Test Planning, Monitoring &amp; Control — continuos, en paralelo a todo lo demás</text>

    <g stroke="var(--text-muted)" stroke-width="1.3" fill="var(--text-muted)">
      <line x1="100" y1="70" x2="106" y2="70"/><path d="M106,66 L114,70 L106,74 Z"/>
      <line x1="205" y1="70" x2="211" y2="70"/><path d="M211,66 L219,70 L211,74 Z"/>
      <line x1="320" y1="70" x2="326" y2="70"/><path d="M326,66 L334,70 L326,74 Z"/>
      <line x1="435" y1="70" x2="441" y2="70"/><path d="M441,66 L449,70 L441,74 Z"/>
    </g>
  </g>
</svg>
<div class="diagram-caption"><b>Analysis</b> responde "¿qué probar?" (coverage criteria medibles). <b>Design</b> responde "¿cómo probar?" (test cases, coverage items). <b>Implementation</b> crea el testware necesario (test procedures, scripts, suites). <b>Execution</b> corre los tests y registra resultados. <b>Completion</b> archiva testware, documenta lecciones aprendidas y genera el reporte final.</div>
</div>
<div class="concept-intro" style="margin-top:14px"><strong>1.4.2 — El proceso de prueba en contexto.</strong> Factores que influyen: stakeholders, miembros del equipo, dominio de negocio, factores técnicos, restricciones del proyecto, factores organizacionales, el SDLC, y las herramientas disponibles — todos impactan la estrategia de prueba, técnicas usadas, grado de automatización, nivel de cobertura requerido, etc.</div>
<div class="concept-intro" style="margin-top:14px"><strong>1.4.3 — Testware.</strong> Los work products de salida de cada actividad (lista no exhaustiva):</div>
<table class="kv-table"><tr><th>Actividad</th><th>Testware típico</th></tr>
<tr><td>Test planning</td><td>Test plan, cronograma, risk register, entry/exit criteria</td></tr>
<tr><td>Test monitoring &amp; control</td><td>Reportes de progreso, directivas de control, información de riesgos</td></tr>
<tr><td>Test analysis</td><td>Condiciones de prueba priorizadas (ej. criterios de aceptación), reportes de defectos del test basis</td></tr>
<tr><td>Test design</td><td>Test cases priorizados, test charters, coverage items, requisitos de datos y entorno de prueba</td></tr>
<tr><td>Test implementation</td><td>Test procedures, scripts manuales/automatizados, test suites, datos de prueba, cronograma de ejecución</td></tr>
<tr><td>Test execution</td><td>Logs de prueba, reportes de defectos</td></tr>
<tr><td>Test completion</td><td>Reporte de cierre, lecciones aprendidas documentadas, change requests</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>1.4.4 — Trazabilidad entre el Test Basis y el Testware.</strong> Buena trazabilidad permite: evaluar cobertura, determinar el impacto de cambios, facilitar auditorías, cumplir criterios de gobernanza de TI, y hacer más comprensibles los reportes de progreso y cierre.</div>
<div class="concept-intro" style="margin-top:14px"><strong>1.4.5 — Roles en Testing.</strong> Dos roles principales:</div>
<table class="kv-table"><tr><th>Rol</th><th>Responsabilidad principal</th></tr>
<tr><td>Test management</td><td>Responsabilidad general del proceso de prueba, del equipo y liderazgo — enfocado en test planning, monitoring, control y completion</td></tr>
<tr><td>Testing</td><td>Responsabilidad general del aspecto técnico/de ingeniería — enfocado en test analysis, design, implementation y execution</td></tr>
</table>
<div class="alert-card">💡 Una misma persona puede desempeñar ambos roles a la vez, y quién los ejecuta varía según el contexto (ej. en Agile, parte de la gestión de pruebas la asume el equipo mismo).</div>
  </div>
  <div id="fc1-4" class="tab-panel">
<div class="concept-intro"><strong>1.5.1 — Habilidades genéricas requeridas para testing:</strong> conocimiento de testing, minuciosidad/curiosidad/atención al detalle, buenas habilidades de comunicación y escucha activa, pensamiento analítico/crítico/creatividad, conocimiento técnico, y conocimiento de dominio.</div>
<div class="alert-card">💡 Los testers suelen ser "portadores de malas noticias" — comunicar resultados de prueba puede percibirse como crítica al producto o a su autor, y el sesgo de confirmación dificulta aceptar información que contradice creencias existentes. Por eso las habilidades de comunicación son cruciales: la información sobre defectos y failures debe comunicarse de forma constructiva.</div>
<div class="concept-intro" style="margin-top:14px"><strong>1.5.2 — Whole Team Approach.</strong> Práctica proveniente de Extreme Programming: cualquier miembro del equipo con el conocimiento y las habilidades necesarias puede realizar cualquier tarea, y todos son responsables de la calidad. Mejora la dinámica del equipo, la comunicación y crea sinergia. Puede no ser apropiado en todos los contextos — por ejemplo, en sistemas safety-critical puede requerirse un alto nivel de independencia de testing.</div>
<div class="concept-intro" style="margin-top:14px"><strong>1.5.3 — Independencia de Testing.</strong></div>
<table class="kv-table"><tr><th>Nivel</th><th>Quién prueba</th></tr>
<tr><td>Ninguna independencia</td><td>El propio autor del work product</td></tr>
<tr><td>Alguna independencia</td><td>Pares del autor, del mismo equipo</td></tr>
<tr><td>Alta independencia</td><td>Testers fuera del equipo del autor, pero dentro de la organización</td></tr>
<tr><td>Muy alta independencia</td><td>Testers fuera de la organización</td></tr>
</table>
<div class="alert-card">💡 Cierto grado de independencia hace al tester más efectivo encontrando defectos, por las diferencias entre los sesgos cognitivos del autor y del tester — pero independencia no reemplaza a la familiaridad (los desarrolladores encuentran eficientemente muchos defectos en su propio código). Riesgos de la independencia: aislamiento del equipo de desarrollo, problemas de comunicación, relación adversarial, pérdida de sentido de responsabilidad por parte de los desarrolladores, o percibir a los testers independientes como un cuello de botella.</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el Capítulo 1...</p>
</div>`,

'istqb-ch2': `
<div class="concept-intro"><strong>Capítulo 2 del syllabus CTFL (130 min).</strong> Conecta el testing con el ciclo de vida completo del software: cómo el SDLC elegido impacta el testing, qué niveles y tipos de prueba existen, y cómo se prueba el mantenimiento de sistemas ya en operación.</div>
<div class="tab-group-fc2">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'fc2-1','fc2')">2.1 SDLC y Testing</button>
    <button class="tab-btn" onclick="switchTab(this,'fc2-2','fc2')">2.2 Niveles y Tipos</button>
    <button class="tab-btn" onclick="switchTab(this,'fc2-3','fc2')">2.3 Maintenance Testing</button>
  </div>
  <div id="fc2-1" class="tab-panel active">
<div class="concept-intro"><strong>2.1.1 — Impacto del SDLC en el testing.</strong> La elección del SDLC impacta: alcance y timing de las actividades de prueba, nivel de detalle de la documentación, elección de técnicas y enfoque, extensión de la automatización, y el rol del tester. En modelos secuenciales, dynamic testing típicamente no puede iniciar temprano (el código ejecutable llega en fases tardías). En modelos iterativos/incrementales, cada iteración entrega un incremento funcional, permitiendo static y dynamic testing en todos los niveles dentro de cada iteración. En Agile, se favorece documentación ligera y automatización extensa de regresión, con testing manual apoyado en técnicas basadas en experiencia (4.4).</div>
<table class="kv-table"><tr><th>2.1.2 — Buenas prácticas de testing (independientes del SDLC)</th></tr>
<tr><td>Cada actividad de desarrollo tiene su actividad de prueba correspondiente</td></tr>
<tr><td>Cada nivel de prueba tiene objetivos específicos y distintos, evitando redundancia</td></tr>
<tr><td>El análisis y diseño de prueba para un nivel comienza durante la fase de desarrollo correspondiente (early testing)</td></tr>
<tr><td>Los testers revisan work products tan pronto como hay borradores disponibles (shift left)</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>2.1.3 — Testing como impulsor del desarrollo (test-first).</strong></div>
<table class="kv-table"><tr><th>Enfoque</th><th>Cómo funciona</th></tr>
<tr><td>TDD (Test-Driven Development)</td><td>Dirige la codificación mediante test cases (en vez de diseño extenso): se escribe el test primero, luego el código para satisfacerlo, luego se refactoriza test y código</td></tr>
<tr><td>ATDD (Acceptance Test-Driven Development)</td><td>Deriva tests de los criterios de aceptación como parte del diseño del sistema — se escriben antes de desarrollar esa parte de la aplicación (ver 4.5.3)</td></tr>
<tr><td>BDD (Behavior-Driven Development)</td><td>Expresa el comportamiento deseado en lenguaje natural simple, fácil de entender para stakeholders — usualmente formato Given/When/Then — y se traduce automáticamente a tests ejecutables</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>2.1.4 — DevOps y Testing.</strong> Enfoque organizacional que busca sinergia uniendo desarrollo (incluido testing) y operaciones. Requiere un cambio cultural, promueve autonomía de equipo, feedback rápido, toolchains integradas, CI y CD.</div>
<table class="kv-table"><tr><th>Beneficios de DevOps para testing</th><th>Riesgos y desafíos</th></tr>
<tr><td>Feedback rápido sobre calidad de código</td><td>Definir y establecer el pipeline de entrega DevOps</td></tr>
<tr><td>CI promueve shift left (código de calidad + tests de componente + análisis estático)</td><td>Introducir y mantener herramientas CI/CD</td></tr>
<tr><td>Procesos automatizados facilitan entornos de prueba estables</td><td>La automatización requiere recursos adicionales, difícil de establecer/mantener</td></tr>
<tr><td>Mayor visibilidad de características no-funcionales</td><td>El testing manual (perspectiva del usuario) sigue siendo necesario</td></tr>
<tr><td>Menor riesgo de regresión por la escala de tests automatizados</td><td></td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>2.1.5 — Shift Left.</strong> Es el principio de early testing aplicado: hacer testing más temprano en el SDLC, sin descuidar el testing tardío. Buenas prácticas: revisar la especificación desde la perspectiva del tester; escribir test cases antes del código; usar CI/CD con tests de componente automatizados; completar análisis estático antes del dynamic testing; realizar testing no-funcional desde el nivel de componente cuando sea posible.</div>
<div class="concept-intro" style="margin-top:14px"><strong>2.1.6 — Retrospectivas y mejora de procesos.</strong> Se realizan en hitos (fin de proyecto, iteración, release). Preguntas clave: ¿qué funcionó y debe mantenerse?, ¿qué no funcionó y puede mejorarse?, ¿cómo incorporar las mejoras? Beneficios: mayor efectividad/eficiencia de prueba, mejor calidad de testware, cohesión y aprendizaje de equipo, mejor calidad del test basis, mejor cooperación entre desarrollo y testing.</div>
  </div>
  <div id="fc2-2" class="tab-panel">
<div class="concept-intro"><strong>2.2.1 — Los 5 niveles de prueba</strong> del syllabus: grupos de actividades de prueba organizadas y gestionadas juntas, cada uno una instancia del proceso de prueba en una fase de desarrollo dada.</div>
<div class="diagram-card">
<svg viewBox="0 0 640 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Los cinco niveles de prueba en progresion: component testing enfocado en componentes aislados, component integration testing en las interfaces entre componentes, system testing en el comportamiento del sistema completo, system integration testing en las interfaces con otros sistemas, y acceptance testing enfocado en validar que el sistema cumple las necesidades del negocio">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="5" y="45" width="118" height="60" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="64" y="68" font-size="9" font-weight="700" fill="var(--accent)" text-anchor="middle">Component</text>
    <text x="64" y="80" font-size="9" font-weight="700" fill="var(--accent)" text-anchor="middle">Testing</text>
    <text x="64" y="94" font-size="7.5" fill="var(--text-muted)" text-anchor="middle">componentes aislados</text>

    <rect x="133" y="45" width="118" height="60" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="192" y="62" font-size="8.5" font-weight="700" fill="var(--accent)" text-anchor="middle">Component</text>
    <text x="192" y="74" font-size="8.5" font-weight="700" fill="var(--accent)" text-anchor="middle">Integration</text>
    <text x="192" y="94" font-size="7.5" fill="var(--text-muted)" text-anchor="middle">interfaces entre componentes</text>

    <rect x="261" y="45" width="118" height="60" rx="7" fill="var(--accent)" fill-opacity="0.85" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="320" y="68" font-size="9" font-weight="700" fill="white" text-anchor="middle">System</text>
    <text x="320" y="80" font-size="9" font-weight="700" fill="white" text-anchor="middle">Testing</text>
    <text x="320" y="94" font-size="7.5" fill="white" text-anchor="middle">sistema completo</text>

    <rect x="389" y="45" width="118" height="60" rx="7" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
    <text x="448" y="62" font-size="8.5" font-weight="700" fill="#92400E" text-anchor="middle">System</text>
    <text x="448" y="74" font-size="8.5" font-weight="700" fill="#92400E" text-anchor="middle">Integration</text>
    <text x="448" y="94" font-size="7.5" fill="#92400E" text-anchor="middle">interfaces con otros sistemas</text>

    <rect x="517" y="45" width="118" height="60" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="576" y="68" font-size="9" font-weight="700" fill="var(--green)" text-anchor="middle">Acceptance</text>
    <text x="576" y="80" font-size="9" font-weight="700" fill="var(--green)" text-anchor="middle">Testing</text>
    <text x="576" y="94" font-size="7.5" fill="var(--text-muted)" text-anchor="middle">necesidades del negocio</text>

    <g stroke="var(--text-muted)" stroke-width="1.3" fill="var(--text-muted)">
      <line x1="123" y1="75" x2="129" y2="75"/><path d="M129,71 L137,75 L129,79 Z"/>
      <line x1="251" y1="75" x2="257" y2="75"/><path d="M257,71 L265,75 L257,79 Z"/>
      <line x1="379" y1="75" x2="385" y2="75"/><path d="M385,71 L393,75 L385,79 Z"/>
      <line x1="507" y1="75" x2="513" y2="75"/><path d="M513,71 L521,75 L513,79 Z"/>
    </g>
  </g>
</svg>
<div class="diagram-caption">Cada nivel se distingue por: test object, objetivos de prueba, test basis, defectos/failures típicos, y enfoque/responsabilidades — para evitar solapamiento entre niveles.</div>
</div>
<table class="kv-table"><tr><th>Nivel</th><th>Enfoque</th></tr>
<tr><td>Component Testing (unit testing)</td><td>Componentes en aislamiento; requiere test harnesses/frameworks; normalmente lo hacen los desarrolladores en su entorno</td></tr>
<tr><td>Component Integration Testing</td><td>Interfaces e interacciones entre componentes; depende mucho de la estrategia de integración (bottom-up, top-down, big-bang)</td></tr>
<tr><td>System Testing</td><td>Comportamiento y capacidades del sistema completo, incluyendo testing funcional end-to-end y no-funcional; puede hacerlo un equipo independiente</td></tr>
<tr><td>System Integration Testing</td><td>Interfaces entre el sistema bajo prueba y otros sistemas/servicios externos; requiere entornos similares al operativo</td></tr>
<tr><td>Acceptance Testing</td><td>Validación y demostración de disponibilidad para el despliegue; idealmente la hacen los usuarios previstos. Formas: UAT, operational acceptance, contractual, regulatory, alpha y beta testing</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>2.2.2 — Los 4 tipos de prueba</strong> (grupos de actividades relacionadas a características de calidad específicas, aplicables en cada nivel):</div>
<table class="kv-table"><tr><th>Tipo</th><th>Qué evalúa</th></tr>
<tr><td>Functional testing</td><td>Las funciones que el componente/sistema debe realizar ("qué" hace) — completitud, corrección y adecuación funcional</td></tr>
<tr><td>Non-functional testing</td><td>Atributos distintos a lo funcional ("qué tan bien" se comporta) — según ISO/IEC 25010: performance efficiency, compatibility, usability, reliability, security, maintainability, portability, safety</td></tr>
<tr><td>Black-box testing</td><td>Basado en especificación, deriva tests de documentación sin referencia a la estructura interna (Cap. 4.2)</td></tr>
<tr><td>White-box testing</td><td>Basado en estructura, deriva tests de la implementación/estructura interna (Cap. 4.3)</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>2.2.3 — Confirmation Testing vs. Regression Testing.</strong></div>
<table class="kv-table"><tr><th></th><th>Confirmation Testing</th><th>Regression Testing</th></tr>
<tr><td>Objetivo</td><td>Confirma que un defecto original fue corregido exitosamente</td><td>Confirma que un cambio (o fix) no causó consecuencias adversas en otras partes</td></tr>
<tr><td>Cómo</td><td>Re-ejecutar tests que fallaban por el defecto, o agregar tests nuevos que cubran el cambio</td><td>Puede afectar el mismo componente, otros componentes del sistema, o sistemas conectados — se recomienda un análisis de impacto previo</td></tr>
<tr><td>Automatización</td><td>—</td><td>Fuerte candidata a automatización, ya que las suites de regresión crecen con cada iteración/release</td></tr>
</table>
  </div>
  <div id="fc2-3" class="tab-panel">
<div class="concept-intro"><strong>2.3 — Maintenance Testing.</strong> El mantenimiento puede ser correctivo, adaptativo a cambios del entorno, o de mejora de rendimiento/mantenibilidad. Puede involucrar releases planeados o no planeados (hotfixes). Un análisis de impacto ayuda a decidir si un cambio debe hacerse, según sus consecuencias potenciales en otras áreas del sistema.</div>
<table class="kv-table"><tr><th>Alcance depende de</th><th>Triggers de mantenimiento</th></tr>
<tr><td>Grado de riesgo del cambio</td><td>Modificaciones (mejoras planeadas, cambios correctivos, hotfixes)</td></tr>
<tr><td>Tamaño del sistema existente</td><td>Upgrades o migraciones del entorno operativo (incluye tests de conversión de datos)</td></tr>
<tr><td>Tamaño del cambio</td><td>Retiro del sistema (puede requerir testing de archivado de datos y procedimientos de restauración)</td></tr>
</table>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el Capítulo 2...</p>
</div>`,

'istqb-ch3': `
<div class="concept-intro"><strong>Capítulo 3 del syllabus CTFL (80 min).</strong> Cubre el testing que <strong>no ejecuta</strong> el software: reviews y análisis estático — su valor, el proceso formal de review, los roles involucrados y los tipos de review según su formalidad.</div>
<div class="tab-group-fc3">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'fc3-1','fc3')">3.1 Fundamentos</button>
    <button class="tab-btn" onclick="switchTab(this,'fc3-2','fc3')">3.2 Proceso de Review</button>
  </div>
  <div id="fc3-1" class="tab-panel active">
<div class="concept-intro">A diferencia del dynamic testing, en static testing el software bajo prueba <strong>no necesita ejecutarse</strong>. Se evalúan código, especificaciones de proceso, arquitectura u otros work products mediante examen manual (reviews) o con ayuda de herramientas (análisis estático). Static testing puede aplicarse tanto a verificación como a validación.</div>
<div class="concept-intro" style="margin-top:14px"><strong>3.1.1 — Work products examinables por static testing.</strong> Casi cualquier work product puede examinarse: especificaciones de requisitos, código fuente, test plans, test cases, product backlog items, test charters, documentación de proyecto, contratos y modelos. Para <strong>análisis estático</strong>, el work product necesita una estructura verificable (modelos, código, texto con sintaxis formal). No son apropiados para static testing los work products difíciles de interpretar por humanos y que no deberían analizarse con herramientas (ej. código ejecutable de terceros por razones legales).</div>
<div class="concept-intro" style="margin-top:14px"><strong>3.1.2 — Valor de static testing.</strong> Detecta defectos en las fases más tempranas del SDLC (principio de early testing), e identifica defectos que dynamic testing no puede detectar (código inalcanzable, patrones de diseño mal implementados, defectos en work products no-ejecutables). Aunque los reviews tienen costo, el costo total del proyecto suele ser menor que sin reviews, porque se gasta menos tiempo arreglando defectos tarde.</div>
<div class="concept-intro" style="margin-top:14px"><strong>3.1.3 — Diferencias entre static y dynamic testing.</strong></div>
<table class="kv-table"><tr><th>Static Testing</th><th>Dynamic Testing</th></tr>
<tr><td>Encuentra defectos <strong>directamente</strong></td><td>Causa failures, de los cuales se determinan los defectos mediante análisis posterior</td></tr>
<tr><td>Detecta más fácilmente defectos en rutas de código raramente ejecutadas</td><td>Requiere que esas rutas se ejecuten realmente</td></tr>
<tr><td>Aplica a work products no-ejecutables</td><td>Solo aplica a work products ejecutables</td></tr>
<tr><td>Mide características no dependientes de ejecución (ej. mantenibilidad)</td><td>Mide características dependientes de ejecución (ej. performance efficiency)</td></tr>
</table>
<div class="alert-card">💡 Defectos más fáciles/baratos de encontrar con static testing: inconsistencias/ambigüedades en requisitos, defectos de diseño (estructuras de BD ineficientes), ciertos defectos de código (variables no declaradas, código inalcanzable/duplicado, complejidad excesiva), desviaciones de estándares, especificaciones de interfaz incorrectas, ciertas vulnerabilidades de seguridad (buffer overflows), y brechas de cobertura del test basis.</div>
  </div>
  <div id="fc3-2" class="tab-panel">
<div class="concept-intro"><strong>3.2.1 — Beneficios del feedback temprano y frecuente.</strong> Poca participación de los stakeholders puede resultar en un producto que no cumple su visión — con retrabajos costosos, plazos incumplidos, y hasta fallo completo del proyecto. El feedback frecuente previene malentendidos sobre requisitos y ayuda al equipo a enfocarse en las features de mayor valor y menor riesgo.</div>
<div class="concept-intro" style="margin-top:14px"><strong>3.2.2 — Actividades del proceso de review</strong> (según ISO/IEC 20246).</div>
<div class="diagram-card">
<svg viewBox="0 0 640 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Las cinco actividades del proceso de review: planning, review initiation, individual review, communication and analysis, y fixing and reporting">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="5" y="35" width="120" height="50" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="65" y="64" font-size="9.5" font-weight="700" fill="var(--accent)" text-anchor="middle">Planning</text>

    <rect x="135" y="35" width="120" height="50" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="195" y="57" font-size="9" font-weight="700" fill="var(--accent)" text-anchor="middle">Review</text>
    <text x="195" y="69" font-size="9" font-weight="700" fill="var(--accent)" text-anchor="middle">Initiation</text>

    <rect x="265" y="35" width="120" height="50" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="325" y="57" font-size="9" font-weight="700" fill="var(--accent)" text-anchor="middle">Individual</text>
    <text x="325" y="69" font-size="9" font-weight="700" fill="var(--accent)" text-anchor="middle">Review</text>

    <rect x="395" y="35" width="130" height="50" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
    <text x="460" y="57" font-size="8.5" font-weight="700" fill="#92400E" text-anchor="middle">Communication</text>
    <text x="460" y="69" font-size="8.5" font-weight="700" fill="#92400E" text-anchor="middle">&amp; Analysis</text>

    <rect x="535" y="35" width="100" height="50" rx="6" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="585" y="57" font-size="8.5" font-weight="700" fill="var(--green)" text-anchor="middle">Fixing &amp;</text>
    <text x="585" y="69" font-size="8.5" font-weight="700" fill="var(--green)" text-anchor="middle">Reporting</text>

    <g stroke="var(--text-muted)" stroke-width="1.3" fill="var(--text-muted)">
      <line x1="125" y1="60" x2="131" y2="60"/><path d="M131,56 L139,60 L131,64 Z"/>
      <line x1="255" y1="60" x2="261" y2="60"/><path d="M261,56 L269,60 L261,64 Z"/>
      <line x1="385" y1="60" x2="391" y2="60"/><path d="M391,56 L399,60 L391,64 Z"/>
      <line x1="525" y1="60" x2="531" y2="60"/><path d="M531,56 L539,60 L531,64 Z"/>
    </g>
  </g>
</svg>
<div class="diagram-caption">Si un work product es muy grande, el proceso puede invocarse varias veces. Cuanto más formal el review, más tareas se necesitan en cada actividad.</div>
</div>
<table class="kv-table"><tr><th>Actividad</th><th>Qué ocurre</th></tr>
<tr><td>Planning</td><td>Se define el alcance: propósito, work product, características de calidad a evaluar, áreas de foco, exit criteria, información de soporte, esfuerzo y cronograma</td></tr>
<tr><td>Review initiation</td><td>Asegurar que todos los participantes tienen acceso al work product, entienden su rol y responsabilidades</td></tr>
<tr><td>Individual review</td><td>Cada reviewer evalúa la calidad, identifica anomalías/recomendaciones/preguntas usando técnicas de review (checklist-based, scenario-based), y las registra</td></tr>
<tr><td>Communication and analysis</td><td>Las anomalías (no necesariamente defectos) se analizan y discuten en una reunión de review; se decide status, ownership y acciones</td></tr>
<tr><td>Fixing and reporting</td><td>Se crea un reporte de defecto por cada uno; al cumplir exit criteria, el work product se acepta y se reportan los resultados</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>3.2.3 — Roles y responsabilidades en reviews.</strong></div>
<table class="kv-table"><tr><th>Rol</th><th>Responsabilidad</th></tr>
<tr><td>Manager</td><td>Decide qué se revisa y provee recursos (staff, tiempo)</td></tr>
<tr><td>Author</td><td>Crea y corrige el work product bajo revisión</td></tr>
<tr><td>Moderator (facilitator)</td><td>Asegura que la reunión funcione: mediación, gestión del tiempo, ambiente seguro para hablar libremente</td></tr>
<tr><td>Scribe (recorder)</td><td>Recopila anomalías de los reviewers y registra decisiones/nuevas anomalías de la reunión</td></tr>
<tr><td>Reviewer</td><td>Realiza el review — puede ser alguien del proyecto, un experto de dominio, u otro stakeholder</td></tr>
<tr><td>Review leader</td><td>Responsabilidad general del review: decide quién participa, cuándo y dónde ocurre</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>3.2.4 — Tipos de review</strong> (de menos a más formal).</div>
<table class="kv-table"><tr><th>Tipo</th><th>Características</th></tr>
<tr><td>Informal review</td><td>Sin proceso definido, sin output documentado formal — objetivo principal: detectar anomalías</td></tr>
<tr><td>Walkthrough</td><td>Liderado por el autor — evalúa calidad, educa a reviewers, genera consenso, genera ideas nuevas, motiva al autor a mejorar. El review individual previo es opcional</td></tr>
<tr><td>Technical Review</td><td>Realizado por reviewers técnicamente calificados, liderado por un moderador — busca consenso técnico además de detectar anomalías</td></tr>
<tr><td>Inspection</td><td>El tipo más formal — sigue el proceso genérico completo; objetivo principal: encontrar el máximo número de anomalías; se recolectan métricas para mejorar el SDLC. <strong>El autor no puede ser review leader ni scribe</strong></td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>3.2.5 — Factores de éxito de los reviews:</strong> objetivos claros y exit criteria medibles (nunca evaluar a los participantes como objetivo); elegir el tipo de review apropiado; revisar en fragmentos pequeños; dar feedback a stakeholders y autores; dar tiempo adecuado de preparación; apoyo de la gerencia; hacer de los reviews parte de la cultura organizacional; entrenamiento adecuado; y facilitar bien las reuniones.</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el Capítulo 3...</p>
</div>`,

'istqb-ch4': `
<div class="concept-intro"><strong>Capítulo 4 del syllabus CTFL (390 min — el capítulo más extenso).</strong> Las técnicas de prueba ayudan a diseñar, de forma sistemática, un conjunto de test cases relativamente pequeño pero suficiente. Se clasifican en black-box, white-box, experience-based, y los enfoques colaborativos que buscan prevenir defectos, no solo detectarlos.</div>
<div class="tab-group-fc4">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'fc4-1','fc4')">4.2 Black-Box</button>
    <button class="tab-btn" onclick="switchTab(this,'fc4-2','fc4')">4.3 White-Box</button>
    <button class="tab-btn" onclick="switchTab(this,'fc4-3','fc4')">4.4 Experience-Based</button>
    <button class="tab-btn" onclick="switchTab(this,'fc4-4','fc4')">4.5 Collaboration-Based</button>
  </div>
  <div id="fc4-1" class="tab-panel active">
<div class="concept-intro"><strong>4.1 — Overview.</strong> Black-box (basadas en especificación) son independientes de la implementación — si el código cambia pero el comportamiento requerido se mantiene, los test cases siguen siendo útiles. White-box (basadas en estructura) solo pueden crearse tras el diseño/implementación. Experience-based aprovechan el conocimiento y experiencia del tester, y son complementarias a las otras dos.</div>
<div class="concept-intro" style="margin-top:14px"><strong>4.2.1 — Equivalence Partitioning (EP)</strong> (FL-4.2.1, K3): divide los datos en particiones donde se asume que todos los elementos se procesan de la misma forma. Si un test de un valor de la partición detecta un defecto, ese mismo defecto debería detectarse con cualquier otro valor de la misma partición — por eso un test por partición es suficiente. Las particiones no deben solaparse y deben ser conjuntos no vacíos. Una partición con valores válidos es una <strong>valid partition</strong>; con valores inválidos, <strong>invalid partition</strong>.</div>
<div class="diagram-card">
<svg viewBox="0 0 600 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ejemplo de Equivalence Partitioning sobre un campo de velocidad valido entre 0 y 250 kilometros por hora: particion invalida negativa, particion valida, y particion invalida positiva, con los valores de frontera marcados en -1, 0, 250 y 251">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="10" y="45" width="140" height="35" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.2"/>
    <text x="80" y="67" font-size="9.5" font-weight="700" fill="#B91C1C" text-anchor="middle">Inválida: (-∞, -1]</text>

    <rect x="150" y="45" width="300" height="35" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.2"/>
    <text x="300" y="67" font-size="9.5" font-weight="700" fill="var(--green)" text-anchor="middle">Válida: [0, 250]</text>

    <rect x="450" y="45" width="140" height="35" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.2"/>
    <text x="520" y="67" font-size="9.5" font-weight="700" fill="#B91C1C" text-anchor="middle">Inválida: [251, +∞)</text>

    <g font-size="8.5" fill="var(--text-muted)" text-anchor="middle">
      <line x1="150" y1="80" x2="150" y2="95" stroke="var(--text-muted)" stroke-width="1"/>
      <text x="150" y="108">0</text>
      <line x1="450" y1="80" x2="450" y2="95" stroke="var(--text-muted)" stroke-width="1"/>
      <text x="450" y="108">250</text>
    </g>
    <text x="300" y="118" font-size="9" fill="var(--accent)" text-anchor="middle">Un test por partición basta: 3 particiones → 3 tests mínimo</text>
  </g>
</svg>
<div class="diagram-caption">Cuando hay múltiples sets de particiones (ej. varios parámetros de entrada), el criterio de cobertura más simple es <b>Each Choice coverage</b>: exige ejercitar cada partición de cada set al menos una vez, sin considerar combinaciones entre sets.</div>
</div>
<div class="concept-intro" style="margin-top:14px"><strong>4.2.2 — Boundary Value Analysis (BVA)</strong> (K3): ejercita los límites de particiones <em>ordenadas</em>. Los defectos típicos ocurren donde los límites implementados están mal ubicados (arriba/abajo de su posición correcta) u omitidos.</div>
<table class="kv-table"><tr><th>Variante</th><th>Coverage items por límite</th><th>Ejemplo con rango [0,250]</th></tr>
<tr><td>2-value BVA</td><td>El valor límite y su vecino más cercano en la partición adyacente</td><td>Para el límite 250: se prueban 250 y 251</td></tr>
<tr><td>3-value BVA</td><td>El valor límite y ambos vecinos (uno de cada lado)</td><td>Para el límite 250: se prueban 249, 250 y 251</td></tr>
</table>
<div class="alert-card">💡 3-value BVA es más riguroso: detecta defectos que 2-value BVA puede pasar por alto. Ejemplo del syllabus: si la decisión <code>if (x &lt;= 10)</code> se implementa incorrectamente como <code>if (x &lt; 10)</code>, ningún dato de 2-value BVA (x=10, x=11) detecta el defecto — pero x=9 (de 3-value BVA) sí lo detecta.</div>
<div class="concept-intro" style="margin-top:14px"><strong>4.2.3 — Decision Table Testing</strong> (K3): registra lógica compleja (reglas de negocio) — combinaciones de condiciones que resultan en distintas acciones. Filas = condiciones/acciones; columnas = reglas de decisión (combinaciones únicas).</div>
<div class="code-block"><div class="code-lang">Notación oficial de decision tables</div><pre>
Condiciones:  T = true (se cumple) | F = false (no se cumple)
              — = irrelevante para el resultado | N/A = combinación infactible
Acciones:     X = la acción debe ocurrir | (en blanco) = no debe ocurrir

Ejemplo — acceso a un sistema:
Condición: ¿Usuario autenticado?     T   T   F   F
Condición: ¿Tiene permiso admin?     T   F   T   F
─────────────────────────────────────────────────
Acción: Acceso concedido             X   .   .   .
Acción: Redirigir a login            .   .   X   X
Acción: Mostrar "sin permiso"        .   X   .   .</pre></div>
<div class="alert-card">💡 Una tabla completa (full) tiene columnas para cada combinación posible; puede simplificarse eliminando combinaciones infactibles, o minimizarse fusionando columnas donde alguna condición no afecta el resultado (los algoritmos de minimización quedan fuera del alcance del syllabus). Coverage = columnas ejercitadas ÷ columnas factibles totales.</div>
<div class="concept-intro" style="margin-top:14px"><strong>4.2.4 — State Transition Testing</strong> (K3): modela el sistema como estados y transiciones válidas, iniciadas por un evento (con guard condition opcional). Sintaxis: <code>evento [guard condition] / acción</code>. Un <strong>state table</strong> es equivalente a un diagrama de estados — a diferencia del diagrama, muestra explícitamente las transiciones inválidas (celdas vacías).</div>
<table class="kv-table"><tr><th>Criterio de cobertura</th><th>Coverage items</th><th>Fuerza relativa</th></tr>
<tr><td>All states coverage</td><td>Los estados</td><td>La más débil — se puede lograr sin ejercitar todas las transiciones</td></tr>
<tr><td>Valid transitions coverage (0-switch)</td><td>Transiciones válidas individuales</td><td>El criterio más usado; lograrlo garantiza 100% all states coverage</td></tr>
<tr><td>All transitions coverage</td><td>Todas las transiciones de la state table (válidas e intentando las inválidas)</td><td>La más fuerte — mínimo recomendado para software mission/safety-critical; garantiza los otros dos</td></tr>
</table>
<div class="alert-card">💡 Al probar transiciones inválidas, se recomienda probar solo <strong>una</strong> por test case, para evitar "defect masking" — cuando un defecto oculta la detección de otro.</div>
  </div>
  <div id="fc4-2" class="tab-panel">
<div class="concept-intro">El syllabus se enfoca en dos técnicas white-box (basadas en código) por su popularidad y simplicidad: <strong>statement testing</strong> y <strong>branch testing</strong>.</div>
<table class="kv-table"><tr><th>Técnica</th><th>Coverage items</th><th>Qué garantiza el 100%</th></tr>
<tr><td>4.3.1 Statement Testing</td><td>Sentencias ejecutables</td><td>Cada statement con un defecto se ejecuta al menos una vez — pero NO detecta defectos dependientes de datos (ej. división entre cero solo si el denominador es 0) ni asegura que toda la lógica de decisión fue probada</td></tr>
<tr><td>4.3.2 Branch Testing</td><td>Ramas (transferencias de control, condicionales o incondicionales) del control flow graph</td><td>Todas las ramas (true/false de un if, casos de un switch, salir/continuar un loop) se ejercitan — pero puede no detectar defectos que requieren un camino específico</td></tr>
</table>
<div class="alert-card">💡 Dato clave de examen: <strong>Branch coverage subsume a statement coverage</strong> — cualquier conjunto de tests que logra 100% branch coverage logra también 100% statement coverage (pero no al revés).</div>
<div class="concept-intro" style="margin-top:14px"><strong>4.3.3 — El valor del white-box testing.</strong> Fortaleza: considera toda la implementación, facilitando la detección de defectos incluso cuando la especificación es vaga, desactualizada o incompleta. Debilidad correspondiente: si el software no implementa uno o más requisitos, white-box testing puede no detectar esos defectos de omisión. Puede usarse en static testing (ej. dry runs de código) y con pseudocódigo. El black-box testing por sí solo no mide cobertura real de código — las medidas white-box dan una medición objetiva y guían la generación de tests adicionales.</div>
  </div>
  <div id="fc4-3" class="tab-panel">
<table class="kv-table"><tr><th>Técnica</th><th>En qué consiste</th></tr>
<tr><td>4.4.1 Error Guessing</td><td>Anticipa errores/defectos/failures basándose en el conocimiento del tester: cómo funcionó la app antes, qué tipos de errores suelen cometer los desarrolladores, qué failures ocurrieron en apps similares. Categorías típicas: input, output, lógica, cómputo, interfaces, datos. Los <strong>fault attacks</strong> son una forma de implementarlo: crear una lista de posibles errores/defectos y diseñar tests que los expongan</td></tr>
<tr><td>4.4.2 Exploratory Testing</td><td>Diseño, ejecución y evaluación simultáneos, mientras el tester aprende del test object. A menudo estructurado como <strong>session-based testing</strong>: sesión con time-box definido, guiada por un <strong>test charter</strong> con objetivos de prueba, seguida de un debriefing. Útil cuando hay pocas/inadecuadas especificaciones o presión de tiempo; más efectivo si el tester tiene experiencia, conocimiento de dominio y habilidades como curiosidad y creatividad</td></tr>
<tr><td>4.4.3 Checklist-Based Testing</td><td>El tester diseña, implementa y ejecuta tests para cubrir condiciones de una checklist, construida con base en experiencia o conocimiento de por qué falla el software. No debe incluir ítems verificables automáticamente, ni servir de entry/exit criteria, ni ser demasiado general. Los ítems suelen redactarse como preguntas verificables individualmente. Deben actualizarse regularmente — pero sin volverse demasiado largas</td></tr>
</table>
<div class="alert-card">💡 Las técnicas experience-based pueden detectar defectos que las técnicas black-box y white-box pasan por alto — son complementarias, no sustitutas.</div>
  </div>
  <div id="fc4-4" class="tab-panel">
<div class="concept-intro">A diferencia de las técnicas anteriores (enfocadas en <strong>detección</strong> de defectos), los enfoques colaborativos se enfocan también en la <strong>prevención</strong> mediante colaboración y comunicación.</div>
<div class="concept-intro" style="margin-top:14px"><strong>4.5.1 — Escritura colaborativa de historias de usuario.</strong> Las user stories tienen 3 aspectos críticos, las "3 C's":</div>
<table class="kv-table"><tr><th>C</th><th>Qué es</th></tr>
<tr><td>Card</td><td>El medio que describe la historia (ficha, entrada en un tablero electrónico)</td></tr>
<tr><td>Conversation</td><td>Explica cómo se usará el software (documentada o verbal)</td></tr>
<tr><td>Confirmation</td><td>Los criterios de aceptación (ver 4.5.2)</td></tr>
</table>
<div class="concept-intro">Formato típico: <em>"Como [rol], quiero [objetivo], para poder [valor de negocio resultante]"</em>, seguido de los criterios de aceptación. Buenas historias de usuario deben ser <strong>INVEST</strong>: Independent, Negotiable, Valuable, Estimable, Small, Testable. Si un stakeholder no sabe cómo probar una historia, puede indicar que no está clara, que no refleja algo valioso, o que necesita ayuda para probarla.</div>
<div class="concept-intro" style="margin-top:14px"><strong>4.5.2 — Criterios de aceptación.</strong> Condiciones que la implementación de una historia debe cumplir para ser aceptada — pueden verse como las condiciones de prueba que los tests deben ejercitar. Sirven para: definir el alcance, generar consenso, describir escenarios positivos y negativos, servir de base para acceptance testing, y permitir planeación/estimación precisas.</div>
<table class="kv-table"><tr><th>Formato</th><th>Ejemplo</th></tr>
<tr><td>Scenario-oriented</td><td>Formato Given/When/Then usado en BDD</td></tr>
<tr><td>Rule-oriented</td><td>Lista de verificación con viñetas, o tabla de mapeo entrada-salida</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>4.5.3 — Acceptance Test-Driven Development (ATDD)</strong> (K3): enfoque test-first donde los test cases se crean antes de implementar la historia, por miembros del equipo con distintas perspectivas (cliente, desarrollador, tester).</div>
<div class="diagram-card">
<svg viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flujo de ATDD: taller de especificacion donde se analizan y escriben los criterios de aceptacion, luego creacion de los test cases basados en esos criterios, primero positivos y luego negativos, y finalmente cobertura de caracteristicas no funcionales">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="5" y="30" width="180" height="45" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="95" y="50" font-size="9.5" font-weight="700" fill="var(--accent)" text-anchor="middle">Specification Workshop</text>
    <text x="95" y="64" font-size="8" fill="var(--text-muted)" text-anchor="middle">analizar criterios de aceptación</text>

    <rect x="210" y="30" width="170" height="45" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="295" y="50" font-size="9.5" font-weight="700" fill="var(--accent)" text-anchor="middle">Test cases positivos</text>
    <text x="295" y="64" font-size="8" fill="var(--text-muted)" text-anchor="middle">comportamiento correcto esperado</text>

    <rect x="405" y="30" width="185" height="45" rx="6" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="497" y="50" font-size="9.5" font-weight="700" fill="var(--green)" text-anchor="middle">Negativos + No-funcionales</text>
    <text x="497" y="64" font-size="8" fill="var(--text-muted)" text-anchor="middle">excepciones, performance, usabilidad</text>

    <g stroke="var(--text-muted)" stroke-width="1.3" fill="var(--text-muted)">
      <line x1="185" y1="52" x2="206" y2="52"/><path d="M206,48 L214,52 L206,56 Z"/>
      <line x1="380" y1="52" x2="401" y2="52"/><path d="M401,48 L409,52 L401,56 Z"/>
    </g>
  </g>
</svg>
<div class="diagram-caption">Los test cases deben cubrir todas las características de la historia sin exceder su alcance, y ningún par de test cases debe describir la misma característica. Cuando se capturan en un formato compatible con un framework de automatización, se vuelven <b>requisitos ejecutables</b>.</div>
</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el Capítulo 4...</p>
</div>`,

'istqb-ch5': `
<div class="concept-intro"><strong>Capítulo 5 del syllabus CTFL (335 min).</strong> Cómo se gestiona el trabajo de prueba: planeación, gestión de riesgos, monitoreo/control/cierre, gestión de configuración y gestión de defectos.</div>
<div class="tab-group-fc5">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'fc5-1','fc5')">5.1 Test Planning</button>
    <button class="tab-btn" onclick="switchTab(this,'fc5-2','fc5')">5.2 Risk Management</button>
    <button class="tab-btn" onclick="switchTab(this,'fc5-3','fc5')">5.3 Monitoring &amp; Reporting</button>
    <button class="tab-btn" onclick="switchTab(this,'fc5-4','fc5')">5.4-5.5 CM &amp; Defectos</button>
  </div>
  <div id="fc5-1" class="tab-panel active">
<div class="concept-intro"><strong>5.1.1 — Propósito y contenido de un test plan.</strong> Documenta medios y cronograma para lograr los objetivos de prueba; sirve de comunicación con el equipo; demuestra adherencia (o desviación justificada) a la política y estrategia de pruebas.</div>
<table class="kv-table"><tr><th>Contenido típico de un test plan</th></tr>
<tr><td>Contexto de testing (alcance, objetivos, test basis)</td></tr>
<tr><td>Supuestos y restricciones del proyecto</td></tr>
<tr><td>Stakeholders (roles, responsabilidades, necesidades de capacitación)</td></tr>
<tr><td>Comunicación (formas y frecuencia, plantillas)</td></tr>
<tr><td>Risk register (riesgos de producto y proyecto)</td></tr>
<tr><td>Test approach (niveles, tipos, técnicas, entregables, entry/exit criteria, independencia, métricas, datos y entorno de prueba)</td></tr>
<tr><td>Presupuesto y cronograma</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>5.1.2 — Contribución del tester a la planeación de iteración y release.</strong> En release planning: escribir historias/criterios testeables, participar en análisis de riesgo, estimar esfuerzo, determinar el enfoque de prueba. En iteration planning: análisis detallado de riesgo de historias, determinar testabilidad, descomponer en tareas de prueba, estimar esfuerzo por tarea.</div>
<div class="concept-intro" style="margin-top:14px"><strong>5.1.3 — Entry Criteria y Exit Criteria.</strong></div>
<table class="kv-table"><tr><th></th><th>Entry Criteria</th><th>Exit Criteria</th></tr>
<tr><td>Define</td><td>Precondiciones para emprender una actividad</td><td>Qué se debe lograr para declarar la actividad completa</td></tr>
<tr><td>Ejemplos típicos</td><td>Recursos disponibles, testware disponible (test basis, requisitos testeables), calidad inicial adecuada (smoke tests pasados)</td><td>Medidas de exhaustividad (cobertura lograda, defectos sin resolver, densidad de defectos), criterios binarios sí/no (tests planeados ejecutados, static testing realizado)</td></tr>
<tr><td>En Agile</td><td>"Definition of Ready" para iniciar desarrollo/testing de una historia</td><td>"Definition of Done" — métricas objetivas del equipo para un ítem liberable</td></tr>
</table>
<div class="alert-card">💡 Agotar el tiempo o presupuesto también puede ser un exit criteria válido — es aceptable terminar el testing así si los stakeholders revisaron y aceptaron el riesgo de salir a producción sin más pruebas.</div>
<div class="concept-intro" style="margin-top:14px"><strong>5.1.4 — Técnicas de estimación</strong> (K3, FL-5.1.4).</div>
<table class="kv-table"><tr><th>Técnica</th><th>Cómo funciona</th></tr>
<tr><td>Estimación basada en ratios</td><td>Usa datos históricos de proyectos anteriores para derivar ratios "estándar". Ej: si el ratio desarrollo:testing fue 3:2 y el esfuerzo de desarrollo actual es 600 días-persona, el testing se estima en 400 días-persona</td></tr>
<tr><td>Extrapolación</td><td>Mide temprano en el proyecto actual y extrapola matemáticamente el esfuerzo restante — ideal en SDLC iterativos (ej. promediar el esfuerzo de las últimas 3 iteraciones)</td></tr>
<tr><td>Wideband Delphi</td><td>Técnica iterativa basada en expertos: cada uno estima en aislamiento; si hay desviaciones fuera de rango, se discuten y se repite hasta llegar a consenso. Planning Poker es una variante ágil común</td></tr>
<tr><td>Three-point estimation</td><td>Se estima lo optimista (a), lo más probable (m) y lo pesimista (b). E = (a + 4m + b) / 6, con desviación SD = (b − a) / 6. Ejemplo del syllabus: a=6, m=9, b=18 → E=10, SD=2 (entre 8 y 12 horas-persona)</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>5.1.5 — Priorización de test cases</strong> (K3).</div>
<table class="kv-table"><tr><th>Estrategia</th><th>Criterio de orden</th></tr>
<tr><td>Risk-based prioritization</td><td>Según los resultados del análisis de riesgo — se ejecutan primero los tests que cubren los riesgos más importantes</td></tr>
<tr><td>Coverage-based prioritization</td><td>Según cobertura lograda — primero los tests con mayor cobertura (variante: "additional coverage prioritization" prioriza cobertura incremental)</td></tr>
<tr><td>Requirements-based prioritization</td><td>Según la prioridad de los requisitos trazados a cada test case, definida por los stakeholders</td></tr>
</table>
<div class="alert-card">💡 Las dependencias entre test cases pueden forzar excepciones al orden ideal: si un test de alta prioridad depende de uno de baja prioridad, este último debe ejecutarse primero. También hay que considerar la disponibilidad de recursos (herramientas, entornos, personas).</div>
<div class="concept-intro" style="margin-top:14px"><strong>5.1.6 — Test Pyramid</strong> (K1).</div>
<div class="diagram-card">
<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Piramide de pruebas con tres capas: en la base unit tests, muchos, pequenos, aislados y rapidos; en el medio integration tests o service tests; y en la cima unos pocos end to end o UI tests, complejos y lentos">
  <g font-family="'Segoe UI',sans-serif">
    <polygon points="200,15 320,85 80,85" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/>
    <text x="200" y="58" font-size="10" font-weight="700" fill="#B91C1C" text-anchor="middle">UI / E2E Tests</text>
    <text x="200" y="72" font-size="8" fill="#B91C1C" text-anchor="middle">pocos, lentos, alto nivel</text>

    <polygon points="80,85 320,85 355,155 45,155" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
    <text x="200" y="125" font-size="10" font-weight="700" fill="#92400E" text-anchor="middle">Service / Integration Tests</text>

    <polygon points="45,155 355,155 390,215 10,215" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="200" y="190" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">Unit Tests</text>
    <text x="200" y="204" font-size="8" fill="var(--green)" text-anchor="middle">muchos, rápidos, aislados</text>
  </g>
</svg>
<div class="diagram-caption">A mayor altura en la pirámide: menor granularidad, menor aislamiento (más dependencia de otros elementos) y mayor tiempo de ejecución. El modelo original (Cohn 2009) define "unit tests", "service tests" y "UI tests" — otros modelos usan los test levels del syllabus (component/integration/end-to-end).</div>
</div>
<div class="concept-intro" style="margin-top:14px"><strong>5.1.7 — Testing Quadrants</strong> (Brian Marick) — agrupan niveles de prueba con tipos, actividades, técnicas y work products en Agile, según dos ejes: business-facing vs. technology-facing, y support the team vs. critique the product.</div>
<table class="kv-table"><tr><th>Cuadrante</th><th>Enfoque</th><th>Contiene</th></tr>
<tr><td>Q1</td><td>Technology facing, support the team</td><td>Component tests y component integration tests — automatizados, en CI</td></tr>
<tr><td>Q2</td><td>Business facing, support the team</td><td>Functional tests, ejemplos, user story tests, prototipos UX, API testing, simulaciones — manuales o automatizados</td></tr>
<tr><td>Q3</td><td>Business facing, critique the product</td><td>Exploratory testing, usability testing, UAT — orientados al usuario, a menudo manuales</td></tr>
<tr><td>Q4</td><td>Technology facing, critique the product</td><td>Smoke tests y tests no-funcionales (excepto usabilidad) — a menudo automatizados</td></tr>
</table>
  </div>
  <div id="fc5-2" class="tab-panel">
<div class="concept-intro">La gestión de riesgos incrementa la probabilidad de cumplir objetivos, mejora la calidad del producto y aumenta la confianza de los stakeholders. Actividades principales: <strong>risk analysis</strong> (identificación + evaluación) y <strong>risk control</strong> (mitigación + monitoreo). El enfoque de prueba basado en esto se llama <strong>risk-based testing</strong>.</div>
<div class="concept-intro" style="margin-top:14px"><strong>5.2.1 — Definición y atributos del riesgo.</strong> Un riesgo es un evento/amenaza/situación potencial cuya ocurrencia causa un efecto adverso, caracterizado por: <strong>risk likelihood</strong> (probabilidad, entre 0 y 1) y <strong>risk impact</strong> (consecuencias). Juntos determinan el <strong>risk level</strong> — a mayor nivel, más importante su tratamiento.</div>
<div class="concept-intro" style="margin-top:14px"><strong>5.2.2 — Project Risks vs. Product Risks.</strong></div>
<table class="kv-table"><tr><th></th><th>Project Risks</th><th>Product Risks</th></tr>
<tr><td>Relacionados con</td><td>Gestión y control del proyecto</td><td>Características de calidad del producto (ISO 25010)</td></tr>
<tr><td>Ejemplos</td><td>Problemas organizacionales (retrasos, estimaciones inexactas), de personas (habilidades insuficientes, conflictos), técnicos (scope creep), de proveedores</td><td>Funcionalidad faltante/incorrecta, cálculos erróneos, errores en tiempo de ejecución, arquitectura pobre, tiempo de respuesta inadecuado, vulnerabilidades de seguridad</td></tr>
<tr><td>Impacto si ocurren</td><td>Cronograma, presupuesto o alcance del proyecto</td><td>Insatisfacción del usuario, pérdida de ingresos/confianza/reputación, daño a terceros, costos de mantenimiento, sanciones, en casos extremos daño físico o muerte</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>5.2.3 — Análisis de riesgo de producto.</strong> Consiste en risk identification (generar una lista comprehensiva — brainstorming, workshops, entrevistas, diagramas causa-efecto) y risk assessment (categorizar, determinar likelihood/impact/level, priorizar, proponer manejo). El enfoque puede ser cuantitativo (risk level = likelihood × impact) o cualitativo (matriz de riesgo). Sus resultados determinan: alcance de prueba, niveles/tipos a realizar, técnicas y cobertura, esfuerzo estimado por tarea, priorización, y si hacen falta actividades adicionales a testing.</div>
<div class="concept-intro" style="margin-top:14px"><strong>5.2.4 — Control de riesgo de producto:</strong> risk mitigation (implementar las acciones propuestas para reducir el nivel) y risk monitoring (verificar que la mitigación funciona, mejorar la evaluación, identificar riesgos emergentes). Opciones de respuesta: mitigación vía testing, aceptación, transferencia, o plan de contingencia. Acciones de mitigación vía testing: elegir testers con experiencia adecuada al tipo de riesgo, aplicar el nivel apropiado de independencia, realizar reviews y análisis estático, aplicar técnicas y niveles de cobertura apropiados, aplicar los tipos de prueba que atienden las características afectadas, y realizar dynamic testing (incluida regresión).</div>
  </div>
  <div id="fc5-3" class="tab-panel">
<div class="concept-intro">Test monitoring recopila información sobre el testing para evaluar el progreso y si se cumplen los exit criteria. Test control usa esa información para dar directivas de guía y acción correctiva (ej. re-priorizar tests, re-evaluar entry/exit criteria, ajustar cronograma, agregar recursos).</div>
<div class="concept-intro" style="margin-top:14px"><strong>5.3.1 — Métricas usadas en testing</strong> (K1).</div>
<table class="kv-table"><tr><th>Categoría</th><th>Ejemplos</th></tr>
<tr><td>Project progress</td><td>Finalización de tareas, uso de recursos, esfuerzo de prueba</td></tr>
<tr><td>Test progress</td><td>Avance de implementación de test cases, preparación del entorno, tests corridos/no corridos, pasados/fallidos, tiempo de ejecución</td></tr>
<tr><td>Product quality</td><td>Disponibilidad, tiempo de respuesta, tiempo medio entre fallos</td></tr>
<tr><td>Defect</td><td>Número y prioridad de defectos encontrados/corregidos, densidad de defectos, defect detection percentage</td></tr>
<tr><td>Risk</td><td>Nivel de riesgo residual</td></tr>
<tr><td>Coverage</td><td>Cobertura de requisitos, cobertura de código</td></tr>
<tr><td>Cost</td><td>Costo de testing, costo organizacional de la calidad</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>5.3.2 — Reportes de prueba.</strong></div>
<table class="kv-table"><tr><th></th><th>Test Progress Report</th><th>Test Completion Report</th></tr>
<tr><td>Propósito</td><td>Apoyar el test control continuo</td><td>Resumir una actividad específica (nivel, ciclo, iteración) al completarse</td></tr>
<tr><td>Frecuencia</td><td>Regular (diaria, semanal)</td><td>Una vez, al final</td></tr>
<tr><td>Contenido</td><td>Periodo, progreso (adelantado/atrasado), impedimentos, métricas, riesgos nuevos/cambiados, plan del siguiente periodo</td><td>Resumen de pruebas, evaluación contra el plan original, desviaciones, impedimentos, métricas, riesgos no mitigados, defectos sin corregir, lecciones aprendidas</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>5.3.3 — Comunicar el estado del testing.</strong> Opciones: comunicación verbal, dashboards (CI/CD, task boards, burn-down charts), canales electrónicos, documentación en línea, reportes formales. La comunicación más formal suele ser mejor para equipos distribuidos.</div>
  </div>
  <div id="fc5-4" class="tab-panel">
<div class="concept-intro"><strong>5.4 — Configuration Management (CM).</strong> Disciplina para identificar, controlar y rastrear work products (test plans, estrategias, condiciones, casos, scripts, resultados, logs, reportes) como <strong>configuration items</strong>. Un ítem aprobado para testing se convierte en <strong>baseline</strong> y solo puede cambiar mediante un proceso formal de control de cambios — permitiendo revertir a un baseline anterior para reproducir resultados previos.</div>
<div class="concept-intro" style="margin-top:14px"><strong>5.5 — Defect Management</strong> (K3, FL-5.5.1: preparar un reporte de defecto). Las anomalías reportadas pueden resultar ser defectos reales u otra cosa (falso positivo, change request) — esto se resuelve durante el proceso. Flujo típico: registrar, analizar y clasificar, decidir la respuesta (corregir o dejar así), y cerrar.</div>
<table class="kv-table"><tr><th>Elemento del reporte de defecto</th></tr>
<tr><td>Identificador único</td></tr>
<tr><td>Título con resumen breve de la anomalía</td></tr>
<tr><td>Fecha de observación, organización emisora y autor (con su rol)</td></tr>
<tr><td>Identificación del test object y del entorno de prueba</td></tr>
<tr><td>Contexto del defecto (test case, actividad, fase del SDLC, técnica/checklist/datos usados)</td></tr>
<tr><td>Descripción del failure para reproducirlo (pasos, logs, capturas, grabaciones)</td></tr>
<tr><td>Resultados esperados y resultados reales</td></tr>
<tr><td>Severity (grado de impacto)</td></tr>
<tr><td>Priority (para corregir)</td></tr>
<tr><td>Status (open, deferred, duplicate, waiting to be fixed, awaiting confirmation testing, re-opened, closed, rejected)</td></tr>
<tr><td>Referencias (ej. al test case)</td></tr>
</table>
<div class="alert-card">💡 El ISO/IEC/IEEE 29119-3 estándar refiere a los reportes de defectos como "incident reports" y ofrece plantillas y ejemplos.</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el Capítulo 5...</p>
</div>`,

'istqb-ch6': `
<div class="concept-intro"><strong>Capítulo 6 del syllabus CTFL (20 min — el capítulo más corto).</strong> Cubre qué tipos de herramientas apoyan al testing y los beneficios/riesgos reales de automatizar.</div>
<div class="concept-intro"><strong>6.1 — Soporte de herramientas para testing</strong> (K2). Ejemplos de categorías (lista no exhaustiva):</div>
<table class="kv-table"><tr><th>Categoría</th><th>Qué aporta</th></tr>
<tr><td>Test management tools</td><td>Eficiencia gestionando SDLC, requisitos, tests, defectos, configuración</td></tr>
<tr><td>Static testing tools</td><td>Apoyan reviews y análisis estático</td></tr>
<tr><td>Test design and implementation tools</td><td>Facilitan generación de test cases, datos y procedimientos</td></tr>
<tr><td>Test execution and coverage tools</td><td>Ejecución automatizada y medición de cobertura</td></tr>
<tr><td>Non-functional testing tools</td><td>Permiten testing no-funcional difícil o imposible de hacer manualmente</td></tr>
<tr><td>DevOps tools</td><td>Soportan el pipeline DevOps, seguimiento de workflow, builds automatizados, CI/CD</td></tr>
<tr><td>Collaboration tools</td><td>Facilitan la comunicación</td></tr>
<tr><td>Herramientas de escalabilidad y despliegue</td><td>Máquinas virtuales, contenedores</td></tr>
</table>
<div class="alert-card">💡 El syllabus aclara que <strong>cualquier</strong> herramienta que asista al testing cuenta — incluso una hoja de cálculo es una herramienta de prueba en ese contexto.</div>
<div class="concept-intro" style="margin-top:14px"><strong>6.2 — Beneficios y riesgos de la automatización de pruebas</strong> (K1, FL-6.2.1). Adquirir una herramienta no garantiza éxito — requiere esfuerzo de introducción, mantenimiento y capacitación.</div>
<table class="kv-table"><tr><th>Beneficios potenciales</th><th>Riesgos potenciales</th></tr>
<tr><td>Ahorro de tiempo al reducir trabajo manual repetitivo</td><td>Expectativas poco realistas sobre la herramienta</td></tr>
<tr><td>Previene errores humanos simples (mayor consistencia y repetibilidad)</td><td>Estimaciones inexactas de tiempo/costo/esfuerzo de introducción y mantenimiento</td></tr>
<tr><td>Evaluación más objetiva (cobertura), mide cosas complicadas para humanos</td><td>Usar una herramienta cuando el testing manual es más apropiado</td></tr>
<tr><td>Acceso más fácil a información para gestión y reportes</td><td>Depender demasiado de la herramienta, ignorando el pensamiento crítico humano</td></tr>
<tr><td>Menor tiempo de ejecución → detección más temprana, feedback y time-to-market más rápidos</td><td>Dependencia del proveedor (puede cerrar, retirar la herramienta, dar mal soporte)</td></tr>
<tr><td>Más tiempo para que los testers diseñen tests nuevos, más profundos y efectivos</td><td>Software open-source que puede ser abandonado o requerir actualizaciones frecuentes</td></tr>
<tr><td></td><td>Incompatibilidad con la plataforma de desarrollo</td></tr>
<tr><td></td><td>Herramienta que no cumple requisitos regulatorios/de seguridad</td></tr>
</table>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el Capítulo 6...</p>
</div>`,

'istqb-glosario': `
<div class="concept-intro">Glosario con los términos clave (<em>keywords</em>) que el syllabus CTFL v4.0.1 declara al inicio de cada capítulo, con su definición tal como aparece en el cuerpo del documento oficial y un ejemplo aplicado. El glosario completo y autoritativo de ISTQB vive en <a href="http://glossary.istqb.org/" target="_blank" rel="noopener" style="color:var(--accent)">glossary.istqb.org</a> — este es un resumen de estudio, no un sustituto.</div>
<div class="tab-group-fcg">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'fcg-1','fcg')">Ch1 — Fundamentos</button>
    <button class="tab-btn" onclick="switchTab(this,'fcg-2','fcg')">Ch2-3 — SDLC &amp; Estático</button>
    <button class="tab-btn" onclick="switchTab(this,'fcg-3','fcg')">Ch4 — Técnicas</button>
    <button class="tab-btn" onclick="switchTab(this,'fcg-4','fcg')">Ch5-6 — Gestión &amp; Herramientas</button>
  </div>
  <div id="fcg-1" class="tab-panel active">
<table class="kv-table"><tr><th>Término</th><th>Definición</th><th>Ejemplo</th></tr>
<tr><td>Testing</td><td>Conjunto de actividades para descubrir defectos y evaluar la calidad de los work products de software</td><td>Ejecutar el caso de prueba "login con credenciales válidas" y comparar el resultado contra lo esperado</td></tr>
<tr><td>Quality / Quality Assurance</td><td>Testing es una forma de control de calidad orientada al producto; QA es un enfoque preventivo orientado al proceso</td><td>QA audita que se siga el checklist de code review; testing ejecuta la suite de regresión</td></tr>
<tr><td>Error / Defect / Failure / Root Cause</td><td>Cadena causal: un error humano produce un defecto en el código/documento, que puede resultar en un failure si se ejecuta; la causa raíz es el motivo fundamental del error</td><td>El programador confunde &lt;= con &lt; (error) → la condición queda mal (defect) → el sistema rechaza un valor válido (failure)</td></tr>
<tr><td>Coverage</td><td>El grado en que un test basis está ejercitado por un conjunto de tests, expresado como porcentaje</td><td>85% de los requisitos tienen al menos un test case asociado</td></tr>
<tr><td>Test basis</td><td>Cuerpo de conocimiento usado como base para diseñar test cases</td><td>Los requisitos funcionales, historias de usuario, o el propio código fuente</td></tr>
<tr><td>Test object</td><td>El work product que está siendo probado</td><td>El módulo de autenticación de la aplicación</td></tr>
<tr><td>Test condition</td><td>Un elemento testeable identificado durante el análisis de prueba</td><td>"El sistema debe rechazar contraseñas de menos de 8 caracteres"</td></tr>
<tr><td>Test case</td><td>Conjunto de precondiciones, entradas, acciones y resultados esperados diseñado para verificar el cumplimiento de un requisito</td><td>"Dado un usuario válido, cuando ingresa credenciales correctas, entonces accede al dashboard"</td></tr>
<tr><td>Test data</td><td>Los datos usados para ejecutar un test case</td><td>Un archivo CSV con 50 combinaciones de usuario/contraseña para probar el login</td></tr>
<tr><td>Test procedure</td><td>Secuencia de pasos para ejecutar un test case</td><td>Los pasos exactos clic-por-clic para ejecutar manualmente un test case en el navegador</td></tr>
<tr><td>Testware</td><td>Los work products producidos por las actividades de prueba (planes, casos, scripts, reportes, etc.)</td><td>El test plan, los test cases y el reporte de defectos de un proyecto</td></tr>
<tr><td>Traceability</td><td>Capacidad de vincular elementos del test basis con el testware asociado y viceversa</td><td>Una matriz que muestra qué test cases verifican el requisito REQ-015</td></tr>
<tr><td>Verification / Validation</td><td>Verification: ¿se cumple la especificación? Validation: ¿se cumple la necesidad real del usuario?</td><td>Verificar que el código sigue el diseño documentado (verification); un usuario confirma que la función resuelve su problema real (validation)</td></tr>
<tr><td>Test planning / monitoring / control / analysis / design / implementation / execution / completion</td><td>Las 8 actividades del proceso de prueba (sección 1.4.1)</td><td>Ver el diagrama de flujo del proceso de prueba en el Capítulo 1</td></tr>
<tr><td>Debugging</td><td>Encontrar, analizar y corregir la causa de un defecto — actividad del desarrollador, distinta de testing</td><td>Usar un debugger paso a paso para rastrear por qué una variable llega con un valor inesperado</td></tr>
</table>
  </div>
  <div id="fcg-2" class="tab-panel">
<table class="kv-table"><tr><th>Término</th><th>Definición</th><th>Ejemplo</th></tr>
<tr><td>Test level</td><td>Grupo de actividades de prueba organizadas y gestionadas juntas, en relación a una fase de desarrollo dada</td><td>Component testing, system testing, acceptance testing</td></tr>
<tr><td>Test type</td><td>Grupo de actividades de prueba relacionadas a características de calidad específicas, aplicables en cada nivel</td><td>Functional testing, non-functional testing, black-box, white-box</td></tr>
<tr><td>Component / Component integration testing</td><td>Prueba de componentes aislados / de las interfaces entre componentes</td><td>Probar la función <code>parse_can_frame()</code> sola vs. probar que se comunica bien con el módulo de logging</td></tr>
<tr><td>System / System integration testing</td><td>Prueba del sistema completo / de sus interfaces con otros sistemas externos</td><td>Probar la app completa end-to-end / probar la integración con la pasarela de pago externa</td></tr>
<tr><td>Acceptance testing</td><td>Validación y demostración de disponibilidad para el despliegue</td><td>El cliente prueba el sistema en su propio entorno antes de aceptar la entrega (UAT)</td></tr>
<tr><td>Functional / Non-functional testing</td><td>Evalúa qué hace el sistema / qué tan bien se comporta (ISO 25010)</td><td>Verificar que "enviar" funciona / medir el tiempo de respuesta bajo carga</td></tr>
<tr><td>Black-box / White-box testing</td><td>Basado en especificación sin ver el código / basado en la estructura interna</td><td>Probar con distintas entradas sin ver el código / diseñar un test que fuerza una rama específica del código</td></tr>
<tr><td>Confirmation testing / Regression testing</td><td>Confirma que un defecto se corrigió / confirma que un cambio no rompió nada más</td><td>Re-ejecutar el test que fallaba / correr toda la suite tras un cambio</td></tr>
<tr><td>Shift left</td><td>Mover las actividades de testing hacia fases más tempranas del SDLC</td><td>Revisar los requisitos antes de que exista código</td></tr>
<tr><td>Maintenance testing</td><td>Testing de un sistema ya en operación, tras modificación, migración o retiro</td><td>Probar el sistema tras migrar a un nuevo servidor</td></tr>
<tr><td>Static testing / Dynamic testing</td><td>Examina sin ejecutar (reviews, análisis estático) / ejecuta el software</td><td>Una inspección de un documento de diseño / correr un test automatizado contra la API</td></tr>
<tr><td>Review / Informal review / Walkthrough / Technical review / Inspection</td><td>Evaluación de un work product; los 4 tipos van de menor a mayor formalidad</td><td>Un colega lee tu PR (informal) → el moderador lidera una inspección formal con roles y métricas</td></tr>
<tr><td>Anomaly</td><td>Cualquier condición que se desvía de lo esperado, identificada en un review (no necesariamente un defecto confirmado)</td><td>Un reviewer marca una frase ambigua en un requisito para discutirla</td></tr>
<tr><td>Formal review</td><td>Review que sigue todas las actividades del proceso formal (planning, initiation, individual review, communication/analysis, fixing/reporting)</td><td>Una inspection completa con moderador, scribe y métricas registradas</td></tr>
</table>
  </div>
  <div id="fcg-3" class="tab-panel">
<table class="kv-table"><tr><th>Término</th><th>Definición</th><th>Ejemplo</th></tr>
<tr><td>Black-box test technique</td><td>Deriva tests de la especificación, sin referencia a la estructura interna</td><td>Equivalence partitioning, boundary value analysis, decision table testing, state transition testing</td></tr>
<tr><td>White-box test technique</td><td>Deriva tests del análisis de la estructura interna del test object</td><td>Statement testing, branch testing</td></tr>
<tr><td>Experience-based test technique</td><td>Usa el conocimiento y experiencia del tester para diseñar tests</td><td>Error guessing, exploratory testing, checklist-based testing</td></tr>
<tr><td>Equivalence partitioning</td><td>Divide los datos en particiones donde el sistema se comporta igual; un test por partición basta</td><td>Para un campo de edad 18-65: clase inválida menor, clase válida, clase inválida mayor</td></tr>
<tr><td>Boundary value analysis</td><td>Ejercita los límites de particiones ordenadas (2-value o 3-value)</td><td>Para el límite superior 250: probar 249, 250 y 251 (3-value)</td></tr>
<tr><td>Decision table testing</td><td>Prueba combinaciones de condiciones que resultan en distintas acciones, usando notación T/F/—/N/A</td><td>Combinar "usuario autenticado" × "tiene permiso admin" en sus 4 combinaciones</td></tr>
<tr><td>State transition testing</td><td>Prueba las transiciones entre estados de un sistema, incluyendo transiciones inválidas</td><td>En un semáforo: verificar que de "rojo" solo se puede pasar a "verde"</td></tr>
<tr><td>Coverage item</td><td>Una entidad o propiedad usada como base para la cobertura de prueba (partición, rama, transición, etc.)</td><td>Cada partición de equivalencia identificada es un coverage item</td></tr>
<tr><td>Statement coverage / Branch coverage</td><td>% de sentencias ejecutadas / % de ramas (true/false) ejercitadas</td><td>Un reporte de coverage.py que indica 87% de líneas cubiertas</td></tr>
<tr><td>Error guessing</td><td>Anticipar errores/defectos con base en la experiencia del tester</td><td>Probar a propósito con campos vacíos porque "ahí siempre falla algo"</td></tr>
<tr><td>Exploratory testing</td><td>Diseño, ejecución y evaluación simultáneos mientras el tester aprende del sistema</td><td>Un tester navega libremente una pantalla nueva durante 30 minutos</td></tr>
<tr><td>Checklist-based testing</td><td>Diseñar y ejecutar tests para cubrir condiciones de una lista de verificación</td><td>Usar un checklist de accesibilidad en cada pantalla nueva</td></tr>
<tr><td>Collaboration-based test approach</td><td>Enfoque enfocado en prevenir defectos mediante colaboración y comunicación, no solo detectarlos</td><td>Escritura colaborativa de historias de usuario, ATDD</td></tr>
<tr><td>Acceptance criteria / ATDD</td><td>Condiciones que la historia debe cumplir para ser aceptada / enfoque test-first que las convierte en tests antes de codificar</td><td>Given/When/Then escrito en un taller de especificación con negocio, dev y testing</td></tr>
</table>
  </div>
  <div id="fcg-4" class="tab-panel">
<table class="kv-table"><tr><th>Término</th><th>Definición</th><th>Ejemplo</th></tr>
<tr><td>Test plan / Test planning</td><td>Documento que describe objetivos, recursos y procesos de un proyecto de prueba / la actividad de crearlo</td><td>El plan que indica qué módulos se prueban, con qué técnicas y en qué fechas</td></tr>
<tr><td>Test strategy</td><td>Enfoque general de testing a nivel organización/programa</td><td>"Todo proyecto usa testing basado en riesgo y exige mínimo 80% de coverage"</td></tr>
<tr><td>Entry criteria / Exit criteria</td><td>Precondiciones para iniciar una actividad / condiciones para declararla completa</td><td>Entorno disponible y smoke tests pasados (entry); cobertura &gt;80% y cero defectos críticos (exit)</td></tr>
<tr><td>Test pyramid</td><td>Modelo que muestra distinta granularidad de tests por capa: muchos tests pequeños en la base, pocos tests grandes en la cima</td><td>Muchos unit tests, algunos integration tests, pocos end-to-end tests</td></tr>
<tr><td>Testing quadrants</td><td>Modelo de Brian Marick que agrupa niveles y tipos de prueba en 4 cuadrantes (Q1-Q4) según business/technology facing y support/critique</td><td>Q1: component tests automatizados en CI; Q3: exploratory testing manual</td></tr>
<tr><td>Risk / Risk likelihood / Risk impact / Risk level</td><td>Evento potencial con efecto adverso; su probabilidad; sus consecuencias; la combinación de ambas</td><td>Riesgo: "el pago falla bajo carga"; likelihood media, impact alto → risk level alto</td></tr>
<tr><td>Project risk / Product risk</td><td>Riesgo de gestión/control del proyecto / riesgo de las características de calidad del producto</td><td>Retraso por falta de personal (project) / vulnerabilidad de seguridad (product)</td></tr>
<tr><td>Risk analysis / Risk control</td><td>Identificación + evaluación de riesgos / mitigación + monitoreo</td><td>Brainstorming de riesgos y asignarles nivel (analysis); implementar acciones para reducirlos (control)</td></tr>
<tr><td>Risk-based testing</td><td>Enfoque de prueba donde las actividades se seleccionan, priorizan y gestionan según el análisis y control de riesgo</td><td>El módulo de frenos se prueba primero y más exhaustivamente que el módulo de radio</td></tr>
<tr><td>Test monitoring / Test control</td><td>Recopilar información sobre el progreso / tomar acciones correctivas basadas en esa información</td><td>Un dashboard que muestra tests pasados hoy (monitoring); re-priorizar tests por un riesgo nuevo (control)</td></tr>
<tr><td>Test progress report / Test completion report</td><td>Reporte periódico durante el testing / reporte único al finalizar una actividad</td><td>Reporte semanal de avance / reporte de cierre de sprint con métricas y lecciones aprendidas</td></tr>
<tr><td>Defect report / Defect management</td><td>Documento que describe un defecto detectado / el proceso completo de manejarlo desde su descubrimiento hasta su cierre</td><td>Un ticket en Jira con severidad, prioridad y pasos para reproducir</td></tr>
<tr><td>Test automation</td><td>Uso de herramientas de software para realizar o apoyar actividades de prueba</td><td>Un script de Selenium que ejecuta el flujo de login automáticamente en cada build</td></tr>
</table>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el glosario ISTQB CTFL...</p>
</div>`,

'istqb-examen': `
<div class="concept-intro">Examen de práctica con preguntas <strong>originales</strong> (no del banco oficial de examen) diseñadas a partir de los Learning Objectives reales de cada capítulo del syllabus CTFL v4.0.1, respetando su nivel cognitivo: <strong>K1</strong> (recordar), <strong>K2</strong> (entender) y <strong>K3</strong> (aplicar). Haz clic en cada pregunta para revelar la respuesta correcta y su explicación.</div>

<div class="quiz-section">
<div class="quiz-title">📖 Capítulo 1 — Fundamentals of Testing</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>Un defecto de código nunca llega a ejecutarse porque está en una rama muerta del programa. ¿Qué principio de testing ilustra mejor esta situación? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Exhaustive testing is impossible &nbsp;B) <strong>Testing shows the presence, not the absence, of defects</strong> &nbsp;C) Defects cluster together &nbsp;D) Tests wear out<br><br>
  <b>Respuesta correcta: B.</b> Aunque el defecto existe, si nunca se ejecuta no produce un failure — por eso "no encontrar defectos" con testing no prueba que el sistema esté libre de ellos: solo se demuestra la presencia de defectos, nunca su ausencia total.
  <div class="a-tip">💡 FL-1.3.1 (K2): Explain the seven testing principles.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>Un equipo audita que se siga correctamente el proceso de code review antes de cada merge. ¿Esto es un ejemplo de qué concepto? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Testing &nbsp;B) Debugging &nbsp;C) <strong>Quality Assurance</strong> &nbsp;D) Root cause analysis<br><br>
  <b>Respuesta correcta: C.</b> QA es un enfoque preventivo orientado al proceso: se basa en la premisa de que si se sigue un buen proceso correctamente, se obtiene un buen producto. Testing, en cambio, es correctivo y orientado al producto.
  <div class="a-tip">💡 FL-1.2.2 (K1): Recall the relation between testing and quality assurance.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-basico">K1</span>Cuando dynamic testing dispara un failure, ¿qué actividad se encarga de reproducirlo, diagnosticarlo y corregirlo? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Test control &nbsp;B) <strong>Debugging</strong> &nbsp;C) Test monitoring &nbsp;D) Confirmation testing<br><br>
  <b>Respuesta correcta: B.</b> Debugging es una actividad separada de testing: reproduce el failure, diagnostica (encuentra el defecto) y lo corrige. El confirmation testing posterior verifica que el fix resolvió el problema.
  <div class="a-tip">💡 FL-1.1.2 (K2): Differentiate testing from debugging.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>¿Cuál es la diferencia principal entre el rol de "test management" y el rol de "testing" según el syllabus? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Son exactamente lo mismo &nbsp;B) <strong>Test management se enfoca en planning/monitoring/control/completion; testing se enfoca en analysis/design/implementation/execution</strong> &nbsp;C) Solo puede haber un test manager por organización &nbsp;D) El rol de testing no existe en Agile<br><br>
  <b>Respuesta correcta: B.</b> El rol de test management toma responsabilidad general del proceso y liderazgo, enfocado en planning, monitoring, control y completion. El rol de testing toma responsabilidad del aspecto técnico/de ingeniería: analysis, design, implementation y execution. Una misma persona puede desempeñar ambos.
  <div class="a-tip">💡 FL-1.4.5 (K2): Compare the different roles in testing.</div>
  </div>
</div>
</div>

<div class="quiz-section">
<div class="quiz-title">📖 Capítulo 2 — Testing Throughout the SDLC</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>Un equipo escribe los test cases antes de implementar cada historia de usuario, usando lenguaje natural en formato Given/When/Then. ¿Qué enfoque describe esto? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) TDD &nbsp;B) ATDD &nbsp;C) <strong>BDD</strong> &nbsp;D) Exploratory testing<br><br>
  <b>Respuesta correcta: C.</b> BDD (Behavior-Driven Development) expresa el comportamiento deseado con test cases en lenguaje natural simple, usualmente en formato Given/When/Then, fácil de entender para todos los stakeholders.
  <div class="a-tip">💡 FL-2.1.3 (K1): Recall the examples of test-first approaches to development.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-basico">K1</span>¿Cuál de estas NO es una buena práctica de testing independiente del SDLC, según el syllabus? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Cada actividad de desarrollo tiene su actividad de prueba correspondiente &nbsp;B) Los testers se involucran en revisar work products tan pronto hay borradores &nbsp;C) <strong>Todo el testing debe posponerse hasta que el código esté completo</strong> &nbsp;D) El análisis y diseño de prueba inicia durante la fase de desarrollo correspondiente<br><br>
  <b>Respuesta correcta: C.</b> Esto contradice directamente el principio de early testing y el concepto de shift left — testing debe iniciar lo antes posible, no esperar a que el código esté "completo".
  <div class="a-tip">💡 FL-2.1.2 (K1): Recall good testing practices that apply to all software development lifecycles.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>Tras corregir un defecto en el módulo de pagos, el equipo ejecuta toda la suite de tests para verificar que otros módulos no se vieron afectados. ¿Qué tipo de testing es este? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Confirmation testing &nbsp;B) <strong>Regression testing</strong> &nbsp;C) Acceptance testing &nbsp;D) Component integration testing<br><br>
  <b>Respuesta correcta: B.</b> Regression testing confirma que un cambio (incluido un fix ya confirmado) no causó consecuencias adversas en otras partes del sistema — a diferencia de confirmation testing, que solo verifica que el defecto original se corrigió.
  <div class="a-tip">💡 FL-2.2.3 (K2): Distinguish confirmation testing from regression testing.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>Un tester prueba el flujo completo de compra de un producto de principio a fin, verificando que el sistema hace lo que se supone que debe hacer. ¿Qué tipo de test type está aplicando principalmente? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Non-functional testing &nbsp;B) White-box testing &nbsp;C) <strong>Functional testing</strong> &nbsp;D) Maintenance testing<br><br>
  <b>Respuesta correcta: C.</b> Functional testing evalúa las funciones que el sistema debe realizar — el "qué" hace, verificando completitud, corrección y adecuación funcional.
  <div class="a-tip">💡 FL-2.2.2 (K2): Distinguish the different test types.</div>
  </div>
</div>
</div>

<div class="quiz-section">
<div class="quiz-title">📖 Capítulo 3 — Static Testing</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>¿Cuál de estos defectos es más fácil/barato de encontrar con static testing que con dynamic testing? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Un problema de tiempo de respuesta bajo carga &nbsp;B) <strong>Una inconsistencia en el documento de requisitos</strong> &nbsp;C) Un error que solo ocurre con datos de producción &nbsp;D) Un problema de compatibilidad entre navegadores<br><br>
  <b>Respuesta correcta: B.</b> El syllabus lista explícitamente los defectos en requisitos (inconsistencias, ambigüedades, contradicciones) como típicamente más fáciles/baratos de encontrar con static testing — no requieren ejecutar nada, solo examinar el documento.
  <div class="a-tip">💡 FL-3.1.3 (K2): Compare and contrast static testing and dynamic testing.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-basico">K1</span>En una inspección formal, ¿qué rol asegura la ejecución efectiva de la reunión, incluyendo mediación y gestión del tiempo? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Author &nbsp;B) Scribe &nbsp;C) <strong>Moderator</strong> &nbsp;D) Manager<br><br>
  <b>Respuesta correcta: C.</b> El Moderator (o facilitator) asegura la ejecución efectiva de la reunión de review: mediación, gestión del tiempo y un ambiente seguro para que todos hablen libremente. El Scribe registra las anomalías; el Author no puede ser moderator ni scribe en una inspection.
  <div class="a-tip">💡 FL-3.2.3 (K1): Recall which responsibilities are assigned to the principal roles when performing reviews.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>Un review es liderado por el autor del work product, con el objetivo de educar a los reviewers y generar consenso, sin requerir un review individual previo. ¿Qué tipo de review es? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Informal review &nbsp;B) <strong>Walkthrough</strong> &nbsp;C) Technical review &nbsp;D) Inspection<br><br>
  <b>Respuesta correcta: B.</b> El walkthrough es liderado por el autor y puede tener múltiples objetivos: evaluar calidad, educar reviewers, generar consenso, generar ideas nuevas. El review individual previo es opcional, no requerido.
  <div class="a-tip">💡 FL-3.2.4 (K2): Compare and contrast the different review types.</div>
  </div>
</div>
</div>

<div class="quiz-section">
<div class="quiz-title">📖 Capítulo 4 — Test Analysis and Design</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-complejo">K3</span>Para un campo de porcentaje válido de 0 a 100, usando 3-value BVA, ¿qué valores se deben probar para el límite superior? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Solo 100 &nbsp;B) 100 y 101 &nbsp;C) <strong>99, 100 y 101</strong> &nbsp;D) 0, 50 y 100<br><br>
  <b>Respuesta correcta: C.</b> En 3-value BVA, para cada valor límite hay 3 coverage items: el valor límite y ambos vecinos. Para el límite superior 100: 99 (vecino inferior), 100 (el límite) y 101 (vecino superior, ya en la partición inválida).
  <div class="a-tip">💡 FL-4.2.2 (K3): Use boundary value analysis to derive test cases.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>Un conjunto de tests logra 100% branch coverage en un módulo. ¿Qué se puede afirmar con certeza sobre el statement coverage de ese mismo conjunto de tests? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Es imposible saberlo sin más información &nbsp;B) <strong>También logra 100% statement coverage</strong> &nbsp;C) El statement coverage será menor al 100% &nbsp;D) No hay relación entre ambas métricas<br><br>
  <b>Respuesta correcta: B.</b> El syllabus es explícito: branch coverage subsume a statement coverage. Cualquier conjunto de tests que logra 100% branch coverage logra también 100% statement coverage (pero no necesariamente al revés).
  <div class="a-tip">💡 FL-4.3.2 (K2): Explain branch testing.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>Un tester explora libremente una nueva pantalla durante una sesión de 30 minutos con un time-box definido, guiado por un test charter, y al final discute los hallazgos con el equipo. ¿Qué técnica describe mejor esto? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Error guessing &nbsp;B) Checklist-based testing &nbsp;C) <strong>Exploratory testing (session-based)</strong> &nbsp;D) Decision table testing<br><br>
  <b>Respuesta correcta: C.</b> Esto es exploratory testing estructurado como session-based testing: time-box definido, guiado por un test charter con objetivos de prueba, seguido de un debriefing con los stakeholders interesados.
  <div class="a-tip">💡 FL-4.4.2 (K2): Explain exploratory testing.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-basico">K1</span>Según el acrónimo INVEST, ¿cuál de estas NO es una característica deseable de una buena historia de usuario? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Independent &nbsp;B) Negotiable &nbsp;C) <strong>Exhaustive</strong> &nbsp;D) Testable<br><br>
  <b>Respuesta correcta: C.</b> INVEST significa Independent, Negotiable, Valuable, Estimable, Small, Testable. "Exhaustive" no forma parte del acrónimo — de hecho, "Small" apunta justo en la dirección contraria.
  <div class="a-tip">💡 FL-4.5.1 (K2): Explain how to write user stories in collaboration with developers and business representatives.</div>
  </div>
</div>
</div>

<div class="quiz-section">
<div class="quiz-title">📖 Capítulo 5 — Managing the Test Activities</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-complejo">K3</span>Tres expertos estiman el esfuerzo de una tarea usando three-point estimation: optimista (a)=8, más probable (m)=12, pesimista (b)=22 horas-persona. ¿Cuál es la estimación final (E)? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) 12 horas &nbsp;B) <strong>13 horas</strong> &nbsp;C) 14 horas &nbsp;D) 22 horas<br><br>
  <b>Respuesta correcta: B.</b> E = (a + 4m + b) / 6 = (8 + 4×12 + 22) / 6 = (8 + 48 + 22) / 6 = 78 / 6 = 13 horas-persona.
  <div class="a-tip">💡 FL-5.1.4 (K3): Use estimation techniques to calculate the required test effort.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>¿En qué cuadrante de las Testing Quadrants caen los smoke tests y los tests no-funcionales (excepto usabilidad)? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Q1 (technology facing, support the team) &nbsp;B) Q2 (business facing, support the team) &nbsp;C) Q3 (business facing, critique the product) &nbsp;D) <strong>Q4 (technology facing, critique the product)</strong><br><br>
  <b>Respuesta correcta: D.</b> Q4 contiene smoke tests y tests no-funcionales (excepto usabilidad, que está en Q3) — son technology facing porque no se enfocan en el negocio directamente, y critique the product porque miden el comportamiento contra expectativas.
  <div class="a-tip">💡 FL-5.1.7 (K2): Summarize the testing quadrants and their relationships with test levels and test types.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-basico">K1</span>¿Cómo se calcula el risk level en el enfoque cuantitativo de análisis de riesgo? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Solo con el risk impact &nbsp;B) Solo con el risk likelihood &nbsp;C) <strong>Risk likelihood × risk impact</strong> &nbsp;D) Risk likelihood + risk impact<br><br>
  <b>Respuesta correcta: C.</b> En el enfoque cuantitativo, el risk level se calcula como la multiplicación de risk likelihood (probabilidad, entre 0 y 1) y risk impact (consecuencias).
  <div class="a-tip">💡 FL-5.2.1 (K1): Identify risk level by using risk likelihood and risk impact.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-complejo">K3</span>Al preparar un reporte de defecto durante dynamic testing, ¿cuál de estos elementos es parte del contenido típico según el syllabus? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Solo el identificador único y la fecha &nbsp;B) <strong>Identificador, resultados esperados vs. reales, severidad, prioridad y status</strong> &nbsp;C) Únicamente el nombre del desarrollador responsable &nbsp;D) El código fuente completo del módulo afectado<br><br>
  <b>Respuesta correcta: B.</b> El syllabus lista un conjunto completo de elementos: identificador único, título, fecha/autor, identificación del test object y entorno, contexto, descripción para reproducir, resultados esperados y reales, severity, priority, status y referencias.
  <div class="a-tip">💡 FL-5.5.1 (K3): Prepare a defect report.</div>
  </div>
</div>
</div>

<div class="quiz-section">
<div class="quiz-title">📖 Capítulo 6 — Test Tools</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-basico">K1</span>Según el syllabus, ¿cuál de estos NO es un riesgo típico de la automatización de pruebas? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Expectativas poco realistas sobre la herramienta &nbsp;B) Dependencia excesiva del proveedor &nbsp;C) <strong>Mayor necesidad de pensamiento crítico humano</strong> &nbsp;D) Incompatibilidad con la plataforma de desarrollo<br><br>
  <b>Respuesta correcta: C.</b> Es al revés: el riesgo real es depender <em>demasiado</em> de la herramienta, ignorando la necesidad del pensamiento crítico humano — no que la automatización aumente esa necesidad.
  <div class="a-tip">💡 FL-6.2.1 (K1): Recall the benefits and risks of test automation.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>¿Qué categoría de herramienta facilita la generación de test cases, datos de prueba y procedimientos de prueba? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Test management tools &nbsp;B) <strong>Test design and implementation tools</strong> &nbsp;C) Collaboration tools &nbsp;D) DevOps tools<br><br>
  <b>Respuesta correcta: B.</b> Las test design and implementation tools facilitan específicamente la generación de test cases, test data y test procedures — distintas de las de gestión (test management) o de ejecución/cobertura.
  <div class="a-tip">💡 FL-6.1.1 (K2): Explain how different types of test tools support testing.</div>
  </div>
</div>
</div>

<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el examen de práctica...</p>
</div>`,

};  // fin ISTQB_RICH
