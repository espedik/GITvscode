// ══════════════════════════════════════════════════════════════════
//  PYTHON RICH CONTENT — Fundamentos
// ══════════════════════════════════════════════════════════════════
const PYTHON_RICH = {

'py-for': `
<div class="tab-group-pyfor">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pf-1','pyfor')">for</button>
    <button class="tab-btn" onclick="switchTab(this,'pf-2','pyfor')">while</button>
    <button class="tab-btn" onclick="switchTab(this,'pf-3','pyfor')">if / elif / else</button>
    <button class="tab-btn" onclick="switchTab(this,'pf-4','pyfor')">Trucos avanzados</button>
    <button class="tab-btn" onclick="switchTab(this,'pf-5','pyfor')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'pf-6','pyfor')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'pf-7','pyfor')">Gotchas</button>
    <button class="tab-btn" onclick="switchTab(this,'pf-8','pyfor')">📁 Ejercicios_For_Loop (carpeta)</button>
  </div>
  <div id="pf-1" class="tab-panel active">
<div class="concept-intro">El <strong>for</strong> recorre un iterable (lista, tupla, dict, string, range, generador...) elemento por elemento; internamente llama a <code>iter()</code> y luego a <code>next()</code> hasta agotarlo. Úsalo cuando el número de iteraciones está determinado por el tamaño de una colección — recorrer una lista, un diccionario, o un rango fijo. En entrevistas de software automotriz es común pedir procesar logs, telemetría o streams de CAN con él.</div>
<div class="code-block"><div class="code-lang">Python — for: todas las variantes</div><pre>
<span class="c-cm"># 1. Iterar sobre lista</span>
<span class="c-kw">for</span> item <span class="c-kw">in</span> [<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>]:
    <span class="c-bi">print</span>(item)

<span class="c-cm"># 2. range(start, stop, step)  — stop es EXCLUSIVO</span>
<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">0</span>, <span class="c-nb">10</span>, <span class="c-nb">2</span>):   <span class="c-cm"># 0,2,4,6,8</span>
    <span class="c-bi">print</span>(i)

<span class="c-cm"># 3. enumerate — índice + valor</span>
<span class="c-kw">for</span> i, val <span class="c-kw">in</span> <span class="c-bi">enumerate</span>([<span class="c-st">'a'</span>,<span class="c-st">'b'</span>,<span class="c-st">'c'</span>], start=<span class="c-nb">1</span>):
    <span class="c-bi">print</span>(i, val)   <span class="c-cm"># 1 a, 2 b, 3 c</span>

<span class="c-cm"># 4. zip — dos listas en paralelo</span>
<span class="c-kw">for</span> ts, err <span class="c-kw">in</span> <span class="c-bi">zip</span>(timestamps, errors):
    <span class="c-bi">print</span>(ts, err)

<span class="c-cm"># 5. zip con desigual longitud → zip_longest</span>
<span class="c-kw">from</span> itertools <span class="c-kw">import</span> zip_longest
<span class="c-kw">for</span> a, b <span class="c-kw">in</span> zip_longest([<span class="c-nb">1</span>,<span class="c-nb">2</span>], [<span class="c-st">'x'</span>], fillvalue=<span class="c-kw">None</span>):
    <span class="c-bi">print</span>(a, b)   <span class="c-cm"># (1,'x') (2, None)</span>

<span class="c-cm"># 6. for-else: el else corre si el loop NO usó break</span>
<span class="c-kw">for</span> item <span class="c-kw">in</span> items:
    <span class="c-kw">if</span> item == target:
        <span class="c-bi">print</span>(<span class="c-st">"encontrado"</span>)
        <span class="c-kw">break</span>
<span class="c-kw">else</span>:
    <span class="c-bi">print</span>(<span class="c-st">"no encontrado"</span>)  <span class="c-cm"># solo si no hubo break</span>

<span class="c-cm"># 7. reversed() e iter() sobre cualquier iterable</span>
<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">reversed</span>(<span class="c-bi">range</span>(<span class="c-nb">5</span>)):   <span class="c-cm"># 4,3,2,1,0</span>
    <span class="c-bi">print</span>(i)</pre></div>
<div class="code-block"><div class="code-lang">Python — Iterar diccionarios (claves, valores, ambos)</div><pre>
telemetry = {<span class="c-st">'rpm'</span>: <span class="c-nb">3200</span>, <span class="c-st">'speed'</span>: <span class="c-nb">87</span>, <span class="c-st">'temp'</span>: <span class="c-nb">92</span>}

<span class="c-cm"># Iterar solo claves (comportamiento por defecto de "for k in dict")</span>
<span class="c-kw">for</span> key <span class="c-kw">in</span> telemetry:
    <span class="c-bi">print</span>(key)

<span class="c-cm"># Iterar solo valores</span>
<span class="c-kw">for</span> value <span class="c-kw">in</span> telemetry.values():
    <span class="c-bi">print</span>(value)

<span class="c-cm"># Iterar clave + valor (la forma más usada en la práctica)</span>
<span class="c-kw">for</span> key, value <span class="c-kw">in</span> telemetry.items():
    <span class="c-bi">print</span>(<span class="c-st">f"{key}: {value}"</span>)

<span class="c-cm"># TRAMPA: agregar/eliminar claves mientras iteras lanza RuntimeError</span>
<span class="c-cm"># for k in telemetry: del telemetry[k]   # RuntimeError: dictionary changed size during iteration</span>
<span class="c-cm"># Solución: iterar sobre una copia de las claves</span>
<span class="c-kw">for</span> k <span class="c-kw">in</span> <span class="c-bi">list</span>(telemetry.keys()):
    <span class="c-kw">if</span> telemetry[k] &lt; <span class="c-nb">0</span>:
        <span class="c-kw">del</span> telemetry[k]</pre></div>
  </div>
  <div id="pf-2" class="tab-panel">
<div class="concept-intro">El <strong>while</strong> repite mientras una condición sea verdadera — úsalo cuando no sabes de antemano cuántas iteraciones harán falta (por ejemplo, esperar una respuesta de un ECU o hacer polling de un sensor), a diferencia del <code>for</code> que recorre una cantidad de elementos ya conocida.</div>
<div class="code-block"><div class="code-lang">Python — while y control de flujo</div><pre>
<span class="c-cm"># while básico</span>
i = <span class="c-nb">0</span>
<span class="c-kw">while</span> i &lt; <span class="c-nb">10</span>:
    i += <span class="c-nb">1</span>

<span class="c-cm"># while True con break (loop infinito controlado)</span>
<span class="c-kw">while</span> <span class="c-kw">True</span>:
    data = read_sensor()
    <span class="c-kw">if</span> data <span class="c-kw">is None</span>: <span class="c-kw">break</span>
    process(data)

<span class="c-cm"># continue — salta al siguiente ciclo</span>
<span class="c-kw">for</span> line <span class="c-kw">in</span> log_lines:
    <span class="c-kw">if</span> line.startswith(<span class="c-st">'#'</span>): <span class="c-kw">continue</span>  <span class="c-cm"># salta comentarios</span>
    process(line)

<span class="c-cm"># Walrus operator := (Python 3.8+) — asigna y evalúa en una línea</span>
<span class="c-kw">while</span> chunk := f.read(<span class="c-nb">8192</span>):   <span class="c-cm"># lee hasta EOF</span>
    process(chunk)

<span class="c-cm"># while con timeout — patrón típico de polling de un ECU/HIL rig</span>
<span class="c-kw">import</span> time
deadline = time.time() + <span class="c-nb">5.0</span>
<span class="c-kw">while</span> <span class="c-kw">not</span> ecu.is_ready():
    <span class="c-kw">if</span> time.time() &gt; deadline:
        <span class="c-kw">raise</span> TimeoutError(<span class="c-st">"ECU no respondió a tiempo"</span>)
    time.sleep(<span class="c-nb">0.1</span>)</pre></div>
  </div>
  <div id="pf-3" class="tab-panel">
<div class="concept-intro">Las estructuras condicionales deciden qué rama de código se ejecuta. Python no tiene <code>switch</code> tradicional (hasta 3.10, donde llega <code>match/case</code>); antes de eso, la alternativa Pythónica para "muchos casos" es un diccionario de funciones (dispatch table).</div>
<div class="code-block"><div class="code-lang">Python — if / elif / else completo</div><pre>
<span class="c-cm"># Básico</span>
<span class="c-kw">if</span> x &gt; <span class="c-nb">0</span>:
    <span class="c-bi">print</span>(<span class="c-st">"positivo"</span>)
<span class="c-kw">elif</span> x == <span class="c-nb">0</span>:
    <span class="c-bi">print</span>(<span class="c-st">"cero"</span>)
<span class="c-kw">else</span>:
    <span class="c-bi">print</span>(<span class="c-st">"negativo"</span>)

<span class="c-cm"># Ternario (una línea)</span>
status = <span class="c-st">"ok"</span> <span class="c-kw">if</span> error_count == <span class="c-nb">0</span> <span class="c-kw">else</span> <span class="c-st">"fail"</span>

<span class="c-cm"># Comparaciones encadenadas (Pythónico)</span>
<span class="c-kw">if</span> <span class="c-nb">0</span> &lt;= latency &lt;= <span class="c-nb">100</span>:   <span class="c-cm"># equivale a 0<=latency AND latency<=100</span>
    <span class="c-bi">print</span>(<span class="c-st">"dentro del rango"</span>)

<span class="c-cm"># match/case (Python 3.10+) — mejor que if/elif para muchos casos</span>
<span class="c-kw">match</span> error_code:
    <span class="c-kw">case</span> <span class="c-nb">0</span>:  result = <span class="c-st">"OK"</span>
    <span class="c-kw">case</span> <span class="c-nb">404</span>: result = <span class="c-st">"Not Found"</span>
    <span class="c-kw">case</span> x <span class="c-kw">if</span> x &gt;= <span class="c-nb">500</span>: result = <span class="c-st">"Server Error"</span>
    <span class="c-kw">case</span> _:   result = <span class="c-st">"Unknown"</span>   <span class="c-cm"># default</span>

<span class="c-cm"># Dict como switch (alternativa clásica al match)</span>
handlers = {
    <span class="c-st">"TIMEOUT"</span>:  handle_timeout,
    <span class="c-st">"HW_ERROR"</span>: handle_hw,
    <span class="c-st">"FW_BUG"</span>:   handle_fw,
}
handler = handlers.get(error_type, handle_unknown)
handler()

<span class="c-cm"># Truthiness — qué se evalúa como False en un if</span>
<span class="c-cm"># False, None, 0, 0.0, "", [], {}, set(), range(0)  → todos "falsy"</span>
<span class="c-kw">if</span> <span class="c-kw">not</span> errores:       <span class="c-cm"># mejor que "len(errores) == 0"</span>
    <span class="c-bi">print</span>(<span class="c-st">"sin errores"</span>)</pre></div>
  </div>
  <div id="pf-4" class="tab-panel">
<div class="concept-intro">El módulo <code>itertools</code> ofrece iteradores "perezosos" (lazy) muy usados para procesar grandes volúmenes de datos — logs de CI, streams de bus CAN, resultados de baterías de test — sin cargar todo en memoria.</div>
<div class="code-block"><div class="code-lang">Python — Técnicas avanzadas de iteración</div><pre>
<span class="c-kw">import</span> itertools

<span class="c-cm"># chain — une iterables sin crear lista intermedia</span>
<span class="c-kw">for</span> item <span class="c-kw">in</span> itertools.chain(list1, list2, list3):
    process(item)

<span class="c-cm"># islice — slice de un generador/iterable (lazy)</span>
first_100 = <span class="c-bi">list</span>(itertools.islice(log_stream, <span class="c-nb">100</span>))

<span class="c-cm"># groupby — agrupa elementos consecutivos iguales (requiere sorted)</span>
<span class="c-kw">from</span> itertools <span class="c-kw">import</span> groupby
events_sorted = <span class="c-bi">sorted</span>(events, key=<span class="c-kw">lambda</span> e: e.bench)
<span class="c-kw">for</span> bench, group <span class="c-kw">in</span> groupby(events_sorted, key=<span class="c-kw">lambda</span> e: e.bench):
    <span class="c-bi">print</span>(bench, <span class="c-bi">list</span>(group))

<span class="c-cm"># product — producto cartesiano (todas las combinaciones)</span>
<span class="c-kw">for</span> bench, config <span class="c-kw">in</span> itertools.product([<span class="c-st">'A1'</span>,<span class="c-st">'A2'</span>], [<span class="c-st">'debug'</span>,<span class="c-st">'release'</span>]):
    run_test(bench, config)  <span class="c-cm"># A1/debug, A1/release, A2/debug, A2/release</span>

<span class="c-cm"># pairwise (Python 3.10+) — pares consecutivos</span>
<span class="c-kw">for</span> t1, t2 <span class="c-kw">in</span> itertools.pairwise(timestamps):
    gap = t2 - t1

<span class="c-cm"># count / cycle — iteradores infinitos, siempre combinados con islice o break</span>
<span class="c-kw">for</span> seq_id <span class="c-kw">in</span> itertools.count(start=<span class="c-nb">1</span>):    <span class="c-cm"># 1, 2, 3, 4, ... infinito</span>
    <span class="c-kw">if</span> seq_id &gt; <span class="c-nb">3</span>: <span class="c-kw">break</span>
    <span class="c-bi">print</span>(seq_id)

<span class="c-kw">for</span> bank <span class="c-kw">in</span> itertools.islice(itertools.cycle([<span class="c-st">'A'</span>,<span class="c-st">'B'</span>,<span class="c-st">'C'</span>]), <span class="c-nb">7</span>):
    <span class="c-bi">print</span>(bank)   <span class="c-cm"># A B C A B C A — repite el ciclo</span></pre></div>
  </div>
  <div id="pf-5" class="tab-panel">
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
<span class="c-kw">for</span> v <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">0</span>, <span class="c-nb">1</span>, <span class="c-nb">0.1</span>):   <span class="c-cm"># TypeError</span>
    <span class="c-bi">print</span>(v)</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
<span class="c-kw">import</span> numpy <span class="c-kw">as</span> np
<span class="c-kw">for</span> v <span class="c-kw">in</span> np.arange(<span class="c-nb">0</span>, <span class="c-nb">1</span>, <span class="c-nb">0.1</span>):
    <span class="c-bi">print</span>(v)
<span class="c-cm"># o sin numpy:</span>
<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">10</span>):
    v = i * <span class="c-nb">0.1</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>range()</code> solo acepta enteros — internamente representa el rango sin materializar la secuencia, y eso requiere pasos enteros. En entrevistas es un clásico: si necesitas pasos fraccionarios (por ejemplo, barrer un umbral de voltaje 0.0 a 1.0 en pasos de 0.1), usa <code>numpy.arange</code>/<code>numpy.linspace</code> o multiplica un índice entero.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
codigos = [<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>, <span class="c-nb">4</span>, <span class="c-nb">5</span>]
<span class="c-kw">for</span> c <span class="c-kw">in</span> codigos:
    <span class="c-kw">if</span> c % <span class="c-nb">2</span> == <span class="c-nb">0</span>:
        codigos.remove(c)   <span class="c-cm"># salta el 4</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
<span class="c-cm"># Itera sobre una copia, o mejor, construye una lista nueva</span>
codigos = [c <span class="c-kw">for</span> c <span class="c-kw">in</span> codigos <span class="c-kw">if</span> c % <span class="c-nb">2</span> != <span class="c-nb">0</span>]</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> las listas usan un índice interno que avanza en cada iteración. Al hacer <code>remove()</code>, el resto de elementos se recorre a la izquierda pero el índice ya avanzó, así que un elemento se "salta". El mismo problema ocurre con <code>dict</code>/<code>set</code>, donde directamente lanza <code>RuntimeError: dictionary changed size during iteration</code>. Regla general: nunca mutes la colección que estás recorriendo; construye una nueva o itera sobre <code>lista[:]</code>.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
callbacks = []
<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">3</span>):
    callbacks.append(<span class="c-kw">lambda</span>: i)
<span class="c-bi">print</span>([cb() <span class="c-kw">for</span> cb <span class="c-kw">in</span> callbacks])  <span class="c-cm"># [2, 2, 2] no [0, 1, 2]</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
callbacks = []
<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">3</span>):
    callbacks.append(<span class="c-kw">lambda</span> i=i: i)   <span class="c-cm"># default arg "congela" el valor</span>
<span class="c-bi">print</span>([cb() <span class="c-kw">for</span> cb <span class="c-kw">in</span> callbacks])  <span class="c-cm"># [0, 1, 2]</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> las funciones/lambdas creadas dentro de un loop capturan la <b>variable</b>, no el valor que tenía en ese instante (late binding). Cuando finalmente se ejecutan, todas leen el valor final de <code>i</code>. Este bug aparece típicamente al registrar callbacks de eventos de un bus CAN dentro de un loop de configuración. Solución: usa un argumento por defecto (<code>lambda i=i: ...</code>) o una fábrica de funciones/<code>functools.partial</code>.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
<span class="c-cm"># Loop infinito: la condición nunca cambia dentro del loop</span>
retries = <span class="c-nb">0</span>
<span class="c-kw">while</span> retries &lt; <span class="c-nb">3</span>:
    ok = try_connect_to_ecu()
    <span class="c-kw">if</span> ok:
        <span class="c-kw">break</span>
    <span class="c-cm"># ¡falta incrementar retries!</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
retries = <span class="c-nb">0</span>
<span class="c-kw">while</span> retries &lt; <span class="c-nb">3</span>:
    ok = try_connect_to_ecu()
    <span class="c-kw">if</span> ok:
        <span class="c-kw">break</span>
    retries += <span class="c-nb">1</span>
<span class="c-kw">else</span>:
    <span class="c-kw">raise</span> ConnectionError(<span class="c-st">"No se pudo conectar tras 3 intentos"</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> un <code>while</code> depende 100% de que algo dentro del cuerpo cambie la condición. Olvidar el incremento/actualización es la causa número uno de scripts que "cuelgan" un banco de pruebas HIL. Buena práctica: siempre ten un límite de intentos o timeout explícito (ver ejemplo de <code>deadline</code> en la pestaña for/while), y usa <code>while...else</code> para manejar el caso de agotar los reintentos.</div>
  </div>
  <div id="pf-6" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Usa enumerate() en vez de manejar un índice manual</div>
  <p>En vez de <code>i = 0; for x in lst: ...; i += 1</code>, usa <code>for i, x in enumerate(lst):</code>. Es más corto, menos propenso a errores off-by-one, y soporta <code>start=</code> para arrancar en 1 en vez de 0.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa zip() en vez de indexar dos listas con range(len(...))</div>
  <p>Mal: <code>for i in range(len(a)): f(a[i], b[i])</code>. Bien: <code>for x, y in zip(a, b):</code>. Es más legible y evita bugs si las listas tienen longitudes distintas (zip corta en la más corta; usa <code>zip_longest</code> si necesitas lo contrario).</p>
</div>
<div class="practice-card">
  <div class="practice-title">for cuando sabes cuántas iteraciones, while cuando dependes de una condición dinámica</div>
  <p>Si vas a recorrer una colección conocida, usa <code>for</code>. Reserva <code>while</code> para esperar eventos externos (polling de un sensor, esperar respuesta de un ECU, leer un stream hasta EOF) — y siempre agrega un timeout o límite de reintentos para evitar loops infinitos en producción.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Evita anidar más de 2-3 niveles de for; extrae a función o usa itertools.product</div>
  <p>Un triple <code>for</code> anidado suele ser señal de que conviene una función auxiliar, una comprehension, o <code>itertools.product</code> para combinaciones. Reduce la complejidad ciclomática y facilita el testing unitario de cada parte.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa "continue" con guard clauses para reducir anidamiento</div>
  <p>En vez de anidar todo el cuerpo del loop dentro de un <code>if</code>, invierte la condición y usa <code>continue</code> para saltar temprano: <code>if not valido(x): continue</code>. El código queda más plano y fácil de leer, sobre todo al filtrar líneas de log inválidas.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Prefiere .items() a re-indexar el diccionario dentro del loop</div>
  <p>Mal: <code>for k in d: v = d[k]</code> (una búsqueda extra por iteración). Bien: <code>for k, v in d.items():</code>. Además de más limpio, evita una consulta redundante al diccionario en cada vuelta.</p>
</div>
  </div>
  <div id="pf-7" class="tab-panel">
    <div class="plan-card"><div class="plan-card-title">⚠️ Gotchas comunes — errores típicos en entrevista</div>
      <div class="plan-block"><div class="plan-time">Trampa 1</div><div class="plan-content"><h4>Modificar una lista mientras la iteras</h4><p>Nunca hagas <code>for x in lista: lista.remove(x)</code>. Salta elementos porque el índice avanza pero la lista se encoge. Solución: itera sobre una copia: <code>for x in lista[:]:</code> o usa list comprehension.</p></div></div>
      <div class="plan-block"><div class="plan-time">Trampa 2</div><div class="plan-content"><h4>range vs list — range es lazy</h4><p><code>range(1000000)</code> no crea un millón de números en memoria. Es un objeto que genera los valores al iterar. Nunca hagas <code>list(range(1000000))</code> si solo vas a iterar.</p></div></div>
      <div class="plan-block"><div class="plan-time">Trampa 3</div><div class="plan-content"><h4>for-else es contraintuitivo</h4><p>El <code>else</code> de un for/while NO es "si el loop no corrió". Es "si el loop terminó sin break". Pregunta frecuente de entrevista.</p></div></div>
      <div class="plan-block"><div class="plan-time">Trampa 4</div><div class="plan-content"><h4>La variable del loop sobrevive fuera del for</h4><p>A diferencia de otros lenguajes, el nombre usado en <code>for i in ...</code> no queda "encapsulado": después del loop, <code>i</code> sigue existiendo con su último valor (o incluso si la colección estaba vacía, con el valor que tenía antes, si es que existía).</p></div></div>
    </div>
  </div>
  <div id="pf-8" class="tab-panel">
<div class="concept-intro">Los <b>10 ejercicios completos</b> de la carpeta <code>Ejercicios_Python/Ejercicios_For_Loop</code> del repositorio, con su enunciado y solución tal como están guardados — para tenerlos siempre a mano sin salir de la app.</div>
<div class="tab-group-pfex">
  <div class="tab-bar" style="flex-wrap:wrap">
    <button class="tab-btn active" onclick="switchTab(this,'pfex-1','pfex')">1. Básico</button>
    <button class="tab-btn" onclick="switchTab(this,'pfex-2','pfex')">2. Enumerate</button>
    <button class="tab-btn" onclick="switchTab(this,'pfex-3','pfex')">3. Zip</button>
    <button class="tab-btn" onclick="switchTab(this,'pfex-4','pfex')">4. Anidado</button>
    <button class="tab-btn" onclick="switchTab(this,'pfex-5','pfex')">5. Break/Continue</button>
    <button class="tab-btn" onclick="switchTab(this,'pfex-6','pfex')">6. For-Else</button>
    <button class="tab-btn" onclick="switchTab(this,'pfex-7','pfex')">7. Comprehension</button>
    <button class="tab-btn" onclick="switchTab(this,'pfex-8','pfex')">8. Acumuladores</button>
    <button class="tab-btn" onclick="switchTab(this,'pfex-9','pfex')">9. Diccionario</button>
    <button class="tab-btn" onclick="switchTab(this,'pfex-10','pfex')">10. While vs For</button>
  </div>

  <div id="pfex-1" class="tab-panel active">
<div class="code-block"><div class="code-lang">1_Basico_For.py</div><pre>
<span class="c-st">"""
1. EL RECORRIDO BÁSICO
Objetivo: Aprender las dos formas fundamentales de recorrer datos con 'for'.

- Crea una lista 'lecturas' con al menos 5 valores numéricos.
- Recorre la lista directamente con 'for valor in lecturas' e imprime cada uno.
- Recorre la misma lista usando 'for i in range(len(lecturas))' para acceder
  por índice, e imprime "posición -> valor".
- Recorre la lista con la forma EXPLÍCITA 'range(0, len(lecturas), 1)',
  indicando inicio, fin y paso aunque sean los valores por defecto.
- Usa range(inicio, fin, paso) con paso distinto de 1 para imprimir solo
  los índices pares.
"""</span>

<span class="c-cm"># A. Lista de lecturas de un sensor</span>
lecturas = [<span class="c-nb">12.5</span>, <span class="c-nb">13.1</span>, <span class="c-nb">11.8</span>, <span class="c-nb">14.4</span>, <span class="c-nb">10.9</span>]

<span class="c-cm"># B. Recorrido directo: 'valor' toma cada elemento de la lista en orden</span>
<span class="c-bi">print</span>(<span class="c-st">"--- Recorrido directo ---"</span>)
<span class="c-kw">for</span> valor <span class="c-kw">in</span> lecturas:
    <span class="c-bi">print</span>(valor)

<span class="c-cm"># C. Recorrido por índice: útil cuando necesitas la POSICIÓN, no solo el dato
# range(len(lecturas)) es la forma corta; internamente equivale a
# range(0, len(lecturas), 1), es decir: empezar en 0, terminar antes de
# len(lecturas), avanzando de a 1 en 1.</span>
<span class="c-bi">print</span>(<span class="c-st">"--- Recorrido por índice ---"</span>)
<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-bi">len</span>(lecturas)):
    <span class="c-bi">print</span>(f<span class="c-st">"posición {i} -&gt; {lecturas[i]}"</span>)

<span class="c-cm"># D. La misma idea pero con los 3 parámetros ESCRITOS explícitamente:
# range(inicio, fin, paso) -> range(0, len(lecturas), 1)
# Es exactamente el mismo recorrido que en C, solo que sin depender de
# los valores por defecto de range(). Útil cuando el paso puede cambiar.</span>
<span class="c-bi">print</span>(<span class="c-st">"--- Recorrido por índice (forma explícita) ---"</span>)
<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">0</span>, <span class="c-bi">len</span>(lecturas), <span class="c-nb">1</span>):
    <span class="c-bi">print</span>(f<span class="c-st">"posición {i} -&gt; {lecturas[i]}"</span>)

<span class="c-cm"># E. range(inicio, fin, paso): controla exactamente qué índices visitar
# Aquí recorremos solo las posiciones pares (0, 2, 4...)</span>
<span class="c-bi">print</span>(<span class="c-st">"--- Solo posiciones pares ---"</span>)
<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">0</span>, <span class="c-bi">len</span>(lecturas), <span class="c-nb">2</span>):
    <span class="c-bi">print</span>(f<span class="c-st">"posición {i} -&gt; {lecturas[i]}"</span>)</pre></div>
  </div>

  <div id="pfex-2" class="tab-panel">
<div class="code-block"><div class="code-lang">2_Enumerate_For.py</div><pre>
<span class="c-st">"""
2. ÍNDICE Y VALOR CON enumerate()
Objetivo: Obtener posición y valor al mismo tiempo, sin usar range(len(...)).

- Crea una lista 'componentes' con al menos 5 nombres de piezas.
- Recorre la lista con enumerate() e imprime "índice: nombre".
- Usa el parámetro 'start' de enumerate() para que la numeración empiece en 1.
- Usa enumerate() para encontrar en qué posición está un componente específico
  sin usar el método .index().
"""</span>

<span class="c-cm"># A. Lista de componentes a inspeccionar</span>
componentes = [<span class="c-st">"CPU"</span>, <span class="c-st">"RAM"</span>, <span class="c-st">"Disco"</span>, <span class="c-st">"Ventilador"</span>, <span class="c-st">"Fuente"</span>]

<span class="c-cm"># B. enumerate() devuelve pares (índice, valor) en cada vuelta</span>
<span class="c-bi">print</span>(<span class="c-st">"--- Inventario (índice desde 0) ---"</span>)
<span class="c-kw">for</span> indice, nombre <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(componentes):
    <span class="c-bi">print</span>(f<span class="c-st">"{indice}: {nombre}"</span>)

<span class="c-cm"># C. start=1 desplaza la numeración para reportes "amigables" al usuario</span>
<span class="c-bi">print</span>(<span class="c-st">"--- Inventario (numeración desde 1) ---"</span>)
<span class="c-kw">for</span> numero, nombre <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(componentes, start=<span class="c-nb">1</span>):
    <span class="c-bi">print</span>(f<span class="c-st">"Ítem #{numero}: {nombre}"</span>)

<span class="c-cm"># D. Buscar la posición de un componente sin usar .index()</span>
objetivo = <span class="c-st">"Ventilador"</span>
<span class="c-kw">for</span> indice, nombre <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(componentes):
    <span class="c-kw">if</span> nombre == objetivo:
        <span class="c-bi">print</span>(f<span class="c-st">"'{objetivo}' encontrado en la posición {indice}"</span>)
        <span class="c-kw">break</span></pre></div>
  </div>

  <div id="pfex-3" class="tab-panel">
<div class="code-block"><div class="code-lang">3_Zip_For.py</div><pre>
<span class="c-st">"""
3. RECORRIDO PARALELO CON zip()
Objetivo: Iterar dos o más listas relacionadas al mismo tiempo.

- Crea dos listas paralelas: 'sensores' (nombres) y 'temperaturas' (valores).
- Usa zip() para recorrer ambas listas a la vez e imprimir "sensor: temperatura".
- Agrega una tercera lista 'unidades' y recorre las tres listas juntas con zip().
- Usa zip() junto con dict() para construir un diccionario a partir de las
  dos primeras listas en una sola línea.
"""</span>

<span class="c-cm"># A. Listas paralelas: la posición 'i' de cada lista describe al mismo sensor</span>
sensores = [<span class="c-st">"SNS-01"</span>, <span class="c-st">"SNS-02"</span>, <span class="c-st">"SNS-03"</span>]
temperaturas = [<span class="c-nb">25.4</span>, <span class="c-nb">30.1</span>, <span class="c-nb">18.7</span>]
unidades = [<span class="c-st">"C"</span>, <span class="c-st">"C"</span>, <span class="c-st">"C"</span>]

<span class="c-cm"># B. zip() empareja los elementos de ambas listas posición a posición</span>
<span class="c-bi">print</span>(<span class="c-st">"--- Lecturas por sensor ---"</span>)
<span class="c-kw">for</span> nombre, temperatura <span class="c-kw">in</span> <span class="c-bi">zip</span>(sensores, temperaturas):
    <span class="c-bi">print</span>(f<span class="c-st">"{nombre}: {temperatura}"</span>)

<span class="c-cm"># C. zip() acepta más de dos listas a la vez</span>
<span class="c-bi">print</span>(<span class="c-st">"--- Lecturas con unidad ---"</span>)
<span class="c-kw">for</span> nombre, temperatura, unidad <span class="c-kw">in</span> <span class="c-bi">zip</span>(sensores, temperaturas, unidades):
    <span class="c-bi">print</span>(f<span class="c-st">"{nombre}: {temperatura}{unidad}"</span>)

<span class="c-cm"># D. zip() + dict(): construir un diccionario clave-valor en una sola línea</span>
mapa_temperaturas = <span class="c-bi">dict</span>(<span class="c-bi">zip</span>(sensores, temperaturas))
<span class="c-bi">print</span>(f<span class="c-st">"Diccionario generado: {mapa_temperaturas}"</span>)

<span class="c-cm"># NOTA: si las listas tienen distinta longitud, zip() se detiene en la más corta.</span></pre></div>
  </div>

  <div id="pfex-4" class="tab-panel">
<div class="code-block"><div class="code-lang">4_Anidado_For.py</div><pre>
<span class="c-st">"""
4. BUCLES ANIDADOS (FOR DENTRO DE FOR)
Objetivo: Recorrer estructuras de dos dimensiones, como una matriz de datos.

- Crea una matriz 'lecturas' (lista de listas) con 3 filas y 3 columnas.
- Usa un 'for' externo para recorrer cada fila y un 'for' interno para
  recorrer cada valor dentro de esa fila.
- Suma todos los valores de la matriz usando los dos bucles anidados.
- Encuentra la posición (fila, columna) del valor más alto de la matriz.
"""</span>

<span class="c-cm"># A. Matriz de temperaturas: 3 salas, 3 lecturas por sala</span>
lecturas = [
    [<span class="c-nb">21.5</span>, <span class="c-nb">22.0</span>, <span class="c-nb">20.8</span>],
    [<span class="c-nb">30.1</span>, <span class="c-nb">29.5</span>, <span class="c-nb">31.2</span>],
    [<span class="c-nb">18.0</span>, <span class="c-nb">17.5</span>, <span class="c-nb">19.1</span>],
]

<span class="c-cm"># B. Bucle externo recorre cada fila (cada sala); el interno recorre cada
# valor dentro de esa fila. Por cada vuelta del externo, el interno da
# la vuelta completa.</span>
<span class="c-bi">print</span>(<span class="c-st">"--- Recorrido completo de la matriz ---"</span>)
<span class="c-kw">for</span> fila_index, fila <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(lecturas):
    <span class="c-kw">for</span> columna_index, valor <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(fila):
        <span class="c-bi">print</span>(f<span class="c-st">"Sala {fila_index}, lectura {columna_index}: {valor}"</span>)

<span class="c-cm"># C. Suma total acumulando en cada vuelta del bucle interno</span>
suma_total = <span class="c-nb">0</span>
<span class="c-kw">for</span> fila <span class="c-kw">in</span> lecturas:
    <span class="c-kw">for</span> valor <span class="c-kw">in</span> fila:
        suma_total += valor
<span class="c-bi">print</span>(f<span class="c-st">"Suma total de todas las lecturas: {suma_total:.1f}"</span>)

<span class="c-cm"># D. Localizar el valor máximo junto con su posición exacta (fila, columna)</span>
maximo = lecturas[<span class="c-nb">0</span>][<span class="c-nb">0</span>]
posicion_maxima = (<span class="c-nb">0</span>, <span class="c-nb">0</span>)
<span class="c-kw">for</span> fila_index, fila <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(lecturas):
    <span class="c-kw">for</span> columna_index, valor <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(fila):
        <span class="c-kw">if</span> valor &gt; maximo:
            maximo = valor
            posicion_maxima = (fila_index, columna_index)

<span class="c-bi">print</span>(f<span class="c-st">"Valor máximo: {maximo} en la posición {posicion_maxima}"</span>)</pre></div>
  </div>

  <div id="pfex-5" class="tab-panel">
<div class="code-block"><div class="code-lang">5_BreakContinue_For.py</div><pre>
<span class="c-st">"""
5. CONTROL DE FLUJO: break Y continue
Objetivo: Alterar el recorrido normal de un bucle según una condición.

- Crea una lista 'trama' con varios códigos de estado, incluyendo un "ABORT".
- Recorre la lista y usa 'break' para detener el bucle apenas encuentres "ABORT".
- Crea una lista 'lecturas' con valores válidos y algunos None.
- Recorre 'lecturas' y usa 'continue' para saltarte los valores None sin
  detener el bucle, sumando solo los válidos.
"""</span>

<span class="c-cm"># A. 'break' corta el bucle POR COMPLETO en cuanto se cumple la condición</span>
trama = [<span class="c-st">"OK"</span>, <span class="c-st">"OK"</span>, <span class="c-st">"WARNING"</span>, <span class="c-st">"ABORT"</span>, <span class="c-st">"OK"</span>, <span class="c-st">"OK"</span>]

<span class="c-bi">print</span>(<span class="c-st">"--- Procesando trama hasta encontrar ABORT ---"</span>)
<span class="c-kw">for</span> codigo <span class="c-kw">in</span> trama:
    <span class="c-kw">if</span> codigo == <span class="c-st">"ABORT"</span>:
        <span class="c-bi">print</span>(<span class="c-st">"Señal de ABORT detectada. Deteniendo procesamiento."</span>)
        <span class="c-kw">break</span>
    <span class="c-bi">print</span>(f<span class="c-st">"Procesando código: {codigo}"</span>)

<span class="c-cm"># B. 'continue' salta SOLO la iteración actual y sigue con la siguiente</span>
lecturas = [<span class="c-nb">12.5</span>, <span class="c-kw">None</span>, <span class="c-nb">14.2</span>, <span class="c-kw">None</span>, <span class="c-nb">9.8</span>, <span class="c-nb">11.1</span>]

suma = <span class="c-nb">0</span>
validos = <span class="c-nb">0</span>
<span class="c-bi">print</span>(<span class="c-st">"--- Sumando solo lecturas válidas (ignorando None) ---"</span>)
<span class="c-kw">for</span> lectura <span class="c-kw">in</span> lecturas:
    <span class="c-kw">if</span> lectura <span class="c-kw">is None</span>:
        <span class="c-kw">continue</span>
    suma += lectura
    validos += <span class="c-nb">1</span>

<span class="c-bi">print</span>(f<span class="c-st">"Total de lecturas válidas: {validos}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Suma de lecturas válidas: {suma:.1f}"</span>)</pre></div>
  </div>

  <div id="pfex-6" class="tab-panel">
<div class="code-block"><div class="code-lang">6_ForElse_For.py</div><pre>
<span class="c-st">"""
6. LA CLÁUSULA for...else
Objetivo: Ejecutar código solo si el bucle terminó SIN usar 'break'.

- Crea una lista 'componentes' y busca uno que probablemente no exista.
- Usa un 'for' con 'break' para buscarlo; agrega un bloque 'else' que se
  ejecute únicamente si el bucle no encontró nada (no hubo break).
- Repite el ejercicio buscando un componente que SÍ existe, para comparar
  el comportamiento.
"""</span>

<span class="c-cm"># A. 'else' en un for se ejecuta SOLO si el bucle terminó normalmente,
# es decir, si NUNCA se ejecutó un 'break' dentro de él.</span>
componentes = [<span class="c-st">"CPU"</span>, <span class="c-st">"RAM"</span>, <span class="c-st">"Disco"</span>, <span class="c-st">"Ventilador"</span>]

objetivo = <span class="c-st">"GPU"</span>
<span class="c-bi">print</span>(f<span class="c-st">"--- Buscando '{objetivo}' ---"</span>)
<span class="c-kw">for</span> componente <span class="c-kw">in</span> componentes:
    <span class="c-kw">if</span> componente == objetivo:
        <span class="c-bi">print</span>(f<span class="c-st">"'{objetivo}' encontrado en el inventario."</span>)
        <span class="c-kw">break</span>
<span class="c-kw">else</span>:
    <span class="c-cm"># B. Como el bucle nunca hizo 'break', esto SÍ se ejecuta</span>
    <span class="c-bi">print</span>(f<span class="c-st">"'{objetivo}' NO está en el inventario. Se debe registrar como nuevo."</span>)

<span class="c-cm"># C. Ahora buscamos un componente que sí existe, para comparar</span>
objetivo = <span class="c-st">"RAM"</span>
<span class="c-bi">print</span>(f<span class="c-st">"--- Buscando '{objetivo}' ---"</span>)
<span class="c-kw">for</span> componente <span class="c-kw">in</span> componentes:
    <span class="c-kw">if</span> componente == objetivo:
        <span class="c-bi">print</span>(f<span class="c-st">"'{objetivo}' encontrado en el inventario."</span>)
        <span class="c-kw">break</span>
<span class="c-kw">else</span>:
    <span class="c-cm"># D. Aquí NO se ejecuta, porque el bucle sí hizo 'break'</span>
    <span class="c-bi">print</span>(f<span class="c-st">"'{objetivo}' NO está en el inventario."</span>)</pre></div>
  </div>

  <div id="pfex-7" class="tab-panel">
<div class="code-block"><div class="code-lang">7_Comprehension_For.py</div><pre>
<span class="c-st">"""
7. COMPREHENSIONS AVANZADAS (LIST, SET Y DICT)
Objetivo: Reemplazar bucles 'for' de varias líneas por una sola expresión.

- Convierte un bucle for tradicional que filtra y transforma una lista en
  una list comprehension equivalente.
- Crea una list comprehension con condición if/else dentro de la expresión.
- Crea una comprehension anidada para "aplanar" una matriz (lista de listas).
- Crea un set comprehension para obtener valores únicos.
"""</span>

lecturas = [<span class="c-nb">12.5</span>, -<span class="c-nb">3.2</span>, <span class="c-nb">14.8</span>, <span class="c-nb">0.0</span>, -<span class="c-nb">1.5</span>, <span class="c-nb">13.2</span>, -<span class="c-nb">0.1</span>, <span class="c-nb">15.6</span>]

<span class="c-cm"># A. Bucle for tradicional: filtrar valores positivos y duplicarlos</span>
resultado_bucle = []
<span class="c-kw">for</span> valor <span class="c-kw">in</span> lecturas:
    <span class="c-kw">if</span> valor &gt; <span class="c-nb">0</span>:
        resultado_bucle.append(valor * <span class="c-nb">2</span>)

<span class="c-cm"># B. La misma lógica en una sola línea con list comprehension
# Sintaxis: [expresion for elemento in iterable if condicion]</span>
resultado_comprehension = [valor * <span class="c-nb">2</span> <span class="c-kw">for</span> valor <span class="c-kw">in</span> lecturas <span class="c-kw">if</span> valor &gt; <span class="c-nb">0</span>]

<span class="c-bi">print</span>(f<span class="c-st">"Con bucle for: {resultado_bucle}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Con comprehension: {resultado_comprehension}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"¿Son iguales?: {resultado_bucle == resultado_comprehension}"</span>)

<span class="c-cm"># C. Comprehension con if/else DENTRO de la expresión (no como filtro)
# Aquí clasificamos cada valor sin descartar ninguno</span>
etiquetas = [<span class="c-st">"POSITIVO"</span> <span class="c-kw">if</span> valor &gt;= <span class="c-nb">0</span> <span class="c-kw">else</span> <span class="c-st">"NEGATIVO"</span> <span class="c-kw">for</span> valor <span class="c-kw">in</span> lecturas]
<span class="c-bi">print</span>(f<span class="c-st">"Clasificación: {etiquetas}"</span>)

<span class="c-cm"># D. Comprehension anidada para aplanar una matriz en una sola lista</span>
matriz = [[<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>], [<span class="c-nb">4</span>, <span class="c-nb">5</span>, <span class="c-nb">6</span>], [<span class="c-nb">7</span>, <span class="c-nb">8</span>, <span class="c-nb">9</span>]]
matriz_aplanada = [valor <span class="c-kw">for</span> fila <span class="c-kw">in</span> matriz <span class="c-kw">for</span> valor <span class="c-kw">in</span> fila]
<span class="c-bi">print</span>(f<span class="c-st">"Matriz aplanada: {matriz_aplanada}"</span>)

<span class="c-cm"># E. Set comprehension: igual que list comprehension pero con {} y sin duplicados</span>
codigos = [<span class="c-st">"OK"</span>, <span class="c-st">"FAIL"</span>, <span class="c-st">"OK"</span>, <span class="c-st">"WARNING"</span>, <span class="c-st">"FAIL"</span>, <span class="c-st">"OK"</span>]
codigos_unicos = {codigo <span class="c-kw">for</span> codigo <span class="c-kw">in</span> codigos}
<span class="c-bi">print</span>(f<span class="c-st">"Códigos únicos encontrados: {codigos_unicos}"</span>)</pre></div>
  </div>

  <div id="pfex-8" class="tab-panel">
<div class="code-block"><div class="code-lang">8_Acumuladores_For.py</div><pre>
<span class="c-st">"""
8. PATRÓN DE ACUMULADORES Y CONTADORES
Objetivo: Usar variables externas al bucle para acumular resultados.

- Crea una lista 'lecturas' con al menos 8 valores numéricos.
- Usa un acumulador para calcular la suma total dentro de un 'for'.
- Usa un contador para saber cuántos valores superan un umbral determinado.
- Calcula el promedio, el máximo y el mínimo manualmente con un solo bucle
  (sin usar sum(), max() ni min()).
"""</span>

lecturas = [<span class="c-nb">12.5</span>, <span class="c-nb">18.2</span>, <span class="c-nb">9.7</span>, <span class="c-nb">21.4</span>, <span class="c-nb">15.0</span>, <span class="c-nb">7.3</span>, <span class="c-nb">19.9</span>, <span class="c-nb">11.1</span>]
umbral = <span class="c-nb">15.0</span>

<span class="c-cm"># A. Acumulador de suma: se inicializa en 0 ANTES del bucle</span>
suma_total = <span class="c-nb">0</span>

<span class="c-cm"># B. Contador de valores que superan el umbral: también se inicializa antes</span>
total_sobre_umbral = <span class="c-nb">0</span>

<span class="c-cm"># C. Variables para llevar el máximo y el mínimo "vistos hasta ahora"</span>
maximo = lecturas[<span class="c-nb">0</span>]
minimo = lecturas[<span class="c-nb">0</span>]

<span class="c-kw">for</span> valor <span class="c-kw">in</span> lecturas:
    <span class="c-cm"># D. En cada vuelta, el acumulador SUMA el valor actual al total previo</span>
    suma_total += valor

    <span class="c-kw">if</span> valor &gt; umbral:
        total_sobre_umbral += <span class="c-nb">1</span>

    <span class="c-kw">if</span> valor &gt; maximo:
        maximo = valor
    <span class="c-kw">if</span> valor &lt; minimo:
        minimo = valor

promedio = suma_total / <span class="c-bi">len</span>(lecturas)

<span class="c-bi">print</span>(f<span class="c-st">"Suma total: {suma_total:.1f}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Promedio: {promedio:.2f}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Máximo: {maximo}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Mínimo: {minimo}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Lecturas por encima de {umbral}: {total_sobre_umbral}"</span>)</pre></div>
  </div>

  <div id="pfex-9" class="tab-panel">
<div class="code-block"><div class="code-lang">9_Diccionario_For.py</div><pre>
<span class="c-st">"""
9. RECORRIENDO DICCIONARIOS CON FOR
Objetivo: Dominar las tres formas de iterar un diccionario con 'for'.

- Crea un diccionario 'inventario' con al menos 4 componentes y su cantidad.
- Recorre solo las claves con 'for clave in inventario'.
- Recorre solo los valores con 'for valor in inventario.values()'.
- Recorre pares clave-valor con 'for clave, valor in inventario.items()'.
- Modifica los valores de un diccionario MIENTRAS lo recorres con .items()
  (sumando una unidad a cada cantidad).
"""</span>

inventario = {
    <span class="c-st">"CPU"</span>: <span class="c-nb">12</span>,
    <span class="c-st">"RAM"</span>: <span class="c-nb">34</span>,
    <span class="c-st">"Disco"</span>: <span class="c-nb">8</span>,
    <span class="c-st">"Ventilador"</span>: <span class="c-nb">20</span>,
}

<span class="c-cm"># A. Recorrer un diccionario directamente itera solo sobre sus CLAVES</span>
<span class="c-bi">print</span>(<span class="c-st">"--- Solo claves ---"</span>)
<span class="c-kw">for</span> clave <span class="c-kw">in</span> inventario:
    <span class="c-bi">print</span>(clave)

<span class="c-cm"># B. .values() itera solo sobre los valores, sin las claves</span>
<span class="c-bi">print</span>(<span class="c-st">"--- Solo valores ---"</span>)
<span class="c-kw">for</span> valor <span class="c-kw">in</span> inventario.values():
    <span class="c-bi">print</span>(valor)

<span class="c-cm"># C. .items() es la forma más común: entrega clave y valor juntos</span>
<span class="c-bi">print</span>(<span class="c-st">"--- Clave y valor ---"</span>)
<span class="c-kw">for</span> clave, valor <span class="c-kw">in</span> inventario.items():
    <span class="c-bi">print</span>(f<span class="c-st">"{clave}: {valor} unidades"</span>)

<span class="c-cm"># D. Para MODIFICAR valores mientras iteras, usa la clave para reescribir
# el diccionario original (nunca agregues/elimines claves durante el for).</span>
<span class="c-kw">for</span> clave, cantidad <span class="c-kw">in</span> inventario.items():
    inventario[clave] = cantidad + <span class="c-nb">1</span>

<span class="c-bi">print</span>(f<span class="c-st">"Inventario actualizado (+1 unidad cada uno): {inventario}"</span>)</pre></div>
  </div>

  <div id="pfex-10" class="tab-panel">
<div class="code-block"><div class="code-lang">10_WhileVsFor_For.py</div><pre>
<span class="c-st">"""
10. FOR vs WHILE: ¿CUÁNDO USAR CADA UNO?
Objetivo: Entender la diferencia práctica y reproducir un 'for' con 'while'.

- Usa un 'for' para recorrer una lista de intentos de conexión (caso ideal
  para 'for': se conoce de antemano cuántos elementos hay).
- Usa un 'while' para reintentar una conexión hasta que sea exitosa o se
  alcance un máximo de intentos (caso ideal para 'while': no se sabe de
  antemano cuántas vueltas tomará).
- Reproduce manualmente el comportamiento de range(0, 5) usando un 'while'
  con contador, para entender qué hace 'for' internamente.
"""</span>

<span class="c-cm"># A. 'for' es ideal cuando ya sabes CUÁNTOS elementos vas a recorrer</span>
intentos = [<span class="c-st">"FAIL"</span>, <span class="c-st">"FAIL"</span>, <span class="c-st">"OK"</span>, <span class="c-st">"OK"</span>, <span class="c-st">"FAIL"</span>]
<span class="c-bi">print</span>(<span class="c-st">"--- Revisión de todos los intentos (for) ---"</span>)
<span class="c-kw">for</span> intento <span class="c-kw">in</span> intentos:
    <span class="c-bi">print</span>(f<span class="c-st">"Resultado: {intento}"</span>)

<span class="c-cm"># B. 'while' es ideal cuando NO sabes cuántas vueltas tomará, solo la
# CONDICIÓN de parada (aquí: hasta conectar o agotar los intentos)</span>
<span class="c-kw">import</span> random

random.seed(<span class="c-nb">7</span>)
max_intentos = <span class="c-nb">5</span>
intento_actual = <span class="c-nb">0</span>
conectado = <span class="c-kw">False</span>

<span class="c-bi">print</span>(<span class="c-st">"--- Reintentando conexión (while) ---"</span>)
<span class="c-kw">while</span> intento_actual &lt; max_intentos <span class="c-kw">and not</span> conectado:
    intento_actual += <span class="c-nb">1</span>
    conectado = random.choice([<span class="c-kw">True</span>, <span class="c-kw">False</span>])
    <span class="c-bi">print</span>(f<span class="c-st">"Intento {intento_actual}: {'Conectado' if conectado else 'Fallido'}"</span>)

<span class="c-kw">if</span> conectado:
    <span class="c-bi">print</span>(f<span class="c-st">"Conexión exitosa en el intento {intento_actual}."</span>)
<span class="c-kw">else</span>:
    <span class="c-bi">print</span>(<span class="c-st">"Se agotaron los intentos sin conectar."</span>)

<span class="c-cm"># C. Reproducir range(0, 5) manualmente con while, para ver qué hace 'for'</span>
<span class="c-bi">print</span>(<span class="c-st">"--- range(0, 5) simulado con while ---"</span>)
i = <span class="c-nb">0</span>
<span class="c-kw">while</span> i &lt; <span class="c-nb">5</span>:
    <span class="c-bi">print</span>(i)
    i += <span class="c-nb">1</span></pre></div>
  </div>

</div>
  </div>
</div>`,

'py-listas': `
<div class="tab-group-pylst">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pyl-1','pylst')">Métodos esenciales</button>
    <button class="tab-btn" onclick="switchTab(this,'pyl-2','pylst')">Slicing avanzado</button>
    <button class="tab-btn" onclick="switchTab(this,'pyl-3','pylst')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'pyl-4','pylst')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'pyl-6','pylst')">🧩 Ejercicios (quiz)</button>
    <button class="tab-btn" onclick="switchTab(this,'pyl-7','pylst')">📁 Ejercicios_Listas (carpeta)</button>
  </div>
  <div id="pyl-1" class="tab-panel active">
${renderMethodTable('LST')}
  </div>
  <div id="pyl-2" class="tab-panel">
<div class="concept-intro">El <strong>slicing</strong> (<code>lst[start:stop:step]</code>) extrae sublistas sin lanzar <code>IndexError</code> aunque los índices se salgan de rango — a diferencia de indexar un solo elemento (<code>lst[i]</code>), que sí lanza error si i no existe. Dominar slicing es clave para procesar ventanas de datos (por ejemplo, los últimos N frames de CAN) sin loops manuales.</div>
<div class="code-block"><div class="code-lang">Python — Slicing y operaciones avanzadas</div><pre>
lst = [<span class="c-nb">0</span>,<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>,<span class="c-nb">4</span>,<span class="c-nb">5</span>]

<span class="c-cm"># Slicing: lst[start:stop:step] — stop EXCLUSIVO</span>
lst[<span class="c-nb">1</span>:<span class="c-nb">4</span>]    <span class="c-cm"># [1, 2, 3]</span>
lst[::<span class="c-nb">2</span>]   <span class="c-cm"># [0, 2, 4] — cada 2</span>
lst[::-<span class="c-nb">1</span>]  <span class="c-cm"># [5, 4, 3, 2, 1, 0] — invertir</span>
lst[-<span class="c-nb">3</span>:]   <span class="c-cm"># [3, 4, 5] — últimos 3</span>
lst[:<span class="c-nb">3</span>]    <span class="c-cm"># [0, 1, 2] — primeros 3</span>

<span class="c-cm"># Índices fuera de rango NO lanzan error en slicing (a diferencia de lst[i])</span>
lst[<span class="c-nb">100</span>:<span class="c-nb">200</span>]  <span class="c-cm"># [] — lista vacía, sin excepción</span>
<span class="c-cm"># lst[100]              # IndexError: list index out of range</span>

<span class="c-cm"># Copiar con slice (shallow)</span>
copia = lst[:]   <span class="c-cm"># equivale a lst.copy()</span>

<span class="c-cm"># Reemplazar rango con slice assignment</span>
lst[<span class="c-nb">1</span>:<span class="c-nb">3</span>] = [<span class="c-nb">10</span>, <span class="c-nb">20</span>, <span class="c-nb">30</span>]   <span class="c-cm"># puede cambiar el tamaño</span>

<span class="c-cm"># Eliminar un rango con slice assignment vacío</span>
lst[<span class="c-nb">1</span>:<span class="c-nb">3</span>] = []   <span class="c-cm"># equivale a "del lst[1:3]"</span>

<span class="c-cm"># sorted() vs sort() — sorted crea nueva lista, sort modifica in-place</span>
nueva = <span class="c-bi">sorted</span>(lst, key=<span class="c-kw">lambda</span> x: -x)  <span class="c-cm"># descendente, lst no cambia</span>
lst.sort(reverse=<span class="c-kw">True</span>)                  <span class="c-cm"># modifica lst</span>

<span class="c-cm"># Desempaquetar</span>
a, *middle, z = [<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>,<span class="c-nb">4</span>,<span class="c-nb">5</span>]  <span class="c-cm"># a=1, middle=[2,3,4], z=5</span>

<span class="c-cm"># Multiplicación (ojo con objetos mutables)</span>
zeros = [<span class="c-nb">0</span>] * <span class="c-nb">10</span>           <span class="c-cm"># [0,0,...,0]  ✓ para inmutables</span>
<span class="c-cm"># TRAMPA: [[0]*3]*3 crea 3 referencias a la MISMA lista interna</span>
matrix = [[<span class="c-nb">0</span>]*<span class="c-nb">3</span> <span class="c-kw">for</span> _ <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">3</span>)]  <span class="c-cm"># correcto: 3 listas independientes</span>

<span class="c-cm"># Ventana deslizante — últimos N elementos de un buffer de telemetría</span>
ultimos_10 = buffer[-<span class="c-nb">10</span>:]  <span class="c-cm"># si buffer tiene menos de 10, retorna todo</span></pre></div>
  </div>
  <div id="pyl-3" class="tab-panel">
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
original = [<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>]
copia = original          <span class="c-cm"># NO copia, es el mismo objeto</span>
copia.append(<span class="c-nb">4</span>)
<span class="c-bi">print</span>(original)      <span class="c-cm"># [1, 2, 3, 4] — ¡se modificó!</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
original = [<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>]
copia = original.copy()   <span class="c-cm"># o original[:] o list(original)</span>
copia.append(<span class="c-nb">4</span>)
<span class="c-bi">print</span>(original)      <span class="c-cm"># [1, 2, 3] — intacta</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> en Python, las variables son referencias a objetos, no los objetos en sí. <code>copia = original</code> solo crea un segundo nombre apuntando a la misma lista en memoria (puedes confirmarlo con <code>copia is original → True</code>). Para copias reales usa <code>.copy()</code>, <code>[:]</code> o <code>list(x)</code> — y recuerda que son <b>shallow copies</b>: si la lista contiene sublistas, esas sí se comparten (usa <code>copy.deepcopy()</code> si necesitas independencia total).</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
fila = [<span class="c-nb">0</span>] * <span class="c-nb">3</span>
matrix = [fila] * <span class="c-nb">3</span>     <span class="c-cm"># 3 referencias a la MISMA lista</span>
matrix[<span class="c-nb">0</span>][<span class="c-nb">0</span>] = <span class="c-nb">1</span>
<span class="c-bi">print</span>(matrix)         <span class="c-cm"># [[1,0,0],[1,0,0],[1,0,0]] ¡las 3 filas cambiaron!</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
matrix = [[<span class="c-nb">0</span>]*<span class="c-nb">3</span> <span class="c-kw">for</span> _ <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">3</span>)]  <span class="c-cm"># 3 listas independientes</span>
matrix[<span class="c-nb">0</span>][<span class="c-nb">0</span>] = <span class="c-nb">1</span>
<span class="c-bi">print</span>(matrix)         <span class="c-cm"># [[1,0,0],[0,0,0],[0,0,0]] correcto</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> el operador <code>*</code> sobre una lista no clona los elementos, solo repite las <b>referencias</b>. Con enteros (inmutables) esto es inofensivo porque no se puede mutar un int in-place. Pero con listas anidadas, las "3 filas" son en realidad la misma lista vista 3 veces. Clásico gotcha al inicializar matrices/buffers 2D para simulación o grillas de test.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
<span class="c-cm"># Concatenar en loop con "+" — crea una lista NUEVA en cada vuelta</span>
resultado = []
<span class="c-kw">for</span> chunk <span class="c-kw">in</span> chunks:
    resultado = resultado + chunk   <span class="c-cm"># O(n) cada vez → O(n²) total</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
resultado = []
<span class="c-kw">for</span> chunk <span class="c-kw">in</span> chunks:
    resultado.extend(chunk)   <span class="c-cm"># amortizado O(1) por elemento</span>
<span class="c-cm"># o, si ya tienes todos los chunks:</span>
resultado = [x <span class="c-kw">for</span> chunk <span class="c-kw">in</span> chunks <span class="c-kw">for</span> x <span class="c-kw">in</span> chunk]</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>resultado + chunk</code> crea una lista completamente nueva copiando todos los elementos existentes más los nuevos — O(n) por operación. Repetido n veces en un loop, el costo total es O(n²). <code>extend()</code> (o <code>append()</code> en loop, o comprehension) reutiliza la capacidad reservada de la lista y es O(1) amortizado por elemento.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
<span class="c-cm"># Buscar pertenencia con "in" en una lista grande, dentro de un loop</span>
ids_validos = [<span class="c-nb">1001</span>, <span class="c-nb">1002</span>, <span class="c-nb">... 50000 ids ...</span>]
<span class="c-kw">for</span> frame <span class="c-kw">in</span> can_frames:      <span class="c-cm"># miles de frames</span>
    <span class="c-kw">if</span> frame.id <span class="c-kw">in</span> ids_validos:  <span class="c-cm"># O(n) cada chequeo → O(n*m) total</span>
        process(frame)</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
ids_validos = <span class="c-bi">set</span>([<span class="c-nb">1001</span>, <span class="c-nb">1002</span>, <span class="c-nb">... 50000 ids ...</span>])  <span class="c-cm"># O(1) por chequeo</span>
<span class="c-kw">for</span> frame <span class="c-kw">in</span> can_frames:
    <span class="c-kw">if</span> frame.id <span class="c-kw">in</span> ids_validos:
        process(frame)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>in</code> sobre una lista hace búsqueda lineal — recorre elemento por elemento. Si esa comprobación está dentro de un loop que se repite m veces, sobre una lista de n elementos, el costo total es O(n*m). Un <code>set</code> (hash table) resuelve <code>in</code> en O(1) promedio. Regla práctica: si vas a chequear pertenencia repetidamente, convierte la colección a <code>set</code> primero.</div>
  </div>
  <div id="pyl-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Copia explícitamente cuando no quieras compartir referencia</div>
  <p>Usa <code>.copy()</code>, <code>list(x)</code> o <code>x[:]</code> para shallow copy, y <code>copy.deepcopy(x)</code> cuando la lista contiene objetos mutables anidados que también deben ser independientes.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa collections.deque para pops/inserts frecuentes al inicio</div>
  <p>Las listas son O(n) para <code>pop(0)</code> o <code>insert(0, x)</code> porque deben desplazar todos los elementos. Si necesitas una cola FIFO (por ejemplo, un buffer circular de los últimos N mensajes CAN), <code>collections.deque</code> ofrece O(1) en ambos extremos.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Convierte a set cuando la pertenencia (in) se chequea repetidamente</div>
  <p>Si vas a preguntar <code>x in coleccion</code> muchas veces, y el orden/los duplicados no importan, un <code>set</code> baja la complejidad de O(n) a O(1) promedio por consulta.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Prefiere comprehension o extend() sobre concatenar con + en loop</div>
  <p>Evita el patrón <code>resultado = resultado + x</code> dentro de un for; usa <code>resultado.extend(x)</code>, <code>resultado.append(x)</code>, o construye todo de una vez con una comprehension.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa sort(key=...) con una función nombrada cuando la lógica no sea trivial</div>
  <p><code>lst.sort(key=lambda r: (r.severity, -r.timestamp))</code> está bien si es simple; si la clave de orden tiene lógica de negocio, extráela a una función con nombre (<code>key=severity_then_recency</code>) para que sea testeable y reutilizable.</p>
</div>
<div class="practice-card">
  <div class="practice-title">No mutes una lista que estás iterando; construye una nueva</div>
  <p>En vez de <code>remove()</code>/<code>del</code> dentro de un <code>for</code>, usa una list comprehension que filtre lo que quieres conservar. Es más seguro, más corto y evita el bug de "saltar elementos".</p>
</div>
  </div>
  <div id="pyl-6" class="tab-panel">
<div class="concept-intro">Esta sección es para <strong>practicar activamente</strong>, no solo leer. Cada ejercicio plantea un problema real: intenta resolverlo por tu cuenta (en tu editor, en un intérprete, o incluso en papel) <strong>antes</strong> de hacer click. Al revelar la respuesta verás primero la <b>salida esperada</b>, para que puedas comprobar si tu propio intento fue correcto, y después el <b>procedimiento paso a paso</b> con la solución completa explicada.</div>

<div class="exercise-steps-label">🟢 Básico</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-basico">BÁSICO</span>
    <span>Escribe una función que reciba una lista de números y retorne solo los pares, sin usar un ciclo <code>for</code> explícito (usa comprehension).</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>pares([1, 2, 3, 4, 5, 6]) &rarr; [2, 4, 6]</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>"Sin loop explícito" apunta a usar una <b>list comprehension</b>: sigue iterando internamente, pero no escribes un bloque <code>for</code> tradicional con <code>append()</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Dentro de la comprehension, filtra con la condición <code>x % 2 == 0</code> para quedarte solo con los pares.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>La comprehension retorna directamente la lista nueva; no hace falta variable acumuladora ni <code>append()</code>.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">pares</span>(lista):
    <span class="c-kw">return</span> [x <span class="c-kw">for</span> x <span class="c-kw">in</span> lista <span class="c-kw">if</span> x % <span class="c-nb">2</span> == <span class="c-nb">0</span>]

<span class="c-bi">print</span>(pares([<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>, <span class="c-nb">4</span>, <span class="c-nb">5</span>, <span class="c-nb">6</span>]))  <span class="c-cm"># [2, 4, 6]</span></pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-basico">BÁSICO</span>
    <span>Escribe una función que reciba una lista de lecturas de temperatura (floats) de un sensor y retorne el promedio redondeado a 2 decimales. Si la lista está vacía, debe retornar <code>None</code> en vez de lanzar una excepción.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>promedio_temp([36.5, 37.125, 36.8, 37.0]) &rarr; 36.86</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Maneja primero el caso borde: si <code>lecturas</code> está vacía, retorna <code>None</code> de inmediato — así evitas un <code>ZeroDivisionError</code> al dividir entre <code>len(lecturas)</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Calcula la suma con <code>sum(lecturas)</code> y divide entre <code>len(lecturas)</code> para obtener el promedio.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Redondea el resultado a 2 decimales con <code>round(valor, 2)</code> antes de retornarlo.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">promedio_temp</span>(lecturas):
    <span class="c-kw">if</span> <span class="c-kw">not</span> lecturas:
        <span class="c-kw">return</span> <span class="c-kw">None</span>
    <span class="c-kw">return</span> <span class="c-bi">round</span>(<span class="c-bi">sum</span>(lecturas) / <span class="c-bi">len</span>(lecturas), <span class="c-nb">2</span>)

<span class="c-bi">print</span>(promedio_temp([<span class="c-nb">36.5</span>, <span class="c-nb">37.125</span>, <span class="c-nb">36.8</span>, <span class="c-nb">37.0</span>]))  <span class="c-cm"># 36.86</span></pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-basico">BÁSICO</span>
    <span>Escribe una función que reciba una lista de códigos DTC (con posibles duplicados, en el orden en que se detectaron) y retorne una lista sin duplicados, preservando el orden de primera aparición.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>dedup(['P0300','P0171','P0300','P0420','P0171']) &rarr; ['P0300', 'P0171', 'P0420']</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Un <code>set()</code> elimina duplicados, pero no preserva el orden original — necesitas otra estructura que sí lo haga.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p><code>dict.fromkeys(lista)</code> preserva el orden de inserción (garantizado desde Python 3.7) y descarta duplicados automáticamente, porque las keys de un dict son únicas.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Convierte el resultado de vuelta a lista con <code>list(...)</code> para retornar el tipo esperado.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">dedup</span>(codigos):
    <span class="c-kw">return</span> <span class="c-bi">list</span>(<span class="c-bi">dict</span>.fromkeys(codigos))

<span class="c-bi">print</span>(dedup([<span class="c-st">'P0300'</span>, <span class="c-st">'P0171'</span>, <span class="c-st">'P0300'</span>, <span class="c-st">'P0420'</span>, <span class="c-st">'P0171'</span>]))
<span class="c-cm"># ['P0300', 'P0171', 'P0420']</span></pre></div>
  </div>
</div>

<div class="exercise-steps-label">🟡 Intermedio</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-intermedio">INTERMEDIO</span>
    <span>Escribe una función que reciba una lista de lecturas numéricas y un tamaño de ventana <code>n</code>, y retorne una lista con el promedio móvil (la media de cada ventana de <code>n</code> elementos consecutivos).</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>media_movil([10, 20, 30, 40, 50], 3) &rarr; [20.0, 30.0, 40.0]</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>El resultado tendrá <code>len(lecturas) - n + 1</code> elementos: una ventana por cada posición de inicio válida dentro de la lista.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Para cada índice <code>i</code> válido, toma el slice <code>lecturas[i:i+n]</code> (exactamente <code>n</code> elementos) y calcula su promedio con <code>sum(...)/n</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Recorre todos los índices de inicio con <code>range(len(lecturas) - n + 1)</code> dentro de una list comprehension, redondeando cada promedio a 2 decimales.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">media_movil</span>(lecturas, n):
    <span class="c-kw">return</span> [<span class="c-bi">round</span>(<span class="c-bi">sum</span>(lecturas[i:i+n]) / n, <span class="c-nb">2</span>)
            <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-bi">len</span>(lecturas) - n + <span class="c-nb">1</span>)]

<span class="c-bi">print</span>(media_movil([<span class="c-nb">10</span>, <span class="c-nb">20</span>, <span class="c-nb">30</span>, <span class="c-nb">40</span>, <span class="c-nb">50</span>], <span class="c-nb">3</span>))
<span class="c-cm"># [20.0, 30.0, 40.0]</span></pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-intermedio">INTERMEDIO</span>
    <span>Tienes una lista de resultados de test, cada uno un dict con <code>'bench'</code>, <code>'severity'</code> (int, mayor = más grave) y <code>'timestamp'</code>. Escribe una función que los ordene por <code>severity</code> descendente y, en caso de empate, por <code>timestamp</code> ascendente (el más antiguo primero).</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>[r['bench'] for r in ordenados] &rarr; ['c2', 'b1', 'a3', 'd4']</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p><code>sort()</code>/<code>sorted()</code> aceptan una <b>tupla</b> como <code>key</code> para ordenar por varios campos a la vez: primero compara el primer elemento de la tupla, y solo si hay empate pasa al segundo.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Para lograr "severity descendente" y "timestamp ascendente" en un solo <code>sort</code> (que por defecto siempre ordena ascendente), niega el campo numérico que quieres invertir: <code>key=lambda r: (-r['severity'], r['timestamp'])</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Usa <code>sorted(resultados, key=...)</code> para no mutar la lista original, y verifica extrayendo el campo <code>'bench'</code> de cada dict en el orden resultante.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">ordenar_resultados</span>(resultados):
    <span class="c-kw">return</span> <span class="c-bi">sorted</span>(resultados, key=<span class="c-kw">lambda</span> r: (-r[<span class="c-st">'severity'</span>], r[<span class="c-st">'timestamp'</span>]))

resultados = [
    {<span class="c-st">'bench'</span>: <span class="c-st">'a3'</span>, <span class="c-st">'severity'</span>: <span class="c-nb">2</span>, <span class="c-st">'timestamp'</span>: <span class="c-nb">300</span>},
    {<span class="c-st">'bench'</span>: <span class="c-st">'b1'</span>, <span class="c-st">'severity'</span>: <span class="c-nb">3</span>, <span class="c-st">'timestamp'</span>: <span class="c-nb">100</span>},
    {<span class="c-st">'bench'</span>: <span class="c-st">'c2'</span>, <span class="c-st">'severity'</span>: <span class="c-nb">3</span>, <span class="c-st">'timestamp'</span>: <span class="c-nb">50</span>},
    {<span class="c-st">'bench'</span>: <span class="c-st">'d4'</span>, <span class="c-st">'severity'</span>: <span class="c-nb">1</span>, <span class="c-st">'timestamp'</span>: <span class="c-nb">10</span>},
]
ordenados = ordenar_resultados(resultados)
<span class="c-bi">print</span>([r[<span class="c-st">'bench'</span>] <span class="c-kw">for</span> r <span class="c-kw">in</span> ordenados])
<span class="c-cm"># ['c2', 'b1', 'a3', 'd4']</span></pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-intermedio">INTERMEDIO</span>
    <span>Escribe una función que reciba una lista de listas (por ejemplo, frames CAN capturados por cada bench en una corrida) y la aplane un nivel, retornando una sola lista con todos los elementos, sin usar <code>itertools</code>.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>aplanar([[1, 2], [3], [4, 5, 6]]) &rarr; [1, 2, 3, 4, 5, 6]</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Una comprehension anidada puede recorrer primero la lista externa (cada sublista) y luego cada elemento dentro de esa sublista, en el mismo orden en que escribirías los <code>for</code> anidados como loops normales.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>La sintaxis queda <code>[elem for sublista in listas for elem in sublista]</code> — el primer <code>for</code> es el más "externo", igual que si estuviera arriba en loops anidados.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>El resultado es una sola lista plana con todos los elementos, respetando el orden de las sublistas originales.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">aplanar</span>(listas):
    <span class="c-kw">return</span> [elem <span class="c-kw">for</span> sublista <span class="c-kw">in</span> listas <span class="c-kw">for</span> elem <span class="c-kw">in</span> sublista]

<span class="c-bi">print</span>(aplanar([[<span class="c-nb">1</span>, <span class="c-nb">2</span>], [<span class="c-nb">3</span>], [<span class="c-nb">4</span>, <span class="c-nb">5</span>, <span class="c-nb">6</span>]]))
<span class="c-cm"># [1, 2, 3, 4, 5, 6]</span></pre></div>
  </div>
</div>

<div class="exercise-steps-label">🔴 Complejo</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-complejo">COMPLEJO</span>
    <span>Escribe una función que reciba una lista y un tamaño <code>n</code>, y la divida en sublistas ("chunks") de tamaño <code>n</code>. El último chunk puede tener menos de <code>n</code> elementos si la lista no es múltiplo exacto. Útil para enviar frames CAN en lotes de tamaño fijo.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>chunk([1, 2, 3, 4, 5, 6, 7], 3) &rarr; [[1, 2, 3], [4, 5, 6], [7]]</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Necesitas recorrer la lista en saltos de tamaño <code>n</code>: <code>range(0, len(lista), n)</code> genera exactamente esos puntos de inicio (0, n, 2n, ...).</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Para cada punto de inicio <code>i</code>, toma el slice <code>lista[i:i+n]</code>. El slicing nunca lanza error aunque <code>i+n</code> se pase del final de la lista: simplemente retorna lo que queda disponible.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Acumula cada slice como un elemento de la lista resultado usando una comprehension: <code>[lista[i:i+n] for i in range(0, len(lista), n)]</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 4</div><div class="plan-content"><p>Verifica el caso borde: si <code>len(lista)</code> no es múltiplo exacto de <code>n</code>, el último chunk queda naturalmente más corto, sin necesitar código adicional para ese caso.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">chunk</span>(lista, n):
    <span class="c-kw">return</span> [lista[i:i+n] <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">0</span>, <span class="c-bi">len</span>(lista), n)]

<span class="c-bi">print</span>(chunk([<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>, <span class="c-nb">4</span>, <span class="c-nb">5</span>, <span class="c-nb">6</span>, <span class="c-nb">7</span>], <span class="c-nb">3</span>))
<span class="c-cm"># [[1, 2, 3], [4, 5, 6], [7]]</span></pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-complejo">COMPLEJO</span>
    <span>Tienes dos listas de timestamps YA ordenadas ascendentemente (por ejemplo, capturadas por dos benches distintos). Escribe una función que las combine en una sola lista ordenada, en O(n+m), SIN usar <code>sorted()</code>, <code>sort()</code> ni el operador <code>+</code> para unirlas de golpe.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>merge_ordenadas([1, 4, 7, 10], [2, 3, 8]) &rarr; [1, 2, 3, 4, 7, 8, 10]</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Usa dos punteros, <code>i</code> y <code>j</code>, que arrancan en 0 sobre cada lista de entrada — esta es la técnica clásica de dos punteros sobre secuencias ya ordenadas.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>En cada paso, compara <code>a[i]</code> con <code>b[j]</code> y agrega a la lista resultado el menor de los dos, avanzando <b>solo</b> el puntero de la lista de la que tomaste el elemento.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Repite ese paso mientras ambos punteros sigan dentro de rango — es exactamente la fase de "merge" que usa mergesort internamente.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 4</div><div class="plan-content"><p>Cuando una de las dos listas se agota, la otra ya está garantizada ordenada: agrega el resto directamente con <code>extend()</code> (no viola la restricción, ya que no es una concatenación de dos listas completas sin procesar).</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 5</div><div class="plan-content"><p>El costo total es O(n+m): cada elemento de ambas listas se visita y se copia exactamente una vez, sin comparar contra todos los demás como haría un sort genérico (que sería O((n+m) log(n+m))).</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">merge_ordenadas</span>(a, b):
    resultado = []
    i = j = <span class="c-nb">0</span>
    <span class="c-kw">while</span> i &lt; <span class="c-bi">len</span>(a) <span class="c-kw">and</span> j &lt; <span class="c-bi">len</span>(b):
        <span class="c-kw">if</span> a[i] &lt;= b[j]:
            resultado.append(a[i])
            i += <span class="c-nb">1</span>
        <span class="c-kw">else</span>:
            resultado.append(b[j])
            j += <span class="c-nb">1</span>
    resultado.extend(a[i:])   <span class="c-cm"># agrega lo que quedó de "a" (si algo quedó)</span>
    resultado.extend(b[j:])   <span class="c-cm"># agrega lo que quedó de "b" (si algo quedó)</span>
    <span class="c-kw">return</span> resultado

<span class="c-bi">print</span>(merge_ordenadas([<span class="c-nb">1</span>, <span class="c-nb">4</span>, <span class="c-nb">7</span>, <span class="c-nb">10</span>], [<span class="c-nb">2</span>, <span class="c-nb">3</span>, <span class="c-nb">8</span>]))
<span class="c-cm"># [1, 2, 3, 4, 7, 8, 10]</span></pre></div>
  </div>
</div>
  </div>
  <div id="pyl-7" class="tab-panel">
<div class="concept-intro">Los <b>18 ejercicios completos</b> de la carpeta <code>Ejercicios_Python/Ejercicios_Listas</code> del repositorio, con su enunciado y solución tal como están guardados — para tenerlos siempre a mano sin salir de la app.</div>
<div class="tab-group-plex">
  <div class="tab-bar" style="flex-wrap:wrap">
    <button class="tab-btn active" onclick="switchTab(this,'plex-1','plex')">1. Creación</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-2','plex')">2. Modificación</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-3','plex')">3. Slicing</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-4','plex')">4. Funciones</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-5','plex')">5. Ordenamiento</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-6','plex')">6. Bucles</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-7','plex')">7. Unión</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-8','plex')">8. Localizador de Fallos</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-9','plex')">9. Matriz</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-10','plex')">10. Copy</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-11','plex')">11. Comprehension</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-12','plex')">12. Reversión</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-13','plex')">13. Sincronización</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-14','plex')">14. Extraer (CAN unpacking)</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-15','plex')">15. DeepCopy</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-16','plex')">16. Limpiar Duplicados</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-17','plex')">17. Formateo Reporte</button>
    <button class="tab-btn" onclick="switchTab(this,'plex-18','plex')">18. BigO</button>
  </div>

  <div id="plex-1" class="tab-panel active">
<div class="code-block"><div class="code-lang">1_Creacion_Listas.py</div><pre>
<span class="c-st">"""
1. EL CATÁLOGO DE SENSORES
Objetivo: Aprender a crear listas y acceder a elementos específicos.

- Crea una lista llamada 'sensores' con 5 nombres (ej. "Temp", "Presion", "Humedad", "Luz", "Oxigeno").
- Imprime el primer elemento y el último usando índices positivos y negativos.
- Accede al elemento central de la lista (índice 2) e imprímelo.
"""</span>

sensores = [<span class="c-st">"Temp"</span>, <span class="c-st">"Presion"</span>, <span class="c-st">"Humedad"</span>, <span class="c-st">"Luz"</span>,<span class="c-st">"Oxigeno"</span>]

<span class="c-bi">print</span>(sensores[<span class="c-nb">0</span>])
<span class="c-bi">print</span>(sensores[-<span class="c-nb">1</span>])
<span class="c-bi">print</span>(sensores[<span class="c-nb">2</span>])</pre></div>
  </div>

  <div id="plex-2" class="tab-panel">
<div class="code-block"><div class="code-lang">2_Modificacion_Listas.py</div><pre>
<span class="c-st">"""
2. GESTIÓN DE INVENTARIO DE HARDWARE
Objetivo: Practicar la inserción y eliminación dinámica de datos.

- Crea una lista vacía llamada 'equipo_test'.
- Agrega 3 herramientas usando el método .append().
- Inserta un nuevo elemento en la segunda posición (índice 1) usando .insert().
- Elimina el último elemento con .pop() y uno específico por nombre con .remove().
"""</span>

equipo_test = []

equipo_test.append(<span class="c-st">"Multimetro"</span>)
equipo_test.append(<span class="c-st">"Osciloscopio"</span>)
equipo_test.append(<span class="c-st">"Fuente"</span>)
<span class="c-bi">print</span>(equipo_test)

equipo_test.insert(<span class="c-nb">0</span>, <span class="c-st">"Cautin"</span>)
<span class="c-bi">print</span>(equipo_test)

herramienta_fuera = equipo_test.pop()
<span class="c-bi">print</span>(f<span class="c-st">"# Nota: Se eliminó '{herramienta_fuera}' porque era el último en la lista."</span>)
<span class="c-bi">print</span>(equipo_test)</pre></div>
  </div>

  <div id="plex-3" class="tab-panel">
<div class="code-block"><div class="code-lang">3_Slicing_Listas.py</div><pre>
<span class="c-st">"""

3. EL CORTADOR DE SEÑALES
Objetivo: Extraer subconjuntos de datos de una lista de telemetría.

- Crea una lista de lecturas de voltaje del 1 al 10.
- Extrae e imprime los primeros 3 valores.
- Extrae e imprime los últimos 3 valores.
- Crea una sub-lista que contenga solo los valores de los índices 2 al 6.
- Imprime la lista saltando de 2 en 2 (paso del slicing).

"""</span>

voltajes = [<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>, <span class="c-nb">4</span>, <span class="c-nb">5</span>, <span class="c-nb">6</span>, <span class="c-nb">7</span>, <span class="c-nb">8</span>, <span class="c-nb">9</span>, <span class="c-nb">10</span>]

primeros_tres = voltajes[<span class="c-nb">0</span>:<span class="c-nb">3</span>]
<span class="c-bi">print</span>(f<span class="c-st">"Primeros 3 voltajes: {primeros_tres}"</span>) <span class="c-cm"># Salida: [1, 2, 3]</span>

ultimos_tres = voltajes[-<span class="c-nb">3</span>:]
<span class="c-bi">print</span>(f<span class="c-st">"Últimos 3 voltajes: {ultimos_tres}"</span>)   <span class="c-cm"># Salida: [8, 9, 10]</span>

rango_medio = voltajes[<span class="c-nb">2</span>:<span class="c-nb">7</span>]
<span class="c-bi">print</span>(f<span class="c-st">"Rango del índice 2 al 6: {rango_medio}"</span>) <span class="c-cm"># Salida: [3, 4, 5, 6, 7]</span>

posiciones_pares = voltajes[::<span class="c-nb">2</span>]
<span class="c-bi">print</span>(f<span class="c-st">"Lecturas con paso de 2: {posiciones_pares}"</span>) <span class="c-cm"># Salida: [1, 3, 5, 7, 9]</span></pre></div>
  </div>

  <div id="plex-4" class="tab-panel">
<div class="code-block"><div class="code-lang">4_Funciones_Listas.py</div><pre>
<span class="c-st">"""
4. ANÁLISIS DE TELEMETRÍA
Objetivo: Usar matemáticas básicas sobre listas de datos.

- Crea una lista con 10 temperaturas desordenadas (ej. [22.5, 18.0, 30.2, ...]).
- Encuentra e imprime el valor máximo (max) y el mínimo (min).
- Calcula la suma total de las lecturas y el promedio:
  Promedio = \\frac{\\sum \\text{Valores}}{\\text{Total de elementos}}
- Verifica si el valor 25.0 existe en la lista usando el operador 'in'.
"""</span>

<span class="c-cm"># A. Crea una lista con 10 temperaturas desordenadas</span>
temperaturas = [<span class="c-nb">22.5</span>, <span class="c-nb">18.0</span>, <span class="c-nb">30.2</span>, <span class="c-nb">25.0</span>, <span class="c-nb">27.4</span>, <span class="c-nb">19.8</span>, <span class="c-nb">21.0</span>, <span class="c-nb">28.5</span>, <span class="c-nb">24.1</span>, <span class="c-nb">26.3</span>]

<span class="c-cm"># B. Encuentra e imprime el valor máximo y el mínimo</span>
t_max = <span class="c-bi">max</span>(temperaturas)
t_min = <span class="c-bi">min</span>(temperaturas)
<span class="c-bi">print</span>(f<span class="c-st">"Temperatura Máxima: {t_max}°C"</span>) <span class="c-cm"># Salida: 30.2</span>
<span class="c-bi">print</span>(f<span class="c-st">"Temperatura Mínima: {t_min}°C"</span>) <span class="c-cm"># Salida: 18.0</span>

<span class="c-cm"># C. Calcula la suma total y el promedio
# La fórmula matemática aplicada es:
# $$Promedio = \\frac{\\sum \\text{Temperaturas}}{\\text{Total de elementos}}$$</span>
suma_total = <span class="c-bi">sum</span>(temperaturas)
conteo = <span class="c-bi">len</span>(temperaturas)
promedio = suma_total / conteo

<span class="c-bi">print</span>(f<span class="c-st">"Suma total de lecturas: {suma_total}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Promedio del sensor: {promedio:.2f}°C"</span>)

<span class="c-cm"># D. Verifica si el valor 25.0 existe en la lista usando 'in'
# El operador 'in' es fundamental para los "Asserts" en testing.</span>
<span class="c-kw">if</span> <span class="c-nb">25.0</span> <span class="c-kw">in</span> temperaturas:
    <span class="c-bi">print</span>(<span class="c-st">"✅ El valor 25.0 fue detectado en la telemetría."</span>)
<span class="c-kw">else</span>:
    <span class="c-bi">print</span>(<span class="c-st">"❌ El valor 25.0 no se encuentra en los registros."</span>)</pre></div>
  </div>

  <div id="plex-5" class="tab-panel">
<div class="code-block"><div class="code-lang">5_Ordenamiento_Listas.py</div><pre>
<span class="c-st">"""
5. REORDENAMIENTO DE LOGS
Objetivo: Manipular el orden de los errores encontrados en un test.

- Crea una lista de IDs de error desordenados (ej. ["ERR-05", "ERR-01", "ERR-03"]).
- Ordena la lista alfabéticamente de forma permanente usando .sort().
- Invierte el orden de la lista usando .reverse().
- Compara el resultado usando la función sorted() en lugar de .sort().
"""</span>

<span class="c-cm"># A. Crea una lista de IDs de error desordenados</span>
errores = [<span class="c-st">"ERR-05"</span>, <span class="c-st">"ERR-01"</span>, <span class="c-st">"ERR-08"</span>, <span class="c-st">"ERR-03"</span>, <span class="c-st">"ERR-02"</span>]
string = <span class="c-st">"83034959"</span>
<span class="c-cm"># B. Ordena la lista alfabéticamente de forma permanente usando .sort()
# Por defecto, .sort() ordena de menor a mayor (A-Z o 0-9).</span>
errores.sort()
<span class="c-bi">print</span>(f<span class="c-st">"Errores ordenados (Permanente): {errores}"</span>)
<span class="c-cm"># Salida: ['ERR-01', 'ERR-02', 'ERR-03', 'ERR-05', 'ERR-08']</span>


<span class="c-cm"># C. Invierte el orden de la lista usando .reverse()
# Ahora el error más alto quedará al principio.</span>
errores.reverse()
<span class="c-bi">print</span>(f<span class="c-st">"Errores en orden descendente: {errores}"</span>)
<span class="c-cm"># Salida: ['ERR-08', 'ERR-05', 'ERR-03', 'ERR-02', 'ERR-01']</span>


<span class="c-cm"># D. Ejemplo con sorted() para no perder el orden original
# Supongamos que tenemos una lista nueva de prioridad</span>
prioridad = [<span class="c-st">"Alta"</span>, <span class="c-st">"Baja"</span>, <span class="c-st">"Media"</span>]

<span class="c-cm"># sorted() nos devuelve una lista nueva que guardamos en otra variable</span>
prioridad_ordenada = <span class="c-bi">sorted</span>(prioridad)

<span class="c-bi">print</span>(f<span class="c-st">"Original: {prioridad}"</span>)          <span class="c-cm"># Sigue siendo ["Alta", "Baja", "Media"]</span>
<span class="c-bi">print</span>(f<span class="c-st">"Ordenada: {prioridad_ordenada}"</span>) <span class="c-cm"># Es ["Alta", "Baja", "Media"] -&gt; ["Alta", "Baja", "Media"] (alfabético)</span></pre></div>
  </div>

  <div id="plex-6" class="tab-panel">
<div class="code-block"><div class="code-lang">6_Bucles_Listas.py</div><pre>
<span class="c-st">"""
6. EL FILTRO DE ALERTAS CRÍTICAS
Objetivo: Automatizar el filtrado de datos negativos o erróneos.

- Crea una lista llamada 'lecturas' con valores positivos y negativos.
- Crea una lista vacía llamada 'alertas'.
- Recorre 'lecturas' con un bucle 'for'; si el valor es menor a 0, agrégalo a 'alertas'.
- Al final, imprime el conteo total de alertas encontradas.
"""</span>

<span class="c-cm"># A. Lista de telemetría con valores mixtos (Voltajes o Temperaturas)</span>
lecturas = [<span class="c-nb">12.5</span>, -<span class="c-nb">3.2</span>, <span class="c-nb">14.8</span>, <span class="c-nb">0.0</span>, -<span class="c-nb">1.5</span>, <span class="c-nb">13.2</span>, -<span class="c-nb">0.1</span>, <span class="c-nb">15.6</span>]

<span class="c-cm"># B. Lista vacía para recolectar solo los errores (valores negativos)</span>
alertas = []

<span class="c-cm"># C. Recorremos la lista 'lecturas'
# 'dato' es una variable temporal que toma el valor de cada elemento en cada vuelta.</span>
<span class="c-kw">for</span> dato <span class="c-kw">in</span> lecturas:
    <span class="c-cm"># D. Lógica de filtrado: Si el valor es menor a 0, es una anomalía</span>
    <span class="c-kw">if</span> dato &lt; <span class="c-nb">0</span>:
        alertas.append(dato)
        <span class="c-bi">print</span>(f<span class="c-st">"⚠️ Alerta detectada: Valor anómalo de {dato}"</span>)


<span class="c-cm"># E. Resultado final usando len() para el conteo</span>
total_alertas = <span class="c-bi">len</span>(alertas)

<span class="c-bi">print</span>(<span class="c-st">"--- Resumen del Análisis ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Total de lecturas procesadas: {len(lecturas)}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Total de fallos encontrados: {total_alertas}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Lista de fallos: {alertas}"</span>)</pre></div>
  </div>

  <div id="plex-7" class="tab-panel">
<div class="code-block"><div class="code-lang">7_Union_Listas.py</div><pre>
<span class="c-st">"""
7. FUSIÓN DE REPORTES
Objetivo: Aprender a combinar datos de diferentes fuentes.

- Crea dos listas: 'lote_A' (con 3 voltajes) y 'lote_B' (con otros 3).
- Crea una tercera lista 'reporte_total' usando el operador '+'.
- Usa el método .extend() para agregar una lista de 'errores' a 'reporte_total'.
- Imprime la longitud final del reporte.
"""</span>

<span class="c-cm"># A. Crea dos listas: 'lote_A' y 'lote_B' con 3 voltajes cada una</span>
lote_A = [<span class="c-nb">5.0</span>, <span class="c-nb">5.1</span>, <span class="c-nb">4.9</span>]
lote_B = [<span class="c-nb">12.0</span>, <span class="c-nb">12.1</span>, <span class="c-nb">11.8</span>]

<span class="c-cm"># B. Crea 'reporte_total' usando el operador '+'
# NOTA: El operador '+' genera una NUEVA lista en la memoria.
# Las listas originales 'lote_A' y 'lote_B' permanecen intactas.</span>
reporte_total = lote_A + lote_B

<span class="c-bi">print</span>(f<span class="c-st">"# Reporte inicial (Suma de lotes): {reporte_total}"</span>)

<span class="c-cm"># C. Usa .extend() para agregar una lista de 'errores'
# NOTA: .extend() no crea una lista nueva, sino que "estira" la lista
# 'reporte_total' agregando los nuevos elementos al final.
# Es más eficiente en términos de memoria para listas muy grandes.</span>
errores = [-<span class="c-nb">1.0</span>, -<span class="c-nb">99.9</span>, -<span class="c-nb">0.5</span>]
reporte_total.extend(errores)

<span class="c-cm"># D. Imprime la longitud final del reporte
# Usamos len() para confirmar cuántos datos procesamos en total.</span>
<span class="c-bi">print</span>(f<span class="c-st">"# Reporte final con errores: {reporte_total}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"# Cantidad total de datos analizados: {len(reporte_total)}"</span>)</pre></div>
  </div>

  <div id="plex-8" class="tab-panel">
<div class="code-block"><div class="code-lang">8_LocalizadorFallos_Listas.py</div><pre>
<span class="c-st">"""

8. LOCALIZADOR DE FALLOS
Objetivo: Encontrar la ubicación y recurrencia de errores.

- Crea una lista 'logs' con varios estados: ["OK", "FAIL", "OK", "OK", "FAIL"].
- Usa .count() para saber cuántos "FAIL" hubo en total.
- Usa .index() para encontrar en qué posición ocurrió el PRIMER "FAIL".
- Imprime ambos resultados con mensajes claros.

"""</span>

<span class="c-cm"># A. Crea una lista 'logs' con varios estados de ejecución</span>
logs = [<span class="c-st">"OK"</span>, <span class="c-st">"FAIL"</span>, <span class="c-st">"OK"</span>, <span class="c-st">"OK"</span>, <span class="c-st">"FAIL"</span>]

<span class="c-cm"># B. Usa .count() para saber cuántos "FAIL" hubo en total
# Esto es vital para calcular el "Pass Rate" de tus pruebas en Google/Intelliswift.</span>
total_fallos = logs.count(<span class="c-st">"FAIL"</span>)

<span class="c-cm"># C. Usa .index() para encontrar la posición del PRIMER "FAIL"
# Recuerda: .index() solo devuelve el primero que encuentra de izquierda a derecha.</span>
indice_primer_fallo = logs.index(<span class="c-st">"FAIL"</span>)

<span class="c-cm"># D. Imprime ambos resultados con mensajes profesionales</span>
<span class="c-bi">print</span>(f<span class="c-st">"--- REPORTE DE EJECUCIÓN ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Total de estados analizados: {len(logs)}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Número de fallos detectados: {total_fallos}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"El primer fallo ocurrió en el paso número: {indice_primer_fallo}"</span>)

<span class="c-cm"># E. TIP PRO: Si quieres la posición humana (empezando en 1), suma 1 al índice</span>
<span class="c-bi">print</span>(f<span class="c-st">"Ubicación humana del primer error: {indice_primer_fallo + 1}"</span>)</pre></div>
  </div>

  <div id="plex-9" class="tab-panel">
<div class="code-block"><div class="code-lang">9_Matriz_Listas.py</div><pre>
<span class="c-st">"""
9. MATRIZ DE SENSORES
Objetivo: Acceder a datos en estructuras de dos dimensiones.

- Crea una lista 'matriz' que represente 2 grupos de sensores:
  Grupo 1: [20, 21, 22] | Grupo 2: [30, 31, 32]
- Accede e imprime el segundo valor del primer grupo.
- Accede e imprime el tercer valor del segundo grupo.
"""</span>

<span class="c-cm"># A. Crea una lista 'matriz' que represente 2 grupos de sensores
# Grupo 1 (Índice 0): [20, 21, 22] | Grupo 2 (Índice 1): [30, 31, 32]</span>
matriz = [
    [<span class="c-nb">20</span>, <span class="c-nb">21</span>, <span class="c-nb">22</span>],  <span class="c-cm"># Fila 0</span>
    [<span class="c-nb">30</span>, <span class="c-nb">31</span>, <span class="c-nb">32</span>]   <span class="c-cm"># Fila 1</span>
]

<span class="c-cm"># B. Accede e imprime el segundo valor del primer grupo
# Fila 0, Columna 1 (Recuerda que empezamos en 0)</span>
valor_g1 = matriz[<span class="c-nb">0</span>][<span class="c-nb">1</span>]
<span class="c-bi">print</span>(f<span class="c-st">"Sensor 2 del Grupo 1: {valor_g1}"</span>)  <span class="c-cm"># Salida: 21</span>

<span class="c-cm"># C. Accede e imprime el tercer valor del segundo grupo
# Fila 1, Columna 2</span>
valor_g2 = matriz[<span class="c-nb">1</span>][<span class="c-nb">2</span>]
<span class="c-bi">print</span>(f<span class="c-st">"Sensor 3 del Grupo 2: {valor_g2}"</span>)  <span class="c-cm"># Salida: 32</span>

<span class="c-cm"># D. TIP TÉCNICO: Puedes ver la matriz completa de forma visual</span>
<span class="c-bi">print</span>(<span class="c-st">"\\nVisualización de la red de sensores:"</span>)
<span class="c-kw">for</span> fila <span class="c-kw">in</span> matriz:
    <span class="c-bi">print</span>(f<span class="c-st">"  Grupo de Sensores: {fila}"</span>)</pre></div>
  </div>

  <div id="plex-10" class="tab-panel">
<div class="code-block"><div class="code-lang">10_Copy_Listas.py</div><pre>
<span class="c-st">"""
10. LIMPIEZA DE BUFFER
Objetivo: Aprender a resetear datos sin perder la referencia.

- Crea una lista 'buffer_datos' con 5 números aleatorios.
- Crea una copia de seguridad llamada 'backup' usando .copy().
- Vacía la lista original 'buffer_datos' usando .clear().
- Imprime ambas listas para demostrar que el backup sobrevivió.
"""</span>

<span class="c-cm"># A. Crea una lista 'buffer_datos' con 5 números (simulando lecturas)</span>
buffer_datos = [<span class="c-nb">10.2</span>, <span class="c-nb">15.5</span>, <span class="c-nb">12.1</span>, <span class="c-nb">18.9</span>, <span class="c-nb">14.3</span>]

<span class="c-cm"># B. Crea una copia de seguridad llamada 'backup' usando .copy()
# Como AI Software Test Engineer, esto te permite guardar evidencias antes
# de que el sistema limpie los logs para la siguiente prueba.</span>
backup = buffer_datos.copy()

<span class="c-cm"># C. Vacía la lista original 'buffer_datos' usando .clear()
# Esto simula un "Reset" de hardware o de memoria tras procesar los datos.</span>
buffer_datos.clear()

<span class="c-cm"># D. Imprime ambas listas para demostrar que el backup sobrevivió</span>
<span class="c-bi">print</span>(<span class="c-st">"--- GESTIÓN DE MEMORIA ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Estado del Buffer (Original): {buffer_datos}"</span>) <span class="c-cm"># Salida: []</span>
<span class="c-bi">print</span>(f<span class="c-st">"Estado del Backup (Copia):     {backup}"</span>)       <span class="c-cm"># Salida: [10.2, 15.5, 12.1, 18.9, 14.3]</span>

<span class="c-cm"># E. PRUEBA DE IDENTIDAD:
# Verificamos si son objetos diferentes en la memoria RAM.</span>
<span class="c-kw">if</span> buffer_datos <span class="c-kw">is not</span> backup:
    <span class="c-bi">print</span>(<span class="c-st">"✅ Confirmado: Son objetos independientes en memoria."</span>)</pre></div>
  </div>

  <div id="plex-11" class="tab-panel">
<div class="code-block"><div class="code-lang">11_ComprehensionList_Listas.py</div><pre>
<span class="c-st">"""
11. FILTRO VELOZ (LIST COMPREHENSION)
Objetivo: Reducir 4 líneas de código (bucle for) a solo 1.

- Tienes una lista: valores = [10, 50, 120, 80, 200, 30].
- Crea una nueva lista 'criticos' que solo contenga los valores mayores a 100.
- Hazlo en UNA SOLA LÍNEA de código usando List Comprehension.
- Imprime la lista 'criticos'.
"""</span>

<span class="c-cm"># A. Lista de valores de sensores</span>
valores = [<span class="c-nb">10</span>, <span class="c-nb">50</span>, <span class="c-nb">120</span>, <span class="c-nb">80</span>, <span class="c-nb">200</span>, <span class="c-nb">30</span>]

<span class="c-cm"># B. Crea 'criticos' con valores &gt; 100 en UNA SOLA LÍNEA
# Esto sustituye a un bucle 'for' de 4 líneas.</span>
criticos = [v <span class="c-kw">for</span> v <span class="c-kw">in</span> valores <span class="c-kw">if</span> v &gt; <span class="c-nb">100</span>]

<span class="c-cm"># C. Imprime la lista resultante</span>
<span class="c-bi">print</span>(<span class="c-st">"--- ANÁLISIS DE UMBRAL CRÍTICO ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Valores originales: {valores}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Lecturas críticas (&gt;100): {criticos}"</span>) <span class="c-cm"># Salida: [120, 200]</span></pre></div>
  </div>

  <div id="plex-12" class="tab-panel">
<div class="code-block"><div class="code-lang">12_Reversion_Listas.py</div><pre>
<span class="c-st">"""
12. INVERSIÓN DE DATOS ESTRICTA
Objetivo: Manipular el flujo cronológico de la información.

- Crea una lista 'pasos' del 1 al 5.
- Invierte la lista usando el truco de slicing [::-1] y guárdala en 'pasos_inv'.
- Toma la lista original 'pasos' y usa .sort(reverse=True).
- Explica en un comentario cuál es la diferencia entre ambos resultados.
"""</span>

<span class="c-cm"># A. Crea una lista 'pasos' del 1 al 5</span>
pasos = [<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>, <span class="c-nb">4</span>, <span class="c-nb">5</span>]

<span class="c-cm"># B. Invierte usando slicing [::-1] y guarda en 'pasos_inv'
# Esto crea una COPIA nueva en la memoria. La original 'pasos' sigue igual.</span>
pasos_inv = pasos[::-<span class="c-nb">1</span>]

<span class="c-cm">#  memory operation]</span>

<span class="c-cm"># C. Usa .sort(reverse=True) en la lista original
# Esto NO crea una copia; modifica 'pasos' de forma PERMANENTE en la memoria.</span>
pasos.sort(reverse=<span class="c-kw">True</span>)

<span class="c-cm"># D. Resultados y Diferencias</span>
<span class="c-bi">print</span>(<span class="c-st">"--- RESULTADOS DE INVERSIÓN ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Original modificada (.sort): {pasos}"</span>)     <span class="c-cm"># Salida: [5, 4, 3, 2, 1]</span>
<span class="c-bi">print</span>(f<span class="c-st">"Copia creada ([::-1]):      {pasos_inv}"</span>) <span class="c-cm"># Salida: [5, 4, 3, 2, 1]</span>

<span class="c-cm"># E. EXPLICACIÓN TÉCNICA (Comentario crítico para entrevista):</span>
<span class="c-st">"""
DIFERENCIA CLAVE:
Si la lista fuera [1, 5, 2]:
- [::-1] devolvería [2, 5, 1] (Simplemente el orden inverso de aparición).
- .sort(reverse=True) devolvería [5, 2, 1] (Orden numérico de mayor a menor).

En Testing, usamos [::-1] para ver los logs más recientes primero sin
alterar la lógica de los datos.
"""</span></pre></div>
  </div>

  <div id="plex-13" class="tab-panel">
<div class="code-block"><div class="code-lang">13_Sincronizacion_Listas.py</div><pre>
<span class="c-st">"""
13. SINCRONIZACIÓN DE SENSORES
Objetivo: Operar con múltiples listas al mismo tiempo de forma eficiente.

- Tienes dos listas: 'nombres_sensores' y 'lecturas_actuales'.
- Usa 'enumerate()' para imprimir cada sensor con su número de orden (empezando en 1).
- Usa 'zip()' para crear un reporte que diga: "El [nombre] reportó [valor] unidades".
"""</span>

nombres_sensores = [<span class="c-st">"Temp_Motor"</span>, <span class="c-st">"Presion_Aceite"</span>, <span class="c-st">"Nivel_Bateria"</span>]
lecturas_actuales = [<span class="c-nb">85.5</span>, <span class="c-nb">40.2</span>, <span class="c-nb">12.6</span>]

<span class="c-cm"># --- PARTE A: Uso de enumerate() ---
# Objetivo: Obtener el índice y el valor al mismo tiempo.
# Usamos 'start=1' para que el conteo sea humano (1, 2, 3...) y no de sistema (0, 1, 2...).</span>

<span class="c-bi">print</span>(<span class="c-st">"--- REPORTE DE ESTADO DE SENSORES ---"</span>)
<span class="c-kw">for</span> i, nombre <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(nombres_sensores, start=<span class="c-nb">1</span>):
    <span class="c-bi">print</span>(f<span class="c-st">"Sensor #{i}: {nombre} detectado."</span>)

<span class="c-cm"># --- PARTE B: Uso de zip() ---
# Objetivo: Recorrer dos listas en paralelo como si fueran una sola tabla.</span>

<span class="c-bi">print</span>(<span class="c-st">"\\n--- TELEMETRÍA EN TIEMPO REAL ---"</span>)
<span class="c-kw">for</span> nombre, valor <span class="c-kw">in</span> <span class="c-bi">zip</span>(nombres_sensores, lecturas_actuales):
    <span class="c-bi">print</span>(f<span class="c-st">"El {nombre} tiene una lectura de {valor} unidades."</span>)</pre></div>
  </div>

  <div id="plex-14" class="tab-panel">
<div class="code-block"><div class="code-lang">14_Extraer_Listas.py</div><pre>
<span class="c-st">"""
14. DESEMPAQUETADO DE MENSAJES CAN (CAN BUS UNPACKING)
Objetivo: Aislar el Header, el Body y el Checksum de una ráfaga de datos.

- Tienes una lista: datos_can = [0x1F, 0x01, 0xFF, 0x00, 0xAB, 0x22, 0x05]
- Usa el asterisco (*) para guardar el primer elemento en 'header',
  el último en 'checksum' y todos los del medio en una lista llamada 'payload'.
- Imprime las tres variables por separado.
"""</span>

<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: EXTENDED ITERABLE UNPACKING
# ==============================================================================
# El desempaquetado con '*' permite capturar múltiples elementos de una lista
# sin saber cuántos hay exactamente en medio.
#
# Regla: Solo puedes usar UN asterisco por cada operación de desempaquetado.
# ==============================================================================</span>

<span class="c-cm"># A. Datos de ejemplo (Mensaje CAN con Header, Payload y Checksum)
# 0x1F es el Header, 0x05 es el Checksum, lo demás es la carga de datos (Payload).</span>
datos_can = [<span class="c-nb">0x1F</span>, <span class="c-nb">0x01</span>, <span class="c-nb">0xFF</span>, <span class="c-nb">0x00</span>, <span class="c-nb">0xAB</span>, <span class="c-nb">0x22</span>, <span class="c-nb">0x05</span>]

<span class="c-cm"># B. Uso del desempaquetado extendido
# header toma el primer valor.
# checksum toma el último valor.
# *payload toma TODO lo que quedó en medio como una lista nueva.</span>
header, *payload, checksum = datos_can

<span class="c-cm"># C. Resultados</span>
<span class="c-bi">print</span>(<span class="c-st">"--- DESEMPAQUETADO DE PROTOCOLO ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"ID/Header (Hex): {hex(header)}"</span>)   <span class="c-cm"># 0x1f</span>
<span class="c-bi">print</span>(f<span class="c-st">"Checksum  (Hex): {hex(checksum)}"</span>) <span class="c-cm"># 0x05</span>
<span class="c-bi">print</span>(f<span class="c-st">"Payload de datos: {payload}"</span>)      <span class="c-cm"># [1, 255, 0, 171, 34] (en decimal)</span></pre></div>
  </div>

  <div id="plex-15" class="tab-panel">
<div class="code-block"><div class="code-lang">15_DeepCopy_Listas.py</div><pre>
<span class="c-st">"""
15. CLONACIÓN SEGURA DE MATRICES
Objetivo: Aprender la diferencia entre copia superficial y profunda.

- Importa el módulo 'copy'.
- Crea una matriz: configuracion = [[1, 0], [0, 1]] (una matriz identidad).
- Crea 'config_test' usando copy.deepcopy(configuracion).
- Cambia un valor dentro de 'config_test' y demuestra con un print que
  la matriz 'configuracion' original NO cambió.
"""</span>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: SHALLOW COPY (SUPERFICIAL) VS DEEP COPY (PROFUNDA)
# ==============================================================================
# 1. .copy(): Es una copia superficial. Copia la lista exterior, pero los
#    objetos internos (las sub-listas) siguen siendo los mismos en la memoria.
# 2. copy.deepcopy(): Crea una réplica total. Clona la lista exterior y todas
#    las sub-listas de forma independiente.
# ==============================================================================</span>

<span class="c-kw">import</span> copy

<span class="c-cm"># A. Crea una matriz: configuracion (Matriz Identidad 2x2)</span>
configuracion = [[<span class="c-nb">1</span>, <span class="c-nb">0</span>], [<span class="c-nb">0</span>, <span class="c-nb">1</span>]]

<span class="c-cm"># B. Crear 'config_test' usando deepcopy()
# Esto garantiza que si modificamos config_test, la original no sufra cambios.</span>
config_test = copy.deepcopy(configuracion)

<span class="c-cm"># C. Modificamos un valor dentro de 'config_test' (Fila 0, Columna 1)
# Vamos a cambiar el 0 por un 5.</span>
config_test[<span class="c-nb">0</span>][<span class="c-nb">1</span>] = <span class="c-nb">5</span>

<span class="c-cm"># D. Demostración con prints</span>
<span class="c-bi">print</span>(<span class="c-st">"--- PRUEBA DE CLONACIÓN SEGURA ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Original (configuracion): {configuracion}"</span>) <span class="c-cm"># Salida: [[1, 0], [0, 1]]</span>
<span class="c-bi">print</span>(f<span class="c-st">"Copia de Test (config_test): {config_test}"</span>)  <span class="c-cm"># Salida: [[1, 5], [0, 1]]</span></pre></div>
  </div>

  <div id="plex-16" class="tab-panel">
<div class="code-block"><div class="code-lang">16_LimpiarDuplicados_Listas.py</div><pre>
<span class="c-st">"""
16. AUDITORÍA DE ERRORES ÚNICOS
Objetivo: Filtrar IDs de error repetidos en una prueba masiva.

- Tienes: logs = ["E-01", "E-05", "E-01", "E-03", "E-05", "E-01", "E-02"].
- Convierte la lista en un 'set' para eliminar duplicados y luego
  regrésala a formato lista.
- Ordena el resultado e imprímelo.
"""</span>

<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: ELIMINACIÓN DE DUPLICADOS CON 'SET'
# ==============================================================================
# Un 'Set' (conjunto) es una estructura de datos que, por definición, NO permite
# elementos duplicados.
#
# El flujo estándar en Python para limpiar una lista es:
# 1. lista -&gt; set (Se borran los duplicados automáticamente).
# 2. set -&gt; lista (Recuperas las propiedades de la lista, como el ordenamiento).
#
# Nota de rendimiento: Buscar en un set tiene una complejidad de $O(1)$,
# lo que lo hace instantáneo sin importar el tamaño.
# ==============================================================================</span>

<span class="c-cm"># A. Lista de logs con IDs de error repetidos</span>
logs = [<span class="c-st">"E-01"</span>, <span class="c-st">"E-05"</span>, <span class="c-st">"E-01"</span>, <span class="c-st">"E-03"</span>, <span class="c-st">"E-05"</span>, <span class="c-st">"E-01"</span>, <span class="c-st">"E-02"</span>]

<span class="c-cm"># B. Convertir la lista en un 'set' y luego de vuelta a 'lista'
# Esto se puede hacer en una sola línea.</span>
errores_unicos = <span class="c-bi">list</span>(<span class="c-bi">set</span>(logs))

<span class="c-cm"># C. Ordenar el resultado
# Como los sets no tienen orden, al volver a lista los datos quedan desordenados.
# Usamos .sort() para que el reporte sea legible (E-01, E-02...).</span>
errores_unicos.sort()

<span class="c-cm"># D. Resultados</span>
<span class="c-bi">print</span>(<span class="c-st">"--- AUDITORÍA DE LOGS ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Total de eventos registrados: {len(logs)}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"IDs de error detectados (Únicos): {errores_unicos}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Cantidad de tipos de error: {len(errores_unicos)}"</span>)</pre></div>
  </div>

  <div id="plex-17" class="tab-panel">
<div class="code-block"><div class="code-lang">17_FormateoReporte_Listas.py</div><pre>
<span class="c-st">"""
17. FORMATEO DE REPORTE FINAL
Objetivo: Generar una línea de log profesional a partir de una lista.

- Tienes: pasos = ["Conectado", "Autenticado", "Lectura_OK", "Desconectado"].
- Usa el método .join() para crear un solo string donde cada paso
  esté separado por una flecha " -&gt; ".
- Imprime el resultado.
"""</span>

<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: EL MÉTODO .join()
# ==============================================================================
# A diferencia de los métodos anteriores, .join() es un método de STRING,
# no de lista. Toma todos los elementos de una lista y los pega usando el
# string que tú definas como "pegamento".
#
# REGLA DE ORO: Todos los elementos dentro de la lista DEBEN ser strings.
# Si hay números, primero hay que convertirlos.
# ==============================================================================</span>

<span class="c-cm"># A. Lista de pasos ejecutados en una prueba de software</span>
pasos = [<span class="c-st">"Conectado"</span>, <span class="c-st">"Autenticado"</span>, <span class="c-st">"Lectura_OK"</span>, <span class="c-st">"Desconectado"</span>]

<span class="c-cm"># B. Usa .join() para crear una cadena separada por flechas " -&gt; "
# El string inicial " -&gt; " es el separador que se pondrá ENTRE los elementos.</span>
reporte_flujo = <span class="c-st">" -&gt; "</span>.join(pasos)

<span class="c-cm"># C. Ejemplo adicional: Formato CSV (valores separados por comas)
# Muy útil para exportar datos a Excel después de un test.</span>
reporte_csv = <span class="c-st">","</span>.join(pasos)

<span class="c-cm"># D. Resultados</span>
<span class="c-bi">print</span>(<span class="c-st">"--- GENERACIÓN DE LOG PROFESIONAL ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Flujo de ejecución: {reporte_flujo}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Formato de exportación: {reporte_csv}"</span>)</pre></div>
  </div>

  <div id="plex-18" class="tab-panel">
<div class="code-block"><div class="code-lang">18_BigO_Listas.py</div><pre>
<span class="c-st">"""
18. ANÁLISIS DE EFICIENCIA (TEÓRICO)
Objetivo: Evaluar el rendimiento de tus scripts para Honeywell/Google.

- Tienes una lista de 1,000,000 de registros.
- En un comentario, responde cuál de estas operaciones es más rápida y por qué:
  A) Acceder al elemento en la posición 500,000 (lista[500000]).
  B) Buscar si el valor 'ERROR_CRITICO' existe en la lista (if 'ERROR_CRITICO' in lista).

Pista: Investiga la complejidad $O(1)$ vs $O(n)$.
"""</span>

<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: COMPLEJIDAD TEMPORAL (BIG O)
# ==============================================================================
# La eficiencia se mide en cómo crece el tiempo de ejecución según el tamaño (n)
# de los datos.
#
# 1. O(1) - Constante: Es instantáneo. No importa si tienes 10 o 10 millones
#    de datos, el tiempo es el mismo.
# 2. O(n) - Lineal: El tiempo crece proporcionalmente a los datos. Si tienes
#    el doble de datos, tarda el doble de tiempo.
# ==============================================================================</span>

<span class="c-st">"""
RESPUESTA AL DESAFÍO:
---------------------
Escenario: Lista de 1,000,000 de registros.

A) Acceder a lista[500000]: Es una operación O(1).
   Python sabe exactamente en qué dirección de memoria está ese índice.
   Es INSTANTÁNEO.

B) 'ERROR_CRITICO' in lista: Es una operación O(n).
   Python tiene que empezar desde el índice 0 y preguntar "es este?" uno por uno
   hasta llegar al final. En el peor caso, revisará el millón de registros.

CONCLUSIÓN:
La opción A es muchísimo más rápida que la opción B para grandes volúmenes
de datos.
"""</span></pre></div>
  </div>

</div>
  </div>
</div>`,

'py-tuplas': `
<div class="tab-group-pytup">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ptp-0','pytup')">Métodos esenciales</button>
    <button class="tab-btn" onclick="switchTab(this,'ptp-1','pytup')">Conceptos y creación</button>
    <button class="tab-btn" onclick="switchTab(this,'ptp-2','pytup')">Unpacking & namedtuple</button>
    <button class="tab-btn" onclick="switchTab(this,'ptp-3','pytup')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'ptp-4','pytup')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'ptp-5','pytup')">🧩 Ejercicios</button>
  </div>
  <div id="ptp-0" class="tab-panel active">
${renderMethodTable('TUP')}
  </div>
  <div id="ptp-1" class="tab-panel">
<div class="concept-intro">Las <strong>tuplas</strong> son secuencias ordenadas e <strong>inmutables</strong>: una vez creadas, no puedes agregar, quitar ni reemplazar elementos. Se usan para datos que no deberían cambiar (coordenadas, filas de CSV, un par clave-test), para retornar múltiples valores de una función, y como <code>keys</code> de diccionarios o elementos de <code>set</code> (porque son hashables, a diferencia de las listas).</div>
<div class="code-block"><div class="code-lang">Python — Crear tuplas</div><pre>
<span class="c-cm"># Crear tuplas</span>
t = (<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>)
t = <span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>       <span class="c-cm"># los paréntesis son opcionales</span>
t = (<span class="c-nb">1</span>,)             <span class="c-cm"># TRAMPA: tupla de un elemento necesita la coma</span>
t = <span class="c-bi">tuple</span>()             <span class="c-cm"># tupla vacía</span>
t = ()                    <span class="c-cm"># también tupla vacía</span>
t = <span class="c-bi">tuple</span>([<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>]) <span class="c-cm"># desde lista</span>
t = <span class="c-bi">tuple</span>(<span class="c-st">'abc'</span>)        <span class="c-cm"># ('a', 'b', 'c') — desde cualquier iterable</span>

<span class="c-cm"># Ventaja sobre lista: más rápidas, usan menos memoria, comunican inmutabilidad</span>
<span class="c-kw">import</span> sys
<span class="c-bi">print</span>(sys.getsizeof((<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>)))  <span class="c-cm"># 64 bytes</span>
<span class="c-bi">print</span>(sys.getsizeof([<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>]))  <span class="c-cm"># 88 bytes</span>

<span class="c-cm"># Métodos — solo count() e index() (no hay ninguno que mute)</span>
(<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>).count(<span class="c-nb">2</span>)   <span class="c-cm"># 2</span>
(<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>).index(<span class="c-nb">2</span>)     <span class="c-cm"># 1</span>

<span class="c-cm"># Concatenar y repetir crean tuplas NUEVAS (la original no cambia)</span>
a = (<span class="c-nb">1</span>, <span class="c-nb">2</span>) + (<span class="c-nb">3</span>, <span class="c-nb">4</span>)   <span class="c-cm"># (1, 2, 3, 4)</span>
b = (<span class="c-nb">0</span>,) * <span class="c-nb">3</span>            <span class="c-cm"># (0, 0, 0)</span>

<span class="c-cm"># Tuplas como keys de dict (porque son hashables)</span>
cache = {}
cache[(<span class="c-st">'bench_a3'</span>, <span class="c-st">'test_lidar'</span>)] = <span class="c-st">'PASSED'</span></pre></div>
  </div>
  <div id="ptp-2" class="tab-panel">
<div class="concept-intro">El <strong>unpacking</strong> (desempaquetado) asigna los elementos de una tupla (o cualquier iterable) a varias variables en una sola línea. Un <strong>namedtuple</strong> es una tupla con nombres para cada posición: mantiene el rendimiento y la inmutabilidad de una tupla, pero se accede por atributo (<code>r.value</code>) en vez de índice (<code>r[1]</code>), mucho más legible en code review.</div>
<div class="code-block"><div class="code-lang">Python — Unpacking y namedtuple</div><pre>
<span class="c-cm"># Unpacking — muy Pythónico</span>
x, y, z = (<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>)
a, *rest = (<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>, <span class="c-nb">4</span>)   <span class="c-cm"># a=1, rest=[2,3,4]  ← rest es LISTA, no tupla</span>
first, *_, last = (<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>, <span class="c-nb">4</span>)  <span class="c-cm"># first=1, last=4</span>
_, second, *_ = (<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>, <span class="c-nb">4</span>)  <span class="c-cm"># solo me importa el segundo</span>

<span class="c-cm"># Swap sin variable temporal</span>
a, b = b, a   <span class="c-cm"># Python crea tupla (b, a) y desempaca</span>

<span class="c-cm"># Retornar múltiples valores de una función — en realidad retorna UNA tupla</span>
<span class="c-kw">def</span> <span class="c-fn">min_max</span>(valores):
    <span class="c-kw">return</span> <span class="c-bi">min</span>(valores), <span class="c-bi">max</span>(valores)   <span class="c-cm"># empaqueta (min, max)</span>
lo, hi = min_max([<span class="c-nb">4</span>, <span class="c-nb">1</span>, <span class="c-nb">9</span>, <span class="c-nb">2</span>])   <span class="c-cm"># desempaqueta al recibir</span>

<span class="c-cm"># Unpacking en for — muy usado con enumerate/zip/items</span>
<span class="c-kw">for</span> idx, (bench, resultado) <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(pares):
    <span class="c-bi">print</span>(idx, bench, resultado)

<span class="c-cm"># Named tuple — tupla con campos nombrados (mejor que índices)</span>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> namedtuple
SensorReading = namedtuple(<span class="c-st">'SensorReading'</span>, [<span class="c-st">'timestamp'</span>, <span class="c-st">'value'</span>, <span class="c-st">'unit'</span>])
r = SensorReading(<span class="c-nb">1720000000.0</span>, <span class="c-nb">36.5</span>, <span class="c-st">'celsius'</span>)
<span class="c-bi">print</span>(r.value)     <span class="c-cm"># 36.5  ← más claro que r[1]</span>
<span class="c-bi">print</span>(r._asdict()) <span class="c-cm"># {'timestamp': ..., 'value': 36.5, 'unit': 'celsius'}</span>
r2 = r._replace(value=<span class="c-nb">37.0</span>)  <span class="c-cm"># namedtuple sigue siendo inmutable: _replace retorna una copia</span>

<span class="c-cm"># Alternativa moderna: dataclass congelada (Python 3.7+), similar pero con type hints</span>
<span class="c-kw">from</span> dataclasses <span class="c-kw">import</span> dataclass
<span class="c-dc">@dataclass</span>(frozen=<span class="c-kw">True</span>)
<span class="c-kw">class</span> <span class="c-fn">Reading</span>:
    timestamp: <span class="c-bi">float</span>
    value: <span class="c-bi">float</span>
    unit: <span class="c-bi">str</span></pre></div>
  </div>
  <div id="ptp-3" class="tab-panel">
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
t = (<span class="c-nb">1</span>)
<span class="c-bi">print</span>(<span class="c-bi">type</span>(t))   <span class="c-cm"># &lt;class 'int'&gt; — ¡no es tupla!</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
t = (<span class="c-nb">1</span>,)   <span class="c-cm"># la coma es lo que crea la tupla, no los paréntesis</span>
<span class="c-bi">print</span>(<span class="c-bi">type</span>(t))   <span class="c-cm"># &lt;class 'tuple'&gt;</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> en Python, los paréntesis alrededor de un solo valor son solo agrupación aritmética, igual que en matemáticas — no crean una tupla. Lo que define una tupla es la <b>coma</b>. Por eso <code>tuple('abc')</code> da <code>('a', 'b', 'c')</code> (itera el string) y no <code>('abc',)</code>: la única forma de obtener esta última es escribir explícitamente la coma.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
config = ([<span class="c-nb">1</span>,<span class="c-nb">2</span>], [<span class="c-nb">3</span>,<span class="c-nb">4</span>])
cache[config] = <span class="c-st">'PASSED'</span>   <span class="c-cm"># TypeError: unhashable type: 'list'</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
config = ((<span class="c-nb">1</span>,<span class="c-nb">2</span>), (<span class="c-nb">3</span>,<span class="c-nb">4</span>))   <span class="c-cm"># sub-tuplas, no sub-listas</span>
cache[config] = <span class="c-st">'PASSED'</span>   <span class="c-cm"># funciona, todo es hashable</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> una tupla es hashable <b>solo si todos sus elementos son hashables</b>. La tupla en sí es inmutable, pero si contiene una lista, esa lista sí es mutable y Python no puede calcular un hash estable para ella. Esto rompe el uso de la tupla como key de dict o elemento de set. Verifica con <code>hash(x)</code>: si lanza TypeError, no puedes usar esa estructura como key.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
resultado = ()
<span class="c-kw">for</span> chunk <span class="c-kw">in</span> chunks:
    resultado += (chunk,)   <span class="c-cm"># crea una tupla NUEVA cada vuelta → O(n²)</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
<span class="c-cm"># Acumula en lista (mutable) y convierte a tupla al final</span>
resultado = []
<span class="c-kw">for</span> chunk <span class="c-kw">in</span> chunks:
    resultado.append(chunk)
resultado = <span class="c-bi">tuple</span>(resultado)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> igual que con listas, <code>+=</code> sobre una tupla no modifica in-place (no puede, son inmutables): crea una tupla completamente nueva copiando todos los elementos anteriores más el nuevo. Repetido en un loop, el costo es O(n²). Si necesitas construir una colección incrementalmente, usa una lista mutable y conviértela a tupla solo al final si la inmutabilidad importa para el resultado.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
<span class="c-cm"># Acceder por índice numérico en una tupla de muchos campos</span>
reading = (<span class="c-nb">1720000000.0</span>, <span class="c-nb">36.5</span>, <span class="c-st">'celsius'</span>, <span class="c-st">'sensor_04'</span>, <span class="c-kw">True</span>)
<span class="c-kw">if</span> reading[<span class="c-nb">4</span>]:   <span class="c-cm"># ¿qué es el índice 4? hay que ir a leer la definición</span>
    process(reading[<span class="c-nb">1</span>])</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> namedtuple
Reading = namedtuple(<span class="c-st">'Reading'</span>, <span class="c-st">'timestamp value unit sensor_id is_valid'</span>)
reading = Reading(<span class="c-nb">1720000000.0</span>, <span class="c-nb">36.5</span>, <span class="c-st">'celsius'</span>, <span class="c-st">'sensor_04'</span>, <span class="c-kw">True</span>)
<span class="c-kw">if</span> reading.is_valid:   <span class="c-cm"># autoexplicativo</span>
    process(reading.value)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> las tuplas posicionales con muchos campos son ilegibles y frágiles: si alguien reordena los campos al construirlas en otro punto del código, no hay ningún error en tiempo de ejecución, solo un bug silencioso. <code>namedtuple</code> (o <code>dataclass</code>) resuelve esto dando nombre a cada posición sin perder el rendimiento ni la inmutabilidad de una tupla.</div>
  </div>
  <div id="ptp-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Usa namedtuple o dataclass(frozen=True) para datos con significado</div>
  <p>En vez de tuplas posicionales genéricas para representar una lectura de sensor, un resultado de test o una fila de CSV, dale nombre a cada campo. El código se vuelve autoexplicativo y evita bugs de "¿cuál índice era el timestamp?".</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa tuplas para comunicar "esto no debería cambiar"</div>
  <p>Elegir <code>tuple</code> en vez de <code>list</code> es también documentación: le dice al siguiente desarrollador (o a ti en 6 meses) que esos valores son fijos — por ejemplo, las coordenadas de un sensor montado en el vehículo, o los encabezados de un CSV.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Aprovecha que son hashables para keys compuestas de dict/set</div>
  <p><code>cache[(bench_id, test_name)] = resultado</code> es más limpio que anidar diccionarios (<code>cache[bench_id][test_name]</code>). Solo asegúrate de que todos los elementos de la tupla sean a su vez hashables (nada de listas o dicts adentro).</p>
</div>
<div class="practice-card">
  <div class="practice-title">Retorna tuplas desde funciones y desempaqueta de inmediato en el caller</div>
  <p><code>def stats(x): return min(x), max(x), sum(x)/len(x)</code> seguido de <code>lo, hi, avg = stats(datos)</code> es un patrón muy Pythónico para retornar varios valores relacionados sin crear una clase completa.</p>
</div>
<div class="practice-card">
  <div class="practice-title">No uses tuplas cuando en realidad necesitas mutabilidad</div>
  <p>Si vas a acumular elementos incrementalmente (agregar uno por uno en un loop), usa una lista y conviértela a tupla al final si hace falta inmutabilidad — evita el patrón O(n²) de <code>tupla += (x,)</code> dentro de un loop.</p>
</div>
  </div>
  <div id="ptp-5" class="tab-panel">
<div class="concept-intro">Practica activa: resuelve cada ejercicio por tu cuenta (en tu editor o en papel) <strong>antes</strong> de hacer click. Al revelar verás primero la <b>salida esperada</b>, para que puedas comparar tu propio resultado, y después el <b>procedimiento completo paso a paso</b> con la solución comentada. Progresión: 🟢 Básico → 🟡 Intermedio → 🔴 Complejo.</div>

<div class="exercise-steps-label">🟢 Básico</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-basico">BÁSICO</span>
    <span>Escribe una función <code>pares(t)</code> que reciba una tupla de enteros y retorne una tupla nueva con solo los valores pares, sin modificar la tupla original.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>pares((1, 2, 3, 4, 5, 6)) → (2, 4, 6)</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Recorre la tupla de entrada con una comprehension, filtrando con el operador módulo (<code>x % 2 == 0</code>) para quedarte solo con los pares.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Envuelve la comprehension con <code>tuple(...)</code>: la sintaxis <code>(x for x in t)</code> por sí sola es un generador, no una tupla, así que hay que empaquetarlo explícitamente.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">pares</span>(t):
    <span class="c-kw">return</span> <span class="c-bi">tuple</span>(x <span class="c-kw">for</span> x <span class="c-kw">in</span> t <span class="c-kw">if</span> x % <span class="c-nb">2</span> == <span class="c-nb">0</span>)

<span class="c-bi">print</span>(pares((<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>, <span class="c-nb">4</span>, <span class="c-nb">5</span>, <span class="c-nb">6</span>)))  <span class="c-cm"># (2, 4, 6)</span></pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-basico">BÁSICO</span>
    <span>Escribe una función <code>diferencias(a, b)</code> que reciba dos tuplas numéricas de igual longitud — lecturas de dos sensores tomadas en los mismos instantes — y retorne una tupla con la diferencia absoluta entre cada par de valores.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>diferencias((10, 20, 30), (12, 18, 33)) → (2, 2, 3)</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Usa <code>zip(a, b)</code> para recorrer ambas tuplas en paralelo, generando pares <code>(x, y)</code> posición por posición.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Calcula <code>abs(x - y)</code> para cada par dentro de una comprehension y envuelve el resultado en <code>tuple(...)</code>.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">diferencias</span>(a, b):
    <span class="c-kw">return</span> <span class="c-bi">tuple</span>(<span class="c-bi">abs</span>(x - y) <span class="c-kw">for</span> x, y <span class="c-kw">in</span> <span class="c-bi">zip</span>(a, b))

<span class="c-bi">print</span>(diferencias((<span class="c-nb">10</span>, <span class="c-nb">20</span>, <span class="c-nb">30</span>), (<span class="c-nb">12</span>, <span class="c-nb">18</span>, <span class="c-nb">33</span>)))  <span class="c-cm"># (2, 2, 3)</span></pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-basico">BÁSICO</span>
    <span>Escribe una función <code>formatear_lectura(r)</code> que reciba una tupla <code>(nombre, valor, unidad)</code> y retorne un string con el formato <code>'nombre: valor unidad'</code>, usando unpacking para nombrar cada campo dentro de la función.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>formatear_lectura(('temp_motor', 92.5, 'C')) → 'temp_motor: 92.5 C'</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Desempaqueta la tupla recibida en tres variables descriptivas: <code>nombre, valor, unidad = r</code>. Esto es más legible que acceder por índice (<code>r[0]</code>, <code>r[1]</code>, <code>r[2]</code>).</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Construye el string de salida con un f-string que interpole las tres variables ya desempaquetadas.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">formatear_lectura</span>(r):
    nombre, valor, unidad = r
    <span class="c-kw">return</span> <span class="c-st">f"{nombre}: {valor} {unidad}"</span>

<span class="c-bi">print</span>(formatear_lectura((<span class="c-st">'temp_motor'</span>, <span class="c-nb">92.5</span>, <span class="c-st">'C'</span>)))  <span class="c-cm"># temp_motor: 92.5 C</span></pre></div>
  </div>
</div>

<div class="exercise-steps-label">🟡 Intermedio</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-intermedio">INTERMEDIO</span>
    <span>Escribe una función <code>extremos(tel)</code> que reciba una tupla de telemetría con forma <code>(timestamp, *lecturas)</code> — un timestamp seguido de un número variable de lecturas — y, usando unpacking extendido con <code>*</code>, retorne una tupla <code>(timestamp, primera_lectura, ultima_lectura)</code>.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>extremos((1700000000, 12, 45, 30, 8, 91)) → (1700000000, 12, 91)</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Usa unpacking extendido para separar el primer elemento del resto: <code>ts, *lecturas = tel</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Recuerda que <code>*lecturas</code> siempre produce una <b>lista</b>, aunque <code>tel</code> sea una tupla — así que <code>lecturas[0]</code> y <code>lecturas[-1]</code> acceden a la primera y última lectura normalmente.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Empaqueta el resultado final como una tupla nueva de tres elementos.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">extremos</span>(tel):
    ts, *lecturas = tel
    <span class="c-kw">return</span> (ts, lecturas[<span class="c-nb">0</span>], lecturas[-<span class="c-nb">1</span>])

<span class="c-bi">print</span>(extremos((<span class="c-nb">1700000000</span>, <span class="c-nb">12</span>, <span class="c-nb">45</span>, <span class="c-nb">30</span>, <span class="c-nb">8</span>, <span class="c-nb">91</span>)))  <span class="c-cm"># (1700000000, 12, 91)</span></pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-intermedio">INTERMEDIO</span>
    <span>Define un namedtuple <code>TestResult</code> con campos <code>bench</code>, <code>test</code>, <code>status</code> y <code>duration</code>. Luego escribe <code>tests_fallidos_por_duracion(resultados)</code>, que reciba una lista de <code>TestResult</code> y retorne una tupla con los nombres de los tests con <code>status == 'FAILED'</code>, ordenados de mayor a menor duración.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>('test_eth', 'test_lidar')</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Define el namedtuple con <code>collections.namedtuple('TestResult', ['bench', 'test', 'status', 'duration'])</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Filtra la lista con una comprehension quedándote solo con los elementos donde <code>r.status == 'FAILED'</code> — el acceso por atributo evita adivinar índices.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Ordena los filtrados con <code>sorted(..., key=lambda r: r.duration, reverse=True)</code> para que el más lento quede primero.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 4</div><div class="plan-content"><p>Extrae solo el campo <code>test</code> de cada resultado ordenado y empaqueta todo en una tupla final.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> namedtuple

TestResult = namedtuple(<span class="c-st">'TestResult'</span>, [<span class="c-st">'bench'</span>, <span class="c-st">'test'</span>, <span class="c-st">'status'</span>, <span class="c-st">'duration'</span>])

<span class="c-kw">def</span> <span class="c-fn">tests_fallidos_por_duracion</span>(resultados):
    fallidos = [r <span class="c-kw">for</span> r <span class="c-kw">in</span> resultados <span class="c-kw">if</span> r.status == <span class="c-st">'FAILED'</span>]
    ordenados = <span class="c-bi">sorted</span>(fallidos, key=<span class="c-kw">lambda</span> r: r.duration, reverse=<span class="c-kw">True</span>)
    <span class="c-kw">return</span> <span class="c-bi">tuple</span>(r.test <span class="c-kw">for</span> r <span class="c-kw">in</span> ordenados)

resultados = [
    TestResult(<span class="c-st">'a3'</span>, <span class="c-st">'test_lidar'</span>, <span class="c-st">'FAILED'</span>, <span class="c-nb">12.4</span>),
    TestResult(<span class="c-st">'a3'</span>, <span class="c-st">'test_can'</span>, <span class="c-st">'PASSED'</span>, <span class="c-nb">3.1</span>),
    TestResult(<span class="c-st">'b1'</span>, <span class="c-st">'test_eth'</span>, <span class="c-st">'FAILED'</span>, <span class="c-nb">20.7</span>),
]
<span class="c-bi">print</span>(tests_fallidos_por_duracion(resultados))  <span class="c-cm"># ('test_eth', 'test_lidar')</span></pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-intermedio">INTERMEDIO</span>
    <span>Escribe dos funciones sobre una tupla de tuplas <code>(clave, valor)</code>: <code>a_dict(pares)</code>, que la convierta en un diccionario normal (si una clave se repite, gana el último valor), y <code>agrupar(pares)</code>, que en cambio acumule en una lista todos los valores de cada clave repetida.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>a_dict(...) → {'bench_a3': 'FAILED', 'bench_b1': 'FAILED'}  |  agrupar(...) → {'bench_a3': ['PASSED', 'FAILED'], 'bench_b1': ['FAILED']}</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p><code>a_dict</code> es simplemente <code>dict(pares)</code>: el constructor <code>dict()</code> acepta cualquier iterable de pares <code>(clave, valor)</code>, y si una clave se repite, la última ocurrencia sobrescribe a las anteriores.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Para <code>agrupar</code>, <code>dict()</code> directo no sirve porque perdería valores. Usa <code>defaultdict(list)</code> y recorre <code>pares</code> con <code>for clave, valor in pares</code>, acumulando con <code>append</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Convierte el <code>defaultdict</code> a un <code>dict</code> normal al final con <code>dict(resultado)</code> — opcional, pero evita sorpresas si alguien luego consulta una clave inexistente.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> defaultdict

<span class="c-kw">def</span> <span class="c-fn">a_dict</span>(pares):
    <span class="c-kw">return</span> <span class="c-bi">dict</span>(pares)

<span class="c-kw">def</span> <span class="c-fn">agrupar</span>(pares):
    resultado = defaultdict(<span class="c-bi">list</span>)
    <span class="c-kw">for</span> clave, valor <span class="c-kw">in</span> pares:
        resultado[clave].append(valor)
    <span class="c-kw">return</span> <span class="c-bi">dict</span>(resultado)

pares = ((<span class="c-st">'bench_a3'</span>, <span class="c-st">'PASSED'</span>), (<span class="c-st">'bench_b1'</span>, <span class="c-st">'FAILED'</span>), (<span class="c-st">'bench_a3'</span>, <span class="c-st">'FAILED'</span>))
<span class="c-bi">print</span>(a_dict(pares))    <span class="c-cm"># {'bench_a3': 'FAILED', 'bench_b1': 'FAILED'}</span>
<span class="c-bi">print</span>(agrupar(pares))   <span class="c-cm"># {'bench_a3': ['PASSED', 'FAILED'], 'bench_b1': ['FAILED']}</span></pre></div>
  </div>
</div>

<div class="exercise-steps-label">🔴 Complejo</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-complejo">COMPLEJO</span>
    <span>Escribe una función <code>resumen_por_sensor(lecturas)</code> que reciba una tupla de tuplas <code>(sensor_id, timestamp, valor)</code>, posiblemente desordenadas y con varios sensores mezclados, y retorne un diccionario donde cada key es un <code>sensor_id</code> y el valor es un namedtuple <code>Resumen(minimo, maximo, promedio, n)</code> calculado solo con los valores de ese sensor. La tupla <code>lecturas</code> original no debe modificarse.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>{'imu1': Resumen(minimo=10.0, maximo=14.0, promedio=12.0, n=3), 'can1': Resumen(minimo=2.0, maximo=4.0, promedio=3.0, n=2)}</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Agrupa los valores por <code>sensor_id</code> con <code>defaultdict(list)</code>, recorriendo <code>lecturas</code> con unpacking directo en el <code>for</code>: <code>for sensor_id, ts, valor in lecturas</code>. Como solo lees la tupla original (nunca le asignas nada), no la modificas.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Define el namedtuple <code>Resumen</code> con los cuatro campos que pide el enunciado: <code>minimo</code>, <code>maximo</code>, <code>promedio</code>, <code>n</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Para cada sensor, calcula <code>min()</code>, <code>max()</code> y <code>sum()/len()</code> sobre su lista de valores agrupados.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 4</div><div class="plan-content"><p>Construye el diccionario final con una dict comprehension que recorre <code>por_sensor.items()</code> y arma un <code>Resumen(...)</code> por cada sensor.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> namedtuple, defaultdict

Resumen = namedtuple(<span class="c-st">'Resumen'</span>, [<span class="c-st">'minimo'</span>, <span class="c-st">'maximo'</span>, <span class="c-st">'promedio'</span>, <span class="c-st">'n'</span>])

<span class="c-kw">def</span> <span class="c-fn">resumen_por_sensor</span>(lecturas):
    por_sensor = defaultdict(<span class="c-bi">list</span>)
    <span class="c-kw">for</span> sensor_id, ts, valor <span class="c-kw">in</span> lecturas:
        por_sensor[sensor_id].append(valor)

    <span class="c-kw">return</span> {
        sensor_id: Resumen(
            minimo=<span class="c-bi">min</span>(valores),
            maximo=<span class="c-bi">max</span>(valores),
            promedio=<span class="c-bi">sum</span>(valores) / <span class="c-bi">len</span>(valores),
            n=<span class="c-bi">len</span>(valores),
        )
        <span class="c-kw">for</span> sensor_id, valores <span class="c-kw">in</span> por_sensor.items()
    }

lecturas = (
    (<span class="c-st">'imu1'</span>, <span class="c-nb">100</span>, <span class="c-nb">10.0</span>), (<span class="c-st">'can1'</span>, <span class="c-nb">101</span>, <span class="c-nb">2.0</span>),
    (<span class="c-st">'imu1'</span>, <span class="c-nb">102</span>, <span class="c-nb">14.0</span>), (<span class="c-st">'can1'</span>, <span class="c-nb">103</span>, <span class="c-nb">4.0</span>),
    (<span class="c-st">'imu1'</span>, <span class="c-nb">104</span>, <span class="c-nb">12.0</span>),
)
<span class="c-bi">print</span>(resumen_por_sensor(lecturas))
<span class="c-cm"># {'imu1': Resumen(minimo=10.0, maximo=14.0, promedio=12.0, n=3),</span>
<span class="c-cm"># 'can1': Resumen(minimo=2.0, maximo=4.0, promedio=3.0, n=2)}</span></pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-complejo">COMPLEJO</span>
    <span>Escribe una función <code>comparar_runs(run_a, run_b)</code> que reciba dos tuplas de tuplas <code>(test_name, status)</code> representando dos corridas de test (pueden tener tests distintos y en distinto orden) y retorne una tupla de tres sets: <code>(ambas_pasaron, ambas_fallaron, cambiaron)</code>, donde <code>cambiaron</code> son los tests presentes en ambas corridas cuyo status difiere entre una y otra.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>({'test_can', 'test_eth'}, set(), {'test_lidar'})</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Convierte cada corrida en un diccionario <code>{test_name: status}</code> con <code>dict(run_a)</code> y <code>dict(run_b)</code>, aprovechando que las tuplas ya vienen como pares clave-valor — esto da lookup O(1) por nombre de test.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Obtén los tests presentes en ambas corridas con la intersección de las keys de los dos dicts: <code>comunes = a.keys() &amp; b.keys()</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Sobre <code>comunes</code>, construye <code>ambas_pasaron</code> y <code>ambas_fallaron</code> con set comprehensions que filtran por status igual en los dos dicts (<code>a[t] == b[t] == 'PASSED'</code> o <code>'FAILED'</code>).</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 4</div><div class="plan-content"><p>Construye <code>cambiaron</code> filtrando los tests comunes donde <code>a[t] != b[t]</code>, y retorna las tres sets empaquetadas en una tupla.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">comparar_runs</span>(run_a, run_b):
    a = <span class="c-bi">dict</span>(run_a)
    b = <span class="c-bi">dict</span>(run_b)
    comunes = a.keys() &amp; b.keys()

    ambas_pasaron = {t <span class="c-kw">for</span> t <span class="c-kw">in</span> comunes <span class="c-kw">if</span> a[t] == b[t] == <span class="c-st">'PASSED'</span>}
    ambas_fallaron = {t <span class="c-kw">for</span> t <span class="c-kw">in</span> comunes <span class="c-kw">if</span> a[t] == b[t] == <span class="c-st">'FAILED'</span>}
    cambiaron = {t <span class="c-kw">for</span> t <span class="c-kw">in</span> comunes <span class="c-kw">if</span> a[t] != b[t]}

    <span class="c-kw">return</span> (ambas_pasaron, ambas_fallaron, cambiaron)

run_a = ((<span class="c-st">'test_can'</span>, <span class="c-st">'PASSED'</span>), (<span class="c-st">'test_lidar'</span>, <span class="c-st">'FAILED'</span>), (<span class="c-st">'test_eth'</span>, <span class="c-st">'PASSED'</span>), (<span class="c-st">'test_imu'</span>, <span class="c-st">'FAILED'</span>))
run_b = ((<span class="c-st">'test_can'</span>, <span class="c-st">'PASSED'</span>), (<span class="c-st">'test_lidar'</span>, <span class="c-st">'PASSED'</span>), (<span class="c-st">'test_eth'</span>, <span class="c-st">'PASSED'</span>), (<span class="c-st">'test_gps'</span>, <span class="c-st">'FAILED'</span>))
<span class="c-bi">print</span>(comparar_runs(run_a, run_b))
<span class="c-cm"># ({'test_can', 'test_eth'}, set(), {'test_lidar'})</span></pre></div>
  </div>
</div>
  </div>
</div>`,

'py-dicts': `
<div class="tab-group-pydicts">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pd-1','pydicts')">Métodos esenciales</button>
    <button class="tab-btn" onclick="switchTab(this,'pd-2','pydicts')">defaultdict / Counter</button>
    <button class="tab-btn" onclick="switchTab(this,'pd-3','pydicts')">Patrones avanzados</button>
    <button class="tab-btn" onclick="switchTab(this,'pd-4','pydicts')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'pd-5','pydicts')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'pd-6','pydicts')">🧩 Ejercicios (quiz)</button>
    <button class="tab-btn" onclick="switchTab(this,'pd-7','pydicts')">📁 Ejercicios_Diccionarios (carpeta)</button>
  </div>
  <div id="pd-1" class="tab-panel active">
${renderMethodTable('DCT')}
  </div>
  <div id="pd-2" class="tab-panel">
<div class="concept-intro">Las variantes de <code>collections</code> resuelven problemas específicos: <strong>defaultdict</strong> elimina el "if key not in dict" antes de escribir, <strong>Counter</strong> es un dict especializado para conteos y frecuencias, y <strong>OrderedDict</strong> sigue teniendo utilidad cuando el <em>orden en sí</em> es parte de la lógica (no solo un efecto colateral), por ejemplo para implementar una caché LRU manual.</div>
<div class="code-block"><div class="code-lang">Python — defaultdict y Counter</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> defaultdict, Counter, OrderedDict

<span class="c-cm"># defaultdict — nunca KeyError, valor default automático</span>
graph = defaultdict(<span class="c-bi">list</span>)      <span class="c-cm"># default: lista vacía</span>
graph[<span class="c-st">'A'</span>].append(<span class="c-st">'B'</span>)       <span class="c-cm"># no necesita if 'A' not in graph</span>

counts = defaultdict(<span class="c-bi">int</span>)      <span class="c-cm"># default: 0</span>
counts[<span class="c-st">'errors'</span>] += <span class="c-nb">1</span>        <span class="c-cm"># no KeyError aunque no exista</span>

nested = defaultdict(defaultdict(<span class="c-bi">int</span>).copy)  <span class="c-cm"># anidado</span>

<span class="c-cm"># Counter — subclase de dict especializada en conteos</span>
c = Counter([<span class="c-st">'ERROR'</span>, <span class="c-st">'WARN'</span>, <span class="c-st">'ERROR'</span>, <span class="c-st">'INFO'</span>, <span class="c-st">'ERROR'</span>])
<span class="c-bi">print</span>(c)            <span class="c-cm"># Counter({'ERROR': 3, 'WARN': 1, 'INFO': 1})</span>
c.most_common(<span class="c-nb">2</span>)   <span class="c-cm"># [('ERROR', 3), ('WARN', 1)]</span>

<span class="c-cm"># Operaciones aritméticas de Counter</span>
c1 = Counter(<span class="c-st">'abcabc'</span>)
c2 = Counter(<span class="c-st">'abc'</span>)
c1 - c2   <span class="c-cm"># Counter({'a':1,'b':1,'c':1})  — resta (nunca negativos)</span>
c1 + c2   <span class="c-cm"># suma</span>
c1 &amp; c2   <span class="c-cm"># intersección (mínimo)</span>
c1 | c2   <span class="c-cm"># unión (máximo)</span>

<span class="c-cm"># OrderedDict — útil cuando el orden importa para la LÓGICA, no solo la salida</span>
lru = OrderedDict()
<span class="c-kw">def</span> <span class="c-fn">access</span>(key, value):
    <span class="c-kw">if</span> key <span class="c-kw">in</span> lru:
        lru.move_to_end(key)        <span class="c-cm"># marca como "recién usado"</span>
    lru[key] = value
    <span class="c-kw">if</span> <span class="c-bi">len</span>(lru) &gt; <span class="c-nb">100</span>:
        lru.popitem(last=<span class="c-kw">False</span>)  <span class="c-cm"># descarta el menos usado (el más antiguo)</span></pre></div>
  </div>
  <div id="pd-3" class="tab-panel">
<div class="concept-intro">Patrones que aparecen constantemente en herramientas de bench/CI: despachar acciones sin cadenas de <code>if/elif</code>, memoizar resultados caros, y componer configuración desde múltiples fuentes (defaults, overrides de CLI, variables de entorno) sin copiar datos.</div>
<div class="code-block"><div class="code-lang">Python — Iteración y comprehensions con dicts</div><pre>
d = {<span class="c-st">'a'</span>: <span class="c-nb">1</span>, <span class="c-st">'b'</span>: <span class="c-nb">2</span>, <span class="c-st">'c'</span>: <span class="c-nb">3</span>}

<span class="c-cm"># Iterar — siempre usa .items() para key+value</span>
<span class="c-kw">for</span> key, val <span class="c-kw">in</span> d.items():
    <span class="c-bi">print</span>(key, val)

<span class="c-cm"># Ordenar por valor</span>
<span class="c-bi">sorted</span>(d.items(), key=<span class="c-kw">lambda</span> kv: kv[<span class="c-nb">1</span>], reverse=<span class="c-kw">True</span>)

<span class="c-cm"># get() con default — evita KeyError</span>
count = d.get(<span class="c-st">'missing_key'</span>, <span class="c-nb">0</span>)   <span class="c-cm"># 0 en vez de KeyError</span>

<span class="c-cm"># setdefault — inicializa solo si no existe</span>
d.setdefault(<span class="c-st">'new_key'</span>, []).append(<span class="c-nb">42</span>)

<span class="c-cm"># Dict comprehension — filtrar o transformar</span>
activos = {k: v <span class="c-kw">for</span> k, v <span class="c-kw">in</span> benches.items() <span class="c-kw">if</span> v[<span class="c-st">'status'</span>] == <span class="c-st">'online'</span>}
<span class="c-cm"># Intercambiar key/value</span>
inv = {v: k <span class="c-kw">for</span> k, v <span class="c-kw">in</span> d.items()}

<span class="c-cm"># Dict comprehension con if/else en el valor (no es filtro, es transformación)</span>
etiqueta = {k: (<span class="c-st">'OK'</span> <span class="c-kw">if</span> v == <span class="c-nb">0</span> <span class="c-kw">else</span> <span class="c-st">'FAIL'</span>) <span class="c-kw">for</span> k, v <span class="c-kw">in</span> error_counts.items()}

<span class="c-cm"># Dict anidado — acceso encadenado seguro con get()</span>
config = {<span class="c-st">'bench_a3'</span>: {<span class="c-st">'timeout'</span>: <span class="c-nb">30</span>}}
timeout = config.get(<span class="c-st">'bench_a3'</span>, {}).get(<span class="c-st">'timeout'</span>, <span class="c-nb">15</span>)  <span class="c-cm"># 30, o 15 si falta cualquier nivel</span></pre></div>
<div class="code-block"><div class="code-lang">Python — Patrones avanzados con dicts</div><pre>
<span class="c-cm"># Dict como switch/case (antes de Python 3.10)</span>
actions = {
    <span class="c-st">'start'</span>:  <span class="c-kw">lambda</span>: start_bench(),
    <span class="c-st">'stop'</span>:   <span class="c-kw">lambda</span>: stop_bench(),
    <span class="c-st">'reset'</span>:  <span class="c-kw">lambda</span>: reset_bench(),
}
actions.get(command, <span class="c-kw">lambda</span>: <span class="c-bi">print</span>(<span class="c-st">"unknown"</span>))()

<span class="c-cm"># Memoización manual</span>
_cache = {}
<span class="c-kw">def</span> <span class="c-fn">expensive_analysis</span>(key):
    <span class="c-kw">if</span> key <span class="c-kw">not in</span> _cache:
        _cache[key] = run_analysis(key)
    <span class="c-kw">return</span> _cache[key]

<span class="c-cm"># ChainMap — busca en múltiples dicts en orden, sin copiar ni mergear</span>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> ChainMap
defaults = {<span class="c-st">'timeout'</span>: <span class="c-nb">30</span>, <span class="c-st">'retries'</span>: <span class="c-nb">3</span>}
overrides = {<span class="c-st">'timeout'</span>: <span class="c-nb">60</span>}
config = ChainMap(overrides, defaults)
config[<span class="c-st">'timeout'</span>]   <span class="c-cm"># 60 (del override)</span>
config[<span class="c-st">'retries'</span>]   <span class="c-cm"># 3 (del default)</span>

<span class="c-cm"># Agrupar registros por campo — patrón "groupby" con defaultdict(list)</span>
resultados = [
    {<span class="c-st">'bench'</span>: <span class="c-st">'a3'</span>, <span class="c-st">'status'</span>: <span class="c-st">'PASSED'</span>},
    {<span class="c-st">'bench'</span>: <span class="c-st">'a3'</span>, <span class="c-st">'status'</span>: <span class="c-st">'FAILED'</span>},
    {<span class="c-st">'bench'</span>: <span class="c-st">'b1'</span>, <span class="c-st">'status'</span>: <span class="c-st">'PASSED'</span>},
]
por_bench = defaultdict(<span class="c-bi">list</span>)
<span class="c-kw">for</span> r <span class="c-kw">in</span> resultados:
    por_bench[r[<span class="c-st">'bench'</span>]].append(r[<span class="c-st">'status'</span>])
<span class="c-cm"># {'a3': ['PASSED','FAILED'], 'b1': ['PASSED']}</span>

<span class="c-cm"># Merge de configuración con | (crea dict nuevo, no muta ninguno de los dos)</span>
base_cfg = {<span class="c-st">'log_level'</span>: <span class="c-st">'INFO'</span>, <span class="c-st">'timeout'</span>: <span class="c-nb">30</span>}
cli_cfg  = {<span class="c-st">'timeout'</span>: <span class="c-nb">5</span>}
final_cfg = base_cfg | cli_cfg   <span class="c-cm"># {'log_level':'INFO', 'timeout':5}</span></pre></div>
  </div>
  <div id="pd-4" class="tab-panel">
<div class="concept-intro">Estos son los errores con dicts que más aparecen tanto en entrevistas como en scripts reales de bench/CI. La mayoría comparte una causa raíz: tratar el dict como si tuviera garantías que no tiene (todas las keys existen, el orden de iteración es libre de cambiar, copiar es siempre "independizar").</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>timeout = config[<span class="c-st">'timeout'</span>]
<span class="c-cm"># KeyError: 'timeout' si la key no vino en el JSON de config</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>timeout = config.get(<span class="c-st">'timeout'</span>, <span class="c-nb">30</span>)
<span class="c-cm"># o si de verdad DEBE existir, falla explícito y claro:</span>
<span class="c-kw">if</span> <span class="c-st">'timeout'</span> <span class="c-kw">not in</span> config:
    <span class="c-kw">raise</span> <span class="c-bi">ValueError</span>(<span class="c-st">"config.json debe incluir 'timeout'"</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> el indexado directo <code>d[key]</code> asume que la key siempre está presente. En configs que vienen de JSON externo, argumentos CLI opcionales, o respuestas HTTP, eso casi nunca es cierto. Usa <code>.get()</code> cuando el valor faltante es un caso normal, y una validación explícita con mensaje claro cuando faltar es un bug de configuración que quieres detectar temprano (no un KeyError críptico tres funciones más abajo).</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">for</span> key <span class="c-kw">in</span> resultados:
    <span class="c-kw">if</span> resultados[key] == <span class="c-st">'STALE'</span>:
        <span class="c-kw">del</span> resultados[key]
<span class="c-cm"># RuntimeError: dictionary changed size during iteration</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">for</span> key <span class="c-kw">in</span> <span class="c-bi">list</span>(resultados.keys()):   <span class="c-cm"># copia las keys primero</span>
    <span class="c-kw">if</span> resultados[key] == <span class="c-st">'STALE'</span>:
        <span class="c-kw">del</span> resultados[key]

<span class="c-cm"># Alternativa más Pythónica: reconstruir el dict</span>
resultados = {k: v <span class="c-kw">for</span> k, v <span class="c-kw">in</span> resultados.items() <span class="c-kw">if</span> v != <span class="c-st">'STALE'</span>}</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> Python detecta que el tamaño del dict cambió mientras un iterador seguía activo sobre él (agregar o quitar keys, no solo cambiar valores) y lanza <code>RuntimeError</code> para evitar comportamiento indefinido. La solución es iterar sobre una copia (<code>list(d.keys())</code>) o, mejor, construir un dict nuevo con comprehension en vez de mutar el original in-place.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">registrar_resultado</span>(bench, status, historial={}):  <span class="c-cm"># default mutable!</span>
    historial[bench] = status
    <span class="c-kw">return</span> historial
<span class="c-cm"># cada llamada SIN historial explícito comparte el MISMO dict</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">registrar_resultado</span>(bench, status, historial=<span class="c-kw">None</span>):
    <span class="c-kw">if</span> historial <span class="c-kw">is None</span>:
        historial = {}   <span class="c-cm"># dict nuevo en cada llamada</span>
    historial[bench] = status
    <span class="c-kw">return</span> historial</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> los valores default de parámetros se evalúan <b>una sola vez</b>, cuando se define la función — no en cada llamada. Un <code>{}</code> como default crea un único objeto dict que todas las llamadas sin ese argumento comparten y mutan acumulativamente. Es uno de los gotchas clásicos de Python y aparece seguido en entrevistas. Regla: nunca uses listas, dicts ni sets como default de parámetro; usa <code>None</code> y crea el objeto dentro de la función.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>original = {<span class="c-st">'bench'</span>: <span class="c-st">'a3'</span>, <span class="c-st">'tags'</span>: [<span class="c-st">'hil'</span>, <span class="c-st">'nightly'</span>]}
copia = original.copy()          <span class="c-cm"># copia SUPERFICIAL (shallow)</span>
copia[<span class="c-st">'tags'</span>].append(<span class="c-st">'debug'</span>)
<span class="c-cm"># original['tags'] también cambió — sorpresa</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">import</span> copy
copia = copy.deepcopy(original)  <span class="c-cm"># copia profunda: independiza también los anidados</span>
copia[<span class="c-st">'tags'</span>].append(<span class="c-st">'debug'</span>)  <span class="c-cm"># original NO cambia</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>dict.copy()</code> y <code>dict(original)</code> crean un nuevo dict, pero los valores que son objetos mutables (listas, otros dicts) siguen siendo <b>el mismo objeto</b> referenciado desde ambos dicts. Solo <code>copy.deepcopy()</code> clona recursivamente. Para dicts planos (valores inmutables como int/str) <code>.copy()</code> es suficiente y más rápido; para configs anidadas, usa deepcopy si vas a mutar la copia.</div>
  </div>
  <div id="pd-5" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Usa .get() (o setdefault) en vez de indexado directo cuando la key puede faltar</div>
  <p>Reserva <code>d[key]</code> para cuando la ausencia de la key es un bug real que quieres que explote. Si es un caso normal (config opcional, parámetro CLI no pasado), usa <code>d.get(k, default)</code> — es más corto que try/except y comunica intención.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Construye dicts con comprehensions en vez de loops con d[k]=v</div>
  <p><code>{k: transform(v) for k, v in items}</code> es más corto, evita bugs de inicialización, y dice explícitamente "esto construye un dict nuevo" en vez de mutar uno existente.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Prefiere defaultdict/Counter a manejar KeyError manualmente para agrupar o contar</div>
  <p>Si tu código tiene un <code>if key not in d: d[key] = ...</code> antes de acumular, casi siempre es una señal de que quieres <code>defaultdict(list)</code>, <code>defaultdict(int)</code> o <code>Counter</code>. Menos líneas, menos lugares donde olvidar el caso inicial.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa | y |= (Python 3.9+) para mergear configs de forma explícita</div>
  <p><code>final = defaults | overrides</code> deja claro, en una línea, quién gana en caso de conflicto (el de la derecha) y no muta ninguno de los dos dicts originales — más seguro que <code>update()</code> cuando ambos dicts se siguen usando después.</p>
</div>
<div class="practice-card">
  <div class="practice-title">No abuses del dict genérico para estructuras con forma fija — considera dataclass o TypedDict</div>
  <p>Si siempre esperas las mismas keys (<code>{'bench_id':..., 'status':..., 'duration':...}</code>), un <code>dict</code> no valida nada: un typo en la key falla en silencio o con KeyError lejos de la causa. Un <code>@dataclass</code> o <code>TypedDict</code> da autocompletado, chequeo estático y documenta la forma esperada.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Copia explícita: .copy() para planos, copy.deepcopy() para anidados</div>
  <p>Antes de pasar un dict a una función que podría mutarlo, decide conscientemente si compartir referencia es correcto. Si no, copia — y si el dict tiene listas/dicts anidados, usa <code>deepcopy</code>, no <code>.copy()</code>.</p>
</div>
  </div>
  <div id="pd-6" class="tab-panel">
<div class="concept-intro">Esta sección es para practicar, no para leer. Antes de hacer click en cada ejercicio, intenta resolverlo por tu cuenta (en papel, en un intérprete, o mentalmente). Al revelar la respuesta verás primero la <b>salida esperada</b> — úsala para verificar tu propio resultado — y después el <b>procedimiento completo paso a paso</b> con la solución comentada. Progresión: 3 ejercicios básicos, 3 intermedios y 2 complejos.</div>

<div class="exercise-steps-label">🟢 Básico</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-basico">BÁSICO</span>
    <span>Escribe una función <code>contar_codigos(codigos)</code> que reciba una lista de códigos de error (strings, con posibles repetidos) y devuelva un diccionario con la cantidad de veces que aparece cada código.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>contar_codigos(['P0300','P0171','P0300','P0420','P0171','P0300']) → {'P0300': 3, 'P0171': 2, 'P0420': 1}</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Crea un diccionario vacío que acumulará el conteo de cada código.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Recorre la lista con un <code>for</code> y usa <code>dict.get(code, 0) + 1</code> para incrementar el contador sin necesidad de comprobar antes si la key existe (evita <code>KeyError</code>).</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Devuelve el diccionario una vez terminado el recorrido.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">contar_codigos</span>(codigos):
    conteo = {}
    <span class="c-kw">for</span> c <span class="c-kw">in</span> codigos:
        conteo[c] = conteo.get(c, <span class="c-nb">0</span>) + <span class="c-nb">1</span>
    <span class="c-kw">return</span> conteo</pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-basico">BÁSICO</span>
    <span>Tienes un diccionario que mapea número de pin GPIO → nombre del sensor conectado (los valores son únicos). Escribe una función <code>invertir(pines)</code> que devuelva el diccionario invertido: nombre del sensor → número de pin.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>invertir({12: 'lidar_front', 13: 'imu_main', 27: 'cam_left'}) → {'lidar_front': 12, 'imu_main': 13, 'cam_left': 27}</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Recorre el diccionario original con <code>.items()</code> para obtener pares key-value.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Construye un dict comprehension intercambiando key y value: <code>{v: k for k, v in d.items()}</code>. Solo funciona sin pérdida de información si los valores originales son únicos (si se repiten, keys posteriores sobreescriben a las anteriores).</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">invertir</span>(pines):
    <span class="c-kw">return</span> {v: k <span class="c-kw">for</span> k, v <span class="c-kw">in</span> pines.items()}</pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-basico">BÁSICO</span>
    <span>Escribe una función <code>combinar_config(defaults, overrides)</code> que reciba dos diccionarios de configuración y devuelva uno nuevo donde los valores de <code>overrides</code> tengan prioridad. Ninguno de los dos diccionarios originales debe modificarse.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>combinar_config({'timeout':30,'retries':3,'log_level':'INFO'}, {'timeout':5,'log_level':'DEBUG'}) → {'timeout': 5, 'retries': 3, 'log_level': 'DEBUG'}</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Usa el operador <code>|</code> (Python 3.9+) para mezclar los dos diccionarios: crea uno nuevo sin mutar ninguno de los originales.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Coloca <code>overrides</code> a la derecha del <code>|</code> — en un merge con <code>|</code>, el dict de la derecha gana en caso de key repetida.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">combinar_config</span>(defaults, overrides):
    <span class="c-kw">return</span> defaults | overrides</pre></div>
  </div>
</div>

<div class="exercise-steps-label">🟡 Intermedio</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-intermedio">INTERMEDIO</span>
    <span>Escribe una función <code>agrupar_por_bench(resultados)</code> que reciba una lista de resultados de pruebas (diccionarios con las keys <code>'bench'</code> y <code>'status'</code>) y devuelva un diccionario que agrupe los status por bench.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>[{'bench':'a3','status':'PASSED'},{'bench':'a3','status':'FAILED'},{'bench':'b1','status':'PASSED'}] → {'a3': ['PASSED', 'FAILED'], 'b1': ['PASSED']}</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Importa <code>defaultdict(list)</code> de <code>collections</code> para no tener que inicializar manualmente cada key nueva con una lista vacía.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Recorre la lista de resultados y en cada iteración agrega el status a <code>por_bench[r['bench']]</code> con <code>.append()</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Convierte el resultado a <code>dict</code> normal antes de devolverlo, para que quien lo consuma no dependa del comportamiento "crea key al acceder" de <code>defaultdict</code>.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> defaultdict

<span class="c-kw">def</span> <span class="c-fn">agrupar_por_bench</span>(resultados):
    por_bench = defaultdict(<span class="c-bi">list</span>)
    <span class="c-kw">for</span> r <span class="c-kw">in</span> resultados:
        por_bench[r[<span class="c-st">'bench'</span>]].append(r[<span class="c-st">'status'</span>])
    <span class="c-kw">return</span> <span class="c-bi">dict</span>(por_bench)</pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-intermedio">INTERMEDIO</span>
    <span>Tienes una lista larga de niveles de log capturados durante una corrida nocturna (strings como <code>'INFO'</code>, <code>'ERROR'</code>, <code>'WARN'</code>...). Escribe una función <code>top_niveles(logs, n=3)</code> que devuelva los <code>n</code> niveles más frecuentes junto con su conteo, ordenados de mayor a menor frecuencia.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>top_niveles(['ERROR','INFO','ERROR','WARN','ERROR','INFO','DEBUG','WARN','ERROR']) → [('ERROR', 4), ('INFO', 2), ('WARN', 2)]</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Importa <code>Counter</code> de <code>collections</code> — es un dict especializado exactamente para este tipo de conteo.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Construye el Counter pasándole la lista completa: <code>Counter(logs)</code> cuenta automáticamente cada elemento, sin loop manual.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Usa <code>.most_common(n)</code> para obtener directamente los <code>n</code> elementos más frecuentes, ya ordenados de mayor a menor.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> Counter

<span class="c-kw">def</span> <span class="c-fn">top_niveles</span>(logs, n=<span class="c-nb">3</span>):
    conteo = Counter(logs)
    <span class="c-kw">return</span> conteo.most_common(n)</pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-intermedio">INTERMEDIO</span>
    <span>Escribe una función <code>a_volts_validos(lecturas)</code> que reciba un diccionario de lecturas de sensores (id → valor en milivolts) y devuelva un nuevo diccionario solo con las lecturas válidas (valor mayor a 0), convertidas a volts (dividido entre 1000) y redondeadas a 2 decimales.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>a_volts_validos({'s1': 3300, 's2': -1, 's3': 5000, 's4': 0}) → {'s1': 3.3, 's3': 5.0}</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Usa un dict comprehension recorriendo <code>.items()</code> con una condición <code>if v &gt; 0</code> para filtrar las lecturas inválidas o apagadas.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>En la misma comprehension, transforma el valor con <code>round(v / 1000, 2)</code>: filtrar y transformar se hacen en un solo paso, sin loop intermedio.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">a_volts_validos</span>(lecturas):
    <span class="c-kw">return</span> {k: <span class="c-bi">round</span>(v / <span class="c-nb">1000</span>, <span class="c-nb">2</span>) <span class="c-kw">for</span> k, v <span class="c-kw">in</span> lecturas.items() <span class="c-kw">if</span> v &gt; <span class="c-nb">0</span>}</pre></div>
  </div>
</div>

<div class="exercise-steps-label">🔴 Complejo</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-complejo">COMPLEJO</span>
    <span>Tienes una lista de eventos de telemetría, cada uno un diccionario con <code>'vehiculo'</code>, <code>'dia'</code> y <code>'latencia_ms'</code>. Escribe <code>agrupar_telemetria(eventos)</code> que devuelva un dict anidado <code>vehiculo → dia → lista de latencias</code>, y <code>promedios_por_vehiculo(agrupado)</code> que a partir de esa estructura calcule el promedio de latencia por vehículo y día (redondeado a 2 decimales).</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>agrupado = {'v1': {'lun': [120, 100], 'mar': [90]}, 'v2': {'lun': [200]}}  →  promedios = {'v1': {'lun': 110.0, 'mar': 90.0}, 'v2': {'lun': 200.0}}</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Usa <code>defaultdict(lambda: defaultdict(list))</code> para el agrupamiento: el primer nivel (vehículo) crea automáticamente un <code>defaultdict(list)</code> para el segundo nivel (día), sin inicializar nada a mano.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Recorre los eventos y agrega cada latencia con <code>agrupado[e['vehiculo']][e['dia']].append(e['latencia_ms'])</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Convierte la estructura a dicts normales antes de devolverla (comprehension anidada: <code>{v: dict(dias) for v, dias in agrupado.items()}</code>), para no exponer un <code>defaultdict</code> hacia afuera.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 4</div><div class="plan-content"><p>Para los promedios, recorre el dict anidado con una comprehension de dos niveles y calcula <code>sum(latencias) / len(latencias)</code> por cada combinación vehículo/día.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> defaultdict

<span class="c-kw">def</span> <span class="c-fn">agrupar_telemetria</span>(eventos):
    agrupado = defaultdict(<span class="c-kw">lambda</span>: defaultdict(<span class="c-bi">list</span>))
    <span class="c-kw">for</span> e <span class="c-kw">in</span> eventos:
        agrupado[e[<span class="c-st">'vehiculo'</span>]][e[<span class="c-st">'dia'</span>]].append(e[<span class="c-st">'latencia_ms'</span>])
    <span class="c-kw">return</span> {v: <span class="c-bi">dict</span>(dias) <span class="c-kw">for</span> v, dias <span class="c-kw">in</span> agrupado.items()}

<span class="c-kw">def</span> <span class="c-fn">promedios_por_vehiculo</span>(agrupado):
    <span class="c-kw">return</span> {
        v: {dia: <span class="c-bi">round</span>(<span class="c-bi">sum</span>(latencias) / <span class="c-bi">len</span>(latencias), <span class="c-nb">2</span>) <span class="c-kw">for</span> dia, latencias <span class="c-kw">in</span> dias.items()}
        <span class="c-kw">for</span> v, dias <span class="c-kw">in</span> agrupado.items()
    }</pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-complejo">COMPLEJO</span>
    <span>Escribe una función <code>merge_profundo(base, override)</code> que combine dos diccionarios de configuración anidados de forma recursiva: si una key existe en ambos y ambos valores son diccionarios, se combinan recursivamente; en cualquier otro caso, el valor de <code>override</code> gana. Ninguno de los dos diccionarios originales debe modificarse.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>base={'log_level':'INFO','timeouts':{'connect':5,'read':30},'sensors':{'lidar':{'enabled':True,'rate_hz':10}}}, override={'timeouts':{'read':60},'sensors':{'lidar':{'rate_hz':20},'imu':{'enabled':True}}}  →  {'log_level': 'INFO', 'timeouts': {'connect': 5, 'read': 60}, 'sensors': {'lidar': {'enabled': True, 'rate_hz': 20}, 'imu': {'enabled': True}}}</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Copia <code>base</code> con <code>dict(base)</code> para no mutar el diccionario original — basta con una copia superficial porque solo reasignamos keys del nivel actual, nunca mutamos los sub-dicts existentes in-place.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Recorre las keys de <code>override</code> una por una.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Si la key ya existe en el resultado <b>y</b> tanto el valor actual como el de <code>override</code> son diccionarios (verifica con <code>isinstance(x, dict)</code> en ambos), llama a <code>merge_profundo</code> recursivamente sobre ese par para combinarlos en profundidad en vez de sobreescribir todo el sub-dict.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 4</div><div class="plan-content"><p>En cualquier otro caso (key nueva, o el valor no es un dict en alguno de los dos lados), sobreescribe directamente: <code>resultado[key] = val</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 5</div><div class="plan-content"><p>Devuelve <code>resultado</code> al terminar de recorrer todas las keys de <code>override</code>. La recursión termina porque cada llamada opera sobre un nivel de anidamiento menos.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">merge_profundo</span>(base, override):
    resultado = <span class="c-bi">dict</span>(base)
    <span class="c-kw">for</span> key, val <span class="c-kw">in</span> override.items():
        <span class="c-kw">if</span> key <span class="c-kw">in</span> resultado <span class="c-kw">and</span> <span class="c-bi">isinstance</span>(resultado[key], <span class="c-bi">dict</span>) <span class="c-kw">and</span> <span class="c-bi">isinstance</span>(val, <span class="c-bi">dict</span>):
            resultado[key] = <span class="c-fn">merge_profundo</span>(resultado[key], val)
        <span class="c-kw">else</span>:
            resultado[key] = val
    <span class="c-kw">return</span> resultado</pre></div>
  </div>
</div>
  </div>
  <div id="pd-7" class="tab-panel">
<div class="concept-intro">Los <b>18 ejercicios completos</b> de la carpeta <code>Ejercicios_Python/Ejercicios_Diccionarios</code> del repositorio, con su enunciado y solución tal como están guardados — para tenerlos siempre a mano sin salir de la app.</div>
<div class="tab-group-pdex">
  <div class="tab-bar" style="flex-wrap:wrap">
    <button class="tab-btn active" onclick="switchTab(this,'pdex-1','pdex')">1. Creación</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-2','pdex')">2. Modificación</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-3','pdex')">3. Vistas</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-4','pdex')">4. Funciones</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-5','pdex')">5. Ordenamiento</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-6','pdex')">6. Bucles</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-7','pdex')">7. Unión</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-8','pdex')">8. Localizador de Fallos</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-9','pdex')">9. Anidados</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-10','pdex')">10. Copy</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-11','pdex')">11. Comprehension</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-12','pdex')">12. Inversión</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-13','pdex')">13. Sincronización</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-14','pdex')">14. Extraer (kwargs)</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-15','pdex')">15. DeepCopy</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-16','pdex')">16. Limpiar Duplicados</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-17','pdex')">17. Formateo Reporte</button>
    <button class="tab-btn" onclick="switchTab(this,'pdex-18','pdex')">18. BigO</button>
  </div>

  <div id="pdex-1" class="tab-panel active">
<div class="code-block"><div class="code-lang">1_Creacion_Diccionarios.py</div><pre>
<span class="c-st">"""
1. LA FICHA TÉCNICA DEL DISPOSITIVO
Objetivo: Aprender a crear diccionarios y acceder a sus valores por clave.

- Crea un diccionario llamado 'dispositivo' con las claves "nombre", "modelo",
  "voltaje" y "estado" (ej. "OK").
- Imprime el valor de "nombre" usando corchetes [].
- Imprime el valor de "voltaje" usando el método .get().
- Intenta acceder a una clave que no existe (ej. "fabricante") usando .get()
  con un valor por defecto "Desconocido", para evitar un error.
"""</span>

dispositivo = {
    <span class="c-st">"nombre"</span>: <span class="c-st">"Sensor_Termico_01"</span>,
    <span class="c-st">"modelo"</span>: <span class="c-st">"ST-2200"</span>,
    <span class="c-st">"voltaje"</span>: <span class="c-nb">5.0</span>,
    <span class="c-st">"estado"</span>: <span class="c-st">"OK"</span>
}

<span class="c-bi">print</span>(dispositivo[<span class="c-st">"nombre"</span>])
<span class="c-bi">print</span>(dispositivo.get(<span class="c-st">"voltaje"</span>))
<span class="c-bi">print</span>(dispositivo.get(<span class="c-st">"fabricante"</span>, <span class="c-st">"Desconocido"</span>))</pre></div>
  </div>

  <div id="pdex-2" class="tab-panel">
<div class="code-block"><div class="code-lang">2_Modificacion_Diccionarios.py</div><pre>
<span class="c-st">"""
2. GESTIÓN DE CONFIGURACIÓN DE PRUEBA
Objetivo: Practicar la inserción, actualización y eliminación dinámica de claves.

- Crea un diccionario vacío llamado 'config_test'.
- Agrega 3 claves con sus valores usando asignación directa (ej. config_test["puerto"] = "COM3").
- Actualiza el valor de una clave existente.
- Elimina una clave con .pop() y otra con del.
"""</span>

config_test = {}

config_test[<span class="c-st">"puerto"</span>] = <span class="c-st">"COM3"</span>
config_test[<span class="c-st">"baudrate"</span>] = <span class="c-nb">9600</span>
config_test[<span class="c-st">"timeout"</span>] = <span class="c-nb">5</span>
<span class="c-bi">print</span>(config_test)

config_test[<span class="c-st">"baudrate"</span>] = <span class="c-nb">115200</span>
<span class="c-bi">print</span>(config_test)

valor_eliminado = config_test.pop(<span class="c-st">"timeout"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"# Nota: Se eliminó 'timeout' con valor '{valor_eliminado}' usando .pop()."</span>)
<span class="c-bi">print</span>(config_test)

<span class="c-kw">del</span> config_test[<span class="c-st">"puerto"</span>]
<span class="c-bi">print</span>(f<span class="c-st">"# Nota: Se eliminó 'puerto' usando 'del'."</span>)
<span class="c-bi">print</span>(config_test)</pre></div>
  </div>

  <div id="pdex-3" class="tab-panel">
<div class="code-block"><div class="code-lang">3_Vistas_Diccionarios.py</div><pre>
<span class="c-st">"""
3. EL EXTRACTOR DE VISTAS
Objetivo: Extraer subconjuntos de datos de un diccionario de configuración.

- Crea un diccionario 'sensor' con al menos 4 pares clave-valor.
- Extrae e imprime todas las claves usando .keys().
- Extrae e imprime todos los valores usando .values().
- Extrae e imprime todos los pares clave-valor usando .items().
- Convierte el resultado de .keys() en una lista real con list().
"""</span>

<span class="c-cm"># A. Diccionario de configuración de un sensor</span>
sensor = {
    <span class="c-st">"id"</span>: <span class="c-st">"SNS-014"</span>,
    <span class="c-st">"tipo"</span>: <span class="c-st">"Presion"</span>,
    <span class="c-st">"unidad"</span>: <span class="c-st">"bar"</span>,
    <span class="c-st">"activo"</span>: <span class="c-kw">True</span>
}

<span class="c-cm"># B. Extrae todas las claves con .keys()</span>
claves = sensor.keys()
<span class="c-bi">print</span>(f<span class="c-st">"Claves: {claves}"</span>)  <span class="c-cm"># Salida: dict_keys(['id', 'tipo', 'unidad', 'activo'])</span>

<span class="c-cm"># C. Extrae todos los valores con .values()</span>
valores = sensor.values()
<span class="c-bi">print</span>(f<span class="c-st">"Valores: {valores}"</span>)  <span class="c-cm"># Salida: dict_values(['SNS-014', 'Presion', 'bar', True])</span>

<span class="c-cm"># D. Extrae todos los pares con .items()</span>
pares = sensor.items()
<span class="c-bi">print</span>(f<span class="c-st">"Pares clave-valor: {pares}"</span>)

<span class="c-cm"># E. Convierte .keys() en una lista real con list()
# NOTA: .keys() devuelve una "vista", no una lista. Si necesitas indexar
# o manipularla como lista (ej. lista_claves[0]), debes convertirla.</span>
lista_claves = <span class="c-bi">list</span>(claves)
<span class="c-bi">print</span>(f<span class="c-st">"Claves como lista: {lista_claves}"</span>)  <span class="c-cm"># Salida: ['id', 'tipo', 'unidad', 'activo']</span></pre></div>
  </div>

  <div id="pdex-4" class="tab-panel">
<div class="code-block"><div class="code-lang">4_Funciones_Diccionarios.py</div><pre>
<span class="c-st">"""
4. ANÁLISIS DE LECTURAS POR SENSOR
Objetivo: Usar matemáticas básicas sobre los valores de un diccionario.

- Crea un diccionario 'lecturas' donde cada clave es el nombre de un sensor
  y el valor es su última lectura numérica.
- Calcula la suma total y el promedio de las lecturas usando .values().
- Encuentra cuál es el sensor con el valor MÁS ALTO usando max() con key=.
- Verifica si la clave "Temp_Motor" existe en el diccionario usando 'in'.
"""</span>

<span class="c-cm"># A. Diccionario de lecturas por sensor</span>
lecturas = {
    <span class="c-st">"Temp_Motor"</span>: <span class="c-nb">85.5</span>,
    <span class="c-st">"Presion_Aceite"</span>: <span class="c-nb">40.2</span>,
    <span class="c-st">"Nivel_Bateria"</span>: <span class="c-nb">12.6</span>,
    <span class="c-st">"Temp_Ambiente"</span>: <span class="c-nb">22.3</span>
}

<span class="c-cm"># B. Suma total y promedio usando .values()</span>
suma_total = <span class="c-bi">sum</span>(lecturas.values())
promedio = suma_total / <span class="c-bi">len</span>(lecturas)
<span class="c-bi">print</span>(f<span class="c-st">"Suma total de lecturas: {suma_total}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Promedio general: {promedio:.2f}"</span>)

<span class="c-cm"># C. Sensor con el valor más alto usando max() con key=
# 'key=lecturas.get' le dice a max() que compare por el VALOR de cada clave,
# no por el nombre de la clave en sí (que compararía alfabéticamente).</span>
sensor_max = <span class="c-bi">max</span>(lecturas, key=lecturas.get)
<span class="c-bi">print</span>(f<span class="c-st">"Sensor con la lectura más alta: {sensor_max} ({lecturas[sensor_max]})"</span>)

<span class="c-cm"># D. Verifica si la clave "Temp_Motor" existe usando 'in'
# En diccionarios, 'in' revisa las CLAVES, no los valores. Es una operación O(1).</span>
<span class="c-kw">if</span> <span class="c-st">"Temp_Motor"</span> <span class="c-kw">in</span> lecturas:
    <span class="c-bi">print</span>(<span class="c-st">"✅ El sensor 'Temp_Motor' está registrado."</span>)
<span class="c-kw">else</span>:
    <span class="c-bi">print</span>(<span class="c-st">"❌ El sensor 'Temp_Motor' no se encuentra registrado."</span>)</pre></div>
  </div>

  <div id="pdex-5" class="tab-panel">
<div class="code-block"><div class="code-lang">5_Ordenamiento_Diccionarios.py</div><pre>
<span class="c-st">"""
5. RANKING DE ERRORES POR FRECUENCIA
Objetivo: Ordenar un diccionario según sus claves o sus valores.

- Crea un diccionario 'conteo_errores' donde cada clave es un ID de error
  y el valor es cuántas veces ocurrió.
- Ordena las claves alfabéticamente usando sorted() sobre el diccionario.
- Ordena los pares (clave, valor) de mayor a menor frecuencia usando
  sorted() con .items() y una función lambda como key.
"""</span>

<span class="c-cm"># A. Diccionario con la frecuencia de cada error detectado</span>
conteo_errores = {<span class="c-st">"ERR-05"</span>: <span class="c-nb">3</span>, <span class="c-st">"ERR-01"</span>: <span class="c-nb">7</span>, <span class="c-st">"ERR-08"</span>: <span class="c-nb">1</span>, <span class="c-st">"ERR-03"</span>: <span class="c-nb">5</span>}

<span class="c-cm"># B. Ordena las claves alfabéticamente
# sorted() sobre un diccionario itera y ordena SUS CLAVES por defecto.</span>
claves_ordenadas = <span class="c-bi">sorted</span>(conteo_errores)
<span class="c-bi">print</span>(f<span class="c-st">"IDs de error ordenados: {claves_ordenadas}"</span>)
<span class="c-cm"># Salida: ['ERR-01', 'ERR-03', 'ERR-05', 'ERR-08']</span>

<span class="c-cm"># C. Ordena los pares (clave, valor) de mayor a menor frecuencia
# .items() nos da tuplas (clave, valor). Usamos una lambda para decirle a
# sorted() que compare por el segundo elemento de la tupla (el valor, x[1]).</span>
ranking = <span class="c-bi">sorted</span>(conteo_errores.items(), key=<span class="c-kw">lambda</span> x: x[<span class="c-nb">1</span>], reverse=<span class="c-kw">True</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Ranking de errores más frecuentes: {ranking}"</span>)
<span class="c-cm"># Salida: [('ERR-01', 7), ('ERR-03', 5), ('ERR-05', 3), ('ERR-08', 1)]</span>

<span class="c-cm"># D. Reporte legible del ranking</span>
<span class="c-bi">print</span>(<span class="c-st">"\\n--- TOP ERRORES DEL SISTEMA ---"</span>)
<span class="c-kw">for</span> id_error, veces <span class="c-kw">in</span> ranking:
    <span class="c-bi">print</span>(f<span class="c-st">"{id_error}: {veces} ocurrencias"</span>)</pre></div>
  </div>

  <div id="pdex-6" class="tab-panel">
<div class="code-block"><div class="code-lang">6_Bucles_Diccionarios.py</div><pre>
<span class="c-st">"""
6. EL FILTRO DE SENSORES CRÍTICOS
Objetivo: Automatizar el filtrado de datos dentro de un diccionario.

- Crea un diccionario 'lecturas' con nombres de sensores y sus valores.
- Crea un diccionario vacío llamado 'criticos'.
- Recorre 'lecturas' con un bucle 'for' usando .items(); si el valor supera
  un umbral (ej. 50), agrégalo a 'criticos'.
- Al final, imprime el conteo total de sensores críticos encontrados.
"""</span>

<span class="c-cm"># A. Diccionario de lecturas mixtas</span>
lecturas = {
    <span class="c-st">"Temp_Motor"</span>: <span class="c-nb">85.5</span>,
    <span class="c-st">"Presion_Aceite"</span>: <span class="c-nb">40.2</span>,
    <span class="c-st">"Nivel_Bateria"</span>: <span class="c-nb">12.6</span>,
    <span class="c-st">"Temp_Escape"</span>: <span class="c-nb">95.0</span>,
    <span class="c-st">"Voltaje_Sistema"</span>: <span class="c-nb">60.1</span>
}

<span class="c-cm"># B. Diccionario vacío para recolectar solo los valores críticos</span>
criticos = {}

<span class="c-cm"># C. Recorremos 'lecturas' con .items() para obtener clave y valor a la vez</span>
<span class="c-kw">for</span> nombre, valor <span class="c-kw">in</span> lecturas.items():
    <span class="c-cm"># D. Lógica de filtrado: Si el valor supera el umbral, es crítico</span>
    <span class="c-kw">if</span> valor &gt; <span class="c-nb">50</span>:
        criticos[nombre] = valor
        <span class="c-bi">print</span>(f<span class="c-st">"⚠️ Sensor crítico detectado: {nombre} = {valor}"</span>)

<span class="c-cm"># E. Resultado final usando len() para el conteo</span>
total_criticos = <span class="c-bi">len</span>(criticos)

<span class="c-bi">print</span>(<span class="c-st">"--- Resumen del Análisis ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Total de sensores procesados: {len(lecturas)}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Total de sensores críticos: {total_criticos}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Detalle de críticos: {criticos}"</span>)</pre></div>
  </div>

  <div id="pdex-7" class="tab-panel">
<div class="code-block"><div class="code-lang">7_Union_Diccionarios.py</div><pre>
<span class="c-st">"""
7. FUSIÓN DE CONFIGURACIONES
Objetivo: Aprender a combinar diccionarios de diferentes fuentes.

- Crea dos diccionarios: 'config_default' y 'config_usuario', donde
  'config_usuario' sobreescribe alguna clave de 'config_default'.
- Crea un tercer diccionario 'config_final' usando el operador '|'.
- Usa el método .update() para agregar un diccionario de 'config_extra'
  a 'config_final'.
- Imprime el diccionario final combinado.
"""</span>

<span class="c-cm"># A. Configuración por defecto y la personalizada por el usuario</span>
config_default = {<span class="c-st">"puerto"</span>: <span class="c-st">"COM1"</span>, <span class="c-st">"baudrate"</span>: <span class="c-nb">9600</span>, <span class="c-st">"timeout"</span>: <span class="c-nb">5</span>}
config_usuario = {<span class="c-st">"baudrate"</span>: <span class="c-nb">115200</span>, <span class="c-st">"modo"</span>: <span class="c-st">"debug"</span>}

<span class="c-cm"># B. Crea 'config_final' usando el operador '|' (Python 3.9+)
# NOTA: En caso de claves repetidas, el diccionario de la DERECHA gana.
# Este operador crea un diccionario NUEVO; los originales no se modifican.</span>
config_final = config_default | config_usuario
<span class="c-bi">print</span>(f<span class="c-st">"# Configuración fusionada: {config_final}"</span>)
<span class="c-cm"># Salida: {'puerto': 'COM1', 'baudrate': 115200, 'timeout': 5, 'modo': 'debug'}</span>

<span class="c-cm"># C. Usa .update() para agregar 'config_extra' a 'config_final'
# NOTA: .update() modifica 'config_final' de forma PERMANENTE (in-place),
# a diferencia de '|' que crea una copia nueva.</span>
config_extra = {<span class="c-st">"reintentos"</span>: <span class="c-nb">3</span>}
config_final.update(config_extra)

<span class="c-cm"># D. Imprime el diccionario final combinado</span>
<span class="c-bi">print</span>(f<span class="c-st">"# Configuración final con extras: {config_final}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"# Cantidad total de parámetros: {len(config_final)}"</span>)</pre></div>
  </div>

  <div id="pdex-8" class="tab-panel">
<div class="code-block"><div class="code-lang">8_LocalizadorFallos_Diccionarios.py</div><pre>
<span class="c-st">"""
8. LOCALIZADOR DE ESTADO POR CLAVE
Objetivo: Consultar de forma segura el estado de componentes en un diccionario.

- Crea un diccionario 'estados' con varios componentes y su estado: "OK" o "FAIL".
- Cuenta cuántos componentes están en estado "FAIL" recorriendo .values().
- Usa .get() para consultar el estado de un componente que podría no existir,
  con un valor por defecto de "NO_REGISTRADO".
- Imprime ambos resultados con mensajes claros.
"""</span>

<span class="c-cm"># A. Diccionario con el estado de cada componente</span>
estados = {
    <span class="c-st">"CPU"</span>: <span class="c-st">"OK"</span>,
    <span class="c-st">"RAM"</span>: <span class="c-st">"FAIL"</span>,
    <span class="c-st">"Disco"</span>: <span class="c-st">"OK"</span>,
    <span class="c-st">"Ventilador"</span>: <span class="c-st">"FAIL"</span>
}

<span class="c-cm"># B. Cuenta cuántos componentes están en "FAIL"
# A diferencia de una lista, un diccionario no tiene .count(), así que
# recorremos los valores y contamos manualmente.</span>
total_fallos = <span class="c-nb">0</span>
<span class="c-kw">for</span> estado <span class="c-kw">in</span> estados.values():
    <span class="c-kw">if</span> estado == <span class="c-st">"FAIL"</span>:
        total_fallos += <span class="c-nb">1</span>

<span class="c-cm"># C. Usa .get() para consultar un componente que podría no existir
# Esto evita un KeyError si "GPU" nunca fue registrada en el diccionario.</span>
estado_gpu = estados.get(<span class="c-st">"GPU"</span>, <span class="c-st">"NO_REGISTRADO"</span>)

<span class="c-cm"># D. Imprime ambos resultados con mensajes profesionales</span>
<span class="c-bi">print</span>(<span class="c-st">"--- REPORTE DE ESTADO DE COMPONENTES ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Total de componentes analizados: {len(estados)}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Número de fallos detectados: {total_fallos}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Estado del componente 'GPU': {estado_gpu}"</span>)</pre></div>
  </div>

  <div id="pdex-9" class="tab-panel">
<div class="code-block"><div class="code-lang">9_Anidados_Diccionarios.py</div><pre>
<span class="c-st">"""
9. FICHERO DE SENSORES ANIDADOS
Objetivo: Acceder a datos en diccionarios dentro de diccionarios.

- Crea un diccionario 'red_sensores' donde cada clave es el ID de un sensor
  y el valor es OTRO diccionario con sus propiedades ("tipo", "valor").
- Accede e imprime el "valor" del sensor "S1".
- Accede e imprime el "tipo" del sensor "S2".
- Recorre todos los sensores e imprime un resumen de cada uno.
"""</span>

<span class="c-cm"># A. Diccionario anidado: cada sensor tiene su propio sub-diccionario de datos</span>
red_sensores = {
    <span class="c-st">"S1"</span>: {<span class="c-st">"tipo"</span>: <span class="c-st">"Temperatura"</span>, <span class="c-st">"valor"</span>: <span class="c-nb">21.5</span>},
    <span class="c-st">"S2"</span>: {<span class="c-st">"tipo"</span>: <span class="c-st">"Presion"</span>, <span class="c-st">"valor"</span>: <span class="c-nb">101.3</span>},
}

<span class="c-cm"># B. Accede al "valor" del sensor "S1"
# Primero entramos a la clave "S1", y de ahí extraemos su clave "valor".</span>
valor_s1 = red_sensores[<span class="c-st">"S1"</span>][<span class="c-st">"valor"</span>]
<span class="c-bi">print</span>(f<span class="c-st">"Valor del sensor S1: {valor_s1}"</span>)  <span class="c-cm"># Salida: 21.5</span>

<span class="c-cm"># C. Accede al "tipo" del sensor "S2"</span>
tipo_s2 = red_sensores[<span class="c-st">"S2"</span>][<span class="c-st">"tipo"</span>]
<span class="c-bi">print</span>(f<span class="c-st">"Tipo del sensor S2: {tipo_s2}"</span>)  <span class="c-cm"># Salida: Presion</span>

<span class="c-cm"># D. TIP TÉCNICO: Puedes recorrer la estructura completa de forma visual</span>
<span class="c-bi">print</span>(<span class="c-st">"\\nResumen de la red de sensores:"</span>)
<span class="c-kw">for</span> id_sensor, propiedades <span class="c-kw">in</span> red_sensores.items():
    <span class="c-bi">print</span>(f<span class="c-st">"  {id_sensor} -&gt; Tipo: {propiedades['tipo']}, Valor: {propiedades['valor']}"</span>)</pre></div>
  </div>

  <div id="pdex-10" class="tab-panel">
<div class="code-block"><div class="code-lang">10_Copy_Diccionarios.py</div><pre>
<span class="c-st">"""
10. RESPALDO DE CONFIGURACIÓN
Objetivo: Aprender a resetear datos sin perder la referencia original.

- Crea un diccionario 'estado_actual' con 3 pares clave-valor.
- Crea una copia de seguridad llamada 'backup' usando .copy().
- Vacía el diccionario original 'estado_actual' usando .clear().
- Imprime ambos diccionarios para demostrar que el backup sobrevivió.
"""</span>

<span class="c-cm"># A. Diccionario con el estado actual del sistema</span>
estado_actual = {<span class="c-st">"cpu"</span>: <span class="c-st">"OK"</span>, <span class="c-st">"ram"</span>: <span class="c-st">"OK"</span>, <span class="c-st">"disco"</span>: <span class="c-st">"WARNING"</span>}

<span class="c-cm"># B. Crea una copia de seguridad llamada 'backup' usando .copy()
# Como AI Software Test Engineer, esto permite guardar evidencias antes
# de que el sistema reinicie el estado para la siguiente prueba.</span>
backup = estado_actual.copy()

<span class="c-cm"># C. Vacía el diccionario original usando .clear()
# Esto simula un "Reset" de configuración tras procesar los datos.</span>
estado_actual.clear()

<span class="c-cm"># D. Imprime ambos diccionarios para demostrar que el backup sobrevivió</span>
<span class="c-bi">print</span>(<span class="c-st">"--- GESTIÓN DE MEMORIA ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Estado Actual (Original): {estado_actual}"</span>)  <span class="c-cm"># Salida: {}</span>
<span class="c-bi">print</span>(f<span class="c-st">"Estado del Backup (Copia): {backup}"</span>)         <span class="c-cm"># Salida: {'cpu': 'OK', 'ram': 'OK', 'disco': 'WARNING'}</span>

<span class="c-cm"># E. PRUEBA DE IDENTIDAD:
# Verificamos si son objetos diferentes en la memoria RAM.</span>
<span class="c-kw">if</span> estado_actual <span class="c-kw">is not</span> backup:
    <span class="c-bi">print</span>(<span class="c-st">"✅ Confirmado: Son objetos independientes en memoria."</span>)</pre></div>
  </div>

  <div id="pdex-11" class="tab-panel">
<div class="code-block"><div class="code-lang">11_ComprehensionDict_Diccionarios.py</div><pre>
<span class="c-st">"""
11. FILTRO VELOZ (DICT COMPREHENSION)
Objetivo: Reducir un bucle for de varias líneas a solo 1 con Dict Comprehension.

- Tienes un diccionario: valores = {"S1": 10, "S2": 120, "S3": 80, "S4": 200}.
- Crea un nuevo diccionario 'criticos' que solo contenga los pares
  cuyo valor sea mayor a 100.
- Hazlo en UNA SOLA LÍNEA de código usando Dict Comprehension.
- Imprime el diccionario 'criticos'.
"""</span>

<span class="c-cm"># A. Diccionario de valores de sensores</span>
valores = {<span class="c-st">"S1"</span>: <span class="c-nb">10</span>, <span class="c-st">"S2"</span>: <span class="c-nb">120</span>, <span class="c-st">"S3"</span>: <span class="c-nb">80</span>, <span class="c-st">"S4"</span>: <span class="c-nb">200</span>}

<span class="c-cm"># B. Crea 'criticos' con valores &gt; 100 en UNA SOLA LÍNEA
# Esto sustituye a un bucle 'for' de varias líneas.</span>
criticos = {clave: valor <span class="c-kw">for</span> clave, valor <span class="c-kw">in</span> valores.items() <span class="c-kw">if</span> valor &gt; <span class="c-nb">100</span>}

<span class="c-cm"># C. Imprime el diccionario resultante</span>
<span class="c-bi">print</span>(<span class="c-st">"--- ANÁLISIS DE UMBRAL CRÍTICO ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Valores originales: {valores}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Lecturas críticas (&gt;100): {criticos}"</span>)  <span class="c-cm"># Salida: {'S2': 120, 'S4': 200}</span></pre></div>
  </div>

  <div id="pdex-12" class="tab-panel">
<div class="code-block"><div class="code-lang">12_Inversion_Diccionarios.py</div><pre>
<span class="c-st">"""
12. INVERSIÓN CLAVE-VALOR
Objetivo: Transformar un diccionario intercambiando claves por valores.

- Crea un diccionario 'codigos' donde la clave es un ID y el valor es
  una descripción (ej. {"E01": "Fallo_Sensor", "E02": "Fallo_Comunicacion"}).
- Crea un diccionario 'codigos_inv' donde los valores originales pasen
  a ser las claves, y las claves originales pasen a ser los valores.
- Hazlo usando Dict Comprehension.
- Explica en un comentario qué pasaría si hubiera valores duplicados.
"""</span>

<span class="c-cm"># A. Diccionario original de códigos de error</span>
codigos = {<span class="c-st">"E01"</span>: <span class="c-st">"Fallo_Sensor"</span>, <span class="c-st">"E02"</span>: <span class="c-st">"Fallo_Comunicacion"</span>, <span class="c-st">"E03"</span>: <span class="c-st">"Fallo_Alimentacion"</span>}

<span class="c-cm"># B. Invierte el diccionario usando Dict Comprehension
# Recorremos los pares (clave, valor) y los reescribimos como (valor, clave).</span>
codigos_inv = {valor: clave <span class="c-kw">for</span> clave, valor <span class="c-kw">in</span> codigos.items()}

<span class="c-cm"># C. Resultados</span>
<span class="c-bi">print</span>(<span class="c-st">"--- INVERSIÓN DE DICCIONARIO ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Original: {codigos}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Invertido: {codigos_inv}"</span>)
<span class="c-cm"># Salida: {'Fallo_Sensor': 'E01', 'Fallo_Comunicacion': 'E02', 'Fallo_Alimentacion': 'E03'}</span>

<span class="c-cm"># D. EXPLICACIÓN TÉCNICA (Comentario crítico para entrevista):</span>
<span class="c-st">"""
RIESGO DE VALORES DUPLICADOS:
Las claves de un diccionario deben ser ÚNICAS. Si dos claves originales
tuvieran el mismo valor (ej. "E01": "Fallo" y "E04": "Fallo"), al invertir
la última en procesarse SOBRESCRIBIRÍA a la anterior, y perderías uno
de los códigos de error en la inversión.
"""</span></pre></div>
  </div>

  <div id="pdex-13" class="tab-panel">
<div class="code-block"><div class="code-lang">13_Sincronizacion_Diccionarios.py</div><pre>
<span class="c-st">"""
13. CONSTRUCCIÓN DE REPORTE DESDE DOS LISTAS
Objetivo: Combinar dos listas paralelas en un solo diccionario de forma eficiente.

- Tienes dos listas: 'nombres_sensores' y 'lecturas_actuales'.
- Usa 'zip()' junto con dict() para construir un diccionario 'reporte'
  que una cada nombre con su lectura correspondiente.
- Recorre el diccionario resultante con .items() e imprime un mensaje
  por cada sensor.
"""</span>

nombres_sensores = [<span class="c-st">"Temp_Motor"</span>, <span class="c-st">"Presion_Aceite"</span>, <span class="c-st">"Nivel_Bateria"</span>]
lecturas_actuales = [<span class="c-nb">85.5</span>, <span class="c-nb">40.2</span>, <span class="c-nb">12.6</span>]

<span class="c-cm"># --- PARTE A: Uso de zip() + dict() ---
# Objetivo: Emparejar cada nombre con su lectura en un solo diccionario.
# zip() une las dos listas posición a posición; dict() convierte esos pares en claves y valores.</span>
reporte = <span class="c-bi">dict</span>(<span class="c-bi">zip</span>(nombres_sensores, lecturas_actuales))
<span class="c-bi">print</span>(f<span class="c-st">"Diccionario construido: {reporte}"</span>)
<span class="c-cm"># Salida: {'Temp_Motor': 85.5, 'Presion_Aceite': 40.2, 'Nivel_Bateria': 12.6}</span>

<span class="c-cm"># --- PARTE B: Recorrido con .items() ---</span>
<span class="c-bi">print</span>(<span class="c-st">"\\n--- TELEMETRÍA EN TIEMPO REAL ---"</span>)
<span class="c-kw">for</span> nombre, valor <span class="c-kw">in</span> reporte.items():
    <span class="c-bi">print</span>(f<span class="c-st">"El {nombre} tiene una lectura de {valor} unidades."</span>)</pre></div>
  </div>

  <div id="pdex-14" class="tab-panel">
<div class="code-block"><div class="code-lang">14_Extraer_Diccionarios.py</div><pre>
<span class="c-st">"""
14. DESEMPAQUETADO DE PARÁMETROS (KWARGS UNPACKING)
Objetivo: Pasar un diccionario completo como argumentos de una función.

- Crea una función 'conectar_dispositivo' que reciba los parámetros
  'puerto', 'baudrate' y 'timeout'.
- Crea un diccionario 'parametros' con esas tres claves.
- Llama a la función pasando el diccionario desempaquetado con doble
  asterisco (**parametros).
- Imprime el resultado dentro de la función.
"""</span>

<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: DICTIONARY UNPACKING CON **
# ==============================================================================
# El doble asterisco (**) permite "desempaquetar" un diccionario para que
# cada par clave-valor se convierta en un argumento con nombre (keyword
# argument) al llamar a una función.
#
# Regla: Las claves del diccionario deben coincidir EXACTAMENTE con los
# nombres de los parámetros de la función.
# ==============================================================================</span>


<span class="c-kw">def</span> <span class="c-fn">conectar_dispositivo</span>(puerto, baudrate, timeout):
    <span class="c-bi">print</span>(f<span class="c-st">"Conectando por {puerto} a {baudrate} baudios (timeout={timeout}s)..."</span>)


<span class="c-cm"># A. Diccionario con los parámetros de conexión</span>
parametros = {<span class="c-st">"puerto"</span>: <span class="c-st">"COM3"</span>, <span class="c-st">"baudrate"</span>: <span class="c-nb">9600</span>, <span class="c-st">"timeout"</span>: <span class="c-nb">5</span>}

<span class="c-cm"># B. Llama a la función desempaquetando el diccionario con **</span>
conectar_dispositivo(**parametros)

<span class="c-cm"># C. Comparación: sin desempaquetar tendrías que escribir esto manualmente</span>
conectar_dispositivo(puerto=parametros[<span class="c-st">"puerto"</span>], baudrate=parametros[<span class="c-st">"baudrate"</span>], timeout=parametros[<span class="c-st">"timeout"</span>])</pre></div>
  </div>

  <div id="pdex-15" class="tab-panel">
<div class="code-block"><div class="code-lang">15_DeepCopy_Diccionarios.py</div><pre>
<span class="c-st">"""
15. CLONACIÓN SEGURA DE CONFIGURACIONES ANIDADAS
Objetivo: Aprender la diferencia entre copia superficial y profunda en diccionarios.

- Importa el módulo 'copy'.
- Crea un diccionario anidado: configuracion = {"red": {"ip": "192.168.1.1", "puerto": 80}}.
- Crea 'config_test' usando copy.deepcopy(configuracion).
- Cambia un valor dentro de 'config_test' y demuestra con un print que
  el diccionario 'configuracion' original NO cambió.
"""</span>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: SHALLOW COPY (SUPERFICIAL) VS DEEP COPY (PROFUNDA)
# ==============================================================================
# 1. .copy(): Es una copia superficial. Copia el diccionario exterior, pero
#    los objetos internos (los sub-diccionarios) siguen siendo los mismos
#    en la memoria.
# 2. copy.deepcopy(): Crea una réplica total. Clona el diccionario exterior
#    y todos los sub-diccionarios de forma independiente.
# ==============================================================================</span>

<span class="c-kw">import</span> copy

<span class="c-cm"># A. Crea un diccionario anidado: configuracion</span>
configuracion = {<span class="c-st">"red"</span>: {<span class="c-st">"ip"</span>: <span class="c-st">"192.168.1.1"</span>, <span class="c-st">"puerto"</span>: <span class="c-nb">80</span>}}

<span class="c-cm"># B. Crear 'config_test' usando deepcopy()
# Esto garantiza que si modificamos config_test, la original no sufra cambios.</span>
config_test = copy.deepcopy(configuracion)

<span class="c-cm"># C. Modificamos un valor dentro de 'config_test' (clave anidada "puerto")</span>
config_test[<span class="c-st">"red"</span>][<span class="c-st">"puerto"</span>] = <span class="c-nb">8080</span>

<span class="c-cm"># D. Demostración con prints</span>
<span class="c-bi">print</span>(<span class="c-st">"--- PRUEBA DE CLONACIÓN SEGURA ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Original (configuracion): {configuracion}"</span>)  <span class="c-cm"># Salida: {'red': {'ip': '192.168.1.1', 'puerto': 80}}</span>
<span class="c-bi">print</span>(f<span class="c-st">"Copia de Test (config_test): {config_test}"</span>)  <span class="c-cm"># Salida: {'red': {'ip': '192.168.1.1', 'puerto': 8080}}</span></pre></div>
  </div>

  <div id="pdex-16" class="tab-panel">
<div class="code-block"><div class="code-lang">16_LimpiarDuplicados_Diccionarios.py</div><pre>
<span class="c-st">"""
16. AUDITORÍA DE VALORES ÚNICOS
Objetivo: Detectar qué componentes comparten el mismo estado en una prueba masiva.

- Tienes: estados = {"CPU": "OK", "RAM": "FAIL", "Disco": "OK", "Ventilador": "FAIL", "GPU": "OK"}.
- Usa set() sobre .values() para obtener los estados únicos posibles.
- Usa .setdefault() para agrupar, en un nuevo diccionario, la lista de
  componentes que comparten cada estado.
- Imprime el resultado agrupado.
"""</span>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: SET() PARA VALORES ÚNICOS Y .setdefault()
# ==============================================================================
# Un 'Set' no permite duplicados, así que convertir los .values() de un
# diccionario en un set nos dice cuántas categorías distintas existen.
#
# .setdefault(clave, valor_por_defecto) es ideal para agrupar datos: si la
# clave ya existe devuelve su valor actual, y si no existe la crea con el
# valor por defecto (evitando un KeyError).
# ==============================================================================</span>

<span class="c-cm"># A. Diccionario con el estado de cada componente</span>
estados = {<span class="c-st">"CPU"</span>: <span class="c-st">"OK"</span>, <span class="c-st">"RAM"</span>: <span class="c-st">"FAIL"</span>, <span class="c-st">"Disco"</span>: <span class="c-st">"OK"</span>, <span class="c-st">"Ventilador"</span>: <span class="c-st">"FAIL"</span>, <span class="c-st">"GPU"</span>: <span class="c-st">"OK"</span>}

<span class="c-cm"># B. Obtiene los estados únicos posibles usando set()</span>
estados_unicos = <span class="c-bi">set</span>(estados.values())
<span class="c-bi">print</span>(f<span class="c-st">"Estados posibles detectados: {estados_unicos}"</span>)  <span class="c-cm"># Salida: {'OK', 'FAIL'}</span>

<span class="c-cm"># C. Agrupa los componentes por estado usando .setdefault()</span>
agrupado = {}
<span class="c-kw">for</span> componente, estado <span class="c-kw">in</span> estados.items():
    <span class="c-cm"># Si 'estado' aún no es una clave en 'agrupado', la crea con lista vacía [].
    # Si ya existe, simplemente devuelve la lista que ya tenía.</span>
    agrupado.setdefault(estado, []).append(componente)

<span class="c-cm"># D. Resultados</span>
<span class="c-bi">print</span>(<span class="c-st">"--- AUDITORÍA AGRUPADA POR ESTADO ---"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Componentes agrupados: {agrupado}"</span>)
<span class="c-cm"># Salida: {'OK': ['CPU', 'Disco', 'GPU'], 'FAIL': ['RAM', 'Ventilador']}</span></pre></div>
  </div>

  <div id="pdex-17" class="tab-panel">
<div class="code-block"><div class="code-lang">17_FormateoReporte_Diccionarios.py</div><pre>
<span class="c-st">"""
17. FORMATEO DE REPORTE FINAL
Objetivo: Generar un reporte de texto profesional a partir de un diccionario.

- Tienes: resultados = {"Conectado": True, "Autenticado": True, "Lectura_OK": False}.
- Usa .items() junto con una f-string dentro de un bucle 'for' para generar
  una línea de reporte por cada paso.
- Usa .join() sobre una lista generada con comprehension para crear un
  único string con todos los pasos separados por " | ".
- Imprime ambos resultados.
"""</span>

<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: DE DICCIONARIO A REPORTE DE TEXTO
# ==============================================================================
# .join() sigue siendo un método de STRING, no de diccionario. Para usarlo
# con un diccionario primero debemos transformar sus pares clave-valor en
# una lista de strings, normalmente con una comprehension.
# ==============================================================================</span>

<span class="c-cm"># A. Diccionario con el resultado de cada paso de una prueba</span>
resultados = {<span class="c-st">"Conectado"</span>: <span class="c-kw">True</span>, <span class="c-st">"Autenticado"</span>: <span class="c-kw">True</span>, <span class="c-st">"Lectura_OK"</span>: <span class="c-kw">False</span>}

<span class="c-cm"># B. Genera una línea de reporte por cada paso usando .items()</span>
<span class="c-bi">print</span>(<span class="c-st">"--- REPORTE PASO A PASO ---"</span>)
<span class="c-kw">for</span> paso, exito <span class="c-kw">in</span> resultados.items():
    estado = <span class="c-st">"✅ OK"</span> <span class="c-kw">if</span> exito <span class="c-kw">else</span> <span class="c-st">"❌ FALLO"</span>
    <span class="c-bi">print</span>(f<span class="c-st">"{paso}: {estado}"</span>)

<span class="c-cm"># C. Convierte los pares en una lista de strings con comprehension
# y únelos con .join() usando " | " como separador.</span>
lineas = [f<span class="c-st">"{paso}={exito}"</span> <span class="c-kw">for</span> paso, exito <span class="c-kw">in</span> resultados.items()]
reporte_flujo = <span class="c-st">" | "</span>.join(lineas)

<span class="c-cm"># D. Resultado final</span>
<span class="c-bi">print</span>(<span class="c-st">"\\n--- REPORTE COMPACTO ---"</span>)
<span class="c-bi">print</span>(reporte_flujo)  <span class="c-cm"># Salida: Conectado=True | Autenticado=True | Lectura_OK=False</span></pre></div>
  </div>

  <div id="pdex-18" class="tab-panel">
<div class="code-block"><div class="code-lang">18_BigO_Diccionarios.py</div><pre>
<span class="c-st">"""
18. ANÁLISIS DE EFICIENCIA (TEÓRICO)
Objetivo: Evaluar el rendimiento de un diccionario frente a una lista para Honeywell/Google.

- Tienes un diccionario de 1,000,000 de registros (clave -&gt; valor) y una
  lista equivalente de 1,000,000 de tuplas (clave, valor).
- En un comentario, responde cuál de estas operaciones es más rápida y por qué:
  A) Buscar si la clave 'ID_004500' existe en el diccionario (if 'ID_004500' in diccionario).
  B) Buscar si la clave 'ID_004500' existe en la lista de tuplas (recorriendo una por una).

Pista: Investiga cómo funciona una tabla hash frente a una búsqueda lineal.
"""</span>

<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: TABLA HASH (DICT) VS BÚSQUEDA LINEAL (LISTA)
# ==============================================================================
# Un diccionario en Python está implementado internamente como una TABLA HASH.
# Cada clave se convierte en una posición de memoria calculada matemáticamente
# (hash), por lo que Python "salta" directo a esa posición sin recorrer nada.
#
# Una lista, en cambio, no tiene esa estructura: para saber si un elemento
# existe, Python debe revisarlo uno por uno desde el principio.
# ==============================================================================</span>

<span class="c-st">"""
RESPUESTA AL DESAFÍO:
---------------------
Escenario: 1,000,000 de registros.

A) 'ID_004500' in diccionario: Es una operación O(1) - Constante.
   Python calcula el hash de la clave y va directo a su posición en memoria.
   No importa si hay 10 o 10 millones de registros, el tiempo es el mismo.

B) 'ID_004500' in lista_de_tuplas: Es una operación O(n) - Lineal.
   Python tiene que recorrer tupla por tupla, comparando la clave de cada
   una, hasta encontrarla o llegar al final. En el peor caso, revisará
   el millón de registros.

CONCLUSIÓN:
La opción A (diccionario) es muchísimo más rápida que la opción B (lista)
para búsquedas por clave en grandes volúmenes de datos. Por eso, cuando el
acceso frecuente es "buscar algo por su identificador", un diccionario es
casi siempre la estructura correcta.
"""</span></pre></div>
  </div>

</div>
  </div>
</div>`,

'py-sets': `
<div class="tab-group-pyset">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pst-0','pyset')">Métodos esenciales</button>
    <button class="tab-btn" onclick="switchTab(this,'pst-1','pyset')">Conceptos y operaciones</button>
    <button class="tab-btn" onclick="switchTab(this,'pst-2','pyset')">Comprehensions & frozenset</button>
    <button class="tab-btn" onclick="switchTab(this,'pst-3','pyset')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'pst-4','pyset')">✅ Mejores Prácticas</button>
  </div>
  <div id="pst-0" class="tab-panel active">
${renderMethodTable('SET')}
  </div>
  <div id="pst-1" class="tab-panel">
<div class="concept-intro">Un <strong>set</strong> es una colección <em>desordenada</em> de elementos <strong>únicos y hasheables</strong> (no admite duplicados, no admite listas/dicts como elementos). Internamente usa la misma tabla hash que un dict — por eso membership test (<code>x in s</code>) y agregar/quitar son O(1) promedio, mucho más rápido que buscar en una lista cuando la colección crece. Úsalo cuando lo que te importa es "¿está o no está" y "qué tienen en común/de diferente dos colecciones", no el orden ni las repeticiones.</div>
<div class="code-block"><div class="code-lang">Python — Crear sets</div><pre>
s = {<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>}
s = <span class="c-bi">set</span>([<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>])    <span class="c-cm"># deduplicación automática → {1, 2, 3}</span>
s = <span class="c-bi">set</span>()               <span class="c-cm"># TRAMPA: {} crea dict vacío, no set — ver tab de Errores</span>
s = {x <span class="c-kw">for</span> x <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">5</span>)}   <span class="c-cm"># set comprehension → {0,1,2,3,4}</span></pre></div>
<div class="code-block"><div class="code-lang">Python — Caso práctico: comparar resultados entre benches</div><pre>
<span class="c-cm"># Deduplicar y comparar tests fallidos de múltiples benches</span>
bench_a_fails = {<span class="c-st">'test_lidar'</span>, <span class="c-st">'test_can'</span>, <span class="c-st">'test_imu'</span>}
bench_b_fails = {<span class="c-st">'test_can'</span>, <span class="c-st">'test_eth'</span>}

all_unique_fails = bench_a_fails | bench_b_fails  <span class="c-cm"># {'test_lidar','test_can','test_imu','test_eth'}</span>
only_in_a       = bench_a_fails - bench_b_fails   <span class="c-cm"># {'test_lidar','test_imu'} — regresión propia de A</span>
both_fail       = bench_a_fails &amp; bench_b_fails   <span class="c-cm"># {'test_can'} — problema compartido, probable bug en HW/HIL común</span>
solo_en_uno     = bench_a_fails ^ bench_b_fails   <span class="c-cm"># {'test_lidar','test_imu','test_eth'} — inconsistencias entre benches</span>

<span class="c-cm"># Membership: verificar si un test específico está en el set de fallos — O(1)</span>
<span class="c-kw">if</span> <span class="c-st">'test_can'</span> <span class="c-kw">in</span> bench_a_fails:
    <span class="c-bi">print</span>(<span class="c-st">"CAN sigue fallando en bench A"</span>)</pre></div>
  </div>
  <div id="pst-2" class="tab-panel">
<div class="concept-intro">Las <strong>set comprehensions</strong> construyen sets con la misma sintaxis que las list comprehensions pero con <code>{}</code>. <strong>frozenset</strong> es la versión inmutable (y por tanto hasheable) de set — no tiene <code>add</code>/<code>remove</code>, pero justamente por ser inmutable puede usarse como key de dict o como elemento de otro set, algo que un set normal no puede hacer.</div>
<div class="code-block"><div class="code-lang">Python — Set comprehensions</div><pre>
<span class="c-cm"># Básica: transformar y deduplicar en un paso</span>
codigos = [<span class="c-st">'DTC001'</span>, <span class="c-st">'dtc001'</span>, <span class="c-st">'DTC002'</span>]
unicos = {c.upper() <span class="c-kw">for</span> c <span class="c-kw">in</span> codigos}   <span class="c-cm"># {'DTC001', 'DTC002'} — normaliza y deduplica</span>

<span class="c-cm"># Con filtro — solo IDs de sensores que fallaron</span>
lecturas = [{<span class="c-st">'id'</span>: <span class="c-st">'imu1'</span>, <span class="c-st">'ok'</span>: <span class="c-kw">False</span>}, {<span class="c-st">'id'</span>: <span class="c-st">'imu2'</span>, <span class="c-st">'ok'</span>: <span class="c-kw">True</span>}]
sensores_fallidos = {r[<span class="c-st">'id'</span>] <span class="c-kw">for</span> r <span class="c-kw">in</span> lecturas <span class="c-kw">if</span> <span class="c-kw">not</span> r[<span class="c-st">'ok'</span>]}   <span class="c-cm"># {'imu1'}</span>

<span class="c-cm"># Sacar valores únicos de una columna de datos crudos</span>
timestamps_raw = [(<span class="c-nb">1000</span>, <span class="c-st">'A'</span>), (<span class="c-nb">1000</span>, <span class="c-st">'B'</span>), (<span class="c-nb">2000</span>, <span class="c-st">'A'</span>)]
ticks_unicos = {t <span class="c-kw">for</span> t, _ <span class="c-kw">in</span> timestamps_raw}   <span class="c-cm"># {1000, 2000}</span></pre></div>
<div class="code-block"><div class="code-lang">Python — frozenset: inmutable y hasheable</div><pre>
<span class="c-cm"># frozenset básico — misma API de solo-lectura que set (union, &, etc. funcionan)</span>
fs = <span class="c-bi">frozenset</span>({<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>})
fs.add(<span class="c-nb">4</span>)   <span class="c-cm"># AttributeError: 'frozenset' object has no attribute 'add'</span>

<span class="c-cm"># Caso de uso 1: key de dict compuesta por un conjunto de flags</span>
config_cache = {
    <span class="c-bi">frozenset</span>({<span class="c-st">'debug'</span>, <span class="c-st">'hil'</span>}): <span class="c-st">'config_A'</span>,
    <span class="c-bi">frozenset</span>({<span class="c-st">'release'</span>}):     <span class="c-st">'config_B'</span>,
}
flags_activos = <span class="c-bi">frozenset</span>({<span class="c-st">'hil'</span>, <span class="c-st">'debug'</span>})   <span class="c-cm"># orden no importa: {'hil','debug'} == {'debug','hil'}</span>
config_cache[flags_activos]   <span class="c-cm"># 'config_A'</span>

<span class="c-cm"># Caso de uso 2: memoización cuando el "argumento" es un conjunto de IDs</span>
_cache = {}
<span class="c-kw">def</span> <span class="c-fn">correlacionar_sensores</span>(ids_sensores):
    key = <span class="c-bi">frozenset</span>(ids_sensores)   <span class="c-cm"># set normal no serviría como key: unhashable</span>
    <span class="c-kw">if</span> key <span class="c-kw">not in</span> _cache:
        _cache[key] = calcular_correlacion(ids_sensores)
    <span class="c-kw">return</span> _cache[key]

<span class="c-cm"># Caso de uso 3: set de sets — solo funciona con frozenset dentro</span>
grupos_de_prueba = {<span class="c-bi">frozenset</span>({<span class="c-st">'can'</span>,<span class="c-st">'lin'</span>}), <span class="c-bi">frozenset</span>({<span class="c-st">'eth'</span>})}</pre></div>
  </div>
  <div id="pst-3" class="tab-panel">
<div class="concept-intro">Los errores con sets casi siempre vienen de dos fuentes: confundir la sintaxis <code>{}</code> con la de dict, o asumir que un set se comporta como una lista (orden, mutabilidad durante iteración, elementos permitidos).</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>fallos = {}                 <span class="c-cm"># esto es un DICT vacío, no un set</span>
fallos.add(<span class="c-st">'test_can'</span>)     <span class="c-cm"># AttributeError: 'dict' object has no attribute 'add'</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>fallos = <span class="c-bi">set</span>()             <span class="c-cm"># set vacío explícito</span>
fallos.add(<span class="c-st">'test_can'</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>{}</code> es syntax de dict por razones históricas (dict existe desde antes que set tuviera literal propio). Un set vacío SIEMPRE se crea con <code>set()</code>. Solo con al menos un elemento la sintaxis <code>{1, 2}</code> es inequívocamente un set.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>historial = {[<span class="c-nb">1</span>, <span class="c-nb">2</span>], [<span class="c-nb">3</span>, <span class="c-nb">4</span>]}
<span class="c-cm"># TypeError: unhashable type: 'list'</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>historial = {(<span class="c-nb">1</span>, <span class="c-nb">2</span>), (<span class="c-nb">3</span>, <span class="c-nb">4</span>)}   <span class="c-cm"># tuplas son hasheables</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> un set necesita calcular el <code>hash()</code> de cada elemento para ubicarlo en su tabla interna. Las listas (y los dicts, y los sets normales) son mutables y por eso Python las hace explícitamente <em>no hasheables</em> — si su contenido cambiara, el hash quedaría inválido y rompería la estructura interna. Usa tuplas (o frozenset, si el elemento en sí es una colección) cuando necesites meter "algo parecido a una lista" dentro de un set.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>ids_activos = {<span class="c-st">'s1'</span>, <span class="c-st">'s2'</span>, <span class="c-st">'s3'</span>}
<span class="c-kw">for</span> sid <span class="c-kw">in</span> ids_activos:
    <span class="c-kw">if</span> is_stale(sid):
        ids_activos.remove(sid)
<span class="c-cm"># RuntimeError: Set changed size during iteration</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>ids_activos = {<span class="c-st">'s1'</span>, <span class="c-st">'s2'</span>, <span class="c-st">'s3'</span>}
<span class="c-kw">for</span> sid <span class="c-kw">in</span> <span class="c-bi">list</span>(ids_activos):   <span class="c-cm"># itera sobre una copia</span>
    <span class="c-kw">if</span> is_stale(sid):
        ids_activos.remove(sid)

<span class="c-cm"># o, más Pythónico: reconstruir el set</span>
ids_activos = {sid <span class="c-kw">for</span> sid <span class="c-kw">in</span> ids_activos <span class="c-kw">if</span> <span class="c-kw">not</span> is_stale(sid)}</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> igual que con dict, mutar un set (add/remove/discard) mientras un iterador está activo sobre él invalida la estructura interna a mitad de recorrido. Python lo detecta y lanza <code>RuntimeError</code> en vez de dejarte con un bug silencioso de elementos saltados.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>orden_ejecucion = {<span class="c-st">'init'</span>, <span class="c-st">'configure'</span>, <span class="c-st">'run'</span>, <span class="c-st">'teardown'</span>}
<span class="c-kw">for</span> paso <span class="c-kw">in</span> orden_ejecucion:
    ejecutar(paso)   <span class="c-cm"># el orden real de iteración NO es el de escritura</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>orden_ejecucion = [<span class="c-st">'init'</span>, <span class="c-st">'configure'</span>, <span class="c-st">'run'</span>, <span class="c-st">'teardown'</span>]   <span class="c-cm"># lista, no set</span>
<span class="c-kw">for</span> paso <span class="c-kw">in</span> orden_ejecucion:
    ejecutar(paso)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> a diferencia de dict (que desde 3.7 SÍ garantiza orden de inserción), un set no da ninguna garantía de orden — su disposición depende del hash de cada elemento y puede variar. Si el orden importa (secuencia de pasos, prioridad, orden de despliegue), usa list o tuple, nunca set.</div>
  </div>
  <div id="pst-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Usa set para membership tests sobre colecciones grandes</div>
  <p>Si tu código hace <code>x in coleccion</code> repetidamente dentro de un loop y <code>coleccion</code> es una lista de miles de elementos, conviértela a set una sola vez antes del loop. Pasas de O(n) a O(1) por búsqueda.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa operadores de conjuntos (|, &, -, ^) en vez de loops manuales para comparar colecciones</div>
  <p><code>solo_en_a = a - b</code> es más corto, más rápido (implementado en C) y más difícil de equivocar que escribir un doble loop con <code>if x not in b</code>.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa frozenset cuando necesites un conjunto como key de dict o elemento de otro set</div>
  <p>Si te encuentras con <code>TypeError: unhashable type: 'set'</code>, la solución casi siempre es envolverlo en <code>frozenset(...)</code> en el punto donde lo usas como key, no cambiar toda tu estructura de datos.</p>
</div>
<div class="practice-card">
  <div class="practice-title">No dependas del orden de iteración de un set</div>
  <p>Si necesitas orden (de inserción, alfabético, de prioridad), usa list/tuple o <code>sorted(mi_set)</code> explícitamente al consumirlo. Nunca asumas que el orden de un set es estable entre ejecuciones.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Prefiere discard() sobre remove() cuando "puede que no exista" es un caso normal</div>
  <p><code>s.discard(x)</code> no lanza excepción si <code>x</code> no está — ideal para limpiezas idempotentes. Reserva <code>remove()</code> para cuando la ausencia del elemento indica un bug que quieres que falle ruidosamente.</p>
</div>
  </div>
</div>`,

'py-strings': `
<div class="tab-group-pystr">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ps-0','pystr')">Métodos esenciales</button>
    <button class="tab-btn" onclick="switchTab(this,'ps-1','pystr')">Inmutabilidad & slicing</button>
    <button class="tab-btn" onclick="switchTab(this,'ps-2','pystr')">f-strings</button>
    <button class="tab-btn" onclick="switchTab(this,'ps-3','pystr')">Parsing & encoding</button>
    <button class="tab-btn" onclick="switchTab(this,'ps-4','pystr')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'ps-5','pystr')">✅ Mejores Prácticas</button>
    <button class="tab-btn" onclick="switchTab(this,'ps-6','pystr')">🧩 Ejercicios (quiz)</button>
    <button class="tab-btn" onclick="switchTab(this,'ps-7','pystr')">📁 Ejercicios_Strings (carpeta)</button>
  </div>
  <div id="ps-0" class="tab-panel active">
${renderMethodTable('STR')}
  </div>
  <div id="ps-1" class="tab-panel">
<div class="concept-intro">Los <strong>strings en Python son inmutables</strong>: ningún método de <code>str</code> modifica el string original, todos retornan uno <strong>nuevo</strong>. <code>"hola".upper()</code> no cambia la variable original, la reemplaza si reasignas. Esto tiene consecuencias directas en performance (concatenar en loop es caro) y en identidad (comparar strings con <code>is</code> es una trampa). El <strong>slicing</strong> (<code>s[inicio:fin:paso]</code>) es la herramienta principal para extraer sub-strings sin escribir loops manuales.</div>
<div class="code-block"><div class="code-lang">Python — Inmutabilidad en acción</div><pre>
s = <span class="c-st">"bench_a3"</span>
upper = s.upper()      <span class="c-cm"># crea un string NUEVO</span>
<span class="c-bi">print</span>(s)             <span class="c-cm"># "bench_a3" — sin cambios, s nunca se muta</span>
<span class="c-bi">print</span>(upper)         <span class="c-cm"># "BENCH_A3"</span>

<span class="c-cm"># Encadenar métodos es seguro porque cada uno retorna un string nuevo</span>
limpio = <span class="c-st">"  Bench_A3  "</span>.strip().lower().replace(<span class="c-st">"_"</span>, <span class="c-st">"-"</span>)   <span class="c-cm"># "bench-a3"</span></pre></div>
<div class="code-block"><div class="code-lang">Python — Slicing: s[inicio:fin:paso]</div><pre>
s = <span class="c-st">"telemetry_2024_07_11"</span>
<span class="c-cm">#    índices:  0123456789...</span>

s[<span class="c-nb">0</span>:<span class="c-nb">9</span>]        <span class="c-cm"># "telemetry"      — fin es EXCLUSIVO (no incluye índice 9)</span>
s[:<span class="c-nb">9</span>]         <span class="c-cm"># "telemetry"      — omitir inicio = desde el principio</span>
s[<span class="c-nb">10</span>:]        <span class="c-cm"># "2024_07_11"     — omitir fin = hasta el final</span>
s[-<span class="c-nb">2</span>:]        <span class="c-cm"># "11"             — índices negativos cuentan desde el final</span>
s[-<span class="c-nb">10</span>:-<span class="c-nb">6</span>]     <span class="c-cm"># "2024"           — rango con negativos</span>
s[::-<span class="c-nb">1</span>]       <span class="c-cm"># string invertido — paso -1</span>
s[::<span class="c-nb">2</span>]        <span class="c-cm"># toma un carácter de cada dos</span>
s[<span class="c-nb">100</span>:<span class="c-nb">200</span>]     <span class="c-cm"># ""  — fuera de rango NO lanza IndexError, retorna vacío/truncado</span>

<span class="c-cm"># Caso práctico: extraer fecha de un nombre de archivo con formato fijo</span>
filename = <span class="c-st">"log_20240711_143201.txt"</span>
fecha = filename[<span class="c-nb">4</span>:<span class="c-nb">12</span>]      <span class="c-cm"># "20240711"</span>
hora  = filename[<span class="c-nb">13</span>:<span class="c-nb">19</span>]     <span class="c-cm"># "143201"</span></pre></div>
<table class="kv-table"><tr><th>Método</th><th>Qué hace</th><th>Ejemplo</th></tr>
<tr><td>upper() / lower()</td><td>Cambiar case</td><td>"Hello".lower() → "hello"</td></tr>
<tr><td>strip() / lstrip() / rstrip()</td><td>Eliminar espacios (u otros chars)</td><td>"  hi  ".strip() → "hi"</td></tr>
<tr><td>split(sep, maxsplit)</td><td>Divide en lista</td><td>"a,b,c".split(",") → ["a","b","c"]</td></tr>
<tr><td>join(iterable)</td><td>Une lista en string</td><td>",".join(["a","b"]) → "a,b"</td></tr>
<tr><td>replace(old, new)</td><td>Reemplaza todas las ocurrencias</td><td>"aa".replace("a","b") → "bb"</td></tr>
<tr><td>find(sub) / index(sub)</td><td>Posición de sub (-1 si no find)</td><td>"hello".find("ll") → 2</td></tr>
<tr><td>startswith() / endswith()</td><td>Verificar prefijo/sufijo</td><td>"ERROR: ...".startswith("ERROR")</td></tr>
<tr><td>count(sub)</td><td>Cuenta ocurrencias</td><td>"aaa".count("a") → 3</td></tr>
<tr><td>zfill(width)</td><td>Rellena con ceros</td><td>"42".zfill(5) → "00042"</td></tr>
<tr><td>partition(sep)</td><td>Divide en 3: antes, sep, después</td><td>"a:b".partition(":") → ("a",":","b")</td></tr>
</table>
<div class="alert-card">Esta lista es solo lo esencial de Fundamentos. Para el catálogo completo de métodos de string, revisa el Cheat Sheet de Strings dedicado en la app.</div>
  </div>
  <div id="ps-2" class="tab-panel">
<div class="concept-intro">Los <strong>f-strings</strong> (<code>f"..."</code>, desde Python 3.6) interpolan expresiones directamente dentro del literal — son más legibles y más rápidos en runtime que <code>%</code> o <code>.format()</code> porque se resuelven en tiempo de compilación, no con parsing dinámico del string de formato.</div>
<div class="code-block"><div class="code-lang">Python — f-strings: todas las formas</div><pre>
name = <span class="c-st">"Wayve"</span>; val = <span class="c-nb">3.14159</span>; items = [<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>]

<span class="c-cm"># Básico</span>
<span class="c-bi">print</span>(<span class="c-st">f"Empresa: {name}"</span>)

<span class="c-cm"># Expresiones dentro — cualquier expresión Python válida, incluso llamadas a función</span>
<span class="c-bi">print</span>(<span class="c-st">f"Doble: {val * 2}"</span>)
<span class="c-bi">print</span>(<span class="c-st">f"Upper: {name.upper()}"</span>)
<span class="c-bi">print</span>(<span class="c-st">f"Items: {len(items)} elementos"</span>)

<span class="c-cm"># Formato de números</span>
<span class="c-bi">print</span>(<span class="c-st">f"{val:.2f}"</span>)         <span class="c-cm"># "3.14"       — 2 decimales</span>
<span class="c-bi">print</span>(<span class="c-st">f"{val:10.3f}"</span>)      <span class="c-cm"># "     3.142"  — ancho 10, 3 decimales</span>
<span class="c-bi">print</span>(<span class="c-st">f"{1000000:,}"</span>)      <span class="c-cm"># "1,000,000"  — separador de miles</span>
<span class="c-bi">print</span>(<span class="c-st">f"{255:#x}"</span>)         <span class="c-cm"># "0xff"       — hex con prefijo</span>
<span class="c-bi">print</span>(<span class="c-st">f"{0.756:.1%}"</span>)      <span class="c-cm"># "75.6%"      — porcentaje</span>

<span class="c-cm"># Alineación — útil para tablas de log en consola</span>
<span class="c-bi">print</span>(<span class="c-st">f"{'left':10}"</span>)      <span class="c-cm"># "left      "  — alinea izquierda (default para strings)</span>
<span class="c-bi">print</span>(<span class="c-st">f"{'right':&gt;10}"</span>)     <span class="c-cm"># "     right"  — alinea derecha</span>
<span class="c-bi">print</span>(<span class="c-st">f"{'center':^10}"</span>)   <span class="c-cm"># "  center  "  — centrado</span>
<span class="c-bi">print</span>(<span class="c-st">f"{42:0&gt;5}"</span>)         <span class="c-cm"># "00042"       — relleno con 0 a la derecha del especificador</span>

<span class="c-cm"># Debug (Python 3.8+) — muestra nombre y valor, ideal para prints temporales</span>
x = <span class="c-nb">42</span>
<span class="c-bi">print</span>(<span class="c-st">f"{x=}"</span>)             <span class="c-cm"># "x=42"</span>
<span class="c-bi">print</span>(<span class="c-st">f"{val * 2=:.1f}"</span>)   <span class="c-cm"># "val * 2=6.3" — combina debug con formato</span>

<span class="c-cm"># Multiline — paréntesis + strings adyacentes se concatenan automáticamente</span>
msg = (
    <span class="c-st">f"Bench: {bench_id}\n"</span>
    <span class="c-st">f"Test:  {test_name}\n"</span>
    <span class="c-st">f"Result: {result}"</span>
)</pre></div>
  </div>
  <div id="ps-3" class="tab-panel">
<div class="concept-intro">Parsear texto (logs, tramas, respuestas de un DUT) es el uso más frecuente de strings en herramientas de bench. Cuando los datos vienen de un socket, puerto serial o bus CAN, además hay que lidiar con la diferencia entre <strong>bytes</strong> (datos crudos) y <strong>str</strong> (texto decodificado) — ahí es donde entra el <strong>encoding</strong>.</div>
<div class="code-block"><div class="code-lang">Python — Parsing de strings (logs, datos)</div><pre>
<span class="c-cm"># split con límite — útil para parsear headers</span>
<span class="c-st">"key: value: extra"</span>.split(<span class="c-st">":"</span>, maxsplit=<span class="c-nb">1</span>)   <span class="c-cm"># ['key', ' value: extra']</span>

<span class="c-cm"># Parsear línea de log estructurada</span>
line = <span class="c-st">"2024-07-08T14:32:01 INFO bench-a3 test_lidar PASSED 1.23s"</span>
ts, level, bench, test, status, dur = line.split()
dur_float = <span class="c-bi">float</span>(dur.rstrip(<span class="c-st">'s'</span>))   <span class="c-cm"># "1.23s" → 1.23</span>

<span class="c-cm"># Verificaciones comunes</span>
s = <span class="c-st">"  \n  "</span>
s.strip() == <span class="c-st">""</span>     <span class="c-cm"># True — está vacío o solo whitespace</span>
<span class="c-kw">not</span> s.strip()       <span class="c-cm"># True — forma Pythónica de verificar string vacío</span>
s.isnumeric()       <span class="c-cm"># False — ¿es número puro?</span>
s.isalpha()         <span class="c-cm"># False — ¿solo letras?</span>

<span class="c-cm"># Join — siempre más eficiente que concatenación en loop</span>
parts = [<span class="c-st">"bench"</span>, <span class="c-st">"a3"</span>, <span class="c-st">"test"</span>, <span class="c-st">"lidar"</span>]
<span class="c-st">"-"</span>.join(parts)          <span class="c-cm"># "bench-a3-test-lidar"</span>
<span class="c-st">"\n"</span>.join(log_lines)     <span class="c-cm"># une líneas de log

# TRAMPA: nunca construyas strings con + en un loop</span>
<span class="c-cm"># Mal (O(n²)):  result = ""; for s in lista: result += s</span>
<span class="c-cm"># Bien (O(n)):  result = "".join(lista)</span></pre></div>
<div class="code-block"><div class="code-lang">Python — Encoding: bytes vs str</div><pre>
<span class="c-cm"># bytes: datos crudos (lo que llega de un socket, puerto serial, o payload CAN)</span>
raw = <span class="c-kw">b</span><span class="c-st">'\x02BENCH_A3\x03'</span>    <span class="c-cm"># literal de bytes — prefijo b</span>
<span class="c-bi">type</span>(raw)               <span class="c-cm"># <class 'bytes'></span>

<span class="c-cm"># decode: bytes → str (interpretando el encoding)</span>
payload = raw.decode(<span class="c-st">'utf-8'</span>)         <span class="c-cm"># texto legible</span>
payload = raw.decode(<span class="c-st">'ascii'</span>, errors=<span class="c-st">'replace'</span>)  <span class="c-cm"># reemplaza bytes inválidos con "?" en vez de crashear</span>

<span class="c-cm"># encode: str → bytes (para enviar por red/serial)</span>
comando = <span class="c-st">"START_TEST"</span>.encode(<span class="c-st">'utf-8'</span>)   <span class="c-cm"># b'START_TEST'</span>
serial_port.write(comando)

<span class="c-cm"># Caso práctico: leer una trama de un socket TCP del bench</span>
chunk = sock.recv(<span class="c-nb">1024</span>)                     <span class="c-cm"># siempre retorna bytes, nunca str</span>
<span class="c-kw">try</span>:
    texto = chunk.decode(<span class="c-st">'utf-8'</span>)
<span class="c-kw">except</span> UnicodeDecodeError:
    logger.warning(<span class="c-st">f"Trama no-UTF8 recibida: {chunk!r}"</span>)</pre></div>
  </div>
  <div id="ps-4" class="tab-panel">
<div class="concept-intro">Casi todos los errores de strings vienen de olvidar la inmutabilidad, mezclar bytes con str, o confiar en comparaciones/identidad que no funcionan como parecen a primera vista.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>s = <span class="c-st">"bench_a3"</span>
s[<span class="c-nb">0</span>] = <span class="c-st">"B"</span>
<span class="c-cm"># TypeError: 'str' object does not support item assignment</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>s = <span class="c-st">"bench_a3"</span>
s = <span class="c-st">"B"</span> + s[<span class="c-nb">1</span>:]              <span class="c-cm"># reconstruir con slicing → "Bench_a3"</span>
<span class="c-cm"># o, si son varios cambios: pasar por lista y volver a unir</span>
chars = <span class="c-bi">list</span>(s)
chars[<span class="c-nb">0</span>] = <span class="c-st">"B"</span>
s = <span class="c-st">""</span>.join(chars)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> los strings son inmutables — no existe ningún método ni sintaxis que cambie los caracteres "en el lugar". Cualquier "modificación" en realidad crea un string nuevo. Si necesitas construir/editar texto carácter a carácter, trabaja con una lista de caracteres y usa <code>"".join()</code> al final.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">if</span> status <span class="c-kw">is</span> <span class="c-st">"PASSED"</span>:
    marcar_ok()
<span class="c-cm"># funciona "por suerte" con literales cortos (interning), pero es frágil</span>
<span class="c-cm"># y falla con strings construidos dinámicamente</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">if</span> status == <span class="c-st">"PASSED"</span>:
    marcar_ok()</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>is</code> compara <b>identidad de objeto</b> (mismo lugar en memoria), no igualdad de contenido. CPython a veces reutiliza el mismo objeto para strings literales cortos (interning), lo que hace que <code>is</code> "funcione" por casualidad en pruebas rápidas — pero un string leído de un archivo, construido con <code>+</code>, o resultado de <code>.decode()</code> es un objeto distinto aunque tenga el mismo contenido, y <code>is</code> fallará. Usa siempre <code>==</code> para comparar contenido de strings.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>comando = <span class="c-st">"START"</span>
sock.send(comando)
<span class="c-cm"># TypeError: a bytes-like object is required, not 'str'</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>comando = <span class="c-st">"START"</span>
sock.send(comando.encode(<span class="c-st">'utf-8'</span>))   <span class="c-cm"># str → bytes explícito</span>

<span class="c-cm"># y al leer, decodifica de vuelta a str antes de usar métodos de string</span>
respuesta = sock.recv(<span class="c-nb">1024</span>).decode(<span class="c-st">'utf-8'</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> las APIs de red/serial en Python trabajan con <code>bytes</code>, no con <code>str</code> — son tipos distintos y Python 3 no los mezcla implícitamente (a diferencia de Python 2). Cada vez que cruzas la frontera "voy a enviar/recibir datos crudos", decide explícitamente el encoding con <code>.encode()</code>/<code>.decode()</code>; no confíes en una conversión automática que no existe.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>fecha = <span class="c-st">"20240711"</span>
anio = fecha[<span class="c-nb">0</span>:<span class="c-nb">4</span>]
mes  = fecha[<span class="c-nb">4</span>:<span class="c-nb">8</span>]      <span class="c-cm"># si "fecha" viene truncada a 6 chars,</span>
dia  = fecha[<span class="c-nb">8</span>:<span class="c-nb">10</span>]     <span class="c-cm"># esto NO lanza error — retorna "" silenciosamente</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>fecha = <span class="c-st">"20240711"</span>
<span class="c-kw">if</span> <span class="c-bi">len</span>(fecha) != <span class="c-nb">8</span>:
    <span class="c-kw">raise</span> <span class="c-bi">ValueError</span>(<span class="c-st">f"Fecha con formato inesperado: {fecha!r}"</span>)
anio, mes, dia = fecha[<span class="c-nb">0</span>:<span class="c-nb">4</span>], fecha[<span class="c-nb">4</span>:<span class="c-nb">6</span>], fecha[<span class="c-nb">6</span>:<span class="c-nb">8</span>]</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> a diferencia del indexado simple (<code>s[100]</code> sí lanza IndexError), el slicing fuera de rango <b>nunca lanza excepción</b> — simplemente trunca o retorna un string vacío. Es cómodo para evitar checks manuales, pero peligroso cuando asumes un largo fijo: un dato corrupto o truncado pasa desapercibido en vez de fallar ruidosamente. Valida el largo explícitamente cuando el formato es crítico.</div>
  </div>
  <div id="ps-5" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Usa f-strings por default, no % ni .format()</div>
  <p>Son más legibles (la variable está justo donde se usa, no en una lista separada de argumentos) y más rápidas en runtime. Reserva <code>.format()</code> solo para casos donde el template se construye dinámicamente en runtime (no es un literal fijo en el código).</p>
</div>
<div class="practice-card">
  <div class="practice-title">Construye strings largos con "".join(lista), nunca con += en un loop</div>
  <p>Como los strings son inmutables, cada <code>+=</code> crea un string nuevo copiando todo el contenido anterior — O(n²) total para n concatenaciones. <code>"".join()</code> reserva la memoria una vez y es O(n).</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa casefold() en vez de lower() para comparaciones case-insensitive robustas</div>
  <p><code>lower()</code> es suficiente para ASCII, pero <code>casefold()</code> maneja correctamente casos Unicode más agresivos (por ejemplo la ß alemana). Para comparar IDs o nombres de test sin importar mayúsculas/minúsculas de forma segura, prefiere <code>casefold()</code>.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Sé explícito con el encoding — nunca confíes en el default de la plataforma</div>
  <p><code>open(path)</code> sin especificar encoding usa el default del sistema operativo, que difiere entre Windows y Linux. Usa siempre <code>open(path, encoding='utf-8')</code> y <code>.encode('utf-8')</code>/<code>.decode('utf-8')</code> explícitos para que tu script se comporte igual en cualquier máquina (CI, laptop del compañero, bench en el lab).</p>
</div>
<div class="practice-card">
  <div class="practice-title">Valida el formato antes de confiar en slicing de posiciones fijas</div>
  <p>Si parseas datos con formato posicional fijo (IDs de trama, nombres de archivo con estructura fija), valida <code>len()</code> o usa una expresión regular con grupos nombrados en vez de índices mágicos — falla rápido y con un mensaje claro en vez de silenciosamente producir strings vacíos o truncados.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa métodos is*() solo como pre-chequeo rápido, no como validación completa</div>
  <p><code>"123".isdigit()</code> es útil para un filtro rápido, pero no cubre negativos, decimales, ni notación científica. Para validar que un string realmente representa el número que esperas, intenta convertirlo con <code>try: float(s) except ValueError:</code> — es más robusto que encadenar varios <code>is*()</code>.</p>
</div>
  </div>
  <div id="ps-6" class="tab-panel">
<div class="concept-intro">Esta sección es para <strong>practicar activamente</strong>, no solo leer. Cada ejercicio plantea un problema real — intenta resolverlo tú mismo (en tu cabeza o en un intérprete) antes de hacer click. El panel revelado muestra primero la <strong>salida esperada</strong>, para que puedas verificar tu propio resultado sin ver la solución todavía, y después el <strong>procedimiento completo paso a paso</strong> con el código final. Progresión: 🟢 Básico → 🟡 Intermedio → 🔴 Complejo.</div>

<div class="exercise-steps-label">🟢 Básico</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-basico">BÁSICO</span>
    <span>Escribe una función <code>normalizar_id(s)</code> que tome un ID de bench con espacios extra y mayúsculas mezcladas (ej. <code>"  Bench A3  "</code>) y devuelva una versión limpia: sin espacios al inicio/fin, todo en mayúsculas, y con los espacios internos reemplazados por guiones.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>normalizar_id("  Bench A3  ") == "BENCH-A3"</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Elimina los espacios sobrantes al inicio y al final con <code>strip()</code> — así <code>"  Bench A3  "</code> se convierte en <code>"Bench A3"</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Convierte todo a mayúsculas con <code>upper()</code>, obteniendo <code>"BENCH A3"</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Reemplaza los espacios internos por guiones con <code>replace(" ", "-")</code> para llegar al resultado final. Como los strings son inmutables, cada método retorna un string nuevo — se pueden encadenar en una sola línea.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">normalizar_id</span>(s):
    <span class="c-kw">return</span> s.strip().upper().replace(<span class="c-st">" "</span>, <span class="c-st">"-"</span>)

<span class="c-bi">print</span>(normalizar_id(<span class="c-st">"  Bench A3  "</span>))  <span class="c-cm"># "BENCH-A3"</span></pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-basico">BÁSICO</span>
    <span>Escribe una función <code>es_palindromo(s)</code> que determine si un string es un palíndromo (se lee igual al derecho y al revés), ignorando mayúsculas/minúsculas y espacios. Por ejemplo <code>"Anita lava la tina"</code> debe ser palíndromo.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>es_palindromo("Anita lava la tina") == True</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Normaliza el string: pásalo a minúsculas con <code>lower()</code> y elimina los espacios con <code>replace(" ", "")</code>, para que la comparación no dependa de formato.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Invierte el string normalizado usando slicing con paso -1: <code>s[::-1]</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Compara el string normalizado contra su versión invertida con <code>==</code>. Si son iguales, es palíndromo.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">es_palindromo</span>(s):
    limpio = s.lower().replace(<span class="c-st">" "</span>, <span class="c-st">""</span>)
    <span class="c-kw">return</span> limpio == limpio[::-<span class="c-nb">1</span>]

<span class="c-bi">print</span>(es_palindromo(<span class="c-st">"Anita lava la tina"</span>))  <span class="c-cm"># True</span>
<span class="c-bi">print</span>(es_palindromo(<span class="c-st">"bench_a3"</span>))          <span class="c-cm"># False</span></pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-basico">BÁSICO</span>
    <span>Escribe una función <code>contar_vocales(s)</code> que reciba un string y devuelva cuántas vocales (a, e, i, o, u, sin importar mayúsculas) contiene.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>contar_vocales("Sensor LIDAR activo") == 7</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Convierte el string a minúsculas con <code>lower()</code> para no tener que comparar contra vocales mayúsculas y minúsculas por separado.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Recorre cada carácter del string y cuenta cuántos están presentes en el string <code>"aeiou"</code>, usando el operador <code>in</code> como filtro.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">contar_vocales</span>(s):
    vocales = <span class="c-st">"aeiou"</span>
    <span class="c-kw">return</span> <span class="c-bi">sum</span>(<span class="c-nb">1</span> <span class="c-kw">for</span> ch <span class="c-kw">in</span> s.lower() <span class="c-kw">if</span> ch <span class="c-kw">in</span> vocales)

<span class="c-bi">print</span>(contar_vocales(<span class="c-st">"Sensor LIDAR activo"</span>))  <span class="c-cm"># 7</span></pre></div>
  </div>
</div>

<div class="exercise-steps-label">🟡 Intermedio</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-intermedio">INTERMEDIO</span>
    <span>Escribe una función <code>parsear_linea_can(linea)</code> que reciba una línea de log CAN con formato <code>"ID=0x1A3 DLC=8 DATA=DE AD BE EF 00 11 22 33"</code> y devuelva un diccionario con las claves <code>"id"</code> (string hex), <code>"dlc"</code> (int) y <code>"data"</code> (lista de strings hex de 2 caracteres).</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>{'id': '0x1A3', 'dlc': 8, 'data': ['DE', 'AD', 'BE', 'EF', '00', '11', '22', '33']}</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Divide la línea completa por espacios con <code>split()</code> — obtienes 3 campos principales: <code>"ID=0x1A3"</code>, <code>"DLC=8"</code> y el resto que empieza con <code>"DATA="</code> seguido de los bytes. Como los bytes de data también están separados por espacios, mejor usa <code>split(maxsplit=2)</code> para separar los primeros dos campos y dejar el resto de <code>DATA=...</code> intacto en un solo string.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Para cada campo <code>"ID=0x1A3"</code> y <code>"DLC=8"</code>, usa <code>partition("=")</code> o <code>split("=", 1)</code> para separar la clave del valor, quedándote solo con la parte después del <code>"="</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Convierte el DLC a entero con <code>int()</code>. El ID se deja como string hex tal cual.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 4</div><div class="plan-content"><p>Para el campo de data, quita el prefijo <code>"DATA="</code> con <code>replace("DATA=", "")</code> (o slicing) y luego usa <code>split()</code> sobre lo que queda para obtener la lista de bytes individuales.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">parsear_linea_can</span>(linea):
    campo_id, campo_dlc, campo_data = linea.split(maxsplit=<span class="c-nb">2</span>)

    _, id_val = campo_id.split(<span class="c-st">"="</span>, <span class="c-nb">1</span>)
    _, dlc_val = campo_dlc.split(<span class="c-st">"="</span>, <span class="c-nb">1</span>)
    data_val = campo_data.replace(<span class="c-st">"DATA="</span>, <span class="c-st">""</span>)

    <span class="c-kw">return</span> {
        <span class="c-st">"id"</span>: id_val,
        <span class="c-st">"dlc"</span>: <span class="c-bi">int</span>(dlc_val),
        <span class="c-st">"data"</span>: data_val.split(),
    }

linea = <span class="c-st">"ID=0x1A3 DLC=8 DATA=DE AD BE EF 00 11 22 33"</span>
<span class="c-bi">print</span>(parsear_linea_can(linea))
<span class="c-cm"># {'id': '0x1A3', 'dlc': 8, 'data': ['DE','AD','BE','EF','00','11','22','33']}</span></pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-intermedio">INTERMEDIO</span>
    <span>Escribe una función <code>formatear_reporte(bench, test, resultado, duracion)</code> que genere una línea de reporte alineada en columnas usando f-strings, con el nombre del bench a la izquierda en un ancho de 10, el test a la izquierda en un ancho de 15, el resultado centrado en un ancho de 8, y la duración con 2 decimales seguida de "s".</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>formatear_reporte("A3","lidar","PASS",1.2345) == "A3         lidar           PASS   1.23s"</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Recuerda la sintaxis de formato de f-strings: <code>{valor:ancho}</code> alinea a la izquierda por default para strings, <code>{valor:^ancho}</code> centra, y <code>{valor:.2f}</code> formatea un float con 2 decimales.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Construye la f-string combinando cada especificador de formato para el campo correspondiente: <code>{bench:10}</code>, <code>{test:15}</code>, <code>{resultado:^8}</code> y <code>{duracion:.2f}s</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Concatena todo dentro de una sola f-string y retorna el resultado.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">formatear_reporte</span>(bench, test, resultado, duracion):
    <span class="c-kw">return</span> <span class="c-st">f"{bench:10}{test:15}{resultado:^8}{duracion:.2f}s"</span>

<span class="c-bi">print</span>(formatear_reporte(<span class="c-st">"A3"</span>, <span class="c-st">"lidar"</span>, <span class="c-st">"PASS"</span>, <span class="c-nb">1.2345</span>))
<span class="c-cm"># "A3         lidar           PASS   1.23s"</span></pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-intermedio">INTERMEDIO</span>
    <span>Escribe una función <code>es_id_valido(s)</code> que valide si un string tiene el formato de ID de bench esperado: exactamente 6 caracteres, los primeros 5 son letras mayúsculas y el último es un dígito (ej. <code>"BENCH3"</code> es válido, <code>"bench3"</code> y <code>"BENCH33"</code> no lo son).</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>es_id_valido("BENCH3") == True; es_id_valido("bench3") == False; es_id_valido("BENCH33") == False</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Valida primero el largo total con <code>len(s) == 6</code> — si no cumple, ya se puede retornar <code>False</code> sin seguir evaluando (evita indexar fuera de rango).</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Separa el string en la parte de letras (<code>s[:5]</code>) y el último carácter (<code>s[5]</code>) usando slicing.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Verifica que la parte de letras cumpla <code>isalpha()</code> y <code>isupper()</code> a la vez, y que el último carácter cumpla <code>isdigit()</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 4</div><div class="plan-content"><p>Combina todas las condiciones con <code>and</code> y retorna el resultado booleano final.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">es_id_valido</span>(s):
    <span class="c-kw">if</span> <span class="c-bi">len</span>(s) != <span class="c-nb">6</span>:
        <span class="c-kw">return</span> <span class="c-kw">False</span>
    letras, digito = s[:<span class="c-nb">5</span>], s[<span class="c-nb">5</span>]
    <span class="c-kw">return</span> letras.isalpha() <span class="c-kw">and</span> letras.isupper() <span class="c-kw">and</span> digito.isdigit()

<span class="c-bi">print</span>(es_id_valido(<span class="c-st">"BENCH3"</span>))   <span class="c-cm"># True</span>
<span class="c-bi">print</span>(es_id_valido(<span class="c-st">"bench3"</span>))   <span class="c-cm"># False — minúsculas</span>
<span class="c-bi">print</span>(es_id_valido(<span class="c-st">"BENCH33"</span>))  <span class="c-cm"># False — largo incorrecto</span></pre></div>
  </div>
</div>

<div class="exercise-steps-label">🔴 Complejo</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-complejo">COMPLEJO</span>
    <span>Escribe una función <code>parsear_csv_simple(linea)</code> que parsee una línea con formato CSV donde los campos pueden estar entre comillas dobles y contener comas dentro (ej. <code>'bench_a3,"lidar, radar",PASSED,1.23'</code> debe dar 4 campos, el segundo con la coma interna preservada). No uses el módulo <code>csv</code> — hazlo con métodos de string.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>parsear_csv_simple('bench_a3,"lidar, radar",PASSED,1.23') == ['bench_a3', 'lidar, radar', 'PASSED', '1.23']</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Un <code>split(",")</code> simple rompería el campo entrecomillado en dos, porque no sabe que esa coma está "protegida". Hay que recorrer carácter por carácter llevando un estado de "¿estoy dentro de comillas?".</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Inicializa una lista de campos, un buffer de texto acumulado (string vacío) y un flag booleano <code>dentro_comillas = False</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Recorre cada carácter de la línea: si es una comilla doble, invierte el flag <code>dentro_comillas</code> (y no la agregues al buffer); si es una coma y NO estás dentro de comillas, cierra el campo actual (agrégalo a la lista y reinicia el buffer); en cualquier otro caso, agrega el carácter al buffer.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 4</div><div class="plan-content"><p>Al terminar el loop, agrega el último buffer pendiente a la lista de campos (no hay coma final que lo dispare) y retorna la lista completa.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">parsear_csv_simple</span>(linea):
    campos = []
    buffer = <span class="c-st">""</span>
    dentro_comillas = <span class="c-kw">False</span>

    <span class="c-kw">for</span> ch <span class="c-kw">in</span> linea:
        <span class="c-kw">if</span> ch == <span class="c-st">'"'</span>:
            dentro_comillas = <span class="c-kw">not</span> dentro_comillas
        <span class="c-kw">elif</span> ch == <span class="c-st">","</span> <span class="c-kw">and</span> <span class="c-kw">not</span> dentro_comillas:
            campos.append(buffer)
            buffer = <span class="c-st">""</span>
        <span class="c-kw">else</span>:
            buffer += ch

    campos.append(buffer)   <span class="c-cm"># último campo, sin coma que lo cierre</span>
    <span class="c-kw">return</span> campos

linea = <span class="c-st">'bench_a3,"lidar, radar",PASSED,1.23'</span>
<span class="c-bi">print</span>(parsear_csv_simple(linea))
<span class="c-cm"># ['bench_a3', 'lidar, radar', 'PASSED', '1.23']</span></pre></div>
  </div>
</div>

<div class="quiz-card">
  <div class="quiz-q" onclick="toggleQuiz(this)">
    <span class="q-tag lvl-complejo">COMPLEJO</span>
    <span>Escribe una función <code>resumir_log(texto)</code> que reciba un log multilínea donde cada línea tiene formato <code>"NIVEL: mensaje"</code> (ej. <code>"INFO: ..."</code>, <code>"ERROR: ..."</code>) y devuelva un diccionario con el conteo de líneas por nivel, además de una clave <code>"total"</code> con el número total de líneas no vacías. Ignora líneas vacías o que no tengan el separador <code>": "</code>.</span>
    <span class="q-arr">▶</span>
  </div>
  <div class="quiz-a">
    <div class="exercise-output"><span class="exercise-output-label">Salida esperada</span><code>{'INFO': 2, 'ERROR': 1, 'WARNING': 1, 'total': 4}</code></div>
    <div class="exercise-steps-label">Procedimiento paso a paso</div>
    <div class="plan-card">
      <div class="plan-block"><div class="plan-time">Paso 1</div><div class="plan-content"><p>Divide el texto completo en líneas con <code>splitlines()</code> (más robusto que <code>split("\n")</code> porque maneja distintos finales de línea).</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 2</div><div class="plan-content"><p>Inicializa un diccionario vacío para los conteos y un contador <code>total = 0</code>.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 3</div><div class="plan-content"><p>Para cada línea, primero descarta las vacías con <code>if not linea.strip(): continue</code>. Luego verifica que contenga el separador <code>": "</code> con el operador <code>in</code> — si no lo tiene, la línea no tiene formato válido y se salta también.</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 4</div><div class="plan-content"><p>Usa <code>partition(": ")</code> para separar el nivel del resto del mensaje sin riesgo de romper el mensaje si este contiene más ":" internos (a diferencia de <code>split(": ")</code> que podría generar más de 2 partes).</p></div></div>
      <div class="plan-block"><div class="plan-time">Paso 5</div><div class="plan-content"><p>Incrementa el contador del nivel correspondiente usando <code>dict.get(nivel, 0) + 1</code> (evita el <code>KeyError</code> de acceder a una clave que aún no existe), suma 1 al total, y al final agrega <code>"total"</code> al diccionario de resultado.</p></div></div>
    </div>
    <div class="code-block"><div class="code-lang">Solución completa</div><pre>
<span class="c-kw">def</span> <span class="c-fn">resumir_log</span>(texto):
    conteos = {}
    total = <span class="c-nb">0</span>

    <span class="c-kw">for</span> linea <span class="c-kw">in</span> texto.splitlines():
        <span class="c-kw">if</span> <span class="c-kw">not</span> linea.strip():
            <span class="c-kw">continue</span>
        <span class="c-kw">if</span> <span class="c-st">": "</span> <span class="c-kw">not in</span> linea:
            <span class="c-kw">continue</span>

        nivel, _, _mensaje = linea.partition(<span class="c-st">": "</span>)
        conteos[nivel] = conteos.get(nivel, <span class="c-nb">0</span>) + <span class="c-nb">1</span>
        total += <span class="c-nb">1</span>

    conteos[<span class="c-st">"total"</span>] = total
    <span class="c-kw">return</span> conteos

log = <span class="c-st">"""INFO: bench iniciado
ERROR: sensor lidar no responde
WARNING: reintentando conexión
INFO: bench listo"""</span>

<span class="c-bi">print</span>(resumir_log(log))
<span class="c-cm"># {'INFO': 2, 'ERROR': 1, 'WARNING': 1, 'total': 4}</span></pre></div>
  </div>
</div>
  </div>
  <div id="ps-7" class="tab-panel">
<div class="concept-intro">Los <b>18 ejercicios completos</b> de la carpeta <code>Ejercicios_Python/Ejercicios_Strings</code> del repositorio, con su enunciado y solución tal como están guardados — para tenerlos siempre a mano sin salir de la app.</div>
<div class="tab-group-psex">
  <div class="tab-bar" style="flex-wrap:wrap">
    <button class="tab-btn active" onclick="switchTab(this,'psex-1','psex')">1. Slicing</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-2','psex')">2. Limpieza</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-3','psex')">3. Print (f-strings)</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-4','psex')">4. Split</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-5','psex')">5. Booleans</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-6','psex')">6. Salto de Línea</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-7','psex')">7. For</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-8','psex')">8. Replace</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-9','psex')">9. Find</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-10','psex')">10. Ordenamiento</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-11','psex')">11. Reconstructor (join)</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-12','psex')">12. zFill</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-13','psex')">13. Mayus/Minus</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-14','psex')">14. Contar/Validar</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-15','psex')">15. Join</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-16','psex')">16. Formateo Avanzado</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-17','psex')">17. Comprehension</button>
    <button class="tab-btn" onclick="switchTab(this,'psex-18','psex')">18. BigO</button>
  </div>

  <div id="psex-1" class="tab-panel active">
<div class="code-block"><div class="code-lang">1_Slicing_Strings.py</div><pre>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: ÍNDICES Y REBANADAS (SLICING)
# ==============================================================================
# Un string es una secuencia de caracteres.
# Sintaxis: cadena[inicio:fin:paso]
# - El índice 'fin' no se incluye en el resultado.
# - El índice '-1' siempre es el último carácter.
# ==============================================================================</span>

<span class="c-cm"># 🛠️ EJERCICIO 1: ANATOMÍA DE UN VIN (SOLUCIÓN)</span>
vin = <span class="c-st">"1HGCM82635A001234"</span>

<span class="c-cm"># A. Primer carácter (País de origen)</span>
pais = vin[<span class="c-nb">0</span>]

<span class="c-cm"># B. Últimos 6 caracteres (Número de serie)</span>
serie = vin[-<span class="c-nb">6</span>:]

<span class="c-cm"># C. Model Code (Índices del 3 al 8)</span>
modelo = vin[<span class="c-nb">3</span>:<span class="c-nb">8</span>]

<span class="c-cm"># D. VIN invertido (Truco del espejo)</span>
vin_espejo = vin[::-<span class="c-nb">1</span>]

<span class="c-bi">print</span>(f<span class="c-st">"País: {pais} | Serie: {serie} | Modelo: {modelo}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"VIN Invertido: {vin_espejo}"</span>)

<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: EL TERCER PARÁMETRO DEL SLICE [inicio:fin:paso]
# ==============================================================================
# El 'paso' determina cuántos caracteres saltar.
# paso 2: toma uno sí, uno no.
# paso -1: invierte la cadena.
# ==============================================================================</span>

<span class="c-cm"># 🛠️ EJERCICIO 8: FILTRADO DE SEÑALES (SOLUCIÓN)
# Supongamos que recibes lecturas intercaladas: "A1B2C3D4" (Letra=Sensor, Número=Valor)</span>
trama = <span class="c-st">"A1B2C3D4"</span>

<span class="c-cm"># 1. Extraer solo los nombres de los sensores (letras en índices pares)</span>
sensores = trama[<span class="c-nb">0</span>::<span class="c-nb">2</span>] <span class="c-cm"># Empieza en 0, hasta el final, de 2 en 2</span>

<span class="c-cm"># 2. Extraer solo los valores (números en índices impares)</span>
valores = trama[<span class="c-nb">1</span>::<span class="c-nb">2</span>] <span class="c-cm"># Empieza en 1, hasta el final, de 2 en 2</span>

<span class="c-bi">print</span>(f<span class="c-st">"Sensores detectados: {sensores}"</span>) <span class="c-cm"># ABCD</span>
<span class="c-bi">print</span>(f<span class="c-st">"Valores reportados: {valores}"</span>)   <span class="c-cm"># 1234</span></pre></div>
  </div>

  <div id="psex-2" class="tab-panel">
<div class="code-block"><div class="code-lang">2_Limpieza_Strings.py</div><pre>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: MÉTODOS DE TRANSFORMACIÓN
# ==============================================================================
# .strip(): Elimina espacios (o caracteres) al inicio y al final.
# .replace(viejo, nuevo): Cambia una parte del texto por otra.
# .upper() / .lower(): Cambia el "case" del texto.
# ==============================================================================</span>

<span class="c-cm"># 🛠️ EJERCICIO 2: LIMPIEZA DE LOGS (SOLUCIÓN)</span>
entrada = <span class="c-st">"   ERROR: sensor fuera de rango   "</span>

<span class="c-cm"># 1. Quitar espacios y pasar a mayúsculas</span>
limpio = entrada.strip().upper()

<span class="c-cm"># 2. Reemplazar etiqueta para escalarlo</span>
final = limpio.replace(<span class="c-st">"ERROR"</span>, <span class="c-st">"CRÍTICO"</span>)

<span class="c-bi">print</span>(f<span class="c-st">"Mensaje procesado: '{final}'"</span>)
<span class="c-cm"># Resultado esperado: "CRÍTICO: SENSOR FUERA DE RANGO"</span>

<span class="c-cm">#</span></pre></div>
  </div>

  <div id="psex-3" class="tab-panel">
<div class="code-block"><div class="code-lang">3_Print_Strings.py</div><pre>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: FORMATO CON F-STRINGS
# ==============================================================================
# Es la forma más rápida y moderna de concatenar en Python.
# Permite formatear números: {variable:.2f} (para 2 decimales).
# Permite alinear texto: {variable:&gt;15} (15 espacios a la derecha).
# ==============================================================================</span>

<span class="c-cm"># 🛠️ EJERCICIO 3: GENERADOR DE REPORTES (SOLUCIÓN)</span>
sensor = <span class="c-st">"Termocupla"</span>
valor = <span class="c-nb">23.5678</span>
estado = <span class="c-st">"Activo"</span>

<span class="c-cm"># Creamos el reporte con formato profesional
# :.2f redondea el voltaje o temperatura para el log
# :&gt;15 empuja el nombre del sensor para que los reportes salgan alineados</span>
reporte = f<span class="c-st">"DISPOSITIVO: {sensor:&gt;15} | LECTURA: {valor:.2f}°C | STATUS: {estado}"</span>

<span class="c-bi">print</span>(reporte)</pre></div>
  </div>

  <div id="psex-4" class="tab-panel">
<div class="code-block"><div class="code-lang">4_Split_Strings.py</div><pre>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: SEGMENTACIÓN
# ==============================================================================
# .split(separador): Rompe el string y lo convierte en una LISTA.
# Es el puente entre los dos temas que estás aprendiendo.
# ==============================================================================</span>

<span class="c-cm"># 🛠️ EJERCICIO 4: ANALIZADOR DE COMANDOS (SOLUCIÓN)</span>
comando = <span class="c-st">"SET_TEMP:25:UNIT:CELSIUS:MODE:AUTO"</span>

<span class="c-cm"># 1. Convertir a lista usando el separador ':'</span>
partes = comando.split(<span class="c-st">":"</span>)

<span class="c-cm"># 2. Contar ocurrencias y buscar posición</span>
conteo_mode = comando.count(<span class="c-st">"MODE"</span>)
posicion_unit = comando.find(<span class="c-st">"UNIT"</span>)

<span class="c-bi">print</span>(f<span class="c-st">"Lista de parámetros: {partes}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"La palabra 'MODE' aparece {conteo_mode} vez/veces."</span>)
<span class="c-bi">print</span>(f<span class="c-st">"La sección 'UNIT' empieza en el índice: {posicion_unit}"</span>)


<span class="c-cm"># 🛠️ EJERCICIO 9: REORDENAMIENTO DE SECUENCIA (SOLUCIÓN)</span>
secuencia = <span class="c-st">"STOP,START,WAIT,CALIBRATE"</span>
lista_pasos = secuencia.split(<span class="c-st">","</span>)
secuencia_invertida = []

<span class="c-cm"># Usamos el rango para recorrer la lista de atrás hacia adelante
# Pero para seguir tu regla: range(0, len(lista), 1)</span>
<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">0</span>, <span class="c-bi">len</span>(lista_pasos), <span class="c-nb">1</span>):
    <span class="c-cm"># Insertamos cada elemento al inicio para invertir la lista</span>
    elemento = lista_pasos[i]
    secuencia_invertida.insert(<span class="c-nb">0</span>, elemento)

secuencia_final = <span class="c-st">" -&gt; "</span>.join(secuencia_invertida)

<span class="c-bi">print</span>(f<span class="c-st">"Secuencia Final: {secuencia_final}"</span>)

<span class="c-cm">#</span></pre></div>
  </div>

  <div id="psex-5" class="tab-panel">
<div class="code-block"><div class="code-lang">5_Booleans_Strings.py</div><pre>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: MÉTODOS DE VALIDACIÓN (.is...)
# ==============================================================================
# Devuelven True o False. Ideales para poner dentro de un 'if'.
# .isdigit(): ¿Son solo números?
# .isalnum(): ¿Son letras y números (sin signos)?
# .startswith() / .endswith(): ¿Empieza o termina con X?
# ==============================================================================</span>

<span class="c-cm"># 🛠️ EJERCICIO 5: VALIDADOR DE TELEMETRÍA (SOLUCIÓN)</span>
id_sensor = <span class="c-st">"S001"</span>
lectura = <span class="c-st">"25"</span>

<span class="c-cm"># Validaciones críticas para un Test Engineer</span>
es_numero = lectura.isdigit()
es_id_valido = id_sensor.startswith(<span class="c-st">"S"</span>) <span class="c-kw">and</span> id_sensor[<span class="c-nb">1</span>:].isdigit()

<span class="c-bi">print</span>(f<span class="c-st">"¿La lectura es procesable como número?: {es_numero}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"¿El ID sigue el formato de protocolo (S + número)?: {es_id_valido}"</span>)</pre></div>
  </div>

  <div id="psex-6" class="tab-panel">
<div class="code-block"><div class="code-lang">6_SaltoDeLinea_Stings.py</div><pre>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: CARACTERES DE ESCAPE
# ==============================================================================
# \\n : Salto de línea (Enter).
# \\t : Tabulación (Tab).
# \\" : Incluir comillas dobles dentro de un string de comillas dobles.
# ==============================================================================</span>

<span class="c-cm"># 🛠️ EJERCICIO 6: EL TRADUCTOR DE BYTES (SOLUCIÓN)
# Construimos un reporte multilínea en una sola variable</span>
reporte_hw = <span class="c-st">"Reporte de Hardware:\\n\\tCPU: \"Intel Core\"\\n\\tRAM: '16GB'"</span>

<span class="c-bi">print</span>(reporte_hw)

<span class="c-cm"># TIP: También puedes usar comillas triples para textos largos</span>
reporte_pro = <span class="c-st">"""
Detalle del Sistema:
-------------------
Estado: OK
Versión: 1.0.2
"""</span>
<span class="c-bi">print</span>(reporte_pro)</pre></div>
  </div>

  <div id="psex-7" class="tab-panel">
<div class="code-block"><div class="code-lang">7_For_String.py</div><pre>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: ITERACIÓN POR ÍNDICE
# ==============================================================================
# Al usar range(0, len(cadena), 1), la variable 'i' representa el número
# de la posición (0, 1, 2...). Para obtener la letra, usamos cadena[i].
# ==============================================================================</span>

<span class="c-cm"># 🛠️ EJERCICIO 7: CONTADOR DE ALERTAS (SOLUCIÓN)</span>
trama_datos = <span class="c-st">"OK-OK-ERROR-OK-FAIL-OK-ERROR"</span>

conteo_e = <span class="c-nb">0</span>
<span class="c-cm"># Recorremos el string usando su longitud total</span>
<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">0</span>, <span class="c-bi">len</span>(trama_datos), <span class="c-nb">1</span>):
    <span class="c-cm"># Accedemos al carácter en la posición actual</span>
    <span class="c-kw">if</span> trama_datos[i] == <span class="c-st">"E"</span>:
        conteo_e += <span class="c-nb">1</span>

<span class="c-bi">print</span>(f<span class="c-st">"Análisis de trama: Se detectaron {conteo_e} inicios de error ('E')."</span>)

<span class="c-cm">#</span></pre></div>
  </div>

  <div id="psex-8" class="tab-panel">
<div class="code-block"><div class="code-lang">8_Replace_String.py</div><pre>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: CONSTRUCCIÓN POR POSICIÓN
# ==============================================================================
# Como los strings son inmutables, para "cambiar" algo con un bucle,
# empezamos con un string vacío y le vamos sumando caracteres.
# ==============================================================================</span>

<span class="c-cm"># 🛠️ EJERCICIO 8: ANONIMIZACIÓN DE DATOS (SOLUCIÓN)</span>
ip_cruda = <span class="c-st">"192.168.1.1"</span>
ip_segura = <span class="c-st">""</span>

<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">0</span>, <span class="c-bi">len</span>(ip_cruda), <span class="c-nb">1</span>):
    <span class="c-cm"># Si el carácter es un punto, lo cambiamos por una 'X'</span>
    <span class="c-kw">if</span> ip_cruda[i] == <span class="c-st">"."</span>:
        ip_segura += <span class="c-st">"X"</span>
    <span class="c-kw">else</span>:
        <span class="c-cm"># Si no es punto, dejamos el número original</span>
        ip_segura += ip_cruda[i]

<span class="c-bi">print</span>(f<span class="c-st">"IP Original: {ip_cruda}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"IP Protegida: {ip_segura}"</span>)

<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: .replace(viejo, nuevo)
# ==============================================================================
# El método busca TODAS las apariciones de la subcadena y las cambia.
# Es ideal para cambiar formatos de archivos o etiquetas de sensores.
# ==============================================================================</span>

<span class="c-cm"># 🛠️ EJERCICIO 20: LIMPIEZA DE SEPARADORES (SOLUCIÓN)</span>
trama = <span class="c-st">"ID:001;TEMP:25;STATUS:OK"</span>

<span class="c-cm"># Cambiamos los puntos y coma por barras inclinadas</span>
trama_nueva = trama.replace(<span class="c-st">";"</span>, <span class="c-st">" / "</span>)

<span class="c-cm"># Usamos tu bucle para imprimir cada carácter del resultado final</span>
<span class="c-bi">print</span>(<span class="c-st">"--- Trama Procesada ---"</span>)
<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">0</span>, <span class="c-bi">len</span>(trama_nueva), <span class="c-nb">1</span>):
    <span class="c-bi">print</span>(f<span class="c-st">"Índice {i}: {trama_nueva[i]}"</span>)

<span class="c-bi">print</span>(f<span class="c-st">"\\nResultado final: {trama_nueva}"</span>)

<span class="c-cm">#</span></pre></div>
  </div>

  <div id="psex-9" class="tab-panel">
<div class="code-block"><div class="code-lang">9_Find_Strings.py</div><pre>
<span class="c-cm"># 🛠️ 14_Busqueda_Segura.py</span>
log = <span class="c-st">"TEMP:25.5;STATUS:OK"</span>

<span class="c-cm"># Buscamos 'ERROR' de forma segura</span>
posicion = log.find(<span class="c-st">"ERROR"</span>)

<span class="c-kw">if</span> posicion == -<span class="c-nb">1</span>:
    <span class="c-bi">print</span>(<span class="c-st">"✅ El log está limpio de errores."</span>)
<span class="c-kw">else</span>:
    <span class="c-cm"># Usamos el bucle para analizar la zona del error</span>
    <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(posicion, <span class="c-bi">len</span>(log), <span class="c-nb">1</span>):
        <span class="c-bi">print</span>(f<span class="c-st">"Analizando falla en índice {i}: {log[i]}"</span>)</pre></div>
  </div>

  <div id="psex-10" class="tab-panel">
<div class="code-block"><div class="code-lang">10_Ordenamiento_Strings.py</div><pre>
<span class="c-cm"># 🛠️ EJERCICIO 11: ORDENAMIENTO DE ETIQUETAS (SOLUCIÓN)</span>
tag_id = <span class="c-st">"B5A1C3"</span>
<span class="c-cm"># Primero ordenamos (devuelve una lista)</span>
caracteres_ordenados = <span class="c-bi">sorted</span>(tag_id)
tag_final = <span class="c-st">""</span>

<span class="c-cm"># Usamos el rango para reconstruir el string a partir de la lista ordenada</span>
<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">0</span>, <span class="c-bi">len</span>(caracteres_ordenados), <span class="c-nb">1</span>):
    tag_final += caracteres_ordenados[i]

<span class="c-bi">print</span>(f<span class="c-st">"Tag ID normalizado: {tag_final}"</span>)</pre></div>
  </div>

  <div id="psex-11" class="tab-panel">
<div class="code-block"><div class="code-lang">11_Reconstructor_Strings.py</div><pre>
<span class="c-cm"># 🛠️ 11_Join_Strings.py
# Objetivo: Unir una lista de estados en una sola cadena para un log.</span>
pasos = [<span class="c-st">"CONECTADO"</span>, <span class="c-st">"TEST_OK"</span>, <span class="c-st">"DESCONECTADO"</span>]
reporte_final = <span class="c-st">""</span>

<span class="c-cm"># Usamos el método nativo .join()</span>
reporte_final = <span class="c-st">" -&gt; "</span>.join(pasos)

<span class="c-cm"># Usamos tu bucle para validar la longitud del reporte generado</span>
<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">0</span>, <span class="c-bi">len</span>(reporte_final), <span class="c-nb">1</span>):
    <span class="c-kw">if</span> reporte_final[i] == <span class="c-st">"&gt;"</span>:
        <span class="c-bi">print</span>(f<span class="c-st">"Flecha de seguimiento detectada en índice {i}"</span>)

<span class="c-bi">print</span>(f<span class="c-st">"Log generado: {reporte_final}"</span>)</pre></div>
  </div>

  <div id="psex-12" class="tab-panel">
<div class="code-block"><div class="code-lang">12_zFill_Strings.py</div><pre>
<span class="c-cm"># 🛠️ 12_Padding_Zfill.py</span>
id_corto = <span class="c-st">"A15"</span>

<span class="c-cm"># Rellenamos con ceros a la izquierda hasta tener 8 caracteres</span>
id_completo = id_corto.zfill(<span class="c-nb">8</span>)

<span class="c-bi">print</span>(f<span class="c-st">"ID Original: {id_corto}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"ID para Protocolo: {id_completo}"</span>)

<span class="c-cm"># Image of [Python string zfill and padding for hardware IDs]</span></pre></div>
  </div>

  <div id="psex-13" class="tab-panel">
<div class="code-block"><div class="code-lang">13_MayusMinus_Strings.py</div><pre>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: MAYÚSCULAS Y MINÚSCULAS
# ==============================================================================
# .upper()     : Convierte TODO el string a mayúsculas.
# .lower()     : Convierte TODO el string a minúsculas.
# .capitalize(): Pone en mayúscula solo la primera letra, el resto en minúscula.
# .title()     : Pone en mayúscula la primera letra de CADA palabra.
# .swapcase()  : Invierte mayúsculas por minúsculas y viceversa.
# Estos métodos NO modifican el string original (son inmutables), devuelven
# uno nuevo. Muy usados para normalizar datos antes de comparar (ej. logins).
# ==============================================================================</span>

<span class="c-cm"># 🛠️ EJERCICIO 13: NORMALIZADOR DE IDs DE SENSOR (SOLUCIÓN)</span>
id_crudo = <span class="c-st">"sns-014_temperatura"</span>
nombre_operario = <span class="c-st">"juan carlos perez"</span>

<span class="c-cm"># A. Normalizamos el ID a mayúsculas para comparaciones estrictas en el sistema</span>
id_normalizado = id_crudo.upper()

<span class="c-cm"># B. Convertimos el nombre a formato "Título" para mostrarlo en un reporte</span>
nombre_formateado = nombre_operario.title()

<span class="c-cm"># C. Comparación segura ignorando el caso original con .lower()</span>
entrada_usuario = <span class="c-st">"SNS-014_TEMPERATURA"</span>
coincide = entrada_usuario.lower() == id_crudo.lower()

<span class="c-bi">print</span>(f<span class="c-st">"ID original: {id_crudo}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"ID normalizado: {id_normalizado}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Nombre del operario: {nombre_formateado}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"¿La entrada coincide con el ID (sin importar mayúsculas)?: {coincide}"</span>)</pre></div>
  </div>

  <div id="psex-14" class="tab-panel">
<div class="code-block"><div class="code-lang">14_ContarValidar_Strings.py</div><pre>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: CONTEO Y VALIDACIÓN DE FORMATO
# ==============================================================================
# .count(sub)     : Cuenta cuántas veces aparece una subcadena.
# .startswith(sub): ¿El string empieza con X? Devuelve True/False.
# .endswith(sub)  : ¿El string termina con X? Devuelve True/False.
# Muy usados para validar protocolos, extensiones de archivo o cabeceras
# de una trama antes de procesarla.
# ==============================================================================</span>

<span class="c-cm"># 🛠️ EJERCICIO 14: VALIDADOR DE ARCHIVOS DE LOG (SOLUCIÓN)</span>
archivo = <span class="c-st">"reporte_turno_noche_2026.log"</span>
trama = <span class="c-st">"STX;DATA;DATA;DATA;ETX"</span>

<span class="c-cm"># A. Verificamos que el archivo tenga la extensión correcta</span>
es_log_valido = archivo.endswith(<span class="c-st">".log"</span>)

<span class="c-cm"># B. Verificamos que la trama empiece con el byte de inicio esperado (STX)</span>
inicio_valido = trama.startswith(<span class="c-st">"STX"</span>)

<span class="c-cm"># C. Contamos cuántos bloques de datos trae la trama</span>
bloques_data = trama.count(<span class="c-st">"DATA"</span>)

<span class="c-bi">print</span>(f<span class="c-st">"Archivo: {archivo}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"¿Es un archivo .log válido?: {es_log_valido}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"¿La trama empieza con STX?: {inicio_valido}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Cantidad de bloques 'DATA' encontrados: {bloques_data}"</span>)</pre></div>
  </div>

  <div id="psex-15" class="tab-panel">
<div class="code-block"><div class="code-lang">15_Join_Strings.py</div><pre>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: ENSAMBLADO CON .join()
# ==============================================================================
# "separador".join(lista): Toma una LISTA de strings y los une en un solo
# string, colocando el separador entre cada elemento. Es lo opuesto a .split().
# Es mucho más eficiente que concatenar con '+' dentro de un bucle.
# ==============================================================================</span>

<span class="c-cm"># 🛠️ EJERCICIO 15: ENSAMBLADOR DE TRAMAS (SOLUCIÓN)</span>
fragmentos = [<span class="c-st">"STX"</span>, <span class="c-st">"ID:014"</span>, <span class="c-st">"TEMP:25.6"</span>, <span class="c-st">"STATUS:OK"</span>, <span class="c-st">"ETX"</span>]

<span class="c-cm"># A. Unimos los fragmentos con ';' para reconstruir la trama completa</span>
trama_completa = <span class="c-st">";"</span>.join(fragmentos)

<span class="c-cm"># B. También podemos unir sin separador (cadena vacía) para pegar caracteres</span>
codigo_barras = [<span class="c-st">"4"</span>, <span class="c-st">"5"</span>, <span class="c-st">"0"</span>, <span class="c-st">"1"</span>, <span class="c-st">"2"</span>]
numero_serie = <span class="c-st">""</span>.join(codigo_barras)

<span class="c-bi">print</span>(f<span class="c-st">"Fragmentos originales: {fragmentos}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Trama ensamblada: {trama_completa}"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Número de serie ensamblado: {numero_serie}"</span>)

<span class="c-cm"># C. Round-trip: separamos y volvemos a unir para confirmar que es reversible</span>
fragmentos_recuperados = trama_completa.split(<span class="c-st">";"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"¿El round-trip conserva los datos?: {fragmentos_recuperados == fragmentos}"</span>)</pre></div>
  </div>

  <div id="psex-16" class="tab-panel">
<div class="code-block"><div class="code-lang">16_FormateoAvanzado_Strings.py</div><pre>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: FORMATEO AVANZADO CON F-STRINGS
# ==============================================================================
# f"{valor:&lt;10}"  : Alinea a la izquierda dejando 10 espacios de ancho.
# f"{valor:&gt;10}"  : Alinea a la derecha dejando 10 espacios de ancho.
# f"{valor:^10}"  : Centra el valor en 10 espacios de ancho.
# f"{numero:.2f}" : Redondea un decimal a 2 cifras después del punto.
# f"{numero:05d}" : Rellena un entero con ceros a la izquierda hasta 5 dígitos.
# IMPORTANTE: si concatenas varios campos con ancho, deja siempre un separador
# (espacio, "|", etc.) entre ellos, o el resultado se leerá como un solo número.
# ==============================================================================</span>

<span class="c-cm"># 🛠️ EJERCICIO 16: REPORTE TABULADO DE SENSORES (SOLUCIÓN)</span>
sensores = [
    (<span class="c-st">"SNS-01"</span>, <span class="c-nb">25.678</span>, <span class="c-nb">3</span>),
    (<span class="c-st">"SNS-14"</span>, <span class="c-nb">101.2</span>, <span class="c-nb">27</span>),
    (<span class="c-st">"SNS-99"</span>, <span class="c-nb">9.5</span>, <span class="c-nb">145</span>),
]

<span class="c-bi">print</span>(f<span class="c-st">"{'ID':&lt;8} | {'Temp(C)':&gt;10} | {'Ciclos':&gt;8}"</span>)
<span class="c-kw">for</span> id_sensor, temperatura, ciclos <span class="c-kw">in</span> sensores:
    <span class="c-cm"># A. ID alineado a la izquierda, temperatura y ciclos a la derecha
    # B. La temperatura se redondea a 2 decimales con .2f
    # C. Un separador " | " evita que los campos se lean como un solo número</span>
    <span class="c-bi">print</span>(f<span class="c-st">"{id_sensor:&lt;8} | {temperatura:&gt;10.2f} | {ciclos:&gt;8d}"</span>)

<span class="c-cm"># D. El zero-padding (05d) se usa para IDs numéricos, no para tablas con columnas</span>
numero_lote = <span class="c-nb">7</span>
<span class="c-bi">print</span>(f<span class="c-st">"\\nCódigo de lote generado: LOTE-{numero_lote:05d}"</span>)</pre></div>
  </div>

  <div id="psex-17" class="tab-panel">
<div class="code-block"><div class="code-lang">17_Comprehension_Strings.py</div><pre>
<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: LIST COMPREHENSION SOBRE STRINGS
# ==============================================================================
# Un string es iterable, así que se puede recorrer con comprehension igual
# que una lista: [operacion(c) for c in cadena if condicion].
# Es la forma más rápida de filtrar o transformar caracteres uno por uno.
# ==============================================================================</span>

<span class="c-cm"># 🛠️ EJERCICIO 17: FILTRO DE CARACTERES DE UNA TRAMA (SOLUCIÓN)</span>
trama_cruda = <span class="c-st">"S1N2S-0v1a4_T3E5M0P"</span>

<span class="c-cm"># A. Extraemos solo los dígitos de la trama usando comprehension + .isdigit()</span>
digitos = [caracter <span class="c-kw">for</span> caracter <span class="c-kw">in</span> trama_cruda <span class="c-kw">if</span> caracter.isdigit()]
<span class="c-bi">print</span>(f<span class="c-st">"Dígitos encontrados: {digitos}"</span>)

<span class="c-cm"># B. Extraemos solo las letras y las unimos de nuevo en un string con join()</span>
letras = <span class="c-st">""</span>.join([caracter <span class="c-kw">for</span> caracter <span class="c-kw">in</span> trama_cruda <span class="c-kw">if</span> caracter.isalpha()])
<span class="c-bi">print</span>(f<span class="c-st">"Solo letras: {letras}"</span>)

<span class="c-cm"># C. Transformamos cada carácter a mayúscula solo si es una letra (comprehension + if/else)</span>
transformado = <span class="c-st">""</span>.join(
    [c.upper() <span class="c-kw">if</span> c.isalpha() <span class="c-kw">else</span> c <span class="c-kw">for</span> c <span class="c-kw">in</span> trama_cruda]
)
<span class="c-bi">print</span>(f<span class="c-st">"Trama con letras en mayúscula: {transformado}"</span>)

<span class="c-cm"># D. Contamos cuántas vocales tiene un texto usando comprehension + len()</span>
texto = <span class="c-st">"sensor de temperatura activo"</span>
vocales = [c <span class="c-kw">for</span> c <span class="c-kw">in</span> texto <span class="c-kw">if</span> c <span class="c-kw">in</span> <span class="c-st">"aeiou"</span>]
<span class="c-bi">print</span>(f<span class="c-st">"Total de vocales en '{texto}': {len(vocales)}"</span>)</pre></div>
  </div>

  <div id="psex-18" class="tab-panel">
<div class="code-block"><div class="code-lang">18_BigO_Strings.py</div><pre>
<span class="c-st">"""
18. ANÁLISIS DE EFICIENCIA (TEÓRICO)
Objetivo: Evaluar el costo de construir strings grandes, para Honeywell/Google.

- Tienes que construir un reporte de texto a partir de 1,000,000 de líneas.
- En un comentario, responde cuál de estas dos formas es más eficiente y por qué:
  A) reporte = ""; for linea in datos: reporte += linea  (concatenar con +=)
  B) reporte = "".join(datos)  (usar .join() sobre una lista)

Pista: Investiga por qué los strings son inmutables en Python.
"""</span>

<span class="c-cm"># ==============================================================================
# 📔 NOTAS TÉCNICAS: INMUTABILIDAD Y CONCATENACIÓN
# ==============================================================================
# Un string en Python es INMUTABLE: no se puede modificar en memoria una vez
# creado. Cada vez que haces reporte += linea, Python en realidad crea un
# string COMPLETAMENTE NUEVO copiando todo el contenido anterior más el
# fragmento agregado, y descarta el string viejo.
# ==============================================================================</span>

<span class="c-st">"""
RESPUESTA AL DESAFÍO:
---------------------
Escenario: 1,000,000 de líneas de texto.

A) reporte += linea dentro de un bucle: Es O(n²) en el peor caso.
   En cada vuelta se copia TODO el contenido acumulado hasta ese momento.
   Con 1 línea copia 1, con 2 líneas copia 2, ... con 1,000,000 copia
   1,000,000. La suma de todas esas copias crece cuadráticamente.

B) "".join(datos): Es O(n) - Lineal.
   .join() primero calcula el tamaño total necesario y reserva la memoria
   UNA sola vez, luego copia cada fragmento exactamente una vez. No hay
   copias repetidas del contenido acumulado.

CONCLUSIÓN:
Para construir strings grandes a partir de muchas partes, siempre es
preferible juntar los fragmentos en una lista y usar "".join(lista) al
final, en lugar de concatenar con += dentro de un bucle.
"""</span>

<span class="c-cm"># 🛠️ DEMOSTRACIÓN PRÁCTICA CON MEDICIÓN DE TIEMPO</span>
<span class="c-kw">import</span> time

datos = [f<span class="c-st">"linea_{i};"</span> <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">100_000</span>)]

<span class="c-cm"># A. Método lento: concatenación con += dentro de un bucle</span>
inicio = time.perf_counter()
reporte_lento = <span class="c-st">""</span>
<span class="c-kw">for</span> linea <span class="c-kw">in</span> datos:
    reporte_lento += linea
tiempo_lento = time.perf_counter() - inicio

<span class="c-cm"># B. Método rápido: join() sobre la lista completa</span>
inicio = time.perf_counter()
reporte_rapido = <span class="c-st">""</span>.join(datos)
tiempo_rapido = time.perf_counter() - inicio

<span class="c-bi">print</span>(f<span class="c-st">"Tiempo con += en bucle: {tiempo_lento:.5f} segundos"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"Tiempo con ''.join(): {tiempo_rapido:.5f} segundos"</span>)
<span class="c-bi">print</span>(f<span class="c-st">"¿Ambos resultados son iguales?: {reporte_lento == reporte_rapido}"</span>)</pre></div>
  </div>

</div>
  </div>
</div>`,

};  // fin PYTHON_RICH

// ══════════════════════════════════════════════════════════════════
//  PYTHON RICH CONTENT — Funciones, POO y más
// ══════════════════════════════════════════════════════════════════
const PYTHON_RICH2 = {

'py-funciones': `
<div class="concept-intro">Una <strong>función</strong> es un bloque de código reutilizable que recibe entradas (parámetros), ejecuta lógica y opcionalmente retorna un valor. En Python las funciones son <strong>ciudadanos de primera clase</strong>: se pueden asignar a variables, pasar como argumentos y retornar desde otras funciones — esto habilita closures, decoradores y programación funcional.</div>
<div class="tab-group-pyfn">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'fn-1','pyfn')">Definición</button>
    <button class="tab-btn" onclick="switchTab(this,'fn-2','pyfn')">*args / **kwargs</button>
    <button class="tab-btn" onclick="switchTab(this,'fn-3','pyfn')">Lambda / HOF</button>
    <button class="tab-btn" onclick="switchTab(this,'fn-4','pyfn')">Closures</button>
    <button class="tab-btn" onclick="switchTab(this,'fn-5','pyfn')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'fn-6','pyfn')">✅ Mejores Prácticas</button>
  </div>
  <div id="fn-1" class="tab-panel active">
<div class="concept-intro">Python soporta varios tipos de parámetros: posicionales, con default, <code>keyword-only</code> (después de <code>*</code>) y <code>positional-only</code> (antes de <code>/</code>). Elegir el tipo correcto documenta la intención de la API y previene llamadas ambiguas.</div>
<table class="kv-table">
  <tr><th>Sintaxis</th><th>¿Qué hace?</th><th>Ejemplo → Resultado</th><th>Nota</th></tr>
  <tr><td>def f(x)</td><td>Parámetro posicional normal</td><td>f(1) → x=1</td><td>Se puede pasar por posición o por nombre</td></tr>
  <tr><td>def f(x=5)</td><td>Parámetro con valor default</td><td>f() → x=5</td><td>El default se evalúa UNA sola vez al definir la función</td></tr>
  <tr><td>def f(*, x)</td><td>Keyword-only: todo después de * se exige por nombre</td><td>f(x=1) → válido, f(1) → TypeError</td><td>Fuerza claridad en llamadas con muchos parámetros</td></tr>
  <tr><td>def f(x, /)</td><td>Positional-only: todo antes de / no admite nombre</td><td>f(1) → válido, f(x=1) → TypeError</td><td>Útil para congelar el nombre del parámetro en APIs públicas</td></tr>
  <tr><td>-> str</td><td>Type hint de retorno (no se valida en runtime)</td><td>solo documentación / linters</td><td>mypy y pyright sí lo verifican estáticamente</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — Definición de funciones</div><pre>
<span class="c-cm"># Básica, con type hints</span>
<span class="c-kw">def</span> <span class="c-fn">greet</span>(name: str) -&gt; str:
    <span class="c-kw">return</span> <span class="c-st">f"Hello, {name}"</span>

<span class="c-cm"># Argumentos con default</span>
<span class="c-kw">def</span> <span class="c-fn">retry</span>(func, times=<span class="c-nb">3</span>, delay=<span class="c-nb">1.0</span>):
    <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(times):
        <span class="c-kw">try</span>: <span class="c-kw">return</span> func()
        <span class="c-kw">except</span> <span class="c-bi">Exception</span>: <span class="c-kw">pass</span>

<span class="c-cm"># TRAMPA CLÁSICA: mutable default argument</span>
<span class="c-kw">def</span> <span class="c-fn">bad_append</span>(item, lst=[]):      <span class="c-cm"># la lista se crea UNA vez y se reutiliza</span>
    lst.append(item); <span class="c-kw">return</span> lst

<span class="c-kw">def</span> <span class="c-fn">good_append</span>(item, lst=<span class="c-kw">None</span>):  <span class="c-cm"># correcto</span>
    <span class="c-kw">if</span> lst <span class="c-kw">is None</span>: lst = []
    lst.append(item); <span class="c-kw">return</span> lst

<span class="c-cm"># Keyword-only arguments (después de *)</span>
<span class="c-kw">def</span> <span class="c-fn">run_test</span>(name, *, bench, timeout=<span class="c-nb">30</span>):
    <span class="c-kw">pass</span>
<span class="c-cm"># run_test("lidar", bench="A3")  ← bench DEBE darse por nombre</span>

<span class="c-cm"># Positional-only arguments (antes de /)</span>
<span class="c-kw">def</span> <span class="c-fn">power</span>(base, exp, /):    <span class="c-cm"># base y exp solo por posición</span>
    <span class="c-kw">return</span> base ** exp

<span class="c-cm"># Documentar con docstring — accesible vía help() y func.__doc__</span>
<span class="c-kw">def</span> <span class="c-fn">parse_dtc</span>(code: str) -&gt; <span class="c-bi">dict</span>:
    <span class="c-cm">"""Parsea un Diagnostic Trouble Code (ej. 'P0301') en sus partes.

    Args:
        code: código DTC de 5 caracteres.
    Returns:
        dict con 'system', 'type', 'number'.
    """</span>
    <span class="c-kw">return</span> {<span class="c-st">"system"</span>: code[<span class="c-nb">0</span>], <span class="c-st">"number"</span>: code[<span class="c-nb">1</span>:]}</pre></div>
  </div>
  <div id="fn-2" class="tab-panel">
<div class="concept-intro"><code>*args</code> agrupa argumentos posicionales extra en una <strong>tupla</strong>; <code>**kwargs</code> agrupa argumentos con nombre extra en un <strong>diccionario</strong>. Son esenciales para escribir wrappers/decoradores genéricos que no conocen de antemano la firma de la función que envuelven.</div>
<div class="code-block"><div class="code-lang">Python — *args y **kwargs</div><pre>
<span class="c-cm"># *args — captura positional args extras como tuple</span>
<span class="c-kw">def</span> <span class="c-fn">log</span>(level, *messages):
    <span class="c-kw">for</span> msg <span class="c-kw">in</span> messages:
        <span class="c-bi">print</span>(<span class="c-st">f"[{level}] {msg}"</span>)

log(<span class="c-st">"ERROR"</span>, <span class="c-st">"sensor fail"</span>, <span class="c-st">"bench A3"</span>)  <span class="c-cm"># messages = ("sensor fail","bench A3")</span>

<span class="c-cm"># **kwargs — captura keyword args extras como dict</span>
<span class="c-kw">def</span> <span class="c-fn">create_report</span>(title, **metadata):
    <span class="c-bi">print</span>(title, metadata)

create_report(<span class="c-st">"Daily"</span>, bench=<span class="c-st">"A3"</span>, date=<span class="c-st">"2024-07-08"</span>)
<span class="c-cm"># metadata = {'bench': 'A3', 'date': '2024-07-08'}</span>

<span class="c-cm"># Combinación completa — el ORDEN importa siempre:</span>
<span class="c-cm"># pos, *args, kw_only, **kwargs</span>
<span class="c-kw">def</span> <span class="c-fn">full_func</span>(pos1, pos2, *args, kw_only, **kwargs):
    <span class="c-bi">print</span>(pos1, pos2, args, kw_only, kwargs)

<span class="c-cm"># Desempaquetar al llamar (el * y ** también sirven "hacia afuera")</span>
params = [<span class="c-st">"bench_a3"</span>, <span class="c-st">"test_lidar"</span>]
config = {<span class="c-st">"timeout"</span>: <span class="c-nb">30</span>, <span class="c-st">"retries"</span>: <span class="c-nb">3</span>}
run_test(*params, **config)   <span class="c-cm"># desempaca lista y dict</span>

<span class="c-cm"># Caso real: wrapper genérico que reenvía TODO a otra función</span>
<span class="c-kw">def</span> <span class="c-fn">safe_call</span>(func, *args, **kwargs):
    <span class="c-kw">try</span>:
        <span class="c-kw">return</span> func(*args, **kwargs)
    <span class="c-kw">except</span> <span class="c-bi">Exception</span> <span class="c-kw">as</span> e:
        <span class="c-bi">print</span>(<span class="c-st">f"Fallo {func.__name__}: {e}"</span>)
        <span class="c-kw">return</span> <span class="c-kw">None</span></pre></div>
  </div>
  <div id="fn-3" class="tab-panel">
<div class="concept-intro">Las <strong>funciones de orden superior</strong> (HOF) reciben o retornan otras funciones. <code>lambda</code> crea funciones anónimas de una sola expresión, útiles como argumento rápido de <code>sort</code>, <code>map</code> o <code>filter</code> — pero para lógica reutilizable o con nombre, usa <code>def</code>.</div>
<div class="code-block"><div class="code-lang">Python — Lambda, map, filter, reduce</div><pre>
<span class="c-cm"># Lambda — función anónima de una expresión (sin return explícito)</span>
double = <span class="c-kw">lambda</span> x: x * <span class="c-nb">2</span>
sorter = <span class="c-kw">lambda</span> item: (item[<span class="c-st">'bench'</span>], item[<span class="c-st">'test'</span>])  <span class="c-cm"># sort key compuesta</span>

<span class="c-cm"># Cuándo usar lambda vs def</span>
<span class="c-cm"># Lambda: una vez, como argumento — def: reutilizable, con nombre o compleja</span>
events.sort(key=<span class="c-kw">lambda</span> e: e.timestamp)              <span class="c-cm"># lambda OK aquí</span>

<span class="c-cm"># map() — aplica función a cada elemento (lazy, retorna iterador)</span>
<span class="c-bi">list</span>(<span class="c-bi">map</span>(<span class="c-kw">lambda</span> x: x**<span class="c-nb">2</span>, [<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>]))    <span class="c-cm"># [1, 4, 9]</span>
<span class="c-cm"># Equivalente más Pythónico:</span>
[x**<span class="c-nb">2</span> <span class="c-kw">for</span> x <span class="c-kw">in</span> [<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>]]               <span class="c-cm"># prefiere esto sobre map+lambda</span>

<span class="c-cm"># filter() — filtra (lazy)</span>
<span class="c-bi">list</span>(<span class="c-bi">filter</span>(<span class="c-kw">lambda</span> x: x &gt; <span class="c-nb">2</span>, [<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>,<span class="c-nb">4</span>]))  <span class="c-cm"># [3, 4]</span>

<span class="c-cm"># reduce() — acumula (no built-in, requiere import)</span>
<span class="c-kw">from</span> functools <span class="c-kw">import</span> reduce
total = reduce(<span class="c-kw">lambda</span> acc, x: acc + x, [<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>,<span class="c-nb">4</span>])  <span class="c-cm"># 10</span>
<span class="c-cm"># Pero sum() es más claro para este caso</span>

<span class="c-cm"># partial — congela algunos argumentos, crea una nueva función</span>
<span class="c-kw">from</span> functools <span class="c-kw">import</span> partial
log_error = partial(<span class="c-bi">print</span>, <span class="c-st">"ERROR:"</span>)   <span class="c-cm"># print con primer arg fijo</span>
log_error(<span class="c-st">"sensor fail"</span>)               <span class="c-cm"># "ERROR: sensor fail"</span>

<span class="c-cm"># Funciones como argumento (HOF real) — inyección de comportamiento</span>
<span class="c-kw">def</span> <span class="c-fn">process_frames</span>(frames, transform):
    <span class="c-kw">return</span> [transform(f) <span class="c-kw">for</span> f <span class="c-kw">in</span> frames]

process_frames(can_frames, <span class="c-kw">lambda</span> f: f.decode_signal(<span class="c-st">"RPM"</span>))</pre></div>
  </div>
  <div id="fn-4" class="tab-panel">
<div class="concept-intro">Un <strong>closure</strong> es una función interna que "recuerda" las variables del scope de la función que la creó, incluso después de que esa función externa ya retornó. Es la base de fábricas de funciones, validadores parametrizados y (como veremos en el tema siguiente) los decoradores.</div>
<div class="code-block"><div class="code-lang">Python — Closures: funciones que recuerdan su contexto</div><pre>
<span class="c-cm"># Un closure es una función interna que accede a variables</span>
<span class="c-cm"># del scope de la función externa, incluso después de que ésta retorna.</span>

<span class="c-kw">def</span> <span class="c-fn">make_counter</span>(start=<span class="c-nb">0</span>):
    count = start          <span class="c-cm"># variable en el scope exterior</span>

    <span class="c-kw">def</span> <span class="c-fn">counter</span>():
        <span class="c-kw">nonlocal</span> count    <span class="c-cm"># nonlocal para modificar (no solo leer)</span>
        count += <span class="c-nb">1</span>
        <span class="c-kw">return</span> count

    <span class="c-kw">return</span> counter         <span class="c-cm"># retorna la función, no su resultado</span>

c = make_counter(<span class="c-nb">10</span>)
c()   <span class="c-cm"># 11</span>
c()   <span class="c-cm"># 12</span>

<span class="c-cm"># Caso práctico: factory de validadores</span>
<span class="c-kw">def</span> <span class="c-fn">make_range_validator</span>(min_val, max_val):
    <span class="c-kw">def</span> <span class="c-fn">validate</span>(value):
        <span class="c-kw">return</span> min_val &lt;= value &lt;= max_val
    <span class="c-kw">return</span> validate

validate_temp   = make_range_validator(-<span class="c-nb">40</span>, <span class="c-nb">125</span>)
validate_voltage = make_range_validator(<span class="c-nb">0</span>, <span class="c-nb">5</span>)
validate_temp(<span class="c-nb">30</span>)     <span class="c-cm"># True</span>
validate_voltage(<span class="c-nb">6</span>)  <span class="c-cm"># False</span>

<span class="c-cm"># TRAMPA: closure en loop captura la REFERENCIA, no el valor</span>
fns = [<span class="c-kw">lambda</span>: i <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">3</span>)]  <span class="c-cm"># TODAS retornan 2 (el último i)</span>
fns = [<span class="c-kw">lambda</span> x=i: x <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">3</span>)]  <span class="c-cm"># correcto: captura por valor</span>

<span class="c-cm"># Inspeccionar qué variables capturó un closure</span>
[cell.cell_contents <span class="c-kw">for</span> cell <span class="c-kw">in</span> counter.__closure__]  <span class="c-cm"># [10] (o el valor actual de count)</span></pre></div>
  </div>
  <div id="fn-5" class="tab-panel">
<div class="concept-intro">Estos son los errores de funciones que más aparecen en code review y en entrevistas técnicas — todos comparten la causa raíz de no entender <strong>cuándo</strong> se evalúa cada parte del código (al definir vs al llamar).</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>def add_reading(value, history=[]):
    history.append(value)
    return history

<span class="c-cm"># cada llamada "contamina" la misma lista</span>
add_reading(23.1)   # [23.1]
add_reading(24.0)   # [23.1, 24.0]  ← inesperado!</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>def add_reading(value, history=None):
    if history is None:
        history = []
    history.append(value)
    return history</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> los valores default se evalúan UNA sola vez, cuando Python ejecuta la sentencia <code>def</code> — no en cada llamada. Si el default es mutable (lista, dict, set), ese mismo objeto se reutiliza y acumula estado entre llamadas. Detectarlo: si un bug "aparece solo después de la segunda llamada", sospecha de un default mutable.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>def process(bench, timeout, retries, verbose,
            dry_run, save_log, notify):
    ...

# ¿cuál argumento es cuál? imposible de leer
process("A3", 30, 3, True, False, True, False)</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>def process(bench, *, timeout=30, retries=3,
            verbose=False, dry_run=False,
            save_log=True, notify=False):
    ...

process("A3", timeout=60, notify=True)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> con muchos parámetros booleanos posicionales, una llamada como <code>process("A3", 30, 3, True, False, True, False)</code> es imposible de auditar sin abrir la definición. Usar keyword-only (<code>*</code>) fuerza a que cada llamada sea autoexplicativa y evita el bug clásico de invertir dos argumentos del mismo tipo por accidente.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>fns = []
for sensor_id in ["temp", "rpm", "voltage"]:
    fns.append(lambda: read_sensor(sensor_id))

# las 3 funciones leen "voltage" (el último valor de sensor_id)
[f() for f in fns]</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>fns = []
for sensor_id in ["temp", "rpm", "voltage"]:
    fns.append(lambda sid=sensor_id: read_sensor(sid))

# cada lambda ahora captura su propio valor por default</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> el closure captura la <em>variable</em> <code>sensor_id</code>, no una copia de su valor en ese momento del loop. Cuando las funciones finalmente se ejecutan, todas ven el último valor que tomó la variable. Forzar la captura con un parámetro default (<code>sid=sensor_id</code>) evalúa el valor en el momento de crear la lambda, no al ejecutarla.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>def compute_checksum(data: bytes) -> int:
    total = sum(data)
    # olvidó el return
    total % 256

result = compute_checksum(payload)  # None !</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>def compute_checksum(data: bytes) -> int:
    total = sum(data)
    return total % 256</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> si una función no tiene <code>return</code> explícito (o termina un flujo sin pasar por uno), retorna <code>None</code> silenciosamente — Python no avisa. El bug se manifiesta lejos del origen, cuando se intenta operar sobre <code>None</code>. El type hint <code>-> int</code> ayuda a que un type checker (mypy) lo detecte antes de runtime.</div>
</div>
  <div id="fn-6" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Usa <code>None</code> como default y crea el mutable dentro del cuerpo</div>
  <p>Nunca uses listas, dicts o sets como valor default. El patrón <code>if x is None: x = []</code> es el estándar de facto en Python y evita el bug de estado compartido entre llamadas.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Fuerza keyword-only en funciones con más de 2-3 parámetros del mismo tipo</div>
  <p>Si tu función tiene varios <code>bool</code> o <code>int</code> seguidos, agrega <code>*</code> antes de ellos. <code>run(bench, *, timeout=30, retries=3)</code> es imposible de llamar mal por orden.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Agrega type hints incluso sin usar un type checker en CI</div>
  <p><code>def parse(code: str) -> dict:</code> documenta la intención, habilita autocompletado en el IDE y facilita que herramientas como mypy/pyright detecten errores antes de que lleguen al bench.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Prefiere comprehensions sobre map()/filter() con lambda</div>
  <p><code>[x**2 for x in data if x > 0]</code> es más legible que <code>list(map(lambda x: x**2, filter(lambda x: x>0, data)))</code>. Reserva lambda para argumentos cortos de una sola expresión (ej. <code>key=</code> en sort).</p>
</div>
<div class="practice-card">
  <div class="practice-title">Escribe docstrings en funciones públicas o con lógica no trivial</div>
  <p>Un docstring con formato Google/NumPy (Args, Returns, Raises) es accesible vía <code>help(func)</code> y lo consumen herramientas de documentación automática (Sphinx) y linters.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Evita funciones con más de ~4 parámetros posicionales — agrupa en un dataclass</div>
  <p>Si una función necesita muchos datos relacionados, considera <code>def run(config: BenchConfig)</code> en vez de 8 parámetros sueltos. Es más fácil de testear y de extender sin romper llamadas existentes.</p>
</div>
  </div>
</div>`,

'py-decoradores': `
<div class="concept-intro">Un <strong>decorador</strong> es una función que recibe otra función y retorna una función nueva que la envuelve, agregando comportamiento (logging, timing, retry, caché, validación) sin tocar el código original. La sintaxis <code>@decorador</code> es azúcar sintáctica: <code>func = decorador(func)</code> se ejecuta automáticamente justo debajo de la definición.</div>
<div class="tab-group-pydec">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pdc-1','pydec')">Concepto y decorador básico</button>
    <button class="tab-btn" onclick="switchTab(this,'pdc-2','pydec')">@wraps & args</button>
    <button class="tab-btn" onclick="switchTab(this,'pdc-3','pydec')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'pdc-4','pydec')">✅ Mejores Prácticas</button>
  </div>
  <div id="pdc-1" class="tab-panel active">
<div class="plan-card"><div class="plan-card-title">🎨 Decoradores — funciones que modifican funciones</div>
<div class="plan-block"><div class="plan-time">¿Qué es?</div><div class="plan-content"><h4>Una función que toma una función y retorna una función mejorada</h4><p>El decorador es azúcar sintáctica para <code>func = decorador(func)</code>. La línea <code>@decorador</code> sobre una función aplica ese patrón automáticamente. Esto permite agregar comportamiento (logging, timing, retry, auth) sin modificar el código original.</p></div></div>
<div class="plan-block"><div class="plan-time">Paso a paso: qué ejecuta Python realmente</div><div class="plan-content"><h4>El orden de ejecución es la clave para entender decoradores</h4><p>Cuando Python lee este código:</p></div></div>
</div>
<div class="code-block"><div class="code-lang">Python — Orden real de ejecución de un decorador</div><pre>
<span class="c-kw">def</span> <span class="c-fn">timer</span>(func):              <span class="c-cm"># PASO 1: se define timer (no se ejecuta aún)</span>
    <span class="c-bi">print</span>(<span class="c-st">f"timer() decorando a {func.__name__}"</span>)
    <span class="c-kw">def</span> <span class="c-fn">wrapper</span>(*args, **kwargs):  <span class="c-cm"># PASO 3: se define wrapper (tampoco se ejecuta)</span>
        <span class="c-bi">print</span>(<span class="c-st">"antes de llamar a func"</span>)
        result = func(*args, **kwargs)      <span class="c-cm"># PASO 5: esto corre cuando LLAMAS validate_mcap()</span>
        <span class="c-bi">print</span>(<span class="c-st">"después de llamar a func"</span>)
        <span class="c-kw">return</span> result
    <span class="c-kw">return</span> wrapper                    <span class="c-cm"># PASO 4: timer() retorna wrapper (una función, no un valor)</span>

<span class="c-dc">@timer</span>                            <span class="c-cm"># PASO 2: al leer esta línea, Python ejecuta:</span>
<span class="c-kw">def</span> <span class="c-fn">validate_mcap</span>(path):           <span class="c-cm"># validate_mcap = timer(validate_mcap)</span>
    <span class="c-bi">print</span>(<span class="c-st">f"validando {path}"</span>)          <span class="c-cm"># esto imprime "timer() decorando..." AL IMPORTAR EL MÓDULO</span>

<span class="c-cm"># En este punto, validate_mcap YA NO es la función original:</span>
<span class="c-cm"># es "wrapper", que internamente guarda una referencia (closure)</span>
<span class="c-cm"># a la función original bajo el nombre "func".</span>

validate_mcap(<span class="c-st">"log_001.mcap"</span>)  <span class="c-cm"># solo AHORA corren los prints 5 (dentro de wrapper)</span>
<span class="c-cm"># Salida completa:</span>
<span class="c-cm"># timer() decorando a validate_mcap      ← al definir (import time)</span>
<span class="c-cm"># antes de llamar a func                  ← al llamar (call time)</span>
<span class="c-cm"># validando log_001.mcap</span>
<span class="c-cm"># después de llamar a func</span></pre></div>
<div class="alert-card">La confusión #1 en entrevistas: <b>"decorar" y "llamar" son dos momentos distintos.</b> Decorar (aplicar <code>@decorador</code>) ocurre UNA vez, cuando Python importa/lee el módulo. Llamar a la función decorada ocurre cada vez que el código la invoca — y ahí es cuando corre el código de <code>wrapper</code>, incluyendo la llamada a la función original.</div>
<div class="code-block"><div class="code-lang">Python — Decorador básico con @wraps (versión limpia)</div><pre>
<span class="c-kw">import</span> functools, time

<span class="c-kw">def</span> <span class="c-fn">timer</span>(func):
    <span class="c-dc">@functools.wraps</span>(func)    <span class="c-cm"># preserva __name__, __doc__ de func</span>
    <span class="c-kw">def</span> <span class="c-fn">wrapper</span>(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)    <span class="c-cm"># llama la función original</span>
        elapsed = time.perf_counter() - start
        <span class="c-bi">print</span>(<span class="c-st">f"{func.__name__} tardó {elapsed:.4f}s"</span>)
        <span class="c-kw">return</span> result
    <span class="c-kw">return</span> wrapper

<span class="c-dc">@timer</span>
<span class="c-kw">def</span> <span class="c-fn">validate_mcap</span>(path):
    <span class="c-kw">pass</span>   <span class="c-cm"># ahora mide su tiempo automáticamente</span></pre></div>
  </div>
  <div id="pdc-2" class="tab-panel">
<div class="concept-intro">Un decorador que necesita <strong>argumentos propios</strong> (ej. <code>@retry(times=3)</code>) requiere un nivel extra de anidación: una función que retorna un decorador, que retorna un wrapper. También se pueden apilar (<em>stacking</em>) varios decoradores sobre una misma función — se aplican de abajo hacia arriba pero se ejecutan de afuera hacia adentro.</div>
<div class="code-block"><div class="code-lang">Python — Decorador con argumentos + stacking</div><pre>
<span class="c-cm"># Decorador con argumentos — necesita 3 niveles de anidación:</span>
<span class="c-cm"># retry(times=3)      → retorna decorator</span>
<span class="c-cm"># decorator(func)      → retorna wrapper</span>
<span class="c-cm"># wrapper(*args, **kw) → ejecuta la lógica real</span>
<span class="c-kw">def</span> <span class="c-fn">retry</span>(times=<span class="c-nb">3</span>, exceptions=(<span class="c-bi">Exception</span>,)):
    <span class="c-kw">def</span> <span class="c-fn">decorator</span>(func):
        <span class="c-dc">@functools.wraps</span>(func)
        <span class="c-kw">def</span> <span class="c-fn">wrapper</span>(*args, **kwargs):
            <span class="c-kw">for</span> attempt <span class="c-kw">in</span> <span class="c-bi">range</span>(times):
                <span class="c-kw">try</span>: <span class="c-kw">return</span> func(*args, **kwargs)
                <span class="c-kw">except</span> exceptions <span class="c-kw">as</span> e:
                    <span class="c-kw">if</span> attempt == times - <span class="c-nb">1</span>: <span class="c-kw">raise</span>
                    time.sleep(<span class="c-nb">0.5</span> * attempt)
        <span class="c-kw">return</span> wrapper
    <span class="c-kw">return</span> decorator

<span class="c-cm"># Stacking — se APLICAN de abajo hacia arriba, se EJECUTAN de afuera hacia adentro</span>
<span class="c-dc">@timer</span>
<span class="c-dc">@retry</span>(times=<span class="c-nb">3</span>, exceptions=(ConnectionError,))
<span class="c-kw">def</span> <span class="c-fn">connect_to_bench</span>(bench_id): <span class="c-kw">pass</span>
<span class="c-cm"># equivale a: connect_to_bench = timer(retry(times=3)(connect_to_bench))</span>
<span class="c-cm"># al LLAMAR: timer.wrapper() arranca el cronómetro → llama a retry.wrapper()</span>
<span class="c-cm"># → que reintenta internamente → cuando retry termina, timer detiene el cronómetro</span>

<span class="c-cm"># Decoradores útiles de la stdlib</span>
<span class="c-kw">from</span> functools <span class="c-kw">import</span> lru_cache, cached_property, singledispatch

<span class="c-dc">@lru_cache</span>(maxsize=<span class="c-nb">128</span>)     <span class="c-cm"># memoiza los últimos 128 resultados (misma firma → mismo resultado cacheado)</span>
<span class="c-kw">def</span> <span class="c-fn">parse_config</span>(path: str): <span class="c-kw">pass</span>

<span class="c-cm"># Decorador que preserva argumentos de la función decorada usando *args/**kwargs</span>
<span class="c-cm"># — SIN esto, el decorador solo serviría para funciones sin argumentos</span>
<span class="c-kw">def</span> <span class="c-fn">log_call</span>(func):
    <span class="c-dc">@functools.wraps</span>(func)
    <span class="c-kw">def</span> <span class="c-fn">wrapper</span>(*args, **kwargs):
        <span class="c-bi">print</span>(<span class="c-st">f"Llamando {func.__name__}(args={args}, kwargs={kwargs})"</span>)
        <span class="c-kw">return</span> func(*args, **kwargs)
    <span class="c-kw">return</span> wrapper

<span class="c-cm"># Decorador basado en clase (alternativa a función anidada)</span>
<span class="c-kw">class</span> <span class="c-fn">CountCalls</span>:
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.calls = <span class="c-nb">0</span>
    <span class="c-kw">def</span> <span class="c-fn">__call__</span>(self, *args, **kwargs):
        self.calls += <span class="c-nb">1</span>
        <span class="c-kw">return</span> self.func(*args, **kwargs)

<span class="c-dc">@CountCalls</span>
<span class="c-kw">def</span> <span class="c-fn">read_frame</span>(): <span class="c-kw">pass</span>
read_frame(); read_frame()
read_frame.calls   <span class="c-cm"># 2</span></pre></div>
  </div>
  <div id="pdc-3" class="tab-panel">
<div class="concept-intro">Estos errores aparecen constantemente en code review — casi todos vienen de olvidar que el <code>wrapper</code> debe reenviar argumentos, preservar metadata, y ejecutar la lógica en el momento correcto (definición vs llamada).</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>def cache(func):
    result = func()   # se ejecuta UNA vez al decorar,
    return lambda: result   # no en cada llamada!

@cache
def read_config():
    return load_from_disk()  # solo corre 1 vez, siempre</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>def cache(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)  # corre en cada llamada
    return wrapper</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> el cuerpo de <code>cache</code> (fuera del wrapper interno) se ejecuta al momento de DECORAR, no de llamar. Si pones lógica de negocio ahí en vez de dentro de <code>wrapper</code>, esa lógica corre una sola vez cuando Python importa el módulo, no cada vez que se invoca la función decorada.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>def timer(func):
    def wrapper():        # sin *args, **kwargs
        return func()
    return wrapper

@timer
def connect(bench_id, timeout=30):
    ...

connect("A3", timeout=60)  # TypeError: wrapper() takes 0 args</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>def timer(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> el wrapper reemplaza por completo a la función original — si no acepta <code>*args, **kwargs</code> y los reenvía, el decorador solo funciona con funciones sin argumentos. Este es el error más común al escribir el primer decorador genérico.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>def timer(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper   # sin @functools.wraps

@timer
def validate_mcap(path):
    """Valida un archivo .mcap."""
    ...

validate_mcap.__name__  # "wrapper" — perdió su identidad!
validate_mcap.__doc__   # None — perdió el docstring!</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> sin <code>@functools.wraps(func)</code>, <code>wrapper</code> reemplaza los metadatos (<code>__name__</code>, <code>__doc__</code>, <code>__module__</code>) de la función original con los suyos propios. Esto rompe logging, debugging con pdb, herramientas de documentación (Sphinx) y tests que verifican <code>__name__</code>.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>def retry(func, times=3):   # falta el nivel extra de anidación
    def wrapper(*args, **kwargs):
        ...
    return wrapper

@retry(times=3)   # TypeError: retry() falta 1 argumento posicional (func)
def connect(): ...</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>def retry(times=3):        # nivel 1: recibe args del decorador
    def decorator(func):    # nivel 2: recibe la función
        def wrapper(*a, **k):  # nivel 3: recibe args de la llamada
            ...
        return wrapper
    return decorator</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>@retry(times=3)</code> primero EVALÚA <code>retry(times=3)</code> — eso debe retornar algo invocable con la función como único argumento (el decorador real). Si <code>retry</code> mezcla los dos niveles, Python intenta pasarle <code>func</code> y <code>times</code> juntos y falla. Regla mental: "decorador con paréntesis" siempre necesita 3 niveles de funciones anidadas.</div>
</div>
  <div id="pdc-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Usa @functools.wraps SIEMPRE, sin excepción</div>
  <p>Sin <code>@wraps</code>, la función decorada pierde su identidad: <code>validate_mcap.__name__</code> sería <code>"wrapper"</code> en vez de <code>"validate_mcap"</code>. Esto rompe logging, debugging y herramientas como Sphinx. <code>@wraps</code> copia <code>__name__</code>, <code>__doc__</code>, <code>__module__</code> y otros atributos al wrapper.</p>
</div>
<div class="practice-card">
  <div class="practice-title">El wrapper interno siempre debe firmar (*args, **kwargs)</div>
  <p>Salvo que el decorador esté diseñado para una firma específica, reenviar todos los argumentos con <code>func(*args, **kwargs)</code> es lo que hace al decorador reutilizable con cualquier función.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Prefiere decoradores de la stdlib antes de escribir los tuyos</div>
  <p><code>@functools.lru_cache</code> para memoización, <code>@functools.cached_property</code> para propiedades costosas calculadas una vez, <code>@functools.singledispatch</code> para overloading por tipo. Son probados, rápidos y ya conocidos por otros devs.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Documenta el orden cuando apilas decoradores</div>
  <p>El orden de <code>@a</code> / <code>@b</code> sobre una función cambia el comportamiento (ej. <code>@timer</code> por fuera de <code>@retry</code> mide el tiempo total incluyendo reintentos; al revés, solo mediría el último intento). Agrega un comentario si el orden es importante para la lógica.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Evita efectos secundarios costosos fuera del wrapper</div>
  <p>Todo lo que esté en el cuerpo de la función decoradora (fuera de <code>wrapper</code>) corre una sola vez, al importar el módulo. No hagas ahí llamadas de red, lecturas de archivo grandes, ni nada que dependa de argumentos de la llamada.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Para decoradores complejos con estado, considera una clase</div>
  <p>Si el decorador necesita mantener contadores, cachés propios o configuración compleja, una clase con <code>__call__</code> suele ser más clara que múltiples niveles de closures anidados.</p>
</div>
  </div>
</div>`,

'py-generadores': `
<div class="concept-intro">Un <strong>generador</strong> es una función que usa <code>yield</code> en vez de (o además de) <code>return</code>. En lugar de calcular todo el resultado de una vez y devolverlo en memoria, produce valores <strong>uno a la vez, bajo demanda</strong> (lazy evaluation). Esto es clave cuando el dataset es grande, potencialmente infinito, o solo se va a recorrer una vez — como logs de telemetría de millones de líneas o streams de sensores en tiempo real.</div>
<div class="tab-group-pygen">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pgn-1','pygen')">yield vs return</button>
    <button class="tab-btn" onclick="switchTab(this,'pgn-2','pygen')">Gen expressions & itertools</button>
    <button class="tab-btn" onclick="switchTab(this,'pgn-3','pygen')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'pgn-4','pygen')">✅ Mejores Prácticas</button>
  </div>
  <div id="pgn-1" class="tab-panel active">
<table class="kv-table">
  <tr><th>Concepto</th><th>¿Qué hace?</th><th>Ejemplo → Resultado</th><th>Nota</th></tr>
  <tr><td>return</td><td>Termina la función y entrega UN valor final; el estado se pierde</td><td>return [1,2,3] → toda la lista en RAM ya</td><td>La función completa corre antes de retornar</td></tr>
  <tr><td>yield</td><td>Pausa la función y entrega un valor; el estado se conserva</td><td>next(gen) → siguiente valor</td><td>La ejecución se reanuda justo después del yield en la próxima llamada</td></tr>
  <tr><td>next(gen)</td><td>Avanza el generador hasta el próximo yield</td><td>next(gen) → valor o StopIteration</td><td>StopIteration marca el fin — los for loops lo manejan solos</td></tr>
  <tr><td>yield from</td><td>Delega la iteración completa a otro iterable/generador</td><td>yield from sub_gen() → reenvía cada valor de sub_gen</td><td>Evita loops manuales de "for x in sub_gen: yield x"</td></tr>
  <tr><td>send(valor)</td><td>Envía un valor AL generador, que lo recibe como resultado de yield</td><td>gen.send(5) → reanuda y x = 5 dentro</td><td>Permite comunicación bidireccional (poco usado, pero preguntado en entrevistas)</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — Generadores: yield vs return</div><pre>
<span class="c-cm"># Una función con yield es un generador</span>
<span class="c-cm"># Al llamarla, retorna un objeto generador (no ejecuta nada aún — lazy)</span>
<span class="c-cm"># Cada next() la ejecuta hasta el próximo yield</span>

<span class="c-kw">def</span> <span class="c-fn">read_log_lines</span>(path, batch_size=<span class="c-nb">100</span>):
    <span class="c-cm">"""Genera líneas de log de a batch_size — sin cargar todo en RAM."""</span>
    batch = []
    <span class="c-kw">with</span> <span class="c-bi">open</span>(path) <span class="c-kw">as</span> f:
        <span class="c-kw">for</span> line <span class="c-kw">in</span> f:
            batch.append(line.rstrip())
            <span class="c-kw">if</span> <span class="c-bi">len</span>(batch) == batch_size:
                <span class="c-kw">yield</span> batch      <span class="c-cm"># pausa aquí, retorna batch, GUARDA el estado local</span>
                batch = []        <span class="c-cm"># continúa desde aquí en el próximo next()</span>
        <span class="c-kw">if</span> batch:
            <span class="c-kw">yield</span> batch         <span class="c-cm"># último batch incompleto</span>

<span class="c-cm"># Uso — procesa 10M líneas con O(batch_size) memoria, no O(n)</span>
<span class="c-kw">for</span> batch <span class="c-kw">in</span> read_log_lines(<span class="c-st">"huge.log"</span>):
    process_batch(batch)

<span class="c-cm"># next() y StopIteration — lo que el "for" hace por debajo</span>
gen = read_log_lines(<span class="c-st">"file.log"</span>)
first = <span class="c-bi">next</span>(gen)           <span class="c-cm"># primer batch — la función corre hasta el 1er yield</span>
second = <span class="c-bi">next</span>(gen)          <span class="c-cm"># reanuda DESPUÉS del yield anterior, corre hasta el 2do</span>
<span class="c-cm"># cuando se agota, lanza StopIteration (el for loop la atrapa automáticamente)</span>

<span class="c-cm"># yield from — delega a otro iterable/generador</span>
<span class="c-kw">def</span> <span class="c-fn">all_errors_from_all_benches</span>(bench_logs):
    <span class="c-kw">for</span> log_path <span class="c-kw">in</span> bench_logs:
        <span class="c-kw">yield from</span> read_log_lines(log_path)   <span class="c-cm"># delega al sub-generador</span>

<span class="c-cm"># Generadores infinitos — útiles para streams en tiempo real (nunca haría esto con una lista)</span>
<span class="c-kw">def</span> <span class="c-fn">timestamp_stream</span>(interval=<span class="c-nb">0.1</span>):
    <span class="c-kw">while</span> <span class="c-kw">True</span>:
        <span class="c-kw">yield</span> time.time()
        time.sleep(interval)</pre></div>
<div class="alert-card"><b>Medido en la práctica:</b> procesar un log de telemetría de <b>5 millones de líneas</b> con <code>[parse(l) for l in open(path)]</code> (list comprehension) puede consumir <b>&gt;1.5 GB de RAM</b> si cada línea parseada pesa ~300 bytes. La versión generador <code>(parse(l) for l in open(path))</code> mantiene el uso de memoria prácticamente constante (unos pocos KB) porque solo una línea existe en memoria a la vez — el archivo se lee línea por línea gracias a que los file objects de Python ya son iteradores lazy.</div>
  </div>
  <div id="pgn-2" class="tab-panel">
<div class="concept-intro">Una <strong>generator expression</strong> es la versión lazy de una list comprehension: mismo syntax, pero con paréntesis <code>()</code> en vez de corchetes <code>[]</code>. El módulo <code>itertools</code> de la stdlib provee generadores optimizados en C para las operaciones lazy más comunes (encadenar, agrupar, tomar de a N, combinar).</div>
<div class="code-block"><div class="code-lang">Python — Generator expressions e itertools</div><pre>
<span class="c-cm"># Generator expression vs list comprehension — mismo syntax, distinta memoria</span>
big_list = [process(x) <span class="c-kw">for</span> x <span class="c-kw">in</span> data]   <span class="c-cm"># O(n) RAM — calcula TODO ahora mismo</span>
big_gen  = (process(x) <span class="c-kw">for</span> x <span class="c-kw">in</span> data)   <span class="c-cm"># O(1) RAM — lazy, calcula bajo demanda</span>

<span class="c-cm"># Se pueden pasar directo a funciones que consumen iterables — sin paréntesis extra</span>
<span class="c-bi">sum</span>(x**<span class="c-nb">2</span> <span class="c-kw">for</span> x <span class="c-kw">in</span> readings)        <span class="c-cm"># nunca crea una lista intermedia</span>
<span class="c-bi">any</span>(v &gt; threshold <span class="c-kw">for</span> v <span class="c-kw">in</span> readings)  <span class="c-cm"># corta apenas encuentra True (short-circuit)</span>

<span class="c-kw">import</span> itertools

<span class="c-cm"># itertools.chain — encadena varios iterables sin copiarlos</span>
<span class="c-kw">for</span> line <span class="c-kw">in</span> itertools.chain(log_bench_a, log_bench_b, log_bench_c):
    process(line)

<span class="c-cm"># itertools.islice — "slice" lazy, evita materializar todo para tomar los primeros N</span>
first_1000 = <span class="c-bi">list</span>(itertools.islice(read_log_lines(<span class="c-st">"huge.log"</span>), <span class="c-nb">1000</span>))

<span class="c-cm"># itertools.groupby — agrupa elementos CONSECUTIVOS iguales (requiere datos ordenados)</span>
readings.sort(key=<span class="c-kw">lambda</span> r: r.sensor_id)
<span class="c-kw">for</span> sensor_id, group <span class="c-kw">in</span> itertools.groupby(readings, key=<span class="c-kw">lambda</span> r: r.sensor_id):
    <span class="c-bi">print</span>(sensor_id, <span class="c-bi">list</span>(group))

<span class="c-cm"># itertools.count / cycle / repeat — generadores infinitos listos para usar</span>
counter = itertools.count(start=<span class="c-nb">1</span>, step=<span class="c-nb">1</span>)   <span class="c-cm"># 1, 2, 3, 4, ... infinito</span>
frame_ids = itertools.cycle([<span class="c-st">'A'</span>, <span class="c-st">'B'</span>, <span class="c-st">'C'</span>])  <span class="c-cm"># A,B,C,A,B,C,... infinito</span>

<span class="c-cm"># Generador con estado explícito usando una clase (alternativa a función con yield)</span>
<span class="c-kw">class</span> <span class="c-fn">SlidingWindow</span>:
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self, iterable, size):
        self.it, self.size = <span class="c-bi">iter</span>(iterable), size
    <span class="c-kw">def</span> <span class="c-fn">__iter__</span>(self):
        <span class="c-kw">return</span> self
    <span class="c-kw">def</span> <span class="c-fn">__next__</span>(self):
        window = [<span class="c-bi">next</span>(self.it) <span class="c-kw">for</span> _ <span class="c-kw">in</span> <span class="c-bi">range</span>(self.size)]
        <span class="c-kw">return</span> window   <span class="c-cm"># StopIteration se propaga solo desde next(self.it)</span>

<span class="c-cm"># send() — comunicación bidireccional con el generador (poco común pero preguntado)</span>
<span class="c-kw">def</span> <span class="c-fn">running_average</span>():
    total, count = <span class="c-nb">0</span>, <span class="c-nb">0</span>
    avg = <span class="c-kw">None</span>
    <span class="c-kw">while</span> <span class="c-kw">True</span>:
        value = <span class="c-kw">yield</span> avg          <span class="c-cm"># recibe el valor enviado con send()</span>
        total, count = total + value, count + <span class="c-nb">1</span>
        avg = total / count

gen = running_average()
<span class="c-bi">next</span>(gen)              <span class="c-cm"># "arranca" el generador hasta el primer yield</span>
gen.send(<span class="c-nb">10</span>)          <span class="c-cm"># avg = 10.0</span>
gen.send(<span class="c-nb">20</span>)          <span class="c-cm"># avg = 15.0</span></pre></div>
  </div>
  <div id="pgn-3" class="tab-panel">
<div class="concept-intro">La mayoría de los errores con generadores vienen de olvidar una propiedad central: <strong>un generador se consume una sola vez</strong>. Una vez que se agota (o se recorre parcialmente), no vuelve al principio.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>errors = (line for line in read_log_lines("f.log") if "ERROR" in line)

total = sum(1 for _ in errors)   # consume el generador entero
first_error = next(errors)       # StopIteration! ya no quedan valores</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>errors = list(line for line in read_log_lines("f.log") if "ERROR" in line)

total = len(errors)
first_error = errors[0] if errors else None
# o: recrear el generador si el dataset es demasiado grande para list()</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> un generador no tiene "memoria" de lo ya iterado ni forma de retroceder — es un iterador de un solo uso. Si necesitas recorrer los datos más de una vez, materialízalos en una lista (si caben en RAM) o construye una nueva llamada al generador por cada recorrido.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>def get_readings(sensor_id):
    if sensor_id not in VALID_SENSORS:
        raise ValueError("sensor inválido")   # NUNCA se ejecuta aquí
    for r in fetch_readings(sensor_id):
        yield r

gen = get_readings("bad_id")   # no lanza el ValueError todavía!
next(gen)                       # AHORA sí lanza, en un punto lejano del código</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>def get_readings(sensor_id):
    if sensor_id not in VALID_SENSORS:
        raise ValueError("sensor inválido")  # separar validación de la función generadora
    return _get_readings_gen(sensor_id)

def _get_readings_gen(sensor_id):
    for r in fetch_readings(sensor_id):
        yield r</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> si una función contiene <code>yield</code> en cualquier parte de su cuerpo, TODA la función se convierte en generadora — incluido el código antes del primer <code>yield</code>. Ese código no corre al llamar a la función, sino al primer <code>next()</code>. Esto sorprende cuando se espera validación "inmediata" de argumentos.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>def batches(data, size):
    for i in range(0, len(data), size):
        yield data[i:i+size]

# 'data' debe soportar len() e indexado por slice — no sirve
# para un generador de entrada (ej. otro generador, un socket, un file)
batches(read_log_lines("f.log"), 10)  # TypeError: generator has no len()</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>def batches(iterable, size):
    it = iter(iterable)
    while chunk := list(itertools.islice(it, size)):
        yield chunk

batches(read_log_lines("f.log"), 10)  # funciona con CUALQUIER iterable</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> asumir que la entrada tiene <code>len()</code> o soporta slicing rompe la composición de generadores — uno de los mayores beneficios de yield es poder encadenarlos. Usar <code>iter()</code> + <code>itertools.islice</code> hace que la función funcione con listas, generadores, archivos o cualquier iterable.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>def process_all(paths):
    results = []
    for p in paths:
        results.append(list(read_log_lines(p)))  # list() fuerza carga completa
    return results
# perdiste TODA la ventaja de memoria del generador original</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>def process_all(paths):
    for p in paths:
        yield from read_log_lines(p)  # se mantiene lazy de punta a punta</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> envolver un generador en <code>list()</code> "a mitad de camino" en una cadena de procesamiento anula el beneficio de memoria constante — vuelves a cargar todo en RAM. Para mantener el pipeline lazy de principio a fin, encadena generadores entre sí (con <code>yield from</code> o generator expressions) y materializa solo al final, si realmente hace falta.</div>
</div>
  <div id="pgn-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Usa un generador cuando el dataset es grande, se recorre una sola vez, o es potencialmente infinito</div>
  <p>Streams de sensores, logs de varios GB, resultados de queries paginadas: todos son candidatos naturales. La regla práctica: si el resultado se pasa a <code>sum()</code>, <code>any()</code>, <code>all()</code>, <code>max()</code> o a un solo <code>for</code>, usa generador.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa una lista cuando necesitas indexar, medir longitud, o recorrer varias veces</div>
  <p>Si el código hace <code>datos[i]</code>, <code>len(datos)</code>, o itera la misma colección dos veces, un generador no sirve (se agota) — usa <code>list()</code> o una estructura reutilizable.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Prefiere itertools sobre reimplementar lógica de iteración a mano</div>
  <p><code>itertools.islice</code>, <code>chain</code>, <code>groupby</code>, <code>takewhile</code> están optimizados en C y ya manejan casos límite. Reimplementar "tomar los primeros N de un generador" a mano es más lento y más propenso a bugs.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Separa validación de argumentos en una función wrapper no-generadora</div>
  <p>Si necesitas que los errores de validación salten inmediatamente al llamar (no al primer <code>next()</code>), usa una función normal que valide y luego retorne/delegue a un generador interno con <code>yield from</code>.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Cierra recursos explícitamente o usa "with" dentro del generador</div>
  <p>Un <code>with open(path) as f:</code> dentro de la función generadora se cierra correctamente incluso si el generador se abandona a mitad de camino (garbage collected), gracias a que Python llama a <code>close()</code> en el generador.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Mide la memoria real antes de optimizar prematuramente</div>
  <p>Si el dataset cabe cómodo en RAM (ej. &lt;10k elementos), una list comprehension suele ser más simple y hasta más rápida que un generador equivalente. Usa generadores cuando el tamaño de los datos es el problema real, no por costumbre.</p>
</div>
  </div>
</div>`,

'py-tryexcept': `
<div class="tab-group-pytry">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ptr-1','pytry')">try/except/else/finally</button>
    <button class="tab-btn" onclick="switchTab(this,'ptr-2','pytry')">Excepciones custom &amp; jerarquía</button>
    <button class="tab-btn" onclick="switchTab(this,'ptr-3','pytry')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'ptr-4','pytry')">✅ Mejores Prácticas</button>
  </div>

  <div id="ptr-1" class="tab-panel active">
<div class="concept-intro">El bloque <strong>try/except</strong> permite ejecutar código que puede fallar y decidir qué hacer si falla, en vez de dejar que el programa se caiga. <code>try</code> envuelve el código riesgoso, <code>except</code> captura el/los tipo(s) de excepción que sabes manejar, <code>else</code> corre solo si NO hubo excepción, y <code>finally</code> corre SIEMPRE (haya o no excepción) — típico para liberar recursos como conexiones a un banco de pruebas o cerrar un archivo.</div>
<div class="code-block"><div class="code-lang">Python — estructura completa try/except/else/finally</div><pre>
<span class="c-kw">try</span>:
    result = risky_operation()   <span class="c-cm"># puede lanzar excepción</span>
<span class="c-kw">except</span> FileNotFoundError <span class="c-kw">as</span> e:
    <span class="c-bi">print</span>(<span class="c-st">f"Archivo no encontrado: {e}"</span>)
<span class="c-kw">except</span> (ValueError, TypeError) <span class="c-kw">as</span> e:  <span class="c-cm"># múltiples tipos en una tupla</span>
    <span class="c-bi">print</span>(<span class="c-st">f"Error de tipo: {e}"</span>)
<span class="c-kw">except</span> <span class="c-bi">Exception</span> <span class="c-kw">as</span> e:        <span class="c-cm"># catch-all, siempre AL FINAL</span>
    <span class="c-bi">print</span>(<span class="c-st">f"Error inesperado: {e}"</span>)
    <span class="c-kw">raise</span>                        <span class="c-cm"># re-raise: deja que suba después de loguear</span>
<span class="c-kw">else</span>:
    use(result)   <span class="c-cm"># solo corre si el try NO lanzó excepción</span>
<span class="c-kw">finally</span>:
    cleanup()     <span class="c-cm"># SIEMPRE corre — con, sin, o incluso con return en medio</span>

<span class="c-cm"># El orden de los except IMPORTA: el primero que matchee gana.</span>
<span class="c-cm"># Si pones "except Exception" primero, los siguientes nunca se alcanzan.</span>
<span class="c-kw">try</span>:
    <span class="c-nb">1</span> / <span class="c-nb">0</span>
<span class="c-kw">except</span> <span class="c-bi">Exception</span>:
    <span class="c-bi">print</span>(<span class="c-st">"genérico"</span>)      <span class="c-cm"># esto se ejecuta</span>
<span class="c-kw">except</span> ZeroDivisionError:
    <span class="c-bi">print</span>(<span class="c-st">"específico"</span>)    <span class="c-cm"># ¡nunca se llega aquí! código muerto</span>

<span class="c-cm"># El "with" es la forma correcta de garantizar cleanup — mejor que</span>
<span class="c-cm"># try/finally manual porque usa __enter__/__exit__ del objeto</span>
<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"bench_a3.log"</span>) <span class="c-kw">as</span> f:   <span class="c-cm"># cierra el archivo aunque falle f.read()</span>
    data = f.read()

<span class="c-cm"># Equivalente manual (NO lo hagas así, "with" ya lo resuelve):</span>
f = <span class="c-bi">open</span>(<span class="c-st">"bench_a3.log"</span>)
<span class="c-kw">try</span>:
    data = f.read()
<span class="c-kw">finally</span>:
    f.close()</pre></div>
<table class="kv-table">
<tr><th>Excepción</th><th>¿Cuándo ocurre?</th><th>Ejemplo → Resultado</th><th>Nota</th></tr>
<tr><td>KeyError</td><td>Falta una key en un dict</td><td>config["timeout"] → KeyError</td><td>Usa .get("timeout", 30) para evitarlo</td></tr>
<tr><td>IndexError</td><td>Índice fuera de rango en lista/tupla</td><td>logs[100] → IndexError</td><td>Verifica len() antes o usa slicing</td></tr>
<tr><td>ValueError</td><td>Tipo correcto, valor inválido</td><td>int("abc") → ValueError</td><td>Común al parsear input externo</td></tr>
<tr><td>TypeError</td><td>Operación sobre tipo incompatible</td><td>"3" + 3 → TypeError</td><td>Suele indicar un bug de tipos</td></tr>
<tr><td>AttributeError</td><td>Atributo/método no existe en el objeto</td><td>None.upper() → AttributeError</td><td>Muy común cuando algo devuelve None sin querer</td></tr>
<tr><td>FileNotFoundError</td><td>open() sobre archivo inexistente</td><td>open("x.log") → FileNotFoundError</td><td>Subclase de OSError</td></tr>
<tr><td>ZeroDivisionError</td><td>División o módulo entre cero</td><td>10 / 0 → ZeroDivisionError</td><td>Valida el divisor antes en cálculos de telemetría</td></tr>
</table>
  </div>

  <div id="ptr-2" class="tab-panel">
<div class="concept-intro">Crear tus propias excepciones (heredando de <code>Exception</code> o de una más específica) le da significado a los errores de tu dominio — en vez de propagar un <code>ValueError</code> genérico, defines <code>BenchNotAvailableError</code> y quien lo capture sabe exactamente qué pasó. Entender la <strong>jerarquía de excepciones</strong> de Python te dice qué capturar y en qué orden.</div>
<div class="code-block"><div class="code-lang">Python — raise, raise ... from, y excepciones propias</div><pre>
<span class="c-cm"># ── raise vs raise e (diferencia CRÍTICA en entrevistas) ─────────</span>
<span class="c-kw">try</span>:
    risky()
<span class="c-kw">except</span> <span class="c-bi">ValueError</span> <span class="c-kw">as</span> e:
    <span class="c-kw">raise</span>              <span class="c-cm"># re-lanza la MISMA excepción, preserva traceback completo</span>
    <span class="c-cm"># raise e         ← relanza pero RESETEA el traceback (pierdes dónde ocurrió originalmente)</span>

<span class="c-cm"># ── raise ... from e — exception chaining explícito ───────────────</span>
<span class="c-cm"># Útil cuando conviertes un error de bajo nivel en uno de tu dominio,</span>
<span class="c-cm"># pero quieres conservar la causa original para debug</span>
<span class="c-kw">try</span>:
    connect_to_bench()
<span class="c-kw">except</span> OSError <span class="c-kw">as</span> e:
    <span class="c-kw">raise</span> ConnectionError(<span class="c-st">"Bench A3 offline"</span>) <span class="c-kw">from</span> e
    <span class="c-cm"># El traceback mostrará: "ConnectionError: Bench A3 offline"</span>
    <span class="c-cm"># y debajo: "The above exception was the direct cause of..."</span>

<span class="c-cm"># raise ... from None — oculta la causa (rara vez lo quieres)</span>
<span class="c-kw">try</span>:
    parse(raw)
<span class="c-kw">except</span> ValueError:
    <span class="c-kw">raise</span> ConfigError(<span class="c-st">"config inválida"</span>) <span class="c-kw">from</span> <span class="c-kw">None</span>

<span class="c-cm"># ── Excepciones customizadas — jerarquía propia del proyecto ──────</span>
<span class="c-kw">class</span> <span class="c-fn">BenchError</span>(<span class="c-bi">Exception</span>):
    <span class="c-st">"""Base para todos los errores del framework de HIL."""</span>
    <span class="c-kw">pass</span>

<span class="c-kw">class</span> <span class="c-fn">BenchNotAvailableError</span>(BenchError):
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self, bench_id: str):
        self.bench_id = bench_id
        <span class="c-bi">super</span>().__init__(<span class="c-st">f"Bench {bench_id} not available"</span>)

<span class="c-kw">class</span> <span class="c-fn">BenchTimeoutError</span>(BenchError):
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self, bench_id: str, timeout_s: <span class="c-bi">float</span>):
        self.bench_id, self.timeout_s = bench_id, timeout_s
        <span class="c-bi">super</span>().__init__(<span class="c-st">f"Bench {bench_id} timed out after {timeout_s}s"</span>)

<span class="c-cm"># Al capturar la clase base, capturas TODAS las hijas también</span>
<span class="c-kw">try</span>:
    connect(bench_id=<span class="c-st">"A3"</span>)
<span class="c-kw">except</span> BenchError <span class="c-kw">as</span> e:   <span class="c-cm"># atrapa BenchNotAvailableError y BenchTimeoutError</span>
    log.error(<span class="c-st">f"Fallo de banco: {e}"</span>)

<span class="c-cm"># ── Jerarquía builtin de Python (de arriba hacia abajo) ────────────</span>
<span class="c-cm"># BaseException</span>
<span class="c-cm">#   ├── SystemExit, KeyboardInterrupt, GeneratorExit   ← NO heredes de Exception para capturarlos</span>
<span class="c-cm">#   └── Exception                                       ← captura "casi todo lo normal"</span>
<span class="c-cm">#         ├── ArithmeticError → ZeroDivisionError, OverflowError</span>
<span class="c-cm">#         ├── LookupError    → IndexError, KeyError</span>
<span class="c-cm">#         ├── OSError        → FileNotFoundError, PermissionError, TimeoutError</span>
<span class="c-cm">#         ├── TypeError, ValueError, AttributeError, RuntimeError, ...</span>
<span class="c-cm"># "except:" (sin tipo) captura hasta BaseException — incluye Ctrl+C. Evítalo.</span></pre></div>
  </div>

  <div id="ptr-3" class="tab-panel">
<div class="concept-intro">Estos son los errores de manejo de excepciones que más se ven en code review y en entrevistas técnicas — desde silenciar errores hasta capturar el tipo equivocado.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>try:
    read_sensor()
<span class="c-kw">except</span>:                <span class="c-cm"># bare except</span>
    pass                 <span class="c-cm"># silencia TODO, incluso Ctrl+C</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>try:
    read_sensor()
<span class="c-kw">except</span> SensorTimeoutError <span class="c-kw">as</span> e:
    log.warning(<span class="c-st">f"sensor timeout: {e}"</span>)</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> un <code>except:</code> sin tipo captura desde <code>BaseException</code>, incluyendo <code>KeyboardInterrupt</code> y <code>SystemExit</code> — tu script deja de poder cancelarse con Ctrl+C. Además <code>pass</code> esconde bugs reales: el test "pasa" aunque el sensor nunca respondió. Detéctalo buscando <code>except:</code> y <code>except Exception: pass</code> en linters (pylint E722, bare-except).</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">try</span>: connect()
<span class="c-kw">except</span> OSError <span class="c-kw">as</span> e:
    <span class="c-kw">raise</span> ConnectionError(<span class="c-st">"offline"</span>)
    <span class="c-cm"># se pierde la causa original (e)</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">try</span>: connect()
<span class="c-kw">except</span> OSError <span class="c-kw">as</span> e:
    <span class="c-kw">raise</span> ConnectionError(<span class="c-st">"offline"</span>) <span class="c-kw">from</span> e</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> al lanzar una excepción nueva dentro de un except sin <code>from e</code>, Python igual muestra "During handling... another exception occurred" pero no deja explícito que una causó la otra, y algunas herramientas de logging/Sentry agrupan peor los errores. <code>raise NuevaExcepcion(...) from e</code> deja la cadena de causalidad clara en el traceback.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">try</span>:
    v = <span class="c-bi">int</span>(config[<span class="c-st">"count"</span>])
    process(v)
<span class="c-kw">except</span> <span class="c-bi">Exception</span>:
    <span class="c-bi">print</span>(<span class="c-st">"algo falló"</span>)  <span class="c-cm"># ¿KeyError? ¿ValueError? ¿bug en process()?</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">try</span>:
    v = <span class="c-bi">int</span>(config[<span class="c-st">"count"</span>])
<span class="c-kw">except</span> KeyError:
    v = <span class="c-nb">0</span>
<span class="c-kw">except</span> ValueError:
    <span class="c-kw">raise</span> ConfigError(<span class="c-st">"count debe ser numérico"</span>)
process(v)  <span class="c-cm"># fuera del try: si falla aquí, el traceback es claro</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> meter demasiado código dentro de un solo try con un except genérico mezcla errores de distinto origen y oculta cuál línea falló realmente. Regla práctica: el try debe cubrir solo la(s) línea(s) que puede fallar, y cada except debe ser lo más específico posible.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">try</span>:
    result = compute()
<span class="c-kw">except</span> <span class="c-bi">Exception</span> <span class="c-kw">as</span> e:
    <span class="c-bi">print</span>(<span class="c-st">"error"</span>)
use(result)  <span class="c-cm"># NameError si compute() falló: result nunca se creó</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">try</span>:
    result = compute()
<span class="c-kw">except</span> <span class="c-bi">Exception</span> <span class="c-kw">as</span> e:
    log.error(e)
<span class="c-kw">else</span>:
    use(result)  <span class="c-cm"># solo corre si compute() tuvo éxito</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> usar una variable definida dentro del try fuera de él (sin else) asume que siempre se llegó a esa línea. Si hubo excepción, la variable no existe y obtienes un <code>NameError</code> encima del error original, confundiendo el debug. El bloque <code>else</code> existe exactamente para este caso.</div>
  </div>

  <div id="ptr-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Captura excepciones específicas, nunca un except desnudo</div>
  <p>Usa <code>except ValueError:</code> en vez de <code>except:</code> o <code>except Exception:</code> cuando sabes qué puede fallar. Reserva <code>except Exception</code> solo en el borde de la aplicación (por ejemplo el loop principal de un runner de tests) para loguear y continuar sin tumbar el proceso.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa "with" para cualquier recurso que deba liberarse</div>
  <p>Archivos, conexiones de red, locks, sesiones de base de datos: si el objeto soporta context manager (<code>__enter__</code>/<code>__exit__</code>), usa <code>with</code> en vez de try/finally manual — es más corto y más difícil de olvidar.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Preserva la causa original con "raise" o "raise ... from e"</div>
  <p>Nunca hagas <code>raise e</code> dentro de un except si tu intención es re-lanzar tal cual — usa <code>raise</code> solo. Si envuelves el error en uno nuevo, siempre agrega <code>from e</code> para no perder el traceback original en producción.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Define una jerarquía de excepciones propia por módulo/proyecto</div>
  <p>Una excepción base (<code>BenchError</code>) y subclases específicas permiten capturar a distintos niveles de granularidad: todo el módulo con la base, o un caso puntual con la subclase, sin duplicar lógica de manejo.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Loguea con contexto, no solo el mensaje de la excepción</div>
  <p>Usa <code>log.exception(...)</code> dentro de un except (incluye el traceback automáticamente) en vez de <code>print(e)</code>, y agrega datos relevantes como el <code>bench_id</code> o el request que estabas procesando cuando ocurrió el fallo.</p>
</div>
  </div>
</div>`,

'py-archivos': `
<div class="tab-group-pyarc">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pac-1','pyarc')">open() y context manager</button>
    <button class="tab-btn" onclick="switchTab(this,'pac-2','pyarc')">JSON, CSV y pathlib</button>
    <button class="tab-btn" onclick="switchTab(this,'pac-3','pyarc')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'pac-4','pyarc')">✅ Mejores Prácticas</button>
  </div>

  <div id="pac-1" class="tab-panel active">
<div class="concept-intro"><code>open()</code> abre un archivo y devuelve un objeto file-like sobre el que puedes leer o escribir. El modo (segundo argumento) define si es lectura, escritura, append, texto o binario. Usar <code>open()</code> dentro de un <strong>context manager</strong> (<code>with</code>) garantiza que el archivo se cierre automáticamente aunque ocurra una excepción — evita fugas de file descriptors, algo crítico en procesos de larga duración como un runner de tests HIL que abre miles de logs.</div>
<div class="code-block"><div class="code-lang">Python — open() modos y patrones de lectura/escritura</div><pre>
<span class="c-cm"># ── Modos de open() ───────────────────────────────────────────────</span>
<span class="c-cm"># 'r'  = leer texto (default)     'rb' = leer binario</span>
<span class="c-cm"># 'w'  = escribir (SOBREESCRIBE)  'wb' = escribir binario</span>
<span class="c-cm"># 'a'  = append (agrega al final) 'ab' = append binario</span>
<span class="c-cm"># 'x'  = crear exclusivo (FileExistsError si ya existe)</span>
<span class="c-cm"># 'r+' = leer y escribir, sin truncar</span>

<span class="c-cm"># Leer todo el archivo de una vez</span>
<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"log.txt"</span>, encoding=<span class="c-st">"utf-8"</span>) <span class="c-kw">as</span> f:
    content = f.read()          <span class="c-cm"># todo como un solo string</span>
    <span class="c-cm"># líneas = f.readlines()    # lista de strings, cada uno con \n</span>

<span class="c-cm"># Leer línea por línea — eficiente en memoria (O(1), no carga todo)</span>
<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"big.log"</span>) <span class="c-kw">as</span> f:
    <span class="c-kw">for</span> line <span class="c-kw">in</span> f:              <span class="c-cm"># f es un iterador línea por línea</span>
        process(line.rstrip(<span class="c-st">"\n"</span>))  <span class="c-cm"># rstrip quita el salto de línea final</span>

<span class="c-cm"># Escribir (w SOBREESCRIBE todo el contenido previo)</span>
<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"output.txt"</span>, <span class="c-st">"w"</span>) <span class="c-kw">as</span> f:
    f.write(<span class="c-st">"línea 1\n"</span>)
    f.writelines([<span class="c-st">"a\n"</span>, <span class="c-st">"b\n"</span>])  <span class="c-cm"># NO agrega \n automáticamente entre elementos</span>

<span class="c-cm"># Append — agrega al final sin borrar lo existente</span>
<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"telemetry.log"</span>, <span class="c-st">"a"</span>) <span class="c-kw">as</span> f:
    f.write(<span class="c-st">f"{timestamp} speed={speed_kmh}\n"</span>)

<span class="c-cm"># ── Cómo funciona el context manager por dentro ────────────────────</span>
<span class="c-cm"># with EXPR as VAR:            equivale aproximadamente a:</span>
<span class="c-cm">#     VAR = EXPR.__enter__()</span>
<span class="c-cm">#     try:</span>
<span class="c-cm">#         BLOQUE</span>
<span class="c-cm">#     finally:</span>
<span class="c-cm">#         EXPR.__exit__(...)     # cierra el archivo SIEMPRE, incluso si el bloque lanza</span>

<span class="c-cm"># Múltiples archivos en un mismo with (Python 3.10+ con paréntesis)</span>
<span class="c-kw">with</span> (
    <span class="c-bi">open</span>(<span class="c-st">"input.csv"</span>) <span class="c-kw">as</span> src,
    <span class="c-bi">open</span>(<span class="c-st">"output.csv"</span>, <span class="c-st">"w"</span>) <span class="c-kw">as</span> dst,
):
    dst.write(src.read().upper())</pre></div>
  </div>

  <div id="pac-2" class="tab-panel">
<div class="concept-intro">Para datos estructurados usa el módulo estándar correspondiente en vez de parsear texto a mano: <code>json</code> para configuración/telemetría en formato JSON, <code>csv</code> para tablas de resultados de test, y <code>pathlib.Path</code> (moderno, orientado a objetos) en vez de <code>os.path</code> para manipular rutas de forma legible y portable entre sistemas operativos.</div>
<div class="code-block"><div class="code-lang">Python — JSON, CSV y pathlib.Path</div><pre>
<span class="c-kw">import</span> json, csv
<span class="c-kw">from</span> pathlib <span class="c-kw">import</span> Path

<span class="c-cm"># ── JSON ─────────────────────────────────────────────────────────</span>
config = {<span class="c-st">"bench"</span>: <span class="c-st">"A3"</span>, <span class="c-st">"timeout"</span>: <span class="c-nb">30</span>, <span class="c-st">"retries"</span>: <span class="c-nb">3</span>}
<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"config.json"</span>, <span class="c-st">"w"</span>) <span class="c-kw">as</span> f:
    json.dump(config, f, indent=<span class="c-nb">2</span>)     <span class="c-cm"># escribe a archivo</span>

<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"config.json"</span>) <span class="c-kw">as</span> f:
    loaded = json.load(f)                <span class="c-cm"># lee de archivo → dict</span>

<span class="c-cm"># json.dumps/loads (con "s") trabajan sobre strings, no archivos</span>
texto = json.dumps(config)               <span class="c-cm"># dict → str</span>
de_vuelta = json.loads(texto)            <span class="c-cm"># str → dict</span>

<span class="c-cm"># ── CSV ──────────────────────────────────────────────────────────</span>
<span class="c-cm"># newline="" es OBLIGATORIO en Windows para evitar líneas en blanco extra</span>
<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"results.csv"</span>, <span class="c-st">"w"</span>, newline=<span class="c-st">""</span>) <span class="c-kw">as</span> f:
    writer = csv.DictWriter(f, fieldnames=[<span class="c-st">"test"</span>, <span class="c-st">"status"</span>, <span class="c-st">"duration"</span>])
    writer.writeheader()
    writer.writerow({<span class="c-st">"test"</span>: <span class="c-st">"lidar"</span>, <span class="c-st">"status"</span>: <span class="c-st">"PASS"</span>, <span class="c-st">"duration"</span>: <span class="c-nb">1.23</span>})

<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"results.csv"</span>) <span class="c-kw">as</span> f:
    reader = csv.DictReader(f)
    <span class="c-kw">for</span> row <span class="c-kw">in</span> reader:               <span class="c-cm"># cada row es un dict</span>
        <span class="c-kw">if</span> row[<span class="c-st">"status"</span>] == <span class="c-st">"FAIL"</span>:
            <span class="c-bi">print</span>(row[<span class="c-st">"test"</span>])

<span class="c-cm"># ── pathlib.Path — moderno, recomendado sobre os.path ─────────────</span>
p = Path(<span class="c-st">"data/logs"</span>)
p.mkdir(parents=<span class="c-kw">True</span>, exist_ok=<span class="c-kw">True</span>)     <span class="c-cm"># equivalente a mkdir -p</span>
p.exists()                                  <span class="c-cm"># True/False</span>
p.is_file() / p.is_dir()                    <span class="c-cm"># comprobar tipo</span>
<span class="c-bi">list</span>(p.glob(<span class="c-st">"*.mcap"</span>))                     <span class="c-cm"># archivos .mcap en ese directorio</span>
<span class="c-bi">list</span>(p.rglob(<span class="c-st">"*.log"</span>))                     <span class="c-cm"># glob recursivo (subdirectorios también)</span>

<span class="c-cm"># El operador / concatena rutas — funciona en Windows y Linux/Mac</span>
log_file = p / <span class="c-st">"bench_a3.log"</span>
log_file.read_text()                        <span class="c-cm"># leer directo, sin with (Path lo maneja)</span>
(p / <span class="c-st">"out.txt"</span>).write_text(<span class="c-st">"content"</span>)     <span class="c-cm"># escribir directo</span>

log_file.stat().st_size                     <span class="c-cm"># tamaño en bytes</span>
log_file.suffix                             <span class="c-cm"># '.log'</span>
log_file.stem                               <span class="c-cm"># 'bench_a3' (sin extensión)</span>
log_file.parent                             <span class="c-cm"># Path('data/logs')</span>
Path.cwd()                                  <span class="c-cm"># directorio de trabajo actual</span></pre></div>
<table class="kv-table">
<tr><th>Tarea</th><th>os.path (clásico)</th><th>pathlib (recomendado)</th><th>Nota</th></tr>
<tr><td>Unir rutas</td><td>os.path.join(a, b)</td><td>Path(a) / b</td><td>pathlib es legible y encadenable</td></tr>
<tr><td>Existe archivo</td><td>os.path.exists(p)</td><td>Path(p).exists()</td><td>Igual de rápido</td></tr>
<tr><td>Listar por patrón</td><td>glob.glob("*.log")</td><td>Path(".").glob("*.log")</td><td>pathlib devuelve objetos Path, no strings</td></tr>
<tr><td>Crear directorios</td><td>os.makedirs(p, exist_ok=True)</td><td>Path(p).mkdir(parents=True, exist_ok=True)</td><td>Mismo comportamiento</td></tr>
</table>
  </div>

  <div id="pac-3" class="tab-panel">
<div class="concept-intro">Errores típicos al trabajar con archivos: recursos no cerrados, encoding mal manejado, sobrescritura accidental y suposiciones incorrectas sobre si un archivo existe.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>f = <span class="c-bi">open</span>(<span class="c-st">"log.txt"</span>)
data = f.read()
process(data)   <span class="c-cm"># si process() lanza, f nunca se cierra</span>
f.close()</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"log.txt"</span>) <span class="c-kw">as</span> f:
    data = f.read()
process(data)   <span class="c-cm"># f ya se cerró aquí, pase lo que pase arriba</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> si una excepción ocurre entre <code>open()</code> y <code>close()</code>, la línea <code>f.close()</code> nunca se ejecuta y el file descriptor queda abierto. En procesos de larga duración (un runner que procesa miles de logs) esto agota los descriptores disponibles del sistema operativo y falla con "Too many open files". <code>with</code> resuelve esto usando try/finally internamente.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"resultados.csv"</span>, <span class="c-st">"w"</span>) <span class="c-kw">as</span> f:
    f.write(nueva_fila)
    <span class="c-cm"># "w" trunca el archivo: se perdió todo lo anterior</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"resultados.csv"</span>, <span class="c-st">"a"</span>) <span class="c-kw">as</span> f:
    f.write(nueva_fila)   <span class="c-cm"># "a" agrega al final, no borra</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> confundir "w" con "a" es uno de los bugs más comunes y más costosos: "w" trunca el archivo apenas se abre, incluso si nunca llamas a write(). Si el objetivo es acumular resultados de test a lo largo de varias corridas, "a" es el modo correcto. Verifica siempre el modo antes de escribir a un archivo que ya tiene datos importantes.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"reporte.txt"</span>) <span class="c-kw">as</span> f:
    texto = f.read()   <span class="c-cm"># asume que existe encoding='utf-8'</span>
    <span class="c-cm"># en Windows el default puede ser cp1252 → UnicodeDecodeError con acentos</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"reporte.txt"</span>, encoding=<span class="c-st">"utf-8"</span>) <span class="c-kw">as</span> f:
    texto = f.read()   <span class="c-cm"># explícito, portable entre SO</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>open()</code> sin <code>encoding</code> usa la codificación por defecto del sistema operativo (locale.getpreferredencoding()), que en Windows suele ser cp1252 y en Linux utf-8. Un log generado en Linux con acentos o símbolos especiales puede fallar al leerse en Windows sin encoding explícito. Regla: siempre pasa <code>encoding="utf-8"</code> quando trabajas con texto.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>data = <span class="c-bi">open</span>(<span class="c-st">"config.json"</span>).read()
config = json.loads(data)   <span class="c-cm"># si el archivo no existe: crashea sin contexto claro</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>path = Path(<span class="c-st">"config.json"</span>)
<span class="c-kw">if</span> <span class="c-kw">not</span> path.exists():
    <span class="c-kw">raise</span> ConfigError(<span class="c-st">f"No existe {path}"</span>)
config = json.loads(path.read_text(encoding=<span class="c-st">"utf-8"</span>))</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> asumir que un archivo de configuración siempre existe lleva a un <code>FileNotFoundError</code> genérico y confuso en producción. Validar explícitamente (o capturar la excepción con un mensaje claro) ayuda a diagnosticar rápido, especialmente en pipelines de CI donde el working directory puede no ser el esperado.</div>
  </div>

  <div id="pac-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Usa siempre "with" para abrir archivos</div>
  <p>Nunca llames <code>open()</code> sin un context manager salvo casos muy puntuales (y aun así, envuelto en try/finally). Esto garantiza el cierre del recurso incluso ante excepciones.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Sé explícito con encoding="utf-8"</div>
  <p>No confíes en el encoding por defecto del sistema operativo. Pasa <code>encoding="utf-8"</code> en cada <code>open()</code> de texto para que el comportamiento sea idéntico en Windows, Linux y macOS.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Prefiere pathlib.Path sobre os.path para código nuevo</div>
  <p><code>Path</code> es orientado a objetos, encadenable con <code>/</code>, y expone métodos como <code>.read_text()</code>, <code>.glob()</code>, <code>.stat()</code> que reemplazan varias llamadas de <code>os</code>/<code>os.path</code> con una API más legible.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Para archivos grandes, itera línea a línea en vez de .read()</div>
  <p><code>for line in f:</code> procesa el archivo con memoria constante O(1). Cargar un log de varios GB completo con <code>f.read()</code> puede agotar la memoria del proceso de CI.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa csv.DictReader/DictWriter en vez de índices numéricos</div>
  <p>Acceder a columnas por nombre (<code>row["status"]</code>) en vez de por posición (<code>row[1]</code>) hace el código robusto ante cambios en el orden de columnas del CSV.</p>
</div>
  </div>
</div>`,

'py-copy': `
<div class="tab-group-pycpy">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pcp-1','pycpy')">Referencias vs copias</button>
    <button class="tab-btn" onclick="switchTab(this,'pcp-2','pycpy')">Shallow vs Deep copy</button>
    <button class="tab-btn" onclick="switchTab(this,'pcp-3','pycpy')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'pcp-4','pycpy')">✅ Mejores Prácticas</button>
  </div>

  <div id="pcp-1" class="tab-panel active">
<div class="concept-intro">En Python, una variable no "contiene" un objeto — es una <strong>etiqueta que apunta</strong> a un objeto en memoria. Cuando haces <code>b = a</code>, no copias el objeto: haces que <code>b</code> apunte al MISMO objeto que <code>a</code>. Si ese objeto es mutable (lista, dict, set, instancia de clase), modificarlo a través de <code>b</code> también "modifica" lo que ves a través de <code>a</code> — porque es literalmente el mismo objeto. Esto se llama <strong>aliasing</strong> y es una de las causas de bugs más comunes en Python.</div>
<div class="code-block"><div class="code-lang">Python — asignación es aliasing, no copia</div><pre>
original = [[<span class="c-nb">1</span>, <span class="c-nb">2</span>], [<span class="c-nb">3</span>, <span class="c-nb">4</span>]]

<span class="c-cm"># ── ASIGNACIÓN — misma referencia, dos nombres, un objeto ─────────</span>
<span class="c-cm">#   original ──┐</span>
<span class="c-cm">#              ├──▶ [[1,2],[3,4]]   (un único objeto en memoria)</span>
<span class="c-cm">#   referencia ┘</span>
referencia = original
referencia[<span class="c-nb">0</span>].append(<span class="c-nb">99</span>)
<span class="c-bi">print</span>(original)     <span class="c-cm"># [[1, 2, 99], [3, 4]]  ← "original" también cambió</span>
<span class="c-bi">print</span>(referencia <span class="c-kw">is</span> original)   <span class="c-cm"># True: literalmente el mismo objeto (misma id())</span>
<span class="c-bi">print</span>(<span class="c-bi">id</span>(referencia) == <span class="c-bi">id</span>(original))  <span class="c-cm"># True</span>

<span class="c-cm"># ── Lo mismo pasa al pasar objetos mutables a funciones ────────────</span>
<span class="c-kw">def</span> <span class="c-fn">agregar_tag</span>(lista: <span class="c-bi">list</span>, tag: str) -&gt; <span class="c-kw">None</span>:
    lista.append(tag)     <span class="c-cm"># modifica el objeto original, no una copia</span>

tags = [<span class="c-st">"lidar"</span>, <span class="c-st">"radar"</span>]
agregar_tag(tags, <span class="c-st">"camera"</span>)
<span class="c-bi">print</span>(tags)          <span class="c-cm"># ['lidar', 'radar', 'camera']  ← la función SÍ mutó el original</span>

<span class="c-cm"># ── Tipos INMUTABLES: no hay riesgo de aliasing mutante ────────────</span>
<span class="c-cm"># int, float, str, tuple (si su contenido también es inmutable),</span>
<span class="c-cm"># frozenset, bool son inmutables: no se pueden modificar "in place"</span>
a = <span class="c-st">"hello"</span>
b = a               <span class="c-cm"># b y a apuntan al mismo string, pero no importa: es inmutable</span>
b = b.upper()        <span class="c-cm"># .upper() crea un string NUEVO, no modifica "hello"</span>
<span class="c-bi">print</span>(a, b)        <span class="c-cm"># hello HELLO  ← a no cambió, b apunta a un objeto distinto ahora</span>

<span class="c-cm"># ── Comparar "==" (igual valor) vs "is" (misma identidad/objeto) ──</span>
x = [<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>]
y = [<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>]
<span class="c-bi">print</span>(x == y)      <span class="c-cm"># True  — mismo contenido</span>
<span class="c-bi">print</span>(x <span class="c-kw">is</span> y)      <span class="c-cm"># False — son dos objetos distintos en memoria</span></pre></div>
<table class="kv-table">
<tr><th>Operación</th><th>¿Copia el objeto?</th><th>¿Comparten sub-objetos internos?</th><th>Nota</th></tr>
<tr><td>b = a</td><td>No — mismo objeto</td><td>Sí, son el mismo</td><td>Aliasing puro, ambos nombres ven los mismos cambios</td></tr>
<tr><td>b = a.copy() / a[:]</td><td>Sí — nuevo objeto contenedor</td><td>Sí — los elementos internos siguen siendo compartidos</td><td>Shallow copy</td></tr>
<tr><td>b = copy.deepcopy(a)</td><td>Sí — nuevo objeto contenedor</td><td>No — copia también los elementos internos recursivamente</td><td>Deep copy, independencia total</td></tr>
</table>
  </div>

  <div id="pcp-2" class="tab-panel">
<div class="concept-intro">Cuando necesitas una copia real (no un alias), Python ofrece dos niveles: <strong>shallow copy</strong> (copia superficial: crea un contenedor nuevo pero los elementos DENTRO siguen siendo los mismos objetos compartidos) y <strong>deep copy</strong> (copia profunda: copia recursivamente TODO, incluyendo los objetos anidados, logrando independencia total). Cuál necesitas depende de si tu estructura tiene objetos mutables anidados (listas dentro de listas, dicts dentro de dicts, etc.).</div>
<div class="code-block"><div class="code-lang">Python — copy.copy() vs copy.deepcopy()</div><pre>
<span class="c-kw">import</span> copy

<span class="c-cm"># ── SHALLOW COPY — nuevo contenedor, mismos objetos internos ──────</span>
<span class="c-cm">#   original ──▶ [ref_A, ref_B]        shallow ──▶ [ref_A, ref_B]</span>
<span class="c-cm">#                  │      │                          │      │</span>
<span class="c-cm">#                  ▼      ▼                          ▼      ▼</span>
<span class="c-cm">#               [1,2]   [3,4]   ← MISMAS sublistas compartidas por ambos</span>
original = [[<span class="c-nb">1</span>, <span class="c-nb">2</span>], [<span class="c-nb">3</span>, <span class="c-nb">4</span>]]
shallow = copy.copy(original)      <span class="c-cm"># o: original[:]  o: original.copy()  o: list(original)</span>

shallow.append([<span class="c-nb">5</span>, <span class="c-nb">6</span>])
<span class="c-bi">print</span>(original)   <span class="c-cm"># [[1,2],[3,4]]        ← NO cambió: el contenedor exterior es independiente</span>

shallow[<span class="c-nb">0</span>].append(<span class="c-nb">99</span>)
<span class="c-bi">print</span>(original)   <span class="c-cm"># [[1,2,99],[3,4]]     ← SÍ cambió: la sublista interna es la MISMA</span>
<span class="c-bi">print</span>(shallow[<span class="c-nb">0</span>] <span class="c-kw">is</span> original[<span class="c-nb">0</span>])   <span class="c-cm"># True — mismo objeto interno</span>
<span class="c-bi">print</span>(shallow <span class="c-kw">is</span> original)          <span class="c-cm"># False — contenedores distintos</span>

<span class="c-cm"># dict.copy() y set.copy() también son shallow</span>
config = {<span class="c-st">"limits"</span>: [<span class="c-nb">10</span>, <span class="c-nb">20</span>]}
config_copy = config.copy()
config_copy[<span class="c-st">"limits"</span>].append(<span class="c-nb">30</span>)
<span class="c-bi">print</span>(config[<span class="c-st">"limits"</span>])   <span class="c-cm"># [10, 20, 30]  ← también cambió: la lista interna se comparte</span>

<span class="c-cm"># ── DEEP COPY — copia recursiva, independencia total ───────────────</span>
original = [[<span class="c-nb">1</span>, <span class="c-nb">2</span>], [<span class="c-nb">3</span>, <span class="c-nb">4</span>]]
deep = copy.deepcopy(original)

deep[<span class="c-nb">0</span>].append(<span class="c-nb">99</span>)
<span class="c-bi">print</span>(original)   <span class="c-cm"># [[1,2],[3,4]]   ← NO cambió, deep copió también las sublistas</span>
<span class="c-bi">print</span>(deep[<span class="c-nb">0</span>] <span class="c-kw">is</span> original[<span class="c-nb">0</span>])   <span class="c-cm"># False — objetos completamente distintos</span>

<span class="c-cm"># deepcopy también funciona con objetos custom (instancias de clase)</span>
<span class="c-kw">class</span> <span class="c-fn">BenchConfig</span>:
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self, sensors: <span class="c-bi">list</span>):
        self.sensors = sensors

cfg1 = BenchConfig([<span class="c-st">"lidar"</span>, <span class="c-st">"radar"</span>])
cfg2 = copy.deepcopy(cfg1)
cfg2.sensors.append(<span class="c-st">"camera"</span>)
<span class="c-bi">print</span>(cfg1.sensors)   <span class="c-cm"># ['lidar', 'radar']  ← independiente de cfg2</span>

<span class="c-cm"># ── Cuándo usar cuál ────────────────────────────────────────────────</span>
<span class="c-cm"># = (asignación):  cuando SÍ quieres que ambos nombres compartan el objeto</span>
<span class="c-cm"># Shallow copy:     estructura plana, o solo el nivel exterior cambia</span>
<span class="c-cm"># Deep copy:        estructuras anidadas donde necesitas independencia total</span>
<span class="c-cm"># Tipos inmutables: nunca necesitan copy — int, float, str, tuple, frozenset</span></pre></div>
  </div>

  <div id="pcp-3" class="tab-panel">
<div class="concept-intro">Aliasing accidental es una de las fuentes de bugs más silenciosas en Python: el código "funciona" en pruebas simples pero corrompe datos compartidos en producción, sobre todo con valores por defecto mutables y estructuras anidadas.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">agregar_lectura</span>(valor, buffer=[]):  <span class="c-cm"># default mutable</span>
    buffer.append(valor)
    <span class="c-kw">return</span> buffer

agregar_lectura(<span class="c-nb">1</span>)   <span class="c-cm"># [1]</span>
agregar_lectura(<span class="c-nb">2</span>)   <span class="c-cm"># [1, 2]  ← ¡el buffer persiste entre llamadas!</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">agregar_lectura</span>(valor, buffer=<span class="c-kw">None</span>):
    <span class="c-kw">if</span> buffer <span class="c-kw">is</span> <span class="c-kw">None</span>:
        buffer = []           <span class="c-cm"># lista NUEVA cada llamada</span>
    buffer.append(valor)
    <span class="c-kw">return</span> buffer</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> los valores por defecto de una función se evalúan UNA sola vez, cuando se define la función — no en cada llamada. Si el default es una lista/dict mutable, todas las llamadas que no pasan ese argumento comparten el mismo objeto, y las mutaciones se acumulan entre llamadas. Regla: nunca uses <code>[]</code>, <code>{}</code> o instancias mutables como default; usa <code>None</code> y créalo dentro de la función.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>config_base = {<span class="c-st">"timeout"</span>: <span class="c-nb">30</span>, <span class="c-st">"sensors"</span>: [<span class="c-st">"lidar"</span>]}
config_bench_a = config_base.copy()      <span class="c-cm"># shallow copy</span>
config_bench_a[<span class="c-st">"sensors"</span>].append(<span class="c-st">"radar"</span>)
<span class="c-bi">print</span>(config_base[<span class="c-st">"sensors"</span>])  <span class="c-cm"># ['lidar', 'radar']  ← ¡se filtró al base!</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">import</span> copy
config_base = {<span class="c-st">"timeout"</span>: <span class="c-nb">30</span>, <span class="c-st">"sensors"</span>: [<span class="c-st">"lidar"</span>]}
config_bench_a = copy.deepcopy(config_base)
config_bench_a[<span class="c-st">"sensors"</span>].append(<span class="c-st">"radar"</span>)
<span class="c-bi">print</span>(config_base[<span class="c-st">"sensors"</span>])  <span class="c-cm"># ['lidar']  ← independiente</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>dict.copy()</code>/<code>list.copy()</code>/<code>[:]</code> son shallow: copian solo el nivel exterior. Cuando el diccionario/lista tiene valores mutables anidados (otra lista, otro dict), esos anidados siguen siendo el MISMO objeto en la copia. Para independencia total con estructuras anidadas, usa <code>copy.deepcopy()</code>.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>matrix = [[<span class="c-nb">0</span>] * <span class="c-nb">3</span>] * <span class="c-nb">3</span>    <span class="c-cm"># ¡las 3 filas son la MISMA lista!</span>
matrix[<span class="c-nb">0</span>][<span class="c-nb">0</span>] = <span class="c-nb">1</span>
<span class="c-bi">print</span>(matrix)   <span class="c-cm"># [[1,0,0],[1,0,0],[1,0,0]]  ← cambió en las 3 filas</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>matrix = [[<span class="c-nb">0</span>] * <span class="c-nb">3</span> <span class="c-kw">for</span> _ <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">3</span>)]   <span class="c-cm"># 3 listas independientes</span>
matrix[<span class="c-nb">0</span>][<span class="c-nb">0</span>] = <span class="c-nb">1</span>
<span class="c-bi">print</span>(matrix)   <span class="c-cm"># [[1,0,0],[0,0,0],[0,0,0]]  ← solo cambió la fila 0</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> <code>[[0]*3] * 3</code> multiplica una REFERENCIA a la misma sublista tres veces, no crea tres sublistas distintas. Es el mismo problema de aliasing que <code>b = a</code>, camuflado dentro de una expresión que parece inocente. Este bug clásico aparece al inicializar matrices o grids (por ejemplo un mapa de ocupación en un stack de percepción).</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">normalizar</span>(lecturas: <span class="c-bi">list</span>) -&gt; <span class="c-bi">list</span>:
    lecturas.sort()          <span class="c-cm"># muta la lista original del caller</span>
    <span class="c-kw">return</span> lecturas

datos_originales = [<span class="c-nb">3</span>, <span class="c-nb">1</span>, <span class="c-nb">2</span>]
ordenados = normalizar(datos_originales)
<span class="c-bi">print</span>(datos_originales)  <span class="c-cm"># [1, 2, 3]  ← se mutó sin que el caller lo esperara</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">normalizar</span>(lecturas: <span class="c-bi">list</span>) -&gt; <span class="c-bi">list</span>:
    <span class="c-kw">return</span> <span class="c-bi">sorted</span>(lecturas)   <span class="c-cm"># crea una lista nueva, no muta</span>

datos_originales = [<span class="c-nb">3</span>, <span class="c-nb">1</span>, <span class="c-nb">2</span>]
ordenados = normalizar(datos_originales)
<span class="c-bi">print</span>(datos_originales)  <span class="c-cm"># [3, 1, 2]  ← intacto</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> como las listas se pasan por referencia (aliasing), una función que recibe una lista y la muta "in place" (<code>.sort()</code>, <code>.append()</code>, <code>.pop()</code>) afecta al objeto original del llamador, aunque la función tenga un <code>return</code>. Si la función no debe tener efectos secundarios, usa versiones que devuelven copias nuevas (<code>sorted()</code> en vez de <code>.sort()</code>) o copia explícitamente al inicio.</div>
  </div>

  <div id="pcp-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Nunca uses listas/dicts mutables como valor por defecto de un parámetro</div>
  <p>Usa <code>def f(x=None):</code> y crea el objeto dentro de la función si <code>x is None</code>. Este es uno de los "gotchas" más preguntados en entrevistas de Python.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa deepcopy solo cuando realmente hay anidamiento mutable</div>
  <p><code>copy.deepcopy()</code> es más lento que shallow copy porque recorre recursivamente toda la estructura. Si tu estructura es plana (lista de números, por ejemplo), una shallow copy (<code>list(x)</code> o <code>x[:]</code>) es suficiente y más rápida.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Prefiere funciones que devuelven copias en vez de mutar in-place</div>
  <p>Cuando el efecto secundario no es explícitamente deseado, usa <code>sorted(x)</code> en vez de <code>x.sort()</code>, o construye una lista/dict nueva en vez de modificar el parámetro recibido. Hace el código más predecible y fácil de testear.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa "is" para verificar identidad, "==" para verificar igualdad de valor</div>
  <p><code>a is b</code> pregunta "¿son el mismo objeto en memoria?" mientras <code>a == b</code> pregunta "¿tienen el mismo contenido?". Usa <code>is</code> principalmente para comparar contra <code>None</code>, <code>True</code>/<code>False</code> o singletons — no para comparar valores de datos.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Documenta si una función muta sus argumentos o no</div>
  <p>Si una función recibe una lista/dict y la modifica in-place, deja constancia en el docstring o el nombre (por ejemplo <code>sort_in_place()</code> vs <code>sorted_copy()</code>) para que quien la use no se sorprenda con efectos secundarios.</p>
</div>
  </div>
</div>`,

'py-tipado': `
<div class="tab-group-ptyp">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ptd-1','ptyp')">Tipos básicos y Optional/Union</button>
    <button class="tab-btn" onclick="switchTab(this,'ptd-2','ptyp')">TypedDict, Protocol y Generics</button>
    <button class="tab-btn" onclick="switchTab(this,'ptd-3','ptyp')">⚠️ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'ptd-4','ptyp')">✅ Mejores Prácticas</button>
  </div>

  <div id="ptd-1" class="tab-panel active">
<div class="concept-intro">Los <strong>type hints</strong> (PEP 484) son anotaciones opcionales que documentan qué tipo de dato espera una variable, parámetro o retorno de función. Python sigue siendo un lenguaje de tipado dinámico: <strong>los hints NO se verifican en runtime</strong> por defecto — son solo documentación ejecutable que herramientas externas (mypy, pyright, tu IDE) usan para detectar errores ANTES de ejecutar el código. En equipos de software automotriz con bases de código grandes, son casi obligatorios para mantener la calidad y facilitar el code review.</div>
<div class="code-block"><div class="code-lang">Python — Tipos básicos, Optional y Union</div><pre>
<span class="c-kw">from</span> typing <span class="c-kw">import</span> Optional, Union, List, Dict, Tuple, Set, Callable, Any

<span class="c-cm"># ── Tipos básicos en parámetros y retorno ──────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">process</span>(name: str, count: <span class="c-bi">int</span>, value: <span class="c-bi">float</span>, flag: <span class="c-bi">bool</span>) -&gt; <span class="c-kw">None</span>:
    <span class="c-kw">pass</span>

<span class="c-cm"># ── Optional[X] significa "X o None" ────────────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">find_bench</span>(bench_id: str) -&gt; Optional[str]:   <span class="c-cm"># equivale a Union[str, None]</span>
    <span class="c-kw">return</span> <span class="c-kw">None</span> <span class="c-kw">if</span> bench_id == <span class="c-st">"X"</span> <span class="c-kw">else</span> bench_id

<span class="c-cm"># Python 3.10+: sintaxis moderna con | en vez de Optional/Union</span>
<span class="c-kw">def</span> <span class="c-fn">find_bench2</span>(bench_id: str) -&gt; str | <span class="c-kw">None</span>:      <span class="c-cm"># igual a Optional[str]</span>
    <span class="c-kw">pass</span>

<span class="c-kw">def</span> <span class="c-fn">parse_value</span>(raw: str) -&gt; <span class="c-bi">int</span> | <span class="c-bi">float</span> | <span class="c-kw">None</span>:   <span class="c-cm"># puede ser cualquiera de los 3</span>
    <span class="c-kw">pass</span>

<span class="c-cm"># ── Colecciones tipadas (Python 3.9+: builtins en minúscula) ───────</span>
<span class="c-kw">def</span> <span class="c-fn">analyze</span>(
    timestamps: <span class="c-bi">list</span>[<span class="c-bi">float</span>],           <span class="c-cm"># lista de floats</span>
    config:     <span class="c-bi">dict</span>[str, <span class="c-bi">int</span>],
    coords:     <span class="c-bi">tuple</span>[<span class="c-bi">float</span>, <span class="c-bi">float</span>],    <span class="c-cm"># tupla de longitud FIJA (2 floats)</span>
    tags:       <span class="c-bi">set</span>[str],
) -&gt; <span class="c-bi">list</span>[str]:
    <span class="c-kw">pass</span>

<span class="c-cm"># Antes de 3.9 había que usar typing.List, typing.Dict, etc (aún funcionan)</span>
legacy_signature: List[<span class="c-bi">int</span>] = [<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>]

<span class="c-cm"># tuple de longitud variable con mismo tipo: usa ...</span>
scores: <span class="c-bi">tuple</span>[<span class="c-bi">int</span>, ...] = (<span class="c-nb">90</span>, <span class="c-nb">85</span>, <span class="c-nb">77</span>, <span class="c-nb">99</span>)

<span class="c-cm"># ── Callable — tipar funciones como valores ─────────────────────────</span>
Handler = Callable[[str, <span class="c-bi">int</span>], <span class="c-kw">None</span>]   <span class="c-cm"># función que recibe (str, int) y retorna None</span>

<span class="c-kw">def</span> <span class="c-fn">register</span>(event: str, handler: Handler) -&gt; <span class="c-kw">None</span>:
    <span class="c-kw">pass</span>

<span class="c-cm"># ── Any — "apágame el chequeo de tipos aquí" (úsalo con moderación) ─</span>
<span class="c-kw">def</span> <span class="c-fn">deserialize</span>(raw: str) -&gt; Any:   <span class="c-cm"># el tipo real depende del contenido</span>
    <span class="c-kw">return</span> json.loads(raw)</pre></div>
<table class="kv-table">
<tr><th>Anotación</th><th>Significado</th><th>Ejemplo → Uso típico</th><th>Nota</th></tr>
<tr><td>Optional[str]</td><td>str o None</td><td>find_bench() → Optional[str]</td><td>Igual a str | None (3.10+)</td></tr>
<tr><td>Union[int, str]</td><td>int o str</td><td>parse() → Union[int, str]</td><td>Igual a int | str (3.10+)</td></tr>
<tr><td>list[int]</td><td>Lista de enteros</td><td>ids: list[int]</td><td>Antes: List[int] (typing)</td></tr>
<tr><td>dict[str, int]</td><td>Dict con keys str, values int</td><td>counts: dict[str, int]</td><td>Antes: Dict[str, int]</td></tr>
<tr><td>tuple[float, float]</td><td>Tupla de longitud fija</td><td>coords: tuple[float, float]</td><td>tuple[int, ...] = longitud variable</td></tr>
<tr><td>Any</td><td>Cualquier tipo, sin chequeo</td><td>data: Any</td><td>Úsalo lo menos posible</td></tr>
</table>
  </div>

  <div id="ptd-2" class="tab-panel">
<div class="concept-intro">Más allá de los tipos básicos, <code>typing</code> ofrece herramientas para modelar estructuras más ricas: <strong>TypedDict</strong> tipa las keys de un diccionario (útil para configuración JSON), <strong>Protocol</strong> permite "duck typing" tipado — cualquier clase que tenga los métodos correctos es válida sin necesidad de heredar — y <strong>TypeVar/Generic</strong> permiten escribir funciones y clases genéricas que preservan el tipo de su entrada.</div>
<div class="code-block"><div class="code-lang">Python — TypedDict, Protocol, Generic y TypeVar</div><pre>
<span class="c-kw">from</span> typing <span class="c-kw">import</span> TypeVar, Generic, TypedDict, Protocol
<span class="c-kw">from</span> collections.abc <span class="c-kw">import</span> Sequence, Mapping, Iterator, Generator

<span class="c-cm"># ── TypedDict — dict con tipos definidos por campo ──────────────────</span>
<span class="c-kw">class</span> <span class="c-fn">BenchConfig</span>(TypedDict):
    bench_id: str
    timeout: <span class="c-bi">int</span>
    retries: <span class="c-bi">int</span>
    debug: <span class="c-bi">bool</span>

<span class="c-cm"># mypy/pyright validan que el dict tenga EXACTAMENTE esas keys y tipos</span>
cfg: BenchConfig = {<span class="c-st">"bench_id"</span>: <span class="c-st">"A3"</span>, <span class="c-st">"timeout"</span>: <span class="c-nb">30</span>, <span class="c-st">"retries"</span>: <span class="c-nb">3</span>, <span class="c-st">"debug"</span>: <span class="c-kw">False</span>}

<span class="c-cm"># total=False — todas las keys son opcionales</span>
<span class="c-kw">class</span> <span class="c-fn">PartialConfig</span>(TypedDict, total=<span class="c-kw">False</span>):
    timeout: <span class="c-bi">int</span>
    retries: <span class="c-bi">int</span>

<span class="c-cm"># ── Protocol — "duck typing" tipado (structural typing) ─────────────</span>
<span class="c-kw">class</span> <span class="c-fn">Connectable</span>(Protocol):
    <span class="c-kw">def</span> <span class="c-fn">connect</span>(self) -&gt; <span class="c-kw">None</span>: ...
    <span class="c-kw">def</span> <span class="c-fn">disconnect</span>(self) -&gt; <span class="c-kw">None</span>: ...
    <span class="c-kw">def</span> <span class="c-fn">is_alive</span>(self) -&gt; <span class="c-bi">bool</span>: ...

<span class="c-kw">def</span> <span class="c-fn">use_device</span>(device: Connectable) -&gt; <span class="c-kw">None</span>:
    device.connect()

<span class="c-cm"># Cualquier clase con connect/disconnect/is_alive es válida — SIN heredar de Connectable</span>
<span class="c-kw">class</span> <span class="c-fn">CanBusDevice</span>:
    <span class="c-kw">def</span> <span class="c-fn">connect</span>(self) -&gt; <span class="c-kw">None</span>: ...
    <span class="c-kw">def</span> <span class="c-fn">disconnect</span>(self) -&gt; <span class="c-kw">None</span>: ...
    <span class="c-kw">def</span> <span class="c-fn">is_alive</span>(self) -&gt; <span class="c-bi">bool</span>: <span class="c-kw">return</span> <span class="c-kw">True</span>

use_device(CanBusDevice())   <span class="c-cm"># válido para mypy: cumple el "shape" del Protocol</span>

<span class="c-cm"># ── TypeVar y funciones genéricas ────────────────────────────────────</span>
T = TypeVar(<span class="c-st">'T'</span>)

<span class="c-kw">def</span> <span class="c-fn">first</span>(items: <span class="c-bi">list</span>[T]) -&gt; T:              <span class="c-cm"># retorna EL MISMO tipo que recibió la lista</span>
    <span class="c-kw">return</span> items[<span class="c-nb">0</span>]

<span class="c-bi">int</span>_result = first([<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>])       <span class="c-cm"># mypy infiere: int</span>
str_result = first([<span class="c-st">"a"</span>, <span class="c-st">"b"</span>])       <span class="c-cm"># mypy infiere: str</span>

<span class="c-cm"># ── Generic — clases genéricas parametrizadas por tipo ───────────────</span>
<span class="c-kw">class</span> <span class="c-fn">Buffer</span>(Generic[T]):
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self) -&gt; <span class="c-kw">None</span>:
        self._items: <span class="c-bi">list</span>[T] = []

    <span class="c-kw">def</span> <span class="c-fn">push</span>(self, item: T) -&gt; <span class="c-kw">None</span>:
        self._items.append(item)

    <span class="c-kw">def</span> <span class="c-fn">pop</span>(self) -&gt; T:
        <span class="c-kw">return</span> self._items.pop()

sensor_buffer: Buffer[<span class="c-bi">float</span>] = Buffer()   <span class="c-cm"># Buffer especializado para floats</span>
sensor_buffer.push(<span class="c-nb">3.14</span>)
<span class="c-cm"># sensor_buffer.push("no numérico")  ← mypy lo marcaría como error</span>

<span class="c-cm"># ── Generator/Iterator tipados ────────────────────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">read_frames</span>(path: str) -&gt; Generator[<span class="c-bi">dict</span>, <span class="c-kw">None</span>, <span class="c-kw">None</span>]:
    <span class="c-kw">with</span> <span class="c-bi">open</span>(path) <span class="c-kw">as</span> f:
        <span class="c-kw">for</span> line <span class="c-kw">in</span> f:
            <span class="c-kw">yield</span> json.loads(line)</pre></div>
  </div>

  <div id="ptd-3" class="tab-panel">
<div class="concept-intro">El error de fondo más común con type hints es olvidar que <strong>Python no los hace cumplir en runtime</strong> — son solo para herramientas de análisis estático. Otros errores frecuentes: usar el tipo equivocado de contenedor, y anotaciones que no reflejan la realidad del código.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">set_timeout</span>(seconds: <span class="c-bi">int</span>) -&gt; <span class="c-kw">None</span>:
    ...

set_timeout(<span class="c-st">"30"</span>)   <span class="c-cm"># ¡NO lanza TypeError! Python lo ejecuta igual</span>
<span class="c-cm"># el type hint es solo documentación, no un guardia en runtime</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">set_timeout</span>(seconds: <span class="c-bi">int</span>) -&gt; <span class="c-kw">None</span>:
    <span class="c-kw">if</span> <span class="c-kw">not</span> <span class="c-bi">isinstance</span>(seconds, <span class="c-bi">int</span>):
        <span class="c-kw">raise</span> <span class="c-bi">TypeError</span>(<span class="c-st">f"seconds debe ser int, llegó {type(seconds)}"</span>)
    ...
<span class="c-cm"># y en CI: correr "mypy ." para atrapar el llamado incorrecto ANTES de ejecutar</span></pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> Python es de tipado dinámico y los type hints no se validan al ejecutar el programa — solo son leídos por herramientas externas como mypy o pyright durante análisis estático, o por tu IDE para autocompletar. Si necesitas garantía real en runtime (por ejemplo validando input externo de un archivo de configuración), tienes que hacer la validación explícita con <code>isinstance()</code> o usar una librería como pydantic.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">get_status</span>(bench_id: str) -&gt; str:
    <span class="c-kw">if</span> bench_id <span class="c-kw">not</span> <span class="c-kw">in</span> benches:
        <span class="c-kw">return</span> <span class="c-kw">None</span>   <span class="c-cm"># viola su propio type hint: -> str, no -> Optional[str]</span>
    <span class="c-kw">return</span> benches[bench_id].status</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">get_status</span>(bench_id: str) -&gt; Optional[str]:
    <span class="c-kw">if</span> bench_id <span class="c-kw">not</span> <span class="c-kw">in</span> benches:
        <span class="c-kw">return</span> <span class="c-kw">None</span>
    <span class="c-kw">return</span> benches[bench_id].status</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> declarar <code>-&gt; str</code> pero retornar <code>None</code> en algún camino es una anotación mentirosa: mypy lo detectaría como error si lo corrieras, pero si nadie ejecuta el linter de tipos, el código pasa code review "silenciosamente" y quien llama a la función asume que siempre recibe un str, causando un <code>AttributeError</code> más adelante al hacer <code>.upper()</code> sobre None.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre><span class="c-kw">def</span> <span class="c-fn">process_batch</span>(items) -&gt; <span class="c-bi">list</span>:   <span class="c-cm"># sin anotar el contenido</span>
    <span class="c-kw">return</span> [transform(i) <span class="c-kw">for</span> i <span class="c-kw">in</span> items]
<span class="c-cm"># ¿items es list[str]? ¿list[dict]? nadie lo sabe sin leer el cuerpo</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre><span class="c-kw">def</span> <span class="c-fn">process_batch</span>(items: <span class="c-bi">list</span>[SensorReading]) -&gt; <span class="c-bi">list</span>[Result]:
    <span class="c-kw">return</span> [transform(i) <span class="c-kw">for</span> i <span class="c-kw">in</span> items]</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> anotar solo el contenedor exterior (<code>list</code>) sin el tipo de sus elementos (<code>list[SensorReading]</code>) pierde la mitad del valor del type hint: tu IDE no puede autocompletar los atributos de cada elemento, y mypy no puede detectar si pasas una lista del tipo equivocado. Siempre especifica el tipo de los elementos en colecciones.</div>
  </div>

  <div id="ptd-4" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Corre mypy o pyright en CI, no solo en tu editor</div>
  <p>Los type hints solo aportan valor real si algo los verifica. Agrega <code>mypy .</code> o <code>pyright</code> como paso de CI/CD (igual que pytest) para que un PR con tipos incorrectos falle el pipeline, no solo se vea "raro" en el IDE de quien lo escribió.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa Optional[X] (o X | None) en vez de omitir el caso None</div>
  <p>Si una función puede devolver None en algún camino, refleja eso en la anotación del retorno. Esto obliga a quien la llama a manejar explícitamente el caso None (mypy se queja si no lo haces).</p>
</div>
<div class="practice-card">
  <div class="practice-title">Prefiere Protocol sobre herencia cuando solo necesitas "el shape" de una clase</div>
  <p>Protocol permite tipar interfaces sin forzar herencia — cualquier objeto con los métodos correctos es válido (duck typing tipado). Es más flexible que ABC para casos donde no controlas todas las implementaciones (por ejemplo, drivers de terceros).</p>
</div>
<div class="practice-card">
  <div class="practice-title">No abuses de Any — perdiste el chequeo de tipos donde lo uses</div>
  <p><code>Any</code> es compatible con cualquier tipo y desactiva la verificación de mypy en ese punto. Úsalo solo en fronteras genuinamente dinámicas (deserializar JSON de estructura desconocida), no como atajo para "no pensar en el tipo".</p>
</div>
<div class="practice-card">
  <div class="practice-title">Si necesitas validación real en runtime, usa pydantic (no solo type hints)</div>
  <p>Para validar datos externos (config JSON, payloads de API, mensajes de un bus) donde SÍ necesitas que un tipo incorrecto lance una excepción en ejecución, type hints puros no alcanzan — usa pydantic o valida manualmente con isinstance().</p>
</div>
  </div>
</div>`,

// ══ POO ══

'poo-clase': `
<div class="concept-intro">Una <strong>clase</strong> es la plantilla; un <strong>objeto</strong> (o instancia) es lo que se construye a partir de ella. La clase define qué atributos y métodos tendrá cada objeto, pero cada instancia guarda sus propios valores — excepto los atributos de clase, que viven una sola vez y se comparten entre todas las instancias.</div>
<div class="diagram-card">
<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagrama de una clase BenchMonitor con un atributo de clase compartido MAX_BENCHES igual a 10, y tres instancias b1, b2 y b3 que comparten ese atributo pero cada una tiene su propio bench_id y timeout">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="210" y="10" width="180" height="50" rx="7" fill="var(--accent)" fill-opacity="0.85" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="300" y="30" font-size="11" font-weight="700" fill="white" text-anchor="middle">class BenchMonitor</text>
    <text x="300" y="45" font-size="9.5" fill="white" text-anchor="middle">MAX_BENCHES = 10 (compartido)</text>

    <rect x="20" y="120" width="160" height="55" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="100" y="142" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">b1</text>
    <text x="100" y="156" font-size="9" fill="var(--text-muted)" text-anchor="middle">bench_id='bench-a3'</text>
    <text x="100" y="168" font-size="9" fill="var(--text-muted)" text-anchor="middle">timeout=30</text>

    <rect x="220" y="120" width="160" height="55" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="300" y="142" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">b2</text>
    <text x="300" y="156" font-size="9" fill="var(--text-muted)" text-anchor="middle">bench_id='bench-b1'</text>
    <text x="300" y="168" font-size="9" fill="var(--text-muted)" text-anchor="middle">timeout=60</text>

    <rect x="420" y="120" width="160" height="55" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="500" y="142" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">b3</text>
    <text x="500" y="156" font-size="9" fill="var(--text-muted)" text-anchor="middle">bench_id='bench-c2'</text>
    <text x="500" y="168" font-size="9" fill="var(--text-muted)" text-anchor="middle">timeout=30</text>

    <line x1="270" y1="60" x2="100" y2="118" stroke="var(--border)" stroke-width="1.5"/>
    <line x1="300" y1="60" x2="300" y2="118" stroke="var(--border)" stroke-width="1.5"/>
    <line x1="330" y1="60" x2="500" y2="118" stroke="var(--border)" stroke-width="1.5"/>
  </g>
</svg>
<div class="diagram-caption"><b>MAX_BENCHES</b> existe una sola vez en memoria y las tres instancias lo consultan por igual. <b>bench_id</b> y <b>timeout</b> son atributos de instancia: cada objeto tiene su propia copia, independiente de las demás.</div>
</div>
<table class="kv-table"><tr><th>Tipo de miembro</th><th>Dónde vive</th><th>Cuándo cambia</th></tr>
<tr><td>Atributo de clase</td><td>Una sola vez, en la clase (<code>MAX_BENCHES = 10</code>)</td><td>Si se modifica vía la clase, afecta a todas las instancias que no lo hayan sobrescrito</td></tr>
<tr><td>Atributo de instancia</td><td>Una copia por objeto (<code>self.bench_id = ...</code>)</td><td>Cambia solo esa instancia, sin afectar a las demás</td></tr>
</table>
<table class="kv-table"><tr><th>Tipo de método</th><th>Primer parámetro</th><th>Cuándo usarlo</th></tr>
<tr><td>Método de instancia</td><td><code>self</code> (la instancia)</td><td>El caso normal: necesita leer o modificar el estado de un objeto concreto</td></tr>
<tr><td><code>@classmethod</code></td><td><code>cls</code> (la clase)</td><td>Necesita la clase pero no una instancia específica — típico en factory methods como <code>from_config()</code></td></tr>
<tr><td><code>@staticmethod</code></td><td>Ninguno especial</td><td>Función de utilidad relacionada con la clase, pero que no toca ni <code>self</code> ni <code>cls</code></td></tr>
</table>
<div class="alert-card">💡 <code>self.__secret</code> (doble guion bajo) activa <em>name mangling</em>: Python lo renombra internamente a <code>_BenchMonitor__secret</code> para evitar colisiones accidentales en subclases. No es seguridad real — es una convención para decir "no toques esto desde fuera, ni siquiera por accidente".</div>
<div class="code-block"><div class="code-lang">Python — Clases y Objetos: referencia completa</div><pre>
<span class="c-kw">class</span> <span class="c-fn">BenchMonitor</span>:
    <span class="c-cm"># Atributo de CLASE — compartido entre todas las instancias</span>
    MAX_BENCHES = <span class="c-nb">10</span>
    _instances: <span class="c-bi">list</span> = []

    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self, bench_id: str, timeout: <span class="c-bi">int</span> = <span class="c-nb">30</span>):
        <span class="c-cm"># Atributos de INSTANCIA — únicos por objeto</span>
        self.bench_id = bench_id
        self.timeout = timeout
        self._connected = <span class="c-kw">False</span>          <span class="c-cm"># convención: privado (_)</span>
        self.__secret = <span class="c-st">"internal"</span>      <span class="c-cm"># name mangling (__) → _BenchMonitor__secret</span>
        BenchMonitor._instances.append(self)

    <span class="c-cm"># Método de instancia — tiene acceso a self</span>
    <span class="c-kw">def</span> <span class="c-fn">connect</span>(self) -&gt; <span class="c-kw">None</span>:
        self._connected = <span class="c-kw">True</span>

    <span class="c-cm"># Property — acceso como atributo, lógica interna</span>
    <span class="c-dc">@property</span>
    <span class="c-kw">def</span> <span class="c-fn">is_connected</span>(self) -&gt; <span class="c-bi">bool</span>:
        <span class="c-kw">return</span> self._connected

    <span class="c-dc">@is_connected.setter</span>
    <span class="c-kw">def</span> <span class="c-fn">is_connected</span>(self, value: <span class="c-bi">bool</span>) -&gt; <span class="c-kw">None</span>:
        self._connected = <span class="c-bi">bool</span>(value)

    <span class="c-cm"># @classmethod — tiene acceso a la clase, no a la instancia</span>
    <span class="c-dc">@classmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">from_config</span>(cls, config: <span class="c-bi">dict</span>) -&gt; <span class="c-st">"BenchMonitor"</span>:
        <span class="c-cm">"""Factory method — crea instancia desde dict."""</span>
        <span class="c-kw">return</span> cls(config[<span class="c-st">"bench_id"</span>], config.get(<span class="c-st">"timeout"</span>, <span class="c-nb">30</span>))

    <span class="c-cm"># @staticmethod — no accede a clase ni instancia</span>
    <span class="c-dc">@staticmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">validate_bench_id</span>(bid: str) -&gt; <span class="c-bi">bool</span>:
        <span class="c-kw">return</span> bid.startswith(<span class="c-st">"bench-"</span>)

    <span class="c-cm"># Representación para debug</span>
    <span class="c-kw">def</span> <span class="c-fn">__repr__</span>(self) -&gt; str:
        <span class="c-kw">return</span> <span class="c-st">f"BenchMonitor(bench_id={self.bench_id!r}, timeout={self.timeout})"</span>

    <span class="c-cm"># Representación para usuarios</span>
    <span class="c-kw">def</span> <span class="c-fn">__str__</span>(self) -&gt; str:
        status = <span class="c-st">"online"</span> <span class="c-kw">if</span> self._connected <span class="c-kw">else</span> <span class="c-st">"offline"</span>
        <span class="c-kw">return</span> <span class="c-st">f"Bench {self.bench_id} [{status}]"</span>

<span class="c-cm"># Uso</span>
b = BenchMonitor(<span class="c-st">"bench-a3"</span>)
b2 = BenchMonitor.from_config({<span class="c-st">"bench_id"</span>: <span class="c-st">"bench-b1"</span>})
<span class="c-bi">print</span>(b.is_connected)   <span class="c-cm"># False — usa property</span>
b.is_connected = <span class="c-kw">True</span>   <span class="c-cm"># usa setter</span></pre></div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Clases y Objetos...</p>
</div>`,

'poo-principios': `
<div class="concept-intro">Los <strong>4 pilares de la POO</strong> no son reglas aisladas: se complementan entre sí para que el código sea más fácil de extender sin romper lo que ya funciona. Cada pestaña muestra el principio aplicado a un caso realista de testing de hardware.</div>
<div class="diagram-card">
<svg viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Los cuatro pilares de la programación orientada a objetos: Encapsulación, Herencia, Polimorfismo y Abstracción">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="10" y="15" width="135" height="60" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="77" y="40" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">🔒 Encapsulación</text>
    <text x="77" y="55" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">Oculta el "cómo"</text>

    <rect x="155" y="15" width="135" height="60" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="222" y="40" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">🌳 Herencia</text>
    <text x="222" y="55" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">Reutiliza y extiende</text>

    <rect x="300" y="15" width="135" height="60" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="367" y="40" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">🎭 Polimorfismo</text>
    <text x="367" y="55" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">Mismo método, distinto comportamiento</text>

    <rect x="445" y="15" width="145" height="60" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="517" y="40" font-size="10" font-weight="700" fill="var(--accent)" text-anchor="middle">🗂️ Abstracción</text>
    <text x="517" y="55" font-size="8.5" fill="var(--text-muted)" text-anchor="middle">Define el "qué", no el "cómo"</text>
  </g>
</svg>
</div>
<div class="tab-group-poop">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pp-1','poop')">Encapsulación</button>
    <button class="tab-btn" onclick="switchTab(this,'pp-2','poop')">Herencia</button>
    <button class="tab-btn" onclick="switchTab(this,'pp-3','poop')">Polimorfismo</button>
    <button class="tab-btn" onclick="switchTab(this,'pp-4','poop')">Abstracción</button>
  </div>
  <div id="pp-1" class="tab-panel active">
<div class="concept-intro">Encapsular es ocultar los detalles internos de una clase y exponer solo una interfaz controlada. Python no tiene <code>private</code> real como Java o C++: usa <strong>convenciones</strong> (<code>_x</code>) reforzadas opcionalmente con <em>name mangling</em> (<code>__x</code>), y valida los cambios a través de <code>@property</code> en vez de exponer atributos en crudo.</div>
<div class="code-block"><div class="code-lang">Encapsulación — ocultar detalles de implementación</div><pre>
<span class="c-kw">class</span> <span class="c-fn">SensorDriver</span>:
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self):
        self._buffer = []         <span class="c-cm"># _  = "privado por convención" (aún accesible)</span>
        self.__calibration = <span class="c-nb">1.0</span>  <span class="c-cm"># __ = name mangling → _SensorDriver__calibration</span>

    <span class="c-dc">@property</span>
    <span class="c-kw">def</span> <span class="c-fn">data</span>(self):
        <span class="c-kw">return</span> self._buffer.copy()  <span class="c-cm"># expone copia, no la referencia interna</span>

    <span class="c-kw">def</span> <span class="c-fn">calibrate</span>(self, factor: <span class="c-bi">float</span>) -&gt; <span class="c-kw">None</span>:
        <span class="c-kw">if</span> factor &lt;= <span class="c-nb">0</span>: <span class="c-kw">raise</span> ValueError(<span class="c-st">"factor must be positive"</span>)
        self.__calibration = factor   <span class="c-cm"># validación antes de asignar</span>

<span class="c-cm"># Beneficio: el código externo no depende de cómo está implementado internamente</span>
<span class="c-cm"># Puedes cambiar self._buffer por deque sin romper nada externo</span></pre></div>
  </div>
  <div id="pp-2" class="tab-panel">
<div class="concept-intro">Heredar permite que una clase (subclase) reciba automáticamente atributos y métodos de otra (superclase), y solo escriba lo que la hace distinta. <code>super()</code> llama la implementación del padre — se puede usar para extenderla (llamarla y luego agregar algo) en vez de reescribirla desde cero.</div>
<div class="code-block"><div class="code-lang">Herencia — reusar y extender comportamiento</div><pre>
<span class="c-kw">class</span> <span class="c-fn">BaseSensor</span>:
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self, sensor_id: str):
        self.sensor_id = sensor_id
        self.readings = []

    <span class="c-kw">def</span> <span class="c-fn">record</span>(self, value: <span class="c-bi">float</span>) -&gt; <span class="c-kw">None</span>:
        self.readings.append(value)

    <span class="c-kw">def</span> <span class="c-fn">summary</span>(self) -&gt; str:
        <span class="c-kw">return</span> <span class="c-st">f"{self.sensor_id}: {len(self.readings)} readings"</span>

<span class="c-kw">class</span> <span class="c-fn">TemperatureSensor</span>(BaseSensor):
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self, sensor_id: str, unit: str = <span class="c-st">"C"</span>):
        <span class="c-bi">super</span>().__init__(sensor_id)   <span class="c-cm"># llama __init__ del padre</span>
        self.unit = unit

    <span class="c-kw">def</span> <span class="c-fn">record</span>(self, value: <span class="c-bi">float</span>) -&gt; <span class="c-kw">None</span>:  <span class="c-cm"># override con extensión</span>
        <span class="c-kw">if not</span> -<span class="c-nb">40</span> &lt;= value &lt;= <span class="c-nb">125</span>:
            <span class="c-kw">raise</span> ValueError(<span class="c-st">f"Out of range: {value}"</span>)
        <span class="c-bi">super</span>().record(value)         <span class="c-cm"># llama el padre después de validar</span>

    <span class="c-kw">def</span> <span class="c-fn">summary</span>(self) -&gt; str:        <span class="c-cm"># override completo</span>
        base = <span class="c-bi">super</span>().summary()
        avg = <span class="c-bi">sum</span>(self.readings)/<span class="c-bi">len</span>(self.readings) <span class="c-kw">if</span> self.readings <span class="c-kw">else</span> <span class="c-nb">0</span>
        <span class="c-kw">return</span> <span class="c-st">f"{base} | avg={avg:.1f}{self.unit}"</span></pre></div>
  </div>
  <div id="pp-3" class="tab-panel">
<div class="concept-intro">El polimorfismo permite tratar objetos de distinto tipo de forma uniforme si comparten la misma interfaz: el código que llama <code>s.read()</code> no necesita saber si <code>s</code> es un LiDAR o una cámara. Python lleva esto un paso más allá con <strong>duck typing</strong>: ni siquiera exige herencia formal — "si camina como pato y grazna como pato, es un pato".</div>
<div class="code-block"><div class="code-lang">Polimorfismo — mismo método, diferente comportamiento</div><pre>
<span class="c-kw">class</span> <span class="c-fn">Sensor</span>:
    <span class="c-kw">def</span> <span class="c-fn">read</span>(self) -&gt; <span class="c-bi">float</span>: <span class="c-kw">return</span> <span class="c-nb">0.0</span>

<span class="c-kw">class</span> <span class="c-fn">LidarSensor</span>(Sensor):
    <span class="c-kw">def</span> <span class="c-fn">read</span>(self) -&gt; <span class="c-bi">float</span>: <span class="c-kw">return</span> get_lidar_distance()

<span class="c-kw">class</span> <span class="c-fn">CameraSensor</span>(Sensor):
    <span class="c-kw">def</span> <span class="c-fn">read</span>(self) -&gt; <span class="c-bi">float</span>: <span class="c-kw">return</span> get_camera_fps()

<span class="c-cm"># Polimorfismo: mismo código funciona con cualquier tipo de sensor</span>
sensors: <span class="c-bi">list</span>[Sensor] = [LidarSensor(), CameraSensor()]
readings = [s.read() <span class="c-kw">for</span> s <span class="c-kw">in</span> sensors]  <span class="c-cm"># Python usa el método correcto automáticamente</span>

<span class="c-cm"># Duck typing — Python no verifica el tipo, solo que tenga el método</span>
<span class="c-kw">class</span> <span class="c-fn">MockSensor</span>:                  <span class="c-cm"># no hereda de Sensor, pero funciona igual</span>
    <span class="c-kw">def</span> <span class="c-fn">read</span>(self) -&gt; <span class="c-bi">float</span>: <span class="c-kw">return</span> <span class="c-nb">42.0</span>

sensors.append(MockSensor())       <span class="c-cm"># funciona — tiene método read()</span></pre></div>
  </div>
  <div id="pp-4" class="tab-panel">
<div class="concept-intro">Abstraer es definir <strong>qué</strong> debe hacer una clase sin comprometerse a <strong>cómo</strong> lo hace. Un módulo <code>ABC</code> (Abstract Base Class) actúa como contrato: no se puede instanciar directamente, y obliga a cualquier subclase concreta a implementar los métodos marcados como abstractos, o Python lanza un error antes de que el objeto llegue a existir.</div>
<div class="code-block"><div class="code-lang">Abstracción — interfaz sin implementación</div><pre>
<span class="c-kw">from</span> abc <span class="c-kw">import</span> ABC, abstractmethod

<span class="c-kw">class</span> <span class="c-fn">DataValidator</span>(ABC):
    <span class="c-cm">"""Contrato: cualquier validador DEBE implementar validate() y name."""</span>

    <span class="c-dc">@abstractmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">validate</span>(self, data) -&gt; <span class="c-bi">bool</span>:
        <span class="c-kw">pass</span>   <span class="c-cm"># no tiene implementación</span>

    <span class="c-dc">@property</span>
    <span class="c-dc">@abstractmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">name</span>(self) -&gt; str:
        <span class="c-kw">pass</span>

    <span class="c-kw">def</span> <span class="c-fn">validate_and_log</span>(self, data) -&gt; <span class="c-bi">bool</span>:   <span class="c-cm"># método concreto en clase abstracta</span>
        result = self.validate(data)
        <span class="c-bi">print</span>(<span class="c-st">f"{self.name}: {'OK' if result else 'FAIL'}"</span>)
        <span class="c-kw">return</span> result

<span class="c-kw">class</span> <span class="c-fn">FrequencyValidator</span>(DataValidator):
    <span class="c-dc">@property</span>
    <span class="c-kw">def</span> <span class="c-fn">name</span>(self): <span class="c-kw">return</span> <span class="c-st">"FrequencyValidator"</span>

    <span class="c-kw">def</span> <span class="c-fn">validate</span>(self, hz: <span class="c-bi">float</span>) -&gt; <span class="c-bi">bool</span>:
        <span class="c-kw">return</span> <span class="c-nb">8</span> &lt;= hz &lt;= <span class="c-nb">12</span>

<span class="c-cm"># DataValidator()  ← TypeError: no se puede instanciar clase abstracta</span>
<span class="c-cm"># FrequencyValidator()  ← OK</span></pre></div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre los 4 Principios POO...</p>
</div>`,

'poo-herencia': `
<div class="concept-intro">Cuando una clase hereda de <strong>varias</strong> clases padre a la vez (herencia múltiple), Python necesita una regla fija para decidir en qué orden busca un método si varias clases padre lo definen. Esa regla es el <strong>MRO</strong> (Method Resolution Order), calculado con el algoritmo <strong>C3 Linearization</strong>.</div>
<div class="diagram-card">
<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diamond problem de herencia múltiple: la clase A en la cima, B y C heredan de A, y D hereda de B y C, formando un diamante. El MRO resultante es D, B, C, A, object">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="165" y="10" width="130" height="42" rx="7" fill="var(--accent)" fill-opacity="0.85" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="230" y="36" font-size="12" font-weight="700" fill="white" text-anchor="middle">class A</text>

    <rect x="40" y="95" width="130" height="42" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="105" y="121" font-size="12" font-weight="700" fill="var(--accent)" text-anchor="middle">class B(A)</text>

    <rect x="290" y="95" width="130" height="42" rx="7" fill="var(--accent-light)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="355" y="121" font-size="12" font-weight="700" fill="var(--accent)" text-anchor="middle">class C(A)</text>

    <rect x="165" y="170" width="130" height="42" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="230" y="196" font-size="12" font-weight="700" fill="var(--green)" text-anchor="middle">class D(B, C)</text>

    <line x1="200" y1="52" x2="105" y2="93" stroke="var(--border)" stroke-width="1.5"/>
    <line x1="260" y1="52" x2="355" y2="93" stroke="var(--border)" stroke-width="1.5"/>
    <line x1="105" y1="137" x2="200" y2="168" stroke="var(--border)" stroke-width="1.5"/>
    <line x1="355" y1="137" x2="260" y2="168" stroke="var(--border)" stroke-width="1.5"/>
  </g>
</svg>
<div class="diagram-caption">MRO de <code>D</code>: <code>D → B → C → A → object</code>. Cada clase aparece <b>una sola vez</b> y siempre antes que sus propios padres — así <code>super()</code> nunca ejecuta el mismo método dos veces ni se salta una clase intermedia.</div>
</div>
<div class="code-block"><div class="code-lang">Python — Herencia múltiple y MRO</div><pre>
<span class="c-kw">class</span> <span class="c-fn">A</span>:
    <span class="c-kw">def</span> <span class="c-fn">method</span>(self): <span class="c-kw">return</span> <span class="c-st">"A"</span>

<span class="c-kw">class</span> <span class="c-fn">B</span>(A):
    <span class="c-kw">def</span> <span class="c-fn">method</span>(self): <span class="c-kw">return</span> <span class="c-st">"B → "</span> + <span class="c-bi">super</span>().method()

<span class="c-kw">class</span> <span class="c-fn">C</span>(A):
    <span class="c-kw">def</span> <span class="c-fn">method</span>(self): <span class="c-kw">return</span> <span class="c-st">"C → "</span> + <span class="c-bi">super</span>().method()

<span class="c-kw">class</span> <span class="c-fn">D</span>(B, C):    <span class="c-cm"># herencia múltiple</span>
    <span class="c-kw">pass</span>

<span class="c-cm"># MRO (Method Resolution Order) — C3 Linearization</span>
D.__mro__   <span class="c-cm"># (D, B, C, A, object)</span>
D().method()  <span class="c-cm"># "B → C → A" — sigue el MRO</span>

<span class="c-cm"># Mixin pattern — agrega funcionalidad sin herencia profunda</span>
<span class="c-kw">class</span> <span class="c-fn">LoggingMixin</span>:
    <span class="c-kw">def</span> <span class="c-fn">log</span>(self, msg):
        <span class="c-bi">print</span>(<span class="c-st">f"[{self.__class__.__name__}] {msg}"</span>)

<span class="c-kw">class</span> <span class="c-fn">RetryMixin</span>:
    <span class="c-kw">def</span> <span class="c-fn">retry</span>(self, func, times=<span class="c-nb">3</span>):
        <span class="c-kw">for</span> _ <span class="c-kw">in</span> <span class="c-bi">range</span>(times):
            <span class="c-kw">try</span>: <span class="c-kw">return</span> func()
            <span class="c-kw">except</span> <span class="c-bi">Exception</span>: <span class="c-kw">pass</span>

<span class="c-kw">class</span> <span class="c-fn">BenchClient</span>(LoggingMixin, RetryMixin):   <span class="c-cm"># mixins primero</span>
    <span class="c-kw">def</span> <span class="c-fn">connect</span>(self):
        self.log(<span class="c-st">"Connecting..."</span>)
        <span class="c-kw">return</span> self.retry(<span class="c-kw">lambda</span>: raw_connect())</pre></div>
<div class="alert-card">💡 Un <strong>Mixin</strong> no está pensado para instanciarse solo — es una clase pequeña y enfocada (un solo comportamiento, como <code>log()</code> o <code>retry()</code>) que se combina con herencia múltiple para "inyectar" esa capacidad en otras clases sin duplicar código ni crear jerarquías profundas.</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Herencia y MRO...</p>
</div>`,

'poo-metodos': `
<div class="concept-intro">Los <strong>métodos especiales</strong> (o <em>dunder methods</em>, por sus dobles guiones bajos — "double underscore") son el mecanismo que usa Python para conectar tus clases con su propia sintaxis: operadores (<code>+</code>, <code>==</code>, <code>&lt;</code>), funciones built-in (<code>len()</code>, <code>str()</code>, <code>iter()</code>) y estructuras del lenguaje (<code>for</code>, <code>with</code>, <code>[]</code>). Implementarlos es lo que hace que una clase se sienta "nativa" del lenguaje en vez de una caja negra con métodos sueltos.</div>
<table class="kv-table"><tr><th>Categoría</th><th>Dunder methods</th><th>Se activa con</th></tr>
<tr><td>Representación</td><td><code>__repr__</code>, <code>__str__</code></td><td><code>repr(obj)</code> / consola interactiva, y <code>str(obj)</code> / <code>print(obj)</code></td></tr>
<tr><td>Comparación</td><td><code>__eq__</code>, <code>__lt__</code>, <code>__hash__</code></td><td><code>==</code>, <code>&lt;</code> / <code>sorted()</code>, y uso como clave en <code>set</code>/<code>dict</code></td></tr>
<tr><td>Contenedor</td><td><code>__len__</code>, <code>__getitem__</code>, <code>__setitem__</code>, <code>__contains__</code></td><td><code>len(obj)</code>, <code>obj[i]</code>, <code>obj[i] = x</code>, <code>x in obj</code></td></tr>
<tr><td>Iteración</td><td><code>__iter__</code></td><td><code>for x in obj</code>, desempaquetado, comprensiones</td></tr>
<tr><td>Aritmética</td><td><code>__add__</code></td><td><code>obj1 + obj2</code> (operator overloading)</td></tr>
<tr><td>Context manager</td><td><code>__enter__</code>, <code>__exit__</code></td><td><code>with obj as x:</code></td></tr>
<tr><td>Llamable</td><td><code>__call__</code></td><td><code>obj(x)</code> — el objeto se comporta como una función</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — Métodos especiales (dunder) más importantes</div><pre>
<span class="c-kw">class</span> <span class="c-fn">SensorData</span>:
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self, values: <span class="c-bi">list</span>[<span class="c-bi">float</span>]):
        self.values = values

    <span class="c-cm"># ── Representación ───────────────────────────────────────────────</span>
    <span class="c-kw">def</span> <span class="c-fn">__repr__</span>(self): <span class="c-kw">return</span> <span class="c-st">f"SensorData({self.values!r})"</span>  <span class="c-cm"># debug</span>
    <span class="c-kw">def</span> <span class="c-fn">__str__</span>(self):  <span class="c-kw">return</span> <span class="c-st">f"SensorData[{len(self.values)} readings]"</span>

    <span class="c-cm"># ── Comparación ──────────────────────────────────────────────────</span>
    <span class="c-kw">def</span> <span class="c-fn">__eq__</span>(self, other):  <span class="c-kw">return</span> self.values == other.values
    <span class="c-kw">def</span> <span class="c-fn">__lt__</span>(self, other):  <span class="c-kw">return</span> <span class="c-bi">len</span>(self) &lt; <span class="c-bi">len</span>(other)
    <span class="c-kw">def</span> <span class="c-fn">__hash__</span>(self):       <span class="c-kw">return</span> <span class="c-bi">hash</span>(<span class="c-bi">tuple</span>(self.values))  <span class="c-cm"># para usar en set/dict</span>

    <span class="c-cm"># ── Contenedor ───────────────────────────────────────────────────</span>
    <span class="c-kw">def</span> <span class="c-fn">__len__</span>(self):          <span class="c-kw">return</span> <span class="c-bi">len</span>(self.values)
    <span class="c-kw">def</span> <span class="c-fn">__getitem__</span>(self, idx): <span class="c-kw">return</span> self.values[idx]    <span class="c-cm"># soporta data[0], data[1:3]</span>
    <span class="c-kw">def</span> <span class="c-fn">__setitem__</span>(self, idx, v): self.values[idx] = v
    <span class="c-kw">def</span> <span class="c-fn">__contains__</span>(self, v): <span class="c-kw">return</span> v <span class="c-kw">in</span> self.values   <span class="c-cm"># soporta "x in data"</span>

    <span class="c-cm"># ── Iteración ────────────────────────────────────────────────────</span>
    <span class="c-kw">def</span> <span class="c-fn">__iter__</span>(self):    <span class="c-kw">return</span> <span class="c-bi">iter</span>(self.values)    <span class="c-cm"># for x in data</span>

    <span class="c-cm"># ── Aritmética ───────────────────────────────────────────────────</span>
    <span class="c-kw">def</span> <span class="c-fn">__add__</span>(self, other):
        <span class="c-kw">return</span> SensorData(self.values + other.values)  <span class="c-cm"># data1 + data2</span>

    <span class="c-cm"># ── Context manager ──────────────────────────────────────────────</span>
    <span class="c-kw">def</span> <span class="c-fn">__enter__</span>(self): <span class="c-kw">return</span> self         <span class="c-cm"># with SensorData(...) as d:</span>
    <span class="c-kw">def</span> <span class="c-fn">__exit__</span>(self, exc_type, exc_val, exc_tb):
        self.values.clear()   <span class="c-cm"># cleanup al salir del with</span>
        <span class="c-kw">return</span> <span class="c-kw">False</span>          <span class="c-cm"># False = no suprime excepciones</span>

    <span class="c-cm"># ── Llamable ─────────────────────────────────────────────────────</span>
    <span class="c-kw">def</span> <span class="c-fn">__call__</span>(self, idx: <span class="c-bi">int</span>): <span class="c-kw">return</span> self.values[idx]  <span class="c-cm"># data(0)</span></pre></div>
<div class="alert-card">💡 Regla práctica de entrevista: si defines <code>__eq__</code>, Python <strong>desactiva</strong> el <code>__hash__</code> heredado automáticamente (el objeto deja de ser hasheable) a menos que definas <code>__hash__</code> explícitamente — por eso <code>SensorData</code> define ambos juntos.</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre métodos especiales...</p>
</div>`,

'poo-abstractas': `
<div class="concept-intro">Python ofrece dos formas de definir un "contrato" que otras clases deben cumplir: <strong>ABC</strong> (nominal — la subclase debe heredar explícitamente) y <strong>Protocol</strong> (estructural — le basta con tener los métodos, sin heredar de nada). Son las dos caras de la abstracción en Python moderno.</div>
<table class="kv-table"><tr><th></th><th>ABC (<code>abc.ABC</code>)</th><th>Protocol (<code>typing.Protocol</code>, PEP 544)</th></tr>
<tr><td>Relación requerida</td><td>Herencia explícita (<code>class X(MiABC)</code>)</td><td>Ninguna — solo debe tener los métodos con la firma correcta</td></tr>
<tr><td>Chequeo de tipos</td><td><code>isinstance()</code> siempre funciona</td><td><code>isinstance()</code> solo si se marca <code>@runtime_checkable</code></td></tr>
<tr><td>Instanciación directa</td><td>Bloqueada — <code>TypeError</code> si faltan métodos abstractos</td><td>No aplica — Protocol no se instancia, solo se usa como type hint</td></tr>
<tr><td>Caso de uso típico</td><td>Familias de clases que tú controlas y quieres forzar una interfaz común</td><td>Código de terceros o duck typing donde no quieres imponer una jerarquía</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — ABC, abstractmethod y Protocol</div><pre>
<span class="c-kw">from</span> abc <span class="c-kw">import</span> ABC, abstractmethod
<span class="c-kw">from</span> typing <span class="c-kw">import</span> Protocol, runtime_checkable

<span class="c-cm"># ── ABC clásico — herencia explícita requerida ────────────────────</span>
<span class="c-kw">class</span> <span class="c-fn">Pipeline</span>(ABC):
    <span class="c-dc">@abstractmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">ingest</span>(self, data) -&gt; <span class="c-kw">None</span>: <span class="c-kw">pass</span>

    <span class="c-dc">@abstractmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">validate</span>(self) -&gt; <span class="c-bi">bool</span>: <span class="c-kw">pass</span>

    <span class="c-dc">@abstractmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">export</span>(self, path: str) -&gt; <span class="c-kw">None</span>: <span class="c-kw">pass</span>

    <span class="c-kw">def</span> <span class="c-fn">run</span>(self, data, path: str) -&gt; <span class="c-bi">bool</span>:  <span class="c-cm"># método concreto</span>
        self.ingest(data)
        ok = self.validate()
        <span class="c-kw">if</span> ok: self.export(path)
        <span class="c-kw">return</span> ok

<span class="c-kw">class</span> <span class="c-fn">McapPipeline</span>(Pipeline):   <span class="c-cm"># DEBE implementar los 3 abstractmethods</span>
    <span class="c-kw">def</span> <span class="c-fn">ingest</span>(self, data): <span class="c-kw">pass</span>
    <span class="c-kw">def</span> <span class="c-fn">validate</span>(self): <span class="c-kw">return</span> <span class="c-kw">True</span>
    <span class="c-kw">def</span> <span class="c-fn">export</span>(self, path): <span class="c-kw">pass</span>

<span class="c-cm"># ── Protocol — duck typing estructural (PEP 544) ──────────────────</span>
<span class="c-cm"># No requiere herencia — solo que la clase tenga los métodos</span>
<span class="c-dc">@runtime_checkable</span>
<span class="c-kw">class</span> <span class="c-fn">Closeable</span>(Protocol):
    <span class="c-kw">def</span> <span class="c-fn">close</span>(self) -&gt; <span class="c-kw">None</span>: ...

<span class="c-kw">class</span> <span class="c-fn">FileResource</span>:      <span class="c-cm"># no hereda de Closeable</span>
    <span class="c-kw">def</span> <span class="c-fn">close</span>(self): <span class="c-kw">pass</span>

<span class="c-kw">def</span> <span class="c-fn">release</span>(resource: Closeable) -&gt; <span class="c-kw">None</span>:
    resource.close()

release(FileResource())   <span class="c-cm"># funciona — tiene .close()</span>
<span class="c-bi">isinstance</span>(FileResource(), Closeable)  <span class="c-cm"># True (runtime_checkable)</span></pre></div>
<div class="alert-card">💡 En entrevista: si preguntan "¿cómo forzarías que todas las subclases implementen un método sin dar una implementación por defecto?" — la respuesta es <code>@abstractmethod</code> dentro de una clase que herede de <code>ABC</code>. Sin <code>ABC</code>, Python no impide instanciar una clase con métodos "vacíos".</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Clases Abstractas...</p>
</div>`,

'poo-dataclass': `
<div class="concept-intro">Antes de <code>@dataclass</code>, una clase que solo agrupa datos (sin lógica compleja) obligaba a escribir <code>__init__</code>, <code>__repr__</code> y <code>__eq__</code> a mano — puro boilerplate repetitivo. El decorador <code>@dataclass</code> los genera automáticamente a partir de las anotaciones de tipo de la clase.</div>
<table class="kv-table"><tr><th>Parámetro</th><th>Qué hace</th></tr>
<tr><td><code>frozen=True</code></td><td>Hace la instancia inmutable (no se pueden reasignar atributos después de crearla) — permite usarla como clave de <code>dict</code> o elemento de <code>set</code></td></tr>
<tr><td><code>order=True</code></td><td>Genera <code>__lt__</code>, <code>__le__</code>, <code>__gt__</code>, <code>__ge__</code> comparando los campos en el orden en que se declararon — útil para <code>sorted()</code></td></tr>
<tr><td><code>eq=True</code> (default)</td><td>Genera <code>__eq__</code> comparando todos los campos</td></tr>
<tr><td><code>init=True</code> (default)</td><td>Genera <code>__init__</code> automáticamente a partir de los campos</td></tr>
<tr><td><code>repr=True</code> (default)</td><td>Genera un <code>__repr__</code> legible con todos los campos</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — Dataclasses: todo lo que necesitas</div><pre>
<span class="c-kw">from</span> dataclasses <span class="c-kw">import</span> dataclass, field, asdict, astuple
<span class="c-kw">from</span> typing <span class="c-kw">import</span> ClassVar

<span class="c-dc">@dataclass</span>
<span class="c-kw">class</span> <span class="c-fn">BenchConfig</span>:
    <span class="c-cm"># Campos simples — @dataclass genera __init__, __repr__, __eq__</span>
    bench_id: str
    timeout: <span class="c-bi">int</span> = <span class="c-nb">30</span>
    retries: <span class="c-bi">int</span> = <span class="c-nb">3</span>

    <span class="c-cm"># Campos con factory (para mutables — NUNCA default=[] directamente)</span>
    tags: <span class="c-bi">list</span>[str] = field(default_factory=<span class="c-bi">list</span>)
    metadata: <span class="c-bi">dict</span> = field(default_factory=<span class="c-bi">dict</span>)

    <span class="c-cm"># Campo excluido del __init__ y __repr__</span>
    _internal: str = field(default=<span class="c-st">""</span>, init=<span class="c-kw">False</span>, repr=<span class="c-kw">False</span>)

    <span class="c-cm"># Atributo de clase (no de instancia)</span>
    MAX_TIMEOUT: ClassVar[<span class="c-bi">int</span>] = <span class="c-nb">300</span>

    <span class="c-cm"># __post_init__ — lógica después del __init__ generado</span>
    <span class="c-kw">def</span> <span class="c-fn">__post_init__</span>(self):
        <span class="c-kw">if</span> self.timeout &gt; self.MAX_TIMEOUT:
            <span class="c-kw">raise</span> ValueError(<span class="c-st">f"timeout too large"</span>)
        self._internal = <span class="c-st">f"bench-{self.bench_id.lower()}"</span>

<span class="c-cm"># Variantes de @dataclass</span>
<span class="c-dc">@dataclass</span>(frozen=<span class="c-kw">True</span>)    <span class="c-cm"># inmutable — puede ser key de dict, O(1)</span>
<span class="c-kw">class</span> <span class="c-fn">ImmutablePoint</span>:
    x: <span class="c-bi">float</span>; y: <span class="c-bi">float</span>

<span class="c-dc">@dataclass</span>(order=<span class="c-kw">True</span>)     <span class="c-cm"># genera __lt__, __le__, __gt__, __ge__</span>
<span class="c-kw">class</span> <span class="c-fn">SortableResult</span>:
    priority: <span class="c-bi">int</span>
    name: str

<span class="c-cm"># Conversión</span>
config = BenchConfig(<span class="c-st">"A3"</span>, timeout=<span class="c-nb">60</span>)
asdict(config)    <span class="c-cm"># → dict</span>
astuple(config)   <span class="c-cm"># → tuple</span></pre></div>
<div class="alert-card">💡 <code>tags: list[str] = []</code> directamente en la clase lanza <code>ValueError: mutable default</code> — Python lo prohíbe porque esa <strong>misma lista</strong> se compartiría entre todas las instancias (el clásico bug de "mutable default argument"). <code>field(default_factory=list)</code> crea una lista nueva por cada instancia.</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Dataclasses...</p>
</div>`,

'poo-patrones': `
<div class="concept-intro">Un <strong>design pattern</strong> no es código que se copia y pega: es una solución probada a un problema estructural recurrente. Estos cuatro son los que más aparecen en entrevistas y en código real de automatización/testing.</div>
<div class="tab-group-pypatterns">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pat-1','pypatterns')">Singleton</button>
    <button class="tab-btn" onclick="switchTab(this,'pat-2','pypatterns')">Factory</button>
    <button class="tab-btn" onclick="switchTab(this,'pat-3','pypatterns')">Observer</button>
    <button class="tab-btn" onclick="switchTab(this,'pat-4','pypatterns')">Strategy</button>
  </div>
  <div id="pat-1" class="tab-panel active">
<div class="concept-intro"><strong>Problema que resuelve:</strong> garantizar que una clase tenga como máximo una instancia en toda la aplicación, y dar un punto de acceso global a ella. Útil para recursos que no tiene sentido duplicar: un registro central, una conexión de configuración, un logger.</div>
<div class="code-block"><div class="code-lang">Singleton — una sola instancia</div><pre>
<span class="c-kw">class</span> <span class="c-fn">BenchRegistry</span>:
    <span class="c-cm">"""Solo puede existir un registro de benches en la app."""</span>
    _instance: <span class="c-st">"BenchRegistry | None"</span> = <span class="c-kw">None</span>

    <span class="c-kw">def</span> <span class="c-fn">__new__</span>(cls):
        <span class="c-kw">if</span> cls._instance <span class="c-kw">is None</span>:
            cls._instance = <span class="c-bi">super</span>().__new__(cls)
            cls._instance.benches = {}  <span class="c-cm"># inicializa una sola vez</span>
        <span class="c-kw">return</span> cls._instance

    <span class="c-kw">def</span> <span class="c-fn">register</span>(self, bench_id: str) -&gt; <span class="c-kw">None</span>:
        self.benches[bench_id] = {<span class="c-st">"status"</span>: <span class="c-st">"online"</span>}

<span class="c-cm"># Alternativa más Pythónica: módulo como singleton</span>
<span class="c-cm"># Un módulo se importa una sola vez → sus variables son singletons</span></pre></div>
<div class="alert-card">💡 <code>__new__</code> se ejecuta <strong>antes</strong> que <code>__init__</code> y es el que decide qué objeto se crea (o reutiliza) — por eso el Singleton se implementa ahí: si ya existe una instancia, <code>__new__</code> la devuelve directamente sin crear una nueva.</div>
  </div>
  <div id="pat-2" class="tab-panel">
<div class="concept-intro"><strong>Problema que resuelve:</strong> desacoplar el código que necesita un objeto del código que sabe <em>cómo</em> construirlo. El cliente pide "un validador de tipo frequency" y no necesita saber qué clase concreta existe detrás ni cómo se instancia.</div>
<div class="code-block"><div class="code-lang">Factory Method — crear objetos sin exponer la lógica</div><pre>
<span class="c-kw">class</span> <span class="c-fn">Validator</span>(ABC):
    <span class="c-dc">@abstractmethod</span>
    <span class="c-kw">def</span> <span class="c-fn">validate</span>(self, data) -&gt; <span class="c-bi">bool</span>: <span class="c-kw">pass</span>

<span class="c-kw">class</span> <span class="c-fn">FrequencyValidator</span>(Validator):
    <span class="c-kw">def</span> <span class="c-fn">validate</span>(self, hz) -&gt; <span class="c-bi">bool</span>: <span class="c-kw">return</span> <span class="c-nb">8</span> &lt;= hz &lt;= <span class="c-nb">12</span>

<span class="c-kw">class</span> <span class="c-fn">TimestampValidator</span>(Validator):
    <span class="c-kw">def</span> <span class="c-fn">validate</span>(self, ts) -&gt; <span class="c-bi">bool</span>: <span class="c-kw">return</span> ts &gt; <span class="c-nb">0</span>

<span class="c-cm"># Factory — el cliente no sabe qué clase concreta se crea</span>
<span class="c-kw">def</span> <span class="c-fn">validator_factory</span>(kind: str) -&gt; Validator:
    registry = {
        <span class="c-st">"frequency"</span>:  FrequencyValidator,
        <span class="c-st">"timestamp"</span>:  TimestampValidator,
    }
    cls = registry.get(kind)
    <span class="c-kw">if not</span> cls: <span class="c-kw">raise</span> ValueError(<span class="c-st">f"Unknown validator: {kind}"</span>)
    <span class="c-kw">return</span> cls()

v = validator_factory(<span class="c-st">"frequency"</span>)
v.validate(<span class="c-nb">10.0</span>)  <span class="c-cm"># True</span></pre></div>
  </div>
  <div id="pat-3" class="tab-panel">
<div class="concept-intro"><strong>Problema que resuelve:</strong> notificar automáticamente a múltiples partes interesadas cuando algo sucede, sin que el emisor del evento conozca de antemano quién está escuchando. Es la base de los sistemas de eventos, callbacks y sistemas pub/sub.</div>
<div class="diagram-card">
<svg viewBox="0 0 560 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Patrón Observer: un event bus central recibe la publicación de un evento test_failed y notifica a dos suscriptores, send_alert y update_dashboard, de forma independiente">
  <g font-family="'Segoe UI',sans-serif">
    <rect x="20" y="50" width="160" height="50" rx="7" fill="var(--accent)" fill-opacity="0.85" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="100" y="72" font-size="10" font-weight="700" fill="white" text-anchor="middle">PipelineEventBus</text>
    <text x="100" y="86" font-size="9" fill="white" text-anchor="middle">publish("test_failed")</text>

    <rect x="330" y="10" width="200" height="45" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="430" y="37" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">send_alert(test, bench)</text>

    <rect x="330" y="100" width="200" height="45" rx="7" fill="var(--green-light)" stroke="var(--green)" stroke-width="1.5"/>
    <text x="430" y="127" font-size="10" font-weight="700" fill="var(--green)" text-anchor="middle">update_dashboard(test)</text>

    <g stroke="var(--text-muted)" stroke-width="1.5" fill="var(--text-muted)">
      <line x1="180" y1="70" x2="325" y2="35"/><path d="M318,29 L328,32 L322,41 Z"/>
      <line x1="180" y1="80" x2="325" y2="118"/><path d="M318,124 L328,121 L322,112 Z"/>
    </g>
  </g>
</svg>
<div class="diagram-caption">El event bus no conoce la lógica de <code>send_alert</code> ni de <code>update_dashboard</code> — solo mantiene la lista de suscriptores del evento <code>"test_failed"</code> y los llama a todos cuando alguien publica ese evento.</div>
</div>
<div class="code-block"><div class="code-lang">Observer — notificar a múltiples suscriptores</div><pre>
<span class="c-kw">from</span> typing <span class="c-kw">import</span> Callable

<span class="c-kw">class</span> <span class="c-fn">PipelineEventBus</span>:
    <span class="c-cm">"""Notifica a múltiples handlers cuando ocurre un evento en el pipeline."""</span>
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self):
        self._handlers: <span class="c-bi">dict</span>[str, <span class="c-bi">list</span>[Callable]] = {}

    <span class="c-kw">def</span> <span class="c-fn">subscribe</span>(self, event: str, handler: Callable) -&gt; <span class="c-kw">None</span>:
        self._handlers.setdefault(event, []).append(handler)

    <span class="c-kw">def</span> <span class="c-fn">unsubscribe</span>(self, event: str, handler: Callable) -&gt; <span class="c-kw">None</span>:
        <span class="c-kw">if</span> event <span class="c-kw">in</span> self._handlers:
            self._handlers[event].remove(handler)

    <span class="c-kw">def</span> <span class="c-fn">publish</span>(self, event: str, **data) -&gt; <span class="c-kw">None</span>:
        <span class="c-kw">for</span> handler <span class="c-kw">in</span> self._handlers.get(event, []):
            handler(**data)

<span class="c-cm"># Uso</span>
bus = PipelineEventBus()
bus.subscribe(<span class="c-st">"test_failed"</span>, <span class="c-kw">lambda</span> test, bench: send_alert(test, bench))
bus.subscribe(<span class="c-st">"test_failed"</span>, <span class="c-kw">lambda</span> test, bench: update_dashboard(test))
bus.publish(<span class="c-st">"test_failed"</span>, test=<span class="c-st">"lidar"</span>, bench=<span class="c-st">"A3"</span>)  <span class="c-cm"># notifica a ambos</span></pre></div>
  </div>
  <div id="pat-4" class="tab-panel">
<div class="concept-intro"><strong>Problema que resuelve:</strong> intercambiar un algoritmo (o política de comportamiento) en tiempo de ejecución sin tocar el código que lo usa. En vez de un <code>if/elif</code> gigante para decidir cómo reintentar una conexión, cada estrategia es un objeto intercambiable que cumple la misma interfaz.</div>
<div class="code-block"><div class="code-lang">Strategy — intercambiar algoritmos en runtime</div><pre>
<span class="c-kw">from</span> typing <span class="c-kw">import</span> Protocol

<span class="c-kw">class</span> <span class="c-fn">RetryStrategy</span>(Protocol):
    <span class="c-kw">def</span> <span class="c-fn">should_retry</span>(self, attempt: <span class="c-bi">int</span>, error: <span class="c-bi">Exception</span>) -&gt; <span class="c-bi">bool</span>: ...
    <span class="c-kw">def</span> <span class="c-fn">wait_time</span>(self, attempt: <span class="c-bi">int</span>) -&gt; <span class="c-bi">float</span>: ...

<span class="c-kw">class</span> <span class="c-fn">ExponentialBackoff</span>:
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self, max_retries=<span class="c-nb">5</span>, base=<span class="c-nb">0.5</span>):
        self.max_retries = max_retries; self.base = base
    <span class="c-kw">def</span> <span class="c-fn">should_retry</span>(self, attempt, error): <span class="c-kw">return</span> attempt &lt; self.max_retries
    <span class="c-kw">def</span> <span class="c-fn">wait_time</span>(self, attempt): <span class="c-kw">return</span> self.base * (<span class="c-nb">2</span> ** attempt)

<span class="c-kw">class</span> <span class="c-fn">NoRetry</span>:
    <span class="c-kw">def</span> <span class="c-fn">should_retry</span>(self, attempt, error): <span class="c-kw">return</span> <span class="c-kw">False</span>
    <span class="c-kw">def</span> <span class="c-fn">wait_time</span>(self, attempt): <span class="c-kw">return</span> <span class="c-nb">0</span>

<span class="c-kw">class</span> <span class="c-fn">BenchConnector</span>:
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self, strategy: RetryStrategy = ExponentialBackoff()):
        self.strategy = strategy  <span class="c-cm"># intercambiable en runtime</span>

    <span class="c-kw">def</span> <span class="c-fn">connect</span>(self, bench_id: str):
        <span class="c-kw">for</span> attempt <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">10</span>):
            <span class="c-kw">try</span>: <span class="c-kw">return</span> raw_connect(bench_id)
            <span class="c-kw">except</span> <span class="c-bi">Exception</span> <span class="c-kw">as</span> e:
                <span class="c-kw">if not</span> self.strategy.should_retry(attempt, e): <span class="c-kw">raise</span>
                time.sleep(self.strategy.wait_time(attempt))</pre></div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Design Patterns...</p>
</div>`,

};  // fin PYTHON_RICH2

// ══════════════════════════════════════════════════════════════════
//  PYTHON CHEAT SHEET
// ══════════════════════════════════════════════════════════════════
const PYTHON_RICH3 = {

'py-cheatsheet': `
<div class="tab-group-cs">
  <div class="cs-sticky">
    <div class="tab-bar" style="flex-wrap:wrap;gap:3px;padding-bottom:0">
    <button class="tab-btn active" onclick="switchTab(this,'cs-str','cs')">🔤 Strings</button>
    <button class="tab-btn" onclick="switchTab(this,'cs-lst','cs')">📋 Listas</button>
    <button class="tab-btn" onclick="switchTab(this,'cs-tup','cs')">📦 Tuplas</button>
    <button class="tab-btn" onclick="switchTab(this,'cs-dct','cs')">📖 Dicts</button>
    <button class="tab-btn" onclick="switchTab(this,'cs-set','cs')">🔵 Sets</button>
    <button class="tab-btn" onclick="switchTab(this,'cs-num','cs')">🔢 Números</button>
    <button class="tab-btn" onclick="switchTab(this,'cs-blt','cs')">⚡ Built-ins</button>
    <button class="tab-btn" onclick="switchTab(this,'cs-col','cs')">📦 Collections</button>
    <button class="tab-btn" onclick="switchTab(this,'cs-ops','cs')">➕ Operadores</button>
    <button class="tab-btn" onclick="switchTab(this,'cs-itr','cs')">🔄 itertools</button>
  </div></div><!-- end sticky -->

  <!-- ══ STRINGS ══ -->
  <div id="cs-str" class="tab-panel active cs-section">
    <div class="alert-card" style="margin:8px 0">🔒 <strong>Strings son INMUTABLES</strong> — ningún método las modifica, todos retornan una nueva string. <code>s[0] = 'x'</code> → <b>TypeError</b>.</div>
    <div class="cs-section-title">Creación</div>
    <div class="mini-code">s = "hola"  |  s = 'hola'  |  s = """multi\nlínea"""  |  s = f"hola {var}"  |  s = str(42)  |  s = chr(65) → "A"  |  ord("A") → 65</div>
    ${renderMethodTable('STR')}
    <div class="plan-card"><div class="plan-card-title">f-strings — Formato rápido</div>
    <table class="kv-table">
      <tr><th>Especificador</th><th>¿Qué hace?</th><th>Ejemplo → Resultado</th></tr>
      <tr><td>f"{x:.2f}"</td><td>Float con 2 decimales</td><td>f"{3.14159:.2f}" → "3.14"</td></tr>
      <tr><td>f"{x:d}"</td><td>Entero</td><td>f"{42:05d}" → "00042"</td></tr>
      <tr><td>f"{x:e}"</td><td>Notación científica</td><td>f"{1234:.2e}" → "1.23e+03"</td></tr>
      <tr><td>f"{x:%}"</td><td>Porcentaje</td><td>f"{0.756:.1%}" → "75.6%"</td></tr>
      <tr><td>f"{x:b}"</td><td>Binario</td><td>f"{10:b}" → "1010"</td></tr>
      <tr><td>f"{x:x}"</td><td>Hexadecimal minúscula</td><td>f"{255:x}" → "ff"</td></tr>
      <tr><td>f"{x:X}"</td><td>Hexadecimal mayúscula</td><td>f"{255:X}" → "FF"</td></tr>
      <tr><td>f"{x:#x}"</td><td>Hex con prefijo 0x</td><td>f"{255:#x}" → "0xff"</td></tr>
      <tr><td>f"{x:,}"</td><td>Separador de miles</td><td>f"{1000000:,}" → "1,000,000"</td></tr>
      <tr><td>f"{x:10}"</td><td>Ancho mínimo 10</td><td>f"{'hi':10}" → "hi        "</td></tr>
      <tr><td>f"{x:<10}"</td><td>Alinear izquierda</td><td>f"{'hi':<10}" → "hi        "</td></tr>
      <tr><td>f"{x:>10}"</td><td>Alinear derecha</td><td>f"{'hi':>10}" → "        hi"</td></tr>
      <tr><td>f"{x:^10}"</td><td>Centrar</td><td>f"{'hi':^10}" → "    hi    "</td></tr>
      <tr><td>f"{x=}"</td><td>Debug: nombre=valor</td><td>f"{x=}" → "x=42"</td></tr>
      <tr><td>f"{x!r}"</td><td>Usar repr()</td><td>f"{'hello'!r}" → "'hello'"</td></tr>
      <tr><td>f"{x!s}"</td><td>Usar str()</td><td>f"{obj!s}" → str(obj)</td></tr>
    </table></div>
  </div>

  <!-- ══ LISTAS ══ -->
  <div id="cs-lst" class="tab-panel">
    <div class="plan-card"><div class="plan-card-title">Listas — Mutables · Ordenadas · Duplicados permitidos · Indexadas</div>
      <div class="plan-block"><div class="plan-time">Crear</div><div class="plan-content" style="font-size:.8rem">
        <code>lst = []</code> · <code>lst = [1,2,3]</code> · <code>lst = list(range(5))</code> · <code>lst = list("abc") → ['a','b','c']</code> · <code>lst = [0]*5</code> · <code>lst = [x**2 for x in range(5)]</code>
      </div></div>
      <div class="plan-block"><div class="plan-time">Acceso · Slicing</div><div class="plan-content" style="font-size:.8rem">
        <code>lst[0]</code> primer · <code>lst[-1]</code> último · <code>lst[1:4]</code> índices 1,2,3 · <code>lst[::2]</code> cada 2 · <code>lst[::-1]</code> invertido · <code>lst[-3:]</code> últimos 3 · <code>a,*b,c = lst</code> unpack
      </div></div>
    </div>
    ${renderMethodTable('LST')}
  </div>

  <!-- ══ TUPLAS ══ -->
  <div id="cs-tup" class="tab-panel">
    <div class="plan-card"><div class="plan-card-title">Tuplas — Inmutables · Ordenadas · Más rápidas que listas · Hashables (si elementos son hashables)</div>
      <div class="plan-block"><div class="plan-time">Crear</div><div class="plan-content" style="font-size:.8rem">
        <code>()</code> vacía · <code>(1,)</code> un elemento (la coma es obligatoria) · <code>(1,2,3)</code> · <code>1,2,3</code> paréntesis opcionales · <code>tuple([1,2,3])</code> · <code>tuple("abc") → ('a','b','c')</code>
      </div></div>
    </div>
    ${renderMethodTable('TUP')}
  </div>

  <!-- ══ DICCIONARIOS ══ -->
  <div id="cs-dct" class="tab-panel">
    <div class="plan-card"><div class="plan-card-title">Diccionarios — Mutables · Claves únicas (hashables) · Ordenados por inserción (Python 3.7+)</div>
      <div class="plan-block"><div class="plan-time">Crear</div><div class="plan-content" style="font-size:.8rem">
        <code>{}</code> vacío · <code>{"a":1,"b":2}</code> · <code>dict(a=1,b=2)</code> · <code>dict([("a",1),("b",2)])</code> · <code>dict.fromkeys(["a","b"], 0)</code> → {'a':0,'b':0} · <code>{k:v for k,v in items}</code>
      </div></div>
    </div>
    ${renderMethodTable('DCT')}
  </div>

  <!-- ══ SETS ══ -->
  <div id="cs-set" class="tab-panel">
    <div class="plan-card"><div class="plan-card-title">Sets — Mutables · Sin orden garantizado · Sin duplicados · Elementos deben ser hashables · O(1) membership</div>
      <div class="plan-block"><div class="plan-time">Crear</div><div class="plan-content" style="font-size:.8rem">
        <code>set()</code> vacío (NUNCA {}) · <code>{1,2,3}</code> · <code>set([1,2,2,3]) → {1,2,3}</code> · <code>{x for x in lst}</code> · <code>frozenset({1,2,3})</code> inmutable
      </div></div>
    </div>
    ${renderMethodTable('SET')}
  </div>

  <!-- ══ NÚMEROS ══ -->
  <div id="cs-num" class="tab-panel">
    <table class="kv-table">
      <tr><th>Operación / Función</th><th>¿Qué hace?</th><th>Ejemplo → Resultado</th><th>Nota</th></tr>
      <tr><td>+ - * /</td><td>Suma, resta, mult, división (float)</td><td>7/2 → 3.5</td><td>/ siempre retorna float</td></tr>
      <tr><td>//</td><td>División entera (floor division)</td><td>7//2 → 3</td><td>Trunca hacia -∞</td></tr>
      <tr><td>%</td><td>Módulo (resto)</td><td>7%3 → 1</td><td>Siempre mismo signo que divisor</td></tr>
      <tr><td>**</td><td>Potencia</td><td>2**10 → 1024</td><td>pow(2,10,1000) → con módulo</td></tr>
      <tr><td>abs(x)</td><td>Valor absoluto</td><td>abs(-5) → 5</td><td></td></tr>
      <tr><td>round(x, n)</td><td>Redondea a n decimales</td><td>round(3.14159, 2) → 3.14</td><td>Banker's rounding</td></tr>
      <tr><td>divmod(a, b)</td><td>Retorna (cociente, resto)</td><td>divmod(7,3) → (2,1)</td><td>Equivale a (a//b, a%b)</td></tr>
      <tr><td>pow(x, y, mod)</td><td>x**y % mod eficiente</td><td>pow(2,10,100) → 24</td><td>Más eficiente que (x**y)%mod</td></tr>
      <tr><td>int(x, base)</td><td>Convierte a entero</td><td>int("ff",16) → 255</td><td>int(3.9) → 3 (trunca)</td></tr>
      <tr><td>float(x)</td><td>Convierte a float</td><td>float("3.14") → 3.14</td><td></td></tr>
      <tr><td>bin(n)</td><td>String binario</td><td>bin(10) → "0b1010"</td><td></td></tr>
      <tr><td>oct(n)</td><td>String octal</td><td>oct(8) → "0o10"</td><td></td></tr>
      <tr><td>hex(n)</td><td>String hexadecimal</td><td>hex(255) → "0xff"</td><td></td></tr>
      <tr><td>math.floor(x)</td><td>Redondea hacia abajo</td><td>math.floor(3.9) → 3</td><td></td></tr>
      <tr><td>math.ceil(x)</td><td>Redondea hacia arriba</td><td>math.ceil(3.1) → 4</td><td></td></tr>
      <tr><td>math.sqrt(x)</td><td>Raíz cuadrada</td><td>math.sqrt(16) → 4.0</td><td></td></tr>
      <tr><td>math.log(x, base)</td><td>Logaritmo</td><td>math.log(100,10) → 2.0</td><td>Sin base: ln natural</td></tr>
      <tr><td>math.pi / math.e</td><td>Constantes</td><td>math.pi → 3.14159...</td><td></td></tr>
      <tr><td>math.inf</td><td>Infinito positivo</td><td>float("inf") también funciona</td><td>-math.inf negativo</td></tr>
      <tr><td>math.isnan(x)</td><td>¿Es NaN?</td><td>math.isnan(float("nan")) → True</td><td>nan != nan es True</td></tr>
      <tr><td>x.bit_length()</td><td>Bits necesarios para representar int</td><td>(255).bit_length() → 8</td><td></td></tr>
      <tr><td>x.is_integer()</td><td>¿El float es entero?</td><td>(3.0).is_integer() → True</td><td>Solo en float</td></tr>
      <tr><td>&amp; | ^ ~ &lt;&lt; &gt;&gt;</td><td>Bitwise AND, OR, XOR, NOT, shift izq, shift der</td><td>5 & 3 → 1  5|3 → 7  5^3 → 6</td><td></td></tr>
    </table>
  </div>

  <!-- ══ BUILT-INS ══ -->
  <div id="cs-blt" class="tab-panel">
    <table class="kv-table">
      <tr><th>Función</th><th>¿Qué hace?</th><th>Ejemplo</th><th>Nota</th></tr>
      <tr><td>print(*args, sep, end, file)</td><td>Imprime a stdout</td><td>print("a","b",sep=",") → "a,b"</td><td>end="\n" default</td></tr>
      <tr><td>input(prompt)</td><td>Lee línea de stdin</td><td>x = input("Nombre: ")</td><td>Siempre retorna str</td></tr>
      <tr><td>len(obj)</td><td>Longitud de objeto</td><td>len([1,2,3]) → 3</td><td>O(1) para builtins</td></tr>
      <tr><td>range(start, stop, step)</td><td>Secuencia de enteros (lazy)</td><td>range(0,10,2) → 0,2,4,6,8</td><td>stop es exclusivo</td></tr>
      <tr><td>enumerate(iterable, start=0)</td><td>Pares (índice, valor)</td><td>enumerate(["a","b"],1) → (1,"a"),(2,"b")</td><td></td></tr>
      <tr><td>zip(*iterables)</td><td>Combina iterables en pares</td><td>zip([1,2],["a","b"]) → (1,"a"),(2,"b")</td><td>Se detiene en el más corto</td></tr>
      <tr><td>map(func, iterable)</td><td>Aplica func a cada elemento (lazy)</td><td>list(map(str,[1,2,3])) → ["1","2","3"]</td><td></td></tr>
      <tr><td>filter(func, iterable)</td><td>Filtra por función (lazy)</td><td>list(filter(None,[0,1,2])) → [1,2]</td><td>func=None filtra falsy</td></tr>
      <tr><td>sorted(iterable, key, reverse)</td><td>Lista ordenada (no modifica original)</td><td>sorted(["b","a"],reverse=True) → ["b","a"]</td><td></td></tr>
      <tr><td>reversed(seq)</td><td>Iterator en orden inverso</td><td>list(reversed([1,2,3])) → [3,2,1]</td><td>O(1) crear</td></tr>
      <tr><td>min(*args, key) / max(*args, key)</td><td>Mínimo / máximo</td><td>min([3,1,2]) → 1  min(3,1,2) → 1</td><td>key= para comparación custom</td></tr>
      <tr><td>sum(iterable, start=0)</td><td>Suma</td><td>sum([1,2,3],10) → 16</td><td></td></tr>
      <tr><td>any(iterable)</td><td>¿Algún elemento truthy?</td><td>any([0,1,0]) → True</td><td>Cortocircuito</td></tr>
      <tr><td>all(iterable)</td><td>¿Todos truthy?</td><td>all([1,2,3]) → True</td><td>Cortocircuito</td></tr>
      <tr><td>type(obj)</td><td>Tipo del objeto</td><td>type(42) → &lt;class 'int'&gt;</td><td></td></tr>
      <tr><td>isinstance(obj, types)</td><td>¿Es instancia de?</td><td>isinstance(1,int) → True</td><td>Acepta tupla de tipos</td></tr>
      <tr><td>issubclass(cls, parent)</td><td>¿Es subclase?</td><td>issubclass(bool,int) → True</td><td></td></tr>
      <tr><td>id(obj)</td><td>Identidad (dirección de memoria)</td><td>id(x) → int</td><td></td></tr>
      <tr><td>hash(obj)</td><td>Hash del objeto</td><td>hash("hello") → int</td><td>Solo objetos hashables</td></tr>
      <tr><td>repr(obj)</td><td>Representación oficial (debug)</td><td>repr("hi") → "'hi'"</td><td></td></tr>
      <tr><td>str(obj)</td><td>Representación de usuario</td><td>str(3.14) → "3.14"</td><td></td></tr>
      <tr><td>int(x) / float(x) / bool(x)</td><td>Conversión de tipos</td><td>int("42") → 42</td><td></td></tr>
      <tr><td>list(x) / tuple(x) / set(x) / dict(x)</td><td>Conversión de colecciones</td><td>list("abc") → ['a','b','c']</td><td></td></tr>
      <tr><td>open(path, mode, encoding)</td><td>Abre archivo</td><td>with open("f.txt","r") as f:</td><td></td></tr>
      <tr><td>iter(obj) / next(it, default)</td><td>Crear / avanzar iterator</td><td>it = iter([1,2]); next(it) → 1</td><td></td></tr>
      <tr><td>callable(obj)</td><td>¿Se puede llamar?</td><td>callable(print) → True</td><td></td></tr>
      <tr><td>hasattr(obj, name)</td><td>¿Tiene ese atributo?</td><td>hasattr(lst,"append") → True</td><td></td></tr>
      <tr><td>getattr(obj, name, default)</td><td>Obtiene atributo por nombre</td><td>getattr(obj,"x",None)</td><td></td></tr>
      <tr><td>setattr(obj, name, val)</td><td>Establece atributo por nombre</td><td>setattr(obj,"x",42)</td><td></td></tr>
      <tr><td>delattr(obj, name)</td><td>Elimina atributo</td><td>delattr(obj,"x")</td><td></td></tr>
      <tr><td>dir(obj)</td><td>Lista de atributos y métodos</td><td>dir([]) → [...,'append',...]</td><td></td></tr>
      <tr><td>vars(obj)</td><td>__dict__ del objeto</td><td>vars(obj) → {'x':1,...}</td><td></td></tr>
      <tr><td>format(value, spec)</td><td>Formatea según spec</td><td>format(3.14,".2f") → "3.14"</td><td></td></tr>
      <tr><td>chr(n) / ord(c)</td><td>Int ↔ carácter unicode</td><td>chr(65) → "A" / ord("A") → 65</td><td></td></tr>
      <tr><td>zip_longest (itertools)</td><td>zip pero rellena con fillvalue</td><td>zip_longest([1,2],[a],fillvalue=None)</td><td>import de itertools</td></tr>
    </table>
  </div>

  <!-- ══ COLLECTIONS ══ -->
  <div id="cs-col" class="tab-panel">
    <div class="plan-card"><div class="plan-card-title">collections — Estructuras especializadas</div></div>
    <table class="kv-table">
      <tr><th colspan="4" style="background:#EFF6FF;color:#2563EB;text-align:center">Counter</th></tr>
      <tr><th>Método</th><th>¿Qué hace?</th><th>Ejemplo</th><th>Nota</th></tr>
      <tr><td>Counter(iterable)</td><td>Crea contador de frecuencias</td><td>Counter("aabb") → Counter({'a':2,'b':2})</td><td>Subclase de dict</td></tr>
      <tr><td>most_common(n)</td><td>Top n más frecuentes</td><td>c.most_common(2) → [('a',3),('b',2)]</td><td></td></tr>
      <tr><td>elements()</td><td>Iterator de elementos repetidos</td><td>list(Counter(a=2,b=1).elements()) → ['a','a','b']</td><td></td></tr>
      <tr><td>subtract(iterable)</td><td>Resta conteos</td><td>c.subtract({'a':1})</td><td>Permite negativos</td></tr>
      <tr><td>c1 + c2</td><td>Suma conteos</td><td>Counter(a=1)+Counter(a=2) → Counter(a=3)</td><td></td></tr>
      <tr><td>c1 - c2</td><td>Resta (descarta negativos)</td><td>Counter(a=3)-Counter(a=1) → Counter(a=2)</td><td></td></tr>
      <tr><td>c1 & c2</td><td>Intersección (mínimo)</td><td>Counter(a=3,b=1)&Counter(a=1) → Counter(a=1)</td><td></td></tr>
      <tr><td>c1 | c2</td><td>Unión (máximo)</td><td>Counter(a=1)| Counter(a=3) → Counter(a=3)</td><td></td></tr>
      <tr><th colspan="4" style="background:#EFF6FF;color:#2563EB;text-align:center;padding-top:14px">defaultdict</th></tr>
      <tr><td>defaultdict(int)</td><td>Default 0 al acceder a key nueva</td><td>d["nueva_key"] += 1 — sin KeyError</td><td></td></tr>
      <tr><td>defaultdict(list)</td><td>Default [] para agrupar</td><td>d["grupo"].append(item)</td><td>Patrón más común</td></tr>
      <tr><td>defaultdict(set)</td><td>Default set() vacío</td><td>d["key"].add(item)</td><td></td></tr>
      <tr><td>defaultdict(lambda: X)</td><td>Default custom</td><td>defaultdict(lambda: "N/A")</td><td></td></tr>
      <tr><th colspan="4" style="background:#EFF6FF;color:#2563EB;text-align:center;padding-top:14px">deque</th></tr>
      <tr><td>deque(iterable, maxlen)</td><td>Cola doble con maxlen opcional</td><td>deque([1,2,3], maxlen=5)</td><td>Si maxlen: auto-descarta</td></tr>
      <tr><td>append(x)</td><td>Agrega al lado derecho</td><td>d.append(4)</td><td>O(1)</td></tr>
      <tr><td>appendleft(x)</td><td>Agrega al lado izquierdo</td><td>d.appendleft(0)</td><td>O(1) — ventaja vs list</td></tr>
      <tr><td>pop()</td><td>Elimina del lado derecho</td><td>d.pop()</td><td>O(1)</td></tr>
      <tr><td>popleft()</td><td>Elimina del lado izquierdo</td><td>d.popleft()</td><td>O(1) — vs O(n) en list</td></tr>
      <tr><td>rotate(n)</td><td>Rota n posiciones</td><td>deque([1,2,3]).rotate(1) → deque([3,1,2])</td><td>n positivo: derecha</td></tr>
      <tr><td>extend / extendleft</td><td>Agrega iterable por la derecha/izquierda</td><td>d.extendleft([4,5]) → agrega en orden inverso</td><td></td></tr>
      <tr><th colspan="4" style="background:#EFF6FF;color:#2563EB;text-align:center;padding-top:14px">namedtuple · OrderedDict · ChainMap</th></tr>
      <tr><td>namedtuple(name, fields)</td><td>Tupla con campos nombrados</td><td>Point = namedtuple('Point',['x','y']); p=Point(1,2); p.x → 1</td><td>._asdict() · ._replace()</td></tr>
      <tr><td>OrderedDict</td><td>Dict que recuerda orden inserción (ya innecesario en 3.7+)</td><td>od.move_to_end('key')</td><td>Útil para LRU cache manual</td></tr>
      <tr><td>ChainMap(d1,d2,...)</td><td>Busca en múltiples dicts en orden</td><td>ChainMap(overrides, defaults)['key']</td><td>El primero que tenga la key gana</td></tr>
    </table>
  </div>

  <!-- ══ OPERADORES ══ -->
  <div id="cs-ops" class="tab-panel">
    <table class="kv-table">
      <tr><th>Operador</th><th>Nombre</th><th>Ejemplo → Resultado</th><th>Nota</th></tr>
      <tr><th colspan="4" style="background:#EFF6FF;color:#2563EB;text-align:center">Aritméticos</th></tr>
      <tr><td>+</td><td>Suma / Concatenación</td><td>3+2 → 5 · "a"+"b" → "ab" · [1]+[2] → [1,2]</td><td></td></tr>
      <tr><td>-</td><td>Resta</td><td>5-3 → 2</td><td></td></tr>
      <tr><td>*</td><td>Multiplicación / Repetición</td><td>3*4 → 12 · "ab"*3 → "ababab" · [1]*3 → [1,1,1]</td><td></td></tr>
      <tr><td>/</td><td>División (siempre float)</td><td>7/2 → 3.5</td><td></td></tr>
      <tr><td>//</td><td>División entera (floor)</td><td>7//2 → 3 · -7//2 → -4</td><td>Hacia -∞, no hacia 0</td></tr>
      <tr><td>%</td><td>Módulo (resto)</td><td>7%3 → 1 · -7%3 → 2</td><td>Signo = divisor</td></tr>
      <tr><td>**</td><td>Potencia</td><td>2**8 → 256</td><td>Derecha-asociativo: 2**3**2 = 2**9</td></tr>
      <tr><th colspan="4" style="background:#EFF6FF;color:#2563EB;text-align:center">Comparación</th></tr>
      <tr><td>== / !=</td><td>Igualdad / Desigualdad de valor</td><td>1==1.0 → True · "a"!="b" → True</td><td>== compara valor, not identity</td></tr>
      <tr><td>&lt; / &gt; / &lt;= / &gt;=</td><td>Menor, mayor, menor-igual, mayor-igual</td><td>1 &lt; 2 &lt; 3 → True (chainable)</td><td></td></tr>
      <tr><td>is / is not</td><td>Identidad (mismo objeto en memoria)</td><td>a is b → id(a)==id(b)</td><td>Usar para None: x is None</td></tr>
      <tr><td>in / not in</td><td>Pertenencia</td><td>"a" in "abc" → True · 3 not in [1,2] → True</td><td></td></tr>
      <tr><th colspan="4" style="background:#EFF6FF;color:#2563EB;text-align:center">Lógicos</th></tr>
      <tr><td>and</td><td>AND lógico (cortocircuito)</td><td>True and False → False · 0 and x → 0</td><td>Retorna el primer falsy o el último</td></tr>
      <tr><td>or</td><td>OR lógico (cortocircuito)</td><td>False or 5 → 5 · x or "default"</td><td>Retorna el primer truthy o el último</td></tr>
      <tr><td>not</td><td>Negación</td><td>not True → False · not [] → True</td><td></td></tr>
      <tr><th colspan="4" style="background:#EFF6FF;color:#2563EB;text-align:center">Asignación</th></tr>
      <tr><td>= / += / -= / *= / /= / //= / **= / %= </td><td>Asignación y aumentada</td><td>x += 1 equivale a x = x + 1</td><td></td></tr>
      <tr><td>&amp;= / |= / ^= / &lt;&lt;= / &gt;&gt;=</td><td>Bitwise aumentada</td><td>x &amp;= mask</td><td></td></tr>
      <tr><td>:=</td><td>Walrus (asigna y evalúa)</td><td>while chunk := f.read(8192):</td><td>Python 3.8+</td></tr>
      <tr><th colspan="4" style="background:#EFF6FF;color:#2563EB;text-align:center">Bitwise</th></tr>
      <tr><td>&amp;</td><td>AND bit a bit</td><td>5 &amp; 3 → 1 (0101 &amp; 0011 = 0001)</td><td></td></tr>
      <tr><td>|</td><td>OR bit a bit</td><td>5 | 3 → 7 (0101 | 0011 = 0111)</td><td></td></tr>
      <tr><td>^</td><td>XOR bit a bit</td><td>5 ^ 3 → 6 (0101 ^ 0011 = 0110)</td><td>x^x=0 para swap sin tmp</td></tr>
      <tr><td>~</td><td>NOT bit a bit</td><td>~5 → -6 (equivale a -(x+1))</td><td></td></tr>
      <tr><td>&lt;&lt; / &gt;&gt;</td><td>Shift izquierda / derecha</td><td>1&lt;&lt;3 → 8 · 8&gt;&gt;2 → 2</td><td>x&lt;&lt;n = x*2^n · x&gt;&gt;n = x//2^n</td></tr>
      <tr><th colspan="4" style="background:#EFF6FF;color:#2563EB;text-align:center">Valores Truthy / Falsy</th></tr>
      <tr><td>Falsy</td><td>Evaluán como False en contexto booleano</td><td>0 · 0.0 · "" · [] · () · {} · set() · None · False</td><td></td></tr>
      <tr><td>Truthy</td><td>Todo lo demás</td><td>1 · "hola" · [0] · (None,) · {"":0}</td><td>"False" → True! · [0] → True!</td></tr>
    </table>
  </div>

  <!-- ══ ITERTOOLS ══ -->
  <div id="cs-itr" class="tab-panel">
    <div class="plan-card"><div class="plan-card-title">import itertools — Herramientas para iteración eficiente (todas lazy / O(1) memoria)</div></div>
    <table class="kv-table">
      <tr><th>Función</th><th>¿Qué hace?</th><th>Ejemplo → Resultado</th><th>Uso típico</th></tr>
      <tr><th colspan="4" style="background:#EFF6FF;color:#2563EB;text-align:center">Infinitas</th></tr>
      <tr><td>count(start, step)</td><td>Cuenta infinitamente desde start</td><td>count(10,2) → 10,12,14,...</td><td>Combinar con zip para enumerar</td></tr>
      <tr><td>cycle(iterable)</td><td>Repite el iterable infinitamente</td><td>cycle("AB") → A,B,A,B,...</td><td>Round-robin</td></tr>
      <tr><td>repeat(x, n)</td><td>Repite x n veces (o infinito)</td><td>repeat(3,4) → 3,3,3,3</td><td>Como argumento de map</td></tr>
      <tr><th colspan="4" style="background:#EFF6FF;color:#2563EB;text-align:center">Encadenamiento y selección</th></tr>
      <tr><td>chain(*iterables)</td><td>Une varios iterables en uno</td><td>chain([1,2],[3,4]) → 1,2,3,4</td><td>Reemplaza + para grandes listas</td></tr>
      <tr><td>chain.from_iterable(it)</td><td>Aplana un iterable de iterables</td><td>chain.from_iterable([[1,2],[3]]) → 1,2,3</td><td>Flatten lazy</td></tr>
      <tr><td>islice(it, stop) / islice(it, start, stop, step)</td><td>Slice de iterable (lazy)</td><td>list(islice(range(100),5)) → [0,1,2,3,4]</td><td>Sin crear lista completa</td></tr>
      <tr><td>compress(data, selectors)</td><td>Filtra data donde selector=True</td><td>compress("ABCD",[1,0,1,0]) → A,C</td><td>Máscara booleana</td></tr>
      <tr><td>takewhile(pred, it)</td><td>Toma mientras pred sea True</td><td>takewhile(lambda x:x&lt;5, [1,3,5,2]) → 1,3</td><td>Para hasta primera falla</td></tr>
      <tr><td>dropwhile(pred, it)</td><td>Descarta mientras pred sea True</td><td>dropwhile(lambda x:x&lt;5, [1,3,5,2]) → 5,2</td><td>Salta cabecera</td></tr>
      <tr><td>filterfalse(pred, it)</td><td>Filtra donde pred=False</td><td>filterfalse(lambda x:x%2,[1,2,3,4]) → 2,4</td><td>Inverso de filter</td></tr>
      <tr><th colspan="4" style="background:#EFF6FF;color:#2563EB;text-align:center">Agrupación y transformación</th></tr>
      <tr><td>groupby(it, key)</td><td>Agrupa elementos consecutivos iguales</td><td>groupby([1,1,2,2],lambda x:x) → (1,[1,1]),(2,[2,2])</td><td>Requiere sorted primero</td></tr>
      <tr><td>accumulate(it, func)</td><td>Acumula (running total)</td><td>list(accumulate([1,2,3,4])) → [1,3,6,10]</td><td>func default: suma</td></tr>
      <tr><td>starmap(func, it)</td><td>Como map pero desempaca args</td><td>starmap(pow,[(2,3),(3,2)]) → 8,9</td><td></td></tr>
      <tr><td>pairwise(it)</td><td>Pares consecutivos (Python 3.10+)</td><td>pairwise([1,2,3,4]) → (1,2),(2,3),(3,4)</td><td>Para diferencias entre consecutivos</td></tr>
      <tr><td>zip_longest(*its, fillvalue)</td><td>zip que rellena con fillvalue</td><td>zip_longest([1,2],[a],fillvalue=None) → (1,a),(2,None)</td><td></td></tr>
      <tr><th colspan="4" style="background:#EFF6FF;color:#2563EB;text-align:center">Combinatorias</th></tr>
      <tr><td>product(*iterables, repeat)</td><td>Producto cartesiano</td><td>product("AB","12") → A1,A2,B1,B2</td><td>Todas las combinaciones</td></tr>
      <tr><td>permutations(it, r)</td><td>Permutaciones de longitud r</td><td>permutations("AB",2) → AB,BA</td><td>Orden importa, sin repetición</td></tr>
      <tr><td>combinations(it, r)</td><td>Combinaciones de longitud r</td><td>combinations("ABC",2) → AB,AC,BC</td><td>Orden no importa, sin repetición</td></tr>
      <tr><td>combinations_with_replacement(it,r)</td><td>Con repetición</td><td>combinations_with_replacement("AB",2) → AA,AB,BB</td><td></td></tr>
    </table>
  </div>

</div><!-- end tab-group-cs -->`,

};  // fin PYTHON_RICH3
