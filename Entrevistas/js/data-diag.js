
// ══════════════════════════════════════════════════════════════════
//  DIAG_RICH — Diagnóstico UDS, OBD, DTC
// ══════════════════════════════════════════════════════════════════
const DIAG_RICH = {

'uds-intro': `
<div class="plan-card">
  <div class="plan-card-title">🔍 UDS — Unified Diagnostic Services (ISO 14229)</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es UDS?</div>
    <div class="plan-content">
      <h4>El protocolo de diagnóstico estándar moderno</h4>
      <p>UDS (ISO 14229) es el protocolo de diagnóstico para ECUs en vehículos modernos. Reemplazó al antiguo KWP2000.<br>
      • <b>Modelo Cliente-Servidor:</b> El tester de diagnóstico (Toad, CANoe, herramienta del taller) es el <b>cliente</b>. La ECU bajo prueba es el <b>servidor</b>.<br>
      • <b>Request/Response:</b> El cliente envía un Service Request, la ECU responde con Positive Response (código 0x40+SID) o Negative Response (0x7F + SID + NRC).<br>
      • <b>Transporte:</b> UDS puede correr sobre CAN (vía ISO-TP/ISO 15765), sobre Ethernet (vía DoIP/ISO 13400), o sobre K-Line (KWP2000 legacy).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Sesiones</div>
    <div class="plan-content">
      <h4>Control de acceso por sesión</h4>
      <p>UDS introduce el concepto de <b>sesión</b>: el cliente primero abre la sesión correcta para acceder a los servicios que necesita.<br>
      • <b>Default Session (0x01):</b> Siempre disponible. Lectura de datos básicos, DTCs.<br>
      • <b>Extended Diagnostic Session (0x03):</b> Permite más servicios (escritura de datos, rutinas). Requiere SecurityAccess en algunas ECUs.<br>
      • <b>Programming Session (0x02):</b> Para actualización de firmware (flashing). Requiere SecurityAccess obligatoriamente.<br>
      La sesión vuelve a Default automáticamente si el tester no envía un TesterPresent (0x3E) periódicamente (P2server_max timeout).</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre UDS...</p>
</div>`,

'uds-servicios': `
<div class="plan-card">
  <div class="plan-card-title">✅ UDS — Servicios principales</div>
  <div class="plan-block">
    <div class="plan-time">Servicios clave</div>
    <div class="plan-content">
      <h4>Los SIDs más importantes para entrevistas</h4>
      <table class="ref-table">
        <thead><tr><th>SID</th><th>Servicio</th><th>Uso</th></tr></thead>
        <tbody>
          <tr><td>0x10</td><td>DiagnosticSessionControl</td><td>Cambiar sesión (Default, Extended, Programming)</td></tr>
          <tr><td>0x11</td><td>ECUReset</td><td>Resetear la ECU (Hard, Soft, Key Off/On)</td></tr>
          <tr><td>0x14</td><td>ClearDiagnosticInformation</td><td>Borrar DTCs de la ECU</td></tr>
          <tr><td>0x19</td><td>ReadDTCInformation</td><td>Leer DTCs con subfunction (0x02=confirmed, 0x0A=all)</td></tr>
          <tr><td>0x22</td><td>ReadDataByIdentifier</td><td>Leer datos por DID (Data Identifier 2 bytes). Ej: VIN, versión SW</td></tr>
          <tr><td>0x27</td><td>SecurityAccess</td><td>Autenticación seed/key para servicios protegidos</td></tr>
          <tr><td>0x28</td><td>CommunicationControl</td><td>Activar/desactivar comunicación de la ECU en el bus</td></tr>
          <tr><td>0x2E</td><td>WriteDataByIdentifier</td><td>Escribir datos en la ECU (programar VIN, parámetros)</td></tr>
          <tr><td>0x31</td><td>RoutineControl</td><td>Ejecutar rutinas (verificar flash, borrar memoria, test)</td></tr>
          <tr><td>0x34</td><td>RequestDownload</td><td>Iniciar transferencia de datos hacia la ECU (flasheo)</td></tr>
          <tr><td>0x36</td><td>TransferData</td><td>Transferir bloques de datos (el firmware)</td></tr>
          <tr><td>0x37</td><td>RequestTransferExit</td><td>Finalizar la transferencia de datos</td></tr>
          <tr><td>0x3E</td><td>TesterPresent</td><td>Mantener la sesión viva (keepalive)</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre servicios UDS...</p>
</div>`,

'uds-nrc': `
<div class="plan-card">
  <div class="plan-card-title">❌ UDS — Negative Response Codes (NRC)</div>
  <div class="plan-block">
    <div class="plan-time">Formato NRC</div>
    <div class="plan-content">
      <h4>Estructura de respuesta negativa</h4>
      <div class="code-block"><div class="code-lang">UDS — Negative Response Frame</div><pre>
Negative Response: [0x7F] [SID_solicitado] [NRC]
  0x7F  = Negative Response Identifier (siempre)
  SID   = El servicio que fue rechazado (ej: 0x22 para ReadDataByIdentifier)
  NRC   = Negative Response Code — la razón del rechazo

Ejemplo: El tester pide 0x22 (Read) pero la ECU no reconoce el DID:
  Request:  [22] [0F A0]           ← Leer DID 0x0FA0
  Response: [7F] [22] [31]         ← Rechazado: requestOutOfRange (0x31)</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">NRCs principales</div>
    <div class="plan-content">
      <h4>Códigos de error más comunes</h4>
      <table class="ref-table">
        <thead><tr><th>NRC</th><th>Nombre</th><th>Causa típica</th></tr></thead>
        <tbody>
          <tr><td>0x10</td><td>generalReject</td><td>Error genérico, sin más información</td></tr>
          <tr><td>0x11</td><td>serviceNotSupported</td><td>La ECU no implementa ese SID</td></tr>
          <tr><td>0x12</td><td>subFunctionNotSupported</td><td>El subservice no está implementado</td></tr>
          <tr><td>0x13</td><td>incorrectMessageLengthOrInvalidFormat</td><td>Longitud de mensaje incorrecta</td></tr>
          <tr><td>0x22</td><td>conditionsNotCorrect</td><td>Las condiciones del sistema no permiten el servicio (ej: motor en marcha)</td></tr>
          <tr><td>0x24</td><td>requestSequenceError</td><td>Secuencia incorrecta (ej: pedir Transfer sin Request Download previo)</td></tr>
          <tr><td>0x31</td><td>requestOutOfRange</td><td>DID, RID o parámetro fuera del rango soportado</td></tr>
          <tr><td>0x33</td><td>securityAccessDenied</td><td>SecurityAccess no completado, nivel de acceso insuficiente</td></tr>
          <tr><td>0x35</td><td>invalidKey</td><td>Clave incorrecta en SecurityAccess</td></tr>
          <tr><td>0x78</td><td>requestCorrectlyReceivedResponsePending</td><td>La ECU está procesando, enviará respuesta después (hasta 5s)</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre NRCs UDS...</p>
</div>`,

'uds-sesiones': `
<div class="plan-card">
  <div class="plan-card-title">🔐 UDS — Sesiones y Security Access</div>
  <div class="plan-block">
    <div class="plan-time">Sesiones UDS</div>
    <div class="plan-content">
      <h4>Cómo se controla el acceso a servicios</h4>
      <div class="code-block"><div class="code-lang">UDS — Flujo de sesiones</div><pre>
<span class="c-cm">-- INICIO: Siempre en Default Session</span>
Default Session (0x10 01)
  → Disponible: 0x22, 0x19, 0x3E
  → No disponible: 0x28, 0x2E, 0x31, 0x34-37

<span class="c-cm">-- Para más servicios: Extended Session</span>
Request: [10] [03]  → Extended Diagnostic Session
Response: [50] [03] [00 19] [01 F4]  → OK, P2=25ms, P2*=500ms

  → Disponible: 0x22, 0x19, 0x28, 0x31, 0x2E (si pass SecurityAccess)

<span class="c-cm">-- Para flasheo: Programming Session (requiere SecurityAccess)</span>
Request: [10] [02]  → Programming Session
Request: [27] [01]  → SecurityAccess RequestSeed
Response: [67] [01] [AB CD EF 00]  → Seed = 0xABCDEF00
Request: [27] [02] [12 34 56 78]  → SendKey (cálculo: seed XOR secret)
Response: [67] [02]  → SecurityAccess granted ✓

Ahora disponible: 0x34, 0x36, 0x37 (flasheo)</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre sesiones y Security Access UDS...</p>
</div>`,

'obd2': `
<div class="plan-card">
  <div class="plan-card-title">🔌 OBD-II — On-Board Diagnostics</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es OBD-II?</div>
    <div class="plan-content">
      <h4>Diagnóstico estandarizado de emisiones</h4>
      <p>OBD-II (On-Board Diagnostics II) es el estándar norteamericano (SAE J1979, EPA) y europeo (EOBD) de diagnóstico obligatorio en todos los vehículos desde 1996 (USA) y 2001 (EU).<br>
      • <b>Conector SAE J1962:</b> Conector de 16 pines bajo el tablero del conductor. Pines estándar: pin 6 (CAN High), pin 14 (CAN Low), pin 16 (12V), pin 4/5 (masa).<br>
      • <b>Objetivo original:</b> Control de emisiones. La computadora del motor monitorea catalizador, sonda lambda, EGR, etc., y enciende la luz "Check Engine" si detecta falla.<br>
      • <b>Hoy en día:</b> Usado también para telemetría, diagnóstico de taller, OBD dongles (Bluetooth/WiFi para apps de smartphone).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Modos y PIDs</div>
    <div class="plan-content">
      <h4>Modos 0x01-0x0A con PIDs</h4>
      <table class="ref-table">
        <thead><tr><th>Modo</th><th>Nombre</th><th>Ejemplo</th></tr></thead>
        <tbody>
          <tr><td>0x01</td><td>Current data</td><td>RPM (PID 0x0C), Velocidad (PID 0x0D), Temp refrigerante (PID 0x05)</td></tr>
          <tr><td>0x02</td><td>Freeze frame data</td><td>Datos guardados cuando se registró el último DTC</td></tr>
          <tr><td>0x03</td><td>Show DTCs</td><td>Lista de DTCs confirmados</td></tr>
          <tr><td>0x04</td><td>Clear DTCs</td><td>Borrar DTCs y reset de readiness monitors</td></tr>
          <tr><td>0x05</td><td>O2 sensor data</td><td>Voltaje de sondas lambda</td></tr>
          <tr><td>0x06</td><td>OBDMID test results</td><td>Resultados de tests de misfire, catalizador, etc.</td></tr>
          <tr><td>0x07</td><td>Pending DTCs</td><td>DTCs detectados pero aún no confirmados</td></tr>
          <tr><td>0x09</td><td>Vehicle info</td><td>VIN (PID 0x02), calibration ID</td></tr>
          <tr><td>0x0A</td><td>Permanent DTCs</td><td>DTCs que no se pueden borrar hasta que se repare</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre OBD-II...</p>
</div>`,

'dtc': `
<div class="plan-card">
  <div class="plan-card-title">⚠️ DTCs — Diagnostic Trouble Codes</div>
  <div class="plan-block">
    <div class="plan-time">Formato del código</div>
    <div class="plan-content">
      <h4>Anatomía de un DTC</h4>
      <div class="code-block"><div class="code-lang">DTC — Formato de código</div><pre>
Código DTC: P0301

  P = Sistema: P(owertrain), C(hassis), B(ody), U(network)
  0 = Tipo: 0=SAE estándar, 1,2,3=OEM específico
  3 = Subsistema: 3=Ignition/misfire
  01 = Código específico: 01=Cylinder 1

Ejemplos:
  P0301 = Misfire detectado, cilindro 1
  P0171 = Sistema de combustible demasiado pobre, Banco 1
  B1010 = OEM body code específico
  U0100 = Comunicación CAN perdida con ECM/PCM</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Status Byte</div>
    <div class="plan-content">
      <h4>El DTC Status: más que un código</h4>
      <p>Cada DTC tiene un <b>Status Byte de 8 bits</b> que indica su estado:<br>
      • <b>Bit 0 (testFailed):</b> El test falló en este momento actual.<br>
      • <b>Bit 2 (pendingDTC):</b> Falló en el ciclo actual pero aún no confirmado.<br>
      • <b>Bit 3 (confirmedDTC):</b> Falló en 2+ ciclos de conducción. Enciende la MIL (Check Engine).<br>
      • <b>Bit 4 (testNotCompletedSinceLastClear):</b> No se ha completado el test desde el último borrado.<br>
      • <b>Bit 5 (testFailedSinceLastClear):</b> Ha fallado al menos una vez desde el último borrado.<br>
      <b>Freeze Frame:</b> Snapshot de los PIDs (RPM, velocidad, carga, temperatura) en el momento en que el DTC se confirmó. Vital para diagnóstico.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre DTCs...</p>
</div>`,

'bootloader': `
<div class="plan-card">
  <div class="plan-card-title">💾 Bootloader y proceso de Flashing</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es el Bootloader?</div>
    <div class="plan-content">
      <h4>El software de actualización de firmware</h4>
      <p>El <b>Bootloader</b> es un pequeño programa que vive en una partición protegida de la memoria flash de la ECU. Su función es recibir y escribir el firmware de aplicación (Application Software) en la memoria flash principal.<br>
      Cuando la ECU entra en Programming Session UDS, el bootloader toma control del procesador y espera la transferencia de firmware. El Application Software NO puede flashearse a sí mismo.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Secuencia de flashing</div>
    <div class="plan-content">
      <h4>Proceso completo con UDS</h4>
      <div class="code-block"><div class="code-lang">UDS Flash Sequence</div><pre>
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
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre bootloader y flashing...</p>
</div>`,

'kwp2000': `
<div class="plan-card">
  <div class="plan-card-title">📋 KWP2000 vs UDS — Diagnóstico legado</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es KWP2000?</div>
    <div class="plan-content">
      <h4>Keyword Protocol 2000 — El antecesor de UDS</h4>
      <p>KWP2000 (ISO 14230) fue el estándar de diagnóstico antes de UDS. Se transmite sobre K-Line (un solo hilo, comunicación serie) o sobre CAN (ISO 15765 transport layer, igual que UDS).<br>
      <b>Cuándo lo encontrarás:</b> En vehículos fabricados antes de ~2008. Vehículos europeos/asiáticos de los 90s y 2000s. Aún es legal en módulos legados (airbag, ABS de modelos anteriores).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">KWP2000 vs UDS</div>
    <div class="plan-content">
      <h4>Diferencias clave</h4>
      <table class="ref-table">
        <thead><tr><th>Característica</th><th>KWP2000</th><th>UDS</th></tr></thead>
        <tbody>
          <tr><td>Norma</td><td>ISO 14230</td><td>ISO 14229</td></tr>
          <tr><td>Transporte físico</td><td>K-Line (ISO 9141) o CAN</td><td>CAN (ISO-TP), Ethernet (DoIP), LIN</td></tr>
          <tr><td>SID de sesión</td><td>0x10 (Default), 0x92 (Programming)</td><td>0x10 + subfunction</td></tr>
          <tr><td>Leer datos</td><td>0x21 (LocalId) o 0x22 (Memory)</td><td>0x22 (DID único 2 bytes)</td></tr>
          <tr><td>Leer DTCs</td><td>0x18 (ReadDTCByStatus)</td><td>0x19 (con múltiples subfunctions)</td></tr>
          <tr><td>Reset</td><td>0x11</td><td>0x11 (igual)</td></tr>
          <tr><td>Security Access</td><td>0x27</td><td>0x27 (igual)</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre KWP2000 y diagnóstico legado...</p>
</div>`,

};  // fin DIAG_RICH
