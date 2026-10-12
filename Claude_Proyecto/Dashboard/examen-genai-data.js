/* ══════════════════════════════════════════════════════════════════════════
   EXAMEN CT-GenAI — banco de preguntas
   ══════════════════════════════════════════════════════════════════════════

   Simulacro del examen ISTQB® Certified Tester Specialist:
   Testing with Generative AI (CT-GenAI).

   DE DÓNDE SALE CADA COSA (nada de esto está inventado):

   · Las PREGUNTAS salen únicamente del programa de estudios oficial en
     español para Latinoamérica: "Programa de Estudios del Probador Certificado
     Nivel Especialista – Pruebas con IA Generativa (CT-GenAI)", v1.0 del 25 de
     julio de 2025 (el de México, y el que sigue los términos del examen en
     inglés: prompt, LLM, SLM, tokens, scripts, testware). Cada pregunta lleva
     en `ref` la sección exacta y en `cita` las frases TEXTUALES del programa
     que la sostienen. Si algo no está en ese PDF, no está aquí.

   · Las citas son reproducción parcial para estudio personal, con su
     procedencia, como permite el aviso de copyright del programa:
     © International Software Testing Qualifications Board (ISTQB®). En las
     tablas del programa la cita va celda por celda («Nombre — descripción»,
     «Ejemplo: …»); un error de la traducción LATAM (la fila de la
     manipulación de las solicitudes, 3.2.2) se avisa en el porqué.

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
     cita las frases textuales del syllabus que sostienen la respuesta
     pag  la página del PDF oficial donde está cada frase de `cita`
     pag  la página del PDF oficial donde está cada frase de `cita`
     pag  la página del PDF oficial donde está cada frase de `cita`
     pag  la página del PDF oficial donde está cada frase de `cita`
     pag  la página del PDF oficial donde está cada frase de `cita`

   `objetivos` trae, para cada objetivo de aprendizaje, su enunciado textual
   del programa: lo que el examen pide saber hacer con ese tema.
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
    syllabus: 'Programa de Estudios CT-GenAI v1.0 en español (LATAM, 25 jul 2025)',
    citaDe: 'Programa de Estudios CT-GenAI v1.0 (LATAM) · © ISTQB®',
    syllabusUrl: 'https://www.gasq.org/files/content/gasq/downloads/certification/ISTQB%20Syllabi/CT-GenAI%20-%20Syllabus%20v1.0%20LA-ES.pdf',
    requisito: 'ISTQB® Certified Tester Foundation Level (CTFL)'
  };

  /* ── Blueprint oficial: qué se pregunta y cuánto vale ───────────────── */
  /* Cap 1: 7 preg / 7 pts · Cap 2: 11 / 16 · Cap 3: 10 / 11
     Cap 4: 5 / 5 · Cap 5: 7 / 7   →   40 preguntas, 46 puntos            */
  const blueprint = [
    { lo: 'GenAI-1.1.1', k: 'K1', pts: 1, n: 1 },
    { lo: 'GenAI-1.1.2', k: 'K2', pts: 1, n: 2 },
    { lo: 'GenAI-1.1.3', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-1.1.4', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-1.2.1', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-1.2.2', k: 'K2', pts: 1, n: 1 },

    { lo: 'GenAI-2.1.1', k: 'K2', pts: 1, n: 2 },
    { lo: 'GenAI-2.1.2', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-2.1.3', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-2.2.1', k: 'K3', pts: 2, n: 1 },
    { lo: 'GenAI-2.2.2', k: 'K3', pts: 2, n: 1 },
    { lo: 'GenAI-2.2.3', k: 'K3', pts: 2, n: 1 },
    { lo: 'GenAI-2.2.4', k: 'K3', pts: 2, n: 1 },
    { lo: 'GenAI-2.2.5', k: 'K3', pts: 2, n: 1 },
    { lo: 'GenAI-2.3.1', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-2.3.2', k: 'K2', pts: 1, n: 1 },

    { lo: 'GenAI-3.1.1', k: 'K1', pts: 1, n: 1 },
    { lo: 'GenAI-3.1.2', k: 'K3', pts: 2, n: 1 },
    { lo: 'GenAI-3.1.3', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-3.1.4', k: 'K1', pts: 1, n: 1 },
    { lo: 'GenAI-3.2.1', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-3.2.2', k: 'K2', pts: 1, n: 2 },
    { lo: 'GenAI-3.2.3', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-3.3.1', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-3.4.1', k: 'K1', pts: 1, n: 1 },

    { lo: 'GenAI-4.1.1', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-4.1.2', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-4.1.3', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-4.2.1', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-4.2.2', k: 'K2', pts: 1, n: 1 },

    { lo: 'GenAI-5.1.1', k: 'K1', pts: 1, n: 1 },
    { lo: 'GenAI-5.1.2', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-5.1.3', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-5.1.4', k: 'K1', pts: 1, n: 1 },
    { lo: 'GenAI-5.2.1', k: 'K2', pts: 1, n: 1 },
    { lo: 'GenAI-5.2.2', k: 'K1', pts: 1, n: 1 },
    { lo: 'GenAI-5.2.3', k: 'K1', pts: 1, n: 1 }
  ];

  /* Títulos de capítulo, para el desglose del resultado */
  const capitulos = {
    1: 'Introducción a la IA generativa para las pruebas de software',
    2: 'Ingeniería de prompts para las pruebas de software efectivas',
    3: 'Gestión de riesgos de la IA generativa en las pruebas de software',
    4: 'Infraestructura de pruebas impulsada por los LLM',
    5: 'Despliegue e integración de la IA generativa en las organizaciones de prueba'
  };

  /* Enunciado textual de cada objetivo de aprendizaje (el «GenAI-x.y.z» del programa) */
  const objetivos = {
    'GenAI-1.1.1': 'Recordar diferentes tipos de IA: IA simbólica, aprendizaje automático clásico, aprendizaje profundo e IA generativa',
    'GenAI-1.1.2': 'Explicar los conceptos básicos de la IA generativa y los grandes modelos de lenguaje',
    'GenAI-1.1.3': 'Distinguir entre los LLM fundacionales, ajustados por instrucciones y de razonamiento',
    'GenAI-1.1.4': 'Resumir los principios fundamentales de los LLM multimodales y los modelos de visión y lenguaje',
    'GenAI-1.2.1': 'Dar ejemplos de capacidades clave de los LLM para las tareas de prueba',
    'GenAI-1.2.2': 'Comparar los modelos de interacción al usar la IA generativa para las pruebas de software',
    'GenAI-2.1.1': 'Dar ejemplos de la estructura de los prompts utilizados en la IA generativa para las pruebas de software',
    'GenAI-2.1.2': 'Diferenciar las técnicas fundamentales de prompts para las pruebas de software',
    'GenAI-2.1.3': 'Distinguir entre los prompts de sistema y los prompts de usuario',
    'GenAI-2.2.1': 'Aplicar la IA generativa a las tareas de análisis de prueba',
    'GenAI-2.2.2': 'Aplicar la IA generativa a las tareas del diseño de pruebas e implementación de pruebas',
    'GenAI-2.2.3': 'Aplicar la IA generativa a las pruebas de regresión automatizadas',
    'GenAI-2.2.4': 'Aplicar la IA generativa a las tareas de monitoreo de pruebas y control de pruebas',
    'GenAI-2.2.5': 'Seleccionar y aplicar las técnicas de prompts adecuadas para un contexto dado y una tarea de prueba',
    'GenAI-2.3.1': 'Resumir las métricas para evaluar los resultados de la IA generativa en las tareas de prueba',
    'GenAI-2.3.2': 'Dar ejemplos de técnicas para evaluar y refinar iterativamente los prompts',
    'GenAI-3.1.1': 'Recordar las definiciones de alucinaciones, errores de razonamiento y sesgos en los sistemas de IA generativa',
    'GenAI-3.1.2': 'Identificar las alucinaciones, los errores de razonamiento y los sesgos en los resultados de los LLM',
    'GenAI-3.1.3': 'Resumir las técnicas de mitigación de las alucinaciones de la IA generativa, los errores de razonamiento y los sesgos en las tareas de prueba de software',
    'GenAI-3.1.4': 'Recordar las técnicas de mitigación para el comportamiento no determinista de los LLM',
    'GenAI-3.2.1': 'Explicar los riesgos clave de privacidad y seguridad de datos asociados con el uso de la IA generativa en las pruebas de software',
    'GenAI-3.2.2': 'Dar ejemplos de privacidad de datos y vulnerabilidades en el uso de la IA generativa en las pruebas de software',
    'GenAI-3.2.3': 'Resumir las estrategias de mitigación para proteger la privacidad de los datos y mejorar la seguridad en la IA generativa para las pruebas de software',
    'GenAI-3.3.1': 'Explicar el impacto de las características de las tareas y el uso del modelo en el consumo de energía de la IA generativa en las pruebas de software',
    'GenAI-3.4.1': 'Recordar ejemplos de las regulaciones, los estándares y los marcos de trabajo de las mejores prácticas que son relevantes para la IA generativa en las pruebas de software',
    'GenAI-4.1.1': 'Explicar los componentes arquitectónicos clave y los conceptos de la infraestructura de pruebas impulsada por los LLM',
    'GenAI-4.1.2': 'Resumir la generación aumentada por recuperación (RAG)',
    'GenAI-4.1.3': 'Explicar el rol y la aplicación de los agentes impulsados por los LLM en la automatización de los procesos de prueba',
    'GenAI-4.2.1': 'Explicar el ajuste fino de los modelos de lenguaje para tareas de prueba específicas',
    'GenAI-4.2.2': 'Explicar las LLMOps y su papel en la implementación y gestión de los LLM para las tareas de prueba',
    'GenAI-5.1.1': 'Recordar los riesgos de la IA en la sombra (shadow AI)',
    'GenAI-5.1.2': 'Explicar los aspectos clave a considerar al definir una estrategia de IA generativa para las pruebas de software',
    'GenAI-5.1.3': 'Resumir los criterios clave para seleccionar los LLM o los SLM para las tareas de prueba de software en un contexto determinado',
    'GenAI-5.1.4': 'Recordar las fases clave en la adopción de la IA generativa en una organización de prueba',
    'GenAI-5.2.1': 'Explicar las habilidades esenciales y las áreas de conocimiento requeridas para que los probadores trabajen de manera efectiva con la IA generativa en los procesos de prueba',
    'GenAI-5.2.2': 'Recordar las estrategias para cultivar las habilidades de la IA en los equipos de prueba, con el fin de apoyar la adopción de la IA generativa en las actividades de prueba',
    'GenAI-5.2.3': 'Reconocer cómo cambian los procesos y las responsabilidades de las pruebas dentro de una organización de pruebas al adoptar la IA generativa para las pruebas'
  };

  /* Cada sección del programa: su título y la página del PDF donde empieza (las citas llevan la suya en `pag`) */
  const secciones = {
    '1.1.1': { t: 'Espectro de la IA: IA simbólica, aprendizaje automático clásico, aprendizaje profundo e IA generativa', pag: 14 },
    '1.1.2': { t: 'Conceptos básicos de la IA generativa y los grandes modelos de lenguaje (LLM)', pag: 14 },
    '1.1.3': { t: 'LLM fundacionales, ajustados por instrucciones y de razonamiento', pag: 16 },
    '1.1.4': { t: 'Los LLM multimodales y modelos de visión y lenguaje', pag: 16 },
    '1.2': { t: 'Aprovechamiento de la IA generativa en las pruebas de software: Principios fundamentales', pag: 17 },
    '1.2.1': { t: 'Capacidades clave de los LLM para las tareas de prueba', pag: 17 },
    '1.2.2': { t: 'Chatbots con IA y aplicaciones de prueba impulsadas por los LLM para las pruebas de software', pag: 18 },
    '2.1': { t: 'Desarrollo eficaz de prompts', pag: 21 },
    '2.1.1': { t: 'Estructura de los prompts para la IA generativa en las pruebas de software', pag: 21 },
    '2.1.2': { t: 'Técnicas fundamentales de prompting para las pruebas de software', pag: 22 },
    '2.1.3': { t: 'Prompt de sistema y prompt de usuario', pag: 23 },
    '2.2': { t: 'Aplicación de técnicas de ingeniería de prompts a las tareas de prueba de software', pag: 24 },
    '2.2.1': { t: 'Análisis de prueba con la IA generativa', pag: 24 },
    '2.2.2': { t: 'Diseño de pruebas e implementación de pruebas con la IA generativa', pag: 25 },
    '2.2.3': { t: 'Pruebas de regresión automatizadas con la IA generativa', pag: 27 },
    '2.2.4': { t: 'Monitoreo de pruebas y control de pruebas con la IA generativa', pag: 28 },
    '2.2.5': { t: 'Elección de técnicas de prompts para las pruebas de software', pag: 30 },
    '2.3': { t: 'Evaluar los resultados de la IA generativa y afinar los prompts para las tareas de prueba de software', pag: 31 },
    '2.3.1': { t: 'Métricas para evaluar los resultados de la IA generativa en las tareas de prueba', pag: 31 },
    '2.3.2': { t: 'Técnicas para evaluar y afinar iterativamente los prompts', pag: 32 },
    '3.1': { t: 'Alucinaciones, errores de razonamiento y sesgos', pag: 35 },
    '3.1.1': { t: 'Alucinaciones, errores de razonamiento y sesgos en la IA generativa', pag: 35 },
    '3.1.2': { t: 'Identificación de alucinaciones, errores de razonamiento y sesgos en los resultados de los LLM', pag: 35 },
    '3.1.3': { t: 'Técnicas de mitigación de las alucinaciones de la IA generativa, los errores de razonamiento y los sesgos en las tareas de prueba de software', pag: 37 },
    '3.1.4': { t: 'Mitigación del comportamiento no determinista de los LLM', pag: 37 },
    '3.2': { t: 'Privacidad de datos y riesgos de seguridad de la IA generativa en las pruebas de software', pag: 38 },
    '3.2.1': { t: 'Riesgos de privacidad y seguridad de datos asociados con el uso de la IA generativa', pag: 38 },
    '3.2.2': { t: 'Privacidad de datos y vulnerabilidades en la IA generativa para los procesos y las herramientas de prueba', pag: 39 },
    '3.2.3': { t: 'Estrategias de mitigación para proteger la privacidad de los datos y mejorar la seguridad en las pruebas con la IA generativa', pag: 39 },
    '3.3': { t: 'Consumo de energía e impacto ambiental de la IA generativa en las pruebas de software', pag: 40 },
    '3.3.1': { t: 'El impacto del uso de la IA generativa en el consumo de energía y las emisiones de CO₂', pag: 41 },
    '3.4': { t: 'Regulaciones, estándares y marcos de trabajo de las mejores prácticas de la IA', pag: 42 },
    '3.4.1': { t: 'Regulaciones, estándares y marcos de trabajo de la IA relevantes para la IA generativa en las pruebas de software', pag: 42 },
    '4.1': { t: 'Enfoques arquitectónicos para la infraestructura de pruebas impulsada por los LLM', pag: 44 },
    '4.1.1': { t: 'Componentes arquitectónicos clave y conceptos de la infraestructura de pruebas impulsada por los LLM', pag: 44 },
    '4.1.2': { t: 'Generación aumentada por recuperación (RAG)', pag: 45 },
    '4.1.3': { t: 'El papel de los agentes impulsados por los LLM en la automatización de los procesos de prueba', pag: 46 },
    '4.2': { t: 'Ajuste fino y las LLMOps: puesta en marcha de la IA generativa para las pruebas de software', pag: 46 },
    '4.2.1': { t: 'Ajuste fino de los LLM para las tareas de prueba', pag: 47 },
    '4.2.2': { t: 'Las LLMOps al desplegar y gestionar los LLM para las pruebas de software', pag: 48 },
    '5.1': { t: 'Hoja de ruta para la adopción de la IA generativa en las pruebas de software', pag: 49 },
    '5.1.1': { t: 'Riesgos de la IA en la sombra (shadow AI)', pag: 50 },
    '5.1.2': { t: 'Aspectos clave de una estrategia de la IA generativa en las pruebas de software', pag: 50 },
    '5.1.3': { t: 'Selección de los LLM o pequeños modelos de lenguaje (SLM) para las tareas de prueba de software', pag: 51 },
    '5.1.4': { t: 'Fases al adoptar la IA generativa en las pruebas de software', pag: 51 },
    '5.2': { t: 'Gestionar el cambio al adoptar la IA generativa para las pruebas de software', pag: 52 },
    '5.2.1': { t: 'Habilidades y conocimientos esenciales para realizar las pruebas con la IA generativa', pag: 52 },
    '5.2.2': { t: 'Desarrollo de capacidades en la IA generativa en los equipos de prueba', pag: 52 },
    '5.2.3': { t: 'Evolución de los procesos de prueba en las organizaciones con pruebas potenciadas por la IA', pag: 53 }
  };

  /* ══════════════════════════════════════════════════════════════════════
     CAPÍTULO 1 — Introducción a la IA generativa (7 preguntas, 7 puntos)
     ══════════════════════════════════════════════════════════════════════ */
  const banco = [

    { id: '1.1.1a', cap: 1, lo: 'GenAI-1.1.1', k: 'K1', pts: 1,
      q: '¿Cuál de las siguientes afirmaciones describe correctamente la <b>IA simbólica</b>?',
      o: [
        'Utiliza un sistema basado en reglas para imitar la toma de decisiones humana, representando el conocimiento mediante símbolos y reglas lógicas.',
        'Usa redes neuronales para aprender automáticamente características a partir de los datos, sin que el usuario tenga que definirlas manualmente.',
        'Es un enfoque basado en datos que requiere preparación de datos, selección de características y entrenamiento de modelos.',
        'Crea contenido nuevo (texto, imágenes, código) aprendiendo e imitando patrones de sus datos de entrenamiento.'
      ], r: 0,
      why: 'La IA simbólica representa el conocimiento mediante símbolos y reglas lógicas, y decide con un sistema basado en reglas. Las otras tres opciones describen, en este orden, el <b>aprendizaje profundo</b>, el <b>aprendizaje automático clásico</b> y la <b>IA generativa</b>: los otros tres tipos que el programa enumera dentro del espectro de la IA.',
      ref: '1.1.1',
      cita: [
        'La IA simbólica utiliza un sistema basado en reglas para imitar la toma de decisiones humanas.',
        'Esencialmente, la IA simbólica representa el conocimiento utilizando símbolos y reglas lógicas.'
      ],
      pag: [14, 14] },

    { id: '1.1.1b', cap: 1, lo: 'GenAI-1.1.1', k: 'K1', pts: 1,
      q: 'Un equipo quiere categorizar defectos y predecir problemas del software con un enfoque basado en datos que exige preparación de datos, selección de características y entrenamiento del modelo. ¿A qué tipo de IA corresponde esa descripción?',
      o: [
        'IA simbólica.',
        'Aprendizaje automático clásico.',
        'IA generativa.',
        'Aprendizaje profundo.'
      ], r: 1,
      why: 'El programa asocia explícitamente el <b>aprendizaje automático clásico</b> con la categorización de defectos y la predicción de problemas software, y lo define como un enfoque basado en datos que requiere preparación de datos, selección de características y entrenamiento de modelos. El aprendizaje profundo se distingue precisamente porque aprende las características automáticamente y no obliga al usuario a definirlas.',
      ref: '1.1.1',
      cita: [
        'El aprendizaje automático clásico es un enfoque basado en datos que requiere la preparación de datos, selección de características y el entrenamiento de modelos, y se puede utilizar para tareas como la categorización de defectos y la predicción de problemas de software.'
      ],
      pag: [14] },

    { id: '1.1.2a', cap: 1, lo: 'GenAI-1.1.2', k: 'K2', pts: 1,
      q: '¿Qué son las <b>incrustaciones</b> (embeddings) en un modelo de lenguaje grande?',
      o: [
        'El proceso de dividir el texto de entrada en unidades más pequeñas que el modelo procesa individualmente.',
        'Representaciones numéricas de los tokens que codifican sus relaciones semánticas, sintácticas y contextuales como vectores en un espacio de alta dimensión.',
        'La cantidad de texto precedente, medida en tokens, que el modelo puede tener en cuenta al generar una respuesta.',
        'El conjunto de hiperparámetros que controla la aleatoriedad del modelo durante la inferencia.'
      ], r: 1,
      why: 'Cada token se transforma en un vector en un espacio de alta dimensión; los tokens con significados o roles contextuales similares quedan posicionados muy cerca entre sí, y esa proximidad es lo que permite al LLM comprender relaciones entre palabras y conservar el contexto. Las otras opciones definen la <b>tokenización</b>, la <b>ventana de contexto</b> y los <b>hiperparámetros</b>.',
      ref: '1.1.2',
      cita: [
        'Las incrustaciones son representaciones numéricas de tokens que codifican sus relaciones semánticas, sintácticas y contextuales en un formato adecuado para su procesamiento por modelos de la IA generativa.',
        'Cada token se transforma en un vector en un espacio de alta dimensión, capturando información matizada sobre su significado y uso.'
      ],
      pag: [15, 15] },

    { id: '1.1.2b', cap: 1, lo: 'GenAI-1.1.2', k: 'K2', pts: 1,
      q: 'Un probador va a analizar registros de prueba muy extensos y compara dos modelos idénticos salvo por el tamaño de su ventana de contexto. ¿Qué debe esperar del modelo con la <b>ventana de contexto más grande</b>?',
      o: [
        'Producirá respuestas deterministas, porque una ventana mayor elimina el muestreo probabilístico.',
        'Reducirá el costo de inferencia, porque cuantos más tokens hay en contexto menos cálculo necesita el transformador.',
        'Mantendrá mejor la coherencia a lo largo de pasajes largos, pero a costa de mayor complejidad computacional y más tiempo de procesamiento.',
        'Dejará de necesitar tokenización, porque procesa el texto completo como una única unidad.'
      ], r: 2,
      why: 'El programa señala que una ventana de contexto más grande permite mantener la coherencia en pasajes más largos —cita justamente el análisis de registros de prueba grandes—, pero que aumentar el número de tokens en la ventana <b>también aumenta la complejidad computacional y el tiempo de procesamiento</b>. El comportamiento no determinista proviene de la naturaleza probabilística de la inferencia y de los hiperparámetros, no del tamaño de la ventana.',
      ref: '1.1.2',
      cita: [
        'Una ventana de contexto más grande permite que el modelo mantenga la coherencia en pasajes más largos, por ejemplo, al analizar registros de pruebas grandes.',
        'Sin embargo, aumentar el número de tokens en la ventana de contexto también aumenta la complejidad computacional y el tiempo de procesamiento necesarios para que el modelo funcione de manera efectiva.'
      ],
      pag: [15, 15] },

    { id: '1.1.2c', cap: 1, lo: 'GenAI-1.1.2', k: 'K2', pts: 1,
      q: 'Un probador envía tres veces el mismo prompt al mismo LLM y obtiene tres casos de prueba distintos. ¿Cuál es la explicación correcta según el programa de estudios?',
      o: [
        'El LLM ha sido reentrenado entre una petición y otra con los datos de las peticiones anteriores.',
        'Los LLM muestran comportamiento no determinista por la naturaleza probabilística de sus mecanismos de inferencia y por la configuración de los hiperparámetros.',
        'El prompt superó la ventana de contexto y el modelo descartó parte de la entrada.',
        'Se trata siempre de una alucinación, porque un modelo correcto devuelve la misma salida ante la misma entrada.'
      ], r: 1,
      why: 'Durante la inferencia el LLM predice el siguiente token de una secuencia, y esa aleatoriedad inherente puede dar lugar a variaciones en las salidas <b>incluso ante la misma entrada</b>. Es una propiedad del modelo, no un defecto ni una alucinación: el programa recuerda además que lo plausible no es necesariamente correcto.',
      ref: '1.1.2',
      cita: [
        'Los LLM exhiben un comportamiento no determinista principalmente debido a la naturaleza probabilística de sus mecanismos de inferencia y configuraciones de hiperparámetros.',
        'Esta aleatoriedad inherente puede conducir a variaciones en los resultados incluso cuando la misma entrada se proporciona varias veces.'
      ],
      pag: [15, 15] },

    { id: '1.1.3a', cap: 1, lo: 'GenAI-1.1.3', k: 'K2', pts: 1,
      q: '¿Qué distingue a un <b>LLM de razonamiento</b> de un LLM ajustado por instrucciones?',
      o: [
        'Se entrena desde cero con conjuntos de datos amplios y diversos, sin ninguna etapa previa.',
        'Es el único de los tres tipos capaz de procesar entradas de imagen además de texto.',
        'Amplía al modelo ajustado por instrucciones enfatizando capacidades cognitivas estructuradas: inferencia lógica, resolución de problemas en varios pasos y razonamiento en cadena.',
        'No necesita prompts estructurados, porque deduce por sí solo el rol y el formato de salida esperados.'
      ], r: 2,
      why: 'Los modelos de razonamiento parten de los ajustados por instrucciones y se entrenan además en tareas que exigen comprensión contextual, pasos de razonamiento intermedios y síntesis de información compleja, lo que los hace más adecuados para tareas de alta carga cognitiva. Entrenarse con conjuntos amplios y diversos describe a los modelos <b>fundacionales</b>; la multimodalidad es una característica aparte (1.1.4); y ningún tipo de modelo exime de escribir prompts bien estructurados.',
      ref: '1.1.3',
      cita: [
        'Los modelos de razonamiento amplían los modelos ajustados finamente por instrucciones al enfatizar las habilidades cognitivas estructuradas, como la inferencia lógica, la resolución de problemas de varios pasos y el razonamiento en cadena de pensamiento.'
      ],
      pag: [16] },

    { id: '1.1.3b', cap: 1, lo: 'GenAI-1.1.3', k: 'K2', pts: 1,
      q: '¿Cómo se obtiene un <b>LLM ajustado por instrucciones</b> y para qué sirve ese ajuste?',
      o: [
        'Se obtiene a partir de un modelo fundacional, ajustándolo con conjuntos de datos que emparejan instrucciones con respuestas esperadas, para alinearlo mejor con las instrucciones humanas.',
        'Se obtiene entrenando el modelo únicamente con código fuente, para que pueda generar scripts de prueba automatizados.',
        'Se obtiene aplicando generación aumentada por recuperación sobre un modelo fundacional, para darle acceso a datos de la organización.',
        'Se obtiene reduciendo el número de parámetros de un modelo fundacional, para que consuma menos recursos.'
      ], r: 0,
      why: 'El ajuste por instrucciones parte de los modelos fundacionales y usa conjuntos de datos que emparejan instrucciones con respuestas esperadas; el proceso optimiza el cumplimiento de tareas, el seguimiento de instrucciones y la coherencia de las respuestas. La generación aumentada por recuperación (4.1.2) y la reducción de parámetros (los SLM, 1.1.2) son cosas distintas.',
      ref: '1.1.3',
      cita: [
        'Derivados de los modelos fundacionales, los LLM ajustados por instrucciones se ajustan utilizando conjuntos de datos que combinan los prompts con las respuestas esperadas.',
        'Esta etapa mejora su alineación con las instrucciones humanas, mejorando la usabilidad en aplicaciones del mundo real.'
      ],
      pag: [16, 16] },

    { id: '1.1.4a', cap: 1, lo: 'GenAI-1.1.4', k: 'K2', pts: 1,
      q: 'En un LLM multimodal, ¿cómo se tratan las imágenes antes de que el modelo transformador las procese?',
      o: [
        'Se envían sin procesar al transformador, que trata cada píxel como un token independiente.',
        'Se convierten en incrustaciones utilizando modelos de visión y lenguaje.',
        'Se transcriben a una descripción textual con un tokenizador de subpalabras y luego se procesan como texto plano.',
        'Se almacenan en una base de datos vectorial y solo se recuperan si el prompt de sistema lo autoriza.'
      ], r: 1,
      why: 'Para tratar diversas modalidades la tokenización se adapta a cada tipo de dato: el programa dice expresamente que las imágenes <b>se convierten en incrustaciones utilizando modelos de visión y lenguaje</b> antes de ser procesadas en el modelo transformador.',
      ref: '1.1.4',
      cita: [
        'Para manejar varias modalidades, la tokenización se adapta para cada tipo de datos, por ejemplo, las imágenes se convierten en incrustaciones utilizando modelos de lenguaje de visión antes de procesarse en el modelo de transformador.'
      ],
      pag: [16] },

    { id: '1.1.4b', cap: 1, lo: 'GenAI-1.1.4', k: 'K2', pts: 1,
      q: '¿Qué oportunidad concreta ofrecen a las pruebas de software los LLM aumentados con modelos de visión y lenguaje?',
      o: [
        'Ejecutar automáticamente los scripts de prueba de interfaz gráfica sin necesidad de un marco de automatización.',
        'Garantizar que las capturas de pantalla generadas no contengan datos personales.',
        'Identificar discrepancias entre los resultados esperados y los elementos visuales reales de una captura de pantalla, y generar casos de prueba que combinan datos textuales y señales visuales.',
        'Sustituir la ventana de contexto por un almacenamiento visual ilimitado.'
      ], r: 2,
      why: 'Estos modelos pueden analizar capturas de pantalla y esquemas de interfaz gráfica junto con descripciones textuales asociadas —informes de defecto, historias de usuario—, lo que permite detectar discrepancias entre lo esperado y lo que realmente se ve, y generar casos de prueba más ricos que aumentan la cobertura. Nada de eso implica ejecutar pruebas ni anonimizar datos.',
      ref: '1.1.4',
      cita: [
        'La capacidad permite a los probadores identificar discrepancias entre los resultados esperados y los elementos visuales reales en una captura de pantalla.',
        'Además, los LLM aumentados con modelos de visión y lenguaje pueden generar casos de prueba ricos y realistas que incorporan datos textuales y señales visuales, lo que aumenta la cobertura general.'
      ],
      pag: [16, 17] },

    { id: '1.2.1a', cap: 1, lo: 'GenAI-1.2.1', k: 'K2', pts: 1,
      q: 'Un LLM ayuda al equipo a generar los <b>resultados esperados</b> de un conjunto de casos de prueba. ¿A cuál de las capacidades clave de los LLM para tareas de prueba corresponde?',
      o: [
        'Generación de datos de prueba.',
        'Análisis de los resultados de pruebas.',
        'Generación de oráculos de prueba.',
        'Creación del testware.'
      ], r: 2,
      why: 'El programa define la <b>generación de oráculos de prueba</b> como la capacidad de los LLM de ayudar a generar los resultados esperados. La generación de datos de prueba produce conjuntos de datos, valores límite y combinaciones; el análisis de resultados crea resúmenes y clasifica anomalías por severidad y prioridad; y la creación del testware cubre planes de prueba, informes de prueba e informes de defecto.',
      ref: '1.2.1',
      cita: [
        'Generación de oráculos de prueba: los LLM pueden ayudar a generar los resultados esperados.'
      ],
      pag: [17] },

    { id: '1.2.1b', cap: 1, lo: 'GenAI-1.2.1', k: 'K2', pts: 1,
      q: 'El equipo pasa las historias de usuario por un LLM y este señala ambigüedades e inconsistencias, y propone preguntas para llevar a la reunión con las partes interesadas. ¿Qué capacidad clave se está usando?',
      o: [
        'Análisis y mejora de requisitos.',
        'Soporte de la automatización de pruebas.',
        'Soporte de creación de casos de prueba.',
        'Generación de datos de prueba.'
      ], r: 0,
      why: 'El programa describe el <b>análisis y mejora de requisitos</b> como la capacidad de analizar requisitos y otros elementos de la base de prueba identificando ambigüedades, inconsistencias o información faltante, y de generar preguntas significativas para aclararlos durante las discusiones con las partes interesadas. Las otras opciones se ocupan de scripts, de casos de prueba y de datos, no de la calidad de la base de prueba.',
      ref: '1.2.1',
      cita: [
        'Análisis y mejora de requisitos: los LLM pueden ayudar a analizar los requisitos y otros elementos de la base de la prueba, identificando ambigüedades, inconsistencias o información faltante.',
        'Pueden generar preguntas significativas para ayudar a aclarar los requisitos durante las discusiones con las partes interesadas.'
      ],
      pag: [17, 17] },

    { id: '1.2.2a', cap: 1, lo: 'GenAI-1.2.2', k: 'K2', pts: 1,
      q: '¿Qué caracteriza a las <b>aplicaciones de prueba basadas en LLM</b> frente a los chatbot con IA?',
      o: [
        'Sustituyen la necesidad de ingeniería de prompts, porque el prompt lo genera la propia herramienta.',
        'Solo pueden emplearse para pruebas exploratorias y para la incorporación de nuevos probadores.',
        'Eliminan el comportamiento no determinista del LLM al ejecutarse dentro del marco de automatización.',
        'Integran las capacidades del LLM a través de API para realizar tareas de prueba bien definidas y a menudo automatizadas, con mayor personalización y escalabilidad.'
      ], r: 3,
      why: 'Las aplicaciones basadas en LLM integran el modelo por API para tareas bien definidas y automatizadas, y ofrecen más personalización y escalabilidad. El programa insiste en que, se interactúe como se interactúe, una implementación satisfactoria <b>requiere una sólida ingeniería de prompts</b>. La prueba exploratoria y la incorporación de nuevos probadores son escenarios propios del chatbot.',
      ref: '1.2.2',
      cita: [
        'Las aplicaciones de prueba impulsadas por los LLM, por el contrario, implican la integración de las capacidades de los LLM a través de las API para realizar tareas de prueba bien definidas y, a menudo, automatizadas.',
        'Estas aplicaciones ofrecen una mayor personalización y escalabilidad, lo que permite a las organizaciones y los proveedores de herramientas integrar la IA generativa en los marcos de trabajo de prueba existentes.'
      ],
      pag: [18, 18] },

    { id: '1.2.2b', cap: 1, lo: 'GenAI-1.2.2', k: 'K2', pts: 1,
      q: 'Una probadora necesita aclarar rápidamente conceptos de prueba y explorar de forma dinámica requisitos y posibles casos de prueba, refinando las respuestas de forma iterativa. ¿Qué modelo de interacción con IA generativa encaja mejor y por qué?',
      o: [
        'Un chatbot con IA, porque su interfaz de conversación permite retroalimentación rápida y refinar los resultados con encadenamiento de prompts.',
        'Una aplicación basada en LLM integrada por API, porque las tareas exploratorias exigen scripts automatizados.',
        'Un agente autónomo, porque las tareas exploratorias no admiten intervención humana.',
        'Un modelo fundacional sin ajuste, porque no está sesgado hacia ninguna tarea concreta.'
      ], r: 0,
      why: 'El programa sitúa a los <b>chatbots con IA</b> como especialmente efectivos para tareas rutinarias, prueba exploratoria e incorporación de nuevos probadores, con retroalimentación inmediata y refinamiento iterativo mediante encadenamiento de prompts; su interfaz intuitiva los hace además accesibles a las partes interesadas no técnicas. Las aplicaciones por API brillan en tareas repetitivas bien definidas, no en la exploración.',
      ref: '1.2.2',
      cita: [
        'Estos chatbots con IA son especialmente beneficiosos en escenarios que requieren retroalimentación rápida, aclaración de conceptos de prueba o exploración dinámica de requisitos y posibles casos de prueba.',
        'A través de técnicas como el encadenamiento de prompts, los probadores pueden refinar iterativamente los resultados, lo que hace que los chatbots sean particularmente efectivos para tareas rutinarias, pruebas exploratorias e incluso la incorporación de nuevos probadores al proporcionar un acceso rápido a los conocimientos y las prácticas de prueba.'
      ],
      pag: [18, 18] },

  /* ══════════════════════════════════════════════════════════════════════
     CAPÍTULO 2 — Ingeniería de prompts (11 preguntas, 16 puntos)
     ══════════════════════════════════════════════════════════════════════ */

    { id: '2.1.1a', cap: 2, lo: 'GenAI-2.1.1', k: 'K2', pts: 1,
      q: 'En un prompt estructurado para prueba de software se lee: <i>«Devuelve el resultado como una tabla con las columnas ID, precondición, pasos y resultado esperado»</i>. ¿A qué componente del prompt corresponde?',
      o: [
        'Restricciones.',
        'Formato de salida.',
        'Instrucciones.',
        'Contexto.'
      ], r: 1,
      why: 'El <b>formato de salida</b> indica el formato, la estructura o las características esperadas de la respuesta. Las <b>restricciones</b> describen limitaciones o consideraciones especiales que el LLM debe respetar; las <b>instrucciones</b> son las directivas sobre la tarea a realizar; y el <b>contexto</b> aporta los antecedentes sobre el objeto de prueba.',
      ref: '2.1.1',
      cita: [
        'Formato de salida: Las especificaciones de salida denotan el formato, la estructura o las características esperadas de la respuesta.'
      ],
      pag: [21] },

    { id: '2.1.1b', cap: 2, lo: 'GenAI-2.1.1', k: 'K2', pts: 1,
      q: '¿Cuáles son los <b>seis componentes</b> que suele incluir un prompt estructurado para las pruebas de software?',
      o: [
        'Rol, contexto, instrucciones, datos de entrada, restricciones y formato de salida.',
        'Rol, temperatura, semilla, contexto, ejemplos y formato de salida.',
        'Objetivo, riesgo, criterios de aceptación, datos de prueba, oráculo y cobertura.',
        'Prompt de sistema, prompt de usuario, ejemplos, cadena, meta-prompting y verificación.'
      ], r: 0,
      why: 'El programa enumera exactamente esos seis: <b>rol</b> (la perspectiva que adopta el modelo), <b>contexto</b> (los antecedentes), <b>instrucciones</b> (la tarea), <b>datos de entrada</b> (historias, criterios, capturas, código), <b>restricciones</b> (limitaciones a respetar) y <b>formato de salida</b>. Temperatura y semilla son hiperparámetros (3.1.4); las técnicas de prompting son otra cosa (2.1.2).',
      ref: '2.1.1',
      cita: [
        'Estos prompts siguen un formato estructurado que consta de seis componentes clave: rol, contexto, instrucciones, datos de entrada, restricciones y formato de salida.'
      ],
      pag: [22] },

    { id: '2.1.1c', cap: 2, lo: 'GenAI-2.1.1', k: 'K2', pts: 1,
      q: 'Un prompt empieza así: <i>«Actúa como ingeniero de automatización de pruebas con experiencia en marcos basados en palabras clave»</i>. ¿Qué componente es y para qué sirve?',
      o: [
        'Es el contexto: aporta los antecedentes del objeto de prueba.',
        'Son los datos de entrada: describe el material sobre el que hay que trabajar.',
        'Es el rol: define la perspectiva o personalidad que adopta el modelo, ayudándole a determinar sus responsabilidades y un tono o enfoque adecuados.',
        'Es una restricción: limita el tipo de respuesta que puede dar el modelo.'
      ], r: 2,
      why: 'El <b>rol</b> define la perspectiva o personalidad que debe adoptar el modelo al generar la respuesta; especificarlo le ayuda a determinar sus responsabilidades y a adoptar un tono o enfoque adecuado, como actuar de probador, director de pruebas o ingeniero de automatización de la prueba. El contexto y los datos de entrada aportan información sobre el objeto de prueba, no sobre quién responde.',
      ref: '2.1.1',
      cita: [
        'Rol: El rol define la perspectiva o persona que debe tomar el modelo de la IA generativa al generar una respuesta.',
        'Especificar el rol ayuda al LLM a determinar sus responsabilidades y adoptar un tono o enfoque apropiado, como actuar como probador, director de pruebas o ingeniero de automatización de pruebas.'
      ],
      pag: [21, 21] },

    { id: '2.1.2a', cap: 2, lo: 'GenAI-2.1.2', k: 'K2', pts: 1,
      q: '¿En qué consiste el <b>meta-prompting</b>?',
      o: [
        'En dividir una tarea en pasos intermedios y comprobar el resultado de cada uno antes de continuar.',
        'En incluir en el prompt varios ejemplos de entrada y salida deseada.',
        'En fijar de antemano el comportamiento del modelo para toda la sesión de conversación.',
        'En aprovechar la capacidad de la IA para generar o refinar sus propios prompts, en un ciclo iterativo en el que el probador evalúa y refina lo generado.'
      ], r: 3,
      why: 'El meta-prompting usa al propio LLM para generar o mejorar prompts, que después el probador evalúa y refina; es útil cuando la eficiencia importa o cuando el probador no está seguro de cómo redactar un prompt eficaz, y refleja un modo de <i>trabajo en pareja</i> con la herramienta. Las otras opciones describen el <b>encadenamiento de prompts</b>, el <b>prompting con pocos ejemplos</b> y el <b>prompt de sistema</b>.',
      ref: '2.1.2',
      cita: [
        'Meta-prompting aprovecha la capacidad de la IA para generar o refinar sus propios prompts.',
        'En un ciclo iterativo, el LLM puede generar prompts que pueden ser evaluados y refinados por el probador.'
      ],
      pag: [22, 22] },

    { id: '2.1.2b', cap: 2, lo: 'GenAI-2.1.2', k: 'K2', pts: 1,
      q: '¿Cuál es la diferencia entre prompting <b>sin ejemplos</b>, <b>con un ejemplo</b> y <b>con pocos ejemplos</b>?',
      o: [
        'Sin ejemplos se apoya en el conocimiento preexistente del modelo; con un ejemplo se aporta un caso que demuestra la salida deseada; con pocos ejemplos se aportan varios para consolidar el comportamiento de respuesta.',
        'Se refieren al número de veces que se repite el mismo prompt para promediar las salidas.',
        'Se refieren a cuántos modelos distintos se consultan antes de aceptar un resultado.',
        'Se refieren al número de pasos intermedios en que se divide una tarea compleja.'
      ], r: 0,
      why: 'Es la definición literal del programa: el prompting <b>sin ejemplos</b> se basa en el conocimiento preexistente del modelo, el de <b>un ejemplo</b> aporta un caso que demuestra el resultado deseado para una entrada dada, y el de <b>pocos ejemplos</b> contiene más de uno para consolidar aún más el comportamiento deseado. Dividir en pasos intermedios es el encadenamiento de prompts, y comparar varios modelos es una técnica de mitigación (3.1.3).',
      ref: '2.1.2',
      cita: [
        'Si bien el prompt sin ejemplos se basa en el conocimiento preexistente del modelo para generar una respuesta, el prompt con un solo ejemplo proporciona un ejemplo para demostrar el resultado deseado para una entrada dada.',
        'Los prompts con pocos ejemplos contienen más de un ejemplo (unos pocos) para consolidar aún más el comportamiento de respuesta deseado del modelo.'
      ],
      pag: [22, 22] },

    { id: '2.1.3a', cap: 2, lo: 'GenAI-2.1.3', k: 'K2', pts: 1,
      q: '¿Cuál de estas afirmaciones sobre el <b>prompt de sistema</b> es correcta?',
      o: [
        'Cambia con cada interacción y forma el contexto inmediato de cada respuesta.',
        'Permanece constante durante toda la sesión, define comportamiento, personalidad y parámetros operativos del LLM, y en la mayoría de las interfaces no es visible ni editable por el usuario del chatbot.',
        'Debe contener siempre los datos de entrada de la tarea, para que el modelo no los olvide.',
        'La define el usuario final del chatbot al principio de cada pregunta.'
      ], r: 1,
      why: 'El prompt de sistema lo define normalmente el desarrollador o el probador para guiar el comportamiento general del LLM, establece las reglas de toda la conversación y permanece constante durante la sesión; puede contener partes de un prompt estructurado, como el rol, el contexto y las restricciones. Lo que cambia en cada interacción, y es visible, es el <b>prompt de usuario</b>.',
      ref: '2.1.3',
      cita: [
        'Un prompt de sistema actúa como un conjunto de comandos predefinido que define el comportamiento, la personalidad y los parámetros operativos del LLM.',
        'El prompt de sistema se mantiene constante durante toda la sesión de interacción y establece el marco fundamental de cómo debe responder el LLM.',
        'El prompt de sistema suele ser definido por el desarrollador o probador, para guiar el comportamiento general del LLM, y no es visible o editable por el usuario del chatbot en la mayoría de las interfaces.'
      ],
      pag: [23, 23, 23] },

    { id: '2.1.3b', cap: 2, lo: 'GenAI-2.1.3', k: 'K2', pts: 1,
      q: 'Un equipo quiere que su asistente responda siempre con lenguaje formal, de forma concisa y alineado con las prácticas ISTQB, en todas las conversaciones de sus probadores. ¿Dónde debe fijarse esa configuración y por qué?',
      o: [
        'En el prompt de usuario, repitiéndola al inicio de cada pregunta para que no se pierda.',
        'En los datos de entrada, junto con las historias de usuario.',
        'En el prompt de sistema, porque establece las reglas para toda la conversación y permanece constante durante la sesión.',
        'En el formato de salida de cada prompt, porque afecta a la presentación de la respuesta.'
      ], r: 2,
      why: 'El uso típico es <b>configurar el prompt de sistema una vez al inicio</b> y enviar después sucesivos prompts de usuario; el LLM genera cada respuesta teniendo en cuenta las dos. El programa usa como ejemplo casi literal el de un asistente profesional de pruebas que responde con claridad, lenguaje formal y foco en prácticas alineadas con ISTQB.',
      ref: '2.1.3',
      cita: [
        'El prompt de sistema establece las reglas para toda la conversación.',
        'El prompt de sistema se mantiene constante durante toda la sesión de interacción y establece el marco fundamental de cómo debe responder el LLM.'
      ],
      pag: [23, 23] },

    { id: '2.2.1a', cap: 2, lo: 'GenAI-2.2.1', k: 'K3', pts: 2,
      q: 'Faltan dos semanas para la entrega y hay 60 historias de usuario por probar. El equipo dispone de datos históricos de defectos, sabe que el módulo de pagos está sujeto a cumplimiento normativo y necesita decidir dónde concentrar el esfuerzo. ¿Qué tarea de <b>análisis de prueba</b> con IA generativa aplica a esta situación?',
      o: [
        'Generación de condiciones de prueba basadas en la base de prueba, usando el procesamiento del lenguaje natural.',
        'Priorizar las condiciones de prueba en función del nivel de riesgo, considerando cumplimiento normativo, funciones orientadas al usuario y datos históricos de defectos.',
        'Identificar posibles defectos en la base de prueba buscando ambigüedades e inconsistencias.',
        'Realizar un análisis de cobertura asignando requisitos e historias de usuario a las condiciones de prueba.'
      ], r: 1,
      why: 'El problema es <b>dónde concentrar el esfuerzo</b>, es decir priorizar. El programa describe esta tarea así: con información sobre probabilidad e impacto del riesgo de la falla, y teniendo en cuenta aspectos como el cumplimiento normativo, las características orientadas al usuario (login, procesamiento de pagos) y los datos históricos de defectos, el LLM puede recomendar niveles de prioridad. Las otras tres son tareas reales de análisis de prueba, pero responden a preguntas distintas: qué probar, qué está mal escrito y qué ha quedado sin cubrir.',
      ref: '2.2.1',
      cita: [
        'Priorizar las condiciones de prueba en función del nivel de riesgo: con información sobre la probabilidad del riesgo y el impacto del riesgo de la falla para cada condición de prueba, un LLM puede ayudar a priorizar el esfuerzo de prueba.',
        'Al considerar aspectos como el cumplimiento regulatorio, las características orientadas al usuario (por ejemplo, la funcionalidad de inicio de sesión o el procesamiento de pagos) y los datos históricos de defectos, el LLM puede recomendar niveles de prioridad.'
      ],
      pag: [24, 24] },

    { id: '2.2.1b', cap: 2, lo: 'GenAI-2.2.1', k: 'K3', pts: 2,
      q: 'Tras cerrar el diseño de pruebas, la jefa de proyecto teme que algún requisito haya quedado sin probar en un producto con requisitos complejos. ¿Cómo puede ayudar la IA generativa en el análisis de prueba?',
      o: [
        'Sugiriendo técnicas de prueba adecuadas, como análisis de valores límite o partición por equivalencia.',
        'Generando datos de prueba sintéticos que cubran situaciones extremas.',
        'Reduciendo la temperatura del modelo para que las respuestas sean reproducibles.',
        'Realizando un análisis de cobertura: asignando los requisitos y las historias de usuario a las condiciones de prueba para determinar si se cubren todos los aspectos de la base de prueba.'
      ], r: 3,
      why: 'El <b>soporte al análisis de cobertura</b> es exactamente eso: mapear requisitos e historias contra condiciones de prueba para detectar lagunas, algo que el programa señala como especialmente útil en proyectos con requisitos complejos donde los huecos de cobertura acaban en defectos no detectados. Sugerir técnicas y generar datos son tareas distintas, y la temperatura pertenece a la mitigación del no determinismo (3.1.4).',
      ref: '2.2.1',
      cita: [
        'Soporte al análisis de cobertura: al mapear los requisitos y las historias de usuario para probar las condiciones, un LLM puede realizar un análisis de cobertura para determinar si todos los aspectos de la base de prueba están cubiertos.'
      ],
      pag: [24] },

    { id: '2.2.2a', cap: 2, lo: 'GenAI-2.2.2', k: 'K3', pts: 2,
      q: 'El equipo necesita datos que se parezcan a los de producción para probar un módulo de facturación, pero la base real contiene información personal de clientes y no puede salir del entorno productivo. ¿Qué tarea de diseño e implementación de prueba con IA generativa resuelve el problema?',
      o: [
        'Síntesis de datos de prueba: generar datos sintéticos representativos que preservan la privacidad, se asemejan a los de producción y cubren situaciones extremas.',
        'Generación automatizada de scripts de prueba a partir de los casos de prueba estructurados.',
        'Creación de cronograma y priorización de la ejecución según prioridad, riesgos y recursos.',
        'Generación de casos de prueba a partir de requisitos funcionales y no funcionales.'
      ], r: 0,
      why: 'La <b>síntesis de datos de prueba</b> está definida en el programa como la creación de datos sintéticos representativos que preservan la privacidad de los datos y se asemejan a los de producción, simulando escenarios realistas <b>sin exponer información confidencial</b>. Las otras tres opciones son tareas legítimas del mismo apartado, pero ninguna aborda el problema de la información personal.',
      ref: '2.2.2',
      cita: [
        'Síntesis de datos de prueba: la IA generativa puede crear datos de prueba sintéticos representativos que preserven la privacidad de los datos y que se asemejen a los datos de producción, cubriendo situaciones extremas y condiciones de prueba variadas.'
      ],
      pag: [26] },

    { id: '2.2.2b', cap: 2, lo: 'GenAI-2.2.2', k: 'K3', pts: 2,
      q: 'Un equipo tiene casos de prueba manuales bien estructurados y quiere convertirlos en scripts ejecutables para su marco de automatización, y poder ampliarlos cuando cambien los requisitos. ¿Qué puede hacer la IA generativa?',
      o: [
        'Ejecutar los casos de prueba y decidir por sí sola si el resultado es correcto, sin oráculo.',
        'Interpretar los pasos de la prueba y traducirlos a código compatible con diversos marcos de automatización, pudiendo actualizar o ampliar esos scripts según los nuevos requisitos.',
        'Sustituir el marco de automatización de pruebas por una conversación con un chatbot.',
        'Garantizar que los scripts generados no contengan defectos, al derivarse de casos de prueba ya revisados.'
      ], r: 1,
      why: 'El programa dice que la IA generativa puede generar procedimientos manuales y scripts automatizados <b>a partir de casos de prueba estructurados</b>, interpretando los pasos y traduciéndolos a código compatible con distintos marcos, y que esos scripts pueden actualizarse o ampliarse con nuevos requisitos. Lo que no hace es garantizar la corrección: el capítulo 3 recuerda que la salida generada debe verificarse según el riesgo asociado.',
      ref: '2.2.2',
      cita: [
        'Generación automatizada de scripts de prueba: la IA generativa puede generar procedimientos de prueba manuales y scripts de prueba automatizados a partir de casos de prueba estructurados, interpretando los pasos de prueba y traduciéndolos en código compatible con varios marcos de trabajo de automatización de pruebas.',
        'Estos scripts de prueba se pueden actualizar o ampliar en función de los nuevos requisitos.'
      ],
      pag: [26, 26] },

    { id: '2.2.3a', cap: 2, lo: 'GenAI-2.2.3', k: 'K3', pts: 2,
      q: 'La suite de regresión de interfaz gráfica falla cada sprint porque los localizadores cambian y las interacciones se modifican, aunque la funcionalidad sigue correcta. ¿Qué aplicación de IA generativa ataca directamente ese problema?',
      o: [
        'Análisis de impacto y optimización de pruebas sobre los cambios de código.',
        'Informes e información de prueba automatizados, con tableros de control e información predictiva.',
        'Pruebas autorreparables y pruebas adaptativas: ajustar automáticamente los scripts para gestionar cambios menores de la interfaz de usuario o de la API.',
        'Informes de defecto mejorados con registros, capturas y datos del entorno de prueba.'
      ], r: 2,
      why: 'El síntoma —fallas provocadas por cambios menores de interfaz, no por defectos— es justo lo que las <b>pruebas autorreparables y pruebas adaptativas</b> resuelven: la IA generativa ajusta los scripts para manejar cambios como localizadores dinámicos e interacciones modificadas, evitando fallas innecesarias y manteniendo estables los conjuntos de prueba. El análisis de impacto sirve para decidir <i>qué</i> reprobar tras un cambio de código, que es otra pregunta.',
      ref: '2.2.3',
      cita: [
        'Pruebas autorreparables y pruebas adaptativas: la IA generativa se puede utilizar para ajustar automáticamente los scripts de prueba para manejar cambios menores en la interfaz de usuario o la API, evitando fallas innecesarias de pequeñas modificaciones y asegurando que los conjuntos de pruebas permanezcan estables a lo largo del tiempo.',
        'La IA generativa puede adaptar automáticamente los scripts de prueba para manejar cambios como localizadores dinámicos e interacciones modificadas, reduciendo la necesidad de intervención manual.'
      ],
      pag: [27, 28] },

    { id: '2.2.3b', cap: 2, lo: 'GenAI-2.2.3', k: 'K3', pts: 2,
      q: 'Un cambio importante entra en la rama principal y la suite de regresión completa tarda ocho horas, tiempo que la ventana de integración continua no permite. ¿Qué uso de IA generativa es el adecuado?',
      o: [
        'Análisis de impacto y optimización de pruebas: analizar los cambios de código para identificar las áreas de alto riesgo y dirigir allí la regresión.',
        'Implementar los scripts con automatización basada en palabras clave.',
        'Generar informes de prueba detallados con métricas de éxito y fallas.',
        'Recopilar automáticamente informes de defecto completos con registros y capturas.'
      ], r: 0,
      why: 'El programa describe el <b>análisis de impacto y optimización de pruebas</b> como el uso de IA generativa para analizar los cambios en el código e identificar áreas de alto riesgo, permitiendo una regresión dirigida donde más se necesita: exactamente el problema de una ventana de ejecución que no da para la suite completa. Las otras opciones son actividades reales del mismo apartado, pero no reducen el alcance de la ejecución.',
      ref: '2.2.3',
      cita: [
        'Análisis de impacto y optimización de pruebas: la IA generativa se puede utilizar para analizar los cambios de código con el fin de identificar áreas de alto riesgo, lo que permite realizar pruebas de regresión específicas donde más se necesita.'
      ],
      pag: [27] },

    { id: '2.2.4a', cap: 2, lo: 'GenAI-2.2.4', k: 'K3', pts: 2,
      q: 'La dirección, que no es técnica, pide visibilidad semanal del avance de la prueba sin tener que leer los informes de la herramienta de gestión. ¿Qué tarea de monitoreo con IA generativa encaja?',
      o: [
        'Control de pruebas: reordenar prioridades, ajustar cronogramas y reasignar recursos.',
        'Mejora en la visualización de las métricas de prueba y los informes de prueba: tableros de control dinámicos y resúmenes en lenguaje natural para que todas las partes interesadas tengan acceso a las métricas relevantes.',
        'Información sobre la finalización de las pruebas, destacando éxitos y lecciones aprendidas.',
        'Generación de casos de prueba a partir de las historias de usuario pendientes.'
      ], r: 1,
      why: 'El programa asocia los <b>tableros de control dinámicos y los resúmenes en lenguaje natural</b> precisamente con asegurar que todas las partes interesadas tengan acceso a las métricas relevantes y una visión clara del avance. El control de pruebas actúa sobre el plan (prioridades, cronogramas, recursos) y los informes de finalización se generan al cerrar, no semanalmente para dirección.',
      ref: '2.2.4',
      cita: [
        'Mejora en la visualización de las métricas de prueba y los informes de prueba: la IA generativa puede ayudar en la creación de tableros de control dinámicos y resúmenes en lenguaje natural, asegurando que todas las partes interesadas tengan acceso a las métricas relevantes.'
      ],
      pag: [29] },

    { id: '2.2.4b', cap: 2, lo: 'GenAI-2.2.4', k: 'K3', pts: 2,
      q: 'A mitad de iteración, el análisis de tendencias detecta que la densidad de defectos de un módulo se dispara y que el avance va por debajo del plan. El equipo debe reaccionar. ¿Qué tarea de IA generativa corresponde a esa reacción?',
      o: [
        'Monitoreo de pruebas y análisis de métricas.',
        'Informes e información de prueba automatizados.',
        'Control de pruebas: aportar información para reordenar las prioridades de prueba, ajustar los cronogramas y reasignar los recursos.',
        'Análisis de impacto sobre los cambios recientes de código.'
      ], r: 2,
      why: 'Detectar la desviación es <b>monitoreo</b>; actuar sobre ella es <b>control de pruebas</b>, que el programa define como la asistencia de IA generativa para reordenar prioridades, ajustar cronogramas y reasignar recursos de modo que la prueba siga centrada en las áreas de alta prioridad. La pregunta describe explícitamente el momento de reaccionar, no el de observar.',
      ref: '2.2.4',
      cita: [
        'Control de pruebas: la IA generativa puede ayudar con el control de pruebas al proporcionar información para volver a priorizar las pruebas, ajustar los cronogramas de las pruebas y reasignar los recursos según sea necesario.'
      ],
      pag: [29] },

    { id: '2.2.5a', cap: 2, lo: 'GenAI-2.2.5', k: 'K3', pts: 2,
      q: 'Un equipo genera cada sprint decenas de escenarios en formato Gherkin y necesita que todos salgan con exactamente la misma estructura «dado-cuando-entonces». ¿Qué técnica de prompting es la más adecuada?',
      o: [
        'Encadenamiento de prompts, porque cada escenario debe verificarse antes del siguiente.',
        'Prompting con pocos ejemplos, porque la tarea es repetitiva y tiene un formato de salida específico y restringido.',
        'Meta-prompting, porque el modelo debe decidir el formato más adecuado.',
        'Prompting sin ejemplos, porque el modelo ya conoce la sintaxis Gherkin.'
      ], r: 1,
      why: 'La tabla de selección del programa asigna el <b>prompting con pocos ejemplos</b> a las tareas repetitivas o con formatos de salida específicos o restringidos, y cita expresamente los casos de prueba en formato Gherkin, la prueba guiada por palabras clave y los informes con formato fijo. El encadenamiento se reserva a tareas complejas con verificación humana por paso, y el meta-prompting a tareas flexibles o nuevas.',
      ref: '2.2.5',
      cita: [
        'Prompts con pocos ejemplos — Tareas de formato de salida repetitivas o específicas o restringidas: Proporciona ejemplos a la IA generativa para la generación repetitiva con un patrón específico, por ejemplo, en casos de prueba al estilo Gherkin (por ejemplo, basados en escenarios), pruebas basadas en palabras clave o informes de prueba con un formato de salida específico.'
      ],
      pag: [30] },

    { id: '2.2.5b', cap: 2, lo: 'GenAI-2.2.5', k: 'K3', pts: 2,
      q: 'Hay que analizar una historia de usuario compleja: primero detectar ambigüedades, luego evaluar la capacidad de prueba y por último la integridad de los criterios de aceptación, revisando el resultado en cada etapa antes de seguir. ¿Qué técnica corresponde?',
      o: [
        'Prompting con pocos ejemplos.',
        'Prompting sin ejemplos.',
        'Encadenamiento de prompts.',
        'Meta-prompting.'
      ], r: 2,
      why: 'El <b>encadenamiento de prompts</b> divide la tarea en pasos intermedios cuyo resultado se comprueba y refina antes de pasar al siguiente, de modo que cada respuesta informa al prompt siguiente. El programa lo recomienda para tareas complejas que requieren precisión con verificación humana en cada paso, y usa este mismo ejercicio —ambigüedades, capacidad de prueba, integridad— como ejemplo.',
      ref: '2.2.5 · 2.1.2',
      cita: [
        'El encadenamiento de prompts implica dividir una tarea en una serie de pasos intermedios (prompts múltiples).',
        'El resultado de cada paso se comprueba y refina manual o automáticamente antes de pasar al siguiente paso.'
      ],
      pag: [22, 22] },

    { id: '2.2.5c', cap: 2, lo: 'GenAI-2.2.5', k: 'K3', pts: 2,
      q: 'Una probadora se enfrenta a una tarea nueva —detección de anomalías en informes de prueba— y no sabe cómo redactar un prompt eficaz. ¿Qué técnica le recomienda el programa, y puede combinarse con otras?',
      o: [
        'Meta-prompting, y sí: puede usarse para crear un prompt inicial que después se enriquezca con ejemplos y se divida en subtareas para validar los pasos intermedios.',
        'Prompting con pocos ejemplos, y no: combinar técnicas confunde al modelo.',
        'Encadenamiento de prompts, y no: cada técnica debe usarse por separado.',
        'Prompting sin ejemplos, y sí: siempre debe empezarse sin ejemplos para no sesgar al modelo.'
      ], r: 0,
      why: 'El <b>meta-prompting</b> es la recomendada para tareas flexibles y dinámicas y para crear prompts de tareas nuevas —el programa cita el análisis de informes de prueba y la detección de anomalías—. Además dice explícitamente que <b>es posible utilizar múltiples técnicas para un solo caso de uso</b>: meta-prompting para el prompt inicial, pocos ejemplos para afinar el patrón y encadenamiento para validar los pasos intermedios.',
      ref: '2.2.5',
      cita: [
        'Incluso es posible utilizar múltiples técnicas para un solo caso de uso. Por ejemplo, los meta-prompt se pueden usar para crear un prompt inicial. Esta indicación generada puede contener ejemplos que deben adaptarse y mejorarse (prompts con pocos ejemplos). Por último, puede ser útil dividir la tarea en subtareas más pequeñas para permitir la validación de los pasos intermedios (encadenamiento de prompts).'
      ],
      pag: [30] },

    { id: '2.3.1a', cap: 2, lo: 'GenAI-2.3.1', k: 'K2', pts: 1,
      q: 'Se quiere medir <b>en qué grado los casos de prueba generados cubren la partición de equivalencia válida e inválida</b> de una clase de datos. ¿Qué métrica de evaluación de resultados de IA generativa es?',
      o: [
        'Precisión.',
        'Exactitud.',
        'Recuperación.',
        'Diversidad.'
      ], r: 2,
      why: 'La <b>recuperación</b> mide la capacidad del modelo de identificar todas las instancias relevantes dentro de un conjunto de datos, y el programa usa como ejemplo exactamente la cobertura de las particiones de equivalencia válida e inválida. La <b>exactitud</b> mide la corrección general frente a un estándar; la <b>precisión</b>, la corrección respecto a un objetivo concreto; y la <b>diversidad</b>, que se cubra una amplia gama de entradas y escenarios sin repetición.',
      ref: '2.3.1',
      cita: [
        'Recuperación — Mide la capacidad de un modelo para identificar todas las instancias relevantes dentro de un conjunto de datos.',
        'Ejemplo: El grado en que los casos de prueba generados cubren las particiones de equivalencia válidas e inválidas de una clase de datos.'
      ],
      pag: [31, 31] },

    { id: '2.3.1b', cap: 2, lo: 'GenAI-2.3.1', k: 'K2', pts: 1,
      q: 'Un equipo mide qué proporción de los scripts de prueba generados se ejecutan sin errores de sintaxis ni problemas de formato en un entorno que funciona correctamente. Además, ¿qué precaución exige el programa al usar métricas con IA generativa?',
      o: [
        'Es la tasa de éxito de ejecución, y dada la naturaleza no determinista de la IA generativa las métricas deben basarse en datos estadísticamente relevantes.',
        'Es la eficiencia temporal, y basta con una única medición porque el modelo es determinista.',
        'Es la precisión, y solo puede calcularse mediante revisión manual.',
        'Es la relevancia y adecuación contextual, y debe medirse siempre con un segundo LLM como juez.'
      ], r: 0,
      why: 'La <b>tasa de éxito de ejecución</b> mide la proporción de casos de prueba o scripts de prueba generados que pueden ejecutarse con éxito. Y el programa advierte de forma expresa que, dada la naturaleza no determinista de la IA generativa, <b>las métricas deben basarse en datos estadísticamente relevantes</b>; la evaluación puede hacerse por revisión manual o automatizarse comparando con una referencia predefinida.',
      ref: '2.3.1',
      cita: [
        'Tasa de éxito de ejecución — Mide la proporción de casos de prueba generados o scripts de prueba que se pueden ejecutar con éxito.',
        'Dada la naturaleza no determinista de la IA generativa, las métricas deben basarse en datos estadísticamente relevantes.'
      ],
      pag: [31, 31] },

    { id: '2.3.2a', cap: 2, lo: 'GenAI-2.3.2', k: 'K2', pts: 1,
      q: 'Un equipo crea tres redacciones distintas del mismo prompt y compara cuál produce mejores resultados según métricas definidas de antemano. ¿Qué técnica de refinamiento de prompts está aplicando?',
      o: [
        'Modificación iterativa de prompts.',
        'Pruebas A/B de prompts.',
        'Análisis de resultados.',
        'Integrar la retroalimentación de los usuarios.'
      ], r: 1,
      why: 'Las <b>pruebas A/B de prompts</b> consisten en crear varias versiones y evaluar cuál produce mejores resultados según métricas predefinidas, para determinar qué redacción o estructura da resultados más precisos y relevantes. La modificación iterativa parte de un prompt básico y lo va ajustando; el análisis de resultados examina las salidas en busca de imprecisiones; y la retroalimentación recoge la opinión de los probadores.',
      ref: '2.3.2',
      cita: [
        'Pruebas A/B de prompts: cree múltiples versiones de prompts y evalúe qué versión produce mejores resultados en función de las métricas predefinidas.'
      ],
      pag: [32] },

    { id: '2.3.2b', cap: 2, lo: 'GenAI-2.3.2', k: 'K2', pts: 1,
      q: 'Sobre el ajuste de la longitud y la especificidad de los prompts, ¿qué afirma el programa de estudios?',
      o: [
        'Cuanto más largo y detallado sea el prompt, mejor será siempre la respuesta.',
        'La longitud es irrelevante mientras el prompt incluya los seis componentes.',
        'Conviene experimentar: a veces añadir más contexto mejora la calidad de la respuesta y en otros casos los prompts más breves dan lugar a una mejor generalización.',
        'Los prompts deben ser lo más cortos posible para no agotar la ventana de contexto.'
      ], r: 2,
      why: 'El programa presenta el ajuste de longitud y especificidad como una técnica de <b>experimentación</b>, no como una regla fija: a veces más contexto mejora la respuesta, en otros casos prompts más breves generalizan mejor. Junto a ella recomienda compartir prácticas y bibliotecas de prompts en el equipo para estandarizar y mantener la calidad.',
      ref: '2.3.2',
      cita: [
        'Ajustar la longitud y la especificidad del prompt: experimente con diferentes longitudes y niveles de detalle del prompt.',
        'A veces, agregar más contexto puede mejorar la calidad de la respuesta.',
        'En otros casos, los prompts más cortos pueden producir una mejor generalización.'
      ],
      pag: [32, 32, 32] },

  /* ══════════════════════════════════════════════════════════════════════
     CAPÍTULO 3 — Gestión de riesgos (10 preguntas, 11 puntos)
     ══════════════════════════════════════════════════════════════════════ */

    { id: '3.1.1a', cap: 3, lo: 'GenAI-3.1.1', k: 'K1', pts: 1,
      q: '¿Cuál es la definición de <b>error de razonamiento</b> en un LLM?',
      o: [
        'Un resultado que parece incorrecto desde el punto de vista factual o irrelevante para la tarea encomendada.',
        'Una variación en la salida ante la misma entrada, provocada por el muestreo probabilístico.',
        'Una preferencia por ciertos tipos de información o suposiciones heredada de los datos de entrenamiento.',
        'La interpretación errónea de estructuras lógicas —causa y efecto, lógica condicional, resolución paso a paso— que lleva a conclusiones incorrectas.'
      ], r: 3,
      why: 'Los errores de razonamiento se producen cuando el LLM interpreta mal estructuras lógicas y llega a conclusiones incorrectas; a diferencia de las personas, los LLM carecen de verdadero razonamiento lógico y se apoyan en la comparación de patrones. Las otras opciones definen la <b>alucinación</b>, el <b>comportamiento no determinista</b> y el <b>sesgo</b>.',
      ref: '3.1.1',
      cita: [
        'Los errores de razonamiento ocurren cuando los LLM malinterpretan las estructuras lógicas, como las relaciones de causa y efecto, la lógica condicional o los procesos de resolución de problemas paso a paso, lo que lleva a conclusiones incorrectas.'
      ],
      pag: [35] },

    { id: '3.1.1b', cap: 3, lo: 'GenAI-3.1.1', k: 'K1', pts: 1,
      q: 'Según el programa de estudios, ¿de dónde provienen los <b>sesgos</b> de un LLM y cómo se manifiestan en las pruebas de software?',
      o: [
        'Provienen de los datos con los que se entrenó el modelo, y pueden influir en las respuestas al generar datos de prueba o refinar criterios de aceptación.',
        'Provienen de una temperatura mal configurada, y se manifiestan como variaciones entre ejecuciones.',
        'Provienen de prompts demasiado cortos, y desaparecen al añadir el formato de salida.',
        'Provienen de la ventana de contexto, y se manifiestan cuando la entrada supera su límite.'
      ], r: 0,
      why: 'El programa dice que los sesgos <b>provienen de los datos con los que se entrenó el modelo</b> y pueden dar lugar a resultados que favorecen ciertos tipos de información, enfoques o suposiciones —por ejemplo, modelos entrenados sobre todo con datos en inglés que subrepresentan perspectivas no anglosajonas—. En prueba influyen al generar datos de prueba o al refinar criterios de aceptación.',
      ref: '3.1.1',
      cita: [
        'Los sesgos de los LLM (Gallegos 2024) provienen de los datos sobre los que se entrenó el modelo.',
        'En las pruebas de software, los sesgos pueden influir en las respuestas de los LLM cuando, por ejemplo, se generan datos de prueba o se refinan los criterios de aceptación para los casos de prueba.'
      ],
      pag: [35, 35] },

    { id: '3.1.2a', cap: 3, lo: 'GenAI-3.1.2', k: 'K3', pts: 2,
      q: 'Un LLM devuelve una lista de casos de prueba para una historia de usuario. Al revisarla, la probadora ve que tres de ellos verifican un criterio de aceptación que no aparece en ninguna parte de la historia ni de la documentación. ¿Qué problema ha identificado y cómo lo confirma?',
      o: [
        'Un sesgo; se confirma revisando si las pruebas no funcionales están infrarrepresentadas.',
        'Un error de razonamiento; se confirma con validación lógica del flujo del texto generado.',
        'Comportamiento no determinista; se confirma repitiendo el prompt y comparando salidas.',
        'Una alucinación; se confirma comparando la salida con la documentación, los requisitos y el comportamiento conocido del sistema.'
      ], r: 3,
      why: 'Sugerir casos de prueba que verifican <b>criterios de aceptación inexistentes</b> es uno de los ejemplos literales de alucinación que da el programa. El método de detección que le corresponde es comparar los resultados generados con la documentación existente, los requisitos y el comportamiento conocido del sistema, apoyándose además en expertos del dominio y en comprobaciones de consistencia.',
      ref: '3.1.2 · 3.1.1',
      cita: [
        'Verificación cruzada: compare los resultados generados por la IA con la documentación existente, los requisitos y el comportamiento conocido del sistema.'
      ],
      pag: [35] },

    { id: '3.1.2b', cap: 3, lo: 'GenAI-3.1.2', k: 'K3', pts: 2,
      q: 'Se pide a un LLM que priorice un conjunto de pruebas teniendo en cuenta dependencias entre casos y estimaciones de esfuerzo. La lista devuelta coloca un caso antes que otro del que depende, y los totales de esfuerzo no cuadran. ¿Qué problema es y qué técnica de detección aplica?',
      o: [
        'Una alucinación; se detecta consultando a expertos del dominio.',
        'Un error de razonamiento; se detecta con la validación lógica —evaluar el flujo lógico del contenido generado— y comparando la salida con el resultado exacto que se debe lograr.',
        'Un sesgo de los datos de entrenamiento; se detecta revisando la representatividad de los datos de prueba sintéticos.',
        'Una vulnerabilidad de seguridad; se detecta con una auditoría de seguridad.'
      ], r: 1,
      why: 'La planificación de la prueba y la priorización de casos son los ejemplos que el programa da de tareas que exigen razonamiento lógico y donde los LLM cometen <b>errores de razonamiento</b>. Su detección pasa por la validación lógica —consistencia, coherencia y razonamiento estructurado del texto generado— y por probar la salida, comparándola con el resultado exacto esperado.',
      ref: '3.1.2 · 3.1.1',
      cita: [
        'La planificación de las pruebas y la priorización de los casos de prueba son ejemplos de tareas de prueba que requieren razonamiento lógico y donde los LLM pueden cometer errores de razonamiento.',
        'Validación lógica: Evaluar el flujo lógico (por ejemplo, la consistencia, la coherencia y el razonamiento estructurado dentro del texto generado) del contenido generado por la IA en cuanto a la coherencia y la capacidad de ser correcto a través de ciclos de revisión.'
      ],
      pag: [35, 36] },

    { id: '3.1.2c', cap: 3, lo: 'GenAI-3.1.2', k: 'K3', pts: 2,
      q: 'Al revisar un lote de testware generado por la IA generativa, el equipo observa que las pruebas no funcionales aparecen sistemáticamente infrarrepresentadas frente a las funcionales. ¿Qué problema refleja y a qué categoría de detección pertenece?',
      o: [
        'Una alucinación, detectable con comprobaciones de consistencia entre salidas.',
        'Un error de razonamiento, detectable ejecutando los scripts generados.',
        'Un sesgo, detectable al evaluar sesgos relacionados con los tipos de prueba en el resultado generado por el LLM.',
        'Una falla de la ventana de contexto, detectable midiendo el recuento de tokens.'
      ], r: 2,
      why: 'Entre los enfoques de <b>detección del sesgo</b>, el programa incluye textualmente evaluar los sesgos relacionados con los tipos de prueba, «como las pruebas no funcionales subrepresentadas en el resultado generado del LLM», junto con revisar cómo el testware generado —los datos de prueba sintéticos, por ejemplo— se representa de manera justa y precisa en relación con la estrategia de pruebas.',
      ref: '3.1.2',
      cita: [
        'Evaluar los sesgos relacionados con los tipos de prueba, como las pruebas no funcionales subrepresentadas en el resultado generado del LLM.'
      ],
      pag: [36] },

    { id: '3.1.3a', cap: 3, lo: 'GenAI-3.1.3', k: 'K2', pts: 1,
      q: '¿Cuál de las siguientes <b>NO</b> es una técnica de mitigación de alucinaciones, errores de razonamiento y sesgos según el programa de estudios?',
      o: [
        'Proporcionar un contexto completo en el prompt.',
        'Dividir los prompts complejos en segmentos manejables verificando cada resultado.',
        'Fijar la temperatura a cero, con lo que se eliminan las alucinaciones del modelo.',
        'Comparar los resultados entre los modelos, evaluando el mismo prompt con varios LLM.'
      ], r: 2,
      why: 'Reducir la temperatura es una técnica de mitigación del <b>comportamiento no determinista</b> (3.1.4): estrecha la distribución de probabilidad y reduce la variabilidad, pero el programa no dice en ningún momento que elimine las alucinaciones —y advierte de que limita la creatividad y la diversidad de las respuestas—. Las otras tres sí figuran entre las técnicas de 3.1.3, junto con usar formatos de datos claros e interpretables y seleccionar el modelo adecuado para la tarea.',
      ref: '3.1.3 · 3.1.4',
      cita: [
        'Ajustar la configuración de los parámetros de temperatura del LLM: bajar la temperatura durante la generación de las respuestas (inferencia) reduce la distribución de probabilidad, reduciendo la aleatoriedad y dando como resultado resultados más consistentes.'
      ],
      pag: [37] },

    { id: '3.1.3b', cap: 3, lo: 'GenAI-3.1.3', k: 'K2', pts: 1,
      q: '¿Cuándo son más probables las alucinaciones, los errores de razonamiento y los sesgos, y qué dos técnicas complementarias remite el programa al capítulo 4?',
      o: [
        'Son más probables cuando los prompts no están bien diseñados o faltan datos contextuales; las técnicas complementarias son la generación aumentada por recuperación y el ajuste fino.',
        'Son más probables con modelos de razonamiento; las técnicas complementarias son la tokenización y las incrustaciones.',
        'Son más probables cuando se usa un chatbot en vez de una API; las técnicas complementarias son LLMOps y la orquestación de agentes.',
        'Son más probables con ventanas de contexto pequeñas; las técnicas complementarias son la anonimización y la minimización de datos.'
      ], r: 0,
      why: 'El programa afirma que estos problemas son más probables cuando los prompts no están diseñados adecuadamente o cuando faltan datos contextuales relevantes para la tarea, y cierra el apartado remitiendo al capítulo 4 para dos técnicas complementarias que mejoran los resultados del LLM: la <b>generación aumentada por recuperación</b> y el <b>ajuste fino</b>.',
      ref: '3.1.3',
      cita: [
        'Es más probable que estos problemas ocurran cuando los prompts no están diseñados correctamente (consulte el Capítulo 2) o cuando faltan datos de entrada contextuales relevantes para una tarea de prueba determinada.',
        'El capítulo 4 presenta dos técnicas complementarias para mejorar los resultados de los LLM: generación aumentada por recuperación (RAG) y el ajuste fino.'
      ],
      pag: [37, 37] },

    { id: '3.1.4a', cap: 3, lo: 'GenAI-3.1.4', k: 'K1', pts: 1,
      q: '¿Qué estrategias recoge el programa para reducir la variabilidad del comportamiento no determinista de los LLM?',
      o: [
        'Aumentar la temperatura y ampliar la ventana de contexto.',
        'Reducir la temperatura durante la inferencia y, si la implementación lo permite, configurar una semilla aleatoria, aunque no se pueda garantizar una reproducibilidad completa.',
        'Reentrenar el modelo con las salidas anteriores hasta que converjan.',
        'Usar exclusivamente modelos de razonamiento, que son deterministas por diseño.'
      ], r: 1,
      why: 'Reducir la temperatura estrecha la distribución de probabilidad y da resultados más consistentes; algunas implementaciones permiten fijar una <b>semilla</b> para el generador de números aleatorios, mejorando la reproducibilidad. El programa deja claro que <b>no se puede garantizar una reproducibilidad completa</b>, sobre todo con salidas largas.',
      ref: '3.1.4',
      cita: [
        'Si bien no se puede garantizar la reproducibilidad completa, ciertas estrategias pueden ayudar a reducir la variabilidad:',
        'Ajustar la configuración de los parámetros de temperatura del LLM: bajar la temperatura durante la generación de las respuestas (inferencia) reduce la distribución de probabilidad, reduciendo la aleatoriedad y dando como resultado resultados más consistentes.',
        'Configuración de semillas aleatorias: algunas implementaciones de los LLM permiten establecer un valor de semilla para el generador de números aleatorios, asegurando que se use la misma secuencia pseudoaleatoria (es decir, valores aleatorios deterministas), lo que mejora la reproducibilidad.'
      ],
      pag: [37, 37, 37] },

    { id: '3.1.4b', cap: 3, lo: 'GenAI-3.1.4', k: 'K1', pts: 1,
      q: '¿Qué efecto secundario tiene bajar el parámetro de temperatura de un LLM?',
      o: [
        'Aumenta el consumo energético del modelo durante la inferencia.',
        'Reduce el tamaño efectivo de la ventana de contexto.',
        'Limita la creatividad y la diversidad de las respuestas, haciendo los resultados más repetitivos o excesivamente deterministas.',
        'Impide el uso de entradas multimodales.'
      ], r: 2,
      why: 'El propio apartado lo advierte: bajar la temperatura reduce la aleatoriedad y da resultados más consistentes, pero <b>también limita la creatividad y la diversidad</b>, haciendo que las respuestas resulten más repetitivas o excesivamente deterministas. No tiene relación con el consumo energético, con la ventana de contexto ni con la multimodalidad.',
      ref: '3.1.4',
      cita: [
        'Sin embargo, esto también limitará la creatividad y la diversidad en las respuestas, haciendo que los resultados sean más repetitivos o demasiado deterministas.'
      ],
      pag: [37] },

    { id: '3.2.1a', cap: 3, lo: 'GenAI-3.2.1', k: 'K2', pts: 1,
      q: 'Un equipo pega registros de producción con datos de clientes en una herramienta de IA generativa comercial para que los analice. ¿Qué riesgo de privacidad describe mejor la situación?',
      o: [
        'Impacto medioambiental por consumo energético.',
        'Falta de control sobre el uso de datos: la herramienta puede almacenar y procesar datos confidenciales sin consentimiento explícito ni control del usuario, con posible uso indebido o acceso no autorizado.',
        'Sobreajuste del modelo a los datos de la organización.',
        'Error de razonamiento al interpretar los registros.'
      ], r: 1,
      why: 'Es uno de los tres riesgos de privacidad que enumera el programa, junto con la <b>exposición no intencional de datos</b> (que el modelo revele accidentalmente información confidencial) y los <b>riesgos de cumplimiento</b> derivados de usar herramientas de IA generativa sin respetar normativas de protección de datos como el GDPR, lo que podría acabar en disputas legales.',
      ref: '3.2.1',
      cita: [
        'Falta de control sobre el uso de datos: las herramientas la IA generativa pueden almacenar y procesar datos confidenciales sin el consentimiento o control explícito del usuario.',
        'Esto puede dar lugar a un posible uso indebido o acceso no autorizado.'
      ],
      pag: [38, 38] },

    { id: '3.2.1b', cap: 3, lo: 'GenAI-3.2.1', k: 'K2', pts: 1,
      q: '¿Cuál de los siguientes es un riesgo de <b>seguridad</b> específico que el programa asocia a probar con IA generativa?',
      o: [
        'Que la infraestructura de prueba dotada de LLM sea vulnerable a ataques como violaciones de datos o accesos no autorizados.',
        'Que el modelo consuma más energía de la presupuestada.',
        'Que los casos de prueba generados sean demasiado numerosos para ejecutarlos.',
        'Que el proveedor del LLM cambie su modelo de precios.'
      ], r: 0,
      why: 'El programa lista tres riesgos de seguridad: que la <b>infraestructura de prueba dotada de LLM</b> sea vulnerable a violaciones de datos o accesos no autorizados, que actores maliciosos exploten vulnerabilidades del LLM —como los ataques de manipulación— para alterar su comportamiento o extraer información confidencial, y que se introduzcan intencionadamente datos maliciosos para engañar al modelo.',
      ref: '3.2.1',
      cita: [
        'La Infraestructura de pruebas impulsada por los LLM puede ser vulnerable a ataques de seguridad, como violaciones de datos o acceso no autorizado.'
      ],
      pag: [38] },

    { id: '3.2.2a', cap: 3, lo: 'GenAI-3.2.2', k: 'K2', pts: 1,
      q: 'Un atacante envía prompts extraordinariamente largos para superar la ventana de contexto del LLM y sobrecargar su memoria, con la esperanza de que revele fragmentos de sus datos de entrenamiento. ¿Qué vector de ataque es?',
      o: [
        'Envenenamiento de datos.',
        'Manipulación de las solicitudes.',
        'Exfiltración de datos.',
        'Generación de código malicioso.'
      ], r: 2,
      why: 'La <b>exfiltración de datos</b> (o fuga de datos) consiste en enviar prompts diseñados para extraer datos de entrenamiento confidenciales, y el ejemplo del programa es exactamente ese: superar la ventana contextual con prompts extensos para sobrecargar la memoria de la IA y llevarla a revelar fragmentos aleatorios de sus datos de entrenamiento.',
      ref: '3.2.2',
      cita: [
        'Exfiltración de datos (también fuga de datos) — Envío de prompts diseñados para extraer datos de entrenamiento confidenciales.',
        'Ejemplo: Exceder la ventana de contexto del LLM con prompts largos para sobrecargar la memoria de la IA podría llevarla a revelar fragmentos aleatorios de sus datos de entrenamiento y exponer potencialmente información confidencial.'
      ],
      pag: [39, 39] },

    { id: '3.2.2b', cap: 3, lo: 'GenAI-3.2.2', k: 'K2', pts: 1,
      q: 'Alguien introduce evaluaciones falsas al calificar los resultados de un informe de prueba generado por IA, con la intención de degradar el comportamiento futuro del modelo. ¿Qué vector de ataque describe el programa para este caso?',
      o: [
        'Envenenamiento de datos (o contaminación de datos): manipular los datos de entrenamiento.',
        'Exfiltración de datos: extraer datos de entrenamiento confidenciales.',
        'Manipulación de las solicitudes: introducir datos que alteren los resultados de la IA.',
        'Generación de código malicioso: inducir al modelo a crear puertas traseras.'
      ], r: 0,
      why: 'El <b>envenenamiento de datos</b> se define como la manipulación de los datos de entrenamiento, y el ejemplo literal de la tabla del programa es aportar evaluaciones falsas al calificar los resultados de un informe de prueba generado por IA.',
      ref: '3.2.2',
      cita: [
        'Envenenamiento de datos (también contaminación de datos) — Manipular los datos de entrenamiento.',
        'Ejemplo: Proporcionar evaluaciones falsas al calificar los resultados de un informe de prueba generado por la IA.'
      ],
      pag: [39, 39] },

    { id: '3.2.2c', cap: 3, lo: 'GenAI-3.2.2', k: 'K2', pts: 1,
      q: 'Se introducen imágenes que arrastran a la IA a un contexto distinto del real, provocando alucinaciones sobre los criterios de aceptación. ¿Qué vector de ataque es, y qué ejemplo da el programa de <b>generación de código malicioso</b>?',
      o: [
        'Es exfiltración de datos; la generación de código malicioso consiste en producir scripts de prueba con errores de sintaxis.',
        'Es manipulación de las solicitudes; la generación de código malicioso se ejemplifica con código que abre un canal de comunicación con una IP específica y maliciosa.',
        'Es envenenamiento de datos; la generación de código malicioso se ejemplifica con la creación de datos de prueba sintéticos no representativos.',
        'Es generación de código malicioso; la manipulación de las solicitudes solo puede hacerse con texto, no con imágenes.'
      ], r: 1,
      why: 'La <b>manipulación de las solicitudes</b> es introducir datos que alteren los resultados de la IA, y el ejemplo del programa son imágenes que atraen a la IA a un contexto diferente provocando alucinaciones sobre, por ejemplo, los criterios de aceptación. La <b>generación de código malicioso</b> es manipular al LLM para que produzca puertas traseras, como código que abre un canal de comunicación con una IP maliciosa. <i>Ojo: en el programa LATAM la fila de la «manipulación de las solicitudes» repite por error la descripción de la exfiltración; la definición de arriba es la de la versión de España (ES V01.01).</i>',
      ref: '3.2.2',
      cita: [
        'Generación de código malicioso — Manipular un LLM para generar puertas traseras (por ejemplo, llamadas a comandos externos) durante el uso.',
        'Ejemplo: Generación de código para abrir un canal de comunicación con una IP específica y maliciosa.'
      ],
      pag: [39, 39] },

    { id: '3.2.3a', cap: 3, lo: 'GenAI-3.2.3', k: 'K2', pts: 1,
      q: '¿Qué afirma el programa sobre la relación entre el GDPR y el uso de IA generativa?',
      o: [
        'Prohíbe expresamente el uso de IA generativa sobre cualquier dato de producción.',
        'No restringe explícitamente las aplicaciones de IA generativa, pero proporciona salvaguardias que pueden limitar lo que se puede hacer, en cuanto a legalidad y a los fines de recopilación, tratamiento y almacenamiento de datos.',
        'Solo se aplica si el LLM está alojado fuera de la Unión Europea.',
        'Obliga a que todo LLM usado en pruebas se ejecute en la infraestructura propia de la organización.'
      ], r: 1,
      why: 'El programa es explícito: las normativas de protección de datos como el GDPR <b>no restringen explícitamente</b> las aplicaciones de IA generativa, pero sí aportan salvaguardias que pueden limitar lo que se puede hacer, en particular respecto a la legalidad y a las limitaciones sobre los fines de recopilación, tratamiento y almacenamiento de datos.',
      ref: '3.2.3',
      cita: [
        'Las regulaciones de protección de datos como GDPR no restringen las aplicaciones de la IA generativa explícitamente, pero proporcionan salvaguardas que pueden limitar lo que se puede hacer, particularmente con respecto a la legalidad y las limitaciones en los fines de recopilación, procesamiento y almacenamiento de datos.'
      ],
      pag: [39] },

    { id: '3.2.3b', cap: 3, lo: 'GenAI-3.2.3', k: 'K2', pts: 1,
      q: 'Una organización con requisitos altos de confidencialidad quiere usar IA generativa en pruebas. ¿Qué recoge el programa entre las estrategias de mitigación?',
      o: [
        'Elegir un entorno operativo seguro —oferta comercial segura, nube segura o instalación del LLM en la propia infraestructura— y complementarlo con minimización, anonimización, revisión sistemática de resultados y auditorías periódicas.',
        'Sustituir toda revisión humana por comparaciones automáticas entre modelos, que son más confiables.',
        'Usar exclusivamente modelos de código abierto, porque no envían datos a terceros bajo ninguna configuración.',
        'Reducir la temperatura del modelo, ya que las salidas deterministas no filtran datos.'
      ], r: 0,
      why: 'El programa propone, según el nivel de confidencialidad, usar una oferta comercial segura, operar el LLM en una nube segura o instalarlo en la infraestructura propia, y combinarlo con minimización de datos, anonimización y seudonimización, almacenamiento y transmisión seguros, capacitación, revisión sistemática de resultados, evaluación por comparación con otro LLM y auditorías de seguridad. Además recomienda implicar a ingenieros de seguridad sénior, asesores legales y al CTO o CISO. La <b>evaluación humana sigue siendo esencial</b>: no se sustituye.',
      ref: '3.2.3',
      cita: [
        'Elección de un entorno seguro y operativo: dependiendo del nivel de confidencialidad requerido, las organizaciones pueden optar por diferentes soluciones seguras: utilizar una oferta comercial segura de un proveedor de LLM, operar el LLM en una nube segura o instalar el LLM en la infraestructura de la organización.'
      ],
      pag: [40] },

    { id: '3.3.1a', cap: 3, lo: 'GenAI-3.3.1', k: 'K2', pts: 1,
      q: '¿Qué comparación concreta usa el programa para ilustrar el consumo energético de las tareas de IA generativa?',
      o: [
        'Generar una sola imagen con un modelo potente puede consumir tanta energía como cargar completamente un teléfono inteligente, mientras que generar texto consume solo un pequeño porcentaje de esa carga.',
        'Entrenar un modelo consume lo mismo que ejecutar una suite de regresión completa.',
        'Una consulta a un LLM equivale al consumo diario de un centro de datos pequeño.',
        'Generar texto consume más que generar imágenes, porque el texto requiere más tokens.'
      ], r: 0,
      why: 'Es el ejemplo literal del programa (Heikkilä 2023). El apartado añade que la <b>complejidad de la tarea y los recursos de cálculo</b> necesarios influyen en el consumo, que el efecto acumulativo entre millones de usuarios supone una carga medioambiental considerable, y que adoptar buenas prácticas como limitar las interacciones innecesarias con los modelos es fundamental.',
      ref: '3.3.1',
      cita: [
        'Por ejemplo, generar una sola imagen utilizando un modelo de IA potente puede consumir tanta energía como cargar completamente un teléfono inteligente, mientras que generar texto consume solo un pequeño porcentaje de la carga de un teléfono inteligente (Heikkilä 2023)'
      ],
      pag: [41] },

    { id: '3.3.1b', cap: 3, lo: 'GenAI-3.3.1', k: 'K2', pts: 1,
      q: '¿Qué buena práctica señala el programa como fundamental para mitigar el impacto medioambiental de IA generativa en las pruebas de software?',
      o: [
        'Ejecutar todas las tareas de prueba con el modelo más grande disponible para acertar a la primera.',
        'Limitar las interacciones innecesarias con los modelos.',
        'Compensar las emisiones comprando créditos de carbono por cada prompt enviado.',
        'Sustituir la IA generativa por aprendizaje automático clásico en todas las tareas de prueba.'
      ], r: 1,
      why: 'El programa concluye el apartado diciendo que adoptar mejores prácticas <b>como limitar las interacciones innecesarias con los modelos</b> es fundamental para mitigar los riesgos medioambientales. En el capítulo 5 lo complementa: seleccionar modelos del tamaño adecuado a la tarea y equilibrar los beneficios de la automatización con el costo y el consumo de energía.',
      ref: '3.3.1 · 5.2.1',
      cita: [
        'Adoptar las mejores prácticas, como limitar las interacciones innecesarias de los modelos, es fundamental para mitigar los riesgos ambientales que plantea la IA generativa.'
      ],
      pag: [41] },

    { id: '3.4.1a', cap: 3, lo: 'GenAI-3.4.1', k: 'K1', pts: 1,
      q: '¿Qué norma especifica los requisitos para <b>gestionar los sistemas de IA dentro de una organización</b>?',
      o: [
        'ISO/IEC 23053:2022.',
        'Marco de trabajo de la Gestión de Riesgos de la IA del NIST (EE. UU.).',
        'ISO/IEC 42001:2023.',
        'Ley de IA de la Unión Europea (2024).'
      ], r: 2,
      why: '<b>ISO/IEC 42001:2023</b> —Tecnología de la información – Sistema de gestión de inteligencia artificial— especifica los requisitos para gestionar los sistemas de IA en una organización. ISO/IEC 23053:2022 es un marco para sistemas de IA que usan aprendizaje automático; el marco de gestión de riesgos de la IA del NIST (NIST AI RMF 1.0) es estadounidense; y la Ley de IA de la Unión Europea es el reglamento que clasifica las aplicaciones por nivel de riesgo.',
      ref: '3.4.1',
      cita: [
        'ISO/IEC 42001:2023 Tecnología de la información – Sistema de gestión de inteligencia artificial (Tipo: Estándar) — Especifica los requisitos para gestionar los sistemas de IA dentro de una organización.'
      ],
      pag: [42] },

    { id: '3.4.1b', cap: 3, lo: 'GenAI-3.4.1', k: 'K1', pts: 1,
      q: '¿Cuál de estas correspondencias entre norma o marco y su descripción es <b>correcta</b>?',
      o: [
        'Ley de IA de la Unión Europea: reglamento que establece un marco de trabajo jurídico que aborda los riesgos de la IA, clasificando las aplicaciones por su nivel de riesgo.',
        'Marco de trabajo de la Gestión de Riesgos de la IA del NIST: norma ISO que certifica los sistemas de gestión de IA de una organización.',
        'ISO/IEC 23053:2022: reglamento que exige transparencia y mitigación del sesgo en la IA generativa usada en pruebas.',
        'ISO/IEC 42001:2023: marco estadounidense centrado en la equidad, la transparencia y la seguridad.'
      ], r: 0,
      why: 'La <b>Ley de IA de la Unión Europea</b> es un reglamento que establece un marco de trabajo jurídico frente a los riesgos de la IA clasificando las aplicaciones por nivel de riesgo, y exige transparencia, rendición de cuentas y mitigación de sesgos para la IA generativa usada en pruebas. El marco del NIST (NIST AI RMF 1.0) es un marco de trabajo de EE. UU., no una norma ISO; ISO/IEC 23053:2022 es una norma que proporciona un marco para sistemas de IA que usan aprendizaje automático; e ISO/IEC 42001:2023 es la norma de sistema de gestión.',
      ref: '3.4.1',
      cita: [
        'Ley de IA de la Unión Europea (Tipo: Reglamento) — Establece un marco de trabajo jurídico que aborda los riesgos de la IA, clasificando las aplicaciones por su nivel de riesgo.',
        'Aplicación en las pruebas: Exige el cumplimiento en materia de transparencia, rendición de cuentas y mitigación de sesgos para la IA generativa utilizada en las pruebas.'
      ],
      pag: [42, 42] },

  /* ══════════════════════════════════════════════════════════════════════
     CAPÍTULO 4 — Infraestructura impulsada por los LLM (5 preguntas, 5 puntos)
     ══════════════════════════════════════════════════════════════════════ */

    { id: '4.1.1a', cap: 4, lo: 'GenAI-4.1.1', k: 'K2', pts: 1,
      q: 'En la arquitectura típica de una infraestructura de prueba impulsada por LLM, ¿de qué se ocupa la <b>capa de servicios</b>?',
      o: [
        'De ser la interfaz donde los probadores introducen consultas o comandos.',
        'De alojar el modelo y generar las respuestas a partir de los prompts estructurados.',
        'De procesar la entrada del usuario y gestionar la autenticación, la recuperación de datos, la preparación de prompts y la interacción con el LLM.',
        'De almacenar únicamente las incrustaciones en una base de datos vectorial.'
      ], r: 2,
      why: 'La capa de servicios (back-end) procesa la información introducida y gestiona funciones críticas: autenticación, recuperación de datos, preparación de prompts e interacción con el LLM. Además integra múltiples fuentes —bases relacionales y vectoriales— y <b>mejora la salida sin procesar del LLM mediante posprocesamiento</b>. La interfaz de usuario es la capa de presentación, y generar respuestas es cosa del LLM.',
      ref: '4.1.1',
      cita: [
        'El back-end procesa la entrada del usuario y gestiona funciones críticas como la autenticación, la recuperación de datos, la preparación de prompts y la interacción con el LLM.'
      ],
      pag: [44] },

    { id: '4.1.1b', cap: 4, lo: 'GenAI-4.1.1', k: 'K2', pts: 1,
      q: '¿En qué se diferencia una infraestructura de prueba impulsada por LLM del modelo cliente-servidor tradicional?',
      o: [
        'En que incorpora componentes de procesamiento inteligente: el LLM no es solo un servidor, sino un componente que interpreta y razona en función del testware, con una capa de servicios multifuentes.',
        'En que elimina la capa de presentación, porque el probador conversa directamente con el modelo.',
        'En que el cliente ejecuta el modelo localmente, sin necesidad de servidor.',
        'En que sustituye las bases de datos relacionales por bases vectoriales exclusivamente.'
      ], r: 0,
      why: 'El programa dice literalmente que esta arquitectura va más allá del modelo cliente-servidor tradicional al incorporar componentes de procesamiento inteligente, y que el <b>LLM no es solo un servidor</b>, sino un componente de procesamiento inteligente que interpreta y razona en función del testware. La capa de servicios integra bases relacionales <b>y</b> vectoriales: no sustituye unas por otras.',
      ref: '4.1.1',
      cita: [
        'Esta arquitectura va más allá de un modelo cliente-servidor tradicional al incorporar componentes de procesamiento inteligentes, como los LLM y back-ends de múltiples fuentes: 1.',
        'El LLM no es solo un servidor, sino un componente de procesamiento inteligente que interpreta y razona en función del testware.'
      ],
      pag: [44, 44] },

    { id: '4.1.2a', cap: 4, lo: 'GenAI-4.1.2', k: 'K2', pts: 1,
      q: '¿Cómo funciona la <b>generación aumentada por recuperación</b> (RAG) al procesar el prompt de un usuario?',
      o: [
        'Reentrena el modelo con los documentos de la organización antes de responder.',
        'En dos pasos: recupera la información relevante de bases de datos vectoriales previamente creadas por similitud semántica, y luego el LLM genera la respuesta combinando su conocimiento con esos datos.',
        'Amplía la ventana de contexto del modelo para que quepan todos los documentos de la empresa.',
        'Compara la respuesta del LLM con la de un segundo modelo y devuelve la más frecuente.'
      ], r: 1,
      why: 'RAG es un proceso de dos pasos: <b>recuperación</b> —a partir de la consulta se recuperan los fragmentos relevantes de las bases vectoriales, normalmente por similitud semántica entre incrustaciones— y <b>generación</b>, en la que el LLM combina su conocimiento existente con los datos recuperados. No implica reentrenar el modelo: eso sería el ajuste fino (4.2.1).',
      ref: '4.1.2',
      cita: [
        'En la fase de procesamiento de prompts del usuario, un sistema RAG funciona a través de un proceso de dos pasos:',
        'Recuperación: Dada una consulta de usuario, el sistema recupera información relevante de las bases de datos vectoriales creadas previamente.',
        'Generación: La información recuperada se envía al LLM, que genera una respuesta que combina su conocimiento existente con los datos recién adquiridos, lo que resulta en un resultado más exacto y adecuado al contexto.'
      ],
      pag: [45, 45, 45] },

    { id: '4.1.2b', cap: 4, lo: 'GenAI-4.1.2', k: 'K2', pts: 1,
      q: 'Durante el <b>preprocesamiento</b> de un sistema RAG, ¿qué se hace con los documentos grandes y por qué?',
      o: [
        'Se resumen con el propio LLM para reducir su longitud antes de almacenarlos.',
        'Se traducen al inglés para mejorar la calidad de las incrustaciones.',
        'Se dividen en fragmentos más pequeños (por ejemplo, de 256 a 512 tokens) para garantizar una recuperación centrada y la compatibilidad con la ventana de contexto del modelo.',
        'Se almacenan íntegros en una base relacional, porque las bases vectoriales solo guardan consultas.'
      ], r: 2,
      why: 'El programa detalla que durante el preprocesamiento los documentos grandes se dividen en fragmentos (por ejemplo, 256-512 tokens) para una recuperación centrada y compatible con la ventana de contexto; cada fragmento se limpia, se procesa y se codifica como vector de alta dimensión —una incrustación— que puede almacenarse en <b>bases de datos vectoriales</b> para una recuperación eficiente por similitud en tiempo de inferencia.',
      ref: '4.1.2',
      cita: [
        'Durante el preprocesamiento, los documentos grandes se dividen en fragmentos más pequeños (por ejemplo, 256-512 tokens) para garantizar la recuperación enfocada y la compatibilidad con la ventana de contexto del modelo.',
        'Cada fragmento se limpia, procesa y codifica en un vector de alta dimensión (incrustación) utilizando modelos preentrenados.'
      ],
      pag: [45, 45] },

    { id: '4.1.3a', cap: 4, lo: 'GenAI-4.1.3', k: 'K2', pts: 1,
      q: '¿Qué diferencia principal establece el programa entre un <b>agente impulsado por LLM</b> y un bot de conversación tradicional?',
      o: [
        'El agente puede realizar tareas o «actuar» invocando un conjunto predefinido de funciones, llamadas herramientas, con las que interactúa con sistemas externos y los manipula.',
        'El agente no necesita un LLM por debajo, porque funciona con reglas.',
        'El agente siempre opera de forma totalmente autónoma, sin ninguna intervención humana.',
        'El agente sustituye la generación aumentada por recuperación por el ajuste fino.'
      ], r: 0,
      why: 'Los chatbots tradicionales se centran en interacciones de pregunta-respuesta; los <b>agentes impulsados por LLM</b> pueden actuar invocando herramientas, lo que les permite interactuar con sistemas externos y manipularlos. Su grado de autonomía <b>varía</b>: los autónomos operan con intervención humana mínima y los semiautónomos trabajan con supervisión humana periódica.',
      ref: '4.1.3',
      cita: [
        'A diferencia de los chatbots con IA tradicionales que se centran únicamente en las interacciones pregunta-respuesta, los agentes impulsados por los LLM pueden realizar tareas o "actuar" invocando un conjunto predefinido de funciones, comúnmente denominadas "herramientas"',
        'Esta capacidad les permite interactuar y manipular sistemas externos, lo que los hace muy versátiles en la ejecución de tareas.'
      ],
      pag: [46, 46] },

    { id: '4.1.3b', cap: 4, lo: 'GenAI-4.1.3', k: 'K2', pts: 1,
      q: 'Varios agentes con funciones especializadas se comunican y coordinan para resolver un problema de prueba complejo. ¿Cómo se llama ese esfuerzo coordinado y en qué se diferencia un agente semiautónomo de uno autónomo?',
      o: [
        'Se llama encadenamiento; el semiautónomo trabaja sin herramientas y el autónomo con ellas.',
        'Se llama orquestación; el semiautónomo realiza tareas con supervisión humana periódica, mientras que el autónomo opera de forma independiente con intervención humana mínima.',
        'Se llama ajuste fino; el semiautónomo se entrena con datos del dominio y el autónomo no.',
        'Se llama LLMOps; el semiautónomo se despliega en la nube y el autónomo en local.'
      ], r: 1,
      why: 'Las arquitecturas multiagente implican un sistema colaborativo donde varios agentes especializados se comunican y coordinan, y ese esfuerzo coordinado se conoce como <b>orquestación</b>. Los <b>agentes semiautónomos</b> realizan tareas con supervisión humana periódica para garantizar que el resultado cumpla los objetivos definidos; los <b>autónomos</b> operan de forma independiente con intervención humana mínima.',
      ref: '4.1.3',
      cita: [
        'Este esfuerzo coordinado entre múltiples agentes de IA se conoce como "orquestación"',
        'Los agentes semiautónomos realizan tareas con supervisión humana periódica para asegurar que el resultado cumpla con los objetivos definidos por el usuario.',
        'Los agentes autónomos operan de forma independiente, realizando tareas con una intervención humana mínima utilizando reglas predefinidas, aprendizaje por refuerzo y ciclos de retroalimentación adaptativa.'
      ],
      pag: [46, 46, 46] },

    { id: '4.2.1a', cap: 4, lo: 'GenAI-4.2.1', k: 'K2', pts: 1,
      q: '¿Cuál de los siguientes es un <b>reto</b> del ajuste fino de un modelo de IA generativa para las pruebas de software?',
      o: [
        'El sobreajuste: el modelo se especializa tanto en los datos de entrenamiento que empeora su rendimiento con datos nuevos y desconocidos.',
        'La imposibilidad de aplicar ajuste fino a modelos de lenguaje pequeños.',
        'La pérdida de la capacidad multimodal del modelo tras el ajuste.',
        'La necesidad de desplegar obligatoriamente el modelo en la nube pública.'
      ], r: 0,
      why: 'El programa enumera cuatro retos: evitar resultados sesgados o inexactos garantizando datos de entrenamiento de alta calidad, <b>mitigar el sobreajuste</b> para mantener la generalización, abordar la opacidad del razonamiento del modelo —que complica depuración y validación— y gestionar los importantes recursos de cálculo necesarios. El ajuste fino sí puede aplicarse a SLM, y de hecho el programa lo destaca por su menor costo de recursos.',
      ref: '4.2.1',
      cita: [
        'Mitigar el sobreajuste (el modelo se vuelve demasiado especializado para los datos de entrenamiento, lo que afecta negativamente su rendimiento en datos nuevos e invisibles) para mantener la generalización en diferentes escenarios.'
      ],
      pag: [47] },

    { id: '4.2.1b', cap: 4, lo: 'GenAI-4.2.1', k: 'K2', pts: 1,
      q: 'Una organización quiere que el modelo genere casos de prueba a partir de sus historias de usuario siguiendo su formato y su terminología internos, con el menor costo de recursos posible. ¿Qué plantea el programa?',
      o: [
        'Que solo se puede lograr con un LLM de gran tamaño; los modelos pequeños no admiten especialización.',
        'Que basta con incluir el formato deseado en el prompt de sistema, sin ninguna otra técnica.',
        'Que el ajuste fino de un modelo de lenguaje pequeño puede alcanzar altos niveles de rendimiento en tareas específicas sin la sobrecarga de recursos de proceso que exige un LLM.',
        'Que la única vía es la generación aumentada por recuperación, ya que el ajuste fino no admite formatos de salida.'
      ], r: 2,
      why: 'El programa dice que, ajustando un <b>SLM</b>, se pueden alcanzar niveles de rendimiento más altos para tareas específicas sin la misma sobrecarga de recursos de proceso que requieren los LLM, y usa como ejemplo justamente entrenar el modelo con las historias de usuario de la organización y sus casos de prueba correspondientes para alinearlo con su proceso y su terminología.',
      ref: '4.2.1',
      cita: [
        'Al ajustar un SLM, se pueden lograr niveles de rendimiento más altos para tareas específicas sin la misma sobrecarga computacional requerida para los LLM.'
      ],
      pag: [47] },

    { id: '4.2.2a', cap: 4, lo: 'GenAI-4.2.2', k: 'K2', pts: 1,
      q: '¿Qué son las <b>operaciones del modelo de lenguaje grande</b> (LLMOps)?',
      o: [
        'El conjunto de prácticas, herramientas y procesos diseñados para optimizar el desarrollo, la implementación y el mantenimiento de los LLM en entornos de producción.',
        'El proceso de dividir documentos en fragmentos y codificarlos como incrustaciones.',
        'Las reglas de gobernanza que definen qué datos pueden compartirse con un proveedor externo.',
        'El conjunto de métricas para evaluar la calidad de las salidas de un LLM en tareas de prueba.'
      ], r: 0,
      why: 'Es la definición del programa (Sinha 2024). Las otras opciones describen el preprocesamiento de RAG (4.1.2), las directrices de proceso de una estrategia de IA generativa (5.1.2) y las métricas de evaluación de resultados (2.3.1).',
      ref: '4.2.2',
      cita: [
        'Las LLMOps se refieren al conjunto de prácticas, herramientas y procesos diseñados para agilizar el desarrollo, el despliegue y el mantenimiento de los LLM en entornos de producción (Sinha 2024)'
      ],
      pag: [48] },

    { id: '4.2.2b', cap: 4, lo: 'GenAI-4.2.2', k: 'K2', pts: 1,
      q: 'Sobre los tres enfoques para usar IA generativa en los procesos de prueba de una organización —chatbot con IA, herramienta de prueba con capacidades de IA generativa y desarrollo interno—, ¿qué afirma el programa?',
      o: [
        'Que hay que elegir uno y mantenerlo, porque mezclarlos duplica los riesgos de privacidad.',
        'Que el desarrollo interno es siempre el más barato al no pagar licencias.',
        'Que no son mutuamente excluyentes: una organización puede usar un chatbot para algunas tareas y desarrollar herramientas propias para otras, y pueden incorporar RAG y ajuste fino.',
        'Que el uso de un chatbot no plantea consideraciones de privacidad porque los datos no salen de la conversación.'
      ], r: 2,
      why: 'El programa concluye que los tres enfoques <b>no son mutuamente excluyentes</b> y pueden implementarse simultáneamente según las actividades de prueba, incorporando además tecnologías como RAG y el ajuste fino. El desarrollo interno exige planificar costos de procesamiento, almacenamiento y capacitación; y el uso de un chatbot obliga precisamente a gestionar riesgos de privacidad y seguridad.',
      ref: '4.2.2',
      cita: [
        'Estos enfoques no son mutuamente excluyentes, ya que una organización podría utilizar un chatbot con IA para algunas tareas mientras desarrolla herramientas personalizadas para otras.',
        'Además, pueden incorporar tecnologías adicionales, como RAG y ajuste fino de los LLM/SLM, para mejorar la efectividad y adaptabilidad de los procesos de prueba con la IA generativa.'
      ],
      pag: [48, 48] },

  /* ══════════════════════════════════════════════════════════════════════
     CAPÍTULO 5 — Despliegue e integración (7 preguntas, 7 puntos)
     ══════════════════════════════════════════════════════════════════════ */

    { id: '5.1.1a', cap: 5, lo: 'GenAI-5.1.1', k: 'K1', pts: 1,
      q: '¿Cuáles son los riesgos de la <b>IA en la sombra</b> según el programa de estudios?',
      o: [
        'Sobreajuste, opacidad del modelo y consumo de recursos de cálculo.',
        'Debilidades en la seguridad de la información y la privacidad de los datos, cumplimiento y problemas regulatorios, y propiedad intelectual difusa.',
        'Alucinaciones, errores de razonamiento y sesgos.',
        'Costo recurrente, falta de soporte de la comunidad y ausencia de puntos de referencia.'
      ], r: 1,
      why: 'El programa enumera esos tres: herramientas de IA personales que pueden carecer de seguridad sólida y provocar violaciones de datos; uso de herramientas no aprobadas que incumple estándares y normativas del sector, con posibles consecuencias legales; y acuerdos de licencia poco claros que exponen a disputas de <b>propiedad intelectual</b>, sobre todo si se procesan datos protegidos por derechos de autor.',
      ref: '5.1.1',
      cita: [
        'La IA en la sombra puede generar riesgos con respecto a la seguridad, el cumplimiento y la privacidad de los datos:',
        'Debilidades en la seguridad de la información y la privacidad de los datos: Las herramientas personales de IA pueden carecer de una seguridad sólida, lo que puede dar lugar a posibles violaciones de datos.',
        'Cumplimiento y problemas regulatorios: el uso de herramientas de IA no aprobadas puede llevar al incumplimiento de los estándares y regulaciones de la industria (consulte la Sección 3.4.1), lo que puede tener consecuencias legales.',
        'Propiedad intelectual difusa: el uso de herramientas de IA con acuerdos de licencia poco claros puede exponer a los usuarios de los LLM a disputas de propiedad intelectual, especialmente si los datos con derechos de autor se procesan sin la autorización adecuada.'
      ],
      pag: [50, 50, 50, 50] },

    { id: '5.1.1b', cap: 5, lo: 'GenAI-5.1.1', k: 'K1', pts: 1,
      q: '¿Qué recomienda el programa para que una organización de prueba evite el riesgo de IA en la sombra?',
      o: [
        'Bloquear el acceso a internet en los equipos del departamento de pruebas.',
        'Reducir la temperatura de los modelos aprobados.',
        'Contar con una estrategia y unos pasos definidos para integrar e implementar IA generativa.',
        'Prohibir el uso de cualquier herramienta de IA hasta que exista una norma ISO aplicable.'
      ], r: 2,
      why: 'El apartado cierra diciendo que <b>una estrategia y unos pasos para integrar e implementar IA generativa</b> pueden ayudar a las organizaciones de prueba a evitar el riesgo de la IA en la sombra. Es decir: el remedio que propone el programa es dar un camino oficial, no bloquear el acceso.',
      ref: '5.1.1',
      cita: [
        'Una estrategia y pasos para integrar e implementar la IA generativa pueden ayudar a las organizaciones de prueba a evitar el riesgo de la IA en la sombra.'
      ],
      pag: [50] },

    { id: '5.1.2a', cap: 5, lo: 'GenAI-5.1.2', k: 'K2', pts: 1,
      q: 'Al definir una estrategia de IA generativa para las pruebas de software, ¿qué debe incluirse entre las directrices de proceso para asegurar el cumplimiento normativo y ético?',
      o: [
        'Reglas para el uso de datos sensibles, obligaciones de transparencia sobre qué se generó con IA generativa y controles de calidad con revisión del testware generado.',
        'La obligación de usar un único proveedor de LLM para toda la organización.',
        'La prohibición de que los probadores escriban sus propios prompts.',
        'El uso exclusivo de modelos de razonamiento para todas las tareas de prueba.'
      ], r: 0,
      why: 'El programa pide establecer directrices de proceso que incluyan reglas para el uso de datos sensibles, <b>obligaciones de transparencia</b> —por ejemplo, qué se generó usando IA generativa— y controles de calidad con revisión del testware generado. La estrategia empieza además por definir objetivos de prueba medibles: aumentar la productividad, acortar los ciclos y mejorar la calidad.',
      ref: '5.1.2',
      cita: [
        'Para garantizar el cumplimiento de los estándares reglamentarios y el cumplimiento de las pautas éticas, las organizaciones deben establecer pautas de proceso para el uso de la IA generativa, incluidas las reglas para el uso de datos confidenciales, las obligaciones de transparencia (por ejemplo, lo que se generó utilizando la IA generativa) y los controles de calidad con revisión del testware generado.'
      ],
      pag: [50] },

    { id: '5.1.2b', cap: 5, lo: 'GenAI-5.1.2', k: 'K2', pts: 1,
      q: '¿Qué papel juega la calidad de los datos de entrada en una estrategia de IA generativa para la prueba?',
      o: [
        'Es secundaria: un modelo suficientemente grande compensa la mala calidad de la entrada.',
        'Solo importa en el ajuste fino, no en el uso diario de prompts.',
        'Es fundamental: la efectividad de la prueba basada en LLM depende de datos de entrada precisos y relevantes, protegidos por procedimientos de seguridad robustos.',
        'Importa únicamente para el cumplimiento del GDPR, no para la calidad del resultado.'
      ], r: 2,
      why: 'El programa afirma que la calidad de los datos desempeña un papel fundamental, porque la efectividad de la prueba basada en LLM depende de <b>datos de entrada precisos y relevantes</b> protegidos por procedimientos de seguridad robustos, y que mantener esa calidad es clave para lograr resultados en los que se pueda confiar. La misma idea aparece en el capítulo 2: una entrada de alta calidad es fundamental para obtener resultados significativos.',
      ref: '5.1.2 · 2.2',
      cita: [
        'La calidad de los datos juega un papel fundamental, ya que la efectividad de las pruebas impulsadas por los LLM depende de los datos de entrada precisos y relevantes, protegidos por procedimientos de seguridad sólidos.',
        'Por lo tanto, mantener datos de entrada de alta calidad es clave para lograr resultados en los que se pueda confiar que sean correctos.'
      ],
      pag: [50, 50] },

    { id: '5.1.3a', cap: 5, lo: 'GenAI-5.1.3', k: 'K2', pts: 1,
      q: '¿Cuáles son los criterios clave que el programa propone para <b>seleccionar un LLM o SLM</b> para tareas de prueba de software?',
      o: [
        'Rendimiento del modelo, potencial de ajuste fino, costo recurrente, y comunidad y soporte.',
        'Número de parámetros, país del proveedor, idioma de entrenamiento y fecha de lanzamiento.',
        'Temperatura por defecto, semilla configurable, tamaño de lote y latencia.',
        'Nivel de riesgo según la Ley de IA de la UE, certificación ISO/IEC 42001, huella de carbono y licencia de código abierto.'
      ], r: 0,
      why: 'El programa lista exactamente esos cuatro: evaluar el <b>rendimiento</b> frente a los puntos de referencia de la organización usando métricas como las de 2.3.1; valorar el <b>potencial de ajuste fino</b> con datos del dominio; considerar el <b>costo recurrente</b>, incluidas licencias y gastos operativos; y elegir modelos con <b>soporte activo de la comunidad</b> y documentación detallada.',
      ref: '5.1.3',
      cita: [
        'Por lo tanto, la selección de los LLM/SLM para las tareas de prueba requiere una cuidadosa consideración de varios criterios clave:',
        'Rendimiento del modelo:',
        'Potencial de ajuste fino:',
        'Costo recurrente:',
        'Comunidad y soporte:'
      ],
      pag: [51, 51, 51, 51, 51] },

    { id: '5.1.3b', cap: 5, lo: 'GenAI-5.1.3', k: 'K2', pts: 1,
      q: '¿Qué advierte el programa sobre los puntos de referencia (benchmarks) disponibles para elegir un LLM/SLM?',
      o: [
        'Que los benchmarks públicos bastan para decidir, porque cubren todas las tareas de prueba.',
        'Que aunque existen muchos para tareas como procesamiento del lenguaje natural, generación de código o análisis de imágenes, solo unos pocos se centran específicamente en tareas de prueba de software.',
        'Que los benchmarks están prohibidos por la Ley de IA de la UE para modelos usados en calidad.',
        'Que solo los proveedores comerciales publican benchmarks confiables.'
      ], r: 1,
      why: 'El programa advierte que, aunque abundan los puntos de referencia para procesamiento del lenguaje natural, generación de código o análisis de imágenes, <b>solo unos pocos se centran específicamente en tareas de prueba de software</b> (Wenhan 2024), y por eso la selección exige valorar los cuatro criterios clave con los propios puntos de referencia de la organización.',
      ref: '5.1.3',
      cita: [
        'Si bien hay muchos puntos de referencia disponibles para evaluar los LLM/SLM para las tareas como el procesamiento del lenguaje natural, la generación de código o el análisis de imágenes, solo unos pocos se centran específicamente en las tareas de prueba de software (Wenhan 2024)'
      ],
      pag: [51] },

    { id: '5.1.4a', cap: 5, lo: 'GenAI-5.1.4', k: 'K1', pts: 1,
      q: '¿Cuáles son las tres fases clave de la adopción de IA generativa en una organización de prueba, en orden?',
      o: [
        'Piloto, despliegue y auditoría.',
        'Capacitación, certificación y automatización.',
        'Descubrimiento; inicio y definición del uso; uso e iteración.',
        'Análisis, diseño e implementación.'
      ], r: 2,
      why: 'Son las tres del programa: <b>descubrimiento</b> (sensibilización y desarrollo de capacidades, acceso a modelos y experimentación con casos de uso iniciales), <b>inicio y definición del uso</b> (identificar y priorizar casos de uso prácticos, evaluar la infraestructura impulsada por LLM) y <b>uso e iteración</b> (integración completa, monitoreo continuo y medición de la transformación).',
      ref: '5.1.4',
      cita: [
        'La adopción de la IA generativa dentro de una organización de prueba implica tres fases clave:',
        '1. Descubrimiento: La primera fase se centra en la sensibilización y el desarrollo de capacidades.',
        '2. Inicio y definición del uso: Una vez que se establece la comprensión básica, la segunda fase se centra en identificar y priorizar casos de uso prácticos para la IA generativa en las pruebas de software.',
        '3. Uso e iteración: en esta fase avanzada, las organizaciones integran completamente la IA generativa en sus procesos de prueba.'
      ],
      pag: [51, 51, 51, 52] },

    { id: '5.1.4b', cap: 5, lo: 'GenAI-5.1.4', k: 'K1', pts: 1,
      q: '¿Deben recorrerse secuencialmente las fases de adopción de IA generativa, y qué preocupación inicial señala el programa?',
      o: [
        'Pueden ejecutarse en paralelo para distintos casos de uso, y hay que reconocer y abordar preocupaciones iniciales como el temor a la pérdida de puestos de trabajo.',
        'Deben recorrerse estrictamente en orden y para toda la organización a la vez; la preocupación principal es el costo de las licencias.',
        'Solo se aplican a organizaciones que desarrollan sus propias herramientas; la preocupación principal es la opacidad del modelo.',
        'Se recorren una sola vez y no se repiten; la preocupación principal es el impacto medioambiental.'
      ], r: 0,
      why: 'El programa dice que las fases <b>pueden ejecutarse en paralelo para diferentes casos de uso</b> —el análisis de informes puede ir muy avanzado mientras la automatización empieza— y que es importante reconocer y abordar las preocupaciones iniciales, como el <b>temor a la pérdida de puestos de trabajo</b>, que pueden afectar a la adopción y a la moral del equipo.',
      ref: '5.1.4',
      cita: [
        'Estas fases pueden ejecutarse en paralelo para diferentes casos de uso.',
        'También es importante reconocer y abordar las preocupaciones tempranas, como el temor a la pérdida de puestos de trabajo, que puede afectar a la adopción y a la moral del equipo.'
      ],
      pag: [52, 52] },

    { id: '5.2.1a', cap: 5, lo: 'GenAI-5.2.1', k: 'K2', pts: 1,
      q: '¿Qué habilidades y conocimientos considera esenciales el programa para que un probador trabaje eficazmente con IA generativa?',
      o: [
        'Saber entrenar modelos desde cero y programar arquitecturas de transformadores.',
        'Dominar las técnicas de ingeniería de prompts, comprender las ventanas de contexto de los modelos y desarrollar métodos de revisión de la prueba, combinando experiencia de dominio y de prueba con habilidades de IA.',
        'Conocer al detalle las tarifas de todos los proveedores comerciales de LLM.',
        'Ser capaz de sustituir la revisión humana por comprobaciones automáticas en todas las tareas.'
      ], r: 1,
      why: 'El programa señala esas tres capacidades y añade evaluar las capacidades de los LLM, comprender las técnicas de refinamiento de prompts y evaluar el testware generado por la IA. Entre los conocimientos esenciales están los riesgos inherentes de IA generativa y sus mitigaciones, las implicaciones de seguridad de compartir el testware con un LLM y la <b>limpieza de datos</b> —eliminar u ocultar información sensible, personal o confidencial—.',
      ref: '5.2.1',
      cita: [
        'La integración exitosa de la IA generativa en las pruebas requiere dominar las técnicas de ingeniería de prompts, comprender las ventanas de contexto del modelo y desarrollar métodos de revisión de pruebas.'
      ],
      pag: [52] },

    { id: '5.2.1b', cap: 5, lo: 'GenAI-5.2.1', k: 'K2', pts: 1,
      q: 'Entre los conocimientos esenciales del probador que usa IA generativa, ¿qué incluye el programa respecto al <b>impacto medioambiental</b>?',
      o: [
        'Optimizar la selección de modelos y los patrones de uso para reducir la sobrecarga computacional, elegir modelos del tamaño adecuado a la tarea y equilibrar los beneficios de la automatización con el costo y el consumo de energía.',
        'Calcular y publicar la huella de carbono de cada caso de prueba generado.',
        'Usar siempre modelos alojados en centros de datos con energía renovable certificada.',
        'Limitar el uso de IA generativa a las pruebas no funcionales, que consumen menos.'
      ], r: 0,
      why: 'Es lo que dice el apartado: las consideraciones medioambientales incluyen optimizar la selección de modelos y los patrones de uso para reducir la sobrecarga computacional, <b>seleccionar modelos del tamaño adecuado</b> para las tareas de prueba y equilibrar los beneficios de la automatización con el impacto en costo y consumo energético.',
      ref: '5.2.1 · 3.3.1',
      cita: [
        'Las consideraciones medioambientales incluyen la optimización de la selección de modelos y los patrones de uso para reducir los gastos generales computacionales, la selección de modelos de tamaño adecuado para las tareas de prueba y el equilibrio de los beneficios de la automatización de la IA generativa con el impacto en el costo y el consumo de energía.'
      ],
      pag: [52] },

    { id: '5.2.2a', cap: 5, lo: 'GenAI-5.2.2', k: 'K1', pts: 1,
      q: '¿Qué estrategias recoge el programa para desarrollar capacidades de IA generativa dentro de un equipo de prueba?',
      o: [
        'Sustituir a los probadores con menos experiencia por perfiles de ciencia de datos.',
        'Contratar capacitación externa una vez al año y no intervenir en el trabajo diario.',
        'Practicar con varios LLM/SLM, seguir rutas de aprendizaje estructurados, hacer ejercicios guiados, aprender entre pares e integrar gradualmente la IA en las tareas de prueba diarias.',
        'Centralizar todos los prompts en un único experto que los escriba para el resto del equipo.'
      ], r: 2,
      why: 'El programa describe un enfoque práctico: practicar con varios LLM/SLM, rutas de aprendizaje estructurados, ejercicios guiados, aprendizaje entre pares e integración gradual en el trabajo diario. Añade las <b>comunidades de práctica internas</b>, con reuniones periódicas para compartir experiencias, y el intercambio de bibliotecas de patrones de prompts.',
      ref: '5.2.2',
      cita: [
        'La capacitación se centra en el desarrollo de habilidades prácticas a través de ejercicios guiados, aprendizaje entre pares y la integración gradual de la IA en las tareas de prueba diarias.',
        'Esto incluye practicar con varios LLM/SLM, seguir rutas de aprendizaje estructuradas y desarrollar gradualmente conocimientos mediante el intercambio dentro de la organización.'
      ],
      pag: [52, 52] },

    { id: '5.2.2b', cap: 5, lo: 'GenAI-5.2.2', k: 'K1', pts: 1,
      q: '¿Qué es un <b>patrón de prompt</b> según el programa de estudios?',
      o: [
        'Una plantilla reutilizable para crear prompts eficaces que guíen a la IA generativa hacia resultados consistentes y confiables.',
        'La secuencia de tokens más probable que el modelo genera ante una entrada dada.',
        'El conjunto de hiperparámetros guardados junto con una conversación.',
        'La estructura de seis componentes que todo prompt debe cumplir obligatoriamente.'
      ], r: 0,
      why: 'El programa lo define exactamente así, dentro del desarrollo de capacidades: una <b>plantilla reutilizable</b> para crear prompts eficaces que guíen a la IA generativa hacia resultados consistentes y confiables. Las comunidades internas de práctica promueven la mejora continua compartiendo bibliotecas de esos patrones y documentando las lecciones aprendidas.',
      ref: '5.2.2',
      cita: [
        'Un patrón de prompts es una plantilla reutilizable para elaborar prompts efectivos para guiar a la IA generativa hacia resultados consistentes y confiables.'
      ],
      pag: [52] },

    { id: '5.2.3a', cap: 5, lo: 'GenAI-5.2.3', k: 'K1', pts: 1,
      q: '¿Cómo evoluciona el rol del probador en una organización de prueba asistida por IA?',
      o: [
        'Pasa a dedicarse exclusivamente a escribir prompts, delegando el diseño de pruebas en el modelo.',
        'Deja de necesitar las técnicas de prueba tradicionales, sustituidas por la ingeniería de prompts.',
        'Pasa de especialista en diseño y ejecución a especialista en pruebas asistidas por IA, combinando las técnicas de prueba con la capacidad de guiar y verificar los productos generados por IA.',
        'Su rol no cambia; solo cambian las responsabilidades del director de pruebas.'
      ], r: 2,
      why: 'El programa describe esa evolución y precisa que las tareas <b>se amplían</b>: revisar los resultados generados por IA, refinar los prompts y mantener bibliotecas de prompts específicos de las pruebas. Insiste además en que los equipos deben mantener tanto las competencias de prueba tradicionales como los conocimientos de IA.',
      ref: '5.2.3',
      cita: [
        'Los probadores evolucionan de especialistas en diseño y ejecución de pruebas a especialistas en pruebas asistidas por la IA, combinando su experiencia en técnicas de prueba con habilidades para guiar y verificar el testware generado por la IA.'
      ],
      pag: [53] },

    { id: '5.2.3b', cap: 5, lo: 'GenAI-5.2.3', k: 'K1', pts: 1,
      q: '¿Qué nuevas responsabilidades asume el <b>director de pruebas</b> al adoptar IA generativa?',
      o: [
        'Desarrollar una estrategia de prueba basada en IA, gestionar riesgos con IA, supervisar y controlar procesos asistidos por IA, establecer marcos de gobernanza y coordinar equipos híbridos de personas y agentes impulsados por la IA generativa.',
        'Programar y desplegar personalmente la infraestructura impulsada por LLM.',
        'Ajustar finamente los modelos que utiliza su equipo.',
        'Aprobar cada prompt antes de que un probador lo envíe al modelo.'
      ], r: 0,
      why: 'El programa actualiza el rol del director de pruebas con esas responsabilidades, y añade el equilibrio entre capacidades humanas y de IA y garantizar que el equipo conserve las competencias de prueba tradicionales. Subraya además que ya no solo dirigirá probadores humanos: también <b>coordinará agentes de prueba impulsados por la IA generativa</b>, lo que exige nuevas habilidades para supervisar equipos híbridos.',
      ref: '5.2.3',
      cita: [
        'Las responsabilidades de los directores de pruebas se actualizan para incluir el desarrollo de una estrategia de pruebas basada en la IA, la gestión de riesgos basada en la IA y el monitoreo y el control de los procesos de prueba basados en la IA.'
      ],
      pag: [53] }
  ];

  return { meta: meta, blueprint: blueprint, capitulos: capitulos, objetivos: objetivos, secciones: secciones, banco: banco };
})();
