/* ══ lecciones-resumen.js — el resumen de cada una de las 41 lecciones ══════════════════════════════

   Adán, 18-nov-2026, sobre la ventana «Alemán de hoy» de Mi Día: "necesito mucha más información en cada
   sección" — y eligió, para la lección, «un resumen arriba: qué vas a aprender, la regla clave con ejemplos
   y los errores típicos». Lo pinta el Dashboard sobre la lección (`alemanResumenHtml`); la lección completa
   sigue en su página.

   UN RESUMEN, por el id de su lección (el de lecciones-datos.js):
     aprendes  qué vas a poder hacer al terminarla, en una frase
     regla     la regla clave en 3–5 renglones, cada uno con su ejemplo en alemán
     errores   los errores típicos de un hispanohablante, con la forma correcta (✗ → ✓)

   Todo el alemán va revisado (prompt de Alemán: "un artículo o una terminación mal enseñados se aprenden
   mal"). Una lección nueva en lecciones-datos.js llega con su resumen aquí: el control 54 del verificador
   lo exige.
   ═══════════════════════════════════════════════════════════════════════════════════════════════════ */
const ALEMAN_LECCIONES_RESUMEN = {
  // ── Kapitel 10 ──────────────────────────────────────────────────────────────────────────────────
  'k10-01': {
    aprendes: 'Contar lo que pasó como se habla en Alemania: el Perfekt, con haben o sein y el Partizip II al final.',
    regla: [
      'Fórmula: haben o sein conjugado en la posición 2 y el Partizip II al final. → Ich habe gestern Deutsch gelernt.',
      'Partizip II regular: ge- + raíz + -t (machen → gemacht). Irregular: ge- + raíz + -en, a veces con otra vocal (schreiben → geschrieben).',
      'Con sein: movimiento, cambio de estado y los verbos sein, bleiben y werden. → Ich bin nach Berlin gefahren. Er ist eingeschlafen.',
      'Sin ge-: los verbos en -ieren (studiert) y los de prefijo inseparable be-, ver-, er-, ent-, zer- (besucht, verstanden). En los separables, el ge- va en medio: aufgestanden.',
      'En una subordinada el auxiliar se va al final. → …, weil ich lange gearbeitet habe.',
    ],
    errores: [
      'Ich habe gelernt Deutsch ✗ → Ich habe Deutsch gelernt (el participio, al final).',
      'Ich habe gegangen ✗ → Ich bin gegangen (movimiento = sein).',
      'Ich habe gestudiert ✗ → Ich habe studiert (los -ieren no llevan ge-).',
    ],
  },
  'k10-06': {
    aprendes: 'Distinguir los dos participios: el I (lesend, «que lee») dice algo que pasa al mismo tiempo; el II (gelesen, «leído»), algo terminado o pasivo.',
    regla: [
      'Partizip I = infinitivo + -d. → lesen → lesend, schlafen → schlafend.',
      'Partizip II = el del Perfekt. → gelesen, gemacht, verstanden.',
      'Delante de un sustantivo se declinan como cualquier adjetivo. → das schlafende Kind (el niño que duerme) · das gelesene Buch (el libro leído).',
      'Partizip I: acción activa y simultánea. Partizip II: acción terminada o pasiva. → die laufende Maschine (la máquina en marcha) · die reparierte Maschine (la máquina reparada).',
    ],
    errores: [
      'das schlafend Kind ✗ → das schlafende Kind (lleva terminación de adjetivo).',
      'der reparierende Wagen cuando quieres «el auto reparado» ✗ → der reparierte Wagen.',
    ],
  },
  'k10-02': {
    aprendes: 'Memorizar los verbos irregulares con sus cuatro formas: infinitivo, 3.ª persona, Präteritum y Partizip II con su auxiliar.',
    regla: [
      'Apréndelos en bloque, con el auxiliar. → fahren – fährt – fuhr – ist gefahren.',
      'Patrones de vocal que se repiten: ei → ie → ie (bleiben – blieb – geblieben); i → a → u (finden – fand – gefunden); ie → o → o (fliegen – flog – geflogen).',
      'Los mixtos cambian la vocal pero terminan en -t. → bringen – brachte – gebracht; denken – dachte – gedacht; wissen – wusste – gewusst.',
      'Muchos cambian la vocal también en du y er del presente. → ich fahre, du fährst, er fährt; ich lese, er liest.',
    ],
    errores: [
      'gebringt ✗ → gebracht.',
      'gedenkt ✗ → gedacht.',
      'er fahrt ✗ → er fährt.',
    ],
  },
  'k10-03': {
    aprendes: 'Practicar el Perfekt hasta que salga solo: completar, ordenar y escribir, con dos minitests que se corrigen mientras escribes.',
    regla: [
      'Antes de escribir pregúntate: ¿movimiento o cambio de estado? → sein. Si no, haben. → Ich bin aufgestanden, ich habe gefrühstückt.',
      'Mira el prefijo: separable con ge- en medio (aufgemacht), inseparable sin ge- (verkauft), -ieren sin ge- (repariert).',
      'Revisa la posición: el auxiliar en el lugar 2 y el participio al final. → Am Montag habe ich den Test geschrieben.',
      'Repite cada minitest hasta acertarlo sin dudar: es la mejor señal de que ya puedes usarlo al hablar.',
    ],
    errores: [
      'Mezclar tiempos al contar algo: al hablar se usa el Perfekt (salvo war, hatte y los modales, que van en Präteritum).',
      'Ich habe den Bericht heute Morgen um acht Uhr im Büro schnell geschrieben: el participio sigue al final por larga que sea la frase.',
    ],
  },
  'k10-04': {
    aprendes: 'Hablar de tu trabajo: tu profesión, tu área, dónde y cómo trabajas, y contestar las preguntas típicas del examen oral.',
    regla: [
      'La profesión va sin artículo. → Ich bin Ingenieur. Sie ist Ärztin.',
      'El femenino se forma con -in, a veces con Umlaut. → der Ingenieur → die Ingenieurin; der Arzt → die Ärztin.',
      'bei + la empresa, in + el lugar, als + el puesto. → Ich arbeite bei Bosch als Testingenieur in einem Labor.',
      'Preguntas del oral: Was sind Sie von Beruf? Wo arbeiten Sie? Was machen Sie genau? Seit wann? Wie gefällt Ihnen Ihre Arbeit?',
    ],
    errores: [
      'Ich bin ein Ingenieur ✗ → Ich bin Ingenieur.',
      'Ich arbeite in Bosch ✗ → Ich arbeite bei Bosch.',
      'Ich arbeite als ein Tester ✗ → Ich arbeite als Tester.',
    ],
  },
  'k10-05': {
    aprendes: 'Contar tu día de principio a fin con conectores, en presente y en pasado, y preparar el guion de tu video.',
    regla: [
      'Conectores de orden: zuerst, dann, danach, später, am Ende.',
      'Después de un conector, el verbo va en segundo lugar. → Zuerst stehe ich auf. Dann frühstücke ich.',
      'Cuándo: um 7 Uhr, am Morgen, am Nachmittag, am Abend; nach der Arbeit.',
      'En pasado, con Perfekt. → Gestern bin ich um 6 Uhr aufgestanden und habe schnell gefrühstückt.',
    ],
    errores: [
      'Dann ich frühstücke ✗ → Dann frühstücke ich.',
      'Ich aufstehe um 7 Uhr ✗ → Ich stehe um 7 Uhr auf.',
    ],
  },

  // ── A2 · gramática ──────────────────────────────────────────────────────────────────────────────
  'a2-01': {
    aprendes: 'Decir lo que puedes, debes, quieres o te permiten hacer: können, müssen, wollen, sollen, dürfen y möchten.',
    regla: [
      'El modal va conjugado en la posición 2 y el otro verbo, en infinitivo al final. → Ich muss heute lange arbeiten.',
      'ich y er/sie/es son iguales y sin -t. → ich kann, er kann; ich will, er will.',
      'En singular cambian la vocal. → können → ich kann; müssen → ich muss; dürfen → ich darf; wollen → ich will.',
      'möchten es la forma cortés de querer. → Ich möchte einen Kaffee, bitte.',
    ],
    errores: [
      'Ich kann zu schwimmen ✗ → Ich kann schwimmen (sin zu).',
      'Er kannt ✗ → Er kann.',
      'Du musst nicht kommen = no hace falta que vengas; Du darfst nicht kommen = tienes prohibido venir.',
    ],
  },
  'a2-02': {
    aprendes: 'El pasado de la mayoría de los verbos: haben + Partizip II.',
    regla: [
      'haben conjugado y el participio al final. → Ich habe gearbeitet. Wir haben eine Pizza gegessen.',
      'Regulares: ge- + raíz + -t. → kaufen → gekauft, spielen → gespielt.',
      'Irregulares: ge- + raíz + -en, muchas veces con otra vocal. → essen → gegessen, trinken → getrunken, finden → gefunden.',
      'Si el verbo lleva objeto directo (Akkusativ), casi siempre va con haben. → Ich habe das Buch gelesen.',
    ],
    errores: [
      'Ich habe gekaufen ✗ → Ich habe gekauft.',
      'Ich habe getrinkt ✗ → Ich habe getrunken.',
    ],
  },
  'a2-03': {
    aprendes: 'Cuándo el pasado se arma con sein: movimiento de un lugar a otro, cambio de estado y los verbos sein, bleiben y werden.',
    regla: [
      'Movimiento de un lugar a otro. → Ich bin nach Hause gegangen. Wir sind nach München gefahren.',
      'Cambio de estado. → Er ist eingeschlafen. Das Kind ist gewachsen.',
      'sein, bleiben, werden y passieren. → Ich bin krank gewesen. Was ist passiert?',
      'Ojo: con objeto directo, el mismo verbo va con haben. → Ich habe das Auto in die Werkstatt gefahren.',
    ],
    errores: [
      'Ich habe nach Berlin gefahren ✗ → Ich bin nach Berlin gefahren.',
      'Ich habe zu Hause geblieben ✗ → Ich bin zu Hause geblieben.',
    ],
  },
  'a2-04': {
    aprendes: 'El pasado de los textos escritos y de los pocos verbos que sí se usan así al hablar: war, hatte y los modales.',
    regla: [
      'sein → ich war, du warst, wir waren; haben → ich hatte, du hattest.',
      'Modales, sin Umlaut. → ich konnte, musste, wollte, durfte, sollte.',
      'Regulares: raíz + -te. → machen → ich machte; arbeiten → ich arbeitete.',
      'Irregulares: otra vocal y sin terminación en ich y er. → gehen → ging, kommen → kam, sehen → sah.',
      'ich y er/sie/es son iguales. → ich war, er war; ich konnte, sie konnte.',
    ],
    errores: [
      'Ich könnte (= podría) ≠ ich konnte (= pude).',
      'Ich warte (= espero) ≠ ich war (= estuve/fui).',
    ],
  },
  'a2-05': {
    aprendes: 'Los verbos con un prefijo que se separa y se va al final de la frase.',
    regla: [
      'En presente, el prefijo va al final. → aufstehen → Ich stehe um 7 Uhr auf.',
      'Prefijos separables comunes: an-, auf-, aus-, ein-, mit-, vor-, zu-, zurück-, fern-. Se acentúan al hablar: ÁNrufen.',
      'En Perfekt, el ge- va en medio. → aufgestanden, angerufen, mitgekommen.',
      'Con modal o en subordinada se escriben juntos. → Ich muss früh aufstehen. …, weil ich früh aufstehe.',
      'Los inseparables (be-, ver-, er-, ent-, zer-) nunca se separan. → Ich verstehe das.',
    ],
    errores: [
      'Ich aufstehe ✗ → Ich stehe auf.',
      'Ich habe angeruft ✗ → Ich habe angerufen.',
    ],
  },
  'a2-06': {
    aprendes: 'Los verbos que llevan sich: la acción vuelve a quien la hace.',
    regla: [
      'Pronombres reflexivos en Akkusativ: mich, dich, sich, uns, euch, sich. → Ich freue mich auf das Wochenende.',
      'Si ya hay otro objeto directo, el reflexivo va en Dativ: mir, dir. → Ich wasche mir die Hände.',
      'En Perfekt van con haben. → Ich habe mich sehr gefreut.',
      'Con preposición fija: sich freuen auf (lo que viene) · sich freuen über (lo que ya pasó) · sich interessieren für.',
    ],
    errores: [
      'Ich freue mir ✗ → Ich freue mich.',
      'Ich wasche mich die Hände ✗ → Ich wasche mir die Hände.',
    ],
  },
  'a2-07': {
    aprendes: 'Quién hace qué a quién: el Nominativ es el sujeto, el Akkusativ el objeto directo y el Dativ el indirecto.',
    regla: [
      'Nominativ (¿wer?): el sujeto. → Der Mann kauft ein Auto.',
      'Akkusativ (¿wen? ¿was?): solo cambia el masculino, der → den, ein → einen. → Ich sehe den Mann.',
      'Dativ (¿wem?): der y das → dem, die → der, plural → den + -n. → Ich gebe dem Mann das Buch. Ich helfe den Kindern.',
      'Con dos sustantivos, primero el Dativ y luego el Akkusativ. → Ich gebe dem Kind den Ball.',
    ],
    errores: [
      'Ich habe ein Bruder ✗ → Ich habe einen Bruder.',
      'mit die Kinder ✗ → mit den Kindern.',
    ],
  },
  'a2-08': {
    aprendes: 'Comparar cosas: más grande que, igual de grande que, el más grande.',
    regla: [
      'Comparativo: adjetivo + -er + als. → Berlin ist größer als München.',
      'Superlativo: am + adjetivo + -sten. → am schnellsten, am billigsten.',
      'Muchos de una sílaba toman Umlaut. → alt → älter → am ältesten; groß → größer → am größten.',
      'Irregulares: gut → besser → am besten; viel → mehr → am meisten; gern → lieber → am liebsten.',
      'Igualdad: so … wie. → Er ist so alt wie ich.',
    ],
    errores: [
      'besser wie ✗ → besser als.',
      'mehr gut ✗ → besser.',
    ],
  },
  'a2-09': {
    aprendes: 'Unir ideas: los conectores que dejan el verbo en su lugar y los que lo mandan al final.',
    regla: [
      'Sin cambio de orden: und, aber, oder, denn, sondern. → Ich bleibe zu Hause, denn ich bin müde.',
      'Verbo al final (subordinada): weil, dass, wenn, obwohl, ob, als. → …, weil ich müde bin.',
      'Si la subordinada va primero, la principal empieza con su verbo. → Wenn ich Zeit habe, lerne ich Deutsch.',
      'Adverbios como deshalb o trotzdem ocupan la posición 1 y el verbo va enseguida. → Ich bin müde, deshalb gehe ich schlafen.',
    ],
    errores: [
      'weil ich bin müde ✗ → weil ich müde bin.',
      'wenn = cada vez que / si; als = una sola vez en el pasado. → Als ich ein Kind war, …',
    ],
  },
  'a2-10': {
    aprendes: 'Qué caso pide cada preposición, y las de doble vía (Wechselpräpositionen).',
    regla: [
      'Siempre Akkusativ: durch, für, gegen, ohne, um. → für meinen Bruder.',
      'Siempre Dativ: aus, bei, mit, nach, seit, von, zu. → mit dem Auto, seit einem Jahr.',
      'Wechselpräpositionen (an, auf, hinter, in, neben, über, unter, vor, zwischen): ¿wo? → Dativ; ¿wohin? → Akkusativ. → Das Buch liegt auf dem Tisch. Ich lege das Buch auf den Tisch.',
      'Contracciones: in dem → im, an dem → am, zu dem → zum, zu der → zur, in das → ins.',
    ],
    errores: [
      'mit den Auto ✗ → mit dem Auto.',
      'Ich gehe in der Park ✗ → Ich gehe in den Park (¿wohin? → Akkusativ).',
    ],
  },
  'a2-11': {
    aprendes: 'Las terminaciones del adjetivo delante del sustantivo, según el artículo y el caso.',
    regla: [
      'Con der/die/das: -e en el Nominativ singular, -en casi en todo lo demás. → der große Mann, die große Frau, den großen Mann.',
      'Con ein/kein/mein, el adjetivo marca el género que el artículo no muestra. → ein großer Mann, ein großes Haus.',
      'Sin artículo, el adjetivo toma la terminación que tendría el artículo. → kalter Kaffee, frische Milch.',
      'Después del verbo no se declina. → Der Mann ist groß.',
    ],
    errores: [
      'ein groß Haus ✗ → ein großes Haus.',
      'der großer Mann ✗ → der große Mann.',
    ],
  },
  'a2-12': {
    aprendes: 'Cuándo el infinitivo lleva zu: después de ciertos verbos, de adjetivos y en «um … zu» (para).',
    regla: [
      'Con adjetivos y expresiones. → Es ist schön, Deutsch zu lernen.',
      'Con verbos como versuchen, anfangen, aufhören, vergessen, hoffen. → Ich versuche, pünktlich zu sein.',
      'En los separables, el zu va en medio. → anzufangen, aufzustehen.',
      'um … zu = para. → Ich lerne Deutsch, um in Deutschland zu studieren.',
      'Sin zu después de los modales y de werden. → Ich kann schwimmen.',
    ],
    errores: [
      'Ich kann zu kommen ✗ → Ich kann kommen.',
      'zu anfangen ✗ → anzufangen.',
    ],
  },

  // ── A2 · temas ──────────────────────────────────────────────────────────────────────────────────
  'a2-13': {
    aprendes: 'Buscar y describir una vivienda, entender un anuncio y hablar de las tareas de la casa.',
    regla: [
      'Kaltmiete = la renta sin calefacción ni agua; Warmmiete = con ellas. Pregunta siempre cuál te están diciendo.',
      'Abreviaturas de los anuncios: Zi. = Zimmer, NK = Nebenkosten, WG = Wohngemeinschaft, EBK = Einbauküche.',
      'Describir. → Die Wohnung hat drei Zimmer und einen Balkon. Sie liegt im zweiten Stock.',
      'Tareas: putzen, aufräumen, staubsaugen, den Müll rausbringen.',
    ],
    errores: [
      'im ersten Stock = el piso de arriba de la planta baja; la planta baja es das Erdgeschoss.',
      'Die Kaution (el depósito) no es la renta: se devuelve al salir.',
    ],
  },
  'a2-14': {
    aprendes: 'Hablar de tu trabajo y tu salario, y postularte a un puesto.',
    regla: [
      'Bewerbung = postulación: das Anschreiben (la carta), der Lebenslauf (el CV) y die Zeugnisse (las constancias).',
      'brutto (antes de impuestos) y netto (lo que te llega). → Das Bruttogehalt ist 4.000 Euro im Monat.',
      'Contrato y jornada. → Ich arbeite Vollzeit. Ich habe einen unbefristeten Vertrag.',
      'Postularte. → Ich bewerbe mich um die Stelle als Testingenieur.',
    ],
    errores: [
      'Ich bewerbe mich für die Stelle ✗ → Ich bewerbe mich um die Stelle.',
      'der Kollege, die Kollegin: con -n en Akkusativ y Dativ → mit meinem Kollegen.',
    ],
  },
  'a2-15': {
    aprendes: 'Decir qué te duele, pedir una cita con el médico y comprar en la farmacia.',
    regla: [
      'Qué te duele, con Dativ. → Mir tut der Kopf weh. Mir tun die Füße weh.',
      'O con -schmerzen. → Ich habe Kopfschmerzen / Rückenschmerzen.',
      'Cita. → Ich brauche einen Termin beim Arzt. Ich bin krankgeschrieben (tengo incapacidad).',
      'Apotheke (medicinas) ≠ Drogerie (higiene y cosméticos). La Krankenkasse es tu seguro médico.',
    ],
    errores: [
      'Mich tut der Kopf weh ✗ → Mir tut der Kopf weh.',
      'Ich habe Schmerz im Kopf ✗ → Ich habe Kopfschmerzen.',
    ],
  },
  'a2-16': {
    aprendes: 'Reservar y viajar: vuelos, hoteles, trenes y excursiones.',
    regla: [
      'Reservar. → Ich möchte ein Doppelzimmer für zwei Nächte reservieren. Ist das Frühstück inklusive?',
      'En la estación: die Abfahrt, die Ankunft, das Gleis (el andén), umsteigen (transbordar).',
      'fahren (en vehículo) ≠ gehen (a pie) ≠ fliegen (en avión). → Ich fahre mit dem Zug nach Hamburg.',
      'nach + ciudad o país sin artículo; in + países con artículo. → nach Spanien, in die Schweiz, in die USA.',
    ],
    errores: [
      'Ich gehe nach Berlin mit dem Zug ✗ → Ich fahre mit dem Zug nach Berlin.',
      'nach die Schweiz ✗ → in die Schweiz.',
    ],
  },
  'a2-17': {
    aprendes: 'Hablar de lo que te gusta hacer, invitar y quedar.',
    regla: [
      'gern + verbo para lo que te gusta hacer. → Ich spiele gern Fußball. Lieber lese ich.',
      'Invitar. → Hast du Lust, ins Kino zu gehen? Wollen wir am Samstag schwimmen gehen?',
      'Frecuencia: immer, oft, manchmal, selten, nie.',
      'sich interessieren für + Akkusativ. → Ich interessiere mich für Musik.',
    ],
    errores: [
      'Ich mag schwimmen suena raro → Ich schwimme gern.',
      'Ich interessiere für Musik ✗ → Ich interessiere mich für Musik.',
    ],
  },
  'a2-18': {
    aprendes: 'Pedir en un restaurante, leer una receta y hablar de cocina.',
    regla: [
      'Pedir con cortesía. → Ich hätte gern ein Wasser. Ich nehme das Schnitzel.',
      'Pagar. → Die Rechnung, bitte. — Zusammen oder getrennt?',
      'Las recetas van en infinitivo. → Die Zwiebeln schneiden, das Wasser kochen.',
      'La propina se suele redondear o dejar un 5–10 %. → Stimmt so (quédese con el cambio).',
    ],
    errores: [
      'Ich will ein Bier suena brusco → Ich hätte gern ein Bier.',
      'bekommen = recibir, no «convertirse». → Ich bekomme einen Salat.',
    ],
  },
  'a2-19': {
    aprendes: 'Comprar, preguntar precios y tallas, pagar y devolver.',
    regla: [
      'Precio. → Was kostet das? Wie viel kosten die Schuhe?',
      'Tallas. → Haben Sie das in Größe M? Kann ich das anprobieren?',
      'Pagar. → Ich zahle bar / mit Karte. Brauchen Sie den Kassenbon?',
      'Cambiar o devolver: umtauschen, zurückgeben. El Pfand de las botellas se recupera en el Pfandautomat.',
    ],
    errores: [
      'Wie viel ist das kosten? ✗ → Wie viel kostet das?',
      'Ich möchte das zurückbringen está bien; «Ich möchte das retournieren» no se usa en Alemania.',
    ],
  },
  'a2-20': {
    aprendes: 'Hablar de internet, el celular, las noticias y las redes.',
    regla: [
      'im Internet (no «auf dem Internet»). → Ich habe das im Internet gelesen.',
      'Verbos: herunterladen, hochladen, speichern, löschen, teilen.',
      'das Handy (el celular); der Akku (la batería). → Mein Akku ist leer.',
      'die Nachricht = el mensaje; die Nachrichten = también las noticias. → Ich schicke dir eine Nachricht.',
    ],
    errores: [
      'der Handy ✗ → das Handy.',
      'Ich habe das heruntergeladet ✗ → Ich habe das heruntergeladen.',
    ],
  },

  // ── A1 ──────────────────────────────────────────────────────────────────────────────────────────
  'a1-01': {
    aprendes: 'Saludar y despedirte según la hora y lo formal que sea la situación.',
    regla: [
      'Según la hora: Guten Morgen, Guten Tag, Guten Abend; Gute Nacht solo al irse a dormir.',
      'Informal: Hallo, Tschüss. Formal: Auf Wiedersehen (Auf Wiederhören por teléfono).',
      'Wie geht es Ihnen? (formal) · Wie geht’s? (informal) — Gut, danke. Und Ihnen?',
      'Sie (usted) con desconocidos y en el trabajo; du con amigos y familia.',
    ],
    errores: [
      'Gute Nacht al llegar de noche ✗ → Guten Abend.',
      'Wie geht es dir? a tu jefe ✗ → Wie geht es Ihnen?',
    ],
  },
  'a1-02': {
    aprendes: 'Los números del 1 al 100 y por qué en alemán se dicen al revés.',
    regla: [
      'Del 1 al 12 se aprenden de memoria: eins, zwei, drei … elf, zwölf.',
      'Del 13 al 19: número + zehn. → dreizehn, vierzehn; sechzehn y siebzehn pierden letras.',
      'Decenas: zwanzig, dreißig (con ß), vierzig, fünfzig …',
      'Del 21 al 99, unidad + und + decena. → einundzwanzig (21), siebenundvierzig (47).',
    ],
    errores: [
      'dreizig ✗ → dreißig.',
      'Se dice «dos y veinte»: zweiundzwanzig, no «zwanzigzwei».',
    ],
  },
  'a1-03': {
    aprendes: 'Colores, formas y tamaños para describir cosas.',
    regla: [
      'Colores: rot, blau, gelb, grün, schwarz, weiß, grau, braun.',
      'Claro y oscuro con hell- y dunkel-. → hellblau, dunkelgrün.',
      'Formas: rund, eckig; der Kreis, das Quadrat, das Dreieck.',
      'Después del verbo sin terminación; antes del sustantivo, con ella. → Das Auto ist rot. Ein rotes Auto.',
    ],
    errores: [
      'ein rot Auto ✗ → ein rotes Auto.', 'Das Auto ist rotes ✗ → Das Auto ist rot: después de sein, sin terminación.',
    ],
  },
  'a1-04': {
    aprendes: 'Los días, los meses y cómo decir cuándo pasa algo.',
    regla: [
      'Días con am. → am Montag, am Wochenende.',
      'Meses y estaciones con im. → im Januar, im Sommer.',
      'Fechas con ordinal. → am ersten Mai, am 3. (dritten) Oktober.',
      'heute, morgen, gestern, übermorgen; montags = los lunes.',
    ],
    errores: [
      'in Montag ✗ → am Montag.',
      'am Januar ✗ → im Januar.',
    ],
  },
  'a1-05': {
    aprendes: 'Hablar de tu familia con los posesivos.',
    regla: [
      'die Mutter, der Vater, die Eltern; der Bruder, die Schwester, die Geschwister.',
      'Posesivos: mein/meine, dein/deine, sein/seine, ihr/ihre. → meine Mutter, mein Bruder.',
      'Con haben, Akkusativ. → Ich habe einen Bruder und zwei Schwestern.',
      'Estado civil: verheiratet, ledig, geschieden.',
    ],
    errores: [
      'Ich habe ein Bruder ✗ → Ich habe einen Bruder.',
      'meine Vater ✗ → mein Vater.',
    ],
  },
  'a1-06': {
    aprendes: 'Los artículos der, die y das, y las pistas para adivinar el género.',
    regla: [
      'der (masculino), die (femenino), das (neutro); el plural siempre es die. → die Kinder.',
      'Casi siempre femeninos: -ung, -heit, -keit, -schaft, -ion, -tät. → die Zeitung, die Freiheit.',
      'Neutros: -chen, -lein, -ment, -um. → das Mädchen, das Museum.',
      'Masculinos: días, meses, estaciones y muchas personas en -er. → der Montag, der Lehrer.',
      'Aprende cada sustantivo con su artículo y su plural, nunca solo.',
    ],
    errores: [
      'die Mädchen (una niña) ✗ → das Mädchen: es neutro por el -chen.', 'der Zeitung ✗ → die Zeitung: -ung siempre es femenino.',
    ],
  },
  'a1-07': {
    aprendes: 'Los pronombres personales y cómo conjugar el presente con ellos.',
    regla: [
      'Presente regular. → ich lerne, du lernst, er/sie/es lernt, wir lernen, ihr lernt, sie/Sie lernen.',
      'Sie con mayúscula = usted; se conjuga como sie plural. → Kommen Sie aus Mexiko?',
      'Las cosas se nombran con er, sie o es según su género. → Der Tisch ist neu. Er ist schön.',
      'Akkusativ: mich, dich, ihn, sie, es, uns, euch, sie/Sie. → Ich sehe ihn.',
    ],
    errores: [
      'Der Computer ist kaputt. Es funktioniert nicht ✗ → Er funktioniert nicht.',
      'Confundir sie (ella/ellos) con Sie (usted): fíjate en la mayúscula y el verbo.',
    ],
  },
  'a1-08': {
    aprendes: 'Los dos verbos más usados: sein (ser/estar) y haben (tener).',
    regla: [
      'sein: ich bin, du bist, er ist, wir sind, ihr seid, sie sind.',
      'haben: ich habe, du hast, er hat, wir haben, ihr habt, sie haben.',
      'La edad va con sein. → Ich bin 30 Jahre alt.',
      'Hambre y sed van con haben. → Ich habe Hunger. Ich habe Durst.',
    ],
    errores: [
      'Ich habe 30 Jahre ✗ → Ich bin 30 Jahre alt.',
      'Ich bin Hunger ✗ → Ich habe Hunger.',
    ],
  },
  'a1-09': {
    aprendes: 'Preguntar y decir la hora, en forma oficial y coloquial.',
    regla: [
      'Preguntar. → Wie spät ist es? Wie viel Uhr ist es?',
      'Oficial (24 h). → 14:30 = vierzehn Uhr dreißig.',
      'Coloquial: Viertel nach drei (3:15), Viertel vor vier (3:45).',
      'halb + la hora siguiente. → halb vier = 3:30.',
      'A qué hora: um. → Der Kurs beginnt um 9 Uhr.',
    ],
    errores: [
      'halb drei = 2:30, no 3:30.',
      'an 9 Uhr ✗ → um 9 Uhr.',
    ],
  },
  'a1-10': {
    aprendes: 'Decir de dónde eres, dónde vives y qué idiomas hablas.',
    regla: [
      'Origen con aus, lugar donde vives con in. → Ich komme aus Mexiko. Ich wohne in Stuttgart.',
      'La nacionalidad va sin artículo. → Ich bin Mexikaner / Mexikanerin.',
      'Países con artículo: die Schweiz, die Türkei, die USA. → Ich komme aus der Schweiz.',
      'Idiomas. → Ich spreche Spanisch, Englisch und ein bisschen Deutsch.',
    ],
    errores: [
      'Ich komme von Mexiko ✗ → Ich komme aus Mexiko.',
      'Ich bin ein Mexikaner ✗ → Ich bin Mexikaner.',
    ],
  },
  'a1-11': {
    aprendes: 'Nombrar profesiones y decir a qué te dedicas.',
    regla: [
      'Preguntar y responder. → Was sind Sie von Beruf? — Ich bin Ingenieur.',
      'Femenino con -in. → der Lehrer → die Lehrerin; der Arzt → die Ärztin.',
      'Dónde y como qué. → Ich arbeite als Ingenieur bei einer Autofirma.',
    ],
    errores: [
      'Ich bin ein Lehrer ✗ → Ich bin Lehrer.',
      'die Arztin ✗ → die Ärztin.',
    ],
  },
  'a1-12': {
    aprendes: 'Comida y bebida básicas y cómo pedirlas.',
    regla: [
      'das Brot, die Milch, das Wasser, der Kaffee, das Bier, das Fleisch, das Gemüse, das Obst.',
      'Pedir. → Ich möchte einen Kaffee. Ich nehme ein Wasser.',
      'Gustos. → Ich esse gern Obst. Ich trinke keinen Alkohol.',
      'kein/keine para negar un sustantivo. → Ich habe keinen Hunger.',
    ],
    errores: [
      'Ich nicht trinke Bier ✗ → Ich trinke kein Bier.', 'Ich möchte ein Kaffee ✗ → Ich möchte einen Kaffee: Kaffee es masculino y va en Akkusativ.',
    ],
  },
  'a1-13': {
    aprendes: 'Las partes de la casa y los muebles básicos.',
    regla: [
      'das Haus, die Wohnung, das Zimmer, die Küche, das Bad, das Schlafzimmer, das Wohnzimmer.',
      'Muebles: der Tisch, der Stuhl, das Bett, der Schrank, das Sofa.',
      'es gibt + Akkusativ. → In der Küche gibt es einen Tisch.',
      '¿Dónde está? → Dativ. → Das Bett steht im Schlafzimmer.',
    ],
    errores: [
      'Es gibt ein Tisch ✗ → Es gibt einen Tisch.', 'Das Bett steht in das Schlafzimmer ✗ → im Schlafzimmer: dónde está = Dativ.',
    ],
  },
  'a1-14': {
    aprendes: 'Moverte por la ciudad y pedir y dar direcciones.',
    regla: [
      'El transporte, con mit + Dativ. → mit dem Bus, mit der U-Bahn, mit dem Fahrrad; a pie, zu Fuß.',
      'Direcciones: links, rechts, geradeaus. → Nehmen Sie die erste Straße links.',
      'Preguntar cómo llegar. → Wie komme ich zum Bahnhof? (zu dem → zum, zu der → zur)',
      'die Haltestelle (la parada), die Fahrkarte (el boleto), umsteigen (transbordar).',
    ],
    errores: [
      'mit der Bus ✗ → mit dem Bus.',
      'mit dem Fuß ✗ → zu Fuß.',
    ],
  },
  'a1-15': {
    aprendes: 'Contar qué haces en tu tiempo libre.',
    regla: [
      'Actividades. → Ich lese gern. Ich spiele Fußball. Ich gehe ins Kino.',
      'Mein Hobby ist … / Meine Hobbys sind …',
      'gern, lieber, am liebsten para lo que más te gusta.',
      'Si empiezas con el tiempo, el verbo sigue en posición 2. → Am Wochenende spiele ich Tennis.',
    ],
    errores: [
      'Am Wochenende ich spiele Tennis ✗ → Am Wochenende spiele ich Tennis.', 'Ich gern lese ✗ → Ich lese gern: gern va después del verbo.',
    ],
  },
};

if (typeof module !== 'undefined' && module.exports) module.exports = ALEMAN_LECCIONES_RESUMEN;
