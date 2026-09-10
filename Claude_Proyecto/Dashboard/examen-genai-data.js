/* ══════════════════════════════════════════════════════════════════════════
   EXAMEN CT-GenAI — banco de preguntas
   ══════════════════════════════════════════════════════════════════════════

   Simulacro del examen ISTQB® Certified Tester Specialist:
   Testing with Generative AI (CT-GenAI).

   DE DÓNDE SALE CADA COSA (nada de esto está inventado):

   · Las PREGUNTAS salen únicamente del programa de estudio oficial en español
     "Probador Certificado de ISTQB® — Nivel Especialista — Prueba con IA
     Generativa (IAGen), Versión ES V01.01" (traducción del CT-GenAI V1.0 del
     25 de julio de 2025). Cada pregunta lleva en `ref` la sección exacta del
     syllabus de la que se responde. Si algo no está en ese PDF, no está aquí.

   · La ESTRUCTURA (cuántas preguntas por objetivo de aprendizaje, qué nivel K
     y cuántos puntos vale cada una) sale del documento oficial
     "ISTQB CT-GenAI Exam Structure Tables v1.0" (16 dic 2024). Por eso el
     examen da exactamente 40 preguntas y 46 puntos: las 34 preguntas K1/K2
     valen 1 punto y las 6 preguntas K3 valen 2.

   · El corte de aprobación (65% = 30 de 46 puntos) y los 60 minutos son los
     oficiales de ISTQB. Los 75 minutos son el +25% que ISTQB concede a quien
     presenta en un idioma que no es el suyo.

   POR QUÉ HAY MÁS DE 40 PREGUNTAS: el banco tiene 2 ó 3 variantes por
   objetivo de aprendizaje. Cada intento arma un examen nuevo respetando el
   blueprint, así que se puede repetir sin memorizar el orden de las
   respuestas. El motor está en examen-genai.js.

   Formato de cada pregunta:
     id   identificador estable (objetivo + letra de variante)
     cap  capítulo del syllabus
     lo   objetivo de aprendizaje evaluado
     k    nivel cognitivo (K1 recordar · K2 comprender · K3 aplicar)
     pts  puntos (1 para K1/K2, 2 para K3)
     q    enunciado
     o    las cuatro opciones
     r    índice (0-3) de la opción correcta
     why  la justificación, incluido por qué fallan las otras
     ref  sección del syllabus donde se comprueba
   ══════════════════════════════════════════════════════════════════════════ */

