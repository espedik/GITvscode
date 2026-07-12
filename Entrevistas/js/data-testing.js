
// ══════════════════════════════════════════════════════════════════
//  TESTING_RICH — Unittest, pytest, coverage
// ══════════════════════════════════════════════════════════════════
const TESTING_RICH = {

'ut-intro': `
<div class="tab-group-uti">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'uti-1','uti')">Estructura básica</button>
    <button class="tab-btn" onclick="switchTab(this,'uti-2','uti')">Ejecutar tests (CLI)</button>
    <button class="tab-btn" onclick="switchTab(this,'uti-3','uti')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'uti-4','uti')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'uti-5','uti')">Quiz</button>
  </div>
  <div id="uti-1" class="tab-panel active">
<div class="concept-intro"><strong>unittest</strong> es el framework de testing incluido en la librería estándar de Python (inspirado en JUnit). No requiere instalar nada. Se organiza alrededor de cuatro conceptos: una <strong>TestCase</strong> (clase que agrupa tests relacionados), métodos <code>test_*</code> (cada uno un caso de prueba independiente), un <strong>TestLoader/discover</strong> (que encuentra los tests automáticamente) y un <strong>TestRunner</strong> (que los ejecuta y reporta resultados). En un entorno de bench/HIL automotriz, unittest es lo que corre en CI cada vez que se sube código nuevo del stack de diagnóstico, drivers CAN, o lógica de control.</div>
<table class="kv-table">
<tr><th>Concepto</th><th>Qué es</th><th>Ejemplo</th></tr>
<tr><td>TestCase</td><td>Clase base que agrupa tests relacionados y provee los asserts</td><td>class TestCalculadora(unittest.TestCase)</td></tr>
<tr><td>test_*</td><td>Método que unittest reconoce automáticamente como caso de prueba</td><td>def test_suma_positivos(self)</td></tr>
<tr><td>TestSuite</td><td>Colección de tests o TestCases agrupados para ejecutarse juntos</td><td>suite = unittest.TestSuite()</td></tr>
<tr><td>TestLoader</td><td>Descubre y carga tests automáticamente desde archivos</td><td>unittest.TestLoader().discover('.')</td></tr>
<tr><td>TestRunner</td><td>Ejecuta los tests cargados y produce el reporte final</td><td>unittest.TextTestRunner().run(suite)</td></tr>
<tr><td>assertion</td><td>Método que verifica una condición; si falla, marca el test como FAILED</td><td>self.assertEqual(resultado, 5)</td></tr>
<tr><td>fixture</td><td>Estado preparado antes o limpiado después de un test</td><td>self.bench = Bench() en setUp()</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — Unittest básico completo</div><pre>
<span class="c-kw">import</span> unittest

<span class="c-kw">class</span> <span class="c-fn">TestCalculadora</span>(unittest.TestCase):

    <span class="c-kw">def</span> <span class="c-fn">setUp</span>(<span class="c-bi">self</span>):
        <span class="c-cm"># Se ejecuta antes de CADA test_* de esta clase</span>
        <span class="c-bi">self</span>.calc = Calculadora()

    <span class="c-kw">def</span> <span class="c-fn">test_suma_positivos</span>(<span class="c-bi">self</span>):
        resultado = <span class="c-bi">self</span>.calc.suma(<span class="c-nb">2</span>, <span class="c-nb">3</span>)
        <span class="c-bi">self</span>.assertEqual(resultado, <span class="c-nb">5</span>)

    <span class="c-kw">def</span> <span class="c-fn">test_division_por_cero</span>(<span class="c-bi">self</span>):
        <span class="c-kw">with</span> <span class="c-bi">self</span>.assertRaises(ZeroDivisionError):
            <span class="c-bi">self</span>.calc.dividir(<span class="c-nb">10</span>, <span class="c-nb">0</span>)

<span class="c-kw">if</span> __name__ == <span class="c-st">'__main__'</span>:
    unittest.main(verbosity=<span class="c-nb">2</span>)</pre></div>
<div class="concept-intro">Cada método que empieza con <code>test_</code> es descubierto y ejecutado como caso independiente (el orden de ejecución NO está garantizado, unittest los ordena alfabéticamente por defecto). <code>unittest.TestCase</code> provee todos los asserts y el lifecycle (<code>setUp</code>/<code>tearDown</code>). <code>unittest.main()</code> descubre y ejecuta todos los <code>test_*</code> de la clase cuando el archivo se corre directamente.</div>
  </div>
  <div id="uti-2" class="tab-panel">
<div class="concept-intro">unittest se ejecuta casi siempre vía la línea de comandos con <code>python -m unittest</code>. Esto es clave en CI/CD: el pipeline de bench típico corre <code>python -m unittest discover</code> sobre toda la suite antes de permitir un merge, y usa <code>-v</code> para dejar logs legibles cuando algo falla en un runner remoto.</div>
<table class="kv-table">
<tr><th>Comando</th><th>Qué hace</th><th>Nota</th></tr>
<tr><td>python -m unittest test_modulo</td><td>Ejecuta todos los tests de un módulo</td><td>Importa el módulo automáticamente</td></tr>
<tr><td>python -m unittest test_modulo.TestClase</td><td>Ejecuta solo una clase de test</td><td>Útil para depurar un caso puntual</td></tr>
<tr><td>python -m unittest test_modulo.TestClase.test_metodo</td><td>Ejecuta un único test</td><td>El más rápido para iterar en un fallo</td></tr>
<tr><td>python -m unittest discover</td><td>Descubre y ejecuta todos los test_*.py del directorio</td><td>Busca recursivamente desde el cwd</td></tr>
<tr><td>python -m unittest discover -s tests -p "test_*.py"</td><td>Descubre en una carpeta específica con patrón custom</td><td>-s = start dir, -p = pattern</td></tr>
<tr><td>python -m unittest -v</td><td>Verbosity 2 — muestra cada test con su nombre y resultado</td><td>Estándar en logs de CI</td></tr>
<tr><td>python -m unittest -k patron</td><td>Filtra y ejecuta solo tests cuyo nombre contiene "patron"</td><td>Disponible desde Python 3.7</td></tr>
<tr><td>python -m unittest --failfast</td><td>Detiene la ejecución en el primer test que falla</td><td>Útil para debug rápido, no para CI final</td></tr>
</table>
<div class="code-block"><div class="code-lang">Terminal — Ejemplos de ejecución en CI</div><pre>
<span class="c-cm"># Correr toda la suite de tests de comunicación CAN</span>
python -m unittest discover -s tests/can -p "test_*.py" -v

<span class="c-cm"># Correr solo un test puntual mientras se depura un fallo en HIL</span>
python -m unittest tests.test_diagnostics.TestUDSSession.test_negative_response

<span class="c-cm"># Filtrar por nombre parcial — todos los tests de timeout</span>
python -m unittest discover -k timeout -v

<span class="c-cm"># Detener en el primer fallo, útil en un loop de debug local</span>
python -m unittest discover --failfast</pre></div>
<div class="alert-card">unittest también puede correrse llamando directamente al archivo (<code>python test_calculadora.py</code>) si termina en <code>unittest.main()</code>, pero <code>python -m unittest</code> es preferible porque configura correctamente el <code>sys.path</code> y funciona igual sin importar desde qué directorio se invoque.</div>
  </div>
  <div id="uti-3" class="tab-panel">
<div class="concept-intro">Estos son los errores más comunes al empezar con unittest — casi todos causan que un test "desaparezca" silenciosamente (nunca se ejecuta) en vez de fallar con un mensaje claro, lo cual es más peligroso que un fallo explícito.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">prueba_suma</span>(<span class="c-bi">self</span>):
    <span class="c-bi">self</span>.assertEqual(<span class="c-bi">self</span>.calc.suma(<span class="c-nb">2</span>, <span class="c-nb">3</span>), <span class="c-nb">5</span>)
<span class="c-cm"># unittest NUNCA ejecuta este método</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_suma</span>(<span class="c-bi">self</span>):
    <span class="c-bi">self</span>.assertEqual(<span class="c-bi">self</span>.calc.suma(<span class="c-nb">2</span>, <span class="c-nb">3</span>), <span class="c-nb">5</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> el TestLoader descubre casos de prueba únicamente por el prefijo exacto <code>test_</code> (configurable pero casi nadie lo cambia). Un método <code>prueba_suma</code> o <code>test</code> (sin guion bajo) es simplemente un método normal de la clase: no aparece en el reporte, no falla, no existe para el runner. No hay warning — el test simplemente no corre nunca.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">class</span> <span class="c-fn">TestCalculadora</span>:  <span class="c-cm"># no hereda de TestCase</span>
    <span class="c-kw">def</span> <span class="c-fn">test_suma</span>(<span class="c-bi">self</span>):
        <span class="c-kw">assert</span> Calculadora().suma(<span class="c-nb">2</span>, <span class="c-nb">3</span>) == <span class="c-nb">5</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">class</span> <span class="c-fn">TestCalculadora</span>(unittest.TestCase):
    <span class="c-kw">def</span> <span class="c-fn">test_suma</span>(<span class="c-bi">self</span>):
        <span class="c-bi">self</span>.assertEqual(Calculadora().suma(<span class="c-nb">2</span>, <span class="c-nb">3</span>), <span class="c-nb">5</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> el TestLoader busca subclases de <code>unittest.TestCase</code> dentro del módulo. Una clase que no hereda de <code>TestCase</code> no es reconocida como contenedor de tests, sin importar que sus métodos empiecen con <code>test_</code>. Además, sin heredar de TestCase no tienes acceso a <code>self.assertEqual</code>, <code>self.assertRaises</code>, ni al lifecycle de setUp/tearDown.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_division</span>(<span class="c-bi">self</span>):
    resultado = <span class="c-bi">self</span>.calc.dividir(<span class="c-nb">10</span>, <span class="c-nb">2</span>)
    <span class="c-kw">assert</span> resultado == <span class="c-nb">5</span>  <span class="c-cm"># assert genérico de Python</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_division</span>(<span class="c-bi">self</span>):
    resultado = <span class="c-bi">self</span>.calc.dividir(<span class="c-nb">10</span>, <span class="c-nb">2</span>)
    <span class="c-bi">self</span>.assertEqual(resultado, <span class="c-nb">5</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> el <code>assert</code> nativo de Python funciona, pero da un mensaje de error genérico ("AssertionError" sin contexto) y se elimina por completo si Python corre con la optimización <code>-O</code>. Los métodos <code>self.assertX</code> de unittest generan mensajes de diff detallados (útil sobre todo en <code>assertListEqual</code>/<code>assertDictEqual</code>) y nunca se desactivan.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_lectura_sensor</span>():  <span class="c-cm"># falta 'self'</span>
    <span class="c-bi">self</span>.assertTrue(<span class="c-kw">True</span>)</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_lectura_sensor</span>(<span class="c-bi">self</span>):
    <span class="c-bi">self</span>.assertTrue(<span class="c-kw">True</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> los métodos de test son métodos de instancia normales; olvidar <code>self</code> como primer parámetro produce un <code>TypeError</code> al invocarlos (el runner los llama como <code>instancia.test_lectura_sensor()</code>, que en realidad pasa la instancia implícitamente). El error aparece como fallo de test, no como error de sintaxis, lo cual puede confundir al depurar.</div>
  </div>
  <div id="uti-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Un archivo de test por módulo bajo prueba, con prefijo test_</div>
  <p>Si tu código vive en <code>can_driver.py</code>, el test vive en <code>test_can_driver.py</code>. Facilita que <code>discover</code> lo encuentre y que cualquiera sepa dónde buscar los tests de un módulo dado.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Nombres de test descriptivos: qué se prueba + condición + resultado esperado</div>
  <p><code>test_dividir_por_cero_lanza_zerodivisionerror</code> dice más que <code>test_dividir_2</code>. Cuando un test falla en CI, el nombre solo ya debería darte una idea de qué se rompió sin abrir el código.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa discover en CI, no listas de archivos hardcodeadas</div>
  <p><code>python -m unittest discover</code> encuentra automáticamente los tests nuevos sin tener que actualizar un pipeline cada vez que se agrega un archivo <code>test_*.py</code>.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Mantén los tests independientes entre sí</div>
  <p>Un test nunca debe depender de que otro test se haya ejecutado antes (ni de su orden). unittest no garantiza orden secuencial fijo entre archivos/discover; si <code>test_b</code> asume estado dejado por <code>test_a</code>, tienes un bug esperando a pasar.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa verbosity=2 (-v) en pipelines de CI</div>
  <p>Con verbosity alto, cada test imprime su nombre y resultado (ok/FAIL/ERROR) en el log. En un fallo remoto en un runner de bench, ese log detallado es la diferencia entre depurar en minutos o re-ejecutar a ciegas.</p>
</div>
  </div>
  <div id="uti-5" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Tienes <code>def testSuma(self):</code> (sin guion bajo) dentro de una TestCase. ¿Se ejecuta?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Sí.</b> El TestLoader reconoce cualquier método que empiece literalmente con las letras <code>test</code>, no requiere guion bajo. <code>testSuma</code>, <code>test_suma</code> y <code>testsuma</code> son todos descubiertos. Lo que NO se descubre es algo como <code>prueba_suma</code> o <code>verifica_suma</code>, que no empieza con "test".</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿En qué orden ejecuta unittest los métodos test_* dentro de una clase?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Orden alfabético por nombre</b>, no el orden en que están escritos en el archivo. Por eso los tests deben ser independientes entre sí — si asumes que <code>test_a_crear</code> corre antes que <code>test_b_usar</code> confiando en que "a" va antes que "b" en el código, en realidad es la alfabetización del nombre la que garantiza ese orden, no la posición en el archivo.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>¿Cuál es la diferencia entre <code>python -m unittest</code> y <code>python test_archivo.py</code>?<span class="q-arr">▶</span></div><div class="quiz-a"><b>python -m unittest</b> ejecuta el módulo unittest con el path del proyecto correctamente configurado en sys.path, funcionando igual sin importar el directorio de invocación, y soporta discover/-k/-v de forma uniforme. <code>python test_archivo.py</code> depende de que el archivo termine en <code>unittest.main()</code> y de que los imports relativos funcionen desde ese directorio — más frágil en CI.</div></div>
</div>
  </div>
</div>`,

'ut-estructura': `
<div class="tab-group-ute">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ute-1','ute')">Anatomía de un TestCase</button>
    <button class="tab-btn" onclick="switchTab(this,'ute-2','ute')">Naming y organización</button>
    <button class="tab-btn" onclick="switchTab(this,'ute-3','ute')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'ute-4','ute')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'ute-5','ute')">Quiz</button>
  </div>
  <div id="ute-1" class="tab-panel active">
<div class="concept-intro">El patrón <strong>AAA (Arrange / Act / Assert)</strong> es la estructura más clara para escribir el cuerpo de un test: primero preparas todo lo necesario, luego ejecutas la única acción bajo prueba, y al final verificas el resultado. Separar visualmente estas tres fases (con comentarios o líneas en blanco) hace que cualquiera pueda leer el test de arriba a abajo sin tener que rastrear qué es setup y qué es la verificación real.</div>
<table class="kv-table">
<tr><th>Fase</th><th>Qué contiene</th><th>Regla</th></tr>
<tr><td>Arrange</td><td>Crear objetos, mocks, datos de entrada, estado inicial</td><td>Puede ser varias líneas; si crece mucho, muévelo a setUp()</td></tr>
<tr><td>Act</td><td>Una sola llamada a la función/método bajo prueba</td><td>Idealmente UNA línea — si son varias, el test prueba demasiado</td></tr>
<tr><td>Assert</td><td>Una o más verificaciones sobre el resultado del Act</td><td>Pueden ser varios asserts si verifican la MISMA cosa desde ángulos distintos</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — Patrón AAA</div><pre>
<span class="c-kw">def</span> <span class="c-fn">test_velocidad_promedio</span>(<span class="c-bi">self</span>):
    <span class="c-cm"># ARRANGE — preparar datos y dependencias</span>
    sensor = VelocitySensor()
    lecturas = [<span class="c-nb">60.0</span>, <span class="c-nb">80.0</span>, <span class="c-nb">70.0</span>]

    <span class="c-cm"># ACT — ejecutar la función bajo prueba</span>
    promedio = sensor.calcular_promedio(lecturas)

    <span class="c-cm"># ASSERT — verificar el resultado</span>
    <span class="c-bi">self</span>.assertAlmostEqual(promedio, <span class="c-nb">70.0</span>, places=<span class="c-nb">1</span>)</pre></div>
<div class="concept-intro"><b>Regla clave:</b> un test = una responsabilidad. Si necesitas poner "y" en el nombre del test (<code>test_suma_y_guarda_y_notifica</code>), es una señal de que estás probando tres comportamientos distintos en un solo test — divídelo en tres tests independientes. Así, cuando uno falla, el nombre del test que falló te dice exactamente qué se rompió.</div>
<div class="code-block"><div class="code-lang">Python — Test anatomy completa con docstring</div><pre>
<span class="c-kw">class</span> <span class="c-fn">TestUDSSession</span>(unittest.TestCase):
    <span class="c-st">"""Tests del manejo de sesión de diagnóstico UDS (ISO 14229)."""</span>

    <span class="c-kw">def</span> <span class="c-fn">test_cambio_a_sesion_extendida_responde_positivo</span>(<span class="c-bi">self</span>):
        <span class="c-st">"""DiagnosticSessionControl(0x03) debe responder 0x50 0x03."""</span>
        <span class="c-cm"># Arrange</span>
        session = UDSSession(ecu_addr=<span class="c-nb">0x7E0</span>)

        <span class="c-cm"># Act</span>
        respuesta = session.request_session(<span class="c-nb">0x03</span>)

        <span class="c-cm"># Assert</span>
        <span class="c-bi">self</span>.assertEqual(respuesta.service_id, <span class="c-nb">0x50</span>)
        <span class="c-bi">self</span>.assertEqual(respuesta.sub_function, <span class="c-nb">0x03</span>)</pre></div>
  </div>
  <div id="ute-2" class="tab-panel">
<div class="concept-intro">Además de la estructura interna de cada test, la <strong>organización del proyecto</strong> importa: nombres de archivo, nombres de clase y nombres de método siguen convenciones que hacen que <code>discover</code> los encuentre y que el equipo navegue la suite sin fricción.</div>
<table class="kv-table">
<tr><th>Elemento</th><th>Convención</th><th>Ejemplo</th></tr>
<tr><td>Archivo de test</td><td>test_&lt;módulo&gt;.py — el prefijo test_ es obligatorio para discover</td><td>test_can_driver.py para can_driver.py</td></tr>
<tr><td>Clase de test</td><td>Test&lt;UnidadBajoPrueba&gt; en PascalCase</td><td>class TestCANDriver(unittest.TestCase)</td></tr>
<tr><td>Método de test</td><td>test_&lt;qué&gt;_&lt;condición&gt;_&lt;esperado&gt; en snake_case</td><td>test_send_frame_bus_off_lanza_canerror</td></tr>
<tr><td>Carpeta de tests</td><td>tests/ en la raíz, espejando la estructura de src/</td><td>src/diag/uds.py → tests/diag/test_uds.py</td></tr>
<tr><td>__init__.py en tests/</td><td>Necesario si usas paquetes para que discover importe correctamente</td><td>tests/__init__.py, tests/diag/__init__.py</td></tr>
<tr><td>Agrupar por escenario</td><td>Una TestCase por "unidad de comportamiento", no una gigante para todo el módulo</td><td>TestUDSSessionPositiva / TestUDSSessionNegativa</td></tr>
</table>
<div class="code-block"><div class="code-lang">Estructura de carpetas — proyecto de bench</div><pre>
<span class="c-cm">mi_proyecto/</span>
<span class="c-cm">├── src/</span>
<span class="c-cm">│   ├── can_driver.py</span>
<span class="c-cm">│   └── diag/</span>
<span class="c-cm">│       └── uds.py</span>
<span class="c-cm">└── tests/</span>
<span class="c-cm">    ├── __init__.py</span>
<span class="c-cm">    ├── test_can_driver.py       # espeja src/can_driver.py</span>
<span class="c-cm">    └── diag/</span>
<span class="c-cm">        ├── __init__.py</span>
<span class="c-cm">        └── test_uds.py           # espeja src/diag/uds.py</span></pre></div>
<div class="concept-intro">Agrupar tests relacionados en <em>varias</em> TestCase pequeñas (por escenario o condición) en vez de una sola TestCase gigante con 40 métodos hace que los reportes de fallo sean más legibles: <code>TestUDSSessionNegativa.test_ecu_no_responde_timeout FAILED</code> comunica más de un vistazo que <code>TestUDS.test_15 FAILED</code>.</div>
  </div>
  <div id="ute-3" class="tab-panel">
<div class="concept-intro">Errores de estructura y naming no rompen la ejecución (el código corre), pero degradan silenciosamente el valor de la suite: tests que no se entienden, que prueban demasiado, o que no se descubren.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_1</span>(<span class="c-bi">self</span>):
    resultado = procesar_trama(<span class="c-st">b'\x03\x22\xF1\x90'</span>)
    <span class="c-bi">self</span>.assertEqual(resultado.status, <span class="c-st">'OK'</span>)</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_procesar_trama_read_data_by_id_status_ok</span>(<span class="c-bi">self</span>):
    resultado = procesar_trama(<span class="c-st">b'\x03\x22\xF1\x90'</span>)
    <span class="c-bi">self</span>.assertEqual(resultado.status, <span class="c-st">'OK'</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> nombres genéricos como <code>test_1</code>, <code>test_ok</code> o <code>test_caso2</code> obligan a abrir el código del test para saber qué falló cada vez que aparece en un reporte de CI. Con decenas o cientos de tests, esto se vuelve un cuello de botella real al depurar un pipeline roto a las 2am.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_envio_trama_y_espera_respuesta_y_valida_checksum</span>(<span class="c-bi">self</span>):
    <span class="c-bi">self</span>.driver.send(trama)
    respuesta = <span class="c-bi">self</span>.driver.wait_response(timeout=<span class="c-nb">1.0</span>)
    <span class="c-bi">self</span>.assertIsNotNone(respuesta)
    <span class="c-bi">self</span>.assertTrue(validar_checksum(respuesta))</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_wait_response_retorna_no_none</span>(<span class="c-bi">self</span>):
    <span class="c-bi">self</span>.driver.send(trama)
    respuesta = <span class="c-bi">self</span>.driver.wait_response(timeout=<span class="c-nb">1.0</span>)
    <span class="c-bi">self</span>.assertIsNotNone(respuesta)

<span class="c-kw">def</span> <span class="c-fn">test_respuesta_tiene_checksum_valido</span>(<span class="c-bi">self</span>):
    respuesta = enviar_y_recibir(trama)
    <span class="c-bi">self</span>.assertTrue(validar_checksum(respuesta))</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> un test con "y" en el nombre casi siempre está verificando varios comportamientos distintos en un solo método. Si el checksum falla, el reporte solo dice que el test gigante falló — no distingue si el problema fue el envío, el timeout, o el checksum. Tests separados aíslan la causa exacta del fallo en el nombre mismo.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-cm"># archivo: uds_tests.py</span>
<span class="c-kw">class</span> <span class="c-fn">Tests</span>(unittest.TestCase):
    ...</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-cm"># archivo: test_uds.py</span>
<span class="c-kw">class</span> <span class="c-fn">TestUDSSession</span>(unittest.TestCase):
    ...</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>discover</code> por defecto solo busca archivos que hacen match con el patrón <code>test*.py</code>. Un archivo llamado <code>uds_tests.py</code> (sufijo en vez de prefijo) queda completamente invisible para <code>python -m unittest discover</code> sin configuración adicional — los tests existen pero nunca corren en CI.</div>
  </div>
  <div id="ute-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Un test, una responsabilidad, un motivo de fallo posible</div>
  <p>Si el nombre necesita "y" para describirlo, sepáralo. Cuando falla en CI, quieres que el nombre del test solo ya te diga qué se rompió sin abrir el código.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Nombra con la fórmula qué + condición + esperado</div>
  <p><code>test_&lt;acción&gt;_&lt;condición&gt;_&lt;resultado&gt;</code>, por ejemplo <code>test_dividir_por_cero_lanza_zerodivisionerror</code>. Evita <code>test_1</code>, <code>test_caso_ok</code>, <code>test_bug123</code>.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Deja el Act como una sola línea</div>
  <p>Si la fase "Act" del patrón AAA necesita varias líneas, probablemente estás probando una secuencia de pasos en vez de un comportamiento único — considera dividir el test o exponer un método de más alto nivel en el código bajo prueba.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Espeja la estructura de carpetas de src/ en tests/</div>
  <p><code>src/diag/uds.py</code> → <code>tests/diag/test_uds.py</code>. Cualquiera que abra el proyecto encuentra el test correspondiente sin buscar.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Agrupa por escenario, no una TestCase monolítica por módulo</div>
  <p>Varias clases pequeñas (<code>TestUDSSessionPositiva</code>, <code>TestUDSSessionNegativa</code>, <code>TestUDSSessionTimeout</code>) dan reportes de fallo más legibles que una <code>TestUDS</code> con 50 métodos mezclados.</p>
</div>
  </div>
  <div id="ute-5" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Un archivo se llama <code>can_tests.py</code> y contiene tests válidos con métodos <code>test_*</code>. ¿discover lo encuentra?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No, por defecto.</b> <code>discover</code> busca archivos que hagan match con el patrón <code>test*.py</code> (prefijo, no sufijo). <code>can_tests.py</code> no matchea ese patrón — hay que renombrarlo a <code>test_can.py</code>, o pasar explícitamente <code>-p "*_tests.py"</code> a discover, lo cual casi nadie configura por costumbre.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Por qué la fase "Act" del patrón AAA debería ser idealmente una sola línea?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Porque delimita exactamente qué comportamiento se está probando.</b> Si el Act tiene varias líneas (varias llamadas encadenadas), no queda claro cuál de esas llamadas es "la que se está probando" versus preparación adicional — mezclar Arrange y Act dificulta leer el test y diagnosticar qué falló.</div></div>
</div>
  </div>
</div>`,

'ut-setup': `
<div class="tab-group-uts">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'uts-1','uts')">setUp / tearDown</button>
    <button class="tab-btn" onclick="switchTab(this,'uts-2','uts')">setUpClass / tearDownClass</button>
    <button class="tab-btn" onclick="switchTab(this,'uts-3','uts')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'uts-4','uts')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'uts-5','uts')">Quiz</button>
  </div>
  <div id="uts-1" class="tab-panel active">
<div class="concept-intro"><strong>setUp()</strong> se ejecuta automáticamente <em>antes de cada</em> método <code>test_*</code>, y <strong>tearDown()</strong> se ejecuta <em>después de cada</em> uno (incluso si el test falló o lanzó una excepción). Se usan para garantizar que cada test arranca con estado limpio e independiente — sin que el resultado de un test dependa de qué corrió antes.</div>
<div class="code-block"><div class="code-lang">Python — setUp y tearDown por test</div><pre>
<span class="c-kw">class</span> <span class="c-fn">TestBenchConnection</span>(unittest.TestCase):

    <span class="c-kw">def</span> <span class="c-fn">setUp</span>(<span class="c-bi">self</span>):
        <span class="c-cm"># Antes de CADA test — estado limpio</span>
        <span class="c-bi">self</span>.bench = HILBench.connect(<span class="c-st">"bench-01"</span>)
        <span class="c-bi">self</span>.bench.reset()

    <span class="c-kw">def</span> <span class="c-fn">tearDown</span>(<span class="c-bi">self</span>):
        <span class="c-cm"># Después de CADA test — se ejecuta SIEMPRE, incluso si el test falló</span>
        <span class="c-bi">self</span>.bench.stop_all()
        <span class="c-bi">self</span>.bench.disconnect()

    <span class="c-kw">def</span> <span class="c-fn">test_ignition_on</span>(<span class="c-bi">self</span>):
        <span class="c-bi">self</span>.bench.set_signal(<span class="c-st">"IGN"</span>, <span class="c-nb">1</span>)
        <span class="c-bi">self</span>.assertEqual(<span class="c-bi">self</span>.bench.read_signal(<span class="c-st">"ENGINE_STATE"</span>), <span class="c-st">"running"</span>)

    <span class="c-kw">def</span> <span class="c-fn">test_ignition_off</span>(<span class="c-bi">self</span>):
        <span class="c-cm"># Este test NO ve el estado dejado por test_ignition_on:</span>
        <span class="c-cm"># setUp() ya corrió reset() antes de este método</span>
        <span class="c-bi">self</span>.bench.set_signal(<span class="c-st">"IGN"</span>, <span class="c-nb">0</span>)
        <span class="c-bi">self</span>.assertEqual(<span class="c-bi">self</span>.bench.read_signal(<span class="c-st">"ENGINE_STATE"</span>), <span class="c-st">"stopped"</span>)</pre></div>
<div class="concept-intro"><b>Punto clave sobre tearDown:</b> se ejecuta incluso si <code>setUp</code> lanzó una excepción a mitad de camino solo si <code>setUp</code> completó sin error (si setUp falla, tearDown NO corre, porque el objeto nunca se terminó de preparar). Pero si el propio <code>test_*</code> falla o lanza, <code>tearDown</code> igual se ejecuta — por eso es el lugar correcto para liberar recursos (conexiones, sockets, procesos) sin importar el resultado del test.</div>
  </div>
  <div id="uts-2" class="tab-panel">
<div class="concept-intro"><strong>setUpClass()</strong> y <strong>tearDownClass()</strong> son <code>@classmethod</code> que se ejecutan <em>una sola vez</em> para toda la clase — antes del primer test y después del último, respectivamente. Se usan para recursos caros de crear (conexión real a un bench HIL, levantar un servidor, cargar un dataset grande) que sería muy lento recrear en cada uno de los tests individuales.</div>
<table class="kv-table">
<tr><th>Método</th><th>Frecuencia</th><th>Cuándo usarlo</th><th>Nota</th></tr>
<tr><td>setUpClass(cls)</td><td>Una vez, antes del primer test de la clase</td><td>Recursos caros y compartibles: conexión a bench físico, servidor de prueba, dataset grande</td><td>@classmethod — usa cls, no self</td></tr>
<tr><td>tearDownClass(cls)</td><td>Una vez, después del último test de la clase</td><td>Liberar lo creado en setUpClass — cerrar conexión, apagar servidor</td><td>@classmethod — se ejecuta aunque algún test haya fallado</td></tr>
<tr><td>setUp(self)</td><td>Antes de CADA test</td><td>Estado que debe quedar limpio e independiente entre tests: reset de señales, mocks nuevos</td><td>Método de instancia normal</td></tr>
<tr><td>tearDown(self)</td><td>Después de CADA test</td><td>Limpieza puntual que no requiere recrear el recurso caro completo</td><td>Se ejecuta incluso si el test falló</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — setUpClass / tearDownClass con recurso caro</div><pre>
<span class="c-kw">class</span> <span class="c-fn">TestHILBenchSuite</span>(unittest.TestCase):

    <span class="c-dc">@classmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">setUpClass</span>(cls):
        <span class="c-cm"># Una vez por clase — conexión cara (socket real al bench)</span>
        cls.bench = HILBench.connect(<span class="c-st">"bench-01"</span>, timeout=<span class="c-nb">30</span>)

    <span class="c-dc">@classmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">tearDownClass</span>(cls):
        <span class="c-cm"># Una vez por clase — liberar la conexión física</span>
        cls.bench.disconnect()

    <span class="c-kw">def</span> <span class="c-fn">setUp</span>(<span class="c-bi">self</span>):
        <span class="c-cm"># Antes de cada test — barato: solo resetea el estado lógico</span>
        <span class="c-bi">self</span>.bench.reset_signals()

    <span class="c-kw">def</span> <span class="c-fn">test_ignition_on</span>(<span class="c-bi">self</span>):
        <span class="c-bi">self</span>.bench.set_signal(<span class="c-st">"IGN"</span>, <span class="c-nb">1</span>)
        <span class="c-bi">self</span>.assertEqual(<span class="c-bi">self</span>.bench.read_signal(<span class="c-st">"ENGINE_STATE"</span>), <span class="c-st">"running"</span>)

    <span class="c-kw">def</span> <span class="c-fn">test_ignition_off</span>(<span class="c-bi">self</span>):
        <span class="c-bi">self</span>.bench.set_signal(<span class="c-st">"IGN"</span>, <span class="c-nb">0</span>)
        <span class="c-bi">self</span>.assertEqual(<span class="c-bi">self</span>.bench.read_signal(<span class="c-st">"ENGINE_STATE"</span>), <span class="c-st">"stopped"</span>)</pre></div>
<div class="concept-intro"><b>Orden de ejecución completo:</b> <code>setUpModule</code> → <code>setUpClass</code> → [<code>setUp</code> → <code>test_*</code> → <code>tearDown</code>] × N (uno por cada test) → <code>tearDownClass</code> → <code>tearDownModule</code>. La conexión al bench se abre UNA vez (setUpClass) y se comparte entre todos los tests de la clase; el reset lógico (setUp) se repite en cada test para que no haya fugas de estado entre ellos.</div>
<div class="alert-card">Si usas pytest sobre las mismas TestCase, <code>setUpClass</code>/<code>tearDownClass</code> siguen funcionando igual (pytest respeta la API de unittest). La diferencia real es que en HIL real, cls.bench compartido entre tests significa que un test que deja el bench en mal estado SÍ puede afectar al siguiente — por eso setUp() debe resetear explícitamente lo que importa.</div>
  </div>
  <div id="uts-3" class="tab-panel">
<div class="concept-intro">Los errores más comunes con el lifecycle vienen de mezclar el alcance "por clase" con el alcance "por test", o de asumir que tearDown siempre limpia todo automáticamente.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">class</span> <span class="c-fn">TestBenchConnection</span>(unittest.TestCase):
    <span class="c-kw">def</span> <span class="c-fn">setUp</span>(<span class="c-bi">self</span>):
        <span class="c-cm"># Conexión física real ABIERTA en cada uno de los 50 tests</span>
        <span class="c-bi">self</span>.bench = HILBench.connect(<span class="c-st">"bench-01"</span>, timeout=<span class="c-nb">30</span>)

    <span class="c-kw">def</span> <span class="c-fn">tearDown</span>(<span class="c-bi">self</span>):
        <span class="c-bi">self</span>.bench.disconnect()</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">class</span> <span class="c-fn">TestBenchConnection</span>(unittest.TestCase):
    <span class="c-dc">@classmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">setUpClass</span>(cls):
        <span class="c-cm"># Conexión física UNA vez para toda la clase</span>
        cls.bench = HILBench.connect(<span class="c-st">"bench-01"</span>, timeout=<span class="c-nb">30</span>)

    <span class="c-dc">@classmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">tearDownClass</span>(cls):
        cls.bench.disconnect()

    <span class="c-kw">def</span> <span class="c-fn">setUp</span>(<span class="c-bi">self</span>):
        <span class="c-bi">self</span>.bench.reset_signals()  <span class="c-cm"># solo reset lógico, barato</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> abrir una conexión física real (socket, puerto serie, sesión CAN) en <code>setUp()</code> significa reabrirla en cada uno de los N tests de la clase, multiplicando el tiempo de la suite y el desgaste del hardware de bench. Los recursos caros y compartibles van en <code>setUpClass</code>; solo el reset barato de estado va en <code>setUp</code>.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_signal_a</span>(<span class="c-bi">self</span>):
    <span class="c-bi">self</span>.bench.set_signal(<span class="c-st">"IGN"</span>, <span class="c-nb">1</span>)  <span class="c-cm"># deja el bench encendido</span>
    <span class="c-bi">self</span>.assertTrue(<span class="c-bi">self</span>.bench.is_on())

<span class="c-kw">def</span> <span class="c-fn">test_signal_b</span>(<span class="c-bi">self</span>):
    <span class="c-cm"># asume que el bench sigue apagado — depende del orden</span>
    <span class="c-bi">self</span>.assertFalse(<span class="c-bi">self</span>.bench.is_on())</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">setUp</span>(<span class="c-bi">self</span>):
    <span class="c-bi">self</span>.bench.reset_signals()  <span class="c-cm"># estado conocido ANTES de cada test</span>

<span class="c-kw">def</span> <span class="c-fn">test_signal_a</span>(<span class="c-bi">self</span>):
    <span class="c-bi">self</span>.bench.set_signal(<span class="c-st">"IGN"</span>, <span class="c-nb">1</span>)
    <span class="c-bi">self</span>.assertTrue(<span class="c-bi">self</span>.bench.is_on())

<span class="c-kw">def</span> <span class="c-fn">test_signal_b</span>(<span class="c-bi">self</span>):
    <span class="c-bi">self</span>.assertFalse(<span class="c-bi">self</span>.bench.is_on())  <span class="c-cm"># parte de un estado reseteado, no del anterior</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> unittest no garantiza que <code>test_signal_a</code> corra antes que <code>test_signal_b</code> (el orden es alfabético, y además puede variar entre corridas paralelas). Si un test deja efectos secundarios que el siguiente asume implícitamente, la suite se vuelve frágil: pasa en local y falla en CI, o pasa hoy y falla mañana. <code>setUp()</code> debe garantizar estado conocido en CADA test, sin asumir qué corrió antes.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">tearDown</span>(<span class="c-bi">self</span>):
    <span class="c-bi">self</span>.bench.stop_all()
    <span class="c-bi">self</span>.temp_file.close()  <span class="c-cm"># si stop_all() lanza, esta línea nunca corre</span>
    os.remove(<span class="c-bi">self</span>.temp_file.name)</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">tearDown</span>(<span class="c-bi">self</span>):
    <span class="c-kw">try</span>:
        <span class="c-bi">self</span>.bench.stop_all()
    <span class="c-kw">finally</span>:
        <span class="c-bi">self</span>.temp_file.close()
        os.remove(<span class="c-bi">self</span>.temp_file.name)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> dentro de un mismo <code>tearDown</code>, si una línea lanza una excepción, las líneas siguientes de ESE MISMO método no se ejecutan (no hay magia adicional dentro de tearDown). unittest garantiza que tearDown se LLAME después de cada test, pero no protege el código interno de tearDown de sus propios fallos parciales — para eso necesitas try/finally como en cualquier otro código Python.</div>
  </div>
  <div id="uts-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Recursos caros y compartibles → setUpClass; estado por test → setUp</div>
  <p>Conexión a un bench físico, servidor de prueba, carga de un dataset grande: setUpClass. Reset de señales, mocks nuevos, datos de entrada específicos del test: setUp. No mezcles ambos niveles.</p>
</div>
<div class="practice-card">
  <div class="practice-title">tearDown/tearDownClass siempre con try/finally si hacen múltiples pasos de limpieza</div>
  <p>Si la limpieza libera más de un recurso, envuélvela en <code>try/finally</code> (o varios bloques) para que un fallo liberando el recurso A no impida liberar el recurso B.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Nunca asumas el orden de ejecución entre tests</div>
  <p>Cada test debe partir de un estado conocido gracias a setUp, sin depender de efectos dejados por otro test. Si dos tests deben correr en secuencia obligatoria, probablemente en realidad son un solo test con varios pasos.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa addCleanup() para limpieza específica de un recurso creado dentro del test</div>
  <p><code>self.addCleanup(archivo.close)</code> registra una función de limpieza que corre incluso si el test falla — más localizado que un tearDown genérico cuando el recurso solo existe en un test puntual.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Si setUpClass falla, ningún test de la clase corre — verifícalo explícitamente en logs de CI</div>
  <p>Un fallo en setUpClass (ej. el bench HIL no responde) marca TODOS los tests de esa clase como error, no como fallo individual. Revisa el log completo, no asumas que son N fallos distintos — es probable que sea un solo problema de infraestructura.</p>
</div>
  </div>
  <div id="uts-5" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Si <code>setUp()</code> lanza una excepción a mitad de camino, ¿corre <code>tearDown()</code> para ese test?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No.</b> Si setUp() falla, unittest marca el test como ERROR y NO llama a tearDown(), porque asume que el estado nunca terminó de prepararse correctamente (podría no haber nada válido que limpiar). Esto es distinto de cuando el test_* en sí falla: ahí setUp() sí completó, y tearDown() SÍ se ejecuta igual.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Por qué setUpClass y tearDownClass son @classmethod y usan cls en vez de self?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Porque se ejecutan antes de que exista cualquier instancia de la TestCase</b> (una instancia nueva se crea por cada test individual). setUpClass corre a nivel de la clase completa, una sola vez, así que solo tiene sentido operar sobre atributos de clase (cls.bench) que luego serán accesibles desde self en cada instancia de test, ya que self hereda los atributos de clase.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>Tienes 50 tests que necesitan una conexión HIL que tarda 5 segundos en establecerse. ¿setUp o setUpClass?<span class="q-arr">▶</span></div><div class="quiz-a"><b>setUpClass.</b> Con setUp, la conexión de 5 segundos se repetiría 50 veces (más de 4 minutos solo en overhead de conexión). Con setUpClass, la conexión cara se abre una sola vez y se comparte entre los 50 tests; solo el reset lógico barato (señales, estado) va en setUp() de cada test.</div></div>
</div>
  </div>
</div>`,

'ut-asserts': `
<div class="tab-group-uta">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'uta-1','uta')">Tabla completa de asserts</button>
    <button class="tab-btn" onclick="switchTab(this,'uta-2','uta')">Ejemplos por categoría</button>
    <button class="tab-btn" onclick="switchTab(this,'uta-3','uta')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'uta-4','uta')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'uta-5','uta')">Quiz</button>
  </div>
  <div id="uta-1" class="tab-panel active">
<div class="concept-intro">Todos los métodos <code>assertX</code> viven en <code>unittest.TestCase</code> y se llaman con <code>self.assertX(...)</code>. A diferencia del <code>assert</code> nativo de Python, cada uno genera un mensaje de error específico con el diff exacto de lo esperado vs. lo obtenido, y nunca se desactiva con optimizaciones del intérprete. Elegir el assert más específico (assertListEqual en vez de assertEqual sobre dos listas) da mejores mensajes de fallo.</div>
<table class="kv-table">
<tr><th>Método</th><th>¿Qué verifica?</th><th>Ejemplo → Resultado</th><th>Nota</th></tr>
<tr><td>assertEqual(a, b)</td><td>a == b</td><td>assertEqual(2+2, 4) → pasa</td><td>El más usado — sirve para casi cualquier tipo</td></tr>
<tr><td>assertNotEqual(a, b)</td><td>a != b</td><td>assertNotEqual(2+2, 5) → pasa</td><td>Menos común, útil para verificar que algo cambió</td></tr>
<tr><td>assertTrue(x)</td><td>bool(x) is True</td><td>assertTrue([1,2,3]) → pasa</td><td>No verifica x == True, sino veracidad (truthy)</td></tr>
<tr><td>assertFalse(x)</td><td>bool(x) is False</td><td>assertFalse([]) → pasa</td><td>Lista vacía es falsy en Python</td></tr>
<tr><td>assertIs(a, b)</td><td>a is b (misma identidad de objeto)</td><td>assertIs(x, x) → pasa</td><td>No confundir con assertEqual — identidad, no igualdad de valor</td></tr>
<tr><td>assertIsNot(a, b)</td><td>a is not b</td><td>assertIsNot([1], [1]) → pasa</td><td>Dos listas iguales en valor son objetos distintos</td></tr>
<tr><td>assertIsNone(x)</td><td>x is None</td><td>assertIsNone(config.get('x')) → pasa si falta la key</td><td>Más claro que assertEqual(x, None)</td></tr>
<tr><td>assertIsNotNone(x)</td><td>x is not None</td><td>assertIsNotNone(respuesta) → pasa</td><td>Común tras una llamada que puede retornar None</td></tr>
<tr><td>assertIn(a, b)</td><td>a in b (membership)</td><td>assertIn('ERROR', log_lines) → pasa si aparece</td><td>Funciona con listas, sets, dicts (busca en keys), strings</td></tr>
<tr><td>assertNotIn(a, b)</td><td>a not in b</td><td>assertNotIn('CRASH', log_lines) → pasa</td><td>Útil para verificar ausencia de errores</td></tr>
<tr><td>assertIsInstance(a, tipo)</td><td>isinstance(a, tipo)</td><td>assertIsInstance(resultado, dict) → pasa</td><td>Verifica el tipo del objeto</td></tr>
<tr><td>assertNotIsInstance(a, tipo)</td><td>not isinstance(a, tipo)</td><td>assertNotIsInstance(x, str) → pasa</td><td>Menos común</td></tr>
<tr><td>assertRaises(Exc)</td><td>El bloque with lanza una excepción del tipo Exc</td><td>with self.assertRaises(ValueError): int('abc') → pasa</td><td>También puede usarse como context manager para inspeccionar la excepción</td></tr>
<tr><td>assertRaisesRegex(Exc, patron)</td><td>Lanza Exc Y el mensaje matchea el regex</td><td>assertRaisesRegex(ValueError, 'invalid literal') → pasa</td><td>Verifica tipo Y contenido del mensaje</td></tr>
<tr><td>assertAlmostEqual(a, b, places=7)</td><td>round(a-b, places) == 0</td><td>assertAlmostEqual(0.1+0.2, 0.3, places=7) → pasa</td><td>Imprescindible para floats — nunca uses assertEqual con floats</td></tr>
<tr><td>assertNotAlmostEqual(a, b, places=7)</td><td>round(a-b, places) != 0</td><td>assertNotAlmostEqual(1.0, 2.0, places=1) → pasa</td><td>Inverso del anterior</td></tr>
<tr><td>assertGreater(a, b)</td><td>a &gt; b</td><td>assertGreater(rpm_actual, 0) → pasa</td><td>Y su familia: assertGreaterEqual</td></tr>
<tr><td>assertLess(a, b)</td><td>a &lt; b</td><td>assertLess(latencia_ms, 100) → pasa</td><td>Y su familia: assertLessEqual</td></tr>
<tr><td>assertRegex(texto, patron)</td><td>re.search(patron, texto) encuentra match</td><td>assertRegex(vin, r'^[A-HJ-NPR-Z0-9]{17}$') → pasa</td><td>Útil para validar formatos (VIN, DTC codes)</td></tr>
<tr><td>assertNotRegex(texto, patron)</td><td>re.search no encuentra match</td><td>assertNotRegex(log, r'FATAL') → pasa</td><td>Inverso del anterior</td></tr>
<tr><td>assertListEqual(a, b)</td><td>Listas iguales elemento por elemento</td><td>assertListEqual([1,2], [1,2]) → pasa</td><td>Da diff legible mostrando índice exacto de la diferencia</td></tr>
<tr><td>assertTupleEqual(a, b)</td><td>Tuplas iguales elemento por elemento</td><td>assertTupleEqual((1,2), (1,2)) → pasa</td><td>Análogo a assertListEqual para tuplas</td></tr>
<tr><td>assertDictEqual(a, b)</td><td>Dicts iguales (mismas keys y valores)</td><td>assertDictEqual({'a':1}, {'a':1}) → pasa</td><td>Diff muestra exactamente qué keys difieren</td></tr>
<tr><td>assertSetEqual(a, b)</td><td>Sets iguales (mismos elementos, sin orden)</td><td>assertSetEqual({1,2}, {2,1}) → pasa</td><td>El orden no importa para sets</td></tr>
<tr><td>assertCountEqual(a, b)</td><td>Mismos elementos, sin importar orden ni tipo de secuencia</td><td>assertCountEqual([1,2,2], [2,1,2]) → pasa</td><td>Compara multisets — útil cuando el orden de una lista no está garantizado</td></tr>
<tr><td>assertMultiLineEqual(a, b)</td><td>Strings multilínea iguales</td><td>Compara logs largos línea por línea</td><td>Diff estilo unified diff, mejor que assertEqual para texto largo</td></tr>
<tr><td>assertWarns(Warning)</td><td>El bloque emite un warning del tipo dado</td><td>with self.assertWarns(DeprecationWarning): ...</td><td>Análogo a assertRaises pero para warnings</td></tr>
<tr><td>fail(msg)</td><td>Falla el test inmediatamente con mensaje custom</td><td>self.fail("condición imposible alcanzada")</td><td>Útil en ramas que nunca deberían ejecutarse</td></tr>
</table>
  </div>
  <div id="uta-2" class="tab-panel">
<div class="concept-intro">Agrupar los asserts por categoría ayuda a elegir el correcto: igualdad de valor vs. identidad, verificación de tipos, manejo de excepciones, y comparación de colecciones completas con diff legible.</div>
<div class="code-block"><div class="code-lang">Python — Igualdad e identidad</div><pre>
<span class="c-kw">def</span> <span class="c-fn">test_igualdad_vs_identidad</span>(<span class="c-bi">self</span>):
    a = [<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>]
    b = [<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>]
    c = a

    <span class="c-bi">self</span>.assertEqual(a, b)      <span class="c-cm"># True — mismo contenido</span>
    <span class="c-bi">self</span>.assertIsNot(a, b)    <span class="c-cm"># True — objetos distintos en memoria</span>
    <span class="c-bi">self</span>.assertIs(a, c)       <span class="c-cm"># True — c apunta al mismo objeto que a</span>

    <span class="c-cm"># Floats: NUNCA assertEqual directo</span>
    resultado = <span class="c-nb">0.1</span> + <span class="c-nb">0.2</span>
    <span class="c-bi">self</span>.assertAlmostEqual(resultado, <span class="c-nb">0.3</span>, places=<span class="c-nb">7</span>)</pre></div>
<div class="code-block"><div class="code-lang">Python — Verificación de tipos</div><pre>
<span class="c-kw">def</span> <span class="c-fn">test_tipo_de_respuesta_uds</span>(<span class="c-bi">self</span>):
    respuesta = parse_uds_response(<span class="c-st">b'\x62\xF1\x90'</span>)
    <span class="c-bi">self</span>.assertIsInstance(respuesta, UDSResponse)
    <span class="c-bi">self</span>.assertIsInstance(respuesta.data, <span class="c-bi">bytes</span>)
    <span class="c-bi">self</span>.assertNotIsInstance(respuesta.data, <span class="c-bi">str</span>)</pre></div>
<div class="code-block"><div class="code-lang">Python — Excepciones</div><pre>
<span class="c-kw">def</span> <span class="c-fn">test_timeout_lanza_excepcion_especifica</span>(<span class="c-bi">self</span>):
    <span class="c-cm"># Forma simple — solo verifica el tipo</span>
    <span class="c-kw">with</span> <span class="c-bi">self</span>.assertRaises(TimeoutError):
        <span class="c-bi">self</span>.bench.wait_response(timeout=<span class="c-nb">0.001</span>)

    <span class="c-cm"># Forma con inspección — verifica tipo Y contenido del mensaje</span>
    <span class="c-kw">with</span> <span class="c-bi">self</span>.assertRaises(TimeoutError) <span class="c-kw">as</span> ctx:
        <span class="c-bi">self</span>.bench.wait_response(timeout=<span class="c-nb">0.001</span>)
    <span class="c-bi">self</span>.assertIn(<span class="c-st">"bench-01"</span>, <span class="c-bi">str</span>(ctx.exception))

    <span class="c-cm"># Forma con regex — tipo Y mensaje en una línea</span>
    <span class="c-bi">self</span>.assertRaisesRegex(
        TimeoutError, <span class="c-st">r"bench-\d+ no respondió"</span>,
        <span class="c-bi">self</span>.bench.wait_response, timeout=<span class="c-nb">0.001</span>
    )</pre></div>
<div class="code-block"><div class="code-lang">Python — Colecciones con diff legible</div><pre>
<span class="c-kw">def</span> <span class="c-fn">test_dtcs_leidos_coinciden</span>(<span class="c-bi">self</span>):
    esperados = [<span class="c-st">'P0301'</span>, <span class="c-st">'P0420'</span>, <span class="c-st">'U0100'</span>]
    obtenidos = leer_dtcs_activos(<span class="c-bi">self</span>.ecu)

    <span class="c-cm"># assertListEqual da un diff con el índice exacto donde difieren</span>
    <span class="c-bi">self</span>.assertListEqual(<span class="c-bi">sorted</span>(obtenidos), <span class="c-bi">sorted</span>(esperados))

    <span class="c-cm"># assertCountEqual: mismos elementos, sin exigir mismo orden</span>
    <span class="c-bi">self</span>.assertCountEqual(obtenidos, esperados)

    <span class="c-cm"># assertDictEqual muestra exactamente qué keys difieren</span>
    config_esperado = {<span class="c-st">'baudrate'</span>: <span class="c-nb">500000</span>, <span class="c-st">'protocol'</span>: <span class="c-st">'CAN-FD'</span>}
    <span class="c-bi">self</span>.assertDictEqual(<span class="c-bi">self</span>.bench.get_config(), config_esperado)</pre></div>
  </div>
  <div id="uta-3" class="tab-panel">
<div class="concept-intro">Elegir el assert equivocado no siempre hace que el test falle cuando debería — a veces produce mensajes de error inútiles, o peor, pasa cuando no debería.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_promedio_velocidad</span>(<span class="c-bi">self</span>):
    promedio = calcular_promedio([<span class="c-nb">60.0</span>, <span class="c-nb">80.0</span>, <span class="c-nb">70.0</span>])
    <span class="c-bi">self</span>.assertEqual(promedio, <span class="c-nb">70.0</span>)
<span class="c-cm"># AssertionError: 69.99999999999999 != 70.0</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_promedio_velocidad</span>(<span class="c-bi">self</span>):
    promedio = calcular_promedio([<span class="c-nb">60.0</span>, <span class="c-nb">80.0</span>, <span class="c-nb">70.0</span>])
    <span class="c-bi">self</span>.assertAlmostEqual(promedio, <span class="c-nb">70.0</span>, places=<span class="c-nb">2</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> los floats en punto flotante binario no representan exactamente la mayoría de los decimales (0.1 + 0.2 no es exactamente 0.3 a nivel de bits). Comparar floats con <code>==</code>/<code>assertEqual</code> es una fuente clásica de tests inestables ("flaky") que a veces pasan y a veces no según acumulación de errores de redondeo. Usa siempre <code>assertAlmostEqual</code> con floats.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_dividir_por_cero</span>(<span class="c-bi">self</span>):
    <span class="c-kw">try</span>:
        <span class="c-bi">self</span>.calc.dividir(<span class="c-nb">10</span>, <span class="c-nb">0</span>)
        <span class="c-bi">self</span>.fail(<span class="c-st">"debería haber lanzado"</span>)
    <span class="c-kw">except</span> ZeroDivisionError:
        <span class="c-kw">pass</span>  <span class="c-cm"># funciona, pero es verboso e innecesario</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_dividir_por_cero</span>(<span class="c-bi">self</span>):
    <span class="c-kw">with</span> <span class="c-bi">self</span>.assertRaises(ZeroDivisionError):
        <span class="c-bi">self</span>.calc.dividir(<span class="c-nb">10</span>, <span class="c-nb">0</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> reinventar <code>assertRaises</code> con try/except/fail es un patrón que unittest ya resuelve de forma más corta y estándar. El try/except manual también tiene un bug sutil: si <code>dividir</code> NO lanza nada, <code>self.fail()</code> corre, pero si dividir lanza una excepción DISTINTA a ZeroDivisionError, ese except no la captura y el test falla con un traceback confuso en vez de un mensaje claro de "se esperaba ZeroDivisionError".</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_lista_dtcs</span>(<span class="c-bi">self</span>):
    obtenidos = leer_dtcs_activos(<span class="c-bi">self</span>.ecu)
    <span class="c-bi">self</span>.assertEqual(obtenidos, [<span class="c-st">'P0301'</span>, <span class="c-st">'P0420'</span>])
<span class="c-cm"># Falla si el orden de retorno cambia, aunque el contenido sea correcto</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_lista_dtcs</span>(<span class="c-bi">self</span>):
    obtenidos = leer_dtcs_activos(<span class="c-bi">self</span>.ecu)
    <span class="c-bi">self</span>.assertCountEqual(obtenidos, [<span class="c-st">'P0301'</span>, <span class="c-st">'P0420'</span>])
<span class="c-cm"># Pasa sin importar el orden en que la ECU devolvió los DTCs</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>assertEqual</code> sobre listas exige el mismo orden exacto. Si la fuente de datos (una ECU real, una API, un set internamente) no garantiza orden, el test queda acoplado a un detalle de implementación irrelevante para el comportamiento real. <code>assertCountEqual</code> verifica "mismos elementos" sin exigir el mismo orden — úsalo cuando el orden no es parte del contrato.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_bench_activo</span>(<span class="c-bi">self</span>):
    <span class="c-bi">self</span>.assertEqual(<span class="c-bi">self</span>.bench.is_active(), <span class="c-kw">True</span>)</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_bench_activo</span>(<span class="c-bi">self</span>):
    <span class="c-bi">self</span>.assertTrue(<span class="c-bi">self</span>.bench.is_active())</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>assertEqual(x, True)</code> exige que <code>x</code> sea exactamente <code>True</code> (comparación de valor), mientras que <code>assertTrue(x)</code> evalúa la veracidad (<code>bool(x)</code>). Si <code>is_active()</code> retorna <code>1</code> en vez de <code>True</code> (común con APIs de hardware/C), <code>assertEqual(1, True)</code> de hecho pasa por cómo Python compara bool e int, pero la intención semántica correcta sigue siendo assertTrue — es más legible y no depende de esa coincidencia numérica.</div>
  </div>
  <div id="uta-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Usa el assert más específico disponible, no el genérico</div>
  <p>assertListEqual/assertDictEqual dan diffs mucho más legibles que assertEqual genérico cuando el test falla — el reporte te muestra exactamente qué índice o key difiere en vez de solo "no son iguales".</p>
</div>
<div class="practice-card">
  <div class="practice-title">Floats siempre con assertAlmostEqual, nunca assertEqual</div>
  <p>Es la fuente número uno de tests "flaky" en código que hace cálculos (promedios, conversiones de unidades, filtros de señal). Define explícitamente cuántos <code>places</code> de precisión son relevantes para tu dominio.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Inspecciona la excepción cuando el mensaje importa, no solo el tipo</div>
  <p>Usa <code>with self.assertRaises(Exc) as ctx:</code> y luego <code>assertIn(...,str(ctx.exception))</code> cuando el mensaje de error comunica información que el test debe verificar (ej. qué bench específico dio timeout).</p>
</div>
<div class="practice-card">
  <div class="practice-title">assertCountEqual cuando el orden no es parte del contrato</div>
  <p>Si la función bajo prueba no promete un orden específico de retorno, no acoples el test a un orden accidental. assertCountEqual verifica contenido sin ese acoplamiento innecesario.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Un solo assert conceptual por test cuando sea posible</div>
  <p>Varios asserts que verifican la MISMA cosa desde ángulos distintos están bien (ej. tipo y valor de una respuesta). Pero si agregas asserts de un comportamiento no relacionado "ya que estás ahí", es momento de separar en otro test.</p>
</div>
  </div>
  <div id="uta-5" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿Cuál es la diferencia entre assertEqual(a, b) y assertIs(a, b)?<span class="q-arr">▶</span></div><div class="quiz-a"><b>assertEqual compara valor (a == b); assertIs compara identidad de objeto (a is b).</b> Dos listas con el mismo contenido pero creadas por separado pasan assertEqual pero fallan assertIs, porque son objetos distintos en memoria aunque su contenido sea idéntico.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Por qué assertAlmostEqual(0.1 + 0.2, 0.3) puede fallar con assertEqual pero pasa con assertAlmostEqual?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Porque los floats binarios no representan exactamente la mayoría de decimales.</b> 0.1 + 0.2 da 0.30000000000000004 en punto flotante IEEE 754, que no es exactamente igual a 0.3. assertAlmostEqual compara redondeando a N decimales (por defecto 7), tolerando ese error de precisión inherente a la representación binaria.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>Necesitas verificar que una función lanza ValueError Y que el mensaje contiene "timeout". ¿Qué usas?<span class="q-arr">▶</span></div><div class="quiz-a"><b>assertRaisesRegex(ValueError, "timeout", funcion, *args)</b> o el context manager <code>with self.assertRaises(ValueError) as ctx:</code> seguido de <code>self.assertIn("timeout", str(ctx.exception))</code>. Ambas formas verifican tipo Y contenido; la primera es más corta para regex simples, la segunda da más flexibilidad para inspeccionar otros atributos de la excepción.</div></div>
</div>
  </div>
</div>`,

'ut-mock': `
<div class="tab-group-utm">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'utm-1','utm')">Mock y MagicMock básico</button>
    <button class="tab-btn" onclick="switchTab(this,'utm-2','utm')">@patch, side_effect, return_value</button>
    <button class="tab-btn" onclick="switchTab(this,'utm-3','utm')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'utm-4','utm')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'utm-5','utm')">Quiz</button>
  </div>
  <div id="utm-1" class="tab-panel active">
<div class="concept-intro"><strong>unittest.mock</strong> permite reemplazar temporalmente una dependencia real (hardware, red, sistema de archivos, otro servicio) por un objeto simulado que registra cómo fue llamado y devuelve valores controlados. En testing automotriz es esencial: no quieres depender de un bench HIL físico conectado, ni de un bus CAN real, ni de una ECU respondiendo, para probar la LÓGICA de tu código — el mock simula esa dependencia externa.</div>
<table class="kv-table">
<tr><th>Clase/Concepto</th><th>Qué es</th><th>Cuándo usarlo</th></tr>
<tr><td>Mock()</td><td>Objeto genérico que acepta cualquier atributo o llamada, registrando todo</td><td>Simular un objeto simple sin necesidad de replicar su interfaz exacta</td></tr>
<tr><td>MagicMock()</td><td>Como Mock, pero también implementa los métodos mágicos (__len__, __iter__, __enter__, etc.)</td><td>Cuando el objeto real se usa en un with, un for, o con len()</td></tr>
<tr><td>patch()</td><td>Decorador/context manager que reemplaza un objeto por un Mock durante el test</td><td>Reemplazar una dependencia importada en el módulo bajo prueba</td></tr>
<tr><td>patch.object()</td><td>Como patch, pero apunta a un atributo específico de un objeto ya existente</td><td>Cuando ya tienes la instancia y solo quieres mockear un método suyo</td></tr>
<tr><td>return_value</td><td>Valor fijo que retorna el mock al ser llamado</td><td>Simular una respuesta exitosa y predecible</td></tr>
<tr><td>side_effect</td><td>Función, excepción o lista de valores que controla el comportamiento en cada llamada</td><td>Simular excepciones, comportamiento dinámico, o secuencias de respuestas distintas</td></tr>
<tr><td>assert_called_with(...)</td><td>Verifica que el mock fue llamado con argumentos exactos (la última vez)</td><td>Confirmar que tu código invocó la dependencia correctamente</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — Mock básico</div><pre>
<span class="c-kw">from</span> unittest.mock <span class="c-kw">import</span> Mock

<span class="c-kw">def</span> <span class="c-fn">test_procesar_temperatura_alerta_si_sobrecalienta</span>(<span class="c-bi">self</span>):
    <span class="c-cm"># Arrange — sensor simulado, sin hardware real conectado</span>
    sensor = Mock()
    sensor.read_temperature.return_value = <span class="c-nb">105.5</span>

    <span class="c-cm"># Act</span>
    alerta = procesar_temperatura(sensor)

    <span class="c-cm"># Assert — sobre el resultado Y sobre cómo se usó el mock</span>
    <span class="c-bi">self</span>.assertTrue(alerta.es_critica)
    sensor.read_temperature.assert_called_once()</pre></div>
<div class="code-block"><div class="code-lang">Python — MagicMock para simular protocolos (with, len, iter)</div><pre>
<span class="c-kw">from</span> unittest.mock <span class="c-kw">import</span> MagicMock

<span class="c-kw">def</span> <span class="c-fn">test_leer_trama_can_usa_context_manager</span>(<span class="c-bi">self</span>):
    bus = MagicMock()
    bus.__enter__.return_value = bus
    bus.recv.return_value = CANMessage(arbitration_id=<span class="c-nb">0x123</span>, data=<span class="c-st">b'\x01\x02'</span>)

    <span class="c-kw">with</span> bus <span class="c-kw">as</span> conexion:   <span class="c-cm"># Mock genérico NO soporta esto — hace falta MagicMock</span>
        msg = conexion.recv()

    <span class="c-bi">self</span>.assertEqual(msg.arbitration_id, <span class="c-nb">0x123</span>)</pre></div>
  </div>
  <div id="utm-2" class="tab-panel">
<div class="concept-intro"><code>@patch</code> reemplaza temporalmente, durante la duración del test, un objeto referenciado por su ruta de importación (string). <code>side_effect</code> y <code>return_value</code> controlan qué hace el mock al ser llamado — la tabla siguiente resume cuándo usar cada uno.</div>
<table class="kv-table">
<tr><th>Herramienta</th><th>Qué controla</th><th>Ejemplo típico</th><th>Nota</th></tr>
<tr><td>return_value</td><td>Valor fijo devuelto en CADA llamada</td><td>mock.send.return_value = True</td><td>Mismo valor siempre, sin importar los argumentos</td></tr>
<tr><td>side_effect = excepción</td><td>La llamada lanza esa excepción en vez de retornar</td><td>mock.read.side_effect = TimeoutError()</td><td>Simula fallos de red/hardware sin provocarlos de verdad</td></tr>
<tr><td>side_effect = función</td><td>Ejecuta la función con los mismos args; retorna lo que ella retorne</td><td>mock.calc.side_effect = lambda a,b: a+b</td><td>Simula lógica dinámica dependiente de los argumentos</td></tr>
<tr><td>side_effect = lista/iterable</td><td>Retorna un valor distinto en cada llamada sucesiva, en orden</td><td>mock.read.side_effect = [1, 2, TimeoutError()]</td><td>Útil para simular reintentos: 2 fallos y luego éxito</td></tr>
<tr><td>@patch("modulo.Clase")</td><td>Reemplaza la clase completa en el módulo donde SE USA (no donde se define)</td><td>@patch("mi_app.controller.CANInterface")</td><td>El path importa: patchea donde se importa/usa, no el origen</td></tr>
<tr><td>patch.object(obj, "metodo")</td><td>Reemplaza solo un método de una instancia/clase ya existente</td><td>patch.object(self.bench, "read_signal")</td><td>Útil cuando ya tienes el objeto y no quieres reemplazarlo entero</td></tr>
<tr><td>patch(..., autospec=True)</td><td>El mock respeta la firma real del objeto original</td><td>@patch("can.Bus", autospec=True)</td><td>Detecta typos y llamadas con firma incorrecta — muy recomendado</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — @patch con return_value y verificación de llamada</div><pre>
<span class="c-kw">from</span> unittest.mock <span class="c-kw">import</span> patch

<span class="c-dc">@patch(</span><span class="c-st">"mymodule.CANInterface"</span><span class="c-dc">)</span>
<span class="c-kw">def</span> <span class="c-fn">test_send_ignition_on</span>(<span class="c-bi">self</span>, mock_can_cls):
    <span class="c-cm"># mock_can_cls reemplaza la CLASE CANInterface completa</span>
    mock_can_cls.return_value.send.return_value = <span class="c-kw">True</span>

    controller = MyController()   <span class="c-cm"># internamente hace CANInterface(), que ahora es el mock</span>
    controller.send_ignition_on()

    mock_can_cls.return_value.send.assert_called_with(<span class="c-nb">0x105</span>, [<span class="c-nb">1</span>])</pre></div>
<div class="code-block"><div class="code-lang">Python — side_effect para simular reintentos y timeouts</div><pre>
<span class="c-kw">from</span> unittest.mock <span class="c-kw">import</span> patch, Mock

<span class="c-kw">def</span> <span class="c-fn">test_reintenta_dos_veces_antes_de_exito</span>(<span class="c-bi">self</span>):
    bus = Mock()
    <span class="c-cm"># Primeras 2 llamadas lanzan TimeoutError; la 3a retorna un valor real</span>
    bus.recv.side_effect = [TimeoutError(<span class="c-st">"sin respuesta"</span>), TimeoutError(<span class="c-st">"sin respuesta"</span>), <span class="c-st">b'\x62\xF1\x90'</span>]

    resultado = leer_con_reintentos(bus, max_intentos=<span class="c-nb">3</span>)

    <span class="c-bi">self</span>.assertEqual(resultado, <span class="c-st">b'\x62\xF1\x90'</span>)
    <span class="c-bi">self</span>.assertEqual(bus.recv.call_count, <span class="c-nb">3</span>)

<span class="c-cm"># patch como context manager — reemplazo acotado a un bloque, no a toda la función</span>
<span class="c-kw">def</span> <span class="c-fn">test_lee_config_si_archivo_existe</span>(<span class="c-bi">self</span>):
    <span class="c-kw">with</span> patch(<span class="c-st">"os.path.exists"</span>, return_value=<span class="c-kw">True</span>):
        resultado = load_config(<span class="c-st">"bench_config.yaml"</span>)  <span class="c-cm"># cree que el archivo existe</span>
    <span class="c-bi">self</span>.assertIsNotNone(resultado)</pre></div>
  </div>
  <div id="utm-3" class="tab-panel">
<div class="concept-intro">Mockear mal es peor que no mockear: da falsa confianza (el test pasa siempre, aunque el código real esté roto) porque termina probando el mock en vez de probar el comportamiento real.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-dc">@patch(</span><span class="c-st">"can.CANInterface"</span><span class="c-dc">)</span>  <span class="c-cm"># patchea donde se DEFINE, no donde se USA</span>
<span class="c-kw">def</span> <span class="c-fn">test_send_ignition_on</span>(<span class="c-bi">self</span>, mock_can):
    controller = MyController()  <span class="c-cm"># mycontroller.py hace: from can import CANInterface</span>
    controller.send_ignition_on()
    mock_can.return_value.send.assert_called_with(<span class="c-nb">0x105</span>, [<span class="c-nb">1</span>])
<span class="c-cm"># AssertionError — el mock nunca se usó, MyController sigue usando el CANInterface real</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-dc">@patch(</span><span class="c-st">"mycontroller.CANInterface"</span><span class="c-dc">)</span>  <span class="c-cm"># patchea donde SE IMPORTA/USA</span>
<span class="c-kw">def</span> <span class="c-fn">test_send_ignition_on</span>(<span class="c-bi">self</span>, mock_can):
    controller = MyController()
    controller.send_ignition_on()
    mock_can.return_value.send.assert_called_with(<span class="c-nb">0x105</span>, [<span class="c-nb">1</span>])</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>@patch</code> reemplaza el nombre en el NAMESPACE donde se usa, no en el módulo donde el objeto fue originalmente definido. Si <code>mycontroller.py</code> hace <code>from can import CANInterface</code>, ese módulo tiene su propia referencia local llamada <code>mycontroller.CANInterface</code> — patchear <code>can.CANInterface</code> deja esa referencia local intacta. Es el error de mock más común y confuso, porque el test no falla con un error obvio, sino con un assert de "no fue llamado".</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_leer_dtcs</span>(<span class="c-bi">self</span>):
    ecu = Mock()
    ecu.raed_dtcs.return_value = [<span class="c-st">'P0301'</span>]  <span class="c-cm"># typo: raed en vez de read</span>
    resultado = diagnosticar(ecu)
    <span class="c-cm"># diagnosticar() llama a ecu.read_dtcs() (bien escrito) → Mock lo acepta</span>
    <span class="c-cm"># igual, retornando un Mock vacío en vez de fallar por el typo</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_leer_dtcs</span>(<span class="c-bi">self</span>):
    ecu = Mock(spec=ECUReal)  <span class="c-cm"># o @patch(..., autospec=True)</span>
    ecu.raed_dtcs.return_value = [<span class="c-st">'P0301'</span>]
    <span class="c-cm"># AttributeError inmediato: 'Mock object has no attribute raed_dtcs'</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> un <code>Mock()</code> sin <code>spec</code> acepta CUALQUIER nombre de atributo o método, incluyendo typos. Un typo en el nombre configurado (<code>raed_dtcs</code>) simplemente crea un atributo mock nuevo que nunca se usa, mientras que el código real sigue llamando a <code>read_dtcs</code> (correctamente escrito) y recibe un Mock por defecto vacío en vez del valor configurado. Usar <code>spec=ClaseReal</code> o <code>autospec=True</code> hace que el mock valide los nombres contra la interfaz real.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_todo_el_pipeline_de_diagnostico</span>(<span class="c-bi">self</span>):
    <span class="c-kw">with</span> patch(<span class="c-st">"mymodule.CANInterface"</span>) <span class="c-kw">as</span> mock_can, \
         patch(<span class="c-st">"mymodule.UDSSession"</span>) <span class="c-kw">as</span> mock_uds, \
         patch(<span class="c-st">"mymodule.DTCParser"</span>) <span class="c-kw">as</span> mock_parser, \
         patch(<span class="c-st">"mymodule.Logger"</span>) <span class="c-kw">as</span> mock_log:
        <span class="c-cm"># mockea TODO — el test ya no prueba integración real de nada</span>
        ...</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_parser_extrae_dtcs_de_respuesta_uds</span>(<span class="c-bi">self</span>):
    <span class="c-cm"># Mockea SOLO la dependencia externa real (el bus CAN)</span>
    <span class="c-cm"># DTCParser real corre de verdad — es lo que este test quiere validar</span>
    <span class="c-kw">with</span> patch(<span class="c-st">"mymodule.CANInterface"</span>) <span class="c-kw">as</span> mock_can:
        mock_can.return_value.recv.return_value = <span class="c-st">b'\x59\x02\xFF\x03\x01\x00'</span>
        resultado = ejecutar_diagnostico()
    <span class="c-bi">self</span>.assertIn(<span class="c-st">'P0301'</span>, resultado.dtcs)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> mockear cada dependencia interna del sistema bajo prueba convierte el test en una tautología — verificas que tus mocks devuelven lo que configuraste, no que tu código realmente integra bien esas piezas. Mockea solo el borde externo real (hardware, red, sistema de archivos, tiempo); deja que la lógica interna del propio código corra sin mockear para que el test detecte bugs de integración reales.</div>
  </div>
  <div id="utm-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Patchea donde el nombre se USA, no donde se DEFINE</div>
  <p>Regla mnemotécnica: "patch donde se busca (lookup), no donde vive". Si <code>mycontroller.py</code> hace <code>from can import CANInterface</code>, patchea <code>"mycontroller.CANInterface"</code>, nunca <code>"can.CANInterface"</code>.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa spec o autospec para que el mock valide la interfaz real</div>
  <p><code>Mock(spec=ClaseReal)</code> o <code>@patch(..., autospec=True)</code> lanzan AttributeError ante typos o cambios de firma, en vez de aceptar silenciosamente cualquier nombre — detecta bugs que un Mock genérico esconde.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Mockea solo el borde externo real: hardware, red, tiempo, sistema de archivos</div>
  <p>No mockees clases internas de tu propio dominio solo por comodidad. Cuantas más piezas reales interactúen en el test, más bugs de integración detecta; cuantas más mockees, más se acerca el test a "probar la configuración del mock".</p>
</div>
<div class="practice-card">
  <div class="practice-title">Verifica CÓMO se usó el mock, no solo el resultado final</div>
  <p><code>assert_called_once_with(...)</code>, <code>call_count</code>, o <code>assert_not_called()</code> confirman que tu código invocó la dependencia con los argumentos correctos — importante cuando el "resultado" visible sería el mismo aunque la llamada real estuviera mal (ej. IDs de CAN incorrectos).</p>
</div>
<div class="practice-card">
  <div class="practice-title">side_effect con lista para simular secuencias realistas (reintentos, degradación)</div>
  <p>Simular "falla dos veces y luego responde" con <code>side_effect = [Timeout(), Timeout(), respuesta_ok]</code> prueba la lógica de reintentos de tu código sin necesitar un bench físico fallando de verdad.</p>
</div>
  </div>
  <div id="utm-5" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Tu módulo hace <code>from requests import get</code> y quieres mockear la llamada HTTP. ¿Patcheas "requests.get" o "mimodulo.get"?<span class="q-arr">▶</span></div><div class="quiz-a"><b>"mimodulo.get"</b> — donde se usa/importa, no donde se define originalmente. Cuando haces <code>from requests import get</code>, tu módulo crea su propia referencia local llamada <code>get</code> dentro de su propio namespace; patchear <code>requests.get</code> no afecta esa referencia local ya vinculada.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Cuándo necesitas MagicMock en vez de Mock simple?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Cuando el objeto real se usa con protocolos especiales de Python</b>: como context manager (<code>with obj:</code>), como iterable (<code>for x in obj</code>), con <code>len(obj)</code>, con indexado (<code>obj[0]</code>), etc. MagicMock implementa los métodos mágicos (<code>__enter__</code>, <code>__iter__</code>, <code>__len__</code>...) que Mock simple no soporta por defecto.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>¿Qué diferencia hay entre configurar return_value y side_effect con una excepción?<span class="q-arr">▶</span></div><div class="quiz-a"><b>return_value define qué se RETORNA al llamar al mock; side_effect con una excepción hace que la llamada LANCE esa excepción en vez de retornar nada.</b> mock.foo.return_value = ValueError() haría que foo() retorne un objeto ValueError (sin lanzarlo); mock.foo.side_effect = ValueError() hace que foo() efectivamente lance la excepción, que es lo que necesitas para probar manejo de errores con assertRaises.</div></div>
</div>
  </div>
</div>`,

'ut-decoradores': `
<div class="tab-group-utd">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'utd-1','utd')">skip / skipIf / skipUnless</button>
    <button class="tab-btn" onclick="switchTab(this,'utd-2','utd')">expectedFailure y más</button>
    <button class="tab-btn" onclick="switchTab(this,'utd-3','utd')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'utd-4','utd')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'utd-5','utd')">Quiz</button>
  </div>
  <div id="utd-1" class="tab-panel active">
<div class="concept-intro">Los decoradores de <code>unittest</code> permiten marcar un test para que <strong>no se ejecute</strong> (o se ejecute condicionalmente) sin borrarlo ni comentarlo. Esto es clave en proyectos automotrices donde muchos tests dependen de hardware físico (un banco HIL, un adaptador CAN conectado por USB) que no siempre está disponible — por ejemplo en un runner de CI en la nube. En vez de que esos tests fallen (rojo falso) o desaparezcan (se olvidan), quedan visibles como <em>saltados</em> con una razón explícita.</div>
<table class="kv-table"><tr><th>Decorador</th><th>Cuándo se salta</th><th>Ejemplo → Resultado</th></tr>
<tr><td>@unittest.skip(razon)</td><td>Siempre, incondicionalmente</td><td>@unittest.skip("HIL no disponible") → test nunca corre, aparece como "s" en el reporte</td></tr>
<tr><td>@unittest.skipIf(cond, razon)</td><td>Si cond es True</td><td>skipIf(sys.platform == "win32", "solo Linux") → salta en Windows, corre en Linux</td></tr>
<tr><td>@unittest.skipUnless(cond, razon)</td><td>Si cond es False (inverso de skipIf)</td><td>skipUnless(HIL_AVAILABLE, "requiere bench") → corre SOLO si HIL_AVAILABLE es True</td></tr>
<tr><td>self.skipTest(razon)</td><td>En runtime, dentro del cuerpo del test</td><td>if not bench.ping(): self.skipTest("bench no responde") → decisión dinámica, no estática</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — skip condicional en tests de banco HIL</div><pre>
<span class="c-kw">import</span> unittest, sys, os

HIL_AVAILABLE = os.environ.get(<span class="c-st">"HIL_BENCH"</span>) == <span class="c-st">"1"</span>

<span class="c-kw">class</span> <span class="c-fn">TestHILBench</span>(unittest.TestCase):

    <span class="c-dc">@unittest.skip</span>(<span class="c-st">"Banco HIL retirado de laboratorio para mantenimiento"</span>)
    <span class="c-kw">def</span> <span class="c-fn">test_hardware_legacy</span>(<span class="c-bi">self</span>):
        ...  <span class="c-cm"># nunca corre, sin importar el entorno</span>

    <span class="c-dc">@unittest.skipIf</span>(sys.platform == <span class="c-st">"win32"</span>, <span class="c-st">"Socket CAN solo existe en Linux"</span>)
    <span class="c-kw">def</span> <span class="c-fn">test_can_socket_linux</span>(<span class="c-bi">self</span>):
        ...  <span class="c-cm"># se salta en Windows, corre en Linux/CI</span>

    <span class="c-dc">@unittest.skipUnless</span>(HIL_AVAILABLE, <span class="c-st">"Requiere HIL_BENCH=1 en el entorno"</span>)
    <span class="c-kw">def</span> <span class="c-fn">test_sensor_real</span>(<span class="c-bi">self</span>):
        ...  <span class="c-cm"># solo corre en el runner que sí tiene el bench conectado</span>

    <span class="c-kw">def</span> <span class="c-fn">test_lectura_dinamica</span>(<span class="c-bi">self</span>):
        <span class="c-cm"># skipTest() decide EN TIEMPO DE EJECUCIÓN, no al cargar el módulo</span>
        <span class="c-kw">if</span> <span class="c-kw">not</span> bench.ping():
            <span class="c-bi">self</span>.skipTest(<span class="c-st">"Bench no responde al ping"</span>)
        <span class="c-bi">self</span>.assertTrue(bench.read_sensor(<span class="c-st">"coolant_temp"</span>) &gt; <span class="c-nb">0</span>)</pre></div>
  </div>
  <div id="utd-2" class="tab-panel">
<div class="concept-intro">Además de saltar tests, unittest permite documentar <strong>fallas conocidas</strong> con <code>@expectedFailure</code>: el test corre normalmente, pero si falla se reporta como "esperado" (x) en vez de rojo, y si de repente <em>pasa</em>, unittest lo marca como <strong>unexpected success</strong> (u) — una señal útil de "¡alguien arregló el bug, actualiza el decorador!". También existen decoradores a nivel de clase completa.</div>
<div class="code-block"><div class="code-lang">Python — expectedFailure y decoradores a nivel de clase</div><pre>
<span class="c-kw">class</span> <span class="c-fn">TestParserProtocolo</span>(unittest.TestCase):

    <span class="c-dc">@unittest.expectedFailure</span>
    <span class="c-kw">def</span> <span class="c-fn">test_bug_conocido_JIRA_4521</span>(<span class="c-bi">self</span>):
        <span class="c-cm"># bug real, reportado, con ticket — el test documenta el comportamiento esperado</span>
        <span class="c-bi">self</span>.assertEqual(parse_odometer(<span class="c-st">"FF FF FF FF"</span>), <span class="c-kw">None</span>)
        <span class="c-cm"># hoy retorna un valor basura en vez de None → falla, pero es "esperado" (x)</span>
        <span class="c-cm"># si algún día se arregla el parser, este test pasa → aparece como "u" (unexpected success)</span>

<span class="c-cm"># Saltar TODA la clase — útil cuando toda una suite depende de un recurso</span>
<span class="c-dc">@unittest.skipUnless</span>(HIL_AVAILABLE, <span class="c-st">"Suite completa requiere banco HIL físico"</span>)
<span class="c-kw">class</span> <span class="c-fn">TestIgnitionSequenceReal</span>(unittest.TestCase):
    <span class="c-kw">def</span> <span class="c-fn">test_arranque_frio</span>(<span class="c-bi">self</span>): ...
    <span class="c-kw">def</span> <span class="c-fn">test_arranque_caliente</span>(<span class="c-bi">self</span>): ...

<span class="c-cm"># addCleanup — registra limpieza sin necesidad de tearDown, ideal junto a skip dinámico</span>
<span class="c-kw">class</span> <span class="c-fn">TestConexionCAN</span>(unittest.TestCase):
    <span class="c-kw">def</span> <span class="c-fn">test_envio_frame</span>(<span class="c-bi">self</span>):
        can = CANInterface.open(<span class="c-st">"can0"</span>)
        <span class="c-bi">self</span>.addCleanup(can.close)  <span class="c-cm"># se ejecuta SIEMPRE, incluso si el test falla o se salta a mitad</span>
        can.send(<span class="c-nb">0x105</span>, [<span class="c-nb">1</span>, <span class="c-nb">0</span>])</pre></div>
  </div>
  <div id="utd-3" class="tab-panel">
<div class="concept-intro">Estos decoradores son fáciles de usar mal porque parecen "solo comentar un test", pero cada mal uso tiene un costo distinto: cobertura falsa, tests fantasma que nunca corren en ningún entorno, o razones vacías que no ayudan a nadie seis meses después.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-dc">@unittest.skip</span>(<span class="c-st">""</span>)
<span class="c-kw">def</span> <span class="c-fn">test_frenado_emergencia</span>(<span class="c-bi">self</span>):
    ...
<span class="c-cm"># sin razón — nadie sabe POR QUÉ está saltado ni si sigue siendo válido</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-dc">@unittest.skip</span>(<span class="c-st">"JIRA-8831: sensor de frenado no soportado en bench v2, pendiente firmware"</span>)
<span class="c-kw">def</span> <span class="c-fn">test_frenado_emergencia</span>(<span class="c-bi">self</span>):
    ...</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> es tentador saltar un test roto "por ahora" sin documentar. Meses después nadie recuerda si el skip sigue vigente, si el hardware ya se arregló, o si el test simplemente quedó huérfano. La razón (con ticket si aplica) convierte el skip en información accionable, no en deuda técnica invisible.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_lectura_bench</span>(<span class="c-bi">self</span>):
    <span class="c-kw">try</span>:
        valor = bench.read_sensor(<span class="c-st">"rpm"</span>)
    <span class="c-kw">except</span> ConnectionError:
        <span class="c-kw">return</span>  <span class="c-cm"># "sale silenciosamente" — unittest lo cuenta como PASSED</span>
    <span class="c-bi">self</span>.assertGreater(valor, <span class="c-nb">0</span>)</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_lectura_bench</span>(<span class="c-bi">self</span>):
    <span class="c-kw">try</span>:
        valor = bench.read_sensor(<span class="c-st">"rpm"</span>)
    <span class="c-kw">except</span> ConnectionError:
        <span class="c-bi">self</span>.skipTest(<span class="c-st">"Bench inalcanzable — verificar cableado/USB"</span>)
    <span class="c-bi">self</span>.assertGreater(valor, <span class="c-nb">0</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> un <code>return</code> temprano dentro de un try/except hace que el test termine "sin error" y unittest lo marca como PASSED — cobertura falsa, el test no verificó nada. <code>self.skipTest()</code> comunica correctamente al reporte que el test no se ejecutó por una condición externa, distinguiéndolo de un test que realmente pasó.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-dc">@unittest.expectedFailure</span>
<span class="c-kw">def</span> <span class="c-fn">test_calculo_torque</span>(<span class="c-bi">self</span>):
    <span class="c-bi">self</span>.assertEqual(calcular_torque(<span class="c-nb">100</span>, <span class="c-nb">2000</span>), <span class="c-nb">477.4</span>)
<span class="c-cm"># se usó como excusa para "no arreglar" un bug sin ticket ni seguimiento</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-cm"># expectedFailure documenta, no reemplaza arreglar el bug.</span>
<span class="c-cm"># Vincula siempre a un ticket con dueño y fecha de revisión:</span>
<span class="c-dc">@unittest.expectedFailure</span>  <span class="c-cm"># JIRA-9012 — asignado a firmware team, revisar en sprint 24</span>
<span class="c-kw">def</span> <span class="c-fn">test_calculo_torque</span>(<span class="c-bi">self</span>):
    <span class="c-bi">self</span>.assertEqual(calcular_torque(<span class="c-nb">100</span>, <span class="c-nb">2000</span>), <span class="c-nb">477.4</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>expectedFailure</code> es útil para documentar bugs conocidos sin ensuciar el reporte de CI con rojo, pero sin un ticket y seguimiento se convierte en un cementerio de bugs "aceptados para siempre". Trátalo como una promesa temporal, no como una forma de bajar el estándar de calidad.</div>
  </div>
  <div id="utd-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Siempre incluye una razón específica y accionable en el skip</div>
  <p>"No funciona" no ayuda a nadie. "JIRA-4521: requiere firmware v2.3, bench actual tiene v2.1" sí. Si hay ticket, inclúyelo — así cualquiera puede saber si el skip sigue vigente.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Prefiere skipUnless sobre skip para dependencias de entorno</div>
  <p>Si el test SÍ puede correr en algunos entornos (CI con HIL conectado) y no en otros (laptop de desarrollo), usa <code>skipUnless(condicion, razon)</code> en vez de <code>skip</code> incondicional — así el test corre donde debe, en vez de quedar siempre apagado.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa self.skipTest() cuando la decisión depende de runtime, no de import time</div>
  <p>Los decoradores evalúan su condición al <em>cargar el módulo</em>. Si necesitas verificar algo que solo se sabe durante el test (por ejemplo, hacer ping al bench), usa <code>self.skipTest(razon)</code> dentro del cuerpo del test.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Audita periódicamente los tests con @skip y @expectedFailure</div>
  <p>Corre <code>grep -rn "@unittest.skip\|@unittest.expectedFailure"</code> en cada revisión de sprint. Un test saltado hace 8 meses sin ticket activo probablemente deba eliminarse o arreglarse, no seguir acumulando polvo.</p>
</div>
<div class="practice-card">
  <div class="practice-title">No uses skip para "arreglarlo después" sin trazabilidad</div>
  <p>Un skip sin ticket es deuda técnica invisible en el reporte de CI (todo se ve verde). Vincula cada skip permanente a un issue rastreable con dueño asignado.</p>
</div>
  </div>
  <div id="utd-5" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Un test marcado con <code>@unittest.expectedFailure</code> de repente PASA (el bug se arregló sin que nadie quite el decorador). ¿Qué reporta unittest?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Unexpected success (marcado como "u"), no un PASSED normal.</b> unittest detecta que un test que "se esperaba que fallara" en realidad pasó, y lo señala como anomalía para que alguien revise y quite el decorador — es una señal, no un error silencioso.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Cuál es la diferencia entre <code>@unittest.skipIf(cond, razon)</code> y <code>@unittest.skipUnless(cond, razon)</code>?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Son inversos.</b> <code>skipIf</code> salta el test CUANDO la condición es True. <code>skipUnless</code> salta el test A MENOS QUE la condición sea True (es decir, solo corre si es True). Se usan según cuál lectura sea más natural: "salta si estoy en Windows" vs "corre solo si tengo el bench".</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿Por qué <code>self.skipTest("razon")</code> dentro del cuerpo del test NO es equivalente a poner un <code>@unittest.skip("razon")</code> arriba del método?<span class="q-arr">▶</span></div><div class="quiz-a"><b>El decorador decide ANTES de ejecutar nada del test (import time), mientras que skipTest() decide EN MEDIO de la ejecución (runtime).</b> Esto permite lógica dinámica: por ejemplo, intentar conectar al bench y solo saltar si realmente falla, en vez de saltar siempre de forma incondicional sin siquiera intentarlo.</div></div>
</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre decoradores de test...</p>
</div>`,

'ut-subtest': `
<div class="tab-group-utb">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'utb-1','utb')">subTest() y por qué existe</button>
    <button class="tab-btn" onclick="switchTab(this,'utb-2','utb')">Casos de uso reales</button>
    <button class="tab-btn" onclick="switchTab(this,'utb-3','utb')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'utb-4','utb')">✅ Mejores Prácticas + Quiz</button>
  </div>
  <div id="utb-1" class="tab-panel active">
<div class="concept-intro"><code>subTest()</code> es un context manager de <code>unittest.TestCase</code> que permite ejecutar <strong>múltiples verificaciones dentro de un mismo método de test</strong> sin que el primer fallo detenga las demás. Sin él, un <code>for</code> con varios <code>assert</code> se comporta como una carrera de eliminación: en cuanto uno falla, el resto del loop nunca corre y no sabes si los demás casos también estaban rotos. Es la forma "nativa" de unittest de aproximarse a lo que pytest resuelve con <code>@pytest.mark.parametrize</code>.</div>
<div class="code-block"><div class="code-lang">Python — El problema sin subTest</div><pre>
<span class="c-kw">def</span> <span class="c-fn">test_parse_can_frames_SIN_subtest</span>(<span class="c-bi">self</span>):
    casos = [
        (<span class="c-st">"0x100"</span>, [<span class="c-nb">0x01</span>, <span class="c-nb">0x00</span>], <span class="c-st">"IGN_ON"</span>),
        (<span class="c-st">"0x100"</span>, [<span class="c-nb">0x00</span>, <span class="c-nb">0x00</span>], <span class="c-st">"IGN_OFF"</span>),
        (<span class="c-st">"0x200"</span>, [<span class="c-nb">0xFF</span>, <span class="c-nb">0x00</span>], <span class="c-st">"BRAKE_MAX"</span>),
    ]
    <span class="c-kw">for</span> msg_id, data, esperado <span class="c-kw">in</span> casos:
        resultado = parse_frame(msg_id, data)
        <span class="c-bi">self</span>.assertEqual(resultado, esperado)
        <span class="c-cm"># si el PRIMER caso falla, el test se detiene ahí.</span>
        <span class="c-cm"># nunca sabes si "0x200" también estaba roto.</span></pre></div>
<div class="code-block"><div class="code-lang">Python — Con subTest, todos los casos corren</div><pre>
<span class="c-kw">def</span> <span class="c-fn">test_parse_can_frames</span>(<span class="c-bi">self</span>):
    casos = [
        (<span class="c-st">"0x100"</span>, [<span class="c-nb">0x01</span>, <span class="c-nb">0x00</span>], <span class="c-st">"IGN_ON"</span>),
        (<span class="c-st">"0x100"</span>, [<span class="c-nb">0x00</span>, <span class="c-nb">0x00</span>], <span class="c-st">"IGN_OFF"</span>),
        (<span class="c-st">"0x200"</span>, [<span class="c-nb">0xFF</span>, <span class="c-nb">0x00</span>], <span class="c-st">"BRAKE_MAX"</span>),
    ]
    <span class="c-kw">for</span> msg_id, data, esperado <span class="c-kw">in</span> casos:
        <span class="c-kw">with</span> <span class="c-bi">self</span>.subTest(msg_id=msg_id, data=data):
            resultado = parse_frame(msg_id, data)
            <span class="c-bi">self</span>.assertEqual(resultado, esperado)
<span class="c-cm"># Si "0x100" falla, "0x200" IGUAL se ejecuta y se reporta.</span>
<span class="c-cm"># El reporte final muestra CADA subTest fallido por separado, con sus parámetros.</span></pre></div>
  </div>
  <div id="utb-2" class="tab-panel">
<div class="concept-intro">El caso de uso más común en un entorno automotriz es <strong>validar tablas de casos</strong>: mapeos de tramas CAN a estados, códigos DTC a descripciones, señales de bus a rangos válidos. <code>subTest</code> te da visibilidad completa de cuáles filas de la tabla pasan y cuáles fallan, en una sola corrida — crítico cuando tienes 40 códigos de falla y solo 3 están mal.</div>
<table class="kv-table"><tr><th>Enfoque</th><th>Cuándo usarlo</th><th>Ejemplo → Resultado</th></tr>
<tr><td>for + subTest (unittest)</td><td>Ya usas unittest.TestCase y no quieres migrar a pytest</td><td>with self.subTest(caso=x) → cada iteración se reporta independiente</td></tr>
<tr><td>@pytest.mark.parametrize</td><td>Proyecto usa pytest — genera un test SEPARADO por caso</td><td>parametrize("a,b", casos) → N tests distintos en el reporte, no 1 con N subcasos</td></tr>
<tr><td>Loop simple con assert</td><td>Solo prototipos rápidos, nunca en CI real</td><td>for x in casos: assert x → se detiene en el primer fallo, pierdes visibilidad</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — Validar tabla de códigos DTC con subTest</div><pre>
<span class="c-kw">class</span> <span class="c-fn">TestDTCDescriptions</span>(unittest.TestCase):

    <span class="c-kw">def</span> <span class="c-fn">test_todos_los_dtc_tienen_descripcion_valida</span>(<span class="c-bi">self</span>):
        tabla_dtc = cargar_tabla_dtc(<span class="c-st">"dtc_codes.json"</span>)  <span class="c-cm"># ~40 códigos</span>
        <span class="c-kw">for</span> codigo, entrada <span class="c-kw">in</span> tabla_dtc.items():
            <span class="c-kw">with</span> <span class="c-bi">self</span>.subTest(dtc=codigo):
                <span class="c-bi">self</span>.assertIn(<span class="c-st">"description"</span>, entrada)
                <span class="c-bi">self</span>.assertTrue(entrada[<span class="c-st">"description"</span>].strip())
                <span class="c-bi">self</span>.assertIn(entrada[<span class="c-st">"severity"</span>], (<span class="c-st">"LOW"</span>, <span class="c-st">"MEDIUM"</span>, <span class="c-st">"HIGH"</span>, <span class="c-st">"CRITICAL"</span>))

<span class="c-cm"># Salida si P0301 y P0420 están mal, el resto bien:</span>
<span class="c-cm"># FAIL: test_todos_los_dtc_tienen_descripcion_valida (dtc='P0301')</span>
<span class="c-cm"># FAIL: test_todos_los_dtc_tienen_descripcion_valida (dtc='P0420')</span>
<span class="c-cm"># los otros 38 casos se muestran como pasados — visibilidad total</span></pre></div>
  </div>
  <div id="utb-3" class="tab-panel">
<div class="concept-intro">subTest es simple, pero tiene trampas sutiles alrededor de qué pasa cuando algo lanza una excepción real (no solo un assert fallido) y cómo se relaciona con setUp/tearDown.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">for</span> frame <span class="c-kw">in</span> frames_de_prueba:
    <span class="c-kw">with</span> <span class="c-bi">self</span>.subTest(frame=frame):
        resultado = parse_frame(frame)  <span class="c-cm"># puede lanzar ValueError si frame malformado</span>
        <span class="c-bi">self</span>.assertIsNotNone(resultado)
<span class="c-cm"># si parse_frame() lanza una excepción NO capturada (no un assert),</span>
<span class="c-cm"># subTest SÍ la reporta, pero puede confundirse con un fallo de assert en el reporte</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">for</span> frame <span class="c-kw">in</span> frames_de_prueba:
    <span class="c-kw">with</span> <span class="c-bi">self</span>.subTest(frame=frame):
        <span class="c-kw">try</span>:
            resultado = parse_frame(frame)
        <span class="c-kw">except</span> ValueError <span class="c-kw">as</span> e:
            <span class="c-bi">self</span>.fail(<span class="c-st">f"parse_frame({frame}) lanzó ValueError: {e}"</span>)
        <span class="c-bi">self</span>.assertIsNotNone(resultado)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> subTest captura tanto AssertionError como excepciones inesperadas y las reporta por separado, pero un mensaje de excepción cruda ("ValueError: invalid literal") es menos claro que un <code>self.fail()</code> con contexto explícito de qué frame la causó. Cuando el error puede venir de código externo, envuélvelo para dar contexto legible.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_validar_sensores</span>(<span class="c-bi">self</span>):
    <span class="c-kw">for</span> sensor_id <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">1</span>, <span class="c-nb">51</span>):
        <span class="c-kw">with</span> <span class="c-bi">self</span>.subTest(sensor_id=sensor_id):
            bench.reset()  <span class="c-cm"># reset dentro del subTest — se repite 50 veces, lento</span>
            valor = bench.read_sensor(sensor_id)
            <span class="c-bi">self</span>.assertGreater(valor, <span class="c-nb">0</span>)</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">setUp</span>(<span class="c-bi">self</span>):
    bench.reset()  <span class="c-cm"># una sola vez, antes de TODO el método de test</span>

<span class="c-kw">def</span> <span class="c-fn">test_validar_sensores</span>(<span class="c-bi">self</span>):
    <span class="c-kw">for</span> sensor_id <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">1</span>, <span class="c-nb">51</span>):
        <span class="c-kw">with</span> <span class="c-bi">self</span>.subTest(sensor_id=sensor_id):
            valor = bench.read_sensor(sensor_id)
            <span class="c-bi">self</span>.assertGreater(valor, <span class="c-nb">0</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> subTest NO ejecuta setUp/tearDown por cada subcaso (solo por cada método de test completo). Poner operaciones costosas de preparación dentro del bloque <code>with subTest()</code> las repite innecesariamente en cada iteración. Muévelas fuera del loop, o a setUp si de verdad deben correr una sola vez.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">for</span> caso <span class="c-kw">in</span> casos:
    <span class="c-kw">with</span> <span class="c-bi">self</span>.subTest():  <span class="c-cm"># sin parámetros — no dice CUÁL caso falló</span>
        <span class="c-bi">self</span>.assertEqual(procesar(caso), caso.esperado)</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">for</span> caso <span class="c-kw">in</span> casos:
    <span class="c-kw">with</span> <span class="c-bi">self</span>.subTest(caso=caso.nombre, entrada=caso.entrada):
        <span class="c-bi">self</span>.assertEqual(procesar(caso), caso.esperado)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>subTest()</code> acepta kwargs arbitrarios que se muestran en el reporte de fallo. Sin ellos, un fallo solo dice "subTest failed" sin indicar cuál iteración — pierdes exactamente la ventaja principal de usar subTest en primer lugar.</div>
  </div>
  <div id="utb-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Siempre pasa parámetros identificadores a subTest()</div>
  <p><code>self.subTest(msg_id=msg_id)</code> en vez de <code>self.subTest()</code> vacío — el reporte de fallo debe decir exactamente qué caso falló sin que tengas que adivinar contando iteraciones.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Prepara datos costosos ANTES del loop, no dentro del subTest</div>
  <p>Conexiones, resets de hardware, cargas de archivos grandes van en <code>setUp()</code> o antes del <code>for</code>. Dentro del <code>with subTest()</code> solo debe ir la lógica que varía por caso.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Si el proyecto usa pytest, prefiere parametrize sobre subTest</div>
  <p><code>subTest</code> es la herramienta correcta en código legacy con unittest. Si estás empezando un proyecto nuevo con pytest, <code>@pytest.mark.parametrize</code> da tests verdaderamente independientes (cada caso es su propio test en el reporte, no un subcaso agrupado).</p>
</div>
<div class="practice-card">
  <div class="practice-title">No mezcles assertRaises con subTest sin pensarlo — captura la excepción dentro del bloque</div>
  <p>Si un caso de la tabla espera que <code>parse_frame</code> lance una excepción, usa <code>with self.subTest(...): with self.assertRaises(ValueError): parse_frame(caso)</code> — ambos context managers anidados, no una excepción sin capturar que rompería el subTest de forma confusa.</p>
</div>
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Dentro de un loop con 5 iteraciones, la iteración 3 falla un assert dentro de <code>with self.subTest(...)</code>. ¿Qué pasa con las iteraciones 4 y 5?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Se ejecutan normalmente.</b> Esa es la razón de ser de subTest: cada bloque <code>with self.subTest()</code> captura su propio AssertionError y continúa con el resto del loop. Al final, el test se reporta como fallido en total, pero el reporte detalla cada subTest que falló individualmente (en este caso, solo el 3).</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿setUp() y tearDown() se ejecutan por cada subTest o por cada método de test?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Por cada método de test completo, NO por cada subTest.</b> Si tu método de test tiene un loop de 50 subTests, setUp corre una vez antes del método y tearDown una vez después — no 50 veces. Es un error común asumir que subTest tiene su propio lifecycle independiente.</div></div>
</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre subTest...</p>
</div>`,

'ut-doctest': `
<div class="tab-group-utx">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'utx-1','utx')">Sintaxis en docstrings</button>
    <button class="tab-btn" onclick="switchTab(this,'utx-2','utx')">Ejecutar doctests</button>
    <button class="tab-btn" onclick="switchTab(this,'utx-3','utx')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'utx-4','utx')">✅ Mejores Prácticas + Quiz</button>
  </div>
  <div id="utx-1" class="tab-panel active">
<div class="concept-intro"><strong>doctest</strong> es un módulo de la librería estándar que extrae ejemplos interactivos escritos dentro de docstrings (los que empiezan con <code>&gt;&gt;&gt;</code>, imitando una sesión de intérprete de Python) y los ejecuta como tests reales, comparando la salida esperada línea por línea. Su valor no es reemplazar unittest/pytest — es que la <strong>documentación nunca se desactualiza en silencio</strong>: si el docstring dice que la función retorna 32.0 y ahora retorna 32, el doctest falla hasta que se corrija uno de los dos.</div>
<table class="kv-table"><tr><th>Elemento</th><th>Qué representa</th><th>Ejemplo → Resultado</th></tr>
<tr><td>&gt;&gt;&gt; expresion</td><td>Línea de entrada, como en el REPL</td><td>&gt;&gt;&gt; 2 + 2 → doctest ejecuta 2 + 2</td></tr>
<tr><td>linea siguiente (sin &gt;&gt;&gt;)</td><td>Salida esperada, comparada EXACTA</td><td>4 → debe coincidir carácter por carácter con repr() del resultado</td></tr>
<tr><td>... (puntos suspensivos)</td><td>Continuación de una entrada multilínea</td><td>&gt;&gt;&gt; if True:\n...     print("x") → simula indentación del REPL</td></tr>
<tr><td># doctest: +SKIP</td><td>Excluye esa línea de la ejecución</td><td>&gt;&gt;&gt; conectar_bench_real()  # doctest: +SKIP → no corre en CI sin hardware</td></tr>
<tr><td># doctest: +ELLIPSIS</td><td>Permite "..." como comodín en la salida esperada</td><td>&lt;objeto at 0x...&gt; → coincide con cualquier dirección de memoria</td></tr>
<tr><td># doctest: +NORMALIZE_WHITESPACE</td><td>Ignora diferencias de espacios/saltos de línea</td><td>útil si el output tiene formato de tabla con alineación variable</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — doctest básico en una función de conversión</div><pre>
<span class="c-kw">def</span> <span class="c-fn">celsius_to_fahrenheit</span>(c):
    <span class="c-st">"""Convierte grados Celsius a Fahrenheit.

    &gt;&gt;&gt; celsius_to_fahrenheit(0)
    32.0
    &gt;&gt;&gt; celsius_to_fahrenheit(100)
    212.0
    &gt;&gt;&gt; celsius_to_fahrenheit(-40)
    -40.0
    """</span>
    <span class="c-kw">return</span> c * <span class="c-nb">9</span> / <span class="c-nb">5</span> + <span class="c-nb">32</span>

<span class="c-kw">def</span> <span class="c-fn">parse_can_id</span>(hex_str):
    <span class="c-st">"""Parsea un ID de arbitraje CAN desde string hexadecimal.

    &gt;&gt;&gt; parse_can_id("0x105")
    261
    &gt;&gt;&gt; parse_can_id("0x7DF")   # ID de diagnóstico OBD-II funcional
    2015
    &gt;&gt;&gt; parse_can_id("invalido")
    Traceback (most recent call last):
        ...
    ValueError: invalid literal for int() with base 16: 'invalido'
    """</span>
    <span class="c-kw">return</span> <span class="c-bi">int</span>(hex_str, <span class="c-nb">16</span>)</pre></div>
  </div>
  <div id="utx-2" class="tab-panel">
<div class="concept-intro">Hay tres formas de ejecutar doctests: desde línea de comandos para un chequeo rápido, con <code>doctest.testmod()</code> dentro del propio script, o integrado en la suite de unittest/pytest para que corra junto con el resto de los tests en CI.</div>
<div class="code-block"><div class="code-lang">Python — Tres formas de ejecutar doctests</div><pre>
<span class="c-cm"># 1) Desde la línea de comandos — rápido, sin tocar el código</span>
<span class="c-cm"># python -m doctest sensores.py           (silencioso si todo pasa)</span>
<span class="c-cm"># python -m doctest sensores.py -v        (verbose: muestra cada caso)</span>

<span class="c-cm"># 2) Dentro del propio módulo — corre al ejecutar el script directamente</span>
<span class="c-kw">if</span> __name__ == <span class="c-st">"__main__"</span>:
    <span class="c-kw">import</span> doctest
    resultados = doctest.testmod(verbose=<span class="c-kw">True</span>)
    <span class="c-bi">print</span>(<span class="c-bi">f"{resultados.attempted - resultados.failed}/{resultados.attempted} pasaron"</span>)

<span class="c-cm"># 3) Integrado con unittest — corre junto al resto de la suite en CI</span>
<span class="c-kw">import</span> doctest, unittest
<span class="c-kw">import</span> sensores  <span class="c-cm"># el módulo que contiene los docstrings con ejemplos</span>

<span class="c-kw">def</span> <span class="c-fn">load_tests</span>(loader, tests, ignore):
    <span class="c-cm"># hook estándar de unittest: agrega los doctests a la suite descubierta</span>
    tests.addTests(doctest.DocTestSuite(sensores))
    <span class="c-kw">return</span> tests

<span class="c-cm"># 4) Integrado con pytest — sin código extra, solo un flag</span>
<span class="c-cm"># pytest --doctest-modules sensores.py</span>
<span class="c-cm"># pytest --doctest-modules   (recorre todo el proyecto buscando docstrings con &gt;&gt;&gt;)</span></pre></div>
  </div>
  <div id="utx-3" class="tab-panel">
<div class="concept-intro">doctest compara texto EXACTO, lo cual es a la vez su fortaleza (documentación siempre honesta) y su principal fuente de falsos positivos cuando la salida no es 100% determinista.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">leer_timestamp</span>():
    <span class="c-st">"""
    &gt;&gt;&gt; leer_timestamp()
    1720000000.123456
    """</span>
    <span class="c-kw">return</span> time.time()  <span class="c-cm"># distinto en cada ejecución — SIEMPRE falla</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">leer_timestamp</span>():
    <span class="c-st">"""
    &gt;&gt;&gt; ts = leer_timestamp()
    &gt;&gt;&gt; isinstance(ts, float)
    True
    &gt;&gt;&gt; ts &gt; 0
    True
    """</span>
    <span class="c-kw">return</span> time.time()</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> doctest hace comparación de texto EXACTA contra la salida esperada. Cualquier valor no determinista — timestamps, IDs de memoria, orden de un set, floats con más decimales de los mostrados — rompe el test aunque el código sea correcto. La solución es verificar propiedades del resultado (tipo, rango, condición) en vez del valor literal.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">promedio</span>(valores):
    <span class="c-st">"""
    &gt;&gt;&gt; promedio([1, 2, 3])
    2.0
    &gt;&gt;&gt; promedio([10, 15, 20, 25])
    17.5
    &gt;&gt;&gt; promedio([0.1, 0.2, 0.3])
    0.20000000000000004
    """</span>
    <span class="c-kw">return</span> <span class="c-bi">sum</span>(valores) / <span class="c-bi">len</span>(valores)
<span class="c-cm"># el último caso falla en otra plataforma/versión por redondeo de floats</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">promedio</span>(valores):
    <span class="c-st">"""
    &gt;&gt;&gt; promedio([1, 2, 3])
    2.0
    &gt;&gt;&gt; round(promedio([0.1, 0.2, 0.3]), 4)
    0.2
    """</span>
    <span class="c-kw">return</span> <span class="c-bi">sum</span>(valores) / <span class="c-bi">len</span>(valores)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> la aritmética de punto flotante puede dar dígitos de precisión distintos según la plataforma. Redondear explícitamente en el ejemplo (<code>round(x, 4)</code>) hace el doctest robusto sin perder el valor documental de mostrar cómo se usa la función.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">conectar_hil</span>():
    <span class="c-st">"""
    &gt;&gt;&gt; bench = conectar_hil()
    &gt;&gt;&gt; bench.status
    'connected'
    """</span>
    <span class="c-kw">return</span> HILBench.connect(<span class="c-st">"bench-01"</span>)
<span class="c-cm"># en CI sin hardware físico, esto falla siempre — bloquea el pipeline</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">conectar_hil</span>():
    <span class="c-st">"""
    &gt;&gt;&gt; bench = conectar_hil()  # doctest: +SKIP
    &gt;&gt;&gt; bench.status           # doctest: +SKIP
    'connected'
    """</span>
    <span class="c-kw">return</span> HILBench.connect(<span class="c-st">"bench-01"</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> igual que con unittest.skip, un doctest que depende de hardware físico no puede correr en un runner de CI genérico. La directiva <code># doctest: +SKIP</code> excluye esa línea específica de la ejecución sin borrar el ejemplo documental — sigue siendo útil para un humano leyendo el docstring.</div>
  </div>
  <div id="utx-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Usa doctest para documentación viva, no como suite principal de tests</div>
  <p>doctest brilla en funciones puras y utilitarias donde el ejemplo ES la documentación (parsers, conversores, helpers matemáticos). Para lógica compleja con mocks, fixtures o hardware, unittest/pytest siguen siendo la herramienta principal.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Verifica propiedades, no valores no deterministas</div>
  <p>Si el resultado depende de tiempo, aleatoriedad o memoria, verifica <code>isinstance(x, tipo)</code> o rangos (<code>x &gt; 0</code>) en vez del valor exacto.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Integra doctest a la suite de CI con --doctest-modules o load_tests</div>
  <p>Un doctest que nadie ejecuta automáticamente es documentación que se desactualiza igual que un comentario. Agrégalo al pipeline (<code>pytest --doctest-modules</code>) para que rompa el build si el ejemplo deja de ser cierto.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Mantén los ejemplos cortos y representativos, no exhaustivos</div>
  <p>doctest no es el lugar para cubrir 40 casos de borde — eso es trabajo de unittest/pytest con subTest o parametrize. Un docstring con 2-3 ejemplos claros enseña mejor que uno saturado.</p>
</div>
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Un doctest compara la salida esperada contra la real. ¿Con qué precisión hace esa comparación?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Comparación de texto exacta, carácter por carácter</b> (salvo que uses directivas como +ELLIPSIS o +NORMALIZE_WHITESPACE). No evalúa "equivalencia" de objetos como assertEqual — compara literalmente el repr() de la salida contra el texto que escribiste en el docstring.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Cómo integras los doctests de un módulo a una suite de unittest existente?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Con doctest.DocTestSuite(modulo)</b>, agregándolo dentro de una función <code>load_tests(loader, tests, ignore)</code> en el archivo de test, o simplemente ejecutando <code>pytest --doctest-modules</code> si el proyecto usa pytest — no requiere código extra.</div></div>
</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre doctest...</p>
</div>`,

'pt-intro': `
<div class="tab-group-pti">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pti-1','pti')">pytest vs unittest</button>
    <button class="tab-btn" onclick="switchTab(this,'pti-2','pti')">Sintaxis básica</button>
    <button class="tab-btn" onclick="switchTab(this,'pti-3','pti')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'pti-4','pti')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'pti-5','pti')">Quiz</button>
  </div>
  <div id="pti-1" class="tab-panel active">
<div class="concept-intro"><strong>pytest</strong> es un framework de testing de terceros (no viene en la librería estándar, se instala con <code>pip install pytest</code>) que se volvió el estándar de facto en la industria Python porque reduce el boilerplate de unittest sin perder potencia: tests son funciones simples (no requieren heredar de una clase), usa <code>assert</code> nativo de Python con diffs automáticos y detallados, y su sistema de <strong>fixtures</strong> es más flexible que setUp/tearDown. Sigue siendo 100% compatible con tests escritos en unittest — puede correr ambos estilos en el mismo proyecto.</div>
<table class="kv-table"><tr><th>Aspecto</th><th>unittest (stdlib)</th><th>pytest (pip install)</th></tr>
<tr><td>Definir un test</td><td>Método dentro de una clase que hereda TestCase</td><td>Función simple con prefijo test_, sin herencia</td></tr>
<tr><td>Verificar condiciones</td><td>self.assertEqual(a, b), self.assertTrue(x)...</td><td>assert a == b, assert x — Python nativo</td></tr>
<tr><td>Mensaje de fallo</td><td>Genérico salvo que pases msg= manualmente</td><td>Introspección automática: muestra ambos valores y el diff</td></tr>
<tr><td>Setup/teardown</td><td>setUp/tearDown/setUpClass/tearDownClass fijos</td><td>Fixtures con @pytest.fixture — nombres propios, inyección por parámetro, scope configurable</td></tr>
<tr><td>Parametrizar casos</td><td>subTest() dentro del mismo test, o loops manuales</td><td>@pytest.mark.parametrize — cada caso es un test independiente en el reporte</td></tr>
<tr><td>Plugins/ecosistema</td><td>Ninguno oficial — todo manual</td><td>Enorme ecosistema: pytest-cov, pytest-mock, pytest-xdist (paralelo), pytest-timeout</td></tr>
<tr><td>Requiere instalación externa</td><td>No — viene con Python</td><td>Sí — pip install pytest (relevante en entornos embebidos/restringidos)</td></tr>
<tr><td>Ejecutar tests de unittest</td><td>N/A (es el propio)</td><td>Sí, pytest ejecuta clases TestCase de unittest sin cambios</td></tr>
</table>
  </div>
  <div id="pti-2" class="tab-panel">
<div class="concept-intro">La sintaxis de pytest elimina casi todo el ceremonial: no hay clases obligatorias, no hay métodos assert* que memorizar — solo <code>assert</code> con una expresión booleana, y pytest hace <em>introspección del AST</em> para mostrarte exactamente qué valores hicieron que la expresión fuera falsa.</div>
<div class="code-block"><div class="code-lang">Python — Tests básicos con assert plano</div><pre>
<span class="c-cm"># pip install pytest</span>
<span class="c-cm"># archivo: test_can_parser.py  (el prefijo test_ es obligatorio para el descubrimiento)</span>

<span class="c-kw">def</span> <span class="c-fn">test_suma</span>():
    <span class="c-kw">assert</span> <span class="c-nb">1</span> + <span class="c-nb">1</span> == <span class="c-nb">2</span>

<span class="c-kw">def</span> <span class="c-fn">test_parse_frame_valido</span>():
    resultado = parse_frame(<span class="c-st">"0x100"</span>, [<span class="c-nb">0x01</span>, <span class="c-nb">0x00</span>])
    <span class="c-kw">assert</span> resultado == <span class="c-st">"IGN_ON"</span>

<span class="c-kw">def</span> <span class="c-fn">test_parse_frame_lista_completa</span>():
    <span class="c-cm"># comparar estructuras completas — pytest muestra el diff exacto si falla</span>
    <span class="c-kw">assert</span> parse_bulk([<span class="c-st">"0x100"</span>, <span class="c-st">"0x200"</span>]) == [<span class="c-st">"IGN_ON"</span>, <span class="c-st">"BRAKE_MAX"</span>]

<span class="c-kw">def</span> <span class="c-fn">test_frame_invalido_lanza_excepcion</span>():
    <span class="c-kw">import</span> pytest
    <span class="c-kw">with</span> pytest.raises(ValueError, match=<span class="c-st">"invalid literal"</span>):
        parse_frame(<span class="c-st">"no-es-hex"</span>, [])

<span class="c-cm"># Si test_parse_frame_lista_completa falla, pytest muestra ALGO como:</span>
<span class="c-cm">#   assert ['IGN_ON', 'BRAKE_ERR'] == ['IGN_ON', 'BRAKE_MAX']</span>
<span class="c-cm">#     At index 1 diff: 'BRAKE_ERR' != 'BRAKE_MAX'</span>
<span class="c-cm"># — sin escribir ningún mensaje custom</span></pre></div>
<table class="kv-table"><tr><th>Comando CLI</th><th>Qué hace</th><th>Ejemplo → Resultado</th></tr>
<tr><td>pytest</td><td>Descubre y corre todos los test_*.py del directorio actual</td><td>pytest → recorre recursivamente, colecta funciones test_*</td></tr>
<tr><td>pytest ruta/archivo.py</td><td>Corre solo ese archivo</td><td>pytest test_can_parser.py → solo esos tests</td></tr>
<tr><td>pytest -v</td><td>Verbose — lista cada test con su resultado</td><td>-v → una línea por test en vez de un punto por test</td></tr>
<tr><td>pytest -k "expresion"</td><td>Filtra por nombre (substring o expresión booleana)</td><td>pytest -k "frame and not invalido" → solo tests cuyo nombre matchea</td></tr>
<tr><td>pytest -x</td><td>Se detiene en el primer fallo</td><td>-x → útil para debugging rápido, no para el reporte completo de CI</td></tr>
<tr><td>pytest -m marcador</td><td>Corre solo tests con ese marker</td><td>pytest -m "not slow" → excluye tests marcados @pytest.mark.slow</td></tr>
<tr><td>pytest --lf</td><td>Solo re-corre los que fallaron la última vez</td><td>--lf (last-failed) → iteración rápida al arreglar un bug</td></tr>
</table>
  </div>
  <div id="pti-3" class="tab-panel">
<div class="concept-intro">La mayoría de errores al empezar con pytest vienen de asumir convenciones de unittest que pytest no comparte, o de no aprovechar su introspección de asserts.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">check_ignition_on</span>():   <span class="c-cm"># sin prefijo "test_"</span>
    <span class="c-kw">assert</span> leer_estado() == <span class="c-st">"ON"</span>
<span class="c-cm"># pytest NO descubre esta función — nunca corre, ni aparece como fallo ni como éxito</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_ignition_on</span>():   <span class="c-cm"># prefijo "test_" obligatorio</span>
    <span class="c-kw">assert</span> leer_estado() == <span class="c-st">"ON"</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> pytest descubre tests por convención de nombres: archivos <code>test_*.py</code> o <code>*_test.py</code>, funciones/métodos <code>test_*</code>, clases <code>Test*</code> (sin <code>__init__</code>). Un typo en el prefijo hace que el test simplemente desaparezca del reporte sin error visible — silencioso y peligroso porque da falsa sensación de cobertura.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">class</span> <span class="c-fn">TestSensor</span>:
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(<span class="c-bi">self</span>):   <span class="c-cm"># constructor propio</span>
        <span class="c-bi">self</span>.sensor = Sensor()

    <span class="c-kw">def</span> <span class="c-fn">test_lectura</span>(<span class="c-bi">self</span>):
        <span class="c-kw">assert</span> <span class="c-bi">self</span>.sensor.read() &gt; <span class="c-nb">0</span>
<span class="c-cm"># PytestCollectionWarning: cannot collect test class with __init__</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">class</span> <span class="c-fn">TestSensor</span>:
    <span class="c-dc">@pytest.fixture</span>(autouse=<span class="c-kw">True</span>)
    <span class="c-kw">def</span> <span class="c-fn">setup</span>(<span class="c-bi">self</span>):
        <span class="c-bi">self</span>.sensor = Sensor()   <span class="c-cm"># fixture reemplaza al constructor</span>

    <span class="c-kw">def</span> <span class="c-fn">test_lectura</span>(<span class="c-bi">self</span>):
        <span class="c-kw">assert</span> <span class="c-bi">self</span>.sensor.read() &gt; <span class="c-nb">0</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> pytest instancia las clases <code>Test*</code> él mismo para recolectar los tests, y no sabe qué argumentos pasarle a un <code>__init__</code> personalizado — por eso lo prohíbe explícitamente. La forma pytest-idiomática de inicializar estado por instancia es una fixture con <code>autouse=True</code>.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_valores_sensor</span>():
    <span class="c-kw">assert</span> leer_valores() == [<span class="c-nb">10</span>, <span class="c-nb">20</span>, <span class="c-nb">30</span>], <span class="c-st">"fallo"</span>
<span class="c-cm"># mensaje custom pobre — pytest YA muestra el diff automático, esto lo tapa</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_valores_sensor</span>():
    <span class="c-kw">assert</span> leer_valores() == [<span class="c-nb">10</span>, <span class="c-nb">20</span>, <span class="c-nb">30</span>]
<span class="c-cm"># deja que pytest genere el mensaje — su introspección es más detallada</span>
<span class="c-cm"># que casi cualquier mensaje manual que escribirías</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> a diferencia de unittest (donde un mensaje custom SÍ añade contexto útil sobre un assertTrue genérico), en pytest el propio <code>assert</code> con introspección automática ya muestra ambos valores comparados y su diferencia. Un mensaje manual genérico como "fallo" solo tapa esa información útil.</div>
  </div>
  <div id="pti-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Usa assert plano y confía en la introspección de pytest</div>
  <p>No necesitas <code>assert x == y, f"esperaba {y}, obtuve {x}"</code> — pytest ya te da esa información con más detalle (incluyendo diffs de listas/dicts). Reserva el mensaje custom para contexto de NEGOCIO que el diff no puede inferir, como "el sensor debe reportar &gt; 0 solo con motor encendido".</p>
</div>
<div class="practice-card">
  <div class="practice-title">Organiza tests con archivos test_*.py junto al código, o en carpeta tests/ paralela</div>
  <p>Ambos patrones son válidos en pytest; elige uno y sé consistente. Para proyectos grandes de automotive/embedded, una carpeta <code>tests/</code> espejo de la estructura de <code>src/</code> facilita ubicar qué test cubre qué módulo.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa marcadores (@pytest.mark) para categorizar, no nombres de archivo mágicos</div>
  <p><code>@pytest.mark.slow</code>, <code>@pytest.mark.hil</code>, <code>@pytest.mark.integration</code> — regístralos en <code>pytest.ini</code> o <code>pyproject.toml</code> y filtra con <code>-m</code>. Es más flexible que convenciones de nombre de archivo como test_slow_*.py.</p>
</div>
<div class="practice-card">
  <div class="practice-title">No mezcles pytest.raises con try/except manual</div>
  <p><code>with pytest.raises(ValueError, match="patron"):</code> es la forma idiomática de verificar excepciones — falla el test si NO se lanza la excepción, y valida el mensaje con regex si lo necesitas. Un try/except manual con un flag booleano es más código y más frágil.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Configura pytest en pyproject.toml o pytest.ini, no solo en la CLI</div>
  <p>testpaths, markers registrados, addopts (como -ra para resumen de fallos) deben vivir en configuración versionada — así cualquiera que corra "pytest" localmente o en CI obtiene el mismo comportamiento sin memorizar flags.</p>
</div>
  </div>
  <div id="pti-5" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Escribes <code>def verificar_frame(): assert parse(x) == y</code> en un archivo <code>test_parser.py</code>. Corres <code>pytest</code>. ¿Qué pasa?<span class="q-arr">▶</span></div><div class="quiz-a"><b>El test nunca se ejecuta ni aparece como fallo — pytest lo ignora silenciosamente.</b> El archivo cumple la convención (test_parser.py) pero la FUNCIÓN no tiene el prefijo test_, así que el mecanismo de descubrimiento de pytest la salta por completo. No hay warning ni error visible por default.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿pytest puede ejecutar tests escritos con unittest.TestCase sin modificarlos?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Sí.</b> pytest es compatible hacia atrás con unittest: puede descubrir y correr clases TestCase, respeta setUp/tearDown, y hasta soporta assertEqual y demás. Esto permite migrar un proyecto gradualmente, corriendo tests viejos y nuevos con el mismo comando "pytest".</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Por qué pytest muestra un diff detallado en un assert fallido sin que tengas que escribir código para eso?<span class="q-arr">▶</span></div><div class="quiz-a"><b>pytest reescribe el AST (árbol de sintaxis) de las expresiones assert al momento de la recolección de tests</b>, insertando introspección que captura los valores intermedios de la comparación. Por eso <code>assert a == b</code> "sabe" mostrarte los valores de a y b sin que uses assertEqual ni pases ningún mensaje.</div></div>
</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre pytest...</p>
</div>`,

'pt-fixtures': `
<div class="tab-group-ptf">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ptf-1','ptf')">Fixtures básicas</button>
    <button class="tab-btn" onclick="switchTab(this,'ptf-2','ptf')">Scope</button>
    <button class="tab-btn" onclick="switchTab(this,'ptf-3','ptf')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'ptf-4','ptf')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'ptf-5','ptf')">Quiz</button>
  </div>
  <div id="ptf-1" class="tab-panel active">
<div class="concept-intro">Una <strong>fixture</strong> es una función marcada con <code>@pytest.fixture</code> que provee datos o recursos preparados a un test — reemplaza setUp/tearDown de unittest con algo más flexible: se <strong>inyecta por nombre de parámetro</strong> (pytest la reconoce automáticamente por el nombre del argumento del test), se puede componer (una fixture puede depender de otra), y con <code>yield</code> separa claramente el código de "antes del test" del de "después del test" en la misma función, sin necesitar dos métodos distintos.</div>
<div class="code-block"><div class="code-lang">Python — Fixture básica con yield</div><pre>
<span class="c-kw">import</span> pytest

<span class="c-dc">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">bench</span>():
    <span class="c-cm"># --- todo esto corre ANTES del test (setup) ---</span>
    b = HILBench.connect(<span class="c-st">"bench-01"</span>)
    b.reset()
    <span class="c-kw">yield</span> b   <span class="c-cm"># el valor que recibe el test es lo que va después de yield</span>
    <span class="c-cm"># --- todo esto corre DESPUÉS del test (teardown), incluso si el test falla ---</span>
    b.stop_all()
    b.disconnect()

<span class="c-kw">def</span> <span class="c-fn">test_ignition_on</span>(bench):   <span class="c-cm"># pytest ve el parámetro "bench" y lo inyecta automáticamente</span>
    bench.set_signal(<span class="c-st">"IGN"</span>, <span class="c-nb">1</span>)
    <span class="c-kw">assert</span> bench.read_signal(<span class="c-st">"ENGINE_STATE"</span>) == <span class="c-st">"running"</span>

<span class="c-kw">def</span> <span class="c-fn">test_ignition_off</span>(bench):   <span class="c-cm"># cada test que pide "bench" recibe SU PROPIA instancia (scope function)</span>
    bench.set_signal(<span class="c-st">"IGN"</span>, <span class="c-nb">0</span>)
    <span class="c-kw">assert</span> bench.read_signal(<span class="c-st">"ENGINE_STATE"</span>) == <span class="c-st">"stopped"</span>

<span class="c-cm"># Composición: una fixture puede depender de otra fixture</span>
<span class="c-dc">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">bench_con_can</span>(bench):   <span class="c-cm"># pytest resuelve "bench" primero, se lo pasa a esta fixture</span>
    can = CANInterface.open(<span class="c-st">"can0"</span>, bench_id=bench.id)
    <span class="c-kw">yield</span> can
    can.close()</pre></div>
<table class="kv-table"><tr><th>Elemento</th><th>Qué hace</th><th>Ejemplo → Resultado</th></tr>
<tr><td>@pytest.fixture</td><td>Registra la función como fixture disponible por nombre</td><td>def bench(): ... → cualquier test con parámetro "bench" la recibe</td></tr>
<tr><td>return valor</td><td>Fixture simple sin teardown</td><td>return HILBench.connect(...) → no hay limpieza automática</td></tr>
<tr><td>yield valor</td><td>Separa setup (antes de yield) de teardown (después de yield)</td><td>yield b ... b.disconnect() → teardown corre SIEMPRE, incluso si el test falla</td></tr>
<tr><td>conftest.py</td><td>Archivo especial donde fixtures se comparten entre archivos de test</td><td>fixture en conftest.py → visible en todo ese directorio sin import</td></tr>
<tr><td>autouse=True</td><td>Se aplica a todos los tests del ámbito sin pedirla como parámetro</td><td>@pytest.fixture(autouse=True) → corre siempre, útil para logging/limpieza global</td></tr>
</table>
  </div>
  <div id="ptf-2" class="tab-panel">
<div class="concept-intro">El <strong>scope</strong> controla cuántas veces se crea (y destruye) una fixture. Por default es <code>function</code> (la más segura, pero potencialmente lenta si el setup es costoso). Elegir el scope correcto es el balance clásico entre <strong>aislamiento de tests</strong> (menos scope = tests más independientes) y <strong>velocidad de la suite</strong> (más scope = menos setup repetido, especialmente crítico con hardware real como un bench HIL donde conectar toma segundos).</div>
<table class="kv-table"><tr><th>Scope</th><th>¿Cuándo se recrea?</th><th>Ejemplo → Resultado</th><th>Cuándo usarlo</th></tr>
<tr><td>function (default)</td><td>Antes de CADA función de test</td><td>scope="function" → 50 tests = 50 setups/teardowns</td><td>Estado que debe ser 100% independiente por test — el default correcto salvo razón concreta para cambiar</td></tr>
<tr><td>class</td><td>Una vez por clase de test</td><td>scope="class" → todos los tests de la clase comparten la instancia</td><td>Tests relacionados que legítimamente comparten setup pesado, agrupados a propósito en una clase</td></tr>
<tr><td>module</td><td>Una vez por archivo .py</td><td>scope="module" → todos los test_*() del archivo comparten la fixture</td><td>Recurso caro de crear (conexión a bench) que varios tests del mismo archivo pueden reusar sin interferir entre sí</td></tr>
<tr><td>package</td><td>Una vez por paquete (carpeta con __init__.py)</td><td>scope="package" → comparte entre varios archivos de test en la misma carpeta</td><td>Poco común — recursos compartidos entre múltiples módulos de test relacionados</td></tr>
<tr><td>session</td><td>Una vez por toda la corrida de pytest completa</td><td>scope="session" → UNA sola conexión para TODA la suite, sin importar cuántos archivos</td><td>Recursos globales muy caros: conexión a un bench físico único, levantar un contenedor Docker, cargar un dataset gigante de calibración</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — Scope aplicado a un banco HIL compartido</div><pre>
<span class="c-cm"># conftest.py — fixtures visibles en TODO el directorio de tests</span>
<span class="c-kw">import</span> pytest

<span class="c-dc">@pytest.fixture</span>(scope=<span class="c-st">"session"</span>)
<span class="c-kw">def</span> <span class="c-fn">can_interface</span>():
    <span class="c-cm"># conectar al adaptador CAN físico UNA sola vez para TODA la suite</span>
    can = CANInterface.open(<span class="c-st">"can0"</span>)
    <span class="c-kw">yield</span> can
    can.close()   <span class="c-cm"># se cierra al final de TODOS los tests, no de cada uno</span>

<span class="c-dc">@pytest.fixture</span>(scope=<span class="c-st">"function"</span>)
<span class="c-kw">def</span> <span class="c-fn">bench_limpio</span>(can_interface):
    <span class="c-cm"># cada test recibe estado limpio, pero REUSA la conexión CAN de sesión</span>
    bench = HILBench(can_interface)
    bench.reset_a_estado_conocido()
    <span class="c-kw">yield</span> bench
    bench.reset_a_estado_conocido()   <span class="c-cm"># limpia para el siguiente test</span>

<span class="c-kw">def</span> <span class="c-fn">test_arranque</span>(bench_limpio):
    bench_limpio.set_signal(<span class="c-st">"IGN"</span>, <span class="c-nb">1</span>)
    <span class="c-kw">assert</span> bench_limpio.read_signal(<span class="c-st">"ENGINE_STATE"</span>) == <span class="c-st">"running"</span>

<span class="c-cm"># Resultado: la conexión CAN (cara, ~2s) se abre UNA vez.</span>
<span class="c-cm"># El reset del bench (barato, ~10ms) corre en cada test para aislamiento.</span>
<span class="c-cm"># Mezclar scopes así es el patrón más común en suites de hardware-in-the-loop.</span></pre></div>
  </div>
  <div id="ptf-3" class="tab-panel">
<div class="concept-intro">Los errores con fixtures casi siempre vienen de dos fuentes: elegir un scope incorrecto (compartir estado que debía ser aislado, o recrear algo que debía compartirse) y olvidar que el teardown después de <code>yield</code> también puede fallar silenciosamente si no se maneja bien.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-dc">@pytest.fixture</span>(scope=<span class="c-st">"session"</span>)
<span class="c-kw">def</span> <span class="c-fn">bench</span>():
    b = HILBench.connect(<span class="c-st">"bench-01"</span>)
    <span class="c-kw">yield</span> b
    b.disconnect()
<span class="c-cm"># test_a modifica el estado del bench, test_b asume estado limpio</span>
<span class="c-cm"># pero es el MISMO objeto compartido — test_b falla por estado residual de test_a</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-dc">@pytest.fixture</span>(scope=<span class="c-st">"session"</span>)
<span class="c-kw">def</span> <span class="c-fn">bench_conexion</span>():
    <span class="c-cm"># scope session SOLO para la conexión cara, no para el estado mutable</span>
    b = HILBench.connect(<span class="c-st">"bench-01"</span>)
    <span class="c-kw">yield</span> b
    b.disconnect()

<span class="c-dc">@pytest.fixture</span>(scope=<span class="c-st">"function"</span>)
<span class="c-kw">def</span> <span class="c-fn">bench</span>(bench_conexion):
    bench_conexion.reset()   <span class="c-cm"># estado limpio en CADA test, conexión reusada</span>
    <span class="c-kw">yield</span> bench_conexion</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> un scope amplio (session/module) comparte el MISMO objeto entre tests — perfecto para recursos caros e inmutables como una conexión, pero peligroso si ese objeto tiene estado mutable que un test puede dejar "sucio" para el siguiente. La solución es separar la conexión (scope amplio) del estado (scope function con reset).</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-dc">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">archivo_temporal</span>():
    f = <span class="c-bi">open</span>(<span class="c-st">"/tmp/datos.csv"</span>, <span class="c-st">"w"</span>)
    <span class="c-kw">yield</span> f
    f.close()
<span class="c-cm"># si el test lanza una excepción ANTES de terminar, f.close() corre igual (bien),</span>
<span class="c-cm"># pero si algo dentro del propio setup falla, el yield nunca se alcanza y no hay teardown</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-dc">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">archivo_temporal</span>():
    f = <span class="c-bi">open</span>(<span class="c-st">"/tmp/datos.csv"</span>, <span class="c-st">"w"</span>)
    <span class="c-kw">try</span>:
        <span class="c-kw">yield</span> f
    <span class="c-kw">finally</span>:
        f.close()   <span class="c-cm"># garantizado incluso si algo entre el yield y aquí lanza</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> pytest SÍ ejecuta el código después de <code>yield</code> aunque el test falle (eso ya está garantizado por el framework), pero si tienes múltiples pasos de teardown y uno de ellos lanza una excepción, los siguientes pasos no correrán salvo que uses <code>try/finally</code> explícito dentro de la fixture — igual que en cualquier código Python normal.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_lectura_sensor</span>(bench):
    valor = obtener_bench_global().read_sensor(<span class="c-st">"rpm"</span>)   <span class="c-cm"># ignora el parámetro "bench" inyectado</span>
    <span class="c-kw">assert</span> valor &gt; <span class="c-nb">0</span>
<span class="c-cm"># pide la fixture "bench" pero no la usa — usa un singleton global en su lugar</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_lectura_sensor</span>(bench):
    valor = bench.read_sensor(<span class="c-st">"rpm"</span>)   <span class="c-cm"># usa la instancia que pytest inyectó</span>
    <span class="c-kw">assert</span> valor &gt; <span class="c-nb">0</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> pedir una fixture como parámetro y luego no usarla (accediendo a un singleton/global en su lugar) rompe todo el propósito de las fixtures: aislamiento, control de scope y limpieza garantizada. Si el test la recibe como parámetro, debe ser la única fuente de ese recurso dentro del test.</div>
  </div>
  <div id="ptf-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Empieza con scope="function" y solo amplía si el setup es medible-mente lento</div>
  <p>El aislamiento por default evita bugs sutiles de estado compartido. Solo sube a module/session cuando el setup (conectar hardware, levantar un contenedor) es realmente costoso Y el recurso es seguro de compartir sin efectos colaterales entre tests.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Separa recursos caros e inmutables (scope amplio) de estado mutable (scope function)</div>
  <p>Patrón recomendado: una fixture de scope session/module que solo abre la conexión, y otra de scope function que la reusa pero resetea el estado antes de cada test — como en el ejemplo de <code>bench_conexion</code> + <code>bench</code>.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa yield + try/finally para garantizar teardown ante fallos en cadena</div>
  <p>Si el teardown tiene múltiples pasos (cerrar conexión, borrar archivo temporal, resetear hardware), envuélvelos en <code>try/finally</code> o usa varios <code>with</code> anidados — un paso que falla no debe cancelar los demás.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Comparte fixtures comunes en conftest.py, no las dupliques por archivo</div>
  <p>Cualquier fixture usada por más de un archivo de test pertenece a <code>conftest.py</code> en el directorio apropiado — pytest la hace visible automáticamente sin necesidad de imports explícitos en cada archivo.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa autouse con moderación, y documenta por qué</div>
  <p>Una fixture <code>autouse=True</code> corre para TODOS los tests del ámbito sin que se pida explícitamente — útil para logging o limpieza global, pero puede sorprender a quien lee un test y no ve de dónde viene el comportamiento. Coméntala bien en conftest.py.</p>
</div>
  </div>
  <div id="ptf-5" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Una fixture con <code>scope="session"</code> retorna un objeto con estado mutable (por ejemplo, una lista que los tests van modificando). ¿Qué problema puede aparecer?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Contaminación de estado entre tests.</b> Como la fixture se crea UNA sola vez para toda la sesión, todos los tests reciben la MISMA instancia. Si un test modifica ese objeto, el siguiente test lo recibe ya modificado — rompiendo el aislamiento y potencialmente causando fallos que dependen del ORDEN en que corrieron los tests (bugs muy difíciles de reproducir).</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Qué corre primero si un test usa dos fixtures, una de scope="session" y otra de scope="function" que depende de la primera?<span class="q-arr">▶</span></div><div class="quiz-a"><b>pytest resuelve el grafo de dependencias respetando el scope más amplio primero.</b> La fixture de scope session se crea (si no existe ya) antes que la de scope function que depende de ella, y la de session persiste entre tests mientras la de function se recrea en cada uno — el orden de declaración en la firma del test no importa, pytest resuelve las dependencias automáticamente.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿Qué diferencia hay entre <code>return valor</code> y <code>yield valor</code> dentro de una fixture?<span class="q-arr">▶</span></div><div class="quiz-a"><b>return no permite código de teardown; yield sí.</b> Con return, la fixture termina apenas entrega el valor — no hay forma de ejecutar limpieza después. Con yield, todo el código después de la línea yield se ejecuta como teardown cuando el test (o el scope correspondiente) termina, garantizado incluso si el test falla.</div></div>
</div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre fixtures...</p>
</div>`,

'pt-parametrize': `
<div class="tab-group-ptz">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ptz-1','ptz')">Parametrize básico</button>
    <button class="tab-btn" onclick="switchTab(this,'ptz-2','ptz')">ids, múltiples params, stacking</button>
    <button class="tab-btn" onclick="switchTab(this,'ptz-3','ptz')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'ptz-4','ptz')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'ptz-5','ptz')">Quiz</button>
  </div>
  <div id="ptz-1" class="tab-panel active">
<div class="concept-intro">El decorador <strong>@pytest.mark.parametrize</strong> ejecuta el mismo cuerpo de test contra múltiples conjuntos de datos, generando un test independiente por cada caso — cada uno se reporta, falla y se re-ejecuta por separado (a diferencia de un <code>for</code> dentro del test, donde el primer fallo detiene todo lo demás). Se usa cuando la lógica a probar es la misma pero las entradas cambian: códigos de error UDS, bytes de una trama CAN, umbrales de un sensor de temperatura — en vez de escribir <code>test_caso_1</code>, <code>test_caso_2</code>, <code>test_caso_3</code> a mano.</div>
<table class="kv-table">
<tr><th>Elemento</th><th>Qué hace</th><th>Ejemplo → Resultado</th></tr>
<tr><td>argnames (str)</td><td>Nombre(s) de parámetro, separados por coma si son varios</td><td>"x,esperado" → dos valores por caso</td></tr>
<tr><td>argvalues (list)</td><td>Una tupla por caso de test</td><td>[(1,2),(2,4)] → genera 2 tests</td></tr>
<tr><td>Un solo argname</td><td>argvalues puede ser lista plana (sin tuplas)</td><td>"x", [1,2,3] → 3 tests, x=1, x=2, x=3</td></tr>
<tr><td>ids=[...]</td><td>Nombre legible de cada caso en el reporte</td><td>ids=["cero","uno"] → test_x[cero]</td></tr>
<tr><td>Nombre en consola sin ids</td><td>pytest genera un id automático a partir de los valores</td><td>test_x[1-2] (índice de la tupla)</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — parametrize básico</div><pre>
<span class="c-kw">import</span> pytest

<span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"entrada,esperado"</span>, [
    (<span class="c-nb">0</span>,   <span class="c-st">"OFF"</span>),
    (<span class="c-nb">1</span>,   <span class="c-st">"ON"</span>),
    (<span class="c-nb">255</span>, <span class="c-st">"MAX"</span>),
])
<span class="c-kw">def</span> <span class="c-fn">test_decode_signal</span>(entrada, esperado):
    <span class="c-kw">assert</span> decode_ignition(entrada) == esperado

<span class="c-cm"># pytest genera 3 tests independientes:</span>
<span class="c-cm"># test_decode_signal[0-OFF]</span>
<span class="c-cm"># test_decode_signal[1-ON]</span>
<span class="c-cm"># test_decode_signal[255-MAX]</span>
<span class="c-cm"># Si "1-ON" falla, "0-OFF" y "255-MAX" se siguen ejecutando y reportando</span></pre></div>
  </div>
  <div id="ptz-2" class="tab-panel">
<div class="concept-intro">Tres extensiones que se usan a diario en bancos de prueba: <strong>ids</strong> explícitos para que el reporte de CI sea legible sin adivinar qué índice falló, <strong>pytest.param()</strong> para adjuntar un <code>id</code> o un <code>mark</code> (como <code>xfail</code>) a un caso puntual sin duplicar el test, y el <strong>stacking</strong> de varios decoradores <code>@parametrize</code> para generar el producto cartesiano de dos (o más) listas de valores.</div>
<div class="code-block"><div class="code-lang">Python — ids, pytest.param() y stacking</div><pre>
<span class="c-kw">import</span> pytest

<span class="c-cm"># ids explícitos — controlan el nombre que aparece en el reporte</span>
<span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"protocolo"</span>, [<span class="c-st">"CAN"</span>, <span class="c-st">"LIN"</span>, <span class="c-st">"ETH"</span>],
                         ids=[<span class="c-st">"can-test"</span>, <span class="c-st">"lin-test"</span>, <span class="c-st">"eth-test"</span>])
<span class="c-kw">def</span> <span class="c-fn">test_conexion</span>(protocolo):
    <span class="c-kw">assert</span> connect(protocolo).is_ok()

<span class="c-cm"># pytest.param() — id y marks por caso individual, sin duplicar el test</span>
<span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"rpm,esperado"</span>, [
    pytest.param(<span class="c-nb">0</span>,    <span class="c-st">"IDLE"</span>,    id=<span class="c-st">"idle"</span>),
    pytest.param(<span class="c-nb">6500</span>, <span class="c-st">"REDLINE"</span>, id=<span class="c-st">"redline"</span>),
    pytest.param(-<span class="c-nb">100</span>, <span class="c-st">"ERROR"</span>,
                 marks=pytest.mark.xfail(reason=<span class="c-st">"sensor no soporta negativos aún"</span>)),
])
<span class="c-kw">def</span> <span class="c-fn">test_rpm_state</span>(rpm, esperado):
    <span class="c-kw">assert</span> engine_state(rpm) == esperado

<span class="c-cm"># Stacking: dos decoradores -> producto cartesiano (2 canales x 4 bauds = 8 tests)</span>
<span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"canal"</span>, [<span class="c-nb">0</span>, <span class="c-nb">1</span>])
<span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"baud"</span>, [<span class="c-nb">125</span>, <span class="c-nb">250</span>, <span class="c-nb">500</span>, <span class="c-nb">1000</span>])
<span class="c-kw">def</span> <span class="c-fn">test_can_baud_matrix</span>(canal, baud):
    <span class="c-kw">assert</span> set_baudrate(canal, baud) <span class="c-kw">is</span> <span class="c-kw">True</span></pre></div>
<table class="kv-table">
<tr><th>Técnica</th><th>Cuándo usarla</th><th>Ejemplo → Resultado</th></tr>
<tr><td>Un parametrize, N argnames</td><td>Cada caso combina valores que van juntos (no es cartesiano)</td><td>3 tuplas de 3 valores → 3 tests</td></tr>
<tr><td>Stacking de 2 parametrize</td><td>Quieres probar TODAS las combinaciones posibles</td><td>2 valores x 4 valores → 8 tests</td></tr>
<tr><td>pytest.param(marks=...)</td><td>Un caso puntual necesita xfail/skip sin duplicar el test</td><td>marks=pytest.mark.xfail → XFAIL solo ese caso</td></tr>
</table>
  </div>
  <div id="ptz-3" class="tab-panel">
<div class="concept-intro">La mayoría de los problemas con parametrize no son errores de sintaxis sino de <em>legibilidad y escala</em>: reportes imposibles de leer, listas de casos que crecen sin control, o valores compartidos entre casos que no deberían compartirse.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"x"</span>, [<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>])
<span class="c-kw">def</span> <span class="c-fn">test_doble</span>(x):
    <span class="c-kw">assert</span> doble(x) == x * <span class="c-nb">2</span>
<span class="c-cm"># Reporte: test_doble[1], test_doble[2], test_doble[3]</span>
<span class="c-cm"># -- no dice NADA de qué caso de negocio representa cada uno</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"x"</span>, [<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>],
                         ids=[<span class="c-st">"minimo"</span>, <span class="c-st">"nominal"</span>, <span class="c-st">"maximo"</span>])
<span class="c-kw">def</span> <span class="c-fn">test_doble</span>(x):
    <span class="c-kw">assert</span> doble(x) == x * <span class="c-nb">2</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> sin <code>ids</code>, pytest arma el identificador del test a partir de la representación de los valores (índice o repr). Con enteros o strings cortos es tolerable; con objetos, diccionarios o floats el id se vuelve un hash ilegible. En un reporte de CI de 40 líneas nadie va a poder saber, sin abrir el código, qué caso representa <code>test_frame[params3]</code>.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>casos_compartidos = [{<span class="c-st">'flags'</span>: []}]  <span class="c-cm"># un solo dict/lista reusado</span>

<span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"caso"</span>, casos_compartidos)
<span class="c-kw">def</span> <span class="c-fn">test_flags</span>(caso):
    caso[<span class="c-st">'flags'</span>].append(<span class="c-st">'visitado'</span>)  <span class="c-cm"># muta el objeto compartido</span>
    <span class="c-kw">assert</span> <span class="c-st">'visitado'</span> <span class="c-kw">in</span> caso[<span class="c-st">'flags'</span>]
<span class="c-cm"># si hay un segundo test que usa "caso", ya no empieza limpio</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"flags_iniciales"</span>, [[]])
<span class="c-kw">def</span> <span class="c-fn">test_flags</span>(flags_iniciales):
    caso = {<span class="c-st">'flags'</span>: <span class="c-bi">list</span>(flags_iniciales)}  <span class="c-cm"># copia nueva por test</span>
    caso[<span class="c-st">'flags'</span>].append(<span class="c-st">'visitado'</span>)
    <span class="c-kw">assert</span> <span class="c-st">'visitado'</span> <span class="c-kw">in</span> caso[<span class="c-st">'flags'</span>]</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> los valores en <code>argvalues</code> se definen <b>una sola vez</b>, al cargar el módulo, y pytest reutiliza la misma referencia en cada test que la usa. Si el test muta un objeto mutable (lista, dict) recibido como parámetro, esa mutación puede filtrarse a otro test que reciba el mismo objeto o al re-ejecutar el mismo test con <code>--lf</code>. Copia el valor dentro del test si vas a mutarlo.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"ecu"</span>, [<span class="c-st">"BCM"</span>, <span class="c-st">"ECM"</span>, <span class="c-st">"TCM"</span>, <span class="c-st">"ABS"</span>, <span class="c-st">"BMS"</span>])
<span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"dtc"</span>, [<span class="c-st">"P0100"</span>, <span class="c-st">"P0200"</span>, <span class="c-st">"P0300"</span>, <span class="c-st">"P0400"</span>, <span class="c-st">"P0500"</span>])
<span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"modo"</span>, [<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>])
<span class="c-kw">def</span> <span class="c-fn">test_dtc_lookup</span>(modo, dtc, ecu):
    ...
<span class="c-cm"># 5 x 5 x 3 = 75 tests -- probablemente la mayoría no aportan nada nuevo</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-cm"># Separa: un test enfocado en la combinatoria real que importa,</span>
<span class="c-cm"># y un test aparte para los casos "borde" que sí valen la pena explícitos</span>
<span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"ecu,dtc,modo"</span>, [
    (<span class="c-st">"BCM"</span>, <span class="c-st">"P0100"</span>, <span class="c-nb">1</span>),
    (<span class="c-st">"ABS"</span>, <span class="c-st">"P0500"</span>, <span class="c-nb">3</span>),  <span class="c-cm"># caso límite conocido</span>
])
<span class="c-kw">def</span> <span class="c-fn">test_dtc_lookup</span>(ecu, dtc, modo):
    ...</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> apilar (stacking) varios <code>@parametrize</code> multiplica combinaciones sin que se note en el diff del código — "agregué un valor" se convierte silenciosamente en "agregué 15 tests". Cuando los parámetros no son realmente independientes entre sí (la combinación de ECU+DTC+modo no es libre en la práctica), usa un solo parametrize con tuplas explícitas en vez de stacking cartesiano.</div>
  </div>
  <div id="ptz-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Usa ids siempre que los valores no se expliquen solos</div>
  <p>Enteros pequeños y strings cortos suelen ser legibles como id automático; para dicts, floats, objetos o casos de negocio con nombre, pasa <code>ids=[...]</code> o usa <code>pytest.param(..., id="...")</code>.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa pytest.param(marks=...) en vez de duplicar el test para un caso especial</div>
  <p>Si un solo caso necesita <code>xfail</code> o <code>skip</code>, no saques ese caso a un test aparte — márcalo inline con <code>pytest.param(valor, marks=pytest.mark.xfail(...))</code> y mantén todos los casos juntos.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Prefiere tuplas explícitas a stacking cuando los parámetros no son ortogonales</div>
  <p>El stacking (apilar <code>@parametrize</code>) tiene sentido cuando de verdad quieres <em>todas</em> las combinaciones (matriz de baudrates x canales). Si solo algunas combinaciones son válidas o interesantes, usa un solo <code>@parametrize</code> con una lista de tuplas.</p>
</div>
<div class="practice-card">
  <div class="practice-title">No mutes valores de argvalues dentro del test</div>
  <p>Los objetos en <code>argvalues</code> se crean una vez y se reutilizan. Si necesitas mutar el valor recibido, copia primero con <code>list(x)</code> o <code>dict(x)</code> / <code>copy.deepcopy(x)</code>.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Combina parametrize con fixtures cuando el setup depende del valor</div>
  <p>Si además de pasar el valor necesitas construir un recurso distinto por caso (por ejemplo, un bench configurado para cada protocolo), usa <code>@pytest.fixture(params=[...])</code> con <code>indirect=True</code> en vez de meter la lógica de setup dentro del cuerpo del test.</p>
</div>
  </div>
  <div id="ptz-5" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿Cuántos tests genera este código?<br><code>@pytest.mark.parametrize("a",[1,2,3])</code><br><code>@pytest.mark.parametrize("b",[10,20,30,40])</code><span class="q-arr">▶</span></div><div class="quiz-a"><b>12 tests</b> (3 x 4). Apilar dos <code>@parametrize</code> genera el producto cartesiano de ambas listas, no la suma. Si la intención era probar 4 casos puntuales, esto es un bug de "explosión combinatoria" silenciosa.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Para qué sirve <code>ids=[...]</code> en parametrize y qué pasa si no lo usas?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Controla el nombre de cada caso en el reporte.</b> Sin <code>ids</code>, pytest genera un identificador automático a partir del índice o representación de los valores — funciona pero es difícil de leer en un reporte de CI con muchos casos, sobre todo con objetos o floats.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿Qué diferencia hay entre pasar un valor mutable directo en argvalues y copiarlo dentro del test?<span class="q-arr">▶</span></div><div class="quiz-a"><b>El valor en argvalues se crea una sola vez y se reutiliza en cada ejecución del test.</b> Si el test lo muta directamente (por ejemplo <code>.append()</code> a una lista), esa mutación persiste entre re-ejecuciones (por ejemplo con <code>pytest --lf</code>) o entre tests que compartan el mismo objeto. Copiar (<code>list(x)</code>, <code>deepcopy(x)</code>) evita el efecto secundario.</div></div>
</div>
  </div>
</div>`,

'pt-marks': `
<div class="tab-group-ptk">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ptk-1','ptk')">Marks estándar</button>
    <button class="tab-btn" onclick="switchTab(this,'ptk-2','ptk')">Marks custom y filtrado con -m</button>
    <button class="tab-btn" onclick="switchTab(this,'ptk-3','ptk')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'ptk-4','ptk')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'ptk-5','ptk')">Quiz</button>
  </div>
  <div id="ptk-1" class="tab-panel active">
<div class="concept-intro">Un <strong>mark</strong> (<code>@pytest.mark.algo</code>) es una etiqueta que se adjunta a un test o una clase de tests. pytest trae tres marks built-in para controlar qué se ejecuta y cómo se reporta — <code>skip</code>, <code>skipif</code> y <code>xfail</code> — y permite además definir marks propios (<code>hil</code>, <code>slow</code>, <code>integration</code>) para clasificar tests y filtrarlos selectivamente en CI.</div>
<table class="kv-table">
<tr><th>Mark</th><th>¿Qué hace?</th><th>Ejemplo → Resultado</th><th>Nota</th></tr>
<tr><td>@pytest.mark.skip</td><td>Salta el test incondicionalmente</td><td>skip(reason="sin HW") → SKIPPED</td><td>Usa skipif si depende de una condición</td></tr>
<tr><td>@pytest.mark.skipif</td><td>Salta el test solo si la condición es True</td><td>skipif(sys.platform=="win32") → SKIPPED en Windows</td><td>Evalúa la condición en tiempo de colección</td></tr>
<tr><td>@pytest.mark.xfail</td><td>Se espera que falle; si falla, se reporta XFAIL (no rompe la build)</td><td>xfail(reason="bug #456") → XFAIL</td><td>Si el test PASA, se reporta XPASS</td></tr>
<tr><td>@pytest.mark.xfail(strict=True)</td><td>Igual que xfail, pero un XPASS se trata como fallo real</td><td>strict=True + test que pasa → FAILED</td><td>Úsalo para detectar cuándo un bug se arregló</td></tr>
<tr><td>pytest.skip("motivo")</td><td>Salta el test en tiempo de ejecución (dentro del cuerpo)</td><td>if not hw: pytest.skip(...) → SKIPPED</td><td>Útil cuando la condición solo se conoce en runtime</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — skip, skipif y xfail</div><pre>
<span class="c-kw">import</span> pytest, sys

<span class="c-dc">@pytest.mark.skip</span>(reason=<span class="c-st">"Banco HIL no disponible en este runner"</span>)
<span class="c-kw">def</span> <span class="c-fn">test_hardware_real</span>():
    ...  <span class="c-cm"># siempre saltado, sin importar la plataforma</span>

<span class="c-dc">@pytest.mark.skipif</span>(sys.platform == <span class="c-st">"win32"</span>, reason=<span class="c-st">"socketcan es solo Linux"</span>)
<span class="c-kw">def</span> <span class="c-fn">test_can_socket</span>():
    ...  <span class="c-cm"># saltado solo en Windows</span>

<span class="c-dc">@pytest.mark.xfail</span>(reason=<span class="c-st">"JIRA-456: firmware v2.3 reporta RPM negativo"</span>)
<span class="c-kw">def</span> <span class="c-fn">test_rpm_negativo</span>():
    <span class="c-kw">assert</span> engine_state(-<span class="c-nb">1</span>) == <span class="c-st">"ERROR"</span>  <span class="c-cm"># hoy falla -> XFAIL, no rompe CI</span>

<span class="c-dc">@pytest.mark.xfail</span>(reason=<span class="c-st">"bug conocido"</span>, strict=<span class="c-kw">True</span>)
<span class="c-kw">def</span> <span class="c-fn">test_bug_conocido</span>():
    <span class="c-kw">assert</span> buggy_function() == <span class="c-nb">42</span>
    <span class="c-cm"># Si algún día PASA sin quitar el mark -> FAILED (te avisa que ya lo arreglaron)</span>

<span class="c-kw">def</span> <span class="c-fn">test_solo_si_bench_conectado</span>():
    <span class="c-kw">if</span> <span class="c-kw">not</span> bench_disponible():
        pytest.skip(<span class="c-st">"bench-01 no responde"</span>)  <span class="c-cm"># decisión en runtime, no en colección</span>
    ...</pre></div>
  </div>
  <div id="ptk-2" class="tab-panel">
<div class="concept-intro">Los marks propios no cambian el comportamiento del test por sí solos — son solo etiquetas. Su valor está en <strong>filtrar la ejecución</strong> con <code>-m</code>: correr solo los tests de HIL en el banco físico, excluir los lentos en cada push, o combinar condiciones con expresiones booleanas. Hay que <em>registrarlos</em> en <code>pytest.ini</code> para que pytest no emita un warning de "mark desconocido".</div>
<div class="code-block"><div class="code-lang">INI — pytest.ini con marks registrados</div><pre>
<span class="c-cm">[pytest]</span>
<span class="c-cm">markers =</span>
<span class="c-cm">    hil: tests que requieren banco HIL físico conectado</span>
<span class="c-cm">    slow: tests de más de 30 segundos</span>
<span class="c-cm">    integration: pruebas de integración entre módulos</span>
<span class="c-cm">    smoke: subconjunto rápido para validar un build antes de la suite completa</span></pre></div>
<div class="code-block"><div class="code-lang">Python — Marks custom en los tests</div><pre>
<span class="c-dc">@pytest.mark.hil</span>
<span class="c-dc">@pytest.mark.slow</span>
<span class="c-kw">def</span> <span class="c-fn">test_full_ecu_boot</span>(bench):
    ...  <span class="c-cm"># un test puede tener varios marks combinados</span>

<span class="c-dc">@pytest.mark.smoke</span>
<span class="c-kw">def</span> <span class="c-fn">test_ping_ecu</span>(bench):
    ...</pre></div>
<div class="code-block"><div class="code-lang">Shell — Filtrar ejecución con -m</div><pre>
<span class="c-cm"># Solo tests marcados "hil" (correr en el banco físico)</span>
pytest -m hil

<span class="c-cm"># Excluir tests lentos en cada push (CI rápido)</span>
pytest -m <span class="c-st">"not slow"</span>

<span class="c-cm"># Expresión booleana: hil pero NO slow</span>
pytest -m <span class="c-st">"hil and not slow"</span>

<span class="c-cm"># hil O integration</span>
pytest -m <span class="c-st">"hil or integration"</span>

<span class="c-cm"># -k filtra por NOMBRE del test/clase/archivo (no por mark)</span>
pytest -k <span class="c-st">"ignition or can"</span>

<span class="c-cm"># --strict-markers: falla si se usa un mark no registrado (recomendado en CI)</span>
pytest --strict-markers -m smoke</pre></div>
<table class="kv-table">
<tr><th>Filtro</th><th>Busca por</th><th>Ejemplo → Resultado</th></tr>
<tr><td>-m "expr"</td><td>Marks aplicados con @pytest.mark.algo</td><td>-m "hil and not slow" → solo hil rápidos</td></tr>
<tr><td>-k "expr"</td><td>Substring en el nombre del test/clase/módulo</td><td>-k "ignition" → todo lo que contenga "ignition"</td></tr>
<tr><td>-m y -k juntos</td><td>Intersección de ambos filtros</td><td>-m hil -k can → hil Y que contenga "can"</td></tr>
</table>
  </div>
  <div id="ptk-3" class="tab-panel">
<div class="concept-intro">Los marks son simples de usar pero fáciles de usar mal: el warning que nadie lee, el xfail que se olvida y se convierte en un test permanentemente roto, y la confusión entre "saltar" y "esperar que falle" — que no son lo mismo.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-dc">@pytest.mark.hil</span>
<span class="c-kw">def</span> <span class="c-fn">test_boot</span>(bench):
    ...
<span class="c-cm"># sin registrar "hil" en pytest.ini</span>
<span class="c-cm"># PytestUnknownMarkWarning: Unknown pytest.mark.hil</span>
<span class="c-cm"># -- se ignora en la consola, nadie lo nota hasta que es tarde</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-cm"># pytest.ini</span>
<span class="c-cm">[pytest]</span>
<span class="c-cm">markers =</span>
<span class="c-cm">    hil: requiere banco HIL físico</span>
<span class="c-cm"># y en CI: pytest --strict-markers</span>
<span class="c-cm"># convierte el warning en error -> lo detectas en el PR, no en producción</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> pytest acepta marks no registrados por defecto (para no romper proyectos legacy) y solo emite un warning que se pierde entre cientos de líneas de log. Un typo como <code>@pytest.mark.hli</code> en vez de <code>hil</code> hace que ese test deje de filtrarse correctamente con <code>-m hil</code> sin ningún error visible. <code>--strict-markers</code> lo convierte en un fallo de colección explícito.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-dc">@pytest.mark.xfail</span>
<span class="c-kw">def</span> <span class="c-fn">test_calibracion_sensor</span>():
    <span class="c-kw">assert</span> calibrar() == esperado
<span class="c-cm"># hace 8 meses que pasa (XPASS) y nadie lo notó ni quitó el mark</span>
<span class="c-cm"># -- el mark quedó "decorativo", ya no protege nada</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-dc">@pytest.mark.xfail</span>(reason=<span class="c-st">"JIRA-789"</span>, strict=<span class="c-kw">True</span>)
<span class="c-kw">def</span> <span class="c-fn">test_calibracion_sensor</span>():
    <span class="c-kw">assert</span> calibrar() == esperado
<span class="c-cm"># con strict=True, el día que empiece a pasar -> FAILED explícito</span>
<span class="c-cm"># te obliga a quitar el mark y cerrar el ticket</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> sin <code>strict=True</code>, un <code>xfail</code> que empieza a pasar se reporta como <code>XPASS</code> — que por defecto NO rompe la build. Es fácil que ese test quede "marcado como roto" para siempre, incluso después de que el bug real se arregló, porque nada obliga a revisar el mark. <code>strict=True</code> convierte un XPASS inesperado en fallo, forzando a alguien a actualizar el test.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-dc">@pytest.mark.skip</span>(reason=<span class="c-st">"falla en CI sin bench"</span>)
<span class="c-kw">def</span> <span class="c-fn">test_lectura_can</span>(bench):
    ...
<span class="c-cm"># skip incondicional -- tampoco corre nunca en el banco físico donde SÍ hay HW</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-dc">@pytest.mark.skipif</span>(<span class="c-kw">not</span> hil_disponible(), reason=<span class="c-st">"requiere bench conectado"</span>)
<span class="c-kw">def</span> <span class="c-fn">test_lectura_can</span>(bench):
    ...
<span class="c-cm"># corre cuando hay HW, se salta limpio cuando no lo hay</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>skip</code> es incondicional — el test jamás corre, en ningún entorno, hasta que alguien quite el decorador manualmente. Si la razón real es "no hay hardware disponible AHORA", eso es una condición, no un hecho permanente: <code>skipif</code> (o <code>pytest.skip()</code> en runtime) deja que el test corra automáticamente en el entorno correcto (el banco HIL) sin tocar código.</div>
  </div>
  <div id="ptk-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Registra todos los marks custom en pytest.ini y usa --strict-markers en CI</div>
  <p>Evita que un typo en un mark pase silencioso. Un mark no registrado con <code>--strict-markers</code> es un error de colección, no un warning perdido en el log.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Todo xfail lleva reason= y, si es posible, strict=True</div>
  <p><code>reason</code> documenta por qué (idealmente con referencia a un ticket); <code>strict=True</code> asegura que el mark se revise el día que el bug se arregle, en vez de quedar como decoración permanente.</p>
</div>
<div class="practice-card">
  <div class="practice-title">skipif para condiciones del entorno, skip solo para "nunca correr aquí"</div>
  <p>Reserva <code>skip</code> incondicional para tests deprecados o en construcción. Para "no corre en este SO" / "requiere hardware conectado" / "requiere VPN", usa <code>skipif</code> con la condición explícita, para que el test se active solo cuando corresponde.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Define un conjunto pequeño de marks con significado claro de CI (smoke, slow, hil)</div>
  <p>Un mark por cada combinación específica de condiciones se vuelve inmanejable. Unos pocos marks ortogonales (velocidad, dependencia de hardware, tipo de prueba) combinados con expresiones <code>-m</code> cubren la mayoría de los pipelines.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa -k para exploración ad-hoc, -m para pipelines de CI reproducibles</div>
  <p><code>-k</code> es cómodo en local ("corre lo que tenga 'ignition' en el nombre") pero frágil si alguien renombra un test. <code>-m</code>, respaldado por marks registrados, es la forma estable de definir qué corre en cada etapa del pipeline.</p>
</div>
  </div>
  <div id="ptk-5" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Cuál es la diferencia entre @pytest.mark.skip y @pytest.mark.xfail?<span class="q-arr">▶</span></div><div class="quiz-a"><b>skip nunca ejecuta el test; xfail sí lo ejecuta pero espera que falle.</b> Con skip no sabes si el código roto se arregló solo. Con xfail el test corre siempre: si falla, se reporta XFAIL (esperado, no rompe CI); si pasa, se reporta XPASS (una señal de que quizás ya se puede quitar el mark).</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Un test tiene @pytest.mark.xfail sin strict=True y de repente empieza a pasar. ¿Rompe el pipeline de CI?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No.</b> Sin <code>strict=True</code>, un xfail que pasa se reporta como XPASS, que por defecto NO cuenta como fallo. Por eso se recomienda <code>strict=True</code>: así un XPASS inesperado sí rompe la build y obliga a revisar/quitar el mark.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿pytest -m "hil" y pytest -k "hil" hacen lo mismo?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No.</b> <code>-m</code> filtra por marks aplicados con <code>@pytest.mark.hil</code>; <code>-k</code> filtra por substring en el nombre del test, clase o módulo. Un test llamado <code>test_hilo_can</code> sin ningún mark coincidiría con <code>-k hil</code> pero no con <code>-m hil</code>.</div></div>
</div>
  </div>
</div>`,

'pt-conftest': `
<div class="tab-group-ptc">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ptc-1','ptc')">Qué es conftest.py</button>
    <button class="tab-btn" onclick="switchTab(this,'ptc-2','ptc')">Fixtures y hooks comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'ptc-3','ptc')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'ptc-4','ptc')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'ptc-5','ptc')">Quiz</button>
  </div>
  <div id="ptc-1" class="tab-panel active">
<div class="concept-intro"><strong>conftest.py</strong> es un archivo con nombre reservado que pytest reconoce automáticamente: todo lo que definas ahí (fixtures, hooks, helpers de colección) queda disponible para <em>todos los tests del directorio donde vive y sus subdirectorios</em>, sin necesidad de ningún <code>import</code>. Es el mecanismo estándar para compartir setup entre archivos de test — conexión al banco HIL, cliente CAN, configuración de logging — sin duplicar fixtures en cada módulo.</div>
<div class="code-block"><div class="code-lang">Python — conftest.py mínimo</div><pre>
<span class="c-cm"># conftest.py en la raíz del proyecto (o de una carpeta de tests)</span>
<span class="c-cm"># Las fixtures aquí están disponibles en TODOS los tests del directorio,</span>
<span class="c-cm"># sin "from conftest import ..." -- pytest las inyecta por nombre</span>

<span class="c-kw">import</span> pytest
<span class="c-kw">from</span> myapp.bench <span class="c-kw">import</span> HILBench

<span class="c-dc">@pytest.fixture</span>(scope=<span class="c-st">"session"</span>)
<span class="c-kw">def</span> <span class="c-fn">hil_bench</span>():
    bench = HILBench.connect(<span class="c-st">"bench-01"</span>)
    <span class="c-kw">yield</span> bench
    bench.disconnect()

<span class="c-cm"># tests/test_ignition.py -- usa hil_bench SIN importarlo</span>
<span class="c-kw">def</span> <span class="c-fn">test_ignition_on</span>(hil_bench):
    hil_bench.set_signal(<span class="c-st">"IGN"</span>, <span class="c-nb">1</span>)
    <span class="c-kw">assert</span> hil_bench.read_signal(<span class="c-st">"ENGINE_STATE"</span>) == <span class="c-st">"running"</span></pre></div>
<table class="kv-table">
<tr><th>Ubicación de conftest.py</th><th>Alcance</th><th>Ejemplo → Resultado</th></tr>
<tr><td>Raíz del proyecto</td><td>Visible en todo el árbol de tests</td><td>conftest.py raíz → fixture usable en tests/unit y tests/integration</td></tr>
<tr><td>tests/integration/conftest.py</td><td>Solo visible dentro de esa carpeta</td><td>fixture "hil_bench" → no existe fuera de integration/</td></tr>
<tr><td>Varios conftest.py anidados</td><td>Se combinan; el más cercano al test gana en conflicto de nombre</td><td>misma fixture en raíz y en subcarpeta → gana la de la subcarpeta</td></tr>
</table>
  </div>
  <div id="ptc-2" class="tab-panel">
<div class="concept-intro">Además de fixtures, conftest.py es el lugar estándar para <strong>hooks</strong> — funciones con nombre reservado que pytest llama automáticamente en puntos específicos del ciclo de vida (antes de colectar tests, antes de correr cada uno, al agregar opciones de CLI). Se usan para automatizar cosas que de otro modo tocaría repetir en cada test: agregar marks según el nombre del archivo, exponer un flag de línea de comandos propio, o imprimir un encabezado con la versión del firmware bajo prueba.</div>
<table class="kv-table">
<tr><th>Hook</th><th>Cuándo corre</th><th>Uso típico</th></tr>
<tr><td>pytest_addoption(parser)</td><td>Al arrancar, antes de todo</td><td>Definir flags custom: --bench-id=bench-02</td></tr>
<tr><td>pytest_configure(config)</td><td>Después de leer pytest.ini y los plugins</td><td>Registrar marks dinámicamente, validar config global</td></tr>
<tr><td>pytest_collection_modifyitems(config, items)</td><td>Después de descubrir todos los tests, antes de correr</td><td>Agregar marks automáticos, reordenar o filtrar tests</td></tr>
<tr><td>pytest_runtest_setup(item)</td><td>Antes de cada test individual</td><td>Validaciones previas (¿el bench sigue conectado?)</td></tr>
<tr><td>pytest_sessionstart / pytest_sessionfinish</td><td>Al inicio / fin de toda la sesión de pytest</td><td>Levantar/apagar un servicio compartido una sola vez</td></tr>
<tr><td>pytest_report_header(config)</td><td>Al imprimir el encabezado del reporte</td><td>Mostrar versión de firmware, commit hash, bench usado</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — CLI option custom + hooks en conftest.py</div><pre>
<span class="c-kw">import</span> pytest

<span class="c-kw">def</span> <span class="c-fn">pytest_addoption</span>(parser):
    parser.addoption(<span class="c-st">"--bench-id"</span>, action=<span class="c-st">"store"</span>, default=<span class="c-st">"bench-01"</span>,
                      help=<span class="c-st">"ID del banco HIL a usar"</span>)

<span class="c-dc">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">bench_id</span>(request):
    <span class="c-kw">return</span> request.config.getoption(<span class="c-st">"--bench-id"</span>)

<span class="c-cm"># Hook para marcar automáticamente todos los tests bajo tests/hil/</span>
<span class="c-kw">def</span> <span class="c-fn">pytest_collection_modifyitems</span>(config, items):
    <span class="c-kw">for</span> item <span class="c-kw">in</span> items:
        <span class="c-kw">if</span> <span class="c-st">"tests/hil"</span> <span class="c-kw">in</span> <span class="c-bi">str</span>(item.fspath):
            item.add_marker(pytest.mark.hil)

<span class="c-cm"># Mostrar info extra en el encabezado del reporte</span>
<span class="c-kw">def</span> <span class="c-fn">pytest_report_header</span>(config):
    <span class="c-kw">return</span> <span class="c-st">f"bench objetivo: {config.getoption('--bench-id')}"</span>

<span class="c-cm"># Uso: pytest --bench-id=bench-02 -m hil</span></pre></div>
  </div>
  <div id="ptc-3" class="tab-panel">
<div class="concept-intro">conftest.py es "mágico" — se carga sin importarlo — y esa misma magia es la fuente de casi todos los errores: fixtures que se pisan entre archivos con el mismo nombre, scopes mal elegidos que filtran estado entre tests, o lógica de negocio real escondida donde nadie la va a buscar cuando algo falle.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-cm"># tests/unit/conftest.py</span>
<span class="c-dc">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">config</span>():
    <span class="c-kw">return</span> {<span class="c-st">'timeout'</span>: <span class="c-nb">5</span>}

<span class="c-cm"># tests/integration/conftest.py (misma carpeta padre)</span>
<span class="c-dc">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">config</span>():
    <span class="c-kw">return</span> {<span class="c-st">'timeout'</span>: <span class="c-nb">60</span>}
<span class="c-cm"># un test movido de integration/ a unit/ cambia de "config" sin ningún error</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-cm"># Nombres específicos por contexto -- evita el shadowing silencioso</span>
<span class="c-dc">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">unit_config</span>():
    <span class="c-kw">return</span> {<span class="c-st">'timeout'</span>: <span class="c-nb">5</span>}

<span class="c-dc">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">integration_config</span>():
    <span class="c-kw">return</span> {<span class="c-st">'timeout'</span>: <span class="c-nb">60</span>}</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> pytest resuelve fixtures por nombre buscando desde el conftest.py más cercano al test hacia arriba; si dos conftest.py en niveles distintos definen una fixture con el mismo nombre, la más cercana "gana" silenciosamente — sin ningún warning. Mover un archivo de test entre carpetas puede cambiar de qué fixture depende sin que el código del test cambie una sola línea.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-dc">@pytest.fixture</span>(scope=<span class="c-st">"session"</span>)
<span class="c-kw">def</span> <span class="c-fn">bench</span>():
    b = HILBench.connect(<span class="c-st">"bench-01"</span>)
    <span class="c-kw">yield</span> b
    b.disconnect()
<span class="c-cm"># bench se conecta UNA vez para toda la sesión</span>
<span class="c-cm"># pero un test deja un relay encendido -> el siguiente test hereda ese estado</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-dc">@pytest.fixture</span>(scope=<span class="c-st">"session"</span>)
<span class="c-kw">def</span> <span class="c-fn">bench</span>():
    b = HILBench.connect(<span class="c-st">"bench-01"</span>)  <span class="c-cm"># conexión cara: una vez</span>
    <span class="c-kw">yield</span> b
    b.disconnect()

<span class="c-dc">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">clean_bench</span>(bench):        <span class="c-cm"># scope function (default): resetea SIEMPRE</span>
    bench.reset()
    <span class="c-kw">yield</span> bench
    bench.stop_all()</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> el scope controla cuántas veces se ejecuta el setup/teardown, no solo cuántas veces se "crea" el recurso. Una fixture <code>scope="session"</code> es correcta para la <em>conexión</em> (cara de crear), pero si el estado del recurso (relés, buffers, contadores) puede quedar sucio entre tests, necesitas una fixture adicional de scope <code>function</code> que dependa de la de sesión y haga el reset entre cada test.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-cm"># conftest.py con 400 líneas de lógica de parseo de tramas CAN</span>
<span class="c-kw">def</span> <span class="c-fn">parse_can_frame</span>(raw): ...
<span class="c-kw">def</span> <span class="c-fn">decode_dtc</span>(code): ...
<span class="c-kw">def</span> <span class="c-fn">calculate_checksum</span>(data): ...
<span class="c-cm"># nada de esto es "test setup" -- es lógica de negocio</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-cm"># myapp/can_utils.py -- código testeable e importable normalmente</span>
<span class="c-kw">def</span> <span class="c-fn">parse_can_frame</span>(raw): ...

<span class="c-cm"># conftest.py -- solo fixtures que USAN esas funciones</span>
<span class="c-kw">from</span> myapp.can_utils <span class="c-kw">import</span> parse_can_frame

<span class="c-dc">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">parsed_frame</span>():
    <span class="c-kw">return</span> parse_can_frame(RAW_SAMPLE)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> conftest.py se carga automáticamente y sin import explícito, lo que lo hace tentador como "cajón de sastre" para cualquier función auxiliar. El problema es que esas funciones dejan de ser fácilmente descubribles, testeables de forma aislada, o reutilizables fuera de la suite de tests. Regla simple: si una función no crea/limpia un recurso de test ni engancha un hook de pytest, no pertenece a conftest.py.</div>
  </div>
  <div id="ptc-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Un conftest.py por nivel de alcance real, no uno gigante en la raíz</div>
  <p>Fixtures verdaderamente globales (logging, config base) van en el conftest.py raíz; fixtures específicas de HIL o de integración van en el conftest.py de esa subcarpeta, para que su alcance sea explícito por ubicación.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Nombra las fixtures de forma específica para evitar shadowing entre conftest.py</div>
  <p>Nombres genéricos como <code>config</code> o <code>data</code> son los que más colisionan entre conftest.py anidados. Prefiere <code>bench_config</code>, <code>sample_can_frame</code> — más largo, pero sin ambigüedad sobre cuál fixture se está usando.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Separa el scope de "crear el recurso" del scope de "resetear su estado"</div>
  <p>Una fixture de sesión para la conexión cara + una fixture de función que dependa de ella y haga el reset es el patrón estándar para recursos compartidos con estado mutable (bancos HIL, conexiones DB, servidores de prueba).</p>
</div>
<div class="practice-card">
  <div class="practice-title">conftest.py es para fixtures y hooks, no para lógica de negocio</div>
  <p>Funciones de parseo, cálculo o transformación van en módulos normales de la aplicación (importables y testeables por separado). conftest.py solo debe orquestar setup/teardown y enganchar hooks de pytest.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa pytest_addoption para parametrizar la suite desde CLI en vez de variables de entorno sueltas</div>
  <p><code>--bench-id=bench-02</code> es descubrible con <code>pytest --help</code>, validable y documentable; una variable de entorno leída ad-hoc dentro de un test no aparece en ningún lado hasta que alguien lee el código fuente.</p>
</div>
  </div>
  <div id="ptc-5" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Por qué las fixtures de conftest.py no necesitan importarse en los archivos de test?<span class="q-arr">▶</span></div><div class="quiz-a"><b>pytest descubre conftest.py automáticamente por nombre de archivo</b> y registra sus fixtures como disponibles para todos los tests del directorio y subdirectorios, inyectándolas por coincidencia de nombre de parámetro — es un mecanismo del framework, no un import de Python normal.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Dos conftest.py en carpetas distintas definen una fixture llamada "bench". ¿Cuál gana en un test dentro de la subcarpeta?<span class="q-arr">▶</span></div><div class="quiz-a"><b>La del conftest.py más cercano al test</b> (el de la subcarpeta), sin ningún warning de colisión. Es la razón principal para usar nombres de fixture específicos en vez de genéricos cuando hay conftest.py anidados.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Qué hook usarías para agregar automáticamente un mark a todos los tests dentro de una carpeta específica?<span class="q-arr">▶</span></div><div class="quiz-a"><b>pytest_collection_modifyitems(config, items).</b> Corre después de que pytest descubre todos los tests y antes de ejecutarlos, así que puedes inspeccionar la ruta de cada item (<code>item.fspath</code>) y llamar <code>item.add_marker(...)</code> según corresponda.</div></div>
</div>
  </div>
</div>`,

'pt-assert': `
<div class="tab-group-pta">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pta-1','pta')">Assert plano y rewriting</button>
    <button class="tab-btn" onclick="switchTab(this,'pta-2','pta')">pytest vs unittest (tabla)</button>
    <button class="tab-btn" onclick="switchTab(this,'pta-3','pta')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'pta-4','pta')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'pta-5','pta')">Quiz</button>
  </div>
  <div id="pta-1" class="tab-panel active">
<div class="concept-intro">pytest permite usar el <strong>assert</strong> nativo de Python (<code>assert x == y</code>) en vez de métodos especiales como <code>self.assertEqual(x, y)</code>. Esto es posible gracias a la <strong>assertion rewriting</strong>: al importar un módulo de test, pytest reescribe su bytecode para capturar el valor de cada subexpresión de la comparación, de modo que si el assert falla puede mostrar exactamente qué valores intermedios causaron el fallo — no solo "AssertionError" a secas. La reescritura ocurre en tiempo de import/colección, no en runtime, así que no hay costo de performance al ejecutar el test.</div>
<div class="code-block"><div class="code-lang">Python — Assert plano con introspección automática</div><pre>
<span class="c-kw">def</span> <span class="c-fn">test_frame</span>():
    frame = parse_can(b<span class="c-st">'\x01\x02\x03'</span>)
    <span class="c-kw">assert</span> frame.msg_id == <span class="c-nb">0x105</span>
    <span class="c-cm"># Si falla, pytest muestra:</span>
    <span class="c-cm">#   assert 0x100 == 0x105</span>
    <span class="c-cm">#   +  where 0x100 = frame.msg_id</span>
    <span class="c-cm"># -- sin necesidad de self.assertEqual ni mensaje manual</span>

<span class="c-cm"># pytest.raises -- verificar que se lanza una excepción</span>
<span class="c-kw">def</span> <span class="c-fn">test_timeout</span>():
    <span class="c-kw">with</span> pytest.raises(TimeoutError) <span class="c-kw">as</span> exc_info:
        wait_for_response(timeout=<span class="c-nb">0.001</span>)
    <span class="c-kw">assert</span> <span class="c-st">"0.001s"</span> <span class="c-kw">in</span> <span class="c-bi">str</span>(exc_info.value)

<span class="c-cm"># pytest.approx -- comparación segura de floats</span>
<span class="c-kw">def</span> <span class="c-fn">test_temperatura</span>():
    <span class="c-kw">assert</span> convert_adc(<span class="c-nb">512</span>) == pytest.approx(<span class="c-nb">85.0</span>, abs=<span class="c-nb">0.5</span>)
    <span class="c-cm"># pasa si el valor está dentro de +/- 0.5</span>

<span class="c-cm"># Mensaje custom -- se agrega DESPUÉS de la coma, se muestra si falla</span>
<span class="c-kw">def</span> <span class="c-fn">test_checksum</span>():
    frame = build_frame(data)
    <span class="c-kw">assert</span> frame.checksum == esperado, <span class="c-st">f"checksum inválido para {data!r}"</span></pre></div>
  </div>
  <div id="pta-2" class="tab-panel">
<div class="concept-intro">Cada método <code>self.assertX(...)</code> de <code>unittest.TestCase</code> tiene un equivalente directo como expresión de <code>assert</code> plano en pytest. La ventaja no es solo menos código: el assert rewriting reconstruye el mensaje de fallo automáticamente, así que no hace falta memorizar qué método usar para cada tipo de comparación.</div>
<table class="kv-table">
<tr><th>pytest (assert plano)</th><th>unittest equivalente</th><th>Qué verifica</th></tr>
<tr><td>assert x == y</td><td>self.assertEqual(x, y)</td><td>Igualdad de valor</td></tr>
<tr><td>assert x != y</td><td>self.assertNotEqual(x, y)</td><td>Desigualdad de valor</td></tr>
<tr><td>assert x</td><td>self.assertTrue(x)</td><td>bool(x) es True</td></tr>
<tr><td>assert not x</td><td>self.assertFalse(x)</td><td>bool(x) es False</td></tr>
<tr><td>assert x is None</td><td>self.assertIsNone(x)</td><td>Identidad con None</td></tr>
<tr><td>assert x is not None</td><td>self.assertIsNotNone(x)</td><td>No es None</td></tr>
<tr><td>assert x in y</td><td>self.assertIn(x, y)</td><td>Membership (contención)</td></tr>
<tr><td>assert x not in y</td><td>self.assertNotIn(x, y)</td><td>No membership</td></tr>
<tr><td>assert x is y</td><td>self.assertIs(x, y)</td><td>Misma identidad de objeto</td></tr>
<tr><td>assert isinstance(x, T)</td><td>self.assertIsInstance(x, T)</td><td>Tipo del objeto</td></tr>
<tr><td>with pytest.raises(Exc)</td><td>with self.assertRaises(Exc)</td><td>Se lanza la excepción esperada</td></tr>
<tr><td>x == pytest.approx(y, abs=e)</td><td>self.assertAlmostEqual(x, y, places=n)</td><td>Comparación de floats con tolerancia</td></tr>
<tr><td>assert x == y, "mensaje"</td><td>self.assertEqual(x, y, "mensaje")</td><td>Mensaje custom si falla</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — Mismo test, dos estilos</div><pre>
<span class="c-cm"># Estilo unittest</span>
<span class="c-kw">class</span> <span class="c-fn">TestFrame</span>(unittest.TestCase):
    <span class="c-kw">def</span> <span class="c-fn">test_ids_validos</span>(<span class="c-bi">self</span>):
        ids = get_valid_ids()
        <span class="c-bi">self</span>.assertIn(<span class="c-nb">0x105</span>, ids)
        <span class="c-bi">self</span>.assertIsInstance(ids, <span class="c-bi">list</span>)
        <span class="c-kw">with</span> <span class="c-bi">self</span>.assertRaises(ValueError):
            parse_id(<span class="c-st">"no-hex"</span>)

<span class="c-cm"># Estilo pytest -- misma cobertura, menos ceremonia</span>
<span class="c-kw">def</span> <span class="c-fn">test_ids_validos</span>():
    ids = get_valid_ids()
    <span class="c-kw">assert</span> <span class="c-nb">0x105</span> <span class="c-kw">in</span> ids
    <span class="c-kw">assert</span> isinstance(ids, <span class="c-bi">list</span>)
    <span class="c-kw">with</span> pytest.raises(ValueError):
        parse_id(<span class="c-st">"no-hex"</span>)</pre></div>
  </div>
  <div id="pta-3" class="tab-panel">
<div class="concept-intro">El assert de Python es simple, y eso lo hace fácil de usar mal de formas sutiles — desde una trampa clásica del lenguaje hasta confundir "documentar una condición" con "validar datos de producción".</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">assert</span> (resultado == esperado, <span class="c-st">"el resultado no coincide"</span>)
<span class="c-cm"># SIEMPRE pasa, sin importar resultado/esperado</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">assert</span> resultado == esperado, <span class="c-st">"el resultado no coincide"</span>
<span class="c-cm"># sin paréntesis envolviendo TODO -- la coma separa condición de mensaje</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>assert (a, b)</code> evalúa una <b>tupla</b> <code>(a, b)</code>, y una tupla no vacía siempre es truthy en Python — el assert nunca falla, sin importar los valores de <code>a</code> y <code>b</code>. Es uno de los gotchas más citados en entrevistas de Python. La sintaxis correcta de assert con mensaje es <code>assert condicion, "mensaje"</code>, sin paréntesis alrededor de ambos.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_temperatura</span>():
    <span class="c-kw">assert</span> convert_adc(<span class="c-nb">512</span>) == <span class="c-nb">85.0</span>
<span class="c-cm"># AssertionError: assert 84.99999999999999 == 85.0</span>
<span class="c-cm"># falla por error de redondeo binario, no por un bug real</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_temperatura</span>():
    <span class="c-kw">assert</span> convert_adc(<span class="c-nb">512</span>) == pytest.approx(<span class="c-nb">85.0</span>, abs=<span class="c-nb">0.01</span>)
    <span class="c-cm"># tolera el error de punto flotante esperado</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> los números de punto flotante no representan exactamente la mayoría de los decimales (IEEE 754), así que dos cálculos matemáticamente iguales pueden diferir en el último bit. Comparar floats con <code>==</code> es frágil por diseño; <code>pytest.approx(valor, abs=... o rel=...)</code> compara con una tolerancia explícita y documenta cuál es la precisión que realmente importa para ese test.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">try</span>:
    <span class="c-kw">assert</span> bench.is_connected()
<span class="c-kw">except</span> AssertionError:
    logger.warning(<span class="c-st">"bench no conectado, seguimos igual"</span>)
<span class="c-cm"># el test "pasa" aunque la aserción haya fallado</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">assert</span> bench.is_connected(), <span class="c-st">"bench no conectado -- abortar test"</span>
<span class="c-cm"># deja que el AssertionError se propague; el test debe reportarse FAILED</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> envolver un <code>assert</code> en <code>try/except AssertionError</code> convierte un fallo real de la prueba en un simple log, y el test termina reportándose como PASSED. pytest necesita que el <code>AssertionError</code> se propague sin capturar para marcar el test como fallido; nunca "atrapes" tus propias aserciones salvo que estés testeando explícitamente que algo lanza <code>AssertionError</code>.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">set_speed</span>(kmh):
    <span class="c-kw">assert</span> <span class="c-nb">0</span> &lt;= kmh &lt;= <span class="c-nb">300</span>, <span class="c-st">"velocidad fuera de rango"</span>
    _hardware.write_speed(kmh)
<span class="c-cm"># código de PRODUCCIÓN validando con assert</span>
<span class="c-cm"># python -O (u optimizaciones) ELIMINA los asserts en runtime</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">set_speed</span>(kmh):
    <span class="c-kw">if</span> <span class="c-kw">not</span> (<span class="c-nb">0</span> &lt;= kmh &lt;= <span class="c-nb">300</span>):
        <span class="c-kw">raise</span> <span class="c-bi">ValueError</span>(<span class="c-st">f"velocidad fuera de rango: {kmh}"</span>)
    _hardware.write_speed(kmh)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> Python elimina todas las sentencias <code>assert</code> cuando se ejecuta con optimizaciones (<code>python -O</code> o <code>PYTHONOPTIMIZE=1</code>), algo común en builds de release. Un <code>assert</code> usado para validar entradas de producción simplemente desaparece en ese modo — la validación de negocio real debe hacerse con <code>if</code> + <code>raise</code> de una excepción explícita. <code>assert</code> es para tests y para invariantes internas que asumes que nunca deberían fallar si el código es correcto.</div>
  </div>
  <div id="pta-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Deja que el assertion rewriting haga el trabajo — evita mensajes redundantes</div>
  <p><code>assert x == y</code> ya muestra los valores de <code>x</code> e <code>y</code> al fallar. Agrega un mensaje custom solo cuando aporta contexto que el valor por sí solo no da (por ejemplo, qué caso de negocio representa).</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa pytest.approx para todo lo que involucre floats</div>
  <p>Cualquier comparación de resultados de cálculos con decimales (conversión de ADC, promedios, unidades físicas) debe pasar por <code>pytest.approx</code> con una tolerancia explícita — nunca <code>==</code> directo.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa pytest.raises como context manager, no assertRaises manual con try/except</div>
  <p><code>with pytest.raises(TipoError) as exc_info:</code> es más corto, y <code>exc_info.value</code> te da acceso directo a la excepción para inspeccionar su mensaje o atributos.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Nunca captures AssertionError dentro de un test</div>
  <p>Si necesitas verificar que algo lanza <code>AssertionError</code> específicamente, usa <code>pytest.raises(AssertionError)</code> — nunca envuelvas tus propias aserciones en <code>try/except</code> "por las dudas".</p>
</div>
<div class="practice-card">
  <div class="practice-title">assert es para tests e invariantes de desarrollo, no para validar entradas en producción</div>
  <p>En código de aplicación (no de test), valida con <code>if</code> + <code>raise ValueError/TypeError(...)</code>. Reserva <code>assert</code> para invariantes internas ("esto nunca debería pasar si el resto del código es correcto") sabiendo que se eliminan con <code>-O</code>.</p>
</div>
  </div>
  <div id="pta-5" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿Este test detecta un resultado incorrecto?<br><code>assert (calcular() == 10, "debe ser 10")</code><span class="q-arr">▶</span></div><div class="quiz-a"><b>No, nunca falla.</b> <code>(calcular() == 10, "debe ser 10")</code> es una tupla de dos elementos, y una tupla no vacía siempre es truthy — el assert pasa sin importar el resultado de <code>calcular()</code>. La forma correcta es <code>assert calcular() == 10, "debe ser 10"</code> sin paréntesis envolventes.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Qué es el "assertion rewriting" de pytest y cuándo ocurre?<span class="q-arr">▶</span></div><div class="quiz-a"><b>pytest reescribe el bytecode de los módulos de test en tiempo de import/colección</b> para capturar los valores de las subexpresiones dentro de un <code>assert</code>, de modo que al fallar puede mostrar exactamente qué valores intermedios causaron el fallo — sin que el desarrollador llame a un método especial como <code>assertEqual</code>.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿Por qué falla intermitentemente un assert con == entre dos floats calculados de formas distintas?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Por representación de punto flotante (IEEE 754).</b> Dos cálculos matemáticamente equivalentes pueden diferir en los últimos bits del resultado. La solución es comparar con <code>pytest.approx(valor, abs=... o rel=...)</code> en vez de <code>==</code> directo.</div></div>
</div>
  </div>
</div>`,

'pt-reportes': `
<div class="tab-group-pte">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pte-1','pte')">Reportes HTML y JUnit XML</button>
    <button class="tab-btn" onclick="switchTab(this,'pte-2','pte')">CSV/JSON y pytest.ini</button>
    <button class="tab-btn" onclick="switchTab(this,'pte-3','pte')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'pte-4','pte')">✅ Mejores Prácticas + Quiz</button>
  </div>
  <div id="pte-1" class="tab-panel active">
<div class="concept-intro">pytest no genera reportes ricos por sí solo — necesita plugins. Los dos formatos que aparecen en casi cualquier pipeline de CI son <strong>HTML</strong> (para revisar resultados a simple vista, un humano lo abre en el navegador) y <strong>JUnit XML</strong> (el formato estándar que Jenkins, GitLab CI, Azure DevOps y GitHub Actions saben interpretar para mostrar pass/fail directamente en la interfaz del pipeline, sin que nadie tenga que abrir un archivo).</div>
<table class="kv-table">
<tr><th>Formato</th><th>Plugin / flag</th><th>Uso típico</th></tr>
<tr><td>HTML</td><td>pip install pytest-html → --html=report.html</td><td>Revisión humana, adjuntar como artefacto de build</td></tr>
<tr><td>JUnit XML</td><td>Built-in → --junitxml=junit.xml</td><td>Integración nativa con Jenkins/GitLab CI/GitHub Actions</td></tr>
<tr><td>Allure</td><td>pip install allure-pytest + allure CLI → --alluredir=results</td><td>Dashboard interactivo con historial y adjuntos</td></tr>
<tr><td>Coverage HTML</td><td>pip install pytest-cov → --cov-report=html</td><td>Ver línea por línea qué código no está cubierto</td></tr>
</table>
<div class="code-block"><div class="code-lang">Shell — Generar reportes HTML y JUnit</div><pre>
<span class="c-cm"># HTML autocontenido (requiere: pip install pytest-html)</span>
pytest --html=reports/test_report.html --self-contained-html

<span class="c-cm"># JUnit XML (formato que entienden Jenkins/GitLab/GitHub Actions)</span>
pytest --junitxml=reports/junit.xml

<span class="c-cm"># Ambos a la vez, en modo verbose</span>
pytest --html=report.html --self-contained-html --junitxml=junit.xml -v

<span class="c-cm"># Allure (requiere: pip install allure-pytest + allure CLI instalado aparte)</span>
pytest --alluredir=allure-results
allure serve allure-results   <span class="c-cm"># levanta un dashboard interactivo en el navegador</span>

<span class="c-cm"># Coverage + reporte HTML navegable línea por línea</span>
pytest --cov=src --cov-report=html --cov-report=term-missing</pre></div>
  </div>
  <div id="pte-2" class="tab-panel">
<div class="concept-intro">Para exportar resultados a herramientas de análisis (dashboards internos, hojas de cálculo de calidad, ingestión en un data warehouse) suele hacer falta <strong>CSV o JSON</strong> vía plugins adicionales. Y para que todos estos flags no haya que escribirlos a mano en cada invocación, <strong>pytest.ini</strong> centraliza la configuración por defecto del proyecto.</div>
<div class="code-block"><div class="code-lang">Shell — Reportes CSV / JSON</div><pre>
<span class="c-cm"># JSON estructurado (requiere: pip install pytest-json-report)</span>
pytest --json-report --json-report-file=reports/results.json

<span class="c-cm"># CSV con resultados por test (requiere: pip install pytest-csv)</span>
pytest --csv=reports/results.csv

<span class="c-cm"># Combinar JUnit + JSON en un solo run para distintos consumidores</span>
pytest --junitxml=junit.xml --json-report --json-report-file=results.json</pre></div>
<div class="code-block"><div class="code-lang">INI — pytest.ini con configuración de reportes por defecto</div><pre>
<span class="c-cm">[pytest]</span>
<span class="c-cm">testpaths = tests</span>
<span class="c-cm">addopts =</span>
<span class="c-cm">    --strict-markers</span>
<span class="c-cm">    --html=reports/report.html --self-contained-html</span>
<span class="c-cm">    --junitxml=reports/junit.xml</span>
<span class="c-cm">    -ra</span>
<span class="c-cm">markers =</span>
<span class="c-cm">    hil: requiere banco HIL físico</span>
<span class="c-cm">    slow: tests de más de 30 segundos</span>
<span class="c-cm">filterwarnings =</span>
<span class="c-cm">    error</span>
<span class="c-cm">    ignore::DeprecationWarning:some_legacy_lib</span>
<span class="c-cm">minversion = 7.0</span></pre></div>
<table class="kv-table">
<tr><th>Opción en pytest.ini</th><th>Qué controla</th><th>Ejemplo → Resultado</th></tr>
<tr><td>testpaths</td><td>Dónde buscar tests por defecto (sin pasar la ruta a mano)</td><td>testpaths = tests → pytest sin args busca solo ahí</td></tr>
<tr><td>addopts</td><td>Flags de CLI que se aplican siempre, sin escribirlos cada vez</td><td>addopts = -ra → resumen de todo lo no-pasado siempre activo</td></tr>
<tr><td>markers</td><td>Registro de marks custom (evita warnings/errores con --strict-markers)</td><td>markers = hil: ... → @pytest.mark.hil válido</td></tr>
<tr><td>filterwarnings</td><td>Cómo tratar warnings de Python durante el run</td><td>error → cualquier warning se convierte en fallo</td></tr>
</table>
  </div>
  <div id="pte-3" class="tab-panel">
<div class="concept-intro">Los reportes suelen fallar en cosas invisibles hasta que alguien intenta abrirlos fuera del entorno donde se generaron, o hasta que el pipeline de CI necesita el archivo y no lo encuentra.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>pytest --html=reports/report.html
<span class="c-cm"># genera report.html + una carpeta "assets/" con CSS/JS separados</span>
<span class="c-cm"># mover solo el .html a otra máquina -> reporte roto, sin estilos</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>pytest --html=reports/report.html --self-contained-html
<span class="c-cm"># todo el CSS/JS embebido en un único archivo .html portable</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> por defecto <code>pytest-html</code> separa los assets estáticos (CSS, JS) del HTML del reporte para reutilizarlos entre corridas. Eso está bien si el reporte se sirve desde el mismo directorio donde se generó, pero rompe en cuanto alguien copia solo el <code>.html</code> como adjunto de un correo o de un artefacto de CI. <code>--self-contained-html</code> embebe todo en un solo archivo, más pesado pero portable.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-cm"># sin testpaths en pytest.ini, ejecutado desde la raíz del repo</span>
pytest
<span class="c-cm"># descubre tests dentro de .venv/, node_modules/, vendored libs...</span>
<span class="c-cm"># run de 40 minutos en vez de 3</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-cm"># pytest.ini</span>
<span class="c-cm">[pytest]</span>
<span class="c-cm">testpaths = tests</span>
<span class="c-cm"># pytest sin argumentos solo busca dentro de tests/</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> sin <code>testpaths</code>, pytest colecciona tests recursivamente desde el directorio actual, incluyendo entornos virtuales o dependencias vendored si por accidente contienen archivos <code>test_*.py</code>. En proyectos grandes esto infla el tiempo de colección y ejecución de forma silenciosa — el pipeline "funciona" pero tarda mucho más de lo necesario.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>pytest --junitxml=reports/junit.xml
<span class="c-cm"># si hay un ERROR de colección (import roto, fixture faltante),</span>
<span class="c-cm"># pytest puede salir sin escribir junit.xml -- el paso de CI que</span>
<span class="c-cm"># publica el reporte falla porque el archivo no existe</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-cm"># separa "correr tests" de "publicar reporte" con continue-on-error</span>
<span class="c-cm"># en el step de CI, y valida explícitamente que el XML se generó:</span>
pytest --junitxml=reports/junit.xml <span class="c-cm">|| true</span>
<span class="c-cm">test -f reports/junit.xml || (echo "junit.xml no generado" &amp;&amp; exit 1)</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> un error de colección (un <code>import</code> roto en un archivo de test, una fixture que no existe) puede impedir que pytest llegue a la fase de generar reportes, dependiendo del plugin y la versión. Si el pipeline de CI asume ciegamente que el archivo de reporte siempre existe después de correr pytest, un fallo de colección puede tumbar el pipeline entero con un error confuso de "archivo no encontrado" en vez de mostrar el error de import real.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>pytest --junitxml=reports/junit.xml
<span class="c-cm"># mismo nombre de archivo en cada corrida de CI</span>
<span class="c-cm"># el reporte anterior se sobreescribe -- sin historial para comparar tendencias</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-cm"># usa el número de build o timestamp en el nombre del artefacto,</span>
<span class="c-cm"># y deja que el sistema de CI archive cada uno como artefacto versionado</span>
pytest --junitxml=<span class="c-st">"reports/junit-$BUILD_NUMBER.xml"</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> generar siempre el mismo nombre de archivo es cómodo localmente, pero en CI pierde la posibilidad de comparar tendencias entre builds (¿cuántos tests fallan hoy vs. la semana pasada?). La mayoría de los sistemas de CI ya versionan artefactos por build automáticamente si se publican como tales — la clave es no depender de un único archivo fijo como única fuente de verdad histórica.</div>
  </div>
  <div id="pte-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Usa --self-contained-html siempre que el reporte se comparta fuera del entorno de CI</div>
  <p>Un solo archivo portable evita el clásico "el reporte se ve roto" al descargarlo como artefacto o adjuntarlo a un correo.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Centraliza flags recurrentes en pytest.ini con addopts, no en scripts de CI dispersos</div>
  <p>Si cinco pipelines distintos invocan pytest con los mismos 6 flags, un cambio (agregar un nuevo mark, cambiar la ruta de reportes) requiere tocar los 5 lugares. <code>addopts</code> en pytest.ini es la fuente única de verdad.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Define testpaths explícito en cualquier repo con más que una carpeta de tests</div>
  <p>Evita colección accidental de entornos virtuales o dependencias vendored, y hace que <code>pytest</code> sin argumentos sea rápido y predecible tanto en local como en CI.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Genera JUnit XML incluso si usas otro formato como reporte "principal"</div>
  <p>Es el formato universal que casi cualquier sistema de CI sabe leer nativamente para mostrar pass/fail en su UI — genéralo siempre como mínimo común denominador, aunque el equipo prefiera revisar el HTML o Allure.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Verifica explícitamente en CI que el archivo de reporte se generó</div>
  <p>Un paso simple que confirme la existencia del <code>.xml</code>/<code>.html</code> antes de publicarlo evita que un fallo de colección se disfrace de "no se encontró el artefacto" en una etapa posterior del pipeline.</p>
</div>
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Generaste un reporte con pytest --html=report.html (sin --self-contained-html) y lo adjuntaste solo a un correo. ¿Se ve bien?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No necesariamente.</b> Sin <code>--self-contained-html</code>, pytest-html separa CSS/JS en una carpeta de assets junto al HTML. Si solo mueves o adjuntas el archivo <code>.html</code> sin esa carpeta, el reporte pierde sus estilos. <code>--self-contained-html</code> embebe todo en un solo archivo.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Por qué JUnit XML es el formato más común en integraciones de CI, más que HTML o Allure?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Es un formato estándar y ampliamente soportado de forma nativa</b> por Jenkins, GitLab CI, GitHub Actions y Azure DevOps: estas plataformas lo parsean directamente para mostrar pass/fail, tiempos y fallos en su propia interfaz, sin necesitar que un humano abra un archivo aparte.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Para qué sirve testpaths en pytest.ini?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Limita dónde busca tests pytest cuando se ejecuta sin argumentos.</b> Sin él, pytest colecciona recursivamente desde el directorio actual, lo que puede incluir entornos virtuales o dependencias vendored por accidente, inflando el tiempo de colección y ejecución.</div></div>
</div>
  </div>
</div>`,

'coverage': `
<div class="tab-group-cov">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'cov-1','cov')">coverage.py básico</button>
    <button class="tab-btn" onclick="switchTab(this,'cov-2','cov')">pytest-cov y configuración</button>
    <button class="tab-btn" onclick="switchTab(this,'cov-3','cov')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'cov-4','cov')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'cov-5','cov')">Quiz</button>
  </div>
  <div id="cov-1" class="tab-panel active">
<div class="concept-intro"><strong>coverage.py</strong> mide qué líneas (y opcionalmente qué ramas) de tu código se ejecutaron durante una corrida de tests. Es un termómetro de <em>exposición</em>, no de calidad: un 100% de cobertura no significa que los asserts sean correctos, solo que el intérprete pasó por esas líneas. Se usa para encontrar código automotriz crítico (handlers de DTC, parsers CAN) que nadie está probando.</div>
<table class="kv-table">
<tr><th>Comando</th><th>Qué hace</th><th>Ejemplo → Resultado</th><th>Nota</th></tr>
<tr><td>coverage run -m pytest</td><td>Ejecuta pytest midiendo cobertura línea por línea</td><td>coverage run -m pytest tests/ → genera .coverage</td><td>Archivo binario intermedio, no es legible directamente</td></tr>
<tr><td>coverage report</td><td>Muestra el % de cobertura por archivo en terminal</td><td>coverage report → TOTAL 82%</td><td>Sin -m no ves qué líneas faltan cubrir</td></tr>
<tr><td>coverage report -m</td><td>Igual, pero además lista los números de línea sin cubrir</td><td>coverage report -m → Missing: 45-52, 78</td><td>La bandera más útil para desarrollo local</td></tr>
<tr><td>coverage html</td><td>Genera reporte HTML navegable línea por línea</td><td>coverage html → htmlcov/index.html</td><td>Resalta en verde lo cubierto y en rojo lo faltante</td></tr>
<tr><td>coverage xml</td><td>Genera reporte en formato XML</td><td>coverage xml → coverage.xml</td><td>Formato que consumen Codecov, SonarQube, Jenkins</td></tr>
<tr><td>coverage json</td><td>Genera reporte en formato JSON</td><td>coverage json → coverage.json</td><td>Útil para scripts propios de análisis de tendencia</td></tr>
<tr><td>coverage erase</td><td>Borra los datos de corridas previas</td><td>coverage erase → elimina .coverage</td><td>Recomendado antes de combinar corridas nuevas</td></tr>
<tr><td>coverage combine</td><td>Une varios archivos .coverage en uno solo</td><td>coverage combine → un único .coverage</td><td>Necesario cuando corres tests en paralelo (pytest-xdist)</td></tr>
</table>
<div class="code-block"><div class="code-lang">Shell — flujo completo con coverage.py</div><pre>
<span class="c-cm"># 1. Ejecutar tests midiendo cobertura</span>
coverage run -m pytest tests/

<span class="c-cm"># 2. Ver resumen en terminal con líneas faltantes</span>
coverage report -m

<span class="c-cm"># Salida típica:</span>
<span class="c-cm"># Name                    Stmts   Miss  Cover   Missing</span>
<span class="c-cm"># -----------------------------------------------------</span>
<span class="c-cm"># src/can_parser.py         120     18    85%   45-52, 78, 101-105</span>
<span class="c-cm"># src/dtc_handler.py         64      4    94%   30-33</span>
<span class="c-cm"># -----------------------------------------------------</span>
<span class="c-cm"># TOTAL                     184     22    88%</span>

<span class="c-cm"># 3. Generar reporte navegable</span>
coverage html
<span class="c-cm"># abre htmlcov/index.html en el navegador — cada línea roja es una</span>
<span class="c-cm"># rama de código que ningún test tocó todavía</span>

<span class="c-cm"># 4. Limpiar antes de una corrida nueva (evita mezclar datos viejos)</span>
coverage erase &amp;&amp; coverage run -m pytest tests/</pre></div>
  </div>
  <div id="cov-2" class="tab-panel">
<div class="concept-intro"><strong>pytest-cov</strong> es el plugin que integra coverage.py directamente en pytest: agrega las banderas <code>--cov</code> sin necesitar invocar <code>coverage run</code> por separado, y respeta la configuración centralizada en <code>.coveragerc</code> o en la sección <code>[tool.coverage]</code> de <code>pyproject.toml</code>. Se usa cuando quieres que la cobertura sea parte del comando normal de test, no un paso extra manual.</div>
<table class="kv-table">
<tr><th>Opción</th><th>Sección</th><th>Qué controla</th><th>Nota</th></tr>
<tr><td>source</td><td>[run]</td><td>Qué paquetes/carpetas medir</td><td>source = src evita medir librerías de terceros instaladas</td></tr>
<tr><td>omit</td><td>[run]</td><td>Rutas a excluir de la medición</td><td>Patrones tipo glob: */tests/*, */migrations/*</td></tr>
<tr><td>branch</td><td>[run]</td><td>Mide cobertura de ramas, no solo de líneas</td><td>branch = True detecta un if cuyo else nunca se ejecutó</td></tr>
<tr><td>fail_under</td><td>[report]</td><td>Umbral mínimo — el proceso falla si no se alcanza</td><td>fail_under = 80 corta el pipeline de CI si baja de 80%</td></tr>
<tr><td>show_missing</td><td>[report]</td><td>Muestra líneas faltantes en el resumen de terminal</td><td>Equivale a usar la bandera -m siempre</td></tr>
<tr><td>exclude_lines</td><td>[report]</td><td>Regex de líneas que se ignoran al medir</td><td>Típicamente pragma: no cover, if __name__ == "__main__"</td></tr>
</table>
<div class="code-block"><div class="code-lang">Config — .coveragerc</div><pre>
[run]
source = src
branch = True
omit =
    */tests/*
    */migrations/*
    */__init__.py

[report]
fail_under = 80
show_missing = True
exclude_lines =
    pragma: no cover
    if __name__ == "__main__":
    raise NotImplementedError

[html]
directory = htmlcov</pre></div>
<div class="code-block"><div class="code-lang">Equivalente en pyproject.toml + comando pytest-cov</div><pre>
[tool.coverage.run]
source = ["src"]
branch = true
omit = ["*/tests/*", "*/migrations/*"]

[tool.coverage.report]
fail_under = 80
show_missing = true

<span class="c-cm"># Uso directo con pytest-cov (lee la config de arriba automáticamente)</span>
pytest --cov=src --cov-report=term-missing --cov-report=html --cov-branch

<span class="c-cm"># Gatear el pipeline de CI si la cobertura cae por debajo del umbral</span>
pytest --cov=src --cov-fail-under=80</pre></div>
  </div>
  <div id="cov-3" class="tab-panel">
<div class="concept-intro">Estos son los errores más frecuentes al usar coverage en proyectos reales de bench/HIL. La causa raíz casi siempre es confundir "el código se ejecutó" con "el código está bien probado".</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-cm"># 100% de cobertura, pero el test no verifica nada real</span>
<span class="c-kw">def</span> <span class="c-fn">test_parse_can_frame</span>():
    resultado = parse_can_frame(raw_bytes)  <span class="c-cm"># nunca se compara con nada</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_parse_can_frame</span>():
    resultado = parse_can_frame(raw_bytes)
    <span class="c-kw">assert</span> resultado.can_id == <span class="c-nb">0x2A5</span>
    <span class="c-kw">assert</span> resultado.data == [<span class="c-nb">1</span>, <span class="c-nb">255</span>, <span class="c-nb">0</span>, <span class="c-nb">0</span>]</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> coverage solo instrumenta qué líneas se ejecutan, no evalúa los asserts. Un test sin asserts (o con asserts triviales) infla el porcentaje sin aportar ninguna garantía real. El número de coverage debe leerse siempre junto al contenido de los tests, nunca solo.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-cm"># Sin branch=True: un if/else con solo la rama "true" cubierta</span>
<span class="c-cm"># ya marca la línea como 100% cubierta</span>
<span class="c-kw">def</span> <span class="c-fn">check_voltage</span>(v):
    <span class="c-kw">if</span> v &gt; <span class="c-nb">14.5</span>:
        <span class="c-kw">return</span> <span class="c-st">"OVERVOLTAGE"</span>
    <span class="c-kw">return</span> <span class="c-st">"OK"</span>  <span class="c-cm"># jamás ejercitado por ningún test</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-cm"># coverage run --branch (o branch = True en .coveragerc)</span>
<span class="c-kw">def</span> <span class="c-fn">test_check_voltage_normal</span>():
    <span class="c-kw">assert</span> check_voltage(<span class="c-nb">12.6</span>) == <span class="c-st">"OK"</span>

<span class="c-kw">def</span> <span class="c-fn">test_check_voltage_over</span>():
    <span class="c-kw">assert</span> check_voltage(<span class="c-nb">15.0</span>) == <span class="c-st">"OVERVOLTAGE"</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> la cobertura de líneas solo verifica que cada línea se ejecutó al menos una vez, no que todas sus ramas se ejercitaron. Un if de una sola línea puede aparecer "cubierto" habiendo probado solo la mitad de los caminos posibles. La cobertura de ramas (branch coverage) es la que realmente detecta huecos de lógica.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-cm"># source no configurado: coverage mide TODO lo importado,</span>
<span class="c-cm"># incluyendo site-packages de terceros</span>
coverage run -m pytest
<span class="c-cm"># TOTAL 34% — engañosamente bajo, diluido por librerías externas</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-cm"># .coveragerc: source = src</span>
coverage run -m pytest
<span class="c-cm"># TOTAL 88% — refleja solo tu código de negocio</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> sin un source/omit explícito, coverage.py incluye cualquier módulo importado durante la corrida, incluyendo dependencias de terceros. Eso distorsiona el número hacia abajo (o hacia arriba si la librería está bien probada) y hace que el porcentaje deje de significar algo útil sobre tu propio código.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-cm"># Corriendo con pytest-xdist en paralelo (-n auto) sin combinar</span>
pytest --cov=src -n <span class="c-nb">4</span>
coverage html
<span class="c-cm"># CoverageWarning: No data was collected — cada worker escribió</span>
<span class="c-cm"># su propio .coverage.HOSTNAME.PID y nunca se unieron</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-cm"># .coveragerc: [run] parallel = True</span>
pytest --cov=src -n <span class="c-nb">4</span>
coverage combine   <span class="c-cm"># une los .coverage.* de todos los workers</span>
coverage html</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> con ejecución paralela, cada proceso worker escribe su propio archivo de datos parcial. Sin <code>parallel = True</code> en la config y sin <code>coverage combine</code> antes de generar el reporte, coverage.py solo ve el archivo del último worker (o ninguno), dando un número de cobertura incompleto o directamente vacío.</div>
  </div>
  <div id="cov-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Usa siempre --cov-report=term-missing en desarrollo local</div>
  <p>Ver el número total no dice nada accionable. Ver <code>Missing: 45-52, 78</code> te dice exactamente qué línea abrir. Configúralo como default en pytest.ini/pyproject para no tener que recordarlo cada vez.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Gatea el pipeline de CI con fail_under, no solo lo reportes</div>
  <p><code>pytest --cov-fail-under=80</code> hace que el build falle si la cobertura baja del umbral. Un número que solo se "muestra" en un dashboard tiende a degradarse con el tiempo sin que nadie lo note.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Activa branch=True para código con lógica condicional crítica</div>
  <p>En handlers de diagnóstico automotriz (DTC, umbrales de voltaje/temperatura) los bugs suelen vivir en la rama que nadie probó. La cobertura de líneas sola no los detecta; la de ramas sí.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa # pragma: no cover con criterio, no como atajo</div>
  <p>Está bien excluir un <code>if __name__ == "__main__":</code> o un log de debug inalcanzable. No está bien usarlo para "esconder" código de negocio que da flojera probar — eso oculta el hueco real en vez de resolverlo.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Trackea la tendencia del coverage, no solo el número absoluto</div>
  <p>Sube coverage.xml a Codecov/SonarQube en cada PR. Una caída de 88% a 82% en un solo PR es una señal mucho más útil que "82% total" visto de forma aislada — te dice exactamente qué cambio introdujo el hueco.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Combina coverage con revisión manual de la lista de líneas faltantes</div>
  <p>Antes de cerrar un PR, abre htmlcov/index.html y revisa en rojo qué quedó sin cubrir. A menudo son los edge cases más importantes (timeouts de bus CAN, respuestas de error del bench) los que quedan fuera por ser los más difíciles de simular.</p>
</div>
  </div>
  <div id="cov-5" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Un módulo tiene 100% de cobertura de líneas. ¿Eso garantiza que está bien probado?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No.</b> Coverage solo mide qué líneas se ejecutaron, no si los asserts verifican el comportamiento correcto ni si se cubrieron todas las ramas lógicas (branch coverage). Un test sin asserts reales puede dar 100% sin aportar ninguna garantía.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Cuál es la diferencia entre cobertura de líneas y cobertura de ramas (branch)?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Líneas</b> verifica que cada línea se ejecutó al menos una vez. <b>Ramas</b> verifica que cada camino posible de una condición (if verdadero Y falso) se ejercitó. Un if de una línea puede marcar 100% de cobertura de líneas habiendo probado solo una de las dos ramas.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>¿Por qué corriendo pytest-xdist en paralelo a veces coverage reporta 0% o "No data was collected"?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Porque cada worker escribe su propio archivo .coverage parcial.</b> Sin <code>parallel = True</code> en la configuración y sin ejecutar <code>coverage combine</code> antes de generar el reporte, los datos de los workers nunca se unifican en un solo archivo legible.</div></div>
</div>
  </div>
</div>`,

'ut-api': `
<div class="tab-group-uap">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'uap-1','uap')">Testear endpoints con requests + pytest</button>
    <button class="tab-btn" onclick="switchTab(this,'uap-2','uap')">Mockear respuestas HTTP</button>
    <button class="tab-btn" onclick="switchTab(this,'uap-3','uap')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'uap-4','uap')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'uap-5','uap')">Quiz</button>
  </div>
  <div id="uap-1" class="tab-panel active">
<div class="concept-intro">Testear una API con <code>requests</code> + <code>pytest</code> significa disparar peticiones HTTP reales (o mockeadas) contra un servicio — típicamente el backend de un bench de pruebas, un gateway de diagnóstico, o un servicio HIL — y verificar código de estado, estructura de la respuesta y efectos secundarios. Se usa para validar contratos entre el firmware/servicio y quien lo consume, sin depender de una UI.</div>
<table class="kv-table">
<tr><th>Elemento</th><th>Qué representa</th><th>Ejemplo → Resultado</th><th>Nota</th></tr>
<tr><td>r.status_code</td><td>Código HTTP de la respuesta</td><td>r.status_code == 200 → True/False</td><td>2xx éxito, 4xx error de cliente, 5xx error de servidor</td></tr>
<tr><td>r.json()</td><td>Parsea el body como JSON a dict/list</td><td>r.json() → {"speed": 87.5}</td><td>Lanza JSONDecodeError si el body no es JSON válido</td></tr>
<tr><td>r.headers</td><td>Headers de la respuesta</td><td>r.headers["Content-Type"] → application/json</td><td>Acceso case-insensitive</td></tr>
<tr><td>r.raise_for_status()</td><td>Lanza HTTPError si el status es 4xx/5xx</td><td>raise_for_status() → HTTPError: 404</td><td>Útil junto a pytest.raises para probar errores</td></tr>
<tr><td>timeout=</td><td>Límite de espera de la petición</td><td>requests.get(url, timeout=5) → TimeoutError si excede</td><td>Nunca omitir en tests — evita que un bench colgado cuelgue el CI</td></tr>
<tr><td>r.elapsed</td><td>Tiempo que tardó la petición</td><td>r.elapsed.total_seconds() → 0.42</td><td>Útil para tests de rendimiento básicos (SLA de latencia)</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — API testing con requests y pytest</div><pre>
<span class="c-kw">import</span> pytest
<span class="c-kw">import</span> requests

BASE_URL = <span class="c-st">"http://localhost:8080/api"</span>

<span class="c-dc">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">base_url</span>():
    <span class="c-kw">return</span> BASE_URL

<span class="c-kw">def</span> <span class="c-fn">test_get_vehicle_status</span>(base_url):
    r = requests.get(<span class="c-kw">f</span><span class="c-st">f"{base_url}/vehicle/status"</span>, timeout=<span class="c-nb">5</span>)
    <span class="c-kw">assert</span> r.status_code == <span class="c-nb">200</span>
    data = r.json()
    <span class="c-kw">assert</span> <span class="c-st">"speed"</span> <span class="c-kw">in</span> data
    <span class="c-kw">assert</span> isinstance(data[<span class="c-st">"speed"</span>], <span class="c-bi">float</span>)

<span class="c-kw">def</span> <span class="c-fn">test_post_command_created</span>(base_url):
    payload = {<span class="c-st">"command"</span>: <span class="c-st">"IGNITION_ON"</span>}
    r = requests.post(<span class="c-kw">f</span><span class="c-st">f"{base_url}/command"</span>, json=payload, timeout=<span class="c-nb">5</span>)
    <span class="c-kw">assert</span> r.status_code == <span class="c-nb">201</span>
    <span class="c-kw">assert</span> r.json()[<span class="c-st">"status"</span>] == <span class="c-st">"accepted"</span>

<span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"command,expected_status"</span>, [
    (<span class="c-st">"IGNITION_ON"</span>, <span class="c-nb">201</span>),
    (<span class="c-st">"INVALID_CMD"</span>, <span class="c-nb">400</span>),
    (<span class="c-st">""</span>, <span class="c-nb">422</span>),
])
<span class="c-kw">def</span> <span class="c-fn">test_command_status_codes</span>(base_url, command, expected_status):
    r = requests.post(<span class="c-kw">f</span><span class="c-st">f"{base_url}/command"</span>, json={<span class="c-st">"command"</span>: command}, timeout=<span class="c-nb">5</span>)
    <span class="c-kw">assert</span> r.status_code == expected_status

<span class="c-kw">def</span> <span class="c-fn">test_get_unknown_endpoint_raises</span>(base_url):
    r = requests.get(<span class="c-kw">f</span><span class="c-st">f"{base_url}/no-existe"</span>, timeout=<span class="c-nb">5</span>)
    <span class="c-kw">with</span> pytest.raises(requests.HTTPError):
        r.raise_for_status()</pre></div>
  </div>
  <div id="uap-2" class="tab-panel">
<div class="concept-intro">Mockear respuestas HTTP evita depender de un servidor real levantado durante los tests: los hace más rápidos, deterministas y capaces de correr en CI sin infraestructura. Se usa para simular tanto respuestas exitosas como errores de red que son difíciles de reproducir contra un bench físico (timeout, 503, JSON corrupto).</div>
<table class="kv-table">
<tr><th>Librería</th><th>Instalación</th><th>Estilo</th><th>Cuándo usarla</th></tr>
<tr><td>responses</td><td>pip install responses</td><td>Decorador @responses.activate; registra URL exacta o regex</td><td>Tests que usan requests directamente, la más popular</td></tr>
<tr><td>requests-mock</td><td>pip install requests-mock</td><td>Fixture requests_mock inyectada por pytest</td><td>Cuando ya usas pytest y prefieres fixtures sobre decoradores</td></tr>
<tr><td>httpretty</td><td>pip install httpretty</td><td>Intercepta a nivel de socket, no solo requests</td><td>Cuando el código usa urllib u otra librería HTTP además de requests</td></tr>
<tr><td>pytest-httpserver</td><td>pip install pytest-httpserver</td><td>Levanta un servidor HTTP local real y efímero</td><td>Cuando necesitas probar contra un servidor de verdad (streaming, headers complejos)</td></tr>
<tr><td>unittest.mock</td><td>Incluido en stdlib</td><td>Mockea el objeto requests.Session/get directamente</td><td>Cuando no quieres agregar dependencias externas</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — responses vs requests-mock</div><pre>
<span class="c-cm"># --- Opción A: responses ---</span>
<span class="c-kw">import</span> responses
<span class="c-kw">import</span> requests

<span class="c-dc">@responses.activate</span>
<span class="c-kw">def</span> <span class="c-fn">test_offline_status</span>():
    responses.add(
        responses.GET,
        <span class="c-st">"http://localhost:8080/api/vehicle/status"</span>,
        json={<span class="c-st">"speed"</span>: <span class="c-nb">0.0</span>},
        status=<span class="c-nb">200</span>,
    )
    r = requests.get(<span class="c-st">"http://localhost:8080/api/vehicle/status"</span>)
    <span class="c-kw">assert</span> r.json()[<span class="c-st">"speed"</span>] == <span class="c-nb">0.0</span>

<span class="c-dc">@responses.activate</span>
<span class="c-kw">def</span> <span class="c-fn">test_bench_timeout</span>():
    responses.add(
        responses.GET,
        <span class="c-st">"http://localhost:8080/api/vehicle/status"</span>,
        body=requests.exceptions.ConnectTimeout(<span class="c-st">"bench no responde"</span>),
    )
    <span class="c-kw">with</span> pytest.raises(requests.exceptions.ConnectTimeout):
        requests.get(<span class="c-st">"http://localhost:8080/api/vehicle/status"</span>)

<span class="c-cm"># --- Opción B: requests-mock (fixture inyectada por pytest) ---</span>
<span class="c-kw">def</span> <span class="c-fn">test_offline_status_rm</span>(requests_mock):
    requests_mock.get(
        <span class="c-st">"http://localhost:8080/api/vehicle/status"</span>,
        json={<span class="c-st">"speed"</span>: <span class="c-nb">0.0</span>},
        status_code=<span class="c-nb">200</span>,
    )
    r = requests.get(<span class="c-st">"http://localhost:8080/api/vehicle/status"</span>)
    <span class="c-kw">assert</span> r.status_code == <span class="c-nb">200</span>
    <span class="c-kw">assert</span> requests_mock.call_count == <span class="c-nb">1</span>   <span class="c-cm"># verifica que sí se llamó</span></pre></div>
  </div>
  <div id="uap-3" class="tab-panel">
<div class="concept-intro">Errores frecuentes al testear APIs de servicios de bench/HIL, casi siempre relacionados con depender de una red real o validar de más/de menos.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>BASE_URL = <span class="c-st">"https://bench-prod.empresa.com/api"</span>
<span class="c-cm"># los tests pegan al bench de producción real</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">import</span> os
BASE_URL = os.environ.get(<span class="c-st">"BENCH_API_URL"</span>, <span class="c-st">"http://localhost:8080/api"</span>)
<span class="c-cm"># default seguro apuntando a un bench local/mock; prod solo vía env var explícita en CI</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> hardcodear la URL de producción hace que correr la suite de tests en local o en CI dispare comandos reales contra hardware/servicios en uso — potencialmente peligroso en un bench automotriz. Siempre parametriza la URL vía fixture o variable de entorno con un default seguro.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_get_status</span>(base_url):
    r = requests.get(<span class="c-kw">f</span><span class="c-st">f"{base_url}/status"</span>)
    <span class="c-kw">assert</span> r.status_code == <span class="c-nb">200</span>
<span class="c-cm"># nunca se prueba qué pasa si el bench devuelve 500 o se cae la conexión</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_get_status_server_error</span>(requests_mock, base_url):
    requests_mock.get(<span class="c-kw">f</span><span class="c-st">f"{base_url}/status"</span>, status_code=<span class="c-nb">500</span>)
    r = requests.get(<span class="c-kw">f</span><span class="c-st">f"{base_url}/status"</span>)
    <span class="c-kw">assert</span> r.status_code == <span class="c-nb">500</span>
    <span class="c-kw">with</span> pytest.raises(requests.HTTPError):
        r.raise_for_status()</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> es fácil escribir solo el "camino feliz" porque es el que más se usa manualmente. Pero en un bench real, timeouts, 5xx y desconexiones son el caso común, no la excepción — si tu código no los maneja, el test debe demostrarlo antes de que lo descubra un ingeniero en el laboratorio a las 2am.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_get_status</span>(base_url):
    r = requests.get(<span class="c-kw">f</span><span class="c-st">f"{base_url}/status"</span>)
    <span class="c-kw">assert</span> r.json() == {
        <span class="c-st">"speed"</span>: <span class="c-nb">0.0</span>, <span class="c-st">"rpm"</span>: <span class="c-nb">800</span>, <span class="c-st">"timestamp"</span>: <span class="c-st">"2026-07-11T10:00:00Z"</span>
    }
    <span class="c-cm"># el timestamp cambia en cada corrida real → test frágil, falla siempre</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_get_status</span>(base_url):
    r = requests.get(<span class="c-kw">f</span><span class="c-st">f"{base_url}/status"</span>)
    data = r.json()
    <span class="c-kw">assert</span> data[<span class="c-st">"speed"</span>] == <span class="c-nb">0.0</span>
    <span class="c-kw">assert</span> data[<span class="c-st">"rpm"</span>] == <span class="c-nb">800</span>
    <span class="c-kw">assert</span> <span class="c-st">"timestamp"</span> <span class="c-kw">in</span> data   <span class="c-cm"># solo verifica presencia, no el valor exacto</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> comparar el JSON completo con <code>==</code> hace el test frágil ante cualquier campo que legítimamente cambie entre corridas (timestamps, ids generados, campos nuevos agregados por el backend). Asserta solo los campos que realmente te importa validar en ese test.</div>
  </div>
  <div id="uap-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Parametriza la URL base vía fixture + variable de entorno</div>
  <p>Nunca hardcodees la URL del bench en el cuerpo del test. Una fixture <code>base_url</code> que lee de <code>os.environ</code> con un default local seguro permite apuntar a mock, staging o hardware real sin tocar código.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Separa unit tests (mockeados) de integration tests (bench real)</div>
  <p>Usa <code>@pytest.mark.integration</code> para los que sí pegan a hardware/servicio real y corre esa marca aparte en CI (más lenta, requiere infraestructura). Los unit tests con <code>responses</code>/<code>requests_mock</code> corren siempre, rápido y sin dependencias.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Testea explícitamente los casos de error, no solo el 200</div>
  <p>4xx, 5xx, timeout y JSON malformado son comportamientos del contrato de la API tanto como el camino feliz. Un cliente que no maneja un 503 del bench se cae en producción justo cuando más se necesita.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Siempre pasa timeout= en las llamadas de test</div>
  <p>Sin timeout, una petición colgada bloquea indefinidamente la suite completa de CI. Un timeout corto y explícito convierte un cuelgue silencioso en un fallo de test claro y rápido.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Valida el contrato de forma selectiva, no con igualdad total del JSON</div>
  <p>Asserta los campos que importan para ese test específico. Para contratos más estrictos, considera validar contra un JSON Schema con <code>jsonschema.validate()</code> en vez de comparar diccionarios completos.</p>
</div>
  </div>
  <div id="uap-5" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿Por qué es mala idea escribir <code>assert r.json() == {...}</code> comparando el diccionario completo?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Porque hace el test frágil.</b> Cualquier campo que cambie legítimamente entre corridas (timestamps, ids autogenerados, campos nuevos del backend) rompe el test aunque el comportamiento que te interesa siga siendo correcto. Es mejor assertar solo los campos relevantes.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Qué diferencia hay entre usar responses y usar pytest-httpserver?<span class="q-arr">▶</span></div><div class="quiz-a"><b>responses intercepta a nivel de librería</b> (parchea requests para que nunca salga a la red). <b>pytest-httpserver levanta un servidor HTTP real y efímero</b> en un puerto local, así que el request sí viaja por la red de verdad — útil para probar comportamientos que dependen del protocolo HTTP real, como streaming o headers específicos.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>¿Por qué siempre se debe pasar timeout= al hacer requests en un test?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Para que un bench colgado o una red caída no cuelgue toda la suite de CI indefinidamente.</b> Sin timeout, requests espera para siempre por defecto; con un timeout corto, un fallo de conexión se convierte en un test fallido rápido y diagnosticable en vez de un pipeline colgado.</div></div>
</div>
  </div>
</div>`,

'ut-faker': `
<div class="tab-group-ufk">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ufk-1','ufk')">Faker básico</button>
    <button class="tab-btn" onclick="switchTab(this,'ufk-2','ufk')">Seed reproducible + casos de uso</button>
    <button class="tab-btn" onclick="switchTab(this,'ufk-3','ufk')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'ufk-4','ufk')">✅ Mejores Prácticas + Quiz</button>
  </div>
  <div id="ufk-1" class="tab-panel active">
<div class="concept-intro"><strong>Faker</strong> es una librería que genera datos falsos pero con forma realista (nombres, emails, fechas, IPs, VINs) para usar como datos de prueba. Se usa cuando necesitas poblar un test o una base de datos de bench con muchos registros variados sin escribirlos a mano uno por uno, y sin usar datos reales de personas o vehículos.</div>
<table class="kv-table">
<tr><th>Provider</th><th>Qué genera</th><th>Ejemplo → Resultado</th><th>Nota</th></tr>
<tr><td>fake.name()</td><td>Nombre completo de persona</td><td>fake.name() → "Ana García López"</td><td>Depende del locale configurado</td></tr>
<tr><td>fake.email()</td><td>Dirección de correo con formato válido</td><td>fake.email() → "ana.garcia23@example.com"</td><td>No es una cuenta real, solo el formato</td></tr>
<tr><td>fake.date_time()</td><td>Fecha y hora aleatoria</td><td>fake.date_time() → datetime(2019, 6, 3, 14, 22)</td><td>date_time_between(start,end) acota el rango</td></tr>
<tr><td>fake.ipv4()</td><td>Dirección IPv4 aleatoria</td><td>fake.ipv4() → "192.168.45.201"</td><td>También existe ipv6()</td></tr>
<tr><td>fake.mac_address()</td><td>Dirección MAC aleatoria</td><td>fake.mac_address() → "3c:15:c2:9a:0f:11"</td><td>Útil para simular dispositivos en un bus Ethernet</td></tr>
<tr><td>fake.uuid4()</td><td>UUID versión 4 aleatorio</td><td>fake.uuid4() → "a1b2c3d4-..."</td><td>Común para ids de sesión o de test run</td></tr>
<tr><td>fake.pyint(min,max)</td><td>Entero aleatorio en rango</td><td>fake.pyint(min_value=0, max_value=255) → 173</td><td>También pyfloat(), pybool()</td></tr>
<tr><td>fake.license_plate()</td><td>Placa vehicular con formato regional</td><td>fake.license_plate() → "ABC-1234"</td><td>Formato depende del locale</td></tr>
<tr><td>fake.vin()</td><td>VIN automotriz de 17 caracteres</td><td>fake.vin() → "1HGCM82633A004352"</td><td>Formato válido pero no corresponde a un vehículo real</td></tr>
<tr><td>fake.word() / sentence()</td><td>Palabra o frase aleatoria (lorem ipsum)</td><td>fake.sentence() → "Voluptas rerum nam."</td><td>Útil para campos de texto libre (descripciones, logs)</td></tr>
<tr><td>fake.json()</td><td>Estructura JSON aleatoria con campos definidos</td><td>fake.json(data_columns={"id":"pyint"}) → '{"id": 42}'</td><td>Útil para simular payloads de API completos</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — Faker básico</div><pre>
<span class="c-kw">from</span> faker <span class="c-kw">import</span> Faker

fake = Faker(<span class="c-st">"es_MX"</span>)  <span class="c-cm"># locale en español México</span>

<span class="c-bi">print</span>(fake.name())           <span class="c-cm"># "Ana García López"</span>
<span class="c-bi">print</span>(fake.email())          <span class="c-cm"># "ana.garcia23@example.com"</span>
<span class="c-bi">print</span>(fake.date_of_birth())  <span class="c-cm"># datetime.date(1990, 3, 15)</span>
<span class="c-bi">print</span>(fake.license_plate())  <span class="c-cm"># "ABC-1234"</span>
<span class="c-bi">print</span>(fake.vin())            <span class="c-cm"># VIN automotriz de 17 caracteres</span>
<span class="c-bi">print</span>(fake.ipv4())           <span class="c-cm"># "192.168.45.201" — útil para simular hosts de bench</span>

<span class="c-cm"># Generar una lista de registros de prueba para un test de carga</span>
sesiones_bench = [
    {
        <span class="c-st">"session_id"</span>: fake.uuid4(),
        <span class="c-st">"vin"</span>: fake.vin(),
        <span class="c-st">"operador"</span>: fake.name(),
        <span class="c-st">"inicio"</span>: fake.date_time_this_year(),
    }
    <span class="c-kw">for</span> _ <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">50</span>)
]</pre></div>
  </div>
  <div id="ufk-2" class="tab-panel">
<div class="concept-intro">Sin control del azar, Faker genera datos distintos en cada corrida — lo cual rompe la <strong>reproducibilidad</strong>: si un test falla con datos aleatorios, no puedes reproducir exactamente ese fallo después. <code>Faker.seed()</code> fija la semilla del generador para que la misma corrida produzca siempre los mismos datos. También se puede extender Faker con <strong>providers personalizados</strong> para generar datos específicos del dominio, como IDs y tramas CAN.</div>
<div class="code-block"><div class="code-lang">Python — seed reproducible y provider personalizado</div><pre>
<span class="c-kw">from</span> faker <span class="c-kw">import</span> Faker

<span class="c-cm"># Fijar semilla global — misma secuencia de datos en cada corrida</span>
Faker.seed(<span class="c-nb">42</span>)
fake = Faker(<span class="c-st">"es_MX"</span>)
<span class="c-bi">print</span>(fake.name())   <span class="c-cm"># siempre el mismo resultado con seed=42</span>

<span class="c-cm"># fake.unique evita duplicados dentro de la misma corrida</span>
emails = [fake.unique.email() <span class="c-kw">for</span> _ <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">100</span>)]
<span class="c-kw">assert</span> <span class="c-bi">len</span>(<span class="c-bi">set</span>(emails)) == <span class="c-nb">100</span>   <span class="c-cm"># garantizado, sin colisiones</span>
fake.unique.clear()   <span class="c-cm"># resetea el registro de "ya usados" entre tests</span>

<span class="c-cm"># Fixture de pytest con seed fija — reproducible entre corridas de CI</span>
<span class="c-kw">import</span> pytest

<span class="c-dc">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">fake</span>():
    Faker.seed(<span class="c-nb">1234</span>)
    <span class="c-kw">return</span> Faker(<span class="c-st">"es_MX"</span>)

<span class="c-cm"># Provider personalizado para datos de bus CAN</span>
<span class="c-kw">from</span> faker.providers <span class="c-kw">import</span> BaseProvider

<span class="c-kw">class</span> <span class="c-fn">CANProvider</span>(BaseProvider):
    <span class="c-kw">def</span> <span class="c-fn">can_id</span>(<span class="c-bi">self</span>):
        <span class="c-kw">return</span> <span class="c-bi">self</span>.random_int(<span class="c-nb">0</span>, <span class="c-nb">0x7FF</span>)   <span class="c-cm"># ids CAN estándar de 11 bits</span>

    <span class="c-kw">def</span> <span class="c-fn">can_data</span>(<span class="c-bi">self</span>, length=<span class="c-nb">8</span>):
        <span class="c-kw">return</span> [<span class="c-bi">self</span>.random_int(<span class="c-nb">0</span>, <span class="c-nb">255</span>) <span class="c-kw">for</span> _ <span class="c-kw">in</span> <span class="c-bi">range</span>(length)]

fake.add_provider(CANProvider)
<span class="c-bi">print</span>(fake.can_id(), fake.can_data())   <span class="c-cm"># 0x2A5, [1, 255, 0, 0, 12, 0, 0, 0]</span>

<span class="c-cm"># Generar una trama CAN falsa completa para tests de un parser</span>
<span class="c-kw">def</span> <span class="c-fn">test_parser_con_trama_aleatoria</span>(fake):
    trama = {<span class="c-st">"id"</span>: fake.can_id(), <span class="c-st">"data"</span>: fake.can_data()}
    resultado = parse_can_frame(trama)
    <span class="c-kw">assert</span> resultado.can_id == trama[<span class="c-st">"id"</span>]</pre></div>
  </div>
  <div id="ufk-3" class="tab-panel">
<div class="concept-intro">Errores frecuentes al usar Faker en suites de test, casi siempre relacionados con olvidar que "aleatorio" y "reproducible" no son lo mismo, o con confundir datos con forma realista con datos válidos para el dominio.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>fake = Faker()
<span class="c-kw">def</span> <span class="c-fn">test_procesar_vin</span>():
    vin = fake.vin()   <span class="c-cm"># distinto en cada corrida, sin seed</span>
    resultado = procesar_vin(vin)
    <span class="c-kw">assert</span> resultado.es_valido
<span class="c-cm"># el test falla una vez cada N corridas y no hay forma de reproducir CUÁL vin lo rompió</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>Faker.seed(<span class="c-nb">42</span>)
fake = Faker()
<span class="c-kw">def</span> <span class="c-fn">test_procesar_vin</span>():
    vin = fake.vin()   <span class="c-cm"># siempre el mismo vin con seed=42</span>
    resultado = procesar_vin(vin)
    <span class="c-kw">assert</span> resultado.es_valido   <span class="c-cm"># si falla, es 100% reproducible</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> sin <code>Faker.seed()</code>, cada corrida usa una secuencia aleatoria distinta. Si un test falla intermitentemente por un dato generado específico (un VIN con un carácter límite, una fecha en un caso borde), sin seed fija no hay forma de reproducir exactamente ese fallo para depurarlo.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_ids_unicos</span>():
    ids = [fake.unique.pyint(<span class="c-nb">1</span>, <span class="c-nb">10</span>) <span class="c-kw">for</span> _ <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">10</span>)]
    <span class="c-cm"># funciona la primera vez, pero si OTRO test antes ya generó</span>
    <span class="c-cm"># valores únicos en el mismo rango, esto lanza UniquenessException</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-dc">@pytest.fixture(autouse=True)</span>
<span class="c-kw">def</span> <span class="c-fn">reset_faker_unique</span>():
    <span class="c-kw">yield</span>
    fake.unique.clear()   <span class="c-cm"># limpia el registro de valores usados tras cada test</span>

<span class="c-kw">def</span> <span class="c-fn">test_ids_unicos</span>():
    ids = [fake.unique.pyint(<span class="c-nb">1</span>, <span class="c-nb">1000</span>) <span class="c-kw">for</span> _ <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">10</span>)]  <span class="c-cm"># rango amplio</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>fake.unique</code> mantiene un registro interno de valores ya entregados que persiste entre tests dentro del mismo proceso. Si el rango posible de valores es chico (como pyint(1,10)) se agota rápido y lanza <code>UniquenessException</code>. Usa rangos amplios y/o limpia el registro con <code>fake.unique.clear()</code> entre tests.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-cm"># fake.vin() genera un string con la FORMA de un VIN,</span>
<span class="c-cm"># pero no necesariamente pasa el checksum ISO 3779 real</span>
<span class="c-kw">def</span> <span class="c-fn">test_validador_vin_real</span>():
    vin = fake.vin()
    <span class="c-kw">assert</span> validador_iso_3779(vin)   <span class="c-cm"># puede fallar aunque tu código esté bien</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-cm"># Para validar reglas de negocio ESTRICTAS del dominio,</span>
<span class="c-cm"># usa VINs de referencia conocidos y válidos, no Faker</span>
VIN_VALIDO_CONOCIDO = <span class="c-st">"1HGCM82633A004352"</span>

<span class="c-kw">def</span> <span class="c-fn">test_validador_vin_real</span>():
    <span class="c-kw">assert</span> validador_iso_3779(VIN_VALIDO_CONOCIDO)

<span class="c-cm"># Faker sí sirve para volumen/variedad, no para casos de validación exacta</span>
<span class="c-kw">def</span> <span class="c-fn">test_validador_no_explota_con_cualquier_string</span>():
    <span class="c-kw">for</span> _ <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">100</span>):
        validador_iso_3779(fake.vin())   <span class="c-cm"># solo verifica que no crashea</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> Faker genera datos con la <em>forma</em> correcta (longitud, charset), pero no garantiza que cumplan reglas de negocio específicas del dominio (checksums, rangos válidos reales). Úsalo para volumen y variedad de datos "de forma correcta"; usa valores de referencia fijos y conocidos cuando el test valida una regla exacta del dominio.</div>
  </div>
  <div id="ufk-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Fija siempre la semilla en tests automatizados</div>
  <p><code>Faker.seed(N)</code> al inicio de la suite (o en una fixture) hace que un fallo intermitente por datos aleatorios sea 100% reproducible. Sin esto, "funciona en mi máquina" se vuelve literal.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa fake.unique con rangos amplios y limpia el registro entre tests</div>
  <p>Con una fixture <code>autouse=True</code> que llama <code>fake.unique.clear()</code> al final de cada test evitas <code>UniquenessException</code> por acumulación de valores usados entre tests distintos.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Crea providers personalizados para el dominio del proyecto</div>
  <p>Si generas VINs, tramas CAN o placas constantemente, encapsúlalo en un <code>BaseProvider</code> reutilizable en vez de repetir <code>random_int()</code> suelto en cada test — un solo lugar para mantener las reglas del dominio.</p>
</div>
<div class="practice-card">
  <div class="practice-title">No uses Faker para validar reglas de negocio exactas</div>
  <p>Para checksums, formatos certificados o casos límite específicos, usa valores de referencia fijos conocidos. Faker es para volumen y variedad "con forma realista", no para garantizar validez semántica exacta.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa el locale correcto para el contexto del test</div>
  <p><code>Faker("es_MX")</code> vs <code>Faker("en_US")</code> cambia formatos de teléfono, dirección y placa. Si tu sistema valida formatos regionales, generar datos del locale equivocado da falsos negativos.</p>
</div>
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Un test que usa <code>fake.vin()</code> falla una vez cada 200 corridas en CI. ¿Cuál es el primer paso para depurarlo?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Fijar Faker.seed() con un valor específico</b> y correr el test repetidamente hasta reproducir el fallo con un VIN conocido y fijo. Sin seed, cada corrida usa datos distintos y el fallo intermitente es imposible de reproducir de forma determinista.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿fake.vin() garantiza que el VIN generado sea válido según el checksum ISO 3779?<span class="q-arr">▶</span></div><div class="quiz-a"><b>No.</b> Faker genera datos con la forma correcta (longitud de 17 caracteres, charset válido) pero no calcula ni garantiza checksums reales de negocio. Para validar esas reglas exactas usa valores de referencia conocidos, no datos generados aleatoriamente.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>¿Qué hace fake.unique.clear() y cuándo se necesita?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Resetea el registro interno de valores ya entregados por fake.unique.</b> Se necesita entre tests (por ejemplo en una fixture autouse) porque ese registro persiste dentro del mismo proceso; sin limpiarlo, rangos chicos se agotan y lanzan UniquenessException en tests posteriores que no tienen relación con el primero.</div></div>
</div>
  </div>
</div>`,

'gh-actions-py': `
<div class="tab-group-gha">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'gha-1','gha')">Workflow YAML básico</button>
    <button class="tab-btn" onclick="switchTab(this,'gha-2','gha')">Matrix, cache y artifacts</button>
    <button class="tab-btn" onclick="switchTab(this,'gha-3','gha')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'gha-4','gha')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'gha-5','gha')">Quiz</button>
  </div>
  <div id="gha-1" class="tab-panel active">
<div class="concept-intro">Un <strong>workflow</strong> de GitHub Actions es un archivo YAML en <code>.github/workflows/</code> que define cuándo (<code>on</code>) y cómo (<code>jobs</code>) se ejecuta automáticamente tu suite de pytest — típicamente en cada push y cada pull request. Se usa para garantizar que nadie mergea código que rompe los tests, sin depender de que cada desarrollador corra la suite manualmente.</div>
<table class="kv-table">
<tr><th>Clave YAML</th><th>Qué controla</th><th>Ejemplo → Resultado</th><th>Nota</th></tr>
<tr><td>on</td><td>Eventos que disparan el workflow</td><td>on: push, pull_request → corre en cada push y PR</td><td>También soporta schedule (cron) y workflow_dispatch (manual)</td></tr>
<tr><td>jobs</td><td>Conjunto de trabajos, cada uno con su propia máquina</td><td>jobs: test: → un job llamado "test"</td><td>Jobs corren en paralelo por defecto salvo needs</td></tr>
<tr><td>runs-on</td><td>Sistema operativo/imagen de la máquina virtual</td><td>runs-on: ubuntu-latest → VM Linux efímera</td><td>También windows-latest, macos-latest</td></tr>
<tr><td>steps</td><td>Lista ordenada de pasos dentro de un job</td><td>steps: - uses/run... → se ejecutan en secuencia</td><td>Si un step falla, los siguientes no corren (salvo if: always())</td></tr>
<tr><td>uses</td><td>Ejecuta una Action reusable de terceros/propia</td><td>uses: actions/checkout@v4 → clona el repo</td><td>Siempre fijar versión (@v4), nunca @latest</td></tr>
<tr><td>run</td><td>Ejecuta un comando de shell directamente</td><td>run: pytest tests/ -v → corre pytest</td><td>Puede ser multilínea con el pipe |</td></tr>
<tr><td>with</td><td>Parámetros de entrada para una Action</td><td>with: python-version: "3.11" → configura la versión</td><td>Cada Action define sus propios inputs válidos</td></tr>
</table>
<div class="code-block"><div class="code-lang">YAML — .github/workflows/ci.yml (básico)</div><pre>
name: CI Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Python 3.11
        uses: actions/setup-python@v4
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install pytest pytest-cov

      - name: Run tests
        run: pytest tests/ -v --cov=src --cov-report=xml --junitxml=junit.xml

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: coverage.xml</pre></div>
  </div>
  <div id="gha-2" class="tab-panel">
<div class="concept-intro">Un pipeline de CI real casi nunca corre en una sola versión de Python ni desde cero cada vez. <strong>Matrix</strong> corre el mismo job contra varias combinaciones (versiones de Python, sistemas operativos) en paralelo; <strong>cache</strong> evita reinstalar las mismas dependencias en cada corrida; y <strong>artifacts</strong> guarda los reportes de test/coverage generados para descargarlos o encadenarlos a otro job.</div>
<table class="kv-table">
<tr><th>Elemento</th><th>Qué controla</th><th>Ejemplo → Resultado</th><th>Nota</th></tr>
<tr><td>strategy.matrix</td><td>Genera una copia del job por cada combinación</td><td>python-version: [3.9, 3.10, 3.11] → 3 jobs paralelos</td><td>Detecta bugs de compatibilidad entre versiones</td></tr>
<tr><td>fail-fast</td><td>Si un job de la matrix falla, cancela los demás</td><td>fail-fast: false → deja correr todos aunque uno falle</td><td>Útil para ver TODOS los resultados de la matrix, no solo el primero</td></tr>
<tr><td>cache: pip (en setup-python)</td><td>Cachea el directorio de pip entre corridas</td><td>cache: "pip" → instala deps en segundos, no minutos</td><td>La cache se invalida sola si cambia requirements.txt</td></tr>
<tr><td>actions/upload-artifact</td><td>Sube archivos generados por el job (reportes, logs)</td><td>path: junit.xml → descargable desde la UI de Actions</td><td>Combinar con if: always() para subir reportes aunque falle el test</td></tr>
<tr><td>needs</td><td>Declara dependencia entre jobs</td><td>needs: lint → el job espera a que "lint" termine OK</td><td>Sin needs, todos los jobs corren en paralelo por defecto</td></tr>
</table>
<div class="code-block"><div class="code-lang">YAML — matrix + cache + artifacts + jobs encadenados</div><pre>
name: CI Tests Completo

on:
  push:
  pull_request:

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: "3.11"
          cache: "pip"
      - run: pip install flake8
      - run: flake8 src/ tests/

  test:
    needs: lint
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        python-version: ["3.9", "3.10", "3.11"]

    steps:
      - uses: actions/checkout@v4

      - name: Set up Python $&#123;{ matrix.python-version }}
        uses: actions/setup-python@v4
        with:
          python-version: $&#123;{ matrix.python-version }}
          cache: "pip"

      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install pytest pytest-cov pytest-html

      - name: Run tests
        run: |
          pytest tests/ -v --cov=src --cov-report=xml \
            --junitxml=junit-$&#123;{ matrix.python-version }}.xml \
            --html=report-$&#123;{ matrix.python-version }}.html

      - name: Publish test report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results-$&#123;{ matrix.python-version }}
          path: |
            junit-$&#123;{ matrix.python-version }}.xml
            report-$&#123;{ matrix.python-version }}.html

      - name: Upload coverage
        if: matrix.python-version == '3.11'
        uses: codecov/codecov-action@v3
        with:
          files: coverage.xml
          token: $&#123;{ secrets.CODECOV_TOKEN }}</pre></div>
  </div>
  <div id="gha-3" class="tab-panel">
<div class="concept-intro">Errores frecuentes al configurar pipelines de CI para pytest, casi siempre relacionados con pipelines lentos, reportes perdidos o secretos mal manejados.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>steps:
  - uses: actions/setup-python@v4
    with:
      python-version: "3.11"
  <span class="c-cm"># sin cache: cada corrida reinstala TODAS las dependencias desde cero</span>
  - run: pip install -r requirements.txt   <span class="c-cm"># 3-4 minutos cada vez</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>steps:
  - uses: actions/setup-python@v4
    with:
      python-version: "3.11"
      cache: "pip"   <span class="c-cm"># cachea automáticamente; corridas posteriores en segundos</span>
  - run: pip install -r requirements.txt</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> sin cache explícito, cada job arranca desde una VM completamente limpia y reinstala todo el árbol de dependencias en cada corrida, incluso si requirements.txt no cambió. El parámetro <code>cache</code> de setup-python (o actions/cache manualmente) reutiliza el directorio de pip entre corridas, cortando minutos de cada pipeline.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>- name: Run tests
  run: pytest --junitxml=junit.xml
- name: Publish test report
  uses: actions/upload-artifact@v4
  with:
    path: junit.xml
<span class="c-cm"># si pytest falla, el step "Run tests" corta el job y el artifact NUNCA se sube</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>- name: Run tests
  run: pytest --junitxml=junit.xml
- name: Publish test report
  uses: actions/upload-artifact@v4
  if: always()   <span class="c-cm"># sube el reporte SIEMPRE, incluso si el step anterior falló</span>
  with:
    path: junit.xml</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> por defecto, si un step falla, GitHub Actions cancela los steps restantes del job. Eso significa que justo en el caso que más te interesa investigar (los tests fallaron) el reporte con el detalle no se sube. <code>if: always()</code> fuerza a que ese step corra sin importar el resultado de los anteriores.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    token: 8f3a9c1e-REAL-TOKEN-HARDCODEADO
<span class="c-cm"># el token queda visible en el historial de git para siempre</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    token: $&#123;{ secrets.CODECOV_TOKEN }}
<span class="c-cm"># el secreto vive en Settings → Secrets del repo, nunca en el YAML</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> cualquier valor escrito literalmente en el YAML queda en el historial de git de forma permanente, visible para cualquiera con acceso al repo (o público, si el repo lo es). Los secretos siempre deben referenciarse vía el contexto <code>secrets</code>, configurados por separado en la configuración del repositorio.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-python@v4
        with:
          python-version: "3.9"
  <span class="c-cm"># solo se prueba en 3.9 — un bug de compatibilidad con 3.11</span>
  <span class="c-cm"># pasa desapercibido hasta que un usuario lo reporta en producción</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.9", "3.10", "3.11"]
    steps:
      - uses: actions/setup-python@v4
        with:
          python-version: $&#123;{ matrix.python-version }}</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> probar en una sola versión de Python oculta bugs de compatibilidad (cambios de sintaxis, deprecaciones, diferencias de comportamiento entre versiones) que solo aparecen cuando un consumidor del paquete usa otra versión. La matrix corre la suite completa en cada versión soportada con el mismo esfuerzo de configuración.</div>
  </div>
  <div id="gha-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Fija siempre la versión de las Actions de terceros (@v4, no @latest)</div>
  <p>Un tag flotante como @latest puede traer un cambio inesperado (breaking change) de un día para otro sin que tú hayas tocado el workflow. Fijar @v4 hace el pipeline reproducible y predecible.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa if: always() para subir reportes de test y coverage</div>
  <p>El caso que más te interesa investigar es justamente cuando los tests fallan. Sin if: always(), el artifact con el detalle del fallo nunca llega a subirse.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Cachea pip (o poetry/uv) con el parámetro cache de setup-python</div>
  <p>Reduce el tiempo de cada corrida de minutos a segundos en instalación de dependencias, especialmente relevante si el pipeline corre en cada push a una rama activa.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Separa jobs (lint, test, build) con needs para fallar rápido</div>
  <p>Si el lint falla, no tiene sentido esperar 5 minutos de tests para enterarte. needs: lint hace que el job de test ni siquiera arranque si el lint ya falló, ahorrando minutos de CI en cada PR con errores obvios.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa matrix para las versiones de Python que realmente soportas</div>
  <p>Si tu setup.py/pyproject declara soporte para 3.9-3.11, la matrix debe cubrir exactamente esas versiones — ni menos (huecos de compatibilidad sin detectar) ni de más (tiempo de CI desperdiciado en versiones que no soportas).</p>
</div>
  </div>
  <div id="gha-5" class="tab-panel">
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Un step de "Run tests" falla y el siguiente step que sube el reporte de resultados nunca se ejecuta. ¿Cómo se soluciona?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Agregando if: always() al step que sube el artifact.</b> Por defecto GitHub Actions cancela los steps restantes cuando uno falla; if: always() fuerza a que ese step específico corra sin importar el resultado de los pasos anteriores.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Qué hace strategy.matrix con python-version: ["3.9","3.10","3.11"]?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Genera automáticamente una copia del job por cada versión listada</b> (3 jobs en total), corriendo en paralelo por defecto. Sirve para detectar bugs de compatibilidad que solo aparecen en versiones específicas de Python, sin duplicar manualmente la configuración del job.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>¿Por qué nunca se debe escribir un token/secreto literalmente en el YAML del workflow?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Porque queda permanentemente en el historial de git</b>, visible para cualquiera con acceso al repo (o al mundo, si es público), incluso si luego se borra en un commit posterior. Los secretos deben configurarse en Settings → Secrets del repositorio y referenciarse vía el contexto secrets en el YAML.</div></div>
</div>
  </div>
</div>`,

'ia-test': `
<div class="tab-group-iat">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'iat-1','iat')">Cómo pedir tests a una IA</button>
    <button class="tab-btn" onclick="switchTab(this,'iat-2','iat')">Qué SIEMPRE revisar</button>
    <button class="tab-btn" onclick="switchTab(this,'iat-3','iat')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'iat-4','iat')">✅ Mejores Prácticas + Quiz</button>
  </div>
  <div id="iat-1" class="tab-panel active">
<div class="concept-intro">Herramientas como Copilot, Claude o ChatGPT pueden generar el <em>esqueleto</em> de una suite de tests muy rápido, pero la calidad del resultado depende casi por completo de cuánto contexto de dominio les das. Un prompt vago ("genera tests para esta función") produce tests genéricos que cubren tipos de dato pero no reglas de negocio. Un prompt con contexto específico produce algo mucho más cercano a lo que realmente necesitas revisar y ajustar.</div>
<table class="kv-table">
<tr><th>Elemento del prompt</th><th>Por qué importa</th><th>Ejemplo → Resultado</th><th>Nota</th></tr>
<tr><td>Contexto de la función/módulo</td><td>La IA necesita ver la firma y lógica real, no adivinar</td><td>Pegar el código completo → tests que llaman a la función real</td><td>Sin esto, la IA inventa una firma plausible pero incorrecta</td></tr>
<tr><td>Framework y convenciones</td><td>Evita que mezcle estilos (unittest vs pytest)</td><td>"usa pytest, no unittest.TestCase" → fixtures en vez de setUp</td><td>Menciona también si usas parametrize, fixtures propias, etc.</td></tr>
<tr><td>Edge cases explícitos del dominio</td><td>La IA no conoce tu dominio de negocio</td><td>"incluye CAN id fuera de rango (>0x7FF)" → test específico generado</td><td>Sin esto, solo cubre None/vacío/negativo genéricos</td></tr>
<tr><td>Qué mockear</td><td>Evita que la IA invente mocks que no reflejan el comportamiento real</td><td>"mockea requests.get, no la función bajo test" → mock correcto</td><td>Sé explícito sobre qué es dependencia externa vs lógica propia</td></tr>
<tr><td>Formato esperado</td><td>Ahorra tiempo de reformateo manual</td><td>"un test por caso, nombres descriptivos test_should_X_when_Y" → nombres claros</td><td>Pide explícitamente docstrings o comentarios si los quieres</td></tr>
</table>
<div class="code-block"><div class="code-lang">Prompt efectivo vs genérico</div><pre>
<span class="c-cm"># Prompt genérico (produce tests superficiales):</span>
<span class="c-cm"># "Genera tests unitarios para esta función"</span>

<span class="c-cm"># Prompt efectivo (con contexto real de dominio):</span>
<span class="c-cm"># "Genera tests pytest para esta función que valida umbrales de voltaje</span>
<span class="c-cm">#  de una batería automotriz [pegar código]. Incluye:</span>
<span class="c-cm">#  - Casos normales: 12.0V a 14.4V (rango saludable)</span>
<span class="c-cm">#  - Edge cases: exactamente en el límite (14.5V), justo debajo (14.49V)</span>
<span class="c-cm">#  - Casos de error: voltaje negativo, None, string en vez de float</span>
<span class="c-cm">#  - Usa pytest.mark.parametrize para los rangos, no tests separados</span>
<span class="c-cm">#  - Usa pytest.raises para los casos que deben lanzar ValueError"</span>

<span class="c-cm"># Función real bajo test:</span>
<span class="c-kw">def</span> <span class="c-fn">check_voltage</span>(v: <span class="c-bi">float</span>) -&gt; <span class="c-bi">str</span>:
    <span class="c-kw">if</span> <span class="c-kw">not</span> isinstance(v, (<span class="c-bi">int</span>, <span class="c-bi">float</span>)):
        <span class="c-kw">raise</span> <span class="c-bi">TypeError</span>(<span class="c-st">"voltage debe ser numérico"</span>)
    <span class="c-kw">if</span> v &lt; <span class="c-nb">0</span>:
        <span class="c-kw">raise</span> <span class="c-bi">ValueError</span>(<span class="c-st">"voltage no puede ser negativo"</span>)
    <span class="c-kw">if</span> v &gt; <span class="c-nb">14.5</span>:
        <span class="c-kw">return</span> <span class="c-st">"OVERVOLTAGE"</span>
    <span class="c-kw">return</span> <span class="c-st">"OK"</span>

<span class="c-cm"># Salida esperada del prompt efectivo (lo que debes revisar, no aceptar a ciegas):</span>
<span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"voltage,expected"</span>, [
    (<span class="c-nb">12.0</span>, <span class="c-st">"OK"</span>), (<span class="c-nb">14.4</span>, <span class="c-st">"OK"</span>), (<span class="c-nb">14.49</span>, <span class="c-st">"OK"</span>),
    (<span class="c-nb">14.5</span>, <span class="c-st">"OK"</span>), (<span class="c-nb">14.51</span>, <span class="c-st">"OVERVOLTAGE"</span>),
])
<span class="c-kw">def</span> <span class="c-fn">test_check_voltage_ranges</span>(voltage, expected):
    <span class="c-kw">assert</span> check_voltage(voltage) == expected

<span class="c-kw">def</span> <span class="c-fn">test_check_voltage_rejects_negative</span>():
    <span class="c-kw">with</span> pytest.raises(<span class="c-bi">ValueError</span>):
        check_voltage(-<span class="c-nb">1.0</span>)</pre></div>
  </div>
  <div id="iat-2" class="tab-panel">
<div class="concept-intro">Un test generado por IA nunca debe mergear sin revisión humana. La IA no conoce el comportamiento real del hardware, ni las reglas de negocio implícitas del proyecto, ni si un mock realmente representa cómo se comporta el servicio real que reemplaza. Esta checklist es la mínima antes de aceptar un test generado.</div>
<table class="kv-table">
<tr><th>Qué revisar</th><th>Por qué</th><th>Ejemplo de problema típico</th><th>Nota</th></tr>
<tr><td>¿Los asserts verifican el valor correcto?</td><td>La IA puede inventar un valor esperado plausible pero incorrecto</td><td>assert result == 42 sin verificar que 42 sea realmente lo correcto</td><td>Corre el test contra la implementación real y confirma el valor a mano</td></tr>
<tr><td>¿Cubre reglas de negocio reales, no solo tipos?</td><td>La IA generaliza a partir del código, no conoce reglas no escritas</td><td>Falta el caso "CAN id fuera del rango 11 bits" si no se lo dijiste</td><td>Agrega tú los edge cases específicos de tu dominio</td></tr>
<tr><td>¿El mock simula el comportamiento REAL de la dependencia?</td><td>Un mock mal configurado hace que el test pase sin probar nada útil</td><td>Mock de requests.get que siempre devuelve 200, nunca prueba el manejo de 500</td><td>Verifica que el mock cubra también los casos de fallo de la dependencia real</td></tr>
<tr><td>¿Los nombres de test son descriptivos?</td><td>La IA a veces genera test_1, test_2 genéricos</td><td>test_function() → renombrar a test_check_voltage_rejects_negative()</td><td>El nombre debe decir qué se prueba y bajo qué condición</td></tr>
<tr><td>¿Hay tests tautológicos (que no pueden fallar)?</td><td>Un assert que siempre es verdadero da falsa confianza</td><td>assert mock.called (solo confirma que se llamó al mock, no el resultado)</td><td>Cada test debe poder fallar si el código tiene un bug real</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — test generado por IA: problema típico y su corrección</div><pre>
<span class="c-cm"># Lo que una IA genera con un prompt vago (parece razonable a primera vista):</span>
<span class="c-kw">def</span> <span class="c-fn">test_send_command</span>(mocker):
    mock_send = mocker.patch(<span class="c-st">"bench_client.send_command"</span>)
    mock_send.return_value = {<span class="c-st">"status"</span>: <span class="c-st">"ok"</span>}
    result = send_command_wrapper(<span class="c-st">"IGNITION_ON"</span>)
    <span class="c-kw">assert</span> mock_send.called   <span class="c-cm"># ← tautológico: solo prueba que se llamó al MOCK</span>

<span class="c-cm"># Revisado y corregido por un humano:</span>
<span class="c-kw">def</span> <span class="c-fn">test_send_command_returns_status_from_bench</span>(mocker):
    mock_send = mocker.patch(<span class="c-st">"bench_client.send_command"</span>)
    mock_send.return_value = {<span class="c-st">"status"</span>: <span class="c-st">"ok"</span>}

    result = send_command_wrapper(<span class="c-st">"IGNITION_ON"</span>)

    mock_send.assert_called_once_with(<span class="c-st">"IGNITION_ON"</span>)   <span class="c-cm"># verifica CÓMO se llamó</span>
    <span class="c-kw">assert</span> result[<span class="c-st">"status"</span>] == <span class="c-st">"ok"</span>              <span class="c-cm"># verifica el RESULTADO real</span>

<span class="c-cm"># y agregar lo que la IA no puede saber sin que se lo digan:</span>
<span class="c-kw">def</span> <span class="c-fn">test_send_command_propagates_bench_error</span>(mocker):
    mock_send = mocker.patch(<span class="c-st">"bench_client.send_command"</span>)
    mock_send.side_effect = ConnectionError(<span class="c-st">"bench desconectado"</span>)

    <span class="c-kw">with</span> pytest.raises(ConnectionError):
        send_command_wrapper(<span class="c-st">"IGNITION_ON"</span>)</pre></div>
  </div>
  <div id="iat-3" class="tab-panel">
<div class="concept-intro">Errores frecuentes al aceptar tests generados por IA sin suficiente escrutinio. Todos comparten la misma raíz: tratar la salida de la IA como verdad, en vez de como un primer borrador que necesita validación contra el comportamiento real.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-cm"># La IA genera esto y se mergea sin correrlo contra la implementación real</span>
<span class="c-kw">def</span> <span class="c-fn">test_parse_dtc_code</span>():
    resultado = parse_dtc(<span class="c-st">"P0301"</span>)
    <span class="c-kw">assert</span> resultado.description == <span class="c-st">"Generic engine misfire"</span>
    <span class="c-cm"># la IA "adivinó" el texto; el código real devuelve otra cadena</span>
    <span class="c-cm"># y nadie lo notó porque el test pasó por casualidad con un mock previo</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-cm"># Correr el test contra la implementación real ANTES de mergear,</span>
<span class="c-cm"># y confirmar el valor esperado contra la fuente de verdad (spec SAE J2012)</span>
<span class="c-kw">def</span> <span class="c-fn">test_parse_dtc_code</span>():
    resultado = parse_dtc(<span class="c-st">"P0301"</span>)
    <span class="c-kw">assert</span> resultado.description == <span class="c-st">"Cylinder 1 Misfire Detected"</span>  <span class="c-cm"># verificado contra spec</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> los modelos de lenguaje generan el texto más "plausible" según su entrenamiento, no el valor real de tu sistema. Si nadie corre el test y compara el resultado contra la implementación (o la especificación del dominio), un assert incorrecto puede quedar mergeado dando falsa confianza indefinidamente.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-cm"># El mock siempre devuelve exactamente lo que el código espera recibir</span>
<span class="c-kw">def</span> <span class="c-fn">test_process_response</span>(mocker):
    mocker.patch(<span class="c-st">"api_client.get_status"</span>, return_value={<span class="c-st">"speed"</span>: <span class="c-nb">50.0</span>})
    <span class="c-kw">assert</span> process_response() == <span class="c-nb">50.0</span>
    <span class="c-cm"># nunca prueba qué pasa si falta la key "speed" en la respuesta real</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">test_process_response_missing_field</span>(mocker):
    mocker.patch(<span class="c-st">"api_client.get_status"</span>, return_value={})   <span class="c-cm"># respuesta incompleta real</span>
    <span class="c-kw">with</span> pytest.raises(KeyError):
        process_response()</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> una IA sin contexto de las respuestas reales de la API configura mocks "ideales" que nunca fallan. Eso termina probando el mock, no el código: el test pasa aunque <code>process_response()</code> no maneje respuestas incompletas o malformadas, que es exactamente el caso que suele romperse en producción.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-cm"># Prompt: "genera tests para validate_can_id"</span>
<span class="c-cm"># La IA cubre None, negativo, string — genéricos de cualquier función con int</span>
<span class="c-kw">def</span> <span class="c-fn">test_validate_can_id_none</span>():
    <span class="c-kw">with</span> pytest.raises(<span class="c-bi">TypeError</span>):
        validate_can_id(<span class="c-kw">None</span>)
<span class="c-cm"># pero NUNCA prueba 0x7FF (límite exacto) ni 0x800 (justo fuera de rango)</span>
<span class="c-cm"># porque la IA no sabe que CAN estándar usa ids de 11 bits sin que se lo digan</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-cm"># Prompt corregido: "...los ids CAN estándar van de 0x0 a 0x7FF (11 bits)"</span>
<span class="c-dc">@pytest.mark.parametrize</span>(<span class="c-st">"can_id,valido"</span>, [
    (<span class="c-nb">0x000</span>, <span class="c-kw">True</span>), (<span class="c-nb">0x7FF</span>, <span class="c-kw">True</span>), (<span class="c-nb">0x800</span>, <span class="c-kw">False</span>),
])
<span class="c-kw">def</span> <span class="c-fn">test_validate_can_id_range</span>(can_id, valido):
    <span class="c-kw">assert</span> validate_can_id(can_id) == valido</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> una IA sin contexto de dominio automotriz cubre edge cases genéricos de programación (None, tipos, negativos) pero no conoce las reglas específicas de tu industria (rangos de bits de CAN, códigos DTC válidos, umbrales de voltaje de batería). Esos edge cases del dominio son responsabilidad del ingeniero que arma el prompt, no algo que la IA pueda inferir sola.</div>
  </div>
  <div id="iat-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Dale a la IA el código real, no una descripción de memoria</div>
  <p>Pegar la función completa (con imports y tipos) produce tests que llaman a la firma correcta. Describir "de memoria" lo que hace la función lleva a que la IA invente una interfaz plausible pero equivocada.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Enumera tú los edge cases de dominio en el prompt</div>
  <p>La IA no sabe que un CAN id estándar tiene 11 bits o que un DTC tiene un formato específico SAE. Si esos límites importan, escríbelos explícitamente — son los edge cases que más valor aportan y los que la IA menos puede adivinar.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Corre siempre el test generado antes de mergearlo</div>
  <p>Un test que "se ve bien" pero nunca se ejecutó puede tener asserts con valores incorrectos, imports rotos, o fixtures inexistentes. Ejecutarlo (y verlo fallar cuando debe fallar) es el mínimo antes de aceptar el resultado.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Revisa que cada mock también cubra el caso de fallo de la dependencia real</div>
  <p>Si la IA solo mockea la respuesta "feliz", pídele explícitamente (o agrégalo tú) un caso donde el mock simula un error, un timeout o una respuesta incompleta — el comportamiento real de cualquier dependencia externa.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Trata el test generado como un borrador, no como el resultado final</div>
  <p>Renombra tests genéricos (test_1, test_function) a nombres descriptivos, elimina asserts tautológicos, y ajusta los datos de prueba para que reflejen valores reales del dominio en vez de placeholders genéricos.</p>
</div>
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>Una IA genera un test que hace <code>assert mock.called</code> después de llamar a la función bajo test. ¿Qué problema tiene?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Es un test tautológico.</b> Solo verifica que el mock fue invocado, no que el resultado de la función sea correcto ni que se haya llamado con los argumentos esperados. Casi no puede fallar de una forma que revele un bug real — hay que reemplazarlo por asserts sobre el valor de retorno y assert_called_once_with() sobre los argumentos.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Conceptual</span>¿Por qué un prompt genérico ("genera tests para esta función") produce peores tests que uno con contexto de dominio?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Porque la IA solo puede inferir edge cases genéricos de programación</b> (None, vacío, negativo, tipos incorrectos) a partir del código. No conoce reglas de negocio implícitas del dominio (rangos de CAN, formatos DTC, umbrales de voltaje) a menos que se las digas explícitamente en el prompt.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Práctico</span>¿Cuál es el mínimo que un ingeniero debe hacer antes de mergear un test generado por IA?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Ejecutarlo contra la implementación real y confirmar que los asserts verifican el valor correcto</b> (no uno inventado), que los mocks reflejan el comportamiento real de la dependencia (incluyendo casos de fallo), y que cubre los edge cases específicos del dominio, no solo los genéricos de tipos de dato.</div></div>
</div>
  </div>
</div>`,
};  // fin TESTING_RICH
