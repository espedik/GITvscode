// ══════════════════════════════════════════════════════════════════
//  AI_RICH — IA: Trabajar con APIs de IA
// ══════════════════════════════════════════════════════════════════
const AI_RICH = {

'ai-fundamentos': `
<div class="tab-group-aif">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'aif-1','aif')">¿Qué es un LLM y cómo se accede vía API?</button>
    <button class="tab-btn" onclick="switchTab(this,'aif-2','aif')">Tokens</button>
    <button class="tab-btn" onclick="switchTab(this,'aif-3','aif')">Prompt / Completion / Contexto</button>
  </div>
  <div id="aif-1" class="tab-panel active">
<div class="concept-intro">Un <strong>LLM</strong> (Large Language Model, modelo de lenguaje grande) es una red neuronal entrenada con enormes cantidades de texto para hacer una sola cosa muy bien: predecir cuál es el <em>siguiente token</em> (fragmento de texto) más probable, dado todo el texto que vino antes. No tiene una base de datos de respuestas guardadas ni "entiende" en el sentido humano — genera texto token por token basándose en patrones estadísticos aprendidos durante el entrenamiento. Claude (Anthropic) y GPT (OpenAI) son ejemplos de LLMs accesibles vía API.</div>
<div class="concept-intro">Acceder a un LLM <strong>vía API</strong> no tiene nada de mágico: es una API REST como cualquier otra que hayas consumido. Mandás una petición HTTP con un JSON que contiene tu texto de entrada (el <strong>prompt</strong>) y el servidor te devuelve una respuesta HTTP con un JSON que contiene el texto generado (la <strong>completion</strong>). Mismo patrón request/response que usarías para consultar el clima o el estado de un pedido — la diferencia es que el "backend" es un modelo de IA en vez de una base de datos.</div>
<div class="pipeline-diagram"><span class="p-blue">Tu código</span> ──▶ <span class="p-amber">POST /v1/messages  (JSON con el prompt)</span> ──▶ <span class="p-green">Servidor del proveedor (el LLM)</span> ──▶ <span class="p-amber">Respuesta JSON  (la completion)</span> ──▶ <span class="p-blue">Tu código</span></div>
<div class="code-block"><div class="code-lang">HTTP crudo — sin SDK, para ver que no hay magia</div><pre>
POST https://api.anthropic.com/v1/messages
Content-Type: application/json
x-api-key: TU_API_KEY
anthropic-version: 2023-06-01

{
  <span class="c-st">"model"</span>: <span class="c-st">"claude-sonnet-5"</span>,
  <span class="c-st">"max_tokens"</span>: <span class="c-nb">1024</span>,
  <span class="c-st">"messages"</span>: [
    {<span class="c-st">"role"</span>: <span class="c-st">"user"</span>, <span class="c-st">"content"</span>: <span class="c-st">"Explica que es un bus CAN en una frase."</span>}
  ]
}

<span class="c-cm">// Respuesta (resumida): un JSON con el texto generado dentro de "content"</span>
{
  <span class="c-st">"id"</span>: <span class="c-st">"msg_01Abc..."</span>,
  <span class="c-st">"content"</span>: [{<span class="c-st">"type"</span>: <span class="c-st">"text"</span>, <span class="c-st">"text"</span>: <span class="c-st">"Un bus CAN es un protocolo de comunicacion serial..."</span>}],
  <span class="c-st">"stop_reason"</span>: <span class="c-st">"end_turn"</span>
}</pre></div>
<div class="concept-intro">En la práctica casi nadie arma ese JSON a mano — se usa un <strong>SDK oficial</strong> (una librería cliente en Python, JavaScript, etc.) que abstrae los detalles de headers, autenticación y reintentos. Pero conceptualmente cada llamada que hace el SDK sigue siendo exactamente esto: una request HTTP con el prompt, una response HTTP con la completion. Entender esto ayuda a desmitificar la IA en entrevistas: es una API más, con sus propias particularidades (tokens, costos, límites), pero una API HTTP al fin y al cabo.</div>
  </div>
  <div id="aif-2" class="tab-panel">
<div class="concept-intro">Un <strong>token</strong> es la unidad mínima de texto que procesa el modelo — no es lo mismo que un carácter ni lo mismo que una palabra. Un token puede ser una palabra completa, un pedazo de una palabra, un signo de puntuación o hasta un espacio. El proceso de partir un texto en tokens se llama <em>tokenización</em>, y cada familia de modelos tiene su propio tokenizador entrenado sobre un vocabulario específico.</div>
<div class="code-block"><div class="code-lang">Ejemplo ilustrativo — cómo se fragmenta una palabra en tokens</div><pre>
<span class="c-cm"># La palabra "interviewing" casi nunca es un solo token — el tokenizador</span>
<span class="c-cm"># la puede partir en fragmentos reconocidos por su vocabulario, por ejemplo:</span>
<span class="c-st">"interviewing"</span>  <span class="c-cm">-&gt;</span>  [<span class="c-st">"interview"</span>, <span class="c-st">"ing"</span>]   <span class="c-cm"># 2 tokens (el corte exacto depende del tokenizador)</span>

<span class="c-cm"># Palabras cortas y muy comunes suelen ser 1 token completo:</span>
<span class="c-st">"the"</span>, <span class="c-st">"car"</span>, <span class="c-st">"CAN"</span>   <span class="c-cm"># ~1 token cada una</span>

<span class="c-cm"># Palabras técnicas, compuestas o en otros idiomas se fragmentan más:</span>
<span class="c-st">"automotive"</span>  <span class="c-cm">-&gt;</span>  [<span class="c-st">"auto"</span>, <span class="c-st">"motive"</span>]   <span class="c-cm"># ilustrativo</span></pre></div>
<div class="concept-intro">Por qué importa: los proveedores de LLMs cobran <strong>por token</strong>, no por carácter ni por palabra, y el tamaño máximo de una conversación (la "ventana de contexto") también se mide en tokens. Una aproximación práctica muy usada para textos en inglés es <strong>~4 caracteres ≈ 1 token</strong>. En español y otros idiomas con más acentos y conjugaciones la relación suele ser un poco menos eficiente — el mismo texto ocupa algunos tokens más.</div>
<table class="kv-table"><tr><th>Texto</th><th>Caracteres (aprox.)</th><th>Tokens (aprox.)</th></tr>
<tr><td>"Hola"</td><td>4</td><td>1-2</td></tr>
<tr><td>"¿Cómo funciona un bus CAN?"</td><td>27</td><td>~9</td></tr>
<tr><td>Un párrafo típico de 5 líneas</td><td>~350</td><td>~90</td></tr>
<tr><td>Un archivo de código de 100 líneas</td><td>~3000</td><td>~800-1000</td></tr>
<tr><td>Un PDF de 10 páginas de texto</td><td>~25000</td><td>~6000-7000</td></tr>
</table>
<div class="alert-card">💡 Nunca calcules tokens "a ojo" en producción — todo SDK de un proveedor serio expone un endpoint o método de conteo de tokens (por ejemplo <code>count_tokens</code>) para saber exactamente cuánto vas a gastar antes de enviar una request grande.</div>
  </div>
  <div id="aif-3" class="tab-panel">
<div class="concept-intro">Tres términos que aparecen en cualquier conversación técnica sobre LLMs y que conviene tener bien separados:</div>
<table class="kv-table"><tr><th>Término</th><th>Qué es</th></tr>
<tr><td>Prompt</td><td>El texto que vos enviás al modelo en esa llamada: instrucciones, pregunta, contexto de fondo.</td></tr>
<tr><td>Completion / respuesta</td><td>El texto que el modelo genera y te devuelve.</td></tr>
<tr><td>Ventana de contexto</td><td>Cuánto texto en total — prompt + historial de la conversación + la respuesta que se va a generar — puede "tener en cuenta" el modelo en una sola llamada.</td></tr>
</table>
<div class="concept-intro">La ventana de contexto es un límite duro: si el prompt más el historial supera ese tamaño, la API rechaza la request o hay que recortar/resumir la conversación. Los tamaños varían mucho según el modelo y el proveedor — modelos recientes de uso general suelen ofrecer ventanas de <strong>hasta 1.000.000 de tokens</strong>, mientras que modelos más antiguos o más chicos suelen rondar los <strong>200.000 tokens</strong>. Siempre conviene revisar la documentación del modelo específico en vez de asumir un número.</div>
<div class="concept-intro"><strong>Cada llamada a la API es independiente por defecto.</strong> El servidor no guarda ningún estado de conversación entre una llamada y la siguiente — no hay "sesión" ni memoria implícita. Si le preguntás algo en una llamada y en la siguiente le preguntás "¿y qué dijiste antes?", el modelo no tiene idea de qué pasó antes, porque literalmente no se le mandó esa información.</div>
<div class="code-block"><div class="code-lang">Por qué el modelo "no recuerda" entre llamadas</div><pre>
<span class="c-cm"># Llamada 1</span>
messages_1 = [{<span class="c-st">"role"</span>: <span class="c-st">"user"</span>, <span class="c-st">"content"</span>: <span class="c-st">"Me llamo Ana."</span>}]
<span class="c-cm"># respuesta: "Encantado, Ana."</span>

<span class="c-cm"># Llamada 2 -- si mandamos SOLO el mensaje nuevo, no hay memoria:</span>
messages_2 = [{<span class="c-st">"role"</span>: <span class="c-st">"user"</span>, <span class="c-st">"content"</span>: <span class="c-st">"¿Cómo me llamo?"</span>}]
<span class="c-cm"># respuesta: "No tengo esa información." -- el servidor no guardo nada de la llamada 1</span>

<span class="c-cm"># Para que "recuerde", hay que reenviar el historial completo en cada llamada:</span>
messages_2_correcta = [
    {<span class="c-st">"role"</span>: <span class="c-st">"user"</span>, <span class="c-st">"content"</span>: <span class="c-st">"Me llamo Ana."</span>},
    {<span class="c-st">"role"</span>: <span class="c-st">"assistant"</span>, <span class="c-st">"content"</span>: <span class="c-st">"Encantado, Ana."</span>},
    {<span class="c-st">"role"</span>: <span class="c-st">"user"</span>, <span class="c-st">"content"</span>: <span class="c-st">"¿Cómo me llamo?"</span>},
]
<span class="c-cm"># respuesta: "Te llamas Ana." -- ahora sí, porque el contexto viaja completo en la request</span></pre></div>
<div class="concept-intro">Esta es una de las preguntas de entrevista más frecuentes sobre APIs de IA: "¿el modelo recuerda la conversación?" — la respuesta correcta es que <strong>no hay estado en el servidor</strong>; la ilusión de memoria en un chat viene enteramente de que la aplicación cliente reenvía todo el historial en cada request. Esto también explica por qué las conversaciones largas se vuelven más lentas y más caras: cada mensaje nuevo implica reprocesar toda la conversación anterior.</div>
  </div>
</div>
`,

'ai-llamar': `
<div class="tab-group-ail">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'ail-1','ail')">Instalación y autenticación</button>
    <button class="tab-btn" onclick="switchTab(this,'ail-2','ail')">Enviar un mensaje</button>
    <button class="tab-btn" onclick="switchTab(this,'ail-3','ail')">Conversaciones multi-turno</button>
  </div>
  <div id="ail-1" class="tab-panel active">
<div class="concept-intro">Para llamar a la API de Anthropic (Claude) desde Python se usa el SDK oficial, que abstrae la construcción de la request HTTP, los headers de autenticación y los reintentos ante errores transitorios (rate limits, errores 5xx). El primer paso siempre es instalar el paquete y configurar la API key <strong>como variable de entorno</strong> — nunca escrita directamente en el código fuente.</div>
<div class="code-block"><div class="code-lang">Instalación</div><pre>
pip install anthropic</pre></div>
<div class="code-block"><div class="code-lang">Configurar la API key como variable de entorno (terminal, no en el código)</div><pre>
<span class="c-cm"># Linux / macOS</span>
export ANTHROPIC_API_KEY=<span class="c-st">"sk-ant-..."</span>

<span class="c-cm"># Windows (PowerShell)</span>
$env:ANTHROPIC_API_KEY = <span class="c-st">"sk-ant-..."</span></pre></div>
<div class="code-block"><div class="code-lang">Python — crear el cliente</div><pre>
<span class="c-kw">import</span> anthropic

<span class="c-cm"># El cliente lee ANTHROPIC_API_KEY del entorno automáticamente --</span>
<span class="c-cm"># no hace falta pasarla como argumento</span>
client = anthropic.Anthropic()

<span class="c-cm"># Solo si REALMENTE necesitás inyectar una key específica en runtime</span>
<span class="c-cm"># (por ejemplo multi-tenant), se puede pasar explícita -- pero sigue</span>
<span class="c-cm"># viniendo de una fuente segura (secrets manager), nunca hardcodeada:</span>
<span class="c-cm"># client = anthropic.Anthropic(api_key=obtener_key_desde_secrets_manager())</span></pre></div>
<div class="alert-card">💡 Regla de oro: la API key nunca va en el código fuente, nunca se commitea a git, y nunca se envía desde el navegador (frontend). Vive en variables de entorno o en un gestor de secretos, y las llamadas al modelo se hacen siempre desde un backend que vos controlás.</div>
  </div>
  <div id="ail-2" class="tab-panel">
<div class="concept-intro">Una llamada mínima necesita tres cosas: el <strong>modelo</strong> a usar, el <strong>max_tokens</strong> (el límite máximo de tokens que el modelo puede generar en la respuesta) y la lista de <strong>messages</strong> (la conversación, con al menos un mensaje del usuario). La respuesta es un objeto con el texto generado dentro de <code>content</code>.</div>
<div class="code-block"><div class="code-lang">Python — llamada completa y funcional (Anthropic / Claude)</div><pre>
<span class="c-kw">import</span> anthropic

client = anthropic.Anthropic()  <span class="c-cm"># lee ANTHROPIC_API_KEY del entorno</span>

response = client.messages.<span class="c-fn">create</span>(
    model=<span class="c-st">"claude-sonnet-5"</span>,      <span class="c-cm"># qué modelo usar</span>
    max_tokens=<span class="c-nb">1024</span>,               <span class="c-cm"># límite máximo de tokens de SALIDA</span>
    messages=[
        {<span class="c-st">"role"</span>: <span class="c-st">"user"</span>, <span class="c-st">"content"</span>: <span class="c-st">"¿Qué es un ECU en un vehículo?"</span>}
    ]
)

<span class="c-cm"># response.content es una lista de bloques (puede haber texto, uso de</span>
<span class="c-cm"># herramientas, razonamiento, etc.) -- para texto simple, tomamos el primero</span>
<span class="c-kw">for</span> bloque <span class="c-kw">in</span> response.content:
    <span class="c-kw">if</span> bloque.type == <span class="c-st">"text"</span>:
        <span class="c-bi">print</span>(bloque.text)

<span class="c-cm"># También es útil inspeccionar el consumo real de tokens:</span>
<span class="c-bi">print</span>(response.usage.input_tokens, response.usage.output_tokens)</pre></div>
<div class="concept-intro"><strong>OpenAI (GPT)</strong> sigue el mismo patrón conceptual — creás un cliente, llamás a un método de "chat completions" con un modelo y una lista de mensajes, y leés la respuesta de un objeto — pero con sintaxis y nombres de campos distintos (por ejemplo <code>client.chat.completions.create(...)</code> y el texto sale de <code>response.choices[0].message.content</code>). Si entendiste el flujo con Anthropic, adaptarte a otro proveedor es sobre todo cuestión de leer su documentación y ajustar nombres, no de aprender un concepto nuevo.</div>
  </div>
  <div id="ail-3" class="tab-panel">
<div class="concept-intro">Como cada llamada a la API es independiente (ver el tema anterior), para mantener una conversación de varios turnos hay que reenviar <strong>todo el historial de mensajes</strong> en cada llamada nueva — el servidor no guarda ningún estado entre requests. La lista <code>messages</code> va creciendo: cada respuesta del modelo se agrega como un mensaje con <code>role: "assistant"</code>, y cada pregunta nueva del usuario se agrega como <code>role: "user"</code>, alternando.</div>
<div class="code-block"><div class="code-lang">Python — conversación multi-turno, reenviando el historial completo</div><pre>
<span class="c-kw">import</span> anthropic

client = anthropic.Anthropic()
MODEL = <span class="c-st">"claude-sonnet-5"</span>

<span class="c-cm"># El historial es una simple lista que va creciendo turno a turno</span>
historial = []

<span class="c-kw">def</span> <span class="c-fn">preguntar</span>(texto_usuario):
    historial.append({<span class="c-st">"role"</span>: <span class="c-st">"user"</span>, <span class="c-st">"content"</span>: texto_usuario})

    response = client.messages.<span class="c-fn">create</span>(
        model=MODEL,
        max_tokens=<span class="c-nb">1024</span>,
        messages=historial,   <span class="c-cm"># <- se manda TODO el historial, no solo el mensaje nuevo</span>
    )

    texto_respuesta = <span class="c-bi">next</span>(b.text <span class="c-kw">for</span> b <span class="c-kw">in</span> response.content <span class="c-kw">if</span> b.type == <span class="c-st">"text"</span>)
    historial.append({<span class="c-st">"role"</span>: <span class="c-st">"assistant"</span>, <span class="c-st">"content"</span>: texto_respuesta})
    <span class="c-kw">return</span> texto_respuesta

<span class="c-bi">print</span>(<span class="c-fn">preguntar</span>(<span class="c-st">"Estoy diagnosticando un DTC P0300. ¿Qué significa?"</span>))
<span class="c-cm"># historial ahora tiene 2 mensajes: user + assistant</span>

<span class="c-bi">print</span>(<span class="c-fn">preguntar</span>(<span class="c-st">"¿Cuáles son las causas más comunes?"</span>))
<span class="c-cm"># historial ahora tiene 4 mensajes -- el modelo SÍ sabe que hablábamos de P0300,</span>
<span class="c-cm"># porque esa pregunta y su respuesta anterior viajaron completas en esta llamada</span></pre></div>
<div class="concept-intro">La forma que va tomando <code>historial</code> es literalmente una lista de diccionarios alternando roles: <code>[{"role": "user", ...}, {"role": "assistant", ...}, {"role": "user", ...}, ...]</code>. Esto tiene una consecuencia directa en costos: en una conversación larga, cada llamada nueva vuelve a procesar (y a cobrar) todo el historial acumulado, no solo el mensaje más reciente — por eso las conversaciones muy largas se vuelven progresivamente más caras y más lentas.</div>
  </div>
</div>
`,

'ai-prompting': `
<div class="tab-group-aip">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'aip-1','aip')">System Prompt</button>
    <button class="tab-btn" onclick="switchTab(this,'aip-2','aip')">Few-shot prompting</button>
    <button class="tab-btn" onclick="switchTab(this,'aip-3','aip')">Buenas prácticas</button>
  </div>
  <div id="aip-1" class="tab-panel active">
<div class="concept-intro">El <strong>system prompt</strong> es un campo separado de los mensajes del usuario que define el rol, el tono y las reglas de comportamiento del modelo <em>antes</em> de que empiece la conversación. Se manda una sola vez por request (no es un mensaje más dentro de la lista <code>messages</code>) y aplica a toda la respuesta. Es el lugar correcto para instrucciones estables como "sos un asistente técnico de diagnóstico automotriz, respondé siempre en español y citá el estándar relevante cuando corresponda" — en vez de repetir esas reglas en cada mensaje del usuario.</div>
<div class="code-block"><div class="code-lang">Python — system prompt como parámetro separado</div><pre>
response = client.messages.<span class="c-fn">create</span>(
    model=<span class="c-st">"claude-sonnet-5"</span>,
    max_tokens=<span class="c-nb">1024</span>,
    system=<span class="c-st">"Sos un asistente experto en diagnóstico de vehículos. Respondé en español, de forma técnica y concisa. Si mencionás un código de falla (DTC), explicá siempre su significado."</span>,
    messages=[
        {<span class="c-st">"role"</span>: <span class="c-st">"user"</span>, <span class="c-st">"content"</span>: <span class="c-st">"El auto tira un P0171, ¿qué reviso primero?"</span>}
    ]
)</pre></div>
<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ System prompt vago</div><pre>
system=<span class="c-st">"Sos un asistente útil."</span></pre></div>
  <div class="err-good"><div class="err-label">✅ System prompt específico</div><pre>
system=(
    <span class="c-st">"Sos un asistente de diagnóstico automotriz para técnicos "</span>
    <span class="c-st">"certificados. Respondé siempre en español, con lenguaje "</span>
    <span class="c-st">"técnico (no simplifiques para principiantes). Cuando "</span>
    <span class="c-st">"menciones un DTC, incluí: significado del código, 2-3 "</span>
    <span class="c-st">"causas probables ordenadas por frecuencia, y el primer "</span>
    <span class="c-st">"paso de diagnóstico recomendado. Si falta información "</span>
    <span class="c-st">"clave (marca, modelo, año), pedila antes de responder."</span>
)</pre></div>
</div>
<div class="error-note"><b>Por qué:</b> un system prompt vago ("sos un asistente útil") no le da al modelo ninguna señal sobre el dominio, el tono esperado, el nivel técnico del interlocutor ni el formato de respuesta — el resultado es genérico y poco confiable para un caso de uso real. Un system prompt específico actúa como un contrato de comportamiento: define audiencia, formato, y qué hacer cuando falta información. Cuanto más específico, más consistentes son las respuestas entre distintas llamadas.</div>
  </div>
  <div id="aip-2" class="tab-panel">
<div class="concept-intro"><strong>Zero-shot</strong> es pedirle al modelo que haga una tarea sin darle ningún ejemplo de cómo se ve una respuesta correcta — solo la instrucción. <strong>Few-shot</strong> es incluir dentro del mismo prompt 2 o 3 ejemplos de entrada/salida antes de la pregunta real, para que el modelo "aprenda" el formato o el estilo esperado por imitación, sin necesidad de reentrenar nada. Es especialmente útil cuando el formato de salida es específico (una estructura de reporte, una convención de nombres, un estilo de clasificación) y describirlo en palabras es más ambiguo que mostrarlo con ejemplos.</div>
<div class="code-block"><div class="code-lang">Zero-shot — solo la instrucción</div><pre>
prompt = (
    <span class="c-st">"Clasificá la severidad de este log de error de un ECU "</span>
    <span class="c-st">"como BAJA, MEDIA o ALTA:\n\n"</span>
    <span class="c-st">"'Timeout en respuesta de sensor de temperatura, reintento 1/3 exitoso'"</span>
)
<span class="c-cm"># Resultado: el modelo puede interpretar "severidad" de forma distinta</span>
<span class="c-cm"># cada vez, o devolver un formato de respuesta inconsistente</span></pre></div>
<div class="code-block"><div class="code-lang">Few-shot — mismos criterios, con ejemplos que fijan el formato</div><pre>
prompt = (
    <span class="c-st">"Clasificá la severidad de logs de error de un ECU como "</span>
    <span class="c-st">"BAJA, MEDIA o ALTA. Respondé solo con la palabra.\n\n"</span>
    <span class="c-st">"Log: 'Reintento de comunicación exitoso tras 1 intento'\n"</span>
    <span class="c-st">"Severidad: BAJA\n\n"</span>
    <span class="c-st">"Log: 'Sensor fuera de rango durante 4 segundos, valores descartados'\n"</span>
    <span class="c-st">"Severidad: MEDIA\n\n"</span>
    <span class="c-st">"Log: 'Watchdog reset del ECU principal, pérdida total de comunicación CAN'\n"</span>
    <span class="c-st">"Severidad: ALTA\n\n"</span>
    <span class="c-st">"Log: 'Timeout en respuesta de sensor de temperatura, reintento 1/3 exitoso'\n"</span>
    <span class="c-st">"Severidad:"</span>
)
<span class="c-cm"># Resultado: el modelo tiene 3 ejemplos calibrados de qué cuenta como cada</span>
<span class="c-cm"># nivel, y sabe exactamente que debe responder con una sola palabra</span></pre></div>
<div class="concept-intro">Los ejemplos de few-shot no solo mejoran la precisión de la clasificación — también fijan el <strong>formato exacto</strong> de la respuesta (una palabra, sin explicación adicional), algo mucho más difícil de garantizar solo con una instrucción en zero-shot. La regla práctica: si podés describir el resultado esperado más fácil mostrándolo que explicándolo con palabras, usá few-shot.</div>
  </div>
  <div id="aip-3" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Sé específico y da contexto</div>
  <p>"Explicá este error" da resultados mucho peores que "Explicá este error de un ECU de frenos ABS a un técnico junior que recién empieza, incluyendo qué componente físico podría estar fallando." Cuanto más contexto de dominio, audiencia y objetivo le des al modelo, menos tiene que adivinar.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Pedí el formato de salida explícitamente</div>
  <p>Si tu código va a parsear la respuesta, no confíes en que el modelo "adivine" el formato — pedilo de forma explícita: "Respondé ÚNICAMENTE en JSON válido con esta forma exacta: {\"severidad\": string, \"causa_probable\": string}". Sin esta instrucción, el modelo puede agregar texto explicativo antes o después del JSON y romper el parseo.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Dividí tareas complejas en pasos</div>
  <p>Pedir "analizá este log de 500 líneas y generá un reporte completo con causas, severidad y plan de acción" en un solo prompt suele dar resultados superficiales. Mejor: primero pedí que identifique los eventos relevantes, después que los clasifique, y por último que arme el reporte — en llamadas separadas o guiando el razonamiento paso a paso dentro del mismo prompt.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Iterá y ajustá el prompt como si fuera código</div>
  <p>Un prompt rara vez funciona perfecto al primer intento. Tratalo como cualquier otro artefacto de ingeniería: probá con casos reales, identificá dónde falla (formato incorrecto, falta de contexto, ambigüedad), ajustá una instrucción a la vez, y volvé a probar. Guardar versiones de prompts que funcionaron bien es tan útil como guardar versiones de código.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Separá instrucciones estables de contenido variable</div>
  <p>Las reglas de comportamiento que no cambian entre llamadas (rol, tono, formato de salida) van en el system prompt; el contenido específico de cada request (la pregunta del usuario, el log a analizar) va en el mensaje. Mezclar todo en un solo bloque de texto hace que el prompt sea más difícil de mantener y de reutilizar.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usá ejemplos negativos cuando el error es predecible</div>
  <p>Si sabés que el modelo tiende a cometer un error específico (por ejemplo, agregar texto extra antes de un JSON, o usar un formato de fecha distinto al esperado), mostrale explícitamente un ejemplo de "esto NO" junto al de "esto sí" — suele corregir el comportamiento más rápido que solo describirlo en prosa.</p>
</div>
  </div>
</div>
`,

'ai-avanzado': `
<div class="tab-group-aia">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'aia-1','aia')">Function Calling / Tool Use</button>
    <button class="tab-btn" onclick="switchTab(this,'aia-2','aia')">Streaming</button>
    <button class="tab-btn" onclick="switchTab(this,'aia-3','aia')">Structured Outputs</button>
  </div>
  <div id="aia-1" class="tab-panel active">
<div class="concept-intro"><strong>Function calling</strong> (también llamado "tool use") es la capacidad de describirle al modelo qué "herramientas" tiene disponibles — funciones reales de tu sistema, cada una con un nombre, una descripción y un esquema de los argumentos que acepta. El modelo <strong>no ejecuta nada por sí mismo</strong>: decide, en base al pedido del usuario, si conviene usar una herramienta y con qué argumentos, y te devuelve esa decisión como datos estructurados. Tu código es el que ejecuta la función real (una consulta a una base de datos, una llamada a otro sistema, etc.) y le devuelve el resultado al modelo para que arme la respuesta final.</div>
<div class="pipeline-diagram"><span class="p-blue">Usuario pregunta</span> ──▶ <span class="p-amber">Modelo decide llamar una función (elige nombre + argumentos)</span> ──▶ <span class="p-green">Tu código ejecuta la función real</span> ──▶ <span class="p-amber">El resultado vuelve al modelo</span> ──▶ <span class="p-blue">Respuesta final en lenguaje natural</span></div>
<div class="code-block"><div class="code-lang">Python — definir una tool y manejar el ciclo básico</div><pre>
<span class="c-kw">import</span> anthropic

client = anthropic.Anthropic()

<span class="c-cm"># 1. Describimos la herramienta: nombre, descripción y esquema de entrada.</span>
<span class="c-cm"># El modelo NUNCA ejecuta esto -- solo decide si y cómo llamarla.</span>
tools = [{
    <span class="c-st">"name"</span>: <span class="c-st">"consultar_estado_vehiculo"</span>,
    <span class="c-st">"description"</span>: <span class="c-st">"Consulta el estado actual de un vehículo por su patente (DTCs activos, nivel de combustible, kilometraje)."</span>,
    <span class="c-st">"input_schema"</span>: {
        <span class="c-st">"type"</span>: <span class="c-st">"object"</span>,
        <span class="c-st">"properties"</span>: {
            <span class="c-st">"patente"</span>: {<span class="c-st">"type"</span>: <span class="c-st">"string"</span>, <span class="c-st">"description"</span>: <span class="c-st">"Patente del vehículo, ej. AB123CD"</span>}
        },
        <span class="c-st">"required"</span>: [<span class="c-st">"patente"</span>]
    }
}]

messages = [{<span class="c-st">"role"</span>: <span class="c-st">"user"</span>, <span class="c-st">"content"</span>: <span class="c-st">"¿Cómo está el vehículo AB123CD?"</span>}]

response = client.messages.<span class="c-fn">create</span>(
    model=<span class="c-st">"claude-sonnet-5"</span>, max_tokens=<span class="c-nb">1024</span>, tools=tools, messages=messages
)

<span class="c-cm"># 2. Si el modelo decidió usar la herramienta, stop_reason es "tool_use"</span>
<span class="c-kw">if</span> response.stop_reason == <span class="c-st">"tool_use"</span>:
    llamada = <span class="c-bi">next</span>(b <span class="c-kw">for</span> b <span class="c-kw">in</span> response.content <span class="c-kw">if</span> b.type == <span class="c-st">"tool_use"</span>)
    <span class="c-bi">print</span>(llamada.name, llamada.input)   <span class="c-cm"># "consultar_estado_vehiculo" {"patente": "AB123CD"}</span>

    <span class="c-cm"># 3. TU código ejecuta la función real (base de datos, otra API, etc.)</span>
    resultado = <span class="c-fn">consultar_estado_vehiculo_real</span>(llamada.input[<span class="c-st">"patente"</span>])

    <span class="c-cm"># 4. Se le devuelve el resultado al modelo para que redacte la respuesta final</span>
    messages.append({<span class="c-st">"role"</span>: <span class="c-st">"assistant"</span>, <span class="c-st">"content"</span>: response.content})
    messages.append({<span class="c-st">"role"</span>: <span class="c-st">"user"</span>, <span class="c-st">"content"</span>: [
        {<span class="c-st">"type"</span>: <span class="c-st">"tool_result"</span>, <span class="c-st">"tool_use_id"</span>: llamada.id, <span class="c-st">"content"</span>: resultado}
    ]})

    respuesta_final = client.messages.<span class="c-fn">create</span>(
        model=<span class="c-st">"claude-sonnet-5"</span>, max_tokens=<span class="c-nb">1024</span>, tools=tools, messages=messages
    )</pre></div>
<div class="concept-intro">Este es el patrón detrás de casi todos los "agentes" de IA: darle al modelo un conjunto de herramientas (consultar una API, ejecutar una query, leer un archivo) y dejar que decida cuándo usarlas para resolver el pedido del usuario. En entrevistas suele preguntarse específicamente quién ejecuta el código real de la función — la respuesta correcta es siempre <strong>tu aplicación</strong>, nunca el modelo.</div>
  </div>
  <div id="aia-2" class="tab-panel">
<div class="concept-intro"><strong>Streaming</strong> es recibir la respuesta del modelo en pedazos (token por token o en pequeños chunks) a medida que se va generando, en vez de esperar a que la respuesta completa esté lista antes de recibir nada. Es el efecto que se ve en ChatGPT o en Claude.ai: el texto va "apareciendo" mientras se genera, en lugar de aparecer todo de golpe después de una espera.</div>
<div class="concept-intro">Se usa principalmente por <strong>experiencia de usuario</strong>: para respuestas largas, esperar varios segundos con la pantalla en blanco se siente lento, aunque el tiempo total de generación sea el mismo. Mostrar el texto a medida que llega da una percepción de velocidad mucho mayor y permite que el usuario empiece a leer antes de que termine de generarse toda la respuesta.</div>
<div class="code-block"><div class="code-lang">Python — respuesta en streaming</div><pre>
<span class="c-kw">import</span> anthropic

client = anthropic.Anthropic()

<span class="c-kw">with</span> client.messages.<span class="c-fn">stream</span>(
    model=<span class="c-st">"claude-sonnet-5"</span>,
    max_tokens=<span class="c-nb">1024</span>,
    messages=[{<span class="c-st">"role"</span>: <span class="c-st">"user"</span>, <span class="c-st">"content"</span>: <span class="c-st">"Explicá paso a paso cómo funciona un sensor MAF."</span>}]
) <span class="c-kw">as</span> stream:
    <span class="c-kw">for</span> texto <span class="c-kw">in</span> stream.text_stream:
        <span class="c-bi">print</span>(texto, end=<span class="c-st">""</span>, flush=<span class="c-kw">True</span>)   <span class="c-cm"># va imprimiendo a medida que llega</span>

    <span class="c-cm"># Al terminar, se puede pedir el mensaje completo acumulado</span>
    mensaje_final = stream.get_final_message()
    <span class="c-bi">print</span>(<span class="c-st">"\n\nTokens de salida:"</span>, mensaje_final.usage.output_tokens)</pre></div>
<div class="concept-intro">Además de la mejora de experiencia percibida, el streaming es prácticamente obligatorio para respuestas con un <code>max_tokens</code> alto: sin streaming, algunos SDKs directamente rechazan o truncan requests muy largas porque el tiempo de espera total podría superar el timeout de la conexión HTTP.</div>
  </div>
  <div id="aia-3" class="tab-panel">
<div class="concept-intro"><strong>Structured outputs</strong> es la técnica de forzar que la respuesta del modelo sea JSON válido con una forma (esquema) específica, en vez de texto libre que después hay que intentar parsear "a mano" con expresiones regulares o heurísticas frágiles. Es fundamental cuando la respuesta del modelo se va a consumir por código — un pipeline de datos, otro servicio, una base de datos — y no directamente por una persona.</div>
<div class="code-block"><div class="code-lang">Python — pedir una salida JSON con esquema fijo</div><pre>
<span class="c-kw">import</span> anthropic

client = anthropic.Anthropic()

esquema = {
    <span class="c-st">"type"</span>: <span class="c-st">"object"</span>,
    <span class="c-st">"properties"</span>: {
        <span class="c-st">"dtc"</span>: {<span class="c-st">"type"</span>: <span class="c-st">"string"</span>},
        <span class="c-st">"severidad"</span>: {<span class="c-st">"type"</span>: <span class="c-st">"string"</span>, <span class="c-st">"enum"</span>: [<span class="c-st">"BAJA"</span>, <span class="c-st">"MEDIA"</span>, <span class="c-st">"ALTA"</span>]},
        <span class="c-st">"causas_probables"</span>: {<span class="c-st">"type"</span>: <span class="c-st">"array"</span>, <span class="c-st">"items"</span>: {<span class="c-st">"type"</span>: <span class="c-st">"string"</span>}}
    },
    <span class="c-st">"required"</span>: [<span class="c-st">"dtc"</span>, <span class="c-st">"severidad"</span>, <span class="c-st">"causas_probables"</span>],
    <span class="c-st">"additionalProperties"</span>: <span class="c-kw">False</span>
}

response = client.messages.<span class="c-fn">create</span>(
    model=<span class="c-st">"claude-sonnet-5"</span>,
    max_tokens=<span class="c-nb">1024</span>,
    output_config={<span class="c-st">"format"</span>: {<span class="c-st">"type"</span>: <span class="c-st">"json_schema"</span>, <span class="c-st">"schema"</span>: esquema}},
    messages=[{<span class="c-st">"role"</span>: <span class="c-st">"user"</span>, <span class="c-st">"content"</span>: <span class="c-st">"Analizá el DTC P0300: fallas de encendido detectadas de forma aleatoria."</span>}]
)

<span class="c-kw">import</span> json
texto = <span class="c-bi">next</span>(b.text <span class="c-kw">for</span> b <span class="c-kw">in</span> response.content <span class="c-kw">if</span> b.type == <span class="c-st">"text"</span>)
datos = json.<span class="c-fn">loads</span>(texto)   <span class="c-cm"># garantizado que respeta el esquema pedido</span>
<span class="c-bi">print</span>(datos[<span class="c-st">"severidad"</span>], datos[<span class="c-st">"causas_probables"</span>])</pre></div>
<div class="concept-intro">La diferencia clave frente a "pedile en el prompt que responda en JSON" es que con structured outputs el proveedor <strong>garantiza</strong> a nivel de API que la respuesta valida contra el esquema — sin la posibilidad de que el modelo agregue texto explicativo antes/después del JSON o se olvide un campo obligatorio. Esto simplifica muchísimo el código del lado de la aplicación: se puede hacer <code>json.loads()</code> directo con confianza, sin try/except defensivo para manejar salidas mal formadas.</div>
  </div>
</div>
`,

'ai-practicas': `
<div class="tab-group-aic">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'aic-1','aic')">Cómo se cobran los tokens</button>
    <button class="tab-btn" onclick="switchTab(this,'aic-2','aic')">Seguridad y manejo de errores</button>
  </div>
  <div id="aic-1" class="tab-panel active">
<div class="concept-intro">Entender cómo se factura una llamada a un LLM evita sorpresas en la factura y es una pregunta común en entrevistas de diseño de sistemas que integran IA. El concepto central: <strong>los tokens de entrada (input) y los tokens de salida (output) se cobran por separado, y a distinto precio</strong> — generar texto es más costoso computacionalmente que leerlo, así que los tokens de salida suelen costar bastante más que los de entrada por la misma cantidad de tokens.</div>
<table class="kv-table"><tr><th>Concepto</th><th>Qué significa</th></tr>
<tr><td>Tokens de entrada (input)</td><td>Todo lo que le mandás al modelo en esa llamada: system prompt + historial completo + el mensaje nuevo. Se cobran a un precio base.</td></tr>
<tr><td>Tokens de salida (output)</td><td>Lo que el modelo genera como respuesta. Suele costar sensiblemente más por token que el input — generar es más caro que leer.</td></tr>
<tr><td>max_tokens</td><td>No es "cuánto quiero gastar" — es un techo duro de cuántos tokens puede generar el modelo como máximo en esa respuesta. Sirve para poner un límite superior al gasto y al tiempo de una sola llamada, pero no reduce el costo si el modelo termina antes.</td></tr>
<tr><td>Historial reenviado</td><td>Como cada llamada es independiente (ver el tema "¿Qué es una API de IA?"), en una conversación multi-turno todo el historial se vuelve a mandar como input en cada llamada nueva — y se vuelve a cobrar completo cada vez.</td></tr>
</table>
<div class="concept-intro">Esta última fila es la razón número uno por la que las conversaciones largas se vuelven caras: en el turno 20 de una conversación, esa llamada no solo paga por el mensaje nuevo del usuario, sino por reprocesar como input los 19 intercambios anteriores completos. El costo de una conversación no crece linealmente con la cantidad de turnos — crece más rápido, porque cada turno nuevo arrastra todo lo anterior. Técnicas como el <em>prompt caching</em> (cachear la parte estable del prompt para no re-cobrarla completa en cada llamada) existen específicamente para mitigar este problema en aplicaciones de producción.</div>
<div class="alert-card">💡 Para controlar el costo de una integración con IA en producción: fijá un <code>max_tokens</code> razonable por endpoint, monitoreá el campo <code>usage</code> de cada respuesta (que reporta cuántos tokens de entrada y salida se consumieron realmente), y considerá resumir o truncar el historial en conversaciones muy largas en vez de reenviarlo completo indefinidamente.</div>
  </div>
  <div id="aic-2" class="tab-panel">
<div class="practice-card">
  <div class="practice-title">Nunca expongas la API key en código cliente/frontend</div>
  <p>Si la API key viaja al navegador o a una app móvil, cualquier usuario puede extraerla (inspeccionando el tráfico de red o el bundle de JavaScript) y usarla libremente, generando costos a tu cuenta. Las llamadas al modelo siempre se hacen desde un backend que vos controlás; el frontend le habla a tu backend, y tu backend le habla al proveedor de IA con la key guardada de forma segura del lado del servidor.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Manejá rate limits con retry + backoff exponencial</div>
  <p>Igual que con cualquier API externa, si mandás muchas requests en poco tiempo vas a recibir un error de rate limit (código 429). La respuesta correcta no es reintentar inmediatamente en loop, sino esperar un tiempo creciente entre reintentos (backoff exponencial), respetando además cualquier header tipo <code>retry-after</code> que la respuesta incluya. Los SDKs oficiales suelen implementar esto automáticamente con un número configurable de reintentos.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Cuidado con el "prompt injection"</div>
  <p>Si tu aplicación inserta contenido escrito por usuarios dentro del prompt que le mandás al modelo (por ejemplo, el texto de un ticket de soporte, un comentario, un archivo subido), un usuario malicioso podría escribir texto diseñado para manipular las instrucciones del sistema — por ejemplo "ignorá las instrucciones anteriores y hacé X". Esto se llama prompt injection. No hay una solución 100% infalible, pero ayuda separar claramente instrucciones del sistema (system prompt) de contenido de usuario, y tratar cualquier salida del modelo influenciada por contenido externo como potencialmente no confiable.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Validá y saneá las salidas del modelo antes de ejecutarlas</div>
  <p>Si el modelo genera código, comandos de shell, consultas SQL o cualquier cosa que tu sistema vaya a ejecutar directamente, nunca lo ejecutes a ciegas. Aplicá las mismas prácticas de seguridad que usarías con cualquier entrada no confiable: listas de permitidos, sandboxing, validación de esquema antes de ejecutar, y nunca construir consultas SQL concatenando texto generado por el modelo sin parametrizar.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Registrá y monitoreá el uso, no solo el resultado</div>
  <p>Loguear cuántos tokens consume cada llamada, qué modelo se usó y cuánto tardó permite detectar a tiempo tanto problemas de costo (una conversación que crece sin control) como de latencia (llamadas que están tardando más de lo esperado) antes de que se conviertan en un incidente en producción.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Definí un timeout y un plan B ante fallos del proveedor</div>
  <p>Un LLM es un servicio externo más: puede estar caído, sobrecargado (errores 5xx / 529) o simplemente lento. Tu aplicación debe tener un timeout razonable y un comportamiento definido cuando la llamada falla o tarda demasiado — un mensaje de error claro para el usuario, no que la interfaz quede colgada indefinidamente.</p>
</div>
<div class="alert-card">💡 Resumen: la API key vive solo en el backend, los errores 429/5xx se manejan con retry y backoff (igual que cualquier API externa), el contenido de usuario que termina dentro de un prompt es una superficie de ataque (prompt injection) que hay que tratar con cuidado, y ninguna salida del modelo — texto, código o comandos — se ejecuta o persiste sin validar primero.</div>
  </div>
</div>
`,

};  // fin AI_RICH
