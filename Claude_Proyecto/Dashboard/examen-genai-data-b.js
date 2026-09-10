/* ══════════════════════════════════════════════════════════════════════════
   EXAMEN CT-GenAI — banco B
   ══════════════════════════════════════════════════════════════════════════

   Segundo juego de preguntas, hermano de `examen-genai-data.js`. Mismas reglas
   exactas que el A:

   · Todo sale del programa de estudio oficial en español "Probador Certificado
     de ISTQB® — Nivel Especialista — Prueba con IA Generativa (IAGen), Versión
     ES V01.01" (traducción del CT-GenAI V1.0 del 25 de julio de 2025). Cada
     pregunta lleva en `ref` la sección donde se comprueba. Nada inventado.
   · Mismo blueprint oficial: el motor arma los mismos 40 huecos y 46 puntos
     con el mismo reparto por objetivo de aprendizaje.
   · Mismo formato de pregunta, cuatro opciones y justificación razonada.

   QUÉ LO HACE DISTINTO: ninguna pregunta repite el ángulo de una del banco A.
   Donde el A preguntaba por la IA simbólica, el B pregunta por el aprendizaje
   profundo; donde el A pedía identificar el formato de salida, el B pide el
   contexto o las restricciones. Es el mismo temario visto por la otra cara, que
   es justo lo que hace ISTQB con sus exámenes de muestra A y B.

   Los identificadores continúan la serie del A (allí terminan en `a`/`b`/`c`;
   aquí empiezan en `c`/`d`/`e`/`f`), así que son únicos entre los dos bancos y
   el modo mezcla puede tirar de los dos a la vez sin duplicar nada.
   ══════════════════════════════════════════════════════════════════════════ */

