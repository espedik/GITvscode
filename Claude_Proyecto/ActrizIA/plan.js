/* ══════════════════════════════════════════════════════════════════════════════════════════
   ACTRIZ IA · el contenido de actriz.html
   ══════════════════════════════════════════════════════════════════════════════════════════
   Adán, 1-nov-2026: "este nuevo html es un nuevo proyecto que quiero empezar en paralelo a todo lo
   demás, este será la apertura de una cuenta de una actriz de IA súper profesional y quiero obtener
   ganancias de eso… quiero que analices todo, pongas los pasos que debo hacer y cómo, piénsalo a
   profundidad para que quede bien y sí me genere dinero".

   Aquí vive TODO lo que la página dice: la tesis, las seis formas de cobrar, cómo encaja con el plan,
   la ficha del personaje, las herramientas, la ruta de 90 días, la semana tipo, la venta a marcas, los
   cortes y las reglas. actriz.html solo es molde y comportamiento. Cada cifra trae su fuente (`f`,
   índice de `fuentes`) o dice «tarifa sugerida»: son de octubre de 2026 y cambian; ninguna es promesa.
   El ingreso que pide el plan y el dólar salen del maestro (CIFRAS), nunca de aquí.
   ══════════════════════════════════════════════════════════════════════════════════════════ */
