// ── Explicación en lenguaje llano de cada tema de Python ─────────────────────────────────────
// Creado el 2026-08-12. Pedido de Adán, textual: "hay temas que ni siquiera se que son y no me
// das ni explicacion, arregla todo lo de python para que sea informacion valiosa y bien
// explicada, revisa cada uno de los temas y pon informacion que importa para saber de que se
// trata".
//
// El problema real: tanto el `hint` (subtítulo) como el `concept-intro` de cada tema están
// escritos para alguien que YA sabe Python. "Dataclasses" arrancaba con «@dataclass auto-genera
// __init__, __repr__, __eq__» — si no sabes qué es un dunder ni qué es boilerplate, eso no
// explica nada, solo confirma que no entiendes.
//
// Este archivo agrega, ANTES de todo lo demás, un bloque de 3 campos por tema:
//   que  — qué es, en español simple y sin jerga. Si hace falta una analogía, se usa.
//   usa  — para qué sirve de verdad / cuándo lo vas a escribir tú.
//   ojo  — lo que más se malentiende, o por qué importa en una entrevista de QA.
//
// Va en archivo aparte a propósito: NO se toca el HTML ya existente de los temas (son template
// strings largos y frágiles en core.js/data-*.js), así que esto no puede romper nada de lo que
// ya funcionaba. El generador del Dashboard lo antepone al contenido; si un tema no está aquí,
// simplemente no se le agrega nada.
//
// Escrito al nivel de Adán: sabe programar (Mecatrónica IPN, 6 años en testing automotriz) pero
// se define como "director de código, no programador puro" — entiende la lógica, le falta la
// soltura del lenguaje. Por eso nada de "es trivial" ni de asumir vocabulario de Python.

