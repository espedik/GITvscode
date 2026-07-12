// ══════════════════════════════════════════════════════════════════
//  PYTHON RICH CONTENT — Fundamentos
// ══════════════════════════════════════════════════════════════════
const PYTHON_RICH = {

'py-for': `
<div class="tab-group-pyfor">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pf-1','pyfor')">for / while</button>
    <button class="tab-btn" onclick="switchTab(this,'pf-2','pyfor')">if / elif / else</button>
    <button class="tab-btn" onclick="switchTab(this,'pf-3','pyfor')">Trucos avanzados</button>
    <button class="tab-btn" onclick="switchTab(this,'pf-4','pyfor')">Gotchas</button>
  </div>
  <div id="pf-1" class="tab-panel active">
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
    process(chunk)</pre></div>
  </div>
  <div id="pf-2" class="tab-panel">
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
handler()</pre></div>
  </div>
  <div id="pf-3" class="tab-panel">
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
    gap = t2 - t1</pre></div>
  </div>
  <div id="pf-4" class="tab-panel">
    <div class="plan-card"><div class="plan-card-title">⚠️ Gotchas comunes — errores típicos en entrevista</div>
      <div class="plan-block"><div class="plan-time">Trampa 1</div><div class="plan-content"><h4>Modificar una lista mientras la iteras</h4><p>Nunca hagas <code>for x in lista: lista.remove(x)</code>. Salta elementos porque el índice avanza pero la lista se encoge. Solución: itera sobre una copia: <code>for x in lista[:]:</code> o usa list comprehension.</p></div></div>
      <div class="plan-block"><div class="plan-time">Trampa 2</div><div class="plan-content"><h4>range vs list — range es lazy</h4><p><code>range(1000000)</code> no crea un millón de números en memoria. Es un objeto que genera los valores al iterar. Nunca hagas <code>list(range(1000000))</code> si solo vas a iterar.</p></div></div>
      <div class="plan-block"><div class="plan-time">Trampa 3</div><div class="plan-content"><h4>for-else es contraintuitivo</h4><p>El <code>else</code> de un for/while NO es "si el loop no corrió". Es "si el loop terminó sin break". Pregunta frecuente de entrevista.</p></div></div>
    </div>
    <div class="quiz-section"><div class="quiz-title">Quiz</div>
      <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Gotcha</span>¿Cuál es la salida de: <code>for i in range(3): pass</code>, ¿cuánto vale i después?<span class="q-arr">▶</span></div><div class="quiz-a"><b>i = 2.</b> La variable del loop persiste después del loop en Python. No se destruye como en otros lenguajes. Esto puede causar bugs si reutilizas el nombre.</div></div>
      <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Diferencia</span>¿Diferencia entre break y continue?<span class="q-arr">▶</span></div><div class="quiz-a"><b>break</b>: termina el loop completamente. <b>continue</b>: salta a la siguiente iteración. Con break el else del loop NO se ejecuta. Con continue sí puede ejecutarse el else.</div></div>
    </div>
  </div>
</div>`,

'py-comprehensions': `
<div class="tab-group-pycomp">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pc-1','pycomp')">List Comp</button>
    <button class="tab-btn" onclick="switchTab(this,'pc-2','pycomp')">Dict / Set Comp</button>
    <button class="tab-btn" onclick="switchTab(this,'pc-3','pycomp')">Generator Expr</button>
    <button class="tab-btn" onclick="switchTab(this,'pc-4','pycomp')">Cuándo NO usarlas</button>
  </div>
  <div id="pc-1" class="tab-panel active">
<div class="code-block"><div class="code-lang">Python — List Comprehension: todas las formas</div><pre>
<span class="c-cm"># Sintaxis: [expresión for item in iterable if condición]</span>

<span class="c-cm"># 1. Simple</span>
cuadrados = [x**<span class="c-nb">2</span> <span class="c-kw">for</span> x <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">10</span>)]

<span class="c-cm"># 2. Con filtro</span>
pares = [x <span class="c-kw">for</span> x <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">20</span>) <span class="c-kw">if</span> x % <span class="c-nb">2</span> == <span class="c-nb">0</span>]

<span class="c-cm"># 3. Transformación de strings (muy útil para logs)</span>
clean_lines = [line.strip().lower() <span class="c-kw">for</span> line <span class="c-kw">in</span> raw_log <span class="c-kw">if</span> line.strip()]

<span class="c-cm"># 4. Anidado — CUIDADO: el orden es el mismo que en for anidado</span>
<span class="c-cm"># [expr for x in outer for y in inner]  ←→</span>
<span class="c-cm"># for x in outer: for y in inner: expr</span>
coords = [(x, y) <span class="c-kw">for</span> x <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">3</span>) <span class="c-kw">for</span> y <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">3</span>)]

<span class="c-cm"># 5. Aplanar lista de listas (flatten)</span>
flat = [item <span class="c-kw">for</span> sublist <span class="c-kw">in</span> matrix <span class="c-kw">for</span> item <span class="c-kw">in</span> sublist]

<span class="c-cm"># 6. Con función (ternario en la expresión)</span>
labels = [<span class="c-st">"PASS"</span> <span class="c-kw">if</span> r == <span class="c-nb">0</span> <span class="c-kw">else</span> <span class="c-st">"FAIL"</span> <span class="c-kw">for</span> r <span class="c-kw">in</span> results]

<span class="c-cm"># 7. Walrus para evitar doble cómputo</span>
processed = [y <span class="c-kw">for</span> x <span class="c-kw">in</span> data <span class="c-kw">if</span> (y := expensive(x)) <span class="c-kw">is not None</span>]</pre></div>
  </div>
  <div id="pc-2" class="tab-panel">
<div class="code-block"><div class="code-lang">Python — Dict y Set comprehensions</div><pre>
<span class="c-cm"># Dict comprehension: {key: value for ...}</span>
error_freq = {err: count <span class="c-kw">for</span> err, count <span class="c-kw">in</span> error_list <span class="c-kw">if</span> count &gt; <span class="c-nb">5</span>}

<span class="c-cm"># Invertir un dict (key↔value)</span>
inv = {v: k <span class="c-kw">for</span> k, v <span class="c-kw">in</span> original.items()}

<span class="c-cm"># Agrupar por primera letra</span>
grouped = {k: [w <span class="c-kw">for</span> w <span class="c-kw">in</span> words <span class="c-kw">if</span> w[<span class="c-nb">0</span>] == k]
           <span class="c-kw">for</span> k <span class="c-kw">in</span> <span class="c-bi">set</span>(w[<span class="c-nb">0</span>] <span class="c-kw">for</span> w <span class="c-kw">in</span> words)}

<span class="c-cm"># Merge de dicts (Python 3.9+)</span>
merged = dict_a | dict_b   <span class="c-cm"># b gana en conflicto</span>

<span class="c-cm"># Set comprehension: {expr for ...}</span>
unique_benches = {event[<span class="c-st">'bench'</span>] <span class="c-kw">for</span> event <span class="c-kw">in</span> events}

<span class="c-cm"># Diferencia entre set comp y frozenset</span>
immutable = <span class="c-bi">frozenset</span>({x**<span class="c-nb">2</span> <span class="c-kw">for</span> x <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">5</span>)})  <span class="c-cm"># hashable, usable como key</span></pre></div>
  </div>
  <div id="pc-3" class="tab-panel">
<div class="code-block"><div class="code-lang">Python — Generator expressions (perezosas, ahorran memoria)</div><pre>
<span class="c-cm"># () en vez de [] → no crea la lista en memoria</span>
gen = (x**<span class="c-nb">2</span> <span class="c-kw">for</span> x <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">1_000_000</span>))  <span class="c-cm"># ocupa ~112 bytes, no 8 MB</span>

<span class="c-cm"># Perfecto para pasar a funciones que aceptan iterables</span>
total  = <span class="c-bi">sum</span>(x**<span class="c-nb">2</span> <span class="c-kw">for</span> x <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">1000</span>))
any_gt = <span class="c-bi">any</span>(x &gt; <span class="c-nb">100</span> <span class="c-kw">for</span> x <span class="c-kw">in</span> data)   <span class="c-cm"># cortocircuito: para al primer True</span>
all_ok = <span class="c-bi">all</span>(x &gt; <span class="c-nb">0</span> <span class="c-kw">for</span> x <span class="c-kw">in</span> data)   <span class="c-cm"># cortocircuito: para al primer False</span>

<span class="c-cm"># Procesamiento de archivo línea a línea sin cargar todo en RAM</span>
error_lines = <span class="c-bi">sum</span>(<span class="c-nb">1</span> <span class="c-kw">for</span> line <span class="c-kw">in</span> <span class="c-bi">open</span>(<span class="c-st">'big.log'</span>) <span class="c-kw">if</span> <span class="c-st">'ERROR'</span> <span class="c-kw">in</span> line)

<span class="c-cm"># DIFERENCIA CLAVE: list comp crea todo de golpe, gen expr es lazy</span>
lista = [f(x) <span class="c-kw">for</span> x <span class="c-kw">in</span> data]   <span class="c-cm"># O(n) memoria ahora</span>
gen   = (f(x) <span class="c-kw">for</span> x <span class="c-kw">in</span> data)   <span class="c-cm"># O(1) memoria, computa al pedir</span></pre></div>
  </div>
  <div id="pc-4" class="tab-panel">
    <div class="plan-card"><div class="plan-card-title">Cuándo NO usar comprehensions</div>
      <div class="plan-block"><div class="plan-time">Demasiado compleja</div><div class="plan-content"><h4>Si necesitas más de 2 condiciones o 2 for, usa un loop normal</h4><p>La legibilidad importa más que la brevedad. Una comprehension de 3 líneas anidada es más difícil de debuggear que 5 líneas de loop claro.</p></div></div>
      <div class="plan-block"><div class="plan-time">Side effects</div><div class="plan-content"><h4>Nunca uses comprehension solo por sus side effects</h4><p>Mal: <code>[print(x) for x in lista]</code>. Bien: <code>for x in lista: print(x)</code>. Las comprehensions son para crear colecciones, no para ejecutar acciones.</p></div></div>
      <div class="plan-block"><div class="plan-time">Listas grandes en memoria</div><div class="plan-content"><h4>Si solo vas a iterar una vez, usa generator expression</h4><p><code>sum(x**2 for x in range(1M))</code> vs <code>sum([x**2 for x in range(1M)])</code>. El primero usa O(1) memoria, el segundo O(n).</p></div></div>
    </div>
  </div>
</div>`,

'py-listas': `
<div class="plan-card"><div class="plan-card-title">📋 Listas — referencia completa de métodos</div>
<table class="kv-table">
<tr><th>Método</th><th>Qué hace</th><th>Complejidad</th><th>Ejemplo</th></tr>
<tr><td>append(x)</td><td>Agrega al final</td><td><span class="badge badge-grn">O(1)</span></td><td>lst.append(5)</td></tr>
<tr><td>extend(iterable)</td><td>Agrega todos los elementos</td><td><span class="badge badge-ylw">O(k)</span></td><td>lst.extend([1,2,3])</td></tr>
<tr><td>insert(i, x)</td><td>Inserta en posición i</td><td><span class="badge badge-red">O(n)</span></td><td>lst.insert(0, 'x')</td></tr>
<tr><td>remove(x)</td><td>Elimina primera ocurrencia de x</td><td><span class="badge badge-red">O(n)</span></td><td>lst.remove('a')</td></tr>
<tr><td>pop(i=-1)</td><td>Elimina y retorna elemento</td><td>O(1) final, O(n) medio</td><td>lst.pop() / lst.pop(0)</td></tr>
<tr><td>index(x)</td><td>Índice de primera ocurrencia</td><td><span class="badge badge-red">O(n)</span></td><td>lst.index('a')</td></tr>
<tr><td>count(x)</td><td>Cuenta ocurrencias de x</td><td><span class="badge badge-red">O(n)</span></td><td>lst.count(3)</td></tr>
<tr><td>sort(key, reverse)</td><td>Ordena in-place</td><td><span class="badge badge-ylw">O(n log n)</span></td><td>lst.sort(key=len)</td></tr>
<tr><td>reverse()</td><td>Invierte in-place</td><td><span class="badge badge-ylw">O(n)</span></td><td>lst.reverse()</td></tr>
<tr><td>copy()</td><td>Shallow copy</td><td><span class="badge badge-ylw">O(n)</span></td><td>copia = lst.copy()</td></tr>
<tr><td>clear()</td><td>Vacía la lista</td><td><span class="badge badge-grn">O(1)</span></td><td>lst.clear()</td></tr>
</table></div>
<div class="code-block"><div class="code-lang">Python — Slicing y operaciones avanzadas</div><pre>
lst = [<span class="c-nb">0</span>,<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>,<span class="c-nb">4</span>,<span class="c-nb">5</span>]

<span class="c-cm"># Slicing: lst[start:stop:step] — stop EXCLUSIVO</span>
lst[<span class="c-nb">1</span>:<span class="c-nb">4</span>]    <span class="c-cm"># [1, 2, 3]</span>
lst[::<span class="c-nb">2</span>]   <span class="c-cm"># [0, 2, 4] — cada 2</span>
lst[::-<span class="c-nb">1</span>]  <span class="c-cm"># [5, 4, 3, 2, 1, 0] — invertir</span>
lst[-<span class="c-nb">3</span>:]   <span class="c-cm"># [3, 4, 5] — últimos 3</span>
lst[:<span class="c-nb">3</span>]    <span class="c-cm"># [0, 1, 2] — primeros 3</span>

<span class="c-cm"># Copiar con slice (shallow)</span>
copia = lst[:]   <span class="c-cm"># equivale a lst.copy()</span>

<span class="c-cm"># Reemplazar rango con slice assignment</span>
lst[<span class="c-nb">1</span>:<span class="c-nb">3</span>] = [<span class="c-nb">10</span>, <span class="c-nb">20</span>, <span class="c-nb">30</span>]   <span class="c-cm"># puede cambiar el tamaño</span>

<span class="c-cm"># sorted() vs sort() — sorted crea nueva lista, sort modifica in-place</span>
nueva = <span class="c-bi">sorted</span>(lst, key=<span class="c-kw">lambda</span> x: -x)  <span class="c-cm"># descendente, lst no cambia</span>
lst.sort(reverse=<span class="c-kw">True</span>)                  <span class="c-cm"># modifica lst</span>

<span class="c-cm"># Desempaquetar</span>
a, *middle, z = [<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>,<span class="c-nb">4</span>,<span class="c-nb">5</span>]  <span class="c-cm"># a=1, middle=[2,3,4], z=5</span>

<span class="c-cm"># Multiplicación (ojo con objetos mutables)</span>
zeros = [<span class="c-nb">0</span>] * <span class="c-nb">10</span>           <span class="c-cm"># [0,0,...,0]  ✓ para inmutables</span>
<span class="c-cm"># TRAMPA: [[0]*3]*3 crea 3 referencias a la MISMA lista interna</span>
matrix = [[<span class="c-nb">0</span>]*<span class="c-nb">3</span> <span class="c-kw">for</span> _ <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">3</span>)]  <span class="c-cm"># correcto: 3 listas independientes</span></pre></div>
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Complejidad</span>¿Por qué pop(0) es O(n) pero pop() es O(1)?<span class="q-arr">▶</span></div><div class="quiz-a">Las listas en Python son arrays dinámicos. Al hacer pop(0), todos los n-1 elementos restantes deben moverse una posición hacia la izquierda → O(n). Al hacer pop() (del final), ningún elemento se mueve → O(1). Si necesitas pops frecuentes del frente, usa <code>collections.deque</code>.</div></div>
</div>`,

'py-tuplas': `
<div class="code-block"><div class="code-lang">Python — Tuplas: todo lo que necesitas saber</div><pre>
<span class="c-cm"># Crear tuplas</span>
t = (<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>)
t = <span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>       <span class="c-cm"># los paréntesis son opcionales</span>
t = (<span class="c-nb">1</span>,)             <span class="c-cm"># TRAMPA: tupla de un elemento necesita la coma</span>
t = <span class="c-bi">tuple</span>([<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>]) <span class="c-cm"># desde lista</span>

<span class="c-cm"># Unpacking — muy Pythónico</span>
x, y, z = (<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>)
a, *rest = (<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>, <span class="c-nb">4</span>)   <span class="c-cm"># a=1, rest=[2,3,4]</span>
_, second, *_ = (<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>, <span class="c-nb">4</span>)  <span class="c-cm"># solo me importa el segundo</span>

<span class="c-cm"># Swap sin variable temporal</span>
a, b = b, a   <span class="c-cm"># Python crea tupla (b, a) y desempaca</span>

<span class="c-cm"># Named tuple — tupla con campos nombrados (mejor que índices)</span>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> namedtuple
SensorReading = namedtuple(<span class="c-st">'SensorReading'</span>, [<span class="c-st">'timestamp'</span>, <span class="c-st">'value'</span>, <span class="c-st">'unit'</span>])
r = SensorReading(<span class="c-nb">1720000000.0</span>, <span class="c-nb">36.5</span>, <span class="c-st">'celsius'</span>)
<span class="c-bi">print</span>(r.value)     <span class="c-cm"># 36.5  ← más claro que r[1]</span>
<span class="c-bi">print</span>(r._asdict()) <span class="c-cm"># {'timestamp': ..., 'value': 36.5, 'unit': 'celsius'}</span>

<span class="c-cm"># Tuplas como keys de dict (porque son hashables)</span>
cache = {}
cache[(<span class="c-st">'bench_a3'</span>, <span class="c-st">'test_lidar'</span>)] = <span class="c-st">'PASSED'</span>

<span class="c-cm"># Ventaja sobre lista: más rápidas, usan menos memoria, semántica de inmutabilidad</span>
<span class="c-kw">import</span> sys
<span class="c-bi">print</span>(sys.getsizeof((<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>)))  <span class="c-cm"># 64 bytes</span>
<span class="c-bi">print</span>(sys.getsizeof([<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>]))  <span class="c-cm"># 88 bytes</span>

<span class="c-cm"># Métodos — solo count() e index() (sin mutación)</span>
(<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>).count(<span class="c-nb">2</span>)   <span class="c-cm"># 2</span>
(<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>).index(<span class="c-nb">2</span>)     <span class="c-cm"># 1</span></pre></div>
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿Una tupla es siempre inmutable?<span class="q-arr">▶</span></div><div class="quiz-a"><b>La tupla en sí es inmutable, pero puede contener objetos mutables.</b><br><code>t = ([1,2], [3,4])<br>t[0].append(99)  # t = ([1,2,99], [3,4]) — ¡modificó!</code><br><br>La tupla no cambió (t[0] sigue siendo la misma lista), pero el contenido de esa lista sí. Por eso las tuplas con mutables NO son hashables y no pueden ser keys de dict.</div></div>
</div>`,

'py-dicts': `
<div class="tab-group-pydicts">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pd-1','pydicts')">Métodos esenciales</button>
    <button class="tab-btn" onclick="switchTab(this,'pd-2','pydicts')">defaultdict / Counter</button>
    <button class="tab-btn" onclick="switchTab(this,'pd-3','pydicts')">Patrones avanzados</button>
  </div>
  <div id="pd-1" class="tab-panel active">
<table class="kv-table"><tr><th>Método</th><th>Qué hace</th><th>Nota</th></tr>
<tr><td>d[key]</td><td>Acceso — lanza KeyError si no existe</td><td>Usa get() para acceso seguro</td></tr>
<tr><td>d.get(k, default)</td><td>Acceso seguro con default</td><td>default=None si se omite</td></tr>
<tr><td>d.setdefault(k, v)</td><td>Inserta v si k no existe, retorna valor</td><td>Útil para inicializar</td></tr>
<tr><td>d.keys()</td><td>Vista de claves</td><td>Es una vista, no copia</td></tr>
<tr><td>d.values()</td><td>Vista de valores</td><td>Es una vista, no copia</td></tr>
<tr><td>d.items()</td><td>Vista de pares (k, v)</td><td>Usar en for k, v in d.items()</td></tr>
<tr><td>d.pop(k, default)</td><td>Elimina y retorna</td><td>Sin default → KeyError si no existe</td></tr>
<tr><td>d.update(otro)</td><td>Merge in-place (otro gana)</td><td>También acepta kwargs</td></tr>
<tr><td>k in d</td><td>Membership test</td><td>O(1) — busca en keys</td></tr>
<tr><td>d | d2</td><td>Merge (Python 3.9+)</td><td>Crea nuevo dict, d2 gana</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — Iteración y manipulación de dicts</div><pre>
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
inv = {v: k <span class="c-kw">for</span> k, v <span class="c-kw">in</span> d.items()}</pre></div>
  </div>
  <div id="pd-2" class="tab-panel">
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
c1 - c2   <span class="c-cm"># Counter({'a':1,'b':1,'c':1})  — resta</span>
c1 + c2   <span class="c-cm"># suma</span>
c1 &amp; c2   <span class="c-cm"># intersección (mínimo)</span>
c1 | c2   <span class="c-cm"># unión (máximo)</span></pre></div>
  </div>
  <div id="pd-3" class="tab-panel">
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

<span class="c-cm"># ChainMap — busca en múltiples dicts en orden</span>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> ChainMap
defaults = {<span class="c-st">'timeout'</span>: <span class="c-nb">30</span>, <span class="c-st">'retries'</span>: <span class="c-nb">3</span>}
overrides = {<span class="c-st">'timeout'</span>: <span class="c-nb">60</span>}
config = ChainMap(overrides, defaults)
config[<span class="c-st">'timeout'</span>]   <span class="c-cm"># 60 (del override)</span>
config[<span class="c-st">'retries'</span>]   <span class="c-cm"># 3 (del default)</span></pre></div>
  </div>
</div>`,

'py-sets': `
<div class="code-block"><div class="code-lang">Python — Sets: operaciones y usos</div><pre>
<span class="c-cm"># Crear sets</span>
s = {<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>}
s = <span class="c-bi">set</span>([<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>])    <span class="c-cm"># deduplicación automática → {1, 2, 3}</span>
s = <span class="c-bi">set</span>()               <span class="c-cm"># TRAMPA: {} crea dict vacío, no set</span>

<span class="c-cm"># Operaciones matemáticas — O(min(len(s),len(t)))</span>
a = {<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>, <span class="c-nb">4</span>}
b = {<span class="c-nb">3</span>, <span class="c-nb">4</span>, <span class="c-nb">5</span>, <span class="c-nb">6</span>}

a | b     <span class="c-cm"># {1,2,3,4,5,6}   unión      — a.union(b)</span>
a &amp; b     <span class="c-cm"># {3, 4}          intersección — a.intersection(b)</span>
a - b     <span class="c-cm"># {1, 2}          diferencia   — a.difference(b)</span>
a ^ b     <span class="c-cm"># {1,2,5,6}       diferencia simétrica — a.symmetric_difference(b)</span>
a &lt;= b    <span class="c-cm"># False           a es subconjunto de b?</span>
a &gt;= b    <span class="c-cm"># False           a es superconjunto de b?</span>

<span class="c-cm"># Membership test — O(1) vs O(n) en lista</span>
<span class="c-nb">5</span> <span class="c-kw">in</span> a            <span class="c-cm"># False — O(1)</span>
<span class="c-nb">5</span> <span class="c-kw">in</span> [<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>,<span class="c-nb">4</span>]   <span class="c-cm"># False — O(n)</span>

<span class="c-cm"># Métodos de mutación</span>
s.add(<span class="c-nb">5</span>)           <span class="c-cm"># agrega elemento</span>
s.discard(<span class="c-nb">5</span>)       <span class="c-cm"># elimina sin error si no existe (diferente a remove)</span>
s.remove(<span class="c-nb">5</span>)        <span class="c-cm"># elimina, KeyError si no existe</span>
s.update({<span class="c-nb">6</span>,<span class="c-nb">7</span>})    <span class="c-cm"># agrega múltiples</span>
s.clear()           <span class="c-cm"># vacía el set</span>

<span class="c-cm"># frozenset — hashable, usable como key de dict</span>
fs = <span class="c-bi">frozenset</span>({<span class="c-nb">1</span>, <span class="c-nb">2</span>, <span class="c-nb">3</span>})
config_cache = {<span class="c-bi">frozenset</span>({<span class="c-st">'debug'</span>,<span class="c-st">'hil'</span>}): <span class="c-st">'config_A'</span>}

<span class="c-cm"># Caso práctico: deduplicar tests fallidos de múltiples benches</span>
bench_a_fails = {<span class="c-st">'test_lidar'</span>, <span class="c-st">'test_can'</span>, <span class="c-st">'test_imu'</span>}
bench_b_fails = {<span class="c-st">'test_can'</span>, <span class="c-st">'test_eth'</span>}
all_unique_fails = bench_a_fails | bench_b_fails  <span class="c-cm"># {'test_lidar','test_can','test_imu','test_eth'}</span>
only_in_a       = bench_a_fails - bench_b_fails   <span class="c-cm"># {'test_lidar','test_imu'}</span>
both_fail       = bench_a_fails &amp; bench_b_fails   <span class="c-cm"># {'test_can'}</span></pre></div>
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Velocidad</span>Tienes 1 millón de IDs. ¿Qué usas para buscar si un ID está en la colección?<span class="q-arr">▶</span></div><div class="quiz-a"><b>set</b>. La búsqueda en un set es O(1) en promedio (tabla hash interna). En una lista es O(n). Con 1M elementos, la diferencia es 1M operaciones vs 1. Si los IDs no cambian, también puedes usar <code>frozenset</code> que es ligeramente más eficiente.</div></div>
</div>`,

'py-strings': `
<div class="tab-group-pystr">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ps-1','pystr')">Métodos</button>
    <button class="tab-btn" onclick="switchTab(this,'ps-2','pystr')">f-strings</button>
    <button class="tab-btn" onclick="switchTab(this,'ps-3','pystr')">Parsing</button>
  </div>
  <div id="ps-1" class="tab-panel active">
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
<tr><td>partition(sep)</td><td>Divide en 3: antes, sep, después</td><td>"a:b".partition(":") → ("a",":",b")</td></tr>
</table>
  </div>
  <div id="ps-2" class="tab-panel">
<div class="code-block"><div class="code-lang">Python — f-strings: todas las formas</div><pre>
name = <span class="c-st">"Wayve"</span>; val = <span class="c-nb">3.14159</span>; items = [<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>]

<span class="c-cm"># Básico</span>
<span class="c-bi">print</span>(<span class="c-st">f"Empresa: {name}"</span>)

<span class="c-cm"># Expresiones dentro</span>
<span class="c-bi">print</span>(<span class="c-st">f"Doble: {val * 2}"</span>)
<span class="c-bi">print</span>(<span class="c-st">f"Upper: {name.upper()}"</span>)

<span class="c-cm"># Formato de números</span>
<span class="c-bi">print</span>(<span class="c-st">f"{val:.2f}"</span>)         <span class="c-cm"># "3.14"       — 2 decimales</span>
<span class="c-bi">print</span>(<span class="c-st">f"{val:10.3f}"</span>)      <span class="c-cm"># "     3.142"  — ancho 10, 3 decimales</span>
<span class="c-bi">print</span>(<span class="c-st">f"{1000000:,}"</span>)      <span class="c-cm"># "1,000,000"  — separador de miles</span>
<span class="c-bi">print</span>(<span class="c-st">f"{255:#x}"</span>)         <span class="c-cm"># "0xff"       — hex con prefijo</span>
<span class="c-bi">print</span>(<span class="c-st">f"{0.756:.1%}"</span>)      <span class="c-cm"># "75.6%"      — porcentaje</span>

<span class="c-cm"># Alineación</span>
<span class="c-bi">print</span>(<span class="c-st">f"{'left':<span class="c-nb">10</span>}"</span>)      <span class="c-cm"># "left      "  — alinea izquierda</span>
<span class="c-bi">print</span>(<span class="c-st">f"{'right':&gt;<span class="c-nb">10</span>}"</span>)     <span class="c-cm"># "     right"  — alinea derecha</span>
<span class="c-bi">print</span>(<span class="c-st">f"{'center':^<span class="c-nb">10</span>}"</span>)   <span class="c-cm"># "  center  "  — centrado</span>

<span class="c-cm"># Debug (Python 3.8+) — muestra nombre y valor</span>
x = <span class="c-nb">42</span>
<span class="c-bi">print</span>(<span class="c-st">f"{x=}"</span>)             <span class="c-cm"># "x=42"</span>

<span class="c-cm"># Multiline</span>
msg = (
    <span class="c-st">f"Bench: {bench_id}\n"</span>
    <span class="c-st">f"Test:  {test_name}\n"</span>
    <span class="c-st">f"Result: {result}"</span>
)</pre></div>
  </div>
  <div id="ps-3" class="tab-panel">
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
<span class="c-st">"\n"</span>.join(log_lines)     <span class="c-cm"># une líneas de log</span>

<span class="c-cm"># TRAMPA: nunca construyas strings con + en un loop</span>
<span class="c-cm"># Mal (O(n²)):  result = ""; for s in lista: result += s</span>
<span class="c-cm"># Bien (O(n)):  result = "".join(lista)</span></pre></div>
  </div>
</div>`,

};  // fin PYTHON_RICH