window.ACTRIZ = {
  tesis: 'Una actriz digital creada con IA, con cara, voz y personalidad propias, que protagoniza micro-series en español y comerciales. El primer dinero no llega por los seguidores: llega vendiendo anuncios con ella a negocios, desde el primer o segundo mes. La audiencia es el escaparate y, cuando crece, la segunda fuente: marcas, pagos de plataforma y fan club.',

  // Lo que el proyecto respeta para no comerse lo demás (se pintan como cifras en la portada).
  limites: [
    { k: 'horas', v: '6 h', t: 'a la semana, como tope', d: 'Sábado 2.5 h de producción en lote, dos bloques de 45 min entre semana y 15 min al día de comentarios. El domingo es de Didi.' },
    { k: 'gasto', v: '$700', t: 'al mes en herramientas, como tope', d: 'Se paga de tu gasto personal de la quincena, con tarjeta de débito: nada a meses ni con la BBVA.' },
    { k: 'corte', v: 'Día 90', t: 'se decide con números', d: 'Sigue y sube a 8 h si ya cobra más de lo que gasta; si no, se pausa y la hora vuelve a la palanca del sueldo.' },
  ],

  // Las seis formas de cobrar, en el orden en que llegan.
  vias: [
    { id: 'b2b', t: 'Comerciales para marcas', cuando: 'Desde el mes 1 o 2', req: 'Tres comerciales de muestra y un mensaje para negocios. No pide seguidores.',
      cuanto: 'US$150–350 por anuncio terminado si cobras en dólares; a una pyme mexicana, de $1,500 a $3,000 por comercial para empezar.', f: [4, 5],
      como: 'Tu actriz es la talento: el negocio te manda su producto y tú le entregas un comercial de 15 a 30 s con subtítulos y en tres formatos. Es la vía rápida porque se vende a quien ya gasta en anuncios.', prioridad: 1 },
    { id: 'marcas', t: 'Colaboraciones pagadas', cuando: 'Desde unos 10,000 seguidores', req: 'Una cuenta con audiencia real, un kit de medios y la etiqueta de IA visible.',
      cuanto: 'Las marcas llegan 60 a 90 días después de que la cuenta crece; Aitana López, la más conocida de España, promedia unos €3,000 al mes, con picos de €10,000, y la lleva una agencia con once personas.', f: [0, 1],
      como: 'Publicaciones o videos pagados de marcas que encajan con ella. Nunca alcohol ni apuestas: chocaría con tu meta y con la seguridad de marca que te hace cobrable.', prioridad: 2 },
    { id: 'tiktok', t: 'Pagos de TikTok', cuando: 'Con 10,000 seguidores y 100,000 vistas en 30 días', req: 'Videos de un minuto o más, mayor de 18, región elegible y la cuenta en regla. El contenido de IA debe ir etiquetado.',
      cuanto: 'Paga por vistas calificadas de videos de más de un minuto: tus episodios deben durar 61 s o más desde el primero.', f: [2],
      como: 'No es dinero del primer trimestre: es la razón de hacer episodios largos desde el día uno, para entrar en cuanto llegues al umbral.', prioridad: 3 },
    { id: 'youtube', t: 'YouTube y Shorts', cuando: 'Con 1,000 suscriptores', req: 'Y 4,000 horas vistas en un año o 10 millones de vistas de Shorts en 90 días; revisa los umbrales en YouTube Studio. Nada genérico ni de plantilla.',
      cuanto: 'Desde julio de 2026 YouTube no monetiza contenido genérico o de plantilla ni personajes de IA que hablen de salud o finanzas: tu actriz actúa historias, no da consejos.', f: [3],
      como: 'La misma micro-serie, en Shorts y como capítulo largo cada mes. Etiqueta el contenido sintético al subirlo.', prioridad: 4 },
    { id: 'club', t: 'Fan club', cuando: 'Desde unos 5,000 seguidores fieles', req: 'Suscripciones de Instagram o Patreon, siempre sin contenido sexual.',
      cuanto: 'Tarifa sugerida: $49 a $99 al mes por detrás de cámaras, guiones antes de tiempo y votar el siguiente episodio.', f: [],
      como: 'Para la gente que ya sigue la serie. Las plataformas de suscripción de contenido para adultos quedan fuera: te cerrarían marcas y tu carrera.', prioridad: 5 },
    { id: 'licencia', t: 'Licenciar su imagen y su voz', cuando: 'Cuando el personaje ya es conocido', req: 'Una marca registrada y un contrato de licencia por campaña.',
      cuanto: 'Se cobra por campaña y por tiempo de uso; los derechos de uso pagado suman de 25 a 50 % al precio del comercial.', f: [5],
      como: 'Una agencia o una marca la usa en su propia campaña. Es la etapa de agencia: no es para este año.', prioridad: 6 },
  ],

  // Cómo encaja con el plan: el choque, dicho, y las condiciones para que no le quite a lo demás.
  encaje: {
    choque: 'Tu Fase 1 dice que no se abren frentes de negocio nuevos hasta la Fase 4, y esto es uno. Entra en paralelo, como lo decidiste, pero con condiciones: es un experimento de tu palanca de ingreso —el plan pide {{extraSalida}} más al mes desde noviembre para irte en septiembre de 2027— con tope de horas, tope de gasto y fecha de corte.',
    reglas: [
      'No toca el CT-GenAI, el alemán, el gym, la media hora del Plan Maestro ni tus 7 horas de sueño: si una semana no da, se publica menos, no se duerme menos.',
      'El domingo es de Didi: nada de este proyecto en domingo.',
      'Negociar tu ingreso de los martes sigue primero: un aumento en {{empleador}} paga más y antes que cualquier cuenta.',
      'Lo que cobre va a GBM el día que entra, como cualquier ingreso nuevo, y se anota en Finanzas.',
      'Ella no promociona alcohol ni apuestas, ni sale tomando: tu meta de cero alcohol también es la suya.',
    ],
    sinergia: [
      { t: 'Tu laptop', d: 'La RTX 4090 de tu Zephyrus entrena su cara y genera tomas de prueba en local, sin pagar créditos: es la categoría «IA local» de Laptop.' },
      { t: 'El negocio de tu papá', d: 'Su primer comercial de muestra es para Aeroresinas o Heliescala: portafolio real y, si funciona, un cliente cero que paga en clientes.' },
      { t: 'Tu oficio', d: 'Eres ingeniero automotriz: los negocios de autos —agencias, talleres, refacciones, autos eléctricos— son tus mejores prospectos, porque sabes escribirles un guion que no dice tonterías.' },
      { t: 'El CT-GenAI', d: 'Lo que aprendes de prompts, riesgos y evaluación de IA lo usas aquí cada semana: el proyecto es práctica real del examen.' },
    ],
  },

  // La ficha del personaje: lo que hay que decidir, con la recomendación. Los campos se guardan en la página.
  ficha: [
    { k: 'nombre', t: 'Nombre artístico', rec: 'Dos palabras, fácil de pronunciar en español y en inglés, que no sea el de una persona real conocida. Búscalo en Instagram, TikTok, YouTube y como dominio .com antes de quedártelo.', ej: 'Ej.: un nombre y un apellido corto' },
    { k: 'edad', t: 'Edad aparente', rec: 'Claramente adulta, de 25 a 32. Las marcas y las plataformas lo exigen y es lo que hace creíble a una actriz profesional.', ej: '28 años' },
    { k: 'origen', t: 'De dónde es', rec: 'Mexicana, de la Ciudad de México: el mercado hispano es enorme, hay menos competencia que en inglés y tus primeros clientes son de aquí.', ej: 'CDMX · habla español e inglés' },
    { k: 'personalidad', t: 'Su personalidad en tres palabras', rec: 'Lo que la hace reconocible en dos segundos. Elige rasgos que den historias: ambiciosa, irónica, leal; no «bonita y amable».', ej: 'Ambiciosa · irónica · leal' },
    { k: 'voz', t: 'Su voz', rec: 'Diseñada desde cero en ElevenLabs (Voice Design), nunca clonada de una persona real. Guarda la descripción exacta para que suene igual siempre.', ej: 'Media-grave, cálida, ritmo rápido, acento de CDMX' },
    { k: 'estilo', t: 'Su estilo visual', rec: 'Tres looks fijos —casual, profesional, noche— y una paleta de color propia. Lo fijo es lo que vuelve consistente al personaje.', ej: 'Tonos tierra, cabello oscuro a los hombros' },
    { k: 'serie', t: 'Su serie', rec: 'Una micro-serie de episodios de 61 a 90 s con un conflicto que se renueva: una actriz que empieza en la ciudad, una oficina, un taller de autos. Cada episodio termina con una pregunta.', ej: '«Toma 2»: una actriz que quiere su primer protagónico' },
    { k: 'nunca', t: 'Lo que nunca hace', rec: 'La lista que protege la marca: nada sexual, no se hace pasar por real, no da consejos de salud ni de dinero, no promociona alcohol ni apuestas, no imita a nadie famoso.', ej: 'Nada sexual · nunca dice que es real · …' },
  ],

  // Las herramientas, por etapa. El precio es de octubre de 2026 y cambia: verifícalo antes de pagar.
  herramientas: [
    { etapa: 'Su cara, siempre la misma', nube: 'Higgsfield con Soul ID: una identidad que se reusa en cada imagen y video', precio: 'Desde US$15 al mes', usd: 15, local: 'Un LoRA entrenado en tu laptop con ai-toolkit u OneTrainer sobre Flux.2 Klein, que cabe en 16 GB; ComfyUI para generar', f: [6, 8] },
    { etapa: 'Video con personas', nube: 'Kling: el más citado para personajes que hablan y tomas encadenadas', precio: 'Plan estándar de unos US$7 a 10 al mes', usd: 8.5, local: 'Wan 2.2 en ComfyUI para tomas de relleno, con resolución baja por la memoria', f: [6, 7] },
    { etapa: 'Tomas de cine', nube: 'Veo 3.1 para la toma especial de cada episodio', precio: 'Unos US$0.40 por segundo con audio', usd: 0, uso: 'opcional: solo la toma especial, si cabe en el tope', local: '—', f: [6] },
    { etapa: 'Su voz', nube: 'ElevenLabs con Voice Design: una voz que no existe', precio: 'Plan de entrada de unos US$5 al mes', usd: 5, local: '—', f: [] },
    { etapa: 'Guion', nube: 'Claude: la biblia del personaje, los episodios y los guiones de los comerciales', precio: 'Ya lo tienes', local: '—', f: [] },
    { etapa: 'Edición', nube: 'DaVinci Resolve o CapCut: cortes, subtítulos y los tres formatos (9:16, 1:1, 16:9)', precio: 'Gratis', local: 'DaVinci corre en tu laptop con la GPU', f: [] },
  ],

  // La ruta de 90 días: seis tramos de dos semanas. Cada paso se palomea y se guarda.
  ruta: [
    { t: 'Semanas 1 y 2 · Antes de crear nada', meta: 'El terreno libre: contrato revisado, cuentas apartadas y la ficha escrita.', pasos: [
      { id: 'r1', t: 'Revisa tu contrato con {{empleador}}', d: 'Busca exclusividad, conflicto de interés y uso de horario o equipo. Tu laptop es tuya y trabajas fuera de horario; si el contrato pide avisar, avisa por escrito.' },
      { id: 'r2', t: 'Escribe su ficha completa en esta página', d: 'Los ocho campos de «Tu actriz». Pídele a Claude que la convierta en una biblia de una página: biografía, cómo habla, qué quiere, a qué le teme.' },
      { id: 'r3', t: 'Aparta el nombre en todas partes el mismo día', d: 'Un correo nuevo solo para ella, y el mismo usuario en Instagram, TikTok y YouTube. Si uno está tomado, cambia el nombre en todos, no solo en uno.' },
      { id: 'r4', t: 'Decide el tope y la tarjeta', d: 'Hasta $700 al mes de tu gasto personal, con débito. Anota cada herramienta en Finanzas con su fecha de cobro.' },
    ]},
    { t: 'Semanas 3 y 4 · Su cara y su voz', meta: 'La misma cara en diez escenas distintas y una voz que suena igual siempre.', pasos: [
      { id: 'r5', t: 'Genera 40 retratos y quédate con 20', d: 'Frente, tres cuartos, perfil, sonriendo, seria; luz de día y de noche; los tres looks. Los 20 más parecidos entre sí son su «hoja de casting».' },
      { id: 'r6', t: 'Fija su identidad', d: 'Con esos 20: Soul ID en Higgsfield, o un LoRA en tu laptop (ai-toolkit, 15 a 30 imágenes variadas). Guarda el archivo, la semilla y el texto exacto de cada prompt: es tu prueba de autoría.' },
      { id: 'r7', t: 'La prueba de las diez escenas', d: 'Diez escenas distintas —oficina, calle, auto, café— con la misma cara. Si en dos no se parece, todavía no está: ajusta antes de publicar nada.' },
      { id: 'r8', t: 'Diseña su voz', d: 'En ElevenLabs Voice Design, con la descripción de su ficha. Graba la misma frase en cinco tonos y elige; guarda el identificador de la voz.' },
    ]},
    { t: 'Semanas 5 y 6 · Las cuentas, con la etiqueta', meta: 'Tres cuentas abiertas, honestas desde el primer día, con doce piezas listas antes de publicar la primera.', pasos: [
      { id: 'r9', t: 'Abre Instagram, TikTok y YouTube', d: 'Cuenta de creador o de empresa. En Instagram activa la etiqueta de perfil generado con IA: desde el 31 de agosto de 2026, a los perfiles que no la llevan se les corta el alcance.' },
      { id: 'r10', t: 'Una biografía que lo dice', d: '«Actriz digital creada con IA · micro-series en español · colaboraciones: correo». Decirlo no te quita seguidores; esconderlo te quita la cuenta.' },
      { id: 'r11', t: 'Produce doce piezas antes de la primera publicación', d: 'Los tres primeros episodios de 61 a 90 s, seis cortos de 15 a 30 s y tres carruseles de fotos. Arrancar con reserva es lo que sostiene el ritmo.' },
      { id: 'r12', t: 'Publica con la etiqueta de IA en cada video', d: 'TikTok y YouTube la piden para contenido realista hecho con IA. Tres publicaciones por semana, siempre a la misma hora.' },
    ]},
    { t: 'Semanas 7 y 8 · El portafolio que vende', meta: 'Tres comerciales de muestra y la lista de los primeros 40 negocios.', pasos: [
      { id: 'r13', t: 'Tu primer comercial: para el negocio de tu papá', d: 'Un comercial de 15 s de Aeroresinas o Heliescala con tu actriz, en los tres formatos. Es portafolio real y lo publica la app Posts.' },
      { id: 'r14', t: 'Dos comerciales más, de rubros que pagan', d: 'Un negocio de autos (agencia, taller o refacciones) y un café, restaurante o app. Con marcas inventadas o con permiso: nunca con el logo de otro sin autorización.' },
      { id: 'r15', t: 'Arma tu oferta y tu portafolio', d: 'Una página o un PDF con los tres comerciales, los tres paquetes y tu correo. Precios de la sección «Vender comerciales».' },
      { id: 'r16', t: 'La lista de 40 negocios', d: 'Pymes de CDMX que ya publican anuncios en Instagram (lo ves en su biblioteca de anuncios de Meta): autos, comida, belleza, inmobiliarias. Nombre, cuenta y a quién escribirle.' },
    ]},
    { t: 'Semanas 9 y 10 · Vender', meta: 'Veinte mensajes por semana y el primer cliente pagado.', pasos: [
      { id: 'r17', t: 'Veinte mensajes por semana', d: 'Con el guion de «Vender comerciales»: un comercial de muestra hecho con SU producto vale más que cualquier explicación. Seguimiento a los 4 días, una sola vez.' },
      { id: 'r18', t: 'El primer cliente, aunque sea a precio de prueba', d: 'El paquete de prueba de $1,500. Lo que compras es una reseña y un caso real; el precio sube desde el tercero.' },
      { id: 'r19', t: 'Contrato y cobro en orden', d: '50 % al empezar y 50 % al entregar; una ronda de cambios; el cliente puede usarlo en orgánico, y en anuncios pagados cuesta 25 a 50 % más. Factura: date de alta en el SAT antes del primer cobro.' },
      { id: 'r20', t: 'Prueba la venta en dólares', d: 'Un perfil en Contra, Upwork o Fiverr con el mismo portafolio, para anuncios con IA de US$150 a 350. Cobrar en dólares rinde más tu hora.' },
    ]},
    { t: 'Semanas 11 y 12 · Medir y decidir', meta: 'El corte del día 90 con números, no con ganas.', pasos: [
      { id: 'r21', t: 'Tu kit de medios', d: 'Seguidores, vistas promedio, retención y público de cada red en una página. Es lo que te piden las marcas.' },
      { id: 'r22', t: 'Date de alta en el TikTok Creator Marketplace', d: 'Acepta personajes de IA etiquetados; las marcas buscan ahí.' },
      { id: 'r23', t: 'Revisa los tres cortes en «Tus números»', d: 'Día 30, día 60 y día 90 contra lo que dice la bitácora.' },
      { id: 'r24', t: 'Decide: sigue, ajusta o pausa', d: 'Si ya cobra más de lo que gasta, sube a 8 h y repite la venta. Si no, pausa la cuenta con una publicación a la semana y regresa las horas a la palanca del sueldo.' },
    ]},
  ],

  // La semana tipo, con tope de 6 h.
  semana: [
    { k: 'Sábado · 2.5 h', t: 'Producción en lote', d: 'El episodio de la semana, dos cortos y un carrusel: guion con Claude, tomas, voz y edición. Una sola sesión larga rinde el doble que cinco cortas.' },
    { k: 'Dos noches · 45 min', t: 'Edición y programación', d: 'Subtítulos, los tres formatos y todo programado a la misma hora. Elige noches que no sean las del CT-GenAI ni la de Negociar tu ingreso.' },
    { k: 'Cada día · 15 min', t: 'Comunidad', d: 'Contestar comentarios y mensajes como ella, con su voz escrita. Nunca manejando: en Didi, el celular no se toca.' },
    { k: 'Desde la semana 9 · 1 h', t: 'Venta', d: 'Veinte mensajes a negocios y los seguimientos, saliendo de las horas de producción: ese mes se publica un corto menos.' },
  ],

  // La fórmula de cada pieza.
  formula: [
    { t: 'Los primeros 2 segundos', d: 'Una imagen o una frase que obliga a quedarse: el conflicto antes que la presentación.' },
    { t: 'Un solo conflicto', d: 'Cada episodio cuenta una cosa: lo quiere, algo se lo impide, decide.' },
    { t: 'Su voz, siempre igual', d: 'La misma descripción de voz y la misma forma de hablar; la consistencia es lo que hace que la gente vuelva.' },
    { t: 'De 61 a 90 segundos', d: 'Lo que pide TikTok para pagar por vistas, y lo que pide una historia para tener principio y final.' },
    { t: 'Termina con una pregunta', d: '«¿Tú qué harías?»: los comentarios empujan el alcance y te dan el siguiente episodio.' },
  ],

  // Vender comerciales: los paquetes, el mensaje y el proceso.
  venta: {
    paquetes: [
      { t: 'Prueba', mxn: 1500, d: 'Un comercial de 15 s, un formato, subtítulos. Para los dos primeros clientes: compra la reseña.' },
      { t: 'Comercial', mxn: 2500, d: 'Un comercial de 30 s, tres formatos (9:16, 1:1, 16:9), subtítulos y una ronda de cambios.' },
      { t: 'Mensual', mxn: 8000, d: 'Cuatro comerciales al mes con la misma actriz como cara de la marca. Es el que vuelve el proyecto un ingreso.' },
    ],
    fuentePrecio: 'Tarifa sugerida para empezar con pymes mexicanas. En dólares, los editores independientes cobran de US$150 a 350 por anuncio con IA terminado y las agencias de 400 a 900; los paquetes de 8 a 15 anuncios van de 1,200 a 4,000 al mes.',
    mensaje: 'Hola, [nombre]. Vi los anuncios de [negocio] en Instagram. Hice este comercial de 15 segundos con [actriz], una actriz digital, usando su producto: [enlace]. Si les sirve, les hago uno de 30 s en los tres formatos de redes por $2,500, en 5 días. ¿Se lo mando a usted o a quien ve la publicidad?',
    proceso: [
      'El cliente te manda el producto, el mensaje y para quién es (brief de cinco preguntas).',
      'Guion en 24 horas, aprobado antes de generar nada.',
      'Dos versiones de la toma principal; el cliente elige.',
      'Una ronda de cambios incluida; la segunda se cobra.',
      'Entrega con subtítulos y en tres formatos, con la etiqueta de IA donde la plataforma la pida.',
    ],
  },

  // Los cortes: lo que tiene que pasar para seguir. `campo` es lo que se compara con la bitácora.
  cortes: [
    { dia: 30, t: 'El personaje existe', d: 'Diez escenas con la misma cara, las tres cuentas con su etiqueta y doce piezas producidas.', pasos: ['r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11'] },
    { dia: 60, t: 'El portafolio vende', d: 'Tres comerciales de muestra, 40 negocios en la lista y los primeros mensajes enviados.', pasos: ['r13', 'r14', 'r15', 'r16'], min: { prospectos: 20 } },
    { dia: 90, t: 'Cobra más de lo que gasta', d: 'Al menos un cliente pagado y los ingresos acumulados por arriba de lo gastado en herramientas.', min: { clientes: 1 }, ingresosVsGastos: true },
  ],

  // El modelo de 12 meses: los supuestos que la página deja mover. Es un escenario, no una promesa: lo real lo dice la
  // bitácora. `fmt`: mes, n, pesos, pct o usd. La página calcula, mes a mes, comerciales, colaboraciones y pagos de TikTok.
  modelo: {
    meses: 12,
    seguidoresIni: 300,   // al terminar el mes 2, con doce piezas publicadas
    vistasPorSeguidor: 3, // vistas al mes por cada seguidor, para estimar los pagos de TikTok
    umbralMarcas: 10000, umbralTikTok: 10000, umbralClub: 5000,
    supuestos: [
      { k: 'primerCliente', t: 'Mes del primer comercial pagado', v: 3, min: 1, max: 6, paso: 1, fmt: 'mes', d: 'La ruta lo pone en las semanas 9 y 10, el mes 3.' },
      { k: 'ritmo', t: 'Comerciales al mes, ya con ritmo', v: 4, min: 0, max: 12, paso: 1, fmt: 'n', d: 'Se llega sumando uno por mes desde el primero. El embudo dice cuántos mensajes pide.' },
      { k: 'precio', t: 'Precio por comercial', v: 2500, min: 1500, max: 6000, paso: 250, fmt: 'pesos', d: 'Tarifa sugerida: el paquete Comercial. Sube desde el tercer cliente.' },
      { k: 'crec', t: 'Crecimiento semanal de seguidores', v: 8, min: 2, max: 15, paso: 1, fmt: 'pct', d: 'Desde 300 seguidores al terminar el mes 2. Cámbialo por el tuyo con cuatro semanas de bitácora.' },
      { k: 'colab', t: 'Precio por colaboración pagada', v: 2000, min: 0, max: 10000, paso: 500, fmt: 'pesos', d: 'Una al mes desde los 10,000 seguidores. Tarifa sugerida.' },
      { k: 'rpm', t: 'Lo que paga TikTok por mil vistas', v: 0.8, min: 0.3, max: 1.5, paso: 0.1, fmt: 'usd', d: 'Blogs de la industria lo ponen entre US$0.60 y 1.20 en tecnología. Vistas al mes: tres veces tus seguidores.', f: [11] },
      { k: 'gasto', t: 'Herramientas al mes', v: 700, min: 0, max: 1500, paso: 50, fmt: 'pesos', d: 'El tope del proyecto.' },
    ],
  },

  // Cómo se arma un episodio de 70 segundos, en segundos.
  episodio: [
    { k: 'Gancho', v: 2, d: 'El conflicto antes que la presentación.' },
    { k: 'Planteamiento', v: 13, d: 'Quién es y qué quiere hoy.' },
    { k: 'Conflicto', v: 35, d: 'Lo que se lo impide: una sola cosa.' },
    { k: 'Giro', v: 11, d: 'Decide, y no sale como esperaba.' },
    { k: 'Pregunta', v: 9, d: '«¿Tú qué harías?»: los comentarios traen el siguiente.' },
  ],

  // Las horas de la semana, antes y después de empezar a vender.
  horas: [
    { t: 'Semanas 1 a 8', partes: [['Producción', 2.5], ['Edición', 1.5], ['Comunidad', 1.75]] },
    { t: 'Desde la semana 9', partes: [['Producción', 1.5], ['Edición', 1.5], ['Comunidad', 1.75], ['Venta', 1]] },
  ],

  // El embudo de venta: supuestos para empezar; la bitácora los corrige.
  embudo: { mensajes: 20, respuesta: 0.15, interes: 0.4, cierre: 0.35,
    d: 'Supuestos para empezar: de cada 100 mensajes con un comercial de muestra hecho con su producto, contestan 15, 6 quieren cotización y 2 compran. Con veinte mensajes a la semana salen unos dos clientes al mes. Cámbialos por los tuyos con tu bitácora.' },

  // Las reglas que no se rompen.
  reglas: [
    { t: 'Siempre dice que es IA', d: 'Etiqueta de perfil en Instagram, etiqueta de IA en cada video de TikTok y la declaración de contenido sintético en YouTube. Sin ellas se pierde alcance o la cuenta.', f: [9, 2, 3] },
    { t: 'No se parece a nadie real', d: 'Ni a una actriz famosa ni a una conocida tuya: la imagen de una persona está protegida en México por la Ley Federal del Derecho de Autor. Si alguien dice que se le parece, se cambia.' },
    { t: 'Nada sexual', d: 'Es lo que la vuelve «súper profesional»: las marcas pagan por seguridad de marca, las plataformas castigan lo sugerente y tu nombre de ingeniero queda fuera de cualquier escándalo.' },
    { t: 'La publicidad dice que es publicidad', d: 'Cada colaboración pagada va con la etiqueta de colaboración de la red o #publicidad.' },
    { t: 'Música y marcas con permiso', d: 'Música de la biblioteca de cada red o con licencia; ningún logo ajeno sin autorización.' },
    { t: 'Herramientas con licencia comercial', d: 'Los planes gratuitos de varias herramientas no permiten uso comercial: lo que vendes se genera con plan de pago.' },
    { t: 'Los impuestos, desde el primer cobro', d: 'Date de alta en el SAT antes de cobrar. Lo que llega de plataformas extranjeras se declara aunque caiga en una cuenta fuera; si va en RESICO o en el régimen de plataformas, decídelo con un contador: las fuentes no coinciden.', f: [10] },
    { t: 'Alemania cambia las reglas', d: 'Con visa de estudiante, trabajar por tu cuenta pide permiso de la oficina de extranjería. Antes de irte, arréglalo o deja la cuenta en pausa programada.' },
    { t: 'La marca, a tu nombre', d: 'Con el primer cliente, registra su nombre en el IMPI (clase 41, entretenimiento): es lo que vas a licenciar.' },
    { t: 'Nada comprado', d: 'Ni seguidores, ni likes, ni bots: arruinan la retención y las marcas lo detectan en el kit de medios.' },
  ],

  // Las fotos de la página: las de cine viven en fotos/; las de hardware y video, en ../Laptop/fotos/, y la del taller, en Heliescala.
  // Cada una con su crédito (autor · fuente · licencia), que la página enseña sobre la foto y en el pie.
  fotos: {
    set: { src: "fotos/set.jpg", cred: "Capt. Corinna Jones, Fuerza Aérea de EE. UU. · Wikimedia Commons · dominio público", alt: "Un equipo de filmación con su cámara" },
    comercial: { src: "fotos/comercial.jpg", cred: "Mblegacy · Wikimedia Commons · CC0 1.0", alt: "Un estudio con pantalla verde y luces" },
    celular: { src: "fotos/celular.jpg", cred: "Raimond Spekking · Wikimedia Commons · CC BY-SA 4.0", alt: "Alguien grabando con el celular en un estabilizador" },
    ringlight: { src: "fotos/ringlight.jpg", cred: "W.carter · Wikimedia Commons · CC BY-SA 4.0", alt: "Un aro de luz para grabar" },
    micro: { src: "fotos/micro.jpg", cred: "Will Fisher · Wikimedia Commons · CC BY-SA 2.0", alt: "Un micrófono de estudio" },
    contrato: { src: "fotos/contrato.jpg", cred: "Blogtrepreneur · Wikimedia Commons · CC BY 2.0", alt: "Un contrato y una pluma" },
    claqueta: { src: "fotos/claqueta.jpg", cred: "Mattbr · Wikimedia Commons · CC BY 2.0", alt: "Una claqueta de cine" },
    edicion: { src: "../Laptop/fotos/edicion.jpg", cred: "David Oakes · Wikimedia Commons · CC BY-SA 3.0", alt: "Consolas de corrección de color" },
    gpu: { src: "../Laptop/fotos/gpu.jpg", cred: "ZMASLO · Wikimedia Commons · CC BY 3.0", alt: "Una tarjeta gráfica GeForce RTX 4090" },
    codigo: { src: "../Laptop/fotos/codigo.jpg", cred: "Martin Vorel · Wikimedia Commons · CC BY-SA 4.0", alt: "Código en una pantalla" },
    auto: { src: "../Laptop/fotos/auto.jpg", cred: "Retired electrician · Wikimedia Commons · CC0 1.0", alt: "Un BYD cargando" },
    heli: { src: "../Heliescala/fotos/taller/flota.jpg", cred: "Heliescala · el taller de tu papá", alt: "Réplicas de helicóptero en el taller" },
  },

  // Las fuentes de las cifras (los `f` de arriba). Revisadas en octubre de 2026.
  fuentes: [
    { t: 'Aitana López (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Aitana_L%C3%B3pez' },
    { t: 'Aitana López: ingresos de cinco cifras (Vinfluencer)', url: 'https://vinfluencer.ai/aitana-lopez/' },
    { t: 'TikTok Creator Rewards 2026: requisitos (Kompozy)', url: 'https://kompozy.io/creator-growth/tiktok-creator-rewards-program' },
    { t: 'YouTube aclara su política de contenido inauténtico (TechCrunch, julio de 2026)', url: 'https://techcrunch.com/2026/07/20/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos/' },
    { t: 'Cuánto cobrar por anuncios con IA (Motionbox)', url: 'https://motionbox.io/blog/how-much-to-charge-clients-for-ai-ugc-ads' },
    { t: 'Costos de anuncios UGC en 2026 (Sparkiz)', url: 'https://sparkiz.ai/blog/ugc-ads-cost/' },
    { t: 'Higgsfield contra Kling: planes y precios 2026', url: 'https://higgsfield.ai/blog/higgsfield-vs-kling-2026' },
    { t: 'Herramientas para personajes consistentes (Higgsfield)', url: 'https://higgsfield.ai/blog/tools-for-consistent-ai-characters' },
    { t: 'Entrenar un LoRA de personaje en 2026 (Tech Insider)', url: 'https://tech-insider.org/train-custom-ai-image-lora-2026/' },
    { t: 'Instagram corta el alcance a perfiles de IA sin etiqueta (TechRepublic)', url: 'https://techrepublic.com/article/news-instagram-ai-generated-profile-label-recommendations/' },
    { t: 'Influencers: régimen fiscal y obligaciones (IDC, enero de 2026)', url: 'https://idconline.mx/fiscal-contable/2026/01/21/influencers-regimen-fiscal-y-obligaciones' },
    { t: 'Nichos de TikTok sin cara y lo que paga cada uno (Fluxnote, 2026)', url: 'https://fluxnote.io/guides/best-niches-faceless-tiktok-2026' },
  ],
};