const PY_INTRO = {

  // ═══════════════ FUNDAMENTOS ═══════════════
  'py-for': {
    que: 'Las tres instrucciones con las que un programa decide y repite. <b>if</b> elige un camino según una condición, <b>for</b> recorre algo que ya tienes (una lista, las líneas de un archivo), y <b>while</b> repite mientras se cumpla una condición.',
    usa: 'Es la base de todo. Cualquier script que escribas —recorrer resultados de prueba, filtrar señales, procesar un log— es alguna combinación de estas tres.',
    ojo: 'La diferencia clave: <b>for</b> se usa cuando sabes sobre qué vas a iterar; <b>while</b> cuando no sabes cuántas vueltas serán y dependes de una condición. Usar <b>while</b> donde iba <b>for</b> es el error típico de quien viene de otro lenguaje.'
  },
  'py-listas': {
    que: 'Una fila ordenada de cosas que sí puedes modificar después de crearla: agregar, quitar, reordenar. Es la estructura de datos más usada de Python.',
    usa: 'Cuando tienes varios elementos del mismo tipo y el orden importa: los resultados de una corrida de pruebas, las líneas de un CSV, una lista de IDs.',
    ojo: 'El <i>slicing</i> (<code>lista[inicio:fin:paso]</code>) es lo que más aparece en entrevistas y lo que más se te va a olvidar si no lo practicas. <code>lista[::-1]</code> invierte la lista y es una pregunta clásica.'
  },
  'py-tuplas': {
    que: 'Igual que una lista, pero <b>no se puede modificar</b> una vez creada. Se escribe con paréntesis en vez de corchetes.',
    usa: 'Para datos que no deben cambiar: unas coordenadas, un registro leído de la base, los valores que devuelve una función. Que sea inmutable es una garantía, no una limitación.',
    ojo: 'Como no cambia, Python puede usarla de clave en un diccionario o meterla en un set — una lista no puede. Esa es la respuesta a "¿cuándo tupla y cuándo lista?".'
  },
  'py-dicts': {
    que: 'Guarda pares <b>etiqueta → valor</b>. Como una agenda: buscas por el nombre y te devuelve el teléfono. En otros lenguajes se llama mapa o hash.',
    usa: 'Es la estructura más importante de Python después de la lista. Un JSON de una API, la configuración de un test, un conteo de errores por tipo — todo eso son diccionarios.',
    ojo: 'Buscar por clave es prácticamente instantáneo sin importar cuántos elementos haya: por eso se usa tanto. Y usa <code>.get(clave, valor_por_defecto)</code> en vez de <code>dict[clave]</code> cuando la clave puede no existir — evita que el programa se caiga.'
  },
  'py-sets': {
    que: 'Un conjunto de elementos <b>sin repetidos</b> y sin orden. Si metes el mismo valor dos veces, se queda uno solo.',
    usa: 'Dos cosas que resuelve al instante: quitar duplicados de una lista, y preguntar "¿este valor ya está aquí?" de forma muy rápida aunque haya millones de elementos.',
    ojo: 'También hace operaciones de conjuntos: qué hay en A pero no en B, qué comparten. En pruebas sirve para comparar el conjunto esperado contra el obtenido sin importar el orden.'
  },
  'py-strings': {
    que: 'Todo el manejo de texto: cortarlo, pegarlo, limpiarlo, buscar dentro, reemplazar, cambiar mayúsculas.',
    usa: 'Es lo que más vas a hacer en el día a día: parsear un log, armar un mensaje de error, limpiar espacios de un CSV, construir la URL de una petición.',
    ojo: 'Los <b>f-strings</b> (<code>f"Hola {nombre}"</code>) son la forma moderna de armar texto con variables adentro — si en una entrevista concatenas con <code>+</code>, se nota que traes costumbres viejas.'
  },
  'py-funciones': {
    que: 'Un bloque de código con nombre que puedes reutilizar cuantas veces quieras, pasándole datos distintos. Una <b>lambda</b> es lo mismo pero de una sola línea y sin nombre, para usos rápidos.',
    usa: 'Es cómo dejas de copiar y pegar el mismo código. Si escribes lo mismo dos veces, ahí va una función.',
    ojo: '<code>*args</code> y <code>**kwargs</code> (recibir un número variable de argumentos) es de las preguntas más frecuentes en entrevista, y de las que más confunde. Vale la pena entenderlo bien, no memorizarlo.'
  },
  'py-decoradores': {
    que: 'Una función que <b>envuelve</b> a otra para agregarle un comportamiento sin tocar su código original. Se aplica poniendo <code>@nombre</code> arriba de la función.',
    usa: 'Medir cuánto tarda algo, escribir en el log cada vez que se llama, revisar permisos antes de ejecutar, reintentar si falla. En pruebas los usas todo el tiempo aunque no los escribas: <code>@pytest.fixture</code> y <code>@patch</code> son decoradores.',
    ojo: 'La idea que cuesta: en Python una función es un valor, puedes pasarla como argumento y devolverla. Un decorador solo aprovecha eso. Si entiendes esa frase, entendiste los decoradores.'
  },
  'py-generadores': {
    que: 'Una función que entrega valores <b>de uno en uno, conforme se los pides</b>, en vez de calcular todos y devolverlos juntos. Se hace con <code>yield</code> en lugar de <code>return</code>.',
    usa: 'Para recorrer algo enorme sin llenar la memoria: un archivo de log de varios GB, una consulta con millones de filas. Lees línea por línea y nunca cargas todo.',
    ojo: 'La comparación que te van a pedir: <code>return</code> termina la función y entrega todo; <code>yield</code> la pausa, entrega un valor, y la reanuda donde se quedó cuando le pides el siguiente.'
  },
  'py-tryexcept': {
    que: 'La forma de manejar errores para que el programa no se caiga. Intentas algo dentro de <code>try</code>, y si truena, decides qué hacer en <code>except</code>.',
    usa: 'Todo lo que dependa de algo externo lo necesita: leer un archivo que puede no existir, llamar una API que puede no responder, convertir a número un texto que puede no serlo.',
    ojo: 'Nunca captures errores "en general" sin más (<code>except:</code> a secas): estarías escondiendo bugs reales junto con los esperados. Captura el error específico que sabes que puede pasar. Es un criterio que sí evalúan en entrevista.'
  },
  'py-archivos': {
    que: 'Leer y escribir archivos: texto plano, JSON y CSV, que son los 3 formatos con los que más vas a trabajar.',
    usa: 'Cargar los datos de entrada de una prueba, guardar resultados, leer un archivo de configuración, exportar un reporte.',
    ojo: 'Usa siempre <code>with open(...) as f:</code>. Eso cierra el archivo solo, incluso si ocurre un error a medio camino — abrirlo sin <code>with</code> y olvidar cerrarlo es un error clásico.'
  },
  'py-copy': {
    que: 'Qué pasa de verdad cuando copias una lista o un diccionario que contiene otras listas adentro. La copia <b>superficial</b> duplica lo de afuera pero el interior lo <b>comparte</b>; la copia <b>profunda</b> duplica todo.',
    usa: 'En cuanto trabajes con estructuras anidadas (una lista de listas, un JSON con objetos adentro) y necesites modificar una sin afectar la otra.',
    ojo: 'Es una de las fuentes de bugs más difíciles de encontrar: cambias una copia y "mágicamente" cambia la original. Si alguna vez te pasa, este es el tema. Por eso lo preguntan.'
  },
  'py-tipado': {
    que: 'Anotar de qué tipo es cada dato: que este parámetro es un entero, que esta función devuelve texto. Python <b>no te obliga</b> y no falla si te equivocas — son anotaciones informativas.',
    usa: 'El editor te autocompleta mejor y te marca errores antes de correr nada. En un proyecto con varias personas, es documentación que no se desactualiza.',
    ojo: 'Que no sean obligatorias confunde: no es como Java o C. Pero en código profesional se esperan, y herramientas como <code>mypy</code> sí las verifican. Es señal de código serio.'
  },
  'py-cheatsheet': {
    que: 'Una referencia rápida con los métodos y funciones más usados de Python, todos juntos en un solo lugar.',
    usa: 'Para consultar cuando ya sabes qué quieres hacer pero no recuerdas cómo se escribe. No es para aprender de cero — es el que abres mientras programas.',
    ojo: 'Nadie memoriza esto. Lo que sí se espera es que sepas que existe cada cosa y dónde buscarla; el nombre exacto se consulta.'
  },

  // ═══════════════ POO ═══════════════
  'poo-clase': {
    que: 'Una <b>clase</b> es el molde y un <b>objeto</b> es lo que sale del molde. La clase "Coche" define que todo coche tiene marca y velocidad; cada coche concreto que crees es un objeto.',
    usa: 'Cuando tienes datos y comportamiento que van juntos: una clase <code>Sensor</code> con su valor, su unidad y su método para calibrarse.',
    ojo: '<code>__init__</code> es el código que corre al crear el objeto (donde le pones sus valores iniciales) y <code>self</code> es la forma en que el objeto se refiere a sí mismo. Esas dos palabras son el 80% de la confusión inicial con POO en Python.'
  },
  'poo-principios': {
    que: 'Los 4 conceptos sobre los que se construye toda la programación orientada a objetos: encapsulación, herencia, polimorfismo y abstracción.',
    usa: 'Más que escribirlos, se usan para <b>decidir</b> cómo organizar el código. Y son pregunta de entrevista casi garantizada en cualquier puesto de software.',
    ojo: 'El que más cuesta explicar es <b>polimorfismo</b>: significa que objetos distintos responden al mismo método a su manera. Si tienes <code>Perro</code> y <code>Gato</code>, ambos tienen <code>hablar()</code> pero cada uno hace algo diferente.'
  },
  'poo-herencia': {
    que: 'Una clase puede <b>heredar</b> de otra: se queda con todo lo que la otra ya tenía y le agrega o cambia lo suyo. <code>ElectricCar</code> hereda de <code>Car</code>.',
    usa: 'Para no repetir código cuando varias clases comparten una base común. En pruebas lo ves constantemente: tus clases de test heredan de <code>TestCase</code>.',
    ojo: 'El <b>MRO</b> es el orden en que Python busca un método cuando una clase hereda de varias a la vez. Suena académico, pero es exactamente lo que preguntan cuando quieren separar a quien memorizó de quien entendió.'
  },
  'poo-metodos': {
    que: 'Los métodos con doble guion bajo a los lados que hacen que <b>tu</b> objeto funcione con la sintaxis normal de Python. Defines <code>__len__</code> y entonces <code>len(objeto)</code> funciona; defines <code>__add__</code> y entonces <code>a + b</code> funciona; defines <code>__iter__</code> y se puede recorrer con <code>for</code>.',
    usa: 'Cuando quieres que tu clase se sienta natural de usar en vez de obligar a llamar métodos con nombres raros.',
    ojo: 'Se llaman <b>dunder</b> (por "double underscore"). No los llamas tú directamente: defines <code>__len__</code> y Python lo usa cuando alguien escribe <code>len(objeto)</code>. Esa indirección es lo que hay que entender.'
  },
  'poo-abstractas': {
    que: 'Una clase que <b>no se puede usar directamente</b> y que obliga a sus hijas a implementar ciertos métodos. Es un contrato: "si heredas de mí, tienes que tener estos métodos".',
    usa: 'Cuando defines una familia de clases que deben compartir la misma interfaz — varios tipos de reporte, varios drivers de dispositivo — y quieres que el error salte al escribir el código, no en producción.',
    ojo: 'Es el equivalente en Python a las <b>interfaces</b> de Java o C#. Si vienes de ahí, esa es la traducción directa.'
  },
  'poo-dataclass': {
    que: 'Un atajo para las clases que solo <b>guardan datos</b> y casi no tienen lógica. Pones <code>@dataclass</code> arriba y Python te escribe solo el código repetitivo: cómo se crea, cómo se imprime y cómo se compara con otra.',
    usa: 'Para representar un registro: un resultado de prueba, una configuración, una fila de un CSV. En vez de 15 líneas mecánicas, escribes 4 con los nombres y tipos de los campos.',
    ojo: 'Ese código repetitivo que te ahorra se llama <b>boilerplate</b>. Y <code>frozen=True</code> hace que el objeto no se pueda modificar después de crearlo, que es lo que te permite usarlo de clave en un diccionario.'
  },
  'poo-patrones': {
    que: 'Soluciones ya probadas a problemas de diseño que se repiten en todos los proyectos. No son código para copiar: son formas de organizar que ya tienen nombre.',
    usa: 'Tener el nombre te ahorra explicaciones: decir "esto es un Factory" comunica en 3 palabras lo que si no tomaría un párrafo. En entrevista, reconocerlos vale más que recitarlos.',
    ojo: 'Los 4 que más salen: <b>Singleton</b> (que exista una sola instancia, p. ej. la conexión a la base), <b>Factory</b> (crear objetos sin que quien los pide sepa cómo se construyen), <b>Observer</b> (avisar a varios cuando algo cambia) y <b>Strategy</b> (intercambiar el algoritmo sin tocar el resto).'
  },

  // ═══════════════ TESTING — UNITTEST ═══════════════
  'ut-intro': {
    que: '<b>unittest</b> es el framework de pruebas que ya viene incluido con Python — no hay que instalar nada. Escribes clases que heredan de <code>TestCase</code> y métodos que empiezan con <code>test_</code>.',
    usa: 'Es el estándar en empresas y proyectos que no quieren dependencias externas. Es también con el que más te vas a topar en código heredado.',
    ojo: 'Es tu terreno: llevas 6 años en testing automotriz. Lo que cambia aquí no es el concepto de prueba, es la sintaxis de Python. Y el detalle que importa: si el método no empieza con <code>test_</code>, no se ejecuta y nadie te avisa.'
  },
  'ut-estructura': {
    que: 'Cómo se organiza por dentro un test bien escrito, con el patrón <b>AAA</b>. Son sus 3 partes en orden: <i>Arrange</i> (preparas lo que necesitas), <i>Act</i> (ejecutas lo que quieres probar) y <i>Assert</i> (verificas que el resultado sea el esperado).',
    usa: 'Es lo que separa una suite mantenible de una que nadie quiere tocar. Cuando un test falla, la estructura te dice de inmediato en qué parte se rompió.',
    ojo: 'La regla que más se rompe: <b>un test verifica una sola cosa</b>. Si un test comprueba cinco comportamientos y falla, no sabes cuál se rompió — y ese es exactamente el problema que los tests deberían resolver.'
  },
  'ut-setup': {
    que: 'Código que corre automáticamente <b>antes</b> y <b>después</b> de tus tests, para preparar y limpiar. <code>setUp</code> corre antes de cada test; <code>setUpClass</code>, una sola vez para toda la clase.',
    usa: 'Abrir una conexión, crear datos de prueba, montar un archivo temporal — y deshacerlo después para que un test no le deje basura al siguiente.',
    ojo: 'La diferencia de <b>cuándo</b> corre cada uno es lo que preguntan: <code>setUp</code> se repite en cada test (más lento pero cada test arranca limpio), <code>setUpClass</code> una sola vez (más rápido pero los tests comparten estado, y ahí nacen fallos intermitentes).'
  },
  'ut-asserts': {
    que: 'Los métodos con los que <b>verificas</b> el resultado de la prueba. Comprueban que dos valores sean iguales, que algo sea verdadero, que un elemento esté dentro de una lista o que se haya lanzado el error esperado.',
    usa: 'Es el corazón del test: sin un assert, el test solo comprueba que el código no truena, no que haga lo correcto.',
    ojo: 'Usa el assert específico, no <code>assertTrue(a == b)</code>. Con <code>assertEqual(a, b)</code>, cuando falla te dice <b>qué</b> valor obtuvo y cuál esperaba; con <code>assertTrue</code> solo te dice "falso" y a investigar a mano.'
  },
  'ut-mock': {
    que: 'Sustituir una pieza real por una <b>falsa y controlada</b> durante la prueba. En vez de llamar a la API de verdad, le pones un doble que responde lo que tú decides.',
    usa: 'Para probar sin depender de cosas lentas, caras o que fallan solas: una API externa, la base de datos, un sensor, la hora del sistema. También para forzar el caso de error que en la vida real casi nunca ocurre.',
    ojo: 'Es probablemente el tema de testing que más se pregunta en entrevista, y el que más se hace mal. La regla: <b>mockeas lo que está fuera de tu control</b>, no la lógica que estás probando — si mockeas de más, el test pasa siempre y no comprueba nada.'
  },
  'ut-decoradores': {
    que: 'Etiquetas que pones arriba de un test para <b>saltarlo</b> bajo ciertas condiciones, o para marcar que ya sabes que va a fallar.',
    usa: 'Saltar tests que solo aplican a Windows, o que dependen de un servicio que hoy está caído, sin borrarlos ni comentarlos.',
    ojo: 'Saltar un test es honesto (queda registrado y visible en el reporte); comentarlo es esconderlo — desaparece del conteo y nadie se acuerda de volver a activarlo. La diferencia importa en una revisión de código.'
  },
  'ut-subtest': {
    que: 'Permite que un test que revisa <b>muchos casos en un bucle</b> no se detenga en el primer fallo, y te reporte todos los que fallaron.',
    usa: 'Cuando pruebas la misma función con 20 combinaciones de datos. Sin esto, ves el primer fallo, lo arreglas, corres otra vez, ves el segundo… uno por uno.',
    ojo: 'Es el equivalente en unittest a <code>parametrize</code> de pytest. Si mencionas que conoces los dos y cuándo usar cada uno, se nota experiencia real.'
  },
  'ut-doctest': {
    que: 'Tests escritos <b>dentro de la documentación</b> de la función: pones un ejemplo de uso con su resultado esperado, y Python verifica que siga siendo cierto.',
    usa: 'Para funciones pequeñas y didácticas donde el ejemplo vale como documentación y como prueba a la vez. Garantiza que los ejemplos del manual no se queden obsoletos.',
    ojo: 'No sustituye a una suite de verdad: sirve para casos simples. Su valor real es que la documentación no puede mentir, porque si miente el test falla.'
  },

  // ═══════════════ TESTING — PYTEST ═══════════════
  'pt-intro': {
    que: '<b>pytest</b> es la alternativa moderna a unittest. Hace lo mismo pero con mucho menos ceremonia: no necesitas crear clases ni heredar de nada, y verificas con el <code>assert</code> normal de Python.',
    usa: 'Es lo que usa hoy la mayoría de los proyectos nuevos. Si vas a aprender uno solo a fondo, que sea este.',
    ojo: 'Se instala aparte (<code>pip install pytest</code>), a diferencia de unittest que ya viene incluido. Y entiende los tests de unittest también, así que se puede adoptar sin reescribir lo que ya existe — ese dato vale oro en una entrevista.'
  },
  'pt-fixtures': {
    que: 'El equivalente de <code>setUp</code> en pytest, pero más flexible: una función que <b>prepara algo</b> y se lo entrega a los tests que la pidan por nombre.',
    usa: 'Preparar una conexión, un cliente de API, datos de prueba — una sola vez y reutilizable en todos los tests que lo necesiten.',
    ojo: 'Lo que más se malentiende es el <b>scope</b>: define cada cuánto se vuelve a crear (en cada test, una vez por archivo, una vez por sesión completa). Elegirlo mal es la causa típica de tests que pasan solos pero fallan juntos.'
  },
  'pt-parametrize': {
    que: 'Correr el <b>mismo test</b> con muchos juegos de datos distintos, sin escribirlo varias veces. Le pasas una lista de entradas con su resultado esperado y pytest genera un test por cada una.',
    usa: 'Probar una función con casos límite: vacío, negativo, muy grande, con acentos. Cada caso aparece por separado en el reporte, así que ves exactamente cuál falló.',
    ojo: 'Es de lo más útil que tiene pytest y de lo primero que se nota si <b>no</b> lo usas: cinco tests casi idénticos copiados y pegados es justo lo que este decorador elimina.'
  },
  'pt-marks': {
    que: 'Etiquetas que le pones a los tests para poder <b>filtrarlos</b> después: correr solo los rápidos, solo los de integración, saltar los que sabes que fallan.',
    usa: 'En un proyecto grande no corres los 2,000 tests en cada cambio. Etiquetas los lentos y en tu máquina corres solo los rápidos; los completos quedan para el servidor.',
    ojo: 'Hay que registrar las marcas en la configuración (<code>pytest.ini</code>) o pytest te avisa con una advertencia en cada corrida. Detalle chico que ensucia la salida si se ignora.'
  },
  'pt-conftest': {
    que: 'Un archivo con nombre fijo, <code>conftest.py</code>, donde pones las fixtures y la configuración que quieres <b>compartir</b> entre varios archivos de test. pytest lo encuentra solo, sin importarlo.',
    usa: 'Cuando la misma preparación la necesitan varios archivos: la conexión a la base, el cliente de API, los datos base.',
    ojo: 'La parte que sorprende: <b>no se importa</b>. Lo colocas en la carpeta y pytest lo aplica a todo lo que esté ahí y en sus subcarpetas. Puedes tener varios, uno por nivel.'
  },
  'pt-assert': {
    que: 'En pytest verificas con el <code>assert</code> normal de Python, sin métodos especiales — y aun así, cuando falla, te muestra el detalle de qué esperaba y qué obtuvo.',
    usa: 'Es lo que hace a pytest más ligero de escribir: <code>assert resultado == 42</code> en vez de <code>self.assertEqual(resultado, 42)</code>.',
    ojo: 'Para comparar decimales usa <code>pytest.approx</code>: <code>0.1 + 0.2</code> no da exactamente <code>0.3</code> en ningún lenguaje, por cómo se guardan los números con punto flotante. Es una pregunta trampa clásica.'
  },
  'pt-reportes': {
    que: 'Generar el resultado de las pruebas en un archivo presentable. Puede ser una página HTML para leerla con el navegador, o un XML en formato JUnit que las herramientas de integración continua entienden.',
    usa: 'Para que el resultado no viva solo en tu terminal: que quede el reporte en el servidor de CI, se pueda adjuntar a un ticket o mostrarlo en una revisión.',
    ojo: 'El formato <b>JUnit XML</b> es un estándar que consumen Jenkins, GitLab y GitHub Actions por igual, aunque nada de eso sea Java. Es el pegamento entre tus tests y cualquier herramienta de CI.'
  },
  'coverage': {
    que: 'Mide <b>qué porcentaje de tu código llegaron a ejecutar</b> los tests, y te señala exactamente qué líneas nunca se tocaron.',
    usa: 'Para encontrar los huecos: esa rama del <code>if</code> que nunca se probó, ese manejo de error que nadie ejecutó jamás.',
    ojo: 'Cuidado con el número: <b>100% de cobertura no significa que esté bien probado</b>. Solo dice que las líneas se ejecutaron, no que verificaste el comportamiento correcto. Saber decir eso en una entrevista te distingue de quien solo persigue el porcentaje.'
  },
  'ut-api': {
    que: 'Probar servicios web: haces la petición HTTP con la librería <code>requests</code> y verificas el código de respuesta y el contenido devuelto.',
    usa: 'Es de lo más pedido hoy en QA. Comprobar que un endpoint responde 200, que el JSON trae los campos correctos, que un dato inválido devuelve 400.',
    ojo: 'La decisión importante es cuándo llamar a la API real y cuándo simularla. Contra la real detectas problemas verdaderos pero los tests se vuelven lentos e inestables; simulada son rápidos y confiables pero no ven si el servicio cambió.'
  },
  'ut-faker': {
    que: 'Una librería que <b>genera datos falsos realistas</b>: nombres, correos, direcciones, fechas, teléfonos — con formato válido, no basura.',
    usa: 'Para llenar pruebas sin inventar datos a mano ni usar información real de personas. Puedes pedirle datos mexicanos con <code>Faker("es_MX")</code>.',
    ojo: 'Como cada corrida genera datos distintos, puedes descubrir fallos que con datos fijos nunca aparecerían. La contra: si un test falla, hay que poder reproducir esos datos — para eso se fija la semilla.'
  },
  'gh-actions-py': {
    que: 'Configurar GitHub para que <b>corra tus pruebas solo</b>, cada vez que subes código, en sus servidores.',
    usa: 'Para que nadie integre algo que rompe la suite sin enterarse. El resultado queda visible en el repositorio y puedes bloquear la fusión si los tests fallan.',
    ojo: 'Esto es <b>CI/CD</b>, y aparece en casi toda oferta de QA hoy. Montarlo en tu propio repositorio es de las cosas que más rápido puedes mostrar como evidencia real, no solo mencionarlo en el CV.'
  },
  'ia-test': {
    que: 'Usar IA para <b>generar casos de prueba</b>: le das la función y te propone los tests, incluidos casos límite que quizá no habrías considerado.',
    usa: 'Para arrancar rápido y para que te sugiera escenarios que se te pasaron. Ahorra sobre todo el trabajo mecánico de escribir la estructura repetitiva.',
    ojo: 'Nunca aceptes lo que genere sin revisarlo: la IA escribe tests que <i>parecen</i> correctos y a veces verifican lo que el código hace en lugar de lo que <b>debería</b> hacer — y ese test pasa aunque el código esté mal. Como ya usas Claude Code a diario, este criterio ya lo tienes; aquí solo se nombra.'
  }
};

if (typeof module !== 'undefined' && module.exports) module.exports = { PY_INTRO };
