
// ══════════════════════════════════════════════════════════════════
//  PROTO_RICH — Protocolos de comunicación vehicular
// ══════════════════════════════════════════════════════════════════
const PROTO_RICH = {

'can-fundamentos': `
<div class="tab-group-pc1">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pc1-1','pc1')">Qué es y características eléctricas</button>
    <button class="tab-btn" onclick="switchTab(this,'pc1-2','pc1')">Bit stuffing</button>
    <button class="tab-btn" onclick="switchTab(this,'pc1-3','pc1')">Topología y límites físicos</button>
  </div>
  <div id="pc1-1" class="tab-panel active">
<div class="concept-intro"><strong>CAN</strong> (Controller Area Network, ISO 11898) fue desarrollado por Bosch en 1986 y sigue siendo el bus más usado en vehículos para control en tiempo real — motor, frenos, transmisión, carrocería. Su diseño resuelve un problema muy concreto: varias ECUs necesitan compartir el mismo cable sin un controlador central que arbitre el tráfico.</div>
<table class="kv-table"><tr><th>Característica</th><th>Detalle</th></tr>
<tr><td>Velocidad</td><td>CAN Classic hasta 1 Mbit/s; CAN FD hasta 8 Mbit/s en la fase de datos (ver el tema dedicado a CAN FD).</td></tr>
<tr><td>Bus diferencial</td><td>Dos hilos, CANH y CANL. La diferencia de voltaje entre ambos define el bit: diferencia &gt; 0.9V = dominante (0); diferencia ≈0 = recesivo (1). Esto lo hace muy inmune al ruido eléctrico del entorno del motor.</td></tr>
<tr><td>Sin dirección IP</td><td>Los mensajes se identifican por un <strong>ID de mensaje</strong> (11 o 29 bits), no por una dirección de nodo — cualquier ECU en el bus puede escuchar cualquier mensaje.</td></tr>
<tr><td>Arbitraje por ID (CSMA/CD)</td><td>Múltiple acceso con detección de colisión: si dos nodos transmiten a la vez, gana el que tiene el <strong>ID numéricamente más bajo</strong> — un 0 dominante siempre "gana" sobre un 1 recesivo bit a bit, sin perder tiempo ni datos en la colisión.</td></tr>
</table>
<div class="diagram-card">
<svg viewBox="0 0 600 195" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Señales diferenciales CANH y CANL: durante un bit dominante CANH sube y CANL baja; en un bit recesivo ambas quedan cerca del punto medio">
  <g font-family="'Segoe UI',sans-serif">
    <text x="18" y="79" font-size="10" fill="var(--text-muted)">3.5V</text>
    <text x="18" y="114" font-size="10" fill="var(--text-muted)">2.5V</text>
    <text x="18" y="149" font-size="10" fill="var(--text-muted)">1.5V</text>
    <line x1="60" y1="110" x2="580" y2="110" stroke="var(--border)" stroke-width="1" stroke-dasharray="3 3"/>
    <line x1="170" y1="55" x2="170" y2="168" stroke="var(--border)" stroke-width="1" stroke-dasharray="2 3"/>
    <line x1="270" y1="55" x2="270" y2="168" stroke="var(--border)" stroke-width="1" stroke-dasharray="2 3"/>
    <line x1="370" y1="55" x2="370" y2="168" stroke="var(--border)" stroke-width="1" stroke-dasharray="2 3"/>
    <line x1="470" y1="55" x2="470" y2="168" stroke="var(--border)" stroke-width="1" stroke-dasharray="2 3"/>
    <polyline points="70,110 170,110 170,75 370,75 370,110 470,110 470,75 570,75" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
    <polyline points="70,110 170,110 170,145 370,145 370,110 470,110 470,145 570,145" fill="none" stroke="var(--green)" stroke-width="2.5"/>
    <text x="65" y="68" font-size="11" fill="var(--accent)" font-weight="700">CANH</text>
    <text x="65" y="160" font-size="11" fill="var(--green)" font-weight="700">CANL</text>
    <g font-size="10.5" fill="var(--text-muted)" text-anchor="middle">
      <text x="120" y="182">1 (recesivo)</text>
      <text x="220" y="182">0 (dominante)</text>
      <text x="320" y="182">0 (dominante)</text>
      <text x="420" y="182">1 (recesivo)</text>
      <text x="520" y="182">0 (dominante)</text>
    </g>
  </g>
</svg>
<div class="diagram-caption">La diferencia de voltaje entre <b>CANH</b> y <b>CANL</b> es lo que define cada bit: en reposo (recesivo) ambas líneas quedan cerca de 2.5V; en un bit dominante, CANH sube y CANL baja, separándose claramente — ese diferencial es lo que hace al bus inmune al ruido eléctrico que afecta por igual a ambos hilos.</div>
</div>
<div class="alert-card">💡 Esta última propiedad es una de las preguntas de entrevista más comunes sobre CAN: el ID no solo identifica el mensaje, también define su <strong>prioridad</strong>. Por eso los mensajes más críticos para la seguridad (frenos, motor) reciben IDs bajos a propósito.</div>
  </div>
  <div id="pc1-2" class="tab-panel">
<div class="concept-intro">Los receptores CAN necesitan sincronizarse con el reloj del transmisor a partir de las transiciones de la señal (dominante↔recesivo). Si hubiera una secuencia muy larga del mismo bit, no habría transiciones y los relojes podrían desincronizarse.</div>
<div class="concept-intro">La solución es <strong>bit stuffing</strong>: después de <strong>5 bits consecutivos del mismo valor</strong>, el transmisor inserta automáticamente un bit de relleno del valor contrario. El receptor sabe la regla y descarta ese bit al decodificar, así que es completamente transparente para la aplicación.</div>
<div class="code-block"><div class="code-lang">Ejemplo de bit stuffing</div><pre>
Datos originales:  1 1 1 1 1 0 0 0 0 0 ...
Bits transmitidos: 1 1 1 1 1 <span class="c-nb">0</span> 0 0 0 0 0 <span class="c-nb">1</span> ...
                              ↑ stuff bit insertado          ↑ stuff bit insertado
                              (rompe la racha de 5 unos)     (rompe la racha de 5 ceros)</pre></div>
<div class="concept-intro">Esto también es relevante para entender los errores de bus: un <strong>Stuff Error</strong> ocurre cuando un nodo detecta 6 bits consecutivos del mismo valor en la trama — una señal de que algo en el bus está mal (ruido, un nodo defectuoso, o dos nodos transmitiendo tramas incompatibles a la vez).</div>
  </div>
  <div id="pc1-3" class="tab-panel">
<div class="concept-intro">CAN usa una topología de <strong>bus lineal</strong>: todos los nodos comparten el mismo par de cables, con una resistencia de terminación de <strong>120Ω en cada extremo</strong> del bus. Sin esos terminadores, la señal se refleja en los extremos del cable y el bus deja de funcionar correctamente — es de los primeros puntos a revisar cuando un bus CAN falla por completo.</div>
<div class="diagram-card">
<svg viewBox="0 0 620 175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Topología de bus lineal CAN con resistencias de terminación de 120 ohms en cada extremo y varias ECUs conectadas a lo largo del bus">
  <g font-family="'Segoe UI',sans-serif">
    <line x1="45" y1="75" x2="575" y2="75" stroke="var(--accent)" stroke-width="2.5"/>
    <line x1="45" y1="90" x2="575" y2="90" stroke="var(--accent)" stroke-width="2.5" stroke-dasharray="7 4"/>
    <text x="8" y="79" font-size="11" fill="var(--text-muted)">CANH</text>
    <text x="8" y="94" font-size="11" fill="var(--text-muted)">CANL</text>

    <rect x="35" y="65" width="10" height="35" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
    <text x="18" y="118" font-size="10" fill="var(--text-muted)">120Ω</text>
    <rect x="575" y="65" width="10" height="35" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
    <text x="560" y="118" font-size="10" fill="var(--text-muted)">120Ω</text>

    <line x1="140" y1="82" x2="140" y2="40" stroke="var(--border)" stroke-width="2"/>
    <rect x="100" y="10" width="80" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="140" y="29" font-size="12" fill="var(--accent)" text-anchor="middle" font-weight="600">ECM</text>

    <line x1="260" y1="82" x2="260" y2="40" stroke="var(--border)" stroke-width="2"/>
    <rect x="220" y="10" width="80" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="260" y="29" font-size="12" fill="var(--accent)" text-anchor="middle" font-weight="600">TCM</text>

    <line x1="380" y1="83" x2="380" y2="125" stroke="var(--border)" stroke-width="2"/>
    <rect x="340" y="125" width="80" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="380" y="144" font-size="12" fill="var(--accent)" text-anchor="middle" font-weight="600">ABS</text>

    <line x1="480" y1="83" x2="480" y2="125" stroke="var(--border)" stroke-width="2"/>
    <rect x="440" y="125" width="80" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="480" y="144" font-size="12" fill="var(--accent)" text-anchor="middle" font-weight="600">Gateway</text>
  </g>
</svg>
<div class="diagram-caption">Todos los nodos "cuelgan" del mismo par de cables (bus lineal). Los terminadores de <b>120Ω</b> en ambos extremos evitan que la señal rebote — sin ellos, el bus completo deja de funcionar, no solo un tramo.</div>
</div>
<table class="kv-table"><tr><th>Parámetro</th><th>Valor típico</th></tr>
<tr><td>Terminación</td><td>2 resistencias de 120Ω, una en cada extremo físico del bus (nunca en el medio).</td></tr>
<tr><td>Nodos por bus</td><td>~30 en la práctica — más nodos degradan la capacitancia del bus y afectan la integridad de la señal.</td></tr>
<tr><td>Longitud máxima a 1 Mbit/s</td><td>~40 metros.</td></tr>
<tr><td>Longitud máxima a 250 kbit/s</td><td>~250 metros.</td></tr>
</table>
<div class="alert-card">💡 Hay una relación directa entre velocidad y distancia máxima: a mayor velocidad, el bus tolera cables más cortos, porque la señal tiene menos tiempo por bit para propagarse y estabilizarse. Cuando un vehículo necesita más nodos o mayor distancia de los que un solo bus soporta, la solución es un <strong>Gateway</strong> que divida la red en varios buses (ver el módulo "Arquitectura Automotriz").</div>
  </div>
</div>
`,

'can-trama': `
<div class="tab-group-pc2">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pc2-1','pc2')">Campos del Data Frame</button>
    <button class="tab-btn" onclick="switchTab(this,'pc2-2','pc2')">ID Extendido (29 bits) y J1939</button>
    <button class="tab-btn" onclick="switchTab(this,'pc2-3','pc2')">Otros tipos de trama</button>
  </div>
  <div id="pc2-1" class="tab-panel active">
<div class="concept-intro">La <strong>Data Frame</strong> es el tipo de trama CAN que transporta datos de la aplicación — la que se usa en la inmensa mayoría de la comunicación vehicular.</div>
<div class="code-block"><div class="code-lang">CAN Frame — ID Standard (11 bits)</div><pre>
┌─────┬─────────────┬──────┬──────────┬──────┬─────┬─────┐
│ SOF │ ID (11 bit) │  RTR │ Control  │ Data │ CRC │ ACK │ EOF
│  1  │     11      │  1   │ 6 bits   │ 0-64 │ 15+1│  2  │  7
└─────┴─────────────┴──────┴──────────┴──────┴─────┴─────┘</pre></div>
<div class="diagram-card">
<svg viewBox="0 0 600 135" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Estructura de la trama CAN Data Frame con sus campos SOF, ID, RTR, Control, Data, CRC, ACK y EOF, mostrando el campo Data destacado como la carga útil">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="20" y="25" width="25" height="45" fill="var(--accent)" fill-opacity="0.15" stroke="var(--accent)" stroke-width="1.2"/>
    <rect x="45" y="25" width="95" height="45" fill="var(--accent)" fill-opacity="0.55" stroke="var(--accent)" stroke-width="1.2"/>
    <rect x="140" y="25" width="25" height="45" fill="var(--accent)" fill-opacity="0.15" stroke="var(--accent)" stroke-width="1.2"/>
    <rect x="165" y="25" width="65" height="45" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)" stroke-width="1.2"/>
    <rect x="230" y="25" width="185" height="45" fill="var(--green)" fill-opacity="0.5" stroke="var(--green)" stroke-width="1.4"/>
    <rect x="415" y="25" width="85" height="45" fill="var(--accent)" fill-opacity="0.15" stroke="var(--accent)" stroke-width="1.2"/>
    <rect x="500" y="25" width="25" height="45" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)" stroke-width="1.2"/>
    <rect x="525" y="25" width="55" height="45" fill="var(--accent)" fill-opacity="0.15" stroke="var(--accent)" stroke-width="1.2"/>

    <g font-size="9.5" fill="var(--text)" text-anchor="middle" font-weight="600">
      <text x="32" y="52">SOF</text>
      <text x="92" y="52">ID</text>
      <text x="152" y="52">RTR</text>
      <text x="197" y="52">Ctrl</text>
      <text x="322" y="52">Data</text>
      <text x="457" y="52">CRC</text>
      <text x="512" y="52">ACK</text>
      <text x="552" y="52">EOF</text>
    </g>
    <g font-size="9" fill="var(--text-muted)" text-anchor="middle">
      <text x="32" y="86">1 bit</text>
      <text x="92" y="86">11 bits</text>
      <text x="152" y="86">1 bit</text>
      <text x="197" y="86">6 bits</text>
      <text x="322" y="86">0-64 bytes</text>
      <text x="457" y="86">15+1 bits</text>
      <text x="512" y="86">2 bits</text>
      <text x="552" y="86">7 bits</text>
    </g>
  </g>
</svg>
<div class="diagram-caption">La misma trama de la tabla anterior, ahora a escala visual: el campo <b>Data</b> (verde) es el único que varía en tamaño según el mensaje — todo lo demás es "overhead" fijo del protocolo que viaja en cada trama, tenga 1 byte de datos o 8.</div>
</div>
<table class="kv-table"><tr><th>Campo</th><th>Qué contiene</th></tr>
<tr><td>SOF</td><td>Start Of Frame — 1 bit dominante que inicia la sincronización de todos los nodos que escuchan.</td></tr>
<tr><td>ID</td><td>Identificador del mensaje — define tanto su contenido como su prioridad en el arbitraje.</td></tr>
<tr><td>RTR</td><td>Remote Transmission Request — 0 indica Data Frame (con datos), 1 indica Remote Frame (solicitud de datos).</td></tr>
<tr><td>Control</td><td>Incluye IDE (0=estándar, 1=extendido) y DLC (4 bits, longitud de datos de 0 a 8 bytes).</td></tr>
<tr><td>Data</td><td>Los datos de la aplicación en sí — de 0 a 8 bytes en CAN Classic.</td></tr>
<tr><td>CRC</td><td>Cyclic Redundancy Check de 15 bits más un bit delimitador, para detectar errores de transmisión.</td></tr>
<tr><td>ACK</td><td>1 bit de reconocimiento — cualquier receptor que haya recibido la trama correctamente escribe un 0 (dominante) aquí, incluso si no le "importa" ese mensaje.</td></tr>
<tr><td>EOF</td><td>End Of Frame — 7 bits recesivos que marcan el final de la trama.</td></tr>
</table>
  </div>
  <div id="pc2-2" class="tab-panel">
<div class="concept-intro">Cuando 11 bits de ID (2048 combinaciones) no alcanzan para todos los mensajes de una red muy grande, se usa la <strong>trama extendida</strong> con 29 bits de ID. El bit IDE=1 en el campo de control indica que la trama es extendida — el ID total se compone de un Base ID (11 bits) más una Extensión (18 bits adicionales).</div>
<div class="alert-card">💡 El caso de uso más citado en entrevista es <strong>J1939</strong>, el estándar usado en vehículos pesados (camiones, maquinaria agrícola). Ahí el ID extendido no es un número arbitrario: codifica directamente la <strong>Source Address</strong> (quién envía), el <strong>PGN — Parameter Group Number</strong> (qué tipo de dato es) y la prioridad del mensaje, todo dentro de los 29 bits.</div>
<div class="concept-intro">En vehículos de pasajeros es más común encontrar redes que combinan mayormente IDs estándar de 11 bits, reservando el extendido para casos puntuales donde la cantidad de mensajes únicos realmente lo justifica.</div>
  </div>
  <div id="pc2-3" class="tab-panel">
<div class="concept-intro">El Data Frame no es el único tipo de trama que existe en el protocolo CAN — conocer los otros tipos ayuda a entender qué está pasando al mirar una traza en CANoe o CANalyzer.</div>
<table class="kv-table"><tr><th>Tipo de trama</th><th>Para qué sirve</th></tr>
<tr><td>Data Frame</td><td>Transporta datos de la aplicación — la más común, con RTR=0.</td></tr>
<tr><td>Remote Frame</td><td>Un nodo solicita que otro le envíe datos de un ID específico, sin transportar datos él mismo (RTR=1). Poco usado en diseños modernos.</td></tr>
<tr><td>Error Frame</td><td>Se genera automáticamente cuando un nodo detecta un error (de forma, CRC, ACK, stuffing) — interrumpe la trama en curso para que todos los nodos la descarten.</td></tr>
<tr><td>Overload Frame</td><td>Un nodo la genera para pedir un retraso adicional antes de la siguiente trama, cuando necesita más tiempo de procesamiento. Muy poco frecuente en la práctica.</td></tr>
</table>
  </div>
</div>
`,

'can-fd': `
<div class="tab-group-pc3">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pc3-1','pc3')">Qué mejora sobre CAN clásico</button>
    <button class="tab-btn" onclick="switchTab(this,'pc3-2','pc3')">Compatibilidad</button>
    <button class="tab-btn" onclick="switchTab(this,'pc3-3','pc3')">Cuándo usarlo</button>
  </div>
  <div id="pc3-1" class="tab-panel active">
<div class="concept-intro"><strong>CAN FD</strong> (Flexible Data Rate, ISO 11898-1:2015) es la evolución del CAN clásico: mantiene exactamente el mismo mecanismo de arbitraje por ID, pero añade dos mejoras que responden a limitaciones muy concretas del CAN original.</div>
<table class="kv-table"><tr><th>Mejora</th><th>Detalle</th></tr>
<tr><td>Payload extendido</td><td>Hasta 64 bytes por trama, frente a los 8 bytes de CAN Classic — 8 veces más datos por mensaje.</td></tr>
<tr><td>Velocidad dual</td><td>El arbitraje (la parte inicial de la trama, donde se decide quién transmite) ocurre a la velocidad normal (≤1 Mbit/s), y luego la <strong>fase de datos</strong> acelera hasta 8 Mbit/s.</td></tr>
</table>
<div class="concept-intro">El bit <strong>BRS</strong> (Bit Rate Switch) dentro de la trama es el que marca exactamente el instante en que el bus cambia de la velocidad de arbitraje a la velocidad acelerada de datos, y vuelve a la velocidad normal antes del CRC.</div>
  </div>
  <div id="pc3-2" class="tab-panel">
<div class="concept-intro">Los controladores CAN FD son <strong>retrocompatibles</strong>: pueden comunicarse con nodos CAN Classic a la velocidad normal sin problema. El matiz importante está en la otra dirección.</div>
<div class="alert-card">⚠️ Un nodo <strong>CAN Classic puro</strong> en el mismo bus físico que tramas CAN FD generará errores: al no entender el formato extendido, interpretará los bytes adicionales como violaciones de bit stuffing. Por eso, en redes mixtas hay dos soluciones posibles: usar controladores CAN FD configurados en modo "Classic compatible" en toda la red, o directamente separar los nodos Classic y FD en buses físicos distintos.</div>
<div class="concept-intro">En la práctica, la mayoría de los vehículos nuevos diseñan cada bus completo como CAN FD desde el inicio, evitando mezclar generaciones de nodos en el mismo segmento físico.</div>
  </div>
  <div id="pc3-3" class="tab-panel">
<table class="kv-table"><tr><th>Aplicación</th><th>Por qué CAN FD ayuda</th></tr>
<tr><td>Flasheo de firmware (bootloader)</td><td>Enviar 64 bytes por trama en vez de 8 acelera drásticamente el tiempo de descarga de un firmware nuevo.</td></tr>
<tr><td>Calibración XCP</td><td>Más datos de medición caben en cada trama, reduciendo la sobrecarga de protocolo por byte útil transmitido.</td></tr>
<tr><td>Diagnóstico (ISO-TP sobre CAN FD)</td><td>Permite mensajes UDS más grandes con menos tramas de segmentación.</td></tr>
<tr><td>Reemplazo parcial de FlexRay</td><td>En aplicaciones que no exigen el determinismo estricto de FlexRay, CAN FD ofrece más ancho de banda a menor costo.</td></tr>
</table>
<div class="concept-intro">Adoptado ampliamente por BMW, GM y FCA desde alrededor de 2015, CAN FD es hoy prácticamente el estándar por defecto en vehículos de nueva plataforma, con CAN Classic reservado para nodos más simples y económicos donde el mayor ancho de banda no aporta nada.</div>
  </div>
</div>
`,

'can-ejemplo': `
<div class="tab-group-pc4">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pc4-1','pc4')">Escenario — trazando el mensaje</button>
    <button class="tab-btn" onclick="switchTab(this,'pc4-2','pc4')">DBC File</button>
    <button class="tab-btn" onclick="switchTab(this,'pc4-3','pc4')">En un analizador (traza real)</button>
  </div>
  <div id="pc4-1" class="tab-panel active">
<div class="concept-intro">Sigamos un mensaje CAN real, de punta a punta, desde que el conductor gira la llave hasta que llega a todas las ECUs que lo necesitan.</div>
<div class="dtree">
  <div class="dtree-title">Trazando el mensaje de ignición</div>
  <div class="dtree-step"><div class="dtree-num ok">1</div><div class="dtree-body"><h5>El BCM detecta el evento</h5><p>Transmite <code>ID=0x105, Data=[01 00 00 00]</code> — estado de ignición = ON.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">2</div><div class="dtree-body"><h5>El Gateway recibe y enruta</h5><p>Filtra el mensaje y lo reenvía a los buses de destino que lo necesitan (ver el tema "Gateway ECU" del módulo de Arquitectura).</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">3</div><div class="dtree-body"><h5>TCM y ECM reciben el mensaje</h5><p>El Transmission Control Module y el Engine Control Module se inicializan al ver el cambio de estado.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">4</div><div class="dtree-body"><h5>El cuadro de instrumentos reacciona</h5><p>Enciende las luces de advertencia correspondientes durante el ciclo de arranque (auto-chequeo del tablero).</p></div></div>
</div>
  </div>
  <div id="pc4-2" class="tab-panel">
<div class="concept-intro">Un archivo <strong>DBC</strong> (CAN Database, formato de Vector) es la documentación formal de qué mensajes existen en el bus, quién los transmite, y cómo se interpretan sus bytes — es lo primero que se consulta antes de trabajar con cualquier bus CAN de un vehículo real.</div>
<div class="code-block"><div class="code-lang">DBC — Definición del mensaje de ignición</div><pre>
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
<table class="kv-table"><tr><th>Elemento DBC</th><th>Qué indica</th></tr>
<tr><td>BO_ 261 IGN_STATUS: 4 BCM</td><td>Mensaje con ID 261 (decimal), nombre IGN_STATUS, 4 bytes de longitud, transmitido por el nodo BCM.</td></tr>
<tr><td>SG_ IgnitionKey : 0|2@1+</td><td>Señal que empieza en el bit 0, ocupa 2 bits, orden little-endian (@1), sin signo (+).</td></tr>
<tr><td>VAL_</td><td>Tabla de valores con nombre — convierte el número crudo (0, 1, 2, 3) en un significado legible (OFF, ACC, ON, START).</td></tr>
</table>
  </div>
  <div id="pc4-3" class="tab-panel">
<div class="concept-intro">Así se vería este mismo mensaje en la ventana de traza de una herramienta como CANoe o CANalyzer — la vista que se usa a diario para depurar comunicación CAN en un vehículo real o en el banco de pruebas.</div>
<table class="kv-table"><tr><th>Tiempo</th><th>ID</th><th>Nombre</th><th>DLC</th><th>Data (hex)</th><th>Interpretado</th></tr>
<tr><td>0.000</td><td>0x105</td><td>IGN_STATUS</td><td>4</td><td>01 00 00 00</td><td>IgnitionKey = ACC</td></tr>
<tr><td>0.850</td><td>0x105</td><td>IGN_STATUS</td><td>4</td><td>02 00 00 00</td><td>IgnitionKey = ON</td></tr>
<tr><td>1.200</td><td>0x105</td><td>IGN_STATUS</td><td>4</td><td>03 20 00 00</td><td>IgnitionKey = START, StartButton = 1</td></tr>
</table>
<div class="alert-card">💡 Sin el archivo DBC cargado en la herramienta, todo lo que verías es la columna de bytes en hexadecimal — el DBC es lo que transforma "01 00 00 00" en algo legible como "IgnitionKey = ACC". Saber leer una traza cruda y saber por qué el DBC es indispensable es una pregunta frecuente en entrevistas de este rol.</div>
  </div>
</div>
`,

'lin': `
<div class="tab-group-pl5">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pl5-1','pl5')">Características</button>
    <button class="tab-btn" onclick="switchTab(this,'pl5-2','pl5')">Trama LIN — Header + Response</button>
    <button class="tab-btn" onclick="switchTab(this,'pl5-3','pl5')">Usos típicos</button>
  </div>
  <div id="pl5-1" class="tab-panel active">
<div class="concept-intro"><strong>LIN</strong> (Local Interconnect Network) se creó en 1999 para reemplazar el cableado punto a punto de funciones simples de carrocería con un bus mucho más barato que CAN — la prioridad de diseño es el costo, no la velocidad ni el determinismo estricto.</div>
<table class="kv-table"><tr><th>Característica</th><th>Detalle</th></tr>
<tr><td>Single wire</td><td>Un solo hilo de señal (más masa del chasis como retorno) — mucho más barato de implementar que el par diferencial de CAN.</td></tr>
<tr><td>Velocidad</td><td>20 kbit/s — baja, pero de sobra para sensores y actuadores lentos como una ventana eléctrica.</td></tr>
<tr><td>Maestro-Esclavo</td><td>1 nodo Master (generalmente el BCM) controla hasta 16 nodos Slave. El Master decide siempre quién habla y cuándo.</td></tr>
<tr><td>Sin colisiones</td><td>El Master envía un header con una Schedule Table predefinida; cada Slave responde solo en su turno asignado — protocolo completamente determinista, sin arbitraje.</td></tr>
</table>
<div class="diagram-card">
<svg viewBox="0 0 560 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Topología LIN: un nodo Master controla el acceso de varios nodos Slave sobre un único hilo compartido">
  <g font-family="'Segoe UI',sans-serif">
    <line x1="120" y1="80" x2="520" y2="80" stroke="var(--accent)" stroke-width="2.5"/>
    <rect x="20" y="60" width="100" height="40" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="2.5"/>
    <text x="70" y="84" font-size="12" fill="var(--accent)" text-anchor="middle" font-weight="700">BCM (Master)</text>

    <line x1="200" y1="80" x2="200" y2="40" stroke="var(--border)" stroke-width="2"/>
    <rect x="160" y="10" width="80" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="200" y="29" font-size="11" fill="var(--accent)" text-anchor="middle" font-weight="600">Ventana</text>

    <line x1="300" y1="80" x2="300" y2="120" stroke="var(--border)" stroke-width="2"/>
    <rect x="260" y="120" width="80" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="300" y="139" font-size="11" fill="var(--accent)" text-anchor="middle" font-weight="600">Espejo</text>

    <line x1="400" y1="80" x2="400" y2="40" stroke="var(--border)" stroke-width="2"/>
    <rect x="358" y="10" width="94" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="405" y="29" font-size="11" fill="var(--accent)" text-anchor="middle" font-weight="600">Sensor lluvia</text>

    <line x1="490" y1="80" x2="490" y2="120" stroke="var(--border)" stroke-width="2"/>
    <rect x="450" y="120" width="80" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="490" y="139" font-size="11" fill="var(--accent)" text-anchor="middle" font-weight="600">Asiento</text>
  </g>
</svg>
<div class="diagram-caption">El <b>Master</b> (normalmente el BCM) es el único que decide cuándo habla cada nodo — los <b>Slaves</b> nunca inician una transmisión por su cuenta, solo responden cuando el Master los interroga.</div>
</div>
  </div>
  <div id="pl5-2" class="tab-panel">
<div class="concept-intro">La trama LIN se divide en dos partes claramente diferenciadas: el <strong>Header</strong>, que siempre envía el Master, y el <strong>Response</strong>, que envía el Slave que corresponda.</div>
<div class="pipeline-diagram"><span class="p-blue">Master</span> envía Header (Break + Sync + PID) ──▶ <span class="p-amber">Todos los Slaves escuchan el PID</span> ──▶ <span class="p-green">Solo el Slave designado responde</span> ──▶ <span class="p-amber">Response: hasta 8 bytes + checksum</span></div>
<table class="kv-table"><tr><th>Campo del Header</th><th>Qué hace</th></tr>
<tr><td>Break</td><td>Secuencia especial que marca el inicio de una trama nueva — despierta a todos los nodos del bus.</td></tr>
<tr><td>Sync</td><td>Byte de sincronización que permite a los Slaves calibrar su reloj interno contra el del Master.</td></tr>
<tr><td>PID (Protected Identifier)</td><td>Identifica qué mensaje es — determina cuál de los Slaves debe responder.</td></tr>
</table>
<div class="concept-intro">Existen varias versiones del estándar (LIN 1.x, LIN 2.x), siendo <strong>LIN 2.2A</strong> la más extendida en vehículos actuales, con mejoras de diagnóstico y detección de errores sobre las versiones anteriores.</div>
  </div>
  <div id="pl5-3" class="tab-panel">
<div class="concept-intro">Todos estos nodos LIN típicamente cuelgan del mismo BCM que actúa como Master (ver el tema "BCM — Body Control Module" del módulo de Arquitectura):</div>
<div class="two-col">
  <div class="info-card">
    <h5>Confort y visibilidad</h5>
    <li>Módulos de ventana eléctrica (posición, función anti-pinch)</li>
    <li>Sensores de lluvia/luz (activan limpiaparabrisas y luces automáticas)</li>
    <li>Control de espejos laterales (motores de posición, dos ejes)</li>
  </div>
  <div class="info-card">
    <h5>Habitáculo</h5>
    <li>Asientos eléctricos (control de posición)</li>
    <li>Climatización (dampers y control de ventiladores)</li>
    <li>Luces de interior con función dimmer</li>
  </div>
</div>
<div class="alert-card">💡 La pregunta de entrevista típica es "¿por qué no usar CAN para todo?" — la respuesta es costo: instalar un transceiver CAN completo en cada motor de ventana sería sobredimensionado y caro para una función que solo necesita 20 kbit/s y determinismo simple, no arbitraje ni alta velocidad.</div>
  </div>
</div>
`,

'flexray': `
<div class="tab-group-pf6">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pf6-1','pf6')">Por qué FlexRay — TDMA</button>
    <button class="tab-btn" onclick="switchTab(this,'pf6-2','pf6')">Doble canal y redundancia</button>
    <button class="tab-btn" onclick="switchTab(this,'pf6-3','pf6')">Aplicaciones y estado actual</button>
  </div>
  <div id="pf6-1" class="tab-panel active">
<div class="concept-intro"><strong>FlexRay</strong> (ISO 17458) fue desarrollado por un consorcio de BMW, Bosch, DaimlerChrysler y Philips para cubrir aplicaciones donde CAN se queda corto — específicamente, donde hace falta <strong>determinismo garantizado</strong>, no solo velocidad.</div>
<div class="concept-intro">La diferencia central frente a CAN es el mecanismo de acceso al bus: en vez de arbitraje por prioridad (donde un mensaje de menor prioridad puede, en teoría, esperar un tiempo variable), FlexRay usa <strong>TDMA</strong> (Time Division Multiple Access) — cada mensaje tiene un <strong>slot de tiempo fijo y predefinido</strong>, así que su momento exacto de transmisión se conoce de antemano, siempre.</div>
<table class="kv-table"><tr><th>Característica</th><th>Detalle</th></tr>
<tr><td>Determinismo</td><td>TDMA con slots fijos — ideal para control de chassis donde la latencia variable es inaceptable.</td></tr>
<tr><td>Velocidad</td><td>10 Mbit/s — 10 veces más rápido que CAN Classic.</td></tr>
<tr><td>Sincronización de reloj</td><td>El propio protocolo incluye mecanismos de sincronización de reloj entre todos los nodos de la red.</td></tr>
</table>
  </div>
  <div id="pf6-2" class="tab-panel">
<div class="concept-intro">FlexRay soporta <strong>dos canales independientes</strong> (Canal A y Canal B) que pueden usarse de dos formas distintas según el diseño del sistema.</div>
<table class="kv-table"><tr><th>Uso de los dos canales</th><th>Para qué sirve</th></tr>
<tr><td>Redundancia</td><td>El mismo mensaje se envía por ambos canales — si uno falla, el sistema sigue funcionando con el otro. Crítico para funciones safety-critical.</td></tr>
<tr><td>Ancho de banda duplicado</td><td>Alternativamente, cada canal puede transportar mensajes distintos, duplicando el throughput total de la red en vez de duplicar la confiabilidad.</td></tr>
</table>
<div class="diagram-card">
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FlexRay con dos canales independientes A y B conectando los mismos nodos, usados para redundancia o para duplicar el ancho de banda">
  <g font-family="'Segoe UI',sans-serif">
    <line x1="60" y1="60" x2="500" y2="60" stroke="var(--accent)" stroke-width="2.5"/>
    <text x="15" y="64" font-size="11" fill="var(--text-muted)">Canal A</text>
    <line x1="60" y1="140" x2="500" y2="140" stroke="var(--green)" stroke-width="2.5"/>
    <text x="15" y="144" font-size="11" fill="var(--text-muted)">Canal B</text>

    <line x1="150" y1="60" x2="150" y2="140" stroke="var(--border)" stroke-width="2"/>
    <rect x="105" y="85" width="90" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="150" y="104" font-size="11" fill="var(--accent)" text-anchor="middle" font-weight="600">Steering ECU</text>

    <line x1="300" y1="60" x2="300" y2="140" stroke="var(--border)" stroke-width="2"/>
    <rect x="255" y="85" width="90" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="300" y="104" font-size="11" fill="var(--accent)" text-anchor="middle" font-weight="600">Brake ECU</text>

    <line x1="420" y1="60" x2="420" y2="140" stroke="var(--border)" stroke-width="2"/>
    <rect x="375" y="85" width="90" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="420" y="104" font-size="11" fill="var(--accent)" text-anchor="middle" font-weight="600">Suspension</text>
  </g>
</svg>
<div class="diagram-caption">Cada ECU se conecta a <b>ambos</b> canales. Si se usan en modo redundante, el mismo mensaje viaja por A y por B — si un canal falla, el sistema sigue operando con el otro sin perder la función.</div>
</div>
<div class="alert-card">💡 Esta elección (redundancia vs más ancho de banda) es una decisión de diseño de sistema que depende directamente del análisis de seguridad funcional (HARA/ASIL) de esa función — ver el módulo "Estándares & Seguridad".</div>
  </div>
  <div id="pf6-3" class="tab-panel">
<table class="kv-table"><tr><th>Aplicación</th><th>Por qué FlexRay</th></tr>
<tr><td>Chassis-by-wire (steer-by-wire, brake-by-wire)</td><td>El feedback de dirección o frenado viaja por cable en vez de un enlace mecánico — exige latencia mínima y determinista.</td></tr>
<tr><td>Suspensión activa</td><td>El sistema debe reaccionar a las irregularidades del camino en milisegundos, con timing predecible.</td></tr>
<tr><td>ADAS de alta frecuencia (generación anterior)</td><td>Integración de datos de sensores con ciclos de 10ms o menos.</td></tr>
</table>
<div class="concept-intro">BMW lo usó extensamente en el chassis de sus modelos Serie 5 y Serie 7; Audi y Mercedes también lo adoptaron en plataformas de gama alta. Sin embargo, <strong>el estado actual de la industria es de retirada gradual</strong>: FlexRay es más costoso de implementar que CAN o Ethernet, y muchas de las funciones que antes lo justificaban hoy se resuelven con CAN FD (para lo que no exige TDMA estricto) o con Automotive Ethernet + TSN (para lo que sí necesita determinismo con más ancho de banda).</div>
  </div>
</div>
`,

'eth-auto': `
<div class="tab-group-pe7">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pe7-1','pe7')">Por qué Ethernet en autos</button>
    <button class="tab-btn" onclick="switchTab(this,'pe7-2','pe7')">Aplicaciones</button>
    <button class="tab-btn" onclick="switchTab(this,'pe7-3','pe7')">TSN — determinismo sobre Ethernet</button>
  </div>
  <div id="pe7-1" class="tab-panel active">
<div class="concept-intro"><strong>Automotive Ethernet</strong> adapta el Ethernet de oficina/datacenter al entorno físico y eléctrico de un vehículo, resolviendo el mismo problema que ni CAN ni FlexRay pueden resolver por sí solos: ancho de banda del orden de cientos de Mbit/s o más.</div>
<table class="kv-table"><tr><th>Estándar</th><th>Velocidad</th><th>Detalle</th></tr>
<tr><td>100BASE-T1 (IEEE 802.3bw)</td><td>100 Mbit/s</td><td>Sobre 1 par de hilos no trenzados, hasta ~15m — usado para cámaras individuales y sensores ADAS.</td></tr>
<tr><td>1000BASE-T1 (IEEE 802.3bp)</td><td>1 Gbit/s</td><td>Para el backbone del vehículo y comunicación con el HPC central.</td></tr>
<tr><td>10G / Multi-Gig</td><td>10 Gbit/s+</td><td>En desarrollo/adopción temprana para los HPC y "data centers vehiculares" de próxima generación.</td></tr>
</table>
<div class="concept-intro">La tecnología física base es <strong>BroadR-Reach</strong> (originalmente de Broadcom, hoy estandarizada dentro de IEEE): al no requerir los transformadores de aislamiento del Ethernet de oficina, alcanza con <strong>un solo par de hilos</strong> en vez de los cuatro pares del cableado Ethernet tradicional — clave para mantener el peso y el costo del cableado bajo control.</div>
<div class="diagram-card">
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Topología en estrella de Ethernet automotriz: un switch central conecta cada nodo de forma independiente, a diferencia del bus compartido de CAN">
  <g font-family="'Segoe UI',sans-serif">
    <line x1="280" y1="125" x2="80" y2="32" stroke="var(--border)" stroke-width="2"/>
    <line x1="280" y1="125" x2="480" y2="32" stroke="var(--border)" stroke-width="2"/>
    <line x1="280" y1="125" x2="80" y2="222" stroke="var(--border)" stroke-width="2"/>
    <line x1="280" y1="125" x2="480" y2="222" stroke="var(--border)" stroke-width="2"/>

    <rect x="230" y="105" width="100" height="40" rx="8" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="2.5"/>
    <text x="280" y="129" font-size="12" fill="var(--accent)" text-anchor="middle" font-weight="700">Switch</text>

    <rect x="35" y="15" width="90" height="34" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="80" y="36" font-size="11" fill="var(--accent)" text-anchor="middle" font-weight="600">Cámara FL</text>

    <rect x="435" y="15" width="90" height="34" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="480" y="36" font-size="11" fill="var(--accent)" text-anchor="middle" font-weight="600">Cámara FR</text>

    <rect x="35" y="205" width="90" height="34" rx="6" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="80" y="226" font-size="11" fill="var(--accent)" text-anchor="middle" font-weight="600">Radar</text>

    <rect x="435" y="205" width="90" height="34" rx="6" fill="var(--green)" fill-opacity="0.2" stroke="var(--green)" stroke-width="1.5"/>
    <text x="480" y="226" font-size="11" fill="var(--green)" text-anchor="middle" font-weight="600">HPC / Display</text>
  </g>
</svg>
<div class="diagram-caption">A diferencia del bus compartido de CAN, cada nodo tiene su <b>propio enlace dedicado</b> al switch — un cable dañado solo afecta a ese nodo, y el ancho de banda de cada enlace no se comparte con el resto de la red.</div>
</div>
  </div>
  <div id="pe7-2" class="tab-panel">
<table class="kv-table"><tr><th>Caso de uso</th><th>Por qué Ethernet y no CAN</th></tr>
<tr><td>Cámaras</td><td>Una sola cámara HD genera del orden de 100 Mbit/s de datos — muy por encima de lo que CAN o incluso CAN FD pueden manejar.</td></tr>
<tr><td>ADAS y fusión de sensores</td><td>Combinar datos de cámaras, radar y LIDAR en tiempo real requiere un ancho de banda agregado enorme.</td></tr>
<tr><td>Backbone zonal</td><td>La columna vertebral que conecta el HPC central con las zonas del vehículo corre sobre 1G o superior (ver "Domain vs Zonal Architecture").</td></tr>
<tr><td>Diagnóstico moderno (DoIP)</td><td>UDS sobre IP es sensiblemente más rápido que UDS sobre CAN para operaciones grandes como el flasheo (ver el tema "DoIP").</td></tr>
<tr><td>Actualizaciones OTA</td><td>Descargar un firmware de varios GB de tamaño solo es viable con el ancho de banda que ofrece Ethernet.</td></tr>
</table>
  </div>
  <div id="pe7-3" class="tab-panel">
<div class="concept-intro">Ethernet estándar, por diseño, no garantiza cuándo llega cada paquete — es "best effort". Eso es un problema para funciones safety-critical que antes vivían en FlexRay, precisamente por su determinismo. La respuesta de la industria es <strong>TSN</strong> (Time-Sensitive Networking), un conjunto de extensiones IEEE 802.1 que le agregan a Ethernet garantías de tiempo real.</div>
<table class="kv-table"><tr><th>Mecanismo TSN</th><th>Qué aporta</th></tr>
<tr><td>Time Synchronization (802.1AS)</td><td>Sincroniza el reloj de todos los nodos de la red con precisión de nanosegundos — la base para cualquier garantía de timing.</td></tr>
<tr><td>Scheduled Traffic (802.1Qbv)</td><td>Reserva ventanas de tiempo fijas para el tráfico crítico, de forma conceptualmente similar a los slots TDMA de FlexRay, pero sobre Ethernet.</td></tr>
<tr><td>Frame Preemption (802.1Qbu)</td><td>Permite que un paquete de alta prioridad interrumpa la transmisión de uno de baja prioridad ya en curso, en vez de esperar a que termine.</td></tr>
</table>
<div class="alert-card">💡 TSN es, en esencia, la respuesta de la industria a la pregunta "¿podemos tener el ancho de banda de Ethernet con el determinismo de FlexRay?" — y es una de las razones técnicas centrales por las que FlexRay está en retirada en los diseños más nuevos.</div>
  </div>
</div>
`,

'someip': `
<div class="tab-group-ps8">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ps8-1','ps8')">Qué es — conceptos SOA</button>
    <button class="tab-btn" onclick="switchTab(this,'ps8-2','ps8')">Service Discovery (SOME/IP-SD)</button>
    <button class="tab-btn" onclick="switchTab(this,'ps8-3','ps8')">Ejemplo de definición de servicio</button>
  </div>
  <div id="ps8-1" class="tab-panel active">
<div class="concept-intro"><strong>SOME/IP</strong> (Scalable service-Oriented MiddlEware over IP) es el middleware de comunicación estándar de <strong>AUTOSAR Adaptive</strong> (ver el módulo de Arquitectura Automotriz). Permite implementar una <strong>SOA</strong> (Service-Oriented Architecture) vehicular sobre Automotive Ethernet, usando UDP o TCP como transporte.</div>
<table class="kv-table"><tr><th>Concepto</th><th>Qué representa</th></tr>
<tr><td>Service</td><td>Una funcionalidad ofrecida por una ECU — por ejemplo, "servicio de velocidad del vehículo".</td></tr>
<tr><td>Method</td><td>Una función que se puede llamar remotamente, similar a un RPC (Remote Procedure Call).</td></tr>
<tr><td>Event</td><td>Una notificación que el servicio envía cuando cambia un valor de interés, sin que el cliente tenga que preguntar constantemente.</td></tr>
<tr><td>Field</td><td>Un atributo del servicio con getter, setter y notificaciones automáticas de cambio — combina lo mejor de Method y Event.</td></tr>
</table>
<div class="concept-intro">El cambio de paradigma respecto a CAN es central: CAN transmite <strong>señales</strong> en una trama fija y predefinida en tiempo de diseño; SOME/IP expone <strong>servicios</strong> que se pueden descubrir e invocar dinámicamente — mucho más parecido a cómo funcionan las APIs en el mundo del software de propósito general.</div>
  </div>
  <div id="ps8-2" class="tab-panel">
<div class="concept-intro"><strong>SOME/IP-SD</strong> (Service Discovery) es el mecanismo que permite que los servicios se encuentren dinámicamente en la red, en vez de tener direcciones fijas conocidas de antemano — algo fundamental en Adaptive AUTOSAR, donde los servicios pueden iniciarse y detenerse en tiempo de ejecución.</div>
<div class="pipeline-diagram"><span class="p-blue">Servidor</span> envía <span class="p-amber">OfferService</span> (multicast, anuncia disponibilidad)
<span class="p-green">Cliente</span> envía <span class="p-amber">FindService</span> (busca un servicio específico)
<span class="p-blue">Servidor</span> responde <span class="p-amber">OfferService</span> (unicast, directo al cliente)
<span class="p-green">Cliente</span> hace <span class="p-amber">Subscribe</span> a los EventGroups que le interesan</div>
<table class="kv-table"><tr><th>Paso</th><th>Qué ocurre</th></tr>
<tr><td>1. OfferService (multicast)</td><td>El proveedor del servicio anuncia periódicamente "estoy disponible" a toda la red.</td></tr>
<tr><td>2. FindService</td><td>Un cliente que necesita ese servicio pregunta activamente si existe en la red.</td></tr>
<tr><td>3. OfferService (unicast)</td><td>El servidor responde directamente al cliente que preguntó.</td></tr>
<tr><td>4. Subscribe a EventGroup</td><td>El cliente se suscribe a las notificaciones específicas que le interesan del servicio, no a todas.</td></tr>
</table>
  </div>
  <div id="ps8-3" class="tab-panel">
<div class="concept-intro">Un ejemplo conceptual simplificado de cómo se describe un servicio de velocidad del vehículo — en la práctica esto se especifica en archivos ARXML dentro del ecosistema de herramientas AUTOSAR, pero la idea es la misma.</div>
<div class="code-block"><div class="code-lang">Servicio "VehicleSpeed" — definición conceptual</div><pre>
Service: VehicleSpeed
  Service ID:    0x1234
  Instance ID:   0x0001

  Method:
    GetSpeedHistory(timeRange) -> SpeedSample[]

  Event:
    OnSpeedChanged(currentSpeed)   <span class="c-cm">// se dispara cuando cambia la velocidad</span>

  Field:
    CurrentSpeed: float            <span class="c-cm">// getter + setter + notificación automática</span></pre></div>
<div class="concept-intro">Un cliente (por ejemplo, el cluster digital) descubre este servicio con SOME/IP-SD, se suscribe al evento <code>OnSpeedChanged</code>, y a partir de ahí recibe notificaciones automáticas cada vez que la velocidad cambia — sin tener que consultar (polling) constantemente al servicio, lo cual sería mucho más ineficiente en una red compartida.</div>
  </div>
</div>
`,

'doip': `
<div class="tab-group-pd9">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pd9-1','pd9')">Qué es y por qué</button>
    <button class="tab-btn" onclick="switchTab(this,'pd9-2','pd9')">Flujo de conexión</button>
    <button class="tab-btn" onclick="switchTab(this,'pd9-3','pd9')">Puertos y componentes clave</button>
  </div>
  <div id="pd9-1" class="tab-panel active">
<div class="concept-intro"><strong>DoIP</strong> (Diagnostics over Internet Protocol, ISO 13400) es el protocolo que transporta mensajes UDS sobre Ethernet en vez de CAN — la evolución natural del diagnóstico vehicular a medida que Automotive Ethernet se vuelve la norma en los vehículos modernos.</div>
<table class="kv-table"><tr><th>Ventaja frente a UDS sobre CAN</th><th>Impacto práctico</th></tr>
<tr><td>Flasheo de firmware más rápido</td><td>Un mismo firmware que toma ~30 minutos por CAN puede bajar a ~5 minutos por DoIP.</td></tr>
<tr><td>Diagnóstico remoto</td><td>Combinado con telemática, permite diagnosticar un vehículo sin que esté físicamente en el taller.</td></tr>
<tr><td>Taller moderno</td><td>El técnico conecta un cable Ethernet (o WiFi) al conector OBD-II en vez de un adaptador CAN dedicado.</td></tr>
</table>
  </div>
  <div id="pd9-2" class="tab-panel">
<div class="concept-intro">Establecer una sesión de diagnóstico por DoIP sigue una secuencia definida, distinta de simplemente "conectarse y listo" — hay pasos de descubrimiento y autorización antes de poder enviar el primer comando UDS.</div>
<div class="dtree">
  <div class="dtree-title">Secuencia de conexión DoIP</div>
  <div class="dtree-step"><div class="dtree-num ok">1</div><div class="dtree-body"><h5>Conexión física</h5><p>El tester externo se conecta al conector OBD-II del vehículo, por Ethernet directo o WiFi.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">2</div><div class="dtree-body"><h5>Vehicle Announcement</h5><p>El vehículo anuncia su presencia por UDP (puerto 13400), incluyendo VIN, EID y GID — así el tester sabe con qué vehículo está hablando.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">3</div><div class="dtree-body"><h5>Routing Activation</h5><p>El tester solicita activación de ruteo al DoIP Gateway — la ECU central con acceso a las redes internas del vehículo.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">4</div><div class="dtree-body"><h5>Autenticación y activación</h5><p>El Gateway autentica la solicitud y activa el enrutamiento hacia las redes internas correspondientes.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">5</div><div class="dtree-body"><h5>Mensajes UDS encapsulados</h5><p>El tester envía UDS dentro de DoIP; el Gateway desencapsula y reenvía al bus CAN/Ethernet interno donde vive la ECU objetivo.</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">6</div><div class="dtree-body"><h5>Respuesta</h5><p>La ECU destino responde; el Gateway encapsula esa respuesta de vuelta en DoIP y la devuelve al tester.</p></div></div>
</div>
  </div>
  <div id="pd9-3" class="tab-panel">
<table class="kv-table"><tr><th>Componente / parámetro</th><th>Rol</th></tr>
<tr><td>Puerto UDP 13400</td><td>Puerto estándar usado para el descubrimiento inicial (Vehicle Announcement, Vehicle Identification).</td></tr>
<tr><td>VIN</td><td>Número de identificación del vehículo — permite al tester confirmar que está hablando con el vehículo correcto.</td></tr>
<tr><td>EID (Entity ID)</td><td>Identificador único de la entidad DoIP (típicamente basado en una dirección MAC).</td></tr>
<tr><td>GID (Group ID)</td><td>Identifica el grupo lógico de entidades DoIP del vehículo, si hay más de una.</td></tr>
<tr><td>DoIP Gateway</td><td>La ECU central que actúa como punto único de entrada, autentica al tester, y enruta el tráfico UDS hacia las redes internas — el mismo rol de "firewall" que cumple el Gateway CAN tradicional, aplicado al mundo IP.</td></tr>
</table>
<div class="alert-card">💡 Igual que con el Gateway CAN, el hecho de que exista un único punto de entrada autenticado (el DoIP Gateway) es lo que evita que cualquier dispositivo conectado al OBD-II pueda hablar directamente con ECUs internas sin pasar ningún control — ver el tema "Gateway ECU" y el tópico de ciberseguridad ISO 21434.</div>
  </div>
</div>
`,

'xcp': `
<div class="tab-group-px10">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'px10-1','px10')">Qué es XCP</button>
    <button class="tab-btn" onclick="switchTab(this,'px10-2','px10')">A2L y herramientas</button>
    <button class="tab-btn" onclick="switchTab(this,'px10-3','px10')">XCP sobre CAN vs Ethernet</button>
  </div>
  <div id="px10-1" class="tab-panel active">
<div class="concept-intro"><strong>XCP</strong> (Universal Measurement and Calibration Protocol) es el estándar de la industria para medir variables internas de una ECU y escribir parámetros de calibración <strong>mientras el software sigue corriendo</strong> — sin detener la ejecución ni tener que reflashear la ECU completa para cada ajuste.</div>
<table class="kv-table"><tr><th>Capacidad</th><th>Qué permite</th></tr>
<tr><td>Medición</td><td>Lee variables de la memoria de la ECU en tiempo real — señales del motor, temperaturas, presiones — sin interrumpir su ejecución.</td></tr>
<tr><td>Calibración</td><td>Escribe valores directamente en la memoria de calibración: parámetros de un controlador PID, tablas de lookup, umbrales de activación.</td></tr>
<tr><td>Flash programming</td><td>Puede además actualizar la memoria flash completa de la ECU, aunque este no es su uso más frecuente en el día a día de calibración.</td></tr>
</table>
<div class="concept-intro">La aplicación típica: un ingeniero de calibración conecta una herramienta a la ECU de motor durante una prueba en banco o en pista, ajusta en vivo un parámetro de la estrategia de inyección, y observa inmediatamente el efecto en las variables medidas — todo sin recompilar ni reflashear nada.</div>
  </div>
  <div id="px10-2" class="tab-panel">
<div class="concept-intro">El archivo <strong>A2L</strong> (ASAM MCD-2 MC) es el "mapa" de la ECU para cualquier herramienta de calibración: describe qué variables existen, en qué dirección de memoria están, su tipo de dato, y su factor de escala/offset para convertir el valor crudo en una unidad de ingeniería con sentido.</div>
<table class="kv-table"><tr><th>Herramienta</th><th>Detalle</th></tr>
<tr><td>CANoe (Vector)</td><td>Soporte XCP integrado, con panel de medición en tiempo real dentro del mismo entorno usado para análisis de bus.</td></tr>
<tr><td>INCA (ETAS)</td><td>Herramienta especializada de calibración, muy usada por Bosch y Continental.</td></tr>
<tr><td>CANape (Vector)</td><td>Similar en propósito a INCA — popular en BMW y Audi.</td></tr>
<tr><td>ETK</td><td>Hardware de acceso directo a memoria de la ECU, para XCP de altísima velocidad cuando el acceso vía bus estándar no alcanza.</td></tr>
</table>
  </div>
  <div id="px10-3" class="tab-panel">
<div class="concept-intro">XCP no está atado a un único transporte — puede correr sobre distintos buses según qué tan rápido y con cuánto volumen de datos se necesite trabajar.</div>
<table class="kv-table"><tr><th>Transporte</th><th>Cuándo conviene</th></tr>
<tr><td>XCP sobre CAN / CAN FD</td><td>Suficiente para calibración estándar de una ECU individual, con el bus CAN existente del vehículo o banco de pruebas.</td></tr>
<tr><td>XCP sobre Ethernet</td><td>Necesario cuando se requiere medir muchas variables a alta frecuencia simultáneamente (por ejemplo, decenas de canales de un sistema de control de motor complejo) — el ancho de banda de CAN se vuelve el cuello de botella.</td></tr>
</table>
<div class="alert-card">💡 La regla general para una entrevista: si te preguntan "¿por qué no usar UDS para calibración en vez de XCP?" — la respuesta es que UDS está pensado para diagnóstico (leer DTCs, escribir parámetros puntuales, controlar rutinas), mientras que XCP está diseñado específicamente para <strong>streaming continuo de mediciones a alta frecuencia</strong>, algo para lo que UDS no fue diseñado.</div>
  </div>
</div>
`,

'proto-comparativa': `
<div class="tab-group-ppc">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ppc-1','ppc')">Tabla comparativa completa</button>
    <button class="tab-btn" onclick="switchTab(this,'ppc-2','ppc')">Regla de selección</button>
  </div>
  <div id="ppc-1" class="tab-panel active">
<div class="concept-intro">Con los seis protocolos ya vistos en detalle en este módulo, esta tabla los pone lado a lado para comparar de un vistazo.</div>
<table class="kv-table"><tr><th>Protocolo</th><th>Velocidad</th><th>Costo</th><th>Topología</th><th>Nodos típicos</th><th>Uso típico</th></tr>
<tr><td>CAN Classic</td><td>1 Mbit/s</td><td>Bajo</td><td>Bus lineal</td><td>~30</td><td>Powertrain, Chassis, Body</td></tr>
<tr><td>CAN FD</td><td>8 Mbit/s</td><td>Bajo</td><td>Bus lineal</td><td>~30</td><td>Flasheo, calibración, diagnóstico</td></tr>
<tr><td>LIN</td><td>20 kbit/s</td><td>Muy bajo</td><td>Maestro-esclavo</td><td>16</td><td>Ventanas, espejos, sensores simples</td></tr>
<tr><td>FlexRay</td><td>10 Mbit/s</td><td>Alto</td><td>Bus dual canal</td><td>~64</td><td>By-wire, ADAS crítico (generación anterior)</td></tr>
<tr><td>Ethernet 100M</td><td>100 Mbit/s</td><td>Medio</td><td>Estrella / punto a punto</td><td>Prácticamente ilimitado</td><td>Cámaras, ADAS</td></tr>
<tr><td>Ethernet 1G+</td><td>1+ Gbit/s</td><td>Medio</td><td>Estrella / punto a punto</td><td>Prácticamente ilimitado</td><td>Backbone, HPC, OTA</td></tr>
</table>
  </div>
  <div id="ppc-2" class="tab-panel">
<div class="dtree">
  <div class="dtree-title">¿Qué protocolo elegir?</div>
  <div class="dtree-step"><div class="dtree-num">1</div><div class="dtree-body"><h5>¿Función simple y lenta? (ventanas, espejos)</h5><p>→ <span class="yes">LIN</span></p></div></div>
  <div class="dtree-step"><div class="dtree-num">2</div><div class="dtree-body"><h5>¿Control en tiempo real, ≤1 Mbit/s?</h5><p>→ <span class="yes">CAN Classic</span></p></div></div>
  <div class="dtree-step"><div class="dtree-num">3</div><div class="dtree-body"><h5>¿Control + calibración/flasheo, &lt;8 Mbit/s?</h5><p>→ <span class="yes">CAN FD</span></p></div></div>
  <div class="dtree-step"><div class="dtree-num warn">4</div><div class="dtree-body"><h5>¿Safety-critical con determinismo estricto? (by-wire)</h5><p>→ <span class="yes">FlexRay</span> (o Ethernet + TSN en diseños nuevos)</p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">5</div><div class="dtree-body"><h5>¿Video, cámaras, ADAS con &gt;10 Mbit/s?</h5><p>→ <span class="yes">Ethernet 100M</span></p></div></div>
  <div class="dtree-step"><div class="dtree-num ok">6</div><div class="dtree-body"><h5>¿Backbone del vehículo, HPC, OTA?</h5><p>→ <span class="yes">Ethernet 1G+</span></p></div></div>
</div>
<div class="alert-card">💡 En una entrevista, mostrar que entendés <strong>por qué</strong> se elige cada protocolo (costo, velocidad, determinismo, topología) vale mucho más que memorizar la tabla — la mayoría de las preguntas sobre este tema son variaciones de "¿por qué no usarías X para esto?".</div>
  </div>
</div>
`,

'proto-capas': `
<div class="tab-group-ppl">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ppl-1','ppl')">OSI aplicado a protocolos automotrices</button>
    <button class="tab-btn" onclick="switchTab(this,'ppl-2','ppl')">ISO-TP y UDS sobre CAN</button>
    <button class="tab-btn" onclick="switchTab(this,'ppl-3','ppl')">UDS sobre DoIP (Ethernet)</button>
  </div>
  <div id="ppl-1" class="tab-panel active">
<div class="concept-intro">El modelo OSI de 7 capas es una referencia académica genérica — en el mundo automotriz, distintos protocolos implementan distintas capas, y muchas quedan directamente sin usar. Ver esto lado a lado ayuda a entender por qué se necesitan protocolos adicionales encima de CAN (como ISO-TP) que Ethernet no necesita.</div>
<div class="code-block"><div class="code-lang">Modelo OSI — protocolos automotrices comparados</div><pre>
Capa 7: Aplicación   │ UDS/ISO 14229   │ SOME/IP     │ HTTP, MQTT
Capa 6: Presentación │       —         │      —      │      —
Capa 5: Sesión       │       —         │      —      │      —
Capa 4: Transporte   │ ISO-TP (15765)  │  TCP/UDP    │  TCP/UDP
Capa 3: Red          │       —         │ IP (IPv4/6) │     IP
Capa 2: Enlace datos │ CAN Data Link   │  Ethernet   │  Ethernet
Capa 1: Física       │ CAN Physical    │ 100BASE-T1  │ 100BASE-TX
                        (ISO 11898-1)    (ISO 11898-2) (IEEE 802.3bw)

Protocolo resultante:     CAN            DoIP/SOME-IP   Ethernet estándar</pre></div>
<div class="concept-intro">Lo más notable de esta comparación: CAN no tiene capa de red ni de transporte propia — por eso, para transportar un mensaje UDS más grande que una trama CAN, hace falta un protocolo adicional (ISO-TP) que cumpla ese rol. Ethernet, en cambio, ya trae esas capas resueltas de fábrica (IP + TCP/UDP), por eso DoIP y SOME/IP pueden apoyarse directamente en ellas.</div>
  </div>
  <div id="ppl-2" class="tab-panel">
<div class="concept-intro">Un mensaje UDS puede necesitar transportar más datos de los que caben en una sola trama CAN (8 bytes en Classic, 64 en FD) — <strong>ISO-TP</strong> (ISO 15765-2) es el protocolo de transporte que resuelve la segmentación y el reensamblado de esos mensajes grandes.</div>
<table class="kv-table"><tr><th>Tipo de trama ISO-TP</th><th>Cuándo se usa</th></tr>
<tr><td>Single Frame (SF)</td><td>El mensaje completo cabe en ≤7 bytes — va en una sola trama CAN, sin necesidad de segmentar.</td></tr>
<tr><td>First Frame (FF)</td><td>Primer fragmento de un mensaje grande — indica la longitud total del mensaje que va a llegar.</td></tr>
<tr><td>Consecutive Frame (CF)</td><td>Cada fragmento siguiente del mensaje, numerado en secuencia para que el receptor los reensamble en orden.</td></tr>
<tr><td>Flow Control (FC)</td><td>El receptor confirma al transmisor que puede seguir enviando fragmentos, y a qué ritmo — evita saturar al receptor.</td></tr>
</table>
<div class="concept-intro">Este mecanismo de segmentación/reensamblado es exactamente lo que le falta a CAN por diseño (no tiene capa de transporte propia) y que ISO-TP suple — es la razón técnica de fondo por la que UDS puede funcionar sobre un bus de solo 8 bytes por trama.</div>
  </div>
  <div id="ppl-3" class="tab-panel">
<div class="concept-intro">Sobre Ethernet, UDS no necesita ISO-TP en absoluto — usa <strong>TCP directamente</strong> como capa de transporte, ya que TCP ya resuelve la segmentación, el reensamblado y el control de flujo de forma nativa y mucho más eficiente para mensajes grandes.</div>
<table class="kv-table"><tr><th>Aspecto</th><th>UDS sobre CAN</th><th>UDS sobre DoIP (Ethernet)</th></tr>
<tr><td>Transporte</td><td>ISO-TP sobre CAN</td><td>TCP directamente</td></tr>
<tr><td>Direccionamiento</td><td>Por ID de mensaje CAN</td><td>Por dirección IP + puerto</td></tr>
<tr><td>Sesión / routing</td><td>Implícito en la topología del bus</td><td>Explícito, vía Routing Activation del DoIP Gateway (ver el tema "DoIP")</td></tr>
<tr><td>Velocidad de flasheo</td><td>Más lenta (limitada por 8/64 bytes por trama)</td><td>Mucho más rápida (limitada por el ancho de banda de Ethernet)</td></tr>
</table>
<div class="alert-card">💡 En ambos casos, el contenido de los mensajes UDS en sí (los servicios como 0x22 ReadDataByIdentifier o 0x2E WriteDataByIdentifier) es exactamente el mismo — lo único que cambia es cómo ese mensaje viaja físicamente. Ver el módulo "Diagnóstico Automotriz" para el detalle completo de los servicios UDS.</div>
  </div>
</div>
`,

'proto-topologias': `
<div class="tab-group-ppt">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ppt-1','ppt')">Topologías por protocolo</button>
    <button class="tab-btn" onclick="switchTab(this,'ppt-2','ppt')">Ejemplo real</button>
  </div>
  <div id="ppt-1" class="tab-panel active">
<div class="concept-intro">Cada protocolo elige la topología que mejor se ajusta a su propósito — no es una decisión arbitraria, se conecta directamente con las características que ya vimos de cada uno.</div>
<table class="kv-table"><tr><th>Protocolo</th><th>Topología</th><th>Implicancia</th></tr>
<tr><td>CAN</td><td>Bus lineal con terminadores</td><td>Todos los nodos comparten el mismo cable — sencillo y barato, pero un corte de cable a la mitad puede afectar ambos segmentos resultantes.</td></tr>
<tr><td>LIN</td><td>Maestro-esclavo (bus simple)</td><td>Un solo hilo, el Master controla todo el acceso — no hay colisiones porque nunca hay dos nodos transmitiendo a la vez sin permiso.</td></tr>
<tr><td>Ethernet</td><td>Estrella (switched)</td><td>Cada nodo se conecta a un switch central que gestiona el tráfico sin colisiones — permite mayor velocidad y más fácil aislar fallas de un solo enlace.</td></tr>
<tr><td>FlexRay</td><td>Bus lineal o estrella activa</td><td>Soporta ambas topologías; la estrella activa (con un Star Coupler dedicado) da más flexibilidad de diseño a costa de hardware adicional.</td></tr>
</table>
  </div>
  <div id="ppt-2" class="tab-panel">
<div class="concept-intro">Así se ve, en conjunto, la topología de red de un sedán moderno — combinando varios de los protocolos vistos en este módulo, cada uno en el segmento donde tiene sentido.</div>
<div class="diagram-card">
<svg viewBox="0 0 620 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Topología de red de un vehículo moderno: un Gateway central conecta los buses CAN de Powertrain, Chassis e Interior, la rama LIN, y la red Ethernet en estrella">
  <g font-family="'Segoe UI',sans-serif">
    <line x1="310" y1="220" x2="270" y2="190" stroke="var(--text-muted)" stroke-width="2"/>
    <line x1="310" y1="220" x2="350" y2="190" stroke="var(--text-muted)" stroke-width="2"/>
    <line x1="310" y1="220" x2="270" y2="250" stroke="var(--text-muted)" stroke-width="2"/>
    <line x1="310" y1="220" x2="350" y2="250" stroke="var(--text-muted)" stroke-width="2"/>

    <rect x="20" y="20" width="250" height="170" rx="10" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="35" y="42" font-size="11" fill="var(--accent)" font-weight="700">CAN Powertrain</text>
    <rect x="45" y="65" width="64" height="26" rx="13" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.2"/>
    <text x="77" y="82" font-size="10.5" fill="var(--accent)" text-anchor="middle" font-weight="600">ECM</text>
    <rect x="125" y="65" width="64" height="26" rx="13" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.2"/>
    <text x="157" y="82" font-size="10.5" fill="var(--accent)" text-anchor="middle" font-weight="600">TCM</text>
    <text x="35" y="150" font-size="9.5" fill="var(--text-muted)">500 kbit/s — control de motor y transmisión</text>

    <rect x="350" y="20" width="250" height="170" rx="10" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="365" y="42" font-size="11" fill="var(--accent)" font-weight="700">CAN Chassis</text>
    <rect x="365" y="65" width="58" height="26" rx="13" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.2"/>
    <text x="394" y="82" font-size="10.5" fill="var(--accent)" text-anchor="middle" font-weight="600">ABS</text>
    <rect x="433" y="65" width="58" height="26" rx="13" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.2"/>
    <text x="462" y="82" font-size="10.5" fill="var(--accent)" text-anchor="middle" font-weight="600">ESP</text>
    <rect x="501" y="65" width="80" height="26" rx="13" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.2"/>
    <text x="541" y="82" font-size="10.5" fill="var(--accent)" text-anchor="middle" font-weight="600">Steering</text>
    <text x="365" y="150" font-size="9.5" fill="var(--text-muted)">500 kbit/s — frenos y dirección</text>

    <rect x="20" y="250" width="250" height="170" rx="10" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="35" y="272" font-size="11" fill="var(--accent)" font-weight="700">CAN Interior + LIN</text>
    <rect x="45" y="295" width="64" height="26" rx="13" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.2"/>
    <text x="77" y="312" font-size="10.5" fill="var(--accent)" text-anchor="middle" font-weight="600">BCM</text>
    <rect x="125" y="295" width="74" height="26" rx="13" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.2"/>
    <text x="162" y="312" font-size="10.5" fill="var(--accent)" text-anchor="middle" font-weight="600">Cluster</text>
    <text x="35" y="350" font-size="9.5" fill="var(--text-muted)">125 kbit/s + ramas LIN: ventanas, espejos, sensores</text>

    <rect x="350" y="250" width="250" height="170" rx="10" fill="none" stroke="var(--green)" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="365" y="272" font-size="11" fill="var(--green)" font-weight="700">Ethernet (estrella)</text>
    <rect x="365" y="295" width="70" height="26" rx="13" fill="var(--green)" fill-opacity="0.18" stroke="var(--green)" stroke-width="1.2"/>
    <text x="400" y="312" font-size="10.5" fill="var(--green)" text-anchor="middle" font-weight="600">Cámaras</text>
    <rect x="443" y="295" width="60" height="26" rx="13" fill="var(--green)" fill-opacity="0.18" stroke="var(--green)" stroke-width="1.2"/>
    <text x="473" y="312" font-size="10.5" fill="var(--green)" text-anchor="middle" font-weight="600">ADAS</text>
    <rect x="511" y="295" width="70" height="26" rx="13" fill="var(--green)" fill-opacity="0.18" stroke="var(--green)" stroke-width="1.2"/>
    <text x="546" y="312" font-size="10.5" fill="var(--green)" text-anchor="middle" font-weight="600">Display</text>
    <text x="365" y="350" font-size="9.5" fill="var(--text-muted)">100M/1G — cámaras, ADAS, pantalla central</text>

    <rect x="270" y="195" width="80" height="50" rx="8" fill="var(--text)" fill-opacity="0.9" stroke="var(--text)" stroke-width="1.5"/>
    <text x="310" y="225" font-size="12.5" fill="var(--bg)" text-anchor="middle" font-weight="700">Gateway</text>
  </g>
</svg>
<div class="diagram-caption">El <b>Gateway</b> es el único nodo que toca las cuatro redes a la vez — sin él, cada dominio quedaría aislado de los demás (ver el tema "Gateway ECU" del módulo de Arquitectura Automotriz).</div>
</div>
  </div>
</div>
`,

'proto-bitrate': `
<div class="tab-group-ppb">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ppb-1','ppb')">Time Quanta y segmentos de bit</button>
    <button class="tab-btn" onclick="switchTab(this,'ppb-2','ppb')">Ejemplo de cálculo — 500 kbit/s</button>
    <button class="tab-btn" onclick="switchTab(this,'ppb-3','ppb')">SJW y resincronización</button>
  </div>
  <div id="ppb-1" class="tab-panel active">
<div class="concept-intro">El tiempo de un bit CAN no es un valor único configurable directamente — se construye a partir de una unidad más pequeña, el <strong>Time Quanta (Tq)</strong>, que resulta de dividir el reloj del oscilador del controlador CAN por un prescaler configurable.</div>
<div class="code-block"><div class="code-lang">Fórmula base</div><pre>
Tq = prescaler / f_clk</pre></div>
<div class="concept-intro">Cada bit CAN se compone de varios segmentos, medidos en cantidad de Time Quanta:</div>
<table class="kv-table"><tr><th>Segmento</th><th>Duración</th><th>Propósito</th></tr>
<tr><td>Sync_Seg</td><td>1 Tq (fijo)</td><td>Sincronización sobre el flanco de la señal — todos los nodos esperan la transición acá.</td></tr>
<tr><td>Prop_Seg</td><td>1-8 Tq</td><td>Compensa el delay de propagación de la señal por el cable y los transceivers.</td></tr>
<tr><td>Phase_Seg1</td><td>1-8 Tq</td><td>Puede extenderse durante la resincronización si el reloj del receptor va atrasado.</td></tr>
<tr><td>Phase_Seg2</td><td>2-8 Tq</td><td>Puede reducirse durante la resincronización. El punto de muestreo del bit está al final de Phase_Seg1.</td></tr>
</table>
<div class="diagram-card">
<svg viewBox="0 0 560 165" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Un bit CAN dividido en Sync Seg, Prop Seg, Phase Seg 1 y Phase Seg 2, con el punto de muestreo marcado al 75 por ciento del bit">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="40" y="40" width="60" height="50" fill="var(--accent)" fill-opacity="0.6" stroke="var(--accent)" stroke-width="1.2"/>
    <rect x="100" y="40" width="180" height="50" fill="var(--accent)" fill-opacity="0.28" stroke="var(--accent)" stroke-width="1.2"/>
    <rect x="280" y="40" width="120" height="50" fill="var(--green)" fill-opacity="0.35" stroke="var(--green)" stroke-width="1.2"/>
    <rect x="400" y="40" width="120" height="50" fill="var(--accent)" fill-opacity="0.14" stroke="var(--accent)" stroke-width="1.2"/>

    <line x1="400" y1="20" x2="400" y2="90" stroke="var(--green)" stroke-width="2.5"/>
    <text x="400" y="14" font-size="10.5" fill="var(--green)" text-anchor="middle" font-weight="700">Punto de muestreo (75%)</text>

    <g font-size="10" fill="var(--text)" text-anchor="middle" font-weight="600">
      <text x="70" y="70">Sync</text>
      <text x="190" y="70">Prop_Seg</text>
      <text x="340" y="70">Phase_Seg1</text>
      <text x="460" y="70">Phase_Seg2</text>
    </g>
    <g font-size="9" fill="var(--text-muted)" text-anchor="middle">
      <text x="70" y="105">1 Tq</text>
      <text x="190" y="105">3 Tq</text>
      <text x="340" y="105">2 Tq</text>
      <text x="460" y="105">2 Tq</text>
    </g>

    <line x1="40" y1="120" x2="520" y2="120" stroke="var(--border)" stroke-width="1.5"/>
    <line x1="40" y1="115" x2="40" y2="125" stroke="var(--border)" stroke-width="1.5"/>
    <line x1="520" y1="115" x2="520" y2="125" stroke="var(--border)" stroke-width="1.5"/>
    <text x="280" y="140" font-size="9.5" fill="var(--text-muted)" text-anchor="middle">1 bit completo = 8 Tq = 2000 ns (a 500 kbit/s)</text>
  </g>
</svg>
<div class="diagram-caption">El punto de muestreo (línea verde) cae justo al final de <b>Phase_Seg1</b> — ahí es cuando el controlador realmente "lee" el valor del bit, dejando margen antes (Prop_Seg) y después (Phase_Seg2) para absorber pequeñas variaciones de reloj entre nodos.</div>
</div>
  </div>
  <div id="ppb-2" class="tab-panel">
<div class="concept-intro">Veamos el cálculo completo para configurar un controlador CAN a 500 kbit/s, partiendo de un oscilador de 16 MHz — el tipo de ejercicio que suele aparecer en una entrevista técnica de este rol.</div>
<div class="code-block"><div class="code-lang">Cálculo de bit timing CAN a 500 kbit/s</div><pre>
f_clk = 16 MHz
Baud Rate Prescaler (BRP) = 4
Tq = BRP / f_clk = 4 / 16MHz = 250 ns

Bit time = 1 / 500 kbps = 2000 ns
Número de Tq por bit = 2000 ns / 250 ns = 8 Tq

Distribución de los 8 Tq:
  Sync_Seg   = 1 Tq   (fijo)
  Prop_Seg   = 3 Tq
  Phase_Seg1 = 2 Tq
  Phase_Seg2 = 2 Tq
  Total      = 8 Tq ✓

Punto de muestreo = (1+3+2) / 8 = 75% del bit time
SJW = min(Phase_Seg1, Phase_Seg2) = 2 Tq (máximo ajuste posible por resync)</pre></div>
<div class="alert-card">💡 El <strong>punto de muestreo al 75-80%</strong> del bit time es una convención muy común en diseños reales — deja suficiente margen antes del muestreo para que la señal se estabilice tras la transición, sin dejar tan poco margen después como para arriesgar el siguiente bit.</div>
  </div>
  <div id="ppb-3" class="tab-panel">
<div class="concept-intro">Ningún oscilador es perfectamente idéntico entre nodos — pequeñas diferencias de frecuencia entre los relojes de cada controlador CAN se acumulan bit a bit si no se corrigen. La <strong>resincronización</strong> es el mecanismo que evita que esa deriva rompa la comunicación.</div>
<table class="kv-table"><tr><th>Concepto</th><th>Qué significa</th></tr>
<tr><td>SJW (Synchronization Jump Width)</td><td>La cantidad máxima de Tq que Phase_Seg1 o Phase_Seg2 pueden ajustarse en un solo bit para corregir el desfase de reloj detectado.</td></tr>
<tr><td>Resincronización</td><td>Cada vez que se detecta una transición dominante→recesivo inesperada (fuera del punto exacto esperado), el controlador ajusta Phase_Seg1/2 dentro del límite de SJW para realinear su reloj con el del transmisor.</td></tr>
</table>
<div class="concept-intro">En la práctica, esto significa que todos los nodos de un bus CAN no necesitan relojes perfectamente sincronizados de fábrica — el propio protocolo se auto-corrige continuamente mensaje a mensaje, siempre que la diferencia entre osciladores esté dentro de la tolerancia que el SJW configurado puede compensar.</div>
  </div>
</div>
`,

};  // fin PROTO_RICH
