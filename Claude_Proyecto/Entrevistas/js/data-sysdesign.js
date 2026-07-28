// ══════════════════════════════════════════════════════════════════
//  SYSDESIGN_RICH — Diseño de Sistemas
// ══════════════════════════════════════════════════════════════════
const SYSDESIGN_RICH = {

'sysd-framework': `
<div class="tab-group-sdf">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'sdf-1','sdf')">Los 5 pasos</button>
    <button class="tab-btn" onclick="switchTab(this,'sdf-2','sdf')">Preguntas de clarificación</button>
    <button class="tab-btn" onclick="switchTab(this,'sdf-3','sdf')">Estimación de escala</button>
  </div>
  <div id="sdf-1" class="tab-panel active">
<div class="concept-intro">Una entrevista de <strong>system design</strong> no evalúa si conoces la respuesta "correcta" — no existe una única solución válida. Evalúa tu <strong>proceso</strong>: cómo estructuras el problema, qué preguntas haces, cómo estimas números y cómo justificas trade-offs. El framework de 5 pasos es el guion que usan la mayoría de entrevistadores (Google, Amazon, Meta y también equipos automotrices que arman plataformas de telemetría/flota) para darle forma a 45-60 minutos que de otra forma se sentirían caóticos. Domínalo y podrás aplicarlo a cualquier problema: desde "diseña Twitter" hasta "diseña un sistema de telemetría para 500,000 vehículos".</div>
<div class="plan-card">
  <div class="plan-card-title">El framework de 5 pasos — con reparto de tiempo sugerido (entrevista de 45 min)</div>
  <div class="plan-block">
    <div class="plan-time">Paso 1 · 5-10 min</div>
    <div class="plan-content">
      <h4>Clarificar requisitos</h4>
      <p>Nunca empieces a dibujar cajas sin entender qué estás construyendo. Divide los requisitos en dos categorías:</p>
      <p><strong>Funcionales</strong> — qué hace el sistema desde la perspectiva del usuario. Ejemplo: "los operadores de flota pueden ver la ubicación en tiempo real de cada vehículo, recibir alertas si un vehículo sale de una geo-cerca, y consultar el historial de rutas de los últimos 30 días".</p>
      <p><strong>No funcionales</strong> — las cualidades del sistema: escala esperada, disponibilidad (¿99.9%? ¿99.99%?), consistencia (¿toleras ver una posición con 5 segundos de retraso?), latencia máxima aceptable, seguridad/privacidad, costo. Estos son los que realmente determinan la arquitectura — dos sistemas con la misma funcionalidad pero distintos requisitos no funcionales terminan siendo diseños completamente distintos.</p>
      <p>Termina este paso reduciendo el alcance en voz alta: "voy a enfocarme en el flujo de ingesta de telemetría y consulta de posición en tiempo real; dejo fuera facturación y gestión de usuarios salvo que quieras que los cubra". Esto evita que el entrevistador crea que olvidaste algo y te da margen para ir a fondo en lo importante.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Paso 2 · 5 min</div>
    <div class="plan-content">
      <h4>Estimar la escala (back-of-the-envelope)</h4>
      <p>Traduce los requisitos a números concretos: usuarios totales, usuarios activos diarios (DAU), requests por segundo (lecturas vs. escrituras por separado — casi nunca son iguales), y almacenamiento necesario por día/año. No necesitas precisión, necesitas <em>orden de magnitud</em> correcto — eso es lo que determina si necesitas una sola base de datos o un clúster particionado en 50 shards.</p>
      <p>Ejemplo rápido: 500,000 vehículos enviando telemetría cada 5 segundos → 500,000 / 5 = <strong>100,000 escrituras/segundo</strong> en promedio. Eso ya te dice que una sola instancia de PostgreSQL no alcanza y necesitas pensar en particionado horizontal o una base de series de tiempo desde el día uno.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Paso 3 · 10-15 min</div>
    <div class="plan-content">
      <h4>Diseño de alto nivel</h4>
      <p>Dibuja (o narra) los componentes principales y cómo se conectan: clientes, balanceador de carga, capa de API, cache, cola de mensajes, base de datos, y cualquier servicio externo relevante (notificaciones push, CDN). No entres en detalle todavía — el objetivo es que el entrevistador vea que entiendes cómo fluyen los datos de punta a punta antes de profundizar en cualquier pieza.</p>
      <div class="pipeline-diagram">
<span class="p-blue">Vehículos (GPS/CAN)</span> ──▶ <span class="p-green">API Gateway / LB</span> ──▶ <span class="p-amber">Servicio de Ingesta</span> ──▶ <span class="p-amber">Cola (Kafka)</span>
                                                              │
                                                              ▼
                                            <span class="p-gray">Workers → DB series de tiempo + Cache posición actual</span>
                                                              │
                                                              ▼
                                                  <span class="p-blue">API de consulta ← Apps de operadores</span>
              </div>
              <p>Justifica cada caja en una frase: "uso una cola porque la ingesta es en ráfagas y no quiero que un pico tumbe la base de datos directamente" es la clase de comentario que distingue un diseño pensado de una lista de tecnologías de moda.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Paso 4 · 15-20 min</div>
    <div class="plan-content">
      <h4>Deep dive en 1-2 componentes críticos</h4>
      <p>Aquí es donde se gana o se pierde la entrevista. El entrevistador casi siempre te va a empujar hacia el componente que más le interesa evaluar — puede ser el esquema de la base de datos, cómo evitas perder mensajes en la cola, cómo diseñas el índice para consultas geoespaciales, o cómo garantizas que dos actualizaciones concurrentes de un mismo vehículo no se pisen. Prepárate para justificar decisiones con números del paso 2, no con generalidades ("uso Redis porque es rápido" es débil; "uso Redis para la posición actual porque solo necesito el último valor por vehículo, con TTL de 30s, y a 100k writes/seg una base relacional con índices no aguanta esa tasa de UPDATE" es fuerte).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Paso 5 · 5-10 min</div>
    <div class="plan-content">
      <h4>Trade-offs, cuellos de botella y qué sigue</h4>
      <p>Ningún diseño es perfecto — demostrar que sabes dónde están las grietas es tan valioso como el diseño mismo. Identifica puntos únicos de falla (SPOF), qué pasa si un componente se cae, cómo escalarías 10x más, y qué monitoreo pondrías para detectar problemas antes que los usuarios. Cerrar con "si tuviera más tiempo, evaluaría X" muestra madurez técnica.</p>
    </div>
  </div>
</div>
<div class="alert-card">💡 Error más común de candidatos junior: saltarse los pasos 1 y 2 y lanzarse directo a dibujar microservicios. Sin requisitos claros y sin números, cualquier decisión de diseño posterior queda sin justificación — y el entrevistador lo nota de inmediato.</div>
  </div>
  <div id="sdf-2" class="tab-panel">
<div class="concept-intro">Las preguntas de clarificación no son un trámite — son la herramienta con la que <strong>reduces el espacio de diseño</strong> antes de comprometerte con una arquitectura. Un sistema de "mensajería" para 100 usuarios internos de un taller y uno para 500 millones de usuarios de una red social comparten el nombre pero no tienen absolutamente nada en común a nivel de diseño. Haz estas preguntas en los primeros 5-10 minutos, antes de dibujar nada.</div>
<table class="kv-table">
<tr><th>Pregunta</th><th>Por qué importa</th><th>Ejemplo de respuesta</th></tr>
<tr><td>¿Cuál es la funcionalidad principal y cuál es secundaria/fuera de alcance?</td><td>Evita que diseñes para requisitos que el entrevistador no pidió, y te da permiso explícito para enfocar tu tiempo</td><td>"Enfócate en el rastreo en tiempo real; la facturación no es parte de esta entrevista"</td></tr>
<tr><td>¿Cuántos usuarios totales y cuántos activos por día (DAU)?</td><td>Determina si hablamos de cientos, miles o millones de QPS — cambia toda la arquitectura</td><td>"500,000 vehículos activos, todos reportando simultáneamente durante el día"</td></tr>
<tr><td>¿Cuál es la proporción de lecturas contra escrituras?</td><td>Un sistema read-heavy se optimiza con cache y réplicas; uno write-heavy necesita particionado y colas de absorción de picos</td><td>"Cada vehículo escribe cada 5s, pero se consulta con mucha menor frecuencia — es fuertemente write-heavy"</td></tr>
<tr><td>¿Consistencia fuerte o eventual es aceptable?</td><td>Consistencia fuerte limita la disponibilidad y la escala horizontal (ver CAP theorem); eventual permite escalar mucho más pero puede mostrar datos "viejos" por segundos</td><td>"Un retraso de 2-3 segundos en la posición mostrada es aceptable; los pagos, no"</td></tr>
<tr><td>¿Qué latencia p50/p99 se espera en la respuesta al usuario?</td><td>Latencias sub-100ms casi siempre obligan a usar cache en memoria; latencias de segundos permiten diseños más simples</td><td>"La app de operador debe refrescar posición en menos de 1s"</td></tr>
<tr><td>¿Hay restricciones de infraestructura o stack ya definidas?</td><td>Si la empresa ya usa Kafka/Postgres/AWS, no tiene sentido proponer un stack completamente distinto sin razón</td><td>"Ya usamos AWS y Kafka en otros servicios internos"</td></tr>
<tr><td>¿El tráfico es uniforme o llega en ráfagas (bursty)?</td><td>El tráfico en ráfagas (ej. todos los vehículos de una flota arrancan a las 8am) exige colas de absorción y auto-scaling agresivo, no solo capacidad promedio</td><td>"Picos de hasta 5x el promedio en horas pico de la mañana"</td></tr>
<tr><td>¿Qué tan crítico es no perder datos (durabilidad)?</td><td>Define si necesitas replicación síncrona, escritura a disco confirmada, o si perder algún dato ocasional es tolerable</td><td>"Perder un punto GPS aislado es aceptable; perder un evento de colisión no"</td></tr>
</table>
<div class="alert-card">💡 Truco práctico: si el entrevistador responde una pregunta con "tú decide", repite tu supuesto en voz alta antes de avanzar ("voy a asumir consistencia eventual para posición, y fuerte para facturación") — así queda documentado y el resto del diseño se juzga contra ese supuesto, no contra uno que el entrevistador tenía en mente.</div>
  </div>
  <div id="sdf-3" class="tab-panel">
<div class="concept-intro">La estimación de escala ("back-of-the-envelope") es la parte donde más candidatos se traban por no tener memorizados un puñado de números de referencia. No necesitas ser exacto — necesitas llegar al <strong>orden de magnitud</strong> correcto en segundos, con matemática simple de cabeza. Estas son las cifras que debes poder recordar sin calculadora.</div>
<table class="kv-table">
<tr><th>Referencia</th><th>Valor</th></tr>
<tr><td>Segundos en 1 día</td><td>86,400 ≈ redondea a 10⁵ para cálculos rápidos</td></tr>
<tr><td>Segundos en 1 mes</td><td>≈ 2.6 millones (30 × 86,400)</td></tr>
<tr><td>1 millón de requests/día repartidos uniformemente</td><td>≈ 12 QPS promedio (10⁶ / 86,400)</td></tr>
<tr><td>Factor de hora pico sobre el promedio</td><td>multiplica el QPS promedio por 3x-5x para dimensionar capacidad pico</td></tr>
<tr><td>Latencia acceso a RAM</td><td>≈ 100 nanosegundos</td></tr>
<tr><td>Latencia lectura aleatoria en SSD</td><td>≈ 150 microsegundos (~1000x más lento que RAM)</td></tr>
<tr><td>Latencia round-trip misma zona/datacenter</td><td>≈ 0.5 milisegundos</td></tr>
<tr><td>Latencia round-trip intercontinental</td><td>≈ 150 milisegundos</td></tr>
<tr><td>Latencia seek en disco mecánico (HDD)</td><td>≈ 10 milisegundos</td></tr>
<tr><td>Tamaño típico de un mensaje/evento JSON pequeño</td><td>1-5 KB</td></tr>
<tr><td>Tamaño típico de una imagen comprimida</td><td>200 KB - 2 MB</td></tr>
<tr><td>Disponibilidad "tres nueves" (99.9%)</td><td>≈ 8.7 horas de downtime al año</td></tr>
<tr><td>Disponibilidad "cinco nueves" (99.999%)</td><td>≈ 5 minutos de downtime al año</td></tr>
</table>
<div class="code-block"><div class="code-lang">Ejemplo de cálculo real — telemetría de flota</div><pre>
<span class="c-cm"># Datos del problema (obtenidos en el paso de clarificación)</span>
vehiculos_activos   = <span class="c-nb">500_000</span>
intervalo_reporte_s = <span class="c-nb">5</span>          <span class="c-cm"># cada vehículo reporta cada 5 segundos</span>
tamano_payload_kb   = <span class="c-nb">1</span>          <span class="c-cm"># ~1 KB por reporte de telemetría</span>

<span class="c-cm"># 1. QPS de escritura promedio</span>
qps_promedio = vehiculos_activos / intervalo_reporte_s
<span class="c-cm"># = 500,000 / 5 = 100,000 escrituras/segundo</span>

<span class="c-cm"># 2. QPS pico (factor 3x en hora de mayor actividad de flota)</span>
qps_pico = qps_promedio * <span class="c-nb">3</span>
<span class="c-cm"># = 300,000 escrituras/segundo en el peor caso</span>

<span class="c-cm"># 3. Almacenamiento por día</span>
escrituras_dia = qps_promedio * <span class="c-nb">86_400</span>
<span class="c-cm"># = 8,640,000,000 registros/día</span>
storage_dia_gb = (escrituras_dia * tamano_payload_kb) / (<span class="c-nb">1024</span>*<span class="c-nb">1024</span>)
<span class="c-cm"># ≈ 8,238 GB/día ≈ 8.2 TB/día</span>

<span class="c-cm"># 4. Almacenamiento anual (sin compresión ni retención limitada)</span>
storage_anual_tb = storage_dia_gb * <span class="c-nb">365</span> / <span class="c-nb">1024</span>
<span class="c-cm"># ≈ 2,940 TB/año → esto justifica compresión + retención + downsampling</span></pre></div>
<div class="alert-card">💡 Este cálculo, hecho en voz alta en 2 minutos, ya te dice tres cosas de diseño: (1) necesitas particionado horizontal desde el día uno, no como optimización futura; (2) necesitas una política de retención/downsampling porque guardar todo para siempre a este ritmo es económicamente inviable; (3) una base de series de tiempo (InfluxDB, TimescaleDB, Cassandra) va a rendir mejor que una relacional genérica para este patrón de escritura.</div>
  </div>
</div>
`,

'sysd-escalabilidad': `
<div class="tab-group-sde">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'sde-1','sde')">Vertical vs Horizontal</button>
    <button class="tab-btn" onclick="switchTab(this,'sde-2','sde')">Load Balancing</button>
    <button class="tab-btn" onclick="switchTab(this,'sde-3','sde')">Caching y CDN</button>
  </div>
  <div id="sde-1" class="tab-panel active">
<div class="concept-intro">Escalar significa aumentar la capacidad de un sistema para manejar más carga. Hay exactamente dos formas de hacerlo: darle más recursos a una sola máquina (<strong>escalado vertical</strong>) o repartir la carga entre varias máquinas (<strong>escalado horizontal</strong>). Casi todo diseño de sistema real termina usando una combinación de ambos, pero entender cuándo cada uno se queda corto es una de las preguntas más frecuentes en entrevista.</div>
<div class="two-col">
  <div class="info-card">
    <h5>Escalado Vertical (Scale Up)</h5>
    <ul>
      <li>Agregar más CPU, RAM o disco a la misma máquina</li>
      <li>No requiere cambios de arquitectura ni lógica de distribución de datos</li>
      <li>Simplifica consistencia — un solo nodo con todo el estado</li>
      <li>Tiene un techo físico: existe un límite de hardware disponible en el mercado</li>
      <li>Es un punto único de falla (SPOF): si la máquina cae, el sistema entero cae</li>
      <li>Suele requerir downtime durante el upgrade</li>
      <li>El costo crece de forma no lineal — el hardware "top de gama" cuesta desproporcionadamente más que el de gama media</li>
    </ul>
  </div>
  <div class="info-card">
    <h5>Escalado Horizontal (Scale Out)</h5>
    <ul>
      <li>Agregar más máquinas y repartir la carga entre ellas</li>
      <li>Prácticamente sin techo — sigues agregando nodos según la demanda</li>
      <li>Tolerante a fallos: si un nodo cae, los demás siguen sirviendo tráfico</li>
      <li>Permite escalar y des-escalar dinámicamente según la demanda (auto-scaling)</li>
      <li>Introduce complejidad real: coordinación entre nodos, consistencia de datos, balanceo de carga, sesiones distribuidas</li>
      <li>Requiere que los componentes sean, idealmente, <em>stateless</em> — si guardan estado local, ese estado debe replicarse o externalizarse</li>
    </ul>
  </div>
</div>
<table class="kv-table">
<tr><th>Aspecto</th><th>Vertical</th><th>Horizontal</th></tr>
<tr><td>Límite de capacidad</td><td>Techo físico del hardware disponible</td><td>Prácticamente ilimitado (agregas nodos)</td></tr>
<tr><td>Complejidad de implementación</td><td>Baja — no cambia la arquitectura</td><td>Alta — requiere balanceo, particionado, coordinación</td></tr>
<tr><td>Tolerancia a fallos</td><td>Nula — un solo punto de falla</td><td>Alta — la carga se redistribuye si un nodo cae</td></tr>
<tr><td>Costo marginal por unidad de capacidad</td><td>Creciente (no lineal)</td><td>Aproximadamente lineal</td></tr>
<tr><td>Downtime al escalar</td><td>Normalmente requiere reinicio/mantenimiento</td><td>Se agregan nodos sin downtime</td></tr>
<tr><td>Ejemplo típico</td><td>Subir de instancia RDS db.m5.large a db.m5.4xlarge</td><td>Agregar más réplicas de un servicio de API detrás de un load balancer</td></tr>
</table>
<div class="alert-card">💡 Regla práctica de entrevista: las bases de datos relacionales tradicionalmente escalan mejor verticalmente (porque las transacciones ACID en un solo nodo son más simples de garantizar); los servicios de aplicación sin estado (stateless) casi siempre deben diseñarse para escalar horizontalmente desde el principio, porque ahí es donde vive la mayor parte del tráfico variable.</div>
  </div>
  <div id="sde-2" class="tab-panel">
<div class="concept-intro">Un <strong>load balancer</strong> (balanceador de carga) es el componente que recibe todo el tráfico entrante y decide a cuál de varios servidores backend enviarlo. Es la pieza que hace posible el escalado horizontal: sin él, un cliente tendría que saber de antemano a qué servidor conectarse, y no habría forma de repartir la carga ni de sacar un servidor de circulación cuando falla.</div>
<div class="pipeline-diagram">
<span class="p-blue">Cliente</span> ──▶ <span class="p-green">Load Balancer</span>
                     │
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
<span class="p-amber">Server 1</span>      <span class="p-amber">Server 2</span>      <span class="p-amber">Server 3</span>
      │              │              │
      └──────────────┼──────────────┘
                      ▼
              <span class="p-gray">Database (Primary + Réplicas)</span>
</div>
<table class="kv-table">
<tr><th>Algoritmo</th><th>Cómo funciona</th><th>Cuándo usarlo</th></tr>
<tr><td>Round Robin</td><td>Reparte requests en orden circular entre todos los servidores, uno tras otro</td><td>Servidores homogéneos con carga uniforme por request</td></tr>
<tr><td>Weighted Round Robin</td><td>Igual que round robin pero asigna más requests a servidores con más capacidad (peso configurado)</td><td>Flota de servidores con distinta capacidad de hardware</td></tr>
<tr><td>Least Connections</td><td>Envía el request al servidor con menos conexiones activas en ese momento</td><td>Requests de duración muy variable (algunos tardan mucho más que otros)</td></tr>
<tr><td>IP Hash</td><td>Calcula un hash de la IP del cliente y siempre lo enruta al mismo servidor</td><td>Cuando necesitas "sticky sessions" sin usar cookies — el mismo cliente siempre cae en el mismo backend</td></tr>
<tr><td>Least Response Time</td><td>Combina conexiones activas y tiempo de respuesta reciente del servidor</td><td>Backends con latencias heterogéneas donde importa la experiencia percibida</td></tr>
</table>
<div class="concept-intro">Un load balancer solo es tan bueno como su capacidad de detectar servidores caídos. Los <strong>health checks</strong> son el mecanismo para eso, y hay dos tipos:</div>
<div class="two-col">
  <div class="info-card">
    <h5>Health checks activos</h5>
    <ul>
      <li>El load balancer llama periódicamente a un endpoint dedicado (ej. <code>GET /health</code>) en cada servidor</li>
      <li>Si el servidor no responde 2xx en N intentos consecutivos, se marca como "no saludable" y se saca de rotación</li>
      <li>Detecta fallos antes de que un usuario real los sufra</li>
      <li>Agrega tráfico extra constante, aunque mínimo</li>
    </ul>
  </div>
  <div class="info-card">
    <h5>Health checks pasivos</h5>
    <ul>
      <li>El load balancer observa las respuestas a tráfico real de usuarios</li>
      <li>Si un servidor empieza a devolver errores o timeouts, se marca como no saludable</li>
      <li>No agrega tráfico sintético, pero el primer usuario en detectar el fallo tiene mala experiencia</li>
      <li>Se suele combinar con activos: pasivo para reacción rápida, activo para reincorporar el servidor cuando se recupera</li>
    </ul>
  </div>
</div>
<div class="alert-card">💡 En un sistema de telemetría automotriz con capa de ingesta detrás de un load balancer, IP Hash o sticky sessions casi nunca tienen sentido — cada request de un vehículo es independiente y stateless, así que round robin o least connections son suficientes. Sticky sessions sí importan en la capa de aplicación web de operadores, si mantienes estado de sesión en memoria del servidor en vez de externalizado.</div>
  </div>
  <div id="sde-3" class="tab-panel">
<div class="concept-intro">El <strong>caching</strong> guarda una copia de un resultado costoso de calcular u obtener, para servirlo mucho más rápido la siguiente vez que se pida. Es probablemente la técnica individual con mayor retorno para reducir latencia y carga en un sistema — pero también introduce el problema clásico de "hay solo dos cosas difíciles en computación: invalidación de caché y nombrar variables".</div>
<table class="kv-table">
<tr><th>Nivel de cache</th><th>Dónde vive</th><th>Ejemplo</th></tr>
<tr><td>Cliente</td><td>Navegador o app móvil</td><td>Cache HTTP con headers <code>Cache-Control</code>, almacenamiento local de assets estáticos</td></tr>
<tr><td>CDN</td><td>Servidores edge geográficamente distribuidos, cerca del usuario</td><td>Imágenes, JS/CSS, mapas de tiles de navegación, actualizaciones de firmware descargables</td></tr>
<tr><td>Aplicación</td><td>Cache en memoria dentro o al lado del servicio</td><td>Redis/Memcached guardando la última posición conocida de cada vehículo</td></tr>
<tr><td>Base de datos</td><td>Buffer pool / query cache interno del motor de BD</td><td>Páginas de índice y datos recientemente accedidos en memoria del motor</td></tr>
</table>
<table class="kv-table">
<tr><th>Estrategia de invalidación</th><th>Cómo funciona</th><th>Trade-off</th></tr>
<tr><td>TTL (Time To Live)</td><td>Cada entrada expira automáticamente después de N segundos, sin importar si el dato subyacente cambió</td><td>Simple de implementar, pero puede servir datos obsoletos hasta que expire, o desperdiciar recalculo si expira antes de tiempo</td></tr>
<tr><td>Cache-aside (lazy loading)</td><td>La aplicación consulta el cache primero; si no está (cache miss), lee de la BD y luego escribe el resultado al cache</td><td>Solo se cachea lo que realmente se pide (eficiente en memoria), pero el primer request tras un miss siempre es lento</td></tr>
<tr><td>Write-through</td><td>Cada escritura se hace simultáneamente al cache y a la base de datos, de forma síncrona</td><td>El cache nunca queda desactualizado, pero cada escritura es más lenta (dos operaciones en el camino crítico)</td></tr>
<tr><td>Write-back (write-behind)</td><td>La escritura va primero al cache, que confirma de inmediato, y se persiste a la BD de forma asíncrona/diferida</td><td>Escrituras muy rápidas, pero hay riesgo de pérdida de datos si el cache falla antes de persistir</td></tr>
</table>
<div class="alert-card">💡 Cache stampede (thundering herd): cuando una entrada muy popular expira, miles de requests simultáneos pueden golpear la base de datos a la vez intentando recalcularla, tumbándola. Mitígalo con locking (solo un request recalcula, los demás esperan) o con jitter en el TTL (no expires todas las entradas relacionadas exactamente al mismo segundo).</div>
<div class="concept-intro">Usa un <strong>CDN</strong> cuando el contenido es mayormente estático o cambia con poca frecuencia, se sirve a usuarios geográficamente distribuidos, y tiene una proporción de lecturas muy superior a las escrituras. Ejemplos claros: imágenes y video, paquetes de actualización de firmware OTA para una flota de vehículos, tiles de mapas para una app de navegación. No tiene sentido para datos altamente personalizados o que cambian constantemente por usuario, como la posición GPS en vivo de un vehículo específico — ahí el patrón correcto es cache de aplicación con TTL corto, no CDN.</div>
  </div>
</div>
`,

'sysd-datos': `
<div class="tab-group-sdd">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'sdd-1','sdd')">SQL vs NoSQL</button>
    <button class="tab-btn" onclick="switchTab(this,'sdd-2','sdd')">Sharding y Replicación</button>
    <button class="tab-btn" onclick="switchTab(this,'sdd-3','sdd')">CAP Theorem e Indexing</button>
  </div>
  <div id="sdd-1" class="tab-panel active">
<div class="concept-intro">Reducir la diferencia entre SQL y NoSQL a "uno es relacional y el otro no" es superficial y no te sirve en una entrevista. La diferencia real está en el <strong>modelo de consistencia</strong>, cómo <strong>escalan</strong>, qué tan <strong>rígido es el esquema</strong>, y qué tipo de <strong>consultas</strong> optimizan. Elegir mal aquí es una de las decisiones de diseño más caras de revertir una vez el sistema está en producción.</div>
<table class="kv-table">
<tr><th>Aspecto</th><th>SQL (relacional)</th><th>NoSQL</th></tr>
<tr><td>Modelo de datos</td><td>Tablas con filas y columnas, relaciones vía claves foráneas</td><td>Documentos, pares clave-valor, columnas anchas, o grafos — según el tipo</td></tr>
<tr><td>Esquema</td><td>Fijo y validado en cada escritura (schema-on-write)</td><td>Flexible o inexistente — se valida al leer, si acaso (schema-on-read)</td></tr>
<tr><td>Transacciones</td><td>ACID fuerte, incluso multi-fila y multi-tabla</td><td>Generalmente BASE (consistencia eventual); algunas ofrecen ACID limitado a nivel de documento</td></tr>
<tr><td>Consultas complejas / joins</td><td>Optimizado para joins entre múltiples tablas</td><td>Los joins son costosos o no existen — se favorece desnormalizar y duplicar datos</td></tr>
<tr><td>Escalabilidad</td><td>Naturalmente vertical; horizontal requiere sharding manual y complejo</td><td>Diseñado desde el origen para escalar horizontalmente (particionado nativo)</td></tr>
<tr><td>Consistencia</td><td>Fuerte por defecto</td><td>Eventual por defecto (configurable en algunos: Cassandra, DynamoDB)</td></tr>
<tr><td>Caso de uso típico</td><td>Pagos, inventario, cualquier dato donde la integridad referencial es crítica</td><td>Catálogos con atributos variables, sesiones, series de tiempo a gran escala, grafos sociales</td></tr>
</table>
<div class="concept-intro">Dentro de "NoSQL" hay cuatro familias con propósitos muy distintos entre sí — tratarlas como una sola categoría es otro error común de entrevista:</div>
<div class="two-col">
  <div class="info-card">
    <h5>Documentos (MongoDB, Couchbase)</h5>
    <ul>
      <li>Cada registro es un documento JSON/BSON auto-contenido, con estructura flexible</li>
      <li>Ideal cuando distintos registros del mismo tipo tienen atributos distintos</li>
      <li>Ejemplo: catálogo de configuraciones de vehículo, donde cada modelo tiene un conjunto diferente de opciones/sensores</li>
    </ul>
  </div>
  <div class="info-card">
    <h5>Clave-valor (Redis, DynamoDB)</h5>
    <ul>
      <li>Acceso extremadamente rápido por clave única, sin capacidad real de consulta por contenido</li>
      <li>Ideal para cache, sesiones, contadores, colas simples</li>
      <li>Ejemplo: última posición GPS conocida de cada vehículo, indexada por ID de vehículo</li>
    </ul>
  </div>
  <div class="info-card">
    <h5>Columnar / ancho (Cassandra, HBase, BigTable)</h5>
    <ul>
      <li>Optimizada para escrituras masivas y lecturas por rango de tiempo, distribuida entre muchos nodos por diseño</li>
      <li>Ideal para series de tiempo a gran volumen</li>
      <li>Ejemplo: telemetría cruda de una flota de 500,000 vehículos, cientos de miles de escrituras/segundo</li>
    </ul>
  </div>
  <div class="info-card">
    <h5>Grafos (Neo4j, Amazon Neptune)</h5>
    <ul>
      <li>Optimizada para consultas de relaciones profundas entre entidades (varios "saltos")</li>
      <li>Ideal cuando la pregunta de negocio es sobre conexiones, no sobre registros individuales</li>
      <li>Ejemplo: red de rutas y conexiones viales para cálculo de rutas óptimas, o jerarquías de propiedad de una flota corporativa</li>
    </ul>
  </div>
</div>
<div class="alert-card">💡 Ejemplo integrador de una plataforma de e-commerce típica: pedidos y pagos van en SQL (necesitas ACID real — no puedes cobrar dos veces ni perder un pedido); el catálogo de productos con atributos que varían por categoría va en un documento NoSQL; las sesiones de carrito de compra van en clave-valor con TTL; y el historial de eventos de analítica/clicks va en columnar. Un sistema real casi nunca usa una sola tecnología de datos — usa la correcta para cada sub-problema (esto se llama "polyglot persistence").</div>
  </div>
  <div id="sdd-2" class="tab-panel">
<div class="concept-intro"><strong>Sharding</strong> (particionado horizontal) significa dividir los datos de una tabla o colección entre varias máquinas, de modo que ninguna máquina individual tenga que guardar ni servir el 100% de los datos. Es la técnica que permite que una base de datos escale más allá de lo que una sola máquina puede soportar en disco, memoria o throughput de escritura.</div>
<table class="kv-table">
<tr><th>Estrategia de sharding</th><th>Cómo funciona</th><th>Riesgo principal</th></tr>
<tr><td>Por rango (range-based)</td><td>Cada shard guarda un rango contiguo de la clave de partición (ej. vehículos con ID 0-99,999 en shard 1, 100,000-199,999 en shard 2)</td><td>Hotspots: si el tráfico se concentra en un rango (ej. IDs recientes), ese shard se sobrecarga mientras otros están ociosos</td></tr>
<tr><td>Por hash</td><td>Se aplica una función hash a la clave de partición y el resultado determina el shard, distribuyendo uniformemente</td><td>Distribución pareja, pero las consultas por rango (ej. "todos los vehículos entre ID 1000 y 2000") requieren consultar todos los shards</td></tr>
<tr><td>Geográfico (geo-sharding)</td><td>Los datos se particionan según ubicación física del usuario/recurso (ej. flota en Norteamérica en un shard, Europa en otro)</td><td>Distribución desigual si el negocio no está equilibrado geográficamente; complica consultas cross-región</td></tr>
<tr><td>Por directorio (lookup service)</td><td>Un servicio central mantiene un mapa explícito de qué clave vive en qué shard, en vez de calcularlo por fórmula</td><td>El servicio de directorio se vuelve un punto crítico — necesita alta disponibilidad y baja latencia propia</td></tr>
</table>
<div class="alert-card">💡 En un sistema de telemetría de flota, shardear por hash del ID de vehículo suele ser mejor que por rango: evita que toda una flota corporativa recién dada de alta (con IDs consecutivos) termine concentrada en un solo shard mientras el resto de la flota histórica satura otros de forma desigual.</div>
<div class="concept-intro"><strong>Replicación</strong> resuelve un problema distinto al sharding: no reparte datos distintos entre máquinas, sino que mantiene copias del mismo dato en varias máquinas — para tolerancia a fallos y para repartir la carga de lectura.</div>
<div class="two-col">
  <div class="info-card">
    <h5>Maestro-esclavo (primary-replica)</h5>
    <ul>
      <li>Todas las escrituras van al nodo primario; los réplicas (secundarios) reciben los cambios de forma asíncrona o semi-síncrona</li>
      <li>Las lecturas se pueden repartir entre las réplicas, escalando la capacidad de lectura horizontalmente</li>
      <li>Riesgo: <strong>replication lag</strong> — una réplica puede estar unos milisegundos o segundos "atrás" del primario</li>
      <li>Simple de razonar: siempre hay un único origen de verdad para las escrituras</li>
    </ul>
  </div>
  <div class="info-card">
    <h5>Multi-maestro (multi-master)</h5>
    <ul>
      <li>Varios nodos aceptan escrituras simultáneamente, típicamente uno por región geográfica</li>
      <li>Permite baja latencia de escritura en cada región, sin depender de un primario lejano</li>
      <li>Riesgo: conflictos de escritura cuando el mismo dato se modifica en dos nodos al mismo tiempo — requiere una estrategia de resolución (last-write-wins, vectores de versión, resolución a nivel de aplicación)</li>
      <li>Mucho más complejo operacionalmente que maestro-esclavo</li>
    </ul>
  </div>
</div>
<div class="concept-intro">La <strong>consistencia eventual</strong> es la consecuencia directa de la replicación asíncrona: después de una escritura en el primario, existe una ventana de tiempo (típicamente milisegundos) en la que una lectura desde una réplica puede devolver el valor anterior. Esto genera el problema clásico de "read your own writes": un usuario actualiza su perfil y, al recargar la página inmediatamente, ve los datos viejos porque la lectura cayó en una réplica que aún no recibió el cambio. Se mitiga leyendo del primario justo después de escribir (para esa sesión), usando "sticky sessions" hacia la misma réplica, o aceptando el retraso cuando el caso de uso lo permite — por ejemplo, la posición histórica de un vehículo en un reporte no necesita ser 100% en tiempo real.</div>
  </div>
  <div id="sdd-3" class="tab-panel">
<div class="concept-intro">El <strong>CAP theorem</strong> (Brewer, 2000) dice que un sistema distribuido no puede garantizar simultáneamente las tres propiedades siguientes: <strong>C</strong>onsistencia (todos los nodos ven los mismos datos al mismo tiempo), <strong>A</strong>vailability/Disponibilidad (todo request recibe una respuesta, sin importar si es la más reciente), y <strong>P</strong>artition tolerance (el sistema sigue funcionando aunque se pierda comunicación entre nodos). En la práctica, la tolerancia a particiones no es opcional — en cualquier sistema distribuido real, la red va a fallar tarde o temprano. Así que la elección real de diseño es entre <strong>C</strong> y <strong>A</strong> durante el momento en que ocurre una partición.</div>
<div class="dtree">
  <div class="dtree-title">Ejemplo concreto: partición de red entre dos data centers</div>
  <div class="dtree-step">
    <div class="dtree-num">1</div>
    <div class="dtree-body">
      <h5>Setup: una base de datos de posición de vehículos replicada entre DC-A (este) y DC-B (oeste)</h5>
      <p>Un vehículo reporta su posición y el request llega a DC-A. En condiciones normales, DC-A replica el cambio a DC-B en milisegundos.</p>
    </div>
  </div>
  <div class="dtree-step">
    <div class="dtree-num">2</div>
    <div class="dtree-body">
      <h5>El enlace de red entre DC-A y DC-B se cae (partición)</h5>
      <p>Ambos data centers siguen operativos individualmente, pero no pueden comunicarse entre sí. Llega un request de lectura a DC-B para ese mismo vehículo. ¿Qué hace el sistema?</p>
    </div>
  </div>
  <div class="dtree-step">
    <div class="dtree-num">3</div>
    <div class="dtree-body">
      <h5>Opción CP — priorizar Consistencia</h5>
      <p><span class="yes">Elegido por: MongoDB (config. por defecto), HBase, ZooKeeper.</span> DC-B rechaza el request o devuelve error hasta que la partición se resuelva, porque no puede garantizar que el dato que tiene es el más reciente. El sistema se vuelve parcialmente <em>no disponible</em> para no arriesgar mostrar un dato incorrecto.</p>
    </div>
  </div>
  <div class="dtree-step">
    <div class="dtree-num">4</div>
    <div class="dtree-body">
      <h5>Opción AP — priorizar Disponibilidad</h5>
      <p><span class="no">Elegido por: Cassandra, DynamoDB, DNS.</span> DC-B responde con la última posición que tiene almacenada localmente, aunque pueda estar desactualizada respecto a lo que ya se escribió en DC-A. Cuando la partición se resuelve, los cambios se reconcilian (a veces con conflictos que hay que resolver).</p>
    </div>
  </div>
</div>
<table class="kv-table">
<tr><th>Aspecto</th><th>Sistema CP</th><th>Sistema AP</th></tr>
<tr><td>Comportamiento durante la partición</td><td>Rechaza requests que no puede garantizar consistentes</td><td>Sigue respondiendo, aceptando posible inconsistencia temporal</td></tr>
<tr><td>Riesgo principal</td><td>Downtime parcial durante la partición</td><td>Datos "stale" (desactualizados) servidos a algunos usuarios</td></tr>
<tr><td>Cuándo elegirlo</td><td>Datos financieros, inventario, cualquier dato donde mostrar información incorrecta es peor que no mostrar nada</td><td>Feeds, contadores de vistas, posición aproximada — donde un dato levemente viejo es aceptable y la disponibilidad es crítica</td></tr>
</table>
<div class="concept-intro">Un <strong>índice</strong> es una estructura de datos auxiliar (típicamente un B-Tree o un hash) que la base de datos mantiene ordenada para acelerar búsquedas por una columna específica, evitando escanear la tabla completa (full table scan). Sin índice, buscar un vehículo por su VIN entre 50 millones de registros es O(n) — recorre todo. Con un índice B-Tree sobre esa columna, la búsqueda es O(log n) — con 50 millones de filas, eso son ~26 comparaciones en vez de 50 millones.</div>
<div class="alert-card">💡 El costo oculto: cada índice acelera lecturas pero ralentiza escrituras, porque cada <code>INSERT</code>/<code>UPDATE</code>/<code>DELETE</code> tiene que actualizar no solo la tabla sino también la estructura del índice. Una tabla con 10 índices puede tener escrituras varias veces más lentas que la misma tabla sin ellos. Regla práctica de diseño: indexa las columnas usadas en <code>WHERE</code>, <code>JOIN</code> y <code>ORDER BY</code> que tengan alta cardinalidad (muchos valores distintos, como un VIN o un ID); evita indexar columnas de baja cardinalidad como un booleano o un enum de 3 valores, donde el índice aporta poco y el costo de escritura no se justifica.</div>
  </div>
</div>
`,

'sysd-errores': `
<div class="tab-group-sdx">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'sdx-1','sdx')">Errores de diseño técnico</button>
    <button class="tab-btn" onclick="switchTab(this,'sdx-2','sdx')">Errores de comunicación en la entrevista</button>
  </div>
  <div id="sdx-1" class="tab-panel active">
<div class="concept-intro">Estos son los errores de diseño técnico que más se repiten tanto en entrevistas de system design como en sistemas reales de producción. Ninguno es un error de "no saber la tecnología" — son errores de razonamiento. Reconocer la causa raíz de cada uno en el momento es lo que separa una respuesta de nivel senior de una de nivel junior.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>Un solo servidor de base de datos maneja todas las lecturas y escrituras. Si se cae, la aplicación completa deja de funcionar. El diagrama no muestra ningún mecanismo de respaldo.</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>Base de datos primaria + al menos 2 réplicas de lectura, con failover automático (ej. Patroni, o el mecanismo nativo del proveedor cloud). Ningún componente crítico depende de una sola instancia.</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> se diseña pensando en el caso feliz y nunca se pregunta "¿qué pasa si este nodo muere ahora mismo?". Cómo detectarlo en la entrevista: señala cada caja de tu propio diagrama y verbaliza qué ocurre si desaparece; si la respuesta es "todo se cae", ahí tienes un single point of failure (SPOF) que debes resolver antes de seguir.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>Diseñar un sistema de notificaciones con Kafka, sharding y despliegue multi-región para una herramienta interna de 200 usuarios (sobre-ingeniería). O, al revés, diseñar sin preguntar la escala y terminar con un monolito con una sola base de datos que se cae a los 50,000 usuarios concurrentes (sub-ingeniería).</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>Antes de dibujar una sola caja, se calcula el orden de magnitud: usuarios activos, requests por segundo, tamaño de datos a 1-5 años. Con esos números se decide si hace falta una cola distribuida o basta un cron simple, un solo Postgres o sharding.</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> se salta la fase de estimación (back-of-the-envelope) porque "se siente" como perder tiempo frente al pizarrón. En realidad esa estimación determina el resto de las decisiones. Sin números, tanto sobre-diseñar como sub-diseñar son igual de probables, y ambos son señales negativas para el entrevistador.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>Se elige una base de datos fuertemente consistente para un feed social global sin justificar la decisión, ignorando que para ese caso de uso la disponibilidad importa más que la consistencia estricta (un like duplicado no es grave; que el feed no cargue sí lo es).</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>Se declara explícitamente: "para el feed priorizo disponibilidad, así que uso una base eventualmente consistente (ej. Cassandra/DynamoDB); para el balance de una cuenta bancaria priorizo consistencia estricta, así que uso una base relacional con transacciones ACID".</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> se trata la elección de base de datos como una decisión de moda tecnológica en vez de una decisión derivada de los requisitos del negocio. En una partición de red hay que sacrificar consistencia o disponibilidad (CAP): dilo en voz alta y justifica por qué ese sacrificio es aceptable para ese dominio específico.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>Pasar 15 minutos diseñando un caché multinivel súper afinado para el endpoint de login, mientras el verdadero cuello de botella (una consulta N+1 sin índice en el endpoint de búsqueda) ni siquiera se menciona.</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>Se identifica primero el componente con más tráfico/latencia/costo, normalmente con un estimado de QPS por endpoint, y se enfoca ahí el tiempo de diseño. El resto de los componentes se diseñan "simples y correctos" hasta que haya evidencia de que son un problema real.</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> el candidato se enfoca en el problema que sabe resolver de memoria, no en el que realmente importa para este sistema. Antes de optimizar cualquier pieza, pregúntate "¿cuál es el componente que va a recibir más carga?" y prioriza ahí tu tiempo y tu explicación.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>El diagrama asume que la llamada a un servicio de pagos externo siempre responde en menos de 100ms y siempre tiene éxito; no hay timeout, ni reintentos, ni circuit breaker en ninguna parte del diseño.</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>Toda llamada de red externa tiene timeout explícito, política de reintentos con backoff exponencial, y un circuit breaker que corta las llamadas si el servicio downstream está caído, devolviendo un modo degradado en vez de colgar la petición del usuario.</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> se diseña el "camino feliz" porque es el primero que viene a la mente. En un sistema distribuido la red falla, los servicios se caen y los timeouts ocurren constantemente. Un entrevistador senior espera que menciones fallos y su manejo sin que se lo pidan explícitamente.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>El servicio de "checkout" lee y escribe directamente en la base de datos interna del servicio de "inventario", saltándose su API, porque "es más rápido de implementar".</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>El servicio de checkout se comunica con inventario únicamente a través de su API pública (o mediante un evento asíncrono). Cada servicio es dueño exclusivo de sus propios datos; nadie más los toca directamente.</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> son atajos que ahorran tiempo a corto plazo pero crean acoplamiento fuerte: un cambio de esquema en inventario rompe checkout en producción, y ya no se puede escalar ni desplegar cada servicio de forma independiente. Regla simple para la entrevista: si dos servicios comparten una base de datos, en la práctica son un solo servicio con dos nombres.</div>
  </div>

  <div id="sdx-2" class="tab-panel">
<div class="concept-intro">Un diseño técnicamente correcto puede fallar en la entrevista si la comunicación es mala. Estos errores de comportamiento son tan decisivos como los técnicos, porque el entrevistador solo puede evaluar aquello que verbalizas — no lo que piensas en silencio.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>El entrevistador dice "diseña un sistema de mensajería" y el candidato empieza a dibujar cajas de inmediato: "Ok, tenemos un load balancer, después un servicio de mensajes..."</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>El candidato pregunta primero: "¿Es mensajería uno a uno o también grupos? ¿Necesitamos entrega en tiempo real o hay tolerancia de segundos? ¿Orden de cuántos usuarios activos? ¿El historial debe persistir o es efímero?"</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> la ansiedad por "demostrar que sabe" empuja a saltar directo a la solución. El problema es que, sin clarificar, el candidato termina diseñando un sistema distinto al que el entrevistador tenía en mente, y pierde puntos aunque el diseño sea técnicamente bueno. Los primeros 5 minutos de preguntas son la parte de la entrevista con mejor retorno por minuto invertido.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>El candidato se queda 90 segundos en silencio mirando el diagrama, pensando cómo resolver el sharding, sin dar ninguna señal de por dónde va su razonamiento.</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>El candidato narra: "Estoy pensando cómo particionar esta tabla. Hay dos opciones: por rango de fecha o por hash de user_id. Voy a usar hash porque evita hot spots en el particionamiento por fecha reciente; dame un segundo para pensar en las implicancias."</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> se trata la entrevista como un examen escrito en vez de una sesión de pair-design. El silencio no le da al entrevistador ninguna señal de si vas por buen camino, ni te da crédito por el razonamiento correcto que sí tenías en la cabeza. Practica narrar en voz alta incluso cuando la idea todavía no está del todo formada.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>El candidato arranca dibujando Kafka, seis microservicios, caché distribuido multi-región y un data lake, todo en los primeros 5 minutos, antes de tener siquiera un diseño básico funcionando en el pizarrón.</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>El candidato dibuja primero un diseño simple de 3-4 cajas que resuelve el caso base ("cliente → API → base de datos"), lo valida verbalmente con el entrevistador, y luego agrega caché, colas o sharding justificando cada adición con un cuello de botella concreto.</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> querer impresionar desde el inicio con vocabulario avanzado, en vez de demostrar la habilidad más valiosa: iterar un diseño de forma incremental y justificada. Empezar simple y evolucionar es exactamente el proceso que se usa en un trabajo real, y es lo que un entrevistador senior está evaluando.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>El candidato pasa 35 de los 45 minutos afinando requisitos y el modelo de datos, y le quedan 5 minutos para el diseño de alto nivel — nunca llega a hablar de escalabilidad ni de trade-offs.</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>El candidato divide mentalmente los 45 minutos desde el inicio y anuncia los cambios de fase en voz alta: "Ya tengo claros los requisitos, voy a pasar al diseño de alto nivel para no quedarme sin tiempo."</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> no tener un presupuesto de tiempo explícito en la cabeza. Es fácil perderse en detalles de un área que se domina (ej. el modelo de datos) y descuidar el resto. Fija checkpoints mentales de tiempo y respétalos, aunque signifique cortar una discusión que te resulte cómoda.</div>

<div class="error-compare">
  <div class="err-bad"><div class="err-label">❌ Incorrecto</div><pre>El candidato diseña en silencio durante 20 minutos sin preguntar nada, y al final dice "¿está bien así?" — recién ahí descubre que el entrevistador quería que profundizara en notificaciones, no en el modelo de datos.</pre></div>
  <div class="err-good"><div class="err-label">✅ Correcto</div><pre>Cada 8-10 minutos, el candidato pausa y pregunta: "¿Quieres que profundice en cómo escalamos la base de datos, o prefieres que hable del sistema de notificaciones en tiempo real?", dejando que el entrevistador dirija dónde profundizar.</pre></div>
</div>
<div class="error-note"><b>Por qué pasa:</b> tratar la entrevista como una presentación unidireccional en vez de una conversación colaborativa. El entrevistador suele tener un área específica en mente donde quiere ver profundidad técnica; preguntar activamente evita gastar el tiempo limitado en el área equivocada.</div>

<div class="alert-card">💡 Estructura sugerida para una entrevista de system design de 45 minutos: <strong>5 min</strong> preguntas de clarificación · <strong>5 min</strong> estimación de escala (usuarios, QPS, storage) · <strong>15 min</strong> diseño de alto nivel (componentes principales y cómo se conectan) · <strong>15 min</strong> deep dive (el entrevistador o tú eligen 1-2 áreas para profundizar: base de datos, caché, colas, etc.) · <strong>5 min</strong> trade-offs finales y preguntas al entrevistador. Ajusta sobre la marcha, pero ten estos bloques en mente para no quedarte sin tiempo en la parte que más pesa: el diseño de alto nivel y el deep dive.</div>
  </div>
</div>
`,

'sysd-practicas': `
<div class="tab-group-sdp">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'sdp-1','sdp')">Prácticas de diseño</button>
    <button class="tab-btn" onclick="switchTab(this,'sdp-2','sdp')">Prácticas para la entrevista</button>
  </div>
  <div id="sdp-1" class="tab-panel active">
<div class="concept-intro">Estas son las prácticas técnicas que separan un diseño de sistemas sólido de uno frágil. No son reglas absolutas — son heurísticas que debes justificar con los requisitos concretos del problema que tienes enfrente, no aplicar de memoria.</div>

<div class="practice-card">
  <div class="practice-title">Empieza simple y escala según la necesidad real</div>
  <p>No diseñes para 1,000 millones de usuarios si el requisito son 10,000. Arranca con un monolito bien estructurado y una sola base de datos; agrega <code>cache</code>, sharding o colas solo cuando los números de tu estimación de escala lo justifiquen. Sobre-diseñar es una señal tan negativa como sub-diseñar.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Haz explícitos los trade-offs en voz alta</div>
  <p>Nunca elijas una tecnología sin decir por qué. Frase tipo: "elijo una base de datos eventualmente consistente sobre una fuertemente consistente porque priorizo disponibilidad para el feed, y un like duplicado no es un problema real". Esto demuestra que entiendes las consecuencias de la decisión, no solo el nombre de la herramienta.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Diseña asumiendo que todo puede fallar</div>
  <p>Cada llamada de red externa necesita timeout, reintentos con backoff exponencial y, si aplica, un <code>circuit breaker</code>. Menciona explícitamente qué pasa si el servicio downstream, la base de datos o la red se caen — no esperes a que te lo pregunten.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Separa responsabilidades sin sobre-fragmentar</div>
  <p>Divide el sistema en servicios cuando tienen ciclos de vida, equipos o patrones de escalado distintos — no por moda. Arrancar con 8 microservicios para un MVP crea más complejidad operativa (deploys, contratos de red, tracing distribuido) que la que resuelve. Empieza con menos servicios y separa cuando haya evidencia concreta.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Usa colas o buffers entre componentes de velocidad distinta</div>
  <p>Cuando un productor genera datos más rápido de lo que un consumidor puede procesarlos (ej. eventos de telemetría a 1000/seg contra un procesamiento que tarda 50ms cada uno), pon una cola (Kafka, SQS, RabbitMQ) en el medio. Desacopla ambos lados, absorbe picos de tráfico y permite reintentos sin perder datos.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Define SLAs claros antes de justificar decisiones de arquitectura</div>
  <p>Antes de elegir tecnología, fija números: disponibilidad objetivo (ej. 99.9%), latencia objetivo (ej. p99 menor a 200ms), durabilidad de datos. Esos números, no la preferencia personal, son los que determinan si hace falta réplicas multi-región, un caché o una cola — y le dan al entrevistador algo concreto contra lo cual evaluar tu diseño.</p>
</div>
  </div>

  <div id="sdp-2" class="tab-panel">
<div class="concept-intro">Un diseño excelente comunicado de forma pobre pierde la entrevista. Estas prácticas de comportamiento son igual de importantes que el contenido técnico — practícalas hasta que sean automáticas.</div>

<div class="practice-card">
  <div class="practice-title">Narra tu proceso de pensamiento en voz alta constantemente</div>
  <p>El entrevistador no puede leer tu mente. Verbaliza cada decisión, incluso las dudas: "podría usar SQL o NoSQL aquí, me inclino por SQL porque necesito transacciones para el pago". El silencio se interpreta como estancamiento aunque estés pensando bien.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Dibuja el diagrama a medida que hablas, no al final</div>
  <p>Ve construyendo las cajas y flechas del diagrama en tiempo real mientras explicas cada componente. Esto le da al entrevistador una referencia visual constante y evita el momento incómodo de dibujar todo de golpe al final.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Pregunta qué área le interesa profundizar antes de hacer deep dive tú mismo</div>
  <p>Después del diseño de alto nivel, pregunta activamente: "¿quieres que profundice en la base de datos, el caché, o el sistema de notificaciones?", en vez de asumir tú solo hacia dónde ir. Esto asegura que uses el tiempo de deep dive en lo que el entrevistador realmente quiere evaluar.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Reconoce las limitaciones de tu propio diseño de forma proactiva</div>
  <p>Antes de que te las señalen, di algo como: "este diseño no maneja bien picos de tráfico de más de 10x, ahí necesitaría un rate limiter y auto-scaling agresivo". Demuestra pensamiento crítico y honestidad técnica, dos señales muy valoradas en nivel senior.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Ten 2-3 sistemas reales que conozcas bien para inspirarte</div>
  <p>No intentes copiar de memoria un diseño de un blog que no entiendes a fondo — se nota cuando te preguntan por qué. Ten 2-3 sistemas que hayas estudiado o construido de verdad (ej. un pipeline de ingestión de logs de CI, un sistema de telemetría de vehículos) para razonar por analogía con fundamentos que sí dominas.</p>
</div>
<div class="practice-card">
  <div class="practice-title">Practica con cronómetro antes de la entrevista real</div>
  <p>Simula al menos 3-4 entrevistas completas de 45 minutos con un cronómetro visible. La gestión del tiempo es una habilidad que solo se entrena practicando bajo presión de tiempo real, no leyendo sobre el tema.</p>
</div>

<table class="kv-table">
<tr><th>Antes de la entrevista</th><th>Qué preparar</th></tr>
<tr><td>Practica con timer</td><td>Simula una entrevista de 45 min completa, cronometrada, respetando los 5 bloques de tiempo (clarificar, estimar, diseño, deep dive, trade-offs).</td></tr>
<tr><td>Domina los sistemas clásicos</td><td>URL shortener (bit.ly), sistema de chat (WhatsApp/Slack), feed de redes sociales (Twitter/Instagram), rate limiter, sistema de notificaciones push.</td></tr>
<tr><td>Repite conceptos base</td><td>Load balancing, caching, sharding/particionamiento, replicación, teorema CAP, colas de mensajes, CDN, consistent hashing.</td></tr>
<tr><td>Material de referencia</td><td>Designing Data-Intensive Applications (Kleppmann), System Design Interview Vol. 1 y 2 (Alex Xu), ByteByteGo.</td></tr>
<tr><td>Ten ejemplos reales propios</td><td>2-3 sistemas que hayas construido o estudiado a fondo (ej. un pipeline de datos de telemetría automotriz) para usarlos como referencia mental de decisiones reales.</td></tr>
</table>
  </div>
</div>
`,

'sysd-comunicacion': `
<div class="tab-group-sdc">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'sdc-1','sdc')">REST vs gRPC vs Message Queues</button>
    <button class="tab-btn" onclick="switchTab(this,'sdc-2','sdc')">Síncrono vs Asíncrono</button>
    <button class="tab-btn" onclick="switchTab(this,'sdc-3','sdc')">Pub/Sub y arquitectura orientada a eventos</button>
  </div>

  <div id="sdc-1" class="tab-panel active">
<div class="concept-intro">Cuando dos servicios necesitan hablar entre sí, la primera decisión de diseño es <strong>cómo</strong> se comunican. Las tres familias principales son: <strong>REST sobre HTTP</strong> (petición/respuesta, formato JSON, acoplamiento débil), <strong>gRPC</strong> (llamada a procedimiento remoto sobre HTTP/2, formato binario Protobuf, muy eficiente) y <strong>colas de mensajes</strong> (comunicación indirecta a través de un intermediario, desacoplada en el tiempo). Ninguna es "mejor" en abstracto — la pregunta correcta en una entrevista es <em>"¿necesito respuesta inmediata? ¿necesito máxima eficiencia entre microservicios internos? ¿necesito que el emisor no dependa de que el receptor esté vivo?"</em></div>

<table class="kv-table">
<tr><th>Dimensión</th><th>REST (HTTP/JSON)</th><th>gRPC (HTTP/2 + Protobuf)</th><th>Message Queue (Kafka/RabbitMQ)</th></tr>
<tr><td>Patrón</td><td>Petición → respuesta</td><td>Petición → respuesta (o streaming)</td><td>Publicar → entregado eventualmente</td></tr>
<tr><td>Acoplamiento temporal</td><td>Alto: ambos deben estar vivos</td><td>Alto: ambos deben estar vivos</td><td>Bajo: el receptor puede estar caído</td></tr>
<tr><td>Formato</td><td>JSON (texto, legible, pesado)</td><td>Protobuf (binario, compacto, tipado)</td><td>Cualquiera (JSON, Avro, Protobuf)</td></tr>
<tr><td>Rendimiento</td><td>Medio (parseo de texto, HTTP/1.1 típico)</td><td>Alto (binario + multiplexado HTTP/2)</td><td>Alto throughput, latencia añadida por el broker</td></tr>
<tr><td>Contrato</td><td>OpenAPI/Swagger (opcional, se puede romper en runtime)</td><td>.proto — contrato fuertemente tipado, generación de código</td><td>Schema registry opcional (Avro/Protobuf)</td></tr>
<tr><td>Uso típico</td><td>APIs públicas, frontend↔backend</td><td>Comunicación interna entre microservicios de bajo latencia</td><td>Eventos, procesamiento asíncrono, desacoplar productores/consumidores</td></tr>
<tr><td>Ejemplo automotriz</td><td>App móvil consultando estado de un vehículo</td><td>Servicio de ruteo llamando al servicio de telemetría en tiempo real</td><td>ECU Gateway publicando eventos de diagnóstico para múltiples consumidores</td></tr>
</table>

<div class="code-block"><div class="code-lang">REST — contrato HTTP/JSON</div><pre>
<span class="c-cm"># Request</span>
GET /vehicles/veh-4471/status HTTP/1.1
Host: api.flota.com
Authorization: Bearer &lt;token&gt;

<span class="c-cm"># Response 200 OK</span>
{
  <span class="c-st">"vehicle_id"</span>: <span class="c-st">"veh-4471"</span>,
  <span class="c-st">"speed_kmh"</span>: 87.3,
  <span class="c-st">"lat"</span>: 40.4168,
  <span class="c-st">"lon"</span>: -3.7038,
  <span class="c-st">"last_update"</span>: <span class="c-st">"2026-07-12T10:15:03Z"</span>
}
<span class="c-cm"># Simple, cacheable (GET), legible a simple vista, pero cada llamada</span>
<span class="c-cm"># paga el overhead de parsear JSON y de abrir/negociar la conexión.</span></pre></div>

<div class="code-block"><div class="code-lang">gRPC — contrato .proto</div><pre>
syntax = <span class="c-st">"proto3"</span>;

service TelemetryService {
  rpc GetVehicleStatus (VehicleRequest) returns (VehicleStatus);
  rpc StreamTelemetry (VehicleRequest) returns (stream VehicleStatus); <span class="c-cm">// streaming nativo</span>
}

message VehicleRequest {
  string vehicle_id = 1;
}

message VehicleStatus {
  string vehicle_id = 1;
  float speed_kmh = 2;
  double lat = 3;
  double lon = 4;
  int64 last_update_epoch_ms = 5;
}
<span class="c-cm">// El cliente y el servidor generan código a partir del mismo .proto:</span>
<span class="c-cm">// imposible desalinear campos como puede pasar con JSON "a mano".</span>
<span class="c-cm">// Protobuf es ~3-10x más compacto que el JSON equivalente.</span></pre></div>

<div class="code-block"><div class="code-lang">Message Queue — envelope de un mensaje</div><pre>
<span class="c-cm"># Publicado en el topic/exchange "diagnostics.dtc"</span>
{
  <span class="c-st">"event_id"</span>: <span class="c-st">"a13f-...-9c2"</span>,
  <span class="c-st">"event_type"</span>: <span class="c-st">"dtc.raised"</span>,
  <span class="c-st">"vehicle_id"</span>: <span class="c-st">"veh-4471"</span>,
  <span class="c-st">"dtc_code"</span>: <span class="c-st">"P0301"</span>,
  <span class="c-st">"timestamp"</span>: <span class="c-st">"2026-07-12T10:15:03Z"</span>
}
<span class="c-cm"># El productor (ECU Gateway) publica y sigue su camino: no sabe ni</span>
<span class="c-cm"># le importa cuántos consumidores hay, ni si están vivos ahora mismo.</span>
<span class="c-cm"># Facturación, Notificaciones y Analytics pueden consumir el MISMO</span>
<span class="c-cm"># evento cada uno a su ritmo, sin que el productor cambie una línea.</span></pre></div>

<div class="alert-card">💡 Regla práctica de entrevista: si te preguntan "¿REST, gRPC o cola?", la respuesta correcta casi siempre es "depende de si necesito respuesta inmediata del otro lado (REST/gRPC) o si puedo tolerar que se procese después (cola)". Dentro de "respuesta inmediata", gRPC gana en comunicación interna de alto volumen entre servicios que tú controlas; REST gana cuando el consumidor es externo, humano-legible, o necesitas máxima compatibilidad (navegadores, terceros).</div>
  </div>

  <div id="sdc-2" class="tab-panel">
<div class="concept-intro">Una llamada <strong>síncrona</strong> bloquea al llamador hasta recibir respuesta: simple de razonar, pero cada servicio en la cadena hereda la latencia y la disponibilidad de todos los que llama. Una llamada <strong>asíncrona</strong> no bloquea: el llamador continúa y el resultado llega más tarde (callback, evento, polling). El trade-off central es <strong>latencia percibida vs throughput y acoplamiento</strong>: síncrono es más fácil de depurar pero encadena fallos (si un servicio de la cadena se cae o se pone lento, arrastra a todos los que dependen de él); asíncrono desacopla la disponibilidad de los servicios entre sí, a costa de mayor complejidad (consistencia eventual, necesidad de rastrear el estado de una operación en progreso).</div>

<div class="two-col">
  <div class="info-card">
    <h5>Síncrono</h5>
    <ul>
      <li>Respuesta inmediata — fácil de razonar y depurar</li>
      <li>El llamador queda bloqueado ocupando un hilo/conexión</li>
      <li>Acoplamiento fuerte: si B está caído o lento, A también lo está</li>
      <li>Los fallos se propagan y se pueden amplificar en cascada</li>
      <li>Bueno para: lecturas rápidas, operaciones donde el usuario espera un resultado ya (login, consulta de saldo)</li>
    </ul>
  </div>
  <div class="info-card">
    <h5>Asíncrono</h5>
    <ul>
      <li>El llamador sigue sin esperar — mayor throughput global</li>
      <li>Acoplamiento débil: B puede estar caído, el trabajo espera en la cola</li>
      <li>Mejor tolerancia a picos: la cola absorbe ráfagas de tráfico</li>
      <li>Más complejo: hay que rastrear el estado ("¿ya se procesó?") y manejar consistencia eventual</li>
      <li>Bueno para: trabajo pesado, notificaciones, procesos que no necesitan confirmación inmediata</li>
    </ul>
  </div>
</div>

<div class="code-block"><div class="code-lang">Problema — llamada síncrona que bloquea innecesariamente</div><pre>
<span class="c-cm"># Un servicio de "Reporte de incidencia de vehículo" recibe un DTC</span>
<span class="c-cm"># y, de forma síncrona, llama a 3 servicios antes de responder al cliente:</span>

<span class="c-kw">def</span> <span class="c-fn">reportar_incidencia</span>(dtc):
    guardar_en_bd(dtc)                     <span class="c-cm"># 20ms — necesario ya</span>
    enviar_email_a_taller(dtc)             <span class="c-cm"># 800ms — llamada a SMTP externo</span>
    actualizar_dashboard_analytics(dtc)    <span class="c-cm"># 400ms — servicio de analytics</span>
    <span class="c-kw">return</span> <span class="c-st">"OK"</span>
<span class="c-cm"># El cliente (una app móvil o el propio vehículo) espera ~1220ms</span>
<span class="c-cm"># por dos operaciones que NO necesita confirmar en el momento.</span>
<span class="c-cm"># Si el SMTP externo se degrada a 5s, el reporte de incidencia entero</span>
<span class="c-cm"># se vuelve lento — un problema ajeno "contamina" la ruta crítica.</span></pre></div>

<div class="code-block"><div class="code-lang">Solución — separar lo crítico de lo diferible con una cola</div><pre>
<span class="c-kw">def</span> <span class="c-fn">reportar_incidencia</span>(dtc):
    guardar_en_bd(dtc)                     <span class="c-cm"># 20ms — lo único que bloquea</span>
    cola.publicar(<span class="c-st">"incidencia.creada"</span>, dtc)  <span class="c-cm"># ~2ms — encolar y seguir</span>
    <span class="c-kw">return</span> <span class="c-st">"OK"</span>                        <span class="c-cm"># responde en ~22ms, no 1220ms</span>

<span class="c-cm"># Dos workers independientes consumen el evento a su propio ritmo:</span>
<span class="c-kw">def</span> <span class="c-fn">worker_notificaciones</span>(evento):
    enviar_email_a_taller(evento)          <span class="c-cm"># si falla, reintenta sin afectar al cliente</span>

<span class="c-kw">def</span> <span class="c-fn">worker_analytics</span>(evento):
    actualizar_dashboard_analytics(evento) <span class="c-cm"># corre cuando puede</span></pre></div>

<div class="alert-card">💡 Pregunta guía para decidir: "si esta llamada tarda 10x más de lo normal o falla por completo, ¿el usuario/cliente debe esperar o puede recibir su respuesta igual?" Si la respuesta es "puede recibir su respuesta igual", esa llamada es candidata a moverse fuera del camino síncrono.</div>
  </div>

  <div id="sdc-3" class="tab-panel">
<div class="concept-intro">Un <strong>event bus</strong> (o message broker) es un intermediario que recibe eventos de <strong>productores</strong> y los entrega a uno o más <strong>consumidores</strong>, sin que productores y consumidores se conozcan entre sí. Esta es la base de la <strong>arquitectura orientada a eventos</strong>: en vez de que el Servicio A llame directamente al Servicio B, C y D, el Servicio A simplemente anuncia "esto pasó" y quien esté interesado reacciona. Añadir un nuevo consumidor no requiere tocar al productor — eso es lo que hace esta arquitectura tan escalable en sistemas con muchos servicios.</div>

<div class="pipeline-diagram">
<span class="p-gray">┌─ PRODUCTORES ────────────────────────────────────────────────────────┐</span>
<span class="p-blue">  Servicio Pedidos · Servicio Pagos · ECU Gateway (eventos de diagnóstico)</span>
<span class="p-gray">└──────────────────────────────────────────────────────────────────────┘</span>
                                     <span class="p-gray">│ publica en un topic</span>
                                     <span class="p-gray">▼</span>
<span class="p-gray">┌─ EVENT BUS (Kafka / RabbitMQ) ─────────────────────────────────────────┐</span>
<span class="p-amber">  Topic "dtc.raised" — particionado por vehicle_id — retención 72h</span>
<span class="p-amber">  El evento queda persistido en el log aunque nadie lo consuma todavía</span>
<span class="p-gray">└──────────────────────────────────────────────────────────────────────┘</span>
                                     <span class="p-gray">│ cada consumer group lee su propio offset</span>
                                     <span class="p-gray">▼</span>
<span class="p-gray">┌─ CONSUMIDORES (independientes entre sí) ────────────────────────────────┐</span>
<span class="p-green">  Servicio de Alertas al taller · Servicio de Analytics · Servicio de Garantías</span>
<span class="p-red">  ⚠ si un consumidor cae, retoma desde su último offset — no pierde eventos</span>
<span class="p-gray">└──────────────────────────────────────────────────────────────────────┘</span>
</div>

<table class="kv-table">
<tr><th>Garantía de entrega</th><th>Significado</th><th>Riesgo</th><th>Cuándo usarla</th></tr>
<tr><td>At-most-once</td><td>El mensaje se entrega 0 o 1 vez</td><td>Se pueden perder mensajes</td><td>Métricas no críticas donde perder un dato ocasional es aceptable</td></tr>
<tr><td>At-least-once</td><td>El mensaje se entrega 1 o más veces (nunca se pierde)</td><td>Puede llegar duplicado — el consumidor debe ser idempotente</td><td>La mayoría de los sistemas de eventos de negocio (el default de Kafka/RabbitMQ)</td></tr>
<tr><td>Exactly-once</td><td>El mensaje se procesa exactamente una vez</td><td>Requiere coordinación extra (transacciones, deduplicación) — más costoso y más lento</td><td>Casos donde un duplicado causa daño real: cobros, conteo de inventario</td></tr>
</table>

<div class="concept-intro">En la práctica, la mayoría de los sistemas eligen <strong>at-least-once</strong> y resuelven el riesgo de duplicados haciendo que los consumidores sean <strong>idempotentes</strong> — por ejemplo, usando el <code>event_id</code> del mensaje para descartar procesamientos repetidos, en vez de intentar garantizar exactly-once a nivel de broker (que es costoso y en muchos brokers ni siquiera existe de forma nativa end-to-end).</div>

<div class="alert-card">💡 Conceptos clave que un entrevistador espera oír: <strong>topic/partición</strong> (subdivide un flujo de eventos, permite paralelismo — eventos del mismo <code>vehicle_id</code> van a la misma partición para preservar orden), <strong>consumer group</strong> (varios consumidores se reparten las particiones de un topic para escalar el consumo), y <strong>offset</strong> (puntero de "hasta dónde ha leído" cada consumer group — permite reprocesar desde un punto si algo falla).</div>
  </div>
</div>
`,

'sysd-confiabilidad': `
<div class="tab-group-sdr">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'sdr-1','sdr')">Redundancia y Failover</button>
    <button class="tab-btn" onclick="switchTab(this,'sdr-2','sdr')">Circuit Breakers y Rate Limiting</button>
    <button class="tab-btn" onclick="switchTab(this,'sdr-3','sdr')">Monitoreo y Observabilidad</button>
  </div>

  <div id="sdr-1" class="tab-panel active">
<div class="concept-intro">Un <strong>single point of failure (SPOF)</strong> es cualquier componente cuya caída tumba el sistema entero — una sola instancia de base de datos, un único load balancer, un solo data center. Eliminar SPOFs es la base de la confiabilidad: se logra con <strong>redundancia</strong> (tener más de una copia de cada componente crítico) combinada con <strong>failover</strong> (el mecanismo que detecta la caída y redirige el tráfico a la copia sana).</div>

<div class="two-col">
  <div class="info-card">
    <h5>Activa-Pasiva (Active-Passive)</h5>
    <ul>
      <li>Una instancia atiende tráfico ("activa"); la otra está en espera ("pasiva" / standby), lista para tomar el relevo</li>
      <li>Más simple de razonar: no hay que resolver conflictos de escritura concurrente</li>
      <li>Desperdicia capacidad: la instancia pasiva no hace trabajo útil mientras espera</li>
      <li>Hay un breve corte durante el failover (el tiempo de detectar la caída y promover al standby)</li>
      <li>Típico en bases de datos relacionales: primario + réplica en standby</li>
    </ul>
  </div>
  <div class="info-card">
    <h5>Activa-Activa (Active-Active)</h5>
    <ul>
      <li>Todas las instancias atienden tráfico en paralelo, repartido por un load balancer</li>
      <li>Mejor uso de capacidad — todo nodo contribuye siempre</li>
      <li>Si un nodo cae, el resto absorbe su tráfico sin corte perceptible (transparente para el cliente)</li>
      <li>Más complejo: hay que manejar consistencia entre nodos que escriben en paralelo</li>
      <li>Típico en servicios stateless (APIs) detrás de un load balancer con varias réplicas</li>
    </ul>
  </div>
</div>

<table class="kv-table">
<tr><th>Tipo de failover</th><th>Cómo funciona</th><th>Tiempo de recuperación</th><th>Riesgo</th></tr>
<tr><td>Manual</td><td>Un operador humano detecta la caída (alerta) y promueve la réplica a mano</td><td>Minutos a horas — depende de que alguien esté disponible</td><td>Error humano bajo presión; lento si nadie ve la alerta a tiempo</td></tr>
<tr><td>Automático</td><td>Un health check periódico detecta la caída y el sistema promueve la réplica sin intervención humana</td><td>Segundos — limitado por el intervalo del health check + tiempo de propagación</td><td>Un "false positive" (falla de red transitoria) puede disparar un failover innecesario ("split brain" si ambos nodos creen ser el primario)</td></tr>
</table>

<div class="alert-card">💡 En un sistema de flota de vehículos, el load balancer que recibe la telemetría es un candidato clásico a SPOF si solo hay una instancia: si cae, 10,000 vehículos dejan de poder reportar datos. La solución típica es desplegar varias instancias del load balancer detrás de un DNS con múltiples IPs o un balanceador de capa 4 gestionado por el proveedor cloud (que ya es redundante internamente), en vez de confiar en una sola máquina.</div>
  </div>

  <div id="sdr-2" class="tab-panel">
<div class="concept-intro">Un <strong>circuit breaker</strong> es un patrón que evita que un servicio siga golpeando a una dependencia que ya está fallando — igual que un breaker eléctrico corta el circuito para no seguir quemando el sistema. Sin él, un servicio caído puede provocar un <strong>cascading failure</strong>: cada llamador se queda esperando timeouts, agota sus hilos/conexiones disponibles, y termina cayendo también, propagando el fallo aguas arriba.</div>

<table class="kv-table">
<tr><th>Estado</th><th>Comportamiento</th><th>Transición</th></tr>
<tr><td><strong>Closed</strong> (cerrado)</td><td>Las llamadas pasan normalmente hacia la dependencia; se cuentan los fallos</td><td>Si la tasa de fallos supera un umbral (ej. 50% en 10s) → pasa a Open</td></tr>
<tr><td><strong>Open</strong> (abierto)</td><td>Las llamadas se rechazan de inmediato (fail-fast), sin siquiera intentar la dependencia — no se pierde tiempo en timeouts</td><td>Tras un tiempo de espera (ej. 30s) → pasa a Half-Open para probar</td></tr>
<tr><td><strong>Half-Open</strong> (semi-abierto)</td><td>Deja pasar un número limitado de llamadas de prueba para ver si la dependencia se recuperó</td><td>Si esas pruebas tienen éxito → vuelve a Closed. Si fallan → vuelve a Open</td></tr>
</table>

<div class="code-block"><div class="code-lang">Circuit breaker — pseudocódigo del ciclo de estados</div><pre>
<span class="c-kw">class</span> <span class="c-fn">CircuitBreaker</span>:
    <span class="c-kw">def</span> <span class="c-fn">llamar</span>(<span class="c-bi">self</span>, funcion):
        <span class="c-kw">if</span> <span class="c-bi">self</span>.estado == <span class="c-st">"OPEN"</span>:
            <span class="c-kw">if</span> tiempo_transcurrido() &lt; <span class="c-bi">self</span>.tiempo_espera:
                <span class="c-kw">raise</span> CircuitAbiertoError(<span class="c-st">"fail-fast, no se intenta la dependencia"</span>)
            <span class="c-bi">self</span>.estado = <span class="c-st">"HALF_OPEN"</span>  <span class="c-cm"># ya pasó el tiempo, probar de nuevo</span>

        <span class="c-kw">try</span>:
            resultado = funcion()
            <span class="c-bi">self</span>.registrar_exito()   <span class="c-cm"># si estaba HALF_OPEN, vuelve a CLOSED</span>
            <span class="c-kw">return</span> resultado
        <span class="c-kw">except</span> Exception:
            <span class="c-bi">self</span>.registrar_fallo()   <span class="c-cm"># si supera el umbral, pasa a OPEN</span>
            <span class="c-kw">raise</span></pre></div>

<div class="concept-intro"><strong>Rate limiting</strong> es distinto pero complementario: limita cuántas peticiones puede hacer un cliente en una ventana de tiempo, protegiendo al servicio de saturarse (por accidente o por abuso), independientemente de si la dependencia está sana o no.</div>

<table class="kv-table">
<tr><th>Algoritmo</th><th>Cómo funciona</th><th>Ventaja</th><th>Desventaja</th></tr>
<tr><td>Token bucket</td><td>Un "balde" se rellena con tokens a ritmo fijo; cada petición consume un token; sin tokens, se rechaza</td><td>Permite ráfagas cortas (burst) hasta el tamaño del balde</td><td>Requiere afinar tamaño del balde y tasa de relleno</td></tr>
<tr><td>Sliding window</td><td>Cuenta peticiones en una ventana de tiempo móvil (ej. últimos 60s, recalculada continuamente)</td><td>Más preciso que ventanas fijas — evita el "doble de tráfico" en el borde de dos ventanas</td><td>Más costoso de calcular que un contador simple</td></tr>
<tr><td>Fixed window</td><td>Cuenta peticiones en bloques de tiempo fijos (ej. 0-60s, 60-120s)</td><td>Simple y barato de implementar</td><td>Permite picos de 2x el límite justo en el borde entre dos ventanas</td></tr>
</table>

<div class="alert-card">💡 En un sistema de telemetría de flota, rate limiting protege el gateway de un vehículo con firmware defectuoso que reporta cada 100ms en vez de cada 5s; un circuit breaker protege al servicio de ingesta de seguir escribiendo a una base de datos time-series que ya está devolviendo timeouts, dándole tiempo a recuperarse en vez de amplificar la carga.</div>
  </div>

  <div id="sdr-3" class="tab-panel">
<div class="concept-intro">No se puede arreglar lo que no se puede ver. La <strong>observabilidad</strong> se apoya en tres pilares complementarios — cada uno responde una pregunta distinta cuando algo va mal en producción.</div>

<table class="kv-table">
<tr><th>Pilar</th><th>Qué responde</th><th>Ejemplo</th><th>Costo típico</th></tr>
<tr><td><strong>Logs</strong></td><td>"¿Qué pasó exactamente, con qué detalle, en este evento puntual?"</td><td>"Vehicle veh-4471 rechazado: token expirado a las 10:15:03"</td><td>Alto volumen — caro de almacenar sin muestreo/retención corta</td></tr>
<tr><td><strong>Métricas</strong></td><td>"¿Cómo se comporta el sistema en agregado, a lo largo del tiempo?"</td><td>"Tasa de ingesta: 2,050 msg/s; p99 de latencia: 340ms"</td><td>Bajo — son números agregados, baratos de almacenar y graficar</td></tr>
<tr><td><strong>Traces</strong></td><td>"¿Por dónde viajó esta petición concreta a través de todos los servicios?"</td><td>Gateway (2ms) → Cola (5ms) → Worker (40ms) → DB (12ms) = 59ms total</td><td>Medio — se suele muestrear (ej. 1 de cada 100 peticiones) para no encarecer</td></tr>
</table>

<div class="concept-intro">En un sistema distribuido, las métricas más importantes a vigilar se agrupan en tres categorías: <strong>latencia</strong> (no uses solo el promedio — usa percentiles), <strong>tasa de error</strong>, y <strong>saturación</strong> (qué tan cerca está un recurso de su límite).</div>

<table class="kv-table">
<tr><th>Métrica</th><th>Qué mide</th><th>Por qué importa</th></tr>
<tr><td>Latencia p50</td><td>La mitad de las peticiones responden más rápido que este valor</td><td>Representa la experiencia "típica" — poco útil sola porque esconde los peores casos</td></tr>
<tr><td>Latencia p95</td><td>El 5% más lento de las peticiones supera este valor</td><td>Empieza a mostrar degradación real que el promedio esconde</td></tr>
<tr><td>Latencia p99</td><td>Solo el 1% más lento supera este valor</td><td>Detecta colas de espera, garbage collection largo, contención de recursos — el "peor caso frecuente"</td></tr>
<tr><td>Error rate</td><td>% de peticiones que fallan (5xx, timeouts, excepciones)</td><td>Indicador directo de salud; base para SLOs ("99.9% de éxito")</td></tr>
<tr><td>Saturación</td><td>Uso de CPU, memoria, conexiones de DB, profundidad de cola, etc. respecto a su capacidad máxima</td><td>Predice problemas antes de que ocurran — una cola creciendo indica que el consumidor no da abasto</td></tr>
</table>

<div class="alert-card">💡 Por qué el promedio miente: si 99 peticiones tardan 10ms y 1 tarda 5000ms, el promedio es ~59ms — parece bien — pero el p99 (5000ms) revela que 1 de cada 100 usuarios tiene una experiencia terrible. Los promedios esconden colas largas; los percentiles altos (p95/p99) son los que realmente le importan a un usuario real y a un SLO serio.</div>

<div class="concept-intro"><strong>Alerting</strong> es la capa que convierte estas métricas en acción: se define un umbral (ej. "error rate &gt; 1% durante 5 minutos") y, al cruzarlo, se notifica a un humano (o se dispara una acción automática, como un failover o un auto-scale). La regla de oro es alertar sobre <em>síntomas visibles para el usuario</em> (latencia alta, errores) más que sobre causas internas (CPU al 80%) — el CPU alto no siempre importa; la experiencia del usuario degradada, siempre.</div>
  </div>
</div>
`,

'sysd-ejemplo': `
<div class="tab-group-sdw">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'sdw-1','sdw')">Requisitos y estimación</button>
    <button class="tab-btn" onclick="switchTab(this,'sdw-2','sdw')">Diseño de alto nivel</button>
    <button class="tab-btn" onclick="switchTab(this,'sdw-3','sdw')">Deep dive y trade-offs</button>
  </div>

  <div id="sdw-1" class="tab-panel active">
<div class="concept-intro"><strong>Problema:</strong> "Diseña un sistema que reciba telemetría (GPS, velocidad, diagnósticos) de una flota de 10,000 vehículos, cada uno enviando datos cada 5 segundos, y permita consultas en tiempo real del estado de la flota y análisis histórico." Aplicamos el framework completo empezando por aclarar el alcance antes de dibujar nada.</div>

<div class="plan-card">
  <div class="plan-card-title">Paso 1 — Requisitos funcionales</div>
  <div class="plan-block">
    <div class="plan-time">Ingesta</div>
    <div class="plan-content">
      <p>El sistema debe recibir, validar y almacenar telemetría de hasta 10,000 vehículos, cada uno enviando GPS (lat/lon), velocidad y diagnósticos (códigos DTC, RPM, temperatura de motor) cada 5 segundos.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Consulta en tiempo real</div>
    <div class="plan-content">
      <p>Un dashboard debe poder consultar el <strong>último estado conocido</strong> de un vehículo o de toda la flota (posición actual, velocidad, alertas activas) con baja latencia — el caso de uso típico es "¿dónde está mi flota ahora mismo?".</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Análisis histórico</div>
    <div class="plan-content">
      <p>Debe ser posible reconstruir la trayectoria y el historial de diagnósticos de un vehículo en un rango de fechas (ej. "ruta del camión veh-4471 la semana pasada"), y generar reportes agregados (kilometraje mensual, frecuencia de DTCs por modelo).</p>
    </div>
  </div>
</div>

<div class="plan-card">
  <div class="plan-card-title">Paso 2 — Requisitos no funcionales</div>
  <div class="plan-block">
    <div class="plan-time">Disponibilidad</div>
    <div class="plan-content">
      <p>No es un sistema de frenado ni de seguridad activa — la meta razonable es <strong>99.9%</strong> de disponibilidad (~8.8 horas de downtime al año), no 99.99%+. Un corte breve en la ingesta es tolerable si los vehículos hacen buffer local y reenvían.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Latencia</div>
    <div class="plan-content">
      <p>Ingesta → visible en el dashboard: objetivo <strong>p95 &lt; 2 segundos</strong>. Consultas históricas pueden tolerar cientos de milisegundos a pocos segundos — no son time-critical.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Consistencia y escalabilidad</div>
    <div class="plan-content">
      <p>Consistencia <strong>eventual</strong> es aceptable (ver deep-dive): un delay de 1-2s en ver el último dato no importa dado que los propios vehículos ya reportan con granularidad de 5s. El sistema debe poder escalar horizontalmente si la flota crece a 50,000+ vehículos sin rediseño.</p>
    </div>
  </div>
</div>

<div class="concept-intro"><strong>Paso 3 — Estimación de escala.</strong> Este es el paso que más entrevistas piden mostrar explícitamente. Partimos de los datos del enunciado y de un tamaño de mensaje estimado y justificado.</div>

<table class="kv-table">
<tr><th>Campo del mensaje</th><th>Tamaño estimado</th></tr>
<tr><td>vehicle_id</td><td>8 bytes</td></tr>
<tr><td>timestamp (epoch ms)</td><td>8 bytes</td></tr>
<tr><td>lat, lon (float32 x2)</td><td>8 bytes</td></tr>
<tr><td>speed_kmh (float32)</td><td>4 bytes</td></tr>
<tr><td>rpm, engine_temp, fuel_level (float32 x3)</td><td>12 bytes</td></tr>
<tr><td>dtc_flags (bitmask int32)</td><td>4 bytes</td></tr>
<tr><td>odometer (float32)</td><td>4 bytes</td></tr>
<tr><td>overhead de serialización (Protobuf)</td><td>~10 bytes</td></tr>
<tr><td><strong>Total por mensaje</strong></td><td><strong>~150 bytes</strong></td></tr>
</table>

<div class="code-block"><div class="code-lang">Cálculo de throughput y almacenamiento</div><pre>
<span class="c-cm"># --- Mensajes por segundo ---</span>
10,000 vehículos / 5 segundos por vehículo = <span class="c-nb">2,000</span> msg/s   <span class="c-cm"># promedio (throughput sostenido)</span>

<span class="c-cm"># Pico: reconexiones masivas tras un corte de red, hora punta de tráfico</span>
<span class="c-cm"># Asumimos un factor de pico conservador x3:</span>
2,000 msg/s * 3 = <span class="c-nb">6,000</span> msg/s   <span class="c-cm"># pico a diseñar</span>

<span class="c-cm"># --- Ancho de banda ---</span>
2,000 msg/s * 150 bytes = <span class="c-nb">300,000</span> bytes/s = <span class="c-nb">300</span> KB/s
300,000 bytes/s * 8 = <span class="c-nb">2,400,000</span> bits/s ≈ <span class="c-nb">2.4</span> Mbit/s   <span class="c-cm"># promedio, trivial para un backend moderno</span>

<span class="c-cm"># --- Mensajes por día ---</span>
2,000 msg/s * 86,400 s/día = <span class="c-nb">172,800,000</span> mensajes/día  ≈ <span class="c-nb">172.8</span> millones/día

<span class="c-cm"># --- Almacenamiento crudo por día ---</span>
172,800,000 msg * 150 bytes = <span class="c-nb">25,920,000,000</span> bytes ≈ <span class="c-nb">25.9</span> GB/día

<span class="c-cm"># --- Almacenamiento crudo por mes (30 días) ---</span>
25.9 GB/día * 30 = <span class="c-nb">777</span> GB/mes ≈ <span class="c-nb">0.78</span> TB/mes

<span class="c-cm"># --- Almacenamiento crudo por año (referencia) ---</span>
25.9 GB/día * 365 ≈ <span class="c-nb">9.46</span> TB/año   <span class="c-cm"># antes de replicación e índices</span>

<span class="c-cm"># Con factor de replicación x3 (típico en una DB distribuida tolerante</span>
<span class="c-cm"># a fallos) y ~15% de overhead de índices/metadata:</span>
9.46 TB * 3 * 1.15 ≈ <span class="c-nb">32.6</span> TB/año de almacenamiento real a aprovisionar</pre></div>

<div class="alert-card">💡 Conclusión de la estimación: el volumen de <strong>throughput</strong> (2,000-6,000 msg/s, ~2.4 Mbit/s) es modesto — cualquier cola de mensajes moderna lo maneja sin esfuerzo con un puñado de particiones. El reto real no es el volumen de tráfico, sino el <strong>almacenamiento a largo plazo</strong> (decenas de TB/año) y las <strong>consultas eficientes sobre ese histórico</strong> — eso es lo que determina la elección de base de datos, no la ingesta en sí.</div>
  </div>

  <div id="sdw-2" class="tab-panel">
<div class="concept-intro">Con los requisitos y la escala claros, el siguiente paso es dibujar los componentes principales y justificar por qué existe cada uno — no basta con nombrarlos, hay que poder defender la decisión.</div>

<div class="pipeline-diagram">
<span class="p-blue">Vehículos (10,000)</span> ──▶ <span class="p-green">Gateway / LB</span> ──▶ <span class="p-amber">Cola de mensajes (Kafka)</span> ──▶ <span class="p-blue">Workers</span>
                                                                                    │
                                                    ┌───────────────────────────────┴───────────────────────────────┐
                                                    ▼                                                                ▼
                                    <span class="p-gray">DB Time-Series (histórico)</span>                                       <span class="p-green">Cache (estado actual)</span>
                                    <span class="p-gray">TimescaleDB — partición día+vehicle_id</span>                          <span class="p-green">Redis — último dato por vehicle_id</span>
                                                    │                                                                │
                                                    └───────────────────────────────┬───────────────────────────────┘
                                                                                    ▼
                                                                    <span class="p-amber">API (REST histórico + WebSocket tiempo real)</span>
                                                                                    │
                                                                                    ▼
                                                                        <span class="p-blue">Dashboard de flota</span>
</div>

<div class="plan-card">
  <div class="plan-card-title">Rol de cada componente</div>
  <div class="plan-block">
    <div class="plan-time">Vehículos</div>
    <div class="plan-content">
      <p>Cada vehículo lleva un módulo telemático que arma el mensaje (~150 bytes) y lo envía por red celular. Mantiene un <strong>buffer local</strong> (ver deep-dive) para no perder datos cuando no hay señal.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Gateway / Load Balancer</div>
    <div class="plan-content">
      <p>Termina TLS, autentica cada vehículo (API key o certificado por dispositivo), aplica <strong>rate limiting</strong> por vehicle_id (protege contra un firmware con bug que reporte demasiado rápido) y reparte la carga entre varias instancias — sin él, un solo endpoint sería un SPOF para 10,000 vehículos.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Cola de mensajes (buffer)</div>
    <div class="plan-content">
      <p>Aquí está la decisión de diseño más importante del pipeline: <strong>¿por qué no escribir directo del Gateway a la base de datos?</strong> Tres razones: (1) <strong>Absorción de picos</strong> — el factor de pico x3 (6,000 msg/s) puede escribirse a ritmo constante desde la cola aunque llegue de forma irregular. (2) <strong>Desacoplamiento</strong> — si la DB se pone lenta o cae momentáneamente, los mensajes se acumulan en la cola en vez de perderse o tumbar el Gateway. (3) <strong>Fan-out</strong> — el mismo evento puede alimentar a la vez el pipeline de almacenamiento, un motor de detección de anomalías en tiempo real y un servicio de alertas, sin que el Gateway sepa nada de esos consumidores adicionales.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Workers de procesamiento</div>
    <div class="plan-content">
      <p>Consumen la cola, validan el esquema, descartan mensajes corruptos, detectan anomalías simples (velocidad &gt; 250 km/h, salto de coordenadas imposible) y escriben en dos destinos ("fan-out" de escritura, no de lectura).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">DB Time-Series + Cache — dos almacenes con propósitos distintos</div>
    <div class="plan-content">
      <p>La <strong>DB time-series</strong> (TimescaleDB/Cassandra/InfluxDB) está optimizada para escribir series temporales masivas y consultar rangos ("dame la ruta de veh-4471 entre el lunes y el viernes") — es el motor del análisis histórico. El <strong>cache</strong> (Redis) guarda solo el último valor por vehicle_id — una simple estructura clave-valor con lectura O(1) — porque consultar "¿dónde está la flota ahora?" contra la DB time-series (que puede tener miles de millones de filas) sería mucho más lento y costoso que leer 10,000 claves de un cache en memoria.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">API y Dashboard</div>
    <div class="plan-content">
      <p>La API separa explícitamente las dos rutas de lectura: REST/GraphQL contra la DB time-series para históricos, y WebSocket/Server-Sent Events contra el cache para el estado en vivo — el dashboard recibe actualizaciones empujadas en vez de hacer polling constante contra el backend.</p>
    </div>
  </div>
</div>
  </div>

  <div id="sdw-3" class="tab-panel">
<div class="concept-intro">Con el diseño de alto nivel ya defendido, una buena entrevista de system design profundiza en 2-3 decisiones concretas. Aquí cubrimos las tres más relevantes para este problema.</div>

<div class="plan-card">
  <div class="plan-card-title">1. ¿Qué pasa si un vehículo pierde conectividad?</div>
  <div class="plan-block">
    <div class="plan-time">Buffer local + reenvío</div>
    <div class="plan-content">
      <p>El módulo telemático guarda los mensajes no confirmados en almacenamiento local (flash/SQLite) con su <strong>timestamp original</strong> — nunca se reescribe con "ahora" al reenviar, porque eso rompería el orden histórico. Un buffer razonable de 1 hora son <code>3,600s / 5s = 720 mensajes * 150 bytes ≈ 108 KB</code> — trivial para cualquier módulo embebido. Al recuperar señal, el dispositivo reenvía en lote (batch), y el backend deduplica usando un <code>event_id</code> único por mensaje (idempotencia — ver tema de Confiabilidad). Si el corte dura más que la capacidad del buffer, el dispositivo descarta los datos más antiguos primero (FIFO) — se prioriza tener el dato reciente sobre el completo.</p>
    </div>
  </div>
</div>

<div class="plan-card">
  <div class="plan-card-title">2. ¿Cómo particionar la base de datos time-series?</div>
  <div class="plan-block">
    <div class="plan-time">Solo por vehicle_id — descartado</div>
    <div class="plan-content">
      <p>Parece natural (cada vehículo es una entidad), pero genera dos problemas: los vehículos más activos crean particiones "calientes" (hot partitions) desbalanceadas, y expirar datos antiguos (ej. borrar todo lo de hace más de 2 años) requiere escanear y filtrar dentro de cada partición en vez de simplemente eliminar un bloque completo.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Compuesta: tiempo + vehicle_id — elegida</div>
    <div class="plan-content">
      <p>Se particiona primero por ventana de tiempo (ej. un chunk/hypertable por día) y, dentro de cada partición temporal, se indexa por vehicle_id. Esto da lo mejor de ambos mundos: las consultas históricas ("ruta de esta semana") tocan pocas particiones consecutivas, las particiones antiguas se pueden archivar o eliminar completas cuando expira su retención (barato, sin escaneo), y la carga de escritura se reparte de forma pareja porque todos los vehículos escriben en la partición del día actual simultáneamente.</p>
    </div>
  </div>
</div>

<div class="plan-card">
  <div class="plan-card-title">3. ¿Importa ver el último dato con 1-2 segundos de delay?</div>
  <div class="plan-block">
    <div class="plan-time">Trade-off de consistencia: se elige disponibilidad (AP) sobre consistencia fuerte (CP)</div>
    <div class="plan-content">
      <p>No. Los vehículos ya reportan con granularidad de 5 segundos — exigir que el cache refleje el dato con consistencia fuerte (coordinación síncrona entre nodos) añadiría latencia y complejidad sin ningún beneficio real, porque el dato en sí ya tiene hasta 5s de "antigüedad" en el origen. Este NO es un sistema de frenado autónomo donde un retraso de 200ms importa — es un dashboard de gestión de flota. La elección correcta es <strong>consistencia eventual</strong>: el worker escribe al cache de forma asíncrona después de confirmar en la cola, priorizando disponibilidad y throughput sobre la garantía de "todos los lectores ven exactamente el mismo valor al mismo instante".</p>
    </div>
  </div>
</div>

<table class="kv-table">
<tr><th>Decisión</th><th>Opción elegida</th><th>Alternativa descartada</th><th>Por qué</th></tr>
<tr><td>Ingesta al backend</td><td>Cola de mensajes (Kafka) entre Gateway y Workers</td><td>Escribir directo del Gateway a la DB</td><td>Absorbe picos de tráfico, desacopla la disponibilidad de la DB de la ingesta, permite fan-out a múltiples consumidores</td></tr>
<tr><td>Partición de la DB histórica</td><td>Compuesta: tiempo (chunk diario) + vehicle_id como índice</td><td>Partición solo por vehicle_id</td><td>Evita hot partitions y permite archivar/expirar datos antiguos sin escaneo costoso</td></tr>
<tr><td>Modelo de consistencia</td><td>Eventual (AP) para el estado en tiempo real</td><td>Consistencia fuerte (CP) con coordinación síncrona</td><td>Un delay de 1-2s no afecta la utilidad del dato; se prioriza disponibilidad y baja latencia de lectura</td></tr>
<tr><td>Estado actual vs histórico</td><td>Cache (Redis) separado de la DB time-series</td><td>Consultar siempre la DB time-series, incluso para "estado ahora"</td><td>Lectura O(1) de 10,000 claves es mucho más barata y rápida que un query de agregación sobre miles de millones de filas</td></tr>
<tr><td>Datos ante pérdida de conectividad</td><td>Buffer local con timestamp original + reenvío en lote al reconectar</td><td>Descartar datos si no hay conexión</td><td>Preserva la integridad del histórico; el costo de almacenamiento local (~108 KB/hora) es insignificante frente al valor del dato</td></tr>
</table>

<div class="alert-card">💡 Patrón general para el deep-dive en cualquier entrevista de system design: elige 2-3 decisiones que realmente tengan un trade-off (no triviales), explica la alternativa que descartaste y por qué, y ancla la justificación en los requisitos no funcionales que definiste en el paso 1 — eso demuestra que el diseño no es arbitrario, sino consecuencia directa de los requisitos.</div>
  </div>
</div>
`,

};  // fin SYSDESIGN_RICH
