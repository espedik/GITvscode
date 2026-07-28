
// ══════════════════════════════════════════════════════════════════
//  STANDARDS_RICH — Estándares de la industria
// ══════════════════════════════════════════════════════════════════
const STANDARDS_RICH = {

'iso26262': `
<div class="tab-group-st1">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'st1-1','st1')">Qué es y por qué existe</button>
    <button class="tab-btn" onclick="switchTab(this,'st1-2','st1')">Las 12 partes</button>
    <button class="tab-btn" onclick="switchTab(this,'st1-3','st1')">V-Model del ciclo de seguridad</button>
  </div>
  <div id="st1-1" class="tab-panel active">
<div class="concept-intro"><strong>ISO 26262</strong> es el estándar internacional de <strong>seguridad funcional</strong> para sistemas eléctricos/electrónicos (E/E) en vehículos. Se publicó en 2011 (1ª edición, solo vehículos de pasajeros ≤3500 kg) y se actualizó en 2018 (2ª edición, que amplía el alcance a camiones, autobuses y motocicletas). Es la adaptación al dominio automotriz del estándar genérico <strong>IEC 61508</strong> (seguridad funcional para cualquier industria).</div>
<div class="concept-intro">Su objetivo es muy concreto: evitar que un <strong>fallo eléctrico o electrónico</strong> — un sensor que da un valor erróneo, un bit que se corrompe en memoria, un mensaje CAN que llega tarde — se traduzca en daño a personas. Para lograrlo no exige un producto específico, sino un <strong>proceso</strong>: qué actividades, revisiones, análisis y evidencias debe generar el equipo de desarrollo, con un rigor proporcional a qué tan crítica es cada función.</div>
<table class="kv-table"><tr><th>Edición</th><th>Qué cambió</th></tr>
<tr><td>2011 — 1ª edición</td><td>10 partes. Solo vehículos de pasajeros ≤3500 kg.</td></tr>
<tr><td>2018 — 2ª edición</td><td>Agrega la Parte 12 (motocicletas) y la Parte 11 (guía para semiconductores); amplía a camiones y autobuses; refuerza la Parte 6 con más detalle sobre <em>freedom from interference</em> entre elementos de distinto ASIL en el mismo procesador.</td></tr>
</table>
<div class="alert-card">💡 Pregunta clásica de entrevista: <strong>"¿ISO 26262 cubre todos los riesgos de un sistema ADAS?"</strong> No — solo cubre fallos E/E. Los riesgos que vienen de las <strong>limitaciones de diseño</strong> de un sistema que funciona exactamente "como se diseñó" y aun así causa un accidente (ej. una cámara que no distingue a un peatón con poca luz) los cubre <strong>ISO 21448 (SOTIF — Safety Of The Intended Functionality)</strong>, un estándar complementario y cada vez más relevante con el auge de ADAS/AD.</div>
  </div>
  <div id="st1-2" class="tab-panel">
<div class="concept-intro">El estándar se organiza en 12 partes. En una entrevista vale más saber <strong>qué contiene cada parte y en qué fase del desarrollo se usa</strong> que memorizar el número exacto de memoria.</div>
<table class="kv-table"><tr><th>Parte</th><th>Contenido</th><th>Fase</th></tr>
<tr><td>1</td><td>Vocabulario y definiciones</td><td>Referencia</td></tr>
<tr><td>2</td><td>Gestión de la seguridad funcional: roles, cultura de seguridad, Safety Case</td><td>Todo el ciclo</td></tr>
<tr><td>3</td><td>Fase de concepto: HARA, Safety Goals, Functional Safety Concept</td><td>Concepto</td></tr>
<tr><td>4</td><td>Desarrollo a nivel sistema: arquitectura técnica, Technical Safety Concept</td><td>Sistema</td></tr>
<tr><td>5</td><td>Desarrollo a nivel hardware: diseño, FMEA de HW, métricas de fallo aleatorio</td><td>Hardware</td></tr>
<tr><td>6</td><td>Desarrollo a nivel software: diseño, coding guidelines, testing de SW</td><td>Software</td></tr>
<tr><td>7</td><td>Producción, operación, servicio y decommission</td><td>Post-desarrollo</td></tr>
<tr><td>8</td><td>Procesos de soporte: gestión de configuración/cambios, calificación de herramientas</td><td>Todo el ciclo</td></tr>
<tr><td>9</td><td>Análisis orientados a ASIL: descomposición de ASIL, análisis de dependencias entre elementos</td><td>Todo el ciclo</td></tr>
<tr><td>10</td><td>Guía informativa (no normativa) para entender el resto de las partes</td><td>Referencia</td></tr>
<tr><td>11</td><td>Guía de aplicación en semiconductores</td><td>Hardware</td></tr>
<tr><td>12</td><td>Adaptación del estándar para motocicletas</td><td>Todo el ciclo</td></tr>
</table>
  </div>
  <div id="st1-3" class="tab-panel">
<div class="concept-intro">El ciclo de vida de seguridad de ISO 26262 sigue la forma de una <strong>V</strong>, igual que el desarrollo de software clásico: cada nivel de diseño en el lado izquierdo tiene su contraparte de verificación en el lado derecho, al mismo nivel de detalle — esto es lo que se conoce como <strong>trazabilidad</strong>, y es de lo primero que revisa un auditor de seguridad funcional.</div>
<div class="diagram-card">
<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="V-Model del ciclo de vida de seguridad de ISO 26262: fase de concepto, diseño de sistema y diseño de hardware y software bajando por la izquierda; verificación de hardware y software, integración y validación de seguridad subiendo por la derecha, cada nivel trazable a su equivalente del otro lado">
  <g font-family="'Segoe UI',sans-serif">
    <line x1="110" y1="40" x2="320" y2="220" stroke="var(--border)" stroke-width="2"/>
    <line x1="320" y1="220" x2="530" y2="40" stroke="var(--border)" stroke-width="2"/>

    <rect x="20" y="15" width="190" height="46" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="115" y="34" font-size="11" font-weight="700" fill="var(--accent)" text-anchor="middle">Parte 3 — Concepto</text>
    <text x="115" y="49" font-size="10" fill="var(--text-muted)" text-anchor="middle">HARA, Safety Goals</text>

    <rect x="95" y="95" width="190" height="46" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="190" y="114" font-size="11" font-weight="700" fill="var(--accent)" text-anchor="middle">Parte 4 — Sistema</text>
    <text x="190" y="129" font-size="10" fill="var(--text-muted)" text-anchor="middle">Technical Safety Concept</text>

    <rect x="225" y="197" width="190" height="46" rx="7" fill="var(--accent)" fill-opacity="0.85" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="320" y="216" font-size="11" font-weight="700" fill="white" text-anchor="middle">Partes 5 / 6 — HW / SW</text>
    <text x="320" y="231" font-size="10" fill="white" text-anchor="middle">Diseño detallado</text>

    <rect x="355" y="95" width="190" height="46" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="450" y="114" font-size="11" font-weight="700" fill="var(--green)" text-anchor="middle">Verificación HW / SW</text>
    <text x="450" y="129" font-size="10" fill="var(--text-muted)" text-anchor="middle">Unit test, code review</text>

    <rect x="430" y="15" width="190" height="46" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="525" y="34" font-size="11" font-weight="700" fill="var(--green)" text-anchor="middle">Integración y Validación</text>
    <text x="525" y="49" font-size="10" fill="var(--text-muted)" text-anchor="middle">Safety Validation (Parte 4)</text>

    <line x1="210" y1="38" x2="430" y2="38" stroke="var(--text-muted)" stroke-width="1" stroke-dasharray="3 3"/>
    <line x1="285" y1="118" x2="355" y2="118" stroke="var(--text-muted)" stroke-width="1" stroke-dasharray="3 3"/>

    <text x="320" y="270" font-size="10.5" fill="var(--text-muted)" text-anchor="middle">Las líneas punteadas son la trazabilidad: cada requisito de diseño debe verificarse explícitamente en el lado derecho</text>
  </g>
</svg>
<div class="diagram-caption">Bajando por la izquierda se <b>diseña</b> (de lo general al detalle); subiendo por la derecha se <b>verifica</b> lo diseñado en ese mismo nivel. La Parte 7 (Production) ocurre después de cerrar la V, cuando el producto ya está validado.</div>
</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre ISO 26262...</p>
</div>`,

'asil': `
<div class="diagram-card" style="margin-bottom:16px">
<svg viewBox="0 0 560 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Espectro de niveles ASIL desde QM sin requisitos de seguridad hasta ASIL-D el más crítico, representando severidad exposición y controlabilidad crecientes de izquierda a derecha">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="10" y="20" width="100" height="40" fill="#9CA3AF" fill-opacity="0.35" stroke="#9CA3AF" stroke-width="1.5"/>
    <text x="60" y="45" font-size="13" font-weight="700" text-anchor="middle" fill="#4B5563">QM</text>
    <rect x="110" y="20" width="100" height="40" fill="var(--green)" fill-opacity="0.22" stroke="var(--green)" stroke-width="1.5"/>
    <text x="160" y="45" font-size="13" font-weight="700" text-anchor="middle" fill="var(--green)">ASIL-A</text>
    <rect x="210" y="20" width="100" height="40" fill="#EAB308" fill-opacity="0.28" stroke="#CA8A04" stroke-width="1.5"/>
    <text x="260" y="45" font-size="13" font-weight="700" text-anchor="middle" fill="#92700C">ASIL-B</text>
    <rect x="310" y="20" width="100" height="40" fill="#F97316" fill-opacity="0.3" stroke="#EA580C" stroke-width="1.5"/>
    <text x="360" y="45" font-size="13" font-weight="700" text-anchor="middle" fill="#C2410C">ASIL-C</text>
    <rect x="410" y="20" width="140" height="40" fill="#DC2626" fill-opacity="0.28" stroke="#DC2626" stroke-width="1.5"/>
    <text x="480" y="45" font-size="13" font-weight="700" text-anchor="middle" fill="#B91C1C">ASIL-D</text>
    <text x="10" y="80" font-size="10.5" fill="var(--text-muted)">Sin requisitos de seguridad</text>
    <text x="480" y="80" font-size="10.5" fill="var(--text-muted)" text-anchor="middle">Rigor de proceso máximo</text>
  </g>
</svg>
<div class="diagram-caption">A mayor severidad, exposición y menor controlabilidad, mayor el ASIL — y con él, más análisis, más cobertura de pruebas y más revisiones independientes exige el estándar.</div>
</div>
<div class="tab-group-st2">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'st2-1','st2')">S × E × C explicados</button>
    <button class="tab-btn" onclick="switchTab(this,'st2-2','st2')">Matriz de determinación</button>
    <button class="tab-btn" onclick="switchTab(this,'st2-3','st2')">Ejemplos por sistema</button>
  </div>
  <div id="st2-1" class="tab-panel active">
<div class="concept-intro">ASIL (Automotive Safety Integrity Level) se calcula en el HARA combinando tres factores independientes de cada hazardous event. No es un juicio subjetivo: ISO 26262-3 define tablas concretas para clasificar cada uno.</div>
<table class="kv-table"><tr><th>Factor</th><th>Niveles</th><th>Significado</th></tr>
<tr><td><strong>S — Severity</strong></td><td>S0 · S1 · S2 · S3</td><td>S0 sin heridas; S1 heridas leves/moderadas; S2 heridas severas (sobrevivencia probable); S3 heridas que ponen en riesgo la vida o son mortales.</td></tr>
<tr><td><strong>E — Exposure</strong></td><td>E0 · E1 · E2 · E3 · E4</td><td>Probabilidad de estar en esa situación operacional. E1 muy baja (&lt;1% del tiempo de manejo); E4 alta (situación presente en casi cada trayecto, ej. "conduciendo en línea recta").</td></tr>
<tr><td><strong>C — Controllability</strong></td><td>C0 · C1 · C2 · C3</td><td>Capacidad del conductor promedio de evitar el daño reaccionando a tiempo. C1 la mayoría lo controla (≥99%); C3 difícil o imposible de controlar (&lt;90%).</td></tr>
</table>
<div class="alert-card">💡 E0 y C0 quedan fuera del análisis de riesgo: si una situación es "increíblemente improbable" o "siempre controlable", no aporta ASIL — la función puede quedar en QM (Quality Management) para ese hazard específico.</div>
  </div>
  <div id="st2-2" class="tab-panel">
<div class="concept-intro">Esta es, en esencia, la tabla de determinación de ASIL de ISO 26262-3 (Anexo B). Se lee así: se toma la combinación de S y E de un hazardous event, se cruza con la columna de C, y el resultado es el ASIL (o QM si el riesgo no lo amerita).</div>
<table class="kv-table"><tr><th>S, E</th><th>C1</th><th>C2</th><th>C3</th></tr>
<tr><td>S1, E1</td><td>QM</td><td>QM</td><td>QM</td></tr>
<tr><td>S1, E2</td><td>QM</td><td>QM</td><td>QM</td></tr>
<tr><td>S1, E3</td><td>QM</td><td>QM</td><td>A</td></tr>
<tr><td>S1, E4</td><td>QM</td><td>A</td><td>B</td></tr>
<tr><td>S2, E1</td><td>QM</td><td>QM</td><td>QM</td></tr>
<tr><td>S2, E2</td><td>QM</td><td>QM</td><td>A</td></tr>
<tr><td>S2, E3</td><td>QM</td><td>A</td><td>B</td></tr>
<tr><td>S2, E4</td><td>A</td><td>B</td><td>C</td></tr>
<tr><td>S3, E1</td><td>QM</td><td>QM</td><td>A</td></tr>
<tr><td>S3, E2</td><td>QM</td><td>A</td><td>B</td></tr>
<tr><td>S3, E3</td><td>A</td><td>B</td><td>C</td></tr>
<tr><td>S3, E4</td><td>B</td><td>C</td><td>D</td></tr>
</table>
<div class="alert-card">💡 Patrón para recordarla en una entrevista: el ASIL sube cuando <strong>cualquiera</strong> de los tres factores sube. La combinación más severa posible (S3, E4, C3) siempre da ASIL-D; la menos severa con algún riesgo real casi siempre resuelve en QM.</div>
  </div>
  <div id="st2-3" class="tab-panel">
<div class="concept-intro">Traducir la teoría a sistemas reales del vehículo ayuda a fijar el concepto — y es exactamente el tipo de pregunta que se hace en entrevista.</div>
<table class="kv-table"><tr><th>Sistema</th><th>ASIL</th><th>Razón</th></tr>
<tr><td>Iluminación interior</td><td>QM</td><td>Sin riesgo de seguridad</td></tr>
<tr><td>Climatización</td><td>ASIL-A</td><td>Fallo distractor, no peligroso por sí mismo</td></tr>
<tr><td>Airbag — control de despliegue</td><td>ASIL-D</td><td>Despliegue accidental o falta de despliegue puede ser mortal</td></tr>
<tr><td>ABS (frenos antibloqueo)</td><td>ASIL-C / D</td><td>Pérdida de control en frenada puede causar accidente</td></tr>
<tr><td>EPS (dirección asistida eléctrica)</td><td>ASIL-D</td><td>Pérdida de dirección a alta velocidad = riesgo de muerte</td></tr>
<tr><td>ACC (control de crucero adaptativo)</td><td>ASIL-B</td><td>Pérdida parcialmente controlable por el conductor</td></tr>
<tr><td>BMS — corte de carga en batería EV</td><td>ASIL-C</td><td>Falla puede derivar en sobrecarga térmica / incendio</td></tr>
<tr><td>Cluster / velocímetro</td><td>ASIL-B</td><td>Dato incorrecto puede llevar al conductor a exceder límites seguros</td></tr>
</table>
<div class="concept-intro">El ASIL de un sistema determina, en la práctica: cuántas técnicas de análisis son obligatorias (FMEA, FTA), qué cobertura de pruebas se exige (MC/DC para ASIL-D), y si se requiere independencia entre quien desarrolla y quien verifica.</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre ASIL...</p>
</div>`,

'hara': `
<div class="tab-group-st3">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'st3-1','st3')">Proceso paso a paso</button>
    <button class="tab-btn" onclick="switchTab(this,'st3-2','st3')">Ejemplo completo: AEB</button>
    <button class="tab-btn" onclick="switchTab(this,'st3-3','st3')">Safe State & FTTI</button>
  </div>
  <div id="st3-1" class="tab-panel active">
<div class="concept-intro">El HARA (Hazard Analysis and Risk Assessment) es el análisis central de la fase de concepto (ISO 26262-3). Convierte "esta función puede fallar" en un objetivo de seguridad concreto y medible.</div>
<div class="diagram-card">
<svg viewBox="0 0 620 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flujo del proceso HARA: situaciones operacionales, luego hazardous events, luego evaluación de severidad exposición y controlabilidad, luego determinación del ASIL, y finalmente definición de Safety Goals">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="5" y="20" width="110" height="55" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="60" y="43" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Situaciones</text>
    <text x="60" y="56" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">operacionales</text>

    <rect x="133" y="20" width="110" height="55" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="188" y="43" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Hazardous</text>
    <text x="188" y="56" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Events</text>

    <rect x="261" y="20" width="110" height="55" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="316" y="38" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Evaluar</text>
    <text x="316" y="51" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">S · E · C</text>

    <rect x="389" y="20" width="110" height="55" rx="7" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
    <text x="444" y="43" font-size="10" font-weight="700" fill="#92400E" text-anchor="middle">Determinar</text>
    <text x="444" y="56" font-size="10" font-weight="700" fill="#92400E" text-anchor="middle">ASIL</text>

    <rect x="510" y="20" width="108" height="55" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="564" y="43" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">Safety</text>
    <text x="564" y="56" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">Goals</text>

    <g stroke="var(--text-muted)" stroke-width="1.4" fill="var(--text-muted)">
      <line x1="115" y1="47" x2="130" y2="47"/><path d="M130,43 L138,47 L130,51 Z"/>
      <line x1="243" y1="47" x2="258" y2="47"/><path d="M258,43 L266,47 L258,51 Z"/>
      <line x1="371" y1="47" x2="386" y2="47"/><path d="M386,43 L394,47 L386,51 Z"/>
      <line x1="499" y1="47" x2="507" y2="47"/><path d="M507,43 L515,47 L507,51 Z"/>
    </g>
  </g>
</svg>
<div class="diagram-caption">De la situación de manejo al objetivo de seguridad: cada flecha es una decisión documentada y trazable — lo que un auditor de seguridad funcional revisa primero.</div>
</div>
<div class="concept-intro"><b>1. Identificar situaciones operacionales:</b> ¿en qué contextos opera el vehículo? (ciudad, autopista, lluvia, noche, estacionamiento, carga de batería, remolque).<br>
<b>2. Identificar hazardous events:</b> para cada función, ¿qué pasa si falla en esa situación? Ej: EPS falla en autopista a 120 km/h → pérdida de dirección.<br>
<b>3. Evaluar S, E, C:</b> para cada hazardous event, asignar Severity, Exposure y Controllability según las tablas del estándar.<br>
<b>4. Determinar ASIL:</b> cruzando S, E, C en la matriz de ISO 26262-3.<br>
<b>5. Definir Safety Goals:</b> el objetivo que elimina o mitiga el hazard. Ej: "El EPS no debe causar un ángulo de dirección inadvertido &gt;10° durante más de 2s".<br>
<b>6. Asignar ASIL al Safety Goal:</b> el Safety Goal hereda el ASIL calculado y se propaga hacia abajo en los requisitos técnicos.</div>
  </div>
  <div id="st3-2" class="tab-panel">
<div class="concept-intro">Un HARA completo, aplicado a un sistema de frenado de emergencia (Automatic Emergency Braking), muestra cómo dos fallos del mismo sistema pueden tener ASIL muy distintos según su naturaleza.</div>
<div class="code-block"><div class="code-lang">HARA — Ejemplo AEB</div><pre>
Función: Automatic Emergency Braking (AEB)
Situación operacional: Autopista, 120 km/h, tráfico denso

Hazardous Event 1: AEB activa freno completo sin obstáculo real
  S = S3 (severidad muy alta — vehículo de atrás podría colisionar)
  E = E3 (exposición: autopistas son frecuentes)
  C = C3 (incontrolable para el conductor en 0.3s)
  ASIL = D

  Safety Goal 1: "El AEB no debe realizar una frenada de emergencia
  completa con deceleración &gt;0.4g sin obstáculo confirmado"
  ASIL del SG-1: ASIL-D

Hazardous Event 2: AEB no activa cuando hay obstáculo real
  S = S3 (colisión frontal a alta velocidad = fatal)
  E = E3 (autopistas con frenazo brusco delantero)
  C = C1 (conductor puede frenar manualmente)
  ASIL = B

  Safety Goal 2: "El AEB debe activarse en &lt;250ms al detectar
  obstáculo confirmado con riesgo de colisión &gt;80%"
  ASIL del SG-2: ASIL-B</pre></div>
<div class="alert-card">💡 Nota cómo el <strong>mismo sistema</strong> puede tener ASIL-D para "hace algo que no debía" (falso positivo) y ASIL-B para "no hace lo que debía" (falso negativo) — el ASIL se asigna por hazardous event, no por función completa.</div>
  </div>
  <div id="st3-3" class="tab-panel">
<div class="concept-intro">Dos conceptos que se derivan directamente del HARA y aparecen en casi cualquier entrevista de safety: <strong>Safe State</strong> y <strong>FTTI</strong>.</div>
<div class="concept-intro"><strong>Safe State:</strong> el estado del sistema en el que el riesgo se considera aceptable, al que debe transicionar cuando detecta un fallo que no puede manejar de forma segura. No siempre es "apagarse": en EPS el safe state puede ser perder la asistencia eléctrica pero mantener la dirección mecánica (fail-safe); en un motor puede ser entrar a "limp home mode" con potencia limitada; en frenos regenerativos puede ser desactivar el regenerativo pero mantener el frenado hidráulico normal.</div>
<div class="diagram-card">
<svg viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Línea de tiempo del FTTI: desde que ocurre el fallo, pasando por el tiempo de detección y el tiempo de reacción, hasta alcanzar el estado seguro">
  <g font-family="'Segoe UI',sans-serif">
    <line x1="40" y1="90" x2="560" y2="90" stroke="var(--border)" stroke-width="2"/>
    <circle cx="40" cy="90" r="5" fill="#DC2626"/>
    <text x="40" y="115" font-size="10" text-anchor="middle" fill="var(--text-muted)">Fallo ocurre</text>
    <text x="40" y="128" font-size="9" text-anchor="middle" fill="var(--text-muted)">(t0)</text>

    <rect x="40" y="80" width="220" height="20" fill="#FEF3C7" fill-opacity="0.8"/>
    <text x="150" y="70" font-size="10" font-weight="700" fill="#92400E" text-anchor="middle">Fault Detection Time</text>

    <circle cx="260" cy="90" r="5" fill="#D97706"/>
    <text x="260" y="115" font-size="10" text-anchor="middle" fill="var(--text-muted)">Fallo detectado</text>
    <text x="260" y="128" font-size="9" text-anchor="middle" fill="var(--text-muted)">(t1)</text>

    <rect x="260" y="80" width="220" height="20" fill="var(--green-light)"/>
    <text x="370" y="70" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">Fault Reaction Time</text>

    <circle cx="480" cy="90" r="5" fill="var(--green)"/>
    <text x="480" y="115" font-size="10" text-anchor="middle" fill="var(--text-muted)">Safe State alcanzado</text>
    <text x="480" y="128" font-size="9" text-anchor="middle" fill="var(--text-muted)">(t2)</text>

    <path d="M40,35 L40,25 L480,25 L480,35" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="260" y="18" font-size="11" font-weight="700" fill="var(--accent)" text-anchor="middle">FTTI — Fault Tolerant Time Interval</text>
  </g>
</svg>
<div class="diagram-caption">FTTI es el tiempo total disponible entre que ocurre el fallo y que el daño realmente sucedería. Se reparte entre <b>detectar</b> el fallo y <b>reaccionar</b> llegando al estado seguro — si la suma de ambos supera el FTTI, el diseño no cumple el Safety Goal.</div>
</div>
<div class="alert-card">💡 En entrevista: si te preguntan "¿qué pasa si el sistema detecta el fallo pero tarda demasiado en reaccionar?" — la respuesta es que igual se viola el Safety Goal, porque lo que importa es el <strong>tiempo total</strong> (detección + reacción), no solo la detección.</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre HARA...</p>
</div>`,

'aspice': `
<div class="tab-group-st4">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'st4-1','st4')">Qué es y quién lo exige</button>
    <button class="tab-btn" onclick="switchTab(this,'st4-2','st4')">Capability Levels</button>
    <button class="tab-btn" onclick="switchTab(this,'st4-3','st4')">V-Model y procesos SWE</button>
  </div>
  <div id="st4-1" class="tab-panel active">
<div class="concept-intro"><strong>Automotive SPICE</strong> (Software Process Improvement and Capability dEtermination) es el framework de evaluación de <strong>procesos</strong> de desarrollo de software específico de la industria automotriz, derivado de ISO/IEC 15504 (SPICE genérico).</div>
<div class="concept-intro">Los OEMs alemanes (BMW, VW, Mercedes-Benz, Audi) lo exigen contractualmente a sus proveedores Tier 1 (Bosch, Continental, Aptiv, ZF). Si un proveedor quiere venderle software a BMW, necesita demostrar ASPICE nivel 2-3 como mínimo. La versión vigente es <strong>PAM 4.0 (2023)</strong>, alineada con el "VDA Scope" que exige la industria alemana, y que ya incorpora procesos específicos de <strong>Machine Learning (MLE)</strong> y de <strong>Cybersecurity (SEC)</strong>.</div>
<div class="alert-card">💡 Distinción clave para entrevista: ASPICE <strong>no certifica el producto</strong> (eso lo hace, en otro plano, ISO 26262 con el Safety Case). ASPICE evalúa la <strong>madurez del proceso</strong> de la organización — se puede tener un producto excelente construido con un proceso deficiente, y eso es justo lo que ASPICE busca prevenir a futuro, aunque el producto actual funcione.</div>
  </div>
  <div id="st4-2" class="tab-panel">
<div class="concept-intro">Cada proceso evaluado (ej. SWE.1) recibe una calificación de 0 a 5 llamada <strong>Capability Level</strong>, medida a través de <strong>Process Attributes (PA)</strong> específicos por nivel.</div>
<table class="kv-table"><tr><th>Nivel</th><th>Nombre</th><th>Descripción</th></tr>
<tr><td>0</td><td>Incomplete</td><td>El proceso no existe o no alcanza su propósito</td></tr>
<tr><td>1</td><td>Performed</td><td>El proceso se realiza y logra su propósito (PA 1.1)</td></tr>
<tr><td>2</td><td>Managed</td><td>Está planificado, monitoreado y controlado (PA 2.1 gestión de desempeño, PA 2.2 gestión de work products)</td></tr>
<tr><td>3</td><td>Established</td><td>Proceso estándar de la organización, definido y usado consistentemente (PA 3.1, PA 3.2)</td></tr>
<tr><td>4</td><td>Predictable</td><td>Medido cuantitativamente y su desempeño es predecible</td></tr>
<tr><td>5</td><td>Innovating</td><td>Mejora continua basada en medición y análisis de causa raíz</td></tr>
</table>
<div class="concept-intro">Los OEMs típicamente piden <strong>nivel 2</strong> como umbral mínimo de arranque de proyecto, y buscan <strong>nivel 3</strong> para proyectos safety-critical de largo plazo con el proveedor.</div>
  </div>
  <div id="st4-3" class="tab-panel">
<div class="concept-intro">Los procesos de Software Engineering (SWE) también siguen la lógica de V-Model: cada nivel de diseño se verifica en el nivel equivalente del lado derecho.</div>
<div class="diagram-card">
<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="V-Model de ASPICE: SWE.1 Requisitos, SWE.2 Diseño de Arquitectura y SWE.3 Diseño Detallado bajando por la izquierda; SWE.4 Verificación de Unidad y SWE.5/6 Integración y Calificación subiendo por la derecha, cada nivel trazable al equivalente del otro lado">
  <g font-family="'Segoe UI',sans-serif">
    <line x1="110" y1="40" x2="320" y2="220" stroke="var(--border)" stroke-width="2"/>
    <line x1="320" y1="220" x2="530" y2="40" stroke="var(--border)" stroke-width="2"/>

    <rect x="20" y="15" width="190" height="46" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="115" y="34" font-size="11" font-weight="700" fill="var(--accent)" text-anchor="middle">SWE.1 — Requisitos SW</text>
    <text x="115" y="49" font-size="10" fill="var(--text-muted)" text-anchor="middle">Software Requirements Analysis</text>

    <rect x="95" y="95" width="190" height="46" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="190" y="114" font-size="11" font-weight="700" fill="var(--accent)" text-anchor="middle">SWE.2 — Arquitectura</text>
    <text x="190" y="129" font-size="10" fill="var(--text-muted)" text-anchor="middle">Architectural Design</text>

    <rect x="225" y="197" width="190" height="46" rx="7" fill="var(--accent)" fill-opacity="0.85" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="320" y="216" font-size="11" font-weight="700" fill="white" text-anchor="middle">SWE.3 — Diseño Detallado</text>
    <text x="320" y="231" font-size="10" fill="white" text-anchor="middle">Detailed Design &amp; Unit Constr.</text>

    <rect x="355" y="95" width="190" height="46" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="450" y="114" font-size="11" font-weight="700" fill="var(--green)" text-anchor="middle">SWE.4 — Verif. de Unidad</text>
    <text x="450" y="129" font-size="10" fill="var(--text-muted)" text-anchor="middle">Unit Verification</text>

    <rect x="430" y="15" width="190" height="46" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="525" y="34" font-size="11" font-weight="700" fill="var(--green)" text-anchor="middle">SWE.5 / SWE.6</text>
    <text x="525" y="49" font-size="10" fill="var(--text-muted)" text-anchor="middle">Integration &amp; Qualification Test</text>

    <line x1="210" y1="38" x2="430" y2="38" stroke="var(--text-muted)" stroke-width="1" stroke-dasharray="3 3"/>
    <line x1="285" y1="118" x2="355" y2="118" stroke="var(--text-muted)" stroke-width="1" stroke-dasharray="3 3"/>
  </g>
</svg>
<div class="diagram-caption">SWE.1↔SWE.6: se verifica que el software cumple los requisitos. SWE.2↔SWE.5: se verifica que la arquitectura e interfaces funcionan integradas. SWE.3↔SWE.4: se verifica que cada unidad de código funciona según su diseño detallado.</div>
</div>
<table class="kv-table"><tr><th>Proceso</th><th>Work product típico</th></tr>
<tr><td>SWE.1</td><td>Especificación de requisitos de software, matriz de trazabilidad hacia requisitos de sistema</td></tr>
<tr><td>SWE.2</td><td>Documento de arquitectura, diagramas de componentes e interfaces</td></tr>
<tr><td>SWE.3</td><td>Diseño detallado por unidad, código fuente</td></tr>
<tr><td>SWE.4</td><td>Casos de prueba unitarios, reporte de cobertura de código</td></tr>
<tr><td>SWE.5</td><td>Plan y reporte de pruebas de integración</td></tr>
<tr><td>SWE.6</td><td>Reporte de prueba de calificación del software completo</td></tr>
</table>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre ASPICE...</p>
</div>`,

'misra': `
<div class="tab-group-st5">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'st5-1','st5')">Qué es MISRA</button>
    <button class="tab-btn" onclick="switchTab(this,'st5-2','st5')">Reglas clave — malo vs. bueno</button>
    <button class="tab-btn" onclick="switchTab(this,'st5-3','st5')">Clasificación y herramientas</button>
  </div>
  <div id="st5-1" class="tab-panel active">
<div class="concept-intro"><strong>MISRA</strong> (Motor Industry Software Reliability Association) publica guías de codificación para C y C++ que restringen las construcciones más peligrosas o ambiguas del lenguaje, mejorando la <strong>seguridad, portabilidad y mantenibilidad</strong> del código embebido.</div>
<table class="kv-table"><tr><th>Versión</th><th>Detalle</th></tr>
<tr><td>MISRA C:2012</td><td>La más usada hoy. 143 reglas (Mandatory + Required + Advisory). Prácticamente obligatoria en código con ASIL asignado.</td></tr>
<tr><td>MISRA C++:2008</td><td>Equivalente para C++. 228 reglas.</td></tr>
<tr><td>MISRA C:2023</td><td>Versión más reciente, con mejoras de compatibilidad para C11/C17 y mejor cobertura de análisis estático moderno.</td></tr>
</table>
<div class="alert-card">💡 MISRA no es ley ni parte formal de ISO 26262 — pero ISO 26262-6 recomienda explícitamente el uso de "un subconjunto de lenguaje" y guías de codificación como MISRA, así que en la práctica todo proyecto ASIL-B o superior lo adopta.</div>
  </div>
  <div id="st5-2" class="tab-panel">
<div class="concept-intro">Ver el código "que se evita" al lado del "que se prefiere" ayuda a fijar por qué cada regla existe — más allá de memorizar el número.</div>
<div class="concept-intro"><strong>Rule 15.1 (Required) — Evitar goto</strong></div>
<div class="error-compare">
  <div class="err-bad">
    <div class="err-label">❌ Evita</div>
    <pre>if (error) {
    goto cleanup;
}
process_data();
cleanup:
    free(resource);</pre>
  </div>
  <div class="err-good">
    <div class="err-label">✅ Prefiere</div>
    <pre>if (!error) {
    process_data();
}
free(resource);</pre>
  </div>
</div>
<div class="error-note"><b>Por qué:</b> goto rompe el flujo estructurado del programa, dificultando el análisis estático del camino de ejecución y la verificación de cobertura de código — un requisito central para certificar software ASIL.</div>
<div class="concept-intro" style="margin-top:14px"><strong>Rule 21.3 (Required) — Evitar memoria dinámica</strong></div>
<div class="error-compare">
  <div class="err-bad">
    <div class="err-label">❌ Evita</div>
    <pre>int *buf = malloc(n * sizeof(int));
if (buf != NULL) {
    use(buf);
    free(buf);
}</pre>
  </div>
  <div class="err-good">
    <div class="err-label">✅ Prefiere</div>
    <pre>#define MAX_N 64
static int buf[MAX_N];

use(buf);</pre>
  </div>
</div>
<div class="error-note"><b>Por qué:</b> malloc puede fallar en tiempo de ejecución de forma no determinista y provoca fragmentación de memoria en sistemas que corren meses sin reiniciar. Reservar memoria estática en tiempo de compilación hace el consumo de RAM predecible y verificable.</div>
  </div>
  <div id="st5-3" class="tab-panel">
<div class="concept-intro">Cada regla MISRA tiene una categoría que define qué tan estricta es su exigencia:</div>
<table class="kv-table"><tr><th>Categoría</th><th>Significado</th></tr>
<tr><td>Mandatory</td><td>No se puede desviar bajo ninguna circunstancia — incumplirla invalida la conformidad MISRA del proyecto.</td></tr>
<tr><td>Required</td><td>Se debe cumplir, salvo con una <em>deviation</em> formal: justificación técnica documentada y aprobada.</td></tr>
<tr><td>Advisory</td><td>Recomendada como buena práctica, pero no bloquea la conformidad si no se sigue.</td></tr>
</table>
<div class="concept-intro"><strong>Herramientas de verificación MISRA</strong> (análisis estático que corre sobre el código para detectar violaciones automáticamente):</div>
<table class="kv-table"><tr><th>Herramienta</th><th>Fabricante</th></tr>
<tr><td>PC-lint Plus</td><td>Gimpel Software</td></tr>
<tr><td>Polyspace Code Prover</td><td>MathWorks</td></tr>
<tr><td>QA-C / QA-C++</td><td>Perforce</td></tr>
<tr><td>C/C++test</td><td>Parasoft</td></tr>
<tr><td>LDRA Testbed</td><td>LDRA</td></tr>
</table>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre MISRA C...</p>
</div>`,

'iso21434': `
<div class="tab-group-st6">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'st6-1','st6')">Qué es y por qué (UNECE)</button>
    <button class="tab-btn" onclick="switchTab(this,'st6-2','st6')">CAL — Cybersecurity Assurance Level</button>
    <button class="tab-btn" onclick="switchTab(this,'st6-3','st6')">Safety vs. Security</button>
  </div>
  <div id="st6-1" class="tab-panel active">
<div class="concept-intro"><strong>ISO 21434:2021</strong> es el equivalente de ISO 26262 pero para <strong>ciberseguridad</strong>. Define los procesos para gestionar riesgos de ciberseguridad durante todo el ciclo de vida del vehículo: diseño, producción, operación y decommission.</div>
<div class="concept-intro"><strong>Contexto:</strong> los vehículos modernos están permanentemente conectados (V2X, WiFi, Bluetooth, actualizaciones OTA, puerto OBD-II), lo que los convierte en objetivos potenciales de ataque — desde robo de vehículo hasta manipulación remota de funciones de control. ISO 21434 asegura que fabricantes y proveedores gestionen ese riesgo de forma sistemática, no improvisada.</div>
<div class="alert-card">💡 <strong>Regulación UNECE WP.29:</strong> ISO 21434 es la base técnica de los reglamentos UNECE <strong>R155</strong> (Cybersecurity Management System, CSMS) y <strong>R156</strong> (Software Update Management System, SUMS), obligatorios para homologar vehículos nuevos en la Unión Europea, Japón y Corea del Sur desde 2022 (nuevos tipos) y 2024 (todos los tipos).</div>
  </div>
  <div id="st6-2" class="tab-panel">
<div class="concept-intro"><strong>CAL</strong> (Cybersecurity Assurance Level) mide el rigor requerido del proceso de ciberseguridad — el equivalente de ASIL en el mundo de la seguridad funcional. Se determina en el TARA combinando la <em>attack feasibility</em> (qué tan fácil es el ataque) con el <em>impact</em> (qué tan grave es si tiene éxito).</div>
<table class="kv-table"><tr><th>CAL</th><th>Impacto típico</th></tr>
<tr><td>CAL 1</td><td>Impacto mínimo si se compromete el activo</td></tr>
<tr><td>CAL 2</td><td>Impacto moderado — datos personales, funciones menores</td></tr>
<tr><td>CAL 3</td><td>Impacto significativo — funciones de seguridad no críticas</td></tr>
<tr><td>CAL 4</td><td>Impacto crítico — control del vehículo, sistemas de seguridad</td></tr>
</table>
<div class="alert-card">💡 Un ataque exitoso al sistema de frenado (ASIL-D en safety) casi siempre requiere gestionarse como CAL 4 en security — cuando el activo protegido tiene consecuencias de safety, el nivel de rigor de cybersecurity tiende a igualarlo.</div>
  </div>
  <div id="st6-3" class="tab-panel">
<div class="concept-intro">Safety y security comparten estructura metodológica (ambos siguen "analizar riesgo → asignar nivel de rigor → definir objetivos") pero responden a amenazas de naturaleza distinta: una es accidental, la otra es deliberada.</div>
<table class="kv-table"><tr><th>Concepto</th><th>ISO 26262 (Safety)</th><th>ISO 21434 (Security)</th></tr>
<tr><td>Qué previene</td><td>Fallos E/E aleatorios o sistemáticos</td><td>Ataques cibernéticos deliberados</td></tr>
<tr><td>Análisis de riesgo</td><td>HARA</td><td>TARA</td></tr>
<tr><td>Nivel de rigor</td><td>ASIL (QM → D)</td><td>CAL (1 → 4)</td></tr>
<tr><td>Factor de riesgo</td><td>Severity × Exposure × Controllability</td><td>Impact × Attack Feasibility</td></tr>
<tr><td>Objetivo resultante</td><td>Safety Goal</td><td>Cybersecurity Goal</td></tr>
<tr><td>Regulación asociada</td><td>Type Approval (varía por región)</td><td>UNECE R155 / R156</td></tr>
</table>
<div class="alert-card">💡 Las dos disciplinas se retroalimentan: una vulnerabilidad de cybersecurity puede <strong>convertirse</strong> en un hazard de safety. Ejemplo: un atacante compromete el infoentretenimiento vía WiFi (problema de security) y desde ahí inyecta mensajes CAN falsos hacia el módulo de frenos (se vuelve un hazard de safety). Por eso equipos de safety y de cybersecurity trabajan coordinados, revisando el TARA y el HARA en conjunto para activos compartidos.</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre ISO 21434...</p>
</div>`,

'tara': `
<div class="tab-group-st7">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'st7-1','st7')">Proceso paso a paso</button>
    <button class="tab-btn" onclick="switchTab(this,'st7-2','st7')">Ejemplo: cadena de ataque</button>
    <button class="tab-btn" onclick="switchTab(this,'st7-3','st7')">DICA — qué se protege</button>
  </div>
  <div id="st7-1" class="tab-panel active">
<div class="concept-intro">TARA (Threat Analysis and Risk Assessment) es al ISO 21434 lo que el HARA es al ISO 26262: el análisis que convierte "esto podría atacarse" en un objetivo de ciberseguridad concreto.</div>
<div class="concept-intro"><b>1. Identificar Assets (activos):</b> ¿qué debe protegerse? Datos (VIN, datos personales, claves criptográficas), funciones (control de frenos, acceso al vehículo), o propiedades del sistema (Disponibilidad, Integridad, Confidencialidad, Autenticidad — ver pestaña DICA).<br>
<b>2. Identificar amenazas y caminos de ataque:</b> para cada activo, ¿cuál es la amenaza? ¿Cómo podría llegar un atacante hasta ahí?<br>
<b>3. Evaluar Attack Feasibility:</b> ¿qué tan difícil es el ataque? Se pondera conocimiento técnico requerido, tiempo, equipo especializado y ventana de oportunidad.<br>
<b>4. Evaluar Impact:</b> ¿cuáles son las consecuencias? Se evalúa en cuatro categorías: safety, financiera, operacional y de privacidad.<br>
<b>5. Determinar CAL:</b> combinando feasibility + impact, según la matriz del estándar.<br>
<b>6. Definir Cybersecurity Goals y controles:</b> las medidas concretas (SecOC, Secure Boot, firewalls de gateway, etc.) que reducen el riesgo a un nivel aceptable.</div>
  </div>
  <div id="st7-2" class="tab-panel">
<div class="concept-intro">Un caso clásico en entrevistas de cybersecurity automotriz: cómo un punto de entrada aparentemente inofensivo puede terminar comprometiendo un sistema crítico si no hay segmentación adecuada de la red.</div>
<div class="diagram-card">
<svg viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cadena de ataque de ejemplo: un atacante entra vía Bluetooth al sistema de infoentretenimiento, pivota al gateway y al bus CAN, y finalmente al módulo de control de carrocería para abrir las puertas remotamente">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="10" y="45" width="120" height="55" rx="7" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/>
    <text x="70" y="68" font-size="10" font-weight="700" fill="#B91C1C" text-anchor="middle">Atacante</text>
    <text x="70" y="81" font-size="9.5" fill="#B91C1C" text-anchor="middle">vía Bluetooth</text>

    <rect x="165" y="45" width="120" height="55" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="225" y="68" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Infotainment</text>
    <text x="225" y="81" font-size="9.5" fill="var(--text-muted)" text-anchor="middle">(IVI, comprometido)</text>

    <rect x="320" y="45" width="120" height="55" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="380" y="68" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Gateway</text>
    <text x="380" y="81" font-size="9.5" fill="var(--text-muted)" text-anchor="middle">(pivote al bus CAN)</text>

    <rect x="475" y="45" width="115" height="55" rx="7" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/>
    <text x="532" y="68" font-size="10" font-weight="700" fill="#B91C1C" text-anchor="middle">BCM</text>
    <text x="532" y="81" font-size="9.5" fill="#B91C1C" text-anchor="middle">abre puertas</text>

    <g stroke="#DC2626" stroke-width="1.6" fill="#DC2626">
      <line x1="130" y1="72" x2="160" y2="72"/><path d="M160,68 L168,72 L160,76 Z"/>
      <line x1="285" y1="72" x2="315" y2="72"/><path d="M315,68 L323,72 L315,76 Z"/>
      <line x1="440" y1="72" x2="470" y2="72"/><path d="M470,68 L478,72 L470,76 Z"/>
    </g>
    <text x="300" y="125" font-size="10" fill="var(--text-muted)" text-anchor="middle">Cada flecha roja es un paso del ataque que un control de seguridad (firewall, SecOC, segmentación) puede bloquear</text>
  </g>
</svg>
<div class="diagram-caption">El punto de entrada (Bluetooth) rara vez es el activo final. El riesgo real está en la <b>falta de segmentación</b>: si el Gateway no filtra qué mensajes pueden pasar del segmento de infoentretenimiento al bus de carrocería, un solo punto comprometido alcanza todo el vehículo.</div>
</div>
<div class="alert-card">💡 Este es exactamente el tipo de escenario que justifica por qué el Gateway automotriz moderno no solo enruta tráfico entre buses, sino que actúa como <strong>firewall</strong>: filtra por ID de mensaje, valida frecuencia esperada, y puede aislar un segmento comprometido.</div>
  </div>
  <div id="st7-3" class="tab-panel">
<div class="concept-intro">Las cuatro propiedades que un análisis de cybersecurity busca proteger — conocidas por el acrónimo <strong>DICA</strong> (en inglés, CIA + Authenticity):</div>
<table class="kv-table"><tr><th>Propiedad</th><th>Qué significa</th><th>Ejemplo de violación</th></tr>
<tr><td><strong>D</strong>isponibilidad</td><td>El sistema debe estar disponible cuando se necesita</td><td>Ataque de denegación de servicio (DoS) al bus CAN que impide que el ABS reciba datos de velocidad de rueda</td></tr>
<tr><td><strong>I</strong>ntegridad</td><td>Los datos no deben alterarse sin autorización</td><td>Modificar el valor del odómetro, o inyectar un mensaje CAN de aceleración falso</td></tr>
<tr><td><strong>C</strong>onfidencialidad</td><td>Los datos sensibles no deben exponerse a terceros no autorizados</td><td>Extraer claves criptográficas de un HSM, o exponer datos de ubicación GPS del conductor</td></tr>
<tr><td><strong>A</strong>utenticidad</td><td>Verificar que el emisor de un mensaje o comando es quien dice ser</td><td>Un nodo falso se hace pasar por el módulo de frenos legítimo y envía comandos — esto es justo lo que SecOC previene con el MAC</td></tr>
</table>
<div class="alert-card">💡 Para cada asset identificado en el TARA, se evalúa el impacto de perder <strong>cada una</strong> de estas cuatro propiedades por separado — un mismo activo puede tener alto impacto en integridad pero bajo en confidencialidad, por ejemplo.</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre TARA...</p>
</div>`,

'security-concepts': `
<div class="tab-group-st8">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'st8-1','st8')">SecOC</button>
    <button class="tab-btn" onclick="switchTab(this,'st8-2','st8')">Secure Boot</button>
    <button class="tab-btn" onclick="switchTab(this,'st8-3','st8')">HSM, PKI & OTA</button>
  </div>
  <div id="st8-1" class="tab-panel active">
<div class="concept-intro"><strong>SecOC</strong> (Secure Onboard Communication, definido por AUTOSAR) autentica los mensajes CAN/Ethernet dentro del vehículo para prevenir que un nodo comprometido — o un ataque de replay — inyecte mensajes falsos en el bus.</div>
<div class="diagram-card">
<svg viewBox="0 0 600 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Trama CAN con SecOC: el campo de datos original va seguido de un MAC de autenticación calculado sobre esos datos y un valor de frescura, para prevenir mensajes falsificados y ataques de repetición">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="20" y="30" width="60" height="45" fill="var(--accent)" fill-opacity="0.18" stroke="var(--accent)" stroke-width="1.2"/>
    <text x="50" y="57" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">ID</text>
    <rect x="80" y="30" width="180" height="45" fill="var(--accent)" fill-opacity="0.5" stroke="var(--accent)" stroke-width="1.2"/>
    <text x="170" y="52" font-size="10" font-weight="700" fill="white" text-anchor="middle">Data (payload)</text>
    <text x="170" y="66" font-size="9" fill="white" text-anchor="middle">ej. valor de freno</text>
    <rect x="260" y="30" width="130" height="45" fill="#EAB308" fill-opacity="0.4" stroke="#CA8A04" stroke-width="1.2"/>
    <text x="325" y="52" font-size="10" font-weight="700" fill="#92400E" text-anchor="middle">Freshness</text>
    <text x="325" y="66" font-size="9" fill="#92400E" text-anchor="middle">contador / timestamp</text>
    <rect x="390" y="30" width="150" height="45" fill="#DC2626" fill-opacity="0.22" stroke="#DC2626" stroke-width="1.2"/>
    <text x="465" y="52" font-size="10" font-weight="700" fill="#B91C1C" text-anchor="middle">MAC</text>
    <text x="465" y="66" font-size="9" fill="#B91C1C" text-anchor="middle">24-32 bits, con clave secreta</text>
    <text x="300" y="105" font-size="10" fill="var(--text-muted)" text-anchor="middle">Si el MAC recibido no coincide con el que el receptor recalcula → mensaje descartado + DTC</text>
  </g>
</svg>
<div class="diagram-caption">El <b>MAC</b> se calcula sobre los datos + un valor de frescura usando una clave secreta compartida entre emisor y receptor. Sin conocer la clave, un atacante no puede generar un MAC válido — y el Freshness Value evita que capture un mensaje legítimo y lo reenvíe más tarde (replay attack).</div>
</div>
<div class="concept-intro">Ejemplo concreto: el mensaje de freno (ID 0x200) incluye 4 bytes de datos de freno más 3 bytes de MAC. Solo las ECUs que conocen la clave compartida pueden verificar que el mensaje realmente proviene del módulo de frenos legítimo y no de un nodo comprometido inyectando tráfico en el bus.</div>
  </div>
  <div id="st8-2" class="tab-panel">
<div class="concept-intro"><strong>Secure Boot</strong> garantiza que una ECU solo ejecute firmware firmado criptográficamente por el OEM, verificando cada eslabón antes de dejarlo correr — esto se conoce como <strong>Chain of Trust</strong>.</div>
<div class="diagram-card">
<svg viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cadena de confianza de Secure Boot: el Hardware Security Module con la clave publica del fabricante verifica la firma del bootloader, que a su vez verifica la firma del software de aplicación antes de permitir su ejecución">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="15" y="55" width="130" height="60" rx="7" fill="var(--accent)" fill-opacity="0.85" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="80" y="80" font-size="10" font-weight="700" fill="white" text-anchor="middle">HSM</text>
    <text x="80" y="94" font-size="9" fill="white" text-anchor="middle">Root of Trust</text>
    <text x="80" y="106" font-size="8.5" fill="white" text-anchor="middle">clave pública OEM</text>

    <rect x="230" y="55" width="130" height="60" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="295" y="82" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">Bootloader</text>
    <text x="295" y="96" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">firmado por OEM</text>

    <rect x="445" y="55" width="140" height="60" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="515" y="82" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">Application SW</text>
    <text x="515" y="96" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">firmado por OEM</text>

    <g stroke="var(--green)" stroke-width="1.6" fill="var(--green)">
      <line x1="145" y1="85" x2="225" y2="85"/><path d="M225,81 L233,85 L225,89 Z"/>
      <line x1="360" y1="85" x2="440" y2="85"/><path d="M440,81 L448,85 L440,89 Z"/>
    </g>
    <text x="185" y="70" font-size="8.5" fill="var(--green)" text-anchor="middle">✓ verifica firma</text>
    <text x="400" y="70" font-size="8.5" fill="var(--green)" text-anchor="middle">✓ verifica firma</text>

    <text x="300" y="150" font-size="10" fill="var(--text-muted)" text-anchor="middle">Si cualquier verificación falla → la ECU entra en modo seguro o no arranca</text>
  </g>
</svg>
<div class="diagram-caption">La clave pública del OEM vive en memoria protegida del HSM, no modificable después de fabricar el chip. Cada eslabón verifica la firma digital del siguiente antes de ejecutarlo — un atacante que modifique el software de aplicación rompe su firma y la cadena se detiene ahí.</div>
</div>
<div class="alert-card">💡 Esto es lo que previene que firmware malicioso — instalado, por ejemplo, mediante un ataque a un taller no autorizado o a la cadena de suministro de un proveedor — llegue a correr en la ECU de producción.</div>
  </div>
  <div id="st8-3" class="tab-panel">
<div class="concept-intro">Tres piezas de infraestructura de seguridad que sostienen a SecOC y Secure Boot en el día a día, y que suelen aparecer como preguntas de seguimiento en entrevista.</div>
<table class="kv-table"><tr><th>Concepto</th><th>Qué es</th></tr>
<tr><td><strong>HSM</strong> — Hardware Security Module</td><td>Chip dedicado dentro del microcontrolador de la ECU, físicamente aislado y resistente a manipulación (tampering). Almacena claves criptográficas sin exponerlas nunca al software de aplicación, y acelera por hardware operaciones costosas (AES, RSA, ECC) que en software serían demasiado lentas para tiempo real.</td></tr>
<tr><td><strong>PKI</strong> — Public Key Infrastructure automotriz</td><td>Cada ECU recibe un certificado digital firmado por una Certificate Authority (CA) del OEM durante producción. Ese certificado permite autenticación mutua entre ECUs (¿eres quien dices ser?) y es la base para verificar la firma de actualizaciones OTA.</td></tr>
<tr><td><strong>OTA security</strong> — Over-The-Air updates</td><td>Toda actualización de firmware debe llegar firmada criptográficamente y, típicamente, cifrada en tránsito. Antes de instalarla, la ECU verifica la firma con la misma lógica de Chain of Trust de Secure Boot. Es la base técnica del reglamento UNECE R156 (SUMS).</td></tr>
</table>
<div class="alert-card">💡 Nota cómo estos tres conceptos se conectan: el HSM guarda la clave que hace posible Secure Boot y SecOC; la PKI es lo que permite que existan certificados y firmas verificables en primer lugar; y las actualizaciones OTA dependen de ambos para no convertirse en la puerta de entrada perfecta para un atacante.</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre SecOC y Secure Boot...</p>
</div>`,

};  // fin STANDARDS_RICH
