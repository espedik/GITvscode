
// ══════════════════════════════════════════════════════════════════
//  ISTQB_RICH — ISTQB CTFL Syllabus
// ══════════════════════════════════════════════════════════════════
const ISTQB_RICH = {

'istqb-ch1': `
<div class="plan-card">
  <div class="plan-card-title">📖 Ch1 — Fundamentos del Testing</div>
  <div class="plan-block">
    <div class="plan-time">Los 7 principios</div>
    <div class="plan-content">
      <h4>ISTQB CTFL v4.0 — Principios del testing</h4>
      <table class="ref-table">
        <thead><tr><th>#</th><th>Principio</th><th>Significado clave</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Testing shows presence of defects</td><td>Testing puede mostrar que hay defectos, pero no puede probar que no hay ninguno</td></tr>
          <tr><td>2</td><td>Exhaustive testing is impossible</td><td>Es imposible probar todo. Se usa análisis de riesgo para priorizar</td></tr>
          <tr><td>3</td><td>Early testing saves time and money</td><td>Detectar defectos temprano (en requisitos) cuesta mucho menos que en producción</td></tr>
          <tr><td>4</td><td>Defects cluster together</td><td>Los defectos se concentran en pocos módulos (Ley de Pareto: 80% defectos en 20% del código)</td></tr>
          <tr><td>5</td><td>Tests wear out (Pesticide Paradox)</td><td>Los mismos tests repetidos dejan de encontrar bugs nuevos. Hay que revisarlos y añadir nuevos</td></tr>
          <tr><td>6</td><td>Testing is context-dependent</td><td>Testing de un marcapasos requiere mucho más rigor que testing de una app móvil</td></tr>
          <tr><td>7</td><td>Absence-of-errors fallacy</td><td>Que no haya defectos no significa que el sistema cumple las necesidades del usuario</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error, Defect, Failure</div>
    <div class="plan-content">
      <h4>Diferencias importantes</h4>
      <p><b>Error (mistake):</b> Acción humana que produce un resultado incorrecto. El programador se equivocó al escribir la condición.<br>
      <b>Defect (bug/fault):</b> El error se materializa en el código/documento como un defecto. Es el <code>if x &gt; 0</code> cuando debería ser <code>if x &gt;= 0</code>.<br>
      <b>Failure:</b> El sistema falla en producción cuando ese código defectuoso se ejecuta. El usuario ve el comportamiento incorrecto.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el Capítulo 1 de ISTQB...</p>
</div>`,

'istqb-ch2': `
<div class="plan-card">
  <div class="plan-card-title">📖 Ch2 — Testing en el SDLC</div>
  <div class="plan-block">
    <div class="plan-time">Modelos de SDLC</div>
    <div class="plan-content">
      <h4>Secuenciales vs Iterativos</h4>
      <p><b>Secuenciales (Waterfall, V-Model):</b> Una fase debe completarse antes de iniciar la siguiente. El testing se planifica en paralelo con el desarrollo (V-Model) pero se ejecuta al final. Más predecible pero menos flexible al cambio.<br>
      <b>Iterativos/Incrementales (Scrum, Kanban):</b> El producto se entrega en incrementos frecuentes. El testing se integra dentro de cada sprint. Más adaptable al cambio.<br>
      <b>DevOps:</b> Testing completamente integrado en el pipeline CI/CD. Infraestructura como código, testing continuo.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Shift-Left Testing</div>
    <div class="plan-content">
      <h4>Probar antes, no al final</h4>
      <p><b>Shift-Left:</b> Mover las actividades de testing hacia la izquierda del SDLC (más temprano). En lugar de esperar al código para empezar a probar, los testers participan desde los requisitos:<br>
      • Revisar requisitos (¿son testeables? ¿ambiguos?)<br>
      • Técnicas: TDD, BDD, ATDD<br>
      • Análisis estático del código desde el inicio<br>
      <b>Testing en Agile:</b> Tester es parte del equipo de Sprint. Criterios de aceptación definidos antes de codificar. Definition of Done incluye "tests automatizados pasando".</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el Capítulo 2 de ISTQB...</p>
</div>`,

'istqb-ch3': `
<div class="plan-card">
  <div class="plan-card-title">📖 Ch3 — Pruebas Estáticas</div>
  <div class="plan-block">
    <div class="plan-time">Testing sin ejecutar</div>
    <div class="plan-content">
      <h4>Reviews y análisis estático</h4>
      <p><b>Pruebas estáticas:</b> Examinar artefactos (código, requisitos, diseño) sin ejecutarlos. Se detectan defectos antes de que se conviertan en failures.<br><br>
      <b>Tipos de Review (de menos a más formal):</b><br>
      • <b>Informal:</b> El autor pide a un colega que revise. Sin proceso formal. Rápido y útil.<br>
      • <b>Walkthrough:</b> El autor guía al equipo por el artefacto. Objetivo: encontrar defectos Y aprendizaje. El autor toma notas.<br>
      • <b>Technical Review:</b> Un grupo de técnicos revisa sin el autor. Más formal. Con checklist.<br>
      • <b>Inspection:</b> La más formal. Roles definidos (moderator, reviewer, scribe). Métricas (defect density). Entry/Exit criteria.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Análisis estático</div>
    <div class="plan-content">
      <h4>Herramientas automáticas de código</h4>
      <p>El análisis estático examina el código con herramientas automáticas sin ejecutarlo:<br>
      • <b>Linting:</b> Flake8, Pylint (Python). PC-lint (C/C++).<br>
      • <b>Complejidad ciclomática:</b> Número de caminos independientes en el código. Más complejidad = más tests necesarios.<br>
      • <b>MISRA compliance:</b> Verificación automática de reglas MISRA C.<br>
      • <b>SonarQube:</b> Dashboard de calidad de código: bugs, code smells, security vulnerabilities, cobertura. Integrable con CI/CD.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el Capítulo 3 de ISTQB...</p>
</div>`,

'istqb-ch4': `
<div class="plan-card">
  <div class="plan-card-title">📖 Ch4 — Técnicas de Prueba</div>
  <div class="plan-block">
    <div class="plan-time">Black-Box Techniques</div>
    <div class="plan-content">
      <h4>Equivalence Partitioning y Boundary Value Analysis</h4>
      <p><b>Equivalence Partitioning (EP):</b> Divide las entradas en clases equivalentes donde el sistema se comporta igual. Se necesita solo un test por clase.<br>
      Ejemplo — Campo "velocidad" (0-250 km/h válido):<br>
      • Clase inválida negativa: (-∞, -1)<br>
      • Clase válida: [0, 250]<br>
      • Clase inválida positiva: (251, +∞)<br><br>
      <b>Boundary Value Analysis (BVA):</b> Los defectos se concentran en los límites. Probar: valor mínimo, mínimo-1, máximo, máximo+1.<br>
      Para velocidad [0, 250]: probar -1, 0, 1, 249, 250, 251.<br><br>
      <b>Decision Table:</b> Para lógica con múltiples condiciones combinadas. Tabla de verdad para todas las combinaciones.<br><br>
      <b>State Transition:</b> Para sistemas con estados. Probar transiciones válidas e inválidas.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">White-Box Techniques</div>
    <div class="plan-content">
      <h4>Statement y Branch Coverage</h4>
      <p><b>Statement Coverage:</b> % de líneas ejecutadas por los tests. Meta mínima: 80-90%.<br>
      <b>Branch Coverage:</b> % de ramas (if/else) tomadas. Más exigente que statement. Requiere tests para ramas true Y false.<br>
      <b>MC/DC (Modified Condition/Decision Coverage):</b> Para código ASIL-D y software de aviación. Cada condición independiente debe afectar el resultado de la decisión independientemente. Muy riguroso.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el Capítulo 4 de ISTQB...</p>
</div>`,

'istqb-ch4-collab': `
<div class="plan-card">
  <div class="plan-card-title">🤝 Ch4 — Collaborative Testing (BDD/ATDD)</div>
  <div class="plan-block">
    <div class="plan-time">Three Amigos y BDD</div>
    <div class="plan-content">
      <h4>Definir los criterios de aceptación juntos</h4>
      <p><b>Three Amigos:</b> BA (o PO) + Developer + Tester se reúnen ANTES de codificar para definir los criterios de aceptación de una User Story. Cada uno aporta perspectiva diferente: el PO sabe qué, el dev sabe cómo, el tester sabe qué puede salir mal.<br><br>
      <b>ATDD (Acceptance Test Driven Development):</b> Los criterios de aceptación se escriben como tests antes de codificar. El desarrollo se considera completo cuando los tests de aceptación pasan.<br><br>
      <b>BDD (Behavior Driven Development):</b> Los criterios de aceptación se escriben en lenguaje natural estructurado (Gherkin), legible por todos (no solo devs).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Gherkin y herramientas</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Gherkin — Feature file</div><pre>
Feature: Detección de velocidad excesiva

  Scenario: Alerta cuando velocidad supera límite
    Given el límite de velocidad es 120 km/h
    And el vehículo está en modo conducción
    When la velocidad detectada es 135 km/h
    Then el sistema debe activar la alerta sonora
    And el tablero debe mostrar "SPEED LIMIT EXCEEDED"

  Scenario: Sin alerta dentro del límite
    Given el límite de velocidad es 120 km/h
    When la velocidad detectada es 100 km/h
    Then no debe haber ninguna alerta</pre></div>
      <p><b>Herramientas:</b> Cucumber (Java/JS), Behave (Python), SpecFlow (.NET). Convierten el Gherkin en tests ejecutables.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre BDD y ATDD...</p>
</div>`,

'istqb-ch5': `
<div class="plan-card">
  <div class="plan-card-title">📖 Ch5 — Gestión de Pruebas</div>
  <div class="plan-block">
    <div class="plan-time">Test Planning</div>
    <div class="plan-content">
      <h4>Planificación y estrategia de testing</h4>
      <p><b>Test Plan:</b> Documento que define el alcance, enfoque, recursos y cronograma para una actividad de testing. Contenido: objetivo del testing, elementos bajo prueba, criterios de entrada y salida, cronograma, riesgos.<br><br>
      <b>Entry criteria:</b> Condiciones que deben cumplirse antes de iniciar el testing. Ej: ambiente de prueba disponible, smoke test pasado, datos de prueba preparados.<br>
      <b>Exit criteria (DoD):</b> Condiciones para considerar que el testing está completo. Ej: cobertura &gt;80%, 0 defectos críticos abiertos, todos los test cases ejecutados.<br><br>
      <b>Risk-Based Testing:</b> Priorizar los tests según el riesgo (probabilidad de fallo × impacto). Los módulos con mayor riesgo se prueban más exhaustivamente y antes.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Métricas</div>
    <div class="plan-content">
      <h4>KPIs de testing</h4>
      <p>• <b>Test coverage:</b> % de requisitos cubiertos por tests.<br>
      • <b>Defect density:</b> Defectos / KLOC (miles de líneas de código).<br>
      • <b>Defect detection efficiency (DDE):</b> % defectos encontrados en testing vs producción.<br>
      • <b>Pass rate:</b> % de tests que pasan en cada ciclo.<br>
      • <b>Flaky test rate:</b> % de tests que fallan intermitentemente sin cambio de código.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre gestión de pruebas...</p>
</div>`,

'istqb-ch6': `
<div class="plan-card">
  <div class="plan-card-title">📖 Ch6 — Herramientas de Testing</div>
  <div class="plan-block">
    <div class="plan-time">Categorías de herramientas</div>
    <div class="plan-content">
      <table class="ref-table">
        <thead><tr><th>Categoría</th><th>Herramientas</th><th>Uso</th></tr></thead>
        <tbody>
          <tr><td>Test Management</td><td>Jira + Xray, TestRail, qTest, Zephyr</td><td>Gestión de casos de prueba, ejecución, reportes</td></tr>
          <tr><td>SAST (Análisis estático)</td><td>SonarQube, Coverity, Checkmarx, MISRA tools</td><td>Calidad y seguridad del código sin ejecutar</td></tr>
          <tr><td>Unit Testing</td><td>pytest, unittest, JUnit, Google Test</td><td>Pruebas de unidades de código</td></tr>
          <tr><td>API Testing</td><td>Postman, REST Assured, requests+pytest</td><td>Pruebas de APIs REST/SOAP</td></tr>
          <tr><td>Performance</td><td>JMeter, Locust, k6, Gatling</td><td>Carga, estrés, soak testing</td></tr>
          <tr><td>CI/CD</td><td>Jenkins, GitHub Actions, GitLab CI, TeamCity</td><td>Automatización del pipeline</td></tr>
          <tr><td>Test Data</td><td>Faker, Factory Boy, Mockaroo</td><td>Generación de datos de prueba</td></tr>
          <tr><td>Cobertura</td><td>coverage.py, pytest-cov, JaCoCo</td><td>Medir cobertura de código</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre herramientas de testing...</p>
</div>`,

};  // fin ISTQB_RICH
