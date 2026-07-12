
// ══════════════════════════════════════════════════════════════════
//  INTERVIEW_RICH — Entrevistas técnicas
// ══════════════════════════════════════════════════════════════════
const INTERVIEW_RICH = {

'ent-estructura-datos': `
<div class="plan-card">
  <div class="plan-card-title">🗂️ Estructuras de Datos en Python</div>
  <div class="plan-block">
    <div class="plan-time">Stack, Queue, LinkedList</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Python — Estructuras de datos</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> deque

<span class="c-cm"># Stack (LIFO) — con lista o deque</span>
stack = []
stack.append(<span class="c-nb">1</span>)       <span class="c-cm"># push</span>
stack.pop()            <span class="c-cm"># pop → 1 (LIFO)</span>

<span class="c-cm"># Queue (FIFO) — deque es más eficiente que lista</span>
queue = deque()
queue.append(<span class="c-nb">1</span>)       <span class="c-cm"># enqueue</span>
queue.popleft()        <span class="c-cm"># dequeue → 1 (FIFO)</span>

<span class="c-cm"># Linked List (manual)</span>
<span class="c-kw">class</span> <span class="c-fn">Node</span>:
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(<span class="c-bi">self</span>, val):
        <span class="c-bi">self</span>.val = val
        <span class="c-bi">self</span>.next = <span class="c-kw">None</span>

<span class="c-cm"># Heap (min-heap) — heapq</span>
<span class="c-kw">import</span> heapq
h = []
heapq.heappush(h, <span class="c-nb">3</span>)
heapq.heappush(h, <span class="c-nb">1</span>)
heapq.heappop(h)       <span class="c-cm"># → 1 (el mínimo)</span>

<span class="c-cm"># Graph — diccionario de listas de adyacencia</span>
graph = {<span class="c-st">'A'</span>: [<span class="c-st">'B'</span>, <span class="c-st">'C'</span>], <span class="c-st">'B'</span>: [<span class="c-st">'D'</span>], <span class="c-st">'C'</span>: [], <span class="c-st">'D'</span>: []}

<span class="c-cm"># Binary Tree</span>
<span class="c-kw">class</span> <span class="c-fn">TreeNode</span>:
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(<span class="c-bi">self</span>, val=<span class="c-nb">0</span>, left=<span class="c-kw">None</span>, right=<span class="c-kw">None</span>):
        <span class="c-bi">self</span>.val = val; <span class="c-bi">self</span>.left = left; <span class="c-bi">self</span>.right = right</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre estructuras de datos...</p>
</div>`,

'ent-algoritmos': `
<div class="alert-card">
  🔢 <strong>Guía de referencia rápida</strong> — templates listos para usar + Big-O de memoria. Para la explicación profunda con trampas y tips de cada algoritmo, ve a <b>Wayve → Coding Challenges → Algoritmos clave</b>.
</div>

<!-- ── MAPA DE PATRONES ── -->
<div class="plan-card">
  <div class="plan-card-title">🗺️ Mapa de decisión — ¿qué algoritmo uso?</div>
  <div class="plan-block">
    <div class="plan-time">Pregúntate</div>
    <div class="plan-content">
      <div class="dtree">
        <div class="dtree-step">
          <div class="dtree-num">1</div>
          <div class="dtree-body">
            <h5>¿El problema menciona "subarray/substring CONTIGUO" + max/min/suma?</h5>
            <p><span class="yes">SÍ →</span> <b>Sliding Window</b> O(n). <span class="no">NO →</span> Continúa</p>
          </div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num">2</div>
          <div class="dtree-body">
            <h5>¿El array está ordenado Y buscas dos elementos que cumplan una condición?</h5>
            <p><span class="yes">SÍ →</span> <b>Two Pointers</b> O(n). <span class="no">NO →</span> Continúa</p>
          </div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num">3</div>
          <div class="dtree-body">
            <h5>¿Necesitas contar frecuencias, buscar duplicados, o resolver Two Sum?</h5>
            <p><span class="yes">SÍ →</span> <b>HashMap/Counter</b> O(n). <span class="no">NO →</span> Continúa</p>
          </div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num">4</div>
          <div class="dtree-body">
            <h5>¿El array está ordenado Y buscas un elemento/índice específico?</h5>
            <p><span class="yes">SÍ →</span> <b>Binary Search</b> O(log n). <span class="no">NO →</span> Continúa</p>
          </div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num">5</div>
          <div class="dtree-body">
            <h5>¿El problema involucra un grafo/árbol?</h5>
            <p>Camino mínimo/pasos → <b>BFS</b>. Todos los caminos/ciclos/topo sort → <b>DFS</b></p>
          </div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num">6</div>
          <div class="dtree-body">
            <h5>¿Necesitas el K-ésimo mayor/menor elemento frecuentemente?</h5>
            <p><span class="yes">SÍ →</span> <b>Heap</b> O(log k) por operación. <span class="no">NO →</span> Continúa</p>
          </div>
        </div>
        <div class="dtree-step">
          <div class="dtree-num warn">7</div>
          <div class="dtree-body">
            <h5>¿Parece que necesitas O(n²) o más?</h5>
            <p>Busca un HashMap para O(1) lookups o Sorting+BS para O(log n). Si aún no ves la optimización, menciona la solución naïve primero y luego optimiza.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ── TEMPLATES COMPACTOS ── -->
<div class="plan-card" style="margin-top:12px">
  <div class="plan-card-title">⚡ Templates de memoria — escríbelos sin mirar</div>
  <div class="plan-block">
    <div class="plan-time">Sliding Window<br><span style="color:var(--text-muted);font-size:.7rem">O(n) t · O(k) s</span></div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Sliding Window — Ventana variable</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> deque, Counter

<span class="c-cm"># Template ventana VARIABLE</span>
left = <span class="c-nb">0</span>
window_state = Counter()   <span class="c-cm"># o dict, o suma, según el problema</span>
result = []

<span class="c-kw">for</span> right, val <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(arr):
    window_state[val] += <span class="c-nb">1</span>   <span class="c-cm"># EXPANDE derecha</span>

    <span class="c-kw">while</span> condicion_invalida(window_state):
        window_state[arr[left]] -= <span class="c-nb">1</span>
        left += <span class="c-nb">1</span>              <span class="c-cm"># ENCOGE izquierda</span>

    result.append(right - left + <span class="c-nb">1</span>)   <span class="c-cm"># tamaño actual de la ventana</span>

<span class="c-cm"># Template ventana FIJA de tamaño k</span>
window_sum = <span class="c-bi">sum</span>(arr[:<span class="c-nb">k</span>])
results = [window_sum]
<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(k, <span class="c-bi">len</span>(arr)):
    window_sum += arr[i] - arr[i - k]   <span class="c-cm"># +nuevo -viejo</span>
    results.append(window_sum)</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Two Pointers<br><span style="color:var(--text-muted);font-size:.7rem">O(n) t · O(1) s</span></div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Two Pointers — Extremos opuestos (array ordenado)</div><pre>
arr.sort()   <span class="c-cm"># O(n log n) — necesario</span>
left, right = <span class="c-nb">0</span>, <span class="c-bi">len</span>(arr) - <span class="c-nb">1</span>

<span class="c-kw">while</span> left &lt; right:   <span class="c-cm"># ← NO <=</span>
    curr = arr[left] + arr[right]
    <span class="c-kw">if</span>   curr == target: <span class="c-kw">return</span> [left, right]
    <span class="c-kw">elif</span> curr &lt;  target: left  += <span class="c-nb">1</span>   <span class="c-cm"># suma pequeña → mueve left</span>
    <span class="c-kw">else</span>:                right -= <span class="c-nb">1</span>   <span class="c-cm"># suma grande → mueve right</span>
<span class="c-kw">return</span> []</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Binary Search<br><span style="color:var(--text-muted);font-size:.7rem">O(log n) t · O(1) s</span></div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Binary Search — 3 variantes que necesitas de memoria</div><pre>
<span class="c-cm"># EXACT MATCH</span>
lo, hi = <span class="c-nb">0</span>, <span class="c-bi">len</span>(arr) - <span class="c-nb">1</span>
<span class="c-kw">while</span> lo &lt;= hi:
    mid = lo + (hi - lo) // <span class="c-nb">2</span>
    <span class="c-kw">if</span>   arr[mid] == target: <span class="c-kw">return</span> mid
    <span class="c-kw">elif</span> arr[mid] &lt;  target: lo  = mid + <span class="c-nb">1</span>
    <span class="c-kw">else</span>:                    hi  = mid - <span class="c-nb">1</span>
<span class="c-kw">return</span> -<span class="c-nb">1</span>

<span class="c-cm"># LOWER BOUND (primer índice donde arr[i] >= target)</span>
<span class="c-kw">import</span> bisect
idx = bisect.bisect_left(arr, target)

<span class="c-cm"># BINARY SEARCH ON ANSWER (minimizar X tal que f(X) es True)</span>
lo, hi = min_possible, max_possible
<span class="c-kw">while</span> lo &lt; hi:
    mid = (lo + hi) // <span class="c-nb">2</span>
    <span class="c-kw">if</span> feasible(mid): hi = mid      <span class="c-cm"># mid funciona, busca menor</span>
    <span class="c-kw">else</span>:             lo = mid + <span class="c-nb">1</span>  <span class="c-cm"># mid no funciona, necesita más</span>
<span class="c-kw">return</span> lo   <span class="c-cm"># mínimo X factible</span></pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">BFS<br><span style="color:var(--text-muted);font-size:.7rem">O(V+E) t · O(V) s</span></div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">BFS — camino mínimo en grafo no ponderado</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> deque

visited = {start}          <span class="c-cm"># marca AL AGREGAR, no al procesar</span>
queue   = deque([(start, <span class="c-nb">0</span>)])   <span class="c-cm"># (nodo, distancia)</span>

<span class="c-kw">while</span> queue:
    node, dist = queue.popleft()   <span class="c-cm"># ← popleft O(1), NO pop(0)</span>
    <span class="c-kw">if</span> node == target: <span class="c-kw">return</span> dist

    <span class="c-kw">for</span> neighbor <span class="c-kw">in</span> graph.get(node, []):
        <span class="c-kw">if</span> neighbor <span class="c-kw">not in</span> visited:
            visited.add(neighbor)        <span class="c-cm"># marca AQUÍ</span>
            queue.append((neighbor, dist + <span class="c-nb">1</span>))
<span class="c-kw">return</span> -<span class="c-nb">1</span></pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">DFS<br><span style="color:var(--text-muted);font-size:.7rem">O(V+E) t · O(h) s</span></div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">DFS — recursivo + detección de ciclos</div><pre>
<span class="c-cm"># DFS recursivo (cuidado con recursion limit en Python)</span>
<span class="c-kw">def</span> <span class="c-fn">dfs</span>(graph, node, visited=<span class="c-kw">None</span>):
    <span class="c-kw">if</span> visited <span class="c-kw">is None</span>: visited = <span class="c-bi">set</span>()
    visited.add(node)
    <span class="c-kw">for</span> n <span class="c-kw">in</span> graph.get(node, []):
        <span class="c-kw">if</span> n <span class="c-kw">not in</span> visited:
            dfs(graph, n, visited)
    <span class="c-kw">return</span> visited

<span class="c-cm"># Detección de ciclos — 3 colores</span>
WHITE, GRAY, BLACK = <span class="c-nb">0</span>, <span class="c-nb">1</span>, <span class="c-nb">2</span>
color = {n: WHITE <span class="c-kw">for</span> n <span class="c-kw">in</span> graph}

<span class="c-kw">def</span> <span class="c-fn">has_cycle_dfs</span>(node):
    color[node] = GRAY
    <span class="c-kw">for</span> nb <span class="c-kw">in</span> graph.get(node, []):
        <span class="c-kw">if</span> color[nb] == GRAY: <span class="c-kw">return True</span>    <span class="c-cm"># back edge = ciclo</span>
        <span class="c-kw">if</span> color[nb] == WHITE <span class="c-kw">and</span> has_cycle_dfs(nb): <span class="c-kw">return True</span>
    color[node] = BLACK
    <span class="c-kw">return False</span></pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Heap<br><span style="color:var(--text-muted);font-size:.7rem">O(n log k) · O(k) s</span></div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Heap — top-K y mediana en stream</div><pre>
<span class="c-kw">import</span> heapq
<span class="c-kw">from</span> collections <span class="c-kw">import</span> Counter

<span class="c-cm"># TOP-K más frecuentes — O(n log k)</span>
counts = Counter(items)
top_k  = heapq.nlargest(k, counts.items(), key=<span class="c-kw">lambda</span> x: x[<span class="c-nb">1</span>])

<span class="c-cm"># MIN-HEAP de tamaño K (para mantener K más grandes del stream)</span>
heap = []
<span class="c-kw">for</span> val <span class="c-kw">in</span> stream:
    <span class="c-kw">if</span> <span class="c-bi">len</span>(heap) &lt; k: heapq.heappush(heap, val)
    <span class="c-kw">elif</span> val &gt; heap[<span class="c-nb">0</span>]: heapq.heapreplace(heap, val)

<span class="c-cm"># MAX-HEAP — negar valores (heapq solo tiene min-heap)</span>
heapq.heappush(heap, -val)
max_val = -heapq.heappop(heap)

<span class="c-cm"># TOPO SORT — Kahn's algorithm O(V+E)</span>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> defaultdict, deque
in_deg = {n: <span class="c-nb">0</span> <span class="c-kw">for</span> n <span class="c-kw">in</span> all_nodes}
<span class="c-kw">for</span> node, deps <span class="c-kw">in</span> graph.items():
    <span class="c-kw">for</span> d <span class="c-kw">in</span> deps: in_deg[node] += <span class="c-nb">1</span>; adj[d].append(node)
q = deque(n <span class="c-kw">for</span> n, d <span class="c-kw">in</span> in_deg.items() <span class="c-kw">if</span> d == <span class="c-nb">0</span>)
order = []
<span class="c-kw">while</span> q:
    n = q.popleft(); order.append(n)
    <span class="c-kw">for</span> nb <span class="c-kw">in</span> adj[n]:
        in_deg[nb] -= <span class="c-nb">1</span>
        <span class="c-kw">if</span> in_deg[nb] == <span class="c-nb">0</span>: q.append(nb)
<span class="c-cm"># Si len(order) != len(all_nodes): hay ciclo</span></pre></div>
    </div>
  </div>
</div>

<!-- ── COMPLEJIDADES DE REFERENCIA ── -->
<div class="plan-card" style="margin-top:12px">
  <div class="plan-card-title">⏱️ Big-O de memoria — tabla de referencia rápida</div>
  <div class="plan-block">
    <div class="plan-time">Resumen</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Algoritmo</th><th>Tiempo</th><th>Espacio</th><th>Cuándo usarlo</th><th>Trampa principal</th></tr></thead>
        <tbody>
          <tr><td>Sliding Window</td><td>O(n)</td><td>O(k)</td><td>subarray contiguo, streams</td><td>Olvidar encograr por la izquierda</td></tr>
          <tr><td>Two Pointers</td><td>O(n)</td><td>O(1)</td><td>array ordenado, pares</td><td>Necesita array ordenado</td></tr>
          <tr><td>HashMap/Counter</td><td>O(n)</td><td>O(n)</td><td>contar, buscar complemento</td><td>list.pop(0) vs deque.popleft()</td></tr>
          <tr><td>Binary Search</td><td>O(log n)</td><td>O(1)</td><td>array ordenado, minimizar</td><td>Off-by-one en condición del while</td></tr>
          <tr><td>BFS</td><td>O(V+E)</td><td>O(V)</td><td>camino mínimo, niveles</td><td>Marcar visitado al POP no al PUSH</td></tr>
          <tr><td>DFS</td><td>O(V+E)</td><td>O(h)</td><td>todos caminos, ciclos, topo</td><td>RecursionError en grafos profundos</td></tr>
          <tr><td>Heap</td><td>O(n log k)</td><td>O(k)</td><td>top-K, mediana en stream</td><td>heapq solo min-heap → negar para max</td></tr>
          <tr><td>Topo Sort (Kahn)</td><td>O(V+E)</td><td>O(V+E)</td><td>orden de dependencias, ciclos</td><td>len(result) &lt; len(nodes) → ciclo</td></tr>
          <tr><td>DP (Kadane)</td><td>O(n)</td><td>O(1)</td><td>max subarray sum</td><td>Reiniciar cuando cur+x &lt; x</td></tr>
          <tr><td>Merge Intervals</td><td>O(n log n)</td><td>O(n)</td><td>overlap de rangos</td><td>Sort por start primero</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Practica cada algoritmo escribiendo el template de memoria en 2 minutos sin mirar. Eso es el nivel que pide Wayve.</p>
</div>`,

'ent-complejidad': `
<div class="plan-card">
  <div class="plan-card-title">📊 Complejidad — Big O</div>
  <div class="plan-block">
    <div class="plan-time">Tabla de complejidades</div>
    <div class="plan-content">
      <table class="ref-table">
        <thead><tr><th>Notación</th><th>Nombre</th><th>Ejemplo</th><th>n=1000</th></tr></thead>
        <tbody>
          <tr><td>O(1)</td><td>Constante</td><td>dict lookup, array index</td><td>1 op</td></tr>
          <tr><td>O(log n)</td><td>Logarítmica</td><td>Binary search, BST balanceado</td><td>10 ops</td></tr>
          <tr><td>O(n)</td><td>Lineal</td><td>Iterar lista, búsqueda lineal</td><td>1,000 ops</td></tr>
          <tr><td>O(n log n)</td><td>Log-lineal</td><td>Merge sort, Heap sort, TimSort</td><td>10,000 ops</td></tr>
          <tr><td>O(n²)</td><td>Cuadrática</td><td>Bubble sort, loops anidados</td><td>1,000,000 ops</td></tr>
          <tr><td>O(2ⁿ)</td><td>Exponencial</td><td>Subsets, backtracking sin poda</td><td>10³⁰⁰ ops 🔴</td></tr>
        </tbody>
      </table>
      <div class="code-block"><div class="code-lang">Python — Analizar complejidad</div><pre>
<span class="c-cm"># O(n²) — dos loops anidados sobre el mismo array</span>
<span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-bi">len</span>(arr)):       <span class="c-cm"># O(n)</span>
    <span class="c-kw">for</span> j <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-bi">len</span>(arr)):   <span class="c-cm"># O(n)</span>
        ...                          <span class="c-cm"># Total: O(n²)</span>

<span class="c-cm"># O(n) — un loop con dict lookup O(1) adentro</span>
seen = {}                            <span class="c-cm"># O(n) space</span>
<span class="c-kw">for</span> x <span class="c-kw">in</span> arr:                    <span class="c-cm"># O(n)</span>
    <span class="c-kw">if</span> x <span class="c-kw">in</span> seen: ...            <span class="c-cm"># O(1) lookup</span>
    seen[x] = <span class="c-kw">True</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Big O...</p>
</div>`,

'ent-preguntas-py': `
<div class="plan-card">
  <div class="plan-card-title">🐍 Preguntas frecuentes Python en entrevistas</div>
  <div class="plan-block">
    <div class="plan-time">Preguntas y respuestas</div>
    <div class="plan-content">
      <p><b>¿Qué es el GIL?</b><br>
      El Global Interpreter Lock es un mutex que permite que solo un thread corra bytecode Python a la vez. Limita el paralelismo en programas CPU-bound con threads. Solución: multiprocessing para CPU-bound, asyncio para I/O-bound.<br><br>
      <b>is vs ==</b><br>
      <code>==</code> compara valor (igualdad). <code>is</code> compara identidad (mismo objeto en memoria). <code>[] == []</code> es True pero <code>[] is []</code> es False. Excepción: integers pequeños (-5 a 256) y strings cortos son cacheados por CPython.<br><br>
      <b>Mutable vs Inmutable</b><br>
      Mutables: list, dict, set, objetos propios. Inmutables: int, float, str, tuple, frozenset. Los inmutables pueden ser keys de dict. Los mutables no.<br><br>
      <b>LEGB (scope)</b><br>
      Local → Enclosing → Global → Built-in. El orden en que Python busca una variable. <code>global x</code> para modificar global. <code>nonlocal x</code> para enclosing.<br><br>
      <b>Generators vs Lists</b><br>
      Generators son lazy (calculan un elemento a la vez). Eficientes en memoria para secuencias largas. <code>(x**2 for x in range(1000000))</code> vs <code>[x**2 for x in range(1000000)]</code>.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre preguntas Python...</p>
</div>`,

'ent-preguntas-auto': `
<div class="plan-card">
  <div class="plan-card-title">🚗 Preguntas frecuentes Automotriz</div>
  <div class="plan-block">
    <div class="plan-time">Q&amp;A estilo entrevista</div>
    <div class="plan-content">
      <p><b>¿Qué es ASIL y cómo se determina?</b><br>
      ASIL (Automotive Safety Integrity Level) es el nivel de rigor de seguridad requerido. Se determina en el HARA combinando Severity (S), Exposure (E) y Controllability (C). Va de QM (sin requisitos) a ASIL-D (máxima criticidad). Ej: frenos de emergencia = ASIL-D.<br><br>
      <b>¿Diferencia entre CAN y Automotive Ethernet?</b><br>
      CAN: hasta 1 Mbit/s, bus lineal, sin dirección IP, máx 8 bytes/frame. Ideal para control en tiempo real. Ethernet: 100 Mbit/s a 10 Gbit/s, estrella, IP/TCP/UDP, frames grandes. Ideal para cámaras, ADAS, OTA.<br><br>
      <b>¿Cómo funciona el diagnóstico UDS?</b><br>
      UDS (ISO 14229) sigue modelo cliente-servidor. El tester envía Request (SID + datos), la ECU responde con Positive Response (0x40+SID) o Negative Response (0x7F+SID+NRC). Corre sobre CAN (ISO-TP) o Ethernet (DoIP).<br><br>
      <b>¿Qué es ASPICE?</b><br>
      Automotive SPICE: modelo de evaluación de madurez de procesos de software (Capability Levels 0-5). Los OEMs alemanes lo exigen a sus proveedores. No es certificación de producto sino del proceso de desarrollo.<br><br>
      <b>¿Qué es AUTOSAR?</b><br>
      Framework de arquitectura de software automotriz. Classic (para ECUs hard real-time, OSEK OS) y Adaptive (para HPC, Linux, SOME/IP). Define capas: Application (SWC) → RTE → BSW → MCAL → HW.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus respuestas a preguntas automotrices...</p>
</div>`,

'ent-behavioral': `
<div class="plan-card">
  <div class="plan-card-title">⭐ Preguntas Behavioral — Método STAR</div>
  <div class="plan-block">
    <div class="plan-time">El método STAR</div>
    <div class="plan-content">
      <h4>Situación → Tarea → Acción → Resultado</h4>
      <p><b>S (Situation):</b> Contexto específico. ¿Cuándo, dónde, con qué equipo?<br>
      <b>T (Task):</b> Tu responsabilidad en esa situación. ¿Qué se te pidió resolver?<br>
      <b>A (Action):</b> Las acciones CONCRETAS que tomaste. Usa "yo" no "nosotros". Específico.<br>
      <b>R (Result):</b> El resultado medible. Números cuando sea posible. ¿Qué aprendiste?<br><br>
      <b>Preguntas típicas y cómo abordarlas:</b><br>
      • "Cuéntame de un conflicto en el equipo" → Situación de desacuerdo técnico, cómo escuchaste todas las partes, cómo propusiste solución, resultado positivo.<br>
      • "Tu proyecto más desafiante" → Complejidad técnica alta + deadline ajustado, cómo priorizaste, qué sacrificaste, qué lograste.<br>
      • "Un error que cometiste" → Error real (no trivial), lo que aprendiste, cómo lo preveniste después. Honestidad + crecimiento.<br>
      • "Cuándo tuviste que aprender algo nuevo rápido" → Tecnología nueva, timeline corto, proceso de aprendizaje, cómo lo aplicaste.<br>
      <b>Tip:</b> Prepara 3 historias STAR sólidas que puedas adaptar a distintas preguntas.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis historias STAR</div>
  <p class="notes-placeholder">Escribe aquí tus 3 historias STAR con contexto de tu experiencia específica...</p>
</div>`,

'ent-preguntas-entrevistador': `
<div class="plan-card">
  <div class="plan-card-title">❓ Preguntas al Entrevistador</div>
  <div class="plan-block">
    <div class="plan-time">Preguntas de alto impacto</div>
    <div class="plan-content">
      <h4>Las mejores preguntas distinguen candidatos</h4>
      <p><b>Sobre el trabajo real:</b><br>
      • "¿Cuál sería el primer problema concreto que resolvería alguien en este rol los primeros 30 días?"<br>
      • "¿Cuál es el mayor reto técnico que enfrenta el equipo actualmente?"<br><br>
      <b>Sobre el equipo y cultura:</b><br>
      • "¿Cómo es el proceso de code review aquí? ¿Cuántos reviewers típicamente?"<br>
      • "¿Cómo se toman las decisiones técnicas — centralizado o el equipo tiene autonomía?"<br><br>
      <b>Sobre herramientas y proceso:</b><br>
      • "¿Qué herramientas usa el equipo para CI/CD y cómo está de automatizado el pipeline?"<br>
      • "¿Cómo es su proceso de gestión de deuda técnica?"<br><br>
      <b>Sobre crecimiento:</b><br>
      • "¿Hay oportunidades de contribuir a la definición de arquitectura, o el rol es principalmente implementación?"<br>
      • "¿Cómo miden el éxito de alguien en este rol durante el primer año?"<br><br>
      <b>Qué NO preguntar:</b> No preguntes sobre salario en la primera entrevista (si no te lo ofrecen). No preguntes cosas que están en el website de la empresa. No hagas preguntas que impliquen que no leíste la JD.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis preguntas favoritas</div>
  <p class="notes-placeholder">Marca las 3 preguntas que usarás en tu próxima entrevista...</p>
</div>`,

'ent-patron-apuntadores': `
<div class="plan-card">
  <div class="plan-card-title">👆 Patrón Two Pointers / Sliding Window</div>
  <div class="plan-block">
    <div class="plan-time">Two Pointers</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Python — Two Pointers y Sliding Window</div><pre>
<span class="c-cm"># TWO POINTERS — array ordenado, suma de dos números</span>
<span class="c-kw">def</span> <span class="c-fn">two_sum_sorted</span>(arr, target):
    lo, hi = <span class="c-nb">0</span>, <span class="c-bi">len</span>(arr) - <span class="c-nb">1</span>
    <span class="c-kw">while</span> lo &lt; hi:
        s = arr[lo] + arr[hi]
        <span class="c-kw">if</span> s == target: <span class="c-kw">return</span> [lo, hi]
        <span class="c-kw">elif</span> s &lt; target: lo += <span class="c-nb">1</span>
        <span class="c-kw">else</span>: hi -= <span class="c-nb">1</span>

<span class="c-cm"># SLIDING WINDOW — máx suma de subarray de tamaño k</span>
<span class="c-kw">def</span> <span class="c-fn">max_sum_subarray</span>(arr, k):
    window = <span class="c-bi">sum</span>(arr[:k])
    best = window
    <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(k, <span class="c-bi">len</span>(arr)):
        window += arr[i] - arr[i - k]   <span class="c-cm"># deslizar ventana</span>
        best = <span class="c-bi">max</span>(best, window)
    <span class="c-kw">return</span> best

<span class="c-cm"># FAST &amp; SLOW pointers — detectar ciclo en lista enlazada</span>
<span class="c-kw">def</span> <span class="c-fn">has_cycle</span>(head):
    slow = fast = head
    <span class="c-kw">while</span> fast <span class="c-kw">and</span> fast.next:
        slow = slow.next
        fast = fast.next.next
        <span class="c-kw">if</span> slow <span class="c-kw">is</span> fast: <span class="c-kw">return True</span>
    <span class="c-kw">return False</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus variantes y aplicaciones de Two Pointers...</p>
</div>`,

'ent-libros': `
<div class="plan-card">
  <div class="plan-card-title">📚 Libros y Recursos Recomendados</div>
  <div class="plan-block">
    <div class="plan-time">Para entrevistas de código</div>
    <div class="plan-content">
      <h4>Los libros clásicos</h4>
      <p><b>"Cracking the Coding Interview"</b> — Gayle Laakmann McDowell. El estándar de preparación para entrevistas técnicas en FAANG y empresas de SW. Cubre estructuras de datos, algoritmos y preguntas de diseño de sistemas.<br><br>
      <b>"Clean Code"</b> — Robert C. Martin (Uncle Bob). Prácticas de código limpio, nombres significativos, funciones pequeñas, refactoring. Lectura obligatoria para cualquier desarrollador.<br><br>
      <b>"The Pragmatic Programmer"</b> — Hunt & Thomas. Principios de desarrollo: DRY, YAGNI, ortogonalidad, automatización.<br><br>
      <b>Para automotriz específicamente:</b><br>
      • <b>ISTQB CTFL Syllabus v4.0</b> — Descargable gratis en istqb.org. La base del examen CTFL.<br>
      • <b>ISO 26262 Part 6 (SW)</b> — El estándar en sí. Caro pero partes gratis en el borrador.<br>
      • Documentación oficial de AUTOSAR (autosar.org) — gratuita.<br><br>
      <b>Para practicar algoritmos online:</b><br>
      LeetCode (enfoque FAANG), HackerRank (más backend/SQL), Codewars (kata de dificultad progresiva).</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí los recursos que estás estudiando...</p>
</div>`,

};  // fin INTERVIEW_RICH
