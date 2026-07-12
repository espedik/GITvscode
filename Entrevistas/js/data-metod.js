
// ══════════════════════════════════════════════════════════════════
//  METOD_RICH — Metodologías de desarrollo
// ══════════════════════════════════════════════════════════════════
const METOD_RICH = {

'scrum': `
<div class="plan-card">
  <div class="plan-card-title">🔄 SCRUM</div>
  <div class="plan-block">
    <div class="plan-time">Roles, eventos, artefactos</div>
    <div class="plan-content">
      <h4>Los 3 pilares de Scrum</h4>
      <p><b>Roles:</b><br>
      • <b>Product Owner (PO):</b> Gestiona el Product Backlog. Prioriza las historias de usuario según valor de negocio. VOZ del cliente.<br>
      • <b>Scrum Master:</b> Facilita el proceso Scrum. Elimina impedimentos. NO es el jefe del equipo.<br>
      • <b>Development Team:</b> 3-9 personas cross-functional. Auto-organizado. Responsable de entregar el Increment.<br><br>
      <b>Eventos:</b><br>
      • <b>Sprint Planning:</b> ¿Qué hacemos en este Sprint? El equipo selecciona items del Product Backlog y crea el Sprint Backlog.<br>
      • <b>Daily Scrum (15 min):</b> ¿Qué hice ayer? ¿Qué haré hoy? ¿Hay impedimentos?<br>
      • <b>Sprint Review:</b> Demo del Increment al PO y stakeholders. Feedback.<br>
      • <b>Sprint Retrospective:</b> ¿Qué salió bien? ¿Qué mejorar? ¿Acciones concretas?<br><br>
      <b>Artefactos:</b><br>
      • <b>Product Backlog:</b> Lista priorizada de todo el trabajo pendiente (User Stories, Epics, Bugs).<br>
      • <b>Sprint Backlog:</b> Items seleccionados para el Sprint + plan de cómo hacerlo.<br>
      • <b>Increment:</b> Suma de todos los items del Sprint Backlog completados. Debe ser "Done".</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Scrum...</p>
</div>`,

'agile': `
<div class="plan-card">
  <div class="plan-card-title">🌀 Agile — Principios del Manifiesto</div>
  <div class="plan-block">
    <div class="plan-time">4 valores del Manifiesto Ágil</div>
    <div class="plan-content">
      <h4>Publicado en 2001 por 17 desarrolladores</h4>
      <p>Valoramos <b>más</b> los ítems de la izquierda, pero no ignoramos los de la derecha:<br>
      1. <b>Individuos e interacciones</b> sobre procesos y herramientas.<br>
      2. <b>Software funcionando</b> sobre documentación extensiva.<br>
      3. <b>Colaboración con el cliente</b> sobre negociación contractual.<br>
      4. <b>Responder al cambio</b> sobre seguir un plan.<br><br>
      <b>12 Principios clave:</b> Entregar software frecuentemente (semanas, no meses). El cambio en los requisitos es bienvenido. Equipos auto-organizados. Reflexión regular. Software funcionando = medida de progreso. Individuos motivados. Simplicidad. Comunicación cara a cara.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Kanban vs Scrum</div>
    <div class="plan-content">
      <h4>Cuándo usar cada uno</h4>
      <p><b>Scrum:</b> Sprints fijos, roles definidos, retrospectivas. Bueno cuando el trabajo se puede descomponer en iteraciones.<br>
      <b>Kanban:</b> Flujo continuo, sin sprints. Limita el WIP (Work in Progress). Bueno para mantenimiento, soporte y equipos de operaciones donde el trabajo llega continuamente.<br>
      <b>SAFe (Scaled Agile Framework):</b> Para proyectos grandes (100+ personas). Agrega PIs (Program Increments), ART (Agile Release Train). Muy usado en automoción y aero.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Agile...</p>
</div>`,

'vmodel': `
<div class="plan-card">
  <div class="plan-card-title">📐 V-Model — Desarrollo y verificación</div>
  <div class="plan-block">
    <div class="plan-time">Estructura del V-Model</div>
    <div class="plan-content">
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
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">En automoción</div>
    <div class="plan-content">
      <h4>V-Model + ASPICE + ISO 26262</h4>
      <p>En el desarrollo automotriz, el V-Model es el framework estándar (ASPICE lo define formalmente). Las pruebas de la derecha se corresponden con:<br>
      • <b>MIL:</b> verifica el modelo Simulink (corresponde al diseño de control).<br>
      • <b>SIL:</b> verifica el código generado (corresponde a SW Detailed Design).<br>
      • <b>HIL:</b> verifica la ECU completa en entorno simulado (corresponde a SW Integration).<br>
      • <b>Vehicle test:</b> verifica el sistema completo en el auto real (corresponde a System Requirements).</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el V-Model...</p>
</div>`,

'sw-testing-concepts': `
<div class="plan-card">
  <div class="plan-card-title">🧪 SW Testing Concepts</div>
  <div class="plan-block">
    <div class="plan-time">Black Box vs White Box</div>
    <div class="plan-content">
      <h4>Enfoques de testing</h4>
      <p><b>Black Box Testing:</b> Se prueba el comportamiento externo (entradas/salidas) sin conocer la implementación interna. El tester no ve el código. Técnicas: Equivalence Partitioning, Boundary Value Analysis, Decision Table.<br>
      <b>White Box Testing:</b> Se prueba la lógica interna del código. El tester ve el código. Técnicas: Statement coverage, Branch coverage, MC/DC. Más cercano a unit testing.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Tipos de prueba</div>
    <div class="plan-content">
      <h4>Smoke, Regression, Sanity, Exploratory</h4>
      <p><b>Smoke Test:</b> Prueba rápida de las funciones principales para verificar que el build no está roto. "¿Prende el motor? ¿Anda?"<br>
      <b>Regression Test:</b> Verifica que los cambios nuevos no rompieron funcionalidad existente. Automatizable. El más importante para CI/CD.<br>
      <b>Sanity Test:</b> Verificación rápida y específica de que un bug fue corregido o una feature funciona, sin probar todo.<br>
      <b>Exploratory Testing:</b> Sin scripts predefinidos. El tester explora libremente buscando comportamientos inesperados. Complementa las pruebas formales.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre conceptos de testing...</p>
</div>`,

'test-levels': `
<div class="plan-card">
  <div class="plan-card-title">🎚️ Niveles de prueba — Pirámide</div>
  <div class="plan-block">
    <div class="plan-time">La pirámide de testing</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Pirámide de Testing</div><pre>
              /\
             /  \
            / E2E\    ← Pocas pruebas, muy lentas, muy caras
           /──────\      (pruebas de sistema completo, UI)
          /Integr. \  ← Moderadas: prueban la conexión entre módulos
         /──────────\
        / Unit Tests \ ← Muchas, rápidas, baratas
       /______________\   (la base de la pirámide)

Unit → Integration → System → Acceptance (UAT)</pre></div>
      <p><b>Unit Test:</b> Prueba una sola función/clase en aislamiento. Muy rápidas (ms). No dependen de BD ni red.<br>
      <b>Integration Test:</b> Prueba cómo interactúan varios módulos. Más lentas. Pueden usar BD real.<br>
      <b>System Test:</b> Prueba el sistema completo como caja negra. Lento. En automoción: HIL.<br>
      <b>Acceptance Test (UAT):</b> El cliente verifica que cumple los requisitos de negocio.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre niveles de prueba...</p>
</div>`,

'test-types': `
<div class="plan-card">
  <div class="plan-card-title">🗂️ Tipos de prueba</div>
  <div class="plan-block">
    <div class="plan-time">Funcional vs No funcional</div>
    <div class="plan-content">
      <table class="ref-table">
        <thead><tr><th>Tipo</th><th>¿Qué verifica?</th><th>Herramienta típica</th></tr></thead>
        <tbody>
          <tr><td>Funcional</td><td>¿El sistema hace lo que debe?</td><td>pytest, unittest, CANoe</td></tr>
          <tr><td>Performance</td><td>¿Cuán rápido? ¿Cuánto carga aguanta?</td><td>JMeter, Locust, k6</td></tr>
          <tr><td>Security</td><td>¿Es vulnerable a ataques?</td><td>OWASP ZAP, Burp Suite, Nessus</td></tr>
          <tr><td>Usability</td><td>¿Es fácil de usar?</td><td>User sessions, A/B testing</td></tr>
          <tr><td>Reliability</td><td>¿Funciona sin fallar durante horas?</td><td>Soak testing, chaos engineering</td></tr>
          <tr><td>Compatibility</td><td>¿Funciona en distintos OS/HW/versiones?</td><td>Matrix de plataformas en CI</td></tr>
          <tr><td>Static (no ejecuta)</td><td>¿El código cumple estándares?</td><td>Flake8, MISRA, SonarQube</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre tipos de prueba...</p>
</div>`,

'tdd': `
<div class="plan-card">
  <div class="plan-card-title">🔴 TDD — Test Driven Development</div>
  <div class="plan-block">
    <div class="plan-time">El ciclo Red-Green-Refactor</div>
    <div class="plan-content">
      <h4>Escribir el test ANTES que el código</h4>
      <div class="code-block"><div class="code-lang">Python — Ejemplo TDD</div><pre>
<span class="c-cm"># 1. RED: Escribir test que falla (la función no existe aún)</span>
<span class="c-kw">def</span> <span class="c-fn">test_parse_speed_signal</span>():
    frame = CANFrame(<span class="c-nb">0x200</span>, [<span class="c-nb">0x50</span>, <span class="c-nb">0x00</span>])
    assert parse_speed(frame) == <span class="c-nb">80.0</span>  <span class="c-cm"># 0x0050 = 80 km/h (scale=1)</span>
<span class="c-cm"># NameError: parse_speed not defined → ROJO ✗</span>

<span class="c-cm"># 2. GREEN: Código mínimo para pasar el test</span>
<span class="c-kw">def</span> <span class="c-fn">parse_speed</span>(frame):
    <span class="c-kw">return</span> (frame.data[<span class="c-nb">0</span>] | frame.data[<span class="c-nb">1</span>] << <span class="c-nb">8</span>) * <span class="c-nb">1.0</span>
<span class="c-cm"># Test pasa → VERDE ✓</span>

<span class="c-cm"># 3. REFACTOR: Limpiar sin romper el test</span>
<span class="c-kw">def</span> <span class="c-fn">parse_speed</span>(frame, scale=<span class="c-nb">1.0</span>, offset=<span class="c-nb">0.0</span>):
    raw = int.from_bytes(frame.data[:2], byteorder=<span class="c-st">"little"</span>)
    <span class="c-kw">return</span> raw * scale + offset
<span class="c-cm"># Test sigue pasando → VERDE ✓</span></pre></div>
      <p><b>Ventaja principal:</b> El diseño emerge de los tests. El código es naturalmente testeable porque se diseñó para ser testeable. Detecta bugs en el momento en que se introduce el código.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre TDD...</p>
</div>`,

};  // fin METOD_RICH
