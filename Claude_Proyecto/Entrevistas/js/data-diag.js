
// ══════════════════════════════════════════════════════════════════
//  DIAG_RICH — Diagnóstico UDS, OBD, DTC
// ══════════════════════════════════════════════════════════════════
const DIAG_RICH = {

'uds-intro': `
<div class="tab-group-du1">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'du1-1','du1')">Modelo Cliente-Servidor</button>
    <button class="tab-btn" onclick="switchTab(this,'du1-2','du1')">Formato del mensaje</button>
    <button class="tab-btn" onclick="switchTab(this,'du1-3','du1')">Transporte: dónde vive UDS</button>
  </div>
  <div id="du1-1" class="tab-panel active">
<div class="concept-intro"><strong>UDS</strong> (Unified Diagnostic Services, ISO 14229) es el protocolo de diagnóstico estándar para ECUs en vehículos modernos — reemplazó al antiguo KWP2000 (ver el tema dedicado a esa comparación). Su arquitectura es la más simple posible de entender: <strong>cliente-servidor</strong>.</div>
<table class="kv-table"><tr><th>Rol</th><th>Quién lo cumple</th></tr>
<tr><td>Cliente</td><td>El tester de diagnóstico — una herramienta de taller, CANoe, o cualquier software que hable UDS. Siempre inicia la comunicación.</td></tr>
<tr><td>Servidor</td><td>La ECU bajo prueba. Nunca inicia comunicación por su cuenta — solo responde a lo que el cliente le pide.</td></tr>
</table>
<div class="diagram-card">
<svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagrama de secuencia UDS: el Tester actúa como cliente y envía un Request, la ECU actúa como servidor y responde con Positive o Negative Response">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="55" y="15" width="130" height="34" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="120" y="37" font-size="12" fill="var(--accent)" text-anchor="middle" font-weight="700">Tester (Cliente)</text>
    <line x1="120" y1="49" x2="120" y2="195" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 3"/>

    <rect x="375" y="15" width="130" height="34" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="440" y="37" font-size="12" fill="var(--accent)" text-anchor="middle" font-weight="700">ECU (Servidor)</text>
    <line x1="440" y1="49" x2="440" y2="195" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 3"/>

    <line x1="120" y1="95" x2="432" y2="95" stroke="var(--accent)" stroke-width="2"/>
    <polygon points="440,95 428,90 428,100" fill="var(--accent)"/>
    <text x="280" y="85" font-size="10.5" fill="var(--text)" text-anchor="middle" font-weight="600">Request: SID + datos</text>

    <line x1="440" y1="160" x2="128" y2="160" stroke="var(--green)" stroke-width="2" stroke-dasharray="6 3"/>
    <polygon points="120,160 132,155 132,165" fill="var(--green)"/>
    <text x="280" y="140" font-size="10.5" fill="var(--text)" text-anchor="middle" font-weight="600">Positive: (SID+0x40) + datos</text>
    <text x="280" y="180" font-size="10.5" fill="var(--text-muted)" text-anchor="middle">— o Negative: 0x7F + SID + NRC —</text>
  </g>
</svg>
<div class="diagram-caption">Todo intercambio UDS sigue este mismo patrón: el Tester pregunta, la ECU responde una única vez — nunca al revés, y nunca sin que se le haya pedido algo primero.</div>
</div>
  </div>
  <div id="du1-2" class="tab-panel">
<div class="concept-intro">Hay una regla fija para reconocer si una respuesta fue exitosa o no, con solo mirar el primer byte:</div>
<table class="kv-table"><tr><th>Tipo de respuesta</th><th>Formato</th><th>Cómo reconocerla</th></tr>
<tr><td>Positive Response</td><td>(SID + 0x40) + datos</td><td>El primer byte es el SID solicitado más 0x40 — por ejemplo, si pediste 0x22, la respuesta exitosa empieza con 0x62.</td></tr>
<tr><td>Negative Response</td><td>0x7F + SID + NRC</td><td>El primer byte siempre es 0x7F — inconfundible, es la señal universal de "esto falló", sin importar qué servicio se pidió.</td></tr>
</table>
<div class="code-block"><div class="code-lang">Ejemplo — ReadDataByIdentifier (0x22)</div><pre>
<span class="c-cm">-- Caso exitoso</span>
Request:  [22] [F1 90]           <span class="c-cm">-- Leer DID 0xF190 (VIN)</span>
Response: [62] [F1 90] [57 30 4C ...]   <span class="c-cm">-- 0x22+0x40=0x62, seguido del VIN en ASCII</span>

<span class="c-cm">-- Caso rechazado</span>
Request:  [22] [0F A0]           <span class="c-cm">-- DID que la ECU no reconoce</span>
Response: [7F] [22] [31]         <span class="c-cm">-- 0x7F = rechazo, 0x22 = servicio pedido, 0x31 = requestOutOfRange</span></pre></div>
<div class="alert-card">💡 Esta regla del "+0x40" es una de las preguntas más frecuentes en entrevistas técnicas de este rol — con solo saberla, podés leer cualquier traza UDS y distinguir éxito de error sin necesitar la tabla de servicios enfrente.</div>
  </div>
  <div id="du1-3" class="tab-panel">
<div class="concept-intro">UDS no está atado a un único bus físico — el mismo conjunto de servicios y formato de mensaje puede transportarse sobre distintos medios, según qué tan moderno sea el vehículo.</div>
<table class="kv-table"><tr><th>Transporte</th><th>Cómo funciona</th></tr>
<tr><td>CAN (vía ISO-TP)</td><td>El más común en vehículos actuales. UDS usa ISO-TP (ISO 15765-2) para segmentar mensajes más grandes que 8 bytes — ver el tema "Capas OSI en Automotriz" del módulo de Protocolos.</td></tr>
<tr><td>Ethernet (vía DoIP)</td><td>UDS encapsulado en DoIP (ISO 13400), usando TCP directamente en vez de ISO-TP — mucho más rápido para operaciones grandes como el flasheo. Ver el tema "DoIP" del módulo de Protocolos.</td></tr>
<tr><td>K-Line (legado)</td><td>Comunicación serie de un solo hilo, típica de vehículos previos a la adopción masiva de CAN — más asociada a KWP2000 que a UDS puro (ver el tema "KWP2000 vs UDS").</td></tr>
</table>
<div class="concept-intro">Esto significa que los <strong>servicios UDS en sí (los SIDs, las sesiones, los NRCs) son exactamente los mismos</strong> sin importar el transporte — lo único que cambia es cómo ese mensaje viaja físicamente entre el tester y la ECU.</div>
  </div>
</div>
`,

'uds-servicios': `
<div class="tab-group-du2">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'du2-1','du2')">Sesión y lectura</button>
    <button class="tab-btn" onclick="switchTab(this,'du2-2','du2')">Escritura y seguridad</button>
    <button class="tab-btn" onclick="switchTab(this,'du2-3','du2')">Transferencia de datos (flasheo)</button>
  </div>
  <div id="du2-1" class="tab-panel active">
<div class="concept-intro">Estos son los servicios que casi cualquier sesión de diagnóstico usa desde el primer momento — cambiar de sesión, leer información, y mantener la comunicación viva.</div>
<table class="kv-table"><tr><th>SID</th><th>Servicio</th><th>Uso</th></tr>
<tr><td>0x10</td><td>DiagnosticSessionControl</td><td>Cambiar de sesión (Default, Extended, Programming) — ver el tema "Sesiones de diagnóstico".</td></tr>
<tr><td>0x11</td><td>ECUReset</td><td>Resetear la ECU (Hard Reset, Soft Reset, o simular Key Off/On).</td></tr>
<tr><td>0x19</td><td>ReadDTCInformation</td><td>Leer DTCs, con subfunción según qué subconjunto interesa (0x02=confirmados, 0x0A=todos).</td></tr>
<tr><td>0x22</td><td>ReadDataByIdentifier</td><td>Leer un dato por su DID (Data Identifier, 2 bytes) — VIN, versión de software, valores en vivo.</td></tr>
<tr><td>0x3E</td><td>TesterPresent</td><td>Keepalive — le dice a la ECU "seguimos acá", evitando que la sesión vuelva a Default por timeout.</td></tr>
</table>
  </div>
  <div id="du2-2" class="tab-panel">
<div class="concept-intro">Estos servicios modifican el estado de la ECU o requieren haber pasado primero por una autenticación — por eso casi siempre exigen estar en Extended o Programming Session, y muchos requieren SecurityAccess previo (ver el tema "Sesiones de diagnóstico").</div>
<table class="kv-table"><tr><th>SID</th><th>Servicio</th><th>Uso</th></tr>
<tr><td>0x14</td><td>ClearDiagnosticInformation</td><td>Borra los DTCs almacenados en la ECU.</td></tr>
<tr><td>0x27</td><td>SecurityAccess</td><td>Autenticación seed/key para desbloquear servicios protegidos.</td></tr>
<tr><td>0x28</td><td>CommunicationControl</td><td>Activa o desactiva la comunicación de la ECU en el bus — útil para aislarla durante un flasheo.</td></tr>
<tr><td>0x2E</td><td>WriteDataByIdentifier</td><td>Escribe datos en la ECU — por ejemplo, programar el VIN o un parámetro de configuración.</td></tr>
<tr><td>0x31</td><td>RoutineControl</td><td>Ejecuta rutinas predefinidas en la ECU: verificar el flash, borrar memoria, correr un self-test.</td></tr>
</table>
  </div>
  <div id="du2-3" class="tab-panel">
<div class="concept-intro">Este trío de servicios es exclusivamente para transferir bloques grandes de datos — típicamente firmware nuevo durante un flasheo. Se profundiza paso a paso en el tema "Bootloader & Flashing".</div>
<table class="kv-table"><tr><th>SID</th><th>Servicio</th><th>Uso</th></tr>
<tr><td>0x34</td><td>RequestDownload</td><td>Inicia la transferencia hacia la ECU — especifica dirección de memoria, tamaño total y formato de los datos.</td></tr>
<tr><td>0x36</td><td>TransferData</td><td>Transfiere cada bloque de datos en sí (el firmware), uno a la vez, numerados en secuencia.</td></tr>
<tr><td>0x37</td><td>RequestTransferExit</td><td>Cierra formalmente la transferencia una vez enviado el último bloque.</td></tr>
</table>
<div class="alert-card">💡 Estos tres siempre aparecen juntos y en ese orden — es raro ver uno sin los otros dos en una traza real de flasheo.</div>
  </div>
</div>
`,

'uds-nrc': `
<div class="tab-group-du3">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'du3-1','du3')">Formato de la respuesta negativa</button>
    <button class="tab-btn" onclick="switchTab(this,'du3-2','du3')">NRCs más comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'du3-3','du3')">Cómo depurar un NRC</button>
  </div>
  <div id="du3-1" class="tab-panel active">
<div class="concept-intro">Cada vez que una ECU rechaza un pedido, responde con exactamente 3 bytes de estructura fija — nunca varía, sin importar cuál haya sido el servicio original.</div>
<div class="diagram-card">
<svg viewBox="0 0 560 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparación de formato: Positive Response es SID más 0x40 seguido de datos; Negative Response es 0x7F seguido del SID solicitado y el código NRC">
  <g font-family="'Segoe UI',sans-serif">
    <text x="20" y="45" font-size="11" fill="var(--green)" font-weight="700">✅ Positive</text>
    <rect x="140" y="25" width="110" height="40" fill="var(--green)" fill-opacity="0.5" stroke="var(--green)" stroke-width="1.3"/>
    <text x="195" y="49" font-size="10.5" fill="var(--green)" text-anchor="middle" font-weight="700">SID + 0x40</text>
    <rect x="250" y="25" width="200" height="40" fill="var(--green)" fill-opacity="0.22" stroke="var(--green)" stroke-width="1.3"/>
    <text x="350" y="49" font-size="10.5" fill="var(--green)" text-anchor="middle" font-weight="600">Data / parámetros solicitados</text>

    <text x="20" y="115" font-size="11" fill="var(--accent)" font-weight="700">❌ Negative</text>
    <rect x="140" y="95" width="60" height="40" fill="var(--accent)" fill-opacity="0.55" stroke="var(--accent)" stroke-width="1.3"/>
    <text x="170" y="119" font-size="10.5" fill="var(--accent)" text-anchor="middle" font-weight="700">0x7F</text>
    <rect x="200" y="95" width="90" height="40" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)" stroke-width="1.3"/>
    <text x="245" y="119" font-size="10.5" fill="var(--accent)" text-anchor="middle" font-weight="600">SID pedido</text>
    <rect x="290" y="95" width="90" height="40" fill="var(--accent)" fill-opacity="0.65" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="335" y="119" font-size="10.5" fill="var(--accent)" text-anchor="middle" font-weight="700">NRC</text>
  </g>
</svg>
<div class="diagram-caption">El <b>SID pedido</b> en la respuesta negativa te dice qué servicio falló; el <b>NRC</b> te dice por qué — con esos dos bytes alcanza para saber exactamente qué pasó, sin ambigüedad.</div>
</div>
<div class="code-block"><div class="code-lang">Ejemplo completo</div><pre>
Request:  [22] [0F A0]           <span class="c-cm">-- Leer DID 0x0FA0</span>
Response: [7F] [22] [31]         <span class="c-cm">-- Rechazado: requestOutOfRange (0x31)</span></pre></div>
  </div>
  <div id="du3-2" class="tab-panel">
<table class="kv-table"><tr><th>NRC</th><th>Nombre</th><th>Causa típica</th></tr>
<tr><td>0x10</td><td>generalReject</td><td>Error genérico, sin más información específica disponible.</td></tr>
<tr><td>0x11</td><td>serviceNotSupported</td><td>La ECU no implementa ese SID en absoluto.</td></tr>
<tr><td>0x12</td><td>subFunctionNotSupported</td><td>El servicio existe, pero esa subfunción específica no está implementada.</td></tr>
<tr><td>0x13</td><td>incorrectMessageLengthOrInvalidFormat</td><td>La longitud del mensaje no coincide con lo que ese servicio espera.</td></tr>
<tr><td>0x21</td><td>busyRepeatRequest</td><td>La ECU está ocupada — hay que reintentar el mismo request más tarde.</td></tr>
<tr><td>0x22</td><td>conditionsNotCorrect</td><td>Las condiciones del sistema no permiten el servicio ahora (ej. motor en marcha).</td></tr>
<tr><td>0x24</td><td>requestSequenceError</td><td>Se pidió algo fuera de secuencia (ej. TransferData sin RequestDownload previo).</td></tr>
<tr><td>0x31</td><td>requestOutOfRange</td><td>El DID, RID o parámetro pedido está fuera del rango que la ECU soporta.</td></tr>
<tr><td>0x33</td><td>securityAccessDenied</td><td>Hace falta completar SecurityAccess antes, o el nivel de acceso actual es insuficiente.</td></tr>
<tr><td>0x35</td><td>invalidKey</td><td>La clave enviada en SecurityAccess no coincide con la esperada.</td></tr>
<tr><td>0x36</td><td>exceedNumberOfAttempts</td><td>Demasiados intentos fallidos de SecurityAccess — la ECU bloquea intentos nuevos temporalmente.</td></tr>
<tr><td>0x78</td><td>requestCorrectlyReceivedResponsePending</td><td>La ECU está procesando el pedido y responderá después (hasta unos segundos) — no es un error real.</td></tr>
</table>
  </div>
  <div id="du3-3" class="tab-panel">
<div class="dtree">
  <div class="dtree-title">Guía rápida para depurar un NRC</div>
  <div class="dtree-step"><div class="dtree-num warn">1</div><div class="dtree-body"><h5>¿0x11 o 0x12 (serviceNotSupported)?</h5><p>Confirmá que la ECU realmente implementa ese servicio — revisá su documentación/ODX antes de asumir un bug en el tester.</p></div></div>
  <div class="dtree-step"><div class="dtree-num warn">2</div><div class="dtree-body"><h5>¿0x13 (incorrectMessageLength)?</h5><p>Revisá el largo exacto del mensaje que estás armando — un byte de más o de menos en el payload es la causa casi siempre.</p></div></div>
  <div class="dtree-step"><div class="dtree-num warn">3</div><div class="dtree-body"><h5>¿0x22 (conditionsNotCorrect)?</h5><p>Preguntate qué condición física o de estado exige el servicio — motor apagado, velocidad 0, una sesión específica ya activa.</p></div></div>
  <div class="dtree-step"><div class="dtree-num warn">4</div><div class="dtree-body"><h5>¿0x24 (requestSequenceError)?</h5><p>Revisá el orden de tus requests — típicamente falta un paso previo obligatorio (sesión, SecurityAccess, RequestDownload).</p></div></div>
  <div class="dtree-step"><div class="dtree-num warn">5</div><div class="dtree-body"><h5>¿0x33/0x35 (Security)?</h5><p>SecurityAccess no se completó, el algoritmo seed→key está mal implementado, o falta subir de sesión antes de pedirlo.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">6</div><div class="dtree-body"><h5>¿0x78 (responsePending)?</h5><p>No es un error — esperá la respuesta real que llega después. Es habitual en rutinas largas como borrado de memoria.</p></div></div>
</div>
  </div>
</div>
`,

'uds-sesiones': `
<div class="tab-group-du4">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'du4-1','du4')">Las 3 sesiones</button>
    <button class="tab-btn" onclick="switchTab(this,'du4-2','du4')">Security Access — seed &amp; key</button>
    <button class="tab-btn" onclick="switchTab(this,'du4-3','du4')">Flujo completo con código</button>
  </div>
  <div id="du4-1" class="tab-panel active">
<div class="concept-intro">UDS controla qué servicios están disponibles según en qué <strong>sesión</strong> se encuentre la ECU en ese momento — es un control de acceso por estado, no solo por autenticación.</div>
<table class="kv-table"><tr><th>Sesión</th><th>SID</th><th>Qué habilita</th></tr>
<tr><td>Default</td><td>0x01</td><td>Siempre disponible al arrancar. Lectura de datos básicos (0x22) y DTCs (0x19).</td></tr>
<tr><td>Extended Diagnostic</td><td>0x03</td><td>Más servicios: escritura de datos, rutinas. Algunos requieren SecurityAccess adicional.</td></tr>
<tr><td>Programming</td><td>0x02</td><td>Exclusiva para actualizar firmware (flasheo). Requiere SecurityAccess obligatoriamente.</td></tr>
</table>
<div class="diagram-card">
<svg viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Máquina de estados de las sesiones UDS: Default, Extended y Programming, con transiciones explícitas y retorno automático a Default por timeout">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="20" y="60" width="140" height="60" rx="10" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="2"/>
    <text x="90" y="86" font-size="12" fill="var(--accent)" text-anchor="middle" font-weight="700">Default</text>
    <text x="90" y="102" font-size="9.5" fill="var(--accent)" text-anchor="middle">0x01</text>

    <rect x="210" y="60" width="140" height="60" rx="10" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="2"/>
    <text x="280" y="86" font-size="12" fill="var(--accent)" text-anchor="middle" font-weight="700">Extended</text>
    <text x="280" y="102" font-size="9.5" fill="var(--accent)" text-anchor="middle">0x03</text>

    <rect x="400" y="60" width="140" height="60" rx="10" fill="var(--green)" fill-opacity="0.18" stroke="var(--green)" stroke-width="2"/>
    <text x="470" y="86" font-size="12" fill="var(--green)" text-anchor="middle" font-weight="700">Programming</text>
    <text x="470" y="102" font-size="9.5" fill="var(--green)" text-anchor="middle">0x02</text>

    <line x1="160" y1="90" x2="205" y2="90" stroke="var(--text)" stroke-width="1.8"/>
    <polygon points="210,90 199,85 199,95" fill="var(--text)"/>
    <text x="185" y="80" font-size="9" fill="var(--text-muted)" text-anchor="middle">10 03</text>

    <line x1="350" y1="90" x2="395" y2="90" stroke="var(--text)" stroke-width="1.8"/>
    <polygon points="400,90 389,85 389,95" fill="var(--text)"/>
    <text x="375" y="80" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">10 02 + Security</text>

    <path d="M 470 120 Q 280 210 100 122" fill="none" stroke="var(--border)" stroke-width="1.6" stroke-dasharray="5 3"/>
    <polygon points="98,122 108,116 108,128" fill="var(--border)"/>
    <text x="280" y="195" font-size="9.5" fill="var(--text-muted)" text-anchor="middle">timeout sin TesterPresent (0x3E) — vuelve automáticamente a Default</text>
  </g>
</svg>
<div class="diagram-caption">Extended también vuelve a Default por el mismo motivo si no recibe <b>TesterPresent (0x3E)</b> periódicamente — la ECU nunca se queda "atascada" en un modo elevado si el tester se desconecta sin avisar.</div>
</div>
  </div>
  <div id="du4-2" class="tab-panel">
<div class="concept-intro"><strong>SecurityAccess (0x27)</strong> es el mecanismo de autenticación de UDS: antes de permitir servicios sensibles (escribir datos, flashear), la ECU exige demostrar que el tester conoce un secreto — sin necesidad de mandar ese secreto directamente por el bus, donde cualquiera podría capturarlo.</div>
<div class="diagram-card">
<svg viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Secuencia de Security Access: el tester pide una semilla, la ECU la envía, el tester calcula la clave con el algoritmo secreto y la envía de vuelta para desbloquear el acceso">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="55" y="15" width="130" height="34" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="120" y="37" font-size="12" fill="var(--accent)" text-anchor="middle" font-weight="700">Tester</text>
    <line x1="120" y1="49" x2="120" y2="268" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 3"/>

    <rect x="375" y="15" width="130" height="34" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="440" y="37" font-size="12" fill="var(--accent)" text-anchor="middle" font-weight="700">ECU</text>
    <line x1="440" y1="49" x2="440" y2="268" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 3"/>

    <line x1="120" y1="80" x2="432" y2="80" stroke="var(--accent)" stroke-width="2"/>
    <polygon points="440,80 428,75 428,85" fill="var(--accent)"/>
    <text x="280" y="70" font-size="10.5" fill="var(--text)" text-anchor="middle" font-weight="600">27 01 — RequestSeed</text>

    <line x1="440" y1="120" x2="128" y2="120" stroke="var(--green)" stroke-width="2" stroke-dasharray="6 3"/>
    <polygon points="120,120 132,115 132,125" fill="var(--green)"/>
    <text x="280" y="110" font-size="10.5" fill="var(--text)" text-anchor="middle" font-weight="600">67 01 [seed] — Seed</text>

    <rect x="30" y="135" width="180" height="30" rx="6" fill="var(--text)" fill-opacity="0.06" stroke="var(--border)" stroke-width="1"/>
    <text x="120" y="150" font-size="9" fill="var(--text-muted)" text-anchor="middle">Tester calcula</text>
    <text x="120" y="161" font-size="9" fill="var(--text-muted)" text-anchor="middle">key = f(seed, secreto)</text>

    <line x1="120" y1="195" x2="432" y2="195" stroke="var(--accent)" stroke-width="2"/>
    <polygon points="440,195 428,190 428,200" fill="var(--accent)"/>
    <text x="280" y="185" font-size="10.5" fill="var(--text)" text-anchor="middle" font-weight="600">27 02 [key] — SendKey</text>

    <line x1="440" y1="235" x2="128" y2="235" stroke="var(--green)" stroke-width="2" stroke-dasharray="6 3"/>
    <polygon points="120,235 132,230 132,240" fill="var(--green)"/>
    <text x="280" y="225" font-size="10.5" fill="var(--text)" text-anchor="middle" font-weight="700">67 02 — Access granted ✓</text>
  </g>
</svg>
<div class="diagram-caption">La <b>semilla (seed)</b> cambia en cada intento — por eso capturar un intercambio anterior no sirve para replay. Solo quien conoce el algoritmo secreto puede transformar esa semilla en la clave correcta.</div>
</div>
<div class="alert-card">💡 Si el key enviado no coincide, la ECU responde NRC 0x35 (invalidKey); tras demasiados intentos fallidos, responde 0x36 (exceedNumberOfAttempts) y bloquea nuevos intentos por un tiempo — exactamente el mismo patrón de protección contra fuerza bruta que verías en cualquier sistema de autenticación.</div>
  </div>
  <div id="du4-3" class="tab-panel">
<div class="concept-intro">Juntando sesiones y SecurityAccess, así se ve el flujo completo típico para llegar a poder flashear una ECU — el mismo patrón que retoma en detalle el tema "Bootloader & Flashing".</div>
<div class="code-block"><div class="code-lang">UDS — Flujo de sesiones y acceso</div><pre>
<span class="c-cm">-- INICIO: Siempre en Default Session</span>
Default Session (implícita al arrancar)
  → Disponible: 0x22, 0x19, 0x3E
  → No disponible: 0x28, 0x2E, 0x31, 0x34-37

<span class="c-cm">-- Para más servicios: Extended Session</span>
Request:  [10] [03]  → Extended Diagnostic Session
Response: [50] [03] [00 19] [01 F4]  → OK, P2=25ms, P2*=500ms

  → Disponible: 0x22, 0x19, 0x28, 0x31, 0x2E (si pasa SecurityAccess)

<span class="c-cm">-- Para flasheo: Programming Session (requiere SecurityAccess)</span>
Request: [10] [02]  → Programming Session
Request: [27] [01]  → SecurityAccess RequestSeed
Response: [67] [01] [AB CD EF 00]  → Seed = 0xABCDEF00
Request: [27] [02] [12 34 56 78]  → SendKey (cálculo: seed XOR secret)
Response: [67] [02]  → SecurityAccess granted ✓

Ahora disponible: 0x34, 0x36, 0x37 (flasheo)</pre></div>
  </div>
</div>
`,

'obd2': `
<div class="tab-group-du5">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'du5-1','du5')">Qué es y el conector J1962</button>
    <button class="tab-btn" onclick="switchTab(this,'du5-2','du5')">Modos y PIDs</button>
    <button class="tab-btn" onclick="switchTab(this,'du5-3','du5')">OBD-II vs UDS</button>
  </div>
  <div id="du5-1" class="tab-panel active">
<div class="concept-intro"><strong>OBD-II</strong> (On-Board Diagnostics II) es el estándar norteamericano (SAE J1979, EPA) y su equivalente europeo (EOBD) de diagnóstico <strong>obligatorio</strong> en todos los vehículos vendidos desde 1996 en EE.UU. y 2001 en la Unión Europea. Su objetivo original es específicamente el <strong>control de emisiones</strong>: la computadora del motor monitorea catalizador, sonda lambda, sistema EGR, y enciende la luz "Check Engine" (MIL) si detecta una falla relevante.</div>
<div class="diagram-card">
<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conector OBD-II de 16 pines (SAE J1962) con los pines 4, 5, 6, 14 y 16 destacados">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="40" y="20" width="320" height="150" rx="24" fill="none" stroke="var(--text-muted)" stroke-width="2"/>
    <g font-size="9" text-anchor="middle">
      <circle cx="70" cy="65" r="13" fill="var(--bg)" stroke="var(--border)" stroke-width="1.3"/><text x="70" y="69" fill="var(--text-muted)">1</text>
      <circle cx="113" cy="65" r="13" fill="var(--bg)" stroke="var(--border)" stroke-width="1.3"/><text x="113" y="69" fill="var(--text-muted)">2</text>
      <circle cx="156" cy="65" r="13" fill="var(--bg)" stroke="var(--border)" stroke-width="1.3"/><text x="156" y="69" fill="var(--text-muted)">3</text>
      <circle cx="199" cy="65" r="13" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="2"/><text x="199" y="69" fill="var(--accent)" font-weight="700">4</text>
      <circle cx="241" cy="65" r="13" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="2"/><text x="241" y="69" fill="var(--accent)" font-weight="700">5</text>
      <circle cx="284" cy="65" r="13" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="2"/><text x="284" y="69" fill="var(--accent)" font-weight="700">6</text>
      <circle cx="327" cy="65" r="13" fill="var(--bg)" stroke="var(--border)" stroke-width="1.3"/><text x="327" y="69" fill="var(--text-muted)">7</text>
      <circle cx="370" cy="65" r="13" fill="var(--bg)" stroke="var(--border)" stroke-width="1.3"/><text x="370" y="69" fill="var(--text-muted)">8</text>
    </g>
    <g font-size="9" text-anchor="middle">
      <circle cx="70" cy="125" r="13" fill="var(--bg)" stroke="var(--border)" stroke-width="1.3"/><text x="70" y="129" fill="var(--text-muted)">9</text>
      <circle cx="113" cy="125" r="13" fill="var(--bg)" stroke="var(--border)" stroke-width="1.3"/><text x="113" y="129" fill="var(--text-muted)">10</text>
      <circle cx="156" cy="125" r="13" fill="var(--bg)" stroke="var(--border)" stroke-width="1.3"/><text x="156" y="129" fill="var(--text-muted)">11</text>
      <circle cx="199" cy="125" r="13" fill="var(--bg)" stroke="var(--border)" stroke-width="1.3"/><text x="199" y="129" fill="var(--text-muted)">12</text>
      <circle cx="241" cy="125" r="13" fill="var(--bg)" stroke="var(--border)" stroke-width="1.3"/><text x="241" y="129" fill="var(--text-muted)">13</text>
      <circle cx="284" cy="125" r="13" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="2"/><text x="284" y="129" fill="var(--accent)" font-weight="700">14</text>
      <circle cx="327" cy="125" r="13" fill="var(--bg)" stroke="var(--border)" stroke-width="1.3"/><text x="327" y="129" fill="var(--text-muted)">15</text>
      <circle cx="370" cy="125" r="13" fill="var(--green)" fill-opacity="0.22" stroke="var(--green)" stroke-width="2"/><text x="370" y="129" fill="var(--green)" font-weight="700">16</text>
    </g>
    <text x="200" y="200" font-size="10.5" fill="var(--text)" text-anchor="middle" font-weight="600">4/5: Masa · 6: CAN High · 14: CAN Low · 16: +12V Batería</text>
    <text x="200" y="220" font-size="9.5" fill="var(--text-muted)" text-anchor="middle">Conector SAE J1962, visto de frente (hembra, bajo el tablero del conductor)</text>
  </g>
</svg>
<div class="diagram-caption">Con solo estos 5 pines (masa, CAN High/Low, +12V) alcanza para diagnosticar la mayoría de los vehículos actuales — el resto de los 16 pines existen para protocolos legados (K-Line, J1850) que ya casi no se usan.</div>
</div>
  </div>
  <div id="du5-2" class="tab-panel">
<div class="concept-intro">OBD-II organiza sus datos en <strong>modos</strong> (equivalentes conceptuales a los SIDs de UDS, aunque con su propio formato) — cada modo agrupa un tipo de información.</div>
<table class="kv-table"><tr><th>Modo</th><th>Nombre</th><th>Ejemplo</th></tr>
<tr><td>0x01</td><td>Current data</td><td>RPM (PID 0x0C), Velocidad (PID 0x0D), Temperatura de refrigerante (PID 0x05).</td></tr>
<tr><td>0x02</td><td>Freeze frame data</td><td>Datos guardados en el instante exacto en que se registró el último DTC.</td></tr>
<tr><td>0x03</td><td>Show DTCs</td><td>Lista de DTCs confirmados actualmente.</td></tr>
<tr><td>0x04</td><td>Clear DTCs</td><td>Borra los DTCs y reinicia los "readiness monitors" del sistema de emisiones.</td></tr>
<tr><td>0x05</td><td>O2 sensor data</td><td>Voltaje de las sondas lambda.</td></tr>
<tr><td>0x06</td><td>OBDMID test results</td><td>Resultados de tests internos: fallos de encendido (misfire), estado del catalizador.</td></tr>
<tr><td>0x07</td><td>Pending DTCs</td><td>DTCs detectados pero que aún no se confirmaron.</td></tr>
<tr><td>0x09</td><td>Vehicle info</td><td>VIN (PID 0x02), Calibration ID del software instalado.</td></tr>
<tr><td>0x0A</td><td>Permanent DTCs</td><td>DTCs que no se pueden borrar manualmente hasta que la falla real se repare y se verifique.</td></tr>
</table>
  </div>
  <div id="du5-3" class="tab-panel">
<div class="concept-intro">Es común confundir OBD-II con UDS porque ambos comparten el mismo conector físico (J1962) y muchas veces el mismo bus CAN — pero son protocolos distintos, con propósitos distintos.</div>
<table class="kv-table"><tr><th>Aspecto</th><th>OBD-II</th><th>UDS</th></tr>
<tr><td>Propósito principal</td><td>Emisiones — regulado legalmente, obligatorio y estandarizado entre fabricantes</td><td>Diagnóstico completo del vehículo — propietario, específico de cada fabricante</td></tr>
<tr><td>Alcance</td><td>Solo sistemas relacionados a emisiones (motor, catalizador, sondas)</td><td>Cualquier ECU del vehículo — frenos, airbags, confort, infotainment</td></tr>
<tr><td>Estandarización</td><td>Los PIDs modo 0x01 son iguales en cualquier marca</td><td>Los DIDs (0x22) son definidos libremente por cada fabricante</td></tr>
<tr><td>Flasheo de ECU</td><td>No lo soporta</td><td>Sí, mediante 0x34/0x36/0x37 (ver "Bootloader & Flashing")</td></tr>
<tr><td>Quién lo usa</td><td>Cualquier scanner genérico, apps de smartphone</td><td>Herramientas de taller autorizado / fabricante</td></tr>
</table>
<div class="alert-card">💡 En la práctica, muchos vehículos modernos exponen <strong>ambos</strong> protocolos sobre el mismo conector: OBD-II para lo que la ley exige que cualquier scanner pueda leer, y UDS para todo el resto del diagnóstico propietario del fabricante.</div>
  </div>
</div>
`,

'dtc': `
<div class="tab-group-du6">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'du6-1','du6')">Anatomía de un código</button>
    <button class="tab-btn" onclick="switchTab(this,'du6-2','du6')">Status Byte — los 8 bits</button>
    <button class="tab-btn" onclick="switchTab(this,'du6-3','du6')">Ciclo de vida de un DTC</button>
  </div>
  <div id="du6-1" class="tab-panel active">
<div class="concept-intro">Un <strong>DTC</strong> (Diagnostic Trouble Code) no es un número arbitrario — cada carácter del código codifica información específica sobre qué sistema falló y dónde.</div>
<div class="diagram-card">
<svg viewBox="0 0 500 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Desglose del código DTC P0301: P indica el sistema Powertrain, 0 indica código estándar SAE, 3 indica el subsistema de encendido, y 01 indica el cilindro 1">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="60" y="20" width="70" height="60" fill="var(--accent)" fill-opacity="0.55" stroke="var(--accent)" stroke-width="1.4"/>
    <text x="95" y="60" font-size="24" fill="var(--accent)" text-anchor="middle" font-weight="800">P</text>
    <rect x="130" y="20" width="70" height="60" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)" stroke-width="1.4"/>
    <text x="165" y="60" font-size="24" fill="var(--accent)" text-anchor="middle" font-weight="800">0</text>
    <rect x="200" y="20" width="70" height="60" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)" stroke-width="1.4"/>
    <text x="235" y="60" font-size="24" fill="var(--accent)" text-anchor="middle" font-weight="800">3</text>
    <rect x="270" y="20" width="100" height="60" fill="var(--green)" fill-opacity="0.4" stroke="var(--green)" stroke-width="1.6"/>
    <text x="320" y="60" font-size="24" fill="var(--green)" text-anchor="middle" font-weight="800">01</text>

    <g font-size="9.5" fill="var(--text-muted)" text-anchor="middle">
      <text x="95" y="95">Sistema</text>
      <text x="95" y="107">Powertrain</text>
      <text x="165" y="95">Tipo</text>
      <text x="165" y="107">SAE estándar</text>
      <text x="235" y="95">Subsistema</text>
      <text x="235" y="107">Encendido/misfire</text>
      <text x="320" y="95">Código específico</text>
      <text x="320" y="107">Cilindro 1</text>
    </g>
  </g>
</svg>
<div class="diagram-caption">Solo con leer las primeras dos letras/números de cualquier DTC ya sabés el sistema y si es un código estándar SAE o propio del fabricante — antes de buscar qué significa el resto.</div>
</div>
<table class="kv-table"><tr><th>Carácter</th><th>Qué codifica</th></tr>
<tr><td>1ª letra</td><td>Sistema: P(owertrain), C(hassis), B(ody), U(network/comunicación).</td></tr>
<tr><td>1er dígito</td><td>Tipo: 0 = código SAE estándar (igual en cualquier marca); 1, 2 o 3 = código específico del fabricante (OEM).</td></tr>
<tr><td>2º dígito</td><td>Subsistema afectado dentro del sistema general.</td></tr>
<tr><td>Últimos 2 dígitos</td><td>Código específico de la falla puntual.</td></tr>
</table>
<div class="concept-intro">Otros ejemplos reales: <strong>P0171</strong> = sistema de combustible demasiado pobre (Banco 1); <strong>U0100</strong> = pérdida de comunicación CAN con el ECM/PCM; <strong>B1010</strong> = código de carrocería específico del fabricante.</div>
  </div>
  <div id="du6-2" class="tab-panel">
<div class="concept-intro">Un DTC no es solo su código — trae además un <strong>Status Byte</strong> de 8 bits que describe con precisión en qué estado se encuentra esa falla en este momento.</div>
<div class="diagram-card">
<svg viewBox="0 0 600 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Los 8 bits del Status Byte de un DTC, de bit 7 a bit 0, con los bits más consultados en diagnóstico destacados">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="20" y="20" width="65" height="50" fill="var(--accent)" fill-opacity="0.15" stroke="var(--accent)" stroke-width="1.2"/>
    <text x="52" y="50" font-size="15" fill="var(--accent)" text-anchor="middle" font-weight="700">7</text>
    <rect x="90" y="20" width="65" height="50" fill="var(--accent)" fill-opacity="0.15" stroke="var(--accent)" stroke-width="1.2"/>
    <text x="122" y="50" font-size="15" fill="var(--accent)" text-anchor="middle" font-weight="700">6</text>
    <rect x="160" y="20" width="65" height="50" fill="var(--accent)" fill-opacity="0.55" stroke="var(--accent)" stroke-width="1.6"/>
    <text x="192" y="50" font-size="15" fill="var(--accent)" text-anchor="middle" font-weight="700">5</text>
    <rect x="230" y="20" width="65" height="50" fill="var(--accent)" fill-opacity="0.55" stroke="var(--accent)" stroke-width="1.6"/>
    <text x="262" y="50" font-size="15" fill="var(--accent)" text-anchor="middle" font-weight="700">4</text>
    <rect x="300" y="20" width="65" height="50" fill="var(--green)" fill-opacity="0.4" stroke="var(--green)" stroke-width="1.8"/>
    <text x="332" y="50" font-size="15" fill="var(--green)" text-anchor="middle" font-weight="700">3</text>
    <rect x="370" y="20" width="65" height="50" fill="var(--accent)" fill-opacity="0.55" stroke="var(--accent)" stroke-width="1.6"/>
    <text x="402" y="50" font-size="15" fill="var(--accent)" text-anchor="middle" font-weight="700">2</text>
    <rect x="440" y="20" width="65" height="50" fill="var(--accent)" fill-opacity="0.15" stroke="var(--accent)" stroke-width="1.2"/>
    <text x="472" y="50" font-size="15" fill="var(--accent)" text-anchor="middle" font-weight="700">1</text>
    <rect x="510" y="20" width="65" height="50" fill="var(--accent)" fill-opacity="0.55" stroke="var(--accent)" stroke-width="1.6"/>
    <text x="542" y="50" font-size="15" fill="var(--accent)" text-anchor="middle" font-weight="700">0</text>
    <g font-size="9" fill="var(--text-muted)" text-anchor="middle">
      <text x="52" y="86">bit7</text>
      <text x="122" y="86">bit6</text>
      <text x="192" y="86">bit5</text>
      <text x="262" y="86">bit4</text>
      <text x="332" y="86">bit3</text>
      <text x="402" y="86">bit2</text>
      <text x="472" y="86">bit1</text>
      <text x="542" y="86">bit0</text>
    </g>
  </g>
</svg>
<div class="diagram-caption">El <b>bit 3</b> (verde) es el que enciende la luz Check Engine — un DTC puede estar "pendiente" (bit 2) sin que el conductor vea ninguna advertencia todavía.</div>
</div>
<table class="kv-table"><tr><th>Bit</th><th>Nombre</th><th>Qué indica</th></tr>
<tr><td>Bit 0</td><td>testFailed</td><td>El test asociado falló en este momento, ahora mismo.</td></tr>
<tr><td>Bit 1</td><td>testFailedThisOperationCycle</td><td>Falló en algún momento del ciclo de conducción actual.</td></tr>
<tr><td>Bit 2</td><td>pendingDTC</td><td>Falló en el ciclo actual, pero aún no se confirmó (necesita fallar de nuevo en otro ciclo).</td></tr>
<tr><td>Bit 3</td><td>confirmedDTC</td><td>Confirmado tras fallar en 2 o más ciclos de conducción — enciende la MIL (Check Engine).</td></tr>
<tr><td>Bit 4</td><td>testNotCompletedSinceLastClear</td><td>El test todavía no corrió desde el último borrado de DTCs.</td></tr>
<tr><td>Bit 5</td><td>testFailedSinceLastClear</td><td>Falló al menos una vez desde el último borrado, aunque ahora mismo pase.</td></tr>
<tr><td>Bit 6</td><td>testNotCompletedThisOperationCycle</td><td>El test no se completó todavía en el ciclo de conducción actual.</td></tr>
<tr><td>Bit 7</td><td>warningIndicatorRequested</td><td>La ECU solicita que se muestre algún tipo de advertencia visible al conductor.</td></tr>
</table>
  </div>
  <div id="du6-3" class="tab-panel">
<div class="dtree">
  <div class="dtree-title">De la primera falla a la reparación</div>
  <div class="dtree-step"><div class="dtree-num">1</div><div class="dtree-body"><h5>Falla detectada — Pending</h5><p>El sistema detecta una condición fuera de rango por primera vez. El DTC queda marcado como <span class="yes">pending (bit 2)</span>, pero la MIL todavía no se enciende.</p></div></div>
  <div class="dtree-step"><div class="dtree-num">2</div><div class="dtree-body"><h5>Se repite — Confirmed</h5><p>Si la misma falla se detecta de nuevo en otro ciclo de conducción, el DTC pasa a <span class="yes">confirmed (bit 3)</span> — recién ahí se enciende la MIL (Check Engine) para el conductor.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">3</div><div class="dtree-body"><h5>Freeze Frame capturado</h5><p>En el instante exacto de la confirmación, la ECU guarda un <b>Freeze Frame</b>: RPM, velocidad, carga del motor y temperatura en ese momento — el contexto exacto en que ocurrió, clave para reproducir el problema en el taller.</p></div></div>
  <div class="dtree-step"><div class="dtree-num">4</div><div class="dtree-body"><h5>Reparación y verificación</h5><p>El técnico repara la causa real. La ECU vuelve a correr el test correspondiente para confirmar que ya no falla.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">5</div><div class="dtree-body"><h5>Borrado — con un matiz importante</h5><p>Un DTC común se puede borrar manualmente (modo 0x04 en OBD-II, servicio 0x14 en UDS). Pero los <b>Permanent DTCs</b> (modo 0x0A) no se pueden borrar por comando — solo desaparecen cuando el sistema verifica, por sí mismo y en condiciones reales de manejo, que la falla ya no ocurre. Esto evita borrar un código solo para "apagar la luz" sin reparar nada.</p></div></div>
</div>
  </div>
</div>
`,

'bootloader': `
<div class="tab-group-du7">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'du7-1','du7')">Qué es el Bootloader</button>
    <button class="tab-btn" onclick="switchTab(this,'du7-2','du7')">Secuencia de flasheo</button>
    <button class="tab-btn" onclick="switchTab(this,'du7-3','du7')">Errores comunes de flasheo</button>
  </div>
  <div id="du7-1" class="tab-panel active">
<div class="concept-intro">El <strong>Bootloader</strong> es un programa pequeño que vive en una partición protegida de la memoria flash de la ECU, separada del software de aplicación normal. Su única función es recibir firmware nuevo y escribirlo en la memoria flash principal.</div>
<div class="concept-intro">Cuando la ECU entra en <strong>Programming Session</strong> (UDS 0x10 0x02), el bootloader toma control del procesador en vez del software de aplicación normal — y espera la transferencia. Esta separación es intencional: el <strong>Application Software nunca puede reescribirse a sí mismo</strong>, porque si el flasheo fallara a mitad de camino mientras el propio software en ejecución se sobreescribe, la ECU quedaría irrecuperable ("bricked"). El bootloader, en cambio, nunca se toca durante un flasheo normal — siempre queda disponible para intentar de nuevo.</div>
<div class="alert-card">💡 Esta es la razón técnica de fondo detrás de una pregunta clásica de entrevista: "¿por qué no se puede simplemente sobrescribir el firmware completo de una vez, incluyendo el bootloader?" — porque si algo sale mal a mitad de esa escritura, no quedaría ningún código funcional capaz de recibir un firmware de recuperación.</div>
  </div>
  <div id="du7-2" class="tab-panel">
<div class="concept-intro">El flasheo completo de una ECU sigue una secuencia UDS estricta — cada paso depende de que el anterior haya terminado correctamente.</div>
<div class="diagram-card">
<svg viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Secuencia de flasheo UDS: RequestDownload, confirmación con el tamaño máximo de bloque, TransferData repetido por cada bloque, y finalmente RequestTransferExit">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="55" y="15" width="130" height="34" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="120" y="37" font-size="12" fill="var(--accent)" text-anchor="middle" font-weight="700">Tester</text>
    <line x1="120" y1="49" x2="120" y2="268" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 3"/>

    <rect x="375" y="15" width="130" height="34" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="440" y="37" font-size="12" fill="var(--accent)" text-anchor="middle" font-weight="700">ECU (Bootloader)</text>
    <line x1="440" y1="49" x2="440" y2="268" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 3"/>

    <line x1="120" y1="80" x2="432" y2="80" stroke="var(--accent)" stroke-width="2"/>
    <polygon points="440,80 428,75 428,85" fill="var(--accent)"/>
    <text x="280" y="70" font-size="10" fill="var(--text)" text-anchor="middle" font-weight="600">34 ... — RequestDownload</text>

    <line x1="440" y1="120" x2="128" y2="120" stroke="var(--green)" stroke-width="2" stroke-dasharray="6 3"/>
    <polygon points="120,120 132,115 132,125" fill="var(--green)"/>
    <text x="280" y="110" font-size="10" fill="var(--text)" text-anchor="middle" font-weight="600">74 ... — OK (maxBlockLen)</text>

    <rect x="15" y="135" width="210" height="30" rx="6" fill="var(--text)" fill-opacity="0.06" stroke="var(--border)" stroke-width="1"/>
    <text x="120" y="150" font-size="9" fill="var(--text-muted)" text-anchor="middle">Se repite por cada bloque</text>
    <text x="120" y="161" font-size="9" fill="var(--text-muted)" text-anchor="middle">de firmware (36 01, 36 02, ...)</text>

    <line x1="120" y1="195" x2="432" y2="195" stroke="var(--accent)" stroke-width="2"/>
    <polygon points="440,195 428,190 428,200" fill="var(--accent)"/>
    <text x="280" y="185" font-size="10" fill="var(--text)" text-anchor="middle" font-weight="600">36 xx [datos] — TransferData</text>

    <line x1="440" y1="235" x2="128" y2="235" stroke="var(--green)" stroke-width="2" stroke-dasharray="6 3"/>
    <polygon points="120,235 132,230 132,240" fill="var(--green)"/>
    <text x="280" y="225" font-size="10" fill="var(--text)" text-anchor="middle" font-weight="600">76 xx — Block received OK</text>
  </g>
</svg>
<div class="diagram-caption">Al enviar el último bloque, el tester cierra con <b>37 (RequestTransferExit) → 77 (OK)</b>, y finalmente resetea la ECU con <b>11 01 (ECUReset)</b> para que arranque con el firmware nuevo ya instalado.</div>
</div>
<div class="code-block"><div class="code-lang">UDS Flash Sequence — completa</div><pre>
1. Cambiar sesión:
   [10 02]  → Programming Session
   [67 02]  ← OK

2. Security Access (obligatorio para flasheo):
   [27 01]  → RequestSeed
   [67 01 AB CD EF 00]  ← Seed
   [27 02 12 34 56 78]  → SendKey (seed XOR secret_key)
   [67 02]  ← Access granted

3. Desactivar comunicación (evitar interrupciones):
   [28 01 03]  → CommunicationControl: disable TX/RX
   [68 01]  ← OK

4. Borrar memoria flash:
   [31 01 FF 00]  → RoutineControl: EraseMemory
   Esperar respuesta (0x78 = pending, puede tardar segundos)
   [71 01 FF 00]  ← Rutina completada OK

5. Solicitar descarga:
   [34 00 44 00 08 00 00 00 00 20 00 00]
   → RequestDownload (formato, tamaño 0x200000, dirección 0x080000)
   [74 20 01 00]  ← OK, maxBlockLen=0x100 (256 bytes por bloque)

6. Transferir datos (repetir para cada bloque):
   [36 01 XX XX XX ... XX]  → TransferData blockSeqCounter=1, 256 bytes
   [76 01]  ← Block received OK
   [36 02 XX XX XX ... XX]  → TransferData bloque 2...

7. Finalizar transferencia:
   [37]  → RequestTransferExit
   [77]  ← OK

8. Verificar CRC (opcional pero recomendado):
   [31 01 02 02 ...]  → CheckProgrammingDependencies o VerifyFlash

9. Reset y volver a Default:
   [11 01]  → ECUReset (Hard Reset)
   [51 01]  ← OK (si llega respuesta antes del reset)</pre></div>
  </div>
  <div id="du7-3" class="tab-panel">
<table class="kv-table"><tr><th>Síntoma</th><th>Causa probable</th></tr>
<tr><td>NRC 0x33 (securityAccessDenied) al intentar RequestDownload</td><td>Se saltó el paso de SecurityAccess, o expiró la sesión antes de llegar a la transferencia.</td></tr>
<tr><td>NRC 0x24 (requestSequenceError) en TransferData</td><td>Se intentó enviar bloques sin un RequestDownload previo exitoso, o se envió un blockSequenceCounter fuera de orden.</td></tr>
<tr><td>La ECU no responde tras EraseMemory</td><td>El borrado de memoria puede tardar varios segundos — hay que esperar el 0x78 (responsePending) en vez de asumir que la ECU se colgó.</td></tr>
<tr><td>Verificación de CRC falla al final</td><td>Corrupción de datos durante la transferencia — típicamente un problema de la conexión física (cable, adaptador) más que del proceso UDS en sí.</td></tr>
<tr><td>La ECU queda "bricked" tras un corte de energía a mitad del flasheo</td><td>Por eso el bootloader nunca se sobreescribe (ver la pestaña "Qué es el Bootloader") — si esto pasa, normalmente se puede recuperar re-flasheando desde cero, salvo que el corte haya dañado al propio bootloader.</td></tr>
</table>
<div class="alert-card">💡 La regla de oro en cualquier proceso de flasheo real: nunca interrumpir la alimentación de la ECU durante la transferencia — muchos talleres usan una fuente de poder externa estabilizada específicamente para eliminar ese riesgo durante un flasheo largo.</div>
  </div>
</div>
`,

'kwp2000': `
<div class="tab-group-du8">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'du8-1','du8')">Qué es y cuándo se encuentra</button>
    <button class="tab-btn" onclick="switchTab(this,'du8-2','du8')">Comparativa directa</button>
    <button class="tab-btn" onclick="switchTab(this,'du8-3','du8')">Cómo identificarlo en un vehículo real</button>
  </div>
  <div id="du8-1" class="tab-panel active">
<div class="concept-intro"><strong>KWP2000</strong> (Keyword Protocol 2000, ISO 14230) fue el estándar de diagnóstico dominante antes de UDS. Se transmite sobre <strong>K-Line</strong> (un solo hilo, comunicación serie clásica) o, en implementaciones más tardías, sobre CAN usando la misma capa de transporte ISO 15765 que UDS.</div>
<table class="kv-table"><tr><th>Dónde encontrarlo</th><th>Detalle</th></tr>
<tr><td>Antigüedad del vehículo</td><td>Fabricados antes de aproximadamente 2008 — la transición a UDS fue gradual entre 2006 y 2010 según fabricante.</td></tr>
<tr><td>Origen</td><td>Muy común en vehículos europeos y asiáticos de los años 90 y 2000.</td></tr>
<tr><td>Módulos legados</td><td>Incluso en plataformas más nuevas, algunos módulos heredados de generaciones anteriores (ciertos airbag o ABS) pueden seguir usando KWP2000 mientras el resto del vehículo ya usa UDS.</td></tr>
</table>
  </div>
  <div id="du8-2" class="tab-panel">
<table class="kv-table"><tr><th>Característica</th><th>KWP2000</th><th>UDS</th></tr>
<tr><td>Norma</td><td>ISO 14230</td><td>ISO 14229</td></tr>
<tr><td>Transporte físico</td><td>K-Line (ISO 9141) o CAN</td><td>CAN (ISO-TP), Ethernet (DoIP), LIN</td></tr>
<tr><td>SID de sesión</td><td>0x10 (StartDiagnosticSession), 0x92 (Programming, no estandarizado uniformemente)</td><td>0x10 + subfunción estandarizada</td></tr>
<tr><td>Leer datos</td><td>0x21 (ReadDataByLocalIdentifier) o 0x22 (ReadMemoryByAddress)</td><td>0x22 (ReadDataByIdentifier, DID de 2 bytes estandarizado)</td></tr>
<tr><td>Leer DTCs</td><td>0x18 (ReadDTCByStatus)</td><td>0x19 (ReadDTCInformation, con múltiples subfunciones)</td></tr>
<tr><td>Reset</td><td>0x11</td><td>0x11 (mismo SID, formato compatible)</td></tr>
<tr><td>Security Access</td><td>0x27</td><td>0x27 (mismo SID, mismo concepto seed/key)</td></tr>
</table>
<div class="concept-intro">Vale la pena notar que UDS no nació de cero: reutiliza varios SIDs de KWP2000 casi sin cambios (0x11, 0x27) mientras estandariza y reemplaza otros (0x21→0x22, 0x18→0x19) — es una evolución, no una ruptura completa.</div>
  </div>
  <div id="du8-3" class="tab-panel">
<div class="dtree">
  <div class="dtree-title">¿KWP2000 o UDS? Cómo saberlo rápido</div>
  <div class="dtree-step"><div class="dtree-num">1</div><div class="dtree-body"><h5>Revisá el conector y el pinout</h5><p>Si el vehículo usa K-Line (pin 7 del conector J1962 activo, sin actividad en pines 6/14 de CAN), es casi seguro KWP2000 puro sobre K-Line.</p></div></div>
  <div class="dtree-step"><div class="dtree-num">2</div><div class="dtree-body"><h5>Probá el SID de sesión</h5><p>Si <code>[10 03]</code> (Extended Session estilo UDS) no obtiene respuesta pero <code>[10 92]</code> sí, es una señal fuerte de KWP2000 sobre CAN en vez de UDS.</p></div></div>
  <div class="dtree-step"><div class="dtree-num">3</div><div class="dtree-body"><h5>Compará el formato de ReadData</h5><p>Si 0x22 con un DID de 2 bytes no responde pero 0x21 con un identificador de 1 byte sí, estás frente a KWP2000, no UDS.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">4</div><div class="dtree-body"><h5>Consultá la documentación de la ECU si está disponible</h5><p>La forma más confiable siempre es el archivo de diagnóstico oficial (ODX u hoja de especificación) de esa ECU específica, en vez de inferirlo por prueba y error en un vehículo real.</p></div></div>
</div>
  </div>
</div>
`,

};  // fin DIAG_RICH