window.EXAMEN_GENAI = (function () {

  /* ── Datos oficiales del examen ─────────────────────────────────────── */
  const meta = {
    nombre: 'ISTQB® CT-GenAI',
    subtitulo: 'Certified Tester Specialist · Testing with Generative AI',
    preguntas: 40,
    puntos: 46,
    corte: 30,            // 65% de 46
    cortePct: 65,
    minutos: 60,          // oficial
    minutosExtra: 75,     // +25% por presentar en idioma no nativo
    syllabus: 'Programa de estudio ES V01.01 (CT-GenAI V1.0, 25 jul 2025)',
    requisito: 'ISTQB® Certified Tester Foundation Level (CTFL)'
  };

  /* ── Blueprint oficial: qué se pregunta y cuánto vale ───────────────── */
  /* Cap 1: 7 preg / 7 pts · Cap 2: 11 / 16 · Cap 3: 10 / 11
     Cap 4: 5 / 5 · Cap 5: 7 / 7   →   40 preguntas, 46 puntos            */
  const blueprint = [
    { lo: 'IAGEN-1.1.1', k: 'K1', pts: 1, n: 1 },
    { lo: 'IAGEN-1.1.2', k: 'K2', pts: 1, n: 2 },
    { lo: 'IAGEN-1.1.3', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-1.1.4', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-1.2.1', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-1.2.2', k: 'K2', pts: 1, n: 1 },

    { lo: 'IAGEN-2.1.1', k: 'K2', pts: 1, n: 2 },
    { lo: 'IAGEN-2.1.2', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-2.1.3', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-2.2.1', k: 'K3', pts: 2, n: 1 },
    { lo: 'IAGEN-2.2.2', k: 'K3', pts: 2, n: 1 },
    { lo: 'IAGEN-2.2.3', k: 'K3', pts: 2, n: 1 },
    { lo: 'IAGEN-2.2.4', k: 'K3', pts: 2, n: 1 },
    { lo: 'IAGEN-2.2.5', k: 'K3', pts: 2, n: 1 },
    { lo: 'IAGEN-2.3.1', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-2.3.2', k: 'K2', pts: 1, n: 1 },

    { lo: 'IAGEN-3.1.1', k: 'K1', pts: 1, n: 1 },
    { lo: 'IAGEN-3.1.2', k: 'K3', pts: 2, n: 1 },
    { lo: 'IAGEN-3.1.3', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-3.1.4', k: 'K1', pts: 1, n: 1 },
    { lo: 'IAGEN-3.2.1', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-3.2.2', k: 'K2', pts: 1, n: 2 },
    { lo: 'IAGEN-3.2.3', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-3.3.1', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-3.4.1', k: 'K1', pts: 1, n: 1 },

    { lo: 'IAGEN-4.1.1', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-4.1.2', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-4.1.3', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-4.2.1', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-4.2.2', k: 'K2', pts: 1, n: 1 },

    { lo: 'IAGEN-5.1.1', k: 'K1', pts: 1, n: 1 },
    { lo: 'IAGEN-5.1.2', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-5.1.3', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-5.1.4', k: 'K1', pts: 1, n: 1 },
    { lo: 'IAGEN-5.2.1', k: 'K2', pts: 1, n: 1 },
    { lo: 'IAGEN-5.2.2', k: 'K1', pts: 1, n: 1 },
    { lo: 'IAGEN-5.2.3', k: 'K1', pts: 1, n: 1 }
  ];

  /* Títulos de capítulo, para el desglose del resultado */
  const capitulos = {
    1: 'Introducción a la IA generativa para la prueba de software',
    2: 'Ingeniería de instrucciones para la prueba de software efectiva',
    3: 'Gestión de riesgos de la IA generativa en la prueba de software',
    4: 'Infraestructura de prueba impulsada por MLG',
    5: 'Despliegue e integración de IAGen en organizaciones de prueba'
  };

  /* ══════════════════════════════════════════════════════════════════════
     CAPÍTULO 1 — Introducción a la IA generativa (7 preguntas, 7 puntos)
     ══════════════════════════════════════════════════════════════════════ */
  const banco = [

    { id: '1.1.1a', cap: 1, lo: 'IAGEN-1.1.1', k: 'K1', pts: 1,
      q: '¿Cuál de las siguientes afirmaciones describe correctamente la <b>IA simbólica</b>?',
      o: [
        'Utiliza un sistema basado en reglas para imitar la toma de decisiones humana, representando el conocimiento mediante símbolos y reglas lógicas.',
        'Usa redes neuronales para aprender automáticamente características a partir de los datos, sin que el usuario tenga que definirlas manualmente.',
        'Es un enfoque basado en datos que requiere preparación de datos, selección de características y entrenamiento de modelos.',
        'Crea contenido nuevo (texto, imágenes, código) aprendiendo e imitando patrones de sus datos de entrenamiento.'
      ], r: 0,
      why: 'La IA simbólica representa el conocimiento mediante símbolos y reglas lógicas, y decide con un sistema basado en reglas. Las otras tres opciones describen, en este orden, el <b>aprendizaje profundo</b>, el <b>aprendizaje automático clásico</b> y la <b>IA generativa</b>: los otros tres tipos que el programa enumera dentro del espectro de la IA.',
      ref: '1.1.1' },

    { id: '1.1.1b', cap: 1, lo: 'IAGEN-1.1.1', k: 'K1', pts: 1,
      q: 'Un equipo quiere categorizar defectos y predecir problemas del software con un enfoque basado en datos que exige preparación de datos, selección de características y entrenamiento del modelo. ¿A qué tipo de IA corresponde esa descripción?',
      o: [
        'IA simbólica.',
        'Aprendizaje automático clásico.',
        'IA generativa.',
        'Aprendizaje profundo.'
      ], r: 1,
      why: 'El programa asocia explícitamente el <b>aprendizaje automático clásico</b> con la categorización de defectos y la predicción de problemas software, y lo define como un enfoque basado en datos que requiere preparación de datos, selección de características y entrenamiento de modelos. El aprendizaje profundo se distingue precisamente porque aprende las características automáticamente y no obliga al usuario a definirlas.',
      ref: '1.1.1' },

    { id: '1.1.2a', cap: 1, lo: 'IAGEN-1.1.2', k: 'K2', pts: 1,
      q: '¿Qué son las <b>incrustaciones</b> (embeddings) en un modelo de lenguaje grande?',
      o: [
        'El proceso de dividir el texto de entrada en unidades más pequeñas que el modelo procesa individualmente.',
        'Representaciones numéricas de los tóquenes que codifican sus relaciones semánticas, sintácticas y contextuales como vectores en un espacio de alta dimensión.',
        'La cantidad de texto precedente, medida en tóquenes, que el modelo puede tener en cuenta al generar una respuesta.',
        'El conjunto de hiperparámetros que controla la aleatoriedad del modelo durante la inferencia.'
      ], r: 1,
      why: 'Cada tóquen se transforma en un vector en un espacio de alta dimensión; los tóquenes con significados o roles contextuales similares quedan posicionados muy cerca entre sí, y esa proximidad es lo que permite al MLG comprender relaciones entre palabras y conservar el contexto. Las otras opciones definen la <b>toquenización</b>, la <b>ventana de contexto</b> y los <b>hiperparámetros</b>.',
      ref: '1.1.2' },

    { id: '1.1.2b', cap: 1, lo: 'IAGEN-1.1.2', k: 'K2', pts: 1,
      q: 'Un probador va a analizar registros de prueba muy extensos y compara dos modelos idénticos salvo por el tamaño de su ventana de contexto. ¿Qué debe esperar del modelo con la <b>ventana de contexto más grande</b>?',
      o: [
        'Producirá respuestas deterministas, porque una ventana mayor elimina el muestreo probabilístico.',
        'Reducirá el coste de inferencia, porque cuantos más tóquenes hay en contexto menos cálculo necesita el transformador.',
        'Mantendrá mejor la coherencia a lo largo de pasajes largos, pero a costa de mayor complejidad computacional y más tiempo de procesamiento.',
        'Dejará de necesitar toquenización, porque procesa el texto completo como una única unidad.'
      ], r: 2,
      why: 'El programa señala que una ventana de contexto más grande permite mantener la coherencia en pasajes más largos —cita justamente el análisis de registros de prueba grandes—, pero que aumentar el número de tóquenes en la ventana <b>también aumenta la complejidad computacional y el tiempo de procesamiento</b>. El comportamiento no determinista proviene de la naturaleza probabilística de la inferencia y de los hiperparámetros, no del tamaño de la ventana.',
      ref: '1.1.2' },

    { id: '1.1.2c', cap: 1, lo: 'IAGEN-1.1.2', k: 'K2', pts: 1,
      q: 'Un probador envía tres veces la misma instrucción al mismo MLG y obtiene tres casos de prueba distintos. ¿Cuál es la explicación correcta según el programa de estudio?',
      o: [
        'El MLG ha sido reentrenado entre una petición y otra con los datos de las peticiones anteriores.',
        'Los MLG muestran comportamiento no determinista por la naturaleza probabilística de sus mecanismos de inferencia y por la configuración de los hiperparámetros.',
        'La instrucción superó la ventana de contexto y el modelo descartó parte de la entrada.',
        'Se trata siempre de una alucinación, porque un modelo correcto devuelve la misma salida ante la misma entrada.'
      ], r: 1,
      why: 'Durante la inferencia el MLG predice el siguiente tóquen de una secuencia, y esa aleatoriedad inherente puede dar lugar a variaciones en las salidas <b>incluso ante la misma entrada</b>. Es una propiedad del modelo, no un defecto ni una alucinación: el programa recuerda además que lo plausible no es necesariamente correcto.',
      ref: '1.1.2' },

    { id: '1.1.3a', cap: 1, lo: 'IAGEN-1.1.3', k: 'K2', pts: 1,
      q: '¿Qué distingue a un <b>MLG de razonamiento</b> de un MLG ajustado por instrucciones?',
      o: [
        'Se entrena desde cero con conjuntos de datos amplios y diversos, sin ninguna etapa previa.',
        'Es el único de los tres tipos capaz de procesar entradas de imagen además de texto.',
        'Amplía al modelo ajustado por instrucciones enfatizando capacidades cognitivas estructuradas: inferencia lógica, resolución de problemas en varios pasos y razonamiento en cadena.',
        'No necesita instrucciones estructuradas, porque deduce por sí solo el rol y el formato de salida esperados.'
      ], r: 2,
      why: 'Los modelos de razonamiento parten de los ajustados por instrucciones y se entrenan además en tareas que exigen comprensión contextual, pasos de razonamiento intermedios y síntesis de información compleja, lo que los hace más adecuados para tareas de alta carga cognitiva. Entrenarse con conjuntos amplios y diversos describe a los modelos <b>fundacionales</b>; la multimodalidad es una característica aparte (1.1.4); y ningún tipo de modelo exime de escribir instrucciones bien estructuradas.',
      ref: '1.1.3' },

    { id: '1.1.3b', cap: 1, lo: 'IAGEN-1.1.3', k: 'K2', pts: 1,
      q: '¿Cómo se obtiene un <b>MLG ajustado por instrucciones</b> y para qué sirve ese ajuste?',
      o: [
        'Se obtiene a partir de un modelo fundacional, ajustándolo con conjuntos de datos que emparejan instrucciones con respuestas esperadas, para alinearlo mejor con las instrucciones humanas.',
        'Se obtiene entrenando el modelo únicamente con código fuente, para que pueda generar guiones de prueba automatizados.',
        'Se obtiene aplicando generación aumentada por recuperación sobre un modelo fundacional, para darle acceso a datos de la organización.',
        'Se obtiene reduciendo el número de parámetros de un modelo fundacional, para que consuma menos recursos.'
      ], r: 0,
      why: 'El ajuste por instrucciones parte de los modelos fundacionales y usa conjuntos de datos que emparejan instrucciones con respuestas esperadas; el proceso optimiza el cumplimiento de tareas, el seguimiento de instrucciones y la coherencia de las respuestas. La generación aumentada por recuperación (4.1.2) y la reducción de parámetros (los MLP, 1.1.2) son cosas distintas.',
      ref: '1.1.3' },

    { id: '1.1.4a', cap: 1, lo: 'IAGEN-1.1.4', k: 'K2', pts: 1,
      q: 'En un MLG multimodal, ¿cómo se tratan las imágenes antes de que el modelo transformador las procese?',
      o: [
        'Se envían sin procesar al transformador, que trata cada píxel como un tóquen independiente.',
        'Se convierten en incrustaciones utilizando modelos de visión y lenguaje.',
        'Se transcriben a una descripción textual con un toquenizador de subpalabras y luego se procesan como texto plano.',
        'Se almacenan en una base de datos vectorial y solo se recuperan si la instrucción de sistema lo autoriza.'
      ], r: 1,
      why: 'Para tratar diversas modalidades la toquenización se adapta a cada tipo de dato: el programa dice expresamente que las imágenes <b>se convierten en incrustaciones utilizando modelos de visión y lenguaje</b> antes de ser procesadas en el modelo transformador.',
      ref: '1.1.4' },

    { id: '1.1.4b', cap: 1, lo: 'IAGEN-1.1.4', k: 'K2', pts: 1,
      q: '¿Qué oportunidad concreta ofrecen a la prueba de software los MLG aumentados con modelos de visión y lenguaje?',
      o: [
        'Ejecutar automáticamente los guiones de prueba de interfaz gráfica sin necesidad de un marco de automatización.',
        'Garantizar que las capturas de pantalla generadas no contengan datos personales.',
        'Identificar discrepancias entre los resultados esperados y los elementos visuales reales de una captura de pantalla, y generar casos de prueba que combinan datos textuales y señales visuales.',
        'Sustituir la ventana de contexto por un almacenamiento visual ilimitado.'
      ], r: 2,
      why: 'Estos modelos pueden analizar capturas de pantalla y esquemas de interfaz gráfica junto con descripciones textuales asociadas —informes de defecto, historias de usuario—, lo que permite detectar discrepancias entre lo esperado y lo que realmente se ve, y generar casos de prueba más ricos que aumentan la cobertura. Nada de eso implica ejecutar pruebas ni anonimizar datos.',
      ref: '1.1.4' },

    { id: '1.2.1a', cap: 1, lo: 'IAGEN-1.2.1', k: 'K2', pts: 1,
      q: 'Un MLG ayuda al equipo a generar los <b>resultados esperados</b> de un conjunto de casos de prueba. ¿A cuál de las capacidades clave de los MLG para tareas de prueba corresponde?',
      o: [
        'Generación de datos de prueba.',
        'Análisis de resultados de la prueba.',
        'Generación de oráculos de prueba.',
        'Creación de productos de prueba.'
      ], r: 2,
      why: 'El programa define la <b>generación de oráculos de prueba</b> como la capacidad de los MLG de ayudar a generar los resultados esperados. La generación de datos de prueba produce conjuntos de datos, valores límite y combinaciones; el análisis de resultados crea resúmenes y clasifica anomalías por severidad y prioridad; y la creación de productos de prueba cubre planes de prueba, informes de prueba e informes de defecto.',
      ref: '1.2.1' },

    { id: '1.2.1b', cap: 1, lo: 'IAGEN-1.2.1', k: 'K2', pts: 1,
      q: 'El equipo pasa las historias de usuario por un MLG y este señala ambigüedades e inconsistencias, y propone preguntas para llevar a la reunión con los implicados. ¿Qué capacidad clave se está usando?',
      o: [
        'Análisis y mejora de requisitos.',
        'Soporte para la automatización de la prueba.',
        'Apoyo a la creación de casos de prueba.',
        'Generación de datos de prueba.'
      ], r: 0,
      why: 'El programa describe el <b>análisis y mejora de requisitos</b> como la capacidad de analizar requisitos y otros elementos de la base de prueba identificando ambigüedades, inconsistencias o información faltante, y de generar preguntas significativas para aclararlos durante las discusiones con los implicados. Las otras opciones se ocupan de guiones, de casos de prueba y de datos, no de la calidad de la base de prueba.',
      ref: '1.2.1' },

    { id: '1.2.2a', cap: 1, lo: 'IAGEN-1.2.2', k: 'K2', pts: 1,
      q: '¿Qué caracteriza a las <b>aplicaciones de prueba basadas en MLG</b> frente a los chatbot con IA?',
      o: [
        'Sustituyen la necesidad de ingeniería de instrucciones, porque la instrucción la genera la propia herramienta.',
        'Solo pueden emplearse para pruebas exploratorias y para la incorporación de nuevos probadores.',
        'Eliminan el comportamiento no determinista del MLG al ejecutarse dentro del marco de automatización.',
        'Integran las capacidades del MLG a través de interfaces de programación de aplicación (IPA) para realizar tareas de prueba bien definidas y a menudo automatizadas, con mayor personalización y escalabilidad.'
      ], r: 3,
      why: 'Las aplicaciones basadas en MLG integran el modelo por IPA para tareas bien definidas y automatizadas, y ofrecen más personalización y escalabilidad. El programa insiste en que, se interactúe como se interactúe, una implementación satisfactoria <b>requiere una sólida ingeniería de instrucciones</b>. La prueba exploratoria y la incorporación de nuevos probadores son escenarios propios del chatbot.',
      ref: '1.2.2' },

    { id: '1.2.2b', cap: 1, lo: 'IAGEN-1.2.2', k: 'K2', pts: 1,
      q: 'Una probadora necesita aclarar rápidamente conceptos de prueba y explorar de forma dinámica requisitos y posibles casos de prueba, refinando las respuestas de forma iterativa. ¿Qué modelo de interacción con IAGen encaja mejor y por qué?',
      o: [
        'Un chatbot con IA, porque su interfaz de conversación permite retroalimentación rápida y refinar los resultados con encadenamiento de instrucciones.',
        'Una aplicación basada en MLG integrada por IPA, porque las tareas exploratorias exigen guiones automatizados.',
        'Un agente autónomo, porque las tareas exploratorias no admiten intervención humana.',
        'Un modelo fundacional sin ajuste, porque no está sesgado hacia ninguna tarea concreta.'
      ], r: 0,
      why: 'El programa sitúa a los <b>chatbot con IA</b> como especialmente efectivos para tareas rutinarias, prueba exploratoria e incorporación de nuevos probadores, con retroalimentación inmediata y refinamiento iterativo mediante encadenamiento de instrucciones; su interfaz intuitiva los hace además accesibles a implicados sin conocimientos técnicos. Las aplicaciones por IPA brillan en tareas repetitivas bien definidas, no en la exploración.',
      ref: '1.2.2' },

  /* ══════════════════════════════════════════════════════════════════════
     CAPÍTULO 2 — Ingeniería de instrucciones (11 preguntas, 16 puntos)
     ══════════════════════════════════════════════════════════════════════ */

    { id: '2.1.1a', cap: 2, lo: 'IAGEN-2.1.1', k: 'K2', pts: 1,
      q: 'En una instrucción estructurada para prueba de software se lee: <i>«Devuelve el resultado como una tabla con las columnas ID, precondición, pasos y resultado esperado»</i>. ¿A qué componente de la instrucción corresponde?',
      o: [
        'Restricciones.',
        'Formato de salida.',
        'Instrucciones.',
        'Contexto.'
      ], r: 1,
      why: 'El <b>formato de salida</b> indica el formato, la estructura o las características esperadas de la respuesta. Las <b>restricciones</b> describen limitaciones o consideraciones especiales que el MLG debe respetar; las <b>instrucciones</b> son las directivas sobre la tarea a realizar; y el <b>contexto</b> aporta los antecedentes sobre el objeto de prueba.',
      ref: '2.1.1' },

    { id: '2.1.1b', cap: 2, lo: 'IAGEN-2.1.1', k: 'K2', pts: 1,
      q: '¿Cuáles son los <b>seis componentes</b> que suele incluir una instrucción estructurada para la prueba de software?',
      o: [
        'Rol, contexto, instrucciones, datos de entrada, restricciones y formato de salida.',
        'Rol, temperatura, semilla, contexto, ejemplos y formato de salida.',
        'Objetivo, riesgo, criterios de aceptación, datos de prueba, oráculo y cobertura.',
        'Instrucción de sistema, instrucción de usuario, ejemplos, cadena, metainstrucción y verificación.'
      ], r: 0,
      why: 'El programa enumera exactamente esos seis: <b>rol</b> (la perspectiva que adopta el modelo), <b>contexto</b> (los antecedentes), <b>instrucciones</b> (la tarea), <b>datos de entrada</b> (historias, criterios, capturas, código), <b>restricciones</b> (limitaciones a respetar) y <b>formato de salida</b>. Temperatura y semilla son hiperparámetros (3.1.4); las técnicas de formulación son otra cosa (2.1.2).',
      ref: '2.1.1' },

    { id: '2.1.1c', cap: 2, lo: 'IAGEN-2.1.1', k: 'K2', pts: 1,
      q: 'Una instrucción empieza así: <i>«Actúa como ingeniero de automatización de pruebas con experiencia en marcos basados en palabras clave»</i>. ¿Qué componente es y para qué sirve?',
      o: [
        'Es el contexto: aporta los antecedentes del objeto de prueba.',
        'Son los datos de entrada: describe el material sobre el que hay que trabajar.',
        'Es el rol: define la perspectiva o personalidad que adopta el modelo, ayudándole a determinar sus responsabilidades y un tono o enfoque adecuados.',
        'Es una restricción: limita el tipo de respuesta que puede dar el modelo.'
      ], r: 2,
      why: 'El <b>rol</b> define la perspectiva o personalidad que debe adoptar el modelo al generar la respuesta; especificarlo le ayuda a determinar sus responsabilidades y a adoptar un tono o enfoque adecuado, como actuar de probador, jefe de prueba o ingeniero de automatización de la prueba. El contexto y los datos de entrada aportan información sobre el objeto de prueba, no sobre quién responde.',
      ref: '2.1.1' },

    { id: '2.1.2a', cap: 2, lo: 'IAGEN-2.1.2', k: 'K2', pts: 1,
      q: '¿En qué consiste la <b>metainstrucción</b>?',
      o: [
        'En dividir una tarea en pasos intermedios y comprobar el resultado de cada uno antes de continuar.',
        'En incluir en la instrucción varios ejemplos de entrada y salida deseada.',
        'En fijar de antemano el comportamiento del modelo para toda la sesión de conversación.',
        'En aprovechar la capacidad de la IA para generar o perfeccionar sus propias instrucciones, en un ciclo iterativo en el que el probador evalúa y refina lo generado.'
      ], r: 3,
      why: 'La metainstrucción usa al propio MLG para generar o mejorar instrucciones, que después el probador evalúa y perfecciona; es útil cuando la eficiencia importa o cuando el probador no está seguro de cómo redactar una instrucción eficaz, y refleja un modo de <i>trabajo en pareja</i> con la herramienta. Las otras opciones describen el <b>encadenamiento de instrucciones</b>, la <b>formulación con pocos ejemplos</b> y la <b>instrucción de sistema</b>.',
      ref: '2.1.2' },

    { id: '2.1.2b', cap: 2, lo: 'IAGEN-2.1.2', k: 'K2', pts: 1,
      q: '¿Cuál es la diferencia entre formulación de instrucciones <b>sin ejemplos</b>, <b>con un ejemplo</b> y <b>con pocos ejemplos</b>?',
      o: [
        'Sin ejemplos se apoya en el conocimiento preexistente del modelo; con un ejemplo se aporta un caso que demuestra la salida deseada; con pocos ejemplos se aportan varios para consolidar el comportamiento de respuesta.',
        'Se refieren al número de veces que se repite la misma instrucción para promediar las salidas.',
        'Se refieren a cuántos modelos distintos se consultan antes de aceptar un resultado.',
        'Se refieren al número de pasos intermedios en que se divide una tarea compleja.'
      ], r: 0,
      why: 'Es la definición literal del programa: la formulación <b>sin ejemplos</b> se basa en el conocimiento preexistente del modelo, la de <b>un ejemplo</b> aporta un caso que demuestra el resultado deseado para una entrada dada, y la de <b>pocos ejemplos</b> contiene más de uno para consolidar aún más el comportamiento deseado. Dividir en pasos intermedios es el encadenamiento de instrucciones, y comparar varios modelos es una técnica de mitigación (3.1.3).',
      ref: '2.1.2' },

    { id: '2.1.3a', cap: 2, lo: 'IAGEN-2.1.3', k: 'K2', pts: 1,
      q: '¿Cuál de estas afirmaciones sobre la <b>instrucción de sistema</b> es correcta?',
      o: [
        'Cambia con cada interacción y forma el contexto inmediato de cada respuesta.',
        'Permanece constante durante toda la sesión, define comportamiento, personalidad y parámetros operativos del MLG, y en la mayoría de las interfaces no es visible ni editable por el usuario del chatbot.',
        'Debe contener siempre los datos de entrada de la tarea, para que el modelo no los olvide.',
        'La define el usuario final del chatbot al principio de cada pregunta.'
      ], r: 1,
      why: 'La instrucción de sistema la define normalmente el desarrollador o el probador para guiar el comportamiento general del MLG, establece las reglas de toda la conversación y permanece constante durante la sesión; puede contener partes de una instrucción estructurada como el rol, el contexto y las restricciones. Lo que cambia en cada interacción, y es visible, es la <b>instrucción de usuario</b>.',
      ref: '2.1.3' },

    { id: '2.1.3b', cap: 2, lo: 'IAGEN-2.1.3', k: 'K2', pts: 1,
      q: 'Un equipo quiere que su asistente responda siempre con lenguaje formal, de forma concisa y alineado con las prácticas ISTQB, en todas las conversaciones de sus probadores. ¿Dónde debe fijarse esa configuración y por qué?',
      o: [
        'En la instrucción de usuario, repitiéndola al inicio de cada pregunta para que no se pierda.',
        'En los datos de entrada, junto con las historias de usuario.',
        'En la instrucción de sistema, porque establece las reglas para toda la conversación y permanece constante durante la sesión.',
        'En el formato de salida de cada instrucción, porque afecta a la presentación de la respuesta.'
      ], r: 2,
      why: 'El uso típico es <b>configurar la instrucción de sistema una vez al inicio</b> y enviar después sucesivas instrucciones de usuario; el MLG genera cada respuesta teniendo en cuenta las dos. El programa usa como ejemplo casi literal el de un asistente profesional de pruebas que responde con claridad, lenguaje formal y foco en prácticas alineadas con ISTQB.',
      ref: '2.1.3' },

    { id: '2.2.1a', cap: 2, lo: 'IAGEN-2.2.1', k: 'K3', pts: 2,
      q: 'Faltan dos semanas para la entrega y hay 60 historias de usuario por probar. El equipo dispone de datos históricos de defectos, sabe que el módulo de pagos está sujeto a cumplimiento normativo y necesita decidir dónde concentrar el esfuerzo. ¿Qué tarea de <b>análisis de prueba</b> con IAGen aplica a esta situación?',
      o: [
        'Generar condiciones de prueba a partir de la base de prueba mediante procesamiento del lenguaje natural.',
        'Priorizar las condiciones de prueba en función del nivel de riesgo, considerando cumplimiento normativo, funciones orientadas al usuario y datos históricos de defectos.',
        'Identificar posibles defectos en la base de prueba buscando ambigüedades e inconsistencias.',
        'Realizar un análisis de cobertura asignando requisitos e historias de usuario a las condiciones de prueba.'
      ], r: 1,
      why: 'El problema es <b>dónde concentrar el esfuerzo</b>, es decir priorizar. El programa describe esta tarea así: con información sobre probabilidad e impacto del riesgo de fallo, y teniendo en cuenta aspectos como el cumplimiento normativo, las características orientadas al usuario (login, procesamiento de pagos) y los datos históricos de defectos, el MLG puede recomendar niveles de prioridad. Las otras tres son tareas reales de análisis de prueba, pero responden a preguntas distintas: qué probar, qué está mal escrito y qué ha quedado sin cubrir.',
      ref: '2.2.1' },

    { id: '2.2.1b', cap: 2, lo: 'IAGEN-2.2.1', k: 'K3', pts: 2,
      q: 'Tras cerrar el diseño de pruebas, la jefa de proyecto teme que algún requisito haya quedado sin probar en un producto con requisitos complejos. ¿Cómo puede ayudar la IAGen en el análisis de prueba?',
      o: [
        'Sugiriendo técnicas de prueba adecuadas, como análisis de valores límite o partición por equivalencia.',
        'Generando datos de prueba sintéticos que cubran situaciones extremas.',
        'Reduciendo la temperatura del modelo para que las respuestas sean reproducibles.',
        'Realizando un análisis de cobertura: asignando los requisitos y las historias de usuario a las condiciones de prueba para determinar si se cubren todos los aspectos de la base de prueba.'
      ], r: 3,
      why: 'El <b>soporte al análisis de cobertura</b> es exactamente eso: mapear requisitos e historias contra condiciones de prueba para detectar lagunas, algo que el programa señala como especialmente útil en proyectos con requisitos complejos donde los huecos de cobertura acaban en defectos no detectados. Sugerir técnicas y generar datos son tareas distintas, y la temperatura pertenece a la mitigación del no determinismo (3.1.4).',
      ref: '2.2.1' },

    { id: '2.2.2a', cap: 2, lo: 'IAGEN-2.2.2', k: 'K3', pts: 2,
      q: 'El equipo necesita datos que se parezcan a los de producción para probar un módulo de facturación, pero la base real contiene información personal de clientes y no puede salir del entorno productivo. ¿Qué tarea de diseño e implementación de prueba con IAGen resuelve el problema?',
      o: [
        'Síntesis de datos de prueba: generar datos sintéticos representativos que preservan la privacidad, se asemejan a los de producción y cubren situaciones extremas.',
        'Generación de guiones de prueba automatizados a partir de los casos de prueba estructurados.',
        'Programación y priorización de la ejecución de la prueba según prioridad, riesgos y recursos.',
        'Generación de casos de prueba a partir de requisitos funcionales y no funcionales.'
      ], r: 0,
      why: 'La <b>síntesis de datos de prueba</b> está definida en el programa como la creación de datos sintéticos representativos que preservan la privacidad de los datos y se asemejan a los de producción, simulando escenarios realistas <b>sin exponer información confidencial</b>. Las otras tres opciones son tareas legítimas del mismo apartado, pero ninguna aborda el problema de la información personal.',
      ref: '2.2.2' },

    { id: '2.2.2b', cap: 2, lo: 'IAGEN-2.2.2', k: 'K3', pts: 2,
      q: 'Un equipo tiene casos de prueba manuales bien estructurados y quiere convertirlos en guiones ejecutables para su marco de automatización, y poder ampliarlos cuando cambien los requisitos. ¿Qué puede hacer la IAGen?',
      o: [
        'Ejecutar los casos de prueba y decidir por sí sola si el resultado es correcto, sin oráculo.',
        'Interpretar los pasos de la prueba y traducirlos a código compatible con diversos marcos de automatización, pudiendo actualizar o ampliar esos guiones según los nuevos requisitos.',
        'Sustituir el marco de automatización de pruebas por una conversación con un chatbot.',
        'Garantizar que los guiones generados no contengan defectos, al derivarse de casos de prueba ya revisados.'
      ], r: 1,
      why: 'El programa dice que IAGen puede generar procedimientos manuales y guiones automatizados <b>a partir de casos de prueba estructurados</b>, interpretando los pasos y traduciéndolos a código compatible con distintos marcos, y que esos guiones pueden actualizarse o ampliarse con nuevos requisitos. Lo que no hace es garantizar la corrección: el capítulo 3 recuerda que la salida generada debe verificarse según el riesgo asociado.',
      ref: '2.2.2' },

    { id: '2.2.3a', cap: 2, lo: 'IAGEN-2.2.3', k: 'K3', pts: 2,
      q: 'La suite de regresión de interfaz gráfica falla cada sprint porque los localizadores cambian y las interacciones se modifican, aunque la funcionalidad sigue correcta. ¿Qué aplicación de IAGen ataca directamente ese problema?',
      o: [
        'Análisis de impacto y optimización de la prueba sobre los cambios de código.',
        'Suministro de información de prueba automatizado con paneles de control y perspectivas predictivas.',
        'Pruebas autorreparables y adaptativas: ajustar automáticamente los guiones para gestionar cambios menores de la interfaz de usuario o de la IPA.',
        'Mejora de los informes de defecto con registros, capturas y datos del entorno de prueba.'
      ], r: 2,
      why: 'El síntoma —fallos provocados por cambios menores de interfaz, no por defectos— es justo lo que las <b>pruebas autorreparables y adaptativas</b> resuelven: IAGen ajusta los guiones para manejar cambios como localizadores dinámicos e interacciones modificadas, evitando fallos innecesarios y manteniendo estables los conjuntos de prueba. El análisis de impacto sirve para decidir <i>qué</i> reprobar tras un cambio de código, que es otra pregunta.',
      ref: '2.2.3' },

    { id: '2.2.3b', cap: 2, lo: 'IAGEN-2.2.3', k: 'K3', pts: 2,
      q: 'Un cambio importante entra en la rama principal y la suite de regresión completa tarda ocho horas, tiempo que la ventana de integración continua no permite. ¿Qué uso de IAGen es el adecuado?',
      o: [
        'Análisis de impacto y optimización de la prueba: analizar los cambios de código para identificar las áreas de alto riesgo y dirigir allí la regresión.',
        'Implementar los guiones con automatización basada en palabras clave.',
        'Generar informes de prueba detallados con métricas de éxito y fallo.',
        'Recopilar automáticamente informes de defecto completos con registros y capturas.'
      ], r: 0,
      why: 'El programa describe el <b>análisis de impacto y optimización de la prueba</b> como el uso de IAGen para analizar los cambios en el código e identificar áreas de alto riesgo, permitiendo una regresión dirigida donde más se necesita: exactamente el problema de una ventana de ejecución que no da para la suite completa. Las otras opciones son actividades reales del mismo apartado, pero no reducen el alcance de la ejecución.',
      ref: '2.2.3' },

    { id: '2.2.4a', cap: 2, lo: 'IAGEN-2.2.4', k: 'K3', pts: 2,
      q: 'La dirección, que no es técnica, pide visibilidad semanal del avance de la prueba sin tener que leer los informes de la herramienta de gestión. ¿Qué tarea de monitorización con IAGen encaja?',
      o: [
        'Control de la prueba: reordenar prioridades, ajustar calendarios y reasignar recursos.',
        'Mejora de la visualización de métricas y del suministro de información: cuadros de mando dinámicos y resúmenes en lenguaje natural para que todos los implicados accedan a las métricas relevantes.',
        'Perspectivas sobre la compleción de la prueba, destacando éxitos y lecciones aprendidas.',
        'Generación de casos de prueba a partir de las historias de usuario pendientes.'
      ], r: 1,
      why: 'El programa asocia los <b>cuadros de mando dinámicos y los resúmenes en lenguaje natural</b> precisamente con asegurar que todas las partes interesadas tengan acceso a las métricas relevantes y una visión clara del avance. El control de la prueba actúa sobre el plan (prioridades, calendarios, recursos) y las perspectivas de compleción se generan al cerrar, no semanalmente para dirección.',
      ref: '2.2.4' },

    { id: '2.2.4b', cap: 2, lo: 'IAGEN-2.2.4', k: 'K3', pts: 2,
      q: 'A mitad de iteración, el análisis de tendencias detecta que la densidad de defectos de un módulo se dispara y que el avance va por debajo del plan. El equipo debe reaccionar. ¿Qué tarea de IAGen corresponde a esa reacción?',
      o: [
        'Monitorización de la prueba y análisis de métricas.',
        'Suministro de información de prueba automatizado y perspectivas predictivas.',
        'Control de la prueba: aportar información para reordenar las prioridades de prueba, ajustar los calendarios y reasignar los recursos.',
        'Análisis de impacto sobre los cambios recientes de código.'
      ], r: 2,
      why: 'Detectar la desviación es <b>monitorización</b>; actuar sobre ella es <b>control de la prueba</b>, que el programa define como la asistencia de IAGen para reordenar prioridades, ajustar calendarios y reasignar recursos de modo que la prueba siga centrada en las áreas de alta prioridad. La pregunta describe explícitamente el momento de reaccionar, no el de observar.',
      ref: '2.2.4' },

    { id: '2.2.5a', cap: 2, lo: 'IAGEN-2.2.5', k: 'K3', pts: 2,
      q: 'Un equipo genera cada sprint decenas de escenarios en formato Gherkin y necesita que todos salgan con exactamente la misma estructura «dado-cuando-entonces». ¿Qué técnica de formulación de instrucciones es la más adecuada?',
      o: [
        'Encadenamiento de instrucciones, porque cada escenario debe verificarse antes del siguiente.',
        'Formulación de instrucciones con pocos ejemplos, porque la tarea es repetitiva y tiene un formato de salida específico y restringido.',
        'Metainstrucción, porque el modelo debe decidir el formato más adecuado.',
        'Formulación sin ejemplos, porque el modelo ya conoce la sintaxis Gherkin.'
      ], r: 1,
      why: 'La tabla de selección del programa asigna la <b>formulación con pocos ejemplos</b> a las tareas repetitivas o con formatos de salida específicos o restringidos, y cita expresamente los casos de prueba en formato Gherkin, la prueba guiada por palabras clave y los informes con formato fijo. El encadenamiento se reserva a tareas complejas con verificación humana por paso, y la metainstrucción a tareas flexibles o nuevas.',
      ref: '2.2.5' },

    { id: '2.2.5b', cap: 2, lo: 'IAGEN-2.2.5', k: 'K3', pts: 2,
      q: 'Hay que analizar una historia de usuario compleja: primero detectar ambigüedades, luego evaluar la capacidad de prueba y por último la integridad de los criterios de aceptación, revisando el resultado en cada etapa antes de seguir. ¿Qué técnica corresponde?',
      o: [
        'Formulación de instrucciones con pocos ejemplos.',
        'Formulación de instrucciones sin ejemplos.',
        'Encadenamiento de instrucciones.',
        'Metainstrucción.'
      ], r: 2,
      why: 'El <b>encadenamiento de instrucciones</b> divide la tarea en pasos intermedios cuyo resultado se comprueba y perfecciona antes de pasar al siguiente, de modo que cada respuesta informa a la instrucción siguiente. El programa lo recomienda para tareas complejas que requieren precisión con verificación humana en cada paso, y usa este mismo ejercicio —ambigüedades, capacidad de prueba, integridad— como ejemplo.',
      ref: '2.2.5 · 2.1.2' },

    { id: '2.2.5c', cap: 2, lo: 'IAGEN-2.2.5', k: 'K3', pts: 2,
      q: 'Una probadora se enfrenta a una tarea nueva —detección de anomalías en informes de prueba— y no sabe cómo redactar una instrucción eficaz. ¿Qué técnica le recomienda el programa, y puede combinarse con otras?',
      o: [
        'Metainstrucción, y sí: puede usarse para crear una instrucción inicial que después se enriquezca con ejemplos y se divida en subtareas para validar los pasos intermedios.',
        'Formulación con pocos ejemplos, y no: combinar técnicas confunde al modelo.',
        'Encadenamiento de instrucciones, y no: cada técnica debe usarse por separado.',
        'Formulación sin ejemplos, y sí: siempre debe empezarse sin ejemplos para no sesgar al modelo.'
      ], r: 0,
      why: 'La <b>metainstrucción</b> es la recomendada para tareas flexibles y dinámicas y para crear instrucciones de tareas nuevas —el programa cita el análisis de informes de prueba y la detección de anomalías—. Además dice explícitamente que <b>es posible utilizar múltiples técnicas para un solo caso de uso</b>: metainstrucción para la instrucción inicial, pocos ejemplos para afinar el patrón y encadenamiento para validar los pasos intermedios.',
      ref: '2.2.5' },

    { id: '2.3.1a', cap: 2, lo: 'IAGEN-2.3.1', k: 'K2', pts: 1,
      q: 'Se quiere medir <b>en qué grado los casos de prueba generados cubren la partición de equivalencia válida e inválida</b> de una clase de datos. ¿Qué métrica de evaluación de resultados de IAGen es?',
      o: [
        'Precisión.',
        'Exactitud.',
        'Recuperación.',
        'Diversidad.'
      ], r: 2,
      why: 'La <b>recuperación</b> mide la capacidad del modelo de identificar todas las instancias relevantes dentro de un conjunto de datos, y el programa usa como ejemplo exactamente la cobertura de las particiones de equivalencia válida e inválida. La <b>exactitud</b> mide la corrección general frente a un estándar; la <b>precisión</b>, la corrección respecto a un objetivo concreto; y la <b>diversidad</b>, que se cubra una amplia gama de entradas y escenarios sin repetición.',
      ref: '2.3.1' },

    { id: '2.3.1b', cap: 2, lo: 'IAGEN-2.3.1', k: 'K2', pts: 1,
      q: 'Un equipo mide qué proporción de los guiones de prueba generados se ejecutan sin errores de sintaxis ni problemas de formato en un entorno que funciona correctamente. Además, ¿qué precaución exige el programa al usar métricas con IAGen?',
      o: [
        'Es el índice de éxito de ejecución, y dada la naturaleza no determinista de IAGen las métricas deben basarse en datos estadísticamente relevantes.',
        'Es la eficiencia temporal, y basta con una única medición porque el modelo es determinista.',
        'Es la precisión, y solo puede calcularse mediante revisión manual.',
        'Es la relevancia contextual, y debe medirse siempre con un segundo MLG como juez.'
      ], r: 0,
      why: 'El <b>índice de éxito de ejecución</b> mide la proporción de casos o guiones generados que pueden ejecutarse con éxito. Y el programa advierte de forma expresa que, dada la naturaleza no determinista de IAGen, <b>las métricas deben basarse en datos estadísticamente relevantes</b>; la evaluación puede hacerse por revisión manual o automatizarse comparando con una referencia predefinida.',
      ref: '2.3.1' },

    { id: '2.3.2a', cap: 2, lo: 'IAGEN-2.3.2', k: 'K2', pts: 1,
      q: 'Un equipo crea tres redacciones distintas de la misma instrucción y compara cuál produce mejores resultados según métricas definidas de antemano. ¿Qué técnica de perfeccionamiento de instrucciones está aplicando?',
      o: [
        'Modificación iterativa de instrucciones.',
        'Pruebas A/B de instrucciones.',
        'Análisis de resultados.',
        'Integración de retroalimentación de los usuarios.'
      ], r: 1,
      why: 'Las <b>pruebas A/B de instrucciones</b> consisten en crear varias versiones y evaluar cuál produce mejores resultados según métricas predefinidas, para determinar qué redacción o estructura da resultados más precisos y relevantes. La modificación iterativa parte de una instrucción básica y la va ajustando; el análisis de resultados examina las salidas en busca de imprecisiones; y la retroalimentación recoge la opinión de los probadores.',
      ref: '2.3.2' },

    { id: '2.3.2b', cap: 2, lo: 'IAGEN-2.3.2', k: 'K2', pts: 1,
      q: 'Sobre el ajuste de la longitud y la especificidad de las instrucciones, ¿qué afirma el programa de estudio?',
      o: [
        'Cuanto más larga y detallada sea la instrucción, mejor será siempre la respuesta.',
        'La longitud es irrelevante mientras la instrucción incluya los seis componentes.',
        'Conviene experimentar: a veces añadir más contexto mejora la calidad de la respuesta y en otros casos las instrucciones más breves dan lugar a una mejor generalización.',
        'Las instrucciones deben ser lo más cortas posible para no agotar la ventana de contexto.'
      ], r: 2,
      why: 'El programa presenta el ajuste de longitud y especificidad como una técnica de <b>experimentación</b>, no como una regla fija: a veces más contexto mejora la respuesta, en otros casos instrucciones más breves generalizan mejor. Junto a ella recomienda compartir prácticas y librerías de instrucciones en el equipo para estandarizar y mantener la calidad.',
      ref: '2.3.2' },

  /* ══════════════════════════════════════════════════════════════════════
     CAPÍTULO 3 — Gestión de riesgos (10 preguntas, 11 puntos)
     ══════════════════════════════════════════════════════════════════════ */

    { id: '3.1.1a', cap: 3, lo: 'IAGEN-3.1.1', k: 'K1', pts: 1,
      q: '¿Cuál es la definición de <b>error de razonamiento</b> en un MLG?',
      o: [
        'Un resultado que parece incorrecto desde el punto de vista factual o irrelevante para la tarea encomendada.',
        'Una variación en la salida ante la misma entrada, provocada por el muestreo probabilístico.',
        'Una preferencia por ciertos tipos de información o suposiciones heredada de los datos de entrenamiento.',
        'La interpretación errónea de estructuras lógicas —causa y efecto, lógica condicional, resolución paso a paso— que lleva a conclusiones incorrectas.'
      ], r: 3,
      why: 'Los errores de razonamiento se producen cuando el MLG interpreta mal estructuras lógicas y llega a conclusiones incorrectas; a diferencia de las personas, los MLG carecen de verdadero razonamiento lógico y se apoyan en la comparación de patrones. Las otras opciones definen la <b>alucinación</b>, el <b>comportamiento no determinista</b> y el <b>sesgo</b>.',
      ref: '3.1.1' },

    { id: '3.1.1b', cap: 3, lo: 'IAGEN-3.1.1', k: 'K1', pts: 1,
      q: 'Según el programa de estudio, ¿de dónde provienen los <b>sesgos</b> de un MLG y cómo se manifiestan en la prueba de software?',
      o: [
        'Provienen de los datos con los que se entrenó el modelo, y pueden influir en las respuestas al generar datos de prueba o refinar criterios de aceptación.',
        'Provienen de una temperatura mal configurada, y se manifiestan como variaciones entre ejecuciones.',
        'Provienen de instrucciones demasiado cortas, y desaparecen al añadir el formato de salida.',
        'Provienen de la ventana de contexto, y se manifiestan cuando la entrada supera su límite.'
      ], r: 0,
      why: 'El programa dice que los sesgos <b>provienen de los datos con los que se entrenó el modelo</b> y pueden dar lugar a resultados que favorecen ciertos tipos de información, enfoques o suposiciones —por ejemplo, modelos entrenados sobre todo con datos en inglés que subrepresentan perspectivas no anglosajonas—. En prueba influyen al generar datos de prueba o al refinar criterios de aceptación.',
      ref: '3.1.1' },

    { id: '3.1.2a', cap: 3, lo: 'IAGEN-3.1.2', k: 'K3', pts: 2,
      q: 'Un MLG devuelve una lista de casos de prueba para una historia de usuario. Al revisarla, la probadora ve que tres de ellos verifican un criterio de aceptación que no aparece en ninguna parte de la historia ni de la documentación. ¿Qué problema ha identificado y cómo lo confirma?',
      o: [
        'Un sesgo; se confirma revisando si las pruebas no funcionales están infrarrepresentadas.',
        'Un error de razonamiento; se confirma con validación lógica del flujo del texto generado.',
        'Comportamiento no determinista; se confirma repitiendo la instrucción y comparando salidas.',
        'Una alucinación; se confirma comparando la salida con la documentación, los requisitos y el comportamiento conocido del sistema.'
      ], r: 3,
      why: 'Sugerir casos de prueba que verifican <b>criterios de aceptación inexistentes</b> es uno de los ejemplos literales de alucinación que da el programa. El método de detección que le corresponde es comparar los resultados generados con la documentación existente, los requisitos y el comportamiento conocido del sistema, apoyándose además en expertos del dominio y en comprobaciones de consistencia.',
      ref: '3.1.2 · 3.1.1' },

    { id: '3.1.2b', cap: 3, lo: 'IAGEN-3.1.2', k: 'K3', pts: 2,
      q: 'Se pide a un MLG que priorice un conjunto de pruebas teniendo en cuenta dependencias entre casos y estimaciones de esfuerzo. La lista devuelta coloca un caso antes que otro del que depende, y los totales de esfuerzo no cuadran. ¿Qué problema es y qué técnica de detección aplica?',
      o: [
        'Una alucinación; se detecta consultando a expertos del dominio.',
        'Un error de razonamiento; se detecta con validación lógica del contenido generado y probando la salida contra el resultado exacto que debería obtenerse.',
        'Un sesgo de los datos de entrenamiento; se detecta revisando la representatividad de los datos de prueba sintéticos.',
        'Una vulnerabilidad de seguridad; se detecta con una auditoría de seguridad.'
      ], r: 1,
      why: 'La planificación de la prueba y la priorización de casos son los ejemplos que el programa da de tareas que exigen razonamiento lógico y donde los MLG cometen <b>errores de razonamiento</b>. Su detección pasa por la validación lógica —consistencia, coherencia y razonamiento estructurado del texto generado— y por probar la salida, comparándola con el resultado exacto esperado.',
      ref: '3.1.2 · 3.1.1' },

    { id: '3.1.2c', cap: 3, lo: 'IAGEN-3.1.2', k: 'K3', pts: 2,
      q: 'Al revisar un lote de productos de prueba generados por IAGen, el equipo observa que las pruebas no funcionales aparecen sistemáticamente infrarrepresentadas frente a las funcionales. ¿Qué problema refleja y a qué categoría de detección pertenece?',
      o: [
        'Una alucinación, detectable con comprobaciones de consistencia entre salidas.',
        'Un error de razonamiento, detectable ejecutando los guiones generados.',
        'Un sesgo, detectable al evaluar sesgos relacionados con los tipos de prueba en el resultado generado por el MLG.',
        'Un fallo de la ventana de contexto, detectable midiendo el recuento de tóquenes.'
      ], r: 2,
      why: 'Entre los enfoques de <b>detección del sesgo</b>, el programa incluye textualmente evaluar los sesgos relacionados con los tipos de prueba, «como por ejemplo, las pruebas no funcionales infrarrepresentadas en el resultado generado por el MLG», junto con revisar si los productos generados —los datos de prueba sintéticos, por ejemplo— representan de forma justa y precisa lo que pide la estrategia de prueba.',
      ref: '3.1.2' },

    { id: '3.1.3a', cap: 3, lo: 'IAGEN-3.1.3', k: 'K2', pts: 1,
      q: '¿Cuál de las siguientes <b>NO</b> es una técnica de mitigación de alucinaciones, errores de razonamiento y sesgos según el programa de estudio?',
      o: [
        'Aportar un contexto completo en la instrucción.',
        'Dividir las instrucciones complejas en segmentos manejables verificando cada resultado.',
        'Fijar la temperatura a cero, con lo que se eliminan las alucinaciones del modelo.',
        'Comparar los resultados de la misma instrucción entre varios MLG.'
      ], r: 2,
      why: 'Reducir la temperatura es una técnica de mitigación del <b>comportamiento no determinista</b> (3.1.4): estrecha la distribución de probabilidad y reduce la variabilidad, pero el programa no dice en ningún momento que elimine las alucinaciones —y advierte de que limita la creatividad y la diversidad de las respuestas—. Las otras tres sí figuran entre las técnicas de 3.1.3, junto con usar formatos de datos claros e interpretables y seleccionar el modelo adecuado para la tarea.',
      ref: '3.1.3 · 3.1.4' },

    { id: '3.1.3b', cap: 3, lo: 'IAGEN-3.1.3', k: 'K2', pts: 1,
      q: '¿Cuándo son más probables las alucinaciones, los errores de razonamiento y los sesgos, y qué dos técnicas complementarias remite el programa al capítulo 4?',
      o: [
        'Son más probables cuando las instrucciones no están bien diseñadas o faltan datos contextuales; las técnicas complementarias son la generación aumentada por recuperación y el ajuste fino.',
        'Son más probables con modelos de razonamiento; las técnicas complementarias son la toquenización y las incrustaciones.',
        'Son más probables cuando se usa un chatbot en vez de una IPA; las técnicas complementarias son OpsMLG y la orquestación de agentes.',
        'Son más probables con ventanas de contexto pequeñas; las técnicas complementarias son la anonimización y la minimización de datos.'
      ], r: 0,
      why: 'El programa afirma que estos problemas son más probables cuando las instrucciones no están diseñadas adecuadamente o cuando faltan datos contextuales relevantes para la tarea, y cierra el apartado remitiendo al capítulo 4 para dos técnicas complementarias que mejoran los resultados del MLG: la <b>generación aumentada por recuperación</b> y el <b>ajuste fino</b>.',
      ref: '3.1.3' },

    { id: '3.1.4a', cap: 3, lo: 'IAGEN-3.1.4', k: 'K1', pts: 1,
      q: '¿Qué estrategias recoge el programa para reducir la variabilidad del comportamiento no determinista de los MLG?',
      o: [
        'Aumentar la temperatura y ampliar la ventana de contexto.',
        'Reducir la temperatura durante la inferencia y, si la implementación lo permite, configurar una semilla aleatoria, aunque no se pueda garantizar una reproducibilidad completa.',
        'Reentrenar el modelo con las salidas anteriores hasta que converjan.',
        'Usar exclusivamente modelos de razonamiento, que son deterministas por diseño.'
      ], r: 1,
      why: 'Reducir la temperatura estrecha la distribución de probabilidad y da resultados más consistentes; algunas implementaciones permiten fijar una <b>semilla</b> para el generador de números aleatorios, mejorando la reproducibilidad. El programa deja claro que <b>no se puede garantizar una reproducibilidad completa</b>, sobre todo con salidas largas.',
      ref: '3.1.4' },

    { id: '3.1.4b', cap: 3, lo: 'IAGEN-3.1.4', k: 'K1', pts: 1,
      q: '¿Qué efecto secundario tiene bajar el parámetro de temperatura de un MLG?',
      o: [
        'Aumenta el consumo energético del modelo durante la inferencia.',
        'Reduce el tamaño efectivo de la ventana de contexto.',
        'Limita la creatividad y la diversidad de las respuestas, haciendo los resultados más repetitivos o excesivamente deterministas.',
        'Impide el uso de entradas multimodales.'
      ], r: 2,
      why: 'El propio apartado lo advierte: bajar la temperatura reduce la aleatoriedad y da resultados más consistentes, pero <b>también limita la creatividad y la diversidad</b>, haciendo que las respuestas resulten más repetitivas o excesivamente deterministas. No tiene relación con el consumo energético, con la ventana de contexto ni con la multimodalidad.',
      ref: '3.1.4' },

    { id: '3.2.1a', cap: 3, lo: 'IAGEN-3.2.1', k: 'K2', pts: 1,
      q: 'Un equipo pega registros de producción con datos de clientes en una herramienta de IAGen comercial para que los analice. ¿Qué riesgo de privacidad describe mejor la situación?',
      o: [
        'Impacto medioambiental por consumo energético.',
        'Falta de control sobre el uso de los datos: la herramienta puede almacenar y procesar datos confidenciales sin consentimiento explícito ni control del usuario, con posible uso indebido o acceso no autorizado.',
        'Sobreajuste del modelo a los datos de la organización.',
        'Error de razonamiento al interpretar los registros.'
      ], r: 1,
      why: 'Es uno de los tres riesgos de privacidad que enumera el programa, junto con la <b>exposición involuntaria de datos</b> (que el modelo revele accidentalmente información confidencial) y los <b>riesgos de cumplimiento</b> derivados de usar herramientas de IAGen sin respetar normativas de protección de datos como el RGPD, lo que podría acabar en disputas legales.',
      ref: '3.2.1' },

    { id: '3.2.1b', cap: 3, lo: 'IAGEN-3.2.1', k: 'K2', pts: 1,
      q: '¿Cuál de los siguientes es un riesgo de <b>seguridad</b> específico que el programa asocia a probar con IAGen?',
      o: [
        'Que la infraestructura de prueba dotada de MLG sea vulnerable a ataques como violaciones de datos o accesos no autorizados.',
        'Que el modelo consuma más energía de la presupuestada.',
        'Que los casos de prueba generados sean demasiado numerosos para ejecutarlos.',
        'Que el proveedor del MLG cambie su modelo de precios.'
      ], r: 0,
      why: 'El programa lista tres riesgos de seguridad: que la <b>infraestructura de prueba dotada de MLG</b> sea vulnerable a violaciones de datos o accesos no autorizados, que actores maliciosos exploten vulnerabilidades del MLG —como los ataques de manipulación— para alterar su comportamiento o extraer información confidencial, y que se introduzcan intencionadamente datos maliciosos para engañar al modelo.',
      ref: '3.2.1' },

    { id: '3.2.2a', cap: 3, lo: 'IAGEN-3.2.2', k: 'K2', pts: 1,
      q: 'Un atacante envía instrucciones extraordinariamente largas para superar la ventana de contexto del MLG y sobrecargar su memoria, con la esperanza de que revele fragmentos de sus datos de entrenamiento. ¿Qué vector de ataque es?',
      o: [
        'Envenenamiento de datos.',
        'Manipulación de solicitudes.',
        'Exfiltración de datos.',
        'Generación de código malicioso.'
      ], r: 2,
      why: 'La <b>exfiltración de datos</b> (o fuga de datos) consiste en enviar solicitudes diseñadas para extraer datos de entrenamiento confidenciales, y el ejemplo del programa es exactamente ese: superar la ventana contextual con instrucciones extensas para sobrecargar la memoria de la IA y llevarla a revelar fragmentos aleatorios de sus datos de entrenamiento.',
      ref: '3.2.2' },

    { id: '3.2.2b', cap: 3, lo: 'IAGEN-3.2.2', k: 'K2', pts: 1,
      q: 'Alguien introduce evaluaciones falsas al calificar los resultados de un informe de prueba generado por IA, con la intención de degradar el comportamiento futuro del modelo. ¿Qué vector de ataque describe el programa para este caso?',
      o: [
        'Envenenamiento de datos (o contaminación de datos): manipular los datos de entrenamiento.',
        'Exfiltración de datos: extraer datos de entrenamiento confidenciales.',
        'Manipulación de solicitudes: introducir datos que alteren los resultados de la IA.',
        'Generación de código malicioso: inducir al modelo a crear puertas traseras.'
      ], r: 0,
      why: 'El <b>envenenamiento de datos</b> se define como la manipulación de los datos de entrenamiento, y el ejemplo literal de la tabla del programa es aportar evaluaciones falsas al calificar los resultados de un informe de prueba generado por IA.',
      ref: '3.2.2' },

    { id: '3.2.2c', cap: 3, lo: 'IAGEN-3.2.2', k: 'K2', pts: 1,
      q: 'Se introducen imágenes que arrastran a la IA a un contexto distinto del real, provocando alucinaciones sobre los criterios de aceptación. ¿Qué vector de ataque es, y qué ejemplo da el programa de <b>generación de código malicioso</b>?',
      o: [
        'Es exfiltración de datos; la generación de código malicioso consiste en producir guiones de prueba con errores de sintaxis.',
        'Es manipulación de solicitudes; la generación de código malicioso se ejemplifica con código que abre un canal de comunicación con una IP específica y maliciosa.',
        'Es envenenamiento de datos; la generación de código malicioso se ejemplifica con la creación de datos de prueba sintéticos no representativos.',
        'Es generación de código malicioso; la manipulación de solicitudes solo puede hacerse con texto, no con imágenes.'
      ], r: 1,
      why: 'La <b>manipulación de solicitudes</b> es introducir datos que alteren los resultados de la IA, y el ejemplo del programa son imágenes que atraen a la IA a un contexto diferente provocando alucinaciones sobre, por ejemplo, los criterios de aceptación. La <b>generación de código malicioso</b> es manipular al MLG para que produzca puertas traseras, como código que abre un canal de comunicación con una IP maliciosa.',
      ref: '3.2.2' },

    { id: '3.2.3a', cap: 3, lo: 'IAGEN-3.2.3', k: 'K2', pts: 1,
      q: '¿Qué afirma el programa sobre la relación entre el RGPD y el uso de IA generativa?',
      o: [
        'Prohíbe expresamente el uso de IAGen sobre cualquier dato de producción.',
        'No restringe explícitamente las aplicaciones de IA generativa, pero proporciona salvaguardias que pueden limitar lo que se puede hacer, en cuanto a legalidad y a los fines de recopilación, tratamiento y almacenamiento de datos.',
        'Solo se aplica si el MLG está alojado fuera de la Unión Europea.',
        'Obliga a que todo MLG usado en pruebas se ejecute en la infraestructura propia de la organización.'
      ], r: 1,
      why: 'El programa es explícito: las normativas de protección de datos como el RGPD <b>no restringen explícitamente</b> las aplicaciones de IA generativa, pero sí aportan salvaguardias que pueden limitar lo que se puede hacer, en particular respecto a la legalidad y a las limitaciones sobre los fines de recopilación, tratamiento y almacenamiento de datos.',
      ref: '3.2.3' },

    { id: '3.2.3b', cap: 3, lo: 'IAGEN-3.2.3', k: 'K2', pts: 1,
      q: 'Una organización con requisitos altos de confidencialidad quiere usar IAGen en pruebas. ¿Qué recoge el programa entre las estrategias de mitigación?',
      o: [
        'Elegir un entorno operativo seguro —oferta comercial segura, nube segura o instalación del MLG en la propia infraestructura— y complementarlo con minimización, anonimización, revisión sistemática de resultados y auditorías periódicas.',
        'Sustituir toda revisión humana por comparaciones automáticas entre modelos, que son más fiables.',
        'Usar exclusivamente modelos de código abierto, porque no envían datos a terceros bajo ninguna configuración.',
        'Reducir la temperatura del modelo, ya que las salidas deterministas no filtran datos.'
      ], r: 0,
      why: 'El programa propone, según el nivel de confidencialidad, usar una oferta comercial segura, operar el MLG en una nube segura o instalarlo en la infraestructura propia, y combinarlo con minimización de datos, anonimización y seudonimización, almacenamiento y transmisión seguros, formación, revisión sistemática de resultados, evaluación por comparación con otro MLG y auditorías de seguridad. Además recomienda implicar a ingenieros de seguridad sénior, asesores jurídicos y al DT o DSI. La <b>evaluación humana sigue siendo esencial</b>: no se sustituye.',
      ref: '3.2.3' },

    { id: '3.3.1a', cap: 3, lo: 'IAGEN-3.3.1', k: 'K2', pts: 1,
      q: '¿Qué comparación concreta usa el programa para ilustrar el consumo energético de las tareas de IA generativa?',
      o: [
        'Generar una sola imagen con un modelo potente puede consumir tanta energía como cargar completamente un smartphone, mientras que generar texto consume solo un pequeño porcentaje de esa carga.',
        'Entrenar un modelo consume lo mismo que ejecutar una suite de regresión completa.',
        'Una consulta a un MLG equivale al consumo diario de un centro de datos pequeño.',
        'Generar texto consume más que generar imágenes, porque el texto requiere más tóquenes.'
      ], r: 0,
      why: 'Es el ejemplo literal del programa (Heikkilä 2023). El apartado añade que la <b>complejidad de la tarea y los recursos de cálculo</b> necesarios influyen en el consumo, que el efecto acumulativo entre millones de usuarios supone una carga medioambiental considerable, y que adoptar buenas prácticas como limitar las interacciones innecesarias con los modelos es fundamental.',
      ref: '3.3.1' },

    { id: '3.3.1b', cap: 3, lo: 'IAGEN-3.3.1', k: 'K2', pts: 1,
      q: '¿Qué buena práctica señala el programa como fundamental para mitigar el impacto medioambiental de IAGen en la prueba de software?',
      o: [
        'Ejecutar todas las tareas de prueba con el modelo más grande disponible para acertar a la primera.',
        'Limitar las interacciones innecesarias con los modelos.',
        'Compensar las emisiones comprando créditos de carbono por cada instrucción enviada.',
        'Sustituir la IAGen por aprendizaje automático clásico en todas las tareas de prueba.'
      ], r: 1,
      why: 'El programa concluye el apartado diciendo que adoptar mejores prácticas <b>como limitar las interacciones innecesarias con los modelos</b> es fundamental para mitigar los riesgos medioambientales. En el capítulo 5 lo complementa: seleccionar modelos del tamaño adecuado a la tarea y equilibrar los beneficios de la automatización con el coste y el consumo de energía.',
      ref: '3.3.1 · 5.2.1' },

    { id: '3.4.1a', cap: 3, lo: 'IAGEN-3.4.1', k: 'K1', pts: 1,
      q: '¿Qué norma especifica los requisitos para <b>gestionar los sistemas de IA dentro de una organización</b>?',
      o: [
        'ISO/IEC 23053:2022.',
        'NIST AI RMF 1.0.',
        'ISO/IEC 42001:2023.',
        'AI Act 2024 (Ley de IA de la UE).'
      ], r: 2,
      why: '<b>ISO/IEC 42001:2023</b> —Tecnología de la información. Inteligencia artificial. Sistema de gestión— especifica los requisitos para gestionar los sistemas de IA en una organización. ISO/IEC 23053:2022 es un marco para sistemas de IA que usan aprendizaje automático; el NIST AI RMF 1.0 es un marco estadounidense de gestión de riesgos; y el AI Act 2024 es el reglamento europeo que clasifica las aplicaciones por nivel de riesgo.',
      ref: '3.4.1' },

    { id: '3.4.1b', cap: 3, lo: 'IAGEN-3.4.1', k: 'K1', pts: 1,
      q: '¿Cuál de estas correspondencias entre norma o marco y su descripción es <b>correcta</b>?',
      o: [
        'AI Act 2024: reglamento de la UE que establece un marco legal para los riesgos de la IA, clasificando las aplicaciones por nivel de riesgo.',
        'NIST AI RMF 1.0: norma ISO que certifica los sistemas de gestión de IA de una organización.',
        'ISO/IEC 23053:2022: reglamento que exige transparencia y mitigación del sesgo en la IAGen usada en pruebas.',
        'ISO/IEC 42001:2023: marco estadounidense centrado en la equidad, la transparencia y la seguridad.'
      ], r: 0,
      why: 'El <b>AI Act 2024</b> es un reglamento de la UE que establece un marco legal frente a los riesgos de la IA clasificando las aplicaciones por nivel de riesgo, y exige transparencia, responsabilidad y mitigación del sesgo para la IAGen usada en pruebas. El NIST AI RMF 1.0 es un marco (EE. UU.), no una norma ISO; ISO/IEC 23053:2022 es una norma que proporciona un marco para sistemas de IA que usan aprendizaje automático; e ISO/IEC 42001:2023 es la norma de sistema de gestión.',
      ref: '3.4.1' },

  /* ══════════════════════════════════════════════════════════════════════
     CAPÍTULO 4 — Infraestructura impulsada por MLG (5 preguntas, 5 puntos)
     ══════════════════════════════════════════════════════════════════════ */

    { id: '4.1.1a', cap: 4, lo: 'IAGEN-4.1.1', k: 'K2', pts: 1,
      q: 'En la arquitectura típica de una infraestructura de prueba impulsada por MLG, ¿de qué se ocupa la <b>capa de servicios</b>?',
      o: [
        'De ser la interfaz donde los probadores introducen consultas o comandos.',
        'De alojar el modelo y generar las respuestas a partir de las instrucciones estructuradas.',
        'De procesar la entrada del usuario y gestionar la autenticación, la recuperación de datos, la preparación de instrucciones y la interacción con el MLG.',
        'De almacenar únicamente las incrustaciones en una base de datos vectorial.'
      ], r: 2,
      why: 'La capa de servicios (back-end) procesa la información introducida y gestiona funciones críticas: autenticación, recuperación de datos, preparación de instrucciones e interacción con el MLG. Además integra múltiples fuentes —bases relacionales y vectoriales— y <b>mejora la salida sin procesar del MLG mediante posprocesamiento</b>. La interfaz de usuario es la capa de presentación, y generar respuestas es cosa del MLG.',
      ref: '4.1.1' },

    { id: '4.1.1b', cap: 4, lo: 'IAGEN-4.1.1', k: 'K2', pts: 1,
      q: '¿En qué se diferencia una infraestructura de prueba impulsada por MLG del modelo cliente-servidor tradicional?',
      o: [
        'En que incorpora componentes de procesamiento inteligente: el MLG no es solo un servidor, sino un componente que interpreta y razona sobre los productos de prueba, con una capa de servicios multifuentes.',
        'En que elimina la capa de presentación, porque el probador conversa directamente con el modelo.',
        'En que el cliente ejecuta el modelo localmente, sin necesidad de servidor.',
        'En que sustituye las bases de datos relacionales por bases vectoriales exclusivamente.'
      ], r: 0,
      why: 'El programa dice literalmente que esta arquitectura va más allá del modelo cliente-servidor tradicional al incorporar componentes de procesamiento inteligente, y que el <b>MLG no es solo un servidor</b>, sino un componente de procesamiento inteligente que interpreta y razona basándose en productos de prueba. La capa de servicios integra bases relacionales <b>y</b> vectoriales: no sustituye unas por otras.',
      ref: '4.1.1' },

    { id: '4.1.2a', cap: 4, lo: 'IAGEN-4.1.2', k: 'K2', pts: 1,
      q: '¿Cómo funciona la <b>generación aumentada por recuperación</b> (GAR) al procesar la instrucción de un usuario?',
      o: [
        'Reentrena el modelo con los documentos de la organización antes de responder.',
        'En dos pasos: recupera la información relevante de bases de datos vectoriales previamente creadas por similitud semántica, y luego el MLG genera la respuesta combinando su conocimiento con esos datos.',
        'Amplía la ventana de contexto del modelo para que quepan todos los documentos de la empresa.',
        'Compara la respuesta del MLG con la de un segundo modelo y devuelve la más frecuente.'
      ], r: 1,
      why: 'GAR es un proceso de dos pasos: <b>recuperación</b> —a partir de la consulta se recuperan los fragmentos relevantes de las bases vectoriales, normalmente por similitud semántica entre incrustaciones— y <b>generación</b>, en la que el MLG combina su conocimiento existente con los datos recuperados. No implica reentrenar el modelo: eso sería el ajuste fino (4.2.1).',
      ref: '4.1.2' },

    { id: '4.1.2b', cap: 4, lo: 'IAGEN-4.1.2', k: 'K2', pts: 1,
      q: 'Durante el <b>preprocesamiento</b> de un sistema GAR, ¿qué se hace con los documentos grandes y por qué?',
      o: [
        'Se resumen con el propio MLG para reducir su longitud antes de almacenarlos.',
        'Se traducen al inglés para mejorar la calidad de las incrustaciones.',
        'Se dividen en fragmentos más pequeños (por ejemplo, de 256 a 512 tóquenes) para garantizar una recuperación centrada y la compatibilidad con la ventana de contexto del modelo.',
        'Se almacenan íntegros en una base relacional, porque las bases vectoriales solo guardan consultas.'
      ], r: 2,
      why: 'El programa detalla que durante el preprocesamiento los documentos grandes se dividen en fragmentos (por ejemplo, 256-512 tóquenes) para una recuperación centrada y compatible con la ventana de contexto; cada fragmento se limpia, se procesa y se codifica como vector de alta dimensión —una incrustación— que puede almacenarse en <b>bases de datos vectoriales</b> para una recuperación eficiente por similitud en tiempo de inferencia.',
      ref: '4.1.2' },

    { id: '4.1.3a', cap: 4, lo: 'IAGEN-4.1.3', k: 'K2', pts: 1,
      q: '¿Qué diferencia principal establece el programa entre un <b>agente impulsado por MLG</b> y un bot de conversación tradicional?',
      o: [
        'El agente puede realizar tareas o «actuar» invocando un conjunto predefinido de funciones, llamadas herramientas, con las que interactúa con sistemas externos y los manipula.',
        'El agente no necesita un MLG por debajo, porque funciona con reglas.',
        'El agente siempre opera de forma totalmente autónoma, sin ninguna intervención humana.',
        'El agente sustituye la generación aumentada por recuperación por el ajuste fino.'
      ], r: 0,
      why: 'Los bots de conversación tradicionales se centran en interacciones de pregunta-respuesta; los <b>agentes impulsados por MLG</b> pueden actuar invocando herramientas, lo que les permite interactuar con sistemas externos y manipularlos. Su grado de autonomía <b>varía</b>: los autónomos operan con intervención humana mínima y los semiautónomos trabajan con supervisión humana periódica.',
      ref: '4.1.3' },

    { id: '4.1.3b', cap: 4, lo: 'IAGEN-4.1.3', k: 'K2', pts: 1,
      q: 'Varios agentes con funciones especializadas se comunican y coordinan para resolver un problema de prueba complejo. ¿Cómo se llama ese esfuerzo coordinado y en qué se diferencia un agente semiautónomo de uno autónomo?',
      o: [
        'Se llama encadenamiento; el semiautónomo trabaja sin herramientas y el autónomo con ellas.',
        'Se llama orquestación; el semiautónomo realiza tareas con supervisión humana periódica, mientras que el autónomo opera de forma independiente con intervención humana mínima.',
        'Se llama ajuste fino; el semiautónomo se entrena con datos del dominio y el autónomo no.',
        'Se llama OpsMLG; el semiautónomo se despliega en la nube y el autónomo en local.'
      ], r: 1,
      why: 'Las arquitecturas multiagente implican un sistema colaborativo donde varios agentes especializados se comunican y coordinan, y ese esfuerzo coordinado se conoce como <b>orquestación</b>. Los <b>agentes semiautónomos</b> realizan tareas con supervisión humana periódica para garantizar que el resultado cumpla los objetivos definidos; los <b>autónomos</b> operan de forma independiente con intervención humana mínima.',
      ref: '4.1.3' },

    { id: '4.2.1a', cap: 4, lo: 'IAGEN-4.2.1', k: 'K2', pts: 1,
      q: '¿Cuál de los siguientes es un <b>reto</b> del ajuste fino de un modelo IAGen para la prueba de software?',
      o: [
        'El sobreajuste: el modelo se especializa tanto en los datos de entrenamiento que empeora su rendimiento con datos nuevos y desconocidos.',
        'La imposibilidad de aplicar ajuste fino a modelos de lenguaje pequeños.',
        'La pérdida de la capacidad multimodal del modelo tras el ajuste.',
        'La necesidad de desplegar obligatoriamente el modelo en la nube pública.'
      ], r: 0,
      why: 'El programa enumera cuatro retos: evitar resultados sesgados o inexactos garantizando datos de entrenamiento de alta calidad, <b>mitigar el sobreajuste</b> para mantener la generalización, abordar la opacidad del razonamiento del modelo —que complica depuración y validación— y gestionar los importantes recursos de cálculo necesarios. El ajuste fino sí puede aplicarse a MLP, y de hecho el programa lo destaca por su menor coste de recursos.',
      ref: '4.2.1' },

    { id: '4.2.1b', cap: 4, lo: 'IAGEN-4.2.1', k: 'K2', pts: 1,
      q: 'Una organización quiere que el modelo genere casos de prueba a partir de sus historias de usuario siguiendo su formato y su terminología internos, con el menor coste de recursos posible. ¿Qué plantea el programa?',
      o: [
        'Que solo se puede lograr con un MLG de gran tamaño; los modelos pequeños no admiten especialización.',
        'Que basta con incluir el formato deseado en la instrucción de sistema, sin ninguna otra técnica.',
        'Que el ajuste fino de un modelo de lenguaje pequeño puede alcanzar altos niveles de rendimiento en tareas específicas sin la sobrecarga de recursos de proceso que exige un MLG.',
        'Que la única vía es la generación aumentada por recuperación, ya que el ajuste fino no admite formatos de salida.'
      ], r: 2,
      why: 'El programa dice que, ajustando un <b>MLP</b>, se pueden alcanzar niveles de rendimiento más altos para tareas específicas sin la misma sobrecarga de recursos de proceso que requieren los MLG, y usa como ejemplo justamente entrenar el modelo con las historias de usuario de la organización y sus casos de prueba correspondientes para alinearlo con su proceso y su terminología.',
      ref: '4.2.1' },

    { id: '4.2.2a', cap: 4, lo: 'IAGEN-4.2.2', k: 'K2', pts: 1,
      q: '¿Qué son las <b>operaciones del modelo de lenguaje grande</b> (OpsMLG)?',
      o: [
        'El conjunto de prácticas, herramientas y procesos diseñados para optimizar el desarrollo, la implementación y el mantenimiento de los MLG en entornos de producción.',
        'El proceso de dividir documentos en fragmentos y codificarlos como incrustaciones.',
        'Las reglas de gobernanza que definen qué datos pueden compartirse con un proveedor externo.',
        'El conjunto de métricas para evaluar la calidad de las salidas de un MLG en tareas de prueba.'
      ], r: 0,
      why: 'Es la definición del programa (Sinha 2024). Las otras opciones describen el preprocesamiento de GAR (4.1.2), las directrices de proceso de una estrategia de IAGen (5.1.2) y las métricas de evaluación de resultados (2.3.1).',
      ref: '4.2.2' },

    { id: '4.2.2b', cap: 4, lo: 'IAGEN-4.2.2', k: 'K2', pts: 1,
      q: 'Sobre los tres enfoques para usar IAGen en los procesos de prueba de una organización —chatbot con IA, herramienta de prueba con capacidades de IAGen y desarrollo interno—, ¿qué afirma el programa?',
      o: [
        'Que hay que elegir uno y mantenerlo, porque mezclarlos duplica los riesgos de privacidad.',
        'Que el desarrollo interno es siempre el más barato al no pagar licencias.',
        'Que no son mutuamente excluyentes: una organización puede usar un chatbot para algunas tareas y desarrollar herramientas propias para otras, y pueden incorporar GAR y ajuste fino.',
        'Que el uso de un chatbot no plantea consideraciones de privacidad porque los datos no salen de la conversación.'
      ], r: 2,
      why: 'El programa concluye que los tres enfoques <b>no son mutuamente excluyentes</b> y pueden implementarse simultáneamente según las actividades de prueba, incorporando además tecnologías como GAR y el ajuste fino. El desarrollo interno exige planificar costes de procesamiento, almacenamiento y capacitación; y el uso de un chatbot obliga precisamente a gestionar riesgos de privacidad y seguridad.',
      ref: '4.2.2' },

  /* ══════════════════════════════════════════════════════════════════════
     CAPÍTULO 5 — Despliegue e integración (7 preguntas, 7 puntos)
     ══════════════════════════════════════════════════════════════════════ */

    { id: '5.1.1a', cap: 5, lo: 'IAGEN-5.1.1', k: 'K1', pts: 1,
      q: '¿Cuáles son los riesgos de la <b>IA en la sombra</b> según el programa de estudio?',
      o: [
        'Sobreajuste, opacidad del modelo y consumo de recursos de cálculo.',
        'Debilidades en seguridad y privacidad de datos, cuestiones normativas y de cumplimiento, y propiedad intelectual difusa.',
        'Alucinaciones, errores de razonamiento y sesgos.',
        'Coste recurrente, falta de soporte de la comunidad y ausencia de puntos de referencia.'
      ], r: 1,
      why: 'El programa enumera esos tres: herramientas de IA personales que pueden carecer de seguridad sólida y provocar violaciones de datos; uso de herramientas no aprobadas que incumple estándares y normativas del sector, con posibles consecuencias legales; y acuerdos de licencia poco claros que exponen a disputas de <b>propiedad intelectual</b>, sobre todo si se procesan datos protegidos por derechos de autor.',
      ref: '5.1.1' },

    { id: '5.1.1b', cap: 5, lo: 'IAGEN-5.1.1', k: 'K1', pts: 1,
      q: '¿Qué recomienda el programa para que una organización de prueba evite el riesgo de IA en la sombra?',
      o: [
        'Bloquear el acceso a internet en los equipos del departamento de pruebas.',
        'Reducir la temperatura de los modelos aprobados.',
        'Contar con una estrategia y unos pasos definidos para integrar e implementar IAGen.',
        'Prohibir el uso de cualquier herramienta de IA hasta que exista una norma ISO aplicable.'
      ], r: 2,
      why: 'El apartado cierra diciendo que <b>una estrategia y unos pasos para integrar e implementar IAGen</b> pueden ayudar a las organizaciones de prueba a evitar el riesgo de la IA en la sombra. Es decir: el remedio que propone el programa es dar un camino oficial, no bloquear el acceso.',
      ref: '5.1.1' },

    { id: '5.1.2a', cap: 5, lo: 'IAGEN-5.1.2', k: 'K2', pts: 1,
      q: 'Al definir una estrategia de IAGen para la prueba de software, ¿qué debe incluirse entre las directrices de proceso para asegurar el cumplimiento normativo y ético?',
      o: [
        'Reglas para el uso de datos sensibles, obligaciones de transparencia sobre qué se generó con IAGen y controles de calidad con revisión del producto de prueba generado.',
        'La obligación de usar un único proveedor de MLG para toda la organización.',
        'La prohibición de que los probadores escriban sus propias instrucciones.',
        'El uso exclusivo de modelos de razonamiento para todas las tareas de prueba.'
      ], r: 0,
      why: 'El programa pide establecer directrices de proceso que incluyan reglas para el uso de datos sensibles, <b>obligaciones de transparencia</b> —por ejemplo, qué se generó usando IAGen— y controles de calidad con revisión del producto de prueba generado. La estrategia empieza además por definir objetivos de prueba medibles: aumentar la productividad, acortar los ciclos y mejorar la calidad.',
      ref: '5.1.2' },

    { id: '5.1.2b', cap: 5, lo: 'IAGEN-5.1.2', k: 'K2', pts: 1,
      q: '¿Qué papel juega la calidad de los datos de entrada en una estrategia de IAGen para la prueba?',
      o: [
        'Es secundaria: un modelo suficientemente grande compensa la mala calidad de la entrada.',
        'Solo importa en el ajuste fino, no en el uso diario de instrucciones.',
        'Es fundamental: la efectividad de la prueba basada en MLG depende de datos de entrada precisos y relevantes, protegidos por procedimientos de seguridad robustos.',
        'Importa únicamente para el cumplimiento del RGPD, no para la calidad del resultado.'
      ], r: 2,
      why: 'El programa afirma que la calidad de los datos desempeña un papel fundamental, porque la efectividad de la prueba basada en MLG depende de <b>datos de entrada precisos y relevantes</b> protegidos por procedimientos de seguridad robustos, y que mantener esa calidad es clave para lograr resultados en los que se pueda confiar. La misma idea aparece en el capítulo 2: una entrada de alta calidad es fundamental para obtener resultados significativos.',
      ref: '5.1.2 · 2.2' },

    { id: '5.1.3a', cap: 5, lo: 'IAGEN-5.1.3', k: 'K2', pts: 1,
      q: '¿Cuáles son los criterios clave que el programa propone para <b>seleccionar un MLG o MLP</b> para tareas de prueba de software?',
      o: [
        'Rendimiento del modelo, potencial de ajuste fino, coste recurrente, y comunidad y soporte.',
        'Número de parámetros, país del proveedor, idioma de entrenamiento y fecha de lanzamiento.',
        'Temperatura por defecto, semilla configurable, tamaño de lote y latencia.',
        'Nivel de riesgo según el AI Act, certificación ISO/IEC 42001, huella de carbono y licencia de código abierto.'
      ], r: 0,
      why: 'El programa lista exactamente esos cuatro: evaluar el <b>rendimiento</b> frente a los puntos de referencia de la organización usando métricas como las de 2.3.1; valorar el <b>potencial de ajuste fino</b> con datos del dominio; considerar el <b>coste recurrente</b>, incluidas licencias y gastos operativos; y elegir modelos con <b>soporte activo de la comunidad</b> y documentación detallada.',
      ref: '5.1.3' },

    { id: '5.1.3b', cap: 5, lo: 'IAGEN-5.1.3', k: 'K2', pts: 1,
      q: '¿Qué advierte el programa sobre los puntos de referencia (benchmarks) disponibles para elegir un MLG/MLP?',
      o: [
        'Que los benchmarks públicos bastan para decidir, porque cubren todas las tareas de prueba.',
        'Que aunque existen muchos para tareas como PLN, generación de código o análisis de imágenes, solo unos pocos se centran específicamente en tareas de prueba de software.',
        'Que los benchmarks están prohibidos por el AI Act para modelos usados en calidad.',
        'Que solo los proveedores comerciales publican benchmarks fiables.'
      ], r: 1,
      why: 'El programa advierte que, aunque abundan los puntos de referencia para PLN, generación de código o análisis de imágenes, <b>solo unos pocos se centran específicamente en tareas de prueba de software</b> (Wenhan 2024), y por eso la selección exige valorar los cuatro criterios clave con los propios puntos de referencia de la organización.',
      ref: '5.1.3' },

    { id: '5.1.4a', cap: 5, lo: 'IAGEN-5.1.4', k: 'K1', pts: 1,
      q: '¿Cuáles son las tres fases clave de la adopción de IA generativa en una organización de prueba, en orden?',
      o: [
        'Piloto, despliegue y auditoría.',
        'Formación, certificación y automatización.',
        'Descubrimiento; inicio y definición del uso; uso e iteración.',
        'Análisis, diseño e implementación.'
      ], r: 2,
      why: 'Son las tres del programa: <b>descubrimiento</b> (concienciación y desarrollo de capacidades, acceso a modelos y experimentación con casos de uso iniciales), <b>inicio y definición del uso</b> (identificar y priorizar casos de uso prácticos, evaluar la infraestructura impulsada por MLG) y <b>uso e iteración</b> (integración completa, seguimiento continuo y medición de la transformación).',
      ref: '5.1.4' },

    { id: '5.1.4b', cap: 5, lo: 'IAGEN-5.1.4', k: 'K1', pts: 1,
      q: '¿Deben recorrerse secuencialmente las fases de adopción de IAGen, y qué preocupación inicial señala el programa?',
      o: [
        'Pueden ejecutarse en paralelo para distintos casos de uso, y hay que reconocer y abordar preocupaciones iniciales como el temor a la pérdida de puestos de trabajo.',
        'Deben recorrerse estrictamente en orden y para toda la organización a la vez; la preocupación principal es el coste de las licencias.',
        'Solo se aplican a organizaciones que desarrollan sus propias herramientas; la preocupación principal es la opacidad del modelo.',
        'Se recorren una sola vez y no se repiten; la preocupación principal es el impacto medioambiental.'
      ], r: 0,
      why: 'El programa dice que las fases <b>pueden ejecutarse en paralelo para diferentes casos de uso</b> —el análisis de informes puede ir muy avanzado mientras la automatización empieza— y que es importante reconocer y abordar las preocupaciones iniciales, como el <b>temor a la pérdida de puestos de trabajo</b>, que pueden afectar a la adopción y a la moral del equipo.',
      ref: '5.1.4' },

    { id: '5.2.1a', cap: 5, lo: 'IAGEN-5.2.1', k: 'K2', pts: 1,
      q: '¿Qué habilidades y conocimientos considera esenciales el programa para que un probador trabaje eficazmente con IAGen?',
      o: [
        'Saber entrenar modelos desde cero y programar arquitecturas de transformadores.',
        'Dominar las técnicas de ingeniería de instrucciones, comprender las ventanas de contexto de los modelos y desarrollar métodos de revisión de la prueba, combinando experiencia de dominio y de prueba con habilidades de IA.',
        'Conocer al detalle las tarifas de todos los proveedores comerciales de MLG.',
        'Ser capaz de sustituir la revisión humana por comprobaciones automáticas en todas las tareas.'
      ], r: 1,
      why: 'El programa señala esas tres capacidades y añade evaluar las capacidades de los MLG, comprender las técnicas de refinamiento de instrucciones y evaluar los productos de prueba generados por IA. Entre los conocimientos esenciales están los riesgos inherentes de IAGen y sus mitigaciones, las implicaciones de seguridad de compartir productos de prueba con un MLG y la <b>limpieza de datos</b> —eliminar u ocultar información sensible, personal o confidencial—.',
      ref: '5.2.1' },

    { id: '5.2.1b', cap: 5, lo: 'IAGEN-5.2.1', k: 'K2', pts: 1,
      q: 'Entre los conocimientos esenciales del probador que usa IAGen, ¿qué incluye el programa respecto al <b>impacto medioambiental</b>?',
      o: [
        'Optimizar la selección de modelos y los patrones de uso para reducir la sobrecarga computacional, elegir modelos del tamaño adecuado a la tarea y equilibrar los beneficios de la automatización con el coste y el consumo de energía.',
        'Calcular y publicar la huella de carbono de cada caso de prueba generado.',
        'Usar siempre modelos alojados en centros de datos con energía renovable certificada.',
        'Limitar el uso de IAGen a las pruebas no funcionales, que consumen menos.'
      ], r: 0,
      why: 'Es lo que dice el apartado: las consideraciones medioambientales incluyen optimizar la selección de modelos y los patrones de uso para reducir la sobrecarga computacional, <b>seleccionar modelos del tamaño adecuado</b> para las tareas de prueba y equilibrar los beneficios de la automatización con el impacto en coste y consumo energético.',
      ref: '5.2.1 · 3.3.1' },

    { id: '5.2.2a', cap: 5, lo: 'IAGEN-5.2.2', k: 'K1', pts: 1,
      q: '¿Qué estrategias recoge el programa para desarrollar capacidades de IAGen dentro de un equipo de prueba?',
      o: [
        'Sustituir a los probadores con menos experiencia por perfiles de ciencia de datos.',
        'Contratar formación externa una vez al año y no intervenir en el trabajo diario.',
        'Practicar con varios MLG/MLP, seguir itinerarios de aprendizaje estructurados, hacer ejercicios guiados, aprender entre compañeros e integrar gradualmente la IA en las tareas diarias.',
        'Centralizar todas las instrucciones en un único experto que las escriba para el resto del equipo.'
      ], r: 2,
      why: 'El programa describe un enfoque práctico: practicar con varios MLG/MLP, itinerarios de aprendizaje estructurados, ejercicios guiados, aprendizaje entre compañeros e integración gradual en el trabajo diario. Añade las <b>comunidades internas de práctica</b>, con reuniones periódicas para compartir experiencias, y el intercambio de librerías de patrones de instrucciones.',
      ref: '5.2.2' },

    { id: '5.2.2b', cap: 5, lo: 'IAGEN-5.2.2', k: 'K1', pts: 1,
      q: '¿Qué es un <b>patrón de instrucción</b> según el programa de estudio?',
      o: [
        'Una plantilla reutilizable para crear instrucciones eficaces que guíen a IAGen hacia resultados consistentes y fiables.',
        'La secuencia de tóquenes más probable que el modelo genera ante una entrada dada.',
        'El conjunto de hiperparámetros guardados junto con una conversación.',
        'La estructura de seis componentes que toda instrucción debe cumplir obligatoriamente.'
      ], r: 0,
      why: 'El programa lo define exactamente así, dentro del desarrollo de capacidades: una <b>plantilla reutilizable</b> para crear instrucciones eficaces que guíen a IAGen hacia resultados consistentes y fiables. Las comunidades internas de práctica promueven la mejora continua compartiendo librerías de esos patrones y documentando las lecciones aprendidas.',
      ref: '5.2.2' },

    { id: '5.2.3a', cap: 5, lo: 'IAGEN-5.2.3', k: 'K1', pts: 1,
      q: '¿Cómo evoluciona el rol del probador en una organización de prueba asistida por IA?',
      o: [
        'Pasa a dedicarse exclusivamente a escribir instrucciones, delegando el diseño de pruebas en el modelo.',
        'Deja de necesitar las técnicas de prueba tradicionales, sustituidas por la ingeniería de instrucciones.',
        'Pasa de especialista en diseño y ejecución a especialista en pruebas asistidas por IA, combinando las técnicas de prueba con la capacidad de guiar y verificar los productos generados por IA.',
        'Su rol no cambia; solo cambian las responsabilidades del gestor de prueba.'
      ], r: 2,
      why: 'El programa describe esa evolución y precisa que las tareas <b>se amplían</b>: revisar los resultados generados por IA, perfeccionar las instrucciones y mantener librerías de instrucciones específicas para la prueba. Insiste además en que los equipos deben mantener tanto las competencias de prueba tradicionales como los conocimientos de IA.',
      ref: '5.2.3' },

    { id: '5.2.3b', cap: 5, lo: 'IAGEN-5.2.3', k: 'K1', pts: 1,
      q: '¿Qué nuevas responsabilidades asume el <b>gestor de prueba</b> al adoptar IAGen?',
      o: [
        'Desarrollar una estrategia de prueba basada en IA, gestionar riesgos con IA, supervisar y controlar procesos asistidos por IA, establecer marcos de gobernanza y coordinar equipos híbridos de personas y agentes impulsados por IAGen.',
        'Programar y desplegar personalmente la infraestructura impulsada por MLG.',
        'Ajustar finamente los modelos que utiliza su equipo.',
        'Aprobar cada instrucción antes de que un probador la envíe al modelo.'
      ], r: 0,
      why: 'El programa actualiza el rol del gestor de prueba con esas responsabilidades, y añade el equilibrio entre capacidades humanas y de IA y garantizar que el equipo conserve las competencias de prueba tradicionales. Subraya además que ya no solo dirigirá probadores humanos: también <b>coordinará agentes de prueba impulsados por IAGen</b>, lo que exige nuevas habilidades para supervisar equipos híbridos.',
      ref: '5.2.3' }
  ];

  return { meta: meta, blueprint: blueprint, capitulos: capitulos, banco: banco };
})();