// ══════════════════════════════════════════════════════════════════
//  PYTHON RICH CONTENT — Funciones, POO y más
// ══════════════════════════════════════════════════════════════════
const PYTHON_RICH2 = {

'py-funciones': `
<div class="tab-group-pyfn">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'fn-1','pyfn')">Definición</button>
    <button class="tab-btn" onclick="switchTab(this,'fn-2','pyfn')">*args / **kwargs</button>
    <button class="tab-btn" onclick="switchTab(this,'fn-3','pyfn')">Lambda / HOF</button>
    <button class="tab-btn" onclick="switchTab(this,'fn-4','pyfn')">Closures</button>
  </div>
  <div id="fn-1" class="tab-panel active">
<div class="code-block"><div class="code-lang">Python — Definición de funciones</div><pre>
<span class="c-cm"># Básica</span>
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
    <span class="c-kw">return</span> base ** exp</pre></div>
  </div>
  <div id="fn-2" class="tab-panel">
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

<span class="c-cm"># Combinación completa</span>
<span class="c-kw">def</span> <span class="c-fn">full_func</span>(pos1, pos2, *args, kw_only, **kwargs):
    <span class="c-bi">print</span>(pos1, pos2, args, kw_only, kwargs)

<span class="c-cm"># Desempaquetar al llamar</span>
params = [<span class="c-st">"bench_a3"</span>, <span class="c-st">"test_lidar"</span>]
config = {<span class="c-st">"timeout"</span>: <span class="c-nb">30</span>, <span class="c-st">"retries"</span>: <span class="c-nb">3</span>}
run_test(*params, **config)   <span class="c-cm"># desempaca lista y dict</span></pre></div>
  </div>
  <div id="fn-3" class="tab-panel">
<div class="code-block"><div class="code-lang">Python — Lambda, map, filter, reduce</div><pre>
<span class="c-cm"># Lambda — función anónima de una expresión</span>
double = <span class="c-kw">lambda</span> x: x * <span class="c-nb">2</span>
sorter = <span class="c-kw">lambda</span> item: (item[<span class="c-st">'bench'</span>], item[<span class="c-st">'test'</span>])  <span class="c-cm"># sort key</span>

<span class="c-cm"># Cuándo usar lambda vs def</span>
<span class="c-cm"># Lambda: una vez, como argumento — def: reutilizable o compleja</span>
events.sort(key=<span class="c-kw">lambda</span> e: e.timestamp)              <span class="c-cm"># lambda OK aquí</span>

<span class="c-cm"># map() — aplica función a cada elemento (lazy)</span>
<span class="c-bi">list</span>(<span class="c-bi">map</span>(<span class="c-kw">lambda</span> x: x**<span class="c-nb">2</span>, [<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>]))    <span class="c-cm"># [1, 4, 9]</span>
<span class="c-cm"># Equivalente más Pythónico:</span>
[x**<span class="c-nb">2</span> <span class="c-kw">for</span> x <span class="c-kw">in</span> [<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>]]               <span class="c-cm"># prefiere esto sobre map+lambda</span>

<span class="c-cm"># filter() — filtra (lazy)</span>
<span class="c-bi">list</span>(<span class="c-bi">filter</span>(<span class="c-kw">lambda</span> x: x &gt; <span class="c-nb">2</span>, [<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>,<span class="c-nb">4</span>]))  <span class="c-cm"># [3, 4]</span>

<span class="c-cm"># reduce() — acumula (no built-in, requiere import)</span>
<span class="c-kw">from</span> functools <span class="c-kw">import</span> reduce
total = reduce(<span class="c-kw">lambda</span> acc, x: acc + x, [<span class="c-nb">1</span>,<span class="c-nb">2</span>,<span class="c-nb">3</span>,<span class="c-nb">4</span>])  <span class="c-cm"># 10</span>
<span class="c-cm"># Pero sum() es más claro para este caso</span>

<span class="c-cm"># partial — congela algunos argumentos</span>
<span class="c-kw">from</span> functools <span class="c-kw">import</span> partial
log_error = partial(<span class="c-bi">print</span>, <span class="c-st">"ERROR:"</span>)   <span class="c-cm"># print con primer arg fijo</span>
log_error(<span class="c-st">"sensor fail"</span>)               <span class="c-cm"># "ERROR: sensor fail"</span></pre></div>
  </div>
  <div id="fn-4" class="tab-panel">
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
fns = [<span class="c-kw">lambda</span> x=i: x <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">3</span>)]  <span class="c-cm"># correcto: captura por valor</span></pre></div>
  </div>
</div>`,

'py-decoradores': `
<div class="plan-card"><div class="plan-card-title">🎨 Decoradores — funciones que modifican funciones</div>
<div class="plan-block"><div class="plan-time">¿Qué es?</div><div class="plan-content"><h4>Una función que toma una función y retorna una función mejorada</h4><p>El decorador es azúcar sintáctica para <code>func = decorador(func)</code>. La línea <code>@decorador</code> sobre una función aplica ese patrón automáticamente. Esto permite agregar comportamiento (logging, timing, retry, auth) sin modificar el código original.</p></div></div>
</div>
<div class="code-block"><div class="code-lang">Python — Decorador básico con @wraps</div><pre>
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
<div class="code-block"><div class="code-lang">Python — Decorador con argumentos + stacking</div><pre>
<span class="c-cm"># Decorador con argumentos — necesita 3 niveles de anidación</span>
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

<span class="c-cm"># Stacking — se aplican de abajo hacia arriba</span>
<span class="c-dc">@timer</span>
<span class="c-dc">@retry</span>(times=<span class="c-nb">3</span>, exceptions=(ConnectionError,))
<span class="c-kw">def</span> <span class="c-fn">connect_to_bench</span>(bench_id): <span class="c-kw">pass</span>
<span class="c-cm"># equivale a: timer(retry(times=3)(connect_to_bench))</span>

<span class="c-cm"># Decoradores útiles de la stdlib</span>
<span class="c-kw">from</span> functools <span class="c-kw">import</span> lru_cache, cached_property, singledispatch

<span class="c-dc">@lru_cache</span>(maxsize=<span class="c-nb">128</span>)     <span class="c-cm"># memoiza los últimos 128 resultados</span>
<span class="c-kw">def</span> <span class="c-fn">parse_config</span>(path: str): <span class="c-kw">pass</span></pre></div>
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">¿Por qué?</span>¿Por qué se usa @functools.wraps en decoradores?<span class="q-arr">▶</span></div><div class="quiz-a">Sin @wraps, la función decorada pierde su identidad: <code>validate_mcap.__name__</code> sería "wrapper" en vez de "validate_mcap". Esto rompe logging, debugging, y herramientas como Sphinx. @wraps copia __name__, __doc__, __module__ y otros atributos de la función original al wrapper.</div></div>
</div>`,

'py-generadores': `
<div class="code-block"><div class="code-lang">Python — Generadores: yield vs return</div><pre>
<span class="c-cm"># Una función con yield es un generador</span>
<span class="c-cm"># Al llamarla, retorna un objeto generador (no ejecuta nada aún)</span>
<span class="c-cm"># Cada next() la ejecuta hasta el próximo yield</span>

<span class="c-kw">def</span> <span class="c-fn">read_log_lines</span>(path, batch_size=<span class="c-nb">100</span>):
    <span class="c-cm">"""Genera líneas de log de a batch_size — sin cargar todo en RAM."""</span>
    batch = []
    <span class="c-kw">with</span> <span class="c-bi">open</span>(path) <span class="c-kw">as</span> f:
        <span class="c-kw">for</span> line <span class="c-kw">in</span> f:
            batch.append(line.rstrip())
            <span class="c-kw">if</span> <span class="c-bi">len</span>(batch) == batch_size:
                <span class="c-kw">yield</span> batch      <span class="c-cm"># pausa aquí, retorna batch</span>
                batch = []        <span class="c-cm"># continúa desde aquí en el próximo next()</span>
        <span class="c-kw">if</span> batch:
            <span class="c-kw">yield</span> batch         <span class="c-cm"># último batch incompleto</span>

<span class="c-cm"># Uso — procesa 10M líneas con O(100) memoria</span>
<span class="c-kw">for</span> batch <span class="c-kw">in</span> read_log_lines(<span class="c-st">"huge.log"</span>):
    process_batch(batch)

<span class="c-cm"># next() y StopIteration</span>
gen = read_log_lines(<span class="c-st">"file.log"</span>)
first = <span class="c-bi">next</span>(gen)           <span class="c-cm"># primer batch</span>
second = <span class="c-bi">next</span>(gen)          <span class="c-cm"># segundo batch</span>
<span class="c-cm"># cuando se agota, lanza StopIteration</span>

<span class="c-cm"># yield from — delega a otro iterable</span>
<span class="c-kw">def</span> <span class="c-fn">all_errors_from_all_benches</span>(bench_logs):
    <span class="c-kw">for</span> log_path <span class="c-kw">in</span> bench_logs:
        <span class="c-kw">yield from</span> read_log_lines(log_path)   <span class="c-cm"># delega al sub-generador</span>

<span class="c-cm"># Generadores infinitos — útiles para streams</span>
<span class="c-kw">def</span> <span class="c-fn">timestamp_stream</span>(interval=<span class="c-nb">0.1</span>):
    <span class="c-kw">while</span> <span class="c-kw">True</span>:
        <span class="c-kw">yield</span> time.time()
        time.sleep(interval)

<span class="c-cm"># Generator expression vs list comprehension</span>
big_list = [process(x) <span class="c-kw">for</span> x <span class="c-kw">in</span> data]   <span class="c-cm"># O(n) RAM ahora</span>
big_gen  = (process(x) <span class="c-kw">for</span> x <span class="c-kw">in</span> data)   <span class="c-cm"># O(1) RAM — lazy</span></pre></div>
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Diferencia</span>¿Cuándo usar generador vs list comprehension?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Generador (o gen expr):</b> cuando el resultado es grande, solo lo vas a iterar una vez, o es potencialmente infinito. Usa O(1) de memoria.<br><b>List comp:</b> cuando necesitas acceso por índice, reutilizar la colección varias veces, o saber el len() sin consumirla.<div class="a-tip">Regla práctica: si lo pasas a sum(), any(), all(), max(), o un for loop de una vez → generador. Si necesitas lst[i] o len(lst) → lista.</div></div></div>
</div>`,

'py-tryexcept': `
<div class="code-block"><div class="code-lang">Python — try/except/else/finally completo</div><pre>
<span class="c-cm"># Estructura completa</span>
<span class="c-kw">try</span>:
    result = risky_operation()   <span class="c-cm"># puede lanzar excepción</span>
<span class="c-kw">except</span> FileNotFoundError <span class="c-kw">as</span> e:
    <span class="c-bi">print</span>(<span class="c-st">f"Archivo no encontrado: {e}"</span>)
<span class="c-kw">except</span> (ValueError, TypeError) <span class="c-kw">as</span> e:  <span class="c-cm"># múltiples tipos</span>
    <span class="c-bi">print</span>(<span class="c-st">f"Error de tipo: {e}"</span>)
<span class="c-kw">except</span> <span class="c-bi">Exception</span> <span class="c-kw">as</span> e:
    <span class="c-bi">print</span>(<span class="c-st">f"Error inesperado: {e}"</span>)
    <span class="c-kw">raise</span>                        <span class="c-cm"># re-raise: deja que suba</span>
<span class="c-kw">else</span>:
    use(result)   <span class="c-cm"># solo corre si NO hubo excepción</span>
<span class="c-kw">finally</span>:
    cleanup()     <span class="c-cm"># SIEMPRE corre, con o sin excepción</span>

<span class="c-cm"># raise vs raise e (diferencia importante)</span>
<span class="c-kw">try</span>: risky()
<span class="c-kw">except</span> <span class="c-bi">ValueError</span> <span class="c-kw">as</span> e:
    <span class="c-kw">raise</span>              <span class="c-cm"># preserva el traceback original</span>
    <span class="c-cm"># raise e          ← pierde el contexto del traceback</span>

<span class="c-cm"># Exception chaining</span>
<span class="c-kw">try</span>: connect()
<span class="c-kw">except</span> OSError <span class="c-kw">as</span> e:
    <span class="c-kw">raise</span> ConnectionError(<span class="c-st">"Bench offline"</span>) <span class="c-kw">from</span> e  <span class="c-cm"># encadena</span>

<span class="c-cm"># Excepciones customizadas</span>
<span class="c-kw">class</span> <span class="c-fn">BenchNotAvailableError</span>(RuntimeError):
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self, bench_id: str):
        self.bench_id = bench_id
        <span class="c-bi">super</span>().__init__(<span class="c-st">f"Bench {bench_id} not available"</span>)

<span class="c-kw">raise</span> BenchNotAvailableError(<span class="c-st">"A3"</span>)

<span class="c-cm"># Context manager con with (usa __enter__/__exit__)</span>
<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"file.txt"</span>) <span class="c-kw">as</span> f:    <span class="c-cm"># cierra el archivo automáticamente</span>
    data = f.read()

<span class="c-cm"># Jerarquía de excepciones</span>
<span class="c-cm"># BaseException</span>
<span class="c-cm">#   ├── SystemExit, KeyboardInterrupt, GeneratorExit</span>
<span class="c-cm">#   └── Exception</span>
<span class="c-cm">#         ├── ArithmeticError (ZeroDivisionError, OverflowError)</span>
<span class="c-cm">#         ├── LookupError (IndexError, KeyError)</span>
<span class="c-cm">#         ├── OSError (FileNotFoundError, PermissionError, ...)</span>
<span class="c-cm">#         ├── TypeError, ValueError, AttributeError, ...</span></pre></div>
<div class="quiz-section"><div class="quiz-title">Quiz</div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Trampa</span>¿Cuándo se ejecuta el bloque else de un try?<span class="q-arr">▶</span></div><div class="quiz-a"><b>Solo cuando NO hay excepción.</b> El propósito del else es separar el código que puede fallar (en try) del código que solo corre si todo fue bien (en else). Evita tener demasiado código en el try y catching excepciones no intencionadas.</div></div>
  <div class="quiz-card"><div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Nunca</span>¿Por qué es malo hacer: except Exception: pass?<span class="q-arr">▶</span></div><div class="quiz-a">Silencia TODOS los errores incluyendo bugs reales. Si tu código falla silenciosamente, es casi imposible debuggear. Siempre: 1) captura excepciones específicas, 2) al menos haz logging del error, 3) o re-raise si no puedes manejarlo.</div></div>
</div>`,

'py-archivos': `
<div class="code-block"><div class="code-lang">Python — Manejo de archivos completo</div><pre>
<span class="c-kw">from</span> pathlib <span class="c-kw">import</span> Path
<span class="c-kw">import</span> json, csv

<span class="c-cm"># ── open() modos ─────────────────────────────────────────────────</span>
<span class="c-cm"># 'r'  = leer texto (default)    'rb' = leer binario</span>
<span class="c-cm"># 'w'  = escribir (sobreescribe) 'wb' = escribir binario</span>
<span class="c-cm"># 'a'  = append (agrega al final) 'ab' = append binario</span>
<span class="c-cm"># 'x'  = crear exclusivo (error si existe)</span>
<span class="c-cm"># 'r+' = leer y escribir</span>

<span class="c-cm"># Leer todo el archivo</span>
<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"log.txt"</span>, encoding=<span class="c-st">"utf-8"</span>) <span class="c-kw">as</span> f:
    content = f.read()         <span class="c-cm"># todo como string</span>
    <span class="c-cm"># líneas = f.readlines()   # lista de strings con \n</span>

<span class="c-cm"># Leer línea por línea (eficiente para archivos grandes)</span>
<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"big.log"</span>) <span class="c-kw">as</span> f:
    <span class="c-kw">for</span> line <span class="c-kw">in</span> f:             <span class="c-cm"># f es un iterador — O(1) memoria</span>
        process(line.rstrip())  <span class="c-cm"># rstrip() elimina el \n final</span>

<span class="c-cm"># Escribir</span>
<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"output.txt"</span>, <span class="c-st">"w"</span>) <span class="c-kw">as</span> f:
    f.write(<span class="c-st">"línea 1\n"</span>)
    f.writelines([<span class="c-st">"a\n"</span>, <span class="c-st">"b\n"</span>])

<span class="c-cm"># ── JSON ─────────────────────────────────────────────────────────</span>
config = {<span class="c-st">"bench"</span>: <span class="c-st">"A3"</span>, <span class="c-st">"timeout"</span>: <span class="c-nb">30</span>}
<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"config.json"</span>, <span class="c-st">"w"</span>) <span class="c-kw">as</span> f:
    json.dump(config, f, indent=<span class="c-nb">2</span>)
<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"config.json"</span>) <span class="c-kw">as</span> f:
    loaded = json.load(f)

<span class="c-cm"># ── CSV ──────────────────────────────────────────────────────────</span>
<span class="c-kw">with</span> <span class="c-bi">open</span>(<span class="c-st">"results.csv"</span>, <span class="c-st">"w"</span>, newline=<span class="c-st">""</span>) <span class="c-kw">as</span> f:
    writer = csv.DictWriter(f, fieldnames=[<span class="c-st">"test"</span>,<span class="c-st">"status"</span>,<span class="c-st">"duration"</span>])
    writer.writeheader()
    writer.writerow({<span class="c-st">"test"</span>:<span class="c-st">"lidar"</span>,<span class="c-st">"status"</span>:<span class="c-st">"PASS"</span>,<span class="c-st">"duration"</span>:<span class="c-nb">1.23</span>})

<span class="c-cm"># ── pathlib.Path (moderno, recomendado) ──────────────────────────</span>
p = Path(<span class="c-st">"data/logs"</span>)
p.mkdir(parents=<span class="c-kw">True</span>, exist_ok=<span class="c-kw">True</span>)    <span class="c-cm"># mkdir -p</span>
p.exists()                                 <span class="c-cm"># True/False</span>
p.is_file() / p.is_dir()
<span class="c-bi">list</span>(p.glob(<span class="c-st">"*.mcap"</span>))                    <span class="c-cm"># todos los .mcap</span>
<span class="c-bi">list</span>(p.rglob(<span class="c-st">"*.log"</span>))                    <span class="c-cm"># recursivo</span>
(p / <span class="c-st">"bench_a3.log"</span>).read_text()          <span class="c-cm"># leer directo</span>
(p / <span class="c-st">"out.txt"</span>).write_text(<span class="c-st">"content"</span>)    <span class="c-cm"># escribir directo</span>
p.stat().st_size                           <span class="c-cm"># tamaño en bytes</span></pre></div>`,

'py-copy': `
<div class="plan-card"><div class="plan-card-title">📋 Copy — Shallow vs Deep</div>
<div class="plan-block"><div class="plan-time">El problema</div><div class="plan-content"><h4>En Python, asignar = no crea una copia — crea otra referencia al mismo objeto</h4><p>Si <code>b = a</code> y a es una lista, b y a apuntan a la MISMA lista. Modificar b modifica a. Esto sorprende a mucha gente y es una fuente común de bugs.</p></div></div>
</div>
<div class="code-block"><div class="code-lang">Python — Assignment vs Shallow vs Deep copy</div><pre>
<span class="c-kw">import</span> copy

original = [[<span class="c-nb">1</span>, <span class="c-nb">2</span>], [<span class="c-nb">3</span>, <span class="c-nb">4</span>]]

<span class="c-cm"># ── ASIGNACIÓN — misma referencia ────────────────────────────────</span>
referencia = original
referencia[<span class="c-nb">0</span>].append(<span class="c-nb">99</span>)
<span class="c-bi">print</span>(original)  <span class="c-cm"># [[1, 2, 99], [3, 4]]  ← original cambió</span>

<span class="c-cm"># ── SHALLOW COPY — nueva estructura, mismos objetos internos ─────</span>
original = [[<span class="c-nb">1</span>, <span class="c-nb">2</span>], [<span class="c-nb">3</span>, <span class="c-nb">4</span>]]
shallow = copy.copy(original)    <span class="c-cm"># o original[:] o original.copy()</span>

shallow.append([<span class="c-nb">5</span>, <span class="c-nb">6</span>])
<span class="c-bi">print</span>(original)  <span class="c-cm"># [[1,2],[3,4]]  ← no cambió (nueva estructura)</span>

shallow[<span class="c-nb">0</span>].append(<span class="c-nb">99</span>)
<span class="c-bi">print</span>(original)  <span class="c-cm"># [[1,2,99],[3,4]] ← SÍ cambió (misma sublista interna)</span>

<span class="c-cm"># ── DEEP COPY — copia todo, independiente total ───────────────────</span>
original = [[<span class="c-nb">1</span>, <span class="c-nb">2</span>], [<span class="c-nb">3</span>, <span class="c-nb">4</span>]]
deep = copy.deepcopy(original)

deep[<span class="c-nb">0</span>].append(<span class="c-nb">99</span>)
<span class="c-bi">print</span>(original)  <span class="c-cm"># [[1,2],[3,4]] ← NO cambió</span>

<span class="c-cm"># Cuándo usar cuál</span>
<span class="c-cm"># = (asignación): siempre, solo no copia</span>
<span class="c-cm"># Shallow: cuando la estructura exterior cambia pero los elementos no</span>
<span class="c-cm"># Deep: cuando necesitas independencia total (objetos anidados mutables)</span>

<span class="c-cm"># Tipos inmutables: NO necesitan copy (int, float, str, tuple, frozenset)</span>
a = <span class="c-st">"hello"</span>
b = a           <span class="c-cm"># b y a son la misma string, pero no importa — es inmutable</span></pre></div>`,

'py-tipado': `
<div class="code-block"><div class="code-lang">Python — Type Hints completo (PEP 484/604)</div><pre>
<span class="c-kw">from</span> typing <span class="c-kw">import</span> Optional, Union, List, Dict, Tuple, Set, Callable, Any
<span class="c-kw">from</span> typing <span class="c-kw">import</span> TypeVar, Generic, TypedDict, Protocol
<span class="c-kw">from</span> collections.abc <span class="c-kw">import</span> Sequence, Mapping, Iterator, Generator

<span class="c-cm"># ── Tipos básicos ─────────────────────────────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">process</span>(name: str, count: <span class="c-bi">int</span>, value: <span class="c-bi">float</span>, flag: <span class="c-bi">bool</span>) -&gt; <span class="c-kw">None</span>: <span class="c-kw">pass</span>

<span class="c-cm"># ── Optional (puede ser None) ─────────────────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">find_bench</span>(bench_id: str) -&gt; Optional[str]:  <span class="c-cm"># str | None</span>
    <span class="c-kw">return</span> <span class="c-kw">None</span> <span class="c-kw">if</span> bench_id == <span class="c-st">"X"</span> <span class="c-kw">else</span> bench_id

<span class="c-cm"># Python 3.10+: puedes usar | directamente</span>
<span class="c-kw">def</span> <span class="c-fn">find_bench2</span>(bench_id: str) -&gt; str | <span class="c-kw">None</span>: <span class="c-kw">pass</span>

<span class="c-cm"># ── Colecciones ───────────────────────────────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">analyze</span>(
    timestamps: <span class="c-bi">list</span>[<span class="c-bi">float</span>],          <span class="c-cm"># Python 3.9+: builtin lowercase</span>
    config:     <span class="c-bi">dict</span>[str, <span class="c-bi">int</span>],
    coords:     <span class="c-bi">tuple</span>[<span class="c-bi">float</span>, <span class="c-bi">float</span>],   <span class="c-cm"># longitud fija</span>
    tags:       <span class="c-bi">set</span>[str],
) -&gt; <span class="c-bi">list</span>[str]: <span class="c-kw">pass</span>

<span class="c-cm"># ── Callable ──────────────────────────────────────────────────────</span>
Handler = Callable[[str, <span class="c-bi">int</span>], <span class="c-kw">None</span>]   <span class="c-cm"># función(str, int) → None</span>

<span class="c-kw">def</span> <span class="c-fn">register</span>(event: str, handler: Handler) -&gt; <span class="c-kw">None</span>: <span class="c-kw">pass</span>

<span class="c-cm"># ── TypedDict — dict con tipos por campo ──────────────────────────</span>
<span class="c-kw">class</span> <span class="c-fn">BenchConfig</span>(TypedDict):
    bench_id: str
    timeout: <span class="c-bi">int</span>
    retries: <span class="c-bi">int</span>
    debug: <span class="c-bi">bool</span>

<span class="c-cm"># ── Protocol — duck typing tipado ─────────────────────────────────</span>
<span class="c-kw">class</span> <span class="c-fn">Connectable</span>(Protocol):
    <span class="c-kw">def</span> <span class="c-fn">connect</span>(self) -&gt; <span class="c-kw">None</span>: ...
    <span class="c-kw">def</span> <span class="c-fn">disconnect</span>(self) -&gt; <span class="c-kw">None</span>: ...
    <span class="c-kw">def</span> <span class="c-fn">is_alive</span>(self) -&gt; <span class="c-bi">bool</span>: ...

<span class="c-kw">def</span> <span class="c-fn">use_device</span>(device: Connectable) -&gt; <span class="c-kw">None</span>: <span class="c-kw">pass</span>
<span class="c-cm"># Cualquier clase con connect/disconnect/is_alive es válida — sin heredar</span>

<span class="c-cm"># ── TypeVar — genéricos ───────────────────────────────────────────</span>
T = TypeVar(<span class="c-st">'T'</span>)

<span class="c-kw">def</span> <span class="c-fn">first</span>(items: <span class="c-bi">list</span>[T]) -&gt; T:           <span class="c-cm"># retorna el mismo tipo</span>
    <span class="c-kw">return</span> items[<span class="c-nb">0</span>]</pre></div>
<div class="alert-card">💡 Los type hints son opcionales en Python (no se verifican en runtime por defecto). Usa <strong>mypy</strong> para verificación estática: <code>mypy script.py</code>. En Wayve/empresas tech, mypy o pyright son estándar en CI.</div>`,

// ══ POO ══

'poo-clase': `
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
b.is_connected = <span class="c-kw">True</span>   <span class="c-cm"># usa setter</span></pre></div>`,

'poo-principios': `
<div class="tab-group-poop">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pp-1','poop')">Encapsulación</button>
    <button class="tab-btn" onclick="switchTab(this,'pp-2','poop')">Herencia</button>
    <button class="tab-btn" onclick="switchTab(this,'pp-3','poop')">Polimorfismo</button>
    <button class="tab-btn" onclick="switchTab(this,'pp-4','poop')">Abstracción</button>
  </div>
  <div id="pp-1" class="tab-panel active">
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
</div>`,

'poo-herencia': `
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
        <span class="c-kw">return</span> self.retry(<span class="c-kw">lambda</span>: raw_connect())</pre></div>`,

'poo-metodos': `
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
    <span class="c-kw">def</span> <span class="c-fn">__call__</span>(self, idx: <span class="c-bi">int</span>): <span class="c-kw">return</span> self.values[idx]  <span class="c-cm"># data(0)</span></pre></div>`,

'poo-abstractas': `
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
<span class="c-bi">isinstance</span>(FileResource(), Closeable)  <span class="c-cm"># True (runtime_checkable)</span></pre></div>`,

'poo-dataclass': `
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
astuple(config)   <span class="c-cm"># → tuple</span></pre></div>`,

'poo-patrones': `
<div class="tab-group-pypatterns">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'pat-1','pypatterns')">Singleton</button>
    <button class="tab-btn" onclick="switchTab(this,'pat-2','pypatterns')">Factory</button>
    <button class="tab-btn" onclick="switchTab(this,'pat-3','pypatterns')">Observer</button>
    <button class="tab-btn" onclick="switchTab(this,'pat-4','pypatterns')">Strategy</button>
  </div>
  <div id="pat-1" class="tab-panel active">
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
  </div>
  <div id="pat-2" class="tab-panel">
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
    <table class="kv-table">
      <tr><th>Método</th><th>¿Qué hace?</th><th>Ejemplo → Resultado</th><th>Nota</th><th>🚫 No usar cuando</th></tr>
      <tr><td>upper()</td><td>Todo mayúsculas</td><td>"hello".upper() → "HELLO"</td><td>No modifica la original</td><td>bytes, int, float</td></tr>
      <tr><td>lower()</td><td>Todo minúsculas</td><td>"HELLO".lower() → "hello"</td><td></td><td>bytes, int, float</td></tr>
      <tr><td>title()</td><td>Primera letra de cada palabra en mayúscula</td><td>"hola mundo".title() → "Hola Mundo"</td><td></td><td>Apostrofes: "don't" → "Don'T" (usar regex)</td></tr>
      <tr><td>capitalize()</td><td>Solo primera letra del string</td><td>"hola MUNDO".capitalize() → "Hola mundo"</td><td>Baja el resto</td><td>bytes; no maneja palabras individuales</td></tr>
      <tr><td>swapcase()</td><td>Invierte mayúsculas/minúsculas</td><td>"hOLa".swapcase() → "HolA"</td><td></td><td>bytes</td></tr>
      <tr><td>casefold()</td><td>Minúsculas agresivo (para comparación)</td><td>"Straße".casefold() → "strasse"</td><td>Mejor que lower() para unicode</td><td>bytes; si solo necesitas lower()</td></tr>
      <tr><td>strip(chars)</td><td>Elimina chars al inicio y al final</td><td>"  hi  ".strip() → "hi" | "xxhixx".strip("x") → "hi"</td><td>Default: whitespace</td><td>Modificar contenido interior del string</td></tr>
      <tr><td>lstrip(chars)</td><td>Solo al inicio (left)</td><td>"  hi  ".lstrip() → "hi  "</td><td></td><td>Eliminar del final → usar rstrip()</td></tr>
      <tr><td>rstrip(chars)</td><td>Solo al final (right)</td><td>"log.txt".rstrip(".txt") → "log"</td><td>chars es un SET de chars, no secuencia</td><td>Eliminar del inicio → usar lstrip(); "rstrip('.txt')" elimina cualquier combinación de '.','t','x'</td></tr>
      <tr><td>split(sep, maxsplit)</td><td>Divide en lista por sep</td><td>"a,b,c".split(",") → ["a","b","c"] | "a  b".split() → ["a","b"]</td><td>Sin arg: divide por whitespace y elimina vacíos</td><td>sep="" → ValueError; patrones regex → usar re.split()</td></tr>
      <tr><td>rsplit(sep, maxsplit)</td><td>Divide desde la derecha</td><td>"a/b/c".rsplit("/",1) → ["a/b","c"]</td><td></td><td>sep="" → ValueError</td></tr>
      <tr><td>splitlines()</td><td>Divide por saltos de línea</td><td>"a\nb\nc".splitlines() → ["a","b","c"]</td><td>Reconoce \r\n, \r, \n, \v, \f</td><td>Separadores personalizados → usar split()</td></tr>
      <tr><td>join(iterable)</td><td>Une lista en string con separador</td><td>",".join(["a","b","c"]) → "a,b,c" | " ".join(["hola","mundo"]) → "hola mundo"</td><td>El string ES el separador</td><td>Iterable con no-strings → TypeError; bytes → usar b"".join()</td></tr>
      <tr><td>replace(old, new, count)</td><td>Reemplaza ocurrencias</td><td>"aaa".replace("a","b",2) → "bba" | "hi hi".replace("hi","hey") → "hey hey"</td><td>count=máx reemplazos</td><td>Patrones complejos/regex → usar re.sub()</td></tr>
      <tr><td>find(sub, start, end)</td><td>Índice primera ocurrencia (-1 si no)</td><td>"hello world".find("world") → 6 | "hello".find("x") → -1</td><td>No lanza error</td><td>Necesitas TODAS las posiciones → usar re.finditer()</td></tr>
      <tr><td>rfind(sub)</td><td>Índice ÚLTIMA ocurrencia</td><td>"abab".rfind("ab") → 2 | "a.b.c".rfind(".") → 3</td><td></td><td>Cuando la primera ocurrencia basta → usar find()</td></tr>
      <tr><td>index(sub)</td><td>Como find pero lanza ValueError</td><td>"hello".index("ll") → 2 | "hello".index("x") → ValueError</td><td></td><td>Sub puede NO existir → usar find() que retorna -1</td></tr>
      <tr><td>rindex(sub)</td><td>Última ocurrencia, lanza ValueError</td><td>"abab".rindex("ab") → 2</td><td></td><td>Sub puede NO existir → usar rfind()</td></tr>
      <tr><td>count(sub, start, end)</td><td>Cuenta ocurrencias sin solaparse</td><td>"aaa".count("aa") → 1 | "banana".count("an") → 2</td><td>NO solapa: "aaa".count("aa")=1, no 2</td><td>Patrones solapados → usar re.findall() con lookahead</td></tr>
      <tr><td>startswith(prefix, start, end)</td><td>¿Empieza con prefix?</td><td>"ERROR: x".startswith("ERROR") → True | "log".startswith(("ERR","WARN","INFO")) → False</td><td>Acepta tupla de prefijos</td><td>bytes sin decodificar → usar b"".startswith(b"...")</td></tr>
      <tr><td>endswith(suffix)</td><td>¿Termina con suffix?</td><td>"file.log".endswith((".log",".txt")) → True</td><td>Acepta tupla</td><td>bytes sin decodificar → usar b"".endswith(b"...")</td></tr>
      <tr><td>center(width, fillchar)</td><td>Centra en campo de width</td><td>"hi".center(10,"*") → "****hi****"</td><td></td><td>width &lt; len(s) → sin efecto, retorna original (no error)</td></tr>
      <tr><td>ljust(width, fillchar)</td><td>Alinea izquierda</td><td>"hi".ljust(6,".") → "hi...."</td><td></td><td>width &lt; len(s) → sin efecto (no error)</td></tr>
      <tr><td>rjust(width, fillchar)</td><td>Alinea derecha</td><td>"42".rjust(6,"0") → "000042"</td><td></td><td>width &lt; len(s) → sin efecto; para números → usar zfill() o f"{x:06d}"</td></tr>
      <tr><td>zfill(width)</td><td>Rellena con ceros a la izquierda</td><td>"42".zfill(5) → "00042" | "-7".zfill(4) → "-007"</td><td>Respeta signo: "-42".zfill(5) → "-0042"</td><td>float/int directo → usar f"{x:05d}" en su lugar</td></tr>
      <tr><td>partition(sep)</td><td>Divide en 3: (antes, sep, después)</td><td>"user:pass".partition(":") → ("user",":",  "pass")</td><td>Solo primera ocurrencia</td><td>sep no en string → (original, '', ''); múltiples ocurrencias → usar split()</td></tr>
      <tr><td>rpartition(sep)</td><td>Última ocurrencia</td><td>"a/b/c".rpartition("/") → ("a/b","/","c")</td><td></td><td>sep no en string → ('', '', original)</td></tr>
      <tr><td>encode(encoding)</td><td>String → bytes</td><td>"hola".encode("utf-8") → b"hola" | "€".encode("latin-1") → UnicodeEncodeError</td><td></td><td>Char fuera del encoding → UnicodeEncodeError; encoding incorrecto → LookupError</td></tr>
      <tr><td>format(**kwargs)</td><td>Formateo con {}</td><td>"{name} tiene {age} años".format(name="Ana",age=25) → "Ana tiene 25 años"</td><td>Alternativa a f-strings</td><td>Clave/índice no existe → KeyError/IndexError</td></tr>
      <tr><td>isalpha()</td><td>¿Solo letras?</td><td>"abc".isalpha() → True | "abc1".isalpha() → False</td><td>False si hay espacio o número</td><td>String vacío → False; dígitos/espacios → False</td></tr>
      <tr><td>isdigit()</td><td>¿Solo dígitos?</td><td>"123".isdigit() → True | "1.5".isdigit() → False</td><td>"1.2" → False</td><td>Decimales/floats; string vacío → False; usar isnumeric() para fracciones unicode</td></tr>
      <tr><td>isnumeric()</td><td>¿Carácter numérico? (más amplio)</td><td>"½".isnumeric() → True | "123".isnumeric() → True</td><td>Incluye fracciones unicode</td><td>String vacío → False; "3.14" → False (tiene punto)</td></tr>
      <tr><td>isalnum()</td><td>¿Solo letras y dígitos?</td><td>"abc123".isalnum() → True | "abc 1".isalnum() → False</td><td></td><td>String vacío → False; espacios/guiones → False</td></tr>
      <tr><td>isspace()</td><td>¿Solo whitespace?</td><td>"  \t\n".isspace() → True | " a ".isspace() → False</td><td></td><td>String vacío → False</td></tr>
      <tr><td>isupper() / islower()</td><td>¿Todo mayúsculas/minúsculas?</td><td>"ABC".isupper() → True | "ABC1".isupper() → True (números no cuentan)</td><td></td><td>String sin letras → False; "A1".isupper()→True aunque tiene número</td></tr>
      <tr><td>istitle()</td><td>¿Title case?</td><td>"Hello World".istitle() → True | "Hello world".istitle() → False</td><td></td><td>"Hello world" → False; "It's Ok" → False (s' después de apostrofe se cuenta)</td></tr>
      <tr><td>expandtabs(tabsize)</td><td>Reemplaza \t por espacios</td><td>"a\tb".expandtabs(4) → "a   b"</td><td>Default tabsize=8</td><td>Sin \t en el string (no error, sin efecto útil)</td></tr>
      <tr><td>maketrans() + translate()</td><td>Sustituye caracteres por tabla</td><td>tbl=str.maketrans("aeiou","AEIOU"); "hola".translate(tbl) → "hOlA"</td><td>Muy eficiente para múltiples reemplazos</td><td>Patrones de más de 1 char → usar replace() o re.sub()</td></tr>
    </table>
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
    <table class="kv-table">
      <tr><th>Método / Op</th><th>¿Qué hace?</th><th>Ejemplo → Resultado</th><th>Complejidad</th><th>🚫 No usar cuando</th></tr>
      <tr><td>append(x)</td><td>Agrega x al final</td><td>[1,2].append(3) → [1,2,3]</td><td>O(1) amortizado</td><td>Tuples, strings, frozenset (inmutables); sets → usar .add()</td></tr>
      <tr><td>extend(iterable)</td><td>Agrega todos los elementos</td><td>[1].extend([2,3]) → [1,2,3] | lst.extend("ab") → [...,"a","b"]</td><td>O(k)</td><td>Tuples/strings (inmutables); agregar UN solo elemento → usar append()</td></tr>
      <tr><td>insert(i, x)</td><td>Inserta x en posición i</td><td>[1,3].insert(1,2) → [1,2,3] | lst.insert(0,"x") → al principio</td><td>O(n)</td><td>Tuples; insertar al final → append() es O(1) y más rápido</td></tr>
      <tr><td>remove(x)</td><td>Elimina primera ocurrencia de x</td><td>[1,2,2].remove(2) → [1,2]</td><td>O(n)</td><td>x no existe → ValueError; tuples; hacer "if x in lst" antes si dudas</td></tr>
      <tr><td>pop(i=-1)</td><td>Elimina y retorna elemento en i</td><td>[1,2,3].pop() → 3, lst=[1,2] | [1,2,3].pop(0) → 1</td><td>O(1) final, O(n) otro índice</td><td>Lista vacía → IndexError; índice fuera de rango → IndexError</td></tr>
      <tr><td>del lst[i]</td><td>Elimina elemento en i (no retorna)</td><td>del lst[0] | del lst[-1]</td><td>O(n)</td><td>i fuera de rango → IndexError; cuando necesitas el valor → usar pop()</td></tr>
      <tr><td>del lst[i:j]</td><td>Elimina rango</td><td>del lst[1:3] | del lst[:]  → vacía la lista</td><td>O(n)</td><td>Tuples; cuando necesitas los elementos eliminados</td></tr>
      <tr><td>clear()</td><td>Vacía la lista</td><td>[1,2,3].clear() → []</td><td>O(n)</td><td>Tuples/strings (inmutables); si necesitas guardar copia primero</td></tr>
      <tr><td>index(x, start, end)</td><td>Índice de primera ocurrencia de x</td><td>[10,20,30].index(20) → 1 | [1,2,1].index(1,1) → 2</td><td>O(n)</td><td>x no existe → ValueError; hacer "if x in lst" antes o usar try/except</td></tr>
      <tr><td>count(x)</td><td>Número de ocurrencias de x</td><td>[1,2,2,3].count(2) → 2</td><td>O(n)</td><td>Contar muchos elementos distintos → usar Counter(); O(n) cada llamada</td></tr>
      <tr><td>sort(key, reverse)</td><td>Ordena in-place (modifica la lista)</td><td>[3,1,2].sort() | words.sort(key=str.lower) | nums.sort(reverse=True)</td><td>O(n log n)</td><td>Tuples/strings (inmutables); mezcla de tipos no comparables → TypeError</td></tr>
      <tr><td>sorted(lst, key, reverse)</td><td>Nueva lista ordenada (no modifica)</td><td>sorted([3,1,2]) → [1,2,3] | sorted(lst, key=lambda x: x[1])</td><td>O(n log n)</td><td>Mezcla de tipos no comparables → TypeError; modifica el original → usar .sort()</td></tr>
      <tr><td>reverse()</td><td>Invierte in-place</td><td>[1,2,3].reverse() → [3,2,1]</td><td>O(n)</td><td>Tuples/strings; si necesitas el original intacto → usar [::-1] o reversed()</td></tr>
      <tr><td>reversed(lst)</td><td>Iterator invertido (no modifica)</td><td>list(reversed([1,2,3])) → [3,2,1]</td><td>O(1) crear, O(n) consumir</td><td>Objetos sin __len__ ni __reversed__ → TypeError</td></tr>
      <tr><td>copy()</td><td>Shallow copy</td><td>b = a.copy() | b = list(a)</td><td>O(n)</td><td>Listas ANIDADAS → elementos internos SE COMPARTEN; usar copy.deepcopy()</td></tr>
      <tr><td>lst[:]</td><td>Shallow copy con slice</td><td>b = a[:]</td><td>O(n)</td><td>Igual que copy(): shallow; listas anidadas comparten referencias internas</td></tr>
      <tr><td>lst + lst2</td><td>Concatena (nueva lista)</td><td>[1,2]+[3,4] → [1,2,3,4]</td><td>O(n+m)</td><td>Concatenar MUCHAS listas en loop → O(n²); usar extend() o itertools.chain()</td></tr>
      <tr><td>lst * n</td><td>Repite n veces</td><td>[0]*3 → [0,0,0] | ["a"]*2 → ["a","a"]</td><td>O(n*k)</td><td>n negativo → lista vacía (no error); objetos MUTABLES → todas las copias comparten la misma referencia</td></tr>
      <tr><td>x in lst</td><td>¿Está x en la lista?</td><td>2 in [1,2,3] → True | "z" in ["a","b"] → False</td><td>O(n)</td><td>Búsquedas frecuentes en lista grande → convertir a set para O(1)</td></tr>
      <tr><td>len(lst)</td><td>Número de elementos</td><td>len([1,2,3]) → 3</td><td>O(1)</td><td>[Siempre seguro]</td></tr>
      <tr><td>min(lst) / max(lst)</td><td>Mínimo / máximo</td><td>min([3,1,2]) → 1 | max(lst, key=len) → el más largo</td><td>O(n)</td><td>Lista vacía → ValueError; tipos no comparables → TypeError</td></tr>
      <tr><td>sum(lst)</td><td>Suma de elementos</td><td>sum([1,2,3]) → 6 | sum([1,2,3], 10) → 16</td><td>O(n)</td><td>Lista de strings → TypeError; usar "".join() para strings</td></tr>
      <tr><td>any(lst) / all(lst)</td><td>¿Alguno/todos truthy?</td><td>any([0,1,0]) → True | all([1,2,3]) → True | any([]) → False | all([]) → True</td><td>O(n), cortocircuito</td><td>[Siempre seguro; ojo: all([]) → True (vacío es True por convención)]</td></tr>
      <tr><td>enumerate(lst, start)</td><td>Pares (índice, valor)</td><td>for i,v in enumerate(["a","b"],1): → (1,"a"),(2,"b")</td><td>O(1) crear</td><td>[Siempre seguro para cualquier iterable]</td></tr>
      <tr><td>zip(lst, lst2)</td><td>Pares de dos listas</td><td>list(zip([1,2],["a","b"])) → [(1,"a"),(2,"b")]</td><td>Se detiene en la más corta</td><td>Listas de DIFERENTE longitud → datos perdidos; usar itertools.zip_longest()</td></tr>
      <tr><td>lst[i] = x</td><td>Asigna valor en posición i</td><td>lst[0] = 99 | lst[-1] = 0</td><td>O(1)</td><td>Tuples/strings (inmutables); i fuera de rango → IndexError</td></tr>
      <tr><td>lst[i:j] = iterable</td><td>Reemplaza slice</td><td>lst[1:3] = [10,20,30] | lst[1:1] = [99] → inserta en posición 1</td><td>O(n)</td><td>Tuples; puede CAMBIAR la longitud de la lista (cuidado al iterar)</td></tr>
    </table>
  </div>

  <!-- ══ TUPLAS ══ -->
  <div id="cs-tup" class="tab-panel">
    <div class="plan-card"><div class="plan-card-title">Tuplas — Inmutables · Ordenadas · Más rápidas que listas · Hashables (si elementos son hashables)</div>
      <div class="plan-block"><div class="plan-time">Crear</div><div class="plan-content" style="font-size:.8rem">
        <code>()</code> vacía · <code>(1,)</code> un elemento (la coma es obligatoria) · <code>(1,2,3)</code> · <code>1,2,3</code> paréntesis opcionales · <code>tuple([1,2,3])</code> · <code>tuple("abc") → ('a','b','c')</code>
      </div></div>
    </div>
    <table class="kv-table">
      <tr><th>Operación</th><th>¿Qué hace?</th><th>Ejemplo → Resultado</th><th>Nota</th></tr>
      <tr><td>t[i]</td><td>Acceso por índice</td><td>(10,20,30)[1] → 20</td><td>O(1)</td></tr>
      <tr><td>t[i:j]</td><td>Slice (devuelve nueva tupla)</td><td>(1,2,3,4)[1:3] → (2,3)</td><td>O(k)</td></tr>
      <tr><td>t[-1]</td><td>Último elemento</td><td>(1,2,3)[-1] → 3</td><td></td></tr>
      <tr><td>count(x)</td><td>Ocurrencias de x</td><td>(1,2,2,3).count(2) → 2</td><td>O(n)</td></tr>
      <tr><td>index(x, start, end)</td><td>Índice primera ocurrencia</td><td>(10,20,30).index(20) → 1</td><td>O(n), ValueError si no existe</td></tr>
      <tr><td>a, b, c = t</td><td>Unpacking</td><td>a,b,c = (1,2,3)</td><td>Cantidad debe coincidir</td></tr>
      <tr><td>a, *rest = t</td><td>Unpacking con *</td><td>a,*rest = (1,2,3,4) → a=1,rest=[2,3,4]</td><td></td></tr>
      <tr><td>t1 + t2</td><td>Concatena (nueva tupla)</td><td>(1,2)+(3,4) → (1,2,3,4)</td><td>O(n+m)</td></tr>
      <tr><td>t * n</td><td>Repite</td><td>(1,2)*3 → (1,2,1,2,1,2)</td><td>O(n*k)</td></tr>
      <tr><td>x in t</td><td>Membership</td><td>2 in (1,2,3) → True</td><td>O(n)</td></tr>
      <tr><td>len(t)</td><td>Longitud</td><td>len((1,2,3)) → 3</td><td>O(1)</td></tr>
      <tr><td>hash(t)</td><td>Hash (si todos los elem son hashables)</td><td>hash((1,2,3)) → int</td><td>Por eso pueden ser keys de dict</td></tr>
      <tr><td>min(t) / max(t)</td><td>Mínimo / máximo</td><td>min((3,1,2)) → 1</td><td>O(n)</td></tr>
      <tr><td>sorted(t)</td><td>Lista ordenada</td><td>sorted((3,1,2)) → [1,2,3]</td><td>Retorna lista, no tupla</td></tr>
      <tr><td>tuple(lst)</td><td>Convierte lista a tupla</td><td>tuple([1,2,3]) → (1,2,3)</td><td>O(n)</td></tr>
      <tr><td>from collections import namedtuple</td><td>Tupla con nombres</td><td>Point = namedtuple('Point',['x','y']); p = Point(1,2); p.x</td><td>Legibilidad</td></tr>
    </table>
  </div>

  <!-- ══ DICCIONARIOS ══ -->
  <div id="cs-dct" class="tab-panel">
    <div class="plan-card"><div class="plan-card-title">Diccionarios — Mutables · Claves únicas (hashables) · Ordenados por inserción (Python 3.7+)</div>
      <div class="plan-block"><div class="plan-time">Crear</div><div class="plan-content" style="font-size:.8rem">
        <code>{}</code> vacío · <code>{"a":1,"b":2}</code> · <code>dict(a=1,b=2)</code> · <code>dict([("a",1),("b",2)])</code> · <code>dict.fromkeys(["a","b"], 0)</code> → {'a':0,'b':0} · <code>{k:v for k,v in items}</code>
      </div></div>
    </div>
    <table class="kv-table">
      <tr><th>Método / Op</th><th>¿Qué hace?</th><th>Ejemplo → Resultado</th><th>Nota</th></tr>
      <tr><td>d[key]</td><td>Obtener valor por clave</td><td>d["a"] → 1</td><td>KeyError si no existe</td></tr>
      <tr><td>d.get(key, default)</td><td>Obtener con default seguro</td><td>d.get("z", 0) → 0</td><td>No lanza KeyError</td></tr>
      <tr><td>d[key] = value</td><td>Insertar / actualizar</td><td>d["c"] = 3</td><td>O(1) amortizado</td></tr>
      <tr><td>d.setdefault(key, default)</td><td>Inserta default si key no existe; retorna valor</td><td>d.setdefault("x", []).append(1)</td><td>Útil para inicializar</td></tr>
      <tr><td>d.update(d2)</td><td>Merge in-place (d2 gana en conflicto)</td><td>d.update({"a":99})</td><td>También acepta kwargs</td></tr>
      <tr><td>d | d2</td><td>Merge (Python 3.9+, nueva dict)</td><td>{"a":1} | {"b":2} → {"a":1,"b":2}</td><td>d2 gana en conflicto</td></tr>
      <tr><td>d |= d2</td><td>Merge in-place</td><td>d |= {"new": 99}</td><td></td></tr>
      <tr><td>d.pop(key, default)</td><td>Elimina y retorna valor</td><td>d.pop("a") → 1</td><td>KeyError sin default si no existe</td></tr>
      <tr><td>d.popitem()</td><td>Elimina y retorna último (key,val)</td><td>d.popitem() → ("c", 3)</td><td>LIFO desde Python 3.7</td></tr>
      <tr><td>del d[key]</td><td>Elimina clave</td><td>del d["a"]</td><td>KeyError si no existe</td></tr>
      <tr><td>d.clear()</td><td>Vacía el diccionario</td><td>d.clear() → {}</td><td></td></tr>
      <tr><td>d.keys()</td><td>Vista de claves</td><td>d.keys() → dict_keys(['a','b'])</td><td>Vista dinámica, no copia</td></tr>
      <tr><td>d.values()</td><td>Vista de valores</td><td>d.values() → dict_values([1,2])</td><td>Vista dinámica</td></tr>
      <tr><td>d.items()</td><td>Vista de pares (key,val)</td><td>for k,v in d.items():</td><td>Usar siempre en for</td></tr>
      <tr><td>d.copy()</td><td>Shallow copy</td><td>d2 = d.copy()</td><td>O(n)</td></tr>
      <tr><td>key in d</td><td>¿Existe la clave?</td><td>"a" in d → True</td><td>O(1) — busca en keys</td></tr>
      <tr><td>key not in d</td><td>¿No existe?</td><td>"z" not in d → True</td><td></td></tr>
      <tr><td>len(d)</td><td>Número de pares</td><td>len({"a":1,"b":2}) → 2</td><td>O(1)</td></tr>
      <tr><td>dict.fromkeys(keys, val)</td><td>Nuevo dict con claves dadas y val como default</td><td>dict.fromkeys(["a","b"], 0) → {"a":0,"b":0}</td><td>Cuidado: mismo objeto para todos</td></tr>
    </table>
  </div>

  <!-- ══ SETS ══ -->
  <div id="cs-set" class="tab-panel">
    <div class="plan-card"><div class="plan-card-title">Sets — Mutables · Sin orden garantizado · Sin duplicados · Elementos deben ser hashables · O(1) membership</div>
      <div class="plan-block"><div class="plan-time">Crear</div><div class="plan-content" style="font-size:.8rem">
        <code>set()</code> vacío (NUNCA {}) · <code>{1,2,3}</code> · <code>set([1,2,2,3]) → {1,2,3}</code> · <code>{x for x in lst}</code> · <code>frozenset({1,2,3})</code> inmutable
      </div></div>
    </div>
    <table class="kv-table">
      <tr><th>Método / Op</th><th>¿Qué hace?</th><th>Ejemplo</th><th>Alias</th></tr>
      <tr><td>add(x)</td><td>Agrega x</td><td>s.add(5)</td><td></td></tr>
      <tr><td>update(iterable)</td><td>Agrega múltiples</td><td>s.update([4,5,6])</td><td>s |= {4,5}</td></tr>
      <tr><td>remove(x)</td><td>Elimina x — KeyError si no existe</td><td>s.remove(3)</td><td></td></tr>
      <tr><td>discard(x)</td><td>Elimina x — sin error si no existe</td><td>s.discard(99)</td><td>Más seguro que remove</td></tr>
      <tr><td>pop()</td><td>Elimina y retorna un elemento arbitrario</td><td>s.pop()</td><td></td></tr>
      <tr><td>clear()</td><td>Vacía el set</td><td>s.clear()</td><td></td></tr>
      <tr><td>s | s2</td><td>Unión: todos los elementos de ambos</td><td>{1,2} | {2,3} → {1,2,3}</td><td>s.union(s2)</td></tr>
      <tr><td>s & s2</td><td>Intersección: solo los comunes</td><td>{1,2} & {2,3} → {2}</td><td>s.intersection(s2)</td></tr>
      <tr><td>s - s2</td><td>Diferencia: en s pero no en s2</td><td>{1,2,3} - {2,3} → {1}</td><td>s.difference(s2)</td></tr>
      <tr><td>s ^ s2</td><td>Diferencia simétrica: en uno pero no en ambos</td><td>{1,2} ^ {2,3} → {1,3}</td><td>s.symmetric_difference(s2)</td></tr>
      <tr><td>s <= s2</td><td>¿s es subconjunto de s2?</td><td>{1,2} <= {1,2,3} → True</td><td>s.issubset(s2)</td></tr>
      <tr><td>s >= s2</td><td>¿s es superconjunto?</td><td>{1,2,3} >= {1,2} → True</td><td>s.issuperset(s2)</td></tr>
      <tr><td>s < s2</td><td>Subconjunto propio (s != s2)</td><td>{1} < {1,2} → True</td><td></td></tr>
      <tr><td>s.isdisjoint(s2)</td><td>¿No tienen elementos comunes?</td><td>{1,2}.isdisjoint({3,4}) → True</td><td></td></tr>
      <tr><td>s |= s2</td><td>Unión in-place</td><td>s |= {5,6}</td><td>s.update(s2)</td></tr>
      <tr><td>s &= s2</td><td>Intersección in-place</td><td>s &= {1,2}</td><td>s.intersection_update(s2)</td></tr>
      <tr><td>s -= s2</td><td>Diferencia in-place</td><td>s -= {3}</td><td>s.difference_update(s2)</td></tr>
      <tr><td>x in s</td><td>Membership O(1)</td><td>5 in {1,2,3,5} → True</td><td>Mucho más rápido que lista</td></tr>
      <tr><td>len(s)</td><td>Número de elementos</td><td>len({1,2,3}) → 3</td><td>O(1)</td></tr>
      <tr><td>frozenset(s)</td><td>Versión inmutable y hashable</td><td>frozenset({1,2})</td><td>Puede ser key de dict</td></tr>
    </table>
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
