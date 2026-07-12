
// ══════════════════════════════════════════════════════════════════
//  AUTO_RICH — Arquitectura Automotriz
// ══════════════════════════════════════════════════════════════════
const AUTO_RICH = {

'arch-intro': `
<div class="plan-card">
  <div class="plan-card-title">🏗️ E/E Architecture — Conceptos fundamentales</div>
  <div class="plan-block">
    <div class="plan-time">Definición</div>
    <div class="plan-content">
      <h4>¿Qué es la E/E Architecture?</h4>
      <p>La arquitectura Electrical/Electronic (E/E) de un vehículo define cómo se organizan las ECUs, los sensores, los actuadores y las redes de comunicación. Es el "plano" de toda la electrónica del auto. En un vehículo moderno pueden coexistir más de 100 ECUs conectadas por múltiples buses.</p>
      <div class="p-chips"><span class="p-chip">ECU</span><span class="p-chip">Bus topology</span><span class="p-chip">CAN / LIN / ETH</span></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Distribuida vs Centralizada</div>
    <div class="plan-content">
      <h4>Evolución de la arquitectura</h4>
      <p><b>Distribuida (clásica):</b> Cada función tiene su propia ECU (BCM, TCM, ABS…). Simple de escalar, pero la cantidad de ECUs y cableado crece exponencialmente.<br>
      <b>Domain-based:</b> Un Domain Controller por dominio (Powertrain, Chassis, ADAS). Reduce ECUs, simplifica comunicación.<br>
      <b>Zonal/Centralizada (tendencia):</b> Pocas ECUs de zona potentes conectadas por Ethernet. Ejemplo: Tesla usa HPC (High Performance Computer). Reduce peso y complejidad.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Redes vehiculares</div>
    <div class="plan-content">
      <h4>Tipos de bus según aplicación</h4>
      <p><b>CAN:</b> Control en tiempo real (motor, frenos, transmisión). Hasta 1 Mbit/s.<br>
      <b>LIN:</b> Sensores y actuadores simples (ventanas, iluminación). 20 kbit/s.<br>
      <b>FlexRay:</b> Safety-critical de alto ancho de banda (ADAS, by-wire). 10 Mbit/s determinista.<br>
      <b>MOST:</b> Multimedia/infotainment. Hasta 150 Mbit/s en fibra óptica.<br>
      <b>Automotive Ethernet:</b> ADAS, cámaras, HPC. 100 Mbit/s a 10 Gbit/s sobre un par de hilos.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre E/E Architecture...</p>
</div>`,

'arch-adas': `
<div class="plan-card">
  <div class="plan-card-title">🚗 ADAS — Advanced Driver Assistance Systems</div>
  <div class="plan-block">
    <div class="plan-time">Sensores ADAS</div>
    <div class="plan-content">
      <h4>LIDAR, RADAR, Cámara, Ultrasónico</h4>
      <p><b>RADAR:</b> Largo alcance (200m+), funciona en lluvia/niebla, detecta velocidad (efecto Doppler). Usado en ACC y AEB.<br>
      <b>LIDAR:</b> Nube de puntos 3D, alta precisión, alcance ~100-150m. Caro. Sensible a lluvia intensa.<br>
      <b>Cámara:</b> Reconocimiento de señales, carril, peatones. Requiere visibilidad. Bajo costo.<br>
      <b>Ultrasónico:</b> Corto alcance (~5m). Estacionamiento/Blind Spot. Muy barato y robusto.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Niveles SAE</div>
    <div class="plan-content">
      <h4>Autonomía L0-L5</h4>
      <p><b>L0:</b> Sin automatización. Solo alertas.<br>
      <b>L1:</b> Asistencia en 1 eje (solo dirección O aceleración/freno). ACC, Lane Keeping.<br>
      <b>L2:</b> Asistencia combinada. Tesla Autopilot. El conductor supervisa siempre.<br>
      <b>L3:</b> Automatización condicional. El sistema conduce, conductor puede quitarse las manos. Requiere asumir control si el sistema lo pide. Mercedes EQS, Honda Legend.<br>
      <b>L4:</b> Alta automatización. En geofence definida no necesita conductor. Waymo, Wayve.<br>
      <b>L5:</b> Autonomía total en cualquier condición. Aún no existe comercialmente.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Funciones clave</div>
    <div class="plan-content">
      <h4>ACC, AEB, Lane Keeping y más</h4>
      <p><b>ACC</b> (Adaptive Cruise Control): Mantiene velocidad Y distancia al vehículo de adelante. Usa RADAR.<br>
      <b>AEB</b> (Automatic Emergency Braking): Frena automáticamente si detecta colisión inminente. RADAR+Cámara.<br>
      <b>LKA</b> (Lane Keeping Assist): Corrige dirección si el vehículo sale del carril. Usa cámara.<br>
      <b>BSD</b> (Blind Spot Detection): Detecta vehículos en punto ciego. RADAR trasero.<br>
      <b>APA</b> (Automatic Parking Assist): Estacionamiento automatizado. Ultrasónico+Cámara.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tu experiencia con ADAS...</p>
</div>`,

'arch-bcm': `
<div class="plan-card">
  <div class="plan-card-title">💡 BCM — Body Control Module</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué controla?</div>
    <div class="plan-content">
      <h4>Funciones del BCM</h4>
      <p>El BCM es el "mayordomo" del vehículo. Gestiona todas las funciones de carrocería (no críticas para conducción):<br>
      • Iluminación exterior e interior (faros, luces de posición, cortesía)<br>
      • Ventanas eléctricas y techo solar<br>
      • Seguros de puertas (central locking)<br>
      • Limpiaparabrisas y lavaparabrisas<br>
      • Control de espejos laterales<br>
      • Alarma del vehículo y inmovilizador<br>
      • Sistema de entrada sin llave (keyless entry)</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Comunicación</div>
    <div class="plan-content">
      <h4>LIN para nodos + CAN hacia Gateway</h4>
      <p>El BCM actúa como <b>LIN Master</b>: controla nodos LIN (módulos de ventana, sensores de lluvia, motores de espejo). Los nodos LIN son simples y baratos (LIN Slave).<br>
      Hacia el resto del vehículo, el BCM se conecta al <b>Gateway por CAN</b>: envía y recibe mensajes de estado (puerta abierta, luz encendida) que otras ECUs necesitan (cuadro de instrumentos, alarma).</p>
      <div class="p-chips"><span class="p-chip">LIN Master</span><span class="p-chip">CAN Node</span><span class="p-chip">Gateway client</span></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre BCM...</p>
</div>`,

'arch-gateway': `
<div class="plan-card">
  <div class="plan-card-title">🔀 Gateway ECU — El enrutador vehicular</div>
  <div class="plan-block">
    <div class="plan-time">Función principal</div>
    <div class="plan-content">
      <h4>Traducción y enrutamiento entre redes</h4>
      <p>El Gateway conecta diferentes buses (CAN de Powertrain, CAN de Carrocería, LIN, Ethernet ADAS) y traduce los mensajes entre ellos. Sin Gateway, un bus CAN de motor no podría comunicarse con la red Ethernet del sistema de info-entretenimiento.<br>
      Ejemplo: el mensaje de velocidad del ABS (CAN Chassis) es traducido y reenviado al cuadro de instrumentos (CAN Interior) y al control de tracción (CAN Powertrain).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Firewall / Seguridad</div>
    <div class="plan-content">
      <h4>Control de acceso entre dominios</h4>
      <p>El Gateway implementa un <b>firewall vehicular</b>: filtra qué mensajes pueden cruzar entre dominios. Evita que una amenaza en la red OBD-II o de telemática pueda enviar comandos directamente al motor o a los frenos.<br>
      Función de seguridad según ISO 21434: el Gateway es un <b>Trust Boundary</b> crítico. En AUTOSAR Adaptive, se implementa mediante reglas de enrutamiento en el módulo PduR.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre Gateway ECU...</p>
</div>`,

'arch-bms': `
<div class="plan-card">
  <div class="plan-card-title">🔋 BMS — Battery Management System</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué monitorea?</div>
    <div class="plan-content">
      <h4>Voltaje, temperatura, corriente</h4>
      <p>El BMS es crítico en vehículos eléctricos e híbridos. Monitorea en tiempo real:<br>
      <b>Voltaje de celda:</b> Detecta celdas en desequilibrio o degradadas. Rango típico: 2.5–4.2V por celda Li-Ion.<br>
      <b>Temperatura:</b> Previene sobrecalentamiento o congelamiento. Activa el sistema de refrigeración/calentamiento.<br>
      <b>Corriente:</b> Mide carga y descarga. Integrada en el tiempo para calcular SoC.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">SoC y SoH</div>
    <div class="plan-content">
      <h4>State of Charge y State of Health</h4>
      <p><b>SoC (State of Charge):</b> Nivel de carga actual en %, como el "tanque de gasolina" del EV. Se calcula por integración de corriente (Coulomb counting) + estimación por voltaje de circuito abierto.<br>
      <b>SoH (State of Health):</b> Capacidad restante vs capacidad original (%). Una batería con SoH=80% puede almacenar el 80% de su energía original. Indica envejecimiento.<br>
      El BMS comunica estos valores por CAN al VCU (Vehicle Control Unit) y al cuadro de instrumentos.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Protecciones</div>
    <div class="plan-content">
      <h4>Seguridad de la batería</h4>
      <p>El BMS protege contra:<br>
      • Sobrecarga (voltaje &gt; máx por celda)<br>
      • Sobredescarga (voltaje &lt; mín por celda)<br>
      • Sobrecorriente (carga/descarga excesiva)<br>
      • Sobrecalentamiento (activa cut-off térmico)<br>
      • Cortocircuito (contactor de seguridad)<br>
      Estas funciones tienen requerimientos ASIL-C o ASIL-D según ISO 26262.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre BMS...</p>
</div>`,

'arch-infotainment': `
<div class="plan-card">
  <div class="plan-card-title">🎵 Infotainment / IVI — In-Vehicle Infotainment</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es?</div>
    <div class="plan-content">
      <h4>Sistema de información y entretenimiento</h4>
      <p>El IVI es la pantalla central del vehículo. Combina navegación, entretenimiento, conectividad y control de funciones del auto. Corre sobre un OS embebido (Android Automotive OS, QNX, Linux/AGL) y requiere alta capacidad de procesamiento. Es el sistema menos safety-critical del vehículo (QM/ASIL-A), pero el más visible al usuario.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Protocolos</div>
    <div class="plan-content">
      <h4>MOST, Ethernet AVB, A2B</h4>
      <p><b>MOST (Media Oriented Systems Transport):</b> Bus en anillo para audio/video de alta calidad. MOST25 (25 Mbit/s sobre plástico), MOST150 (150 Mbit/s sobre fibra óptica).<br>
      <b>Ethernet AVB (Audio Video Bridging):</b> IEEE 802.1, transmisión de audio/video sincronizado con baja latencia. Reemplaza gradualmente a MOST.<br>
      <b>A2B (Automotive Audio Bus):</b> Bus serie de Analog Devices para audio de alta calidad y micrófonos. Un solo cable.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Conectividad</div>
    <div class="plan-content">
      <h4>Android Auto, CarPlay, Bluetooth, WiFi</h4>
      <p><b>Android Auto / Apple CarPlay:</b> Proyección del smartphone a la pantalla del vehículo vía USB o WiFi. El teléfono procesa, el coche solo muestra.<br>
      <b>Android Automotive OS (AAOS):</b> OS nativo del vehículo (no proyección). Google Maps y apps corren en el coche, sin necesitar teléfono. Usado por Volvo, Polestar, Renault.<br>
      <b>Bluetooth:</b> Audio streaming, llamadas manos libres (HFP, A2DP profiles).<br>
      <b>WiFi:</b> Actualizaciones OTA, hotspot, Android Auto wireless.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre Infotainment/IVI...</p>
</div>`,

'arch-sensors': `
<div class="plan-card">
  <div class="plan-card-title">📡 Sensores Automotrices — Comparativa</div>
  <div class="plan-block">
    <div class="plan-time">Tabla comparativa</div>
    <div class="plan-content">
      <h4>RADAR vs LIDAR vs Cámara vs Ultrasónico</h4>
      <table class="ref-table" style="margin-top:10px">
        <thead><tr><th>Sensor</th><th>Alcance</th><th>Clima</th><th>Costo</th><th>Uso principal</th></tr></thead>
        <tbody>
          <tr><td>RADAR</td><td>200m+</td><td>Excelente</td><td>Medio</td><td>ACC, AEB, BSD</td></tr>
          <tr><td>LIDAR</td><td>100-150m</td><td>Bueno</td><td>Alto</td><td>Mapeo 3D, L4+</td></tr>
          <tr><td>Cámara</td><td>50-100m</td><td>Malo (lluvia)</td><td>Bajo</td><td>Señales, carril, peatones</td></tr>
          <tr><td>Ultrasónico</td><td>3-5m</td><td>Excelente</td><td>Muy bajo</td><td>Estacionamiento</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Fusión de sensores</div>
    <div class="plan-content">
      <h4>Por qué se combinan los sensores</h4>
      <p>Ningún sensor es suficiente solo. La <b>fusión de sensores</b> combina datos de múltiples fuentes para crear una percepción robusta del entorno.<br>
      Ejemplo: RADAR detecta un obstáculo a 150m (alta confianza en distancia), la cámara clasifica que es un peatón (alta confianza en tipo de objeto), LIDAR da la forma 3D exacta. El algoritmo de fusión (Kalman Filter, Deep Learning) combina estos inputs para una decisión segura.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre sensores...</p>
</div>`,

'arch-domain': `
<div class="plan-card">
  <div class="plan-card-title">🗺️ Domain vs Zonal Architecture</div>
  <div class="plan-block">
    <div class="plan-time">Evolución histórica</div>
    <div class="plan-content">
      <h4>De ECUs distribuidas a HPC</h4>
      <p><b>Era 1 - ECUs distribuidas (pre-2010):</b> Una ECU por función. Un auto con 80 funciones = 80+ ECUs. Mucho cableado, complejo, caro. Aún común en vehículos de gama baja.<br>
      <b>Era 2 - Domain Controllers (2010-2020):</b> Las ECUs se agrupan por dominio funcional. Un Domain Controller para Powertrain, otro para Chassis, otro para ADAS. Reduce la cantidad de ECUs y buses.<br>
      <b>Era 3 - Zonal Architecture (2020+):</b> La lógica del dominio migra a una plataforma central (HPC). Las ECUs zonales (por zona física del auto: frontal, trasera, central) son I/O gateways. Ethernet de alta velocidad como backbone. Ejemplo: Tesla, Volkswagen (E3/E4).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Ventajas de Zonal</div>
    <div class="plan-content">
      <h4>¿Por qué la industria migra a Zonal?</h4>
      <p>• <b>Menos cableado:</b> Los cables llegan a nodos zonales cercanos, no recorren todo el auto.<br>
      • <b>OTA más simple:</b> Actualizar el HPC actualiza múltiples funciones a la vez.<br>
      • <b>Escalabilidad:</b> Agregar funciones es software, no hardware nuevo.<br>
      • <b>Costo:</b> Menos ECUs, aunque el HPC es más caro unitariamente.<br>
      Tesla usa 3 HPC (Front, Rear, Central). BMW usa arquitectura E3/E4. VW usa su "E3 backbone".</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre Domain vs Zonal Architecture...</p>
</div>`,

'arch-autosar': `
<div class="plan-card">
  <div class="plan-card-title">📦 AUTOSAR — AUTomotive Open System ARchitecture</div>
  <div class="plan-block">
    <div class="plan-time">Classic AUTOSAR</div>
    <div class="plan-content">
      <h4>Para ECUs de tiempo real (hard real-time)</h4>
      <p><b>AUTOSAR Classic</b> es el estándar para ECUs embebidas tradicionales (motor, transmisión, ABS). Sus características:<br>
      • OS basado en <b>OSEK/AUTOSAR OS</b> — tiempo real duro, tareas con prioridades fijas.<br>
      • Software en capas: <b>Application (SWC) → RTE → Basic Software (BSW) → MCAL → Hardware</b><br>
      • El <b>RTE (Runtime Environment)</b> es el middleware: conecta SWCs entre sí y con los servicios de BSW.<br>
      • Configuración en <b>ARXML</b> (formato XML extenso). Herramientas: Vector DaVinci, EB Tresos.<br>
      • Sin sistema de archivos, sin networking avanzado. Recursos muy limitados.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Adaptive AUTOSAR</div>
    <div class="plan-content">
      <h4>Para HPC y ADAS (plataformas de alto rendimiento)</h4>
      <p><b>AUTOSAR Adaptive</b> está diseñado para los nuevos High Performance Computers (HPC) que requieren OS tipo Linux y conectividad Ethernet.<br>
      • OS: <b>POSIX-based</b> (Linux típicamente). Permite procesos dinámicos.<br>
      • Comunicación: <b>SOME/IP sobre Ethernet</b>. SOA (Service-Oriented Architecture).<br>
      • Adaptive Applications (AA) corren como procesos del SO.<br>
      • Permite OTA, dynamic deployment, logging avanzado.<br>
      • Usado en: plataformas ADAS (NVIDIA Drive), cockpit digital, domain controllers.<br>
      • <b>Coexisten:</b> Un vehículo puede tener Classic en el motor Y Adaptive en el ADAS computer.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Capas AUTOSAR Classic</div>
    <div class="plan-content">
      <h4>De aplicación a hardware</h4>
      <div class="code-block"><div class="code-lang">AUTOSAR Classic — Stack de capas</div><pre>
┌─────────────────────────────────────┐
│  Application Layer (SWC)            │ ← Tu código de aplicación
│  PortInterfaces → Runnables         │
├─────────────────────────────────────┤
│  RTE (Runtime Environment)          │ ← Middleware generado automático
│  Sender/Receiver, Client/Server     │
├─────────────────────────────────────┤
│  Basic Software (BSW)               │
│  COM / PduR / CanIf / NM / Dcm...  │ ← Servicios del SO y comunicación
├─────────────────────────────────────┤
│  MCAL (Microcontroller Abstraction) │ ← Drivers de hardware
│  Can / Adc / Dio / Gpt / Pwm...    │
├─────────────────────────────────────┤
│  Hardware (µC)                      │
└─────────────────────────────────────┘</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus apuntes sobre AUTOSAR Classic vs Adaptive...</p>
</div>`,

};  // fin AUTO_RICH
