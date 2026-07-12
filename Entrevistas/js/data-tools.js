
// ══════════════════════════════════════════════════════════════════
//  TOOLS_RICH — Herramientas de desarrollo y prueba
// ══════════════════════════════════════════════════════════════════
const TOOLS_RICH = {

'canoe': `
<div class="plan-card">
  <div class="plan-card-title">🖥️ CANoe — Vector Informatik</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es CANoe?</div>
    <div class="plan-content">
      <h4>Herramienta de simulación y análisis de redes vehiculares</h4>
      <p>CANoe es la herramienta estrella de Vector Informatik para el desarrollo y prueba de ECUs automotrices. Combina en una sola plataforma:<br>
      • <b>Simulación:</b> Simula nodos CAN/LIN/Ethernet/FlexRay que no están físicamente disponibles. Ideal para probar una ECU cuando las demás no están listas.<br>
      • <b>Análisis:</b> Captura y decodifica todas las tramas del bus en tiempo real. Con un archivo DBC muestra los signals decodificados.<br>
      • <b>Testing:</b> Ejecuta scripts CAPL y vTESTstudio para pruebas automatizadas de la red.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Paneles principales</div>
    <div class="plan-content">
      <h4>Trace Window, Write Window, Data Window</h4>
      <p><b>Trace Window:</b> Muestra todas las tramas del bus en tiempo real, con timestamp, canal, ID, DLC, datos y nombre del mensaje (si hay DBC). Filtros por ID, canal, dirección. Esencial para debugging.<br>
      <b>Write Window:</b> Log de mensajes de texto de scripts CAPL (como un console.log). Útil para debugging de scripts.<br>
      <b>Data Window:</b> Muestra el valor actual de cada signal definido en el DBC. Actualización en tiempo real.<br>
      <b>Graphics Window:</b> Grafica la evolución temporal de signals. Ideal para calibración y análisis de comportamiento.<br>
      <b>Panel:</b> HMI configurable para interactuar con la simulación (botones, switches, indicadores).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Hardware de conexión</div>
    <div class="plan-content">
      <h4>VN-series y Kvaser</h4>
      <p>Para conectar CANoe al bus real se necesita hardware USB/PCIe:<br>
      • <b>Vector VN1610/VN1630:</b> Interfaz CAN de 2-4 canales. El más común en desarrollo automotriz.<br>
      • <b>Vector VN5640:</b> Multi-bus (CAN+LIN+Ethernet) en una caja.<br>
      • <b>Kvaser:</b> Competidor más barato, compatible con CANalyzer pero no totalmente con CANoe.<br>
      CANoe también puede simular la red completamente en software (sin hardware) para testing puro.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tu experiencia con CANoe...</p>
</div>`,

'canalyzer': `
<div class="plan-card">
  <div class="plan-card-title">🔬 CANalyzer — Solo análisis, sin simulación</div>
  <div class="plan-block">
    <div class="plan-time">CANalyzer vs CANoe</div>
    <div class="plan-content">
      <h4>La versión "solo lectura"</h4>
      <p>CANalyzer es la versión reducida de CANoe: solo <b>analiza</b> la red, no puede simular nodos ni ejecutar scripts CAPL para enviar mensajes activos.<br>
      • <b>Precio:</b> Significativamente más barato que CANoe. Opción para equipos de QA que no desarrollan.<br>
      • <b>Capacidades:</b> Trace window completa, decodificación con DBC, filtros, estadísticas, grabación de logs.<br>
      • <b>Trigger:</b> Captura condicional (ej: captura 5s antes y después de recibir ID 0x105 con dato &gt; 0x80).<br>
      <b>Cuándo usar CANalyzer:</b> Auditorías de red, validación de timing, debugging de mensajes existentes sin necesidad de inyectar mensajes.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tu experiencia con CANalyzer...</p>
</div>`,

'capl-intro': `
<div class="plan-card">
  <div class="plan-card-title">📝 CAPL — Communication Access Programming Language</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es CAPL?</div>
    <div class="plan-content">
      <h4>El lenguaje de scripting de CANoe</h4>
      <p>CAPL es un lenguaje de programación desarrollado por Vector Informatik, basado en C, diseñado específicamente para programar comportamiento de nodos en redes vehiculares dentro de CANoe/CANalyzer.<br>
      Sus características:<br>
      • <b>Basado en C:</b> Sintaxis muy similar a C. Si sabes C, aprendes CAPL en horas.<br>
      • <b>Event-driven:</b> El programa responde a eventos (mensajes recibidos, timers, teclas). No hay un main() que corre secuencialmente.<br>
      • <b>Acceso directo a mensajes CAN:</b> Maneja objetos <code>message</code> nativamente.<br>
      • <b>Tipos de nodos:</b> Simulation Node (simula una ECU) o Test Node (verifica comportamiento del sistema).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Estructura básica</div>
    <div class="plan-content">
      <h4>El programa CAPL mínimo</h4>
      <div class="code-block"><div class="code-lang">CAPL — Estructura básica</div><pre>
<span class="c-cm">// Variables globales</span>
variables {
  message 0x100 ignMsg;   <span class="c-cm">// mensaje CAN con ID 0x100</span>
  msTimer heartbeatTimer;
  int ignitionState = 0;
}

<span class="c-cm">// Se ejecuta al iniciar la simulación</span>
on start {
  setTimer(heartbeatTimer, 100);  <span class="c-cm">// timer cada 100ms</span>
  write("Nodo iniciado");         <span class="c-cm">// escribe en Write Window</span>
}

<span class="c-cm">// Se ejecuta al detener la simulación</span>
on stopMeasurement {
  write("Simulación detenida");
}

<span class="c-cm">// Se ejecuta cuando llega mensaje CAN 0x105</span>
on message 0x105 {
  ignitionState = this.byte(0) & 0x03;  <span class="c-cm">// bits 1:0</span>
  write("Ignición: %d", ignitionState);
}

<span class="c-cm">// Se ejecuta cuando expira el timer</span>
on timer heartbeatTimer {
  ignMsg.byte(0) = 0x01;
  output(ignMsg);              <span class="c-cm">// enviar el mensaje al bus</span>
  setTimer(heartbeatTimer, 100);  <span class="c-cm">// recargar timer</span>
}</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tu código CAPL de referencia...</p>
</div>`,

'capl-scripting': `
<div class="plan-card">
  <div class="plan-card-title">⚡ CAPL — Scripts avanzados y eventos</div>
  <div class="plan-block">
    <div class="plan-time">Eventos principales</div>
    <div class="plan-content">
      <h4>Handlers de eventos en CAPL</h4>
      <div class="code-block"><div class="code-lang">CAPL — Eventos avanzados</div><pre>
<span class="c-cm">// Timer milisegundos vs ciclos</span>
msTimer t1;          <span class="c-cm">// Timer en milisegundos</span>
timer t2;            <span class="c-cm">// Timer en segundos</span>

<span class="c-cm">// Evento de tecla (útil para panel interactivo)</span>
on key 's' {
  write("Tecla S presionada");
  output(myMsg);
}

<span class="c-cm">// Evento de environment variable (variables de panel)</span>
on envVar EnvIgnitionSwitch {
  if (getValue(this) == 1)
    write("Ignition ON");
}

<span class="c-cm">// Test node: esperar mensaje con timeout</span>
testWaitForMessage(0x105, 500);   <span class="c-cm">// esperar hasta 500ms</span>
if (testGetLastMsgByte(0) == 0x01)
  testStepPass("Ignición ON recibida");
else
  testStepFail("Estado de ignición incorrecto");

<span class="c-cm">// Condición compleja en on message</span>
on message EngineRPM {
  if (this.RPM > 3000) {
    write("Alto RPM detectado: %.0f", this.RPM);
    testStepWarning("RPM sobre umbral");
  }
}</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Test vs Simulation</div>
    <div class="plan-content">
      <h4>Dos tipos de nodo CAPL</h4>
      <p><b>Simulation Node:</b> Simula una ECU completa. Envía mensajes periódicos, responde a otros mensajes, mantiene estado. Corre durante toda la medición.<br>
      <b>Test Node:</b> Ejecuta un test case. Tiene acceso a <code>testStepPass()</code>, <code>testStepFail()</code>, <code>testWaitForMessage()</code>. Genera un reporte de resultados. Se integra con vTESTstudio para testing sistemático.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus scripts CAPL de referencia...</p>
</div>`,

'simulink': `
<div class="plan-card">
  <div class="plan-card-title">📐 Simulink / Model-Based Design</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es MBD?</div>
    <div class="plan-content">
      <h4>Diseño de algoritmos de control en bloques</h4>
      <p>Model-Based Design (MBD) con Simulink (MathWorks) es el paradigma dominante en desarrollo de software automotriz de control. En lugar de escribir código C directamente, se diseña el algoritmo en un modelo de bloques visual, y luego se genera el código C automáticamente.<br>
      • <b>Simulink:</b> Bloques de señales continuas y discretas. Modela el algoritmo de control (PID, filtros, lógica).<br>
      • <b>Stateflow:</b> Máquinas de estado finitas. Modela lógica secuencial y modos de operación.<br>
      • <b>Embedded Coder / TargetLink:</b> Genera código C/C++ MISRA-compliant desde el modelo. El código generado va a la ECU real.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Flujo MIL → SIL → HIL</div>
    <div class="plan-content">
      <h4>El proceso de verificación en MBD</h4>
      <p><b>MIL (Model-in-the-Loop):</b> El modelo Simulink se ejecuta en PC contra una planta simulada. Valida la lógica de control. 100% en software.<br>
      <b>SIL (Software-in-the-Loop):</b> El código C generado (por Embedded Coder) se ejecuta en PC. Valida que el código generado es equivalente al modelo. Detecta errores de generación de código.<br>
      <b>PIL (Processor-in-the-Loop):</b> El código generado corre en el procesador target (ARM, PowerPC) pero sin hardware externo. Detecta diferencias de precisión numérica entre PC y target.<br>
      <b>HIL (Hardware-in-the-Loop):</b> La ECU real ejecuta el firmware completo. La planta (motor, transmisión) es simulada en tiempo real por dSPACE o NI. Máxima fidelidad.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tu experiencia con Simulink y MBD...</p>
</div>`,

'dspace': `
<div class="plan-card">
  <div class="plan-card-title">🤖 dSPACE — HIL Testing en tiempo real</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es dSPACE?</div>
    <div class="plan-content">
      <h4>La plataforma de HIL más usada en automoción</h4>
      <p>dSPACE GmbH (Alemania) fabrica hardware y software para pruebas Hardware-in-the-Loop (HIL). Es el estándar de facto en el sector automotriz (usado por BMW, Bosch, Continental, Magna, etc.).<br>
      <b>Componentes clave:</b><br>
      • <b>SCALEXIO / MicroAutoBox:</b> Hardware de tiempo real. Corre la simulación de la planta a frecuencias de 1-10 kHz. Tiene I/O para conectarse a la ECU real (voltajes, corrientes, CAN, ETH).<br>
      • <b>ControlDesk:</b> Software de HMI para monitorear y controlar la simulación. Muestra variables, plots, permite cambiar parámetros en tiempo real.<br>
      • <b>dSPACE VEOS:</b> Simulación SIL y PIL sin hardware dSPACE (virtual ECU).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Setup típico de HIL</div>
    <div class="plan-content">
      <h4>Conexión ECU real ↔ simulador dSPACE</h4>
      <div class="code-block"><div class="code-lang">Setup HIL — Conexión ECU ↔ dSPACE</div><pre>
┌─────────────────────────────────────────────────┐
│                  BANCO HIL                       │
│                                                  │
│  ┌──────────┐         ┌──────────────────┐       │
│  │   ECU    │◄──CAN──►│  dSPACE SCALEXIO │       │
│  │  (real)  │◄──I/O──►│  (planta simulada│       │
│  │          │◄──ETH──►│   en tiempo real)│       │
│  └──────────┘         │                  │       │
│       ▲               │  Simulink model: │       │
│  Voltaje,             │  - Motor model   │       │
│  señales,             │  - Sensor model  │       │
│  actuadores           │  - Road model    │       │
│                       └─────────┬────────┘       │
│                                 │ Ethernet        │
│                       ┌─────────▼────────┐       │
│                       │  ControlDesk PC  │       │
│                       │  (monitoreo HMI) │       │
│                       └──────────────────┘       │
└─────────────────────────────────────────────────┘</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tu experiencia con dSPACE HIL...</p>
</div>`,

'vector-tools': `
<div class="plan-card">
  <div class="plan-card-title">🗂️ Vector Tools — Suite completa</div>
  <div class="plan-block">
    <div class="plan-time">Herramientas Vector</div>
    <div class="plan-content">
      <h4>El ecosistema de Vector para desarrollo automotriz</h4>
      <table class="ref-table">
        <thead><tr><th>Herramienta</th><th>Función</th><th>Cuándo se usa</th></tr></thead>
        <tbody>
          <tr><td>CANdb++</td><td>Editor de bases de datos DBC/LDF/FIBEX</td><td>Definir mensajes, signals, valores simbólicos</td></tr>
          <tr><td>CANoe</td><td>Simulación + análisis + testing de redes</td><td>Desarrollo, integración, testing de sistema</td></tr>
          <tr><td>CANalyzer</td><td>Solo análisis de red (sin simulación)</td><td>Debugging, auditoría, QA sin desarrollo</td></tr>
          <tr><td>vTESTstudio</td><td>Framework de testing automatizado</td><td>Pruebas de regresión, CI/CD de ECUs</td></tr>
          <tr><td>CANoe.DiVa</td><td>Generación automática de tests UDS</td><td>Testing de diagnóstico (UDS compliance)</td></tr>
          <tr><td>Vector Cast</td><td>Unit testing de código C embebido</td><td>Testing unitario de SWCs AUTOSAR</td></tr>
          <tr><td>SysGen</td><td>Configuración del sistema AUTOSAR</td><td>Generación del stack BSW AUTOSAR Classic</td></tr>
          <tr><td>DaVinci Developer</td><td>Diseño de SWCs AUTOSAR</td><td>Modelado de arquitectura software</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tu experiencia con Vector tools...</p>
</div>`,

'sil-mil': `
<div class="plan-card">
  <div class="plan-card-title">🔬 HIL / SIL / MIL — Guía rápida</div>
  <div class="plan-block">
    <div class="plan-time">Los tres niveles</div>
    <div class="plan-content">
      <h4>MIL → SIL → HIL: de modelo a hardware</h4>
      <table class="ref-table">
        <thead><tr><th>Nivel</th><th>¿Qué corre?</th><th>¿Dónde?</th><th>Planta</th><th>Costo</th><th>Detecta</th></tr></thead>
        <tbody>
          <tr><td><b>MIL</b></td><td>Modelo Simulink</td><td>PC (Matlab)</td><td>Simulada</td><td>Bajo</td><td>Errores de lógica de control</td></tr>
          <tr><td><b>SIL</b></td><td>Código C generado</td><td>PC</td><td>Simulada</td><td>Bajo</td><td>Errores de generación de código, overflow</td></tr>
          <tr><td><b>PIL</b></td><td>Código en CPU target</td><td>MCU target</td><td>Simulada</td><td>Medio</td><td>Precisión numérica, timing en target</td></tr>
          <tr><td><b>HIL</b></td><td>Firmware completo en ECU real</td><td>ECU real + dSPACE</td><td>dSPACE (tiempo real)</td><td>Alto</td><td>HW timing, interrupciones, problemas de placa</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre HIL/SIL/MIL...</p>
</div>`,

'mcap': `
<div class="plan-card">
  <div class="plan-card-title">🤖 MCAP — Sensor Data Container para vehículos autónomos</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es MCAP?</div>
    <div class="plan-content">
      <h4>El formato open-source para datos de robots y AV</h4>
      <p>MCAP (creado por Foxglove, ahora estándar comunitario) es un formato de archivo de contenedor optimizado para datos de tiempo serie de robots y vehículos autónomos. Alternativa moderna a los ROS bags.<br>
      • Soporta múltiples <b>topics</b> con diferentes tipos de mensaje (LIDAR, cámara, IMU, GPS, CAN) en un solo archivo.<br>
      • <b>Indexed:</b> Permite acceso aleatorio eficiente sin leer todo el archivo. Vital para archivos de horas de duración.<br>
      • <b>Schemas:</b> Los tipos de mensaje están embebidos en el archivo (JSON Schema, Protobuf, ROS, flatbuffers). Self-describing.<br>
      • <b>Compresión:</b> Soporte para LZ4 y ZSTD a nivel de chunk.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">En contexto Wayve</div>
    <div class="plan-content">
      <h4>Uso en pipelines de datos de vehículos</h4>
      <p>En un sistema AV como Wayve, el vehículo de desarrollo graba datos de todos los sensores durante las pruebas en carretera. Estos datos se almacenan en archivos MCAP y luego se <b>offload</b> (descarga desde el vehículo) y se <b>ingest</b> (ingesta al sistema de almacenamiento/análisis).<br>
      <b>Validación de datos MCAP:</b><br>
      • ¿Los timestamps son consecutivos y sin gaps?<br>
      • ¿La frecuencia de muestreo de cada sensor es la esperada (ej: cámara a 30 Hz, LIDAR a 10 Hz)?<br>
      • ¿Los datos de los sensores son numéricamente válidos (sin NaN, rangos correctos)?<br>
      • ¿El archivo está completo (no truncado)?</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Herramientas</div>
    <div class="plan-content">
      <h4>Ecosistema MCAP</h4>
      <div class="code-block"><div class="code-lang">Python — Leer un archivo MCAP</div><pre>
<span class="c-kw">from</span> mcap.reader <span class="c-kw">import</span> make_reader
<span class="c-kw">from</span> pathlib <span class="c-kw">import</span> Path

<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"recording.mcap"</span>, <span class="c-st">"rb"</span>) <span class="c-kw">as</span> f:
    reader = make_reader(f)

    <span class="c-kw">for</span> schema, channel, message <span class="c-kw">in</span> reader.iter_messages():
        <span class="c-bi">print</span>(<span class="c-kw">f</span><span class="c-st">f"Topic: {channel.topic}, t={message.log_time}"</span>)

        <span class="c-cm"># Validar frecuencia de cámara (esperada 30 Hz)</span>
        <span class="c-kw">if</span> channel.topic == <span class="c-st">"/camera/front"</span>:
            validate_camera_message(message)

<span class="c-cm"># mcap CLI — inspeccionar sin código</span>
<span class="c-cm"># mcap info recording.mcap</span>
<span class="c-cm"># mcap filter --include-topic /camera/front out.mcap recording.mcap</span></pre></div>
      <p>• <b>Foxglove Studio:</b> Visualizador de archivos MCAP (LIDAR 3D, cámaras, plots). Gratis. Esencial para inspección visual.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre MCAP y su uso en Wayve...</p>
</div>`,

'observability': `
<div class="plan-card">
  <div class="plan-card-title">📊 Observability — Logs, Metrics y Traces</div>
  <div class="plan-block">
    <div class="plan-time">Los 3 pilares</div>
    <div class="plan-content">
      <h4>¿Qué pasó, cuánto, y dónde?</h4>
      <p><b>Logs:</b> Registro textual de eventos discretos. "¿Qué pasó exactamente?" — <code>ERROR 2026-07-08 14:33:21 ConnectionTimeout host=bench-01</code><br>
      <b>Metrics:</b> Valores numéricos en el tiempo. "¿Cuánto, cuándo, con qué frecuencia?" — CPU usage, número de tests fallados/hora, latencia de pipeline.<br>
      <b>Traces:</b> El recorrido de una operación a través de múltiples servicios. "¿Dónde tardó más?" — La traza de un job de CI desde queue → build → test → report.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Stack de observabilidad</div>
    <div class="plan-content">
      <h4>Prometheus + Grafana + OpenTelemetry</h4>
      <p><b>Prometheus:</b> Base de datos de series de tiempo para métricas. Scrapea endpoints HTTP <code>/metrics</code>. AlertManager para alertas.<br>
      <b>Grafana:</b> Visualización de métricas de Prometheus (y Loki, Tempo). Dashboards configurables. Usado para dashboards de health de pipelines CI y bancos HIL.<br>
      <b>Loki:</b> Sistema de logs compatible con Grafana. "Prometheus para logs".<br>
      <b>OpenTelemetry:</b> Estándar abierto para instrumentación. Define APIs y SDKs para generar traces, metrics y logs de forma vendor-neutral. Compatible con Prometheus, Grafana, Jaeger, Zipkin, Datadog, etc.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre observabilidad...</p>
</div>`,

};  // fin TOOLS_RICH
