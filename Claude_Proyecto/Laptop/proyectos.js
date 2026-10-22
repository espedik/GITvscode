// Los proyectos de la laptop. Lo pinta laptop.html; el mapa está en readme_laptop.md.
//
// Precio y ritmo son rangos [mín, máx]. La página calcula lo que deja cada uno al mes con el
// dólar del plan (CIFRAS.PROYECTO.usdMxn, en el maestro) y le quita la comisión de la plataforma:
// cada cifra se enseña con su cuenta. Los precios de mercado llevan su fuente; los que no tienen
// una publicada dicen «tarifa sugerida para empezar». El ritmo es el de un principiante con unas
// 8 horas a la semana, no el de un estudio.
//
//   precio  [mín, máx] en dólares por unidad (o `precioMxn` en pesos)
//   unidades [mín, máx] al mes        horas  las que lleva cada unidad, en promedio
//   comision la parte que se queda la plataforma (0 si el cliente es directo)
//   pasivo  crece con el catálogo, no con tus horas      cero  sin cobro: es para el negocio de tu papá
var LAPTOP = {

  equipo: {
    modelo: 'ASUS ROG Zephyrus G16 (2024)',
    nota: 'Dijiste G14, pero con RTX 4090 y procesador Intel es la G16: la G14 de esa generación lleva AMD, y en tus activos de Finanzas aparece como Zephyrus G16. Confírmalo en Armoury Crate → Sistema.',
    piezas: [
      { k: 'GPU', v: 'GeForce RTX 4090 Laptop', d: '16 GB de VRAM: escenas pesadas en Blender, imágenes con SDXL y Flux, y modelos de lenguaje locales de 7 a 14 mil millones de parámetros.' },
      { k: 'CPU', v: 'Intel Core Ultra 9 185H', d: '16 núcleos: simulación, compilar código y exportar video mientras la GPU renderiza.' },
      { k: 'RAM', v: '32 GB', d: 'Lo que trae la G16 con 4090. Suficiente para Blender, DaVinci y Unreal; revísalo en el Administrador de tareas.' },
      { k: 'Pantalla', v: 'OLED 2.5K · 240 Hz', d: 'Color amplio y negros reales: ves el render y el color del video como los verá el cliente.' }
    ],
    superpoderes: [
      { t: 'OptiX', d: 'Blender Cycles renderiza con los núcleos RT de la 4090: lo que en CPU tarda una hora, aquí tarda minutos.' },
      { t: 'NVENC con AV1', d: 'La GPU exporta video por hardware, también en AV1: entregas más rápido y en archivos más chicos.' },
      { t: 'CUDA', d: 'Corre IA en tu laptop, sin pagar nube y sin subir los datos de nadie: Whisper, Stable Diffusion, Ollama.' }
    ]
  },

  cats: {
    '3d':   { t: '3D y render',         c: '#b06eff' },
    video:  { t: 'Video',               c: '#ff6b81' },
    ia:     { t: 'IA en tu GPU',        c: '#22d3e6' },
    ing:    { t: 'Ingeniería y código', c: '#00e87a' },
    pasivo: { t: 'Ingreso pasivo',      c: '#ffb63d' }
  },

  // Tus tres mejores apuestas, en orden: por qué, y a cuál pertenece la ruta de 90 días.
  top: [
    { id: 'render-producto', porque: 'El camino más corto a un portafolio: tus primeras piezas son las réplicas de Heliescala, que ya existen. Lo pide cualquier tienda en línea, y tu laptop renderiza en minutos.' },
    { id: 'animacion-tecnica', porque: 'Tu nicho: mecatrónica y años probando sistemas automotrices. Pocos animadores entienden lo que animan; tú sí, y es el ticket más alto de la lista.' },
    { id: 'qa-ia', porque: 'La mejor tarifa por hora desde el primer mes, sin aprender nada nuevo. Y es exactamente el perfil que vas a vender en Alemania.' }
  ],

  proyectos: [
    // ── 3D y render ─────────────────────────────────────────────────────────────────────
    { id: 'render-producto', cat: '3d', ico: '📦', t: 'Renders de producto para tiendas en línea',
      gancho: 'Fotos de producto que no necesitan fotógrafo: el modelo 3D, la luz de estudio y todos los colores del catálogo.',
      precio: [50, 150], por: 'por imagen', unidades: [4, 12], de: 'imágenes al mes', horas: 3, comision: 0.2,
      primer: '3 a 6 semanas', inversion: '$0: Blender y los HDRI de Poly Haven son gratis', dificultad: 2,
      laptop: 'Cycles con OptiX: una imagen 4K de producto sale en minutos, y puedes probar diez luces en una tarde.',
      software: ['Blender (Cycles + OptiX)', 'Poly Haven (HDRI y texturas gratis)', 'GIMP o Photoshop para el retoque'],
      pasos: [
        'Aprende lo básico de Blender con el tutorial de la dona de Blender Guru: modelar, materiales y luz.',
        'Modela y renderiza 5 réplicas de Heliescala sobre fondo de estudio: es tu portafolio, y le sirve a tu papá.',
        'Publica el portafolio en Behance o ArtStation y abre un servicio en Fiverr con 3 paquetes: 1, 3 y 5 imágenes.',
        'Escribe a 20 marcas chicas de Instagram y Mercado Libre con un render de SU producto hecho de muestra.',
        'Después de 5 reseñas, sube el precio: el paquete básico deja de ser el más barato del mercado.'
      ],
      vender: ['Fiverr y Upwork', 'Marcas de Instagram y vendedores de Mercado Libre', 'Agencias de marketing que no tienen 3D'],
      ojo: 'El precio de entrada en Fiverr está muy competido. Gana el que entrega rápido y con variantes de color; no el más barato.',
      sinergia: 'Heliescala es tu cliente cero: sus renders mejoran su catálogo y su web.',
      fuente: 'Guía de precios 2026 (Cylind, vía Framesixty): producto básico US$50–150 por imagen, medio US$150–500.', url: 'https://framesixty.com/how-much-does-3d-rendering-cost/' },

    { id: 'animacion-tecnica', cat: '3d', ico: '⚙️', t: 'Animaciones técnicas para la industria',
      gancho: 'Vistas explosionadas, cómo funciona una máquina, el montaje paso a paso: video que vende equipo industrial y automotriz.',
      precio: [400, 1500], por: 'por animación de 30 a 60 s', unidades: [1, 1], de: 'proyecto al mes', horas: 25, comision: 0,
      primer: '1 a 2 meses', inversion: '$0: Blender y DaVinci Resolve gratis', dificultad: 3,
      laptop: 'Renderizar una animación son cientos de cuadros: con la 4090 es una noche, no una semana.',
      software: ['Blender (importa STEP desde CAD)', 'FreeCAD para limpiar piezas', 'DaVinci Resolve para el montaje y la música'],
      pasos: [
        'Haz una animación de demostración de un mecanismo que conozcas: un actuador, una caja de cambios, un sensor.',
        'Aprende a importar un modelo CAD (STEP) a Blender y a animar la vista explosionada con keyframes.',
        'Publica la demostración en LinkedIn con su explicación técnica: tu red ya son ingenieros.',
        'Ofrécela a proveedores medianos de la industria que venden equipo y no tienen video: 10 correos por semana.',
        'Cobra por proyecto, con un guion aprobado antes de animar y dos rondas de cambios incluidas.'
      ],
      vender: ['LinkedIn: proveedores industriales y automotrices', 'Distribuidores de maquinaria', 'Agencias de marketing B2B'],
      ojo: 'Nunca uses piezas, datos ni información de ALTEN o de sus clientes (Bosch, Continental): solo diseños tuyos o del cliente que te contrata, con contrato.',
      sinergia: 'Aeroresinas: una animación del proceso de reparación de un helicóptero vende mejor que diez fotos.',
      fuente: 'Freelance: US$500–3,000 por minuto de animación 3D (guías de precios 2026).', url: 'https://framesixty.com/how-much-does-3d-rendering-cost/' },

    { id: 'archviz', cat: '3d', ico: '🏙️', t: 'Renders de arquitectura para preventa',
      gancho: 'Las desarrolladoras venden departamentos antes de construirlos: con imágenes que todavía no existen.',
      precio: [250, 800], por: 'por imagen (para empezar)', unidades: [1, 3], de: 'imágenes al mes', horas: 10, comision: 0,
      primer: '2 a 3 meses', inversion: '$0 a $2,000 en modelos de muebles y plantas', dificultad: 3,
      laptop: '16 GB de VRAM aguantan escenas con muebles, vegetación y luz realista sin partirlas.',
      software: ['Blender o D5 Render (versión gratuita)', 'Unreal Engine para recorridos en tiempo real', 'Poly Haven y Quixel para materiales'],
      pasos: [
        'Recrea en 3D un interior que te guste, de una foto de revista, hasta que no se distinga de la foto.',
        'Haz 3 imágenes de portafolio: una sala, una cocina y una fachada al atardecer.',
        'Ofrécete a arquitectos independientes, que no tienen a quién pasarle el render, antes que a las desarrolladoras grandes.',
        'Cuando tengas tres clientes, ofrece un recorrido en video: es lo que más pagan.'
      ],
      vender: ['Arquitectos independientes y despachos chicos', 'Desarrolladoras de CDMX en preventa', 'Inmobiliarias'],
      ojo: 'Es el mercado más exigente en realismo: un render que se ve 3D no se vende. Empieza abajo del precio de mercado y súbelo con el portafolio.',
      sinergia: 'Lo que aprendas aquí te sirve para tu propio depa: verlo en 3D antes de comprarlo.',
      fuente: 'Estudios: interiores US$600–1,500 y exteriores US$800–2,500 por imagen; aquí se empieza abajo de eso.', url: 'https://www.cadcrowd.com/blog/what-are-architectural-rendering-costs-rates-and-pricing-for-companies/' },

    { id: 'fotogrametria', cat: '3d', ico: '📷', t: 'Escaneo 3D con fotos (fotogrametría)',
      gancho: 'Doscientas fotos de un objeto y la computadora lo convierte en un modelo 3D: para tiendas, museos, refacciones y realidad aumentada.',
      precio: [80, 300], por: 'por objeto escaneado y limpio', unidades: [2, 6], de: 'objetos al mes', horas: 5, comision: 0,
      primer: '1 a 2 meses', inversion: '$0: RealityScan es gratis si facturas menos de US$1 millón al año; usas tu celular o una cámara', dificultad: 2,
      laptop: 'Reconstruir un modelo de cientos de fotos es justo lo que la GPU hace bien: horas que en otra laptop son días.',
      software: ['RealityScan (antes RealityCapture)', 'Blender para limpiar y reducir la malla', 'Tu celular o una cámara con luz pareja'],
      pasos: [
        'Escanea 5 objetos de tu casa con buena luz y sin brillos: aprende qué falla (vidrio, metal pulido, negro).',
        'Limpia y reduce la malla en Blender para que pese poco y se vea bien en la web.',
        'Ofrece el servicio a tiendas que quieren su producto en 3D o en realidad aumentada en su sitio.',
        'Explora piezas viejas sin plano: refacciones que alguien necesita reproducir.'
      ],
      vender: ['Tiendas en línea (3D y realidad aumentada)', 'Talleres y coleccionistas', 'Museos y patrimonio'],
      ojo: 'Superficies brillantes o transparentes no se escanean bien sin preparación; cotiza después de ver el objeto.',
      sinergia: 'Aeroresinas: escanear la pieza dañada antes y después documenta la reparación para el cliente y para los posts.',
      fuente: 'Licencia de RealityScan (realityscan.com): gratis para quien factura menos de US$1 millón al año. El precio por objeto es tarifa sugerida para empezar.', url: 'https://www.realityscan.com/download' },

    { id: 'cad-piezas', cat: 'ing', ico: '🔩', t: 'Diseño CAD de piezas a la medida',
      gancho: 'Una pieza que ya no se fabrica, un soporte, una carcasa: diseñada en CAD y lista para imprimir o maquinar.',
      precio: [40, 200], por: 'por pieza', unidades: [3, 8], de: 'piezas al mes', horas: 3, comision: 0.1,
      primer: '2 a 4 semanas', inversion: '$0: FreeCAD es gratis y permite uso comercial', dificultad: 2,
      laptop: 'CAD y simulación necesitan procesador y memoria; tu laptop sobra para piezas y ensambles medianos.',
      software: ['FreeCAD (gratis, uso comercial)', 'Fusion 360 con licencia comercial, si el cliente lo pide', 'Un rebanador para revisar que se pueda imprimir'],
      pasos: [
        'Diseña 5 piezas útiles y publícalas gratis en Printables: es tu portafolio y te da reputación.',
        'Ofrece diseño a la medida en grupos de impresión 3D y de autos, y en talleres.',
        'Cobra por pieza con planos en PDF y el archivo STEP: el cliente imprime o maquina donde quiera.',
        'Cuando te pidan lo mismo dos veces, conviértelo en un producto en tu tienda de STL.'
      ],
      vender: ['Grupos de impresión 3D', 'Talleres mecánicos y de motos', 'Inventores y startups de hardware'],
      ojo: 'Fusion 360 Personal es solo para uso no comercial: si cobras, usa FreeCAD o paga la licencia.',
      sinergia: 'Tu título de mecatrónica: aquí se nota más que en cualquier otro proyecto.',
      fuente: 'Tarifa sugerida para empezar; sube con la complejidad (ensambles, tolerancias, planos).', url: '' },

    { id: 'heliescala-3d', cat: '3d', ico: '🚁', t: 'Heliescala y Aeroresinas en 3D (cliente cero)',
      gancho: 'Las réplicas y las reparaciones de tu papá en renders, giros 360° y animaciones: su catálogo con calidad de marca grande.',
      cero: true, primer: 'Desde la primera semana', inversion: '$0', dificultad: 2,
      laptop: 'Lo mismo que harías para un cliente, con piezas que ya tienes a la mano.',
      software: ['Blender', 'RealityScan para escanear las maquetas', 'DaVinci Resolve'],
      pasos: [
        'Escanea o modela una réplica de Heliescala y haz su giro de 360°: sirve para la web, el catálogo y los posts.',
        'Haz la animación del antes y después de una reparación de Aeroresinas.',
        'Pásalas a Posts para el contenido de la semana.',
        'Úsalas como portafolio para tus primeros clientes de render y de animación técnica.'
      ],
      vender: ['No se vende: es tu portafolio y más clientes para tu papá'],
      ojo: 'Si modelas helicópteros de marcas reales para vender los archivos, cuidado con las marcas registradas: para el catálogo de tu papá no hay problema.',
      sinergia: 'Une el negocio de tu papá con tu propio ingreso: el mismo trabajo sirve dos veces.',
      fuente: '', url: '' },

    // ── Video ───────────────────────────────────────────────────────────────────────────
    { id: 'edicion-youtube', cat: 'video', ico: '🎬', t: 'Editor de video para creadores',
      gancho: 'Los creadores graban; editar es lo que más les cuesta. Cortes, ritmo, subtítulos y miniaturas.',
      precio: [50, 150], por: 'por video largo (para empezar)', unidades: [4, 8], de: 'videos al mes', horas: 6, comision: 0,
      primer: '2 a 4 semanas', inversion: '$0: DaVinci Resolve gratis (la versión Studio cuesta US$295 una sola vez)', dificultad: 1,
      laptop: 'La pantalla OLED para corregir color y NVENC para exportar en minutos: entregas el mismo día.',
      software: ['DaVinci Resolve', 'CapCut de escritorio para lo rápido', 'Whisper para los subtítulos'],
      pasos: [
        'Edita 3 videos de muestra con material libre o de un amigo: un vlog, una entrevista y uno técnico.',
        'Busca creadores medianos (de 10 mil a 200 mil suscriptores) que suben sin editar bien, y ofrece editarles uno gratis.',
        'Convierte el gratis en una tarifa mensual: 4 a 8 videos con precio fijo.',
        'Suma miniaturas y Shorts del mismo video: el cliente paga más y tú reaprovechas el material.'
      ],
      vender: ['Creadores de YouTube en español', 'Podcasts en video', 'Cursos en línea'],
      ojo: 'Una hora de edición por cada minuto final es la regla: cobra por video, nunca por hora, o el cliente paga tu curva de aprendizaje.',
      sinergia: 'Si algún día haces tu propio canal, ya sabes editar.',
      fuente: 'Promedio de mercado US$325 por video (2024); el rango de aquí está abajo de eso, para empezar.', url: 'https://krock.io/blog/stay-creative/how-much-video-editor-should-charge-in-2025' },

    { id: 'shorts-negocios', cat: 'video', ico: '📱', t: 'Reels y Shorts para negocios locales',
      gancho: 'Restaurantes, gimnasios, consultorios: todos saben que necesitan video vertical y nadie tiene tiempo de hacerlo.',
      precio: [25, 60], por: 'por video corto', unidades: [12, 36], de: 'videos al mes (1 a 3 clientes)', horas: 1, comision: 0,
      primer: '2 a 3 semanas', inversion: '$0: tu celular graba y la laptop edita', dificultad: 1,
      laptop: 'Editas y exportas un lote de 12 videos en una tarde.',
      software: ['DaVinci Resolve o CapCut', 'Plantillas de subtítulos animados'],
      pasos: [
        'Arma un paquete fijo: 12 videos al mes, una mañana de grabación y entrega semanal.',
        'Haz el primer mes a mitad de precio para un negocio que ya conozcas.',
        'Mide sus vistas y sus mensajes antes y después: ese número vende al siguiente cliente.',
        'Con 3 clientes, contrata a alguien para grabar y tú quédate con la edición.'
      ],
      vender: ['Negocios de tu colonia', 'Gimnasios y consultorios', 'Restaurantes y cafeterías'],
      ojo: 'La grabación es lo que más tiempo te come: agrúpala en una sola mañana al mes por cliente.',
      sinergia: 'Aeroresinas y Heliescala necesitan exactamente esto para Facebook.',
      fuente: 'Shorts y Reels: US$25–75 con editores que empiezan (guías de precios 2026).', url: 'https://krock.io/blog/stay-creative/how-much-video-editor-should-charge-in-2025' },

    { id: 'motion', cat: 'video', ico: '✨', t: 'Motion graphics: intros y logos animados',
      gancho: 'El logo que se arma solo, la intro del canal, la gráfica que explica un número.',
      precio: [50, 250], por: 'por pieza', unidades: [2, 6], de: 'piezas al mes', horas: 5, comision: 0.2,
      primer: '1 a 2 meses', inversion: '$0: Blender y DaVinci Fusion son gratis', dificultad: 2,
      laptop: 'Las piezas en 3D se renderizan en minutos; en otra laptop las tendrías que hacer en 2D.',
      software: ['Blender', 'DaVinci Resolve (Fusion)'],
      pasos: [
        'Anima 5 logos de marcas inventadas en estilos distintos.',
        'Publica un servicio en Fiverr con entrega en 48 horas.',
        'Ofrece el paquete completo a los creadores que ya editas: intro, cierre y gráficas.'
      ],
      vender: ['Fiverr', 'Creadores y podcasts', 'Agencias de diseño'],
      ojo: 'Es un mercado de volumen: sirve más como extra de tus clientes de edición que como negocio solo.',
      sinergia: 'Se vende junto con la edición de video.',
      fuente: 'Tarifa sugerida para empezar, en el rango de los servicios de animación de logos en Fiverr.', url: '' },

    { id: 'restaurar-video', cat: 'video', ico: '📼', t: 'Restaurar videos familiares con IA',
      gancho: 'Los VHS de la familia, ya digitalizados, a más resolución, sin ruido y con el color corregido.',
      precioMxn: [300, 600], por: 'por hora de video restaurada', unidades: [4, 15], de: 'horas de video al mes', horas: 1.5, comision: 0,
      primer: '1 a 2 semanas', inversion: '$0 con herramientas libres; Topaz Video AI es de pago', dificultad: 1,
      laptop: 'Escalar video con IA es trabajo de GPU: la 4090 lo hace mientras duermes.',
      software: ['Video2X o Real-ESRGAN (gratis)', 'Topaz Video AI (de pago, mejor resultado)', 'DaVinci Resolve para el color'],
      pasos: [
        'Restaura un video de tu familia y enséñalo lado a lado: antes y después.',
        'Ofrece el servicio en grupos de tu colonia y de Facebook, con regalos de fin de año como gancho.',
        'Asóciate con un negocio que ya digitaliza casetes: ellos digitalizan, tú restauras.'
      ],
      vender: ['Grupos de Facebook de tu zona', 'Negocios que digitalizan casetes', 'Regalos de Día de las Madres y Navidad'],
      ojo: 'Demanda de temporada. No prometas milagros: un video muy dañado mejora, pero no queda como nuevo.',
      sinergia: 'Un regalo que vale mucho para tu propia familia.',
      fuente: 'Tarifa sugerida para empezar, en pesos.', url: '' },

    { id: 'canal-propio', cat: 'pasivo', ico: '🎥', t: 'Tu propio canal: ingeniero rumbo a Alemania',
      gancho: 'La maestría, el alemán, el ahorro para irte, la vida de ingeniero: contado por quien lo está haciendo.',
      sinRango: true, primer: '6 a 12 meses', inversion: '$0: ya tienes la laptop y el celular', dificultad: 2,
      laptop: 'Grabas, editas y exportas sin depender de nadie.',
      software: ['DaVinci Resolve', 'OBS para grabar pantalla', 'Whisper para subtítulos en español, inglés y alemán'],
      pasos: [
        'Elige un tema que puedas sostener un año: tu camino a Alemania tiene principio, fecha y final.',
        'Sube un video a la semana durante 3 meses antes de mirar las cifras.',
        'Cada video, también en Shorts: lo corto trae a la gente al largo.',
        'Monetiza con patrocinios y afiliados (cursos de alemán, bancos para irte, cuentas bloqueadas) antes que con anuncios.'
      ],
      vender: ['YouTube: el Programa de Socios pide 1,000 suscriptores y 4,000 horas vistas en 12 meses', 'Patrocinios y afiliados'],
      ojo: 'Los primeros meses no dejan dinero. Su valor real es tu marca personal: un reclutador alemán que te encuentra en video ya te conoce.',
      sinergia: 'Alemán y Entrevistas: explicar en video lo que estudias es la mejor forma de aprenderlo.',
      fuente: 'Requisitos del Programa de Socios de YouTube.', url: 'https://support.google.com/youtube/answer/72851' },

    // ── IA en tu GPU ────────────────────────────────────────────────────────────────────
    { id: 'fotos-ia', cat: 'ia', ico: '🖼️', t: 'Fotos de producto con IA',
      gancho: 'Del producto en la mesa de la cocina a la foto de campaña: fondos, escenas y modelos generados en tu laptop.',
      precio: [5, 15], por: 'por imagen (en paquetes de 10 a 30)', unidades: [20, 80], de: 'imágenes al mes', horas: 0.5, comision: 0,
      primer: '2 a 4 semanas', inversion: '$0: ComfyUI y los modelos abiertos son gratis', dificultad: 2,
      laptop: '16 GB de VRAM corren SDXL de sobra y Flux en fp8, sin pagar una nube por imagen.',
      software: ['ComfyUI', 'SDXL o FLUX.1 schnell (licencias que permiten uso comercial)', 'Photoshop o GIMP para el retoque'],
      pasos: [
        'Aprende ComfyUI con un flujo de foto de producto: recorte, fondo nuevo, luz coherente.',
        'Haz 10 imágenes de muestra con productos reales que tengas en casa.',
        'Ofrece paquetes a tiendas de Instagram: 10 imágenes por un precio fijo.',
        'Combínalo con los renders 3D: el 3D da la forma exacta y la IA, el escenario.'
      ],
      vender: ['Tiendas de Instagram y Mercado Libre', 'Marcas de ropa y accesorios'],
      ojo: 'Usa modelos con licencia comercial (SDXL, FLUX.1 schnell) y nunca la cara de una persona real sin su permiso.',
      sinergia: 'Se vende junto con los renders de producto.',
      fuente: 'Tarifa sugerida para empezar. Licencias: SDXL (CreativeML Open RAIL++-M) y FLUX.1 schnell (Apache 2.0).', url: '' },

    { id: 'subtitulos', cat: 'ia', ico: '💬', t: 'Transcripción y subtítulos con Whisper',
      gancho: 'Podcasts, cursos y videos con subtítulos y transcripción, en español, inglés o alemán.',
      precio: [0.5, 1.5], por: 'por minuto de audio', unidades: [200, 800], de: 'minutos al mes', horas: 0.05, comision: 0,
      primer: '1 a 2 semanas', inversion: '$0: Whisper es libre', dificultad: 1,
      laptop: 'Whisper en la GPU transcribe una hora de audio en unos minutos; tú solo revisas.',
      software: ['Whisper (modelo large)', 'Subtitle Edit para revisar y ajustar tiempos'],
      pasos: [
        'Transcribe tres episodios de un podcast que te guste y compara con lo que dijeron: aprende dónde falla.',
        'Ofrece subtítulos a creadores y escuelas en línea, con entrega en 24 horas.',
        'Agrega traducción al inglés como paquete premium.',
        'Ofrécelo junto con la edición de video.'
      ],
      vender: ['Podcasts', 'Escuelas y cursos en línea', 'Creadores de YouTube'],
      ojo: 'El valor no es la transcripción automática, es tu revisión: nombres propios, términos técnicos y tiempos.',
      sinergia: 'Practicar alemán: transcribir y revisar audio en alemán es entrenamiento auditivo pagado.',
      fuente: 'Tarifa sugerida para empezar.', url: '' },

    { id: 'ia-privada', cat: 'ia', ico: '🔒', t: 'IA privada para despachos y pymes',
      gancho: 'Un asistente con IA que lee los documentos de la empresa sin subirlos a ninguna nube.',
      precio: [300, 1000], por: 'por instalación', unidades: [1, 1], de: 'cliente al mes', horas: 15, comision: 0,
      primer: '1 a 2 meses', inversion: '$0: Ollama y los modelos abiertos son gratis', dificultad: 3,
      laptop: 'Tu laptop es la demostración: corres el modelo frente al cliente, sin internet.',
      software: ['Ollama', 'Open WebUI', 'Un modelo abierto de 7 a 14 mil millones de parámetros'],
      pasos: [
        'Monta en tu laptop un asistente que responde sobre tus propios PDF (tus apuntes de alemán, por ejemplo).',
        'Ofrécelo a quien no puede subir datos a la nube: despachos contables, consultorios, notarías.',
        'Cobra la instalación y una cuota mensual de mantenimiento.',
        'Documenta el caso y publícalo en LinkedIn.'
      ],
      vender: ['Despachos contables y legales', 'Consultorios', 'Pymes con datos sensibles'],
      ojo: 'Un modelo local no es tan bueno como uno grande en la nube: véndelo por la privacidad, no por ser el más inteligente.',
      sinergia: 'Tu CT-GenAI: riesgos, privacidad y RAG son justo su temario.',
      fuente: 'Tarifa sugerida para empezar.', url: '' },

    // ── Ingeniería y código ─────────────────────────────────────────────────────────────
    { id: 'qa-ia', cat: 'ing', ico: '🧪', t: 'QA y pruebas automatizadas con IA, freelance',
      gancho: 'Lo que ya haces en ALTEN, para startups y empresas que no tienen QA: planes de prueba, automatización y revisión con IA.',
      precio: [20, 40], por: 'por hora', unidades: [20, 40], de: 'horas al mes', horas: 1, comision: 0.1,
      primer: '2 a 4 semanas', inversion: '$0', dificultad: 1,
      laptop: 'Corres pruebas, contenedores y modelos de IA locales a la vez sin que se trabe.',
      software: ['Python + pytest', 'Playwright para pruebas web', 'Claude o un modelo local para generar casos'],
      pasos: [
        'Arma tu perfil de Upwork con tu ISTQB Foundation y el CT-GenAI cuando lo apruebes.',
        'Publica dos proyectos de muestra en GitHub: una suite de pruebas web con Playwright y un generador de casos con IA.',
        'Aplica a 5 proyectos chicos por semana; los primeros dos, aunque paguen menos, son por las reseñas.',
        'Pasa a clientes fijos por horas al mes.'
      ],
      vender: ['Upwork', 'Startups de LinkedIn', 'Agencias de software que subcontratan QA'],
      ojo: 'Revisa tu contrato con ALTEN antes de aceptar un cliente: exclusividad, conflicto de interés y propiedad intelectual. Nunca para un competidor de sus clientes.',
      sinergia: 'Entrevistas y tu CT-GenAI: cada proyecto es una historia para tu CV en Alemania.',
      fuente: 'Tarifa sugerida para un perfil con ISTQB que empieza en Upwork.', url: '' },

    { id: 'apps-pymes', cat: 'ing', ico: '🧩', t: 'Apps y tableros a la medida para pymes',
      gancho: 'Lo que hiciste con este Dashboard, para un negocio: inventario, ventas, citas, cobranza.',
      precio: [300, 1200], por: 'por proyecto', unidades: [1, 2], de: 'proyectos al mes', horas: 20, comision: 0,
      primer: '1 a 2 meses', inversion: '$0', dificultad: 2,
      laptop: 'Desarrollas, pruebas y despliegas desde tu laptop.',
      software: ['HTML, CSS y JavaScript', 'Claude Code', 'Una hoja de cálculo como base de datos para empezar'],
      pasos: [
        'Haz el primero para el negocio de tu papá: control de reparaciones o de pedidos de réplicas.',
        'Conviértelo en un caso con capturas y el antes y después.',
        'Ofrécelo a negocios del mismo giro: talleres, consultorios, tiendas.',
        'Cobra el desarrollo y una cuota mensual por mantenimiento.'
      ],
      vender: ['Talleres y negocios de servicio', 'Consultorios', 'Pymes de tu red'],
      ojo: 'Acota el proyecto por escrito antes de empezar: «una app más» se convierte en meses gratis.',
      sinergia: 'Tus propias apps (Dashboard, Finanzas, Coach) son tu portafolio.',
      fuente: 'Tarifa sugerida para empezar.', url: '' },

    // ── Ingreso pasivo ──────────────────────────────────────────────────────────────────
    { id: 'plantilla-finanzas', cat: 'pasivo', ico: '📊', t: 'Vender tu plantilla de Finanzas',
      gancho: 'Tu app de Finanzas, limpia y sin tus datos, como producto descargable.',
      precio: [9, 29], por: 'por venta', unidades: [5, 40], de: 'ventas al mes', horas: 0.2, comision: 0.1, pasivo: true,
      primer: '1 a 2 meses', inversion: '$0: Gumroad cobra solo cuando vendes', dificultad: 2,
      laptop: 'La desarrollas y la pruebas aquí; luego se vende sola.',
      software: ['Tu Finanzas.html, versión limpia', 'Gumroad o Hotmart', 'Un video corto que la enseña'],
      pasos: [
        'Sigue la ruta A del documento de Negocio: plantilla primero, nunca SaaS antes de tener ventas.',
        'Quita tus datos reales y deja ejemplos inventados.',
        'Graba un video de 60 segundos que la muestre en uso.',
        'Publícala en Gumroad y anúnciala en tu LinkedIn y en tu canal.'
      ],
      vender: ['Gumroad', 'Hotmart', 'Tu LinkedIn y tu canal'],
      ojo: 'El riesgo es compartir por error la copia con tus datos reales: revisa el archivo antes de subirlo.',
      sinergia: 'Ya está en tu plan: la tarea de la plantilla de Finanzas de la Fase 0.',
      fuente: 'Tarifa sugerida para empezar; Gumroad cobra una comisión por venta.', url: '' },

    { id: 'stl', cat: 'pasivo', ico: '🖨️', t: 'Modelos para impresión 3D (STL)',
      gancho: 'Diseñas una vez y vendes la descarga muchas veces: organizadores, soportes, piezas, miniaturas.',
      precio: [2, 6], por: 'por descarga', unidades: [20, 120], de: 'descargas al mes (con 30 modelos o más)', horas: 0.1, comision: 0.2, pasivo: true,
      primer: '3 a 6 meses', inversion: '$0', dificultad: 2,
      laptop: 'Modelas y pruebas el diseño en Blender o FreeCAD.',
      software: ['FreeCAD o Blender', 'Cults3D, Printables y MyMiniFactory'],
      pasos: [
        'Diseña cosas que tú mismo usarías: organizadores, soportes, repuestos comunes.',
        'Publica 30 modelos antes de juzgar: las ventas llegan con el catálogo.',
        'Haz las fotos con renders limpios: en estas tiendas, la imagen vende.',
        'Lo que más se descarga, conviértelo en paquetes.'
      ],
      vender: ['Cults3D', 'Printables', 'MyMiniFactory'],
      ojo: 'Nada con marcas registradas (logos, personajes, aeronaves de marca) sin licencia: te pueden bajar la tienda.',
      sinergia: 'Se alimenta de lo que diseñes para clientes de CAD.',
      fuente: 'Tarifa sugerida; la tienda se queda con una parte de cada venta.', url: '' },

    { id: 'assets', cat: 'pasivo', ico: '🧱', t: 'Modelos y materiales para tiendas de 3D',
      gancho: 'Modelos y texturas para videojuegos, render y arquitectura en Fab (de Epic) y CGTrader.',
      precio: [10, 40], por: 'por venta', unidades: [5, 30], de: 'ventas al mes (con 50 piezas o más)', horas: 0.1, comision: 0.12, pasivo: true,
      primer: '6 a 12 meses', inversion: '$0', dificultad: 3,
      laptop: 'Renderizas las vistas previas y pruebas los modelos en Unreal.',
      software: ['Blender', 'Unreal Engine para probar', 'Substance o texturas de Poly Haven'],
      pasos: [
        'Elige un nicho estrecho y con demanda: piezas industriales, herramientas de taller, cabinas.',
        'Publica en paquetes temáticos, no piezas sueltas.',
        'Reaprovecha lo que modeles para tus clientes, si el contrato lo permite.'
      ],
      vender: ['Fab (Epic Games)', 'CGTrader', 'Sketchfab Store'],
      ojo: 'Es el ingreso más lento de la lista: trátalo como un ahorro a largo plazo, no como el ingreso de la Fase 1.',
      sinergia: 'Usa los modelos que ya hiciste para render y animación.',
      fuente: 'Tarifa sugerida; Fab le paga al creador el 88 % de cada venta.', url: '' }
  ],

  noConviene: [
    { t: 'Rentar tu GPU en Vast.ai o Salad', d: 'Pagan poco por una GPU de laptop, la tienen al 100 % horas seguidas y tu laptop no está hecha para eso: desgaste de ventiladores y batería por centavos.' },
    { t: 'Minar criptomonedas', d: 'Con la luz que pagas y el desgaste del equipo, no sale. Y Ethereum ya no se mina desde 2022.' },
    { t: 'Canales «faceless» hechos en masa con IA', d: 'YouTube no monetiza el contenido repetitivo o inauténtico. Es tiempo tirado y te puede cerrar el canal.' },
    { t: 'Cursos de «hazte rico con tu laptop»', d: 'Si alguien gana más vendiendo el curso que haciendo lo que enseña, ya sabes cuál es su negocio.' }
  ],

  antes: [
    { t: 'Tu contrato con ALTEN', d: 'Antes del primer cliente, revisa exclusividad, conflicto de interés y propiedad intelectual. Nunca uses horas, equipo ni información de ALTEN o de sus clientes, y no trabajes para un competidor de ellos.' },
    { t: 'El SAT', d: 'Si cobras, facturas. Para empezar solo, persona física y, con ingresos bajos, el RESICO: está desglosado en Mis Metas → Empresa ya creada. Lo que cobras en dólares también se declara.' },
    { t: 'Cobrar en dólares', d: 'Upwork y Fiverr pagan a tu cuenta con comisión; Wise o Payoneer suelen dar mejor tipo de cambio que PayPal. Compara antes de elegir.' },
    { t: 'Licencias del software', d: 'Blender, DaVinci Resolve, FreeCAD y Whisper permiten uso comercial. Fusion 360 Personal no. En IA, usa modelos con licencia comercial.' },
    { t: 'Cuando llegues a Alemania', d: 'Con permiso de estudiante, trabajar por tu cuenta necesita autorización de la oficina de extranjería, aunque el cliente esté en México. Pídela antes, o pausa los clientes.' }
  ],

  cuidado: [
    { t: 'El modo correcto', d: 'En Armoury Crate, «Rendimiento» para renders largos; «Turbo» solo conectada y bien ventilada.' },
    { t: 'Que respire', d: 'Sobre una base elevada o con ventilador, nunca sobre la cama ni sobre las piernas en un render largo.' },
    { t: 'La batería', d: 'Activa la carga al 80 % en Armoury Crate: si vive conectada, dura años más.' },
    { t: 'La pantalla OLED', d: 'Deja activas las protecciones de OLED de Armoury Crate y oculta la barra de tareas: una imagen fija por horas puede quedarse marcada.' },
    { t: 'Renders de noche', d: 'Renderiza la animación como imágenes sueltas, no directo a video: si algo falla a las 3 a. m., retomas donde se quedó.' },
    { t: 'Respaldos', d: 'Los proyectos de clientes, en un disco externo y en la nube. Un disco perdido es un cliente perdido.' }
  ],

  // La ruta de 90 días de la primera apuesta: semana a semana, con lo que queda hecho.
  ruta: {
    para: 'render-producto',
    tramos: [
      { s: 'Semanas 1 y 2', t: 'Blender desde cero', d: 'El tutorial de la dona de Blender Guru, completo. Al terminar: modelas, texturizas y renderizas un objeto simple.' },
      { s: 'Semanas 3 y 4', t: 'Luz de estudio', d: 'Renderiza tres productos de tu casa (una botella, unos audífonos, una caja) con luz de estudio y fondo limpio.' },
      { s: 'Semanas 5 y 6', t: 'Heliescala, tu portafolio', d: 'Cinco réplicas de tu papá en render y un giro de 360°. Publícalo en Behance y dáselo a Posts.' },
      { s: 'Semanas 7 y 8', t: 'Salir a vender', d: 'Servicio en Fiverr con 3 paquetes y 20 mensajes directos a marcas con un render de su producto.' },
      { s: 'Semanas 9 a 12', t: 'Los primeros pagos', d: 'Tres trabajos cobrados y tres reseñas. Con eso, sube el precio y suma las animaciones.' }
    ]
  }
};
