
// ══════════════════════════════════════════════════════════════════
//  PROTO_RICH — Protocolos de comunicación vehicular
// ══════════════════════════════════════════════════════════════════
const PROTO_RICH = {

'can-fundamentos': `
<div class="plan-card">
  <div class="plan-card-title">📶 CAN Bus — Controller Area Network</div>
  <div class="plan-block">
    <div class="plan-time">Características</div>
    <div class="plan-content">
      <h4>ISO 11898 — El bus estándar automotriz</h4>
      <p>CAN (Controller Area Network) fue desarrollado por Bosch en 1986. Es el protocolo de comunicación más usado en vehículos para control en tiempo real.<br>
      • <b>Velocidad:</b> Classic CAN hasta 1 Mbit/s. CAN FD hasta 8 Mbit/s (fase de datos).<br>
      • <b>Bus diferencial:</b> Dos hilos CANH y CANL. La diferencia de voltaje define el bit (CANH-CANL &gt; 0.9V = dominante=0; diferencia ≈0 = recesivo=1). Inmune a ruido eléctrico.<br>
      • <b>Sin dirección IP:</b> Los mensajes se identifican por un <b>ID de mensaje</b> (11 o 29 bits), no por dirección de nodo.<br>
      • <b>CSMA/CD:</b> Múltiple acceso con detección de colisión y arbitraje por ID. El ID más bajo gana el bus.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Bit Stuffing</div>
    <div class="plan-content">
      <h4>Mecanismo de sincronización</h4>
      <p>Después de 5 bits consecutivos del mismo valor, se inserta un bit de relleno (stuff bit) del valor contrario. Esto garantiza transiciones en el bus para que los nodos puedan sincronizarse. Los receptores ignoran estos bits de relleno al decodificar.</p>
      <div class="p-chips"><span class="p-chip">11111 → 111110</span><span class="p-chip">00000 → 000001</span><span class="p-chip">Sincronización</span></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Topología</div>
    <div class="plan-content">
      <h4>Bus lineal con terminadores</h4>
      <p>CAN usa topología de <b>bus lineal</b> con dos resistencias de terminación de 120Ω en cada extremo. Sin terminadores el bus refleja señales y falla. Máximo ~30 nodos por bus en la práctica. Longitud máxima a 1 Mbit/s: ~40m (a 250 kbit/s: ~250m). Para más nodos o mayor distancia: Gateway.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre CAN Bus...</p>
</div>`,

'can-trama': `
<div class="plan-card">
  <div class="plan-card-title">📊 Trama CAN — Estructura detallada</div>
  <div class="plan-block">
    <div class="plan-time">Data Frame</div>
    <div class="plan-content">
      <h4>Campos de la trama CAN (Data Frame)</h4>
      <div class="code-block"><div class="code-lang">CAN Frame — 11 bit ID (Standard)</div><pre>
┌─────┬─────────────┬──────┬──────────┬──────┬─────┬─────┐
│ SOF │ ID (11 bit) │  RTR │  Control  │ Data │ CRC │ ACK │ EOF
│  1  │     11      │  1   │ 6 bits   │ 0-64 │ 15+1│ 2   │  7
└─────┴─────────────┴──────┴──────────┴──────┴─────┴─────┘

SOF     = Start Of Frame (1 bit dominante, inicia sincronización)
ID      = Identificador del mensaje (define prioridad y contenido)
RTR     = Remote Transmission Request (0=data frame, 1=remote frame)
Control = IDE (0=std, 1=extended) + r0 + DLC (4 bits, longitud datos 0-8)
Data    = Datos de la aplicación: 0 a 8 bytes
CRC     = Cyclic Redundancy Check (15 bits + 1 delimitador)
ACK     = Reconocimiento (1 bit: cualquier receptor escribe 0 si recibió OK)
EOF     = End of Frame (7 bits recesivos)</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Extended ID</div>
    <div class="plan-content">
      <h4>Trama extendida (29 bits de ID)</h4>
      <p>La trama extendida usa 29 bits de ID en lugar de 11. Necesaria cuando hay muchos mensajes en el bus. El bit IDE=1 indica que es extendida. El ID total se divide en Base ID (11 bits) + Extension (18 bits).<br>
      Se usa en J1939 (vehículos pesados, camiones, agricultura) donde el ID codifica Source Address, Parameter Group Number (PGN), y prioridad.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre la trama CAN...</p>
</div>`,

'can-fd': `
<div class="plan-card">
  <div class="plan-card-title">⚡ CAN FD — Flexible Data Rate</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es CAN FD?</div>
    <div class="plan-content">
      <h4>Más velocidad y más payload — misma compatibilidad</h4>
      <p>CAN FD (ISO 11898-1:2015) es la evolución del CAN clásico. Mantiene el mismo mecanismo de arbitraje pero añade dos mejoras clave:<br>
      1. <b>Payload extendido:</b> Hasta 64 bytes por trama (vs 8 bytes en CAN clásico).<br>
      2. <b>Velocidad dual:</b> El arbitraje ocurre a velocidad normal (≤1 Mbit/s) y la fase de datos sube hasta 8 Mbit/s.<br>
      El indicador BRS (Bit Rate Switch) en la trama marca cuándo cambia la velocidad.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Compatibilidad</div>
    <div class="plan-content">
      <h4>CAN FD y Classic CAN en el mismo bus</h4>
      <p>Los controladores CAN FD son <b>retrocompatibles</b>: pueden comunicarse con nodos Classic CAN a la velocidad normal. Sin embargo, un nodo Classic CAN en el bus generará un error si detecta una trama CAN FD (interpretará los bytes extra como errores de stuffing). Por esto, en redes mixtas se usa <b>CAN FD con configuración "Classic compatible"</b> o se separan los buses.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Aplicaciones</div>
    <div class="plan-content">
      <h4>¿Cuándo usar CAN FD?</h4>
      <p>• Flasheo de firmware (bootloader): enviar 64 bytes por trama acelera el proceso de download.<br>
      • Calibración XCP: más datos de medición por trama.<br>
      • Diagnóstico (ISOTP sobre CAN FD): mensajes más grandes.<br>
      • Reemplaza algunas redes FlexRay en aplicaciones menos críticas en timing.<br>
      Adoptado por BMW, GM, FCA desde ~2015. Prácticamente estándar en vehículos nuevos.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre CAN FD...</p>
</div>`,

'can-ejemplo': `
<div class="plan-card">
  <div class="plan-card-title">🔑 Ejemplo práctico — Mensaje de ignición CAN</div>
  <div class="plan-block">
    <div class="plan-time">Escenario</div>
    <div class="plan-content">
      <h4>Trazando el mensaje de encendido</h4>
      <p>Cuando el conductor gira la llave o pulsa el botón de arranque:<br>
      1. El BCM detecta el evento y transmite un mensaje CAN: <code>ID=0x105, Data=[01 00 00 00]</code> — estado de ignición = ON.<br>
      2. El Gateway recibe el mensaje, filtra y enruta a los buses de destino.<br>
      3. El TCM (Transmission Control Module) y el ECM (Engine Control Module) reciben el mensaje y se inicializan.<br>
      4. El cuadro de instrumentos recibe el mensaje y enciende las luces de advertencia durante el ciclo de arranque.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">DBC File</div>
    <div class="plan-content">
      <h4>Cómo se documenta en CANdb</h4>
      <div class="code-block"><div class="code-lang">DBC — Definición de mensaje de ignición</div><pre>
<span class="c-cm">-- Mensaje de ignición del BCM</span>
BO_ 261 IGN_STATUS: 4 BCM
 SG_ IgnitionKey : 0|2@1+ (1,0) [0|0] "" ECM,TCM,ICM
 SG_ KeyPosition : 2|3@1+ (1,0) [0|3] "" ECM
 SG_ StartButton : 5|1@1+ (1,0) [0|1] "" ECM

<span class="c-cm">-- Valores para IgnitionKey</span>
VAL_ 261 IgnitionKey 0 "OFF" 1 "ACC" 2 "ON" 3 "START" ;
VAL_ 261 KeyPosition 0 "LOCK" 1 "ACC" 2 "ON" 3 "START" ;

<span class="c-cm">-- ID 261 decimal = 0x105 hexadecimal</span>
<span class="c-cm">-- BCM = transmisor, ECM+TCM+ICM = receptores</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre DBC y mensajes CAN...</p>
</div>`,

'lin': `
<div class="plan-card">
  <div class="plan-card-title">📻 LIN Bus — Local Interconnect Network</div>
  <div class="plan-block">
    <div class="plan-time">Características</div>
    <div class="plan-content">
      <h4>El bus de bajo costo para funciones simples</h4>
      <p>LIN fue creado en 1999 para reemplazar cableado punto a punto en funciones simples de carrocería. Sus características:<br>
      • <b>Single wire:</b> Solo 1 hilo (más masa del chasis). Muy barato de implementar.<br>
      • <b>20 kbit/s:</b> Velocidad baja, suficiente para sensores y actuadores lentos.<br>
      • <b>Maestro-Esclavo:</b> 1 nodo Master (generalmente el BCM) y hasta 16 Slaves. El Master controla todo el acceso al bus.<br>
      • <b>No hay colisiones:</b> El Master envía headers con Schedule Table, los Slaves responden en su turno. Protocolo determinista.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Usos típicos</div>
    <div class="plan-content">
      <h4>Aplicaciones comunes de LIN</h4>
      <p>• Módulos de ventana eléctrica (posición, anti-pinch)<br>
      • Sensores de lluvia/luz (activan limpiaparabrisas y luces automáticas)<br>
      • Control de espejos laterales (motor de posición x2)<br>
      • Asientos eléctricos (control de posición)<br>
      • Control de climatización (dampers y ventiladores)<br>
      • Luces de interior con dimmer<br>
      Todos estos nodos LIN se conectan al BCM que actúa como Master.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Trama LIN</div>
    <div class="plan-content">
      <h4>Header + Response</h4>
      <p>La trama LIN tiene dos partes: el Master envía el <b>Header</b> (Break+Sync+PID), y el Slave designado (según el PID) envía el <b>Response</b> (hasta 8 bytes de datos + checksum). Todos los slaves escuchan el Header y solo el designado responde. Versiones: LIN 1.x, LIN 2.x, LIN 2.2A (más usado).</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre LIN Bus...</p>
</div>`,

'flexray': `
<div class="plan-card">
  <div class="plan-card-title">🚀 FlexRay — Bus determinista de alta velocidad</div>
  <div class="plan-block">
    <div class="plan-time">¿Por qué FlexRay?</div>
    <div class="plan-content">
      <h4>Cuando CAN no es suficiente</h4>
      <p>FlexRay (ISO 17458) fue desarrollado por BMW, Bosch, DaimlerChrysler y Philips para aplicaciones donde CAN no cumple los requisitos:<br>
      • <b>Determinismo:</b> Usando TDMA (Time Division Multiple Access), cada mensaje se transmite en un slot de tiempo fijo y predefinido. Ideal para control de chassis (by-wire).<br>
      • <b>10 Mbit/s:</b> 10 veces más rápido que CAN.<br>
      • <b>Doble canal:</b> Canal A y Canal B independientes. Redundancia para sistemas safety-critical.<br>
      • <b>Sincronización:</b> El protocolo incluye sincronización de reloj entre nodos.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Aplicaciones</div>
    <div class="plan-content">
      <h4>ADAS, suspension activa, by-wire</h4>
      <p>FlexRay se usa en:<br>
      • <b>Chassis-by-wire:</b> Steer-by-wire, brake-by-wire (el feedback de la dirección va por cable, no mecánico)<br>
      • <b>Suspensión activa:</b> El sistema reacciona a la carretera en ms, requiere muy baja latencia<br>
      • <b>ADAS de alta frecuencia:</b> Integración de datos de sensores a 10 ms o menos<br>
      BMW lo usa en sus modelos Serie 7 y 5 para el chassis. Audi, Mercedes también.<br>
      <b>Estado actual:</b> FlexRay está siendo desplazado por Automotive Ethernet en los nuevos diseños. Más costoso de implementar que CAN/ETH.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre FlexRay...</p>
</div>`,

'eth-auto': `
<div class="plan-card">
  <div class="plan-card-title">🌐 Automotive Ethernet</div>
  <div class="plan-block">
    <div class="plan-time">¿Por qué Ethernet en autos?</div>
    <div class="plan-content">
      <h4>Ancho de banda masivo con un par de hilos</h4>
      <p>Automotive Ethernet adapta el Ethernet estándar al entorno vehicular:<br>
      • <b>100BASE-T1</b> (IEEE 802.3bw): 100 Mbit/s sobre 1 par de hilos no trenzados. 15m máx. Para cámaras y sensores ADAS.<br>
      • <b>1000BASE-T1</b> (IEEE 802.3bp): 1 Gbit/s. Para HPC y backbone Ethernet vehicular.<br>
      • <b>10G y 100G:</b> En desarrollo para futuros HPC y data centers vehiculares.<br>
      Tecnología base: <b>BroadR-Reach</b> de Broadcom (ahora estándar IEEE). Sin transformadores de aislamiento (por eso 1 par en vez de 4).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Aplicaciones</div>
    <div class="plan-content">
      <h4>Casos de uso en el vehículo</h4>
      <p>• <b>Cámaras:</b> Una cámara HD genera ~100 Mbit/s. CAN es imposible, Ethernet es la solución.<br>
      • <b>ADAS:</b> Fusión de datos de sensores requiere alto ancho de banda.<br>
      • <b>Backbone zonal:</b> El backbone del vehículo (central a zonas) corre sobre 1G o 10G Ethernet.<br>
      • <b>OBD y diagnóstico:</b> DoIP (Diagnóstico UDS sobre IP) es más rápido que CAN para flashing.<br>
      • <b>Actualización OTA:</b> Descargar firmware grande (GB) requiere Ethernet.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre Automotive Ethernet...</p>
</div>`,

'someip': `
<div class="plan-card">
  <div class="plan-card-title">🔗 SOME/IP — Scalable service-Oriented MiddlEware over IP</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es?</div>
    <div class="plan-content">
      <h4>Middleware de comunicación Service-Oriented</h4>
      <p>SOME/IP es el middleware de comunicación estándar de AUTOSAR Adaptive. Permite implementar una <b>SOA (Service-Oriented Architecture)</b> en el vehículo sobre Automotive Ethernet (UDP/TCP).<br>
      Conceptos clave:<br>
      • <b>Service:</b> Una funcionalidad ofrecida (ej: servicio de velocidad del vehículo).<br>
      • <b>Method:</b> Función que se puede llamar remotamente (como RPC).<br>
      • <b>Event:</b> Notificación que el servicio envía cuando cambia un valor.<br>
      • <b>Field:</b> Atributo del servicio con getter/setter y notificaciones.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Service Discovery</div>
    <div class="plan-content">
      <h4>SOME/IP-SD — Cómo los servicios se encuentran</h4>
      <p>SOME/IP Service Discovery (SOME/IP-SD) permite que los servicios se descubran dinámicamente en la red:<br>
      1. Un servidor (service provider) envía un <b>OfferService</b> multicast para anunciar que está disponible.<br>
      2. Un cliente envía un <b>FindService</b> para buscar un servicio específico.<br>
      3. El servidor responde con <b>OfferService</b> unicast al cliente.<br>
      4. El cliente subscribe a los eventos que le interesan (EventGroup subscription).<br>
      Esto es fundamental en Adaptive AUTOSAR donde los servicios pueden iniciarse y detenerse dinámicamente.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre SOME/IP...</p>
</div>`,

'doip': `
<div class="plan-card">
  <div class="plan-card-title">🩺 DoIP — Diagnostics over IP</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es?</div>
    <div class="plan-content">
      <h4>UDS sobre Ethernet — ISO 13400</h4>
      <p>DoIP (Diagnostics over Internet Protocol) es el protocolo que permite transmitir mensajes UDS sobre Ethernet en lugar de CAN. Definido en ISO 13400.<br>
      <b>¿Por qué?</b> Con Automotive Ethernet en los vehículos modernos, el diagnóstico puede ser mucho más rápido:<br>
      • Flasheo de firmware: Por CAN ~30min, por DoIP ~5min (mismo firmware).<br>
      • Diagnóstico remoto: Con telemática + DoIP se puede diagnosticar el vehículo remotamente.<br>
      • Taller del futuro: El técnico conecta un cable Ethernet al OBD-II y usa un scanner DoIP.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Flujo de conexión</div>
    <div class="plan-content">
      <h4>Cómo se establece una sesión DoIP</h4>
      <p>1. El tester (externo) se conecta al conector OBD-II por Ethernet o WiFi.<br>
      2. <b>Vehicle Announcement:</b> El vehículo anuncia por UDP (puerto 13400) su presencia con VIN, EID, GID.<br>
      3. El tester solicita <b>Routing Activation</b> al DoIP Gateway (la ECU central con acceso a las redes internas).<br>
      4. El DoIP Gateway autentica y activa el enrutamiento.<br>
      5. El tester envía mensajes UDS encapsulados en DoIP. El Gateway los desencapsula y los envía al bus CAN/ETH interno.<br>
      6. La ECU destino responde. El Gateway encapsula la respuesta y la devuelve al tester.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre DoIP...</p>
</div>`,

'xcp': `
<div class="plan-card">
  <div class="plan-card-title">📈 XCP — Universal Measurement and Calibration Protocol</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es XCP?</div>
    <div class="plan-content">
      <h4>Medición y calibración en tiempo real</h4>
      <p>XCP (eXtended Calibration Protocol) es el estándar de la industria automotriz para medir variables internas de una ECU y escribir parámetros de calibración en tiempo real, mientras el software está corriendo.<br>
      • <b>Medición:</b> Lee variables de memoria de la ECU (señales del motor, temperaturas, presiones) sin detener la ejecución.<br>
      • <b>Calibración:</b> Escribe valores en la memoria de calibración (parámetros de control PID, lookup tables, thresholds) para ajustar el comportamiento del sistema.<br>
      • <b>Flash programming:</b> Puede actualizar la memoria flash de la ECU.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">A2L y herramientas</div>
    <div class="plan-content">
      <h4>Descripción de la ECU y herramientas de calibración</h4>
      <p>El archivo <b>A2L (ASAM MCD-2 MC)</b> describe qué variables existen en la ECU, dónde están en memoria (dirección), su tipo de datos, factor de escala y offset. Es el "mapa" de la ECU para las herramientas de calibración.<br>
      <b>Herramientas:</b><br>
      • <b>CANoe</b> (Vector): Soporte XCP integrado. Panel de medición en tiempo real.<br>
      • <b>INCA</b> (ETAS): Herramienta especializada en calibración. Muy usada en Bosch, Continental.<br>
      • <b>CANape</b> (Vector): Similar a INCA. Popular en BMW, Audi.<br>
      • <b>ETK:</b> Hardware de acceso directo a memoria de la ECU para XCP ultra-rápido.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre XCP...</p>
</div>`,

'proto-comparativa': `
<div class="plan-card">
  <div class="plan-card-title">⚖️ CAN vs LIN vs Ethernet vs FlexRay — Comparativa</div>
  <div class="plan-block">
    <div class="plan-time">Tabla comparativa</div>
    <div class="plan-content">
      <h4>Cuándo usar cada protocolo</h4>
      <table class="ref-table" style="margin-top:10px">
        <thead><tr><th>Protocolo</th><th>Velocidad</th><th>Costo</th><th>Topología</th><th>Nodos</th><th>Uso típico</th></tr></thead>
        <tbody>
          <tr><td>CAN Classic</td><td>1 Mbit/s</td><td>Bajo</td><td>Bus lineal</td><td>~30</td><td>Powertrain, Chassis, Body</td></tr>
          <tr><td>CAN FD</td><td>8 Mbit/s</td><td>Bajo</td><td>Bus lineal</td><td>~30</td><td>Flasheo, calibración, diag</td></tr>
          <tr><td>LIN</td><td>20 kbit/s</td><td>Muy bajo</td><td>Bus maestro-esclavo</td><td>16</td><td>Ventanas, espejos, sensores</td></tr>
          <tr><td>FlexRay</td><td>10 Mbit/s</td><td>Alto</td><td>Bus dual canal</td><td>~64</td><td>By-wire, ADAS crítico</td></tr>
          <tr><td>ETH 100M</td><td>100 Mbit/s</td><td>Medio</td><td>Estrella/punto a punto</td><td>Ilimitado</td><td>Cámaras, ADAS</td></tr>
          <tr><td>ETH 1G+</td><td>1+ Gbit/s</td><td>Medio</td><td>Estrella/punto a punto</td><td>Ilimitado</td><td>Backbone, HPC, OTA</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Regla de selección</div>
    <div class="plan-content">
      <h4>¿Cómo elegir el protocolo correcto?</h4>
      <p>• Función simple y lenta (ventanas, espejos) → <b>LIN</b><br>
      • Control en tiempo real, ≤1 Mbit/s → <b>CAN Classic</b><br>
      • Control + calibración/flasheo, &lt;8 Mbit/s → <b>CAN FD</b><br>
      • Safety-critical determinista (by-wire) → <b>FlexRay</b><br>
      • Video, cámaras, ADAS (&gt;10 Mbit/s) → <b>Ethernet 100M</b><br>
      • Backbone, HPC, OTA → <b>Ethernet 1G+</b></p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega tus notas sobre comparativa de protocolos...</p>
</div>`,

'proto-capas': `
<div class="plan-card">
  <div class="plan-card-title">🗂️ Modelo OSI aplicado a protocolos automotrices</div>
  <div class="plan-block">
    <div class="plan-time">OSI en CAN</div>
    <div class="plan-content">
      <h4>CAN implementa solo capas 1 y 2</h4>
      <div class="code-block"><div class="code-lang">OSI Model — Protocolos automotrices</div><pre>
Capa 7: Aplicación  │ UDS/ISO 14229  │ SOME/IP    │ HTTP, MQTT
Capa 6: Presentación│     —          │    —       │    —
Capa 5: Sesión      │     —          │    —       │    —
Capa 4: Transporte  │ ISO-TP (15765) │ TCP/UDP    │ TCP/UDP
Capa 3: Red         │     —          │ IP (IPv4/6)│ IP
Capa 2: Enlace datos│ CAN Data Link  │ Ethernet   │ Ethernet
Capa 1: Física      │ CAN Physical   │ 100BASE-T1 │ 100BASE-TX
        (ISO 11898-1) (ISO 11898-2)   (IEEE 802.3bw)

Protocolos: CAN          DoIP/SOME/IP     Ethernet est.</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">ISO-TP y UDS</div>
    <div class="plan-content">
      <h4>¿Cómo UDS corre sobre CAN?</h4>
      <p>UDS envía mensajes que pueden ser más grandes que 8 bytes. Para eso se usa <b>ISO-TP (ISO 15765-2)</b> en la capa de transporte:<br>
      • <b>Single Frame (SF):</b> Mensaje ≤7 bytes, cabe en 1 trama CAN.<br>
      • <b>First Frame + Consecutive Frames (FF+CF):</b> Mensaje grande dividido. El receptor confirma con Flow Control (FC).<br>
      Este mecanismo de segmentación/reensamblado es la capa de transporte de UDS sobre CAN. Sobre Ethernet, UDS usa TCP directamente (DoIP proporciona la capa de sesión/routing).</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre OSI y protocolos automotrices...</p>
</div>`,

'proto-topologias': `
<div class="plan-card">
  <div class="plan-card-title">🕸️ Topologías de red vehicular</div>
  <div class="plan-block">
    <div class="plan-time">Topologías por protocolo</div>
    <div class="plan-content">
      <h4>Bus lineal, estrella, maestro-esclavo</h4>
      <p><b>CAN → Bus lineal con terminadores:</b> Todos los nodos comparten el mismo cable. Dos resistencias de 120Ω en los extremos. Sencillo, barato, pero si el cable se rompe a la mitad, ambos segmentos fallan.<br>
      <b>LIN → Maestro-esclavo:</b> Un hilo, el Master controla el acceso. Los Slaves solo responden cuando se les pregunta. No hay colisiones.<br>
      <b>Ethernet → Estrella (switched):</b> Cada nodo se conecta a un switch Ethernet central. El switch gestiona el tráfico sin colisiones. Permite velocidades mayores y redundancia.<br>
      <b>FlexRay → Bus lineal o estrella activa:</b> Soporta ambas. La estrella activa (Star Coupler) mejora la flexibilidad pero requiere hardware extra.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Ejemplo real</div>
    <div class="plan-content">
      <h4>Topología típica de un auto moderno</h4>
      <p>Un sedan moderno puede tener:<br>
      • <b>CAN Powertrain:</b> ECM, TCM, Hybrid Controller (bus lineal, 500 kbit/s)<br>
      • <b>CAN Chassis:</b> ABS, ESP, Steering (bus lineal, 500 kbit/s)<br>
      • <b>CAN Interior:</b> BCM, cuadro, climatización (bus lineal, 125 kbit/s)<br>
      • <b>LIN × 3-5:</b> Módulos de ventana, espejos, sensores<br>
      • <b>Ethernet:</b> Cámaras, ADAS, pantalla central (estrella con switch)<br>
      • <b>Gateway:</b> Nodo central que interconecta todos los buses CAN y el switch Ethernet</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre topologías vehiculares...</p>
</div>`,

'proto-bitrate': `
<div class="plan-card">
  <div class="plan-card-title">⏱️ Bit Rate y Sincronización CAN</div>
  <div class="plan-block">
    <div class="plan-time">Time Quanta (Tq)</div>
    <div class="plan-content">
      <h4>Unidad básica de tiempo en CAN</h4>
      <p>El bit time en CAN se divide en <b>Time Quanta (Tq)</b>. Un Time Quanta es el período mínimo del oscilador dividido por el prescaler del controlador CAN:<br>
      <code>Tq = prescaler / f_clk</code><br>
      Un bit CAN se divide en segmentos:<br>
      • <b>Sync_Seg:</b> 1 Tq — Para sincronización de flanco.<br>
      • <b>Prop_Seg:</b> 1-8 Tq — Compensación de delay de propagación.<br>
      • <b>Phase_Seg1:</b> 1-8 Tq — Puede extenderse para resync.<br>
      • <b>Phase_Seg2:</b> 2-8 Tq — Puede reducirse para resync. El punto de muestreo está al final de Phase_Seg1.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Ejemplo de cálculo</div>
    <div class="plan-content">
      <h4>Configurar 500 kbit/s con reloj de 16 MHz</h4>
      <div class="code-block"><div class="code-lang">Cálculo de bit timing CAN a 500 kbit/s</div><pre>
f_clk = 16 MHz
Baud Rate Prescaler (BRP) = 4
Tq = BRP / f_clk = 4 / 16MHz = 250 ns

Bit time = 1 / 500kbps = 2000 ns
Número de Tq por bit = 2000 ns / 250 ns = 8 Tq

Distribución de 8 Tq:
  Sync_Seg   = 1 Tq   (fijo)
  Prop_Seg   = 3 Tq
  Phase_Seg1 = 2 Tq
  Phase_Seg2 = 2 Tq
  Total      = 8 Tq ✓

Punto de muestreo = (1+3+2)/8 = 75% del bit time
SJW = min(Phase_Seg1, Phase_Seg2) = 2 Tq (máx ajuste por resync)</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre bit timing CAN...</p>
</div>`,

};  // fin PROTO_RICH
