
// ══════════════════════════════════════════════════════════════════
//  GENAI_RICH — ISTQB Certified Tester Specialist Level:
//  Testing with Generative AI (CT-GenAI) v1.0 — 25/07/2025
//  Contenido fiel a la estructura oficial de 5 capítulos del syllabus.
// ══════════════════════════════════════════════════════════════════
const GENAI_RICH = {

'genai-ch1': `
<div class="concept-intro"><strong>Capítulo 1 del syllabus CT-GenAI (100 min).</strong> Antes de usar GenAI en testing hace falta vocabulario común: qué tipo de IA es GenAI dentro del panorama más amplio, cómo funciona un LLM a nivel de concepto, y qué capacidades concretas aporta a las actividades de testing.</div>
<div class="tab-group-gc1">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'gc1-1','gc1')">1.1 Fundamentos y conceptos clave</button>
    <button class="tab-btn" onclick="switchTab(this,'gc1-2','gc1')">1.2 GenAI en Software Testing</button>
  </div>
  <div id="gc1-1" class="tab-panel active">
<div class="concept-intro"><strong>1.1.1 — Espectro de la IA.</strong> El campo de la IA abarca distintas familias de tecnología, cada una con su forma de resolver problemas.</div>
<div class="diagram-card">
<svg viewBox="0 0 620 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Espectro de la inteligencia artificial: IA simbolica basada en reglas, machine learning clasico basado en datos, deep learning con redes neuronales, y generative AI que crea contenido nuevo aprendiendo patrones de los datos de entrenamiento">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="5" y="35" width="140" height="60" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="75" y="58" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Symbolic AI</text>
    <text x="75" y="72" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">reglas y símbolos</text>
    <text x="75" y="84" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">lógicos explícitos</text>

    <rect x="160" y="35" width="140" height="60" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="230" y="58" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Classical ML</text>
    <text x="230" y="72" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">datos + selección</text>
    <text x="230" y="84" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">manual de features</text>

    <rect x="315" y="35" width="140" height="60" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="385" y="58" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Deep Learning</text>
    <text x="385" y="72" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">redes neuronales,</text>
    <text x="385" y="84" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">features automáticos</text>

    <rect x="470" y="35" width="145" height="60" rx="7" fill="var(--accent)" fill-opacity="0.85" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="542" y="58" font-size="10" font-weight="700" fill="white" text-anchor="middle">Generative AI</text>
    <text x="542" y="72" font-size="8.5" fill="white" text-anchor="middle">crea contenido nuevo</text>
    <text x="542" y="84" font-size="8.5" fill="white" text-anchor="middle">imitando patrones aprendidos</text>

    <g stroke="var(--text-muted)" stroke-width="1.4" fill="var(--text-muted)">
      <line x1="145" y1="65" x2="157" y2="65"/><path d="M157,61 L165,65 L157,69 Z"/>
      <line x1="300" y1="65" x2="312" y2="65"/><path d="M312,61 L320,65 L312,69 Z"/>
      <line x1="455" y1="65" x2="467" y2="65"/><path d="M467,61 L475,65 L467,69 Z"/>
    </g>
  </g>
</svg>
<div class="diagram-caption">Cada enfoque resuelve problemas de forma distinta. La ventaja clave de GenAI para testing: usa modelos <b>ya pre-entrenados</b>, aplicables directamente a tareas de prueba sin necesitar una fase de entrenamiento adicional — aunque esto trae consigo riesgos propios (ver Capítulo 3).</div>
</div>
<table class="kv-table"><tr><th>Enfoque</th><th>Cómo funciona</th></tr>
<tr><td>Symbolic AI</td><td>Sistema basado en reglas que imita la toma de decisiones humana, representando el conocimiento con símbolos y lógica explícita</td></tr>
<tr><td>Classical Machine Learning</td><td>Enfoque orientado a datos que requiere preparación de datos, selección manual de features y entrenamiento del modelo — útil para tareas como categorización de defectos</td></tr>
<tr><td>Deep Learning</td><td>Usa redes neuronales para aprender features automáticamente de grandes datasets (imágenes, audio, texto) sin definirlas a mano — aunque suele requerir anotación de datos, ajuste del modelo o validación de resultados</td></tr>
<tr><td>Generative AI</td><td>Usa técnicas de deep learning para <strong>crear</strong> contenido nuevo (texto, imágenes, código) aprendiendo e imitando patrones de sus datos de entrenamiento</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>1.1.2 — Fundamentos de GenAI y LLMs.</strong> Los LLM (Large Language Models) se basan en la arquitectura <em>generative pre-trained transformer</em>, entrenados con datasets enormes (libros, artículos, sitios web). Los SLM (Small Language Models) son versiones compactas, con menos parámetros, pensadas para soluciones más ligeras y enfocadas.</div>
<table class="kv-table"><tr><th>Concepto</th><th>Qué es</th></tr>
<tr><td>Tokenization</td><td>Proceso de dividir el texto en unidades más pequeñas (tokens) — desde un carácter hasta una sub-palabra o palabra completa</td></tr>
<tr><td>Embeddings</td><td>Representación numérica de un token como un vector, que codifica su relación semántica, sintáctica y contextual — tokens con significado similar quedan cerca entre sí en ese espacio</td></tr>
<tr><td>Transformer</td><td>Arquitectura de red neuronal que procesa el contexto de secuencias largas de texto y aprende cómo se relacionan los tokens entre sí, prediciendo el siguiente token durante la inferencia</td></tr>
<tr><td>Context window</td><td>Cantidad de texto previo (en tokens) que el modelo puede considerar al generar una respuesta — una ventana más grande mantiene coherencia en pasajes largos, pero aumenta la complejidad computacional</td></tr>
</table>
<div class="alert-card">💡 El transformer genera texto <strong>estadísticamente plausible</strong> según los datos de entrenamiento y el prompt — pero plausible no es lo mismo que correcto. Además, los LLM son <strong>no-deterministas</strong>: la misma entrada puede producir salidas distintas en ejecuciones diferentes, debido a la naturaleza probabilística de la inferencia (ver mitigación en 3.1.4).</div>
<div class="concept-intro" style="margin-top:14px"><strong>1.1.3 — Foundation, Instruction-Tuned y Reasoning LLMs.</strong> Los LLM se desarrollan en etapas de entrenamiento progresivamente especializadas.</div>
<div class="diagram-card">
<svg viewBox="0 0 600 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Progresion de especializacion de los LLM: modelo foundation de proposito general, afinado con instruction-tuning para seguir instrucciones humanas, y luego especializado como reasoning LLM para razonamiento estructurado paso a paso">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="10" y="30" width="180" height="50" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="100" y="52" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Foundation LLM</text>
    <text x="100" y="66" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">propósito general, pre-entrenado</text>

    <rect x="215" y="30" width="180" height="50" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="305" y="52" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Instruction-Tuned LLM</text>
    <text x="305" y="66" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">afinado para seguir instrucciones</text>

    <rect x="420" y="30" width="180" height="50" rx="7" fill="var(--accent)" fill-opacity="0.85" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="510" y="52" font-size="10" font-weight="700" fill="white" text-anchor="middle">Reasoning LLM</text>
    <text x="510" y="66" font-size="8.5" fill="white" text-anchor="middle">razonamiento estructurado paso a paso</text>

    <g stroke="var(--text-muted)" stroke-width="1.4" fill="var(--text-muted)">
      <line x1="190" y1="55" x2="211" y2="55"/><path d="M211,51 L219,55 L211,59 Z"/>
      <line x1="395" y1="55" x2="416" y2="55"/><path d="M416,51 L424,55 L416,59 Z"/>
    </g>
  </g>
</svg>
<div class="diagram-caption">Los modelos reasoning (o instruction-tuned, a veces llamados "non-reasoning") se eligen según la complejidad y las exigencias de razonamiento de la tarea de testing específica.</div>
</div>
<div class="concept-intro" style="margin-top:14px"><strong>1.1.4 — LLMs multimodales y modelos de visión-lenguaje.</strong> Los LLM multimodales extienden el transformer para procesar texto, imágenes, audio y video. Los modelos de visión-lenguaje (un subtipo) integran información visual y textual para tareas como describir imágenes o analizar consistencia entre una descripción y una captura de pantalla.</div>
<div class="alert-card">💡 Aplicación directa a testing: un LLM con capacidad de visión-lenguaje puede analizar screenshots y wireframes de GUI junto con su descripción textual (historia de usuario, reporte de defecto) para detectar discrepancias entre lo esperado y lo visualmente observado, y generar test cases enriquecidos que combinan texto e indicios visuales.</div>
  </div>
  <div id="gc1-2" class="tab-panel">
<div class="concept-intro"><strong>1.2.1 — Capacidades clave de los LLM para tareas de testing.</strong> Los LLM pueden interpretar requisitos, especificaciones, screenshots, código, test cases y reportes de defectos — funcionando como herramientas para entender, clarificar y generar elementos del testware a lo largo de todo el proceso de prueba.</div>
<table class="kv-table"><tr><th>Capacidad</th><th>Qué aporta</th></tr>
<tr><td>Análisis y mejora de requisitos</td><td>Identifica ambigüedades, inconsistencias o información faltante; genera preguntas útiles para aclarar requisitos con stakeholders</td></tr>
<tr><td>Apoyo en la creación de test cases</td><td>Genera test cases y sugiere objetivos de prueba a partir de requisitos, historias de usuario u otros elementos del test basis</td></tr>
<tr><td>Generación de oráculos de prueba</td><td>Ayuda a generar los resultados esperados de un test</td></tr>
<tr><td>Generación de datos de prueba</td><td>Genera datasets, establece valores frontera y crea combinaciones de datos de prueba</td></tr>
<tr><td>Apoyo a la automatización</td><td>Genera scripts de prueba a partir de la descripción del test case y mejora scripts existentes sugiriendo cambios o técnicas de diseño apropiadas</td></tr>
<tr><td>Análisis de resultados de prueba</td><td>Genera resúmenes y clasifica anomalías por severidad y prioridad</td></tr>
<tr><td>Creación de testware</td><td>Ayuda a crear y mantener actualizados planes de prueba, reportes de prueba y reportes de defectos conforme evoluciona el proyecto</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>1.2.2 — AI Chatbots vs. LLM-Powered Testing Applications.</strong> Ambos asisten al tester, pero difieren en funcionalidad, flexibilidad e integración.</div>
<table class="kv-table"><tr><th></th><th>AI Chatbots</th><th>LLM-Powered Testing Applications</th></tr>
<tr><td>Interfaz</td><td>Conversacional, lenguaje natural directo con el LLM</td><td>Integración vía API dentro de herramientas de testing existentes</td></tr>
<tr><td>Uso típico</td><td>Tareas rutinarias, exploratory testing, onboarding de nuevos testers, feedback rápido</td><td>Automatización de tareas bien definidas y repetitivas: generación de test cases, análisis de defectos, síntesis de datos de prueba</td></tr>
<tr><td>Personalización</td><td>Limitada — interacción directa mediante prompting</td><td>Alta — permite construir agentes de IA especializados en roles de testing concretos (ver Capítulo 4)</td></tr>
<tr><td>Accesibilidad</td><td>Interfaz intuitiva, accesible incluso para stakeholders no técnicos</td><td>Requiere integración técnica con el stack de herramientas del equipo</td></tr>
</table>
<div class="alert-card">💡 Sin importar la vía de interacción, el syllabus es enfático: la implementación exitosa de GenAI en testing depende de un <strong>prompt engineering sólido</strong> (Capítulo 2) — prompts bien diseñados y instrucciones claras son esenciales para que la salida del LLM sea precisa, relevante y alineada con los objetivos de la prueba.</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el Capítulo 1...</p>
</div>`,

'genai-ch2': `
<div class="concept-intro"><strong>Capítulo 2 del syllabus CT-GenAI (365 min — el capítulo más extenso, con mayor peso en el examen).</strong> Cubre cómo estructurar prompts efectivos, cómo aplicarlos a cada actividad del proceso de testing, y cómo evaluar y refinar los resultados obtenidos.</div>
<div class="tab-group-gc2">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'gc2-1','gc2')">2.1 Desarrollo de prompts</button>
    <button class="tab-btn" onclick="switchTab(this,'gc2-2','gc2')">2.2 Aplicación a tareas de testing</button>
    <button class="tab-btn" onclick="switchTab(this,'gc2-3','gc2')">2.3 Evaluar y refinar</button>
  </div>
  <div id="gc2-1" class="tab-panel active">
<div class="concept-intro"><strong>2.1.1 — Estructura de un prompt.</strong> El syllabus define 6 componentes para un prompt de testing bien estructurado.</div>
<div class="diagram-card">
<svg viewBox="0 0 620 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Los seis componentes de un prompt estructurado para testing: rol, contexto, instruccion, datos de entrada, restricciones y formato de salida">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="5" y="10" width="195" height="52" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="102" y="32" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">1. Role</text>
    <text x="102" y="46" font-size="8" fill="var(--text-muted)" text-anchor="middle">perspectiva/persona del LLM</text>

    <rect x="212" y="10" width="195" height="52" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="309" y="32" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">2. Context</text>
    <text x="309" y="46" font-size="8" fill="var(--text-muted)" text-anchor="middle">info de fondo del test object</text>

    <rect x="419" y="10" width="195" height="52" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="516" y="32" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">3. Instruction</text>
    <text x="516" y="46" font-size="8" fill="var(--text-muted)" text-anchor="middle">tarea específica a realizar</text>

    <rect x="5" y="80" width="195" height="52" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="102" y="102" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">4. Input data</text>
    <text x="102" y="116" font-size="8" fill="var(--text-muted)" text-anchor="middle">user stories, código, screenshots</text>

    <rect x="212" y="80" width="195" height="52" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="309" y="102" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">5. Constraints</text>
    <text x="309" y="116" font-size="8" fill="var(--text-muted)" text-anchor="middle">restricciones a respetar</text>

    <rect x="419" y="80" width="195" height="52" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="516" y="102" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">6. Output format</text>
    <text x="516" y="116" font-size="8" fill="var(--text-muted)" text-anchor="middle">formato/estructura esperada</text>

    <text x="310" y="165" font-size="9.5" fill="var(--text-muted)" text-anchor="middle">Estos 6 componentes se combinan con las técnicas de la sección 2.1.2 según la tarea y el LLM utilizado</text>
  </g>
</svg>
</div>
<div class="concept-intro"><strong>2.1.2 — Técnicas core de prompting.</strong> Tres técnicas se usan comúnmente para tareas de testing, junto con la estructura de 6 componentes.</div>
<table class="kv-table"><tr><th>Técnica</th><th>Cómo funciona</th></tr>
<tr><td>Prompt chaining</td><td>Divide una tarea en una serie de pasos intermedios (múltiples prompts). El resultado de cada paso se verifica y refina, manual o automáticamente, antes de continuar — útil para tareas complicadas que requieren descomposición en subtareas</td></tr>
<tr><td>Few-shot prompting</td><td>Se dan ejemplos al LLM dentro del prompt. Zero-shot no da ningún ejemplo (se apoya en el conocimiento previo del modelo); one-shot da un ejemplo; few-shot da más de uno para consolidar el comportamiento deseado</td></tr>
<tr><td>Meta prompting</td><td>Aprovecha la capacidad del LLM de generar o refinar sus propios prompts, en un ciclo iterativo evaluado por el tester — reduce el esfuerzo manual de diseñar prompts efectivos y permite "pairing" con la IA</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>2.1.3 — System Prompt y User Prompt.</strong></div>
<table class="kv-table"><tr><th></th><th>System Prompt</th><th>User Prompt</th></tr>
<tr><td>Quién lo define</td><td>El desarrollador o tester, normalmente no visible/editable por el usuario final del chatbot</td><td>El usuario del chatbot, en cada interacción</td></tr>
<tr><td>Duración</td><td>Constante durante toda la sesión — establece el marco de fondo</td><td>Cambia en cada interacción</td></tr>
<tr><td>Contenido típico</td><td>Rol, contexto y restricciones que guían el comportamiento general del LLM</td><td>Instrucción específica, contexto adicional relevante e indicaciones de formato de salida</td></tr>
<tr><td>Ejemplo</td><td>"Eres un asistente profesional de testing. Responde con claridad, usa lenguaje formal y enfócate en prácticas alineadas a ISTQB."</td><td>"Lista las diferencias clave entre black-box y white-box testing con ejemplos."</td></tr>
</table>
  </div>
  <div id="gc2-2" class="tab-panel">
<div class="concept-intro">GenAI apoya tareas a lo largo de <strong>todo</strong> el proceso de testing. El syllabus las agrupa en 4 grandes áreas.</div>
<div class="diagram-card">
<svg viewBox="0 0 640 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GenAI aplicada a cuatro areas del proceso de testing: analisis de pruebas, diseno e implementacion de pruebas, pruebas de regresion automatizadas, y monitoreo y control de pruebas">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="5" y="30" width="150" height="55" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="80" y="53" font-size="9.5" font-weight="700" fill="var(--accent)" text-anchor="middle">2.2.1 Test Analysis</text>
    <text x="80" y="67" font-size="8" fill="var(--text-muted)" text-anchor="middle">condiciones de prueba</text>

    <rect x="170" y="30" width="150" height="55" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="245" y="53" font-size="9.5" font-weight="700" fill="var(--accent)" text-anchor="middle">2.2.2 Design & Impl.</text>
    <text x="245" y="67" font-size="8" fill="var(--text-muted)" text-anchor="middle">test cases, scripts, datos</text>

    <rect x="335" y="30" width="150" height="55" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="410" y="53" font-size="9.5" font-weight="700" fill="var(--accent)" text-anchor="middle">2.2.3 Regression Test</text>
    <text x="410" y="67" font-size="8" fill="var(--text-muted)" text-anchor="middle">CI/CD, self-healing</text>

    <rect x="500" y="30" width="135" height="55" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="567" y="53" font-size="9.5" font-weight="700" fill="var(--green)" text-anchor="middle">2.2.4 Monitor & Control</text>
    <text x="567" y="67" font-size="8" fill="var(--text-muted)" text-anchor="middle">métricas, dashboards</text>
  </g>
</svg>
</div>
<table class="kv-table"><tr><th>Sección</th><th>Tareas de testing que GenAI puede apoyar</th></tr>
<tr><td>2.2.1 Test Analysis</td><td>Identificar defectos potenciales en el test basis; generar condiciones de prueba desde requisitos/user stories; priorizar por nivel de riesgo; apoyar análisis de cobertura; sugerir técnicas de prueba (equivalence partitioning, boundary value analysis)</td></tr>
<tr><td>2.2.2 Test Design & Implementation</td><td>Generación de test cases (precondiciones, entradas, resultados esperados); síntesis de datos de prueba sintéticos que preservan privacidad; generación de scripts de automatización desde test cases estructurados; programación y priorización de la ejecución de pruebas</td></tr>
<tr><td>2.2.3 Automated Regression Testing</td><td>Implementación de scripts keyword-driven; análisis de impacto de cambios de código; tests self-healing/adaptativos ante cambios menores de UI/API; reportes de prueba automatizados con insights; análisis de causa raíz de defectos</td></tr>
<tr><td>2.2.4 Test Monitoring & Control</td><td>Análisis de métricas y tendencias con alertas de desviación; soporte a la re-priorización y reasignación de recursos; reportes de cierre con lecciones aprendidas; dashboards y resúmenes en lenguaje natural</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>2.2.5 — Eligiendo la técnica de prompting según la tarea.</strong> Tabla oficial del syllabus con la idoneidad de cada técnica.</div>
<table class="kv-table"><tr><th>Técnica</th><th>Caso de uso recomendado</th><th>Aplicación típica</th></tr>
<tr><td>Prompt chaining</td><td>Tareas complejas que requieren precisión con verificación humana en cada paso</td><td>Test analysis, test design y test automation, verificando cada paso</td></tr>
<tr><td>Few-shot prompting</td><td>Tareas repetitivas o con formato de salida específico/restringido</td><td>Test cases estilo Gherkin, keyword-driven testing, reportes con formato específico</td></tr>
<tr><td>Meta prompting</td><td>Tareas flexibles y dinámicas; útil para crear prompts de tareas nuevas</td><td>Análisis de reportes de prueba, detección de anomalías</td></tr>
</table>
<div class="alert-card">💡 Las tres técnicas se pueden <strong>combinar</strong> en un mismo caso de uso: meta prompting para crear un prompt inicial, few-shot para enriquecerlo con ejemplos, y prompt chaining para dividir la tarea en subtareas verificables.</div>
  </div>
  <div id="gc2-3" class="tab-panel">
<div class="concept-intro"><strong>2.3.1 — Métricas para evaluar resultados de GenAI en tareas de testing.</strong> Dado el comportamiento no-determinista de GenAI, las métricas deben basarse en datos estadísticamente relevantes, no en una sola ejecución.</div>
<table class="kv-table"><tr><th>Métrica</th><th>Qué mide</th><th>Ejemplo</th></tr>
<tr><td>Accuracy</td><td>Corrección global de la salida frente a test cases o requisitos de referencia escritos por expertos</td><td>Grado en que los test cases generados cubren todos los requisitos especificados</td></tr>
<tr><td>Precision</td><td>Corrección de la salida respecto a un objetivo específico</td><td>Grado en que los test cases generados identifican correctamente anomalías</td></tr>
<tr><td>Recall</td><td>Capacidad del modelo de identificar todas las instancias relevantes dentro de un dataset</td><td>Grado en que los test cases cubren las particiones de equivalencia válidas e inválidas de una clase de datos</td></tr>
<tr><td>Relevance and Contextual Fit</td><td>Si la salida es aplicable y apropiada para el contexto dado</td><td>Grado en que los test cases son consistentes con el test basis e integran los requisitos específicos del dominio</td></tr>
<tr><td>Diversity</td><td>Que se cubra una amplia variedad de entradas y escenarios, evitando repetición</td><td>Grado en que los test cases cubren distintos comportamientos de usuario y exploran casos límite</td></tr>
<tr><td>Execution Success Rate</td><td>Proporción de test cases/scripts generados que se ejecutan exitosamente</td><td>Cuántos de los scripts generados corren sin errores de sintaxis en un entorno de prueba funcional</td></tr>
<tr><td>Time Efficiency</td><td>Tiempo ahorrado frente al esfuerzo manual</td><td>Tiempo que tarda la IA en generar test cases vs. el tiempo que tomaría crearlos manualmente</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>2.3.2 — Técnicas de evaluación y refinamiento iterativo de prompts.</strong></div>
<table class="kv-table"><tr><th>Técnica</th><th>En qué consiste</th></tr>
<tr><td>Iterative prompt modification</td><td>Partir de un prompt base y modificarlo gradualmente según los resultados observados, añadiendo contexto o ajustando la terminología</td></tr>
<tr><td>A/B testing de prompts</td><td>Crear varias versiones de un prompt y evaluar cuál produce mejores resultados según métricas predefinidas</td></tr>
<tr><td>Output analysis</td><td>Examinar la salida generada en busca de imprecisiones o inconsistencias respecto al test basis</td></tr>
<tr><td>Integrar feedback de usuarios</td><td>Recoger opiniones de los testers sobre utilidad y claridad de la salida, y usarlas para refinar el prompt</td></tr>
<tr><td>Ajustar longitud y especificidad</td><td>Experimentar con distintos niveles de detalle — más contexto no siempre mejora el resultado; a veces un prompt más corto generaliza mejor</td></tr>
</table>
<div class="alert-card">💡 El syllabus recomienda compartir estas prácticas en todo el equipo (ej. bibliotecas de prompts compartidas) para estandarizar la calidad y evitar repetir errores ya identificados por otros.</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el Capítulo 2...</p>
</div>`,

'genai-ch3': `
<div class="concept-intro"><strong>Capítulo 3 del syllabus CT-GenAI (160 min).</strong> Usar GenAI en testing introduce riesgos específicos — de calidad del output, de privacidad y seguridad de los datos, ambientales y regulatorios — que un tester debe saber identificar y mitigar.</div>
<div class="tab-group-gc3">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'gc3-1','gc3')">3.1 Alucinaciones y sesgos</button>
    <button class="tab-btn" onclick="switchTab(this,'gc3-2','gc3')">3.2 Privacidad y seguridad</button>
    <button class="tab-btn" onclick="switchTab(this,'gc3-3','gc3')">3.3 Impacto ambiental</button>
    <button class="tab-btn" onclick="switchTab(this,'gc3-4','gc3')">3.4 Regulaciones</button>
  </div>
  <div id="gc3-1" class="tab-panel active">
<table class="kv-table"><tr><th>Defecto</th><th>Definición oficial</th></tr>
<tr><td>Hallucination</td><td>El LLM genera una salida que resulta factualmente incorrecta o irrelevante para la tarea — en testing, puede crear test cases ficticios, scripts no funcionales, o verificar criterios de aceptación que no existen</td></tr>
<tr><td>Reasoning error</td><td>El LLM malinterpreta estructuras lógicas (causa-efecto, lógica condicional, resolución paso a paso), llevando a conclusiones incorrectas — a diferencia de un humano, el LLM no razona de verdad, se apoya en coincidencia de patrones</td></tr>
<tr><td>Bias</td><td>Proviene de los datos con que se entrenó el modelo; puede favorecer cierto tipo de información, enfoques o suposiciones — por ejemplo, un LLM entrenado mayormente en inglés puede subrepresentar perspectivas no anglófonas</td></tr>
</table>
<div class="alert-card">💡 El comportamiento no-determinista de los LLM complica corregir estos defectos: pueden parecer "arreglados" en una respuesta y reaparecer en otra conversación con el mismo modelo.</div>
<div class="concept-intro" style="margin-top:14px"><strong>3.1.2 — Cómo identificarlos en la salida del LLM.</strong></div>
<table class="kv-table"><tr><th>Tipo</th><th>Técnicas de detección</th></tr>
<tr><td>Hallucinations</td><td>Cross-verification (comparar contra documentación/requisitos conocidos); consulta a expertos del dominio; consistency checks (verificar coherencia entre distintas salidas)</td></tr>
<tr><td>Reasoning errors</td><td>Validación lógica del flujo generado (revisión, a veces asistida por herramientas); output testing — ejecutar los test cases/scripts generados contra el test object real para verificar los resultados</td></tr>
<tr><td>Biases</td><td>Revisar si el testware generado (ej. datos sintéticos) está representado de forma justa respecto a la estrategia de prueba; evaluar sesgos como tipos de test subrepresentados (ej. pocos tests no-funcionales)</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>3.1.3 — Técnicas de mitigación.</strong></div>
<table class="kv-table"><tr><th>Técnica</th><th>En qué consiste</th></tr>
<tr><td>Proveer contexto completo</td><td>Asegurar que el prompt contiene toda la información relevante (ver 2.1.1)</td></tr>
<tr><td>Dividir en segmentos manejables</td><td>Usar prompt chaining, verificando sistemáticamente cada salida antes de continuar</td></tr>
<tr><td>Formatos de datos claros e interpretables</td><td>Evitar formatos ambiguos que dificulten la interpretación del modelo</td></tr>
<tr><td>Elegir el modelo apropiado</td><td>Usar un LLM específicamente entrenado/apto para la tarea (ver selección de LLM/SLM en 5.1.3)</td></tr>
<tr><td>Comparar resultados entre modelos</td><td>Evaluar el mismo prompt en varios LLM y comparar las salidas para detectar errores</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>3.1.4 — Mitigación del comportamiento no-determinista.</strong> No se puede garantizar reproducibilidad total, pero dos estrategias ayudan a reducir la variabilidad.</div>
<table class="kv-table"><tr><th>Estrategia</th><th>Efecto</th></tr>
<tr><td>Ajustar la temperatura</td><td>Bajar la temperatura durante la inferencia reduce la aleatoriedad y da salidas más consistentes — a costa de menos creatividad y diversidad en las respuestas</td></tr>
<tr><td>Fijar random seeds</td><td>Algunas implementaciones permiten fijar una semilla para el generador de números pseudo-aleatorios, mejorando la reproducibilidad</td></tr>
</table>
  </div>
  <div id="gc3-2" class="tab-panel">
<div class="concept-intro"><strong>3.2.1 — Riesgos de privacidad y seguridad.</strong> GenAI procesa grandes volúmenes de datos que pueden incluir información sensible o personalmente identificable.</div>
<table class="kv-table"><tr><th>Riesgo</th><th>Descripción</th></tr>
<tr><td>Exposición no intencional de datos</td><td>El modelo puede generar salidas que revelan accidentalmente información sensible</td></tr>
<tr><td>Falta de control sobre el uso de datos</td><td>Las herramientas de GenAI pueden almacenar y procesar datos sensibles sin consentimiento explícito, abriendo la puerta a mal uso o acceso no autorizado</td></tr>
<tr><td>Riesgos de cumplimiento</td><td>Usar GenAI sin cumplir regulaciones de protección de datos (ej. GDPR) puede derivar en disputas legales</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>3.2.2 — Vectores de ataque en procesos y herramientas de testing con GenAI</strong> (tabla oficial del syllabus).</div>
<table class="kv-table"><tr><th>Vector de ataque</th><th>Descripción</th><th>Ejemplo</th></tr>
<tr><td>Data exfiltration</td><td>Enviar solicitudes diseñadas para extraer datos confidenciales de entrenamiento</td><td>Exceder la ventana de contexto con prompts largos para sobrecargar la memoria de la IA e inducirla a revelar fragmentos de sus datos de entrenamiento</td></tr>
<tr><td>Request manipulation</td><td>Introducir datos que alteran la salida de la IA</td><td>Imágenes que llevan a la IA a un contexto distinto, provocando alucinaciones en, por ejemplo, criterios de aceptación</td></tr>
<tr><td>Data poisoning</td><td>Manipular los datos de entrenamiento</td><td>Dar evaluaciones falsas al calificar los resultados de un reporte de prueba generado por IA</td></tr>
<tr><td>Malicious code generation</td><td>Manipular al LLM para que genere puertas traseras (ej. llamadas a comandos externos) durante su uso</td><td>Generación de código que abre un canal de comunicación hacia una IP maliciosa específica</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>3.2.3 — Estrategias de mitigación.</strong></div>
<table class="kv-table"><tr><th>Estrategia</th><th>Detalle</th></tr>
<tr><td>Minimización de datos</td><td>Evitar procesar datos sensibles salvo que esté legalmente permitido; usar solo la cantidad necesaria de datos no sensibles</td></tr>
<tr><td>Anonimización y pseudonimización</td><td>Enmascarar o sustituir información sensible por datos no identificables</td></tr>
<tr><td>Almacenamiento y transmisión seguros</td><td>Cifrado robusto y controles de acceso</td></tr>
<tr><td>Capacitación de recursos</td><td>Programas de entrenamiento y políticas claras para el uso responsable de GenAI</td></tr>
<tr><td>Revisión sistemática de la salida generada</td><td>La evaluación humana es esencial para garantizar calidad y precisión</td></tr>
<tr><td>Evaluación comparando varios LLM</td><td>Usar más de un LLM en la misma tarea y comparar respuestas</td></tr>
<tr><td>Elección de un entorno operativo seguro</td><td>Según el nivel de confidencialidad requerido: oferta comercial segura del proveedor, nube segura propia, o instalación en infraestructura interna</td></tr>
<tr><td>Auditorías de seguridad regulares</td><td>Identificar y atender debilidades en los sistemas de GenAI</td></tr>
</table>
<div class="alert-card">💡 El syllabus recomienda explícitamente involucrar a Seguridad, Legal, el CTO o el CISO de la organización cuando estén disponibles — estas estrategias son complementarias entre sí, no sustitutas.</div>
  </div>
  <div id="gc3-3" class="tab-panel">
<div class="concept-intro"><strong>3.3.1 — Consumo energético y emisiones de CO2.</strong> Entrenar y ejecutar LLM requiere un uso intensivo de recursos computacionales especializados. El uso de estos servicios basados en web incrementa la carga sobre dispositivos, redes y centros de datos.</div>
<div class="alert-card">💡 Dato del syllabus: generar una sola imagen con un modelo de IA potente puede consumir tanta energía como cargar completamente un smartphone, mientras que generar texto consume solo un pequeño porcentaje de esa carga. Aunque una sola tarea parezca insignificante, el efecto acumulado de millones de usuarios en todo el mundo representa una carga ambiental considerable.</div>
<div class="concept-intro">Buenas prácticas como limitar interacciones innecesarias con el modelo son clave para mitigar este impacto ambiental.</div>
  </div>
  <div id="gc3-4" class="tab-panel">
<div class="concept-intro"><strong>3.4.1 — Regulaciones, estándares y marcos de buenas prácticas relevantes para GenAI en testing.</strong></div>
<table class="kv-table"><tr><th>Nombre / Tipo</th><th>Qué especifica</th><th>Aplicación en testing</th></tr>
<tr><td>ISO/IEC 42001:2023<br><span class="ts tm">(Estándar)</span></td><td>Requisitos para gestionar sistemas de IA dentro de una organización</td><td>Asegura que el uso de GenAI en testing siga prácticas recomendadas, promoviendo consistencia y fiabilidad</td></tr>
<tr><td>ISO/IEC 23053:2022<br><span class="ts tm">(Estándar)</span></td><td>Marco para procesos del ciclo de vida de sistemas de IA, enfatizando tolerancia a fallos y transparencia</td><td>Aporta un marco de calidad de datos, transparencia y tolerancia a fallos al usar GenAI para testing</td></tr>
<tr><td>EU AI Act<br><span class="ts tm">(Regulación)</span></td><td>Marco legal que aborda riesgos de IA, clasificando aplicaciones por nivel de riesgo</td><td>Exige cumplimiento en transparencia, rendición de cuentas y mitigación de sesgo para GenAI usada en testing</td></tr>
<tr><td>NIST AI Risk Management Framework (US)<br><span class="ts tm">(Framework)</span></td><td>Guías para gestionar riesgos de IA, enfocadas en equidad, transparencia y seguridad</td><td>Ayuda a asegurar equidad y mitigar riesgos en GenAI, previniendo resultados de prueba sesgados</td></tr>
</table>
<div class="alert-card">💡 El panorama regulatorio de la IA evoluciona rápido — el syllabus recalca que las organizaciones de testing deben mantenerse actualizadas sobre nuevas regulaciones, estándares, leyes nacionales y marcos de buenas prácticas.</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el Capítulo 3...</p>
</div>`,

'genai-ch4': `
<div class="concept-intro"><strong>Capítulo 4 del syllabus CT-GenAI (110 min).</strong> Más allá de chatear con un LLM, este capítulo cubre cómo se construye y opera una infraestructura de testing potenciada por LLM: arquitectura, RAG, agentes autónomos, fine-tuning y LLMOps.</div>
<div class="tab-group-gc4">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'gc4-1','gc4')">4.1 Arquitectura</button>
    <button class="tab-btn" onclick="switchTab(this,'gc4-2','gc4')">4.2 Fine-Tuning y LLMOps</button>
  </div>
  <div id="gc4-1" class="tab-panel active">
<div class="concept-intro"><strong>4.1.1 — Componentes arquitectónicos clave.</strong> Una infraestructura de testing potenciada por LLM integra un LLM en el proceso de testing para potenciar automatización, razonamiento y toma de decisiones — a diferencia de un chatbot genérico, está diseñada para procesar consultas de testing, analizar requisitos, generar test cases y evaluar salidas.</div>
<div class="diagram-card">
<svg viewBox="0 0 600 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Arquitectura de una infraestructura de testing potenciada por LLM: el front-end donde el tester interactua, el back-end que gestiona autenticacion y preparacion de prompts conectado a bases de datos relacionales y vectoriales, y el LLM que genera las respuestas">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="10" y="55" width="130" height="50" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="75" y="77" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Front-end</text>
    <text x="75" y="91" font-size="8" fill="var(--text-muted)" text-anchor="middle">interfaz del tester</text>

    <rect x="200" y="55" width="150" height="50" rx="7" fill="var(--accent)" fill-opacity="0.85" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="275" y="77" font-size="10" font-weight="700" fill="white" text-anchor="middle">Back-end</text>
    <text x="275" y="91" font-size="8" fill="white" text-anchor="middle">auth, prompt prep, post-proc.</text>

    <rect x="410" y="20" width="180" height="42" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="500" y="46" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">Relational DB</text>

    <rect x="410" y="72" width="180" height="42" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="500" y="98" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">Vector DB</text>

    <rect x="200" y="125" width="150" height="30" rx="7" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
    <text x="275" y="145" font-size="9.5" font-weight="700" fill="#92400E" text-anchor="middle">LLM (API o in-house)</text>

    <g stroke="var(--text-muted)" stroke-width="1.4" fill="var(--text-muted)">
      <line x1="140" y1="80" x2="196" y2="80"/><path d="M196,76 L204,80 L196,84 Z"/>
      <line x1="350" y1="65" x2="405" y2="45"/><path d="M398,42 L407,44 L403,52 Z"/>
      <line x1="350" y1="90" x2="405" y2="93"/><path d="M401,88 L409,92 L401,97 Z"/>
      <line x1="275" y1="105" x2="275" y2="121"/><path d="M271,113 L275,121 L279,113 Z"/>
    </g>
  </g>
</svg>
<div class="diagram-caption">El back-end no es solo un servidor tradicional: es un componente de procesamiento inteligente que interpreta y razona sobre productos de testing, integrando múltiples fuentes de datos (bases relacionales para test cases estructurados, bases vectoriales para recuperación semántica) y post-procesando la salida cruda del LLM antes de mostrarla en el front-end.</div>
</div>
<div class="concept-intro" style="margin-top:14px"><strong>4.1.2 — Retrieval-Augmented Generation (RAG).</strong> RAG mejora al LLM incorporando fuentes de datos adicionales en su proceso de generación, aumentando la relevancia y precisión de la salida.</div>
<div class="diagram-card">
<svg viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Proceso de Retrieval-Augmented Generation: los documentos se dividen en fragmentos y se codifican como embeddings en una base de datos vectorial, la consulta del usuario se compara por similitud semantica con esos fragmentos, y los fragmentos relevantes se envian junto con la consulta al LLM para generar una respuesta fundamentada">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="10" y="20" width="130" height="45" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="75" y="40" font-size="9.5" font-weight="700" fill="var(--accent)" text-anchor="middle">Documentos</text>
    <text x="75" y="54" font-size="8" fill="var(--text-muted)" text-anchor="middle">(chunks de 256-512 tokens)</text>

    <rect x="190" y="20" width="130" height="45" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="255" y="40" font-size="9.5" font-weight="700" fill="var(--accent)" text-anchor="middle">Vector DB</text>
    <text x="255" y="54" font-size="8" fill="var(--text-muted)" text-anchor="middle">embeddings almacenados</text>

    <rect x="10" y="100" width="130" height="45" rx="7" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
    <text x="75" y="120" font-size="9.5" font-weight="700" fill="#92400E" text-anchor="middle">Consulta (query)</text>
    <text x="75" y="134" font-size="8" fill="#92400E" text-anchor="middle">del tester</text>

    <rect x="370" y="60" width="150" height="45" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="445" y="80" font-size="9.5" font-weight="700" fill="var(--green)" text-anchor="middle">1. Retrieval</text>
    <text x="445" y="94" font-size="8" fill="var(--text-muted)" text-anchor="middle">similitud semántica</text>

    <rect x="370" y="115" width="150" height="30" rx="6" fill="var(--accent)" fill-opacity="0.85"/>
    <text x="445" y="135" font-size="9.5" font-weight="700" fill="white" text-anchor="middle">2. Generation (LLM)</text>

    <g stroke="var(--text-muted)" stroke-width="1.3" fill="var(--text-muted)">
      <line x1="140" y1="42" x2="186" y2="42"/><path d="M186,38 L194,42 L186,46 Z"/>
      <line x1="255" y1="65" x2="360" y2="82"/><path d="M352,80 L361,82 L358,90 Z"/>
      <line x1="140" y1="122" x2="365" y2="130"/><path d="M357,126 L366,130 L357,134 Z"/>
      <line x1="445" y1="105" x2="445" y2="112"/><path d="M441,108 L445,116 L449,108 Z"/>
    </g>
  </g>
</svg>
<div class="diagram-caption">RAG permite que la infraestructura de testing acceda a fuentes de datos empresariales (bases de datos, documentación, repositorios) en tiempo real, asegurando que tareas como el análisis o diseño de pruebas estén alineadas con las especificaciones y datos de prueba más recientes.</div>
</div>
<div class="concept-intro" style="margin-top:14px"><strong>4.1.3 — Agentes potenciados por LLM.</strong> Aplicaciones GenAI especializadas para el procesamiento semi-autónomo o autónomo de tareas definidas, capaces de "actuar" invocando funciones predefinidas ("tools"), no solo responder preguntas.</div>
<table class="kv-table"><tr><th>Tipo</th><th>Nivel de autonomía</th></tr>
<tr><td>Agentes autónomos</td><td>Operan de forma independiente, con mínima intervención humana, usando reglas predefinidas, aprendizaje por refuerzo y bucles de retroalimentación adaptativa</td></tr>
<tr><td>Agentes semi-autónomos</td><td>Realizan tareas con supervisión humana periódica, para asegurar que la salida cumple los objetivos definidos por el usuario</td></tr>
<tr><td>Arquitecturas multi-agente</td><td>Varios agentes con roles especializados se comunican y coordinan para resolver problemas complejos — a esta coordinación se le llama "orchestration"</td></tr>
</table>
<div class="alert-card">💡 Los agentes potenciados por LLM sufren los <strong>mismos riesgos</strong> de alucinación, errores de razonamiento y sesgo que cualquier LLM (Sección 3.1) — se mitigan con procedimientos de verificación automatizada o usando agentes semi-autónomos para tareas críticas.</div>
  </div>
  <div id="gc4-2" class="tab-panel">
<div class="concept-intro"><strong>4.2.1 — Fine-Tuning de LLMs para tareas de testing.</strong> Adapta un modelo pre-entrenado (LLM o SLM) para una tarea o dominio específico, entrenándolo más con un dataset dirigido para que aprenda conocimiento y matices propios de ese dominio.</div>
<table class="kv-table"><tr><th>Desafío del fine-tuning</th><th>Detalle</th></tr>
<tr><td>Evitar resultados sesgados o inexactos</td><td>Requiere datasets de entrenamiento específicos y de alta calidad</td></tr>
<tr><td>Mitigar overfitting</td><td>El modelo se vuelve demasiado especializado en los datos de entrenamiento, afectando su desempeño con datos nuevos no vistos</td></tr>
<tr><td>Abordar la opacidad</td><td>Falta de transparencia sobre cómo el modelo toma decisiones o produce su salida — complica la depuración y validación</td></tr>
<tr><td>Gestionar recursos computacionales</td><td>El fine-tuning de LLM (no tanto de SLM) requiere recursos computacionales significativos</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>4.2.2 — LLMOps.</strong> Conjunto de prácticas, herramientas y procesos para optimizar el desarrollo, despliegue y mantenimiento de LLM en entornos de producción. La forma de adoptar GenAI en testing influye directamente en las decisiones de LLMOps.</div>
<table class="kv-table"><tr><th>Enfoque</th><th>Consideraciones principales</th></tr>
<tr><td>Usar un AI chatbot</td><td>Gestión de riesgos de privacidad/seguridad de datos y optimización de costo; opción de plataformas LLM-as-a-Service o infraestructura in-house con modelos open-source para mayor control</td></tr>
<tr><td>Usar una herramienta de testing con capacidades GenAI</td><td>Mismas consideraciones de privacidad, seguridad y costo operativo, más una evaluación de las garantías de seguridad/desempeño del proveedor de la herramienta</td></tr>
<tr><td>Desarrollo in-house de una herramienta basada en GenAI</td><td>Control total de privacidad y seguridad, planeación cuidadosa de costos (cómputo, almacenamiento, capacitación), y procesos estructurados de validación y mantenimiento propios</td></tr>
</table>
<div class="alert-card">💡 Estos tres enfoques <strong>no son mutuamente excluyentes</strong>: una organización puede usar un chatbot para ciertas tareas mientras desarrolla herramientas a medida para otras, e incluso combinar RAG y fine-tuning para mejorar la efectividad de los procesos de testing con GenAI.</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el Capítulo 4...</p>
</div>`,

'genai-ch5': `
<div class="concept-intro"><strong>Capítulo 5 del syllabus CT-GenAI (80 min).</strong> El capítulo final cubre cómo una organización de testing adopta GenAI de forma estructurada: el roadmap de adopción y la gestión del cambio que implica en habilidades y procesos.</div>
<div class="tab-group-gc5">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'gc5-1','gc5')">5.1 Roadmap de adopción</button>
    <button class="tab-btn" onclick="switchTab(this,'gc5-2','gc5')">5.2 Gestión del cambio</button>
  </div>
  <div id="gc5-1" class="tab-panel active">
<div class="concept-intro"><strong>5.1.1 — Riesgos del Shadow AI</strong> (uso de herramientas de GenAI sin aprobación u oversight formal de la organización).</div>
<table class="kv-table"><tr><th>Riesgo</th><th>Detalle</th></tr>
<tr><td>Debilidades de seguridad y privacidad de la información</td><td>Herramientas de IA personales pueden carecer de seguridad robusta, abriendo la puerta a brechas de datos</td></tr>
<tr><td>Cumplimiento y regulación</td><td>Usar herramientas de IA no aprobadas puede derivar en incumplimiento de estándares y regulaciones de la industria, con consecuencias legales</td></tr>
<tr><td>Propiedad intelectual poco clara</td><td>Herramientas con acuerdos de licencia poco claros pueden exponer a disputas de IP, especialmente si se procesan datos con derechos de autor sin autorización</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>5.1.2 — Aspectos clave de una estrategia de GenAI en testing.</strong> Objetivos de prueba medibles (más productividad, ciclos más cortos, mejor calidad), selección adecuada del LLM alineada a esos objetivos, calidad de los datos de entrada, programas de capacitación técnica y ética, métricas de efectividad, y guías de proceso para cumplimiento regulatorio (uso de datos sensibles, transparencia sobre qué se generó con GenAI, quality gates con revisión del testware generado).</div>
<div class="concept-intro" style="margin-top:14px"><strong>5.1.3 — Selección de LLM/SLM para tareas de testing.</strong> Cuatro criterios clave para elegir entre la amplia variedad de modelos disponibles.</div>
<table class="kv-table"><tr><th>Criterio</th><th>Qué evaluar</th></tr>
<tr><td>Desempeño del modelo</td><td>Evaluar el desempeño para las tareas de prueba objetivo, contra benchmarks de la organización, usando métricas como las de la sección 2.3.1</td></tr>
<tr><td>Potencial de fine-tuning</td><td>Si es posible y útil afinar el modelo con datos específicos del dominio para mejorar precisión y relevancia en contextos especializados</td></tr>
<tr><td>Costo recurrente</td><td>Licencias y gastos operativos, para que encaje en el presupuesto de la organización</td></tr>
<tr><td>Comunidad y soporte</td><td>Modelos con soporte de comunidad activo y documentación detallada, para facilitar implementación y resolución de problemas</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>5.1.4 — Fases de adopción de GenAI en una organización de testing.</strong></div>
<div class="diagram-card">
<svg viewBox="0 0 600 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tres fases de adopcion de GenAI en testing: Discovery centrada en conciencia y capacitacion, Initiation and Usage Definition centrada en identificar casos de uso practicos, y Utilization and Iteration centrada en integracion completa y mejora continua">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="10" y="35" width="180" height="60" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="100" y="58" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">1. Discovery</text>
    <text x="100" y="72" font-size="8" fill="var(--text-muted)" text-anchor="middle">conciencia y capacitación,</text>
    <text x="100" y="84" font-size="8" fill="var(--text-muted)" text-anchor="middle">experimentar casos iniciales</text>

    <rect x="210" y="35" width="180" height="60" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="300" y="52" font-size="9.5" font-weight="700" fill="var(--accent)" text-anchor="middle">2. Initiation &amp;</text>
    <text x="300" y="65" font-size="9.5" font-weight="700" fill="var(--accent)" text-anchor="middle">Usage Definition</text>
    <text x="300" y="80" font-size="8" fill="var(--text-muted)" text-anchor="middle">priorizar casos de uso</text>

    <rect x="410" y="35" width="180" height="60" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="500" y="52" font-size="9.5" font-weight="700" fill="var(--green)" text-anchor="middle">3. Utilization</text>
    <text x="500" y="65" font-size="9.5" font-weight="700" fill="var(--green)" text-anchor="middle">&amp; Iteration</text>
    <text x="500" y="80" font-size="8" fill="var(--text-muted)" text-anchor="middle">integración plena, mejora continua</text>

    <g stroke="var(--text-muted)" stroke-width="1.4" fill="var(--text-muted)">
      <line x1="190" y1="65" x2="206" y2="65"/><path d="M206,61 L214,65 L206,69 Z"/>
      <line x1="390" y1="65" x2="406" y2="65"/><path d="M406,61 L414,65 L406,69 Z"/>
    </g>
  </g>
</svg>
<div class="diagram-caption">Estas fases pueden avanzar <b>en paralelo</b> para distintos casos de uso — por ejemplo, el análisis de reportes de prueba puede estar más avanzado en el roadmap mientras la automatización de pruebas apenas inicia. Es importante reconocer y atender preocupaciones tempranas como el miedo al desplazamiento laboral, que puede afectar la adopción y la moral del equipo.</div>
</div>
  </div>
  <div id="gc5-2" class="tab-panel">
<div class="concept-intro"><strong>5.2.1 — Habilidades y conocimientos esenciales para testear con GenAI.</strong> Dominar técnicas de prompt engineering, entender las ventanas de contexto del modelo, y desarrollar métodos de revisión del testware generado. Los testers deben combinar su expertise de dominio y testing con habilidades de IA.</div>
<table class="kv-table"><tr><th>Área</th><th>Qué incluye</th></tr>
<tr><td>Competencias técnicas</td><td>Evaluar capacidades del LLM, refinar prompts, evaluar testware generado por IA</td></tr>
<tr><td>Conocimiento de riesgos</td><td>Entender los riesgos inherentes de GenAI (Capítulo 3) y las estrategias comunes de mitigación</td></tr>
<tr><td>Seguridad de datos</td><td>Entender las implicaciones de compartir testware con LLM, aplicar sanitización de datos (enmascarar o eliminar información sensible) y seguir prácticas de prompt engineering que preserven la privacidad</td></tr>
<tr><td>Consideraciones ambientales</td><td>Optimizar la selección y patrones de uso del modelo para reducir la sobrecarga computacional, eligiendo modelos del tamaño adecuado a la tarea</td></tr>
</table>
<div class="concept-intro" style="margin-top:14px"><strong>5.2.2 — Construyendo capacidades de GenAI en los equipos de testing.</strong> Un enfoque práctico ("hands-on") es esencial: practicar con distintos LLM/SLM, seguir rutas de aprendizaje estructuradas, y desarrollar el know-how progresivamente compartiendo dentro de la organización. Las comunidades internas de práctica sostienen el aprendizaje continuo — comparten bibliotecas de <strong>prompt patterns</strong> (plantillas reutilizables para prompts efectivos) y documentan lecciones aprendidas entre proyectos.</div>
<div class="concept-intro" style="margin-top:14px"><strong>5.2.3 — Evolución de los procesos de testing en organizaciones habilitadas por IA.</strong></div>
<table class="kv-table"><tr><th>Rol</th><th>Cómo evoluciona</th></tr>
<tr><td>Tester</td><td>De especialista en diseño/ejecución de pruebas a "AI-assisted test specialist": combina expertise en técnicas de prueba con habilidades para guiar y verificar testware generado por IA. Sus tareas se expanden a revisión de salidas de IA, refinamiento de prompts y mantenimiento de bibliotecas de prompts específicas de testing</td></tr>
<tr><td>Test Manager</td><td>Sus responsabilidades se actualizan para incluir estrategia de pruebas basada en IA, gestión de riesgos basada en IA, y monitoreo/control de procesos de prueba basados en IA. Balancea capacidades humanas y de IA, establece marcos de gobernanza para casos de uso, y coordina equipos híbridos de personas y herramientas GenAI (no solo lidera testers humanos)</td></tr>
</table>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el Capítulo 5...</p>
</div>`,

'genai-glosario': `
<div class="concept-intro">Glosario <strong>oficial</strong> del Apéndice D del syllabus CT-GenAI ("Generative AI Specific Terms") — las 36 definiciones son las del documento original; la columna de ejemplo es un aporte añadido para fijar cada término en un contexto real de testing.</div>
<div class="tab-group-gcg">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'gcg-1','gcg')">A – L</button>
    <button class="tab-btn" onclick="switchTab(this,'gcg-2','gcg')">M – Z</button>
  </div>
  <div id="gcg-1" class="tab-panel active">
<table class="kv-table"><tr><th>Término</th><th>Definición oficial</th><th>Ejemplo</th></tr>
<tr><td>AI chatbot</td><td>Agente conversacional que usa LLMs para procesar consultas y generar respuestas de texto similares a las humanas, permitiendo comunicación interactiva con usuarios</td><td>Preguntarle a un chatbot "genera 5 test cases para el login" y recibir la respuesta al instante</td></tr>
<tr><td>Context window</td><td>El tramo de texto, medido en tokens, que un modelo de lenguaje considera al generar respuestas, influyendo en la relevancia y coherencia de sus salidas</td><td>Un contexto de 128k tokens permite analizar un log de pruebas extenso sin "olvidar" el inicio</td></tr>
<tr><td>Deep learning</td><td>ML que usa redes neuronales con múltiples capas</td><td>Un modelo que aprende a reconocer patrones visuales en screenshots sin reglas programadas a mano</td></tr>
<tr><td>Embedding</td><td>Técnica usada para representar tokens como vectores densos en un espacio continuo, aprendidos durante el entrenamiento para capturar relaciones semánticas, sintácticas y contextuales</td><td>Los embeddings de "login" y "inicio de sesión" quedan matemáticamente cercanos entre sí</td></tr>
<tr><td>Feature</td><td>Un atributo individual medible de los datos de entrada, usado por un algoritmo de ML para entrenar y por un modelo de ML para predecir</td><td>La "severidad" y el "componente afectado" como features para clasificar automáticamente un defecto</td></tr>
<tr><td>Few-shot prompting</td><td>Técnica en la que se dan al modelo unos pocos ejemplos dentro del prompt para guiar la generación de respuestas apropiadas</td><td>Mostrar 2 test cases en formato Gherkin ya escritos y pedir "3 más en el mismo estilo"</td></tr>
<tr><td>Fine-tuning</td><td>Proceso de aprendizaje supervisado que usa un dataset de ejemplos etiquetados para actualizar los pesos de un LLM y adaptarlo a tareas o dominios específicos</td><td>Afinar un modelo con miles de test cases del propio equipo para que genere en su estilo y formato</td></tr>
<tr><td>Foundation LLM</td><td>Modelos de propósito general pre-entrenados con un amplio rango de datos textuales, capaces de predecir la siguiente palabra según patrones lingüísticos aprendidos. Sinónimo: Base LLM</td><td>Un modelo base antes de ser afinado para seguir instrucciones específicas de testing</td></tr>
<tr><td>Generative AI (GenAI)</td><td>Tipo de sistema de inteligencia artificial que usa modelos de machine learning para generar contenido intelectual (nuevo) que se asemeja a contenido creado por humanos</td><td>Generar un borrador de reporte de defecto a partir de una descripción informal del bug</td></tr>
<tr><td>Generative pre-trained transformer (GPT)</td><td>Tipo de modelo de deep learning basado en transformer, pre-entrenado con enormes volúmenes de datos textuales para entender y generar texto similar al humano</td><td>La familia de modelos GPT es un ejemplo de esta arquitectura</td></tr>
<tr><td>Hallucination</td><td>Información incorrecta creada por un LLM</td><td>El modelo inventa un método de una librería que en realidad no existe</td></tr>
<tr><td>Instruction-tuned LLM</td><td>Un foundation LLM entrenado para seguir instrucciones, a menudo reforzado con feedback para fomentar respuestas correctas</td><td>Un modelo que responde de forma alineada cuando se le pide "genera 3 test cases en formato tabla"</td></tr>
<tr><td>Large language model (LLM)</td><td>Programa de computadora que usa colecciones muy grandes de datos de lenguaje para entender y producir texto de forma similar a como lo hacen los humanos</td><td>Usar un LLM para analizar una historia de usuario y sugerir criterios de aceptación</td></tr>
<tr><td>LLM-powered agent</td><td>Aplicación que integra razonamiento, toma de decisiones y memoria de un LLM, usando herramientas ("tools") para realizar tareas</td><td>Un agente que ejecuta automáticamente una suite de regresión y clasifica los fallos por causa probable</td></tr>
</table>
  </div>
  <div id="gcg-2" class="tab-panel">
<table class="kv-table"><tr><th>Término</th><th>Definición oficial</th><th>Ejemplo</th></tr>
<tr><td>LLMOps</td><td>Prácticas y herramientas enfocadas en desplegar, monitorear y mantener LLM en entornos de producción</td><td>Un pipeline que versiona los prompts de producción y monitorea el costo por consulta</td></tr>
<tr><td>Machine learning (ML)</td><td>El proceso que usa técnicas computacionales para permitir que los sistemas aprendan de datos o experiencia (ISO/IEC TR 29119-11)</td><td>Un modelo que aprende a predecir la probabilidad de fallo de un módulo según su historial de defectos</td></tr>
<tr><td>Meta prompting</td><td>La elaboración de instrucciones de alto nivel que generan prompts específicos para explorar o automatizar capacidades</td><td>Pedirle al LLM "ayúdame a diseñar el mejor prompt para generar test cases de este módulo"</td></tr>
<tr><td>Multimodal model</td><td>Modelos GenAI capaces de procesar y generar contenido a través de múltiples tipos de datos, como texto, imágenes y audio</td><td>Analizar un wireframe de GUI (imagen) junto con la historia de usuario (texto) para generar criterios de aceptación</td></tr>
<tr><td>Natural language processing (NLP)</td><td>El procesamiento de datos codificados en lenguaje natural por computadoras, para recuperar información y para representación del conocimiento</td><td>Interpretar un requisito escrito en prosa y descomponerlo en condiciones de prueba medibles</td></tr>
<tr><td>One-shot prompting</td><td>Técnica de escritura de prompts en la que el prompt contiene un ejemplo para guiar la respuesta del LLM</td><td>Mostrar un único test case de ejemplo antes de pedir uno nuevo con la misma estructura</td></tr>
<tr><td>Prompt</td><td>Entrada en lenguaje natural proporcionada para obtener una respuesta específica de la IA Generativa y los LLM</td><td>"Genera 3 casos de prueba de valores frontera para un campo de edad 18-65"</td></tr>
<tr><td>Prompt chaining</td><td>Técnica de prompting que usa la salida de un prompt como entrada de otro, creando una secuencia de prompts</td><td>Primero generar condiciones de prueba, luego usarlas como entrada para generar los test cases completos</td></tr>
<tr><td>Prompt engineering</td><td>El proceso de diseñar y refinar los prompts de entrada para guiar a los LLM hacia la producción de las salidas deseadas</td><td>Reescribir un prompt vago ("dame tests") en uno estructurado con rol, contexto, instrucción y formato</td></tr>
<tr><td>Reasoning LLM</td><td>Un LLM que se construye sobre modelos instruction-tuned, refinando su capacidad de emular procesos de razonamiento similares a los humanos</td><td>Usar un modelo de razonamiento para priorizar test cases considerando múltiples riesgos y dependencias a la vez</td></tr>
<tr><td>Retrieval-augmented generation (RAG)</td><td>Técnica que combina las capacidades de un LLM con un recuperador ("retriever") que obtiene datos relevantes para generar respuestas precisas y contextualmente relevantes</td><td>El asistente busca primero en la documentación interna del proyecto antes de generar la respuesta</td></tr>
<tr><td>Shadow AI</td><td>El uso de herramientas o sistemas de GenAI dentro de una organización sin aprobación formal ni supervisión</td><td>Un tester que pega requisitos confidenciales en un chatbot público no aprobado por la empresa</td></tr>
<tr><td>Small language model (SLM)</td><td>Modelos de lenguaje diseñados y entrenados intencionalmente para ser pequeños, ofreciendo un balance entre eficiencia y comprensión de lenguaje específica de una tarea</td><td>Un SLM afinado solo para generar datos de prueba sintéticos, más barato de operar que un LLM grande</td></tr>
<tr><td>Symbolic AI</td><td>Un enfoque de IA que usa símbolos, reglas y conocimiento estructurado para modelar el razonamiento</td><td>Un sistema experto con reglas "si-entonces" escritas a mano para clasificar defectos</td></tr>
<tr><td>System prompt</td><td>Conjunto de instrucciones predefinido, típicamente oculto para el usuario del chatbot, que establece de forma consistente el contexto, tono y límites de las respuestas de un LLM, guiando su comportamiento durante toda la interacción</td><td>"Eres un asistente de QA que solo responde en formato Gherkin"</td></tr>
<tr><td>Temperature</td><td>Parámetro que controla la aleatoriedad o creatividad de las salidas de un LLM</td><td>Temperature baja (ej. 0) para generar test cases reproducibles; alta para lluvia de ideas de exploratory testing</td></tr>
<tr><td>Tokenization</td><td>El proceso de descomponer el texto en unidades más pequeñas para su procesamiento por modelos de lenguaje</td><td>La palabra "testing" puede dividirse en los tokens "test" + "ing"</td></tr>
<tr><td>Transformer</td><td>Arquitectura de modelo de deep learning que utiliza mecanismos de auto-atención para capturar dependencias de largo alcance en secuencias de entrada</td><td>La arquitectura subyacente que permite a un LLM relacionar el inicio y el final de un prompt largo</td></tr>
<tr><td>User prompt</td><td>Instrucción o consulta ingresada por un usuario en un LLM que dirige la respuesta del modelo para cumplir tareas específicas o proveer la información deseada</td><td>"Lista las diferencias entre black-box y white-box testing con ejemplos"</td></tr>
<tr><td>Vector database</td><td>Base de datos optimizada para almacenar y consultar representaciones vectoriales de alta dimensionalidad de los datos</td><td>Almacenar los embeddings de toda la documentación de requisitos para búsqueda semántica con RAG</td></tr>
<tr><td>Vision-language model</td><td>Sistema de GenAI que procesa conjuntamente datos visuales y textuales para realizar tareas vinculando y generando contenido a través de ambas modalidades</td><td>Comparar un screenshot real de la app contra el wireframe original para detectar discrepancias visuales</td></tr>
<tr><td>Zero-shot prompting</td><td>Técnica de escritura de prompts en la que el prompt no contiene ejemplos, apoyándose en el conocimiento preexistente del modelo para generar una respuesta</td><td>"Genera 5 casos de prueba para un campo de contraseña" sin mostrar ningún ejemplo previo</td></tr>
</table>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el glosario oficial de GenAI...</p>
</div>`,

'genai-examen': `
<div class="concept-intro">Examen de práctica con preguntas <strong>originales</strong> (no del banco oficial de examen) diseñadas a partir de los objetivos de aprendizaje reales de cada capítulo del syllabus CT-GenAI, respetando su nivel cognitivo: <strong>K1</strong> (recordar), <strong>K2</strong> (entender) y <strong>K3</strong> (aplicar). Haz clic en cada pregunta para revelar la respuesta correcta y su explicación.</div>

<div class="quiz-section">
<div class="quiz-title">📖 Capítulo 1 — Introducción a GenAI para Testing</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-basico">K1</span>¿Cuál de las siguientes NO es una de las cuatro categorías del espectro de IA descritas en el syllabus? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Symbolic AI &nbsp;B) Classical Machine Learning &nbsp;C) <strong>Reinforcement Learning</strong> &nbsp;D) Deep Learning<br><br>
  <b>Respuesta correcta: C.</b> El syllabus describe el espectro como Symbolic AI, Classical Machine Learning, Deep Learning y Generative AI. Reinforcement Learning se menciona solo como técnica interna de los agentes autónomos (4.1.3), no como una de las 4 categorías del espectro de IA de la sección 1.1.1.
  <div class="a-tip">💡 GenAI-1.1.1 (K1): Recall different types of AI.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>Un modelo genera texto "estadísticamente plausible" a partir de su entrenamiento y el prompt. ¿Qué implica esto directamente? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Que el texto generado siempre es correcto &nbsp;B) <strong>Que plausible no es lo mismo que correcto, y la salida debe verificarse</strong> &nbsp;C) Que el modelo consulta una base de datos en tiempo real &nbsp;D) Que el modelo no puede generar código<br><br>
  <b>Respuesta correcta: B.</b> El syllabus (1.1.2) es explícito: "plausible is not necessarily correct" — el transformer predice el siguiente token más probable, no verifica hechos contra una fuente de verdad.
  <div class="a-tip">💡 GenAI-1.1.2 (K2): Explain the basics of generative AI and large language models.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>¿Qué distingue a un Reasoning LLM de un Instruction-Tuned LLM? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) El reasoning LLM no puede seguir instrucciones &nbsp;B) El reasoning LLM es siempre más pequeño (SLM) &nbsp;C) <strong>El reasoning LLM enfatiza razonamiento estructurado, inferencia lógica y resolución de problemas en múltiples pasos</strong> &nbsp;D) No hay diferencia, son sinónimos<br><br>
  <b>Respuesta correcta: C.</b> Según 1.1.3, los reasoning LLM extienden a los instruction-tuned enfatizando habilidades cognitivas estructuradas: inferencia lógica, resolución de problemas en múltiples pasos y chain-of-thought — mejor adaptados a tareas de alta carga cognitiva.
  <div class="a-tip">💡 GenAI-1.1.3 (K2): Distinguish between foundation, instruction-tuned and reasoning LLMs.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>Un equipo usa un chatbot de IA de forma conversacional para explorar rápidamente ideas de testing, mientras otro equipo integra un LLM vía API dentro de su framework de automatización. ¿Cómo describe el syllabus esta diferencia? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Ambos son AI chatbots &nbsp;B) <strong>El primero es un AI Chatbot; el segundo es una LLM-Powered Testing Application</strong> &nbsp;C) Ambos son LLM-powered agents &nbsp;D) El segundo caso no usa GenAI<br><br>
  <b>Respuesta correcta: B.</b> Según 1.2.2, los AI Chatbots ofrecen interacción conversacional directa; las LLM-Powered Testing Applications integran capacidades de LLM vía API dentro de herramientas de testing para tareas automatizadas y bien definidas.
  <div class="a-tip">💡 GenAI-1.2.2 (K2): Compare interaction models when using GenAI for software testing.</div>
  </div>
</div>
</div>

<div class="quiz-section">
<div class="quiz-title">📖 Capítulo 2 — Prompt Engineering para Testing Efectivo</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-basico">K1</span>¿Cuáles son los 6 componentes de un prompt estructurado según el syllabus? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Rol, tono, longitud, idioma, formato, ejemplo &nbsp;B) <strong>Role, Context, Instruction, Input data, Constraints, Output format</strong> &nbsp;C) Sistema, usuario, asistente, herramienta, memoria, historial &nbsp;D) Prompt, respuesta, evaluación, refinamiento, métrica, iteración<br><br>
  <b>Respuesta correcta: B.</b> Sección 2.1.1: role, context, instruction, input data, constraints, output format — los seis componentes básicos de un prompt estructurado para testing.
  <div class="a-tip">💡 GenAI-2.1.1 (K2): Give examples of the structure of prompts used in generative AI for software testing.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>Un tester necesita que el LLM genere test cases en formato Gherkin exacto, mostrando 2 ejemplos ya escritos por el equipo. ¿Qué técnica está usando? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Zero-shot prompting &nbsp;B) Meta prompting &nbsp;C) <strong>Few-shot prompting</strong> &nbsp;D) Prompt chaining<br><br>
  <b>Respuesta correcta: C.</b> Few-shot prompting da al modelo varios ejemplos (más de uno) dentro del prompt para consolidar el comportamiento deseado — ideal para formatos de salida específicos y restringidos como Gherkin.
  <div class="a-tip">💡 GenAI-2.1.2 (K2) / Tabla 2.2.5: Few-shot prompting es la técnica recomendada para "repetitive or specific/constrained output format tasks".</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-complejo">K3</span>Un tester debe analizar un reporte de regresión complejo: primero comparar resultados contra la especificación, luego agrupar defectos similares, y finalmente hacer una verificación cruzada — cada paso depende del resultado verificado del anterior. ¿Qué técnica de prompting es la más apropiada? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Few-shot prompting, porque hay que seguir un formato &nbsp;B) <strong>Prompt chaining, porque la tarea requiere descomposición en subtareas con verificación en cada paso</strong> &nbsp;C) Zero-shot prompting, porque el LLM ya sabe cómo analizar reportes &nbsp;D) Ninguna técnica de prompting aplica a este caso<br><br>
  <b>Respuesta correcta: B.</b> Este es exactamente el escenario del Hands-On 2.2.3b: un análisis metódico paso a paso donde cada etapa se conecta a la siguiente en una sola conversación con el LLM — el caso de uso textbook de prompt chaining.
  <div class="a-tip">💡 GenAI-2.2.4: Apply generative AI to test control and monitoring tasks / Tabla 2.2.5: prompt chaining para "tasks requiring precision with human verification at each step".</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>¿Qué métrica de evaluación de resultados de GenAI mide "la capacidad del modelo de identificar todas las instancias relevantes dentro de un dataset"? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Accuracy &nbsp;B) Precision &nbsp;C) <strong>Recall</strong> &nbsp;D) Diversity<br><br>
  <b>Respuesta correcta: C.</b> Recall mide si el modelo encontró TODAS las instancias relevantes — por ejemplo, si los test cases generados cubren tanto las particiones de equivalencia válidas como las inválidas de una clase de datos, sin dejar ninguna fuera.
  <div class="a-tip">💡 GenAI-2.3.1 (K2): Understand the metrics for evaluating the results of Generative AI on test tasks.</div>
  </div>
</div>
</div>

<div class="quiz-section">
<div class="quiz-title">📖 Capítulo 3 — Gestión de Riesgos de GenAI en Testing</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-basico">K1</span>Un LLM prioriza incorrectamente casos de prueba porque falla al aplicar lógica condicional paso a paso. ¿Qué tipo de defecto es este? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Hallucination &nbsp;B) <strong>Reasoning error</strong> &nbsp;C) Bias &nbsp;D) Data poisoning<br><br>
  <b>Respuesta correcta: B.</b> Un reasoning error ocurre cuando el LLM malinterpreta estructuras lógicas (causa-efecto, lógica condicional, resolución paso a paso) — el syllabus cita explícitamente la priorización de test cases como una tarea propensa a este tipo de error.
  <div class="a-tip">💡 GenAI-3.1.1 (K1): Recall the definitions of hallucinations, reasoning errors and biases in Generative AI systems.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>Un atacante envía un prompt deliberadamente muy largo para exceder la ventana de contexto del LLM, con la esperanza de que revele fragmentos de sus datos de entrenamiento. ¿A qué vector de ataque corresponde? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Request manipulation &nbsp;B) <strong>Data exfiltration</strong> &nbsp;C) Data poisoning &nbsp;D) Malicious code generation<br><br>
  <b>Respuesta correcta: B.</b> Este es el ejemplo textual del syllabus (tabla 3.2.2) para Data exfiltration: exceder la ventana de contexto con prompts largos para sobrecargar la memoria de la IA e inducirla a revelar datos de entrenamiento.
  <div class="a-tip">💡 GenAI-3.2.2 (K2): Give examples of data privacy and vulnerabilities in using Generative AI in software testing.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>¿Qué efecto tiene bajar el parámetro "temperature" al generar resultados con un LLM? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Aumenta la creatividad y diversidad de las respuestas &nbsp;B) Reduce el tamaño de la ventana de contexto &nbsp;C) <strong>Reduce la aleatoriedad, dando salidas más consistentes pero menos creativas</strong> &nbsp;D) Elimina por completo el comportamiento no-determinista<br><br>
  <b>Respuesta correcta: C.</b> Bajar la temperatura estrecha la distribución de probabilidad del siguiente token, reduciendo la aleatoriedad — resultados más consistentes, a costa de menor creatividad y diversidad. El syllabus aclara que la reproducibilidad completa nunca está garantizada.
  <div class="a-tip">💡 GenAI-3.1.4 (K1): Recall mitigation techniques for non-deterministic behavior of LLMs.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-basico">K1</span>¿Cuál de estas regulaciones/marcos NO aparece en la lista del syllabus como relevante para GenAI en testing? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) EU AI Act &nbsp;B) ISO/IEC 42001:2023 &nbsp;C) NIST AI Risk Management Framework &nbsp;D) <strong>ISO/IEC 26262</strong><br><br>
  <b>Respuesta correcta: D.</b> ISO/IEC 26262 es el estándar de seguridad funcional automotriz — no forma parte de la tabla 3.4.1 del syllabus CT-GenAI, que cita ISO/IEC 42001:2023, ISO/IEC 23053:2022, EU AI Act y NIST AI RMF.
  <div class="a-tip">💡 GenAI-3.4.1 (K1): Recall examples of AI regulations, standards and best practice frameworks relevant to Generative AI in software testing.</div>
  </div>
</div>
</div>

<div class="quiz-section">
<div class="quiz-title">📖 Capítulo 4 — Infraestructura de Testing potenciada por LLM</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>En una arquitectura RAG, ¿qué ocurre primero cuando llega una consulta del usuario? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) El LLM genera directamente la respuesta sin consultar nada &nbsp;B) <strong>Se recuperan fragmentos relevantes de la base de datos vectorial por similitud semántica (Retrieval)</strong> &nbsp;C) Se re-entrena el modelo con la nueva consulta &nbsp;D) Se ajusta la temperatura del modelo<br><br>
  <b>Respuesta correcta: B.</b> RAG trabaja en 2 pasos: (1) Retrieval — recuperar información relevante de la base de datos vectorial según similitud semántica de embeddings, y (2) Generation — el LLM combina esa información recuperada con su conocimiento previo para generar la respuesta.
  <div class="a-tip">💡 GenAI-4.1.2 (K2): Summarize Retrieval-Augmented Generation.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>Varios agentes de IA con roles especializados se comunican y coordinan entre sí para resolver un problema complejo de testing. ¿Cómo llama el syllabus a este esfuerzo coordinado? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Fine-tuning &nbsp;B) LLMOps &nbsp;C) <strong>Orchestration</strong> &nbsp;D) RAG<br><br>
  <b>Respuesta correcta: C.</b> El syllabus (4.1.3) define "orchestration" como la coordinación entre múltiples agentes de IA en una arquitectura multi-agente, cada uno con un rol especializado.
  <div class="a-tip">💡 GenAI-4.1.3 (K2): Explain the role and application of LLM-powered agents in automating test processes.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>Un modelo afinado para generar test cases en el formato de una organización obtiene excelentes resultados con los datos de entrenamiento, pero falla al probarlo con historias de usuario nuevas que nunca vio. ¿Qué problema del fine-tuning describe esto? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Opacidad &nbsp;B) <strong>Overfitting</strong> &nbsp;C) Data exfiltration &nbsp;D) Shadow AI<br><br>
  <b>Respuesta correcta: B.</b> El syllabus (4.2.1) define overfitting como cuando el modelo se vuelve demasiado especializado en los datos de entrenamiento, afectando negativamente su desempeño con datos nuevos no vistos — exactamente el síntoma descrito.
  <div class="a-tip">💡 GenAI-4.2.1 (K2): Explain the fine-tuning of language models for specific test tasks.</div>
  </div>
</div>
</div>

<div class="quiz-section">
<div class="quiz-title">📖 Capítulo 5 — Despliegue e Integración en Organizaciones de Testing</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-basico">K1</span>Un tester usa por su cuenta un chatbot de IA no aprobado por la empresa para analizar requisitos confidenciales del proyecto. ¿Qué concepto describe exactamente esta situación? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) LLMOps &nbsp;B) RAG &nbsp;C) <strong>Shadow AI</strong> &nbsp;D) Fine-tuning<br><br>
  <b>Respuesta correcta: C.</b> Shadow AI es el uso de herramientas o sistemas de GenAI dentro de una organización sin aprobación formal ni supervisión — trae riesgos de seguridad/privacidad, cumplimiento regulatorio y propiedad intelectual poco clara.
  <div class="a-tip">💡 GenAI-5.1.1 (K1): Recall the risks of shadow AI.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>¿Cuáles son los cuatro criterios oficiales para seleccionar un LLM/SLM para tareas de testing? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Popularidad, antigüedad, idioma, tamaño &nbsp;B) <strong>Desempeño del modelo, potencial de fine-tuning, costo recurrente, comunidad y soporte</strong> &nbsp;C) Velocidad, precio, marca, país de origen &nbsp;D) Context window, temperature, tokens, embeddings<br><br>
  <b>Respuesta correcta: B.</b> Sección 5.1.3: model performance, fine-tuning potential, recurring cost, y community and support son los 4 criterios que el syllabus define explícitamente para esta selección.
  <div class="a-tip">💡 GenAI-5.1.3 (K2): Summarize key criteria for selecting LLMs/SLMs for software test tasks in a given context.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-basico">K1</span>¿Cuál es la primera de las tres fases de adopción de GenAI en una organización de testing? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Utilization and Iteration &nbsp;B) Initiation and Usage Definition &nbsp;C) <strong>Discovery</strong> &nbsp;D) Fine-Tuning<br><br>
  <b>Respuesta correcta: C.</b> Discovery es la primera fase: se centra en generar conciencia y construir capacidad, capacitando a los equipos en conceptos de GenAI y experimentando con casos de uso iniciales.
  <div class="a-tip">💡 GenAI-5.1.4 (K1): Recall key phases in the adoption of Generative AI in a test organization.</div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag lvl-intermedio">K2</span>Según el syllabus, ¿cómo evoluciona el rol del Test Manager al adoptar GenAI? <span class="q-arr">▶</span></div>
  <div class="quiz-a">A) Deja de ser necesario porque la IA gestiona todo &nbsp;B) Solo debe aprender a usar un chatbot &nbsp;C) <strong>Incorpora estrategia de pruebas basada en IA, gestión de riesgos con IA, y coordinación de equipos híbridos de personas y agentes GenAI</strong> &nbsp;D) Su rol no cambia en absoluto<br><br>
  <b>Respuesta correcta: C.</b> Sección 5.2.3: las responsabilidades del Test Manager se actualizan para incluir estrategia de pruebas basada en IA, gestión de riesgos basada en IA, gobernanza de casos de uso, y coordinación de equipos híbridos de testers humanos y agentes GenAI.
  <div class="a-tip">💡 GenAI-5.2.3 (K1): Recognize how test processes and responsibilities shift within a test organization when adopting Generative AI.</div>
  </div>
</div>
</div>

<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el examen de práctica...</p>
</div>`,

};  // fin GENAI_RICH
