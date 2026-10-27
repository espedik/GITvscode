/* La práctica de cada paso de Habilidades Base (Adán, 26-oct-2026: "lo de coach habilidades, haz lo mismo para habilidades
   base"). Por ficha (el id de HABILIDAD_DETALLE) y por el título exacto del paso, lo que dashboard.html le suma al cargar:
   `sesion` —tres tiempos en minutos: arranca, el bloque y cierra—, `sale` —cómo sabes que salió—, `subtemas` —tres, cada
   uno con su explicación y tres claves—, `copia` —el guion, la plantilla o la lista que se usa tal cual— y `ic`, su ícono
   en Dashboard/iconos-base/ (Fluent Emoji 3D de Microsoft, licencia MIT, github.com/microsoft/fluentui-emoji). Los pasos de
   cierre (Qué leer, Ya lo dominas) llevan solo el ícono. No cambia los pasos ni su número: el avance guardado sigue igual.
   El control 47 del verificador avisa si un paso se queda sin su práctica, si un título ya no existe o si falta un ícono. */
const HB_PRACTICA = {
  citas: {
    "Primero: qué cita es": { ic: "thinking-face",
      sesion: [[5, "Piensa en la próxima salida que tengas o quieras proponer y contesta por escrito las tres preguntas: cuánto se conocen, si hay que hablar o hacer algo, y cuánto ruido aguantan."],
               [10, "Con esas tres respuestas elige el tipo de plan: café corto, comida de día, cena, terraza, copas o un plan con actividad."],
               [5, "Escribe el plan en una línea con su duración esperada y su salida fácil."]],
      sale: "Elegiste el tipo de cita por lo que necesita la cita, no por lo bueno que es el lugar, y sabes cuánto debería durar.",
      subtemas: [
        { t: "La excitación se contagia al lugar", d: "En el experimento del puente de Dutton y Aron (1974), los hombres que cruzaban un puente colgante que se mecía se sintieron más atraídos por la entrevistadora que los de un puente firme: el cuerpo confunde la emoción del lugar con la de la persona. Un plan con algo de novedad hace parte del trabajo.", l: [
          "Lo nuevo para los dos —un museo, una lucha, una trajinera— se recuerda más que una cena más.",
          "La emoción no tiene que ser peligro: basta lo distinto y lo compartido.",
          "Un lugar aburrido le pone una etiqueta aburrida a la noche, aunque la charla vaya bien."] },
        { t: "Hacer algo juntos quita presión", d: "Cara a cara, cada silencio pesa; lado a lado, mirando algo, el silencio es normal. Los planes con actividad sirven sobre todo cuando todavía no hay confianza, porque la conversación sale de lo que están viendo.", l: [
          "Primeras citas: actividad corta o café, no cena larga.",
          "Lo que ven juntos da temas: «¿qué te pareció esa sala?».",
          "Deja la cena de tres tiempos para cuando ya haya confianza."] },
        { t: "El ruido decide la conversación", d: "Por encima de unos 70 decibeles hay que alzar la voz para hablar a un metro, y muchos restaurantes de moda pasan de ahí en hora pico. Si el plan es conocer a alguien, elige lugares y horarios con poco ruido.", l: [
          "Pide mesa lejos de la barra y de la cocina.",
          "Comer a las 2 es más tranquilo que cenar a las 9.",
          "Si al llegar no se oyen, cambia de mesa o de lugar sin pena."] }] },
    "Primera cita — café y salida fácil": { ic: "hot-beverage",
      sesion: [[5, "Elige uno de los cuatro cafés según la zona de los dos y cómo quieres que se sienta: corto, sentado, informal o de especialidad."],
               [10, "Revisa en el mapa qué hay caminando cerca para alargar si va bien —un parque, una librería, otro café—."],
               [5, "Escribe la invitación concreta: día, hora, lugar y cuánto tiempo tienes."]],
      sale: "La invitación tiene lugar, hora y un final natural, y tienes listo a dónde caminar si va bien.",
      copia: { t: "La invitación", l: [
        "¿Te late un café el ______ a las ______ en ______?",
        "Tengo como una hora antes de ______, pero si se alarga, cerca hay ______."] },
      subtemas: [
        { t: "Por qué una primera cita corta funciona", d: "Una primera cita de 45 a 60 minutos deja a los dos con ganas de más en vez de agotar la conversación. Es el mismo efecto pico-final que describe Kahneman: se recuerda el mejor momento y el final; mejor terminar en alto que apagarse.", l: [
          "Pon un final natural desde la invitación: «tengo una hora antes de…».",
          "Si va bien, alárgalo caminando: el cambio de escena renueva la charla.",
          "Si no va bien, se acaba sin que nadie quede mal."] },
        { t: "La luz del día ayuda", d: "De día o en la tarde temprana hay menos presión, menos expectativas románticas forzadas y más seguridad para la otra persona, sobre todo si no te conoce bien. Es también el horario más fácil de aceptar.", l: [
          "Entre las 11 y las 5 es el rango más cómodo.",
          "Un lugar con gente alrededor da tranquilidad a quien no te conoce.",
          "Propón tú el lugar: quitarle esa decisión al otro es un favor."] },
        { t: "Lo que se nota en los primeros minutos", d: "Las primeras impresiones se forman muy rápido: estudios de Willis y Todorov encontraron juicios de confianza a partir de una décima de segundo de ver una cara. No puedes controlarlo todo, pero sí llegar antes, tranquilo y con atención total.", l: [
          "Llega diez minutos antes y escoge mesa.",
          "Celular guardado, no boca abajo sobre la mesa.",
          "Saluda con su nombre y una sonrisa; el resto es conversación."] }] },
    "Comer bien de día": { ic: "fork-and-knife-with-plate",
      sesion: [[5, "Elige uno de los cuatro lugares y averigua si se reserva y con cuánta anticipación."],
               [10, "Reserva o anota el día para reservar, y busca qué hay caminando cerca para después de comer."],
               [5, "Anota el lugar en tu lista de citas con zona, si se reserva y para qué tipo de cita sirve."]],
      sale: "Tienes un lugar de comida listo, con su reserva resuelta o su fecha para reservar, y un plan cerca para después.",
      subtemas: [
        { t: "La comida, el horario subestimado", d: "La comida del mediodía tiene luz, menos ruido y una duración natural: termina cuando acaba la sobremesa. En CDMX además hay lugares de mariscos y de cocina de día que no abren de noche.", l: [
          "Funciona para segundas y terceras citas.",
          "Un sábado a las 2 es más relajado que un viernes a las 9.",
          "La sobremesa es el mejor momento para hablar: no tengas prisa."] },
        { t: "Pedir para compartir", d: "Compartir platos crea una pequeña colaboración: deciden juntos, prueban juntos y comentan. Es más cercano que dos platos separados y da conversación sobre la comida misma.", l: [
          "Propón dos o tres platos al centro.",
          "Pregunta qué no come antes de pedir.",
          "Deja que elija uno; tú elige otro."] },
        { t: "El mercado como plan", d: "Un mercado como San Juan es una cita con actividad: caminan, prueban, preguntan a los marchantes. Para alguien curioso es más memorable que un restaurante, y cuesta mucho menos.", l: [
          "Pregunta antes si le gusta probar cosas raras.",
          "Ve con hambre y pide porciones pequeñas en varios puestos.",
          "Ten un café cerca para sentarse a hablar después."] }] },
    "Cenar sin quedar mal": { ic: "candle",
      sesion: [[5, "Memoriza los cuatro nombres de esta lista con su zona y qué tienen de especial."],
               [15, "Elige tus tres de cabecera para cena y averigua de cada uno cuánta anticipación pide la reserva y si tiene valet."],
               [5, "Guarda los tres en una nota «Cenas» con esos datos."]],
      sale: "Puedes nombrar tres lugares para cenar, su zona y cuánto antes se reserva, sin buscar en el celular.",
      subtemas: [
        { t: "Tres de cabecera, no treinta", d: "Tener tres lugares que conoces bien vale más que saber de cuarenta. En uno conocido sabes qué pedir, dónde está la mejor mesa y cuánto tarda: te mueves con soltura y eso se nota.", l: [
          "Uno formal, uno informal y uno bonito.",
          "Ve antes tú solo o con un amigo para conocerlo.",
          "Que el personal te reconozca suma puntos sin que lo busques."] },
        { t: "Leer la carta con calma", d: "En un restaurante bueno, pedir con seguridad es parte de la experiencia. Pregunta al mesero qué recomienda y por qué; es su trabajo y casi siempre acierta.", l: [
          "«¿Qué es lo que mejor les sale hoy?».",
          "Si no conoces un plato, pregunta; no adivines.",
          "Deja que la otra persona pida primero."] },
        { t: "Sin alcohol y sin explicaciones", d: "Mientras dure tu meta de no tomar, la cena se disfruta igual: muchos lugares de CDMX tienen bebidas sin alcohol bien hechas, aguas de temporada o mocktails. No hace falta explicar; basta pedir con naturalidad.", l: [
          "«Para mí un agua de jamaica» o «¿qué tienen sin alcohol?».",
          "Si te preguntan, una frase basta: «ahorita no estoy tomando».",
          "No presiones a la otra persona: que pida lo que quiera."] }] },
    "Terrazas — cuando la vista es el plan": { ic: "sunset",
      sesion: [[5, "Elige una terraza de la lista según el plan: atardecer y conversación, vista del Centro o terminar la noche."],
               [10, "Revisa la hora de la puesta de sol del día que piensas ir y llama o reserva pidiendo mesa en la baranda."],
               [5, "Si es temporada de lluvias, ten un plan B bajo techo a cinco minutos."]],
      sale: "La reserva dice baranda, llegas antes de la puesta de sol y sabes a dónde ir si llueve.",
      subtemas: [
        { t: "La hora dorada", d: "La hora antes de la puesta de sol tiene la luz más cálida y favorecedora; los fotógrafos la llaman hora dorada. Llegar 40 minutos antes del atardecer te da luz bonita, el atardecer mismo y la ciudad encendiéndose.", l: [
          "Busca la hora exacta del atardecer de ese día.",
          "Llega 30 a 45 minutos antes.",
          "Después del atardecer, la vista nocturna es un segundo plan."] },
        { t: "La temporada de lluvias en CDMX", d: "De junio a septiembre suele llover en la tarde y la noche, a menudo con fuerza y en poco tiempo. Muchas terrazas mandan a todos adentro, y adentro no es lo que reservaste.", l: [
          "En temporada de lluvias, mejor una comida en terraza que una cena.",
          "Pregunta al reservar si tienen toldo o área techada.",
          "Ten un lugar bajo techo cerca como plan B."] },
        { t: "Lo que cambia la altura", d: "En una terraza alta la vista hace parte de la conversación: señalar lugares, contar historias de la ciudad. Prepara dos o tres datos de lo que se ve y la conversación arranca sola.", l: [
          "Desde la Torre Latinoamericana: el Palacio de Bellas Artes, la Alameda.",
          "Desde el Centro: la Catedral y el Templo Mayor.",
          "Una historia de la ciudad bien contada vale más que un dato de guía."] }] },
    "Cuando la ocasión lo pide": { ic: "glowing-star",
      sesion: [[5, "Decide cuál de las dos ocasiones del año lo merece: un aniversario, un logro, un cumpleaños."],
               [15, "Revisa cómo y cuándo abren reservaciones en Pujol y Quintonil y pon un recordatorio para el día que abren."],
               [5, "Separa el presupuesto en tu plan de Finanzas para no pagarlo con tarjeta sin plan."]],
      sale: "Sabes cuándo abren reservaciones, tienes el recordatorio y el dinero está apartado antes de reservar.",
      subtemas: [
        { t: "Cómo se consigue una mesa difícil", d: "Los restaurantes de las listas mundiales abren reservaciones en línea en fechas fijas y se llenan rápido. La clave es saber cuándo abren, estar listo ese día y aceptar horarios menos pedidos, como la comida en vez de la cena.", l: [
          "Revisa en su sitio oficial cuándo liberan fechas.",
          "Ten varias fechas posibles, no una sola.",
          "Inscríbete en la lista de espera si la tienen."] },
        { t: "El menú degustación", d: "Muchos de estos lugares sirven un menú de varios tiempos. Dura de dos a tres horas y es más una experiencia que una cena: avisa de alergias o restricciones al reservar y ve sin prisa.", l: [
          "Avisa al reservar si alguien no come algo.",
          "Pregunta si hay maridaje sin alcohol; muchos lo ofrecen.",
          "Separa la tarde completa: no lo encajes antes de otro plan."] },
        { t: "Celebrar sin desacomodar el plan", d: "Una cena así puede costar lo mismo que semanas de súper. No está mal, siempre que esté planeada: ahorrarla antes convierte un gasto que duele en uno que se disfruta.", l: [
          "Apártalo como meta con fecha en Finanzas.",
          "Págalo de contado, no a meses sin plan.",
          "Una vez al año bien hecha vale más que muchas a medias."] }] },
    "Copas — la segunda parte": { ic: "tropical-drink",
      sesion: [[5, "Elige un bar de la lista que sirva para hablar, no para gritar."],
               [10, "Revisa si se reserva y si tienen carta sin alcohol; mientras dure tu meta, que sea un requisito."],
               [5, "Ubica el bar a menos de diez minutos de dónde cenarán."]],
      sale: "Tienes un bar a pie de tu cena, con reserva si la pide y con opciones sin alcohol que te gusten.",
      subtemas: [
        { t: "La coctelería sin alcohol", d: "Los buenos bares de CDMX hacen bebidas sin alcohol con la misma técnica que sus cocteles: equilibrio de dulce, ácido y amargo, buen hielo y buena presentación. Pedir una no te saca de la experiencia.", l: [
          "Pide «algo sin alcohol que sea de la casa».",
          "Lo amargo y lo herbal se sienten más de adulto que lo muy dulce.",
          "Lo ves a fondo en la ficha de coctelería."] },
        { t: "El speakeasy y su juego", d: "Un speakeasy imita los bares escondidos de la prohibición en Estados Unidos: entrada discreta, dirección que te dan al reservar, a veces una contraseña. El misterio es parte del plan y da tema de conversación.", l: [
          "Reserva siempre: muchos tienen cupo muy limitado.",
          "Llega puntual; la mesa se libera rápido.",
          "No cuentes el truco de la entrada antes: que lo descubra."] },
        { t: "Saber cuándo terminar", d: "La segunda parte de la noche es la que más fácil se alarga de más. Terminar cuando todavía está bien deja ganas de repetir, igual que en la primera cita.", l: [
          "Una o dos bebidas, no la noche entera.",
          "Ofrece llevar o pedir el coche de regreso.",
          "Cierra con un plan concreto para la próxima vez si fue bien."] }] },
    "Citas que no son comer": { ic: "admission-tickets",
      sesion: [[5, "Elige un plan de la lista según lo que le gusta a la otra persona: arte, historia, algo ruidoso o algo tranquilo."],
               [15, "Revisa horarios y reservas —la Casa Barragán solo con visita guiada—, compra boletos si aplica y elige un lugar cerca para comer después."],
               [5, "Prepara dos preguntas sobre el lugar para abrir la conversación."]],
      sale: "El plan tiene boletos o reserva, un lugar para después y dos temas listos para conversar.",
      subtemas: [
        { t: "La novedad compartida une", d: "Arthur Aron encontró que las parejas que hacen juntas actividades nuevas y estimulantes reportan más satisfacción que las que repiten actividades agradables pero conocidas. Lo nuevo se recuerda y se asocia con la otra persona.", l: [
          "Elige algo que ninguno de los dos haya hecho.",
          "No tiene que ser caro: la lucha libre o una trajinera cuestan poco.",
          "Cuenta después lo que más te gustó: fija el recuerdo."] },
        { t: "Cómo recorrer un museo en pareja", d: "Un museo enorme cansa y aburre si se quiere ver todo. Elegir dos salas y detenerse a comentar lo que les llama la atención convierte el recorrido en conversación.", l: [
          "Elijan dos salas antes de entrar.",
          "Pregunta «¿cuál te llevarías a tu casa?» frente a una obra.",
          "Salgan antes de cansarse; la terraza o el café son parte del plan."] },
        { t: "Planes ruidosos a propósito", d: "La lucha libre o Xochimilco en fin de semana no son para conversar a fondo; son para reírse y compartir una experiencia. Funcionan cuando ya hay algo de confianza o con alguien muy extrovertido.", l: [
          "Úsalos de segunda o tercera cita, no de primera.",
          "Combínalos con un lugar tranquilo para hablar después.",
          "Llega temprano para tener buenos lugares."] }] },
    "La logística que nadie ve": { ic: "clipboard",
      sesion: [[5, "Copia la lista de logística en una nota y revisa la próxima cita contra ella."],
               [10, "Haz lo que falte: reserva, confirma, revisa el estacionamiento o el valet, y anota tu plan B a cinco minutos."],
               [5, "El día de la cita, confirma por teléfono o mensaje y sal con margen para llegar diez minutos antes."]],
      sale: "Llegaste antes, la mesa estaba confirmada, tenías plan B y la cuenta se resolvió sin discusión.",
      copia: { t: "La lista de la cita", l: [
        "☐ Reservado en ______ a las ______ (a nombre de ______)",
        "☐ Confirmado el mismo día",
        "☐ Cómo llego y dónde me estaciono / valet: ______",
        "☐ Plan B a cinco minutos: ______",
        "☐ Llego diez minutos antes",
        "☐ La cuenta: la pido discretamente o la dejo resuelta"] },
      subtemas: [
        { t: "La carga mental se nota", d: "Cuando todo está resuelto antes, tu atención queda libre para la otra persona. Cuando improvisas, una parte de tu cabeza está buscando estacionamiento o pensando en la reserva, y se nota.", l: [
          "Resuelve la logística el día anterior.",
          "Ten el plan B decidido, no «ya veremos».",
          "Llegar antes te da tiempo de bajar las revoluciones."] },
        { t: "Quién paga, sin incomodidad", d: "No hay regla única; lo que incomoda es la discusión frente a la mesa. Si invitaste tú, lo natural es pagar; si la otra persona insiste en dividir, aceptarlo con gracia también está bien.", l: [
          "Si invitaste, paga sin espectáculo: pide la cuenta discretamente.",
          "Si propone dividir, acepta sin hacer drama.",
          "Nunca comentes el precio en la mesa."] },
        { t: "Seguridad y regreso", d: "Pensar en cómo regresa la otra persona es parte de ser buen anfitrión. Ofrecer pedir un coche o acompañar a la parada dice más que cualquier detalle caro.", l: [
          "Pregunta cómo regresa antes de que termine la noche.",
          "Ofrece pedir el coche; si acepta, espera a que llegue.",
          "Un mensaje de «¿llegaste bien?» cierra la noche con cuidado."] }] },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  networking: {
    "Qué es y qué no es": { ic: "handshake",
      sesion: [[5, "Cuenta en tu celular a cuántas personas podrías escribirles mañana sin que les pareciera raro; anota el número y la fecha."],
               [15, "Sepáralas en tres grupos —cercanos, conocidos con trato y gente que solo te ubica— y marca a cinco con quienes la relación se enfrió."],
               [5, "Elige a una de esas cinco y escríbele hoy un mensaje que no pida nada."]],
      sale: "Tu número de partida está anotado con fecha y salió un mensaje sin petición.",
      subtemas: [
        { t: "Capital social: la red como un activo", d: "Pierre Bourdieu y después Robert Putnam (<i>Bowling Alone</i>) llamaron capital social a lo que te llega por tus relaciones: información, confianza y oportunidades. Funciona como el dinero: se acumula con tiempo, rinde intereses y se agota si solo retiras.", l: [
          "Cada favor que haces es un depósito; cada petición, un retiro.",
          "Una red sana tiene muchos más depósitos que retiros.",
          "Los intereses llegan como información: vacantes, consejos y presentaciones que no buscabas."] },
        { t: "El número de Dunbar y tus círculos", d: "El antropólogo Robin Dunbar estimó que una persona sostiene unas 150 relaciones con nombre, en capas: unas 5 íntimas, 15 cercanas, 50 amigos y 150 conocidos. No se pueden atender todas igual, y no hace falta.", l: [
          "Tu lista de 20 vive entre la capa de 50 y la de 150.",
          "Subir a alguien de capa pide contacto repetido, no un gran gesto.",
          "Un conocido con el que no hablas hace años está dormido, no perdido."] },
        { t: "Construir una red no es vender", d: "Vender busca cerrar hoy; construir una red busca que dentro de un año alguien piense en ti cuando aparezca una oportunidad. Cuando mezclas las dos, la otra persona lo nota y se protege.", l: [
          "Si tu primer mensaje lleva una petición, es venta.",
          "Si a la tercera charla no sabes qué le preocupa al otro, estás hablando de más.",
          "La prueba: ¿le escribirías aunque nunca pudiera ayudarte? Si no, todavía no es relación."] }] },
    "El mito del extrovertido": { ic: "ear",
      sesion: [[5, "Elige el próximo evento, clase o junta con gente nueva y decide tu hora de llegada: 15 minutos antes."],
               [20, "Prepara tres preguntas abiertas y la historia corta de en qué andas metido; ensáyalas en voz alta."],
               [5, "Escribe la meta del evento: dos conversaciones buenas y dos nombres anotados."]],
      sale: "Sales con dos nombres y un dato de cada uno, sin haber forzado hablar con todos.",
      subtemas: [
        { t: "Introvertido no es tímido", d: "Susan Cain las separa: el introvertido se recarga a solas y se cansa con mucho estímulo; el tímido teme el juicio de los demás. Puedes ser lo primero sin lo segundo. Saber cuál te toca cambia la estrategia: uno administra energía; el otro, miedo.", l: [
          "Si te cansa, elige eventos cortos y deja un rato a solas después.",
          "Si te da miedo, empieza por exposiciones pequeñas (lo ves en Forjar carácter).",
          "Ninguna de las dos se arregla fingiendo ser el alma de la fiesta."] },
        { t: "Preguntar más te hace más agradable", d: "Un estudio de Harvard (Huang y colegas, 2017) encontró que quien hace más preguntas —sobre todo de seguimiento— le cae mejor a su interlocutor. Escuchar bien no es la versión pobre de hablar bien: es lo que más se recuerda.", l: [
          "La pregunta de seguimiento vale más que la ingeniosa: «¿y cómo terminó eso?».",
          "Repetir una palabra clave de lo que dijo invita a seguir.",
          "Un detalle anotado y mencionado semanas después te vuelve memorable."] },
        { t: "Tu energía tiene presupuesto", d: "Tres horas de evento pueden dejarte agotado al día siguiente. Si no lo planeas, dejas de ir. Menos eventos, mejor elegidos y con hora de salida sostienen el hábito.", l: [
          "Uno o dos eventos al mes bastan si sigues a la gente que conociste.",
          "Decide la hora de salida antes de llegar.",
          "Prefiere formatos con actividad —talleres, deporte, clases—: la actividad conversa por ti."] }] },
    "La fuerza de los vínculos débiles": { ic: "linked-paperclips",
      sesion: [[5, "Abre tus contactos de LinkedIn y del celular."],
               [15, "Haz una lista de 10 vínculos débiles —excompañeros, gente de cursos, de {{empleador}} en otras sedes, conocidos en Alemania— con dónde está cada uno hoy."],
               [5, "Elige dos y escríbeles para retomar el contacto, sin pedir nada."]],
      sale: "Tienes 10 vínculos débiles con nombre y dos reactivados con respuesta.",
      subtemas: [
        { t: "Lo que confirmó LinkedIn con 20 millones de usuarios", d: "Un experimento publicado en <i>Science</i> en 2022 (Rajkumar y colegas) probó a gran escala la idea de Granovetter: los vínculos moderadamente débiles —pocos amigos en común— fueron los que más ayudaron a cambiar de trabajo, más que los cercanos y más que los desconocidos.", l: [
          "El punto óptimo no es el extraño: es el conocido con algo en común.",
          "En tu caso: excompañeros de carrera, de la certificación y de la clase de alemán.",
          "Un contacto con diez amigos en común sirve; con cero, todavía no."] },
        { t: "Los puentes entre grupos", d: "Ronald Burt llama agujeros estructurales a los huecos entre grupos que no se hablan. Quien conecta dos mundos —por ejemplo, el QA automotriz en México y las empresas de Stuttgart— se entera antes de las cosas y vale más para los dos.", l: [
          "Busca a quien ya vive entre tus dos mundos: mexicanos trabajando en Alemania.",
          "Tú también puedes ser puente: entre pruebas e IA, entre México y Alemania.",
          "Un puente vale por lo que conecta, no por cuántos contactos tiene."] },
        { t: "Reactivar un vínculo dormido", d: "Daniel Levin y colegas pidieron a ejecutivos retomar contacto con gente que no veían hacía años: esas charlas dieron ideas más novedosas que las de sus contactos activos, y la confianza seguía intacta. Escribir da más miedo del que justifica.", l: [
          "Reconoce el tiempo sin rodeos: «hace años que no hablamos, me acordé de ti por…».",
          "Da un motivo concreto y reciente.",
          "No pidas nada en ese primer mensaje."] }] },
    "Dar antes de pedir — pero con criterio": { ic: "wrapped-gift",
      sesion: [[5, "Escribe tres cosas que a ti te cuestan poco y a otros les valen mucho."],
               [15, "Elige a dos personas de tu red y hazles un favor de cinco minutos: un dato, un enlace, una presentación o una revisión."],
               [5, "Anota a quién le diste qué —no para cobrar, para no repetir y recordar—."]],
      sale: "Hiciste dos favores de cinco minutos y no te costaron más de media hora en total.",
      subtemas: [
        { t: "Dador, tomador y equilibrador", d: "Adam Grant clasifica: el dador da sin llevar la cuenta, el tomador busca recibir más de lo que da y el equilibrador empareja. Los dadores que llegan a la cima dan con filtro: detectan al tomador y con él se vuelven equilibradores.", l: [
          "Señal de tomador: amable con quien le sirve y duro con quien no.",
          "Con un tomador, da una vez y espera reciprocidad antes de la segunda.",
          "Con dadores y equilibradores, sigue dando."] },
        { t: "Dar en bloques, no a goteo", d: "Grant encontró que quien concentra su ayuda en un bloque —una tarde a la semana— termina con más energía que quien ayuda un poco todos los días. El goteo interrumpe y desgasta; el bloque se disfruta.", l: [
          "Reserva un bloque fijo para revisiones, consejos o presentaciones.",
          "Fuera de él, responde «lo vemos el jueves».",
          "Así das más sin perder tus horas de estudio."] },
        { t: "El favor de alto valor", d: "Lo que más vale para el otro rara vez es lo que más te cuesta. Una presentación bien hecha, un dato de un trámite que ya recorriste o una revisión de su CV pesan más que una tarde entera de ayuda genérica.", l: [
          "Pregunta antes de ayudar: «¿qué te serviría más ahorita?».",
          "Lo que vas sabiendo de la maestría y del alemán es oro para quien empieza ese camino.",
          "Ayuda donde eres raro; en lo común, cualquiera puede."] }] },
    "Tu inventario: qué tienes tú para dar": { ic: "card-file-box",
      sesion: [[5, "Copia las cinco cosas de este paso en una nota del celular."],
               [15, "Para cada una, escribe cómo ayudarías a alguien en 5 o en 30 minutos."],
               [5, "Piensa en tres personas de tu red y apunta qué le darías a cada una."]],
      sale: "La nota tiene las cinco cosas con un ejemplo cada una y ya sabes qué darles a tres personas.",
      copia: { t: "Tu inventario, en una nota", l: [
        "Lo que sé y otros no: ______ → lo doy en 5 minutos así: ______",
        "Lo que ya recorrí (trámites, procesos): ______",
        "A quién conozco que otros quieren conocer: ______",
        "Plantillas o herramientas mías que regalo: ______",
        "Para quién es cada cosa: ______ · ______ · ______"] },
      subtemas: [
        { t: "Lo que sabes sin darte cuenta", d: "Michael Polanyi lo resumió en una frase: sabemos más de lo que podemos decir. Lo que haces todos los días te parece obvio y por eso no lo cuentas como valor; para quien empieza es justo lo que no encuentra en ningún curso.", l: [
          "Lo que te preguntan seguido es tu inventario.",
          "Los errores que ya cometiste valen tanto como lo que sabes hacer.",
          "Escribe el atajo que te tomó meses descubrir."] },
        { t: "Tu red también es inventario", d: "No solo das lo que sabes: das a quién conoces. Presentar a dos personas que se necesitan suele valer más que cualquier consejo y no te quita tiempo.", l: [
          "Anota a cinco personas de tu red que otros querrían conocer.",
          "Pregunta antes de presentar (lo ves en «Presentar a dos personas»).",
          "Cada presentación bien hecha te vuelve punto de paso entre dos redes."] },
        { t: "Lo que se regala solo", d: "Una plantilla, una guía o un checklist que ya hiciste se puede dar mil veces sin gastar tiempo. Es la forma de escalar la generosidad: el trabajo se hace una vez y ayuda cada vez que lo compartes.", l: [
          "Tu plantilla de finanzas, tu lista de trámites o un prompt de pruebas.",
          "Tenlos en una carpeta lista para mandar.",
          "Cada uno es también un motivo para escribirle a alguien sin pedirle nada."] }] },
    "La lista de 20": { ic: "clipboard",
      sesion: [[5, "Abre una hoja con las cinco columnas: nombre, qué hace, por qué te interesa, qué puedes darle y último contacto."],
               [20, "Llena las 20 filas mezclando automotriz, software e IA, finanzas y Alemania; deja en blanco lo que no sepas."],
               [5, "Pon un recordatorio cada tres meses para revisarla."]],
      sale: "Hay 20 nombres, cada uno con algo concreto en «qué puedo darle», y el recordatorio está puesto.",
      copia: { t: "La lista de 20", l: [
        "# | Nombre | Qué hace | Por qué me interesa | Qué puedo darle yo | Último contacto",
        "1 |  |  |  |  |",
        "2 |  |  |  |  |",
        "… hasta 20",
        "Mezcla: __ automotriz · __ software e IA · __ finanzas · __ Alemania"] },
      subtemas: [
        { t: "Tu CRM personal", d: "Las empresas usan un CRM para no olvidar a sus clientes; tú necesitas lo mismo en versión mínima. Una hoja o la nota de cada contacto en el celular: dónde lo conociste, tres datos de su vida y la última vez que hablaron.", l: [
          "Tres datos personales por persona: ciudad, familia, en qué anda.",
          "Anótalos el mismo día; a la semana ya se te olvidaron.",
          "Antes de escribirle a alguien, lee su nota: treinta segundos que lo cambian todo."] },
        { t: "Dos pasos adelante, no veinte", d: "Quien va justo delante de ti en el mismo camino recuerda lo que estás viviendo, y su consejo todavía aplica. El que va veinte pasos adelante ya olvidó cómo era y casi nunca tiene tiempo.", l: [
          "Alguien que hizo la maestría en Alemania hace uno o dos años.",
          "Alguien que pasó de QA a validación en una automotriz alemana.",
          "Ellos te contestan; el director global, casi nunca."] },
        { t: "Una red diversa ve más", d: "Una red de un solo gremio repite la misma información. Los estudios de Burt muestran que las redes con grupos distintos y poco conectados entre sí dan mejores ideas y más oportunidades.", l: [
          "Ninguna área debe pasar de la mitad de la lista.",
          "Incluye al menos tres personas que ya vivan en Alemania.",
          "Una de fuera de tu mundo —salud, arte, negocios— te da lo que ningún colega."] }] },
    "Cómo presentarte en 20 segundos": { ic: "microphone",
      sesion: [[5, "Escribe tu presentación con la fórmula: el problema que resuelves, para quién y un gancho."],
               [15, "Grábate diciéndola tres veces y escúchate; recorta lo que suene a CV. Arma también la versión técnica y la de una frase."],
               [5, "Úsala con alguien esta semana y anota qué te preguntó."]],
      sale: "La dices en menos de 20 segundos sin leerla y el otro te hace una pregunta de seguimiento.",
      copia: { t: "Tus tres versiones", l: [
        "General (20 s): Me dedico a que ______ no falle. Pruebo ______ para ______, y ahorita estoy metido en ______.",
        "Técnica, para tu gremio: Hago validación de ______ en ______ (HIL/SIL) con ______; me estoy especializando en ______.",
        "Una frase: Pruebo el software que hace que un coche frene solo."] },
      subtemas: [
        { t: "Por qué el problema va primero", d: "La gente recuerda imágenes y problemas, no títulos. Chip y Dan Heath (<i>Made to Stick</i>) explican que una idea pega cuando es concreta e inesperada. «Que un coche frene solo sin fallar» es una imagen; «ingeniero de QA», no.", l: [
          "Usa palabras que entendería cualquiera, sin siglas.",
          "Pon una imagen concreta: frenar, evitar, salvar.",
          "La sigla técnica va después, si el otro pregunta."] },
        { t: "El gancho que abre la puerta", d: "Termina con algo vivo: en qué andas metido ahora. Le das al otro un tema fácil para preguntar y muestras que estás en movimiento, no solo en un puesto.", l: [
          "IA aplicada a pruebas, la maestría en Alemania, el alemán: cualquiera sirve.",
          "Cambia el gancho según quién escucha.",
          "Si nadie pregunta por tu gancho, cámbialo."] },
        { t: "Adaptarla a quien escucha", d: "No es un discurso fijo. Si es de tu gremio, sube el nivel técnico; si no muestra interés, la versión de una frase y le devuelves la pregunta. El objetivo es que siga la conversación, no terminar tu presentación.", l: [
          "Gremio: términos técnicos y una pregunta sobre su sistema.",
          "Fuera del gremio: la imagen y una pregunta sobre su trabajo.",
          "Sin interés: una frase y «¿y tú en qué andas?»."] }] },
    "Entrar en una conversación que ya empezó": { ic: "speech-balloon",
      sesion: [[5, "Antes del evento repasa la mecánica: grupo abierto, el hueco, escuchar 20 segundos y una pregunta sobre lo que dijeron."],
               [30, "En el evento entra a dos grupos abiertos con esa mecánica y habla una vez en la fila de la comida o de la barra."],
               [5, "Al salir anota los nombres y qué funcionó."]],
      sale: "Entraste a dos grupos sin interrumpir y en uno te abrieron espacio solos.",
      subtemas: [
        { t: "La formación en F", d: "El antropólogo Adam Kendon estudió cómo se acomoda la gente al conversar: arma un espacio compartido, la formación en F. Si pies y hombros apuntan hacia dentro sin hueco, el grupo está cerrado; si hay un hueco o alguien abre el hombro, puedes entrar.", l: [
          "Mira los pies: apuntan a donde la persona quiere estar.",
          "Dos frente a frente: cerrado. Dos en ángulo de 90 grados: abierto.",
          "Al entrar, el grupo se reacomoda; si nadie se mueve, sal con calma."] },
        { t: "Empieza por quien está solo", d: "La entrada más fácil de cualquier evento es la persona que también está sola. Casi siempre agradece que alguien le hable y te ahorras la mecánica del grupo.", l: [
          "Acércate con algo del contexto: «¿es tu primera vez aquí?».",
          "Después pueden entrar juntos a un grupo: dos entran más fácil que uno.",
          "Esa persona puede ser tu mejor contacto de la noche."] },
        { t: "El contexto es tu permiso", d: "En un evento, lo que los dos están viviendo te da permiso para hablar: el ponente, la comida, el lugar, el tema. No hace falta una frase ingeniosa; basta un comentario o una pregunta sobre eso.", l: [
          "«¿Qué te pareció lo que dijo de…?»",
          "«¿Sabes si después hay otra sesión?»",
          "La pregunta simple funciona más que la ingeniosa."] }] },
    "Las preguntas que abren y las que cierran": { ic: "red-question-mark",
      sesion: [[5, "Escribe cinco preguntas abiertas que te sirvan en cualquier conversación de trabajo."],
               [20, "Úsalas en dos conversaciones reales —un café, una junta, un viaje de Didi— con la regla: tu siguiente pregunta sale de su última respuesta."],
               [5, "Anota qué pregunta abrió más y qué supiste del otro."]],
      sale: "En cada conversación hiciste al menos dos preguntas de seguimiento y supiste algo nuevo de la otra persona.",
      subtemas: [
        { t: "Abiertas, de seguimiento y espejo", d: "Las abiertas (qué, cómo, por qué) invitan a contar; las de seguimiento prueban que escuchaste; el espejo de Chris Voss —repetir sus últimas palabras como pregunta— invita a ampliar sin que parezca interrogatorio. Juntas sostienen una charla sin esfuerzo.", l: [
          "Abierta: «¿cómo llegaste a eso?».",
          "Seguimiento: «¿y qué pasó con el proveedor?».",
          "Espejo: «¿tres hojas de Excel?»."] },
        { t: "La cercanía crece por capas", d: "Arthur Aron diseñó 36 preguntas que van de lo ligero a lo personal y crean cercanía en 45 minutos. La lección para el networking: la confianza crece cuando los dos se abren poco a poco, no con preguntas profundas de golpe.", l: [
          "Primero hechos, luego opiniones y al final lo que siente.",
          "Si te abres un poco, el otro se abre un poco.",
          "No saltes a lo personal en el primer minuto."] },
        { t: "Hablar de ti sin acaparar", d: "Una buena conversación es un ping-pong: los dos hablan y preguntan. Si al final sabes mucho del otro y él nada de ti, tampoco se formó relación. Cuando te pregunten, contesta concreto y devuelve la pregunta.", l: [
          "Responde en 30 a 60 segundos, no en cinco minutos.",
          "Incluye un detalle que dé pie a preguntar.",
          "Cierra con «¿y tú?» o con una pregunta relacionada."] }] },
    "Cómo salir sin quedar mal": { ic: "waving-hand",
      sesion: [[5, "Escribe dos frases de salida con la fórmula: cierra con valor y di lo que sigue."],
               [20, "En tu próximo evento o reunión úsalas al menos una vez; antes de irte, pide el dato de contacto."],
               [5, "Esa misma noche cumple lo que dejaste pendiente: el artículo, el enlace."]],
      sale: "Saliste de una conversación cuando quisiste, con el contacto pedido y lo prometido enviado en menos de 24 horas.",
      copia: { t: "Tres salidas", l: [
        "«Me sirvió mucho lo que dijiste de ______. Te mando ______ mañana. Voy a saludar a alguien, pero seguimos.»",
        "«No te quiero acaparar. ¿Te busco en LinkedIn o prefieres que te escriba?»",
        "«¿Conoces a alguien más aquí que trabaje en ______? Me encantaría saludarlo.»"] },
      subtemas: [
        { t: "La regla del pico y el final", d: "Daniel Kahneman mostró que recordamos una experiencia por su momento más intenso y por cómo terminó. Una conversación que cierra bien se recuerda bien, aunque haya tenido silencios incómodos.", l: [
          "Termina arriba: con un agradecimiento concreto.",
          "No esperes a que la charla se apague sola.",
          "Lo último que dices es lo que más se queda."] },
        { t: "Casi nadie sabe cuándo quiere irse el otro", d: "Un estudio de Adam Mastroianni (2021) encontró que la mayoría de las conversaciones no terminan cuando alguno de los dos quiere: casi nunca adivinamos cuándo quiere irse el otro. Ofrecer la salida es un favor para ambos.", l: [
          "Diez a quince minutos por persona es buena medida en un evento.",
          "Ofrece la salida: «no te quiero acaparar».",
          "Si vale la pena, agenda otra charla en vez de alargar esta."] },
        { t: "Salir presentando a alguien", d: "Una salida elegante es presentar a tu interlocutor con otra persona: lo dejas acompañado, quedas bien con los dos y quedas libre.", l: [
          "«Te presento a Ana, ella también anda en temas de IA».",
          "Funciona mejor si conoces un poco a los dos.",
          "Quédate un minuto después de presentarlos y luego despídete."] }] },
    "La regla de las 48 horas": { ic: "hourglass-not-done",
      sesion: [[5, "Haz la lista de la gente que conociste en los últimos dos días, con un detalle de cada una."],
               [15, "Escríbele a cada una el mensaje de tres partes: dónde se conocieron, algo específico que dijo y algo que le mandas sin que lo pida."],
               [5, "Pasa los datos a tu lista o a la nota de cada contacto."]],
      sale: "Todos los mensajes salieron antes de 48 horas y cada uno menciona algo específico de esa persona.",
      copia: { t: "El mensaje de 48 horas", l: [
        "Hola ______, gusto conocerte ayer en ______.",
        "Me quedé pensando en lo que dijiste de ______.",
        "Te dejo ______ por si te sirve, sin compromiso.",
        "Un gusto, ______"] },
      subtemas: [
        { t: "La curva del olvido", d: "Hermann Ebbinghaus midió en 1885 que la mayor parte de lo aprendido se olvida en las primeras horas y días. Con las personas pasa igual: a las 48 horas tu cara ya se mezcló con las demás. El mensaje temprano refuerza el recuerdo de los dos.", l: [
          "Hoy es mejor que mañana; mañana, mejor que pasado.",
          "Un detalle específico reactiva toda la conversación.",
          "Anota ese detalle antes de dormir o también se te olvida a ti."] },
        { t: "Dar valor sin pedir", d: "Lo que mandas en el primer mensaje define la relación. Algo útil y sin condiciones activa la reciprocidad sin sonar a transacción: el otro te recuerda como alguien que aporta.", l: [
          "Un artículo, una plantilla, un contacto o la respuesta a algo que preguntó.",
          "Que se pueda usar en cinco minutos.",
          "Nunca tu CV ni un enlace a lo que vendes."] },
        { t: "El canal correcto", d: "LinkedIn para lo profesional, WhatsApp si te lo dieron, correo para lo formal. Escribir por el canal equivocado se siente invasivo; preguntarlo en persona lo resuelve.", l: [
          "Si te dio su WhatsApp, úsalo; si no, LinkedIn con nota.",
          "En Alemania, correo y LinkedIn pesan más que WhatsApp para lo profesional.",
          "Un mensaje corto se lee; uno largo se deja «para después»."] }] },
    "El ping trimestral": { ic: "spiral-calendar",
      sesion: [[5, "Crea un recordatorio que se repita cada tres meses con tu lista de 20."],
               [15, "Haz el primer ping a cinco personas usando los cinco tipos: artículo, felicitación, presentación, seguimiento con memoria o comida."],
               [5, "Anota en la lista la fecha y el tipo de ping de cada uno."]],
      sale: "Salieron cinco pings sin pedir nada y cada fila tiene su fecha.",
      subtemas: [
        { t: "El efecto de mera exposición", d: "Robert Zajonc demostró que tendemos a preferir lo que hemos visto más veces. Un contacto breve y regular hace que tu nombre se sienta familiar y confiable, sin necesidad de grandes encuentros.", l: [
          "La frecuencia pesa más que la intensidad.",
          "Cuatro mensajes al año valen más que una comida cada tres años.",
          "La familiaridad se pierde rápido si desapareces."] },
        { t: "El seguimiento con memoria", d: "Recordar un detalle de hace meses le dice al otro que te importó lo que contó. No hace falta buena memoria: hace falta un sistema, la nota de cada contacto.", l: [
          "Antes del ping, lee su nota.",
          "Pregunta por el resultado de algo que te contó.",
          "Actualiza la nota con lo nuevo que te diga."] },
        { t: "Las fechas que trabajan por ti", d: "Cumpleaños, aniversarios de trabajo, ascensos y publicaciones son excusas naturales. LinkedIn las avisa, pero su mensaje automático no cuenta: personalízalo.", l: [
          "Cambia el «felicidades» automático por una línea tuya.",
          "Comenta con sustancia algo que publicó.",
          "Una felicitación por un logro vale más que una de cumpleaños."] }] },
    "LinkedIn sin hacer el ridículo": { ic: "briefcase",
      sesion: [[5, "Abre tu perfil en vista pública y léelo como un reclutador de Stuttgart."],
               [25, "Reescribe en inglés el titular y el «Acerca de» con las palabras que buscaría: ADAS, HIL, Python, ISTQB y tu nivel de alemán."],
               [5, "Agenda tu primera publicación corta para dentro de dos semanas."]],
      sale: "Titular y resumen están en inglés, con las palabras clave de tu mercado, y hay una publicación agendada.",
      copia: { t: "Titular, resumen y publicación", l: [
        "Titular: Test & Validation Engineer · ADAS / HIL · Test automation (Python) · ISTQB · AI for testing · German (__)",
        "About: I make sure driver-assistance software works before it hits the road. __ years validating ______ at {{empleador}}. Currently: AI applied to testing and German (__). Open to ______ in Germany from 2027.",
        "Publicación: Lo que aprendí esta semana probando ______: 1) ______ 2) ______ 3) ______"] },
      subtemas: [
        { t: "Cómo busca un reclutador", d: "Los reclutadores filtran en LinkedIn Recruiter por palabras clave, ubicación e idioma. Si tu perfil no trae los términos exactos —ADAS, HIL, Python, ISTQB, test automation— no apareces, aunque seas perfecto para el puesto.", l: [
          "Copia los términos de cinco vacantes que te interesen y úsalos.",
          "Indica la ubicación que buscas.",
          "En idiomas, inglés y alemán con su nivel real."] },
        { t: "Lo que pesa en un perfil alemán", d: "Las empresas alemanas valoran el orden, el detalle y los certificados. Muchas usan también XING, la red profesional de habla alemana. Un perfil con fechas exactas y certificados verificables pesa más que una frase ingeniosa.", l: [
          "Certificados con número o enlace que se pueda comprobar.",
          "Fechas completas en cada experiencia.",
          "Abre tu perfil de XING cuando tu alemán llegue a B1."] },
        { t: "Publicar sin volverte influencer", d: "Una publicación cada dos semanas basta. En un perfil técnico funciona lo aprendido: un problema, cómo lo resolviste y la lección. Muestra criterio, que es lo que un empleador quiere ver.", l: [
          "Estructura: el problema, lo que intentaste, lo que aprendiste.",
          "De 100 a 200 palabras.",
          "Nada confidencial de tu empresa ni de sus clientes."] }] },
    "Presentar a dos personas (bien hecho)": { ic: "bridge-at-night",
      sesion: [[5, "Piensa en dos personas de tu red a las que les serviría conocerse."],
               [15, "Escríbele a cada una por separado el mensaje de doble consentimiento."],
               [5, "Si las dos aceptan, manda la presentación y retírate de la conversación."]],
      sale: "Las dos aceptaron antes de presentarlas y la presentación llevó dos líneas de cada una.",
      copia: { t: "Doble consentimiento y presentación", l: [
        "A cada uno: «Conozco a ______, que está ______. Creo que te serviría hablar con él por ______. ¿Te lo presento?»",
        "La presentación: «______, te presento a ______: ______. ______, ______ es ______. Se tienen que conocer por ______. Los dejo en sus manos.»"] },
      subtemas: [
        { t: "El conector", d: "Malcolm Gladwell (<i>The Tipping Point</i>) describe a los conectores: gente que conoce a personas de muchos mundos y las junta. No necesitan ser extrovertidos; necesitan interés por la gente y el hábito de presentar.", l: [
          "Cada presentación bien hecha te pone en el centro de dos redes.",
          "Pregúntate en cada conversación: ¿a quién debería conocer esta persona?",
          "Una presentación al mes ya te vuelve conector."] },
        { t: "Prestas tu reputación", d: "Al presentar, prestas tu nombre: si una de las dos personas falla, te toca a ti. Por eso solo presentas a quien le confiarías tu reputación.", l: [
          "Presenta solo a gente por la que responderías.",
          "Explica qué gana cada uno, no solo «deberían conocerse».",
          "Si dudas de alguien, no lo presentes."] },
        { t: "Cierra el círculo", d: "Unas semanas después, pregunta cómo les fue. Muestra que te importó, aprendes qué presentaciones funcionan y te enteras de oportunidades.", l: [
          "A las dos semanas: «¿lograron hablar?».",
          "Si funcionó, te lo agradecen dos veces.",
          "Si no, aprendes a elegir mejor la próxima."] }] },
    "Pedir: tarde, concreto y fácil de conceder": { ic: "raised-hand",
      sesion: [[5, "Define una petición real que tengas hoy: un contacto, una revisión, una carta de recomendación."],
               [15, "Escríbela concreta, con salida fácil y fecha, y mándala a alguien a quien ya le hayas dado antes."],
               [5, "Cuando te respondan, agradece y anota cuándo le contarás cómo salió."]],
      sale: "Tu petición se contesta con un nombre, un sí o un no en menos de un minuto, y lleva fecha y salida fácil.",
      copia: { t: "La petición", l: [
        "Hola ______, ¿cómo vas con ______?",
        "Te quería pedir algo concreto: ______.",
        "Te lo pido porque ______. Lo necesito para el ______.",
        "Si no es buen momento, sin ningún problema.",
        "Gracias de antemano."] },
      subtemas: [
        { t: "Subestimamos los sí", d: "Francis Flynn y Vanessa Bohns encontraron que la gente calcula muy por debajo cuántos dirán que sí a una petición directa, a veces a la mitad. El miedo a pedir es más grande que la negativa real.", l: [
          "Pide aunque creas que te dirán que no.",
          "En persona o por voz, el sí es todavía más probable que por mensaje.",
          "Una negativa bien pedida no rompe la relación."] },
        { t: "El poder del «porque»", d: "Ellen Langer mostró, con un experimento en una fila de fotocopias, que dar una razón —aunque sea simple— sube mucho la aceptación. Explicar para qué pides algo hace que se entienda y se conceda.", l: [
          "«Te lo pido porque estoy armando mi solicitud a la maestría».",
          "La razón concreta ayuda al otro a ayudarte mejor.",
          "Si no puedes explicar por qué, revisa si de verdad lo necesitas."] },
        { t: "Las cartas de recomendación", d: "La solicitud a la maestría pide cartas: es la petición más importante de tu red este año. Facilita el trabajo de quien la escribe: un resumen de lo que hicieron juntos, logros concretos y la fecha límite.", l: [
          "Pide con al menos un mes de anticipación.",
          "Manda tus logros con fechas y números.",
          "Ofrece un borrador si lo prefiere y agradece en cuanto la envíe."] }] },
    "Dónde practicarlo en CDMX": { ic: "round-pushpin",
      sesion: [[5, "Elige dos lugares de la lista que quepan en tu horario de este mes."],
               [20, "Busca la próxima fecha de cada uno —Meetup, Eventbrite, el Goethe— y regístrate en uno."],
               [5, "Agenda el evento con tu meta escrita: dos conversaciones y dos mensajes antes de 48 horas."]],
      sale: "Tienes un evento agendado este mes con tu meta escrita.",
      subtemas: [
        { t: "Elegir por intersección", d: "Los mejores lugares juntan dos cosas tuyas: algo que aprendes y gente con tu mismo objetivo. Una clase presencial de alemán o un meetup de pruebas te dan contenido y red a la vez: el tiempo rinde doble.", l: [
          "Prioriza lo que harías aunque no hubiera networking.",
          "Busca actividades que se repiten: verse cada semana crea confianza.",
          "Evita los eventos sin estructura donde solo se reparten tarjetas."] },
        { t: "Las horas que hacen una amistad", d: "Jeffrey Hall estimó que hacen falta unas 50 horas juntos para pasar de conocido a amigo casual y unas 90 para amigo. Por eso funcionan los grupos donde ves a la misma gente cada semana.", l: [
          "Mejor un grupo semanal que diez eventos sueltos.",
          "El pádel, una clase o un club te dan esas horas sin forzarlas.",
          "Ir tres veces seguidas al mismo meetup vale más que ir a tres distintos."] },
        { t: "De la comunidad en línea al café", d: "Los grupos de Discord, Slack o LinkedIn de pruebas, IA o mexicanos en Alemania son una entrada barata. Lo que convierte un contacto en línea en relación es una llamada o un café.", l: [
          "Únete a una comunidad de mexicanos en Alemania y a una de testing automotriz.",
          "Responde donde sabes: así te conocen.",
          "Propón una llamada de 20 minutos a quien te interese."] }] },
    "Los cinco errores que matan una red": { ic: "warning",
      sesion: [[5, "Lee los cinco errores y califícate del 1 al 5 en cada uno, con honestidad."],
               [15, "Elige el peor y escribe una acción concreta para corregirlo esta semana, por ejemplo: anotar tres datos de cada contacto el mismo día."],
               [5, "Ponla como recordatorio diario por siete días."]],
      sale: "Sabes cuál es tu error principal y lo corregiste siete días seguidos.",
      subtemas: [
        { t: "La memoria se delega", d: "Nadie recuerda los detalles de 150 personas. Quien parece tener una memoria prodigiosa usa un sistema: la nota de cada contacto, una hoja o un cuaderno. El hábito vale más que el talento.", l: [
          "Tres datos por persona, el mismo día.",
          "Lee la nota antes de cada encuentro.",
          "El campo de notas del contacto del celular siempre está a mano."] },
        { t: "La transacción se nota", d: "Tiziana Casciaro, Francesca Gino y Maryam Kouchaki encontraron que el networking puramente interesado hace sentir «sucia» a la gente, incluso a quien lo hace. Pensar primero en lo que puedes aportar quita esa sensación y se nota del otro lado.", l: [
          "Piensa qué puedes dar antes de qué puedes obtener.",
          "Busca un interés genuino en común.",
          "Si te sientes incómodo, probablemente lo estás haciendo solo por interés."] },
        { t: "La constancia gana", d: "El primer contacto no es la relación; la relación son el tercero, el cuarto y el quinto. La mayoría abandona después del primero, y por eso cree que el networking no funciona.", l: [
          "Planea el segundo contacto en cuanto haces el primero.",
          "Un mensaje cada tres meses mantiene viva la relación.",
          "Mide cuántas relaciones siguen activas, no cuántas empezaste."] }] },
    "Tu plan de 90 días": { ic: "bullseye",
      sesion: [[5, "Pon en tu calendario las doce semanas del plan, una tarea por semana."],
               [20, "Haz hoy la de la semana 1: tu lista de 20, tu presentación y tu número de partida."],
               [5, "Agenda el día 90 para volver a contar tu número."]],
      sale: "Las doce semanas están en tu calendario y la semana 1 ya está hecha.",
      subtemas: [
        { t: "Cuándo, dónde y cómo", d: "Peter Gollwitzer mostró que planear «cuándo, dónde y cómo» —«el lunes a las 8, en el café, escribo dos pings»— sube mucho la probabilidad de cumplir frente a una intención vaga. El plan funciona si cada tarea tiene su hueco.", l: [
          "Escribe cada tarea con día, hora y lugar.",
          "Usa la fórmula: «si es lunes a las 8, escribo dos pings».",
          "Dale un bloque de tu rutina, no un «cuando pueda»."] },
        { t: "Medir lo que importa", d: "El indicador del plan es a cuántas personas podrías escribirles mañana sin que fuera raro. Mide relaciones activas, no seguidores ni contactos: es el número que refleja tu capital social real.", l: [
          "Cuéntalo el día 1 y el día 90.",
          "Activa es una relación con la que hablaste en los últimos tres meses.",
          "Si no subió, revisa qué semanas te saltaste."] },
        { t: "Revisar y ajustar", d: "A los 30 y a los 60 días revisa qué funciona: qué eventos dieron buenas conversaciones y qué mensajes tuvieron respuesta. Repite lo que funcionó y suelta lo que no.", l: [
          "Día 30: ¿qué evento dio más?",
          "Día 60: ¿qué tipo de ping tuvo más respuesta?",
          "Con eso armas el plan del siguiente trimestre."] }] },
    "📚 Qué leer, en qué orden": { ic: "books" },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  persuadir: {
    "De dónde sale esto": { ic: "brain",
      sesion: [[5, "Escribe tres decisiones de esta semana en las que dijiste que sí casi sin pensar: una compra, un favor, una suscripción."],
               [15, "Para cada una, anota qué te empujó: alguien te dio algo antes, todos lo hacían, alguien con autoridad lo dijo, se iba a acabar."],
               [5, "Escribe en una línea la regla ética del paso: solo se señala lo que ya es cierto."]],
      sale: "Encontraste al menos un atajo detrás de cada una de tus tres decisiones.",
      subtemas: [
        { t: "Pensar rápido y pensar despacio", d: "Daniel Kahneman describe dos modos de pensar: el sistema 1, rápido, automático y sin esfuerzo, y el sistema 2, lento y deliberado. Los principios de Cialdini viven en el sistema 1: son atajos que ahorran energía y casi siempre aciertan.", l: [
          "El sistema 1 decide la mayoría de las cosas del día.",
          "El sistema 2 se cansa: decisiones importantes, con calma y descansado.",
          "Persuadir bien es darle al sistema 1 una señal verdadera."] },
        { t: "Las heurísticas: atajos útiles con fallas", d: "Amos Tversky y Kahneman mostraron que usamos reglas simples —lo que recuerdo fácil es frecuente, lo primero que oigo es la referencia— que funcionan casi siempre pero se pueden explotar. Saber cuál usas te deja corregir cuando importa.", l: [
          "Anclaje: el primer número que oyes pesa en todo lo que sigue.",
          "Disponibilidad: lo reciente o llamativo parece más probable.",
          "En una negociación, el primer número sobre la mesa mueve todo."] },
        { t: "La confianza es el activo", d: "Todos los principios funcionan porque la otra persona confía en que lo que señalas es cierto. Una sola exageración descubierta vuelve sospechoso todo lo demás. Es un argumento práctico, no solo moral.", l: [
          "Usa cifras exactas y comprobables.",
          "Si no sabes algo, dilo; te cree más en lo que sí sabes.",
          "La reputación se construye en años y se pierde en una frase."] }] },
    "La diferencia real entre influir y manipular": { ic: "balance-scale",
      sesion: [[5, "Piensa en algo que quieres conseguir pronto de otra persona: un aumento, un favor, una venta."],
               [15, "Pasa tu argumento por las tres preguntas: ¿es verdad?, ¿le conviene?, ¿lo harías a la luz? Reescribe lo que no pase."],
               [5, "Tacha cualquier frase que no podrías sostener si el otro la verificara."]],
      sale: "Tu argumento pasa las tres preguntas y no tiene ninguna frase que te incomodaría que el otro revisara.",
      subtemas: [
        { t: "La prueba del periódico", d: "Una regla usada en ética de negocios: ¿te sentirías bien si lo que haces apareciera mañana en la primera plana, explicado con detalle? Es otra forma de la prueba de la transparencia, y sirve para decisiones rápidas.", l: [
          "Si lo explicarías con orgullo, adelante.",
          "Si tendrías que justificarlo, revísalo.",
          "Si lo esconderías, no lo hagas."] },
        { t: "Ganar-ganar no es ingenuo", d: "Roger Fisher y William Ury (<i>Getting to Yes</i>) proponen negociar sobre intereses, no posiciones: buscar opciones que sirvan a los dos. En relaciones que se repiten —tu jefe, tus clientes— es lo que más conviene a largo plazo.", l: [
          "Pregunta qué necesita el otro, no solo qué pide.",
          "Busca opciones que sumen para los dos antes de repartir.",
          "La relación vale más que una victoria de una vez."] },
        { t: "Los manipuladores sí existen", d: "Saber distinguir te protege. La manipulación suele combinar presión de tiempo, información incompleta y emociones intensas. Si sientes las tres a la vez, alguien está empujando tu decisión.", l: [
          "Prisa + secreto + emoción = señal de alarma.",
          "Pide la información por escrito.",
          "Una buena propuesta aguanta 24 horas de reflexión."] }] },
    "1 · Reciprocidad": { ic: "wrapped-gift",
      sesion: [[5, "Elige a una persona con la que quieras una mejor relación de trabajo."],
               [10, "Dale algo inesperado y personalizado: un dato que le sirve, una ayuda concreta, un reconocimiento por escrito."],
               [5, "No pidas nada esta semana; anota cómo cambió el trato."]],
      sale: "Diste algo inesperado y específico sin pedir nada a cambio y notaste la respuesta.",
      subtemas: [
        { t: "Por qué funciona la reciprocidad", d: "Antropólogos como Marcel Mauss describieron el don y el contradón en muchas culturas: recibir crea una obligación social de devolver. Es una norma que permitió la cooperación entre personas que no son familia.", l: [
          "La deuda se siente aunque no hayas pedido nada.",
          "Se devuelve en otra moneda: atención, ayuda, un sí.",
          "Funciona mejor cuando lo que das es significativo para el otro."] },
        { t: "Rechazo y retirada", d: "Una variante de Cialdini: pedir algo grande que probablemente rechazarán y después algo menor. La concesión se siente como un regalo que hay que corresponder. En su experimento, más gente aceptó acompañar a jóvenes al zoológico después de rechazar un compromiso de dos años.", l: [
          "Aplicado a sueldo: tu primera petición puede ser ambiciosa pero justificada.",
          "La concesión debe ser real, no inventada.",
          "Úsalo con transparencia: si se nota el truco, se rompe."] },
        { t: "Dar sin esperar es estrategia", d: "La reciprocidad funciona mejor cuando lo que das no parece una inversión. Si el regalo tiene condición, el otro lo siente como transacción y la deuda desaparece.", l: [
          "Deja pasar tiempo entre dar y pedir.",
          "Da en público el reconocimiento; en privado la ayuda.",
          "Lo personalizado vale más que lo caro."] }] },
    "2 · Compromiso y coherencia": { ic: "writing-hand",
      sesion: [[5, "Elige una meta tuya de este mes y escríbela en una frase concreta y con fecha."],
               [10, "Hazla pública con alguien que te importe: cuéntasela o mándasela por escrito."],
               [5, "Marca en tu calendario el día que le contarás si la cumpliste."]],
      sale: "Tu meta está escrita, alguien más la conoce y hay fecha para rendir cuentas.",
      subtemas: [
        { t: "La disonancia cognitiva", d: "Leon Festinger describió la incomodidad que sentimos cuando lo que hacemos choca con lo que creemos. Para reducirla, ajustamos creencias o actos. Por eso un compromiso público pesa: romperlo crea disonancia.", l: [
          "Lo escrito y público genera más presión que lo pensado.",
          "Usa esto contigo: escribe tus metas y compártelas.",
          "Si alguien dice algo en voz alta, recuérdaselo con respeto."] },
        { t: "El pie en la puerta, bien usado", d: "Un primer paso pequeño crea una identidad: «soy alguien que apoya esto». Después, pedir algo mayor encaja con esa identidad. En el trabajo: un piloto pequeño antes de un proyecto grande.", l: [
          "Propón un piloto de una semana antes de un cambio completo.",
          "Pide una revisión de 15 minutos antes de una reunión larga.",
          "Cada pequeño sí construye el siguiente."] },
        { t: "La identidad como motor", d: "James Clear (<i>Atomic Habits</i>) propone cambiar hábitos desde la identidad: no «quiero correr», sino «soy corredor». Cada acción es un voto por quien eres. Es compromiso y coherencia aplicado a ti.", l: [
          "Describe tu meta como identidad: «soy alguien que ahorra».",
          "Cada día cumplido refuerza esa identidad.",
          "Un día fallado no la rompe; dos seguidos empiezan a hacerlo."] }] },
    "3 · Prueba social": { ic: "clapping-hands",
      sesion: [[5, "Piensa en algo que quieres proponer en el trabajo o vender."],
               [15, "Junta prueba social real y cercana: cuántos lo usan, quién en tu misma situación lo probó, un mensaje real de alguien a quien le sirvió."],
               [5, "Reescribe tu propuesta empezando por esa prueba, no por tus adjetivos."]],
      sale: "Tu propuesta abre con datos reales de gente parecida al que la recibe.",
      subtemas: [
        { t: "El experimento de Asch", d: "Solomon Asch mostró en los años cincuenta que muchas personas daban una respuesta claramente equivocada sobre el largo de unas líneas cuando todo el grupo la daba. Basta con que una sola persona discrepe para que la presión se reduzca mucho.", l: [
          "La presión del grupo cambia lo que decimos, a veces lo que vemos.",
          "Un solo aliado rompe la conformidad.",
          "En juntas: si estás en desacuerdo, probablemente no eres el único."] },
        { t: "La norma descriptiva puede volverse contra ti", d: "Cialdini encontró que los letreros que dicen «mucha gente roba madera petrificada de este parque» aumentan el robo: le dicen a la gente que es lo normal. Cuidado con anunciar que «nadie» hace lo correcto.", l: [
          "Destaca lo que la mayoría sí hace bien.",
          "No digas «casi nadie entrega a tiempo»; di «la mayoría ya entregó».",
          "La norma que describes es la que refuerzas."] },
        { t: "Los testimonios que convencen", d: "Un testimonio funciona cuando el que lo da se parece al que lo lee y cuenta un resultado concreto. «Me ayudó mucho» convence poco; «pagué mi tarjeta en ocho meses con esta hoja» convence mucho.", l: [
          "Pide permiso para usar el testimonio con nombre.",
          "Que incluya el antes, el después y el tiempo.",
          "Un video o una captura real vale más que un texto tuyo."] }] },
    "4 · Autoridad": { ic: "graduation-cap",
      sesion: [[5, "Escribe tus tres credenciales más relevantes para tu próxima conversación importante: certificados, años, resultados."],
               [15, "Redacta cómo las mencionarás de forma natural, más una debilidad pequeña y cierta que admitirás antes del argumento fuerte."],
               [5, "Ensáyalo en voz alta una vez."]],
      sale: "Puedes decir tus credenciales en una frase natural y admites un límite real sin perder fuerza.",
      subtemas: [
        { t: "Lo que mostró Milgram", d: "En los experimentos de Stanley Milgram, una mayoría de participantes continuó aplicando lo que creía descargas fuertes ante la insistencia de un experimentador con bata. Cuando la autoridad parecía menos legítima o estaba lejos, la obediencia bajaba.", l: [
          "Las señales de autoridad (títulos, ropa, tono) pesan mucho.",
          "La distancia y la falta de legitimidad la reducen.",
          "Pregúntate siempre: ¿esta persona sabe de esto o solo lo parece?"] },
        { t: "Que otro te presente", d: "En un estudio citado por Cialdini, una inmobiliaria aumentó citas y contratos cuando la recepcionista presentaba al agente con su experiencia («le paso con Sandra, que lleva 15 años vendiendo en esta zona»). Que otro diga tu credencial evita parecer presumido.", l: [
          "Pide a quien te presenta que mencione tu experiencia.",
          "En tu perfil escrito, las credenciales van sin pena.",
          "En persona, deja que tus datos hablen."] },
        { t: "Autoridad para pedir un aumento", d: "Llegar a una negociación de sueldo con datos de mercado, tus resultados con números y tus certificaciones te da autoridad: hablas de hechos, no de deseos. Es el principio aplicado a tu ingreso.", l: [
          "Lleva rangos de sueldo de tu puesto de fuentes serias.",
          "Cuantifica tus resultados: defectos encontrados, tiempo ahorrado.",
          "Tu ISTQB y la certificación en IA son señales de valor concreto."] }] },
    "5 · Simpatía": { ic: "smiling-face-with-smiling-eyes",
      sesion: [[5, "Elige a alguien con quien vayas a hablar esta semana."],
               [15, "Antes de la charla, busca tres coincidencias reales (ciudad, carrera, intereses) y prepara un elogio específico y sincero."],
               [5, "Después, anota qué coincidencia abrió más la conversación."]],
      sale: "Usaste al menos una coincidencia real y un elogio específico, y la conversación fue más cercana.",
      subtemas: [
        { t: "Por qué nos agrada quien se parece", d: "La investigación sobre semejanza y atracción, iniciada por Donn Byrne, muestra que nos atraen quienes comparten actitudes y experiencias. La semejanza da sensación de previsibilidad y de ser comprendido.", l: [
          "Busca semejanzas reales, no inventadas.",
          "Las experiencias compartidas pesan más que los gustos.",
          "Nombrarlas en voz alta las vuelve visibles."] },
        { t: "El elogio específico", d: "Un elogio vago se olvida; uno específico muestra que pusiste atención. Además, elogiar el proceso («cómo resolviste ese bug») es más creíble que elogiar rasgos («eres un genio»).", l: [
          "Elogia algo que hizo, no algo que es.",
          "Hazlo cerca del momento.",
          "Si no es sincero, no lo digas."] },
        { t: "El efecto Franklin", d: "Benjamin Franklin contó que se ganó a un rival pidiéndole prestado un libro raro. Pedir un favor pequeño puede aumentar la simpatía del otro hacia ti, porque al ayudarte justifica que le caes bien.", l: [
          "Pide un favor pequeño y fácil: una recomendación, un consejo.",
          "Agradece de forma específica.",
          "No abuses: un favor, no una lista."] }] },
    "6 · Escasez": { ic: "hourglass-done",
      sesion: [[5, "Revisa una compra o inversión que estés considerando y anota si te la ofrecen con prisa o con cupo limitado."],
               [15, "Aplica la regla: espera 24 horas, busca la misma oferta en otro lado y verifica si la escasez es real."],
               [5, "Decide con calma y anota qué decidiste y por qué."]],
      sale: "No tomaste ninguna decisión de dinero bajo presión de tiempo esta semana.",
      subtemas: [
        { t: "La aversión a la pérdida", d: "Kahneman y Tversky, en la teoría prospectiva, mostraron que una pérdida duele aproximadamente el doble de lo que alegra una ganancia del mismo tamaño. Por eso «no te lo pierdas» mueve más que «gana esto».", l: [
          "Las ofertas que hablan de lo que pierdes usan este sesgo.",
          "En tus inversiones, te hace vender en pánico: tenlo presente.",
          "Replantea: ¿lo compraría si no hubiera prisa?"] },
        { t: "La reactancia", d: "Jack Brehm describió la reactancia: cuando sentimos que nos quitan una libertad, la deseamos más. Prohibir o limitar algo lo vuelve más atractivo. Explica por qué «últimas unidades» funciona tan bien.", l: [
          "Si algo te gusta más porque se acaba, sospecha.",
          "Con personas: presionar a alguien suele empujarlo al lado contrario.",
          "Dar opciones reduce la reactancia."] },
        { t: "Escasez honesta en una negociación", d: "Si tienes otra oferta de trabajo o una fecha real, decirlo es legítimo y efectivo. Lo que no se vale es inventarla: si te piden pruebas o te dejan ir, pierdes todo.", l: [
          "Menciona plazos reales con fecha.",
          "Si tienes alternativa, dila sin amenazar.",
          "Nunca inventes una oferta que no tienes."] }] },
    "7 · Unidad": { ic: "people-hugging",
      sesion: [[5, "Piensa en tres personas a quienes quieres convencer de algo y escribe qué grupo comparten contigo."],
               [10, "Reescribe tu petición usando ese «nosotros» con verdad: «los que trabajamos en…», «los que estamos aprendiendo alemán…»."],
               [5, "Usa la versión con «nosotros» en una conversación real."]],
      sale: "Nombraste una pertenencia real compartida y la conversación se volvió más cercana.",
      subtemas: [
        { t: "La identidad social", d: "Henri Tajfel mostró que basta asignar a personas a grupos arbitrarios para que favorezcan a los de su grupo. Pertenecer es una necesidad profunda; nombrar el grupo compartido activa esa preferencia.", l: [
          "El grupo puede ser pequeño: la misma generación, la misma escuela.",
          "Lo que más une son los retos compartidos.",
          "Úsalo para incluir, no para excluir a otros."] },
        { t: "La sincronía crea unidad", d: "Experimentos de Scott Wiltermuth y Chip Heath encontraron que personas que caminaban o cantaban al mismo ritmo cooperaban más después. Hacer cosas juntos al mismo tiempo une más que hablar.", l: [
          "Un deporte en equipo o cocinar juntos acelera la confianza.",
          "En el trabajo, resolver un problema lado a lado une más que una junta.",
          "Las rutinas compartidas sostienen los grupos."] },
        { t: "Pedir consejo, no opinión", d: "Cialdini cita que pedir consejo pone al otro en tu lado del problema («¿qué harías tú?»), mientras que pedir opinión lo deja como evaluador externo. El consejo genera sensación de equipo.", l: [
          "Pregunta «¿qué me aconsejarías?» en vez de «¿qué opinas?».",
          "Incorpora algo de su consejo y díselo.",
          "Quien aconseja se siente parte del resultado."] }] },
    "El momento pesa tanto como el mensaje": { ic: "alarm-clock",
      sesion: [[5, "Elige una petición importante que vas a hacer pronto."],
               [15, "Diseña lo que pasará justo antes: qué pregunta harás para que el otro piense en el problema que tu propuesta resuelve."],
               [5, "Elige el momento del día y el lugar donde la persona está más tranquila."]],
      sale: "Tu petición llega después de una pregunta que prepara el terreno y en un momento elegido, no improvisado.",
      subtemas: [
        { t: "El priming", d: "La psicología llama priming a cómo una idea activa otras relacionadas. Pensar en un tema hace que lo relacionado nos parezca más importante en ese momento. Algunos experimentos famosos de priming no se han replicado bien, así que úsalo con moderación.", l: [
          "Lo que se discute antes de tu propuesta enmarca la propuesta.",
          "Una pregunta sobre el problema prepara la solución.",
          "No le exijas milagros: el contenido sigue mandando."] },
        { t: "El momento del día", d: "Un estudio con jueces israelíes encontró más decisiones favorables al inicio de las sesiones y después de los descansos. Aunque se ha discutido su interpretación, la idea práctica es clara: la gente cansada dice más que no.", l: [
          "Pide cosas importantes por la mañana o después de comer.",
          "Evita los viernes en la tarde para pedir algo grande.",
          "Nunca en medio de un incendio del otro."] },
        { t: "El encuadre", d: "Tversky y Kahneman mostraron que la misma opción se elige distinto si se presenta como ganancia o como pérdida. «90 % de supervivencia» y «10 % de mortalidad» son lo mismo, pero no se sienten igual.", l: [
          "Presenta tu propuesta con el encuadre que sea verdadero y claro.",
          "Cuando te presenten algo, tradúcelo al encuadre contrario.",
          "Las cifras absolutas evitan engaños de porcentaje."] }] },
    "Negociar · Etiquetar": { ic: "label",
      sesion: [[5, "Escribe tres etiquetas listas para usar: «parece que…», «suena a que…», «da la impresión de que…»."],
               [15, "En una conversación tensa o de trabajo, etiqueta una emoción del otro y quédate en silencio cuatro segundos."],
               [5, "Anota qué dijo después del silencio que no habría dicho de otro modo."]],
      sale: "Etiquetaste una emoción, aguantaste el silencio y el otro amplió o corrigió con información nueva.",
      subtemas: [
        { t: "Nombrar la emoción la calma", d: "Matthew Lieberman y su equipo encontraron con resonancia magnética que poner en palabras una emoción (affect labeling) baja la actividad de la amígdala. Decir «parece que estás frustrado» ayuda al otro a regularse.", l: [
          "Nombra la emoción, no el juicio: «frustrado», no «exagerado».",
          "Si te equivocas, el otro te corrige y aprendes más.",
          "Funciona también contigo: nombrar lo que sientes te calma."] },
        { t: "La auditoría de acusaciones", d: "Voss recomienda adelantarte a lo negativo que el otro piensa de ti: «probablemente vas a pensar que estoy pidiendo demasiado». Dicho por ti, pierde fuerza y el otro suele contestar lo contrario.", l: [
          "Antes de una negociación, lista lo peor que podrían pensar de ti.",
          "Dilo al principio, con calma.",
          "Luego guarda silencio."] },
        { t: "Etiquetar lo positivo", d: "No solo se etiquetan los miedos: nombrar lo positivo refuerza la buena disposición. «Parece que te importa mucho que el equipo salga bien» hace sentir visto al otro.", l: [
          "Etiqueta lo positivo para reforzarlo.",
          "Etiqueta lo negativo para desactivarlo.",
          "Nunca uses etiquetas para burlarte."] }] },
    "Negociar · Espejear": { ic: "mirror",
      sesion: [[5, "Repasa la técnica: repetir de una a tres palabras con tono de pregunta y callar."],
               [15, "Úsala tres veces en conversaciones distintas del día, solo cuando aparezca algo que quieres entender."],
               [5, "Anota qué te contaron después de cada espejo."]],
      sale: "Tres espejos en el día, cada uno seguido de una explicación más larga del otro.",
      subtemas: [
        { t: "Por qué funciona el espejo", d: "Los estudios sobre mimetismo (el efecto camaleón de Chartrand y Bargh) encontraron que imitar sutilmente a alguien aumenta la simpatía. Repetir sus palabras es una forma verbal de esa sincronía y además pide ampliar.", l: [
          "Sirve para entender sin interrogar.",
          "Usa sus palabras exactas, no las tuyas.",
          "El tono de pregunta, suave y curioso."] },
        { t: "La voz de locutor nocturno", d: "Voss distingue tres voces: la asertiva, la juguetona y la voz grave y lenta de locutor de radio nocturno. Esta última transmite calma y control, y es la que recomienda para momentos tensos.", l: [
          "Baja el tono y la velocidad cuando la conversación se calienta.",
          "La voz juguetona sirve para el trato del día a día.",
          "La asertiva casi siempre provoca resistencia."] },
        { t: "El silencio como herramienta", d: "La mayoría llena los silencios por incomodidad. Quien aguanta cuatro segundos recibe información. En una negociación de sueldo, después de decir tu número, callar es parte de la técnica.", l: [
          "Cuenta mentalmente hasta cuatro.",
          "No suavices tu propuesta mientras esperas.",
          "Deja que el otro hable primero después del silencio."] }] },
    "Negociar · Preguntas calibradas": { ic: "red-question-mark",
      sesion: [[5, "Escribe cinco preguntas calibradas que empiecen con «cómo» o «qué» para una negociación real que tengas pronto."],
               [15, "Ensaya en voz alta cómo responderías a un «no» con «¿cómo se supone que haga eso?» y «¿qué es lo más importante para ti en esto?»."],
               [5, "Usa al menos una en una conversación de trabajo esta semana."]],
      sale: "Usaste una pregunta calibrada y el otro propuso una solución que tú no tuviste que imponer.",
      copia: { t: "Preguntas calibradas", l: [
        "¿Cómo se supone que haga eso?",
        "¿Qué es lo más importante para ti en esto?",
        "¿Qué tendría que pasar para que esto funcione para los dos?",
        "¿Qué pasa si no hacemos nada?",
        "¿Cómo te ayudo a que esto se apruebe?"] },
      subtemas: [
        { t: "La ilusión de control", d: "Una pregunta calibrada deja que el otro sienta que controla la conversación mientras resuelve tu problema. La gente defiende más las soluciones que propone ella misma que las que le imponen.", l: [
          "Que la solución salga de su boca.",
          "Tú guías con preguntas, no con afirmaciones.",
          "Resume lo que propuso y confirma."] },
        { t: "BATNA: tu mejor alternativa", d: "Fisher y Ury acuñaron BATNA: tu mejor alternativa si no hay acuerdo. Saber cuál es la tuya te da calma; adivinar la del otro te dice cuánto poder tiene. Sin alternativa, negocias desde la necesidad.", l: [
          "Antes de negociar sueldo, conoce tu alternativa real.",
          "Mejorar tu alternativa (otra oferta, una certificación) mejora tu poder.",
          "No reveles tu mínimo."] },
        { t: "El número y el rango", d: "Voss sugiere, si das un rango, que su parte baja sea tu objetivo real. Y usar números exactos, no redondos: un número preciso parece calculado y se discute menos.", l: [
          "Investiga el rango del mercado antes.",
          "Da cifras precisas, no redondas.",
          "Incluye cosas que no son dinero: capacitación, días, horario."] }] },
    "Negociar · Buscar el \"no\"": { ic: "no-entry",
      sesion: [[5, "Escribe dos preguntas tuyas de esta semana que buscan un sí y reescríbelas para buscar un no."],
               [15, "Úsalas en conversaciones reales y practica resumir la postura del otro hasta que te diga «así es»."],
               [5, "Anota cómo cambió el tono cuando el otro se sintió con el control."]],
      sale: "Conseguiste al menos un «así es» resumiendo la postura de otra persona.",
      subtemas: [
        { t: "El «no» como inicio", d: "Para Voss, el «no» no termina la negociación: le da al otro sensación de seguridad y control, y desde ahí está dispuesto a escuchar. Un «sí» temprano y forzado suele ser falso.", l: [
          "Diseña preguntas donde el «no» te favorece.",
          "No te ofendas con un no: es información.",
          "Pregunta qué tendría que cambiar para que fuera sí."] },
        { t: "Los tres tipos de «sí»", d: "Voss distingue el sí falso (para que te vayas), el sí de confirmación (reflejo, sin compromiso) y el sí de compromiso (que lleva a actuar). Solo el último vale; los otros dos engañan.", l: [
          "Confirma con la pregunta «¿cómo lo vamos a hacer?».",
          "Pide el siguiente paso concreto con fecha.",
          "Un sí sin acción no es un sí."] },
        { t: "La regla del 7-38-55 y sus mitos", d: "Se cita que el 7 % del mensaje son palabras, 38 % tono y 55 % cuerpo, pero Albert Mehrabian lo midió solo para emociones ambiguas en palabras sueltas. No aplica a toda conversación. Lo útil: cuando las palabras y el tono no coinciden, cree al tono.", l: [
          "Si dice «sí» con duda, pregunta.",
          "No uses ese porcentaje como regla general.",
          "La coherencia entre lo que dices y cómo lo dices da credibilidad."] }] },
    "Practicarlo esta semana": { ic: "spiral-calendar",
      sesion: [[5, "Pon en tu calendario el ejercicio de cada día de la semana, de lunes a domingo."],
               [15, "Haz hoy el del día y anota en tres líneas qué pasó."],
               [5, "Al cierre de la semana, elige la técnica que más te sirvió y repítela la siguiente."]],
      sale: "Hiciste los siete ejercicios y tienes anotado qué pasó en cada uno.",
      copia: { t: "Tu bitácora de la semana", l: [
        "Lunes · etiqueta: ______ → después del silencio dijo: ______",
        "Martes · tres espejos: ______ / ______ / ______",
        "Miércoles · «cómo» en vez de «por qué»: ______",
        "Jueves · principio detectado en un anuncio: ______",
        "Viernes · mi petición con dos principios: ______",
        "Fin de semana · compra reciente y su principio: ______"] },
      subtemas: [
        { t: "La práctica deliberada", d: "Anders Ericsson mostró que no mejora quien repite, sino quien practica con objetivo, retroalimentación y en el límite de su capacidad. Un ejercicio diario pequeño y medido vale más que leer el libro dos veces.", l: [
          "Un objetivo concreto por día.",
          "Anota el resultado: es tu retroalimentación.",
          "Sube la dificultad cuando algo ya sale fácil."] },
        { t: "Bajo riesgo primero", d: "Practicar estas técnicas en situaciones donde no te juegas nada te permite equivocarte y ajustar. Cuando llegue la negociación importante, ya las tendrás automatizadas.", l: [
          "Practica con un vendedor, un servicio al cliente, un amigo.",
          "Deja la negociación de sueldo para cuando ya te salgan naturales.",
          "Equivocarte en lo pequeño es barato."] },
        { t: "Revisión semanal", d: "Revisar lo que pasó convierte la experiencia en aprendizaje. El ejército de EE. UU. usa la revisión después de la acción: qué se esperaba, qué pasó, por qué y qué haremos distinto.", l: [
          "¿Qué esperaba que pasara?",
          "¿Qué pasó en realidad y por qué?",
          "¿Qué haré distinto la próxima vez?"] }] },
    "Cómo defenderte cuando te los aplican": { ic: "shield",
      sesion: [[5, "Busca una promoción de inversión, un curso o un seguro que te hayan ofrecido."],
               [15, "Identifica qué principios usa —escasez, prueba social, autoridad— y verifica sus datos en una fuente independiente."],
               [5, "Escribe tu regla personal de defensa en una frase y ponla donde decides compras."]],
      sale: "Nombraste los principios de una oferta real y verificaste sus datos antes de decidir.",
      copia: { t: "Antes de decir que sí", l: [
        "1. ¿Qué principio me están aplicando? ______",
        "2. Si me lo dijera alguien que me cae mal, ¿tendría sentido? ______",
        "3. ¿Sigue la oferta mañana? (si no, no)",
        "4. ¿De dónde sale el dato? Fuente: ______",
        "5. ¿Está registrado (CNBV / CONDUSEF) si es financiero? ______"] },
      subtemas: [
        { t: "Las estafas financieras siguen un guion", d: "Los fraudes de inversión suelen combinar promesas de rendimientos altos y seguros, prisa, testimonios de gente como tú y una figura de autoridad. Los esquemas Ponzi pagan a los primeros con el dinero de los nuevos hasta que colapsan.", l: [
          "Rendimiento alto y seguro no existen juntos.",
          "Verifica el registro en la CNBV o la CONDUSEF.",
          "Si te piden reclutar a otros, es señal de esquema piramidal."] },
        { t: "La técnica de preguntar «¿y si no?»", d: "Ante cualquier presión, pregunta qué pasa si dices que no o esperas. Una oferta legítima tiene respuesta clara; una trampa responde con más presión.", l: [
          "«¿Qué pasa si lo decido la próxima semana?».",
          "«¿Me lo puede mandar por escrito?».",
          "Más presión ante esas preguntas es la respuesta."] },
        { t: "El enfriamiento", d: "Muchas compras impulsivas se evitan con una pausa. La regla de las 24 o 72 horas para compras grandes deja que pase la emoción del momento y decida tu sistema 2.", l: [
          "Compras grandes: espera 72 horas.",
          "Quita la tarjeta guardada de las apps de compras.",
          "Si después de esperar lo sigues queriendo, cómpralo tranquilo."] }] },
    "📚 Qué leer, en qué orden": { ic: "books" },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  relacionarte: {
    "El libro que no envejeció": { ic: "open-book",
      sesion: [[5, "Piensa en tus últimas tres conversaciones y anota cuánto tiempo hablaste tú y cuánto el otro."],
               [15, "En la próxima conversación del día, propónte que el otro hable más que tú y que salga sintiéndose importante."],
               [5, "Anota qué le preguntaste y qué te contó que no sabías."]],
      sale: "En una conversación el otro habló más que tú y salió contándote algo que le importa.",
      subtemas: [
        { t: "La necesidad de ser visto", d: "Abraham Maslow puso el reconocimiento entre las necesidades humanas básicas, junto con la pertenencia. William James escribió que el principio más profundo de la naturaleza humana es el anhelo de ser apreciado. Carnegie construyó su libro sobre esa idea.", l: [
          "Todos quieren sentirse importantes, también tu jefe y tu familia.",
          "Dar atención es dar reconocimiento.",
          "Lo que reconoces en alguien, crece."] },
        { t: "El sesgo del foco", d: "Thomas Gilovich mostró el efecto reflector: creemos que los demás se fijan en nosotros mucho más de lo que lo hacen. Cada quien está ocupado consigo. Saberlo quita presión: no te están evaluando tanto como crees.", l: [
          "Tus errores pequeños casi nadie los nota.",
          "Usa esa energía para fijarte en el otro.",
          "Si te preocupa el juicio ajeno, recuerda que el otro también está pensando en sí."] },
        { t: "Sinceridad o nada", d: "Las técnicas de agradar sin interés real se detectan rápido. La investigación sobre la congruencia muestra que cuando el tono, la cara y las palabras no coinciden, la gente desconfía. Por eso Carnegie insiste en la sinceridad.", l: [
          "Si no te interesa alguien, busca qué podría interesarte de él.",
          "Las preguntas genuinas salen de la curiosidad, no del guion.",
          "Mejor callar que elogiar en falso."] }] },
    "Las tres reglas que sostienen todo lo demás": { ic: "classical-building",
      sesion: [[5, "Elige un día de esta semana para hacer la prueba de cero críticas y cero quejas en voz alta."],
               [15, "Durante el día, cada vez que vayas a criticar o quejarte, cámbialo por una pregunta o por un reconocimiento específico."],
               [5, "En la noche cuenta cuántas veces lo lograste y cuántas se te escapó."]],
      sale: "Pasaste un día con menos de tres críticas o quejas en voz alta y diste al menos dos reconocimientos específicos.",
      subtemas: [
        { t: "La proporción de Gottman", d: "John Gottman observó que las parejas estables tienen unas cinco interacciones positivas por cada negativa durante un conflicto. Con el trabajo y los amigos pasa algo parecido: una crítica pesa mucho más que un elogio.", l: [
          "Antes de criticar, revisa si ya has reconocido algo bueno.",
          "Una crítica necesita varias interacciones positivas para compensarse.",
          "Los elogios específicos son los que cuentan."] },
        { t: "Por qué la crítica no funciona", d: "La crítica activa la defensa del ego: la persona protege su imagen en lugar de escuchar. Carnegie lo vio en criminales que se justificaban; la psicología lo llama sesgo de autojustificación, y todos lo tenemos.", l: [
          "Nadie cambia sintiéndose atacado.",
          "Habla del problema, no de la persona.",
          "Pregunta antes de juzgar: quizá falta información."] },
        { t: "Hablar en términos de lo que el otro quiere", d: "Antes de pedir, pregúntate qué gana el otro. Es empatía práctica: traducir tu petición a sus intereses. Aumenta las posibilidades de un sí y evita que pidas cosas que no le convienen.", l: [
          "Escribe en una frase qué gana el otro.",
          "Empieza la petición por su beneficio, no por el tuyo.",
          "Si no gana nada, pide algo más pequeño o da primero."] }] },
    "Seis formas de agradar": { ic: "smiling-face-with-hearts",
      sesion: [[5, "Elige dos de las seis formas que menos practicas."],
               [15, "Aplícalas en tres conversaciones del día: por ejemplo, usar el nombre dos veces y preguntar por algo que le apasiona."],
               [5, "Anota cómo reaccionó cada persona."]],
      sale: "Usaste las dos formas en tres conversaciones y viste al menos una reacción más cálida de lo habitual.",
      subtemas: [
        { t: "La sonrisa de Duchenne", d: "El neurólogo Guillaume Duchenne distinguió la sonrisa auténtica, que mueve los músculos alrededor de los ojos, de la sonrisa social, que solo mueve la boca. La gente percibe la diferencia; la auténtica sale de pensar en algo que te alegra de ver a la persona.", l: [
          "Piensa en algo que te guste de la persona antes de saludar.",
          "Una sonrisa forzada se nota en los ojos.",
          "Sonreír también te cambia el ánimo a ti."] },
        { t: "Tu nombre en la boca de otro", d: "Estudios con resonancia magnética encontraron que oír el propio nombre activa áreas del cerebro relacionadas con uno mismo de forma distinta a otros nombres. Usarlo bien hace sentir a la persona reconocida; usarlo de más suena a vendedor.", l: [
          "Dos o tres veces en una conversación bastan.",
          "Pronúncialo bien; si es difícil, pregunta cómo se dice.",
          "Escríbelo bien en los mensajes."] },
        { t: "Las preguntas que hacen hablar con gusto", d: "La gente habla con gusto de lo que la apasiona y de lo que la hizo quien es. Diana Tamir y Jason Mitchell encontraron que hablar de uno mismo activa los circuitos de recompensa del cerebro, como la comida.", l: [
          "«¿Qué es lo que más disfrutas de eso?».",
          "«¿Cómo empezaste en eso?».",
          "Escucha la respuesta completa antes de contar tu experiencia."] }] },
    "Escuchar de verdad — los tres niveles": { ic: "ear",
      sesion: [[5, "Elige una conversación de hoy donde practicarás el nivel 3."],
               [20, "Durante la charla, cuenta tres segundos antes de responder y pregunta por lo que hay debajo: qué siente, qué le preocupa."],
               [5, "Al terminar, escribe tres cosas concretas que aprendiste del otro."]],
      sale: "Escribiste tres cosas concretas del otro y una de ellas es algo que siente, no solo algo que hizo.",
      subtemas: [
        { t: "La escucha activa de Carl Rogers", d: "Carl Rogers y Richard Farson propusieron la escucha activa: escuchar el contenido y el sentimiento, y devolverlo con tus palabras para comprobar que entendiste. Es la base de la terapia centrada en la persona y de la buena comunicación.", l: [
          "Parafrasea: «o sea que te preocupa que…».",
          "Refleja el sentimiento: «suena frustrante».",
          "Pregunta si lo entendiste bien."] },
        { t: "La trampa de la solución rápida", d: "Muchos escuchan buscando qué resolver. Pero cuando alguien cuenta un problema, a menudo quiere primero sentirse comprendido. Dar una solución demasiado pronto le dice que no escuchaste del todo.", l: [
          "Pregunta: «¿quieres que te ayude a resolverlo o solo contármelo?».",
          "Valida antes de aconsejar.",
          "La solución llega mejor después de la comprensión."] },
        { t: "La atención dividida", d: "Un estudio de Przybylski y Weinstein encontró que la sola presencia de un celular sobre la mesa reducía la sensación de cercanía y confianza en una conversación. La atención total es un regalo raro.", l: [
          "Guarda el celular, no lo pongas boca abajo en la mesa.",
          "Mira a la persona, no a la pantalla.",
          "Si tienes que contestar, dilo y pide un momento."] }] },
    "Empezar bien una conversación": { ic: "speech-balloon",
      sesion: [[5, "Prepara dos frases de arranque basadas en lo que compartes con la gente del lugar al que vas hoy."],
               [15, "Úsalas con una persona nueva, ancla su nombre y cédele el primer turno largo."],
               [5, "Si hay seguimiento, escribe un mensaje que empiece con su nombre y mencione algo que dijo."]],
      sale: "Iniciaste una conversación con alguien nuevo, recordaste su nombre al despedirte y el otro habló más que tú.",
      subtemas: [
        { t: "Los primeros segundos", d: "Las investigaciones de Nalini Ambady sobre «rebanadas finas» mostraron que juicios hechos con pocos segundos de observación coinciden bastante con evaluaciones largas. No puedes controlarlo todo, pero sí empezar con postura abierta y atención.", l: [
          "Postura abierta: brazos sin cruzar, cuerpo hacia el otro.",
          "Contacto visual cómodo, no fijo.",
          "Una sonrisa y su nombre en el saludo."] },
        { t: "La charla pequeña tiene función", d: "La conversación trivial (el clima, el lugar) no es tiempo perdido: es la forma en que dos desconocidos comprueban que son seguros el uno para el otro. Desde ahí se profundiza poco a poco.", l: [
          "Empieza por lo que comparten en ese momento.",
          "Pasa de un dato a una opinión: «¿y a ti qué te pareció?».",
          "De la opinión, a la experiencia: «¿te ha pasado antes?»."] },
        { t: "Hablar con desconocidos mejora el día", d: "Nicholas Epley y Juliana Schroeder pidieron a pasajeros de tren que hablaran con un desconocido: la mayoría lo disfrutó más de lo que esperaba y el otro también. Subestimamos cuánto le gusta al otro conversar.", l: [
          "El miedo al rechazo es mayor que el rechazo real.",
          "Una pregunta amable casi siempre se recibe bien.",
          "En Didi, en una fila o en el gym hay oportunidades diarias."] }] },
    "Recordar nombres y detalles (sin memoria prodigiosa)": { ic: "card-index",
      sesion: [[5, "Repasa el sistema: repetir, asociar, anotar."],
               [15, "Úsalo con tres personas que conozcas esta semana; asocia cada nombre a una imagen ridícula."],
               [5, "Esa misma noche anota en su contacto dónde se conocieron, a qué se dedica y un detalle personal."]],
      sale: "Una semana después recuerdas los tres nombres y un detalle de cada uno.",
      subtemas: [
        { t: "La paradoja Baker-baker", d: "Si te dicen que alguien se apellida Baker, lo olvidas más fácil que si te dicen que es panadero (baker en inglés). Una profesión trae imágenes y asociaciones; un nombre no. Por eso hay que crearle una imagen.", l: [
          "Convierte el nombre en algo visual: «Rosa» → una rosa en su solapa.",
          "Liga la imagen a un rasgo de su cara.",
          "Cuanto más absurda la imagen, mejor se recuerda."] },
        { t: "La repetición espaciada", d: "Recordar algo a intervalos crecientes —minutos, horas, días— fija la memoria mucho mejor que repetirlo seguido. Es el principio de las tarjetas de memoria, y sirve igual con nombres.", l: [
          "Repite el nombre al conocerlo, a mitad de la charla y al despedirte.",
          "Repásalo esa noche al anotarlo.",
          "Vuelve a leer tus notas antes del siguiente encuentro."] },
        { t: "El efecto de prestar atención", d: "Muchas veces no olvidamos el nombre: nunca lo guardamos, porque estábamos pensando en qué decir. Prestar atención en el momento de la presentación es la mitad del truco.", l: [
          "Cuando te lo digan, deja de pensar en tu presentación.",
          "Si no lo oíste bien, pregunta en el momento.",
          "Repítelo en voz alta en ese mismo instante."] }] },
    "Cuando hay desacuerdo": { ic: "handshake",
      sesion: [[5, "Piensa en un desacuerdo actual o reciente con alguien."],
               [15, "Escribe la postura del otro mejor de lo que él la diría y tres puntos en los que sí coinciden."],
               [5, "En la próxima conversación del tema, empieza por esos puntos y por su postura, y pregunta si la entendiste bien."]],
      sale: "El otro te dijo que entendiste bien su postura antes de que dieras la tuya.",
      subtemas: [
        { t: "La regla de Rapoport", d: "El filósofo Daniel Dennett popularizó las reglas de Anatol Rapoport para criticar con respeto: primero expresa la postura del otro tan bien que diga «ojalá lo hubiera dicho así», luego menciona en qué estás de acuerdo y lo que aprendiste, y solo entonces critica.", l: [
          "Repite su postura con claridad y sin caricatura.",
          "Di en qué coincides y qué aprendiste.",
          "Después, tu desacuerdo, concreto y breve."] },
        { t: "El efecto contraproducente", d: "Cuando se confronta a alguien con datos que contradicen una creencia importante para su identidad, a veces se aferra más a ella. Aunque la investigación muestra que el efecto no es tan común como se pensaba, la confrontación directa rara vez convence.", l: [
          "Haz preguntas que lo lleven a revisar su propia postura.",
          "Separa la idea de la identidad de la persona.",
          "Deja salida digna para cambiar de opinión."] },
        { t: "Admitir rápido un error", d: "Reconocer tu error quita munición al otro y aumenta tu credibilidad. Estudios sobre humildad intelectual muestran que la gente confía más en quien reconoce lo que no sabe.", l: [
          "«Tienes razón en eso, me equivoqué».",
          "Sin justificaciones largas.",
          "Después, sigue con lo que sí sostienes."] }] },
    "Criticar sin romper nada": { ic: "left-speech-bubble",
      sesion: [[5, "Piensa en una observación incómoda que tengas pendiente con alguien."],
               [15, "Escríbela con la estructura: lo que valoras (verdadero), un error tuyo parecido, el problema concreto con «y», y una pregunta para resolverlo."],
               [5, "Léela en voz alta y quita cualquier «pero» y cualquier juicio sobre la persona."]],
      sale: "Tu observación habla del trabajo, no de la persona, no tiene «pero» y termina en una pregunta.",
      copia: { t: "Una observación que no rompe", l: [
        "Me gustó ______ (algo real y específico).",
        "A mí me pasó algo parecido cuando ______.",
        "Vi que ______ (el hecho concreto), y creo que si ______ quedaría mucho mejor.",
        "¿Cómo lo ves tú? ¿Qué te ayudaría para la próxima?"] },
      subtemas: [
        { t: "El feedback que se puede usar", d: "La retroalimentación útil es específica, sobre una conducta observable y cercana en el tiempo. «Llegaste 20 minutos tarde a la junta de hoy» se puede corregir; «eres impuntual» solo genera defensa.", l: [
          "Describe la conducta, no el carácter.",
          "Hazlo pronto, no meses después.",
          "Un tema a la vez."] },
        { t: "La mentalidad de crecimiento", d: "Carol Dweck mostró que las personas que creen que sus habilidades se desarrollan aprenden más de los errores. Presentar el error como algo corregible apoya esa mentalidad; presentarlo como un rasgo fijo la destruye.", l: [
          "«Todavía no» en vez de «no puedes».",
          "Señala el camino de mejora, no solo el error.",
          "Reconoce el progreso cuando aparezca."] },
        { t: "Privado, siempre", d: "Criticar delante de otros humilla y pone a la persona a defender su imagen. La regla clásica de liderazgo: elogia en público, corrige en privado.", l: [
          "Busca un momento a solas.",
          "Si fue en público, la disculpa también.",
          "Nunca por mensaje de grupo."] }] },
    "Las conversaciones que sí importan": { ic: "locked-with-key",
      sesion: [[5, "Elige una conversación importante que estés evitando."],
               [15, "Prepárala con la fórmula: el contraste (lo que no quieres y lo que sí), los hechos, tu interpretación como interpretación y una pregunta."],
               [10, "Tenla. Si ves silencio, ataque o broma para desviar, regresa a la seguridad antes de seguir con el tema."]],
      sale: "Tuviste la conversación, empezaste por hechos y el otro pudo dar su versión sin cerrarse.",
      copia: { t: "Hechos, interpretación y pregunta", l: [
        "No busco ______; lo que quiero es ______.",
        "Lo que vi: ______ (hecho que nadie discute).",
        "Lo que pensé: ______ (mi interpretación, puede estar mal).",
        "¿Cómo lo ves tú?"] },
      subtemas: [
        { t: "La seguridad psicológica", d: "Amy Edmondson definió la seguridad psicológica como la creencia de que puedes hablar sin ser castigado o humillado. En equipos de trabajo, es lo que más predice el aprendizaje y el buen desempeño, según el estudio Aristóteles de Google.", l: [
          "Sin seguridad, la gente esconde problemas.",
          "Agradece cuando alguien te dice algo incómodo.",
          "Tu reacción a las malas noticias decide si te las vuelven a contar."] },
        { t: "Las historias que nos contamos", d: "<i>Crucial Conversations</i> describe cómo pasamos de ver un hecho a contarnos una historia y sentir una emoción, en segundos. Separar el hecho de la historia te permite revisar si la historia es verdad.", l: [
          "Pregúntate: ¿qué vi exactamente?",
          "¿Qué historia me estoy contando sobre eso?",
          "¿Qué otra explicación razonable podría haber?"] },
        { t: "Secuestro emocional", d: "Daniel Goleman llamó secuestro de la amígdala a cuando una emoción fuerte toma el control y dejamos de pensar con claridad. En ese estado, cualquier conversación importante sale mal.", l: [
          "Si sientes calor en la cara o el pulso alto, pide una pausa.",
          "Respira lento: exhalar más largo que inhalar calma el cuerpo.",
          "Retoma cuando los dos puedan pensar."] }] },
    "Pedir perdón de verdad": { ic: "folded-hands",
      sesion: [[5, "Piensa en una disculpa que debas o que diste mal."],
               [15, "Escríbela con sus cuatro partes: lo que hiciste, su efecto, sin «pero», y lo que harás distinto."],
               [5, "Dila en persona o por llamada; si es por escrito, que sea breve y sin justificaciones."]],
      sale: "Tu disculpa tuvo las cuatro partes y el otro respondió con algo más que «está bien».",
      copia: { t: "La disculpa completa", l: [
        "Perdón por ______ (lo que hice, específico).",
        "Sé que eso te ______ (el efecto en ti).",
        "No tengo excusa.",
        "A partir de ahora voy a ______."] },
      subtemas: [
        { t: "Qué hace eficaz una disculpa", d: "Un estudio de Roy Lewicki y colegas (2016) encontró que el elemento más importante de una disculpa es reconocer la responsabilidad, seguido de ofrecer reparar el daño. Explicar las causas o expresar arrepentimiento pesan menos.", l: [
          "Lo central: «fue mi culpa».",
          "Ofrece reparar si se puede.",
          "La explicación, corta y sin excusa."] },
        { t: "Cuándo disculparse", d: "Una disculpa a tiempo evita que el resentimiento crezca, pero una disculpa apresurada, antes de entender el daño, suena vacía. Primero escucha cómo le afectó; luego discúlpate.", l: [
          "Si no sabes bien qué dolió, pregunta antes.",
          "No esperes semanas: el silencio también comunica.",
          "Una disculpa no exige perdón inmediato."] },
        { t: "Disculparte sin humillarte", d: "Pedir perdón no es aceptar culpas que no son tuyas ni ponerte por debajo. Es asumir tu parte con dignidad. Una disculpa excesiva y dramática pone al otro a consolarte.", l: [
          "Asume solo lo que sí te toca.",
          "Sin autocastigo en voz alta.",
          "Breve, clara y con acción."] }] },
    "Mantener las relaciones que ya tienes": { ic: "seedling",
      sesion: [[5, "Haz una lista de diez personas importantes con quienes no hablas hace más de tres meses."],
               [15, "Mándales a tres un mensaje sin motivo o con algo concreto que te recordó a ellas."],
               [5, "Pon un recordatorio para las siguientes tres la próxima semana."]],
      sale: "Tres mensajes enviados a personas importantes y la siguiente tanda agendada.",
      subtemas: [
        { t: "Lo que dice el estudio de Harvard", d: "El estudio de desarrollo adulto de Harvard ha seguido a cientos de personas durante más de 80 años. Su hallazgo más repetido: la calidad de las relaciones cercanas predice la salud y la felicidad en la vejez mejor que el dinero o la fama.", l: [
          "Las relaciones son inversión de largo plazo en salud.",
          "La calidad pesa más que la cantidad.",
          "Hay que cuidarlas activamente, sobre todo al mudarte de país."] },
        { t: "Responder a lo bueno", d: "Shelly Gable estudió cómo respondemos a las buenas noticias de los demás. La respuesta activa y constructiva —entusiasmo y preguntas— fortalece la relación más que la ayuda en lo malo. La pasiva o la que lo opaca la debilita.", l: [
          "«¡Qué bien! ¿Cómo te enteraste? ¿Qué sigue?».",
          "Evita cambiar el tema a ti.",
          "Celebra con detalles, no con un emoji."] },
        { t: "Relaciones a distancia", d: "Cuando te vayas a Alemania, las relaciones de México dependerán de rituales: una llamada fija, mensajes de voz, fechas importantes. Sin estructura, la distancia las apaga en meses.", l: [
          "Define con tu familia un día y hora de llamada.",
          "Mensajes de voz cortos sienten más cercanos que texto.",
          "Anota cumpleaños y fechas importantes en el calendario."] }] },
    "Practicarlo esta semana": { ic: "spiral-calendar",
      sesion: [[5, "Pon en tu calendario el ejercicio de cada día."],
               [15, "Haz el de hoy y anota en tres líneas qué pasó."],
               [5, "El domingo, responde: ¿de quién sabes hoy tres cosas que no sabías el lunes?"]],
      sale: "Hiciste los siete ejercicios y el domingo puedes nombrar al menos tres personas de las que sabes tres cosas nuevas.",
      copia: { t: "Tu semana", l: [
        "Lunes · tres segundos de silencio: lo que añadió fue ______",
        "Martes · tres nombres nuevos: ______ / ______ / ______",
        "Miércoles · elogio específico a ______ sobre ______",
        "Jueves · repetí la postura de ______ antes de dar la mía",
        "Viernes · cambié un «pero» por un «y» en ______",
        "Sábado · escribí a ______ sin motivo",
        "Domingo · tres cosas nuevas de ______"] },
      subtemas: [
        { t: "Los hábitos sociales se entrenan", d: "Las habilidades sociales se aprenden como cualquier otra: con repetición, retroalimentación y práctica gradual. La terapia de entrenamiento en habilidades sociales usa justo esto: ejercicios pequeños en situaciones reales.", l: [
          "Un ejercicio pequeño al día vale más que uno grande al mes.",
          "Anota lo que pasa para ver tu avance.",
          "Repite el que más te cueste."] },
        { t: "Las intenciones de implementación", d: "Decidir de antemano dónde y cuándo harás el ejercicio aumenta la probabilidad de hacerlo. «Cuando llegue a la oficina, saludaré por su nombre a la primera persona» funciona mejor que «hoy usaré nombres».", l: [
          "Asocia cada ejercicio a un momento fijo del día.",
          "Escribe la frase «cuando…, haré…».",
          "Ponla a la vista en la mañana."] },
        { t: "Ser amable contigo cuando falles", d: "Kristin Neff estudió la autocompasión: tratarte con la amabilidad que tratarías a un amigo. Las personas autocompasivas se recuperan mejor de los errores y siguen intentando, en lugar de abandonar.", l: [
          "Si fallaste un día, retoma al siguiente sin castigarte.",
          "Pregúntate qué aprendiste, no qué tan mal estuvo.",
          "La constancia importa más que la perfección."] }] },
    "📚 Qué leer, en qué orden": { ic: "books" },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  sacarmejor: {
    "El experimento que lo demuestra": { ic: "seedling",
      sesion: [[5, "Escribe los nombres de tres personas con quienes trabajas o convives a diario."],
               [15, "Junto a cada nombre, anota con honestidad qué esperas de ella en una palabra y una conducta tuya que lo deja ver: el tiempo que le das, el tono, lo que le delegas."],
               [5, "Elige a la persona de quien esperas menos y escribe una conducta que cambiarás con ella esta semana."]],
      sale: "Tienes una conducta concreta que vas a cambiar con la persona de quien esperas menos.",
      subtemas: [
        { t: "Cómo se filtra una expectativa", d: "Rosenthal resumió cuatro canales por los que la expectativa llega al otro: el clima (calidez, sonrisa, contacto visual), la retroalimentación (más detallada), lo que se le da (tareas más retadoras) y las oportunidades de responder (más tiempo y más intentos).", l: [
          "Clima: ¿cómo le hablas comparado con otros?",
          "Retroalimentación: ¿le explicas o solo lo corriges?",
          "Oportunidades: ¿le das la tarea difícil o se la quitas?"] },
        { t: "La profecía que se cumple sola", d: "El sociólogo Robert Merton describió la profecía autocumplida: una creencia falsa provoca conductas que la vuelven verdadera. Es lo que pasa cuando un jefe decide que alguien no da y le quita las oportunidades para demostrar lo contrario.", l: [
          "Pregúntate si tu creencia es dato o suposición.",
          "Dale a la persona una oportunidad real de contradecirte.",
          "Revisa tus etiquetas cada cierto tiempo."] },
        { t: "Lo que se discute del estudio", d: "El estudio original de Rosenthal recibió críticas metodológicas y los efectos en escuelas resultaron más modestos en réplicas posteriores. Lo que sí se sostiene: las expectativas influyen más cuando el que las tiene tiene poder y el otro está en una situación nueva.", l: [
          "El efecto es real pero no mágico.",
          "Pesa más con gente nueva en el equipo o en un rol nuevo.",
          "Tú eres esa persona con poder para alguien más."] }] },
    "Empieza por lo que esperas": { ic: "label",
      sesion: [[5, "Elige a alguien con quien te frustras y escribe la etiqueta que le tienes."],
               [15, "Busca y anota tres evidencias concretas que contradigan esa etiqueta: algo que hizo bien, algo que resolvió, alguien que lo valora."],
               [5, "Decide cómo harás visible una de esas evidencias: díselo esta semana."]],
      sale: "Encontraste tres evidencias contra tu etiqueta y le dijiste a la persona una de ellas.",
      subtemas: [
        { t: "El sesgo de confirmación", d: "Una vez que tenemos una idea, buscamos y recordamos lo que la confirma e ignoramos lo que la contradice. Peter Wason lo demostró con tareas de lógica; en las personas funciona igual: si crees que alguien es flojo, ves solo su flojera.", l: [
          "Busca activamente lo que no encaja con tu idea.",
          "Escribe las evidencias, no confíes en tu memoria.",
          "Pregunta a otros cómo ven a esa persona."] },
        { t: "El error fundamental de atribución", d: "Lee Ross describió nuestra tendencia a explicar lo que hacen los demás por su carácter y lo que hacemos nosotros por las circunstancias. Él llegó tarde porque es irresponsable; tú, porque había tráfico.", l: [
          "Pregúntate qué circunstancia podría explicar su conducta.",
          "Aplica a los demás la misma comprensión que te das a ti.",
          "Pregunta antes de concluir."] },
        { t: "La mentalidad de crecimiento aplicada a otros", d: "Dweck encontró que los gerentes con mentalidad de crecimiento notan mejor la mejora de sus empleados y dan más retroalimentación útil. Si crees que la gente cambia, te fijas en cuándo cambia.", l: [
          "Compara a la persona con ella misma hace tres meses, no con otros.",
          "Nombra el progreso cuando lo veas.",
          "Da tareas que le cuesten un poco, no que le sobren."] }] },
    "Multiplicadores y disminuidores": { ic: "chart-increasing",
      sesion: [[5, "Lee las conductas de multiplicador y disminuidor y marca cuáles haces tú."],
               [15, "En tu próxima junta o conversación de trabajo, haz una pregunta difícil, aguanta el silencio y pide la opinión de quien menos habla."],
               [5, "Mide qué porcentaje del tiempo hablaste y anótalo."]],
      sale: "Hablaste menos del 30 % del tiempo y alguien que casi no participa aportó una idea.",
      subtemas: [
        { t: "El disminuidor accidental", d: "Wiseman describe conductas bien intencionadas que disminuyen: el que siempre tiene una idea, el optimista que minimiza los problemas, el rescatador, el que responde rápido. Cada una le quita al otro la oportunidad de pensar.", l: [
          "Antes de dar tu idea, pide tres a los demás.",
          "No rescates en errores que se pueden corregir.",
          "Responder rápido ahoga a los que piensan despacio."] },
        { t: "Delegar el problema completo", d: "Dar una tarea partida en pasos reduce a la persona a ejecutor. Dar el problema completo, con el resultado esperado y los límites, la pone a pensar. Es la diferencia entre «haz estas cinco pruebas» y «asegura que este módulo no falle».", l: [
          "Define el resultado y los límites, no el método.",
          "Acuerda cuándo revisar el avance.",
          "Tolera que lo haga distinto a ti si el resultado es bueno."] },
        { t: "Medir tu propio tiempo de habla", d: "Casi nadie sabe cuánto habla en una junta. Medirlo una vez —con un cronómetro o pidiéndole a alguien que lo note— suele sorprender. Es el dato más rápido para saber si estás multiplicando.", l: [
          "Mide en una junta de la semana.",
          "Si pasa del 30 %, la siguiente vez habla al final.",
          "Cuenta cuántas preguntas hiciste frente a cuántas afirmaciones."] }] },
    "Preguntar en vez de responder": { ic: "red-question-mark",
      sesion: [[5, "Escribe las siete preguntas en una tarjeta o en una nota del celular."],
               [20, "En una conversación donde alguien te pide ayuda, usa al menos tres de las siete antes de dar ninguna respuesta."],
               [5, "Anota qué respuesta encontró la persona sola."]],
      sale: "La persona encontró sola una respuesta que tú ya tenías en mente o una mejor.",
      copia: { t: "Las siete preguntas", l: [
        "1. ¿Qué tienes en mente?",
        "2. ¿Y qué más?",
        "3. ¿Cuál es el verdadero reto aquí para ti?",
        "4. ¿Qué quieres?",
        "5. ¿Cómo puedo ayudar?",
        "6. Si dices que sí a esto, ¿a qué le estás diciendo que no?",
        "7. ¿Qué te resultó más útil de esta conversación?"] },
      subtemas: [
        { t: "El efecto de generación", d: "Lo que uno genera por sí mismo se recuerda mejor que lo que lee o le dicen (Slamecka y Graf). Cuando alguien llega solo a la respuesta, la recuerda y la aplica; cuando se la das, la olvida.", l: [
          "Pregunta hasta que la persona formule la solución.",
          "Si se atora, da una pista, no la respuesta.",
          "Pide que resuma con sus palabras lo que decidió."] },
        { t: "El monstruo del consejo", d: "Bungay Stanier llama así al impulso de aconsejar: crees que ayudas, pero muchas veces resuelves el problema equivocado porque no preguntaste lo suficiente. La primera versión del problema casi nunca es la real.", l: [
          "Aguanta las ganas de aconsejar los primeros cinco minutos.",
          "Pregunta «¿y qué más?» al menos dos veces.",
          "Confirma cuál es el reto real antes de resolver."] },
        { t: "Preguntas cerradas que se disfrazan", d: "«¿Has pensado en hablar con tu jefe?» parece pregunta, pero es un consejo con signo de interrogación. Las preguntas que de verdad abren empiezan con qué o cómo y no esconden tu respuesta.", l: [
          "Cambia «¿has pensado en…?» por «¿qué opciones ves?».",
          "Si tu pregunta se contesta con sí o no, ábrela.",
          "Tu opinión, si la dices, que sea como opinión y al final."] }] },
    "Aguantar el silencio": { ic: "zipper-mouth-face",
      sesion: [[5, "Elige una conversación importante del día."],
               [15, "Después de cada pregunta importante, cuenta hasta siete en tu cabeza antes de decir nada."],
               [5, "Anota qué dijo la persona después del silencio."]],
      sale: "Al menos una vez, la persona dijo algo importante después de tu silencio de siete segundos.",
      subtemas: [
        { t: "El tiempo de espera de Mary Budd Rowe", d: "La investigadora Mary Budd Rowe midió que los maestros esperaban en promedio un segundo después de preguntar. Cuando aprendieron a esperar tres segundos o más, los alumnos daban respuestas más largas, más razonadas y participaban más.", l: [
          "Un segundo no deja pensar a nadie.",
          "Tres a cinco segundos cambian la calidad de la respuesta.",
          "Funciona igual con adultos en juntas."] },
        { t: "Diferencias culturales con el silencio", d: "En algunas culturas, como la finlandesa o la japonesa, el silencio en una conversación es normal y respetuoso; en México solemos llenarlo rápido. En Alemania, las pausas para pensar antes de responder son comunes en el trabajo.", l: [
          "No interpretes el silencio como desinterés.",
          "En Alemania, una pausa antes de responder es señal de seriedad.",
          "Practicar aguantarlo te prepara para otras culturas."] },
        { t: "Qué hacer con la incomodidad", d: "La incomodidad del silencio es tuya. Puedes manejarla con algo físico: respira lento, toma un sorbo de agua, mantén una expresión de interés. Así el silencio se siente como espera, no como presión.", l: [
          "Respira mientras cuentas.",
          "Mantén la mirada amable, no fija.",
          "Si el silencio se alarga mucho, reformula la pregunta, no la contestes."] }] },
    "Franqueza radical: el feedback que sirve": { ic: "gem-stone",
      sesion: [[5, "Piensa en una observación que llevas tiempo callando por no incomodar."],
               [15, "Escribe primero por qué te importa esa persona y después la observación concreta; revisa que no caiga en empatía ruinosa ni en agresividad."],
               [5, "Agenda cuándo se la dirás, en privado y esta semana."]],
      sale: "Dijiste la observación que callabas, en privado, y la persona sabe que lo dijiste porque te importa.",
      subtemas: [
        { t: "Pedir feedback antes de darlo", d: "Kim Scott recomienda empezar pidiendo críticas sobre ti: demuestra que puedes recibirlas y construye la confianza para luego darlas. Su pregunta: «¿qué podría hacer o dejar de hacer para que te sea más fácil trabajar conmigo?».", l: [
          "Haz la pregunta y aguanta el silencio.",
          "Agradece la crítica aunque duela.",
          "Muestra que cambiaste algo con lo que te dijeron."] },
        { t: "El costo de callar", d: "La empatía ruinosa parece amable, pero deja a la persona sin la información que necesita para mejorar. Muchas veces se entera en la evaluación anual o cuando la despiden, y entonces es tarde.", l: [
          "Si te molesta algo tres veces, ya toca decirlo.",
          "Callar por cariño no es cariño.",
          "Pregúntate qué te gustaría saber a ti en su lugar."] },
        { t: "La retroalimentación inmediata", d: "Cuanto más cerca del hecho, más útil la retroalimentación: la persona recuerda el contexto y puede corregir pronto. Scott recomienda conversaciones de dos o tres minutos justo después, no esperar a la reunión formal.", l: [
          "Dos minutos justo después valen más que una hora al mes.",
          "Pequeño y frecuente, no grande y raro.",
          "Lo mismo con el elogio."] }] },
    "Cómo dar feedback sin que se cierre": { ic: "speech-balloon",
      sesion: [[5, "Elige una observación pendiente y escríbela con la estructura: permiso, hecho, efecto, pregunta, acuerdo."],
               [15, "Dala en una conversación privada; deja que la persona hable después de tu pregunta."],
               [5, "Anota el acuerdo que salió de su boca y la fecha para revisarlo."]],
      sale: "La persona propuso ella misma qué hará distinto y quedó una fecha para revisarlo.",
      copia: { t: "La observación en cinco pasos", l: [
        "¿Te puedo dar una observación sobre ______?",
        "Lo que vi: ______ (hecho concreto, sin «siempre» ni «eres»).",
        "Lo que provocó: ______.",
        "¿Cómo lo viste tú?",
        "¿Qué harías distinto la próxima vez? (y lo revisamos el ______)"] },
      subtemas: [
        { t: "El modelo SBI", d: "El Center for Creative Leadership propone el modelo Situación-Conducta-Impacto: en qué situación, qué conducta concreta y qué impacto tuvo. Es casi idéntico a la fórmula del paso y está probado en miles de líderes.", l: [
          "Situación: «en la junta del martes».",
          "Conducta: «interrumpiste dos veces a Ana».",
          "Impacto: «dejó de participar»."] },
        { t: "Por qué el sándwich falla", d: "El elogio-crítica-elogio se vuelve predecible: la gente aprende a esperar el golpe después de cada elogio y deja de creer los elogios. Además, el mensaje importante queda escondido en medio.", l: [
          "Separa los elogios de las críticas, en momentos distintos.",
          "Da más elogios que críticas, pero no los uses de anestesia.",
          "Di la crítica clara y con respeto."] },
        { t: "Cuando el otro se defiende", d: "Si la persona se pone a la defensiva, no insistas con más argumentos. Etiqueta («parece que esto te molestó») y pregunta qué ve que tú no. A veces hay contexto que no tenías.", l: [
          "No discutas los hechos; pregunta por su versión.",
          "Etiqueta la emoción.",
          "Si se cierra, propón seguir otro día."] }] },
    "Qué mueve de verdad a la gente": { ic: "rocket",
      sesion: [[5, "Elige a una persona de tu equipo o de tu familia con quien trabajas en algo."],
               [15, "Diseña cómo darle autonomía (el resultado, no el método), maestría (un reto un poco arriba de su nivel) y propósito (a quién ayuda su trabajo)."],
               [5, "Dile una de las tres esta semana."]],
      sale: "Le diste a alguien el resultado esperado sin dictar el método y le dijiste a quién ayuda su trabajo.",
      subtemas: [
        { t: "La teoría de la autodeterminación", d: "Edward Deci y Richard Ryan mostraron que la motivación duradera nace de tres necesidades: autonomía, competencia y relación. Daniel Pink tomó de ahí su autonomía, maestría y propósito.", l: [
          "Autonomía: que elija cómo.",
          "Competencia: que sienta que puede y que mejora.",
          "Relación: que se sienta parte de algo."] },
        { t: "El principio del progreso", d: "Teresa Amabile analizó casi 12,000 diarios de trabajo: el factor que más levantaba el ánimo en un día era avanzar en algo significativo, aunque fuera poco. Los retrocesos lo hundían con fuerza.", l: [
          "Haz visible el avance pequeño: lo terminado esta semana.",
          "Quita obstáculos antes de pedir más.",
          "Celebra los pasos, no solo la meta."] },
        { t: "El propósito visible", d: "Adam Grant encontró que los empleados de un centro de llamadas que recaudaba fondos para becas recaudaron mucho más después de conocer a un estudiante que había recibido una beca. Ver a quién ayudas cambia el esfuerzo.", l: [
          "Cuéntale a tu equipo quién usa lo que prueban.",
          "En ADAS: cada defecto encontrado es un accidente que no pasa.",
          "Comparte los mensajes de agradecimiento de clientes o usuarios."] }] },
    "Elogiar el esfuerzo, no el talento": { ic: "flexed-biceps",
      sesion: [[5, "Escribe tres elogios de talento que sueles decir («eres un crack», «qué inteligente»)."],
               [15, "Conviértelos en elogios de proceso, específicos y verdaderos, y usa uno hoy con alguien."],
               [5, "Anota la reacción de la persona."]],
      sale: "Diste un elogio específico sobre lo que alguien hizo y la persona supo exactamente qué repetir.",
      subtemas: [
        { t: "Elogiar el proceso, no solo el esfuerzo", d: "Dweck aclaró que no se trata de premiar el esfuerzo sin resultado, sino el proceso: la estrategia, la persistencia, el enfoque. Elogiar «te esforzaste» cuando la estrategia no sirvió no ayuda.", l: [
          "Elogia la estrategia que funcionó.",
          "Si no funcionó, pregunta qué otra estrategia podría probar.",
          "Evita elogiar esfuerzo vacío."] },
        { t: "El elogio específico", d: "Un elogio vale cuando dice qué se hizo bien y por qué importó. Es retroalimentación positiva: enseña tanto como la crítica.", l: [
          "Qué hizo: «pusiste los supuestos al inicio».",
          "Por qué importó: «el cliente entendió el riesgo en un minuto».",
          "Hazlo pronto."] },
        { t: "Contigo también", d: "La forma en que te hablas a ti mismo sigue la misma regla. Decirte «soy malo para el alemán» te empuja a evitar el reto; «todavía no domino el dativo, voy a practicarlo» te mantiene en él.", l: [
          "Cambia «soy malo para» por «todavía no domino».",
          "Celebra tu estrategia, no tu talento.",
          "Los errores son información, no veredicto."] }] },
    "Cuatro preguntas que abren a cualquiera": { ic: "key",
      sesion: [[5, "Copia las cuatro preguntas en una nota."],
               [20, "Úsalas en una conversación de al menos 15 minutos con alguien cercano: tu papá, un compañero o un amigo."],
               [5, "Anota la respuesta a la cuarta pregunta y pon un recordatorio para mencionarla en un mes."]],
      sale: "Hiciste las cuatro preguntas, escuchaste sin corregir y tienes agendado volver a mencionar su respuesta.",
      copia: { t: "Las cuatro preguntas", l: [
        "¿Qué parte de esto es la que más disfrutas?",
        "Si pudieras cambiar una cosa de cómo lo hacemos, ¿cuál sería?",
        "¿Qué necesitas de mí para que esto salga?",
        "¿Dónde te ves haciendo esto dentro de dos años?"] },
      subtemas: [
        { t: "Las entrevistas de permanencia", d: "Muchas empresas hacen entrevistas de salida cuando alguien ya se va. Beverly Kaye y Sharon Jordan-Evans proponen entrevistas de permanencia: preguntar a la gente qué la mantiene y qué la haría irse, antes de que pase.", l: [
          "Pregunta qué te haría quedarte y qué te haría irte.",
          "Hazlo en tiempos tranquilos, no en crisis.",
          "Actúa sobre al menos una cosa que te digan."] },
        { t: "La memoria convierte las preguntas en confianza", d: "Preguntar y luego recordar lo que te dijeron demuestra interés real. Olvidarlo demuestra que era protocolo. Por eso la cuarta pregunta exige un recordatorio.", l: [
          "Anota la respuesta ese mismo día.",
          "Vuelve a mencionarla en un mes.",
          "Si puedes ayudar a que pase, ayuda."] },
        { t: "Preguntas para tu entrevista", d: "Las mismas preguntas sirven al revés: en una entrevista de trabajo o con tu futuro jefe en Alemania. «¿Qué parte del trabajo disfruta más el equipo?» o «¿qué cambiarían de cómo trabajan?» te dicen cómo es de verdad el lugar.", l: [
          "Lleva dos preguntas preparadas a cada entrevista.",
          "Escucha si hablan de personas o solo de procesos.",
          "Las respuestas te dicen si vas a crecer ahí."] }] },
    "Cuando alguien no está rindiendo": { ic: "magnifying-glass-tilted-left",
      sesion: [[5, "Piensa en alguien cuyo desempeño te preocupa."],
               [15, "Clasifica la causa: ¿no sabe, no puede o no quiere? Escribe la evidencia de cada una y la pregunta que harías para confirmarlo."],
               [5, "Decide la acción según la causa: enseñar, quitar un obstáculo o conversar sobre motivación."]],
      sale: "Tienes la causa probable con evidencia y una acción que corresponde a esa causa, no a tu enojo.",
      subtemas: [
        { t: "El 94 % es del sistema", d: "W. Edwards Deming, el estadístico que ayudó a la industria japonesa, sostenía que la mayor parte de los problemas de calidad vienen del sistema (procesos, herramientas, información) y no de las personas. Culpar al individuo suele no arreglar nada.", l: [
          "Revisa el proceso antes de juzgar a la persona.",
          "Pregunta qué le estorba.",
          "Si varios fallan en lo mismo, el problema es el sistema."] },
        { t: "Las causas raíz", d: "Los cinco porqués, técnica de Toyota, piden preguntar por qué cinco veces seguidas para llegar a la causa raíz de un problema. Aplicado a una persona, descubre si el bajo rendimiento viene de un proceso, una herramienta o algo personal.", l: [
          "«¿Por qué se entregó tarde?» → «faltaba información».",
          "«¿Por qué faltaba?» → «nadie la pidió a tiempo»…",
          "Arregla la última causa, no la primera."] },
        { t: "Problemas personales", d: "A veces el bajo rendimiento viene de algo fuera del trabajo: salud, familia, dinero. Preguntar con respeto y sin invadir permite ofrecer flexibilidad o apoyo, y suele recuperar a la persona.", l: [
          "«He notado que esta semana te ha costado, ¿todo bien?».",
          "No exijas detalles.",
          "Ofrece algo concreto: un plazo, un cambio de tarea."] }] },
    "Aplícalo esta semana con tu papá": { ic: "older-person",
      sesion: [[5, "Prepara las cuatro preguntas y un reconocimiento sincero de algo que tu papá hace bien en su negocio."],
               [30, "Platica con él sobre el negocio: pregunta, escucha sin corregir y aguanta los silencios; si ves algo, pregúntalo en vez de afirmarlo."],
               [5, "Al final, dile en voz alta lo que hace bien. Anota qué mejora propuso él."]],
      sale: "Tu papá propuso él mismo al menos una mejora y escuchó de ti algo que hace bien.",
      subtemas: [
        { t: "Ayudar a la familia sin imponer", d: "Con la familia, los consejos se sienten como juicios más fácilmente, porque tocan la identidad y la historia compartida. Las preguntas respetan su autoridad y le dejan la decisión, que es lo que hace que la sostenga.", l: [
          "Pregunta como aprendiz, no como experto.",
          "Respeta su experiencia: lleva años en esto.",
          "Ofrece ayuda concreta solo si la pide."] },
        { t: "Negocios familiares y cambio", d: "Los negocios pequeños y familiares suelen resistirse al cambio porque cada cambio pone en duda decisiones pasadas. Proponer pruebas pequeñas y reversibles —una semana, un producto— baja esa resistencia.", l: [
          "Propón un experimento, no una transformación.",
          "Mide el resultado con él.",
          "Si funciona, que él lo extienda."] },
        { t: "El reconocimiento entre generaciones", d: "Muchos padres rara vez escuchan de sus hijos adultos qué hacen bien. Decirlo fortalece la relación y le da energía para intentar cosas nuevas. El efecto Pigmalión también funciona de hijos a padres.", l: [
          "Sé específico: qué hace bien y por qué lo admiras.",
          "Dilo sin un «pero» después.",
          "Repítelo de vez en cuando, no solo una vez."] }] },
    "Practicarlo esta semana": { ic: "spiral-calendar",
      sesion: [[5, "Pon en tu calendario el ejercicio de cada día."],
               [15, "Haz el de hoy y anota el resultado en tres líneas."],
               [5, "El fin de semana, busca tres evidencias que contradigan la etiqueta que le tienes a alguien."]],
      sale: "Hiciste los cinco ejercicios dentro de conversaciones reales y anotaste qué cambió.",
      copia: { t: "Tu semana", l: [
        "Lunes · hablé ___ % del tiempo en la junta de ______",
        "Martes · pregunta importante + siete segundos: dijo ______",
        "Miércoles · «¿y qué más?» tres veces con ______",
        "Jueves · elogio de proceso a ______: ______",
        "Viernes · observación con permiso a ______: el acuerdo fue ______",
        "Fin de semana · tres evidencias contra mi etiqueta de ______"] },
      subtemas: [
        { t: "Medir antes de cambiar", d: "El lunes solo se mide. Medir primero te da un punto de partida honesto y evita que cambies la conducta antes de saber cuál es. Es la lógica de cualquier mejora: sin línea base no sabes si mejoraste.", l: [
          "Mide sin juzgarte.",
          "Anota el número.",
          "Repite la medición en un mes."] },
        { t: "Un experimento por día", d: "Tratar cada ejercicio como un experimento —hipótesis, prueba, resultado— quita la presión de hacerlo perfecto y te deja aprender. Si algo no funciona con una persona, quizá funcione con otra.", l: [
          "Antes: ¿qué espero que pase?",
          "Después: ¿qué pasó?",
          "¿Qué ajusto para mañana?"] },
        { t: "La constancia sobre la intensidad", d: "BJ Fogg (<i>Tiny Habits</i>) sostiene que los hábitos se forman mejor empezando muy pequeño y anclándolos a una rutina existente. Un ejercicio dentro de una conversación que ya ibas a tener no te quita tiempo.", l: [
          "Ancla cada ejercicio a una junta o charla que ya existe.",
          "Hazlo tan pequeño que no puedas fallar.",
          "Celebra cuando lo hagas."] }] },
    "📚 Qué leer, en qué orden": { ic: "books" },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  leerpersonas: {
    "Primero la línea base, después la señal": { ic: "straight-ruler",
      sesion: [[5, "Elige a dos personas con las que hablarás hoy."],
               [15, "En los primeros minutos de charla trivial, anota mentalmente su línea base: postura, manos, mirada y velocidad al hablar."],
               [5, "Después, escribe la línea base de cada una y un cambio que notaste cuando el tema se puso serio."]],
      sale: "Tienes escrita la línea base de dos personas y un cambio concreto respecto a ella, sin sacar conclusiones de un gesto suelto.",
      subtemas: [
        { t: "Ruido y señal", d: "En estadística, la señal es la información y el ruido lo que la tapa. Un gesto aislado es casi siempre ruido: comezón, frío, cansancio. La línea base es lo que te permite separar uno de otro: sin ella todo parece señal.", l: [
          "Pregúntate: ¿esto lo hace siempre o solo ahora?",
          "Busca tres cambios en la misma dirección.",
          "Si no hay cambio, no hay lectura."] },
        { t: "Leer sin que se note", d: "Observar a alguien fijamente lo incomoda y cambia su conducta: el observador altera lo observado. La lectura buena es periférica y relajada, mientras sigues la conversación con naturalidad.", l: [
          "Mira a los ojos lo normal; el resto, con visión periférica.",
          "No comentes lo que ves.",
          "Lo que observas se anota después, no en el momento."] },
        { t: "La línea base cambia con el día", d: "La misma persona tiene líneas base distintas en la mañana y en la noche, con hambre o descansada, en casa o en una junta. Toma la línea base en el contexto donde vas a leer.", l: [
          "Compara a la persona con ella misma en la misma situación.",
          "Toma en cuenta cansancio, hambre y prisa.",
          "Actualiza la línea base si cambia el contexto."] }] },
    "De los pies a la cabeza: el cuerpo dice a dónde quiere ir": { ic: "foot",
      sesion: [[5, "Elige una junta, clase o reunión de hoy."],
               [15, "Durante cinco minutos mira solo pies y torsos: anota quién apunta hacia el centro y quién hacia la salida."],
               [5, "Compara tus notas con lo que cada uno dijo o hizo después."]],
      sale: "Detectaste a alguien que quería irse o que no estaba de acuerdo antes de que lo dijera.",
      subtemas: [
        { t: "La respuesta de congelar, huir o pelear", d: "Navarro explica que el sistema límbico reacciona al peligro con tres respuestas: congelarse, huir o pelear. En una junta se ven en versión pequeña: quedarse inmóvil, alejarse o girar el cuerpo, y la postura de confrontación.", l: [
          "Congelarse: deja de moverse cuando aparece un tema.",
          "Huir: se recarga atrás, gira los pies a la puerta.",
          "Pelear: se inclina con el ceño, invade espacio."] },
        { t: "La proxémica", d: "El antropólogo Edward T. Hall describió cuatro distancias: íntima (menos de 45 cm), personal (45 cm a 1.2 m), social (1.2 a 3.6 m) y pública. Cada cultura las ajusta; en Alemania la distancia personal suele ser mayor que en México.", l: [
          "Si alguien retrocede medio paso, estás muy cerca.",
          "En Alemania, deja un poco más de espacio al hablar.",
          "Acercarse sin permiso se siente como presión."] },
        { t: "Sentado también se lee", d: "En una mesa los pies no se ven, pero el torso y las piernas sí: piernas que se alejan, el cuerpo que se gira hacia la puerta o hacia una persona específica. La mesa misma se vuelve barrera cuando alguien se pega al respaldo.", l: [
          "Observa hacia dónde gira el torso al hablar cada persona.",
          "Recargarse de golpe en un tema es más informativo que la postura fija.",
          "Objetos que se acomodan entre dos personas son barrera."] }] },
    "Manos, cuello y ojos: comodidad o incomodidad": { ic: "raised-back-of-hand",
      sesion: [[5, "Repasa la lista de pacificadores: cuello, muslos, collar, cuello de la camisa, labios."],
               [15, "En una conversación de trabajo, nota qué tema hace aparecer un pacificador en tu interlocutor y en ti."],
               [5, "Anota el tema y el gesto; no saques conclusiones de culpa."]],
      sale: "Identificaste un tema que incomoda a alguien por sus pacificadores y lo anotaste como «algo lo movió», no como mentira.",
      subtemas: [
        { t: "El sistema nervioso autónomo", d: "Bajo estrés, el sistema simpático acelera el pulso, seca la boca, cambia la respiración y tensa músculos sin que lo decidamos. Por eso tragar saliva, humedecerse los labios o respirar rápido acompañan a la incomodidad.", l: [
          "Boca seca: tragar seguido, beber agua de más.",
          "Respiración alta y rápida en el pecho.",
          "Lo mismo te pasa a ti: es normal, no es culpa."] },
        { t: "Las manos que hablan", d: "Estudios sobre charlas TED encontraron que los oradores más vistos usaban más gestos con las manos. Las manos visibles y en movimiento coherente con lo que se dice transmiten confianza y claridad.", l: [
          "Mantén tus manos a la vista al hablar.",
          "Usa gestos que acompañen lo que dices: números, tamaños.",
          "Esconder las manos te hace ver inseguro."] },
        { t: "Leerte a ti mismo", d: "Los pacificadores que haces tú dicen cuándo estás incómodo, aunque no lo notes. Detectarlos te permite calmarte a tiempo: respirar, bajar los hombros, apoyar los pies.", l: [
          "Nota cuándo te tocas el cuello o la cara.",
          "Apoya los pies en el suelo y suelta los hombros.",
          "Una exhalación larga baja la tensión en segundos."] }] },
    "La cara: siete emociones que se ven igual en todo el mundo": { ic: "grinning-face-with-smiling-eyes",
      sesion: [[5, "Busca un video de entrevista o un fragmento de serie con primeros planos."],
               [15, "Míralo sin sonido y anota cada emoción que veas; distingue sonrisas de Duchenne y sociales."],
               [5, "Míralo con sonido y compara: ¿cuántas acertaste?"]],
      sale: "Acertaste al menos cuatro de cada siete emociones y distinguiste una sonrisa social de una real.",
      subtemas: [
        { t: "Las unidades de acción", d: "Ekman y Friesen crearon el FACS, un sistema que describe cada movimiento de la cara como unidad de acción. La sonrisa real combina la AU12 (comisuras arriba) con la AU6 (mejillas y patas de gallo). Sin la AU6, es cortesía.", l: [
          "Mira las mejillas: suben en la sonrisa real.",
          "Las patas de gallo aparecen solo con alegría verdadera.",
          "La sonrisa social se apaga de golpe."] },
        { t: "La universalidad tiene matices", d: "Investigaciones más recientes, como las de Lisa Feldman Barrett, muestran que las expresiones varían más entre culturas y personas de lo que Ekman creía, y que el contexto pesa mucho para interpretarlas. Úsalas como pistas, no como lectura exacta.", l: [
          "Una expresión sin contexto puede leerse mal.",
          "Hay gente con caras poco expresivas: no es frialdad.",
          "Pregunta antes de concluir."] },
        { t: "El desprecio en el trabajo", d: "El desprecio —una comisura que sube— comunica superioridad. En equipos de trabajo, igual que en parejas, es una señal de relación deteriorada. Si lo ves hacia ti, vale la pena hablarlo pronto y en privado.", l: [
          "Nota si aparece al hablar de una persona concreta.",
          "No respondas con lo mismo.",
          "Busca entender qué lo provocó."] }] },
    "La voz y las palabras: lo que se dice sin querer": { ic: "speaker-high-volume",
      sesion: [[5, "Elige una llamada o conversación por mensaje de hoy."],
               [15, "Fíjate en cambios de tono, velocidad, pausas, distancia en el lenguaje y si te hacen preguntas de vuelta."],
               [5, "Anota la parte de la conversación donde cambió la voz o el lenguaje."]],
      sale: "Detectaste en qué tema cambió la voz o el lenguaje de alguien y lo anotaste como alerta, no como veredicto.",
      subtemas: [
        { t: "Las palabras pequeñas", d: "James Pennebaker mostró en <i>The Secret Life of Pronouns</i> que las palabras funcionales —yo, nosotros, pero, aunque— dicen mucho del estado de alguien. Por ejemplo, las personas deprimidas usan más «yo»; quien tiene menos poder en una conversación también.", l: [
          "Mucho «nosotros» en una pareja o equipo suele indicar unión.",
          "Quien tiene más poder usa menos «yo».",
          "Un cambio brusco en pronombres merece atención."] },
        { t: "La prosodia", d: "La prosodia es la música del habla: ritmo, entonación, volumen, pausas. Transmite emoción incluso cuando las palabras son neutras. Un «está bien» con tono plano y pausa larga no dice lo mismo que uno rápido y ligero.", l: [
          "Escucha la música, no solo la letra.",
          "Las pausas antes de responder a algo sencillo son información.",
          "Compara con cómo suena esa persona normalmente."] },
        { t: "Leer mensajes escritos", d: "Por escrito se pierde la voz, pero quedan señales: cuánto tarda en responder comparado con su costumbre, la longitud, los signos y si pregunta de vuelta. Un cambio de patrón es la señal, igual que en persona.", l: [
          "Compara con su forma habitual de escribir.",
          "Respuestas cada vez más cortas y lentas indican distancia.",
          "No leas de más un mensaje: pregunta en persona."] }] },
    "Los rasgos: los Cinco Grandes, el único modelo que sí predice": { ic: "puzzle-piece",
      sesion: [[5, "Haz un test de los Cinco Grandes con base científica (por ejemplo, el IPIP-NEO de acceso libre)."],
               [15, "Lee tus resultados y escribe cómo se ve cada rasgo tuyo en tu trabajo y tus relaciones."],
               [5, "Estima los rasgos de dos personas cercanas y anota la evidencia de conducta de cada estimación."]],
      sale: "Conoces tu perfil de los Cinco Grandes y estimaste el de dos personas con conductas concretas, no con impresiones.",
      subtemas: [
        { t: "Lo que predicen los Cinco Grandes", d: "Los metaanálisis muestran que la Responsabilidad predice el desempeño laboral en casi cualquier puesto; la Estabilidad emocional, la satisfacción con la vida; la Amabilidad, la calidad de las relaciones. No determinan, pero inclinan.", l: [
          "Para contratar o elegir socio, mira la Responsabilidad.",
          "Para equipo de crisis, la Estabilidad emocional.",
          "Para servicio al cliente, la Amabilidad."] },
        { t: "Los rasgos cambian con la edad", d: "Estudios longitudinales muestran el principio de madurez: con los años la mayoría sube en Responsabilidad, Amabilidad y Estabilidad emocional. La personalidad es estable pero no fija, y se puede trabajar.", l: [
          "No etiquetes a alguien para siempre por cómo era hace diez años.",
          "Puedes subir tu Responsabilidad con hábitos y sistemas.",
          "Los cambios grandes de vida —como mudarte— también la mueven."] },
        { t: "Tratar a cada rasgo como le funciona", d: "Conocer el perfil del otro te deja ajustar cómo le hablas: al de alta Apertura, ideas nuevas; al de alta Responsabilidad, plan y fechas; al introvertido, tiempo para pensar; al muy amable, preguntas que le permitan decir que no.", l: [
          "A quien es muy amable, pregúntale qué le preocupa, no si está de acuerdo.",
          "Al introvertido, manda el tema antes de la junta.",
          "Al de baja Responsabilidad, acuerdos por escrito y recordatorios."] }] },
    "Lo que la gente repite es lo que es": { ic: "repeat-button",
      sesion: [[5, "Piensa en una persona nueva en tu vida: un compañero, un posible socio, alguien que estás conociendo."],
               [15, "Escribe lo que has visto de ella en las cinco pruebas: cómo trata al que no le sirve, cómo habla de los de antes, promesas chicas, éxito ajeno y presión."],
               [5, "Marca qué pruebas no has visto todavía: eso es lo que aún no sabes de esa persona."]],
      sale: "Tienes evidencia de conducta en al menos tres de las cinco pruebas y sabes qué te falta por ver.",
      subtemas: [
        { t: "La consistencia del carácter", d: "Walter Mischel encontró que la conducta varía mucho con la situación, pero de forma coherente: cada persona tiene su patrón «si pasa esto, hago aquello». Conocer a alguien es conocer sus patrones en distintas situaciones.", l: [
          "Observa a la misma persona en contextos distintos.",
          "Busca los «si… entonces…» que se repiten.",
          "Una sola situación no basta para conocer a alguien."] },
        { t: "La tríada oscura", d: "Los psicólogos Delroy Paulhus y Kevin Williams describieron tres rasgos que suelen ir juntos: narcisismo, maquiavelismo y psicopatía subclínica. Señales comunes: encanto superficial, uso de las personas, poca culpa y grandiosidad.", l: [
          "Encanto inicial muy alto y rápido merece cautela.",
          "Mira cómo habla de los que ya no le sirven.",
          "Si te hace dudar de tu propia memoria, aléjate."] },
        { t: "Promesas chicas, reputación grande", d: "La confianza se construye con muchas promesas pequeñas cumplidas. Stephen Covey lo llamaba la cuenta bancaria emocional: cada promesa cumplida es un depósito, cada una rota es un retiro. Aplica a los demás y a ti.", l: [
          "Anota quién cumple lo pequeño.",
          "Cumple tú lo pequeño: es lo que más se nota.",
          "Si no vas a poder, avisa antes, no después."] }] },
    "La actitud en una conversación: abierto, cerrado o resistiendo": { ic: "door",
      sesion: [[5, "Prepara una etiqueta para usar si alguien está resistiendo: «parece que algo de esto no te termina de convencer»."],
               [15, "En una propuesta o conversación de trabajo, clasifica minuto a minuto si el otro está abierto, cerrado o resistiendo; si resiste, usa la etiqueta."],
               [5, "Anota qué salió después de la etiqueta y qué siguiente paso concreto quedó."]],
      sale: "Detectaste una resistencia disfrazada de acuerdo y la etiqueta sacó a la luz la objeción real.",
      subtemas: [
        { t: "El modelo de la escalera del compromiso", d: "En ventas complejas se habla de microcompromisos: pequeñas acciones que muestran interés real —agendar otra reunión, presentar a otra persona, compartir datos—. Sin esos pasos, el interés es solo cortesía.", l: [
          "Pide un siguiente paso pequeño y concreto.",
          "Si no lo acepta, está cerrado o resistiendo.",
          "Un «sí» sin acción vale cero."] },
        { t: "El tiempo para volver", d: "Cuando alguien está cerrado, insistir lo cierra más. Retirarse con elegancia y volver en otro momento —con un dato nuevo o una pregunta mejor— suele dar mejores resultados.", l: [
          "«Lo dejamos aquí, ¿te escribo el jueves?».",
          "Vuelve con algo nuevo, no con lo mismo.",
          "Respeta el no del momento."] },
        { t: "Las objeciones son información", d: "Una objeción dicha es mejor que una callada: te dice qué falta para que funcione. Agradecerla y explorarla («¿qué tendría que pasar para que eso dejara de ser un problema?») convierte la resistencia en diseño conjunto.", l: [
          "Agradece la objeción.",
          "Pregunta qué la resolvería.",
          "Resume y confirma antes de responder."] }] },
    "Interés y desinterés: la lectura que más vas a usar": { ic: "eyes",
      sesion: [[5, "Repasa los racimos de interés y de desinterés."],
               [20, "En tres conversaciones del día, cuenta las señales de cada racimo; cuando veas dos de desinterés, cierra con elegancia."],
               [5, "Anota en cuál cerraste a tiempo y cómo reaccionó la otra persona."]],
      sale: "Cerraste al menos una conversación al ver dos señales de desinterés, antes de que la otra persona tuviera que inventar una excusa.",
      subtemas: [
        { t: "El eco postural", d: "Cuando dos personas están en sintonía, tienden a copiar su postura y sus gestos sin darse cuenta. Tanya Chartrand y John Bargh lo llamaron efecto camaleón. Si alguien te copia, hay conexión; si deja de hacerlo, algo cambió.", l: [
          "Nota si cruzan las piernas igual o toman café al mismo tiempo.",
          "No lo fuerces: copiar a propósito se nota.",
          "La pérdida del eco es una señal de distancia."] },
        { t: "La asimetría de la cortesía", d: "La mayoría de la gente educada no te dirá que se quiere ir: te dará señales. Por eso las de desinterés se respetan a la primera: esperar una señal verbal es esperar algo que casi nunca llega.", l: [
          "Dos señales de desinterés bastan.",
          "Cierra tú: «te dejo seguir, un gusto».",
          "La gente recuerda a quien no la retuvo."] },
        { t: "Interés en una entrevista", d: "En una entrevista de trabajo, las señales de interés del entrevistador —preguntas de seguimiento, que hable del futuro («cuando estés en el equipo…»), que alargue la entrevista— son buenas noticias. La prisa y las preguntas genéricas, no tanto.", l: [
          "Fíjate si te habla en futuro.",
          "Si te pregunta disponibilidad, hay interés real.",
          "No lo des por hecho: la decisión llega después."] }] },
    "Mentiras: lo que sí sirve y lo que es mito": { ic: "lying-face",
      sesion: [[5, "Repasa los mitos y lo que sí sirve: detalle, carga cognitiva y verificación."],
               [15, "En una conversación donde algo no te cuadre, pide detalles sensoriales y que te cuente una parte en otro orden; luego verifica un dato concreto."],
               [5, "Anota si verificaste algo y qué encontraste, sin acusar a nadie."]],
      sale: "Ante una duda, pediste detalle, verificaste un hecho y no acusaste a nadie por un gesto.",
      subtemas: [
        { t: "La entrevista cognitiva", d: "Ronald Fisher y Edward Geiselman desarrollaron la entrevista cognitiva para que los testigos recuerden más: reconstruir el contexto, contar todo aunque parezca irrelevante, cambiar el orden y la perspectiva. Ayuda a la verdad y complica la mentira.", l: [
          "«Cuéntame todo, aunque te parezca poco importante».",
          "«¿Qué pasó justo antes?».",
          "«¿Cómo lo habría visto otra persona en ese lugar?»."] },
        { t: "La técnica SUE", d: "La estrategia de uso de evidencia (Strategic Use of Evidence), de Pär Anders Granhag, consiste en no mostrar lo que sabes al principio: dejas que la persona cuente su versión y luego comparas con los datos. Los mentirosos suelen evitar o contradecir la evidencia.", l: [
          "No reveles lo que sabes al inicio.",
          "Deja que cuente su versión completa.",
          "Compara después con los datos."] },
        { t: "Las mentiras cotidianas", d: "Bella DePaulo encontró que la gente dice en promedio una o dos mentiras al día, casi todas pequeñas y sociales: «me encantó», «voy en camino». No son señal de mal carácter; detectarlas todas no sirve de nada.", l: [
          "No persigas las mentiras sociales.",
          "Concentra tu atención donde hay dinero, seguridad o compromiso.",
          "Ahí, verifica siempre."] }] },
    "Leer una sala en treinta segundos": { ic: "office-building",
      sesion: [[5, "Antes de tu próxima junta o evento, prepárate para observar treinta segundos antes de hablar."],
               [15, "Identifica a quién miran cuando alguien habla, quién está abierto y quién cerrado, y qué alianzas se ven."],
               [5, "Anota quién decide de verdad y si coincide con el puesto."]],
      sale: "Identificaste a quién mira la gente para decidir y le dirigiste tu argumento.",
      subtemas: [
        { t: "Calidez y competencia", d: "Susan Fiske, Amy Cuddy y Peter Glick encontraron que juzgamos a los demás en dos ejes: calidez (¿tiene buenas intenciones?) y competencia (¿puede actuar sobre ellas?). La calidez se evalúa primero y pesa más en la primera impresión.", l: [
          "Entra con calidez: sonrisa, nombre, interés.",
          "Demuestra competencia con datos, después.",
          "Demasiada competencia sin calidez genera desconfianza."] },
        { t: "El poder informal", d: "En muchos equipos hay personas sin cargo alto pero con mucha influencia: el experto técnico, el veterano, el que todos consultan. Identificarlas y ganarlas antes de una propuesta suele valer más que convencer al jefe solo.", l: [
          "Mira a quién consultan los demás en los pasillos.",
          "Habla con esa persona antes de la junta.",
          "Reconoce su experiencia en público."] },
        { t: "Culturas de trabajo distintas", d: "Erin Meyer (<i>The Culture Map</i>) muestra que las culturas difieren en cómo deciden y comunican. Alemania tiende a comunicación directa y explícita y decisiones por consenso estructurado; México, a comunicación más indirecta y jerárquica.", l: [
          "En Alemania, di las cosas claras y con datos.",
          "Allá un «no» directo no es agresión.",
          "Prepárate para discusiones largas antes de decidir."] }] },
    "Los sesgos que te hacen leer mal (los tuyos)": { ic: "face-with-monocle",
      sesion: [[5, "Piensa en un juicio reciente que hiciste de alguien."],
               [15, "Revísalo contra los sesgos: confirmación, halo, atribución y proyección; escribe una explicación alternativa para su conducta."],
               [5, "Decide qué dato necesitarías para confirmar o descartar tu juicio."]],
      sale: "Escribiste una explicación alternativa razonable para la conducta de alguien y sabes qué dato confirmaría tu juicio.",
      subtemas: [
        { t: "La ilusión de transparencia", d: "Thomas Gilovich mostró que sobreestimamos cuánto se notan nuestras emociones y, al revés, creemos leer a los demás mejor de lo que leemos. Pensamos que somos transparentes y que los otros también lo son.", l: [
          "Tu nerviosismo se nota menos de lo que crees.",
          "La emoción del otro también es menos legible de lo que crees.",
          "Pregunta en vez de suponer."] },
        { t: "El exceso de confianza", d: "En casi todas las habilidades, la mayoría se cree por encima del promedio. En leer personas es peor: la confianza en tu lectura casi no se relaciona con tu acierto real. Medir tu tasa de aciertos es la única forma de saber.", l: [
          "Anota tus lecturas y comprueba después.",
          "Cuenta aciertos y errores durante un mes.",
          "Ajusta tu confianza a tu tasa real."] },
        { t: "Pensar en probabilidades", d: "Annie Duke (<i>Thinking in Bets</i>) propone expresar los juicios como probabilidades: «creo con un 60 % que no está convencido». Así es más fácil cambiar de opinión cuando llega información nueva.", l: [
          "Pon un porcentaje a tus lecturas.",
          "Busca información que lo suba o lo baje.",
          "Nunca el 100 % por un gesto."] }] },
    "Aplicarlo donde ya estás: junta, entrevista, negociación, Didi": { ic: "oncoming-taxi",
      sesion: [[5, "Elige uno de los cinco escenarios que tengas esta semana."],
               [20, "Aplica la lectura del paso: línea base, cambios, interés o desinterés; ajusta lo que haces según lo que veas."],
               [5, "Anota qué cambiaste gracias a la lectura y qué resultado tuvo."]],
      sale: "Cambiaste algo a mitad de una situación real por lo que leíste, y el resultado mejoró.",
      subtemas: [
        { t: "La lectura en videollamada", d: "En videollamada solo ves cara y hombros, el audio tiene retraso y mirar a la cámara no es mirar a los ojos. Las señales cambian: mirar a otro lado, apagar la cámara, respuestas tardías o el tono plano informan más que el cuerpo.", l: [
          "Pide cámaras encendidas en conversaciones importantes.",
          "Observa la cara cuando presentes la cifra o la propuesta.",
          "Pregunta más, porque ves menos."] },
        { t: "La primera reacción a una cifra", d: "En negociación, la reacción de medio segundo al oír un número es la más honesta. Después viene la cara de póker. Por eso conviene decir la cifra y callar, mirando, en lugar de seguir justificándola.", l: [
          "Di la cifra con calma y calla.",
          "Mira la cara en ese medio segundo.",
          "No llenes el silencio con descuentos."] },
        { t: "Leer para servir mejor", d: "En el servicio —Didi, un negocio, tu equipo— leer a la persona sirve para darle lo que necesita: silencio, conversación, rapidez o explicación. Es empatía práctica y se traduce en calificaciones, propinas y clientes que regresan.", l: [
          "Saluda y deja que el pasajero marque el tono.",
          "Si va con prisa, ruta rápida y poca charla.",
          "Si conversa, pregunta y escucha."] }] },
    "Practicarlo esta semana": { ic: "spiral-calendar",
      sesion: [[5, "Pon en tu calendario el ejercicio de cada día."],
               [15, "Haz el de hoy y anota lo que observaste y si lo pudiste comprobar."],
               [5, "Lleva la cuenta de tus etiquetas acertadas: ese número es tu nivel real."]],
      sale: "Hiciste los ejercicios de la semana y tienes una tasa de aciertos anotada.",
      copia: { t: "Tu registro de lecturas", l: [
        "Fecha | Persona | Línea base | Lo que vi | Mi lectura (%) | Comprobé | ¿Acerté?",
        " | | | | | |",
        "Aciertos este mes: ___ de ___"] },
      subtemas: [
        { t: "La retroalimentación lo es todo", d: "Las habilidades de juicio mejoran solo si recibes retroalimentación rápida y clara sobre tus aciertos. Sin comprobar tus lecturas, puedes practicar años y seguir igual. Por eso cada ejercicio termina en una comprobación.", l: [
          "Siempre que puedas, comprueba tu lectura.",
          "Anota los errores con el mismo cuidado que los aciertos.",
          "Revisa el registro cada semana."] },
        { t: "Observar en silencio", d: "Esta habilidad se entrena sin confrontar: solo mirando y anotando. Confrontar a alguien con tu lectura («te noto nervioso») suele ponerlo a la defensiva y arruina la observación.", l: [
          "Observa y anota; no comentes.",
          "Si preguntas, que sea con una etiqueta suave.",
          "La lectura sirve para ajustar lo que haces tú."] },
        { t: "Ver películas como entrenamiento", d: "Las series y películas con buenas actuaciones son un gimnasio barato: puedes pausar, repetir y comprobar. Mirarlas sin sonido obliga a leer cara y cuerpo.", l: [
          "Dos minutos sin sonido, adivina, comprueba con sonido.",
          "Elige escenas de negociación o de pareja.",
          "Hazlo en alemán y entrenas el idioma también."] }] },
    "📚 Qué leer, en qué orden": { ic: "books" },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  leermujeres: {
    "Antes de todo: no es un código, es una persona": { ic: "person",
      sesion: [[5, "Escribe en tres líneas las tres bases de Manson aplicadas a ti hoy: qué vida tienes, qué te cuesta decir y dónde usas indirectas."],
               [15, "Elige una cosa de tu vida que harías aunque nadie la viera y una conversación pendiente donde vas a decir lo que quieres sin rodeos."],
               [5, "Escribe la regla del consentimiento con tus palabras: qué es un sí claro y qué no lo es."]],
      sale: "Tienes por escrito una acción honesta pendiente y sabes distinguir un sí claro de un «puede ser».",
      subtemas: [
        { t: "Las diferencias son de grado, no de especie", d: "Además de Hyde, Bobbi Carothers y Harry Reis analizaron decenas de rasgos y encontraron que hombres y mujeres casi nunca forman grupos separados: las distribuciones se traslapan casi por completo. Conocer a una mujer es conocer a esa mujer.", l: [
          "Las generalizaciones fallan con la persona concreta.",
          "Pregunta y observa en lugar de suponer.",
          "Lo que te sirve es su línea base, no un promedio."] },
        { t: "La no necesidad", d: "Manson llama no necesidad a estar más interesado en tu vida que en la aprobación de los demás. No es indiferencia: es que tu valor no depende de que te digan que sí. Paradójicamente, es lo que más tranquilidad transmite.", l: [
          "Ten metas y planes que no dependan de una pareja.",
          "Un no no cambia quién eres.",
          "Invita sin presionar: la decisión es de ella."] },
        { t: "Consentimiento, todo el tiempo", d: "El consentimiento no es un trámite inicial: se puede retirar en cualquier momento y se lee a lo largo de toda la interacción. Un sí entusiasta se nota en palabras y en cuerpo; la duda, el silencio o la rigidez son un alto.", l: [
          "Pregunta con naturalidad: «¿te late?», «¿estás bien?».",
          "Si duda, para; si dice que no, para sin reclamos.",
          "El alcohol nubla el consentimiento: ante la duda, no."] }] },
    "Cómo saber si le interesas: las señales, en racimo": { ic: "eyes",
      sesion: [[5, "Repasa las cinco familias de señales: mirada, cuerpo, autoatención, contacto y conversación."],
               [20, "En un evento o reunión, observa sin acercarte cómo las personas muestran interés entre sí; anota racimos, no señales sueltas."],
               [5, "Escribe la pregunta que te protege del error: ¿se comportaría igual con cualquier otro?"]],
      sale: "Viste racimos de interés entre otras personas y sabes distinguirlos de la simple amabilidad.",
      subtemas: [
        { t: "El sesgo de sobrepercepción", d: "Martie Haselton y David Buss estudiaron que muchos hombres tienden a sobreestimar el interés sexual de las mujeres: leen amabilidad como atracción. Es un sesgo conocido, así que conviene corregirlo a propósito.", l: [
          "Si dudas, probablemente es amabilidad.",
          "Busca racimos y que se repitan en distintos momentos.",
          "Ante la duda, pregunta con respeto, no supongas."] },
        { t: "Quién inicia en realidad", d: "Monica Moore encontró que en muchas interacciones la mujer señala interés primero, de forma sutil, y el hombre se acerca después. Leer esas señales te evita acercarte a quien no quiere y te anima con quien sí.", l: [
          "Una mirada que vuelve con sonrisa es invitación a saludar.",
          "Si no hay señales, el acercamiento debe ser aún más ligero.",
          "La señal te invita a saludar, no a nada más."] },
        { t: "El interés crece o se apaga", d: "El interés real tiende a aumentar con el tiempo de conversación: más preguntas, más cercanía, más risa. La cortesía se mantiene plana o baja. Observa la tendencia, no el momento.", l: [
          "¿Pregunta más ahora que al principio?",
          "¿Se acerca o se aleja con los minutos?",
          "¿Propone ella algo para después?"] }] },
    "Las señales de que no — y cómo aceptarlas bien": { ic: "waving-hand",
      sesion: [[5, "Escribe tres respuestas cortas y amables para retirarte ante un no suave."],
               [15, "Repasa una situación pasada donde insististe después de un no suave y escribe cómo la habrías cerrado bien."],
               [5, "Guarda tus tres frases en el celular para tenerlas a mano."]],
      sale: "Tienes tres frases de salida listas y sabes reconocer un no suave sin pedir explicación.",
      copia: { t: "Salir con gracia", l: [
        "«Va, sin problema. Un gusto platicar contigo.»",
        "«Entiendo. Si un día se te antoja, me dices.»",
        "«Que te vaya muy bien. Disfruta tu noche.»"] },
      subtemas: [
        { t: "Por qué el no indirecto", d: "Encuestas y estudios sobre acoso muestran que muchas mujeres han recibido reacciones hostiles al rechazar directamente a un desconocido. El no suave es una forma de protegerse. Respetarlo a la primera es lo que te vuelve alguien seguro.", l: [
          "No exijas un no directo.",
          "Nunca preguntes «¿por qué no?».",
          "Tu reacción al no dice más de ti que cualquier conversación."] },
        { t: "El rechazo duele, y se procesa", d: "Estudios de Naomi Eisenberger encontraron que el rechazo social activa áreas cerebrales parecidas a las del dolor físico. Es normal que duela; lo que importa es cómo lo procesas: sin culpar a la otra persona ni a ti.", l: [
          "Nombra lo que sientes: «me dolió».",
          "Haz algo físico: caminar, entrenar.",
          "Recuerda que es información, no un juicio sobre tu valor."] },
        { t: "La exposición al rechazo", d: "Jia Jiang hizo 100 días de pedir cosas absurdas para acostumbrarse al no. La exposición repetida a pequeños rechazos baja el miedo y la reacción. El no se vuelve un dato más.", l: [
          "Pide cosas pequeñas donde el no no cuesta nada.",
          "Cuenta tus noes: muestran que lo estás intentando.",
          "Cada no bien recibido te hace más seguro."] }] },
    "Acercarte a alguien que no conoces sin ser el pesado": { ic: "speech-balloon",
      sesion: [[5, "Elige un lugar donde acercarse es natural: una clase, un evento, una fila."],
               [10, "Si hay señal de interés y contexto adecuado, saluda con una frase verdadera y corta, y lee los primeros treinta segundos."],
               [5, "Sea cual sea la respuesta, cierra tú: con tu número si fue bien, con una despedida amable si no."]],
      sale: "Te acercaste con algo verdadero, leíste la respuesta y cerraste tú en menos de cinco minutos.",
      subtemas: [
        { t: "El contexto manda", d: "Un mismo saludo es agradable en una fiesta y molesto en el transporte o en el gym. Los lugares donde la gente va a socializar —eventos, clases, reuniones— reducen la sensación de invasión y aumentan la de encuentro.", l: [
          "Prioriza lugares donde se va a conocer gente.",
          "Evita acercarte a alguien que no puede irse fácilmente.",
          "Si está trabajando, no."] },
        { t: "El miedo es normal y baja con práctica", d: "La ansiedad de acercamiento es una forma de ansiedad social y responde a la exposición gradual: pequeñas interacciones sociales repetidas con desconocidos —preguntar algo, saludar— bajan la ansiedad antes de cualquier intención romántica.", l: [
          "Practica conversaciones cortas con cualquiera: meseros, gente en filas.",
          "No esperes a no tener miedo: actúa con él.",
          "Cada interacción corta suma."] },
        { t: "La conversación de cinco minutos", d: "Un primer encuentro breve deja una buena impresión y le da a ella el control de seguir o no. Ofrecer tu número en vez de pedir el suyo le deja la decisión sin presión.", l: [
          "Cinco minutos y cierra.",
          "Ofrece tu contacto: «si quieres seguir la plática, este es mi número».",
          "Si te escribe, ahí empieza."] }] },
    "La primera cita: leer si quiere una segunda, y qué hacer": { ic: "hot-beverage",
      sesion: [[5, "Antes de la cita, escribe las preguntas de Ury: ¿cómo me sentí conmigo?, ¿me reí?, ¿me dio curiosidad?, ¿me sentí escuchado?"],
               [10, "Después de la cita, contéstalas con honestidad y anota las señales que viste de interés o desinterés."],
               [5, "Si fue bien, pide la segunda cita concreta; si no, cierra con amabilidad y sin insistir."]],
      sale: "Decidiste sobre la segunda cita con las preguntas de Ury y las señales, no solo con la chispa.",
      subtemas: [
        { t: "La chispa engaña", d: "Ury explica que la chispa a menudo es ansiedad o novedad, y aparece igual con personas que no nos convienen. Las relaciones que duran suelen empezar con un interés creciente —un «slow burn»— más que con fuegos artificiales.", l: [
          "Dale una segunda oportunidad a una buena cita sin chispa.",
          "Desconfía de la chispa con alguien que no te pregunta nada.",
          "El interés que crece vale más que el que explota."] },
        { t: "Maximizadores y conformistas", d: "Barry Schwartz distinguió a los maximizadores, que buscan la opción perfecta, de los que se conforman con lo suficientemente bueno. Los maximizadores suelen decidir peor y ser menos felices con su elección. En el amor pasa lo mismo.", l: [
          "No busques a la persona perfecta: busca a la buena para ti.",
          "Define tus tres valores no negociables.",
          "Lo demás, con flexibilidad."] },
        { t: "Hablar de cosas reales", d: "Investigaciones sobre la profundidad de la conversación (Kardas, Kumar y Epley) encontraron que la gente disfruta más las conversaciones profundas de lo que espera, incluso con desconocidos. En una cita, ir más allá del trabajo y el clima acerca.", l: [
          "Pregunta por lo que la emociona, no solo por lo que hace.",
          "Comparte algo verdadero de ti.",
          "No conviertas la cita en entrevista: alterna."] }] },
    "Cuando te cuenta un problema: escuchar o resolver": { ic: "ear",
      sesion: [[5, "Escribe la pregunta y tenla presente: «¿quieres que te ayude a resolverlo o que te escuche?»."],
               [15, "La próxima vez que alguien cercano te cuente un problema, pregúntala y haz exactamente lo que te diga, aunque veas la solución."],
               [5, "Anota cómo terminó la conversación y qué te costó."]],
      sale: "Hiciste la pregunta, respetaste la respuesta y la conversación terminó con la persona más tranquila.",
      subtemas: [
        { t: "Validar no es estar de acuerdo", d: "Validar es reconocer que la emoción del otro tiene sentido desde su punto de vista. Marsha Linehan lo usa en terapia dialéctica conductual como herramienta central. Puedes validar sin estar de acuerdo con lo que hizo o con su interpretación.", l: [
          "«Tiene sentido que te sientas así».",
          "Refleja la emoción antes de cualquier opinión.",
          "La validación calma; la corrección enciende."] },
        { t: "La co-regulación", d: "Las personas regulan sus emociones también a través de otras: una voz tranquila, presencia y contacto ayudan a bajar la activación del otro. Por eso a veces escuchar en calma ayuda más que cualquier solución.", l: [
          "Habla más despacio y más bajo.",
          "Presencia física: sentarse al lado, no enfrente.",
          "Tu calma es contagiosa."] },
        { t: "Cuando sí quiere soluciones", d: "Si la respuesta es «ayúdame a resolverlo», ofrece opciones en lugar de órdenes y deja que ella elija. Las soluciones que uno elige se sostienen; las impuestas generan resistencia.", l: [
          "«Se me ocurren dos opciones, ¿cuál te late más?».",
          "Pregunta qué ya intentó.",
          "Ofrece ayuda concreta, no solo ideas."] }] },
    "Cuando dice \"estoy bien\" y no está bien": { ic: "pensive-face",
      sesion: [[5, "Escribe la frase de apertura suave que usarás: «Te siento callada. No tienes que contarme ahora, pero aquí estoy cuando quieras»."],
               [15, "La próxima vez que veas a alguien cercano con señales de no estar bien, dila y quédate cerca haciendo algo a su lado."],
               [5, "Al día siguiente, vuelve con un «¿cómo amaneciste?»."]],
      sale: "Abriste la puerta sin presionar, te quedaste cerca y al día siguiente volviste a preguntar.",
      subtemas: [
        { t: "Las ofertas que no se dicen", d: "Muchas veces la emoción se expresa con conducta, no con palabras: hacer ruido al acomodar, suspirar, responder seco. Son intentos de que lo notes sin tener que pedirlo. Notarlo y nombrarlo con suavidad es responder a esa oferta.", l: [
          "Lee el cambio respecto a su línea base.",
          "Nómbralo sin acusar.",
          "No exijas que lo explique en ese momento."] },
        { t: "La presencia sin presión", d: "Estar disponible sin interrogar —hacer algo al lado, ofrecer comida o compañía— le da a la persona control sobre cuándo hablar. Muchas conversaciones importantes salen así, de lado, no cara a cara.", l: [
          "Cocinar, caminar o manejar juntos facilita hablar.",
          "Ofrece algo concreto: un té, una cena, un paseo.",
          "No llenes el silencio con preguntas."] },
        { t: "Cuando el problema eres tú", d: "Si la molestia es contigo, la primera respuesta decide el resto. Escuchar completo, reconocer tu parte y luego, si hace falta, explicar, evita que la conversación se convierta en defensa y contraataque.", l: [
          "Primero escucha todo, sin interrumpir.",
          "«Tienes razón en que…» antes de cualquier explicación.",
          "Pregunta qué necesita para que no se repita."] }] },
    "Cuando se molesta contigo: los cuatro jinetes y sus antídotos": { ic: "horse",
      sesion: [[5, "Escribe los cuatro jinetes y su antídoto en una tarjeta."],
               [15, "Revisa tu última discusión con alguien cercano y marca qué jinetes usaste tú; reescribe esa conversación con los antídotos."],
               [5, "Acuerda contigo una frase de pausa para cuando te inundes: «dame veinte minutos y regreso»."]],
      sale: "Identificaste tus jinetes en una discusión real y tienes lista tu frase de pausa con hora de regreso.",
      copia: { t: "Los antídotos, a la mano", l: [
        "Crítica → queja específica: «cuando ______, me sentí ______; ¿podrías ______?»",
        "Defensa → aceptar mi parte: «tienes razón en que ______».",
        "Desprecio → aprecio: decir algo que valoro de ella cada día.",
        "Muro de piedra → pausa: «estoy muy alterado; dame 20 minutos y regreso a las ______»."] },
      subtemas: [
        { t: "La inundación fisiológica", d: "Gottman midió que cuando el pulso pasa de unos 100 latidos por minuto en una discusión, la capacidad de escuchar y razonar cae: el cuerpo entra en modo de amenaza. Por eso la pausa de al menos veinte minutos funciona: es lo que tarda el cuerpo en calmarse.", l: [
          "Nota tus señales: calor, pulso, mandíbula tensa.",
          "Durante la pausa, no rumies la pelea: haz algo que te calme.",
          "Regresa a la hora acordada."] },
        { t: "El arranque suave", d: "Gottman encontró que la forma en que empieza una discusión predice cómo termina en la gran mayoría de los casos. Un arranque suave —queja sin culpa, «yo» en vez de «tú», una petición positiva— cambia el resto.", l: [
          "Empieza con «yo me sentí…», no «tú siempre…».",
          "Describe la situación, no el carácter.",
          "Termina con lo que sí quieres."] },
        { t: "Los problemas perpetuos", d: "Gottman encontró que cerca de dos tercios de los conflictos de pareja son perpetuos: vienen de diferencias de personalidad o de valores y no se resuelven, se manejan. Las parejas felices aprenden a dialogar sobre ellos con humor y aceptación.", l: [
          "No todo conflicto tiene solución definitiva.",
          "Busca entender el sueño o valor detrás de su postura.",
          "Acuerden convivir con la diferencia sin desprecio."] }] },
    "Cuando se enfría de repente": { ic: "snowflake",
      sesion: [[5, "Escribe el mensaje honesto de una sola vez: «Te siento más lejos estos días. Si algo cambió prefiero saberlo, sin problema.»"],
               [15, "Si estás en esa situación, mándalo y suelta el celular; si no, escribe qué harías con tu semana en lugar de perseguir."],
               [5, "Planea tres actividades tuyas para los próximos días que no dependan de ella."]],
      sale: "Mandaste un solo mensaje honesto (o lo tienes listo) y tu semana está llena de cosas tuyas.",
      subtemas: [
        { t: "La conducta de protesta", d: "Levine describe las conductas de protesta del estilo ansioso: escribir de más, llevar la cuenta, hacer sentir celos, amenazar con irse. Buscan cercanía pero suelen alejar más. Reconocer el impulso es el primer paso para no actuar sobre él.", l: [
          "Antes de mandar un segundo mensaje, espera una hora.",
          "Escribe lo que sientes en una nota, no a ella.",
          "Llama a un amigo en vez de escribirle."] },
        { t: "El costo de la incertidumbre", d: "La incertidumbre activa más ansiedad que una mala noticia segura: un estudio de Archy de Berker y colegas encontró que la gente se estresaba más cuando no sabía si recibiría una descarga que cuando sabía que sí. Por eso conviene pedir claridad una vez.", l: [
          "Pide claridad con un mensaje, no con muchos.",
          "Acepta cualquier respuesta como información.",
          "El silencio también es una respuesta."] },
        { t: "Tu vida como ancla", d: "Tener metas, amigos, entrenamiento y estudio te da estabilidad cuando una relación se tambalea. No es estrategia para atraer: es lo que te permite decidir con calma en vez de desesperación.", l: [
          "Mantén tus rutinas aunque estés triste.",
          "Pasa tiempo con gente que te quiere.",
          "Tu proyecto de Alemania sigue: no lo pongas en pausa por esto."] }] },
    "Cuando te pica, te vacila o te pone a prueba": { ic: "winking-face",
      sesion: [[5, "Escribe tres comentarios burlones que te han dicho y cómo reaccionaste."],
               [15, "Reescribe tus respuestas con ligereza y sin defenderte; luego distingue cuáles eran juego y cuáles desprecio."],
               [5, "Decide qué harás si es desprecio: nombrarlo una vez y no seguir el juego."]],
      sale: "Sabes distinguir el vacile del desprecio y tienes respuestas ligeras que no te ponen a la defensiva.",
      subtemas: [
        { t: "El humor como señal", d: "Estudios sobre el humor en las relaciones encuentran que reírse juntos y compartir el mismo sentido del humor se asocia con mayor satisfacción. El vacile ligero es una forma de crear complicidad, siempre que los dos se rían.", l: [
          "Si los dos se ríen, es juego.",
          "Si uno se queda serio, se acabó el juego.",
          "No te burles de lo que no se puede cambiar."] },
        { t: "La seguridad no se actúa", d: "La confianza real se nota en la ausencia de defensa: no necesitas ganar cada intercambio. Responder con calma y humor a una provocación comunica que tu valor no depende de lo que el otro diga.", l: [
          "No expliques ni te justifiques ante un vacile.",
          "Ríete de ti mismo cuando sea natural.",
          "Si no se te ocurre nada ingenioso, sonríe y sigue."] },
        { t: "Cuando el vacile esconde desprecio", d: "Las bromas constantes a costa tuya delante de otros pueden ser desprecio disfrazado. La señal: te deja mal, no a los dos, y se repite. Nómbralo una vez en privado; si sigue, es un patrón.", l: [
          "«Esa broma delante de tus amigas no me gustó».",
          "Observa si cambia o si te dice exagerado.",
          "El desprecio repetido es señal de alarma, no de coqueteo."] }] },
    "El apego: por qué reacciona así (y por qué tú también)": { ic: "anchor",
      sesion: [[5, "Haz el test de estilos de apego del libro de Levine o una versión en línea basada en la escala ECR."],
               [15, "Escribe tu resultado, tu última conducta de protesta o de alejamiento, y qué harías distinto hoy."],
               [5, "Elige una práctica para esta semana: tolerar la incertidumbre o quedarte un poco más."]],
      sale: "Conoces tu estilo, nombraste tu última conducta de protesta o alejamiento y tienes una práctica concreta.",
      subtemas: [
        { t: "De dónde viene la teoría", d: "John Bowlby desarrolló la teoría del apego al estudiar a niños separados de sus padres, y Mary Ainsworth la midió con la situación extraña. Cindy Hazan y Phillip Shaver la llevaron a las relaciones adultas en 1987.", l: [
          "El apego se forma en la infancia pero no es destino.",
          "Las relaciones seguras en la adultez pueden cambiarlo.",
          "Es una tendencia, no un diagnóstico."] },
        { t: "El apego seguro ganado", d: "La investigación habla de seguridad ganada: personas con historias difíciles que, gracias a relaciones sanas o terapia, desarrollan un estilo seguro. Elegir una pareja segura y trabajar en ti ayuda a moverte en esa dirección.", l: [
          "Busca y valora a la gente segura.",
          "La terapia es una herramienta, no una debilidad.",
          "Observa tus patrones sin juzgarte."] },
        { t: "Comunicación eficaz", d: "Levine propone la comunicación eficaz: decir tus necesidades de forma clara y sin culpa, y ver cómo responde la otra persona. Una pareja segura responde con interés; una que se burla o se aleja te está dando información.", l: [
          "«Me ayuda mucho que me avises si vas a llegar tarde».",
          "Dilo una vez, sin reproche.",
          "Su respuesta te dice si puede darte lo que necesitas."] }] },
    "Lo cotidiano: los gestos pequeños que sostienen todo": { ic: "two-hearts",
      sesion: [[5, "Repasa qué es una oferta de conexión: cualquier comentario que espera reacción."],
               [15, "Hoy, con tu familia o personas cercanas, cuenta las ofertas que te hacen y responde a todas volteando, con una pregunta o un comentario."],
               [5, "Anota cuántas recibiste y cuántas respondiste."]],
      sale: "Respondiste volteando hacia el otro a la gran mayoría de las ofertas del día.",
      subtemas: [
        { t: "Voltear hacia, voltear en contra, voltear lejos", d: "Gottman clasifica las respuestas a una oferta: voltear hacia (responder con interés), voltear lejos (ignorar) y voltear en contra (responder con hostilidad). Ignorar parece neutro, pero con el tiempo daña casi tanto como la hostilidad.", l: [
          "Voltear hacia puede ser un simple «¿a ver?».",
          "Ignorar repetidamente apaga las ofertas.",
          "Si no puedes atender, dilo: «déjame terminar esto y te escucho»."] },
        { t: "Los mapas del amor", d: "Gottman llama mapas del amor al conocimiento detallado del mundo del otro: sus preocupaciones, sueños, amigos, rutinas. Las parejas con mapas detallados manejan mejor los momentos difíciles.", l: [
          "Pregunta por su semana, sus metas, sus miedos.",
          "Actualiza: la gente cambia.",
          "Recuerda nombres de sus amigos y compañeros."] },
        { t: "Los rituales de conexión", d: "Pequeños rituales —el café de la mañana, la caminata del domingo, el mensaje al llegar— crean estabilidad. William Doherty los describe como la forma de proteger la relación de la rutina y las prisas.", l: [
          "Crea un ritual diario pequeño.",
          "Uno semanal más largo.",
          "Protégelos del celular."] }] },
    "Señales de alarma que no debes leer como \"intensidad\"": { ic: "police-car-light",
      sesion: [[5, "Lee la lista de señales de alarma y marca las que has visto en relaciones pasadas, en ella o en ti."],
               [15, "Escribe qué harías hoy distinto: cómo nombrarlo una vez y qué observarías después."],
               [5, "Si reconociste alguna en ti, escribe la conducta concreta que vas a dejar de hacer."]],
      sale: "Puedes nombrar las señales de alarma, sabes cómo nombrarlas una vez y reconociste las tuyas.",
      subtemas: [
        { t: "El bombardeo de amor", d: "El love bombing es una fase de atención, regalos y declaraciones intensas muy al inicio, que después se convierte en control o frialdad. Se asocia a personalidades narcisistas. La intensidad excesiva y rápida merece cautela, no celebración.", l: [
          "Declaraciones de amor en la primera semana: cautela.",
          "Prisa por compromisos grandes: frena.",
          "Observa cómo reacciona cuando pones un límite."] },
        { t: "Los celos no son prueba de amor", d: "La investigación sobre violencia en el noviazgo identifica el control —revisar el celular, aislar de amigos, celos constantes— como predictor de relaciones abusivas. Lo que se siente como pasión al principio es una señal de riesgo.", l: [
          "Nadie que te quiere te aísla de tu gente.",
          "Las contraseñas propias son privacidad, no traición.",
          "Si sientes miedo de su reacción, busca ayuda."] },
        { t: "Ayuda en México", d: "Si tú o alguien que conoces vive violencia en una relación, hay apoyo. En CDMX, Línea Mujeres de LOCATEL atiende las 24 horas en el 55 5658 1111 y el 911 para emergencias. También hay apoyo psicológico para hombres que quieren cambiar conductas de control.", l: [
          "En emergencia: 911.",
          "Línea Mujeres CDMX: 55 5658 1111.",
          "Si reconoces control en ti, la terapia funciona."] }] },
    "Practicarlo esta semana": { ic: "spiral-calendar",
      sesion: [[5, "Pon en tu calendario el ejercicio de cada día."],
               [15, "Haz el de hoy con las personas que ya están en tu vida y anota qué pasó."],
               [5, "El fin de semana, haz la observación de una pareja durante cinco minutos y anota ofertas, respuestas y desprecio."]],
      sale: "Hiciste los ejercicios con mujeres de tu vida diaria —sin buscar ligar— y anotaste lo que aprendiste.",
      copia: { t: "Tu semana", l: [
        "Lunes · preguntas: ella ___ / yo ___",
        "Martes · «¿resolver o escuchar?» con ______: pidió ______",
        "Miércoles · tres ofertas respondidas: ______",
        "Jueves · mi estilo de apego: ______ · última protesta: ______",
        "Viernes · invitación concreta o salida elegante: ______",
        "Fin de semana · pareja observada: ofertas ___, respuestas ___, desprecio sí/no"] },
      subtemas: [
        { t: "Aprender sin presión", d: "Practicar con amigas, compañeras y familia quita la presión romántica y te deja observar con calma. Las habilidades de escucha y lectura son las mismas; solo cambia lo que está en juego.", l: [
          "Practica la escucha con tu mamá o una amiga.",
          "Observa cómo responden cuando preguntas en vez de resolver.",
          "Lo que funcione ahí, funcionará en pareja."] },
        { t: "Observar parejas como un científico", d: "Gottman aprendió observando parejas reales en su laboratorio. Observar con respeto —sin juzgar ni comentar— cómo interactúan otras parejas te entrena a ver patrones que en tu propia relación son difíciles de notar.", l: [
          "Cuenta ofertas y respuestas en cinco minutos.",
          "Fíjate en el tono, no solo en las palabras.",
          "No juzgues: solo observa patrones."] },
        { t: "Reflexionar por escrito", d: "James Pennebaker encontró que escribir sobre experiencias emocionales ayuda a ordenarlas y mejora el bienestar. Escribir sobre tus relaciones —qué pasó, qué sentiste, qué aprendiste— acelera el aprendizaje.", l: [
          "Diez minutos de escritura libre a la semana.",
          "Qué pasó, qué sentí, qué haría distinto.",
          "Léelo un mes después: verás tu avance."] }] },
    "📚 Qué leer, en qué orden": { ic: "books" },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  caracter: {
    "Tímido no es lo mismo que sin carácter": { ic: "lion",
      sesion: [[5, "Escribe en dos columnas qué parte de ti es introversión (energía) y qué parte es timidez (miedo al juicio)."],
               [15, "Elige un acto pequeño de valor para hoy —hablar primero, pedir algo, dar tu opinión— y hazlo aunque tiembles."],
               [5, "Anota cómo te sentiste antes y después, del 0 al 10."]],
      sale: "Hiciste un acto pequeño de valor sin esperar a sentirte seguro, y la ansiedad de después fue menor que la de antes.",
      subtemas: [
        { t: "La virtud como hábito", d: "Aristóteles, en la <i>Ética a Nicómaco</i>, sostiene que las virtudes se adquieren por la práctica, como un oficio: uno se hace constructor construyendo y valiente actuando con valentía. El valor está en el término medio entre la cobardía y la temeridad.", l: [
          "El valor se practica en dosis pequeñas.",
          "Ni callarte siempre (cobardía) ni explotar (temeridad).",
          "Cada acto deja huella en el carácter."] },
        { t: "La autoeficacia de Bandura", d: "Albert Bandura mostró que la creencia en tu capacidad para algo —la autoeficacia— se construye sobre todo con experiencias de dominio: haberlo hecho antes. Ver a otros parecidos a ti hacerlo y los ánimos ayudan, pero menos.", l: [
          "Cada logro pequeño sube tu autoeficacia.",
          "Elige retos que puedas lograr con esfuerzo.",
          "Observa a gente como tú que ya lo hace."] },
        { t: "La timidez tiene ventajas", d: "La gente tímida e introvertida suele observar más, pensar antes de hablar y escuchar mejor. Cain muestra que esas cualidades son valiosas en liderazgo y en trabajo técnico. El objetivo no es dejar de ser tú, es que el miedo no decida por ti.", l: [
          "Usa tu observación: llega a las juntas con el análisis hecho.",
          "Habla menos, pero con sustancia.",
          "No te compares con el más ruidoso."] }] },
    "Lo que sí controlas, y lo que no": { ic: "control-knobs",
      sesion: [[5, "Piensa en lo que más te preocupa esta semana."],
               [15, "Haz las dos columnas en papel: lo que controlas y lo que no. Para cada cosa de la primera, una acción concreta."],
               [5, "Haz hoy la primera acción y suelta lo de la segunda columna."]],
      sale: "Tu preocupación principal está dividida en dos columnas y ya hiciste la primera acción de la columna que controlas.",
      copia: { t: "Las dos columnas", l: [
        "Lo que me preocupa: ______",
        "Lo que controlo → acción concreta:",
        "  · ______ → ______",
        "  · ______ → ______",
        "Lo que no controlo (lo suelto):",
        "  · ______",
        "  · ______"] },
      subtemas: [
        { t: "La dicotomía del control, matizada", d: "William Irvine propone una versión práctica: hay cosas que controlas totalmente, otras nada y otras en parte. En las de control parcial, fíjate metas internas: no «ganar el partido», sino «jugar lo mejor que pueda».", l: [
          "No te pongas como meta «que me den el aumento».",
          "Ponte como meta «presentar el mejor caso posible».",
          "Así el resultado no te define."] },
        { t: "La premeditación de males", d: "Los estoicos practicaban la premeditatio malorum: imaginar lo que podría salir mal para no sorprenderse. La psicología moderna tiene una técnica parecida, el pre-mortem; baja la ansiedad porque lo temido ya tiene plan.", l: [
          "Antes de un día difícil, imagina tres cosas que podrían fallar.",
          "Para cada una, escribe qué harías.",
          "Luego suéltalo: ya estás preparado."] },
        { t: "El locus de control", d: "Julian Rotter describió el locus de control: quienes creen que sus acciones influyen en su vida (interno) tienden a esforzarse más y tolerar mejor el estrés que quienes lo atribuyen a la suerte o a otros (externo). Se puede cultivar.", l: [
          "Cambia «me pasó» por «¿qué puedo hacer ahora?».",
          "Registra lo que lograste por tu esfuerzo.",
          "No caigas en el extremo de culparte por todo."] }] },
    "Exposición: el músculo de la incomodidad": { ic: "ladder",
      sesion: [[5, "Escribe tu escalera de diez situaciones que te dan miedo, del 2 al 9."],
               [15, "Sube hoy el primer peldaño: antes, anota cuánto crees que va a doler (0-10); haz la situación sin conductas de seguridad."],
               [5, "Anota cuánto dolió de verdad y compara con tu predicción."]],
      sale: "Subiste un peldaño sin conductas de seguridad y tu resultado real fue menor que tu predicción.",
      copia: { t: "Tu escalera de exposición", l: [
        "Peldaño | Situación | Miedo previsto (0-10) | Miedo real (0-10) | Fecha",
        "1 | ______ | __ | __ | __",
        "2 | ______ | __ | __ | __",
        "… hasta 10",
        "Conductas de seguridad que voy a quitar: ______"] },
      subtemas: [
        { t: "Por qué funciona la exposición", d: "La exposición funciona por aprendizaje inhibitorio, según Michelle Craske: no borras el miedo viejo, aprendes una nueva asociación —«esto no es peligroso»— que compite con él. Por eso ayuda variar situaciones y no huir antes de tiempo.", l: [
          "Quédate en la situación hasta que la ansiedad baje un poco.",
          "Varía lugares y personas.",
          "Repite: una vez no basta."] },
        { t: "Las conductas de seguridad", d: "Adrian Wells y David Clark identificaron que las conductas de seguridad —evitar mirar, ensayar de más, hablar rápido— mantienen la ansiedad social: atribuyes a ellas que no pasó nada malo. Quitarlas es lo que deja que el aprendizaje llegue.", l: [
          "Detecta tus tres conductas de seguridad.",
          "Quita una a la vez.",
          "Comprueba que sin ella tampoco pasa nada."] },
        { t: "Medir la predicción", d: "La terapia cognitiva usa experimentos conductuales: escribes lo que crees que pasará y luego lo compruebas. Con semanas de registros, tu cabeza recibe pruebas de que exagera. Es más potente que repetirte frases positivas.", l: [
          "Antes: «creo que se van a reír» (80 % de seguro).",
          "Después: «nadie se rió» (lo que pasó).",
          "Revisa tu hoja cada domingo."] }] },
    "Decidir: primero rápido, en lo pequeño": { ic: "stopwatch",
      sesion: [[5, "Pon en tu celular un contador para las decisiones que tomes hoy sin consultar."],
               [15, "Durante el día, toma diez decisiones sin preguntar «¿tú qué harías?»; cuando informes, usa «voy a hacer X; si sabes algo que lo cambie, dime»."],
               [5, "En la noche cuenta cuántas fueron y cuántas veces sentiste el impulso de consultar."]],
      sale: "Tomaste diez decisiones sin pedir permiso y al menos una vez informaste en lugar de preguntar.",
      subtemas: [
        { t: "La fatiga de decisión", d: "Se popularizó la idea de que la fuerza de voluntad se agota como un músculo, aunque los estudios recientes la cuestionan. Lo que sí está claro: rutinas y decisiones por defecto liberan atención para lo importante.", l: [
          "Decide lo repetitivo una vez: ropa, desayuno, ruta.",
          "Reserva tu energía para decisiones de una vía.",
          "Las reglas personales evitan decidir cada vez."] },
        { t: "Satisfacer en lo pequeño", d: "Herbert Simon, Nobel de economía, acuñó «satisficing»: elegir la primera opción que cumple tus criterios en vez de buscar la mejor. En decisiones pequeñas y reversibles, es más eficiente y deja menos arrepentimiento.", l: [
          "Define dos o tres criterios y elige la primera que los cumpla.",
          "No compares diez opciones para algo reversible.",
          "Ahorra la búsqueda exhaustiva para lo irreversible."] },
        { t: "Hablar en decisiones, no en preguntas", d: "La forma en que propones cambia cómo te ven. «¿Estaría bien si…?» pide permiso; «voy a… salvo que haya algo que no sepa» muestra criterio y sigue abierto a información. Es una diferencia de lenguaje con gran efecto en tu imagen.", l: [
          "Cambia preguntas de permiso por decisiones con salida.",
          "Explica en una frase por qué.",
          "Escucha la información nueva y ajusta si hace falta."] }] },
    "Las decisiones difíciles: un método, no un salto": { ic: "compass",
      sesion: [[5, "Elige una decisión difícil que tengas pendiente."],
               [20, "Pásala por el método WRAP: amplía opciones, pruébala en pequeño, aplica el 10/10/10 y pon un cable trampa."],
               [5, "Escribe la decisión, su fecha y el cable trampa en una hoja."]],
      sale: "Tu decisión tiene al menos tres opciones evaluadas, una prueba pequeña posible y un cable trampa escrito.",
      copia: { t: "Una decisión con método", l: [
        "La decisión: ______",
        "Opciones (al menos 3): A ______ · B ______ · C ______",
        "Prueba pequeña posible: ______",
        "10 minutos / 10 meses / 10 años: ______ / ______ / ______",
        "¿Qué le aconsejaría a mi mejor amigo? ______",
        "Cable trampa: si para ______ no pasa ______, entonces ______",
        "Decido el: ______"] },
      subtemas: [
        { t: "El costo de oportunidad", d: "Shane Frederick encontró que mucha gente no piensa en lo que deja de hacer al elegir algo. Preguntarse «¿qué más podría hacer con este dinero o este tiempo?» amplía las opciones y mejora la decisión.", l: [
          "Para cada opción, ¿qué estoy dejando de hacer?",
          "Compara contra la mejor alternativa, no contra nada.",
          "Aplica a dinero, tiempo y energía."] },
        { t: "La vista desde fuera", d: "Kahneman distingue la vista interna (los detalles de tu caso) de la externa (cómo les fue a casos parecidos). La externa corrige el optimismo: si la mayoría de los proyectos parecidos tardan el doble, el tuyo probablemente también.", l: [
          "Pregunta cómo les fue a otros en tu situación.",
          "Busca la tasa base: ¿cuántos lo lograron?",
          "Ajusta tu plan con ese dato."] },
        { t: "La matriz de decisión", d: "Cuando hay varios criterios, una matriz simple ayuda: pon las opciones en filas, los criterios en columnas, ponderas cada criterio y puntúas. No decide por ti, pero hace visibles los supuestos.", l: [
          "Tres a cinco criterios, con peso del 1 al 5.",
          "Puntúa cada opción del 1 al 10.",
          "Si el resultado te incomoda, revisa qué criterio olvidaste."] }] },
    "La decisión que nadie quiere tomar": { ic: "crossed-swords",
      sesion: [[5, "Identifica la decisión incómoda que todos evitan en tu trabajo o en el negocio de tu papá."],
               [15, "Junta los números y escribe la decisión, la razón y el plan; prepara cómo comunicarlo claro y el mismo día."],
               [10, "Comunícala de frente a quien corresponda y anota la reacción."]],
      sale: "Tomaste o propusiste formalmente la decisión que todos evitaban y la comunicaste de frente el mismo día.",
      subtemas: [
        { t: "El sesgo del statu quo", d: "William Samuelson y Richard Zeckhauser mostraron que preferimos dejar las cosas como están aunque cambiar sea mejor. No decidir se siente seguro porque no lo vivimos como decisión, aunque tenga costo.", l: [
          "Calcula el costo de no hacer nada durante un año.",
          "Pregúntate: si empezara de cero, ¿elegiría esto?",
          "Lo que no decides también lo eliges."] },
        { t: "La falacia del costo hundido", d: "Seguir con algo por lo que ya invertiste —dinero, tiempo, esfuerzo— aunque ya no convenga es la falacia del costo hundido. Hal Arkes y Catherine Blumer la documentaron. Lo invertido ya se fue; decide por lo que viene.", l: [
          "Pregunta: sin lo invertido, ¿seguiría?",
          "Pon fecha para revisar proyectos.",
          "Cortar a tiempo es una habilidad, no un fracaso."] },
        { t: "Comunicar una mala noticia", d: "La investigación médica sobre dar malas noticias (protocolo SPIKES) sugiere: preparar el lugar, saber qué sabe el otro, dar la noticia clara, atender la emoción y explicar el plan. Sirve fuera del hospital también.", l: [
          "Lugar privado y tiempo suficiente.",
          "La noticia en la primera o segunda frase, sin rodeos.",
          "Después, atiende la reacción y presenta el plan."] }] },
    "Cómo hablan los que lideran": { ic: "studio-microphone",
      sesion: [[5, "Escribe una propuesta de trabajo en tres frases: propongo, la razón, ¿qué se nos escapa?"],
               [15, "Grábate diciéndola: más despacio, más grave, final hacia abajo y sin amortiguadores. Repite hasta que suene firme."],
               [5, "Úsala en tu próxima junta en los primeros cinco minutos."]],
      sale: "Dijiste tu propuesta en tres frases, sin «creo que» ni «quizá», y terminaste hacia abajo.",
      subtemas: [
        { t: "La voz grave y el liderazgo", d: "Estudios de Casey Klofstad y otros encontraron que las personas con voz más grave son percibidas como más competentes y fuertes. No se trata de forzar la voz, sino de hablar desde el pecho, despacio y con respiración.", l: [
          "Respira desde el abdomen antes de hablar.",
          "Habla más lento de lo que te parece natural.",
          "No fuerces el tono: relaja la garganta."] },
        { t: "El lenguaje sin poder", d: "Investigaciones sobre «powerless speech» —titubeos, preguntas al final, disculpas, intensificadores— muestran que reducen la credibilidad del que habla, aunque el contenido sea bueno. Quitarlos es el cambio más rápido.", l: [
          "Quita «creo que», «tal vez», «no sé si».",
          "Quita el «¿no?» al final de las frases.",
          "Cambia «perdón, pero» por «una observación»."] },
        { t: "La pausa como autoridad", d: "Los oradores con autoridad usan pausas antes y después de las ideas importantes. La pausa da tiempo al otro para procesar y comunica que no tienes prisa ni miedo al silencio.", l: [
          "Pausa antes de tu idea principal.",
          "Pausa después de una cifra importante.",
          "No llenes las pausas con «eh» o «este»."] }] },
    "Decir las cosas de frente sin agredir": { ic: "right-facing-fist",
      sesion: [[5, "Elige algo que te molestó dos veces y no has dicho."],
               [15, "Escríbelo con hecho, efecto y petición; ensáyalo en voz alta sin «perdón que te lo diga»."],
               [10, "Dilo en privado y en persona en las próximas 48 horas; aguanta la reacción sin retirar lo dicho."]],
      sale: "Dijiste algo pendiente con hecho, efecto y petición, en privado, y no lo retiraste cuando el otro se defendió.",
      copia: { t: "Hecho, efecto, petición", l: [
        "Cuando ______ (el hecho, sin «siempre» ni «eres»),",
        "eso ______ (el efecto en mí o en el trabajo).",
        "La próxima vez, ______ (la petición concreta).",
        "Si se defiende: «Entiendo. Y aun así, te pido ______»."] },
      subtemas: [
        { t: "La asertividad tiene técnica", d: "La asertividad es expresar lo que piensas y necesitas respetando al otro. Manuel J. Smith (<i>Cuando digo no, me siento culpable</i>) popularizó técnicas como el disco rayado: repetir con calma tu petición sin entrar en discusión.", l: [
          "Di tu punto con calma y repítelo si hace falta.",
          "No te justifiques de más.",
          "Reconoce lo razonable del otro sin ceder lo tuyo."] },
        { t: "Comunicación no violenta", d: "Marshall Rosenberg propone cuatro pasos: observación sin juicio, sentimiento, necesidad y petición concreta. Es la versión emocional de hecho-efecto-petición y funciona bien en relaciones cercanas.", l: [
          "Observación: lo que vio una cámara, sin adjetivos.",
          "Sentimiento y necesidad: lo tuyo, sin culpar.",
          "Petición: concreta y posible, no una exigencia."] },
        { t: "El costo de acumular", d: "Callar molestias pequeñas produce lo que algunos llaman «recolectar estampillas»: las juntas hasta que un día las cambias por una explosión. Decir las cosas pronto mantiene las conversaciones pequeñas.", l: [
          "Regla de las dos veces: a la segunda, se habla.",
          "Dilo mientras todavía estás tranquilo.",
          "Una conversación pequeña evita una pelea grande."] }] },
    "No dejarte intimidar": { ic: "shield",
      sesion: [[5, "Practica cinco veces el suspiro fisiológico: dos inhalaciones cortas por la nariz y una exhalación larga por la boca."],
               [15, "Ensaya en voz alta las frases del paso: pausa, voz baja, nombrar la táctica y preguntar «¿cuál es el dato?»."],
               [5, "Escribe tu alternativa (MAAN) para la situación de presión más probable de tu semana."]],
      sale: "Tienes el suspiro fisiológico automatizado, las frases ensayadas y sabes cuál es tu alternativa si la conversación no sale.",
      subtemas: [
        { t: "El suspiro fisiológico", d: "Un estudio de Stanford de 2023 (Balban, Huberman y colegas) comparó técnicas de respiración de cinco minutos al día: el suspiro cíclico, con exhalación larga, mejoró más el estado de ánimo y bajó más la frecuencia respiratoria que la meditación de atención plena.", l: [
          "Dos inhalaciones por la nariz, la segunda corta.",
          "Exhalación larga y lenta por la boca.",
          "Una a tres repeticiones en el momento de tensión."] },
        { t: "La reevaluación de la ansiedad", d: "Alison Wood Brooks encontró que decirte «estoy emocionado» antes de una situación estresante mejora el desempeño más que intentar calmarte. La activación física es la misma; cambiar la etiqueta la vuelve energía.", l: [
          "Antes de la junta difícil: «estoy listo y con energía».",
          "No luches contra el pulso acelerado: úsalo.",
          "Respira y enfoca en la tarea."] },
        { t: "Cuando la intimidación es acoso", d: "Si la intimidación es repetida, humillante o viene de alguien con poder sobre ti, puede ser acoso laboral. En México la NOM-035 obliga a las empresas a prevenir factores de riesgo psicosocial, incluida la violencia laboral.", l: [
          "Documenta: fecha, qué pasó, testigos.",
          "Usa los canales de la empresa (Recursos Humanos, comité).",
          "Tu salud y tu dignidad son lo primero."] }] },
    "La preparación es el ochenta por ciento del valor": { ic: "memo",
      sesion: [[5, "Elige la próxima conversación importante: una junta, una negociación, una entrevista."],
               [20, "Escribe tus tres objeciones probables con su respuesta, haz un pre-mortem de diez minutos y prepara tu dato clave."],
               [5, "Ensaya en voz alta la frase de apertura dos veces."]],
      sale: "Llegaste con las tres objeciones respondidas, el dato clave en la mano y la apertura ensayada.",
      copia: { t: "Mi hoja de preparación", l: [
        "Objetivo de la conversación: ______",
        "Frase de apertura: ______",
        "Objeción 1: ______ → respuesta: ______",
        "Objeción 2: ______ → respuesta: ______",
        "Objeción 3: ______ → respuesta: ______",
        "Pre-mortem: si sale mal, será porque ______",
        "Mi dato clave: ______ (fuente: ______)",
        "Mi alternativa si no hay acuerdo: ______"] },
      subtemas: [
        { t: "El pre-mortem funciona", d: "Gary Klein propuso el pre-mortem y estudios de Deborah Mitchell y colegas encontraron que imaginar que un evento ya ocurrió aumenta la capacidad de identificar sus causas. Es la forma más barata de encontrar riesgos.", l: [
          "«Es dentro de seis meses y fracasó. ¿Por qué?».",
          "Escribe cinco causas en diez minutos.",
          "Ataca la más probable antes de empezar."] },
        { t: "El ensayo mental y en voz alta", d: "La práctica mental mejora el desempeño, pero el ensayo en voz alta añade lo que la mente no ve: dónde te trabas, cuánto dura, cómo suena. Los atletas y oradores profesionales hacen las dos.", l: [
          "Imagina la escena completa una vez.",
          "Dila en voz alta dos o tres veces.",
          "Grábate si es muy importante."] },
        { t: "Prepararte para pedir un aumento", d: "Para negociar sueldo, la preparación incluye: tus logros con cifra, el rango de mercado de fuentes serias (encuestas salariales, vacantes), tu alternativa y lo que aceptarías además de dinero. Llegar sin esto es dejar que el otro marque el número.", l: [
          "Tres logros con números de los últimos doce meses.",
          "El rango de mercado para tu puesto y experiencia.",
          "Qué más vale para ti: capacitación, horario, certificaciones."] }] },
    "Disciplina es libertad: el carácter se forja en lo pequeño": { ic: "alarm-clock",
      sesion: [[5, "Elige tres promesas pequeñas para los próximos siete días: hora de levantarte, gym, una tarea difícil primero."],
               [15, "Hoy cumple las tres y haz lo difícil antes de las 10 de la mañana."],
               [5, "Marca en tu cuadrícula de hábitos cada promesa cumplida como evidencia."]],
      sale: "Cumpliste tus tres promesas pequeñas hoy y lo difícil quedó hecho antes de las 10.",
      subtemas: [
        { t: "Los hábitos se automatizan con el tiempo", d: "Phillippa Lally y colegas siguieron a personas creando un hábito nuevo: en promedio tardó unos 66 días en volverse automático, con mucha variación según la persona y el hábito. Fallar un día no arruinaba el proceso.", l: [
          "Piensa en meses, no en semanas.",
          "Un día fallado no borra el avance.",
          "Lo importante es no fallar dos seguidos."] },
        { t: "Comerte la rana", d: "Brian Tracy popularizó «cómete la rana»: haz primero la tarea más difícil del día. Reduce la procrastinación, porque la tarea que evitas consume energía mental todo el día mientras sigue pendiente.", l: [
          "Define la noche anterior cuál es tu rana.",
          "Hazla antes de abrir correo o redes.",
          "Celebra haberla hecho: el resto del día es ganancia."] },
        { t: "Reglas, no negociaciones", d: "Las reglas personales («no reviso el celular antes de las 8», «gym lunes, miércoles y viernes») quitan el debate interno. Investigaciones sobre autocontrol sugieren que las personas con más autocontrol no resisten más, sino que se ponen menos en situaciones de tentación.", l: [
          "Convierte decisiones repetidas en reglas.",
          "Diseña tu entorno: el celular lejos, la ropa del gym lista.",
          "No negocies contigo en el momento."] }] },
    "Liderar siendo introvertido: no tienes que ser el que más habla": { ic: "owl",
      sesion: [[5, "Agenda en tu semana una conversación de quince minutos uno a uno con una persona clave de tu trabajo."],
               [15, "Prepárala: dos preguntas buenas y lo que quieres que salga. En la junta grupal, habla una vez en los primeros cinco minutos."],
               [5, "Después, escribe por correo la decisión o el resumen con el siguiente paso."]],
      sale: "Tuviste tu uno a uno, hablaste temprano en la junta y mandaste un resumen escrito claro.",
      subtemas: [
        { t: "Equipos proactivos, líderes que escuchan", d: "En el estudio de Grant, Gino y Hofmann, los líderes extrovertidos funcionaban mejor con equipos pasivos y los introvertidos con equipos proactivos, porque escuchaban y adoptaban las ideas del equipo. El estilo ideal depende del equipo.", l: [
          "Si tu equipo propone, escúchalo y adopta lo bueno.",
          "Si tu equipo es pasivo, da dirección clara.",
          "Ajusta el estilo a la gente, no a la moda."] },
        { t: "El poder de lo escrito", d: "Empresas como Amazon reemplazaron presentaciones por memos de seis páginas que se leen en silencio al inicio de la junta. El formato favorece el pensamiento claro y le da ventaja a quien piensa bien por escrito.", l: [
          "Escribe una página antes de la junta importante.",
          "Estructura: contexto, problema, propuesta, riesgos.",
          "Mándala con tiempo para que la lean."] },
        { t: "Los nichos restauradores", d: "Brian Little, psicólogo de la personalidad, describe cómo los introvertidos pueden actuar fuera de carácter por algo que les importa —un discurso, una negociación— si después se dan un «nicho restaurador» para recargar.", l: [
          "Planea tu recarga después de días sociales.",
          "Un paseo, música o silencio de 20 minutos.",
          "Protege ese tiempo como una cita."] }] },
    "Aguantar no caerle bien a todos": { ic: "mountain",
      sesion: [[5, "Piensa en una decisión que tomaste o vas a tomar que no le gusta a alguien."],
               [15, "Escribe por qué es correcta; separa las críticas con hecho y alternativa del ruido con adjetivos."],
               [5, "Decide qué crítica vas a considerar y cuál vas a agradecer y soltar."]],
      sale: "Tienes por escrito por qué tu decisión es correcta y separaste la crítica útil del ruido.",
      subtemas: [
        { t: "La necesidad de aprobación", d: "La terapia cognitiva identifica la creencia «necesito que todos me aprueben» como una fuente común de ansiedad. Albert Ellis la incluyó entre las creencias irracionales: es imposible de cumplir y te deja a merced de los demás.", l: [
          "Cambia «necesito» por «me gustaría».",
          "Pregúntate: ¿qué pasa si a esta persona no le caigo bien?",
          "Tu valor no depende de una votación."] },
        { t: "Polarizar es inevitable", d: "Cualquier postura clara atrae a unos y aleja a otros. Las marcas, los líderes y las personas que intentan gustarle a todos terminan sin identidad. Es mejor ser muy valioso para algunos que indiferente para todos.", l: [
          "Define tus valores y decide por ellos.",
          "Acepta que algunos no estarán de acuerdo.",
          "Respeta a quien discrepa sin necesitar convencerlo."] },
        { t: "Pedir crítica a quien sabe", d: "No toda opinión pesa igual. Brené Brown sugiere tener una lista corta —del tamaño de un papel pequeño— de personas cuya opinión te importa de verdad: los que te quieren y te dicen la verdad.", l: [
          "Escribe tres a cinco nombres.",
          "Pide su opinión antes de decisiones grandes.",
          "Las críticas del resto, agradécelas sin cargarlas."] }] },
    "Aplicarlo donde ya estás": { ic: "round-pushpin",
      sesion: [[5, "Elige uno de los cinco escenarios de este paso que vivas esta semana."],
               [20, "Aplica la técnica que le toca: hablar temprano en la junta, decidir en el negocio, calmar a un pasajero, responder corto en la entrevista o fechar tu decisión pendiente."],
               [5, "Anota lo que hiciste y lo que pasó."]],
      sale: "Usaste una técnica del carácter en una situación real de esta semana y quedó anotado.",
      subtemas: [
        { t: "Transferir lo aprendido", d: "La investigación sobre aprendizaje muestra que las habilidades se transfieren mal de un contexto a otro: lo que practicas en un curso no siempre aparece en la vida real. Practicar directamente en tus situaciones reales es la forma de que se quede.", l: [
          "Practica donde vas a usarlo.",
          "Empieza con la situación de menor riesgo.",
          "Anota lo que pasó para ajustar."] },
        { t: "Seguridad al volante", d: "Con un pasajero agresivo, tu prioridad es la seguridad. Didi tiene botón de seguridad y opciones para terminar el viaje. Nunca discutas mientras manejas: estaciónate en un lugar seguro y con gente si necesitas terminar.", l: [
          "Conoce el botón de emergencia de la app.",
          "Detente en un lugar iluminado y concurrido.",
          "Reporta el incidente después."] },
        { t: "Responder en una entrevista lo que no sabes", d: "Decir «no lo he hecho» seguido de cómo lo aprenderías muestra honestidad y criterio, que valen más que una respuesta inventada. Los entrevistadores técnicos detectan rápido cuando alguien finge.", l: [
          "«No lo he usado; lo que sí he hecho es ______».",
          "«Lo abordaría así: ______».",
          "Termina con un ejemplo de algo que aprendiste rápido."] }] },
    "Practicarlo esta semana": { ic: "spiral-calendar",
      sesion: [[5, "Pon en tu calendario el ejercicio de cada día."],
               [15, "Haz el de hoy y anota qué tanto te incomodó y qué pasó."],
               [5, "El fin de semana, escribe tu decisión pendiente con el método y compártela con alguien."]],
      sale: "Hiciste los seis ejercicios y tu decisión pendiente tiene fecha y alguien que la conoce.",
      copia: { t: "Tu semana", l: [
        "Lunes · decisiones sin consultar: ___ · impulsos de preguntar: ___",
        "Martes · peldaño 1: ______ · previsto __ / real __",
        "Miércoles · frase en los primeros 5 min: ______",
        "Jueves · conversación pendiente con ______: hecho / efecto / petición",
        "Viernes · amortiguadores en la grabación: ___ → ___",
        "Fin de semana · decisión: ______ · fecha: ______ · se la conté a: ______"] },
      subtemas: [
        { t: "La incomodidad es la señal", d: "Los ejercicios están diseñados para incomodar un poco: es la zona donde se aprende. Lev Vygotsky la llamó zona de desarrollo próximo en el aprendizaje infantil; en adultos se habla de la zona de aprendizaje, entre la comodidad y el pánico.", l: [
          "Si no incomoda nada, sube el reto.",
          "Si paraliza, baja un peldaño.",
          "Busca el punto medio."] },
        { t: "Compromisos públicos", d: "Contarle a alguien tu decisión y su fecha aumenta la probabilidad de cumplirla: añades la presión de la coherencia social. Funciona mejor con alguien que respetas y que te va a preguntar.", l: [
          "Elige a alguien que te pregunte después.",
          "Dale la fecha exacta.",
          "Cuéntale el resultado, sea cual sea."] },
        { t: "Registro de victorias", d: "Llevar un registro de tus actos de valor, por pequeños que sean, contrarresta el sesgo de negatividad: tendemos a recordar más los fracasos. Releerlo antes de algo difícil te recuerda de qué eres capaz.", l: [
          "Una línea por cada acto de valor.",
          "Léelo antes de una situación difícil.",
          "Míralo un mes después: verás el cambio."] }] },
    "📚 Qué leer, en qué orden": { ic: "books" },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  nadar: {
    "Qué significa saber nadar": { ic: "person-swimming",
      sesion: [[5, "En la alberca, sin calentar mucho, mide tu punto de partida: cuántos metros de crol continuo nadas sin parar."],
               [15, "Prueba la flotación vertical: cuánto tiempo aguantas sin agotarte. Luego nada 25 m contando brazadas."],
               [5, "Anota los tres números —metros continuos, minutos de flotación y brazadas por largo— con la fecha."]],
      sale: "Tienes tus tres números de partida anotados con fecha.",
      subtemas: [
        { t: "El ahogamiento en cifras", d: "La Organización Mundial de la Salud estima que cada año mueren ahogadas cientos de miles de personas en el mundo, y lo cuenta entre las principales causas de muerte por lesión no intencional. Saber nadar y saber qué hacer en el agua reduce ese riesgo.", l: [
          "Muchos ahogamientos ocurren cerca de la orilla.",
          "El alcohol aparece en una gran parte de los ahogamientos de adultos.",
          "Las habilidades básicas protegen más que la fuerza."] },
        { t: "La competencia acuática", d: "Organismos como la Cruz Roja definen la competencia acuática como un conjunto: entrar al agua y sumergirse, flotar o mantenerse a flote, girar, avanzar una distancia y salir. No basta con nadar en línea recta en una alberca.", l: [
          "Practica entrar a lo hondo y volver a la superficie.",
          "Practica girar y cambiar de dirección.",
          "Practica salir de la alberca sin escalera."] },
        { t: "Nadar como entrenamiento", d: "La natación trabaja casi todo el cuerpo con muy poco impacto en articulaciones y es excelente para el corazón y los pulmones. Por eso es buen complemento de un entrenamiento de pesas: suma condición sin desgaste.", l: [
          "Úsala en tu día de recuperación activa.",
          "Nadar suave después de pesas ayuda a soltar.",
          "Alterna estilos para equilibrar los músculos."] }] },
    "Comodidad en el agua y respiración": { ic: "bubbles",
      sesion: [[5, "Parado en lo bajo: 20 burbujas, cara dentro exhalando por la nariz, cara fuera inhalando por la boca."],
               [20, "Flotación de estrella boca abajo y boca arriba, tres veces cada una; luego flotación vertical en lo hondo junto a la orilla, subiendo de 1 a 2 minutos."],
               [5, "Termina con 10 burbujas lentas y relajadas."]],
      sale: "Exhalas bajo el agua sin pensar y flotas vertical 2 minutos sin agotarte.",
      subtemas: [
        { t: "El reflejo de buceo", d: "Al meter la cara en agua fría, el cuerpo activa el reflejo de buceo de los mamíferos: baja el ritmo cardiaco y concentra la sangre en los órganos vitales. Es un mecanismo natural que ayuda a calmarse bajo el agua si no luchas contra él.", l: [
          "Mete la cara despacio y deja que el cuerpo se adapte.",
          "Exhala suave; no retengas el aire con tensión.",
          "La calma ahorra oxígeno."] },
        { t: "Por qué flotamos", d: "Según el principio de Arquímedes, un cuerpo flota si desplaza un peso de agua igual al suyo. Con los pulmones llenos, la mayoría de las personas flotan; el músculo es más denso que la grasa, por eso a la gente musculosa le cuesta un poco más.", l: [
          "Con aire en los pulmones flotas mejor.",
          "Si eres musculoso, las piernas tienden a hundirse: es normal.",
          "Relajarte ayuda más que moverte rápido."] },
        { t: "El miedo al agua en adultos", d: "Muchos adultos tienen miedo al agua por una mala experiencia. Se trata como cualquier miedo: exposición gradual. Empezar en lo bajo, dominar la respiración y avanzar paso a paso permite superarlo a cualquier edad.", l: [
          "No avances a lo hondo hasta sentirte cómodo en lo bajo.",
          "Ten siempre la orilla o el carril a mano al principio.",
          "Una clase con instructor acelera mucho el proceso."] }] },
    "La posición del cuerpo": { ic: "straight-ruler",
      sesion: [[10, "Calienta 200 m suave a tu ritmo, en cualquier estilo."],
               [25, "Seis deslizamientos en streamline desde la pared, midiendo hasta dónde llegas; luego cuatro con patada suave, presionando el pecho hacia abajo para subir caderas."],
               [5, "Anota tu mejor distancia de deslizamiento."]],
      sale: "Tu deslizamiento llega más lejos al final de la sesión que al principio y las caderas se sienten altas.",
      subtemas: [
        { t: "La resistencia del agua", d: "El agua es unas 800 veces más densa que el aire. La resistencia crece con la superficie que enfrentas y con el cuadrado de la velocidad: ir el doble de rápido cuesta unas cuatro veces más esfuerzo. Por eso la posición ahorra más energía que la fuerza.", l: [
          "Cuerpo largo y estrecho = menos resistencia.",
          "Caderas hundidas son un freno constante.",
          "Antes de ir más rápido, ve más alineado."] },
        { t: "El cuerpo como balancín", d: "El centro de flotación está en los pulmones y el de gravedad cerca de la cadera: por eso las piernas tienden a hundirse. Presionar el pecho y estirar los brazos al frente mueve el equilibrio y sube las piernas.", l: [
          "Presiona el pecho hacia el agua.",
          "Brazos adelante alargan la palanca.",
          "Mira al fondo, no al frente."] },
        { t: "La vuelta y el empuje de pared", d: "En una alberca de 25 m, cada vuelta es una oportunidad de avanzar sin brazadas. Un buen empuje en streamline puede darte varios metros gratis por largo. Los nadadores entrenan las vueltas tanto como la brazada.", l: [
          "Empuja con las dos piernas y cuerpo en flecha.",
          "Aguanta el deslizamiento hasta perder velocidad.",
          "Empieza a patear justo antes de frenarte."] }] },
    "La patada": { ic: "foot",
      sesion: [[10, "Calienta 200 m suave."],
               [25, "4 × 25 m de patada con tabla y 4 × 25 m de patada de lado sin tabla, con un brazo estirado; tobillos sueltos y patada desde la cadera."],
               [10, "5 minutos de estiramiento de tobillos y cuádriceps fuera del agua."]],
      sale: "Haces 25 m de patada con tabla sin que las rodillas salgan del agua y avanzas con patada pequeña y rápida.",
      subtemas: [
        { t: "La flexibilidad del tobillo", d: "Los nadadores de élite tienen tobillos que se estiran mucho en flexión plantar, como bailarines. Un tobillo rígido convierte el pie en freno. Estirar los tobillos unos minutos al día mejora la patada en semanas.", l: [
          "Siéntate sobre tus talones con los empeines en el suelo.",
          "Mantén 30 segundos, tres veces.",
          "Hazlo después de entrenar, con el músculo caliente."] },
        { t: "Patada de dos o de seis tiempos", d: "En crol, la patada puede ser de seis tiempos (seis patadas por ciclo de brazos, para velocidad) o de dos tiempos (una por brazada, para distancia y ahorro de energía). Muchos nadadores de fondo usan la de dos.", l: [
          "Para empezar, patada continua suave.",
          "En distancias largas, prueba la de dos tiempos.",
          "La patada debe acompañar la rotación, no pelear con ella."] },
        { t: "Las aletas como herramienta", d: "Las aletas cortas ayudan a sentir una patada correcta desde la cadera, a mantener el cuerpo alto mientras practicas brazada y a fortalecer piernas. No sustituyen la técnica, pero la aceleran.", l: [
          "Usa aletas cortas, no de buceo.",
          "Úsalas en ejercicios de técnica, no en toda la sesión.",
          "Quítalas y compara cómo se siente."] }] },
    "La brazada de crol": { ic: "flexed-biceps",
      sesion: [[10, "Calienta 200 m suave."],
               [25, "4 × 25 m de crol a un brazo (el otro adelante), 4 × 25 m con puños cerrados y 4 × 25 m normal enfocando el codo alto y la rotación."],
               [5, "Cuenta las brazadas del último largo y anótalas."]],
      sale: "Sientes el antebrazo empujando agua hacia atrás y tus brazadas por largo bajaron respecto al inicio de la sesión.",
      subtemas: [
        { t: "El agarre con codo alto", d: "Los entrenadores llaman «early vertical forearm» a poner el antebrazo vertical lo antes posible en la brazada. Así la mano y el antebrazo empujan agua hacia atrás, que es lo que te mueve hacia adelante.", l: [
          "Imagina que pasas el brazo sobre un barril.",
          "La mano baja antes que el codo.",
          "Empuja hacia los pies, no hacia el fondo."] },
        { t: "La distancia por brazada", d: "La velocidad es la frecuencia de brazada por la distancia de cada brazada. Los mejores nadadores avanzan mucho por brazada. Por eso contar brazadas por largo es tan útil: mide eficiencia.", l: [
          "Menos brazadas al mismo ritmo = mejor técnica.",
          "Si bajas brazadas pero vas mucho más lento, no cuenta.",
          "Busca el número más bajo cómodo."] },
        { t: "Ejercicios de técnica clásicos", d: "Los nadadores usan drills que aíslan una parte: el «catch-up» (una mano espera a la otra adelante), el de puños cerrados (obliga a usar el antebrazo) y el de arrastrar los dedos (para la recuperación con codo alto).", l: [
          "Catch-up: mejora el tiempo de la brazada.",
          "Puños cerrados: mejora el agarre con el antebrazo.",
          "Arrastrar dedos: mejora la recuperación."] }] },
    "Respirar mientras nadas crol": { ic: "lungs",
      sesion: [[10, "Calienta 200 m suave con burbujas continuas."],
               [25, "6 × 25 m de patada de lado girando para respirar; luego 6 × 25 m de crol respirando cada 3, con una gafa dentro y una fuera."],
               [5, "Anota cuántos largos completaste respirando cada 3 sin levantar la cabeza."]],
      sale: "Nadas 25 m respirando cada tres brazadas, por los dos lados, sin levantar la cabeza al frente.",
      subtemas: [
        { t: "El dióxido de carbono y la falta de aire", d: "La sensación de ahogo al nadar viene más del dióxido de carbono acumulado que de la falta de oxígeno. Por eso exhalar todo bajo el agua es clave: si no sacas el aire viejo, no cabe el nuevo y la urgencia por respirar se dispara.", l: [
          "Exhala de forma continua bajo el agua.",
          "Al girar, solo inhala.",
          "Si te ahogas, revisa si estás exhalando completo."] },
        { t: "La ola de proa", d: "Al avanzar, la cabeza crea una ola y detrás de ella un hueco más bajo junto a la boca. Los buenos nadadores respiran en ese hueco, por eso apenas giran la cabeza. Con más velocidad, el hueco es más claro.", l: [
          "Respira cerca del hombro, no alto.",
          "Una gafa dentro, otra fuera.",
          "Con buena velocidad, respirar es más fácil."] },
        { t: "Respirar de los dos lados", d: "Respirar alternando lados equilibra la brazada y los hombros, y en aguas abiertas te deja ver a ambos lados y adaptarte a las olas. Cuesta al principio porque un lado siempre es más torpe.", l: [
          "Practica el lado débil con patada de lado.",
          "Respira cada 3 en series cortas al principio.",
          "En series largas puedes alternar cada 2 y cada 3."] }] },
    "Los otros tres estilos": { ic: "water-wave",
      sesion: [[10, "Calienta 200 m de crol suave."],
               [25, "4 × 25 m de dorso, 4 × 25 m de pecho con deslizamiento largo y 2 × 25 m de patada de mariposa (ondulación) con aletas si tienes."],
               [5, "Termina con 100 m de dorso suave para descansar nadando."]],
      sale: "Nadas 25 m de dorso y 25 m de pecho con técnica tranquila, y sabes que el dorso te sirve para descansar.",
      subtemas: [
        { t: "El pecho: el tiempo lo es todo", d: "En pecho, la clave es el orden: tirar con los brazos, respirar, patear y deslizar. Si pateas mientras jalas, los movimientos se anulan. La frase de entrenadores: «tira, respira, patea, desliza».", l: [
          "Deslízate un momento después de cada patada.",
          "La patada de pecho es de látigo con los pies hacia fuera.",
          "Cuida las rodillas: no abras demasiado."] },
        { t: "El dorso: cabeza quieta", d: "En dorso, la cabeza debe quedar quieta y apoyada en el agua mirando al techo, con las orejas sumergidas. Si levantas la cabeza, se hunden las caderas. La rotación de hombros es tan importante como en crol.", l: [
          "Orejas dentro, mirada al techo.",
          "Rota los hombros con cada brazada.",
          "Cuenta brazadas para saber cuándo llega la pared."] },
        { t: "La ondulación de mariposa", d: "La patada de mariposa nace del pecho y la cadera como una onda que llega a los pies. Aprenderla mejora la conciencia corporal y fortalece el abdomen, aunque no nades mariposa completa.", l: [
          "Empieza con ondulación bajo el agua con aletas.",
          "Movimiento desde el pecho, no solo desde las rodillas.",
          "Úsala en la salida de cada pared."] }] },
    "Estructura de una sesión": { ic: "clipboard",
      sesion: [[10, "Calentamiento: 300 m suave alternando crol y dorso."],
               [30, "Técnica 400 m (patada, un brazo, puños) y serie principal: 8 × 50 m con 20 segundos de descanso."],
               [5, "Vuelta a la calma 200 m suave y anota brazadas por largo de la serie."]],
      sale: "Completaste una sesión con las cuatro partes y anotaste tus brazadas por largo.",
      copia: { t: "Tu sesión de miércoles", l: [
        "Calentamiento · 300 m suave (crol + dorso)",
        "Técnica · 4 × 25 patada · 4 × 25 un brazo · 4 × 25 puños",
        "Principal · 8 × 50 crol, 20 s de descanso (brazadas por largo: __)",
        "Calma · 200 m suave",
        "Total ≈ 1,500 m · fecha __ · cómo me sentí __/10"] },
      subtemas: [
        { t: "Entrenar por series", d: "Las series con descanso (interval training) permiten nadar con mejor técnica y más intensidad que nadar continuo, porque llegas a cada repetición menos cansado. Es como se entrena en natación desde hace décadas.", l: [
          "El descanso corto mejora la condición.",
          "El descanso largo permite más velocidad y técnica.",
          "Elige según el objetivo de la sesión."] },
        { t: "El reloj de ritmo", d: "Las albercas tienen un reloj grande con segundero para controlar series: «salir cada 1:20» significa que nadas y descansas dentro de ese tiempo. Usarlo hace la sesión más ordenada y medible.", l: [
          "Sal siempre cuando el segundero marca 0 o 30.",
          "Anota tus tiempos de cada repetición.",
          "Busca que el último salga igual que el primero."] },
        { t: "La etiqueta del carril", d: "En una alberca compartida, los carriles tienen reglas: se nada en círculo pegado a la derecha (o según la alberca), se cede el paso al más rápido en la pared y no se para a la mitad. Conocerlas evita choques y molestias.", l: [
          "Pregunta la dirección del carril antes de entrar.",
          "Si te alcanzan, cede en la pared.",
          "Descansa en una esquina, no en medio de la pared."] }] },
    "Progresión realista": { ic: "chart-increasing",
      sesion: [[5, "Ubica en qué semana de la progresión estás según tus números."],
               [15, "Escribe tu meta para las próximas cuatro semanas y las sesiones que necesitas para llegar."],
               [5, "Busca y agenda una clase con entrenador, aunque sea una sola, para que revise tu técnica."]],
      sale: "Tienes tu meta de cuatro semanas escrita y una clase con entrenador agendada.",
      subtemas: [
        { t: "La sobrecarga progresiva en el agua", d: "Como en el gym, el cuerpo mejora si el estímulo aumenta poco a poco. En natación se sube la distancia total, la intensidad o se bajan los descansos, pero de una variable a la vez y alrededor del 10 % por semana.", l: [
          "Sube una sola variable a la vez.",
          "No más de 10 % de distancia por semana.",
          "Cada cuatro semanas, una semana más suave."] },
        { t: "La retroalimentación de un experto", d: "En deportes técnicos, la retroalimentación externa acelera el aprendizaje porque no puedes verte a ti mismo. Un entrenador detecta en minutos errores que tú repetirías meses. Grabarte en video también ayuda.", l: [
          "Pide a alguien que te grabe un largo.",
          "Compara con videos de técnica de crol.",
          "Corrige un error a la vez."] },
        { t: "Mesetas y cómo salir de ellas", d: "Es normal estancarse después de mejorar rápido. Para salir de una meseta se cambia el estímulo: nueva técnica, series distintas, más frecuencia o descanso. La meseta no es fracaso; es la señal de cambiar algo.", l: [
          "Si llevas un mes sin mejorar, cambia la sesión.",
          "Agregar una segunda sesión semanal acelera mucho.",
          "Revisa el descanso y el sueño."] }] },
    "Seguridad en el agua": { ic: "ring-buoy",
      sesion: [[5, "Repasa las reglas: nunca solo en aguas abiertas, corrientes de retorno, ahogamiento silencioso y «alcanza, lanza, rema»."],
               [15, "Ve un video sobre cómo identificar corrientes de retorno y otro sobre cómo se ve un ahogamiento real."],
               [5, "Escribe qué harías si te atrapa una corriente y si ves a alguien ahogándose."]],
      sale: "Sabes reconocer una corriente de retorno y un ahogamiento silencioso, y qué hacer en cada caso.",
      subtemas: [
        { t: "Cómo se ve una corriente de retorno", d: "Una corriente de retorno se ve como una franja donde no rompen las olas, con agua más oscura, espuma o arena que se mueve mar adentro. Se forman cerca de canales entre bancos de arena y junto a muelles o rocas.", l: [
          "Busca la franja sin olas entre zonas con olas.",
          "Pregunta al salvavidas antes de entrar.",
          "Nada en zonas vigiladas y con bandera."] },
        { t: "La respuesta instintiva de ahogamiento", d: "Frank Pia describió la respuesta instintiva de ahogamiento: la persona no puede gritar ni pedir ayuda porque usa toda su energía en respirar; empuja el agua hacia abajo con los brazos a los lados y la cabeza echada atrás. Puede pasar desapercibida a pocos metros.", l: [
          "Si alguien parece «estar viendo el cielo» en el agua y no avanza, pregunta.",
          "Si no responde, actúa de inmediato.",
          "Los niños se ahogan en silencio y muy rápido."] },
        { t: "Ayudar sin hundirte", d: "La regla de rescate para no entrenados: alcanzar (con un palo, una toalla), lanzar algo que flote (salvavidas, hielera vacía, botella), remar si hay embarcación, y solo ir nadando con entrenamiento y un objeto flotante.", l: [
          "Primero grita por ayuda y llama al 911.",
          "Lanza algo que flote con una cuerda si puedes.",
          "Si entras, lleva algo que flote entre tú y la persona."] }] },
    "Cuidar el hombro": { ic: "adhesive-bandage",
      sesion: [[5, "Después de nadar, cinco minutos de estiramiento de hombros, pecho y espalda."],
               [15, "En tu siguiente día de gym, tres series de rotación externa con banda, face pulls y remo con escápula activa."],
               [5, "Anota si sentiste molestia en el hombro al nadar y en qué parte de la brazada."]],
      sale: "Hiciste los ejercicios de manguito y escápula y sabes en qué parte de la brazada aparece cualquier molestia.",
      subtemas: [
        { t: "El manguito rotador", d: "El manguito rotador son cuatro músculos pequeños (supraespinoso, infraespinoso, redondo menor y subescapular) que mantienen la cabeza del húmero centrada en el hombro. La natación y el press de banca cargan el hombro; si el manguito es débil, aparece el pinzamiento.", l: [
          "Trabaja la rotación externa con banda ligera.",
          "Pocas repeticiones controladas, sin dolor.",
          "Dos o tres veces por semana."] },
        { t: "El equilibrio entre empujar y jalar", d: "Entrenar mucho pecho y hombro frontal en el gym, y además nadar, puede descompensar hacia adelante. Equilibrar con ejercicios de espalda y de la parte posterior del hombro protege la articulación.", l: [
          "Por cada serie de empuje, una de jalón.",
          "Incluye face pulls y remo.",
          "Cuida la postura en el escritorio."] },
        { t: "El volumen y el dolor", d: "Las lesiones de hombro en nadadores suelen venir de subir la distancia demasiado rápido con mala técnica. El dolor es señal de bajar volumen y revisar técnica, no de aguantar.", l: [
          "Si duele, nada menos y más despacio.",
          "Revisa el codo alto y la rotación.",
          "Si el dolor sigue más de dos semanas, consulta a un fisioterapeuta."] }] },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  cocinar: {
    "Por qué esto te importa": { ic: "man-cook",
      sesion: [[5, "Revisa en Finanzas cuánto gastaste en comida fuera y a domicilio el mes pasado."],
               [15, "Elige tres comidas de la semana que vas a cocinar en lugar de pedir y anota los ingredientes."],
               [5, "Escribe tus cinco platillos meta: los que quieres que te salgan bien siempre."]],
      sale: "Sabes cuánto gastas en comer fuera, tienes tres comidas planeadas y tu lista de cinco platillos meta.",
      subtemas: [
        { t: "Cocinar en casa y salud", d: "Estudios de cohorte, como uno con datos del Reino Unido (Mills y colegas, 2017), encontraron que quienes cocinan en casa con más frecuencia comen más verduras y frutas y tienen mejores indicadores de dieta. No es magia: controlas lo que entra.", l: [
          "Controlas sal, grasa y porciones.",
          "Comes más verdura cuando la compras tú.",
          "Facilita llevar el registro en Comida."] },
        { t: "Lo que cuesta pedir", d: "Pedir a domicilio suma el precio del platillo, el envío, la comisión de la app y la propina; suele salir mucho más caro que cocinar lo mismo. Calcular tu propio número convierte cocinar en una decisión financiera clara.", l: [
          "Compara el ticket de una semana de pedir contra el súper.",
          "Cuenta el ahorro como meta en Finanzas.",
          "Deja pedir para ocasiones, no para la rutina."] },
        { t: "Cocinar para Alemania", d: "En Alemania comer fuera es caro para un estudiante y las cocinas compartidas (WG) son comunes. Llegar sabiendo cocinar básico, comprar en el súper alemán (Aldi, Lidl, REWE) y hacer lotes es parte de tu presupuesto de maestría.", l: [
          "Aprende recetas con ingredientes que hay allá.",
          "Prácticas de lote: te salvan en semanas de exámenes.",
          "Cocinar para tus compañeros también hace red."] }] },
    "Los cinco principios que sustituyen a cien recetas": { ic: "salt",
      sesion: [[5, "Prepara un plato sencillo que sueles hacer, sin la sal final."],
               [15, "Pruébalo y corrige con un principio a la vez: sal, luego ácido, luego grasa; prueba después de cada ajuste y nota la diferencia."],
               [5, "Anota qué cambió más el sabor."]],
      sale: "Corregiste un plato probando en cada paso y puedes decir qué principio lo mejoró más.",
      subtemas: [
        { t: "Cómo actúa la sal", d: "La sal no solo sabe salado: reduce la percepción de amargor y realza otros sabores. Por eso un poco de sal en un postre o en un café amargo cambia el resultado. Salar con tiempo también deja que penetre en la carne.", l: [
          "Sal a la carne con anticipación, incluso horas antes.",
          "Una pizca en lo dulce realza el sabor.",
          "Usa sal de grano para tomarla con los dedos y medir."] },
        { t: "El ácido equilibra", d: "El ácido (limón, vinagre, jitomate, vino) contrasta la grasa y despierta el sabor. Un platillo graso o pesado casi siempre mejora con un toque ácido al final. En la cocina mexicana, el limón y la salsa cumplen ese papel.", l: [
          "Prueba unas gotas de limón antes de agregar más sal.",
          "El vinagre de manzana sirve en guisos y ensaladas.",
          "Agrega el ácido al final: el calor lo apaga."] },
        { t: "Umami: el quinto sabor", d: "Kikunae Ikeda identificó en 1908 el umami, el sabor del glutamato: presente en jitomate maduro, queso parmesano, hongos, caldos y salsa de soya. Da profundidad y sensación de sabor «redondo».", l: [
          "Jitomate asado o en lata da umami a una salsa.",
          "Un poco de queso duro o soya profundiza un guiso.",
          "Los caldos hechos en casa son una base de umami."] }] },
    "Las cuatro técnicas base": { ic: "shallow-pan-of-food",
      sesion: [[5, "Prepara verduras en trozos parejos y una pieza de carne seca."],
               [20, "Saltea las verduras en sartén muy caliente sin llenarla y sella la carne sin moverla hasta que se despegue sola."],
               [5, "Compara: ¿doraron o se cocieron en su jugo? Anota qué ajustarías."]],
      sale: "Las verduras doraron sin aguarse y la carne se despegó sola con costra café.",
      subtemas: [
        { t: "El calor y el agua", d: "El agua hierve a unos 100 °C (algo menos en la altura de CDMX); el dorado de Maillard pasa más arriba, desde unos 140 °C. Mientras haya agua en la superficie, la comida no dora. Por eso se seca, se calienta bien la sartén y no se llena.", l: [
          "Seca la carne y las verduras con papel.",
          "Espera a que el aceite brille antes de poner la comida.",
          "Cocina en tandas si no cabe holgado."] },
        { t: "Cocinar en la altura", d: "En la Ciudad de México, a unos 2,240 m, el agua hierve alrededor de 92–93 °C. Por eso las cosas hervidas (frijol, pasta, huevo) tardan más. En Alemania, al nivel del mar, todo hervido se cocina un poco más rápido.", l: [
          "Los frijoles tardan más en CDMX: la olla exprés ayuda.",
          "La pasta puede necesitar un minuto más.",
          "En Alemania, ajusta los tiempos hacia abajo."] },
        { t: "Estofar: el colágeno se vuelve gelatina", d: "Los cortes duros tienen mucho colágeno. Con calor húmedo y tiempo (horas a fuego bajo), el colágeno se convierte en gelatina y la carne se vuelve tierna. Por eso los cortes baratos son los mejores para guisar.", l: [
          "Usa cortes como chambarete, pecho o espaldilla.",
          "Dora primero, luego líquido y fuego bajo.",
          "Está listo cuando se deshace con un tenedor."] }] },
    "Tres recetas para empezar": { ic: "cooking",
      sesion: [[5, "Elige una de las tres recetas y ten todo listo antes de prender la estufa."],
               [20, "Hazla siguiendo la clave del paso: huevos a fuego bajo, pasta terminada en la salsa con agua de cocción, o pollo con piel sin mover."],
               [5, "Anota qué salió bien y qué cambiarías la próxima vez."]],
      sale: "Hiciste una de las tres recetas aplicando su clave y anotaste qué ajustar en la siguiente.",
      copia: { t: "Pasta con salsa de verdad", l: [
        "1. Agua abundante con sal (que sepa a mar).",
        "2. Mientras, sofríe ajo en aceite de oliva a fuego medio; agrega jitomate en lata y sal; 10 min.",
        "3. Cuece la pasta 1–2 min menos que el paquete. Guarda 1 taza del agua.",
        "4. Pasa la pasta a la salsa con un chorro del agua; mueve 1–2 min a fuego alto hasta que brille.",
        "5. Fuera del fuego: queso, pimienta, un hilo de aceite. Prueba y corrige sal o ácido."] },
      subtemas: [
        { t: "La emulsión", d: "Una emulsión mezcla grasa y agua, que normalmente se separan. El almidón del agua de la pasta y la proteína del queso actúan como emulsionantes: por eso la salsa queda cremosa y pegada a la pasta en lugar de aceitosa.", l: [
          "Agrega el agua de cocción poco a poco.",
          "Mueve con energía para emulsionar.",
          "Si se separa, otro chorro de agua y a mover."] },
        { t: "El calor residual", d: "La comida sigue cocinándose después de retirarla del fuego, por el calor acumulado. En los huevos y la carne, eso puede ser la diferencia entre jugoso y seco. Por eso se retiran un poco antes de verse listos.", l: [
          "Huevos: retíralos cuando aún se vean húmedos.",
          "Carne: retírala unos grados antes de la meta.",
          "Deja reposar: el punto se termina solo."] },
        { t: "Repetir para aprender", d: "Hacer la misma receta varias veces seguidas libera atención: la primera vez sigues pasos, la tercera ya observas detalles. Es práctica deliberada aplicada a la cocina.", l: [
          "Repite cada receta tres veces en dos semanas.",
          "Cambia una variable cada vez.",
          "Anota en una nota tu versión final."] }] },
    "Cortar bien": { ic: "kitchen-knife",
      sesion: [[5, "Revisa que el cuchillo esté afilado y que la tabla no se mueva (pon un trapo húmedo debajo)."],
               [20, "Corta tres cebollas: una en juliana, una en brunoise y una en rodajas, con agarre de pinza y mano en garra."],
               [5, "Compara la uniformidad de los trozos y guarda la cebolla para la comida de la semana."]],
      sale: "Cortaste tres cebollas con la mano en garra, sin accidentes y con trozos parejos.",
      subtemas: [
        { t: "Por qué la cebolla hace llorar", d: "Al cortar la cebolla se rompen células que liberan un compuesto volátil (el factor lacrimógeno) que irrita los ojos. Un cuchillo afilado rompe menos células; enfriar la cebolla y no cortar la raíz hasta el final también ayuda.", l: [
          "Cuchillo bien afilado.",
          "Cebolla fría del refrigerador.",
          "Deja la raíz intacta hasta el último corte."] },
        { t: "El tamaño uniforme cocina parejo", d: "Trozos del mismo tamaño se cocinan al mismo tiempo. Si unos son grandes y otros pequeños, unos quedan crudos y otros quemados. La uniformidad es más importante que la velocidad.", l: [
          "Primero parejo, después rápido.",
          "Corta del mismo grosor en cada pasada.",
          "Para guisos largos, trozos más grandes."] },
        { t: "Cuidar el cuchillo", d: "Un buen cuchillo dura años si se cuida: se lava a mano, se seca de inmediato, se guarda en un soporte y se usa sobre tabla de madera o plástico, nunca vidrio o piedra. La chaira mantiene el filo entre afilados.", l: [
          "Nunca en el lavavajillas.",
          "Nunca cortes sobre vidrio, mármol o plato.",
          "Usa la chaira antes de cada uso."] }] },
    "Mise en place: por qué los profesionales no se atoran": { ic: "bento-box",
      sesion: [[5, "Lee completa la receta que harás hoy."],
               [20, "Antes de prender el fuego, pica, mide y acomoda todo en tazones; ten trapo, bote de desperdicio y basura a mano."],
               [5, "Cocina y limpia mientras esperas cada paso; al terminar, la cocina debe quedar casi limpia."]],
      sale: "Cocinaste sin buscar nada a mitad del proceso y la cocina quedó limpia al servir.",
      subtemas: [
        { t: "El origen en las cocinas francesas", d: "La mise en place viene de la organización de cocinas de Auguste Escoffier, con estaciones y tareas definidas. Anthony Bourdain la llamó la religión del cocinero: tu estación ordenada es tu mente ordenada.", l: [
          "Cada cosa en su lugar antes de empezar.",
          "Lo que usas más, más cerca.",
          "Limpia tu estación entre tareas."] },
        { t: "El trabajo profundo en la cocina", d: "Cuando todo está listo, cocinas sin interrupciones y puedes concentrarte en el fuego y el sabor. Es la misma lógica de quitar distracciones para trabajar mejor: la preparación libera la atención.", l: [
          "Celular lejos mientras cocinas.",
          "Una tarea a la vez cuando hay fuego.",
          "Ten la receta a la vista, no en el celular bloqueado."] },
        { t: "Limpiar mientras cocinas", d: "Lavar una olla mientras algo hierve convierte tiempos muertos en limpieza. Al terminar de comer, queda poco por lavar, y eso es lo que hace sostenible cocinar entre semana.", l: [
          "Llena el fregadero con agua jabonosa al empezar.",
          "Lava utensilios en cada espera.",
          "Guarda ingredientes en cuanto los terminas de usar."] }] },
    "La despensa que resuelve cualquier cena": { ic: "canned-food",
      sesion: [[5, "Revisa tu despensa y refri contra la lista del paso y marca lo que falta."],
               [15, "Haz la lista de compra solo con lo faltante y súmala a tu siguiente visita al súper."],
               [10, "Con lo que ya tienes, prepara una cena de quince minutos (por ejemplo, pasta con ajo, aceite y queso)."]],
      sale: "Tu despensa tiene la base completa y cenaste algo hecho en casa en quince minutos.",
      copia: { t: "La despensa base", l: [
        "Base: aceite de oliva · aceite neutro · sal de grano y fina · pimienta · ajo · cebolla",
        "Ácidos: limones · vinagre de manzana · balsámico",
        "Secos: pasta · arroz · frijol · lentejas · jitomate en lata · caldo",
        "Refri: huevos · mantequilla · queso duro · zanahoria · calabaza · cebolla morada",
        "Especias: comino · orégano · pimentón · chile en polvo · laurel"] },
      subtemas: [
        { t: "Comprar para cocinar, no para llenar", d: "Una despensa útil tiene ingredientes que combinan entre sí. Comprar sin plan llena el refri de cosas que se echan a perder. La regla: base fija + frescos para tres o cuatro días.", l: [
          "Compra frescos dos veces por semana, no una.",
          "Planea con lo que ya tienes antes de comprar.",
          "Lo que se echa a perder, compra menos."] },
        { t: "Primero entra, primero sale", d: "En restaurantes se usa FIFO: lo que entró primero se usa primero. En casa, poner lo nuevo atrás y lo viejo adelante evita encontrar cosas caducas al fondo.", l: [
          "Lo nuevo atrás, lo viejo al frente.",
          "Revisa fechas cada semana.",
          "Usa lo que está por caducar en un guiso o un lote."] },
        { t: "Las especias pierden fuerza", d: "Las especias molidas pierden aroma en meses porque sus aceites se evaporan. Las enteras duran más. Comprar poco y guardar lejos de la luz y del calor de la estufa mantiene el sabor.", l: [
          "Compra especias en cantidades pequeñas.",
          "Guárdalas lejos de la estufa.",
          "Tuesta las enteras en sartén seca antes de molerlas."] }] },
    "Cocinar por lotes": { ic: "pot-of-food",
      sesion: [[15, "Arranca las bases que tardan: frijol o lentejas en olla, arroz, pollo cocido y verduras al horno."],
               [60, "Mientras se cocinan, porciona, deja enfriar y guarda en recipientes con etiqueta y fecha; decide qué platillos armarás cada día."],
               [10, "Limpia y anota en el Plan Semanal de Comida qué comida sale de cada base."]],
      sale: "Tienes bases para cinco comidas etiquetadas y el plan de qué armar cada día.",
      copia: { t: "Un domingo de lote", l: [
        "Bases: arroz · frijol · pollo cocido deshebrado · verduras asadas · una salsa",
        "Lunes: bowl de arroz + pollo + verduras + salsa",
        "Martes: tacos de pollo + frijoles",
        "Miércoles: sopa con caldo del pollo + verduras",
        "Jueves: arroz frito con huevo + verduras",
        "Viernes: tostadas de frijol + pollo",
        "Etiqueta: contenido · fecha · porciones"] },
      subtemas: [
        { t: "Enfriar rápido y seguro", d: "La comida cocinada debe pasar rápido por la zona de peligro (4–60 °C). Repartirla en recipientes poco profundos acelera el enfriamiento antes de meterla al refri; una olla grande caliente tarda horas en enfriarse por dentro.", l: [
          "Divide en recipientes bajos.",
          "Refrigera en menos de 2 horas.",
          "En el refri, consume en 3 o 4 días; lo demás, al congelador."] },
        { t: "Congelar bien", d: "La comida congelada se conserva segura mucho tiempo, pero pierde calidad por la quemadura de congelador si queda aire. Recipientes llenos o bolsas sin aire, porciones individuales y etiquetas mantienen la calidad.", l: [
          "Saca el aire de las bolsas.",
          "Congela plano para que descongele rápido.",
          "Usa lo congelado en unos tres meses para mejor sabor."] },
        { t: "Bases, no platillos", d: "Cocinar componentes (proteína, carbohidrato, verdura, salsa) en lugar de platillos completos permite combinar distinto cada día. Es la estrategia de muchos programas de preparación de comidas para no aburrirse.", l: [
          "Una proteína, un carbohidrato, dos verduras y una salsa.",
          "Cambia la salsa para cambiar el plato.",
          "Agrega algo fresco al servir."] }] },
    "Los errores que arruinan la comida": { ic: "fire",
      sesion: [[5, "Repasa los cinco errores y elige el que más cometes."],
               [20, "Cocina algo cuidando específicamente ese error: sartén caliente, no llenar, sal, no mover, secar."],
               [5, "Prueba y anota si notaste la diferencia."]],
      sale: "Corregiste a propósito tu error más común y el plato salió mejor que de costumbre.",
      subtemas: [
        { t: "El punto de humo", d: "Cada grasa tiene un punto de humo: la temperatura a la que empieza a humear y degradarse. El aceite de oliva extra virgen tiene uno más bajo que aceites refinados como el de canola o girasol. Para sellar a fuego alto, conviene un aceite neutro.", l: [
          "Sellar: aceite neutro.",
          "Terminar y aliñar: aceite de oliva extra virgen.",
          "Si humea mucho, baja el fuego."] },
        { t: "Probar con método", d: "Probar no es solo ver si «está bueno»: es preguntar qué falta. Sal, ácido, dulce, grasa, picante. Corregir de a poco y volver a probar evita pasarse.", l: [
          "Prueba con una cuchara limpia cada vez.",
          "Corrige un elemento a la vez.",
          "Agrega poco: se puede sumar, no quitar."] },
        { t: "Cómo rescatar un plato", d: "Muchos errores se arreglan: demasiada sal se compensa con más volumen o con ácido y grasa; un guiso aguado se reduce o se espesa; lo soso se levanta con sal y ácido. Solo lo quemado no tiene arreglo.", l: [
          "Salado: agrega más ingrediente base o papa en guisos.",
          "Aguado: reduce destapado.",
          "Quemado: no raspes el fondo; pásalo a otra olla."] }] },
    "Lo que todo cocinero debe saber": { ic: "thermometer",
      sesion: [[5, "Escribe las temperaturas internas seguras y pégalas en el refri."],
               [15, "Si tienes termómetro de sonda, úsalo en la próxima carne; si no, agrégalo a tu lista de compras."],
               [5, "Separa una tabla para carne cruda y otra para verdura, y márcalas."]],
      sale: "Tienes las temperaturas pegadas, tablas separadas y un termómetro en tu cocina o en tu lista.",
      copia: { t: "Temperaturas internas seguras", l: [
        "Pollo y pavo: 74 °C",
        "Carne molida (res, cerdo): 71 °C",
        "Cerdo en corte entero: 63 °C + 3 min de reposo",
        "Res en corte entero: 63 °C seguro; término medio 57–60 °C",
        "Pescado: 63 °C o hasta que se separe en láminas",
        "Zona de peligro: 4–60 °C · máximo 2 h fuera del refri"] },
      subtemas: [
        { t: "Contaminación cruzada", d: "Las bacterias de la carne cruda (como Salmonella o Campylobacter en el pollo) pasan a otros alimentos por tablas, cuchillos, manos o trapos. Separar utensilios y lavarse las manos es la medida más eficaz en casa.", l: [
          "Tabla y cuchillo distintos para carne cruda.",
          "Lávate las manos después de tocar carne cruda.",
          "No laves el pollo crudo: salpica bacterias."] },
        { t: "El reposo, revisado", d: "La idea de que el reposo «sella los jugos» es un mito, pero el reposo sí ayuda: al bajar la temperatura, los jugos se espesan un poco y se pierde menos líquido al cortar, y el calor se reparte de forma más pareja.", l: [
          "Reposa la carne en un plato tibio.",
          "Cortes pequeños: 5 minutos; grandes: 10 a 15.",
          "Corta contra la fibra."] },
        { t: "Descongelar con seguridad", d: "Descongelar a temperatura ambiente deja la superficie en la zona de peligro por horas mientras el centro sigue congelado. Refrigerador, agua fría cambiada cada 30 minutos o microondas (y cocinar enseguida) son las formas seguras.", l: [
          "Planea: pásalo al refri un día antes.",
          "Agua fría en bolsa cerrada si hay prisa.",
          "Lo descongelado en microondas se cocina de inmediato."] }] },
    "Un platillo difícil de verdad": { ic: "hot-pepper",
      sesion: [[15, "Asa los chiles poblanos al fuego directo hasta ampollarlos, súdalos en bolsa y pélalos; prepara el relleno."],
               [40, "Rellena, enharina, monta las claras a punto de nieve, incorpora las yemas, capea justo antes y fríe a la temperatura correcta."],
               [10, "Escurre sobre rejilla, sirve con caldillo de jitomate y anota qué mejorarías."]],
      sale: "Los chiles quedaron pelados, el capeado esponjado y crujiente, y escurrieron sin quedar grasosos.",
      subtemas: [
        { t: "Las claras a punto de nieve", d: "Batir claras incorpora aire en una red de proteínas. Cualquier rastro de grasa o yema impide que suban. Un tazón limpio y seco, y claras a temperatura ambiente, dan más volumen; se detienen cuando forman picos firmes.", l: [
          "Tazón limpio, sin grasa.",
          "Separa con cuidado: ni una gota de yema.",
          "Incorpora las yemas con movimientos envolventes."] },
        { t: "La temperatura del aceite", d: "Para freír, el aceite debe estar entre unos 170 y 180 °C. Más frío, el capeado absorbe grasa; más caliente, se quema por fuera antes de cocerse. Un termómetro o la prueba de la gota ayudan.", l: [
          "Prueba con una gota de capeado: debe burbujear y subir.",
          "Fríe pocas piezas a la vez para no enfriar el aceite.",
          "Escurre sobre rejilla."] },
        { t: "Platillos de temporada", d: "Los chiles en nogada, versión festiva del chile relleno, se hacen en agosto y septiembre, cuando hay granada y nuez de Castilla fresca. Cocinar por temporada da mejor sabor y mejores precios.", l: [
          "Aprende un platillo de temporada al año.",
          "Compra lo que abunda: es más barato y sabe mejor.",
          "En Alemania, la temporada de espárragos (Spargelzeit) es en primavera."] }] },
    "📚 Qué leer / ver": { ic: "books" },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  armas: {
    "Antes de nada: el marco legal en México": { ic: "balance-scale",
      sesion: [[5, "Lee el artículo 10 constitucional y ubica la Ley Federal de Armas de Fuego y Explosivos en el sitio oficial de la Cámara de Diputados."],
               [15, "Escribe con tus palabras la diferencia entre poseer y portar, quién otorga cada permiso y por qué solo se compra en la tienda de la SEDENA."],
               [5, "Anota las tres conductas que son delito federal: portar sin permiso, comprar fuera del canal legal y tener calibres reservados."]],
      sale: "Explicas sin notas la diferencia entre poseer y portar y quién autoriza cada cosa.",
      subtemas: [
        { t: "La ley que manda", d: "La Ley Federal de Armas de Fuego y Explosivos y su reglamento regulan qué armas pueden tener los civiles, para qué y con qué permisos. La Secretaría de la Defensa Nacional lleva el Registro Federal de Armas y otorga licencias.", l: [
          "Lee siempre la versión vigente en el sitio oficial.",
          "Las reglas cambian: confirma en la SEDENA antes de cualquier trámite.",
          "Un club serio te orienta con la versión actual."] },
        { t: "Poseer, portar y transportar", d: "Poseer es tener el arma registrada en el domicilio; portar es llevarla contigo lista para usarse; transportar es moverla descargada y guardada en las condiciones de un permiso específico, como el de tirador deportivo. Son tres permisos y tres responsabilidades distintas.", l: [
          "El registro no te autoriza a sacarla de casa.",
          "La licencia de club tiene rutas y condiciones.",
          "Portar es excepcional y difícil de obtener."] },
        { t: "Por qué la ley es estricta", d: "México tiene un problema grave de tráfico ilegal de armas y violencia. Las restricciones buscan controlar quién tiene armas y para qué. Entender el contexto ayuda a ver la regulación como parte de la responsabilidad, no como obstáculo.", l: [
          "El camino legal es lento por diseño.",
          "Cualquier atajo ofrecido por terceros es ilegal.",
          "La responsabilidad empieza antes de tocar un arma."] }] },
    "El camino legal, en orden": { ic: "identification-card",
      sesion: [[5, "Busca en el directorio de la SEDENA los clubes de tiro registrados más cercanos a ti."],
               [15, "Llama o escribe a dos: pregunta requisitos de membresía, si rentan armas, si dan clase de seguridad para principiantes y horarios."],
               [5, "Haz la lista de documentos que te pedirían y marca los que ya tienes."]],
      sale: "Tienes dos clubes registrados contactados, sus requisitos y la lista de tus documentos.",
      subtemas: [
        { t: "El club de tiro como puerta", d: "Los clubes registrados ante la SEDENA pertenecen a federaciones y permiten practicar legalmente bajo supervisión. Para un principiante, rentar el arma en el club evita comprar y tramitar mientras decides si te interesa el deporte.", l: [
          "Pregunta si el club está registrado y afiliado.",
          "Pide clase de seguridad antes de disparar.",
          "Renta antes de comprar."] },
        { t: "Los documentos y su lógica", d: "Antecedentes no penales, modo honesto de vivir y domicilio comprobable existen para que la autoridad verifique quién tendrá el arma. Es la misma lógica de cualquier licencia de alto riesgo: demostrar que eres confiable.", l: [
          "Tramita tu carta de antecedentes no penales en el sitio oficial.",
          "Tu constancia laboral sirve como modo honesto de vivir.",
          "Guarda copias digitales de todo."] },
        { t: "Antes de decidir comprar", d: "Tener un arma implica costo de compra, trámites, caja fuerte, munición, membresía y práctica constante. Además, cuando te mudes a Alemania en 2027, no podrás llevarla fácilmente: allá las armas requieren permisos (Waffenbesitzkarte) muy estrictos.", l: [
          "Suma el costo anual real, no solo el arma.",
          "Piensa qué harías con ella al mudarte.",
          "Practicar en el club sin comprar es perfectamente válido."] }] },
    "Las cuatro reglas de seguridad": { ic: "shield",
      sesion: [[5, "Escribe las cuatro reglas de memoria, en orden."],
               [15, "Para cada regla, escribe un ejemplo de accidente que habría evitado y por qué se necesitan al menos dos fallas para una tragedia."],
               [5, "Repítelas en voz alta hasta decirlas sin pensar."]],
      sale: "Recitas las cuatro reglas de memoria y explicas para qué sirve cada una.",
      copia: { t: "Las cuatro reglas", l: [
        "1. Toda arma está cargada.",
        "2. Nunca apuntes a nada que no estés dispuesto a destruir.",
        "3. Dedo fuera del gatillo hasta decidir disparar.",
        "4. Conoce tu blanco y lo que hay detrás."] },
      subtemas: [
        { t: "Redundancia: el principio de seguridad", d: "Las cuatro reglas funcionan como capas, igual que en ingeniería de seguridad: el modelo del queso suizo de James Reason explica que un accidente ocurre cuando los huecos de varias capas se alinean. Si cumples tres de cuatro, casi siempre nadie sale herido.", l: [
          "Cada regla protege si otra falla.",
          "Por eso se cumplen las cuatro siempre.",
          "Es la misma idea de tus pruebas de ADAS: varias barreras."] },
        { t: "Jeff Cooper y las reglas modernas", d: "El coronel Jeff Cooper formalizó estas cuatro reglas en el siglo XX y hoy las enseñan clubes e instructores en todo el mundo. Su fuerza está en que son simples y absolutas: no tienen excepciones que haya que recordar.", l: [
          "No existe «solo esta vez».",
          "No existe «sé que está descargada».",
          "La simplicidad las hace automáticas."] },
        { t: "Disciplina del dedo", d: "Los estudios de reflejos muestran que con estrés o sobresalto la mano tiende a apretarse sola (respuesta de sobresalto, contracción simpática). Si el dedo está en el gatillo, eso dispara el arma. Por eso el dedo va recto sobre el armazón hasta decidir disparar.", l: [
          "Dedo recto sobre el armazón, siempre.",
          "Se entrena con un instructor hasta que sea automático.",
          "Obsérvalo en las películas: casi nadie lo hace bien."] }] },
    "La regla adicional en casa": { ic: "locked-with-key",
      sesion: [[5, "Si alguna vez tienes un arma, define dónde estaría la caja fuerte y dónde las municiones por separado."],
               [15, "Investiga opciones de cajas fuertes certificadas de acceso rápido y qué norma de seguridad cumplen."],
               [5, "Escribe tus reglas de casa: descargada, bajo llave, munición aparte, nadie más conoce la combinación."]],
      sale: "Tienes por escrito cómo se guardaría un arma en tu casa sin que nadie más pueda alcanzarla.",
      subtemas: [
        { t: "Lo que dicen los datos de riesgo", d: "Estudios de salud pública en Estados Unidos han encontrado que tener un arma en casa se asocia con mayor riesgo de suicidio y de lesiones accidentales en ese hogar. El almacenamiento seguro reduce esos riesgos de forma importante.", l: [
          "El riesgo principal está dentro de la casa.",
          "Guardar bajo llave y descargada reduce accidentes.",
          "Separar la munición agrega otra barrera."] },
        { t: "Crisis y acceso", d: "Muchas crisis emocionales son breves e impulsivas. La distancia —un arma bajo llave, sin munición cerca— da tiempo para que la crisis pase. Es una de las medidas más estudiadas en prevención del suicidio.", l: [
          "En una crisis, aleja cualquier medio letal.",
          "Pide ayuda: en México, la Línea de la Vida 800 911 2000.",
          "Hablar con alguien salva vidas."] },
        { t: "Visitas y niños", d: "Los niños son curiosos y no distinguen un arma real de un juguete; las visitas no conocen tus reglas. Por eso el arma nunca está accesible, aunque creas que nadie sabe dónde está.", l: [
          "Nunca escondida: siempre bajo llave.",
          "Combinación que solo tú conoces.",
          "Cuando hay visitas, revisa que todo esté cerrado."] }] },
    "Anatomía y tipos, lo básico": { ic: "nut-and-bolt",
      sesion: [[5, "Busca un diagrama de las partes de una pistola semiautomática y uno de un revólver."],
               [15, "Haz tarjetas con cada parte y su función; repásalas hasta nombrarlas sin ver."],
               [5, "Escribe en una línea por qué el .22 es el calibre para aprender."]],
      sale: "Nombras las partes principales y su función, y entiendes las instrucciones de un instructor sin perderte.",
      subtemas: [
        { t: "Acción simple y doble", d: "En acción simple, el gatillo solo suelta el martillo, que ya estaba amartillado; la presión es ligera. En acción doble, el gatillo amartilla y suelta, con una presión más larga y pesada. Saberlo cambia cómo se presiona el gatillo.", l: [
          "Acción simple: recorrido corto y ligero.",
          "Acción doble: recorrido largo y pesado.",
          "Pregunta al instructor qué tipo es antes de disparar."] },
        { t: "Los seguros no sustituyen las reglas", d: "Muchas armas tienen seguros manuales o internos, pero ningún mecanismo es infalible. Las reglas de seguridad aplican aunque el seguro esté puesto: el seguro es una capa más, no la principal.", l: [
          "Nunca confíes solo en el seguro.",
          "Conoce dónde está y cómo funciona en cada arma.",
          "Las cuatro reglas mandan siempre."] },
        { t: "El retroceso y la física", d: "El retroceso viene de la conservación del momento: la bala sale hacia adelante y el arma empuja hacia atrás. Un calibre pequeño como el .22 produce poco retroceso, lo que permite aprender técnica sin desarrollar miedo al golpe.", l: [
          "Más peso del arma = menos retroceso sentido.",
          "Más calibre = más retroceso.",
          "Aprende primero con poco retroceso."] }] },
    "Fundamentos de puntería": { ic: "bullseye",
      sesion: [[5, "Con un instructor en el club, repasa los cinco fundamentos antes de disparar."],
               [20, "Practica postura, empuñadura y alineación de miras con el arma verificada descargada y bajo supervisión; luego tira series lentas de 5 disparos a 5 metros."],
               [5, "Mide el tamaño de tu grupo y anota qué fundamento te falló."]],
      sale: "Tu grupo de cinco disparos a 5 metros cabe en un círculo pequeño y sabes qué fundamento corregir.",
      subtemas: [
        { t: "El ojo solo enfoca una cosa", d: "El ojo humano no puede enfocar a la vez la mira trasera, la delantera y el blanco: están a distancias distintas. Por eso se enfoca la mira delantera, que es la que dice dónde apunta el cañón, y el blanco queda borroso.", l: [
          "Foco nítido en la mira delantera.",
          "El blanco borroso es correcto.",
          "Identifica tu ojo dominante antes de empezar."] },
        { t: "El ojo dominante", d: "Casi todos tenemos un ojo dominante. Para saber cuál es: haz un triángulo con las manos, mira un objeto lejano a través de él con ambos ojos y cierra uno: si el objeto sigue en el triángulo, el ojo abierto es el dominante.", l: [
          "Apunta con el ojo dominante.",
          "Si es el contrario a tu mano, el instructor te dirá cómo ajustar.",
          "Puedes tirar con ambos ojos abiertos con práctica."] },
        { t: "El control del gatillo", d: "La mayoría de los errores de puntería vienen del gatillo: tirar de golpe mueve el cañón justo al disparar. Una presión progresiva y recta, sin saber el momento exacto del disparo, mantiene la alineación.", l: [
          "Presión lenta y constante, recta hacia atrás.",
          "Deja que el disparo te sorprenda.",
          "Mantén el gatillo atrás un momento después del disparo."] }] },
    "Tu primera vez en el club": { ic: "ear",
      sesion: [[5, "Prepara lo que llevarás: identificación, ropa cómoda con cuello cerrado, zapato cerrado, y pregunta si prestan protección auditiva y visual."],
               [30, "Toma la clase con instructor: manejo, carga, descarga y comandos; dispara con .22 a 5 metros."],
               [5, "Anota los comandos del campo y lo que te corrigió el instructor."]],
      sale: "Hiciste tu primera clase con instructor, con protección, y saliste sabiendo cargar, descargar y obedecer los comandos.",
      subtemas: [
        { t: "El oído no se recupera", d: "Un disparo produce un pico de ruido de unos 140 a más de 160 decibeles, muy por encima del umbral que daña el oído. El daño por ruido es acumulativo y permanente. Por eso se usa doble protección: tapones y orejeras.", l: [
          "Tapones de espuma bien insertados + orejeras.",
          "Protégete aunque estés en el carril de al lado.",
          "Si después escuchas zumbido, la protección no fue suficiente."] },
        { t: "El plomo y la higiene", d: "Al disparar se liberan partículas de plomo de los fulminantes y proyectiles. Lavarse las manos con agua fría y jabón antes de comer o tocarse la cara, y no comer en el campo, reduce la exposición.", l: [
          "Lávate las manos al salir del campo.",
          "No comas ni bebas en la línea de tiro.",
          "Cambia de ropa al llegar a casa."] },
        { t: "Los comandos del campo", d: "Los campos de tiro funcionan con comandos claros del oficial de seguridad. Obedecerlos de inmediato es la regla más importante del lugar: el oficial ve riesgos que tú no ves.", l: [
          "«Alto el fuego»: dedo fuera, arma apuntando al frente.",
          "«Descargar y mostrar»: abrir y dejar verificar.",
          "Pregunta todo lo que no entiendas antes de empezar."] }] },
    "Los errores del principiante": { ic: "warning",
      sesion: [[5, "Revisa en el blanco de tu última sesión dónde se desviaron los disparos."],
               [20, "Con el instructor, practica en seco bajo supervisión la presión del gatillo con la moneda sobre el cañón, y una serie lenta con un cartucho inerte mezclado."],
               [5, "Anota si el arma se movió con el cartucho inerte: eso te dice si anticipas."]],
      sale: "Detectaste con el cartucho inerte si anticipas el retroceso y tienes un ejercicio para corregirlo.",
      subtemas: [
        { t: "La anticipación es un reflejo", d: "Anticipar el retroceso es una reacción natural de protección: el cuerpo se prepara para el golpe. Se corrige con repeticiones donde el disparo te sorprende, y con práctica en seco que enseña al cuerpo que la presión del gatillo no trae golpe.", l: [
          "Mezcla cartuchos inertes (lo prepara el instructor).",
          "Más práctica en seco que en vivo al principio.",
          "No te frustres: todos lo hacen al empezar."] },
        { t: "Leer el patrón de desvíos", d: "Los desvíos repetidos en una dirección dicen qué falla. Para un tirador diestro, los tiros bajos a la izquierda suelen ser tirón del gatillo o anticipación; los altos, empujar hacia el retroceso. El instructor usa estos patrones como diagnóstico.", l: [
          "Mira el grupo, no el disparo suelto.",
          "Pregunta al instructor por tu patrón.",
          "Corrige un fundamento a la vez."] },
        { t: "Calidad sobre cantidad", d: "Disparar mucho con malos hábitos los automatiza. Pocos disparos lentos y analizados mejoran más que cajas enteras de munición rápido. Es la misma idea de la práctica deliberada en cualquier deporte.", l: [
          "Series cortas de cinco, analizando cada una.",
          "Para cuando dejas de concentrarte.",
          "Anota qué corregiste en cada serie."] }] },
    "La cultura de la seguridad": { ic: "construction",
      sesion: [[5, "Repasa las cinco conductas de la cultura de seguridad."],
               [15, "En tu próxima visita al club, verifica tú mismo cada arma que te entreguen, aunque el instructor ya lo haya hecho, y observa cómo lo hacen los tiradores con experiencia."],
               [5, "Anota cualquier conducta insegura que hayas visto y cómo la manejó el club."]],
      sale: "Verificaste cada arma que tocaste y sabes cómo actuar si ves algo inseguro.",
      subtemas: [
        { t: "La cultura justa", d: "En aviación y medicina se habla de cultura justa: reportar errores sin castigo para aprender de ellos. Un buen club funciona igual: decir «barriste con el cañón» no es acusar, es proteger a todos.", l: [
          "Agradece cuando te corrijan.",
          "Corrige con respeto y sin humillar.",
          "Los veteranos también se equivocan."] },
        { t: "El disparo retardado", d: "Un hangfire es un disparo que tarda en salir después de que el percutor golpea. Por eso, ante un fallo, se mantiene el arma apuntando al blanco unos 30 segundos antes de abrirla. Abrirla de inmediato puede causar una lesión.", l: [
          "Ante un fallo: cañón al blanco, espera.",
          "Avisa al instructor.",
          "Nunca mires dentro del cañón."] },
        { t: "Alcohol y armas, nunca", d: "El alcohol reduce el juicio, la coordinación y el tiempo de reacción incluso en dosis bajas. Por eso los clubes serios lo prohíben antes y durante, y lo mismo aplica a medicamentos que causan sueño.", l: [
          "Cero alcohol antes de ir al club.",
          "Si estás muy cansado o tomaste medicamentos, no tires.",
          "Lo mismo al manejar después."] }] },
    "Tipos de práctica y qué te da cada una": { ic: "notebook",
      sesion: [[5, "Prepara tu libreta de tiro con columnas: fecha, arma, munición, distancia, tamaño del grupo y qué corregiste."],
               [25, "En el club, haz una sesión estructurada: series lentas de precisión, luego grupos de cinco medidos."],
               [5, "Anota el tamaño de tus grupos y el patrón de desvíos."]],
      sale: "Tu libreta tiene una sesión completa con grupos medidos y una corrección concreta para la siguiente.",
      copia: { t: "Libreta de tiro", l: [
        "Fecha | Arma | Munición | Distancia | Grupo (cm) | Patrón | Qué corregí",
        "__ | __ | __ | 5 m | __ | __ | __",
        "Objetivo de la sesión: ______"] },
      subtemas: [
        { t: "Medir el grupo", d: "El tamaño del grupo —la distancia entre los dos impactos más separados— mide tu consistencia. Un grupo cerrado pero desplazado se corrige ajustando miras o la postura; un grupo disperso es un problema de técnica.", l: [
          "Mide de centro a centro de los impactos más lejanos.",
          "Compara grupos a la misma distancia.",
          "Busca que se cierre semana tras semana."] },
        { t: "Práctica en seco segura", d: "La práctica en seco es la base de casi todos los programas de tiro, pero solo es segura con reglas estrictas: sin munición en la habitación, arma verificada, apuntando a un respaldo seguro. Para un principiante, lo mejor es hacerla con instructor o con una réplica.", l: [
          "Primero aprende el procedimiento con un instructor.",
          "Una réplica de entrenamiento elimina el riesgo.",
          "Termina la sesión con un ritual claro antes de cargar."] },
        { t: "El tiro deportivo como disciplina", d: "El tiro olímpico (pistola y rifle de aire, carabina) es uno de los deportes de precisión más exigentes: requiere control de respiración, del pulso y concentración. Muchos tiradores lo describen como meditación en movimiento.", l: [
          "Las armas de aire comprimido son una buena entrada.",
          "Se practica en interiores y a 10 metros.",
          "Entrena concentración que sirve fuera del club."] }] },
    "Limpieza y mantenimiento": { ic: "soap",
      sesion: [[5, "Pide en el club una demostración de limpieza con un arma de renta."],
               [20, "Con supervisión: descarga y verifica tres veces, munición fuera; limpia cañón con varilla y parches, cepilla y aplica poco aceite."],
               [5, "Anota el procedimiento en orden para tenerlo a la mano."]],
      sale: "Limpiaste un arma bajo supervisión siguiendo el orden de verificación sin saltarte pasos.",
      copia: { t: "Antes de limpiar", l: [
        "1. Quitar el cargador.",
        "2. Abrir la recámara y bloquearla abierta.",
        "3. Mirar la recámara y comprobar con el dedo.",
        "4. Sacar toda la munición de la habitación.",
        "5. Verificar una vez más antes de desarmar."] },
      subtemas: [
        { t: "Por qué se ensucia un arma", d: "Cada disparo deja residuos de pólvora, carbón y metal en el cañón y en el mecanismo. Con el tiempo, esos residuos afectan la precisión y causan fallos de alimentación o extracción, y atraen humedad que oxida.", l: [
          "Limpia después de cada sesión.",
          "Revisa resortes y piezas de desgaste.",
          "Guarda en lugar seco."] },
        { t: "Las listas de verificación salvan vidas", d: "Atul Gawande mostró en <i>The Checklist Manifesto</i> que listas cortas de verificación reducen errores en quirófanos y aviación. En la limpieza de armas, la lista de descarga es la que evita el accidente más común.", l: [
          "Sigue la lista aunque «ya sepas».",
          "Dila en voz alta mientras verificas.",
          "Si te interrumpen, empieza de nuevo."] },
        { t: "Poco aceite, en el lugar correcto", d: "El aceite protege contra la corrosión y reduce la fricción en las piezas que se deslizan. El exceso se mezcla con polvo y residuos y forma una pasta que causa fallos. Una película fina basta.", l: [
          "Una gota en rieles y puntos de fricción.",
          "Limpia el exceso con un trapo.",
          "Nada de aceite dentro del cañón al disparar."] }] },
    "Ética y responsabilidad": { ic: "folded-hands",
      sesion: [[5, "Lee de nuevo la jerarquía de la ficha de Defensa personal: evitar, desescalar, escapar."],
               [15, "Escribe tu postura personal sobre tener o no un arma, con las razones y las obligaciones que aceptarías."],
               [5, "Comenta tu postura con alguien de confianza y escucha su opinión."]],
      sale: "Tienes por escrito una postura razonada sobre tener o no un arma, con sus obligaciones.",
      subtemas: [
        { t: "La fuerza letal en la ley", d: "La legítima defensa en México exige una agresión real, actual e inminente, sin derecho del agresor, y una respuesta proporcional y necesaria. El uso de un arma se evalúa con todo rigor: un error cambia tu vida para siempre.", l: [
          "Proporcionalidad: la respuesta acorde a la amenaza.",
          "Necesidad: no había otra forma de evitarlo.",
          "Siempre consulta a un abogado después de cualquier incidente."] },
        { t: "El estrés extremo cambia todo", d: "Bajo amenaza real, el cuerpo vive visión de túnel, pérdida de motricidad fina, distorsión del tiempo y del oído. Por eso la precisión en el club no se traslada a la calle sin entrenamiento específico, y por eso evitar sigue siendo lo primero.", l: [
          "Tu puntería en el club no es tu puntería en crisis.",
          "El entrenamiento bajo estrés es especializado.",
          "Evitar y escapar siguen siendo lo mejor."] },
        { t: "La decisión de no tener", d: "Elegir no tener un arma es una decisión responsable tan válida como tenerla. Muchas personas practican tiro deportivo toda su vida sin tener armas en casa. Lo importante es que sea una decisión informada.", l: [
          "Puedes disfrutar el deporte sin poseer.",
          "Tu seguridad depende más de tus hábitos que de un objeto.",
          "Revisa tu decisión cuando cambie tu vida."] }] },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  pelear: {
    "La jerarquía: evitar, desescalar, escapar, pelear": { ic: "stop-sign",
      sesion: [[5, "Escribe las cuatro etapas en orden y una situación de tu vida diaria donde aplicaría cada una."],
               [15, "Revisa tus rutas y horarios habituales —gym, trabajo, Didi— y anota dos cambios que reducen riesgo: otra calle, otra hora, otro lugar para esperar."],
               [5, "Escribe tu regla ante un asalto con arma: entregar todo y salir."]],
      sale: "Hiciste dos cambios concretos en tus rutas o hábitos que te evitan riesgos.",
      subtemas: [
        { t: "El triángulo del delito", d: "La criminología ambiental explica que un delito necesita un agresor motivado, una víctima adecuada y la ausencia de vigilancia. Tú no controlas al agresor, pero sí puedes no parecer una víctima fácil y no estar sin vigilancia.", l: [
          "Lugares iluminados y con gente.",
          "Celular y cartera fuera de la vista.",
          "Rutas variadas si tu rutina es muy predecible."] },
        { t: "Lo que no vale tu vida", d: "Los instructores de defensa personal coinciden: ante un arma, se entrega lo material. Resistirse a un robo armado aumenta mucho la probabilidad de lesiones. Lo material se recupera con seguros; la vida y la salud no.", l: [
          "Entrega con calma y sin movimientos bruscos.",
          "No mires fijo a la cara del agresor.",
          "Después: denuncia y bloquea tarjetas y celular."] },
        { t: "Prepararte para lo material", d: "Reducir lo que puedes perder baja la tentación de resistirte: celular con respaldo y bloqueo remoto, poco efectivo, tarjetas bloqueables desde la app y documentos digitalizados.", l: [
          "Activa «Encontrar mi dispositivo» y el respaldo.",
          "Ten los teléfonos de tus bancos a mano.",
          "Una cartera señuelo con poco efectivo es una opción."] }] },
    "Conciencia situacional": { ic: "eyes",
      sesion: [[5, "Al salir hoy, guarda el celular y camina en amarillo: atento y relajado."],
               [15, "En cada lugar al que entres, localiza las salidas; en el coche, deja espacio para salir del carril al detenerte."],
               [5, "En la noche, anota cuántas salidas recuerdas de cada lugar donde estuviste."]],
      sale: "Recuerdas las salidas de los lugares donde estuviste hoy y caminaste sin celular en la mano.",
      subtemas: [
        { t: "El ciclo OODA", d: "John Boyd, piloto y estratega militar, describió el ciclo OODA: observar, orientarse, decidir y actuar. Quien lo completa más rápido gana la iniciativa. La conciencia situacional es la parte de observar y orientarse antes de que haga falta.", l: [
          "Observa antes de que haya problema.",
          "Ten un plan simple para cada lugar: ¿por dónde salgo?",
          "Decidir rápido es posible solo si ya observaste."] },
        { t: "Cómo eligen los agresores", d: "Un estudio clásico de Betty Grayson y Morris Stein mostró videos de peatones a reclusos: elegían víctimas por su forma de caminar —pasos irregulares, movimientos descoordinados, distraídos—, más que por tamaño o género.", l: [
          "Camina con paso firme y ritmo constante.",
          "Cabeza arriba, mirando el entorno.",
          "Si te sientes observado, cambia de acera o entra a un comercio."] },
        { t: "Confía en tu incomodidad", d: "Gavin de Becker (<i>El valor del miedo</i>) sostiene que la intuición detecta señales de peligro antes de que las razones conscientes. Sentir que algo no está bien es información: muévete antes de poder explicarlo.", l: [
          "Si algo te incomoda, cambia de lugar sin pena.",
          "No subas a un elevador con alguien que te da mala espina.",
          "Ser descortés es mejor que ser víctima."] }] },
    "Desescalar con la voz y el cuerpo": { ic: "open-hands",
      sesion: [[5, "Practica frente al espejo la postura: manos abiertas a la altura del pecho, pies en guardia suave, voz baja."],
               [15, "Ensaya en voz alta tres frases de desescalada: etiquetar la emoción, dar la razón y dar salida."],
               [5, "Escribe tu regla en el tráfico: ventana arriba y seguir."]],
      sale: "Tienes la postura de manos abiertas automatizada y tres frases de desescalada ensayadas.",
      copia: { t: "Frases para bajar la tensión", l: [
        "«Veo que estás muy molesto.»",
        "«Tienes razón, fue mi error. Ya me voy.»",
        "«No quiero problemas. Me retiro.»"] },
      subtemas: [
        { t: "La postura de la «valla»", d: "Instructores como Geoff Thompson enseñan «la valla»: manos abiertas al frente, como pidiendo calma. Comunica que no quieres pelear y, al mismo tiempo, mantiene la distancia y protege la cara si el otro ataca.", l: [
          "Palmas al frente, codos ligeramente doblados.",
          "Mantén la distancia de un brazo y medio.",
          "Si el otro avanza, retrocede en diagonal."] },
        { t: "El cerebro en amenaza", d: "Una persona enojada está en modo de amenaza y procesa menos los argumentos. Hablar despacio y bajo, frases cortas y validar su emoción ayudan a bajar la activación; discutir quién tiene razón la sube.", l: [
          "Frases cortas, sin argumentos largos.",
          "Valida la emoción, no la conducta.",
          "No exijas disculpas ni respeto en ese momento."] },
        { t: "El ego es el enemigo", d: "La mayoría de las peleas entre hombres empiezan por orgullo: una mirada, un empujón, un claxon. Ganar la discusión no vale una lesión, un juicio o tu visa. Retirarte es la decisión más fuerte disponible.", l: [
          "Pregúntate: ¿qué gano si «gano»?",
          "Deja que el otro se quede con la última palabra.",
          "Vete con tu salud y tu futuro intactos."] }] },
    "Guardia y distancia": { ic: "leg",
      sesion: [[5, "Adopta la guardia frente al espejo: pie dominante atrás, rodillas suaves, manos junto a la cara, barbilla metida."],
               [15, "Cinco minutos de desplazamiento adelante, atrás y a los lados sin cruzar los pies, en rondas de un minuto."],
               [5, "Termina con estiramiento de piernas y anota cómo se sintió el equilibrio."]],
      sale: "Te desplazas cinco minutos en guardia sin cruzar los pies y sin perder el equilibrio.",
      subtemas: [
        { t: "La base y el centro de gravedad", d: "Un cuerpo es más estable cuando su centro de gravedad está bajo y sobre una base amplia. Por eso la guardia tiene los pies separados y rodillas flexionadas: es más difícil empujarte o derribarte.", l: [
          "Pies a la anchura de hombros, uno adelante.",
          "Peso repartido, nunca en los talones.",
          "Rodillas suaves para reaccionar."] },
        { t: "Las distancias de combate", d: "En las artes marciales se distinguen distancias: patada, golpe con brazos, rodillas y codos, y agarre. Cada disciplina domina una. Saber en qué distancia estás te dice qué puede hacer el otro y qué puedes hacer tú.", l: [
          "Fuera de alcance: lo más seguro.",
          "Distancia de golpe: protege la cara.",
          "En agarre: baja el centro y busca salir."] },
        { t: "El juego de pies se entrena con cuerda", d: "Los boxeadores usan la cuerda para saltar para coordinación, ritmo y resistencia en las piernas. Diez minutos de cuerda mejoran el juego de pies y la condición a la vez.", l: [
          "Rondas de 2 minutos con 1 de descanso.",
          "Salta sobre las puntas, no sobre los talones.",
          "Varía: un pie, dos pies, alternando."] }] },
    "Los pocos golpes que valen la pena": { ic: "boxing-glove",
      sesion: [[5, "Calienta hombros, cadera y muñecas."],
               [20, "En costal o sombra, rondas de 2 minutos: jab, recto de atrás con giro de cadera, y combinación jab-recto; luego rodillazos al costal."],
               [5, "Estira y anota qué golpe sentiste con más técnica."]],
      sale: "Haces jab y recto con giro de cadera en rondas de dos minutos manteniendo la guardia arriba.",
      subtemas: [
        { t: "La cadena cinética", d: "La fuerza de un golpe viene del suelo: pies, piernas, cadera, tronco, hombro y brazo encadenados. El giro de cadera y del pie trasero aporta la mayor parte de la potencia; el brazo solo la transmite.", l: [
          "Gira el pie trasero como apagando un cigarro.",
          "Rota la cadera hacia el blanco.",
          "El brazo se extiende al final, relajado hasta el impacto."] },
        { t: "Proteger la mano", d: "El hueso más fracturado al golpear sin técnica es el quinto metacarpiano (la «fractura del boxeador»). Puño cerrado firme, muñeca recta y golpear con los dos primeros nudillos reduce el riesgo. En entrenamiento, vendas y guantes.", l: [
          "Pulgar fuera, cerrando los dedos.",
          "Muñeca recta alineada con el antebrazo.",
          "En la calle, la palma abierta también funciona y lastima menos tu mano."] },
        { t: "La guardia después de golpear", d: "El error de principiante es dejar caer la mano después de golpear. Cada golpe regresa a la guardia por el mismo camino. Es la diferencia entre golpear y recibir el contragolpe.", l: [
          "La mano regresa a la cara tan rápido como salió.",
          "La otra mano no se mueve de su lugar.",
          "Practica frente al espejo para verlo."] }] },
    "Salir de un agarre": { ic: "handshake",
      sesion: [[5, "Busca una clase de prueba o un compañero de entrenamiento para practicar con supervisión."],
               [20, "Con un compañero, practica despacio la salida de muñeca por el pulgar, la de abrazo por detrás y la de agarre de ropa, diez veces cada una."],
               [5, "Repite cada una más rápido y anota cuál te cuesta más."]],
      sale: "Sales de los tres agarres con un compañero que pone resistencia moderada.",
      subtemas: [
        { t: "Palancas y puntos débiles", d: "Un agarre es más débil donde los dedos se cierran, del lado del pulgar. Girar contra ese punto usa la palanca del antebrazo contra un solo dedo. Por eso funciona aunque el otro sea más fuerte.", l: [
          "Gira hacia el pulgar del agresor.",
          "Usa el cuerpo, no solo el brazo.",
          "Combínalo con un paso para crear distancia."] },
        { t: "Gritar es una técnica", d: "Gritar con fuerza llama la atención, puede sorprender al agresor y activa tu propia respiración y energía. Muchas escuelas de defensa personal lo entrenan: un «¡no!» fuerte o «¡aléjate!» cambia la dinámica.", l: [
          "Grita desde el abdomen, no desde la garganta.",
          "Usa palabras claras: «¡Aléjate!».",
          "Practícalo en clase: da pena al principio."] },
        { t: "Practicar con un compañero", d: "Las técnicas de agarre solo se aprenden con resistencia real. La progresión correcta es lenta y cooperativa al principio, luego con resistencia creciente. Un buen compañero cuida al otro.", l: [
          "Empieza al 30 % de velocidad.",
          "Comunica cuando algo duele: se suelta de inmediato.",
          "Sube la resistencia solo cuando salga limpio."] }] },
    "Qué disciplina entrenar": { ic: "martial-arts-uniform",
      sesion: [[5, "Busca tres gimnasios de boxeo, muay thai o jiu-jitsu a menos de 15 minutos de tu casa o trabajo."],
               [15, "Compara horarios con tu rutina, pregunta por clase de prueba y anota el costo mensual."],
               [5, "Agenda una clase de prueba esta semana en el que mejor encaje."]],
      sale: "Tienes una clase de prueba agendada en un gimnasio que encaja con tu horario.",
      subtemas: [
        { t: "Por qué el suelo importa", d: "Análisis de peleas reales y la experiencia de las artes marciales mixtas muestran que muchos enfrentamientos terminan en agarre o en el suelo. El jiu-jitsu brasileño se desarrolló justo para controlar a alguien más grande desde ahí.", l: [
          "Saber levantarte del suelo es vital.",
          "En la calle, el suelo es peligroso: puede haber más agresores.",
          "Objetivo en la calle: volver a estar de pie y salir."] },
        { t: "Cómo elegir una buena escuela", d: "Una buena escuela tiene instructores con trayectoria comprobable, entrenamiento con resistencia real (sparring o rodar), ambiente respetuoso y énfasis en la seguridad. Desconfía de promesas de «técnicas secretas» o de quien nunca entrena contra resistencia.", l: [
          "Pregunta por la trayectoria del instructor.",
          "Observa una clase antes de inscribirte.",
          "Busca que haya entrenamiento con resistencia."] },
        { t: "La constancia gana a la disciplina", d: "Cualquier arte marcial sirve más si entrenas dos veces por semana durante un año que si cambias de escuela cada mes. El progreso real en combate se mide en meses y años, no en semanas.", l: [
          "Compromete un mínimo de tres meses.",
          "Dos clases por semana son suficientes.",
          "Revisa a los tres meses si sigue encajando."] }] },
    "El sparring es la parte que no se puede saltar": { ic: "person-fencing",
      sesion: [[5, "Pregunta a tu instructor cuándo estás listo para tu primer sparring ligero y qué protección necesitas."],
               [20, "Haz tu primer sparring técnico al 30 % de intensidad: rondas de dos minutos con un compañero experimentado."],
               [5, "Anota qué pasó con tu respiración, tu guardia y tu visión cuando recibiste un golpe."]],
      sale: "Hiciste sparring ligero sin perder la guardia ni la respiración por completo, y sabes qué mejorar.",
      subtemas: [
        { t: "La inoculación al estrés", d: "Donald Meichenbaum desarrolló el entrenamiento de inoculación al estrés: exponerte a dosis manejables de estrés para que la respuesta real no te paralice. El sparring es eso aplicado al combate.", l: [
          "Empieza suave y sube la intensidad poco a poco.",
          "Respira de forma consciente entre rondas.",
          "Cada sesión te acostumbra a la adrenalina."] },
        { t: "La conmoción es acumulativa", d: "Los golpes repetidos en la cabeza, incluso los que no noquean, se asocian con daño cerebral a largo plazo, como la encefalopatía traumática crónica. Por eso los buenos gimnasios limitan el sparring fuerte y usan protección.", l: [
          "La mayoría del sparring debe ser técnico y ligero.",
          "Casco, bucal y guantes de entrenamiento adecuados.",
          "Ante mareo, dolor de cabeza o confusión: para y consulta."] },
        { t: "Aprender a recibir", d: "Lo que más enseña el sparring es mantener la calma cuando te pegan: no cerrar los ojos, no dar la espalda, no congelarte. Es un aprendizaje emocional, no solo técnico.", l: [
          "Mantén los ojos abiertos detrás de la guardia.",
          "Exhala al recibir un golpe al cuerpo.",
          "Si te abrumas, pide tiempo y respira."] }] },
    "La condición física decide la pelea": { ic: "running-shoe",
      sesion: [[5, "Calienta 5 minutos de trote suave o cuerda."],
               [15, "Intervalos: 10 rondas de 30 segundos al máximo (golpes al costal, burpees o sprints) con 30 segundos de descanso."],
               [5, "Ejercicios de cuello y core: planchas y puente de cuello suave; estira."]],
      sale: "Completaste los 10 intervalos sin bajar mucho el ritmo y trabajaste cuello y core.",
      subtemas: [
        { t: "Los sistemas de energía", d: "Un esfuerzo máximo de pocos segundos usa sobre todo el sistema de fosfocreatina; uno de 30 a 90 segundos, la glucólisis, que produce mucha fatiga; más largo, el aeróbico. Una pelea agota los dos primeros muy rápido, por eso el entrenamiento por intervalos es clave.", l: [
          "Intervalos cortos y muy intensos para la explosividad.",
          "Base aeróbica (natación, trote) para recuperarte entre esfuerzos.",
          "Ambos se complementan."] },
        { t: "La adrenalina gasta energía", d: "La descarga de adrenalina acelera el corazón y la respiración antes de que empiece cualquier esfuerzo. Por eso una persona sin entrenamiento se agota en segundos en una situación real, aunque esté en buena forma general.", l: [
          "La respiración controlada ayuda a gestionarla.",
          "El sparring entrena el cuerpo para esa descarga.",
          "La condición física te da margen."] },
        { t: "Cuello y core", d: "Un cuello fuerte ayuda a estabilizar la cabeza ante un impacto y un core fuerte transmite fuerza y protege la espalda. Son grupos musculares que casi nadie entrena en el gym convencional.", l: [
          "Isométricos de cuello con la mano, suaves.",
          "Planchas frontales y laterales.",
          "Rotaciones con banda o polea para el tronco."] }] },
    "La ley y las consecuencias": { ic: "balance-scale",
      sesion: [[5, "Lee qué dice el Código Penal de tu entidad sobre la legítima defensa."],
               [15, "Escribe tres ejemplos: uno que sí es legítima defensa, uno que se pasa de la proporción y uno de persecución."],
               [5, "Guarda en tu celular los pasos a seguir después de un incidente: 911, quedarte, testigos, cámaras, reporte en Didi."]],
      sale: "Distingues defensa proporcional de exceso y tienes guardados los pasos después de un incidente.",
      copia: { t: "Después de un incidente", l: [
        "1. Ponerme a salvo y llamar al 911.",
        "2. Quedarme en el lugar si es seguro.",
        "3. Pedir datos de testigos.",
        "4. Ubicar cámaras (comercios, la del coche).",
        "5. No declarar de más sin asesoría legal.",
        "6. Si fue en Didi: reportar en la app y guardar el video."] },
      subtemas: [
        { t: "Los requisitos de la legítima defensa", d: "El Código Penal Federal y los estatales coinciden en lo básico: repeler una agresión real, actual o inminente y sin derecho, defendiendo bienes jurídicos propios o ajenos, con necesidad racional de la defensa y sin provocación suficiente de tu parte.", l: [
          "Real y actual: no amenazas pasadas ni futuras.",
          "Necesidad racional: el medio proporcional.",
          "No haber provocado la agresión."] },
        { t: "Los antecedentes y la visa", d: "Para la visa de estudiante y el permiso de residencia en Alemania se piden documentos que pueden incluir antecedentes penales. Un proceso penal, aunque termine bien, puede retrasar trámites y costar mucho dinero en abogados.", l: [
          "Tu proyecto de Alemania vale más que cualquier pelea.",
          "Evitar es también proteger tu futuro.",
          "Si pasa algo, busca asesoría legal de inmediato."] },
        { t: "Las cámaras como testigos", d: "Una cámara de tablero (dashcam) y las cámaras de comercios son la mejor evidencia en un conflicto. Muchas graban en bucle y borran en días: hay que pedir y guardar el video pronto.", l: [
          "Instala una dashcam que grabe adelante y la cabina.",
          "Guarda el video en cuanto pase algo.",
          "Pide a los comercios el video el mismo día."] }] },
    "Tu plan de 12 semanas": { ic: "spiral-calendar",
      sesion: [[5, "Pon en tu calendario las cinco etapas del plan con fechas concretas."],
               [15, "Haz hoy lo de las semanas 1 y 2: elige tus rutas, guarda el celular al caminar y localiza salidas."],
               [5, "Agenda la búsqueda de gimnasio para la semana 3."]],
      sale: "Las doce semanas están en tu calendario y ya empezaste la parte de conciencia situacional.",
      subtemas: [
        { t: "Priorizar lo que más protege", d: "El plan va de lo más barato y protector (conciencia) a lo más costoso (técnica y sparring). Es el mismo principio de la gestión de riesgos: primero las medidas que reducen más riesgo por menos esfuerzo.", l: [
          "La conciencia situacional es gratis y protege más.",
          "La técnica viene después, con constancia.",
          "No te saltes las semanas de base."] },
        { t: "Integrar con tu rutina actual", d: "Sumar dos clases de combate a la semana a tu gym y natación puede ser mucho volumen. Ajusta: una sesión de gym puede convertirse en clase, o reduce un día de pesas. El descanso sigue siendo parte del entrenamiento.", l: [
          "No agregues sin quitar algo.",
          "Vigila el sueño y el dolor articular.",
          "Usa la ficha de Recuperarte para equilibrar."] },
        { t: "Medir el progreso", d: "El progreso en defensa personal se mide con hechos: cuántas rondas aguantas, si mantienes la guardia cansado, si recuerdas las salidas sin pensarlo. Anotarlo te muestra el avance que no se siente.", l: [
          "Rondas completas sin bajar la guardia.",
          "Intervalos completados.",
          "Situaciones evitadas o desescaladas."] }] },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  decirno: {
    "Por qué cuesta tanto": { ic: "anxious-face-with-sweat",
      sesion: [[5, "Recuerda las últimas tres veces que dijiste que sí sin querer."],
               [15, "Para cada una, escribe qué miedo pesó más: conflicto, perder la relación o perder la oportunidad, y qué te costó en tiempo o dinero."],
               [5, "Escribe cuál es tu miedo principal y qué tarea te toca según el paso."]],
      sale: "Sabes cuál de los tres miedos te domina y cuánto te costaron tus últimos tres «sí» no deseados.",
      subtemas: [
        { t: "Agradar como hábito", d: "La psicología llama complacencia (people pleasing) al patrón de priorizar la aprobación ajena sobre las propias necesidades. Suele venir de aprender en la infancia que el afecto dependía de agradar. Reconocer el origen quita culpa y permite cambiarlo.", l: [
          "No es un defecto de carácter: es un hábito aprendido.",
          "Se desaprende con práctica, como cualquier hábito.",
          "Empieza por notar cuándo lo haces."] },
        { t: "Sobreestimamos el enojo ajeno", d: "Investigaciones de Vanessa Bohns muestran que sobreestimamos cuánto se molestará el otro si le decimos que no y cuánto nos juzgará. La reacción real suele ser más leve y olvidarse antes de lo que imaginamos.", l: [
          "Tu predicción del enojo ajeno está inflada.",
          "Compara lo que temías con lo que pasó.",
          "La mayoría acepta un no educado sin problema."] },
        { t: "El costo de oportunidad de cada sí", d: "Cada sí consume tiempo, dinero o energía que ya no podrás usar en otra cosa. Pensar en lo que pierdes —una tarde de estudio, un ahorro del mes— convierte un sí cómodo en una decisión visible.", l: [
          "Antes de aceptar: ¿a qué le estoy quitando tiempo?",
          "Traduce cada sí a horas o pesos.",
          "Tus metas también merecen tu sí."] }] },
    "La fórmula de tres partes": { ic: "memo",
      sesion: [[5, "Escribe tu versión de la fórmula: agradecimiento, negativa clara y cierre."],
               [10, "Dila en voz alta diez veces hasta que salga natural, sin «es que» ni explicaciones."],
               [5, "Guárdala en una nota del celular y úsala en la siguiente petición que no quieras aceptar."]],
      sale: "Tu frase de tres partes sale de memoria y en voz firme, sin justificaciones.",
      copia: { t: "Tu frase de tres partes", l: [
        "Gracias por pensar en mí.",
        "Esta vez no voy a poder.",
        "Que les vaya increíble."] },
      subtemas: [
        { t: "«No» frente a «no puedo»", d: "Un estudio de Vanessa Patrick y Henrik Hagtvedt encontró que decir «no hago eso» funcionaba mejor para mantener metas que «no puedo». «No hago» expresa una decisión propia; «no puedo» suena a obstáculo que el otro intenta resolver.", l: [
          "«No hago préstamos» cierra la discusión.",
          "«No puedo prestarte» invita a resolver por qué.",
          "Usa reglas personales cuando apliquen."] },
        { t: "La brevedad comunica firmeza", d: "Un no corto se percibe como decidido; uno largo, como negociable. Cada palabra extra suena a duda. La fórmula de tres partes cabe en quince segundos y deja poco que discutir.", l: [
          "Tres frases, no tres párrafos.",
          "Después de decirla, calla.",
          "Si preguntan por qué, repite la negativa."] },
        { t: "El tono amable no es débil", d: "Decir que no con calidez —sonrisa, agradecimiento sincero— protege la relación sin debilitar la negativa. La firmeza está en las palabras; la amabilidad, en el tono.", l: [
          "Firme en el qué, amable en el cómo.",
          "Mira a los ojos al decirlo.",
          "Agradece de verdad que pensaron en ti."] }] },
    "Di el \"no\" al principio, no al final": { ic: "up-arrow",
      sesion: [[5, "Busca un mensaje reciente donde dijiste que no con rodeos."],
               [10, "Reescríbelo con la negativa en la primera línea y el contexto después."],
               [5, "Aplica el formato en el próximo correo o mensaje de negativa."]],
      sale: "Tu próxima negativa por escrito lleva el «no» en la primera línea.",
      subtemas: [
        { t: "BLUF: lo importante primero", d: "El ejército de Estados Unidos usa BLUF (Bottom Line Up Front): la conclusión al inicio del mensaje. Se adoptó en el mundo corporativo porque la gente lee lo primero y a veces solo eso.", l: [
          "Primera línea: la respuesta.",
          "Segunda: el contexto mínimo.",
          "Tercera: el siguiente paso, si hay."] },
        { t: "El efecto de primacía", d: "Recordamos mejor lo que se dice primero. Si la negativa va al principio, queda clara; si va al final después de rodeos, el otro ya formó su impresión de que tal vez sí.", l: [
          "Empieza por la decisión.",
          "No uses introducciones largas.",
          "Lo primero que oye es lo que se lleva."] },
        { t: "Correos en alemán, al grano", d: "En la cultura laboral alemana se valora la comunicación directa: un «no» claro se considera respetuoso porque no hace perder tiempo. Practicar decir el no al principio te prepara para trabajar allá.", l: [
          "«Leider kann ich das nicht übernehmen» = lamentablemente no puedo encargarme.",
          "La cortesía va en el saludo y la despedida, no en rodeos.",
          "Los rodeos pueden parecer falta de claridad."] }] },
    "Las tres muletillas que convierten un no en un quizá": { ic: "exclamation-question-mark",
      sesion: [[5, "Escribe las tres muletillas en un papel y pégalo donde lo veas."],
               [15, "Durante el día, cada vez que vayas a decir «por ahora», «déjame ver» o «tal vez después» sin intención real, cámbialo por un no claro."],
               [5, "En la noche, cuenta cuántas veces lo lograste."]],
      sale: "Pasaste un día sin usar las muletillas por cobardía.",
      subtemas: [
        { t: "La ambigüedad se interpreta a favor del que pide", d: "Ante una respuesta ambigua, la persona que pide tiende a entender lo que quiere oír. Es el sesgo de optimismo y de deseo. Por eso «déjame ver» suele quedar registrado como un sí.", l: [
          "Si no es sí, no lo dejes sonar a sí.",
          "Si de verdad lo vas a pensar, da fecha.",
          "Una respuesta clara evita malentendidos."] },
        { t: "Las explicaciones como puertas", d: "Cada razón que das es un problema que el otro puede resolver: «no tengo coche» → «yo te llevo». Por eso los expertos en asertividad recomiendan explicaciones mínimas o ninguna.", l: [
          "No necesitas justificar tu tiempo.",
          "Si das una razón, que sea una y verdadera.",
          "Si la resuelven, el no sigue siendo no."] },
        { t: "Cuándo dejar la puerta abierta", d: "A veces sí quieres decir «ahora no, pero después sí». Hazlo explícito y con fecha: «este mes no puedo; en marzo sí, escríbeme». Así la puerta abierta es una decisión, no una evasión.", l: [
          "Pon fecha o condición concreta.",
          "Cumple si te vuelven a buscar.",
          "Si no piensas hacerlo nunca, no lo ofrezcas."] }] },
    "Practica donde no cuesta nada": { ic: "seedling",
      sesion: [[5, "Practica en voz alta, solo, tu frase de negativa tres veces."],
               [15, "Di un no limpio en una situación de bajo riesgo: un vendedor, una encuesta, una promoción, una invitación sin importancia."],
               [5, "Anota en tu registro la situación y si cediste o no."]],
      sale: "Hiciste una negativa limpia en una situación de bajo riesgo y la registraste.",
      copia: { t: "Tu registro de negativas", l: [
        "Fecha | Quién | Qué pidió | ¿Dije no? | ¿Me justifiqué? | Cómo me sentí (0-10)",
        " | | | | |",
        "Meta de dos semanas: 3 negativas limpias"] },
      subtemas: [
        { t: "Exposición gradual", d: "Igual que con cualquier miedo, la forma más eficaz de perderle miedo al no es practicarlo de menos a más. Empezar donde no cuesta nada construye confianza para cuando sí importe.", l: [
          "Empieza con desconocidos sin consecuencias.",
          "Sube a conocidos y luego a cercanos.",
          "No saltes al caso más difícil."] },
        { t: "El ensayo en voz alta", d: "Decir algo en voz alta antes de necesitarlo crea una huella motora: la boca ya sabe cómo sale. Los actores y oradores ensayan por eso; las negociaciones difíciles, también.", l: [
          "Ensaya en el coche o en la regadera.",
          "Usa las palabras exactas que dirás.",
          "Repite hasta que suene aburrido."] },
        { t: "Registrar para ver el patrón", d: "Sin registro, la memoria te engaña: recuerdas menos veces de las que cediste. El registro te muestra con quién, cuándo y por qué cedes, que es la información para el paso siguiente.", l: [
          "Anota en el momento o esa misma noche.",
          "Incluye las veces que cediste, sin juzgarte.",
          "Revisa el registro cada domingo."] }] },
    "Encuentra tus dos o tres puntos débiles": { ic: "magnifying-glass-tilted-left",
      sesion: [[5, "Revisa tu registro de las últimas dos semanas."],
               [15, "Agrupa las veces que cediste por persona, tipo de petición y hora del día; identifica tus dos o tres puntos débiles."],
               [5, "Escribe la frase preparada para cada punto débil."]],
      sale: "Tienes identificados tus dos o tres puntos débiles y una frase lista para cada uno.",
      subtemas: [
        { t: "El cansancio y las decisiones", d: "Al final del día tomamos peores decisiones y aceptamos más fácil lo que no queremos. Aunque la teoría del agotamiento de la voluntad está en debate, la experiencia es clara: cuando estás cansado, aplaza las respuestas importantes.", l: [
          "Si te piden algo de noche, contesta mañana.",
          "Identifica tu hora débil.",
          "Prepara la respuesta cuando estás descansado."] },
        { t: "Las intenciones si-entonces", d: "Gollwitzer mostró que preparar respuestas del tipo «si mi tío me pide prestado, entonces digo: ese dinero ya está comprometido» aumenta mucho la probabilidad de actuar como quieres en el momento difícil.", l: [
          "Una frase si-entonces por punto débil.",
          "Que sea concreta y corta.",
          "Repásalas antes de ver a esa persona."] },
        { t: "El gasto que parece pequeño", d: "Los gastos pequeños y frecuentes —un café, una salida, una cooperación— se aceptan sin pensar porque cada uno parece insignificante. Sumados al mes, pueden ser tu ahorro entero. Es uno de los puntos débiles más comunes.", l: [
          "Suma tus gastos pequeños de un mes en Finanzas.",
          "Define un tope mensual para cooperaciones y salidas.",
          "Cuando se llena, la respuesta es no."] }] },
    "La frase que compra tiempo": { ic: "hourglass-not-done",
      sesion: [[5, "Escribe tu frase para comprar tiempo con fecha: «déjame revisarlo y te confirmo mañana a las ______»."],
               [10, "Úsala ante la siguiente petición inesperada y no respondas en el momento."],
               [5, "Al día siguiente, contesta a la hora prometida, aunque sea un no."]],
      sale: "Usaste la frase con fecha y contestaste a tiempo con una decisión tomada con calma.",
      subtemas: [
        { t: "La brecha de empatía frío-caliente", d: "George Loewenstein describió que en un estado emocional «caliente» (presión, entusiasmo, culpa) decidimos distinto que en uno «frío». Comprar tiempo te permite decidir en frío.", l: [
          "En caliente, no comprometas.",
          "Duerme la decisión.",
          "Decide cuando ya bajó la emoción."] },
        { t: "Responder por escrito", d: "Para muchas personas es más fácil decir que no por mensaje que en persona, porque no hay que sostener la mirada ni la reacción inmediata. Comprar tiempo te permite usar ese canal sin evadir.", l: [
          "Escribe la negativa con la fórmula de tres partes.",
          "No te disculpes en exceso.",
          "Mándala a la hora que prometiste."] },
        { t: "Cumplir el plazo construye confianza", d: "Si dices «te confirmo mañana» y no lo haces, pierdes credibilidad y el otro te persigue. Cumplir el plazo, aunque sea para decir que no, muestra respeto y te da fama de serio.", l: [
          "Pon un recordatorio al decir la frase.",
          "Contesta antes de que te pregunten.",
          "Un no a tiempo es mejor que un silencio."] }] },
    "Cuando insisten: el disco rayado": { ic: "optical-disk",
      sesion: [[5, "Escribe tu frase de disco rayado: «Te entiendo, y aun así no voy a poder»."],
               [15, "Practica con alguien de confianza que insista con argumentos distintos; tú repites la misma frase con calma, sin nuevas razones."],
               [5, "Anota cuántas veces te sentiste tentado a explicar y no lo hiciste."]],
      sale: "Sostuviste la misma frase ante tres insistencias distintas sin subir el tono ni dar razones nuevas.",
      subtemas: [
        { t: "El banco de niebla", d: "Manuel J. Smith describe también el «banco de niebla»: reconocer lo que hay de cierto en lo que dice el otro sin cambiar tu decisión. «Puede que tengas razón en que sería divertido, y no voy a ir». No discutes, no cedes.", l: [
          "Reconoce sin discutir: «puede ser».",
          "Mantén tu decisión intacta.",
          "Combínalo con el disco rayado."] },
        { t: "Por qué insiste la gente", d: "Muchas personas insisten porque antes les funcionó: si cediste otras veces después de la tercera insistencia, aprendieron que insistir paga. Es refuerzo intermitente, el más difícil de extinguir.", l: [
          "Cada vez que cedes, enseñas a insistir.",
          "Al principio insistirán más: es normal.",
          "Si sostienes, la insistencia baja con el tiempo."] },
        { t: "Nombrar la insistencia", d: "Cuando alguien insiste por tercera vez, nombrarlo («ya te dije que no; ¿hay algo que no quedó claro?») hace visible la presión y suele terminar la conversación. Es incómodo y eficaz.", l: [
          "Dilo con calma, no con enojo.",
          "Pregunta, no acuses.",
          "Si sigue, termina la conversación con amabilidad."] }] },
    "Separa el no a la persona del no a la petición": { ic: "red-heart",
      sesion: [[5, "Piensa en alguien querido a quien te cuesta decir que no."],
               [15, "Escribe tu negativa con la estructura: afecto explícito a la persona + no concreto a la petición + alternativa si existe."],
               [5, "Úsala la próxima vez que esa persona te pida algo que no quieres."]],
      sale: "Dijiste que no a alguien querido dejando claro que la relación no está en juego.",
      subtemas: [
        { t: "El amor no depende de la utilidad", d: "Las relaciones sanas no dependen de lo que haces por el otro. Si una relación se rompe por un no razonable, era una relación transaccional. Brené Brown dice que las personas más compasivas que estudió también eran las que tenían límites más claros.", l: [
          "Los límites protegen las relaciones, no las rompen.",
          "Quien te quiere acepta tus no.",
          "Si alguien solo te quiere cuando dices sí, es información."] },
        { t: "La culpa no es evidencia", d: "Sentir culpa al decir que no no significa que hiciste algo malo: significa que rompiste una costumbre. La culpa sana aparece cuando dañas a alguien; la que aparece al cuidar tus límites es un hábito emocional.", l: [
          "Pregúntate: ¿hice daño o solo puse un límite?",
          "La culpa baja con la repetición.",
          "Siente la culpa sin obedecerla."] },
        { t: "Ofrecer lo que sí puedes", d: "Una alternativa genuina transforma un no en un «esto sí»: no puedes prestar dinero, pero puedes ayudar con un trámite. Muestra interés por la persona sin comprometer lo que no quieres dar.", l: [
          "Ofrece solo lo que de verdad quieres dar.",
          "Que la alternativa sea concreta.",
          "No ofrezcas para calmar tu culpa."] }] },
    "Con la familia — el caso más difícil en México": { ic: "house",
      sesion: [[5, "Revisa en Finanzas tus compromisos del mes: deudas, ahorro, metas; anótalos como «dinero ya comprometido»."],
               [15, "Escribe tu respuesta a la petición familiar más probable usando el compromiso concreto y una alternativa que sí puedes dar."],
               [5, "Decide de antemano tu tope de apoyo familiar del mes, si lo hay."]],
      sale: "Tienes una respuesta preparada basada en compromisos concretos y un tope de apoyo familiar definido de antemano.",
      copia: { t: "Una negativa a la familia", l: [
        "Te quiero mucho y me importa lo que te pasa.",
        "Ese dinero ya está comprometido para ______ este mes.",
        "Lo que sí puedo hacer es ______.",
        "(Si insiste) Entiendo que te preocupa. Aun así, no puedo con eso."] },
      subtemas: [
        { t: "El familismo en México", d: "Los estudios sobre familias mexicanas describen el familismo: una fuerte lealtad y obligación hacia la familia extendida. Es una fortaleza —apoyo, pertenencia— que a veces se vuelve presión para ceder recursos o tiempo.", l: [
          "Valora la red familiar sin sacrificar tu plan.",
          "Ayudar con un tope es sostenible; sin tope, no.",
          "Habla de tu plan para que entiendan tus no."] },
        { t: "Prestar a familiares", d: "Muchos asesores financieros recomiendan prestar a familiares solo lo que podrías regalar, porque una parte importante de esos préstamos no se recupera y deja resentimiento. Si no podrías perderlo, la respuesta es no.", l: [
          "Presta solo lo que podrías regalar.",
          "Si prestas, por escrito y con fechas.",
          "Mejor regalar poco que prestar mucho."] },
        { t: "Tu plan como argumento", d: "Tener metas escritas con fechas (deudas, ahorro para Alemania) convierte un no personal en un no por compromiso. Es más fácil de aceptar para la familia y menos doloroso para ti.", l: [
          "Comparte tu meta: «estoy ahorrando para la maestría».",
          "Muéstrales tus fechas si ayuda.",
          "Celebra con ellos cuando la cumplas."] }] },
    "Decir que no en el trabajo": { ic: "briefcase",
      sesion: [[5, "Haz la lista de tus tareas activas en el trabajo con su prioridad y fecha."],
               [15, "Ante la siguiente petición extra, responde con la frase de priorización y deja que tu jefe decida qué se mueve."],
               [5, "Anota la decisión que tomó y cómo quedó tu carga."]],
      sale: "Respondiste a una petición extra poniendo el costo sobre la mesa y la prioridad quedó decidida por quien correspondía.",
      copia: { t: "Priorizar en vez de negar", l: [
        "Con gusto lo tomo. Ahorita tengo ______ (fecha) y ______ (fecha).",
        "¿Cuál de esas movemos para que entre esto?",
        "Con un compañero: Hoy no puedo, tengo ______. Si sigues atorado el ______, lo vemos."] },
      subtemas: [
        { t: "La matriz de Eisenhower", d: "Clasifica tareas por urgencia e importancia: lo importante y urgente se hace; lo importante no urgente se agenda; lo urgente no importante se delega; lo demás se elimina. Usarla te da criterio para negociar prioridades.", l: [
          "Antes de aceptar, ubica la petición en la matriz.",
          "Lo importante no urgente es donde está tu crecimiento.",
          "Comparte el criterio con tu jefe."] },
        { t: "La ley de Parkinson del trabajo", d: "Cyril Parkinson observó que el trabajo se expande hasta llenar el tiempo disponible. Si aceptas todo, todo se vuelve urgente y nada se hace bien. Proteger tu capacidad es proteger la calidad.", l: [
          "Pon fechas realistas, no optimistas.",
          "Deja margen para imprevistos.",
          "La calidad cae cuando todo es prioridad."] },
        { t: "Hablar del patrón, no de la tarea", d: "Si te llegan tareas fuera de tu rol con frecuencia, discutir cada una agota. Hablar del patrón con tu jefe —y proponer una solución— resuelve el problema de fondo y te posiciona como alguien que piensa en el equipo.", l: [
          "Junta ejemplos concretos con fechas.",
          "Propón: rotación, otro responsable o ajuste de rol.",
          "Hazlo en una reunión, no en un pasillo."] }] },
    "La prueba del \"sí absoluto\"": { ic: "thumbs-up",
      sesion: [[5, "Piensa en una invitación o compromiso pendiente de responder."],
               [10, "Aplica las tres pruebas: ¿es un «¡claro que sí!»?, ¿qué le dirías a un amigo?, ¿sientes alivio o peso al imaginarlo mañana?"],
               [5, "Responde según el resultado, hoy."]],
      sale: "Respondiste un compromiso pendiente usando las tres pruebas y no te arrepentiste.",
      subtemas: [
        { t: "El sesgo del yo futuro", d: "Gal Zauberman y John Lynch encontraron que creemos que en el futuro tendremos más tiempo libre que hoy, por eso aceptamos compromisos lejanos que no aceptaríamos para mañana. La prueba de «es mañana» corrige ese sesgo.", l: [
          "Pregúntate: ¿lo aceptaría si fuera mañana?",
          "Tu calendario futuro estará igual de lleno.",
          "Lo lejano también cuesta."] },
        { t: "Esencialismo", d: "Greg McKeown propone la regla del 90 %: evalúa una opción del 0 al 100 según tu criterio más importante; si no llega a 90, es un no. Parece extremo, pero libera tiempo para lo que sí es excelente.", l: [
          "Define tu criterio principal (tus metas del año).",
          "Si no es un 9 de 10, es no.",
          "Lo bueno es enemigo de lo excelente."] },
        { t: "La distancia psicológica", d: "Aconsejar a otro es más fácil que decidir por ti porque ves su caso con distancia. Ethan Kross encontró que hablarte en tercera persona («¿qué debería hacer Adán?») da esa misma distancia y mejora el juicio.", l: [
          "Pregúntate en tercera persona.",
          "Imagina que se lo cuentas a un amigo.",
          "Escucha tu propio consejo."] }] },
    "Decirte que no a ti mismo": { ic: "mobile-phone-off",
      sesion: [[5, "Escribe tus tres «sí» impulsivos más frecuentes: scroll, compras, proyectos nuevos."],
               [15, "Para cada uno, decide una regla de antemano y un obstáculo: app con límite, tarjeta fuera de las apps, lista de proyectos en espera."],
               [5, "Activa hoy al menos uno de los obstáculos."]],
      sale: "Tienes tres reglas escritas y al menos un obstáculo activo contra tus impulsos.",
      subtemas: [
        { t: "La arquitectura de las decisiones", d: "Richard Thaler y Cass Sunstein (<i>Nudge</i>) muestran que cambiar el entorno cambia las decisiones. Quitar la tarjeta guardada, mover apps de la pantalla principal o poner límites de tiempo reduce los impulsos sin depender de la voluntad.", l: [
          "Agrega fricción a lo que quieres evitar.",
          "Quita fricción a lo que quieres hacer.",
          "El entorno vence a la voluntad."] },
        { t: "La lista de «después»", d: "Las ideas nuevas son tentadoras porque prometen emoción sin el aburrimiento de terminar. Anotarlas en una lista de «después» te deja decir que no sin perderlas, y terminar lo que ya empezaste.", l: [
          "Toda idea nueva va a la lista de después.",
          "Revisa la lista solo al terminar un proyecto.",
          "La mayoría pierde su brillo en un mes."] },
        { t: "El precompromiso", d: "Ulises se ató al mástil para no ceder al canto de las sirenas. Los economistas llaman precompromiso a atarte de antemano: ahorro automático, bloqueo de apps, dejar la tarjeta en casa. Es decidir cuando tienes la cabeza fría.", l: [
          "Automatiza el ahorro el día de pago.",
          "Bloquea apps en tus horas de estudio.",
          "Sal sin tarjeta de crédito si vas de paseo."] }] },
    "Mide el resultado, no la sensación": { ic: "bar-chart",
      sesion: [[5, "Abre tu registro de negativas y Finanzas del mes."],
               [15, "Cuenta tus no del mes, revisa gastos fuera de plan y compara tus bloques de gym y estudio cumplidos contra el mes pasado."],
               [5, "Escribe tus tres números del mes y el objetivo del siguiente."]],
      sale: "Tienes tus tres números del mes —noes dichos, gastos fuera de plan y bloques cumplidos— y un objetivo para el siguiente.",
      copia: { t: "Revisión mensual de límites", l: [
        "Mes: ______",
        "Noes dichos a cosas que antes aceptaba: ___",
        "Gastos fuera de plan aceptados por no incomodar: $___",
        "Bloques de gym y estudio cumplidos: ___ de ___",
        "Horas de la semana en cosas que no elegí: ___",
        "Objetivo del siguiente mes: ______"] },
      subtemas: [
        { t: "Indicadores adelantados y atrasados", d: "En gestión se distingue entre indicadores atrasados (el resultado final: ahorro, avance) y adelantados (las conductas que lo producen: noes dichos, gastos evitados). Medir los adelantados te deja corregir a tiempo.", l: [
          "Adelantado: cuántos no dijiste.",
          "Atrasado: cuánto ahorraste.",
          "Mide los dos cada mes."] },
        { t: "La incomodidad baja con la práctica", d: "La habituación hace que una respuesta emocional disminuya con la exposición repetida. Las primeras negativas incomodan mucho; después de veinte, el cuerpo ya no reacciona igual. La sensación miente al principio.", l: [
          "Confía en los números más que en cómo te sientes.",
          "La incomodidad inicial es normal.",
          "Cuenta las negativas para ver el progreso."] },
        { t: "Celebrar los no", d: "Reconocer cada no bien dicho como una victoria refuerza la conducta. Puede ser tan simple como marcarlo en tu cuadrícula de hábitos o contárselo a alguien.", l: [
          "Marca cada no en tu registro como logro.",
          "Revisa la lista cuando dudes de tu avance.",
          "Comparte con alguien de confianza tu progreso."] }] },
    "📚 Qué leer": { ic: "books" },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  dinero: {
    "Por qué las tres a la vez": { ic: "money-bag",
      sesion: [[5, "Escribe las tres ramas —generar, administrar, hacer crecer— y califícate del 1 al 10 en cada una."],
               [15, "Para la rama con menor calificación, escribe una acción concreta para este mes."],
               [5, "Agenda esa acción en tu calendario con fecha."]],
      sale: "Sabes cuál de las tres ramas es tu punto débil y tienes una acción con fecha para este mes.",
      subtemas: [
        { t: "La inflación del estilo de vida", d: "Cuando sube el ingreso, el gasto tiende a subir al mismo ritmo: mejor coche, más salidas, más suscripciones. Los economistas lo llaman inflación del estilo de vida. Por eso ganar más no basta: sin administrar, el excedente desaparece.", l: [
          "Cuando suba tu ingreso, decide primero qué parte ahorras.",
          "Revisa tus gastos fijos cada seis meses.",
          "Mejora tu vida a propósito, no por inercia."] },
        { t: "El patrimonio neto", d: "El patrimonio neto es lo que tienes menos lo que debes. Es el número que resume las tres ramas: generar aumenta lo que entra, administrar evita deudas y hacer crecer multiplica lo que tienes. Seguirlo cada mes muestra si avanzas de verdad.", l: [
          "Activos: ahorro, inversiones, valor del coche.",
          "Pasivos: tarjetas, créditos, préstamos.",
          "Lo importante es la tendencia, no un mes."] },
        { t: "El orden de las prioridades", d: "Muchos planificadores financieros recomiendan un orden: presupuesto, fondo de emergencia, deuda cara, inversión. Saltarse pasos es la causa más común de retrocesos: invertir sin fondo de emergencia obliga a vender en mal momento.", l: [
          "No inviertas antes de tener fondo de emergencia.",
          "La deuda cara va antes que la inversión.",
          "Cada etapa sostiene a la siguiente."] }] },
    "Las tres formas de generar (y su techo)": { ic: "chart-increasing",
      sesion: [[5, "Lista tus fuentes de ingreso actuales y clasifícalas: tiempo, resultado o activo."],
               [20, "Calcula cuánto te deja de verdad una hora de Didi: ingreso bruto menos gasolina o carga, mantenimiento y desgaste estimado."],
               [5, "Escribe el siguiente paso de tu Plan Maestro para pasar de tiempo a resultado."]],
      sale: "Sabes tu ingreso neto por hora en Didi y cuál es tu siguiente paso hacia ingresos por resultado.",
      copia: { t: "Mi hora real de Didi", l: [
        "Ingreso bruto de la semana: $______ en ___ horas",
        "Energía (gasolina o carga): $______",
        "Mantenimiento y llantas (prorrateado): $______",
        "Desgaste / depreciación estimada: $______",
        "Comisiones y otros: $______",
        "Neto ÷ horas = $______ por hora"] },
      subtemas: [
        { t: "El cuadrante del flujo de dinero", d: "Robert Kiyosaki popularizó cuatro cuadrantes: empleado, autoempleado, dueño de negocio e inversionista. Más allá del libro, la idea útil es que el ingreso por tiempo tiene techo y el de sistemas o activos no.", l: [
          "Empleado y autoempleado: ingreso por tiempo.",
          "Negocio y activos: ingreso que escala.",
          "La transición se hace paso a paso, sin dejar el ingreso estable."] },
        { t: "Costo total de operar un auto", d: "Conducir para plataformas tiene costos que no se ven en el ingreso diario: depreciación, llantas, mantenimiento, seguro, desgaste de batería en eléctricos. Calcular el costo por kilómetro te dice si una hora más conviene.", l: [
          "Lleva el kilometraje de cada mes.",
          "Divide los costos totales entre los kilómetros.",
          "Compara con lo que te pagan por kilómetro."] },
        { t: "Productizar un servicio", d: "Productizar es convertir un servicio a la medida en algo con alcance, precio y entrega fijos: «revisión de código de 10 archivos en 48 horas por $X». Reduce el tiempo de venta y permite escalar con procesos.", l: [
          "Define el alcance exacto y lo que no incluye.",
          "Precio fijo publicado.",
          "Documenta el proceso para repetirlo igual."] }] },
    "Sube el precio antes de subir las horas": { ic: "up-right-arrow",
      sesion: [[5, "Escribe tu precio actual por proyecto o servicio y cuánto tiempo te toma."],
               [15, "Investiga precios de mercado de servicios parecidos y define tu nuevo precio para clientes nuevos, más tu política de anticipo."],
               [5, "Escríbelo en una tarifa de una página."]],
      sale: "Tienes una tarifa escrita con precio para clientes nuevos y anticipo definido.",
      copia: { t: "Tu tarifa de una página", l: [
        "Servicio: ______",
        "Qué incluye: ______ · Qué no incluye: ______",
        "Entrega: ___ días hábiles",
        "Precio: $______ (+ IVA si aplica)",
        "Anticipo: 50 % para iniciar · resto a la entrega",
        "Cambios incluidos: ___ ronda(s)"] },
      subtemas: [
        { t: "Precio basado en valor", d: "En lugar de cobrar por horas, el precio basado en valor parte de cuánto vale el resultado para el cliente. Si tu trabajo le ahorra o le genera mucho dinero, el precio puede ser una fracción de ese valor y aun así ser alto para ti.", l: [
          "Pregunta qué problema resuelve tu trabajo y cuánto le cuesta al cliente.",
          "Cobra por el resultado, no por las horas.",
          "Ofrece opciones: básica, estándar y completa."] },
        { t: "El precio comunica calidad", d: "En muchos servicios, un precio muy bajo hace dudar de la calidad. Los estudios sobre precio y percepción muestran que la gente usa el precio como señal cuando no puede evaluar la calidad directamente.", l: [
          "No compitas por ser el más barato.",
          "Muestra resultados para justificar el precio.",
          "Los clientes que solo buscan precio rara vez son leales."] },
        { t: "Cómo negociar sin bajar el precio", d: "Si un cliente pide descuento, en lugar de bajar el precio reduce el alcance: menos entregables, más tiempo, menos cambios. Así mantienes el valor de tu hora y el cliente decide qué le importa.", l: [
          "«Para ese presupuesto puedo hacer ______».",
          "Nunca bajes sin quitar algo.",
          "Descuentos solo por pago anticipado o volumen."] }] },
    "Registrar: lo que no se mide no se controla": { ic: "ledger",
      sesion: [[5, "Abre Finanzas y revisa los gastos de la última semana."],
               [15, "Registra lo que falte, categoriza todo (fijo, variable, deuda, ahorro) y anota los dos números de memoria: gasto mínimo mensual y fondo de emergencia."],
               [5, "Pon un recordatorio semanal fijo para la revisión."]],
      sale: "La semana está registrada y categorizada sin huecos, y sabes de memoria tus dos números.",
      subtemas: [
        { t: "El efecto Hawthorne del dinero", d: "Observar una conducta tiende a cambiarla. En finanzas personales, solo registrar los gastos hace que la gente gaste menos, porque cada gasto se vuelve consciente. Es el efecto más barato que existe.", l: [
          "Registrar ya es medio ahorro.",
          "Registra en el momento, no después.",
          "Mira el total de la semana cada domingo."] },
        { t: "La regla 50/30/20", d: "Elizabeth Warren popularizó una guía: 50 % del ingreso neto a necesidades, 30 % a deseos y 20 % a ahorro y deuda. No es ley, pero sirve para ver si tu reparto está muy desbalanceado.", l: [
          "Compara tus categorías con 50/30/20.",
          "Si tienes deuda cara, sube el 20 %.",
          "Ajusta a tu realidad, no al revés."] },
        { t: "El gasto hormiga", d: "Los gastos pequeños y frecuentes —cafés, snacks, apps, envíos— suman cantidades grandes al año. Registrarlos todos permite verlos juntos y decidir cuáles valen la pena.", l: [
          "Suma tus gastos menores a $100 de un mes.",
          "Multiplícalo por doce.",
          "Elige cuáles conservar y cuáles cortar."] }] },
    "Págate a ti primero": { ic: "coin",
      sesion: [[5, "Revisa el día en que cae tu sueldo y en qué cuentas lo recibes."],
               [15, "Programa una transferencia automática ese mismo día: un porcentaje al ahorro y el pago de deuda, antes de cualquier gasto."],
               [5, "Escribe tu regla para el próximo aumento: la mitad va directo al ahorro."]],
      sale: "La transferencia automática del día de pago está programada y tu regla de aumentos escrita.",
      subtemas: [
        { t: "Ahorrar más mañana", d: "Richard Thaler y Shlomo Benartzi diseñaron el programa Save More Tomorrow: los empleados se comprometían a ahorrar una parte de sus aumentos futuros. Las tasas de ahorro subieron mucho porque nunca sentían una pérdida en su sueldo actual.", l: [
          "Compromete hoy el ahorro de tu próximo aumento.",
          "Sube un punto porcentual con cada aumento.",
          "No sentirás la diferencia y el ahorro crece."] },
        { t: "La automatización vence a la disciplina", d: "La investigación en economía conductual muestra que los programas de ahorro automático tienen mucha más participación que los voluntarios. La inercia, que normalmente juega en contra, juega a favor cuando el ahorro está automatizado.", l: [
          "Automatiza ahorro, inversión y pagos de deuda.",
          "Que el dinero ahorrado no esté en tu cuenta de gastos.",
          "Revisa la automatización cada seis meses."] },
        { t: "Cuentas separadas por propósito", d: "Separar el dinero en cuentas con nombre —«fondo de emergencia», «Alemania», «impuestos»— reduce la tentación de usarlo. Es contabilidad mental a tu favor.", l: [
          "Una cuenta para gastos del mes.",
          "Otra para emergencias.",
          "Otra para metas con nombre y fecha."] }] },
    "El fondo de emergencia": { ic: "umbrella",
      sesion: [[5, "Calcula tu gasto mínimo mensual real con los datos de Finanzas."],
               [15, "Multiplícalo por 3 y por 6 para tus dos metas; revisa cuánto llevas y en qué instrumento está."],
               [5, "Define cuánto aportarás al mes hasta completar la primera meta."]],
      sale: "Sabes tu gasto mínimo, tus metas de 3 y 6 meses, cuánto llevas y cuánto aportas al mes.",
      subtemas: [
        { t: "La liquidez", d: "Liquidez es qué tan rápido conviertes algo en efectivo sin perder valor. El fondo de emergencia necesita liquidez alta: CETES a corto plazo o una cuenta con rendimiento disponible. La bolsa no sirve porque puede estar abajo justo cuando lo necesitas.", l: [
          "Disponible en días, no en meses.",
          "Sin riesgo de pérdida de valor.",
          "Que rinda algo, aunque sea poco."] },
        { t: "Ingreso variable, colchón mayor", d: "Si una parte de tu ingreso es variable —como Didi o freelance—, los meses malos son más probables. Por eso se recomienda un fondo más grande, hacia seis meses, para no recurrir a deuda.", l: [
          "Con ingreso variable, apunta a seis meses.",
          "Calcula con tu mes malo, no con el promedio.",
          "Repón el fondo en los meses buenos."] },
        { t: "El fondo en Alemania", d: "Al mudarte, tu gasto mínimo cambia de moneda y de tamaño: renta, seguro médico obligatorio, transporte. Además, para la visa de estudiante se exige demostrar fondos, por ejemplo con una cuenta bloqueada (Sperrkonto). Planear el fondo en euros es parte del proyecto.", l: [
          "Investiga el monto vigente que pide la embajada.",
          "Calcula tu gasto mínimo allá.",
          "Separa ese ahorro del fondo de emergencia de México."] }] },
    "La deuda cara primero, y por qué": { ic: "credit-card",
      sesion: [[5, "Lista todas tus deudas con su saldo, tasa anual y pago mínimo."],
               [15, "Ordénalas por tasa (avalancha) y decide cuánto excedente mensual va a la primera; calcula en qué mes queda liquidada."],
               [5, "Programa el pago del excedente para el día de pago."]],
      sale: "Tus deudas están ordenadas por tasa, sabes a cuál va el excedente y en qué mes la liquidas.",
      copia: { t: "Mi lista de deudas", l: [
        "Deuda | Saldo | Tasa anual (CAT) | Pago mínimo | Orden",
        "______ | $____ | ___ % | $____ | 1",
        "______ | $____ | ___ % | $____ | 2",
        "Excedente mensual a la #1: $______",
        "Fecha estimada de liquidación: ______"] },
      subtemas: [
        { t: "El CAT, no solo la tasa", d: "En México, el Costo Anual Total (CAT) incluye la tasa de interés, comisiones y otros costos. Es el dato correcto para comparar créditos. Las tarjetas suelen tener CAT muy altos, a veces por encima del 50 %.", l: [
          "Compara siempre por CAT.",
          "Revísalo en tu estado de cuenta.",
          "Un CAT alto es razón para pagar esa deuda primero."] },
        { t: "Avalancha o bola de nieve", d: "Matemáticamente, pagar primero la deuda con mayor tasa (avalancha) ahorra más intereses. Pero estudios de la Kellogg School encontraron que liquidar primero las deudas pequeñas (bola de nieve) motiva más y hace que más gente termine.", l: [
          "Si eres constante, avalancha.",
          "Si te cuesta mantener la motivación, bola de nieve.",
          "Lo peor es no elegir ninguna."] },
        { t: "Pagar más del mínimo", d: "El pago mínimo está diseñado para que la deuda dure años. En muchas tarjetas, pagando solo el mínimo terminas pagando varias veces lo que compraste. Tu estado de cuenta muestra cuánto tardarías pagando el mínimo.", l: [
          "Revisa la leyenda «si solo pagas el mínimo…».",
          "Paga siempre más del mínimo.",
          "El pago para no generar intereses es la meta en tarjetas sin deuda."] }] },
    "Los MSI no son dinero gratis": { ic: "receipt",
      sesion: [[5, "Suma en Finanzas todos tus meses sin intereses activos y cuánto pagas al mes por ellos."],
               [15, "Calcula qué porcentaje de tu excedente mensual se va en MSI y hasta qué mes."],
               [5, "Escribe tu regla para futuros MSI: solo si el total ya está apartado."]],
      sale: "Sabes cuánto te comen los MSI al mes, hasta cuándo, y tienes tu regla para los siguientes.",
      subtemas: [
        { t: "El dolor de pagar", d: "Drazen Prelec y George Loewenstein describieron el «dolor de pagar»: pagar en efectivo duele más que con tarjeta, y diferir el pago lo reduce aún más. Los MSI aprovechan esto: compras más porque no duele hoy.", l: [
          "Si no duele hoy, igual duele después.",
          "Imagina pagarlo completo hoy.",
          "Si no lo harías, no lo compres a meses."] },
        { t: "MSI y crédito disponible", d: "Los MSI ocupan tu línea de crédito durante todo el plazo. Varios a la vez pueden dejarte sin crédito disponible para una emergencia y subir tu uso de crédito, lo que afecta tu historial.", l: [
          "Mantén tu uso de crédito bajo.",
          "No acumules varios MSI al mismo tiempo.",
          "Revisa tu Buró de Crédito una vez al año (es gratis)."] },
        { t: "Cuando los MSI sí sirven", d: "Un MSI tiene sentido si compras algo necesario y planeado, tienes el dinero apartado y lo dejas rindiendo mientras pagas las mensualidades. Así ganas algo de rendimiento sin endeudarte de verdad.", l: [
          "Aparta el total el primer mes.",
          "Ponlo en CETES y paga mes a mes.",
          "Solo para compras que ya estaban en tu plan."] }] },
    "Cuándo empezar a invertir (y en qué orden)": { ic: "ladder",
      sesion: [[5, "Ubica en cuál de los cuatro peldaños estás hoy."],
               [15, "Escribe qué te falta para pasar al siguiente y en qué fecha estimas lograrlo."],
               [5, "Elige un tema de inversión para aprender este mes mientras subes de peldaño."]],
      sale: "Sabes en qué peldaño estás, qué falta para el siguiente y qué estás aprendiendo mientras tanto.",
      subtemas: [
        { t: "Rendimiento seguro de pagar deuda", d: "Pagar una deuda con tasa del 40 % equivale a una inversión sin riesgo que rinde 40 %. Ninguna inversión ofrece eso de forma segura. Por eso la deuda cara va antes que invertir.", l: [
          "Compara la tasa de tu deuda con rendimientos esperados.",
          "Si la deuda cuesta más, págala primero.",
          "Las deudas baratas pueden convivir con invertir."] },
        { t: "El perfil de riesgo", d: "Antes de invertir, define tu horizonte (cuándo necesitarás el dinero) y tu tolerancia a pérdidas temporales. El dinero para Alemania en 2027 tiene horizonte corto y no debe ir a renta variable volátil.", l: [
          "Menos de 2 años: instrumentos de deuda.",
          "Más de 5 años: puede incluir renta variable.",
          "Cada meta, su propio horizonte."] },
        { t: "Aprender antes de invertir", d: "Mientras pagas deuda, aprender las bases —qué es un ETF, la diversificación, las comisiones, los impuestos— te prepara para invertir sin errores costosos. El conocimiento llega gratis; los errores, no.", l: [
          "Un concepto por semana.",
          "Fuentes sin conflicto de interés: Banxico, CONDUSEF.",
          "Practica con montos pequeños antes de los grandes."] }] },
    "Interés compuesto: el número que hay que interiorizar": { ic: "seedling",
      sesion: [[5, "Abre una calculadora de interés compuesto (o una hoja de cálculo)."],
               [15, "Calcula tres escenarios con tu aportación posible: 10, 20 y 30 años; y uno de tu deuda más cara creciendo si no la pagas."],
               [5, "Anota cuánto del resultado es aportación y cuánto rendimiento."]],
      sale: "Tienes calculados tus tres escenarios y ves cuánto del resultado viene del tiempo.",
      subtemas: [
        { t: "La regla del 72", d: "Para estimar en cuánto tiempo se duplica una inversión, divide 72 entre la tasa anual: al 8 %, unos 9 años; al 12 %, unos 6. Sirve también con la deuda: al 36 %, se duplica en unos 2 años.", l: [
          "72 ÷ tasa = años para duplicar.",
          "Úsala para comparar opciones rápido.",
          "Aplícala a tu deuda para sentir su costo."] },
        { t: "Rendimiento real", d: "El rendimiento que importa es el real: el nominal menos la inflación. Si CETES paga 10 % y la inflación es 4 %, tu poder de compra crece cerca de 6 %. Una cuenta que rinde menos que la inflación pierde valor.", l: [
          "Resta la inflación al rendimiento.",
          "El efectivo en casa pierde contra la inflación.",
          "Los Udibonos protegen contra ella."] },
        { t: "El tiempo pesa más que el monto", d: "En el interés compuesto, quien empieza antes con poco puede terminar con más que quien empieza después con mucho, porque los rendimientos generan sus propios rendimientos durante más años.", l: [
          "Empieza aunque sea con poco.",
          "Aumenta la aportación cuando suba tu ingreso.",
          "No interrumpas: los años perdidos no se recuperan."] }] },
    "Empieza aburrido y barato": { ic: "turtle",
      sesion: [[5, "Revisa en tu cuenta de inversión qué instrumentos tienes y su comisión anual."],
               [15, "Escribe tu asignación objetivo en porcentajes (por ejemplo, deuda y renta variable) y el monto fijo mensual de aportación."],
               [5, "Programa la aportación automática o un recordatorio el mismo día cada mes."]],
      sale: "Tu asignación está escrita, conoces las comisiones y la aportación mensual tiene fecha fija.",
      copia: { t: "Mi política de inversión", l: [
        "Objetivo: ______ · Horizonte: ___ años",
        "Asignación: ___ % CETES / deuda · ___ % ETF amplio · ___ % otros",
        "Aportación: $______ cada día ___ del mes",
        "Rebalanceo: una vez al año, en ______",
        "No vendo por: caídas, noticias, emociones",
        "Firmado: ______ · fecha ______"] },
      subtemas: [
        { t: "Por qué los índices ganan", d: "Los informes SPIVA de S&P muestran que, a 15 años, la gran mayoría de los fondos activos de acciones de Estados Unidos rinden menos que su índice de referencia después de comisiones. Un ETF de índice barato captura el mercado sin intentar adivinarlo.", l: [
          "La mayoría de los gestores no le gana al índice.",
          "Las comisiones bajas son ventaja garantizada.",
          "Diversificación amplia con un solo instrumento."] },
        { t: "Promediar el costo", d: "Invertir el mismo monto cada mes (DCA) compra más unidades cuando el precio baja y menos cuando sube. No garantiza ganar, pero quita la tentación de adivinar el momento y crea constancia.", l: [
          "Mismo monto, misma fecha, cada mes.",
          "Las caídas son buenas para quien aporta.",
          "No revises el portafolio todos los días."] },
        { t: "El rebalanceo", d: "Con el tiempo, lo que sube ocupa más porcentaje del portafolio y cambia tu riesgo. Rebalancear una vez al año —vender un poco de lo que subió y comprar lo que bajó— te devuelve a tu asignación y te obliga a comprar barato.", l: [
          "Una vez al año, misma fecha.",
          "O cuando una parte se desvíe más de 5 puntos.",
          "Usa las aportaciones nuevas para rebalancear sin vender."] }] },
    "Conoce los instrumentos mexicanos": { ic: "bank",
      sesion: [[5, "Entra a cetesdirecto y revisa las tasas de CETES a 28, 91, 182 y 364 días."],
               [15, "Haz una tabla con cada instrumento: plazo, riesgo y cómo paga impuestos; revisa en qué SIEFORE está tu Afore y su comisión."],
               [5, "Anota qué instrumento usarías para cada una de tus metas."]],
      sale: "Tu tabla de instrumentos está hecha y sabes en qué SIEFORE está tu Afore y cuánto cobra.",
      subtemas: [
        { t: "Las SIEFORE generacionales", d: "Desde 2019, las Afores usan SIEFORE generacionales: tu dinero se invierte según tu año de nacimiento, con más renta variable cuando eres joven y más deuda cerca del retiro. Puedes comparar rendimientos netos y comisiones de cada Afore en la CONSAR.", l: [
          "Revisa el indicador de rendimiento neto en la CONSAR.",
          "Cambiar de Afore es gratis y en línea.",
          "Las aportaciones voluntarias tienen beneficios fiscales."] },
        { t: "La ventaja fiscal del retiro", d: "Las aportaciones voluntarias a tu Afore o a un Plan Personal de Retiro pueden ser deducibles hasta ciertos límites. Para alguien con sueldo, es una forma de invertir a largo plazo y además pagar menos impuestos.", l: [
          "Pregunta a un contador por los límites vigentes.",
          "Solo con dinero que no necesitarás hasta el retiro.",
          "Guarda los comprobantes para tu declaración."] },
        { t: "Riesgo de tipo de cambio", d: "Invertir en ETF de Estados Unidos te expone al dólar: si el peso se aprecia, tu rendimiento en pesos baja; si se deprecia, sube. Para alguien que se mudará a Europa, tener una parte en euros o dólares puede ser cobertura natural.", l: [
          "Tu meta en Alemania será en euros.",
          "Diversificar monedas reduce un riesgo.",
          "No especules con el tipo de cambio."] }] },
    "Impuestos: lo que casi nadie te dice": { ic: "classical-building",
      sesion: [[5, "Revisa en el portal del SAT tu régimen fiscal actual y tus obligaciones."],
               [15, "Calcula cuánto de tus ingresos de Didi o freelance del último mes correspondería a impuestos y abre una cuenta separada para apartarlo."],
               [5, "Agenda una consulta con un contador si vas a facturar."]],
      sale: "Sabes tu régimen fiscal, tienes una cuenta para impuestos y una fecha con un contador si vas a facturar.",
      subtemas: [
        { t: "Plataformas digitales y retenciones", d: "Desde 2020, las plataformas como Didi retienen ISR e IVA a quienes generan ingresos a través de ellas, según el régimen de plataformas tecnológicas. Esas retenciones pueden ser pago definitivo o provisional según tu caso; un contador te dice cuál conviene.", l: [
          "Revisa tus constancias de retención de la app.",
          "Guárdalas para tu declaración anual.",
          "Pregunta si te conviene que sean definitivas."] },
        { t: "RESICO en pocas palabras", d: "El Régimen Simplificado de Confianza para personas físicas aplica tasas de ISR bajas sobre ingresos cobrados, con un tope anual de ingresos. Tiene requisitos y restricciones; no todos pueden o les conviene entrar.", l: [
          "Verifica requisitos y tope vigente en el SAT.",
          "Compara con otros regímenes con un contador.",
          "Emite facturas correctas desde el principio."] },
        { t: "La declaración anual", d: "Si tienes ingresos además de tu sueldo, o tu sueldo pasa ciertos límites, debes presentar declaración anual en abril. Puedes recuperar saldos a favor con deducciones personales: gastos médicos, colegiaturas, aportaciones al retiro.", l: [
          "Pide factura de tus gastos médicos y de educación.",
          "Revisa tu declaración precargada en el SAT.",
          "Presenta en abril aunque te salga saldo a favor."] }] },
    "Protegerte de fraudes": { ic: "police-car-light",
      sesion: [[5, "Entra al buscador de la CONDUSEF (SIPRES) y al padrón de la CNBV y aprende a verificar una institución."],
               [15, "Verifica dos instituciones donde tienes o piensas tener dinero."],
               [5, "Escribe tu regla de las 24 horas y las cinco señales de alarma en una nota."]],
      sale: "Sabes verificar una institución en dos minutos y verificaste las tuyas.",
      copia: { t: "Señales de fraude", l: [
        "☐ Rendimiento alto y garantizado",
        "☐ Prisa por decidir",
        "☐ Te lo presenta un conocido entusiasta",
        "☐ Ganas por traer a más personas",
        "☐ No puedes retirar cuando quieres",
        "☐ No aparece en CONDUSEF / CNBV",
        "Una sola marcada = no meto dinero"] },
      subtemas: [
        { t: "El esquema Ponzi", d: "Charles Ponzi, en 1920, pagaba a los primeros inversionistas con el dinero de los nuevos. Todo esquema así colapsa cuando dejan de entrar nuevos. Bernie Madoff operó uno durante décadas con rendimientos «estables» que nadie verificaba.", l: [
          "Rendimientos demasiado constantes son sospechosos.",
          "Si no entiendes cómo se genera el rendimiento, no inviertas.",
          "Pide estados de cuenta de una institución regulada."] },
        { t: "Fraudes digitales comunes", d: "En México son comunes el phishing (correos o mensajes que imitan a tu banco), el vishing (llamadas que se hacen pasar por el banco) y las inversiones falsas en redes sociales. Ningún banco te pide claves ni NIP por teléfono.", l: [
          "Nunca des claves, NIP ni códigos por teléfono.",
          "Llama tú al número de la tarjeta, no al que te llamó.",
          "Activa notificaciones de cada movimiento."] },
        { t: "Cripto y promesas", d: "Muchas estafas actuales usan criptomonedas por su complejidad y por ser difíciles de rastrear: plataformas falsas que muestran ganancias ficticias y no dejan retirar. La regla sigue igual: si promete ganancias garantizadas, es fraude.", l: [
          "Usa solo plataformas reguladas y conocidas.",
          "Prueba retirar una cantidad pequeña antes de meter más.",
          "Desconfía de «asesores» que te contactan por redes."] }] },
    "El error que deshace todo": { ic: "collision",
      sesion: [[5, "Revisa los últimos seis meses: ¿sacaste dinero de inversiones para gastos o dejaste de aportar algún mes?"],
               [15, "Si pasó, identifica por qué y qué parte del sistema falló: fondo de emergencia, presupuesto o gasto imprevisto."],
               [5, "Escribe la regla que lo evita la próxima vez."]],
      sale: "Sabes si cometiste el error, qué parte del sistema falló y tienes la regla que lo evita.",
      subtemas: [
        { t: "La brecha de comportamiento", d: "Estudios como los de Morningstar («Mind the Gap») encuentran que el rendimiento que obtienen los inversionistas suele ser menor que el de los fondos en que invierten, porque entran y salen en mal momento. El comportamiento cuesta más que las comisiones.", l: [
          "No vendas por pánico.",
          "No compres por euforia.",
          "Tu plan escrito te protege de ti mismo."] },
        { t: "Vender en la caída", d: "Las caídas del mercado son normales: la bolsa estadounidense ha tenido caídas de 10 % o más con frecuencia y siempre se ha recuperado en el largo plazo, aunque a veces tarda años. Vender en la caída convierte una pérdida temporal en permanente.", l: [
          "Espera las caídas: son parte del camino.",
          "Si tu horizonte es largo, no vendas.",
          "Si te quitan el sueño, tu asignación es demasiado arriesgada."] },
        { t: "La constancia en los meses difíciles", d: "Dejar de aportar «unos meses» suele volverse un año. Si el mes está difícil, mejor aportar menos que nada: mantiene el hábito y la automatización intactos.", l: [
          "Baja el monto, no lo detengas.",
          "Retoma el monto normal en cuanto puedas.",
          "El hábito vale más que la cantidad."] }] },
    "Tu revisión mensual, en 20 minutos": { ic: "spiral-calendar",
      sesion: [[5, "Agenda tu revisión mensual: mismo día cada mes, con Finanzas abierta."],
               [10, "Contesta las cinco preguntas del paso con los datos reales del mes."],
               [5, "Cancela o ajusta al menos un gasto fijo que ya no uses y anota tu decisión del mes."]],
      sale: "Respondiste las cinco preguntas con datos y tomaste al menos una decisión concreta.",
      copia: { t: "Revisión mensual", l: [
        "Mes: ______",
        "1. Entró $______ · salió $______",
        "2. Patrimonio neto: $______ (vs mes pasado: ↑ / ↓)",
        "3. ¿Aporté lo decidido? sí / no · por qué: ______",
        "4. ¿Deuda nueva? ______ · por qué: ______",
        "5. Gasto fijo que corto: ______",
        "Decisión del mes: ______"] },
      subtemas: [
        { t: "Las suscripciones olvidadas", d: "Muchas personas subestiman cuánto gastan en suscripciones: streaming, apps, almacenamiento, gimnasios. Las pruebas gratuitas que se convierten en pagos y los servicios que ya no usas son dinero fácil de recuperar.", l: [
          "Revisa cargos recurrentes en tu estado de cuenta.",
          "Cancela lo que no usaste en el último mes.",
          "Rota servicios de streaming en vez de tenerlos todos."] },
        { t: "Revisar sin culpa", d: "La revisión no es para castigarte por lo que gastaste, sino para decidir el siguiente mes. Investigaciones sobre la «aversión al avestruz» muestran que la gente evita mirar sus finanzas cuando teme malas noticias. La revisión regular lo vuelve rutina.", l: [
          "Mira los números aunque no te gusten.",
          "Enfócate en una decisión, no en diez.",
          "Celebra lo que salió bien."] },
        { t: "Metas con fecha", d: "Cada revisión es una oportunidad de ver si tus metas —deudas, fondo, Alemania— van en tiempo. Una meta sin seguimiento mensual se descubre atrasada cuando ya es tarde.", l: [
          "Compara el avance con el plan del mes.",
          "Si vas atrasado, ajusta ahora.",
          "Mira tu meta en Mis Metas para verla moverse."] }] },
    "📚 Qué leer, en qué orden": { ic: "books" },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  manejar: {
    "Por qué esto te importa más que a otros": { ic: "automobile",
      sesion: [[5, "Revisa en el tablero del BYD tu consumo promedio (kWh/100 km) y tus kilómetros del último mes."],
               [15, "Calcula cuánto te cuesta al mes la energía y el mantenimiento, y cuántas horas manejas a la semana entre trabajo y Didi."],
               [5, "Anota tu consumo actual como línea base para comparar en un mes."]],
      sale: "Tienes tu consumo, kilómetros y horas al volante anotados como línea base.",
      subtemas: [
        { t: "El riesgo por exposición", d: "El riesgo de accidente crece con los kilómetros y las horas al volante. Quien maneja por trabajo pasa muchas más horas expuesto que un conductor promedio, así que cada mejora de hábito rinde más en su caso.", l: [
          "Más horas al volante = más importancia de los hábitos.",
          "La fatiga es un riesgo central para quien maneja por trabajo.",
          "Cada hábito seguro se multiplica por tus kilómetros."] },
        { t: "Seguridad vial en México", d: "Los siniestros de tránsito están entre las principales causas de muerte de jóvenes en México, según datos de la Secretaría de Salud y la OMS. Velocidad, alcohol, distracción y no usar cinturón son los factores más repetidos.", l: [
          "Cinturón siempre, también en el asiento trasero.",
          "Celular fuera de la mano.",
          "Respeta los límites, sobre todo en vías rápidas."] },
        { t: "El coche como activo de trabajo", d: "Para quien vive del coche, cuidarlo es cuidar el ingreso: cada día en el taller es un día sin ganar, y un accidente puede dejarte semanas fuera. El estilo de manejo influye en el desgaste de llantas, frenos y suspensión.", l: [
          "Manejo suave = menos desgaste.",
          "Mantenimiento preventivo = menos días parado.",
          "Un buen seguro es parte del costo de trabajar."] }] },
    "Manejo defensivo: las reglas que sí evitan choques": { ic: "shield",
      sesion: [[5, "Antes de arrancar, repasa las cinco reglas: 3 segundos, mirar lejos, vía de escape, revisar con la cabeza y asumir que no te vieron."],
               [30, "En tu próximo trayecto o turno, aplica la regla de los 3 segundos y nombra en voz baja tu vía de escape en cada parada."],
               [5, "Al terminar, anota cuántas veces tuviste que corregir la distancia."]],
      sale: "Mantuviste los 3 segundos casi todo el trayecto y siempre supiste tu vía de escape.",
      subtemas: [
        { t: "El tiempo de reacción", d: "Un conductor alerta tarda alrededor de 1 a 1.5 segundos en reaccionar ante un imprevisto; distraído o cansado, mucho más. A 60 km/h recorres unos 17 metros por segundo: en ese tiempo de reacción ya avanzaste casi 25 metros sin frenar.", l: [
          "La distancia te compra tiempo de reacción.",
          "A más velocidad, más distancia.",
          "Cansado o distraído, aumenta todavía más."] },
        { t: "La distracción del celular", d: "Estudios del Virginia Tech Transportation Institute encontraron que escribir mensajes mientras manejas multiplica el riesgo de choque. Apartar la vista cinco segundos a 80 km/h equivale a recorrer más de 100 metros a ciegas.", l: [
          "Celular en soporte, en modo conducción.",
          "Configura la ruta antes de arrancar.",
          "Si tienes que escribir, detente."] },
        { t: "El campo visual", d: "Mirar lejos amplía el tiempo para detectar problemas; mover la vista cada pocos segundos entre espejos, frente y costados mantiene un mapa completo de lo que pasa alrededor. Fijar la mirada en un punto reduce lo que ves.", l: [
          "Revisa espejos cada 5 a 8 segundos.",
          "Mira lejos y luego cerca, no solo cerca.",
          "En intersecciones, mira a ambos lados aunque tengas verde."] }] },
    "Manejar estándar, paso a paso": { ic: "gear",
      sesion: [[5, "Consigue un coche estándar prestado o renta una clase en una escuela de manejo, en un lugar amplio y vacío."],
               [40, "Practica en plano: encontrar el punto de mordida, arrancar sin acelerador, cambiar a segunda y tercera, frenar y parar; luego arranques en pendiente suave con freno de mano."],
               [10, "Anota cuántas veces se apagó el motor y en qué maniobra."]],
      sale: "Arrancas en plano y en pendiente suave sin que se apague el motor ni irte para atrás.",
      subtemas: [
        { t: "Cómo funciona el embrague", d: "El embrague conecta y desconecta el motor de la transmisión mediante un disco que se presiona contra el volante del motor. El punto de mordida es donde el disco empieza a rozar y transmitir fuerza; patinarlo de más lo desgasta.", l: [
          "Pisa a fondo para cambiar.",
          "Suelta despacio solo en el punto de mordida.",
          "No descanses el pie en el pedal."] },
        { t: "Las revoluciones correctas", d: "Cada marcha trabaja mejor en un rango de revoluciones. Cambiar demasiado pronto ahoga el motor; demasiado tarde gasta combustible. En coches comunes, subir de marcha entre 2,000 y 3,000 rpm es un buen rango para manejo normal.", l: [
          "Escucha el motor: si zumba alto, cambia.",
          "Si vibra o jala poco, baja una marcha.",
          "Muchos coches nuevos indican cuándo cambiar."] },
        { t: "Estándar en Alemania", d: "En Alemania la mayoría de los coches de renta económicos y muchos usados son manuales. Además, tu licencia mexicana sirve un tiempo limitado; después hay que canjearla o sacar la alemana (Führerschein), que incluye curso, teoría y examen práctico.", l: [
          "Domina estándar antes de irte.",
          "Investiga el canje de licencia según tu caso.",
          "Una licencia «solo automático» limita tus opciones allá."] }] },
    "Las diferencias del eléctrico": { ic: "battery",
      sesion: [[5, "Revisa en el BYD el modo de frenado regenerativo y el consumo del último viaje."],
               [20, "Haz un trayecto conocido anticipando: suelta el acelerador temprano, velocidad constante y clima moderado; anota el consumo."],
               [5, "Compara con tu consumo habitual y configura el límite de carga diaria al 80 %."]],
      sale: "Tu consumo en el trayecto bajó respecto a lo habitual y la carga diaria quedó limitada al 80 %.",
      subtemas: [
        { t: "Por qué el 20-80 %", d: "Las baterías de iones de litio sufren más estrés en los extremos de carga: mantenerlas mucho tiempo al 100 % o casi vacías acelera su degradación. Las baterías LFP, como las de muchos BYD, toleran mejor la carga completa, pero el fabricante puede recomendar cargarlas al 100 % periódicamente para calibrar.", l: [
          "Revisa la recomendación del manual de tu modelo.",
          "Evita dejarlo días al 100 % o casi vacío.",
          "La carga rápida frecuente calienta más la batería."] },
        { t: "El frenado regenerativo", d: "Al desacelerar, el motor funciona como generador y devuelve energía a la batería. Recupera parte de la energía de la inercia que con frenos de fricción se perdería como calor. Por eso anticipar y soltar temprano rinde mucho en un eléctrico.", l: [
          "Suelta el acelerador antes de los altos.",
          "Usa el modo de regeneración alta en ciudad.",
          "Frena mecánicamente solo cuando hace falta."] },
        { t: "El clima y la autonomía", d: "La climatización consume energía directamente de la batería. El aire acondicionado en calor y sobre todo la calefacción en frío reducen la autonomía. En Alemania, en invierno, la pérdida de autonomía es más notoria.", l: [
          "Preclimatiza mientras está conectado.",
          "Usa ventilación antes que aire acondicionado al máximo.",
          "Planea la autonomía con margen en clima extremo."] }] },
    "Manejar para gastar menos": { ic: "fuel-pump",
      sesion: [[5, "Revisa la presión de las cuatro llantas y la de refacción y ajústala a la indicada en la puerta."],
               [20, "Durante una semana aplica manejo suave y anticipado; con Didi, planea zonas y horarios para reducir kilómetros vacíos."],
               [5, "Al final de la semana compara consumo y kilómetros vacíos contra la semana anterior."]],
      sale: "Tus llantas tienen la presión correcta y tu consumo o tus kilómetros vacíos bajaron en la semana.",
      subtemas: [
        { t: "La resistencia a la rodadura", d: "Una parte importante de la energía de un coche se pierde en la deformación de las llantas al rodar. Llantas con menos presión se deforman más y aumentan el consumo, además de desgastarse por los bordes.", l: [
          "Revisa la presión en frío, antes de manejar.",
          "Usa la presión de la etiqueta de la puerta, no la máxima de la llanta.",
          "Revisa cada dos semanas."] },
        { t: "La velocidad y el aire", d: "La resistencia aerodinámica crece con el cuadrado de la velocidad: a 120 km/h necesitas mucha más energía que a 90 km/h. En carretera, bajar la velocidad es la forma más eficaz de ahorrar.", l: [
          "En carretera, 90-100 km/h rinde mucho más que 120.",
          "Ventanas cerradas a alta velocidad.",
          "Quita portaequipajes que no uses."] },
        { t: "Kilómetros vacíos en Didi", d: "Cada kilómetro sin pasajero cuesta energía y desgaste sin ingreso. Esperar en zonas de alta demanda, en horarios pico y con el mapa de calor de la app reduce los kilómetros vacíos más que cualquier técnica de manejo.", l: [
          "Conoce las horas y zonas de más demanda.",
          "Espera estacionado en lugar de dar vueltas.",
          "Mide tu porcentaje de kilómetros con pasajero."] }] },
    "Lluvia, noche y niebla": { ic: "cloud-with-rain",
      sesion: [[5, "Revisa limpiaparabrisas, luces y profundidad del dibujo de tus llantas."],
               [15, "Repasa en voz alta qué harás ante aquaplaning, niebla y deslumbramiento; ajusta la altura de tus faros si es posible."],
               [5, "Anota en tu celular la regla: primeros 15 minutos de lluvia, distancia doble."]],
      sale: "Tu coche está listo para lluvia y sabes de memoria qué hacer ante aquaplaning y niebla.",
      subtemas: [
        { t: "Cómo funciona el aquaplaning", d: "El dibujo de la llanta desaloja el agua para que el caucho toque el pavimento. Si hay demasiada agua o vas muy rápido, se forma una capa entre llanta y asfalto y la llanta flota. Llantas gastadas lo provocan a menor velocidad.", l: [
          "Llantas con buen dibujo desalojan más agua.",
          "Baja la velocidad con agua acumulada.",
          "Evita los surcos y charcos grandes."] },
        { t: "La visión nocturna", d: "Con poca luz, el ojo pierde agudeza y percepción de profundidad, y se recupera lento después de un deslumbramiento. Con la edad empeora. Por eso de noche se maneja con más distancia y menos velocidad.", l: [
          "Limpia el parabrisas por dentro: el empañado deslumbra más.",
          "No mires directo a los faros contrarios.",
          "Baja el brillo de pantallas del tablero."] },
        { t: "El agua y los eléctricos", d: "Los eléctricos están sellados para lluvia y charcos normales, pero cruzar agua profunda puede dañar componentes y la batería, además del riesgo de que el coche flote. La regla general: no cruces agua si no ves el fondo.", l: [
          "Revisa en el manual la profundidad máxima de vadeo.",
          "Ante inundación, busca otra ruta.",
          "Si el agua entra al coche, llévalo a revisar."] }] },
    "Derrapes y emergencias": { ic: "collision",
      sesion: [[5, "Repasa las respuestas: derrape trasero (mirar y contravolante), frontal (soltar y enderezar), ABS (pisar a fondo y girar)."],
               [20, "En un estacionamiento vacío y seguro, a baja velocidad, haz una frenada fuerte para sentir el ABS sin soltar el pedal."],
               [5, "Investiga un curso de manejo de emergencia o pista de práctica cerca de ti."]],
      sale: "Sentiste el ABS vibrar sin soltar el pedal y sabes cómo responder a cada tipo de derrape.",
      subtemas: [
        { t: "Mirar hacia donde quieres ir", d: "Los pilotos y motociclistas lo llaman fijación del objetivo: tendemos a ir hacia donde miramos. En una emergencia, mirar el obstáculo te lleva hacia él; mirar la salida te lleva a la salida.", l: [
          "Busca el hueco, no el obstáculo.",
          "Las manos siguen a los ojos.",
          "Practica mirar lejos en las curvas."] },
        { t: "El control de estabilidad", d: "El control electrónico de estabilidad (ESC) frena ruedas individuales para corregir derrapes. Estudios de seguridad vial lo consideran uno de los sistemas que más vidas han salvado. Pero no rompe las leyes de la física: si entras muy rápido, no alcanza.", l: [
          "No lo apagues en uso normal.",
          "Si se enciende su luz seguido, vas demasiado rápido.",
          "La velocidad adecuada sigue siendo lo principal."] },
        { t: "Cursos de manejo avanzado", d: "Practicar derrapes y frenadas en una pista controlada con instructor convierte el conocimiento en reflejo. Leer qué hacer ayuda, pero la reacción bajo pánico se entrena experimentándola en condiciones seguras.", l: [
          "Busca escuelas de manejo defensivo o avanzado.",
          "Practica solo en lugares cerrados y seguros.",
          "Nunca practiques derrapes en la calle."] }] },
    "Otros vehículos": { ic: "motorcycle",
      sesion: [[5, "Elige un vehículo distinto que quieras aprender: moto, camioneta, remolque o estándar en pendiente."],
               [20, "Investiga dónde aprenderlo con instructor, cuánto cuesta y qué equipo necesitas."],
               [5, "Lee las tres reglas de manejo en Alemania y anota cuáles son nuevas para ti."]],
      sale: "Tienes identificado dónde aprender un vehículo nuevo y conoces las reglas básicas de Alemania.",
      subtemas: [
        { t: "El riesgo de la moto", d: "Por kilómetro recorrido, el riesgo de morir en moto es muchas veces mayor que en coche, según datos de seguridad vial de varios países. El casco reduce mucho el riesgo de muerte y de lesión grave en la cabeza.", l: [
          "Casco integral certificado, siempre.",
          "Curso formal antes de salir a la calle.",
          "Equipo completo aunque haga calor."] },
        { t: "Los puntos ciegos de los vehículos grandes", d: "Camiones y camionetas tienen puntos ciegos enormes, sobre todo a la derecha y justo enfrente o detrás. Si manejas uno, revisa con más cuidado; si vas junto a uno, asume que no te ve si tú no ves sus espejos.", l: [
          "Si no ves los espejos del camión, él no te ve.",
          "No te quedes junto a un camión más de lo necesario.",
          "Al manejar algo grande, usa espejos y gira la cabeza."] },
        { t: "Manejar en Alemania", d: "En Alemania rige el «rechts vor links» (prioridad a la derecha) en cruces sin señales, el carril izquierdo de la Autobahn es solo para rebasar y está prohibido rebasar por la derecha. Muchas ciudades tienen zonas ambientales que exigen distintivo.", l: [
          "Prioridad a la derecha si no hay señal.",
          "Izquierda de la Autobahn solo para rebasar.",
          "Revisa la Umweltplakette antes de entrar a una ciudad."] }] },
    "Qué revisar y cada cuándo": { ic: "wrench",
      sesion: [[5, "Haz la revisión quincenal: presión de llantas (con refacción) y niveles."],
               [15, "Haz la mensual: dibujo de llantas con la moneda, luces y limpiaparabrisas; revisa que el kit de emergencia esté completo."],
               [5, "Pon recordatorios en el calendario para las revisiones quincenal, mensual y anual."]],
      sale: "Hiciste las revisiones quincenal y mensual y los recordatorios están programados.",
      copia: { t: "Calendario de revisión", l: [
        "Cada 2 semanas: presión de 4 llantas + refacción · niveles",
        "Cada mes: dibujo de llantas · luces · limpiaparabrisas · kit completo",
        "Cada 10,000 km o al año: rotación · frenos · filtro de cabina · refrigeración de batería",
        "Kit a bordo: gato · llave de cruz · arranque · triángulos · chaleco · botiquín · linterna",
        "Próxima revisión: ______"] },
      subtemas: [
        { t: "Mantenimiento preventivo contra correctivo", d: "En la industria, el mantenimiento preventivo cuesta mucho menos que reparar después de la falla. En un coche pasa igual: cambiar una llanta gastada a tiempo es barato; un accidente por ponchadura, no.", l: [
          "Sigue el calendario del fabricante.",
          "Anota cada servicio con fecha y kilometraje.",
          "Atiende los avisos del tablero pronto."] },
        { t: "Menos mantenimiento en el eléctrico", d: "Un eléctrico no tiene aceite de motor, bujías ni banda de distribución, por eso su mantenimiento es más simple. Pero sí necesita llantas, frenos, suspensión, líquido de frenos, filtros de cabina y revisión del sistema de enfriamiento de la batería.", l: [
          "Las llantas se gastan más rápido por el peso y el par.",
          "El líquido de frenos se cambia por tiempo, no por uso.",
          "La revisión de la batería es la más importante."] },
        { t: "La dashcam como seguro", d: "Una cámara de tablero graba lo que pasa al frente y a veces en la cabina. En un conflicto de tránsito o con un pasajero, el video aclara responsabilidades y puede ahorrar mucho dinero y tiempo.", l: [
          "Que grabe en bucle y guarde eventos por impacto.",
          "Revisa que la tarjeta de memoria funcione.",
          "Avisa a los pasajeros si graba la cabina."] }] },
    "Si tienes un accidente": { ic: "ambulance",
      sesion: [[5, "Guarda en tu celular el número de tu aseguradora, tu número de póliza y el procedimiento de Didi para incidentes."],
               [15, "Escribe la lista del paso en una nota de acceso rápido y revisa que tus triángulos y chaleco estén en el coche."],
               [5, "Toma una foto de tu póliza y tarjeta de circulación y guárdala en el celular."]],
      sale: "Tienes la lista de qué hacer, los números de tu seguro y tus documentos accesibles en el celular.",
      copia: { t: "Si choco", l: [
        "1. Intermitentes, triángulos, chaleco; fuera del carril si se puede.",
        "2. ¿Heridos? → 911.",
        "3. Aseguradora: ______ · póliza: ______",
        "4. Fotos: posición, daños, placas, póliza del otro, testigos.",
        "5. No admitir culpa ni firmar sin entender.",
        "6. Didi: reportar en la app de inmediato."] },
      subtemas: [
        { t: "Los triángulos y la distancia", d: "Los triángulos de seguridad deben colocarse a suficiente distancia para avisar a tiempo: a mayor velocidad de la vía, más lejos. En carretera, se recomienda colocarlos decenas de metros atrás y, si se puede, uno más lejos en curvas.", l: [
          "En ciudad, unos 20 a 30 metros atrás.",
          "En carretera, más lejos y antes de curvas.",
          "Ponte el chaleco antes de salir del coche."] },
        { t: "El ajustador y la culpa", d: "En México, la responsabilidad en un choque la determinan los ajustadores de las aseguradoras según el reglamento de tránsito, o la autoridad si no hay acuerdo. Admitir culpa por nervios puede complicar el proceso aunque no hayas tenido la culpa.", l: [
          "Mantén la calma y espera al ajustador.",
          "Describe los hechos, no opiniones.",
          "Guarda fotos y datos de testigos."] },
        { t: "Primeros auxilios en un choque", d: "En un accidente con heridos, la prioridad es la seguridad de la escena y llamar al 911. No muevas a un herido salvo peligro inmediato (fuego, riesgo de atropello), por posible lesión de columna. La ficha de Primeros auxilios explica qué hacer.", l: [
          "Primero tu seguridad.",
          "No muevas al herido sin necesidad.",
          "Si sabes, aplica primeros auxilios básicos mientras llega la ambulancia."] }] },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  recuperar: {
    "Por qué esto es una habilidad": { ic: "battery",
      sesion: [[5, "Anota a qué hora te dormiste y despertaste los últimos siete días."],
               [15, "Calcula tu promedio de horas y compáralo con tus semanas de mejor y peor rendimiento en el gym y el estudio."],
               [5, "Escribe una sola decisión de descanso para esta semana."]],
      sale: "Sabes cuánto dormiste en promedio esta semana y tienes una decisión concreta para la siguiente.",
      subtemas: [
        { t: "La supercompensación", d: "La fisiología del entrenamiento describe el ciclo: estímulo, fatiga, recuperación y supercompensación, en la que el cuerpo queda un poco mejor que antes. Si vuelves a entrenar antes de recuperarte, acumulas fatiga en lugar de progreso.", l: [
          "El progreso ocurre en la recuperación.",
          "Entrenar cansado de forma crónica estanca.",
          "Dormir y comer bien son parte del entrenamiento."] },
        { t: "El sueño y la memoria", d: "Durante el sueño profundo y el REM, el cerebro reactiva y consolida lo aprendido en el día. Estudios de privación de sueño muestran que dormir poco reduce la capacidad de aprender cosas nuevas al día siguiente.", l: [
          "Estudia alemán y luego duerme: se fija mejor.",
          "Una noche corta antes de un examen empeora el resultado.",
          "Repasar antes de dormir ayuda a consolidar."] },
        { t: "Rendimiento y falta de sueño", d: "Estudios clásicos encontraron que estar despierto unas 17 a 19 horas deteriora el rendimiento de forma comparable a cierto nivel de alcohol en sangre. Para alguien que maneja muchas horas, el cansancio es un riesgo de seguridad.", l: [
          "No manejes Didi con sueño acumulado.",
          "La somnolencia al volante es tan peligrosa como el alcohol.",
          "Si cabeceas, para y descansa."] }] },
    "Tu dato real y qué significa": { ic: "bar-chart",
      sesion: [[5, "Revisa tus horas reales de sueño de la última semana y compáralas con las de tu rutina ({{horasSueno}})."],
               [15, "Identifica qué noches te desviaste y qué lo causó: trabajo, Didi, celular, estudio."],
               [5, "Pon una alarma para cerrar la compu a la hora que te permite apagar la luz a las {{horaDormir}}."]],
      sale: "Sabes qué te quita sueño cada semana y tienes alarma para cerrar la compu a tiempo.",
      subtemas: [
        { t: "La deuda de sueño", d: "Un estudio de Hans Van Dongen y colegas mostró que dormir seis horas durante dos semanas deterioraba la atención tanto como pasar una o dos noches sin dormir, pero los participantes creían estar bien. La percepción se adapta; el rendimiento no.", l: [
          "No confíes en cómo te sientes: mide.",
          "Seis horas por semanas acumula deuda real.",
          "Recuperarla toma varias noches buenas, no una."] },
        { t: "Cronotipos", d: "Hay personas matutinas y vespertinas por genética, aunque la mayoría está en medio. Conocer tu cronotipo ayuda a poner las tareas difíciles en tus mejores horas y a no pelear innecesariamente con tu reloj.", l: [
          "Observa a qué hora te concentras mejor.",
          "Pon el estudio difícil en esas horas.",
          "La regularidad ayuda más que el cronotipo."] },
        { t: "Medir sin obsesionarte", d: "Los relojes y apps estiman el sueño, pero no son exactos en las fases. Sirven para ver tendencias de horas y regularidad. Preocuparte demasiado por los números puede empeorar el sueño (ortosomnia).", l: [
          "Mira horas y regularidad, no las fases exactas.",
          "Combina el dato con cómo te sientes.",
          "No revises la app a media noche."] }] },
    "Las cuatro palancas del sueño, en orden de impacto": { ic: "bed",
      sesion: [[5, "Revisa tu cuarto: temperatura, luz de la calle, ruido y aparatos encendidos."],
               [15, "Haz un cambio en cada palanca: hora fija incluso el fin de semana, cuarto más oscuro y fresco, celular fuera 30 minutos antes, y sol en la mañana."],
               [5, "Anota cómo dormiste las siguientes tres noches."]],
      sale: "Aplicaste las cuatro palancas y notaste diferencia en al menos tres noches.",
      subtemas: [
        { t: "El ritmo circadiano", d: "El reloj interno, en el núcleo supraquiasmático del cerebro, se sincroniza sobre todo con la luz. La luz de la mañana adelanta el reloj y la de la noche lo retrasa. Por eso la luz matutina ayuda a dormir a tiempo por la noche.", l: [
          "Sal 10 a 30 minutos a la luz en la mañana.",
          "Luces cálidas y bajas en la noche.",
          "Evita pantallas brillantes antes de dormir."] },
        { t: "La melatonina", d: "La melatonina es la hormona que señala que es de noche. La luz, sobre todo la azul, la suprime. Como suplemento puede ayudar con el jet lag, pero no es un somnífero potente y no sustituye los hábitos.", l: [
          "Sirve para ajustar horarios (jet lag a Alemania).",
          "Consulta a un médico antes de usarla seguido.",
          "Los hábitos de luz pesan más."] },
        { t: "El jet lag a Alemania", d: "Alemania está siete horas adelante de la Ciudad de México en buena parte del año. Viajar hacia el este cuesta más al reloj. Adelantar tu horario unos días antes y buscar luz de mañana al llegar acelera la adaptación.", l: [
          "Unos días antes, duerme y despierta más temprano.",
          "Al llegar, sol en la mañana y nada de siestas largas.",
          "Cuenta con unos días de adaptación antes de algo importante."] }] },
    "Cafeína: la cuenta que casi nadie hace": { ic: "hot-beverage",
      sesion: [[5, "Anota todo lo que tomas con cafeína en un día normal y a qué hora: café, té, refresco, pre-entreno."],
               [15, "Fija tu hora límite (2 o 3 pm) y reemplaza lo que tomas después por opciones sin cafeína."],
               [5, "Durante una semana, anota tu calidad de sueño para comparar."]],
      sale: "No tomaste cafeína después de tu hora límite durante una semana y anotaste cómo dormiste.",
      subtemas: [
        { t: "Cómo funciona la cafeína", d: "La cafeína bloquea los receptores de adenosina, una sustancia que se acumula durante el día y genera presión de sueño. No elimina el cansancio: lo esconde. Cuando la cafeína se va, la adenosina acumulada sigue ahí.", l: [
          "La cafeína no repone energía, la presta.",
          "El bajón de la tarde es la adenosina de vuelta.",
          "Dormir es lo único que la limpia."] },
        { t: "La sensibilidad varía", d: "Por genética (el gen CYP1A2, entre otros), algunas personas metabolizan la cafeína rápido y otras lento. Para las lentas, un café a mediodía puede afectar el sueño. Tu respuesta personal importa más que la regla general.", l: [
          "Prueba cortar más temprano y observa.",
          "Si duermes mal, revisa la cafeína primero.",
          "El descafeinado tiene un poco de cafeína."] },
        { t: "Cafeína y entrenamiento", d: "La cafeína mejora el rendimiento deportivo y por eso está en casi todos los pre-entrenos. Entrenar en la noche con pre-entreno compromete el sueño, que es cuando el músculo se recupera.", l: [
          "Si entrenas de noche, usa pre-entreno sin cafeína.",
          "Revisa la etiqueta: algunos tienen mucha.",
          "Entrenar bien dormido rinde más que con estimulante."] }] },
    "Alcohol: no es un somnífero": { ic: "prohibited",
      sesion: [[5, "Revisa en tu registro de hábitos tu meta de alcohol y cómo vas."],
               [15, "Si alguna vez tomaste antes de dormir, compara cómo dormiste y cómo entrenaste al día siguiente contra un día sin alcohol."],
               [5, "Escribe la regla que sostiene tu meta: qué pides en una reunión en vez de alcohol."]],
      sale: "Tienes clara tu regla para reuniones y sabes cómo te afecta el alcohol al sueño y al entrenamiento.",
      subtemas: [
        { t: "Alcohol y sueño REM", d: "El alcohol suprime el sueño REM en la primera parte de la noche y fragmenta la segunda mitad, con más despertares. Aunque te duermas rápido, el sueño es de peor calidad y menos reparador.", l: [
          "Dormir rápido no es dormir bien.",
          "Más despertares en la madrugada.",
          "Peor memoria y ánimo al día siguiente."] },
        { t: "Alcohol y músculo", d: "Estudios han encontrado que el consumo de alcohol después del ejercicio reduce la síntesis de proteína muscular, incluso cuando se consume proteína. Además, deshidrata y empeora el sueño, que es cuando se recupera el músculo.", l: [
          "El alcohol frena la recuperación muscular.",
          "Deshidrata: el siguiente entrenamiento rinde menos.",
          "Tu meta de no tomar también es una meta de gym."] },
        { t: "Socializar sin alcohol", d: "Pedir una bebida sin alcohol con naturalidad, sin explicar de más, es una habilidad social. Cada vez hay más opciones sin alcohol en bares y restaurantes, y la gente lo cuestiona menos de lo que crees.", l: [
          "Ten tu bebida de cabecera: agua mineral con limón, un mocktail.",
          "Si preguntan: «ahorita no estoy tomando».",
          "Sé el que maneja: es la excusa perfecta."] }] },
    "El ritual antes de dormir": { ic: "candle",
      sesion: [[5, "Escribe tu ritual de 15 a 20 minutos en orden: luces bajas, celular fuera, pendientes al papel, estiramiento o meditación."],
               [15, "Hazlo hoy completo, a la misma hora, y deja el celular cargando fuera del cuarto."],
               [5, "Mañana, anota cuánto tardaste en dormirte."]],
      sale: "Hiciste tu ritual completo con el celular fuera del cuarto y te dormiste más rápido.",
      copia: { t: "Mi ritual de noche", l: [
        "__:__ Cierro la compu y bajo luces",
        "__:__ Celular a cargar fuera del cuarto",
        "__:__ Anoto 3 pendientes de mañana",
        "__:__ Estiramiento o meditación (5-10 min)",
        "{{horaDormir}} Luz fuera"] },
      subtemas: [
        { t: "Escribir los pendientes", d: "Un estudio de Michael Scullin y colegas (2018) encontró que escribir una lista de pendientes para el día siguiente antes de acostarse ayudaba a dormirse más rápido que escribir sobre lo ya hecho. Sacar los pendientes de la cabeza reduce la rumiación.", l: [
          "Cinco minutos de lista antes de dormir.",
          "Pendientes concretos, no preocupaciones vagas.",
          "Deja la lista lejos de la cama."] },
        { t: "La cama solo para dormir", d: "La terapia cognitivo-conductual para el insomnio (TCC-I) usa el control de estímulos: usar la cama solo para dormir para que el cerebro la asocie con sueño. Si no te duermes en unos 20 minutos, levántate y regresa cuando tengas sueño.", l: [
          "Nada de trabajo ni series en la cama.",
          "Si no duermes en 20 minutos, levántate.",
          "Regresa solo cuando tengas sueño."] },
        { t: "La respiración para dormir", d: "La respiración lenta, con exhalaciones más largas que las inhalaciones, activa el sistema parasimpático y baja el ritmo cardiaco. Técnicas como inhalar 4 segundos y exhalar 6 a 8 ayudan a soltar la tensión del día.", l: [
          "Inhala 4 segundos, exhala 6 a 8.",
          "Cinco a diez minutos en la cama.",
          "Si la mente se va, vuelve a contar."] }] },
    "La siesta, bien hecha": { ic: "zzz",
      sesion: [[5, "Elige un día de esta semana con un hueco antes de las 4 pm."],
               [20, "Toma una siesta de 20 minutos con alarma; si quieres probar el café-siesta, toma el café justo antes."],
               [5, "Anota cómo te sentiste al despertar y cómo dormiste esa noche."]],
      sale: "Tomaste una siesta de 20 minutos antes de las 4 pm y despertaste sin aturdimiento.",
      subtemas: [
        { t: "Las fases del sueño y la siesta", d: "En los primeros minutos pasas por sueño ligero (fases N1 y N2); el sueño profundo (N3) suele llegar después de unos 30 minutos. Despertar de N3 produce inercia del sueño: aturdimiento que puede durar un rato.", l: [
          "Máximo 20-25 minutos.",
          "Pon alarma siempre.",
          "Si despiertas aturdido, la siesta fue larga."] },
        { t: "La siesta y la NASA", d: "Un estudio de la NASA con pilotos encontró que una siesta planeada de unos 26 minutos mejoraba el desempeño y la alerta de forma significativa. Por eso en aviación se usan siestas controladas en vuelos largos.", l: [
          "Una siesta corta mejora la alerta.",
          "Útil en días de mucho manejo.",
          "No sustituye el sueño de la noche."] },
        { t: "Cuándo evitar la siesta", d: "Si tienes insomnio o te cuesta dormir de noche, la siesta puede empeorarlo porque reduce la presión de sueño. En ese caso, es mejor aguantar hasta la noche y consolidar el sueño nocturno.", l: [
          "Con insomnio, sin siestas.",
          "Nunca después de las 4 pm.",
          "Si la necesitas a diario, revisa tus noches."] }] },
    "Descanso activo: no todo es quedarte quieto": { ic: "person-walking",
      sesion: [[5, "Elige una actividad de descanso activo: caminar sin celular, estirar o nadar suave."],
               [20, "Hazla a intensidad baja: deberías poder conversar sin jadear."],
               [5, "Compara cómo te sientes contra una tarde de scroll y anótalo."]],
      sale: "Hiciste 20 minutos de descanso activo a intensidad baja y notaste la diferencia contra el scroll.",
      subtemas: [
        { t: "La intensidad del descanso activo", d: "El descanso activo funciona a intensidad baja: zona 1, donde puedes hablar con frases completas. Aumenta el flujo de sangre y la movilidad sin generar más fatiga. Si sube a esfuerzo moderado, ya es entrenamiento.", l: [
          "Prueba del habla: puedes conversar cómodo.",
          "Pulso bajo, sin sudar mucho.",
          "Si te cansa, era demasiado."] },
        { t: "Naturaleza y recuperación mental", d: "La teoría de la restauración de la atención de Rachel y Stephen Kaplan propone que los entornos naturales recargan la atención agotada. Estudios han encontrado que caminar en un parque mejora el ánimo y la concentración más que caminar en la ciudad.", l: [
          "Camina en un parque, no en una avenida.",
          "Sin audífonos de vez en cuando.",
          "Chapultepec o un parque cercano cuentan."] },
        { t: "El scroll no recupera", d: "El consumo de redes sociales mantiene la atención activa con estímulos constantes y comparación social. Varios estudios lo asocian con peor ánimo y peor sueño cuando es excesivo. Se siente como descanso, pero no repara.", l: [
          "Pon límite de tiempo a las apps.",
          "Sustituye un rato de scroll por una caminata.",
          "Fíjate cómo te sientes después de cada uno."] }] },
    "Al menos un día completo sin gym": { ic: "couch-and-lamp",
      sesion: [[5, "Revisa tu semana y elige tu día sin gym, que no sea el más cargado de trabajo y Didi."],
               [15, "Márcalo en el calendario como descanso y planea algo ligero: caminar, estirar, una actividad que disfrutes."],
               [5, "Anota tus cargas de los principales ejercicios para ver si suben en las próximas semanas."]],
      sale: "Tu día sin gym está en el calendario y llevas el registro de cargas para ver el efecto.",
      subtemas: [
        { t: "El sobreentrenamiento", d: "El síndrome de sobreentrenamiento aparece cuando el entrenamiento supera de forma sostenida la capacidad de recuperación: el rendimiento baja, el ánimo empeora, el sueño se altera y aumentan las lesiones. Recuperarse de él puede tomar semanas o meses.", l: [
          "Rendimiento que baja pese a entrenar más es una señal.",
          "Pulso en reposo elevado durante días, otra.",
          "La solución es descansar, no entrenar más."] },
        { t: "Tendones y articulaciones", d: "Los músculos se adaptan rápido, pero los tendones y ligamentos más lento, porque tienen menos irrigación. Subir cargas muy rápido sin descanso suficiente es una causa común de tendinopatías.", l: [
          "Sube cargas de forma gradual.",
          "Respeta los días de descanso.",
          "Dolor en el tendón: baja carga, no la ignores."] },
        { t: "Descargas programadas", d: "Muchos programas de fuerza incluyen una semana de descarga cada cuatro a seis semanas, con menos volumen o intensidad. Permite que el cuerpo asimile el trabajo acumulado y suele venir seguida de mejoras.", l: [
          "Cada 4-6 semanas, una semana más ligera.",
          "Menos series, mismo ejercicio.",
          "Úsala también en semanas de mucho trabajo."] }] },
    "Dolor normal o señal de alarma": { ic: "adhesive-bandage",
      sesion: [[5, "Escribe las características del dolor normal y del de alarma en una nota."],
               [15, "Revisa cualquier molestia que tengas hoy y clasifícala: dónde, cuándo apareció, si mejora o empeora con el movimiento."],
               [5, "Si es de alarma y lleva varios días, agenda una consulta."]],
      sale: "Sabes clasificar tus molestias y actuaste según si eran normales o de alarma.",
      subtemas: [
        { t: "Las agujetas (DOMS)", d: "El dolor muscular de aparición tardía aparece entre 24 y 72 horas después de un ejercicio nuevo o intenso, sobre todo con contracciones excéntricas. Se relaciona con microdaño e inflamación, no con ácido láctico como se creía.", l: [
          "Movimiento suave ayuda más que reposo total.",
          "Disminuye cuando el cuerpo se adapta al ejercicio.",
          "No es señal de buen o mal entrenamiento."] },
        { t: "Señales de urgencia", d: "Algunos síntomas no son de gimnasio: dolor de pecho con falta de aire, orina oscura después de un esfuerzo extremo (posible rabdomiólisis), hinchazón intensa, pérdida de fuerza o adormecimiento. Requieren atención médica inmediata.", l: [
          "Dolor de pecho al esforzarte: deja de entrenar y busca atención.",
          "Orina color refresco de cola tras un esfuerzo extremo: urgencias.",
          "Adormecimiento o pérdida de fuerza: consulta pronto."] },
        { t: "La regla del dolor 0-10", d: "Muchos fisioterapeutas usan una regla práctica: un dolor de hasta 3 o 4 de 10 durante el ejercicio, que se calma al día siguiente, suele ser aceptable en rehabilitación; si sube más o empeora al día siguiente, hay que bajar la carga.", l: [
          "Califica el dolor del 0 al 10.",
          "Más de 4 o que empeora al día siguiente: baja carga.",
          "Ante la duda, consulta a un fisioterapeuta."] }] },
    "Los dos tipos de cansancio": { ic: "tired-face",
      sesion: [[5, "Califica tu cansancio físico y mental del 1 al 10 al terminar el día."],
               [15, "Elige una acción para cada uno: para el físico, sueño o descanso del gym; para el mental, un bloque sin celular ni pendientes."],
               [5, "Anota cómo amaneciste al día siguiente."]],
      sale: "Distinguiste tu cansancio físico del mental y aplicaste el remedio correcto a cada uno.",
      subtemas: [
        { t: "La fatiga mental afecta al cuerpo", d: "Samuele Marcora encontró que la fatiga mental reduce el rendimiento físico: los participantes cansados mentalmente percibían el ejercicio como más difícil y se rendían antes, aunque sus músculos estaban igual.", l: [
          "Un día de mucho trabajo mental afecta tu gym.",
          "No te frustres si rindes menos esos días.",
          "Entrena antes de las tareas mentales si puedes."] },
        { t: "Desconexión psicológica", d: "Sabine Sonnentag y otros investigadores encontraron que desconectarse mentalmente del trabajo en el tiempo libre es clave para recuperarse y prevenir el agotamiento. No es solo dejar de trabajar, sino dejar de pensar en el trabajo.", l: [
          "Apaga notificaciones de trabajo fuera de horario.",
          "Haz actividades que absorban tu atención: deporte, música.",
          "Un ritual de cierre de jornada ayuda a soltar."] },
        { t: "El descanso de la toma de decisiones", d: "Tomar muchas decisiones seguidas cansa. Por eso las rutinas automáticas —qué comer, qué ropa, cuándo entrenar— liberan energía mental para lo importante y facilitan el descanso.", l: [
          "Automatiza lo repetitivo.",
          "Planea la semana el domingo.",
          "Deja menos decisiones para la noche."] }] },
    "Señales tempranas de que te estás quemando": { ic: "fire",
      sesion: [[5, "Repasa la lista de señales y marca las que reconoces en las últimas dos semanas."],
               [15, "Si marcas dos o más, escribe qué bajarás la próxima semana: horas de Didi, un proyecto, una obligación."],
               [5, "Comparte con alguien de confianza cómo estás."]],
      sale: "Revisaste las señales con honestidad y, si hacía falta, decidiste qué bajar la próxima semana.",
      subtemas: [
        { t: "El burnout según la OMS", d: "La OMS describe el burnout como un síndrome por estrés laboral crónico no bien gestionado, con tres dimensiones: agotamiento, distancia mental o cinismo hacia el trabajo y menor eficacia profesional. Christina Maslach desarrolló el instrumento clásico para medirlo.", l: [
          "Agotamiento: sin energía aunque descanses.",
          "Cinismo: ya nada te importa del trabajo.",
          "Ineficacia: sientes que no rindes."] },
        { t: "Burnout o depresión", d: "El burnout y la depresión comparten síntomas, pero la depresión afecta todas las áreas de la vida, no solo el trabajo. Si la tristeza, la falta de interés o los pensamientos negativos aparecen en todo, conviene buscar ayuda profesional.", l: [
          "Si afecta todas las áreas, consulta.",
          "La ayuda profesional es una herramienta.",
          "Línea de la Vida: 800 911 2000, las 24 horas."] },
        { t: "Recursos frente a demandas", d: "El modelo de demandas y recursos laborales de Bakker y Demerouti explica que el agotamiento aparece cuando las demandas superan los recursos (apoyo, autonomía, descanso). Se puede actuar en los dos lados: bajar demandas o sumar recursos.", l: [
          "Baja una demanda: un turno de Didi menos.",
          "Suma un recurso: ayuda, descanso, apoyo.",
          "Pide apoyo antes de llegar al límite."] }] },
    "Descanso planeado contra descanso forzado": { ic: "spiral-calendar",
      sesion: [[5, "Abre tu calendario de las próximas cuatro semanas."],
               [15, "Bloquea tus descansos como citas: noches de sueño completo, un día sin gym, una tarde sin pendientes por semana."],
               [5, "Pon alertas para que nadie (ni tú) los ocupe."]],
      sale: "Tus descansos de las próximas cuatro semanas están en el calendario como citas.",
      subtemas: [
        { t: "Las vacaciones y su efecto", d: "Los estudios sobre vacaciones muestran que el bienestar mejora durante el descanso, pero el efecto se desvanece en pocas semanas al volver. Por eso son más eficaces los descansos frecuentes que un solo descanso largo al año.", l: [
          "Mejor descansos cortos y frecuentes.",
          "Un fin de semana desconectado cada tanto.",
          "No acumules todo para las vacaciones."] },
        { t: "Los ciclos ultradianos", d: "Durante el día, la atención sigue ciclos de unos 90 minutos de mayor y menor alerta. Hacer pausas breves cada 60 a 90 minutos de trabajo concentrado mantiene el rendimiento durante más tiempo.", l: [
          "Trabaja en bloques de 60 a 90 minutos.",
          "Pausa de 5 a 10 minutos entre bloques.",
          "Muévete en la pausa: levántate, estira."] },
        { t: "Proteger el descanso como una cita", d: "Lo que no está en el calendario se sacrifica primero. Tratar el descanso como un compromiso con alguien importante —tú— aumenta mucho la probabilidad de cumplirlo.", l: [
          "Ponle nombre en el calendario.",
          "No lo muevas salvo emergencia real.",
          "Si lo mueves, reagéndalo de inmediato."] }] },
    "Tu revisión de los domingos": { ic: "clipboard",
      sesion: [[5, "Abre tus registros de sueño y entrenamiento de la semana."],
               [10, "Contesta las cuatro preguntas del paso con datos reales."],
               [5, "Decide tu foco de descanso de la semana que empieza."]],
      sale: "Contestaste las cuatro preguntas con datos y tienes un foco de descanso para la semana.",
      copia: { t: "Revisión de descanso", l: [
        "Semana del ______",
        "Noches con menos de 6 h: ___",
        "¿Día completo sin gym? sí / no",
        "¿Tarde sin pendientes del negocio? sí / no",
        "Señales de desgaste: ______",
        "Foco de la próxima semana: ______"] },
      subtemas: [
        { t: "Lo que se mide mejora", d: "Llevar un registro breve de sueño y descanso hace visible lo que de otro modo se normaliza. La retroalimentación semanal permite ajustar antes de que la fatiga se acumule.", l: [
          "Cinco minutos, el mismo día cada semana.",
          "Los números mandan sobre la sensación.",
          "Ajusta una sola cosa por semana."] },
        { t: "Revisión y planeación juntas", d: "Revisar la semana pasada y planear la siguiente en el mismo momento conecta el aprendizaje con la acción. Es el principio de los ciclos de mejora continua: planear, hacer, revisar, ajustar.", l: [
          "Primero revisa, luego planea.",
          "Pon los descansos antes que los pendientes.",
          "Revisa si el plan anterior funcionó."] },
        { t: "Tendencias, no días sueltos", d: "Una mala noche no es un problema; tres semanas de malas noches sí. Mirar tendencias de varias semanas te da la imagen real y evita sobrerreaccionar a un día malo.", l: [
          "Compara cuatro semanas seguidas.",
          "Busca patrones: qué días duermes peor.",
          "Ataca el patrón, no el día suelto."] }] },
    "📚 Qué leer": { ic: "books" },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  modales: {
    "Para qué sirven de verdad": { ic: "man-in-tuxedo",
      sesion: [[5, "Piensa en tres situaciones próximas donde los modales importan: una comida de trabajo, una reunión familiar, una cena."],
               [15, "Para cada una, escribe qué te pone nervioso y qué harías para que los demás estén cómodos."],
               [5, "Escribe la regla madre en una línea: haz que el otro quede bien."]],
      sale: "Tienes tres situaciones identificadas y sabes qué harías en cada una para que los demás estén cómodos.",
      subtemas: [
        { t: "La etiqueta como lenguaje común", d: "El sociólogo Norbert Elias estudió cómo las normas de mesa se desarrollaron en Europa para regular la convivencia. Funcionan como un idioma compartido: cuando todos lo hablan, nadie tiene que pensar en él y la atención se va a la conversación.", l: [
          "Saber las reglas libera atención.",
          "No se trata de juzgar a quien no las sabe.",
          "Cada cultura tiene su versión."] },
        { t: "Cortesía e inteligencia social", d: "Los modales son una expresión visible de la empatía: anticipar qué necesita el otro —una bebida, que lo presenten, que no lo corrijan en público—. Por eso en entrevistas y comidas de negocios se observan: dicen cómo tratas a los demás.", l: [
          "Observa qué necesita cada persona en la mesa.",
          "Trata igual al mesero que al director.",
          "La cortesía se nota más en detalles que en reglas."] },
        { t: "Diferencias entre México y Alemania", d: "En México la cortesía tiende a ser cálida e indirecta: saludos largos, abrazos, rodeos amables. En Alemania es más formal y directa: puntualidad estricta, apellido y «Sie» hasta que te ofrezcan el «du». Saber ambas evita malentendidos.", l: [
          "En Alemania, usa «Herr/Frau» y apellido al principio.",
          "Espera a que te ofrezcan tutear («duzen»).",
          "La puntualidad es respeto, no rigidez."] }] },
    "Presentarte y presentar a otros": { ic: "handshake",
      sesion: [[5, "Ensaya frente al espejo tu presentación: de pie, contacto visual, nombre completo, mano firme."],
               [15, "Escribe cómo presentarías a dos personas de tu entorno con un dato de cada una, empezando por la de mayor jerarquía."],
               [5, "Usa la fórmula en tu siguiente presentación real."]],
      sale: "Presentaste a dos personas con un dato de cada una y se quedaron hablando.",
      copia: { t: "Presentar a dos personas", l: [
        "«______ (mayor jerarquía), le presento a ______.",
        "______ es ______ (dato).",
        "______, ______ es ______ (dato).",
        "Seguro tienen que hablar de ______.»"] },
      subtemas: [
        { t: "El apretón de manos", d: "Un estudio de William Chaplin y colegas encontró que un apretón firme, completo y con contacto visual se asocia con una primera impresión más favorable. Uno flojo o aplastante transmite lo contrario.", l: [
          "Palma con palma, firme sin apretar.",
          "Dos o tres sacudidas, dos segundos.",
          "Contacto visual y sonrisa al mismo tiempo."] },
        { t: "Ponerse de pie", d: "Levantarse para saludar a alguien que llega es una señal clásica de respeto en muchas culturas. Quedarse sentado puede interpretarse como desinterés, sobre todo con personas mayores o de mayor jerarquía.", l: [
          "Párate al saludar a quien llega.",
          "En una mesa, al menos inclínate si no puedes pararte.",
          "Siéntate cuando el otro se siente."] },
        { t: "Títulos en Alemania", d: "En Alemania los títulos académicos se usan en contextos formales: «Herr Dr. Müller». Un profesor universitario es «Herr Professor» o «Frau Professorin». Usarlos correctamente en la maestría muestra respeto.", l: [
          "Usa el título si lo tiene, sobre todo por escrito.",
          "En correos: «Sehr geehrter Herr Dr. ______».",
          "Observa cómo se dirigen los demás."] }] },
    "La mesa: dónde está cada cosa": { ic: "fork-and-knife-with-plate",
      sesion: [[5, "Busca una imagen de una mesa formal puesta y estúdiala dos minutos."],
               [15, "Pon la mesa completa en casa: platos, cubiertos de fuera hacia dentro, copa a la derecha, pan a la izquierda; practica el truco b-d con las manos."],
               [5, "Siéntate y coloca la servilleta en el regazo como lo harías en un restaurante."]],
      sale: "Pones una mesa formal de memoria y sabes, con el truco de las manos, cuál es tu pan y tu bebida.",
      subtemas: [
        { t: "Servicio a la rusa y a la francesa", d: "El servicio a la francesa ponía todos los platos a la vez en la mesa; el servicio a la rusa, que se impuso en el siglo XIX, sirve un plato tras otro. De ahí viene el orden de los cubiertos de fuera hacia dentro: uno por cada tiempo.", l: [
          "Cada cubierto corresponde a un tiempo.",
          "Los de fuera se usan primero.",
          "Los de arriba del plato, para el postre."] },
        { t: "Las copas en orden", d: "En una mesa formal, las copas van arriba a la derecha, normalmente en el orden en que se usarán: agua, vino blanco, vino tinto, a veces una flauta para espumoso. La de agua suele ser la más grande.", l: [
          "Agua: la más grande.",
          "Vino tinto: copa más amplia que el blanco.",
          "Si no tomas vino, deja la copa boca arriba y pide agua."] },
        { t: "Cuándo empezar a comer", d: "La regla de esperar al anfitrión permite que todos coman juntos. En comidas grandes, el anfitrión puede decir «empiecen» para que la comida no se enfríe; entonces está bien empezar.", l: [
          "Espera a que el anfitrión empiece o lo indique.",
          "En mesas grandes, cuando ya sirvieron a tus vecinos.",
          "Si el anfitrión dice que empieces, empieza."] }] },
    "Comer sin llamar la atención": { ic: "shallow-pan-of-food",
      sesion: [[5, "Repasa la lista corta: boca cerrada, un bocado a la vez, sin codos, probar antes de salar, pan con la mano."],
               [15, "En tu siguiente comida, revisa a propósito cada punto de la lista."],
               [5, "Anota el punto que más te cuesta y practícalo en las siguientes tres comidas."]],
      sale: "Comiste una comida completa cuidando los seis puntos y sabes cuál te cuesta más.",
      subtemas: [
        { t: "El ruido al comer", d: "La misofonía es una aversión intensa a ciertos sonidos, como masticar. Afecta a un porcentaje importante de personas. Comer con la boca cerrada no es solo etiqueta: evita incomodar a quien lo sufre.", l: [
          "Mastica con la boca cerrada.",
          "No sorbas ni hagas ruido con los cubiertos.",
          "Bocados pequeños se mastican más silenciosos."] },
        { t: "El ritmo de la mesa", d: "Terminar mucho antes o mucho después que los demás se nota. Ajustar tu ritmo al de la mesa —poniendo los cubiertos en pausa mientras hablas— hace que todos terminen juntos.", l: [
          "Observa el ritmo de los demás.",
          "Pon los cubiertos en pausa para hablar.",
          "No te apures si eres el más lento: pausa menos."] },
        { t: "Comida difícil", d: "Algunos alimentos son complicados: mariscos con concha, pasta larga, tacos. La regla general es seguir lo que hacen los demás y, ante la duda, elegir algo fácil de comer en una comida importante.", l: [
          "En una cena de negocios, pide algo fácil.",
          "Pasta larga: enrolla pocos hilos con el tenedor.",
          "Tacos y comida con la mano: está bien si es el contexto."] }] },
    "Los dos códigos de cubiertos": { ic: "fork-and-knife",
      sesion: [[5, "Pon la mesa con cubiertos para un plato principal."],
               [20, "Come tu comida principal en estilo continental: tenedor en la izquierda boca abajo, cuchillo en la derecha, sin cambiar de mano."],
               [5, "Al terminar, deja los cubiertos en señal de terminado y practica la de pausa."]],
      sale: "Comiste un plato completo en estilo continental y dejaste las señales correctas de pausa y terminado.",
      subtemas: [
        { t: "Por qué existen dos estilos", d: "El estilo de cambiar el tenedor de mano era común en Europa y se conservó en Estados Unidos, mientras que en Europa se popularizó comer sin cambiar de mano. Ninguno es incorrecto; cada uno es la norma de su región.", l: [
          "En Estados Unidos: estilo americano.",
          "En Europa y Alemania: continental.",
          "En México se ven ambos."] },
        { t: "El lenguaje silencioso de los cubiertos", d: "La posición de los cubiertos comunica al mesero si terminaste o no. En restaurantes buenos lo leen y no preguntan. Conocer las señales evita que te retiren el plato a medias.", l: [
          "Pausa: V invertida, puntas casi juntas.",
          "Terminado: paralelos, en diagonal.",
          "Nunca apoyados en el mantel."] },
        { t: "Comer en Alemania", d: "En Alemania se espera que las manos estén visibles sobre la mesa (las muñecas apoyadas), que se coma con cuchillo y tenedor incluso cosas como la pizza en algunos contextos, y que se diga «Guten Appetit» antes de empezar.", l: [
          "Di «Guten Appetit» al empezar.",
          "Manos visibles sobre la mesa.",
          "Las papas no se cortan con cuchillo en la tradición alemana: se aplastan con el tenedor."] }] },
    "Ser un buen invitado": { ic: "wrapped-gift",
      sesion: [[5, "Revisa tu próximo compromiso social y confirma tu asistencia si no lo has hecho."],
               [15, "Decide qué llevarás y a qué hora saldrás para llegar puntual; prepara tu mensaje de agradecimiento del día siguiente."],
               [5, "Pon un recordatorio para mandar el agradecimiento."]],
      sale: "Confirmaste, llegaste puntual con algo en la mano y al día siguiente mandaste el agradecimiento.",
      subtemas: [
        { t: "Qué llevar", d: "El regalo de invitado es un gesto, no una competencia: vino, postre, flores o algo de tu tierra. En Alemania son comunes las flores (en número impar, sin envolver al entregarlas) o un buen vino; evita crisantemos y lirios, asociados a funerales.", l: [
          "Algo sencillo y bien presentado.",
          "No esperes que lo sirvan en ese momento.",
          "En Alemania, flores en número impar."] },
        { t: "La puntualidad según la cultura", d: "Edward T. Hall distinguió culturas monocrónicas (el tiempo es lineal y la puntualidad sagrada, como Alemania) y policrónicas (el tiempo es flexible, como México). Adaptarte al contexto es parte de los modales.", l: [
          "En México, social: margen razonable.",
          "En trabajo, siempre puntual en ambos países.",
          "En Alemania, puntual en todo."] },
        { t: "La nota de agradecimiento", d: "Un estudio de Amit Kumar y Nicholas Epley encontró que la gente subestima cuánto alegra recibir un agradecimiento y sobreestima lo incómodo que será escribirlo. Un mensaje específico al día siguiente deja huella.", l: [
          "Menciona algo concreto de la reunión.",
          "Mándalo al día siguiente.",
          "Corto y sincero vale más que largo."] }] },
    "Ser un buen anfitrión": { ic: "house-with-garden",
      sesion: [[5, "Planea una reunión pequeña: quién, cuándo y qué servirás."],
               [15, "Pregunta alergias al invitar, prepara bebida y botana antes de la hora y decide a quién presentarás con quién."],
               [5, "Anota la lista de tareas del día para que todo esté listo antes de que llegue el primero."]],
      sale: "Tienes una reunión planeada con alergias preguntadas, bebida y botana listas antes de la hora y presentaciones pensadas.",
      copia: { t: "Lista del anfitrión", l: [
        "Invitados: ______ · alergias/restricciones: ______",
        "Bebidas (con y sin alcohol): ______",
        "Botana lista antes de las ______",
        "Plato principal: ______ (preparado con anticipación)",
        "Presentaciones: ______ con ______ (porque ______)",
        "Música, luz y lugar para abrigos: ______"] },
      subtemas: [
        { t: "Preparar con anticipación", d: "Los anfitriones con experiencia cocinan platos que se pueden preparar antes: guisos, horneados, ensaladas armadas al final. Así están con sus invitados y no en la cocina. La mise en place aplica igual.", l: [
          "Elige un menú que se haga antes.",
          "Deja solo el último toque para cuando lleguen.",
          "Lava lo usado antes de que lleguen."] },
        { t: "Bebidas para todos", d: "Un buen anfitrión ofrece opciones sin alcohol tan cuidadas como las alcohólicas: aguas frescas, refrescos de calidad, un mocktail. Así nadie se siente fuera y tú puedes mantener tu meta sin hacerlo notar.", l: [
          "Al menos una bebida sin alcohol especial.",
          "Agua siempre disponible.",
          "No presiones a nadie a tomar."] },
        { t: "Cerrar la reunión con gracia", d: "El anfitrión también marca el final: dejar de servir, ofrecer café o un último postre, agradecer a todos. Así nadie tiene que adivinar cuándo irse.", l: [
          "El café o el postre anuncian el final.",
          "Acompaña a los invitados a la puerta.",
          "Agradece que vinieron."] }] },
    "Brindar": { ic: "clinking-glasses",
      sesion: [[5, "Escribe un brindis de menos de un minuto para alguien cercano: algo específico de esa persona y el deseo final."],
               [10, "Ensáyalo en voz alta de pie, con un vaso en la mano, mirando a puntos distintos del cuarto."],
               [5, "Practica decir «Prost» y «Zum Wohl» y la regla de mirar a los ojos al chocar."]],
      sale: "Tienes un brindis de menos de un minuto ensayado y dominas el contacto visual del brindis alemán.",
      copia: { t: "Un brindis corto", l: [
        "Quiero decir unas palabras por ______.",
        "Una cosa que admiro de ______ es ______ (algo específico).",
        "Me acuerdo de cuando ______.",
        "Por ______: que ______. ¡Salud!"] },
      subtemas: [
        { t: "El origen del brindis", d: "La costumbre de brindar tiene muchas historias; en la Inglaterra del siglo XVII se ponía un trozo de pan tostado en el vino, y de ahí viene «toast» en inglés. Hoy es un ritual para unir a un grupo en un mismo momento.", l: [
          "El brindis une a todos en un mismo gesto.",
          "Se espera a que todos tengan algo en la copa.",
          "El anfitrión suele hacer el primero."] },
        { t: "Brindar sin alcohol", d: "Puedes brindar con cualquier bebida en la mayoría de los contextos sociales actuales. La superstición de que brindar con agua da mala suerte existe en algunos lugares (como en la Marina), así que en situaciones formales elige una bebida sin alcohol distinta al agua.", l: [
          "Un agua mineral o un refresco funcionan.",
          "Lo importante es levantar la copa y mirar a los ojos.",
          "Nadie tiene por qué saber qué hay en tu copa."] },
        { t: "Hablar en público breve", d: "Un buen brindis sigue la estructura de cualquier discurso corto: un gancho, una historia o rasgo específico, y un cierre claro. La brevedad es respeto: la gente quiere volver a la conversación.", l: [
          "Menos de un minuto.",
          "Una anécdota concreta, no una lista de cualidades.",
          "Termina con la frase de brindis y la copa arriba."] }] },
    "El celular": { ic: "mobile-phone-off",
      sesion: [[5, "Antes de tu próxima comida o reunión, decide dónde estará tu celular: guardado o fuera de la mesa."],
               [20, "Haz la comida completa sin sacarlo; si esperas algo importante, avísalo al inicio."],
               [5, "Anota cuántas veces sentiste el impulso de revisarlo y cuántas personas sacaron el suyo."]],
      sale: "Hiciste una comida completa sin sacar el celular y notaste la diferencia en la conversación.",
      subtemas: [
        { t: "El «phubbing»", d: "Phubbing es ignorar a alguien por mirar el teléfono. Estudios de James Roberts y Meredith David lo asocian con menor satisfacción en las relaciones. Quien lo recibe se siente menos importante, aunque no lo diga.", l: [
          "El celular en la mesa compite con la persona.",
          "Quien lo recibe lo nota siempre.",
          "Guárdalo para mostrar que la persona importa."] },
        { t: "La atención dividida", d: "Revisar el celular durante una conversación no es hacer dos cosas a la vez: es cambiar de una a otra y perder información en cada cambio. La comprensión y la memoria de la conversación bajan.", l: [
          "Una conversación a la vez.",
          "Si debes contestar, sal y vuelve.",
          "Luego retoma: «perdón, ¿en qué estábamos?»."] },
        { t: "Reglas de grupo", d: "Algunos grupos de amigos juegan a poner todos los celulares en el centro de la mesa: el primero que lo toma paga algo. Es una forma divertida de proteger la convivencia sin sermones.", l: [
          "Propón el juego en reuniones con amigos.",
          "En familia, una regla de cero celulares en la cena.",
          "Da el ejemplo tú primero."] }] },
    "Vestir para la ocasión": { ic: "necktie",
      sesion: [[5, "Revisa tu guía de Vestimenta y tu clóset: ¿tienes un conjunto casual de negocios y uno formal completos?"],
               [15, "Arma los dos conjuntos completos, revisa que estén limpios, planchados y que te queden bien; anota lo que falta."],
               [5, "Pon en tu lista de compras lo que falte, priorizando la talla correcta."]],
      sale: "Tienes listo un conjunto casual de negocios y uno formal, limpios y de tu talla, o sabes exactamente qué te falta.",
      subtemas: [
        { t: "La cognición vestida", d: "Hajo Adam y Adam Galinsky propusieron la «cognición vestida»: la ropa influye en cómo piensas y te sientes. Vestir de forma acorde a la situación puede aumentar la seguridad y el enfoque.", l: [
          "Vístete para el rol que vas a jugar.",
          "Ropa cómoda y bien ajustada te deja concentrarte.",
          "Prepara la ropa la noche anterior."] },
        { t: "El ajuste es lo primero", d: "Un traje barato bien ajustado se ve mejor que uno caro grande. Los sastres recomiendan revisar hombros (la costura en el borde del hombro), largo de manga (muestra un poco de camisa) y largo del pantalón.", l: [
          "Hombros: lo más difícil de arreglar.",
          "Mangas y pantalón: se ajustan fácil con un sastre.",
          "Lleva tu ropa importante a ajustar."] },
        { t: "Vestir en Alemania", d: "En muchos trabajos de ingeniería en Alemania el estilo es casual de negocios o incluso casual; en entrevistas y eventos formales, traje sobrio. El clima exige capas: un buen abrigo, calzado impermeable y ropa térmica en invierno.", l: [
          "Entrevista: traje oscuro sencillo.",
          "Día a día: casual cuidado.",
          "Invierno: abrigo de calidad y zapatos impermeables."] }] },
    "Conversación de mesa": { ic: "speech-balloon",
      sesion: [[5, "Prepara tres temas seguros para tu próxima comida: un viaje, comida, algo que la gente disfrute."],
               [20, "En la comida, alterna con tus dos vecinos y haz al menos una pregunta a quien hable menos."],
               [5, "Anota qué tema funcionó mejor."]],
      sale: "Hablaste con tus dos vecinos e incluiste a alguien que hablaba poco.",
      subtemas: [
        { t: "La regla de alternar", d: "En las cenas formales tradicionales, los anfitriones esperaban que cada invitado hablara con el vecino de un lado durante un plato y con el del otro durante el siguiente. La idea de fondo sigue sirviendo: nadie se queda sin conversación.", l: [
          "Habla con los dos lados.",
          "No dejes a nadie aislado.",
          "Incluye a quien está callado con una pregunta."] },
        { t: "Temas que conectan", d: "Las conversaciones que más disfrutamos tocan experiencias y emociones, no solo datos. Preguntas sobre viajes, comida favorita o proyectos personales abren historias.", l: [
          "«¿Cuál ha sido tu mejor viaje?».",
          "«¿Qué plato te recuerda a tu infancia?».",
          "«¿En qué proyecto andas que te emocione?»."] },
        { t: "Temas delicados", d: "Política, religión, dinero y salud dividen fácilmente y pueden incomodar. Si alguien los abre, escucha con respeto y no busques ganar. Cambiar de tema con suavidad es una habilidad de anfitrión.", l: [
          "Si surge un tema delicado, escucha sin debatir.",
          "Cambia de tema con una pregunta abierta.",
          "Nunca preguntes cuánto gana alguien."] }] },
    "Practicarlo": { ic: "spiral-calendar",
      sesion: [[5, "Pon en tu calendario las cuatro semanas del plan."],
               [20, "Haz hoy la de la semana 1: una cena en casa con la mesa completa y estilo continental."],
               [5, "Anota qué te costó y qué salió natural."]],
      sale: "Las cuatro semanas están agendadas y ya hiciste la cena de práctica de la semana 1.",
      subtemas: [
        { t: "Practicar en privado", d: "Ensayar en casa lo que harás en público reduce la ansiedad y libera atención. Es el mismo principio que ensayar una presentación: lo que ya hiciste muchas veces deja de ocupar tu cabeza.", l: [
          "Practica solo o con alguien de confianza.",
          "Repite hasta que sea automático.",
          "Así en público puedes concentrarte en la gente."] },
        { t: "Aprender recibiendo", d: "Ser anfitrión enseña más que cualquier lectura: ves desde el otro lado qué hace cómodos a los invitados. Muchos buenos invitados aprendieron organizando reuniones.", l: [
          "Empieza con reuniones pequeñas.",
          "Observa qué funciona y qué no.",
          "Pide a un amigo de confianza que te diga qué mejorar."] },
        { t: "Observar a quien lo hace bien", d: "El aprendizaje por observación de Bandura: miramos a modelos y copiamos lo que funciona. Observar a alguien que se desenvuelve bien en una mesa formal enseña detalles que ningún libro menciona.", l: [
          "Elige a alguien a quien admires en eventos sociales.",
          "Observa cómo saluda, conversa y se despide.",
          "Copia un detalle a la vez."] }] },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  fogata: {
    "El triángulo del fuego": { ic: "fire",
      sesion: [[5, "Dibuja el triángulo del fuego y escribe en cada lado cómo lo das y cómo lo quitas."],
               [15, "En un asador o anafre en un lugar seguro, enciende una vela o un poco de yesca y prueba quitar cada elemento: tapar (oxígeno), separar (combustible), agua (calor)."],
               [5, "Anota qué viste con cada prueba y apaga todo por completo."]],
      sale: "Explicas con tus palabras por qué prende, por qué humea y cómo se apaga un fuego.",
      subtemas: [
        { t: "El tetraedro del fuego", d: "La ciencia del fuego agrega un cuarto elemento al triángulo: la reacción química en cadena. Por eso existen extintores que apagan interrumpiendo esa reacción, no solo quitando calor u oxígeno.", l: [
          "Combustible, oxígeno, calor y reacción en cadena.",
          "Los extintores de polvo químico cortan la reacción.",
          "Para fogatas, agua y tierra bastan."] },
        { t: "La pirólisis", d: "La madera no arde directamente: el calor la descompone en gases (pirólisis) y son esos gases los que arden en la llama. Por eso necesita calor suficiente y por eso la madera húmeda cuesta: el calor se gasta primero en evaporar el agua.", l: [
          "La llama son gases de la madera ardiendo.",
          "El agua de la madera roba calor.",
          "El humo blanco es vapor y gases sin quemar."] },
        { t: "Clases de fuego", d: "Los extintores se clasifican por tipo de fuego: A (sólidos como madera y papel), B (líquidos inflamables), C (eléctricos) y K (aceites de cocina). El agua sirve para la clase A, pero es peligrosa en aceite o electricidad.", l: [
          "Nunca agua en aceite hirviendo: tápalo.",
          "Nunca agua en un fuego eléctrico.",
          "Ten un extintor ABC en casa y en el coche."] }] },
    "Los tres materiales, en orden": { ic: "wood",
      sesion: [[5, "Junta los tres materiales: yesca, astillas del grosor de un lápiz a un dedo y leña de muñeca."],
               [15, "Sepáralos en tres montones y junta el triple de yesca y astillas de lo que crees que necesitas; prueba la leña golpeando dos piezas."],
               [5, "Prepara una yesca casera: algodón con vaselina en una bolsa sellada."]],
      sale: "Tienes los tres montones listos, en cantidad suficiente, y una yesca casera preparada.",
      subtemas: [
        { t: "La superficie es todo", d: "Un material prende más fácil cuanto más superficie tiene en relación con su volumen: por eso la viruta prende y el tronco no. Cada escalón de grosor necesita el calor del anterior para encenderse.", l: [
          "Más fino = prende más rápido.",
          "No saltes escalones de grosor.",
          "Más astillas finas compensan poca yesca."] },
        { t: "Yescas naturales", d: "El ocote (madera de pino con mucha resina) es una yesca tradicional en México: prende incluso húmedo. La corteza de abedul, la paja seca y los nidos de pasto también funcionan. La resina es combustible natural.", l: [
          "El ocote se consigue en mercados.",
          "Busca ramas muertas de pino con resina.",
          "Guarda tu yesca en una bolsa seca."] },
        { t: "Leña seca contra verde", d: "La leña recién cortada (verde) puede tener la mitad de su peso en agua; la seca, mucho menos. La leña seca arde con más calor y menos humo. Por eso se deja secar meses antes de usarla.", l: [
          "La leña seca pesa menos y suena hueca.",
          "Tiene grietas en los extremos.",
          "Nunca cortes árboles vivos para leña."] }] },
    "Preparar el sitio": { ic: "camping",
      sesion: [[5, "Antes de tu próxima salida, investiga si en la zona hay veda de fuego o restricciones."],
               [15, "En el sitio, limpia un círculo de 2 metros hasta tierra mineral, revisa ramas arriba y ten el agua lista antes de encender."],
               [5, "Si hay un anillo de fuego existente, úsalo; si no, decide si conviene una estufa de campamento."]],
      sale: "Preparaste un sitio con círculo limpio, sin ramas arriba, agua lista y sin restricciones vigentes.",
      subtemas: [
        { t: "La temporada de incendios en México", d: "En México, la temporada de incendios forestales va aproximadamente de enero a junio, con su pico en la primavera seca. La CONAFOR reporta que la gran mayoría de los incendios forestales tienen origen humano, muchos por fogatas mal apagadas y quemas agrícolas.", l: [
          "En temporada seca, extrema precauciones.",
          "Revisa avisos de CONAFOR y del parque.",
          "Si hay viento fuerte, no hay fogata."] },
        { t: "El fuego subterráneo", d: "El fuego puede propagarse bajo tierra por raíces y materia orgánica (turba, hojarasca compactada) y resurgir días después lejos de la fogata. Por eso se limpia hasta tierra mineral, sin raíces.", l: [
          "Limpia hasta ver tierra, no hojas.",
          "Evita fogatas sobre suelos con mucha materia orgánica.",
          "Revisa alrededor al apagar."] },
        { t: "Estufas de campamento", d: "Una estufa de gas o de alcohol permite cocinar con mucho menos riesgo y sin dejar rastro. Es lo recomendado por los principios de «No dejar rastro» en zonas sensibles o de alto riesgo de incendio.", l: [
          "Para cocinar, la estufa es más rápida y segura.",
          "Úsala donde no se permiten fogatas.",
          "Guarda la fogata para cuando el sitio lo permita."] }] },
    "Tres montajes que funcionan": { ic: "building-construction",
      sesion: [[5, "En un asador o anillo seguro, prepara materiales para tres montajes."],
               [25, "Arma un tipi, enciéndelo y apágalo; luego una cabaña con tipi dentro; luego un lean-to contra un tronco. Observa cuál prende y dura más."],
               [5, "Anota para qué usarías cada uno y apaga por completo."]],
      sale: "Armaste y encendiste los tres montajes y sabes cuál usar para arrancar, para cocinar y con viento.",
      subtemas: [
        { t: "El efecto chimenea", d: "El aire caliente sube y deja un hueco que el aire frío llena desde abajo. En un tipi, esa corriente alimenta la llama con oxígeno constante. Por eso la estructura necesita aberturas en la base.", l: [
          "Deja entradas de aire abajo.",
          "No tapes la parte de arriba del tipi.",
          "El fuego jala aire solo si lo dejas."] },
        { t: "El fuego de estrella", d: "El fuego de estrella usa troncos largos que se juntan en el centro como rayos. Conforme arden, se empujan hacia el centro. Es muy eficiente con poca leña y fácil de controlar.", l: [
          "Troncos como rayos hacia el centro.",
          "Empuja los extremos conforme se consumen.",
          "Ideal para fuegos de larga duración con poca leña."] },
        { t: "La hoguera invertida", d: "La hoguera invertida (upside-down fire) pone la leña gruesa abajo y la fina arriba, con la yesca en la cima. Arde de arriba hacia abajo, dura mucho sin atención y deja buena brasa.", l: [
          "Capas: gruesa abajo, fina arriba, yesca en la cima.",
          "Arde sola por horas.",
          "Buena para cuando quieres atender otras cosas."] }] },
    "Encenderlo": { ic: "sparkler",
      sesion: [[5, "Prepara la estructura y revisa de dónde viene el viento."],
               [15, "Enciende con un solo cerillo por abajo y del lado del viento; no lo toques el primer minuto y sopla en la base si hace falta."],
               [10, "Practica con el ferrocerio: rasca hacia la yesca, no la barra hacia afuera, hasta encender."]],
      sale: "Encendiste con un solo cerillo y también con ferrocerio, sin tocar la estructura el primer minuto.",
      subtemas: [
        { t: "Cómo funciona el ferrocerio", d: "El ferrocerio es una aleación de hierro y metales de tierras raras que al rasparla suelta partículas que se encienden a unos 3,000 °C. Funciona mojado y en altura, por eso es estándar en kits de supervivencia.", l: [
          "Raspa firme y en ángulo con el dorso del cuchillo.",
          "Mantén la barra quieta y jala el raspador.",
          "Necesita una yesca muy fina."] },
        { t: "Los vapores son el peligro", d: "La gasolina y el alcohol producen vapores que se acumulan cerca del suelo y prenden de golpe. Lo que explota no es el líquido sino la mezcla de vapor y aire. Por eso un bote cerca del fuego puede causar quemaduras graves.", l: [
          "Nunca líquidos inflamables para encender.",
          "Nunca rocíes nada sobre brasas.",
          "Si se usa carbón, iniciador en cubo de chimenea."] },
        { t: "Encender en altura", d: "En lugares altos hay menos oxígeno por volumen de aire y el fuego puede costar más. Soplar con constancia en la base y usar más yesca ayuda. En la sierra cerca de CDMX lo notarás.", l: [
          "Más yesca de lo normal.",
          "Sopla suave y constante.",
          "Protege la llama del viento con el cuerpo."] }] },
    "Fuego con leña mojada": { ic: "cloud-with-rain",
      sesion: [[5, "Después de un día de lluvia, busca leña muerta en pie y ramas bajo protección."],
               [25, "Parte la leña para llegar al corazón seco, haz tres plumas con navaja y levanta la base con dos troncos; enciende."],
               [5, "Anota qué funcionó y apaga por completo."]],
      sale: "Encendiste un fuego después de la lluvia usando el corazón de la madera y plumas hechas por ti.",
      subtemas: [
        { t: "Cómo hacer plumas", d: "Una pluma (feather stick) se hace sacando virutas finas de un palo seco con una navaja, sin separarlas del todo. Cuanto más finas y numerosas, mejor prenden. Es una habilidad de cuchillo que se practica en casa.", l: [
          "Navaja con filo, palo seco y recto.",
          "Corta hacia afuera, lejos del cuerpo.",
          "Muchas virutas finas, no pocas gruesas."] },
        { t: "Partir leña con seguridad", d: "Para llegar al corazón seco se parte la leña con hacha o con la técnica de batoning: golpear la navaja con un palo para partir madera pequeña. Requiere una navaja de hoja fija y firme.", l: [
          "Solo con navaja de hoja fija.",
          "Golpea el lomo, nunca la mano.",
          "Trabaja sobre un tronco, no sobre tu pierna."] },
        { t: "Dónde hay madera seca", d: "Debajo de árboles grandes y rocas salientes, en ramas muertas que no tocan el suelo y dentro de troncos caídos suele haber madera seca aunque llueva. El ocote resinoso arde incluso húmedo.", l: [
          "Busca ramas muertas que no tocan el suelo.",
          "Revisa bajo árboles densos y salientes de roca.",
          "Lleva yesca seca en bolsa sellada siempre."] }] },
    "Mantenerla": { ic: "wood",
      sesion: [[5, "Enciende un fuego y prepara leña de tres grosores a mano."],
               [25, "Mantenlo 30 minutos añadiendo leña gradualmente sobre la brasa; observa cómo cambia con leña fina separada y gruesa junta."],
               [5, "Anota cuánta leña usaste y apaga por completo."]],
      sale: "Mantuviste el fuego 30 minutos sin ahogarlo y conseguiste un lecho de brasa.",
      subtemas: [
        { t: "La brasa, la parte útil", d: "Cuando los gases ya ardieron, queda el carbón de la madera ardiendo sin llama: la brasa. Da un calor más constante y radiante, ideal para cocinar y para calentarse. Una buena fogata trabaja para producir brasa.", l: [
          "La llama es la etapa de inicio.",
          "La brasa es la etapa útil.",
          "Ceniza gris sobre la brasa indica que está lista."] },
        { t: "El tamaño correcto", d: "Una fogata grande gasta mucha leña, es difícil de controlar y calienta menos de lo que parece. Los que saben de campo hacen fuegos pequeños y bien alimentados.", l: [
          "Del tamaño que necesitas, no más.",
          "Pequeño se controla y se apaga fácil.",
          "Grande atrae problemas y gasta leña."] },
        { t: "Vigilar siempre", d: "Una chispa puede viajar con el viento y encender pasto seco a varios metros. Por eso alguien debe estar siempre a cargo del fuego mientras esté encendido.", l: [
          "Nombra a un responsable del fuego.",
          "Agua siempre a la mano.",
          "Si te vas, apágalo por completo."] }] },
    "Apagarla bien — la parte que casi nadie hace": { ic: "droplet",
      sesion: [[5, "Deja de alimentar el fuego 30 minutos antes y esparce las brasas."],
               [15, "Aplica agua poco a poco y revuelve las cenizas con un palo; repite hasta que deje de silbar."],
               [5, "Haz la prueba del dorso de la mano y revisa el borde del círculo."]],
      sale: "Puedes tocar las cenizas con el dorso de la mano y no hay ningún punto caliente.",
      copia: { t: "Apagar en cinco pasos", l: [
        "1. Dejar de añadir leña 30 min antes; esparcir brasas.",
        "2. Agua abundante, poco a poco (apartarse del vapor).",
        "3. Revolver las cenizas mientras se echa agua.",
        "4. Repetir agua y revolver hasta que deje de silbar.",
        "5. Dorso de la mano: si hay calor, no está apagada."] },
      subtemas: [
        { t: "«Ahogar, revolver, sentir»", d: "Los servicios forestales de varios países enseñan la secuencia «drown, stir, feel»: ahogar con agua, revolver y sentir con la mano. Si no puedes tocar las cenizas, no está apagada.", l: [
          "Ahoga con agua.",
          "Revuelve hasta el fondo.",
          "Siente con el dorso de la mano."] },
        { t: "Por qué revive un fuego «apagado»", d: "Las brasas pueden mantenerse calientes bajo una capa de ceniza que las aísla, a veces por horas o días. Si sopla viento o se mueve la ceniza, pueden reavivarse y alcanzar material seco.", l: [
          "La ceniza aísla y conserva calor.",
          "Revolver expone las brasas al agua.",
          "Nunca cubras brasas vivas con tierra para irte."] },
        { t: "Cuánta agua llevar", d: "Apagar bien una fogata pequeña puede requerir varios litros de agua. Si vas a acampar, lleva agua extra solo para eso o asegúrate de tener una fuente cerca.", l: [
          "Calcula al menos un garrafón para una fogata pequeña.",
          "Ten una cubeta o recipiente.",
          "Si no hay agua, tierra y arena revolviendo mucho."] }] },
    "No dejar rastro": { ic: "litter-in-bin-sign",
      sesion: [[5, "Lee los siete principios de «No dejar rastro» (Leave No Trace)."],
               [15, "En tu siguiente salida, aplica los relacionados con el fuego: anillo existente, leña muerta caída, nada de basura en el fuego, sitio como estaba."],
               [5, "Toma una foto del sitio antes y después para comparar."]],
      sale: "Dejaste el sitio igual o mejor de como lo encontraste.",
      subtemas: [
        { t: "Los siete principios", d: "Leave No Trace propone siete principios: planear y prepararse, acampar en superficies durables, manejar bien los desechos, dejar lo que encuentras, minimizar el impacto de las fogatas, respetar la fauna y ser considerado con otros visitantes.", l: [
          "Planea antes de salir.",
          "Lleva tu basura de regreso.",
          "Minimiza el impacto del fuego."] },
        { t: "Plásticos en el fuego", d: "Quemar plástico libera compuestos tóxicos, como dioxinas, y deja residuos que contaminan el suelo. Además, no se quema por completo. La basura se empaca y se lleva de regreso.", l: [
          "Nada de plástico, latas ni vidrio al fuego.",
          "Bolsa de basura en tu mochila.",
          "Recoge también lo que no es tuyo si puedes."] },
        { t: "Fauna y comida", d: "Los restos de comida atraen animales que se acostumbran a los humanos, lo que es peligroso para ellos y para los visitantes. En zonas con osos o coyotes, la comida se guarda lejos del campamento.", l: [
          "No dejes restos de comida.",
          "Guarda la comida cerrada.",
          "No alimentes animales silvestres."] }] },
    "Practicarlo": { ic: "spiral-calendar",
      sesion: [[5, "Agenda las cuatro sesiones del plan en las próximas semanas."],
               [25, "Haz hoy la primera: fuego con un solo cerillo en un asador o lugar controlado, sin líquidos."],
               [5, "Apágalo por completo con la prueba de la mano y anota qué mejorar."]],
      sale: "Las cuatro sesiones están agendadas y ya encendiste y apagaste tu primer fuego con un solo cerillo.",
      subtemas: [
        { t: "Practicar en casa con seguridad", d: "Un asador de carbón, un anafre o un brasero en un patio son lugares controlados para practicar. Ten agua o extintor a mano y respeta los reglamentos de tu edificio o colonia.", l: [
          "Lejos de paredes, toldos y plantas secas.",
          "Agua o extintor siempre a la mano.",
          "Revisa si tu edificio lo permite."] },
        { t: "La progresión de dificultad", d: "El plan sube de dificultad: cerillo, brasa para cocinar, ferrocerio y después de la lluvia. Es el principio de dificultad deseable: practicar con retos crecientes consolida la habilidad.", l: [
          "Domina un nivel antes de pasar al siguiente.",
          "El último examen es con lluvia.",
          "Repite el que falle."] },
        { t: "El kit de fuego", d: "Un kit pequeño en la mochila —cerillos de tormenta, encendedor, ferrocerio, yesca en bolsa sellada— asegura poder hacer fuego en cualquier salida. Tener tres formas de encender es la regla de los que salen al monte.", l: [
          "Tres formas de encender.",
          "Yesca siempre seca y sellada.",
          "Revisa el kit antes de cada salida."] }] },
    "Cocinar sobre el fuego": { ic: "roasted-sweet-potato",
      sesion: [[5, "Prepara papas o verduras envueltas en doble capa de aluminio con sal y aceite."],
               [30, "Enciende, espera el lecho de brasa con ceniza gris, arma dos zonas y cocina las papas entre las brasas, girándolas."],
               [10, "Pruébalas con un palillo, sírvelas y apaga el fuego por completo."]],
      sale: "Cocinaste sobre brasa con dos zonas y la comida quedó cocida por dentro sin quemarse por fuera.",
      subtemas: [
        { t: "Calor radiante y por contacto", d: "Sobre la brasa, la comida recibe calor radiante (de la brasa), por contacto (si toca una superficie caliente) y por convección (aire caliente). La llama da calor desigual y hollín; la brasa, calor parejo.", l: [
          "Cocina sobre brasa, no sobre llama.",
          "El aluminio protege y cuece al vapor.",
          "Una parrilla da marcas y calor de contacto."] },
        { t: "La olla de hierro", d: "Una olla de hierro fundido con tapa (dutch oven) permite hornear, guisar y freír sobre brasas. Poniendo brasas abajo y sobre la tapa se convierte en horno. Es la herramienta clásica de la cocina de campamento.", l: [
          "Brasas abajo y arriba para hornear.",
          "Cura el hierro con aceite para que no se oxide.",
          "Sirve para pan, guisos y postres."] },
        { t: "Comida segura en campamento", d: "Sin refrigerador, la comida perecedera se echa a perder rápido. Hielera con hielo, carne congelada que se descongela durante el viaje y cocinar la carne a temperatura segura evitan intoxicaciones.", l: [
          "Hielera con hielo y separada de bebidas.",
          "Carne cruda bien cerrada y abajo.",
          "Cocina el pollo hasta 74 °C."] }] },
    "Fuego para calentarse y pasar la noche": { ic: "night-with-stars",
      sesion: [[5, "Revisa los riesgos: nunca fuego en espacios cerrados ni casas de campaña."],
               [20, "Arma un fuego con pared reflectora de troncos del lado contrario a donde te sientas y prueba la diferencia de calor."],
               [5, "Anota cuánto cambió el calor y apaga por completo antes de dormir."]],
      sale: "Sentiste la diferencia de la pared reflectora y apagaste por completo antes de dormir.",
      subtemas: [
        { t: "El monóxido de carbono", d: "El monóxido de carbono se produce en combustiones incompletas, no tiene olor ni color y se une a la hemoglobina mucho más fuerte que el oxígeno. Sus síntomas —dolor de cabeza, mareo, sueño— se confunden con cansancio. En un espacio cerrado puede matar dormido.", l: [
          "Nunca fuego, asador ni calentador de gas en espacios cerrados.",
          "Instala detector de CO en casa si usas gas.",
          "Ante dolor de cabeza y mareo cerca de combustión: sal al aire libre."] },
        { t: "La hipotermia", d: "La hipotermia ocurre cuando la temperatura corporal baja de unos 35 °C. Empieza con escalofríos y torpeza, y puede avanzar a confusión. La ropa mojada y el viento la aceleran mucho, incluso sin temperaturas bajo cero.", l: [
          "Mantén la ropa seca: cámbiala si se moja.",
          "Capas en lugar de una prenda gruesa.",
          "Come y bebe: el cuerpo necesita energía para calentarse."] },
        { t: "Dormir caliente en campamento", d: "El frío nocturno entra sobre todo desde el suelo. Un buen aislante bajo el saco de dormir importa tanto como el saco. Gorro, calcetines secos y una cena con grasa ayudan a mantener el calor.", l: [
          "Aislante entre tú y el suelo.",
          "Gorro y calcetines secos para dormir.",
          "Una botella de agua caliente dentro del saco."] }] },
    "Los cinco errores que apagan una fogata": { ic: "warning",
      sesion: [[5, "Repasa los cinco errores y elige el que más cometes."],
               [20, "En tu próxima práctica, enciende cuidando a propósito ese error: astillas, espacio, leña seca, no tocar, cantidad."],
               [5, "Anota si encendió a la primera y apaga por completo."]],
      sale: "Encendiste a la primera evitando a propósito tu error más común.",
      subtemas: [
        { t: "Diagnosticar un fuego que no prende", d: "Antes de agregar más cosas, pregúntate qué lado del triángulo falla: ¿hay aire? ¿la leña está seca y fina? ¿hay suficiente calor? Responder eso resuelve casi todos los casos.", l: [
          "Mucho humo blanco: humedad o falta de aire.",
          "La yesca se apaga: astillas muy gruesas.",
          "Prende y muere: no hubo leña de transición."] },
        { t: "La paciencia del primer minuto", d: "Las llamas iniciales son frágiles: mover la estructura las aplasta o las separa del combustible. Esperar a que las astillas agarren antes de tocar es una regla que repiten todos los instructores de campismo.", l: [
          "No toques el primer minuto.",
          "Solo sopla en la base si se debilita.",
          "Agrega leña cuando las astillas ya ardan solas."] },
        { t: "Prepararse antes que encender", d: "La mayoría de los fuegos fallidos se pierden por falta de material a mano. Es la misma lógica de la mise en place: todo listo antes de empezar.", l: [
          "Tres montones antes de encender.",
          "El triple de lo que crees.",
          "Leña gruesa cerca pero no encima."] }] },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  vino: {
    "Qué es saber de vino (y qué no)": { ic: "wine-glass",
      sesion: [[5, "Escribe las cuatro metas prácticas del paso: pedir bien, servir bien, saber por qué te gusta y reconocer un vino picado."],
               [15, "Ve el primer episodio de la serie de la ficha o lee la carta de vinos de un restaurante que conozcas en línea e identifica uvas, regiones y rango de precio."],
               [5, "Anota tres preguntas que te gustaría poder responder sobre vino."]],
      sale: "Sabes qué significa saber de vino en la práctica y tienes tus preguntas para guiar la ficha, sin necesidad de tomar.",
      subtemas: [
        { t: "Precio y percepción", d: "Un estudio de Hilke Plassmann y colegas encontró que el mismo vino presentado como más caro producía más placer reportado y más actividad en zonas del cerebro asociadas a la recompensa. El precio cambia la experiencia, no el líquido.", l: [
          "El precio influye en lo que crees que sientes.",
          "Prueba a ciegas para saber qué te gusta de verdad.",
          "El rango medio suele tener la mejor relación."] },
        { t: "Saber de vino sin tomar", d: "Los sommeliers profesionales prueban decenas de vinos al día y escupen casi todo. Con tu meta de no tomar, el conocimiento se construye igual: vista, olfato, lectura y, si quieres, probar y escupir o usar vinos sin alcohol.", l: [
          "El olfato hace la mayor parte de la cata.",
          "Escupir es lo normal en una cata profesional.",
          "Los vinos desalcoholizados sirven para practicar."] },
        { t: "El vino como cultura", d: "Conocer de vino es conocer geografía, historia y cocina: por qué una uva crece en un clima, cómo una región define su comida. Es conversación de mesa en cualquier país, también en Alemania.", l: [
          "Cada vino cuenta de dónde viene.",
          "Es tema de conversación universal.",
          "Aprende la historia, no solo los nombres."] }] },
    "Las cinco uvas que resuelven casi todo": { ic: "grapes",
      sesion: [[5, "Haz una tarjeta por uva con: tinto o blanco, cuerpo, rasgo principal y con qué comida va."],
               [15, "En una tienda o en línea, busca una botella de cada uva y lee sus etiquetas: región, añada, notas del productor."],
               [5, "Repasa las tarjetas hasta decir de memoria con qué va cada uva."]],
      sale: "Dices de memoria las cinco uvas con su estilo y con qué comida van.",
      copia: { t: "Las cinco uvas", l: [
        "Cabernet Sauvignon · tinto potente, taninos altos · carne roja, asado",
        "Merlot · tinto suave y redondo · pastas, carnes blancas, para empezar",
        "Malbec · tinto frutal, cuerpo medio · mesa mixta, carnes, pizza",
        "Chardonnay · blanco con cuerpo, a veces con madera · pollo, pescado graso, crema",
        "Sauvignon Blanc · blanco ligero, cítrico · mariscos, ceviche, ensaladas"] },
      subtemas: [
        { t: "Varietal o mezcla", d: "Un vino varietal está hecho mayoritariamente de una uva y suele decirlo en la etiqueta (común en el Nuevo Mundo). En Europa muchas etiquetas dicen la región, no la uva: un Burdeos es una mezcla, un Rioja suele ser Tempranillo.", l: [
          "Nuevo Mundo: la etiqueta dice la uva.",
          "Europa: la etiqueta dice la región.",
          "Aprende qué uva hay detrás de cada región famosa."] },
        { t: "El clima cambia la uva", d: "La misma uva da vinos distintos según el clima: en clima cálido madura más, con más azúcar (más alcohol) y fruta madura; en clima frío conserva más acidez y frescura. Un Sauvignon Blanc de Nueva Zelanda no sabe igual que uno de Chile.", l: [
          "Clima cálido: más cuerpo y fruta madura.",
          "Clima frío: más acidez y frescura.",
          "Valle de Guadalupe es cálido y seco."] },
        { t: "El Riesling para Alemania", d: "El Riesling es la uva emblema de Alemania: blanco muy aromático, de acidez alta, que puede ir de seco (trocken) a dulce. Saber leer la palabra trocken en la etiqueta te evita pedir uno dulce sin querer.", l: [
          "Trocken: seco.",
          "Halbtrocken o feinherb: algo dulce.",
          "Spätlese, Auslese: más dulces y concentrados."] }] },
    "Cómo catarlo, en cuatro pasos": { ic: "eye",
      sesion: [[5, "Sirve dos copas de jugo de uva o vino sin alcohol de estilos distintos sobre un fondo blanco."],
               [15, "Haz los cuatro pasos con cada una: vista, olfato antes y después de girar, boca (acidez, tanino, cuerpo) y final; si es vino, escupe."],
               [5, "Anota las diferencias entre las dos con palabras simples."]],
      sale: "Describiste dos bebidas con los cuatro pasos y encontraste diferencias claras de color, aroma, acidez y final.",
      copia: { t: "Ficha de cata", l: [
        "Vino / bebida: ______",
        "Vista: color ______ · borde ______",
        "Olfato: antes de girar ______ · después ______",
        "Boca: acidez __/5 · tanino __/5 · cuerpo __/5 · dulce __/5",
        "Final: ___ segundos",
        "¿Me gusta? ¿Por qué? ______"] },
      subtemas: [
        { t: "El olfato hace casi todo", d: "La lengua distingue pocos sabores básicos (dulce, salado, ácido, amargo, umami); el resto de lo que llamamos sabor es aroma que llega por la parte trasera de la nariz (olfato retronasal). Por eso con la nariz tapada todo sabe plano.", l: [
          "Huele antes de probar.",
          "Respira por la nariz con la bebida en la boca.",
          "Entrena el olfato con frutas y especias de tu cocina."] },
        { t: "La rueda de aromas", d: "Ann Noble, en la Universidad de California en Davis, creó la rueda de aromas del vino: organiza los aromas en familias (frutal, floral, especiado, terroso). Ayuda a encontrar palabras para lo que hueles.", l: [
          "Empieza por la familia: ¿frutal o terroso?",
          "Luego afina: ¿fruta roja o negra?",
          "No hay respuestas incorrectas en lo que percibes."] },
        { t: "Entrenar la memoria olfativa", d: "Los catadores entrenan oliendo referencias reales: frutas, especias, hierbas. La memoria olfativa mejora con práctica y nombrar lo que hueles. Es un ejercicio que sirve sin tomar alcohol.", l: [
          "Huele frutas y especias con los ojos cerrados.",
          "Intenta nombrarlas sin ver.",
          "Repite con mezclas de dos aromas."] }] },
    "Las cuatro palabras que necesitas": { ic: "label",
      sesion: [[5, "Escribe las cuatro palabras con su definición: seco/dulce, ácido, tanino, cuerpo."],
               [15, "Prueba ejemplos sin alcohol de cada sensación: limón (ácido), té negro muy cargado (tanino), agua contra leche entera (cuerpo), jugo de uva (dulce)."],
               [5, "Escribe la frase para pedir en un restaurante con tus preferencias."]],
      sale: "Sientes en la boca cada una de las cuatro palabras y tienes tu frase para pedir.",
      copia: { t: "Pedir con cuatro palabras", l: [
        "«Busco un ______ (tinto/blanco) ______ (ligero/de cuerpo medio/con cuerpo),",
        "______ (seco/con algo de dulzor), con ______ (poco/mucho) tanino,",
        "alrededor de este rango (señalando la carta).»"] },
      subtemas: [
        { t: "El tanino en el té", d: "Los taninos son polifenoles que se unen a las proteínas de la saliva y producen la sensación de sequedad. El té negro cargado tiene muchos: es la forma más fácil de entender el tanino sin tomar vino.", l: [
          "Té negro muy cargado = tanino.",
          "La leche suaviza el tanino (por eso el té con leche).",
          "La carne con grasa suaviza el tanino del vino."] },
        { t: "Cuerpo y alcohol", d: "El cuerpo de un vino viene en buena parte del alcohol y del azúcar residual: más alcohol, más peso en boca. Por eso los vinos de clima cálido suelen tener más cuerpo. La viscosidad se nota como la diferencia entre leche descremada y entera.", l: [
          "Más alcohol = más cuerpo.",
          "La etiqueta dice el porcentaje de alcohol.",
          "12 % es ligero; 14 % o más, con cuerpo."] },
        { t: "Dulzor percibido", d: "Un vino seco puede parecer dulce si es muy frutal, y la acidez alta puede esconder el azúcar. Por eso «seco» y «frutal» no son opuestos. Es una confusión común al pedir.", l: [
          "Frutal no significa dulce.",
          "La acidez equilibra el dulzor.",
          "Si quieres seco de verdad, pídelo con esa palabra."] }] },
    "Temperatura: el error número uno": { ic: "thermometer",
      sesion: [[5, "Escribe la tabla de temperaturas: tinto ligero, tinto con cuerpo, blanco, espumoso."],
               [15, "Haz la prueba con una bebida sin alcohol aromática (jugo de uva tinto): pruébala a temperatura ambiente y después de 20 minutos en el refrigerador."],
               [5, "Anota la diferencia de aroma y sabor."]],
      sale: "Notaste cómo cambia el aroma y el sabor con la temperatura y sabes la temperatura correcta de cada estilo.",
      copia: { t: "Temperaturas de servicio", l: [
        "Espumoso: 6–8 °C",
        "Blanco y rosado: 8–10 °C (sacar del refri 15 min antes)",
        "Tinto ligero (Pinot Noir): 12–14 °C",
        "Tinto con cuerpo (Cabernet, Malbec): 16–18 °C",
        "Tinto en CDMX en verano: 20 min de refri antes de servir"] },
      subtemas: [
        { t: "Por qué el frío esconde aromas", d: "Los aromas son compuestos volátiles: con más temperatura se evaporan más y llegan a la nariz. Por eso un vino muy frío huele a poco, y uno muy caliente evapora tanto alcohol que domina sobre la fruta.", l: [
          "Frío extremo: apaga aromas.",
          "Calor: el alcohol domina.",
          "El punto medio deja ver la fruta."] },
        { t: "Enfriar rápido", d: "El agua con hielo enfría una botella mucho más rápido que el congelador, porque el agua transfiere el calor mejor que el aire. Una cubeta con hielo, agua y un puño de sal enfría en unos 10 a 15 minutos.", l: [
          "Cubeta con agua, hielo y sal.",
          "Gira la botella de vez en cuando.",
          "No la olvides en el congelador: puede reventar."] },
        { t: "La temperatura también en la comida", d: "La temperatura cambia la percepción del sabor en todo: un helado derretido sabe más dulce; una cerveza tibia, más amarga. Entenderlo te ayuda también al cocinar y servir.", l: [
          "El frío reduce la percepción de dulce.",
          "El calor aumenta aromas y amargor.",
          "Prueba siempre a la temperatura en que se servirá."] }] },
    "La copa y el servicio": { ic: "wine-glass",
      sesion: [[5, "Consigue una copa de tinto de tamaño medio y una copa pequeña o vaso."],
               [15, "Sirve la misma bebida aromática sin alcohol en ambas, un tercio de la copa, gírala tomándola por el tallo y compara el aroma."],
               [5, "Practica servir y girar la botella un cuarto de vuelta al terminar para que no gotee."]],
      sale: "Notaste la diferencia de aroma entre la copa adecuada y el vaso, y sirves sin gotear.",
      subtemas: [
        { t: "La forma de la copa", d: "Una copa más ancha en el cuerpo y cerrada en la boca concentra los aromas hacia la nariz. Los estudios sobre si cada uva necesita su copa son discutidos, pero la diferencia entre una copa adecuada y un vaso sí es notable.", l: [
          "Cuerpo amplio, boca más cerrada.",
          "Cristal delgado y transparente.",
          "Una buena copa universal basta."] },
        { t: "El orden de servicio", d: "En una mesa se sirve primero a los invitados, tradicionalmente empezando por la persona de honor y avanzando, y el anfitrión al final. Se sirve por la derecha de cada persona y sin tocar la copa con la botella.", l: [
          "Invitados primero, anfitrión al final.",
          "La botella no toca la copa.",
          "Rellena antes de que la copa quede vacía."] },
        { t: "Lavar y guardar copas", d: "Los residuos de jabón o el olor del mueble alteran el aroma. Las copas buenas se lavan con agua caliente y poco jabón, se secan con un paño sin pelusa y se guardan boca arriba si el lugar huele a madera.", l: [
          "Poco jabón y buen enjuague.",
          "Seca con paño de microfibra.",
          "Huele la copa vacía antes de servir."] }] },
    "Descorchar sin sufrir": { ic: "bottle-with-popping-cork",
      sesion: [[5, "Consigue un sacacorchos de mesero de dos tiempos y una botella con corcho (puede ser una vacía con corcho reinsertado o un vino sin alcohol)."],
               [15, "Practica cinco veces: cortar la cápsula, clavar en el centro, primer escalón, segundo escalón y sacar a mano sin «pop»."],
               [5, "Practica el agarre de un espumoso: sujetar el corcho y girar la botella a 45°, sin apuntar a nadie (puede ser con una sidra sin alcohol)."]],
      sale: "Descorchas en silencio con el sacacorchos de dos tiempos y abres un espumoso sin que salga volando el corcho.",
      subtemas: [
        { t: "La presión de un espumoso", d: "Una botella de champán o espumoso tiene una presión de unas 5 a 6 atmósferas, más que una llanta de coche. Un corcho que sale disparado puede causar lesiones graves en los ojos; por eso se sujeta siempre y se apunta lejos de las personas.", l: [
          "Pulgar siempre sobre el corcho al quitar el bozal.",
          "Gira la botella, no el corcho.",
          "Botella fría: menos presión y menos espuma."] },
        { t: "Corchos sintéticos y tapa rosca", d: "Muchos vinos usan tapa rosca o corcho sintético para evitar el defecto de corcho (TCA). La tapa rosca no indica mala calidad: es común en Nueva Zelanda y Australia incluso en vinos caros.", l: [
          "Tapa rosca no es sinónimo de barato.",
          "Evita el problema del corcho contaminado.",
          "Los sintéticos cuestan más sacarlos."] },
        { t: "El sacacorchos de mesero", d: "El sacacorchos de dos tiempos (sommelier) usa palanca sobre el labio de la botella: requiere menos fuerza y saca el corcho entero. Su navaja corta la cápsula limpio. Es el que usan los profesionales por ser compacto y confiable.", l: [
          "Espiral larga y con punta centrada.",
          "Dos escalones de palanca.",
          "La navaja corta por debajo del labio."] }] },
    "Decantar y airear": { ic: "amphora",
      sesion: [[5, "Sirve una bebida aromática sin alcohol (o el vino que sirvas a invitados) en dos copas."],
               [20, "Deja una en reposo 20 minutos y huele la otra recién servida; compara los aromas al minuto 0 y al minuto 20."],
               [5, "Anota cómo cambió y practica servir despacio contra la luz, como si dejaras un sedimento en la botella."]],
      sale: "Notaste cómo cambia el aroma con el aire y sabes cuándo airear y cuándo decantar.",
      subtemas: [
        { t: "Qué hace el oxígeno", d: "Al contacto con el aire, algunos compuestos volátiles se evaporan (como los olores reducidos o el exceso de alcohol en nariz) y otros se oxidan, suavizando la sensación. En pocas horas mejora; en días, el vino se arruina.", l: [
          "Minutos: se abre.",
          "Horas: se suaviza.",
          "Días: se oxida."] },
        { t: "El sedimento", d: "Los tintos de guarda forman sedimento con los años: taninos y pigmentos que se unen y se depositan. Es inofensivo pero arenoso. Se deja la botella de pie un día antes y se decanta despacio con luz detrás del cuello.", l: [
          "Botella de pie el día anterior.",
          "Sirve despacio y continuo.",
          "Para cuando el sedimento llega al cuello."] },
        { t: "Mitos de la aireación", d: "Abrir la botella y dejarla parada casi no airea: la superficie de contacto es mínima. Lo que funciona es servir en copa o pasar a una jarra. Los aireadores de vertido aceleran el proceso.", l: [
          "Botella abierta parada: casi nada.",
          "Copa o jarra: sí.",
          "Prueba antes y después para decidir."] }] },
    "Maridar sin complicarte": { ic: "cheese-wedge",
      sesion: [[5, "Escribe las tres reglas y la del picante en una tarjeta."],
               [20, "Para tres comidas de tu semana, escribe qué vino sugerirías a un invitado y por qué, y qué bebida sin alcohol servirías tú."],
               [5, "Compara tus elecciones con una tabla de maridaje confiable."]],
      sale: "Sugeriste vino y bebida sin alcohol para tres comidas con razones basadas en las reglas.",
      subtemas: [
        { t: "Complementar o contrastar", d: "Hay dos estrategias de maridaje: complementar (sabores parecidos, como un blanco cremoso con pasta en crema) o contrastar (opuestos, como un blanco ácido con frituras). Ambas funcionan; la clave es que ninguno opaque al otro.", l: [
          "Complementar: semejanza de peso y sabor.",
          "Contrastar: acidez contra grasa.",
          "Evita que uno tape al otro."] },
        { t: "El picante y el alcohol", d: "La capsaicina del chile se percibe más con el alcohol, que la intensifica y la extiende. Por eso un vino potente con comida picante arde más. Bebidas frescas, con algo de dulzor y menos alcohol funcionan mejor.", l: [
          "Con picante: blanco aromático, rosado o bebidas frescas.",
          "Evita tintos con mucho alcohol y tanino.",
          "El dulzor ligero calma el picante."] },
        { t: "Maridaje sin alcohol", d: "Restaurantes de alto nivel ofrecen maridajes sin alcohol con jugos, kombuchas, tés e infusiones elaborados con las mismas reglas: acidez, cuerpo, dulzor y amargor. Puedes aplicarlas en tu casa.", l: [
          "Té frío con comida grasa (tanino y acidez).",
          "Agua de jamaica con comida mexicana (acidez).",
          "Kombucha con platos ligeros."] }] },
    "Vino mexicano": { ic: "cactus",
      sesion: [[5, "Ubica en un mapa las cinco zonas: Valle de Guadalupe, Querétaro, Coahuila, Aguascalientes y Zacatecas."],
               [15, "Investiga tres bodegas mexicanas reconocidas y su vino más representativo, y lee sobre el Nebbiolo mexicano."],
               [5, "Escribe tres datos de vino mexicano para una conversación de mesa, y uno del Riesling alemán."]],
      sale: "Puedes hablar de las principales regiones mexicanas, tres bodegas y la uva emblema de Alemania.",
      subtemas: [
        { t: "La historia del vino en México", d: "México fue de los primeros lugares de América con viñedos, plantados por los españoles en el siglo XVI. Casa Madero, en Parras, Coahuila, fundada en 1597, se considera la bodega más antigua del continente. La Corona limitó después la producción para proteger el vino español.", l: [
          "Parras, Coahuila: cuna del vino en América.",
          "La producción moderna creció desde los años 80.",
          "Hoy hay cientos de bodegas en el país."] },
        { t: "El Valle de Guadalupe", d: "En Baja California, cerca de Ensenada, el Valle de Guadalupe tiene clima mediterráneo: veranos secos y cálidos, noches frescas por la brisa del Pacífico. Concentra la mayor parte de los vinos de calidad del país.", l: [
          "Clima mediterráneo con influencia marina.",
          "Escasez de agua: un reto constante.",
          "Enoturismo con restaurantes de gran nivel."] },
        { t: "Vino de altura", d: "Querétaro, Guanajuato, Aguascalientes y Zacatecas producen vinos de altura, por encima de los 1,800 metros. La altitud compensa la latitud tropical: noches frías que conservan la acidez. Querétaro es conocido por sus espumosos.", l: [
          "La altura da noches frías y acidez.",
          "Querétaro: espumosos de buena calidad.",
          "Ruta del vino a pocas horas de CDMX."] }] },
    "Pedir vino en un restaurante": { ic: "fork-and-knife-with-plate",
      sesion: [[5, "Busca en línea la carta de vinos de un restaurante que te guste."],
               [15, "Practica los cuatro pasos: elige un rango señalando, describe lo que buscas con las cuatro palabras y anota qué revisarías de la etiqueta."],
               [5, "Escribe la frase para devolver un vino defectuoso sin drama."]],
      sale: "Sabes pedir un vino para la mesa en cuatro pasos sin decir el precio en voz alta y sin necesidad de tomarlo tú.",
      subtemas: [
        { t: "El sommelier es tu aliado", d: "En restaurantes con sommelier, su trabajo es encontrar lo que te gusta en tu presupuesto. Dar tu rango señalando la carta y describir lo que buscas le da todo lo que necesita. No es una prueba de conocimiento.", l: [
          "Pregunta por su recomendación.",
          "Comparte qué te gustó antes.",
          "Agradece la sugerencia aunque elijas otra."] },
        { t: "El margen del vino", d: "Los restaurantes suelen vender el vino a dos o tres veces su precio de tienda, o más. Conocerlo te ayuda a elegir bien: a veces el vino más caro tiene menor margen proporcional, y los vinos por copa suelen tener el mayor.", l: [
          "El vino por copa suele ser el más caro proporcionalmente.",
          "Pregunta si permiten traer tu botella (descorche).",
          "Elige por estilo, no por la posición en la carta."] },
        { t: "Pedir sin tomar", d: "Puedes ser quien elige el vino de la mesa sin tomar: pide para los demás, prueba el olor del sorbo de comprobación y para ti pide una bebida sin alcohol. Nadie lo nota y muestras conocimiento.", l: [
          "Puedes oler el sorbo de comprobación sin beber.",
          "O pide a otro comensal que lo pruebe.",
          "Tu bebida sin alcohol, pedida con naturalidad."] }] },
    "Reconocer un vino picado": { ic: "nauseated-face",
      sesion: [[5, "Repasa los tres defectos: corcho (TCA), oxidado y avinagrado."],
               [15, "Deja una copa de vino tinto barato (o jugo de uva) abierta tres días para olerla oxidada, y huele vinagre y cartón mojado como referencias."],
               [5, "Escribe la frase para devolverlo y desecha la muestra."]],
      sale: "Reconoces el olor de un vino oxidado y avinagrado y sabes cómo devolver uno con corcho.",
      subtemas: [
        { t: "El TCA", d: "El 2,4,6-tricloroanisol (TCA) es el compuesto detrás del defecto de corcho. Se forma cuando hongos interactúan con compuestos clorados en el corcho. El olfato humano lo detecta en cantidades extremadamente pequeñas.", l: [
          "Huele a cartón mojado o sótano.",
          "Apaga la fruta del vino.",
          "No es culpa del restaurante ni de la bodega."] },
        { t: "La oxidación", d: "El oxígeno transforma el alcohol en acetaldehído, que da aromas a nuez y manzana pasada, y oscurece el color. Algunos vinos, como el jerez, se oxidan a propósito; en un vino de mesa es un defecto.", l: [
          "Color más oscuro y café.",
          "Aromas a nuez o manzana pasada.",
          "Común en botellas abiertas días."] },
        { t: "El vinagre", d: "Las bacterias acéticas convierten el alcohol en ácido acético en presencia de oxígeno: así se hace el vinagre. En un vino, un olor fuerte a vinagre o a quitaesmalte (acetato de etilo) indica que se echó a perder.", l: [
          "Olor a vinagre o quitaesmalte.",
          "Se devuelve sin discusión.",
          "En casa, úsalo para cocinar si no está muy avanzado."] }] },
    "Guardar y abrir después": { ic: "file-cabinet",
      sesion: [[5, "Revisa dónde guardas o guardarías botellas en casa: luz, temperatura y vibración."],
               [15, "Elige el mejor lugar: oscuro, estable, lejos de la cocina y del refrigerador; acomoda las botellas acostadas."],
               [5, "Si tienes vino abierto para cocinar, ciérralo y guárdalo en el refrigerador con la fecha."]],
      sale: "Tus botellas están en el mejor lugar disponible de la casa, acostadas y lejos del calor.",
      subtemas: [
        { t: "Los enemigos del vino", d: "Calor, luz, cambios de temperatura y vibración aceleran el envejecimiento y pueden dañar el vino. La luz ultravioleta produce el «gusto de luz»; el calor cocina el vino. Por eso las cavas son oscuras y frescas.", l: [
          "Lugar oscuro y fresco.",
          "Temperatura estable, no necesariamente fría.",
          "Lejos de electrodomésticos que vibran o calientan."] },
        { t: "Conservar una botella abierta", d: "Tapar y refrigerar frena la oxidación. Los sistemas de vacío ayudan un poco; el gas inerte (argón) protege mejor. Los espumosos se conservan con tapones especiales que mantienen la presión.", l: [
          "Tapa y refrigera de inmediato.",
          "Pasa a una botella más pequeña para reducir aire.",
          "Espumosos: tapón de presión, 1-3 días."] },
        { t: "Cocinar con vino", d: "El vino en la cocina aporta acidez y sabor. Al cocinar, buena parte del alcohol se evapora, aunque no todo: depende del tiempo y el método. Con tu meta de no tomar, decide si lo usas; los guisos largos retienen muy poco.", l: [
          "Usa vino que tomarías, no uno defectuoso grave.",
          "Desglasa la sartén para recoger sabores.",
          "Cocción larga: queda muy poco alcohol."] }] },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  coctel: {
    "La estructura de todo coctel": { ic: "cocktail-glass",
      sesion: [[5, "Escribe la ecuación: fuerte + ácido + dulce (o fuerte + dulce + amargo) y tres clásicos de cada familia."],
               [15, "Haz una versión sin alcohol con la misma ecuación: té negro frío o agua mineral como base, limón y jarabe; ajusta probando."],
               [5, "Anota la proporción que te gustó."]],
      sale: "Equilibraste una bebida sin alcohol con la ecuación y sabes qué ajustar si sabe plana o empalagosa.",
      subtemas: [
        { t: "Las familias de cocteles", d: "Los bartenders agrupan los cocteles en familias que comparten estructura: los sours (destilado, cítrico, dulce), los old fashioned (destilado, dulce, amargo), los highballs (destilado y mezclador) y los martinis (destilado y vermut). Aprender familias reemplaza memorizar recetas.", l: [
          "Sour: Margarita, Daiquiri, Whisky Sour.",
          "Old Fashioned: destilado + azúcar + bitters.",
          "Highball: destilado + refresco."] },
        { t: "La proporción 2:1:1", d: "Una regla de inicio para los sours es 2 partes de destilado, 1 de cítrico y 1 de dulce, y luego ajustar al gusto y al ingrediente. Muchos bartenders afinan a 2 : ¾ : ¾ para un trago más seco.", l: [
          "Empieza con 2:1:1.",
          "Ajusta el dulce según la acidez del limón.",
          "Mide siempre para poder repetir."] },
        { t: "Balance en la versión sin alcohol", d: "Sin destilado, la bebida pierde cuerpo y amargor. Los bartenders lo compensan con tés, especias, amargos sin alcohol o destilados desalcoholizados. La misma lógica de balance aplica.", l: [
          "Té negro o de hierbas da estructura.",
          "Jengibre aporta picor que imita el alcohol.",
          "Un toque salino realza los sabores."] }] },
    "Lo que necesitas para empezar": { ic: "toolbox",
      sesion: [[5, "Revisa qué tienes en casa: frasco con tapa, medidor, colador, exprimidor, cuchara larga."],
               [15, "Haz la lista de lo que falta, con el jigger como prioridad, y prepara hielo en moldes grandes."],
               [5, "Calibra tu jigger: verifica con una taza medidora cuántos mililitros tiene cada lado."]],
      sale: "Tienes el equipo básico o la lista exacta de lo que falta, y tu jigger calibrado.",
      subtemas: [
        { t: "Medir es repetir", d: "La diferencia entre un buen trago casual y uno que siempre sale igual es medir. Los bares profesionales miden todo con jigger para que el trago sea consistente. Medir te deja corregir con precisión.", l: [
          "Mide cada ingrediente.",
          "Anota la receta que te gustó.",
          "Cambia una variable a la vez."] },
        { t: "Coctelera Boston", d: "La coctelera Boston es un vaso de metal grande y uno más pequeño (de metal o vidrio) que encajan. Sella con un golpe y se separa golpeando el borde. Es más rápida de limpiar y enfría mejor que la de tres piezas.", l: [
          "Sella con un golpe firme.",
          "Agita sosteniendo ambas partes.",
          "Para abrir, golpea donde se unen."] },
        { t: "El hielo es ingrediente", d: "El hielo enfría y diluye. Cubos grandes y sólidos se derriten más lento y dan dilución controlada; el hielo pequeño, hueco o viejo diluye de más y puede aportar olores del congelador.", l: [
          "Moldes de silicón para cubos grandes.",
          "Hielo nuevo, no el que lleva semanas.",
          "Mucho hielo en la coctelera."] }] },
    "Jarabe natural: la base que todo el mundo compra hecha": { ic: "honey-pot",
      sesion: [[5, "Calienta agua y mide la misma cantidad de azúcar."],
               [10, "Disuelve el azúcar, deja enfriar y embotella en un frasco limpio con etiqueta y fecha."],
               [10, "Haz una variante: jarabe de jengibre con unas rebanadas en infusión 20 minutos."]],
      sale: "Tienes jarabe simple y uno de jengibre etiquetados en el refrigerador.",
      copia: { t: "Jarabes", l: [
        "Simple 1:1 · 1 taza de azúcar + 1 taza de agua caliente · revolver · enfriar · 1 mes en refri",
        "Rico 2:1 · 2 de azúcar + 1 de agua · más dulce, dura más",
        "Jengibre · simple + 50 g de jengibre en rebanadas · 20 min · colar",
        "Agave · 2 de jarabe de agave + 1 de agua tibia · para tequila y mezcal"] },
      subtemas: [
        { t: "Por qué disolver el azúcar", d: "El azúcar se disuelve mal en líquidos fríos y con alcohol. El jarabe ya disuelto se mezcla de inmediato y de forma pareja. Además, permite medir el dulzor con precisión.", l: [
          "Azúcar granulada en frío = granos sin disolver.",
          "Jarabe = dulzor uniforme.",
          "Más fácil de medir."] },
        { t: "Jarabe rico", d: "El jarabe rico (2 partes de azúcar por 1 de agua) es más concentrado: endulza con menos volumen, diluye menos el trago y dura más en el refrigerador por tener menos agua libre.", l: [
          "Usa la mitad de cantidad que el simple.",
          "Dura más tiempo.",
          "Útil en tragos revueltos."] },
        { t: "Infusiones caseras", d: "Infusionar jarabes con hierbas, especias o frutas es la forma más barata de crear sabores propios. Canela, cardamomo, romero o chile seco dan carácter a un trago o a una bebida sin alcohol.", l: [
          "Infusiona en caliente y cuela.",
          "Prueba cada 5 minutos para no pasarte.",
          "Etiqueta y guarda en frío."] }] },
    "Agitar o revolver": { ic: "spoon",
      sesion: [[5, "Prepara dos bebidas sin alcohol: una con cítrico y otra transparente (por ejemplo, té frío con un toque de jarabe)."],
               [15, "Agita la de cítrico 15 segundos fuerte y revuelve la transparente 25 segundos; mide cuánto líquido ganaron por dilución."],
               [5, "Compara textura, temperatura y aspecto."]],
      sale: "Agitaste y revolviste correctamente y notaste la diferencia de textura y dilución.",
      subtemas: [
        { t: "La física de agitar", d: "Agitar mezcla rápido, enfría por el contacto del hielo en movimiento, diluye y mete microburbujas de aire que dan textura espumosa. En unos 10 a 15 segundos la mayoría de los tragos alcanzan su temperatura y dilución.", l: [
          "Agita fuerte y con hielo abundante.",
          "La coctelera debe escarcharse por fuera.",
          "Cuela de inmediato para no diluir de más."] },
        { t: "Doble colado", d: "Al agitar con cítricos o hierbas, pasan pedazos de hielo y pulpa. Colar con el colador de la coctelera y un colador fino a la vez (doble colado) da un trago limpio y sedoso.", l: [
          "Colador de muelle + colador fino.",
          "Ideal con frutas y hierbas.",
          "Sirve en copa fría."] },
        { t: "Dry shake con clara", d: "Para tragos con clara de huevo, se agita primero sin hielo (dry shake) para emulsionar la proteína y luego con hielo para enfriar. Así se forma la espuma densa. La aquafaba (agua de garbanzo) es una alternativa vegana.", l: [
          "Primero sin hielo, luego con hielo.",
          "Usa huevos frescos y de confianza.",
          "Aquafaba como sustituto."] }] },
    "Clásico 1 · Margarita": { ic: "cocktail-glass",
      sesion: [[5, "Exprime limones frescos, prepara la copa fría y media orilla de sal."],
               [15, "Prepara la margarita para un invitado con la plantilla, midiendo; para ti, la versión sin alcohol con jarabe de agave, limón, agua mineral y la media orilla de sal."],
               [5, "Prueba la tuya y ajusta ácido o dulce; anota la proporción."]],
      sale: "Prepararías la margarita midiendo, con limón fresco y media orilla de sal, y tienes una versión sin alcohol que te gusta.",
      copia: { t: "Margarita y su versión sin alcohol", l: [
        "Margarita: 60 ml tequila 100% agave blanco · 30 ml limón · 20 ml triple sec · agitar · colar · media orilla de sal",
        "Sin alcohol: 30 ml limón · 20 ml jarabe de agave · 90 ml agua mineral muy fría · hielo · media orilla de sal con chile"] },
      subtemas: [
        { t: "El origen disputado", d: "Hay varias historias sobre quién inventó la margarita, en México o en la frontera, entre los años 30 y 40. Es un ejemplo de la familia de los sours con licor de naranja, pariente del Sidecar.", l: [
          "Pertenece a la familia de los daisies o sours.",
          "El licor de naranja da dulzor y aroma.",
          "La sal realza y equilibra la acidez."] },
        { t: "Tequila 100 % agave", d: "La norma mexicana permite tequila «mixto» con hasta 49 % de azúcares de otras fuentes. El tequila 100 % de agave lo dice en la etiqueta y tiene más sabor a agave. Para cocteles, un blanco 100 % agave es lo recomendado.", l: [
          "Busca «100 % de agave» en la etiqueta.",
          "Blanco para cocteles cítricos.",
          "Reposado para tragos más suaves."] },
        { t: "La sal en el borde", d: "La sal reduce la percepción de amargor y realza el dulce y el ácido. Ponerla solo en la mitad del borde deja que cada quien decida. Una sal con chile y limón le da un toque mexicano.", l: [
          "Humedece el borde por fuera con limón.",
          "Sal solo por fuera, no dentro de la copa.",
          "Media orilla para dar opción."] }] },
    "Clásico 2 · Old Fashioned": { ic: "tumbler-glass",
      sesion: [[5, "Prepara un cubo grande de hielo, cáscara de naranja y vaso bajo."],
               [15, "Practica la técnica del Old Fashioned con una versión sin alcohol (té negro fuerte o destilado sin alcohol + jarabe + bitters sin alcohol si consigues), revolviendo 30 segundos y exprimiendo la cáscara."],
               [5, "Observa la nube de aceite al exprimir la cáscara y anota la receta."]],
      sale: "Dominas la técnica de revolver y exprimir la cáscara, y tienes una versión sin alcohol de tu gusto.",
      copia: { t: "Old Fashioned", l: [
        "60 ml whisky (bourbon o centeno)",
        "1 cdta jarabe simple",
        "2–3 golpes de Angostura",
        "Revolver 30 s con un cubo grande en el vaso",
        "Exprimir cáscara de naranja con la piel hacia el trago y pasarla por el borde"] },
      subtemas: [
        { t: "El coctel original", d: "A principios del siglo XIX, «cocktail» se definía como destilado, azúcar, agua y bitters. Cuando aparecieron tragos más complicados, la gente empezó a pedir uno «a la antigua»: de ahí el nombre Old Fashioned.", l: [
          "Es la definición original de coctel.",
          "Cuatro ingredientes, cero adornos.",
          "La calidad del destilado se nota mucho."] },
        { t: "Los bitters", d: "Los bitters son extractos concentrados de hierbas, raíces y especias, originalmente medicinales. Angostura, creado en Venezuela en el siglo XIX, es el más usado. Aunque tienen alcohol, se usan en gotas; existen versiones sin alcohol.", l: [
          "Unas gotas cambian todo el trago.",
          "Angostura: especiado; de naranja: cítrico.",
          "Busca versiones sin alcohol para tus bebidas."] },
        { t: "Los aceites de la cáscara", d: "La cáscara de los cítricos tiene glándulas con aceites aromáticos (como el limoneno). Al exprimirla sobre el trago, una fina nube de aceite cae en la superficie y es lo primero que hueles. Es un ingrediente, no un adorno.", l: [
          "Corta la cáscara sin mucha parte blanca (amarga).",
          "Exprime con la piel hacia el vaso.",
          "Pasa la cáscara por el borde."] }] },
    "Clásico 3 · Negroni": { ic: "orange-circle",
      sesion: [[5, "Lee la plantilla 1:1:1 y la variante suave."],
               [15, "Practica la técnica con una versión sin alcohol: aperitivo amargo sin alcohol o agua tónica con un toque de jarabe de naranja y bitters sin alcohol, revuelto con hielo y con cáscara."],
               [5, "Anota la proporción y guarda el vermut, si tienes, en el refrigerador."]],
      sale: "Sabes preparar un Negroni para un invitado y tienes una versión amarga sin alcohol de tu gusto.",
      copia: { t: "Negroni", l: [
        "30 ml ginebra · 30 ml Campari · 30 ml vermut rojo",
        "Revolver con hielo 25 s",
        "Servir sobre hielo grande · cáscara de naranja",
        "Versión suave: 45 vermut · 20 Campari · 30 ginebra"] },
      subtemas: [
        { t: "Un aperitivo italiano", d: "Se cuenta que el Negroni nació en Florencia hacia 1919, cuando el conde Camillo Negroni pidió fortalecer un Americano (Campari, vermut y soda) con ginebra. Pertenece a la tradición italiana de aperitivos amargos que abren el apetito.", l: [
          "Es un aperitivo: antes de comer.",
          "El amargor abre el apetito.",
          "Pariente del Americano y del Boulevardier."] },
        { t: "El vermut es vino", d: "El vermut es vino fortificado y aromatizado con hierbas. Una vez abierto se oxida como cualquier vino: en el refrigerador dura unas semanas a un par de meses. Uno oxidado arruina el trago.", l: [
          "Refrigéralo al abrirlo.",
          "Compra botellas pequeñas si usas poco.",
          "Pruébalo: si sabe a nuez rancia, ya pasó."] },
        { t: "El gusto por lo amargo", d: "El amargor es un sabor que se aprende: de niños lo rechazamos y de adultos podemos disfrutarlo con exposición repetida. Café, cerveza, chocolate oscuro y Campari son gustos adquiridos.", l: [
          "Empieza con versiones menos amargas.",
          "La exposición repetida cambia el gusto.",
          "Combina amargo con algo de dulce al inicio."] }] },
    "Clásico 4 · Daiquiri": { ic: "lime",
      sesion: [[5, "Exprime limones y prepara jarabe simple y una copa fría."],
               [15, "Practica el balance con la plantilla sin alcohol: 25 ml limón, 20 ml jarabe y 60 ml de agua fría o té blanco; agita fuerte y ajusta de 5 en 5 ml."],
               [5, "Anota la proporción exacta que te dio el mejor balance."]],
      sale: "Encontraste tu balance exacto de limón y jarabe y lo tienes anotado en mililitros.",
      copia: { t: "Daiquiri", l: [
        "60 ml ron blanco · 25 ml limón · 20 ml jarabe simple",
        "Agitar fuerte 12–15 s · colar en copa fría · sin hielo en la copa",
        "Gimlet: cambiar ron por ginebra",
        "Sin alcohol: 25 limón · 20 jarabe · 60 agua fría o té blanco"] },
      subtemas: [
        { t: "El origen cubano", d: "El daiquiri se asocia con la playa y la mina de Daiquirí, en Cuba, a finales del siglo XIX. Se popularizó en el bar El Floridita de La Habana, donde Hemingway pedía su versión con toronja y marrasquino.", l: [
          "Nació como trago simple: ron, limón, azúcar.",
          "El Floridita lo hizo famoso.",
          "El congelado es otra receta."] },
        { t: "La acidez de los limones", d: "No todos los limones tienen la misma acidez: varían por variedad, madurez y temporada. Por eso los bartenders prueban y ajustan. El limón mexicano (agrio) es más ácido y aromático que el limón persa.", l: [
          "Prueba el limón antes de usarlo.",
          "Ajusta el jarabe según la acidez.",
          "Exprime al momento: pierde aroma en horas."] },
        { t: "Probar con popote", d: "Los bartenders prueban cada trago antes de servir usando un popote: lo meten, tapan la punta y sacan unas gotas. Así ajustan sin probar del vaso del cliente. Para ti, es la forma de ajustar las versiones sin alcohol.", l: [
          "Prueba siempre antes de servir.",
          "Ajusta en pequeños incrementos.",
          "Anota los ajustes que funcionaron."] }] },
    "Clásico 5 · Highball perfecto": { ic: "cup-with-straw",
      sesion: [[5, "Enfría un vaso alto y prepara mucho hielo y un refresco bien frío."],
               [15, "Haz un highball sin alcohol: tónica o ginger ale con jarabe de jengibre y limón, con las cuatro reglas: vaso lleno de hielo, base primero, refresco por la cuchara y una sola vuelta."],
               [5, "Compara con uno hecho sin las reglas: notarás la diferencia de gas y frío."]],
      sale: "Tu highball conserva el gas y el frío y sabes por qué.",
      copia: { t: "Highball", l: [
        "Vaso alto frío, lleno de hielo hasta arriba",
        "50 ml destilado (o 20 ml jarabe de jengibre para la versión sin alcohol)",
        "150 ml mezclador muy frío, vertido por el mango de la cuchara",
        "Una sola vuelta · cáscara o rodaja de cítrico"] },
      subtemas: [
        { t: "Más hielo, menos dilución", d: "Parece al revés, pero un vaso lleno de hielo se mantiene más frío y cada cubo se derrite más lento. Con poco hielo, cada cubo trabaja más, se derrite rápido y diluye más el trago.", l: [
          "Llena el vaso de hielo hasta arriba.",
          "Hielo frío y duro, no mojado.",
          "Vaso frío desde el congelador."] },
        { t: "El gas", d: "El dióxido de carbono se disuelve mejor en líquidos fríos. Un refresco tibio pierde gas al servirlo; uno frío, vertido suave por la cuchara, lo conserva. Revolver de más lo saca.", l: [
          "Mezcladores muy fríos.",
          "Vierte despacio por un costado.",
          "Una vuelta y listo."] },
        { t: "La cultura japonesa del highball", d: "En Japón el highball de whisky es un trago popular y muy cuidado: vaso helado, hielo de calidad, proporciones exactas y un solo giro. Muestra que lo simple bien hecho puede ser excelente.", l: [
          "Lo simple se nota más cuando está bien hecho.",
          "Cada detalle cuenta.",
          "Aplica igual a las versiones sin alcohol."] }] },
    "De qué está hecho cada destilado": { ic: "alembic",
      sesion: [[5, "Haz una tabla con cada destilado: materia prima, si reposa en barrica y de dónde es."],
               [15, "Lee etiquetas en una tienda o en línea: tequila 100 % agave, mezcal artesanal o ancestral, whisky bourbon o escocés."],
               [5, "Escribe tres datos para explicar en una reunión la diferencia entre tequila y mezcal."]],
      sale: "Explicas con claridad la diferencia entre tequila y mezcal y de qué se hace cada destilado.",
      subtemas: [
        { t: "La destilación", d: "Destilar es calentar un líquido fermentado para separar el alcohol, que hierve antes que el agua, y condensar sus vapores. El alambique concentra alcohol y aromas. La materia prima y la madera definen el carácter final.", l: [
          "Primero se fermenta, luego se destila.",
          "El alambique concentra alcohol y aromas.",
          "La barrica añade color y sabores."] },
        { t: "Las denominaciones de origen", d: "México protege con denominación de origen el tequila, el mezcal, el sotol, la bacanora y la raicilla, entre otros. Cada una define zonas, agaves y procesos. El Consejo Regulador del Tequila certifica cada botella.", l: [
          "Tequila: agave azul en zonas definidas.",
          "Mezcal: varios agaves y estados.",
          "Busca el sello del consejo regulador."] },
        { t: "Mezcal: categorías", d: "La norma del mezcal distingue mezcal, mezcal artesanal y mezcal ancestral según el proceso: cocción, molienda y destilación. El ancestral, por ejemplo, se destila en ollas de barro. Muchos se elaboran por familias en Oaxaca y otros estados.", l: [
          "Artesanal y ancestral: procesos tradicionales.",
          "Agaves silvestres tardan años en madurar.",
          "Pregunta por el agave y el maestro mezcalero."] }] },
    "Dos más para el repertorio · Whisky Sour y Mojito": { ic: "herb",
      sesion: [[5, "Prepara hierbabuena fresca, limón, jarabe y agua mineral."],
               [15, "Haz un mojito sin alcohol (virgen): golpea la hierbabuena con la palma, limón, jarabe, hielo picado y agua mineral; prueba también un sour sin alcohol con aquafaba y dry shake."],
               [5, "Anota cuál te gustó más y su proporción."]],
      sale: "Hiciste un mojito virgen sin amargar la hierbabuena y un sour sin alcohol con espuma.",
      copia: { t: "Whisky Sour y Mojito", l: [
        "Whisky Sour: 60 whisky · 25 limón · 20 jarabe · (clara) · dry shake + shake con hielo",
        "Mojito: 8–10 hojas de hierbabuena golpeadas · 25 limón · 20 jarabe · 50 ron blanco · hielo picado · tope de soda",
        "Virgen: igual sin ron, con más soda"] },
      subtemas: [
        { t: "La hierbabuena y la menta", d: "En México, la hierbabuena (Mentha spicata) es la más usada para el mojito; la menta piperita tiene más mentol. Golpear las hojas libera aceites aromáticos; machacarlas rompe tejidos y libera compuestos amargos.", l: [
          "Golpea con la palma, no muelas.",
          "Usa hojas frescas, sin tallos gruesos.",
          "Decora con una ramita al final."] },
        { t: "La espuma del sour", d: "La clara de huevo tiene proteínas que, al agitarse, atrapan aire y forman una espuma estable que suaviza la acidez y da textura sedosa. Unas gotas de bitters sobre la espuma dan aroma y decoración.", l: [
          "Dry shake para crear espuma.",
          "Bitters en gotas sobre la espuma.",
          "Aquafaba funciona igual."] },
        { t: "Beber destilados derechos", d: "Los destilados de calidad se aprecian a sorbos pequeños, dejando que el aroma llegue a la nariz. En México, el mezcal se acompaña tradicionalmente con naranja y sal de gusano. Unas gotas de agua pueden abrir los aromas del whisky.", l: [
          "A sorbos, nunca de un trago.",
          "Huele antes de probar.",
          "Para ti, la técnica sirve para catar sin tomar."] }] },
    "Hielo, cítricos y hierbas": { ic: "ice",
      sesion: [[5, "Pon agua hervida y enfriada en moldes grandes para hielo transparente."],
               [15, "Exprime limones a temperatura ambiente rodándolos antes; practica cortar cáscaras sin parte blanca y exprimirlas sobre un vaso para ver la nube de aceite."],
               [5, "Guarda las hierbas con el tallo en agua, como flores, en el refrigerador."]],
      sale: "Tienes hielo más transparente, sacas más jugo de los limones y cortas cáscaras limpias.",
      subtemas: [
        { t: "Hielo transparente", d: "El hielo se ve turbio por el aire y los minerales atrapados al congelarse desde todos los lados. El congelamiento direccional —en una hielera pequeña dentro del congelador, que congela de arriba hacia abajo— da bloques transparentes.", l: [
          "Hielera pequeña sin tapa en el congelador.",
          "Saca el bloque antes de que se congele todo.",
          "Corta con cuchillo de sierra cuando se tempere."] },
        { t: "Exprimir bien", d: "Un exprimidor de mano de palanca saca más jugo y menos amargor que exprimir con la mano, porque no aprieta tanto la cáscara. Colocar el limón con el corte hacia abajo hace que la cáscara se invierta y libere también aceites.", l: [
          "Exprimidor de palanca.",
          "Corte hacia abajo en el exprimidor.",
          "Cuela semillas y pulpa gruesa."] },
        { t: "Hierbas frescas", d: "Las hierbas delicadas como la albahaca y la hierbabuena se marchitan rápido en frío seco. Guardarlas como un ramo en agua o envueltas en papel húmedo dentro de un recipiente las mantiene varios días.", l: [
          "Tallos en agua, como flores.",
          "Albahaca mejor fuera del refri.",
          "Lava justo antes de usar."] }] },
    "Ser el que sirve": { ic: "bellhop-bell",
      sesion: [[5, "Elige los dos tragos que vas a dominar y una bebida sin alcohol estrella."],
               [15, "Planea una reunión: lista de preparación previa (jarabe, cítricos, hielo, copas en el congelador) y las dos preguntas para cada invitado."],
               [5, "Escribe tu menú de bebidas en una tarjeta para mostrarlo."]],
      sale: "Tienes tus dos tragos, una bebida sin alcohol estrella y la lista de preparación para una reunión.",
      copia: { t: "Menú de la casa", l: [
        "1. ______ (clásico) · seco y cítrico",
        "2. ______ (clásico) · dulce y suave",
        "3. ______ (sin alcohol, de la casa) · fresco",
        "Preparar antes: jarabe · cítricos exprimidos · hielo de sobra · copas frías",
        "Preguntar: ¿dulce o seco? ¿con o sin cítrico?"] },
      subtemas: [
        { t: "La preparación por lotes", d: "Para fiestas, los bartenders preparan cocteles en lote (batching): mezclan todo menos el hielo y los cítricos que se oxidan rápido, y al servir solo agitan o vierten. Reduce el tiempo en la barra y mantiene la consistencia.", l: [
          "Mezcla destilados y jarabes con anticipación.",
          "Añade agua para compensar la dilución si lo sirves sin agitar.",
          "Cítricos frescos el mismo día."] },
        { t: "El anfitrión responsable", d: "Servir alcohol implica cuidar a los invitados: comida disponible, agua y opciones sin alcohol, y asegurarte de que nadie maneje después de beber. En México, el anfitrión puede ofrecer pedir un taxi o una app.", l: [
          "Comida siempre disponible.",
          "Agua a la vista.",
          "Ofrece transporte a quien bebió."] },
        { t: "Bebidas sin alcohol de nivel", d: "La coctelería sin alcohol creció en los últimos años: destilados desalcoholizados, aperitivos amargos sin alcohol, kombuchas y tónicas premium. Ser bueno en esto te hace un anfitrión inclusivo y te permite disfrutar sin tomar.", l: [
          "Una bebida sin alcohol tan cuidada como las demás.",
          "Mismo vaso, mismo hielo, misma decoración.",
          "Que nadie tenga que explicar por qué no toma."] }] },
    "Beber con cabeza": { ic: "brain",
      sesion: [[5, "Revisa tu meta de no tomar en Hábitos y cómo vas."],
               [15, "Escribe tu plan para reuniones: qué bebida sin alcohol pides o sirves, quién maneja y qué respondes si te ofrecen."],
               [5, "Comparte tu plan con alguien que va a estar en la próxima reunión."]],
      sale: "Tienes un plan claro para reuniones que protege tu meta y tu seguridad al volante.",
      subtemas: [
        { t: "El alcohol en el cuerpo", d: "El hígado procesa aproximadamente una bebida estándar por hora; beber más rápido acumula alcohol en la sangre. Comer antes retrasa la absorción. Nada acelera la eliminación: ni café ni agua fría.", l: [
          "El tiempo es lo único que elimina el alcohol.",
          "Comer antes reduce el pico.",
          "El café no te pone sobrio."] },
        { t: "El alcoholímetro en CDMX", d: "En la Ciudad de México, el programa Conduce sin Alcohol establece límites de alcohol en aire espirado; rebasarlo puede significar arresto administrativo y el coche al corralón. Para quien vive de manejar, el costo es enorme.", l: [
          "Si bebiste, no manejas.",
          "Para conductores de plataforma, la regla es cero.",
          "Ten siempre plan de regreso."] },
        { t: "La meta de no tomar como habilidad", d: "Mantener una meta sin alcohol en contextos sociales es una habilidad: saber pedir, responder sin justificarte y disfrutar sin sentirte fuera. Mucha gente reporta mejor sueño, ánimo y entrenamiento al reducir o dejar el alcohol.", l: [
          "Respuesta simple: «ahorita no estoy tomando».",
          "Ten tu bebida favorita sin alcohol.",
          "Registra cómo duermes y entrenas: es tu motivación."] }] },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  nudos: {
    "Cuatro conceptos antes del primer nudo": { ic: "knot",
      sesion: [[5, "Consigue un tramo de cuerda de 1.5 a 2 metros y de 6 a 8 mm de grosor."],
               [15, "Con la cuerda en la mano, señala chicote y firme, haz un seno y una coca, y haz un nudo simple dejando 10 cm de cabo de seguridad."],
               [5, "Guarda la cuerda donde la veas todos los días."]],
      sale: "Nombras y formas chicote, firme, seno y coca sin dudar, y tienes tu cuerda de práctica a la mano.",
      subtemas: [
        { t: "Por qué un nudo debilita la cuerda", d: "En la curva de un nudo, las fibras del exterior se estiran más que las del interior y soportan más carga. Por eso la cuerda falla en el nudo, no en un tramo recto. Los nudos con curvas más abiertas, como el ocho, debilitan menos.", l: [
          "Curvas cerradas = más debilidad.",
          "El ocho conserva más resistencia que el nudo simple.",
          "Para cargas serias, usa cuerda con margen de resistencia."] },
        { t: "El vocabulario del marinero", d: "El vocabulario de los nudos viene de la náutica: chicote, firme, seno, coca, gaza (un ojo fijo). Aprenderlo hace que cualquier manual o video se entienda a la primera, porque todos usan estas palabras.", l: [
          "Gaza: un aro fijo al final de la cuerda.",
          "Vuelta: rodear un objeto con la cuerda.",
          "Cote: una vuelta alrededor de la propia cuerda."] },
        { t: "Tipos de nudo según su función", d: "Los nudos se agrupan por función: topes (evitan que la cuerda se salga), gazas (forman un aro), ayustes o empalmes (unen cuerdas) y amarres (fijan a un objeto). Saber la función te dice cuál buscar.", l: [
          "Tope: ocho.",
          "Gaza: as de guía.",
          "Unión: llano y vuelta de escota; amarre: ballestrinque y medios cotes."] }] },
    "Nudo 1 — As de guía (bowline): el aro fijo que nunca se aprieta": { ic: "knot",
      sesion: [[5, "Repasa los cuatro pasos con la historia del conejo."],
               [15, "Haz el as de guía 10 veces seguidas; luego 3 alrededor de tu cintura y 3 con los ojos cerrados."],
               [5, "Cuelga un peso (una mochila) del aro y comprueba que no se cierra y que se desata fácil después."]],
      sale: "Haces el as de guía en menos de 10 segundos, con los ojos cerrados, y se desata fácil después de cargar peso.",
      subtemas: [
        { t: "El rey de los nudos", d: "Los marineros llaman al as de guía «el rey de los nudos» por ser fuerte, estable y fácil de deshacer después de cargar. Se usaba para amarrar la vela al viento (de ahí su nombre en inglés: bow-line).", l: [
          "No se aprieta bajo carga.",
          "Se desata empujando el seno que rodea el firme.",
          "Útil en rescate, náutica y campamento."] },
        { t: "El as de guía con una mano", d: "Existe una técnica para hacer el as de guía alrededor de tu propia cintura con una sola mano, pensada para rescates donde la otra mano está ocupada o herida. Requiere mucha práctica y conviene aprenderla con un video detallado.", l: [
          "Practícala solo después de dominar la normal.",
          "Hazla primero alrededor de un poste.",
          "Luego alrededor de tu cintura."] },
        { t: "Asegurar el as de guía", d: "El as de guía puede aflojarse si la carga va y viene sin tensión. Para mayor seguridad, se remata el chicote con un medio cote o un nudo de tope alrededor del aro. En escalada se prefieren otros nudos por esa razón.", l: [
          "Remata con un medio cote si la carga es intermitente.",
          "Deja siempre cabo de seguridad.",
          "No lo uses para escalada."] }] },
    "Nudo 2 — Ocho (figure eight): el tope que no deja que la cuerda se escape": { ic: "infinity",
      sesion: [[5, "Repasa los tres pasos del ocho."],
               [15, "Hazlo 10 veces; luego jala fuerte y comprueba que se desata con facilidad, comparándolo con un nudo simple apretado."],
               [5, "Pon un ocho en el extremo de una cuerda que pase por un agujero (un cordón de mochila)."]],
      sale: "Haces el ocho de memoria y compruebas que se desata fácil incluso después de jalarlo fuerte.",
      subtemas: [
        { t: "El ocho como base", d: "Del ocho salen otros nudos importantes, como el ocho doble (una gaza muy fuerte) y el ocho recorrido, que los escaladores usan para atarse al arnés. Aprenderlo bien es la base de esa familia.", l: [
          "Ocho simple: tope.",
          "Ocho doble: gaza resistente.",
          "Ocho recorrido: unión segura al arnés (solo con formación)."] },
        { t: "Revisar un nudo con la vista", d: "Un ocho bien hecho tiene una forma reconocible, con las dos vueltas paralelas y ordenadas («peinado»). Revisar visualmente cada nudo antes de cargarlo es una práctica de seguridad estándar en escalada y náutica.", l: [
          "Las vueltas paralelas, sin cruces.",
          "Bien apretado antes de cargar.",
          "Cabo de seguridad suficiente."] },
        { t: "Los cordones de zapatos", d: "El nudo de los zapatos es un nudo llano con lazadas. Muchas personas lo hacen como nudo de vieja, por eso se desata. Hacer el segundo paso en dirección contraria lo convierte en llano y deja de desatarse.", l: [
          "Si tus lazadas quedan verticales, está mal.",
          "Cambia la dirección de la segunda vuelta.",
          "Quedarán horizontales y firmes."] }] },
    "Nudo 3 — Llano o rizo (square knot): unir dos cuerdas del MISMO grosor": { ic: "linked-paperclips",
      sesion: [[5, "Repasa la regla: izquierda sobre derecha, derecha sobre izquierda."],
               [15, "Hazlo 10 veces y compáralo con un nudo de vieja; luego intenta zafarlo con dos cuerdas de distinto grosor para ver por qué falla."],
               [5, "Úsalo para cerrar una bolsa o un paquete esta semana."]],
      sale: "Haces el llano sin confundirlo con el de vieja y sabes por qué no sirve con cuerdas de distinto grosor.",
      subtemas: [
        { t: "El nudo de los primeros auxilios", d: "El nudo llano se usa para atar vendajes y cabestrillos porque queda plano y no lastima. Por eso aparece en manuales de primeros auxilios y de los Boy Scouts.", l: [
          "Plano: no se clava en la piel.",
          "Fácil de desatar empujando las puntas.",
          "Ideal para vendas y bolsas."] },
        { t: "Por qué falla con cargas", d: "El nudo llano puede «volcarse» si se jala una punta y un firme del mismo lado, convirtiéndose en un nudo que se desliza. Por eso no se usa para cargas importantes ni para unir cuerdas que soportarán peso.", l: [
          "No para remolcar ni cargas.",
          "No para cuerdas resbalosas.",
          "Para eso: vuelta de escota o nudos especializados."] },
        { t: "El nudo de rizo de las velas", d: "Su nombre en español viene de su uso para «tomar rizos» en las velas: reducir su superficie cuando hay mucho viento atando la tela sobrante. Se desata rápido jalando una punta, lo que era vital en el mar.", l: [
          "Pensado para desatarse rápido.",
          "No para estar sometido a cargas fuertes.",
          "Su historia explica su uso."] }] },
    "Nudo 4 — Vuelta de escota (sheet bend): unir dos cuerdas de DISTINTO grosor": { ic: "link",
      sesion: [[5, "Consigue dos cuerdas de distinto grosor."],
               [15, "Haz la vuelta de escota 10 veces; revisa que las dos puntas queden del mismo lado y prueba a jalar."],
               [5, "Haz la vuelta de escota doble (una vuelta más) para cuerdas muy distintas o resbalosas."]],
      sale: "Unes dos cuerdas de distinto grosor con las puntas del mismo lado y el nudo aguanta al jalar.",
      subtemas: [
        { t: "La vuelta de escota doble", d: "Cuando las cuerdas son muy diferentes en grosor o son resbalosas, se da una segunda vuelta con la cuerda delgada antes de meterla bajo sí misma. Añade fricción y seguridad.", l: [
          "Una vuelta más con la cuerda delgada.",
          "Para diferencias grandes de grosor.",
          "Para cuerdas sintéticas resbalosas."] },
        { t: "El nudo del tejedor", d: "La vuelta de escota es, en estructura, el mismo nudo que usaban los tejedores para unir hilos en el telar, por eso también se llama nudo de tejedor. Es pequeño y no se atora en las máquinas.", l: [
          "Mismo nudo, distintas tradiciones.",
          "Pequeño y eficiente.",
          "Útil para hilos y cordones delgados."] },
        { t: "Unir cuerdas con seguridad", d: "Para cargas importantes, los profesionales usan uniones más seguras, como el nudo de pescador doble, o evitan unir cuerdas. Si unes, revisa el nudo y deja cabos largos.", l: [
          "Para cargas serias, una sola cuerda es mejor.",
          "Si unes, usa el nudo adecuado.",
          "Revisa la unión antes de cargar."] }] },
    "Nudo 5 — Ballestrinque (clove hitch): amarrar a un poste en 2 segundos": { ic: "construction",
      sesion: [[5, "Usa un poste, una pata de silla o un tubo."],
               [15, "Haz el ballestrinque 10 veces rodeando el poste y 5 veces con la versión de dos bucles en el aire."],
               [5, "Mueve la carga de lado a lado para ver cómo puede aflojarse, y remátalo con un medio cote."]],
      sale: "Haces el ballestrinque en las dos versiones en segundos y sabes cuándo rematarlo.",
      subtemas: [
        { t: "Ajustable sin desatar", d: "El ballestrinque permite ajustar la longitud de la cuerda deslizando las vueltas sin deshacer el nudo. Por eso los marineros lo usan para fijar defensas en los barcos y los campistas para amarres temporales.", l: [
          "Ajusta la longitud deslizando las vueltas.",
          "Rápido de poner y quitar.",
          "Temporal, no permanente."] },
        { t: "Cuándo falla", d: "El ballestrinque puede rodar y aflojarse si el poste gira o la carga cambia de dirección. En un poste cuadrado se sujeta mejor que en uno redondo y liso. Un medio cote extra lo asegura.", l: [
          "Rematar con medio cote si va a quedar tiempo.",
          "Postes lisos: más riesgo de deslizamiento.",
          "Revisa si la carga va y viene."] },
        { t: "En pionerismo y campamento", d: "En el pionerismo scout, el ballestrinque es el inicio y final de los amarres que unen palos para construir estructuras (amarre cuadrado, diagonal). Es la base para construir refugios y mesas en campamento.", l: [
          "Inicio de los amarres de palos.",
          "Útil para construir con troncos.",
          "Practica un amarre cuadrado después."] }] },
    "Nudo 6 — Dos medios cotes (two half hitches): el amarre seguro que sí aguanta": { ic: "anchor",
      sesion: [[5, "Usa una argolla o un poste."],
               [15, "Haz los dos medios cotes 10 veces, con los dos cotes en la misma dirección; prueba la versión con una vuelta redonda extra al poste."],
               [5, "Cuelga algo y deja el amarre un día; revisa que no se haya aflojado."]],
      sale: "Haces dos medios cotes en la misma dirección y el amarre aguanta un día sin aflojarse.",
      subtemas: [
        { t: "Vuelta redonda y dos medios cotes", d: "Dar una vuelta completa al poste antes de los dos medios cotes (round turn and two half hitches) reparte la carga y añade fricción, de modo que el nudo soporta más y se desata con facilidad aunque haya cargado mucho.", l: [
          "Una vuelta completa al poste primero.",
          "Después, los dos medios cotes.",
          "Más seguro para cargas constantes."] },
        { t: "Dirección de los cotes", d: "Si los dos medios cotes van en la misma dirección, forman un ballestrinque alrededor del firme: firme y estable. En direcciones opuestas forman otro nudo que puede deslizarse.", l: [
          "Misma dirección siempre.",
          "Revisa que se vean iguales.",
          "Desliza ambos hacia el poste."] },
        { t: "Colgar una hamaca", d: "Para colgar una hamaca de árboles, se recomienda usar cintas anchas que no dañen la corteza y un amarre seguro como la vuelta redonda con dos medios cotes. Colgarla a la altura y tensión correctas evita caídas.", l: [
          "Usa cintas anchas para proteger los árboles.",
          "Ángulo de unos 30 grados en las cuerdas.",
          "Prueba la carga con cuidado antes de acostarte."] }] },
    "Nudo 7 — Nudo tensor (taut-line / Midshipman's hitch): tensa y se ajusta con la mano": { ic: "camping",
      sesion: [[5, "Clava una estaca o usa la pata de una mesa como anclaje."],
               [15, "Haz el nudo tensor 10 veces y practica deslizarlo para tensar y aflojar; cuelga algo ligero y comprueba que se traba."],
               [5, "Úsalo para tender una cuerda de ropa o tensar una lona."]],
      sale: "Tu nudo tensor se desliza con la mano y se traba solo con la carga.",
      subtemas: [
        { t: "La fricción que traba", d: "El nudo tensor funciona por fricción: cuando la cuerda principal se tensa, las vueltas se aprietan contra ella y no se deslizan; sin carga, se pueden mover con la mano. Es el principio de los nudos autobloqueantes.", l: [
          "Con carga: se traba.",
          "Sin carga: se desliza.",
          "Funciona mejor en cuerdas con algo de textura."] },
        { t: "Los vientos de una casa de campaña", d: "Los vientos tensan la casa de campaña para que resista el viento y no acumule agua. Ajustarlos a lo largo de la noche —la cuerda se estira con la humedad— es más fácil con un nudo tensor.", l: [
          "Tensa al armar y revisa antes de dormir.",
          "La humedad afloja algunas cuerdas.",
          "Ángulo de unos 45 grados con el suelo."] },
        { t: "Los nudos autobloqueantes", d: "El nudo prusik y similares son nudos autobloqueantes que se usan en escalada y rescate para subir por una cuerda o como seguro. Son primos del tensor, pero su uso con personas exige formación.", l: [
          "Mismo principio de fricción.",
          "Uso en escalada: solo con formación.",
          "Para campamento basta el tensor."] }] },
    "Nudo 8 — Nudo de camionero (trucker's hitch): el que multiplica tu fuerza x3": { ic: "articulated-lorry",
      sesion: [[5, "Prepara una cuerda suficientemente larga y dos puntos de anclaje (dos patas de mesa o un rack)."],
               [20, "Haz el nudo de camionero completo 5 veces: amarre, ojal, pasar por el anclaje, tensar y rematar con dos medios cotes."],
               [5, "Amarra algo real (una caja a una carretilla o a un rack) y comprueba que no se mueve."]],
      sale: "Amarras una carga con el nudo de camionero, la tensas con fuerza y queda firme.",
      subtemas: [
        { t: "La ventaja mecánica", d: "El ojal funciona como una polea: la cuerda pasa por el anclaje y regresa, por lo que la fuerza que aplicas se multiplica (en teoría hasta tres veces, en la práctica menos por la fricción). Es el mismo principio de los polipastos.", l: [
          "Más tramos de cuerda = más ventaja.",
          "La fricción reduce parte de la ventaja.",
          "Un mosquetón en el ojal reduce la fricción."] },
        { t: "Amarrar carga en el coche", d: "Una carga mal amarrada en el techo puede salir volando a velocidad de carretera. Los expertos recomiendan correas o cuerdas en buen estado, amarres delanteros y traseros, y revisar después de unos kilómetros.", l: [
          "Amarra delante y detrás, no solo a los lados.",
          "Revisa a los 10 o 20 km.",
          "Torcer las correas planas reduce el zumbido."] },
        { t: "Cuidar la cuerda en el ojal", d: "El ojal recibe mucha fricción al tensar y puede dañar la cuerda. Usar un ojal más resistente (como un as de guía o un mosquetón) prolonga la vida de la cuerda y hace el nudo más seguro.", l: [
          "Ojal de as de guía o con mosquetón.",
          "Revisa el desgaste en esa zona.",
          "No uses cuerdas viejas para cargas pesadas."] }] },
    "Fase final — Cómo practicarlos para que de verdad te sirvan (constante, repaso mensual)": { ic: "repeat-button",
      sesion: [[5, "Elige los dos nudos de esta semana."],
               [15, "Haz cada uno 10 veces seguidas; termina con 3 a ciegas o con las manos detrás de la espalda."],
               [5, "Agenda el repaso mensual de los ocho nudos (10 minutos)."]],
      sale: "Los dos nudos de la semana te salen a ciegas y el repaso mensual está en tu calendario.",
      copia: { t: "Qué nudo usar", l: [
        "Aro fijo → as de guía",
        "Tope → ocho",
        "Unir dos cuerdas iguales → llano",
        "Unir dos cuerdas distintas → vuelta de escota",
        "Amarre rápido a poste → ballestrinque",
        "Amarre que aguanta → vuelta redonda + dos medios cotes",
        "Tensar y ajustar → tensor",
        "Amarrar carga fuerte → camionero"] },
      subtemas: [
        { t: "La práctica espaciada", d: "Repasar a intervalos crecientes —un día, una semana, un mes— fija la memoria mucho mejor que practicar todo en una sola sesión. Es el mismo principio que usas en el alemán con las tarjetas.", l: [
          "Día 1: 10 repeticiones.",
          "Día 3 y día 7: repaso.",
          "Mes: repaso de todos."] },
        { t: "Memoria procedimental", d: "Hacer un nudo se guarda en la memoria procedimental, como andar en bicicleta: con práctica suficiente se vuelve automático y resiste mejor el estrés. Por eso el objetivo es poder hacerlos sin pensar.", l: [
          "Repite hasta que no tengas que pensar.",
          "Practica en condiciones difíciles.",
          "Lo automático resiste el estrés."] },
        { t: "Elegir el nudo bajo presión", d: "Saber qué nudo usar es tan importante como hacerlo. Practicar con situaciones reales («tengo que amarrar una lona a un árbol») entrena la decisión, no solo el movimiento.", l: [
          "Practica con escenarios, no solo con nudos.",
          "Pregúntate: ¿qué necesito, aro, tope o amarre?",
          "Revisa la tabla de qué nudo usar."] }] },
    "Cuidar la cuerda": { ic: "thread",
      sesion: [[5, "Revisa tu cuerda pasándola por las manos de punta a punta."],
               [15, "Busca zonas planas, duras o deshilachadas; sella los extremos si están abiertos (con encendedor en sintética o cinta)."],
               [5, "Enróllala suelta, sin nudos, y guárdala seca y lejos del sol."]],
      sale: "Tu cuerda está revisada, con extremos sellados y guardada correctamente.",
      subtemas: [
        { t: "Fibras naturales y sintéticas", d: "Las cuerdas de fibras naturales (henequén, algodón, cáñamo) se pudren con la humedad pero resisten bien el calor; las sintéticas (nailon, poliéster, polipropileno) resisten la humedad pero se degradan con el sol y se derriten con el calor y la fricción.", l: [
          "Natural: no guardes mojada.",
          "Sintética: no la dejes al sol.",
          "Nailon: elástico; poliéster: poco elástico."] },
        { t: "El henequén mexicano", d: "El henequén, de Yucatán, fue durante décadas una de las fibras de cuerda más importantes del mundo: el llamado «oro verde». Hoy la mayoría de las cuerdas son sintéticas, pero el henequén se sigue usando en artesanía.", l: [
          "Fibra natural resistente.",
          "Se degrada con la humedad.",
          "Buena para usos decorativos y livianos."] },
        { t: "Cuándo retirar una cuerda", d: "Una cuerda se retira si tiene daños visibles, rigidez, zonas aplastadas, quemaduras o si sufrió una carga extrema. Para cosas que sostienen peso, ante la duda se reemplaza: es barato comparado con el riesgo.", l: [
          "Daño visible: retírala.",
          "Carga extrema: retírala de usos críticos.",
          "Úsala para tareas sin riesgo."] }] },
    "Cómo practicarlos para que se queden": { ic: "backpack",
      sesion: [[5, "Pon un cordón de 1.5 metros en tu mochila o escritorio."],
               [15, "En un rato muerto del día, haz el nudo de la semana hasta lograrlo en menos de 10 segundos sin mirar."],
               [5, "Usa un nudo en una tarea real esta semana."]],
      sale: "Hiciste el nudo de la semana en menos de 10 segundos sin mirar y lo usaste en algo real.",
      subtemas: [
        { t: "Los ratos muertos", d: "La práctica en ratos muertos —esperando, viendo una serie— suma muchas repeticiones sin quitar tiempo. Es la idea de los micro-hábitos: pegar una práctica pequeña a algo que ya haces.", l: [
          "Cordón en el escritorio.",
          "Un nudo durante cada comercial o espera.",
          "Cinco minutos al día bastan."] },
        { t: "Cronometrarte", d: "Medir el tiempo convierte la práctica en un juego y muestra el progreso. Bajar de 30 a 10 segundos es una señal clara de que el nudo pasó a la memoria automática.", l: [
          "Cronometra cada nudo.",
          "Anota tu mejor tiempo.",
          "Meta: menos de 10 segundos."] },
        { t: "Usar lo aprendido", d: "Las habilidades que no se usan se olvidan. Buscar ocasiones reales —amarrar una carga, tender ropa, colgar algo— mantiene vivos los nudos y te muestra cuál sirve para qué.", l: [
          "Busca un uso real cada semana.",
          "Ofrece ayuda cuando alguien amarre algo.",
          "En campamentos, sé quien amarra."] }] },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  mecanica: {
    "Antes de tocar nada: seguridad": { ic: "construction-worker",
      sesion: [[5, "Revisa que tengas en el coche triángulos, chaleco y linterna."],
               [15, "Practica en tu estacionamiento: intermitentes, colocar triángulos a la distancia correcta, ponerte el chaleco y bajar del coche por el lado contrario al tráfico."],
               [5, "Guarda el número de asistencia de tu seguro en el celular y en papel en la guantera."]],
      sale: "Haces el protocolo de seguridad completo en menos de dos minutos y tienes el número de asistencia a la mano.",
      subtemas: [
        { t: "Los atropellamientos en el acotamiento", d: "Un riesgo serio en carretera es ser atropellado mientras se atiende una falla en el acotamiento. Los conductores que pasan pueden distraerse o no ver a tiempo. Por eso la visibilidad y la distancia del tráfico son la prioridad.", l: [
          "Aléjate lo más posible del carril.",
          "Chaleco reflejante siempre.",
          "Si es peligroso, espera a la grúa fuera del coche y lejos del camino."] },
        { t: "El gato no es un soporte", d: "El gato de emergencia está diseñado para levantar, no para sostener a alguien debajo. Puede resbalar o fallar. Los talleres usan torres de soporte. Por eso nunca se mete ninguna parte del cuerpo debajo de un coche sostenido solo por el gato.", l: [
          "Nunca debajo del coche con gato.",
          "Suelo firme y plano.",
          "Cuñas en las llantas contrarias."] },
        { t: "Cuándo quedarte dentro", d: "En autopistas de alta velocidad, de noche o con niebla, a veces es más seguro quedarse dentro con el cinturón puesto y las intermitentes, o salir y esperar detrás de la barrera de contención, que intentar reparar.", l: [
          "Evalúa: velocidad del tráfico, visibilidad, espacio.",
          "Si dudas, llama a asistencia.",
          "Tu vida vale más que el tiempo perdido."] }] },
    "Lo que siempre debe ir en el coche": { ic: "toolbox",
      sesion: [[5, "Saca todo lo que tienes en la cajuela."],
               [15, "Compara con la lista: gato, llave (prueba que encaje en tus birlos), refacción con aire, arrancador o cables, triángulos, chaleco, linterna, guantes, botiquín, agua, póliza."],
               [5, "Anota lo que falta y cómpralo esta semana."]],
      sale: "Tu kit está completo, la llave encaja en tus birlos y la refacción tiene aire.",
      copia: { t: "Kit del coche", l: [
        "☐ Gato y llave de cruz (probada en mis birlos) · ☐ adaptador de birlo de seguridad",
        "☐ Refacción con aire (revisar cada 2 meses)",
        "☐ Arrancador portátil cargado o cables",
        "☐ 2 triángulos · ☐ chaleco · ☐ linterna de cabeza · ☐ guantes",
        "☐ Botiquín · ☐ agua · ☐ fusibles de repuesto",
        "☐ Póliza y teléfono de asistencia en papel"] },
      subtemas: [
        { t: "El arrancador portátil", d: "Un arrancador portátil de litio puede encender un coche sin necesidad de otro vehículo. Muchos funcionan también como batería para el celular. Hay que mantenerlo cargado: se descarga poco a poco aunque no se use.", l: [
          "Cárgalo cada 3 meses.",
          "Revisa que sea compatible con tu batería de 12 V.",
          "Guárdalo lejos del calor extremo."] },
        { t: "El birlo de seguridad", d: "Muchos coches tienen un birlo de seguridad por llanta que necesita un adaptador especial. Si pierdes el adaptador, no puedes quitar la llanta. Saber dónde está antes de necesitarlo evita quedarte varado.", l: [
          "Ubica el adaptador hoy.",
          "Guárdalo siempre en el mismo lugar.",
          "Anota su código por si lo pierdes."] },
        { t: "El seguro y la asistencia vial", d: "Muchas pólizas incluyen asistencia vial: paso de corriente, cambio de llanta, envío de gasolina o grúa. Saber qué incluye la tuya y cómo pedirla te ahorra tiempo y dinero.", l: [
          "Lee qué incluye tu asistencia vial.",
          "Guarda el número en papel y en el celular.",
          "Pregunta los límites de kilómetros de grúa."] }] },
    "Fase 1 — Cambiar una llanta ponchada, paso a paso completo": { ic: "wheel",
      sesion: [[5, "En tu estacionamiento, de día, con piso plano: freno de mano, cuñas y herramientas listas."],
               [30, "Cambia una llanta completa siguiendo el orden: aflojar en estrella con el coche en el piso, levantar en el punto correcto, cambiar, apretar a mano, bajar y apretar en estrella."],
               [10, "Vuelve a poner la llanta original, revisa la presión y anota cuánto tardaste."]],
      sale: "Cambiaste una llanta completa tú solo, en orden y sin consultar, y sabes tu tiempo.",
      copia: { t: "Cambio de llanta", l: [
        "1. Lugar plano y seguro · intermitentes · freno de mano · cuñas en la diagonal",
        "2. Aflojar birlos ¼ de vuelta en estrella con el coche en el piso",
        "3. Gato en el punto de apoyo del manual · levantar hasta que la llanta despegue",
        "4. Quitar birlos y llanta · montar refacción",
        "5. Apretar a mano en estrella · bajar · apretar fuerte en estrella",
        "6. Revisar presión · refacción temporal: máx. 80 km/h · llantera pronto"] },
      subtemas: [
        { t: "El patrón de estrella", d: "Apretar los birlos en estrella (cruzado) asienta la llanta de forma pareja contra el cubo. Apretar en círculo puede dejarla ligeramente torcida, causar vibraciones o deformar el disco de freno.", l: [
          "Siempre en estrella o cruz.",
          "Primero a mano, luego con fuerza.",
          "Vuelve a revisar el apriete a los 50-100 km."] },
        { t: "El par de apriete", d: "Los fabricantes indican un par de apriete (torque) para los birlos, en newton-metro. Las llanteras usan llaves de torque para no apretar de menos (la llanta puede soltarse) ni de más (se dañan birlos y discos).", l: [
          "Pide en la llantera que revisen el torque.",
          "No te subas a la llave para apretar.",
          "Una llave de torque doméstica es barata."] },
        { t: "Kits de reparación y llantas run-flat", d: "Algunos coches no traen refacción sino un kit de sellador y compresor, o llantas run-flat que permiten rodar un tramo desinflada. Saber qué tiene el tuyo es el primer paso.", l: [
          "Revisa si tu coche trae refacción o kit.",
          "El sellador sirve para pinchazos pequeños en la banda.",
          "Run-flat: velocidad y distancia limitadas."] }] },
    "Fase 2 — Pasar corriente (jump start), en el orden exacto": { ic: "high-voltage",
      sesion: [[5, "Abre el cofre y ubica la batería de 12 V, sus terminales y un punto de metal desnudo para la tierra."],
               [15, "Practica la secuencia en seco, sin conectar: rojo al muerto, rojo al bueno, negro al bueno, negro a metal; y el orden inverso para quitar."],
               [5, "Si tienes arrancador portátil, lee su manual y revisa su carga."]],
      sale: "Dices y señalas la secuencia de conexión y desconexión sin dudar y conoces tu batería de 12 V.",
      copia: { t: "Pasar corriente", l: [
        "Conectar: 1) rojo + muerto · 2) rojo + bueno · 3) negro − bueno · 4) negro a metal desnudo del muerto",
        "Encender el bueno · esperar 2–3 min · intentar el muerto",
        "Desconectar al revés: 4 · 3 · 2 · 1",
        "Manejar 20–30 min para recargar"] },
      subtemas: [
        { t: "Por qué la última conexión va a metal", d: "Las baterías pueden liberar hidrógeno al cargarse. La última conexión puede producir una chispa; hacerla lejos de la batería, en metal del motor o chasis, evita que esa chispa encienda el gas.", l: [
          "Chispa lejos de la batería.",
          "Metal limpio, sin pintura.",
          "Nunca fumes cerca de una batería."] },
        { t: "Por qué muere una batería", d: "Las baterías de plomo-ácido duran en promedio de 3 a 5 años. El calor, los trayectos cortos y dejar luces encendidas las desgastan. En los eléctricos, la batería de 12 V alimenta la electrónica y también puede descargarse.", l: [
          "Más de 3 años: revísala.",
          "Trayectos muy cortos no la recargan.",
          "Las llaves de los eléctricos también dependen de ella."] },
        { t: "El eléctrico y el paso de corriente", d: "Muchos fabricantes de eléctricos indican que su batería de 12 V puede recibir corriente de otra fuente, pero no recomiendan usar el eléctrico para pasar corriente a otro coche, por el riesgo de dañar la electrónica. Revisa el manual de tu BYD.", l: [
          "Recibir corriente: según el manual.",
          "Dar corriente: generalmente no.",
          "El arrancador portátil es la opción más segura."] }] },
    "Fase 3 — Revisar y rellenar los 4 fluidos vitales (revisión mensual)": { ic: "droplet",
      sesion: [[5, "Con el motor frío y el coche en plano, abre el cofre y ubica cada depósito con el manual."],
               [15, "Revisa los niveles que apliquen a tu coche (en el BYD: refrigerante, líquido de frenos y limpiaparabrisas) y rellena el limpiaparabrisas."],
               [5, "Anota los niveles y la fecha en tu registro del coche."]],
      sale: "Revisaste los fluidos de tu coche con el motor frío y quedó registrado.",
      subtemas: [
        { t: "El líquido de frenos absorbe agua", d: "El líquido de frenos es higroscópico: absorbe humedad del aire con el tiempo. El agua baja su punto de ebullición y puede causar pérdida de frenado en uso intenso. Por eso se cambia por tiempo (cada 2 años aprox.), aunque el nivel esté bien.", l: [
          "Cámbialo según el manual, aunque no baje.",
          "Si el nivel baja, revisa pastillas o fugas.",
          "Usa el tipo que indica el depósito (DOT 3, 4…)."] },
        { t: "El refrigerante", d: "El refrigerante es una mezcla de agua y anticongelante (glicol) con aditivos contra la corrosión. Evita que el motor —o en un eléctrico, la batería y la electrónica— se sobrecaliente. Mezclar tipos distintos puede formar sedimentos.", l: [
          "Usa el tipo y color que indica el fabricante.",
          "No mezcles tipos distintos.",
          "Nunca abras el depósito caliente."] },
        { t: "El aceite de motor", d: "En un coche de gasolina, el aceite lubrica, enfría y limpia el motor. Revisarlo en frío y en plano da la lectura correcta. Un aceite muy negro, con olor a quemado o con aspecto lechoso indica que hay que revisarlo.", l: [
          "Nivel entre las marcas mín y máx.",
          "Lechoso: posible problema de junta.",
          "Cámbialo según kilometraje y tiempo."] }] },
    "Fase 4 — Qué hacer si el auto se sobrecalienta en plena marcha": { ic: "thermometer",
      sesion: [[5, "Ubica en el tablero de tu coche el indicador o luz de temperatura y lo que dice el manual."],
               [15, "Escribe la secuencia: calefacción al máximo, orillarse, apagar, esperar 20-30 min con el cofre abierto, revisar sin abrir caliente, decidir grúa."],
               [5, "Guarda la secuencia en tu celular junto al número de asistencia."]],
      sale: "Sabes reconocer la alerta de temperatura de tu coche y la secuencia exacta para actuar.",
      copia: { t: "Si se sobrecalienta", l: [
        "1. Apagar A/C · calefacción al máximo",
        "2. Orillarse seguro · apagar",
        "3. Cofre abierto · esperar 20–30 min · NO abrir tapas calientes",
        "4. Frío: revisar nivel y fugas",
        "5. Si vuelve a subir: grúa"] },
      subtemas: [
        { t: "Por qué la calefacción ayuda", d: "La calefacción usa el refrigerante caliente del motor para calentar la cabina a través de un pequeño radiador (el núcleo de la calefacción). Encenderla al máximo saca calor del motor y le da un respiro mientras te orillas.", l: [
          "Es un radiador extra.",
          "Abre las ventanas para soportar el calor.",
          "Solo es un auxilio temporal."] },
        { t: "La junta de la cabeza", d: "La junta de culata sella el bloque del motor y la cabeza. Un sobrecalentamiento severo puede deformar la cabeza o dañar la junta, permitiendo que el refrigerante pase al aceite o a los cilindros. Es una de las reparaciones más caras.", l: [
          "Humo blanco constante por el escape: alerta.",
          "Aceite con aspecto de café con leche: alerta.",
          "Mejor grúa que reparación mayor."] },
        { t: "Térmica en un eléctrico", d: "Los eléctricos gestionan la temperatura de la batería y los motores con un sistema de refrigeración propio. Si se calienta demasiado, el coche suele limitar la potencia o la carga rápida para protegerse. Las alertas deben atenderse según el manual.", l: [
          "Si limita potencia, estaciónate y revisa.",
          "No cargues rápido con alerta de temperatura.",
          "Llama a asistencia de la marca."] }] },
    "Fase 5 — Cambiar un fusible quemado": { ic: "electric-plug",
      sesion: [[5, "Ubica las cajas de fusibles de tu coche con el manual y busca el diagrama."],
               [15, "Saca un fusible (por ejemplo, el del encendedor o la toma de 12 V) con el extractor, revísalo a la luz y vuelve a ponerlo."],
               [5, "Compra un juego de fusibles de repuesto de los amperajes de tu coche y guárdalo en la guantera."]],
      sale: "Sabes dónde están tus fusibles, cómo leerlos y tienes repuestos del amperaje correcto.",
      subtemas: [
        { t: "Para qué sirve un fusible", d: "Un fusible es un hilo calibrado que se funde cuando pasa más corriente de la que el circuito soporta. Así protege los cables de calentarse y provocar un incendio. Es el punto débil a propósito.", l: [
          "Se quema para proteger el cableado.",
          "Nunca lo sustituyas por un alambre.",
          "Mismo amperaje siempre."] },
        { t: "El código de colores", d: "Los fusibles automotrices de cuchilla siguen un código de colores estándar según su amperaje: por ejemplo, rojo 10 A, azul 15 A, amarillo 20 A. Facilita identificar el reemplazo correcto aunque el número esté borroso.", l: [
          "Rojo: 10 A · azul: 15 A · amarillo: 20 A.",
          "Confirma con el número impreso.",
          "Hay tamaños distintos: mini, estándar, maxi."] },
        { t: "Cuándo es un corto", d: "Si un fusible nuevo se quema de inmediato, hay un corto o una sobrecarga en ese circuito: un cable pelado, un accesorio defectuoso o demasiadas cosas conectadas. Seguir cambiando fusibles no lo arregla.", l: [
          "Desconecta los accesorios de ese circuito.",
          "Si sigue, a un electricista automotriz.",
          "Nunca subas el amperaje."] }] },
    "Fase 6 — Leer las luces de advertencia del tablero": { ic: "police-car-light",
      sesion: [[5, "Abre la sección de testigos del manual de tu coche."],
               [15, "Haz tarjetas con las luces principales de tu tablero: símbolo, color, significado y qué hacer (parar ya o agendar taller)."],
               [5, "Al encender el coche, observa qué luces se prenden un momento en la autoprueba."]],
      sale: "Identificas las luces de tu tablero y sabes cuáles son «parar ya» y cuáles «agendar taller».",
      copia: { t: "Luces del tablero", l: [
        "ROJO = parar seguro lo antes posible: aceite · temperatura · frenos · batería/carga",
        "ÁMBAR = seguir con cuidado y agendar: check engine fijo · presión de llantas · ABS",
        "Check engine PARPADEANDO = reducir velocidad y revisar pronto (falla grave)",
        "Eléctrico: tortuga/potencia limitada · alerta del sistema de alta tensión → asistencia"] },
      subtemas: [
        { t: "La autoprueba al encender", d: "Al encender el coche, casi todas las luces se iluminan unos segundos para comprobar que los focos funcionan. Si una luz importante no se enciende en esa prueba, podría estar fundida y no avisarte cuando haga falta.", l: [
          "Observa el tablero al encender.",
          "Las luces deben apagarse en segundos.",
          "Si una no aparece, revísala."] },
        { t: "El diagnóstico OBD-II", d: "Los coches modernos tienen un puerto OBD-II que guarda códigos de falla cuando se enciende el check engine. Un lector económico conectado por bluetooth al celular te dice el código y te ayuda a saber si es urgente.", l: [
          "Un lector OBD-II es barato.",
          "El código te orienta antes del taller.",
          "No borres códigos sin entender la causa."] },
        { t: "Luces de los eléctricos", d: "Los eléctricos tienen testigos propios: falla del sistema de alta tensión, potencia limitada (a menudo una tortuga), temperatura de la batería o fallas del sistema de carga. Conocerlos es parte de manejar tu coche.", l: [
          "Lee la sección de testigos de tu BYD.",
          "Alta tensión: no toques nada, llama a la marca.",
          "Potencia limitada: estaciónate y revisa."] }] },
    "Fase 7 — Kit de emergencia y seguridad en la carretera (constante)": { ic: "sos-button",
      sesion: [[5, "Revisa la fecha de la última revisión de tu kit."],
               [15, "Verifica fusibles, carga del arrancador, aire de la refacción, pilas de la linterna y caducidad del botiquín."],
               [5, "Agenda la próxima revisión del kit en tres meses."]],
      sale: "Tu kit está revisado y completo, y la próxima revisión está agendada.",
      subtemas: [
        { t: "Ver y ser visto", d: "La mayoría de los accidentes con un coche detenido ocurren porque los demás no lo ven a tiempo. Intermitentes, triángulos y chaleco reflejante aumentan mucho la distancia a la que te detectan, sobre todo de noche.", l: [
          "Intermitentes desde el primer síntoma.",
          "Triángulos antes de cualquier reparación.",
          "Chaleco antes de bajar."] },
        { t: "Lo que se agota sin que lo notes", d: "La refacción pierde aire poco a poco, los arrancadores se descargan, las pilas se sulfatan y los medicamentos caducan. Un kit sin revisar puede fallar justo cuando lo necesitas.", l: [
          "Revisión cada 3 meses.",
          "Cambia pilas cada año.",
          "Revisa caducidades del botiquín."] },
        { t: "Saber cuándo pedir ayuda", d: "Pedir asistencia no es fracasar: en condiciones peligrosas es la decisión correcta. Los Ángeles Verdes, servicio de asistencia en carreteras federales de México, ayudan con fallas mecánicas básicas sin costo de mano de obra.", l: [
          "Ángeles Verdes: marca el 078 en carreteras federales.",
          "Tu aseguradora: asistencia vial.",
          "Lluvia, noche o tráfico intenso: pide ayuda."] }] },
    "Lo específico de tu eléctrico": { ic: "battery",
      sesion: [[5, "Lee la sección de mantenimiento del manual de tu BYD."],
               [15, "Anota el calendario oficial: líquido de frenos, refrigerante de batería, filtro de cabina, rotación, revisión de 12 V."],
               [5, "Agenda tu próxima revisión según el kilometraje actual."]],
      sale: "Conoces el calendario oficial de tu eléctrico y la próxima revisión está agendada.",
      subtemas: [
        { t: "La batería de alta tensión", d: "La batería de tracción trabaja a cientos de voltios. Sus cables son naranjas por norma internacional para identificarlos. Solo técnicos capacitados y con equipo aislante deben manipularla.", l: [
          "Cables naranjas: no tocar.",
          "Golpe en los bajos: revisión profesional.",
          "Inundación: no lo enciendas, llama a la marca."] },
        { t: "La garantía de la batería", d: "Los fabricantes suelen dar garantías largas a la batería de tracción, por años y kilómetros, con un porcentaje mínimo de capacidad. Respetar el mantenimiento oficial ayuda a conservarla.", l: [
          "Revisa los años y kilómetros de tu garantía.",
          "Guarda comprobantes de servicio.",
          "Pregunta qué capacidad mínima garantiza."] },
        { t: "Degradación de la batería", d: "Las baterías pierden capacidad con los ciclos y los años. Los datos de flotas muestran que, con buen uso, muchas conservan una gran parte de su capacidad tras años de uso. El calor y la carga rápida frecuente la aceleran.", l: [
          "Evita dejarla al 100 % mucho tiempo (salvo indicación del fabricante).",
          "Estaciona a la sombra en calor extremo.",
          "Carga lenta cuando puedas."] }] },
    "Qué revisar y cada cuándo": { ic: "spiral-calendar",
      sesion: [[5, "Crea un registro del coche: fecha, kilometraje y servicio realizado."],
               [15, "Haz hoy la revisión de dos semanas y del mes: presión de cinco llantas, dibujo con la moneda, luces y limpiaparabrisas."],
               [5, "Programa recordatorios recurrentes para cada revisión."]],
      sale: "Tienes un registro del coche iniciado y recordatorios para cada revisión.",
      copia: { t: "Registro del coche", l: [
        "Fecha | Km | Qué se hizo | Costo | Próximo",
        "__ | __ | Presión 5 llantas | $0 | +2 semanas",
        "__ | __ | Dibujo, luces, plumillas | $0 | +1 mes",
        "__ | __ | Rotación, frenos, filtro de cabina | $__ | +10,000 km"] },
      subtemas: [
        { t: "La profundidad del dibujo", d: "El dibujo de la llanta desaloja agua. Por debajo de 1.6 mm (el mínimo legal en muchos países) el riesgo de aquaplaning sube mucho. Los testigos de desgaste en las ranuras te avisan cuando llegaste al límite.", l: [
          "Busca los testigos de desgaste en las ranuras.",
          "Prueba de la moneda para estimar.",
          "Cambia antes de llegar al mínimo en temporada de lluvias."] },
        { t: "La presión correcta", d: "La presión recomendada por el fabricante está en la etiqueta de la puerta del conductor. El número en el costado de la llanta es la presión máxima, no la recomendada. Se mide en frío.", l: [
          "Etiqueta de la puerta = presión correcta.",
          "Costado de la llanta = presión máxima.",
          "Mide antes de manejar."] },
        { t: "El historial vende", d: "Un coche con historial completo de mantenimiento se vende mejor y más rápido. Para tu plan de rentar el coche mientras estés en Alemania, el registro también ayuda a demostrar cómo lo cuidaste.", l: [
          "Guarda facturas de cada servicio.",
          "Anota kilometraje y fecha.",
          "Fotos del estado del coche antes de rentarlo."] }] },
    "Cuándo NO lo arregles tú": { ic: "stop-sign",
      sesion: [[5, "Lee la lista de reparaciones que no se hacen en la calle."],
               [15, "Busca y guarda el contacto de un taller de confianza para tu marca y de un servicio de grúa."],
               [5, "Escribe tu regla personal: si no sé volver a montarlo, no lo desarmo."]],
      sale: "Tienes taller y grúa de confianza guardados y tu regla escrita.",
      subtemas: [
        { t: "Sistemas críticos de seguridad", d: "Frenos, dirección y suspensión son sistemas donde un error puede causar un accidente grave. Requieren herramientas especiales, torque exacto y piezas específicas. Por eso se dejan a profesionales.", l: [
          "Frenos: solo taller.",
          "Dirección y suspensión: solo taller.",
          "Ruidos o vibraciones nuevas: revisión pronto."] },
        { t: "Señales de incendio", d: "Olor a quemado, a gasolina o a plástico derretido, o humo de debajo del cofre pueden indicar un incendio incipiente. Lo correcto es apagar, salir, alejarse y llamar al 911. No abras el cofre si hay humo.", l: [
          "Apaga, sal, aléjate.",
          "No abras el cofre con humo.",
          "Llama al 911."] },
        { t: "Elegir un buen taller", d: "Un buen taller explica el diagnóstico, da presupuesto por escrito antes de reparar, muestra las piezas cambiadas y da garantía. Las reseñas y la recomendación de conocidos ayudan a elegir.", l: [
          "Presupuesto por escrito.",
          "Pide ver las piezas cambiadas.",
          "Pregunta por la garantía del trabajo."] }] },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  auxilios: {
    "Lo primero de todo: la escena y el protocolo": { ic: "health-worker",
      sesion: [[5, "Escribe los cinco pasos del protocolo en una tarjeta: escena, consciencia, ayuda dirigida, respiración, actuar."],
               [15, "Ensaya en voz alta una llamada al 911 con los cuatro datos, en un caso imaginario en tu calle, usando referencias reales."],
               [5, "Guarda en el celular tus datos médicos de emergencia y los de tu familia."]],
      sale: "Dices el protocolo de memoria y tu llamada ensayada da qué pasó, dónde con referencias, cuántos y cómo están.",
      copia: { t: "Llamada al 911", l: [
        "Qué pasó: ______ (una persona no responde / sangra / se ahoga)",
        "Dónde: ______ (calle, número, entre qué calles, referencia visible)",
        "Cuántas personas y cómo están: ______",
        "Qué estoy haciendo: ______",
        "No colgar hasta que el operador lo indique"] },
      subtemas: [
        { t: "El efecto espectador", d: "John Darley y Bibb Latané mostraron que cuantas más personas presencian una emergencia, menos probable es que alguien ayude, porque la responsabilidad se diluye. Señalar a una persona concreta rompe ese efecto.", l: [
          "Señala: «tú, de camisa azul, llama al 911».",
          "Pide que regrese a confirmarte.",
          "Asigna tareas: uno llama, otro busca el DEA."] },
        { t: "Primer respondiente", d: "El primer respondiente es quien llega primero y presta ayuda inmediata hasta que llegan los servicios de emergencia. Su papel es mantener a la persona con vida y evitar daños mayores, no hacer un diagnóstico.", l: [
          "Tu objetivo: ganar tiempo.",
          "No diagnostiques; observa y reporta.",
          "Entrega la información al llegar la ambulancia."] },
        { t: "La seguridad del auxiliador", d: "En los cursos de primeros auxilios se enseña que la propia seguridad va primero: guantes si hay sangre, alejarse de tráfico, cables o fuego. Un auxiliador herido convierte una emergencia en dos.", l: [
          "Guantes de nitrilo en el botiquín.",
          "Evalúa la escena antes de acercarte.",
          "Si no es seguro, llama y espera."] }] },
    "Tu botiquín, el de casa y el del coche": { ic: "adhesive-bandage",
      sesion: [[5, "Revisa tu botiquín de casa y el del coche."],
               [15, "Compara con la lista, tira lo caducado y anota lo que falta; agrega la libreta con teléfonos y padecimientos de tu familia."],
               [5, "Busca la fecha del próximo curso de primeros auxilios de la Cruz Roja en CDMX."]],
      sale: "Tus botiquines están completos y vigentes, y sabes cuándo es el próximo curso presencial.",
      copia: { t: "Botiquín", l: [
        "Sangrado: gasas estériles · vendas elásticas · cinta · guantes de nitrilo (varios) · torniquete comercial (con capacitación)",
        "Heridas: suero fisiológico · antiséptico · curitas · tijeras · pinzas",
        "General: manta térmica · mascarilla de RCP · linterna · libreta con teléfonos y padecimientos",
        "Medicamentos: analgésico · antihistamínico · los crónicos de la casa",
        "Revisar caducidades cada 6 meses · próxima revisión: ______"] },
      subtemas: [
        { t: "El torniquete comercial", d: "Los estudios de medicina militar (como los de las guerras de Irak y Afganistán) mostraron que los torniquetes comerciales bien aplicados salvan vidas en hemorragias de extremidades. Iniciativas como Stop the Bleed enseñan su uso a civiles.", l: [
          "Compra uno de marca reconocida, no imitaciones.",
          "Aprende a ponerlo en un curso.",
          "Practica ponértelo con una mano."] },
        { t: "La manta térmica", d: "La manta térmica refleja el calor del cuerpo y ayuda a prevenir la hipotermia en una persona herida o en shock, que pierde calor rápido. Es ligera y barata, y su uso es casi universal en kits de emergencia.", l: [
          "Lado plateado hacia el cuerpo para conservar calor.",
          "Cubre también la cabeza si hace frío.",
          "Úsala aunque no haga frío en heridos graves."] },
        { t: "Datos médicos en el celular", d: "Los celulares permiten registrar datos médicos de emergencia —alergias, medicamentos, tipo de sangre, contactos— accesibles desde la pantalla bloqueada. En una emergencia, los paramédicos pueden consultarlos.", l: [
          "iPhone: app Salud > Ficha médica.",
          "Android: información de emergencia en ajustes.",
          "Incluye contactos de emergencia."] }] },
    "Fase 1 — RCP (reanimación cardiopulmonar), adulto: la maniobra que más vidas salva": { ic: "anatomical-heart",
      sesion: [[5, "Pon «Stayin' Alive» o un metrónomo a 110 por minuto."],
               [15, "Sobre un cojín firme o un maniquí (nunca sobre una persona), practica la postura —manos al centro del pecho, brazos rectos, hombros arriba— y cinco series de 30 compresiones al ritmo."],
               [5, "Ensaya en voz alta la secuencia completa: comprobar, pedir ayuda y DEA, comprimir, no parar."]],
      sale: "Haces 30 compresiones al ritmo correcto con los brazos rectos y dices la secuencia completa sin dudar.",
      copia: { t: "RCP adulto", l: [
        "1. ¿Responde? ¿Respira normal? (10 s; jadeos no cuentan)",
        "2. «Tú: llama al 911 y trae un DEA»",
        "3. Manos al centro del pecho · brazos rectos",
        "4. 100–120 por minuto · 5–6 cm · dejar subir el pecho",
        "5. 30:2 si sabes ventilar · si no, solo compresiones",
        "6. DEA: encender y seguir la voz · no parar hasta relevo"] },
      subtemas: [
        { t: "La cadena de supervivencia", d: "La American Heart Association describe la cadena de supervivencia del paro cardiaco fuera del hospital: reconocer y llamar, RCP temprana, desfibrilación rápida, atención avanzada y recuperación. Los primeros eslabones dependen de quien esté cerca.", l: [
          "Cada minuto sin RCP baja mucho la supervivencia.",
          "La RCP del testigo puede duplicar o triplicar las probabilidades.",
          "El DEA temprano es clave."] },
        { t: "RCP solo con las manos", d: "Para testigos sin entrenamiento o que no quieren dar respiraciones, la AHA recomienda RCP solo con compresiones en adultos que colapsan de repente. Es fácil de recordar y mucho mejor que no hacer nada.", l: [
          "Si no sabes ventilar, solo comprime.",
          "Sin pausas largas.",
          "En niños y ahogados, las respiraciones son más importantes."] },
        { t: "Cómo funciona un DEA", d: "El desfibrilador externo automático analiza el ritmo del corazón y solo da una descarga si detecta un ritmo desfibrilable, como la fibrilación ventricular. Da instrucciones de voz y está diseñado para que lo use cualquier persona.", l: [
          "Enciéndelo y sigue la voz.",
          "Pecho descubierto y seco para los parches.",
          "Nadie toca a la persona durante el análisis y la descarga."] }] },
    "Fase 2 — Atragantamiento (maniobra de Heimlich): consciente, tú mismo solo, y bebés": { ic: "face-with-open-mouth",
      sesion: [[5, "Repasa las señales: no puede hablar, toser ni respirar, manos al cuello."],
               [15, "Con un compañero, sin aplicar fuerza, practica la posición: detrás, pie entre los suyos, puño arriba del ombligo; luego ubica en ti el punto del auto-Heimlich y una silla para apoyarte."],
               [5, "Ve un video oficial (Cruz Roja) de la técnica en bebés y repasa sus diferencias."]],
      sale: "Sabes reconocer un atragantamiento real, la posición correcta en adultos, la versión para ti solo y la de bebés.",
      subtemas: [
        { t: "Obstrucción parcial y total", d: "En una obstrucción parcial, la persona puede toser y algo de aire pasa: la tos es el mejor mecanismo para expulsar el objeto. En una obstrucción total no hay tos eficaz ni voz: ahí se interviene de inmediato.", l: [
          "Tose fuerte: anímalo a seguir tosiendo.",
          "No tose ni habla: actúa.",
          "Si se debilita la tos, pasa a la maniobra."] },
        { t: "Golpes en la espalda y compresiones", d: "Algunas guías, como las europeas y de la Cruz Roja, recomiendan alternar 5 golpes en la espalda y 5 compresiones abdominales en adultos; la AHA enfatiza las compresiones. En cualquier caso, se actúa rápido y se llama al 911.", l: [
          "5 golpes entre los omóplatos, inclinando a la persona.",
          "5 compresiones abdominales.",
          "Alterna hasta que salga o pierda el conocimiento."] },
        { t: "Después del atragantamiento", d: "Las compresiones abdominales pueden causar lesiones internas. Por eso se recomienda que la persona sea revisada por un médico aunque se recupere por completo después de la maniobra.", l: [
          "Revisión médica después de la maniobra.",
          "Vigila dolor abdominal o tos persistente.",
          "En bebés, siempre a revisión."] }] },
    "Fase 3 — Hemorragias graves: control de sangrado que no para": { ic: "drop-of-blood",
      sesion: [[5, "Prepara una toalla, una venda elástica y, si tienes, un torniquete comercial."],
               [15, "Practica en tu propio muslo (sin apretar fuerte) la presión directa con la toalla y el vendaje compresivo; si tienes torniquete, practica colocarlo flojo en el brazo de un compañero siguiendo sus instrucciones, sin apretar."],
               [5, "Busca un curso de «Stop the Bleed» o de control de hemorragias cerca de ti."]],
      sale: "Sabes aplicar presión directa, agregar capas sin quitar la primera y dónde se coloca un torniquete.",
      subtemas: [
        { t: "Cuánta sangre se puede perder", d: "Un adulto tiene alrededor de 5 litros de sangre. Perder más de un tercio de forma rápida puede ser mortal. Una arteria grande puede sangrar ese volumen en pocos minutos, por eso el control del sangrado es una prioridad inmediata.", l: [
          "Sangre a chorros o que empapa rápido: grave.",
          "Actúa antes de buscar el botiquín perfecto.",
          "Usa lo que tengas: playera, toalla."] },
        { t: "El empaquetamiento de heridas", d: "En heridas profundas donde no se puede poner torniquete (axila, ingle, cuello), los cursos de control de hemorragias enseñan a rellenar la herida con gasa o tela y presionar con fuerza durante varios minutos. Se aprende en práctica supervisada.", l: [
          "Para zonas sin torniquete.",
          "Rellenar y presionar firme.",
          "Aprende la técnica en un curso."] },
        { t: "El shock hemorrágico", d: "Con pérdida importante de sangre, el cuerpo entra en shock: piel pálida, fría y sudorosa, pulso rápido, respiración acelerada, confusión. Mantener a la persona acostada, abrigada y tranquila mientras llega ayuda es parte del tratamiento.", l: [
          "Acuéstala y abrígala.",
          "No le des de comer ni de beber.",
          "Háblale para vigilar su consciencia."] }] },
    "Fase 4 — Quemaduras: el tratamiento correcto según el grado": { ic: "fire",
      sesion: [[5, "Haz una tabla con los tres grados: cómo se ven, qué hacer y cuándo llamar al 911."],
               [15, "Revisa tu cocina: dónde está el agua corriente más cercana, si tienes gasas limpias y qué remedios caseros tienes que no debes usar."],
               [5, "Guarda el número del centro de toxicología o de emergencias para quemaduras químicas."]],
      sale: "Distingues los tres grados y sabes qué hacer en cada uno sin remedios caseros.",
      copia: { t: "Quemaduras", l: [
        "1er grado (rojo, sin ampollas): agua fría corriente 10–20 min · hidratante",
        "2do grado (ampollas): agua fría 20 min · gasa limpia sin apretar · no reventar · médico si es grande o en cara, manos, genitales",
        "3er grado (blanca/carbonizada, puede no doler): 911 · tela limpia · no agua ni hielo",
        "Química: quitar ropa · agua abundante 20+ min · toxicología",
        "Nunca: pasta de dientes, mantequilla, aceite, hielo directo"] },
      subtemas: [
        { t: "Por qué el agua fría y no el hielo", d: "El agua fría corriente detiene el daño que el calor sigue causando en la piel y reduce el dolor y la profundidad de la quemadura. El hielo directo puede provocar lesión por frío en un tejido ya dañado.", l: [
          "Agua fresca, no helada.",
          "20 minutos completos, aunque parezca mucho.",
          "Útil incluso hasta 3 horas después."] },
        { t: "La regla del 9 y la palma", d: "Para estimar la superficie quemada se usa la palma de la mano de la persona (aproximadamente 1 % de su superficie corporal) o la regla de los 9 en adultos. Quemaduras extensas requieren atención urgente por riesgo de shock.", l: [
          "Palma de la persona ≈ 1 %.",
          "Más de unas pocas palmas en segundo grado: médico.",
          "Cara, manos, genitales o articulaciones: siempre médico."] },
        { t: "Quemaduras eléctricas", d: "Las quemaduras eléctricas pueden verse pequeñas por fuera y causar daño interno grave, incluidas alteraciones del ritmo cardiaco. Antes de tocar a la persona, hay que cortar la corriente. Siempre requieren valoración médica.", l: [
          "Primero corta la corriente.",
          "No toques a la persona si sigue conectada.",
          "Siempre al médico, aunque se vea leve."] }] },
    "Fase 5 — Convulsiones: qué hacer durante y qué hacer justo después": { ic: "stopwatch",
      sesion: [[5, "Escribe qué hacer durante y después de una convulsión, y los criterios para llamar al 911."],
               [15, "Practica la posición de recuperación con un compañero o familiar (con su permiso), varias veces, hasta que salga fluida."],
               [5, "Explica a alguien de tu casa por qué no se mete nada en la boca."]],
      sale: "Pones a alguien en posición de recuperación con fluidez y sabes cuándo una convulsión es emergencia.",
      copia: { t: "Convulsión", l: [
        "Durante: cronometrar · despejar · algo suave bajo la cabeza · no sujetar · nada en la boca",
        "Después: posición de recuperación · quedarse a su lado · hablarle con calma",
        "911 si: más de 5 min · primera vez · se repite sin despertar · se lastimó · embarazada · no despierta"] },
      subtemas: [
        { t: "Qué es una crisis convulsiva", d: "Una convulsión es una descarga eléctrica anormal en el cerebro. Puede deberse a epilepsia, fiebre alta en niños, hipoglucemia, abstinencia de alcohol, golpes en la cabeza, entre otras causas. La mayoría se detienen solas.", l: [
          "No todas son epilepsia.",
          "La mayoría duran pocos minutos.",
          "El periodo de confusión después es normal."] },
        { t: "El estado epiléptico", d: "Una convulsión que dura más de 5 minutos, o crisis repetidas sin recuperar la conciencia, se considera estado epiléptico: una emergencia médica que puede dañar el cerebro. Por eso es tan importante cronometrar.", l: [
          "Cronometra desde el inicio.",
          "Más de 5 minutos: 911.",
          "Informa la duración a los paramédicos."] },
        { t: "Después: confusión y cansancio", d: "Tras una convulsión, la persona suele estar confundida, somnolienta o avergonzada durante un rato (fase poscrítica). Tranquilizarla, proteger su privacidad y no darle de comer ni beber hasta que esté totalmente consciente ayuda.", l: [
          "Háblale con calma y explícale qué pasó.",
          "Protege su privacidad.",
          "Nada de comida o bebida hasta que esté alerta."] }] },
    "Fase 6 — Reacción alérgica severa (anafilaxia): puede matar en minutos": { ic: "syringe",
      sesion: [[5, "Escribe las señales de alarma de anafilaxia."],
               [15, "Ve un video oficial del fabricante sobre el uso del autoinyector (o practica con un entrenador sin aguja si alguien de tu entorno tiene uno)."],
               [5, "Pregunta en tu familia y tu trabajo si alguien tiene alergias graves y dónde guarda su autoinyector."]],
      sale: "Reconoces las señales de anafilaxia, sabes usar un autoinyector y conoces las alergias graves de tu entorno.",
      subtemas: [
        { t: "Qué hace la epinefrina", d: "La epinefrina (adrenalina) contrae los vasos sanguíneos, sube la presión, relaja los músculos de las vías respiratorias y reduce la hinchazón. Es el único tratamiento de primera línea para la anafilaxia; los antihistamínicos son complementarios y más lentos.", l: [
          "Primero epinefrina, no antihistamínico.",
          "En el muslo, parte externa.",
          "Siempre llamar al 911 después."] },
        { t: "Desencadenantes frecuentes", d: "Las causas más comunes de anafilaxia son alimentos (cacahuates, nueces, mariscos, huevo, leche), picaduras de insectos (abejas, avispas), medicamentos (como algunos antibióticos y antiinflamatorios) y látex.", l: [
          "Alimentos, picaduras, medicamentos, látex.",
          "Puede aparecer aunque antes no hubiera reacción grave.",
          "Pregunta por alergias al cocinar para otros."] },
        { t: "La reacción bifásica", d: "En algunas personas, los síntomas regresan horas después de mejorar, sin nueva exposición: es la reacción bifásica. Por eso, aunque mejore con la epinefrina, la persona debe ser observada en un hospital.", l: [
          "Mejorar no significa estar a salvo.",
          "Observación hospitalaria tras anafilaxia.",
          "Ten un segundo autoinyector si fue recetado."] }] },
    "Fase 7 — Heridas menores, desmayo, y cuándo esto no basta (constante)": { ic: "face-with-head-bandage",
      sesion: [[5, "Escribe la lista de cuándo llamar al 911 sin dudar."],
               [15, "Practica con un compañero levantar las piernas para un desmayo y la posición de recuperación; aprende la prueba de derrame cerebral (cara, brazos, habla, tiempo)."],
               [5, "Revisa que en tu botiquín haya lo necesario para curar una cortada."]],
      sale: "Sabes curar una cortada, atender un desmayo y reconocer un derrame cerebral con la prueba rápida.",
      copia: { t: "Señales de derrame: RÁPIDO", l: [
        "Rostro: ¿un lado de la cara cae al sonreír?",
        "Brazo: ¿un brazo se cae al levantar ambos?",
        "Palabras: ¿habla arrastrada o extraña?",
        "Tiempo: llama al 911 ya y anota la hora de inicio"] },
      subtemas: [
        { t: "El derrame cerebral es contra reloj", d: "En un infarto cerebral, cada minuto sin tratamiento se pierden millones de neuronas. Algunos tratamientos solo funcionan en las primeras horas. Por eso reconocerlo y llamar de inmediato cambia el resultado.", l: [
          "Llama al 911, no lleves tú a la persona si puedes evitarlo.",
          "Anota la hora en que empezaron los síntomas.",
          "No le des aspirina ni comida."] },
        { t: "Revisión del método RICE", d: "El método RICE (reposo, hielo, compresión, elevación) sigue siendo una guía útil en las primeras horas de un esguince, aunque las recomendaciones actuales favorecen volver al movimiento suave pronto y evitar el reposo prolongado.", l: [
          "Hielo envuelto, nunca directo, 15–20 min.",
          "Compresión sin cortar la circulación.",
          "Movimiento suave en cuanto el dolor lo permita."] },
        { t: "Cuándo una herida necesita puntos", d: "Una herida suele necesitar valoración para puntos si es profunda, abierta (no se juntan los bordes), en la cara o en articulaciones, si sigue sangrando tras presión o si fue con un objeto sucio. Lo ideal es atenderla en las primeras horas.", l: [
          "Bordes separados o profunda: médico.",
          "Objeto sucio u oxidado: pregunta por el tétanos.",
          "Lava con agua abundante antes de cubrir."] }] },
    "Lo legal en México y el miedo a ayudar": { ic: "balance-scale",
      sesion: [[5, "Escribe las cuatro reglas: pedir consentimiento, no exceder tu capacitación, quedarte y entregar información."],
               [15, "Ensaya la frase de consentimiento y lo que dirías a los paramédicos al llegar."],
               [5, "Anota en una frase por qué no hacer nada es el mayor riesgo."]],
      sale: "Sabes pedir consentimiento, qué no hacer y cómo entregar a la persona a los paramédicos.",
      copia: { t: "Al llegar la ambulancia", l: [
        "Encontré a la persona a las ______ en ______.",
        "Estaba: consciente / inconsciente · respiraba / no respiraba",
        "Hice: ______ (RCP desde las ___, DEA ___ descargas, presión en ______)",
        "Sé que: alergias / medicamentos / lo que pasó: ______"] },
      subtemas: [
        { t: "La omisión de auxilio", d: "Varios códigos penales en México sancionan la omisión de auxilio: no ayudar ni pedir ayuda a una persona en peligro cuando se puede hacer sin riesgo propio. Llamar al 911 ya cumple con el deber mínimo.", l: [
          "Como mínimo, llama al 911.",
          "No estás obligado a ponerte en riesgo.",
          "Ayudar de buena fe es lo esperado."] },
        { t: "El consentimiento", d: "Con una persona consciente, se pide permiso antes de tocarla. Si la persona se niega, se respeta, se llama al 911 y se espera cerca. Con una persona inconsciente, se presume que aceptaría ayuda.", l: [
          "«Sé primeros auxilios, ¿puedo ayudarte?».",
          "Si dice que no, respeta y llama.",
          "Con menores, pide permiso a su adulto si está."] },
        { t: "Hacer lo que sabes", d: "El riesgo legal y médico aparece al hacer de más: medicar, mover a alguien con posible lesión de columna o hacer maniobras sin entrenamiento. Mantenerte en lo que aprendiste protege a la persona y a ti.", l: [
          "No des medicamentos que no son de la persona.",
          "No muevas a alguien con posible lesión de columna salvo peligro.",
          "Si no sabes, llama y acompaña."] }] },
    "Practicarlo de verdad": { ic: "graduation-cap",
      sesion: [[5, "Busca e inscríbete en el próximo curso presencial de primeros auxilios y RCP de la Cruz Roja o un centro certificado."],
               [15, "Ubica los DEA de los lugares donde pasas tiempo: trabajo, gym, centros comerciales, metro; anótalos."],
               [5, "Agenda enseñar lo básico a tu familia: llamada al 911 y RCP con las manos."]],
      sale: "Estás inscrito en un curso presencial, sabes dónde están los DEA cercanos y agendaste enseñar a tu familia.",
      subtemas: [
        { t: "La habilidad se olvida rápido", d: "Estudios sobre retención de habilidades de RCP muestran que la calidad de las compresiones baja en pocos meses sin práctica. Por eso se recomiendan recertificaciones periódicas y prácticas cortas frecuentes.", l: [
          "Recertifícate cada 2 años o antes.",
          "Practica con maniquí cuando puedas.",
          "Repasa el ritmo con la canción."] },
        { t: "Cursos certificados en México", d: "La Cruz Roja Mexicana ofrece cursos de primeros auxilios abiertos al público. Otras instituciones ofrecen cursos con aval internacional (como los de la AHA). Busca uno con práctica en maniquí y DEA de entrenamiento.", l: [
          "Cruz Roja Mexicana: cursos abiertos.",
          "Busca práctica con maniquí y DEA.",
          "Pide constancia para tu CV."] },
        { t: "Primeros auxilios en Alemania", d: "En Alemania, para obtener la licencia de manejo se exige un curso de primeros auxilios (Erste-Hilfe-Kurs) y la ley obliga a prestar auxilio razonable en una emergencia. El número de emergencias allá es el 112.", l: [
          "Emergencias en Alemania y la UE: 112.",
          "Para la licencia alemana se pide curso de primeros auxilios.",
          "Tu curso en México te prepara para el de allá."] }] },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  brujula: {
    "Por qué sigue valiendo la pena": { ic: "compass",
      sesion: [[5, "Sin ver el celular, señala dónde está el norte desde tu casa y anota cómo lo dedujiste."],
               [15, "Compruébalo con la brújula del celular y anota qué ventanas de tu casa dan a cada punto cardinal."],
               [5, "Escribe tres situaciones donde una brújula te sirve en la ciudad."]],
      sale: "Sabes hacia dónde está el norte en tu casa sin ver el celular y para qué te sirve en la ciudad.",
      subtemas: [
        { t: "El GPS y sus límites", d: "El GPS necesita ver varios satélites para calcular tu posición. En cañones, bosques densos o entre edificios altos la señal se degrada, y el celular puede quedarse sin batería o sin mapas descargados. Por eso los expertos llevan respaldo analógico.", l: [
          "Descarga mapas sin conexión antes de salir.",
          "El modo avión ahorra batería y el GPS sigue funcionando.",
          "Lleva brújula y mapa como respaldo."] },
        { t: "La orientación y el cerebro", d: "Estudios en taxistas de Londres (Eleanor Maguire) encontraron que memorizar la ciudad se asoció con cambios en el hipocampo, región ligada a la navegación espacial. Usar solo el GPS reduce la práctica de construir mapas mentales.", l: [
          "Navegar sin GPS entrena la memoria espacial.",
          "Intenta llegar a lugares conocidos sin GPS.",
          "Observa referencias: edificios, cerros, avenidas."] },
        { t: "Orientación para buscar departamento", d: "La orientación de una vivienda cambia la luz y la temperatura. En el hemisferio norte, las ventanas al sur reciben más sol en invierno, algo muy apreciado en Alemania, donde los inviernos son oscuros y fríos.", l: [
          "Sur: más sol en invierno.",
          "Norte: luz pareja y fresca.",
          "En Alemania, pregunta la orientación (Ausrichtung)."] }] },
    "Las partes de la brújula": { ic: "compass",
      sesion: [[5, "Consigue una brújula de placa base (o usa una imagen detallada si aún no la tienes)."],
               [10, "Señala y nombra cada parte: placa, flecha de viaje, limbo, aguja, flecha de orientación (el establo)."],
               [5, "Gira el limbo y practica «el rojo en el establo» apuntando a distintos objetos."]],
      sale: "Nombras todas las partes y pones el rojo en el establo sin dudar.",
      subtemas: [
        { t: "Cómo funciona la aguja", d: "La aguja es un pequeño imán que se alinea con el campo magnético de la Tierra. Flota en un líquido que amortigua las oscilaciones, por eso se estabiliza rápido. Su extremo rojo apunta al norte magnético.", l: [
          "El líquido amortigua la aguja.",
          "Una burbuja grande puede afectar la lectura.",
          "Mantén la brújula horizontal."] },
        { t: "Brújulas con espejo", d: "Las brújulas con espejo permiten ver la aguja y el objetivo al mismo tiempo, lo que mejora la precisión al tomar rumbos. Las usan militares y navegantes. Para empezar basta una de placa base.", l: [
          "Más precisas al tomar rumbos.",
          "Más caras y pesadas.",
          "Útiles para distancias largas."] },
        { t: "Grados y otras unidades", d: "La mayoría de las brújulas usan 360 grados. Algunas militares usan milésimas (6400 por vuelta) para mayor precisión. Asegúrate de que tu brújula y tu mapa usen la misma unidad.", l: [
          "Civil: grados (0 a 360).",
          "Militar: milésimas.",
          "Norte 0°, este 90°, sur 180°, oeste 270°."] }] },
    "Los tres nortes": { ic: "globe-showing-americas",
      sesion: [[5, "Busca la declinación magnética actual de CDMX en la calculadora en línea de la NOAA."],
               [15, "Calcula cuántos metros te desvías en 1, 5 y 10 km si ignoras esa declinación (unos 17 m por grado por km)."],
               [5, "Si tu brújula tiene ajuste de declinación, configúralo."]],
      sale: "Conoces la declinación de CDMX, cuánto error acumula y tu brújula está ajustada si lo permite.",
      subtemas: [
        { t: "El polo magnético se mueve", d: "El norte magnético se desplaza porque el campo magnético terrestre se genera por el movimiento del hierro líquido en el núcleo. En las últimas décadas se movió decenas de kilómetros por año. Por eso los mapas indican la fecha de la declinación.", l: [
          "La declinación cambia con los años.",
          "Usa el dato más reciente.",
          "La NOAA tiene una calculadora gratuita."] },
        { t: "Declinación este y oeste", d: "Si el norte magnético está al este del verdadero, la declinación es este; si está al oeste, es oeste. La regla para pasar de rumbo de mapa a rumbo de brújula depende del signo; con el ajuste de la brújula te olvidas del cálculo.", l: [
          "Declinación oeste en el centro de México.",
          "Ajusta la brújula una vez y listo.",
          "Sin ajuste, suma o resta según el signo."] },
        { t: "Error angular y distancia", d: "Un error de un grado produce aproximadamente 17 metros de desviación por cada kilómetro. Parece poco, pero se acumula: en 10 km, 5 grados son casi un kilómetro. En terreno abierto quizá lo corrijas; en un bosque, no.", l: [
          "1° ≈ 17 m por km.",
          "Los errores se acumulan con la distancia.",
          "Por eso se usan puntos intermedios."] }] },
    "Tomar un rumbo hacia algo que ves": { ic: "bullseye",
      sesion: [[5, "En un parque, elige un objetivo visible a unos 200 metros."],
               [15, "Toma el rumbo con los cuatro pasos y camina usando puntos intermedios, sin mirar la brújula todo el tiempo."],
               [5, "Comprueba con el GPS qué tan cerca llegaste y anota el error."]],
      sale: "Llegaste al objetivo usando puntos intermedios y sabes tu margen de error.",
      subtemas: [
        { t: "Caminar en círculos", d: "Un estudio de Jan Souman y colegas mostró que, sin referencias visibles (en bosques o desiertos nublados), las personas caminan en círculos aunque crean ir recto. Por eso se usan puntos intermedios y la brújula.", l: [
          "Sin referencias, nadie camina recto.",
          "Elige un punto visible en tu rumbo.",
          "Repite al llegar a cada punto."] },
        { t: "Precisión al tomar el rumbo", d: "Para tomar un rumbo preciso, sostén la brújula plana a la altura del pecho, con los codos pegados al cuerpo, y gira todo el cuerpo hacia el objetivo, no solo los brazos.", l: [
          "Brújula plana y estable.",
          "Gira con todo el cuerpo.",
          "Toma el rumbo dos veces para confirmar."] },
        { t: "Rumbo con poca visibilidad", d: "Con niebla o de noche, los puntos intermedios están más cerca. En grupo, se puede mandar a una persona adelante como referencia y guiarla con la brújula hasta que quede en el rumbo.", l: [
          "Puntos intermedios más cercanos.",
          "Una persona como referencia móvil.",
          "Cuenta pasos para controlar la distancia."] }] },
    "El rumbo inverso: volver por donde viniste": { ic: "counterclockwise-arrows-button",
      sesion: [[5, "Toma un rumbo hacia un punto y anótalo."],
               [15, "Camina hasta él, calcula de memoria el rumbo inverso y regresa siguiéndolo."],
               [5, "Comprueba qué tan cerca quedaste de tu punto de partida."]],
      sale: "Calculaste el rumbo inverso sin dudar y regresaste cerca de tu punto de partida.",
      subtemas: [
        { t: "El truco de la brújula", d: "Sin hacer cuentas: mantén el limbo como está y pon el extremo blanco (sur) de la aguja en el establo. La flecha de viaje te marca el camino de regreso. Útil si estás cansado y no quieres calcular.", l: [
          "No muevas el limbo.",
          "Pon el extremo blanco en el establo.",
          "Sigue la flecha de viaje."] },
        { t: "Anotar rumbos y tiempos", d: "Anotar en cada tramo el rumbo, el tiempo caminado o los pasos te permite reconstruir el camino de regreso, aunque no sea en línea recta. Es la navegación por estima que usaban los marinos.", l: [
          "Rumbo y tiempo de cada tramo.",
          "Foto del mapa con tus notas.",
          "Revisa antes de regresar."] },
        { t: "Mirar atrás", d: "Los caminos se ven distintos de regreso. Los montañistas recomiendan voltear de vez en cuando al avanzar para memorizar cómo se verá el camino al volver, sobre todo en bifurcaciones.", l: [
          "Voltea en cada cruce importante.",
          "Memoriza referencias del regreso.",
          "Toma una foto de las bifurcaciones."] }] },
    "Orientar el mapa": { ic: "world-map",
      sesion: [[5, "Imprime o abre un mapa de un parque o zona que conozcas."],
               [15, "Oriéntalo con la brújula: borde alineado con el norte del mapa, gira juntos hasta que la aguja apunte al norte; identifica tres elementos del terreno en el mapa."],
               [5, "Gira el mapa al revés y nota cómo pierde sentido: vuelve a orientarlo."]],
      sale: "Orientaste un mapa y relacionaste tres elementos del terreno con el papel.",
      subtemas: [
        { t: "Mapa orientado contra norte arriba", d: "En el celular, el mapa suele girar con tu dirección; en papel hay que girarlo tú. Tener el mapa orientado reduce el esfuerzo mental de traducir izquierda y derecha, sobre todo bajo estrés.", l: [
          "Gira el mapa, no tu cabeza.",
          "Mantén el mapa orientado mientras caminas.",
          "Úsalo igual con el mapa del celular en modo «brújula»."] },
        { t: "Orientar sin brújula", d: "Puedes orientar el mapa con el terreno: alinea dos elementos que veas (un camino recto, una cresta) con su dibujo en el mapa. Funciona bien cuando hay referencias claras.", l: [
          "Busca un elemento lineal: camino, río.",
          "Gira el mapa hasta que coincida.",
          "Confirma con un segundo elemento."] },
        { t: "Pulgar en el mapa", d: "Los orientadores practican «pulgar en el mapa»: llevar el pulgar sobre tu posición actual y moverlo conforme avanzas. Así, al mirar el mapa, sabes de inmediato dónde estás.", l: [
          "Dobla el mapa para que se vea tu zona.",
          "Pulgar sobre tu posición.",
          "Muévelo conforme avanzas."] }] },
    "Triangulación: saber dónde estás": { ic: "triangular-ruler",
      sesion: [[5, "En un lugar alto donde sepas tu ubicación, identifica dos o tres referencias que aparezcan en el mapa."],
               [20, "Toma el rumbo a cada una, calcula los rumbos inversos y trázalos en el mapa desde cada referencia."],
               [5, "Compara el cruce con tu ubicación real y mide el error."]],
      sale: "Tu triangulación cae a poca distancia de tu ubicación real.",
      subtemas: [
        { t: "Elegir buenas referencias", d: "Las mejores referencias para triangular están separadas entre 60 y 120 grados entre sí. Si están casi en la misma dirección, las líneas se cruzan en ángulo muy cerrado y un pequeño error se vuelve grande.", l: [
          "Referencias separadas, idealmente cerca de 90°.",
          "Elige puntos inconfundibles.",
          "Tres referencias dan un triángulo de error."] },
        { t: "Resección con una sola línea", d: "Si sabes que estás sobre un elemento lineal —un camino, un río, una cresta—, basta una referencia: traza su rumbo inverso y donde cruce el camino, ahí estás.", l: [
          "Úsala si estás sobre un camino o río.",
          "Una sola referencia basta.",
          "Más rápida que la triangulación completa."] },
        { t: "Corregir por declinación", d: "Al trasladar rumbos de brújula al mapa, hay que corregir la declinación o usar una brújula ajustada. Olvidarlo es la causa más común de triangulaciones que no cuadran.", l: [
          "Brújula ajustada o corrige a mano.",
          "Revisa si el mapa usa norte verdadero o de cuadrícula.",
          "Practica con ubicaciones conocidas."] }] },
    "Orientarte sin brújula": { ic: "sun",
      sesion: [[5, "Al mediodía, sal al sol y observa hacia dónde apunta tu sombra."],
               [10, "Prueba el método del reloj y compáralo con la brújula del celular."],
               [10, "Una noche despejada, busca la Osa Mayor y localiza la estrella Polar."]],
      sale: "Encontraste el norte con tu sombra, con el reloj y con la estrella Polar, y comprobaste cada uno.",
      subtemas: [
        { t: "El método de la sombra y el palo", d: "Clava un palo vertical, marca la punta de su sombra, espera 15 minutos y marca de nuevo. La línea entre la primera y la segunda marca va aproximadamente de oeste a este, porque el sol avanza de este a oeste.", l: [
          "Primera marca: oeste.",
          "Segunda marca: este.",
          "Funciona mejor cerca del mediodía."] },
        { t: "La estrella Polar", d: "Polaris está casi alineada con el eje de rotación de la Tierra, por eso parece quieta mientras el cielo gira. Su altura sobre el horizonte es aproximadamente tu latitud: en CDMX, unos 19 grados.", l: [
          "Busca la Osa Mayor (el Carro).",
          "Prolonga cinco veces la distancia de las dos estrellas del borde.",
          "En CDMX está baja, a unos 19°."] },
        { t: "El sol en el trópico", d: "La Ciudad de México está cerca del trópico de Cáncer. Entre mayo y julio, el sol al mediodía puede estar casi en la vertical o incluso ligeramente al norte, por lo que el método de la sombra es menos fiable esos meses.", l: [
          "En verano, el sol pasa casi por encima.",
          "Úsalo con cuidado de mayo a julio.",
          "En Alemania el sol siempre va al sur al mediodía."] }] },
    "Si te pierdes de verdad": { ic: "sos-button",
      sesion: [[5, "Escribe el protocolo STOP y la regla de avisar a dónde vas."],
               [15, "Crea una plantilla de aviso para tus salidas al monte: ruta, hora de regreso, contacto, qué hacer si no regresas."],
               [5, "Mete en tu mochila de excursión un silbato, linterna y una manta térmica."]],
      sale: "Tienes el protocolo STOP memorizado, una plantilla de aviso y lo básico en tu mochila.",
      copia: { t: "Aviso antes de salir", l: [
        "Voy a: ______ (ruta y lugar de inicio)",
        "Con: ______",
        "Salgo a las ______ · regreso a las ______",
        "Si a las ______ no te escribo: llama a ______ y al 911",
        "Coche: ______ (placas) estacionado en ______"] },
      subtemas: [
        { t: "Por qué quedarte quieto", d: "Los equipos de búsqueda y rescate encuentran más rápido a quien se queda en un lugar. Robert Koester, en sus estudios del comportamiento de personas perdidas, documentó que muchos se alejan cada vez más del área de búsqueda al seguir caminando.", l: [
          "Si no tienes plan, quédate.",
          "Hazte visible: ropa de color, señales.",
          "Conserva energía y calor."] },
        { t: "Señales de auxilio", d: "Tres señales de cualquier tipo —tres pitidos, tres destellos, tres fogatas en triángulo— son la señal internacional de auxilio. Un silbato se oye mucho más lejos que la voz y no se agota.", l: [
          "Tres pitidos, pausa, repetir.",
          "Espejo o pantalla del celular para destellos.",
          "Algo de color brillante extendido en un claro."] },
        { t: "Ahorro de batería en emergencia", d: "En una emergencia, el celular es tu línea de rescate. Modo avión salvo para llamar o enviar ubicación, brillo al mínimo y apagar lo innecesario alarga la batería. Un mensaje de texto a veces sale cuando una llamada no.", l: [
          "Modo avión y brillo mínimo.",
          "Comparte ubicación en cuanto tengas señal.",
          "El 911 funciona aunque no tengas saldo."] }] },
    "Practicarlo en la ciudad y en el monte": { ic: "mountain",
      sesion: [[5, "Elige un parque grande de CDMX para tu primera práctica."],
               [25, "Calibra tu paso: cuenta los pasos dobles en 100 metros; luego toma un rumbo y camina 200 pasos siguiéndolo."],
               [5, "Comprueba con el GPS y anota tu calibración de pasos."]],
      sale: "Sabes cuántos pasos dobles das en 100 metros y caminaste un rumbo con el celular guardado.",
      subtemas: [
        { t: "El paso doble", d: "Los navegantes cuentan pasos dobles (cada vez que el mismo pie toca el suelo) porque es más fácil llevar la cuenta. La longitud del paso cambia con la pendiente, el terreno y el cansancio: cuesta arriba das más pasos.", l: [
          "Calibra en terreno plano.",
          "Recalibra en pendiente.",
          "Usa cuentas o nudos en un cordón para llevar centenas."] },
        { t: "La orientación como deporte", d: "La orientación (carrera de orientación) es un deporte donde se recorre un circuito con mapa y brújula buscando balizas. Hay clubes y eventos en México y es muy popular en Europa, incluida Alemania.", l: [
          "Busca un club de orientación cerca de CDMX.",
          "Empieza por recorridos cortos.",
          "En Alemania hay eventos muy frecuentes."] },
        { t: "Lugares para practicar cerca de CDMX", d: "El Desierto de los Leones, el Ajusco y el Nevado de Toluca tienen senderos y referencias claras (cerros, antenas, valles). Ve acompañado, con ropa adecuada, agua y avisando tu ruta. En el Nevado, la altura y el frío exigen preparación.", l: [
          "Empieza por rutas marcadas.",
          "Lleva agua, abrigo y protección solar.",
          "En altura, sube despacio."] }] },
    "Leer un mapa topográfico": { ic: "snow-capped-mountain",
      sesion: [[5, "Descarga del INEGI un mapa topográfico de una zona que conozcas, como el Ajusco."],
               [15, "Identifica curvas de nivel juntas y separadas, una barranca (V hacia arriba) y una loma; mide una distancia con la escala."],
               [5, "Calcula el desnivel de una ruta contando curvas y multiplicando por la equidistancia."]],
      sale: "Lees relieve, escala y desnivel en un mapa topográfico real.",
      subtemas: [
        { t: "La equidistancia", d: "La equidistancia es la diferencia de altura entre dos curvas de nivel consecutivas, por ejemplo 10 o 20 metros. Viene en la leyenda del mapa. Contar curvas y multiplicar por la equidistancia da el desnivel.", l: [
          "Busca la equidistancia en la leyenda.",
          "Las curvas gruesas (maestras) facilitan contar.",
          "Desnivel = curvas × equidistancia."] },
        { t: "La regla de Naismith", d: "William Naismith propuso en 1892 una regla para estimar tiempos: una hora por cada 5 km en plano, más una hora por cada 600 metros de subida. Se ajusta según tu condición, pero da una buena base para planear.", l: [
          "5 km por hora en plano.",
          "+1 h por cada 600 m de subida.",
          "Añade descansos y margen."] },
        { t: "Los mapas del INEGI", d: "El INEGI publica cartas topográficas de todo México en varias escalas, descargables gratis. Son la base para planear rutas en el monte con datos de relieve, caminos y cuerpos de agua.", l: [
          "Descárgalas gratis en el sitio del INEGI.",
          "Imprímelas a escala real.",
          "Combínalas con apps de senderismo."] }] },
    "Navegar de verdad: las técnicas que usan los que saben": { ic: "hiking-boot",
      sesion: [[5, "En un mapa, planea una ruta corta con un punto de ataque y un sesgo deliberado."],
               [20, "Recórrela en un parque grande, aplicando las dos técnicas y rodeando un obstáculo con giros de 90° y conteo de pasos."],
               [5, "Anota qué técnica te ahorró más tiempo o errores."]],
      sale: "Usaste punto de ataque, sesgo deliberado y rodeo de obstáculo en un recorrido real.",
      subtemas: [
        { t: "Los pasamanos", d: "En orientación se llama pasamanos (handrail) a un elemento lineal que sigues sin esfuerzo: un camino, un río, una línea eléctrica. Reduce la carga mental y los errores, porque no tienes que seguir un rumbo exacto.", l: [
          "Busca elementos lineales en tu ruta.",
          "Síguelos cuando vayan en tu dirección.",
          "Usa la brújula solo para confirmar."] },
        { t: "Los elementos de captura", d: "Un elemento de captura (catching feature) es algo grande que te avisa que te pasaste: un río, un camino, una cerca. Planear uno después de tu objetivo te evita seguir caminando de largo.", l: [
          "Identifica qué hay después de tu objetivo.",
          "Si lo alcanzas, te pasaste.",
          "Regresa con calma."] },
        { t: "Simplificar la ruta", d: "Los orientadores expertos dividen el recorrido en tramos simples y se concentran solo en el siguiente. La navegación compleja se vuelve una serie de decisiones pequeñas.", l: [
          "Divide la ruta en tramos.",
          "Un objetivo a la vez.",
          "Confirma tu posición al final de cada tramo."] }] },
    "Lo que hay que llevar y evitar": { ic: "backpack",
      sesion: [[5, "Revisa tu mochila de excursión contra la lista."],
               [15, "Prueba la interferencia: toma un rumbo y acerca el celular, una navaja y la hebilla a la brújula; observa cuánto se mueve la aguja."],
               [5, "Mete el mapa en una bolsa impermeable y agrega silbato y batería externa."]],
      sale: "Viste cómo el metal desvía la aguja y tu mochila tiene mapa protegido, silbato y batería.",
      subtemas: [
        { t: "Los diez esenciales", d: "Los clubes de montaña recomiendan los «diez esenciales»: navegación, iluminación, protección solar, primeros auxilios, cuchillo, fuego, refugio de emergencia, comida extra, agua extra y ropa extra.", l: [
          "Navegación: mapa, brújula, GPS.",
          "Luz: linterna de cabeza con pilas extra.",
          "Abrigo y agua extra aunque no lo pienses usar."] },
        { t: "Interferencias magnéticas", d: "Objetos de hierro, imanes, aparatos electrónicos y líneas eléctricas pueden desviar la aguja. Incluso algunas rocas con mucho hierro lo hacen. Toma los rumbos lejos de estos objetos.", l: [
          "Aléjate del coche unos metros.",
          "Celular y navaja en otro bolsillo.",
          "Si la aguja se comporta raro, muévete."] },
        { t: "El celular como herramienta de navegación", d: "Apps de senderismo con mapas topográficos descargables (como las de rutas de montaña) funcionan sin señal con el GPS del teléfono. Combinadas con la brújula, son la mejor herramienta, siempre que tengas batería.", l: [
          "Descarga la ruta y el mapa antes.",
          "Batería externa siempre.",
          "Practica también sin el celular."] }] },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  asado: {
    "Prender el carbón sin líquido": { ic: "fire",
      sesion: [[5, "Prepara la chimenea de encendido (o la pirámide) con papel abajo y carbón arriba."],
               [20, "Enciende el papel y espera sin tocar hasta que el carbón esté cubierto de ceniza gris."],
               [5, "Anota cuántos minutos tardó y qué carbón usaste."]],
      sale: "El carbón quedó con ceniza gris, sin llama y sin usar ningún líquido.",
      subtemas: [
        { t: "Cómo funciona la chimenea", d: "La chimenea de encendido usa el efecto chimenea: el aire caliente sube por el cilindro y jala aire fresco desde abajo, alimentando el fuego. Concentra el calor en el carbón y lo enciende parejo en pocos minutos.", l: [
          "Papel abajo, sin apretar.",
          "Carbón arriba hasta el borde.",
          "Lista cuando las piezas de arriba tienen ceniza gris."] },
        { t: "Carbón vegetal y briquetas", d: "El carbón vegetal en trozo es madera carbonizada: prende rápido, da más calor y deja poca ceniza. Las briquetas son polvo de carbón prensado con aglutinantes: arden más parejo y por más tiempo, ideales para cocciones largas.", l: [
          "Trozo: calor alto y rápido para sellar.",
          "Briquetas: calor estable para cocción lenta.",
          "Evita las briquetas «autoencendibles»: llevan químicos."] },
        { t: "Iniciadores naturales", d: "Además del papel, funcionan los cubos iniciadores de cera y fibra, el ocote o un poco de aceite vegetal en papel. Ninguno deja sabor químico, a diferencia de los líquidos derivados del petróleo.", l: [
          "Cubos de cera natural.",
          "Ocote en astillas.",
          "Papel con un poco de aceite de cocina."] }] },
    "Las dos zonas: el concepto que lo cambia todo": { ic: "left-right-arrow",
      sesion: [[5, "Acomoda todo el carbón encendido en una mitad del asador."],
               [15, "Haz la prueba de la mano en cada zona y anota los segundos; asa una pieza pequeña sellando en la zona caliente y terminando en la fría con tapa."],
               [5, "Anota qué temperatura sentiste en cada zona y cómo quedó la pieza."]],
      sale: "Montaste dos zonas, las mediste con la mano y terminaste una pieza en la zona fría sin quemarla.",
      subtemas: [
        { t: "Calor directo e indirecto", d: "En la zona directa, el calor llega sobre todo por radiación desde las brasas: dora y sella rápido. En la zona indirecta, con la tapa puesta, el calor circula por convección como en un horno: cocina parejo sin quemar.", l: [
          "Directo: dorar y sellar.",
          "Indirecto con tapa: cocinar por dentro.",
          "Combínalos según el grosor."] },
        { t: "El sellado inverso", d: "La técnica de sellado inverso (reverse sear) cocina primero el corte grueso en la zona indirecta hasta unos grados antes del punto, y al final lo sella a fuego alto. Da un color parejo por dentro y una costra excelente.", l: [
          "Para cortes de más de 3.5 cm.",
          "Indirecto hasta 8-10 °C antes del punto.",
          "Sella al final, un minuto por lado."] },
        { t: "Las ventilas del asador", d: "En un asador con tapa, las ventilas controlan el oxígeno y con él la temperatura: más abiertas, más calor; más cerradas, menos. La ventila de arriba sobre la carne jala el humo y el calor a través de ella.", l: [
          "Abrir: más calor.",
          "Cerrar parcialmente: menos calor.",
          "Nunca cierres todo si quieres que siga encendido."] }] },
    "Elegir el corte": { ic: "cut-of-meat",
      sesion: [[5, "Ve a una carnicería y pide ver arrachera, ribeye y new york."],
               [15, "Compara grosor y marmoleo, pregunta al carnicero cuál recomienda para asar y pide el corte de al menos 2.5 cm de grosor."],
               [5, "Anota el corte, el precio por kilo y el grosor que compraste."]],
      sale: "Elegiste un corte por grosor y marmoleo con ayuda del carnicero.",
      subtemas: [
        { t: "Grados de calidad de la carne", d: "Algunos países clasifican la carne según su marmoleo; en Estados Unidos, las categorías USDA Prime, Choice y Select. Más marmoleo significa más jugosidad y sabor. En México algunas carnicerías venden cortes con estas clasificaciones.", l: [
          "Prime: más marmoleo.",
          "Choice: buen balance.",
          "Select: más magro."] },
        { t: "Cortes mexicanos y su origen", d: "La arrachera es el diafragma (falda) de la res, muy popular en el norte de México. El término «diezmillo» viene de la espaldilla. Conocer de qué parte viene cada corte te dice si es tierno o necesita cocción larga.", l: [
          "Músculos que trabajan mucho: más duros.",
          "Músculos de soporte (lomo): más tiernos.",
          "Pregunta al carnicero de qué parte es."] },
        { t: "La relación con tu carnicero", d: "Un buen carnicero te corta al grosor que pides, te recomienda cortes de temporada y te avisa de ofertas. Volver al mismo lugar hace que te conozcan y te guarden lo mejor.", l: [
          "Pide el grosor exacto.",
          "Pregunta qué está bueno esta semana.",
          "Regresa y comenta cómo te quedó."] }] },
    "Sal, marinada y temperatura de partida": { ic: "salt",
      sesion: [[5, "Saca la carne del refrigerador 40 minutos antes de asar."],
               [15, "Sala con al menos 40 minutos de anticipación (o justo antes), seca la superficie con papel y prepara una marinada solo si es un corte duro."],
               [5, "Anota cuánto tiempo salaste y cómo quedó la costra."]],
      sale: "La carne llegó al asador a temperatura ambiente, salada a tiempo y seca por fuera.",
      subtemas: [
        { t: "La sal y la humedad", d: "Al salar, la sal saca jugo de la superficie por ósmosis; en unos 40 minutos, ese jugo disuelve la sal y la carne lo reabsorbe, sazonando por dentro. Por eso salar a los 10 minutos deja la superficie mojada justo cuando la vas a asar.", l: [
          "40 minutos o más: sazona por dentro.",
          "Justo antes: superficie seca.",
          "Evita el punto intermedio."] },
        { t: "Salado en seco", d: "El salado en seco (dry brining) consiste en salar la carne y dejarla destapada en el refrigerador de varias horas a un día. La superficie se seca, lo que mejora el dorado, y la carne queda sazonada de manera uniforme.", l: [
          "Sal en todas las caras.",
          "Destapada en el refrigerador sobre una rejilla.",
          "De 8 a 24 horas para cortes gruesos."] },
        { t: "Lo que hace el ácido de la marinada", d: "El ácido (limón, naranja, vinagre) desnaturaliza las proteínas de la superficie. En exceso, las deja con textura harinosa o blanda. Las marinadas no penetran mucho: actúan sobre todo en la superficie.", l: [
          "Marinada corta para cortes delgados.",
          "Máximo unas horas con ácido.",
          "Sécala antes de asar para que dore."] }] },
    "Asar y saber cuándo está": { ic: "thermometer",
      sesion: [[5, "Ten listos pinzas, termómetro de sonda y un plato limpio para la carne cocida."],
               [20, "Asa el corte sin moverlo hasta que se despegue; mide en la parte más gruesa y retira 3-4 grados antes del punto que quieres."],
               [5, "Anota temperatura de retiro, temperatura final después del reposo y el punto obtenido."]],
      sale: "Sacaste la carne en el punto que buscabas usando el termómetro, sin cortarla para ver.",
      copia: { t: "Puntos de la carne de res (temperatura final)", l: [
        "Rojo: 52 °C · Medio rojo: 57 °C · Medio: 63 °C",
        "Tres cuartos: 68 °C · Bien cocido: 71 °C o más",
        "Retirar 3–4 °C antes · reposar 5–10 min",
        "Molida de res: 71 °C · pollo: 74 °C"] },
      subtemas: [
        { t: "La reacción de Maillard", d: "La reacción de Maillard, entre azúcares y aminoácidos a altas temperaturas, crea la costra dorada y cientos de compuestos de sabor. Necesita superficie seca y calor alto; por eso no se mueve la carne mientras se forma.", l: [
          "Superficie seca.",
          "Calor alto.",
          "No mover hasta que se despegue."] },
        { t: "Voltear seguido o una vez", d: "Experimentos de cocina, como los de J. Kenji López-Alt, muestran que voltear la carne cada 30-60 segundos produce una cocción más pareja y un poco más rápida que voltear una vez. Ambas funcionan; lo importante es controlar la temperatura.", l: [
          "Una vez: costra más marcada.",
          "Varias veces: cocción más pareja.",
          "El termómetro decide, no el número de vueltas."] },
        { t: "Dónde medir", d: "La temperatura se mide en el centro de la parte más gruesa, sin tocar hueso ni grasa, que dan lecturas falsas. En cortes delgados, se mete la sonda de lado.", l: [
          "Centro de la parte más gruesa.",
          "Lejos del hueso.",
          "De lado en cortes delgados."] }] },
    "Reposo y corte — los dos últimos errores": { ic: "kitchen-knife",
      sesion: [[5, "Retira la carne a una tabla limpia y tápala sin apretar."],
               [10, "Mientras reposa, identifica la dirección de la fibra y prepara el cuchillo afilado."],
               [10, "Corta contra la fibra en tiras en ángulo y termina con sal en escamas; compara con un trozo cortado a favor de la fibra."]],
      sale: "Cortaste contra la fibra y notaste la diferencia de suavidad frente a un corte a favor.",
      subtemas: [
        { t: "Por qué cortar contra la fibra", d: "Las fibras musculares son largas y resistentes. Cortar perpendicular a ellas las acorta en cada bocado, y al masticar se separan fácil. Cortar a favor deja fibras largas que se sienten correosas.", l: [
          "Busca las líneas del músculo.",
          "Corta en perpendicular.",
          "En arrachera es lo más importante."] },
        { t: "El reposo y los jugos", d: "Mientras la carne descansa, la temperatura se iguala entre el exterior y el centro y los jugos se espesan ligeramente, por lo que se pierde menos líquido al cortar. Además, la cocción continúa unos grados.", l: [
          "5 minutos para cortes delgados.",
          "10 minutos para cortes gruesos.",
          "Tapada sin apretar para que no se ablande la costra."] },
        { t: "La sal en escamas", d: "La sal en escamas, como la de Colima o la Maldon, se disuelve despacio y da pequeños estallidos de sabor y textura crujiente. Se usa al final, no al cocinar.", l: [
          "Al final, sobre la carne cortada.",
          "Poca cantidad: es intensa.",
          "La sal de Colima es una excelente opción mexicana."] }] },
    "Lo que acompaña": { ic: "hot-pepper",
      sesion: [[5, "Prepara cebollitas, nopales, chiles y los ingredientes de la salsa."],
               [20, "Ásalos en orden aprovechando el fuego alto antes de la carne; asa jitomate, chile, ajo y cebolla para la salsa."],
               [5, "Muele la salsa con sal y prueba; anota la proporción."]],
      sale: "Hiciste las guarniciones y una salsa asada en el mismo fuego antes de la carne.",
      copia: { t: "Salsa asada", l: [
        "2 jitomates · 2–4 chiles serranos · ¼ de cebolla · 1 diente de ajo",
        "Asar hasta que tengan manchas negras",
        "Moler (molcajete o licuadora) con sal",
        "Ajustar: más chile, limón o un poco de agua"] },
      subtemas: [
        { t: "El tatemado", d: "Tatemar —asar hasta que la piel se queme en partes— es una técnica clave de la cocina mexicana. Desarrolla sabores ahumados y dulces en jitomates, chiles y cebollas, y es la base de muchas salsas.", l: [
          "Busca manchas negras, no carbón total.",
          "El ajo se quema rápido: retíralo antes.",
          "Pela los chiles si quieres menos amargor."] },
        { t: "El molcajete", d: "El molcajete de piedra volcánica tritura en lugar de cortar, lo que libera aceites y da una textura rústica distinta a la licuadora. Un molcajete nuevo se cura moliendo arroz crudo varias veces para quitar el polvo de piedra.", l: [
          "Cúralo con arroz antes de usarlo.",
          "Muele primero ajo y sal, luego lo demás.",
          "Lávalo solo con agua, sin jabón."] },
        { t: "Equilibrar el plato", d: "Una carne asada con verduras asadas, salsa y tortillas da un plato equilibrado. Las verduras aportan fibra y frescura que balancean la grasa de la carne.", l: [
          "Tanta verdura como carne.",
          "Salsa con acidez para cortar la grasa.",
          "Tortillas recién calentadas en el asador."] }] },
    "Mantén tu cuchillo afilado": { ic: "kitchen-knife",
      sesion: [[5, "Revisa el filo con la prueba del papel."],
               [20, "Si tienes piedra, remójala, afila con ángulo constante de 15-20° en grano grueso y luego fino; si no, usa la chaira cinco pasadas por lado."],
               [5, "Repite la prueba del papel y anota el resultado."]],
      sale: "Tu cuchillo corta una hoja de papel colgando limpiamente.",
      subtemas: [
        { t: "El ángulo del filo", d: "Los cuchillos occidentales suelen tener un ángulo de unos 20° por lado y los japoneses, unos 15°. Un ángulo menor corta mejor pero es más frágil. Mantener el ángulo constante es lo más importante al afilar.", l: [
          "Occidentales: ~20°.",
          "Japoneses: ~15°.",
          "Constancia del ángulo sobre todo."] },
        { t: "Los granos de la piedra", d: "Las piedras de afilar se miden por grano: números bajos (200-400) quitan mucho material para reparar filos dañados; medios (1000) afilan; altos (3000-6000) pulen. Para casa, una piedra 1000/6000 cubre casi todo.", l: [
          "1000: afilar.",
          "6000: pulir.",
          "Menos de 400: reparar filos dañados."] },
        { t: "La rebaba", d: "Al afilar un lado, se forma una pequeña rebaba de metal en el lado opuesto, que se siente con la yema del dedo. Es la señal de que llegaste al filo. Luego se afila el otro lado y se elimina la rebaba con pasadas ligeras.", l: [
          "Siente la rebaba con cuidado, desde el lomo hacia el filo.",
          "Cambia de lado cuando aparezca en toda la longitud.",
          "Termina con pasadas ligeras alternadas."] }] },
    "Seguridad e higiene": { ic: "soap",
      sesion: [[5, "Prepara dos juegos de pinzas y tablas: uno para crudo y otro para cocido."],
               [15, "Organiza tu estación de asado: crudo de un lado, cocido del otro, platos separados y termómetro a la mano."],
               [5, "Al terminar, limpia la parrilla caliente con cepillo y apaga el carbón por completo."]],
      sale: "No hubo cruce entre crudo y cocido y la parrilla quedó limpia y el carbón apagado.",
      subtemas: [
        { t: "Bacterias en la superficie", d: "En un corte entero de res, las bacterias están principalmente en la superficie, que se esteriliza al sellar. En la carne molida, la superficie se mezcla con el interior, por eso necesita cocinarse completamente.", l: [
          "Cortes enteros: el centro puede quedar rojo.",
          "Molida: bien cocida.",
          "Pollo: siempre 74 °C."] },
        { t: "Los cepillos de alambre", d: "Se han reportado casos de cerdas metálicas de cepillos que quedan en la parrilla y terminan en la comida. Revisa la parrilla después de cepillar o usa cepillos sin cerdas metálicas, como los de espiral.", l: [
          "Revisa la parrilla después de cepillar.",
          "Cambia el cepillo si pierde cerdas.",
          "Una cebolla partida también limpia la parrilla caliente."] },
        { t: "Comida fuera del refrigerador", d: "En un asado al aire libre, la comida pasa horas fuera. La regla de las 2 horas (1 si hace más de 32 °C) indica cuándo hay que guardar o desechar lo que está fuera para evitar intoxicaciones.", l: [
          "Máximo 2 horas fuera; 1 si hace calor.",
          "Ensaladas y salsas con mayonesa, a la sombra y en frío.",
          "Guarda las sobras pronto."] }] },
    "Otras carnes en el asador": { ic: "poultry-leg",
      sesion: [[5, "Elige una carne nueva para probar: pollo, costillas, chorizo o pescado."],
               [40, "Cocínala con su regla: pollo directo e indirecto hasta 74 °C, costillas lentas con tapa, chorizo en zona media, pescado en parrilla muy aceitada."],
               [5, "Anota tiempos, temperaturas y resultado."]],
      sale: "Cocinaste una carne nueva con su técnica correcta y alcanzó la temperatura segura.",
      subtemas: [
        { t: "El pollo en mariposa", d: "Abrir el pollo en mariposa (spatchcock), quitando el espinazo y aplanándolo, hace que se cocine de forma más pareja y en menos tiempo. La piel queda más uniforme y crujiente.", l: [
          "Corta el espinazo con tijeras.",
          "Aplana presionando el pecho.",
          "Piel arriba en zona indirecta, piel abajo al final para dorar."] },
        { t: "Las costillas y el colágeno", d: "Las costillas de cerdo tienen mucho tejido conectivo que necesita tiempo a temperatura baja para volverse gelatina. Por eso se cocinan horas a fuego indirecto y no rápido a fuego alto.", l: [
          "110-135 °C por varias horas.",
          "Prueba de doblez: se agrietan al levantarlas.",
          "La salsa al final, para que no se queme."] },
        { t: "El pescado en el asador", d: "El pescado es delicado y se pega. Una parrilla muy caliente, limpia y aceitada, piel bien seca y no moverlo hasta que se despegue son las claves. Los pescados enteros o de carne firme son los más fáciles.", l: [
          "Pescado de carne firme: robalo, huachinango, atún.",
          "Seca bien la piel.",
          "Voltea una sola vez con espátula."] }] },
    "Cocina de fuego indirecto y ahumado": { ic: "cloud",
      sesion: [[10, "Monta el asador para indirecto con poco carbón y una charola con agua en la zona fría; remoja astillas de madera."],
               [60, "Ahuma algo pequeño (pollo o costillas) entre 110 y 135 °C con humo azul, controlando con las ventilas y agregando astillas."],
               [10, "Anota temperatura, tiempo, madera usada y cómo salió."]],
      sale: "Mantuviste el asador entre 110 y 135 °C con humo azul y la carne salió jugosa y con sabor a humo.",
      subtemas: [
        { t: "La meseta del ahumado", d: "En cortes grandes como el brisket o la paleta de cerdo, la temperatura interna se estanca horas alrededor de 65-75 °C: es la meseta (the stall), causada por la evaporación de humedad que enfría la superficie. Envolver en papel la acelera.", l: [
          "Es normal: no subas el fuego.",
          "Envolver en papel (Texas crutch) la acorta.",
          "Ten paciencia: termina sola."] },
        { t: "El anillo de humo", d: "El anillo rosa bajo la superficie de la carne ahumada se forma cuando gases de la combustión reaccionan con la mioglobina de la carne. No indica crudeza; es señal de un buen ahumado.", l: [
          "Rosa en la orilla: es humo, no crudo.",
          "Verifica la cocción con termómetro.",
          "Más visible con carbón y madera que con gas."] },
        { t: "Maderas para ahumar", d: "Cada madera da un perfil: mezquite, intenso; encino, equilibrado; nogal, fuerte; frutales, suave y dulce. Nunca uses maderas tratadas, pintadas o resinosas como el pino, que dan sabores amargos y pueden ser tóxicas.", l: [
          "Mezquite con moderación.",
          "Frutales para pollo y cerdo.",
          "Nunca madera tratada o de pino."] }] },
    "Planear una carne asada para varios": { ic: "spiral-calendar",
      sesion: [[5, "Define cuántas personas, hora de comer y menú."],
               [15, "Calcula carne (250-300 g por persona), carbón (1 kg por cada 4) y haz la lista de compras y el orden de la parrilla."],
               [5, "Haz tu cronograma: hora de encender (40 minutos antes), verduras, cortes gruesos y delgados."]],
      sale: "Tienes cantidades, lista de compras y cronograma para tu carne asada.",
      copia: { t: "Plan de carne asada", l: [
        "Personas: ___ · Carne: ___ × 0.3 kg = ___ kg",
        "Carbón: ___ ÷ 4 = ___ kg (+20 % si es tarde larga)",
        "T−40 min: encender carbón",
        "T−20: verduras, chorizo, salsa",
        "T−10: cortes gruesos · T: cortes delgados",
        "Bebidas con y sin alcohol · hielo · tortillas · limones"] },
      subtemas: [
        { t: "Calcular con margen", d: "Los anfitriones experimentados calculan un 10-20 % extra de comida por si llegan más personas o el apetito es mayor. Las sobras de carne asada se usan bien al día siguiente en tacos, tortas o ensaladas.", l: [
          "10-20 % extra.",
          "Las sobras tienen muchos usos.",
          "Refrigera lo que sobre en menos de 2 horas."] },
        { t: "El anfitrión en el asador", d: "Delegar tareas —alguien con las bebidas, alguien con las tortillas— te deja convivir. Tener todo preparado antes de que llegue la gente es lo que convierte el asado en reunión y no en trabajo.", l: [
          "Delega bebidas y mesa.",
          "Todo cortado y salado antes.",
          "Sirve por tandas y convive entre ellas."] },
        { t: "Opciones para todos", d: "En una reunión puede haber personas que no comen carne o que no toman alcohol. Incluir algo vegetariano (hongos, queso para asar, elotes) y bebidas sin alcohol hace que todos estén cómodos.", l: [
          "Queso panela o de asar, hongos, elotes.",
          "Aguas frescas y bebidas sin alcohol.",
          "Pregunta por restricciones al invitar."] }] },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  reparaciones: {
    "Las herramientas que resuelven el 90%": { ic: "toolbox",
      sesion: [[5, "Saca las herramientas que tienes y ponlas sobre la mesa."],
               [15, "Compáralas con la lista y anota lo que falta, priorizando taladro, detector y multímetro."],
               [5, "Organiza todo en una caja con lugar fijo para cada herramienta."]],
      sale: "Tienes tu caja con lugar fijo para cada herramienta y la lista de lo que falta por prioridad.",
      copia: { t: "Caja básica", l: [
        "☐ Taladro percutor + brocas de concreto, madera y metal",
        "☐ Desarmadores plano y cruz (o puntas intercambiables)",
        "☐ Pinzas de electricista, de punta y de presión",
        "☐ Perico y Stillson",
        "☐ Flexómetro · nivel · cúter · martillo · linterna de cabeza",
        "☐ Detector de cables y tubos · multímetro o probador",
        "☐ Cinta de teflón · taquetes y tornillos surtidos · pasta para resanar"] },
      subtemas: [
        { t: "Comprar herramienta con criterio", d: "Una herramienta barata que se rompe sale cara; una profesional para uso ocasional es innecesaria. La regla común: compra calidad media en lo que usarás seguido (taladro, desarmadores) y lo básico en lo ocasional.", l: [
          "Calidad media en lo de uso frecuente.",
          "Renta o pide prestado lo ocasional.",
          "Baterías intercambiables de una misma marca ahorran."] },
        { t: "El multímetro", d: "El multímetro mide voltaje, corriente y resistencia. En casa sirve sobre todo para comprobar si un cable tiene corriente (voltaje en corriente alterna) y si un fusible o un cable tiene continuidad.", l: [
          "Modo V~ para corriente de casa (127 V en México).",
          "Prueba primero en un contacto que sabes que funciona.",
          "Un probador sin contacto es aún más simple."] },
        { t: "Herramientas en Alemania", d: "En Alemania es muy común el «Heimwerken» (bricolaje) y las tiendas como Bauhaus, OBI o Hornbach rentan herramienta. Los departamentos de estudiantes suelen exigir reparar pequeños daños al salir, como tapar agujeros.", l: [
          "Al rentar, revisa qué debes reparar al salir.",
          "Tapar agujeros de taquetes es lo más común.",
          "Allá el voltaje es 230 V: tus herramientas de México no sirven sin transformador."] }] },
    "Seguridad antes de cualquier cosa": { ic: "safety-vest",
      sesion: [[5, "Localiza la llave de paso general del agua de tu casa y la de cada mueble."],
               [15, "Ubica tu tablero eléctrico y etiqueta qué controla cada interruptor, probando uno por uno."],
               [5, "Revisa dónde está la llave del gas y escribe qué harías si hueles gas."]],
      sale: "Sabes dónde están las llaves de agua y gas y cada interruptor del tablero está etiquetado.",
      subtemas: [
        { t: "La corriente y el cuerpo", d: "La corriente eléctrica que atraviesa el cuerpo puede alterar el ritmo del corazón incluso a intensidades bajas. Con piel mojada la resistencia baja y el riesgo sube mucho. Por eso nunca se trabaja con corriente ni con manos o piso mojados.", l: [
          "Siempre corta y comprueba.",
          "Nunca con manos o pies mojados.",
          "Herramientas con mango aislado."] },
        { t: "El interruptor diferencial", d: "Un interruptor diferencial (o contacto GFCI en baños y cocinas) corta la corriente en milisegundos si detecta una fuga a tierra, por ejemplo a través de una persona. Es uno de los dispositivos que más protege contra electrocución.", l: [
          "Pruébalo con su botón de prueba cada mes.",
          "Pide uno en baño y cocina.",
          "En Alemania es obligatorio en instalaciones nuevas."] },
        { t: "El gas: olor y riesgo", d: "El gas LP y el natural no tienen olor; se les añade un odorizante (mercaptano) para detectar fugas. Una fuga en un espacio cerrado puede explotar con una chispa, incluso de un interruptor o un celular.", l: [
          "Huele gas: no enciendas ni apagues nada.",
          "Cierra la llave, abre ventanas, sal.",
          "Llama al técnico o al 911 desde afuera."] }] },
    "Taladrar y colgar algo que aguante": { ic: "framed-picture",
      sesion: [[5, "Elige qué vas a colgar y su peso aproximado."],
               [20, "Detecta cables y tubos, identifica la pared, elige broca y taquete, marca la profundidad, perfora recto y limpia el polvo; coloca y prueba."],
               [5, "Revisa que esté nivelado y firme; anota qué taquete usaste."]],
      sale: "Colgaste algo nivelado y firme, con el taquete correcto para tu tipo de pared.",
      subtemas: [
        { t: "Cómo funciona un taquete", d: "Un taquete de expansión se abre al meter el tornillo y presiona contra las paredes del agujero: aguanta por fricción. En tablaroca, que es frágil, los anclajes de mariposa o metálicos se abren detrás del panel y reparten la carga.", l: [
          "Concreto: taquete de expansión.",
          "Tablaroca: mariposa o anclaje metálico.",
          "Revisa la carga máxima en el empaque."] },
        { t: "El bastidor de la tablaroca", d: "La tablaroca se atornilla a postes metálicos o de madera, normalmente cada 40 a 60 cm. Atornillar directamente al poste da mucha más resistencia que cualquier taquete en el panel. Un detector de postes los encuentra.", l: [
          "Busca los postes con detector o tocando suavemente.",
          "Para cargas pesadas, al poste.",
          "Repisas largas: al menos dos postes."] },
        { t: "Aspirar mientras perforas", d: "El polvo de concreto contiene sílice cristalina, que daña los pulmones con la exposición frecuente. Un truco: pegar un sobre o un post-it doblado bajo el punto de perforación, o que alguien sostenga la aspiradora cerca.", l: [
          "Lentes de protección siempre.",
          "Cubrebocas si perforas mucho.",
          "Captura el polvo al perforar."] }] },
    "Electricidad básica: cambiar un contacto o un apagador": { ic: "electric-plug",
      sesion: [[5, "Baja el interruptor del circuito y comprueba con probador que no hay corriente."],
               [20, "Quita la placa, toma foto, desconecta, conecta el nuevo igual con tornillos firmes y vuelve a montar."],
               [5, "Sube la corriente, prueba con un aparato y anota el circuito en tu tablero."]],
      sale: "Cambiaste un contacto o apagador con la corriente cortada y comprobada, y funciona.",
      subtemas: [
        { t: "Fase, neutro y tierra", d: "La fase lleva la corriente; el neutro cierra el circuito de regreso; la tierra es una vía de seguridad que desvía la corriente en caso de falla. En México los contactos con tierra tienen el tercer orificio redondo.", l: [
          "Fase: el cable peligroso.",
          "Neutro: regreso del circuito.",
          "Tierra: seguridad, no lo elimines."] },
        { t: "La polaridad del contacto", d: "En un contacto polarizado, una ranura es más ancha que la otra: la ancha va al neutro y la angosta a la fase. Respetarlo mantiene la seguridad de los aparatos que dependen de la polaridad.", l: [
          "Tornillo plateado: neutro (blanco).",
          "Tornillo latón: fase (negro o rojo).",
          "Tornillo verde: tierra."] },
        { t: "Conexiones flojas e incendios", d: "Una conexión floja produce resistencia y calor; con el tiempo puede derretir el aislante y causar un incendio. Es una de las causas comunes de incendios eléctricos en casas. Apretar bien los tornillos es parte de la seguridad.", l: [
          "Aprieta firme los tornillos.",
          "Cable sin aislante solo lo necesario.",
          "Contacto caliente o que huele: revísalo."] }] },
    "Plomería 1: fugas de llave y de coladera": { ic: "droplet",
      sesion: [[5, "Cierra la llave de paso del mueble, abre la llave para vaciar y pon un balde debajo."],
               [20, "Desarma la llave, revisa empaque o cartucho, compra la pieza igual (lleva la vieja) y vuelve a armar."],
               [5, "Abre el paso y revisa que no gotee; anota la pieza que usaste."]],
      sale: "Arreglaste una fuga cambiando el empaque o cartucho y ya no gotea.",
      subtemas: [
        { t: "Lo que cuesta una gota", d: "Una llave que gotea una gota por segundo puede desperdiciar miles de litros al año. En una ciudad con problemas de agua como la Ciudad de México, arreglar fugas es ahorro y responsabilidad.", l: [
          "Una gota por segundo suma miles de litros al año.",
          "Revisa todas las llaves de la casa.",
          "Un empaque cuesta muy poco."] },
        { t: "Llaves de compresión y de cartucho", d: "Las llaves antiguas de compresión usan un empaque de hule que se aplasta para cerrar; gotean cuando se gasta. Las modernas de monomando usan un cartucho cerámico que se cambia completo.", l: [
          "Dos manerales: probablemente empaque.",
          "Monomando: cartucho.",
          "Lleva la pieza vieja a la ferretería."] },
        { t: "El teflón y los selladores", d: "La cinta de teflón rellena los huecos de la rosca y lubrica al apretar. Para algunas conexiones se usa sellador líquido de roscas. Las conexiones con empaque de hule o cono no necesitan teflón.", l: [
          "Teflón en rosca macho, en el sentido de apriete.",
          "3 a 5 vueltas.",
          "Conexiones con empaque: sin teflón."] }] },
    "Plomería 2: caños tapados y el sifón": { ic: "plunger",
      sesion: [[5, "Pon un balde bajo el sifón del fregadero o lavabo."],
               [15, "Afloja las tuercas a mano, saca la U, límpiala, revisa los empaques y vuelve a montarla."],
               [5, "Deja correr agua caliente y revisa que no haya fugas."]],
      sale: "Abriste, limpiaste y montaste el sifón sin fugas.",
      subtemas: [
        { t: "El sello de agua", d: "El sifón retiene siempre un poco de agua que bloquea los gases del drenaje. Si un desagüe no se usa en mucho tiempo, el agua se evapora y aparecen malos olores: basta con echar agua para restaurarlo.", l: [
          "Mal olor en un desagüe sin uso: echa agua.",
          "Coladeras de piso también tienen sello.",
          "Si el olor sigue, revisa la ventilación del drenaje."] },
        { t: "Por qué la grasa tapa", d: "La grasa caliente parece líquida, pero al enfriarse en la tubería se solidifica y atrapa restos de comida. Con el tiempo forma tapones duros. En las redes municipales forma los famosos «fatbergs».", l: [
          "Tira la grasa en un frasco, no en el fregadero.",
          "Limpia sartenes con papel antes de lavar.",
          "Agua muy caliente con jabón ayuda a prevenir."] },
        { t: "Alternativas a los químicos", d: "Además de la ventosa y la sonda, el bicarbonato con vinagre y agua caliente puede ayudar con depósitos leves. Los limpiadores enzimáticos atacan materia orgánica sin dañar la tubería. Los químicos cáusticos son peligrosos.", l: [
          "Ventosa primero.",
          "Sonda para tapones profundos.",
          "Enzimáticos para mantenimiento."] }] },
    "Plomería 3: el WC": { ic: "toilet",
      sesion: [[5, "Quita la tapa del tanque y observa un ciclo de descarga y llenado."],
               [15, "Pon unas gotas de colorante en el tanque, espera 15 minutos sin jalar: si aparece color en la taza, el sapo fuga. Ajusta el flotador si llena de más."],
               [5, "Si el sapo fuga, anota su modelo para comprar el repuesto."]],
      sale: "Sabes si tu WC fuga con la prueba del colorante y ajustaste el nivel de llenado.",
      subtemas: [
        { t: "Cómo funciona un WC", d: "Al jalar, el sapo se levanta y el agua del tanque cae a la taza con fuerza, activando un sifón que arrastra el contenido. Luego el sapo baja, la válvula de llenado repone el agua y el flotador la corta al nivel correcto.", l: [
          "Sapo: sella el tanque.",
          "Válvula de llenado: repone el agua.",
          "Flotador: controla el nivel."] },
        { t: "El consumo de agua", d: "Los WC antiguos usaban 12 a 16 litros por descarga; los modernos ahorradores usan 4.8 a 6 litros, y los de doble descarga aún menos. En México hay normas que limitan el consumo de los nuevos.", l: [
          "Un WC con fuga puede gastar más que toda la familia.",
          "Revisa si el tuyo es ahorrador.",
          "Doble descarga ahorra mucha agua."] },
        { t: "Lo que no va al WC", d: "Toallitas «desechables», algodón, hilo dental y toallas femeninas no se deshacen como el papel y causan tapones en tu casa y en el drenaje público.", l: [
          "Solo papel higiénico.",
          "Bote de basura junto al WC.",
          "Las toallitas no se desintegran."] }] },
    "Paredes: tapar agujeros y pintar": { ic: "paintbrush",
      sesion: [[5, "Elige una pared con agujeros pequeños y prepara pasta, espátula, lija y cinta de pintor."],
               [25, "Resana los agujeros, deja secar, lija, limpia el polvo, cubre bordes con cinta y pinta dos manos finas cortando primero los bordes con brocha."],
               [5, "Retira la cinta con la pintura algo fresca y limpia las herramientas."]],
      sale: "La pared quedó sin agujeros visibles y con pintura pareja, sin marcas de bordes.",
      subtemas: [
        { t: "Pinturas: vinílica y esmalte", d: "La pintura vinílica (base agua) es la más común en interiores: seca rápido, tiene poco olor y se lava con agua. El esmalte (base aceite o alquídico) es más resistente para puertas y herrería, pero huele más y se limpia con solvente.", l: [
          "Muros: vinílica.",
          "Puertas y metal: esmalte.",
          "Mate oculta imperfecciones; satinado se limpia mejor."] },
        { t: "Calcular cuánta pintura", d: "Un litro de pintura vinílica cubre aproximadamente 8 a 12 m² por mano, según la marca y la superficie. Mide largo por alto de cada muro, resta puertas y ventanas, multiplica por dos manos y suma un 10 %.", l: [
          "m² = largo × alto − puertas y ventanas.",
          "× 2 manos ÷ rendimiento del bote.",
          "+10 % para retoques."] },
        { t: "La humedad en los muros", d: "Manchas que regresan, pintura que se infla o salitre indican humedad. Pintar encima no lo arregla: hay que encontrar y corregir la fuente (filtración, fuga, condensación) y usar sellador o impermeabilizante adecuado.", l: [
          "Si la mancha regresa, hay humedad.",
          "Busca la fuente antes de pintar.",
          "Ventila baños y cocinas."] }] },
    "Puertas, chapas y muebles": { ic: "door",
      sesion: [[5, "Recorre tu casa buscando puertas que rechinan o rozan, chapas duras y muebles flojos."],
               [20, "Arregla tres: lubrica bisagras, aprieta tornillos (palillo con pegamento si giran en falso), grafito en una chapa."],
               [5, "Anota qué arreglaste y qué queda pendiente."]],
      sale: "Arreglaste al menos tres detalles de puertas, chapas o muebles.",
      subtemas: [
        { t: "Por qué el grafito en chapas", d: "El grafito es un lubricante seco: reduce la fricción sin atraer polvo. El aceite, en cambio, forma con el polvo una pasta que traba los pernos de la chapa con el tiempo.", l: [
          "Grafito en polvo en la ranura de la llave.",
          "Mete y saca la llave varias veces.",
          "Nunca aceite en cilindros de chapas."] },
        { t: "El aglomerado y sus tornillos", d: "Los muebles de aglomerado (MDF o partículas) sujetan mal los tornillos cuando se aflojan repetidamente: la rosca se desmorona. Rellenar con palillos y pegamento o usar tornillos un poco más gruesos les da nueva vida.", l: [
          "Aprieta sin forzar.",
          "Palillo + pegamento blanco en agujeros barridos.",
          "Revisa los muebles una vez al año."] },
        { t: "El silicón sanitario", d: "El silicón sanitario tiene fungicida para resistir la humedad. Se aplica en superficie limpia y seca, en un cordón continuo, y se alisa con el dedo mojado en agua jabonosa. Necesita 24 horas para curar antes de mojarse.", l: [
          "Retira el viejo por completo.",
          "Superficie seca y limpia con alcohol.",
          "24 horas sin agua."] }] },
    "Cuándo llamar a un profesional": { ic: "construction-worker",
      sesion: [[5, "Escribe tu lista de lo que nunca haces solo: gas, tablero, estructura, fugas en muro."],
               [15, "Busca y guarda el contacto de un electricista, un plomero y un técnico de gas de confianza, con recomendaciones."],
               [5, "Escribe las preguntas que harás antes de contratar."]],
      sale: "Tienes tu lista de límites y tres contactos de confianza con tus preguntas para contratar.",
      copia: { t: "Antes de contratar", l: [
        "¿Qué crees que es el problema y cómo lo vas a resolver?",
        "¿Cuánto cuesta en total (material y mano de obra)?",
        "¿Cuánto tiempo toma?",
        "¿Qué garantía das?",
        "¿Me das el presupuesto por escrito?"] },
      subtemas: [
        { t: "Muros de carga", d: "Un muro de carga sostiene parte del peso del edificio. Quitarlo o perforarlo sin cálculo estructural puede comprometer la estabilidad, sobre todo en una zona sísmica como la Ciudad de México.", l: [
          "Nunca modifiques un muro sin saber si es de carga.",
          "En edificios, consulta al administrador.",
          "Obras grandes: ingeniero estructural."] },
        { t: "El gas, regulado", d: "Las instalaciones de gas deben hacerlas técnicos certificados y, en muchos casos, deben revisarse por unidades verificadoras. Un error puede causar intoxicación por monóxido o explosiones.", l: [
          "Solo técnicos certificados.",
          "Revisa periódicamente mangueras y conexiones.",
          "Instala detector de gas y de monóxido."] },
        { t: "Reconocer a un buen técnico", d: "Un buen técnico diagnostica antes de cotizar, explica con claridad, da presupuesto por escrito, limpia al terminar y da garantía. Las recomendaciones de conocidos siguen siendo la mejor fuente.", l: [
          "Pide recomendaciones.",
          "Compara dos presupuestos en trabajos grandes.",
          "No pagues todo por adelantado."] }] },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
  meditar: {
    "Qué es y qué NO es": { ic: "man-in-lotus-position",
      sesion: [[1, "Siéntate con la espalda erguida y pon un temporizador."],
               [3, "Atención en la respiración; cada vez que notes que te fuiste, cuenta una «repetición» y vuelve."],
               [1, "Anota cuántas repeticiones contaste, sin juzgar el número."]],
      sale: "Hiciste tres minutos y contaste tus regresos como repeticiones, no como fallas.",
      subtemas: [
        { t: "La mente divaga casi la mitad del tiempo", d: "Matthew Killingsworth y Daniel Gilbert, con miles de reportes en tiempo real, encontraron que la mente divaga cerca de la mitad del tiempo despierto y que la gente suele estar menos feliz mientras divaga. Notarlo es el primer paso.", l: [
          "Divagar es lo normal.",
          "Darte cuenta es la habilidad.",
          "Volver al presente se entrena."] },
        { t: "Atención focalizada y monitoreo abierto", d: "Los investigadores distinguen dos estilos: atención focalizada (en un objeto, como la respiración) y monitoreo abierto (notar todo lo que surge sin aferrarse). Para empezar, la focalizada es más sencilla.", l: [
          "Empieza con atención focalizada.",
          "El monitoreo abierto viene después.",
          "Ambos entrenan la atención."] },
        { t: "Mindfulness laico", d: "Jon Kabat-Zinn desarrolló en 1979 el programa MBSR (reducción del estrés basada en mindfulness) en la Universidad de Massachusetts, sin elementos religiosos. Es la base de gran parte de la investigación moderna.", l: [
          "MBSR: 8 semanas, estudiado en clínicas.",
          "No requiere creencias.",
          "Es entrenamiento de atención."] }] },
    "Qué mejora en concreto": { ic: "brain",
      sesion: [[2, "Escribe del 1 al 10 cómo están hoy tu atención, tu reactividad y tu tensión física."],
               [5, "Medita cinco minutos con atención en la respiración."],
               [2, "Pon un recordatorio para repetir la evaluación en 30 días."]],
      sale: "Tienes tu evaluación inicial y el recordatorio para medir en 30 días.",
      subtemas: [
        { t: "Lo que dice la evidencia", d: "Revisiones de estudios, como la de Madhav Goyal y colegas (2014), encontraron que los programas de meditación tienen efectos moderados en ansiedad, depresión y dolor. No son milagrosos, pero son reales y comparables a otras intervenciones.", l: [
          "Efectos moderados y consistentes.",
          "Mejor con práctica regular.",
          "No sustituye tratamiento médico."] },
        { t: "Atención y estudio", d: "Estudios como el de Michael Mrazek y colegas encontraron que dos semanas de entrenamiento en mindfulness mejoraron la memoria de trabajo y el desempeño en un examen de comprensión lectora, al reducir la divagación.", l: [
          "Menos divagación al estudiar.",
          "Útil antes de sesiones de alemán.",
          "Cinco minutos antes de estudiar."] },
        { t: "El espacio entre estímulo y respuesta", d: "Viktor Frankl hablaba del espacio entre lo que nos pasa y cómo respondemos. La meditación entrena justo ese espacio: notar la reacción antes de actuarla. Es la base de la regulación emocional.", l: [
          "Nota la emoción antes de actuar.",
          "Una respiración crea el espacio.",
          "Elige la respuesta."] }] },
    "La postura": { ic: "chair",
      sesion: [[2, "Siéntate en una silla con los pies planos y la espalda sin recargar."],
               [5, "Ajusta: hilo desde la coronilla, barbilla metida, hombros y mandíbula sueltos; mantén la postura respirando tranquilo."],
               [1, "Nota qué parte del cuerpo se tensó y anótalo."]],
      sale: "Sostuviste cinco minutos con la columna erguida y el resto del cuerpo relajado.",
      subtemas: [
        { t: "Postura y estado de alerta", d: "Una postura erguida ayuda a mantenerte alerta; encorvarte o acostarte facilita la somnolencia. Por eso casi todas las tradiciones piden una espalda recta pero no rígida: alerta y relajado a la vez.", l: [
          "Erguido: alerta.",
          "Rígido: tensión.",
          "Busca el punto medio."] },
        { t: "Posturas alternativas", d: "Se puede meditar sentado en silla, en cojín, en banquito de rodillas (seiza) o incluso acostado para el escaneo corporal. Lo importante es poder sostener la postura sin dolor durante la sesión.", l: [
          "Silla: la más accesible.",
          "Banquito: alivia las rodillas.",
          "Acostado: para dormir, no para estar alerta."] },
        { t: "La mandíbula y los hombros", d: "Mucha gente acumula tensión en la mandíbula (apretar los dientes) y los hombros sin darse cuenta, sobre todo con estrés o al manejar. La meditación ayuda a notarla y soltarla.", l: [
          "Separa ligeramente los dientes.",
          "Deja caer los hombros.",
          "Revisa la tensión en el semáforo."] }] },
    "Tu primera sesión, minuto a minuto": { ic: "stopwatch",
      sesion: [[1, "Siéntate, temporizador de cinco minutos con sonido suave, ojos cerrados."],
               [4, "Tres respiraciones largas y luego respiración normal, atención en un punto; cuando te vayas, «pensando» y vuelve."],
               [1, "Nota el cuerpo y los sonidos antes de abrir los ojos; marca la sesión en tu cuadrícula de hábitos."]],
      sale: "Completaste los cinco minutos y la marcaste sin evaluar si «estuvo bien».",
      subtemas: [
        { t: "Elegir el punto de atención", d: "Se puede sentir la respiración en la nariz (aire fresco al entrar, tibio al salir), en el pecho o en el abdomen. La nariz es más precisa; el abdomen, más calmante. Elige uno y quédate con él toda la sesión.", l: [
          "Nariz: sensación sutil y precisa.",
          "Abdomen: más fácil de sentir.",
          "Uno por sesión."] },
        { t: "La etiqueta «pensando»", d: "Nombrar en silencio lo que pasa («pensando») es una técnica de muchas tradiciones contemplativas. Funciona como el etiquetado afectivo: poner nombre crea distancia y facilita volver.", l: [
          "Una palabra, sin juicio.",
          "Luego vuelve a la respiración.",
          "Puedes ser más específico: «planeando», «recordando»."] },
        { t: "Sin evaluar la sesión", d: "Juzgar la sesión como buena o mala refuerza la idea de que hay que lograr un estado especial. Los instructores insisten en que la práctica es el acto de sentarse y volver, no el resultado.", l: [
          "Hecha = buena.",
          "Las sesiones difíciles entrenan más.",
          "Registra solo si la hiciste."] }] },
    "Contar respiraciones: el andamio para empezar": { ic: "abacus",
      sesion: [[1, "Siéntate y prepara un temporizador de cinco minutos."],
               [5, "Cuenta las exhalaciones del 1 al 10 y vuelve a empezar; si te pierdes, vuelve al 1."],
               [1, "Anota cuántas veces llegaste a 10 sin perderte."]],
      sale: "Contaste respiraciones cinco minutos y anotaste cuántos ciclos completaste.",
      subtemas: [
        { t: "Por qué contar ayuda", d: "Contar da a la mente una tarea concreta y una forma clara de saber cuándo se distrajo (perdiste la cuenta). Es una técnica tradicional del zen y se usa en investigación para medir la atención.", l: [
          "La cuenta revela las distracciones.",
          "Es un andamio temporal.",
          "Suéltalo cuando ya no lo necesites."] },
        { t: "Contar en la exhalación", d: "Contar al final de cada exhalación ayuda a no apresurar la respiración y a soltar. Algunas personas prefieren contar «uno» en la inhalación y en la exhalación. Lo importante es no controlar el ritmo.", l: [
          "Respira natural, no al ritmo de la cuenta.",
          "Cuenta al final de la exhalación.",
          "Si te aceleras, suelta el control."] },
        { t: "Un medidor de progreso", d: "Anotar cuántos ciclos de diez completas da una medida simple de tu atención. Con semanas de práctica, el número suele subir. Es un dato, no una calificación.", l: [
          "Registra los ciclos completos.",
          "Compara semanas, no días.",
          "Mejorar no es la meta, es la consecuencia."] }] },
    "Qué hacer con los pensamientos": { ic: "cloud",
      sesion: [[1, "Siéntate con una libreta al lado."],
               [8, "Medita etiquetando los pensamientos (planeando, recordando, preocupación) y vuelve; si algo urgente aparece, anótalo en dos palabras."],
               [1, "Revisa qué etiqueta apareció más."]],
      sale: "Etiquetaste los pensamientos sin pelear con ellos y sabes qué tipo te visita más.",
      subtemas: [
        { t: "El efecto rebote", d: "Daniel Wegner mostró con el experimento del «oso blanco» que intentar suprimir un pensamiento lo hace aparecer más. Por eso la meditación no busca detener pensamientos, sino dejar de engancharse con ellos.", l: [
          "Suprimir hace rebotar.",
          "Notar y soltar funciona mejor.",
          "No luches: observa."] },
        { t: "Defusión cognitiva", d: "La terapia de aceptación y compromiso usa la defusión: ver los pensamientos como eventos mentales, no como verdades. Decir «estoy teniendo el pensamiento de que…» crea distancia de su contenido.", l: [
          "«Estoy teniendo el pensamiento de que voy a fallar».",
          "Un pensamiento no es un hecho.",
          "Puedes notarlo sin obedecerlo."] },
        { t: "Pensamientos recurrentes", d: "Si un pensamiento regresa una y otra vez, puede indicar algo pendiente o una preocupación que necesita atención fuera de la meditación. Anotarlo y darle un momento después ayuda a soltarlo durante la sesión.", l: [
          "Anótalo y suéltalo.",
          "Atiéndelo después, con tiempo.",
          "Si son obsesivos o angustiantes, busca apoyo."] }] },
    "Cuándo y cuánto": { ic: "spiral-calendar",
      sesion: [[2, "Elige tu ancla: después de lavarte los dientes o antes del café."],
               [5, "Medita cinco minutos justo después de esa ancla."],
               [2, "Escribe tu progresión de las próximas semanas: 5, 10 y 15 minutos."]],
      sale: "Meditaste pegado a un hábito existente y tu progresión está escrita.",
      subtemas: [
        { t: "El apilamiento de hábitos", d: "BJ Fogg y James Clear proponen anclar un hábito nuevo a uno existente: «después de [hábito actual], haré [hábito nuevo]». La rutina vieja funciona como señal y reduce la necesidad de recordar.", l: [
          "Elige un ancla diaria fija.",
          "Hazlo justo después.",
          "Empieza pequeño."] },
        { t: "Cuánto tiempo para notar efectos", d: "Muchos programas de investigación usan ocho semanas de práctica diaria. Algunos efectos en atención aparecen antes. La regularidad parece pesar más que la duración de cada sesión.", l: [
          "Comprométete a ocho semanas.",
          "Diario, aunque sea corto.",
          "Evalúa al final, no cada día."] },
        { t: "Mañana o noche", d: "En la mañana la mente está menos cargada y es más fácil hacerlo antes de que el día se complique. En la noche ayuda a cerrar el día y preparar el sueño. Lo mejor es la hora que puedas sostener.", l: [
          "Mañana: más constante para muchos.",
          "Noche: ayuda a dormir.",
          "Elige la que cumplas."] }] },
    "Los cuatro obstáculos y qué hacer con cada uno": { ic: "construction",
      sesion: [[2, "Identifica cuál de los cuatro obstáculos te ha frenado más."],
               [5, "Medita aplicando la respuesta a ese obstáculo: tres minutos si no hay tiempo, ojos entreabiertos si hay sueño, observar la inquietud si aparece."],
               [2, "Escribe tu plan para el día que quieras abandonar."]],
      sale: "Conoces tu obstáculo principal, tienes su respuesta y un plan para no abandonar.",
      subtemas: [
        { t: "Los cinco obstáculos clásicos", d: "La tradición budista describe cinco obstáculos: deseo, aversión, pereza o sopor, inquietud y duda. Son los mismos que ve la gente que empieza hoy. Reconocerlos como normales quita la sensación de estar haciéndolo mal.", l: [
          "Deseo: querer estar en otro lado.",
          "Aversión: rechazo a lo que pasa.",
          "Sopor, inquietud, duda: todos normales."] },
        { t: "La regla de no fallar dos veces", d: "Un día sin meditar no rompe el hábito; dos o tres seguidos empiezan a hacerlo. James Clear propone la regla de «nunca fallar dos veces»: si fallas un día, el siguiente es obligatorio aunque sea un minuto.", l: [
          "Un día fallado: normal.",
          "Al día siguiente, aunque sea un minuto.",
          "Protege la cadena, no la perfección."] },
        { t: "El valle de la decepción", d: "Al inicio de cualquier hábito hay un periodo en que se invierte esfuerzo sin ver resultados. En la meditación suele llegar a las dos o tres semanas. Saber que viene ayuda a cruzarlo.", l: [
          "Espera el bajón de motivación.",
          "Comprométete con la práctica, no con el resultado.",
          "Mide al final de las ocho semanas."] }] },
    "Escaneo corporal": { ic: "x-ray",
      sesion: [[1, "Acuéstate o siéntate cómodo, temporizador de diez minutos."],
               [8, "Recorre el cuerpo de pies a cabeza notando sensaciones sin cambiarlas: pies, piernas, cadera, abdomen, pecho, manos, brazos, hombros, cuello, cara."],
               [1, "Nota en qué zonas había tensión y anótalas."]],
      sale: "Recorriste todo el cuerpo y sabes dónde acumulas tensión.",
      subtemas: [
        { t: "La interocepción", d: "La interocepción es la percepción de las señales internas del cuerpo: latido, respiración, tensión, hambre. Investigaciones sugieren que una mejor interocepción se relaciona con mejor regulación emocional. El escaneo corporal la entrena.", l: [
          "Notar el cuerpo es una habilidad.",
          "Las emociones se sienten en el cuerpo.",
          "Detectar tensión temprano evita dolor."] },
        { t: "Escaneo para dormir", d: "El escaneo corporal acostado es una técnica común en programas para el insomnio. Al llevar la atención al cuerpo, se reduce la rumiación que mantiene despierto. Si te duermes antes de terminar, cumplió su función.", l: [
          "Úsalo ya acostado, con luz apagada.",
          "Respira lento al recorrer.",
          "Dormirte a la mitad está bien."] },
        { t: "Relajación muscular progresiva", d: "Edmund Jacobson desarrolló la relajación muscular progresiva: tensar y soltar grupos de músculos para notar la diferencia. Es una alternativa activa al escaneo cuando la tensión es mucha.", l: [
          "Tensa 5 segundos, suelta 10.",
          "De pies a cabeza.",
          "Útil antes de dormir o tras un día pesado."] }] },
    "Meditación caminando": { ic: "person-walking",
      sesion: [[1, "Busca un pasillo o espacio de 10 a 15 pasos."],
               [8, "Camina despacio con la atención en las plantas de los pies; al final, gira con atención y regresa; cuando te distraigas, vuelve a los pies."],
               [1, "Nota cómo te sientes comparado con la meditación sentado."]],
      sale: "Caminaste ocho minutos con atención en los pies, volviendo cada vez que te ibas.",
      subtemas: [
        { t: "El kinhin del zen", d: "En el zen, el kinhin es la meditación caminando que se practica entre periodos de meditación sentada. Se camina muy despacio, con atención al movimiento. Muestra que la atención no depende de estar quieto.", l: [
          "Lento y deliberado.",
          "Atención en el movimiento.",
          "Entre sesiones sentadas."] },
        { t: "Para quien no aguanta quietud", d: "Las personas con mucha energía o inquietud suelen encontrar más fácil empezar caminando. El movimiento da un objeto de atención más evidente que la respiración sutil.", l: [
          "Si sentado te inquietas, camina.",
          "Puedes alternar ambas.",
          "El objetivo es el mismo: volver."] },
        { t: "Caminar consciente en la ciudad", d: "Caminar con atención en los pasos y los sonidos en un trayecto diario —del coche a la oficina, a la parada— convierte un momento muerto en práctica sin quitar tiempo.", l: [
          "Celular guardado en el trayecto.",
          "Atención a los pies y al entorno.",
          "Combina con conciencia situacional."] }] },
    "Llevarlo al día": { ic: "vertical-traffic-light",
      sesion: [[2, "Elige tres momentos fijos del día para una respiración consciente: un semáforo, antes de una junta, las primeras cucharadas de la comida."],
               [5, "Medita cinco minutos y luego pon recordatorios para esos tres momentos."],
               [2, "En la noche, anota cuántas veces lo hiciste y si cambió alguna reacción."]],
      sale: "Hiciste las tres pausas del día y notaste al menos un momento en que reaccionaste distinto.",
      subtemas: [
        { t: "La práctica informal", d: "Los programas de mindfulness combinan práctica formal (sentado) e informal (atención en actividades cotidianas). La informal es la que transfiere la habilidad a la vida diaria.", l: [
          "Formal: el entrenamiento.",
          "Informal: la aplicación.",
          "Ambas suman."] },
        { t: "La pausa de tres respiraciones", d: "Una pausa breve de tres respiraciones conscientes antes de responder interrumpe la reacción automática. Es una de las prácticas más recomendadas por su relación esfuerzo-beneficio.", l: [
          "Tres respiraciones antes de contestar.",
          "Antes de abrir un correo difícil.",
          "En cada semáforo en rojo."] },
        { t: "Comer con atención", d: "Estudios de alimentación consciente encontraron que comer con atención ayuda a notar la saciedad y a disfrutar más con menos cantidad. Las primeras cucharadas sin pantalla son un buen inicio.", l: [
          "Primeras tres cucharadas sin pantalla.",
          "Nota sabor, textura y temperatura.",
          "Deja los cubiertos entre bocados."] }] },
    "Apps y recursos, sin depender de ellos": { ic: "mobile-phone",
      sesion: [[2, "Instala una app con temporizador (por ejemplo, Insight Timer) y configura campana de inicio y fin."],
               [7, "Haz una meditación guiada de introducción y otra sin guía, solo con temporizador."],
               [1, "Anota cuál te costó más y por qué."]],
      sale: "Hiciste una sesión guiada y una solo con temporizador, y sabes cuál te ayuda en qué momento.",
      subtemas: [
        { t: "Guiada contra silenciosa", d: "Las meditaciones guiadas ayudan a aprender técnicas y a mantener la atención al inicio, pero pueden volverse una muleta. La práctica silenciosa con temporizador desarrolla la capacidad de sostener la atención por ti mismo.", l: [
          "Guiada para aprender.",
          "Silenciosa para entrenar.",
          "Alterna en las primeras semanas."] },
        { t: "Meditar en otro idioma", d: "Hacer meditaciones guiadas en alemán o inglés es una forma tranquila de exponerte al idioma. El vocabulario es simple y repetitivo (atmen, Körper, loslassen) y la voz suele ser lenta y clara.", l: [
          "Busca meditaciones en alemán para principiantes.",
          "Aprende palabras como «atmen» (respirar).",
          "Doble beneficio: calma e idioma."] },
        { t: "Evitar la trampa del contenido", d: "Consumir contenido sobre meditación —videos, libros, apps— puede sustituir la práctica real sin darte cuenta. La regla: por cada contenido nuevo, una semana de práctica.", l: [
          "Primero practica, luego lee.",
          "Una app basta.",
          "Desactiva notificaciones que no sean el recordatorio."] }] },
    "📚 Qué leer": { ic: "books" },
    "✅ Ya lo dominas cuando…": { ic: "check-mark-button" }
  },
};
if (typeof module !== 'undefined' && module.exports) module.exports = HB_PRACTICA;
