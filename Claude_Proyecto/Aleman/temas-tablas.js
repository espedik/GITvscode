/* ══ temas-tablas.js — la tabla de consulta de cada tema a fondo, para tenerla siempre a la vista ══

   Adán, 26-nov-2026: "lo quiero de mejor formato en forma de tabla, así como lo hiciste en el subtab de casos". En la
   ventana «Alemán de hoy» del Dashboard, cada tema (Preposiciones, Verbos, Adjetivos, La frase) lleva a su izquierda su
   tabla —lo que se consulta mientras se practica—, igual que Casos lleva la de los casos. El Dashboard la pinta con
   `alemanTemaTablaHtml()`; las páginas de los temas traen todo esto desarrollado, con ejemplos y práctica.

   ALEMAN_TABLAS[clave] = { titulo, bloques: [
     { h, tabla: { cab: [], filas: [[]], de: [columnas en alemán], colores: [color por columna], filaColor: [color por fila] } }
     { h, lista: ['texto'] }  ·  { h, p: 'texto' }
   ] }
   En los textos, **negrita** y [alemán], que sale en cursiva. Todo alemán revisado. */
(function (raiz) {
  'use strict';
  var GEN = ['', '#3b82f6', '#ec4899', '#10b981', '#f97316'];          // der, die, das, plural: los de la tabla de los casos
  var AKK = '#dc2626', DAT = '#059669', WEC = '#b45309', GENI = '#7c3aed';

  raiz.ALEMAN_TABLAS = {
    prep: { titulo: 'La tabla de las preposiciones', bloques: [
      { h: '¿Qué caso piden?', tabla: { cab: ['Caso', 'Preposiciones'], de: [1], filaColor: [AKK, DAT, WEC, GENI], filas: [
        ['Akkusativ', 'durch, für, gegen, ohne, um, bis, entlang'],
        ['Dativ', 'aus, bei, mit, nach, seit, von, zu, ab, außer, gegenüber'],
        ['Akk o Dat', 'an, auf, hinter, in, neben, über, unter, vor, zwischen'],
        ['Genitiv', 'während, wegen, trotz, statt, innerhalb, außerhalb, laut, dank']] } },
      { h: 'Las de dos casos: ¿wo? o ¿wohin?', lista: [
        '**¿Wo?** dónde está → Dativ: [Das Buch liegt auf dem Tisch.]',
        '**¿Wohin?** adónde va → Akkusativ: [Ich lege das Buch auf den Tisch.]',
        'Poner / estar: **legen**–liegen, **stellen**–stehen, **setzen**–sitzen, **hängen**–hängen.',
        'En el tiempo, siempre Dativ: [am Montag, vor einem Jahr, in zwei Wochen].'] },
      { h: 'El artículo después de la preposición', tabla: { cab: ['', 'masc.', 'fem.', 'neutro', 'plural'], de: [1, 2, 3, 4], colores: GEN, filas: [
        ['Akk.', '**den**', 'die', 'das', 'die'], ['Dat.', '**dem**', '**der**', '**dem**', '**den** +n'], ['Gen.', 'des +s', 'der', 'des +s', 'der']] } },
      { h: 'Dónde · adónde · de dónde', tabla: { cab: ['', '¿wo?', '¿wohin?', '¿woher?'], de: [1, 2, 3], filas: [
        ['Ciudad, país', 'in Berlin', 'nach Berlin', 'aus Berlin'], ['País con artículo', 'in der Schweiz', 'in die Schweiz', 'aus der Schweiz'],
        ['Edificio', 'im Büro', 'ins Büro', 'aus dem Büro'], ['Persona, doctor', 'beim Arzt', 'zum Arzt', 'vom Arzt'],
        ['Casa', 'zu Hause', 'nach Hause', 'von zu Hause'], ['Mar, lago', 'am Meer', 'ans Meer', 'vom Meer'],
        ['Evento', 'auf der Party', 'auf die Party', 'von der Party']] } },
      { h: 'El tiempo', tabla: { cab: ['', 'Ejemplo'], de: [1], filas: [
        ['Hora', 'um 8 Uhr · gegen 8 Uhr'], ['Día, fecha', 'am Montag · am 5. Mai'], ['Mes, estación', 'im Mai · im Winter'],
        ['Año', '2028 · im Jahr 2028'], ['Desde (y sigue)', 'seit einem Jahr'], ['Hace', 'vor zwei Jahren'], ['Dentro de', 'in zwei Wochen'],
        ['A partir de · hasta', 'ab Montag · bis Freitag']] } },
      { h: 'Contracciones', p: '[am · ans · beim · im · ins · vom · zum · zur] — an dem, an das, bei dem, in dem, in das, von dem, zu dem, zu der.' },
      { h: 'Verbos con preposición', tabla: { cab: ['Verbo', '+ caso', 'Ejemplo'], de: [0, 2], filas: [
        ['warten auf', 'A', 'auf den Bus'], ['denken an', 'A', 'an meine Familie'], ['sich freuen auf', 'A', 'auf den Urlaub (viene)'],
        ['sich freuen über', 'A', 'über das Geschenk (ya está)'], ['sich interessieren für', 'A', 'für Autos'], ['sprechen über', 'A', 'über das Projekt'],
        ['sprechen mit', 'D', 'mit dem Chef'], ['Angst haben vor', 'D', 'vor der Prüfung'], ['fragen nach', 'D', 'nach dem Weg'],
        ['teilnehmen an', 'D', 'an dem Kurs'], ['abhängen von', 'D', 'vom Wetter'], ['sich kümmern um', 'A', 'um die Kinder']] } },
      { h: 'Trucos', lista: [
        'Akkusativ: **DOGFUB** — durch, ohne, gegen, für, um, bis.',
        '**nach** solo sin artículo: [nach Mexiko], pero [in die Schweiz].',
        '**seit** va con presente: [Ich wohne seit 2020 hier.]',
        'Preguntar: cosas **wo(r)-** + preposición ([Worauf wartest du?]); personas, preposición + wen/wem ([Auf wen?]).'] }
    ] },

    verbos: { titulo: 'La tabla de los verbos', bloques: [
      { h: 'El presente', tabla: { cab: ['', 'machen', 'sein', 'haben', 'werden'], de: [1, 2, 3, 4], filas: [
        ['ich', 'mach**e**', 'bin', 'habe', 'werde'], ['du', 'mach**st**', 'bist', 'hast', 'wirst'], ['er/sie/es', 'mach**t**', 'ist', 'hat', 'wird'],
        ['wir', 'mach**en**', 'sind', 'haben', 'werden'], ['ihr', 'mach**t**', 'seid', 'habt', 'werdet'], ['sie/Sie', 'mach**en**', 'sind', 'haben', 'werden']] } },
      { h: 'Los tiempos', tabla: { cab: ['Tiempo', 'Cómo se forma', 'Ejemplo'], de: [2], filas: [
        ['Presente', 'raíz + -e, -st, -t…', 'ich arbeite'], ['Perfekt', 'haben / sein + participio', 'ich habe gearbeitet'],
        ['Präteritum', 'raíz + -te · otra vocal', 'ich arbeitete · ich ging'], ['Futuro', 'werden + infinitivo', 'ich werde arbeiten'],
        ['Konjunktiv II', 'würde + infinitivo', 'ich würde arbeiten'], ['Pasiva', 'werden + participio', 'es wird gemacht']] } },
      { h: 'El participio (Partizip II)', tabla: { cab: ['Tipo', 'Regla', 'Ejemplo'], de: [2], filas: [
        ['Regular', 'ge- … -t', 'gemacht'], ['Irregular', 'ge- … -en', 'gefahren'], ['Separable', 'prefijo + ge', 'angerufen'],
        ['be-, ver-, er-, ent-…', 'sin ge-', 'besucht, verstanden'], ['-ieren', 'sin ge-', 'studiert']] } },
      { h: '¿haben o sein?', lista: [
        '**sein**: moverse de un sitio a otro ([gehen, fahren, fliegen, kommen]), cambiar de estado ([aufstehen, werden]) y [sein, bleiben, passieren].',
        '**haben**: todos los demás — [Ich habe gearbeitet.] [Ich bin gefahren.]'] },
      { h: 'Los modales', tabla: { cab: ['', 'ich / er', 'du', 'wir / sie', 'Qué es'], de: [0, 1, 2, 3], filas: [
        ['können', 'kann', 'kannst', 'können', 'poder, saber'], ['müssen', 'muss', 'musst', 'müssen', 'tener que'], ['dürfen', 'darf', 'darfst', 'dürfen', 'tener permiso'],
        ['sollen', 'soll', 'sollst', 'sollen', 'deber (otro lo dice)'], ['wollen', 'will', 'willst', 'wollen', 'querer'], ['möchten', 'möchte', 'möchtest', 'möchten', 'quisiera']] } },
      { h: 'Irregulares que más se usan', tabla: { cab: ['Infinitivo', 'Präteritum', 'Perfekt'], de: [0, 1, 2], filas: [
        ['sein', 'war', 'ist gewesen'], ['haben', 'hatte', 'hat gehabt'], ['werden', 'wurde', 'ist geworden'], ['gehen', 'ging', 'ist gegangen'],
        ['kommen', 'kam', 'ist gekommen'], ['fahren', 'fuhr', 'ist gefahren'], ['bleiben', 'blieb', 'ist geblieben'], ['sehen', 'sah', 'hat gesehen'],
        ['geben', 'gab', 'hat gegeben'], ['nehmen', 'nahm', 'hat genommen'], ['sprechen', 'sprach', 'hat gesprochen'], ['finden', 'fand', 'hat gefunden'],
        ['schreiben', 'schrieb', 'hat geschrieben'], ['wissen', 'wusste', 'hat gewusst'], ['denken', 'dachte', 'hat gedacht'], ['bringen', 'brachte', 'hat gebracht']] } },
      { h: 'Konjunktiv II', tabla: { cab: ['', 'sein', 'haben', 'können', 'werden'], de: [1, 2, 3, 4], filas: [
        ['ich / er', 'wäre', 'hätte', 'könnte', 'würde'], ['du', 'wärst', 'hättest', 'könntest', 'würdest'], ['wir / sie', 'wären', 'hätten', 'könnten', 'würden']] } },
      { h: 'Imperativo', tabla: { cab: ['', 'du', 'ihr', 'Sie'], de: [1, 2, 3], filas: [
        ['kommen', 'Komm!', 'Kommt!', 'Kommen Sie!'], ['nehmen', 'Nimm!', 'Nehmt!', 'Nehmen Sie!'], ['fahren', 'Fahr!', 'Fahrt!', 'Fahren Sie!'], ['sein', 'Sei!', 'Seid!', 'Seien Sie!']] } },
      { h: 'Separables y reflexivos', lista: [
        'El prefijo, al final: [Ich rufe dich an.] · [Ich habe dich angerufen.] · [Ich muss dich anrufen.] · […, dass ich dich anrufe.]',
        'sich: **mich / mir**, **dich / dir**, sich, uns, euch, sich. Dativ si hay otro objeto: [Ich wasche mir die Hände.]'] }
    ] },

    adj: { titulo: 'La tabla de los adjetivos', bloques: [
      { h: 'Con der, die, das', tabla: { cab: ['', 'masc.', 'fem.', 'neutro', 'plural'], de: [1, 2, 3, 4], colores: GEN, filas: [
        ['Nom.', 'neu**e**', 'neu**e**', 'neu**e**', 'neu**en**'], ['Akk.', 'neu**en**', 'neu**e**', 'neu**e**', 'neu**en**'],
        ['Dat.', 'neu**en**', 'neu**en**', 'neu**en**', 'neu**en**'], ['Gen.', 'neu**en**', 'neu**en**', 'neu**en**', 'neu**en**']] } },
      { h: 'Con ein, kein, mein', tabla: { cab: ['', 'masc.', 'fem.', 'neutro', 'plural'], de: [1, 2, 3, 4], colores: GEN, filas: [
        ['Nom.', 'neu**er**', 'neu**e**', 'neu**es**', 'neu**en**'], ['Akk.', 'neu**en**', 'neu**e**', 'neu**es**', 'neu**en**'],
        ['Dat.', 'neu**en**', 'neu**en**', 'neu**en**', 'neu**en**'], ['Gen.', 'neu**en**', 'neu**en**', 'neu**en**', 'neu**en**']] } },
      { h: 'Sin artículo', tabla: { cab: ['', 'masc.', 'fem.', 'neutro', 'plural'], de: [1, 2, 3, 4], colores: GEN, filas: [
        ['Nom.', 'neu**er**', 'neu**e**', 'neu**es**', 'neu**e**'], ['Akk.', 'neu**en**', 'neu**e**', 'neu**es**', 'neu**e**'],
        ['Dat.', 'neu**em**', 'neu**er**', 'neu**em**', 'neu**en**'], ['Gen.', 'neu**en**', 'neu**er**', 'neu**en**', 'neu**er**']] } },
      { h: 'El truco', lista: [
        'Detrás de **sein**, sin terminación: [Das Auto ist neu.]',
        'Dativ, Genitiv y plural con artículo: siempre **-en**.',
        'Si **ein** no lleva terminación, la pone el adjetivo: [ein neuer Chef, ein neues Auto].',
        'Sin artículo, la del artículo: der → **-er**, das → **-es**, dem → **-em**.'] },
      { h: 'Comparar', tabla: { cab: ['', 'más', 'el más'], de: [0, 1, 2], filas: [
        ['schnell', 'schneller', 'am schnellsten'], ['alt', 'älter', 'am ältesten'], ['groß', 'größer', 'am größten'], ['teuer', 'teurer', 'am teuersten'],
        ['gut', 'besser', 'am besten'], ['viel', 'mehr', 'am meisten'], ['gern', 'lieber', 'am liebsten'], ['hoch', 'höher', 'am höchsten']] } },
      { h: 'Más … que, igual de … que', lista: ['Más que: **-er + als** — [Er ist älter als ich.]', 'Igual de: **so … wie** — [Er ist so alt wie ich.]',
        'Cuanto más, más: [je mehr, desto besser].'] },
      { h: 'Usos especiales', lista: [
        '[etwas Neues, nichts Besonderes]; pero [alles Gute].',
        'Como sustantivo, se declina igual: [der Deutsche, ein Deutscher].',
        '[hoch → ein hoher Berg]; [teuer → ein teures Auto]; [lila, rosa] no cambian.'] }
    ] },

    frase: { titulo: 'La tabla de la frase', bloques: [
      { h: 'El lugar del verbo', tabla: { cab: ['Posición 1', 'Verbo', 'En medio', 'Al final'], de: [0, 1, 2, 3], colores: ['', '#CC0000', '', '#CC0000'], filas: [
        ['Ich', 'habe', 'heute Deutsch', 'gelernt.'], ['Heute', 'habe', 'ich Deutsch', 'gelernt.'], ['Wann', 'hast', 'du Deutsch', 'gelernt?'],
        ['—', 'Hast', 'du Deutsch', 'gelernt?'], ['…, weil', '—', 'ich Deutsch', 'gelernt habe.']] } },
      { h: 'Los conectores', tabla: { cab: ['El verbo', 'Conectores'], de: [1], filas: [
        ['Igual (posición 0)', 'und, aber, oder, denn, sondern'], ['Justo después', 'deshalb, trotzdem, dann, außerdem, also, sonst'],
        ['Al final', 'weil, dass, wenn, als, ob, obwohl, damit, bevor, nachdem, während, bis, sobald']] } },
      { h: '«cuando» y «si»', lista: [
        '**als**: una vez en el pasado — [Als ich 18 war, …]',
        '**wenn**: presente, futuro o cada vez — [Wenn ich nach Hause komme, …]; también «si» de condición.',
        '**ob**: «si» de pregunta indirecta — [Ich weiß nicht, ob er kommt.]',
        '**wann**: la pregunta «¿cuándo?» — [Wann kommst du?]'] },
      { h: 'Los relativos', tabla: { cab: ['', 'masc.', 'fem.', 'neutro', 'plural'], de: [1, 2, 3, 4], colores: GEN, filas: [
        ['Nom.', 'der', 'die', 'das', 'die'], ['Akk.', '**den**', 'die', 'das', 'die'], ['Dat.', '**dem**', '**der**', '**dem**', '**denen**'], ['Gen.', '**dessen**', '**deren**', '**dessen**', '**deren**']] } },
      { h: 'El orden en medio', lista: [
        '**TeKaMoLo**: cuándo, por qué, cómo, dónde — [Ich fahre morgen wegen des Staus mit dem Bus zur Arbeit.]',
        'Dos sustantivos: Dativ y luego Akkusativ — [Ich gebe dem Kollegen den Bericht.] Dos pronombres: al revés — [Ich gebe ihn ihm.]'] },
      { h: 'nicht o kein', lista: [
        '**kein**: sustantivo sin artículo o con ein — [Ich habe kein Auto.]',
        '**nicht**: lo demás, detrás del verbo y antes de lo que niega — [Ich komme heute nicht.]',
        '¿Una pregunta negativa? «Sí» es **doch** — [Hast du keine Zeit? — Doch!]'] },
      { h: 'zu + infinitivo', lista: [
        'Al final y con coma: [Ich versuche, jeden Tag zu lernen.] Separables: [anzurufen].',
        '**um … zu** (para), **ohne … zu** (sin), **statt … zu** (en lugar de).',
        'Con modales, sin zu: [Ich kann schwimmen.]'] },
      { h: 'Preguntar', tabla: { cab: ['Palabra', 'Qué'], de: [0], filas: [
        ['wer · wen · wem · wessen', 'quién · a quién (Akk · Dat) · de quién'], ['wo · wohin · woher', 'dónde · adónde · de dónde'],
        ['wann · warum · wie', 'cuándo · por qué · cómo'], ['wie viel · wie viele · wie lange', 'cuánto · cuántos · cuánto tiempo'],
        ['worauf, woran, worüber…', 'por cosas, con verbos de preposición']] } }
    ] }
  };
})(typeof window !== 'undefined' ? window : globalThis);