window.EXAMEN_GENAI_B = (function () {

  const banco = [

  /* ══════════════════════════════════════════════════════════════════════
     CAPÍTULO 1 — Introducción a la IA generativa
     ══════════════════════════════════════════════════════════════════════ */

    { id: '1.1.1c', cap: 1, lo: 'IAGEN-1.1.1', k: 'K1', pts: 1,
      q: '¿Qué caracteriza al <b>aprendizaje profundo</b> dentro del espectro de la IA?',
      o: [
        'Representa el conocimiento mediante símbolos y reglas lógicas para imitar la toma de decisiones humana.',
        'Usa redes neuronales para aprender automáticamente características a partir de los datos, sin que el usuario tenga que definirlas manualmente.',
        'Aplica modelos preentrenados directamente a las tareas de prueba sin ninguna fase de entrenamiento adicional.',
        'Exige que el usuario seleccione a mano las características antes de entrenar el modelo.'
      ], r: 1,
      why: 'El aprendizaje profundo usa redes neuronales —que son estructuras de aprendizaje automático— para aprender características de forma automática, y encuentra patrones en conjuntos de datos muy grandes y complejos: imágenes, vídeo, audio o texto. El programa matiza que en la práctica puede seguir siendo necesaria la intervención humana en tareas como la anotación de datos, el ajuste de modelos o la validación de resultados. La selección manual de características es propia del <b>aprendizaje automático clásico</b>.',
      ref: '1.1.1' },

    { id: '1.1.1d', cap: 1, lo: 'IAGEN-1.1.1', k: 'K1', pts: 1,
      q: 'Según el programa, ¿cuál es la <b>ventaja clave</b> de utilizar IAGen para la prueba de software frente a los otros enfoques de IA?',
      o: [
        'Garantiza resultados reproducibles ante la misma entrada, a diferencia del aprendizaje automático clásico.',
        'Elimina la necesidad de que un probador revise los productos de prueba generados.',
        'Utiliza modelos preentrenados que pueden aplicarse directamente a las tareas de prueba sin necesidad de una fase de entrenamiento adicional, aunque ello conlleva algunos riesgos.',
        'Sustituye por completo al aprendizaje automático clásico en la categorización de defectos.'
      ], r: 2,
      why: 'Es el cierre literal del apartado: la ventaja clave es que los modelos preentrenados se aplican directamente a las tareas de prueba sin entrenamiento adicional, <b>aunque esto conlleva algunos riesgos</b> —y el programa remite ahí mismo a la sección 3.1, la de alucinaciones, errores de razonamiento y sesgos—. La reproducibilidad es justo lo que los MLG no garantizan (1.1.2).',
      ref: '1.1.1' },

    { id: '1.1.2f', cap: 1, lo: 'IAGEN-1.1.2', k: 'K2', pts: 1,
      q: '¿En qué consiste la <b>toquenización</b> en un modelo de lenguaje?',
      o: [
        'En convertir cada palabra en un vector de alta dimensión que codifica su significado.',
        'En dividir el texto en unidades más pequeñas llamadas tóquenes, que pueden ser tan pequeñas como un carácter o tan grandes como una subpalabra o una palabra.',
        'En limitar la cantidad de texto precedente que el modelo tiene en cuenta al responder.',
        'En reordenar la entrada para que el modelo procese primero la información más relevante.'
      ], r: 1,
      why: 'Cuando un MLG procesa una frase, primero segmenta la entrada en tóquenes para que cada uno pueda entenderse individualmente manteniendo el contexto general. Convertir en vectores de alta dimensión es lo que hacen las <b>incrustaciones</b>, y limitar el texto que se tiene en cuenta es la <b>ventana de contexto</b>.',
      ref: '1.1.2' },

    { id: '1.1.2d', cap: 1, lo: 'IAGEN-1.1.2', k: 'K2', pts: 1,
      q: '¿Qué son los <b>modelos de lenguaje pequeños</b> (MLP)?',
      o: [
        'Modelos compactos con menos parámetros que los MLG, diseñados para proporcionar soluciones IAGen ligeras y concentradas.',
        'Modelos que solo procesan texto, frente a los MLG, que son siempre multimodales.',
        'Modelos entrenados exclusivamente con datos de una única organización.',
        'Modelos que han perdido capacidad al someterse a ajuste fino.'
      ], r: 0,
      why: 'Es la definición del programa. Su interés práctico aparece en el capítulo 4: ajustando finamente un MLP se pueden alcanzar altos niveles de rendimiento en tareas específicas <b>sin la sobrecarga de recursos de proceso</b> que requieren los MLG. Ni la multimodalidad ni el origen de los datos definen a un MLP.',
      ref: '1.1.2 · 4.2.1' },

    { id: '1.1.2e', cap: 1, lo: 'IAGEN-1.1.2', k: 'K2', pts: 1,
      q: 'Durante la inferencia, ¿qué hace un MLG y qué advertencia acompaña el programa a esa explicación?',
      o: [
        'Consulta una base de conocimiento verificada, por lo que sus salidas son correctas mientras la base lo sea.',
        'Recupera la respuesta más parecida vista durante el entrenamiento, por lo que puede reproducir literalmente datos confidenciales.',
        'Predice el siguiente tóquen de la secuencia aprovechando las relaciones aprendidas y genera texto estadísticamente plausible; pero lo plausible no es necesariamente correcto.',
        'Ejecuta reglas lógicas sobre la entrada, por lo que su razonamiento es verificable paso a paso.'
      ], r: 2,
      why: 'El programa explica que los MLG predicen el siguiente tóquen aprovechando las relaciones aprendidas para generar texto coherente y adecuado al contexto, y cierra con la frase clave: <b>«lo plausible no es necesariamente correcto»</b>. Esa advertencia es la raíz de todo el capítulo 3. Los MLG no consultan una base verificada ni ejecutan reglas lógicas: carecen de verdadero razonamiento lógico (3.1.1).',
      ref: '1.1.2' },

    { id: '1.1.3c', cap: 1, lo: 'IAGEN-1.1.3', k: 'K2', pts: 1,
      q: '¿Qué caracteriza a un <b>MLG fundacional</b>?',
      o: [
        'Es un modelo de uso general entrenado con conjuntos de datos amplios y diversos, potente y flexible, pero que suele requerir adaptación adicional para cumplir requisitos específicos de cada tarea.',
        'Es un modelo ya alineado con las instrucciones humanas mediante pares de instrucción y respuesta esperada.',
        'Es un modelo especializado en inferencia lógica y resolución de problemas en varios pasos.',
        'Es un modelo entrenado únicamente con el corpus documental de una organización.'
      ], r: 0,
      why: 'Los modelos fundacionales se entrenan con conjuntos amplios y diversos que incluyen texto, código, imágenes y otras modalidades, y su extenso preentrenamiento les permite realizar tareas en distintos dominios; aun así, <b>suelen requerir adaptación adicional</b>. Las otras opciones describen los modelos ajustados por instrucciones, los de razonamiento y un modelo con ajuste fino de dominio (4.2.1).',
      ref: '1.1.3' },

    { id: '1.1.3d', cap: 1, lo: 'IAGEN-1.1.3', k: 'K2', pts: 1,
      q: 'En las aplicaciones de IAGen para probar software, ¿qué tipos de MLG se utilizan y de qué depende la elección?',
      o: [
        'Solo modelos de razonamiento, porque toda tarea de prueba exige inferencia lógica.',
        'Solo modelos fundacionales, porque son los más flexibles.',
        'Tanto ajustados por instrucciones (a veces llamados «sin razonamiento») como de razonamiento, y la elección depende de la complejidad y las exigencias de razonamiento de la tarea de prueba concreta.',
        'Tanto multimodales como de texto, y la elección depende del tamaño de la ventana de contexto.'
      ], r: 2,
      why: 'El programa lo dice explícitamente al cerrar el apartado: se utilizan ambos tipos, y la selección depende de la complejidad y las exigencias de razonamiento de la tarea de prueba específica que se vaya a realizar. Los modelos de razonamiento son <b>más adecuados para tareas de alta carga cognitiva</b>, no obligatorios para todas.',
      ref: '1.1.3' },

    { id: '1.1.4c', cap: 1, lo: 'IAGEN-1.1.4', k: 'K2', pts: 1,
      q: 'Los <b>modelos de visión y lenguaje</b> son un subconjunto de los MLG multimodales. ¿Qué tareas realizan según el programa?',
      o: [
        'Ejecutan guiones de prueba automatizados sobre la interfaz gráfica y comparan capturas píxel a píxel.',
        'Integran información visual y textual para tareas como la creación de pies de foto, la respuesta a preguntas visuales y el análisis de la consistencia entre la información textual y la visual.',
        'Convierten capturas de pantalla en código de un marco de automatización sin intervención humana.',
        'Comprimen las imágenes para que ocupen menos tóquenes en la ventana de contexto.'
      ], r: 1,
      why: 'Es la definición literal. En la prueba de software esa integración es la que permite <b>identificar discrepancias</b> entre los resultados esperados y los elementos visuales reales de una captura, y generar casos de prueba que combinan datos textuales y señales visuales. Ejecutar pruebas o comprimir imágenes no son tareas de estos modelos.',
      ref: '1.1.4' },

    { id: '1.1.4d', cap: 1, lo: 'IAGEN-1.1.4', k: 'K2', pts: 1,
      q: '¿Qué amplían los MLG multimodales respecto del modelo transformador tradicional?',
      o: [
        'El tamaño de la ventana de contexto, que pasa a ser ilimitado.',
        'El número de parámetros, que se multiplica al añadir cada modalidad.',
        'La capacidad de procesar múltiples modalidades de datos —texto, imágenes, sonido y vídeo—, entrenados con conjuntos diversos que les permiten aprender las relaciones entre distintos tipos de datos.',
        'La velocidad de inferencia, al repartir el trabajo entre modelos especializados.'
      ], r: 2,
      why: 'El programa abre el apartado exactamente así. La ventana de contexto sigue siendo limitada —y ampliarla cuesta complejidad computacional y tiempo (1.1.2)—, y ni el recuento de parámetros ni la velocidad son lo que define la multimodalidad.',
      ref: '1.1.4' },

    { id: '1.2.1c', cap: 1, lo: 'IAGEN-1.2.1', k: 'K2', pts: 1,
      q: 'Terminada una campaña de pruebas, el equipo pide al MLG que resuma los resultados y clasifique las anomalías encontradas según su severidad y prioridad. ¿Qué capacidad clave se está usando?',
      o: [
        'Análisis de resultados de la prueba.',
        'Generación de oráculos de prueba.',
        'Creación de productos de prueba.',
        'Soporte para la automatización de la prueba.'
      ], r: 0,
      why: 'El programa define el <b>análisis de resultados de la prueba</b> como la capacidad de ayudar a analizar los resultados creando resúmenes y clasificando las anomalías en función de su severidad y prioridad. Los oráculos generan resultados esperados; la creación de productos cubre planes, informes de prueba e informes de defecto; y el soporte a la automatización trabaja sobre los guiones.',
      ref: '1.2.1' },

    { id: '1.2.1d', cap: 1, lo: 'IAGEN-1.2.1', k: 'K2', pts: 1,
      q: 'El equipo entrega al MLG sus guiones de prueba existentes para que sugiera mejoras e identifique qué técnicas de diseño de pruebas serían las adecuadas. ¿Qué capacidad clave es?',
      o: [
        'Análisis y mejora de requisitos.',
        'Apoyo a la creación de casos de prueba.',
        'Generación de datos de prueba.',
        'Soporte para la automatización de la prueba.'
      ], r: 3,
      why: 'El <b>soporte para la automatización de la prueba</b> se define en el programa como ayudar a generar guiones a partir de la descripción del caso de prueba <b>y mejorar los guiones existentes sugiriendo cambios e identificando las técnicas de diseño de pruebas adecuadas</b>. Las otras capacidades operan sobre la base de prueba, sobre los casos o sobre los datos, no sobre los guiones.',
      ref: '1.2.1' },

    { id: '1.2.2c', cap: 1, lo: 'IAGEN-1.2.2', k: 'K2', pts: 1,
      q: '¿Qué ventaja atribuye el programa a la interfaz intuitiva de los chatbot con IA?',
      o: [
        'Que garantiza respuestas verificadas, al obligar al usuario a formular preguntas concretas.',
        'Que los hace accesibles incluso para las partes interesadas sin conocimientos técnicos, lo que amplía la base de usuarios potenciales y fomenta una mayor adopción.',
        'Que permite integrarlos en el marco de automatización sin escribir código.',
        'Que reduce el consumo de tóquenes frente al acceso por IPA.'
      ], r: 1,
      why: 'El programa cierra así la descripción de los bots de conversación: su interfaz intuitiva los hace accesibles incluso para implicados sin conocimientos técnicos, <b>ampliando la base de usuarios potenciales</b> y fomentando la adopción. La integración en marcos de automatización es lo propio de las aplicaciones basadas en MLG por IPA.',
      ref: '1.2.2' },

    { id: '1.2.2d', cap: 1, lo: 'IAGEN-1.2.2', k: 'K2', pts: 1,
      q: 'En las implementaciones más avanzadas de aplicaciones de prueba basadas en MLG, ¿qué pueden crear las organizaciones?',
      o: [
        'Modelos fundacionales propios entrenados desde cero con sus datos de prueba.',
        'Bots de conversación que sustituyan al equipo de prueba en la toma de decisiones.',
        'Agentes de IA diseñados específicamente para desempeñar determinados roles de prueba.',
        'Ventanas de contexto ampliadas por encima del límite del modelo.'
      ], r: 2,
      why: 'El programa lo dice al final del apartado y remite al capítulo 4: en implementaciones más avanzadas, las organizaciones pueden crear <b>agentes de IA diseñados específicamente para desempeñar determinados roles de prueba</b>. Entrenar un modelo fundacional desde cero no está entre las opciones que plantea, y la ventana de contexto es un límite del modelo, no algo que la organización amplíe.',
      ref: '1.2.2 · 4.1.3' },

  /* ══════════════════════════════════════════════════════════════════════
     CAPÍTULO 2 — Ingeniería de instrucciones
     ══════════════════════════════════════════════════════════════════════ */

    { id: '2.1.1d', cap: 2, lo: 'IAGEN-2.1.1', k: 'K2', pts: 1,
      q: 'Una instrucción incluye: <i>«El sistema es un portal de banca en línea; vamos a probar la transferencia entre cuentas propias, que exige doble autenticación»</i>. ¿Qué componente de la instrucción estructurada es?',
      o: [
        'Rol.',
        'Contexto.',
        'Formato de salida.',
        'Instrucciones.'
      ], r: 1,
      why: 'El <b>contexto</b> proporciona los antecedentes que el modelo IAGen necesita para determinar las condiciones de prueba: detalles sobre el objeto de prueba, la funcionalidad específica que se va a probar y cualquier información contextual relevante. El rol define quién responde; las instrucciones, la tarea; y el formato de salida, la forma de la respuesta.',
      ref: '2.1.1' },

    { id: '2.1.1e', cap: 2, lo: 'IAGEN-2.1.1', k: 'K2', pts: 1,
      q: '¿Para qué sirven las <b>restricciones</b> dentro de una instrucción estructurada?',
      o: [
        'Para indicar el formato, la estructura y las características esperadas de la respuesta.',
        'Para aportar los ejemplos de entrada y salida que el modelo debe imitar.',
        'Para describir limitaciones o consideraciones especiales que el MLG debe respetar, ayudando a especificar cómo deben aplicarse las instrucciones a los datos de entrada.',
        'Para fijar los hiperparámetros de temperatura y semilla de la generación.'
      ], r: 2,
      why: 'Es la definición del programa. Conviene no confundirlas con el <b>formato de salida</b>, que es el componente que describe la forma de la respuesta, ni con la formulación con pocos ejemplos, que es una técnica (2.1.2) y no un componente. Los hiperparámetros no forman parte de la instrucción estructurada.',
      ref: '2.1.1' },

    { id: '2.1.1f', cap: 2, lo: 'IAGEN-2.1.1', k: 'K2', pts: 1,
      q: '¿Qué son los <b>datos de entrada</b> de una instrucción, y qué añade el programa sobre la estructura de seis componentes?',
      o: [
        'Son la información necesaria para la tarea —historias de usuario, criterios de aceptación, capturas de pantalla, código, casos existentes o ejemplos de salida—, y la estructura debe combinarse con técnicas de formulación según la tarea y el modelo.',
        'Son exclusivamente los ejemplos que se dan al modelo, y la estructura de seis componentes basta por sí sola para cualquier tarea.',
        'Son los datos de prueba que el modelo debe generar, y la estructura solo se aplica a las instrucciones de sistema.',
        'Son los documentos almacenados en la base de datos vectorial, y la estructura solo se aplica cuando no se usa generación aumentada por recuperación.'
      ], r: 0,
      why: 'El programa define así los datos de entrada y añade que proporcionarlos detallados y estructurados ayuda al MLG a generar resultados más precisos y sensibles al contexto. Y cierra el apartado avisando de que estos seis componentes son la <b>estructura básica</b>, que debe combinarse con las técnicas de instrucción de 2.1.2 según la tarea y el modelo que se vaya a usar.',
      ref: '2.1.1' },

    { id: '2.1.2c', cap: 2, lo: 'IAGEN-2.1.2', k: 'K2', pts: 1,
      q: '¿Qué ventaja concreta atribuye el programa al <b>encadenamiento de instrucciones</b>?',
      o: [
        'Reduce el número de tóquenes consumidos, porque cada paso es más corto que una instrucción única.',
        'Conduce a una mayor precisión, porque el resultado de cada paso se comprueba y perfecciona antes del siguiente y cada respuesta informa a la instrucción posterior; además permite interacciones dinámicas.',
        'Elimina el comportamiento no determinista, al fijar la salida de cada paso.',
        'Evita tener que estructurar la instrucción en sus seis componentes.'
      ], r: 1,
      why: 'El programa dice que este enfoque conduce a una mayor precisión porque cada respuesta informa a la siguiente instrucción, y lo recomienda para procesos de prueba con tareas complicadas que requieren descomposición en subtareas y comprobación sistemática de los resultados intermedios. El no determinismo no desaparece: se mitiga con temperatura y semillas (3.1.4).',
      ref: '2.1.2' },

    { id: '2.1.2d', cap: 2, lo: 'IAGEN-2.1.2', k: 'K2', pts: 1,
      q: 'El programa dice que la metainstrucción refleja una forma de <b>«trabajo en pareja»</b> con la herramienta IAGen. ¿Qué significa y con qué otras prácticas lo relaciona?',
      o: [
        'Que dos probadores deben revisar toda salida del modelo, y lo relaciona con la revisión por pares y las inspecciones formales.',
        'Que conviene consultar dos MLG distintos en paralelo, y lo relaciona con las pruebas A/B de instrucciones.',
        'Que el modelo genera una instrucción y otro modelo la evalúa, y lo relaciona con las arquitecturas multiagente.',
        'Que el probador y la IA trabajan juntos de forma interactiva para lograr un objetivo común, mejorando productividad y aprendizaje, y lo relaciona con la programación en pareja y la prueba en pareja.'
      ], r: 3,
      why: 'El programa señala que si el probador no está seguro de cómo crear una instrucción eficaz puede <b>colaborar con el MLG para crearla conjuntamente</b>, y que este concepto de trabajo en pareja mejora tanto la productividad como el aprendizaje, no solo en ingeniería de instrucciones sino también en la programación en pareja y la prueba en pareja.',
      ref: '2.1.2' },

    { id: '2.1.3c', cap: 2, lo: 'IAGEN-2.1.3', k: 'K2', pts: 1,
      q: '¿Cómo deben ser las <b>instrucciones de usuario</b> para una implementación eficaz?',
      o: [
        'Lo más largas posible, para agotar la ventana de contexto disponible.',
        'Concisas y bien estructuradas, con instrucciones explícitas e información relevante sobre el contexto y el formato de salida.',
        'Idénticas en cada interacción, para que el modelo mantenga la coherencia de la sesión.',
        'Limitadas a una sola pregunta sin contexto, para no sesgar la respuesta del modelo.'
      ], r: 1,
      why: 'El programa lo dice literalmente al cerrar el apartado. Lo que <b>permanece constante</b> durante la sesión es la instrucción de sistema, no la de usuario, que cambia con cada interacción; y quitar el contexto no evita sesgos, sino que empeora la respuesta (una entrada de alta calidad es fundamental, 2.2).',
      ref: '2.1.3' },

    { id: '2.1.3d', cap: 2, lo: 'IAGEN-2.1.3', k: 'K2', pts: 1,
      q: '¿Quién define normalmente la instrucción de sistema y qué visibilidad tiene frente a la instrucción de usuario?',
      o: [
        'La define el usuario del chatbot al empezar cada conversación, y ambas son igualmente visibles.',
        'La define el proveedor del MLG y no puede modificarla nadie; la de usuario tampoco es visible.',
        'La define el desarrollador o el probador para guiar el comportamiento general del MLG y, en la mayoría de interfaces, no es visible ni editable por el usuario del chatbot; la de usuario sí es directamente visible.',
        'Se genera automáticamente a partir de la primera instrucción de usuario de cada sesión.'
      ], r: 2,
      why: 'Es la distinción central del apartado: la instrucción de sistema la define el desarrollador o el probador y en la mayoría de las interfaces no es visible ni editable por el usuario del bot; las instrucciones de usuario, en cambio, <b>son directamente visibles y forman el contexto inmediato de cada respuesta</b>.',
      ref: '2.1.3' },

    { id: '2.2.1c', cap: 2, lo: 'IAGEN-2.2.1', k: 'K3', pts: 2,
      q: 'Antes de diseñar nada, el equipo quiere que la IA revise el documento de requisitos en busca de contradicciones e información incompleta, apoyándose en patrones de requisitos similares y en informes de defectos anteriores. ¿Qué tarea de análisis de prueba está aplicando?',
      o: [
        'Identificar posibles defectos en la base de prueba.',
        'Generar condiciones de prueba a partir de la base de prueba.',
        'Priorizar las condiciones de prueba en función del nivel de riesgo.',
        'Soporte al análisis de cobertura.'
      ], r: 0,
      why: 'El programa describe esta tarea así: IAGen analiza la base de prueba buscando inconsistencias, ambigüedades o información incompleta que podrían dar lugar a defectos, y <b>al comparar patrones de requisitos similares o aplicar conocimientos de informes de defectos anteriores</b> puede señalar anomalías y sugerir mejoras. Las otras tres responden a preguntas distintas: qué probar, en qué orden y qué falta por cubrir.',
      ref: '2.2.1' },

    { id: '2.2.1d', cap: 2, lo: 'IAGEN-2.2.1', k: 'K3', pts: 2,
      q: 'Un requisito define rangos de importe válidos e inválidos para una transferencia. El equipo quiere que la IA proponga con qué enfoque atacar esa condición de prueba. ¿Qué tarea de análisis de prueba con IAGen corresponde?',
      o: [
        'Priorizar las condiciones de prueba según el nivel de riesgo.',
        'Sugerir técnicas de prueba relevantes, como el análisis de valores límite o la partición por equivalencia, según el tipo de requisito o historia de usuario.',
        'Generar los datos de prueba sintéticos que cubran esos rangos.',
        'Realizar el análisis de cobertura de ese requisito.'
      ], r: 1,
      why: 'El programa incluye entre las tareas de análisis de prueba <b>sugerir técnicas de prueba</b>, con esos dos ejemplos exactos, para ayudar a los probadores a aplicar las técnicas más eficaces a condiciones de prueba específicas. Generar los datos ya es diseño e implementación de la prueba (2.2.2), no análisis.',
      ref: '2.2.1' },

    { id: '2.2.2c', cap: 2, lo: 'IAGEN-2.2.2', k: 'K3', pts: 2,
      q: 'A partir de requisitos funcionales y no funcionales, el equipo quiere borradores de casos de prueba que incluyan precondiciones, entradas, resultados esperados y criterios de cobertura, desde la verificación funcional básica hasta pruebas de extremo a extremo. ¿Qué tarea es?',
      o: [
        'Generación de guiones de prueba automatizados.',
        'Síntesis de datos de prueba.',
        'Programación y priorización de la ejecución de la prueba.',
        'Generación de casos de prueba.'
      ], r: 3,
      why: 'El programa describe la <b>generación de casos de prueba</b> con esos mismos elementos: el procesamiento del lenguaje natural permite crear borradores basados en requisitos funcionales y no funcionales y, con la información adecuada, el MLG puede sugerir precondiciones y entradas, resultados esperados y criterios de cobertura, produciendo casos que cumplen distintos objetivos, desde lo básico hasta pruebas complejas de extremo a extremo.',
      ref: '2.2.2' },

    { id: '2.2.2d', cap: 2, lo: 'IAGEN-2.2.2', k: 'K3', pts: 2,
      q: 'El equipo tiene los casos listos pero no sabe en qué orden ejecutarlos: hay interdependencias, riesgos distintos por área y una disponibilidad limitada del entorno. ¿Qué tarea de diseño e implementación con IAGen aborda esto?',
      o: [
        'Programación y priorización de la ejecución de la prueba, analizando los casos y sus interdependencias para optimizar los programas según prioridad, riesgos, recursos y objetivos de la prueba.',
        'Síntesis de datos de prueba que cubran las situaciones extremas del entorno.',
        'Generación de guiones automatizados a partir de los casos estructurados.',
        'Análisis de cobertura para comprobar que no falta ningún requisito.'
      ], r: 0,
      why: 'Es la cuarta tarea que enumera el apartado: IAGen puede analizar los casos de prueba y sus interdependencias, optimizando los programas de ejecución en función de la prioridad, los riesgos asociados, la disponibilidad de recursos y los objetivos de la prueba. Ojo: el capítulo 3 advierte de que esta clase de tarea multicriterio es donde los MLG cometen <b>errores de razonamiento</b>, así que el resultado hay que verificarlo.',
      ref: '2.2.2 · 3.1.1' },

    { id: '2.2.3c', cap: 2, lo: 'IAGEN-2.2.3', k: 'K3', pts: 2,
      q: 'Un equipo trabaja con un marco de automatización cuyos pasos comunes están representados por palabras clave predefinidas, y quiere que la IA asigne esas palabras clave a sus casos de prueba y genere los guiones. ¿Qué actividad de regresión automatizada con IAGen es?',
      o: [
        'Pruebas autorreparables y adaptativas.',
        'Implementación de guiones de prueba con automatización basada en palabras clave.',
        'Análisis de impacto y optimización de la prueba.',
        'Suministro de información de prueba automatizado y perspectivas predictivas.'
      ], r: 1,
      why: 'El programa describe esta actividad así: los MLG pueden implementar guiones basados en marcos de automatización guiados por palabras clave, donde las palabras clave predefinidas representan pasos de prueba comunes, <b>asignándolas a casos de prueba específicos y generando los guiones</b>. Las otras tres actúan sobre guiones que se rompen, sobre el alcance de la regresión y sobre los informes.',
      ref: '2.2.3' },

    { id: '2.2.3d', cap: 2, lo: 'IAGEN-2.2.3', k: 'K3', pts: 2,
      q: 'Cada vez que falla una prueba, el equipo pierde tiempo recopilando a mano los registros de prueba, las capturas y los datos del entorno para poder abrir un informe de defecto completo. ¿Qué uso de IAGen ataca ese problema?',
      o: [
        'La generación de casos de prueba a partir de las historias de usuario.',
        'Las pruebas autorreparables, que evitan que el fallo llegue a producirse.',
        'La mejora del suministro de información de defectos y el análisis de las causas raíz, con recopilación automática de informes completos con registros de prueba, capturas de pantalla y datos del entorno.',
        'El control de la prueba, reasignando recursos al análisis de fallos.'
      ], r: 2,
      why: 'El programa lo enumera entre las actividades de regresión automatizada que IAGen puede asistir: apoyar la <b>recopilación automática de informes completos de defectos</b> con registros de prueba, capturas de pantalla y datos del entorno de prueba. Las pruebas autorreparables resuelven otro problema —guiones que fallan por cambios menores de interfaz, no defectos reales—.',
      ref: '2.2.3' },

    { id: '2.2.4c', cap: 2, lo: 'IAGEN-2.2.4', k: 'K3', pts: 2,
      q: 'La jefa de prueba quiere anticiparse: que el análisis de tendencias detecte riesgos antes de que se materialicen y que el equipo reciba un aviso en cuanto haya desviaciones del plan. ¿Qué tarea de IAGen es?',
      o: [
        'Monitorización de la prueba y análisis de métricas, con análisis de tendencias para predecir posibles riesgos y alertar de cualquier desviación del plan.',
        'Control de la prueba, ajustando calendarios y reasignando recursos.',
        'Perspectivas sobre la compleción de la prueba y aprendizaje continuo.',
        'Mejora de la visualización de métricas mediante cuadros de mando dinámicos.'
      ], r: 0,
      why: 'El programa define la <b>monitorización de la prueba y el análisis de métricas</b> como la automatización de la monitorización y el análisis de tendencias para predecir posibles riesgos y alertar a los equipos de cualquier desviación del plan. El control de la prueba es el paso siguiente —actuar sobre el plan—, y las perspectivas de compleción llegan al cerrar.',
      ref: '2.2.4' },

    { id: '2.2.4d', cap: 2, lo: 'IAGEN-2.2.4', k: 'K3', pts: 2,
      q: 'Al cerrar el proyecto, el equipo quiere un informe que destaque qué salió bien y qué se aprendió, para afinar la estrategia de prueba de los siguientes. ¿Qué tarea de IAGen corresponde?',
      o: [
        'Monitorización de la prueba y análisis de métricas.',
        'Perspectivas sobre la compleción de la prueba y aprendizaje continuo, generando informes que destacan los éxitos y las lecciones aprendidas.',
        'Control de la prueba, reordenando las prioridades para el siguiente ciclo.',
        'Análisis de impacto sobre los cambios de código del último release.'
      ], r: 1,
      why: 'El programa recoge esta tarea entre las de monitorización y control: IAGen puede asistir en la generación de informes sobre la <b>compleción de la prueba</b>, destacando éxitos y lecciones aprendidas, lo que permite a los equipos perfeccionar sus estrategias y mejorar los procesos de prueba futuros.',
      ref: '2.2.4' },

    { id: '2.2.5d', cap: 2, lo: 'IAGEN-2.2.5', k: 'K3', pts: 2,
      q: 'Según la tabla de selección del programa, ¿a qué tipo de tareas se recomienda el <b>encadenamiento de instrucciones</b> y cuál es su característica clave?',
      o: [
        'A tareas repetitivas con formato de salida restringido; aporta ejemplos que fijan un patrón de generación.',
        'A tareas flexibles y dinámicas; guía al MLG en la creación de la propia instrucción.',
        'A tareas complejas que requieren precisión con verificación humana en cada paso; descompone la tarea en pasos más pequeños, útil en análisis, diseño y automatización de prueba, donde se comprueba la precisión de cada paso.',
        'A tareas de bajo riesgo donde no hace falta revisar la salida; automatiza la verificación de extremo a extremo.'
      ], r: 2,
      why: 'Es la fila del encadenamiento en la tabla de 2.2.5, literal. Las opciones primera y segunda describen la <b>formulación con pocos ejemplos</b> y la <b>metainstrucción</b>; y la cuarta contradice el sentido de la técnica, que existe precisamente para verificar cada paso.',
      ref: '2.2.5' },

    { id: '2.2.5e', cap: 2, lo: 'IAGEN-2.2.5', k: 'K3', pts: 2,
      q: 'Un equipo debe producir en cada iteración decenas de guiones para un marco de prueba guiado por palabras clave, todos con la misma estructura. ¿Qué técnica de formulación de instrucciones recomienda el programa y por qué?',
      o: [
        'Encadenamiento de instrucciones, porque cada guion debe validarse antes del siguiente.',
        'Formulación con pocos ejemplos, porque es una generación repetitiva con un patrón específico, y el programa cita la prueba guiada por palabras clave entre sus casos de uso.',
        'Metainstrucción, porque el modelo debe decidir qué palabras clave existen.',
        'Formulación sin ejemplos, porque el modelo ya conoce los marcos de automatización más habituales.'
      ], r: 1,
      why: 'La tabla de selección asigna a la <b>formulación con pocos ejemplos</b> las tareas repetitivas o con formatos de salida restringidos, y menciona expresamente tres casos: los casos de prueba en formato Gherkin, la <b>prueba guiada por palabras clave</b> y los informes de prueba con un formato de salida específico. Aportar ejemplos es lo que fija el patrón.',
      ref: '2.2.5 · 2.2.3' },

    { id: '2.3.1c', cap: 2, lo: 'IAGEN-2.3.1', k: 'K2', pts: 1,
      q: '«El grado en que los casos de prueba generados identifican correctamente las anomalías». ¿A qué métrica de evaluación corresponde este ejemplo?',
      o: [
        'Exactitud.',
        'Recuperación.',
        'Precisión.',
        'Relevancia y adecuación contextual.'
      ], r: 2,
      why: 'La <b>precisión</b> evalúa la corrección de la salida generada respecto a un objetivo específico, y ese es el ejemplo que da el programa. La <b>exactitud</b> mide la corrección general frente a casos, requisitos o normas redactadas por expertos —su ejemplo es cubrir todos los requisitos especificados—; la <b>recuperación</b>, la capacidad de identificar todas las instancias relevantes; y la <b>relevancia contextual</b>, si el resultado es aplicable al contexto dado.',
      ref: '2.3.1' },

    { id: '2.3.1d', cap: 2, lo: 'IAGEN-2.3.1', k: 'K2', pts: 1,
      q: '¿Qué miden respectivamente las métricas de <b>diversidad</b> y <b>eficiencia temporal</b>?',
      o: [
        'La diversidad, cuántos modelos distintos se han consultado; la eficiencia temporal, la latencia de la respuesta del MLG.',
        'La diversidad asegura que se cubra una amplia gama de entradas y escenarios evitando repeticiones; la eficiencia temporal evalúa el tiempo ahorrado en comparación con los esfuerzos de prueba manuales.',
        'La diversidad, cuántas técnicas de prueba distintas se aplicaron; la eficiencia temporal, el número de tóquenes por segundo.',
        'La diversidad, la variación entre ejecuciones de la misma instrucción; la eficiencia temporal, el tiempo de entrenamiento del modelo.'
      ], r: 1,
      why: 'Son las definiciones de la tabla. El ejemplo de diversidad es el grado en que los casos generados cubren diversos comportamientos de los usuarios y exploran casos extremos; el de eficiencia temporal, el tiempo que necesita la IA para generar casos frente a lo que tardaría una persona en crear pruebas equivalentes. La variación entre ejecuciones no es una métrica de calidad: es el <b>comportamiento no determinista</b> (3.1.4).',
      ref: '2.3.1' },

    { id: '2.3.2c', cap: 2, lo: 'IAGEN-2.3.2', k: 'K2', pts: 1,
      q: 'Un equipo parte de una instrucción básica y la va modificando según los resultados que observa, añadiendo gradualmente contexto y ajustando la terminología para ganar especificidad. ¿Qué técnica está aplicando?',
      o: [
        'Modificación iterativa de instrucciones.',
        'Pruebas A/B de instrucciones.',
        'Análisis de resultados.',
        'Ajuste de la longitud y la especificidad.'
      ], r: 0,
      why: 'La <b>modificación iterativa</b> consiste exactamente en comenzar con una instrucción básica y modificarla de forma iterativa en función de los resultados observados, añadiendo gradualmente más contexto o ajustando la redacción —por ejemplo, la terminología— para mejorar la especificidad y la relevancia. Las pruebas A/B comparan versiones alternativas en paralelo, que no es lo que describe el caso.',
      ref: '2.3.2' },

    { id: '2.3.2d', cap: 2, lo: 'IAGEN-2.3.2', k: 'K2', pts: 1,
      q: '¿Qué aporta, según el programa, compartir las prácticas de instrucciones dentro del equipo o la organización de prueba?',
      o: [
        'Permite prescindir de las métricas de evaluación, porque el criterio compartido las sustituye.',
        'Ayuda a estandarizar las técnicas de instrucción y a mantener una calidad constante, y promueve una cultura de aprendizaje y mejora iterativa, por ejemplo compartiendo librerías de instrucciones.',
        'Garantiza que el modelo devuelva la misma salida a todos los miembros del equipo.',
        'Reduce el consumo energético del modelo al evitar instrucciones duplicadas.'
      ], r: 1,
      why: 'El programa cierra el apartado con esa idea: el enfoque colaborativo permite aprovechar los conocimientos colectivos, evitar la repetición de errores y perfeccionar el uso de las herramientas IAGen con el tiempo, por ejemplo compartiendo <b>librerías de instrucciones</b>. La misma línea reaparece en 5.2.2 con las comunidades internas de práctica.',
      ref: '2.3.2 · 5.2.2' },

  /* ══════════════════════════════════════════════════════════════════════
     CAPÍTULO 3 — Gestión de riesgos
     ══════════════════════════════════════════════════════════════════════ */

    { id: '3.1.1c', cap: 3, lo: 'IAGEN-3.1.1', k: 'K1', pts: 1,
      q: '¿Cuál es la definición de <b>alucinación</b> en la IA generativa?',
      o: [
        'La variación de la salida ante la misma entrada, causada por el muestreo probabilístico.',
        'La preferencia por ciertos tipos de información heredada de los datos de entrenamiento.',
        'La producción de resultados que parecen incorrectos desde el punto de vista factual o irrelevantes para una tarea determinada.',
        'La interpretación errónea de estructuras lógicas que lleva a conclusiones incorrectas.'
      ], r: 2,
      why: 'Es la definición del programa. En la prueba de software las alucinaciones se manifiestan cuando los MLG crean <b>casos de prueba ficticios o irrelevantes</b>, generan guiones incorrectos o que no funcionan, o sugieren casos que verifican criterios de aceptación inexistentes. Las otras opciones definen el comportamiento no determinista, el sesgo y el error de razonamiento.',
      ref: '3.1.1' },

    { id: '3.1.1d', cap: 3, lo: 'IAGEN-3.1.1', k: 'K1', pts: 1,
      q: 'Según el programa, ¿por qué cometen errores de razonamiento los MLG?',
      o: [
        'Porque carecen de un verdadero razonamiento lógico y se basan en la comparación de patrones, lo que puede dar lugar a lógica defectuosa en tareas como el razonamiento matemático.',
        'Porque su ventana de contexto es demasiado pequeña para sostener una cadena lógica.',
        'Porque la temperatura por defecto es demasiado alta en la mayoría de las implementaciones.',
        'Porque sus datos de entrenamiento están mayoritariamente en inglés.'
      ], r: 0,
      why: 'El programa lo dice expresamente: a diferencia de los seres humanos, los MLG carecen de verdadero razonamiento lógico y se apoyan en la comparación de patrones. El predominio del inglés en los datos de entrenamiento es la causa que cita para los <b>sesgos</b>, no para los errores de razonamiento, y la temperatura afecta a la variabilidad (3.1.4).',
      ref: '3.1.1' },

    { id: '3.1.2d', cap: 3, lo: 'IAGEN-3.1.2', k: 'K3', pts: 2,
      q: 'El equipo discute cuánto esfuerzo dedicar a detectar alucinaciones y errores de razonamiento: revisarlo todo a mano es inviable, pero no revisar nada es temerario. ¿Qué criterio da el programa para decidir?',
      o: [
        'Revisar siempre el 100% de las salidas, porque toda salida de IAGen es igual de arriesgada.',
        'Automatizar toda la detección, porque las herramientas superan el juicio humano en estos casos.',
        'Revisar solo las salidas de los modelos de razonamiento, que son las que llevan pasos intermedios.',
        'La implementación concreta de los métodos de detección depende del nivel de riesgo estimado de alucinaciones, errores de razonamiento o sesgos en la tarea de prueba que se realice con IAGen.'
      ], r: 3,
      why: 'Es la frase con la que el programa cierra el apartado de detección. Encaja con lo que dice en 2.2.3: la salida generada debe verificarse cuidadosamente <b>dependiendo del riesgo asociado</b>. Y las herramientas automatizadas ayudan, pero el propio programa advierte de que los casos complejos pueden requerir el juicio humano.',
      ref: '3.1.2 · 2.2.3' },

    { id: '3.1.2e', cap: 3, lo: 'IAGEN-3.1.2', k: 'K3', pts: 2,
      q: 'El contenido generado por el MLG para un dominio muy especializado parece correcto, pero contiene matices técnicos que las comprobaciones automáticas no logran validar. ¿Qué enfoque de detección de alucinaciones propone el programa?',
      o: [
        'Consultar a expertos en el dominio, cuya experiencia es esencial para captar matices que los sistemas automatizados podrían pasar por alto.',
        'Ejecutar los guiones generados contra el objeto de prueba.',
        'Evaluar si las pruebas no funcionales están infrarrepresentadas en la salida.',
        'Configurar una semilla aleatoria y repetir la generación hasta obtener la misma salida.'
      ], r: 0,
      why: 'La <b>consulta a expertos en el dominio</b> es uno de los tres enfoques de detección de alucinaciones, junto con comparar la salida con la documentación y los requisitos y con las comprobaciones de consistencia; el programa subraya que su experiencia es esencial para captar matices que los sistemas automatizados pasarían por alto. Ejecutar los guiones detecta errores de razonamiento, y la infrarrepresentación de pruebas no funcionales es detección de <b>sesgo</b>.',
      ref: '3.1.2' },

    { id: '3.1.3c', cap: 3, lo: 'IAGEN-3.1.3', k: 'K2', pts: 1,
      q: 'Entre las técnicas de mitigación, ¿qué recomienda el programa sobre los <b>formatos de datos</b> que se pasan al modelo?',
      o: [
        'Usar siempre formatos binarios comprimidos, para consumir menos tóquenes.',
        'Usar formatos claros e interpretables, evitando los ambiguos o difíciles de interpretar: los formatos estructurados y sencillos ayudan al modelo a centrarse en lo esencial de la tarea.',
        'Usar el mismo formato que devuelve el modelo, para cerrar el ciclo.',
        'Evitar cualquier formato estructurado, porque limita la creatividad del modelo.'
      ], r: 1,
      why: 'Es una de las cinco técnicas de mitigación del apartado, junto con aportar un contexto completo, dividir las instrucciones en segmentos manejables con encadenamiento, seleccionar el modelo IAGen adecuado para la tarea y comparar resultados entre modelos.',
      ref: '3.1.3' },

    { id: '3.1.3d', cap: 3, lo: 'IAGEN-3.1.3', k: 'K2', pts: 1,
      q: '¿Qué aporta evaluar la misma instrucción con varios MLG y comparar los resultados?',
      o: [
        'Elimina el comportamiento no determinista, al promediar las salidas.',
        'Permite calcular automáticamente la exactitud sin necesidad de una referencia.',
        'Ayuda a detectar errores y a seleccionar los resultados más fiables.',
        'Reduce el consumo energético, al repartir la carga entre proveedores.'
      ], r: 2,
      why: 'El programa lo enumera entre las técnicas de mitigación —«cuando resulte adecuado»— y lo repite en 3.2.3 como estrategia complementaria: la <b>evaluación mediante comparación con otro MLG</b>. No elimina el no determinismo ni reduce el consumo: consultar varios modelos consume más, y el capítulo recomienda limitar las interacciones innecesarias.',
      ref: '3.1.3 · 3.2.3' },

    { id: '3.1.4c', cap: 3, lo: 'IAGEN-3.1.4', k: 'K1', pts: 1,
      q: '¿A qué se debe el comportamiento no determinista de los MLG y cuándo aumenta el riesgo de variabilidad?',
      o: [
        'A los procesos de muestreo probabilístico usados durante la inferencia, y el riesgo aumenta especialmente en el caso de resultados largos.',
        'A que el modelo se reentrena continuamente con las consultas de los usuarios, y el riesgo aumenta con el uso.',
        'A errores de la infraestructura de prueba, y el riesgo aumenta cuando el servicio está saturado.',
        'A la generación aumentada por recuperación, y el riesgo aumenta cuantos más documentos haya indexados.'
      ], r: 0,
      why: 'El programa lo atribuye a los procesos de muestreo probabilístico de la inferencia, y advierte de que lograr resultados consistentes y reproducibles resulta difícil <b>especialmente en el caso de resultados largos</b>, lo que aumenta el riesgo de variabilidad. Ni el reentrenamiento continuo ni la GAR son la causa.',
      ref: '3.1.4' },

    { id: '3.1.4d', cap: 3, lo: 'IAGEN-3.1.4', k: 'K1', pts: 1,
      q: 'Además de ajustar la temperatura y la semilla, ¿qué propone el programa para reducir el riesgo de alucinaciones y errores de razonamiento derivado del comportamiento no determinista?',
      o: [
        'Repetir cada instrucción tres veces y quedarse con la respuesta mayoritaria.',
        'Automatizar algunos aspectos de la verificación de resultados, para garantizar un proceso de evaluación estructurado y consistente.',
        'Usar exclusivamente modelos alojados en la infraestructura propia.',
        'Renunciar a las tareas que exijan razonamiento y hacerlas siempre a mano.'
      ], r: 1,
      why: 'Es la frase con la que cierra el apartado: abordar el comportamiento no determinista pasa, por ejemplo, por <b>automatizar algunos aspectos de la verificación de resultados</b> para garantizar un proceso de evaluación estructurado y consistente. Alojar el modelo en infraestructura propia es una medida de seguridad (3.2.3), no de determinismo.',
      ref: '3.1.4' },

    { id: '3.2.1c', cap: 3, lo: 'IAGEN-3.2.1', k: 'K2', pts: 1,
      q: 'Un MLG usado en pruebas devuelve, dentro de una respuesta rutinaria, un dato confidencial que no debería haber aparecido. ¿Qué preocupación de privacidad describe el programa para este caso?',
      o: [
        'Exposición involuntaria de datos: los modelos pueden generar resultados que revelen accidentalmente información confidencial.',
        'Riesgos de cumplimiento por incumplir el RGPD.',
        'Falta de control sobre el uso de los datos por parte de la herramienta.',
        'Envenenamiento de los datos de entrenamiento del modelo.'
      ], r: 0,
      why: 'Es el primero de los tres riesgos de privacidad que enumera el programa. Los otros dos son la <b>falta de control sobre el uso de los datos</b> —que la herramienta almacene y procese datos confidenciales sin consentimiento explícito— y los <b>riesgos de cumplimiento</b> normativo. El envenenamiento de datos es un vector de ataque (3.2.2), no una preocupación de privacidad.',
      ref: '3.2.1' },

    { id: '3.2.1d', cap: 3, lo: 'IAGEN-3.2.1', k: 'K2', pts: 1,
      q: 'Entre los riesgos de seguridad específicos de probar con IAGen, ¿cuál describe la introducción deliberada de datos diseñados para engañar al modelo?',
      o: [
        'Que la infraestructura de prueba dotada de MLG sea vulnerable a violaciones de datos o accesos no autorizados.',
        'Que los atacantes puedan introducir intencionadamente datos maliciosos para engañar a los MLG y comprometer su precisión o su seguridad.',
        'Que el modelo consuma más recursos de cálculo de los previstos.',
        'Que el proveedor del MLG almacene las conversaciones sin consentimiento.'
      ], r: 1,
      why: 'Es el tercero de los riesgos de seguridad del apartado, junto con la vulnerabilidad de la infraestructura y la explotación de vulnerabilidades del MLG por actores maliciosos —como los ataques de manipulación— para alterar su comportamiento o extraer información confidencial. El almacenamiento sin consentimiento es un riesgo de <b>privacidad</b>.',
      ref: '3.2.1' },

    { id: '3.2.2d', cap: 3, lo: 'IAGEN-3.2.2', k: 'K2', pts: 1,
      q: '¿Qué vector de ataque consiste en manipular un MLG para que genere puertas traseras, como llamadas a comandos externos, durante su uso?',
      o: [
        'Exfiltración de datos.',
        'Envenenamiento de datos.',
        'Generación de código malicioso.',
        'Manipulación de solicitudes.'
      ], r: 2,
      why: 'La <b>generación de código malicioso</b> se define así en la tabla del programa, y su ejemplo es la generación de código para abrir un canal de comunicación con una IP específica y maliciosa. Es un riesgo directo cuando se usa IAGen para generar guiones de prueba automatizados.',
      ref: '3.2.2' },

    { id: '3.2.2e', cap: 3, lo: 'IAGEN-3.2.2', k: 'K2', pts: 1,
      q: '¿Cuál de estas parejas de vector de ataque y descripción es <b>correcta</b>?',
      o: [
        'Exfiltración de datos: enviar solicitudes diseñadas para extraer datos de entrenamiento confidenciales.',
        'Manipulación de solicitudes: manipular los datos con los que se entrenó el modelo.',
        'Envenenamiento de datos: sobrecargar la ventana de contexto para provocar una fuga.',
        'Generación de código malicioso: introducir imágenes que arrastran al modelo a otro contexto.'
      ], r: 0,
      why: 'La <b>exfiltración de datos</b> —también llamada fuga de datos— es enviar solicitudes diseñadas para extraer datos de entrenamiento confidenciales. Las otras tres están cruzadas: manipular los datos de entrenamiento es <b>envenenamiento</b>; sobrecargar la ventana de contexto es el ejemplo de la <b>exfiltración</b>; e introducir imágenes que cambian el contexto es <b>manipulación de solicitudes</b>.',
      ref: '3.2.2' },

    { id: '3.2.2f', cap: 3, lo: 'IAGEN-3.2.2', k: 'K2', pts: 1,
      q: 'El programa da un nombre alternativo a dos de los vectores de ataque de su tabla. ¿Cuáles son?',
      o: [
        'La manipulación de solicitudes también se llama inyección de instrucciones, y la exfiltración, extracción de modelo.',
        'La exfiltración de datos también se llama fuga de datos, y el envenenamiento de datos, contaminación de datos.',
        'El envenenamiento de datos también se llama sobreajuste, y la generación de código malicioso, puerta trasera.',
        'La generación de código malicioso también se llama alucinación de código, y la manipulación, deriva del modelo.'
      ], r: 1,
      why: 'La tabla del programa recoge esos dos alias entre paréntesis: exfiltración de datos <i>(también fuga de datos)</i> y envenenamiento de datos <i>(también contaminación de datos)</i>. El sobreajuste es un reto del ajuste fino (4.2.1) y la alucinación es un defecto del modelo (3.1.1), no vectores de ataque.',
      ref: '3.2.2' },

    { id: '3.2.3c', cap: 3, lo: 'IAGEN-3.2.3', k: 'K2', pts: 1,
      q: '¿En qué consiste la <b>minimización de datos</b> como medida de privacidad al probar con IAGen?',
      o: [
        'En comprimir los datos antes de enviarlos para consumir menos tóquenes.',
        'En reducir el número de personas del equipo con acceso a la herramienta de IAGen.',
        'En enmascarar la información sensible sustituyéndola por datos no identificables.',
        'En evitar el procesamiento de datos sensibles salvo que esté legalmente permitido, y usar solo la cantidad necesaria de datos no sensibles.'
      ], r: 3,
      why: 'Es la definición del programa. Conviene no confundirla con la <b>anonimización y seudonimización</b>, que es la medida de enmascarar o sustituir la información sensible por datos no identificables —la opción tercera—, ni con los controles de acceso, que caen bajo el almacenamiento y la transmisión seguros.',
      ref: '3.2.3' },

    { id: '3.2.3d', cap: 3, lo: 'IAGEN-3.2.3', k: 'K2', pts: 1,
      q: 'Al asegurar los datos en el uso de IAGen para la prueba, ¿a quién recomienda especialmente implicar el programa?',
      o: [
        'A ingenieros de seguridad sénior, asesores jurídicos y el director de tecnología (DT) o el director de seguridad de la información (DSI), si los hay en la organización.',
        'Únicamente al proveedor del MLG, que es quien conoce las garantías del servicio.',
        'A los propios probadores, que son los que mejor conocen los datos de prueba.',
        'A un auditor externo independiente, como único responsable de la decisión.'
      ], r: 0,
      why: 'El programa cierra el apartado con esa recomendación, después de subrayar que las estrategias de mitigación son complementarias entre sí y <b>hay que combinarlas</b>. Los probadores tienen su parte —el capítulo 5 les pide comprender las implicaciones de seguridad y hacer limpieza de datos—, pero la decisión no recae solo en ellos.',
      ref: '3.2.3' },

    { id: '3.3.1c', cap: 3, lo: 'IAGEN-3.3.1', k: 'K2', pts: 1,
      q: '¿Por qué el uso de MLG como servicios basados en la web aumenta el consumo de energía?',
      o: [
        'Porque cada consulta obliga a reentrenar parcialmente el modelo.',
        'Porque su uso incrementa la carga sobre los dispositivos, las redes y los centros de datos.',
        'Porque las respuestas se almacenan indefinidamente en bases de datos vectoriales.',
        'Porque los modelos de razonamiento funcionan siempre a temperatura máxima.'
      ], r: 1,
      why: 'El programa parte de que el entrenamiento y el procesamiento de los MLG requieren un uso intensivo de recursos informáticos especializados, y añade que al estar disponibles como servicios web su uso <b>aumenta la carga sobre los dispositivos, las redes y los centros de datos</b>. Una consulta no reentrena el modelo.',
      ref: '3.3.1' },

    { id: '3.3.1d', cap: 3, lo: 'IAGEN-3.3.1', k: 'K2', pts: 1,
      q: '¿Qué afirma el programa sobre la medición del impacto medioambiental de la IA generativa?',
      o: [
        'Que existen cifras precisas y estandarizadas por proveedor, publicadas en sus informes anuales.',
        'Que el impacto es despreciable mientras las tareas sean de generación de texto.',
        'Que es difícil obtener datos precisos, pero está claro que estas operaciones intensivas contribuyen colectivamente a emisiones significativas de CO₂, y que el efecto acumulativo entre millones de usuarios supone una carga considerable.',
        'Que solo el entrenamiento tiene impacto medible; la inferencia es irrelevante.'
      ], r: 2,
      why: 'Es literalmente lo que dice el apartado (Luccioni 2024b, Berthelot 2024). El propio programa matiza que una sola búsqueda o tarea de generación de texto <b>puede parecer insignificante</b>, y por eso insiste en el efecto acumulativo: no es que sea despreciable, es que solo se ve al sumarlo.',
      ref: '3.3.1' },

    { id: '3.4.1c', cap: 3, lo: 'IAGEN-3.4.1', k: 'K1', pts: 1,
      q: '¿Qué proporciona <b>ISO/IEC 23053:2022</b> y qué aporta a la prueba de software?',
      o: [
        'Un marco legal que clasifica las aplicaciones de IA por nivel de riesgo.',
        'Un marco para los procesos del ciclo de vida de la IA, con énfasis en la tolerancia a fallos y la transparencia; en prueba aporta un marco para la calidad de los datos, la transparencia y la tolerancia a fallos al usar IAGen.',
        'Los requisitos de un sistema de gestión de IA dentro de una organización.',
        'Directrices estadounidenses de gestión de riesgos centradas en la equidad.'
      ], r: 1,
      why: 'ISO/IEC 23053:2022 es la norma <i>Framework for Artificial Intelligence (AI) Systems Using Machine Learning</i>. Las otras opciones son, en orden, el <b>AI Act 2024</b>, <b>ISO/IEC 42001:2023</b> y el <b>NIST AI RMF 1.0</b>.',
      ref: '3.4.1' },

    { id: '3.4.1d', cap: 3, lo: 'IAGEN-3.4.1', k: 'K1', pts: 1,
      q: '¿Qué ofrece el <b>NIST AI RMF 1.0</b> y qué recomienda el programa a las organizaciones de prueba respecto a este marco normativo?',
      o: [
        'Ofrece directrices para la gestión de riesgos de IA centradas en la equidad, la transparencia y la seguridad; y recomienda mantenerse al día en el desarrollo de reglamentos, normas, leyes nacionales y marcos de buenas prácticas.',
        'Ofrece una certificación obligatoria para toda herramienta de IAGen usada en pruebas; y recomienda obtenerla antes de desplegar.',
        'Ofrece un catálogo de modelos aprobados para uso corporativo; y recomienda elegir solo de esa lista.',
        'Ofrece un método de cálculo de emisiones de CO₂; y recomienda publicarlo junto a los informes de prueba.'
      ], r: 0,
      why: 'El NIST AI RMF 1.0 es un <b>marco</b> (EE. UU.), no una certificación ni un catálogo: garantiza la equidad y mitiga riesgos en la IAGen evitando resultados sesgados en las pruebas. Y el apartado cierra diciendo que, mientras las tecnologías de IA y su marco regulatorio evolucionan, es imprescindible que las organizaciones de prueba se mantengan al día.',
      ref: '3.4.1' },

  /* ══════════════════════════════════════════════════════════════════════
     CAPÍTULO 4 — Infraestructura impulsada por MLG
     ══════════════════════════════════════════════════════════════════════ */

    { id: '4.1.1c', cap: 4, lo: 'IAGEN-4.1.1', k: 'K2', pts: 1,
      q: 'En la arquitectura de una infraestructura de prueba impulsada por MLG, ¿qué es la <b>capa de presentación</b> y cómo puede alojarse el MLG?',
      o: [
        'La capa de presentación gestiona la autenticación y la preparación de instrucciones; el MLG se aloja siempre en la infraestructura de la organización.',
        'La capa de presentación es la base de datos vectorial; el MLG se aloja dentro de ella.',
        'La capa de presentación es la interfaz de usuario donde los probadores introducen consultas o comandos; el MLG puede alojarse como servicio de terceros accesible por IPA o como un modelo interno personalizado.',
        'La capa de presentación es el conjunto de guiones de prueba automatizados; el MLG los ejecuta directamente.'
      ], r: 2,
      why: 'Son las dos afirmaciones del apartado: la capa de presentación (front-end) sirve como interfaz de usuario, y el MLG —alojado como servicio de terceros por IPA o como modelo interno personalizado— genera respuestas a partir de instrucciones estructuradas. La autenticación y la preparación de instrucciones corresponden a la <b>capa de servicios</b>.',
      ref: '4.1.1' },

    { id: '4.1.1d', cap: 4, lo: 'IAGEN-4.1.1', k: 'K2', pts: 1,
      q: '¿Qué hace la capa de servicios con la salida sin procesar del MLG, y qué dos tipos de fuentes de datos integra?',
      o: [
        'La reenvía sin tocarla; integra únicamente bases de datos relacionales.',
        'La mejora mediante posprocesamiento para que se ajuste a las condiciones de prueba antes de presentarla; integra bases relacionales (datos estructurados como casos de prueba) y bases vectoriales (recuperación semántica mediante incrustaciones).',
        'La almacena como nuevo dato de entrenamiento; integra bases vectoriales y sistemas de archivos.',
        'La compara automáticamente con la de un segundo modelo; integra dos proveedores de MLG distintos.'
      ], r: 1,
      why: 'El apartado lo detalla en su lista: la capa de servicios <b>mejora la salida sin procesar del MLG mediante el posprocesamiento</b>, garantizando que las respuestas se ajusten a las condiciones de prueba del proceso antes de presentarlas a la interfaz de usuario, e integra múltiples fuentes: relacionales y vectoriales. Comparar con otro modelo es una estrategia de mitigación (3.1.3), no una función de esta capa.',
      ref: '4.1.1' },

    { id: '4.1.2c', cap: 4, lo: 'IAGEN-4.1.2', k: 'K2', pts: 1,
      q: '¿Qué permite concretamente la generación aumentada por recuperación en la prueba de software?',
      o: [
        'Que el modelo aprenda de forma permanente los casos de prueba de la organización, incorporándolos a sus pesos.',
        'Que la infraestructura impulsada por MLG acceda a las fuentes de datos corporativas —bases de datos, documentación y repositorios— para recuperar información contextual en tiempo real y ajustarse a las últimas especificaciones, requisitos y datos de prueba existentes.',
        'Que se prescinda de la ventana de contexto, al recuperar los documentos completos.',
        'Que las respuestas sean deterministas, al proceder de documentos fijos.'
      ], r: 1,
      why: 'Es la aplicación que describe el programa. GAR <b>no modifica el modelo</b>: incorpora fuentes de datos adicionales al proceso de generación de respuestas. Incorporar conocimiento a los pesos del modelo sería el ajuste fino (4.2.1), y la compatibilidad con la ventana de contexto es precisamente el motivo de fragmentar los documentos.',
      ref: '4.1.2' },

    { id: '4.1.2d', cap: 4, lo: 'IAGEN-4.1.2', k: 'K2', pts: 1,
      q: 'En un sistema GAR, ¿qué es una <b>respuesta relevante</b>?',
      o: [
        'La respuesta más corta entre las que el modelo puede generar para la consulta.',
        'Una respuesta cuya exactitud ha sido validada por un experto del dominio antes de mostrarse.',
        'Un resultado generado que se basa en información relevante, precisa y contextualmente adecuada recopilada durante la recuperación, de modo que no depende solo del entrenamiento previo del modelo.',
        'Una respuesta generada exclusivamente a partir de los documentos recuperados, sin usar el conocimiento del modelo.'
      ], r: 2,
      why: 'El programa la define así y subraya que la respuesta se <b>enriquece</b> con datos precisos pertinentes a la instrucción: la sinergia entre recuperación y generación mejora precisión y relevancia. Ojo con la última opción: en la fase de generación el MLG combina sus conocimientos existentes con los datos recuperados, no los sustituye.',
      ref: '4.1.2' },

    { id: '4.1.3c', cap: 4, lo: 'IAGEN-4.1.3', k: 'K2', pts: 1,
      q: '¿Mediante qué operan de forma independiente los <b>agentes autónomos</b> según el programa?',
      o: [
        'Mediante reglas predefinidas, aprendizaje por refuerzo y bucles de retroalimentación adaptativos, con una intervención humana mínima.',
        'Mediante la supervisión humana periódica de cada tarea que completan.',
        'Mediante la orquestación de varios modelos de razonamiento en paralelo.',
        'Mediante el ajuste fino continuo del MLG con los resultados de cada ejecución.'
      ], r: 0,
      why: 'Es la definición del programa. La <b>supervisión humana periódica</b> caracteriza a los agentes semiautónomos, y la <b>orquestación</b> es el nombre del esfuerzo coordinado entre varios agentes en una arquitectura multiagente, no el mecanismo de la autonomía.',
      ref: '4.1.3' },

    { id: '4.1.3d', cap: 4, lo: 'IAGEN-4.1.3', k: 'K2', pts: 1,
      q: '¿Qué son los <b>agentes impulsados por MLG</b>?',
      o: [
        'Modelos de lenguaje ajustados finamente para un dominio de prueba concreto.',
        'Aplicaciones IAGen especializadas que funcionan con MLG, diseñadas para el procesamiento semiautónomo o autónomo de tareas definidas, y que se apoyan en el modelo para comprender y generar lenguaje natural, procesar instrucciones, recuperar contexto y realizar acciones inteligentes.',
        'Interfaces de conversación que responden preguntas sobre el proceso de prueba.',
        'Servicios que exponen un MLG a través de una interfaz de programación de aplicación.'
      ], r: 1,
      why: 'Es la definición literal (Wang 2024). Lo que los separa de un bot de conversación tradicional —tercera opción— es que pueden <b>actuar</b> invocando un conjunto predefinido de funciones, las «herramientas», con las que interactúan con sistemas externos y los manipulan.',
      ref: '4.1.3' },

    { id: '4.2.1c', cap: 4, lo: 'IAGEN-4.2.1', k: 'K2', pts: 1,
      q: '¿En qué consiste el <b>ajuste fino</b> de un modelo de lenguaje?',
      o: [
        'En recuperar documentos relevantes y añadirlos a la instrucción antes de generar la respuesta.',
        'En reducir el número de parámetros del modelo para que consuma menos recursos.',
        'En adaptar un modelo preentrenado a tareas específicas o dominios concretos, siguiendo entrenándolo con un conjunto de datos específico para que adquiera conocimientos y matices propios del dominio.',
        'En ajustar los hiperparámetros de temperatura y semilla antes de cada inferencia.'
      ], r: 2,
      why: 'Es la definición del programa (Parthasarathy 2024): mediante el ajuste fino se mejora el rendimiento del modelo para aplicaciones especializadas, haciéndolo más preciso y relevante para el caso de uso previsto. Recuperar documentos es <b>GAR</b> (4.1.2) y tocar temperatura o semilla es mitigación del no determinismo (3.1.4).',
      ref: '4.2.1' },

    { id: '4.2.1d', cap: 4, lo: 'IAGEN-4.2.1', k: 'K2', pts: 1,
      q: 'El programa cita la <b>opacidad</b> entre los retos del ajuste fino. ¿Qué es y por qué importa?',
      o: [
        'La falta de transparencia sobre cómo el MLG toma sus decisiones o produce sus resultados, lo que complica la depuración y la validación.',
        'La imposibilidad de acceder al conjunto de datos con el que se ajustó el modelo.',
        'La pérdida de rendimiento del modelo con datos nuevos y desconocidos.',
        'La dificultad de estimar el coste de cálculo del proceso de ajuste.'
      ], r: 0,
      why: 'Es la definición que da el programa entre paréntesis. La pérdida de rendimiento con datos nuevos es el <b>sobreajuste</b>, otro de los cuatro retos, junto con evitar resultados sesgados garantizando datos de alta calidad y gestionar los importantes recursos de cálculo necesarios.',
      ref: '4.2.1' },

    { id: '4.2.2c', cap: 4, lo: 'IAGEN-4.2.2', k: 'K2', pts: 1,
      q: 'Si una organización opta por el enfoque de <b>usar un chatbot con IA</b>, ¿qué consideraciones destaca el programa?',
      o: [
        'Ninguna en particular: al no integrarse con los sistemas internos, no hay riesgos que gestionar.',
        'Gestionar los riesgos de privacidad y seguridad de los datos optimizando costes, pudiendo usar plataformas MLG como servicio si ofrecen las garantías necesarias, o desplegar infraestructura interna con MLG de licencia de código abierto para un mayor control.',
        'Únicamente el coste por tóquen, ya que la privacidad la garantiza el proveedor por contrato.',
        'Desarrollar primero un agente autónomo que valide cada respuesta del chatbot.'
      ], r: 1,
      why: 'Es el primero de los tres enfoques de OpsMLG que describe el programa, y añade que es fundamental una <b>evaluación rigurosa</b> de las garantías de los proveedores o de las capacidades internas para mitigar los riesgos de privacidad y seguridad y asegurar la eficiencia operativa.',
      ref: '4.2.2' },

    { id: '4.2.2d', cap: 4, lo: 'IAGEN-4.2.2', k: 'K2', pts: 1,
      q: '¿Qué exige el enfoque de <b>desarrollar internamente</b> una herramienta de prueba basada en IA generativa?',
      o: [
        'Solo la compra de licencias comerciales de un MLG de gran tamaño.',
        'Renunciar al uso de chatbots y herramientas de terceros en toda la organización.',
        'Control integral de los riesgos de privacidad y seguridad, planificación cuidadosa de los costes operativos —procesamiento, almacenamiento de datos y capacitación del personal—, procesos estructurados para validar y mantener los desarrollos, y experiencia en implementar y desplegar una infraestructura impulsada por MLG.',
        'La certificación previa de la herramienta conforme a ISO/IEC 42001.'
      ], r: 2,
      why: 'Es lo que enumera el programa para este enfoque. Y recuerda inmediatamente después que los tres enfoques <b>no son mutuamente excluyentes</b>: desarrollar en casa no obliga a renunciar al chatbot para otras tareas.',
      ref: '4.2.2' },

  /* ══════════════════════════════════════════════════════════════════════
     CAPÍTULO 5 — Despliegue e integración
     ══════════════════════════════════════════════════════════════════════ */

    { id: '5.1.1c', cap: 5, lo: 'IAGEN-5.1.1', k: 'K1', pts: 1,
      q: '¿Qué riesgo de la IA en la sombra se relaciona con los acuerdos de licencia poco claros?',
      o: [
        'Debilidades en seguridad y privacidad de datos.',
        'Cuestiones normativas y de cumplimiento.',
        'Propiedad intelectual difusa, que puede exponer a los usuarios de MLG a disputas, especialmente si se procesan datos protegidos por derechos de autor sin la debida autorización.',
        'Aumento del consumo energético por uso descontrolado.'
      ], r: 2,
      why: 'Es el tercero de los tres riesgos que enumera el apartado. Los otros dos son las <b>debilidades en seguridad y privacidad</b> —herramientas personales sin seguridad sólida, con posibles violaciones de datos— y las <b>cuestiones normativas y de cumplimiento</b>, por usar herramientas no aprobadas.',
      ref: '5.1.1' },

    { id: '5.1.1d', cap: 5, lo: 'IAGEN-5.1.1', k: 'K1', pts: 1,
      q: 'Un probador empieza a usar por su cuenta una herramienta de IA personal que la organización no ha aprobado. Según el programa, ¿qué dos riesgos concretos aparecen?',
      o: [
        'Que la herramienta carezca de una seguridad sólida y provoque violaciones de datos, y que su uso incumpla estándares y normativas del sector con posibles consecuencias legales.',
        'Que el modelo alucine más que el aprobado, y que consuma más energía.',
        'Que el probador pierda competencias de prueba tradicionales, y que el equipo se desmotive.',
        'Que la herramienta sobreajuste sus respuestas al dominio, y que la ventana de contexto sea menor.'
      ], r: 0,
      why: 'Son los dos primeros riesgos de la <b>IA en la sombra</b>, tal como los describe el programa. La pérdida de competencias tradicionales aparece en el capítulo 5, pero como algo que el gestor de prueba debe evitar al gestionar el cambio (5.2.3), no como un riesgo de la IA en la sombra.',
      ref: '5.1.1' },

    { id: '5.1.2c', cap: 5, lo: 'IAGEN-5.1.2', k: 'K2', pts: 1,
      q: '¿Con qué debe comenzar una estrategia de IAGen para la prueba de software?',
      o: [
        'Con la selección del proveedor de MLG más barato del mercado.',
        'Con la definición de objetivos de prueba medibles para IAGen, como aumentar la productividad de la prueba, acortar los ciclos de prueba y mejorar la calidad.',
        'Con la contratación de perfiles de ciencia de datos para el equipo de prueba.',
        'Con la certificación del proceso conforme al AI Act de la UE.'
      ], r: 1,
      why: 'El programa abre así el apartado: la implementación exitosa comienza definiendo <b>objetivos de prueba medibles</b>, y cita esos tres. A partir de ahí vienen la selección de los MLG adecuados, la calidad de los datos, la formación, las métricas y las directrices de proceso.',
      ref: '5.1.2' },

    { id: '5.1.2d', cap: 5, lo: 'IAGEN-5.1.2', k: 'K2', pts: 1,
      q: 'Al seleccionar los MLG dentro de una estrategia de prueba con IAGen, ¿con qué deben estar en consonancia y qué debe garantizarse además?',
      o: [
        'Con el presupuesto del departamento, garantizando el menor coste por tóquen.',
        'Con la normativa vigente, garantizando que el proveedor esté certificado.',
        'Con las preferencias del equipo, garantizando la adopción voluntaria.',
        'Con los objetivos de prueba definidos, garantizando la compatibilidad con la infraestructura de prueba existente y el cumplimiento de los requisitos de escalabilidad del sistema.'
      ], r: 3,
      why: 'El programa lo dice explícitamente: la selección de los MLG adecuados es fundamental y debe estar en consonancia con los objetivos de prueba, <b>al tiempo que se garantiza la compatibilidad con la infraestructura de prueba existente</b> y se cumplen los requisitos de escalabilidad. El coste recurrente es uno de los criterios de selección (5.1.3), pero no el eje de la estrategia.',
      ref: '5.1.2' },

    { id: '5.1.3c', cap: 5, lo: 'IAGEN-5.1.3', k: 'K2', pts: 1,
      q: '¿Qué incluye el criterio de <b>coste recurrente</b> al seleccionar un MLG/MLP para tareas de prueba?',
      o: [
        'Solo el precio por millón de tóquenes de entrada.',
        'Las tasas de licencia y los gastos operativos, para garantizar que se ajusta al presupuesto de la organización para las tareas de prueba previstas.',
        'El coste de entrenar el modelo desde cero con datos propios.',
        'El coste de las certificaciones del equipo en el uso de la herramienta.'
      ], r: 1,
      why: 'Es la definición del criterio en el programa. Es uno de los cuatro, junto con el <b>rendimiento del modelo</b>, el <b>potencial de ajuste fino</b> y la <b>comunidad y el soporte</b>. Entrenar desde cero no está entre las opciones que plantea el programa para una organización de prueba.',
      ref: '5.1.3' },

    { id: '5.1.3d', cap: 5, lo: 'IAGEN-5.1.3', k: 'K2', pts: 1,
      q: 'Según el programa, ¿en qué se diferencian entre sí los MLG/MLP disponibles en el mercado?',
      o: [
        'Solo en el número de parámetros y en la velocidad de respuesta.',
        'En el idioma de entrenamiento y en el país donde se alojan.',
        'En capacidades funcionales (por ejemplo, entrada multimodal o de razonamiento), características técnicas (por ejemplo, el tamaño de la ventana de contexto) y tipos de licencia (comercial frente a código abierto).',
        'Únicamente en si admiten o no ajuste fino.'
      ], r: 2,
      why: 'Es la frase con la que el programa abre el apartado de selección, y de ahí deriva la necesidad de valorar los cuatro criterios clave. Añade además que <b>solo unos pocos puntos de referencia</b> se centran específicamente en tareas de prueba de software (Wenhan 2024).',
      ref: '5.1.3' },

    { id: '5.1.4c', cap: 5, lo: 'IAGEN-5.1.4', k: 'K1', pts: 1,
      q: '¿En qué se centra la fase de <b>descubrimiento</b> en la adopción de IAGen?',
      o: [
        'En la concienciación y el desarrollo de capacidades: formar a los equipos en los conceptos de IAGen, dar acceso a MLG/MLP y experimentar con casos de uso iniciales para familiarizar a los probadores y generar confianza.',
        'En identificar y priorizar los casos de uso prácticos y evaluar la infraestructura impulsada por MLG.',
        'En integrar completamente IAGen en los procesos y medir la transformación.',
        'En auditar el cumplimiento normativo antes de cualquier uso.'
      ], r: 0,
      why: 'Es la primera de las tres fases. La segunda —<b>inicio y definición del uso</b>— es la de identificar y priorizar casos de uso prácticos, evaluar la infraestructura y desarrollar conocimientos especializados; y la tercera —<b>uso e iteración</b>— la de integración completa, seguimiento y medición.',
      ref: '5.1.4' },

    { id: '5.1.4d', cap: 5, lo: 'IAGEN-5.1.4', k: 'K1', pts: 1,
      q: '¿Qué caracteriza a la fase de <b>uso e iteración</b>?',
      o: [
        'La experimentación con casos de uso iniciales para generar confianza en el equipo.',
        'La selección del proveedor de MLG y la firma del contrato de servicio.',
        'La integración completa de IAGen en los procesos de prueba, con seguimiento continuo del progreso y de las herramientas relacionadas, y medición y gestión de la transformación para garantizar beneficios sostenibles y escalabilidad.',
        'La priorización inicial de los casos de uso más rentables.'
      ], r: 2,
      why: 'Es la descripción de la tercera fase, la avanzada. El programa recuerda además que las tres fases <b>pueden ejecutarse en paralelo para distintos casos de uso</b>: el análisis de informes de prueba puede estar en «uso e iteración» mientras la automatización sigue en «descubrimiento».',
      ref: '5.1.4' },

    { id: '5.2.1c', cap: 5, lo: 'IAGEN-5.2.1', k: 'K2', pts: 1,
      q: '¿Qué deben comprender y hacer los probadores al compartir productos de prueba con un MLG?',
      o: [
        'Comprender las implicaciones de seguridad de los datos, implementar una limpieza adecuada —eliminando u ocultando información sensible, personal o confidencial— y seguir prácticas de ingeniería de instrucciones que preserven la privacidad.',
        'Solicitar autorización escrita al proveedor del MLG antes de cada envío.',
        'Cifrar cada instrucción antes de enviarla al modelo.',
        'Limitar los envíos a documentos que ya sean públicos.'
      ], r: 0,
      why: 'Es lo que el programa incluye entre los conocimientos esenciales del probador que trabaja con IAGen. La <b>limpieza de datos</b> es el término que usa, y conecta directamente con las medidas de anonimización y minimización del capítulo 3.',
      ref: '5.2.1 · 3.2.3' },

    { id: '5.2.1d', cap: 5, lo: 'IAGEN-5.2.1', k: 'K2', pts: 1,
      q: '¿Cuáles son las <b>competencias clave</b> que enumera el programa para probar con IA generativa?',
      o: [
        'Programar en al menos un lenguaje de automatización, administrar bases de datos vectoriales y desplegar modelos.',
        'Evaluar las capacidades de los MLG, comprender las técnicas de refinamiento de las instrucciones y evaluar los productos de prueba generados por IA.',
        'Entrenar modelos, etiquetar datos y validar arquitecturas de transformadores.',
        'Negociar contratos con proveedores, calcular el coste por tóquen y auditar el cumplimiento normativo.'
      ], r: 1,
      why: 'Son las tres competencias clave del apartado. Se apoyan en las tres habilidades que lo abren —dominar la ingeniería de instrucciones, comprender las ventanas de contexto y desarrollar métodos de revisión de la prueba— y en combinar la <b>experiencia de dominio y de prueba</b> con habilidades de IA. Entrenar modelos o desplegar infraestructura no se le pide al probador.',
      ref: '5.2.1' },

    { id: '5.2.2c', cap: 5, lo: 'IAGEN-5.2.2', k: 'K1', pts: 1,
      q: '¿Qué papel juegan las <b>comunidades internas de práctica</b> en la adopción de IAGen?',
      o: [
        'Sustituyen a la formación estructurada, que deja de ser necesaria.',
        'Auditan el cumplimiento normativo del uso de IAGen en cada proyecto.',
        'Apoyan el intercambio continuo de conocimientos con reuniones periódicas para destacar experiencias exitosas, debatir retos y perfeccionar buenas prácticas, compartiendo librerías de patrones de instrucciones y documentando lecciones aprendidas.',
        'Deciden qué modelo puede usar cada equipo y bloquean el resto.'
      ], r: 2,
      why: 'Es la descripción del programa. Estas comunidades <b>complementan</b> el resto del enfoque práctico —practicar con varios MLG/MLP, itinerarios estructurados, ejercicios guiados, aprendizaje entre compañeros—, no lo sustituyen; y su función es compartir conocimiento, no gobernar ni auditar.',
      ref: '5.2.2' },

    { id: '5.2.2d', cap: 5, lo: 'IAGEN-5.2.2', k: 'K1', pts: 1,
      q: '¿Cómo progresan los miembros del equipo de prueba en el uso de instrucciones, según el programa?',
      o: [
        'De usar chatbots a programar sus propios agentes autónomos.',
        'De dominar la creación básica de instrucciones a utilizar técnicas más específicas, como las instrucciones específicas para la prueba.',
        'De escribir instrucciones a ajustar finamente los modelos con datos del dominio.',
        'De trabajar con un solo modelo a mantener un catálogo de proveedores.'
      ], r: 1,
      why: 'Es la progresión que describe el programa dentro del desarrollo de capacidades, y de ahí pasa directamente a definir el <b>patrón de instrucción</b> como plantilla reutilizable. El ajuste fino y los agentes son temas del capítulo 4, no la ruta de aprendizaje del equipo.',
      ref: '5.2.2' },

    { id: '5.2.3c', cap: 5, lo: 'IAGEN-5.2.3', k: 'K1', pts: 1,
      q: '¿Qué tareas se añaden al probador en una organización de prueba asistida por IA?',
      o: [
        'Entrenar los modelos con los datos históricos del proyecto y validar su arquitectura.',
        'Administrar la base de datos vectorial y mantener el sistema GAR.',
        'Definir la estrategia de prueba basada en IA y establecer el marco de gobernanza.',
        'Revisar los resultados generados por IA, perfeccionar las instrucciones y mantener librerías de instrucciones específicas para la prueba.'
      ], r: 3,
      why: 'Son las tres tareas con que el programa amplía el rol del probador, que pasa de especialista en diseño y ejecución a <b>especialista en pruebas asistidas por IA</b>. Definir la estrategia y la gobernanza corresponde al <b>gestor de prueba</b>, y las tareas técnicas de modelo e infraestructura no se le atribuyen a ninguno de los dos.',
      ref: '5.2.3' },

    { id: '5.2.3d', cap: 5, lo: 'IAGEN-5.2.3', k: 'K1', pts: 1,
      q: '¿En qué se centran los gestores de prueba al adoptar IA generativa?',
      o: [
        'En equilibrar las capacidades humanas y de la IA, establecer marcos de gobernanza de la IA para casos de uso y garantizar que sus equipos mantengan tanto las competencias de prueba tradicionales como los conocimientos de IA.',
        'En sustituir progresivamente a los probadores humanos por agentes impulsados por IAGen.',
        'En escribir personalmente las instrucciones que usará todo el equipo.',
        'En reducir el presupuesto de prueba en la misma proporción en que aumenta la automatización.'
      ], r: 0,
      why: 'Es lo que recoge el apartado. Y añade una consecuencia concreta: los gestores ya no dirigirán solo a probadores humanos, sino que también <b>coordinarán con agentes de prueba impulsados por IAGen</b>, lo que exige nuevas habilidades de gestión para supervisar equipos híbridos de personas y herramientas. Nada de eso implica sustituir al equipo.',
      ref: '5.2.3' }
  ];

  return { banco: banco };
})();
