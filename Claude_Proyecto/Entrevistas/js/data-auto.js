
// ══════════════════════════════════════════════════════════════════
//  AUTO_RICH — Arquitectura Automotriz
// ══════════════════════════════════════════════════════════════════
const AUTO_RICH = {

'arch-intro': `
<div class="tab-group-ai1">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ai1-1','ai1')">¿Qué es y por qué importa?</button>
    <button class="tab-btn" onclick="switchTab(this,'ai1-2','ai1')">Evolución: distribuida → dominio → zonal</button>
    <button class="tab-btn" onclick="switchTab(this,'ai1-3','ai1')">Panorama de redes vehiculares</button>
  </div>
  <div id="ai1-1" class="tab-panel active">
<div class="concept-intro">La <strong>arquitectura E/E</strong> (Electrical/Electronic Architecture) de un vehículo es el "plano" completo de toda su electrónica: define cuántas ECUs existen, qué función cumple cada una, cómo están conectadas entre sí, y por qué buses circula cada mensaje. En un vehículo moderno de gama media-alta pueden coexistir <strong>más de 100 ECUs</strong> — desde el módulo que controla un espejo eléctrico hasta el computador central que procesa cámaras de ADAS.</div>
<div class="pipeline-diagram"><span class="p-blue">Sensores</span> (velocidad, temperatura, cámaras, radar) ──▶ <span class="p-amber">ECUs</span> (procesan la señal, deciden) ──▶ <span class="p-green">Buses de comunicación</span> (CAN / LIN / FlexRay / Ethernet) ──▶ <span class="p-amber">Actuadores</span> (motor, frenos, luces, pantallas)</div>
<table class="kv-table"><tr><th>Componente</th><th>Rol en la arquitectura</th></tr>
<tr><td>ECU (Electronic Control Unit)</td><td>Computadora embebida que ejecuta una función específica — desde un microcontrolador simple (BCM) hasta un HPC con GPU (ADAS).</td></tr>
<tr><td>Sensor</td><td>Convierte una magnitud física (velocidad, temperatura, distancia) en una señal eléctrica o digital que una ECU puede leer.</td></tr>
<tr><td>Actuador</td><td>Convierte una decisión electrónica en una acción física — abrir un seguro, activar un freno, encender una luz.</td></tr>
<tr><td>Bus de comunicación</td><td>El "cableado inteligente" por el que las ECUs intercambian mensajes — CAN, LIN, FlexRay, Ethernet (ver el módulo "Protocolos de Comunicación" para el detalle técnico de cada uno).</td></tr>
<tr><td>Gateway</td><td>ECU que conecta distintos buses entre sí y traduce mensajes de un dominio a otro (tema dedicado más adelante en este módulo).</td></tr>
</table>
  </div>
  <div id="ai1-2" class="tab-panel">
<div class="concept-intro">La forma de organizar todas esas ECUs no es la misma hoy que hace quince años — la industria viene atravesando una transición clara, motivada por el costo del cableado, la necesidad de actualizar software por aire (OTA), y la creciente potencia de cómputo que exigen funciones como ADAS.</div>
<table class="kv-table"><tr><th>Era</th><th>Cómo se organiza</th><th>Limitación principal</th></tr>
<tr><td>Distribuida (clásica, pre-2010)</td><td>Una ECU por función: BCM, TCM, ABS, cada módulo de ventana... Un vehículo con 80 funciones puede tener 80+ ECUs.</td><td>El cableado y la cantidad de ECUs crecen casi linealmente con cada función nueva — pesado, caro, difícil de actualizar.</td></tr>
<tr><td>Domain-based (2010-2020)</td><td>Un Domain Controller agrupa varias funciones relacionadas: uno para Powertrain, otro para Chassis, otro para ADAS.</td><td>Reduce la cantidad de ECUs, pero cada dominio sigue siendo relativamente aislado del resto.</td></tr>
<tr><td>Zonal / Centralizada (2020+)</td><td>Pocas ECUs zonales (por ubicación física: frontal, trasera, central) actúan como I/O; la lógica pesada vive en un HPC central conectado por Ethernet.</td><td>Requiere Ethernet de alta velocidad como columna vertebral y un cambio profundo en cómo se diseña el software del vehículo.</td></tr>
</table>
<div class="alert-card">💡 Este tema se profundiza en "Domain vs Zonal Architecture" más adelante en este mismo módulo — acá el objetivo es tener el panorama completo antes de entrar en el detalle de cada pieza.</div>
  </div>
  <div id="ai1-3" class="tab-panel">
<div class="concept-intro">No todos los mensajes del vehículo viajan por el mismo tipo de red — la elección del bus depende de qué tan crítico en tiempo, qué tan rápido y qué tan caro puede ser. Este es el panorama general; el módulo "Protocolos de Comunicación" tiene el desarrollo técnico completo de cada uno.</div>
<table class="kv-table"><tr><th>Red</th><th>Velocidad típica</th><th>Uso principal</th></tr>
<tr><td>LIN</td><td>20 kbit/s</td><td>Sensores y actuadores simples y baratos: ventanas, espejos, sensores de lluvia.</td></tr>
<tr><td>CAN</td><td>Hasta 1 Mbit/s (CAN FD hasta 8 Mbit/s)</td><td>Control en tiempo real: motor, frenos, transmisión, carrocería.</td></tr>
<tr><td>FlexRay</td><td>10 Mbit/s determinista</td><td>Funciones safety-critical de alto ancho de banda: chassis-by-wire, ADAS de generación anterior.</td></tr>
<tr><td>MOST</td><td>Hasta 150 Mbit/s (fibra óptica)</td><td>Multimedia e infotainment de alta calidad de audio/video.</td></tr>
<tr><td>Automotive Ethernet</td><td>100 Mbit/s a 10 Gbit/s (par de hilos)</td><td>ADAS, cámaras, HPC — el backbone de la arquitectura zonal moderna.</td></tr>
</table>
<div class="concept-intro">La regla general para razonar en una entrevista: cuanto más determinismo y tiempo real necesita una función crítica de seguridad, más se inclina hacia CAN o FlexRay; cuanto más ancho de banda necesita (video, sensores de alta resolución), más se inclina hacia Ethernet.</div>
  </div>
</div>
`,

'arch-adas': `
<div class="tab-group-aa2">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'aa2-1','aa2')">Sensores ADAS</button>
    <button class="tab-btn" onclick="switchTab(this,'aa2-2','aa2')">Niveles SAE J3016 (L0-L5)</button>
    <button class="tab-btn" onclick="switchTab(this,'aa2-3','aa2')">Funciones clave</button>
  </div>
  <div id="aa2-1" class="tab-panel active">
<div class="concept-intro"><strong>ADAS</strong> (Advanced Driver Assistance Systems) son las funciones que asisten o reemplazan parcialmente al conductor. Ningún sensor por sí solo alcanza para todas las condiciones — cada uno tiene fortalezas y debilidades complementarias, por eso casi ninguna función ADAS depende de un solo tipo de sensor.</div>
<table class="kv-table"><tr><th>Sensor</th><th>Fortaleza</th><th>Debilidad</th><th>Rol típico en ADAS</th></tr>
<tr><td>RADAR</td><td>Funciona en lluvia/niebla, mide velocidad relativa (efecto Doppler), largo alcance (200m+)</td><td>Baja resolución angular, no distingue bien el tipo de objeto</td><td>ACC, AEB, detección de punto ciego</td></tr>
<tr><td>LIDAR</td><td>Nube de puntos 3D de alta precisión, buena forma del objeto</td><td>Caro, sensible a lluvia intensa/niebla densa</td><td>Mapeo del entorno, L4+</td></tr>
<tr><td>Cámara</td><td>Clasifica objetos, lee señales y carriles, bajo costo</td><td>Depende de buena visibilidad y luz</td><td>Lane keeping, reconocimiento de señales, clasificación de objetos</td></tr>
<tr><td>Ultrasónico</td><td>Muy barato y robusto, ideal a corta distancia</td><td>Alcance muy corto (~5m)</td><td>Estacionamiento, blind spot de corto alcance</td></tr>
</table>
<div class="alert-card">💡 Ver el tema "Sensores Automotrices" de este mismo módulo para la tabla comparativa completa y el concepto de fusión de sensores en profundidad.</div>
  </div>
  <div id="aa2-2" class="tab-panel">
<div class="concept-intro">La escala <strong>SAE J3016</strong> es el estándar de referencia para hablar de niveles de autonomía — de L0 (nada automatizado) a L5 (autonomía total). La pregunta clave que distingue cada nivel es: <em>¿quién es responsable de monitorear el entorno en cada momento?</em></div>
<div class="dtree">
  <div class="dtree-title">¿Quién debe estar atento al entorno en cada nivel?</div>
  <div class="dtree-step">
    <div class="dtree-num">0</div>
    <div class="dtree-body"><h5>L0 — Sin automatización</h5><p>El conductor controla todo. El sistema solo emite alertas (ej. alerta de colisión sonora), sin actuar.</p></div>
  </div>
  <div class="dtree-step">
    <div class="dtree-num">1</div>
    <div class="dtree-body"><h5>L1 — Asistencia en un eje</h5><p>El sistema asiste dirección <span class="no">O</span> aceleración/freno, nunca ambos a la vez. Ejemplo: Cruise Control simple, Lane Keeping solo.</p></div>
  </div>
  <div class="dtree-step">
    <div class="dtree-num">2</div>
    <div class="dtree-body"><h5>L2 — Asistencia combinada</h5><p>El sistema controla dirección Y velocidad a la vez (ej. Tesla Autopilot, GM Super Cruise), pero el <span class="yes">conductor debe supervisar siempre</span> y está legalmente responsable.</p></div>
  </div>
  <div class="dtree-step">
    <div class="dtree-num ok">3</div>
    <div class="dtree-body"><h5>L3 — Automatización condicional</h5><p>El sistema conduce y <span class="yes">el conductor puede soltar la atención</span> en condiciones definidas, pero debe estar listo para retomar el control si el sistema lo solicita. Ejemplo: Mercedes Drive Pilot.</p></div>
  </div>
  <div class="dtree-step">
    <div class="dtree-num ok">4</div>
    <div class="dtree-body"><h5>L4 — Alta automatización</h5><p>Dentro de una zona geográfica definida (geofence), el vehículo <span class="yes">no necesita conductor</span>. Fuera de esa zona, no opera. Ejemplo: Waymo, Wayve.</p></div>
  </div>
  <div class="dtree-step">
    <div class="dtree-num ok">5</div>
    <div class="dtree-body"><h5>L5 — Autonomía total</h5><p>Conduce solo en cualquier condición, sin restricción geográfica. Aún no existe comercialmente disponible.</p></div>
  </div>
</div>
  </div>
  <div id="aa2-3" class="tab-panel">
<table class="kv-table"><tr><th>Función</th><th>Sigla</th><th>Qué hace</th><th>Sensores principales</th></tr>
<tr><td>Adaptive Cruise Control</td><td>ACC</td><td>Mantiene velocidad y distancia de seguimiento respecto al vehículo de adelante</td><td>RADAR</td></tr>
<tr><td>Automatic Emergency Braking</td><td>AEB</td><td>Frena automáticamente si detecta una colisión inminente</td><td>RADAR + Cámara</td></tr>
<tr><td>Lane Keeping Assist</td><td>LKA</td><td>Corrige la dirección si el vehículo se sale del carril sin señalizar</td><td>Cámara</td></tr>
<tr><td>Blind Spot Detection</td><td>BSD</td><td>Detecta vehículos en el punto ciego y alerta antes de un cambio de carril</td><td>RADAR trasero</td></tr>
<tr><td>Automatic Parking Assist</td><td>APA</td><td>Estacionamiento semi o totalmente automatizado</td><td>Ultrasónico + Cámara</td></tr>
</table>
<div class="concept-intro">Detrás de cualquiera de estas funciones hay el mismo ciclo conceptual: <strong>percibir</strong> el entorno con los sensores, <strong>fusionar</strong> esa información en un modelo coherente, <strong>planificar</strong> qué acción tomar, y <strong>actuar</strong> sobre el frenado, la dirección o la aceleración — el mismo patrón de percepción-planificación-control que se repite en cualquier sistema de conducción asistida o autónoma, sin importar el nivel SAE.</div>
  </div>
</div>
`,

'arch-bcm': `
<div class="tab-group-ab3">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ab3-1','ab3')">Qué controla el BCM</button>
    <button class="tab-btn" onclick="switchTab(this,'ab3-2','ab3')">Arquitectura: LIN Master + nodo CAN</button>
    <button class="tab-btn" onclick="switchTab(this,'ab3-3','ab3')">Ejemplo práctico</button>
  </div>
  <div id="ab3-1" class="tab-panel active">
<div class="concept-intro">El <strong>BCM</strong> (Body Control Module) es, en la práctica, el "mayordomo" del vehículo: gestiona todas las funciones de carrocería que no son críticas para la conducción en sí, pero que el conductor usa constantemente.</div>
<div class="two-col">
  <div class="info-card">
    <h5>Confort y carrocería</h5>
    <li>Iluminación exterior e interior (faros, luces de posición, cortesía)</li>
    <li>Ventanas eléctricas y techo solar</li>
    <li>Limpiaparabrisas y lavaparabrisas</li>
    <li>Control de espejos laterales</li>
  </div>
  <div class="info-card">
    <h5>Seguridad y acceso</h5>
    <li>Seguros de puertas (central locking)</li>
    <li>Alarma del vehículo e inmovilizador</li>
    <li>Sistema de entrada sin llave (keyless entry)</li>
    <li>Sensores de ocupación y cinturón (en algunos vehículos)</li>
  </div>
</div>
  </div>
  <div id="ab3-2" class="tab-panel">
<div class="concept-intro">El BCM combina dos roles de comunicación distintos, uno hacia "abajo" (sus propios nodos simples) y otro hacia "arriba" (el resto del vehículo).</div>
<div class="pipeline-diagram"><span class="p-blue">Nodos LIN</span> (motor de ventana, sensor de lluvia, motor de espejo) ──▶ <span class="p-amber">BCM actúa como LIN Master</span> ──▶ <span class="p-green">BCM como nodo CAN</span> ──▶ <span class="p-amber">Gateway</span> ──▶ <span class="p-blue">Cuadro de instrumentos, alarma, otras ECUs</span></div>
<table class="kv-table"><tr><th>Rol</th><th>Qué implica</th></tr>
<tr><td>LIN Master</td><td>El BCM inicia y controla toda la comunicación con sus nodos LIN esclavos — estos son simples y baratos porque no necesitan gestionar el bus por sí mismos.</td></tr>
<tr><td>Nodo CAN</td><td>Hacia el resto del vehículo, el BCM es un nodo más en el bus CAN: envía el estado de sus funciones (puerta abierta, luz encendida) y recibe comandos de otras ECUs.</td></tr>
<tr><td>Cliente de Gateway</td><td>Los mensajes que genera el BCM llegan a otras zonas del vehículo (por ejemplo el cuadro de instrumentos) atravesando el Gateway, que enruta entre buses distintos.</td></tr>
</table>
  </div>
  <div id="ab3-3" class="tab-panel">
<div class="concept-intro">Sigamos el flujo de señales de algo cotidiano: alguien se acerca al auto con la llave en el bolsillo y tira de la manija (keyless entry).</div>
<div class="dtree">
  <div class="dtree-title">Secuencia de señales — apertura keyless</div>
  <div class="dtree-step"><div class="dtree-num ok">1</div><div class="dtree-body"><h5>Detección de proximidad</h5><p>El BCM consulta periódicamente si hay una llave válida en rango, vía antenas de baja frecuencia.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">2</div><div class="dtree-body"><h5>Sensor en la manija</h5><p>Al tirar de la manija, un sensor capacitivo o de microswitch envía la señal al BCM por su bus LIN local.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">3</div><div class="dtree-body"><h5>Validación</h5><p>El BCM confirma que la llave autenticada está en rango antes de autorizar la apertura — evita aperturas accidentales o no autorizadas.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">4</div><div class="dtree-body"><h5>Actuación</h5><p>El BCM comanda el actuador de seguro de esa puerta específica para liberar el mecanismo.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">5</div><div class="dtree-body"><h5>Notificación al resto del vehículo</h5><p>El BCM publica en el bus CAN el evento "puerta desbloqueada" — así la alarma se desarma y el cuadro de instrumentos puede mostrar el estado.</p></div></div>
</div>
  </div>
</div>
`,

'arch-gateway': `
<div class="tab-group-ag4">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ag4-1','ag4')">Función: traducción y enrutamiento</button>
    <button class="tab-btn" onclick="switchTab(this,'ag4-2','ag4')">Seguridad: firewall vehicular</button>
    <button class="tab-btn" onclick="switchTab(this,'ag4-3','ag4')">Ejemplo de ruteo de mensajes</button>
  </div>
  <div id="ag4-1" class="tab-panel active">
<div class="concept-intro">El <strong>Gateway</strong> es la ECU que conecta buses distintos entre sí — el CAN de Powertrain, el CAN de Carrocería, el LIN, la red Ethernet de ADAS — y traduce mensajes entre ellos. Sin Gateway, un bus CAN del motor simplemente no podría "hablar" con la red Ethernet del sistema de infotainment: son protocolos y dominios físicamente separados.</div>
<div class="pipeline-diagram">          <span class="p-blue">CAN Powertrain</span> ─┐
          <span class="p-amber">CAN Chassis</span>    ─┼──▶ <span class="p-green">Gateway ECU</span> ──▶ enruta y traduce cada mensaje
          <span class="p-blue">LIN Carrocería</span>  ─┤        al bus correcto de destino
          <span class="p-amber">Ethernet ADAS</span>  ─┘</div>
<div class="concept-intro">Un ejemplo típico: el mensaje de velocidad de rueda que genera el ABS vive en el CAN de Chassis, pero lo necesitan tanto el cuadro de instrumentos (CAN Interior) como el control de tracción (CAN Powertrain). El Gateway es quien recibe ese mensaje una vez y lo reenvía a ambos destinos, sin que el ABS necesite conocer ni conectarse directamente a esas otras redes.</div>
  </div>
  <div id="ag4-2" class="tab-panel">
<div class="concept-intro">Además de traducir, el Gateway cumple una función crítica de seguridad: actúa como <strong>firewall vehicular</strong>, filtrando qué mensajes pueden cruzar de un dominio a otro. Esto es lo que evita que una amenaza que entra por el puerto OBD-II o por la conexión de telemática pueda enviar comandos directamente al motor o a los frenos.</div>
<div class="alert-card">🔐 Según <strong>ISO 21434</strong> (Cybersecurity Engineering, ver el módulo "Estándares & Seguridad"), el Gateway suele modelarse como un <strong>Trust Boundary</strong> crítico: un límite de confianza donde el tráfico que entra desde una red menos confiable (diagnóstico externo, telemática) se filtra antes de llegar a redes safety-critical.</div>
<div class="concept-intro">En términos de AUTOSAR Adaptive, esta lógica de filtrado y enrutamiento se implementa a través de reglas configurables en el módulo <code>PduR</code> (Protocol Data Unit Router) — el Gateway no reenvía todo lo que le llega, sino solo lo que las reglas de enrutamiento permiten explícitamente.</div>
  </div>
  <div id="ag4-3" class="tab-panel">
<table class="kv-table"><tr><th>Mensaje origen</th><th>Bus de origen</th><th>Destinos reenviados</th><th>Por qué</th></tr>
<tr><td>Velocidad de rueda (ABS)</td><td>CAN Chassis</td><td>CAN Interior, CAN Powertrain</td><td>El velocímetro necesita mostrarla; el control de tracción la necesita para decidir torque.</td></tr>
<tr><td>Estado de puerta (BCM)</td><td>LIN → CAN Carrocería</td><td>CAN Interior</td><td>El cuadro de instrumentos necesita mostrar "puerta abierta".</td></tr>
<tr><td>Comando de diagnóstico externo (UDS)</td><td>OBD-II / DoIP</td><td>Solo la ECU objetivo, en modo diagnóstico</td><td>El Gateway filtra para que un tester externo no pueda escribir directo en cualquier ECU sin autenticarse.</td></tr>
</table>
<div class="concept-intro">Esta tabla resume la idea central: el Gateway no es un simple repetidor que copia todo a todos lados — decide, mensaje por mensaje, quién necesita legítimamente esa información y quién no.</div>
  </div>
</div>
`,

'arch-bms': `
<div class="tab-group-ab5">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ab5-1','ab5')">Qué monitorea</button>
    <button class="tab-btn" onclick="switchTab(this,'ab5-2','ab5')">SoC vs SoH</button>
    <button class="tab-btn" onclick="switchTab(this,'ab5-3','ab5')">Protecciones y niveles ASIL</button>
  </div>
  <div id="ab5-1" class="tab-panel active">
<div class="concept-intro">El <strong>BMS</strong> (Battery Management System) es crítico en vehículos eléctricos e híbridos: monitorea en tiempo real el estado de cada celda del paquete de baterías, no solo el paquete como un todo, porque una sola celda desequilibrada puede degradar o dañar todo el pack.</div>
<table class="kv-table"><tr><th>Magnitud</th><th>Qué mide</th><th>Rango típico / detalle</th></tr>
<tr><td>Voltaje de celda</td><td>Detecta celdas en desequilibrio o degradadas</td><td>~2.5V a 4.2V por celda en química Li-Ion</td></tr>
<tr><td>Temperatura</td><td>Previene sobrecalentamiento o funcionamiento a temperaturas demasiado bajas</td><td>Activa el sistema de refrigeración o calentamiento del pack</td></tr>
<tr><td>Corriente</td><td>Mide carga y descarga en tiempo real</td><td>Se integra en el tiempo (coulomb counting) para calcular el SoC</td></tr>
</table>
  </div>
  <div id="ab5-2" class="tab-panel">
<table class="kv-table"><tr><th>Métrica</th><th>Qué representa</th><th>Cómo se calcula (aprox.)</th></tr>
<tr><td>SoC — State of Charge</td><td>Nivel de carga actual, en %. El equivalente al "tanque de gasolina" de un EV.</td><td>Integración de corriente en el tiempo (coulomb counting), corregida con estimación por voltaje de circuito abierto.</td></tr>
<tr><td>SoH — State of Health</td><td>Capacidad restante comparada con la capacidad original, en %. Indica el nivel de envejecimiento de la batería.</td><td>Comparación de la capacidad medible actual contra la capacidad nominal de fábrica.</td></tr>
</table>
<div class="code-block"><div class="code-lang">Coulomb counting — idea simplificada del cálculo de SoC</div><pre>
<span class="c-cm">// SoC nuevo = SoC anterior + (corriente integrada en el tiempo / capacidad nominal)</span>
SoC(t) = SoC(t-1) + ( ∫ I dt ) / Capacidad_nominal

<span class="c-cm">// I positiva = carga, I negativa = descarga</span>
<span class="c-cm">// Se corrige periódicamente con el voltaje de circuito abierto para evitar</span>
<span class="c-cm">// que pequeños errores de medición se acumulen con el tiempo</span></pre></div>
<div class="concept-intro">El BMS comunica SoC y SoH por CAN al VCU (Vehicle Control Unit) y al cuadro de instrumentos — es literalmente la información que ves como "% de batería" y "autonomía estimada" en la pantalla del vehículo.</div>
  </div>
  <div id="ab5-3" class="tab-panel">
<table class="kv-table"><tr><th>Protección</th><th>Qué previene</th><th>Nivel ASIL típico</th></tr>
<tr><td>Sobrecarga</td><td>Voltaje por celda superior al máximo seguro</td><td><span class="badge badge-red">ASIL-C/D</span></td></tr>
<tr><td>Sobredescarga</td><td>Voltaje por celda inferior al mínimo seguro</td><td><span class="badge badge-red">ASIL-C/D</span></td></tr>
<tr><td>Sobrecorriente</td><td>Carga o descarga excesivamente rápida</td><td><span class="badge badge-ylw">ASIL-C</span></td></tr>
<tr><td>Sobrecalentamiento</td><td>Activa un corte térmico (cut-off) antes de daño físico</td><td><span class="badge badge-red">ASIL-D</span></td></tr>
<tr><td>Cortocircuito</td><td>Contactor de seguridad que aísla el pack físicamente</td><td><span class="badge badge-red">ASIL-D</span></td></tr>
</table>
<div class="alert-card">💡 Estos niveles ASIL tan altos no son casualidad: una falla en la gestión térmica o eléctrica de un paquete de baterías de alta tensión puede derivar en incendio — por eso el BMS concentra algunas de las funciones con mayor exigencia de seguridad funcional de todo el vehículo eléctrico. Ver el módulo "Estándares & Seguridad" para el desarrollo completo de ASIL e ISO 26262.</div>
  </div>
</div>
`,

'arch-infotainment': `
<div class="tab-group-ai6">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ai6-1','ai6')">Qué es y qué SO corre</button>
    <button class="tab-btn" onclick="switchTab(this,'ai6-2','ai6')">Protocolos: MOST, Ethernet AVB, A2B</button>
    <button class="tab-btn" onclick="switchTab(this,'ai6-3','ai6')">Proyección vs sistema nativo</button>
  </div>
  <div id="ai6-1" class="tab-panel active">
<div class="concept-intro">El <strong>IVI</strong> (In-Vehicle Infotainment) es la pantalla central del vehículo: combina navegación, entretenimiento, conectividad, y en muchos casos el control de funciones del auto. Es el sistema <strong>menos crítico para la seguridad</strong> de todo el vehículo (típicamente QM o ASIL-A) — pero paradójicamente el más visible y con el que más interactúa el usuario, por lo que exige una potencia de cómputo comparable a la de un smartphone o más.</div>
<table class="kv-table"><tr><th>Sistema operativo</th><th>Características</th></tr>
<tr><td>Android Automotive OS (AAOS)</td><td>OS nativo de Google para el vehículo — no es una proyección del teléfono, corre directamente en el hardware del auto. Usado por Volvo, Polestar, Renault.</td></tr>
<tr><td>QNX</td><td>Sistema operativo en tiempo real (RTOS) de Blackberry, muy usado históricamente en clústers digitales e infotainment por su estabilidad y certificaciones de seguridad.</td></tr>
<tr><td>Linux / AGL (Automotive Grade Linux)</td><td>Distribución de Linux especializada para automoción, mantenida por una colaboración de la industria (Linux Foundation) — código abierto y muy flexible.</td></tr>
</table>
  </div>
  <div id="ai6-2" class="tab-panel">
<table class="kv-table"><tr><th>Protocolo</th><th>Qué es</th><th>Detalle técnico</th></tr>
<tr><td>MOST (Media Oriented Systems Transport)</td><td>Bus en anillo diseñado específicamente para audio/video de alta calidad.</td><td>MOST25 (25 Mbit/s sobre fibra plástica), MOST150 (150 Mbit/s sobre fibra óptica).</td></tr>
<tr><td>Ethernet AVB (Audio Video Bridging)</td><td>Extensión de IEEE 802.1 para transmitir audio/video sincronizado con baja latencia sobre Ethernet estándar.</td><td>Va reemplazando gradualmente a MOST, aprovechando el mismo backbone Ethernet que ya usa el resto de la arquitectura zonal.</td></tr>
<tr><td>A2B (Automotive Audio Bus)</td><td>Bus serie de Analog Devices para audio de alta calidad y arreglos de micrófonos.</td><td>Un solo cable transporta múltiples canales de audio digital — simplifica mucho el cableado de sistemas de sonido complejos.</td></tr>
</table>
  </div>
  <div id="ai6-3" class="tab-panel">
<div class="concept-intro">Hay dos filosofías distintas para llevar apps de smartphone a la pantalla del auto, y conviene distinguirlas con claridad en una entrevista.</div>
<div class="two-col">
  <div class="info-card">
    <h5>Proyección — Android Auto / Apple CarPlay</h5>
    <li>El <b>teléfono procesa</b> todo — el vehículo solo muestra la interfaz</li>
    <li>Conexión por USB o WiFi</li>
    <li>Requiere que el teléfono esté presente y conectado</li>
    <li>Las apps disponibles dependen del sistema del teléfono, no del auto</li>
  </div>
  <div class="info-card">
    <h5>Nativo — Android Automotive OS (AAOS)</h5>
    <li>El <b>vehículo procesa</b> todo — no necesita un teléfono conectado</li>
    <li>Google Maps y otras apps corren directamente en el hardware del auto</li>
    <li>Permite actualizaciones OTA independientes del teléfono</li>
    <li>Usado por fabricantes como Volvo, Polestar, Renault</li>
  </div>
</div>
<div class="concept-intro">Además, <strong>Bluetooth</strong> cubre audio streaming y llamadas manos libres (perfiles HFP, A2DP), y <strong>WiFi</strong> se usa tanto para hotspot como para actualizaciones OTA y la versión inalámbrica de Android Auto/CarPlay.</div>
  </div>
</div>
`,

'arch-sensors': `
<div class="tab-group-as7">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'as7-1','as7')">Tabla comparativa completa</button>
    <button class="tab-btn" onclick="switchTab(this,'as7-2','as7')">Fusión de sensores</button>
    <button class="tab-btn" onclick="switchTab(this,'as7-3','as7')">Redundancia y seguridad funcional</button>
  </div>
  <div id="as7-1" class="tab-panel active">
<div class="concept-intro">Los cuatro sensores de percepción más usados en automoción — RADAR, LIDAR, cámara y ultrasónico — no compiten entre sí, se complementan. Ninguno gana en todas las columnas de esta tabla.</div>
<table class="kv-table"><tr><th>Sensor</th><th>Alcance</th><th>Comportamiento en clima adverso</th><th>Costo relativo</th><th>Uso principal</th></tr>
<tr><td>RADAR</td><td>200m+</td><td>Excelente (lluvia, niebla, polvo)</td><td>Medio</td><td>ACC, AEB, Blind Spot Detection</td></tr>
<tr><td>LIDAR</td><td>100-150m</td><td>Bueno (se degrada con lluvia intensa)</td><td>Alto</td><td>Mapeo 3D del entorno, conducción L4+</td></tr>
<tr><td>Cámara</td><td>50-100m</td><td>Malo (lluvia, poca luz, contraluz)</td><td>Bajo</td><td>Señales de tránsito, carril, clasificación de peatones</td></tr>
<tr><td>Ultrasónico</td><td>3-5m</td><td>Excelente</td><td>Muy bajo</td><td>Asistencia de estacionamiento</td></tr>
</table>
  </div>
  <div id="as7-2" class="tab-panel">
<div class="concept-intro">Ningún sensor es suficiente por sí solo para tomar una decisión segura — la <strong>fusión de sensores</strong> combina datos de múltiples fuentes para construir un modelo del entorno más confiable que cualquier sensor individual.</div>
<div class="pipeline-diagram"><span class="p-blue">RADAR</span> (distancia + velocidad, alta confianza)
        ┐
<span class="p-amber">Cámara</span> (clasificación del objeto: "es un peatón")   ├──▶ <span class="p-green">Algoritmo de fusión</span> (Kalman Filter / Deep Learning) ──▶ <span class="p-amber">Modelo unificado del entorno</span>
        ┘
<span class="p-blue">LIDAR</span> (forma 3D exacta del objeto)</div>
<div class="concept-intro">Ejemplo concreto: el RADAR detecta un obstáculo a 150 metros con alta confianza en la distancia, la cámara clasifica que ese obstáculo es un peatón, y el LIDAR aporta la forma tridimensional precisa. El algoritmo de fusión combina estas tres fuentes — cada una con su propia incertidumbre — para producir una única estimación con mayor confianza que cualquiera de los sensores por separado.</div>
  </div>
  <div id="as7-3" class="tab-panel">
<div class="concept-intro">En funciones safety-critical (AEB, por ejemplo), depender de un único sensor sería un punto único de falla inaceptable para los niveles ASIL exigidos — si ese sensor falla o queda temporalmente ciego (por ejemplo una cámara encandilada por el sol), el sistema completo perdería percepción justo cuando más la necesita.</div>
<div class="alert-card">🔐 Por eso las funciones ADAS más críticas suelen exigir <strong>redundancia entre tipos de sensores distintos</strong> (no solo dos cámaras, sino cámara + RADAR, por ejemplo) — si ambos coinciden en detectar un riesgo, la confianza para actuar (frenar, por ejemplo) es mucho mayor que si dependiera de una sola fuente. Este razonamiento de redundancia es exactamente el que exige el análisis HARA dentro de ISO 26262 (ver el módulo "Estándares & Seguridad").</div>
<div class="concept-intro">También hay que diseñar para el caso en que los sensores <strong>discrepan</strong> entre sí: el sistema necesita una estrategia clara (por ejemplo, priorizar el sensor más confiable en esa condición específica, o directamente pasar a un estado seguro) en vez de simplemente "promediar" señales que podrían estar en conflicto por buenas razones.</div>
  </div>
</div>
`,

'arch-domain': `
<div class="tab-group-ad8">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ad8-1','ad8')">Las 3 eras de arquitectura</button>
    <button class="tab-btn" onclick="switchTab(this,'ad8-2','ad8')">Por qué la industria migra a Zonal</button>
    <button class="tab-btn" onclick="switchTab(this,'ad8-3','ad8')">Comparativa por fabricante</button>
  </div>
  <div id="ad8-1" class="tab-panel active">
<table class="kv-table"><tr><th>Era</th><th>Período aproximado</th><th>Cómo se organiza</th></tr>
<tr><td>ECUs distribuidas</td><td>Pre-2010, aún común en gama baja</td><td>Una ECU por función. Un vehículo con 80 funciones puede tener 80+ ECUs — mucho cableado, complejo y costoso de escalar.</td></tr>
<tr><td>Domain Controllers</td><td>2010-2020</td><td>Las ECUs se agrupan por dominio funcional: un Domain Controller para Powertrain, otro para Chassis, otro para ADAS. Reduce la cantidad total de ECUs y de buses.</td></tr>
<tr><td>Zonal Architecture</td><td>2020 en adelante</td><td>La lógica de dominio migra a una plataforma central (HPC). Las ECUs zonales son I/O gateways ubicados por zona física (frontal, trasera, central). Ethernet de alta velocidad como backbone.</td></tr>
</table>
<div class="concept-intro">La transición no es solo una moda de la industria — responde directamente a la necesidad de reducir peso/costo de cableado, y sobre todo a habilitar <strong>actualizaciones de software OTA</strong> a nivel de vehículo completo, algo mucho más difícil de lograr con decenas de ECUs aisladas y distintos proveedores.</div>
  </div>
  <div id="ad8-2" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Menos cableado</div>
  <p>Los cables llegan a un nodo zonal cercano en vez de recorrer todo el largo del vehículo hasta una ECU centralizada por función — reduce peso y puntos de falla física.</p>
</div>
<div class="practice-card">
  <div class="practice-title">OTA más simple y consistente</div>
  <p>Actualizar el software del HPC central puede mejorar o corregir múltiples funciones a la vez, en vez de coordinar actualizaciones separadas en decenas de ECUs de distintos proveedores.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Escalabilidad por software, no por hardware</div>
  <p>Agregar una función nueva puede ser, en muchos casos, una cuestión de software sobre el HPC existente — en vez de diseñar, fabricar y cablear una ECU física nueva.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Costo total menor, aunque el HPC sea más caro</div>
  <p>Un HPC potente cuesta más por unidad que un microcontrolador simple, pero al reemplazar docenas de ECUs pequeñas, el costo total del sistema tiende a bajar.</p>
</div>
  </div>
  <div id="ad8-3" class="tab-panel">
<table class="kv-table"><tr><th>Fabricante</th><th>Enfoque</th></tr>
<tr><td>Tesla</td><td>Tres HPC principales (Front, Rear, Central) — de los ejemplos más citados de arquitectura zonal llevada a producción a gran escala.</td></tr>
<tr><td>Volkswagen Group</td><td>Backbone "E3" evolucionando hacia "E4" — busca consolidar el software del grupo sobre una plataforma común entre marcas.</td></tr>
<tr><td>BMW</td><td>Arquitectura E3/E4 propia, con consolidación progresiva de dominios en menos unidades de cómputo central.</td></tr>
</table>
<div class="alert-card">💡 Para una entrevista, lo importante no es memorizar el nombre exacto de la plataforma de cada fabricante (cambian con cada generación de vehículo), sino entender <strong>la dirección de la tendencia</strong>: menos ECUs, más centralización de cómputo, y una red backbone de mayor ancho de banda (Ethernet) reemplazando gradualmente a buses más limitados.</div>
  </div>
</div>
`,

'arch-autosar': `
<div class="tab-group-aa9">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'aa9-1','aa9')">Classic AUTOSAR</button>
    <button class="tab-btn" onclick="switchTab(this,'aa9-2','aa9')">Adaptive AUTOSAR</button>
    <button class="tab-btn" onclick="switchTab(this,'aa9-3','aa9')">Classic vs Adaptive</button>
    <button class="tab-btn" onclick="switchTab(this,'aa9-4','aa9')">Stack de capas</button>
  </div>
  <div id="aa9-1" class="tab-panel active">
<div class="concept-intro"><strong>AUTOSAR Classic</strong> es el estándar para ECUs embebidas tradicionales con requisitos de tiempo real duro — motor, transmisión, ABS. Prioriza el determinismo y el uso mínimo de recursos por sobre la flexibilidad.</div>
<table class="kv-table"><tr><th>Característica</th><th>Detalle</th></tr>
<tr><td>Sistema operativo</td><td>OSEK/AUTOSAR OS — tiempo real duro, tareas con prioridades fijas, comportamiento predecible al ciclo de reloj.</td></tr>
<tr><td>Organización en capas</td><td>Application (SWC) → RTE → Basic Software (BSW) → MCAL → Hardware.</td></tr>
<tr><td>RTE (Runtime Environment)</td><td>El middleware que conecta los Software Components entre sí y con los servicios del BSW — se genera automáticamente a partir de la configuración.</td></tr>
<tr><td>Configuración</td><td>Archivos ARXML (formato XML extenso). Herramientas típicas: Vector DaVinci, EB Tresos.</td></tr>
<tr><td>Recursos</td><td>Sin sistema de archivos ni networking avanzado — recursos de memoria y procesamiento muy limitados comparado con un HPC moderno.</td></tr>
</table>
  </div>
  <div id="aa9-2" class="tab-panel">
<div class="concept-intro"><strong>AUTOSAR Adaptive</strong> está diseñado para los High Performance Computers (HPC) modernos, que requieren un sistema operativo tipo Linux y conectividad Ethernet de alta velocidad — el mundo de ADAS, cockpit digital y domain/zonal controllers.</div>
<table class="kv-table"><tr><th>Característica</th><th>Detalle</th></tr>
<tr><td>Sistema operativo</td><td>POSIX-based, típicamente Linux — permite procesos dinámicos, a diferencia del scheduling fijo de Classic.</td></tr>
<tr><td>Comunicación</td><td>SOME/IP sobre Ethernet, con arquitectura orientada a servicios (SOA) — ver el módulo "Protocolos de Comunicación" para el detalle de SOME/IP.</td></tr>
<tr><td>Aplicaciones</td><td>Las Adaptive Applications (AA) corren como procesos normales del sistema operativo, no como tareas de tiempo real fijas.</td></tr>
<tr><td>Capacidades</td><td>Permite actualizaciones OTA, despliegue dinámico de software, y logging avanzado — cosas poco prácticas en un microcontrolador Classic.</td></tr>
<tr><td>Uso típico</td><td>Plataformas ADAS (ej. NVIDIA Drive), cockpit digital, domain controllers.</td></tr>
</table>
<div class="alert-card">💡 Classic y Adaptive <strong>coexisten</strong> en el mismo vehículo: es normal tener AUTOSAR Classic controlando el motor con tiempo real duro, mientras el computador de ADAS corre AUTOSAR Adaptive sobre Linux — cada uno resolviendo el problema para el que fue diseñado.</div>
  </div>
  <div id="aa9-3" class="tab-panel">
<table class="kv-table"><tr><th>Aspecto</th><th>Classic</th><th>Adaptive</th></tr>
<tr><td>Sistema operativo</td><td>OSEK/AUTOSAR OS (tiempo real duro)</td><td>POSIX / Linux (procesos dinámicos)</td></tr>
<tr><td>Comunicación</td><td>Señales sobre CAN/LIN/FlexRay</td><td>Servicios sobre SOME/IP + Ethernet</td></tr>
<tr><td>Configuración</td><td>Estática, en tiempo de compilación (ARXML)</td><td>Puede ser dinámica, en tiempo de ejecución</td></tr>
<tr><td>Recursos de hardware</td><td>Microcontrolador con memoria limitada</td><td>HPC con GPU/CPU potente, memoria abundante</td></tr>
<tr><td>Actualizaciones</td><td>Reflashing completo, poco frecuente</td><td>OTA, despliegue más ágil</td></tr>
<tr><td>Caso de uso típico</td><td>Motor, frenos, transmisión</td><td>ADAS, cockpit digital, HPC central</td></tr>
</table>
<div class="concept-intro">La pregunta de entrevista más común sobre este tema es exactamente esta comparación directa — y la respuesta clave a transmitir es que la elección entre Classic y Adaptive depende del <strong>hardware disponible y del requisito de tiempo real</strong>, no de que uno sea "mejor" que el otro en abstracto.</div>
  </div>
  <div id="aa9-4" class="tab-panel">
<div class="concept-intro">El stack de capas de AUTOSAR Classic es una de las imágenes que más vale la pena poder dibujar de memoria en una entrevista técnica — separa claramente qué parte del software es responsabilidad de quién.</div>
<div class="code-block"><div class="code-lang">AUTOSAR Classic — Stack de capas</div><pre>
┌─────────────────────────────────────┐
│  Application Layer (SWC)             │ ← Tu código de aplicación
│  PortInterfaces → Runnables          │
├─────────────────────────────────────┤
│  RTE (Runtime Environment)           │ ← Middleware generado automáticamente
│  Sender/Receiver, Client/Server      │
├─────────────────────────────────────┤
│  Basic Software (BSW)                │
│  COM / PduR / CanIf / NM / Dcm ...   │ ← Servicios del SO y comunicación
├─────────────────────────────────────┤
│  MCAL (Microcontroller Abstraction)  │ ← Drivers de hardware
│  Can / Adc / Dio / Gpt / Pwm ...     │
├─────────────────────────────────────┤
│  Hardware (µC)                       │
└─────────────────────────────────────┘</pre></div>
<table class="kv-table"><tr><th>Capa</th><th>Responsabilidad</th></tr>
<tr><td>Application (SWC)</td><td>La lógica de negocio propiamente dicha — lo que hace que esa ECU cumpla su función específica.</td></tr>
<tr><td>RTE</td><td>Conecta los Software Components entre sí y con el BSW, generado automáticamente a partir de la configuración ARXML.</td></tr>
<tr><td>BSW</td><td>Servicios estandarizados de comunicación y del sistema operativo — colas de mensajes, gestión de red, diagnóstico.</td></tr>
<tr><td>MCAL</td><td>Abstrae el hardware específico del microcontrolador — el mismo SWC puede portarse a otro µC cambiando solo esta capa.</td></tr>
</table>
  </div>
</div>
`,

};  // fin AUTO_RICH
