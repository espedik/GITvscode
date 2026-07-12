// ══════════════════════════════════════════════════════════════════
//  API_RICH — APIs: Fundamentos y Práctica
// ══════════════════════════════════════════════════════════════════
const API_RICH = {

'api-fundamentos': `
<div class="tab-group-apf">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'apf-1','apf')">¿Qué es una API?</button>
    <button class="tab-btn" onclick="switchTab(this,'apf-2','apf')">Arquitectura Cliente-Servidor</button>
    <button class="tab-btn" onclick="switchTab(this,'apf-3','apf')">Tipos de APIs</button>
  </div>
  <div id="apf-1" class="tab-panel active">
<div class="concept-intro">Si nunca has trabajado con APIs, no te preocupes: es un concepto simple una vez que ves la analogía correcta. Vamos a construirlo desde cero, sin asumir que sabes nada todavía.</div>

<div class="alert-card">🍽️ <b>Analogía del restaurante.</b> Imagina que vas a un restaurante. Tú (el <b>cliente</b>) no entras a la cocina a prepararte tu propia comida — sería caótico, inseguro, y tendrías que saber cocinar. En vez de eso, le pides algo al <b>mesero</b>: "quiero unos tacos". El mesero lleva tu pedido a la <b>cocina</b>, la cocina prepara la comida, y el mesero te la trae de vuelta a la mesa. Tú nunca viste cómo se cocinó, ni te importó — solo pediste y recibiste.</div>

<div class="concept-intro">Ese mesero es, ni más ni menos, una <strong>API</strong>. La cocina es el <strong>servicio</strong> (un programa, una base de datos, un sistema) que sabe hacer algo útil. Tú eres la <strong>aplicación cliente</strong> que necesita ese algo. La API es el intermediario que: (1) sabe qué pedidos acepta ("el menú" — qué puedes pedir y cómo pedirlo), (2) lleva tu petición a quien sabe resolverla, y (3) te trae la respuesta de vuelta en un formato que entiendes. Tú nunca necesitas saber cómo la cocina prepara los tacos — solo necesitas saber cómo pedirlos.</div>

<div class="pipeline-diagram">
<span class="p-blue">Tu App</span> ──▶ pide algo ──▶ <span class="p-green">API</span> ──▶ traduce el pedido ──▶ <span class="p-amber">Servicio / Base de datos</span>
<span class="p-blue">Tu App</span> ◀── recibe respuesta ◀── <span class="p-green">API</span> ◀── entrega el resultado ◀── <span class="p-amber">Servicio / Base de datos</span>
</div>

<div class="concept-intro"><strong>Definición técnica.</strong> API significa <strong>Application Programming Interface</strong> (interfaz de programación de aplicaciones). Es un <strong>contrato</strong>: un conjunto de reglas acordadas de antemano que dice exactamente qué puede pedir un programa, cómo debe pedirlo, y qué tipo de respuesta va a recibir. Gracias a ese contrato, dos programas completamente distintos — escritos en diferentes lenguajes, corriendo en diferentes computadoras, mantenidos por diferentes equipos — pueden comunicarse sin que uno necesite conocer ni una sola línea del código interno del otro. Esto se llama <strong>encapsulamiento</strong>: la API expone lo que hace falta y esconde el "cómo" por dentro.</div>

<div class="two-col">
  <div class="info-card">
    <h5>Ejemplo cotidiano</h5>
    <ul>
      <li>Una app del clima en tu celular no tiene sensores meteorológicos propios — llama a la <b>API de un servicio de clima</b> que sí tiene esos datos.</li>
      <li>Cuando pagas en línea, el sitio no procesa tu tarjeta directamente — llama a la <b>API de una pasarela de pago</b> (Stripe, PayPal, etc.).</li>
    </ul>
  </div>
  <div class="info-card">
    <h5>Ejemplo automotriz</h5>
    <ul>
      <li>Una app de flota de vehículos no lee el bus CAN directamente desde el navegador — llama a una <b>API de telemetría</b> que ya tradujo esos datos crudos a JSON legible.</li>
      <li>Un taller consulta el historial de fallas de un auto llamando a la <b>API de diagnóstico</b> del fabricante, sin saber cómo está implementada la base de datos detrás.</li>
    </ul>
  </div>
</div>

<div class="alert-card">💡 <b>Por qué importa esto en la práctica:</b> las APIs permiten que equipos distintos trabajen en paralelo. El equipo que construye el servicio de telemetría puede cambiar por completo su base de datos interna, y mientras no cambie el "menú" (el contrato de la API), ninguna app cliente se rompe. Ese desacoplamiento es la razón número uno por la que las APIs son el pegamento del software moderno.</div>
  </div>
  <div id="apf-2" class="tab-panel">
<div class="concept-intro">La forma más común en que existen las APIs hoy es sobre una arquitectura llamada <strong>cliente-servidor</strong>. Entender quién es quién es la base para todo lo demás (HTTP, REST, autenticación...).</div>

<div class="two-col">
  <div class="info-card">
    <h5>Cliente</h5>
    <ul>
      <li>Es el programa que <b>inicia</b> la comunicación — el que pregunta o pide algo.</li>
      <li>Puede ser una app móvil, un sitio web, un script de Python, otro servidor, un coche conectado, etc.</li>
      <li>No necesita saber nada de cómo está construido el servidor.</li>
    </ul>
  </div>
  <div class="info-card">
    <h5>Servidor</h5>
    <ul>
      <li>Es el programa que <b>escucha</b> peticiones y responde.</li>
      <li>Tiene acceso a los datos o la lógica que el cliente necesita (una base de datos, un modelo, sensores, etc.).</li>
      <li>Puede atender a muchísimos clientes distintos al mismo tiempo, sin que se conozcan entre sí.</li>
    </ul>
  </div>
</div>

<div class="concept-intro">El cliente no le habla al servidor "en general" — le habla a un punto muy específico llamado <strong>endpoint</strong>: una URL (dirección) que representa una pregunta o acción concreta que el servidor sabe responder. Por ejemplo, un endpoint puede significar "dame el clima de esta ciudad" o "dame el estado de este vehículo". Cada API expone una lista de endpoints disponibles — esa lista, junto con las reglas de uso, normalmente se documenta y se conoce como la <strong>documentación de la API</strong>.</div>

<div class="code-block"><div class="code-lang">Ejemplo real de endpoint</div><pre>
https://api.clima.com/v1/ciudad/monterrey
</pre></div>

<table class="kv-table">
<tr><th>Parte de la URL</th><th>Valor en el ejemplo</th><th>¿Qué significa?</th></tr>
<tr><td>Protocolo</td><td><code>https://</code></td><td>Cómo viajan los datos por la red; la <b>S</b> significa que el tráfico va cifrado (seguro).</td></tr>
<tr><td>Dominio / host</td><td><code>api.clima.com</code></td><td>La dirección del servidor al que le estás hablando — quién responde.</td></tr>
<tr><td>Versión</td><td><code>/v1</code></td><td>Indica qué versión del contrato de la API estás usando. Permite que el proveedor lance <code>/v2</code> con cambios sin romper a los clientes que siguen en <code>/v1</code>.</td></tr>
<tr><td>Recurso</td><td><code>/ciudad/monterrey</code></td><td>El "objeto" concreto que estás pidiendo — en este caso, el clima de la ciudad Monterrey. A esto se le llama <b>recurso</b>.</td></tr>
</table>

<div class="alert-card">💡 <b>Endpoint = URL + método.</b> Técnicamente un endpoint no es solo la URL, es la combinación de la URL con el <b>método HTTP</b> usado (GET, POST, etc.) — verás esto a fondo en el siguiente tema, "HTTP y REST". Por ahora, quédate con la idea de que cada endpoint responde a una pregunta o acción específica.</div>

<div class="concept-intro">Este patrón de "un cliente pregunta, un servidor responde" se repite en capas: tu app de celular es cliente de la API de telemetría, pero esa API de telemetría puede a su vez ser <em>cliente</em> de otra API interna que habla directamente con el vehículo. Un mismo programa puede ser servidor para unos y cliente para otros, dependiendo del rol que juegue en cada llamada.</div>
  </div>
  <div id="apf-3" class="tab-panel">
<div class="concept-intro">No todas las APIs son "una URL en internet". El término API es mucho más amplio — cualquier interfaz definida que permita que un programa use las capacidades de otro cuenta como API. Aquí un panorama general; cada tipo se profundiza en temas posteriores.</div>

<table class="kv-table">
<tr><th>Tipo</th><th>¿Qué es?</th><th>Ejemplo</th></tr>
<tr><td>APIs web (REST)</td><td>Se comunican por HTTP, normalmente intercambiando JSON. Es el tipo más común hoy en día para conectar apps con servicios remotos.</td><td><code>GET https://api.clima.com/v1/ciudad/monterrey</code></td></tr>
<tr><td>APIs web (GraphQL)</td><td>También sobre HTTP, pero el cliente describe exactamente qué campos de datos quiere en una sola petición, en vez de recibir todo el recurso fijo.</td><td>Pedir solo <code>nombre</code> y <code>temperatura</code> de un vehículo, sin el resto de sus campos.</td></tr>
<tr><td>APIs web (gRPC)</td><td>Comunicación binaria de alto rendimiento entre servicios, muy usada internamente entre microservicios (por ejemplo, entre módulos de un backend de flota).</td><td>Un servicio de rutas llamando al servicio de telemetría dentro del mismo backend.</td></tr>
<tr><td>APIs de sistema operativo</td><td>Funciones que el sistema operativo expone para que los programas pidan recursos (archivos, red, memoria, hardware) sin manejar el hardware directamente.</td><td>Abrir un archivo, crear un socket de red, leer un puerto serial hacia un ECU.</td></tr>
<tr><td>APIs de librerías / frameworks</td><td>El conjunto de funciones y clases que una librería expone para que la uses, sin ver su implementación interna.</td><td>La API de la librería Python <code>requests</code>: <code>requests.get(url)</code>, sin saber cómo abre el socket TCP por dentro.</td></tr>
</table>

<div class="concept-intro">Además del "cómo se comunican", las APIs también se clasifican por <strong>quién puede usarlas</strong>:</div>

<div class="two-col">
  <div class="info-card">
    <h5>APIs internas (privadas)</h5>
    <ul>
      <li>Solo las usan equipos dentro de la misma empresa.</li>
      <li>Ej: la API que conecta el backend de diagnóstico con el backend de flota, ambos del mismo fabricante.</li>
      <li>Pueden cambiar más libremente porque el proveedor controla a todos sus consumidores.</li>
    </ul>
  </div>
  <div class="info-card">
    <h5>APIs de partner</h5>
    <ul>
      <li>Se comparten con socios de negocio específicos, bajo acuerdo y credenciales controladas.</li>
      <li>Ej: un fabricante de autos que da acceso a su API de telemetría a una aseguradora aliada, para calcular pólizas basadas en manejo real.</li>
    </ul>
  </div>
</div>

<div class="alert-card">🌐 <b>APIs públicas.</b> Cualquier desarrollador se puede registrar y usarlas, normalmente con una <b>API key</b> (una credencial que identifica quién hace la llamada) y límites de uso. Ejemplos: la API de clima de OpenWeather, la API de mapas de Google, o APIs públicas de datos vehiculares como NHTSA (recalls y especificaciones de vehículos en EE.UU.). Este es el tipo de API con el que más vas a practicar, porque no requiere pertenecer a ninguna empresa para probarla.</div>
  </div>
</div>
`,

'api-http': `
<div class="tab-group-aph">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'aph-1','aph')">Métodos HTTP</button>
    <button class="tab-btn" onclick="switchTab(this,'aph-2','aph')">Códigos de estado</button>
    <button class="tab-btn" onclick="switchTab(this,'aph-3','aph')">¿Qué hace a una API REST?</button>
  </div>
  <div id="aph-1" class="tab-panel active">
<div class="concept-intro"><strong>HTTP</strong> (HyperText Transfer Protocol) es el "idioma" que hablan cliente y servidor cuando se comunican por la web — es el protocolo que define cómo se ve una petición y cómo se ve una respuesta. Cada petición HTTP incluye un <strong>método</strong> (también llamado "verbo"), que le dice al servidor qué <em>intención</em> tiene el cliente: ¿quiere leer algo? ¿crear algo? ¿borrar algo? El método es tan importante como la URL misma.</div>

<table class="kv-table">
<tr><th>Método</th><th>¿Qué hace?</th><th>Ejemplo</th><th>¿Lleva body?</th></tr>
<tr><td><code>GET</code></td><td>Leer / obtener un recurso, sin modificar nada en el servidor.</td><td><code>GET /vehiculos/42</code> → obtener los datos del vehículo con id 42.</td><td>No</td></tr>
<tr><td><code>POST</code></td><td>Crear un recurso nuevo (o ejecutar una acción que no encaja en los otros verbos).</td><td><code>POST /vehiculos</code> con los datos del vehículo nuevo → lo crea y regresa su id.</td><td>Sí</td></tr>
<tr><td><code>PUT</code></td><td>Reemplazar por completo un recurso existente con los datos enviados.</td><td><code>PUT /vehiculos/42</code> con TODOS los campos → sobreescribe el vehículo 42 entero.</td><td>Sí</td></tr>
<tr><td><code>PATCH</code></td><td>Actualizar parcialmente un recurso — solo los campos enviados cambian, el resto queda igual.</td><td><code>PATCH /vehiculos/42</code> con <code>{"kilometraje": 15000}</code> → solo cambia el kilometraje.</td><td>Sí</td></tr>
<tr><td><code>DELETE</code></td><td>Eliminar un recurso existente.</td><td><code>DELETE /vehiculos/42</code> → borra el vehículo 42.</td><td>Normalmente no</td></tr>
</table>

<div class="alert-card">💡 <b>PUT vs PATCH, la confusión más común.</b> <code>PUT</code> reemplaza el recurso <b>completo</b> — si se te olvida mandar un campo, ese campo puede quedar borrado o reseteado a su valor por defecto. <code>PATCH</code> solo toca los campos que mandas explícitamente. Regla práctica: si vas a actualizar un solo campo (como el kilometraje de un vehículo), usa <code>PATCH</code>; si vas a reemplazar el objeto entero, usa <code>PUT</code>.</div>

<div class="concept-intro"><strong>¿Qué es el "body"?</strong> Es la parte de la petición donde va la información que estás enviando — normalmente en formato JSON. <code>GET</code> no lleva body porque solo está pidiendo leer, no manda datos nuevos (si necesita filtrar algo, usa parámetros en la URL, que verás en el siguiente tema). <code>POST</code>, <code>PUT</code> y <code>PATCH</code> sí llevan body porque están enviando datos que el servidor debe guardar.</div>

<div class="code-block"><div class="code-lang">Ejemplo — mismo recurso, distintos métodos</div><pre>
<span class="c-cm"># Leer el vehículo 42</span>
GET /vehiculos/42

<span class="c-cm"># Crear un vehículo nuevo</span>
POST /vehiculos
Body: {<span class="c-st">"placa"</span>: <span class="c-st">"ABC-123"</span>, <span class="c-st">"modelo"</span>: <span class="c-st">"Sedan 2024"</span>}

<span class="c-cm"># Actualizar SOLO el kilometraje del vehículo 42</span>
PATCH /vehiculos/42
Body: {<span class="c-st">"kilometraje"</span>: <span class="c-nb">15000</span>}

<span class="c-cm"># Borrar el vehículo 42</span>
DELETE /vehiculos/42</pre></div>
  </div>
  <div id="aph-2" class="tab-panel">
<div class="concept-intro">Cada respuesta HTTP incluye un <strong>código de estado</strong>: un número de tres dígitos que resume, en una sola cifra, qué pasó con la petición. El primer dígito indica la "familia" del resultado — aprenderte esas familias te permite entender cualquier código nuevo que veas, aunque no lo hayas memorizado.</div>

<table class="kv-table">
<tr><th>Familia</th><th>Significado general</th></tr>
<tr><td><code>2xx</code></td><td>Éxito — la petición se procesó correctamente.</td></tr>
<tr><td><code>3xx</code></td><td>Redirección — el recurso está en otro lado, sigue esa otra URL.</td></tr>
<tr><td><code>4xx</code></td><td>Error del cliente — tú (quien llama) hiciste algo mal: URL inválida, datos faltantes, sin permiso, etc.</td></tr>
<tr><td><code>5xx</code></td><td>Error del servidor — el servidor falló procesando una petición que en principio estaba bien hecha.</td></tr>
</table>

<div class="concept-intro">Estos son los que vas a ver constantemente en la práctica — vale la pena memorizarlos:</div>

<table class="kv-table">
<tr><th>Código</th><th>Significado</th><th>¿Cuándo lo ves?</th></tr>
<tr><td><code>200 OK</code></td><td>Todo salió bien.</td><td>Un <code>GET</code> exitoso — el recurso pedido viene en la respuesta.</td></tr>
<tr><td><code>201 Created</code></td><td>Se creó un recurso nuevo.</td><td>Respuesta típica de un <code>POST</code> exitoso; suele incluir el id del recurso creado.</td></tr>
<tr><td><code>204 No Content</code></td><td>Éxito, pero no hay nada que devolver en el body.</td><td>Respuesta típica de un <code>DELETE</code> exitoso.</td></tr>
<tr><td><code>400 Bad Request</code></td><td>La petición está mal formada.</td><td>Mandaste JSON inválido, falta un campo obligatorio, un tipo de dato incorrecto.</td></tr>
<tr><td><code>401 Unauthorized</code></td><td>No te identificaste (o tus credenciales son inválidas).</td><td>Falta el header de autenticación, o el token expiró.</td></tr>
<tr><td><code>403 Forbidden</code></td><td>Te identificaste, pero no tienes permiso para esto.</td><td>Un usuario normal intentando acceder a un endpoint solo de administradores.</td></tr>
<tr><td><code>404 Not Found</code></td><td>El recurso no existe.</td><td><code>GET /vehiculos/9999</code> cuando ese id no existe en la base de datos.</td></tr>
<tr><td><code>429 Too Many Requests</code></td><td>Excediste el límite de peticiones permitidas (rate limit).</td><td>Llamar a una API pública demasiadas veces por segundo/minuto.</td></tr>
<tr><td><code>500 Internal Server Error</code></td><td>El servidor tuvo un error inesperado.</td><td>Una excepción no manejada dentro del código del servidor — un bug del lado del servicio.</td></tr>
<tr><td><code>503 Service Unavailable</code></td><td>El servidor está temporalmente fuera de servicio.</td><td>Mantenimiento, sobrecarga, o el servicio caído momentáneamente.</td></tr>
</table>

<div class="alert-card">💡 <b>401 vs 403, la confusión más común.</b> <code>401</code> significa "no sé quién eres" (no te autenticaste o tu credencial no es válida). <code>403</code> significa "sé quién eres, pero no tienes permiso para hacer esto" (ya te autenticaste, pero tu rol no lo permite). Es un clásico de entrevista distinguir <b>autenticación</b> (quién eres) de <b>autorización</b> (qué puedes hacer).</div>
  </div>
  <div id="aph-3" class="tab-panel">
<div class="concept-intro"><strong>REST</strong> (Representational State Transfer) no es una tecnología ni una librería — es un <strong>estilo de diseño</strong>, un conjunto de convenciones para diseñar APIs web de forma consistente y predecible. Una API "es RESTful" cuando sigue estos principios prácticos:</div>

<div class="two-col">
  <div class="info-card">
    <h5>1. Recursos identificados por URL</h5>
    <ul>
      <li>Cada "cosa" (un usuario, un vehículo, una orden) tiene su propia URL única, normalmente un sustantivo: <code>/vehiculos/42</code>.</li>
      <li>La URL identifica <b>qué</b> cosa quieres, no <b>qué acción</b> hacer — la acción la dice el método HTTP.</li>
    </ul>
  </div>
  <div class="info-card">
    <h5>2. Sin estado (stateless)</h5>
    <ul>
      <li>Cada petición debe traer toda la información necesaria para procesarse (incluida la autenticación).</li>
      <li>El servidor no "recuerda" peticiones anteriores de ese mismo cliente entre una llamada y otra.</li>
    </ul>
  </div>
  <div class="info-card">
    <h5>3. Verbos HTTP usados correctamente</h5>
    <ul>
      <li><code>GET</code> para leer, <code>POST</code> para crear, <code>PUT</code>/<code>PATCH</code> para actualizar, <code>DELETE</code> para borrar.</li>
      <li>La acción vive en el método, nunca en la URL.</li>
    </ul>
  </div>
  <div class="info-card">
    <h5>4. Representación uniforme (JSON)</h5>
    <ul>
      <li>Los recursos se representan casi siempre en <b>JSON</b>, un formato de texto legible por humanos y fácil de parsear por máquinas.</li>
      <li>Mismo formato de entrada y salida en toda la API — consistencia.</li>
    </ul>
  </div>
</div>

<div class="concept-intro">La regla de oro para detectar una API mal diseñada: si la <em>acción</em> que quieres hacer está escrita como texto dentro de la URL en vez de expresarse con el método HTTP, algo está mal.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto (no-RESTful)</div><pre>
POST /getUsuario?id=42

POST /borrarVehiculo?id=42

POST /actualizarKilometraje?id=42&km=15000</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto (RESTful)</div><pre>
GET /usuarios/42

DELETE /vehiculos/42

PATCH /vehiculos/42
Body: {"kilometraje": 15000}</pre></div>
</div>
<div class="error-note"><b>Por qué:</b> en el ejemplo incorrecto, la acción ("get", "borrar", "actualizar") vive como texto dentro de la URL, y todo se manda con <code>POST</code> sin importar qué se está haciendo. Esto rompe la convención: quien lee <code>POST /getUsuario?id=42</code> no puede saber, solo con ver el método, si esa llamada es segura de repetir o si tiene efectos secundarios. En el diseño RESTful, la URL identifica el recurso (<code>/usuarios/42</code>) y el método HTTP dice la intención (<code>GET</code> = leer, sin efectos secundarios). Esto también habilita optimizaciones automáticas: los navegadores y proxies saben que un <code>GET</code> se puede cachear (guardar en caché) sin riesgo, porque por definición no modifica nada — algo que jamás podrían asumir de un <code>POST</code>.</div>

<div class="alert-card">🔧 <b>Nota práctica:</b> en el mundo real vas a encontrar muchísimas APIs que se llaman "REST" pero no cumplen todos estos principios al pie de la letra — y está bien. REST es una guía de buen diseño, no una ley estricta. Lo importante es entender el razonamiento detrás de cada regla para reconocer cuándo una API es fácil de usar y predecible, y cuándo no.</div>
  </div>
</div>
`,

'api-consumir': `
<div class="tab-group-apc">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'apc-1','apc')">Tu primera llamada</button>
    <button class="tab-btn" onclick="switchTab(this,'apc-2','apc')">Query params, headers y POST</button>
    <button class="tab-btn" onclick="switchTab(this,'apc-3','apc')">Manejo de errores</button>
  </div>
  <div id="apc-1" class="tab-panel active">
<div class="concept-intro">Para "hablarle" a una API desde Python se usa una librería llamada <code>requests</code> — no viene incluida por defecto, se instala con <code>pip install requests</code>. Su trabajo es armar la petición HTTP (URL + método + headers + body), enviarla por la red, y darte de vuelta un objeto <code>Response</code> con todo lo que contestó el servidor.</div>

<div class="code-block"><div class="code-lang">Python — GET simple, paso a paso</div><pre>
<span class="c-kw">import</span> requests

<span class="c-cm"># 1. Hacemos la petición GET a un endpoint</span>
response = requests.<span class="c-fn">get</span>(<span class="c-st">"https://api.clima.com/v1/ciudad/monterrey"</span>)

<span class="c-cm"># 2. response.status_code trae el código HTTP que ya conoces (200, 404, 500...)</span>
<span class="c-bi">print</span>(response.status_code)   <span class="c-cm"># 200</span>

<span class="c-cm"># 3. response.json() convierte el body (texto JSON) en un dict/list de Python</span>
<span class="c-kw">if</span> response.status_code == <span class="c-nb">200</span>:
    data = response.json()
    <span class="c-bi">print</span>(data[<span class="c-st">"temperatura"</span>])   <span class="c-cm"># ej: 24.5</span>
    <span class="c-bi">print</span>(data[<span class="c-st">"ciudad"</span>])        <span class="c-cm"># ej: "Monterrey"</span>
<span class="c-kw">else</span>:
    <span class="c-bi">print</span>(<span class="c-st">f"Algo salió mal: {response.status_code}"</span>)</pre></div>

<div class="concept-intro">Desglosemos el objeto <code>response</code>, porque lo vas a usar constantemente:</div>

<table class="kv-table">
<tr><th>Atributo / método</th><th>¿Qué es?</th></tr>
<tr><td><code>response.status_code</code></td><td>El código HTTP como número entero (<code>200</code>, <code>404</code>, etc.). Úsalo para decidir si la petición fue exitosa.</td></tr>
<tr><td><code>response.json()</code></td><td><b>Método</b> (nota los paréntesis) que parsea el body como JSON y lo convierte en un dict/list de Python. Falla si el body no es JSON válido.</td></tr>
<tr><td><code>response.text</code></td><td>El body de la respuesta como texto plano (string), sin parsear. Útil para depurar cuando <code>.json()</code> falla.</td></tr>
<tr><td><code>response.headers</code></td><td>Un dict con los headers que mandó el servidor (ej: <code>Content-Type</code>).</td></tr>
<tr><td><code>response.ok</code></td><td><code>True</code> si el status code fue 2xx, <code>False</code> en cualquier otro caso. Atajo rápido para checar éxito.</td></tr>
</table>

<div class="alert-card">💡 <b>Nota importante:</b> <code>response.json()</code> es un <b>método</b>, no un atributo — siempre lleva paréntesis: <code>response.json()</code>. Es uno de los errores más comunes de quien empieza: olvidar los paréntesis y quedarse con una referencia a la función en vez del dato ya parseado.</div>
  </div>
  <div id="apc-2" class="tab-panel">
<div class="concept-intro">Una petición real casi nunca es solo "la URL pelona". Normalmente necesitas mandar información extra: filtros en la URL (<strong>query params</strong>), credenciales o metadatos (<strong>headers</strong>), y datos para crear/actualizar algo (<strong>body</strong>). Vamos con un ejemplo con una API ficticia de diagnóstico vehicular.</div>

<div class="code-block"><div class="code-lang">Python — Query params (filtros en la URL)</div><pre>
<span class="c-kw">import</span> requests

<span class="c-cm"># En vez de armar la URL a mano con "?vin=...&desde=...",</span>
<span class="c-cm"># pásale un dict a "params" y requests arma el query string por ti</span>
response = requests.<span class="c-fn">get</span>(
    <span class="c-st">"https://api.diagnostico-flota.com/v1/vehiculos"</span>,
    params={<span class="c-st">"vin"</span>: <span class="c-st">"1HGCM82633A004352"</span>, <span class="c-st">"desde"</span>: <span class="c-st">"2026-01-01"</span>}
)
<span class="c-cm"># La URL real que se envía queda así:</span>
<span class="c-cm"># https://api.diagnostico-flota.com/v1/vehiculos?vin=1HGCM82633A004352&desde=2026-01-01</span>
<span class="c-bi">print</span>(response.url)   <span class="c-cm"># requests te deja ver la URL final armada</span></pre></div>

<div class="code-block"><div class="code-lang">Python — Headers (ej: autenticación)</div><pre>
<span class="c-cm"># Muchas APIs requieren identificarte con una API key o un token</span>
<span class="c-cm"># en un header, casi siempre "Authorization"</span>
headers = {
    <span class="c-st">"Authorization"</span>: <span class="c-st">f"Bearer {API_TOKEN}"</span>,
    <span class="c-st">"Accept"</span>: <span class="c-st">"application/json"</span>   <span class="c-cm"># "quiero la respuesta en JSON"</span>
}

response = requests.<span class="c-fn">get</span>(
    <span class="c-st">"https://api.diagnostico-flota.com/v1/vehiculos/42/dtc"</span>,   <span class="c-cm"># DTC = Diagnostic Trouble Codes</span>
    headers=headers
)
<span class="c-kw">if</span> response.status_code == <span class="c-nb">200</span>:
    codigos_falla = response.json()
    <span class="c-bi">print</span>(codigos_falla)   <span class="c-cm"># ej: [{"codigo": "P0301", "descripcion": "Falla de encendido cilindro 1"}]</span></pre></div>

<div class="code-block"><div class="code-lang">Python — POST con body JSON</div><pre>
<span class="c-cm"># Para crear/enviar datos, se usa POST con el argumento "json="</span>
<span class="c-cm"># requests convierte el dict a JSON automáticamente y pone el header</span>
<span class="c-cm"># Content-Type: application/json por ti</span>
nuevo_diagnostico = {
    <span class="c-st">"vin"</span>: <span class="c-st">"1HGCM82633A004352"</span>,
    <span class="c-st">"codigo_falla"</span>: <span class="c-st">"P0301"</span>,
    <span class="c-st">"kilometraje"</span>: <span class="c-nb">15000</span>,
    <span class="c-st">"severidad"</span>: <span class="c-st">"media"</span>
}

response = requests.<span class="c-fn">post</span>(
    <span class="c-st">"https://api.diagnostico-flota.com/v1/diagnosticos"</span>,
    headers=headers,
    json=nuevo_diagnostico
)

<span class="c-kw">if</span> response.status_code == <span class="c-nb">201</span>:   <span class="c-cm"># 201 Created</span>
    creado = response.json()
    <span class="c-bi">print</span>(<span class="c-st">f"Diagnóstico creado con id {creado['id']}"</span>)</pre></div>

<table class="kv-table">
<tr><th>Argumento de requests</th><th>¿Para qué es?</th><th>¿Dónde termina viajando?</th></tr>
<tr><td><code>params=</code></td><td>Filtros/valores opcionales de una consulta.</td><td>Se agregan a la URL después de <code>?</code>.</td></tr>
<tr><td><code>headers=</code></td><td>Metadatos de la petición: autenticación, formato esperado, etc.</td><td>Van en los headers HTTP, separados de la URL y del body.</td></tr>
<tr><td><code>json=</code></td><td>Datos a crear/enviar, como un dict de Python.</td><td>Se serializa a texto JSON y va en el body de la petición.</td></tr>
</table>
  </div>
  <div id="apc-3" class="tab-panel">
<div class="concept-intro">Cuando consumes una API real, muchas cosas pueden salir mal <em>fuera</em> de tu control: la red puede fallar, el servidor puede tardar demasiado, puede devolver un error, o puede devolver algo que no es el JSON que esperabas. Un código "de entrevista" que solo hace <code>requests.get(url).json()</code> sin manejar nada de esto se va a caer en producción tarde o temprano.</div>

<table class="kv-table">
<tr><th>Qué puede fallar</th><th>Qué pasa</th><th>Cómo se detecta</th></tr>
<tr><td>Timeout</td><td>El servidor tarda tanto en responder que ya no vale la pena esperar.</td><td><code>requests.exceptions.Timeout</code> (solo si pusiste un <code>timeout=</code> explícito — por defecto <code>requests</code> espera indefinidamente).</td></tr>
<tr><td>Conexión rechazada / sin red</td><td>No se pudo ni establecer la conexión con el servidor.</td><td><code>requests.exceptions.ConnectionError</code></td></tr>
<tr><td>Status 4xx/5xx</td><td>La petición sí llegó y sí hubo respuesta, pero indica un error (no encontrado, sin permiso, error interno, etc.).</td><td><code>response.raise_for_status()</code> lanza <code>requests.exceptions.HTTPError</code> si el código es 4xx o 5xx.</td></tr>
<tr><td>JSON malformado</td><td>El body no es JSON válido (ej: el servidor regresó HTML de una página de error).</td><td><code>requests.exceptions.JSONDecodeError</code> al llamar <code>response.json()</code>.</td></tr>
</table>

<div class="code-block"><div class="code-lang">Python — Patrón robusto completo</div><pre>
<span class="c-kw">import</span> requests

<span class="c-kw">def</span> <span class="c-fn">obtener_diagnostico_vehiculo</span>(vin):
    <span class="c-dc">"""Consulta el estado de diagnóstico de un vehículo por su VIN.
    Regresa el dict de datos, o None si no se pudo obtener."""</span>
    <span class="c-kw">try</span>:
        response = requests.<span class="c-fn">get</span>(
            <span class="c-st">f"https://api.diagnostico-flota.com/v1/vehiculos/{vin}/dtc"</span>,
            headers={<span class="c-st">"Authorization"</span>: <span class="c-st">f"Bearer {API_TOKEN}"</span>},
            timeout=<span class="c-nb">5.0</span>   <span class="c-cm"># nunca dejes una llamada de red sin timeout explícito</span>
        )
        response.raise_for_status()   <span class="c-cm"># lanza HTTPError si status es 4xx/5xx</span>
        <span class="c-kw">return</span> response.json()

    <span class="c-kw">except</span> requests.exceptions.Timeout:
        <span class="c-bi">print</span>(<span class="c-st">"La API tardó demasiado en responder"</span>)
    <span class="c-kw">except</span> requests.exceptions.ConnectionError:
        <span class="c-bi">print</span>(<span class="c-st">"No se pudo conectar al servidor (¿sin red?)"</span>)
    <span class="c-kw">except</span> requests.exceptions.HTTPError <span class="c-kw">as</span> e:
        <span class="c-bi">print</span>(<span class="c-st">f"La API respondió con error: {e.response.status_code}"</span>)
    <span class="c-kw">except</span> requests.exceptions.JSONDecodeError:
        <span class="c-bi">print</span>(<span class="c-st">"La respuesta no vino en JSON válido"</span>)
    <span class="c-kw">except</span> requests.exceptions.RequestException <span class="c-kw">as</span> e:
        <span class="c-cm"># red de seguridad: cualquier otro error de requests que no capturaste arriba</span>
        <span class="c-bi">print</span>(<span class="c-st">f"Error inesperado llamando a la API: {e}"</span>)

    <span class="c-kw">return</span> <span class="c-kw">None</span></pre></div>

<div class="alert-card">💡 <b>Por qué el orden de los <code>except</code> importa:</b> <code>HTTPError</code>, <code>ConnectionError</code> y <code>Timeout</code> son subclases de <code>RequestException</code>. Si pusieras <code>except requests.exceptions.RequestException</code> primero, capturaría todo genéricamente y nunca llegarías a los bloques más específicos de abajo — Python siempre evalúa los <code>except</code> en orden y usa el primero que haga match. Regla general: los <code>except</code> más específicos van primero, el genérico va al final como red de seguridad.</div>

<div class="alert-card">⚠️ <b>El error más común: no poner timeout.</b> Por defecto, <code>requests</code> espera indefinidamente una respuesta. Si el servidor se cuelga, tu programa también se cuelga para siempre. Siempre pasa <code>timeout=</code> (en segundos) a cada llamada — es una de las primeras cosas que revisan en un code review de código que consume APIs.</div>
  </div>
</div>
`,

'api-construir': `
<div class="tab-group-apb">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'apb-1','apb')">Tu primera API con Flask</button>
    <button class="tab-btn" onclick="switchTab(this,'apb-2','apb')">Parámetros y FastAPI</button>
    <button class="tab-btn" onclick="switchTab(this,'apb-3','apb')">Estructura de un proyecto real</button>
  </div>
  <div id="apb-1" class="tab-panel active">
<div class="concept-intro">Una <strong>API</strong> (Application Programming Interface) web no es más que un programa que escucha peticiones HTTP y responde con datos, normalmente en JSON. Construir la tuya no requiere un framework enorme: con <strong>Flask</strong> (un microframework de Python) puedes tener un endpoint funcionando en menos de 10 líneas. Es el punto de partida ideal para entender qué hace "por debajo" cualquier framework más grande antes de saltar a algo como FastAPI o Django REST.</div>
<div class="code-block"><div class="code-lang">Terminal — instalación y ejecución</div><pre>
<span class="c-cm"># 1. Crea y activa un entorno virtual (recomendado, evita mezclar dependencias globales)</span>
python -m venv venv
venv\Scripts\activate          <span class="c-cm"># Windows</span>
<span class="c-cm"># source venv/bin/activate     # macOS/Linux</span>

<span class="c-cm"># 2. Instala Flask dentro del entorno</span>
pip install flask

<span class="c-cm"># 3. Corre el archivo (una vez que tengas app.py, ver abajo)</span>
python app.py
<span class="c-cm"># * Running on http://127.0.0.1:5000</span></pre></div>
<div class="code-block"><div class="code-lang">app.py — API mínima que devuelve JSON</div><pre>
<span class="c-kw">from</span> flask <span class="c-kw">import</span> Flask, jsonify

<span class="c-cm"># Flask(__name__) crea la instancia de la aplicación; __name__ le dice</span>
<span class="c-cm"># a Flask dónde buscar archivos estáticos/templates relativos a este módulo</span>
app = Flask(__name__)

<span class="c-cm"># En una app real esto vendría de una base de datos; aquí lo simulamos en memoria</span>
vehiculos = [
    {<span class="c-st">"id"</span>: <span class="c-nb">1</span>, <span class="c-st">"placa"</span>: <span class="c-st">"ABC-123"</span>, <span class="c-st">"modelo"</span>: <span class="c-st">"Sprinter 2022"</span>},
    {<span class="c-st">"id"</span>: <span class="c-nb">2</span>, <span class="c-st">"placa"</span>: <span class="c-st">"XYZ-789"</span>, <span class="c-st">"modelo"</span>: <span class="c-st">"Transit 2021"</span>},
]

<span class="c-cm"># @app.route registra esta función como el "handler" de GET /api/vehiculos</span>
<span class="c-dc">@app.route</span>(<span class="c-st">"/api/vehiculos"</span>, methods=[<span class="c-st">"GET"</span>])
<span class="c-kw">def</span> <span class="c-fn">listar_vehiculos</span>():
    <span class="c-cm"># jsonify() convierte la lista/dict de Python a una respuesta HTTP</span>
    <span class="c-cm"># con Content-Type: application/json y serializa el body</span>
    <span class="c-kw">return</span> jsonify(vehiculos)

<span class="c-cm"># __name__ == "__main__" evita que el servidor arranque si este archivo</span>
<span class="c-cm"># se importa como módulo desde otro lado</span>
<span class="c-kw">if</span> __name__ == <span class="c-st">"__main__"</span>:
    app.run(debug=<span class="c-kw">True</span>, port=<span class="c-nb">5000</span>)  <span class="c-cm"># debug=True: recarga automática + traceback; SOLO en desarrollo</span></pre></div>
<div class="code-block"><div class="code-lang">Probar el endpoint desde otra terminal</div><pre>
curl http://127.0.0.1:5000/api/vehiculos

<span class="c-cm"># respuesta:</span>
<span class="c-cm"># [{"id":1,"placa":"ABC-123","modelo":"Sprinter 2022"}, {"id":2,"placa":"XYZ-789","modelo":"Transit 2021"}]</span></pre></div>
<div class="alert-card">💡 <code>debug=True</code> es cómodo en desarrollo (recarga el servidor solo, muestra tracebacks detallados) pero es un riesgo de seguridad grave en producción: expone un debugger interactivo que permite ejecutar código arbitrario en el servidor. En producción se usa un servidor WSGI real (gunicorn, uwsgi) y <code>debug=False</code>.</div>
  </div>
  <div id="apb-2" class="tab-panel">
<div class="concept-intro">Un endpoint real casi nunca solo devuelve una lista fija: necesita recibir <strong>datos de entrada</strong>. Hay tres formas principales de recibirlos — parámetros en la ruta (path params), parámetros en la query string, y un cuerpo JSON en el request (típico de POST/PUT). Aquí se muestran las tres con Flask, y luego el mismo ejemplo con <strong>FastAPI</strong>, el framework moderno que valida los datos automáticamente usando type hints de Python.</div>
<div class="code-block"><div class="code-lang">Flask — path param, query param y body JSON</div><pre>
<span class="c-kw">from</span> flask <span class="c-kw">import</span> Flask, jsonify, request

app = Flask(__name__)
flota = {
    <span class="c-nb">1</span>: {<span class="c-st">"id"</span>: <span class="c-nb">1</span>, <span class="c-st">"placa"</span>: <span class="c-st">"ABC-123"</span>, <span class="c-st">"estado"</span>: <span class="c-st">"activo"</span>},
}

<span class="c-cm"># Path param: &lt;int:vehiculo_id&gt; hace que Flask convierta ese segmento a int</span>
<span class="c-cm"># y devuelva 404 automáticamente si alguien manda algo que no es un entero</span>
<span class="c-dc">@app.route</span>(<span class="c-st">"/api/vehiculos/&lt;int:vehiculo_id&gt;"</span>, methods=[<span class="c-st">"GET"</span>])
<span class="c-kw">def</span> <span class="c-fn">obtener_vehiculo</span>(vehiculo_id):
    vehiculo = flota.get(vehiculo_id)
    <span class="c-kw">if</span> vehiculo <span class="c-kw">is</span> <span class="c-kw">None</span>:
        <span class="c-kw">return</span> jsonify({<span class="c-st">"error"</span>: <span class="c-st">"vehiculo no encontrado"</span>}), <span class="c-nb">404</span>
    <span class="c-kw">return</span> jsonify(vehiculo)

<span class="c-cm"># Query param: /api/vehiculos?estado=activo</span>
<span class="c-dc">@app.route</span>(<span class="c-st">"/api/vehiculos"</span>, methods=[<span class="c-st">"GET"</span>])
<span class="c-kw">def</span> <span class="c-fn">listar_vehiculos</span>():
    estado = request.args.get(<span class="c-st">"estado"</span>)  <span class="c-cm"># None si no viene en la URL</span>
    resultado = <span class="c-bi">list</span>(flota.values())
    <span class="c-kw">if</span> estado:
        resultado = [v <span class="c-kw">for</span> v <span class="c-kw">in</span> resultado <span class="c-kw">if</span> v[<span class="c-st">"estado"</span>] == estado]
    <span class="c-kw">return</span> jsonify(resultado)

<span class="c-cm"># Body JSON en un POST — crea un vehiculo nuevo</span>
<span class="c-dc">@app.route</span>(<span class="c-st">"/api/vehiculos"</span>, methods=[<span class="c-st">"POST"</span>])
<span class="c-kw">def</span> <span class="c-fn">crear_vehiculo</span>():
    data = request.get_json(silent=<span class="c-kw">True</span>)  <span class="c-cm"># parsea el body; None si no es JSON válido</span>
    <span class="c-kw">if</span> <span class="c-kw">not</span> data <span class="c-kw">or</span> <span class="c-st">"placa"</span> <span class="c-kw">not</span> <span class="c-kw">in</span> data:
        <span class="c-kw">return</span> jsonify({<span class="c-st">"error"</span>: <span class="c-st">"falta el campo 'placa'"</span>}), <span class="c-nb">400</span>
    nuevo_id = <span class="c-bi">max</span>(flota.keys(), default=<span class="c-nb">0</span>) + <span class="c-nb">1</span>
    flota[nuevo_id] = {<span class="c-st">"id"</span>: nuevo_id, **data}
    <span class="c-kw">return</span> jsonify(flota[nuevo_id]), <span class="c-nb">201</span>  <span class="c-cm"># 201 Created</span></pre></div>
<div class="code-block"><div class="code-lang">FastAPI — el mismo ejemplo, con validación automática</div><pre>
<span class="c-kw">from</span> fastapi <span class="c-kw">import</span> FastAPI, HTTPException
<span class="c-kw">from</span> pydantic <span class="c-kw">import</span> BaseModel

app = FastAPI()
flota: <span class="c-bi">dict</span>[<span class="c-bi">int</span>, <span class="c-st">"Vehiculo"</span>] = {}

<span class="c-cm"># Pydantic valida tipos y campos requeridos automáticamente a partir de esta clase</span>
<span class="c-kw">class</span> <span class="c-fn">Vehiculo</span>(BaseModel):
    placa: <span class="c-bi">str</span>
    estado: <span class="c-bi">str</span> = <span class="c-st">"activo"</span>  <span class="c-cm"># valor por defecto si no viene en el body</span>

<span class="c-dc">@app.get</span>(<span class="c-st">"/api/vehiculos/{vehiculo_id}"</span>)
<span class="c-kw">def</span> <span class="c-fn">obtener_vehiculo</span>(vehiculo_id: <span class="c-bi">int</span>):  <span class="c-cm"># el type hint "int" ya valida/convierte</span>
    <span class="c-kw">if</span> vehiculo_id <span class="c-kw">not</span> <span class="c-kw">in</span> flota:
        <span class="c-kw">raise</span> HTTPException(status_code=<span class="c-nb">404</span>, detail=<span class="c-st">"vehiculo no encontrado"</span>)
    <span class="c-kw">return</span> flota[vehiculo_id]

<span class="c-dc">@app.get</span>(<span class="c-st">"/api/vehiculos"</span>)
<span class="c-kw">def</span> <span class="c-fn">listar_vehiculos</span>(estado: <span class="c-bi">str</span> | <span class="c-kw">None</span> = <span class="c-kw">None</span>):  <span class="c-cm"># query param inferido del parámetro</span>
    resultado = <span class="c-bi">list</span>(flota.values())
    <span class="c-kw">if</span> estado:
        resultado = [v <span class="c-kw">for</span> v <span class="c-kw">in</span> resultado <span class="c-kw">if</span> v.estado == estado]
    <span class="c-kw">return</span> resultado

<span class="c-dc">@app.post</span>(<span class="c-st">"/api/vehiculos"</span>, status_code=<span class="c-nb">201</span>)
<span class="c-kw">def</span> <span class="c-fn">crear_vehiculo</span>(vehiculo: Vehiculo):  <span class="c-cm"># si el body no cumple el schema, FastAPI responde 422 solo</span>
    nuevo_id = <span class="c-bi">max</span>(flota.keys(), default=<span class="c-nb">0</span>) + <span class="c-nb">1</span>
    flota[nuevo_id] = vehiculo
    <span class="c-kw">return</span> vehiculo

<span class="c-cm"># Se corre con: pip install fastapi uvicorn && uvicorn main:app --reload</span></pre></div>
<table class="kv-table">
<tr><th>Aspecto</th><th>Flask</th><th>FastAPI</th></tr>
<tr><td>Validación de datos</td><td>Manual (revisar cada campo a mano)</td><td>Automática, a partir de type hints y modelos Pydantic</td></tr>
<tr><td>Documentación</td><td>Requiere una librería aparte (ej. Flask-Smorest)</td><td>Generada sola en /docs (Swagger UI)</td></tr>
<tr><td>Async nativo</td><td>Limitado (requiere extensiones)</td><td>Soporte nativo con <code>async def</code></td></tr>
<tr><td>Curva de aprendizaje</td><td>Muy baja, minimalista</td><td>Un poco mayor por Pydantic, pero se paga sola rápido</td></tr>
<tr><td>Cuándo usarlo</td><td>Prototipos rápidos, apps pequeñas, máxima simplicidad</td><td>APIs de producción donde la validación y la documentación importan</td></tr>
</table>
  </div>
  <div id="apb-3" class="tab-panel">
<div class="concept-intro">El ejemplo de un solo archivo funciona para aprender, pero una API real crece rápido: rutas, modelos de datos, lógica de negocio y configuración se mezclan si no se organizan desde el principio. Estos tres hábitos son los que separan un prototipo de un proyecto mantenible.</div>
<div class="code-block"><div class="code-lang">Estructura típica de carpetas</div><pre>
mi_api/
├── app/
│   ├── __init__.py        <span class="c-cm"># crea y configura la instancia de la app (factory)</span>
│   ├── routes/             <span class="c-cm"># solo definen endpoints, reciben input, llaman a services/</span>
│   │   ├── vehiculos.py
│   │   └── telemetria.py
│   ├── models/              <span class="c-cm"># clases/schemas de datos (Pydantic, SQLAlchemy...)</span>
│   │   └── vehiculo.py
│   ├── services/             <span class="c-cm"># lógica de negocio real: nada de HTTP aquí</span>
│   │   └── flota_service.py
│   └── errors.py              <span class="c-cm"># manejo de errores centralizado</span>
├── tests/
│   └── test_vehiculos.py
├── .env                         <span class="c-cm"># secretos/config local — NUNCA se sube a git</span>
├── .env.example                  <span class="c-cm"># plantilla sin valores reales, sí se sube</span>
├── .gitignore                     <span class="c-cm"># incluye .env, __pycache__/, venv/</span>
└── requirements.txt</pre></div>
<div class="plan-card">
  <div class="plan-card-title">Tres decisiones que mantienen una API creciendo sin volverse un caos</div>
  <div class="plan-block">
    <div class="plan-time">Separación de responsabilidades</div>
    <div class="plan-content">
      <h4>Rutas, modelos y lógica de negocio en archivos distintos</h4>
      <p>Una función de ruta (<code>routes/</code>) solo debería: leer el input, llamar a una función de <code>services/</code>, y formatear la respuesta. Toda la lógica real (calcular algo, validar reglas de negocio, hablar con la base de datos) vive en <code>services/</code>. Esto permite testear la lógica de negocio con pruebas unitarias normales, sin necesidad de levantar un servidor HTTP para cada test.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Variables de entorno</div>
    <div class="plan-content">
      <h4>La configuración y los secretos nunca van en el código</h4>
      <p>URLs de base de datos, API keys de terceros, y cualquier valor que cambie entre desarrollo/staging/producción se leen de variables de entorno (<code>os.environ</code>, o la librería <code>python-dotenv</code> para cargarlas desde un archivo <code>.env</code> en desarrollo). El archivo <code>.env</code> va en <code>.gitignore</code>; se sube un <code>.env.example</code> con los nombres de las variables pero sin valores reales, como documentación para el siguiente desarrollador.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Manejo de errores centralizado</div>
    <div class="plan-content">
      <h4>Un solo formato de error JSON para toda la API</h4>
      <p>En vez de que cada endpoint invente su propio formato de error, se define un handler global que captura las excepciones y siempre responde con la misma forma, por ejemplo <code>{"error": {"code": "NOT_FOUND", "message": "..."}}</code>. Así los clientes de la API escriben un solo parser de errores, en vez de uno distinto por endpoint.</p>
    </div>
  </div>
</div>
<div class="code-block"><div class="code-lang">Flask — handler de errores centralizado</div><pre>
<span class="c-kw">from</span> flask <span class="c-kw">import</span> jsonify

<span class="c-dc">@app.errorhandler</span>(<span class="c-nb">404</span>)
<span class="c-kw">def</span> <span class="c-fn">no_encontrado</span>(e):
    <span class="c-kw">return</span> jsonify({<span class="c-st">"error"</span>: {<span class="c-st">"code"</span>: <span class="c-st">"NOT_FOUND"</span>, <span class="c-st">"message"</span>: <span class="c-st">"El recurso no existe"</span>}}), <span class="c-nb">404</span>

<span class="c-dc">@app.errorhandler</span>(Exception)
<span class="c-kw">def</span> <span class="c-fn">error_generico</span>(e):
    <span class="c-cm"># captura cualquier excepción no manejada: nunca se filtra un traceback crudo al cliente</span>
    <span class="c-kw">return</span> jsonify({<span class="c-st">"error"</span>: {<span class="c-st">"code"</span>: <span class="c-st">"INTERNAL_ERROR"</span>, <span class="c-st">"message"</span>: <span class="c-st">"Error interno del servidor"</span>}}), <span class="c-nb">500</span></pre></div>
  </div>
</div>
`,

'api-auth': `
<div class="tab-group-apa">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'apa-1','apa')">API Keys</button>
    <button class="tab-btn" onclick="switchTab(this,'apa-2','apa')">OAuth2 y JWT</button>
    <button class="tab-btn" onclick="switchTab(this,'apa-3','apa')">Rate Limiting y HTTPS</button>
  </div>
  <div id="apa-1" class="tab-panel active">
<div class="concept-intro">Una <strong>API key</strong> es un token secreto — una cadena larga y aleatoria — que identifica a quién hace la petición sin necesidad de un flujo completo de usuario/contraseña. El servidor la usa para autorizar la request y, muchas veces, para medir consumo o aplicar límites por cliente. Es más simple que OAuth2 (no expira sola, no distingue "quién" dentro de una empresa, y si se filtra da acceso total hasta que la revoques a mano) pero sigue siendo la forma más común de proteger APIs internas o de servicio a servicio — por ejemplo, un proveedor de mapas o un servicio interno de telemetría de flota.</div>
<div class="code-block"><div class="code-lang">Cómo se envía una API key</div><pre>
<span class="c-cm"># Opción 1: header Authorization con esquema "Bearer" (la más estándar)</span>
GET /api/telemetria/vehiculo/42 HTTP/1.1
Host: flota.miempresa.com
Authorization: Bearer sk_live_9f8a7b6c5d4e3f2a1b0c

<span class="c-cm"># Opción 2: header propio X-API-Key (común en APIs internas)</span>
GET /api/telemetria/vehiculo/42 HTTP/1.1
Host: flota.miempresa.com
X-API-Key: sk_live_9f8a7b6c5d4e3f2a1b0c

<span class="c-cm"># Desde Python, con la librería requests</span>
<span class="c-kw">import</span> os, requests

api_key = os.environ[<span class="c-st">"FLOTA_API_KEY"</span>]  <span class="c-cm"># nunca hardcodeada, ver abajo</span>
headers = {<span class="c-st">"Authorization"</span>: <span class="c-st">f"Bearer {api_key}"</span>}
resp = requests.get(<span class="c-st">"https://flota.miempresa.com/api/telemetria/vehiculo/42"</span>, headers=headers)</pre></div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
<span class="c-cm"># service.py — la key queda escrita en el código fuente</span>
API_KEY = <span class="c-st">"sk_live_9f8a7b6c5d4e3f2a1b0c"</span>

<span class="c-kw">def</span> <span class="c-fn">obtener_telemetria</span>(vehiculo_id):
    headers = {<span class="c-st">"Authorization"</span>: <span class="c-st">f"Bearer {API_KEY}"</span>}
    <span class="c-cm"># ...</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
<span class="c-cm"># service.py — la key se lee del entorno, nunca vive en el código</span>
<span class="c-kw">import</span> os
API_KEY = os.environ[<span class="c-st">"FLOTA_API_KEY"</span>]

<span class="c-cm"># .env (este archivo va en .gitignore, JAMAS se sube al repo)</span>
<span class="c-cm"># FLOTA_API_KEY=sk_live_9f8a7b6c5d4e3f2a1b0c</span></pre></div>
</div>
<div class="error-note"><b>Por qué:</b> una key hardcodeada queda en el <b>historial de git</b> para siempre, aunque la borres en el commit siguiente — cualquiera con acceso al repo (o a un repo público filtrado por error) puede recuperarla revisando commits viejos. Bots automatizados escanean GitHub buscando patrones de keys expuestas en cuestión de minutos. La solución es siempre la misma: variables de entorno, el archivo con los valores reales en <code>.gitignore</code>, y rotar la key inmediatamente si sospechas que se filtró.</div>
  </div>
  <div id="apa-2" class="tab-panel">
<div class="concept-intro"><strong>OAuth2</strong> es un protocolo para <strong>delegar acceso</strong> sin compartir tu contraseña. Cuando usas "Iniciar sesión con Google" en una app, esa app nunca ve tu contraseña de Google: tú se la apruebas directamente a Google, y Google le entrega a la app un token limitado (con permisos y tiempo de vida acotados) para actuar en tu nombre. Es el mecanismo estándar cuando una API necesita identificar usuarios humanos, a diferencia de las API keys que identifican aplicaciones/servicios.</div>
<div class="pipeline-diagram">
<span class="p-blue">Usuario</span> ──▶ <span class="p-green">Tu App</span> ──▶ <span class="p-amber">Servidor de Autorización (ej. Google)</span>
                                    │
                     (el usuario aprueba el acceso ahí, NO en tu app)
                                    ▼
<span class="p-green">Tu App</span> ◀── redirect con un <span class="p-amber">"authorization code"</span> de un solo uso
                                    │
              (en el backend: tu App intercambia code + client_secret)
                                    ▼
<span class="p-green">Tu App</span> ──▶ <span class="p-amber">Servidor de Autorización</span> ──▶ <span class="p-gray">Access Token (JWT)</span>
                                    │
                                    ▼
<span class="p-green">Tu App</span> ──▶ <span class="p-red">API protegida</span>   (header: Authorization: Bearer &lt;token&gt;)
                                    │
                                    ▼
                       <span class="p-gray">Recurso del usuario devuelto</span></div>
<div class="concept-intro">Un <strong>JWT</strong> (JSON Web Token) es el formato de token más usado como resultado de ese flujo. Es un string con tres partes separadas por puntos: <code>header.payload.signature</code>, cada una codificada en base64url. No está encriptado (cualquiera puede leer el contenido decodificándolo), pero sí está <strong>firmado</strong> — eso significa que el servidor puede verificar que nadie lo alteró, sin tener que consultar una base de datos en cada request.</div>
<table class="kv-table">
<tr><th>Parte</th><th>Contenido</th><th>Ejemplo</th></tr>
<tr><td>Header</td><td>Algoritmo de firma y tipo de token</td><td>{"alg":"HS256","typ":"JWT"}</td></tr>
<tr><td>Payload</td><td>Claims: datos sobre el usuario/sesión (sub, exp, roles...)</td><td>{"sub":"user123","exp":1799999999}</td></tr>
<tr><td>Signature</td><td>Firma criptográfica de header+payload con una clave secreta del servidor</td><td>HMACSHA256(header + "." + payload, secret)</td></tr>
</table>
<div class="code-block"><div class="code-lang">Python — generar y validar un JWT (librería PyJWT)</div><pre>
<span class="c-kw">import</span> jwt

<span class="c-cm"># El servidor firma el token con una clave secreta al emitirlo (login exitoso)</span>
token = jwt.encode(
    {<span class="c-st">"sub"</span>: <span class="c-st">"user123"</span>, <span class="c-st">"exp"</span>: <span class="c-nb">1799999999</span>},  <span class="c-cm"># payload: claims del usuario</span>
    <span class="c-st">"clave-secreta-del-servidor"</span>,
    algorithm=<span class="c-st">"HS256"</span>,
)
<span class="c-cm"># token -> "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMTIzIn0.4f9a..."</span>

<span class="c-cm"># El cliente lo manda en cada request:</span>
<span class="c-cm"># Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...</span>

<span class="c-cm"># El servidor lo valida SIN volver a consultar la base de datos</span>
payload = jwt.decode(token, <span class="c-st">"clave-secreta-del-servidor"</span>, algorithms=[<span class="c-st">"HS256"</span>])
<span class="c-cm"># payload -> {'sub': 'user123', 'exp': 1799999999}</span>
<span class="c-cm"># si alguien alteró el payload, la firma no valida y jwt.decode lanza InvalidSignatureError</span></pre></div>
  </div>
  <div id="apa-3" class="tab-panel">
<div class="concept-intro"><strong>Rate limiting</strong> es limitar cuántas peticiones puede hacer un cliente en una ventana de tiempo, para proteger el servicio de abuso deliberado, bugs que generan loops de requests, o picos de tráfico que tumbarían la base de datos. La estrategia de implementación más común (token bucket) ya se explicó en la sección de Diseño de Sistemas — aquí el foco está en cómo se ve <strong>desde el lado del cliente</strong> que consume una API con rate limiting.</div>
<table class="kv-table">
<tr><th>Header de respuesta</th><th>Significado</th></tr>
<tr><td>X-RateLimit-Limit</td><td>Máximo de requests permitidas en la ventana actual</td></tr>
<tr><td>X-RateLimit-Remaining</td><td>Cuántas requests te quedan antes de ser bloqueado</td></tr>
<tr><td>X-RateLimit-Reset</td><td>Timestamp (o segundos) en que la ventana se reinicia</td></tr>
<tr><td>Retry-After</td><td>Presente en una respuesta 429 — segundos que debes esperar antes de reintentar</td></tr>
</table>
<div class="concept-intro">El código <strong>429 Too Many Requests</strong> significa exactamente eso: no hiciste nada mal en el contenido de la request, simplemente excediste el límite permitido. Un cliente bien construido no debe reintentar inmediatamente (eso empeora el problema) — debe leer <code>Retry-After</code> o los headers <code>X-RateLimit-*</code> y esperar, idealmente con backoff exponencial si el servidor sigue devolviendo 429.</div>
<div class="code-block"><div class="code-lang">Python — cliente con retry y backoff exponencial ante 429</div><pre>
<span class="c-kw">import</span> time, requests

<span class="c-kw">def</span> <span class="c-fn">get_con_retry</span>(url, headers, max_intentos=<span class="c-nb">5</span>):
    espera = <span class="c-nb">1</span>  <span class="c-cm"># segundos; se duplica en cada intento fallido</span>
    <span class="c-kw">for</span> intento <span class="c-kw">in</span> <span class="c-bi">range</span>(max_intentos):
        resp = requests.get(url, headers=headers)

        <span class="c-kw">if</span> resp.status_code == <span class="c-nb">429</span>:
            retry_after = <span class="c-bi">int</span>(resp.headers.get(<span class="c-st">"Retry-After"</span>, espera))
            <span class="c-bi">print</span>(<span class="c-st">f"Rate limited, esperando {retry_after}s..."</span>)
            time.sleep(retry_after)
            espera *= <span class="c-nb">2</span>
            <span class="c-kw">continue</span>

        resp.raise_for_status()
        <span class="c-kw">return</span> resp.json()

    <span class="c-kw">raise</span> RuntimeError(<span class="c-st">"Se agotaron los reintentos por rate limiting"</span>)</pre></div>
<div class="alert-card">💡 HTTPS no es opcional para una API real: sin TLS, la API key, el JWT o cualquier credencial viajan en texto plano por la red, y cualquiera en la misma red (WiFi público, un proxy intermedio, un router comprometido) puede leerlos con un simple sniffer. Servir una API en HTTP plano en producción equivale, en la práctica, a no tener autenticación en absoluto — sin importar cuán fuerte sea el mecanismo de auth que hayas elegido.</div>
  </div>
</div>
`,

'api-diseno': `
<div class="tab-group-apd">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'apd-1','apd')">Versionado y Paginación</button>
    <button class="tab-btn" onclick="switchTab(this,'apd-2','apd')">Idempotencia y Convenciones</button>
    <button class="tab-btn" onclick="switchTab(this,'apd-3','apd')">Documentación (OpenAPI)</button>
  </div>
  <div id="apd-1" class="tab-panel active">
<div class="concept-intro"><strong>Versionar</strong> una API significa exponer explícitamente qué "contrato" está usando cada cliente, para poder cambiar la API sin romper a los que ya la integraron. Si mañana necesitas renombrar un campo, cambiar el formato de una fecha o quitar un endpoint, no puedes simplemente modificarlo: alguna app móvil vieja o un servicio de un tercero sigue esperando el formato anterior. La solución es publicar una versión nueva y mantener la vieja funcionando durante un período de transición (deprecation), no romper a nadie de un día para otro.</div>
<table class="kv-table">
<tr><th>Estrategia</th><th>Ejemplo</th><th>Ventaja / desventaja</th></tr>
<tr><td>En la URL (la más común)</td><td>/api/v1/vehiculos, /api/v2/vehiculos</td><td>Muy visible, fácil de documentar y cachear; técnicamente el mismo recurso queda en dos URLs distintas</td></tr>
<tr><td>En un header custom</td><td>Api-Version: 2</td><td>URLs limpias y estables; menos descubrible, hay que leer la documentación para enterarse</td></tr>
<tr><td>En el header Accept (media type)</td><td>Accept: application/vnd.miapp.v2+json</td><td>El más "correcto" según REST puro; poco usado en la práctica por ser menos intuitivo</td></tr>
<tr><td>Query param</td><td>/api/vehiculos?version=2</td><td>Simple de implementar; fácil de omitir por accidente y caer en el default</td></tr>
</table>
<div class="concept-intro">La <strong>paginación</strong> evita que un endpoint devuelva miles o millones de registros de golpe — algo que satura la memoria del servidor, tarda segundos en serializarse, y que el cliente probablemente ni siquiera necesita completo. Un endpoint como <code>/api/vehiculos/eventos</code> que devuelve "todos" los eventos de una flota sin paginar es una forma casi garantizada de tumbar el servicio en cuanto la flota crece.</div>
<table class="kv-table">
<tr><th>Patrón</th><th>Cómo funciona</th><th>Trade-off</th></tr>
<tr><td>Offset / limit</td><td>?offset=40&amp;limit=20 — "salta 40, dame los siguientes 20"</td><td>Simple e intuitivo, permite saltar a cualquier página; lento en tablas grandes (la BD igual recorre lo saltado) y puede duplicar o saltar registros si se insertan filas entre requests</td></tr>
<tr><td>Cursor-based</td><td>?cursor=eyJpZCI6MTIwfQ&amp;limit=20 — un cursor opaco apunta al último registro visto</td><td>Rápido y estable aunque se inserten/borren filas mientras paginas; no permite saltar directo a una página arbitraria, solo avanzar secuencialmente</td></tr>
</table>
<div class="code-block"><div class="code-lang">Respuesta con paginación cursor-based</div><pre>
GET /api/v1/vehiculos/eventos?limit=2

{
  <span class="c-st">"data"</span>: [
    {<span class="c-st">"id"</span>: <span class="c-nb">118</span>, <span class="c-st">"tipo"</span>: <span class="c-st">"frenado_brusco"</span>},
    {<span class="c-st">"id"</span>: <span class="c-nb">119</span>, <span class="c-st">"tipo"</span>: <span class="c-st">"exceso_velocidad"</span>}
  ],
  <span class="c-st">"pagination"</span>: {
    <span class="c-st">"next_cursor"</span>: <span class="c-st">"eyJpZCI6MTE5fQ=="</span>,
    <span class="c-st">"has_more"</span>: <span class="c-kw">true</span>
  }
}</pre></div>
  </div>
  <div id="apd-2" class="tab-panel">
<div class="concept-intro">Un endpoint es <strong>idempotente</strong> si llamarlo N veces produce exactamente el mismo resultado final que llamarlo una sola vez. Esto importa muchísimo en la práctica: si un cliente hace una request, la red falla, y no sabe si el servidor la procesó o no, la única respuesta segura es <strong>reintentar</strong>. Si el endpoint es idempotente, reintentar es inofensivo. Si no lo es, reintentar puede duplicar un recurso (crear el mismo vehículo dos veces, cobrar dos veces).</div>
<table class="kv-table">
<tr><th>Método</th><th>¿Idempotente?</th><th>Por qué</th></tr>
<tr><td>GET</td><td>Sí</td><td>Solo lee, nunca cambia estado en el servidor</td></tr>
<tr><td>PUT</td><td>Sí</td><td>Reemplaza el recurso completo con el mismo valor — llamarlo 10 veces deja el recurso igual que llamarlo 1 vez</td></tr>
<tr><td>DELETE</td><td>Sí</td><td>Borrar algo que ya no existe deja el recurso igual de "no existente" (aunque el código de respuesta pueda variar entre 204 y 404 según la implementación)</td></tr>
<tr><td>POST</td><td>No</td><td>Por diseño crea un recurso nuevo en cada llamada — llamarlo 2 veces crea 2 recursos duplicados</td></tr>
<tr><td>PATCH</td><td>Depende</td><td>Si aplica un delta relativo ("incrementa el odómetro en 5") NO es idempotente; si aplica un valor absoluto ("pon el odómetro en 10500") sí lo es</td></tr>
</table>
<div class="alert-card">💡 Cuando un POST realmente necesita ser seguro de reintentar (por ejemplo, crear un cobro), el patrón común es un header <code>Idempotency-Key</code>: el cliente genera un id único por operación lógica, y el servidor recuerda qué keys ya procesó — si llega la misma key dos veces, devuelve la respuesta guardada de la primera vez en vez de repetir la acción.</div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
GET  /api/getVehiculos
POST /api/crearVehiculo
GET  /api/vehiculo/42/obtenerEventos
DELETE /api/borrar_vehiculo?id=42</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
GET    /api/vehiculos
POST   /api/vehiculos
GET    /api/vehiculos/42/eventos
DELETE /api/vehiculos/42</pre></div>
</div>
<div class="error-note"><b>Por qué:</b> el método HTTP (GET/POST/DELETE) ya expresa la acción — repetirla como verbo en la URL es redundante e inconsistente entre equipos. Los recursos se nombran como sustantivos en <b>plural</b> (colecciones: <code>/vehiculos</code>, no <code>/vehiculo</code>), y anidar <code>/vehiculos/42/eventos</code> expresa la relación de pertenencia de forma natural, sin inventar query params ad-hoc como <code>?id=42</code>.</div>
  </div>
  <div id="apd-3" class="tab-panel">
<div class="concept-intro"><strong>OpenAPI</strong> (antes llamado Swagger) es un estándar para describir una API en un archivo JSON/YAML: qué endpoints existen, qué parámetros aceptan, qué forma tiene cada respuesta y cada error. No es opcional en un equipo real — es el contrato que permite que frontend y backend trabajen en paralelo sin adivinar, que un tercero integre tu API sin preguntarte por Slack, y que herramientas de testing generen requests automáticamente a partir del spec.</div>
<div class="code-block"><div class="code-lang">FastAPI genera OpenAPI/Swagger automáticamente desde tu código</div><pre>
<span class="c-kw">from</span> fastapi <span class="c-kw">import</span> FastAPI
<span class="c-kw">from</span> pydantic <span class="c-kw">import</span> BaseModel, Field

app = FastAPI(
    title=<span class="c-st">"API de Flota"</span>,
    description=<span class="c-st">"Consulta y gestión de vehículos y telemetría"</span>,
    version=<span class="c-st">"1.0.0"</span>,
)

<span class="c-kw">class</span> <span class="c-fn">Vehiculo</span>(BaseModel):
    placa: <span class="c-bi">str</span> = Field(..., description=<span class="c-st">"Placa del vehículo, ej. ABC-123"</span>)
    modelo: <span class="c-bi">str</span>
    odometro_km: <span class="c-bi">float</span> = Field(ge=<span class="c-nb">0</span>, description=<span class="c-st">"Kilometraje acumulado"</span>)

<span class="c-dc">@app.get</span>(<span class="c-st">"/api/vehiculos/{vehiculo_id}"</span>, response_model=Vehiculo, summary=<span class="c-st">"Obtiene un vehículo por id"</span>)
<span class="c-kw">def</span> <span class="c-fn">obtener_vehiculo</span>(vehiculo_id: <span class="c-bi">int</span>):
    <span class="c-cm">"""Devuelve los datos de un vehículo de la flota por su id numérico."""</span>
    ...

<span class="c-cm"># Con el servidor corriendo (uvicorn main:app --reload), FastAPI expone:</span>
<span class="c-cm"># /docs         -> Swagger UI: interfaz interactiva, se puede probar cada endpoint desde el navegador</span>
<span class="c-cm"># /redoc        -> documentación de solo lectura, más limpia para compartir con otros equipos</span>
<span class="c-cm"># /openapi.json -> el spec crudo, que otras herramientas (clientes generados, tests) pueden consumir</span></pre></div>
<div class="alert-card">💡 Una API sin documentación es una API que nadie va a poder usar bien — ni siquiera tú mismo en 6 meses, cuando ya no recuerdes si el campo se llamaba <code>estado</code> o <code>status</code>, o si la fecha va en ISO8601 o timestamp Unix. Documentar no es un extra opcional "para cuando haya tiempo": es parte del contrato que expones, tan importante como el código que lo implementa.</div>
  </div>
</div>
`,

'api-errores': `
<div class="tab-group-ape">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ape-1','ape')">Consumiendo una API</button>
    <button class="tab-btn" onclick="switchTab(this,'ape-2','ape')">Diseñando/construyendo una API</button>
  </div>
  <div id="ape-1" class="tab-panel active">
<div class="concept-intro">La mayoría de los bugs en producción con APIs de terceros no son culpa de la API — son código cliente que asume que la red siempre funciona, que la respuesta siempre tiene el formato esperado y que las credenciales pueden vivir donde sea. Estos son los errores que más se repiten al consumir APIs, tanto en entrevistas como en código real.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
<span class="c-kw">import</span> requests

resp = requests.get(<span class="c-st">"https://api.proveedor.com/vehiculos"</span>)
data = resp.json()</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
<span class="c-kw">import</span> requests

<span class="c-kw">try</span>:
    resp = requests.get(
        <span class="c-st">"https://api.proveedor.com/vehiculos"</span>,
        timeout=(<span class="c-nb">3.05</span>, <span class="c-nb">10</span>)   <span class="c-cm"># (connect, read) en segundos</span>
    )
<span class="c-kw">except</span> requests.exceptions.Timeout:
    <span class="c-bi">print</span>(<span class="c-st">"El proveedor no respondió a tiempo"</span>)</pre></div>
</div>
<div class="error-note"><b>Causa raíz:</b> sin <code>timeout</code>, la librería HTTP espera indefinidamente si el servidor remoto se cuelga o la conexión se queda a medio abrir. En un banco de pruebas o un servicio backend, un solo request colgado puede agotar el pool de threads/conexiones y tumbar todo el proceso. Regla general: <b>todo</b> request de red lleva timeout explícito, sin excepción.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
resp = requests.get(url, timeout=<span class="c-nb">5</span>)
data = resp.json()   <span class="c-cm"># si el status es 500, esto explota</span>
<span class="c-bi">print</span>(data[<span class="c-st">"vin"</span>])</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
resp = requests.get(url, timeout=<span class="c-nb">5</span>)
<span class="c-kw">if</span> <span class="c-kw">not</span> resp.ok:   <span class="c-cm"># resp.ok == status_code < 400</span>
    <span class="c-bi">print</span>(<span class="c-st">f"Error {resp.status_code}: {resp.text}"</span>)
    <span class="c-kw">return</span> <span class="c-kw">None</span>
data = resp.json()</pre></div>
</div>
<div class="error-note"><b>Causa raíz:</b> muchos servidores devuelven un cuerpo de error en HTML o texto plano cuando algo falla (404, 500, 502 de un proxy). Llamar <code>.json()</code> a ciegas lanza <code>JSONDecodeError</code> y esconde el verdadero problema (el status code) detrás de un error de parseo confuso. Siempre revisa <code>status_code</code>/<code>resp.ok</code> antes de intentar parsear el body.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
<span class="c-cm"># config.py — commiteado al repo</span>
API_KEY = <span class="c-st">"sk_live_4f8a9d2c1b..."</span>

headers = {<span class="c-st">"Authorization"</span>: <span class="c-st">f"Bearer {API_KEY}"</span>}</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
<span class="c-kw">import</span> os

API_KEY = os.environ[<span class="c-st">"PROVEEDOR_API_KEY"</span>]   <span class="c-cm"># viene de .env / vault, nunca del repo</span>
headers = {<span class="c-st">"Authorization"</span>: <span class="c-st">f"Bearer {API_KEY}"</span>}</pre></div>
</div>
<div class="error-note"><b>Causa raíz:</b> una key hardcodeada queda en el historial de git para siempre, aunque la borres en el siguiente commit — cualquiera con acceso al repo (o a un fork/leak) puede usarla. Además impide rotar la key sin volver a desplegar código. Las credenciales van en variables de entorno, secret managers (Vault, AWS Secrets Manager) o al menos un <code>.env</code> fuera de git vía <code>.gitignore</code>.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
resp = requests.post(url, json=payload, timeout=<span class="c-nb">5</span>)
<span class="c-cm"># si hay un network blip, el request simplemente falla y ya</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
<span class="c-kw">from</span> requests.adapters <span class="c-kw">import</span> HTTPAdapter
<span class="c-kw">from</span> urllib3.util.retry <span class="c-kw">import</span> Retry

retry = Retry(total=<span class="c-nb">3</span>, backoff_factor=<span class="c-nb">0.5</span>,
              status_forcelist=[<span class="c-nb">502</span>, <span class="c-nb">503</span>, <span class="c-nb">504</span>])
session = requests.Session()
session.mount(<span class="c-st">"https://"</span>, HTTPAdapter(max_retries=retry))
resp = session.post(url, json=payload, timeout=<span class="c-nb">5</span>)</pre></div>
</div>
<div class="error-note"><b>Causa raíz:</b> un fallo transitorio (network blip, un 503 momentáneo del balanceador) no significa que la operación sea imposible — significa que hay que reintentar. Sin retries, cualquier hipo de red se convierte en un error visible para el usuario. La clave es reintentar solo errores transitorios (5xx, timeouts, conexión rechazada) y nunca 4xx, que son errores del cliente que no se arreglan repitiendo la misma request.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
data = resp.json()
vin = data[<span class="c-st">"vehicle"</span>][<span class="c-st">"vin"</span>]        <span class="c-cm"># KeyError si "vehicle" no existe</span>
placa = data[<span class="c-st">"plates"</span>][<span class="c-nb">0</span>]         <span class="c-cm"># IndexError si "plates" está vacío</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
data = resp.json()
vehicle = data.get(<span class="c-st">"vehicle"</span>) <span class="c-kw">or</span> {}
vin = vehicle.get(<span class="c-st">"vin"</span>)
placas = data.get(<span class="c-st">"plates"</span>) <span class="c-kw">or</span> []
placa = placas[<span class="c-nb">0</span>] <span class="c-kw">if</span> placas <span class="c-kw">else</span> <span class="c-kw">None</span>
<span class="c-kw">if</span> vin <span class="c-kw">is</span> <span class="c-kw">None</span>:
    <span class="c-kw">raise</span> ValueError(<span class="c-st">"Respuesta sin VIN — contrato de API cambió"</span>)</pre></div>
</div>
<div class="error-note"><b>Causa raíz:</b> asumir que la forma de la respuesta nunca cambia es frágil — un campo opcional que el proveedor deja de mandar, un array vacío en un edge case, o una migración de versión de su API rompe tu código en producción con un stacktrace críptico. Usa <code>.get()</code> con defaults, valida contra un schema (Pydantic, jsonschema) cuando el contrato importa, y falla con un mensaje claro en vez de un <code>KeyError</code> genérico.</div>
  </div>
  <div id="ape-2" class="tab-panel">
<div class="concept-intro">Del otro lado del mostrador, diseñar o construir tu propia API tiene su propia lista de errores clásicos — la mayoría rompen la confianza de quien la consume: contratos que cambian sin avisar, respuestas que mienten sobre si algo salió bien, y errores que no dan ninguna pista de qué falló.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
<span class="c-dc">@app.route</span>(<span class="c-st">"/vehiculos/&lt;id&gt;"</span>)
<span class="c-kw">def</span> <span class="c-fn">get_vehiculo</span>(id):
    v = db.find(id)
    <span class="c-kw">if</span> v <span class="c-kw">is</span> <span class="c-kw">None</span>:
        <span class="c-kw">return</span> {<span class="c-st">"error"</span>: <span class="c-st">"no encontrado"</span>}, <span class="c-nb">200</span>   <span class="c-cm"># 200 con un error adentro</span>
    <span class="c-kw">return</span> v.to_dict(), <span class="c-nb">200</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
<span class="c-dc">@app.route</span>(<span class="c-st">"/vehiculos/&lt;id&gt;"</span>)
<span class="c-kw">def</span> <span class="c-fn">get_vehiculo</span>(id):
    v = db.find(id)
    <span class="c-kw">if</span> v <span class="c-kw">is</span> <span class="c-kw">None</span>:
        <span class="c-kw">return</span> {<span class="c-st">"error"</span>: <span class="c-st">"no encontrado"</span>}, <span class="c-nb">404</span>
    <span class="c-kw">return</span> v.to_dict(), <span class="c-nb">200</span></pre></div>
</div>
<div class="error-note"><b>Causa raíz:</b> devolver siempre 200 obliga al cliente a inspeccionar el body para saber si algo falló, rompe el manejo estándar de errores de cualquier librería HTTP (que se basa en el status code) y hace inútiles los logs/monitoreo agregados por status. El status code <b>es</b> la señal — 2xx éxito, 4xx error del cliente, 5xx error del servidor. Úsalo siempre, no lo reemplaces por un campo <code>"error"</code> escondido en un 200.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
<span class="c-cm"># v1: el campo se llamaba "vin"</span>
<span class="c-cm"># deploy nuevo: renombran "vin" a "vehicle_id" en el mismo endpoint</span>
<span class="c-cm"># todos los clientes existentes truenan de golpe, sin aviso</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
<span class="c-cm"># nuevo endpoint versionado, el viejo sigue funcionando</span>
<span class="c-dc">@app.route</span>(<span class="c-st">"/v2/vehiculos/&lt;id&gt;"</span>)
<span class="c-kw">def</span> <span class="c-fn">get_vehiculo_v2</span>(id):
    v = db.find(id)
    <span class="c-kw">return</span> {<span class="c-st">"vehicle_id"</span>: v.vin, <span class="c-st">"vin"</span>: v.vin}, <span class="c-nb">200</span>  <span class="c-cm"># ambos campos hasta deprecar v1</span></pre></div>
</div>
<div class="error-note"><b>Causa raíz:</b> el contrato de una API es una promesa pública — renombrar/eliminar campos o cambiar tipos sin versionar rompe a todo cliente que ya integró contra el formato anterior, muchas veces sin que te enteres hasta que llegan los reportes. Cambios que rompen compatibilidad van en una versión nueva (<code>/v2/...</code> o un header de versión), dejando la anterior viva con un periodo de deprecación anunciado.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
<span class="c-dc">@app.route</span>(<span class="c-st">"/vehiculos"</span>, methods=[<span class="c-st">"POST"</span>])
<span class="c-kw">def</span> <span class="c-fn">crear_vehiculo</span>():
    body = request.get_json()
    v = Vehiculo(vin=body[<span class="c-st">"vin"</span>], year=body[<span class="c-st">"year"</span>])  <span class="c-cm"># y si "year" es un string? o negativo?</span>
    db.save(v)
    <span class="c-kw">return</span> v.to_dict(), <span class="c-nb">201</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
<span class="c-kw">from</span> pydantic <span class="c-kw">import</span> BaseModel, field_validator

<span class="c-kw">class</span> <span class="c-fn">VehiculoIn</span>(BaseModel):
    vin: <span class="c-bi">str</span>
    year: <span class="c-bi">int</span>

    <span class="c-dc">@field_validator</span>(<span class="c-st">"year"</span>)
    <span class="c-kw">def</span> <span class="c-fn">year_valido</span>(<span class="c-kw">cls</span>, v):
        <span class="c-kw">if</span> <span class="c-kw">not</span> (<span class="c-nb">1900</span> &lt;= v &lt;= <span class="c-nb">2100</span>):
            <span class="c-kw">raise</span> ValueError(<span class="c-st">"year fuera de rango"</span>)
        <span class="c-kw">return</span> v

<span class="c-dc">@app.route</span>(<span class="c-st">"/vehiculos"</span>, methods=[<span class="c-st">"POST"</span>])
<span class="c-kw">def</span> <span class="c-fn">crear_vehiculo</span>():
    datos = VehiculoIn(**request.get_json())   <span class="c-cm"># 422 automático si no valida</span>
    db.save(Vehiculo(**datos.model_dump()))
    <span class="c-kw">return</span> datos.model_dump(), <span class="c-nb">201</span></pre></div>
</div>
<div class="error-note"><b>Causa raíz:</b> confiar ciegamente en el input del cliente abre la puerta a datos corruptos en tu base de datos, crashes por tipos inesperados, e inyección si ese input llega sin sanitizar a una query. El servidor nunca debe asumir que el body cumple el contrato — valida tipos, rangos y campos requeridos con un schema (Pydantic, marshmallow, Zod si es Node) antes de tocar la capa de negocio.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
<span class="c-kw">return</span> {<span class="c-st">"error"</span>: <span class="c-st">"Error"</span>}, <span class="c-nb">400</span>   <span class="c-cm"># ¿error de qué? ¿cuál campo? nadie sabe</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
<span class="c-kw">return</span> {
    <span class="c-st">"error"</span>: {
        <span class="c-st">"code"</span>: <span class="c-st">"INVALID_FIELD"</span>,
        <span class="c-st">"message"</span>: <span class="c-st">"El campo 'year' debe ser un entero entre 1900 y 2100"</span>,
        <span class="c-st">"field"</span>: <span class="c-st">"year"</span>
    }
}, <span class="c-nb">422</span></pre></div>
</div>
<div class="error-note"><b>Causa raíz:</b> un mensaje genérico obliga a quien consume tu API (o a ti mismo debuggeando a las 2am) a adivinar qué pasó, revisando logs del servidor que tal vez ni tiene acceso. Un buen error de API incluye un <code>code</code> estable (para que el cliente lo pueda manejar programáticamente), un <code>message</code> legible para humanos, y de ser posible qué campo/recurso causó el problema.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>
<span class="c-dc">@app.route</span>(<span class="c-st">"/vehiculos"</span>)
<span class="c-kw">def</span> <span class="c-fn">listar_vehiculos</span>():
    <span class="c-kw">return</span> jsonify(db.query(Vehiculo).all())  <span class="c-cm"># 2 millones de filas en un solo response</span></pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>
<span class="c-dc">@app.route</span>(<span class="c-st">"/vehiculos"</span>)
<span class="c-kw">def</span> <span class="c-fn">listar_vehiculos</span>():
    page = <span class="c-bi">int</span>(request.args.get(<span class="c-st">"page"</span>, <span class="c-nb">1</span>))
    limit = <span class="c-bi">min</span>(<span class="c-bi">int</span>(request.args.get(<span class="c-st">"limit"</span>, <span class="c-nb">50</span>)), <span class="c-nb">200</span>)  <span class="c-cm"># tope duro</span>
    items = db.query(Vehiculo).offset((page-<span class="c-nb">1</span>)*limit).limit(limit).all()
    <span class="c-kw">return</span> jsonify({<span class="c-st">"data"</span>: items, <span class="c-st">"page"</span>: page, <span class="c-st">"limit"</span>: limit})</pre></div>
</div>
<div class="error-note"><b>Causa raíz:</b> un endpoint sin paginación se comporta bien mientras la tabla es chica y se vuelve un problema serio cuando crece — respuestas de cientos de MB, clientes que se quedan sin memoria parseando el JSON, y el propio servidor cargando todo en RAM antes de serializar. Siempre pagina colecciones (<code>page</code>/<code>limit</code> o cursor) y pon un límite máximo duro que el cliente no pueda superar.</div>
  </div>
</div>
`,

'api-practicas': `
<div class="tab-group-app">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'app-1','app')">Consumiendo APIs</button>
    <button class="tab-btn" onclick="switchTab(this,'app-2','app')">Diseñando/construyendo APIs</button>
  </div>
  <div id="app-1" class="tab-panel active">
<div class="concept-intro">Estas son las prácticas que separan un cliente HTTP frágil (que se cae con el primer hipo de red) de uno robusto, listo para producción. Son el espejo de los errores comunes: cada una ataca directamente una causa raíz típica.</div>

<div class="practice-card">
  <div class="practice-title">Define siempre un timeout explícito</div>
  <p>Nunca uses la librería HTTP con su timeout por defecto (que a veces es "nunca"). En Python: <code>requests.get(url, timeout=(3.05, 10))</code> — connect timeout corto, read timeout más generoso. Un request sin timeout puede colgar un worker/thread indefinidamente.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Implementa retry con backoff exponencial, solo para errores transitorios</div>
  <p>Reintenta 5xx, timeouts y errores de conexión con espera creciente (<code>0.5s, 1s, 2s, 4s...</code>) para no golpear un servicio ya caído. Nunca reintentes 4xx (400, 404, 422) — son errores del cliente que repetir la misma request no arregla. En Python, <code>urllib3.util.retry.Retry</code> lo hace por ti.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Guarda las API keys en variables de entorno o un secret manager</div>
  <p>Nunca hardcodees credenciales en el código fuente ni las commitees. Usa <code>os.environ["API_KEY"]</code> alimentado por un <code>.env</code> (fuera de git) en desarrollo, y un vault (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault) en producción, con rotación periódica.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Valida la estructura de la respuesta antes de usarla</div>
  <p>No asumas que el JSON siempre tiene la forma esperada. Usa <code>.get()</code> con defaults para accesos simples, o un schema (Pydantic) cuando el contrato es crítico — así detectas un cambio de la API del proveedor con un error claro en vez de un <code>KeyError</code> tres capas más abajo.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Cachea respuestas que no cambian frecuentemente</div>
  <p>Si un endpoint devuelve datos casi estáticos (catálogo de modelos, tabla de códigos de error), cachéalos localmente (Redis, <code>functools.lru_cache</code>, o respeta el header <code>Cache-Control</code> del proveedor) en vez de pedirlos de nuevo en cada llamada. Reduce latencia y evita gastar tu cuota de rate limit en datos que no cambiaron.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Revisa los rate limits de la documentación antes de hacer llamadas en loop</div>
  <p>Antes de iterar sobre miles de IDs llamando a una API externa, confirma cuántas requests por segundo/minuto permite (headers típicos: <code>X-RateLimit-Remaining</code>, <code>Retry-After</code>) y agrega throttling o batch requests si existen. Superar el límite suele terminar en un 429 y, si se repite, un baneo temporal de tu IP o API key.</p>
</div>
  </div>
  <div id="app-2" class="tab-panel">
<div class="concept-intro">Diseñar una API que otros van a integrar (equipos internos, partners, apps móviles) exige pensar en el consumidor desde el día uno: contratos claros, errores predecibles, y nada de sorpresas en producción. Estas prácticas son la base de cualquier API "production-ready".</div>

<div class="practice-card">
  <div class="practice-title">Usa códigos de estado HTTP correctos y consistentes</div>
  <p>200/201 para éxito, 400/422 para input inválido del cliente, 401/403 para auth, 404 para recurso inexistente, 429 para rate limit, 500 para error del servidor. No inventes tus propios códigos ni devuelvas 200 con un error escondido en el body — el status code es el primer nivel de información que cualquier cliente HTTP lee automáticamente.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Documenta con OpenAPI desde el día uno</div>
  <p>Define el contrato (endpoints, parámetros, schemas de request/response, errores posibles) en OpenAPI/Swagger desde el primer endpoint, no al final. Frameworks como FastAPI lo generan automáticamente a partir de los type hints; eso mantiene la documentación sincronizada con el código real.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Versiona desde el principio, aunque solo exista v1</div>
  <p>Expón <code>/v1/vehiculos</code> en vez de <code>/vehiculos</code> desde el primer día. Cuando necesites un cambio incompatible, lanzas <code>/v2/...</code> sin romper a los clientes que ya integraron contra v1. Agregar versionado después de que hay consumidores en producción es mucho más doloroso que empezar con él.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Valida todo el input del cliente, nunca confíes en el frontend</div>
  <p>Cualquiera puede llamar tu API directamente con curl o Postman, saltándose por completo la validación del frontend. Valida tipos, rangos y campos requeridos en el servidor con un schema (Pydantic, marshmallow) antes de tocar la base de datos o la lógica de negocio.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Define un formato de error consistente en toda la API</div>
  <p>Todos los endpoints deben fallar con la misma forma, por ejemplo <code>{"error": {"code": "NOT_FOUND", "message": "...", "field": "..."}}</code>. Así el cliente escribe un solo manejador de errores genérico en vez de parsear un formato distinto por endpoint.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Loguea las requests con contexto suficiente, sin exponer datos sensibles</div>
  <p>Registra método, path, status code, latencia, y un request ID para poder rastrear un problema en producción. Nunca loguees API keys, tokens, passwords ni PII en texto plano — enmascara esos campos (<code>Authorization: Bearer ***</code>) antes de escribir el log.</p>
</div>

<table class="kv-table">
<tr><th>Checklist antes de lanzar a producción</th><th>Por qué importa</th></tr>
<tr><td>HTTPS obligatorio (redirige HTTP → HTTPS)</td><td>Sin TLS, credenciales y datos viajan en texto plano y son interceptables</td></tr>
<tr><td>Rate limiting configurado</td><td>Protege el servicio de abuso, bugs en clientes que hacen loop infinito, y picos de tráfico</td></tr>
<tr><td>Logging con request ID y sin datos sensibles</td><td>Permite debuggear incidentes reales sin filtrar credenciales en los logs</td></tr>
<tr><td>Versionado desde el primer endpoint</td><td>Permite evolucionar el contrato sin romper clientes existentes</td></tr>
<tr><td>Documentación OpenAPI actualizada</td><td>Reduce fricción de integración y tickets de soporte de "¿cómo uso este endpoint?"</td></tr>
<tr><td>Formato de error consistente en todos los endpoints</td><td>El cliente escribe un solo manejador de errores en vez de uno por endpoint</td></tr>
<tr><td>Timeouts y límites de tamaño de respuesta (paginación)</td><td>Evita que un cliente o un query pesado tumbe el servidor o cuelgue una conexión</td></tr>
</table>
  </div>
</div>
`,

};  // fin API_RICH
