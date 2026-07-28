
// ══════════════════════════════════════════════════════════════════
//  METOD_RICH — Metodologías de desarrollo
// ══════════════════════════════════════════════════════════════════
const METOD_RICH = {

'scrum': `
<div class="tab-group-scr">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'scr-1','scr')">Pilares, Roles y Artefactos</button>
    <button class="tab-btn" onclick="switchTab(this,'scr-2','scr')">Eventos (Ceremonias)</button>
    <button class="tab-btn" onclick="switchTab(this,'scr-3','scr')">Estimación & Métricas</button>
    <button class="tab-btn" onclick="switchTab(this,'scr-4','scr')">User Stories & DoD</button>
    <button class="tab-btn" onclick="switchTab(this,'scr-5','scr')">⚠️ Errores & ✅ Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'scr-6','scr')">Quiz</button>
  </div>

  <div id="scr-1" class="tab-panel active">
<div class="concept-intro">Scrum es un <strong>framework ligero</strong> (no una metodología prescriptiva con pasos fijos) para gestionar trabajo complejo mediante ciclos cortos e iterativos llamados <b>Sprints</b>. Se apoya en el <b>control de procesos empírico</b>: las decisiones se toman en base a lo observado y experimentado, no a un plan detallado hecho de antemano.</div>
<h4>Los 3 pilares del empirismo</h4>
<table class="kv-table">
<tr><th>Pilar</th><th>Qué significa</th><th>Cómo se aplica</th></tr>
<tr><td>Transparencia</td><td>El proceso y el trabajo deben ser visibles para todos los responsables del resultado</td><td>Product Backlog visible, Definition of Done compartida, tablero de Sprint público</td></tr>
<tr><td>Inspección</td><td>Revisar frecuentemente el progreso hacia el objetivo para detectar desviaciones a tiempo</td><td>Daily Scrum, Sprint Review</td></tr>
<tr><td>Adaptación</td><td>Ajustar el proceso o el producto en cuanto se detecta una desviación</td><td>Re-priorizar el Backlog, acciones concretas en la Retrospective</td></tr>
</table>
<h4>Los 5 valores de Scrum</h4>
<p><b>Compromiso, Foco, Apertura, Respeto y Coraje.</b> Cuando el equipo vive estos valores, los pilares de transparencia, inspección y adaptación cobran vida real y generan confianza con los stakeholders — sin ellos, Scrum se reduce a un calendario de reuniones vacío.</p>
<h4>3 Roles</h4>
<table class="kv-table">
<tr><th>Rol</th><th>Responsabilidad</th><th>NO es</th></tr>
<tr><td>Product Owner</td><td>Maximiza el valor del producto. Único dueño y responsable del Product Backlog: qué se hace y en qué orden</td><td>No es "el que dicta qué programar" sin negociar — colabora activamente con el equipo</td></tr>
<tr><td>Scrum Master</td><td>Responsable de que Scrum se entienda y se aplique. Elimina impedimentos. Protege al equipo de interrupciones externas</td><td>No es el jefe del equipo, ni un gestor de proyecto tradicional, ni asigna tareas a nadie</td></tr>
<tr><td>Developers</td><td>Equipo multifuncional (idealmente 10 personas o menos en total, contando PO y SM) que construye el Increment cada Sprint. Auto-gestionado</td><td>No hay sub-roles fijos que impidan colaborar fuera de la propia especialidad</td></tr>
</table>
<div class="concept-intro">Desde la Scrum Guide 2020, ya <b>no existe jerarquía</b> entre PO/SM y el equipo: los tres roles conforman <em>un solo Scrum Team</em>, auto-gestionado, sin sub-equipos ni cadena de mando interna.</div>
<h4>3 Artefactos + su Compromiso ("Commitment")</h4>
<table class="kv-table">
<tr><th>Artefacto</th><th>Qué es</th><th>Compromiso asociado</th></tr>
<tr><td>Product Backlog</td><td>Lista emergente y priorizada de todo lo que podría necesitar el producto</td><td><b>Product Goal:</b> objetivo a largo plazo que da coherencia a los ítems del Backlog</td></tr>
<tr><td>Sprint Backlog</td><td>Ítems del Sprint + el plan para entregarlos + el objetivo del Sprint</td><td><b>Sprint Goal:</b> el "porqué" del Sprint, da foco al equipo durante todo el ciclo</td></tr>
<tr><td>Increment</td><td>Suma de todos los ítems "Done" del Sprint actual y de los anteriores</td><td><b>Definition of Done:</b> criterio formal de calidad que un Increment debe cumplir</td></tr>
</table>
  </div>

  <div id="scr-2" class="tab-panel">
<div class="concept-intro">El Sprint es el "contenedor" de todos los demás eventos: tiene duración fija (timebox), típicamente <b>1 a 4 semanas</b> (2 semanas es lo más común en la industria). Dentro de él ocurren 4 eventos formales, cada uno con un timebox máximo proporcional a la duración del Sprint.</div>
<table class="kv-table">
<tr><th>Evento</th><th>Timebox (Sprint de 4 sem.)</th><th>Propósito</th><th>Participan</th></tr>
<tr><td>Sprint Planning</td><td>Máx. 8 horas</td><td>Definir el Sprint Goal y seleccionar los ítems del Backlog que lo cumplen (Sprint Backlog)</td><td>Todo el Scrum Team</td></tr>
<tr><td>Daily Scrum</td><td>15 minutos, todos los días</td><td>Inspeccionar el progreso hacia el Sprint Goal y ajustar el plan del día siguiente</td><td>Solo Developers (PO/SM pueden asistir como oyentes)</td></tr>
<tr><td>Sprint Review</td><td>Máx. 4 horas</td><td>Inspeccionar el Increment con los stakeholders, adaptar el Product Backlog</td><td>Scrum Team + stakeholders</td></tr>
<tr><td>Sprint Retrospective</td><td>Máx. 3 horas</td><td>Inspeccionar cómo fue el último Sprint en personas, procesos y herramientas; definir mejoras</td><td>Solo el Scrum Team</td></tr>
</table>
<div class="concept-intro"><b>Regla del timebox:</b> por cada semana de Sprint se agrega proporcionalmente tiempo a cada evento. Un Sprint de 2 semanas: Planning ~4h, Review ~2h, Retro ~1.5h.</div>
<h4>Sprint Planning — Las 3 preguntas</h4>
<p>1. <b>¿Por qué es valioso este Sprint?</b> (define el Sprint Goal)<br>2. <b>¿Qué se puede hacer este Sprint?</b> (selección de ítems del Product Backlog)<br>3. <b>¿Cómo se hará el trabajo elegido?</b> (descomposición en tareas, plan del equipo)</p>
<h4>Daily Scrum — NO es un status report</h4>
<p>El error más común: convertirlo en un reporte de estado hacia el Scrum Master o un jefe. En realidad es una <b>sesión de re-planeación del equipo, para el equipo</b>: los Developers ajustan el plan hacia el Sprint Goal. El formato clásico "¿qué hice ayer? / ¿qué haré hoy? / ¿bloqueos?" es solo una técnica sugerida, no un formato obligatorio — la Scrum Guide 2020 lo quitó explícitamente como formato prescrito.</p>
<h4>Sprint Review ≠ Demo pasiva</h4>
<p>No es solo "mostrar pantallas" — es una sesión de trabajo colaborativa donde los stakeholders dan feedback en vivo y el Product Backlog se ajusta en el momento según lo aprendido. En hardware/automoción, suele incluir una demo real en HIL o en el vehículo de desarrollo cuando aplica.</p>
  </div>

  <div id="scr-3" class="tab-panel">
<div class="concept-intro">Scrum no prescribe una técnica de estimación, pero la industria usa mayoritariamente <b>Story Points</b> — una medida relativa de esfuerzo/complejidad/incertidumbre, no de tiempo en horas.</div>
<h4>Planning Poker con secuencia de Fibonacci</h4>
<p>Se usa una escala tipo Fibonacci (0, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?) en vez de números consecutivos porque <b>la incertidumbre crece con el tamaño</b>: es fácil distinguir 2 de 3 puntos, pero absurdo pretender distinguir 47 de 48 — por eso los números se separan más cuanto más grandes son. Cada miembro vota en simultáneo (cartas boca abajo) para evitar el "anchoring bias": que el primero en hablar influya en el resto.</p>
<div class="code-block"><div class="code-lang">Ejemplo — Ronda de Planning Poker</div><pre>
Historia: "Como conductor quiero ver una alerta cuando el ACC detecta
           un vehículo lento adelante"

Dev A vota: 5      Dev B vota: 13     Dev C vota: 3
   |  Discusión: Dev B conoce un caso límite de sensor fusion
   |  (fallback si RADAR y cámara discrepan) que los otros no consideraron
   v  Segunda ronda tras discutir el caso límite
Dev A vota: 8      Dev B vota: 8      Dev C vota: 8
   -> Consenso: 8 puntos</pre></div>
<h4>Velocity — para forecasting, NO para comparar equipos</h4>
<p><b>Velocity</b> = suma de story points completados ("Done") por Sprint. Se usa para <b>pronosticar</b>: Backlog restante ÷ Velocity promedio de los últimos 3 Sprints = Sprints restantes estimados. Comparar la velocity de dos equipos distintos no tiene sentido — cada equipo calibra sus propios puntos de forma distinta (2 puntos del equipo A puede equivaler a 5 del equipo B).</p>
<h4>Burndown vs Burnup Chart</h4>
<div class="code-block"><div class="code-lang">Burndown (trabajo restante) vs Burnup (trabajo completado)</div><pre>
Points        Burndown                  Points        Burnup
restantes  \\                          completados          ___--- scope total
           \\   ideal                              ___---
            \\___                              ___---
                \\__ real                   ___---
                    \\__                ___---
                        \\           ---
           +--------------> días        +--------------> días

Burndown: baja a 0 si todo va bien.    Burnup: sube hasta tocar la línea de
No distingue si el ALCANCE cambió      "scope total" y SÍ muestra cambios
a mitad de camino.                     de alcance a mitad de Sprint.</pre></div>
<p>El Burnup se prefiere cuando el Product Owner puede agregar/quitar alcance a mitad de camino, porque separa visualmente "trabajo completado" de "cambios de alcance" — algo que el Burndown oculta por completo.</p>
<h4>Capacity Planning</h4>
<p><b>Capacity</b> del Sprint = Velocity promedio ajustada por ausencias conocidas (vacaciones, feriados, guardias de on-call). Si el equipo promedia 40 puntos/Sprint pero dos personas tienen vacaciones esta vez, la capacity baja proporcionalmente antes de comprometerse en el Sprint Planning.</p>
  </div>

  <div id="scr-4" class="tab-panel">
<div class="concept-intro">La forma estándar de escribir un requisito en Scrum es la <b>User Story</b>: una descripción corta, centrada en el valor para el usuario, no en los detalles de implementación técnica.</div>
<div class="code-block"><div class="code-lang">Plantilla de User Story</div><pre>
Como &lt;rol / persona&gt;
quiero &lt;funcionalidad / objetivo&gt;
para &lt;razón / valor de negocio&gt;

Ejemplo:
Como conductor en autopista
quiero que el sistema ACC reduzca la velocidad automáticamente
para mantener una distancia segura sin que yo intervenga</pre></div>
<h4>Criterios INVEST</h4>
<table class="kv-table">
<tr><th>Letra</th><th>Criterio</th><th>Qué verifica</th></tr>
<tr><td>I</td><td>Independent</td><td>Se puede desarrollar y entregar sin depender estrictamente del orden de otras historias</td></tr>
<tr><td>N</td><td>Negotiable</td><td>No es un contrato cerrado — los detalles se negocian entre PO y equipo antes/durante el Sprint</td></tr>
<tr><td>V</td><td>Valuable</td><td>Entrega valor visible al usuario o al negocio, no solo una tarea técnica interna</td></tr>
<tr><td>E</td><td>Estimable</td><td>El equipo tiene suficiente información para estimarla (si no, falta refinamiento)</td></tr>
<tr><td>S</td><td>Small</td><td>Cabe cómodamente en un Sprint — si no, se divide (splitting)</td></tr>
<tr><td>T</td><td>Testable</td><td>Tiene criterios de aceptación claros y verificables</td></tr>
</table>
<h4>Acceptance Criteria en formato Gherkin</h4>
<div class="code-block"><div class="code-lang">Gherkin — Given / When / Then</div><pre>
Feature: Alerta de colisión frontal (FCW)

  Scenario: Vehículo lento detectado dentro del rango de alerta
    Given el ACC está activo y la velocidad propia es 100 km/h
    And un vehículo es detectado a 40 metros con velocidad relativa -20 km/h
    When el time-to-collision (TTC) calculado es menor a 2.5 segundos
    Then el sistema debe emitir una alerta audiovisual en menos de 100 ms
    And el HMI debe registrar el evento en el log de diagnóstico</pre></div>
<h4>Definition of Ready (DoR) vs Definition of Done (DoD)</h4>
<table class="kv-table">
<tr><th></th><th>Definition of Ready</th><th>Definition of Done</th></tr>
<tr><td>Cuándo aplica</td><td>Antes de meter una historia al Sprint (entrada)</td><td>Antes de marcar una historia como terminada (salida)</td></tr>
<tr><td>Propósito</td><td>Evitar comprometerse con trabajo mal definido</td><td>Garantizar un estándar de calidad consistente</td></tr>
<tr><td>Ejemplo automotriz</td><td>Criterios de aceptación claros, dependencias de HW identificadas, estimada por el equipo</td><td>Code review aprobado, unit tests con cobertura objetivo, sin violaciones MISRA nuevas, pasó en HIL, documentación actualizada</td></tr>
</table>
  </div>

  <div id="scr-5" class="tab-panel">
<h4>Anti-patrones comunes ("ScrumBut")</h4>
<table class="kv-table">
<tr><th>Anti-patrón</th><th>Por qué ocurre</th><th>Cómo corregirlo</th></tr>
<tr><td>Daily como status report al jefe</td><td>La cultura de gestión tradicional se impone sobre el framework; un manager pide "reportes" en la reunión</td><td>Recordar que el Daily es del equipo, para el equipo — los gerentes pueden observar pero no dirigir la conversación</td></tr>
<tr><td>Sprint Backlog "congelado" en exceso</td><td>Miedo a que el scope cambie termina rompiendo la agilidad real</td><td>Permitir renegociar con el PO si surge información relevante para el Sprint Goal — sin comprometer el objetivo del Sprint</td></tr>
<tr><td>Velocity usada para comparar/rankear equipos</td><td>La gerencia usa la métrica como KPI de "productividad" entre equipos distintos</td><td>Explicar que los puntos son relativos por equipo — usar velocity solo para forecasting interno de ESE equipo</td></tr>
<tr><td>Product Owner ausente o sin autoridad real</td><td>El rol se asigna como título sin dar autoridad de decisión sobre el Backlog</td><td>El PO necesita mandato real para priorizar y aceptar/rechazar el Increment</td></tr>
<tr><td>Retrospectivas sin acciones concretas</td><td>Se convierten en una queja genérica sin seguimiento posterior</td><td>Cerrar cada Retro con 1-3 acciones específicas, con dueño y fecha, revisadas en la siguiente Retro</td></tr>
<tr><td>Scrum Master actuando como Project Manager</td><td>La organización no entiende la diferencia de rol y le asigna tareas de gestión de proyecto</td><td>El SM sirve al equipo removiendo impedimentos — no asigna tareas ni reporta estado a gerencia</td></tr>
</table>
<div class="practice-card"><div class="practice-title">Backlog Refinement continuo (~10% del tiempo del Sprint)</div><p>Reservar tiempo cada Sprint para refinar (detallar, dividir, re-estimar) los ítems próximos del Backlog evita Sprint Plannings caóticos por historias mal definidas.</p></div>
<div class="practice-card"><div class="practice-title">Un Sprint Goal claro y único</div><p>Todo el Sprint debe orbitar alrededor de un objetivo — si las historias seleccionadas no tienen relación entre sí, es difícil dar foco y priorizar bajo presión.</p></div>
<div class="practice-card"><div class="practice-title">Definition of Done visible y compartida</div><p>Debe estar escrita y visible para todo el equipo (p. ej. en el tablero) — no vivir solo en la cabeza del tech lead.</p></div>
<div class="practice-card"><div class="practice-title">Proteger el Daily de 15 minutos</div><p>Si surgen discusiones técnicas largas, se agenda un "parking lot" para después del Daily con los involucrados, sin extender la reunión de todo el equipo.</p></div>
  </div>

  <div id="scr-6" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿Puede el equipo agregar ítems nuevos al Sprint Backlog durante el Sprint?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Sí.</b> Los Developers pueden agregar trabajo si es necesario para cumplir el Sprint Goal, pero NO se debe cambiar el Sprint Goal en sí. El Product Owner puede clarificar y renegociar el alcance con el equipo, pero no puede imponer historias nuevas ajenas al objetivo sin pasar por un Sprint Planning futuro.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Quién tiene autoridad para cancelar un Sprint antes de que termine?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Solo el Product Owner</b>, y únicamente si el Sprint Goal se vuelve obsoleto (cambio drástico de prioridades del negocio). Es poco común en la práctica — cancelar un Sprint tiene un costo alto en foco y moral del equipo.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>¿Es obligatorio usar Story Points en Scrum?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No.</b> La Scrum Guide no menciona Story Points ni Planning Poker — son prácticas populares de la industria, no parte formal del framework. Algunos equipos estiman en horas, en tamaños de camiseta (S/M/L) o directamente cuentan ítems (#NoEstimates).</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Un Sprint terminó y quedaron 3 historias sin completar. ¿Se arrastran automáticamente al siguiente Sprint?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No.</b> Vuelven al Product Backlog para ser re-priorizadas por el PO. No hay "arrastre automático" — el PO decide si siguen siendo prioritarias frente a todo lo demás en el Backlog, en el próximo Sprint Planning.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿El Scrum Master puede ser también Developer del mismo equipo?<span class="q-arr">▶</span></div><div class="quiz-a">Es posible en equipos pequeños y la Scrum Guide 2020 lo permite explícitamente, pero genera conflicto de tiempo/foco entre ambos roles — se recomienda dedicación real al rol de servicio del Scrum Master cuando el equipo lo permite.</div></div>
</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Scrum...</p>
</div>`,

'agile': `
<div class="tab-group-agl">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'agl-1','agl')">Manifiesto & Principios</button>
    <button class="tab-btn" onclick="switchTab(this,'agl-2','agl')">Agile vs Waterfall vs V-Model</button>
    <button class="tab-btn" onclick="switchTab(this,'agl-3','agl')">Kanban a fondo</button>
    <button class="tab-btn" onclick="switchTab(this,'agl-4','agl')">Escalado: SAFe, LeSS, Spotify</button>
    <button class="tab-btn" onclick="switchTab(this,'agl-5','agl')">⚠️ Errores & ✅ Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'agl-6','agl')">Quiz</button>
  </div>

  <div id="agl-1" class="tab-panel active">
<div class="concept-intro">Publicado en 2001 por 17 desarrolladores reunidos en Snowbird, Utah, el <b>Manifiesto Ágil</b> no es una metodología — es un conjunto de valores y principios del que nacen frameworks concretos como Scrum, Kanban y XP.</div>
<h4>4 Valores</h4>
<table class="kv-table">
<tr><th>Valoramos más...</th><th>...que</th><th>Pero seguimos valorando</th></tr>
<tr><td>Individuos e interacciones</td><td>Procesos y herramientas</td><td>Las herramientas ayudan, pero no reemplazan la comunicación directa</td></tr>
<tr><td>Software funcionando</td><td>Documentación extensiva</td><td>La documentación necesaria sigue existiendo, sobre todo en dominios regulados (ISO 26262, ASPICE)</td></tr>
<tr><td>Colaboración con el cliente</td><td>Negociación contractual</td><td>Los contratos siguen siendo necesarios, pero no sustituyen la conversación continua</td></tr>
<tr><td>Responder al cambio</td><td>Seguir un plan</td><td>Planificar sigue teniendo valor, pero el plan se adapta constantemente</td></tr>
</table>
<h4>12 Principios (agrupados por tema)</h4>
<table class="kv-table">
<tr><th>Área</th><th>Principios clave</th></tr>
<tr><td>Entrega de valor</td><td>Satisfacer al cliente con entregas tempranas y continuas. Entregar software funcionando frecuentemente (semanas, no meses). El software funcionando es la principal medida de progreso.</td></tr>
<tr><td>Cambio</td><td>Dar la bienvenida a requisitos cambiantes, incluso tarde en el desarrollo — Agile aprovecha el cambio para ventaja competitiva del cliente.</td></tr>
<tr><td>Equipo</td><td>Construir proyectos en torno a individuos motivados, dándoles el entorno y apoyo que necesitan, y confiando en que harán el trabajo. Los equipos auto-organizados producen las mejores arquitecturas y diseños.</td></tr>
<tr><td>Comunicación</td><td>La conversación cara a cara es el método más eficiente. Negocio y desarrolladores deben trabajar juntos diariamente.</td></tr>
<tr><td>Ritmo sostenible</td><td>Los procesos ágiles promueven un desarrollo sostenible — el equipo debe mantener un ritmo constante indefinidamente, sin "crunch" crónico.</td></tr>
<tr><td>Calidad técnica</td><td>Atención continua a la excelencia técnica y al buen diseño mejora la agilidad futura. La simplicidad — maximizar el trabajo NO hecho — es esencial.</td></tr>
<tr><td>Mejora continua</td><td>A intervalos regulares el equipo reflexiona sobre cómo ser más efectivo y ajusta su comportamiento — este principio es literalmente el origen de la Sprint Retrospective de Scrum.</td></tr>
</table>
  </div>

  <div id="agl-2" class="tab-panel">
<div class="concept-intro">Ninguna metodología es universalmente "mejor" — la elección depende del dominio, la regulación aplicable y qué tan bien se conocen los requisitos desde el inicio.</div>
<table class="kv-table">
<tr><th>Aspecto</th><th>Waterfall</th><th>V-Model</th><th>Agile (Scrum/Kanban)</th></tr>
<tr><td>Requisitos</td><td>Fijos desde el inicio</td><td>Fijos, con verificación planificada en paralelo</td><td>Emergentes, refinados continuamente</td></tr>
<tr><td>Entrega</td><td>Una sola entrega al final</td><td>Una entrega al final, con V&amp;V exhaustiva</td><td>Entregas incrementales frecuentes</td></tr>
<tr><td>Feedback del cliente</td><td>Solo al final (tarde y caro corregir)</td><td>Al final, aunque los test cases se definen temprano</td><td>Cada Sprint, o continuamente en Kanban</td></tr>
<tr><td>Documentación</td><td>Muy extensa y formal</td><td>Extensa, con trazabilidad formal (requisito de ASPICE)</td><td>Mínima necesaria, "just enough"</td></tr>
<tr><td>Ideal para</td><td>Requisitos muy estables, poca incertidumbre</td><td>Sistemas críticos de seguridad regulados (automoción, aero, médico)</td><td>Productos con requisitos cambiantes, mercados inciertos</td></tr>
<tr><td>Riesgo</td><td>Alto: los problemas se descubren tarde</td><td>Medio: mitigado por la verificación planificada, pero sigue siendo secuencial</td><td>Bajo: se descubren problemas Sprint a Sprint</td></tr>
</table>
<div class="dtree">
  <div class="dtree-title">¿Qué enfoque conviene? — Árbol de decisión simplificado</div>
  <div class="dtree-step"><div class="dtree-num">1</div><div class="dtree-body"><h5>¿Hay normativa de seguridad funcional (ISO 26262) que exige trazabilidad formal?</h5><p><span class="yes">Sí</span> → se necesita un V-Model, o un híbrido V+Agile con trazabilidad documentada. <span class="no">No</span> → sigue al paso 2.</p></div></div>
  <div class="dtree-step"><div class="dtree-num">2</div><div class="dtree-body"><h5>¿Los requisitos son estables y bien conocidos desde el inicio?</h5><p><span class="yes">Sí</span> → Waterfall puede ser suficiente y más simple de gestionar. <span class="no">No</span> → sigue al paso 3.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">3</div><div class="dtree-body"><h5>¿El trabajo llega de forma continua e impredecible (soporte, mantenimiento)?</h5><p><span class="yes">Sí</span> → Kanban (flujo continuo, sin timeboxes fijos). <span class="no">No</span> → Scrum (iteraciones con Sprint Goal claro).</p></div></div>
</div>
  </div>

  <div id="agl-3" class="tab-panel">
<div class="concept-intro">Kanban ("tarjeta visual" en japonés) es un método de gestión de flujo de trabajo, no un framework de roles como Scrum. Se originó en el Toyota Production System y se adaptó al desarrollo de software gracias a David J. Anderson.</div>
<h4>Los 4 principios de Kanban</h4>
<p>1. Empezar con lo que haces ahora (no requiere reestructurar el equipo).<br>2. Acordar perseguir el cambio incremental y evolutivo.<br>3. Respetar el proceso, roles y responsabilidades actuales al inicio.<br>4. Fomentar el liderazgo en todos los niveles.</p>
<h4>Las 6 prácticas núcleo</h4>
<table class="kv-table">
<tr><th>Práctica</th><th>Qué implica</th></tr>
<tr><td>Visualizar el flujo</td><td>Tablero Kanban con columnas que representan el estado real del trabajo (To Do → In Progress → Review → Done)</td></tr>
<tr><td>Limitar el WIP (Work In Progress)</td><td>Cada columna tiene un número máximo de ítems permitidos simultáneamente — fuerza a terminar antes de empezar más</td></tr>
<tr><td>Gestionar el flujo</td><td>Medir y optimizar Lead Time y Cycle Time, no la "ocupación" de las personas</td></tr>
<tr><td>Hacer explícitas las políticas</td><td>Reglas claras de "cuándo un ítem puede pasar de columna", visibles para todos</td></tr>
<tr><td>Implementar feedback loops</td><td>Reuniones periódicas (no obligatoriamente Sprints): revisión de flujo, revisión de riesgos</td></tr>
<tr><td>Mejorar colaborativamente</td><td>Usar datos (métricas de flujo) para experimentar y mejorar el proceso</td></tr>
</table>
<h4>Lead Time vs Cycle Time</h4>
<p><b>Lead Time:</b> tiempo desde que un ítem entra al backlog (se solicita) hasta que se entrega. Mide la experiencia del cliente.<br><b>Cycle Time:</b> tiempo desde que el equipo empieza a trabajar activamente en el ítem hasta que termina. Mide la eficiencia del equipo.</p>
<h4>Ley de Little</h4>
<div class="code-block"><div class="code-lang">Fórmula — Little's Law</div><pre>
WIP (trabajo en progreso) = Throughput (ítems/tiempo) x Cycle Time

Ejemplo:
  Si el equipo entrega 5 ítems por semana (throughput)
  y el Cycle Time promedio es de 4 semanas...
  WIP promedio = 5 x 4 = 20 ítems en progreso simultáneamente

  Para REDUCIR el Cycle Time sin cambiar el throughput,
  hay que REDUCIR el WIP (limitar cuántas cosas se hacen a la vez)</pre></div>
<p>Esta ley es la justificación matemática de por qué limitar el WIP acelera la entrega: menos ítems en progreso simultáneo implica menos cambio de contexto, y por lo tanto un ciclo más corto por ítem.</p>
  </div>

  <div id="agl-4" class="tab-panel">
<div class="concept-intro">Cuando varios equipos (a veces 50-100+ personas) deben coordinarse en un mismo producto o plataforma, Scrum "puro" de un solo equipo no alcanza. Aparecen los <b>frameworks de escalado</b>, muy comunes en automoción por el tamaño de los programas de software vehicular.</div>
<table class="kv-table">
<tr><th>Framework</th><th>Idea central</th><th>Términos clave</th></tr>
<tr><td>SAFe (Scaled Agile Framework)</td><td>El más usado en automoción/aero. Organiza equipos en "Agile Release Trains" (ARTs) que planifican juntos cada Program Increment</td><td>PI Planning, ART, RTE (Release Train Engineer), Scrum of Scrums, System Demo</td></tr>
<tr><td>LeSS (Large-Scale Scrum)</td><td>Escala Scrum manteniéndolo lo más simple posible: un solo Product Backlog y un solo Product Owner para múltiples equipos</td><td>Overall Retrospective, Sprint Review combinado</td></tr>
<tr><td>Spotify Model</td><td>No es un framework formal — es una forma de organizar equipos autónomos ("Squads") agrupados en "Tribes", con "Chapters" y "Guilds" para compartir conocimiento transversal</td><td>Squad, Tribe, Chapter, Guild</td></tr>
<tr><td>Scrum of Scrums (SoS)</td><td>Reunión de representantes de cada equipo Scrum para coordinar dependencias entre equipos — el "Daily" a nivel de programa</td><td>Se hace 2-3 veces por semana, no necesariamente a diario</td></tr>
</table>
<h4>PI Planning (SAFe) en detalle</h4>
<p>Evento de 2 días donde <b>todos</b> los equipos de un Agile Release Train (5-12 equipos, ~50-125 personas) planifican juntos el próximo Program Increment (típicamente 5 Sprints, ~10 semanas). Se identifican dependencias entre equipos y riesgos (técnica "ROAM": Resolved, Owned, Accepted, Mitigated) antes de comenzar a ejecutar — crítico cuando un equipo de firmware depende de la entrega de otro equipo de hardware/bench.</p>
  </div>

  <div id="agl-5" class="tab-panel">
<table class="kv-table">
<tr><th>Anti-patrón</th><th>Por qué ocurre</th><th>Cómo corregirlo</th></tr>
<tr><td>"Water-Scrum-Fall"</td><td>Se hace Waterfall para requisitos y diseño, "Scrum" solo para la fase de codificación, y Waterfall de nuevo para testing/release</td><td>Involucrar testing y stakeholders desde el primer Sprint, no al final</td></tr>
<tr><td>Confundir Kanban con "no tener proceso"</td><td>Se cree que sin Sprints no hay disciplina — se elimina el WIP limit "para ir más rápido"</td><td>El WIP limit ES la disciplina central de Kanban — sin él, no es Kanban, es caos</td></tr>
<tr><td>Escalar sin necesidad real</td><td>Se adopta SAFe para 2 equipos pequeños "porque lo usa toda la empresa"</td><td>Escalar solo cuando la coordinación entre equipos es realmente el cuello de botella</td></tr>
<tr><td>Cargo cult Agile</td><td>Se copian ceremonias (Daily, Retro) sin entender el porqué — se hacen "porque toca"</td><td>Volver siempre a los 4 valores y 12 principios para justificar cada práctica</td></tr>
</table>
<div class="practice-card"><div class="practice-title">Medir flujo, no ocupación</div><p>Cycle Time y Throughput predicen mejor la entrega real que el % de "utilización" de cada persona — un equipo 100% ocupado suele tener el peor Cycle Time por exceso de cambio de contexto.</p></div>
<div class="practice-card"><div class="practice-title">Visualizar SIEMPRE el trabajo bloqueado</div><p>Un ítem bloqueado (esperando HW, esperando aprobación) debe marcarse visualmente distinto en el tablero — si se esconde, nadie lo prioriza para desbloquear.</p></div>
<div class="practice-card"><div class="practice-title">El WIP limit se ajusta con datos, no con opinión</div><p>Empezar con un límite razonable (ej. 2× el número de personas en esa columna) y ajustarlo según el Cycle Time observado en las semanas siguientes.</p></div>
  </div>

  <div id="agl-6" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿Kanban tiene Sprints?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No.</b> Kanban es flujo continuo, sin iteraciones de timebox fijo. "Scrumban" es un híbrido que sí usa Sprints con tablero Kanban y límites de WIP.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>Un ítem espera 3 días en el backlog antes de empezar y luego toma 2 días de trabajo activo. ¿Cuáles son su Lead Time y Cycle Time?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Lead Time = 5 días</b> (desde que entra hasta que se entrega). <b>Cycle Time = 2 días</b> (desde que se empieza a trabajar activamente hasta que se termina).</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿SAFe reemplaza a Scrum dentro de cada equipo?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No.</b> SAFe típicamente usa Scrum (o Kanban) dentro de cada equipo individual y agrega una capa de coordinación (PI Planning, ART) por encima para sincronizar múltiples equipos.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Un equipo tiene WIP limit de 3 en "In Progress" pero hay 5 ítems ahí. ¿Qué se debería hacer?<span class="q-arr">▶</span></div><div class="quiz-a">Detener el ingreso de trabajo nuevo hasta bajar a 3 — el equipo debe enfocarse en TERMINAR ítems en progreso ("swarming") antes de empezar nada nuevo. Violar el WIP limit de forma sistemática indica que el límite está mal calibrado o que hay un cuello de botella sin resolver.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿El Manifiesto Ágil dice que la documentación no importa?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No.</b> El manifiesto dice que se valora "software funcionando MÁS que documentación extensiva", no que la documentación no importe. En dominios regulados (ISO 26262/ASPICE) sigue siendo obligatoria.</div></div>
</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Agile...</p>
</div>`,

'vmodel': `
<div class="tab-group-vmo">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'vmo-1','vmo')">Estructura & Trazabilidad</button>
    <button class="tab-btn" onclick="switchTab(this,'vmo-2','vmo')">V-Model + ASPICE</button>
    <button class="tab-btn" onclick="switchTab(this,'vmo-3','vmo')">MIL / SIL / PIL / HIL / VIL</button>
    <button class="tab-btn" onclick="switchTab(this,'vmo-4','vmo')">V-Model vs Agile (híbrido)</button>
    <button class="tab-btn" onclick="switchTab(this,'vmo-5','vmo')">⚠️ Errores & ✅ Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'vmo-6','vmo')">Quiz</button>
  </div>

  <div id="vmo-1" class="tab-panel active">
<div class="concept-intro">El V-Model es la representación gráfica del ciclo de vida de desarrollo donde cada actividad de <b>construcción</b> (lado izquierdo, bajando) tiene una actividad de <b>verificación/validación</b> correspondiente (lado derecho, subiendo) al mismo nivel de abstracción.</div>
<div class="code-block"><div class="code-lang">V-Model — Diagrama</div><pre>
Requisitos del sistema ────────────────► Acceptance Test (UAT)
     │                                        │
  Requisitos SW ──────────────────► System Test
         │                              │
      SW Architecture ──────► Integration Test
             │                    │
          SW Detailed Design ► Unit Test
                   │
                 Implementation (Coding)
                   │
                   ▼
               CONSTRUCCIÓN ─────────────────────────────►
                                                      VERIFICACIÓN</pre></div>
<p>La clave del V-Model: <b>cada fase de la izquierda tiene su fase de prueba correspondiente en la derecha</b>. Los test cases se definen en paralelo con los documentos de diseño, no después de la implementación.</p>
<h4>Verificación vs Validación</h4>
<table class="kv-table">
<tr><th></th><th>Verificación</th><th>Validación</th></tr>
<tr><td>Pregunta que responde</td><td>¿Estamos construyendo el producto correctamente? (¿cumple la especificación?)</td><td>¿Estamos construyendo el producto correcto? (¿cumple la necesidad real del usuario?)</td></tr>
<tr><td>Se compara contra</td><td>El documento de diseño/requisito del nivel correspondiente</td><td>La necesidad original del stakeholder / mercado</td></tr>
<tr><td>Ejemplo automotriz</td><td>Unit Test confirma que la función implementa el Detailed Design</td><td>Acceptance Test en vehículo confirma que el conductor realmente percibe el ACC como seguro y útil</td></tr>
</table>
<h4>Trazabilidad — el pegamento del V-Model</h4>
<p>Cada requisito de sistema debe poder <b>trazarse</b> hacia abajo (qué diseño lo implementa, qué código lo realiza) y hacia arriba (qué test lo verifica). Herramientas típicas: IBM DOORS, Polarion, Jama Connect, codeBeamer. Sin trazabilidad formal, un auditor de ASPICE no puede confirmar que "todo requisito tiene al menos un test que lo cubre" — requisito explícito de los procesos de soporte de ASPICE.</p>
  </div>

  <div id="vmo-2" class="tab-panel">
<div class="concept-intro">ASPICE (Automotive SPICE) formaliza el V-Model en un modelo de procesos evaluables (niveles de capacidad 0-5, similar a CMMI). Cada proceso tiene un código: <b>SYS</b> (sistema) y <b>SWE</b> (software engineering).</div>
<table class="kv-table">
<tr><th>Proceso ASPICE</th><th>Nombre</th><th>Nivel del V-Model</th></tr>
<tr><td>SYS.1</td><td>Requirements Elicitation</td><td>Entrada — recolección de requisitos del stakeholder</td></tr>
<tr><td>SYS.2</td><td>System Requirements Analysis</td><td>Vértice superior izquierdo</td></tr>
<tr><td>SYS.3</td><td>System Architectural Design</td><td>Segundo nivel izquierdo</td></tr>
<tr><td>SYS.4</td><td>System Integration Test</td><td>Segundo nivel derecho (↔ SYS.3)</td></tr>
<tr><td>SYS.5</td><td>System Qualification Test</td><td>Vértice superior derecho (↔ SYS.2)</td></tr>
<tr><td>SWE.1</td><td>Software Requirements Analysis</td><td>Tercer nivel izquierdo</td></tr>
<tr><td>SWE.2</td><td>Software Architectural Design</td><td>Cuarto nivel izquierdo</td></tr>
<tr><td>SWE.3</td><td>SW Detailed Design and Unit Construction</td><td>Fondo del V (implementación)</td></tr>
<tr><td>SWE.4</td><td>SW Unit Verification</td><td>Fondo del V (↔ SWE.3, Unit Test)</td></tr>
<tr><td>SWE.5</td><td>SW Integration and Integration Test</td><td>↔ SWE.2</td></tr>
<tr><td>SWE.6</td><td>SW Qualification Test</td><td>↔ SWE.1</td></tr>
</table>
<p>Además de SYS/SWE, ASPICE incluye procesos de soporte transversales: <b>SUP.1</b> Quality Assurance, <b>SUP.8</b> Configuration Management, <b>SUP.9</b> Problem Resolution Management, <b>SUP.10</b> Change Request Management, y de gestión: <b>MAN.3</b> Project Management.</p>
  </div>

  <div id="vmo-3" class="tab-panel">
<table class="kv-table">
<tr><th>Nivel</th><th>Qué es real</th><th>Qué es simulado</th><th>Propósito</th><th>Herramienta típica</th></tr>
<tr><td>MIL (Model-in-the-Loop)</td><td>Nada — todo es modelo</td><td>Algoritmo de control + planta física, ambos en Simulink</td><td>Validar la lógica de control antes de generar código</td><td>MATLAB/Simulink, Stateflow</td></tr>
<tr><td>SIL (Software-in-the-Loop)</td><td>Código de producción (C generado o escrito a mano)</td><td>La planta física y el entorno (sensores, actuadores)</td><td>Validar que el código generado se comporta igual que el modelo MIL</td><td>Código compilado en PC + entorno de simulación</td></tr>
<tr><td>PIL (Processor-in-the-Loop)</td><td>Código corriendo en el procesador objetivo (o su emulador)</td><td>La planta y el entorno siguen simulados</td><td>Validar timing y comportamiento específico del procesador (overflow, precisión de punto fijo)</td><td>Emuladores de target, JTAG</td></tr>
<tr><td>HIL (Hardware-in-the-Loop)</td><td>La ECU física completa (hardware + firmware real)</td><td>La planta y el entorno (motor, sensores) simulados en tiempo real</td><td>Validar la ECU real sin necesidad del vehículo/planta física completa</td><td>dSPACE, NI VeriStand, ControlDesk</td></tr>
<tr><td>VIL (Vehicle-in-the-Loop)</td><td>El vehículo físico completo, a veces en banco de rodillos</td><td>El entorno de tráfico/escenario (otros vehículos, obstáculos)</td><td>Validar ADAS/AV con escenarios de tráfico repetibles y sin riesgo real</td><td>Bancos de rodillos + inyección de objetos simulados en los sensores</td></tr>
</table>
<div class="concept-intro">Cada nivel corresponde a una etapa de "realismo creciente, costo creciente, velocidad de iteración decreciente". La estrategia habitual: encontrar la mayor cantidad de bugs posible en MIL/SIL (barato, rápido, paralelizable) para llegar a HIL con el código ya maduro — HIL es caro y limitado en número de bancos disponibles.</div>
  </div>

  <div id="vmo-4" class="tab-panel">
<div class="concept-intro">El V-Model puro tiene una crítica constante: <b>el feedback llega muy tarde</b> — un error de requisitos detectado recién en System Test puede implicar rehacer meses de diseño. La industria automotriz resuelve esto con enfoques híbridos.</div>
<h4>Críticas comunes al V-Model puro</h4>
<p>• Documentación pesada que se vuelve obsoleta si cambia el requisito.<br>• Feedback del cliente/usuario final solo al final del ciclo.<br>• Difícil de adaptar a cambios de alcance a mitad de proyecto.<br>• Fomenta "silos" entre fases (el equipo de diseño no habla con el de test hasta el final).</p>
<h4>"Agile-in-the-V" — el híbrido más usado en automoción</h4>
<p>Se mantiene el V-Model como marco de <b>gobernanza y compliance</b> (para satisfacer ASPICE/ISO 26262 con trazabilidad formal), pero <b>dentro</b> de cada nivel del V (p. ej. SWE.3 Detailed Design) el equipo trabaja en Sprints ágiles con integración continua. Los documentos de trazabilidad se generan de forma semi-automática desde herramientas ALM (Polarion, Jama) conectadas al backlog ágil, en vez de escribirse manualmente al final.</p>
<div class="code-block"><div class="code-lang">Flujo híbrido — Firmware ADAS</div><pre>
Nivel V:  SYS.2 System Requirements -> congelado por release, con
          trazabilidad en DOORS (governance / compliance)
                    |
Dentro:   Sprint 1: implementar detección de objeto estático (feature slice)
          Sprint 2: implementar tracking del objeto + tests HIL automatizados
          Sprint 3: implementar lógica de frenado + regresión completa
                    |
Nivel V:  SWE.6 Software Qualification Test -> ejecutado incrementalmente
          en CI (SIL) cada Sprint, y formalmente en HIL antes del release</pre></div>
  </div>

  <div id="vmo-5" class="tab-panel">
<table class="kv-table">
<tr><th>Error</th><th>Consecuencia</th><th>Mitigación</th></tr>
<tr><td>Escribir los test cases DESPUÉS de implementar</td><td>Se pierde el propósito del V-Model: verificar contra la especificación, no contra el código ya escrito (sesgo de confirmación)</td><td>Definir los test cases en paralelo con cada documento de diseño, antes de codificar</td></tr>
<tr><td>Trazabilidad mantenida manualmente en Excel</td><td>Se desactualiza casi de inmediato, imposible de auditar en programas grandes</td><td>Usar herramientas ALM que enlazan requisito ↔ diseño ↔ código ↔ test automáticamente</td></tr>
<tr><td>Tratar el V-Model como estrictamente secuencial (big-bang)</td><td>Ningún nivel empieza hasta que el anterior "está 100% terminado" — feedback tardísimo</td><td>Iterar dentro de cada nivel (Agile-in-the-V) permitiendo refinamiento incremental de requisitos</td></tr>
</table>
<div class="practice-card"><div class="practice-title">Congela solo lo que debes congelar por compliance</div><p>No todos los documentos necesitan el mismo rigor de control de cambios — reservar el proceso formal pesado para los artefactos que realmente audita ASPICE/ISO 26262.</p></div>
<div class="practice-card"><div class="practice-title">Automatiza la trazabilidad desde el día 1</div><p>Vincular commits/tests a IDs de requisito (p. ej. en el mensaje de commit o en el sistema de tickets) hace que el reporte de cobertura de requisitos se genere solo, sin trabajo manual al final del proyecto.</p></div>
  </div>

  <div id="vmo-6" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Contra qué documento verifica un Unit Test en el V-Model?<span class="q-arr">▶</span></div><div class="quiz-a">Contra el <b>SW Detailed Design (SWE.3)</b>, no contra los requisitos de sistema — cada nivel del V verifica su documento correspondiente al mismo nivel de abstracción.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿HIL reemplaza la necesidad de probar en el vehículo real?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No.</b> HIL reduce drásticamente cuántos bugs llegan al vehículo real, pero no reemplaza el Vehicle Test / VIL — hay efectos físicos (vibración real, EMI real, desgaste mecánico) que ningún banco simula al 100%.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>¿Qué proceso ASPICE cubre la gestión de cambios de requisitos?<span class="q-arr">▶</span></div><div class="quiz-a"><b>SUP.10 Change Request Management</b>, junto con SUP.8 Configuration Management para versionado y SUP.9 Problem Resolution Management para el manejo de defectos.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>Si un test de SWE.6 (Qualification Test) falla, ¿implica necesariamente un bug de código?<span class="q-arr">▶</span></div><div class="quiz-a">No necesariamente — puede ser un error en el propio requisito de sistema (SYS.2) mal trazado hacia el nivel SW, o un test case mal definido. La trazabilidad del V-Model ayuda a aislar en qué nivel está realmente el problema.</div></div>
</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el V-Model...</p>
</div>`,

'sw-testing-concepts': `
<div class="tab-group-stc">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'stc-1','stc')">Black / White / Gray Box</button>
    <button class="tab-btn" onclick="switchTab(this,'stc-2','stc')">Tipos de ejecución</button>
    <button class="tab-btn" onclick="switchTab(this,'stc-3','stc')">Defect Life Cycle</button>
    <button class="tab-btn" onclick="switchTab(this,'stc-4','stc')">Test Oracle & Trazabilidad</button>
    <button class="tab-btn" onclick="switchTab(this,'stc-5','stc')">⚠️ Errores & ✅ Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'stc-6','stc')">Quiz</button>
  </div>

  <div id="stc-1" class="tab-panel active">
<div class="concept-intro">La clasificación más fundamental en testing es <b>cuánto conocimiento interno tiene el tester</b> sobre la implementación.</div>
<table class="kv-table">
<tr><th>Enfoque</th><th>Qué ve el tester</th><th>Técnicas típicas</th><th>Quién lo suele hacer</th></tr>
<tr><td>Black Box</td><td>Solo entradas/salidas — el código es una caja opaca</td><td>Equivalence Partitioning, Boundary Value Analysis, Decision Table, State Transition</td><td>QA / Test Engineer independiente</td></tr>
<tr><td>White Box</td><td>El código fuente completo</td><td>Statement/Branch/Condition/MC-DC coverage, análisis de complejidad ciclomática</td><td>El propio desarrollador (unit tests)</td></tr>
<tr><td>Gray Box</td><td>Conocimiento parcial: arquitectura general, pero no cada línea</td><td>Combina EP/BVA con conocimiento de la arquitectura para diseñar casos más inteligentes (p. ej. saber que existe una caché interna)</td><td>Integration testers, a veces SDET</td></tr>
</table>
<div class="code-block"><div class="code-lang">Ejemplo — misma función, dos enfoques distintos</div><pre>
<span class="c-kw">def</span> <span class="c-fn">calcular_soc</span>(voltaje, temperatura):
    <span class="c-kw">if</span> temperatura &lt; <span class="c-nb">-20</span>:
        <span class="c-kw">return</span> <span class="c-kw">None</span>  <span class="c-cm"># fuera de rango operativo</span>
    <span class="c-kw">if</span> voltaje &gt; <span class="c-nb">4.2</span>:
        <span class="c-kw">return</span> <span class="c-nb">100.0</span>
    <span class="c-kw">return</span> (voltaje - <span class="c-nb">3.0</span>) / (<span class="c-nb">4.2</span> - <span class="c-nb">3.0</span>) * <span class="c-nb">100</span>

<span class="c-cm"># Black Box: no sabemos que existe el caso "temperatura < -20"
# a menos que esté en la especificación -- probamos por especificación:
#   calcular_soc(3.6, 25)  -> caso normal
#   calcular_soc(4.5, 25)  -> caso límite superior (satura a 100%)

# White Box: vemos el código, sabemos que existe la rama de -20°C
# y la añadimos aunque NO esté documentada en la especificación:
#   calcular_soc(3.6, -25) -> cubre la rama oculta</span></pre></div>
<div class="concept-intro">Esta diferencia explica por qué <b>ambos enfoques son complementarios</b>: Black Box encuentra huecos entre lo que el sistema hace y lo que debería hacer según la especificación; White Box encuentra código que ni siquiera está especificado (o especificado incorrectamente).</div>
  </div>

  <div id="stc-2" class="tab-panel">
<table class="kv-table">
<tr><th>Tipo</th><th>Objetivo</th><th>Cuándo se ejecuta</th><th>Alcance</th></tr>
<tr><td>Smoke Test</td><td>¿El build arrancó? ¿Lo básico funciona?</td><td>Inmediatamente después de cada build/deploy</td><td>Muy superficial, minutos</td></tr>
<tr><td>Sanity Test</td><td>¿Este fix/feature específico funciona?</td><td>Después de un fix puntual, antes de una regresión completa</td><td>Muy enfocado, sin profundidad</td></tr>
<tr><td>Regression Test</td><td>¿Algo que YA funcionaba se rompió?</td><td>Antes de cada release, o continuamente en CI</td><td>Amplio — toda la funcionalidad existente relevante</td></tr>
<tr><td>Exploratory Test</td><td>Encontrar comportamientos inesperados sin guion previo</td><td>Complementa las pruebas formales, en sesiones dedicadas</td><td>Libre, guiado por la experiencia del tester</td></tr>
<tr><td>Ad-hoc Test</td><td>Prueba informal sin ningún plan ni documentación</td><td>Cuando se sospecha algo puntual, exploración rápida</td><td>Sin estructura, no repetible ni documentado</td></tr>
</table>
<div class="concept-intro">Diferencia sutil entre <b>Exploratory</b> y <b>Ad-hoc</b>: Exploratory Testing es una técnica <em>disciplinada</em> — se diseñan "charters" (misión/objetivo de la sesión) y se documentan los hallazgos, aunque no haya casos de prueba escritos de antemano. Ad-hoc es simplemente probar sin ningún tipo de estructura ni registro — útil, pero no repetible ni auditable.</div>
  </div>

  <div id="stc-3" class="tab-panel">
<div class="concept-intro">Un defecto reportado en un bug tracker (Jira, Polarion, Azure DevOps) atraviesa un ciclo de vida formal — entender estos estados es clave para un triage eficiente en equipos grandes.</div>
<div class="dtree">
  <div class="dtree-title">Ciclo de vida de un defecto</div>
  <div class="dtree-step"><div class="dtree-num">1</div><div class="dtree-body"><h5>New</h5><p>El defecto se reporta por primera vez, con pasos para reproducir, resultado esperado vs actual.</p></div></div>
  <div class="dtree-step"><div class="dtree-num">2</div><div class="dtree-body"><h5>Assigned / Open</h5><p>Un desarrollador confirma que es un defecto válido (no duplicado, no "trabaja como se diseñó") y lo toma para investigar.</p></div></div>
  <div class="dtree-step"><div class="dtree-num warn">3</div><div class="dtree-body"><h5>Fixed / In Review</h5><p>Se implementa la corrección; pasa por code review y unit tests antes de integrarse.</p></div></div>
  <div class="dtree-step"><div class="dtree-num">4</div><div class="dtree-body"><h5>Retest</h5><p>El tester (idealmente el que lo reportó, o QA) verifica que el fix realmente resuelve el problema original sin introducir regresiones.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">5</div><div class="dtree-body"><h5>Verified / Closed</h5><p>Confirmado en retest. Se cierra formalmente, a veces con aprobación adicional en dominios de seguridad (revisión del Safety Case).</p></div></div>
  <div class="dtree-step"><div class="dtree-num warn">↺</div><div class="dtree-body"><h5>Reopened</h5><p>Si el retest falla, vuelve a "Open" — NO se crea un ticket nuevo, se reabre el mismo para mantener el historial completo del defecto.</p></div></div>
</div>
<h4>Severidad vs Prioridad — la confusión más común en entrevistas</h4>
<table class="kv-table">
<tr><th></th><th>Severidad</th><th>Prioridad</th></tr>
<tr><td>Qué mide</td><td>Qué tan grave es el IMPACTO técnico del defecto</td><td>Qué tan urgente es arreglarlo respecto a otras tareas</td></tr>
<tr><td>Quién la define</td><td>El tester/QA, basado en el impacto observado</td><td>El Product Owner / gerencia, basado en negocio</td></tr>
<tr><td>Ejemplo alta severidad, baja prioridad</td><td colspan="2">Crash en una función de diagnóstico usada solo en fábrica, una vez al año</td></tr>
<tr><td>Ejemplo baja severidad, alta prioridad</td><td colspan="2">Un logo mal alineado en la pantalla de bienvenida justo antes de una demo a un cliente importante</td></tr>
</table>
  </div>

  <div id="stc-4" class="tab-panel">
<div class="concept-intro">Un <b>test oracle</b> es el mecanismo que determina si el resultado de una prueba es correcto o incorrecto — es decir, "cómo sabemos qué resultado esperar".</div>
<table class="kv-table">
<tr><th>Tipo de oracle</th><th>Cómo determina el resultado esperado</th><th>Ejemplo</th></tr>
<tr><td>Specification-based</td><td>Se compara contra la especificación/requisito documentado</td><td>El DBC dice que el ID 0x200 en bytes 0-1 codifica velocidad con factor 0.01 → se calcula el valor esperado manualmente</td></tr>
<tr><td>Derived / Modelo de referencia</td><td>Se compara contra un modelo independiente que calcula el mismo resultado por otra vía</td><td>Comparar la salida del código de producción C contra la salida del modelo Simulink para la misma entrada</td></tr>
<tr><td>Heuristic (parcial)</td><td>No hay un oráculo exacto, pero se pueden verificar propiedades generales</td><td>"La velocidad calculada nunca debe ser negativa" aunque no se sepa el valor exacto esperado</td></tr>
<tr><td>No Oracle Problem</td><td>No existe forma automática de saber si el resultado es correcto — requiere revisión humana</td><td>Evaluar si una imagen de cámara está "bien clasificada" por un modelo de percepción en un caso ambiguo</td></tr>
</table>
<h4>Requirement Traceability Matrix (RTM)</h4>
<p>Tabla (o vista generada por herramienta ALM) que conecta cada requisito con: el diseño que lo implementa, el código correspondiente, y el/los test case(s) que lo verifican. Es la evidencia que un auditor de ASPICE revisa para confirmar cobertura completa — "todo requisito tiene al menos un test, todo test traza a un requisito".</p>
  </div>

  <div id="stc-5" class="tab-panel">
<table class="kv-table">
<tr><th>Error</th><th>Consecuencia</th><th>Corrección</th></tr>
<tr><td>Confundir severidad con prioridad al triagear</td><td>Bugs críticos técnicamente quedan sin atender porque "no parecen urgentes", o bugs cosméticos bloquean releases sin motivo real</td><td>Registrar ambos campos por separado, cada uno definido por el rol correcto (QA=severidad, PO=prioridad)</td></tr>
<tr><td>Reportar un defecto sin pasos para reproducir</td><td>El desarrollador no puede confirmar ni arreglar — el ticket rebota ("no repro") consumiendo tiempo de ambos lados</td><td>Incluir siempre: pasos exactos, resultado esperado, resultado actual, entorno/versión, logs/evidencia</td></tr>
<tr><td>Cerrar un defecto sin retest</td><td>El desarrollador asume que su fix funciona y cierra el ticket él mismo — puede quedar sin verificar realmente</td><td>El retest lo hace preferentemente quien lo reportó o un tester independiente, nunca solo el autor del fix</td></tr>
</table>
<div class="practice-card"><div class="practice-title">Un bug = un ticket, reabrir en vez de duplicar</div><p>Mantener el historial completo (comentarios, intentos previos) en un solo ticket reabierto es mucho más útil para debugging que fragmentar en tickets duplicados.</p></div>
<div class="practice-card"><div class="practice-title">Adjunta siempre evidencia objetiva</div><p>Logs, capturas de CANoe/trace, o el propio archivo MCAP de la sesión donde ocurrió — reduce drásticamente el tiempo de "no repro" en bugs dependientes de hardware.</p></div>
  </div>

  <div id="stc-6" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿Un bug de severidad Crítica siempre tiene prioridad Alta?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No necesariamente.</b> Ver el ejemplo de la función de diagnóstico usada una vez al año: severidad crítica (crashea el sistema) pero prioridad baja (impacto de negocio mínimo, se puede planificar para el próximo release).</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Qué diferencia hay entre reabrir un defecto y crear uno nuevo tras un retest fallido?<span class="q-arr">▶</span></div><div class="quiz-a">Reabrir preserva todo el historial de investigación previa (intentos de fix, discusión, causa raíz parcial) — crear uno nuevo pierde ese contexto y puede llevar a re-investigar desde cero.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Si dos test cases usan el mismo test oracle specification-based y ambos pasan, ¿el requisito está garantizado correcto?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No completamente.</b> El oracle solo verifica lo que la especificación dice explícitamente; si la especificación misma tiene un error o está incompleta ("absence-of-errors fallacy"), ambos tests pasarán aunque el sistema no cumpla la necesidad real del usuario.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>¿Exploratory testing reemplaza los test cases formales?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No, los complementa.</b> Encuentra clases de defectos que los casos escritos de antemano no anticipan, pero no es repetible ni auditable de la misma forma, por lo que no sustituye la cobertura formal requerida en dominios regulados.</div></div>
</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre conceptos de testing...</p>
</div>`,

'test-levels': `
<div class="tab-group-tlv">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'tlv-1','tlv')">Pirámide vs Trofeo</button>
    <button class="tab-btn" onclick="switchTab(this,'tlv-2','tlv')">Unit Testing: Mocks/Stubs/Fakes</button>
    <button class="tab-btn" onclick="switchTab(this,'tlv-3','tlv')">Integration, System & Acceptance</button>
    <button class="tab-btn" onclick="switchTab(this,'tlv-4','tlv')">Cobertura de código</button>
    <button class="tab-btn" onclick="switchTab(this,'tlv-5','tlv')">⚠️ Errores & ✅ Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'tlv-6','tlv')">Quiz</button>
  </div>

  <div id="tlv-1" class="tab-panel active">
<div class="concept-intro">La <b>pirámide de testing</b> (Mike Cohn) recomienda muchos tests unitarios rápidos y baratos en la base, y pocos tests end-to-end lentos y caros en la punta. Es el modelo por defecto para sistemas embebidos/backend donde la lógica de negocio domina.</div>
<div class="code-block"><div class="code-lang">Pirámide de Testing</div><pre>
              /\\
             /  \\
            / E2E\\    <- Pocas pruebas, muy lentas, muy caras
           /------\\      (pruebas de sistema completo, UI)
          /Integr. \\  <- Moderadas: prueban la conexión entre módulos
         /----------\\
        / Unit Tests \\ <- Muchas, rápidas, baratas
       /______________\\   (la base de la pirámide)

Unit -> Integration -> System -> Acceptance (UAT)</pre></div>
<h4>La "Testing Trophy" (Kent C. Dodds) — alternativa</h4>
<div class="code-block"><div class="code-lang">Testing Trophy — más peso en Integration</div><pre>
      /\\          E2E -- pocos
     /--\\
    / INT\\        Integration -- LA MAYOR PARTE del esfuerzo
   /------\\
  /  Unit  \\      Unit -- moderados
 /----------\\
   Static           Static analysis (linters, tipos) -- base gratuita

Filosofía: "Escribe tests, no demasiados, mayormente de integración"
(Kent C. Dodds) -- pensado originalmente para frontend, pero aplica
también cuando la lógica vive en la INTEGRACIÓN entre módulos
(p. ej. el parser de un DBC + el bus CAN simulado)</pre></div>
<p>En automoción, la <b>pirámide clásica</b> sigue siendo dominante para firmware/lógica de control (mucha lógica pura, testeable en aislamiento), mientras que la Testing Trophy aplica mejor a capas de integración de servicios (ej. microservicios de fleet management, backends de telemetría) donde el valor real está en cómo interactúan los módulos.</p>
  </div>

  <div id="tlv-2" class="tab-panel">
<table class="kv-table">
<tr><th>Test Double</th><th>Qué hace</th><th>Ejemplo</th></tr>
<tr><td>Dummy</td><td>Objeto que se pasa solo para satisfacer una firma de función, nunca se usa realmente</td><td>Pasar un logger vacío a un constructor que lo requiere, pero el test no verifica logging</td></tr>
<tr><td>Stub</td><td>Devuelve respuestas predefinidas y fijas a las llamadas hechas durante el test</td><td><code>can_driver.read()</code> siempre devuelve la misma trama fija, sin lógica</td></tr>
<tr><td>Fake</td><td>Implementación funcional simplificada, pero real (no apta para producción)</td><td>Una base de datos en memoria (SQLite in-memory) en vez de la BD real de producción</td></tr>
<tr><td>Mock</td><td>Objeto que además VERIFICA cómo fue llamado (cuántas veces, con qué argumentos)</td><td>Verificar que <code>can_driver.send()</code> fue llamado exactamente una vez con el ID 0x200</td></tr>
<tr><td>Spy</td><td>Wrapper sobre un objeto real que registra las llamadas sin cambiar su comportamiento</td><td>Envolver el driver real y verificar que se llamó, dejándolo funcionar normalmente</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — Mock de un driver CAN con unittest.mock</div><pre>
<span class="c-kw">from</span> unittest.mock <span class="c-kw">import</span> MagicMock

<span class="c-kw">def</span> <span class="c-fn">test_envia_comando_apagado_al_recibir_alerta</span>():
    <span class="c-cm"># Arrange: driver falso, no hay bus CAN real en este test</span>
    can_driver = MagicMock()
    controller = MotorController(can_driver)

    <span class="c-cm"># Act</span>
    controller.on_overheat_alert()

    <span class="c-cm"># Assert: verificamos LA LLAMADA, no un bus real</span>
    can_driver.send.assert_called_once_with(id=<span class="c-nb">0x300</span>, data=[<span class="c-nb">0x00</span>])</pre></div>
<p><b>Por qué importa la distinción en entrevistas:</b> un Mock verifica comportamiento (interacciones), un Stub solo provee datos. Usar Mocks en exceso acopla el test a la implementación interna (si cambia CÓMO internamente se llama al driver, el test se rompe aunque el comportamiento externo sea idéntico) — regla general: "usa Stubs cuando puedas, Mocks solo cuando el efecto secundario ES el comportamiento que quieres verificar" (como un envío CAN).</p>
  </div>

  <div id="tlv-3" class="tab-panel">
<table class="kv-table">
<tr><th>Nivel</th><th>Qué prueba</th><th>Equivalente automotriz</th><th>Velocidad</th></tr>
<tr><td>Unit</td><td>Una función/clase aislada, con dependencias mockeadas</td><td>MIL — probar el algoritmo de control puro en Simulink</td><td>Milisegundos, miles por segundo</td></tr>
<tr><td>Integration</td><td>Cómo interactúan 2+ módulos reales entre sí</td><td>SIL — código real integrado contra un entorno simulado</td><td>Segundos</td></tr>
<tr><td>System</td><td>El sistema completo como caja negra, entorno realista</td><td>HIL — ECU física completa con planta simulada en tiempo real</td><td>Minutos</td></tr>
<tr><td>Acceptance (UAT)</td><td>El cliente/usuario final valida que cumple la necesidad real</td><td>Vehicle Test / VIL — prueba en el vehículo real o banco de rodillos</td><td>Horas / días</td></tr>
</table>
<h4>Contract Testing</h4>
<p>Técnica de integration testing para sistemas distribuidos (microservicios de backend, p. ej. servicios de fleet telemetry): en vez de levantar TODOS los servicios reales para probar la integración (lento, frágil), cada servicio define un "contrato" (esquema de request/response esperado) y se verifica que ambos lados (consumidor y proveedor) lo cumplan de forma independiente. Herramienta típica: Pact.</p>
  </div>

  <div id="tlv-4" class="tab-panel">
<table class="kv-table">
<tr><th>Tipo de cobertura</th><th>Qué mide</th><th>Ejemplo — no cubierto</th></tr>
<tr><td>Statement Coverage</td><td>% de líneas de código ejecutadas al menos una vez</td><td><code>if (x &gt; 0) { log(); }</code> — si nunca se ejecuta log(), esa línea no está cubierta</td></tr>
<tr><td>Branch (Decision) Coverage</td><td>% de ramas (true/false de cada condición) ejecutadas</td><td>Si solo se prueba x&gt;0=true, la rama false nunca se ejecuta aunque la línea del if sí "cuente" en statement coverage</td></tr>
<tr><td>Condition Coverage</td><td>% de sub-condiciones individuales evaluadas a true y false dentro de expresiones compuestas</td><td><code>if (a &amp;&amp; b)</code> necesita casos donde a y b varíen independientemente, no solo el resultado final</td></tr>
<tr><td>MC/DC (Modified Condition/Decision Coverage)</td><td>Cada condición dentro de una decisión compuesta debe demostrarse que afecta el resultado de forma INDEPENDIENTE</td><td><code>if (a &amp;&amp; b)</code> requiere probar que cambiar solo "a" (con b fijo) cambia el resultado, y viceversa — más casos que Condition Coverage simple</td></tr>
</table>
<h4>Cobertura requerida por nivel ASIL (ISO 26262 Parte 6)</h4>
<table class="kv-table">
<tr><th>ASIL</th><th>Statement</th><th>Branch</th><th>MC/DC</th></tr>
<tr><td>QM / ASIL A</td><td>Recomendado</td><td>Recomendado</td><td>No requerido</td></tr>
<tr><td>ASIL B</td><td>Altamente recomendado</td><td>Recomendado</td><td>Recomendado</td></tr>
<tr><td>ASIL C</td><td>Altamente recomendado</td><td>Altamente recomendado</td><td>Recomendado</td></tr>
<tr><td>ASIL D</td><td>Altamente recomendado</td><td>Altamente recomendado</td><td>Altamente recomendado</td></tr>
</table>
<div class="concept-intro"><b>Trampa clásica de entrevista:</b> 100% statement coverage NO implica 100% branch coverage, y ninguno de los dos implica que la lógica sea correcta — coverage mide qué código se EJECUTÓ, no si los asserts verifican lo correcto. Un test sin ningún assert puede lograr 100% de statement coverage sin detectar ningún bug.</div>
  </div>

  <div id="tlv-5" class="tab-panel">
<table class="kv-table">
<tr><th>Error</th><th>Consecuencia</th><th>Corrección</th></tr>
<tr><td>Perseguir 100% de coverage como meta en sí misma</td><td>Se escriben tests triviales sin asserts significativos solo para "pintar la línea verde"</td><td>Fijar coverage mínimo según criticidad (ASIL) y auditar la CALIDAD de los asserts, no solo el %</td></tr>
<tr><td>Mockear demasiado en integration tests</td><td>El test "pasa" pero no prueba la integración real — dos módulos incompatibles en producción pasan el test igual</td><td>Reservar mocks para dependencias externas lentas/costosas (red, HW no disponible); usar componentes reales entre los módulos bajo prueba</td></tr>
<tr><td>Confundir un Unit Test lento (con I/O real) con Integration Test</td><td>La suite de "unit tests" tarda minutos, rompe el feedback rápido esperado de la base de la pirámide</td><td>Si toca disco, red o BD real, es un Integration Test — debe vivir en una suite separada con su propio timebox en CI</td></tr>
</table>
<div class="practice-card"><div class="practice-title">La base de la pirámide debe correr en segundos</div><p>Si la suite completa de unit tests tarda más de ~1 minuto, algo se está mockeando mal o hay I/O real escondido — esto rompe el ciclo rápido de feedback que justifica tener muchos unit tests.</p></div>
<div class="practice-card"><div class="practice-title">MC/DC no es opcional en ASIL D</div><p>Para funciones de seguridad crítica (frenado, dirección), ISO 26262 espera evidencia de MC/DC — planifica el diseño de casos de prueba desde el principio, no como un parche al final del proyecto.</p></div>
  </div>

  <div id="tlv-6" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Qué distingue a un Mock de un Stub?<span class="q-arr">▶</span></div><div class="quiz-a">El Stub solo provee datos/respuestas fijas; el Mock además VERIFICA que fue llamado de cierta forma (<code>assert_called_with</code>). Un Stub nunca falla un test por sí mismo, un Mock sí puede hacer fallar el test si la interacción esperada no ocurrió.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Si logras 100% branch coverage en <code>if (a &amp;&amp; b || c)</code>, ¿tienes garantizado 100% de condition coverage?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No.</b> Branch coverage solo exige que la decisión completa sea true y false al menos una vez — con combinaciones específicas de a/b/c puede lograrse sin haber variado cada sub-condición de forma independiente, que es justo lo que exige MC/DC.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>Un test de integración usa SQLite en memoria en vez de la BD real de producción. ¿Es un Fake o un Stub?<span class="q-arr">▶</span></div><div class="quiz-a">Es un <b>Fake</b> — tiene una implementación funcional real y simplificada (ejecuta SQL de verdad), a diferencia de un Stub que solo devolvería respuestas fijas sin lógica real.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Por qué HIL no es suficiente para certificar un sistema ASIL D sin Vehicle Test?<span class="q-arr">▶</span></div><div class="quiz-a">HIL simula la planta (motor, sensores) matemáticamente — no captura por completo efectos físicos reales como vibración mecánica, interferencia electromagnética real, o degradación de conectores, que solo pueden manifestarse en el vehículo/entorno real.</div></div>
</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre niveles de prueba...</p>
</div>`,

'test-types': `
<div class="tab-group-tty">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'tty-1','tty')">Funcional vs No Funcional (ISO 25010)</button>
    <button class="tab-btn" onclick="switchTab(this,'tty-2','tty')">Load / Stress / Spike / Soak</button>
    <button class="tab-btn" onclick="switchTab(this,'tty-3','tty')">Automotriz: EMC, Ambiental, Fault Injection</button>
    <button class="tab-btn" onclick="switchTab(this,'tty-4','tty')">Static/Dynamic & Regression</button>
    <button class="tab-btn" onclick="switchTab(this,'tty-5','tty')">⚠️ Errores & ✅ Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'tty-6','tty')">Quiz</button>
  </div>

  <div id="tty-1" class="tab-panel active">
<div class="concept-intro">Todo tipo de prueba se puede clasificar primero como <b>funcional</b> (¿hace lo que debe?) o <b>no funcional</b> (¿lo hace bien: rápido, seguro, usable, confiable?). El estándar <b>ISO/IEC 25010</b> formaliza 8 características de calidad de software que sirven de checklist para lo no funcional.</div>
<table class="kv-table">
<tr><th>Característica ISO 25010</th><th>Qué cubre</th><th>Ejemplo de prueba</th></tr>
<tr><td>Functional Suitability</td><td>Completitud, corrección y pertinencia funcional</td><td>Test funcional clásico: ¿la función hace lo especificado?</td></tr>
<tr><td>Performance Efficiency</td><td>Tiempo de respuesta, uso de recursos, capacidad</td><td>Load test, Stress test</td></tr>
<tr><td>Compatibility</td><td>Coexistencia e interoperabilidad con otros sistemas</td><td>Matrix de HW/OS/versiones en CI</td></tr>
<tr><td>Usability</td><td>Facilidad de aprendizaje, operabilidad, accesibilidad</td><td>Sesiones de usuario, A/B testing del HMI</td></tr>
<tr><td>Reliability</td><td>Madurez, disponibilidad, tolerancia a fallos, recuperabilidad</td><td>Soak test, chaos engineering, fault injection</td></tr>
<tr><td>Security</td><td>Confidencialidad, integridad, no repudio, autenticidad</td><td>Penetration testing, fuzzing de UDS/DoIP</td></tr>
<tr><td>Maintainability</td><td>Modularidad, reusabilidad, testabilidad del propio código</td><td>Análisis estático, complejidad ciclomática, MISRA</td></tr>
<tr><td>Portability</td><td>Adaptabilidad, instalabilidad, reemplazabilidad</td><td>Compilar/correr el mismo firmware en distinto microcontrolador target</td></tr>
</table>
  </div>

  <div id="tty-2" class="tab-panel">
<table class="kv-table">
<tr><th>Tipo</th><th>Qué simula</th><th>Objetivo</th><th>Ejemplo automotriz</th></tr>
<tr><td>Load Test</td><td>Carga esperada normal/pico</td><td>Confirmar que el sistema responde bien bajo la carga prevista</td><td>1000 vehículos enviando telemetría simultáneamente al backend de flota</td></tr>
<tr><td>Stress Test</td><td>Carga por encima del límite esperado, hasta el punto de falla</td><td>Encontrar el punto de quiebre y cómo falla (gracefully o catastróficamente)</td><td>Saturar el bus CAN con tráfico hasta bus-off, verificar recuperación</td></tr>
<tr><td>Spike Test</td><td>Aumento repentino y breve de carga</td><td>Verificar que el sistema absorbe picos sin caerse</td><td>Ráfaga de DTCs generados simultáneamente tras un evento de choque</td></tr>
<tr><td>Soak / Endurance Test</td><td>Carga normal sostenida durante horas/días</td><td>Detectar memory leaks, degradación gradual, fugas de recursos</td><td>ECU corriendo 72 horas continuas verificando que no hay fuga de heap</td></tr>
<tr><td>Scalability Test</td><td>Incrementos progresivos de carga/usuarios</td><td>Determinar cómo escala el sistema al agregar recursos</td><td>Backend de fleet management al doblar la flota de vehículos conectados</td></tr>
</table>
  </div>

  <div id="tty-3" class="tab-panel">
<div class="concept-intro">La automoción agrega categorías de prueba no funcional que rara vez aparecen en software "de escritorio": el hardware opera en condiciones físicas extremas y debe convivir eléctricamente con docenas de otros módulos.</div>
<table class="kv-table">
<tr><th>Tipo</th><th>Qué verifica</th><th>Estándar típico</th></tr>
<tr><td>EMC (Electromagnetic Compatibility)</td><td>Que la ECU no emita interferencia que afecte a otros módulos (emisión) y que no falle ante interferencia externa (inmunidad)</td><td>ISO 11452 (inmunidad), CISPR 25 (emisión)</td></tr>
<tr><td>Environmental Testing</td><td>Operación correcta en rango de temperatura (-40°C a +85°C típico), humedad, vibración mecánica, choque</td><td>ISO 16750</td></tr>
<tr><td>Ingress Protection (IP Rating)</td><td>Resistencia a polvo y agua del conector/carcasa</td><td>IEC 60529 (ej. IP67, IP69K)</td></tr>
<tr><td>Fault Injection Testing</td><td>Inyectar fallos deliberados (cortocircuito, señal fuera de rango, pérdida de comunicación) para verificar que el sistema entra en modo seguro</td><td>Parte de la validación de ISO 26262 (FMEA/FMEDA)</td></tr>
<tr><td>Power Supply Testing</td><td>Comportamiento ante caídas de voltaje (cranking), sobretensión, polaridad inversa</td><td>ISO 16750-2</td></tr>
</table>
<h4>Fault Injection — ejemplo concreto</h4>
<p>Para un sensor de velocidad de rueda: se inyecta una señal fuera de rango físico (ej. 500 km/h) en el bus, o se simula la pérdida total de la señal (timeout). El test verifica que el sistema detecta el fallo (vía plausibility check) y transiciona a un <b>modo degradado seguro</b> (fail-operational: sigue funcionando con redundancia, o fail-safe: se apaga la función y alerta al conductor) en vez de usar el valor corrupto.</p>
  </div>

  <div id="tty-4" class="tab-panel">
<table class="kv-table">
<tr><th></th><th>Static Testing</th><th>Dynamic Testing</th></tr>
<tr><td>¿Se ejecuta el código?</td><td>No</td><td>Sí</td></tr>
<tr><td>Ejemplos</td><td>Code review, linting, MISRA check, complejidad ciclomática</td><td>Unit test, integration test, HIL, exploratory testing</td></tr>
<tr><td>Cuándo se puede aplicar</td><td>Desde que existe el código (o incluso antes: revisión de requisitos/diseño)</td><td>Solo cuando hay un binario/sistema ejecutable</td></tr>
<tr><td>Encuentra</td><td>Violaciones de estándar, code smells, complejidad excesiva, algunos bugs obvios (variable no usada)</td><td>Bugs de comportamiento en runtime, timing, condiciones de carrera</td></tr>
</table>
<h4>Estrategias de selección para Regression Testing</h4>
<table class="kv-table">
<tr><th>Estrategia</th><th>Cómo funciona</th><th>Trade-off</th></tr>
<tr><td>Full Regression</td><td>Ejecutar TODA la suite de tests existente</td><td>Máxima confianza, pero lento y costoso — no escala para CI en cada commit</td></tr>
<tr><td>Risk-Based Selection</td><td>Priorizar tests de las áreas de mayor riesgo/impacto (código crítico de seguridad, módulos con más bugs históricos)</td><td>Buen balance, pero requiere mantener y actualizar el modelo de riesgo</td></tr>
<tr><td>Test Impact Analysis (TIA)</td><td>Analizar qué archivos cambiaron y ejecutar solo los tests que cubren ese código (vía mapa de cobertura)</td><td>Muy rápido, pero requiere tooling que mantenga el mapa código↔test actualizado</td></tr>
<tr><td>Smoke Subset</td><td>Un subconjunto pequeño y rápido que cubre lo más crítico, para feedback inmediato</td><td>Rápido, pero da falsa confianza si se usa como único gate antes de release</td></tr>
</table>
<p><b>Estrategia típica en CI/CD automotriz:</b> Smoke subset en cada commit (minutos) → Risk-based/TIA en cada Pull Request (10-30 min) → Full regression nocturna o antes de cada release candidate (horas, incluye HIL).</p>
  </div>

  <div id="tty-5" class="tab-panel">
<table class="kv-table">
<tr><th>Error</th><th>Consecuencia</th><th>Corrección</th></tr>
<tr><td>Tratar EMC/Environmental como "problema de hardware, no de software"</td><td>El firmware no maneja correctamente los datos corruptos que sí ocurren bajo interferencia real</td><td>El software debe incluir plausibility checks y manejo de fallos como parte del diseño, validado con fault injection testing</td></tr>
<tr><td>Ejecutar solo Full Regression, nunca subconjuntos rápidos</td><td>El feedback de cada commit tarda horas — los desarrolladores dejan de correr tests localmente</td><td>Capas de regresión: smoke rápido en cada push, full regression en cadencia programada</td></tr>
<tr><td>No distinguir Load de Stress test</td><td>Se "valida performance" solo bajo carga normal, sin saber cómo falla el sistema bajo condiciones extremas (crítico en eventos como un recall masivo de actualizaciones OTA)</td><td>Incluir siempre un Stress test que busque deliberadamente el punto de quiebre</td></tr>
</table>
<div class="practice-card"><div class="practice-title">Diseña el manejo de fallos ANTES del fault injection test</div><p>El fault injection test debe ser una verificación de un mecanismo de seguridad ya diseñado (plausibility checks, timeouts, redundancia), no una forma de "descubrir" qué falta.</p></div>
<div class="practice-card"><div class="practice-title">Automatiza la selección de tests con TIA cuando el proyecto crezca</div><p>Cuando la suite completa supera ~30-40 min, invertir en Test Impact Analysis paga dividendos en velocidad de feedback para todo el equipo.</p></div>
  </div>

  <div id="tty-6" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Cuál es la diferencia entre Load Test y Stress Test?<span class="q-arr">▶</span></div><div class="quiz-a">Load Test valida el comportamiento bajo la carga ESPERADA (normal o pico previsto); Stress Test busca deliberadamente sobrepasar esa carga hasta encontrar el punto de falla y verificar cómo se degrada el sistema.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿EMC testing es responsabilidad exclusiva del equipo de hardware?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No.</b> El firmware debe diseñarse para tolerar datos corruptos/glitches que la interferencia electromagnética puede inducir en las señales — el software necesita sus propios mecanismos de detección (checksums, plausibility checks, timeouts) validados junto con las pruebas EMC de hardware.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Qué diferencia hay entre fail-safe y fail-operational?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Fail-safe</b> apaga la función afectada y notifica al usuario (ej. ACC se desactiva y avisa al conductor). <b>Fail-operational</b> mantiene la función con capacidad reducida usando redundancia (ej. dirección asistida sigue funcionando con un canal de respaldo tras perder uno de dos sensores).</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>¿Test Impact Analysis reemplaza al Full Regression?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No, lo complementa.</b> TIA da feedback rápido en cada cambio, pero no captura interacciones indirectas no mapeadas en el análisis de cobertura; el Full Regression sigue siendo necesario periódicamente (release candidates) como red de seguridad completa.</div></div>
</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre tipos de prueba...</p>
</div>`,

'tdd': `
<div class="tab-group-tdc">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'tdc-1','tdc')">Ciclo Red-Green-Refactor</button>
    <button class="tab-btn" onclick="switchTab(this,'tdc-2','tdc')">TDD vs BDD (Gherkin)</button>
    <button class="tab-btn" onclick="switchTab(this,'tdc-3','tdc')">TDD en código embebido</button>
    <button class="tab-btn" onclick="switchTab(this,'tdc-4','tdc')">Ventajas, Desventajas & Mitos</button>
    <button class="tab-btn" onclick="switchTab(this,'tdc-5','tdc')">⚠️ Errores & ✅ Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'tdc-6','tdc')">Quiz</button>
  </div>

  <div id="tdc-1" class="tab-panel active">
<div class="concept-intro">TDD (Test-Driven Development) invierte el orden habitual: se escribe el test <b>antes</b> que el código de producción. El ciclo se repite en iteraciones muy cortas (minutos, no horas).</div>
<h4>Las 3 Leyes de TDD (Robert C. Martin — "Uncle Bob")</h4>
<p>1. No debes escribir código de producción hasta haber escrito un test unitario que falle.<br>2. No debes escribir más de un test unitario del necesario para fallar (y no compilar cuenta como fallar).<br>3. No debes escribir más código de producción del necesario para pasar el test que está fallando actualmente.</p>
<p>Estas leyes fuerzan ciclos de segundos a minutos — nunca escribir "de más" antes de tener un test que lo justifique.</p>
<div class="code-block"><div class="code-lang">Python — Ejemplo TDD completo</div><pre>
<span class="c-cm"># 1. RED: Escribir test que falla (la función no existe aún)</span>
<span class="c-kw">def</span> <span class="c-fn">test_parse_speed_signal</span>():
    frame = CANFrame(<span class="c-nb">0x200</span>, [<span class="c-nb">0x50</span>, <span class="c-nb">0x00</span>])
    <span class="c-kw">assert</span> parse_speed(frame) == <span class="c-nb">80.0</span>  <span class="c-cm"># 0x0050 = 80 km/h (scale=1)</span>
<span class="c-cm"># NameError: parse_speed not defined -> ROJO</span>

<span class="c-cm"># 2. GREEN: Código mínimo para pasar el test</span>
<span class="c-kw">def</span> <span class="c-fn">parse_speed</span>(frame):
    <span class="c-kw">return</span> (frame.data[<span class="c-nb">0</span>] | frame.data[<span class="c-nb">1</span>] &lt;&lt; <span class="c-nb">8</span>) * <span class="c-nb">1.0</span>
<span class="c-cm"># Test pasa -> VERDE</span>

<span class="c-cm"># 3. REFACTOR: Limpiar sin romper el test</span>
<span class="c-kw">def</span> <span class="c-fn">parse_speed</span>(frame, scale=<span class="c-nb">1.0</span>, offset=<span class="c-nb">0.0</span>):
    raw = int.from_bytes(frame.data[:<span class="c-nb">2</span>], byteorder=<span class="c-st">"little"</span>)
    <span class="c-kw">return</span> raw * scale + offset
<span class="c-cm"># Test sigue pasando -> VERDE</span></pre></div>
<h4>Por qué "Red" antes que "Green" — verificar el test mismo</h4>
<p>Ver el test fallar primero (Red) no es un paso opcional: confirma que el test realmente ejerce el código nuevo y que fallaría si el comportamiento estuviera roto. Un test que "nace en verde" (nunca se vio fallar) puede tener un bug en el propio test — un assert mal escrito que siempre pasa, por ejemplo.</p>
  </div>

  <div id="tdc-2" class="tab-panel">
<table class="kv-table">
<tr><th></th><th>TDD</th><th>BDD</th></tr>
<tr><td>Foco</td><td>Diseño técnico del código, desde la perspectiva del desarrollador</td><td>Comportamiento del sistema, desde la perspectiva del negocio/usuario</td></tr>
<tr><td>Lenguaje del test</td><td>Código (assertEquals, assertTrue...)</td><td>Lenguaje natural estructurado (Gherkin: Given/When/Then)</td></tr>
<tr><td>Quién puede escribir/leer</td><td>Principalmente desarrolladores</td><td>Desarrolladores, QA, Product Owner — colaborativo</td></tr>
<tr><td>Nivel típico</td><td>Unit test</td><td>Acceptance / integration test</td></tr>
<tr><td>Herramientas</td><td>unittest, pytest, JUnit</td><td>Cucumber, Behave (Python), SpecFlow</td></tr>
</table>
<div class="code-block"><div class="code-lang">Gherkin (BDD) + Python Behave — mismo escenario que TDD</div><pre>
<span class="c-cm"># archivo: features/velocidad.feature</span>
Feature: Cálculo de velocidad desde trama CAN

  Scenario: Trama válida con escala por defecto
    Given una trama CAN con ID 0x200 y bytes [0x50, 0x00]
    When se calcula la velocidad
    Then el resultado debe ser 80.0 km/h

<span class="c-cm"># archivo: features/steps/velocidad_steps.py</span>
<span class="c-kw">from</span> behave <span class="c-kw">import</span> given, when, then

<span class="c-dc">@given</span>(<span class="c-st">'una trama CAN con ID {id} y bytes {data}'</span>)
<span class="c-kw">def</span> <span class="c-fn">step_impl</span>(context, id, data):
    context.frame = CANFrame(int(id, <span class="c-nb">16</span>), eval(data))

<span class="c-dc">@when</span>(<span class="c-st">'se calcula la velocidad'</span>)
<span class="c-kw">def</span> <span class="c-fn">step_impl</span>(context):
    context.resultado = parse_speed(context.frame)

<span class="c-dc">@then</span>(<span class="c-st">'el resultado debe ser {esperado} km/h'</span>)
<span class="c-kw">def</span> <span class="c-fn">step_impl</span>(context, esperado):
    <span class="c-kw">assert</span> context.resultado == float(esperado)</pre></div>
<div class="concept-intro">BDD no reemplaza a TDD — son complementarios en distintos niveles: BDD documenta y verifica el comportamiento desde afuera (acceptance criteria, legibles por el PO), mientras que TDD guía el diseño interno del código, función por función.</div>
  </div>

  <div id="tdc-3" class="tab-panel">
<div class="concept-intro">Aplicar TDD en firmware es más difícil que en software de aplicación porque el código suele depender directamente de hardware (registros, buses, timers) que no existe o no es práctico usar en cada ciclo de test.</div>
<h4>La solución: Hardware Abstraction Layer (HAL) + Dependency Injection</h4>
<p>En vez de que la lógica de negocio llame directamente a funciones de bajo nivel (<code>HAL_CAN_Transmit(...)</code>), se define una interfaz abstracta que la lógica usa, y se inyecta una implementación real en producción o una <b>fake</b>/mock en los tests.</p>
<div class="code-block"><div class="code-lang">Python — Lógica desacoplada del hardware real vía interfaz</div><pre>
<span class="c-kw">class</span> <span class="c-fn">CANInterface</span>(ABC):
    <span class="c-cm"># Interfaz -- el HAL real la implementa en el target</span>
    <span class="c-dc">@abstractmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">send</span>(<span class="c-bi">self</span>, can_id, data): ...
    <span class="c-dc">@abstractmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">receive</span>(<span class="c-bi">self</span>) -&gt; CANFrame: ...

<span class="c-kw">class</span> <span class="c-fn">FakeCANInterface</span>(CANInterface):
    <span class="c-cm"># Fake usado SOLO en tests -- sin hardware real</span>
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(<span class="c-bi">self</span>):
        <span class="c-bi">self</span>.sent = []
        <span class="c-bi">self</span>.queue = []
    <span class="c-kw">def</span> <span class="c-fn">send</span>(<span class="c-bi">self</span>, can_id, data):
        <span class="c-bi">self</span>.sent.append((can_id, data))
    <span class="c-kw">def</span> <span class="c-fn">receive</span>(<span class="c-bi">self</span>):
        <span class="c-kw">return</span> <span class="c-bi">self</span>.queue.pop(<span class="c-nb">0</span>)

<span class="c-cm"># TEST -- sin ningún CAN transceiver físico conectado</span>
<span class="c-kw">def</span> <span class="c-fn">test_alerta_sobretemperatura_envia_apagado</span>():
    fake_can = FakeCANInterface()
    controller = MotorController(fake_can)

    controller.on_overheat(<span class="c-nb">105</span>)  <span class="c-cm"># grados C</span>

    <span class="c-kw">assert</span> fake_can.sent == [(<span class="c-nb">0x300</span>, [<span class="c-nb">0x00</span>])]</pre></div>
<p>Esta técnica permite aplicar TDD a la <b>lógica de negocio</b> del firmware corriendo en la PC del desarrollador (mucho más rápido que flashear el target en cada ciclo), reservando SIL/HIL para verificar que el HAL real y el timing físico también se comportan correctamente — TDD y HIL no compiten, cubren capas distintas.</p>
  </div>

  <div id="tdc-4" class="tab-panel">
<table class="kv-table">
<tr><th>Ventaja</th><th>Por qué</th></tr>
<tr><td>Diseño más testeable por construcción</td><td>Si escribes el test primero, el código nace desacoplado — es difícil escribir código complicado de testear cuando el test se escribe antes</td></tr>
<tr><td>Red de seguridad para refactors</td><td>Con cobertura alta desde el inicio, refactorizar es seguro: cualquier regresión se detecta inmediatamente</td></tr>
<tr><td>Documentación viva</td><td>Los tests describen el comportamiento esperado con ejemplos ejecutables, más confiables que un comentario que puede desactualizarse</td></tr>
<tr><td>Detecta bugs en el momento en que se introducen</td><td>El ciclo de segundos/minutos aísla exactamente qué cambio rompió qué comportamiento</td></tr>
</table>
<table class="kv-table">
<tr><th>Desventaja / Costo</th><th>Contexto</th></tr>
<tr><td>Curva de aprendizaje real</td><td>Escribir buenos tests primero requiere práctica — al inicio es más lento que codificar directamente</td></tr>
<tr><td>No siempre aplica a exploración/prototipado</td><td>Cuando ni siquiera se sabe qué API tendrá el código (spike/prototipo), escribir el test primero puede ser contraproducente — se prototipa primero y se "TDD-ea" después al formalizar</td></tr>
<tr><td>Difícil en UI y en HW de bajo nivel puro</td><td>Verificar visualmente un layout o el timing exacto de un registro de hardware no siempre se presta bien al ciclo Red-Green-Refactor clásico</td></tr>
</table>
<h4>Mitos comunes</h4>
<p>• <b>"TDD implica 100% de cobertura":</b> Falso — TDD es una técnica de diseño, no una meta de cobertura; puede coexistir con código sin cobertura total (ej. bindings triviales).<br>• <b>"TDD es siempre más lento":</b> Es más lento al inicio de la feature, pero suele ser más rápido en el ciclo de vida completo por menos tiempo de debugging y regresiones.<br>• <b>"TDD reemplaza el code review o el testing manual":</b> No — sigue siendo necesario revisar diseño/arquitectura y hacer exploratory testing; TDD cubre principalmente el nivel unitario.</p>
  </div>

  <div id="tdc-5" class="tab-panel">
<table class="kv-table">
<tr><th>Error</th><th>Consecuencia</th><th>Corrección</th></tr>
<tr><td>Escribir el test DESPUÉS y llamarlo "TDD"</td><td>Se pierde el beneficio de diseño — el test tiende a ajustarse al código existente en vez de guiar su forma</td><td>Confirmar que el test fallaba (Red) ANTES de escribir el código que lo satisface</td></tr>
<tr><td>Escribir demasiado código en el paso Green</td><td>Rompe la disciplina del ciclo corto — se acumulan cambios sin verificar cada paso individualmente</td><td>Escribir el mínimo código posible para pasar, aunque parezca "tonto" (hardcodear un valor primero, generalizar después)</td></tr>
<tr><td>Saltarse el Refactor</td><td>El código funciona pero acumula deuda técnica — duplicación, nombres pobres</td><td>Tratar el Refactor como un paso obligatorio del ciclo, no opcional "si sobra tiempo"</td></tr>
</table>
<div class="practice-card"><div class="practice-title">Empieza por el caso más simple posible</div><p>El primer test de una nueva función suele ser el caso trivial (input vacío, cero) — esto evita over-engineering prematuro y deja que el diseño emerja incrementalmente.</p></div>
<div class="practice-card"><div class="practice-title">Un test roto a la vez</div><p>Si tienes varios tests en rojo simultáneamente, es difícil saber cuál arreglar primero o si un fix rompió otra cosa — mantén la disciplina de un ciclo completo (Red→Green→Refactor) antes de escribir el siguiente test.</p></div>
  </div>

  <div id="tdc-6" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Cuál de las 3 leyes de TDD prohíbe escribir un test que cubra dos comportamientos a la vez?<span class="q-arr">▶</span></div><div class="quiz-a">La <b>2da ley</b>: no escribir más de un test unitario del necesario para fallar — fuerza tests pequeños, uno por comportamiento, en vez de un test grande que intenta cubrir varios casos de una vez.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿Es válido escribir el código de producción primero y el test después, siempre que ambos terminen en el mismo commit?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No es TDD</b>, aunque termine en el mismo commit — la esencia de TDD es que el test GUÍE el diseño (viéndolo fallar primero); escribir el test después solo lo convierte en un test de regresión post-hoc, útil pero sin el beneficio de diseño de TDD.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>¿BDD con Gherkin sustituye los unit tests de TDD?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No.</b> BDD opera típicamente a nivel de aceptación/integración con lenguaje natural; TDD sigue siendo necesario para diseñar y verificar la lógica interna función por función. Se usan en conjunto, en capas distintas de la pirámide de testing.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>¿Cómo se aplica TDD a código que depende de un timer de hardware real?<span class="q-arr">▶</span></div><div class="quiz-a">Se abstrae el timer detrás de una interfaz (HAL) y se inyecta una implementación Fake controlable en el test (que "avanza el tiempo" manualmente), permitiendo probar la lógica de timeout sin esperar el tiempo real ni depender del hardware.</div></div>
</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre TDD...</p>
</div>`,

};  // fin METOD_RICH
