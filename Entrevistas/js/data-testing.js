
// ══════════════════════════════════════════════════════════════════
//  TESTING_RICH — Unittest, pytest, coverage
// ══════════════════════════════════════════════════════════════════
const TESTING_RICH = {

'ut-intro': `
<div class="plan-card">
  <div class="plan-card-title">🧪 Unittest — Framework estándar de Python</div>
  <div class="plan-block">
    <div class="plan-time">Estructura básica</div>
    <div class="plan-content">
      <h4>TestCase, test_*, TestRunner</h4>
      <div class="code-block"><div class="code-lang">Python — Unittest básico</div><pre>
<span class="c-kw">import</span> unittest

<span class="c-kw">class</span> <span class="c-fn">TestCalculadora</span>(unittest.TestCase):

    <span class="c-kw">def</span> <span class="c-fn">setUp</span>(<span class="c-bi">self</span>):
        <span class="c-bi">self</span>.calc = Calculadora()

    <span class="c-kw">def</span> <span class="c-fn">test_suma_positivos</span>(<span class="c-bi">self</span>):
        resultado = <span class="c-bi">self</span>.calc.suma(<span class="c-nb">2</span>, <span class="c-nb">3</span>)
        <span class="c-bi">self</span>.assertEqual(resultado, <span class="c-nb">5</span>)

    <span class="c-kw">def</span> <span class="c-fn">test_division_por_cero</span>(<span class="c-bi">self</span>):
        <span class="c-kw">with</span> <span class="c-bi">self</span>.assertRaises(ZeroDivisionError):
            <span class="c-bi">self</span>.calc.dividir(<span class="c-nb">10</span>, <span class="c-nb">0</span>)

<span class="c-kw">if</span> __name__ == <span class="c-st">'__main__'</span>:
    unittest.main(verbosity=<span class="c-nb">2</span>)</pre></div>
      <p>• Cada método que empieza con <code>test_</code> es un caso de prueba.<br>
      • <code>unittest.TestCase</code> provee todos los asserts y el lifecycle.<br>
      • <code>unittest.main()</code> descubre y ejecuta todos los <code>test_*</code> de la clase.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre unittest...</p>
</div>`,

'ut-estructura': `
<div class="plan-card">
  <div class="plan-card-title">📐 Estructura de un test — Patrón AAA</div>
  <div class="plan-block">
    <div class="plan-time">Arrange / Act / Assert</div>
    <div class="plan-content">
      <h4>El patrón más claro para escribir tests</h4>
      <div class="code-block"><div class="code-lang">Python — Patrón AAA</div><pre>
<span class="c-kw">def</span> <span class="c-fn">test_velocidad_promedio</span>(<span class="c-bi">self</span>):
    <span class="c-cm"># ARRANGE — preparar datos y dependencias</span>
    sensor = VelocitySensor()
    lecturas = [<span class="c-nb">60.0</span>, <span class="c-nb">80.0</span>, <span class="c-nb">70.0</span>]

    <span class="c-cm"># ACT — ejecutar la función bajo prueba</span>
    promedio = sensor.calcular_promedio(lecturas)

    <span class="c-cm"># ASSERT — verificar el resultado</span>
    <span class="c-bi">self</span>.assertAlmostEqual(promedio, <span class="c-nb">70.0</span>, places=<span class="c-nb">1</span>)</pre></div>
      <p><b>Regla clave:</b> Un test = una responsabilidad. Si tienes que poner "y" en el nombre del test (<code>test_suma_y_guarda_y_notifica</code>), divídelo en 3 tests separados.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre el patrón AAA...</p>
</div>`,

'ut-setup': `
<div class="plan-card">
  <div class="plan-card-title">⚙️ setUp / tearDown / setUpClass</div>
  <div class="plan-block">
    <div class="plan-time">Lifecycle de unittest</div>
    <div class="plan-content">
      <h4>Preparación y limpieza en cada nivel</h4>
      <div class="code-block"><div class="code-lang">Python — Setup y teardown completo</div><pre>
<span class="c-kw">class</span> <span class="c-fn">TestBenchConnection</span>(unittest.TestCase):

    <span class="c-cm">@classmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">setUpClass</span>(cls):
        <span class="c-cm"># Una vez por clase — conexión cara (DB, socket, HW)</span>
        cls.bench = HILBench.connect(<span class="c-st">"bench-01"</span>)

    <span class="c-cm">@classmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">tearDownClass</span>(cls):
        <span class="c-cm"># Una vez por clase — liberar recursos</span>
        cls.bench.disconnect()

    <span class="c-kw">def</span> <span class="c-fn">setUp</span>(<span class="c-bi">self</span>):
        <span class="c-cm"># Antes de CADA test — estado limpio</span>
        <span class="c-bi">self</span>.bench.reset()

    <span class="c-kw">def</span> <span class="c-fn">tearDown</span>(<span class="c-bi">self</span>):
        <span class="c-cm"># Después de CADA test — limpieza</span>
        <span class="c-bi">self</span>.bench.stop_all()

    <span class="c-kw">def</span> <span class="c-fn">test_ignition_on</span>(<span class="c-bi">self</span>):
        <span class="c-bi">self</span>.bench.set_signal(<span class="c-st">"IGN"</span>, <span class="c-nb">1</span>)
        <span class="c-bi">self</span>.assertEqual(<span class="c-bi">self</span>.bench.read_signal(<span class="c-st">"ENGINE_STATE"</span>), <span class="c-st">"running"</span>)</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Orden de ejecución</div>
    <div class="plan-content">
      <h4>¿Cuándo corre cada método?</h4>
      <p><code>setUpModule</code> → <code>setUpClass</code> → [<code>setUp</code> → <code>test_*</code> → <code>tearDown</code>] × n → <code>tearDownClass</code> → <code>tearDownModule</code></p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre setUp/tearDown...</p>
</div>`,

'ut-asserts': `
<div class="plan-card">
  <div class="plan-card-title">✔️ ASSERT Methods — Referencia completa</div>
  <div class="plan-block">
    <div class="plan-time">Todos los asserts</div>
    <div class="plan-content">
      <table class="ref-table">
        <thead><tr><th>Assert</th><th>Verifica</th></tr></thead>
        <tbody>
          <tr><td>assertEqual(a, b)</td><td>a == b</td></tr>
          <tr><td>assertNotEqual(a, b)</td><td>a != b</td></tr>
          <tr><td>assertTrue(x)</td><td>bool(x) is True</td></tr>
          <tr><td>assertFalse(x)</td><td>bool(x) is False</td></tr>
          <tr><td>assertIsNone(x)</td><td>x is None</td></tr>
          <tr><td>assertIsNotNone(x)</td><td>x is not None</td></tr>
          <tr><td>assertIn(a, b)</td><td>a in b</td></tr>
          <tr><td>assertNotIn(a, b)</td><td>a not in b</td></tr>
          <tr><td>assertIs(a, b)</td><td>a is b (misma identidad)</td></tr>
          <tr><td>assertRaises(Exc, fn, *args)</td><td>fn(*args) lanza Exc</td></tr>
          <tr><td>assertAlmostEqual(a, b, places=7)</td><td>round(a-b, places) == 0</td></tr>
          <tr><td>assertGreater(a, b)</td><td>a > b</td></tr>
          <tr><td>assertLess(a, b)</td><td>a < b</td></tr>
          <tr><td>assertRegex(s, r)</td><td>re.search(r, s)</td></tr>
          <tr><td>assertListEqual(a, b)</td><td>listas iguales con diff legible</td></tr>
          <tr><td>assertDictEqual(a, b)</td><td>dicts iguales con diff legible</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre asserts...</p>
</div>`,

'ut-mock': `
<div class="plan-card">
  <div class="plan-card-title">🎭 Mock / Patch — unittest.mock</div>
  <div class="plan-block">
    <div class="plan-time">Conceptos clave</div>
    <div class="plan-content">
      <h4>Mock, MagicMock, patch</h4>
      <div class="code-block"><div class="code-lang">Python — Mock y patch</div><pre>
<span class="c-kw">from</span> unittest.mock <span class="c-kw">import</span> Mock, MagicMock, patch

<span class="c-cm"># Mock básico — simula cualquier objeto</span>
sensor = Mock()
sensor.read_temperature.return_value = <span class="c-nb">85.5</span>
resultado = procesar_temperatura(sensor)  <span class="c-cm"># usa el mock</span>
sensor.read_temperature.assert_called_once()

<span class="c-cm"># side_effect — simular excepciones o comportamiento dinámico</span>
sensor.read.side_effect = ConnectionError(<span class="c-st">"timeout"</span>)
<span class="c-kw">with</span> <span class="c-bi">self</span>.assertRaises(ConnectionError):
    sensor.read()

<span class="c-cm"># @patch — reemplaza módulo completo en contexto</span>
<span class="c-cm">@patch("mymodule.CANInterface")</span>
<span class="c-kw">def</span> <span class="c-fn">test_send_message</span>(<span class="c-bi">self</span>, mock_can):
    mock_can.return_value.send.return_value = <span class="c-kw">True</span>
    controller = MyController()
    controller.send_ignition_on()
    mock_can.return_value.send.assert_called_with(<span class="c-nb">0x105</span>, [<span class="c-nb">1</span>])

<span class="c-cm"># patch como context manager</span>
<span class="c-kw">with</span> patch(<span class="c-st">"os.path.exists"</span>, return_value=<span class="c-kw">True</span>):
    resultado = load_config(<span class="c-st">"config.yaml"</span>)  <span class="c-cm"># cree que el archivo existe</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre mock y patch...</p>
</div>`,

'ut-decoradores': `
<div class="plan-card">
  <div class="plan-card-title">🎨 Decoradores de test — skip, expectedFailure</div>
  <div class="plan-block">
    <div class="plan-time">Decoradores disponibles</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Python — Decoradores de unittest</div><pre>
<span class="c-kw">import</span> unittest, sys

<span class="c-kw">class</span> <span class="c-fn">TestHILBench</span>(unittest.TestCase):

    <span class="c-cm">@unittest.skip("Banco HIL no disponible en CI")</span>
    <span class="c-kw">def</span> <span class="c-fn">test_hardware_real</span>(<span class="c-bi">self</span>):
        ...  <span class="c-cm"># siempre saltado</span>

    <span class="c-cm">@unittest.skipIf(sys.platform == "win32", "Solo en Linux")</span>
    <span class="c-kw">def</span> <span class="c-fn">test_can_socket</span>(<span class="c-bi">self</span>):
        ...  <span class="c-cm"># saltado en Windows</span>

    <span class="c-cm">@unittest.skipUnless(HIL_AVAILABLE, "Requiere HIL bench")</span>
    <span class="c-kw">def</span> <span class="c-fn">test_sensor_data</span>(<span class="c-bi">self</span>):
        ...  <span class="c-cm"># solo corre si HIL_AVAILABLE=True</span>

    <span class="c-cm">@unittest.expectedFailure</span>
    <span class="c-kw">def</span> <span class="c-fn">test_bug_conocido_123</span>(<span class="c-bi">self</span>):
        <span class="c-bi">self</span>.assertEqual(buggy_function(), <span class="c-nb">42</span>)  <span class="c-cm"># falla esperada, no roja</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre decoradores de test...</p>
</div>`,

'ut-subtest': `
<div class="plan-card">
  <div class="plan-card-title">🔬 SubTest — Tests parametrizados sin detenerse</div>
  <div class="plan-block">
    <div class="plan-time">¿Por qué subTest?</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Python — SubTest con datos tabulares</div><pre>
<span class="c-kw">class</span> <span class="c-fn">TestProtocolParser</span>(unittest.TestCase):

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
        <span class="c-cm"># Si falla un subTest, los demás siguen corriendo</span>
        <span class="c-cm"># Sin subTest: el primer fallo detiene todo el test</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre subTest...</p>
</div>`,

'ut-doctest': `
<div class="plan-card">
  <div class="plan-card-title">📖 DocTest — Tests en la documentación</div>
  <div class="plan-block">
    <div class="plan-time">Ejemplo</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Python — DocTest integrado en docstring</div><pre>
<span class="c-kw">def</span> <span class="c-fn">celsius_to_fahrenheit</span>(c):
    <span class="c-st">"""Convierte Celsius a Fahrenheit.

    >>> celsius_to_fahrenheit(0)
    32.0
    >>> celsius_to_fahrenheit(100)
    212.0
    >>> celsius_to_fahrenheit(-40)
    -40.0
    """</span>
    <span class="c-kw">return</span> c * <span class="c-nb">9</span> / <span class="c-nb">5</span> + <span class="c-nb">32</span>

<span class="c-kw">if</span> __name__ == <span class="c-st">"__main__"</span>:
    <span class="c-kw">import</span> doctest
    doctest.testmod(verbose=<span class="c-kw">True</span>)

<span class="c-cm"># Desde CLI: python -m doctest mimodulo.py -v</span>
<span class="c-cm"># Integrar con unittest:</span>
<span class="c-kw">import</span> doctest, unittest
suite = doctest.DocTestSuite(mimodulo)
unittest.TextTestRunner().run(suite)</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre doctest...</p>
</div>`,

'pt-intro': `
<div class="plan-card">
  <div class="plan-card-title">⚡ pytest — Introducción</div>
  <div class="plan-block">
    <div class="plan-time">pytest vs unittest</div>
    <div class="plan-content">
      <h4>Más simple, más potente</h4>
      <div class="code-block"><div class="code-lang">Python — pytest básico</div><pre>
<span class="c-cm"># pip install pytest</span>
<span class="c-cm"># NO necesita herencia de TestCase</span>

<span class="c-kw">def</span> <span class="c-fn">test_suma</span>():
    assert <span class="c-nb">1</span> + <span class="c-nb">1</span> == <span class="c-nb">2</span>   <span class="c-cm"># assert nativo, no self.assertEqual</span>

<span class="c-kw">def</span> <span class="c-fn">test_lista_vacia</span>():
    resultado = procesar([])
    assert resultado == []

<span class="c-cm"># pytest muestra diff detallado si falla:</span>
<span class="c-cm">#   assert [1, 2, 3] == [1, 2, 4]</span>
<span class="c-cm">#                              ^ solo muestra la diferencia</span>

<span class="c-cm"># Ejecutar:</span>
<span class="c-cm"># pytest                    → descubre y corre todos</span>
<span class="c-cm"># pytest test_sensor.py     → solo ese archivo</span>
<span class="c-cm"># pytest -v                 → verbose</span>
<span class="c-cm"># pytest -k "sensor"        → tests con "sensor" en el nombre</span>
<span class="c-cm"># pytest -x                 → para en el primer fallo</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre pytest...</p>
</div>`,

'pt-fixtures': `
<div class="plan-card">
  <div class="plan-card-title">🏗️ Fixtures de pytest</div>
  <div class="plan-block">
    <div class="plan-time">@pytest.fixture</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Python — Fixtures con scope y yield</div><pre>
<span class="c-kw">import</span> pytest

<span class="c-cm"># Fixture de función (default): corre antes/después de cada test</span>
<span class="c-cm">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">bench</span>():
    b = HILBench.connect(<span class="c-st">"bench-01"</span>)
    yield b           <span class="c-cm"># setup → test corre → teardown</span>
    b.reset()
    b.disconnect()

<span class="c-cm"># Scope de sesión: crea la conexión UNA sola vez para todos los tests</span>
<span class="c-cm">@pytest.fixture(scope="session")</span>
<span class="c-kw">def</span> <span class="c-fn">can_interface</span>():
    can = CANInterface.open(<span class="c-st">"can0"</span>)
    yield can
    can.close()

<span class="c-cm"># Usar fixtures como parámetros</span>
<span class="c-kw">def</span> <span class="c-fn">test_ignition</span>(bench, can_interface):
    bench.set_signal(<span class="c-st">"IGN"</span>, <span class="c-nb">1</span>)
    msg = can_interface.wait_for(0x105, timeout=<span class="c-nb">500</span>)
    assert msg.byte(<span class="c-nb">0</span>) == <span class="c-nb">0x01</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre fixtures...</p>
</div>`,

'pt-parametrize': `
<div class="plan-card">
  <div class="plan-card-title">🔢 @pytest.mark.parametrize</div>
  <div class="plan-block">
    <div class="plan-time">Parametrización</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Python — parametrize</div><pre>
<span class="c-kw">import</span> pytest

<span class="c-cm">@pytest.mark.parametrize("entrada,esperado", [</span>
    (<span class="c-nb">0</span>,   <span class="c-st">"OFF"</span>),
    (<span class="c-nb">1</span>,   <span class="c-st">"ON"</span>),
    (<span class="c-nb">255</span>, <span class="c-st">"MAX"</span>),
])
<span class="c-kw">def</span> <span class="c-fn">test_decode_signal</span>(entrada, esperado):
    assert decode_ignition(entrada) == esperado

<span class="c-cm"># ids= para nombres legibles en el reporte</span>
<span class="c-cm">@pytest.mark.parametrize("protocol", ["CAN", "LIN", "ETH"],</span>
                         ids=[<span class="c-st">"can-test"</span>, <span class="c-st">"lin-test"</span>, <span class="c-st">"eth-test"</span>])
<span class="c-kw">def</span> <span class="c-fn">test_connection</span>(protocol):
    assert connect(protocol).is_ok()

<span class="c-cm"># Doble parametrize = producto cartesiano</span>
<span class="c-cm">@pytest.mark.parametrize("baud", [125, 250, 500, 1000])</span>
<span class="c-cm">@pytest.mark.parametrize("channel", [0, 1])</span>
<span class="c-kw">def</span> <span class="c-fn">test_can_baud</span>(channel, baud):
    assert set_baudrate(channel, baud) == <span class="c-kw">True</span>  <span class="c-cm"># 8 tests</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre parametrize...</p>
</div>`,

'pt-marks': `
<div class="plan-card">
  <div class="plan-card-title">🏷️ Marks y filtros en pytest</div>
  <div class="plan-block">
    <div class="plan-time">Marks personalizados</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Python — Marks y configuración pytest.ini</div><pre>
<span class="c-cm"># pytest.ini — registrar marks para evitar warnings</span>
<span class="c-cm">[pytest]</span>
<span class="c-cm">markers =</span>
<span class="c-cm">    hil: tests que requieren banco HIL físico</span>
<span class="c-cm">    slow: tests de más de 30 segundos</span>
<span class="c-cm">    integration: pruebas de integración</span>

<span class="c-cm"># En los tests:</span>
<span class="c-cm">@pytest.mark.hil</span>
<span class="c-cm">@pytest.mark.slow</span>
<span class="c-kw">def</span> <span class="c-fn">test_full_ecu_boot</span>(bench):
    ...

<span class="c-cm"># Ejecutar solo tests con mark "hil":</span>
<span class="c-cm"># pytest -m hil</span>
<span class="c-cm"># Excluir tests lentos en CI:</span>
<span class="c-cm"># pytest -m "not slow"</span>
<span class="c-cm"># Filtrar por nombre:</span>
<span class="c-cm"># pytest -k "ignition or can"</span>

<span class="c-cm"># Marks built-in:</span>
<span class="c-cm">@pytest.mark.xfail(reason="Bug #456 pendiente")</span>
<span class="c-cm">@pytest.mark.skip(reason="No disponible sin VPN")</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre marks...</p>
</div>`,

'pt-conftest': `
<div class="plan-card">
  <div class="plan-card-title">📁 conftest.py — Fixtures compartidas</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es conftest.py?</div>
    <div class="plan-content">
      <h4>El archivo mágico de pytest</h4>
      <div class="code-block"><div class="code-lang">Python — conftest.py</div><pre>
<span class="c-cm"># conftest.py en la raíz del proyecto</span>
<span class="c-cm"># Las fixtures aquí están disponibles en TODOS los tests del directorio</span>
<span class="c-cm"># SIN necesidad de importarlas</span>

<span class="c-kw">import</span> pytest
<span class="c-kw">from</span> myapp.bench <span class="c-kw">import</span> HILBench, CANInterface

<span class="c-cm">@pytest.fixture(scope="session")</span>
<span class="c-kw">def</span> <span class="c-fn">hil_bench</span>():
    bench = HILBench.connect(<span class="c-st">"bench-01"</span>)
    yield bench
    bench.disconnect()

<span class="c-cm">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">clean_bench</span>(hil_bench):
    hil_bench.reset()
    yield hil_bench
    hil_bench.stop_all()

<span class="c-cm"># Hook para modificar colección de tests</span>
<span class="c-kw">def</span> <span class="c-fn">pytest_collection_modifyitems</span>(config, items):
    <span class="c-kw">for</span> item <span class="c-kw">in</span> items:
        <span class="c-kw">if</span> <span class="c-st">"hil"</span> <span class="c-kw">in</span> item.nodeid:
            item.add_marker(pytest.mark.hil)</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre conftest.py...</p>
</div>`,

'pt-assert': `
<div class="plan-card">
  <div class="plan-card-title">✔️ Assert en pytest — Introspección automática</div>
  <div class="plan-block">
    <div class="plan-time">Ventajas del assert nativo</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Python — Assert pytest con introspección</div><pre>
<span class="c-cm"># pytest reescribe assert en tiempo de compilación</span>
<span class="c-cm"># para mostrar valores exactos al fallar</span>

<span class="c-kw">def</span> <span class="c-fn">test_frame</span>():
    frame = parse_can(b<span class="c-st">'\x01\x02\x03'</span>)
    assert frame.id == <span class="c-nb">0x105</span>
    <span class="c-cm"># Si falla: AssertionError: assert 0x100 == 0x105</span>

<span class="c-cm"># pytest.raises — verificar excepciones</span>
<span class="c-kw">def</span> <span class="c-fn">test_timeout</span>():
    <span class="c-kw">with</span> pytest.raises(TimeoutError) <span class="c-kw">as</span> exc_info:
        wait_for_response(timeout=<span class="c-nb">0.001</span>)
    assert <span class="c-st">"0.001s"</span> <span class="c-kw">in</span> <span class="c-bi">str</span>(exc_info.value)

<span class="c-cm"># pytest.approx — comparación de floats</span>
<span class="c-kw">def</span> <span class="c-fn">test_temperatura</span>():
    assert convert_adc(<span class="c-nb">512</span>) == pytest.approx(<span class="c-nb">85.0</span>, abs=<span class="c-nb">0.5</span>)
    <span class="c-cm"># Pasa si el valor está dentro de ±0.5</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre assert en pytest...</p>
</div>`,

'pt-reportes': `
<div class="plan-card">
  <div class="plan-card-title">📊 Reportes — HTML, JUnit XML, Allure</div>
  <div class="plan-block">
    <div class="plan-time">Generar reportes</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Reportes de pytest</div><pre>
<span class="c-cm"># HTML (requiere: pip install pytest-html)</span>
pytest --html=reports/test_report.html --self-contained-html

<span class="c-cm"># JUnit XML (para Jenkins/GitLab CI)</span>
pytest --junitxml=reports/junit.xml

<span class="c-cm"># Ambos a la vez</span>
pytest --html=report.html --junitxml=junit.xml -v

<span class="c-cm"># Allure (requiere: pip install allure-pytest + allure CLI)</span>
pytest --alluredir=allure-results
allure serve allure-results   <span class="c-cm"># abre dashboard en browser</span>

<span class="c-cm"># Coverage + reporte HTML</span>
pytest --cov=src --cov-report=html --cov-report=term-missing</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre reportes...</p>
</div>`,

'coverage': `
<div class="plan-card">
  <div class="plan-card-title">📈 Coverage.py — Cobertura de código</div>
  <div class="plan-block">
    <div class="plan-time">Medir cobertura</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — coverage.py y pytest-cov</div><pre>
<span class="c-cm"># Método 1: coverage.py directamente</span>
coverage run -m pytest tests/
coverage report -m           <span class="c-cm"># reporte en terminal con líneas faltantes</span>
coverage html                <span class="c-cm"># genera htmlcov/index.html</span>
coverage xml                 <span class="c-cm"># para SonarQube</span>

<span class="c-cm"># Método 2: pytest-cov (más conveniente)</span>
pytest --cov=src --cov-report=term-missing --cov-report=html

<span class="c-cm"># Excluir archivos de coverage</span>
<span class="c-cm"># .coveragerc:</span>
<span class="c-cm">[run]</span>
<span class="c-cm">source = src</span>
<span class="c-cm">omit = */migrations/*, */tests/*</span>

<span class="c-cm">[report]</span>
<span class="c-cm">fail_under = 80    # falla si cobertura < 80%</span>
<span class="c-cm">show_missing = True</span>

<span class="c-cm"># En GitHub Actions:</span>
<span class="c-cm"># - name: Run tests with coverage</span>
<span class="c-cm">#   run: pytest --cov=src --cov-report=xml</span>
<span class="c-cm"># - uses: codecov/codecov-action@v3</span>
<span class="c-cm">#   with:</span>
<span class="c-cm">#     files: coverage.xml</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre coverage...</p>
</div>`,

'ut-api': `
<div class="plan-card">
  <div class="plan-card-title">🌐 API Testing con requests + pytest</div>
  <div class="plan-block">
    <div class="plan-time">Testing de APIs REST</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Python — API testing</div><pre>
<span class="c-kw">import</span> requests, pytest

BASE_URL = <span class="c-st">"http://localhost:8080/api"</span>

<span class="c-cm">@pytest.fixture</span>
<span class="c-kw">def</span> <span class="c-fn">base_url</span>():
    <span class="c-kw">return</span> BASE_URL

<span class="c-kw">def</span> <span class="c-fn">test_get_vehicle_status</span>(base_url):
    r = requests.get(<span class="c-kw">f</span><span class="c-st">f"{base_url}/vehicle/status"</span>)
    assert r.status_code == <span class="c-nb">200</span>
    data = r.json()
    assert <span class="c-st">"speed"</span> <span class="c-kw">in</span> data
    assert isinstance(data[<span class="c-st">"speed"</span>], <span class="c-bi">float</span>)

<span class="c-kw">def</span> <span class="c-fn">test_post_command</span>(base_url):
    payload = {<span class="c-st">"command"</span>: <span class="c-st">"IGNITION_ON"</span>}
    r = requests.post(<span class="c-kw">f</span><span class="c-st">f"{base_url}/command"</span>, json=payload)
    assert r.status_code == <span class="c-nb">201</span>

<span class="c-cm"># Mockear requests para tests sin servidor real:</span>
<span class="c-cm"># pip install responses</span>
<span class="c-kw">import</span> responses

<span class="c-cm">@responses.activate</span>
<span class="c-kw">def</span> <span class="c-fn">test_offline</span>():
    responses.add(responses.GET, <span class="c-st">"http://localhost/api/status"</span>,
                  json={<span class="c-st">"speed"</span>: <span class="c-nb">0.0</span>}, status=<span class="c-nb">200</span>)
    r = requests.get(<span class="c-st">"http://localhost/api/status"</span>)
    assert r.json()[<span class="c-st">"speed"</span>] == <span class="c-nb">0.0</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre API testing...</p>
</div>`,

'ut-faker': `
<div class="plan-card">
  <div class="plan-card-title">🎲 Faker — Datos aleatorios para tests</div>
  <div class="plan-block">
    <div class="plan-time">Uso de Faker</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Python — Faker básico y avanzado</div><pre>
<span class="c-kw">from</span> faker <span class="c-kw">import</span> Faker

fake = Faker(<span class="c-st">"es_MX"</span>)  <span class="c-cm"># locale en español México</span>

<span class="c-bi">print</span>(fake.name())           <span class="c-cm"># "Ana García López"</span>
<span class="c-bi">print</span>(fake.email())          <span class="c-cm"># "ana.garcia@example.com"</span>
<span class="c-bi">print</span>(fake.date_of_birth())  <span class="c-cm"># datetime(1990, 3, 15)</span>
<span class="c-bi">print</span>(fake.license_plate())  <span class="c-cm"># "ABC-1234"</span>
<span class="c-bi">print</span>(fake.vin())            <span class="c-cm"># VIN automotriz de 17 chars</span>

<span class="c-cm"># Provider personalizado para datos CAN</span>
<span class="c-kw">from</span> faker.providers <span class="c-kw">import</span> BaseProvider
<span class="c-kw">class</span> <span class="c-fn">CANProvider</span>(BaseProvider):
    <span class="c-kw">def</span> <span class="c-fn">can_id</span>(<span class="c-bi">self</span>):
        <span class="c-kw">return</span> <span class="c-bi">self</span>.random_int(<span class="c-nb">0</span>, <span class="c-nb">0x7FF</span>)
    <span class="c-kw">def</span> <span class="c-fn">can_data</span>(<span class="c-bi">self</span>, length=<span class="c-nb">8</span>):
        <span class="c-kw">return</span> [<span class="c-bi">self</span>.random_int(<span class="c-nb">0</span>, <span class="c-nb">255</span>) <span class="c-kw">for</span> _ <span class="c-kw">in</span> <span class="c-bi">range</span>(length)]

fake.add_provider(CANProvider)
<span class="c-bi">print</span>(fake.can_id(), fake.can_data())  <span class="c-cm"># 0x2A5, [1,255,0,...]</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Faker...</p>
</div>`,

'gh-actions-py': `
<div class="plan-card">
  <div class="plan-card-title">🤖 GitHub Actions + pytest</div>
  <div class="plan-block">
    <div class="plan-time">Workflow completo</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">YAML — .github/workflows/ci.yml</div><pre>
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
        pip install pytest pytest-cov pytest-html

    - name: Run tests
      run: pytest tests/ -v --cov=src --cov-report=xml --junitxml=junit.xml

    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        files: coverage.xml

    - name: Publish test report
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: test-results
        path: junit.xml</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre GitHub Actions y CI...</p>
</div>`,

'ia-test': `
<div class="plan-card">
  <div class="plan-card-title">🧠 IA Test — Generación de tests con IA</div>
  <div class="plan-block">
    <div class="plan-time">Estrategia</div>
    <div class="plan-content">
      <h4>Usar Copilot / Claude / ChatGPT para generar tests</h4>
      <p><b>Prompt efectivo:</b><br>
      "Genera tests unitarios pytest para esta función. Incluye: casos normales, edge cases (lista vacía, valores negativos, None), y casos de error con pytest.raises. Usa fixtures si hay setup repetido."<br><br>
      <b>Lo que la IA hace bien:</b><br>
      • Generar casos base y edge cases rápidamente.<br>
      • Sugerir datos de prueba (parametrize).<br>
      • Crear mocks para dependencias.<br><br>
      <b>Lo que DEBES revisar:</b><br>
      • ¿Los asserts son correctos? La IA puede assertar cosas incorrectas.<br>
      • ¿Cubre casos de negocio reales (no solo tipos de datos)?<br>
      • ¿El mock simula correctamente el comportamiento esperado?<br>
      • ¿Hay casos faltantes específicos de tu dominio (automotriz)?</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre generación de tests con IA...</p>
</div>`,

};  // fin TESTING_RICH
