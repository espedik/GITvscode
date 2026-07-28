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
  'py-cheatsheet':    { title: 'Cheat Sheet — Todos los métodos', icon: '📄', mod: 'pycheat', tags: ['Strings', 'Listas', 'Dicts', 'Sets', 'Built-ins', 'Operadores', 'itertools', 'Collections'], hint: 'Referencia rápida de todos los métodos, operaciones y funciones built-in.' },

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
  'istqb-ch1':        { title: 'Ch1 — Fundamentals of Testing', icon: '📖', mod: 'istqb', tags: ['Error-Defect-Failure', '7 Principios', 'Actividades', 'Roles'], hint: '7 principios oficiales: presence of defects, exhaustive testing impossible, early testing, defect clustering, pesticide paradox, context-dependent, absence-of-errors fallacy. Actividades: analysis, design, implementation, execution, completion.' },
  'istqb-ch2':        { title: 'Ch2 — Testing Throughout the SDLC', icon: '📖', mod: 'istqb', tags: ['DevOps', 'Shift-Left', 'Niveles', 'Tipos'], hint: 'Impacto del SDLC en testing. TDD/ATDD/BDD. DevOps y shift-left. 5 niveles de prueba. 4 tipos de prueba. Confirmation vs regression. Maintenance testing.' },
  'istqb-ch3':        { title: 'Ch3 — Static Testing', icon: '📖', mod: 'istqb', tags: ['Review', 'Walkthrough', 'Inspección', 'Roles'], hint: 'Static vs dynamic testing. Proceso de review (ISO/IEC 20246): planning, initiation, individual review, communication, fixing. Roles: manager, author, moderator, scribe, reviewer.' },
  'istqb-ch4':        { title: 'Ch4 — Test Analysis and Design', icon: '📖', mod: 'istqb', tags: ['Equivalence', 'Boundary', 'Decision Table', 'ATDD', 'BDD'], hint: 'Black-box: EP, BVA, decision table, state transition. White-box: statement/branch. Experience-based: error guessing, exploratory, checklist. Collaboration-based: user stories, acceptance criteria, ATDD.' },
  'istqb-ch5':        { title: 'Ch5 — Managing the Test Activities', icon: '📖', mod: 'istqb', tags: ['Test Planning', 'Risk-based', 'Entry/Exit criteria', 'Pyramid'], hint: 'Test planning, estimation (ratios, extrapolación, Delphi, 3-point), priorización. Risk management. Test pyramid y testing quadrants. Monitoring/reporting. Configuration y defect management.' },
  'istqb-ch6':        { title: 'Ch6 — Test Tools', icon: '📖', mod: 'istqb', tags: ['Categorías de herramientas', 'Automatización', 'Beneficios/Riesgos'], hint: 'Categorías de herramientas de soporte a testing. Beneficios y riesgos de la automatización de pruebas.' },
  'istqb-glosario':   { title: 'Glosario ISTQB (Ch1-6)', icon: '📚', mod: 'istqb', tags: ['Verification', 'Validation', 'Coverage', 'Risk'], hint: 'Glosario completo con término, definición y ejemplo, fiel a las keywords oficiales de cada capítulo del syllabus CTFL v4.0.1.' },
  'istqb-examen':     { title: 'Examen de práctica CTFL', icon: '📝', mod: 'istqb', tags: ['K1', 'K2', 'K3', 'Practice exam'], hint: 'Preguntas originales por capítulo, tagueadas con el Learning Objective real y su nivel cognitivo (K1/K2/K3).' },

  // ISTQB CT-GenAI — Testing with Generative AI (syllabus oficial v1.0, 25/07/2025)
  'genai-ch1': { title: 'Ch1 — Introducción a GenAI para Testing', icon: '🤖', mod: 'istqbai', tags: ['AI Spectrum', 'LLM', 'Tokenization', 'Multimodal'], hint: 'Espectro de IA, fundamentos de LLMs (tokenization, embeddings, transformer), Foundation/Instruction-tuned/Reasoning LLMs, capacidades clave para testing.' },
  'genai-ch2': { title: 'Ch2 — Prompt Engineering para Testing', icon: '✍️', mod: 'istqbai', tags: ['6 componentes', 'Few-shot', 'Prompt Chaining', 'Métricas'], hint: 'Estructura de 6 componentes, prompt chaining/few-shot/meta prompting, aplicación a test analysis/design/regresión/monitoreo, métricas de evaluación.' },
  'genai-ch3': { title: 'Ch3 — Gestión de Riesgos de GenAI', icon: '⚠️', mod: 'istqbai', tags: ['Hallucination', 'Data Privacy', 'CO2', 'EU AI Act'], hint: 'Alucinaciones/errores de razonamiento/bias, privacidad y vectores de ataque, impacto ambiental, regulaciones (ISO 42001, EU AI Act, NIST AI RMF).' },
  'genai-ch4': { title: 'Ch4 — Infraestructura de Testing con LLM', icon: '🏗️', mod: 'istqbai', tags: ['RAG', 'Agentes', 'Fine-Tuning', 'LLMOps'], hint: 'Arquitectura front-end/back-end, Retrieval-Augmented Generation, agentes autónomos/semi-autónomos, fine-tuning y LLMOps.' },
  'genai-ch5': { title: 'Ch5 — Despliegue e Integración en Organizaciones', icon: '🗺️', mod: 'istqbai', tags: ['Shadow AI', 'Roadmap', 'Selección LLM', 'Change Management'], hint: 'Riesgos de Shadow AI, estrategia GenAI, selección de LLM/SLM, fases de adopción (Discovery/Initiation/Utilization), gestión del cambio.' },
  'genai-glosario': { title: 'Glosario GenAI (oficial, Apéndice D)', icon: '📚', mod: 'istqbai', tags: ['Token', 'Embedding', 'RAG', 'Prompt'], hint: 'Los 36 términos oficiales del Apéndice D del syllabus, con definición literal y ejemplo aplicado a testing.' },
  'genai-examen': { title: '📝 Examen de práctica', icon: '📝', mod: 'istqbai', tags: ['K1', 'K2', 'K3', 'Práctica'], hint: '19 preguntas de opción múltiple cubriendo los 5 capítulos, basadas en los Learning Objectives reales del syllabus.' },

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

  // ── DISEÑO DE SISTEMAS ──────────────────────────────────────────
  'sysd-framework':     { title: 'Framework — Cómo resolver cualquier problema', icon: '🎯', mod: 'sysdesign', tags: ['Requirements', 'Scale estimation', 'High-level design', 'Trade-offs'], hint: 'Los 5 pasos para abordar cualquier pregunta de system design: clarificar requisitos, estimar escala, diseño de alto nivel, deep dive, trade-offs.' },
  'sysd-escalabilidad': { title: 'Escalabilidad y Rendimiento', icon: '📈', mod: 'sysdesign', tags: ['Vertical vs Horizontal', 'Load Balancer', 'Caching', 'CDN'], hint: 'Escalar vertical vs horizontal, balanceo de carga, caching en capas, CDN para contenido estático.' },
  'sysd-datos':         { title: 'Datos y Almacenamiento', icon: '🗄️', mod: 'sysdesign', tags: ['SQL vs NoSQL', 'Sharding', 'Replicación', 'CAP Theorem'], hint: 'SQL vs NoSQL, particionamiento (sharding), replicación, CAP theorem, índices.' },
  'sysd-comunicacion':  { title: 'Comunicación entre Servicios', icon: '🔗', mod: 'sysdesign', tags: ['REST', 'gRPC', 'Message Queue', 'Pub/Sub'], hint: 'REST vs gRPC vs colas de mensajes, comunicación síncrona vs asíncrona, arquitectura orientada a eventos.' },
  'sysd-confiabilidad': { title: 'Confiabilidad y Tolerancia a Fallos', icon: '🛡️', mod: 'sysdesign', tags: ['Redundancia', 'Failover', 'Circuit Breaker', 'Observabilidad'], hint: 'Redundancia y failover, circuit breakers y rate limiting, monitoreo y observabilidad.' },
  'sysd-ejemplo':       { title: 'Ejemplo resuelto — Telemetría de flota', icon: '🚗', mod: 'sysdesign', tags: ['Caso práctico', 'Telemetría', 'Pipeline', 'Automotriz'], hint: 'Aplicación completa del framework a un caso real: diseñar el sistema de ingesta de telemetría de una flota de vehículos.' },
  'sysd-errores':       { title: 'Errores Comunes y Complicaciones', icon: '⚠️', mod: 'sysdesign', tags: ['SPOF', 'Premature optimization', 'Consistency', 'Bottlenecks'], hint: 'Los errores más frecuentes al diseñar sistemas y en cómo se comunican en la entrevista.' },
  'sysd-practicas':     { title: 'Mejores Prácticas', icon: '✅', mod: 'sysdesign', tags: ['Trade-offs', 'Simplicidad', 'Diseño para fallos'], hint: 'Prácticas que distinguen una buena respuesta de system design en entrevista.' },

  // ── APIs ─────────────────────────────────────────────────────────
  'api-fundamentos': { title: '¿Qué es una API? — Fundamentos', icon: '🌐', mod: 'api', tags: ['Cliente-Servidor', 'Endpoint', 'Request/Response'], hint: 'Qué es una API, analogía del mesero, arquitectura cliente-servidor, tipos de API que existen.' },
  'api-http':        { title: 'HTTP y REST — El lenguaje de las APIs', icon: '📡', mod: 'api', tags: ['GET', 'POST', 'Status Codes', 'REST'], hint: 'Métodos HTTP, códigos de estado, headers, qué hace que una API sea RESTful.' },
  'api-consumir':    { title: 'Cómo consumir una API', icon: '📥', mod: 'api', tags: ['requests', 'JSON', 'Query params', 'Error handling'], hint: 'Usar la librería requests en Python: GET/POST, parámetros, headers, parsear JSON, manejar errores.' },
  'api-construir':   { title: 'Cómo construir tu propia API', icon: '🛠️', mod: 'api', tags: ['Flask', 'FastAPI', 'Endpoints', 'Routing'], hint: 'Construir una API paso a paso con Flask/FastAPI: rutas, modelos de request/response, correr el servidor.' },
  'api-auth':        { title: 'Autenticación y Seguridad', icon: '🔐', mod: 'api', tags: ['API Key', 'OAuth2', 'JWT', 'Rate Limiting'], hint: 'API keys, OAuth2, JWT, rate limiting, HTTPS — cómo proteger una API y cómo autenticarte contra una.' },
  'api-diseno':      { title: 'Diseño de buenas APIs', icon: '📐', mod: 'api', tags: ['Versionado', 'Paginación', 'Idempotencia', 'OpenAPI'], hint: 'Versionado, paginación, idempotencia, códigos de error consistentes, documentación con OpenAPI/Swagger.' },
  'api-errores':     { title: '⚠️ Errores Comunes', icon: '⚠️', mod: 'api', tags: ['Timeouts', 'Retries', 'N+1', 'Breaking changes'], hint: 'Errores frecuentes al consumir y diseñar APIs: no manejar timeouts, breaking changes sin versionar, etc.' },
  'api-practicas':   { title: '✅ Mejores Prácticas', icon: '✅', mod: 'api', tags: ['Retries', 'Backoff', 'Documentación'], hint: 'Prácticas que distinguen una API bien diseñada y un consumo robusto de APIs de terceros.' },

  // ── AI CON API ───────────────────────────────────────────────────
  'ai-fundamentos': { title: '¿Qué es una API de IA? — Cómo funcionan los LLMs', icon: '🤖', mod: 'aiapi', tags: ['LLM', 'Tokens', 'Prompt', 'Completion'], hint: 'Qué es un modelo de lenguaje, cómo se accede vía API, qué son los tokens, prompt vs completion.' },
  'ai-llamar':      { title: 'Cómo llamar a una API de IA', icon: '🔌', mod: 'aiapi', tags: ['Anthropic', 'OpenAI', 'SDK', 'Python'], hint: 'Ejemplo práctico en Python llamando a una API de IA (Anthropic/OpenAI): request, response, parseo.' },
  'ai-prompting':   { title: 'Prompt Engineering', icon: '✍️', mod: 'aiapi', tags: ['System Prompt', 'Few-shot', 'Chain of Thought'], hint: 'Cómo escribir prompts efectivos: system prompt, few-shot examples, structured output.' },
  'ai-avanzado':    { title: 'Function Calling, Streaming y Structured Outputs', icon: '⚙️', mod: 'aiapi', tags: ['Tool use', 'Streaming', 'JSON mode'], hint: 'Cómo un LLM puede invocar funciones/herramientas, respuestas en streaming, salidas estructuradas.' },
  'ai-practicas':   { title: '✅ Costos, Seguridad y Mejores Prácticas', icon: '✅', mod: 'aiapi', tags: ['Costos', 'API Key', 'Rate limits'], hint: 'Cómo se cobran los tokens, cómo proteger tu API key, manejo de límites y errores.' },

  // ── CLAUDE CODE ──────────────────────────────────────────────────
  'cc-que-es':         { title: '¿Qué es Claude Code?', icon: '🧠', mod: 'claudecode', tags: ['Agentic Coding', 'CLI', 'Anthropic'], hint: 'Qué es Claude Code, la filosofía "agentic coding" (actúa directamente sobre tu código y tu terminal) y en qué se diferencia de un autocompletado tipo Copilot.' },
  'cc-instalacion':    { title: 'Instalación y autenticación', icon: '⬇️', mod: 'claudecode', tags: ['npm', 'curl', 'Login', 'API Key'], hint: 'Instalador nativo vs npm, requisitos del sistema, cómo autenticarte (cuenta Claude o API key) y cómo verificar la instalación.' },
  'cc-primeros-pasos': { title: 'Primeros pasos — REPL y atajos', icon: '⌨️', mod: 'claudecode', tags: ['REPL', 'Shift+Tab', 'Atajos', 'Modo interactivo'], hint: 'Cómo se ve una sesión interactiva, atajos de teclado esenciales, y diferencia entre modo interactivo y modo -p (print/no interactivo).' },
  'cc-contexto':       { title: 'Contexto, archivos y @ mentions', icon: '📎', mod: 'claudecode', tags: ['@archivo', 'Contexto', 'Imágenes', '/compact'], hint: 'Cómo referenciar archivos con @, pegar imágenes, y cómo se gestiona la ventana de contexto con /compact y /context.' },
  'cc-permisos':       { title: 'Modos de permisos y seguridad', icon: '🔐', mod: 'claudecode', tags: ['Plan Mode', 'Accept Edits', 'Bypass', 'Sandboxing'], hint: 'Los distintos modos de permiso (default, accept edits, plan, bypass), cuándo usar cada uno y buenas prácticas de seguridad.' },
  'cc-git':            { title: 'Git, GitHub y control de versiones', icon: '🌿', mod: 'claudecode', tags: ['git commit', 'gh pr create', 'Code review'], hint: 'Cómo trabaja Claude Code con git: commits, pull requests, revisión de diffs, y las reglas de seguridad que sigue por defecto ante operaciones destructivas.' },
  'cc-claudemd':       { title: 'CLAUDE.md — Memoria del proyecto', icon: '📄', mod: 'claudecode', tags: ['CLAUDE.md', 'Contexto persistente', '/init'], hint: 'Qué es CLAUDE.md, dónde colocarlo, qué escribir ahí, y cómo /init lo genera automáticamente a partir del código.' },
  'cc-settings':       { title: 'settings.json — Configuración', icon: '⚙️', mod: 'claudecode', tags: ['settings.json', 'permissions', 'env'], hint: 'Jerarquía de settings.json (usuario, proyecto, local), reglas allow/deny, variables de entorno y modelo por defecto.' },
  'cc-slash-skills':   { title: 'Slash Commands y Skills', icon: '⚡', mod: 'claudecode', tags: ['/comandos', 'Skills', 'SKILL.md'], hint: 'Comandos slash nativos más usados y cómo crear Skills personalizadas para flujos de trabajo repetibles del equipo.' },
  'cc-skills-utiles':  { title: 'Skills más útiles — Catálogo curado', icon: '⭐', mod: 'claudecode', tags: ['/code-review', 'dataviz', 'simplify', 'loop', 'schedule'], hint: 'Un recorrido por las skills oficiales más efectivas agrupadas por categoría: calidad de código, diseño/visualización, y automatización — qué hace cada una y cuándo conviene usarla.' },
  'cc-html-diseno':    { title: 'Crear HTML — Diseño y buenas prácticas', icon: '🎨', mod: 'claudecode', tags: ['HTML', 'CSS', 'Diseño', 'Dark Mode', 'Accesibilidad'], hint: 'Cómo pedirle a Claude Code que construya una página o herramienta HTML bien diseñada: color, tipografía, modo claro/oscuro, layout responsivo y checklist de buenas prácticas.' },
  'cc-vscode':         { title: 'Claude Code en Visual Studio Code', icon: '🧩', mod: 'claudecode', tags: ['Extensión', 'VS Code', 'Diffs inline', 'Selección'], hint: 'Instalación de la extensión, diferencias frente al CLI en terminal, selección automática de código, diagnósticos del IDE, atajos de teclado y settings claudeCode.*.' },
  'cc-thinking':       { title: 'Extended Thinking y Deep Research', icon: '💭', mod: 'claudecode', tags: ['Extended Thinking', '/deep-research', 'Razonamiento'], hint: 'Qué es el razonamiento extendido, cuándo activarlo, su impacto en costo y calidad, y el comando /deep-research para investigación web estructurada.' },
  'cc-checkpoints':    { title: 'Checkpoints y Rewind — deshacer con seguridad', icon: '⏪', mod: 'claudecode', tags: ['Esc Esc', 'Rewind', 'Checkpoints'], hint: 'Cómo Claude Code guarda puntos de control automáticos, cómo volver atrás con Esc Esc, y por qué esto no reemplaza a git.' },
  'cc-modelos-effort': { title: 'Modelos y Effort — la herramienta justa', icon: '🎚️', mod: 'claudecode', tags: ['/model', '/effort', 'Fast mode'], hint: 'Cómo elegir modelo y nivel de esfuerzo según la tarea, y cuándo usar fast mode para no pagar de más por trabajo simple.' },
  'cc-paralelo':       { title: 'Trabajo en paralelo — background, fork y batch', icon: '🧵', mod: 'claudecode', tags: ['/background', '/fork', '/batch', '/tasks'], hint: 'Cómo soltar tareas en segundo plano, bifurcar una conversación, y lanzar varias tareas independientes en paralelo con sus propios worktrees.' },
  'cc-seguridad':      { title: 'Seguridad al usar un agente de código', icon: '🛡️', mod: 'claudecode', tags: ['Prompt Injection', 'MCP', 'Secretos'], hint: 'Riesgos reales de un agente con acceso a tu sistema: prompt injection desde contenido externo, supply chain de MCP/skills de terceros, y cómo proteger secretos.' },
  'cc-subagents':      { title: 'Subagents — Delegar tareas', icon: '🤝', mod: 'claudecode', tags: ['Task tool', '.claude/agents', 'Contexto aislado'], hint: 'Qué son los subagents, cómo definirlos en .claude/agents/*.md, y cuándo delegar una tarea en vez de hacerla en el hilo principal.' },
  'cc-hooks':          { title: 'Hooks — Automatización de eventos', icon: '🪝', mod: 'claudecode', tags: ['PreToolUse', 'PostToolUse', 'settings.json'], hint: 'Los eventos de hook disponibles y cómo usarlos para validar, formatear o bloquear acciones automáticamente.' },
  'cc-mcp':            { title: 'MCP — Conectar herramientas externas', icon: '🔌', mod: 'claudecode', tags: ['MCP', 'Model Context Protocol', '.mcp.json'], hint: 'Qué es el Model Context Protocol, cómo agregar servidores MCP, y qué problema resuelve frente a integraciones ad-hoc.' },
  'cc-headless':       { title: 'Modo headless y CI/CD', icon: '🤖', mod: 'claudecode', tags: ['claude -p', 'GitHub Actions', 'JSON output'], hint: 'Cómo usar Claude Code en scripts y pipelines de CI/CD con el modo -p (print), sin interacción humana.' },
  'cc-sdk':            { title: 'Claude Agent SDK', icon: '🧰', mod: 'claudecode', tags: ['Python', 'TypeScript', 'query()'], hint: 'Qué es el Agent SDK, en qué se diferencia del CLI y de la API cruda, y cómo construir tu propio agente programáticamente.' },
  'cc-practicas':      { title: '✅ Mejores prácticas y productividad', icon: '✅', mod: 'claudecode', tags: ['Productividad', 'Seguridad', 'Tips'], hint: 'Hábitos que distinguen un uso experto de Claude Code: cuándo planear, cuándo delegar, y cómo evitar errores costosos.' },

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
    icon: '🔢', mod: 'coding',
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
    icon: '📐', mod: 'coding',
    tags: ['Approach', 'Big O', 'Python tools', 'Pattern recognition', 'Edge cases'],
    hint: 'El framework de 6 pasos para cualquier ejercicio, cómo identificar el patrón correcto, Big O de memoria, Python tools esenciales y edge cases que siempre debes mencionar.'
  },
  'wayve-algo-advanced': {
    title: 'Patrones avanzados — Intervals, DP, Topological Sort',
    icon: '🔥', mod: 'coding',
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
    icon: '💻', mod: 'coding',
    tags: ['Sliding Window', 'Log parsing', 'Anomaly detection', 'MCAP validation'],
    hint: 'Los challenges típicos para este rol: procesar streams de eventos con timestamps, detectar gaps en sensor data, parsear logs de CI, encontrar top-N errores.'
  },
  'wayve-challenges-2': {
    title: 'Coding Challenges — Parte 2 (6 ejercicios)',
    icon: '🔥', mod: 'coding',
    tags: ['Intervals', 'HashMap', 'Priority Queue', 'Circular Buffer', 'Bisect', 'Merge'],
    hint: 'Merge intervals de sesiones, deduplicar eventos, top-K con heap, circular buffer para streams, binary search en timestamps, sync multi-sensor.'
  },
  'wayve-challenges-3': {
    title: 'Coding Challenges — Parte 3 (DP + Grafos)',
    icon: '🧩', mod: 'coding',
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


// ══════════════════════════════════════════════════════════════════
//  TABLAS DE MÉTODOS COMPARTIDAS (fuente única: usadas en Cheat Sheet
//  y en las pestañas "Métodos esenciales" de Fundamentos)
// ══════════════════════════════════════════════════════════════════
const METHOD_TABLES = {
  STR: { header: ["Método","¿Qué hace?","Ejemplo → Resultado","Nota","🚫 No usar cuando"], rows: [
    ["upper()","Todo mayúsculas","<code>texto = 'hello'<br>print(texto.upper())<br># 'HELLO'</code>","No modifica la original","bytes, int, float"],
    ["lower()","Todo minúsculas","<code>texto = 'HELLO'<br>print(texto.lower())<br># 'hello'</code>","","bytes, int, float"],
    ["title()","Primera letra de cada palabra en mayúscula","<code>texto = 'hola mundo'<br>print(texto.title())<br># 'Hola Mundo'</code>","","Apostrofes: \"don't\" → \"Don'T\" (usar regex)"],
    ["capitalize()","Solo primera letra del string","<code>texto = 'hola MUNDO'<br>print(texto.capitalize())<br># 'Hola mundo'</code>","Baja el resto","bytes; no maneja palabras individuales"],
    ["swapcase()","Invierte mayúsculas/minúsculas","<code>texto = 'hOLa'<br>print(texto.swapcase())<br># 'HolA'</code>","","bytes"],
    ["casefold()","Minúsculas agresivo (para comparación)","<code>texto = 'Straße'<br>print(texto.casefold())<br># 'strasse'</code>","Mejor que lower() para unicode","bytes; si solo necesitas lower()"],
    ["strip(chars)","Elimina chars al inicio y al final","<code>texto = '  hi  '<br>print(texto.strip())<br># 'hi'</code><br><br><code>texto2 = 'xxhixx'<br>print(texto2.strip('x'))<br># 'hi'</code>","Default: whitespace","Modificar contenido interior del string"],
    ["lstrip(chars)","Solo al inicio (left)","<code>texto = '  hi  '<br>print(texto.lstrip())<br># 'hi  '</code>","","Eliminar del final → usar rstrip()"],
    ["rstrip(chars)","Solo al final (right)","<code>archivo = 'log.txt'<br>print(archivo.rstrip('.txt'))<br># 'log'</code>","chars es un SET de chars, no secuencia","Eliminar del inicio → usar lstrip(); \"rstrip('.txt')\" elimina cualquier combinación de '.','t','x'"],
    ["split(sep, maxsplit)","Divide en lista por sep","<code>texto = 'a,b,c'<br>print(texto.split(','))<br># ['a', 'b', 'c']</code><br><br><code>texto2 = 'a  b'<br>print(texto2.split())<br># ['a', 'b']</code>","Sin arg: divide por whitespace y elimina vacíos","sep=\"\" → ValueError; patrones regex → usar re.split()"],
    ["rsplit(sep, maxsplit)","Divide desde la derecha","<code>ruta = 'a/b/c'<br>print(ruta.rsplit('/', 1))<br># ['a/b', 'c']</code>","","sep=\"\" → ValueError"],
    ["splitlines()","Divide por saltos de línea","<code>texto = 'a\\nb\\nc'<br>print(texto.splitlines())<br># ['a', 'b', 'c']</code>","Reconoce \\r\\n, \\r, \\n, \\v, \\f","Separadores personalizados → usar split()"],
    ["join(iterable)","Une lista en string con separador","<code>partes = ['a', 'b', 'c']<br>print(','.join(partes))<br># 'a,b,c'</code><br><br><code>palabras = ['hola', 'mundo']<br>print(' '.join(palabras))<br># 'hola mundo'</code>","El string ES el separador","Iterable con no-strings → TypeError; bytes → usar b\"\".join()"],
    ["replace(old, new, count)","Reemplaza ocurrencias","<code>texto = 'aaa'<br>print(texto.replace('a', 'b', 2))<br># 'bba'</code><br><br><code>texto2 = 'hi hi'<br>print(texto2.replace('hi', 'hey'))<br># 'hey hey'</code>","count=máx reemplazos","Patrones complejos/regex → usar re.sub()"],
    ["find(sub, start, end)","Índice primera ocurrencia (-1 si no)","<code>texto = 'hello world'<br>print(texto.find('world'))<br># 6<br>print(texto.find('x'))<br># -1</code>","No lanza error","Necesitas TODAS las posiciones → usar re.finditer()"],
    ["rfind(sub)","Índice ÚLTIMA ocurrencia","<code>texto = 'abab'<br>print(texto.rfind('ab'))<br># 2</code>","","Cuando la primera ocurrencia basta → usar find()"],
    ["index(sub)","Como find pero lanza ValueError","<code>texto = 'hello'<br>print(texto.index('ll'))<br># 2<br># texto.index('x')  # ValueError</code>","","Sub puede NO existir → usar find() que retorna -1"],
    ["rindex(sub)","Última ocurrencia, lanza ValueError","<code>texto = 'abab'<br>print(texto.rindex('ab'))<br># 2</code>","","Sub puede NO existir → usar rfind()"],
    ["count(sub, start, end)","Cuenta ocurrencias sin solaparse","<code>texto = 'banana'<br>print(texto.count('an'))<br># 2</code>","NO solapa: 'aaa'.count('aa')=1, no 2","Patrones solapados → usar re.findall() con lookahead"],
    ["startswith(prefix, start, end)","¿Empieza con prefix?","<code>linea = 'ERROR: x'<br>print(linea.startswith('ERROR'))<br># True<br>print(linea.startswith(('ERR', 'WARN')))<br># True</code>","Acepta tupla de prefijos","bytes sin decodificar → usar b\"\".startswith(b\"...\")"],
    ["endswith(suffix)","¿Termina con suffix?","<code>archivo = 'file.log'<br>print(archivo.endswith(('.log', '.txt')))<br># True</code>","Acepta tupla","bytes sin decodificar → usar b\"\".endswith(b\"...\")"],
    ["center(width, fillchar)","Centra en campo de width","<code>texto = 'hi'<br>print(texto.center(10, '*'))<br># '****hi****'</code>","","width &lt; len(s) → sin efecto, retorna original (no error)"],
    ["ljust(width, fillchar)","Alinea izquierda","<code>texto = 'hi'<br>print(texto.ljust(6, '.'))<br># 'hi....'</code>","","width &lt; len(s) → sin efecto (no error)"],
    ["rjust(width, fillchar)","Alinea derecha","<code>numero = '42'<br>print(numero.rjust(6, '0'))<br># '000042'</code>","","width &lt; len(s) → sin efecto; para números → usar zfill() o f\"{x:06d}\""],
    ["zfill(width)","Rellena con ceros a la izquierda","<code>numero = '42'<br>print(numero.zfill(5))<br># '00042'</code><br><br><code>negativo = '-7'<br>print(negativo.zfill(4))<br># '-007'</code>","Respeta signo: '-42'.zfill(5) → '-0042'","float/int directo → usar f\"{x:05d}\" en su lugar"],
    ["partition(sep)","Divide en 3: (antes, sep, después)","<code>texto = 'user:pass'<br>print(texto.partition(':'))<br># ('user', ':', 'pass')</code>","Solo primera ocurrencia","sep no en string → (original, '', ''); múltiples ocurrencias → usar split()"],
    ["rpartition(sep)","Última ocurrencia","<code>ruta = 'a/b/c'<br>print(ruta.rpartition('/'))<br># ('a/b', '/', 'c')</code>","","sep no en string → ('', '', original)"],
    ["encode(encoding)","String → bytes","<code>texto = 'hola'<br>print(texto.encode('utf-8'))<br># b'hola'</code>","","Char fuera del encoding → UnicodeEncodeError; encoding incorrecto → LookupError"],
    ["format(**kwargs)","Formateo con {}","<code>plantilla = '{name} tiene {age} años'<br>print(plantilla.format(name='Ana', age=25))<br># 'Ana tiene 25 años'</code>","Alternativa a f-strings","Clave/índice no existe → KeyError/IndexError"],
    ["isalpha()","¿Solo letras?","<code>texto = 'abc'<br>print(texto.isalpha())<br># True<br>print('abc1'.isalpha())<br># False</code>","False si hay espacio o número","String vacío → False; dígitos/espacios → False"],
    ["isdigit()","¿Solo dígitos?","<code>texto = '123'<br>print(texto.isdigit())<br># True<br>print('1.5'.isdigit())<br># False</code>","'1.2' → False","Decimales/floats; string vacío → False; usar isnumeric() para fracciones unicode"],
    ["isnumeric()","¿Carácter numérico? (más amplio)","<code>texto = '½'<br>print(texto.isnumeric())<br># True</code>","Incluye fracciones unicode","String vacío → False; '3.14' → False (tiene punto)"],
    ["isalnum()","¿Solo letras y dígitos?","<code>texto = 'abc123'<br>print(texto.isalnum())<br># True</code>","","String vacío → False; espacios/guiones → False"],
    ["isspace()","¿Solo whitespace?","<code>texto = '  \\t\\n'<br>print(texto.isspace())<br># True</code>","","String vacío → False"],
    ["isupper() / islower()","¿Todo mayúsculas/minúsculas?","<code>texto = 'ABC'<br>print(texto.isupper())<br># True</code>","","String sin letras → False; 'A1'.isupper()→True aunque tiene número"],
    ["istitle()","¿Title case?","<code>texto = 'Hello World'<br>print(texto.istitle())<br># True</code>","","'Hello world' → False; \"It's Ok\" → False (s' después de apostrofe se cuenta)"],
    ["expandtabs(tabsize)","Reemplaza \\t por espacios","<code>texto = 'a\\tb'<br>print(texto.expandtabs(4))<br># 'a   b'</code>","Default tabsize=8","Sin \\t en el string (no error, sin efecto útil)"],
    ["maketrans() + translate()","Sustituye caracteres por tabla","<code>tabla = str.maketrans('aeiou', 'AEIOU')<br>texto = 'hola'<br>print(texto.translate(tabla))<br># 'hOlA'</code>","Muy eficiente para múltiples reemplazos","Patrones de más de 1 char → usar replace() o re.sub()"],
  ] },
  LST: { header: ["Método / Op","¿Qué hace?","Ejemplo → Resultado","Complejidad","🚫 No usar cuando"], rows: [
    ["append(x)","Agrega x al final","<code>lst = [1, 2]<br>lst.append(3)<br>print(lst)<br># [1, 2, 3]</code>","O(1) amortizado","Tuples, strings, frozenset (inmutables); sets → usar .add()"],
    ["extend(iterable)","Agrega todos los elementos","<code>lst = [1]<br>lst.extend([2, 3])<br>print(lst)<br># [1, 2, 3]</code><br><br><code>lst2 = ['x']<br>lst2.extend('ab')<br>print(lst2)<br># ['x', 'a', 'b']</code>","O(k)","Tuples/strings (inmutables); agregar UN solo elemento → usar append()"],
    ["insert(i, x)","Inserta x en posición i","<code>lst = [1, 3]<br>lst.insert(1, 2)<br>print(lst)<br># [1, 2, 3]</code>","O(n)","Tuples; insertar al final → append() es O(1) y más rápido"],
    ["remove(x)","Elimina primera ocurrencia de x","<code>lst = [1, 2, 2]<br>lst.remove(2)<br>print(lst)<br># [1, 2]</code>","O(n)","x no existe → ValueError; tuples; hacer \"if x in lst\" antes si dudas"],
    ["pop(i=-1)","Elimina y retorna elemento en i","<code>lst = [1, 2, 3]<br>valor = lst.pop()<br>print(valor, lst)<br># 3 [1, 2]</code><br><br><code>lst2 = [1, 2, 3]<br>print(lst2.pop(0))<br># 1</code>","O(1) final, O(n) otro índice","Lista vacía → IndexError; índice fuera de rango → IndexError"],
    ["del lst[i]","Elimina elemento en i (no retorna)","<code>lst = [1, 2, 3]<br>del lst[0]<br>print(lst)<br># [2, 3]</code>","O(n)","i fuera de rango → IndexError; cuando necesitas el valor → usar pop()"],
    ["del lst[i:j]","Elimina rango","<code>lst = [1, 2, 3, 4]<br>del lst[1:3]<br>print(lst)<br># [1, 4]</code>","O(n)","Tuples; cuando necesitas los elementos eliminados"],
    ["clear()","Vacía la lista","<code>lst = [1, 2, 3]<br>lst.clear()<br>print(lst)<br># []</code>","O(n)","Tuples/strings (inmutables); si necesitas guardar copia primero"],
    ["index(x, start, end)","Índice de primera ocurrencia de x","<code>lst = [10, 20, 30]<br>print(lst.index(20))<br># 1</code>","O(n)","x no existe → ValueError; hacer \"if x in lst\" antes o usar try/except"],
    ["count(x)","Número de ocurrencias de x","<code>lst = [1, 2, 2, 3]<br>print(lst.count(2))<br># 2</code>","O(n)","Contar muchos elementos distintos → usar Counter(); O(n) cada llamada"],
    ["sort(key, reverse)","Ordena in-place (modifica la lista)","<code>lst = [3, 1, 2]<br>lst.sort()<br>print(lst)<br># [1, 2, 3]</code><br><br><code>nums = [3, 1, 2]<br>nums.sort(reverse=True)<br>print(nums)<br># [3, 2, 1]</code>","O(n log n)","Tuples/strings (inmutables); mezcla de tipos no comparables → TypeError"],
    ["sorted(lst, key, reverse)","Nueva lista ordenada (no modifica)","<code>lst = [3, 1, 2]<br>nueva = sorted(lst)<br>print(nueva)<br># [1, 2, 3]<br>print(lst)<br># [3, 1, 2] — sin cambios</code>","O(n log n)","Mezcla de tipos no comparables → TypeError; modifica el original → usar .sort()"],
    ["reverse()","Invierte in-place","<code>lst = [1, 2, 3]<br>lst.reverse()<br>print(lst)<br># [3, 2, 1]</code>","O(n)","Tuples/strings; si necesitas el original intacto → usar [::-1] o reversed()"],
    ["reversed(lst)","Iterator invertido (no modifica)","<code>lst = [1, 2, 3]<br>print(list(reversed(lst)))<br># [3, 2, 1]</code>","O(1) crear, O(n) consumir","Objetos sin __len__ ni __reversed__ → TypeError"],
    ["copy()","Shallow copy","<code>lst = [1, 2, 3]<br>copia = lst.copy()<br>copia.append(4)<br>print(lst)<br># [1, 2, 3]<br>print(copia)<br># [1, 2, 3, 4]</code>","O(n)","Listas ANIDADAS → elementos internos SE COMPARTEN; usar copy.deepcopy()"],
    ["lst[:]","Shallow copy con slice","<code>lst = [1, 2, 3]<br>copia = lst[:]<br>print(copia)<br># [1, 2, 3]</code>","O(n)","Igual que copy(): shallow; listas anidadas comparten referencias internas"],
    ["lst + lst2","Concatena (nueva lista)","<code>a = [1, 2]<br>b = [3, 4]<br>print(a + b)<br># [1, 2, 3, 4]</code>","O(n+m)","Concatenar MUCHAS listas en loop → O(n²); usar extend() o itertools.chain()"],
    ["lst * n","Repite n veces","<code>lst = [0] * 3<br>print(lst)<br># [0, 0, 0]</code>","O(n*k)","n negativo → lista vacía (no error); objetos MUTABLES → todas las copias comparten la misma referencia"],
    ["x in lst","¿Está x en la lista?","<code>lst = [1, 2, 3]<br>print(2 in lst)<br># True</code>","O(n)","Búsquedas frecuentes en lista grande → convertir a set para O(1)"],
    ["len(lst)","Número de elementos","<code>lst = [1, 2, 3]<br>print(len(lst))<br># 3</code>","O(1)","[Siempre seguro]"],
    ["min(lst) / max(lst)","Mínimo / máximo","<code>lst = [3, 1, 2]<br>print(min(lst))<br># 1<br>print(max(lst))<br># 3</code>","O(n)","Lista vacía → ValueError; tipos no comparables → TypeError"],
    ["sum(lst)","Suma de elementos","<code>lst = [1, 2, 3]<br>print(sum(lst))<br># 6</code>","O(n)","Lista de strings → TypeError; usar \"\".join() para strings"],
    ["any(lst) / all(lst)","¿Alguno/todos truthy?","<code>lst = [0, 1, 0]<br>print(any(lst))<br># True<br>print(all(lst))<br># False</code>","O(n), cortocircuito","[Siempre seguro; ojo: all([]) → True (vacío es True por convención)]"],
    ["enumerate(lst, start)","Pares (índice, valor)","<code>lst = ['a', 'b']<br>for i, v in enumerate(lst, 1):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(i, v)<br># 1 a<br># 2 b</code>","O(1) crear","[Siempre seguro para cualquier iterable]"],
    ["zip(lst, lst2)","Pares de dos listas","<code>a = [1, 2]<br>b = ['x', 'y']<br>print(list(zip(a, b)))<br># [(1, 'x'), (2, 'y')]</code>","Se detiene en la más corta","Listas de DIFERENTE longitud → datos perdidos; usar itertools.zip_longest()"],
    ["lst[i] = x","Asigna valor en posición i","<code>lst = [1, 2, 3]<br>lst[0] = 99<br>print(lst)<br># [99, 2, 3]</code>","O(1)","Tuples/strings (inmutables); i fuera de rango → IndexError"],
    ["lst[i:j] = iterable","Reemplaza slice","<code>lst = [1, 2, 3, 4]<br>lst[1:3] = [10, 20, 30]<br>print(lst)<br># [1, 10, 20, 30, 4]</code>","O(n)","Tuples; puede CAMBIAR la longitud de la lista (cuidado al iterar)"],
  ] },
  TUP: { header: ["Operación","¿Qué hace?","Ejemplo → Resultado","Nota"], rows: [
    ["t[i]","Acceso por índice","<code>t = (10, 20, 30)<br>print(t[1])<br># 20</code>","O(1)"],
    ["t[i:j]","Slice (devuelve nueva tupla)","<code>t = (1, 2, 3, 4)<br>print(t[1:3])<br># (2, 3)</code>","O(k)"],
    ["t[-1]","Último elemento","<code>t = (1, 2, 3)<br>print(t[-1])<br># 3</code>",""],
    ["count(x)","Ocurrencias de x","<code>t = (1, 2, 2, 3)<br>print(t.count(2))<br># 2</code>","O(n)"],
    ["index(x, start, end)","Índice primera ocurrencia","<code>t = (10, 20, 30)<br>print(t.index(20))<br># 1</code>","O(n), ValueError si no existe"],
    ["a, b, c = t","Unpacking","<code>t = (1, 2, 3)<br>a, b, c = t<br>print(a, b, c)<br># 1 2 3</code>","Cantidad debe coincidir"],
    ["a, *rest = t","Unpacking con *","<code>t = (1, 2, 3, 4)<br>a, *rest = t<br>print(a, rest)<br># 1 [2, 3, 4]</code>",""],
    ["t1 + t2","Concatena (nueva tupla)","<code>t1 = (1, 2)<br>t2 = (3, 4)<br>print(t1 + t2)<br># (1, 2, 3, 4)</code>","O(n+m)"],
    ["t * n","Repite","<code>t = (1, 2)<br>print(t * 3)<br># (1, 2, 1, 2, 1, 2)</code>","O(n*k)"],
    ["x in t","Membership","<code>t = (1, 2, 3)<br>print(2 in t)<br># True</code>","O(n)"],
    ["len(t)","Longitud","<code>t = (1, 2, 3)<br>print(len(t))<br># 3</code>","O(1)"],
    ["hash(t)","Hash (si todos los elem son hashables)","<code>t = (1, 2, 3)<br>print(hash(t))<br># ej: 529344067295497451</code>","Por eso pueden ser keys de dict"],
    ["min(t) / max(t)","Mínimo / máximo","<code>t = (3, 1, 2)<br>print(min(t))<br># 1</code>","O(n)"],
    ["sorted(t)","Lista ordenada","<code>t = (3, 1, 2)<br>print(sorted(t))<br># [1, 2, 3]</code>","Retorna lista, no tupla"],
    ["tuple(lst)","Convierte lista a tupla","<code>lst = [1, 2, 3]<br>print(tuple(lst))<br># (1, 2, 3)</code>","O(n)"],
    ["from collections import namedtuple","Tupla con nombres","<code>from collections import namedtuple<br>Point = namedtuple('Point', ['x', 'y'])<br>p = Point(1, 2)<br>print(p.x)<br># 1</code>","Legibilidad"],
  ] },
  DCT: { header: ["Método / Op","¿Qué hace?","Ejemplo → Resultado","Nota"], rows: [
    ["d[key]","Obtener valor por clave","<code>d = {'a': 1, 'b': 2}<br>print(d['a'])<br># 1</code>","KeyError si no existe"],
    ["d.get(key, default)","Obtener con default seguro","<code>d = {'a': 1}<br>print(d.get('z', 0))<br># 0</code>","No lanza KeyError"],
    ["d[key] = value","Insertar / actualizar","<code>d = {'a': 1, 'b': 2}<br>d['c'] = 3<br>print(d)<br># {'a': 1, 'b': 2, 'c': 3}</code>","O(1) amortizado"],
    ["d.setdefault(key, default)","Inserta default si key no existe; retorna valor","<code>d = {}<br>d.setdefault('x', []).append(1)<br>print(d)<br># {'x': [1]}</code>","Útil para inicializar"],
    ["d.update(d2)","Merge in-place (d2 gana en conflicto)","<code>d = {'a': 1}<br>d.update({'a': 99, 'b': 2})<br>print(d)<br># {'a': 99, 'b': 2}</code>","También acepta kwargs"],
    ["d | d2","Merge (Python 3.9+, nueva dict)","<code>d1 = {'a': 1}<br>d2 = {'b': 2}<br>print(d1 | d2)<br># {'a': 1, 'b': 2}</code>","d2 gana en conflicto"],
    ["d |= d2","Merge in-place","<code>d = {'a': 1}<br>d |= {'new': 99}<br>print(d)<br># {'a': 1, 'new': 99}</code>",""],
    ["d.pop(key, default)","Elimina y retorna valor","<code>d = {'a': 1, 'b': 2}<br>valor = d.pop('a')<br>print(valor, d)<br># 1 {'b': 2}</code>","KeyError sin default si no existe"],
    ["d.popitem()","Elimina y retorna último (key,val)","<code>d = {'a': 1, 'b': 2, 'c': 3}<br>print(d.popitem())<br># ('c', 3)</code>","LIFO desde Python 3.7"],
    ["del d[key]","Elimina clave","<code>d = {'a': 1, 'b': 2}<br>del d['a']<br>print(d)<br># {'b': 2}</code>","KeyError si no existe"],
    ["d.clear()","Vacía el diccionario","<code>d = {'a': 1, 'b': 2}<br>d.clear()<br>print(d)<br># {}</code>",""],
    ["d.keys()","Vista de claves","<code>d = {'a': 1, 'b': 2}<br>print(d.keys())<br># dict_keys(['a', 'b'])</code>","Vista dinámica, no copia"],
    ["d.values()","Vista de valores","<code>d = {'a': 1, 'b': 2}<br>print(d.values())<br># dict_values([1, 2])</code>","Vista dinámica"],
    ["d.items()","Vista de pares (key,val)","<code>d = {'a': 1, 'b': 2}<br>for k, v in d.items():<br>&nbsp;&nbsp;&nbsp;&nbsp;print(k, v)<br># a 1<br># b 2</code>","Usar siempre en for"],
    ["d.copy()","Shallow copy","<code>d = {'a': 1}<br>d2 = d.copy()<br>print(d2)<br># {'a': 1}</code>","O(n)"],
    ["key in d","¿Existe la clave?","<code>d = {'a': 1}<br>print('a' in d)<br># True</code>","O(1) — busca en keys"],
    ["key not in d","¿No existe?","<code>d = {'a': 1}<br>print('z' not in d)<br># True</code>",""],
    ["len(d)","Número de pares","<code>d = {'a': 1, 'b': 2}<br>print(len(d))<br># 2</code>","O(1)"],
    ["dict.fromkeys(keys, val)","Nuevo dict con claves dadas y val como default","<code>claves = ['a', 'b']<br>d = dict.fromkeys(claves, 0)<br>print(d)<br># {'a': 0, 'b': 0}</code>","Cuidado: mismo objeto para todos"],
  ] },
  SET: { header: ["Método / Op","¿Qué hace?","Ejemplo","Alias"], rows: [
    ["add(x)","Agrega x","<code>s = {1, 2, 3}<br>s.add(5)<br>print(s)<br># {1, 2, 3, 5}</code>",""],
    ["update(iterable)","Agrega múltiples","<code>s = {1, 2, 3}<br>s.update([4, 5, 6])<br>print(s)<br># {1, 2, 3, 4, 5, 6}</code>","s |= {4,5}"],
    ["remove(x)","Elimina x — KeyError si no existe","<code>s = {1, 2, 3}<br>s.remove(3)<br>print(s)<br># {1, 2}</code>",""],
    ["discard(x)","Elimina x — sin error si no existe","<code>s = {1, 2, 3}<br>s.discard(99)<br>print(s)<br># {1, 2, 3} — sin error</code>","Más seguro que remove"],
    ["pop()","Elimina y retorna un elemento arbitrario","<code>s = {1, 2, 3}<br>elemento = s.pop()<br>print(elemento)<br># ej: 1 (orden no garantizado)</code>",""],
    ["clear()","Vacía el set","<code>s = {1, 2, 3}<br>s.clear()<br>print(s)<br># set()</code>",""],
    ["s | s2","Unión: todos los elementos de ambos","<code>s1 = {1, 2}<br>s2 = {2, 3}<br>print(s1 | s2)<br># {1, 2, 3}</code>","s.union(s2)"],
    ["s & s2","Intersección: solo los comunes","<code>s1 = {1, 2}<br>s2 = {2, 3}<br>print(s1 & s2)<br># {2}</code>","s.intersection(s2)"],
    ["s - s2","Diferencia: en s pero no en s2","<code>s1 = {1, 2, 3}<br>s2 = {2, 3}<br>print(s1 - s2)<br># {1}</code>","s.difference(s2)"],
    ["s ^ s2","Diferencia simétrica: en uno pero no en ambos","<code>s1 = {1, 2}<br>s2 = {2, 3}<br>print(s1 ^ s2)<br># {1, 3}</code>","s.symmetric_difference(s2)"],
    ["s <= s2","¿s es subconjunto de s2?","<code>s1 = {1, 2}<br>s2 = {1, 2, 3}<br>print(s1 <= s2)<br># True</code>","s.issubset(s2)"],
    ["s >= s2","¿s es superconjunto?","<code>s1 = {1, 2, 3}<br>s2 = {1, 2}<br>print(s1 >= s2)<br># True</code>","s.issuperset(s2)"],
    ["s < s2","Subconjunto propio (s != s2)","<code>s1 = {1}<br>s2 = {1, 2}<br>print(s1 < s2)<br># True</code>",""],
    ["s.isdisjoint(s2)","¿No tienen elementos comunes?","<code>s1 = {1, 2}<br>s2 = {3, 4}<br>print(s1.isdisjoint(s2))<br># True</code>",""],
    ["s |= s2","Unión in-place","<code>s = {1, 2}<br>s |= {5, 6}<br>print(s)<br># {1, 2, 5, 6}</code>","s.update(s2)"],
    ["s &= s2","Intersección in-place","<code>s = {1, 2, 3}<br>s &= {1, 2}<br>print(s)<br># {1, 2}</code>","s.intersection_update(s2)"],
    ["s -= s2","Diferencia in-place","<code>s = {1, 2, 3}<br>s -= {3}<br>print(s)<br># {1, 2}</code>","s.difference_update(s2)"],
    ["x in s","Membership O(1)","<code>s = {1, 2, 3, 5}<br>print(5 in s)<br># True</code>","Mucho más rápido que lista"],
    ["len(s)","Número de elementos","<code>s = {1, 2, 3}<br>print(len(s))<br># 3</code>","O(1)"],
    ["frozenset(s)","Versión inmutable y hashable","<code>s = {1, 2}<br>fs = frozenset(s)<br>print(fs)<br># frozenset({1, 2})</code>","Puede ser key de dict"],
  ] },
};

function renderMethodTable(key) {
  const t = METHOD_TABLES[key];
  if (!t) return '';
  let html = '<table class="kv-table">\n<tr>' + t.header.map(h => '<th>' + h + '</th>').join('') + '</tr>\n';
  for (const row of t.rows) html += '<tr>' + row.map(c => '<td>' + c + '</td>').join('') + '</tr>\n';
  html += '</table>';
  return html;
}
