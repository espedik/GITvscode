const T = {
  // ARQUITECTURA
  'arch-intro':       { title: 'Introducción E/E Architecture', icon: '🏗️', mod: 'arch', tags: ['ECU', 'Bus Topology', 'CAN', 'AUTOSAR'], hint: 'Explica la diferencia entre arquitecturas centralizadas y distribuidas. ¿Qué es una E/E Architecture? Tipos de redes en un vehículo.' },
  'arch-adas':        { title: 'ADAS — Advanced Driver Assistance', icon: '🚗', mod: 'arch', tags: ['LIDAR', 'RADAR', 'Camera', 'Fusion'], hint: 'Sensores usados, niveles SAE de autonomía (L0-L5), funciones: ACC, AEB, Lane Keeping.' },
  'arch-bcm':         { title: 'BCM — Body Control Module', icon: '💡', mod: 'arch', tags: ['LIN', 'CAN', 'Actuadores'], hint: 'Controla: iluminación, ventanas, puertas, seguros. Comunica por LIN con nodos y por CAN con Gateway.' },
  'arch-gateway':     { title: 'Gateway ECU', icon: '🔀', mod: 'arch', tags: ['Routing', 'CAN', 'ETH', 'Security'], hint: 'Traduce mensajes entre dominios (CAN ↔ Ethernet). Firewall de red vehicular.' },
  'arch-bms':         { title: 'BMS — Battery Management System', icon: '🔋', mod: 'arch', tags: ['SoC', 'SoH', 'CAN', 'EV'], hint: 'Monitorea: voltaje de celda, temperatura, corriente. Calcula SoC y SoH. Protege contra sobrecarga.' },
  'arch-infotainment': { title: 'Infotainment / IVI', icon: '🎵', mod: 'arch', tags: ['Android Auto', 'CarPlay', 'MOST', 'Ethernet'], hint: 'Sistema de infoentretenimiento. Protocolos: MOST, Ethernet AVB. Conectividad: BT, WiFi, USB.' },
  'arch-sensors':     { title: 'Sensores Automotrices', icon: '📡', mod: 'arch', tags: ['RADAR', 'LIDAR', 'Ultrasónico', 'Cámara'], hint: 'Tipos, rangos, aplicaciones. RADAR (largo alcance), LIDAR (nube de puntos), Ultrasónico (estacionamiento).' },
  'arch-domain':      { title: 'Domain vs Zonal Architecture', icon: '🗺️', mod: 'arch', tags: ['Zonal ECU', 'Domain Controller', 'HPC'], hint: 'Evolución: de ECUs distribuidas → Domain Controllers → Zonal Architecture. Ejemplo: Tesla vs BMW.' },
  'arch-autosar':     { title: 'AUTOSAR — Classic & Adaptive', icon: '📦', mod: 'arch', tags: ['Classic', 'Adaptive', 'SWC', 'RTE', 'ARXML'], hint: 'Classic: real-time, OSEK OS. Adaptive: Linux-based, POSIX. RTE como middleware. SWC → Port → Interface.' },

  // PROTOCOLOS
  'can-fundamentos':  { title: 'Fundamentos CAN Bus', icon: '📶', mod: 'proto', tags: ['ISO 11898', 'CSMA/CD', 'Differential', '1 Mbit/s'], hint: 'Velocidad: hasta 1 Mbit/s. Bus diferencial (CANH/CANL). Sin dirección IP, identificador de mensaje (ID). Bit stuffing.' },
  'can-trama':        { title: 'Trama CAN', icon: '📊', mod: 'proto', tags: ['SOF', 'ID', 'DLC', 'Data', 'CRC', 'ACK'], hint: 'Campos: SOF, Arbitration (ID 11/29 bits), Control (DLC), Data (0-8 bytes), CRC, ACK, EOF.' },
  'can-fd':           { title: 'CAN FD — Flexible Data Rate', icon: '⚡', mod: 'proto', tags: ['8 Mbit/s', '64 bytes', 'ISO 11898-1'], hint: 'Velocidad hasta 8 Mbit/s en fase de datos. Payload hasta 64 bytes. Compatible con Classic CAN en el mismo bus.' },
  'can-ejemplo':      { title: 'Ejemplo práctico — Ignición CAN', icon: '🔑', mod: 'proto', tags: ['DBC', 'Signal', 'Message'], hint: 'Trazar el mensaje de ignición desde el BCM hasta el Gateway. DBC file, ID, signals, scale/offset.' },
  'lin':              { title: 'LIN Bus', icon: '📻', mod: 'proto', tags: ['20 kbit/s', 'Master-Slave', 'Single Wire'], hint: 'Un maestro, hasta 16 esclavos. 20 kbit/s. Un hilo. Usado para: ventanas, espejos, sensores de lluvia.' },
  'flexray':          { title: 'FlexRay', icon: '🚀', mod: 'proto', tags: ['10 Mbit/s', 'TDMA', 'Safety'], hint: 'Hasta 10 Mbit/s. Determinista (TDMA). Doble canal. Usado en ADAS, chassis-by-wire. Más costoso que CAN.' },
  'eth-auto':         { title: 'Automotive Ethernet', icon: '🌐', mod: 'proto', tags: ['100BASE-T1', '1000BASE-T1', 'BroadR-Reach'], hint: '1 par de hilos. 100 Mbps o 1 Gbps. Para cámaras, ADAS, Infotainment. IEEE 802.3bw / 100BASE-T1.' },
  'someip':           { title: 'SOME/IP — Scalable OE Middleware', icon: '🔗', mod: 'proto', tags: ['SOA', 'Service Discovery', 'UDP/TCP'], hint: 'Middleware sobre Ethernet. Service-Oriented Architecture. Service Discovery (SD). Muy usado en Adaptive AUTOSAR.' },
  'doip':             { title: 'DoIP — Diagnostics over IP', icon: '🩺', mod: 'proto', tags: ['ISO 13400', 'UDP', 'TCP', 'OBD'], hint: 'Diagnóstico UDS sobre Ethernet. ISO 13400. Usado para flashing remoto y taller moderno.' },
  'xcp':              { title: 'XCP — Universal Measurement Protocol', icon: '📈', mod: 'proto', tags: ['Calibración', 'Medición', 'A2L', 'CANoe'], hint: 'Universal Measurement and Calibration Protocol. Lee/escribe parámetros de la ECU en tiempo real. Archivo A2L.' },
  'proto-comparativa': { title: 'CAN vs LIN vs ETH vs FlexRay', icon: '⚖️', mod: 'proto', tags: ['Comparativa', 'Velocidad', 'Costo'], hint: 'Tabla comparativa: velocidad, costo, topología, uso típico, número de nodos.' },
  'proto-capas':      { title: 'Capas OSI en Automotriz', icon: '🗂️', mod: 'proto', tags: ['OSI', 'Física', 'Enlace', 'Aplicación'], hint: 'Cómo aplica el modelo OSI a CAN (capas 1-2), UDS (capa 7), DoIP (capas 3-7).' },
  'proto-topologias': { title: 'Topologías de red vehicular', icon: '🕸️', mod: 'proto', tags: ['Bus', 'Star', 'Ring', 'Hybrid'], hint: 'CAN: bus lineal con terminadores. LIN: maestro-esclavo. ETH: estrella. Ejemplo de topología en un auto real.' },
  'proto-bitrate':    { title: 'Bit Rate & Sincronización CAN', icon: '⏱️', mod: 'proto', tags: ['Tq', 'Phase Seg', 'SJW', 'Baud Rate'], hint: 'Time Quanta, Segment 1/2, SJW. Cálculo de bit rate con oscilador. Herramienta: CANoe bit timing calculator.' },

  // DIAGNÓSTICO
  'uds-intro':        { title: 'UDS — Introducción (ISO 14229)', icon: '🔍', mod: 'diag', tags: ['ISO 14229', 'OBD', 'Tester', 'ECU'], hint: 'Diagnóstico Unificado. Cliente (Tester) ↔ Servidor (ECU). Basado en request/response. Encapsula sobre CAN/ETH.' },
  'uds-servicios':    { title: 'UDS — Servicios (Positive Response)', icon: '✅', mod: 'diag', tags: ['0x10', '0x11', '0x22', '0x2E', '0x31', '0x34'], hint: '0x10 DiagnosticSessionControl, 0x11 ECUReset, 0x22 ReadDataByID, 0x2E WriteDataByID, 0x31 RoutineControl, 0x34-36 Download.' },
  'uds-nrc':          { title: 'UDS — NRC Negative Response Codes', icon: '❌', mod: 'diag', tags: ['0x7F', 'NRC', 'Timeout'], hint: 'Formato: 7F [SID] [NRC]. Códigos: 0x11 (serviceNotSupported), 0x22 (conditionsNotCorrect), 0x31 (requestOutOfRange), 0x78 (pending).' },
  'uds-sesiones':     { title: 'UDS — Sesiones de diagnóstico', icon: '🔐', mod: 'diag', tags: ['Default', 'Programming', 'Extended', 'Security Access'], hint: '0x01 Default, 0x02 Programming (para flashing), 0x03 Extended. Security Access (0x27) para proteger servicios.' },
  'obd2':             { title: 'OBD-II — On-Board Diagnostics', icon: '🔌', mod: 'diag', tags: ['PID', 'Mode 01-0A', 'Conector SAE J1962'], hint: 'Estándar USA/EU. Conector 16 pines. Modos 0x01-0x0A. PIDs para leer RPM, velocidad, temperatura.' },
  'dtc':              { title: 'DTCs — Diagnostic Trouble Codes', icon: '⚠️', mod: 'diag', tags: ['P0xxx', 'Freeze Frame', 'Status Byte'], hint: 'Código de 5 caracteres (P/C/B/U + 4 dígitos). Status byte (confirmed, pending, MIL). Freeze frame data.' },
  'bootloader':       { title: 'Bootloader & Flashing', icon: '💾', mod: 'diag', tags: ['Flash', 'S19', 'Intel HEX', 'Checksum'], hint: 'Proceso de actualización de firmware. Secuencia UDS: Init → Erase → Download (0x34/0x36/0x37) → Verify. Formato S19/HEX.' },
  'kwp2000':          { title: 'KWP2000 vs UDS', icon: '📋', mod: 'diag', tags: ['ISO 14230', 'KWP', 'Legado'], hint: 'KWP2000 es predecesor de UDS. Diferencias en SIDs, estructura de sesiones. Aún en ECUs de modelos anteriores a 2010.' },

  // HERRAMIENTAS
  'canoe':            { title: 'CANoe', icon: '🖥️', mod: 'tools', tags: ['Simulación', 'Análisis', 'DBC', 'CAPL'], hint: 'Herramienta Vector. Simula nodos CAN/ETH, analiza tramas, ejecuta scripts CAPL. Tiene panel Trace y Write window.' },
  'canalyzer':        { title: 'CANalyzer', icon: '🔬', mod: 'tools', tags: ['Solo análisis', 'DBC', 'Trazas'], hint: 'Versión de solo análisis (sin simulación). Más barato. Filtros, triggers, estadísticas de bus.' },
  'capl-intro':       { title: 'CAPL — Introducción', icon: '📝', mod: 'tools', tags: ['C-like', 'Event-driven', 'Vector'], hint: 'Communication Access Programming Language. Basado en C. Orientado a eventos: on message, on timer, on key.' },
  'capl-scripting':   { title: 'CAPL — Scripts y Eventos', icon: '⚡', mod: 'tools', tags: ['on message', 'on timer', 'output()', 'testWaitForMessage'], hint: 'on message 0x123 { ... }. Timers: setTimer(t,100). Enviar: output(msg). Test nodes vs Simulation nodes.' },
  'simulink':         { title: 'Simulink / Model-Based Design', icon: '📐', mod: 'tools', tags: ['MBD', 'Code Gen', 'Stateflow', 'HIL'], hint: 'Diseño de control en bloques. Stateflow para lógica de estados. Code generation (Embedded Coder). Conexión con dSPACE para HIL.' },
  'dspace':           { title: 'dSPACE — HIL Testing', icon: '🤖', mod: 'tools', tags: ['HIL', 'MicroAutoBox', 'ControlDesk', 'Real-time'], hint: 'Hardware-in-the-Loop. Simula el entorno físico (planta) para probar la ECU real. ControlDesk para monitoreo en tiempo real.' },
  'vector-tools':     { title: 'Vector Tools — Resumen', icon: '🗂️', mod: 'tools', tags: ['CANoe', 'CANdb++', 'CANoe.DiVa', 'vTESTstudio'], hint: 'Suite completa: CANdb++ (editor DBC), vTESTstudio (testing automático), CANoe.DiVa (diagnóstico automatizado).' },

  // ESTÁNDARES
  'iso26262':         { title: 'ISO 26262 — Overview', icon: '📋', mod: 'standards', tags: ['Partes 1-12', 'Safety', 'Automotive'], hint: 'Estándar de seguridad funcional automotriz. 12 partes. Define procesos para SW, HW, sistema. Aplica a todo vehículo de pasajeros.' },
  'asil':             { title: 'ASIL — Niveles A, B, C, D', icon: '🛡️', mod: 'standards', tags: ['ASIL-A', 'ASIL-B', 'ASIL-C', 'ASIL-D', 'QM'], hint: 'Automotive Safety Integrity Level. QM → ASIL-A → D (más crítico). Depende de: Severidad, Exposición, Controlabilidad (S×E×C).' },
  'hara':             { title: 'HARA — Hazard Analysis & Risk Assessment', icon: '⚠️', mod: 'standards', tags: ['Severidad', 'Exposición', 'Controlabilidad', 'Safe State'], hint: 'Identifica peligros → evalúa riesgo (S×E×C) → asigna ASIL → define Safety Goals.' },
  'aspice':           { title: 'ASPICE — Automotive SPICE', icon: '📐', mod: 'standards', tags: ['V-Model', 'Capability Level', 'MAN.3', 'SWE'], hint: 'Modelo de proceso basado en V-Model. Niveles 1-5. Procesos SWE (Software Engineering). Muy pedido por OEMs alemanes.' },
  'misra':            { title: 'MISRA C / C++', icon: '📏', mod: 'standards', tags: ['C:2004', 'C:2012', 'C++:2008', 'Reglas'], hint: 'Guía de codificación segura en C/C++. Prohíbe: goto, malloc dinámico, recursión sin límite. Herramientas: PC-lint, Polyspace.' },
  'iso21434':         { title: 'ISO 21434 — Cybersecurity', icon: '🔒', mod: 'standards', tags: ['TARA', 'Attack Path', 'CAL', 'Cybersecurity'], hint: 'Cybersecurity Engineering para vehículos. TARA = Threat Analysis & Risk Assessment. Niveles CAL (1-4).' },
  'tara':             { title: 'TARA — Threat Analysis & Risk Assessment', icon: '🔍', mod: 'standards', tags: ['Assets', 'Threats', 'Attack Feasibility', 'CAL'], hint: 'Identifica assets → amenazas → caminos de ataque → probabilidad → impacto → CAL. Análogo a HARA para cybersecurity.' },
  'security-concepts': { title: 'SecOC & Secure Boot', icon: '🔐', mod: 'standards', tags: ['AUTOSAR', 'MAC', 'Freshness', 'Attestation'], hint: 'SecOC: autentica mensajes CAN/ETH con MAC. Secure Boot: verifica integridad del firmware en arranque. Root of Trust.' },

  // PYTHON FUNDAMENTOS
  'py-for':           { title: 'For / While / If-Else', icon: '🔁', mod: 'pyfund', tags: ['range', 'enumerate', 'zip', 'break'], hint: 'range(), enumerate(), zip(). break/continue/else en loops. Diferencia for-else.' },
  'py-comprehensions': { title: 'List & Dict Comprehensions', icon: '⚡', mod: 'pyfund', tags: ['[x for x in]', 'Nested', 'Conditional'], hint: '[x**2 for x in range(10) if x%2==0]. Dict: {k:v for k,v in d.items()}. Cuando usarlas vs loop normal.' },
  'py-listas':        { title: 'Listas', icon: '📋', mod: 'pyfund', tags: ['append', 'extend', 'pop', 'sort', 'slice'], hint: 'Métodos: append, extend, insert, remove, pop, sort, reverse. Slicing [inicio:fin:paso]. Lista de listas.' },
  'py-tuplas':        { title: 'Tuplas', icon: '📦', mod: 'pyfund', tags: ['Inmutable', 'Namedtuple', 'Unpacking'], hint: 'Inmutables. Unpacking: a,b,c = (1,2,3). Named tuple. Uso como clave de diccionario. Ventaja vs lista.' },
  'py-dicts':         { title: 'Diccionarios', icon: '📖', mod: 'pyfund', tags: ['get', 'items', 'defaultdict', 'Counter'], hint: 'dict.get(k, default). items(), keys(), values(). defaultdict, OrderedDict, Counter de collections.' },
  'py-sets':          { title: 'Sets', icon: '🔵', mod: 'pyfund', tags: ['union', 'intersection', 'difference', 'frozenset'], hint: 'Elementos únicos. Operaciones: |, &, -, ^. Set comprehension. frozenset (inmutable). Uso para deduplicar.' },
  'py-strings':       { title: 'Strings', icon: '🔤', mod: 'pyfund', tags: ['f-string', 'split', 'join', 'strip', 'format'], hint: 'f-strings. split/join. strip/lstrip/rstrip. upper/lower. replace. find/index. Multiline con triple comillas.' },
  'py-funciones':     { title: 'Funciones & Lambdas', icon: '⚡', mod: 'pyfund', tags: ['*args', '**kwargs', 'Lambda', 'map/filter'], hint: '*args y **kwargs. Funciones de orden superior: map(), filter(), reduce(). Lambda: f = lambda x: x*2.' },
  'py-decoradores':   { title: 'Decoradores', icon: '🎨', mod: 'pyfund', tags: ['@wraps', 'functools', 'Closure'], hint: 'Función que envuelve otra función. @functools.wraps preserva el __name__. Casos de uso: logging, timing, auth.' },
  'py-generadores':   { title: 'Generadores & Iteradores', icon: '♾️', mod: 'pyfund', tags: ['yield', 'next()', 'iter()', 'Generator Expression'], hint: 'yield vs return. Lazy evaluation. Generator expression: (x**2 for x in range(10)). Ventaja en memoria.' },
  'py-tryexcept':     { title: 'Try / Except / Finally', icon: '🛡️', mod: 'pyfund', tags: ['Exception', 'raise', 'finally', 'else'], hint: 'try/except/else/finally. Jerarquía de excepciones. raise vs raise e. Crear excepciones custom. with statement.' },
  'py-archivos':      { title: 'Archivos de Texto', icon: '📄', mod: 'pyfund', tags: ['open', 'with', 'read', 'write', 'json', 'csv'], hint: 'open() modos: r, w, a, rb. with context manager. json.load/dump. csv.reader/writer. pathlib.Path.' },
  'py-copy':          { title: 'Copy — Shallow vs Deep', icon: '📋', mod: 'pyfund', tags: ['copy.copy', 'copy.deepcopy', 'Referencia'], hint: 'Shallow copy: copia la estructura pero comparte referencias internas. Deep copy: copia todo. copy.deepcopy().' },
  'py-tipado':        { title: 'Type Hints', icon: '🏷️', mod: 'pyfund', tags: ['typing', 'Optional', 'List', 'Dict', 'mypy'], hint: 'PEP 484. def f(x: int) -> str:. Optional[int], List[str], Dict[str,int], Union. Validación con mypy.' },
  'py-cheatsheet':    { title: 'Cheat Sheet — Todos los métodos', icon: '📄', mod: 'pyfund', tags: ['Strings', 'Listas', 'Dicts', 'Sets', 'Built-ins', 'Operadores', 'itertools', 'Collections'], hint: 'Referencia rápida de todos los métodos, operaciones y funciones built-in.' },

  // POO
  'poo-clase':        { title: 'Clases y Objetos', icon: '🏛️', mod: 'poo', tags: ['__init__', 'self', 'Instancia', 'Atributos'], hint: '__init__, __str__, __repr__. Atributos de clase vs instancia. Métodos de clase (@classmethod) y estáticos (@staticmethod).' },
  'poo-principios':   { title: '4 Principios POO', icon: '🎯', mod: 'poo', tags: ['Encapsulación', 'Herencia', 'Polimorfismo', 'Abstracción'], hint: 'Encapsulación (private _x). Herencia (class B(A)). Polimorfismo (override métodos). Abstracción (ABC, interfaces).' },
  'poo-herencia':     { title: 'Herencia & MRO', icon: '🌳', mod: 'poo', tags: ['super()', 'MRO', 'C3 Linearization', 'Multiple'], hint: 'super().__init__(). Herencia múltiple. MRO (Method Resolution Order): C3 Linearization. __mro__.' },
  'poo-metodos':      { title: 'Métodos especiales (__dunder__)', icon: '🔧', mod: 'poo', tags: ['__eq__', '__lt__', '__len__', '__iter__', '__enter__'], hint: '__eq__, __lt__, __add__, __len__, __iter__, __next__, __enter__, __exit__. Hacen clases "Pythónicas".' },
  'poo-abstractas':   { title: 'Clases Abstractas (ABC)', icon: '🗂️', mod: 'poo', tags: ['ABCMeta', '@abstractmethod', 'Interface'], hint: 'from abc import ABC, abstractmethod. No se pueden instanciar. Fuerzan implementación en subclases. Equivalente a interfaces.' },
  'poo-dataclass':    { title: 'Dataclasses', icon: '📦', mod: 'poo', tags: ['@dataclass', 'field()', 'frozen', 'eq'], hint: '@dataclass auto-genera __init__, __repr__, __eq__. frozen=True lo hace inmutable. field(default_factory=list).' },
  'poo-patrones':     { title: 'Design Patterns en Python', icon: '♟️', mod: 'poo', tags: ['Singleton', 'Factory', 'Observer', 'Strategy'], hint: 'Singleton (una sola instancia). Factory (crear objetos sin exponer lógica). Observer (event system). Strategy (comportamiento intercambiable).' },

  // TESTING
  'ut-intro':         { title: 'Unittest — Introducción', icon: '🧪', mod: 'testing', tags: ['TestCase', 'TestSuite', 'TestRunner'], hint: 'Framework estándar de Python. Clase TestCase, métodos test_*. TestSuite agrupa tests. TextTestRunner ejecuta y reporta.' },
  'ut-estructura':    { title: 'Estructura de un test', icon: '📐', mod: 'testing', tags: ['AAA', 'Arrange', 'Act', 'Assert'], hint: 'Patrón AAA: Arrange (preparar), Act (ejecutar), Assert (verificar). Un test = una responsabilidad.' },
  'ut-setup':         { title: 'setUp / tearDown / setUpClass', icon: '⚙️', mod: 'testing', tags: ['setUp', 'tearDown', 'setUpClass', 'setUpModule'], hint: 'setUp(): antes de cada test. tearDown(): después de cada test. setUpClass(): una vez por clase. setUpModule(): una vez por módulo.' },
  'ut-asserts':       { title: 'ASSERT Methods', icon: '✔️', mod: 'testing', tags: ['assertEqual', 'assertRaises', 'assertIn', 'assertTrue'], hint: 'assertEqual, assertNotEqual, assertTrue, assertFalse, assertIsNone, assertIn, assertRaises, assertAlmostEqual.' },
  'ut-mock':          { title: 'Mock / Patch', icon: '🎭', mod: 'testing', tags: ['MagicMock', '@patch', 'return_value', 'side_effect'], hint: 'from unittest.mock import Mock, patch. @patch("module.Class"). mock.return_value. mock.side_effect. mock.assert_called_with().' },
  'ut-decoradores':   { title: 'Decoradores de test', icon: '🎨', mod: 'testing', tags: ['@skip', '@skipIf', '@expectedFailure', '@skipUnless'], hint: '@unittest.skip("razón"). @unittest.skipIf(condition). @unittest.expectedFailure. @unittest.skipUnless.' },
  'ut-subtest':       { title: 'SubTest', icon: '🔬', mod: 'testing', tags: ['with self.subTest()', 'Parametrizado', 'Continúa en fallo'], hint: 'with self.subTest(i=i): permite que un loop de asserts no se detenga en el primer fallo. Útil para datos tabulares.' },
  'ut-doctest':       { title: 'DocTest', icon: '📖', mod: 'testing', tags: ['>>>', 'docstring', 'doctest.testmod()'], hint: 'Tests escritos en docstrings con ">>>". doctest.testmod() los ejecuta. Útil para documentar y testear a la vez.' },
  'pt-intro':         { title: 'pytest — Introducción', icon: '⚡', mod: 'testing', tags: ['pip install pytest', 'test_*.py', 'assert'], hint: 'Más simple que unittest: sin herencia, assert nativo. Descubre archivos test_*.py y funciones test_*. Instalar: pip install pytest.' },
  'pt-fixtures':      { title: 'Fixtures', icon: '🏗️', mod: 'testing', tags: ['@pytest.fixture', 'scope', 'yield', 'conftest'], hint: '@pytest.fixture. Scope: function, class, module, session. Uso en parámetro de test. yield para teardown. conftest.py compartido.' },
  'pt-parametrize':   { title: '@pytest.mark.parametrize', icon: '🔢', mod: 'testing', tags: ['@parametrize', 'ids', 'indirect'], hint: '@pytest.mark.parametrize("a,b,c", [(1,2,3),(4,5,9)]). Múltiple parametrize para combinaciones. ids= para nombrar casos.' },
  'pt-marks':         { title: 'Marks y filtros', icon: '🏷️', mod: 'testing', tags: ['@pytest.mark.slow', '-m', 'custom marks', 'pytest.ini'], hint: 'pytest -m "slow". Registrar marks en pytest.ini. @pytest.mark.xfail, @pytest.mark.skip. -k para filtrar por nombre.' },
  'pt-conftest':      { title: 'conftest.py', icon: '📁', mod: 'testing', tags: ['Fixtures compartidas', 'Plugins', 'Hook functions'], hint: 'Archivo especial de pytest. Fixtures disponibles para todo el directorio. Plugin hooks: pytest_collection_modifyitems.' },
  'pt-assert':        { title: 'Assert en pytest', icon: '✔️', mod: 'testing', tags: ['assert', 'Introspection', 'pytest.raises', 'approx'], hint: 'assert a == b (pytest muestra diff). pytest.raises(ValueError). pytest.approx(0.1+0.2, 0.3). assert re.match().' },
  'pt-reportes':      { title: 'Reportes — HTML, JUnit, CSV', icon: '📊', mod: 'testing', tags: ['pytest-html', '--junitxml', 'csv-report', 'allure'], hint: 'pytest --html=report.html. pytest --junitxml=results.xml (para CI). Allure para reportes visuales avanzados.' },
  'coverage':         { title: 'Coverage.py & HTML Report', icon: '📈', mod: 'testing', tags: ['coverage run', 'coverage report', '--cov', 'htmlcov/'], hint: 'coverage run -m pytest. coverage report -m. coverage html → htmlcov/index.html. pytest-cov: pytest --cov=src.' },
  'ut-api':           { title: 'API Testing con requests + pytest', icon: '🌐', mod: 'testing', tags: ['requests', 'status_code', 'json()', 'httpretty'], hint: 'requests.get(url). response.status_code. response.json(). Mock con responses o httpretty. Fixtures para base_url.' },
  'ut-faker':         { title: 'Faker — Datos aleatorios', icon: '🎲', mod: 'testing', tags: ['Faker()', 'faker.name()', 'Locale', 'Factory Boy'], hint: 'from faker import Faker. faker.name(), email(), date(), address(). Locale: Faker("es_MX"). Factory Boy para objetos.' },
  'gh-actions-py':    { title: 'GitHub Actions + pytest', icon: '🤖', mod: 'testing', tags: ['workflow.yml', 'ubuntu-latest', 'pytest', 'badge'], hint: 'on: push. jobs: test: steps: checkout, setup-python, pip install, pytest. Badge de estado en README.' },
  'ia-test':          { title: 'IA Test — Generación con IA', icon: '🧠', mod: 'testing', tags: ['Copilot', 'ChatGPT', 'Prompts', 'Review'], hint: 'Generar casos de prueba con Copilot / ChatGPT. Estrategia de prompts: "genera tests unitarios para esta función". Revisar siempre la lógica.' },

  // GIT
  'git-config':       { title: 'Configurar Git', icon: '⚙️', mod: 'git', tags: ['git config', '--global', 'SSH', '.gitconfig'], hint: 'git config --global user.name. git config --global user.email. Configurar VS Code como editor: core.editor.' },
  'git-comandos':     { title: 'Comandos más usados', icon: '💻', mod: 'git', tags: ['add', 'commit', 'push', 'pull', 'fetch', 'status'], hint: 'init, clone, add, commit -m, push, pull, fetch, status, diff, log --oneline. git shortlog -sn.' },
  'git-branching':    { title: 'Branching — Crear / Merge', icon: '🌿', mod: 'git', tags: ['branch', 'checkout', 'merge', 'fast-forward'], hint: 'git branch feature/x. git checkout -b. git merge --no-ff. Fast-forward vs 3-way merge. Gitflow workflow.' },
  'git-conflictos':   { title: 'Conflictos de merge', icon: '⚠️', mod: 'git', tags: ['<<<<<<', 'HEAD', 'Conflict markers', 'VS Code'], hint: 'Marcadores: <<<<< HEAD / ======= / >>>>> branch. Resolución manual o con VS Code merge editor. git mergetool.' },
  'git-reset-revert': { title: 'Reset vs Revert vs Checkout', icon: '↩️', mod: 'git', tags: ['--soft', '--mixed', '--hard', 'revert'], hint: 'reset --soft (mantiene staged), --mixed (unstaged), --hard (elimina cambios). revert crea commit inverso. checkout para archivos.' },
  'git-stash':        { title: 'Stash', icon: '📦', mod: 'git', tags: ['git stash', 'pop', 'apply', 'list', 'drop'], hint: 'git stash (guarda cambios sin commit). stash pop (recupera y elimina). stash apply (recupera y mantiene). stash list.' },
  'git-rebase':       { title: 'Rebase vs Merge', icon: '🔀', mod: 'git', tags: ['rebase', 'interactive', 'squash', 'clean history'], hint: 'Rebase reescribe historial (lineal). Merge preserva historial (con commit de merge). git rebase -i HEAD~3 para squash.' },
  'git-tag':          { title: 'Tags y versioning', icon: '🏷️', mod: 'git', tags: ['annotated', 'lightweight', 'SemVer', 'push --tags'], hint: 'git tag v1.0.0. Annotated: git tag -a v1.0.0 -m "Release". SemVer: MAJOR.MINOR.PATCH. git push origin --tags.' },
  'git-logs':         { title: 'Logs y blame', icon: '📜', mod: 'git', tags: ['--oneline', '--graph', 'blame', 'bisect'], hint: 'git log --oneline --graph --decorate. git blame archivo.py. git bisect para encontrar bug introducido.' },
  'gh-intro':         { title: 'GitHub — Overview', icon: '🐙', mod: 'git', tags: ['Repositorio', 'Fork', 'Clone', 'Colaboración'], hint: 'Fork vs Clone. Upstream vs origin. Contribuir a proyecto externo: fork → clone → PR. Organization vs user repos.' },
  'gh-ssh':           { title: 'SSH Key & Clonar', icon: '🔑', mod: 'git', tags: ['ssh-keygen', 'id_rsa.pub', 'ssh-add', 'git clone'], hint: 'ssh-keygen -t ed25519. Copiar pub key a GitHub Settings. ssh -T git@github.com para verificar. git clone git@...' },
  'gh-pr':            { title: 'Pull Requests', icon: '🔃', mod: 'git', tags: ['Draft PR', 'Review', 'Approve', 'Squash merge'], hint: 'Draft PR para trabajo en progreso. Code review: comentarios línea a línea. Merge strategies: merge, squash, rebase.' },
  'gh-issues':        { title: 'Issues & Projects', icon: '🐛', mod: 'git', tags: ['Labels', 'Milestone', 'Kanban', 'GitHub Projects'], hint: 'Issues: bug, feature request. Labels: bug, enhancement, good first issue. Projects: tablero Kanban. Cerrar issue con commit.' },
  'gh-actions':       { title: 'GitHub Actions (CI/CD)', icon: '🤖', mod: 'git', tags: ['workflow', 'on: push', 'jobs', 'steps', 'secrets'], hint: '.github/workflows/ci.yml. Triggers: push, pull_request, schedule. Runners: ubuntu-latest. Secrets para tokens.' },
  'gh-markdown':      { title: 'Markdown & GitHub Gist', icon: '📝', mod: 'git', tags: ['#', '**bold**', '```code```', 'Gist'], hint: 'Headers #/##/###. Listas, tablas, bloques de código con lenguaje. Gist para snippets públicos/privados compartibles.' },
  'git-bitbucket':    { title: 'Bitbucket', icon: '🪣', mod: 'git', tags: ['Atlassian', 'Pipelines', 'Jira integration', 'PR'], hint: 'Alternativa a GitHub (Atlassian). Integración nativa con Jira. Bitbucket Pipelines para CI/CD. Común en empresas enterprise.' },

  // DEVOPS
  'cicd-conceptos':   { title: 'CI/CD — Conceptos', icon: '⚙️', mod: 'devops', tags: ['Continuous Integration', 'Continuous Delivery', 'Pipeline'], hint: 'CI: integrar y testear en cada commit. CD: desplegar automáticamente. Pipeline: build → test → deploy. Fail fast.' },
  'jenkins':          { title: 'Jenkins — Pipelines', icon: '🏗️', mod: 'devops', tags: ['Jenkinsfile', 'Groovy', 'Stages', 'Agents'], hint: 'Jenkinsfile (Groovy). pipeline { agent any stages { stage("Test") { steps { sh "pytest" } } } }. Plugins para Python, Docker.' },
  'docker-intro':     { title: 'Docker — Introducción', icon: '🐳', mod: 'devops', tags: ['Contenedor', 'Imagen', 'Docker Hub', 'Namespace'], hint: 'Contenedor vs VM. Image = plantilla. Container = instancia corriendo. Capas de imagen. Namespaces y cgroups.' },
  'docker-comandos':  { title: 'Comandos Docker esenciales', icon: '💻', mod: 'devops', tags: ['run', 'build', 'ps', 'exec', 'logs', 'rm'], hint: 'docker run, build, ps, images, pull, exec -it, logs, stop, rm, rmi. docker inspect. docker stats.' },
  'docker-compose':   { title: 'Docker Compose', icon: '🎵', mod: 'devops', tags: ['docker-compose.yml', 'services', 'volumes', 'networks'], hint: 'docker-compose.yml: version, services, volumes, networks. docker compose up/down/ps/logs. Dependencias entre servicios.' },
  'docker-dockerfile': { title: 'Dockerfile', icon: '📄', mod: 'devops', tags: ['FROM', 'RUN', 'COPY', 'CMD', 'ENTRYPOINT'], hint: 'FROM python:3.11-slim. WORKDIR /app. COPY requirements.txt. RUN pip install. COPY . . CMD ["python","app.py"].' },
  'linux-bash':       { title: 'Linux / Bash comandos', icon: '🐧', mod: 'devops', tags: ['ls', 'grep', 'chmod', 'ssh', 'pipe'], hint: 'ls -la, cd, cp, mv, rm -rf, chmod, chown, grep -r, find, cat, tail -f, ssh, scp, curl, ps aux, kill, cron.' },

  // LINUX
  'linux-nav':         { title: 'Navegación del sistema', icon: '🗂️', mod: 'linux', tags: ['ls', 'cd', 'pwd', 'tree', 'find', 'pushd'], hint: 'ls -la, cd, pwd, tree, pushd/popd, realpath, dirname, basename. Navegar eficientemente el filesystem.' },
  'linux-archivos':    { title: 'Gestión de archivos', icon: '📁', mod: 'linux', tags: ['cp', 'mv', 'rm', 'mkdir', 'touch', 'ln', 'stat', 'wc'], hint: 'cp, mv, rm -rf, mkdir -p, touch, ln -s, stat, file, wc. Operaciones esenciales sobre archivos y directorios.' },
  'linux-busqueda':    { title: 'Búsqueda y filtrado', icon: '🔍', mod: 'linux', tags: ['grep', 'find', 'locate', 'awk', 'sed', 'cut'], hint: 'grep -rn, find con -exec, awk, sed, cut. Herramientas de búsqueda y procesamiento de texto en Linux.' },
  'linux-procesos':    { title: 'Procesos y jobs', icon: '⚙️', mod: 'linux', tags: ['ps', 'top', 'kill', 'nice', 'jobs', 'systemctl'], hint: 'ps aux, top, htop, kill -9, nice, jobs, bg/fg, nohup, systemctl start/stop/status.' },
  'linux-permisos':    { title: 'Permisos y usuarios', icon: '🔐', mod: 'linux', tags: ['chmod', 'chown', 'sudo', 'su', 'umask', 'groups'], hint: 'chmod 755, chown user:group, sudo, su, useradd, passwd, groups, id, umask.' },
  'linux-red':         { title: 'Red, SSH y transferencia', icon: '🌐', mod: 'linux', tags: ['ssh', 'scp', 'rsync', 'curl', 'wget', 'netstat'], hint: 'ssh, scp, rsync, curl -X, wget, ping, netstat -tlnp, ss, ip addr, ifconfig, nc.' },
  'linux-pipes':       { title: 'Pipes, redirección y texto', icon: '🔗', mod: 'linux', tags: ['|', '>', '>>', 'tee', 'xargs', 'sort', 'uniq'], hint: 'Pipes |, redirección >, >>, 2>&1, tee, xargs, sort, uniq, head, tail, cut, tr, wc.' },
  'linux-bash-script': { title: 'Bash scripting', icon: '📜', mod: 'linux', tags: ['variables', 'if', 'for', 'while', 'funciones', 'arrays'], hint: 'Variables, if/else, for/while, case, funciones, arrays, $#, $@, $?, exit codes, shebang.' },
  'linux-monitoreo':   { title: 'Monitoreo y logs', icon: '📊', mod: 'linux', tags: ['df', 'du', 'free', 'vmstat', 'dmesg', 'journalctl'], hint: 'df -h, du -sh, free -m, vmstat, dmesg, journalctl -f, tail -f, watch, uptime, lscpu.' },
  'linux-paquetes':    { title: 'Gestión de paquetes', icon: '📦', mod: 'linux', tags: ['apt', 'apt-get', 'dpkg', 'snap', 'pip'], hint: 'apt install/update/upgrade/remove, dpkg -l, snap install, flatpak, pip install -r requirements.txt.' },

  // METODOLOGÍAS
  'scrum':            { title: 'SCRUM', icon: '🔄', mod: 'metod', tags: ['Sprint', 'Product Backlog', 'Daily', 'Retrospective'], hint: 'Roles: PO, Scrum Master, Dev Team. Eventos: Sprint Planning, Daily, Review, Retrospective. Artefactos: Product Backlog, Sprint Backlog.' },
  'agile':            { title: 'Agile — Principios', icon: '🌀', mod: 'metod', tags: ['12 Principios', 'Manifiesto', 'Iterativo'], hint: '4 valores del Manifiesto Ágil. 12 principios. Iterativo e incremental. Kanban vs Scrum. SAFe para proyectos grandes.' },
  'vmodel':           { title: 'V-Model', icon: '📐', mod: 'metod', tags: ['Requirements', 'Design', 'Implementation', 'Verification'], hint: 'Cada fase tiene su fase de prueba correspondiente. Requisitos ↔ Acceptance Test. Design ↔ Integration Test. Code ↔ Unit Test.' },
  'sw-testing-concepts': { title: 'SW Testing Concepts', icon: '🧪', mod: 'metod', tags: ['Black Box', 'White Box', 'Regression', 'Smoke'], hint: 'Black Box (comportamiento externo) vs White Box (código interno). Regression, Smoke, Sanity, Exploratory testing.' },
  'test-levels':      { title: 'Niveles de prueba', icon: '🎚️', mod: 'metod', tags: ['Unit', 'Integration', 'System', 'Acceptance'], hint: 'Unit → Integration → System → Acceptance (UAT). Pirámide de testing: más unit tests, pocos E2E.' },
  'test-types':       { title: 'Tipos de prueba', icon: '🗂️', mod: 'metod', tags: ['Funcional', 'Performance', 'Security', 'Usability'], hint: 'Funcional, No funcional (Performance, Seguridad, Usabilidad). Prueba de regresión, estática, dinámica.' },
  'tdd':              { title: 'TDD — Test Driven Development', icon: '🔴', mod: 'metod', tags: ['Red', 'Green', 'Refactor', 'Ciclo'], hint: 'Ciclo: Red (escribir test que falla) → Green (código mínimo para pasar) → Refactor (limpiar). Ventaja: diseño emergente.' },

  // ISTQB
  'istqb-ch1':        { title: 'Ch1 — Fundamentos del Testing', icon: '📖', mod: 'istqb', tags: ['Por qué testear', 'Error-Defect-Failure', '7 Principios'], hint: '7 principios: testing shows presence of defects, exhaustive testing impossible, early testing, defect clustering, pesticide paradox, testing is context-dependent, absence-of-errors fallacy.' },
  'istqb-ch2':        { title: 'Ch2 — Testing en el SDLC', icon: '📖', mod: 'istqb', tags: ['V-Model', 'Agile', 'Niveles', 'Tipos'], hint: 'Modelos secuenciales vs iterativos. Niveles de prueba en cada modelo. Shift-left testing. Testing en Agile/DevOps.' },
  'istqb-ch3':        { title: 'Ch3 — Pruebas estáticas', icon: '📖', mod: 'istqb', tags: ['Review', 'Walkthrough', 'Inspección', 'Análisis estático'], hint: 'Revisar sin ejecutar. Tipos de review: informal, walkthrough, technical, inspection. Análisis estático con herramientas (linting).' },
  'istqb-ch4':        { title: 'Ch4 — Técnicas de prueba', icon: '📖', mod: 'istqb', tags: ['Equivalence', 'Boundary', 'Decision Table', 'State Machine'], hint: 'Black-box: Equivalence Partitioning, Boundary Value Analysis, Decision Table, State Transition. White-box: Statement/Branch coverage.' },
  'istqb-ch4-collab': { title: 'Ch4 — Collaborative Testing', icon: '🤝', mod: 'istqb', tags: ['BDD', 'ATDD', 'Three Amigos', 'Gherkin'], hint: 'Three Amigos: BA, Dev, Tester definen criterios. ATDD. BDD: Given/When/Then (Gherkin). Herramientas: Cucumber, Behave.' },
  'istqb-ch5':        { title: 'Ch5 — Gestión de pruebas', icon: '📖', mod: 'istqb', tags: ['Test Planning', 'Risk-based', 'Entry/Exit criteria', 'Metrics'], hint: 'Test planning, estimation, monitoring. Risk-based testing. Entry/Exit criteria. Métricas: defect density, test coverage.' },
  'istqb-ch6':        { title: 'Ch6 — Herramientas de testing', icon: '📖', mod: 'istqb', tags: ['Test Management', 'SAST', 'DAST', 'Performance'], hint: 'Categorías: gestión (Jira, TestRail), análisis estático (SonarQube), performance (JMeter), CI/CD (Jenkins, GitHub Actions).' },

  // ENTREVISTAS
  'ent-estructura-datos': { title: 'Estructuras de datos en Python', icon: '🗂️', mod: 'interview', tags: ['Stack', 'Queue', 'LinkedList', 'Tree', 'Graph'], hint: 'Stack (list o deque). Queue (collections.deque). Linked List. Binary Tree. Graph (dict of lists). Heap (heapq).' },
  'ent-algoritmos':   { title: 'Algoritmos frecuentes', icon: '🔢', mod: 'interview', tags: ['BFS', 'DFS', 'Binary Search', 'Sorting', 'Two Pointers'], hint: 'BFS/DFS para grafos y árboles. Binary Search. Sorting (quicksort, mergesort). Two Pointers. Sliding Window. Dynamic Programming.' },
  'ent-complejidad':  { title: 'Complejidad — Big O', icon: '📊', mod: 'interview', tags: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)', 'Space'], hint: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²). Time vs Space complexity. Analizar loops anidados. Amortized analysis.' },
  'ent-preguntas-py': { title: 'Preguntas frecuentes Python', icon: '🐍', mod: 'interview', tags: ['GIL', 'is vs ==', 'mutable vs immutable', 'LEGB'], hint: 'GIL, mutable vs inmutable, is vs ==, scope LEGB, list vs tuple vs dict vs set, generators, decoradores, async/await.' },
  'ent-preguntas-auto': { title: 'Preguntas frecuentes Automotriz', icon: '🚗', mod: 'interview', tags: ['CAN vs ETH', 'ASIL-D', 'UDS 0x22', 'Bootloader'], hint: '¿Qué es ASIL? ¿Diferencia CAN y ETH? ¿Cómo funciona el diagnóstico UDS? ¿Qué es ASPICE? ¿Qué es AUTOSAR?' },
  'ent-behavioral':   { title: 'Preguntas Behavioral (STAR)', icon: '⭐', mod: 'interview', tags: ['Situación', 'Tarea', 'Acción', 'Resultado'], hint: 'STAR: Situación, Tarea, Acción, Resultado. "Cuéntame de un conflicto en equipo", "proyecto más desafiante", "error cometido".' },
  'ent-preguntas-entrevistador': { title: 'Preguntas al Entrevistador', icon: '❓', mod: 'interview', tags: ['Cultura', 'Proyectos', 'Crecimiento', 'Herramientas'], hint: '¿Qué herramientas usa el equipo? ¿Cómo es el proceso de code review? ¿Qué define el éxito en este rol? ¿Cuál es el mayor reto actual?' },
  'ent-patron-apuntadores': { title: 'Patron Two Pointers', icon: '👆', mod: 'interview', tags: ['Two Pointers', 'Sliding Window', 'Fast & Slow'], hint: 'Two Pointers: left/right en array ordenado. Sliding Window: ventana de tamaño fijo/variable. Fast & Slow: detectar ciclos en lista enlazada.' },
  'ent-libros':       { title: 'Libros & Recursos recomendados', icon: '📚', mod: 'interview', tags: ['Cracking Coding', 'Clean Code', 'ISTQB Syllabus'], hint: '"Cracking the Coding Interview" - Gayle McDowell. "Clean Code" - Robert Martin. ISTQB CTFL Syllabus v4.0. Documentación oficial Python.' },

  // ── NUEVOS TEMAS GENERALES ─────────────────────────────────────
  'sil-mil':          { title: 'HIL / SIL / MIL — Comparativa', icon: '🔬', mod: 'tools', tags: ['HIL', 'SIL', 'MIL', 'V-Model', 'dSPACE'], hint: 'MIL: prueba el modelo (Simulink). SIL: prueba el código generado en PC. HIL: prueba en hardware real con entorno simulado. Costo: MIL < SIL < HIL.' },
  'mcap':             { title: 'MCAP — Robot Data Format', icon: '🤖', mod: 'tools', tags: ['mcap', 'Foxglove', 'ROS2', 'LIDAR', 'Camera'], hint: 'Contenedor open-source para datos de robots/AV. Soporta: LIDAR, cámara, IMU, GPS. Alternativa a ROS2 bags. Herramientas: mcap CLI, Foxglove Studio.' },
  'observability':    { title: 'Observability — Logs/Metrics/Traces', icon: '📊', mod: 'tools', tags: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Logging'], hint: 'Los 3 pilares: Logs (qué pasó), Metrics (cuánto/cuándo), Traces (dónde en el flujo). Stack: Prometheus + Grafana. OpenTelemetry como estándar.' },
  'py-logging':       { title: 'Python Logging', icon: '📝', mod: 'devops', tags: ['logging', 'DEBUG', 'INFO', 'WARNING', 'Handler', 'Formatter'], hint: 'import logging. Niveles: DEBUG < INFO < WARNING < ERROR < CRITICAL. logging.basicConfig(). FileHandler + StreamHandler. JSON logging para CI.' },
  'triage-ci':        { title: 'Triage de fallos en CI/CD', icon: '🔍', mod: 'devops', tags: ['Flaky test', 'Infra failure', 'Root cause', 'Runbook'], hint: 'Clasificar: código (determinista) vs infra/tooling (flaky). Metodología: reproduce → aisla → root cause → documenta → automatiza detección.' },

  // ── WAYVE INTERVIEW TOPICS ─────────────────────────────────────
  'wayve-plan': {
    title: 'Plan de estudio — 1 día para Wayve',
    icon: '⚡', mod: 'wayve',
    tags: ['Urgente', '8 Jul', 'Priorizado', 'Estudio'],
    hint: 'Plan hora por hora para la entrevista de mañana. Prioriza HIL/SIL/MIL, pytest, MCAP, triage y algoritmos.'
  },
  'wayve-empresa': {
    title: 'Wayve — Quiénes son',
    icon: '🏢', mod: 'wayve',
    tags: ['AV', 'London', 'L4', 'ML-first', 'Series C'],
    hint: 'Startup de conducción autónoma. Fundada 2017. Sede: Londres. Enfoque: ML-first (no rule-based). Nivel L4. Series C funding. Clientes: supermercados UK.'
  },
  'wayve-jd': {
    title: 'JD Breakdown — Keywords clave',
    icon: '🎯', mod: 'wayve',
    tags: ['HIL/SIL/MIL', 'Python', 'CI/CD', 'MCAP', 'Triage', 'Embedded'],
    hint: 'Analiza las palabras clave del JD y cómo mapearlas a tu experiencia. Platform Validation = HIL + pytest + CI/CD + Python.'
  },
  'wayve-hil-sil-mil': {
    title: 'HIL/SIL/MIL para la entrevista Wayve',
    icon: '🔬', mod: 'wayve',
    tags: ['HIL', 'SIL', 'MIL', 'Bench HW', 'Firmware', 'dSPACE'],
    hint: 'El JD menciona los tres. Prepara: cómo los has usado, cómo triageas fallos en cada nivel, y diferencias clave entre ellos.'
  },
  'wayve-mcap': {
    title: 'MCAP — Sensor data format (Wayve)',
    icon: '📦', mod: 'wayve',
    tags: ['MCAP', 'Foxglove', 'Ingest', 'Offload', 'Validation'],
    hint: 'El JD menciona "MCAP, offload, and ingest processes". MCAP es el formato de datos de sensores de Wayve. Prepara: qué es, para qué sirve, cómo validar datos en él.'
  },
  'wayve-sensor': {
    title: 'Sensor data validation (Wayve)',
    icon: '📡', mod: 'wayve',
    tags: ['Logging', 'MCAP', 'Completeness', 'Timestamp', 'Gaps'],
    hint: 'Validar: completitud de datos, timestamps correctos, frecuencia de muestreo, gaps, corrupción. Herramientas: scripts Python + Foxglove.'
  },
  'wayve-triage': {
    title: 'Triage — HW vs SW vs Tooling',
    icon: '🔍', mod: 'wayve',
    tags: ['Root cause', 'Bench HW', 'Firmware defect', 'Infra', 'Flaky'],
    hint: 'La responsabilidad central del rol. Distinguir: fallo de firmware real vs problema de bench HW vs bug en tooling vs infra flaky. Metodología clara.'
  },
  'wayve-ci': {
    title: 'CI/CD debugging strategy (Wayve)',
    icon: '⚙️', mod: 'wayve',
    tags: ['Pipeline', 'Failure analysis', 'Runbook', 'Dashboard', 'Linux'],
    hint: 'Cómo analizar logs de CI, identificar patrones recurrentes, crear runbooks, y construir dashboards de health. El JD pide reducir tiempo de triage.'
  },
  'wayve-pytest': {
    title: 'pytest para la entrevista Wayve',
    icon: '🧪', mod: 'wayve',
    tags: ['fixtures', 'parametrize', 'conftest', 'marks', 'coverage'],
    hint: 'El consejo fue: "si has usado pytest eso ayuda". Prepara: fixtures para setup de bench, parametrize para distintas configs HW, marks para HW-dependent tests.'
  },
  'wayve-system-design': {
    title: 'System design básico (AV Platform)',
    icon: '🏗️', mod: 'wayve',
    tags: ['Pipeline', 'Message Queue', 'ROS2', 'Kafka', 'Scalability'],
    hint: 'Para AV: pipeline de ingesta de datos → procesamiento → almacenamiento → validación. Preguntas posibles: "¿cómo diseñarías un sistema de validación de datos de sensores?"'
  },
  'wayve-algoritmos': {
    title: 'Algoritmos clave para Wayve',
    icon: '🔢', mod: 'wayve',
    tags: ['Sorting', 'Search', 'Graph', 'Sliding Window', 'Hash Map'],
    hint: 'Consejo dado: "algoritmos". Para este rol: procesar streams de datos (sliding window), buscar patrones en logs (string matching), analizar grafos de dependencias (BFS/DFS).'
  },
  'wayve-preguntas': {
    title: 'Preguntas probables con respuestas',
    icon: '💬', mod: 'wayve',
    tags: ['Debug', 'HIL experience', 'CI failures', 'Python automation', 'STAR'],
    hint: '"Describe cómo triageas un fallo en pipeline". "¿Cómo distingues un bug de firmware de un fallo de infra?". "¿Cómo mejorarías la confiabilidad de un CI?". Usa STAR.'
  },
  'wayve-entrevistador': {
    title: 'Preguntas al entrevistador — Wayve',
    icon: '❓', mod: 'wayve',
    tags: ['Stack', 'Equipo', 'KPIs', 'Autonomía', 'Remote'],
    hint: '"¿Qué herramientas usan para HIL?" "¿Cómo miden el tiempo de triage actualmente?" "¿Cómo es el ciclo de release?" "¿Remote es permanente o temporal?"'
  },
  'wayve-algo-approach': {
    title: 'Cómo resolver cualquier coding challenge',
    icon: '📐', mod: 'wayve',
    tags: ['Approach', 'Big O', 'Python tools', 'Pattern recognition', 'Edge cases'],
    hint: 'El framework de 6 pasos para cualquier ejercicio, cómo identificar el patrón correcto, Big O de memoria, Python tools esenciales y edge cases que siempre debes mencionar.'
  },
  'wayve-algo-advanced': {
    title: 'Patrones avanzados — Intervals, DP, Topological Sort',
    icon: '🔥', mod: 'wayve',
    tags: ['Merge Intervals', 'Kadane', 'Dynamic Programming', 'Topological Sort', 'Sweep Line'],
    hint: 'Los 3 patrones que no están en el set base pero que puede que pregunten en nivel senior: merge/insert intervals, Kadane maximum subarray, y topological sort para dependencias.'
  },
  'wayve-checklist': {
    title: 'Checklist — Qué dominar antes del 14 Jul',
    icon: '✅', mod: 'wayve',
    tags: ['Checklist', 'Repaso', 'Priority', 'Must know', 'Nice to know'],
    hint: 'Lista completa de temas con prioridad: qué DEBES saber sí o sí vs qué está bien si lo mencionas. Con autocheck para marcar progreso.'
  },

  // ── WAYVE DEEP DIVE TOPICS ────────────────────────────────────
  'wayve-lingo': {
    title: 'LINGO — El modelo AV de Wayve',
    icon: '🧠', mod: 'wayve',
    tags: ['LINGO', 'Foundation Model', 'End-to-End', 'Multimodal', 'AV2.0'],
    hint: 'LINGO es el foundation model de Wayve para conducción autónoma. End-to-end: de pixels de cámara a señales de control. Diferencia clave vs Waymo (rule-based).'
  },
  'wayve-av20': {
    title: 'AV 1.0 vs AV 2.0 — La filosofía Wayve',
    icon: '🚗', mod: 'wayve',
    tags: ['AV 1.0', 'AV 2.0', 'ML-first', 'End-to-end', 'Generalización'],
    hint: 'Wayve apuesta por AV 2.0: modelos de ML de extremo a extremo sin reglas escritas a mano. Por qué esto cambia cómo se valida y prueba el sistema.'
  },
  'wayve-dev-vehicle': {
    title: 'Development Vehicle — Stack de sensores',
    icon: '🚙', mod: 'wayve',
    tags: ['Camera', 'LIDAR', 'RADAR', 'NVIDIA Drive', 'Safety Driver'],
    hint: 'El vehículo de desarrollo es el hardware real donde corre el modelo. Sensores: cámaras (múltiples ángulos), LIDAR, RADAR, GPS/IMU. Compute: HPC tipo NVIDIA. Safety driver obligatorio en UK.'
  },
  'wayve-data-pipeline': {
    title: 'Data Pipeline — Vehicle → Cloud',
    icon: '🔄', mod: 'wayve',
    tags: ['Offload', 'Ingest', 'Validate', 'S3', 'Labeling'],
    hint: 'El flujo completo: grabar en vehículo (MCAP) → offload vía WiFi → validate → ingest a cloud → labeling → training. El rol vive en validate + ingest.'
  },
  'wayve-python-challenge': {
    title: 'Coding Challenge — Lo que preguntarán',
    icon: '💻', mod: 'wayve',
    tags: ['Sliding Window', 'Log parsing', 'Anomaly detection', 'MCAP validation'],
    hint: 'Los challenges típicos para este rol: procesar streams de eventos con timestamps, detectar gaps en sensor data, parsear logs de CI, encontrar top-N errores.'
  },
  'wayve-challenges-2': {
    title: 'Coding Challenges — Parte 2 (6 ejercicios)',
    icon: '🔥', mod: 'wayve',
    tags: ['Intervals', 'HashMap', 'Priority Queue', 'Circular Buffer', 'Bisect', 'Merge'],
    hint: 'Merge intervals de sesiones, deduplicar eventos, top-K con heap, circular buffer para streams, binary search en timestamps, sync multi-sensor.'
  },
  'wayve-challenges-3': {
    title: 'Coding Challenges — Parte 3 (DP + Grafos)',
    icon: '🧩', mod: 'wayve',
    tags: ['DP', 'Graph', 'Topological sort', 'Longest valid sequence', 'CI dependency'],
    hint: 'DP para longest healthy recording, topological sort para orden de tests en CI, DFS para detectar ciclos en dependencias, matrix traversal.'
  },
  'wayve-linux-debug': {
    title: 'Linux debugging en vehículos AV',
    icon: '🐧', mod: 'wayve',
    tags: ['journalctl', 'dmesg', 'systemd', 'strace', 'network debug'],
    hint: 'Los development vehicles corren Linux. Debugging en campo: journalctl, dmesg, ps aux, strace, tcpdump. Conectarse al vehículo vía SSH. Ver logs de sensores en tiempo real.'
  },
  'wayve-reliability': {
    title: 'Reliability Engineering para AV',
    icon: '📊', mod: 'wayve',
    tags: ['SLI', 'SLO', 'Runbooks', 'On-call', 'Post-mortem'],
    hint: 'SLI/SLO para plataformas AV: disponibilidad de benches, éxito de offload, tiempo de triage. Runbooks = guías paso a paso para fallos conocidos. Post-mortems blameless.'
  },
  'wayve-design-fleet': {
    title: 'System Design — Monitorear flota de vehículos',
    icon: '🏗️', mod: 'wayve',
    tags: ['Fleet monitoring', 'Telemetry', 'Prometheus', 'Grafana', 'Alerting'],
    hint: 'Diseñar un sistema para monitorear 10+ vehículos de desarrollo en tiempo real: GPS, salud de sensores, estado de grabación, temperatura de compute. Dashboard + alertas.'
  },
  'wayve-english-mock': {
    title: 'Mock Interview completa en inglés',
    icon: '🗣️', mod: 'wayve',
    tags: ['English', 'Mock', 'Opening', 'Technical', 'Behavioral', 'Closing'],
    hint: 'Simulacro completo: introducción en inglés, respuestas técnicas a preguntas reales, behavioral con método STAR, y cierre. Con frases exactas para memorizar.'
  },
  'wayve-star-stories': {
    title: 'STAR Stories — 5 historias preparadas',
    icon: '⭐', mod: 'wayve',
    tags: ['STAR', 'Debugging', 'CI improvement', 'Ambiguity', 'Conflict', 'Learning'],
    hint: '5 historias STAR listas para los temas más pedidos: mejora de pipeline CI, debugging complejo, aprendizaje rápido, trabajo ambiguo, resultado con datos.'
  },
  'wayve-vocab-english': {
    title: 'Vocabulario técnico en inglés',
    icon: '🔤', mod: 'wayve',
    tags: ['English', 'Technical terms', 'AV', 'Testing', 'Reliability'],
    hint: 'Glosario de términos que usarás en la entrevista: flaky test, bench, offload, ingest, triage, runbook, SLO, footprint, regression suite. Pronunciación y uso correcto.'
  },
};

// ══════════════════════════════════════════════════════════════════
//  ESTADO
// ══════════════════════════════════════════════════════════════════
let done = JSON.parse(localStorage.getItem('study-done-v2') || '{}');
const TOTAL = Object.keys(T).length;

// ══════════════════════════════════════════════════════════════════
//  INTERACTIVE HELPERS
// ══════════════════════════════════════════════════════════════════
function toggleQuiz(el) {
  el.classList.toggle('open');
  el.nextElementSibling.classList.toggle('open');
}
function switchTab(btn, panelId, groupClass) {
  const container = btn.closest('.tab-group-' + groupClass);
  container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(panelId)?.classList.add('active');
}
