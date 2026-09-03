// El vocabulario de alemán. Vive aquí, en la app de Alemán, porque esta es la
// pantalla donde Adán trabaja el vocabulario; la de Alemán del Dashboard lo refleja.
// Las dos cargan este archivo: copiarlo en las dos era garantizar que corregir una
// palabra en un sitio dejara el otro mintiendo.
//
//   cats  las 23 secciones, con su etiqueta, su emoji y sus SUBsecciones
//   voc   las 603 palabras
//   partizip  el tema de gramática, por bloques
//
// UNA PALABRA. Solo `de`, `es` y `cat` son obligatorios; el resto se pinta si está:
//
//   art   der/die/das/pl. o '-' — de ahí sale el color con el que se ve el género
//   de    la palabra    es  la traducción    ex  el ejemplo    cat  la sección
//   sub   la subsección (debe existir en cats[cat].subs)
//   niv   A1 / A2 / B1        tipo  sust | verbo | adj | adv | num | frase
//   pl    el plural           gen   la terminación de genitivo
//   conj  presente 3ª · Präteritum · Partizip II       aux  hat / ist
//   reg   el régimen: qué preposición pide y en qué caso
//   comp  comparativo y superlativo
//   tag   lo que se sale de lo normal: irregular, separable, incontable…
//   uso   cuándo se dice, o el fallo típico
//
// AÑADIR UNA PALABRA es una línea más en `voc` con su `cat` y su `sub`. Añadir una
// SUBSECCIÓN es una entrada más en `subs` de esa sección. No hay que tocar ningún
// HTML: los controles 19 y 20 de Dashboard/verificar-sincronia.js lo comprueban.
const ALEMAN_VOCAB = {
  cats: {
    saludos: {
      label: 'Saludos', icon: '\ud83d\udc4b',
      subs: {
        hola: 'Saludar y despedirse',
        cortesia: 'Cortes\u00eda',
        presentar: 'Presentarse y preguntar',
        desear: 'Buenos deseos',
      },
    },
    frases: {
      label: 'Armar frases', icon: '\ud83e\uddf1',
      subs: {
        modales: 'Poder, deber, querer',
        preguntar: 'Preguntar',
        unir: 'Unir ideas',
        personas: 'Yo, t\u00fa, \u00e9l',
        sitio: 'D\u00f3nde y cu\u00e1ndo',
        negar: 'Negar y matizar',
      },
    },
    numeros: {
      label: 'N\u00fameros', icon: '\ud83d\udd22',
      subs: {
        cardinales: 'Del 0 al 12',
        decenas: 'Decenas y cientos',
        ordinales: 'Ordinales y fracciones',
        cantidad: 'Medir y contar',
      },
    },
    colores: {
      label: 'Colores', icon: '\ud83c\udfa8',
      subs: {
        basicos: 'Los b\u00e1sicos',
        matices: 'Matices y met\u00e1licos',
        tono: 'Claro y oscuro',
      },
    },
    tiempo: {
      label: 'Tiempo', icon: '\ud83d\udcc5',
      subs: {
        dias: 'D\u00edas de la semana',
        meses: 'Meses',
        estaciones: 'Estaciones',
        periodos: 'Periodos y fechas',
      },
    },
    familia: {
      label: 'Familia', icon: '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67',
      subs: {
        nucleo: 'Familia directa',
        extensa: 'Familia extensa',
        politica: 'Familia pol\u00edtica',
        estado: 'Pareja y estado civil',
      },
    },
    cuerpo: {
      label: 'Cuerpo', icon: '\ud83e\udec0',
      subs: {
        cabeza: 'Cabeza y cara',
        tronco: 'Tronco',
        extremidades: 'Brazos y piernas',
        interior: 'Por dentro',
      },
    },
    ropa: {
      label: 'Ropa', icon: '\ud83d\udc55',
      subs: {
        prendas: 'Prendas',
        abrigo: 'Abrigo y fr\u00edo',
        calzado: 'Calzado',
        complementos: 'Complementos',
        compra: 'Al comprar ropa',
      },
    },
    comida: {
      label: 'Comida', icon: '\ud83c\udf7d\ufe0f',
      subs: {
        frutas: 'Frutas y verduras',
        carnes: 'Carnes y pescado',
        lacteos: 'L\u00e1cteos y panader\u00eda',
        basicos: 'B\u00e1sicos de despensa',
        bebidas: 'Bebidas',
        comidas: 'Las comidas del d\u00eda',
        sabor: 'Sabores y dietas',
      },
    },
    casa: {
      label: 'Casa', icon: '\ud83c\udfe0',
      subs: {
        vivienda: 'La vivienda',
        estancias: 'Las estancias',
        muebles: 'Muebles y objetos',
        estructura: 'Puertas, paredes y suelos',
        electrodomesticos: 'Electrodom\u00e9sticos',
        alquiler: 'Alquiler y vecinos',
      },
    },
    ciudad: {
      label: 'Ciudad', icon: '\ud83c\udfd9\ufe0f',
      subs: {
        lugares: 'Lugares de la ciudad',
        servicios: 'Servicios y comercios',
        transporte: 'Transporte',
        trafico: 'Tr\u00e1fico y circulaci\u00f3n',
        orientarse: 'Orientarse',
      },
    },
    trabajo: {
      label: 'Trabajo', icon: '\ud83d\udcbc',
      subs: {
        puesto: 'El puesto y la empresa',
        personas: 'Personas del trabajo',
        buscar: 'Buscar empleo',
        estudios: 'Formaci\u00f3n',
        condiciones: 'Jornada, sueldo y contrato',
      },
    },
    naturaleza: {
      label: 'Naturaleza', icon: '\ud83c\udf3f',
      subs: {
        clima: 'El clima',
        paisaje: 'Paisaje y accidentes',
        vida: 'Plantas y animales',
        cielo: 'El cielo',
        medioambiente: 'Medio ambiente',
      },
    },
    hobbies: {
      label: 'Hobbies', icon: '\ud83c\udfb2',
      subs: {
        tiempo: 'Tiempo libre',
        deporte: 'Deporte',
        musica: 'M\u00fasica',
        arte: 'Arte y manualidades',
        juegos: 'Juegos',
        aire: 'Al aire libre',
        casa: 'En casa',
        salir: 'Salir',
      },
    },
    verbos: {
      label: 'Verbos', icon: '\u2699\ufe0f',
      subs: {
        esenciales: 'Los imprescindibles',
        movimiento: 'Movimiento',
        rutina: 'Rutina diaria',
        comunicar: 'Comunicarse',
        pensar: 'Pensar y sentir',
        dar: 'Dar, tomar y buscar',
        empezar: 'Empezar y terminar',
        compra: 'Comprar y pedir',
      },
    },
    adjetivos: {
      label: 'Adjetivos', icon: '\ud83c\udfaf',
      subs: {
        tamano: 'Tama\u00f1o y cantidad',
        valor: 'Bueno, malo y bonito',
        estado: 'C\u00f3mo te encuentras',
        caracter: 'Car\u00e1cter',
        espacio: 'Espacio y tiempo',
        juicio: 'Correcto, libre, limpio',
      },
    },
    viaje: {
      label: 'Viajes', icon: '\u2708\ufe0f',
      subs: {
        transporte: 'Aeropuerto y billetes',
        alojamiento: 'Alojamiento',
        documentos: 'Documentos y fronteras',
        equipaje: 'Equipaje',
        turismo: 'Hacer turismo',
        problemas: 'Cuando algo sale mal',
      },
    },
    emociones: {
      label: 'Emociones', icon: '\ud83d\ude0a',
      subs: {
        positivas: 'Positivas',
        negativas: 'Negativas',
        tension: 'Tensi\u00f3n y calma',
        hacia: 'Hacia otros',
      },
    },
    tecnologia: {
      label: 'Tecnolog\u00eda', icon: '\ud83d\udcf1',
      subs: {
        aparatos: 'Aparatos',
        internet: 'Internet y conexi\u00f3n',
        cuentas: 'Cuentas y mensajes',
        acciones: 'Qu\u00e9 se hace con ellos',
      },
    },
    animales: {
      label: 'Animales', icon: '\ud83d\udc3e',
      subs: {
        casa: 'En casa',
        granja: 'De granja',
        salvajes: 'Salvajes',
        pequenos: 'Peque\u00f1os',
        agua: 'En el agua',
      },
    },
    compras: {
      label: 'Compras', icon: '\ud83d\uded2',
      subs: {
        tienda: 'La tienda',
        pagar: 'Pagar',
        precios: 'Precios y ofertas',
        acciones: 'Qu\u00e9 se hace en la tienda',
      },
    },
    escuela: {
      label: 'Escuela', icon: '\ud83c\udf93',
      subs: {
        personas: 'Personas y lugares',
        material: 'Material',
        tareas: 'Tareas y notas',
        aprender: 'Aprender',
      },
    },
    adverbios: {
      label: 'Adverbios', icon: '\u23f1\ufe0f',
      subs: {
        frecuencia: 'Con qu\u00e9 frecuencia',
        momento: 'Cu\u00e1ndo',
        orden: 'En qu\u00e9 orden',
      },
    },
  },

  voc: [

    // ── SALUDOS ─────────────────────────────────
    //    Saludar y despedirse
    {art:'-', de:'Hallo', es:'Hola', ex:'Hallo! Wie geht\'s?', cat:'saludos', sub:'hola', niv:'A1', tipo:'frase', uso:'informal, a cualquier hora', esEx:'\u00a1Hola! \u00bfQu\u00e9 tal?'},
    {art:'-', de:'Guten Morgen', es:'Buenos d\u00edas', ex:'Guten Morgen! Haben Sie gut geschlafen?', cat:'saludos', sub:'hola', niv:'A1', tipo:'frase', uso:'hasta las 11 aprox.', esEx:'\u00a1Buenos d\u00edas! \u00bfHa dormido bien?'},
    {art:'-', de:'Guten Tag', es:'Buenos d\u00edas / Buenas tardes', ex:'Guten Tag, Frau M\u00fcller.', cat:'saludos', sub:'hola', niv:'A1', tipo:'frase', uso:'formal, de d\u00eda', esEx:'Buenos d\u00edas, se\u00f1ora M\u00fcller.'},
    {art:'-', de:'Guten Abend', es:'Buenas noches (saludo)', ex:'Guten Abend, wie war Ihr Tag?', cat:'saludos', sub:'hola', niv:'A1', tipo:'frase', uso:'al llegar, de noche', esEx:'Buenas noches, \u00bfqu\u00e9 tal su d\u00eda?'},
    {art:'-', de:'Gute Nacht', es:'Buenas noches (despedida)', ex:'Gute Nacht! Schlaf gut.', cat:'saludos', sub:'hola', niv:'A1', tipo:'frase', uso:'al irse a dormir', esEx:'\u00a1Buenas noches! Que duermas bien.'},
    {art:'-', de:'Tsch\u00fcss / Auf Wiedersehen', es:'Adi\u00f3s / Hasta luego', ex:'Tsch\u00fcss! Bis morgen!', cat:'saludos', sub:'hola', niv:'A1', tipo:'frase', uso:'informal / formal', esEx:'\u00a1Adi\u00f3s! \u00a1Hasta ma\u00f1ana!'},
    {art:'-', de:'Willkommen!', es:'\u00a1Bienvenido/a!', ex:'Willkommen in Deutschland!', cat:'saludos', sub:'hola', niv:'A1', tipo:'frase', esEx:'\u00a1Bienvenido a Alemania!'},
    //    Cortesía
    {art:'-', de:'Bitte', es:'Por favor / De nada', ex:'K\u00f6nnen Sie mir helfen, bitte?', cat:'saludos', sub:'cortesia', niv:'A1', tipo:'frase', uso:'tambi\u00e9n \u00abde nada\u00bb al agradecer', esEx:'\u00bfPuede ayudarme, por favor?'},
    {art:'-', de:'Danke / Danke sch\u00f6n', es:'Gracias / Muchas gracias', ex:'Danke sch\u00f6n f\u00fcr Ihre Hilfe!', cat:'saludos', sub:'cortesia', niv:'A1', tipo:'frase', esEx:'\u00a1Muchas gracias por su ayuda!'},
    {art:'-', de:'Entschuldigung', es:'Disculpe / Perd\u00f3n', ex:'Entschuldigung, wo ist der Bahnhof?', cat:'saludos', sub:'cortesia', niv:'A1', tipo:'frase', uso:'para pedir paso o disculparse', esEx:'Disculpe, \u00bfd\u00f3nde est\u00e1 la estaci\u00f3n?'},
    {art:'-', de:'Es tut mir leid', es:'Lo siento', ex:'Es tut mir leid, ich habe einen Fehler gemacht.', cat:'saludos', sub:'cortesia', niv:'A1', tipo:'frase', uso:'lamentar de verdad', esEx:'Lo siento, comet\u00ed un error.'},
    {art:'-', de:'Ja / Nein', es:'S\u00ed / No', ex:'Ja, ich spreche Deutsch. Nein, danke.', cat:'saludos', sub:'cortesia', niv:'A1', tipo:'frase', esEx:'S\u00ed, hablo alem\u00e1n. No, gracias.'},
    //    Presentarse y preguntar
    {art:'-', de:'Wie hei\u00dfen Sie?', es:'\u00bfC\u00f3mo se llama usted?', ex:'Wie hei\u00dfen Sie? \u2014 Ich hei\u00dfe Ana.', cat:'saludos', sub:'presentar', niv:'A1', tipo:'frase', uso:'formal; informal: Wie hei\u00dft du?', esEx:'\u00bfC\u00f3mo se llama usted? \u2014 Me llamo Ana.'},
    {art:'-', de:'Woher kommen Sie?', es:'\u00bfDe d\u00f3nde es usted?', ex:'Woher kommen Sie? \u2014 Aus Mexiko.', cat:'saludos', sub:'presentar', niv:'A1', tipo:'frase', esEx:'\u00bfDe d\u00f3nde es usted? \u2014 De M\u00e9xico.'},
    {art:'-', de:'Wie geht es Ihnen?', es:'\u00bfC\u00f3mo est\u00e1 usted?', ex:'Wie geht es Ihnen? \u2014 Gut, danke!', cat:'saludos', sub:'presentar', niv:'A1', tipo:'frase', uso:'formal; informal: Wie geht\'s?', esEx:'\u00bfC\u00f3mo est\u00e1 usted? \u2014 Bien, \u00a1gracias!'},
    {art:'-', de:'Ich verstehe nicht', es:'No entiendo', ex:'Entschuldigung, ich verstehe nicht. K\u00f6nnen Sie das wiederholen?', cat:'saludos', sub:'presentar', niv:'A1', tipo:'frase', esEx:'Disculpe, no entiendo. \u00bfPuede repetirlo?'},
    {art:'-', de:'Sprechen Sie Englisch?', es:'\u00bfHabla ingl\u00e9s?', ex:'Sprechen Sie Englisch? Mein Deutsch ist noch nicht gut.', cat:'saludos', sub:'presentar', niv:'A1', tipo:'frase', esEx:'\u00bfHabla ingl\u00e9s? Mi alem\u00e1n todav\u00eda no es bueno.'},
    {art:'-', de:'Wie war dein Tag?', es:'\u00bfC\u00f3mo estuvo tu d\u00eda?', ex:'Hallo! Wie war dein Tag?', cat:'saludos', sub:'presentar', niv:'A2', tipo:'frase', uso:'informal', esEx:'\u00a1Hola! \u00bfC\u00f3mo estuvo tu d\u00eda?'},
    {art:'-', de:'Sch\u00f6n, dich/Sie kennenzulernen', es:'Un placer conocerte/conocerle', ex:'Sch\u00f6n, Sie kennenzulernen, Herr Klein.', cat:'saludos', sub:'presentar', niv:'A2', tipo:'frase', esEx:'Un placer conocerle, se\u00f1or Klein.'},
    //    Buenos deseos
    {art:'-', de:'Viel Gl\u00fcck!', es:'\u00a1Buena suerte!', ex:'Viel Gl\u00fcck bei der Pr\u00fcfung!', cat:'saludos', sub:'desear', niv:'A1', tipo:'frase', esEx:'\u00a1Buena suerte en el examen!'},
    {art:'-', de:'Alles Gute!', es:'\u00a1Todo lo mejor! / \u00a1Que te vaya bien!', ex:'Alles Gute zum Geburtstag!', cat:'saludos', sub:'desear', niv:'A1', tipo:'frase', uso:'cumplea\u00f1os, despedidas', esEx:'\u00a1Feliz cumplea\u00f1os!'},
    {art:'-', de:'Herzlichen Gl\u00fcckwunsch!', es:'\u00a1Felicidades!', ex:'Herzlichen Gl\u00fcckwunsch zur neuen Arbeit!', cat:'saludos', sub:'desear', niv:'A1', tipo:'frase', esEx:'\u00a1Felicidades por el nuevo trabajo!'},
    {art:'-', de:'Prost! / Zum Wohl!', es:'\u00a1Salud!', ex:'Prost! Auf unsere Freundschaft!', cat:'saludos', sub:'desear', niv:'A1', tipo:'frase', uso:'al brindar', esEx:'\u00a1Salud! \u00a1Por nuestra amistad!'},
    {art:'-', de:'Guten Appetit!', es:'\u00a1Buen provecho!', ex:'Guten Appetit! Lass es dir schmecken.', cat:'saludos', sub:'desear', niv:'A1', tipo:'frase', uso:'al sentarse a la mesa', esEx:'\u00a1Buen provecho! Que lo disfrutes.'},

    // ── ARMAR FRASES ─────────────────────────────────
    //    Poder, deber, querer
    {art:'-', de:'k\u00f6nnen', es:'poder / saber hacer', ex:'Ich kann gut schwimmen.', cat:'frases', sub:'modales', niv:'A1', tipo:'verbo', conj:'kann \u00b7 konnte \u00b7 gekonnt', aux:'hat', tag:'modal \u00b7 irregular', uso:'el otro verbo se va al FINAL y en infinitivo: ich kann \u2026 schwimmen', esEx:'S\u00e9 nadar bien.'},
    {art:'-', de:'m\u00fcssen', es:'tener que', ex:'Ich muss morgen fr\u00fch aufstehen.', cat:'frases', sub:'modales', niv:'A1', tipo:'verbo', conj:'muss \u00b7 musste \u00b7 gemusst', aux:'hat', tag:'modal \u00b7 irregular', uso:'\u00abno tener que\u00bb es nicht m\u00fcssen; nicht d\u00fcrfen es \u00abno estar permitido\u00bb', esEx:'Ma\u00f1ana tengo que levantarme temprano.'},
    {art:'-', de:'wollen', es:'querer', ex:'Ich will Deutsch lernen.', cat:'frases', sub:'modales', niv:'A1', tipo:'verbo', conj:'will \u00b7 wollte \u00b7 gewollt', aux:'hat', tag:'modal \u00b7 irregular', uso:'suena directo; para pedir algo se usa m\u00f6chten', esEx:'Quiero aprender alem\u00e1n.'},
    {art:'-', de:'d\u00fcrfen', es:'tener permiso', ex:'Darf ich hier rauchen?', cat:'frases', sub:'modales', niv:'A1', tipo:'verbo', conj:'darf \u00b7 durfte \u00b7 gedurft', aux:'hat', tag:'modal \u00b7 irregular', uso:'es el permiso, no la capacidad: eso es k\u00f6nnen', esEx:'\u00bfPuedo fumar aqu\u00ed?'},
    {art:'-', de:'sollen', es:'deber / se supone que', ex:'Was soll ich machen?', cat:'frases', sub:'modales', niv:'A2', tipo:'verbo', conj:'soll \u00b7 sollte \u00b7 gesollt', aux:'hat', tag:'modal', uso:'es lo que otro espera de ti; m\u00fcssen es la obligaci\u00f3n', esEx:'\u00bfQu\u00e9 debo hacer?'},
    {art:'-', de:'Ich h\u00e4tte gern', es:'quisiera', ex:'Ich h\u00e4tte gern einen Kaffee, bitte.', cat:'frases', sub:'modales', niv:'A1', tipo:'frase', uso:'la forma m\u00e1s educada de pedir algo en una tienda o un bar', esEx:'Quisiera un caf\u00e9, por favor.'},
    //    Preguntar
    {art:'-', de:'wer', es:'qui\u00e9n', ex:'Wer ist das?', cat:'frases', sub:'preguntar', niv:'A1', tipo:'adv', uso:'wer = qui\u00e9n; wo = d\u00f3nde. Es al rev\u00e9s que en ingl\u00e9s', esEx:'\u00bfQui\u00e9n es ese?'},
    {art:'-', de:'was', es:'qu\u00e9', ex:'Was machst du beruflich?', cat:'frases', sub:'preguntar', niv:'A1', tipo:'adv', esEx:'\u00bfA qu\u00e9 te dedicas?'},
    {art:'-', de:'wo', es:'d\u00f3nde', ex:'Wo wohnst du?', cat:'frases', sub:'preguntar', niv:'A1', tipo:'adv', esEx:'\u00bfD\u00f3nde vives?'},
    {art:'-', de:'wohin', es:'a d\u00f3nde', ex:'Wohin gehst du?', cat:'frases', sub:'preguntar', niv:'A1', tipo:'adv', uso:'wo es estar; wohin, ir hacia; woher, venir de', esEx:'\u00bfA d\u00f3nde vas?'},
    {art:'-', de:'woher', es:'de d\u00f3nde', ex:'Woher kommst du?', cat:'frases', sub:'preguntar', niv:'A1', tipo:'adv', esEx:'\u00bfDe d\u00f3nde eres?'},
    {art:'-', de:'wann', es:'cu\u00e1ndo', ex:'Wann beginnt der Kurs?', cat:'frases', sub:'preguntar', niv:'A1', tipo:'adv', esEx:'\u00bfCu\u00e1ndo empieza el curso?'},
    {art:'-', de:'warum', es:'por qu\u00e9', ex:'Warum lernst du Deutsch?', cat:'frases', sub:'preguntar', niv:'A1', tipo:'adv', uso:'se responde con weil, y weil manda el verbo al final', esEx:'\u00bfPor qu\u00e9 aprendes alem\u00e1n?'},
    {art:'-', de:'wie', es:'c\u00f3mo', ex:'Wie sagt man das auf Deutsch?', cat:'frases', sub:'preguntar', niv:'A1', tipo:'adv', esEx:'\u00bfC\u00f3mo se dice eso en alem\u00e1n?'},
    {art:'-', de:'wie viel / wie viele', es:'cu\u00e1nto / cu\u00e1ntos', ex:'Wie viel kostet das?', cat:'frases', sub:'preguntar', niv:'A1', tipo:'adv', uso:'wie viel para lo incontable, wie viele para lo que se cuenta', esEx:'\u00bfCu\u00e1nto cuesta eso?'},
    {art:'-', de:'welcher / welche / welches', es:'cu\u00e1l / qu\u00e9', ex:'Welche Farbe magst du?', cat:'frases', sub:'preguntar', niv:'A2', tipo:'adv', tag:'se declina', uso:'cambia seg\u00fan el g\u00e9nero y el caso, como der/die/das', esEx:'\u00bfQu\u00e9 color te gusta?'},
    {art:'-', de:'wie lange', es:'cu\u00e1nto tiempo', ex:'Wie lange wohnst du schon hier?', cat:'frases', sub:'preguntar', niv:'A2', tipo:'adv', esEx:'\u00bfCu\u00e1nto tiempo llevas viviendo aqu\u00ed?'},
    //    Unir ideas
    {art:'-', de:'und', es:'y', ex:'Ich lerne Deutsch und Englisch.', cat:'frases', sub:'unir', niv:'A1', tipo:'adv', uso:'no cambia el orden de la frase', esEx:'Estudio alem\u00e1n e ingl\u00e9s.'},
    {art:'-', de:'oder', es:'o', ex:'Kaffee oder Tee?', cat:'frases', sub:'unir', niv:'A1', tipo:'adv', esEx:'\u00bfCaf\u00e9 o t\u00e9?'},
    {art:'-', de:'aber', es:'pero', ex:'Deutsch ist schwer, aber ich mag es.', cat:'frases', sub:'unir', niv:'A1', tipo:'adv', uso:'no cambia el orden', esEx:'El alem\u00e1n es dif\u00edcil, pero me gusta.'},
    {art:'-', de:'denn', es:'porque / pues', ex:'Ich bleibe zu Hause, denn ich bin m\u00fcde.', cat:'frases', sub:'unir', niv:'A2', tipo:'adv', uso:'mismo sentido que weil pero NO manda el verbo al final', esEx:'Me quedo en casa porque estoy cansado.'},
    {art:'-', de:'weil', es:'porque', ex:'Ich lerne Deutsch, weil ich in Deutschland arbeiten will.', cat:'frases', sub:'unir', niv:'A1', tipo:'adv', tag:'verbo al final', uso:'es el conector que m\u00e1s se equivoca: manda el verbo conjugado al final', esEx:'Aprendo alem\u00e1n porque quiero trabajar en Alemania.'},
    {art:'-', de:'dass', es:'que', ex:'Ich glaube, dass er recht hat.', cat:'frases', sub:'unir', niv:'A2', tipo:'adv', tag:'verbo al final', uso:'con dos eses; das con una es el art\u00edculo', esEx:'Creo que \u00e9l tiene raz\u00f3n.'},
    {art:'-', de:'wenn', es:'si / cuando', ex:'Wenn es regnet, bleibe ich zu Hause.', cat:'frases', sub:'unir', niv:'A2', tipo:'adv', tag:'verbo al final', uso:'wenn es condici\u00f3n o rutina; als, un momento \u00fanico del pasado', esEx:'Si llueve, me quedo en casa.'},
    {art:'-', de:'deshalb / darum', es:'por eso', ex:'Es regnet, deshalb bleibe ich zu Hause.', cat:'frases', sub:'unir', niv:'A2', tipo:'adv', tag:'el verbo va justo despu\u00e9s', uso:'detr\u00e1s de deshalb viene el verbo, no el sujeto', esEx:'Llueve, por eso me quedo en casa.'},
    {art:'-', de:'trotzdem', es:'aun as\u00ed', ex:'Es regnet. Trotzdem gehe ich laufen.', cat:'frases', sub:'unir', niv:'A2', tipo:'adv', tag:'el verbo va justo despu\u00e9s', esEx:'Llueve. Aun as\u00ed salgo a correr.'},
    {art:'-', de:'obwohl', es:'aunque', ex:'Obwohl es regnet, gehe ich laufen.', cat:'frases', sub:'unir', niv:'B1', tipo:'adv', tag:'verbo al final', esEx:'Aunque llueve, salgo a correr.'},
    {art:'-', de:'sondern', es:'sino', ex:'Ich komme nicht aus Spanien, sondern aus Mexiko.', cat:'frases', sub:'unir', niv:'A2', tipo:'adv', uso:'solo despu\u00e9s de una negaci\u00f3n; si no, es aber', esEx:'No soy de Espa\u00f1a, sino de M\u00e9xico.'},
    {art:'-', de:'also', es:'as\u00ed que / entonces', ex:'Der Zug f\u00e4llt aus, also nehme ich den Bus.', cat:'frases', sub:'unir', niv:'A2', tipo:'adv', uso:'no es \u00abalso\u00bb del ingl\u00e9s: eso es auch', esEx:'El tren se cancel\u00f3, as\u00ed que tomo el autob\u00fas.'},
    //    Yo, tú, él
    {art:'-', de:'ich / du / er / sie / es', es:'yo / t\u00fa / \u00e9l / ella / ello', ex:'Ich bin Ad\u00e1n und sie ist Ana.', cat:'frases', sub:'personas', niv:'A1', tipo:'adv', uso:'el sujeto nunca se omite en alem\u00e1n, a diferencia del espa\u00f1ol', esEx:'Yo soy Ad\u00e1n y ella es Ana.'},
    {art:'-', de:'wir / ihr / sie / Sie', es:'nosotros / ustedes / ellos / usted', ex:'Wir wohnen hier. Woher kommen Sie?', cat:'frases', sub:'personas', niv:'A1', tipo:'adv', uso:'Sie con may\u00fascula es \u00abusted\u00bb, a cualquier hora del texto', esEx:'Nosotros vivimos aqu\u00ed. \u00bfDe d\u00f3nde es usted?'},
    {art:'-', de:'mich / dich / ihn / sie / uns / euch', es:'me / te / lo / la / nos / os', ex:'Kannst du mich h\u00f6ren?', cat:'frases', sub:'personas', niv:'A1', tipo:'adv', tag:'Akkusativ', uso:'el objeto directo: quien recibe la acci\u00f3n', esEx:'\u00bfPuedes o\u00edrme?'},
    {art:'-', de:'mir / dir / ihm / ihr / uns / euch', es:'me / te / le / nos / os', ex:'Kannst du mir helfen?', cat:'frases', sub:'personas', niv:'A1', tipo:'adv', tag:'Dativ', uso:'el objeto indirecto. helfen, danken y gefallen siempre lo piden', esEx:'\u00bfPuedes ayudarme?'},
    {art:'-', de:'mein / dein / sein / ihr / unser', es:'mi / tu / su / nuestro', ex:'Das ist mein Buch und das ist dein Heft.', cat:'frases', sub:'personas', niv:'A1', tipo:'adv', tag:'se declina', uso:'toma la terminaci\u00f3n del sustantivo: mein Buch, meine Tasche', esEx:'Este es mi libro y ese es tu cuaderno.'},
    {art:'-', de:'dieser / diese / dieses', es:'este / esta / esto', ex:'Dieser Kurs ist sehr gut.', cat:'frases', sub:'personas', niv:'A2', tipo:'adv', tag:'se declina', esEx:'Este curso es muy bueno.'},
    {art:'-', de:'man', es:'se (impersonal)', ex:'In Deutschland isst man viel Brot.', cat:'frases', sub:'personas', niv:'A2', tipo:'adv', uso:'no es \u00abhombre\u00bb: es el \u00abse\u00bb impersonal, y va con verbo en 3\u00aa', esEx:'En Alemania se come mucho pan.'},
    {art:'-', de:'jeder / alle', es:'cada uno / todos', ex:'Jeder Tag ist anders. Alle sind da.', cat:'frases', sub:'personas', niv:'A2', tipo:'adv', uso:'jeder va en singular; alle, en plural', esEx:'Cada d\u00eda es distinto. Est\u00e1n todos.'},
    {art:'-', de:'jemand / niemand', es:'alguien / nadie', ex:'Ist jemand zu Hause? \u2014 Nein, niemand.', cat:'frases', sub:'personas', niv:'A2', tipo:'adv', esEx:'\u00bfHay alguien en casa? \u2014 No, nadie.'},
    //    Dónde y cuándo
    {art:'-', de:'in / an / auf', es:'en / junto a / sobre', ex:'Ich bin in der K\u00fcche. Das Bild h\u00e4ngt an der Wand.', cat:'frases', sub:'sitio', niv:'A1', tipo:'adv', tag:'Wechselpr\u00e4position', uso:'con Dativ si es d\u00f3nde est\u00e1s; con Akkusativ si es hacia d\u00f3nde vas', esEx:'Estoy en la cocina. El cuadro cuelga en la pared.'},
    {art:'-', de:'\u00fcber / unter / vor / hinter', es:'encima / debajo / delante / detr\u00e1s', ex:'Die Lampe h\u00e4ngt \u00fcber dem Tisch.', cat:'frases', sub:'sitio', niv:'A1', tipo:'adv', tag:'Wechselpr\u00e4position', esEx:'La l\u00e1mpara cuelga encima de la mesa.'},
    {art:'-', de:'neben / zwischen', es:'al lado de / entre', ex:'Die Bank ist neben der Post.', cat:'frases', sub:'sitio', niv:'A1', tipo:'adv', tag:'Wechselpr\u00e4position', esEx:'El banco est\u00e1 al lado del correo.'},
    {art:'-', de:'mit / ohne', es:'con / sin', ex:'Ich fahre mit dem Bus, ohne meinen Bruder.', cat:'frases', sub:'sitio', niv:'A1', tipo:'adv', tag:'mit + Dat. \u00b7 ohne + Akk.', uso:'mit para el medio de transporte: mit dem Zug', esEx:'Voy en autob\u00fas, sin mi hermano.'},
    {art:'-', de:'f\u00fcr / gegen', es:'para / contra', ex:'Das Geschenk ist f\u00fcr dich.', cat:'frases', sub:'sitio', niv:'A1', tipo:'adv', tag:'Akkusativ', esEx:'El regalo es para ti.'},
    {art:'-', de:'von / zu', es:'de / a', ex:'Ich komme von der Arbeit und gehe zum Arzt.', cat:'frases', sub:'sitio', niv:'A1', tipo:'adv', tag:'Dativ', uso:'zu se contrae: zu dem = zum, zu der = zur', esEx:'Vengo del trabajo y voy al m\u00e9dico.'},
    {art:'-', de:'nach / aus', es:'hacia / de (origen)', ex:'Ich fahre nach Berlin. Ich komme aus Mexiko.', cat:'frases', sub:'sitio', niv:'A1', tipo:'adv', tag:'Dativ', uso:'nach para ciudades y pa\u00edses sin art\u00edculo; in die para los que lo llevan', esEx:'Voy a Berl\u00edn. Soy de M\u00e9xico.'},
    {art:'-', de:'bei', es:'en casa de / en (empresa)', ex:'Ich arbeite bei Bosch und wohne bei meinen Eltern.', cat:'frases', sub:'sitio', niv:'A1', tipo:'adv', tag:'Dativ', esEx:'Trabajo en Bosch y vivo con mis padres.'},
    {art:'-', de:'seit / ab', es:'desde / a partir de', ex:'Ich lerne seit zwei Jahren Deutsch.', cat:'frases', sub:'sitio', niv:'A2', tipo:'adv', tag:'Dativ', uso:'seit es pasado que sigue; ab, futuro', esEx:'Llevo dos a\u00f1os aprendiendo alem\u00e1n.'},
    {art:'-', de:'bis', es:'hasta', ex:'Ich arbeite bis 18 Uhr.', cat:'frases', sub:'sitio', niv:'A1', tipo:'adv', tag:'Akkusativ', esEx:'Trabajo hasta las 18:00.'},
    {art:'-', de:'um', es:'a (la hora) / alrededor de', ex:'Der Kurs beginnt um 9 Uhr.', cat:'frases', sub:'sitio', niv:'A1', tipo:'adv', tag:'Akkusativ', uso:'la hora siempre con um: um acht Uhr', esEx:'El curso empieza a las 9.'},
    {art:'-', de:'durch', es:'por / a trav\u00e9s de', ex:'Wir gehen durch den Park.', cat:'frases', sub:'sitio', niv:'A2', tipo:'adv', tag:'Akkusativ', esEx:'Caminamos por el parque.'},
    {art:'-', de:'w\u00e4hrend', es:'durante', ex:'W\u00e4hrend der Arbeit trinke ich viel Kaffee.', cat:'frases', sub:'sitio', niv:'B1', tipo:'adv', tag:'Genitiv', esEx:'Durante el trabajo tomo mucho caf\u00e9.'},
    //    Negar y matizar
    {art:'-', de:'nicht', es:'no', ex:'Ich verstehe das nicht.', cat:'frases', sub:'negar', niv:'A1', tipo:'adv', uso:'niega el verbo o un adjetivo, y suele ir al final', esEx:'No entiendo eso.'},
    {art:'-', de:'kein / keine', es:'ning\u00fan / ninguna', ex:'Ich habe keine Zeit.', cat:'frases', sub:'negar', niv:'A1', tipo:'adv', tag:'se declina', uso:'para negar un sustantivo. Con nicht ser\u00eda un error: no es \u00abnicht Zeit\u00bb', esEx:'No tengo tiempo.'},
    {art:'-', de:'nichts', es:'nada', ex:'Ich habe nichts gesagt.', cat:'frases', sub:'negar', niv:'A1', tipo:'adv', esEx:'No dije nada.'},
    {art:'-', de:'doch', es:'s\u00ed (al contrario)', ex:'Du kommst nicht mit? \u2014 Doch!', cat:'frases', sub:'negar', niv:'A2', tipo:'adv', uso:'no existe en espa\u00f1ol: es el \u00abs\u00ed\u00bb que contradice una negaci\u00f3n', esEx:'\u00bfNo vienes? \u2014 \u00a1Que s\u00ed!'},
    {art:'-', de:'sehr', es:'muy', ex:'Das ist sehr gut.', cat:'frases', sub:'negar', niv:'A1', tipo:'adv', esEx:'Eso est\u00e1 muy bien.'},
    {art:'-', de:'zu', es:'demasiado', ex:'Der Kaffee ist zu hei\u00df.', cat:'frases', sub:'negar', niv:'A1', tipo:'adv', uso:'el mismo zu de \u00aba\u00bb, pero delante de un adjetivo es \u00abdemasiado\u00bb', esEx:'El caf\u00e9 est\u00e1 demasiado caliente.'},
    {art:'-', de:'ein bisschen / etwas', es:'un poco / algo', ex:'Ich spreche ein bisschen Deutsch.', cat:'frases', sub:'negar', niv:'A1', tipo:'adv', esEx:'Hablo un poco de alem\u00e1n.'},
    {art:'-', de:'viel / wenig', es:'mucho / poco', ex:'Ich habe viel Arbeit und wenig Zeit.', cat:'frases', sub:'negar', niv:'A1', tipo:'adv', uso:'para lo incontable; con lo que se cuenta, viele y wenige', esEx:'Tengo mucho trabajo y poco tiempo.'},
    {art:'-', de:'auch', es:'tambi\u00e9n', ex:'Ich komme auch mit.', cat:'frases', sub:'negar', niv:'A1', tipo:'adv', esEx:'Yo tambi\u00e9n voy.'},
    {art:'-', de:'nur', es:'solo', ex:'Ich habe nur zehn Euro.', cat:'frases', sub:'negar', niv:'A1', tipo:'adv', esEx:'Solo tengo diez euros.'},
    {art:'-', de:'sogar', es:'incluso', ex:'Er spricht sogar Japanisch.', cat:'frases', sub:'negar', niv:'B1', tipo:'adv', esEx:'Incluso habla japon\u00e9s.'},
    {art:'-', de:'vielleicht', es:'quiz\u00e1', ex:'Vielleicht komme ich sp\u00e4ter.', cat:'frases', sub:'negar', niv:'A2', tipo:'adv', esEx:'Quiz\u00e1 venga m\u00e1s tarde.'},
    {art:'-', de:'nat\u00fcrlich / klar', es:'claro / por supuesto', ex:'Kannst du mir helfen? \u2014 Nat\u00fcrlich!', cat:'frases', sub:'negar', niv:'A2', tipo:'adv', esEx:'\u00bfPuedes ayudarme? \u2014 \u00a1Claro!'},
    {art:'-', de:'eigentlich', es:'en realidad', ex:'Eigentlich wollte ich fr\u00fcher kommen.', cat:'frases', sub:'negar', niv:'B1', tipo:'adv', uso:'suaviza lo que viene detr\u00e1s; los alemanes la usan constantemente', esEx:'En realidad quer\u00eda venir antes.'},

    // ── NÚMEROS ─────────────────────────────────
    //    Del 0 al 12
    {art:'-', de:'null', es:'cero (0)', ex:'Meine Nummer ist null-vier-...', cat:'numeros', sub:'cardinales', niv:'A1', tipo:'num', esEx:'Mi n\u00famero es cero-cuatro-\u2026'},
    {art:'-', de:'eins / ein', es:'uno (1)', ex:'Ich habe ein Kind.', cat:'numeros', sub:'cardinales', niv:'A1', tipo:'num', esEx:'Tengo un hijo.'},
    {art:'-', de:'zwei', es:'dos (2)', ex:'Ich brauche zwei Tickets.', cat:'numeros', sub:'cardinales', niv:'A1', tipo:'num', esEx:'Necesito dos boletos.'},
    {art:'-', de:'drei', es:'tres (3)', ex:'In drei Tagen fahre ich nach Berlin.', cat:'numeros', sub:'cardinales', niv:'A1', tipo:'num', esEx:'En tres d\u00edas viajo a Berl\u00edn.'},
    {art:'-', de:'vier', es:'cuatro (4)', ex:'Ich wohne im vierten Stock.', cat:'numeros', sub:'cardinales', niv:'A1', tipo:'num', esEx:'Vivo en el cuarto piso.'},
    {art:'-', de:'f\u00fcnf', es:'cinco (5)', ex:'Die Besprechung ist um f\u00fcnf Uhr.', cat:'numeros', sub:'cardinales', niv:'A1', tipo:'num', esEx:'La reuni\u00f3n es a las cinco.'},
    {art:'-', de:'sechs', es:'seis (6)', ex:'Ich arbeite sechs Stunden am Tag.', cat:'numeros', sub:'cardinales', niv:'A1', tipo:'num', esEx:'Trabajo seis horas al d\u00eda.'},
    {art:'-', de:'sieben', es:'siete (7)', ex:'Die Woche hat sieben Tage.', cat:'numeros', sub:'cardinales', niv:'A1', tipo:'num', esEx:'La semana tiene siete d\u00edas.'},
    {art:'-', de:'acht', es:'ocho (8)', ex:'Ich stehe um acht Uhr auf.', cat:'numeros', sub:'cardinales', niv:'A1', tipo:'num', esEx:'Me levanto a las ocho.'},
    {art:'-', de:'neun', es:'nueve (9)', ex:'Er ist neun Jahre alt.', cat:'numeros', sub:'cardinales', niv:'A1', tipo:'num', esEx:'\u00c9l tiene nueve a\u00f1os.'},
    {art:'-', de:'zehn', es:'diez (10)', ex:'Ich lerne seit zehn Monaten Deutsch.', cat:'numeros', sub:'cardinales', niv:'A1', tipo:'num', esEx:'Llevo diez meses aprendiendo alem\u00e1n.'},
    {art:'-', de:'elf', es:'once (11)', ex:'Der Zug kommt um elf Uhr.', cat:'numeros', sub:'cardinales', niv:'A1', tipo:'num', esEx:'El tren llega a las once.'},
    {art:'-', de:'zw\u00f6lf', es:'doce (12)', ex:'Wir haben zw\u00f6lf Monate im Jahr.', cat:'numeros', sub:'cardinales', niv:'A1', tipo:'num', esEx:'El a\u00f1o tiene doce meses.'},
    //    Decenas y cientos
    {art:'-', de:'f\u00fcnfzehn', es:'quince (15)', ex:'In f\u00fcnfzehn Minuten bin ich da.', cat:'numeros', sub:'decenas', niv:'A1', tipo:'num', esEx:'En quince minutos estoy ah\u00ed.'},
    {art:'-', de:'zwanzig', es:'veinte (20)', ex:'Das kostet zwanzig Euro.', cat:'numeros', sub:'decenas', niv:'A1', tipo:'num', esEx:'Eso cuesta veinte euros.'},
    {art:'-', de:'drei\u00dfig', es:'treinta (30)', ex:'Ich bin drei\u00dfig Jahre alt.', cat:'numeros', sub:'decenas', niv:'A1', tipo:'num', esEx:'Tengo treinta a\u00f1os.'},
    {art:'-', de:'vierzig', es:'cuarenta (40)', ex:'Die Reise dauert vierzig Minuten.', cat:'numeros', sub:'decenas', niv:'A1', tipo:'num', esEx:'El viaje dura cuarenta minutos.'},
    {art:'-', de:'f\u00fcnfzig', es:'cincuenta (50)', ex:'F\u00fcnfzig Prozent ist die H\u00e4lfte.', cat:'numeros', sub:'decenas', niv:'A1', tipo:'num', esEx:'Cincuenta por ciento es la mitad.'},
    {art:'-', de:'sechzig', es:'sesenta (60)', ex:'Eine Stunde hat sechzig Minuten.', cat:'numeros', sub:'decenas', niv:'A1', tipo:'num', esEx:'Una hora tiene sesenta minutos.'},
    {art:'-', de:'siebzig', es:'setenta (70)', ex:'Mein Opa ist siebzig Jahre alt.', cat:'numeros', sub:'decenas', niv:'A1', tipo:'num', esEx:'Mi abuelo tiene setenta a\u00f1os.'},
    {art:'-', de:'achtzig', es:'ochenta (80)', ex:'Das Auto f\u00e4hrt achtzig km/h.', cat:'numeros', sub:'decenas', niv:'A1', tipo:'num', esEx:'El auto va a ochenta km/h.'},
    {art:'-', de:'neunzig', es:'noventa (90)', ex:'Neunzig Prozent der Sch\u00fcler haben bestanden.', cat:'numeros', sub:'decenas', niv:'A1', tipo:'num', esEx:'El noventa por ciento de los alumnos aprob\u00f3.'},
    {art:'-', de:'hundert', es:'cien (100)', ex:'Das Buch hat hundert Seiten.', cat:'numeros', sub:'decenas', niv:'A1', tipo:'num', esEx:'El libro tiene cien p\u00e1ginas.'},
    {art:'-', de:'tausend', es:'mil (1000)', ex:'Die Miete ist tausend Euro.', cat:'numeros', sub:'decenas', niv:'A1', tipo:'num', esEx:'El alquiler es de mil euros.'},
    {art:'die', de:'Million', es:'mill\u00f3n', ex:'Berlin hat \u00fcber drei Millionen Einwohner.', cat:'numeros', sub:'decenas', niv:'A2', tipo:'sust', pl:'Millionen', gen:'-', esEx:'Berl\u00edn tiene m\u00e1s de tres millones de habitantes.'},
    //    Ordinales y fracciones
    {art:'-', de:'erste / zweite', es:'primero / segundo', ex:'Ich wohne im ersten Stock.', cat:'numeros', sub:'ordinales', niv:'A1', tipo:'adj', esEx:'Vivo en el primer piso.'},
    {art:'-', de:'halb', es:'medio / mitad', ex:'Es ist halb zehn.', cat:'numeros', sub:'ordinales', niv:'A1', tipo:'adj', esEx:'Son las nueve y media.'},
    //    Medir y contar
    {art:'das', de:'Prozent', es:'el porcentaje', ex:'F\u00fcnfzig Prozent sind genug.', cat:'numeros', sub:'cantidad', niv:'A2', tipo:'sust', pl:'Prozente', gen:'-s', esEx:'Cincuenta por ciento es suficiente.'},
    {art:'das', de:'Paar', es:'el par', ex:'Ich brauche ein Paar neue Schuhe.', cat:'numeros', sub:'cantidad', niv:'A2', tipo:'sust', pl:'Paare', gen:'-s', esEx:'Necesito un par de zapatos nuevos.'},

    // ── COLORES ─────────────────────────────────
    //    Los básicos
    {art:'-', de:'rot', es:'rojo', ex:'Das Auto ist rot.', cat:'colores', sub:'basicos', niv:'A1', tipo:'adj', comp:'r\u00f6ter \u00b7 am r\u00f6testen', esEx:'El auto es rojo.'},
    {art:'-', de:'blau', es:'azul', ex:'Der Himmel ist blau.', cat:'colores', sub:'basicos', niv:'A1', tipo:'adj', esEx:'El cielo es azul.'},
    {art:'-', de:'gr\u00fcn', es:'verde', ex:'Das Gras ist gr\u00fcn.', cat:'colores', sub:'basicos', niv:'A1', tipo:'adj', esEx:'El pasto es verde.'},
    {art:'-', de:'gelb', es:'amarillo', ex:'Die Banane ist gelb.', cat:'colores', sub:'basicos', niv:'A1', tipo:'adj', esEx:'El pl\u00e1tano es amarillo.'},
    {art:'-', de:'schwarz', es:'negro', ex:'Ich trage ein schwarzes Hemd.', cat:'colores', sub:'basicos', niv:'A1', tipo:'adj', comp:'schw\u00e4rzer \u00b7 am schw\u00e4rzesten', esEx:'Llevo una camisa negra.'},
    {art:'-', de:'wei\u00df', es:'blanco', ex:'Die Wand ist wei\u00df.', cat:'colores', sub:'basicos', niv:'A1', tipo:'adj', esEx:'La pared es blanca.'},
    {art:'-', de:'grau', es:'gris', ex:'Der Himmel ist grau heute.', cat:'colores', sub:'basicos', niv:'A1', tipo:'adj', esEx:'Hoy el cielo est\u00e1 gris.'},
    {art:'-', de:'braun', es:'marr\u00f3n / caf\u00e9', ex:'Der Tisch ist braun.', cat:'colores', sub:'basicos', niv:'A1', tipo:'adj', esEx:'La mesa es caf\u00e9.'},
    //    Matices y metálicos
    {art:'-', de:'orange', es:'naranja', ex:'Die Orange ist orange.', cat:'colores', sub:'matices', niv:'A1', tipo:'adj', tag:'invariable', esEx:'La naranja es naranja.'},
    {art:'-', de:'lila / violett', es:'morado / violeta', ex:'Sie tr\u00e4gt ein lila Kleid.', cat:'colores', sub:'matices', niv:'A2', tipo:'adj', tag:'invariable', esEx:'Ella lleva un vestido morado.'},
    {art:'-', de:'rosa / pink', es:'rosa', ex:'Die Blumen sind rosa.', cat:'colores', sub:'matices', niv:'A1', tipo:'adj', tag:'invariable', esEx:'Las flores son rosas.'},
    {art:'-', de:'t\u00fcrkis', es:'turquesa', ex:'Das Meer ist t\u00fcrkis.', cat:'colores', sub:'matices', niv:'A2', tipo:'adj', esEx:'El mar es turquesa.'},
    {art:'-', de:'silber', es:'plateado', ex:'Ihr Auto ist silber.', cat:'colores', sub:'matices', niv:'A2', tipo:'adj', esEx:'Su auto es plateado.'},
    {art:'-', de:'gold / golden', es:'dorado', ex:'Der Ring ist golden.', cat:'colores', sub:'matices', niv:'A2', tipo:'adj', esEx:'El anillo es dorado.'},
    //    Claro y oscuro
    {art:'-', de:'bunt', es:'colorido / multicolor', ex:'Das Bild ist sehr bunt.', cat:'colores', sub:'tono', niv:'A2', tipo:'adj', esEx:'El cuadro es muy colorido.'},
    {art:'-', de:'hell / dunkel', es:'claro / oscuro', ex:'Ich mag helle Farben, nicht dunkle.', cat:'colores', sub:'tono', niv:'A1', tipo:'adj', uso:'delante del color: hellblau, dunkelgr\u00fcn', esEx:'Me gustan los colores claros, no los oscuros.'},

    // ── TIEMPO ─────────────────────────────────
    //    Días de la semana
    {art:'der', de:'Montag', es:'lunes', ex:'Am Montag habe ich Deutschkurs.', cat:'tiempo', sub:'dias', niv:'A1', tipo:'sust', pl:'Montage', gen:'-s', esEx:'El lunes tengo curso de alem\u00e1n.'},
    {art:'der', de:'Dienstag', es:'martes', ex:'Am Dienstag arbeite ich von zu Hause.', cat:'tiempo', sub:'dias', niv:'A1', tipo:'sust', pl:'Dienstage', gen:'-s', esEx:'El martes trabajo desde casa.'},
    {art:'der', de:'Mittwoch', es:'mi\u00e9rcoles', ex:'Mittwoch ist mein freier Tag.', cat:'tiempo', sub:'dias', niv:'A1', tipo:'sust', pl:'Mittwoche', gen:'-s', esEx:'El mi\u00e9rcoles es mi d\u00eda libre.'},
    {art:'der', de:'Donnerstag', es:'jueves', ex:'Am Donnerstag gehe ich ins Fitnessstudio.', cat:'tiempo', sub:'dias', niv:'A1', tipo:'sust', pl:'Donnerstage', gen:'-s', esEx:'El jueves voy al gimnasio.'},
    {art:'der', de:'Freitag', es:'viernes', ex:'Freitag ist mein Lieblingstag!', cat:'tiempo', sub:'dias', niv:'A1', tipo:'sust', pl:'Freitage', gen:'-s', esEx:'\u00a1El viernes es mi d\u00eda favorito!'},
    {art:'der', de:'Samstag', es:'s\u00e1bado', ex:'Am Samstag schlafe ich lang.', cat:'tiempo', sub:'dias', niv:'A1', tipo:'sust', pl:'Samstage', gen:'-s', esEx:'El s\u00e1bado duermo hasta tarde.'},
    {art:'der', de:'Sonntag', es:'domingo', ex:'Am Sonntag essen wir zusammen.', cat:'tiempo', sub:'dias', niv:'A1', tipo:'sust', pl:'Sonntage', gen:'-s', esEx:'El domingo comemos juntos.'},
    //    Meses
    {art:'der', de:'Januar', es:'enero', ex:'Im Januar ist es sehr kalt.', cat:'tiempo', sub:'meses', niv:'A1', tipo:'sust', pl:'-', gen:'-s', esEx:'En enero hace mucho fr\u00edo.'},
    {art:'der', de:'Februar', es:'febrero', ex:'Im Februar gibt es Karneval.', cat:'tiempo', sub:'meses', niv:'A1', tipo:'sust', pl:'-', gen:'-s', esEx:'En febrero hay carnaval.'},
    {art:'der', de:'M\u00e4rz', es:'marzo', ex:'Im M\u00e4rz beginnt der Fr\u00fchling.', cat:'tiempo', sub:'meses', niv:'A1', tipo:'sust', pl:'-', gen:'-es', esEx:'En marzo empieza la primavera.'},
    {art:'der', de:'April', es:'abril', ex:'Im April regnet es oft.', cat:'tiempo', sub:'meses', niv:'A1', tipo:'sust', pl:'-', gen:'-s', esEx:'En abril llueve a menudo.'},
    {art:'der', de:'Mai', es:'mayo', ex:'Im Mai bl\u00fchen die Blumen.', cat:'tiempo', sub:'meses', niv:'A1', tipo:'sust', pl:'-', gen:'-s', esEx:'En mayo florecen las flores.'},
    {art:'der', de:'Juni', es:'junio', ex:'Im Juni ist es warm.', cat:'tiempo', sub:'meses', niv:'A1', tipo:'sust', pl:'-', gen:'-s', esEx:'En junio hace calor.'},
    {art:'der', de:'Juli', es:'julio', ex:'Im Juli fahren wir in Urlaub.', cat:'tiempo', sub:'meses', niv:'A1', tipo:'sust', pl:'-', gen:'-s', esEx:'En julio nos vamos de vacaciones.'},
    {art:'der', de:'August', es:'agosto', ex:'Im August ist Hochsommer.', cat:'tiempo', sub:'meses', niv:'A1', tipo:'sust', pl:'-', gen:'-s', esEx:'En agosto es pleno verano.'},
    {art:'der', de:'September', es:'septiembre', ex:'Im September beginnt die Schule.', cat:'tiempo', sub:'meses', niv:'A1', tipo:'sust', pl:'-', gen:'-s', esEx:'En septiembre empieza la escuela.'},
    {art:'der', de:'Oktober', es:'octubre', ex:'Im Oktober gibt es das Oktoberfest.', cat:'tiempo', sub:'meses', niv:'A1', tipo:'sust', pl:'-', gen:'-s', esEx:'En octubre est\u00e1 el Oktoberfest.'},
    {art:'der', de:'November', es:'noviembre', ex:'Im November wird es dunkel.', cat:'tiempo', sub:'meses', niv:'A1', tipo:'sust', pl:'-', gen:'-s', esEx:'En noviembre oscurece.'},
    {art:'der', de:'Dezember', es:'diciembre', ex:'Im Dezember feiern wir Weihnachten.', cat:'tiempo', sub:'meses', niv:'A1', tipo:'sust', pl:'-', gen:'-s', esEx:'En diciembre celebramos la Navidad.'},
    //    Estaciones
    {art:'der', de:'Fr\u00fchling', es:'primavera', ex:'Im Fr\u00fchling wird es w\u00e4rmer.', cat:'tiempo', sub:'estaciones', niv:'A1', tipo:'sust', pl:'Fr\u00fchlinge', gen:'-s', esEx:'En primavera empieza a hacer m\u00e1s calor.'},
    {art:'der', de:'Sommer', es:'verano', ex:'Im Sommer fahre ich ans Meer.', cat:'tiempo', sub:'estaciones', niv:'A1', tipo:'sust', pl:'Sommer', gen:'-s', esEx:'En verano voy al mar.'},
    {art:'der', de:'Herbst', es:'oto\u00f1o', ex:'Im Herbst fallen die Bl\u00e4tter.', cat:'tiempo', sub:'estaciones', niv:'A1', tipo:'sust', pl:'Herbste', gen:'-es', esEx:'En oto\u00f1o se caen las hojas.'},
    {art:'der', de:'Winter', es:'invierno', ex:'Im Winter schneit es in Deutschland.', cat:'tiempo', sub:'estaciones', niv:'A1', tipo:'sust', pl:'Winter', gen:'-s', esEx:'En invierno nieva en Alemania.'},
    //    Periodos y fechas
    {art:'-', de:'heute / gestern / morgen', es:'hoy / ayer / ma\u00f1ana', ex:'Heute lerne ich, gestern habe ich gearbeitet.', cat:'tiempo', sub:'periodos', niv:'A1', tipo:'adv', esEx:'Hoy estudio, ayer trabaj\u00e9.'},
    {art:'die', de:'Woche', es:'la semana', ex:'Diese Woche habe ich viel zu tun.', cat:'tiempo', sub:'periodos', niv:'A1', tipo:'sust', pl:'Wochen', gen:'-', esEx:'Esta semana tengo mucho que hacer.'},
    {art:'der', de:'Monat', es:'el mes', ex:'N\u00e4chsten Monat fahre ich nach Berlin.', cat:'tiempo', sub:'periodos', niv:'A1', tipo:'sust', pl:'Monate', gen:'-s', esEx:'El mes que viene voy a Berl\u00edn.'},
    {art:'das', de:'Jahr', es:'el a\u00f1o', ex:'Dieses Jahr lerne ich viel Deutsch.', cat:'tiempo', sub:'periodos', niv:'A1', tipo:'sust', pl:'Jahre', gen:'-es', esEx:'Este a\u00f1o estoy aprendiendo mucho alem\u00e1n.'},
    {art:'das', de:'Wochenende', es:'el fin de semana', ex:'Was machst du am Wochenende?', cat:'tiempo', sub:'periodos', niv:'A1', tipo:'sust', pl:'Wochenenden', gen:'-s', esEx:'\u00bfQu\u00e9 haces el fin de semana?'},
    {art:'der', de:'Feiertag', es:'el d\u00eda festivo', ex:'Morgen ist ein Feiertag.', cat:'tiempo', sub:'periodos', niv:'A2', tipo:'sust', pl:'Feiertage', gen:'-s', esEx:'Ma\u00f1ana es d\u00eda festivo.'},
    {art:'der', de:'Termin', es:'la cita / el turno', ex:'Ich habe einen Termin um 15 Uhr.', cat:'tiempo', sub:'periodos', niv:'A2', tipo:'sust', pl:'Termine', gen:'-s', esEx:'Tengo una cita a las 15:00.'},
    {art:'der', de:'Kalender', es:'el calendario', ex:'Ich schreibe alles in meinen Kalender.', cat:'tiempo', sub:'periodos', niv:'A2', tipo:'sust', pl:'Kalender', gen:'-s', esEx:'Apunto todo en mi calendario.'},

    // ── FAMILIA ─────────────────────────────────
    //    Familia directa
    {art:'die', de:'Mutter', es:'la madre', ex:'Meine Mutter kommt aus Mexiko.', cat:'familia', sub:'nucleo', niv:'A1', tipo:'sust', pl:'M\u00fctter', gen:'-', esEx:'Mi madre es de M\u00e9xico.'},
    {art:'der', de:'Vater', es:'el padre', ex:'Mein Vater arbeitet als Ingenieur.', cat:'familia', sub:'nucleo', niv:'A1', tipo:'sust', pl:'V\u00e4ter', gen:'-s', esEx:'Mi padre trabaja como ingeniero.'},
    {art:'die', de:'Schwester', es:'la hermana', ex:'Ich habe eine \u00e4ltere Schwester.', cat:'familia', sub:'nucleo', niv:'A1', tipo:'sust', pl:'Schwestern', gen:'-', esEx:'Tengo una hermana mayor.'},
    {art:'der', de:'Bruder', es:'el hermano', ex:'Mein Bruder studiert in Berlin.', cat:'familia', sub:'nucleo', niv:'A1', tipo:'sust', pl:'Br\u00fcder', gen:'-s', esEx:'Mi hermano estudia en Berl\u00edn.'},
    {art:'die', de:'Tochter', es:'la hija', ex:'Ihre Tochter ist sehr klug.', cat:'familia', sub:'nucleo', niv:'A1', tipo:'sust', pl:'T\u00f6chter', gen:'-', esEx:'Su hija es muy lista.'},
    {art:'der', de:'Sohn', es:'el hijo', ex:'Sein Sohn lernt Deutsch.', cat:'familia', sub:'nucleo', niv:'A1', tipo:'sust', pl:'S\u00f6hne', gen:'-es', esEx:'Su hijo aprende alem\u00e1n.'},
    {art:'das', de:'Kind', es:'el ni\u00f1o/hijo', ex:'Das Kind spielt im Garten.', cat:'familia', sub:'nucleo', niv:'A1', tipo:'sust', pl:'Kinder', gen:'-es', esEx:'El ni\u00f1o juega en el jard\u00edn.'},
    {art:'pl.', de:'Eltern', es:'los padres', ex:'Meine Eltern wohnen in Puebla.', cat:'familia', sub:'nucleo', niv:'A1', tipo:'sust', tag:'solo plural', esEx:'Mis padres viven en Puebla.'},
    {art:'pl.', de:'Geschwister', es:'los hermanos (en general)', ex:'Ich habe zwei Geschwister.', cat:'familia', sub:'nucleo', niv:'A2', tipo:'sust', tag:'solo plural', esEx:'Tengo dos hermanos.'},
    {art:'das', de:'Baby', es:'el beb\u00e9', ex:'Das Baby schl\u00e4ft gerade.', cat:'familia', sub:'nucleo', niv:'A1', tipo:'sust', pl:'Babys', gen:'-s', esEx:'El beb\u00e9 est\u00e1 durmiendo ahora.'},
    //    Familia extensa
    {art:'die', de:'Gro\u00dfmutter / Oma', es:'la abuela', ex:'Meine Oma macht den besten Kuchen.', cat:'familia', sub:'extensa', niv:'A1', tipo:'sust', pl:'Gro\u00dfm\u00fctter', gen:'-', esEx:'Mi abuela hace el mejor pastel.'},
    {art:'der', de:'Gro\u00dfvater / Opa', es:'el abuelo', ex:'Mein Opa ist 78 Jahre alt.', cat:'familia', sub:'extensa', niv:'A1', tipo:'sust', pl:'Gro\u00dfv\u00e4ter', gen:'-s', esEx:'Mi abuelo tiene 78 a\u00f1os.'},
    {art:'die', de:'Tante', es:'la t\u00eda', ex:'Meine Tante wohnt in M\u00fcnchen.', cat:'familia', sub:'extensa', niv:'A1', tipo:'sust', pl:'Tanten', gen:'-', esEx:'Mi t\u00eda vive en M\u00fanich.'},
    {art:'der', de:'Onkel', es:'el t\u00edo', ex:'Mein Onkel hat drei Kinder.', cat:'familia', sub:'extensa', niv:'A1', tipo:'sust', pl:'Onkel', gen:'-s', esEx:'Mi t\u00edo tiene tres hijos.'},
    {art:'der', de:'Cousin / die Cousine', es:'el primo / la prima', ex:'Meine Cousine besucht mich im Sommer.', cat:'familia', sub:'extensa', niv:'A2', tipo:'sust', pl:'Cousins', gen:'-s', esEx:'Mi prima me visita en verano.'},
    {art:'der', de:'Neffe / die Nichte', es:'el sobrino / la sobrina', ex:'Mein Neffe ist erst zwei Jahre alt.', cat:'familia', sub:'extensa', niv:'A2', tipo:'sust', pl:'Neffen', gen:'-n', tag:'declinaci\u00f3n -n', esEx:'Mi sobrino tiene apenas dos a\u00f1os.'},
    {art:'das', de:'Enkelkind', es:'el nieto / la nieta', ex:'Sie hat vier Enkelkinder.', cat:'familia', sub:'extensa', niv:'A2', tipo:'sust', pl:'Enkelkinder', gen:'-es', esEx:'Ella tiene cuatro nietos.'},
    //    Familia política
    {art:'die', de:'Schwiegermutter / der Schwiegervater', es:'la suegra / el suegro', ex:'Meine Schwiegermutter kocht sehr gut.', cat:'familia', sub:'politica', niv:'A2', tipo:'sust', pl:'Schwiegerm\u00fctter', gen:'-', esEx:'Mi suegra cocina muy bien.'},
    //    Pareja y estado civil
    {art:'der', de:'Mann / Ehemann', es:'el esposo/marido', ex:'Mein Mann arbeitet in der Stadt.', cat:'familia', sub:'estado', niv:'A1', tipo:'sust', pl:'M\u00e4nner', gen:'-es', esEx:'Mi esposo trabaja en la ciudad.'},
    {art:'die', de:'Frau / Ehefrau', es:'la esposa/mujer', ex:'Seine Frau ist \u00c4rztin.', cat:'familia', sub:'estado', niv:'A1', tipo:'sust', pl:'Frauen', gen:'-', esEx:'Su esposa es m\u00e9dica.'},
    {art:'der', de:'Freund / die Freundin', es:'el amigo / la novia', ex:'Mein Freund kommt heute.', cat:'familia', sub:'estado', niv:'A1', tipo:'sust', pl:'Freunde', gen:'-es', esEx:'Mi amigo viene hoy.'},
    {art:'der/die', de:'Partner / Partnerin', es:'la pareja (novio/a, c\u00f3nyuge)', ex:'Das ist mein Partner.', cat:'familia', sub:'estado', niv:'A2', tipo:'sust', pl:'Partner', gen:'-s', esEx:'Esta es mi pareja.'},
    {art:'-', de:'verheiratet / ledig', es:'casado / soltero', ex:'Ich bin nicht verheiratet, ich bin ledig.', cat:'familia', sub:'estado', niv:'A2', tipo:'adj', esEx:'No estoy casado, soy soltero.'},

    // ── CUERPO ─────────────────────────────────
    //    Cabeza y cara
    {art:'der', de:'Kopf', es:'la cabeza', ex:'Ich habe Kopfschmerzen.', cat:'cuerpo', sub:'cabeza', niv:'A1', tipo:'sust', pl:'K\u00f6pfe', gen:'-es', esEx:'Tengo dolor de cabeza.'},
    {art:'das', de:'Auge (pl. Augen)', es:'el ojo', ex:'Er hat blaue Augen.', cat:'cuerpo', sub:'cabeza', niv:'A1', tipo:'sust', pl:'Augen', gen:'-s', esEx:'\u00c9l tiene los ojos azules.'},
    {art:'das', de:'Ohr (pl. Ohren)', es:'el o\u00eddo / la oreja', ex:'Meine Ohren tun weh.', cat:'cuerpo', sub:'cabeza', niv:'A1', tipo:'sust', pl:'Ohren', gen:'-es', esEx:'Me duelen los o\u00eddos.'},
    {art:'die', de:'Nase', es:'la nariz', ex:'Meine Nase ist verstopft.', cat:'cuerpo', sub:'cabeza', niv:'A1', tipo:'sust', pl:'Nasen', gen:'-', esEx:'Tengo la nariz tapada.'},
    {art:'der', de:'Mund', es:'la boca', ex:'\u00d6ffne bitte den Mund.', cat:'cuerpo', sub:'cabeza', niv:'A1', tipo:'sust', pl:'M\u00fcnder', gen:'-es', esEx:'Abre la boca, por favor.'},
    {art:'der', de:'Zahn (pl. Z\u00e4hne)', es:'el diente', ex:'Ich muss zum Zahnarzt.', cat:'cuerpo', sub:'cabeza', niv:'A1', tipo:'sust', pl:'Z\u00e4hne', gen:'-es', esEx:'Tengo que ir al dentista.'},
    {art:'das', de:'Haar (pl. Haare)', es:'el pelo / cabello', ex:'Sie hat lange Haare.', cat:'cuerpo', sub:'cabeza', niv:'A1', tipo:'sust', pl:'Haare', gen:'-es', esEx:'Ella tiene el pelo largo.'},
    {art:'das', de:'Gesicht', es:'la cara / el rostro', ex:'Er hat ein freundliches Gesicht.', cat:'cuerpo', sub:'cabeza', niv:'A1', tipo:'sust', pl:'Gesichter', gen:'-es', esEx:'\u00c9l tiene una cara amable.'},
    {art:'die', de:'Zunge', es:'la lengua', ex:'Zeig mir deine Zunge.', cat:'cuerpo', sub:'cabeza', niv:'A2', tipo:'sust', pl:'Zungen', gen:'-', esEx:'Ens\u00e9\u00f1ame la lengua.'},
    //    Tronco
    {art:'der', de:'Hals', es:'el cuello / la garganta', ex:'Ich habe Halsschmerzen.', cat:'cuerpo', sub:'tronco', niv:'A1', tipo:'sust', pl:'H\u00e4lse', gen:'-es', esEx:'Me duele la garganta.'},
    {art:'die', de:'Schulter', es:'el hombro', ex:'Meine Schulter tut weh.', cat:'cuerpo', sub:'tronco', niv:'A1', tipo:'sust', pl:'Schultern', gen:'-', esEx:'Me duele el hombro.'},
    {art:'der', de:'Bauch', es:'el abdomen / la barriga', ex:'Ich habe Bauchschmerzen.', cat:'cuerpo', sub:'tronco', niv:'A1', tipo:'sust', pl:'B\u00e4uche', gen:'-es', esEx:'Me duele el est\u00f3mago.'},
    {art:'der', de:'R\u00fccken', es:'la espalda', ex:'Mein R\u00fccken schmerzt nach dem Sport.', cat:'cuerpo', sub:'tronco', niv:'A1', tipo:'sust', pl:'R\u00fccken', gen:'-s', esEx:'Me duele la espalda despu\u00e9s del deporte.'},
    {art:'die', de:'H\u00fcfte', es:'la cadera', ex:'Sie hat Schmerzen in der H\u00fcfte.', cat:'cuerpo', sub:'tronco', niv:'A2', tipo:'sust', pl:'H\u00fcften', gen:'-', esEx:'Le duele la cadera.'},
    //    Brazos y piernas
    {art:'der', de:'Arm', es:'el brazo', ex:'Er hat sich den Arm gebrochen.', cat:'cuerpo', sub:'extremidades', niv:'A1', tipo:'sust', pl:'Arme', gen:'-es', esEx:'Se rompi\u00f3 el brazo.'},
    {art:'die', de:'Hand (pl. H\u00e4nde)', es:'la mano', ex:'Gib mir bitte die Hand.', cat:'cuerpo', sub:'extremidades', niv:'A1', tipo:'sust', pl:'H\u00e4nde', gen:'-', esEx:'Dame la mano, por favor.'},
    {art:'der', de:'Finger', es:'el dedo', ex:'Ich habe mir den Finger geschnitten.', cat:'cuerpo', sub:'extremidades', niv:'A1', tipo:'sust', pl:'Finger', gen:'-s', esEx:'Me cort\u00e9 el dedo.'},
    {art:'das', de:'Bein', es:'la pierna', ex:'Er hat sich das Bein verletzt.', cat:'cuerpo', sub:'extremidades', niv:'A1', tipo:'sust', pl:'Beine', gen:'-es', esEx:'Se lastim\u00f3 la pierna.'},
    {art:'der', de:'Fu\u00df (pl. F\u00fc\u00dfe)', es:'el pie', ex:'Meine F\u00fc\u00dfe sind m\u00fcde.', cat:'cuerpo', sub:'extremidades', niv:'A1', tipo:'sust', pl:'F\u00fc\u00dfe', gen:'-es', esEx:'Tengo los pies cansados.'},
    {art:'das', de:'Knie', es:'la rodilla', ex:'Mein Knie tut weh.', cat:'cuerpo', sub:'extremidades', niv:'A2', tipo:'sust', pl:'Knie', gen:'-s', esEx:'Me duele la rodilla.'},
    {art:'der', de:'Ellbogen', es:'el codo', ex:'Ich habe mir den Ellbogen gesto\u00dfen.', cat:'cuerpo', sub:'extremidades', niv:'A2', tipo:'sust', pl:'Ellbogen', gen:'-s', esEx:'Me golpe\u00e9 el codo.'},
    //    Por dentro
    {art:'das', de:'Herz', es:'el coraz\u00f3n', ex:'Sein Herz schl\u00e4gt schnell.', cat:'cuerpo', sub:'interior', niv:'A1', tipo:'sust', pl:'Herzen', gen:'-ens', tag:'declinaci\u00f3n irregular', esEx:'Su coraz\u00f3n late r\u00e1pido.'},
    {art:'die', de:'Haut', es:'la piel', ex:'Ihre Haut ist sehr empfindlich.', cat:'cuerpo', sub:'interior', niv:'A2', tipo:'sust', pl:'H\u00e4ute', gen:'-', esEx:'Su piel es muy sensible.'},

    // ── ROPA ─────────────────────────────────
    //    Prendas
    {art:'das', de:'Hemd', es:'la camisa', ex:'Er tr\u00e4gt ein wei\u00dfes Hemd.', cat:'ropa', sub:'prendas', niv:'A1', tipo:'sust', pl:'Hemden', gen:'-es', esEx:'\u00c9l lleva una camisa blanca.'},
    {art:'die', de:'Hose', es:'el pantal\u00f3n', ex:'Ich brauche eine neue Hose.', cat:'ropa', sub:'prendas', niv:'A1', tipo:'sust', pl:'Hosen', gen:'-', esEx:'Necesito un pantal\u00f3n nuevo.'},
    {art:'das', de:'Kleid', es:'el vestido', ex:'Sie tr\u00e4gt ein rotes Kleid.', cat:'ropa', sub:'prendas', niv:'A1', tipo:'sust', pl:'Kleider', gen:'-es', esEx:'Ella lleva un vestido rojo.'},
    {art:'der', de:'Rock', es:'la falda', ex:'Der Rock ist zu kurz.', cat:'ropa', sub:'prendas', niv:'A1', tipo:'sust', pl:'R\u00f6cke', gen:'-es', esEx:'La falda es demasiado corta.'},
    {art:'der', de:'Anzug', es:'el traje', ex:'Er tr\u00e4gt einen Anzug zur Arbeit.', cat:'ropa', sub:'prendas', niv:'A2', tipo:'sust', pl:'Anz\u00fcge', gen:'-s', esEx:'\u00c9l lleva traje al trabajo.'},
    {art:'die', de:'Unterw\u00e4sche', es:'la ropa interior', ex:'Ich muss Unterw\u00e4sche kaufen.', cat:'ropa', sub:'prendas', niv:'A2', tipo:'sust', pl:'-', tag:'incontable', esEx:'Tengo que comprar ropa interior.'},
    {art:'der', de:'Badeanzug', es:'el traje de ba\u00f1o', ex:'Ich habe meinen Badeanzug vergessen.', cat:'ropa', sub:'prendas', niv:'A2', tipo:'sust', pl:'Badeanz\u00fcge', gen:'-s', esEx:'Olvid\u00e9 mi traje de ba\u00f1o.'},
    //    Abrigo y frío
    {art:'die', de:'Jacke', es:'la chaqueta / el saco', ex:'Nimm eine Jacke mit, es ist kalt!', cat:'ropa', sub:'abrigo', niv:'A1', tipo:'sust', pl:'Jacken', gen:'-', esEx:'\u00a1Ll\u00e9vate una chaqueta, hace fr\u00edo!'},
    {art:'der', de:'Mantel', es:'el abrigo', ex:'Im Winter brauche ich einen Mantel.', cat:'ropa', sub:'abrigo', niv:'A1', tipo:'sust', pl:'M\u00e4ntel', gen:'-s', esEx:'En invierno necesito un abrigo.'},
    {art:'der', de:'Pullover', es:'el su\u00e9ter', ex:'Dieser Pullover ist sehr warm.', cat:'ropa', sub:'abrigo', niv:'A1', tipo:'sust', pl:'Pullover', gen:'-s', esEx:'Este su\u00e9ter es muy calientito.'},
    {art:'die', de:'M\u00fctze', es:'el gorro / la gorra', ex:'Im Winter trage ich eine M\u00fctze.', cat:'ropa', sub:'abrigo', niv:'A1', tipo:'sust', pl:'M\u00fctzen', gen:'-', esEx:'En invierno uso gorro.'},
    {art:'der', de:'Schal', es:'la bufanda', ex:'Mein Schal ist aus Wolle.', cat:'ropa', sub:'abrigo', niv:'A2', tipo:'sust', pl:'Schals', gen:'-s', esEx:'Mi bufanda es de lana.'},
    {art:'die', de:'Handschuhe (pl.)', es:'los guantes', ex:'Im Winter brauche ich Handschuhe.', cat:'ropa', sub:'abrigo', niv:'A1', tipo:'sust', tag:'solo plural', esEx:'En invierno necesito guantes.'},
    //    Calzado
    {art:'die', de:'Socken (pl.)', es:'los calcetines', ex:'Ich habe meine Socken vergessen.', cat:'ropa', sub:'calzado', niv:'A1', tipo:'sust', tag:'solo plural', esEx:'Olvid\u00e9 mis calcetines.'},
    {art:'die', de:'Schuhe (pl.)', es:'los zapatos', ex:'Diese Schuhe sind sehr bequem.', cat:'ropa', sub:'calzado', niv:'A1', tipo:'sust', tag:'solo plural', esEx:'Estos zapatos son muy c\u00f3modos.'},
    {art:'pl.', de:'Sandalen', es:'las sandalias', ex:'Im Sommer trage ich Sandalen.', cat:'ropa', sub:'calzado', niv:'A2', tipo:'sust', tag:'solo plural', esEx:'En verano uso sandalias.'},
    {art:'pl.', de:'Stiefel', es:'las botas', ex:'Im Winter brauche ich warme Stiefel.', cat:'ropa', sub:'calzado', niv:'A2', tipo:'sust', tag:'solo plural', esEx:'En invierno necesito botas calientes.'},
    //    Complementos
    {art:'die', de:'Krawatte', es:'la corbata', ex:'Diese Krawatte passt gut zum Hemd.', cat:'ropa', sub:'complementos', niv:'A2', tipo:'sust', pl:'Krawatten', gen:'-', esEx:'Esta corbata va bien con la camisa.'},
    {art:'die', de:'Brille', es:'los anteojos / las gafas', ex:'Ohne Brille sehe ich nichts.', cat:'ropa', sub:'complementos', niv:'A1', tipo:'sust', pl:'Brillen', gen:'-', uso:'singular en alem\u00e1n, plural en espa\u00f1ol', esEx:'Sin lentes no veo nada.'},
    {art:'die', de:'Uhr', es:'el reloj', ex:'Seine Uhr war ein Geschenk.', cat:'ropa', sub:'complementos', niv:'A1', tipo:'sust', pl:'Uhren', gen:'-', esEx:'Su reloj fue un regalo.'},
    {art:'die', de:'Tasche / Handtasche', es:'el bolso', ex:'Meine Handtasche ist sehr praktisch.', cat:'ropa', sub:'complementos', niv:'A1', tipo:'sust', pl:'Taschen', gen:'-', esEx:'Mi bolso es muy pr\u00e1ctico.'},
    //    Al comprar ropa
    {art:'die', de:'Gr\u00f6\u00dfe', es:'la talla', ex:'Welche Gr\u00f6\u00dfe haben Sie? \u2014 Gr\u00f6\u00dfe M.', cat:'ropa', sub:'compra', niv:'A1', tipo:'sust', pl:'Gr\u00f6\u00dfen', gen:'-', esEx:'\u00bfQu\u00e9 talla usa? \u2014 Talla M.'},

    // ── COMIDA ─────────────────────────────────
    //    Frutas y verduras
    {art:'das', de:'Gem\u00fcse', es:'la verdura', ex:'Ich esse viel Gem\u00fcse.', cat:'comida', sub:'frutas', niv:'A1', tipo:'sust', pl:'-', gen:'-s', tag:'incontable', esEx:'Como mucha verdura.'},
    {art:'das', de:'Obst', es:'la fruta', ex:'T\u00e4glich Obst ist gesund.', cat:'comida', sub:'frutas', niv:'A1', tipo:'sust', pl:'-', gen:'-es', tag:'incontable', esEx:'Comer fruta a diario es sano.'},
    {art:'die', de:'Kartoffel', es:'la papa / patata', ex:'Deutsche lieben Kartoffeln.', cat:'comida', sub:'frutas', niv:'A1', tipo:'sust', pl:'Kartoffeln', gen:'-', esEx:'A los alemanes les encantan las papas.'},
    //    Carnes y pescado
    {art:'das', de:'Fleisch', es:'la carne', ex:'Ich esse kein Fleisch \u2014 ich bin Vegetarier.', cat:'comida', sub:'carnes', niv:'A1', tipo:'sust', pl:'-', gen:'-es', tag:'incontable', esEx:'No como carne: soy vegetariano.'},
    {art:'der', de:'Fisch', es:'el pescado', ex:'Gebratener Fisch ist lecker.', cat:'comida', sub:'carnes', niv:'A1', tipo:'sust', pl:'Fische', gen:'-es', esEx:'El pescado frito est\u00e1 rico.'},
    //    Lácteos y panadería
    {art:'das', de:'Brot', es:'el pan', ex:'Zum Fr\u00fchst\u00fcck esse ich Brot.', cat:'comida', sub:'lacteos', niv:'A1', tipo:'sust', pl:'Brote', gen:'-es', esEx:'Para el desayuno como pan.'},
    {art:'die', de:'Butter', es:'la mantequilla', ex:'Das Brot mit Butter ist lecker.', cat:'comida', sub:'lacteos', niv:'A1', tipo:'sust', pl:'-', tag:'incontable', esEx:'El pan con mantequilla est\u00e1 rico.'},
    {art:'der', de:'K\u00e4se', es:'el queso', ex:'Deutschland hat viele K\u00e4sesorten.', cat:'comida', sub:'lacteos', niv:'A1', tipo:'sust', pl:'K\u00e4se', gen:'-s', esEx:'Alemania tiene muchos tipos de queso.'},
    {art:'das', de:'Ei (pl. Eier)', es:'el huevo', ex:'Ich esse gern R\u00fchreier.', cat:'comida', sub:'lacteos', niv:'A1', tipo:'sust', pl:'Eier', gen:'-es', esEx:'Me gustan los huevos revueltos.'},
    {art:'der', de:'Kuchen', es:'el pastel', ex:'Meine Oma backt einen Kuchen.', cat:'comida', sub:'lacteos', niv:'A1', tipo:'sust', pl:'Kuchen', gen:'-s', esEx:'Mi abuela hornea un pastel.'},
    //    Básicos de despensa
    {art:'der', de:'Reis', es:'el arroz', ex:'Ich esse Reis mit Gem\u00fcse.', cat:'comida', sub:'basicos', niv:'A1', tipo:'sust', pl:'-', gen:'-es', tag:'incontable', esEx:'Como arroz con verduras.'},
    {art:'die', de:'Nudeln (pl.)', es:'la pasta', ex:'Nudeln mit Tomatensauce mag ich sehr.', cat:'comida', sub:'basicos', niv:'A1', tipo:'sust', tag:'solo plural', esEx:'La pasta con salsa de tomate me gusta mucho.'},
    {art:'die', de:'Suppe', es:'la sopa', ex:'Im Winter esse ich gern Suppe.', cat:'comida', sub:'basicos', niv:'A1', tipo:'sust', pl:'Suppen', gen:'-', esEx:'En invierno me gusta comer sopa.'},
    {art:'die', de:'Schokolade', es:'el chocolate', ex:'Deutsche Schokolade ist weltbekannt.', cat:'comida', sub:'basicos', niv:'A1', tipo:'sust', pl:'Schokoladen', gen:'-', esEx:'El chocolate alem\u00e1n es famoso en el mundo.'},
    {art:'der', de:'Zucker', es:'el az\u00facar', ex:'Ich nehme keinen Zucker im Kaffee.', cat:'comida', sub:'basicos', niv:'A1', tipo:'sust', pl:'-', gen:'-s', tag:'incontable', esEx:'No le pongo az\u00facar al caf\u00e9.'},
    {art:'das', de:'Salz', es:'la sal', ex:'Die Suppe braucht mehr Salz.', cat:'comida', sub:'basicos', niv:'A1', tipo:'sust', pl:'-', gen:'-es', tag:'incontable', esEx:'A la sopa le falta sal.'},
    {art:'der', de:'Pfeffer', es:'la pimienta', ex:'Etwas Pfeffer, bitte.', cat:'comida', sub:'basicos', niv:'A2', tipo:'sust', pl:'-', gen:'-s', tag:'incontable', esEx:'Un poco de pimienta, por favor.'},
    {art:'das', de:'\u00d6l', es:'el aceite', ex:'Oliven\u00f6l ist sehr gesund.', cat:'comida', sub:'basicos', niv:'A2', tipo:'sust', pl:'\u00d6le', gen:'-s', esEx:'El aceite de oliva es muy sano.'},
    {art:'der', de:'Honig', es:'la miel', ex:'Tee mit Honig schmeckt gut.', cat:'comida', sub:'basicos', niv:'A2', tipo:'sust', pl:'-', gen:'-s', tag:'incontable', esEx:'El t\u00e9 con miel sabe bien.'},
    //    Bebidas
    {art:'der', de:'Kaffee', es:'el caf\u00e9', ex:'Morgens trinke ich immer Kaffee.', cat:'comida', sub:'bebidas', niv:'A1', tipo:'sust', pl:'Kaffees', gen:'-s', esEx:'Por las ma\u00f1anas siempre tomo caf\u00e9.'},
    {art:'der', de:'Tee', es:'el t\u00e9', ex:'Ich trinke lieber Tee als Kaffee.', cat:'comida', sub:'bebidas', niv:'A1', tipo:'sust', pl:'Tees', gen:'-s', esEx:'Prefiero el t\u00e9 al caf\u00e9.'},
    {art:'das', de:'Wasser', es:'el agua', ex:'Ich trinke t\u00e4glich 2 Liter Wasser.', cat:'comida', sub:'bebidas', niv:'A1', tipo:'sust', pl:'-', gen:'-s', tag:'incontable', esEx:'Tomo 2 litros de agua al d\u00eda.'},
    {art:'das', de:'Bier', es:'la cerveza', ex:'Ein Bier, bitte!', cat:'comida', sub:'bebidas', niv:'A1', tipo:'sust', pl:'Biere', gen:'-es', esEx:'\u00a1Una cerveza, por favor!'},
    {art:'der', de:'Wein', es:'el vino', ex:'Ein Glas Wein am Abend.', cat:'comida', sub:'bebidas', niv:'A1', tipo:'sust', pl:'Weine', gen:'-es', esEx:'Una copa de vino por la noche.'},
    {art:'der', de:'Saft', es:'el jugo', ex:'Ich m\u00f6chte einen Orangensaft.', cat:'comida', sub:'bebidas', niv:'A1', tipo:'sust', pl:'S\u00e4fte', gen:'-es', esEx:'Quisiera un jugo de naranja.'},
    {art:'die', de:'Milch', es:'la leche', ex:'Kinder trinken viel Milch.', cat:'comida', sub:'bebidas', niv:'A1', tipo:'sust', pl:'-', tag:'incontable', esEx:'Los ni\u00f1os toman mucha leche.'},
    //    Las comidas del día
    {art:'das', de:'Fr\u00fchst\u00fcck', es:'el desayuno', ex:'Was gibt es zum Fr\u00fchst\u00fcck?', cat:'comida', sub:'comidas', niv:'A1', tipo:'sust', pl:'Fr\u00fchst\u00fccke', gen:'-s', esEx:'\u00bfQu\u00e9 hay de desayuno?'},
    {art:'das', de:'Mittagessen', es:'el almuerzo', ex:'Das Mittagessen ist um 13 Uhr.', cat:'comida', sub:'comidas', niv:'A1', tipo:'sust', pl:'Mittagessen', gen:'-s', esEx:'El almuerzo es a las 13:00.'},
    {art:'das', de:'Abendessen', es:'la cena', ex:'Wir kochen zusammen das Abendessen.', cat:'comida', sub:'comidas', niv:'A1', tipo:'sust', pl:'Abendessen', gen:'-s', esEx:'Cocinamos juntos la cena.'},
    {art:'der', de:'Nachtisch / das Dessert', es:'el postre', ex:'Zum Nachtisch gibt es Eis.', cat:'comida', sub:'comidas', niv:'A2', tipo:'sust', pl:'Nachtische', gen:'-es', esEx:'De postre hay helado.'},
    //    Sabores y dietas
    {art:'-', de:'s\u00fc\u00df / sauer / salzig / scharf', es:'dulce / \u00e1cido / salado / picante', ex:'Das Essen ist zu scharf f\u00fcr mich.', cat:'comida', sub:'sabor', niv:'A1', tipo:'adj', esEx:'La comida est\u00e1 demasiado picante para m\u00ed.'},
    {art:'der/die', de:'Vegetarier / Veganer', es:'vegetariano / vegano', ex:'Ich bin seit einem Jahr Veganer.', cat:'comida', sub:'sabor', niv:'A2', tipo:'sust', pl:'Vegetarier', gen:'-s', esEx:'Soy vegano desde hace un a\u00f1o.'},

    // ── CASA ─────────────────────────────────
    //    La vivienda
    {art:'die', de:'Wohnung', es:'el apartamento', ex:'Ich suche eine Wohnung in M\u00fcnchen.', cat:'casa', sub:'vivienda', niv:'A1', tipo:'sust', pl:'Wohnungen', gen:'-', esEx:'Busco un apartamento en M\u00fanich.'},
    {art:'das', de:'Haus', es:'la casa', ex:'Wir wohnen in einem gro\u00dfen Haus.', cat:'casa', sub:'vivienda', niv:'A1', tipo:'sust', pl:'H\u00e4user', gen:'-es', esEx:'Vivimos en una casa grande.'},
    {art:'der', de:'Garten', es:'el jard\u00edn', ex:'Die Kinder spielen im Garten.', cat:'casa', sub:'vivienda', niv:'A1', tipo:'sust', pl:'G\u00e4rten', gen:'-s', esEx:'Los ni\u00f1os juegan en el jard\u00edn.'},
    {art:'der', de:'Balkon', es:'el balc\u00f3n', ex:'Wir fr\u00fchst\u00fccken auf dem Balkon.', cat:'casa', sub:'vivienda', niv:'A2', tipo:'sust', pl:'Balkone', gen:'-s', esEx:'Desayunamos en el balc\u00f3n.'},
    {art:'der', de:'Keller', es:'el s\u00f3tano', ex:'Das Fahrrad steht im Keller.', cat:'casa', sub:'vivienda', niv:'A2', tipo:'sust', pl:'Keller', gen:'-s', esEx:'La bicicleta est\u00e1 en el s\u00f3tano.'},
    //    Las estancias
    {art:'das', de:'Zimmer', es:'la habitaci\u00f3n / cuarto', ex:'Mein Zimmer ist klein aber gem\u00fctlich.', cat:'casa', sub:'estancias', niv:'A1', tipo:'sust', pl:'Zimmer', gen:'-s', esEx:'Mi cuarto es peque\u00f1o pero acogedor.'},
    {art:'die', de:'K\u00fcche', es:'la cocina', ex:'Ich koche jeden Abend in der K\u00fcche.', cat:'casa', sub:'estancias', niv:'A1', tipo:'sust', pl:'K\u00fcchen', gen:'-', esEx:'Cocino cada noche en la cocina.'},
    {art:'das', de:'Badezimmer', es:'el ba\u00f1o', ex:'Das Badezimmer ist im ersten Stock.', cat:'casa', sub:'estancias', niv:'A1', tipo:'sust', pl:'Badezimmer', gen:'-s', esEx:'El ba\u00f1o est\u00e1 en el primer piso.'},
    {art:'das', de:'Wohnzimmer', es:'la sala', ex:'Wir sitzen im Wohnzimmer.', cat:'casa', sub:'estancias', niv:'A1', tipo:'sust', pl:'Wohnzimmer', gen:'-s', esEx:'Estamos sentados en la sala.'},
    {art:'das', de:'Schlafzimmer', es:'el dormitorio', ex:'Mein Schlafzimmer ist ruhig.', cat:'casa', sub:'estancias', niv:'A1', tipo:'sust', pl:'Schlafzimmer', gen:'-s', esEx:'Mi dormitorio es tranquilo.'},
    //    Muebles y objetos
    {art:'der', de:'Tisch', es:'la mesa', ex:'Das Essen steht auf dem Tisch.', cat:'casa', sub:'muebles', niv:'A1', tipo:'sust', pl:'Tische', gen:'-es', esEx:'La comida est\u00e1 en la mesa.'},
    {art:'der', de:'Stuhl', es:'la silla', ex:'Setz dich bitte auf den Stuhl.', cat:'casa', sub:'muebles', niv:'A1', tipo:'sust', pl:'St\u00fchle', gen:'-es', esEx:'Si\u00e9ntate en la silla, por favor.'},
    {art:'das', de:'Bett', es:'la cama', ex:'Ich gehe um 22 Uhr ins Bett.', cat:'casa', sub:'muebles', niv:'A1', tipo:'sust', pl:'Betten', gen:'-es', esEx:'Me acuesto a las 22:00.'},
    {art:'die', de:'Lampe', es:'la l\u00e1mpara', ex:'Mach bitte die Lampe an.', cat:'casa', sub:'muebles', niv:'A1', tipo:'sust', pl:'Lampen', gen:'-', esEx:'Enciende la l\u00e1mpara, por favor.'},
    {art:'das', de:'Sofa', es:'el sof\u00e1', ex:'Ich sitze gern auf dem Sofa.', cat:'casa', sub:'muebles', niv:'A1', tipo:'sust', pl:'Sofas', gen:'-s', esEx:'Me gusta sentarme en el sof\u00e1.'},
    {art:'das', de:'Regal', es:'la estanter\u00eda / repisa', ex:'Die B\u00fccher stehen im Regal.', cat:'casa', sub:'muebles', niv:'A2', tipo:'sust', pl:'Regale', gen:'-s', esEx:'Los libros est\u00e1n en la estanter\u00eda.'},
    {art:'der', de:'Teppich', es:'la alfombra', ex:'Der Teppich im Wohnzimmer ist neu.', cat:'casa', sub:'muebles', niv:'A2', tipo:'sust', pl:'Teppiche', gen:'-s', esEx:'La alfombra de la sala es nueva.'},
    //    Puertas, paredes y suelos
    {art:'die', de:'T\u00fcr', es:'la puerta', ex:'Mach bitte die T\u00fcr zu.', cat:'casa', sub:'estructura', niv:'A1', tipo:'sust', pl:'T\u00fcren', gen:'-', esEx:'Cierra la puerta, por favor.'},
    {art:'das', de:'Fenster', es:'la ventana', ex:'Das Fenster ist offen.', cat:'casa', sub:'estructura', niv:'A1', tipo:'sust', pl:'Fenster', gen:'-s', esEx:'La ventana est\u00e1 abierta.'},
    {art:'das', de:'Dach', es:'el techo (tejado)', ex:'Das Dach ist rot.', cat:'casa', sub:'estructura', niv:'A2', tipo:'sust', pl:'D\u00e4cher', gen:'-es', esEx:'El techo es rojo.'},
    {art:'die', de:'Wand', es:'la pared', ex:'An der Wand h\u00e4ngt ein Bild.', cat:'casa', sub:'estructura', niv:'A2', tipo:'sust', pl:'W\u00e4nde', gen:'-', esEx:'En la pared cuelga un cuadro.'},
    {art:'der', de:'Boden', es:'el suelo / piso', ex:'Der Boden ist aus Holz.', cat:'casa', sub:'estructura', niv:'A2', tipo:'sust', pl:'B\u00f6den', gen:'-s', esEx:'El suelo es de madera.'},
    //    Electrodomésticos
    {art:'der', de:'K\u00fchlschrank', es:'el refrigerador', ex:'Der K\u00fchlschrank ist leer.', cat:'casa', sub:'electrodomesticos', niv:'A1', tipo:'sust', pl:'K\u00fchlschr\u00e4nke', gen:'-s', esEx:'El refrigerador est\u00e1 vac\u00edo.'},
    {art:'die', de:'Waschmaschine', es:'la lavadora', ex:'Ich muss die W\u00e4sche waschen.', cat:'casa', sub:'electrodomesticos', niv:'A1', tipo:'sust', pl:'Waschmaschinen', gen:'-', esEx:'Tengo que lavar la ropa.'},
    //    Alquiler y vecinos
    {art:'die', de:'Miete', es:'el alquiler', ex:'Die Miete ist 900 Euro pro Monat.', cat:'casa', sub:'alquiler', niv:'A2', tipo:'sust', pl:'Mieten', gen:'-', esEx:'El alquiler es de 900 euros al mes.'},
    {art:'der/die', de:'Nachbar / Nachbarin', es:'el vecino / la vecina', ex:'Mein Nachbar ist sehr freundlich.', cat:'casa', sub:'alquiler', niv:'A1', tipo:'sust', pl:'Nachbarn', gen:'-n', tag:'declinaci\u00f3n -n', esEx:'Mi vecino es muy amable.'},
    {art:'der', de:'Vermieter', es:'el arrendador', ex:'Der Vermieter hat die Miete erh\u00f6ht.', cat:'casa', sub:'alquiler', niv:'B1', tipo:'sust', pl:'Vermieter', gen:'-s', esEx:'El arrendador subi\u00f3 el alquiler.'},
    {art:'der', de:'Mieter', es:'el inquilino', ex:'Die Mieter zahlen jeden Monat.', cat:'casa', sub:'alquiler', niv:'B1', tipo:'sust', pl:'Mieter', gen:'-s', esEx:'Los inquilinos pagan cada mes.'},

    // ── CIUDAD ─────────────────────────────────
    //    Lugares de la ciudad
    {art:'die', de:'Stadt', es:'la ciudad', ex:'Berlin ist eine tolle Stadt.', cat:'ciudad', sub:'lugares', niv:'A1', tipo:'sust', pl:'St\u00e4dte', gen:'-', esEx:'Berl\u00edn es una ciudad estupenda.'},
    {art:'die', de:'Br\u00fccke', es:'el puente', ex:'Die Br\u00fccke f\u00fchrt \u00fcber die Spree.', cat:'ciudad', sub:'lugares', niv:'A2', tipo:'sust', pl:'Br\u00fccken', gen:'-', esEx:'El puente cruza el Spree.'},
    {art:'der', de:'Platz', es:'la plaza', ex:'Der Alexanderplatz ist bekannt.', cat:'ciudad', sub:'lugares', niv:'A1', tipo:'sust', pl:'Pl\u00e4tze', gen:'-es', esEx:'La Alexanderplatz es conocida.'},
    {art:'das', de:'Rathaus', es:'el ayuntamiento', ex:'Das Rathaus ist im Stadtzentrum.', cat:'ciudad', sub:'lugares', niv:'A2', tipo:'sust', pl:'Rath\u00e4user', gen:'-es', esEx:'El ayuntamiento est\u00e1 en el centro.'},
    {art:'die', de:'Kirche', es:'la iglesia', ex:'Die Kirche ist sehr alt.', cat:'ciudad', sub:'lugares', niv:'A1', tipo:'sust', pl:'Kirchen', gen:'-', esEx:'La iglesia es muy antigua.'},
    {art:'der', de:'Park', es:'el parque', ex:'Wir machen einen Spaziergang im Park.', cat:'ciudad', sub:'lugares', niv:'A1', tipo:'sust', pl:'Parks', gen:'-s', esEx:'Damos un paseo por el parque.'},
    //    Servicios y comercios
    {art:'die', de:'Apotheke', es:'la farmacia', ex:'Die Apotheke ist um die Ecke.', cat:'ciudad', sub:'servicios', niv:'A1', tipo:'sust', pl:'Apotheken', gen:'-', esEx:'La farmacia est\u00e1 a la vuelta de la esquina.'},
    {art:'das', de:'Krankenhaus', es:'el hospital', ex:'Das Krankenhaus ist 2 km entfernt.', cat:'ciudad', sub:'servicios', niv:'A1', tipo:'sust', pl:'Krankenh\u00e4user', gen:'-es', esEx:'El hospital est\u00e1 a 2 km.'},
    {art:'der', de:'Supermarkt', es:'el supermercado', ex:'Ich gehe zum Supermarkt einkaufen.', cat:'ciudad', sub:'servicios', niv:'A1', tipo:'sust', pl:'Superm\u00e4rkte', gen:'-es', esEx:'Voy al supermercado a hacer la compra.'},
    {art:'die', de:'Schule', es:'la escuela', ex:'Die Kinder gehen um 8 Uhr zur Schule.', cat:'ciudad', sub:'servicios', niv:'A1', tipo:'sust', pl:'Schulen', gen:'-', esEx:'Los ni\u00f1os van a la escuela a las 8.'},
    {art:'die', de:'Universit\u00e4t', es:'la universidad', ex:'Ich studiere an der Universit\u00e4t Berlin.', cat:'ciudad', sub:'servicios', niv:'A1', tipo:'sust', pl:'Universit\u00e4ten', gen:'-', esEx:'Estudio en la Universidad de Berl\u00edn.'},
    {art:'die', de:'Post', es:'el correo / la oficina postal', ex:'Ich schicke ein Paket bei der Post.', cat:'ciudad', sub:'servicios', niv:'A1', tipo:'sust', pl:'-', tag:'incontable', esEx:'Mando un paquete en el correo.'},
    {art:'die', de:'Bank', es:'el banco', ex:'Ich muss Geld zur Bank bringen.', cat:'ciudad', sub:'servicios', niv:'A1', tipo:'sust', pl:'Banken', gen:'-', uso:'B\u00e4nke = bancos de sentarse', esEx:'Tengo que llevar dinero al banco.'},
    //    Transporte
    {art:'der', de:'Bahnhof', es:'la estaci\u00f3n de tren', ex:'Der Hauptbahnhof ist gro\u00df.', cat:'ciudad', sub:'transporte', niv:'A1', tipo:'sust', pl:'Bahnh\u00f6fe', gen:'-s', esEx:'La estaci\u00f3n central es grande.'},
    {art:'die', de:'U-Bahn', es:'el metro', ex:'Ich fahre mit der U-Bahn zur Arbeit.', cat:'ciudad', sub:'transporte', niv:'A1', tipo:'sust', pl:'U-Bahnen', gen:'-', esEx:'Voy al trabajo en metro.'},
    {art:'die', de:'S-Bahn', es:'el metro r\u00e1pido/tren urbano', ex:'Die S-Bahn ist schneller.', cat:'ciudad', sub:'transporte', niv:'A1', tipo:'sust', pl:'S-Bahnen', gen:'-', esEx:'El tren urbano es m\u00e1s r\u00e1pido.'},
    {art:'der', de:'Bus', es:'el autob\u00fas', ex:'Der Bus kommt um 8 Uhr.', cat:'ciudad', sub:'transporte', niv:'A1', tipo:'sust', pl:'Busse', gen:'-ses', esEx:'El autob\u00fas llega a las 8.'},
    {art:'der', de:'Zug', es:'el tren', ex:'Der Zug nach M\u00fcnchen f\u00e4hrt um 10 Uhr ab.', cat:'ciudad', sub:'transporte', niv:'A1', tipo:'sust', pl:'Z\u00fcge', gen:'-es', esEx:'El tren a M\u00fanich sale a las 10.'},
    {art:'das', de:'Flugzeug', es:'el avi\u00f3n', ex:'Wir fliegen mit dem Flugzeug.', cat:'ciudad', sub:'transporte', niv:'A1', tipo:'sust', pl:'Flugzeuge', gen:'-s', esEx:'Volamos en avi\u00f3n.'},
    {art:'das', de:'Auto', es:'el auto', ex:'Ich fahre jeden Tag mit dem Auto.', cat:'ciudad', sub:'transporte', niv:'A1', tipo:'sust', pl:'Autos', gen:'-s', esEx:'Manejo todos los d\u00edas.'},
    {art:'das', de:'Taxi', es:'el taxi', ex:'Ich nehme ein Taxi zum Flughafen.', cat:'ciudad', sub:'transporte', niv:'A1', tipo:'sust', pl:'Taxis', gen:'-s', esEx:'Tomo un taxi al aeropuerto.'},
    {art:'das', de:'Fahrrad', es:'la bicicleta', ex:'Ich fahre mit dem Fahrrad zur Arbeit.', cat:'ciudad', sub:'transporte', niv:'A1', tipo:'sust', pl:'Fahrr\u00e4der', gen:'-es', esEx:'Voy al trabajo en bicicleta.'},
    //    Tráfico y circulación
    {art:'die', de:'Stra\u00dfe', es:'la calle', ex:'Die Stra\u00dfe ist sehr breit.', cat:'ciudad', sub:'trafico', niv:'A1', tipo:'sust', pl:'Stra\u00dfen', gen:'-', esEx:'La calle es muy ancha.'},
    {art:'die', de:'Ampel', es:'el sem\u00e1foro', ex:'An der Ampel links abbiegen.', cat:'ciudad', sub:'trafico', niv:'A2', tipo:'sust', pl:'Ampeln', gen:'-', esEx:'En el sem\u00e1foro dobla a la izquierda.'},
    {art:'die', de:'Kreuzung', es:'el cruce', ex:'An der Kreuzung ist die Bank.', cat:'ciudad', sub:'trafico', niv:'A2', tipo:'sust', pl:'Kreuzungen', gen:'-', esEx:'En el cruce est\u00e1 el banco.'},
    {art:'der', de:'Parkplatz', es:'el estacionamiento', ex:'Der Parkplatz ist voll.', cat:'ciudad', sub:'trafico', niv:'A2', tipo:'sust', pl:'Parkpl\u00e4tze', gen:'-es', esEx:'El estacionamiento est\u00e1 lleno.'},
    {art:'der/die', de:'Fu\u00dfg\u00e4nger / Fu\u00dfg\u00e4ngerin', es:'el/la peat\u00f3n', ex:'Fu\u00dfg\u00e4nger haben hier Vorrang.', cat:'ciudad', sub:'trafico', niv:'A2', tipo:'sust', pl:'Fu\u00dfg\u00e4nger', gen:'-s', esEx:'Aqu\u00ed los peatones tienen preferencia.'},
    {art:'der', de:'Verkehr', es:'el tr\u00e1fico', ex:'Der Verkehr ist heute sehr stark.', cat:'ciudad', sub:'trafico', niv:'A2', tipo:'sust', pl:'-', gen:'-s', tag:'incontable', esEx:'Hoy hay mucho tr\u00e1fico.'},
    {art:'der', de:'Stau', es:'el atasco / embotellamiento', ex:'Wir stehen im Stau.', cat:'ciudad', sub:'trafico', niv:'A2', tipo:'sust', pl:'Staus', gen:'-s', esEx:'Estamos atorados en el tr\u00e1fico.'},
    //    Orientarse
    {art:'-', de:'links / rechts', es:'izquierda / derecha', ex:'Biegen Sie links ab!', cat:'ciudad', sub:'orientarse', niv:'A1', tipo:'adv', esEx:'\u00a1D\u00e9 vuelta a la izquierda!'},
    {art:'-', de:'geradeaus', es:'recto / de frente', ex:'Gehen Sie geradeaus, dann links.', cat:'ciudad', sub:'orientarse', niv:'A1', tipo:'adv', esEx:'Siga derecho y luego a la izquierda.'},

    // ── TRABAJO ─────────────────────────────────
    //    El puesto y la empresa
    {art:'die', de:'Arbeit', es:'el trabajo', ex:'Ich muss zur Arbeit.', cat:'trabajo', sub:'puesto', niv:'A1', tipo:'sust', pl:'Arbeiten', gen:'-', esEx:'Tengo que ir al trabajo.'},
    {art:'das', de:'B\u00fcro', es:'la oficina', ex:'Ich arbeite im B\u00fcro.', cat:'trabajo', sub:'puesto', niv:'A1', tipo:'sust', pl:'B\u00fcros', gen:'-s', esEx:'Trabajo en la oficina.'},
    {art:'der', de:'Beruf', es:'la profesi\u00f3n / el oficio', ex:'Was ist Ihr Beruf?', cat:'trabajo', sub:'puesto', niv:'A1', tipo:'sust', pl:'Berufe', gen:'-es', esEx:'\u00bfCu\u00e1l es su profesi\u00f3n?'},
    {art:'die', de:'Besprechung', es:'la reuni\u00f3n', ex:'Um 10 Uhr haben wir eine Besprechung.', cat:'trabajo', sub:'puesto', niv:'A2', tipo:'sust', pl:'Besprechungen', gen:'-', esEx:'A las 10 tenemos una reuni\u00f3n.'},
    {art:'die', de:'Teamarbeit', es:'el trabajo en equipo', ex:'Teamarbeit ist hier sehr wichtig.', cat:'trabajo', sub:'puesto', niv:'A2', tipo:'sust', pl:'-', tag:'incontable', esEx:'Aqu\u00ed el trabajo en equipo es muy importante.'},
    {art:'das', de:'Homeoffice', es:'el trabajo desde casa', ex:'Ich mache heute Homeoffice.', cat:'trabajo', sub:'puesto', niv:'A2', tipo:'sust', pl:'-', gen:'-s', esEx:'Hoy trabajo desde casa.'},
    //    Personas del trabajo
    {art:'der/die', de:'Chef / Chefin', es:'el/la jefe/a', ex:'Mein Chef ist nett.', cat:'trabajo', sub:'personas', niv:'A1', tipo:'sust', pl:'Chefs', gen:'-s', esEx:'Mi jefe es amable.'},
    {art:'der/die', de:'Kollege / Kollegin', es:'el/la colega', ex:'Meine Kollegen sind hilfsbereit.', cat:'trabajo', sub:'personas', niv:'A1', tipo:'sust', pl:'Kollegen', gen:'-n', tag:'declinaci\u00f3n -n', esEx:'Mis colegas son serviciales.'},
    //    Buscar empleo
    {art:'die', de:'Bewerbung', es:'la solicitud de empleo', ex:'Ich schicke meine Bewerbung ab.', cat:'trabajo', sub:'buscar', niv:'A2', tipo:'sust', pl:'Bewerbungen', gen:'-', esEx:'Env\u00edo mi solicitud de empleo.'},
    {art:'der', de:'Lebenslauf', es:'el curr\u00edculum vitae', ex:'Mein Lebenslauf ist aktuell.', cat:'trabajo', sub:'buscar', niv:'A2', tipo:'sust', pl:'Lebensl\u00e4ufe', gen:'-s', esEx:'Mi curr\u00edculum est\u00e1 actualizado.'},
    {art:'das', de:'Praktikum', es:'la pr\u00e1ctica profesional / pasant\u00eda', ex:'Ich mache ein Praktikum bei Bosch.', cat:'trabajo', sub:'buscar', niv:'A2', tipo:'sust', pl:'Praktika', gen:'-s', tag:'plural latino', esEx:'Hago una pasant\u00eda en Bosch.'},
    {art:'-', de:'arbeitslos', es:'desempleado', ex:'Er ist seit einem Monat arbeitslos.', cat:'trabajo', sub:'buscar', niv:'A2', tipo:'adj', esEx:'Lleva un mes desempleado.'},
    //    Formación
    {art:'die', de:'Pr\u00fcfung', es:'el examen', ex:'Morgen habe ich meine Deutschpr\u00fcfung.', cat:'trabajo', sub:'estudios', niv:'A1', tipo:'sust', pl:'Pr\u00fcfungen', gen:'-', esEx:'Ma\u00f1ana tengo mi examen de alem\u00e1n.'},
    {art:'das', de:'Studium', es:'los estudios universitarios', ex:'Mein Studium dauert 3 Jahre.', cat:'trabajo', sub:'estudios', niv:'A2', tipo:'sust', pl:'Studien', gen:'-s', esEx:'Mi carrera dura 3 a\u00f1os.'},
    {art:'der', de:'Kurs', es:'el curso', ex:'Ich besuche einen Deutschkurs.', cat:'trabajo', sub:'estudios', niv:'A1', tipo:'sust', pl:'Kurse', gen:'-es', esEx:'Asisto a un curso de alem\u00e1n.'},
    //    Jornada, sueldo y contrato
    {art:'das', de:'Gehalt', es:'el salario', ex:'Mein Gehalt ist gut.', cat:'trabajo', sub:'condiciones', niv:'A2', tipo:'sust', pl:'Geh\u00e4lter', gen:'-es', esEx:'Mi salario es bueno.'},
    {art:'der', de:'Urlaub', es:'las vacaciones', ex:'Im August mache ich Urlaub.', cat:'trabajo', sub:'condiciones', niv:'A1', tipo:'sust', pl:'Urlaube', gen:'-s', esEx:'En agosto me voy de vacaciones.'},
    {art:'der', de:'Vertrag', es:'el contrato', ex:'Ich habe den Vertrag unterschrieben.', cat:'trabajo', sub:'condiciones', niv:'A2', tipo:'sust', pl:'Vertr\u00e4ge', gen:'-es', esEx:'Firm\u00e9 el contrato.'},
    {art:'die', de:'K\u00fcndigung', es:'el despido / la renuncia', ex:'Er hat die K\u00fcndigung bekommen.', cat:'trabajo', sub:'condiciones', niv:'B1', tipo:'sust', pl:'K\u00fcndigungen', gen:'-', esEx:'Le lleg\u00f3 el despido.'},
    {art:'der', de:'Feierabend', es:'el fin de la jornada laboral', ex:'Endlich Feierabend!', cat:'trabajo', sub:'condiciones', niv:'A2', tipo:'sust', pl:'Feierabende', gen:'-s', uso:'no hay palabra equivalente en espa\u00f1ol', esEx:'\u00a1Por fin se acab\u00f3 la jornada!'},
    {art:'-', de:'Vollzeit / Teilzeit', es:'tiempo completo / parcial', ex:'Ich arbeite Teilzeit.', cat:'trabajo', sub:'condiciones', niv:'A2', tipo:'sust', esEx:'Trabajo medio tiempo.'},
    {art:'die', de:'Rente', es:'la pensi\u00f3n / jubilaci\u00f3n', ex:'Meine Oma bekommt eine gute Rente.', cat:'trabajo', sub:'condiciones', niv:'B1', tipo:'sust', pl:'Renten', gen:'-', esEx:'Mi abuela recibe una buena pensi\u00f3n.'},

    // ── NATURALEZA ─────────────────────────────────
    //    El clima
    {art:'die', de:'Sonne', es:'el sol', ex:'Die Sonne scheint heute.', cat:'naturaleza', sub:'clima', niv:'A1', tipo:'sust', pl:'Sonnen', gen:'-', esEx:'Hoy brilla el sol.'},
    {art:'der', de:'Regen', es:'la lluvia', ex:'Es regnet den ganzen Tag.', cat:'naturaleza', sub:'clima', niv:'A1', tipo:'sust', pl:'-', gen:'-s', tag:'incontable', esEx:'Llueve todo el d\u00eda.'},
    {art:'der', de:'Schnee', es:'la nieve', ex:'Im Winter gibt es viel Schnee.', cat:'naturaleza', sub:'clima', niv:'A1', tipo:'sust', pl:'-', gen:'-s', tag:'incontable', esEx:'En invierno hay mucha nieve.'},
    {art:'der', de:'Wind', es:'el viento', ex:'Der Wind ist stark heute.', cat:'naturaleza', sub:'clima', niv:'A1', tipo:'sust', pl:'Winde', gen:'-es', esEx:'Hoy el viento es fuerte.'},
    {art:'die', de:'Wolke', es:'la nube', ex:'Heute ist es bew\u00f6lkt.', cat:'naturaleza', sub:'clima', niv:'A1', tipo:'sust', pl:'Wolken', gen:'-', esEx:'Hoy est\u00e1 nublado.'},
    {art:'-', de:'warm / kalt / hei\u00df', es:'c\u00e1lido / fr\u00edo / caliente', ex:'Im Sommer ist es hei\u00df, im Winter kalt.', cat:'naturaleza', sub:'clima', niv:'A1', tipo:'adj', comp:'w\u00e4rmer \u00b7 k\u00e4lter \u00b7 hei\u00dfer', esEx:'En verano hace calor, en invierno fr\u00edo.'},
    {art:'-', de:'Es regnet', es:'Est\u00e1 lloviendo', ex:'Es regnet \u2014 nimm einen Regenschirm!', cat:'naturaleza', sub:'clima', niv:'A1', tipo:'frase', uso:'verbo impersonal: siempre con es', esEx:'Est\u00e1 lloviendo, \u00a1lleva un paraguas!'},
    {art:'-', de:'Es schneit', es:'Est\u00e1 nevando', ex:'Es schneit in Berlin.', cat:'naturaleza', sub:'clima', niv:'A1', tipo:'frase', uso:'verbo impersonal: siempre con es', esEx:'Est\u00e1 nevando en Berl\u00edn.'},
    {art:'die', de:'Temperatur', es:'la temperatura', ex:'Die Temperatur betr\u00e4gt 20 Grad.', cat:'naturaleza', sub:'clima', niv:'A2', tipo:'sust', pl:'Temperaturen', gen:'-', esEx:'La temperatura es de 20 grados.'},
    //    Paisaje y accidentes
    {art:'der', de:'Wald', es:'el bosque', ex:'Wir machen einen Spaziergang im Wald.', cat:'naturaleza', sub:'paisaje', niv:'A1', tipo:'sust', pl:'W\u00e4lder', gen:'-es', esEx:'Damos un paseo por el bosque.'},
    {art:'der', de:'Fluss', es:'el r\u00edo', ex:'Die Donau ist ein gro\u00dfer Fluss.', cat:'naturaleza', sub:'paisaje', niv:'A1', tipo:'sust', pl:'Fl\u00fcsse', gen:'-es', esEx:'El Danubio es un r\u00edo grande.'},
    {art:'das', de:'Meer', es:'el mar', ex:'Im Sommer fahren wir ans Meer.', cat:'naturaleza', sub:'paisaje', niv:'A1', tipo:'sust', pl:'Meere', gen:'-es', esEx:'En verano vamos al mar.'},
    {art:'der', de:'Berg', es:'la monta\u00f1a', ex:'Die Alpen sind sehr sch\u00f6ne Berge.', cat:'naturaleza', sub:'paisaje', niv:'A1', tipo:'sust', pl:'Berge', gen:'-es', esEx:'Los Alpes son monta\u00f1as muy bonitas.'},
    {art:'die', de:'Insel', es:'la isla', ex:'Wir verbringen den Urlaub auf einer Insel.', cat:'naturaleza', sub:'paisaje', niv:'A2', tipo:'sust', pl:'Inseln', gen:'-', esEx:'Pasamos las vacaciones en una isla.'},
    {art:'der', de:'See', es:'el lago', ex:'Wir schwimmen im See.', cat:'naturaleza', sub:'paisaje', niv:'A2', tipo:'sust', pl:'Seen', gen:'-s', uso:'der See = lago; die See = mar', esEx:'Nadamos en el lago.'},
    {art:'die', de:'W\u00fcste', es:'el desierto', ex:'Die W\u00fcste ist sehr trocken.', cat:'naturaleza', sub:'paisaje', niv:'B1', tipo:'sust', pl:'W\u00fcsten', gen:'-', esEx:'El desierto es muy seco.'},
    //    Plantas y animales
    {art:'der', de:'Baum', es:'el \u00e1rbol', ex:'Vor dem Haus steht ein gro\u00dfer Baum.', cat:'naturaleza', sub:'vida', niv:'A1', tipo:'sust', pl:'B\u00e4ume', gen:'-es', esEx:'Delante de la casa hay un \u00e1rbol grande.'},
    {art:'die', de:'Blume', es:'la flor', ex:'Sie schenkt mir immer Blumen.', cat:'naturaleza', sub:'vida', niv:'A1', tipo:'sust', pl:'Blumen', gen:'-', esEx:'Ella siempre me regala flores.'},
    {art:'das', de:'Tier', es:'el animal', ex:'Welches Tier magst du am liebsten?', cat:'naturaleza', sub:'vida', niv:'A1', tipo:'sust', pl:'Tiere', gen:'-es', esEx:'\u00bfCu\u00e1l es tu animal favorito?'},
    //    El cielo
    {art:'der', de:'Himmel', es:'el cielo', ex:'Der Himmel ist heute klar.', cat:'naturaleza', sub:'cielo', niv:'A1', tipo:'sust', pl:'Himmel', gen:'-s', esEx:'Hoy el cielo est\u00e1 despejado.'},
    {art:'der', de:'Stern', es:'la estrella', ex:'Man kann die Sterne gut sehen.', cat:'naturaleza', sub:'cielo', niv:'A1', tipo:'sust', pl:'Sterne', gen:'-es', esEx:'Se ven bien las estrellas.'},
    {art:'der', de:'Mond', es:'la luna', ex:'Der Mond ist heute voll.', cat:'naturaleza', sub:'cielo', niv:'A1', tipo:'sust', pl:'Monde', gen:'-es', esEx:'Hoy hay luna llena.'},
    //    Medio ambiente
    {art:'die', de:'Umwelt', es:'el medio ambiente', ex:'Wir m\u00fcssen die Umwelt sch\u00fctzen.', cat:'naturaleza', sub:'medioambiente', niv:'B1', tipo:'sust', pl:'-', tag:'incontable', esEx:'Tenemos que proteger el medio ambiente.'},

    // ── HOBBIES ─────────────────────────────────
    //    Tiempo libre
    {art:'das', de:'Hobby', es:'el pasatiempo / hobby', ex:'Mein Hobby ist Fotografieren.', cat:'hobbies', sub:'tiempo', niv:'A1', tipo:'sust', pl:'Hobbys', gen:'-s', esEx:'Mi pasatiempo es la fotograf\u00eda.'},
    {art:'die', de:'Freizeit', es:'el tiempo libre', ex:'In meiner Freizeit lese ich viel.', cat:'hobbies', sub:'tiempo', niv:'A1', tipo:'sust', pl:'-', tag:'incontable', esEx:'En mi tiempo libre leo mucho.'},
    {art:'-', de:'gern / lieber / am liebsten', es:'con gusto / preferir / lo que m\u00e1s', ex:'Ich schwimme gern, aber lieber laufe ich.', cat:'hobbies', sub:'tiempo', niv:'A1', tipo:'adv', tag:'irregular', uso:'no es un verbo: acompa\u00f1a al verbo para decir que algo gusta', esEx:'Me gusta nadar, pero prefiero correr.'},
    {art:'-', de:'Spa\u00df machen', es:'ser divertido', ex:'Klettern macht mir viel Spa\u00df.', cat:'hobbies', sub:'tiempo', niv:'A2', tipo:'frase', uso:'el sujeto es la actividad, no la persona: \u00abme hace gracia\u00bb', esEx:'Escalar me divierte mucho.'},
    {art:'-', de:'sich interessieren', es:'interesarse', ex:'Ich interessiere mich f\u00fcr Musik.', cat:'hobbies', sub:'tiempo', niv:'A2', tipo:'verbo', conj:'interessiert sich \u00b7 interessierte sich \u00b7 sich interessiert', aux:'hat', reg:'sich interessieren f\u00fcr + Akk.', tag:'reflexivo \u00b7 sin ge-', esEx:'Me intereso por la m\u00fasica.'},
    //    Deporte
    {art:'der', de:'Sport', es:'el deporte', ex:'Ich mache jeden Tag Sport.', cat:'hobbies', sub:'deporte', niv:'A1', tipo:'sust', pl:'-', gen:'-es', tag:'incontable', uso:'\u00abhacer deporte\u00bb es Sport machen, no Sport tun', esEx:'Hago deporte todos los d\u00edas.'},
    {art:'das', de:'Fitnessstudio', es:'el gimnasio', ex:'Ich gehe dreimal pro Woche ins Fitnessstudio.', cat:'hobbies', sub:'deporte', niv:'A1', tipo:'sust', pl:'Fitnessstudios', gen:'-s', esEx:'Voy al gimnasio tres veces por semana.'},
    {art:'-', de:'schwimmen', es:'nadar', ex:'Im Sommer schwimme ich im See.', cat:'hobbies', sub:'deporte', niv:'A1', tipo:'verbo', conj:'schwimmt \u00b7 schwamm \u00b7 geschwommen', aux:'ist', tag:'irregular', uso:'con sein cuando hay recorrido, con haben si es la actividad', esEx:'En verano nado en el lago.'},
    {art:'-', de:'laufen', es:'correr', ex:'Ich laufe jeden Morgen im Park.', cat:'hobbies', sub:'deporte', niv:'A1', tipo:'verbo', conj:'l\u00e4uft \u00b7 lief \u00b7 gelaufen', aux:'ist', tag:'irregular', esEx:'Corro cada ma\u00f1ana en el parque.'},
    {art:'-', de:'trainieren', es:'entrenar', ex:'Ich trainiere f\u00fcr den Marathon.', cat:'hobbies', sub:'deporte', niv:'A2', tipo:'verbo', conj:'trainiert \u00b7 trainierte \u00b7 trainiert', aux:'hat', reg:'trainieren f\u00fcr + Akk.', tag:'sin ge-', esEx:'Entreno para el marat\u00f3n.'},
    {art:'der', de:'Fu\u00dfball', es:'el f\u00fatbol', ex:'Am Wochenende spiele ich Fu\u00dfball.', cat:'hobbies', sub:'deporte', niv:'A1', tipo:'sust', pl:'Fu\u00dfb\u00e4lle', gen:'-s', uso:'el deporte va sin art\u00edculo: Fu\u00dfball spielen', esEx:'El fin de semana juego f\u00fatbol.'},
    {art:'die', de:'Mannschaft', es:'el equipo', ex:'Unsere Mannschaft hat gewonnen.', cat:'hobbies', sub:'deporte', niv:'A2', tipo:'sust', pl:'Mannschaften', gen:'-', esEx:'Nuestro equipo gan\u00f3.'},
    {art:'das', de:'Spiel', es:'el partido / el juego', ex:'Das Spiel beginnt um 20 Uhr.', cat:'hobbies', sub:'deporte', niv:'A1', tipo:'sust', pl:'Spiele', gen:'-s', esEx:'El partido empieza a las 20:00.'},
    {art:'-', de:'gewinnen / verlieren', es:'ganar / perder', ex:'Wir haben 3:1 gewonnen.', cat:'hobbies', sub:'deporte', niv:'A2', tipo:'verbo', conj:'gewinnt \u00b7 gewann \u00b7 gewonnen', aux:'hat', tag:'irregular', esEx:'Ganamos 3 a 1.'},
    {art:'der', de:'Verein', es:'el club / la asociaci\u00f3n', ex:'Ich bin in einem Sportverein.', cat:'hobbies', sub:'deporte', niv:'A2', tipo:'sust', pl:'Vereine', gen:'-s', uso:'muy alem\u00e1n: hay un Verein para casi todo', esEx:'Estoy en un club deportivo.'},
    {art:'-', de:'Rad fahren', es:'andar en bicicleta', ex:'Am Sonntag fahren wir Rad.', cat:'hobbies', sub:'deporte', niv:'A1', tipo:'verbo', conj:'f\u00e4hrt Rad \u00b7 fuhr Rad \u00b7 Rad gefahren', aux:'ist', tag:'separable \u00b7 irregular', esEx:'El domingo andamos en bicicleta.'},
    {art:'-', de:'wandern', es:'hacer senderismo', ex:'Wir wandern gern in den Bergen.', cat:'hobbies', sub:'deporte', niv:'A2', tipo:'verbo', conj:'wandert \u00b7 wanderte \u00b7 gewandert', aux:'ist', uso:'no es \u00abcaminar\u00bb: es caminar por el campo, y es un deporte nacional', esEx:'Nos gusta hacer senderismo en las monta\u00f1as.'},
    {art:'-', de:'klettern', es:'escalar', ex:'Ich klettere in der Halle.', cat:'hobbies', sub:'deporte', niv:'A2', tipo:'verbo', conj:'klettert \u00b7 kletterte \u00b7 geklettert', aux:'ist', esEx:'Escalo en el roc\u00f3dromo.'},
    //    Música
    {art:'die', de:'Musik', es:'la m\u00fasica', ex:'Ich h\u00f6re gern klassische Musik.', cat:'hobbies', sub:'musica', niv:'A1', tipo:'sust', pl:'-', tag:'incontable', esEx:'Me gusta escuchar m\u00fasica cl\u00e1sica.'},
    {art:'das', de:'Lied', es:'la canci\u00f3n', ex:'Dieses Lied gef\u00e4llt mir sehr.', cat:'hobbies', sub:'musica', niv:'A1', tipo:'sust', pl:'Lieder', gen:'-es', esEx:'Esta canci\u00f3n me gusta mucho.'},
    {art:'-', de:'singen', es:'cantar', ex:'Sie singt in einem Chor.', cat:'hobbies', sub:'musica', niv:'A1', tipo:'verbo', conj:'singt \u00b7 sang \u00b7 gesungen', aux:'hat', tag:'irregular', esEx:'Ella canta en un coro.'},
    {art:'das', de:'Instrument', es:'el instrumento', ex:'Spielst du ein Instrument?', cat:'hobbies', sub:'musica', niv:'A2', tipo:'sust', pl:'Instrumente', gen:'-s', esEx:'\u00bfTocas alg\u00fan instrumento?'},
    {art:'die', de:'Gitarre', es:'la guitarra', ex:'Ich lerne Gitarre spielen.', cat:'hobbies', sub:'musica', niv:'A1', tipo:'sust', pl:'Gitarren', gen:'-', uso:'el instrumento lleva art\u00edculo: Gitarre spielen, pero die Gitarre', esEx:'Estoy aprendiendo a tocar la guitarra.'},
    {art:'das', de:'Klavier', es:'el piano', ex:'Er spielt seit zehn Jahren Klavier.', cat:'hobbies', sub:'musica', niv:'A2', tipo:'sust', pl:'Klaviere', gen:'-s', esEx:'Toca el piano desde hace diez a\u00f1os.'},
    {art:'das', de:'Konzert', es:'el concierto', ex:'Wir gehen morgen ins Konzert.', cat:'hobbies', sub:'musica', niv:'A1', tipo:'sust', pl:'Konzerte', gen:'-es', esEx:'Ma\u00f1ana vamos al concierto.'},
    {art:'die', de:'Band', es:'la banda / el grupo', ex:'Meine Lieblingsband kommt aus Berlin.', cat:'hobbies', sub:'musica', niv:'A2', tipo:'sust', pl:'Bands', gen:'-', esEx:'Mi banda favorita es de Berl\u00edn.'},
    //    Arte y manualidades
    {art:'die', de:'Kunst', es:'el arte', ex:'Ich interessiere mich f\u00fcr moderne Kunst.', cat:'hobbies', sub:'arte', niv:'A2', tipo:'sust', pl:'K\u00fcnste', gen:'-', esEx:'Me interesa el arte moderno.'},
    {art:'-', de:'malen', es:'pintar', ex:'Am Wochenende male ich gern.', cat:'hobbies', sub:'arte', niv:'A1', tipo:'verbo', conj:'malt \u00b7 malte \u00b7 gemalt', aux:'hat', uso:'malen es pintar un cuadro; streichen, pintar una pared', esEx:'Los fines de semana me gusta pintar.'},
    {art:'-', de:'zeichnen', es:'dibujar', ex:'Sie zeichnet sehr gut.', cat:'hobbies', sub:'arte', niv:'A2', tipo:'verbo', conj:'zeichnet \u00b7 zeichnete \u00b7 gezeichnet', aux:'hat', esEx:'Ella dibuja muy bien.'},
    {art:'das', de:'Bild', es:'el cuadro / la imagen', ex:'Dieses Bild hat mein Sohn gemalt.', cat:'hobbies', sub:'arte', niv:'A1', tipo:'sust', pl:'Bilder', gen:'-es', esEx:'Este cuadro lo pint\u00f3 mi hijo.'},
    {art:'-', de:'fotografieren', es:'fotografiar', ex:'Ich fotografiere gern die Natur.', cat:'hobbies', sub:'arte', niv:'A2', tipo:'verbo', conj:'fotografiert \u00b7 fotografierte \u00b7 fotografiert', aux:'hat', tag:'sin ge-', esEx:'Me gusta fotografiar la naturaleza.'},
    {art:'die', de:'Kamera', es:'la c\u00e1mara', ex:'Meine Kamera ist ziemlich alt.', cat:'hobbies', sub:'arte', niv:'A2', tipo:'sust', pl:'Kameras', gen:'-', esEx:'Mi c\u00e1mara es bastante vieja.'},
    {art:'-', de:'basteln', es:'hacer manualidades', ex:'Die Kinder basteln gern.', cat:'hobbies', sub:'arte', niv:'A2', tipo:'verbo', conj:'bastelt \u00b7 bastelte \u00b7 gebastelt', aux:'hat', uso:'no hay palabra exacta en espa\u00f1ol: es construir cosas a mano', esEx:'A los ni\u00f1os les gusta hacer manualidades.'},
    //    Juegos
    {art:'das', de:'Brettspiel', es:'el juego de mesa', ex:'Wir spielen abends oft Brettspiele.', cat:'hobbies', sub:'juegos', niv:'A2', tipo:'sust', pl:'Brettspiele', gen:'-s', esEx:'Por las noches jugamos juegos de mesa a menudo.'},
    {art:'das', de:'Videospiel', es:'el videojuego', ex:'Mein Bruder spielt gern Videospiele.', cat:'hobbies', sub:'juegos', niv:'A2', tipo:'sust', pl:'Videospiele', gen:'-s', esEx:'A mi hermano le gusta jugar videojuegos.'},
    {art:'das', de:'Schach', es:'el ajedrez', ex:'Mein Opa hat mir Schach beigebracht.', cat:'hobbies', sub:'juegos', niv:'A2', tipo:'sust', pl:'-', gen:'-s', tag:'incontable', esEx:'Mi abuelo me ense\u00f1\u00f3 a jugar ajedrez.'},
    {art:'pl.', de:'Karten', es:'las cartas (naipes)', ex:'Spielen wir Karten?', cat:'hobbies', sub:'juegos', niv:'A1', tipo:'sust', tag:'solo plural', uso:'Karten spielen, sin art\u00edculo', esEx:'\u00bfJugamos a las cartas?'},
    {art:'das', de:'Puzzle', es:'el rompecabezas', ex:'Das Puzzle hat tausend Teile.', cat:'hobbies', sub:'juegos', niv:'A2', tipo:'sust', pl:'Puzzles', gen:'-s', esEx:'El rompecabezas tiene mil piezas.'},
    //    Al aire libre
    {art:'der', de:'Spaziergang', es:'el paseo', ex:'Machen wir einen Spaziergang?', cat:'hobbies', sub:'aire', niv:'A1', tipo:'sust', pl:'Spazierg\u00e4nge', gen:'-s', uso:'se \u00abhace\u00bb un paseo: einen Spaziergang machen', esEx:'\u00bfDamos un paseo?'},
    {art:'der', de:'Ausflug', es:'la excursi\u00f3n', ex:'Am Sonntag machen wir einen Ausflug.', cat:'hobbies', sub:'aire', niv:'A2', tipo:'sust', pl:'Ausfl\u00fcge', gen:'-s', esEx:'El domingo hacemos una excursi\u00f3n.'},
    {art:'-', de:'grillen', es:'hacer parrillada', ex:'Im Sommer grillen wir im Garten.', cat:'hobbies', sub:'aire', niv:'A2', tipo:'verbo', conj:'grillt \u00b7 grillte \u00b7 gegrillt', aux:'hat', esEx:'En verano hacemos parrillada en el jard\u00edn.'},
    {art:'-', de:'zelten / campen', es:'acampar', ex:'Wir zelten am See.', cat:'hobbies', sub:'aire', niv:'A2', tipo:'verbo', conj:'zeltet \u00b7 zeltete \u00b7 gezeltet', aux:'hat', esEx:'Acampamos junto al lago.'},
    {art:'-', de:'angeln', es:'pescar', ex:'Mein Vater angelt jeden Samstag.', cat:'hobbies', sub:'aire', niv:'B1', tipo:'verbo', conj:'angelt \u00b7 angelte \u00b7 geangelt', aux:'hat', esEx:'Mi padre pesca todos los s\u00e1bados.'},
    {art:'der', de:'Garten', es:'la jardiner\u00eda / el huerto', ex:'Die Arbeit im Garten entspannt mich.', cat:'hobbies', sub:'aire', niv:'A2', tipo:'sust', pl:'G\u00e4rten', gen:'-s', uso:'el mismo Garten de Casa; aqu\u00ed como afici\u00f3n', esEx:'Los ni\u00f1os juegan en el jard\u00edn.'},
    //    En casa
    {art:'-', de:'kochen', es:'cocinar', ex:'Ich koche gern f\u00fcr meine Familie.', cat:'hobbies', sub:'casa', niv:'A1', tipo:'verbo', conj:'kocht \u00b7 kochte \u00b7 gekocht', aux:'hat', esEx:'Me gusta cocinar para mi familia.'},
    {art:'-', de:'backen', es:'hornear', ex:'Meine Oma backt jeden Sonntag Kuchen.', cat:'hobbies', sub:'casa', niv:'A2', tipo:'verbo', conj:'backt \u00b7 backte \u00b7 gebacken', aux:'hat', tag:'irregular', uso:'kochen es con fuego; backen, en el horno', esEx:'Mi abuela hornea pastel cada domingo.'},
    {art:'-', de:'fernsehen', es:'ver la tele', ex:'Abends sehe ich eine Stunde fern.', cat:'hobbies', sub:'casa', niv:'A1', tipo:'verbo', conj:'sieht fern \u00b7 sah fern \u00b7 ferngesehen', aux:'hat', tag:'separable \u00b7 irregular', uso:'la part\u00edcula se va al final: ich sehe fern', esEx:'Por las noches veo una hora de tele.'},
    {art:'der', de:'Film', es:'la pel\u00edcula', ex:'Der Film war richtig gut.', cat:'hobbies', sub:'casa', niv:'A1', tipo:'sust', pl:'Filme', gen:'-es', esEx:'La pel\u00edcula estuvo muy buena.'},
    {art:'die', de:'Serie', es:'la serie', ex:'Ich schaue gerade eine deutsche Serie.', cat:'hobbies', sub:'casa', niv:'A2', tipo:'sust', pl:'Serien', gen:'-', esEx:'Estoy viendo una serie alemana.'},
    {art:'-', de:'sich entspannen', es:'relajarse', ex:'Am Wochenende entspanne ich mich.', cat:'hobbies', sub:'casa', niv:'A2', tipo:'verbo', conj:'entspannt sich \u00b7 entspannte sich \u00b7 sich entspannt', aux:'hat', tag:'reflexivo \u00b7 sin ge-', esEx:'El fin de semana me relajo.'},
    //    Salir
    {art:'das', de:'Kino', es:'el cine', ex:'Gehen wir heute ins Kino?', cat:'hobbies', sub:'salir', niv:'A1', tipo:'sust', pl:'Kinos', gen:'-s', uso:'ins Kino gehen: al cine, con Akkusativ', esEx:'\u00bfVamos hoy al cine?'},
    {art:'das', de:'Theater', es:'el teatro', ex:'Das Theater ist neben dem Museum.', cat:'hobbies', sub:'salir', niv:'A2', tipo:'sust', pl:'Theater', gen:'-s', esEx:'El teatro est\u00e1 junto al museo.'},
    {art:'das', de:'Museum', es:'el museo', ex:'Am Sonntag ist das Museum kostenlos.', cat:'hobbies', sub:'salir', niv:'A1', tipo:'sust', pl:'Museen', gen:'-s', tag:'plural latino', esEx:'El domingo el museo es gratis.'},
    {art:'das', de:'Restaurant', es:'el restaurante', ex:'Wir essen heute im Restaurant.', cat:'hobbies', sub:'salir', niv:'A1', tipo:'sust', pl:'Restaurants', gen:'-s', esEx:'Hoy comemos en el restaurante.'},
    {art:'die', de:'Kneipe', es:'el bar (de barrio)', ex:'Nach der Arbeit gehen wir in die Kneipe.', cat:'hobbies', sub:'salir', niv:'A2', tipo:'sust', pl:'Kneipen', gen:'-', uso:'Kneipe es el bar de toda la vida; Bar suena m\u00e1s moderno', esEx:'Despu\u00e9s del trabajo vamos al bar.'},
    {art:'die', de:'Party', es:'la fiesta', ex:'Am Samstag ist eine Party bei Anna.', cat:'hobbies', sub:'salir', niv:'A1', tipo:'sust', pl:'Partys', gen:'-', esEx:'El s\u00e1bado hay una fiesta en casa de Anna.'},
    {art:'-', de:'feiern', es:'celebrar / festejar', ex:'Wir feiern heute meinen Geburtstag.', cat:'hobbies', sub:'salir', niv:'A1', tipo:'verbo', conj:'feiert \u00b7 feierte \u00b7 gefeiert', aux:'hat', esEx:'Hoy celebramos mi cumplea\u00f1os.'},
    {art:'-', de:'tanzen', es:'bailar', ex:'Sie tanzt sehr gut Salsa.', cat:'hobbies', sub:'salir', niv:'A1', tipo:'verbo', conj:'tanzt \u00b7 tanzte \u00b7 getanzt', aux:'hat', esEx:'Ella baila salsa muy bien.'},
    {art:'-', de:'ausgehen', es:'salir (de noche)', ex:'Freitags gehen wir oft aus.', cat:'hobbies', sub:'salir', niv:'A2', tipo:'verbo', conj:'geht aus \u00b7 ging aus \u00b7 ausgegangen', aux:'ist', tag:'separable \u00b7 irregular', esEx:'Los viernes salimos a menudo.'},

    // ── VERBOS ─────────────────────────────────
    //    Los imprescindibles
    {art:'-', de:'sein', es:'ser / estar', ex:'Ich bin Mexikaner. Er ist m\u00fcde.', cat:'verbos', sub:'esenciales', niv:'A1', tipo:'verbo', conj:'ist \u00b7 war \u00b7 gewesen', aux:'ist', tag:'irregular', esEx:'Soy mexicano. \u00c9l est\u00e1 cansado.'},
    {art:'-', de:'haben', es:'tener / haber', ex:'Ich habe einen Bruder.', cat:'verbos', sub:'esenciales', niv:'A1', tipo:'verbo', conj:'hat \u00b7 hatte \u00b7 gehabt', aux:'hat', tag:'irregular', esEx:'Tengo un hermano.'},
    {art:'-', de:'machen', es:'hacer', ex:'Was machst du heute?', cat:'verbos', sub:'esenciales', niv:'A1', tipo:'verbo', conj:'macht \u00b7 machte \u00b7 gemacht', aux:'hat', esEx:'\u00bfQu\u00e9 haces hoy?'},
    {art:'-', de:'wissen', es:'saber', ex:'Ich wei\u00df nicht.', cat:'verbos', sub:'esenciales', niv:'A1', tipo:'verbo', conj:'wei\u00df \u00b7 wusste \u00b7 gewusst', aux:'hat', tag:'irregular', esEx:'No s\u00e9.'},
    {art:'-', de:'m\u00f6chten', es:'quisiera / querer', ex:'Ich m\u00f6chte einen Kaffee.', cat:'verbos', sub:'esenciales', niv:'A1', tipo:'verbo', conj:'m\u00f6chte \u00b7 wollte \u00b7 gewollt', aux:'hat', tag:'modal', uso:'forma cort\u00e9s de m\u00f6gen; el pasado usa wollen', esEx:'Quisiera un caf\u00e9.'},
    {art:'-', de:'brauchen', es:'necesitar', ex:'Ich brauche Hilfe.', cat:'verbos', sub:'esenciales', niv:'A1', tipo:'verbo', conj:'braucht \u00b7 brauchte \u00b7 gebraucht', aux:'hat', esEx:'Necesito ayuda.'},
    {art:'-', de:'m\u00f6gen', es:'gustar / apreciar', ex:'Ich mag diese Stadt.', cat:'verbos', sub:'esenciales', niv:'A1', tipo:'verbo', conj:'mag \u00b7 mochte \u00b7 gemocht', aux:'hat', tag:'modal', esEx:'Me gusta esta ciudad.'},
    //    Movimiento
    {art:'-', de:'gehen', es:'ir / caminar', ex:'Ich gehe in die Schule.', cat:'verbos', sub:'movimiento', niv:'A1', tipo:'verbo', conj:'geht \u00b7 ging \u00b7 gegangen', aux:'ist', tag:'irregular', esEx:'Voy a la escuela.'},
    {art:'-', de:'kommen', es:'venir / llegar', ex:'Wann kommst du?', cat:'verbos', sub:'movimiento', niv:'A1', tipo:'verbo', conj:'kommt \u00b7 kam \u00b7 gekommen', aux:'ist', tag:'irregular', esEx:'\u00bfCu\u00e1ndo vienes?'},
    {art:'-', de:'fahren', es:'ir (en veh\u00edculo)', ex:'Ich fahre mit dem Zug nach Berlin.', cat:'verbos', sub:'movimiento', niv:'A1', tipo:'verbo', conj:'f\u00e4hrt \u00b7 fuhr \u00b7 gefahren', aux:'ist', tag:'irregular', esEx:'Voy a Berl\u00edn en tren.'},
    {art:'-', de:'bleiben', es:'quedarse', ex:'Ich bleibe heute zu Hause.', cat:'verbos', sub:'movimiento', niv:'A1', tipo:'verbo', conj:'bleibt \u00b7 blieb \u00b7 geblieben', aux:'ist', tag:'irregular', esEx:'Hoy me quedo en casa.'},
    //    Rutina diaria
    {art:'-', de:'essen', es:'comer', ex:'Ich esse gern Pizza.', cat:'verbos', sub:'rutina', niv:'A1', tipo:'verbo', conj:'isst \u00b7 a\u00df \u00b7 gegessen', aux:'hat', tag:'irregular', esEx:'Me gusta comer pizza.'},
    {art:'-', de:'trinken', es:'beber', ex:'Ich trinke Kaffee.', cat:'verbos', sub:'rutina', niv:'A1', tipo:'verbo', conj:'trinkt \u00b7 trank \u00b7 getrunken', aux:'hat', tag:'irregular', esEx:'Tomo caf\u00e9.'},
    {art:'-', de:'schlafen', es:'dormir', ex:'Ich schlafe 8 Stunden.', cat:'verbos', sub:'rutina', niv:'A1', tipo:'verbo', conj:'schl\u00e4ft \u00b7 schlief \u00b7 geschlafen', aux:'hat', tag:'irregular', esEx:'Duermo 8 horas.'},
    {art:'-', de:'arbeiten', es:'trabajar', ex:'Ich arbeite bei Bosch.', cat:'verbos', sub:'rutina', niv:'A1', tipo:'verbo', conj:'arbeitet \u00b7 arbeitete \u00b7 gearbeitet', aux:'hat', esEx:'Trabajo en Bosch.'},
    {art:'-', de:'wohnen', es:'vivir / residir', ex:'Ich wohne in Berlin.', cat:'verbos', sub:'rutina', niv:'A1', tipo:'verbo', conj:'wohnt \u00b7 wohnte \u00b7 gewohnt', aux:'hat', esEx:'Vivo en Berl\u00edn.'},
    {art:'-', de:'spielen', es:'jugar', ex:'Die Kinder spielen im Park.', cat:'verbos', sub:'rutina', niv:'A1', tipo:'verbo', conj:'spielt \u00b7 spielte \u00b7 gespielt', aux:'hat', esEx:'Los ni\u00f1os juegan en el parque.'},
    //    Comunicarse
    {art:'-', de:'sprechen', es:'hablar', ex:'Ich spreche Deutsch und Spanisch.', cat:'verbos', sub:'comunicar', niv:'A1', tipo:'verbo', conj:'spricht \u00b7 sprach \u00b7 gesprochen', aux:'hat', reg:'sprechen mit + Dat.', tag:'irregular', esEx:'Hablo alem\u00e1n y espa\u00f1ol.'},
    {art:'-', de:'verstehen', es:'entender', ex:'Ich verstehe diese Frage nicht.', cat:'verbos', sub:'comunicar', niv:'A1', tipo:'verbo', conj:'versteht \u00b7 verstand \u00b7 verstanden', aux:'hat', tag:'irregular \u00b7 sin ge-', esEx:'No entiendo esta pregunta.'},
    {art:'-', de:'schreiben', es:'escribir', ex:'Ich schreibe eine E-Mail.', cat:'verbos', sub:'comunicar', niv:'A1', tipo:'verbo', conj:'schreibt \u00b7 schrieb \u00b7 geschrieben', aux:'hat', tag:'irregular', esEx:'Escribo un correo.'},
    {art:'-', de:'lesen', es:'leer', ex:'Ich lese jeden Abend.', cat:'verbos', sub:'comunicar', niv:'A1', tipo:'verbo', conj:'liest \u00b7 las \u00b7 gelesen', aux:'hat', tag:'irregular', esEx:'Leo cada noche.'},
    {art:'-', de:'h\u00f6ren', es:'escuchar / o\u00edr', ex:'Ich h\u00f6re gern Musik.', cat:'verbos', sub:'comunicar', niv:'A1', tipo:'verbo', conj:'h\u00f6rt \u00b7 h\u00f6rte \u00b7 geh\u00f6rt', aux:'hat', esEx:'Me gusta escuchar m\u00fasica.'},
    {art:'-', de:'fragen', es:'preguntar', ex:'Ich m\u00f6chte Sie etwas fragen.', cat:'verbos', sub:'comunicar', niv:'A1', tipo:'verbo', conj:'fragt \u00b7 fragte \u00b7 gefragt', aux:'hat', reg:'fragen nach + Dat.', esEx:'Quisiera preguntarle algo.'},
    {art:'-', de:'antworten', es:'responder / contestar', ex:'Kannst du mir antworten?', cat:'verbos', sub:'comunicar', niv:'A1', tipo:'verbo', conj:'antwortet \u00b7 antwortete \u00b7 geantwortet', aux:'hat', reg:'antworten auf + Akk.', esEx:'\u00bfPuedes contestarme?'},
    {art:'-', de:'zeigen', es:'mostrar', ex:'Kannst du mir den Weg zeigen?', cat:'verbos', sub:'comunicar', niv:'A1', tipo:'verbo', conj:'zeigt \u00b7 zeigte \u00b7 gezeigt', aux:'hat', esEx:'\u00bfPuedes mostrarme el camino?'},
    {art:'-', de:'treffen', es:'encontrarse / reunirse', ex:'Wir treffen uns um 6 Uhr.', cat:'verbos', sub:'comunicar', niv:'A2', tipo:'verbo', conj:'trifft \u00b7 traf \u00b7 getroffen', aux:'hat', reg:'sich treffen mit + Dat.', tag:'irregular', esEx:'Nos vemos a las 6.'},
    {art:'-', de:'besuchen', es:'visitar', ex:'Ich besuche meine Eltern am Sonntag.', cat:'verbos', sub:'comunicar', niv:'A1', tipo:'verbo', conj:'besucht \u00b7 besuchte \u00b7 besucht', aux:'hat', tag:'sin ge-', esEx:'Visito a mis padres el domingo.'},
    //    Pensar y sentir
    {art:'-', de:'lernen', es:'aprender', ex:'Ich lerne jeden Tag Deutsch.', cat:'verbos', sub:'pensar', niv:'A1', tipo:'verbo', conj:'lernt \u00b7 lernte \u00b7 gelernt', aux:'hat', esEx:'Estudio alem\u00e1n todos los d\u00edas.'},
    {art:'-', de:'sehen', es:'ver', ex:'Ich sehe heute einen Film.', cat:'verbos', sub:'pensar', niv:'A1', tipo:'verbo', conj:'sieht \u00b7 sah \u00b7 gesehen', aux:'hat', tag:'irregular', esEx:'Hoy veo una pel\u00edcula.'},
    {art:'-', de:'finden', es:'encontrar / opinar', ex:'Ich finde diesen Film gut.', cat:'verbos', sub:'pensar', niv:'A1', tipo:'verbo', conj:'findet \u00b7 fand \u00b7 gefunden', aux:'hat', tag:'irregular', esEx:'Esta pel\u00edcula me parece buena.'},
    {art:'-', de:'denken', es:'pensar', ex:'Ich denke oft an dich.', cat:'verbos', sub:'pensar', niv:'A1', tipo:'verbo', conj:'denkt \u00b7 dachte \u00b7 gedacht', aux:'hat', reg:'denken an + Akk.', tag:'mixto', esEx:'Pienso mucho en ti.'},
    {art:'-', de:'glauben', es:'creer', ex:'Ich glaube, das ist richtig.', cat:'verbos', sub:'pensar', niv:'A1', tipo:'verbo', conj:'glaubt \u00b7 glaubte \u00b7 geglaubt', aux:'hat', reg:'glauben an + Akk.', esEx:'Creo que eso es correcto.'},
    {art:'-', de:'lieben', es:'amar', ex:'Ich liebe meine Familie.', cat:'verbos', sub:'pensar', niv:'A1', tipo:'verbo', conj:'liebt \u00b7 liebte \u00b7 geliebt', aux:'hat', esEx:'Amo a mi familia.'},
    //    Dar, tomar y buscar
    {art:'-', de:'helfen', es:'ayudar', ex:'Kannst du mir helfen?', cat:'verbos', sub:'dar', niv:'A1', tipo:'verbo', conj:'hilft \u00b7 half \u00b7 geholfen', aux:'hat', reg:'helfen + Dat.', tag:'irregular', esEx:'\u00bfPuedes ayudarme?'},
    {art:'-', de:'geben', es:'dar', ex:'Kannst du mir das Salz geben?', cat:'verbos', sub:'dar', niv:'A1', tipo:'verbo', conj:'gibt \u00b7 gab \u00b7 gegeben', aux:'hat', tag:'irregular', esEx:'\u00bfMe pasas la sal?'},
    {art:'-', de:'nehmen', es:'tomar / coger', ex:'Ich nehme den Bus um 8 Uhr.', cat:'verbos', sub:'dar', niv:'A1', tipo:'verbo', conj:'nimmt \u00b7 nahm \u00b7 genommen', aux:'hat', tag:'irregular', esEx:'Tomo el autob\u00fas de las 8.'},
    {art:'-', de:'suchen', es:'buscar', ex:'Ich suche meine Schl\u00fcssel.', cat:'verbos', sub:'dar', niv:'A1', tipo:'verbo', conj:'sucht \u00b7 suchte \u00b7 gesucht', aux:'hat', reg:'suchen nach + Dat.', esEx:'Busco mis llaves.'},
    {art:'-', de:'bringen', es:'traer / llevar', ex:'Kannst du mir das Buch bringen?', cat:'verbos', sub:'dar', niv:'A1', tipo:'verbo', conj:'bringt \u00b7 brachte \u00b7 gebracht', aux:'hat', tag:'mixto', esEx:'\u00bfPuedes traerme el libro?'},
    {art:'-', de:'warten', es:'esperar', ex:'Ich warte auf den Bus.', cat:'verbos', sub:'dar', niv:'A1', tipo:'verbo', conj:'wartet \u00b7 wartete \u00b7 gewartet', aux:'hat', reg:'warten auf + Akk.', esEx:'Espero el autob\u00fas.'},
    //    Empezar y terminar
    {art:'-', de:'anfangen / beginnen', es:'empezar', ex:'Der Kurs beginnt um 9 Uhr.', cat:'verbos', sub:'empezar', niv:'A1', tipo:'verbo', conj:'f\u00e4ngt an \u00b7 fing an \u00b7 angefangen', aux:'hat', reg:'anfangen mit + Dat.', tag:'separable \u00b7 irregular', esEx:'El curso empieza a las 9.'},
    {art:'-', de:'\u00f6ffnen', es:'abrir', ex:'Kannst du das Fenster \u00f6ffnen?', cat:'verbos', sub:'empezar', niv:'A1', tipo:'verbo', conj:'\u00f6ffnet \u00b7 \u00f6ffnete \u00b7 ge\u00f6ffnet', aux:'hat', esEx:'\u00bfPuedes abrir la ventana?'},
    {art:'-', de:'schlie\u00dfen', es:'cerrar', ex:'Bitte schlie\u00dfen Sie die T\u00fcr.', cat:'verbos', sub:'empezar', niv:'A1', tipo:'verbo', conj:'schlie\u00dft \u00b7 schloss \u00b7 geschlossen', aux:'hat', tag:'irregular', esEx:'Cierre la puerta, por favor.'},
    //    Comprar y pedir
    {art:'-', de:'kaufen', es:'comprar', ex:'Ich kaufe ein neues Handy.', cat:'verbos', sub:'compra', niv:'A1', tipo:'verbo', conj:'kauft \u00b7 kaufte \u00b7 gekauft', aux:'hat', esEx:'Compro un celular nuevo.'},
    {art:'-', de:'bezahlen', es:'pagar', ex:'Ich m\u00f6chte bitte bezahlen.', cat:'verbos', sub:'compra', niv:'A1', tipo:'verbo', conj:'bezahlt \u00b7 bezahlte \u00b7 bezahlt', aux:'hat', reg:'bezahlen f\u00fcr + Akk.', tag:'sin ge-', esEx:'Quisiera pagar, por favor.'},
    {art:'-', de:'bestellen', es:'pedir / ordenar', ex:'Ich bestelle einen Kaffee.', cat:'verbos', sub:'compra', niv:'A1', tipo:'verbo', conj:'bestellt \u00b7 bestellte \u00b7 bestellt', aux:'hat', tag:'sin ge-', esEx:'Pido un caf\u00e9.'},

    // ── ADJETIVOS ─────────────────────────────────
    //    Tamaño y cantidad
    {art:'-', de:'gro\u00df / klein', es:'grande / peque\u00f1o', ex:'Berlin ist gro\u00df. Mein Zimmer ist klein.', cat:'adjetivos', sub:'tamano', niv:'A1', tipo:'adj', comp:'gr\u00f6\u00dfer \u00b7 am gr\u00f6\u00dften', tag:'irregular', esEx:'Berl\u00edn es grande. Mi cuarto es peque\u00f1o.'},
    {art:'-', de:'voll / leer', es:'lleno / vac\u00edo', ex:'Der Zug ist voll.', cat:'adjetivos', sub:'tamano', niv:'A1', tipo:'adj', esEx:'El tren va lleno.'},
    {art:'-', de:'stark / schwach', es:'fuerte / d\u00e9bil', ex:'Der Kaffee ist sehr stark.', cat:'adjetivos', sub:'tamano', niv:'A1', tipo:'adj', comp:'st\u00e4rker \u00b7 schw\u00e4cher', esEx:'El caf\u00e9 est\u00e1 muy fuerte.'},
    //    Bueno, malo y bonito
    {art:'-', de:'gut / schlecht', es:'bueno / malo', ex:'Das Essen ist gut. Das Wetter ist schlecht.', cat:'adjetivos', sub:'valor', niv:'A1', tipo:'adj', comp:'besser \u00b7 am besten', tag:'irregular', esEx:'La comida est\u00e1 buena. El clima est\u00e1 malo.'},
    {art:'-', de:'sch\u00f6n / h\u00e4sslich', es:'bonito / feo', ex:'Diese Stadt ist sehr sch\u00f6n.', cat:'adjetivos', sub:'valor', niv:'A1', tipo:'adj', esEx:'Esta ciudad es muy bonita.'},
    {art:'-', de:'teuer / billig', es:'caro / barato', ex:'Das Hotel ist teuer aber sch\u00f6n.', cat:'adjetivos', sub:'valor', niv:'A1', tipo:'adj', comp:'teurer \u00b7 am teuersten', tag:'pierde la e', esEx:'El hotel es caro pero bonito.'},
    {art:'-', de:'wichtig', es:'importante', ex:'Das ist sehr wichtig!', cat:'adjetivos', sub:'valor', niv:'A1', tipo:'adj', esEx:'\u00a1Eso es muy importante!'},
    {art:'-', de:'interessant', es:'interesante', ex:'Deutschland ist ein interessantes Land.', cat:'adjetivos', sub:'valor', niv:'A1', tipo:'adj', esEx:'Alemania es un pa\u00eds interesante.'},
    {art:'-', de:'einfach / kompliziert', es:'sencillo / complicado', ex:'Diese \u00dcbung ist ganz einfach.', cat:'adjetivos', sub:'valor', niv:'A1', tipo:'adj', esEx:'Este ejercicio es muy sencillo.'},
    //    Cómo te encuentras
    {art:'-', de:'m\u00fcde / wach', es:'cansado / despierto', ex:'Ich bin sehr m\u00fcde heute.', cat:'adjetivos', sub:'estado', niv:'A1', tipo:'adj', esEx:'Hoy estoy muy cansado.'},
    {art:'-', de:'hungrig / satt', es:'hambriento / satisfecho', ex:'Ich bin hungrig. Haben Sie etwas zu essen?', cat:'adjetivos', sub:'estado', niv:'A1', tipo:'adj', esEx:'Tengo hambre. \u00bfTiene algo de comer?'},
    {art:'-', de:'krank / gesund', es:'enfermo / sano', ex:'Ich bin krank \u2014 ich muss zum Arzt.', cat:'adjetivos', sub:'estado', niv:'A1', tipo:'adj', comp:'kr\u00e4nker \u00b7 ges\u00fcnder', esEx:'Estoy enfermo: tengo que ir al m\u00e9dico.'},
    {art:'-', de:'gl\u00fccklich / traurig', es:'feliz / triste', ex:'Ich bin sehr gl\u00fccklich hier.', cat:'adjetivos', sub:'estado', niv:'A1', tipo:'adj', esEx:'Aqu\u00ed soy muy feliz.'},
    //    Carácter
    {art:'-', de:'alt / jung / neu', es:'viejo / joven / nuevo', ex:'Das Haus ist alt. Ich bin jung.', cat:'adjetivos', sub:'caracter', niv:'A1', tipo:'adj', comp:'\u00e4lter \u00b7 j\u00fcnger \u00b7 neuer', tag:'irregular', esEx:'La casa es vieja. Yo soy joven.'},
    {art:'-', de:'nett / freundlich', es:'simp\u00e1tico / amable', ex:'Die Deutschen sind nett.', cat:'adjetivos', sub:'caracter', niv:'A1', tipo:'adj', esEx:'Los alemanes son simp\u00e1ticos.'},
    //    Espacio y tiempo
    {art:'-', de:'schnell / langsam', es:'r\u00e1pido / lento', ex:'Der Zug ist schnell.', cat:'adjetivos', sub:'espacio', niv:'A1', tipo:'adj', esEx:'El tren es r\u00e1pido.'},
    {art:'-', de:'laut / leise', es:'ruidoso / silencioso', ex:'Die Musik ist zu laut.', cat:'adjetivos', sub:'espacio', niv:'A1', tipo:'adj', esEx:'La m\u00fasica est\u00e1 muy fuerte.'},
    {art:'-', de:'fr\u00fch / sp\u00e4t', es:'temprano / tarde', ex:'Es ist schon sp\u00e4t!', cat:'adjetivos', sub:'espacio', niv:'A1', tipo:'adj', esEx:'\u00a1Ya es tarde!'},
    {art:'-', de:'nah / weit', es:'cerca / lejos', ex:'Die Schule ist ganz nah.', cat:'adjetivos', sub:'espacio', niv:'A1', tipo:'adj', comp:'n\u00e4her \u00b7 am n\u00e4chsten', tag:'irregular', esEx:'La escuela est\u00e1 muy cerca.'},
    //    Correcto, libre, limpio
    {art:'-', de:'leicht / schwer', es:'f\u00e1cil / dif\u00edcil / ligero / pesado', ex:'Deutsch ist schwer, aber sch\u00f6n.', cat:'adjetivos', sub:'juicio', niv:'A1', tipo:'adj', esEx:'El alem\u00e1n es dif\u00edcil, pero bonito.'},
    {art:'-', de:'richtig / falsch', es:'correcto / incorrecto', ex:'Deine Antwort ist richtig.', cat:'adjetivos', sub:'juicio', niv:'A1', tipo:'adj', esEx:'Tu respuesta es correcta.'},
    {art:'-', de:'frei / besetzt', es:'libre / ocupado', ex:'Ist dieser Platz frei?', cat:'adjetivos', sub:'juicio', niv:'A1', tipo:'adj', esEx:'\u00bfEst\u00e1 libre este lugar?'},
    {art:'-', de:'sauber / schmutzig', es:'limpio / sucio', ex:'Die K\u00fcche ist sauber.', cat:'adjetivos', sub:'juicio', niv:'A1', tipo:'adj', esEx:'La cocina est\u00e1 limpia.'},

    // ── VIAJES ─────────────────────────────────
    //    Aeropuerto y billetes
    {art:'der', de:'Flughafen', es:'el aeropuerto', ex:'Das Flugzeug landet am Flughafen.', cat:'viaje', sub:'transporte', niv:'A1', tipo:'sust', pl:'Flugh\u00e4fen', gen:'-s', esEx:'El avi\u00f3n aterriza en el aeropuerto.'},
    {art:'das', de:'Ticket / die Fahrkarte', es:'el boleto', ex:'Wo kaufe ich ein Ticket?', cat:'viaje', sub:'transporte', niv:'A1', tipo:'sust', pl:'Tickets', gen:'-s', esEx:'\u00bfD\u00f3nde compro un boleto?'},
    {art:'der/die', de:'Abflug / Ankunft', es:'la salida / la llegada (vuelo)', ex:'Der Abflug ist um 14 Uhr.', cat:'viaje', sub:'transporte', niv:'A2', tipo:'sust', pl:'Abfl\u00fcge', gen:'-s', esEx:'La salida es a las 14:00.'},
    //    Alojamiento
    {art:'das', de:'Hotel', es:'el hotel', ex:'Ich habe ein Zimmer im Hotel reserviert.', cat:'viaje', sub:'alojamiento', niv:'A1', tipo:'sust', pl:'Hotels', gen:'-s', esEx:'Reserv\u00e9 una habitaci\u00f3n en el hotel.'},
    {art:'die', de:'Reservierung', es:'la reservaci\u00f3n', ex:'Ich habe eine Reservierung.', cat:'viaje', sub:'alojamiento', niv:'A2', tipo:'sust', pl:'Reservierungen', gen:'-', esEx:'Tengo una reservaci\u00f3n.'},
    {art:'-', de:'einchecken', es:'hacer check-in', ex:'Ich m\u00f6chte einchecken.', cat:'viaje', sub:'alojamiento', niv:'A2', tipo:'verbo', conj:'checkt ein \u00b7 checkte ein \u00b7 eingecheckt', aux:'hat', tag:'separable', esEx:'Quisiera hacer el check-in.'},
    {art:'die', de:'Jugendherberge', es:'el albergue juvenil', ex:'Wir \u00fcbernachten in einer Jugendherberge.', cat:'viaje', sub:'alojamiento', niv:'A2', tipo:'sust', pl:'Jugendherbergen', gen:'-', esEx:'Nos quedamos en un albergue juvenil.'},
    //    Documentos y fronteras
    {art:'der', de:'Pass / Reisepass', es:'el pasaporte', ex:'Wo ist mein Reisepass?', cat:'viaje', sub:'documentos', niv:'A1', tipo:'sust', pl:'P\u00e4sse', gen:'-es', esEx:'\u00bfD\u00f3nde est\u00e1 mi pasaporte?'},
    {art:'der', de:'Ausweis', es:'la identificaci\u00f3n', ex:'Zeigen Sie bitte Ihren Ausweis.', cat:'viaje', sub:'documentos', niv:'A2', tipo:'sust', pl:'Ausweise', gen:'-es', esEx:'Muestre su identificaci\u00f3n, por favor.'},
    {art:'die', de:'Grenze', es:'la frontera', ex:'Wir \u00fcberqueren die Grenze nach \u00d6sterreich.', cat:'viaje', sub:'documentos', niv:'A2', tipo:'sust', pl:'Grenzen', gen:'-', esEx:'Cruzamos la frontera hacia Austria.'},
    {art:'der', de:'Zoll', es:'la aduana', ex:'Wir m\u00fcssen durch den Zoll.', cat:'viaje', sub:'documentos', niv:'B1', tipo:'sust', pl:'Z\u00f6lle', gen:'-s', esEx:'Tenemos que pasar por la aduana.'},
    //    Equipaje
    {art:'der', de:'Koffer', es:'la maleta', ex:'Mein Koffer ist sehr schwer.', cat:'viaje', sub:'equipaje', niv:'A1', tipo:'sust', pl:'Koffer', gen:'-s', esEx:'Mi maleta pesa mucho.'},
    {art:'das', de:'Gep\u00e4ck', es:'el equipaje', ex:'Mein Gep\u00e4ck ist noch nicht angekommen.', cat:'viaje', sub:'equipaje', niv:'A2', tipo:'sust', pl:'-', gen:'-s', tag:'incontable', esEx:'Mi equipaje todav\u00eda no ha llegado.'},
    //    Hacer turismo
    {art:'die', de:'Touristeninformation', es:'la oficina de turismo', ex:'Die Touristeninformation ist am Hauptbahnhof.', cat:'viaje', sub:'turismo', niv:'A2', tipo:'sust', pl:'Touristeninformationen', gen:'-', esEx:'La oficina de turismo est\u00e1 en la estaci\u00f3n central.'},
    {art:'die', de:'Sehensw\u00fcrdigkeit', es:'el lugar tur\u00edstico / atracci\u00f3n', ex:'Das Brandenburger Tor ist eine bekannte Sehensw\u00fcrdigkeit.', cat:'viaje', sub:'turismo', niv:'A2', tipo:'sust', pl:'Sehensw\u00fcrdigkeiten', gen:'-', esEx:'La Puerta de Brandeburgo es un lugar tur\u00edstico conocido.'},
    {art:'die', de:'Reise', es:'el viaje', ex:'Die Reise nach Deutschland war sch\u00f6n.', cat:'viaje', sub:'turismo', niv:'A1', tipo:'sust', pl:'Reisen', gen:'-', esEx:'El viaje a Alemania estuvo bonito.'},
    {art:'-', de:'reisen', es:'viajar', ex:'Ich reise gern nach Europa.', cat:'viaje', sub:'turismo', niv:'A1', tipo:'verbo', conj:'reist \u00b7 reiste \u00b7 gereist', aux:'ist', esEx:'Me gusta viajar a Europa.'},
    {art:'die', de:'Landkarte / Karte', es:'el mapa', ex:'Hast du eine Karte von der Stadt?', cat:'viaje', sub:'turismo', niv:'A1', tipo:'sust', pl:'Landkarten', gen:'-', esEx:'\u00bfTienes un mapa de la ciudad?'},
    {art:'das', de:'Souvenir / Andenken', es:'el recuerdo (regalo)', ex:'Ich kaufe ein Souvenir f\u00fcr meine Mutter.', cat:'viaje', sub:'turismo', niv:'A2', tipo:'sust', pl:'Souvenirs', gen:'-s', esEx:'Compro un recuerdo para mi madre.'},
    //    Cuando algo sale mal
    {art:'die', de:'Versp\u00e4tung', es:'el retraso', ex:'Der Zug hat 20 Minuten Versp\u00e4tung.', cat:'viaje', sub:'problemas', niv:'A2', tipo:'sust', pl:'Versp\u00e4tungen', gen:'-', esEx:'El tren lleva 20 minutos de retraso.'},

    // ── EMOCIONES ─────────────────────────────────
    //    Positivas
    {art:'-', de:'froh / fr\u00f6hlich', es:'contento / alegre', ex:'Ich bin froh, dich zu sehen.', cat:'emociones', sub:'positivas', niv:'A1', tipo:'adj', esEx:'Me da gusto verte.'},
    {art:'-', de:'verliebt', es:'enamorado', ex:'Sie sind sehr verliebt.', cat:'emociones', sub:'positivas', niv:'A2', tipo:'adj', reg:'verliebt in + Akk.', esEx:'Est\u00e1n muy enamorados.'},
    {art:'-', de:'stolz', es:'orgulloso', ex:'Ich bin stolz auf dich.', cat:'emociones', sub:'positivas', niv:'A2', tipo:'adj', reg:'stolz auf + Akk.', esEx:'Estoy orgulloso de ti.'},
    {art:'-', de:'dankbar', es:'agradecido', ex:'Ich bin dir sehr dankbar.', cat:'emociones', sub:'positivas', niv:'A2', tipo:'adj', reg:'dankbar f\u00fcr + Akk.', esEx:'Te estoy muy agradecido.'},
    {art:'-', de:'zufrieden', es:'satisfecho / contento', ex:'Ich bin zufrieden mit meiner Arbeit.', cat:'emociones', sub:'positivas', niv:'A2', tipo:'adj', reg:'zufrieden mit + Dat.', esEx:'Estoy satisfecho con mi trabajo.'},
    //    Negativas
    {art:'-', de:'w\u00fctend', es:'enojado / furioso', ex:'Er ist w\u00fctend auf seinen Bruder.', cat:'emociones', sub:'negativas', niv:'A2', tipo:'adj', reg:'w\u00fctend auf + Akk.', esEx:'Est\u00e1 enojado con su hermano.'},
    {art:'-', de:'\u00e4ngstlich', es:'temeroso / asustado', ex:'Sie ist \u00e4ngstlich vor Hunden.', cat:'emociones', sub:'negativas', niv:'A2', tipo:'adj', esEx:'Le tiene miedo a los perros.'},
    {art:'-', de:'eifers\u00fcchtig', es:'celoso', ex:'Er ist ein bisschen eifers\u00fcchtig.', cat:'emociones', sub:'negativas', niv:'B1', tipo:'adj', reg:'eifers\u00fcchtig auf + Akk.', esEx:'Est\u00e1 un poco celoso.'},
    {art:'-', de:'entt\u00e4uscht', es:'decepcionado', ex:'Ich bin entt\u00e4uscht von dem Ergebnis.', cat:'emociones', sub:'negativas', niv:'B1', tipo:'adj', reg:'entt\u00e4uscht von + Dat.', esEx:'Estoy decepcionado del resultado.'},
    {art:'-', de:'einsam', es:'solitario', ex:'Manchmal f\u00fchle ich mich einsam.', cat:'emociones', sub:'negativas', niv:'A2', tipo:'adj', esEx:'A veces me siento solo.'},
    //    Tensión y calma
    {art:'-', de:'gelangweilt', es:'aburrido (sentirse)', ex:'Die Kinder sind gelangweilt.', cat:'emociones', sub:'tension', niv:'A2', tipo:'adj', uso:'gelangweilt = aburrido t\u00fa; langweilig = aburrido algo', esEx:'Los ni\u00f1os est\u00e1n aburridos.'},
    {art:'-', de:'nerv\u00f6s', es:'nervioso', ex:'Ich bin nerv\u00f6s vor der Pr\u00fcfung.', cat:'emociones', sub:'tension', niv:'A2', tipo:'adj', esEx:'Estoy nervioso antes del examen.'},
    {art:'-', de:'entspannt', es:'relajado', ex:'Am Wochenende bin ich entspannt.', cat:'emociones', sub:'tension', niv:'A2', tipo:'adj', esEx:'El fin de semana estoy relajado.'},
    {art:'-', de:'gestresst', es:'estresado', ex:'Ich bin heute sehr gestresst.', cat:'emociones', sub:'tension', niv:'A2', tipo:'adj', esEx:'Hoy estoy muy estresado.'},
    //    Hacia otros
    {art:'-', de:'\u00fcberrascht', es:'sorprendido', ex:'Ich war sehr \u00fcberrascht von dem Geschenk.', cat:'emociones', sub:'hacia', niv:'A2', tipo:'adj', reg:'\u00fcberrascht von + Dat.', esEx:'El regalo me sorprendi\u00f3 mucho.'},
    {art:'-', de:'neugierig', es:'curioso', ex:'Die Kinder sind sehr neugierig.', cat:'emociones', sub:'hacia', niv:'A2', tipo:'adj', reg:'neugierig auf + Akk.', esEx:'Los ni\u00f1os son muy curiosos.'},

    // ── TECNOLOGÍA ─────────────────────────────────
    //    Aparatos
    {art:'das', de:'Handy / Smartphone', es:'el celular', ex:'Mein Handy hat keinen Akku mehr.', cat:'tecnologia', sub:'aparatos', niv:'A1', tipo:'sust', pl:'Handys', gen:'-s', uso:'\u00abHandy\u00bb es alem\u00e1n, no ingl\u00e9s', esEx:'Mi celular se qued\u00f3 sin bater\u00eda.'},
    {art:'der', de:'Computer / Rechner', es:'la computadora', ex:'Ich arbeite am Computer.', cat:'tecnologia', sub:'aparatos', niv:'A1', tipo:'sust', pl:'Computer', gen:'-s', esEx:'Trabajo en la computadora.'},
    {art:'der', de:'Akku', es:'la bater\u00eda', ex:'Der Akku ist fast leer.', cat:'tecnologia', sub:'aparatos', niv:'A2', tipo:'sust', pl:'Akkus', gen:'-s', esEx:'La bater\u00eda est\u00e1 casi vac\u00eda.'},
    {art:'der', de:'Bildschirm', es:'la pantalla', ex:'Der Bildschirm ist kaputt.', cat:'tecnologia', sub:'aparatos', niv:'A2', tipo:'sust', pl:'Bildschirme', gen:'-s', esEx:'La pantalla est\u00e1 rota.'},
    {art:'die', de:'Taste', es:'la tecla / el bot\u00f3n', ex:'Dr\u00fcck diese Taste.', cat:'tecnologia', sub:'aparatos', niv:'A2', tipo:'sust', pl:'Tasten', gen:'-', esEx:'Presiona esta tecla.'},
    //    Internet y conexión
    {art:'das', de:'Internet', es:'internet', ex:'Ohne Internet kann ich nicht arbeiten.', cat:'tecnologia', sub:'internet', niv:'A1', tipo:'sust', pl:'-', gen:'-s', tag:'incontable', esEx:'Sin internet no puedo trabajar.'},
    {art:'die', de:'App', es:'la aplicaci\u00f3n', ex:'Ich habe eine neue App heruntergeladen.', cat:'tecnologia', sub:'internet', niv:'A1', tipo:'sust', pl:'Apps', gen:'-', esEx:'Descargu\u00e9 una aplicaci\u00f3n nueva.'},
    {art:'das', de:'WLAN', es:'el wifi', ex:'Gibt es hier kostenloses WLAN?', cat:'tecnologia', sub:'internet', niv:'A1', tipo:'sust', pl:'WLANs', gen:'-s', esEx:'\u00bfHay wifi gratis aqu\u00ed?'},
    //    Cuentas y mensajes
    {art:'die', de:'E-Mail', es:'el correo electr\u00f3nico', ex:'Ich schreibe eine E-Mail.', cat:'tecnologia', sub:'cuentas', niv:'A1', tipo:'sust', pl:'E-Mails', gen:'-', esEx:'Escribo un correo.'},
    {art:'das', de:'Passwort', es:'la contrase\u00f1a', ex:'Ich habe mein Passwort vergessen.', cat:'tecnologia', sub:'cuentas', niv:'A1', tipo:'sust', pl:'Passw\u00f6rter', gen:'-es', esEx:'Olvid\u00e9 mi contrase\u00f1a.'},
    {art:'die', de:'Nachricht', es:'el mensaje', ex:'Ich habe dir eine Nachricht geschickt.', cat:'tecnologia', sub:'cuentas', niv:'A1', tipo:'sust', pl:'Nachrichten', gen:'-', esEx:'Te mand\u00e9 un mensaje.'},
    //    Qué se hace con ellos
    {art:'-', de:'herunterladen', es:'descargar', ex:'Kannst du mir die App herunterladen?', cat:'tecnologia', sub:'acciones', niv:'A2', tipo:'verbo', conj:'l\u00e4dt herunter \u00b7 lud herunter \u00b7 heruntergeladen', aux:'hat', tag:'separable \u00b7 irregular', esEx:'\u00bfPuedes descargarme la aplicaci\u00f3n?'},
    {art:'-', de:'aufladen', es:'cargar (bater\u00eda)', ex:'Ich muss mein Handy aufladen.', cat:'tecnologia', sub:'acciones', niv:'A2', tipo:'verbo', conj:'l\u00e4dt auf \u00b7 lud auf \u00b7 aufgeladen', aux:'hat', tag:'separable \u00b7 irregular', esEx:'Tengo que cargar mi celular.'},
    {art:'-', de:'klicken', es:'hacer clic', ex:'Klicken Sie hier, um fortzufahren.', cat:'tecnologia', sub:'acciones', niv:'A2', tipo:'verbo', conj:'klickt \u00b7 klickte \u00b7 geklickt', aux:'hat', reg:'klicken auf + Akk.', esEx:'Haga clic aqu\u00ed para continuar.'},
    {art:'-', de:'speichern', es:'guardar (archivo)', ex:'Hast du das Dokument gespeichert?', cat:'tecnologia', sub:'acciones', niv:'A2', tipo:'verbo', conj:'speichert \u00b7 speicherte \u00b7 gespeichert', aux:'hat', esEx:'\u00bfGuardaste el documento?'},
    {art:'-', de:'l\u00f6schen', es:'borrar / eliminar', ex:'Ich habe die Nachricht gel\u00f6scht.', cat:'tecnologia', sub:'acciones', niv:'A2', tipo:'verbo', conj:'l\u00f6scht \u00b7 l\u00f6schte \u00b7 gel\u00f6scht', aux:'hat', esEx:'Borr\u00e9 el mensaje.'},

    // ── ANIMALES ─────────────────────────────────
    //    En casa
    {art:'der', de:'Hund', es:'el perro', ex:'Mein Hund hei\u00dft Bello.', cat:'animales', sub:'casa', niv:'A1', tipo:'sust', pl:'Hunde', gen:'-es', esEx:'Mi perro se llama Bello.'},
    {art:'die', de:'Katze', es:'el gato / la gata', ex:'Die Katze schl\u00e4ft den ganzen Tag.', cat:'animales', sub:'casa', niv:'A1', tipo:'sust', pl:'Katzen', gen:'-', esEx:'El gato duerme todo el d\u00eda.'},
    {art:'der', de:'Vogel', es:'el p\u00e1jaro', ex:'Der Vogel singt sch\u00f6n.', cat:'animales', sub:'casa', niv:'A1', tipo:'sust', pl:'V\u00f6gel', gen:'-s', esEx:'El p\u00e1jaro canta bonito.'},
    //    De granja
    {art:'das', de:'Pferd', es:'el caballo', ex:'Sie reitet gern auf dem Pferd.', cat:'animales', sub:'granja', niv:'A1', tipo:'sust', pl:'Pferde', gen:'-es', esEx:'Le gusta montar a caballo.'},
    {art:'die', de:'Kuh', es:'la vaca', ex:'Die Kuh gibt Milch.', cat:'animales', sub:'granja', niv:'A1', tipo:'sust', pl:'K\u00fche', gen:'-', esEx:'La vaca da leche.'},
    {art:'das', de:'Schwein', es:'el cerdo', ex:'Das Schwein lebt auf dem Bauernhof.', cat:'animales', sub:'granja', niv:'A1', tipo:'sust', pl:'Schweine', gen:'-es', esEx:'El cerdo vive en la granja.'},
    {art:'das', de:'Huhn', es:'la gallina / el pollo', ex:'Das Huhn legt Eier.', cat:'animales', sub:'granja', niv:'A1', tipo:'sust', pl:'H\u00fchner', gen:'-es', esEx:'La gallina pone huevos.'},
    //    Salvajes
    {art:'der', de:'L\u00f6we', es:'el le\u00f3n', ex:'Der L\u00f6we ist der K\u00f6nig der Tiere.', cat:'animales', sub:'salvajes', niv:'A2', tipo:'sust', pl:'L\u00f6wen', gen:'-n', tag:'declinaci\u00f3n -n', esEx:'El le\u00f3n es el rey de los animales.'},
    {art:'der', de:'Elefant', es:'el elefante', ex:'Der Elefant ist sehr gro\u00df.', cat:'animales', sub:'salvajes', niv:'A2', tipo:'sust', pl:'Elefanten', gen:'-en', tag:'declinaci\u00f3n -n', esEx:'El elefante es muy grande.'},
    {art:'der', de:'Affe', es:'el mono', ex:'Der Affe klettert auf den Baum.', cat:'animales', sub:'salvajes', niv:'A2', tipo:'sust', pl:'Affen', gen:'-n', tag:'declinaci\u00f3n -n', esEx:'El mono trepa al \u00e1rbol.'},
    {art:'der', de:'B\u00e4r', es:'el oso', ex:'Im Zoo gibt es einen B\u00e4ren.', cat:'animales', sub:'salvajes', niv:'A2', tipo:'sust', pl:'B\u00e4ren', gen:'-en', tag:'declinaci\u00f3n -n', esEx:'En el zool\u00f3gico hay un oso.'},
    //    Pequeños
    {art:'die', de:'Maus', es:'el rat\u00f3n', ex:'Die Katze jagt die Maus.', cat:'animales', sub:'pequenos', niv:'A1', tipo:'sust', pl:'M\u00e4use', gen:'-', esEx:'El gato caza al rat\u00f3n.'},
    {art:'der', de:'Schmetterling', es:'la mariposa', ex:'Ein bunter Schmetterling fliegt vorbei.', cat:'animales', sub:'pequenos', niv:'A2', tipo:'sust', pl:'Schmetterlinge', gen:'-s', esEx:'Pasa volando una mariposa de colores.'},
    //    En el agua
    {art:'der', de:'Fisch', es:'el pez', ex:'Im Aquarium schwimmen viele Fische.', cat:'animales', sub:'agua', niv:'A1', tipo:'sust', pl:'Fische', gen:'-es', uso:'el mismo Fisch de Comida: ahi es el pescado del plato', esEx:'En el acuario nadan muchos peces.'},

    // ── COMPRAS ─────────────────────────────────
    //    La tienda
    {art:'das', de:'Gesch\u00e4ft / der Laden', es:'la tienda', ex:'Das Gesch\u00e4ft \u00f6ffnet um 9 Uhr.', cat:'compras', sub:'tienda', niv:'A1', tipo:'sust', pl:'Gesch\u00e4fte', gen:'-es', esEx:'La tienda abre a las 9.'},
    {art:'die', de:'Kasse', es:'la caja registradora', ex:'Bitte zahlen Sie an der Kasse.', cat:'compras', sub:'tienda', niv:'A1', tipo:'sust', pl:'Kassen', gen:'-', esEx:'Pague en la caja, por favor.'},
    {art:'der/die', de:'Verk\u00e4ufer / Verk\u00e4uferin', es:'el/la vendedor/a', ex:'Der Verk\u00e4ufer war sehr freundlich.', cat:'compras', sub:'tienda', niv:'A1', tipo:'sust', pl:'Verk\u00e4ufer', gen:'-s', esEx:'El vendedor fue muy amable.'},
    {art:'der', de:'Kundendienst', es:'el servicio al cliente', ex:'Ruf den Kundendienst an.', cat:'compras', sub:'tienda', niv:'B1', tipo:'sust', pl:'-', gen:'-es', esEx:'Llama al servicio al cliente.'},
    {art:'der', de:'Einkaufswagen', es:'el carrito de compras', ex:'Der Einkaufswagen ist voll.', cat:'compras', sub:'tienda', niv:'A2', tipo:'sust', pl:'Einkaufswagen', gen:'-s', esEx:'El carrito est\u00e1 lleno.'},
    {art:'die', de:'Einkaufsliste', es:'la lista de compras', ex:'Ich habe eine Einkaufsliste geschrieben.', cat:'compras', sub:'tienda', niv:'A2', tipo:'sust', pl:'Einkaufslisten', gen:'-', esEx:'Escrib\u00ed una lista de compras.'},
    //    Pagar
    {art:'die', de:'Quittung', es:'el recibo', ex:'Kann ich eine Quittung bekommen?', cat:'compras', sub:'pagar', niv:'A2', tipo:'sust', pl:'Quittungen', gen:'-', esEx:'\u00bfMe puede dar un recibo?'},
    {art:'das', de:'Bargeld', es:'el efectivo', ex:'Ich zahle lieber mit Bargeld.', cat:'compras', sub:'pagar', niv:'A1', tipo:'sust', pl:'-', gen:'-es', tag:'incontable', esEx:'Prefiero pagar en efectivo.'},
    {art:'die', de:'Kreditkarte', es:'la tarjeta de cr\u00e9dito', ex:'Akzeptieren Sie Kreditkarten?', cat:'compras', sub:'pagar', niv:'A1', tipo:'sust', pl:'Kreditkarten', gen:'-', esEx:'\u00bfAceptan tarjetas de cr\u00e9dito?'},
    //    Precios y ofertas
    {art:'der', de:'Rabatt', es:'el descuento', ex:'Es gibt 20% Rabatt.', cat:'compras', sub:'precios', niv:'A2', tipo:'sust', pl:'Rabatte', gen:'-es', esEx:'Hay un 20% de descuento.'},
    {art:'das', de:'Angebot', es:'la oferta', ex:'Das ist ein gutes Angebot.', cat:'compras', sub:'precios', niv:'A2', tipo:'sust', pl:'Angebote', gen:'-es', esEx:'Es una buena oferta.'},
    {art:'-', de:'g\u00fcnstig', es:'barato / conveniente', ex:'Dieses Gesch\u00e4ft ist sehr g\u00fcnstig.', cat:'compras', sub:'precios', niv:'A2', tipo:'adj', esEx:'Esta tienda es muy barata.'},
    {art:'die', de:'Marke', es:'la marca', ex:'Welche Marke bevorzugst du?', cat:'compras', sub:'precios', niv:'A2', tipo:'sust', pl:'Marken', gen:'-', esEx:'\u00bfQu\u00e9 marca prefieres?'},
    //    Qué se hace en la tienda
    {art:'-', de:'umtauschen', es:'cambiar / devolver (producto)', ex:'Ich m\u00f6chte diesen Pullover umtauschen.', cat:'compras', sub:'acciones', niv:'A2', tipo:'verbo', conj:'tauscht um \u00b7 tauschte um \u00b7 umgetauscht', aux:'hat', tag:'separable', esEx:'Quisiera cambiar este su\u00e9ter.'},
    {art:'-', de:'anprobieren', es:'probarse (ropa)', ex:'Darf ich das anprobieren?', cat:'compras', sub:'acciones', niv:'A2', tipo:'verbo', conj:'probiert an \u00b7 probierte an \u00b7 anprobiert', aux:'hat', tag:'separable', esEx:'\u00bfMe lo puedo probar?'},

    // ── ESCUELA ─────────────────────────────────
    //    Personas y lugares
    {art:'der/die', de:'Sch\u00fcler / Sch\u00fclerin', es:'el/la alumno/a', ex:'Die Sch\u00fclerin lernt sehr flei\u00dfig.', cat:'escuela', sub:'personas', niv:'A1', tipo:'sust', pl:'Sch\u00fcler', gen:'-s', esEx:'La alumna estudia con mucho empe\u00f1o.'},
    {art:'das', de:'Klassenzimmer', es:'el sal\u00f3n de clase', ex:'Das Klassenzimmer ist hell.', cat:'escuela', sub:'personas', niv:'A1', tipo:'sust', pl:'Klassenzimmer', gen:'-s', esEx:'El sal\u00f3n de clase es luminoso.'},
    //    Material
    {art:'das', de:'Buch', es:'el libro', ex:'Dieses Buch ist sehr interessant.', cat:'escuela', sub:'material', niv:'A1', tipo:'sust', pl:'B\u00fccher', gen:'-es', esEx:'Este libro es muy interesante.'},
    {art:'das', de:'Heft', es:'el cuaderno', ex:'Schreib das in dein Heft.', cat:'escuela', sub:'material', niv:'A1', tipo:'sust', pl:'Hefte', gen:'-es', esEx:'Escribe eso en tu cuaderno.'},
    {art:'der', de:'Stift', es:'el bol\u00edgrafo / l\u00e1piz', ex:'Hast du einen Stift f\u00fcr mich?', cat:'escuela', sub:'material', niv:'A1', tipo:'sust', pl:'Stifte', gen:'-es', esEx:'\u00bfTienes un bol\u00edgrafo para m\u00ed?'},
    {art:'das', de:'W\u00f6rterbuch', es:'el diccionario', ex:'Ich benutze ein W\u00f6rterbuch.', cat:'escuela', sub:'material', niv:'A1', tipo:'sust', pl:'W\u00f6rterb\u00fccher', gen:'-es', esEx:'Uso un diccionario.'},
    //    Tareas y notas
    {art:'die', de:'Hausaufgabe', es:'la tarea', ex:'Ich mache meine Hausaufgaben.', cat:'escuela', sub:'tareas', niv:'A1', tipo:'sust', pl:'Hausaufgaben', gen:'-', esEx:'Hago mis tareas.'},
    {art:'die', de:'Note', es:'la calificaci\u00f3n', ex:'Ich habe eine gute Note bekommen.', cat:'escuela', sub:'tareas', niv:'A1', tipo:'sust', pl:'Noten', gen:'-', uso:'tambi\u00e9n \u00abnota musical\u00bb', esEx:'Saqu\u00e9 una buena calificaci\u00f3n.'},
    {art:'der', de:'Fehler', es:'el error', ex:'Aus Fehlern lernt man.', cat:'escuela', sub:'tareas', niv:'A1', tipo:'sust', pl:'Fehler', gen:'-s', esEx:'De los errores se aprende.'},
    {art:'der', de:'Fortschritt', es:'el progreso', ex:'Du machst gute Fortschritte!', cat:'escuela', sub:'tareas', niv:'B1', tipo:'sust', pl:'Fortschritte', gen:'-es', esEx:'\u00a1Vas progresando bien!'},
    //    Aprender
    {art:'-', de:'\u00fcben', es:'practicar', ex:'Ich muss mehr Grammatik \u00fcben.', cat:'escuela', sub:'aprender', niv:'A1', tipo:'verbo', conj:'\u00fcbt \u00b7 \u00fcbte \u00b7 ge\u00fcbt', aux:'hat', esEx:'Tengo que practicar m\u00e1s gram\u00e1tica.'},
    {art:'-', de:'wiederholen', es:'repasar / repetir', ex:'K\u00f6nnen Sie das bitte wiederholen?', cat:'escuela', sub:'aprender', niv:'A2', tipo:'verbo', conj:'wiederholt \u00b7 wiederholte \u00b7 wiederholt', aux:'hat', tag:'sin ge-', esEx:'\u00bfPuede repetirlo, por favor?'},

    // ── ADVERBIOS ─────────────────────────────────
    //    Con qué frecuencia
    {art:'-', de:'immer', es:'siempre', ex:'Ich trinke immer Kaffee am Morgen.', cat:'adverbios', sub:'frecuencia', niv:'A1', tipo:'adv', esEx:'Siempre tomo caf\u00e9 por la ma\u00f1ana.'},
    {art:'-', de:'oft', es:'a menudo', ex:'Ich gehe oft ins Kino.', cat:'adverbios', sub:'frecuencia', niv:'A1', tipo:'adv', esEx:'Voy al cine a menudo.'},
    {art:'-', de:'manchmal', es:'a veces', ex:'Manchmal koche ich zu Hause.', cat:'adverbios', sub:'frecuencia', niv:'A1', tipo:'adv', esEx:'A veces cocino en casa.'},
    {art:'-', de:'selten', es:'raramente', ex:'Ich fahre selten mit dem Auto.', cat:'adverbios', sub:'frecuencia', niv:'A1', tipo:'adv', esEx:'Rara vez voy en coche.'},
    {art:'-', de:'nie', es:'nunca', ex:'Ich trinke nie Alkohol.', cat:'adverbios', sub:'frecuencia', niv:'A1', tipo:'adv', esEx:'Nunca tomo alcohol.'},
    //    Cuándo
    {art:'-', de:'jetzt', es:'ahora', ex:'Ich muss jetzt gehen.', cat:'adverbios', sub:'momento', niv:'A1', tipo:'adv', esEx:'Me tengo que ir ahora.'},
    {art:'-', de:'gleich', es:'en seguida / ahora mismo', ex:'Ich komme gleich!', cat:'adverbios', sub:'momento', niv:'A1', tipo:'adv', esEx:'\u00a1Ahora mismo voy!'},
    {art:'-', de:'bald', es:'pronto', ex:'Bis bald!', cat:'adverbios', sub:'momento', niv:'A1', tipo:'adv', esEx:'\u00a1Hasta pronto!'},
    {art:'-', de:'schon', es:'ya', ex:'Ich habe das schon gemacht.', cat:'adverbios', sub:'momento', niv:'A1', tipo:'adv', esEx:'Eso ya lo hice.'},
    {art:'-', de:'noch', es:'todav\u00eda / a\u00fan', ex:'Ich bin noch hier.', cat:'adverbios', sub:'momento', niv:'A1', tipo:'adv', esEx:'Todav\u00eda estoy aqu\u00ed.'},
    {art:'-', de:'noch nicht', es:'todav\u00eda no', ex:'Ich habe noch nicht gegessen.', cat:'adverbios', sub:'momento', niv:'A1', tipo:'adv', esEx:'Todav\u00eda no he comido.'},
    //    En qué orden
    {art:'-', de:'sp\u00e4ter', es:'m\u00e1s tarde', ex:'Wir sprechen sp\u00e4ter dar\u00fcber.', cat:'adverbios', sub:'orden', niv:'A1', tipo:'adv', esEx:'Hablamos de eso m\u00e1s tarde.'},
    {art:'-', de:'zuerst', es:'primero', ex:'Zuerst fr\u00fchst\u00fccke ich, dann arbeite ich.', cat:'adverbios', sub:'orden', niv:'A1', tipo:'adv', esEx:'Primero desayuno y luego trabajo.'},
    {art:'-', de:'zuletzt / schlie\u00dflich', es:'por \u00faltimo / finalmente', ex:'Zuletzt r\u00e4umen wir die K\u00fcche auf.', cat:'adverbios', sub:'orden', niv:'A2', tipo:'adv', esEx:'Por \u00faltimo recogemos la cocina.'},
  ],

  // El tema de gramática. Cada sección puede traer una `tabla`, una `lista` de
  // tres columnas, una `comparativa` (lo que NO se dice / lo que sí), un `aviso`
  // naranja o un `truco` turquesa. Ninguna los lleva todos.
  partizip: {
    titulo: 'Partizip I y II',
    sub: 'Las dos formas de participio del alem\u00e1n: cu\u00e1l es cu\u00e1l, c\u00f3mo se forman y cu\u00e1ndo se usa cada una.',
    secciones: [
      { id:'que', ico:'\ud83e\udded', t:'Qu\u00e9 son, en una frase',
        cuerpo:'El alem\u00e1n tiene dos participios y no se parecen en nada. El <b>Partizip II</b> es el que usas todo el rato: es el que forma el pasado (<i>ich habe gegessen</i>) y la voz pasiva. El <b>Partizip I</b> es el que casi no vas a usar al hablar, pero aparece leyendo: convierte un verbo en adjetivo (<i>das lachende Kind</i>, el ni\u00f1o que r\u00ede).',
        aviso:'Si s\u00f3lo te quedas con una cosa: <b>Partizip I no es el gerundio espa\u00f1ol</b>. \u00abEstoy comiendo\u00bb NO se dice <s>ich bin essend</s>.',
      },
      { id:'p2form', ico:'\ud83d\udd28', t:'Partizip II \u2014 c\u00f3mo se forma',
        cuerpo:'Hay dos patrones seg\u00fan el tipo de verbo, y luego cuatro excepciones que cubren casi todos los casos raros.',
        tabla:{cols:['Tipo','Regla','Ejemplo'], filas:[
          ['Regulares (schwach)','ge + ra\u00edz + <b>t</b>','machen \u2192 <b>ge</b>mach<b>t</b>'],
          ['Irregulares (stark)','ge + ra\u00edz (a veces cambia) + <b>en</b>','gehen \u2192 <b>ge</b>gang<b>en</b>'],
          ['Mixtos','ge + ra\u00edz cambiada + <b>t</b>','bringen \u2192 <b>ge</b>brach<b>t</b>'],
        ]},
      },
      { id:'p2sinGe', ico:'\ud83d\udeab', t:'Los cuatro casos SIN ge-',
        cuerpo:'Aqu\u00ed es donde se equivoca todo el mundo. Estos verbos no llevan <b>ge-</b>:',
        lista:[
          ['Prefijo inseparable','be-, emp-, ent-, er-, ge-, miss-, ver-, zer-','besuchen \u2192 besucht \u00b7 verstehen \u2192 verstanden'],
          ['Verbos en -ieren','todos, sin excepci\u00f3n','studieren \u2192 studiert \u00b7 funktionieren \u2192 funktioniert'],
          ['Separables: el ge- va EN MEDIO','prefijo + ge + resto','aufstehen \u2192 auf<b>ge</b>standen \u00b7 einkaufen \u2192 ein<b>ge</b>kauft'],
          ['Con s\u00edlaba \u00e1tona inicial','poco frecuentes','trompeten \u2192 trompetet'],
        ],
        truco:'Regla pr\u00e1ctica: si la primera s\u00edlaba del infinitivo <b>no</b> lleva el acento, no lleva ge-. <i>be</i>SUchen s\u00ed, <i>AUF</i>stehen no.',
      },
      { id:'p2uso', ico:'\ud83c\udfaf', t:'Partizip II \u2014 para qu\u00e9 sirve',
        cuerpo:'Cuatro usos, y el primero es el 90% de las veces que lo vas a decir.',
        lista:[
          ['Perfekt \u2014 el pasado hablado','haben / sein + Partizip II, y el participio va al FINAL','Ich habe das Auto <b>repariert</b>.'],
          ['Plusquamperfekt','hatte / war + Partizip II','Ich hatte schon <b>gegessen</b>.'],
          ['Pasiva','werden + Partizip II','Das Auto wird <b>repariert</b>.'],
          ['Como adjetivo','se declina como cualquier adjetivo','das <b>reparierte</b> Auto'],
        ],
      },
      { id:'habenSein', ico:'\ud83d\udd00', t:'\u00bfhaben o sein?',
        cuerpo:'La duda de siempre al armar el Perfekt. La mayor\u00eda van con <b>haben</b>; <b>sein</b> es la lista corta, y por eso conviene aprenderse esa.',
        lista:[
          ['sein \u2014 movimiento de A a B','gehen, fahren, fliegen, kommen, laufen, reisen','Ich <b>bin</b> nach Berlin gefahren.'],
          ['sein \u2014 cambio de estado','aufstehen, einschlafen, aufwachen, sterben, wachsen','Er <b>ist</b> eingeschlafen.'],
          ['sein \u2014 los tres sueltos','sein, bleiben, werden','Ich <b>bin</b> m\u00fcde gewesen.'],
          ['haben \u2014 todo lo dem\u00e1s','y siempre que el verbo lleve objeto directo','Ich <b>habe</b> ein Auto gekauft.'],
        ],
        aviso:'Ojo con <i>fahren</i>: <b>ich bin</b> gefahren (yo fui, me mov\u00ed) pero <b>ich habe</b> das Auto gefahren (yo conduje el coche). Con objeto directo, haben.',
      },
      { id:'p1', ico:'\u2728', t:'Partizip I \u2014 la forma f\u00e1cil',
        cuerpo:'Se forma sin excepciones: <b>infinitivo + d</b>. Y ya est\u00e1.',
        tabla:{cols:['Verbo','Partizip I','C\u00f3mo se traduce'], filas:[
          ['lachen (re\u00edr)','lach<b>end</b>','que r\u00ede / riendo'],
          ['schlafen (dormir)','schlaf<b>end</b>','que duerme / durmiendo'],
          ['spielen (jugar)','spiel<b>end</b>','que juega / jugando'],
          ['sein (ser)','sei<b>end</b>','siendo \u2014 se usa poqu\u00edsimo'],
        ]},
      },
      { id:'p1uso', ico:'\ud83d\udcd6', t:'Partizip I \u2014 d\u00f3nde aparece',
        cuerpo:'Dos usos, y en los dos es una descripci\u00f3n, nunca un tiempo verbal.',
        lista:[
          ['Como adjetivo \u2014 se declina','delante del sustantivo, con su terminaci\u00f3n','das lachend<b>e</b> Kind \u00b7 ein schlafend<b>er</b> Hund'],
          ['Como adverbio \u2014 invariable','describe c\u00f3mo se hace algo','Sie kam <b>lachend</b> herein. (entr\u00f3 riendo)'],
        ],
        truco:'Lo vas a ver mucho m\u00e1s en textos t\u00e9cnicos y noticias que en una conversaci\u00f3n. Recon\u00f3celo al leer; para hablar casi nunca lo necesitas.',
      },
      { id:'error', ico:'\u26a0\ufe0f', t:'El error que hay que evitar',
        cuerpo:'El espa\u00f1ol usa el gerundio para la acci\u00f3n en curso: \u00abestoy comiendo\u00bb. El alem\u00e1n <b>no tiene esa construcci\u00f3n</b>, y traducirla con Partizip I suena a extranjero de inmediato.',
        comparativa:[
          ['Estoy comiendo','<s>Ich bin essend</s>','Ich esse <b>gerade</b>. \u2014 o simplemente <b>Ich esse</b>.'],
          ['Estaba trabajando','<s>Ich war arbeitend</s>','Ich habe <b>gerade</b> gearbeitet.'],
          ['El ni\u00f1o est\u00e1 jugando','<s>Das Kind ist spielend</s>','Das Kind spielt <b>gerade</b>.'],
        ],
        aviso:'El alem\u00e1n resuelve el \u00abestar +ndo\u00bb con el presente normal, y si hace falta marcar que es ahora, con <b>gerade</b> o <b>im Moment</b>.',
      },
      { id:'contraste', ico:'\u2696\ufe0f', t:'Los dos, uno al lado del otro',
        cuerpo:'La misma ra\u00edz, dos significados opuestos: quien hace la acci\u00f3n frente a quien la recibe.',
        tabla:{cols:['','Partizip I','Partizip II'], filas:[
          ['Forma','infinitivo + d','ge\u2026t / ge\u2026en'],
          ['Significado','activo, en curso','pasivo o terminado'],
          ['Ejemplo','das <b>kochende</b> Wasser<br><span class=\'pz-mini\'>el agua que hierve</span>','das <b>gekochte</b> Wasser<br><span class=\'pz-mini\'>el agua hervida</span>'],
          ['Otro','der <b>lesende</b> Mann<br><span class=\'pz-mini\'>el hombre que lee</span>','das <b>gelesene</b> Buch<br><span class=\'pz-mini\'>el libro le\u00eddo</span>'],
          ['Se usa para','describir (adjetivo/adverbio)','Perfekt, pasiva y adjetivo'],
        ]},
      },
    ],
  },

  // ── Consultas ─────────────────────────────────────────────
  // Las palabras de una sección, o de una subsección concreta.
  de: function (cat, sub) {
    return this.voc.filter(function (v) {
      return v.cat === cat && (!sub || v.sub === sub);
    });
  },
  cuantas: function (cat, sub) { return this.de(cat, sub).length; },
  // Las subsecciones de una sección, con su recuento, en el orden declarado.
  subsDe: function (cat) {
    const subs = (this.cats[cat] || {}).subs || {};
    const self = this;
    return Object.keys(subs).map(function (id) {
      return { id: id, label: subs[id], n: self.cuantas(cat, id) };
    });
  },
  // La palabra del día: la misma todo el día, distinta cada día, sin guardar nada.
  delDia: function (dia) {
    return this.voc[(dia || 0) % this.voc.length];
  },
};

if (typeof module !== 'undefined' && module.exports) module.exports = ALEMAN_VOCAB;
